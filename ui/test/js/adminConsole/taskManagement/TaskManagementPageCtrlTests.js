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

            describe('TaskManagementPageCtrl', function () {

                var taskResultService = undefined,
                    taskScheduleService = undefined,
                    DataRefreshTrigger = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined;

                beforeEach(module(taskManagementModule, dataViewModule, testModule));

                beforeEach(inject(function (_taskResultService_, _taskScheduleService_, _DataRefreshTrigger_, _testService_, _$controller_, _$rootScope_) {

                    taskResultService = _taskResultService_;
                    taskScheduleService = _taskScheduleService_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                }));

                function createController() {
                    return $controller('TaskManagementPageCtrl', {
                        taskResultService: taskResultService,
                        taskScheduleService: taskScheduleService
                    });
                }

                describe('populateTabCounts', function () {

                    var taskResultCounts = {
                        active: 5,
                        completed: 50
                    },
                        taskScheduleCounts = {
                        scheduled: 10
                    };

                    beforeEach(function () {
                        spyOn(taskResultService, 'getTabCounts').and.returnValue(testService.createPromise(false, taskResultCounts));
                        spyOn(taskScheduleService, 'getTabCounts').and.returnValue(testService.createPromise(false, taskScheduleCounts));
                    });

                    it('should default all status counts to 0', function () {
                        var ctrl = createController();

                        expect(ctrl.getTabCounts()).toBeDefined();
                        expect(ctrl.getTabCounts().getActiveCount()).toEqual(0);
                        expect(ctrl.getTabCounts().getScheduledCount()).toEqual(0);
                        expect(ctrl.getTabCounts().getCompletedCount()).toEqual(0);
                    });

                    it('should correctly populate counts when fetched', function () {
                        var ctrl = createController();
                        ctrl.populateTabCounts();

                        $rootScope.$apply();

                        expect(taskResultService.getTabCounts).toHaveBeenCalled();
                        expect(taskScheduleService.getTabCounts).toHaveBeenCalled();
                        expect(ctrl.getTabCounts().getActiveCount()).toEqual(taskResultCounts.active);
                        expect(ctrl.getTabCounts().getScheduledCount()).toEqual(taskScheduleCounts.scheduled);
                        expect(ctrl.getTabCounts().getCompletedCount()).toEqual(taskResultCounts.completed);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFBhZ2VDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHVEQUF1RCxrQ0FBa0MsdUJBQXVCLFVBQVUsU0FBUzs7O0lBRzNLOztJQUVBLElBQUksc0JBQXNCLGdCQUFnQjtJQUMxQyxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtREFBbUQ7WUFDekcsdUJBQXVCLGtEQUFrRDtXQUMxRSxVQUFVLCtCQUErQjtZQUN4QyxpQkFBaUIsOEJBQThCO1dBQ2hELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBUDdCLFNBQVMsMEJBQTBCLFlBQU07O2dCQUVyQyxJQUFJLG9CQUFpQjtvQkFBRSxzQkFBbUI7b0JBQUUscUJBQWtCO29CQUMxRCxjQUFXO29CQUFFLGNBQVc7b0JBQUUsYUFBVTs7Z0JBRXhDLFdBQVcsT0FBTyxzQkFBc0IsZ0JBQWdCOztnQkFFeEQsV0FBVyxPQUFPLFVBQUMscUJBQXFCLHVCQUF1QixzQkFDNUMsZUFBZSxlQUFlLGNBQWlCOztvQkFFOUQsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7OztnQkFJakIsU0FBUyxtQkFBbUI7b0JBQ3hCLE9BQU8sWUFBWSwwQkFBMEI7d0JBQ3pDLG1CQUFtQjt3QkFDbkIscUJBQXFCOzs7O2dCQUk3QixTQUFTLHFCQUFxQixZQUFNOztvQkFFaEMsSUFBSSxtQkFBbUI7d0JBQ2YsUUFBUTt3QkFDUixXQUFXOzt3QkFFZixxQkFBcUI7d0JBQ2pCLFdBQVc7OztvQkFHbkIsV0FBVyxZQUFNO3dCQUNiLE1BQU0sbUJBQW1CLGdCQUFnQixJQUFJLFlBQ3pDLFlBQVksY0FBYyxPQUFPO3dCQUVyQyxNQUFNLHFCQUFxQixnQkFBZ0IsSUFBSSxZQUMzQyxZQUFZLGNBQWMsT0FBTzs7O29CQUl6QyxHQUFHLHlDQUF5QyxZQUFNO3dCQUM5QyxJQUFJLE9BQU87O3dCQUVYLE9BQU8sS0FBSyxnQkFBZ0I7d0JBQzVCLE9BQU8sS0FBSyxlQUFlLGtCQUFrQixRQUFRO3dCQUNyRCxPQUFPLEtBQUssZUFBZSxxQkFBcUIsUUFBUTt3QkFDeEQsT0FBTyxLQUFLLGVBQWUscUJBQXFCLFFBQVE7OztvQkFHNUQsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsSUFBSSxPQUFPO3dCQUNYLEtBQUs7O3dCQUVMLFdBQVc7O3dCQUVYLE9BQU8sa0JBQWtCLGNBQWM7d0JBQ3ZDLE9BQU8sb0JBQW9CLGNBQWM7d0JBQ3pDLE9BQU8sS0FBSyxlQUFlLGtCQUFrQixRQUFRLGlCQUFpQjt3QkFDdEUsT0FBTyxLQUFLLGVBQWUscUJBQXFCLFFBQVEsbUJBQW1CO3dCQUMzRSxPQUFPLEtBQUssZUFBZSxxQkFBcUIsUUFBUSxpQkFBaUI7Ozs7OztHQWFsRiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRQYWdlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZS5qcyc7XG5pbXBvcnQgZGF0YVZpZXdNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L0RhdGFWaWV3TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdUYXNrTWFuYWdlbWVudFBhZ2VDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IHRhc2tSZXN1bHRTZXJ2aWNlLCB0YXNrU2NoZWR1bGVTZXJ2aWNlLCBEYXRhUmVmcmVzaFRyaWdnZXIsXG4gICAgICAgIHRlc3RTZXJ2aWNlLCAkY29udHJvbGxlciwgJHJvb3RTY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlLCBkYXRhVmlld01vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF90YXNrUmVzdWx0U2VydmljZV8sIF90YXNrU2NoZWR1bGVTZXJ2aWNlXywgX0RhdGFSZWZyZXNoVHJpZ2dlcl8sXG4gICAgICAgICAgICAgICAgICAgICAgIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXykgPT4ge1xuXG4gICAgICAgIHRhc2tSZXN1bHRTZXJ2aWNlID0gX3Rhc2tSZXN1bHRTZXJ2aWNlXztcbiAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZSA9IF90YXNrU2NoZWR1bGVTZXJ2aWNlXztcbiAgICAgICAgRGF0YVJlZnJlc2hUcmlnZ2VyID0gX0RhdGFSZWZyZXNoVHJpZ2dlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgIH0pKTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdUYXNrTWFuYWdlbWVudFBhZ2VDdHJsJywge1xuICAgICAgICAgICAgdGFza1Jlc3VsdFNlcnZpY2U6IHRhc2tSZXN1bHRTZXJ2aWNlLFxuICAgICAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZTogdGFza1NjaGVkdWxlU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgncG9wdWxhdGVUYWJDb3VudHMnLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRhc2tSZXN1bHRDb3VudHMgPSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlOiA1LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogNTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YXNrU2NoZWR1bGVDb3VudHMgPSB7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVkOiAxMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHRhc2tSZXN1bHRTZXJ2aWNlLCAnZ2V0VGFiQ291bnRzJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHRhc2tSZXN1bHRDb3VudHMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3B5T24odGFza1NjaGVkdWxlU2VydmljZSwgJ2dldFRhYkNvdW50cycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB0YXNrU2NoZWR1bGVDb3VudHMpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlZmF1bHQgYWxsIHN0YXR1cyBjb3VudHMgdG8gMCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRUYWJDb3VudHMoKSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFRhYkNvdW50cygpLmdldEFjdGl2ZUNvdW50KCkpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRUYWJDb3VudHMoKS5nZXRTY2hlZHVsZWRDb3VudCgpKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VGFiQ291bnRzKCkuZ2V0Q29tcGxldGVkQ291bnQoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcG9wdWxhdGUgY291bnRzIHdoZW4gZmV0Y2hlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5wb3B1bGF0ZVRhYkNvdW50cygpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UuZ2V0VGFiQ291bnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QodGFza1NjaGVkdWxlU2VydmljZS5nZXRUYWJDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFRhYkNvdW50cygpLmdldEFjdGl2ZUNvdW50KCkpLnRvRXF1YWwodGFza1Jlc3VsdENvdW50cy5hY3RpdmUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VGFiQ291bnRzKCkuZ2V0U2NoZWR1bGVkQ291bnQoKSkudG9FcXVhbCh0YXNrU2NoZWR1bGVDb3VudHMuc2NoZWR1bGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFRhYkNvdW50cygpLmdldENvbXBsZXRlZENvdW50KCkpLnRvRXF1YWwodGFza1Jlc3VsdENvdW50cy5jb21wbGV0ZWQpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
