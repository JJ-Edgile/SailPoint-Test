System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js', 'common/dataview/DataViewModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

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

            describe('TaskManagementCompletedCtrl', function () {

                var taskResultService = undefined,
                    DataRefreshTrigger = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined;

                beforeEach(module(taskManagementModule, dataViewModule, testModule));

                beforeEach(inject(function (_taskResultService_, _DataRefreshTrigger_, _testService_, _$controller_, _$rootScope_, _SortOrder_) {

                    taskResultService = _taskResultService_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                }));

                function createController() {
                    var controller = $controller('TaskManagementCompletedCtrl', {
                        taskResultService: taskResultService,
                        $scope: $rootScope.$new(),
                        SortOrder: SortOrder
                    }),

                    // create the parent taskManagementPageCtrl and set it on this controller
                    taskPageCtrl = $controller('TaskManagementPageCtrl', {});
                    controller.$scope.$parent.ctrl = taskPageCtrl;
                    return controller;
                }

                describe('getCompletedItems', function () {
                    var sort = undefined;

                    beforeEach(function () {
                        // don't care what the results are for these tests just the parameters
                        // that the function was called with
                        spyOn(taskResultService, 'getTaskResults').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                        sort = new SortOrder();
                    });

                    it('should handle a default request', function () {
                        var ctrl = createController();
                        ctrl.getCompletedItems(0, 10, null, sort, true);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should use a default sort', function () {
                        var ctrl = createController();

                        sort.addSort('completed', false);
                        ctrl.getCompletedItems(0, 10, null, null, true);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should handle a paginated request', function () {
                        var ctrl = createController();
                        ctrl.getCompletedItems(10, 10, null, sort, true);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 10, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should handle a query', function () {
                        var ctrl = createController();
                        ctrl.query = 'james';
                        ctrl.getCompletedItems(10, 10, null, sort, true);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 10, 10, sort, ctrl.query, ctrl.columnConfigKey, true);
                    });

                    it('should handle a type filter request', function () {
                        var ctrl = createController(),
                            filters = {
                            type: {
                                operation: 'Equals',
                                value: {
                                    id: 'AccountAggregation',
                                    displayValue: 'AccountAggregation'
                                }
                            }
                        };
                        ctrl.getCompletedItems(10, 10, filters, sort, true);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should handle a host filter request', function () {
                        var ctrl = createController(),
                            filters = {
                            host: {
                                operation: 'Equals',
                                value: {
                                    id: '127.0.0.1',
                                    displayValue: '127.0.0.1'
                                }
                            }
                        };
                        ctrl.getCompletedItems(10, 10, filters, sort, true);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should handle a status filter request', function () {
                        var ctrl = createController(),
                            filters = {
                            status: {
                                operation: 'Equals',
                                value: {
                                    id: 'Error',
                                    displayValue: 'Error'
                                }
                            }
                        };
                        ctrl.getCompletedItems(10, 10, filters, sort, true);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, true);
                    });

                    it('should populate tabs on a request', function () {
                        var ctrl = createController();
                        spyOn(ctrl.$scope.$parent.ctrl, 'populateTabCounts');
                        ctrl.getCompletedItems(10, 10, null, sort, true);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudENvbXBsZXRlZEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdURBQXVELGtDQUFrQyx1QkFBdUIsVUFBVSxTQUFTOzs7SUFHM0s7O0lBRUEsSUFBSSxzQkFBc0IsZ0JBQWdCO0lBQzFDLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEO1dBQzFFLFVBQVUsK0JBQStCO1lBQ3hDLGlCQUFpQiw4QkFBOEI7V0FDaEQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFQN0IsU0FBUywrQkFBK0IsWUFBTTs7Z0JBRTFDLElBQUksb0JBQWlCO29CQUFFLHFCQUFrQjtvQkFDckMsY0FBVztvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsWUFBUzs7Z0JBRW5ELFdBQVcsT0FBTyxzQkFBc0IsZ0JBQWdCOztnQkFFeEQsV0FBVyxPQUFPLFVBQUMscUJBQXFCLHNCQUNyQixlQUFlLGVBQWUsY0FBYyxhQUFnQjs7b0JBRTNFLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZOzs7Z0JBSWhCLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLGFBQWEsWUFBWSwrQkFBK0I7d0JBQ3hELG1CQUFtQjt3QkFDbkIsUUFBUSxXQUFXO3dCQUNuQixXQUFXOzs7O29CQUdmLGVBQWUsWUFBWSwwQkFBMEI7b0JBQ3JELFdBQVcsT0FBTyxRQUFRLE9BQU87b0JBQ2pDLE9BQU87OztnQkFHWCxTQUFTLHFCQUFxQixZQUFNO29CQUNoQyxJQUFJLE9BQUk7O29CQUVSLFdBQVcsWUFBTTs7O3dCQUdiLE1BQU0sbUJBQW1CLGtCQUFrQixJQUFJLFlBQzNDLFlBQVksY0FB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REFBa0QsWUFBTTt3QkFDdkQsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLE1BQU07O3dCQUVaLEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLFNBQVM7OztvQkFHekIsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLE1BQU07O3dCQUVaLEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLFNBQVMsSUFBSTs7O29CQUc3QixHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLE9BQU87NEJBQ1AsUUFBUTs0QkFDSixTQUFTOzs7d0JBR2pCLE1BQU0sS0FBSyxxQkFBcUIsaUJBQWlCOzt3QkFFakQsS0FBSyxnQkFBZ0I7O3dCQUVyQixPQUFPLEtBQUsscUJBQXFCLGdCQUFnQixrQkFBa0I7OztvQkFHdkUsR0FBRywyREFBMkQsWUFBTTt3QkFDaEUsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLEtBQUsscUJBQXFCLGlCQUFpQjs7d0JBRWpELEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLHFCQUFxQixnQkFBZ0Isa0JBQWtCLElBQUk7Ozs7OztHQUFoRiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRDb21wbGV0ZWRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlLmpzJztcbmltcG9ydCBkYXRhVmlld01vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvRGF0YVZpZXdNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ1Rhc2tNYW5hZ2VtZW50Q29tcGxldGVkQ3RybCcsICgpID0+IHtcblxuICAgIGxldCB0YXNrUmVzdWx0U2VydmljZSwgRGF0YVJlZnJlc2hUcmlnZ2VyLFxuICAgICAgICB0ZXN0U2VydmljZSwgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsIFNvcnRPcmRlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlLCBkYXRhVmlld01vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF90YXNrUmVzdWx0U2VydmljZV8sIF9EYXRhUmVmcmVzaFRyaWdnZXJfLFxuICAgICAgICAgICAgICAgICAgICAgICBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9Tb3J0T3JkZXJfKSA9PiB7XG5cbiAgICAgICAgdGFza1Jlc3VsdFNlcnZpY2UgPSBfdGFza1Jlc3VsdFNlcnZpY2VfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgIH0pKTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgbGV0IGNvbnRyb2xsZXIgPSAkY29udHJvbGxlcignVGFza01hbmFnZW1lbnRDb21wbGV0ZWRDdHJsJywge1xuICAgICAgICAgICAgdGFza1Jlc3VsdFNlcnZpY2U6IHRhc2tSZXN1bHRTZXJ2aWNlLFxuICAgICAgICAgICAgJHNjb3BlOiAkcm9vdFNjb3BlLiRuZXcoKSxcbiAgICAgICAgICAgIFNvcnRPcmRlcjogU29ydE9yZGVyXG4gICAgICAgIH0pLFxuICAgICAgICAvLyBjcmVhdGUgdGhlIHBhcmVudCB0YXNrTWFuYWdlbWVudFBhZ2VDdHJsIGFuZCBzZXQgaXQgb24gdGhpcyBjb250cm9sbGVyXG4gICAgICAgIHRhc2tQYWdlQ3RybCA9ICRjb250cm9sbGVyKCdUYXNrTWFuYWdlbWVudFBhZ2VDdHJsJywge30pO1xuICAgICAgICBjb250cm9sbGVyLiRzY29wZS4kcGFyZW50LmN0cmwgPSB0YXNrUGFnZUN0cmw7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdnZXRDb21wbGV0ZWRJdGVtcycsICgpID0+IHtcbiAgICAgICAgbGV0IHNvcnQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBkb24ndCBjYXJlIHdoYXQgdGhlIHJlc3VsdHMgYXJlIGZvciB0aGVzZSB0ZXN0cyBqdXN0IHRoZSBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAvLyB0aGF0IHRoZSBmdW5jdGlvbiB3YXMgY2FsbGVkIHdpdGhcbiAgICAgICAgICAgIHNweU9uKHRhc2tSZXN1bHRTZXJ2aWNlLCAnZ2V0VGFza1Jlc3VsdHMnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgeyBjb3VudDogMCwgb2JqZWN0czogW10gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBhIGRlZmF1bHQgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5nZXRDb21wbGV0ZWRJdGVtcygwLCAxMCwgbnVsbCwgc29ydCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIHF1ZXJ5IGFuZCBzdGF0dXMgdmFsdWVzIGFyZSBhbHd5YXMgc3BsaWNlZCBpbiBidXQgdGhlIGh0dHAgZnJhbWV3b3JrXG4gICAgICAgICAgICAvLyB3aWxsIHN0cmlwIG91dCB1bmRlZmluZWQgdmFsdWVzIGJlZm9yZSB0aGV5IGFyZSBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIGV4cGVjdCh0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVzZSBhIGRlZmF1bHQgc29ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBzb3J0LmFkZFNvcnQoJ2NvbXBsZXRlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q29tcGxldGVkSXRlbXMoMCwgMTAsIG51bGwsIG51bGwsIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBxdWVyeSBhbmQgc3RhdHVzIHZhbHVlcyBhcmUgYWx3eWFzIHNwbGljZWQgaW4gYnV0IHRoZSBodHRwIGZyYW1ld29ya1xuICAgICAgICAgICAgLy8gd2lsbCBzdHJpcCBvdXQgdW5kZWZpbmVkIHZhbHVlcyBiZWZvcmUgdGhleSBhcmUgc2VudCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAwLCAxMCwgc29ydCwgdW5kZWZpbmVkLCBjdHJsLmNvbHVtbkNvbmZpZ0tleSwgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSBwYWdpbmF0ZWQgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5nZXRDb21wbGV0ZWRJdGVtcygxMCwgMTAsIG51bGwsIHNvcnQsIHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAxMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGEgcXVlcnknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwucXVlcnkgPSAnamFtZXMnO1xuICAgICAgICAgICAgY3RybC5nZXRDb21wbGV0ZWRJdGVtcygxMCwgMTAsIG51bGwsIHNvcnQsIHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAxMCwgMTAsIHNvcnQsIGN0cmwucXVlcnksIGN0cmwuY29sdW1uQ29uZmlnS2V5LCB0cnVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBhIHR5cGUgZmlsdGVyIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdFcXVhbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0FjY291bnRBZ2dyZWdhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnQWNjb3VudEFnZ3JlZ2F0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q29tcGxldGVkSXRlbXMoMTAsIDEwLCBmaWx0ZXJzLCBzb3J0LCB0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLCAxMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGEgaG9zdCBmaWx0ZXIgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VxdWFscycsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTI3LjAuMC4xJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICcxMjcuMC4wLjEnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3RybC5nZXRDb21wbGV0ZWRJdGVtcygxMCwgMTAsIGZpbHRlcnMsIHNvcnQsIHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIGZpbHRlcnMsIDEwLCAxMCwgc29ydCwgdW5kZWZpbmVkLCBjdHJsLmNvbHVtbkNvbmZpZ0tleSwgdHJ1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSBzdGF0dXMgZmlsdGVyIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VxdWFscycsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ0Vycm9yJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q29tcGxldGVkSXRlbXMoMTAsIDEwLCBmaWx0ZXJzLCBzb3J0LCB0cnVlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLCAxMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcG9wdWxhdGUgdGFicyBvbiBhIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwuJHNjb3BlLiRwYXJlbnQuY3RybCwgJ3BvcHVsYXRlVGFiQ291bnRzJyk7XG4gICAgICAgICAgICBjdHJsLmdldENvbXBsZXRlZEl0ZW1zKDEwLCAxMCwgbnVsbCwgc29ydCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIGp1c3QgbmVlZCB0byBjaGVjayB0aGF0IHRoZSBtZXRob2Qgd2FzIGNhbGxlZFxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuJHNjb3BlLiRwYXJlbnQuY3RybC5wb3B1bGF0ZVRhYkNvdW50cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlZnJlc2gnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGEgdGFibGUgcmVmcmVzaCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLnRhYmxlQ29uZmlnLnJlZnJlc2hUcmlnZ2VyLCAncmVmcmVzaCcpO1xuICAgICAgICAgICAgc3B5T24oY3RybC50YWJsZUNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcblxuICAgICAgICAgICAgY3RybC5yZWZyZXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhLnJlc2V0Q3VycmVudFBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblF1ZXJ5S2V5UHJlc3MnLCAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgRU5URVJfS0VZID0gMTMsXG4gICAgICAgICAgICAgIEFfS0VZID0gNjU7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWZyZXNoIHRoZSB0YWJsZSB3aGVuIGVudGVyIGlzIHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogRU5URVJfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHJlZnJlc2ggdGhlIHRhYmxlIHdoZW4gZW50ZXIgaXMgbm90IHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogQV9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAncmVmcmVzaCcpO1xuXG4gICAgICAgICAgICBjdHJsLm9uUXVlcnlLZXlQcmVzcyhldmVudCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnJlZnJlc2gpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gZW50ZXIgaXMgcHJlc3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlOiBFTlRFUl9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCkucmVzZXRDdXJyZW50UGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZXNldCBjdXJyZW50IHBhZ2Ugd2hlbiBlbnRlciBpcyBub3QgcHJlc3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlOiBBX0tFWVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuZ2V0UGFnaW5nRGF0YSgpLCAncmVzZXRDdXJyZW50UGFnZScpO1xuXG4gICAgICAgICAgICBjdHJsLm9uUXVlcnlLZXlQcmVzcyhldmVudCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKS5yZXNldEN1cnJlbnRQYWdlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
