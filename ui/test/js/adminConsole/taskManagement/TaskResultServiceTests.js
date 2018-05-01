System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule', './TaskResultTestData'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var taskManagementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModule) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModule['default'];
        }, function (_TaskResultTestData) {}],
        execute: function () {

            /**
             Tests for TaskResultService
             */
            describe('TaskResultService', function () {
                var baseURLTaskResults = '/identityiq/rest/taskResults',
                    terminateURL = baseURLTaskResults + '/testTaskResult/terminate',
                    stackTraceURL = baseURLTaskResults + '/testTaskResult/stackTrace',
                    tabCountsURL = baseURLTaskResults + '/tabCounts';
                var TaskResult = undefined,
                    taskResultService = undefined,
                    taskResultTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                beforeEach(module(taskManagementModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_NAME', 'spadmin');
                }));

                beforeEach(inject(function (_TaskResult_, _taskResultService_, _taskResultTestData_, _$httpBackend_, _SortOrder_) {
                    TaskResult = _TaskResult_;
                    taskResultService = _taskResultService_;
                    taskResultTestData = _taskResultTestData_;
                    $httpBackend = _$httpBackend_;
                    SortOrder = _SortOrder_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                function verifyResult(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 3;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (response) {
                        expect(response).not.toBe(null);
                        expect(response.data).not.toBe(null);
                        expect(response.data.objects).not.toBe(null);
                        var objects = response.data.objects;
                        expect(response.data.count).toEqual(expectedCount);
                        expect(objects.length).toEqual(expectedCount);
                        objects.forEach(function (obj) {
                            expect(obj instanceof TaskResult).toBeTruthy();
                        });
                    });
                }

                describe('get TaskResults', function () {
                    var response = undefined,
                        tR1 = undefined,
                        tR2 = undefined,
                        tR3 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        tR1 = taskResultTestData.TASKRES1;
                        tR2 = taskResultTestData.TASKRES2;
                        tR3 = taskResultTestData.TASKRES3;
                        response = {
                            count: 3,
                            objects: [tR1, tR2, tR3]
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLTaskResults).respond(200, response);
                        promise = taskResultService.getTaskResults(null, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination options', function () {
                        $httpBackend.expectGET(baseURLTaskResults + '?limit=1&start=2').respond(200, response);
                        promise = taskResultService.getTaskResults(null, 2, 1, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with sorting info', function () {
                        var sort = new SortOrder();
                        sort.addSort('name', true);

                        $httpBackend.expectGET(baseURLTaskResults + '?limit=10&sort=%5B%7B%22property%22:%22name%22,%22direction%22:%22ASC%22%7D%5D&start=10').respond(200, response);

                        promise = taskResultService.getTaskResults(null, 10, 10, sort, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with name filter', function () {
                        var filters = {
                            name: {
                                value: 'name1'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?name=name1').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with host filter', function () {
                        var filters = {
                            host: {
                                value: 'test.sailpoint.com'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?host=test.sailpoint.com').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with status filter', function () {
                        var filters = {
                            status: {
                                value: 'Success'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?status=Success').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with colKey', function () {
                        var colKey = 'testColKey';
                        $httpBackend.expectGET(baseURLTaskResults + '?colKey=testColKey').respond(200, response);
                        promise = taskResultService.getTaskResults(null, null, null, null, null, colKey);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with isCompleted param', function () {
                        $httpBackend.expectGET(baseURLTaskResults + '?isCompleted=false').respond(200, response);
                        promise = taskResultService.getTaskResults(null, null, null, null, null, null, false);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter', function () {
                        var filters = {
                            type: {
                                value: 'AccountAggregation'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?type=AccountAggregation').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter', function () {
                        var filters = {
                            host: {
                                value: '127.0.0.1'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?host=127.0.0.1').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with status filter', function () {
                        var filters = {
                            status: {
                                value: 'Error'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskResults + '?status=Error').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a query', function () {
                        var query = 'james';
                        $httpBackend.expectGET(baseURLTaskResults + '?query=james').respond(200, response);
                        promise = taskResultService.getTaskResults({}, null, null, null, query, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with status filter and a query', function () {
                        var filters = {
                            status: {
                                value: 'Error'
                            }
                        },
                            query = 'james';
                        $httpBackend.expectGET(baseURLTaskResults + '?query=james&status=Error').respond(200, response);
                        promise = taskResultService.getTaskResults(filters, null, null, null, query, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                describe('get tabCounts', function () {
                    var response = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        response = {
                            active: 10,
                            completed: 20
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(tabCountsURL).respond(200, response);
                        promise = taskResultService.getTabCounts();
                        promise.then(function (response) {
                            var map = response;
                            expect(map).not.toBe(null);
                            expect(map['active']).toEqual(10);
                            expect(map['completed']).toEqual(20);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('terminate task results', function () {
                    var promise = undefined;

                    it('accept the terminate request', function () {
                        $httpBackend.expectPOST(terminateURL).respond(200);
                        promise = taskResultService.terminateTaskResult('testTaskResult');
                        promise.then(function () {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('request stack trace', function () {
                    var promise = undefined;

                    it('accepts the stack request', function () {
                        $httpBackend.expectPOST(stackTraceURL).respond(200);
                        promise = taskResultService.requestStackTrace('testTaskResult');
                        promise.then(function () {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrUmVzdWx0U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixvREFBb0QseUJBQXlCLFVBQVUsU0FBUzs7Ozs7SUFLeEk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlEQUFpRDtZQUN2Ryx1QkFBdUIsZ0RBQWdEO1dBQ3hFLFVBQVUscUJBQXFCO1FBQ2xDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxxQkFBcUIsWUFBVztnQkFDdEMsSUFBTSxxQkFBcUI7b0JBQ3JCLGVBQWUscUJBQXFCO29CQUNwQyxnQkFBZ0IscUJBQXFCO29CQUNyQyxlQUFlLHFCQUFxQjtnQkFDMUMsSUFBSSxhQUFVO29CQUFFLG9CQUFpQjtvQkFBRSxxQkFBa0I7b0JBQUUsZUFBWTtvQkFBRSxZQUFTOztnQkFFN0UsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjtvQkFDckMsU0FBUyxTQUFTLHFCQUFxQjs7O2dCQUczQyxXQUFXLE9BQU8sVUFBUyxjQUFjLHFCQUFxQixzQkFBc0IsZ0JBQWdCLGFBQWE7b0JBQzdHLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGVBQWU7b0JBQ2YsWUFBWTs7O2dCQUdoQixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLGFBQWEsU0FBUyxlQUFlO29CQUMxQyxJQUFJLFFBQVEsWUFBWSxnQkFBZ0I7d0JBQ3BDLGdCQUFnQjs7b0JBRXBCLE9BQU8sU0FBUztvQkFDaEIsUUFBUSxLQUFLLFVBQVMsVUFBVTt3QkFDNUIsT0FBTyxVQUFVLElBQUksS0FBSzt3QkFDMUIsT0FBTyxTQUFTLE1BQU0sSUFBSSxLQUFLO3dCQUMvQixPQUFPLFNBQVMs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LFVBQVU7NEJBQzVCLElBQUksTUFBTTs0QkFDVixPQUFPLEtBQUssSUFBSSxLQUFLOzRCQUNyQixPQUFPLElBQUksV0FBVyxRQUFROzRCQUM5QixPQUFPLElBQUksY0FBYyxRQUFROzt3QkFFckMsYUFBYTs7OztnQkFLckIsU0FBUywwQkFBMEIsWUFBTTtvQkFDckMsSUFBSSxVQUFPOztvQkFFWCxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxhQUFhLFdBQVcsY0FBYyxRQUFRO3dCQUM5QyxVQUFVLGtCQUFrQixvQkFBb0I7d0JBQ2hELFFBQVEsS0FBSyxZQUFNOzs0QkFFZixPQUFPLE1BQU07O3dCQUVqQixhQUFhOzs7O2dCQUtyQixTQUFTLHVCQUF1QixZQUFNO29CQUNsQyxJQUFJLFVBQU87O29CQUVYLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLGFBQWEsV0FBVyxlQUFlLFFBQVE7d0JBQy9DLFVBQVUsa0JBQWtCLGtCQUFrQjt3QkFDOUMsUUFBUSxLQUFLLFlBQU07OzRCQUVmLE9BQU8sTUFBTTs7d0JBRWpCLGFBQWE7Ozs7OztHQUV0QiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza1Jlc3VsdFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlJztcbmltcG9ydCAnLi9UYXNrUmVzdWx0VGVzdERhdGEnO1xuXG4vKipcbiBUZXN0cyBmb3IgVGFza1Jlc3VsdFNlcnZpY2VcbiAqL1xuZGVzY3JpYmUoJ1Rhc2tSZXN1bHRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICBjb25zdCBiYXNlVVJMVGFza1Jlc3VsdHMgPSAnL2lkZW50aXR5aXEvcmVzdC90YXNrUmVzdWx0cycsXG4gICAgICAgICB0ZXJtaW5hdGVVUkwgPSBiYXNlVVJMVGFza1Jlc3VsdHMgKyAnL3Rlc3RUYXNrUmVzdWx0L3Rlcm1pbmF0ZScsXG4gICAgICAgICBzdGFja1RyYWNlVVJMID0gYmFzZVVSTFRhc2tSZXN1bHRzICsgJy90ZXN0VGFza1Jlc3VsdC9zdGFja1RyYWNlJyxcbiAgICAgICAgIHRhYkNvdW50c1VSTCA9IGJhc2VVUkxUYXNrUmVzdWx0cyArICcvdGFiQ291bnRzJztcbiAgIGxldCBUYXNrUmVzdWx0LCB0YXNrUmVzdWx0U2VydmljZSwgdGFza1Jlc3VsdFRlc3REYXRhLCAkaHR0cEJhY2tlbmQsIFNvcnRPcmRlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfTkFNRScsICdzcGFkbWluJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1Rhc2tSZXN1bHRfLCBfdGFza1Jlc3VsdFNlcnZpY2VfLCBfdGFza1Jlc3VsdFRlc3REYXRhXywgXyRodHRwQmFja2VuZF8sIF9Tb3J0T3JkZXJfKSB7XG4gICAgICAgIFRhc2tSZXN1bHQgPSBfVGFza1Jlc3VsdF87XG4gICAgICAgIHRhc2tSZXN1bHRTZXJ2aWNlID0gX3Rhc2tSZXN1bHRTZXJ2aWNlXztcbiAgICAgICAgdGFza1Jlc3VsdFRlc3REYXRhID0gX3Rhc2tSZXN1bHRUZXN0RGF0YV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgZXhwZWN0ZWRDb3VudCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChleHBlY3RlZENvdW50KSkge1xuICAgICAgICAgICAgZXhwZWN0ZWRDb3VudCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0cykubm90LnRvQmUobnVsbCk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IHJlc3BvbnNlLmRhdGEub2JqZWN0cztcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvdW50KS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdHMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xuICAgICAgICAgICAgb2JqZWN0cy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iaiBpbnN0YW5jZW9mIFRhc2tSZXN1bHQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0IFRhc2tSZXN1bHRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXNwb25zZSwgdFIxLCB0UjIsIHRSMywgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICB0UjEgPSB0YXNrUmVzdWx0VGVzdERhdGEuVEFTS1JFUzE7XG4gICAgICAgICAgIHRSMiA9IHRhc2tSZXN1bHRUZXN0RGF0YS5UQVNLUkVTMjtcbiAgICAgICAgICAgdFIzID0gdGFza1Jlc3VsdFRlc3REYXRhLlRBU0tSRVMzO1xuICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgIGNvdW50OiAzLFxuICAgICAgICAgICAgICAgb2JqZWN0czogWyB0UjEsIHRSMiwgdFIzIF1cbiAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrUmVzdWx0cykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHBhZ2luYXRpb24gb3B0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1Jlc3VsdHMgKyAnP2xpbWl0PTEmc3RhcnQ9MicpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhudWxsLCAyLCAxLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBzb3J0aW5nIGluZm8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCduYW1lJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoXG4gICAgICAgICAgICAgICAgYmFzZVVSTFRhc2tSZXN1bHRzICtcbiAgICAgICAgICAgICAgICAnP2xpbWl0PTEwJnNvcnQ9JTVCJTdCJTIycHJvcGVydHklMjI6JTIybmFtZSUyMiwlMjJkaXJlY3Rpb24lMjI6JTIyQVNDJTIyJTdEJTVEJnN0YXJ0PTEwJ1xuICAgICAgICAgICAgKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMobnVsbCwgMTAsIDEwLCBzb3J0LCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBuYW1lIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ25hbWUxJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrUmVzdWx0cyArICc/bmFtZT1uYW1lMScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBob3N0IGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3Quc2FpbHBvaW50LmNvbSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1Jlc3VsdHMgKyAnP2hvc3Q9dGVzdC5zYWlscG9pbnQuY29tJykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHN0YXR1cyBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz9zdGF0dXM9U3VjY2VzcycpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBjb2xLZXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjb2xLZXkgPSAndGVzdENvbEtleSc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrUmVzdWx0cyArICc/Y29sS2V5PXRlc3RDb2xLZXknKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgY29sS2V5KTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBpc0NvbXBsZXRlZCBwYXJhbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1Jlc3VsdHMgKyAnP2lzQ29tcGxldGVkPWZhbHNlJykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhc2tSZXN1bHRzKG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCB0eXBlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQWNjb3VudEFnZ3JlZ2F0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz90eXBlPUFjY291bnRBZ2dyZWdhdGlvbicpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhmaWx0ZXJzLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCB0eXBlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMTI3LjAuMC4xJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz9ob3N0PTEyNy4wLjAuMScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyhmaWx0ZXJzLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBzdGF0dXMgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0Vycm9yJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz9zdGF0dXM9RXJyb3InKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMoZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gJ2phbWVzJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz9xdWVyeT1qYW1lcycpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrUmVzdWx0U2VydmljZS5nZXRUYXNrUmVzdWx0cyh7fSwgbnVsbCwgbnVsbCwgbnVsbCwgcXVlcnksIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHN0YXR1cyBmaWx0ZXIgYW5kIGEgcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnRXJyb3InXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gJ2phbWVzJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tSZXN1bHRzICsgJz9xdWVyeT1qYW1lcyZzdGF0dXM9RXJyb3InKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFza1Jlc3VsdHMoZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgcXVlcnksIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHRhYkNvdW50cycsICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3BvbnNlLCBwcm9taXNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgIGFjdGl2ZTogMTAsXG4gICAgICAgICAgICAgICBjb21wbGV0ZWQ6IDIwXG4gICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodGFiQ291bnRzVVJMKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tSZXN1bHRTZXJ2aWNlLmdldFRhYkNvdW50cygpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGV4cGVjdChtYXApLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChtYXBbJ2FjdGl2ZSddKS50b0VxdWFsKDEwKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobWFwWydjb21wbGV0ZWQnXSkudG9FcXVhbCgyMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Rlcm1pbmF0ZSB0YXNrIHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuXG4gICAgICAgIGl0KCdhY2NlcHQgdGhlIHRlcm1pbmF0ZSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QodGVybWluYXRlVVJMKS5yZXNwb25kKDIwMCk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UudGVybWluYXRlVGFza1Jlc3VsdCgndGVzdFRhc2tSZXN1bHQnKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9qdXN0IG1ha2Ugc3VyZSB0aGlzIHJlc29sdmVzXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRydWUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVxdWVzdCBzdGFjayB0cmFjZScsICgpID0+IHtcbiAgICAgICAgbGV0IHByb21pc2U7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgdGhlIHN0YWNrIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChzdGFja1RyYWNlVVJMKS5yZXNwb25kKDIwMCk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1Jlc3VsdFNlcnZpY2UucmVxdWVzdFN0YWNrVHJhY2UoJ3Rlc3RUYXNrUmVzdWx0Jyk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vanVzdCBtYWtlIHN1cmUgdGhpcyByZXNvbHZlc1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
