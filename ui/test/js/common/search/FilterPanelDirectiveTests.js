System.register(['test/js/TestInitializer', 'common/search/SearchModule', 'test/js/TestModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var searchModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            /**
             * Tests for the filter panel directives - including the FilterPanelItemDirective, FilterPanelDirective,
             * and spFilterPanelTitle.
             */
            describe('', function () {
                var $compile, $scope;

                beforeEach(module(searchModule, testModule));

                //Create a mock ColumnSuggestService
                beforeEach(module(function ($provide) {
                    $provide.factory('columnSuggestService', function (testService) {
                        return {
                            getObjects: testService.createPromiseSpy(false, {
                                count: 0,
                                objects: {}
                            })
                        };
                    });
                }));

                /**
                 * Setup the dependencies and data needs by all tests.
                 */
                beforeEach(inject(function (_$compile_, _$rootScope_, spTranslateFilter) {
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();

                    // Mock the translate service to return some canned data.
                    spTranslateFilter.configureCatalog({
                        'ui_access_filter_by': function (args) {
                            return 'Filter By: ' + args[1];
                        },
                        'ui_label': 'Yo momma',
                        'ui_label2': 'Yo daddy',
                        'ui_access_cancel': 'Cancel',
                        'ui_access_clear': 'Clear',
                        'ui_access_apply': 'Apply'
                    });
                }));

                function createElement(elementDefinition) {
                    var element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                describe('FilterPanelItemDirective', function () {
                    var elementDefinition = '<sp-filter-panel-item sp-id="id" sp-filter="filter" ng-model="value" />',
                        filterTemplateService,
                        filter,
                        element;

                    beforeEach(inject(function (_filterTemplateService_, Filter) {
                        filterTemplateService = _filterTemplateService_;

                        // Setup a Filter to compile with.
                        filter = new Filter({
                            property: 'prop',
                            label: 'ui_label',
                            dataType: Filter.DATA_TYPE_STRING
                        });

                        // Setup the scope to compile with.
                        $scope.filter = filter;
                        $scope.value = null;

                        // Mock the filterTemplateService.
                        spyOn(filterTemplateService, 'getFilterTemplate').and.returnValue('<input id="idItem0" type="text" />');

                        // Create an element to test with.
                        element = createElement(elementDefinition);
                    }));

                    it('displays an i18n label using the filter label', function () {
                        var label = element.find('label');
                        expect(label.text()).toEqual('Yo momma');
                    });

                    it('includes the filter template after the label', function () {
                        var input = element.find('#idItem0');
                        expect(input.length).toEqual(1);
                    });
                });

                describe('FilterPanelDirective', function () {
                    var elementDefinition = '<sp-filter-panel id="id" sp-title="title" sp-displayed="displayed" ' + '                 sp-filter-groups="filterGroups" sp-search-data="searchData" ' + '                 sp-apply-func="search()" />',
                        filterTemplateService,
                        filter1,
                        filter2,
                        filter3,
                        filter4,
                        searchData,
                        element,
                        $timeout,
                        Filter,
                        SearchData;

                    beforeEach(inject(function (_filterTemplateService_, _Filter_, _$timeout_, _SearchData_) {
                        filterTemplateService = _filterTemplateService_;
                        Filter = _Filter_;
                        SearchData = _SearchData_;
                        $timeout = _$timeout_;
                        // Setup Filters to compile with.
                        filter1 = new Filter({
                            property: 'prop',
                            label: 'ui_label',
                            dataType: Filter.DATA_TYPE_STRING
                        });
                        filter2 = new Filter({
                            property: 'prop2',
                            label: 'ui_label2',
                            dataType: Filter.DATA_TYPE_NUMBER
                        });

                        filter3 = new Filter({
                            property: 'prop3',
                            label: 'ui_label3',
                            dataType: Filter.DATA_TYPE_STRING
                        });

                        filter4 = new Filter({
                            property: 'prop4',
                            label: 'ui_label4',
                            dataType: Filter.DATA_TYPE_NUMBER
                        });

                        // Setup fake searchData.
                        searchData = new SearchData();
                        searchData.initializeFilters([filter1, filter2]);
                        searchData.filterValues[filter1.property].value = 'Yo Adrian!';
                        searchData.filterValues[filter2.property].value = 43;

                        // Setup the scope to compile with.
                        $scope.id = 'filterPanelId';
                        $scope.title = 'Hi mom';
                        $scope.displayed = false;
                        $scope.filterGroups = [[filter1, filter2]];
                        $scope.searchData = searchData;
                        $scope.search = jasmine.createSpy();

                        // Mock the filterTemplateService.
                        spyOn(filterTemplateService, 'getFilterTemplate').and.callFake(function (filter, id) {
                            if (filter.dataType === Filter.DATA_TYPE_NUMBER) {
                                return '<input id="' + id + '" type="number" ng-model="ngModel.value" />';
                            } else {
                                return '<input id="' + id + '" type="text" ng-model="ngModel.value" />';
                            }
                        });

                        // Create an element to test with.
                        element = createElement(elementDefinition);
                    }));

                    afterEach(function () {
                        if (element) {
                            angular.element(element).remove();
                        }
                    });

                    describe('collapse', function () {
                        it('starts collapsed if spDisplayed is false', function () {
                            // Needing for animation to complete, which will update classes
                            $timeout.flush();
                            expect(element.hasClass('in')).toEqual(false);
                        });

                        it('starts expanded if spDisplayed is true', function () {
                            var newElement;
                            $scope.displayed = true;
                            newElement = createElement(elementDefinition);
                            // Needing for animation to complete, which will update classes
                            $timeout.flush();
                            // After displayed, the element does have in class.
                            expect(newElement.hasClass('in')).toEqual(true);
                        });

                        it('toggles collapse state when spDisplayed changes', function () {
                            $scope.displayed = true;
                            $scope.$apply();

                            // The element has the collapsing class while transitioning to expanded.
                            expect(element.hasClass('collapsing')).toEqual(true);
                        });
                    });

                    describe('title', function () {
                        it('is displayed if there is one', function () {
                            var titleEl = element.find('h5');
                            expect(titleEl.text()).toEqual($scope.title);
                        });

                        it('is not displayed if there is not one', function () {
                            var newElement, titleEl;
                            delete $scope.title;

                            newElement = createElement(elementDefinition);
                            titleEl = element.find('h5');
                            expect(titleEl.length).toEqual(0);
                        });
                    });

                    describe('spFilterPanelHeading', function () {
                        var elementWithHeading,
                            elementDefinitionWithHeading = '<sp-filter-panel id="id" sp-displayed="displayed" ' + '                 sp-filters="filters" sp-search-data="searchData" ' + '                 sp-apply-func="search()" >' + '  <sp-filter-panel-heading><button class="titleButton">head</button></sp-filter-panel-heading>' + '</sp-filter-panel>',
                            elementDefinitionNoHeading = '<sp-filter-panel id="id" sp-title="title" sp-displayed="displayed" ' + '                 sp-filters="filters" sp-search-data="searchData" ' + '                 sp-apply-func="search()" >' + '</sp-filter-panel>',
                            elementNoHeading;

                        beforeEach(function () {
                            elementWithHeading = createElement(elementDefinitionWithHeading);
                            elementNoHeading = createElement(elementDefinitionNoHeading);
                        });

                        it('sp-filter-panel-heading element is placed in panel-heading element', function () {
                            var headingEl = elementWithHeading.find('.panel-heading');

                            // there should be the panel heading element
                            expect(headingEl.length).toEqual(1);

                            // button defined within sp-filter-panel-title element should exist
                            expect(angular.element(headingEl).find('button.titleButton').length).toEqual(1);
                        });

                        it('panel-heading element is removed without sp-filter-panel-heading element', function () {
                            var headingEl = elementNoHeading.find('.panel-heading');

                            // there should be no panel heading element
                            expect(headingEl.length).toEqual(0);
                        });
                    });

                    it('renders filter item IDs with indexes', function () {
                        var input = element.find('#idItem0');
                        expect(input.length).toEqual(1);
                        input = element.find('#idItem1');
                        expect(input.length).toEqual(1);
                    });

                    it('renders one clearfix div for every two filters', function () {
                        var element2,
                            clearfixdiv = element.find('div.clearfix');

                        expect(clearfixdiv.length).toEqual(1);

                        $scope.filterGroups = [[filter1, filter2, filter3, filter4]];

                        element2 = createElement(elementDefinition);
                        clearfixdiv = element2.find('div.clearfix');
                        expect(clearfixdiv.length).toEqual(2);
                    });

                    describe('filter input field', function () {
                        it('is initialized with data from searchData', function () {
                            var input = element.find('#idItem0');
                            expect(input.val()).toEqual('Yo Adrian!');
                            input = element.find('#idItem1');
                            expect(input.val()).toEqual('43');
                        });

                        it('updates searchData when value is changed', function () {
                            var input = element.find('#idItem0'),
                                newString = 'I will break you';
                            input.val(newString);
                            input.trigger('input');
                            expect(searchData.filterValues.prop.value).toEqual(newString);

                            input = element.find('#idItem1');
                            input.val('7');
                            input.trigger('input');
                            expect(searchData.filterValues.prop2.value).toEqual(7);
                        });
                    });

                    function getBtn(btnSelector) {
                        var btn = element.find(btnSelector);
                        expect(btn.length).toEqual(1);
                        return btn;
                    }

                    function clickBtn(btnSelector) {
                        var btn = getBtn(btnSelector);
                        btn.click();
                        btn.trigger('click');
                    }

                    function testFilterBtnEnabled(hasFilterValues, expectDisabled, btnId) {
                        var btn;
                        searchData.hasFilterValues = jasmine.createSpy().and.returnValue(hasFilterValues);
                        $scope.$apply();
                        btn = getBtn(btnId);
                        expect(btn.hasClass('disabled')).toEqual(expectDisabled);
                    }

                    function testApplyFuncCalled(btnId) {
                        searchData.clearFilterValues = jasmine.createSpy().and.returnValue(true);
                        $scope.$apply();
                        clickBtn(btnId);
                        expect($scope.search).toHaveBeenCalled();
                    }

                    describe('clear button', function () {
                        it('is enabled if there are filter values', function () {
                            testFilterBtnEnabled(true, false, '#idClearBtn');
                        });

                        it('clears filter values when clicked', function () {
                            searchData.clearFilterValues = jasmine.createSpy();
                            clickBtn('#idClearBtn');
                            expect(searchData.clearFilterValues).toHaveBeenCalled();
                        });

                        it('clears added additional filters when clicked', function () {
                            spyOn(searchData, 'popAllAdditionalFiltersFromGroups');
                            clickBtn('#idClearBtn');
                            expect(searchData.popAllAdditionalFiltersFromGroups).toHaveBeenCalled();
                        });

                        it('calls spApplyFunc when clicked', function () {
                            testApplyFuncCalled('#idClearBtn');
                        });
                    });

                    describe('apply button', function () {
                        it('calls apply function when clicked', function () {
                            testApplyFuncCalled('#idApplyBtn');
                        });

                        it('is disabled if there are no filter values', function () {
                            testFilterBtnEnabled(false, true, '#idApplyBtn');
                        });

                        it('is enabled when there are filter values', function () {
                            testFilterBtnEnabled(true, false, '#idApplyBtn');
                        });
                    });

                    describe('additional filters', function () {
                        function clickAddFilter(element, index) {
                            var foundLinkElement = element.find('.sp-additional-filters .sp-dropdown-group a'),
                                linkElement = foundLinkElement[index];
                            angular.element(linkElement).click();
                            $scope.$apply();
                        }

                        function clickRemoveFilter(element, index) {
                            var foundRemoveButton = element.find('.sp-additional-filter-remove-btn'),
                                removeButton = foundRemoveButton[index];
                            angular.element(removeButton).click();
                            $scope.$apply();
                        }

                        var additionalFiltersTemplate = '<sp-filter-panel id="id" sp-title="title" sp-displayed="displayed"\n                                 sp-search-data="additionalSearchData" sp-apply-func="search()" />',
                            additionalFilter = undefined,
                            additionalSearchData = undefined;

                        beforeEach(function () {
                            additionalFilter = new Filter({
                                property: 'additionalFilterProp',
                                additional: true,
                                attributes: {
                                    category: {
                                        label: 'category 1',
                                        index: 0
                                    }
                                }
                            });

                            additionalSearchData = new SearchData();
                            $scope.additionalSearchData = additionalSearchData;
                        });

                        it('renders dropdown if additional filters are defined', function () {
                            additionalSearchData.initializeFilters([filter1, filter2, additionalFilter]);
                            element = createElement(additionalFiltersTemplate);
                            expect(element.find('.sp-additional-filters').length).toEqual(1);
                        });

                        it('does not render dropdown if no additional filters are defined', function () {
                            additionalSearchData.initializeFilters([filter1, filter2]);
                            element = createElement(additionalFiltersTemplate);
                            expect(element.find('.sp-additional-filters').length).toEqual(0);
                        });

                        it('renders dropdown in own row if it does not fit with other filters', function () {
                            var filter1 = new Filter({
                                property: 'addProp1',
                                additional: true
                            }),
                                filter2 = new Filter({
                                property: 'addProp2',
                                additional: true
                            }),
                                filter3 = new Filter({
                                property: 'addProp3',
                                additional: true
                            }),
                                filter4 = new Filter({
                                property: 'addProp4',
                                additional: true
                            }),
                                filter5 = new Filter({
                                property: 'addProp5',
                                additional: true
                            });

                            additionalSearchData.initializeFilters([filter1, filter2, filter3, filter4, filter5]);

                            // Add 4 filters to fill a group
                            additionalSearchData.pushAdditionalFilterToGroups(filter1);
                            additionalSearchData.pushAdditionalFilterToGroups(filter2);
                            additionalSearchData.pushAdditionalFilterToGroups(filter3);
                            additionalSearchData.pushAdditionalFilterToGroups(filter4);

                            element = createElement(additionalFiltersTemplate);

                            // Find the dropdown and its parent, then verify the parent is not holding any filters
                            var dropdownElement = element.find('.sp-additional-filters'),
                                parentRow = dropdownElement.parent();
                            expect(parentRow.find('.sp-additional-filter').length).toEqual(0);
                        });

                        it('renders dropown with other filters if it fits', function () {
                            var filter1 = new Filter({
                                property: 'addProp1',
                                additional: true
                            }),
                                filter2 = new Filter({
                                property: 'addProp2',
                                additional: true
                            }),
                                filter3 = new Filter({
                                property: 'addProp3',
                                additional: true
                            }),
                                filter4 = new Filter({
                                property: 'addProp4',
                                additional: true
                            });

                            additionalSearchData.initializeFilters([filter1, filter2, filter3, filter4]);
                            // Add 3 filters
                            additionalSearchData.pushAdditionalFilterToGroups(filter1);
                            additionalSearchData.pushAdditionalFilterToGroups(filter2);
                            additionalSearchData.pushAdditionalFilterToGroups(filter3);
                            element = createElement(additionalFiltersTemplate);

                            // Find the dropdown and its parent, then verify the parent also is holding the filters
                            var dropdownElement = element.find('.sp-additional-filters'),
                                parentRow = dropdownElement.parent();
                            expect(parentRow.find('.sp-additional-filter').length).toEqual(3);
                        });

                        it('calls through to search data to push additional filter to groups when clicked', function () {
                            additionalSearchData.initializeFilters([filter1, filter2, additionalFilter]);
                            element = createElement(additionalFiltersTemplate);
                            $scope.$apply();
                            spyOn(additionalSearchData, 'pushAdditionalFilterToGroups').and.callThrough();
                            clickAddFilter(element, 0);
                            // check if the additional filter was added with the remove button
                            expect(additionalSearchData.pushAdditionalFilterToGroups).toHaveBeenCalledWith(additionalFilter);
                            var additionalFiltersRemoveBtn = element.find('.sp-additional-filter-remove-btn');
                            expect(additionalFiltersRemoveBtn.length).toBe(1);
                        });

                        it('calls through to search data to remove filter when remove button is clicked', function () {
                            var filters = [filter1, filter2, filter3, filter4, new Filter({
                                property: 'addProp1',
                                additional: true
                            }), new Filter({
                                property: 'addProp2',
                                additional: true
                            }), new Filter({
                                property: 'addProp3',
                                additional: true
                            }), new Filter({
                                property: 'addProp4',
                                additional: true
                            }), new Filter({
                                property: 'addProp5',
                                additional: true
                            })];
                            additionalSearchData.initializeFilters(filters);
                            spyOn(additionalSearchData, 'popAdditionalFilterFromGroups').and.callThrough();
                            element = createElement(additionalFiltersTemplate);
                            $scope.$apply();
                            // no additional filters added yet
                            var additionalFiltersRemoveBtn = element.find('.sp-additional-filter-remove-btn');
                            expect(additionalFiltersRemoveBtn.length).toBe(0);
                            // Add 5 filters
                            clickAddFilter(element, 0);
                            clickAddFilter(element, 0);
                            clickAddFilter(element, 0);
                            clickAddFilter(element, 0);
                            clickAddFilter(element, 0);

                            // check if 5 additional filters added with the remove button
                            additionalFiltersRemoveBtn = element.find('.sp-additional-filter-remove-btn');
                            expect(additionalFiltersRemoveBtn.length).toBe(5);

                            // Remove the first one
                            clickRemoveFilter(element, 0);

                            expect(additionalSearchData.popAdditionalFilterFromGroups).toHaveBeenCalledWith(filters[4]);

                            // Filter should have moved back to additional filters
                            additionalFiltersRemoveBtn = element.find('.sp-additional-filter-remove-btn');
                            expect(additionalFiltersRemoveBtn.length).toBe(4);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvRmlsdGVyUGFuZWxEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsOEJBQThCLHNCQUFzQiw0Q0FBNEMsVUFBVSxTQUFTO0lBQS9KOztJQUdJLElBQUksY0FBYztJQUNsQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxzQ0FBc0M7UUFDbkQsU0FBUyxZQUFZOzs7Ozs7WUFDN0IsU0FBUyxJQUFJLFlBQVc7Z0JBQ3BCLElBQUksVUFBVTs7Z0JBRWQsV0FBVyxPQUFPLGNBQWM7OztnQkFHaEMsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxRQUFRLHdCQUF3QixVQUFTLGFBQWE7d0JBQzNELE9BQU87NEJBQ0gsWUFBWSxZQUFZLGlCQUFpQixPQUFPO2dDQUM1QyxPQUFPO2dDQUNQLFNBQVM7Ozs7Ozs7OztnQkFTekIsV0FBVyxPQUFPLFVBQVMsWUFBWSxjQUFjLG1CQUFtQjtvQkFDcEUsV0FBVztvQkFDWCxTQUFTLGFBQWE7OztvQkFHdEIsa0JBQWtCLGlCQUFpQjt3QkFDL0IsdUJBQXVCLFVBQVMsTUFBTTs0QkFDbEMsT0FBTyxnQkFBZ0IsS0FBSzs7d0JBRWhDLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsbUJBQW1COzs7O2dCQUkzQixTQUFTLGNBQWMsbUJBQW1CO29CQUN0QyxJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsNEJBQTRCLFlBQVc7b0JBQzVDLElBQUksb0JBQW9CO3dCQUNwQjt3QkFDQTt3QkFDQTs7b0JBRUosV0FBVyxPQUFPLFVBQVMseUJB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RCxVQUFVLGNBQWM7NEJBQ3hCLE9BQU87NEJBQ1AsTUFBTSxzQkFBc0IsZ0NBQWdDLElBQUk7NEJBQ2hFLGVBQWUsU0FBUzs7NEJBRXhCLE9BQU8scUJBQXFCLDhCQUE4QixxQkFBcUI7NEJBQy9FLElBQUksNkJBQTZCLFFBQVEsS0FBSzs0QkFDOUMsT0FBTywyQkFBMkIsUUFBUSxLQUFLOzs7d0JBR25ELEdBQUcsK0VBQStFLFlBQU07NEJBQ3BGLElBQUksVUFBVSxDQUNWLFNBQ0EsU0FDQSxTQUNBLFNBQ0EsSUFBSSxPQUFPO2dDQUNQLFVBQVU7Z0NBQ1YsWUFBWTtnQ0FDWixJQUFJLE9BQU87Z0NBQ1gsVUFBVTtnQ0FDVixZQUFZO2dDQUNaLElBQUksT0FBTztnQ0FDWCxVQUFVO2dDQUNWLFlBQVk7Z0NBQ1osSUFBSSxPQUFPO2dDQUNYLFVBQVU7Z0NBQ1YsWUFBWTtnQ0FDWixJQUFJLE9BQU87Z0NBQ1gsVUFBVTtnQ0FDVixZQUFZOzs0QkFFcEIscUJBQXFCLGtCQUFrQjs0QkFDdkMsTUFBTSxzQkFBc0IsaUNBQWlDLElBQUk7NEJBQ2pFLFVBQVUsY0FBYzs0QkFDeEIsT0FBTzs7NEJBRVAsSUFBSSw2QkFBNkIsUUFBUSxLQUFLOzRCQUM5QyxPQUFPLDJCQUEyQixRQUFRLEtBQUs7OzRCQUUvQyxlQUFlLFNBQVM7NEJBQ3hCLGVBQWUsU0FBUzs0QkFDeEIsZUFBZSxTQUFTOzRCQUN4QixlQUFlLFNBQVM7NEJBQ3hCLGVBQWUsU0FBUzs7OzRCQUd4Qiw2QkFBNkIsUUFBUSxLQUFLOzRCQUMxQyxPQUFPLDJCQUEyQixRQUFRLEtBQUs7Ozs0QkFHL0Msa0JBQWtCLFNBQVM7OzRCQUUzQixPQUFPLHFCQUFxQiwrQkFBK0IscUJBQXFCLFFBQVE7Ozs0QkFHeEYsNkJBQTZCLFFBQVEsS0FBSzs0QkFDMUMsT0FBTywyQkFBMkIsUUFBUSxLQUFLOzs7Ozs7O0dBQTVEIiwiZmlsZSI6ImNvbW1vbi9zZWFyY2gvRmlsdGVyUGFuZWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgZmlsdGVyIHBhbmVsIGRpcmVjdGl2ZXMgLSBpbmNsdWRpbmcgdGhlIEZpbHRlclBhbmVsSXRlbURpcmVjdGl2ZSwgRmlsdGVyUGFuZWxEaXJlY3RpdmUsXHJcbiAqIGFuZCBzcEZpbHRlclBhbmVsVGl0bGUuXHJcbiAqL1xyXG5kZXNjcmliZSgnJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgJGNvbXBpbGUsICRzY29wZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzZWFyY2hNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvL0NyZWF0ZSBhIG1vY2sgQ29sdW1uU3VnZ2VzdFNlcnZpY2VcclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuZmFjdG9yeSgnY29sdW1uU3VnZ2VzdFNlcnZpY2UnLCBmdW5jdGlvbih0ZXN0U2VydmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZ2V0T2JqZWN0czogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHt9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIGRlcGVuZGVuY2llcyBhbmQgZGF0YSBuZWVkcyBieSBhbGwgdGVzdHMuXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXywgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayB0aGUgdHJhbnNsYXRlIHNlcnZpY2UgdG8gcmV0dXJuIHNvbWUgY2FubmVkIGRhdGEuXHJcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XHJcbiAgICAgICAgICAgICd1aV9hY2Nlc3NfZmlsdGVyX2J5JzogZnVuY3Rpb24oYXJncykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdGaWx0ZXIgQnk6ICcgKyBhcmdzWzFdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAndWlfbGFiZWwnOiAnWW8gbW9tbWEnLFxyXG4gICAgICAgICAgICAndWlfbGFiZWwyJzogJ1lvIGRhZGR5JyxcclxuICAgICAgICAgICAgJ3VpX2FjY2Vzc19jYW5jZWwnOiAnQ2FuY2VsJyxcclxuICAgICAgICAgICAgJ3VpX2FjY2Vzc19jbGVhcic6ICdDbGVhcicsXHJcbiAgICAgICAgICAgICd1aV9hY2Nlc3NfYXBwbHknOiAnQXBwbHknXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbikge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnRmlsdGVyUGFuZWxJdGVtRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1maWx0ZXItcGFuZWwtaXRlbSBzcC1pZD1cImlkXCIgc3AtZmlsdGVyPVwiZmlsdGVyXCIgbmctbW9kZWw9XCJ2YWx1ZVwiIC8+JyxcclxuICAgICAgICAgICAgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBmaWx0ZXIsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9maWx0ZXJUZW1wbGF0ZVNlcnZpY2VfLCBGaWx0ZXIpIHtcclxuICAgICAgICAgICAgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlID0gX2ZpbHRlclRlbXBsYXRlU2VydmljZV87XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBhIEZpbHRlciB0byBjb21waWxlIHdpdGguXHJcbiAgICAgICAgICAgIGZpbHRlciA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAndWlfbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IEZpbHRlci5EQVRBX1RZUEVfU1RSSU5HXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgdGhlIHNjb3BlIHRvIGNvbXBpbGUgd2l0aC5cclxuICAgICAgICAgICAgJHNjb3BlLmZpbHRlciA9IGZpbHRlcjtcclxuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vY2sgdGhlIGZpbHRlclRlbXBsYXRlU2VydmljZS5cclxuICAgICAgICAgICAgc3B5T24oZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLCAnZ2V0RmlsdGVyVGVtcGxhdGUnKS5cclxuICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZSgnPGlucHV0IGlkPVwiaWRJdGVtMFwiIHR5cGU9XCJ0ZXh0XCIgLz4nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2Rpc3BsYXlzIGFuIGkxOG4gbGFiZWwgdXNpbmcgdGhlIGZpbHRlciBsYWJlbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBlbGVtZW50LmZpbmQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsYWJlbC50ZXh0KCkpLnRvRXF1YWwoJ1lvIG1vbW1hJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpbmNsdWRlcyB0aGUgZmlsdGVyIHRlbXBsYXRlIGFmdGVyIHRoZSBsYWJlbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBlbGVtZW50LmZpbmQoJyNpZEl0ZW0wJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpbnB1dC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnRmlsdGVyUGFuZWxEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudERlZmluaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgJzxzcC1maWx0ZXItcGFuZWwgaWQ9XCJpZFwiIHNwLXRpdGxlPVwidGl0bGVcIiBzcC1kaXNwbGF5ZWQ9XCJkaXNwbGF5ZWRcIiAnICtcclxuICAgICAgICAgICAgICAgICcgICAgICAgICAgICAgICAgIHNwLWZpbHRlci1ncm91cHM9XCJmaWx0ZXJHcm91cHNcIiBzcC1zZWFyY2gtZGF0YT1cInNlYXJjaERhdGFcIiAnICtcclxuICAgICAgICAgICAgICAgICcgICAgICAgICAgICAgICAgIHNwLWFwcGx5LWZ1bmM9XCJzZWFyY2goKVwiIC8+JyxcclxuICAgICAgICAgICAgZmlsdGVyVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICAgICAgICBmaWx0ZXIxLFxyXG4gICAgICAgICAgICBmaWx0ZXIyLFxyXG4gICAgICAgICAgICBmaWx0ZXIzLFxyXG4gICAgICAgICAgICBmaWx0ZXI0LFxyXG4gICAgICAgICAgICBzZWFyY2hEYXRhLFxyXG4gICAgICAgICAgICBlbGVtZW50LFxyXG4gICAgICAgICAgICAkdGltZW91dCxcclxuICAgICAgICAgICAgRmlsdGVyLFxyXG4gICAgICAgICAgICBTZWFyY2hEYXRhO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZmlsdGVyVGVtcGxhdGVTZXJ2aWNlXywgX0ZpbHRlcl8sIF8kdGltZW91dF8sIF9TZWFyY2hEYXRhXykge1xyXG4gICAgICAgICAgICBmaWx0ZXJUZW1wbGF0ZVNlcnZpY2UgPSBfZmlsdGVyVGVtcGxhdGVTZXJ2aWNlXztcclxuICAgICAgICAgICAgRmlsdGVyID0gX0ZpbHRlcl87XHJcbiAgICAgICAgICAgIFNlYXJjaERhdGEgPSBfU2VhcmNoRGF0YV87XHJcbiAgICAgICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcclxuICAgICAgICAgICAgLy8gU2V0dXAgRmlsdGVycyB0byBjb21waWxlIHdpdGguXHJcbiAgICAgICAgICAgIGZpbHRlcjEgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcCcsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3VpX2xhYmVsJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX1NUUklOR1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZmlsdGVyMiA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMicsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3VpX2xhYmVsMicsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9OVU1CRVJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXIzID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ3Byb3AzJyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAndWlfbGFiZWwzJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBGaWx0ZXIuREFUQV9UWVBFX1NUUklOR1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZpbHRlcjQgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgIHByb3BlcnR5OiAncHJvcDQnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd1aV9sYWJlbDQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IEZpbHRlci5EQVRBX1RZUEVfTlVNQkVSXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgZmFrZSBzZWFyY2hEYXRhLlxyXG4gICAgICAgICAgICBzZWFyY2hEYXRhID0gbmV3IFNlYXJjaERhdGEoKTtcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5pbml0aWFsaXplRmlsdGVycyhbZmlsdGVyMSwgZmlsdGVyMl0pO1xyXG4gICAgICAgICAgICBzZWFyY2hEYXRhLmZpbHRlclZhbHVlc1tmaWx0ZXIxLnByb3BlcnR5XS52YWx1ZSA9ICdZbyBBZHJpYW4hJztcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXNbZmlsdGVyMi5wcm9wZXJ0eV0udmFsdWUgPSA0MztcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIHRoZSBzY29wZSB0byBjb21waWxlIHdpdGguXHJcbiAgICAgICAgICAgICRzY29wZS5pZCA9ICdmaWx0ZXJQYW5lbElkJztcclxuICAgICAgICAgICAgJHNjb3BlLnRpdGxlID0gJ0hpIG1vbSc7XHJcbiAgICAgICAgICAgICRzY29wZS5kaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmZpbHRlckdyb3VwcyA9IFsgW2ZpbHRlcjEsIGZpbHRlcjJdIF07XHJcbiAgICAgICAgICAgICRzY29wZS5zZWFyY2hEYXRhID0gc2VhcmNoRGF0YTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNb2NrIHRoZSBmaWx0ZXJUZW1wbGF0ZVNlcnZpY2UuXHJcbiAgICAgICAgICAgIHNweU9uKGZpbHRlclRlbXBsYXRlU2VydmljZSwgJ2dldEZpbHRlclRlbXBsYXRlJykuXHJcbiAgICAgICAgICAgICAgICBhbmQuY2FsbEZha2UoZnVuY3Rpb24oZmlsdGVyLCBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuZGF0YVR5cGUgPT09IEZpbHRlci5EQVRBX1RZUEVfTlVNQkVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGlucHV0IGlkPVwiJyArIGlkICsgJ1wiIHR5cGU9XCJudW1iZXJcIiBuZy1tb2RlbD1cIm5nTW9kZWwudmFsdWVcIiAvPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgaWQ9XCInICsgaWQgKyAnXCIgdHlwZT1cInRleHRcIiBuZy1tb2RlbD1cIm5nTW9kZWwudmFsdWVcIiAvPic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gZWxlbWVudCB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NvbGxhcHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdzdGFydHMgY29sbGFwc2VkIGlmIHNwRGlzcGxheWVkIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkaW5nIGZvciBhbmltYXRpb24gdG8gY29tcGxldGUsIHdoaWNoIHdpbGwgdXBkYXRlIGNsYXNzZXNcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygnaW4nKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3N0YXJ0cyBleHBhbmRlZCBpZiBzcERpc3BsYXllZCBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RWxlbWVudDtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8gTmVlZGluZyBmb3IgYW5pbWF0aW9uIHRvIGNvbXBsZXRlLCB3aGljaCB3aWxsIHVwZGF0ZSBjbGFzc2VzXHJcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgZGlzcGxheWVkLCB0aGUgZWxlbWVudCBkb2VzIGhhdmUgaW4gY2xhc3MuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QobmV3RWxlbWVudC5oYXNDbGFzcygnaW4nKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgndG9nZ2xlcyBjb2xsYXBzZSBzdGF0ZSB3aGVuIHNwRGlzcGxheWVkIGNoYW5nZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5kaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IGhhcyB0aGUgY29sbGFwc2luZyBjbGFzcyB3aGlsZSB0cmFuc2l0aW9uaW5nIHRvIGV4cGFuZGVkLlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuaGFzQ2xhc3MoJ2NvbGxhcHNpbmcnKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd0aXRsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgnaXMgZGlzcGxheWVkIGlmIHRoZXJlIGlzIG9uZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlRWwgPSBlbGVtZW50LmZpbmQoJ2g1Jyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodGl0bGVFbC50ZXh0KCkpLnRvRXF1YWwoJHNjb3BlLnRpdGxlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgbm90IGRpc3BsYXllZCBpZiB0aGVyZSBpcyBub3Qgb25lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RWxlbWVudCwgdGl0bGVFbDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUudGl0bGU7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGl0bGVFbCA9IGVsZW1lbnQuZmluZCgnaDUnKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh0aXRsZUVsLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdzcEZpbHRlclBhbmVsSGVhZGluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudFdpdGhIZWFkaW5nLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudERlZmluaXRpb25XaXRoSGVhZGluZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcC1maWx0ZXItcGFuZWwgaWQ9XCJpZFwiIHNwLWRpc3BsYXllZD1cImRpc3BsYXllZFwiICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgICAgICAgICAgICAgICAgIHNwLWZpbHRlcnM9XCJmaWx0ZXJzXCIgc3Atc2VhcmNoLWRhdGE9XCJzZWFyY2hEYXRhXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgc3AtYXBwbHktZnVuYz1cInNlYXJjaCgpXCIgPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgIDxzcC1maWx0ZXItcGFuZWwtaGVhZGluZz48YnV0dG9uIGNsYXNzPVwidGl0bGVCdXR0b25cIj5oZWFkPC9idXR0b24+PC9zcC1maWx0ZXItcGFuZWwtaGVhZGluZz4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9zcC1maWx0ZXItcGFuZWw+JyxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnREZWZpbml0aW9uTm9IZWFkaW5nID1cclxuICAgICAgICAgICAgICAgICAgICAnPHNwLWZpbHRlci1wYW5lbCBpZD1cImlkXCIgc3AtdGl0bGU9XCJ0aXRsZVwiIHNwLWRpc3BsYXllZD1cImRpc3BsYXllZFwiICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgICAgICAgICAgICAgICAgIHNwLWZpbHRlcnM9XCJmaWx0ZXJzXCIgc3Atc2VhcmNoLWRhdGE9XCJzZWFyY2hEYXRhXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgc3AtYXBwbHktZnVuYz1cInNlYXJjaCgpXCIgPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L3NwLWZpbHRlci1wYW5lbD4nLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudE5vSGVhZGluZztcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50V2l0aEhlYWRpbmcgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uV2l0aEhlYWRpbmcpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudE5vSGVhZGluZyA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb25Ob0hlYWRpbmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzcC1maWx0ZXItcGFuZWwtaGVhZGluZyBlbGVtZW50IGlzIHBsYWNlZCBpbiBwYW5lbC1oZWFkaW5nIGVsZW1lbnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoZWFkaW5nRWwgPSBlbGVtZW50V2l0aEhlYWRpbmcuZmluZCgnLnBhbmVsLWhlYWRpbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBzaG91bGQgYmUgdGhlIHBhbmVsIGhlYWRpbmcgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGhlYWRpbmdFbC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYnV0dG9uIGRlZmluZWQgd2l0aGluIHNwLWZpbHRlci1wYW5lbC10aXRsZSBlbGVtZW50IHNob3VsZCBleGlzdFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChoZWFkaW5nRWwpLmZpbmQoJ2J1dHRvbi50aXRsZUJ1dHRvbicpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncGFuZWwtaGVhZGluZyBlbGVtZW50IGlzIHJlbW92ZWQgd2l0aG91dCBzcC1maWx0ZXItcGFuZWwtaGVhZGluZyBlbGVtZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGVhZGluZ0VsID0gZWxlbWVudE5vSGVhZGluZy5maW5kKCcucGFuZWwtaGVhZGluZycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSBubyBwYW5lbCBoZWFkaW5nIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGV4cGVjdChoZWFkaW5nRWwubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbmRlcnMgZmlsdGVyIGl0ZW0gSURzIHdpdGggaW5kZXhlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBlbGVtZW50LmZpbmQoJyNpZEl0ZW0wJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpbnB1dC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGlucHV0ID0gZWxlbWVudC5maW5kKCcjaWRJdGVtMScpO1xyXG4gICAgICAgICAgICBleHBlY3QoaW5wdXQubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVuZGVycyBvbmUgY2xlYXJmaXggZGl2IGZvciBldmVyeSB0d28gZmlsdGVycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudDIsXHJcbiAgICAgICAgICAgICAgICBjbGVhcmZpeGRpdiA9IGVsZW1lbnQuZmluZCgnZGl2LmNsZWFyZml4Jyk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY2xlYXJmaXhkaXYubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmZpbHRlckdyb3VwcyA9IFsgW2ZpbHRlcjEsIGZpbHRlcjIsIGZpbHRlcjMsIGZpbHRlcjRdIF07XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50MiA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgICAgICBjbGVhcmZpeGRpdiA9IGVsZW1lbnQyLmZpbmQoJ2Rpdi5jbGVhcmZpeCcpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2xlYXJmaXhkaXYubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZmlsdGVyIGlucHV0IGZpZWxkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdpcyBpbml0aWFsaXplZCB3aXRoIGRhdGEgZnJvbSBzZWFyY2hEYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBlbGVtZW50LmZpbmQoJyNpZEl0ZW0wJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaW5wdXQudmFsKCkpLnRvRXF1YWwoJ1lvIEFkcmlhbiEnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gZWxlbWVudC5maW5kKCcjaWRJdGVtMScpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGlucHV0LnZhbCgpKS50b0VxdWFsKCc0MycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCd1cGRhdGVzIHNlYXJjaERhdGEgd2hlbiB2YWx1ZSBpcyBjaGFuZ2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBlbGVtZW50LmZpbmQoJyNpZEl0ZW0wJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RyaW5nID0gJ0kgd2lsbCBicmVhayB5b3UnO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsKG5ld1N0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC50cmlnZ2VyKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLnByb3AudmFsdWUpLnRvRXF1YWwobmV3U3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGVsZW1lbnQuZmluZCgnI2lkSXRlbTEnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgnNycpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudHJpZ2dlcignaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLmZpbHRlclZhbHVlcy5wcm9wMi52YWx1ZSkudG9FcXVhbCg3KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEJ0bihidG5TZWxlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gZWxlbWVudC5maW5kKGJ0blNlbGVjdG9yKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ0bi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidG47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGlja0J0bihidG5TZWxlY3Rvcikge1xyXG4gICAgICAgICAgICB2YXIgYnRuID0gZ2V0QnRuKGJ0blNlbGVjdG9yKTtcclxuICAgICAgICAgICAgYnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGJ0bi50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdEZpbHRlckJ0bkVuYWJsZWQoaGFzRmlsdGVyVmFsdWVzLCBleHBlY3REaXNhYmxlZCwgYnRuSWQpIHtcclxuICAgICAgICAgICAgdmFyIGJ0bjtcclxuICAgICAgICAgICAgc2VhcmNoRGF0YS5oYXNGaWx0ZXJWYWx1ZXMgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShoYXNGaWx0ZXJWYWx1ZXMpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGJ0biA9IGdldEJ0bihidG5JZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidG4uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpLnRvRXF1YWwoZXhwZWN0RGlzYWJsZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdEFwcGx5RnVuY0NhbGxlZChidG5JZCkge1xyXG4gICAgICAgICAgICBzZWFyY2hEYXRhLmNsZWFyRmlsdGVyVmFsdWVzID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgY2xpY2tCdG4oYnRuSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLnNlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NsZWFyIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiB0aGVyZSBhcmUgZmlsdGVyIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdEZpbHRlckJ0bkVuYWJsZWQodHJ1ZSwgZmFsc2UsICcjaWRDbGVhckJ0bicpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjbGVhcnMgZmlsdGVyIHZhbHVlcyB3aGVuIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEuY2xlYXJGaWx0ZXJWYWx1ZXMgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tCdG4oJyNpZENsZWFyQnRuJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5jbGVhckZpbHRlclZhbHVlcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjbGVhcnMgYWRkZWQgYWRkaXRpb25hbCBmaWx0ZXJzIHdoZW4gY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKHNlYXJjaERhdGEsICdwb3BBbGxBZGRpdGlvbmFsRmlsdGVyc0Zyb21Hcm91cHMnKTtcclxuICAgICAgICAgICAgICAgIGNsaWNrQnRuKCcjaWRDbGVhckJ0bicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEucG9wQWxsQWRkaXRpb25hbEZpbHRlcnNGcm9tR3JvdXBzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2NhbGxzIHNwQXBwbHlGdW5jIHdoZW4gY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdEFwcGx5RnVuY0NhbGxlZCgnI2lkQ2xlYXJCdG4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdhcHBseSBidXR0b24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ2NhbGxzIGFwcGx5IGZ1bmN0aW9uIHdoZW4gY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdEFwcGx5RnVuY0NhbGxlZCgnI2lkQXBwbHlCdG4nKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgZGlzYWJsZWQgaWYgdGhlcmUgYXJlIG5vIGZpbHRlciB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRlc3RGaWx0ZXJCdG5FbmFibGVkKGZhbHNlLCB0cnVlLCAnI2lkQXBwbHlCdG4nKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgZW5hYmxlZCB3aGVuIHRoZXJlIGFyZSBmaWx0ZXIgdmFsdWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RmlsdGVyQnRuRW5hYmxlZCh0cnVlLCBmYWxzZSwgJyNpZEFwcGx5QnRuJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnYWRkaXRpb25hbCBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGlja0FkZEZpbHRlcihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kTGlua0VsZW1lbnQgPSBlbGVtZW50LmZpbmQoJy5zcC1hZGRpdGlvbmFsLWZpbHRlcnMgLnNwLWRyb3Bkb3duLWdyb3VwIGEnKSxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rRWxlbWVudCA9IGZvdW5kTGlua0VsZW1lbnRbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGxpbmtFbGVtZW50KS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGlja1JlbW92ZUZpbHRlcihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kUmVtb3ZlQnV0dG9uID0gZWxlbWVudC5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXItcmVtb3ZlLWJ0bicpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJ1dHRvbiA9IGZvdW5kUmVtb3ZlQnV0dG9uW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChyZW1vdmVCdXR0b24pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsRmlsdGVyc1RlbXBsYXRlID0gYDxzcC1maWx0ZXItcGFuZWwgaWQ9XCJpZFwiIHNwLXRpdGxlPVwidGl0bGVcIiBzcC1kaXNwbGF5ZWQ9XCJkaXNwbGF5ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1zZWFyY2gtZGF0YT1cImFkZGl0aW9uYWxTZWFyY2hEYXRhXCIgc3AtYXBwbHktZnVuYz1cInNlYXJjaCgpXCIgLz5gLFxyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbEZpbHRlciwgYWRkaXRpb25hbFNlYXJjaERhdGE7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxGaWx0ZXIgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZGl0aW9uYWxGaWx0ZXJQcm9wJyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnY2F0ZWdvcnkgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEgPSBuZXcgU2VhcmNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFkZGl0aW9uYWxTZWFyY2hEYXRhID0gYWRkaXRpb25hbFNlYXJjaERhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JlbmRlcnMgZHJvcGRvd24gaWYgYWRkaXRpb25hbCBmaWx0ZXJzIGFyZSBkZWZpbmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMoW2ZpbHRlcjEsIGZpbHRlcjIsIGFkZGl0aW9uYWxGaWx0ZXJdKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGFkZGl0aW9uYWxGaWx0ZXJzVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLnNwLWFkZGl0aW9uYWwtZmlsdGVycycpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgcmVuZGVyIGRyb3Bkb3duIGlmIG5vIGFkZGl0aW9uYWwgZmlsdGVycyBhcmUgZGVmaW5lZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxTZWFyY2hEYXRhLmluaXRpYWxpemVGaWx0ZXJzKFtmaWx0ZXIxLCBmaWx0ZXIyXSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChhZGRpdGlvbmFsRmlsdGVyc1RlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5zcC1hZGRpdGlvbmFsLWZpbHRlcnMnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JlbmRlcnMgZHJvcGRvd24gaW4gb3duIHJvdyBpZiBpdCBkb2VzIG5vdCBmaXQgd2l0aCBvdGhlciBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjEgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZFByb3AxJyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSwgZmlsdGVyMiA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnYWRkUHJvcDInLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCBmaWx0ZXIzID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdhZGRQcm9wMycsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIGZpbHRlcjQgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZFByb3A0JyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSwgZmlsdGVyNSA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnYWRkUHJvcDUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxTZWFyY2hEYXRhLmluaXRpYWxpemVGaWx0ZXJzKFtmaWx0ZXIxLCBmaWx0ZXIyLCBmaWx0ZXIzLCBmaWx0ZXI0LCBmaWx0ZXI1XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIDQgZmlsdGVycyB0byBmaWxsIGEgZ3JvdXBcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxTZWFyY2hEYXRhLnB1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMoZmlsdGVyMSk7XHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsU2VhcmNoRGF0YS5wdXNoQWRkaXRpb25hbEZpbHRlclRvR3JvdXBzKGZpbHRlcjIpO1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEucHVzaEFkZGl0aW9uYWxGaWx0ZXJUb0dyb3VwcyhmaWx0ZXIzKTtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxTZWFyY2hEYXRhLnB1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMoZmlsdGVyNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoYWRkaXRpb25hbEZpbHRlcnNUZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgZHJvcGRvd24gYW5kIGl0cyBwYXJlbnQsIHRoZW4gdmVyaWZ5IHRoZSBwYXJlbnQgaXMgbm90IGhvbGRpbmcgYW55IGZpbHRlcnNcclxuICAgICAgICAgICAgICAgIGxldCBkcm9wZG93bkVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJy5zcC1hZGRpdGlvbmFsLWZpbHRlcnMnKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRSb3cgPSBkcm9wZG93bkVsZW1lbnQucGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocGFyZW50Um93LmZpbmQoJy5zcC1hZGRpdGlvbmFsLWZpbHRlcicpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVuZGVycyBkcm9wb3duIHdpdGggb3RoZXIgZmlsdGVycyBpZiBpdCBmaXRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcjEgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZFByb3AxJyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSwgZmlsdGVyMiA9IG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnYWRkUHJvcDInLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLCBmaWx0ZXIzID0gbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdhZGRQcm9wMycsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIGZpbHRlcjQgPSBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZFByb3A0JyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsU2VhcmNoRGF0YS5pbml0aWFsaXplRmlsdGVycyhbZmlsdGVyMSwgZmlsdGVyMiwgZmlsdGVyMywgZmlsdGVyNF0pO1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIDMgZmlsdGVyc1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEucHVzaEFkZGl0aW9uYWxGaWx0ZXJUb0dyb3VwcyhmaWx0ZXIxKTtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxTZWFyY2hEYXRhLnB1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMoZmlsdGVyMik7XHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsU2VhcmNoRGF0YS5wdXNoQWRkaXRpb25hbEZpbHRlclRvR3JvdXBzKGZpbHRlcjMpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoYWRkaXRpb25hbEZpbHRlcnNUZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgZHJvcGRvd24gYW5kIGl0cyBwYXJlbnQsIHRoZW4gdmVyaWZ5IHRoZSBwYXJlbnQgYWxzbyBpcyBob2xkaW5nIHRoZSBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICBsZXQgZHJvcGRvd25FbGVtZW50ID0gZWxlbWVudC5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXJzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Um93ID0gZHJvcGRvd25FbGVtZW50LnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBhcmVudFJvdy5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXInKS5sZW5ndGgpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gc2VhcmNoIGRhdGEgdG8gcHVzaCBhZGRpdGlvbmFsIGZpbHRlciB0byBncm91cHMgd2hlbiBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMoW2ZpbHRlcjEsIGZpbHRlcjIsIGFkZGl0aW9uYWxGaWx0ZXJdKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGFkZGl0aW9uYWxGaWx0ZXJzVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWRkaXRpb25hbFNlYXJjaERhdGEsICdwdXNoQWRkaXRpb25hbEZpbHRlclRvR3JvdXBzJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgICAgICBjbGlja0FkZEZpbHRlcihlbGVtZW50LCAwKTtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBhZGRpdGlvbmFsIGZpbHRlciB3YXMgYWRkZWQgd2l0aCB0aGUgcmVtb3ZlIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZGl0aW9uYWxTZWFyY2hEYXRhLnB1c2hBZGRpdGlvbmFsRmlsdGVyVG9Hcm91cHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGFkZGl0aW9uYWxGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuID0gZWxlbWVudC5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXItcmVtb3ZlLWJ0bicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuLmxlbmd0aCkudG9CZSgxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBzZWFyY2ggZGF0YSB0byByZW1vdmUgZmlsdGVyIHdoZW4gcmVtb3ZlIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyMSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIyLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjMsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyNCxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdhZGRQcm9wMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KSwgbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnYWRkUHJvcDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIG5ldyBGaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FkZFByb3AzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLCBuZXcgRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdhZGRQcm9wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KSwgbmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnYWRkUHJvcDUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRpdGlvbmFsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFNlYXJjaERhdGEuaW5pdGlhbGl6ZUZpbHRlcnMoZmlsdGVycyk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhZGRpdGlvbmFsU2VhcmNoRGF0YSwgJ3BvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChhZGRpdGlvbmFsRmlsdGVyc1RlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIC8vIG5vIGFkZGl0aW9uYWwgZmlsdGVycyBhZGRlZCB5ZXRcclxuICAgICAgICAgICAgICAgIGxldCBhZGRpdGlvbmFsRmlsdGVyc1JlbW92ZUJ0biA9IGVsZW1lbnQuZmluZCgnLnNwLWFkZGl0aW9uYWwtZmlsdGVyLXJlbW92ZS1idG4nKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhZGRpdGlvbmFsRmlsdGVyc1JlbW92ZUJ0bi5sZW5ndGgpLnRvQmUoMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgNSBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICBjbGlja0FkZEZpbHRlcihlbGVtZW50LCAwKTtcclxuICAgICAgICAgICAgICAgIGNsaWNrQWRkRmlsdGVyKGVsZW1lbnQsIDApO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tBZGRGaWx0ZXIoZWxlbWVudCwgMCk7XHJcbiAgICAgICAgICAgICAgICBjbGlja0FkZEZpbHRlcihlbGVtZW50LCAwKTtcclxuICAgICAgICAgICAgICAgIGNsaWNrQWRkRmlsdGVyKGVsZW1lbnQsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIDUgYWRkaXRpb25hbCBmaWx0ZXJzIGFkZGVkIHdpdGggdGhlIHJlbW92ZSBidXR0b25cclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuID0gZWxlbWVudC5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXItcmVtb3ZlLWJ0bicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuLmxlbmd0aCkudG9CZSg1KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9uZVxyXG4gICAgICAgICAgICAgICAgY2xpY2tSZW1vdmVGaWx0ZXIoZWxlbWVudCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZGl0aW9uYWxTZWFyY2hEYXRhLnBvcEFkZGl0aW9uYWxGaWx0ZXJGcm9tR3JvdXBzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmaWx0ZXJzWzRdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgc2hvdWxkIGhhdmUgbW92ZWQgYmFjayB0byBhZGRpdGlvbmFsIGZpbHRlcnNcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuID0gZWxlbWVudC5maW5kKCcuc3AtYWRkaXRpb25hbC1maWx0ZXItcmVtb3ZlLWJ0bicpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZGl0aW9uYWxGaWx0ZXJzUmVtb3ZlQnRuLmxlbmd0aCkudG9CZSg0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
