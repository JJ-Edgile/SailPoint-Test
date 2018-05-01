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

            describe('TaskManagementActiveCtrl', function () {

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
                    var controller = $controller('TaskManagementActiveCtrl', {
                        taskResultService: taskResultService,
                        $scope: $rootScope.$new(),
                        SortOrder: SortOrder
                    }),

                    // create the parent taskManagementPageCtrl and set it on this controller
                    taskPageCtrl = $controller('TaskManagementPageCtrl', {});
                    controller.$scope.$parent.ctrl = taskPageCtrl;
                    return controller;
                }

                describe('getActiveItems', function () {
                    var sort = undefined;

                    beforeEach(function () {
                        // don't care what the results are for these tests just the parameters
                        // that the function was called with
                        spyOn(taskResultService, 'getTaskResults').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                        sort = new SortOrder();
                    });

                    it('should handle a default request', function () {
                        var ctrl = createController();
                        ctrl.getActiveItems(0, 10, null, sort, false);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should have a default sort', function () {
                        var ctrl = createController();

                        sort.addSort('name', true);
                        ctrl.getActiveItems(0, 10, null, null, false);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 0, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should handle a paginated request', function () {
                        var ctrl = createController();
                        ctrl.getActiveItems(10, 10, null, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 10, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should handle a request with type filter', function () {
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
                        ctrl.getActiveItems(10, 10, filters, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should handle a request with host and type filter', function () {
                        var ctrl = createController(),
                            filters = {
                            host: {
                                operation: 'Equals',
                                value: {
                                    id: '127.0.0.1',
                                    displayValue: '127.0.0.1'
                                }
                            },
                            type: {
                                operation: 'Equals',
                                value: {
                                    id: 'AccountAggregation',
                                    displayValue: 'AccountAggregation'
                                }
                            }
                        };
                        ctrl.getActiveItems(10, 10, filters, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should handle a request with host', function () {
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
                        ctrl.getActiveItems(10, 10, filters, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, undefined, ctrl.columnConfigKey, false);
                    });

                    it('should handle a request with a query', function () {
                        var ctrl = createController();
                        ctrl.query = 'james';
                        ctrl.getActiveItems(10, 10, {}, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith({}, 10, 10, sort, ctrl.query, ctrl.columnConfigKey, false);
                    });

                    it('should handle a request with host filter and query', function () {
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
                        ctrl.query = 'james';
                        ctrl.getActiveItems(10, 10, filters, sort, false);

                        expect(taskResultService.getTaskResults).toHaveBeenCalledWith(filters, 10, 10, sort, ctrl.query, ctrl.columnConfigKey, false);
                    });

                    it('should populate tabs on a request', function () {
                        var ctrl = createController();
                        spyOn(ctrl.$scope.$parent.ctrl, 'populateTabCounts');
                        ctrl.getActiveItems(10, 10, null, null, false);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudEFjdGl2ZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdURBQXVELGtDQUFrQyx1QkFBdUIsVUFBVSxTQUFTOzs7SUFHM0s7O0lBRUEsSUFBSSxzQkFBc0IsZ0JBQWdCO0lBQzFDLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEO1dBQzFFLFVBQVUsK0JBQStCO1lBQ3hDLGlCQUFpQiw4QkFBOEI7V0FDaEQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFQN0IsU0FBUyw0QkFBNEIsWUFBTTs7Z0JBRXZDLElBQUksb0JBQWlCO29CQUFFLHFCQUFrQjtvQkFDckMsY0FBVztvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsWUFBUzs7Z0JBRW5ELFdBQVcsT0FBTyxzQkFBc0IsZ0JBQWdCOztnQkFFeEQsV0FBVyxPQUFPLFVBQUMscUJBQXFCLHNCQUNyQixlQUFlLGVBQWUsY0FBYyxhQUFnQjs7b0JBRTNFLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZOzs7Z0JBSWhCLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLGFBQWEsWUFBWSw0QkFBNEI7d0JBQ3JELG1CQUFtQjt3QkFDbkIsUUFBUSxXQUFXO3dCQUNuQixXQUFXOzs7O29CQUdmLGVBQWUsWUFBWSwwQkFBMEI7b0JBQ3JELFdBQVcsT0FBTyxRQUFRLE9BQU87b0JBQ2pDLE9BQU87OztnQkFHWCxTQUFTLGtCQUFrQixZQUFNO29CQUM3QixJQUFJLE9BQUk7O29CQUVSLFdBQVcsWUFBTTs7O3dCQUdiLE1BQU0sbUJBQW1CLGtCQUFrQixJQUFJLFlBQzNDLFlBQVksY0FBYyxP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ZW50QWN0aXZlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZS5qcyc7XG5pbXBvcnQgZGF0YVZpZXdNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L0RhdGFWaWV3TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdUYXNrTWFuYWdlbWVudEFjdGl2ZUN0cmwnLCAoKSA9PiB7XG5cbiAgICBsZXQgdGFza1Jlc3VsdFNlcnZpY2UsIERhdGFSZWZyZXNoVHJpZ2dlcixcbiAgICAgICAgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBTb3J0T3JkZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YXNrTWFuYWdlbWVudE1vZHVsZSwgZGF0YVZpZXdNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfdGFza1Jlc3VsdFNlcnZpY2VfLCBfRGF0YVJlZnJlc2hUcmlnZ2VyXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfU29ydE9yZGVyXykgPT4ge1xuXG4gICAgICAgIHRhc2tSZXN1bHRTZXJ2aWNlID0gX3Rhc2tSZXN1bHRTZXJ2aWNlXztcbiAgICAgICAgRGF0YVJlZnJlc2hUcmlnZ2VyID0gX0RhdGFSZWZyZXNoVHJpZ2dlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICB9KSk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGxldCBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoJ1Rhc2tNYW5hZ2VtZW50QWN0aXZlQ3RybCcsIHtcbiAgICAgICAgICAgIHRhc2tSZXN1bHRTZXJ2aWNlOiB0YXNrUmVzdWx0U2VydmljZSxcbiAgICAgICAgICAgICRzY29wZTogJHJvb3RTY29wZS4kbmV3KCksXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlclxuICAgICAgICB9KSxcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBwYXJlbnQgdGFza01hbmFnZW1lbnRQYWdlQ3RybCBhbmQgc2V0IGl0IG9uIHRoaXMgY29udHJvbGxlclxuICAgICAgICB0YXNrUGFnZUN0cmwgPSAkY29udHJvbGxlcignVGFza01hbmFnZW1lbnRQYWdlQ3RybCcsIHt9KTtcbiAgICAgICAgY29udHJvbGxlci4kc2NvcGUuJHBhcmVudC5jdHJsID0gdGFza1BhZ2VDdHJsO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0QWN0aXZlSXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBzb3J0O1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gZG9uJ3QgY2FyZSB3aGF0IHRoZSByZXN1bHRzIGFyZSBmb3IgdGhlc2UgdGVzdHMganVzdCB0aGUgcGFyYW1ldGVyc1xuICAgICAgICAgICAgLy8gdGhhdCB0aGUgZnVuY3Rpb24gd2FzIGNhbGxlZCB3aXRoXG4gICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ2dldFRhc2tSZXN1bHRzJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHsgY291bnQ6IDAsIG9iamVjdHM6IFtdIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSBkZWZhdWx0IHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0QWN0aXZlSXRlbXMoMCwgMTAsIG51bGwsIHNvcnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gcXVlcnkgYW5kIHN0YXR1cyB2YWx1ZXMgYXJlIGFsd3lhcyBzcGxpY2VkIGluIGJ1dCB0aGUgaHR0cCBmcmFtZXdvcmtcbiAgICAgICAgICAgIC8vIHdpbGwgc3RyaXAgb3V0IHVuZGVmaW5lZCB2YWx1ZXMgYmVmb3JlIHRoZXkgYXJlIHNlbnQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB7fSwgMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYSBkZWZhdWx0IHNvcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCduYW1lJywgdHJ1ZSk7XG4gICAgICAgICAgICBjdHJsLmdldEFjdGl2ZUl0ZW1zKDAsIDEwLCBudWxsLCBudWxsLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIHF1ZXJ5IGFuZCBzdGF0dXMgdmFsdWVzIGFyZSBhbHd5YXMgc3BsaWNlZCBpbiBidXQgdGhlIGh0dHAgZnJhbWV3b3JrXG4gICAgICAgICAgICAvLyB3aWxsIHN0cmlwIG91dCB1bmRlZmluZWQgdmFsdWVzIGJlZm9yZSB0aGV5IGFyZSBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIGV4cGVjdCh0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSBwYWdpbmF0ZWQgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5nZXRBY3RpdmVJdGVtcygxMCwgMTAsIG51bGwsIHNvcnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB7fSwgMTAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSByZXF1ZXN0IHdpdGggdHlwZSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdFcXVhbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0FjY291bnRBZ2dyZWdhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnQWNjb3VudEFnZ3JlZ2F0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN0cmwuZ2V0QWN0aXZlSXRlbXMoMTAsIDEwLCBmaWx0ZXJzLCBzb3J0LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgZmlsdGVycywgMTAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSByZXF1ZXN0IHdpdGggaG9zdCBhbmQgdHlwZSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICBob3N0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdFcXVhbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyNy4wLjAuMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnMTI3LjAuMC4xJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdFcXVhbHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0FjY291bnRBZ2dyZWdhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnQWNjb3VudEFnZ3JlZ2F0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN0cmwuZ2V0QWN0aXZlSXRlbXMoMTAsIDEwLCBmaWx0ZXJzLCBzb3J0LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgZmlsdGVycywgMTAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIGN0cmwuY29sdW1uQ29uZmlnS2V5LCBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSByZXF1ZXN0IHdpdGggaG9zdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VxdWFscycsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTI3LjAuMC4xJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICcxMjcuMC4wLjEnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3RybC5nZXRBY3RpdmVJdGVtcygxMCwgMTAsIGZpbHRlcnMsIHNvcnQsIGZhbHNlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICBmaWx0ZXJzLCAxMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgY3RybC5jb2x1bW5Db25maWdLZXksIGZhbHNlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhbmRsZSBhIHJlcXVlc3Qgd2l0aCBhIHF1ZXJ5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLnF1ZXJ5ID0gJ2phbWVzJztcbiAgICAgICAgICAgIGN0cmwuZ2V0QWN0aXZlSXRlbXMoMTAsIDEwLCB7fSwgc29ydCwgZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAxMCwgMTAsIHNvcnQsIGN0cmwucXVlcnksIGN0cmwuY29sdW1uQ29uZmlnS2V5LCBmYWxzZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSByZXF1ZXN0IHdpdGggaG9zdCBmaWx0ZXIgYW5kIHF1ZXJ5JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnRXF1YWxzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjcuMC4wLjEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJzEyNy4wLjAuMSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdHJsLnF1ZXJ5ID0gJ2phbWVzJztcbiAgICAgICAgICAgIGN0cmwuZ2V0QWN0aXZlSXRlbXMoMTAsIDEwLCBmaWx0ZXJzLCBzb3J0LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgZmlsdGVycywgMTAsIDEwLCBzb3J0LCBjdHJsLnF1ZXJ5LCBjdHJsLmNvbHVtbkNvbmZpZ0tleSwgZmFsc2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcG9wdWxhdGUgdGFicyBvbiBhIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwuJHNjb3BlLiRwYXJlbnQuY3RybCwgJ3BvcHVsYXRlVGFiQ291bnRzJyk7XG4gICAgICAgICAgICBjdHJsLmdldEFjdGl2ZUl0ZW1zKDEwLCAxMCwgbnVsbCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gY2hlY2sgdGhhdCB0aGUgbWV0aG9kIHdhcyBjYWxsZWRcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLiRzY29wZS4kcGFyZW50LmN0cmwucG9wdWxhdGVUYWJDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWZyZXNoJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgdHJpZ2dlciBhIHRhYmxlIHJlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlciwgJ3JlZnJlc2gnKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwudGFibGVDb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEsICdyZXNldEN1cnJlbnRQYWdlJyk7XG5cbiAgICAgICAgICAgIGN0cmwucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlci5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC50YWJsZUNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YS5yZXNldEN1cnJlbnRQYWdlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25RdWVyeUtleVByZXNzJywgKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEVOVEVSX0tFWSA9IDEzLFxuICAgICAgICAgICAgICBBX0tFWSA9IDY1O1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVmcmVzaCB0aGUgdGFibGUgd2hlbiBlbnRlciBpcyBwcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleUNvZGU6IEVOVEVSX0tFWVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdyZWZyZXNoJyk7XG5cbiAgICAgICAgICAgIGN0cmwub25RdWVyeUtleVByZXNzKGV2ZW50KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucmVmcmVzaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZWZyZXNoIHRoZSB0YWJsZSB3aGVuIGVudGVyIGlzIG5vdCBwcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGtleUNvZGU6IEFfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5yZWZyZXNoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlc2V0IGN1cnJlbnQgcGFnZSB3aGVuIGVudGVyIGlzIHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogRU5URVJfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCksICdyZXNldEN1cnJlbnRQYWdlJyk7XG5cbiAgICAgICAgICAgIGN0cmwub25RdWVyeUtleVByZXNzKGV2ZW50KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuZ2V0UGFnaW5nRGF0YSgpLnJlc2V0Q3VycmVudFBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gZW50ZXIgaXMgbm90IHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogQV9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCkucmVzZXRDdXJyZW50UGFnZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
