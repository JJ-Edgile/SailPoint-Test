System.register(['test/js/TestInitializer', 'common/dataview/card/CardModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var cardModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewCardCardModule) {
            cardModule = _commonDataviewCardCardModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CardListDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    $q = undefined,
                    ListResultDTO = undefined,
                    element = undefined,
                    itemsFunc = undefined,
                    trigger = undefined,
                    pagingData = undefined,
                    total = undefined,
                    items = undefined,
                    configService = undefined,
                    columnConfigs = undefined,
                    CardListConfig = undefined,
                    $timeout = undefined,
                    eltDef = '<sp-card-list sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder, searchTerm)"\n                           sp-config="config">\n               <sp-card>{{ item }}</sp-card>\n             </sp-card-list>';

                beforeEach(module(testModule, cardModule));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_$compile_, $rootScope, _$q_, _ListResultDTO_, DataRefreshTrigger, _configService_, ColumnConfig, testService, _CardListConfig_, _$timeout_) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    $q = _$q_;
                    $timeout = _$timeout_;
                    ListResultDTO = _ListResultDTO_;
                    CardListConfig = _CardListConfig_;

                    trigger = new DataRefreshTrigger();
                    pagingData = null;
                    configService = _configService_;

                    columnConfigs = [new ColumnConfig({
                        dataIndex: 'name',
                        sortable: true,
                        headerKey: 'Name'
                    }), new ColumnConfig({
                        dataIndex: 'someValue',
                        sortable: true,
                        headerKey: 'Sortby'
                    }), new ColumnConfig({
                        dataIndex: 'extra',
                        fieldOnly: true
                    }), new ColumnConfig({
                        dataIndex: 'risk',
                        renderer: 'risk'
                    })];

                    configService.getColumnConfigEntries = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            testColumnConfig: columnConfigs
                        }
                    }, {});

                    // Setup a fake items function with a default ListResult.  This can be tweaked by tests.
                    setResults(5);
                    itemsFunc = jasmine.createSpy('itemsFunc').and.callFake(function () {
                        return $q.when({
                            data: new ListResultDTO({
                                count: total,
                                objects: items
                            })
                        });
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function setResults(count) {
                    total = count;

                    items = [];
                    var numObjects = Math.min(count, 12);
                    for (var i = 0; i < numObjects; i++) {
                        items.push(i);
                    }
                }

                function compile(noItemsFunc, noConfig, config) {
                    var elementDef = arguments.length <= 3 || arguments[3] === undefined ? eltDef : arguments[3];

                    if (!noItemsFunc) {
                        $scope.itemsFunc = itemsFunc;
                    }

                    if (!noConfig) {
                        $scope.config = config || new CardListConfig({
                            refreshTrigger: trigger,
                            pagingData: pagingData
                        });
                    }

                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('explodes if no sp-items-func is given', function () {
                    expect(function () {
                        return compile(null, true);
                    }).toThrow();
                });

                it('fetches items when created', function () {
                    compile();
                    expect(itemsFunc).toHaveBeenCalledWith(0, 12, {}, undefined, undefined);
                });

                it('refetches items when the trigger is triggered', function () {
                    compile();
                    expect(itemsFunc.calls.count()).toEqual(1);

                    trigger.refresh();
                    expect(itemsFunc.calls.count()).toEqual(2);
                });

                it('paging data is used if passed in', inject(function (PagingData) {
                    var itemsPerPage = 5;
                    var currentPage = 3;
                    var startIdx = (currentPage - 1) * itemsPerPage;
                    pagingData = new PagingData(itemsPerPage);
                    pagingData.currentPage = currentPage;

                    compile();
                    expect(itemsFunc).toHaveBeenCalledWith(startIdx, itemsPerPage, {}, undefined, undefined);
                }));

                it('displays each card', function () {
                    compile();

                    var cards = element.find('#cardList > section');
                    expect(cards.length).toEqual(5);
                    for (var i = 0; i < cards.length; i++) {
                        expect(angular.element(cards[i]).text().trim()).toEqual(Number(i).toString(10));
                    }
                });

                it('shows no results message if there are no items', function () {
                    // Send no results back.
                    setResults(0);
                    compile();

                    var msg = element.find('h3');
                    expect(msg.length).toEqual(1);
                    expect(msg.text().trim()).toEqual('ui_no_results');
                });

                describe('sort', function () {
                    var SortOrder = undefined,
                        PagingData = undefined,
                        someDefaultSort = undefined;

                    function createConfig(sortingEnabled, defaultSort) {
                        return new CardListConfig({
                            sortEnabled: sortingEnabled,
                            headerEnabled: sortingEnabled,
                            columnConfigKey: 'testColumnConfig',
                            defaultSort: defaultSort,
                            refreshTrigger: trigger
                        });
                    }

                    function findSortBtns() {
                        return element.find('.card-list-header .card-list-sort-btns');
                    }

                    beforeEach(inject(function (_SortOrder_, _PagingData_) {
                        SortOrder = _SortOrder_;
                        PagingData = _PagingData_;
                        someDefaultSort = new SortOrder('someValue', true);
                    }));

                    it('does not show sorting buttons by default', function () {
                        compile();
                        var sortby = findSortBtns();
                        expect(sortby.length).toEqual(0);
                    });

                    it('shows sorting buttons if sorting is enabled', function () {
                        compile(false, false, createConfig(true, someDefaultSort));

                        var sortby = findSortBtns();
                        expect(sortby.length).toEqual(1);
                    });

                    it('requires sp-default-sort when sorting is enabled', function () {
                        var config = createConfig(true, undefined);
                        expect(function () {
                            return compile(false, false, config);
                        }).toThrow();
                    });

                    it('shows default sort col name on sort button', function () {
                        var config = createConfig(true, someDefaultSort),
                            sortby = undefined;
                        compile(false, false, config);
                        sortby = findSortBtns();
                        expect(sortby.length).toEqual(1);
                        expect(sortby.find('button')[0].innerText.indexOf('Sortby') !== -1).toBe(true);
                    });

                    it('shows default sort col direction', function () {
                        var config = createConfig(true, new SortOrder('someValue')),
                            sortdir = undefined;
                        compile(false, false, config);
                        sortdir = findSortBtns().find('i.fa-sort-amount-asc');
                        expect(sortdir.length).toEqual(1);
                    });

                    it('dropdown contains all sortable columns', function () {
                        var config = createConfig(true, someDefaultSort),
                            dropdownmenuitems = undefined;
                        compile(false, false, config);
                        dropdownmenuitems = findSortBtns().find('ul.dropdown-menu li a');
                        expect(dropdownmenuitems.length).toEqual(2);
                        expect(dropdownmenuitems[0].innerText.indexOf('Name') !== -1).toBe(true);
                        expect(dropdownmenuitems[1].innerText.indexOf('Sortby') !== -1).toBe(true);
                    });

                    it('toggling sort direction should reset current page and change sort direction', function () {
                        spyOn(PagingData.prototype, 'resetCurrentPage').and.callThrough();
                        var config = createConfig(true, someDefaultSort),
                            buttons = undefined,
                            sortdir = undefined;
                        compile(false, false, config);

                        buttons = findSortBtns().find('button');
                        expect(buttons.length).toEqual(2);
                        angular.element(buttons[1]).click();
                        expect(PagingData.prototype.resetCurrentPage).toHaveBeenCalled();

                        sortdir = findSortBtns().find('button.active');
                        // sort button should not be in active(asc) state
                        expect(sortdir.length).toEqual(0);

                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 12, {}, new SortOrder('someValue', true), undefined);
                    });

                    it('sort and reset page', function () {
                        spyOn(PagingData.prototype, 'resetCurrentPage').and.callThrough();
                        var config = createConfig(true, someDefaultSort),
                            dropdownmenuitems = undefined;
                        compile(false, false, config);

                        dropdownmenuitems = findSortBtns().find('ul.dropdown-menu li a');
                        expect(dropdownmenuitems.length).toEqual(2);

                        angular.element(dropdownmenuitems[0]).click();
                        expect(PagingData.prototype.resetCurrentPage).toHaveBeenCalled();

                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 12, {}, new SortOrder('name', true), undefined);
                    });
                });

                describe('pager', function () {
                    function getPager() {
                        return element.find('#cardListPager');
                    }

                    it('is hidden if there is only one page', function () {
                        // Defaults to 5 results.
                        compile();
                        expect(getPager().length).toEqual(0);
                    });

                    it('is shown if there are multiple pages', function () {
                        // Give it two pages.
                        setResults(15);
                        compile();
                        expect(getPager().length).toEqual(1);
                    });

                    it('refetches when pager button is clicked', function () {
                        // Give it two pages.
                        setResults(15);
                        compile();

                        // Click the "next" button"
                        var pager = getPager();
                        expect(pager.length).toEqual(1);
                        var btns = pager.find('a');
                        var nextBtn = angular.element(btns[btns.length - 1]);

                        itemsFunc.calls.reset();
                        nextBtn.click();

                        expect(itemsFunc).toHaveBeenCalledWith(12, 12, {}, undefined, undefined);
                    });
                });

                describe('filters', function () {
                    var Filter = undefined,
                        filters = undefined,
                        searchData = undefined;

                    beforeEach(inject(function (_Filter_, SearchData) {
                        Filter = _Filter_;
                        filters = [new Filter({
                            property: 'name',
                            label: 'Name'
                        }), new Filter({
                            property: 'manager',
                            label: 'Manager'
                        })];
                        searchData = new SearchData();
                    }));

                    function createConfig(filters) {
                        return new CardListConfig({
                            columnConfigKey: 'testColumnConfig',
                            filters: filters,
                            searchData: searchData,
                            headerEnabled: !!filters
                        });
                    }

                    it('uses the filters from the config', function () {
                        spyOn(searchData, 'initializeFilters').and.callThrough();
                        compile(false, false, createConfig(filters));
                        expect(searchData.initializeFilters).toHaveBeenCalledWith(filters);
                    });

                    it('does not show button if no filters', function () {
                        compile(false, false, createConfig(undefined));
                        var filterButton = element.find('#cardListFilterBtn');
                        expect(filterButton.length).toEqual(0);
                    });

                    it('shows button if there are filters', function () {
                        compile(false, false, createConfig(filters));
                        var filterButton = element.find('#cardListFilterBtn');
                        expect(filterButton.length).toEqual(1);
                    });

                    it('toggles filter panel when clicked', function () {
                        compile(false, false, createConfig(filters));
                        var filterButton = element.find('#cardListFilterBtn'),
                            ctrl = $scope.$$childHead.cardListCtrl;
                        spyOn(ctrl, 'toggleFiltersDisplayed');
                        filterButton.click();
                        $scope.$apply();
                        expect(ctrl.toggleFiltersDisplayed).toHaveBeenCalled();
                    });

                    it('shows green button when filters applied', function () {
                        compile(false, false, createConfig(filters));
                        var ctrl = $scope.$$childHead.cardListCtrl;
                        spyOn(ctrl, 'hasAppliedFilters').and.returnValue(true);
                        $scope.$apply();
                        var filterButton = element.find('#cardListFilterBtn');
                        expect(filterButton.hasClass('btn-success')).toEqual(true);
                    });

                    it('shows white button with no filters applied', function () {
                        compile(false, false, createConfig(filters));
                        var ctrl = $scope.$$childHead.cardListCtrl;
                        spyOn(ctrl, 'hasAppliedFilters').and.returnValue(false);
                        $scope.$apply();
                        var filterButton = element.find('#cardListFilterBtn');
                        expect(filterButton.hasClass('btn-white')).toEqual(true);
                    });
                });

                describe('header', function () {
                    var headerElementDef = '<sp-card-list sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)"\n                           sp-config="config">\n               <sp-card>{{ item }}</sp-card>\n               <sp-header-left><div>HEADS UP</div></sp-header-left>\n             </sp-card-list>';

                    it('shows the header if enabled', function () {
                        var config = new CardListConfig({ headerEnabled: false });
                        compile(false, false, config, headerElementDef);
                        expect(element.find('.card-list-header').length).toEqual(0);
                    });

                    it('excludes the header if not enabled', function () {
                        var config = new CardListConfig({ headerEnabled: true });
                        compile(false, false, config, headerElementDef);
                        expect(element.find('.card-list-header').length).toEqual(1);
                    });

                    it('transcludes the left header if provided', function () {
                        var config = new CardListConfig({ headerEnabled: true });
                        compile(false, false, config, headerElementDef);
                        expect(element.find('.card-list-header .card-list-header-left').text().trim()).toEqual('HEADS UP');
                    });
                });

                describe('search', function () {

                    it('shows the search bar and button if enabled', function () {
                        var config = new CardListConfig({
                            headerEnabled: true,
                            searchEnabled: true
                        });
                        compile(false, false, config);
                        expect(element.find('#cardListSearchBtn').length).toEqual(1);
                        expect(element.find('#cardListSearchInput').length).toEqual(1);
                    });

                    it('does not show the search bar and button if not enabled', function () {
                        var config = new CardListConfig({
                            headerEnabled: true,
                            searchEnabled: false
                        });
                        compile(false, false, config);
                        expect(element.find('#cardListSearchBtn').length).toEqual(0);
                        expect(element.find('#cardListSearchInput').length).toEqual(0);
                    });

                    it('uses the placeholder text from the configuration if provided', function () {
                        var config = new CardListConfig({
                            headerEnabled: true,
                            searchEnabled: true,
                            searchPlaceholder: 'i am a placeholder'
                        });
                        compile(false, false, config);
                        expect(element.find('#cardListSearchInput').attr('placeholder')).toEqual(config.searchPlaceholder);
                    });

                    it('sets the searchTerm and calls itemsFunc with it', function () {
                        var config = new CardListConfig({
                            headerEnabled: true,
                            searchEnabled: true
                        }),
                            searchTerm = 'mySearch';
                        compile(false, false, config);
                        element.find('#cardListSearchInput').val(searchTerm).trigger('input');
                        $scope.$apply();
                        itemsFunc.calls.reset();
                        element.find('#cardListSearchBtn').trigger('click');
                        $scope.$apply();
                        $timeout.flush();
                        expect(itemsFunc).toHaveBeenCalledWith(0, 12, {}, undefined, searchTerm);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9jYXJkL0NhcmRMaXN0RGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1DQUFtQyx1QkFBdUIsVUFBVSxTQUFTO0lBQ3JIOztJQUVBLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQkFBK0I7WUFDckYsYUFBYSw4QkFBOEI7V0FDNUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxxQkFBcUIsWUFBTTs7Z0JBRWhDLElBQUksV0FBUTtvQkFBRSxTQUFNO29CQUFFLEtBQUU7b0JBQUUsZ0JBQWE7b0JBQUUsVUFBTztvQkFBRSxZQUFTO29CQUFFLFVBQU87b0JBQUUsYUFBVTtvQkFBRSxRQUFLO29CQUFFLFFBQUs7b0JBQUUsZ0JBQWE7b0JBQ3pHLGdCQUFhO29CQUFFLGlCQUFjO29CQUFFLFdBQVE7b0JBQ3ZDLFNBQU07O2dCQU1WLFdBQVcsT0FBTyxZQUFZOzs7Z0JBRzlCLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSxNQUFNLGlCQUFpQixvQkFBb0IsaUJBQWlCLGNBQ3BGLGFBQWEsa0JBQWtCLFlBQWU7b0JBQzdELFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxLQUFLO29CQUNMLFdBQVc7b0JBQ1gsZ0JBQWdCO29CQUNoQixpQkFBaUI7O29CQUVqQixVQUFVLElBQUk7b0JBQ2QsYUFBYTtvQkFDYixnQkFBZ0I7O29CQUVoQixnQkFBZ0IsQ0FBQyxJQUFJLGFBQWE7d0JBQzlCLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixXQUFXO3dCQUNaLElBQUksYUFBYTt3QkFDaEIsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFdBQVc7d0JBQ1osSUFBSSxhQUFhO3dCQUNoQixXQUFXO3dCQUNYLFdBQVc7d0JBQ1osSUFBSSxhQUFhO3dCQUNoQixXQUFXO3dC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ZUFBZTs7d0JBRW5CLFFBQVEsT0FBTyxPQUFPO3dCQUN0QixPQUFPLFFBQVEsS0FBSyxzQkFBc0IsUUFBUSxRQUFRO3dCQUMxRCxPQUFPLFFBQVEsS0FBSyx3QkFBd0IsUUFBUSxRQUFROzs7b0JBR2hFLEdBQUcsMERBQTBELFlBQU07d0JBQy9ELElBQUksU0FBUyxJQUFJLGVBQWU7NEJBQzVCLGVBQWU7NEJBQ2YsZUFBZTs7d0JBRW5CLFFBQVEsT0FBTyxPQUFPO3dCQUN0QixPQUFPLFFBQVEsS0FBSyxzQkFBc0IsUUFBUSxRQUFRO3dCQUMxRCxPQUFPLFFBQVEsS0FBSyx3QkFBd0IsUUFBUSxRQUFROzs7b0JBR2hFLEdBQUcsZ0VBQWdFLFlBQU07d0JBQ3JFLElBQUksU0FBUyxJQUFJLGVBQWU7NEJBQzVCLGVBQWU7NEJBQ2YsZUFBZTs0QkFDZixtQkFBbUI7O3dCQUV2QixRQUFRLE9BQU8sT0FBTzt3QkFDdEIsT0FBTyxRQUFRLEtBQUssd0JBQXdCLEtBQUssZ0JBQWdCLFFBQVEsT0FBTzs7O29CQUdwRixHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLFNBQVMsSUFBSSxlQUFlOzRCQUM1QixlQUFlOzRCQUNmLGVBQWU7OzRCQUNmLGFBQWE7d0JBQ2pCLFFBQVEsT0FBTyxPQUFPO3dCQUN0QixRQUFRLEtBQUssd0JBQXdCLElBQUksWUFBWSxRQUFRO3dCQUM3RCxPQUFPO3dCQUNQLFVBQVUsTUFBTTt3QkFDaEIsUUFBUSxLQUFLLHNCQUFzQixRQUFRO3dCQUMzQyxPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsT0FBTyxXQUFXLHFCQUFxQixHQUFHLElBQUksSUFBSSxXQUFXOzs7Ozs7R0E0QnRFIiwiZmlsZSI6ImNvbW1vbi9kYXRhdmlldy9jYXJkL0NhcmRMaXN0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNhcmRNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L2NhcmQvQ2FyZE1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQ2FyZExpc3REaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0ICRjb21waWxlLCAkc2NvcGUsICRxLCBMaXN0UmVzdWx0RFRPLCBlbGVtZW50LCBpdGVtc0Z1bmMsIHRyaWdnZXIsIHBhZ2luZ0RhdGEsIHRvdGFsLCBpdGVtcywgY29uZmlnU2VydmljZSxcclxuICAgICAgICBjb2x1bW5Db25maWdzLCBDYXJkTGlzdENvbmZpZywgJHRpbWVvdXQsXHJcbiAgICAgICAgZWx0RGVmID1cclxuICAgICAgICAgICAgYDxzcC1jYXJkLWxpc3Qgc3AtaXRlbXMtZnVuYz1cIml0ZW1zRnVuYyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJWYWx1ZXMsIHNvcnRPcmRlciwgc2VhcmNoVGVybSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1jb25maWc9XCJjb25maWdcIj5cclxuICAgICAgICAgICAgICAgPHNwLWNhcmQ+e3sgaXRlbSB9fTwvc3AtY2FyZD5cclxuICAgICAgICAgICAgIDwvc3AtY2FyZC1saXN0PmA7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgY2FyZE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEwICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSwgXyRxXywgX0xpc3RSZXN1bHREVE9fLCBEYXRhUmVmcmVzaFRyaWdnZXIsIF9jb25maWdTZXJ2aWNlXywgQ29sdW1uQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLCBfQ2FyZExpc3RDb25maWdfLCBfJHRpbWVvdXRfKSA9PiB7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcclxuICAgICAgICBMaXN0UmVzdWx0RFRPID0gX0xpc3RSZXN1bHREVE9fO1xyXG4gICAgICAgIENhcmRMaXN0Q29uZmlnID0gX0NhcmRMaXN0Q29uZmlnXztcclxuXHJcbiAgICAgICAgdHJpZ2dlciA9IG5ldyBEYXRhUmVmcmVzaFRyaWdnZXIoKTtcclxuICAgICAgICBwYWdpbmdEYXRhID0gbnVsbDtcclxuICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xyXG5cclxuICAgICAgICBjb2x1bW5Db25maWdzID0gW25ldyBDb2x1bW5Db25maWcoe1xyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ICduYW1lJyxcclxuICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGhlYWRlcktleTogJ05hbWUnXHJcbiAgICAgICAgfSksbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ3NvbWVWYWx1ZScsXHJcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBoZWFkZXJLZXk6ICdTb3J0YnknXHJcbiAgICAgICAgfSksbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2V4dHJhJyxcclxuICAgICAgICAgICAgZmllbGRPbmx5OiB0cnVlXHJcbiAgICAgICAgfSksbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ3Jpc2snLFxyXG4gICAgICAgICAgICByZW5kZXJlcjogJ3Jpc2snXHJcbiAgICAgICAgfSldO1xyXG5cclxuICAgICAgICBjb25maWdTZXJ2aWNlLmdldENvbHVtbkNvbmZpZ0VudHJpZXMgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q29sdW1uQ29uZmlnOiBjb2x1bW5Db25maWdzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7fSk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGEgZmFrZSBpdGVtcyBmdW5jdGlvbiB3aXRoIGEgZGVmYXVsdCBMaXN0UmVzdWx0LiAgVGhpcyBjYW4gYmUgdHdlYWtlZCBieSB0ZXN0cy5cclxuICAgICAgICBzZXRSZXN1bHRzKDUpO1xyXG4gICAgICAgIGl0ZW1zRnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCdpdGVtc0Z1bmMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgTGlzdFJlc3VsdERUTyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRvdGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IGl0ZW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UmVzdWx0cyhjb3VudCkge1xyXG4gICAgICAgIHRvdGFsID0gY291bnQ7XHJcblxyXG4gICAgICAgIGl0ZW1zID0gW107XHJcbiAgICAgICAgbGV0IG51bU9iamVjdHMgPSBNYXRoLm1pbihjb3VudCwgMTIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2JqZWN0czsgaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUobm9JdGVtc0Z1bmMsIG5vQ29uZmlnLCBjb25maWcsIGVsZW1lbnREZWYgPSBlbHREZWYpIHtcclxuICAgICAgICBpZiAoIW5vSXRlbXNGdW5jKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtc0Z1bmMgPSBpdGVtc0Z1bmM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5vQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb25maWcgPSBjb25maWcgfHwgbmV3IENhcmRMaXN0Q29uZmlnKHtcclxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoVHJpZ2dlcjogdHJpZ2dlcixcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmdEYXRhOiBwYWdpbmdEYXRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdleHBsb2RlcyBpZiBubyBzcC1pdGVtcy1mdW5jIGlzIGdpdmVuJywgKCkgPT4ge1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKG51bGwsIHRydWUpKS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZmV0Y2hlcyBpdGVtcyB3aGVuIGNyZWF0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChpdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDEyLCB7fSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlZmV0Y2hlcyBpdGVtcyB3aGVuIHRoZSB0cmlnZ2VyIGlzIHRyaWdnZXJlZCcsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgZXhwZWN0KGl0ZW1zRnVuYy5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLnJlZnJlc2goKTtcclxuICAgICAgICBleHBlY3QoaXRlbXNGdW5jLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncGFnaW5nIGRhdGEgaXMgdXNlZCBpZiBwYXNzZWQgaW4nLCBpbmplY3QoKFBhZ2luZ0RhdGEpID0+IHtcclxuICAgICAgICBsZXQgaXRlbXNQZXJQYWdlID0gNTtcclxuICAgICAgICBsZXQgY3VycmVudFBhZ2UgPSAzO1xyXG4gICAgICAgIGxldCBzdGFydElkeCA9IChjdXJyZW50UGFnZSAtIDEpICogaXRlbXNQZXJQYWdlO1xyXG4gICAgICAgIHBhZ2luZ0RhdGEgPSBuZXcgUGFnaW5nRGF0YShpdGVtc1BlclBhZ2UpO1xyXG4gICAgICAgIHBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcclxuXHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChpdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIHt9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ2Rpc3BsYXlzIGVhY2ggY2FyZCcsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcblxyXG4gICAgICAgIGxldCBjYXJkcyA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0ID4gc2VjdGlvbicpO1xyXG4gICAgICAgIGV4cGVjdChjYXJkcy5sZW5ndGgpLnRvRXF1YWwoNSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGNhcmRzW2ldKS50ZXh0KCkudHJpbSgpKS50b0VxdWFsKE51bWJlcihpKS50b1N0cmluZygxMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBubyByZXN1bHRzIG1lc3NhZ2UgaWYgdGhlcmUgYXJlIG5vIGl0ZW1zJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIFNlbmQgbm8gcmVzdWx0cyBiYWNrLlxyXG4gICAgICAgIHNldFJlc3VsdHMoMCk7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG5cclxuICAgICAgICBsZXQgbXNnID0gZWxlbWVudC5maW5kKCdoMycpO1xyXG4gICAgICAgIGV4cGVjdChtc2cubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGV4cGVjdChtc2cudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgndWlfbm9fcmVzdWx0cycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NvcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IFNvcnRPcmRlciwgUGFnaW5nRGF0YSwgc29tZURlZmF1bHRTb3J0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb25maWcoc29ydGluZ0VuYWJsZWQsIGRlZmF1bHRTb3J0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2FyZExpc3RDb25maWcoe1xyXG4gICAgICAgICAgICAgICAgc29ydEVuYWJsZWQ6IHNvcnRpbmdFbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyRW5hYmxlZDogc29ydGluZ0VuYWJsZWQsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6ICd0ZXN0Q29sdW1uQ29uZmlnJyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRTb3J0OiBkZWZhdWx0U29ydCxcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUcmlnZ2VyOiB0cmlnZ2VyXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZmluZFNvcnRCdG5zKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcuY2FyZC1saXN0LWhlYWRlciAuY2FyZC1saXN0LXNvcnQtYnRucycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9Tb3J0T3JkZXJfLCBfUGFnaW5nRGF0YV8pID0+IHtcclxuICAgICAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XHJcbiAgICAgICAgICAgIFBhZ2luZ0RhdGEgPSBfUGFnaW5nRGF0YV87XHJcbiAgICAgICAgICAgIHNvbWVEZWZhdWx0U29ydCA9IG5ldyBTb3J0T3JkZXIoJ3NvbWVWYWx1ZScsIHRydWUpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHNob3cgc29ydGluZyBidXR0b25zIGJ5IGRlZmF1bHQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IHNvcnRieSA9IGZpbmRTb3J0QnRucygpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc29ydGJ5Lmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHNvcnRpbmcgYnV0dG9ucyBpZiBzb3J0aW5nIGlzIGVuYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjcmVhdGVDb25maWcodHJ1ZSwgc29tZURlZmF1bHRTb3J0KSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc29ydGJ5ID0gZmluZFNvcnRCdG5zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzb3J0YnkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVxdWlyZXMgc3AtZGVmYXVsdC1zb3J0IHdoZW4gc29ydGluZyBpcyBlbmFibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gY3JlYXRlQ29uZmlnKHRydWUsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKGZhbHNlLCBmYWxzZSwgY29uZmlnKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgZGVmYXVsdCBzb3J0IGNvbCBuYW1lIG9uIHNvcnQgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gY3JlYXRlQ29uZmlnKHRydWUsIHNvbWVEZWZhdWx0U29ydCksXHJcbiAgICAgICAgICAgICAgICBzb3J0Ynk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcpO1xyXG4gICAgICAgICAgICBzb3J0YnkgPSBmaW5kU29ydEJ0bnMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNvcnRieS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzb3J0YnkuZmluZCgnYnV0dG9uJylbMF0uaW5uZXJUZXh0LmluZGV4T2YoJ1NvcnRieScpICE9PSAtMSkudG9CZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGRlZmF1bHQgc29ydCBjb2wgZGlyZWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gY3JlYXRlQ29uZmlnKHRydWUsIG5ldyBTb3J0T3JkZXIoJ3NvbWVWYWx1ZScpKSxcclxuICAgICAgICAgICAgICAgIHNvcnRkaXI7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcpO1xyXG4gICAgICAgICAgICBzb3J0ZGlyID0gZmluZFNvcnRCdG5zKCkuZmluZCgnaS5mYS1zb3J0LWFtb3VudC1hc2MnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNvcnRkaXIubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZHJvcGRvd24gY29udGFpbnMgYWxsIHNvcnRhYmxlIGNvbHVtbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBjcmVhdGVDb25maWcodHJ1ZSwgc29tZURlZmF1bHRTb3J0KSxcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3dubWVudWl0ZW1zO1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY29uZmlnKTtcclxuICAgICAgICAgICAgZHJvcGRvd25tZW51aXRlbXMgPSBmaW5kU29ydEJ0bnMoKS5maW5kKCd1bC5kcm9wZG93bi1tZW51IGxpIGEnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRyb3Bkb3dubWVudWl0ZW1zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRyb3Bkb3dubWVudWl0ZW1zWzBdLmlubmVyVGV4dC5pbmRleE9mKCdOYW1lJykgIT09IC0xKS50b0JlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZHJvcGRvd25tZW51aXRlbXNbMV0uaW5uZXJUZXh0LmluZGV4T2YoJ1NvcnRieScpICE9PSAtMSkudG9CZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RvZ2dsaW5nIHNvcnQgZGlyZWN0aW9uIHNob3VsZCByZXNldCBjdXJyZW50IHBhZ2UgYW5kIGNoYW5nZSBzb3J0IGRpcmVjdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oUGFnaW5nRGF0YS5wcm90b3R5cGUsICdyZXNldEN1cnJlbnRQYWdlJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBjcmVhdGVDb25maWcodHJ1ZSwgc29tZURlZmF1bHRTb3J0KSxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbnMsIHNvcnRkaXI7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9ucyA9IGZpbmRTb3J0QnRucygpLmZpbmQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBleHBlY3QoYnV0dG9ucy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChidXR0b25zWzFdKS5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoUGFnaW5nRGF0YS5wcm90b3R5cGUucmVzZXRDdXJyZW50UGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgc29ydGRpciA9IGZpbmRTb3J0QnRucygpLmZpbmQoJ2J1dHRvbi5hY3RpdmUnKTtcclxuICAgICAgICAgICAgLy8gc29ydCBidXR0b24gc2hvdWxkIG5vdCBiZSBpbiBhY3RpdmUoYXNjKSBzdGF0ZVxyXG4gICAgICAgICAgICBleHBlY3Qoc29ydGRpci5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLml0ZW1zRnVuYykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMCwgMTIsIHt9LCBuZXcgU29ydE9yZGVyKCdzb21lVmFsdWUnLCB0cnVlKSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NvcnQgYW5kIHJlc2V0IHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKFBhZ2luZ0RhdGEucHJvdG90eXBlLCAncmVzZXRDdXJyZW50UGFnZScpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gY3JlYXRlQ29uZmlnKHRydWUsIHNvbWVEZWZhdWx0U29ydCksXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bm1lbnVpdGVtcztcclxuICAgICAgICAgICAgY29tcGlsZShmYWxzZSwgZmFsc2UsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBkcm9wZG93bm1lbnVpdGVtcyA9IGZpbmRTb3J0QnRucygpLmZpbmQoJ3VsLmRyb3Bkb3duLW1lbnUgbGkgYScpO1xyXG4gICAgICAgICAgICBleHBlY3QoZHJvcGRvd25tZW51aXRlbXMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRyb3Bkb3dubWVudWl0ZW1zWzBdKS5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoUGFnaW5nRGF0YS5wcm90b3R5cGUucmVzZXRDdXJyZW50UGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5pdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDEyLCB7fSwgbmV3IFNvcnRPcmRlcignbmFtZScsIHRydWUpLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BhZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldFBhZ2VyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcjY2FyZExpc3RQYWdlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byA1IHJlc3VsdHMuXHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldFBhZ2VyKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgc2hvd24gaWYgdGhlcmUgYXJlIG11bHRpcGxlIHBhZ2VzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBHaXZlIGl0IHR3byBwYWdlcy5cclxuICAgICAgICAgICAgc2V0UmVzdWx0cygxNSk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldFBhZ2VyKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVmZXRjaGVzIHdoZW4gcGFnZXIgYnV0dG9uIGlzIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEdpdmUgaXQgdHdvIHBhZ2VzLlxyXG4gICAgICAgICAgICBzZXRSZXN1bHRzKDE1KTtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xpY2sgdGhlIFwibmV4dFwiIGJ1dHRvblwiXHJcbiAgICAgICAgICAgIGxldCBwYWdlciA9IGdldFBhZ2VyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlci5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGxldCBidG5zID0gcGFnZXIuZmluZCgnYScpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGFuZ3VsYXIuZWxlbWVudChidG5zW2J0bnMubGVuZ3RoIC0gMV0pO1xyXG5cclxuICAgICAgICAgICAgaXRlbXNGdW5jLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIG5leHRCdG4uY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEyLCAxMiwge30sIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBGaWx0ZXIsIGZpbHRlcnMsIHNlYXJjaERhdGE7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfRmlsdGVyXywgU2VhcmNoRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBGaWx0ZXIgPSBfRmlsdGVyXztcclxuICAgICAgICAgICAgZmlsdGVycyA9IFtuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ05hbWUnXHJcbiAgICAgICAgICAgIH0pLCBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ01hbmFnZXInXHJcbiAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgc2VhcmNoRGF0YSA9IG5ldyBTZWFyY2hEYXRhKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb25maWcoZmlsdGVycykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENhcmRMaXN0Q29uZmlnKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogJ3Rlc3RDb2x1bW5Db25maWcnLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVycyxcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGE6IHNlYXJjaERhdGEsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJFbmFibGVkOiAhIWZpbHRlcnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgndXNlcyB0aGUgZmlsdGVycyBmcm9tIHRoZSBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKHNlYXJjaERhdGEsICdpbml0aWFsaXplRmlsdGVycycpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY3JlYXRlQ29uZmlnKGZpbHRlcnMpKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZpbHRlcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyBidXR0b24gaWYgbm8gZmlsdGVycycsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZShmYWxzZSwgZmFsc2UsIGNyZWF0ZUNvbmZpZyh1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0RmlsdGVyQnRuJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgYnV0dG9uIGlmIHRoZXJlIGFyZSBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY3JlYXRlQ29uZmlnKGZpbHRlcnMpKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0RmlsdGVyQnRuJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndG9nZ2xlcyBmaWx0ZXIgcGFuZWwgd2hlbiBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY3JlYXRlQ29uZmlnKGZpbHRlcnMpKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0RmlsdGVyQnRuJyksXHJcbiAgICAgICAgICAgICAgICBjdHJsID0gJHNjb3BlLiQkY2hpbGRIZWFkLmNhcmRMaXN0Q3RybDtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3RvZ2dsZUZpbHRlcnNEaXNwbGF5ZWQnKTtcclxuICAgICAgICAgICAgZmlsdGVyQnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwudG9nZ2xlRmlsdGVyc0Rpc3BsYXllZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgZ3JlZW4gYnV0dG9uIHdoZW4gZmlsdGVycyBhcHBsaWVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY3JlYXRlQ29uZmlnKGZpbHRlcnMpKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSAkc2NvcGUuJCRjaGlsZEhlYWQuY2FyZExpc3RDdHJsO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaGFzQXBwbGllZEZpbHRlcnMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0RmlsdGVyQnRuJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJCdXR0b24uaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB3aGl0ZSBidXR0b24gd2l0aCBubyBmaWx0ZXJzIGFwcGxpZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjcmVhdGVDb25maWcoZmlsdGVycykpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9ICRzY29wZS4kJGNoaWxkSGVhZC5jYXJkTGlzdEN0cmw7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNBcHBsaWVkRmlsdGVycycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0RmlsdGVyQnRuJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJCdXR0b24uaGFzQ2xhc3MoJ2J0bi13aGl0ZScpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hlYWRlcicsICgpID0+IHtcclxuICAgICAgICBsZXQgaGVhZGVyRWxlbWVudERlZiA9XHJcbiAgICAgICAgICAgIGA8c3AtY2FyZC1saXN0IHNwLWl0ZW1zLWZ1bmM9XCJpdGVtc0Z1bmMoc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtY29uZmlnPVwiY29uZmlnXCI+XHJcbiAgICAgICAgICAgICAgIDxzcC1jYXJkPnt7IGl0ZW0gfX08L3NwLWNhcmQ+XHJcbiAgICAgICAgICAgICAgIDxzcC1oZWFkZXItbGVmdD48ZGl2PkhFQURTIFVQPC9kaXY+PC9zcC1oZWFkZXItbGVmdD5cclxuICAgICAgICAgICAgIDwvc3AtY2FyZC1saXN0PmA7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgaGVhZGVyIGlmIGVuYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ2FyZExpc3RDb25maWcoeyBoZWFkZXJFbmFibGVkOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY29uZmlnLCBoZWFkZXJFbGVtZW50RGVmKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmNhcmQtbGlzdC1oZWFkZXInKS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdleGNsdWRlcyB0aGUgaGVhZGVyIGlmIG5vdCBlbmFibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENhcmRMaXN0Q29uZmlnKHsgaGVhZGVyRW5hYmxlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBjb21waWxlKGZhbHNlLCBmYWxzZSwgY29uZmlnLCBoZWFkZXJFbGVtZW50RGVmKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmNhcmQtbGlzdC1oZWFkZXInKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0cmFuc2NsdWRlcyB0aGUgbGVmdCBoZWFkZXIgaWYgcHJvdmlkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ2FyZExpc3RDb25maWcoeyBoZWFkZXJFbmFibGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcsIGhlYWRlckVsZW1lbnREZWYpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuY2FyZC1saXN0LWhlYWRlciAuY2FyZC1saXN0LWhlYWRlci1sZWZ0JykudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgnSEVBRFMgVVAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWFyY2gnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgc2VhcmNoIGJhciBhbmQgYnV0dG9uIGlmIGVuYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ2FyZExpc3RDb25maWcoe1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaEVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjY2FyZExpc3RTZWFyY2hCdG4nKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNjYXJkTGlzdFNlYXJjaElucHV0JykubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyB0aGUgc2VhcmNoIGJhciBhbmQgYnV0dG9uIGlmIG5vdCBlbmFibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENhcmRMaXN0Q29uZmlnKHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hFbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tcGlsZShmYWxzZSwgZmFsc2UsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNjYXJkTGlzdFNlYXJjaEJ0bicpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0U2VhcmNoSW5wdXQnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd1c2VzIHRoZSBwbGFjZWhvbGRlciB0ZXh0IGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gaWYgcHJvdmlkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBuZXcgQ2FyZExpc3RDb25maWcoe1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyRW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hQbGFjZWhvbGRlcjogJ2kgYW0gYSBwbGFjZWhvbGRlcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoZmFsc2UsIGZhbHNlLCBjb25maWcpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjY2FyZExpc3RTZWFyY2hJbnB1dCcpLmF0dHIoJ3BsYWNlaG9sZGVyJykpLnRvRXF1YWwoY29uZmlnLnNlYXJjaFBsYWNlaG9sZGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIHNlYXJjaFRlcm0gYW5kIGNhbGxzIGl0ZW1zRnVuYyB3aXRoIGl0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gbmV3IENhcmRMaXN0Q29uZmlnKHtcclxuICAgICAgICAgICAgICAgIGhlYWRlckVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hFbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCBzZWFyY2hUZXJtID0gJ215U2VhcmNoJztcclxuICAgICAgICAgICAgY29tcGlsZShmYWxzZSwgZmFsc2UsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnI2NhcmRMaXN0U2VhcmNoSW5wdXQnKS52YWwoc2VhcmNoVGVybSkudHJpZ2dlcignaW5wdXQnKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBpdGVtc0Z1bmMuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcjY2FyZExpc3RTZWFyY2hCdG4nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDAsIDEyLCB7fSwgdW5kZWZpbmVkLCBzZWFyY2hUZXJtKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
