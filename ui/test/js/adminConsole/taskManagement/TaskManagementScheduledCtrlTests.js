System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js', 'common/dataview/DataViewModule', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var taskManagementModule, dataViewModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModuleJs) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModuleJs['default'];
        }, function (_commonDataviewDataViewModule) {
            dataViewModule = _commonDataviewDataViewModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('TaskManagementScheduledCtrl', function () {

                var taskScheduleService = undefined,
                    DataRefreshTrigger = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined;

                beforeEach(module(taskManagementModule, dataViewModule, testModule));
                /* jshint maxparams: 6 */
                beforeEach(inject(function (_taskScheduleService_, _DataRefreshTrigger_, _testService_, _$controller_, _$rootScope_, _SortOrder_) {

                    taskScheduleService = _taskScheduleService_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                }));

                function createController() {
                    var controller = $controller('TaskManagementScheduledCtrl', {
                        taskScheduleService: taskScheduleService,
                        SortOrder: SortOrder,
                        $scope: $rootScope.$new()
                    }),

                    // create the parent taskManagementPageCtrl and set it on this controller
                    taskPageCtrl = $controller('TaskManagementPageCtrl', {});
                    controller.$scope.$parent.ctrl = taskPageCtrl;
                    return controller;
                }

                describe('getScheduledItems', function () {

                    beforeEach(function () {

                        spyOn(taskScheduleService, 'getTaskSchedules').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                    });

                    it('should handle a default request', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.getScheduledItems(0, 10, null, sort);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, undefined);
                    });

                    it('should set a default sort', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        sort.addSort('nextExecution', true);

                        ctrl.getScheduledItems(0, 10, null, null);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, undefined);
                    });

                    it('should accept an excludeImmediate request', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.getScheduledItems(0, 10, null, sort, false);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should accept an excludeImmediate request with true', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.getScheduledItems(0, 10, null, sort, true);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should accept a request with type filter', function () {
                        var ctrl = createController(),
                            sort = new SortOrder(),
                            filters = {
                            type: {
                                operation: 'Equals',
                                value: {
                                    id: 'System',
                                    displayValue: 'System'
                                }
                            }
                        };

                        ctrl.getScheduledItems(0, 10, filters, sort, true);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith(filters, 0, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should accept a request with host filter', function () {
                        var ctrl = createController(),
                            sort = new SortOrder(),
                            filters = {
                            host: {
                                operation: 'Equals',
                                value: {
                                    id: '127.0.0.1',
                                    displayValue: '127.0.0.1'
                                }
                            }
                        };

                        ctrl.getScheduledItems(0, 10, filters, sort, true);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith(filters, 0, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should accept a request with host filter and a query', function () {
                        var ctrl = createController(),
                            sort = new SortOrder(),
                            filters = {
                            host: {
                                operation: 'Equals',
                                value: {
                                    id: '127.0.0.1',
                                    displayValue: '127.0.0.1'
                                }
                            }
                        };
                        ctrl.query = 'testName';
                        ctrl.getScheduledItems(0, 10, filters, sort, true);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith(filters, 0, 10, sort, ctrl.query, ctrl.columnConfigKey, true);
                    });

                    it('should accept a request with a query', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.query = 'testName';
                        ctrl.getScheduledItems(0, 10, null, sort, true);

                        expect(taskScheduleService.getTaskSchedules).toHaveBeenCalledWith({}, 0, 10, sort, ctrl.query, ctrl.columnConfigKey, true);
                    });

                    it('should populate tabs on a request', function () {
                        var ctrl = createController();
                        spyOn(ctrl.$scope.$parent.ctrl, 'populateTabCounts');
                        ctrl.getScheduledItems(10, 10, null, null);

                        // just need to check that the method was called
                        expect(ctrl.$scope.$parent.ctrl.populateTabCounts).toHaveBeenCalled();
                    });
                });

                describe('refresh', function () {

                    it('should trigger a table refresh', function () {
                        var ctrl = createController();

                        spyOn(ctrl.tableConfig.refreshTrigger, 'refresh');
                        spyOn(ctrl.tableConfig.pageState.pagingData, 'resetCurrentPage');

                        ctrl.refresh();

                        expect(ctrl.tableConfig.refreshTrigger.refresh).toHaveBeenCalled();
                        expect(ctrl.tableConfig.pageState.pagingData.resetCurrentPage).toHaveBeenCalled();
                    });
                });

                describe('onQueryKeyPress', function () {

                    var ENTER_KEY = 13,
                        A_KEY = 65;

                    it('should refresh the table when enter is pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: ENTER_KEY
                        };

                        spyOn(ctrl, 'refresh');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.refresh).toHaveBeenCalled();
                    });

                    it('should not refresh the table when enter is not pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: A_KEY
                        };

                        spyOn(ctrl, 'refresh');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.refresh).not.toHaveBeenCalled();
                    });

                    it('should reset current page when enter is pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: ENTER_KEY
                        };

                        spyOn(ctrl.getDataTableConfig().getPagingData(), 'resetCurrentPage');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.getDataTableConfig().getPagingData().resetCurrentPage).toHaveBeenCalled();
                    });

                    it('should not reset current page when enter is not pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: A_KEY
                        };

                        spyOn(ctrl.getDataTableConfig().getPagingData(), 'resetCurrentPage');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.getDataTableConfig().getPagingData().resetCurrentPage).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFNjaGVkdWxlZEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdURBQXVELGtDQUFrQyx1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUszSzs7SUFFQSxJQUFJLHNCQUFzQixnQkFBZ0I7SUFDMUMsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbURBQW1EO1lBQ3pHLHVCQUF1QixrREFBa0Q7V0FDMUUsVUFBVSwrQkFBK0I7WUFDeEMsaUJBQWlCLDhCQUE4QjtXQUNoRCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBUjdCLFNBQVMsK0JBQStCLFlBQU07O2dCQUUxQyxJQUFJLHNCQUFtQjtvQkFBRSxxQkFBa0I7b0JBQUUsY0FBVztvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsWUFBUzs7Z0JBRTVGLFdBQVcsT0FBTyxzQkFBc0IsZ0JBQWdCOztnQkFFeEQsV0FBVyxPQUFPLFVBQUMsdUJBQXVCLHNCQUFzQixlQUM3QyxlQUFlLGNBQWMsYUFBZ0I7O29CQUU1RCxzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsWUFBWTs7O2dCQUdoQixTQUFTLG1CQUFtQjtvQkFDeEIsSUFBSSxhQUFhLFlBQVksK0JBQStCO3dCQUN4RCxxQkFBcUI7d0JBQ3JCLFdBQVc7d0JBQ1gsUUFBUSxXQUFXOzs7O29CQUd2QixlQUFlLFlBQVksMEJBQTBCO29CQUNyRCxXQUFXLE9BQU8sUUFBUSxPQUFPO29CQUNqQyxPQUFPOzs7Z0JBR1gsU0FBUyxxQkFBcUIsWUFBTTs7b0JBRWhDLFdBQVcsWUFBTTs7d0JBRWIsTUFBTSxxQkFBcUIsb0JBQW9CLElBQUksWUFDL0MsWUFBWSxjQUFjLE9BQU8sRUFBQyxPQUFPLEdBQUcsU0FBUzs7O29CQUk3RCxHQUFHLG1DQUFtQyxZQUFNO3dCQUN4QyxJQUFJLE9BQU87NEJBQ1AsT0FBTyxJQUFJOzt3QkFFZixLQUFLLGtCQUFrQixHQUFHLElBQUksTUFBTTs7Ozt3QkFJcEMsT0FBTyxvQkFBb0Isa0JBQWtCLHFCQUN6QyxJQUFJLEdBQUcsSUFBSSxNQUFNLFdBQVcsS0FBSyxpQkFBaUI7OztvQkFJMUQsR0FBRyw2QkFBNkIsWUFBTTt3QkFDbEMsSUFBSSxPQUFPOzRCQUNQLE9BQU8sSUFBSTs7d0JBRWYsS0FBSyxRQUFRLGlCQUFpQjs7d0JBRTlCLEtBQUssa0JBQWtCLEdBQUcsSUFBSSxNQUFNOzt3QkFFcEMsT0FBTyxvQkFBb0Isa0JBQWtCLHFCQUN6QyxJQUFJLEdBQUcsSUFBSSxNQUFNLFdBQVcsS0FBSyxpQkFBaUI7OztvQkFLMUQsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsSUFBSSxPQUFPOzRCQUNQLE9BQU8sSUFBSTs7d0JBRWYsS0FBSyxrQkFBa0IsR0FBRyxJQUFJLE1BQU0sTUFBTTs7d0JBRTFDLE9BQU8sb0JBQW9CLGtCQUFrQixxQkFDekMsSUFBSSxHQUFHLElBQUksTUFBTSxXQUFXLEtBQUssaUJBQWlCOzs7b0JBSzFELEdBQUcsdURBQXVELFlBQU07d0JBQzVELElBQUksT0FBTzs0QkFDUCxPQUFPLElBQUk7O3dCQUVmLEtBQUssa0JBQWtCLEdBQUcsSUFBSSxNQUFNLE1BQU07O3dCQUUxQyxPQUFPLG9CQUFvQixrQkFBa0IscUJBQ3pDLElBQUksR0FBRyxJQUFJLE1BQU0sV0FBVyxLQUFLLGlCQUFpQjs7O29CQUsxRCxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxJQUFJLE9BQU87NEJBQ1AsT0FBTyxJQUFJOzRCQUNYLFVBQVU7NEJBQ04sTUFBTTtnQ0FDRixXQUFXO2dDQUNYLE9BQU87b0NBQ0gsSUFBSTtvQ0FDSixjQUFjOzs7Ozt3QkFLOUIsS0FBSyxrQkFBa0IsR0FBRyxJQUFJLFNBQVMsTUFBTTs7d0JBRTdDLE9BQU8sb0JBQW9CLGtCQUFrQixxQkFDekMsU0FBUyxHQUFHLElBQUksTUFBTSxXQUFXLEtBQUssaUJBQWlCOzs7b0JBSy9ELEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELElBQUksT0FBTzs0QkFDWCxPQUFPLElBQUk7NEJBQ1AsVUFBVTs0QkFDTixNQUFNO2dDQUNGLFdBQVc7Z0NBQ1gsT0FBTztvQ0FDSCxJQUFJO29DQUNKLGNBQWM7Ozs7O3dCQUs5QixLQUFLLGtCQUFrQixHQUFHLElBQUksU0FBUyxNQUFNOzt3QkFFN0MsT0FBTyxvQkFBb0Isa0JBQWtCLHFCQUN6QyxTQUFTLEdBQUcsSUFBSSxNQUFNLFdBQVcsS0FBSyxpQkFBaUI7OztvQkFLL0QsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsSUFBSSxPQUFPOzRCQUNYLE9BQU8sSUFBSTs0QkFDUCxVQUFVOzRCQUNOLE1BQU07Z0NBQ0YsV0FBVztnQ0FDWCxPQUFPO29DQUNILElBQUk7b0NBQ0osY0FBYzs7Ozt3QkFJOUIsS0FBSyxRQUFRO3dCQUNiLEtBQUssa0JBQWtCLEdBQUcsSUFBSSxTQUFTLE1BQU07O3dCQUU3QyxPQUFPLG9CQUFvQixrQkFBa0IscUJBQ3pDLFNBQVMsR0FBRyxJQUFJLE1BQU0sS0FBSyxPQUFPLEtBQUssaUJBQWlCOzs7b0JBS2hFLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLElBQUksT0FBTzs0QkFDWCxPQUFPLElBQUk7O3dCQUVYLEtBQUssUUFBUTt3QkFDYixLQUFLLGtCQUFrQixHQUFHLElBQUksTUFBTSxNQUFNOzt3QkFFMUMsT0FBTyxvQkFBb0Isa0JBQWtCLHFCQUN6QyxJQUFJLEdBQUcsSUFBSSxNQUFNLEtBQUssT0FBTyxLQUFLLGlCQUFpQjs7O29CQUszRCxHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxJQUFJLE9BQU87d0JBQ1gsTUFBTSxLQUFLLE9BQU8sUUFBUSxNQUFNO3dCQUNoQyxLQUFLLGtCQUFrQixJQUFJLElBQUksTUFBTTs7O3dCQUdyQyxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUssbUJBQW1COzs7O2dCQUszRCxTQUFTLFdBQVcsWUFBTTs7b0JBRXRCLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLElBQUksT0FBTzs7d0JBRVgsTUFBTSxLQUFLLFlBQVksZ0JBQWdCO3dCQUN2QyxNQUFNLEtBQUssWUFBWSxVQUFVLFlBQVk7O3dCQUU3QyxLQUFLOzt3QkFFTCxPQUFPLEtBQUssWUFBWSxlQUFlLFNBQVM7d0JBQ2hELE9BQU8sS0FBSyxZQUFZLFVBQVUsV0FBVyxrQkFBa0I7Ozs7Z0JBS3ZFLFNBQVMsbUJBQW1CLFlBQU07O29CQUU5QixJQUFNLFlBQVk7d0JBQ1osUUFBUTs7b0JBRWQsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLE1BQU07O3dCQUVaLEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLFNBQVM7OztvQkFHekIsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLE1BQU07O3dCQUVaLEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLFNBQVMsSUFBSTs7O29CQUc3QixHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLE9BQU87NEJBQ1AsUUFBUTs0QkFDSixTQUFTOzs7d0JBR2pCLE1BQU0sS0FBSyxxQkFBcUIsaUJBQWlCOzt3QkFFakQsS0FBSyxnQkFBZ0I7O3dCQUVyQixPQUFPLEtBQUsscUJBQXFCLGdCQUFnQixrQkFBa0I7OztvQkFHdkUsR0FBRywyREFBMkQsWUFBTTt3QkFDaEUsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLEtBQUsscUJBQXFCLGlCQUFpQjs7d0JBRWpELEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLHFCQUFxQixnQkFBZ0Isa0JBQWtCLElBQUk7Ozs7OztHQVBoRiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRTY2hlZHVsZWRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZS5qcyc7XG5pbXBvcnQgZGF0YVZpZXdNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L0RhdGFWaWV3TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5kZXNjcmliZSgnVGFza01hbmFnZW1lbnRTY2hlZHVsZWRDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IHRhc2tTY2hlZHVsZVNlcnZpY2UsIERhdGFSZWZyZXNoVHJpZ2dlciwgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBTb3J0T3JkZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YXNrTWFuYWdlbWVudE1vZHVsZSwgZGF0YVZpZXdNb2R1bGUsIHRlc3RNb2R1bGUpKTtcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA2ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF90YXNrU2NoZWR1bGVTZXJ2aWNlXywgX0RhdGFSZWZyZXNoVHJpZ2dlcl8sIF90ZXN0U2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgX1NvcnRPcmRlcl8pID0+IHtcblxuICAgICAgICB0YXNrU2NoZWR1bGVTZXJ2aWNlID0gX3Rhc2tTY2hlZHVsZVNlcnZpY2VfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGxldCBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoJ1Rhc2tNYW5hZ2VtZW50U2NoZWR1bGVkQ3RybCcsIHtcbiAgICAgICAgICAgIHRhc2tTY2hlZHVsZVNlcnZpY2U6IHRhc2tTY2hlZHVsZVNlcnZpY2UsXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgICRzY29wZTogJHJvb3RTY29wZS4kbmV3KClcbiAgICAgICAgfSksXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgcGFyZW50IHRhc2tNYW5hZ2VtZW50UGFnZUN0cmwgYW5kIHNldCBpdCBvbiB0aGlzIGNvbnRyb2xsZXJcbiAgICAgICAgdGFza1BhZ2VDdHJsID0gJGNvbnRyb2xsZXIoJ1Rhc2tNYW5hZ2VtZW50UGFnZUN0cmwnLCB7fSk7XG4gICAgICAgIGNvbnRyb2xsZXIuJHNjb3BlLiRwYXJlbnQuY3RybCA9IHRhc2tQYWdlQ3RybDtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dldFNjaGVkdWxlZEl0ZW1zJywgKCkgPT4ge1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuXG4gICAgICAgICAgICBzcHlPbih0YXNrU2NoZWR1bGVTZXJ2aWNlLCAnZ2V0VGFza1NjaGVkdWxlcycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7Y291bnQ6IDAsIG9iamVjdHM6IFtdfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGEgZGVmYXVsdCByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgY3RybC5nZXRTY2hlZHVsZWRJdGVtcygwLCAxMCwgbnVsbCwgc29ydCk7XG5cbiAgICAgICAgICAgIC8vIHF1ZXJ5IGFuZCBzdGF0dXMgdmFsdWVzIGFyZSBhbHd5YXMgc3BsaWNlZCBpbiBidXQgdGhlIGh0dHAgZnJhbWV3b3JrXG4gICAgICAgICAgICAvLyB3aWxsIHN0cmlwIG91dCB1bmRlZmluZWQgdmFsdWVzIGJlZm9yZSB0aGV5IGFyZSBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIGV4cGVjdCh0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAwLCAxMCwgc29ydCwgdW5kZWZpbmVkLCBjdHJsLmNvbHVtbkNvbmZpZ0tleSwgdW5kZWZpbmVkXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBhIGRlZmF1bHQgc29ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XG5cbiAgICAgICAgICAgIHNvcnQuYWRkU29ydCgnbmV4dEV4ZWN1dGlvbicsIHRydWUpO1xuXG4gICAgICAgICAgICBjdHJsLmdldFNjaGVkdWxlZEl0ZW1zKDAsIDEwLCBudWxsLCBudWxsKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCB1bmRlZmluZWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYW4gZXhjbHVkZUltbWVkaWF0ZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgY3RybC5nZXRTY2hlZHVsZWRJdGVtcygwLCAxMCwgbnVsbCwgc29ydCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB7fSwgMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIGZhbHNlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGFuIGV4Y2x1ZGVJbW1lZGlhdGUgcmVxdWVzdCB3aXRoIHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuXG4gICAgICAgICAgICBjdHJsLmdldFNjaGVkdWxlZEl0ZW1zKDAsIDEwLCBudWxsLCBzb3J0LCB0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCB0cnVlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgcmVxdWVzdCB3aXRoIHR5cGUgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdFcXVhbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ1N5c3RlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnU3lzdGVtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3RybC5nZXRTY2hlZHVsZWRJdGVtcygwLCAxMCwgZmlsdGVycywgc29ydCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIGZpbHRlcnMsIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCB0cnVlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgcmVxdWVzdCB3aXRoIGhvc3QgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VxdWFscycsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTI3LjAuMC4xJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICcxMjcuMC4wLjEnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLmdldFNjaGVkdWxlZEl0ZW1zKDAsIDEwLCBmaWx0ZXJzLCBzb3J0LCB0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgZmlsdGVycywgMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIHRydWVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSByZXF1ZXN0IHdpdGggaG9zdCBmaWx0ZXIgYW5kIGEgcXVlcnknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgIHNvcnQgPSBuZXcgU29ydE9yZGVyKCksXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnRXF1YWxzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjcuMC4wLjEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJzEyNy4wLjAuMSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdHJsLnF1ZXJ5ID0gJ3Rlc3ROYW1lJztcbiAgICAgICAgICAgIGN0cmwuZ2V0U2NoZWR1bGVkSXRlbXMoMCwgMTAsIGZpbHRlcnMsIHNvcnQsIHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLCAwLCAxMCwgc29ydCwgY3RybC5xdWVyeSwgY3RybC5jb2x1bW5Db25maWdLZXksIHRydWVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSByZXF1ZXN0IHdpdGggYSBxdWVyeScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgY3RybC5xdWVyeSA9ICd0ZXN0TmFtZSc7XG4gICAgICAgICAgICBjdHJsLmdldFNjaGVkdWxlZEl0ZW1zKDAsIDEwLCBudWxsLCBzb3J0LCB0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCBjdHJsLnF1ZXJ5LCBjdHJsLmNvbHVtbkNvbmZpZ0tleSwgdHJ1ZVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHBvcHVsYXRlIHRhYnMgb24gYSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLiRzY29wZS4kcGFyZW50LmN0cmwsICdwb3B1bGF0ZVRhYkNvdW50cycpO1xuICAgICAgICAgICAgY3RybC5nZXRTY2hlZHVsZWRJdGVtcygxMCwgMTAsIG51bGwsIG51bGwpO1xuXG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gY2hlY2sgdGhhdCB0aGUgbWV0aG9kIHdhcyBjYWxsZWRcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLiRzY29wZS4kcGFyZW50LmN0cmwucG9wdWxhdGVUYWJDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWZyZXNoJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgdHJpZ2dlciBhIHRhYmxlIHJlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlciwgJ3JlZnJlc2gnKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwudGFibGVDb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEsICdyZXNldEN1cnJlbnRQYWdlJyk7XG5cbiAgICAgICAgICAgIGN0cmwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlci5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC50YWJsZUNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YS5yZXNldEN1cnJlbnRQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25RdWVyeUtleVByZXNzJywgKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEVOVEVSX0tFWSA9IDEzLFxuICAgICAgICAgICAgICBBX0tFWSA9IDY1O1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVmcmVzaCB0aGUgdGFibGUgd2hlbiBlbnRlciBpcyBwcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleUNvZGU6IEVOVEVSX0tFWVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdyZWZyZXNoJyk7XG5cbiAgICAgICAgICAgIGN0cmwub25RdWVyeUtleVByZXNzKGV2ZW50KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucmVmcmVzaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZWZyZXNoIHRoZSB0YWJsZSB3aGVuIGVudGVyIGlzIG5vdCBwcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleUNvZGU6IEFfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5yZWZyZXNoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlc2V0IGN1cnJlbnQgcGFnZSB3aGVuIGVudGVyIGlzIHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogRU5URVJfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCksICdyZXNldEN1cnJlbnRQYWdlJyk7XG5cbiAgICAgICAgICAgIGN0cmwub25RdWVyeUtleVByZXNzKGV2ZW50KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuZ2V0UGFnaW5nRGF0YSgpLnJlc2V0Q3VycmVudFBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gZW50ZXIgaXMgbm90IHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogQV9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCkucmVzZXRDdXJyZW50UGFnZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
