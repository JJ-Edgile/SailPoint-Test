System.register(['test/js/TestInitializer', 'common/dataview/table/TableModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var tableModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewTableTableModule) {
            tableModule = _commonDataviewTableTableModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spDataTable', function () {

                var elementDefinition = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-column-config-key="someColumns" ' + 'sp-search-data="searchData" ' + 'sp-paging-data="pagingData" ' + 'sp-refresh-trigger="refreshTrigger" ' + 'sp-checkbox-multiselect="checkbox" />',
                    someColumnConfigKey = 'someColumns',
                    bandConfig = {
                    colorBands: [{
                        color: 'low',
                        lower: '0',
                        upper: '250'
                    }, {
                        color: 'medium_low',
                        lower: '251',
                        upper: '500'
                    }, {
                        color: 'medium_high',
                        lower: '501',
                        upper: '750'
                    }, {
                        color: 'high',
                        lower: '751',
                        upper: '1000'
                    }]
                },
                    $scope,
                    $q,
                    $compile,
                    $timeout,
                    testService,
                    columnConfigs,
                    items,
                    SortOrder,
                    SearchData,
                    DataRefreshTrigger,
                    DataTableDirectiveConfig,
                    configService,
                    CheckboxMultiSelect,
                    filter1,
                    filter2,
                    filter3,
                    element,
                    groups,
                    columnConfigService;

                function createElement() {
                    var defintion = arguments.length <= 0 || arguments[0] === undefined ? elementDefinition : arguments[0];

                    element = angular.element(defintion);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(testModule, tableModule, 'ngAnimateMock'));
                beforeEach(module(function ($provide) {
                    $provide.constant('SP_BAND_CONFIG', bandConfig);
                }));

                /* jshint maxparams: 14 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _$timeout_, _testService_, _SortOrder_, ColumnConfig, _configService_, _SearchData_, _DataRefreshTrigger_, _DataTableDirectiveConfig_, _CheckboxMultiSelect_, Filter, _columnConfigService_) {
                    $scope = _$rootScope_;
                    $q = _$q_;
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    testService = _testService_;
                    SortOrder = _SortOrder_;
                    SearchData = _SearchData_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    DataTableDirectiveConfig = _DataTableDirectiveConfig_;
                    configService = _configService_;
                    CheckboxMultiSelect = _CheckboxMultiSelect_;
                    columnConfigService = _columnConfigService_;

                    columnConfigs = [new ColumnConfig({
                        dataIndex: 'name',
                        sortable: true,
                        width: 250
                    }), new ColumnConfig({
                        dataIndex: 'someValue',
                        sortable: false,
                        percentWidth: 25
                    }), new ColumnConfig({
                        dataIndex: 'extra',
                        fieldOnly: true
                    }), new ColumnConfig({
                        dataIndex: 'status',
                        fieldOnly: true
                    }), new ColumnConfig({
                        dataIndex: 'risk',
                        renderer: 'risk',
                        sortable: true,
                        hideable: true
                    })];

                    configService.getColumnConfigEntries = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            someColumns: columnConfigs
                        }
                    }, {});

                    items = [{
                        name: 'itemOne',
                        someValue: 7,
                        extra: false,
                        status: 'Open',
                        risk: 100
                    }, {
                        name: 'itemTwo',
                        someValue: 22,
                        extra: true,
                        status: 'Closed',
                        risk: 200
                    }, {
                        name: 'itemThree',
                        someValue: 23,
                        extra: true,
                        status: 'Closed',
                        risk: 200
                    }];

                    groups = [{
                        properties: {
                            status: 'Open'
                        },
                        count: 1
                    }, {
                        properties: {
                            status: 'Closed'
                        },
                        count: 2
                    }];

                    $scope.itemsFunc = testService.createPromiseSpy(false, {
                        data: {
                            objects: items,
                            count: 3,
                            metaData: {
                                groups: groups
                            }
                        }
                    });

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

                    $scope.filters = [filter1, filter2, filter3];

                    $scope.searchData = new SearchData();
                    $scope.searchData.filterValues = {
                        something: 'filtered'
                    };
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                it('calls spItemFunc to get items', function () {
                    createElement();
                    expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, $scope.searchData.filterValues, undefined);
                });

                it('uses the passed in PagingData if supplied', inject(function (PagingData) {
                    $scope.pagingData = new PagingData(25);
                    createElement();
                    expect(element.find('#page-size-dropdown-toggle').text().trim()).toContain('25');
                }));

                it('shows no results message when there are no items', function () {
                    var msg, table;

                    $scope.itemsFunc = testService.createPromiseSpy(false, {
                        data: {
                            objects: [],
                            count: 0
                        }
                    });

                    createElement();
                    $timeout.flush();

                    msg = angular.element(element).find('div.no-results-panel p.h3');
                    expect(msg.length).toBe(1);

                    table = angular.element(element).find('table');
                    expect(table.length).toBe(0);

                    // reset scope.itemsFunc
                    $scope.itemsFunc = testService.createPromiseSpy(false, {
                        data: {
                            objects: items,
                            count: 3
                        }
                    });
                });

                it('shows displayable columns', function () {
                    var columns = undefined;
                    createElement();
                    columns = angular.element(element).find('thead th');
                    expect(columns.length).toBe(3);
                    expect(columns[0].innerText.trim()).toContain('name');
                    expect(columns[1].innerText.trim()).toContain('someValue');
                    expect(columns[2].innerText.trim()).toContain('risk');
                });

                describe('column width', function () {
                    function getHeaderWidthStyle(colIdx) {
                        createElement();
                        var columns = angular.element(element).find('thead th'),
                            col = columns[colIdx];
                        return col.style.width;
                    }

                    it('is in pixels when the column config uses width', function () {
                        expect(getHeaderWidthStyle(0)).toEqual('250px');
                    });

                    it('is in percentage when the column config uses percent width', function () {
                        expect(getHeaderWidthStyle(1)).toEqual('25%');
                    });

                    it('is not specified when the column config does not have a width', function () {
                        expect(getHeaderWidthStyle(2)).toEqual('');
                    });

                    it('is not specified when last displayed column', function () {
                        columnConfigs[4].percentWidth = 10;
                        expect(getHeaderWidthStyle(2)).toEqual('');
                    });
                });

                describe('sorting', function () {
                    var columns, srOnlyDiv;

                    beforeEach(function () {
                        createElement();
                        columns = angular.element(element).find('thead th');
                        srOnlyDiv = angular.element(element).find('div[role=alert]');
                    });

                    it('sorts when clicking sortable headers', function () {
                        $scope.itemsFunc.calls.reset();
                        angular.element(columns[2]).click();
                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, $scope.searchData.filterValues, new SortOrder('risk', true));

                        $scope.itemsFunc.calls.reset();
                        angular.element(columns[2]).click();
                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, $scope.searchData.filterValues, new SortOrder('risk', false));
                    });

                    it('does not sort when click unsortable header', function () {
                        $scope.itemsFunc.calls.reset();
                        angular.element(columns[1]).click();
                        expect($scope.itemsFunc).not.toHaveBeenCalled();
                    });

                    it('updates the 508 text appropriately', function () {
                        $scope.itemsFunc.calls.reset();
                        angular.element(columns[2]).click();
                        expect(srOnlyDiv.text()).toBe('ui_data_table_sorted_ascending_sr');

                        angular.element(columns[2]).click();
                        expect(srOnlyDiv.text()).toBe('ui_data_table_sorted_descending_sr');
                    });
                });

                describe('paging', function () {
                    describe('page size', function () {
                        it('calls spItemsFunc when changing page size', function () {
                            createElement();
                            var dropToggle = element.find('#page-size-dropdown-toggle'),
                                menuItems = undefined;

                            // Pop the menu up.
                            dropToggle.click();
                            menuItems = dropToggle.next().find('li a');

                            // Expect 3 sizes - 10, 25, 50.
                            expect(menuItems.length).toEqual(3);

                            // Click the '25' item.
                            $scope.itemsFunc.calls.reset();
                            angular.element(menuItems[1]).click();
                            expect($scope.itemsFunc).toHaveBeenCalledWith(0, 25, $scope.searchData.filterValues, undefined);
                        });
                    });

                    describe('pagination', function () {
                        it('is not displayed if there is one page', function () {
                            createElement();
                            var pagination = element.find('.pagination');
                            expect(pagination.length).toEqual(0);
                        });
                    });
                });

                describe('checkbox', function () {
                    var checkbox = undefined;

                    beforeEach(function () {
                        checkbox = {
                            attach: jasmine.createSpy('attach')
                        };
                    });

                    function hasCheckbox(element) {
                        var checks = element.find('.checkbox-col');
                        return checks.length > 0;
                    }

                    function getCheckboxHeader(element) {
                        var header = element.find('thead .checkbox-col button.fa-square-o');
                        expect(header.length).toEqual(1);
                        return angular.element(header[0]);
                    }

                    function isCheckboxMenuDisplayed(element) {
                        var menu = element.find('thead th.checkbox-col span');
                        expect(menu.length).toEqual(2);
                        return angular.element(menu[0]).hasClass('open');
                    }

                    it('is attached to controller', function () {
                        $scope.checkbox = checkbox;
                        createElement();
                        expect(checkbox.attach).toHaveBeenCalled();
                    });

                    it('is attached to controller when set after construction', function () {
                        createElement();
                        expect(checkbox.attach).not.toHaveBeenCalled();
                        $scope.checkbox = checkbox;
                        $scope.$digest();
                        expect(checkbox.attach).toHaveBeenCalled();
                    });

                    it('is displayed when provided', function () {
                        $scope.checkbox = checkbox;
                        createElement();
                        expect(hasCheckbox(element)).toEqual(true);
                    });

                    it('is hidden when not provided', function () {
                        createElement();
                        expect(hasCheckbox(element)).toEqual(false);
                    });

                    it('allows toggling the menu', function () {
                        $scope.checkbox = checkbox;
                        createElement();
                        var checkboxHeader = getCheckboxHeader(element);
                        expect(isCheckboxMenuDisplayed(element)).toEqual(false);
                        checkboxHeader.click();
                        expect(isCheckboxMenuDisplayed(element)).toEqual(true);
                    });
                });

                it('refresh trigger calls itemsFunc when refreshing', function () {
                    var trigger = new DataRefreshTrigger();
                    $scope.refreshTrigger = trigger;
                    createElement();

                    $scope.itemsFunc.calls.reset();
                    trigger.refresh();
                    expect($scope.itemsFunc).toHaveBeenCalled();
                });

                describe('sectionHeader', function () {
                    var checkbox = {
                        attach: jasmine.createSpy('attach'),
                        toggleGroup: jasmine.createSpy('toggleGroup')
                    },
                        ResultGroup = undefined;

                    beforeEach(inject(function (_ResultGroup_) {
                        $scope.checkbox = undefined;
                        ResultGroup = _ResultGroup_;
                    }));

                    function buildElementWithSectionHeader() {
                        return '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-column-config-key="someColumns" ' + 'sp-section-header="status" ' + 'sp-checkbox-multiselect="checkbox"' + '/>';
                    }

                    it('should create section headers with correct text', function () {
                        createElement(buildElementWithSectionHeader());
                        var sectionHeaders = element.find('tr.section-header-row');
                        expect(sectionHeaders.length).toEqual(2);

                        expect(angular.element(sectionHeaders[0]).text().trim()).toEqual(items[0].status);
                        expect(angular.element(sectionHeaders[1]).text().trim()).toEqual(items[1].status);
                    });

                    it('should not show section header if spSectionHeader is undefined', function () {
                        createElement();
                        var sectionHeaders = element.find('tr.section-header-row');
                        expect(sectionHeaders.length).toEqual(0);
                    });

                    it('should show section header in correct rows', function () {
                        createElement(buildElementWithSectionHeader());
                        var rows = element.find('tr');
                        var sectionHeader = angular.element(rows[1]);
                        expect(sectionHeader.hasClass('section-header-row')).toEqual(true);

                        var sectionHeader2 = angular.element(rows[3]);
                        expect(sectionHeader2.hasClass('section-header-row')).toEqual(true);
                    });

                    it('should show checkbox', function () {
                        $scope.checkbox = checkbox;
                        createElement(buildElementWithSectionHeader());
                        var rows = element.find('tr.section-header-row'),
                            sectionHeaderCheckbox = angular.element(rows[0]).find('.checkbox-col.bg-section-header');
                        expect(sectionHeaderCheckbox.length).toEqual(1);
                    });

                    it('should toggle group selection when clicked', function () {
                        $scope.checkbox = checkbox;
                        createElement(buildElementWithSectionHeader());
                        var rows = element.find('tr.section-header-row'),
                            sectionHeaderCheckbox = angular.element(rows[0]).find('.checkbox-col.bg-section-header'),
                            button = angular.element(sectionHeaderCheckbox[0]).find('button.checkbox-btn');
                        angular.element(button).click();
                        expect(checkbox.toggleGroup).toHaveBeenCalled();
                        var args = checkbox.toggleGroup.calls.mostRecent().args;
                        expect(args[0]).toEqual(new ResultGroup(groups[0]));
                    });

                    it('calls the columnConfigService to get the sectionHeader value', function () {
                        spyOn(columnConfigService, 'getFilteredValue').and.returnValue('filterValue');
                        $scope.checkbox = checkbox;
                        var element = createElement(buildElementWithSectionHeader());
                        expect(columnConfigService.getFilteredValue).toHaveBeenCalled();
                        expect(element.find('span').hasClass('sr-only')).toEqual(true);
                        expect(element.find('span').text().trim()).toContain('filterValue');
                    });
                });

                describe('row selection', function () {
                    var rowSelectionFuncName = 'rowSelectionFunc';

                    function buildElementString(rowSelectionFunc) {
                        return '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-column-config-key="someColumns" ' + 'sp-checkbox-multiselect="multiSelect" ' + (rowSelectionFunc ? 'sp-on-row-selection-func="' + rowSelectionFunc + '(item)" ' : '') + '/>';
                    }

                    beforeEach(function () {
                        $scope.multiselect = {};
                        spyOn(columnConfigs[4], 'isFixedRight').and.returnValue(true);
                    });

                    it('should call row selection func when normal cell is selected', function () {
                        $scope[rowSelectionFuncName] = jasmine.createSpy();
                        createElement(buildElementString(rowSelectionFuncName));
                        element.find('tr.normal-row > td').click();
                        expect($scope[rowSelectionFuncName]).toHaveBeenCalledWith(items[0]);
                    });

                    it('should call row selection func when normal cell is selected', function () {
                        $scope[rowSelectionFuncName] = jasmine.createSpy();
                        createElement(buildElementString(rowSelectionFuncName));
                        element.find('tr.normal-row > td.normal-col').click();
                        expect($scope[rowSelectionFuncName]).toHaveBeenCalled();
                    });

                    it('should not call row selection func when checkbox cell is selected', function () {
                        $scope[rowSelectionFuncName] = jasmine.createSpy();
                        createElement(buildElementString(rowSelectionFuncName));
                        element.find('tr.normal-row > td.checkbox-col').click();
                        expect($scope[rowSelectionFuncName]).not.toHaveBeenCalled();
                    });

                    it('should not call row selection func when floating cell is selected', function () {
                        $scope[rowSelectionFuncName] = jasmine.createSpy();
                        createElement(buildElementString(rowSelectionFuncName));
                        element.find('tr.normal-row > td.col-fixed-right').click();
                        expect($scope[rowSelectionFuncName]).not.toHaveBeenCalled();
                    });
                });

                describe('expander', function () {
                    function buildElementString(templateUrl, expanderFuncName) {
                        return '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-column-config-key="someColumns" ' + (expanderFuncName ? 'sp-is-expanded-func="' + expanderFuncName + '(item)" ' : '') + (templateUrl ? 'sp-expander-template-url="' + templateUrl + '" ' : '') + '/>';
                    }

                    describe('configuration', function () {
                        var expanderFuncName = 'doesNotActuallyHaveToExist',
                            templateUrl = 'some/path/toSomething.html';

                        it('should throw if spIsExpandedFunc is defined and spExpanderTemplateUrl is not', function () {
                            var elementString = buildElementString(expanderFuncName);
                            expect(function () {
                                createElement(elementString);
                            }).toThrow();
                        });

                        it('should throw if spExpanderTemplateUrl is defined and spIsExpandedFunc is not', function () {
                            var elementString = buildElementString(templateUrl);
                            expect(function () {
                                createElement(elementString);
                            }).toThrow();
                        });

                        it('should not throw if both spExpanderTemplateUrl and spIsExpandedFunc are defined', function () {
                            var elementString = buildElementString(templateUrl, expanderFuncName);
                            expect(function () {
                                createElement(elementString);
                            }).not.toThrow();
                        });

                        it('should not throw if neither spExpanderTemplateUrl nor spIsExpandedFunc are defined', function () {
                            var elementString = buildElementString();
                            expect(function () {
                                createElement(elementString);
                            }).not.toThrow();
                        });
                    });

                    describe('toggling', function () {
                        var templateUrl = 'path/to/template.html',
                            isExpandedFuncName = 'isExpandedFunction';
                        beforeEach(inject(function ($templateCache) {
                            $templateCache.put(templateUrl, '<div class="expandedRowClass">{{item.name}}</div>');
                        }));

                        it('should not render expander template when not expanded', function () {
                            $scope[isExpandedFuncName] = jasmine.createSpy().and.returnValue(false);
                            createElement(buildElementString(templateUrl, isExpandedFuncName));
                            expect($scope[isExpandedFuncName]).toHaveBeenCalled();
                            expect(element.find('.expandedRowClass').length).toEqual(0);
                        });

                        describe('expanded', function () {
                            var $window = undefined;
                            var name = 'itemTwo';

                            beforeEach(inject(function (_$window_) {
                                $window = _$window_;
                                $scope[isExpandedFuncName] = jasmine.createSpy().and.callFake(function (item) {
                                    return item.name === name;
                                });
                                createElement(buildElementString(templateUrl, isExpandedFuncName));
                            }));

                            function getExpandedRow() {
                                return element.find('.expanded-row');
                            }

                            it('should render expander template when expanded', function () {
                                var expandedElements = undefined;
                                expect($scope[isExpandedFuncName]).toHaveBeenCalled();
                                expandedElements = element.find('.expandedRowClass');
                                expect(expandedElements.length).toEqual(1);
                                expect(expandedElements[0].innerHTML).toEqual(name);
                            });

                            it('should resize if the expanded row height changes', function () {
                                var document = $window.document,
                                    expandedElements = undefined,
                                    expandedRow = undefined,
                                    originalHeight = undefined,
                                    longString = 'some text that is really long and will cause the div to wrap a few times ' + 'we will see what happens I hope this works because i am tired of trying different things.';
                                try {
                                    spyOn(columnConfigs[4], 'isFixedRight').and.returnValue(true);
                                    angular.element(document.body).append(element);
                                    expandedRow = getExpandedRow();
                                    expandedElements = element.find('.expanded-content');
                                    expect(expandedElements.length).toEqual(1);
                                    originalHeight = expandedRow.height();
                                    expandedRow.append('<div>' + longString + '</div>');
                                    $scope.$apply();
                                    expandedRow = getExpandedRow();
                                    expect(expandedRow.height()).not.toEqual(originalHeight);
                                } finally {
                                    element.remove();
                                }
                            });
                        });
                    });
                });

                describe('right fixed column', function () {
                    var $window = undefined;
                    beforeEach(inject(function (_$window_) {
                        $window = _$window_;
                        spyOn(columnConfigs[4], 'isFixedRight').and.returnValue(true);
                    }));

                    it('sets styles on fixed column if there is one', function () {
                        var columnElements = undefined,
                            tableElement = undefined,
                            overlapElement = undefined;
                        createElement();

                        // make the watcher fire
                        $scope.$apply();
                        // flush it out
                        $timeout.flush();

                        columnElements = angular.element(element.find('.normal-col.col-fixed-right'));
                        tableElement = angular.element(element.find('.table-fixed-right'));
                        overlapElement = angular.element(element.find('.data-table-overlap'));

                        // Check that fixed classes are added to elements
                        expect(columnElements.length > 0).toEqual(true);
                        expect(tableElement.length > 0).toEqual(true);
                        expect(overlapElement.length > 0).toEqual(true);

                        // Check that some styles are set
                        expect(tableElement[0].style.marginRight).not.toEqual('');
                        columnElements.each(function (idx, elt) {
                            expect(elt.style.width).not.toEqual('');
                        });
                        expect(overlapElement[0].style.bottom).not.toEqual('');
                        expect(overlapElement[0].style.right).not.toEqual('');
                    });

                    it('corrects height if table height changes', function () {
                        var firstCell = undefined,
                            fixedCell = undefined,
                            originalHeight = undefined;
                        createElement();
                        angular.element($window.document.body).append(element);
                        try {
                            $scope.$apply();
                            $timeout.flush();
                            firstCell = element.find('tr:first-of-type td:first-of-type');
                            fixedCell = element.find('tr:first-of-type td.col-fixed-right');
                            originalHeight = fixedCell[0].scrollHeight;
                            // Set the height to something weird.
                            fixedCell.css('height', 400);
                            // Set the non-fixed cell text to something large that will increase height
                            firstCell[0].innerText = 'asfadsfdas fads fads f dasf ads fads f adsf ad sf asdf a dsf ads f asdf' + ' asdf asdf adsf as df asdf asdf adsf adsf adsf adsf adsf adsf adsf adsf adsf adsfa' + 'adsfasdfasdf asdf asdf ads fads fads fadsf adsf adsfadsfadsfadsfadsfadsfasdf';
                            // Double digest to trigger watch and then async apply
                            $scope.$apply();
                            $scope.$apply();
                            // Now they should match
                            expect(fixedCell[0].scrollHeight).toEqual(firstCell[0].scrollHeight);
                        } finally {
                            element.remove();
                        }
                    });
                });

                describe('spIncludeXs', function () {
                    it('includes xs table if true', function () {
                        var def = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-column-config-key="someColumns" ' + 'sp-search-data="searchData" ' + 'sp-paging-data="pagingData" ' + 'sp-refresh-trigger="refreshTrigger" ' + 'sp-checkbox-multiselect="checkbox" ' + 'sp-include-xs="true" />';
                        createElement(def);

                        expect(element.find('div.visible-xs').length).not.toEqual(0);
                        expect(element.find('div.hidden-xs').length).not.toEqual(0);
                    });

                    it('excludes xs table if false', function () {
                        createElement();
                        expect(element.find('div.visible-xs').length).toEqual(0);
                        expect(element.find('div.hidden-xs').length).toEqual(0);
                    });
                });

                it('should show section headers if tableConfig.groupByColumn is defined', function () {
                    var def = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" />';

                    $scope.tableConfig = new DataTableDirectiveConfig({
                        columnConfigKey: someColumnConfigKey,
                        groupByColumn: 'status'
                    });

                    createElement(def);

                    // there should be section header rows for each status value: Open, Closed.
                    expect(element.find('.section-header-row').length).toBe(2);
                });

                describe('spTableConfig', function () {
                    var def = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" />',
                        testColumnConfigKey = 'testColumnConfigKey',
                        testCheckbox = {
                        attach: jasmine.createSpy('attach')
                    };

                    beforeEach(function () {
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: testColumnConfigKey,
                            checkboxMultiSelect: testCheckbox
                        });
                    });

                    it('should throw if tableConfig is not defined', function () {
                        $scope.tableConfig = undefined;
                        expect(function () {
                            createElement(def);
                        }).toThrow();
                    });

                    it('should throw if tableConfig is not instance of DataTableDirectiveConfig', function () {
                        $scope.tableConfig = {};
                        expect(function () {
                            createElement(def);
                        }).toThrow();
                    });

                    it('should use tableConfig defined column config key', function () {
                        createElement(def);
                        expect(configService.getColumnConfigEntries).toHaveBeenCalledWith(testColumnConfigKey);
                    });

                    it('should use tableConfig defined paging data', function () {
                        createElement(def);
                        expect(element.find('#page-size-dropdown-toggle').text().trim()).toContain('10');
                    });

                    it('should use tableConfig defined refreshTrigger', function () {
                        createElement(def);
                        var trigger = $scope.tableConfig.getRefreshTrigger();
                        trigger.refresh();
                        expect($scope.itemsFunc).toHaveBeenCalled();
                    });

                    it('should use tableConfig defined checkbox', function () {
                        createElement(def);
                        expect(testCheckbox.attach).toHaveBeenCalled();
                        expect(element.find('.checkbox-col').length).toBeGreaterThan(1);
                    });

                    it('should update section header when table config groupByColumn changes', function () {
                        createElement(def);
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: someColumnConfigKey,
                            groupByColumn: 'name'
                        });

                        $scope.$apply();

                        expect($scope.$$childHead.dataTableCtrl.spSectionHeader).toEqual('name');
                    });

                    it('should update when table config changes', function () {
                        var anotherTestColumnConfigKey = 'anotherTestColumnConfigKey';

                        createElement(def);

                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: anotherTestColumnConfigKey
                        });

                        $scope.tableConfig.pageState.pagingData.itemsPerPage = 20;

                        $scope.$apply();

                        expect(configService.getColumnConfigEntries).toHaveBeenCalledWith(anotherTestColumnConfigKey);
                        expect(element.find('#page-size-dropdown-toggle').text().trim()).toContain('20');
                    });

                    it('should hide footer based on config', function () {
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: someColumnConfigKey,
                            hideFooter: true
                        });
                        createElement(def);

                        expect(element.find('.panel-footer').length).toBe(0);
                    });

                    it('uses the passed in page size if supplied', function () {
                        $scope.tableConfig.pageSizes = ['7', '12', '999'];
                        createElement(def);
                        var pageSizes = element.find('#page-size-dropdown-toggle-menu li a');
                        expect(pageSizes.length).toEqual(3);
                        expect(angular.element(pageSizes[0]).text().trim()).toContain('7');
                        expect(angular.element(pageSizes[1]).text().trim()).toContain('12');
                        expect(angular.element(pageSizes[2]).text().trim()).toContain('999');
                    });
                });

                describe('filter panel', function () {
                    var def = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" ' + 'sp-refresh-trigger="refreshTrigger" />',
                        testColumnConfigKey = 'testColumnConfigKey';

                    beforeEach(function () {
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: testColumnConfigKey,
                            filters: $scope.filters
                        });
                        $scope.tableConfig.headerEnabled = true;
                        $scope.tableConfig.filterTitle = 'testTitle';
                        createElement(def);
                    });

                    it('should have populated the filter panel title', function () {
                        expect(element.find('.filter-panel-title h5').text()).toEqual('testTitle');
                    });

                    it('should have populated the filters in filterGroups', function () {
                        expect(element.find('.filter-item').length).toBe(3);
                    });

                    it('should have disabled apply filter button', function () {
                        expect(element.find('#filterPanelApplyBtn').hasClass('disabled')).toBe(true);
                    });

                    it('should have non disabled filter buttons after input', function () {
                        var inputField = element.find('#filterPanelItem1');
                        inputField.val('123');
                        inputField.trigger('input');
                        expect(element.find('#filterPanelClearBtn').hasClass('disabled')).toBe(false);
                        expect(element.find('#filterPanelApplyBtn').hasClass('disabled')).toBe(false);
                    });

                    it('should reset after hitting the clear button', function () {
                        expect(element.find('.filter-item').length).toBe(3);
                        var inputField = element.find('#filterPanelItem1');
                        inputField.val('123');
                        inputField.trigger('input');
                        expect(inputField.val()).toEqual('123');
                        element.find('#filterPanelClearBtn').click();
                        expect(inputField.val()).toEqual('');
                    });

                    it('should have called the search function after applying filters', function () {
                        expect(element.find('.filter-item').length).toBe(3);
                        var inputField = element.find('#filterPanelItem1');
                        inputField.val('123');
                        inputField.trigger('input');
                        spyOn($scope.$$childHead.dataTableCtrl, 'search');
                        expect($scope.$$childHead.dataTableCtrl.search).not.toHaveBeenCalled();
                        element.find('#filterPanelApplyBtn').click();
                        element.find('#filterPanelApplyBtn').trigger('click');
                        expect($scope.$$childHead.dataTableCtrl.search).toHaveBeenCalled();
                    });

                    it('should have a green filter button after applying filters', function () {
                        expect(element.find('#panelFilterBtn').hasClass('btn-white')).toBe(true);
                        expect(element.find('#panelFilterBtn').hasClass('btn-success')).toBe(false);

                        expect(element.find('.filter-item').length).toBe(3);
                        var inputField = element.find('#filterPanelItem1');
                        inputField.val('123');
                        inputField.trigger('input');

                        $scope.tableConfig.pageState.searchData.hasFilterValues = jasmine.createSpy().and.returnValue(true);
                        $scope.$apply();
                        element.find('#filterPanelApplyBtn').click();
                        element.find('#filterPanelApplyBtn').trigger('click');

                        expect(element.find('#panelFilterBtn').hasClass('btn-white')).toBe(false);
                        expect(element.find('#panelFilterBtn').hasClass('btn-success')).toBe(true);
                    });

                    it('should have the chevron displayed correctly depending on if panel is collapsed or not', function () {
                        expect(element.find('#panelFilterBtn .fa-chevron-up').hasClass('unrotate')).toBe(false);
                        expect(element.find('#panelFilterBtn .fa-chevron-up').hasClass('rotate')).toBe(true);

                        element.find('#panelFilterBtn').click();
                        element.find('#panelFilterBtn').trigger('click');
                        $scope.$$childHead.dataTableCtrl.filtersDisplayed = jasmine.createSpy().and.returnValue(true);
                        $scope.$apply();

                        expect(element.find('#panelFilterBtn .fa-chevron-up').hasClass('unrotate')).toBe(true);
                        expect(element.find('#panelFilterBtn .fa-chevron-up').hasClass('rotate')).toBe(false);
                    });
                });
                describe('spDataTableHeading', function () {
                    var $window = undefined,
                        def = '<div><div class="panel">' + '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" >' + '  <sp-data-table-heading sp-position="right" sp-priority="2">' + '    <button id="csvBtn" class="btn btn-white btn-sm icon-btn" tabindex="50"/>' + '  </sp-data-table-heading>' + '  <sp-data-table-heading sp-position="left">' + '    <button id="bulkBtn" class="btn btn-white btn-sm icon-btn" tabindex="50"/>' + '  </sp-data-table-heading>' + '  <sp-data-table-heading sp-position="center">' + '    <button id="toggleBtn" class="btn btn-white btn-sm icon-btn" tabindex="50"/>' + '  </sp-data-table-heading>' + '  <sp-data-table-heading sp-position="right" sp-priority="1">' + '    <button id="customBtn" class="btn btn-white btn-sm icon-btn" tabindex="50"/>' + '  </sp-data-table-heading>' + '  <sp-data-table-heading sp-position="right"' + '    <button id="columnsBtn" class="btn btn-white btn-sm icon-btn" tabindex="50"/>' + '  </sp-data-table-heading>' + '  <sp-data-table-heading sp-position="top"' + '    <span id="topHeading">Heading</span>' + '  </sp-data-table-heading>' + '</sp-data-table></div></div>';

                    beforeEach(inject(function (_$window_) {
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: someColumnConfigKey,
                            filters: $scope.filters
                        });
                        $window = _$window_;
                    }));

                    it('should not display the header panel due to config not set', function () {
                        createElement(def);
                        expect(element.find('.panel-heading').hasClass('ng-hide')).toBe(true);
                    });

                    it('should display the header panel', function () {
                        $scope.tableConfig.headerEnabled = true;
                        createElement(def);
                        expect(element.find('.panel-heading').hasClass('ng-hide')).toBe(false);
                    });

                    it('should not contain default filter button', function () {
                        $scope.tableConfig.filters = [];
                        createElement(def);
                        expect(element.find('#panelFilterBtn').length).toBe(0);
                    });

                    it('should contain default filter button', function () {
                        createElement(def);
                        $scope.tableConfig.headerEnabled = true;
                        createElement(def);
                        expect(element.find('#panelFilterBtn').length).toBe(1);
                    });

                    it('should contain default paging info', inject(function (PagingData) {
                        createElement(def);
                        expect(element.find('.current-page-info').length).toBe(0);
                        $scope.tableConfig.pagingInfoEnabled = true;
                        $scope.tableConfig.pageState.pagingData = new PagingData(25);
                        createElement(def);
                        expect(element.find('.current-page-info').length).toBe(1);
                    }));

                    it('should contain heading buttons', function () {
                        $scope.tableConfig.headerEnabled = true;
                        createElement(def);
                        expect(element.find('#panelHeadingFarRight #csvBtn').length).toBe(1);
                        expect(element.find('#panelHeadingLeft #bulkBtn').length).toBe(1);
                        expect(element.find('#panelHeadingCenter #toggleBtn').length).toBe(1);
                        expect(element.find('#panelHeadingRight #customBtn').length).toBe(1);
                        expect(element.find('#panelHeadingRight #columnsBtn').length).toBe(1);
                    });

                    it('should contain top heading outside panel', function () {
                        $scope.tableConfig.headerEnabled = true;
                        createElement(def);
                        expect(element.find('#topHeading').length).toBe(1);
                    });
                });

                describe('preSearchFunc', function () {

                    function testPreSearchFunc(hasFunc, funcSuccess) {
                        var def = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" />';

                        $scope.tableConfig = new DataTableDirectiveConfig({
                            columnConfigKey: someColumnConfigKey,
                            groupByColumn: 'status',
                            filters: $scope.filters
                        });

                        // Add the preSearchFunc to the tableConfig
                        if (hasFunc) {
                            $scope.tableConfig.preSearchFunc = jasmine.createSpy('preSearchFunc').and.callFake(function () {
                                return funcSuccess ? $q.when() : $q.reject();
                            });
                        }

                        createElement(def);

                        // Set a modified scratch pad to the DataTableDirectiveCtrl
                        var scratchPad = {
                            filterValues: {
                                newFilter: 'thing'
                            }
                        },
                            oldSearchData = $scope.$$childHead.dataTableCtrl.getPageState().searchData;
                        $scope.$$childHead.dataTableCtrl.searchScratchPad = scratchPad;

                        // Spy on doSearch, which does the real searching
                        spyOn($scope.$$childHead.dataTableCtrl, 'doSearch').and.callThrough();

                        // Call the search() method to simulate applying filter panel
                        $scope.$$childHead.dataTableCtrl.search();
                        $scope.$apply();
                        $timeout.flush();

                        // Make sure the right things happened
                        if (!hasFunc) {
                            expect($scope.$$childHead.dataTableCtrl.doSearch).toHaveBeenCalled();
                        } else {
                            expect($scope.tableConfig.preSearchFunc).toHaveBeenCalledWith(scratchPad, oldSearchData);
                            if (funcSuccess) {
                                expect($scope.$$childHead.dataTableCtrl.doSearch).toHaveBeenCalled();
                            } else {
                                expect($scope.$$childHead.dataTableCtrl.doSearch).not.toHaveBeenCalled();
                            }
                        }
                    }

                    it('just calls through to regular search without preSearchFunc', function () {
                        testPreSearchFunc(false);
                    });

                    it('calls through to regular search if preSearchFunc returns resolved promise', function () {
                        testPreSearchFunc(true, true);
                    });

                    it('does not calls through to regular search if preSearchFunc returns rejected promise', function () {
                        testPreSearchFunc(true, false);
                    });
                });

                describe('column preferences', function () {
                    var definition = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder)" ' + 'sp-table-config="tableConfig" />',
                        tablePreferencesService = undefined,
                        tablePreferences = undefined,
                        $animate = undefined;

                    beforeEach(inject(function (_tablePreferencesService_, _$animate_, TablePreferences) {
                        tablePreferencesService = _tablePreferencesService_;
                        $animate = _$animate_;
                        $scope.tableConfig = new DataTableDirectiveConfig({
                            headerEnabled: true,
                            columnsBtnEnabled: true,
                            columnConfigKey: someColumnConfigKey,
                            tableId: 'preferenceTable'
                        });
                        //Exclude risk, we hid it.
                        tablePreferences = new TablePreferences({ columns: ['someValue', 'name'] });
                        spyOn(configService, 'getTablePreferences').and.callFake(function () {
                            return $q.when(tablePreferences);
                        });
                        spyOn(tablePreferencesService, 'saveTablePreferences').and.returnValue($q.when());
                    }));

                    describe('button', function () {
                        it('should not be shown if not enabled', function () {
                            $scope.tableConfig.columnsBtnEnabled = false;
                            createElement(definition);
                            $timeout.flush();
                            expect(element.find('#panelColumnsBtn').length).toBe(0);
                        });

                        it('should be shown if enabled', function () {
                            $scope.tableConfig.headerEnabled = true;
                            $scope.tableConfig.columnsBtnEnabled = true;
                            createElement(definition);
                            $timeout.flush();
                            expect(element.find('#panelColumnsBtn').length).toBe(1);
                        });

                        it('toggles the panel open when clicked', function () {
                            $scope.tableConfig.headerEnabled = true;
                            $scope.tableConfig.columnsBtnEnabled = true;
                            createElement(definition);
                            $timeout.flush();
                            var panel = element.find('div.column-editor-panel');
                            expect(angular.element(panel).hasClass('in')).toEqual(false);
                            var btn = angular.element(element.find('#panelColumnsBtn')[0]);
                            btn.click();
                            $scope.$apply();
                            $animate.flush();
                            panel = element.find('div.column-editor-panel');
                            expect(angular.element(panel).hasClass('in')).toEqual(true);
                        });
                    });

                    describe('getColumnConfigs()', function () {
                        it('fetches table column preferences', function () {
                            createElement(definition);
                            expect(configService.getTablePreferences).toHaveBeenCalledWith($scope.tableConfig.tableId);
                        });
                    });

                    describe('applying column changes', function () {
                        function saveColumns() {
                            var btn = angular.element(element.find('#panelColumnsBtn')[0]);
                            btn.click();
                            $scope.$apply();
                            var saveBtn = angular.element(element.find('#saveColumnEditBtn')[0]);
                            saveBtn.click();
                        }
                        it('saves the table column preferences', function () {
                            createElement(definition);
                            $timeout.flush();
                            saveColumns();
                            $timeout.flush();
                            expect(tablePreferencesService.saveTablePreferences).toHaveBeenCalledWith($scope.tableConfig.tableId, tablePreferences.columns, tablePreferences.grouping);
                        });

                        it('toggles the panel closed', function () {
                            createElement(definition);
                            $timeout.flush();
                            saveColumns();
                            $timeout.flush();
                            $scope.$apply();
                            var panel = element.find('div.column-editor-panel');
                            expect(angular.element(panel).hasClass('in')).toEqual(false);
                        });

                        it('fetches items', function () {
                            createElement(definition);
                            $timeout.flush();
                            $scope.itemsFunc.calls.reset();
                            saveColumns();
                            $timeout.flush();
                            $scope.$apply();
                            expect($scope.itemsFunc).toHaveBeenCalled();
                        });
                    });

                    describe('updating columns from preferences', function () {
                        function testColumnHidden(configs, dataIndex, isHidden) {
                            var column = configs.find(function (cc) {
                                return cc.dataIndex === dataIndex;
                            });
                            expect(column).toBeDefined();
                            expect(column.hidden).toEqual(isHidden);
                        }

                        it('marks hidden/not hidden the correct columns', function () {
                            createElement(definition);
                            $timeout.flush();
                            var columnConfigs = $scope.$$childHead.dataTableCtrl.columnConfigs;
                            testColumnHidden(columnConfigs, 'someValue', false);
                            testColumnHidden(columnConfigs, 'name', false);
                            testColumnHidden(columnConfigs, 'risk', true);
                        });

                        it('sorts columns', function () {
                            createElement(definition);
                            $timeout.flush();
                            var columnConfigs = $scope.$$childHead.dataTableCtrl.columnConfigs;
                            // shifts the undisplayed columns to the front and orders the displayed ones at the end.
                            expect(columnConfigs[columnConfigs.length - 2].dataIndex).toEqual('someValue');
                            expect(columnConfigs[columnConfigs.length - 1].dataIndex).toEqual('name');
                        });
                    });
                });

                describe('grouping', function () {
                    var definition = '<sp-data-table sp-items-func="itemsFunc(startIdx, itemsPerPage, filterValues, sortOrder, groupBy)"\n                            sp-table-config="tableConfig" />',
                        TablePreferences = undefined,
                        tablePreferences = undefined;

                    beforeEach(inject(function (_TablePreferences_) {
                        TablePreferences = _TablePreferences_;

                        $scope.tableConfig = new DataTableDirectiveConfig({
                            headerEnabled: true,
                            enableGroupBy: true,
                            groupByColumn: 'name',
                            columnConfigKey: someColumnConfigKey,
                            tableId: 'preferenceTable'
                        });

                        // Mock the table preferences to return no grouping preference by default.
                        mockGroupingPreference(null, false);
                        spyOn(configService, 'getTablePreferences').and.callFake(function () {
                            return $q.when(tablePreferences);
                        });
                    }));

                    /**
                     * Mock the TablePreferences that are used for the data table with the given grouping settings.
                     *
                     * @param groupBy  The name of the column to group by.
                     * @param isSet  Whether the grouping preference has been set by a user or not.
                     */
                    function mockGroupingPreference(groupBy, isSet) {
                        var data = {
                            columns: ['someValue', 'name', 'risk']
                        };

                        // The server just leaves out the grouping key if the preference is not set.
                        if (isSet) {
                            data.grouping = groupBy;
                        }

                        tablePreferences = new TablePreferences(data);
                    }

                    it('uses default grouping if no grouping preference exists', function () {
                        createElement(definition);
                        $timeout.flush();
                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, {}, undefined, 'name');
                    });

                    it('uses the null grouping preference instead of default grouping if specified', function () {
                        mockGroupingPreference(null, true);
                        createElement(definition);
                        $timeout.flush();
                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, {}, undefined, null);
                    });

                    it('uses the non-null grouping preference instead of default grouping if specified', function () {
                        mockGroupingPreference('risk', true);
                        createElement(definition);
                        $timeout.flush();
                        expect($scope.itemsFunc).toHaveBeenCalledWith(0, 10, {}, undefined, 'risk');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy90YWJsZS9EYXRhVGFibGVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHVCQUF1QixVQUFVLFNBQVM7SUFBM0g7O0lBR0ksSUFBSSxhQUFhO0lBQ2pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixjQUFjLGdDQUFnQztXQUMvQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGVBQWUsWUFBVzs7Z0JBRS9CLElBQUksb0JBQ0EsK0ZBQ0ksd0NBQ0EsaUNBQ0EsaUNBQ0EseUNBQ0E7b0JBQ0osc0JBQXNCO29CQUN0QixhQUFhO29CQUNMLFlBQWEsQ0FDVDt3QkFDSSxPQUFPO3dCQUNQLE9BQU87d0JBQ1AsT0FBTzt1QkFFWDt3QkFDSSxPQUFPO3dCQUNQLE9BQU87d0JBQ1AsT0FBTzt1QkFFWDt3QkFDSSxPQUFPO3dCQUNQLE9BQU87d0JBQ1AsT0FBTzt1QkFFWDt3QkFDSSxPQUFPO3dCQUNQLE9BQU87d0JBQ1AsT0FBTzs7O29CQUd2QjtvQkFBUTtvQkFBSTtvQkFBVTtvQkFBVTtvQkFBYTtvQkFBZTtvQkFBTztvQkFBVztvQkFBWTtvQkFDMUY7b0JBQTBCO29CQUFlO29CQUFxQjtvQkFBUztvQkFBUztvQkFBUztvQkFBUztvQkFDbEc7O2dCQUVKLFNBQVMsZ0JBQTZDO29CQWF0QyxJQWJPLFlBQVMsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsb0JBQWlCLFVBQUE7O29CQUNoRCxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU8sWUFBWSxhQUFhO2dCQUMzQyxXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsa0JBQWtC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QkFBdUIsSUFBSSxTQUFTLFlBQUE7NEJBOUJ6QyxPQThCK0MsR0FBRyxLQUFLOzs7Ozs7Ozs7O29CQVMzRSxTQUFTLHVCQUF1QixTQUFTLE9BQU87d0JBQzVDLElBQUksT0FBTzs0QkFDUCxTQUFTLENBQUMsYUFBYSxRQUFROzs7O3dCQUluQyxJQUFJLE9BQU87NEJBQ1AsS0FBSyxXQUFXOzs7d0JBR3BCLG1CQUFtQixJQUFJLGlCQUFpQjs7O29CQUc1QyxHQUFHLDBEQUEwRCxZQUFNO3dCQUMvRCxjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsT0FBTyxPQUFPLFdBQVcscUJBQXFCLEdBQUcsSUFBSSxJQUFJLFdBQVc7OztvQkFHeEUsR0FBRyw4RUFBOEUsWUFBTTt3QkFDbkYsdUJBQXVCLE1BQU07d0JBQzdCLGNBQWM7d0JBQ2QsU0FBUzt3QkFDVCxPQUFPLE9BQU8sV0FBVyxxQkFBcUIsR0FBRyxJQUFJLElBQUksV0FBVzs7O29CQUd4RSxHQUFHLGtGQUFrRixZQUFNO3dCQUN2Rix1QkFBdUIsUUFBUTt3QkFDL0IsY0FBYzt3QkFDZCxTQUFTO3dCQUNULE9BQU8sT0FBTyxXQUFXLHFCQUFxQixHQUFHLElBQUksSUFBSSxXQUFXOzs7Ozs7R0F2QjdFIiwiZmlsZSI6ImNvbW1vbi9kYXRhdmlldy90YWJsZS9EYXRhVGFibGVEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFibGVNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L3RhYmxlL1RhYmxlTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcERhdGFUYWJsZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGVsZW1lbnREZWZpbml0aW9uID1cbiAgICAgICAgJzxzcC1kYXRhLXRhYmxlIHNwLWl0ZW1zLWZ1bmM9XCJpdGVtc0Z1bmMoc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIpXCIgJyArXG4gICAgICAgICAgICAnc3AtY29sdW1uLWNvbmZpZy1rZXk9XCJzb21lQ29sdW1uc1wiICcgK1xuICAgICAgICAgICAgJ3NwLXNlYXJjaC1kYXRhPVwic2VhcmNoRGF0YVwiICcgK1xuICAgICAgICAgICAgJ3NwLXBhZ2luZy1kYXRhPVwicGFnaW5nRGF0YVwiICcgK1xuICAgICAgICAgICAgJ3NwLXJlZnJlc2gtdHJpZ2dlcj1cInJlZnJlc2hUcmlnZ2VyXCIgJyArXG4gICAgICAgICAgICAnc3AtY2hlY2tib3gtbXVsdGlzZWxlY3Q9XCJjaGVja2JveFwiIC8+JyxcbiAgICAgICAgc29tZUNvbHVtbkNvbmZpZ0tleSA9ICdzb21lQ29sdW1ucycsXG4gICAgICAgIGJhbmRDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgY29sb3JCYW5kcyA6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdsb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnMjUwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ21lZGl1bV9sb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICcyNTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICc1MDAnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnbWVkaXVtX2hpZ2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICc1MDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICc3NTAnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnaGlnaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb3dlcjogJzc1MScsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzEwMDAnXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgICRzY29wZSwgJHEsICRjb21waWxlLCAkdGltZW91dCwgdGVzdFNlcnZpY2UsIGNvbHVtbkNvbmZpZ3MsIGl0ZW1zLCBTb3J0T3JkZXIsIFNlYXJjaERhdGEsIERhdGFSZWZyZXNoVHJpZ2dlcixcbiAgICAgICAgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnLCBjb25maWdTZXJ2aWNlLCBDaGVja2JveE11bHRpU2VsZWN0LCBmaWx0ZXIxLCBmaWx0ZXIyLCBmaWx0ZXIzLCBlbGVtZW50LCBncm91cHMsXG4gICAgICAgIGNvbHVtbkNvbmZpZ1NlcnZpY2U7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGRlZmludGlvbiA9IGVsZW1lbnREZWZpbml0aW9uKSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW50aW9uKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCB0YWJsZU1vZHVsZSwgJ25nQW5pbWF0ZU1vY2snKSk7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0JBTkRfQ09ORklHJywgYmFuZENvbmZpZyk7XG4gICAgfSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTQgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF8kcV8sIF8kdGltZW91dF8sIF90ZXN0U2VydmljZV8sIF9Tb3J0T3JkZXJfLCBDb2x1bW5Db25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbmZpZ1NlcnZpY2VfLCBfU2VhcmNoRGF0YV8sIF9EYXRhUmVmcmVzaFRyaWdnZXJfLCBfRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2hlY2tib3hNdWx0aVNlbGVjdF8sIEZpbHRlciwgX2NvbHVtbkNvbmZpZ1NlcnZpY2VfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICAgICAgU2VhcmNoRGF0YSA9IF9TZWFyY2hEYXRhXztcbiAgICAgICAgRGF0YVJlZnJlc2hUcmlnZ2VyID0gX0RhdGFSZWZyZXNoVHJpZ2dlcl87XG4gICAgICAgIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyA9IF9EYXRhVGFibGVEaXJlY3RpdmVDb25maWdfO1xuICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xuICAgICAgICBDaGVja2JveE11bHRpU2VsZWN0ID0gX0NoZWNrYm94TXVsdGlTZWxlY3RfO1xuICAgICAgICBjb2x1bW5Db25maWdTZXJ2aWNlID0gX2NvbHVtbkNvbmZpZ1NlcnZpY2VfO1xuXG4gICAgICAgIGNvbHVtbkNvbmZpZ3MgPSBbbmV3IENvbHVtbkNvbmZpZyh7XG4gICAgICAgICAgICBkYXRhSW5kZXg6ICduYW1lJyxcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd2lkdGg6IDI1MFxuICAgICAgICB9KSxuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ3NvbWVWYWx1ZScsXG4gICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBwZXJjZW50V2lkdGg6IDI1XG4gICAgICAgIH0pLG5ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgZGF0YUluZGV4OiAnZXh0cmEnLFxuICAgICAgICAgICAgZmllbGRPbmx5OiB0cnVlXG4gICAgICAgIH0pLG5ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgZGF0YUluZGV4OiAnc3RhdHVzJyxcbiAgICAgICAgICAgIGZpZWxkT25seTogdHJ1ZVxuICAgICAgICB9KSxuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ3Jpc2snLFxuICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJyxcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgaGlkZWFibGU6IHRydWVcbiAgICAgICAgfSldO1xuXG4gICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0Q29sdW1uQ29uZmlnRW50cmllcyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNvbWVDb2x1bW5zOiBjb2x1bW5Db25maWdzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHt9KTtcblxuICAgICAgICBpdGVtcyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnaXRlbU9uZScsXG4gICAgICAgICAgICBzb21lVmFsdWU6IDcsXG4gICAgICAgICAgICBleHRyYTogZmFsc2UsXG4gICAgICAgICAgICBzdGF0dXM6ICdPcGVuJyxcbiAgICAgICAgICAgIHJpc2s6IDEwMFxuICAgICAgICB9LHtcbiAgICAgICAgICAgIG5hbWU6ICdpdGVtVHdvJyxcbiAgICAgICAgICAgIHNvbWVWYWx1ZTogMjIsXG4gICAgICAgICAgICBleHRyYTogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXR1czogJ0Nsb3NlZCcsXG4gICAgICAgICAgICByaXNrOiAyMDBcbiAgICAgICAgfSx7XG4gICAgICAgICAgICBuYW1lOiAnaXRlbVRocmVlJyxcbiAgICAgICAgICAgIHNvbWVWYWx1ZTogMjMsXG4gICAgICAgICAgICBleHRyYTogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXR1czogJ0Nsb3NlZCcsXG4gICAgICAgICAgICByaXNrOiAyMDBcbiAgICAgICAgfV07XG5cbiAgICAgICAgZ3JvdXBzID0gW3tcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdPcGVuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvdW50OiAxXG4gICAgICAgIH0se1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ0Nsb3NlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb3VudDogMlxuICAgICAgICB9XTtcblxuICAgICAgICAkc2NvcGUuaXRlbXNGdW5jID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGNvdW50OiAzLFxuICAgICAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwczogZ3JvdXBzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmaWx0ZXIxID0gbmV3IEZpbHRlcih7XG4gICAgICAgICAgcHJvcGVydHk6ICdwcm9wJyxcbiAgICAgICAgICBsYWJlbDogJ3VpX2xhYmVsJyxcbiAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9TVFJJTkdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZmlsdGVyMiA9IG5ldyBGaWx0ZXIoe1xuICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMicsXG4gICAgICAgICAgICBsYWJlbDogJ3VpX2xhYmVsMicsXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9OVU1CRVJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZmlsdGVyMyA9IG5ldyBGaWx0ZXIoe1xuICAgICAgICAgICAgcHJvcGVydHk6ICdwcm9wMycsXG4gICAgICAgICAgICBsYWJlbDogJ3VpX2xhYmVsMycsXG4gICAgICAgICAgICBkYXRhVHlwZTogRmlsdGVyLkRBVEFfVFlQRV9TVFJJTkdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbZmlsdGVyMSwgZmlsdGVyMiwgZmlsdGVyM107XG5cbiAgICAgICAgJHNjb3BlLnNlYXJjaERhdGEgPSBuZXcgU2VhcmNoRGF0YSgpO1xuICAgICAgICAkc2NvcGUuc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMgPSB7XG4gICAgICAgICAgICBzb21ldGhpbmc6ICdmaWx0ZXJlZCdcbiAgICAgICAgfTtcblxuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBzcEl0ZW1GdW5jIHRvIGdldCBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAxMCwgJHNjb3BlLnNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgdGhlIHBhc3NlZCBpbiBQYWdpbmdEYXRhIGlmIHN1cHBsaWVkJywgaW5qZWN0KGZ1bmN0aW9uKFBhZ2luZ0RhdGEpIHtcbiAgICAgICAgJHNjb3BlLnBhZ2luZ0RhdGEgPSBuZXcgUGFnaW5nRGF0YSgyNSk7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhZ2Utc2l6ZS1kcm9wZG93bi10b2dnbGUnKS50ZXh0KCkudHJpbSgpKS50b0NvbnRhaW4oJzI1Jyk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3dzIG5vIHJlc3VsdHMgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBubyBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnLCB0YWJsZTtcblxuICAgICAgICAkc2NvcGUuaXRlbXNGdW5jID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IFtdLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcblxuICAgICAgICBtc2cgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgnZGl2Lm5vLXJlc3VsdHMtcGFuZWwgcC5oMycpO1xuICAgICAgICBleHBlY3QobXNnLmxlbmd0aCkudG9CZSgxKTtcblxuICAgICAgICB0YWJsZSA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCd0YWJsZScpO1xuICAgICAgICBleHBlY3QodGFibGUubGVuZ3RoKS50b0JlKDApO1xuXG4gICAgICAgIC8vIHJlc2V0IHNjb3BlLml0ZW1zRnVuY1xuICAgICAgICAkc2NvcGUuaXRlbXNGdW5jID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGNvdW50OiAzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3dzIGRpc3BsYXlhYmxlIGNvbHVtbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbHVtbnM7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgY29sdW1ucyA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCd0aGVhZCB0aCcpO1xuICAgICAgICBleHBlY3QoY29sdW1ucy5sZW5ndGgpLnRvQmUoMyk7XG4gICAgICAgIGV4cGVjdChjb2x1bW5zWzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbignbmFtZScpO1xuICAgICAgICBleHBlY3QoY29sdW1uc1sxXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ3NvbWVWYWx1ZScpO1xuICAgICAgICBleHBlY3QoY29sdW1uc1syXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ3Jpc2snKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb2x1bW4gd2lkdGgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0SGVhZGVyV2lkdGhTdHlsZShjb2xJZHgpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGxldCBjb2x1bW5zID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoJ3RoZWFkIHRoJyksXG4gICAgICAgICAgICAgICAgY29sID0gY29sdW1uc1tjb2xJZHhdO1xuICAgICAgICAgICAgcmV0dXJuIGNvbC5zdHlsZS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdpcyBpbiBwaXhlbHMgd2hlbiB0aGUgY29sdW1uIGNvbmZpZyB1c2VzIHdpZHRoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZ2V0SGVhZGVyV2lkdGhTdHlsZSgwKSkudG9FcXVhbCgnMjUwcHgnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGluIHBlcmNlbnRhZ2Ugd2hlbiB0aGUgY29sdW1uIGNvbmZpZyB1c2VzIHBlcmNlbnQgd2lkdGgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChnZXRIZWFkZXJXaWR0aFN0eWxlKDEpKS50b0VxdWFsKCcyNSUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIG5vdCBzcGVjaWZpZWQgd2hlbiB0aGUgY29sdW1uIGNvbmZpZyBkb2VzIG5vdCBoYXZlIGEgd2lkdGgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChnZXRIZWFkZXJXaWR0aFN0eWxlKDIpKS50b0VxdWFsKCcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIG5vdCBzcGVjaWZpZWQgd2hlbiBsYXN0IGRpc3BsYXllZCBjb2x1bW4nLCAoKSA9PiB7XG4gICAgICAgICAgICBjb2x1bW5Db25maWdzWzRdLnBlcmNlbnRXaWR0aCA9IDEwO1xuICAgICAgICAgICAgZXhwZWN0KGdldEhlYWRlcldpZHRoU3R5bGUoMikpLnRvRXF1YWwoJycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzb3J0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2x1bW5zLCBzck9ubHlEaXY7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGNvbHVtbnMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgndGhlYWQgdGgnKTtcbiAgICAgICAgICAgIHNyT25seURpdiA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdkaXZbcm9sZT1hbGVydF0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NvcnRzIHdoZW4gY2xpY2tpbmcgc29ydGFibGUgaGVhZGVycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLml0ZW1zRnVuYy5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGNvbHVtbnNbMl0pLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLml0ZW1zRnVuYykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMCwgMTAsICRzY29wZS5zZWFyY2hEYXRhLmZpbHRlclZhbHVlcyxcbiAgICAgICAgICAgICAgICBuZXcgU29ydE9yZGVyKCdyaXNrJywgdHJ1ZSkpO1xuXG4gICAgICAgICAgICAkc2NvcGUuaXRlbXNGdW5jLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoY29sdW1uc1syXSkuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAxMCwgJHNjb3BlLnNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLFxuICAgICAgICAgICAgICAgIG5ldyBTb3J0T3JkZXIoJ3Jpc2snLCBmYWxzZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc29ydCB3aGVuIGNsaWNrIHVuc29ydGFibGUgaGVhZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXRlbXNGdW5jLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoY29sdW1uc1sxXSkuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndXBkYXRlcyB0aGUgNTA4IHRleHQgYXBwcm9wcmlhdGVseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLml0ZW1zRnVuYy5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGNvbHVtbnNbMl0pLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3JPbmx5RGl2LnRleHQoKSkudG9CZSgndWlfZGF0YV90YWJsZV9zb3J0ZWRfYXNjZW5kaW5nX3NyJyk7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChjb2x1bW5zWzJdKS5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KHNyT25seURpdi50ZXh0KCkpLnRvQmUoJ3VpX2RhdGFfdGFibGVfc29ydGVkX2Rlc2NlbmRpbmdfc3InKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGFnaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlc2NyaWJlKCdwYWdlIHNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdjYWxscyBzcEl0ZW1zRnVuYyB3aGVuIGNoYW5naW5nIHBhZ2Ugc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZHJvcFRvZ2dsZSA9IGVsZW1lbnQuZmluZCgnI3BhZ2Utc2l6ZS1kcm9wZG93bi10b2dnbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1zO1xuXG4gICAgICAgICAgICAgICAgLy8gUG9wIHRoZSBtZW51IHVwLlxuICAgICAgICAgICAgICAgIGRyb3BUb2dnbGUuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBtZW51SXRlbXMgPSBkcm9wVG9nZ2xlLm5leHQoKS5maW5kKCdsaSBhJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBFeHBlY3QgMyBzaXplcyAtIDEwLCAyNSwgNTAuXG4gICAgICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtcy5sZW5ndGgpLnRvRXF1YWwoMyk7XG5cbiAgICAgICAgICAgICAgICAvLyBDbGljayB0aGUgJzI1JyBpdGVtLlxuICAgICAgICAgICAgICAgICRzY29wZS5pdGVtc0Z1bmMuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobWVudUl0ZW1zWzFdKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAyNSwgJHNjb3BlLnNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdwYWdpbmF0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgnaXMgbm90IGRpc3BsYXllZCBpZiB0aGVyZSBpcyBvbmUgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGVsZW1lbnQuZmluZCgnLnBhZ2luYXRpb24nKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocGFnaW5hdGlvbi5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2tib3gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNoZWNrYm94O1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGVja2JveCA9IHtcbiAgICAgICAgICAgICAgICBhdHRhY2g6IGphc21pbmUuY3JlYXRlU3B5KCdhdHRhY2gnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFzQ2hlY2tib3goZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGNoZWNrcyA9IGVsZW1lbnQuZmluZCgnLmNoZWNrYm94LWNvbCcpO1xuICAgICAgICAgICAgcmV0dXJuIChjaGVja3MubGVuZ3RoID4gMCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRDaGVja2JveEhlYWRlcihlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gZWxlbWVudC5maW5kKCd0aGVhZCAuY2hlY2tib3gtY29sIGJ1dHRvbi5mYS1zcXVhcmUtbycpO1xuICAgICAgICAgICAgZXhwZWN0KGhlYWRlci5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KGhlYWRlclswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0NoZWNrYm94TWVudURpc3BsYXllZChlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgbWVudSA9IGVsZW1lbnQuZmluZCgndGhlYWQgdGguY2hlY2tib3gtY29sIHNwYW4nKTtcbiAgICAgICAgICAgIGV4cGVjdChtZW51Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQobWVudVswXSkuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdpcyBhdHRhY2hlZCB0byBjb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuY2hlY2tib3ggPSBjaGVja2JveDtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjaGVja2JveC5hdHRhY2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGF0dGFjaGVkIHRvIGNvbnRyb2xsZXIgd2hlbiBzZXQgYWZ0ZXIgY29uc3RydWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoY2hlY2tib3guYXR0YWNoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgJHNjb3BlLmNoZWNrYm94ID0gY2hlY2tib3g7XG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNoZWNrYm94LmF0dGFjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXMgZGlzcGxheWVkIHdoZW4gcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5jaGVja2JveCA9IGNoZWNrYm94O1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KGhhc0NoZWNrYm94KGVsZW1lbnQpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXMgaGlkZGVuIHdoZW4gbm90IHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoaGFzQ2hlY2tib3goZWxlbWVudCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWxsb3dzIHRvZ2dsaW5nIHRoZSBtZW51JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuY2hlY2tib3ggPSBjaGVja2JveDtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGxldCBjaGVja2JveEhlYWRlciA9IGdldENoZWNrYm94SGVhZGVyKGVsZW1lbnQpO1xuICAgICAgICAgICAgZXhwZWN0KGlzQ2hlY2tib3hNZW51RGlzcGxheWVkKGVsZW1lbnQpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIGNoZWNrYm94SGVhZGVyLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoaXNDaGVja2JveE1lbnVEaXNwbGF5ZWQoZWxlbWVudCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlZnJlc2ggdHJpZ2dlciBjYWxscyBpdGVtc0Z1bmMgd2hlbiByZWZyZXNoaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0cmlnZ2VyID0gbmV3IERhdGFSZWZyZXNoVHJpZ2dlcigpO1xuICAgICAgICAkc2NvcGUucmVmcmVzaFRyaWdnZXIgPSB0cmlnZ2VyO1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG5cbiAgICAgICAgJHNjb3BlLml0ZW1zRnVuYy5jYWxscy5yZXNldCgpO1xuICAgICAgICB0cmlnZ2VyLnJlZnJlc2goKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS5pdGVtc0Z1bmMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWN0aW9uSGVhZGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjaGVja2JveCA9IHtcbiAgICAgICAgICAgIGF0dGFjaDogamFzbWluZS5jcmVhdGVTcHkoJ2F0dGFjaCcpLFxuICAgICAgICAgICAgdG9nZ2xlR3JvdXA6IGphc21pbmUuY3JlYXRlU3B5KCd0b2dnbGVHcm91cCcpXG4gICAgICAgIH0sIFJlc3VsdEdyb3VwO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUmVzdWx0R3JvdXBfKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUuY2hlY2tib3ggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBSZXN1bHRHcm91cCA9IF9SZXN1bHRHcm91cF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBidWlsZEVsZW1lbnRXaXRoU2VjdGlvbkhlYWRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAnPHNwLWRhdGEtdGFibGUgc3AtaXRlbXMtZnVuYz1cIml0ZW1zRnVuYyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJWYWx1ZXMsIHNvcnRPcmRlcilcIiAnICtcbiAgICAgICAgICAgICAgICAnc3AtY29sdW1uLWNvbmZpZy1rZXk9XCJzb21lQ29sdW1uc1wiICcgK1xuICAgICAgICAgICAgICAgICdzcC1zZWN0aW9uLWhlYWRlcj1cInN0YXR1c1wiICcgK1xuICAgICAgICAgICAgICAgICdzcC1jaGVja2JveC1tdWx0aXNlbGVjdD1cImNoZWNrYm94XCInICtcbiAgICAgICAgICAgICAgICAnLz4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgc2VjdGlvbiBoZWFkZXJzIHdpdGggY29ycmVjdCB0ZXh0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGJ1aWxkRWxlbWVudFdpdGhTZWN0aW9uSGVhZGVyKCkpO1xuICAgICAgICAgICAgbGV0IHNlY3Rpb25IZWFkZXJzID0gZWxlbWVudC5maW5kKCd0ci5zZWN0aW9uLWhlYWRlci1yb3cnKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWN0aW9uSGVhZGVycy5sZW5ndGgpLnRvRXF1YWwoMik7XG5cbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoc2VjdGlvbkhlYWRlcnNbMF0pLnRleHQoKS50cmltKCkpLnRvRXF1YWwoaXRlbXNbMF0uc3RhdHVzKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoc2VjdGlvbkhlYWRlcnNbMV0pLnRleHQoKS50cmltKCkpLnRvRXF1YWwoaXRlbXNbMV0uc3RhdHVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgc2hvdyBzZWN0aW9uIGhlYWRlciBpZiBzcFNlY3Rpb25IZWFkZXIgaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBsZXQgc2VjdGlvbkhlYWRlcnMgPSBlbGVtZW50LmZpbmQoJ3RyLnNlY3Rpb24taGVhZGVyLXJvdycpO1xuICAgICAgICAgICAgZXhwZWN0KHNlY3Rpb25IZWFkZXJzLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHNlY3Rpb24gaGVhZGVyIGluIGNvcnJlY3Qgcm93cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRXaXRoU2VjdGlvbkhlYWRlcigpKTtcbiAgICAgICAgICAgIGxldCByb3dzID0gZWxlbWVudC5maW5kKCd0cicpO1xuICAgICAgICAgICAgbGV0IHNlY3Rpb25IZWFkZXIgPSBhbmd1bGFyLmVsZW1lbnQocm93c1sxXSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VjdGlvbkhlYWRlci5oYXNDbGFzcygnc2VjdGlvbi1oZWFkZXItcm93JykpLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgICAgIGxldCBzZWN0aW9uSGVhZGVyMiA9IGFuZ3VsYXIuZWxlbWVudChyb3dzWzNdKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWN0aW9uSGVhZGVyMi5oYXNDbGFzcygnc2VjdGlvbi1oZWFkZXItcm93JykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBjaGVja2JveCcsICgpID0+IHtcbiAgICAgICAgICAgICRzY29wZS5jaGVja2JveCA9IGNoZWNrYm94O1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRXaXRoU2VjdGlvbkhlYWRlcigpKTtcbiAgICAgICAgICAgIGxldCByb3dzID0gZWxlbWVudC5maW5kKCd0ci5zZWN0aW9uLWhlYWRlci1yb3cnKSxcbiAgICAgICAgICAgICAgICBzZWN0aW9uSGVhZGVyQ2hlY2tib3ggPSBhbmd1bGFyLmVsZW1lbnQocm93c1swXSkuZmluZCgnLmNoZWNrYm94LWNvbC5iZy1zZWN0aW9uLWhlYWRlcicpO1xuICAgICAgICAgICAgZXhwZWN0KHNlY3Rpb25IZWFkZXJDaGVja2JveC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIGdyb3VwIHNlbGVjdGlvbiB3aGVuIGNsaWNrZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUuY2hlY2tib3ggPSBjaGVja2JveDtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoYnVpbGRFbGVtZW50V2l0aFNlY3Rpb25IZWFkZXIoKSk7XG4gICAgICAgICAgICBsZXQgcm93cyA9IGVsZW1lbnQuZmluZCgndHIuc2VjdGlvbi1oZWFkZXItcm93JyksXG4gICAgICAgICAgICAgICAgc2VjdGlvbkhlYWRlckNoZWNrYm94ID0gYW5ndWxhci5lbGVtZW50KHJvd3NbMF0pLmZpbmQoJy5jaGVja2JveC1jb2wuYmctc2VjdGlvbi1oZWFkZXInKSxcbiAgICAgICAgICAgICAgICBidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoc2VjdGlvbkhlYWRlckNoZWNrYm94WzBdKS5maW5kKCdidXR0b24uY2hlY2tib3gtYnRuJyk7XG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYnV0dG9uKS5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KGNoZWNrYm94LnRvZ2dsZUdyb3VwKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBsZXQgYXJncyA9IGNoZWNrYm94LnRvZ2dsZUdyb3VwLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwobmV3IFJlc3VsdEdyb3VwKGdyb3Vwc1swXSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhlIGNvbHVtbkNvbmZpZ1NlcnZpY2UgdG8gZ2V0IHRoZSBzZWN0aW9uSGVhZGVyIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY29sdW1uQ29uZmlnU2VydmljZSwgJ2dldEZpbHRlcmVkVmFsdWUnKS5hbmQucmV0dXJuVmFsdWUoJ2ZpbHRlclZhbHVlJyk7XG4gICAgICAgICAgICAkc2NvcGUuY2hlY2tib3ggPSBjaGVja2JveDtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRXaXRoU2VjdGlvbkhlYWRlcigpKTtcbiAgICAgICAgICAgIGV4cGVjdChjb2x1bW5Db25maWdTZXJ2aWNlLmdldEZpbHRlcmVkVmFsdWUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ3NwYW4nKS5oYXNDbGFzcygnc3Itb25seScpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnc3BhbicpLnRleHQoKS50cmltKCkpLnRvQ29udGFpbignZmlsdGVyVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyb3cgc2VsZWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByb3dTZWxlY3Rpb25GdW5jTmFtZSA9ICdyb3dTZWxlY3Rpb25GdW5jJztcblxuICAgICAgICBmdW5jdGlvbiBidWlsZEVsZW1lbnRTdHJpbmcocm93U2VsZWN0aW9uRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuICc8c3AtZGF0YS10YWJsZSBzcC1pdGVtcy1mdW5jPVwiaXRlbXNGdW5jKHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIGZpbHRlclZhbHVlcywgc29ydE9yZGVyKVwiICcgK1xuICAgICAgICAgICAgICAgICdzcC1jb2x1bW4tY29uZmlnLWtleT1cInNvbWVDb2x1bW5zXCIgJyArXG4gICAgICAgICAgICAgICAgJ3NwLWNoZWNrYm94LW11bHRpc2VsZWN0PVwibXVsdGlTZWxlY3RcIiAnICtcbiAgICAgICAgICAgICAgICAocm93U2VsZWN0aW9uRnVuYyA/ICdzcC1vbi1yb3ctc2VsZWN0aW9uLWZ1bmM9XCInICsgcm93U2VsZWN0aW9uRnVuYyArICcoaXRlbSlcIiAnIDogJycpICsgJy8+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubXVsdGlzZWxlY3QgPSB7fTtcbiAgICAgICAgICAgIHNweU9uKGNvbHVtbkNvbmZpZ3NbNF0sICdpc0ZpeGVkUmlnaHQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCByb3cgc2VsZWN0aW9uIGZ1bmMgd2hlbiBub3JtYWwgY2VsbCBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlW3Jvd1NlbGVjdGlvbkZ1bmNOYW1lXSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGJ1aWxkRWxlbWVudFN0cmluZyhyb3dTZWxlY3Rpb25GdW5jTmFtZSkpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCd0ci5ub3JtYWwtcm93ID4gdGQnKS5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZVtyb3dTZWxlY3Rpb25GdW5jTmFtZV0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW1zWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHJvdyBzZWxlY3Rpb24gZnVuYyB3aGVuIG5vcm1hbCBjZWxsIGlzIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGVbcm93U2VsZWN0aW9uRnVuY05hbWVdID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoYnVpbGRFbGVtZW50U3RyaW5nKHJvd1NlbGVjdGlvbkZ1bmNOYW1lKSk7XG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJ3RyLm5vcm1hbC1yb3cgPiB0ZC5ub3JtYWwtY29sJykuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGVbcm93U2VsZWN0aW9uRnVuY05hbWVdKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgcm93IHNlbGVjdGlvbiBmdW5jIHdoZW4gY2hlY2tib3ggY2VsbCBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlW3Jvd1NlbGVjdGlvbkZ1bmNOYW1lXSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGJ1aWxkRWxlbWVudFN0cmluZyhyb3dTZWxlY3Rpb25GdW5jTmFtZSkpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCd0ci5ub3JtYWwtcm93ID4gdGQuY2hlY2tib3gtY29sJykuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGVbcm93U2VsZWN0aW9uRnVuY05hbWVdKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHJvdyBzZWxlY3Rpb24gZnVuYyB3aGVuIGZsb2F0aW5nIGNlbGwgaXMgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZVtyb3dTZWxlY3Rpb25GdW5jTmFtZV0gPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRTdHJpbmcocm93U2VsZWN0aW9uRnVuY05hbWUpKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgndHIubm9ybWFsLXJvdyA+IHRkLmNvbC1maXhlZC1yaWdodCcpLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlW3Jvd1NlbGVjdGlvbkZ1bmNOYW1lXSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZXhwYW5kZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRFbGVtZW50U3RyaW5nKHRlbXBsYXRlVXJsLCBleHBhbmRlckZ1bmNOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gJzxzcC1kYXRhLXRhYmxlIHNwLWl0ZW1zLWZ1bmM9XCJpdGVtc0Z1bmMoc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIpXCIgJyArXG4gICAgICAgICAgICAgICAgJ3NwLWNvbHVtbi1jb25maWcta2V5PVwic29tZUNvbHVtbnNcIiAnICtcbiAgICAgICAgICAgICAgICAoZXhwYW5kZXJGdW5jTmFtZSA/ICdzcC1pcy1leHBhbmRlZC1mdW5jPVwiJyArIGV4cGFuZGVyRnVuY05hbWUgKyAnKGl0ZW0pXCIgJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgKHRlbXBsYXRlVXJsID8gJ3NwLWV4cGFuZGVyLXRlbXBsYXRlLXVybD1cIicgKyB0ZW1wbGF0ZVVybCArICdcIiAnIDogJycpICtcbiAgICAgICAgICAgICAgICAnLz4nO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpYmUoJ2NvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBleHBhbmRlckZ1bmNOYW1lID0gJ2RvZXNOb3RBY3R1YWxseUhhdmVUb0V4aXN0JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA9ICdzb21lL3BhdGgvdG9Tb21ldGhpbmcuaHRtbCc7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgc3BJc0V4cGFuZGVkRnVuYyBpcyBkZWZpbmVkIGFuZCBzcEV4cGFuZGVyVGVtcGxhdGVVcmwgaXMgbm90JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRTdHJpbmcgPSBidWlsZEVsZW1lbnRTdHJpbmcoZXhwYW5kZXJGdW5jTmFtZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGVsZW1lbnRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIHNwRXhwYW5kZXJUZW1wbGF0ZVVybCBpcyBkZWZpbmVkIGFuZCBzcElzRXhwYW5kZWRGdW5jIGlzIG5vdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50U3RyaW5nID0gYnVpbGRFbGVtZW50U3RyaW5nKHRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IHRocm93IGlmIGJvdGggc3BFeHBhbmRlclRlbXBsYXRlVXJsIGFuZCBzcElzRXhwYW5kZWRGdW5jIGFyZSBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRTdHJpbmcgPSBidWlsZEVsZW1lbnRTdHJpbmcodGVtcGxhdGVVcmwsIGV4cGFuZGVyRnVuY05hbWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChlbGVtZW50U3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IHRocm93IGlmIG5laXRoZXIgc3BFeHBhbmRlclRlbXBsYXRlVXJsIG5vciBzcElzRXhwYW5kZWRGdW5jIGFyZSBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRTdHJpbmcgPSBidWlsZEVsZW1lbnRTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWxlbWVudFN0cmluZyk7XG4gICAgICAgICAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgndG9nZ2xpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZVVybCA9ICdwYXRoL3RvL3RlbXBsYXRlLmh0bWwnLFxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWRGdW5jTmFtZSA9ICdpc0V4cGFuZGVkRnVuY3Rpb24nO1xuICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQodGVtcGxhdGVVcmwsICc8ZGl2IGNsYXNzPVwiZXhwYW5kZWRSb3dDbGFzc1wiPnt7aXRlbS5uYW1lfX08L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVuZGVyIGV4cGFuZGVyIHRlbXBsYXRlIHdoZW4gbm90IGV4cGFuZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlW2lzRXhwYW5kZWRGdW5jTmFtZV0gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRTdHJpbmcodGVtcGxhdGVVcmwsIGlzRXhwYW5kZWRGdW5jTmFtZSkpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkc2NvcGVbaXNFeHBhbmRlZEZ1bmNOYW1lXSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5leHBhbmRlZFJvd0NsYXNzJykubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlc2NyaWJlKCdleHBhbmRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCAkd2luZG93O1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSAnaXRlbVR3byc7XG5cbiAgICAgICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHdpbmRvd18pIHtcbiAgICAgICAgICAgICAgICAgICAgJHdpbmRvdyA9IF8kd2luZG93XztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlW2lzRXhwYW5kZWRGdW5jTmFtZV0gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lID09PSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChidWlsZEVsZW1lbnRTdHJpbmcodGVtcGxhdGVVcmwsIGlzRXhwYW5kZWRGdW5jTmFtZSkpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldEV4cGFuZGVkUm93KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcuZXhwYW5kZWQtcm93Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgZXhwYW5kZXIgdGVtcGxhdGUgd2hlbiBleHBhbmRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXhwYW5kZWRFbGVtZW50cztcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KCRzY29wZVtpc0V4cGFuZGVkRnVuY05hbWVdKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkRWxlbWVudHMgPSBlbGVtZW50LmZpbmQoJy5leHBhbmRlZFJvd0NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChleHBhbmRlZEVsZW1lbnRzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGV4cGFuZGVkRWxlbWVudHNbMF0uaW5uZXJIVE1MKS50b0VxdWFsKG5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXNpemUgaWYgdGhlIGV4cGFuZGVkIHJvdyBoZWlnaHQgY2hhbmdlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZG9jdW1lbnQgPSAkd2luZG93LmRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRFbGVtZW50cywgZXhwYW5kZWRSb3csIG9yaWdpbmFsSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ1N0cmluZyA9ICdzb21lIHRleHQgdGhhdCBpcyByZWFsbHkgbG9uZyBhbmQgd2lsbCBjYXVzZSB0aGUgZGl2IHRvIHdyYXAgYSBmZXcgdGltZXMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dlIHdpbGwgc2VlIHdoYXQgaGFwcGVucyBJIGhvcGUgdGhpcyB3b3JrcyBiZWNhdXNlIGkgYW0gdGlyZWQgb2YgdHJ5aW5nIGRpZmZlcmVudCB0aGluZ3MuJztcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNweU9uKGNvbHVtbkNvbmZpZ3NbNF0sICdpc0ZpeGVkUmlnaHQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRSb3cgPSBnZXRFeHBhbmRlZFJvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRFbGVtZW50cyA9IGVsZW1lbnQuZmluZCgnLmV4cGFuZGVkLWNvbnRlbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdChleHBhbmRlZEVsZW1lbnRzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsSGVpZ2h0ID0gZXhwYW5kZWRSb3cuaGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFJvdy5hcHBlbmQoJzxkaXY+JyArIGxvbmdTdHJpbmcgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZFJvdyA9IGdldEV4cGFuZGVkUm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3QoZXhwYW5kZWRSb3cuaGVpZ2h0KCkpLm5vdC50b0VxdWFsKG9yaWdpbmFsSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyaWdodCBmaXhlZCBjb2x1bW4nLCAoKSA9PiB7XG4gICAgICAgIGxldCAkd2luZG93O1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyR3aW5kb3dfKSA9PiB7XG4gICAgICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuICAgICAgICAgICAgc3B5T24oY29sdW1uQ29uZmlnc1s0XSwgJ2lzRml4ZWRSaWdodCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzZXRzIHN0eWxlcyBvbiBmaXhlZCBjb2x1bW4gaWYgdGhlcmUgaXMgb25lJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbHVtbkVsZW1lbnRzLCB0YWJsZUVsZW1lbnQsIG92ZXJsYXBFbGVtZW50O1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSB3YXRjaGVyIGZpcmVcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIC8vIGZsdXNoIGl0IG91dFxuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcblxuICAgICAgICAgICAgY29sdW1uRWxlbWVudHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCcubm9ybWFsLWNvbC5jb2wtZml4ZWQtcmlnaHQnKSk7XG4gICAgICAgICAgICB0YWJsZUVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCcudGFibGUtZml4ZWQtcmlnaHQnKSk7XG4gICAgICAgICAgICBvdmVybGFwRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoJy5kYXRhLXRhYmxlLW92ZXJsYXAnKSk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgZml4ZWQgY2xhc3NlcyBhcmUgYWRkZWQgdG8gZWxlbWVudHNcbiAgICAgICAgICAgIGV4cGVjdChjb2x1bW5FbGVtZW50cy5sZW5ndGggPiAwKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRhYmxlRWxlbWVudC5sZW5ndGggPiAwKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KG92ZXJsYXBFbGVtZW50Lmxlbmd0aCA+IDApLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgc29tZSBzdHlsZXMgYXJlIHNldFxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlRWxlbWVudFswXS5zdHlsZS5tYXJnaW5SaWdodCkubm90LnRvRXF1YWwoJycpO1xuICAgICAgICAgICAgY29sdW1uRWxlbWVudHMuZWFjaCgoaWR4LCBlbHQpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWx0LnN0eWxlLndpZHRoKS5ub3QudG9FcXVhbCgnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChvdmVybGFwRWxlbWVudFswXS5zdHlsZS5ib3R0b20pLm5vdC50b0VxdWFsKCcnKTtcbiAgICAgICAgICAgIGV4cGVjdChvdmVybGFwRWxlbWVudFswXS5zdHlsZS5yaWdodCkubm90LnRvRXF1YWwoJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY29ycmVjdHMgaGVpZ2h0IGlmIHRhYmxlIGhlaWdodCBjaGFuZ2VzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpcnN0Q2VsbCwgZml4ZWRDZWxsLCBvcmlnaW5hbEhlaWdodDtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkd2luZG93LmRvY3VtZW50LmJvZHkpLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgZmlyc3RDZWxsID0gZWxlbWVudC5maW5kKCd0cjpmaXJzdC1vZi10eXBlIHRkOmZpcnN0LW9mLXR5cGUnKTtcbiAgICAgICAgICAgICAgICBmaXhlZENlbGwgPSBlbGVtZW50LmZpbmQoJ3RyOmZpcnN0LW9mLXR5cGUgdGQuY29sLWZpeGVkLXJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxIZWlnaHQgPSBmaXhlZENlbGxbMF0uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaGVpZ2h0IHRvIHNvbWV0aGluZyB3ZWlyZC5cbiAgICAgICAgICAgICAgICBmaXhlZENlbGwuY3NzKCdoZWlnaHQnLCA0MDApO1xuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgbm9uLWZpeGVkIGNlbGwgdGV4dCB0byBzb21ldGhpbmcgbGFyZ2UgdGhhdCB3aWxsIGluY3JlYXNlIGhlaWdodFxuICAgICAgICAgICAgICAgIGZpcnN0Q2VsbFswXS5pbm5lclRleHQgPSAnYXNmYWRzZmRhcyBmYWRzIGZhZHMgZiBkYXNmIGFkcyBmYWRzIGYgYWRzZiBhZCBzZiBhc2RmIGEgZHNmIGFkcyBmIGFzZGYnICtcbiAgICAgICAgICAgICAgICAgICAgJyBhc2RmIGFzZGYgYWRzZiBhcyBkZiBhc2RmIGFzZGYgYWRzZiBhZHNmIGFkc2YgYWRzZiBhZHNmIGFkc2YgYWRzZiBhZHNmIGFkc2YgYWRzZmEnICtcbiAgICAgICAgICAgICAgICAgICAgJ2Fkc2Zhc2RmYXNkZiBhc2RmIGFzZGYgYWRzIGZhZHMgZmFkcyBmYWRzZiBhZHNmIGFkc2ZhZHNmYWRzZmFkc2ZhZHNmYWRzZmFzZGYnO1xuICAgICAgICAgICAgICAgIC8vIERvdWJsZSBkaWdlc3QgdG8gdHJpZ2dlciB3YXRjaCBhbmQgdGhlbiBhc3luYyBhcHBseVxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgLy8gTm93IHRoZXkgc2hvdWxkIG1hdGNoXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZpeGVkQ2VsbFswXS5zY3JvbGxIZWlnaHQpLnRvRXF1YWwoZmlyc3RDZWxsWzBdLnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NwSW5jbHVkZVhzJywgKCkgPT4ge1xuICAgICAgICBpdCgnaW5jbHVkZXMgeHMgdGFibGUgaWYgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWYgPSAnPHNwLWRhdGEtdGFibGUgc3AtaXRlbXMtZnVuYz1cIml0ZW1zRnVuYyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJWYWx1ZXMsIHNvcnRPcmRlcilcIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3NwLWNvbHVtbi1jb25maWcta2V5PVwic29tZUNvbHVtbnNcIiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3NwLXNlYXJjaC1kYXRhPVwic2VhcmNoRGF0YVwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnc3AtcGFnaW5nLWRhdGE9XCJwYWdpbmdEYXRhXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICdzcC1yZWZyZXNoLXRyaWdnZXI9XCJyZWZyZXNoVHJpZ2dlclwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnc3AtY2hlY2tib3gtbXVsdGlzZWxlY3Q9XCJjaGVja2JveFwiICcgK1xuICAgICAgICAgICAgICAgICAgICAnc3AtaW5jbHVkZS14cz1cInRydWVcIiAvPic7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG5cbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2Rpdi52aXNpYmxlLXhzJykubGVuZ3RoKS5ub3QudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2Rpdi5oaWRkZW4teHMnKS5sZW5ndGgpLm5vdC50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZXhjbHVkZXMgeHMgdGFibGUgaWYgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdkaXYudmlzaWJsZS14cycpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2Rpdi5oaWRkZW4teHMnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IHNlY3Rpb24gaGVhZGVycyBpZiB0YWJsZUNvbmZpZy5ncm91cEJ5Q29sdW1uIGlzIGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkZWYgPSAnPHNwLWRhdGEtdGFibGUgc3AtaXRlbXMtZnVuYz1cIml0ZW1zRnVuYyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJWYWx1ZXMsIHNvcnRPcmRlcilcIiAnICtcbiAgICAgICAgICAgICAgICAnc3AtdGFibGUtY29uZmlnPVwidGFibGVDb25maWdcIiAvPic7XG5cbiAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnID0gbmV3IERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyh7XG4gICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHNvbWVDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICBncm91cEJ5Q29sdW1uOiAnc3RhdHVzJ1xuICAgICAgICB9KTtcblxuICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG5cbiAgICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIHNlY3Rpb24gaGVhZGVyIHJvd3MgZm9yIGVhY2ggc3RhdHVzIHZhbHVlOiBPcGVuLCBDbG9zZWQuXG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5zZWN0aW9uLWhlYWRlci1yb3cnKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3BUYWJsZUNvbmZpZycsICgpID0+IHtcbiAgICAgICAgbGV0IGRlZiA9ICc8c3AtZGF0YS10YWJsZSBzcC1pdGVtcy1mdW5jPVwiaXRlbXNGdW5jKHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIGZpbHRlclZhbHVlcywgc29ydE9yZGVyKVwiICcgK1xuICAgICAgICAgICAgICAgICdzcC10YWJsZS1jb25maWc9XCJ0YWJsZUNvbmZpZ1wiIC8+JyxcbiAgICAgICAgICAgIHRlc3RDb2x1bW5Db25maWdLZXkgPSAndGVzdENvbHVtbkNvbmZpZ0tleScsXG4gICAgICAgICAgICB0ZXN0Q2hlY2tib3ggPSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoOiBqYXNtaW5lLmNyZWF0ZVNweSgnYXR0YWNoJylcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHRlc3RDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdDogdGVzdENoZWNrYm94XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiB0YWJsZUNvbmZpZyBpcyBub3QgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWYpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIHRhYmxlQ29uZmlnIGlzIG5vdCBpbnN0YW5jZSBvZiBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSB7fTtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWYpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVzZSB0YWJsZUNvbmZpZyBkZWZpbmVkIGNvbHVtbiBjb25maWcga2V5JywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWYpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29sdW1uQ29uZmlnRW50cmllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgodGVzdENvbHVtbkNvbmZpZ0tleSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdXNlIHRhYmxlQ29uZmlnIGRlZmluZWQgcGFnaW5nIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFnZS1zaXplLWRyb3Bkb3duLXRvZ2dsZScpLnRleHQoKS50cmltKCkpLnRvQ29udGFpbignMTAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1c2UgdGFibGVDb25maWcgZGVmaW5lZCByZWZyZXNoVHJpZ2dlcicsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmKTtcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gJHNjb3BlLnRhYmxlQ29uZmlnLmdldFJlZnJlc2hUcmlnZ2VyKCk7XG4gICAgICAgICAgICB0cmlnZ2VyLnJlZnJlc2goKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdXNlIHRhYmxlQ29uZmlnIGRlZmluZWQgY2hlY2tib3gnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QodGVzdENoZWNrYm94LmF0dGFjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmNoZWNrYm94LWNvbCcpLmxlbmd0aCkudG9CZUdyZWF0ZXJUaGFuKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBzZWN0aW9uIGhlYWRlciB3aGVuIHRhYmxlIGNvbmZpZyBncm91cEJ5Q29sdW1uIGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHNvbWVDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgZ3JvdXBCeUNvbHVtbjogJ25hbWUnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLiQkY2hpbGRIZWFkLmRhdGFUYWJsZUN0cmwuc3BTZWN0aW9uSGVhZGVyKS50b0VxdWFsKCduYW1lJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHdoZW4gdGFibGUgY29uZmlnIGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYW5vdGhlclRlc3RDb2x1bW5Db25maWdLZXkgPSAnYW5vdGhlclRlc3RDb2x1bW5Db25maWdLZXknO1xuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG5cbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZyA9IG5ldyBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcoe1xuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogYW5vdGhlclRlc3RDb2x1bW5Db25maWdLZXlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEuaXRlbXNQZXJQYWdlID0gMjA7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29sdW1uQ29uZmlnRW50cmllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoYW5vdGhlclRlc3RDb2x1bW5Db25maWdLZXkpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhZ2Utc2l6ZS1kcm9wZG93bi10b2dnbGUnKS50ZXh0KCkudHJpbSgpKS50b0NvbnRhaW4oJzIwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGlkZSBmb290ZXIgYmFzZWQgb24gY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHNvbWVDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgaGlkZUZvb3RlcjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG5cbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5wYW5lbC1mb290ZXInKS5sZW5ndGgpLnRvQmUoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIHRoZSBwYXNzZWQgaW4gcGFnZSBzaXplIGlmIHN1cHBsaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnLnBhZ2VTaXplcyA9IFsnNycsICcxMicsICc5OTknXTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmKTtcbiAgICAgICAgICAgIGxldCBwYWdlU2l6ZXMgPSBlbGVtZW50LmZpbmQoJyNwYWdlLXNpemUtZHJvcGRvd24tdG9nZ2xlLW1lbnUgbGkgYScpO1xuICAgICAgICAgICAgZXhwZWN0KHBhZ2VTaXplcy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHBhZ2VTaXplc1swXSkudGV4dCgpLnRyaW0oKSkudG9Db250YWluKCc3Jyk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHBhZ2VTaXplc1sxXSkudGV4dCgpLnRyaW0oKSkudG9Db250YWluKCcxMicpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChwYWdlU2l6ZXNbMl0pLnRleHQoKS50cmltKCkpLnRvQ29udGFpbignOTk5Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ZpbHRlciBwYW5lbCcsICgpID0+IHtcbiAgICAgICAgbGV0IGRlZiA9ICc8c3AtZGF0YS10YWJsZSBzcC1pdGVtcy1mdW5jPVwiaXRlbXNGdW5jKHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIGZpbHRlclZhbHVlcywgc29ydE9yZGVyKVwiICcgK1xuICAgICAgICAgICAgICAgICdzcC10YWJsZS1jb25maWc9XCJ0YWJsZUNvbmZpZ1wiICcgK1xuICAgICAgICAgICAgICAgICdzcC1yZWZyZXNoLXRyaWdnZXI9XCJyZWZyZXNoVHJpZ2dlclwiIC8+JyxcbiAgICAgICAgICAgIHRlc3RDb2x1bW5Db25maWdLZXkgPSAndGVzdENvbHVtbkNvbmZpZ0tleSc7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHRlc3RDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgZmlsdGVyczogJHNjb3BlLmZpbHRlcnNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnLmhlYWRlckVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnLmZpbHRlclRpdGxlID0gJ3Rlc3RUaXRsZSc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBwb3B1bGF0ZWQgdGhlIGZpbHRlciBwYW5lbCB0aXRsZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5maWx0ZXItcGFuZWwtdGl0bGUgaDUnKS50ZXh0KCkpLnRvRXF1YWwoJ3Rlc3RUaXRsZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgcG9wdWxhdGVkIHRoZSBmaWx0ZXJzIGluIGZpbHRlckdyb3VwcycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5maWx0ZXItaXRlbScpLmxlbmd0aCkudG9CZSgzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGRpc2FibGVkIGFwcGx5IGZpbHRlciBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxBcHBseUJ0bicpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgbm9uIGRpc2FibGVkIGZpbHRlciBidXR0b25zIGFmdGVyIGlucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0RmllbGQgPSBlbGVtZW50LmZpbmQoJyNmaWx0ZXJQYW5lbEl0ZW0xJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnZhbCgnMTIzJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnRyaWdnZXIoJ2lucHV0Jyk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxDbGVhckJ0bicpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNmaWx0ZXJQYW5lbEFwcGx5QnRuJykuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlc2V0IGFmdGVyIGhpdHRpbmcgdGhlIGNsZWFyIGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5maWx0ZXItaXRlbScpLmxlbmd0aCkudG9CZSgzKTtcbiAgICAgICAgICAgIGxldCBpbnB1dEZpZWxkID0gZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxJdGVtMScpO1xuICAgICAgICAgICAgaW5wdXRGaWVsZC52YWwoJzEyMycpO1xuICAgICAgICAgICAgaW5wdXRGaWVsZC50cmlnZ2VyKCdpbnB1dCcpO1xuICAgICAgICAgICAgZXhwZWN0KGlucHV0RmllbGQudmFsKCkpLnRvRXF1YWwoJzEyMycpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxDbGVhckJ0bicpLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoaW5wdXRGaWVsZC52YWwoKSkudG9FcXVhbCgnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBjYWxsZWQgdGhlIHNlYXJjaCBmdW5jdGlvbiBhZnRlciBhcHBseWluZyBmaWx0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmZpbHRlci1pdGVtJykubGVuZ3RoKS50b0JlKDMpO1xuICAgICAgICAgICAgbGV0IGlucHV0RmllbGQgPSBlbGVtZW50LmZpbmQoJyNmaWx0ZXJQYW5lbEl0ZW0xJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnZhbCgnMTIzJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnRyaWdnZXIoJ2lucHV0Jyk7XG4gICAgICAgICAgICBzcHlPbigkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybCwgJ3NlYXJjaCcpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS4kJGNoaWxkSGVhZC5kYXRhVGFibGVDdHJsLnNlYXJjaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnI2ZpbHRlclBhbmVsQXBwbHlCdG4nKS5jbGljaygpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxBcHBseUJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLiQkY2hpbGRIZWFkLmRhdGFUYWJsZUN0cmwuc2VhcmNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhIGdyZWVuIGZpbHRlciBidXR0b24gYWZ0ZXIgYXBwbHlpbmcgZmlsdGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbEZpbHRlckJ0bicpLmhhc0NsYXNzKCdidG4td2hpdGUnKSkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbEZpbHRlckJ0bicpLmhhc0NsYXNzKCdidG4tc3VjY2VzcycpKS50b0JlKGZhbHNlKTtcblxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmZpbHRlci1pdGVtJykubGVuZ3RoKS50b0JlKDMpO1xuICAgICAgICAgICAgbGV0IGlucHV0RmllbGQgPSBlbGVtZW50LmZpbmQoJyNmaWx0ZXJQYW5lbEl0ZW0xJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnZhbCgnMTIzJyk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkLnRyaWdnZXIoJ2lucHV0Jyk7XG5cbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5wYWdlU3RhdGUuc2VhcmNoRGF0YS5oYXNGaWx0ZXJWYWx1ZXMgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnI2ZpbHRlclBhbmVsQXBwbHlCdG4nKS5jbGljaygpO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcjZmlsdGVyUGFuZWxBcHBseUJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbEZpbHRlckJ0bicpLmhhc0NsYXNzKCdidG4td2hpdGUnKSkudG9CZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4nKS5oYXNDbGFzcygnYnRuLXN1Y2Nlc3MnKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBjaGV2cm9uIGRpc3BsYXllZCBjb3JyZWN0bHkgZGVwZW5kaW5nIG9uIGlmIHBhbmVsIGlzIGNvbGxhcHNlZCBvciBub3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4gLmZhLWNoZXZyb24tdXAnKS5oYXNDbGFzcygndW5yb3RhdGUnKSkudG9CZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4gLmZhLWNoZXZyb24tdXAnKS5oYXNDbGFzcygncm90YXRlJykpLnRvQmUodHJ1ZSk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnI3BhbmVsRmlsdGVyQnRuJykuY2xpY2soKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnI3BhbmVsRmlsdGVyQnRuJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICRzY29wZS4kJGNoaWxkSGVhZC5kYXRhVGFibGVDdHJsLmZpbHRlcnNEaXNwbGF5ZWQgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhbmVsRmlsdGVyQnRuIC5mYS1jaGV2cm9uLXVwJykuaGFzQ2xhc3MoJ3Vucm90YXRlJykpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4gLmZhLWNoZXZyb24tdXAnKS5oYXNDbGFzcygncm90YXRlJykpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnc3BEYXRhVGFibGVIZWFkaW5nJywgKCkgPT4ge1xuICAgICAgICBsZXQgJHdpbmRvdyxcbiAgICAgICAgICAgIGRlZiA9ICc8ZGl2PjxkaXYgY2xhc3M9XCJwYW5lbFwiPicgK1xuICAgICAgICAgICAgICAgICc8c3AtZGF0YS10YWJsZSBzcC1pdGVtcy1mdW5jPVwiaXRlbXNGdW5jKHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIGZpbHRlclZhbHVlcywgc29ydE9yZGVyKVwiICcgK1xuICAgICAgICAgICAgICAgICdzcC10YWJsZS1jb25maWc9XCJ0YWJsZUNvbmZpZ1wiID4nICtcbiAgICAgICAgICAgICAgICAnICA8c3AtZGF0YS10YWJsZS1oZWFkaW5nIHNwLXBvc2l0aW9uPVwicmlnaHRcIiBzcC1wcmlvcml0eT1cIjJcIj4nICtcbiAgICAgICAgICAgICAgICAnICAgIDxidXR0b24gaWQ9XCJjc3ZCdG5cIiBjbGFzcz1cImJ0biBidG4td2hpdGUgYnRuLXNtIGljb24tYnRuXCIgdGFiaW5kZXg9XCI1MFwiLz4nICtcbiAgICAgICAgICAgICAgICAnICA8L3NwLWRhdGEtdGFibGUtaGVhZGluZz4nICtcbiAgICAgICAgICAgICAgICAnICA8c3AtZGF0YS10YWJsZS1oZWFkaW5nIHNwLXBvc2l0aW9uPVwibGVmdFwiPicgK1xuICAgICAgICAgICAgICAgICcgICAgPGJ1dHRvbiBpZD1cImJ1bGtCdG5cIiBjbGFzcz1cImJ0biBidG4td2hpdGUgYnRuLXNtIGljb24tYnRuXCIgdGFiaW5kZXg9XCI1MFwiLz4nICtcbiAgICAgICAgICAgICAgICAnICA8L3NwLWRhdGEtdGFibGUtaGVhZGluZz4nICtcbiAgICAgICAgICAgICAgICAnICA8c3AtZGF0YS10YWJsZS1oZWFkaW5nIHNwLXBvc2l0aW9uPVwiY2VudGVyXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgICA8YnV0dG9uIGlkPVwidG9nZ2xlQnRuXCIgY2xhc3M9XCJidG4gYnRuLXdoaXRlIGJ0bi1zbSBpY29uLWJ0blwiIHRhYmluZGV4PVwiNTBcIi8+JyArXG4gICAgICAgICAgICAgICAgJyAgPC9zcC1kYXRhLXRhYmxlLWhlYWRpbmc+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwLWRhdGEtdGFibGUtaGVhZGluZyBzcC1wb3NpdGlvbj1cInJpZ2h0XCIgc3AtcHJpb3JpdHk9XCIxXCI+JyArXG4gICAgICAgICAgICAgICAgJyAgICA8YnV0dG9uIGlkPVwiY3VzdG9tQnRuXCIgY2xhc3M9XCJidG4gYnRuLXdoaXRlIGJ0bi1zbSBpY29uLWJ0blwiIHRhYmluZGV4PVwiNTBcIi8+JyArXG4gICAgICAgICAgICAgICAgJyAgPC9zcC1kYXRhLXRhYmxlLWhlYWRpbmc+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwLWRhdGEtdGFibGUtaGVhZGluZyBzcC1wb3NpdGlvbj1cInJpZ2h0XCInICtcbiAgICAgICAgICAgICAgICAnICAgIDxidXR0b24gaWQ9XCJjb2x1bW5zQnRuXCIgY2xhc3M9XCJidG4gYnRuLXdoaXRlIGJ0bi1zbSBpY29uLWJ0blwiIHRhYmluZGV4PVwiNTBcIi8+JyArXG4gICAgICAgICAgICAgICAgJyAgPC9zcC1kYXRhLXRhYmxlLWhlYWRpbmc+JyArXG4gICAgICAgICAgICAgICAgJyAgPHNwLWRhdGEtdGFibGUtaGVhZGluZyBzcC1wb3NpdGlvbj1cInRvcFwiJyArXG4gICAgICAgICAgICAgICAgJyAgICA8c3BhbiBpZD1cInRvcEhlYWRpbmdcIj5IZWFkaW5nPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICcgIDwvc3AtZGF0YS10YWJsZS1oZWFkaW5nPicgK1xuICAgICAgICAgICAgICAgICc8L3NwLWRhdGEtdGFibGU+PC9kaXY+PC9kaXY+JztcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHdpbmRvd18pIHtcbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZyA9IG5ldyBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcoe1xuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogc29tZUNvbHVtbkNvbmZpZ0tleSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiAkc2NvcGUuZmlsdGVyc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZGlzcGxheSB0aGUgaGVhZGVyIHBhbmVsIGR1ZSB0byBjb25maWcgbm90IHNldCcsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5wYW5lbC1oZWFkaW5nJykuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwbGF5IHRoZSBoZWFkZXIgcGFuZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcuaGVhZGVyRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcucGFuZWwtaGVhZGluZycpLmhhc0NsYXNzKCduZy1oaWRlJykpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjb250YWluIGRlZmF1bHQgZmlsdGVyIGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5maWx0ZXJzID0gW107XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4nKS5sZW5ndGgpLnRvQmUoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29udGFpbiBkZWZhdWx0IGZpbHRlciBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcuaGVhZGVyRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxGaWx0ZXJCdG4nKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29udGFpbiBkZWZhdWx0IHBhZ2luZyBpbmZvJywgaW5qZWN0KGZ1bmN0aW9uKFBhZ2luZ0RhdGEpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5jdXJyZW50LXBhZ2UtaW5mbycpLmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5wYWdpbmdJbmZvRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEgPSBuZXcgUGFnaW5nRGF0YSgyNSk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuY3VycmVudC1wYWdlLWluZm8nKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNvbnRhaW4gaGVhZGluZyBidXR0b25zJywgKCkgPT4ge1xuICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnLmhlYWRlckVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWYpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhbmVsSGVhZGluZ0ZhclJpZ2h0ICNjc3ZCdG4nKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFuZWxIZWFkaW5nTGVmdCAjYnVsa0J0bicpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbEhlYWRpbmdDZW50ZXIgI3RvZ2dsZUJ0bicpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbEhlYWRpbmdSaWdodCAjY3VzdG9tQnRuJykubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhbmVsSGVhZGluZ1JpZ2h0ICNjb2x1bW5zQnRuJykubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNvbnRhaW4gdG9wIGhlYWRpbmcgb3V0c2lkZSBwYW5lbCcsICgpID0+IHtcbiAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5oZWFkZXJFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyN0b3BIZWFkaW5nJykubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwcmVTZWFyY2hGdW5jJywgKCkgPT4ge1xuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RQcmVTZWFyY2hGdW5jKGhhc0Z1bmMsIGZ1bmNTdWNjZXNzKSB7XG4gICAgICAgICAgICBsZXQgZGVmID0gJzxzcC1kYXRhLXRhYmxlIHNwLWl0ZW1zLWZ1bmM9XCJpdGVtc0Z1bmMoc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIpXCIgJyArXG4gICAgICAgICAgICAgICAgJ3NwLXRhYmxlLWNvbmZpZz1cInRhYmxlQ29uZmlnXCIgLz4nO1xuXG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHNvbWVDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgZ3JvdXBCeUNvbHVtbjogJ3N0YXR1cycsXG4gICAgICAgICAgICAgICAgZmlsdGVyczogJHNjb3BlLmZpbHRlcnNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHByZVNlYXJjaEZ1bmMgdG8gdGhlIHRhYmxlQ29uZmlnXG4gICAgICAgICAgICBpZiAoaGFzRnVuYykge1xuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5wcmVTZWFyY2hGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ3ByZVNlYXJjaEZ1bmMnKVxuICAgICAgICAgICAgICAgICAgICAuYW5kLmNhbGxGYWtlKCgpID0+IGZ1bmNTdWNjZXNzID8gJHEud2hlbigpIDogJHEucmVqZWN0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZik7XG5cbiAgICAgICAgICAgIC8vIFNldCBhIG1vZGlmaWVkIHNjcmF0Y2ggcGFkIHRvIHRoZSBEYXRhVGFibGVEaXJlY3RpdmVDdHJsXG4gICAgICAgICAgICBsZXQgc2NyYXRjaFBhZCA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVyOiAndGhpbmcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2xkU2VhcmNoRGF0YSA9ICRzY29wZS4kJGNoaWxkSGVhZC5kYXRhVGFibGVDdHJsLmdldFBhZ2VTdGF0ZSgpLnNlYXJjaERhdGE7XG4gICAgICAgICAgICAkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5zZWFyY2hTY3JhdGNoUGFkID0gc2NyYXRjaFBhZDtcblxuICAgICAgICAgICAgLy8gU3B5IG9uIGRvU2VhcmNoLCB3aGljaCBkb2VzIHRoZSByZWFsIHNlYXJjaGluZ1xuICAgICAgICAgICAgc3B5T24oJHNjb3BlLiQkY2hpbGRIZWFkLmRhdGFUYWJsZUN0cmwsICdkb1NlYXJjaCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBzZWFyY2goKSBtZXRob2QgdG8gc2ltdWxhdGUgYXBwbHlpbmcgZmlsdGVyIHBhbmVsXG4gICAgICAgICAgICAkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5zZWFyY2goKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcmlnaHQgdGhpbmdzIGhhcHBlbmVkXG4gICAgICAgICAgICBpZiAoIWhhc0Z1bmMpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHNjb3BlLiQkY2hpbGRIZWFkLmRhdGFUYWJsZUN0cmwuZG9TZWFyY2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCRzY29wZS50YWJsZUNvbmZpZy5wcmVTZWFyY2hGdW5jKVxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoc2NyYXRjaFBhZCwgb2xkU2VhcmNoRGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5kb1NlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5kb1NlYXJjaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnanVzdCBjYWxscyB0aHJvdWdoIHRvIHJlZ3VsYXIgc2VhcmNoIHdpdGhvdXQgcHJlU2VhcmNoRnVuYycsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RQcmVTZWFyY2hGdW5jKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gcmVndWxhciBzZWFyY2ggaWYgcHJlU2VhcmNoRnVuYyByZXR1cm5zIHJlc29sdmVkIHByb21pc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0UHJlU2VhcmNoRnVuYyh0cnVlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGNhbGxzIHRocm91Z2ggdG8gcmVndWxhciBzZWFyY2ggaWYgcHJlU2VhcmNoRnVuYyByZXR1cm5zIHJlamVjdGVkIHByb21pc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0UHJlU2VhcmNoRnVuYyh0cnVlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbHVtbiBwcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLWRhdGEtdGFibGUgc3AtaXRlbXMtZnVuYz1cIml0ZW1zRnVuYyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBmaWx0ZXJWYWx1ZXMsIHNvcnRPcmRlcilcIiAnICtcbiAgICAgICAgICAgICAgICAnc3AtdGFibGUtY29uZmlnPVwidGFibGVDb25maWdcIiAvPicsXG4gICAgICAgICAgICB0YWJsZVByZWZlcmVuY2VzU2VydmljZSwgdGFibGVQcmVmZXJlbmNlcywgICRhbmltYXRlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfdGFibGVQcmVmZXJlbmNlc1NlcnZpY2VfLCBfJGFuaW1hdGVfLCBUYWJsZVByZWZlcmVuY2VzKSA9PiB7XG4gICAgICAgICAgICB0YWJsZVByZWZlcmVuY2VzU2VydmljZSA9IF90YWJsZVByZWZlcmVuY2VzU2VydmljZV87XG4gICAgICAgICAgICAkYW5pbWF0ZSA9IF8kYW5pbWF0ZV87XG4gICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbHVtbnNCdG5FbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogc29tZUNvbHVtbkNvbmZpZ0tleSxcbiAgICAgICAgICAgICAgICB0YWJsZUlkOiAncHJlZmVyZW5jZVRhYmxlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL0V4Y2x1ZGUgcmlzaywgd2UgaGlkIGl0LlxuICAgICAgICAgICAgdGFibGVQcmVmZXJlbmNlcyA9IG5ldyBUYWJsZVByZWZlcmVuY2VzKHtjb2x1bW5zOiBbJ3NvbWVWYWx1ZScsICduYW1lJ10gfSk7XG4gICAgICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0VGFibGVQcmVmZXJlbmNlcycpLmFuZFxuICAgICAgICAgICAgICAgIC5jYWxsRmFrZSgoKSA9PiAkcS53aGVuKHRhYmxlUHJlZmVyZW5jZXMpKTtcbiAgICAgICAgICAgIHNweU9uKHRhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlLCAnc2F2ZVRhYmxlUHJlZmVyZW5jZXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGRlc2NyaWJlKCdidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBzaG93biBpZiBub3QgZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcuY29sdW1uc0J0bkVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI3BhbmVsQ29sdW1uc0J0bicpLmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGJlIHNob3duIGlmIGVuYWJsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnLmhlYWRlckVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5jb2x1bW5zQnRuRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYW5lbENvbHVtbnNCdG4nKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3RvZ2dsZXMgdGhlIHBhbmVsIG9wZW4gd2hlbiBjbGlja2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZUNvbmZpZy5oZWFkZXJFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGFibGVDb25maWcuY29sdW1uc0J0bkVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFuZWwgPSBlbGVtZW50LmZpbmQoJ2Rpdi5jb2x1bW4tZWRpdG9yLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChwYW5lbCkuaGFzQ2xhc3MoJ2luJykpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxldCBidG4gPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCcjcGFuZWxDb2x1bW5zQnRuJylbMF0pO1xuICAgICAgICAgICAgICAgIGJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAkYW5pbWF0ZS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIHBhbmVsID0gZWxlbWVudC5maW5kKCdkaXYuY29sdW1uLWVkaXRvci1wYW5lbCcpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQocGFuZWwpLmhhc0NsYXNzKCdpbicpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRDb2x1bW5Db25maWdzKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnZmV0Y2hlcyB0YWJsZSBjb2x1bW4gcHJlZmVyZW5jZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRUYWJsZVByZWZlcmVuY2VzKVxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoJHNjb3BlLnRhYmxlQ29uZmlnLnRhYmxlSWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdhcHBseWluZyBjb2x1bW4gY2hhbmdlcycsICgpID0+IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNhdmVDb2x1bW5zKCkge1xuICAgICAgICAgICAgICAgIGxldCBidG4gPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCcjcGFuZWxDb2x1bW5zQnRuJylbMF0pO1xuICAgICAgICAgICAgICAgIGJ0bi5jbGljaygpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBsZXQgc2F2ZUJ0biA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoJyNzYXZlQ29sdW1uRWRpdEJ0bicpWzBdKTtcbiAgICAgICAgICAgICAgICBzYXZlQnRuLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdCgnc2F2ZXMgdGhlIHRhYmxlIGNvbHVtbiBwcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgc2F2ZUNvbHVtbnMoKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0YWJsZVByZWZlcmVuY2VzU2VydmljZS5zYXZlVGFibGVQcmVmZXJlbmNlcylcbiAgICAgICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCRzY29wZS50YWJsZUNvbmZpZy50YWJsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVQcmVmZXJlbmNlcy5jb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVQcmVmZXJlbmNlcy5ncm91cGluZyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3RvZ2dsZXMgdGhlIHBhbmVsIGNsb3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgc2F2ZUNvbHVtbnMoKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFuZWwgPSBlbGVtZW50LmZpbmQoJ2Rpdi5jb2x1bW4tZWRpdG9yLXBhbmVsJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChwYW5lbCkuaGFzQ2xhc3MoJ2luJykpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdmZXRjaGVzIGl0ZW1zJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXRlbXNGdW5jLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgc2F2ZUNvbHVtbnMoKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHNjb3BlLml0ZW1zRnVuYykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd1cGRhdGluZyBjb2x1bW5zIGZyb20gcHJlZmVyZW5jZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Q29sdW1uSGlkZGVuKGNvbmZpZ3MsIGRhdGFJbmRleCwgaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gY29uZmlncy5maW5kKChjYykgPT4gY2MuZGF0YUluZGV4ID09PSBkYXRhSW5kZXgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjb2x1bW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNvbHVtbi5oaWRkZW4pLnRvRXF1YWwoaXNIaWRkZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdCgnbWFya3MgaGlkZGVuL25vdCBoaWRkZW4gdGhlIGNvcnJlY3QgY29sdW1ucycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNvbmZpZ3MgPSAkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5jb2x1bW5Db25maWdzO1xuICAgICAgICAgICAgICAgIHRlc3RDb2x1bW5IaWRkZW4oY29sdW1uQ29uZmlncywgJ3NvbWVWYWx1ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0ZXN0Q29sdW1uSGlkZGVuKGNvbHVtbkNvbmZpZ3MsICduYW1lJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRlc3RDb2x1bW5IaWRkZW4oY29sdW1uQ29uZmlncywgJ3Jpc2snLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc29ydHMgY29sdW1ucycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNvbmZpZ3MgPSAkc2NvcGUuJCRjaGlsZEhlYWQuZGF0YVRhYmxlQ3RybC5jb2x1bW5Db25maWdzO1xuICAgICAgICAgICAgICAgIC8vIHNoaWZ0cyB0aGUgdW5kaXNwbGF5ZWQgY29sdW1ucyB0byB0aGUgZnJvbnQgYW5kIG9yZGVycyB0aGUgZGlzcGxheWVkIG9uZXMgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnc1tjb2x1bW5Db25maWdzLmxlbmd0aCAtIDJdLmRhdGFJbmRleCkudG9FcXVhbCgnc29tZVZhbHVlJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZ3NbY29sdW1uQ29uZmlncy5sZW5ndGggLSAxXS5kYXRhSW5kZXgpLnRvRXF1YWwoJ25hbWUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdncm91cGluZycsICgpID0+IHtcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPVxuICAgICAgICAgICAgYDxzcC1kYXRhLXRhYmxlIHNwLWl0ZW1zLWZ1bmM9XCJpdGVtc0Z1bmMoc3RhcnRJZHgsIGl0ZW1zUGVyUGFnZSwgZmlsdGVyVmFsdWVzLCBzb3J0T3JkZXIsIGdyb3VwQnkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC10YWJsZS1jb25maWc9XCJ0YWJsZUNvbmZpZ1wiIC8+YCxcbiAgICAgICAgICAgIFRhYmxlUHJlZmVyZW5jZXMsIHRhYmxlUHJlZmVyZW5jZXM7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9UYWJsZVByZWZlcmVuY2VzXykgPT4ge1xuICAgICAgICAgICAgVGFibGVQcmVmZXJlbmNlcyA9IF9UYWJsZVByZWZlcmVuY2VzXztcblxuICAgICAgICAgICAgJHNjb3BlLnRhYmxlQ29uZmlnID0gbmV3IERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgaGVhZGVyRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVHcm91cEJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGdyb3VwQnlDb2x1bW46ICduYW1lJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWdLZXk6IHNvbWVDb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICAgICAgdGFibGVJZDogJ3ByZWZlcmVuY2VUYWJsZSdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBNb2NrIHRoZSB0YWJsZSBwcmVmZXJlbmNlcyB0byByZXR1cm4gbm8gZ3JvdXBpbmcgcHJlZmVyZW5jZSBieSBkZWZhdWx0LlxuICAgICAgICAgICAgbW9ja0dyb3VwaW5nUHJlZmVyZW5jZShudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0VGFibGVQcmVmZXJlbmNlcycpLmFuZC5jYWxsRmFrZSgoKSA9PiAkcS53aGVuKHRhYmxlUHJlZmVyZW5jZXMpKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb2NrIHRoZSBUYWJsZVByZWZlcmVuY2VzIHRoYXQgYXJlIHVzZWQgZm9yIHRoZSBkYXRhIHRhYmxlIHdpdGggdGhlIGdpdmVuIGdyb3VwaW5nIHNldHRpbmdzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZ3JvdXBCeSAgVGhlIG5hbWUgb2YgdGhlIGNvbHVtbiB0byBncm91cCBieS5cbiAgICAgICAgICogQHBhcmFtIGlzU2V0ICBXaGV0aGVyIHRoZSBncm91cGluZyBwcmVmZXJlbmNlIGhhcyBiZWVuIHNldCBieSBhIHVzZXIgb3Igbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbW9ja0dyb3VwaW5nUHJlZmVyZW5jZShncm91cEJ5LCBpc1NldCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogWydzb21lVmFsdWUnLCAnbmFtZScsICdyaXNrJ11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFRoZSBzZXJ2ZXIganVzdCBsZWF2ZXMgb3V0IHRoZSBncm91cGluZyBrZXkgaWYgdGhlIHByZWZlcmVuY2UgaXMgbm90IHNldC5cbiAgICAgICAgICAgIGlmIChpc1NldCkge1xuICAgICAgICAgICAgICAgIGRhdGEuZ3JvdXBpbmcgPSBncm91cEJ5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YWJsZVByZWZlcmVuY2VzID0gbmV3IFRhYmxlUHJlZmVyZW5jZXMoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgndXNlcyBkZWZhdWx0IGdyb3VwaW5nIGlmIG5vIGdyb3VwaW5nIHByZWZlcmVuY2UgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLml0ZW1zRnVuYykudG9IYXZlQmVlbkNhbGxlZFdpdGgoMCwgMTAsIHt9LCB1bmRlZmluZWQsICduYW1lJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIHRoZSBudWxsIGdyb3VwaW5nIHByZWZlcmVuY2UgaW5zdGVhZCBvZiBkZWZhdWx0IGdyb3VwaW5nIGlmIHNwZWNpZmllZCcsICgpID0+IHtcbiAgICAgICAgICAgIG1vY2tHcm91cGluZ1ByZWZlcmVuY2UobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAxMCwge30sIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIHRoZSBub24tbnVsbCBncm91cGluZyBwcmVmZXJlbmNlIGluc3RlYWQgb2YgZGVmYXVsdCBncm91cGluZyBpZiBzcGVjaWZpZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrR3JvdXBpbmdQcmVmZXJlbmNlKCdyaXNrJywgdHJ1ZSk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuaXRlbXNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAxMCwge30sIHVuZGVmaW5lZCwgJ3Jpc2snKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
