System.register(['test/js/TestInitializer', 'workitem/WorkItemModule', 'test/js/TestModule', 'test/js/workitem/AbstractWorkItemListTestCtrl'], function (_export) {
    'use strict';

    var workItemModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsWorkitemAbstractWorkItemListTestCtrl) {}],
        execute: function () {

            /**
             * Tests for the AbstractWorkItemListCtrl
             */
            describe('AbstractWorkItemListCtrl', function () {

                var searchSpy,
                    ctrl,
                    initialPageState,
                    $rootScope,
                    testService,
                    q,
                    $controller,
                    $timeout,
                    workItemServiceMock,
                    supportedWorkItemType = true;

                beforeEach(module(testModule, workItemModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_testService_, _$controller_, PageState, _$rootScope_, _$timeout_, $q) {
                    initialPageState = new PageState();
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $timeout = _$timeout_;
                    q = $q;

                    workItemServiceMock = {
                        openWorkItemDialog: jasmine.createSpy().and.returnValue($q.when()),
                        openUnSupportedWorkItemDialog: jasmine.createSpy().and.returnValue($q.when()),
                        isSupportedWorkItemType: function () {
                            return supportedWorkItemType;
                        }
                    };

                    initializeTest(6);
                }));

                /**
                 * Initialize the controller and mocks where the search spy will
                 * return the given number of total work items.
                 */
                var initializeTest = function (resultCount, results) {
                    var i;
                    if (!results) {
                        results = [];
                        for (i = 0; i < initialPageState.pagingData.itemsPerPage && i < resultCount; i++) {
                            results.push({});
                        }
                    }

                    // Create a spy that gets called when the controller searches.
                    searchSpy = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: resultCount,
                            objects: results
                        }
                    }, {});
                    ctrl = $controller('AbstractWorkItemListTestCtrl', {
                        searchSpy: searchSpy,
                        initialPageState: initialPageState,
                        workItemService: workItemServiceMock
                    });

                    // Run the digest cycle to get the deferred to resolve.
                    $rootScope.$apply();
                };

                describe('doLoadFilters', function () {
                    it('returns resolved promise to empty array', function () {
                        var filtersCheck;
                        ctrl.doLoadFilters().then(function (filters) {
                            filtersCheck = filters;
                        });
                        $rootScope.$apply();
                        expect(filtersCheck).toEqual([]);
                    });
                });

                describe('sorting', function () {

                    function checkSort(isSortByNewest, isSortByOldest, isSortByPriority) {
                        expect(ctrl.isSortByNewest()).toEqual(isSortByNewest);
                        expect(ctrl.isSortByOldest()).toEqual(isSortByOldest);
                        expect(ctrl.isSortByPriority()).toEqual(isSortByPriority);
                    }

                    it('default to sort by newest', function () {
                        checkSort(true, false, false);
                    });

                    it('remembers the sort order after sorting', function () {
                        ctrl.sortByPriority();
                        checkSort(false, false, true);

                        ctrl.sortByOldest();
                        checkSort(false, true, false);

                        ctrl.sortByNewest();
                        checkSort(true, false, false);
                    });

                    it('reloads approvals when sorting', function () {
                        searchSpy.calls.reset();
                        ctrl.sortByOldest();
                        expect(searchSpy).toHaveBeenCalled();

                        searchSpy.calls.reset();
                        ctrl.sortByPriority();
                        expect(searchSpy).toHaveBeenCalled();

                        searchSpy.calls.reset();
                        ctrl.sortByNewest();
                        expect(searchSpy).toHaveBeenCalled();
                    });
                });

                describe('completionCallback()', function () {
                    var WorkItemResult, result;

                    function createWorkItemResult(id, errorMsgs) {
                        var messages = [];
                        if (errorMsgs) {
                            messages = errorMsgs.map(function (errorMsg) {
                                return {
                                    status: 'ERROR',
                                    messageOrKey: errorMsg
                                };
                            });
                        }
                        return new WorkItemResult({
                            nextWorkItemId: id,
                            nextWorkItemType: 'Unsupported',
                            messages: messages
                        });
                    }

                    beforeEach(inject(function (_WorkItemResult_) {
                        WorkItemResult = _WorkItemResult_;
                    }));

                    it('refetches workitems', function () {
                        searchSpy.calls.reset();
                        result = createWorkItemResult();
                        result.nextWorkItemType = null;
                        ctrl.completionCallback(result);
                        $timeout.flush();
                        expect(searchSpy).toHaveBeenCalled();
                    });

                    it('stays on first page if last work item is completed', function () {
                        // Setup the approval service to only have one approval.
                        initializeTest(1);

                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                        ctrl.completionCallback(createWorkItemResult());
                        $timeout.flush();
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });

                    it('stays on first page if on first page and work items remain', function () {
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                        ctrl.completionCallback(createWorkItemResult());
                        $timeout.flush();
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });

                    it('goes to previous page if on last page/last work item', function () {
                        // Go to the last page and notify that a work item was completed.
                        ctrl.getPageState().pagingData.currentPage = 2;
                        result = createWorkItemResult();
                        result.nextWorkItemType = null;
                        ctrl.completionCallback(result);
                        $timeout.flush();
                        // Should be on the previous page now.
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });

                    it('stays on last page if work items remain on last page', function () {
                        // Setup the work item list service to have enough for two pages with extra to spare
                        initializeTest(initialPageState.pagingData.itemsPerPage + 2);

                        // Go to the last page and notify that a work item was completed.
                        ctrl.getPageState().pagingData.currentPage = 2;
                        ctrl.completionCallback(createWorkItemResult());
                        $timeout.flush();

                        // Should still be on the last page.
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(2);
                    });

                    it('pops up a dialog if there are errors', function () {
                        ctrl.completionCallback(createWorkItemResult('1234', ['BUSTED']));
                        $rootScope.$apply();

                        // Check that the dialog was opened.
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                    });

                    it('refetches approvals', function () {
                        searchSpy.calls.reset();
                        ctrl.completionCallback(createWorkItemResult('1234', ['BUSTED']));
                        $rootScope.$apply();

                        // Check that approvals were fetched again.
                        expect(searchSpy).toHaveBeenCalled();
                    });

                    it('if there is another work item of the unsupported type popup a message and go back home', function () {
                        supportedWorkItemType = false;

                        ctrl.completionCallback(createWorkItemResult('1234', []));
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });

                    it('if the next work item is of unsupported type popup a message and go back home', function () {
                        var nextWorkItemResult = createWorkItemResult('5678', []);
                        nextWorkItemResult.nextWorkItemType = 'ManualAction';

                        //The next work item is of ManualAction type after a form has been completed
                        supportedWorkItemType = false;

                        ctrl.workItem = {
                            workItemType: 'Form',
                            workItemId: '1234'
                        };

                        ctrl.completionCallback(nextWorkItemResult);
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });

                    it('if there is another work item of the supported type open the work item in a dialog', function () {
                        var nextWorkItemResult;

                        supportedWorkItemType = true;
                        nextWorkItemResult = createWorkItemResult('5678', []);
                        nextWorkItemResult.nextWorkItemType = 'Form';

                        ctrl.completionCallback(nextWorkItemResult);

                        expect(workItemServiceMock.openWorkItemDialog).toHaveBeenCalledWith(nextWorkItemResult.nextWorkItemId);
                    });

                    it('if the next work item is manual action after a form then popup a message and go back home', function () {
                        var nextWorkItemResult, manualActionWorkItem;

                        supportedWorkItemType = true;
                        nextWorkItemResult = createWorkItemResult('5678', []);
                        nextWorkItemResult.nextWorkItemType = 'Form';

                        manualActionWorkItem = createWorkItemResult('676776', []);
                        manualActionWorkItem.nextWorkItemType = 'ManualAction';

                        // mock openWorkItemDialog to return manualAction work item
                        workItemServiceMock.openWorkItemDialog = jasmine.createSpy().and.returnValue(q.when(manualActionWorkItem));
                        ctrl.completionCallback(nextWorkItemResult);
                        //opens the form work item
                        expect(workItemServiceMock.openWorkItemDialog).toHaveBeenCalledWith(nextWorkItemResult.nextWorkItemId);
                        //for manual action work item
                        supportedWorkItemType = false;
                        $rootScope.$apply();
                        expect(workItemServiceMock.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                        expect(ctrl.getPageState().pagingData.currentPage).toEqual(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL0Fic3RyYWN0V29ya0l0ZW1MaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsc0JBQXNCLGtEQUFrRCxVQUFVLFNBQVM7SUFDOUo7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSw2Q0FBNkM7UUFDMUQsU0FBUyxZQUFZOzs7OztZQUY3QixTQUFTLDRCQUE0QixZQUFXOztnQkFFNUMsSUFBSTtvQkFBVztvQkFBTTtvQkFBa0I7b0JBQVk7b0JBQWE7b0JBQzVEO29CQUFhO29CQUFVO29CQUFxQix3QkFBd0I7O2dCQUV4RSxXQUFXLE9BQU8sWUFBWTs7O2dCQUc5QixXQUFXLE9BQU8sVUFBUyxlQUFlLGVBQWUsV0FBVyxjQUFjLFlBQVksSUFBSTtvQkFDOUYsbUJBQW1CLElBQUk7b0JBQ3ZCLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxjQUFjO29CQUNkLFdBQVc7b0JBQ1gsSUFBSTs7b0JBRUosc0JBQXNCO3dCQUNsQixvQkFBb0IsUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHO3dCQUMzRCwrQkFBK0IsUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHO3dCQUN0RSx5QkFBeUIsWUFBVzs0QkFBRSxPQUFPOzs7O29CQUdqRCxlQUFlOzs7Ozs7O2dCQU9uQixJQUFJLGlCQUFpQixVQUFTLGFBQWEsU0FBUztvQkFDaEQsSUFBSTtvQkFDSixJQUFJLENBQUMsU0FBUzt3QkFDVixVQUFVO3dCQUNWLEtBQUssSUFBSSxHQUFHLElBQUksaUJBQWlCLFdBQVcsZ0JBQWdCLElBQUksYUFBYSxLQUFLOzRCQUMvRSxRQUFRLEtBQUs7Ozs7O29CQUtwQixZQUFZLFlBQVksaUJBQWlC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QkFFeEIsT0FBTyxvQkFBb0Isb0JBQW9CLHFCQUFxQixtQkFBbUI7O3dCQUV2Rix3QkFBd0I7d0JBQ3hCLFdBQVc7d0JBQ1gsT0FBTyxvQkFBb0IsK0JBQStCO3dCQUMxRCxPQUFPLEtBQUssZUFBZSxXQUFXLGFBQWEsUUFBUTs7Ozs7O0dBc0JwRSIsImZpbGUiOiJ3b3JraXRlbS9BYnN0cmFjdFdvcmtJdGVtTGlzdEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvd29ya2l0ZW0vQWJzdHJhY3RXb3JrSXRlbUxpc3RUZXN0Q3RybCc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBBYnN0cmFjdFdvcmtJdGVtTGlzdEN0cmxcbiAqL1xuZGVzY3JpYmUoJ0Fic3RyYWN0V29ya0l0ZW1MaXN0Q3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHNlYXJjaFNweSwgY3RybCwgaW5pdGlhbFBhZ2VTdGF0ZSwgJHJvb3RTY29wZSwgdGVzdFNlcnZpY2UsIHEsXG4gICAgICAgICRjb250cm9sbGVyLCAkdGltZW91dCwgd29ya0l0ZW1TZXJ2aWNlTW9jaywgc3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gdHJ1ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIHdvcmtJdGVtTW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgUGFnZVN0YXRlLCBfJHJvb3RTY29wZV8sIF8kdGltZW91dF8sICRxKSB7XG4gICAgICAgIGluaXRpYWxQYWdlU3RhdGUgPSBuZXcgUGFnZVN0YXRlKCk7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkdGltZW91dCA9IF8kdGltZW91dF87XG4gICAgICAgIHEgPSAkcTtcblxuICAgICAgICB3b3JrSXRlbVNlcnZpY2VNb2NrID0ge1xuICAgICAgICAgICAgb3BlbldvcmtJdGVtRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpLFxuICAgICAgICAgICAgb3BlblVuU3VwcG9ydGVkV29ya0l0ZW1EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSksXG4gICAgICAgICAgICBpc1N1cHBvcnRlZFdvcmtJdGVtVHlwZTogZnVuY3Rpb24oKSB7IHJldHVybiBzdXBwb3J0ZWRXb3JrSXRlbVR5cGU7IH1cbiAgICAgICAgfTtcblxuICAgICAgICBpbml0aWFsaXplVGVzdCg2KTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBjb250cm9sbGVyIGFuZCBtb2NrcyB3aGVyZSB0aGUgc2VhcmNoIHNweSB3aWxsXG4gICAgICogcmV0dXJuIHRoZSBnaXZlbiBudW1iZXIgb2YgdG90YWwgd29yayBpdGVtcy5cbiAgICAgKi9cbiAgICB2YXIgaW5pdGlhbGl6ZVRlc3QgPSBmdW5jdGlvbihyZXN1bHRDb3VudCwgcmVzdWx0cykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKCFyZXN1bHRzKSB7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5pdGlhbFBhZ2VTdGF0ZS5wYWdpbmdEYXRhLml0ZW1zUGVyUGFnZSAmJiBpIDwgcmVzdWx0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIHNweSB0aGF0IGdldHMgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2xsZXIgc2VhcmNoZXMuXG4gICAgICAgIHNlYXJjaFNweSA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGNvdW50OiByZXN1bHRDb3VudCxcbiAgICAgICAgICAgICAgICBvYmplY3RzOiByZXN1bHRzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBYnN0cmFjdFdvcmtJdGVtTGlzdFRlc3RDdHJsJywge1xuICAgICAgICAgICAgc2VhcmNoU3B5OiBzZWFyY2hTcHksXG4gICAgICAgICAgICBpbml0aWFsUGFnZVN0YXRlOiBpbml0aWFsUGFnZVN0YXRlLFxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlOiB3b3JrSXRlbVNlcnZpY2VNb2NrXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJ1biB0aGUgZGlnZXN0IGN5Y2xlIHRvIGdldCB0aGUgZGVmZXJyZWQgdG8gcmVzb2x2ZS5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICB9O1xuXG4gICAgZGVzY3JpYmUoJ2RvTG9hZEZpbHRlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgcmVzb2x2ZWQgcHJvbWlzZSB0byBlbXB0eSBhcnJheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZpbHRlcnNDaGVjaztcbiAgICAgICAgICAgIGN0cmwuZG9Mb2FkRmlsdGVycygpLnRoZW4oZnVuY3Rpb24oZmlsdGVycykge1xuICAgICAgICAgICAgICAgIGZpbHRlcnNDaGVjayA9IGZpbHRlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyc0NoZWNrKS50b0VxdWFsKFtdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSAoJ3NvcnRpbmcnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja1NvcnQoaXNTb3J0QnlOZXdlc3QsIGlzU29ydEJ5T2xkZXN0LCBpc1NvcnRCeVByaW9yaXR5KSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NvcnRCeU5ld2VzdCgpKS50b0VxdWFsKGlzU29ydEJ5TmV3ZXN0KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU29ydEJ5T2xkZXN0KCkpLnRvRXF1YWwoaXNTb3J0QnlPbGRlc3QpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb3J0QnlQcmlvcml0eSgpKS50b0VxdWFsKGlzU29ydEJ5UHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQgKCdkZWZhdWx0IHRvIHNvcnQgYnkgbmV3ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGVja1NvcnQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlbWVtYmVycyB0aGUgc29ydCBvcmRlciBhZnRlciBzb3J0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLnNvcnRCeVByaW9yaXR5KCk7XG4gICAgICAgICAgICBjaGVja1NvcnQoZmFsc2UsIGZhbHNlLCB0cnVlKTtcblxuICAgICAgICAgICAgY3RybC5zb3J0QnlPbGRlc3QoKTtcbiAgICAgICAgICAgIGNoZWNrU29ydChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICBjdHJsLnNvcnRCeU5ld2VzdCgpO1xuICAgICAgICAgICAgY2hlY2tTb3J0KHRydWUsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZWxvYWRzIGFwcHJvdmFscyB3aGVuIHNvcnRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlYXJjaFNweS5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgY3RybC5zb3J0QnlPbGRlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAgICAgc2VhcmNoU3B5LmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBjdHJsLnNvcnRCeVByaW9yaXR5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgICAgIHNlYXJjaFNweS5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgY3RybC5zb3J0QnlOZXdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdjb21wbGV0aW9uQ2FsbGJhY2soKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgV29ya0l0ZW1SZXN1bHQsIHJlc3VsdDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVXb3JrSXRlbVJlc3VsdChpZCwgZXJyb3JNc2dzKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChlcnJvck1zZ3MpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlcyA9IGVycm9yTXNncy5tYXAoZnVuY3Rpb24oZXJyb3JNc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VPcktleTogZXJyb3JNc2dcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgV29ya0l0ZW1SZXN1bHQoe1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiBpZCxcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiAnVW5zdXBwb3J0ZWQnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfV29ya0l0ZW1SZXN1bHRfKSB7XG4gICAgICAgICAgICBXb3JrSXRlbVJlc3VsdCA9IF9Xb3JrSXRlbVJlc3VsdF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgncmVmZXRjaGVzIHdvcmtpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VhcmNoU3B5LmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICByZXN1bHQgPSBjcmVhdGVXb3JrSXRlbVJlc3VsdCgpO1xuICAgICAgICAgICAgcmVzdWx0Lm5leHRXb3JrSXRlbVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzdGF5cyBvbiBmaXJzdCBwYWdlIGlmIGxhc3Qgd29yayBpdGVtIGlzIGNvbXBsZXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGFwcHJvdmFsIHNlcnZpY2UgdG8gb25seSBoYXZlIG9uZSBhcHByb3ZhbC5cbiAgICAgICAgICAgIGluaXRpYWxpemVUZXN0KDEpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2soY3JlYXRlV29ya0l0ZW1SZXN1bHQoKSk7XG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGFnZVN0YXRlKCkucGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3N0YXlzIG9uIGZpcnN0IHBhZ2UgaWYgb24gZmlyc3QgcGFnZSBhbmQgd29yayBpdGVtcyByZW1haW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBhZ2VTdGF0ZSgpLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhjcmVhdGVXb3JrSXRlbVJlc3VsdCgpKTtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZ29lcyB0byBwcmV2aW91cyBwYWdlIGlmIG9uIGxhc3QgcGFnZS9sYXN0IHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gR28gdG8gdGhlIGxhc3QgcGFnZSBhbmQgbm90aWZ5IHRoYXQgYSB3b3JrIGl0ZW0gd2FzIGNvbXBsZXRlZC5cbiAgICAgICAgICAgIGN0cmwuZ2V0UGFnZVN0YXRlKCkucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDI7XG4gICAgICAgICAgICByZXN1bHQgPSBjcmVhdGVXb3JrSXRlbVJlc3VsdCgpO1xuICAgICAgICAgICAgcmVzdWx0Lm5leHRXb3JrSXRlbVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAvLyBTaG91bGQgYmUgb24gdGhlIHByZXZpb3VzIHBhZ2Ugbm93LlxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGFnZVN0YXRlKCkucGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3N0YXlzIG9uIGxhc3QgcGFnZSBpZiB3b3JrIGl0ZW1zIHJlbWFpbiBvbiBsYXN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSB3b3JrIGl0ZW0gbGlzdCBzZXJ2aWNlIHRvIGhhdmUgZW5vdWdoIGZvciB0d28gcGFnZXMgd2l0aCBleHRyYSB0byBzcGFyZVxuICAgICAgICAgICAgaW5pdGlhbGl6ZVRlc3QoaW5pdGlhbFBhZ2VTdGF0ZS5wYWdpbmdEYXRhLml0ZW1zUGVyUGFnZSArIDIpO1xuXG4gICAgICAgICAgICAvLyBHbyB0byB0aGUgbGFzdCBwYWdlIGFuZCBub3RpZnkgdGhhdCBhIHdvcmsgaXRlbSB3YXMgY29tcGxldGVkLlxuICAgICAgICAgICAgY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlID0gMjtcbiAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKGNyZWF0ZVdvcmtJdGVtUmVzdWx0KCkpO1xuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcblxuICAgICAgICAgICAgLy8gU2hvdWxkIHN0aWxsIGJlIG9uIHRoZSBsYXN0IHBhZ2UuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncG9wcyB1cCBhIGRpYWxvZyBpZiB0aGVyZSBhcmUgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhjcmVhdGVXb3JrSXRlbVJlc3VsdCgnMTIzNCcsIFsnQlVTVEVEJ10pKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGRpYWxvZyB3YXMgb3BlbmVkLlxuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZU1vY2sub3BlblVuU3VwcG9ydGVkV29ya0l0ZW1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlZmV0Y2hlcyBhcHByb3ZhbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlYXJjaFNweS5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2soY3JlYXRlV29ya0l0ZW1SZXN1bHQoJzEyMzQnLCBbJ0JVU1RFRCddKSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IGFwcHJvdmFscyB3ZXJlIGZldGNoZWQgYWdhaW4uXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpZiB0aGVyZSBpcyBhbm90aGVyIHdvcmsgaXRlbSBvZiB0aGUgdW5zdXBwb3J0ZWQgdHlwZSBwb3B1cCBhIG1lc3NhZ2UgYW5kIGdvIGJhY2sgaG9tZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKGNyZWF0ZVdvcmtJdGVtUmVzdWx0KCcxMjM0JywgW10pKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlIG5leHQgd29yayBpdGVtIGlzIG9mIHVuc3VwcG9ydGVkIHR5cGUgcG9wdXAgYSBtZXNzYWdlIGFuZCBnbyBiYWNrIGhvbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBuZXh0V29ya0l0ZW1SZXN1bHQgPSBjcmVhdGVXb3JrSXRlbVJlc3VsdCgnNTY3OCcsIFtdKTtcbiAgICAgICAgICAgIG5leHRXb3JrSXRlbVJlc3VsdC5uZXh0V29ya0l0ZW1UeXBlID0gJ01hbnVhbEFjdGlvbic7XG5cbiAgICAgICAgICAgIC8vVGhlIG5leHQgd29yayBpdGVtIGlzIG9mIE1hbnVhbEFjdGlvbiB0eXBlIGFmdGVyIGEgZm9ybSBoYXMgYmVlbiBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN1cHBvcnRlZFdvcmtJdGVtVHlwZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjdHJsLndvcmtJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdGb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgd29ya0l0ZW1JZDogJzEyMzQnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3RybC5jb21wbGV0aW9uQ2FsbGJhY2sobmV4dFdvcmtJdGVtUmVzdWx0KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5wYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaWYgdGhlcmUgaXMgYW5vdGhlciB3b3JrIGl0ZW0gb2YgdGhlIHN1cHBvcnRlZCB0eXBlIG9wZW4gdGhlIHdvcmsgaXRlbSBpbiBhIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5leHRXb3JrSXRlbVJlc3VsdDtcblxuICAgICAgICAgICAgc3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIG5leHRXb3JrSXRlbVJlc3VsdCA9IGNyZWF0ZVdvcmtJdGVtUmVzdWx0KCc1Njc4JywgW10pO1xuICAgICAgICAgICAgbmV4dFdvcmtJdGVtUmVzdWx0Lm5leHRXb3JrSXRlbVR5cGUgPSAnRm9ybSc7XG5cbiAgICAgICAgICAgIGN0cmwuY29tcGxldGlvbkNhbGxiYWNrKG5leHRXb3JrSXRlbVJlc3VsdCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm9wZW5Xb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgobmV4dFdvcmtJdGVtUmVzdWx0Lm5leHRXb3JrSXRlbUlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lmIHRoZSBuZXh0IHdvcmsgaXRlbSBpcyBtYW51YWwgYWN0aW9uIGFmdGVyIGEgZm9ybSB0aGVuIHBvcHVwIGEgbWVzc2FnZSBhbmQgZ28gYmFjayBob21lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFdvcmtJdGVtUmVzdWx0LCBtYW51YWxBY3Rpb25Xb3JrSXRlbTtcblxuICAgICAgICAgICAgc3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIG5leHRXb3JrSXRlbVJlc3VsdCA9IGNyZWF0ZVdvcmtJdGVtUmVzdWx0KCc1Njc4JywgW10pO1xuICAgICAgICAgICAgbmV4dFdvcmtJdGVtUmVzdWx0Lm5leHRXb3JrSXRlbVR5cGUgPSAnRm9ybSc7XG5cbiAgICAgICAgICAgIG1hbnVhbEFjdGlvbldvcmtJdGVtID0gY3JlYXRlV29ya0l0ZW1SZXN1bHQoJzY3Njc3NicsIFtdKTtcbiAgICAgICAgICAgIG1hbnVhbEFjdGlvbldvcmtJdGVtLm5leHRXb3JrSXRlbVR5cGUgPSAnTWFudWFsQWN0aW9uJztcblxuICAgICAgICAgICAgLy8gbW9jayBvcGVuV29ya0l0ZW1EaWFsb2cgdG8gcmV0dXJuIG1hbnVhbEFjdGlvbiB3b3JrIGl0ZW1cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZU1vY2sub3BlbldvcmtJdGVtRGlhbG9nID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUocS53aGVuKG1hbnVhbEFjdGlvbldvcmtJdGVtKSk7XG4gICAgICAgICAgICBjdHJsLmNvbXBsZXRpb25DYWxsYmFjayhuZXh0V29ya0l0ZW1SZXN1bHQpO1xuICAgICAgICAgICAgLy9vcGVucyB0aGUgZm9ybSB3b3JrIGl0ZW1cbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2VNb2NrLm9wZW5Xb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgobmV4dFdvcmtJdGVtUmVzdWx0Lm5leHRXb3JrSXRlbUlkKTtcbiAgICAgICAgICAgIC8vZm9yIG1hbnVhbCBhY3Rpb24gd29yayBpdGVtXG4gICAgICAgICAgICBzdXBwb3J0ZWRXb3JrSXRlbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlTW9jay5vcGVuVW5TdXBwb3J0ZWRXb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGFnZVN0YXRlKCkucGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
