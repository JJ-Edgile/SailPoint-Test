System.register(['test/js/TestInitializer', 'common/search/SearchModule', 'test/js/TestModule', './AbstractListTestCtrl'], function (_export) {
    'use strict';

    var searchModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AbstractListTestCtrl) {}],
        execute: function () {

            /**
             * Tests for the AbstractListCtrl.
             */
            describe('AbstractListCtrl', function () {

                var COL_CONFIG_KEY = 'testColumns',
                    resultCount = 1,
                    returnObject = 'I am an object with no objective',
                    resultMetaData = {
                    some: 'junk'
                },
                    columnConfigs,
                    $rootScope,
                    $controller,
                    testService,
                    PageState,
                    ctrl,
                    deferred,
                    timeout,
                    searchSpy,
                    loadFiltersSpy,
                    configService,
                    initialPageState,
                    $q;

                function createController(disableLoad) {
                    // Create a spy that gets called when the controller searches.
                    searchSpy = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: resultCount,
                            objects: [returnObject],
                            metaData: resultMetaData
                        }
                    }, {});

                    // Create a spy that is used to load filters
                    deferred = $q.defer();
                    loadFiltersSpy = jasmine.createSpy().and.returnValue(deferred.promise);

                    // Create the controller to test with.
                    ctrl = $controller('AbstractListTestCtrl', {
                        configService: configService,
                        initialPageState: initialPageState,
                        searchSpy: searchSpy,
                        loadFiltersSpy: loadFiltersSpy,
                        COL_CONFIG_KEY: COL_CONFIG_KEY,
                        disableLoad: disableLoad
                    });

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                }

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Let the tests know we'll use the search module.
                beforeEach(module(searchModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_PageState_, _testService_, _$controller_, _$rootScope_, _$q_, $timeout, ColumnConfig) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    PageState = _PageState_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    timeout = $timeout;

                    // mock out config service
                    columnConfigs = [new ColumnConfig({
                        dataIndex: 'some',
                        sortable: true
                    }), new ColumnConfig({
                        dataIndex: 'configs',
                        sortable: false,
                        hidden: true
                    })];
                    configService = {
                        getColumnConfigEntries: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                testColumns: columnConfigs
                            }
                        }, {})
                    };

                    // Setup the initial page state.
                    initialPageState = new PageState();

                    // Create the controller to test with.
                    createController(false);
                }));

                describe('constructor', function () {
                    it('fetches items when loaded', function () {
                        // The start and limit are hard-coded.
                        expect(searchSpy).toHaveBeenCalledWith(undefined, {}, 0, 12, undefined);
                        expect(ctrl.items).not.toBeNull();
                        expect(ctrl.items).toBeDefined();
                        expect(ctrl.items.length).toEqual(1);
                        expect(ctrl.items[0]).toEqual(returnObject);
                        expect(ctrl.pageState.pagingData.getTotal()).toEqual(1);
                        expect(ctrl.metaData).toEqual(resultMetaData);
                    });

                    it('does not fetch items when load disabled', function () {
                        // Setup the initial page state.
                        initialPageState = new PageState();

                        // Disable the initial load of the data
                        createController(true);

                        expect(searchSpy).not.toHaveBeenCalled();
                        expect(ctrl.pageState.pagingData.getTotal()).toEqual(-1);
                    });

                    it('initializes page state', function () {
                        expect(ctrl.pageState).toEqual(initialPageState);
                    });
                });

                describe('search', function () {
                    it('focuses the results', function () {
                        expect(ctrl.focusResults).toEqual(false);
                        ctrl.search();
                        timeout.flush();
                        expect(ctrl.focusResults).toEqual(true);
                    });

                    describe('with a key event', function () {
                        var preventDefaultSpy = jasmine.createSpy('preventDefault'),
                            keyEvent;

                        beforeEach(function () {
                            keyEvent = {
                                keyCode: 13,
                                preventDefault: preventDefaultSpy
                            };
                        });

                        it('does nothing on non-enter', function () {
                            searchSpy.calls.reset();
                            keyEvent.keyCode = 42;
                            ctrl.search(keyEvent);
                            timeout.flush();
                            expect(searchSpy).not.toHaveBeenCalled();
                        });

                        it('searches on enter', function () {
                            searchSpy.calls.reset();
                            ctrl.search(keyEvent);
                            timeout.flush();
                            expect(searchSpy).toHaveBeenCalled();
                        });

                        it('prevents the default action on the event for enter', function () {
                            ctrl.search(keyEvent);
                            timeout.flush();
                            expect(preventDefaultSpy).toHaveBeenCalled();
                        });
                    });
                });

                describe('searchScratchPad', function () {
                    it('should have its values transferred to searchData on search', function () {
                        var scratchPad = ctrl.searchScratchPad,
                            searchData = ctrl.pageState.searchData;
                        scratchPad.searchTerm = 'Test';
                        expect(scratchPad.searchTerm).not.toEqual(searchData.searchTerm);
                        ctrl.search();
                        timeout.flush();
                        expect(scratchPad.searchTerm).toEqual(searchData.searchTerm);
                    });

                    it('should be reset back to page state on initialize()', function () {
                        var searchData = ctrl.pageState.searchData;
                        spyOn(searchData, 'areFiltersInitialized').and.returnValue(true);
                        ctrl.searchScratchPad.filterValues.stupid = 'face';
                        ctrl.initialize();
                        timeout.flush();
                        $rootScope.$apply();
                        expect(ctrl.searchScratchPad.filterValues).toEqual(searchData.filterValues);
                    });

                    it('does not fetch items with empty searchTerm and load disabled', function () {
                        // Setup the initial page state.
                        initialPageState = new PageState();

                        // Disable the initial load of the data
                        createController(true);

                        var scratchPad = ctrl.searchScratchPad;

                        // Set the searchTerm to blank
                        scratchPad.searchTerm = '';

                        ctrl.search();
                        timeout.flush();

                        expect(searchSpy).not.toHaveBeenCalled();
                        expect(ctrl.pageState.pagingData.getTotal()).toEqual(-1);
                    });
                });

                describe('column editor', function () {
                    it('start hidden', function () {
                        expect(ctrl.columnEditorDisplayed).toEqual(false);
                    });

                    it('toggles', function () {
                        ctrl.toggleColumnEditor();
                        expect(ctrl.columnEditorDisplayed).toEqual(true);
                        ctrl.toggleColumnEditor();
                        expect(ctrl.columnEditorDisplayed).toEqual(false);

                        spyOn(ctrl, 'toggleFiltersDisplayed');
                        ctrl.filtersDisplayed = true;
                        ctrl.toggleColumnEditor();
                        expect(ctrl.toggleFiltersDisplayed).toHaveBeenCalled();
                    });
                });

                describe('filters', function () {
                    it('start hidden', function () {
                        expect(ctrl.filtersDisplayed).toEqual(false);
                    });

                    it('are shown/hidden when toggled', function () {
                        ctrl.toggleFiltersDisplayed();
                        expect(ctrl.filtersDisplayed).toEqual(true);
                        ctrl.toggleFiltersDisplayed();
                        expect(ctrl.filtersDisplayed).toEqual(false);
                    });

                    it('are collapsed after searching if auto toggle is true', function () {
                        ctrl.filtersDisplayed = true;
                        ctrl.search();
                        timeout.flush();
                        expect(ctrl.filtersDisplayed).toEqual(false);
                    });

                    it('are not collapsed after searching if isHideFiltersOnSearch is false', function () {
                        spyOn(ctrl, 'isHideFiltersOnSearch').and.returnValue(false);
                        ctrl.filtersDisplayed = true;
                        ctrl.search();
                        timeout.flush();
                        expect(ctrl.filtersDisplayed).toEqual(true);
                    });

                    it('should toggle column editor panel if open', function () {
                        spyOn(ctrl, 'toggleColumnEditor');
                        ctrl.columnEditorDisplayed = true;
                        ctrl.toggleFiltersDisplayed();
                        expect(ctrl.toggleColumnEditor).toHaveBeenCalled();
                    });

                    it('should load filters on controller load', function () {
                        expect(loadFiltersSpy).toHaveBeenCalled();
                    });

                    it('should initialize filters on searchData when resolved', function () {
                        var filters = [{ property: 'privateThings' }];
                        spyOn(ctrl.getPageState().searchData, 'initializeFilters');
                        deferred.resolve(filters);
                        $rootScope.$apply();
                        expect(ctrl.getPageState().searchData.initializeFilters).toHaveBeenCalledWith(filters);
                    });

                    it('should not load filters again if already loaded', function () {
                        loadFiltersSpy.calls.reset();
                        spyOn(ctrl.getPageState().searchData, 'areFiltersInitialized').and.returnValue(true);
                        createController(false);
                        expect(loadFiltersSpy).not.toHaveBeenCalled();
                    });

                    it('should call search with filter values', function () {
                        var filters = { filter1: {
                                value: 'hello'
                            }, filter2: {
                                value: 'goodbye'
                            } };

                        ctrl.searchScratchPad.filterValues = filters;
                        ctrl.search();
                        timeout.flush();
                        expect(searchSpy).toHaveBeenCalled();
                        expect(searchSpy.calls.mostRecent().args.length).toEqual(5);
                        expect(searchSpy.calls.mostRecent().args[1]).toEqual(filters);
                    });

                    it('returns correct value for hasAppliedFilters', function () {
                        expect(ctrl.hasAppliedFilters()).toEqual(false);
                        var filterValues = {
                            privateThings: {
                                value: ['plane', 'party', 'loft']
                            }
                        };
                        ctrl.searchScratchPad.filterValues = filterValues;
                        expect(ctrl.hasAppliedFilters()).toEqual(false);
                        ctrl.pageState.searchData.merge(ctrl.searchScratchPad);
                        expect(ctrl.hasAppliedFilters()).toEqual(true);
                    });
                });

                describe('paging state', function () {
                    beforeEach(function () {
                        // Increase the result count so we can page forward.
                        resultCount = 20;
                    });

                    it('should should be initialized', function () {
                        expect(ctrl.pageState).toBeDefined();
                        expect(ctrl.pageState instanceof PageState).toBeTruthy();
                    });

                    it('should be updated when search is run', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.setTotal(100);
                        pagingData.currentPage = 5;

                        ctrl.fetchItems();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.getTotal()).toEqual(20);
                    });

                    it('should reset current page when search is called', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.currentPage = 2;

                        ctrl.search();
                        timeout.flush();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.currentPage).toEqual(1);
                    });

                    it('should update current page when previous page is called', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.currentPage = 2;

                        ctrl.previousPage();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.currentPage).toEqual(1);
                    });

                    it('should update current page when next page is called', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.setTotal(20);
                        pagingData.currentPage = 1;

                        ctrl.nextPage();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.currentPage).toEqual(2);
                    });

                    it('should not change current page when previousPage called on first page', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.currentPage = 1;

                        ctrl.previousPage();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.currentPage).toEqual(1);
                    });

                    it('should not change current page when nextPage called on last page', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.currentPage = 2;

                        ctrl.nextPage();
                        /* resolve promise */
                        $rootScope.$apply();
                        expect(pagingData.currentPage).toEqual(2);
                    });

                    it('should hide the current page info if there are no results', function () {
                        var pagingData = ctrl.pageState.pagingData;
                        pagingData.setTotal(0);
                        expect(ctrl.showCurrentPageInfo()).toEqual(false);
                    });

                    it('should show the current page info if there are results', function () {
                        expect(ctrl.showCurrentPageInfo()).toEqual(true);
                    });
                });

                describe('column configs', function () {
                    it('are loaded if getColumnConfigKey() returns a value', function () {
                        expect(configService.getColumnConfigEntries).toHaveBeenCalled();
                        expect(ctrl.columnConfigs).toEqual(columnConfigs);
                    });

                    it('are filtered into displayedColumnConfigs', function () {
                        expect(ctrl.displayedColumnConfigs).toBeDefined();
                        expect(ctrl.displayedColumnConfigs.length).toEqual(1);
                        expect(ctrl.displayedColumnConfigs[0].isDisplayed()).toEqual(true);
                    });

                    it('are not loaded if getColumnConfigKey() does not return a value', function () {
                        configService.getColumnConfigEntries = jasmine.createSpy();

                        // Create a controller without the column config key.
                        ctrl = $controller('AbstractListTestCtrl', {
                            configService: configService,
                            initialPageState: initialPageState,
                            searchSpy: searchSpy,
                            loadFiltersSpy: loadFiltersSpy,
                            COL_CONFIG_KEY: null,
                            disableLoad: false
                        });

                        expect(configService.getColumnConfigEntries).not.toHaveBeenCalled();
                    });
                });

                describe('sorting', function () {

                    describe('sort()', function () {
                        it('throws with no columnConfig', function () {
                            expect(function () {
                                ctrl.sort();
                            }).toThrow();
                        });

                        it('calls through to PageState.setSort with correct parameters if sortable', function () {
                            searchSpy.calls.reset();
                            spyOn(initialPageState, 'setSort').and.callThrough();
                            ctrl.sort(columnConfigs[0], true);
                            expect(initialPageState.setSort).toHaveBeenCalledWith(columnConfigs[0].getDataIndex(), true);
                            expect(searchSpy).toHaveBeenCalled();
                            expect(searchSpy.calls.mostRecent().args.length).toEqual(5);
                            expect(searchSpy.calls.mostRecent().args[4]).toBeDefined();
                            expect(searchSpy.calls.mostRecent().args[4].getSortProperty()).toBe('some');
                            expect(searchSpy.calls.mostRecent().args[4].isSortAscending()).toBe(true);
                        });

                        it('does not set sort or fetch items if not sortable', function () {
                            searchSpy.calls.reset();
                            spyOn(initialPageState, 'setSort').and.callThrough();
                            ctrl.sort(columnConfigs[1], true);
                            expect(initialPageState.setSort).not.toHaveBeenCalled();
                            expect(searchSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('sortBySortOrder()', function () {
                        it('calls setSortOrder on PageState', function () {
                            var sortObj = { name: 'blah' };
                            searchSpy.calls.reset();
                            spyOn(initialPageState, 'setSortOrder').and.callThrough();
                            ctrl.sortBySortOrder(sortObj);
                            expect(initialPageState.setSortOrder).toHaveBeenCalledWith(sortObj);
                            expect(searchSpy).toHaveBeenCalled();
                        });

                        it('does not fetch items if doFetch is false', function () {
                            searchSpy.calls.reset();
                            ctrl.sortBySortOrder({}, false);
                            expect(searchSpy).not.toHaveBeenCalled();
                        });
                    });

                    describe('clearSort()', function () {
                        it('calls through to PageState.clearSort', function () {
                            spyOn(initialPageState, 'clearSort').and.callThrough();
                            ctrl.clearSort();
                            expect(initialPageState.clearSort).toHaveBeenCalled();
                            expect(searchSpy).toHaveBeenCalled();
                        });
                    });

                    describe('isSortColumn()', function () {
                        it('throws with no columnConfig', function () {
                            expect(function () {
                                ctrl.isSortColumn();
                            }).toThrow();
                        });

                        it('returns false if no sort', function () {
                            var column = columnConfigs[0];
                            expect(ctrl.isSortColumn(column)).toBe(false);
                        });

                        it('returns false if not matching sort column', function () {
                            ctrl.sort(columnConfigs[0]);
                            expect(ctrl.isSortColumn(columnConfigs[1])).toBe(false);
                        });

                        it('returns true if column matches sort column', function () {
                            var column = columnConfigs[0];
                            ctrl.sort(column);
                            expect(ctrl.isSortColumn(column)).toBe(true);
                        });
                    });

                    describe('isSortAscending()', function () {
                        it('throws with no columnConfig', function () {
                            expect(function () {
                                ctrl.isSortColumn();
                            }).toThrow();
                        });

                        it('returns false if no sort', function () {
                            var column = columnConfigs[0];
                            expect(ctrl.isSortAscending(column)).toBe(false);
                        });

                        it('returns false if not matching sort column', function () {
                            ctrl.sort(columnConfigs[0]);
                            expect(ctrl.isSortAscending(columnConfigs[1])).toBe(false);
                        });

                        it('return false if column matches but not ascending', function () {
                            var column = columnConfigs[0];
                            ctrl.sort(column, false);
                            expect(ctrl.isSortAscending(column)).toBe(false);
                        });

                        it('returns true if column matches sort column and is ascending', function () {
                            var column = columnConfigs[0];
                            ctrl.sort(column, true);
                            expect(ctrl.isSortAscending(column)).toBe(true);
                        });
                    });
                });

                describe('inner paging', function () {
                    it('sets items in increments if inner page size is set', function () {
                        var objects = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
                            count = 10,
                            innerPage = 2,
                            newSearchSpy = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: count,
                                objects: objects
                            }
                        }, {});

                        ctrl = $controller('AbstractListTestCtrl', {
                            configService: configService,
                            initialPageState: initialPageState,
                            searchSpy: newSearchSpy,
                            loadFiltersSpy: loadFiltersSpy,
                            COL_CONFIG_KEY: COL_CONFIG_KEY,
                            disableLoad: false
                        });
                        spyOn(ctrl, 'getInnerPageSize').and.returnValue(innerPage);
                        spyOn(ctrl, 'itemsLoaded');

                        $rootScope.$apply();
                        expect(ctrl.items).toBeDefined();
                        // Only two are in the items array before flushing
                        expect(ctrl.items.length).toEqual(innerPage);
                        timeout.flush();
                        // Now the rest are in, hooray.
                        expect(ctrl.items.length).toEqual(objects.length);
                    });
                });

                describe('isClearItemsBeforeFetch()', function () {
                    it('clears items when fetching if returns true (default)', function () {
                        expect(ctrl.items.length).toEqual(1);
                        ctrl.fetchItems();
                        expect(ctrl.items).not.toBeDefined();
                    });

                    it('does not clear items when fetching if returns false', function () {
                        spyOn(ctrl, 'isClearItemsBeforeFetch').and.returnValue(false);
                        expect(ctrl.items.length).toEqual(1);
                        ctrl.fetchItems();
                        expect(ctrl.items).toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvQWJzdHJhY3RMaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw4QkFBOEIsc0JBQXNCLDJCQUEyQixVQUFVLFNBQVM7SUFBOUk7O0lBR0ksSUFBSSxjQUFjO0lBQ2xCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHVCQUF1QjtRQUNwQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLGlCQUFpQjtvQkFDakIsY0FBYztvQkFDZCxlQUFlO29CQUNmLGlCQUFpQjtvQkFDYixNQUFNOztvQkFFVjtvQkFBZTtvQkFBWTtvQkFBYTtvQkFBYTtvQkFBVztvQkFDaEU7b0JBQVU7b0JBQVM7b0JBQVc7b0JBQWdCO29CQUM5QztvQkFBa0I7O2dCQUV0QixTQUFTLGlCQUFpQixhQUFhOztvQkFFbkMsWUFBWSxZQUFZLGlCQUFpQixPQUFPO3dCQUM1QyxRQUFRO3dCQUNSLE1BQU07NEJBQ0YsT0FBTzs0QkFDUCxTQUFTLENBQUU7NEJBQ1gsVUFBVTs7dUJBRWY7OztvQkFHSCxXQUFXLEdBQUc7b0JBQ2QsaUJBQWlCLFFBQVEsWUFBWSxJQUFJLFlBQVksU0FBUzs7O29CQUc5RCxPQUFPLFlBQVksd0JBQXdCO3dCQUN2QyxlQUFlO3dCQUNmLGtCQUFrQjt3QkFDbEIsV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTs7OztvQkFJakIsV0FBVzs7OztnQkFJZixXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPOzs7Ozs7Z0JBT2xCLFdBQVcsT0FBTyxVQUFTLGFBQWEsZUFBZSxlQUM1QixjQUFjLE1BQU0sVUFBVSxjQUFjOzs7b0JBR25FLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsS0FBSztvQkFDTCxVQUFVOzs7b0JBR1YsZ0JBQWdCLENBQUUsSUFBSSxhQUFhO3dCQUMvQixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsSUFBSSxhQUFhO3dCQUNqQixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsUUFBUTs7b0JBRVosZ0JBQWdCO3dCQUNaLHdCQUF3QixZQUFZLGlCQUFpQixPQUFPOzRCQUN4RCxRQUFROzRCQUNSLE1BQU07Z0NBQ0YsYUFBYTs7MkJBRWxCOzs7O29CQUlQLG1CQUFtQixJQUFJOzs7b0JBR3ZCLGlCQUFpQjs7O2dCQUdyQixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyw2QkFBNkIsWUFBVzs7d0JBRXZDLE9BQU8sV0FBVyxxQkFBcUIsV0FBVyxJQUFJLEdBQUcsSUFBSTt3QkFDN0QsT0FBTyxLQUFLLE9BQU8sSUFBSTt3QkFDdkIsT0FBTyxLQUFLLE9BQU87d0JBQ25CLE9BQU8sS0FBSyxNQUFNLFFBQVEsUUFBUTt3QkFDbEMsT0FBTyxLQUFLLE1BQU0sSUFBSSxRQUFRO3dCQUM5QixPQUFPLEtBQUssVUFBVSxXQUFXLFlBQVksUUFBUTt3QkFDckQsT0FBTyxLQUFLLFVBQVUsUUFBUTs7O29CQUdsQyxHQUFHLDJDQUEyQyxZQUFXOzt3QkFFckQsbUJBQW1CLElBQUk7Ozt3QkFHdkIsaUJBQWlCOzt3QkFFakIsT0FBTyxXQUFXLElBQUk7d0JBQ3RCLE9BQU8sS0FBSyxVQUFVLFdBQVcsWUFBWSxRQUFRLENBQUM7OztvQkFHMUQsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsT0FBTyxLQUFLLFdBQVcsUUFBUTs7OztnQkFJdkMsU0FBUyxVQUFVLFlBQVc7b0JBQzFCLEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLE9BQU8sS0FBSyxjQUFjLFFBQVE7d0JBQ2xDLEtBQUs7d0JBQ0wsUUFBUTt3QkFDUixPQUFPLEtBQUssY0FBYyxRQUFROzs7b0JBR3RDLFNBQVMsb0JBQW9CLFlBQVc7d0JBQ3BDLElBQUksb0JBQW9CLFFBQVEsVUFBVTs0QkFDdEM7O3dCQUVKLFdBQVcsWUFBVzs0QkFDbEIsV0FBVztnQ0FDUCxTQUFTO2dDQUNULGdCQUFnQjs7Ozt3QkFJeEIsR0FBRyw2QkFBNkIsWUFBVzs0QkFDdkMsVUFBVSxNQUFNOzRCQUNoQixTQUFTLFVBQVU7NEJBQ25CLEtBQUssT0FBTzs0QkFDWixRQUFROzRCQUNSLE9BQU8sV0FBVyxJQUFJOzs7d0JBRzFCLEdBQUcscUJBQXFCLFlBQVc7NEJBQy9CLFVBQVUsTUFBTTs0QkFDaEIsS0FBSyxPQUFPOzRCQUNaLFFBQVE7NEJBQ1IsT0FBTyxXQUFXOzs7d0JBR3RCLEdBQUcsc0RBQXNELFlBQVc7NEJBQ2hFLEtBQUssT0FBTzs0QkFDWixRQUFROzRCQUNSLE9BQU8sbUJBQW1COzs7OztnQkFLdEMsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBRyw4REFBOEQsWUFBVzt3QkFDeEUsSUFBSSxhQUFhLEtBQUs7NEJBQ2xCLGFBQWEsS0FBSyxVQUFVO3dCQUNoQyxXQUFXLGFBQWE7d0JBQ3hCLE9BQU8sV0FBVyxZQUFZLElBQUksUUFBUSxXQUFXO3dCQUNyRCxLQUFLO3dCQUNMLFFBQVE7d0JBQ1IsT0FBTyxXQUFXLFlBQVksUUFBUSxXQUFXOzs7b0JBR3JELEdBQUcsc0RBQXNELFlBQU07d0JBQzNELElBQUksYUFBYSxLQUFLLFVBQVU7d0JBQ2hDLE1BQU0sWUFBWSx5QkFBeUIsSUFBSSxZQUFZO3dCQUMzRCxLQUFLLGlCQUFpQixhQUFhLFNBQVM7d0JBQzVDLEtBQUs7d0JBQ0wsUUFBUTt3QkFDUixXQUFXO3dCQUNYLE9BQU8sS0FBSyxpQkFBaUIsY0FBYyxRQUFRLFdBQVc7OztvQkFHbEUsR0FBRyxnRUFBZ0UsWUFBVzs7d0JBRTFFLG1CQUFtQixJQUFJOzs7d0JBR3ZCLGlCQUFpQjs7d0JBRWpCLElBQUksYUFBYSxLQUFLOzs7d0JBR3RCLFdBQVcsYUFBYTs7d0JBRXhCLEtBQUs7d0JBQ0wsUUFBUTs7d0JBRVIsT0FBTyxXQUFXLElBQUk7d0JBQ3RCLE9BQU8sS0FBSyxVQUFVLFdBQVcsWUFBWSxRQUFRLENBQUM7Ozs7Z0JBSTlELFNBQVMsaUJBQWlCLFlBQU07b0JBQzVCLEdBQUcsZ0JBQWdCLFlBQVc7d0JBQzFCLE9BQU8sS0FBSyx1QkFBdUIsUUFBUTs7O29CQUcvQyxHQUFHLFdBQVcsWUFBVzt3QkFDckIsS0FBSzt3QkFDTCxPQUFPLEtBQUssdUJBQXVCLFFBQVE7d0JBQzNDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLHVCQUF1QixRQUFROzt3QkFFM0MsTUFBTSxNQUFNO3dCQUNaLEtBQUssbUJBQW1CO3dCQUN4QixLQUFLO3dCQUNMLE9BQU8sS0FBSyx3QkFBd0I7Ozs7Z0JBSTVDLFNBQVMsV0FBVyxZQUFXO29CQUMzQixHQUFHLGdCQUFnQixZQUFXO3dCQUMxQixPQUFPLEtBQUssa0JBQWtCLFFBQVE7OztvQkFHMUMsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsS0FBSzt3QkFDTCxPQUFPLEtBQUssa0JBQWtCLFFBQVE7d0JBQ3RDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLGtCQUFrQixRQUFROzs7b0JBRzFDLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLEtBQUssbUJBQW1CO3dCQUN4QixLQUFLO3dCQUNMLFFBQVE7d0JBQ1IsT0FBTyxLQUFLLGtCQUFrQixRQUFROzs7b0JBRzFDLEdBQUcsdUVBQXVFLFlBQVc7d0JBQ2pGLE1BQU0sTUFBTSx5QkFBeUIsSUFBSSxZQUFZO3dCQUNyRCxLQUFLLG1CQUFtQjt3QkFDeEIsS0FBSzt3QkFDTCxRQUFRO3dCQUNSLE9BQU8sS0FBSyxrQkFBa0IsUUFBUTs7O29CQUcxQyxHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxNQUFNLE1BQU07d0JBQ1osS0FBSyx3QkFBd0I7d0JBQzdCLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLG9CQUFvQjs7O29CQUdwQyxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxPQUFPLGdCQUFnQjs7O29CQUczQixHQUFHLHlEQUF5RCxZQUFXO3dCQUNuRSxJQUFJLFVBQVUsQ0FBQyxFQUFFLFVBQVU7d0JBQzNCLE1BQU0sS0FBSyxlQUFlLFlBQVk7d0JBQ3RDLFNBQVMsUUFBUTt3QkFDakIsV0FBVzt3QkFDWCxPQUFPLEtBQUssZUFBZSxXQUFXLG1CQUFtQixxQkFBcUI7OztvQkFHbEYsR0FBRyxtREFBbUQsWUFBTTt3QkFDeEQsZUFBZSxNQUFNO3dCQUNyQixNQUFNLEtBQUssZUFBZSxZQUFZLHlCQUF5QixJQUFJLFlBQVk7d0JBQy9FLGlCQUFpQjt3QkFDakIsT0FBTyxnQkFBZ0IsSUFBSTs7O29CQUcvQixHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxJQUFJLFVBQVUsRUFBQyxTQUFTO2dDQUNwQixPQUFPOytCQUNSLFNBQVM7Z0NBQ1IsT0FBTzs7O3dCQUdYLEtBQUssaUJBQWlCLGVBQWU7d0JBQ3JDLEtBQUs7d0JBQ0wsUUFBUTt3QkFDUixPQUFPLFdBQVc7d0JBQ2xCLE9BQU8sVUFBVSxNQUFNLGFBQWEsS0FBSyxRQUFRLFFBQVE7d0JBQ3pELE9BQU8sVUFBVSxNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7OztvQkFHekQsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsT0FBTyxLQUFLLHFCQUFxQixRQUFRO3dCQUN6QyxJQUFJLGVBQWU7NEJBQ2YsZUFBZTtnQ0FDWCxPQUFPLENBQUMsU0FBUyxTQUFTOzs7d0JBR2xDLEtBQUssaUJBQWlCLGVBQWU7d0JBQ3JDLE9BQU8sS0FBSyxxQkFBcUIsUUFBUTt3QkFDekMsS0FBSyxVQUFVLFdBQVcsTUFBTSxLQUFLO3dCQUNyQyxPQUFPLEtBQUsscUJBQXFCLFFBQVE7Ozs7Z0JBSWpELFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLFdBQVcsWUFBVzs7d0JBRWxCLGNBQWM7OztvQkFHbEIsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxLQUFLLFdBQVc7d0JBQ3ZCLE9BQU8sS0FBSyxxQkFBcUIsV0FBVzs7O29CQUdoRCxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLGFBQWEsS0FBSyxVQUFVO3dCQUNoQyxXQUFXLFNBQVM7d0JBQ3BCLFdBQVcsY0FBYzs7d0JBRXpCLEtBQUs7O3dCQUVMLFdBQVc7d0JBQ1gsT0FBTyxXQUFXLFlBQVksUUFBUTs7O29CQUcxQyxHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxJQUFJLGFBQWEsS0FBSyxVQUFVO3dCQUNoQyxXQUFXLGNBQWM7O3dCQUV6QixLQUFLO3dCQUNMLFFBQVE7O3dCQUVSLFdBQVc7d0JBQ1gsT0FBTyxXQUFXLGFBQWEsUUFBUTs7O29CQUczQyxHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxJQUFJLGFBQWEsS0FBSyxVQUFVO3dCQUNoQyxXQUFXLGNBQWM7O3dCQUV6QixLQUFLOzt3QkFFTCxXQUFXO3dCQUNYLE9BQU8sV0FBVyxhQUFhLFFBQVE7OztvQkFHM0MsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsSUFBSSxhQUFhLEtBQUssVUFBVTt3QkFDaEMsV0FBVyxTQUFTO3dCQUNwQixXQUFXLGNBQWM7O3dCQUV6QixLQUFLOzt3QkFFTCxXQUFXO3dCQUNYLE9BQU8sV0FBVyxhQUFhLFFBQVE7OztvQkFHM0MsR0FBRyx5RUFBeUUsWUFBVzt3QkFDbkYsSUFBSSxhQUFhLEtBQUssVUFBVTt3QkFDaEMsV0FBVyxjQUFjOzt3QkFFekIsS0FBSzs7d0JBRUwsV0FBVzt3QkFDWCxPQUFPLFdBQVcsYUFBYSxRQUFROzs7b0JBRzNDLEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLElBQUksYUFBYSxLQUFLLFVBQVU7d0JBQ2hDLFdBQVcsY0FBYzs7d0JBRXpCLEtBQUs7O3dCQUVMLFdBQVc7d0JBQ1gsT0FBTyxXQUFXLGFBQWEsUUFBUTs7O29CQUczQyxHQUFHLDZEQUE2RCxZQUFXO3dCQUN2RSxJQUFJLGFBQWEsS0FBSyxVQUFVO3dCQUNoQyxXQUFXLFNBQVM7d0JBQ3BCLE9BQU8sS0FBSyx1QkFBdUIsUUFBUTs7O29CQUcvQyxHQUFHLDBEQUEwRCxZQUFXO3dCQUNwRSxPQUFPLEtBQUssdUJBQXVCLFFBQVE7Ozs7Z0JBSW5ELFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLE9BQU8sY0FBYyx3QkFBd0I7d0JBQzdDLE9BQU8sS0FBSyxlQUFlLFFBQVE7OztvQkFHdkMsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsT0FBTyxLQUFLLHdCQUF3Qjt3QkFDcEMsT0FBTyxLQUFLLHVCQUF1QixRQUFRLFFBQVE7d0JBQ25ELE9BQU8sS0FBSyx1QkFBdUIsR0FBRyxlQUFlLFFBQVE7OztvQkFHakUsR0FBRyxrRUFBa0UsWUFBVzt3QkFDNUUsY0FBYyx5QkFBeUIsUUFBUTs7O3dCQUcvQyxPQUFPLFlBQVksd0JBQXdCOzRCQUN2QyxlQUFlOzRCQUNmLGtCQUFrQjs0QkFDbEIsV0FBVzs0QkFDWCxnQkFBZ0I7NEJBQ2hCLGdCQUFnQjs0QkFDaEIsYUFBYTs7O3dCQUdqQixPQUFPLGNBQWMsd0JBQXdCLElBQUk7Ozs7Z0JBSXpELFNBQVMsV0FBVyxZQUFXOztvQkFFM0IsU0FBUyxVQUFVLFlBQVc7d0JBQzFCLEdBQUksK0JBQStCLFlBQVc7NEJBQzFDLE9BQU8sWUFBVztnQ0FBQyxLQUFLOytCQUFVOzs7d0JBR3RDLEdBQUksMEVBQTBFLFlBQVc7NEJBQ3JGLFVBQVUsTUFBTTs0QkFDaEIsTUFBTSxrQkFBa0IsV0FBVyxJQUFJOzRCQUN2QyxLQUFLLEtBQUssY0FBYyxJQUFJOzRCQUM1QixPQUFPLGlCQUFpQixTQUFTLHFCQUFxQixjQUFjLEdBQUcsZ0JBQWdCOzRCQUN2RixPQUFPLFdBQVc7NEJBQ2xCLE9BQU8sVUFBVSxNQUFNLGFBQWEsS0FBSyxRQUFRLFFBQVE7NEJBQ3pELE9BQU8sVUFBVSxNQUFNLGFBQWEsS0FBSyxJQUFJOzRCQUM3QyxPQUFPLFVBQVUsTUFBTSxhQUFhLEtBQUssR0FBRyxtQkFBbUIsS0FBSzs0QkFDcEUsT0FBTyxVQUFVLE1BQU0sYUFBYSxLQUFLLEdBQUcsbUJBQW1CLEtBQUs7Ozt3QkFHeEUsR0FBSSxvREFBb0QsWUFBVzs0QkFDL0QsVUFBVSxNQUFNOzRCQUNoQixNQUFNLGtCQUFrQixXQUFXLElBQUk7NEJBQ3ZDLEtBQUssS0FBSyxjQUFjLElBQUk7NEJBQzVCLE9BQU8saUJBQWlCLFNBQVMsSUFBSTs0QkFDckMsT0FBTyxXQUFXLElBQUk7Ozs7b0JBSTlCLFNBQVMscUJBQXFCLFlBQVc7d0JBQ3JDLEdBQUksbUNBQW1DLFlBQVc7NEJBQzlDLElBQUksVUFBVSxFQUFDLE1BQU07NEJBQ3JCLFVBQVUsTUFBTTs0QkFDaEIsTUFBTSxrQkFBa0IsZ0JBQWdCLElBQUk7NEJBQzVDLEtBQUssZ0JBQWdCOzRCQUNyQixPQUFPLGlCQUFpQixjQUFjLHFCQUFxQjs0QkFDM0QsT0FBTyxXQUFXOzs7d0JBR3RCLEdBQUksNENBQTRDLFlBQVc7NEJBQ3ZELFVBQVUsTUFBTTs0QkFDaEIsS0FBSyxnQkFBZ0IsSUFBSTs0QkFDekIsT0FBTyxXQUFXLElBQUk7Ozs7b0JBSTlCLFNBQVMsZUFBZSxZQUFXO3dCQUMvQixHQUFHLHdDQUF3QyxZQUFXOzRCQUNsRCxNQUFNLGtCQUFrQixhQUFhLElBQUk7NEJBQ3pDLEtBQUs7NEJBQ0wsT0FBTyxpQkFBaUIsV0FBVzs0QkFDbkMsT0FBTyxXQUFXOzs7O29CQUkxQixTQUFTLGtCQUFrQixZQUFXO3dCQUNsQyxHQUFJLCtCQUErQixZQUFXOzRCQUMxQyxPQUFPLFlBQVc7Z0NBQUMsS0FBSzsrQkFBa0I7Ozt3QkFHOUMsR0FBSSw0QkFBNEIsWUFBVzs0QkFDdkMsSUFBSSxTQUFTLGNBQWM7NEJBQzNCLE9BQU8sS0FBSyxhQUFhLFNBQVMsS0FBSzs7O3dCQUczQyxHQUFJLDZDQUE2QyxZQUFXOzRCQUN4RCxLQUFLLEtBQUssY0FBYzs0QkFDeEIsT0FBTyxLQUFLLGFBQWEsY0FBYyxLQUFLLEtBQUs7Ozt3QkFHckQsR0FBSSw4Q0FBOEMsWUFBVzs0QkFDekQsSUFBSSxTQUFTLGNBQWM7NEJBQzNCLEtBQUssS0FBSzs0QkFDVixPQUFPLEtBQUssYUFBYSxTQUFTLEtBQUs7Ozs7b0JBSy9DLFNBQVMscUJBQXFCLFlBQVc7d0JBQ3JDLEdBQUksK0JBQStCLFlBQVc7NEJBQzFDLE9BQU8sWUFBVztnQ0FBQyxLQUFLOytCQUFrQjs7O3dCQUc5QyxHQUFJLDRCQUE0QixZQUFXOzRCQUN2QyxJQUFJLFNBQVMsY0FBYzs0QkFDM0IsT0FBTyxLQUFLLGdCQUFnQixTQUFTLEtBQUs7Ozt3QkFHOUMsR0FBSSw2Q0FBNkMsWUFBVzs0QkFDeEQsS0FBSyxLQUFLLGNBQWM7NEJBQ3hCLE9BQU8sS0FBSyxnQkFBZ0IsY0FBYyxLQUFLLEtBQUs7Ozt3QkFJeEQsR0FBSSxvREFBb0QsWUFBVzs0QkFDL0QsSUFBSSxTQUFTLGNBQWM7NEJBQzNCLEtBQUssS0FBSyxRQUFROzRCQUNsQixPQUFPLEtBQUssZ0JBQWdCLFNBQVMsS0FBSzs7O3dCQUc5QyxHQUFJLCtEQUErRCxZQUFXOzRCQUMxRSxJQUFJLFNBQVMsY0FBYzs0QkFDM0IsS0FBSyxLQUFLLFFBQVE7NEJBQ2xCLE9BQU8sS0FBSyxnQkFBZ0IsU0FBUyxLQUFLOzs7OztnQkFNdEQsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxVQUFVLENBQUUsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7NEJBQ3pELFFBQVE7NEJBQ1IsWUFBWTs0QkFDWixlQUFlLFlBQVksaUJBQWlCLE9BQU87NEJBQy9DLFFBQVE7NEJBQ1IsTUFBTTtnQ0FDRixPQUFPO2dDQUNQLFNBQVM7OzJCQUVkOzt3QkFFUCxPQUFPLFlBQVksd0JBQXdCOzRCQUN2QyxlQUFlOzRCQUNmLGtCQUFrQjs0QkFDbEIsV0FBVzs0QkFDWCxnQkFBZ0I7NEJBQ2hCLGdCQUFnQjs0QkFDaEIsYUFBYTs7d0JBRWpCLE1BQU0sTUFBTSxvQkFBb0IsSUFBSSxZQUFZO3dCQUNoRCxNQUFNLE1BQU07O3dCQUVaLFdBQVc7d0JBQ1gsT0FBTyxLQUFLLE9BQU87O3dCQUVuQixPQUFPLEtBQUssTUFBTSxRQUFRLFFBQVE7d0JBQ2xDLFFBQVE7O3dCQUVSLE9BQU8sS0FBSyxNQUFNLFFBQVEsUUFBUSxRQUFROzs7O2dCQUlsRCxTQUFTLDZCQUE2QixZQUFNO29CQUN4QyxHQUFHLHdEQUF3RCxZQUFNO3dCQUM3RCxPQUFPLEtBQUssTUFBTSxRQUFRLFFBQVE7d0JBQ2xDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLE9BQU8sSUFBSTs7O29CQUczQixHQUFHLHVEQUF1RCxZQUFNO3dCQUM1RCxNQUFNLE1BQU0sMkJBQTJCLElBQUksWUFBWTt3QkFDdkQsT0FBTyxLQUFLLE1BQU0sUUFBUSxRQUFRO3dCQUNsQyxLQUFLO3dCQUNMLE9BQU8sS0FBSyxPQUFPOzs7Ozs7R0FzQjVCIiwiZmlsZSI6ImNvbW1vbi9zZWFyY2gvQWJzdHJhY3RMaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBzZWFyY2hNb2R1bGUgZnJvbSAnY29tbW9uL3NlYXJjaC9TZWFyY2hNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4vQWJzdHJhY3RMaXN0VGVzdEN0cmwnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWJzdHJhY3RMaXN0Q3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBYnN0cmFjdExpc3RDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIENPTF9DT05GSUdfS0VZID0gJ3Rlc3RDb2x1bW5zJyxcclxuICAgICAgICByZXN1bHRDb3VudCA9IDEsXHJcbiAgICAgICAgcmV0dXJuT2JqZWN0ID0gJ0kgYW0gYW4gb2JqZWN0IHdpdGggbm8gb2JqZWN0aXZlJyxcclxuICAgICAgICByZXN1bHRNZXRhRGF0YSA9IHtcclxuICAgICAgICAgICAgc29tZTogJ2p1bmsnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2x1bW5Db25maWdzLCAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsIFBhZ2VTdGF0ZSwgY3RybCxcclxuICAgICAgICBkZWZlcnJlZCwgdGltZW91dCwgc2VhcmNoU3B5LCBsb2FkRmlsdGVyc1NweSwgY29uZmlnU2VydmljZSxcclxuICAgICAgICBpbml0aWFsUGFnZVN0YXRlLCAkcTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGRpc2FibGVMb2FkKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgc3B5IHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiB0aGUgY29udHJvbGxlciBzZWFyY2hlcy5cclxuICAgICAgICBzZWFyY2hTcHkgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogcmVzdWx0Q291bnQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbIHJldHVybk9iamVjdCBdLFxyXG4gICAgICAgICAgICAgICAgbWV0YURhdGE6IHJlc3VsdE1ldGFEYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIHNweSB0aGF0IGlzIHVzZWQgdG8gbG9hZCBmaWx0ZXJzXHJcbiAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIGxvYWRGaWx0ZXJzU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBYnN0cmFjdExpc3RUZXN0Q3RybCcsIHtcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZTogY29uZmlnU2VydmljZSxcclxuICAgICAgICAgICAgaW5pdGlhbFBhZ2VTdGF0ZTogaW5pdGlhbFBhZ2VTdGF0ZSxcclxuICAgICAgICAgICAgc2VhcmNoU3B5OiBzZWFyY2hTcHksXHJcbiAgICAgICAgICAgIGxvYWRGaWx0ZXJzU3B5OiBsb2FkRmlsdGVyc1NweSxcclxuICAgICAgICAgICAgQ09MX0NPTkZJR19LRVk6IENPTF9DT05GSUdfS0VZLFxyXG4gICAgICAgICAgICBkaXNhYmxlTG9hZDogZGlzYWJsZUxvYWRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUnVuIGEgZGlnZXN0IGN5Y2xlIHRvIHJlc29sdmUgdGhlIHByb21pc2UuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHNlYXJjaCBtb2R1bGUuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzZWFyY2hNb2R1bGUpKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXHJcbiAgICAgKi9cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9QYWdlU3RhdGVfLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRyb290U2NvcGVfLCBfJHFfLCAkdGltZW91dCwgQ29sdW1uQ29uZmlnKSB7XHJcblxyXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgUGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgdGltZW91dCA9ICR0aW1lb3V0O1xyXG5cclxuICAgICAgICAvLyBtb2NrIG91dCBjb25maWcgc2VydmljZVxyXG4gICAgICAgIGNvbHVtbkNvbmZpZ3MgPSBbIG5ldyBDb2x1bW5Db25maWcoe1xyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ICdzb21lJyxcclxuICAgICAgICAgICAgc29ydGFibGU6IHRydWVcclxuICAgICAgICB9KSwgbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2NvbmZpZ3MnLFxyXG4gICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgICAgIH0pXTtcclxuICAgICAgICBjb25maWdTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXRDb2x1bW5Db25maWdFbnRyaWVzOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXN0Q29sdW1uczogY29sdW1uQ29uZmlnc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBTZXR1cCB0aGUgaW5pdGlhbCBwYWdlIHN0YXRlLlxyXG4gICAgICAgIGluaXRpYWxQYWdlU3RhdGUgPSBuZXcgUGFnZVN0YXRlKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcihmYWxzZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2ZldGNoZXMgaXRlbXMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVGhlIHN0YXJ0IGFuZCBsaW1pdCBhcmUgaGFyZC1jb2RlZC5cclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgodW5kZWZpbmVkLCB7fSwgMCwgMTIsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXMpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXNbMF0pLnRvRXF1YWwocmV0dXJuT2JqZWN0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucGFnZVN0YXRlLnBhZ2luZ0RhdGEuZ2V0VG90YWwoKSkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwubWV0YURhdGEpLnRvRXF1YWwocmVzdWx0TWV0YURhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgZmV0Y2ggaXRlbXMgd2hlbiBsb2FkIGRpc2FibGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSBpbml0aWFsIHBhZ2Ugc3RhdGUuXHJcbiAgICAgICAgICAgIGluaXRpYWxQYWdlU3RhdGUgPSBuZXcgUGFnZVN0YXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIHRoZSBpbml0aWFsIGxvYWQgb2YgdGhlIGRhdGFcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhLmdldFRvdGFsKCkpLnRvRXF1YWwoLTEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgcGFnZSBzdGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5wYWdlU3RhdGUpLnRvRXF1YWwoaW5pdGlhbFBhZ2VTdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VhcmNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2ZvY3VzZXMgdGhlIHJlc3VsdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZm9jdXNSZXN1bHRzKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgY3RybC5zZWFyY2goKTtcclxuICAgICAgICAgICAgdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5mb2N1c1Jlc3VsdHMpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd3aXRoIGEga2V5IGV2ZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdFNweSA9IGphc21pbmUuY3JlYXRlU3B5KCdwcmV2ZW50RGVmYXVsdCcpLFxyXG4gICAgICAgICAgICAgICAga2V5RXZlbnQ7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAga2V5RXZlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogMTMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IHByZXZlbnREZWZhdWx0U3B5XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgb24gbm9uLWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hTcHkuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGtleUV2ZW50LmtleUNvZGUgPSA0MjtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VhcmNoKGtleUV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3NlYXJjaGVzIG9uIGVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hTcHkuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VhcmNoKGtleUV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncHJldmVudHMgdGhlIGRlZmF1bHQgYWN0aW9uIG9uIHRoZSBldmVudCBmb3IgZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VhcmNoKGtleUV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwcmV2ZW50RGVmYXVsdFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWFyY2hTY3JhdGNoUGFkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGl0cyB2YWx1ZXMgdHJhbnNmZXJyZWQgdG8gc2VhcmNoRGF0YSBvbiBzZWFyY2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNjcmF0Y2hQYWQgPSBjdHJsLnNlYXJjaFNjcmF0Y2hQYWQsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhID0gY3RybC5wYWdlU3RhdGUuc2VhcmNoRGF0YTtcclxuICAgICAgICAgICAgc2NyYXRjaFBhZC5zZWFyY2hUZXJtID0gJ1Rlc3QnO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NyYXRjaFBhZC5zZWFyY2hUZXJtKS5ub3QudG9FcXVhbChzZWFyY2hEYXRhLnNlYXJjaFRlcm0pO1xyXG4gICAgICAgICAgICBjdHJsLnNlYXJjaCgpO1xyXG4gICAgICAgICAgICB0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY3JhdGNoUGFkLnNlYXJjaFRlcm0pLnRvRXF1YWwoc2VhcmNoRGF0YS5zZWFyY2hUZXJtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSByZXNldCBiYWNrIHRvIHBhZ2Ugc3RhdGUgb24gaW5pdGlhbGl6ZSgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGN0cmwucGFnZVN0YXRlLnNlYXJjaERhdGE7XHJcbiAgICAgICAgICAgIHNweU9uKHNlYXJjaERhdGEsICdhcmVGaWx0ZXJzSW5pdGlhbGl6ZWQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VhcmNoU2NyYXRjaFBhZC5maWx0ZXJWYWx1ZXMuc3R1cGlkID0gJ2ZhY2UnO1xyXG4gICAgICAgICAgICBjdHJsLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zZWFyY2hTY3JhdGNoUGFkLmZpbHRlclZhbHVlcykudG9FcXVhbChzZWFyY2hEYXRhLmZpbHRlclZhbHVlcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBmZXRjaCBpdGVtcyB3aXRoIGVtcHR5IHNlYXJjaFRlcm0gYW5kIGxvYWQgZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGluaXRpYWwgcGFnZSBzdGF0ZS5cclxuICAgICAgICAgICAgaW5pdGlhbFBhZ2VTdGF0ZSA9IG5ldyBQYWdlU3RhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGluaXRpYWwgbG9hZCBvZiB0aGUgZGF0YVxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjcmF0Y2hQYWQgPSBjdHJsLnNlYXJjaFNjcmF0Y2hQYWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHNlYXJjaFRlcm0gdG8gYmxhbmtcclxuICAgICAgICAgICAgc2NyYXRjaFBhZC5zZWFyY2hUZXJtID0gJyc7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNlYXJjaCgpO1xyXG4gICAgICAgICAgICB0aW1lb3V0LmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5nZXRUb3RhbCgpKS50b0VxdWFsKC0xKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb2x1bW4gZWRpdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdzdGFydCBoaWRkZW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY29sdW1uRWRpdG9yRGlzcGxheWVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RvZ2dsZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVDb2x1bW5FZGl0b3IoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY29sdW1uRWRpdG9yRGlzcGxheWVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZUNvbHVtbkVkaXRvcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5jb2x1bW5FZGl0b3JEaXNwbGF5ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3RvZ2dsZUZpbHRlcnNEaXNwbGF5ZWQnKTtcclxuICAgICAgICAgICAgY3RybC5maWx0ZXJzRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVDb2x1bW5FZGl0b3IoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwudG9nZ2xlRmlsdGVyc0Rpc3BsYXllZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2ZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc3RhcnQgaGlkZGVuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbHRlcnNEaXNwbGF5ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYXJlIHNob3duL2hpZGRlbiB3aGVuIHRvZ2dsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVGaWx0ZXJzRGlzcGxheWVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbHRlcnNEaXNwbGF5ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlRmlsdGVyc0Rpc3BsYXllZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5maWx0ZXJzRGlzcGxheWVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FyZSBjb2xsYXBzZWQgYWZ0ZXIgc2VhcmNoaW5nIGlmIGF1dG8gdG9nZ2xlIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5maWx0ZXJzRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY3RybC5zZWFyY2goKTtcclxuICAgICAgICAgICAgdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5maWx0ZXJzRGlzcGxheWVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FyZSBub3QgY29sbGFwc2VkIGFmdGVyIHNlYXJjaGluZyBpZiBpc0hpZGVGaWx0ZXJzT25TZWFyY2ggaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzSGlkZUZpbHRlcnNPblNlYXJjaCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwuZmlsdGVyc0Rpc3BsYXllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGN0cmwuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZmlsdGVyc0Rpc3BsYXllZCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgY29sdW1uIGVkaXRvciBwYW5lbCBpZiBvcGVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAndG9nZ2xlQ29sdW1uRWRpdG9yJyk7XHJcbiAgICAgICAgICAgIGN0cmwuY29sdW1uRWRpdG9yRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVGaWx0ZXJzRGlzcGxheWVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRvZ2dsZUNvbHVtbkVkaXRvcikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGxvYWQgZmlsdGVycyBvbiBjb250cm9sbGVyIGxvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGxvYWRGaWx0ZXJzU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBmaWx0ZXJzIG9uIHNlYXJjaERhdGEgd2hlbiByZXNvbHZlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVycyA9IFt7IHByb3BlcnR5OiAncHJpdmF0ZVRoaW5ncycgfV07XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwuZ2V0UGFnZVN0YXRlKCkuc2VhcmNoRGF0YSwgJ2luaXRpYWxpemVGaWx0ZXJzJyk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZmlsdGVycyk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBhZ2VTdGF0ZSgpLnNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZpbHRlcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBsb2FkIGZpbHRlcnMgYWdhaW4gaWYgYWxyZWFkeSBsb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRGaWx0ZXJzU3B5LmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwuZ2V0UGFnZVN0YXRlKCkuc2VhcmNoRGF0YSwgJ2FyZUZpbHRlcnNJbml0aWFsaXplZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsb2FkRmlsdGVyc1NweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNlYXJjaCB3aXRoIGZpbHRlciB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSB7ZmlsdGVyMToge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdoZWxsbydcclxuICAgICAgICAgICAgfSwgZmlsdGVyMjoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdnb29kYnllJ1xyXG4gICAgICAgICAgICB9fTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2VhcmNoU2NyYXRjaFBhZC5maWx0ZXJWYWx1ZXMgPSBmaWx0ZXJzO1xyXG4gICAgICAgICAgICBjdHJsLnNlYXJjaCgpO1xyXG4gICAgICAgICAgICB0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJncy5sZW5ndGgpLnRvRXF1YWwoNSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMV0pLnRvRXF1YWwoZmlsdGVycyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGNvcnJlY3QgdmFsdWUgZm9yIGhhc0FwcGxpZWRGaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0FwcGxpZWRGaWx0ZXJzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyVmFsdWVzID0ge1xyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZVRoaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBbJ3BsYW5lJywgJ3BhcnR5JywgJ2xvZnQnXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjdHJsLnNlYXJjaFNjcmF0Y2hQYWQuZmlsdGVyVmFsdWVzID0gZmlsdGVyVmFsdWVzO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNBcHBsaWVkRmlsdGVycygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUuc2VhcmNoRGF0YS5tZXJnZShjdHJsLnNlYXJjaFNjcmF0Y2hQYWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNBcHBsaWVkRmlsdGVycygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BhZ2luZyBzdGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIEluY3JlYXNlIHRoZSByZXN1bHQgY291bnQgc28gd2UgY2FuIHBhZ2UgZm9yd2FyZC5cclxuICAgICAgICAgICAgcmVzdWx0Q291bnQgPSAyMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzaG91bGQgYmUgaW5pdGlhbGl6ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucGFnZVN0YXRlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5wYWdlU3RhdGUgaW5zdGFuY2VvZiBQYWdlU3RhdGUpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB1cGRhdGVkIHdoZW4gc2VhcmNoIGlzIHJ1bicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFnaW5nRGF0YSA9IGN0cmwucGFnZVN0YXRlLnBhZ2luZ0RhdGE7XHJcbiAgICAgICAgICAgIHBhZ2luZ0RhdGEuc2V0VG90YWwoMTAwKTtcclxuICAgICAgICAgICAgcGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDU7XHJcblxyXG4gICAgICAgICAgICBjdHJsLmZldGNoSXRlbXMoKTtcclxuICAgICAgICAgICAgLyogcmVzb2x2ZSBwcm9taXNlICovXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmdEYXRhLmdldFRvdGFsKCkpLnRvRXF1YWwoMjApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJlc2V0IGN1cnJlbnQgcGFnZSB3aGVuIHNlYXJjaCBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2luZ0RhdGEgPSBjdHJsLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhO1xyXG4gICAgICAgICAgICBwYWdpbmdEYXRhLmN1cnJlbnRQYWdlID0gMjtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgLyogcmVzb2x2ZSBwcm9taXNlICovXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBjdXJyZW50IHBhZ2Ugd2hlbiBwcmV2aW91cyBwYWdlIGlzIGNhbGxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGFnaW5nRGF0YSA9IGN0cmwucGFnZVN0YXRlLnBhZ2luZ0RhdGE7XHJcbiAgICAgICAgICAgIHBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSAyO1xyXG5cclxuICAgICAgICAgICAgY3RybC5wcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAgICAgLyogcmVzb2x2ZSBwcm9taXNlICovXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBjdXJyZW50IHBhZ2Ugd2hlbiBuZXh0IHBhZ2UgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdpbmdEYXRhID0gY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YTtcclxuICAgICAgICAgICAgcGFnaW5nRGF0YS5zZXRUb3RhbCgyMCk7XHJcbiAgICAgICAgICAgIHBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSAxO1xyXG5cclxuICAgICAgICAgICAgY3RybC5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICAvKiByZXNvbHZlIHByb21pc2UgKi9cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhZ2luZ0RhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNoYW5nZSBjdXJyZW50IHBhZ2Ugd2hlbiBwcmV2aW91c1BhZ2UgY2FsbGVkIG9uIGZpcnN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2luZ0RhdGEgPSBjdHJsLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhO1xyXG4gICAgICAgICAgICBwYWdpbmdEYXRhLmN1cnJlbnRQYWdlID0gMTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgIC8qIHJlc29sdmUgcHJvbWlzZSAqL1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QocGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2hhbmdlIGN1cnJlbnQgcGFnZSB3aGVuIG5leHRQYWdlIGNhbGxlZCBvbiBsYXN0IHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2luZ0RhdGEgPSBjdHJsLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhO1xyXG4gICAgICAgICAgICBwYWdpbmdEYXRhLmN1cnJlbnRQYWdlID0gMjtcclxuXHJcbiAgICAgICAgICAgIGN0cmwubmV4dFBhZ2UoKTtcclxuICAgICAgICAgICAgLyogcmVzb2x2ZSBwcm9taXNlICovXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmdEYXRhLmN1cnJlbnRQYWdlKS50b0VxdWFsKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGhpZGUgdGhlIGN1cnJlbnQgcGFnZSBpbmZvIGlmIHRoZXJlIGFyZSBubyByZXN1bHRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdpbmdEYXRhID0gY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YTtcclxuICAgICAgICAgICAgcGFnaW5nRGF0YS5zZXRUb3RhbCgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0N1cnJlbnRQYWdlSW5mbygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHRoZSBjdXJyZW50IHBhZ2UgaW5mbyBpZiB0aGVyZSBhcmUgcmVzdWx0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93Q3VycmVudFBhZ2VJbmZvKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29sdW1uIGNvbmZpZ3MnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnYXJlIGxvYWRlZCBpZiBnZXRDb2x1bW5Db25maWdLZXkoKSByZXR1cm5zIGEgdmFsdWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29sdW1uQ29uZmlnRW50cmllcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5jb2x1bW5Db25maWdzKS50b0VxdWFsKGNvbHVtbkNvbmZpZ3MpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYXJlIGZpbHRlcmVkIGludG8gZGlzcGxheWVkQ29sdW1uQ29uZmlncycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kaXNwbGF5ZWRDb2x1bW5Db25maWdzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kaXNwbGF5ZWRDb2x1bW5Db25maWdzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZGlzcGxheWVkQ29sdW1uQ29uZmlnc1swXS5pc0Rpc3BsYXllZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYXJlIG5vdCBsb2FkZWQgaWYgZ2V0Q29sdW1uQ29uZmlnS2V5KCkgZG9lcyBub3QgcmV0dXJuIGEgdmFsdWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzID0gamFzbWluZS5jcmVhdGVTcHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNvbnRyb2xsZXIgd2l0aG91dCB0aGUgY29sdW1uIGNvbmZpZyBrZXkuXHJcbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWJzdHJhY3RMaXN0VGVzdEN0cmwnLCB7XHJcbiAgICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBjb25maWdTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFBhZ2VTdGF0ZTogaW5pdGlhbFBhZ2VTdGF0ZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaFNweTogc2VhcmNoU3B5LFxyXG4gICAgICAgICAgICAgICAgbG9hZEZpbHRlcnNTcHk6IGxvYWRGaWx0ZXJzU3B5LFxyXG4gICAgICAgICAgICAgICAgQ09MX0NPTkZJR19LRVk6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlTG9hZDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NvcnRpbmcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3NvcnQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCAoJ3Rocm93cyB3aXRoIG5vIGNvbHVtbkNvbmZpZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge2N0cmwuc29ydCgpO30pLnRvVGhyb3coKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ2NhbGxzIHRocm91Z2ggdG8gUGFnZVN0YXRlLnNldFNvcnQgd2l0aCBjb3JyZWN0IHBhcmFtZXRlcnMgaWYgc29ydGFibGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFNweS5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oaW5pdGlhbFBhZ2VTdGF0ZSwgJ3NldFNvcnQnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydChjb2x1bW5Db25maWdzWzBdLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChpbml0aWFsUGFnZVN0YXRlLnNldFNvcnQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNvbHVtbkNvbmZpZ3NbMF0uZ2V0RGF0YUluZGV4KCksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJncy5sZW5ndGgpLnRvRXF1YWwoNSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzRdKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1s0XS5nZXRTb3J0UHJvcGVydHkoKSkudG9CZSgnc29tZScpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaFNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1s0XS5pc1NvcnRBc2NlbmRpbmcoKSkudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ2RvZXMgbm90IHNldCBzb3J0IG9yIGZldGNoIGl0ZW1zIGlmIG5vdCBzb3J0YWJsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoU3B5LmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihpbml0aWFsUGFnZVN0YXRlLCAnc2V0U29ydCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zb3J0KGNvbHVtbkNvbmZpZ3NbMV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGluaXRpYWxQYWdlU3RhdGUuc2V0U29ydCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnc29ydEJ5U29ydE9yZGVyKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQgKCdjYWxscyBzZXRTb3J0T3JkZXIgb24gUGFnZVN0YXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc29ydE9iaiA9IHtuYW1lOiAnYmxhaCd9O1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoU3B5LmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihpbml0aWFsUGFnZVN0YXRlLCAnc2V0U29ydE9yZGVyJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNvcnRCeVNvcnRPcmRlcihzb3J0T2JqKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChpbml0aWFsUGFnZVN0YXRlLnNldFNvcnRPcmRlcikudG9IYXZlQmVlbkNhbGxlZFdpdGgoc29ydE9iaik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQgKCdkb2VzIG5vdCBmZXRjaCBpdGVtcyBpZiBkb0ZldGNoIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hTcHkuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydEJ5U29ydE9yZGVyKHt9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoU3B5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NsZWFyU29ydCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIFBhZ2VTdGF0ZS5jbGVhclNvcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGluaXRpYWxQYWdlU3RhdGUsICdjbGVhclNvcnQnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuY2xlYXJTb3J0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaW5pdGlhbFBhZ2VTdGF0ZS5jbGVhclNvcnQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc1NvcnRDb2x1bW4oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCAoJ3Rocm93cyB3aXRoIG5vIGNvbHVtbkNvbmZpZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge2N0cmwuaXNTb3J0Q29sdW1uKCk7fSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBubyBzb3J0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uQ29uZmlnc1swXTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU29ydENvbHVtbihjb2x1bW4pKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgZmFsc2UgaWYgbm90IG1hdGNoaW5nIHNvcnQgY29sdW1uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNvcnQoY29sdW1uQ29uZmlnc1swXSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1NvcnRDb2x1bW4oY29sdW1uQ29uZmlnc1sxXSkpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGlmIGNvbHVtbiBtYXRjaGVzIHNvcnQgY29sdW1uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uQ29uZmlnc1swXTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydChjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb3J0Q29sdW1uKGNvbHVtbikpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2lzU29ydEFzY2VuZGluZygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0ICgndGhyb3dzIHdpdGggbm8gY29sdW1uQ29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7Y3RybC5pc1NvcnRDb2x1bW4oKTt9KS50b1Rocm93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIG5vIHNvcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2x1bW4gPSBjb2x1bW5Db25maWdzWzBdO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb3J0QXNjZW5kaW5nKGNvbHVtbikpLnRvQmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBub3QgbWF0Y2hpbmcgc29ydCBjb2x1bW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydChjb2x1bW5Db25maWdzWzBdKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU29ydEFzY2VuZGluZyhjb2x1bW5Db25maWdzWzFdKSkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJuIGZhbHNlIGlmIGNvbHVtbiBtYXRjaGVzIGJ1dCBub3QgYXNjZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uQ29uZmlnc1swXTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydChjb2x1bW4sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU29ydEFzY2VuZGluZyhjb2x1bW4pKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgdHJ1ZSBpZiBjb2x1bW4gbWF0Y2hlcyBzb3J0IGNvbHVtbiBhbmQgaXMgYXNjZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uQ29uZmlnc1swXTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc29ydChjb2x1bW4sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTb3J0QXNjZW5kaW5nKGNvbHVtbikpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbm5lciBwYWdpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3NldHMgaXRlbXMgaW4gaW5jcmVtZW50cyBpZiBpbm5lciBwYWdlIHNpemUgaXMgc2V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IFsgJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnLCAnaCcsICdpJywgJ2onXSxcclxuICAgICAgICAgICAgICAgIGNvdW50ID0gMTAsXHJcbiAgICAgICAgICAgICAgICBpbm5lclBhZ2UgPSAyLFxyXG4gICAgICAgICAgICAgICAgbmV3U2VhcmNoU3B5ID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBvYmplY3RzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBYnN0cmFjdExpc3RUZXN0Q3RybCcsIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsUGFnZVN0YXRlOiBpbml0aWFsUGFnZVN0YXRlLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoU3B5OiBuZXdTZWFyY2hTcHksXHJcbiAgICAgICAgICAgICAgICBsb2FkRmlsdGVyc1NweTogbG9hZEZpbHRlcnNTcHksXHJcbiAgICAgICAgICAgICAgICBDT0xfQ09ORklHX0tFWTogQ09MX0NPTkZJR19LRVksXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlTG9hZDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRJbm5lclBhZ2VTaXplJykuYW5kLnJldHVyblZhbHVlKGlubmVyUGFnZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpdGVtc0xvYWRlZCcpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXMpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgdHdvIGFyZSBpbiB0aGUgaXRlbXMgYXJyYXkgYmVmb3JlIGZsdXNoaW5nXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zLmxlbmd0aCkudG9FcXVhbChpbm5lclBhZ2UpO1xyXG4gICAgICAgICAgICB0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICAgICAgICAgIC8vIE5vdyB0aGUgcmVzdCBhcmUgaW4sIGhvb3JheS5cclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXMubGVuZ3RoKS50b0VxdWFsKG9iamVjdHMubGVuZ3RoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc0NsZWFySXRlbXNCZWZvcmVGZXRjaCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdjbGVhcnMgaXRlbXMgd2hlbiBmZXRjaGluZyBpZiByZXR1cm5zIHRydWUgKGRlZmF1bHQpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pdGVtcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGN0cmwuZmV0Y2hJdGVtcygpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pdGVtcykubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjbGVhciBpdGVtcyB3aGVuIGZldGNoaW5nIGlmIHJldHVybnMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0NsZWFySXRlbXNCZWZvcmVGZXRjaCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgY3RybC5mZXRjaEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
