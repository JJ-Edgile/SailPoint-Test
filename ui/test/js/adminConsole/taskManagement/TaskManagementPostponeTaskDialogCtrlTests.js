System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var taskManagementModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModuleJs) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('TaskManagementPostponeTaskDialogCtrl', function () {

                var taskScheduleService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    TaskScheduleTestData = undefined,
                    TaskSchedule = undefined,
                    testService = undefined,
                    spNotificationService = undefined;

                beforeEach(module(taskManagementModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_taskScheduleService_, _$controller_, _$rootScope_, _taskScheduleTestData_, _TaskSchedule_, _testService_, _spNotificationService_) {
                    taskScheduleService = _taskScheduleService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    TaskScheduleTestData = _taskScheduleTestData_;
                    TaskSchedule = _TaskSchedule_;
                    testService = _testService_;
                    spNotificationService = _spNotificationService_;
                }));

                function createController(taskSched, resumeDate) {
                    return $controller('TaskManagementPostponeTaskDialogCtrl', {

                        taskScheduleService: taskScheduleService,
                        $scope: $rootScope.$new(),
                        taskSchedule: taskSched,
                        spNotificationService: spNotificationService
                    });
                }

                describe('disable submit', function () {
                    it('should disable if date before now', function () {

                        var controller = undefined,
                            taskSched = new TaskSchedule(TaskScheduleTestData.TASKSCHED1),
                            currDate = new Date();
                        controller = createController(taskSched);
                        //Set Date older
                        currDate.setDate(currDate.getDate() - 1);
                        controller.resumeDate = currDate;
                        expect(controller.disableSubmit()).toEqual(true);
                    });

                    it('should return false if date in future', function () {
                        var controller = undefined,
                            taskSched = new TaskSchedule(TaskScheduleTestData.TASKSCHED1);
                        controller = createController(taskSched);
                        controller.resumeDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                        expect(controller.disableSubmit()).toEqual(false);
                    });
                });

                describe('postpone schedule', function () {

                    it('should handle request', function () {
                        var controller = undefined,
                            taskSched = new TaskSchedule(TaskScheduleTestData.TASKSCHED1),
                            postponeDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                        spyOn(taskScheduleService, 'postpone').and.returnValue(testService.createPromise(false, {}));
                        controller = createController(taskSched);
                        controller.resumeDate = postponeDate;
                        controller.postponeSchedule();
                        expect(taskScheduleService.postpone).toHaveBeenCalledWith(taskSched.name, postponeDate);
                        $rootScope.$digest();
                        expect(taskSched.resumeDate).toEqual(postponeDate);
                    });

                    it('should trigger notifications upon failed request', function () {
                        var controller = undefined,
                            taskSched = new TaskSchedule(TaskScheduleTestData.TASKSCHED1),
                            postponeDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                        spyOn(taskScheduleService, 'postpone').and.returnValue(testService.createPromise(true, {}));
                        spyOn(spNotificationService, 'addNotification').and.callThrough();
                        spyOn(spNotificationService, 'triggerDirective').and.callThrough();
                        controller = createController(taskSched);
                        controller.resumeDate = postponeDate;
                        controller.postponeSchedule();
                        expect(taskScheduleService.postpone).toHaveBeenCalledWith(taskSched.name, postponeDate);
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalled();
                        expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFBvc3Rwb25lVGFza0RpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdURBQXVELHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBS3pJOztJQUVBLElBQUksc0JBQXNCO0lBQzFCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEO1dBQzFFLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsd0NBQXdDLFlBQU07O2dCQUVuRCxJQUFJLHNCQUFtQjtvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsdUJBQW9CO29CQUFFLGVBQVk7b0JBQUUsY0FBVztvQkFDN0Ysd0JBQXFCOztnQkFFekIsV0FBVyxPQUFPLHNCQUFzQjs7O2dCQUd4QyxXQUFXLE9BQU8sVUFBQyx1QkFBdUIsZUFBZSxjQUFjLHdCQUNwRCxnQkFBZ0IsZUFBZSx5QkFBNEI7b0JBQzFFLHNCQUFzQjtvQkFDdEIsY0FBYztvQkFDZCxhQUFhO29CQUNiLHVCQUF1QjtvQkFDdkIsZUFBZTtvQkFDZixjQUFjO29CQUNkLHdCQUF3Qjs7O2dCQUk1QixTQUFTLGlCQUFpQixXQUFXLFlBQVk7b0JBQzdDLE9BQU8sWUFBWSx3Q0FBd0M7O3dCQUV2RCxxQkFBcUI7d0JBQ3JCLFFBQVEsV0FBVzt3QkFDbkIsY0FBYzt3QkFDZCx1QkFBdUI7Ozs7Z0JBSS9CLFNBQVMsa0JBQWtCLFlBQU07b0JBQzdCLEdBQUcscUNBQXFDLFlBQU07O3dCQUUxQyxJQUFJLGFBQVU7NEJBQUUsWUFBWSxJQUFJLGFBQWEscUJBQXFCOzRCQUNsRSxXQUFXLElBQUk7d0JBQ2YsYUFBYSxpQkFBaUI7O3dCQUU5QixTQUFTLFFBQVEsU0FBUyxZQUFZO3dCQUN0QyxXQUFXLGFBQWE7d0JBQ3hCLE9BQU8sV0FBVyxpQkFBaUIsUUFBUTs7O29CQUcvQyxHQUFJLHlDQUF5QyxZQUFNO3dCQUMvQyxJQUFJLGFBQVU7NEJBQUUsWUFBWSxJQUFJLGFBQWEscUJBQXFCO3dCQUNsRSxhQUFhLGlCQUFpQjt3QkFDOUIsV0FBVyxhQUFhLElBQUksS0FBSyxJQUFJLE9BQU8sWUFBWSxLQUFLLEtBQUssS0FBSzt3QkFDdkUsT0FBTyxXQUFXLGlCQUFpQixRQUFROzs7O2dCQUluRCxTQUFTLHFCQUFxQixZQUFNOztvQkFFaEMsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsSUFBSSxhQUFVOzRCQUFFLFlBQVksSUFBSSxhQUFhLHFCQUFxQjs0QkFDbEUsZUFBZSxJQUFJLEtBQUssSUFBSSxPQUFPLFlBQVksS0FBSyxLQUFLLEtBQUs7d0JBQzlELE1BQU0scUJBQXFCLFlBQVksSUFBSSxZQUN2QyxZQUFZLGNBQWMsT0FBTzt3QkFFckMsYUFBYSxpQkFBaUI7d0JBQzlCLFdBQVcsYUFBYTt3QkFDeEIsV0FBVzt3QkFDWCxPQUFPLG9CQUFvQixVQUFVLHFCQUNqQyxVQUFVLE1BQU07d0JBRXBCLFdBQVc7d0JBQ1gsT0FBTyxVQUFVLFlBQVksUUFBUTs7O29CQUd6QyxHQUFHLG9EQUFvRCxZQUFNO3dCQUN6RCxJQUFJLGFBQVU7NEJBQUUsWUFBWSxJQUFJLGFBQWEscUJBQXFCOzRCQUM5RCxlQUFlLElBQUksS0FBSyxJQUFJLE9BQU8sWUFBWSxLQUFLLEtBQUssS0FBSzt3QkFDbEUsTUFBTSxxQkFBcUIsWUFBWSxJQUFJLFlBQ3ZDLFlBQVksY0FBYyxNQUFNO3dCQUVwQyxNQUFNLHVCQUF1QixtQkFBbUIsSUFBSTt3QkFDcEQsTUFBTSx1QkFBdUIsb0JBQW9CLElBQUk7d0JBQ3JELGFBQWEsaUJBQWlCO3dCQUM5QixXQUFXLGFBQWE7d0JBQ3hCLFdBQVc7d0JBQ1gsT0FBTyxvQkFBb0IsVUFBVSxxQkFDakMsVUFBVSxNQUFNO3dCQUVwQixXQUFXO3dCQUNYLE9BQU8sc0JBQXNCLGlCQUFpQjt3QkFDOUMsT0FBTyxzQkFBc0Isa0JBQWtCOzs7Ozs7R0FheEQiLCJmaWxlIjoiYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50UG9zdHBvbmVUYXNrRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0YXNrTWFuYWdlbWVudE1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRNb2R1bGUuanMnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ1Rhc2tNYW5hZ2VtZW50UG9zdHBvbmVUYXNrRGlhbG9nQ3RybCcsICgpID0+IHtcblxuICAgIGxldCB0YXNrU2NoZWR1bGVTZXJ2aWNlLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgVGFza1NjaGVkdWxlVGVzdERhdGEsIFRhc2tTY2hlZHVsZSwgdGVzdFNlcnZpY2UsXG4gICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF90YXNrU2NoZWR1bGVTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfdGFza1NjaGVkdWxlVGVzdERhdGFfLFxuICAgICAgICAgICAgICAgICAgICAgICBfVGFza1NjaGVkdWxlXywgX3Rlc3RTZXJ2aWNlXywgX3NwTm90aWZpY2F0aW9uU2VydmljZV8pID0+IHtcbiAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZSA9IF90YXNrU2NoZWR1bGVTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBUYXNrU2NoZWR1bGVUZXN0RGF0YSA9IF90YXNrU2NoZWR1bGVUZXN0RGF0YV87XG4gICAgICAgIFRhc2tTY2hlZHVsZSA9IF9UYXNrU2NoZWR1bGVfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuXG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcih0YXNrU2NoZWQsIHJlc3VtZURhdGUpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdUYXNrTWFuYWdlbWVudFBvc3Rwb25lVGFza0RpYWxvZ0N0cmwnLCB7XG5cbiAgICAgICAgICAgIHRhc2tTY2hlZHVsZVNlcnZpY2U6IHRhc2tTY2hlZHVsZVNlcnZpY2UsXG4gICAgICAgICAgICAkc2NvcGU6ICRyb290U2NvcGUuJG5ldygpLFxuICAgICAgICAgICAgdGFza1NjaGVkdWxlOiB0YXNrU2NoZWQsXG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2U6IHNwTm90aWZpY2F0aW9uU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZGlzYWJsZSBzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgZGlzYWJsZSBpZiBkYXRlIGJlZm9yZSBub3cnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb250cm9sbGVyLCB0YXNrU2NoZWQgPSBuZXcgVGFza1NjaGVkdWxlKFRhc2tTY2hlZHVsZVRlc3REYXRhLlRBU0tTQ0hFRDEpLFxuICAgICAgICAgICAgY3VyckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29udHJvbGxlciA9IGNyZWF0ZUNvbnRyb2xsZXIodGFza1NjaGVkKTtcbiAgICAgICAgICAgIC8vU2V0IERhdGUgb2xkZXJcbiAgICAgICAgICAgIGN1cnJEYXRlLnNldERhdGUoY3VyckRhdGUuZ2V0RGF0ZSgpIC0gMSk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnJlc3VtZURhdGUgPSBjdXJyRGF0ZTtcbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLmRpc2FibGVTdWJtaXQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGRhdGUgaW4gZnV0dXJlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xsZXIsIHRhc2tTY2hlZCA9IG5ldyBUYXNrU2NoZWR1bGUoVGFza1NjaGVkdWxlVGVzdERhdGEuVEFTS1NDSEVEMSk7XG4gICAgICAgICAgICBjb250cm9sbGVyID0gY3JlYXRlQ29udHJvbGxlcih0YXNrU2NoZWQpO1xuICAgICAgICAgICAgY29udHJvbGxlci5yZXN1bWVEYXRlID0gbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgICAgIGV4cGVjdChjb250cm9sbGVyLmRpc2FibGVTdWJtaXQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Bvc3Rwb25lIHNjaGVkdWxlJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udHJvbGxlciwgdGFza1NjaGVkID0gbmV3IFRhc2tTY2hlZHVsZShUYXNrU2NoZWR1bGVUZXN0RGF0YS5UQVNLU0NIRUQxKSxcbiAgICAgICAgICAgIHBvc3Rwb25lRGF0ZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICBzcHlPbih0YXNrU2NoZWR1bGVTZXJ2aWNlLCAncG9zdHBvbmUnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgeyB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBjcmVhdGVDb250cm9sbGVyKHRhc2tTY2hlZCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnJlc3VtZURhdGUgPSBwb3N0cG9uZURhdGU7XG4gICAgICAgICAgICBjb250cm9sbGVyLnBvc3Rwb25lU2NoZWR1bGUoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YXNrU2NoZWR1bGVTZXJ2aWNlLnBvc3Rwb25lKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB0YXNrU2NoZWQubmFtZSwgcG9zdHBvbmVEYXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICBleHBlY3QodGFza1NjaGVkLnJlc3VtZURhdGUpLnRvRXF1YWwocG9zdHBvbmVEYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0cmlnZ2VyIG5vdGlmaWNhdGlvbnMgdXBvbiBmYWlsZWQgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250cm9sbGVyLCB0YXNrU2NoZWQgPSBuZXcgVGFza1NjaGVkdWxlKFRhc2tTY2hlZHVsZVRlc3REYXRhLlRBU0tTQ0hFRDEpLFxuICAgICAgICAgICAgICAgIHBvc3Rwb25lRGF0ZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICBzcHlPbih0YXNrU2NoZWR1bGVTZXJ2aWNlLCAncG9zdHBvbmUnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZSh0cnVlLCB7IH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3B5T24oc3BOb3RpZmljYXRpb25TZXJ2aWNlLCAnYWRkTm90aWZpY2F0aW9uJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICd0cmlnZ2VyRGlyZWN0aXZlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBjb250cm9sbGVyID0gY3JlYXRlQ29udHJvbGxlcih0YXNrU2NoZWQpO1xuICAgICAgICAgICAgY29udHJvbGxlci5yZXN1bWVEYXRlID0gcG9zdHBvbmVEYXRlO1xuICAgICAgICAgICAgY29udHJvbGxlci5wb3N0cG9uZVNjaGVkdWxlKCk7XG4gICAgICAgICAgICBleHBlY3QodGFza1NjaGVkdWxlU2VydmljZS5wb3N0cG9uZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgdGFza1NjaGVkLm5hbWUsIHBvc3Rwb25lRGF0ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS50cmlnZ2VyRGlyZWN0aXZlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
