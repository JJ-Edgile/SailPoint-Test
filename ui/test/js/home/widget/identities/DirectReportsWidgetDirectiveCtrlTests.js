System.register(['test/js/TestInitializer', 'home/widget/identities/IdentitiesWidgetModule', 'test/js/common/search/ListResultTestService'], function (_export) {
    'use strict';

    var identitiesWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetIdentitiesIdentitiesWidgetModule) {
            identitiesWidgetModule = _homeWidgetIdentitiesIdentitiesWidgetModule['default'];
        }, function (_testJsCommonSearchListResultTestService) {}],
        execute: function () {

            describe('DirectReportsWidgetDirectiveCtrl', function () {
                var directReportService, ListResultDTO, ListResultCache, ctrl, $rootScope, $timeout;

                beforeEach(module(identitiesWidgetModule));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_ListResultDTO_, DirectReport, listResultTestService, $q, $controller, _$rootScope_, _$timeout_) {
                    $rootScope = _$rootScope_;
                    $timeout = _$timeout_;
                    ListResultDTO = _ListResultDTO_;

                    ListResultCache = {
                        size: 0,

                        get: jasmine.createSpy('get').and.callFake(function (startIdx, numItems) {
                            var result = null;
                            if (startIdx + numItems <= this.size) {
                                return listResultTestService.createResult(startIdx, numItems, 100);
                            }
                            return result;
                        }),

                        add: jasmine.createSpy('add').and.callFake(function (result, start, chunkSize) {
                            this.size += chunkSize;
                        }),

                        reset: jasmine.createSpy('reset').and.callFake(function () {
                            this.size = 0;
                        })
                    };

                    // A ListResultCache factory that just returns our mock instance.
                    function ListResultCacheMock() {
                        return ListResultCache;
                    }

                    // Mock out the service.
                    directReportService = {
                        getDirectReports: jasmine.createSpy('getDirectReports').and.callFake(function (searchTerm, start, limit) {
                            return $q.when(listResultTestService.createResult(start, limit, 100));
                        })
                    };

                    ctrl = $controller('DirectReportsWidgetDirectiveCtrl', {
                        directReportService: directReportService,
                        ListResultCache: ListResultCacheMock
                    });

                    // Digest to get promises resolved.
                    $rootScope.$apply();
                }));

                it('loads direct reports when constructed', function () {
                    // Called once to try get from the cache and another time after the data has been loaded.
                    expect(ListResultCache.get.calls.count()).toEqual(2);

                    // Called to load the results.
                    expect(directReportService.getDirectReports).toHaveBeenCalledWith(undefined, 0, 40);

                    // Called to insert the results into the cache after loading.
                    expect(ListResultCache.add.calls.count()).toEqual(1);

                    expect(ctrl.items.length).toEqual(5);
                });

                describe('search', function () {
                    it('does not load direct reports if they are in the cache', function () {
                        directReportService.getDirectReports.calls.reset();
                        ctrl.doSearch(undefined, null, 0, 5, null);
                        expect(directReportService.getDirectReports).not.toHaveBeenCalled();
                    });

                    it('loads direct reports if they are not in the cache', function () {
                        directReportService.getDirectReports.calls.reset();
                        ctrl.doSearch(undefined, null, 40, 5, null);
                        expect(directReportService.getDirectReports).toHaveBeenCalledWith(undefined, 40, 40);
                    });

                    it('converts the ListResult into an HTTP-like result', function () {
                        var response;

                        // Digest so that the results from the initial load get into the cache.
                        $rootScope.$apply();

                        ctrl.doSearch(null, null, 0, 5, null).then(function (result) {
                            response = result;
                        });
                        $rootScope.$apply();

                        expect(response).toBeDefined();
                        expect(response.data).toBeDefined();
                        expect(response.data instanceof ListResultDTO).toEqual(true);
                    });

                    it('uses the search term if specified', function () {
                        directReportService.getDirectReports.calls.reset();
                        ctrl.doSearch('sup dawg', null, 40, 5, null);
                        expect(directReportService.getDirectReports).toHaveBeenCalledWith('sup dawg', 40, 40);
                    });

                    it('resets the cache and displayed page if query changes', function () {
                        ctrl.displayedPageNumber = 2;
                        ctrl.doSearch('blah', null, 0, 5, null);
                        expect(ListResultCache.reset).toHaveBeenCalled();
                        expect(ctrl.displayedPageNumber).toEqual(0);

                        // Try again with a different query term.  Should reset again.
                        ctrl.displayedPageNumber = 3;
                        ListResultCache.reset.calls.reset();
                        ctrl.doSearch('blurb', null, 0, 5, null);
                        expect(ListResultCache.reset).toHaveBeenCalled();
                        expect(ctrl.displayedPageNumber).toEqual(0);
                    });

                    it('does not reset the cache if the same query is used', function () {
                        ctrl.displayedPageNumber = 2;
                        ctrl.doSearch('blah', null, 0, 5, null);
                        expect(ListResultCache.reset).toHaveBeenCalled();

                        ctrl.displayedPageNumber = 4;
                        ListResultCache.reset.calls.reset();
                        ctrl.doSearch('blah', null, 0, 5, null);
                        expect(ListResultCache.reset).not.toHaveBeenCalled();
                        expect(ctrl.displayedPageNumber).toEqual(4);
                    });
                });

                function testPageChange(changePageFunc, expectedPage) {
                    // Reset the calls.
                    directReportService.getDirectReports.calls.reset();

                    // Digest to get the initial fetch promise resolved.
                    $rootScope.$apply();

                    // Change pages and make sure stuff is all kosher.
                    changePageFunc();

                    // Should not have called getDirectReports() since the data was in the cache.
                    expect(directReportService.getDirectReports).not.toHaveBeenCalled();
                    expect(ctrl.focusOnList).toEqual(false);

                    // Digest to resolve the load promise, and flush timeout to let the focus happen.
                    $rootScope.$apply();
                    $timeout.flush();
                    expect(ctrl.focusOnList).toEqual(true);
                    expect(ctrl.displayedPageNumber).toEqual(expectedPage);
                }

                describe('next', function () {
                    it('changes pages and focuses on list', function () {
                        testPageChange(ctrl.nextPage.bind(ctrl), 1);
                    });

                    it('grabs data from the cache starting at the beginning and ending at last item', function () {
                        ListResultCache.get.calls.reset();
                        ctrl.nextPage();
                        $rootScope.$apply();
                        expect(ListResultCache.get).toHaveBeenCalledWith(0, 10);
                    });

                    it('does not preload cache if more than two extra pages are cached', function () {
                        directReportService.getDirectReports.calls.reset();
                        ctrl.nextPage();
                        $rootScope.$apply();
                        expect(directReportService.getDirectReports).not.toHaveBeenCalled();

                        // Page 4 is items 21-25.  Preload happens at item 30, so this shouldn't preload.
                        ctrl.pageState.pagingData.currentPage = 4;
                        ctrl.nextPage();
                        $rootScope.$apply();
                        expect(directReportService.getDirectReports).not.toHaveBeenCalled();
                    });

                    it('preloads cache if less than two extra pages are cached', function () {
                        directReportService.getDirectReports.calls.reset();

                        // Page 5 is items 25-29.  Preload happens at item 30, so this should preload.
                        ctrl.pageState.pagingData.currentPage = 5;
                        ctrl.nextPage();
                        $rootScope.$apply();
                        expect(directReportService.getDirectReports).toHaveBeenCalledWith(undefined, 40, 40);
                    });
                });

                describe('previous', function () {
                    it('changes pages and focuses on list', function () {
                        // Go to the next page
                        ctrl.nextPage();
                        $rootScope.$apply();

                        // Flush to get the focusing done.
                        $timeout.flush();

                        // Reset this before we start testing.
                        ctrl.focusOnList = false;

                        // Finally ... test it.
                        testPageChange(ctrl.previousPage.bind(ctrl), 0);
                    });

                    it('fetches extra data when scrolling', function () {
                        ListResultCache.get.calls.reset();

                        // Pretend like we're on the second page.
                        ctrl.pageState.pagingData.currentPage = 2;
                        ctrl.previousPage();
                        $rootScope.$apply();

                        // We should grab 20 items from the cache.
                        expect(ListResultCache.get).toHaveBeenCalledWith(0, 20);
                    });

                    it('refectches after page has scrolled', function () {
                        // Pretend like we're on the second page.
                        ctrl.pageState.pagingData.currentPage = 2;
                        ctrl.previousPage();
                        $rootScope.$apply();

                        // Let the timeout flush and verify that the smaller page size has been fetched.
                        ListResultCache.get.calls.reset();
                        $timeout.flush(2000);
                        expect(ListResultCache.get).toHaveBeenCalledWith(0, 5);
                    });

                    it('only refetches once if previous is called multiple times quickly', function () {
                        spyOn($timeout, 'cancel').and.callThrough();
                        ListResultCache.get.calls.reset();

                        // Pretend like we're on the third page.
                        ctrl.pageState.pagingData.currentPage = 3;

                        // Go back 2 pages - wait 1 second in between.  The second page change should cancel the
                        // first refresh.
                        ctrl.previousPage();
                        $rootScope.$apply();
                        $timeout.flush(1000);
                        ctrl.previousPage();
                        $rootScope.$apply();
                        expect($timeout.cancel).toHaveBeenCalled();

                        // Wait 1 more second.  This is testing that the first timeout gets cancelled.
                        ListResultCache.get.calls.reset();
                        $timeout.flush(1000);
                        expect(ListResultCache.get).not.toHaveBeenCalled();

                        // Wait 1 more second (2 seconds after our last page change).  This should refetch.
                        $timeout.flush(1000);
                        expect(ListResultCache.get).toHaveBeenCalledWith(0, 5);
                    });

                    it('does not refetch after page has scrolled if next is called quickly', function () {
                        spyOn($timeout, 'cancel').and.callThrough();
                        ListResultCache.get.calls.reset();

                        // Pretend like we're on the second page.
                        ctrl.pageState.pagingData.currentPage = 2;

                        // Go back one page.
                        ctrl.previousPage();
                        $rootScope.$apply();
                        expect($timeout.cancel).not.toHaveBeenCalled();

                        // Wait a second ... still shouldn't cancel the timeout.
                        $timeout.flush(1000);
                        expect($timeout.cancel).not.toHaveBeenCalled();

                        // Go to the next page, this should cancel the timeout.
                        ctrl.nextPage();
                        expect($timeout.cancel).toHaveBeenCalled();
                        expect(ListResultCache.get).toHaveBeenCalledWith(0, 10);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0c1dpZGdldERpcmVjdGl2ZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaURBQWlELGdEQUFnRCxVQUFVLFNBQVM7SUFBaEs7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZDQUE2QztZQUNuRyx5QkFBeUIsNENBQTRDO1dBQ3RFLFVBQVUsMENBQTBDO1FBQ3ZELFNBQVMsWUFBWTs7WUFGN0IsU0FBUyxvQ0FBb0MsWUFBVztnQkFDcEQsSUFBSSxxQkFBcUIsZUFBZSxpQkFBaUIsTUFBTSxZQUFZOztnQkFFM0UsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGlCQUFpQixjQUFjLHVCQUF1QixJQUFJLGFBQzFELGNBQWMsWUFBWTtvQkFDakQsYUFBYTtvQkFDYixXQUFXO29CQUNYLGdCQUFnQjs7b0JBRWhCLGtCQUFrQjt3QkFDZCxNQUFNOzt3QkFFTixLQUFLLFFBQVEsVUFBVSxPQUFPLElBQUksU0FBUyxVQUFTLFVBQVUsVUFBVTs0QkFDcEUsSUFBSSxTQUFTOzRCQUNiLElBQUksV0FBVyxZQUFZLEtBQUssTUFBTTtnQ0FDbEMsT0FBTyxzQkFBc0IsYUFBYSxVQUFVLFVBQVU7OzRCQUVsRSxPQUFPOzs7d0JBR1gsS0FBSyxRQUFRLFVBQVUsT0FBTyxJQUFJLFNBQVMsVUFBUyxRQUFRLE9BQU8sV0FBVzs0QkFDMUUsS0FBSyxRQUFROzs7d0JBR2pCLE9BQU8sUUFBUSxVQUFVLFNBQVMsSUFBSSxTQUFTLFlBQVc7NEJBQ3RELEtBQUssT0FBTzs7Ozs7b0JBS3BCLFNBQVMsc0JBQXNCO3dCQUMzQixPQUFPOzs7O29CQUlYLHNCQUFzQjt3QkFDbEIsa0JBQWtCLFFBQVEsVUFBVSxvQkFBb0IsSUFBSSxTQUFTLFVBQVMsWUFBWSxPQUFPLE9BQU87NEJBQ3BHLE9BQU8sR0FBRyxLQUFLLHNCQUFzQixhQUFhLE9BQU8sT0FBTzs7OztvQkFJeEUsT0FBTyxZQUFZLG9DQUFvQzt3QkFDbkQscUJBQXFCO3dCQUNyQixpQkFBaUI7Ozs7b0JBSXJCLFdBQVc7OztnQkFHZixHQUFHLHlDQUF5QyxZQUFXOztvQkFFbkQsT0FBTyxnQkFBZ0IsSUFBSSxNQUFNLFNBQVMsUUFBUTs7O29CQUdsRCxPQUFPLG9CQUFvQixrQkFBa0IscUJBQXFCLFdBQVcsR0FBRzs7O29CQUdoRixPQUFPLGdCQUFnQixJQUFJLE1BQU0sU0FBUyxRQUFROztvQkFFbEQsT0FBTyxLQUFLLE1BQU0sUUFBUSxRQUFROzs7Z0JBR3RDLFNBQVMsVUFBVSxZQUFXO29CQUMxQixHQUFHLHlEQUF5RCxZQUFXO3dCQUNuRSxvQkFBb0IsaUJBQWlCLE1BQU07d0JBQzNDLEtBQUssU0FBUyxXQUFXLE1BQU0sR0FBRyxHQUFHO3dCQUNyQyxPQUFPLG9CQUFvQixrQkFBa0IsSUFBSTs7O29CQUdyRCxHQUFHLHFEQUFxRCxZQUFXO3dCQUMvRCxvQkFBb0IsaUJBQWlCLE1BQU07d0JBQzNDLEtBQUssU0FBUyxXQUFXLE1BQU0sSUFBSSxHQUFHO3dCQUN0QyxPQUFPLG9CQUFvQixrQkFBa0IscUJBQXFCLFdBQVcsSUFBSTs7O29CQUdyRixHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxJQUFJOzs7d0JBR0osV0FBVzs7d0JBRVgsS0FBSyxTQUFTLE1BQU0sTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLFVBQVMsUUFBUTs0QkFDeEQsV0FBVzs7d0JBRWYsV0FBVzs7d0JBRVgsT0FBTyxVQUFVO3dCQUNqQixPQUFPLFNBQVMsTUFBTTt3QkFDdEIsT0FBTyxTQUFTLGdCQUFnQixlQUFlLFFBQVE7OztvQkFHM0QsR0FBRyxxQ0FBcUMsWUFBVzt3QkFDL0Msb0JBQW9CLGlCQUFpQixNQUFNO3dCQUMzQyxLQUFLLFNBQVMsWUFBWSxNQUFNLElBQUksR0FBRzt3QkFDdkMsT0FBTyxvQkFBb0Isa0JBQWtCLHFCQUFxQixZQUFZLElBQUk7OztvQkFHdEYsR0FBRyx3REFBd0QsWUFBVzt3QkFDbEUsS0FBSyxzQkFBc0I7d0JBQzNCLEtBQUssU0FBUyxRQUFRLE1BQU0sR0FBRyxHQUFHO3dCQUNsQyxPQUFPLGdCQUFnQixPQUFPO3dCQUM5QixPQUFPLEtBQUsscUJBQXFCLFFBQVE7Ozt3QkFHekMsS0FBSyxzQkFBc0I7d0JBQzNCLGdCQUFnQixNQUFNLE1BQU07d0JBQzVCLEtBQUssU0FBUyxTQUFTLE1BQU0sR0FBRyxHQUFHO3dCQUNuQyxPQUFPLGdCQUFnQixPQUFPO3dCQUM5QixPQUFPLEtBQUsscUJBQXFCLFFBQVE7OztvQkFHN0MsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsS0FBSyxzQkFBc0I7d0JBQzNCLEtBQUssU0FBUyxRQUFRLE1BQU0sR0FBRyxHQUFHO3dCQUNsQyxPQUFPLGdCQUFnQixPQUFPOzt3QkFFOUIsS0FBSyxzQkFBc0I7d0JBQzNCLGdCQUFnQixNQUFNLE1BQU07d0JBQzVCLEtBQUssU0FBUyxRQUFRLE1BQU0sR0FBRyxHQUFHO3dCQUNsQyxPQUFPLGdCQUFnQixPQUFPLElBQUk7d0JBQ2xDLE9BQU8sS0FBSyxxQkFBcUIsUUFBUTs7OztnQkFJakQsU0FBUyxlQUFlLGdCQUFnQixjQUFjOztvQkFFbEQsb0JBQW9CLGlCQUFpQixNQUFNOzs7b0JBRzNDLFdBQVc7OztvQkFHWDs7O29CQUdBLE9BQU8sb0JBQW9CLGtCQUFrQixJQUFJO29CQUNqRCxPQUFPLEtBQUssYUFBYSxRQUFROzs7b0JBR2pDLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxPQUFPLEtBQUssYUFBYSxRQUFRO29CQUNqQyxPQUFPLEtBQUsscUJBQXFCLFFBQVE7OztnQkFHN0MsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLGVBQWUsS0FBSyxTQUFTLEtBQUssT0FBTzs7O29CQUc3QyxHQUFHLCtFQUErRSxZQUFXO3dCQUN6RixnQkFBZ0IsSUFBSSxNQUFNO3dCQUMxQixLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxnQkFBZ0IsS0FBSyxxQkFBcUIsR0FBRzs7O29CQUd4RCxHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxvQkFBb0IsaUJBQWlCLE1BQU07d0JBQzNDLEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLG9CQUFvQixrQkFBa0IsSUFBSTs7O3dCQUdqRCxLQUFLLFVBQVUsV0FBVyxjQUFjO3dCQUN4QyxLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxvQkFBb0Isa0JBQWtCLElBQUk7OztvQkFHckQsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsb0JBQW9CLGlCQUFpQixNQUFNOzs7d0JBRzNDLEtBQUssVUFBVSxXQUFXLGNBQWM7d0JBQ3hDLEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLG9CQUFvQixrQkFBa0IscUJBQXFCLFdBQVcsSUFBSTs7OztnQkFJekYsU0FBUyxZQUFZLFlBQVc7b0JBQzVCLEdBQUcscUNBQXFDLFlBQVc7O3dCQUUvQyxLQUFLO3dCQUNMLFdBQVc7Ozt3QkFHWCxTQUFTOzs7d0JBR1QsS0FBSyxjQUFjOzs7d0JBR25CLGVBQWUsS0FBSyxhQUFhLEtBQUssT0FBTzs7O29CQUdqRCxHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxnQkFBZ0IsSUFBSSxNQUFNOzs7d0JBRzFCLEtBQUssVUFBVSxXQUFXLGNBQWM7d0JBQ3hDLEtBQUs7d0JBQ0wsV0FBVzs7O3dCQUdYLE9BQU8sZ0JBQWdCLEtBQUsscUJBQXFCLEdBQUc7OztvQkFHeEQsR0FBRyxzQ0FBc0MsWUFBVzs7d0JBRWhELEtBQUssVUFBVSxXQUFXLGNBQWM7d0JBQ3hDLEtBQUs7d0JBQ0wsV0FBVzs7O3dCQUdYLGdCQUFnQixJQUFJLE1BQU07d0JBQzFCLFNBQVMsTUFBTTt3QkFDZixPQUFPLGdCQUFnQixLQUFLLHFCQUFxQixHQUFHOzs7b0JBR3hELEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLE1BQU0sVUFBVSxVQUFVLElBQUk7d0JBQzlCLGdCQUFnQixJQUFJLE1BQU07Ozt3QkFHMUIsS0FBSyxVQUFVLFdBQVcsY0FBYzs7Ozt3QkFJeEMsS0FBSzt3QkFDTCxXQUFXO3dCQUNYLFNBQVMsTUFBTTt3QkFDZixLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxTQUFTLFFBQVE7Ozt3QkFHeEIsZ0JBQWdCLElBQUksTUFBTTt3QkFDMUIsU0FBUyxNQUFNO3dCQUNmLE9BQU8sZ0JBQWdCLEtBQUssSUFBSTs7O3dCQUdoQyxTQUFTLE1BQU07d0JBQ2YsT0FBTyxnQkFBZ0IsS0FBSyxxQkFBcUIsR0FBRzs7O29CQUd4RCxHQUFHLHNFQUFzRSxZQUFXO3dCQUNoRixNQUFNLFVBQVUsVUFBVSxJQUFJO3dCQUM5QixnQkFBZ0IsSUFBSSxNQUFNOzs7d0JBRzFCLEtBQUssVUFBVSxXQUFXLGNBQWM7Ozt3QkFHeEMsS0FBSzt3QkFDTCxXQUFXO3dCQUNYLE9BQU8sU0FBUyxRQUFRLElBQUk7Ozt3QkFHNUIsU0FBUyxNQUFNO3dCQUNmLE9BQU8sU0FBUyxRQUFRLElBQUk7Ozt3QkFHNUIsS0FBSzt3QkFDTCxPQUFPLFNBQVMsUUFBUTt3QkFDeEIsT0FBTyxnQkFBZ0IsS0FBSyxxQkFBcUIsR0FBRzs7Ozs7O0dBUzdEIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0c1dpZGdldERpcmVjdGl2ZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdGllc1dpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9pZGVudGl0aWVzL0lkZW50aXRpZXNXaWRnZXRNb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL3NlYXJjaC9MaXN0UmVzdWx0VGVzdFNlcnZpY2UnO1xyXG5cclxuZGVzY3JpYmUoJ0RpcmVjdFJlcG9ydHNXaWRnZXREaXJlY3RpdmVDdHJsJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZGlyZWN0UmVwb3J0U2VydmljZSwgTGlzdFJlc3VsdERUTywgTGlzdFJlc3VsdENhY2hlLCBjdHJsLCAkcm9vdFNjb3BlLCAkdGltZW91dDtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0aWVzV2lkZ2V0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczo3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfTGlzdFJlc3VsdERUT18sIERpcmVjdFJlcG9ydCwgbGlzdFJlc3VsdFRlc3RTZXJ2aWNlLCAkcSwgJGNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8sIF8kdGltZW91dF8pIHtcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcclxuICAgICAgICBMaXN0UmVzdWx0RFRPID0gX0xpc3RSZXN1bHREVE9fO1xyXG5cclxuICAgICAgICBMaXN0UmVzdWx0Q2FjaGUgPSB7XHJcbiAgICAgICAgICAgIHNpemU6IDAsXHJcblxyXG4gICAgICAgICAgICBnZXQ6IGphc21pbmUuY3JlYXRlU3B5KCdnZXQnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oc3RhcnRJZHgsIG51bUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydElkeCArIG51bUl0ZW1zIDw9IHRoaXMuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0UmVzdWx0VGVzdFNlcnZpY2UuY3JlYXRlUmVzdWx0KHN0YXJ0SWR4LCBudW1JdGVtcywgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgYWRkOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKHJlc3VsdCwgc3RhcnQsIGNodW5rU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplICs9IGNodW5rU2l6ZTtcclxuICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICByZXNldDogamFzbWluZS5jcmVhdGVTcHkoJ3Jlc2V0JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBBIExpc3RSZXN1bHRDYWNoZSBmYWN0b3J5IHRoYXQganVzdCByZXR1cm5zIG91ciBtb2NrIGluc3RhbmNlLlxyXG4gICAgICAgIGZ1bmN0aW9uIExpc3RSZXN1bHRDYWNoZU1vY2soKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBMaXN0UmVzdWx0Q2FjaGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgc2VydmljZS5cclxuICAgICAgICBkaXJlY3RSZXBvcnRTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXREaXJlY3RSZXBvcnRzOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0RGlyZWN0UmVwb3J0cycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihzZWFyY2hUZXJtLCBzdGFydCwgbGltaXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKGxpc3RSZXN1bHRUZXN0U2VydmljZS5jcmVhdGVSZXN1bHQoc3RhcnQsIGxpbWl0LCAxMDApKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0RpcmVjdFJlcG9ydHNXaWRnZXREaXJlY3RpdmVDdHJsJywge1xyXG4gICAgICAgICAgICBkaXJlY3RSZXBvcnRTZXJ2aWNlOiBkaXJlY3RSZXBvcnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBMaXN0UmVzdWx0Q2FjaGU6IExpc3RSZXN1bHRDYWNoZU1vY2tcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRGlnZXN0IHRvIGdldCBwcm9taXNlcyByZXNvbHZlZC5cclxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdsb2FkcyBkaXJlY3QgcmVwb3J0cyB3aGVuIGNvbnN0cnVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQ2FsbGVkIG9uY2UgdG8gdHJ5IGdldCBmcm9tIHRoZSBjYWNoZSBhbmQgYW5vdGhlciB0aW1lIGFmdGVyIHRoZSBkYXRhIGhhcyBiZWVuIGxvYWRlZC5cclxuICAgICAgICBleHBlY3QoTGlzdFJlc3VsdENhY2hlLmdldC5jYWxscy5jb3VudCgpKS50b0VxdWFsKDIpO1xyXG5cclxuICAgICAgICAvLyBDYWxsZWQgdG8gbG9hZCB0aGUgcmVzdWx0cy5cclxuICAgICAgICBleHBlY3QoZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsIDAsIDQwKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsbGVkIHRvIGluc2VydCB0aGUgcmVzdWx0cyBpbnRvIHRoZSBjYWNoZSBhZnRlciBsb2FkaW5nLlxyXG4gICAgICAgIGV4cGVjdChMaXN0UmVzdWx0Q2FjaGUuYWRkLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgIGV4cGVjdChjdHJsLml0ZW1zLmxlbmd0aCkudG9FcXVhbCg1KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWFyY2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZG9lcyBub3QgbG9hZCBkaXJlY3QgcmVwb3J0cyBpZiB0aGV5IGFyZSBpbiB0aGUgY2FjaGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGN0cmwuZG9TZWFyY2godW5kZWZpbmVkLCBudWxsLCAwLCA1LCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2xvYWRzIGRpcmVjdCByZXBvcnRzIGlmIHRoZXkgYXJlIG5vdCBpbiB0aGUgY2FjaGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGN0cmwuZG9TZWFyY2godW5kZWZpbmVkLCBudWxsLCA0MCwgNSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaXJlY3RSZXBvcnRTZXJ2aWNlLmdldERpcmVjdFJlcG9ydHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwgNDAsIDQwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NvbnZlcnRzIHRoZSBMaXN0UmVzdWx0IGludG8gYW4gSFRUUC1saWtlIHJlc3VsdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBEaWdlc3Qgc28gdGhhdCB0aGUgcmVzdWx0cyBmcm9tIHRoZSBpbml0aWFsIGxvYWQgZ2V0IGludG8gdGhlIGNhY2hlLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaChudWxsLCBudWxsLCAwLCA1LCBudWxsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEgaW5zdGFuY2VvZiBMaXN0UmVzdWx0RFRPKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndXNlcyB0aGUgc2VhcmNoIHRlcm0gaWYgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBjdHJsLmRvU2VhcmNoKCdzdXAgZGF3ZycsIG51bGwsIDQwLCA1LCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3N1cCBkYXdnJywgNDAsIDQwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Jlc2V0cyB0aGUgY2FjaGUgYW5kIGRpc3BsYXllZCBwYWdlIGlmIHF1ZXJ5IGNoYW5nZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5kaXNwbGF5ZWRQYWdlTnVtYmVyID0gMjtcclxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaCgnYmxhaCcsIG51bGwsIDAsIDUsIG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3QoTGlzdFJlc3VsdENhY2hlLnJlc2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmRpc3BsYXllZFBhZ2VOdW1iZXIpLnRvRXF1YWwoMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUcnkgYWdhaW4gd2l0aCBhIGRpZmZlcmVudCBxdWVyeSB0ZXJtLiAgU2hvdWxkIHJlc2V0IGFnYWluLlxyXG4gICAgICAgICAgICBjdHJsLmRpc3BsYXllZFBhZ2VOdW1iZXIgPSAzO1xyXG4gICAgICAgICAgICBMaXN0UmVzdWx0Q2FjaGUucmVzZXQuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaCgnYmx1cmInLCBudWxsLCAwLCA1LCBudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5yZXNldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kaXNwbGF5ZWRQYWdlTnVtYmVyKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgcmVzZXQgdGhlIGNhY2hlIGlmIHRoZSBzYW1lIHF1ZXJ5IGlzIHVzZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5kaXNwbGF5ZWRQYWdlTnVtYmVyID0gMjtcclxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaCgnYmxhaCcsIG51bGwsIDAsIDUsIG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3QoTGlzdFJlc3VsdENhY2hlLnJlc2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLmRpc3BsYXllZFBhZ2VOdW1iZXIgPSA0O1xyXG4gICAgICAgICAgICBMaXN0UmVzdWx0Q2FjaGUucmVzZXQuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaCgnYmxhaCcsIG51bGwsIDAsIDUsIG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3QoTGlzdFJlc3VsdENhY2hlLnJlc2V0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kaXNwbGF5ZWRQYWdlTnVtYmVyKS50b0VxdWFsKDQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdFBhZ2VDaGFuZ2UoY2hhbmdlUGFnZUZ1bmMsIGV4cGVjdGVkUGFnZSkge1xyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBjYWxscy5cclxuICAgICAgICBkaXJlY3RSZXBvcnRTZXJ2aWNlLmdldERpcmVjdFJlcG9ydHMuY2FsbHMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgLy8gRGlnZXN0IHRvIGdldCB0aGUgaW5pdGlhbCBmZXRjaCBwcm9taXNlIHJlc29sdmVkLlxyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgIC8vIENoYW5nZSBwYWdlcyBhbmQgbWFrZSBzdXJlIHN0dWZmIGlzIGFsbCBrb3NoZXIuXHJcbiAgICAgICAgY2hhbmdlUGFnZUZ1bmMoKTtcclxuXHJcbiAgICAgICAgLy8gU2hvdWxkIG5vdCBoYXZlIGNhbGxlZCBnZXREaXJlY3RSZXBvcnRzKCkgc2luY2UgdGhlIGRhdGEgd2FzIGluIHRoZSBjYWNoZS5cclxuICAgICAgICBleHBlY3QoZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmZvY3VzT25MaXN0KS50b0VxdWFsKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gRGlnZXN0IHRvIHJlc29sdmUgdGhlIGxvYWQgcHJvbWlzZSwgYW5kIGZsdXNoIHRpbWVvdXQgdG8gbGV0IHRoZSBmb2N1cyBoYXBwZW4uXHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmZvY3VzT25MaXN0KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmRpc3BsYXllZFBhZ2VOdW1iZXIpLnRvRXF1YWwoZXhwZWN0ZWRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnbmV4dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdjaGFuZ2VzIHBhZ2VzIGFuZCBmb2N1c2VzIG9uIGxpc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdFBhZ2VDaGFuZ2UoY3RybC5uZXh0UGFnZS5iaW5kKGN0cmwpLCAxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2dyYWJzIGRhdGEgZnJvbSB0aGUgY2FjaGUgc3RhcnRpbmcgYXQgdGhlIGJlZ2lubmluZyBhbmQgZW5kaW5nIGF0IGxhc3QgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBMaXN0UmVzdWx0Q2FjaGUuZ2V0LmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGN0cmwubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDEwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHByZWxvYWQgY2FjaGUgaWYgbW9yZSB0aGFuIHR3byBleHRyYSBwYWdlcyBhcmUgY2FjaGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBjdHJsLm5leHRQYWdlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaXJlY3RSZXBvcnRTZXJ2aWNlLmdldERpcmVjdFJlcG9ydHMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBQYWdlIDQgaXMgaXRlbXMgMjEtMjUuICBQcmVsb2FkIGhhcHBlbnMgYXQgaXRlbSAzMCwgc28gdGhpcyBzaG91bGRuJ3QgcHJlbG9hZC5cclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDQ7XHJcbiAgICAgICAgICAgIGN0cmwubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3ByZWxvYWRzIGNhY2hlIGlmIGxlc3MgdGhhbiB0d28gZXh0cmEgcGFnZXMgYXJlIGNhY2hlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkaXJlY3RSZXBvcnRTZXJ2aWNlLmdldERpcmVjdFJlcG9ydHMuY2FsbHMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBhZ2UgNSBpcyBpdGVtcyAyNS0yOS4gIFByZWxvYWQgaGFwcGVucyBhdCBpdGVtIDMwLCBzbyB0aGlzIHNob3VsZCBwcmVsb2FkLlxyXG4gICAgICAgICAgICBjdHJsLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlID0gNTtcclxuICAgICAgICAgICAgY3RybC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsIDQwLCA0MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncHJldmlvdXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnY2hhbmdlcyBwYWdlcyBhbmQgZm9jdXNlcyBvbiBsaXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIEdvIHRvIHRoZSBuZXh0IHBhZ2VcclxuICAgICAgICAgICAgY3RybC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmx1c2ggdG8gZ2V0IHRoZSBmb2N1c2luZyBkb25lLlxyXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgdGhpcyBiZWZvcmUgd2Ugc3RhcnQgdGVzdGluZy5cclxuICAgICAgICAgICAgY3RybC5mb2N1c09uTGlzdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gRmluYWxseSAuLi4gdGVzdCBpdC5cclxuICAgICAgICAgICAgdGVzdFBhZ2VDaGFuZ2UoY3RybC5wcmV2aW91c1BhZ2UuYmluZChjdHJsKSwgMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdmZXRjaGVzIGV4dHJhIGRhdGEgd2hlbiBzY3JvbGxpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgTGlzdFJlc3VsdENhY2hlLmdldC5jYWxscy5yZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJldGVuZCBsaWtlIHdlJ3JlIG9uIHRoZSBzZWNvbmQgcGFnZS5cclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDI7XHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBzaG91bGQgZ3JhYiAyMCBpdGVtcyBmcm9tIHRoZSBjYWNoZS5cclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDIwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlZmVjdGNoZXMgYWZ0ZXIgcGFnZSBoYXMgc2Nyb2xsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gUHJldGVuZCBsaWtlIHdlJ3JlIG9uIHRoZSBzZWNvbmQgcGFnZS5cclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDI7XHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIHRpbWVvdXQgZmx1c2ggYW5kIHZlcmlmeSB0aGF0IHRoZSBzbWFsbGVyIHBhZ2Ugc2l6ZSBoYXMgYmVlbiBmZXRjaGVkLlxyXG4gICAgICAgICAgICBMaXN0UmVzdWx0Q2FjaGUuZ2V0LmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKDIwMDApO1xyXG4gICAgICAgICAgICBleHBlY3QoTGlzdFJlc3VsdENhY2hlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMCwgNSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdvbmx5IHJlZmV0Y2hlcyBvbmNlIGlmIHByZXZpb3VzIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBxdWlja2x5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKCR0aW1lb3V0LCAnY2FuY2VsJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIExpc3RSZXN1bHRDYWNoZS5nZXQuY2FsbHMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXRlbmQgbGlrZSB3ZSdyZSBvbiB0aGUgdGhpcmQgcGFnZS5cclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDM7XHJcblxyXG4gICAgICAgICAgICAvLyBHbyBiYWNrIDIgcGFnZXMgLSB3YWl0IDEgc2Vjb25kIGluIGJldHdlZW4uICBUaGUgc2Vjb25kIHBhZ2UgY2hhbmdlIHNob3VsZCBjYW5jZWwgdGhlXHJcbiAgICAgICAgICAgIC8vIGZpcnN0IHJlZnJlc2guXHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKDEwMDApO1xyXG4gICAgICAgICAgICBjdHJsLnByZXZpb3VzUGFnZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHRpbWVvdXQuY2FuY2VsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBXYWl0IDEgbW9yZSBzZWNvbmQuICBUaGlzIGlzIHRlc3RpbmcgdGhhdCB0aGUgZmlyc3QgdGltZW91dCBnZXRzIGNhbmNlbGxlZC5cclxuICAgICAgICAgICAgTGlzdFJlc3VsdENhY2hlLmdldC5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgxMDAwKTtcclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBXYWl0IDEgbW9yZSBzZWNvbmQgKDIgc2Vjb25kcyBhZnRlciBvdXIgbGFzdCBwYWdlIGNoYW5nZSkuICBUaGlzIHNob3VsZCByZWZldGNoLlxyXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgxMDAwKTtcclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgcmVmZXRjaCBhZnRlciBwYWdlIGhhcyBzY3JvbGxlZCBpZiBuZXh0IGlzIGNhbGxlZCBxdWlja2x5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKCR0aW1lb3V0LCAnY2FuY2VsJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIExpc3RSZXN1bHRDYWNoZS5nZXQuY2FsbHMucmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXRlbmQgbGlrZSB3ZSdyZSBvbiB0aGUgc2Vjb25kIHBhZ2UuXHJcbiAgICAgICAgICAgIGN0cmwucGFnZVN0YXRlLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSAyO1xyXG5cclxuICAgICAgICAgICAgLy8gR28gYmFjayBvbmUgcGFnZS5cclxuICAgICAgICAgICAgY3RybC5wcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KCR0aW1lb3V0LmNhbmNlbCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdhaXQgYSBzZWNvbmQgLi4uIHN0aWxsIHNob3VsZG4ndCBjYW5jZWwgdGhlIHRpbWVvdXQuXHJcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKDEwMDApO1xyXG4gICAgICAgICAgICBleHBlY3QoJHRpbWVvdXQuY2FuY2VsKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgcGFnZSwgdGhpcyBzaG91bGQgY2FuY2VsIHRoZSB0aW1lb3V0LlxyXG4gICAgICAgICAgICBjdHJsLm5leHRQYWdlKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkdGltZW91dC5jYW5jZWwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KExpc3RSZXN1bHRDYWNoZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDEwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
