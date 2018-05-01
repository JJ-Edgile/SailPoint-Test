System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule', './TaskScheduleTestData'], function (_export) {
    'use strict';

    var taskManagementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModule) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModule['default'];
        }, function (_TaskScheduleTestData) {}],
        execute: function () {

            /**
             Tests for TaskSchedule Service
             */
            describe('TaskScheduleService', function () {

                var baseURLTaskSchedules = '/identityiq/rest/taskSchedules';
                var TaskSchedule = undefined,
                    taskScheduleService = undefined,
                    taskScheduleTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                beforeEach(module(taskManagementModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_NAME', 'spadmin');
                }));

                beforeEach(inject(function (_TaskSchedule_, _taskScheduleService_, _taskScheduleTestData_, _$httpBackend_, _SortOrder_) {
                    TaskSchedule = _TaskSchedule_;
                    taskScheduleService = _taskScheduleService_;
                    taskScheduleTestData = _taskScheduleTestData_;
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
                            expect(obj instanceof TaskSchedule).toBeTruthy();
                        });
                    });
                }

                describe('get TaskSchedules', function () {
                    var response = undefined,
                        TS1 = undefined,
                        TS2 = undefined,
                        TS3 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        TS1 = taskScheduleTestData.TASKSCHED1;
                        TS2 = taskScheduleTestData.TASKSCHED2;
                        TS3 = taskScheduleTestData.TASKSCHED3;
                        response = {
                            count: 3,
                            objects: [TS1, TS2, TS3]
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLTaskSchedules).respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(null, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination options', function () {
                        $httpBackend.expectGET(baseURLTaskSchedules + '?limit=1&start=2').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(null, 2, 1, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with sorting info', function () {
                        var sort = new SortOrder();
                        sort.addSort('name', true);

                        $httpBackend.expectGET(baseURLTaskSchedules + '?limit=10&sort=%5B%7B%22property%22:%22name%22,%22direction%22:%22ASC%22%7D%5D&start=10').respond(200, response);

                        promise = taskScheduleService.getTaskSchedules(null, 10, 10, sort, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with name filter', function () {
                        var filters = {
                            name: {
                                value: 'name1'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskSchedules + '?name=name1').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with host filter', function () {
                        var filters = {
                            host: {
                                value: 'test.sailpoint.com'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskSchedules + '?host=test.sailpoint.com').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter', function () {
                        var filters = {
                            type: {
                                value: 'System'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskSchedules + '?type=System').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type and host filter', function () {
                        var filters = {
                            type: {
                                value: 'System'
                            },
                            host: {
                                value: '127.0.0.1'
                            }
                        };
                        $httpBackend.expectGET(baseURLTaskSchedules + '?type=System&host=127.0.0.1').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a query', function () {
                        var query = 'testName';

                        $httpBackend.expectGET(baseURLTaskSchedules + '?query=testName').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules({}, null, null, null, query);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter and query', function () {
                        var filters = {
                            type: {
                                value: 'System'
                            }
                        },
                            query = 'testName';

                        $httpBackend.expectGET(baseURLTaskSchedules + '?type=System&query=testName').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(filters, null, null, null, query);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with excludeImmediate flag', function () {
                        $httpBackend.expectGET(baseURLTaskSchedules + '?excludeImmediate=false').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(null, null, null, null, null, null, false);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with excludeImmediate flag set to true', function () {
                        $httpBackend.expectGET(baseURLTaskSchedules + '?excludeImmediate=true').respond(200, response);
                        promise = taskScheduleService.getTaskSchedules(null, null, null, null, null, null, true);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                describe('delete TaskSchedule', function () {
                    var response = undefined,
                        promise = undefined,
                        TS1 = undefined;

                    beforeEach(function () {
                        response = {};
                        TS1 = taskScheduleTestData.TASKSCHED1;
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectDELETE(baseURLTaskSchedules + '/' + TS1.name).respond(200, response);
                        promise = taskScheduleService.remove(TS1.name);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('postpone TaskSchedule', function () {
                    var response = undefined,
                        promise = undefined,
                        TS1 = undefined,
                        resDate = undefined;

                    beforeEach(function () {
                        response = {};
                        TS1 = taskScheduleTestData.TASKSCHED1;
                        resDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                    });

                    it('accepts a request', function () {
                        TS1.resumeDate = resDate;

                        $httpBackend.expectPATCH(baseURLTaskSchedules + '/' + TS1.name, { resumeDate: resDate.getTime() }).respond(204, '');
                        promise = taskScheduleService.postpone(TS1.name, resDate);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrU2NoZWR1bGVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9EQUFvRCwyQkFBMkIsVUFBVSxTQUFTO0lBQzFJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpREFBaUQ7WUFDdkcsdUJBQXVCLGdEQUFnRDtXQUN4RSxVQUFVLHVCQUF1QjtRQUNwQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsdUJBQXVCLFlBQVc7O2dCQUV2QyxJQUFNLHVCQUF1QjtnQkFDN0IsSUFBSSxlQUFZO29CQUFFLHNCQUFtQjtvQkFBRSx1QkFBb0I7b0JBQUUsZUFBWTtvQkFBRSxZQUFTOztnQkFFcEYsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjtvQkFDckMsU0FBUyxTQUFTLHFCQUFxQjs7O2dCQUczQyxXQUFXLE9BQU8sVUFBUyxnQkFBZ0IsdUJBQXVCLHdCQUN2QyxnQkFBZ0IsYUFBYTtvQkFDcEQsZUFBZTtvQkFDZixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixZQUFZOzs7Z0JBR2hCLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsYUFBYSxTQUFTLGVBQWU7b0JBQzFDLElBQUksUUFBUSxZQUFZLGdCQUFnQjt3QkFDcEMsZ0JBQWdCOztvQkFFcEIsT0FBTyxTQUFTO29CQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVO3dCQUM1QixPQUFPLFVBQVUsSUFBSSxLQUFLO3dCQUMxQixPQUFPLFNBQVMsTUFBTSxJQUFJLEtBQUs7d0JBQy9CLE9BQU8sU0FBUyxLQUFLLFNBQVMsSUFBSSxLQUFLO3dCQUN2QyxJQUFJLFVBQVUsU0FBUyxLQUFLO3dCQUM1QixPQUFP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TyxTQUFTO3dCQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFVBQVUsSUFBSSxLQUFLOzt3QkFFOUIsYUFBYTs7Ozs7O0dBSXJCIiwiZmlsZSI6ImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrU2NoZWR1bGVTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZSc7XG5pbXBvcnQgJy4vVGFza1NjaGVkdWxlVGVzdERhdGEnO1xuXG4vKipcbiBUZXN0cyBmb3IgVGFza1NjaGVkdWxlIFNlcnZpY2VcbiAqL1xuZGVzY3JpYmUoJ1Rhc2tTY2hlZHVsZVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGJhc2VVUkxUYXNrU2NoZWR1bGVzID0gJy9pZGVudGl0eWlxL3Jlc3QvdGFza1NjaGVkdWxlcyc7XG4gICAgbGV0IFRhc2tTY2hlZHVsZSwgdGFza1NjaGVkdWxlU2VydmljZSwgdGFza1NjaGVkdWxlVGVzdERhdGEsICRodHRwQmFja2VuZCwgU29ydE9yZGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGFza01hbmFnZW1lbnRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NVUlJfVVNFUl9OQU1FJywgJ3NwYWRtaW4nKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfVGFza1NjaGVkdWxlXywgX3Rhc2tTY2hlZHVsZVNlcnZpY2VfLCBfdGFza1NjaGVkdWxlVGVzdERhdGFfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kaHR0cEJhY2tlbmRfLCBfU29ydE9yZGVyXykge1xuICAgICAgICBUYXNrU2NoZWR1bGUgPSBfVGFza1NjaGVkdWxlXztcbiAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZSA9IF90YXNrU2NoZWR1bGVTZXJ2aWNlXztcbiAgICAgICAgdGFza1NjaGVkdWxlVGVzdERhdGEgPSBfdGFza1NjaGVkdWxlVGVzdERhdGFfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5UmVzdWx0KHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcbiAgICAgICAgICAgIGV4cGVjdGVkQ291bnQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHMpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb3VudCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIG9iamVjdHMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvYmogaW5zdGFuY2VvZiBUYXNrU2NoZWR1bGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0IFRhc2tTY2hlZHVsZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICBsZXQgcmVzcG9uc2UsIFRTMSwgVFMyLCBUUzMsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFRTMSA9IHRhc2tTY2hlZHVsZVRlc3REYXRhLlRBU0tTQ0hFRDE7XG4gICAgICAgICAgICBUUzIgPSB0YXNrU2NoZWR1bGVUZXN0RGF0YS5UQVNLU0NIRUQyO1xuICAgICAgICAgICAgVFMzID0gdGFza1NjaGVkdWxlVGVzdERhdGEuVEFTS1NDSEVEMztcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGNvdW50OiAzLFxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgVFMxLCBUUzIsIFRTMyBdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1NjaGVkdWxlcykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcyhudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHBhZ2luYXRpb24gb3B0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1NjaGVkdWxlcyArICc/bGltaXQ9MSZzdGFydD0yJykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcyhudWxsLCAyLCAxLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBzb3J0aW5nIGluZm8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCduYW1lJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoXG4gICAgICAgICAgICAgICAgYmFzZVVSTFRhc2tTY2hlZHVsZXMgK1xuICAgICAgICAgICAgICAgICc/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJuYW1lJTIyLCUyMmRpcmVjdGlvbiUyMjolMjJBU0MlMjIlN0QlNUQmc3RhcnQ9MTAnXG4gICAgICAgICAgICApLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMobnVsbCwgMTAsIDEwLCBzb3J0LCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBuYW1lIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ25hbWUxJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrU2NoZWR1bGVzICsgJz9uYW1lPW5hbWUxJykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tTY2hlZHVsZVNlcnZpY2UuZ2V0VGFza1NjaGVkdWxlcyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBob3N0IGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3Quc2FpbHBvaW50LmNvbSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1NjaGVkdWxlcyArICc/aG9zdD10ZXN0LnNhaWxwb2ludC5jb20nKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHR5cGUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU3lzdGVtJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrU2NoZWR1bGVzICsgJz90eXBlPVN5c3RlbScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggdHlwZSBhbmQgaG9zdCBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdTeXN0ZW0nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBob3N0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMTI3LjAuMC4xJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxUYXNrU2NoZWR1bGVzICsgJz90eXBlPVN5c3RlbSZob3N0PTEyNy4wLjAuMScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggYSBxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gJ3Rlc3ROYW1lJztcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1NjaGVkdWxlcyArICc/cXVlcnk9dGVzdE5hbWUnKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKHt9LCBudWxsLCBudWxsLCBudWxsLCBxdWVyeSk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggdHlwZSBmaWx0ZXIgYW5kIHF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU3lzdGVtJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHF1ZXJ5ID0gJ3Rlc3ROYW1lJztcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMVGFza1NjaGVkdWxlcyArICc/dHlwZT1TeXN0ZW0mcXVlcnk9dGVzdE5hbWUnKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKGZpbHRlcnMsIG51bGwsIG51bGwsIG51bGwsIHF1ZXJ5KTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBleGNsdWRlSW1tZWRpYXRlIGZsYWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tTY2hlZHVsZXMgKyAnP2V4Y2x1ZGVJbW1lZGlhdGU9ZmFsc2UnKS5cbiAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gdGFza1NjaGVkdWxlU2VydmljZS5nZXRUYXNrU2NoZWR1bGVzKG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBleGNsdWRlSW1tZWRpYXRlIGZsYWcgc2V0IHRvIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFRhc2tTY2hlZHVsZXMgKyAnP2V4Y2x1ZGVJbW1lZGlhdGU9dHJ1ZScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSB0YXNrU2NoZWR1bGVTZXJ2aWNlLmdldFRhc2tTY2hlZHVsZXMobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2RlbGV0ZSBUYXNrU2NoZWR1bGUnLCAoKSA9PiB7XG4gICAgICAgIGxldCByZXNwb25zZSwgcHJvbWlzZSwgVFMxO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBUUzEgPSB0YXNrU2NoZWR1bGVUZXN0RGF0YS5UQVNLU0NIRUQxO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RERUxFVEUoYmFzZVVSTFRhc2tTY2hlZHVsZXMgKyAnLycgKyBUUzEubmFtZSkuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tTY2hlZHVsZVNlcnZpY2UucmVtb3ZlKFRTMS5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncG9zdHBvbmUgVGFza1NjaGVkdWxlJywgKCkgPT4ge1xuICAgICAgIGxldCByZXNwb25zZSwgcHJvbWlzZSwgVFMxLCByZXNEYXRlO1xuXG4gICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgVFMxID0gdGFza1NjaGVkdWxlVGVzdERhdGEuVEFTS1NDSEVEMTtcbiAgICAgICAgICAgcmVzRGF0ZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgfSk7XG5cbiAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgVFMxLnJlc3VtZURhdGUgPSByZXNEYXRlO1xuXG4gICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQQVRDSChiYXNlVVJMVGFza1NjaGVkdWxlcyArICcvJyArIFRTMS5uYW1lLCB7IHJlc3VtZURhdGU6IHJlc0RhdGUuZ2V0VGltZSgpIH0pXG4gICAgICAgICAgICAgICAucmVzcG9uZCgyMDQsICcnKTtcbiAgICAgICAgICAgcHJvbWlzZSA9IHRhc2tTY2hlZHVsZVNlcnZpY2UucG9zdHBvbmUoVFMxLm5hbWUsIHJlc0RhdGUpO1xuICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkubm90LnRvQmUobnVsbCk7XG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
