System.register(['test/js/TestInitializer', 'common/dataview/table/TableModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var tableModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewTableTableModule) {
            tableModule = _commonDataviewTableTableModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('TableColumnPreferenceEditorDirective', function () {
                var $compile = undefined,
                    scope = undefined,
                    element = undefined,
                    controller = undefined,
                    $controller = undefined,
                    $animate = undefined,
                    testColumnConfigs = undefined,
                    testService = undefined,
                    ctrl = undefined,
                    tableColumnPreferences = ['col_header_phone', 'col_header_name'],
                    elementDefinition = '<sp-table-column-preference-editor ' + 'sp-table-column-preferences="tableColumnPreferences"' + 'sp-table-id="spTableId"' + 'sp-column-configs="columnConfigs"' + 'sp-displayed="columnEditorDisplayed"' + 'sp-apply-func="applyColumnChanges(columnPreferences)"' + 'sp-id="columnEditorDiv"/>';

                beforeEach(module(tableModule, testModule, 'ngAnimateMock'));

                beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_, ColumnConfig, _testService_, _$animate_) {
                    $compile = _$compile_;
                    scope = _$rootScope_.$new();
                    $controller = _$controller_;
                    testService = _testService_;
                    $animate = _$animate_;

                    // setup test data
                    testColumnConfigs = [new ColumnConfig({
                        headerKey: 'col_header_name',
                        dataIndex: 'name'
                    }), new ColumnConfig({
                        headerKey: 'col_header_phone',
                        dataIndex: 'phone'
                    }), new ColumnConfig({
                        headerKey: 'col_header_department',
                        dataIndex: 'department'
                    }), new ColumnConfig({
                        dataIndex: 'accountId',
                        fieldOnly: true
                    }), new ColumnConfig({
                        headerKey: 'col_header_decision',
                        dataIndex: 'decision',
                        fixed: ColumnConfig.FixedPosition.Right
                    })];

                    // setup scope
                    scope.tableColumnPreferences = tableColumnPreferences;
                    scope.spTableId = 'testColumnPreferenceEditorId';
                    scope.columnConfigs = testColumnConfigs;
                    scope.columnEditorDisplayed = false;
                    scope.applyColumnChanges = testService.createPromiseSpy(false, {}, {});

                    element = createElement();
                    ctrl = element.isolateScope().ctrl;
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createController(tableColumnPreferences, columnConfigs) {
                    var newCtrl = $controller('TableColumnPreferenceEditorDirectiveCtrl', {
                        $scope: scope
                    }, {
                        id: 'testId',
                        spTableColumnPreferences: tableColumnPreferences,
                        spColumnConfigs: columnConfigs,
                        spApplyFunc: scope.applyColumnChanges,
                        spDisplayed: true
                    });
                    newCtrl.$onInit();
                    return newCtrl;
                }

                function createElement() {
                    var element = angular.element(elementDefinition);
                    $compile(element)(scope);
                    scope.$apply();
                    return element;
                }

                it('should start out collapsed', function () {
                    $animate.flush();
                    expect(element.hasClass('in')).toEqual(false);
                });

                it('should expand when flag is toggled', function () {
                    scope.columnEditorDisplayed = true;
                    $animate.flush();
                    expect(element.hasClass('in')).toEqual(true);
                });

                it('should show correct column cards', function () {
                    scope.columnEditorDisplayed = true;
                    $animate.flush();
                    expect(element.find('.column-edit-card').length).toEqual(3);
                    expect(element.find('.card-title')[0].innerText.trim()).toEqual('name');
                    expect(element.find('.card-title')[1].innerText.trim()).toEqual('phone');
                    expect(element.find('.card-title')[2].innerText.trim()).toEqual('decision');
                    expect(element.find('.column-edit-card button')[2].disabled).toEqual(true);
                });

                it('should show correct available items in dropdown', function () {
                    scope.columnEditorDisplayed = true;
                    $animate.flush();
                    expect(element.find('.add-column-dropdown-menu > li').length).toEqual(1);
                    expect(element.find('.add-column-dropdown-menu > li > a')[0].innerText.trim()).toEqual('department');
                });

                it('clicking add menu item should call ctrl addColumn', function () {
                    spyOn(ctrl, 'addColumn');
                    var addMenuItem = element.find('.add-column-dropdown-menu > li > a');
                    angular.element(addMenuItem).click();
                    expect(ctrl.addColumn).toHaveBeenCalled();
                });

                it('clicking remove button should call ctrl removeColumn', function () {
                    spyOn(ctrl, 'removeColumn');
                    var removeBtn = element.find('.card-link button')[0];
                    angular.element(removeBtn).click();
                    expect(ctrl.removeColumn).toHaveBeenCalled();
                });

                it('clicking cancel button should call ctrl cancel', function () {
                    spyOn(ctrl, 'cancel');
                    element.find('#cancelColumnEditBtn').click();
                    expect(ctrl.cancel).toHaveBeenCalled();
                });

                it('clicking save button should call ctrl save', function () {
                    spyOn(ctrl, 'save');
                    element.find('#saveColumnEditBtn').click();
                    expect(ctrl.save).toHaveBeenCalled();
                });

                describe('TableColumnPreferenceEditorDirectiveCtrl', function () {

                    beforeEach(function () {
                        controller = createController(tableColumnPreferences, testColumnConfigs);
                        spyOn(controller, 'initialize');
                    });

                    it('throws if spColumnConfigs or spTableColumnPreferences is not provided', function () {
                        expect(createController).toThrow();
                    });

                    it('initializes column lists', function () {
                        // selectedColumns list should get set
                        expect(controller.selectedColumns).toBeDefined();
                        expect(controller.selectedColumns.length).toEqual(2);

                        // availableColumns list should get set
                        expect(controller.availableColumns).toBeDefined();
                        expect(controller.availableColumns.length).toEqual(1);

                        // fixedRightColumns list should get set
                        expect(controller.fixedRightColumns).toBeDefined();
                        expect(controller.fixedRightColumns.length).toEqual(1);
                    });

                    it('addColumn adds to selectedColumns list and removes from available columns list', function () {
                        controller.addColumn(controller.availableColumns[0]);
                        expect(controller.selectedColumns.length).toEqual(3);
                        expect(controller.availableColumns.length).toEqual(0);
                    });

                    it('removeColumn adds to the availableColumns list and removes from the selectedColumns list', function () {
                        controller.removeColumn(controller.selectedColumns[0]);
                        expect(controller.selectedColumns.length).toEqual(1);
                        expect(controller.availableColumns.length).toEqual(2);
                    });

                    it('cancel calls spApplyFunc and then re-initializes directive', function () {
                        controller.cancel();
                        expect(scope.applyColumnChanges).toHaveBeenCalled();
                        scope.$apply();

                        expect(controller.initialize).toHaveBeenCalled();
                    });

                    it('save calls spApplyFunc with the selected column ids and then re-initializes directive', function () {
                        var selectedColumnIds = controller.selectedColumns.map(function (cc) {
                            return cc.getUniqueId();
                        });

                        controller.save();
                        expect(scope.applyColumnChanges).toHaveBeenCalledWith({ columnPreferences: selectedColumnIds });
                        scope.$apply();

                        expect(controller.initialize).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy90YWJsZS9UYWJsZUNvbHVtblByZWZlcmVuY2VFZGl0b3JEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBS3ZIOztJQUVBLElBQUksYUFBYTtJQUNqQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsY0FBYyxnQ0FBZ0M7V0FDL0MsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx3Q0FBd0MsWUFBTTtnQkFDbkQsSUFBSSxXQUFRO29CQUFFLFFBQUs7b0JBQUUsVUFBTztvQkFBRSxhQUFVO29CQUFFLGNBQVc7b0JBQUUsV0FBUTtvQkFBRSxvQkFBaUI7b0JBQUUsY0FBVztvQkFBRSxPQUFJO29CQUNqRyx5QkFBeUIsQ0FBQyxvQkFBb0I7b0JBQzlDLG9CQUFvQix3Q0FDaEIseURBQ0EsNEJBQ0Esc0NBQ0EseUNBQ0EsMERBQ0E7O2dCQUVSLFdBQVcsT0FBTyxhQUFhLFlBQVk7O2dCQUUzQyxXQUFXLE9BQU8sVUFBUyxZQUFZLGNBQWMsZUFBZSxjQUFjLGVBQWUsWUFBWTtvQkFDekcsV0FBVztvQkFDWCxRQUFRLGFBQWE7b0JBQ3JCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxXQUFXOzs7b0JBR1gsb0JBQW9CLENBQ2hCLElBQUksYUFBYTt3QkFDYixXQUFXO3dCQUNYLFdBQVc7d0JBRWYsSUFBSSxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsV0FBVzt3QkFFZixJQUFJLGFBQWE7d0JBQ2IsV0FBVzt3QkFDWCxXQUFXO3dCQUVmLElBQUksYUFBYTt3QkFDYixXQUFXO3dCQUNYLFdBQVc7d0JBRWYsSUFBSSxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxPQUFPLGFBQWEsY0FBYzs7OztvQkFJMUMsTUFBTSx5QkFBeUI7b0JBQy9CLE1BQU0sWUFBWTtvQkFDbEIsTUFBTSxnQkFBZ0I7b0JBQ3RCLE1BQU0sd0JBQXdCO29CQUM5QixNQUFNLHFCQUFxQixZQUFZLGlCQUFpQixPQUFPLElBQUk7O29CQUVuRSxVQUFVO29CQUNWLE9BQU8sUUFBUSxlQUFlOzs7Z0JBR2xDLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUSxRQUFRLFNBQVM7Ozs7Z0JBSWpDLFNBQVMsaUJBQWlCLHdCQUF3QixlQUFlO29CQUM3RCxJQUFJLFVBQVUsWUFBWSw0Q0FDdEI7d0JBQ0ksUUFBUTt1QkFFWjt3QkFDSSxJQUFJO3dCQUNKLDBCQUEwQjt3QkFDMUIsaUJBQWlCO3dCQUNqQixhQUFhLE1BQU07d0JBQ25CLGFBQWE7O29CQUdyQixRQUFRO29CQUNSLE9BQU87OztnQkFHWCxTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixNQUFNO29CQUNOLE9BQU87OztnQkFHWCxHQUFHLDhCQUE4QixZQUFNO29CQUNuQyxTQUFTO29CQUNULE9BQU8sUUFBUSxTQUFTLE9BQU8sUUFBUTs7O2dCQUczQyxHQUFHLHNDQUFzQyxZQUFNO29CQUMzQyxNQUFNLHdCQUF3QjtvQkFDOUIsU0FBUztvQkFDVCxPQUFPLFFBQVEsU0FBUyxPQUFPLFFBQVE7OztnQkFHM0MsR0FBRyxvQ0FBb0MsWUFBTTtvQkFDekMsTUFBTSx3QkFBd0I7b0JBQzlCLFNBQVM7b0JBQ1QsT0FBTyxRQUFRLEtBQUsscUJBQXFCLFFBQVEsUUFBUTtvQkFDekQsT0FBTyxRQUFRLEtBQUssZUFBZSxHQUFHLFVBQVUsUUFBUSxRQUFRO29CQUNoRSxPQUFPLFFBQVEsS0FBSyxlQUFlLEdBQUcsVUFBVSxRQUFRLFFBQVE7b0JBQ2hFLE9BQU8sUUFBUSxLQUFLLGVBQWUsR0FBRyxVQUFVLFFBQVEsUUFBUTtvQkFDaEUsT0FBTyxRQUFRLEtBQUssNEJBQTRCLEdBQUcsVUFBVSxRQUFROzs7Z0JBR3pFLEdBQUcsbURBQW1ELFlBQU07b0JBQ3hELE1BQU0sd0JBQXdCO29CQUM5QixTQUFTO29CQUNULE9BQU8sUUFBUSxLQUFLLGtDQUFrQyxRQUFRLFFBQVE7b0JBQ3RFLE9BQU8sUUFBUSxLQUFLLHNDQUFzQyxHQUFHLFVBQVUsUUFBUSxRQUFROzs7Z0JBRzNGLEdBQUcscURBQXFELFlBQU07b0JBQzFELE1BQU0sTUFBTTtvQkFDWixJQUFJLGNBQWMsUUFBUSxLQUFLO29CQUMvQixRQUFRLFFBQVEsYUFBYTtvQkFDN0IsT0FBTyxLQUFLLFdBQVc7OztnQkFHM0IsR0FBRyx3REFBd0QsWUFBTTtvQkFDN0QsTUFBTSxNQUFNO29CQUNaLElBQUksWUFBWSxRQUFRLEtBQUsscUJBQXFCO29CQUNsRCxRQUFRLFFBQVEsV0FBVztvQkFDM0IsT0FBTyxLQUFLLGNBQWM7OztnQkFHOUIsR0FBRyxrREFBa0QsWUFBTTtvQkFDdkQsTUFBTSxNQUFNO29CQUNaLFFBQVEsS0FBSyx3QkFBd0I7b0JBQ3JDLE9BQU8sS0FBSyxRQUFROzs7Z0JBR3hCLEdBQUcsOENBQThDLFlBQU07b0JBQ25ELE1BQU0sTUFBTTtvQkFDWixRQUFRLEtBQUssc0JBQXNCO29CQUNuQyxPQUFPLEtBQUssTUFBTTs7O2dCQUd0QixTQUFTLDRDQUE0QyxZQUFNOztvQkFFdkQsV0FBVyxZQUFNO3dCQUNiLGFBQWEsaUJBQWlCLHdCQUF3Qjt3QkFDdEQsTUFBTSxZQUFZOzs7b0JBR3RCLEdBQUcseUVBQXlFLFlBQU07d0JBQzlFLE9BQU8sa0JBQWtCOzs7b0JBRzdCLEdBQUcsNEJBQTRCLFlBQU07O3dCQUVqQyxPQUFPLFdBQVcsaUJBQWlCO3dCQUNuQyxPQUFPLFdBQVcsZ0JBQWdCLFFBQVEsUUFBUTs7O3dCQUdsRCxPQUFPLFdBQVcsa0JBQWtCO3dCQUNwQyxPQUFPLFdBQVcsaUJBQWlCLFFBQVEsUUFBUTs7O3dCQUduRCxPQUFPLFdBQVcsbUJBQW1CO3dCQUNyQyxPQUFPLFdBQVcsa0JBQWtCLFFBQVEsUUFBUTs7O29CQUl4RCxHQUFHLGtGQUFrRixZQUFNO3dCQUN2RixXQUFXLFVBQVUsV0FBVyxpQkFBaUI7d0JBQ2pELE9BQU8sV0FBVyxnQkFBZ0IsUUFBUSxRQUFRO3dCQUNsRCxPQUFPLFdBQVcsaUJBQWlCLFFBQVEsUUFBUTs7O29CQUd2RCxHQUFHLDRGQUE0RixZQUFNO3dCQUNqRyxXQUFXLGFBQWEsV0FBVyxnQkFBZ0I7d0JBQ25ELE9BQU8sV0FBVyxnQkFBZ0IsUUFBUSxRQUFRO3dCQUNsRCxPQUFPLFdBQVcsaUJBQWlCLFFBQVEsUUFBUTs7O29CQUd2RCxHQUFHLDhEQUE4RCxZQUFNO3dCQUNuRSxXQUFXO3dCQUNYLE9BQU8sTUFBTSxvQkFBb0I7d0JBQ2pDLE1BQU07O3dCQUVOLE9BQU8sV0FBVyxZQUFZOzs7b0JBR2xDLEdBQUcseUZBQXlGLFlBQU07d0JBQzlGLElBQUksb0JBQW9CLFdBQVcsZ0JBQWdCLElBQUksVUFBQyxJQUFFOzRCQUMxQyxPQUQrQyxHQUFHOzs7d0JBRWxFLFdBQVc7d0JBQ1gsT0FBTyxNQUFNLG9CQUFvQixxQkFBcUIsRUFBRSxtQkFBbUI7d0JBQzNFLE1BQU07O3dCQUVOLE9BQU8sV0FBVyxZQUFZOzs7Ozs7R0FRdkMiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L3RhYmxlL1RhYmxlQ29sdW1uUHJlZmVyZW5jZUVkaXRvckRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhYmxlTW9kdWxlIGZyb20gJ2NvbW1vbi9kYXRhdmlldy90YWJsZS9UYWJsZU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnVGFibGVDb2x1bW5QcmVmZXJlbmNlRWRpdG9yRGlyZWN0aXZlJywgKCkgPT4ge1xuICAgIGxldCAkY29tcGlsZSwgc2NvcGUsIGVsZW1lbnQsIGNvbnRyb2xsZXIsICRjb250cm9sbGVyLCAkYW5pbWF0ZSwgdGVzdENvbHVtbkNvbmZpZ3MsIHRlc3RTZXJ2aWNlLCBjdHJsLFxuICAgICAgICB0YWJsZUNvbHVtblByZWZlcmVuY2VzID0gWydjb2xfaGVhZGVyX3Bob25lJywgJ2NvbF9oZWFkZXJfbmFtZSddLFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbiA9ICc8c3AtdGFibGUtY29sdW1uLXByZWZlcmVuY2UtZWRpdG9yICcgK1xuICAgICAgICAgICAgJ3NwLXRhYmxlLWNvbHVtbi1wcmVmZXJlbmNlcz1cInRhYmxlQ29sdW1uUHJlZmVyZW5jZXNcIicgK1xuICAgICAgICAgICAgJ3NwLXRhYmxlLWlkPVwic3BUYWJsZUlkXCInICtcbiAgICAgICAgICAgICdzcC1jb2x1bW4tY29uZmlncz1cImNvbHVtbkNvbmZpZ3NcIicgK1xuICAgICAgICAgICAgJ3NwLWRpc3BsYXllZD1cImNvbHVtbkVkaXRvckRpc3BsYXllZFwiJyArXG4gICAgICAgICAgICAnc3AtYXBwbHktZnVuYz1cImFwcGx5Q29sdW1uQ2hhbmdlcyhjb2x1bW5QcmVmZXJlbmNlcylcIicgK1xuICAgICAgICAgICAgJ3NwLWlkPVwiY29sdW1uRWRpdG9yRGl2XCIvPic7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YWJsZU1vZHVsZSwgdGVzdE1vZHVsZSwgJ25nQW5pbWF0ZU1vY2snKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbXBpbGVfLCBfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8sIENvbHVtbkNvbmZpZywgX3Rlc3RTZXJ2aWNlXywgXyRhbmltYXRlXykge1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRhbmltYXRlID0gXyRhbmltYXRlXztcblxuICAgICAgICAvLyBzZXR1cCB0ZXN0IGRhdGFcbiAgICAgICAgdGVzdENvbHVtbkNvbmZpZ3MgPSBbXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJLZXk6ICdjb2xfaGVhZGVyX25hbWUnLFxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ25hbWUnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgICAgIGhlYWRlcktleTogJ2NvbF9oZWFkZXJfcGhvbmUnLFxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ3Bob25lJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJLZXk6ICdjb2xfaGVhZGVyX2RlcGFydG1lbnQnLFxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2RlcGFydG1lbnQnXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2FjY291bnRJZCcsXG4gICAgICAgICAgICAgICAgZmllbGRPbmx5OiB0cnVlXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe1xuICAgICAgICAgICAgICAgIGhlYWRlcktleTogJ2NvbF9oZWFkZXJfZGVjaXNpb24nLFxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2RlY2lzaW9uJyxcbiAgICAgICAgICAgICAgICBmaXhlZDogQ29sdW1uQ29uZmlnLkZpeGVkUG9zaXRpb24uUmlnaHRcbiAgICAgICAgICAgIH0pXTtcblxuICAgICAgICAvLyBzZXR1cCBzY29wZVxuICAgICAgICBzY29wZS50YWJsZUNvbHVtblByZWZlcmVuY2VzID0gdGFibGVDb2x1bW5QcmVmZXJlbmNlcztcbiAgICAgICAgc2NvcGUuc3BUYWJsZUlkID0gJ3Rlc3RDb2x1bW5QcmVmZXJlbmNlRWRpdG9ySWQnO1xuICAgICAgICBzY29wZS5jb2x1bW5Db25maWdzID0gdGVzdENvbHVtbkNvbmZpZ3M7XG4gICAgICAgIHNjb3BlLmNvbHVtbkVkaXRvckRpc3BsYXllZCA9IGZhbHNlO1xuICAgICAgICBzY29wZS5hcHBseUNvbHVtbkNoYW5nZXMgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7fSwge30pO1xuXG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGN0cmwgPSBlbGVtZW50Lmlzb2xhdGVTY29wZSgpLmN0cmw7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcih0YWJsZUNvbHVtblByZWZlcmVuY2VzLCBjb2x1bW5Db25maWdzKSB7XG4gICAgICAgIGxldCBuZXdDdHJsID0gJGNvbnRyb2xsZXIoJ1RhYmxlQ29sdW1uUHJlZmVyZW5jZUVkaXRvckRpcmVjdGl2ZUN0cmwnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICRzY29wZTogc2NvcGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0ZXN0SWQnLFxuICAgICAgICAgICAgICAgIHNwVGFibGVDb2x1bW5QcmVmZXJlbmNlczogdGFibGVDb2x1bW5QcmVmZXJlbmNlcyxcbiAgICAgICAgICAgICAgICBzcENvbHVtbkNvbmZpZ3M6IGNvbHVtbkNvbmZpZ3MsXG4gICAgICAgICAgICAgICAgc3BBcHBseUZ1bmM6IHNjb3BlLmFwcGx5Q29sdW1uQ2hhbmdlcyxcbiAgICAgICAgICAgICAgICBzcERpc3BsYXllZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBuZXdDdHJsLiRvbkluaXQoKTtcbiAgICAgICAgcmV0dXJuIG5ld0N0cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHN0YXJ0IG91dCBjb2xsYXBzZWQnLCAoKSA9PiB7XG4gICAgICAgICRhbmltYXRlLmZsdXNoKCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50Lmhhc0NsYXNzKCdpbicpKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZXhwYW5kIHdoZW4gZmxhZyBpcyB0b2dnbGVkJywgKCkgPT4ge1xuICAgICAgICBzY29wZS5jb2x1bW5FZGl0b3JEaXNwbGF5ZWQgPSB0cnVlO1xuICAgICAgICAkYW5pbWF0ZS5mbHVzaCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygnaW4nKSkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBjb3JyZWN0IGNvbHVtbiBjYXJkcycsICgpID0+IHtcbiAgICAgICAgc2NvcGUuY29sdW1uRWRpdG9yRGlzcGxheWVkID0gdHJ1ZTtcbiAgICAgICAgJGFuaW1hdGUuZmx1c2goKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmNvbHVtbi1lZGl0LWNhcmQnKS5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5jYXJkLXRpdGxlJylbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgnbmFtZScpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuY2FyZC10aXRsZScpWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3Bob25lJyk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5jYXJkLXRpdGxlJylbMl0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgnZGVjaXNpb24nKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmNvbHVtbi1lZGl0LWNhcmQgYnV0dG9uJylbMl0uZGlzYWJsZWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNob3cgY29ycmVjdCBhdmFpbGFibGUgaXRlbXMgaW4gZHJvcGRvd24nLCAoKSA9PiB7XG4gICAgICAgIHNjb3BlLmNvbHVtbkVkaXRvckRpc3BsYXllZCA9IHRydWU7XG4gICAgICAgICRhbmltYXRlLmZsdXNoKCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5hZGQtY29sdW1uLWRyb3Bkb3duLW1lbnUgPiBsaScpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmFkZC1jb2x1bW4tZHJvcGRvd24tbWVudSA+IGxpID4gYScpWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ2RlcGFydG1lbnQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdjbGlja2luZyBhZGQgbWVudSBpdGVtIHNob3VsZCBjYWxsIGN0cmwgYWRkQ29sdW1uJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjdHJsLCAnYWRkQ29sdW1uJyk7XG4gICAgICAgIGxldCBhZGRNZW51SXRlbSA9IGVsZW1lbnQuZmluZCgnLmFkZC1jb2x1bW4tZHJvcGRvd24tbWVudSA+IGxpID4gYScpO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYWRkTWVudUl0ZW0pLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmFkZENvbHVtbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NsaWNraW5nIHJlbW92ZSBidXR0b24gc2hvdWxkIGNhbGwgY3RybCByZW1vdmVDb2x1bW4nLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGN0cmwsICdyZW1vdmVDb2x1bW4nKTtcbiAgICAgICAgbGV0IHJlbW92ZUJ0biA9IGVsZW1lbnQuZmluZCgnLmNhcmQtbGluayBidXR0b24nKVswXTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KHJlbW92ZUJ0bikuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGN0cmwucmVtb3ZlQ29sdW1uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xpY2tpbmcgY2FuY2VsIGJ1dHRvbiBzaG91bGQgY2FsbCBjdHJsIGNhbmNlbCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oY3RybCwgJ2NhbmNlbCcpO1xuICAgICAgICBlbGVtZW50LmZpbmQoJyNjYW5jZWxDb2x1bW5FZGl0QnRuJykuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuY2FuY2VsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xpY2tpbmcgc2F2ZSBidXR0b24gc2hvdWxkIGNhbGwgY3RybCBzYXZlJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjdHJsLCAnc2F2ZScpO1xuICAgICAgICBlbGVtZW50LmZpbmQoJyNzYXZlQ29sdW1uRWRpdEJ0bicpLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLnNhdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdUYWJsZUNvbHVtblByZWZlcmVuY2VFZGl0b3JEaXJlY3RpdmVDdHJsJywgKCkgPT4ge1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IGNyZWF0ZUNvbnRyb2xsZXIodGFibGVDb2x1bW5QcmVmZXJlbmNlcywgdGVzdENvbHVtbkNvbmZpZ3MpO1xuICAgICAgICAgICAgc3B5T24oY29udHJvbGxlciwgJ2luaXRpYWxpemUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyBpZiBzcENvbHVtbkNvbmZpZ3Mgb3Igc3BUYWJsZUNvbHVtblByZWZlcmVuY2VzIGlzIG5vdCBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjcmVhdGVDb250cm9sbGVyKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBjb2x1bW4gbGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBzZWxlY3RlZENvbHVtbnMgbGlzdCBzaG91bGQgZ2V0IHNldFxuICAgICAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuc2VsZWN0ZWRDb2x1bW5zKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCkudG9FcXVhbCgyKTtcblxuICAgICAgICAgICAgLy8gYXZhaWxhYmxlQ29sdW1ucyBsaXN0IHNob3VsZCBnZXQgc2V0XG4gICAgICAgICAgICBleHBlY3QoY29udHJvbGxlci5hdmFpbGFibGVDb2x1bW5zKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuYXZhaWxhYmxlQ29sdW1ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cbiAgICAgICAgICAgIC8vIGZpeGVkUmlnaHRDb2x1bW5zIGxpc3Qgc2hvdWxkIGdldCBzZXRcbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLmZpeGVkUmlnaHRDb2x1bW5zKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuZml4ZWRSaWdodENvbHVtbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdhZGRDb2x1bW4gYWRkcyB0byBzZWxlY3RlZENvbHVtbnMgbGlzdCBhbmQgcmVtb3ZlcyBmcm9tIGF2YWlsYWJsZSBjb2x1bW5zIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmFkZENvbHVtbihjb250cm9sbGVyLmF2YWlsYWJsZUNvbHVtbnNbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRyb2xsZXIuc2VsZWN0ZWRDb2x1bW5zLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLmF2YWlsYWJsZUNvbHVtbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVtb3ZlQ29sdW1uIGFkZHMgdG8gdGhlIGF2YWlsYWJsZUNvbHVtbnMgbGlzdCBhbmQgcmVtb3ZlcyBmcm9tIHRoZSBzZWxlY3RlZENvbHVtbnMgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlQ29sdW1uKGNvbnRyb2xsZXIuc2VsZWN0ZWRDb2x1bW5zWzBdKTtcbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLnNlbGVjdGVkQ29sdW1ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoY29udHJvbGxlci5hdmFpbGFibGVDb2x1bW5zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbmNlbCBjYWxscyBzcEFwcGx5RnVuYyBhbmQgdGhlbiByZS1pbml0aWFsaXplcyBkaXJlY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcGx5Q29sdW1uQ2hhbmdlcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLmluaXRpYWxpemUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NhdmUgY2FsbHMgc3BBcHBseUZ1bmMgd2l0aCB0aGUgc2VsZWN0ZWQgY29sdW1uIGlkcyBhbmQgdGhlbiByZS1pbml0aWFsaXplcyBkaXJlY3RpdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb2x1bW5JZHMgPSBjb250cm9sbGVyLnNlbGVjdGVkQ29sdW1ucy5tYXAoKGNjKSA9PiBjYy5nZXRVbmlxdWVJZCgpKTtcblxuICAgICAgICAgICAgY29udHJvbGxlci5zYXZlKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwbHlDb2x1bW5DaGFuZ2VzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGNvbHVtblByZWZlcmVuY2VzOiBzZWxlY3RlZENvbHVtbklkcyB9KTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29udHJvbGxlci5pbml0aWFsaXplKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
