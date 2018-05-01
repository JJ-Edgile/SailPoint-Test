System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved.
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

            describe('TaskManageMentStackTraceDialogCtrl', function () {

                var taskResultService = undefined,
                    $controller = undefined,
                    spNotificationService = undefined,
                    taskResultTestData = undefined,
                    TaskResult = undefined,
                    $q = undefined,
                    $scope = undefined;

                beforeEach(module(taskManagementModule, testModule));
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_taskResultService_, _spNotificationService_, _$controller_, _$rootScope_, _TaskResult_, _taskResultTestData_, _$q_) {

                    taskResultService = _taskResultService_;
                    taskResultTestData = _taskResultTestData_;
                    $controller = _$controller_;
                    $scope = _$rootScope_.$new();
                    spNotificationService = _spNotificationService_;
                    TaskResult = _TaskResult_;
                    $q = _$q_;
                }));

                function createController(tr, isAdmin, hasRights) {
                    var controller = $controller('TaskManagementStackTraceDialogCtrl', {
                        taskResultService: taskResultService,
                        $scope: $scope,
                        taskResult: tr,
                        spNotificationService: spNotificationService,
                        FULL_TASK_ACCESS: hasRights,
                        SP_SYSTEM_ADMIN: isAdmin
                    });
                    return controller;
                }

                function createTaskResult() {
                    return new TaskResult(taskResultTestData.TASKRES1);
                }

                describe('stack trace button', function () {
                    var ctrl = undefined,
                        item = undefined;

                    beforeEach(function () {
                        item = createTaskResult();
                    });

                    it('should be enabled by default', function () {
                        ctrl = createController(item, true, true);
                        expect(ctrl.isStackButtonDisabled()).toBe(false);
                    });

                    it('should be disabled when a request is in progress', function () {
                        ctrl = createController(item, true, true);
                        ctrl.requested = true;
                        expect(ctrl.isStackButtonDisabled()).toBe(true);
                    });

                    it('should be disabled by default due to improper rights', function () {
                        ctrl = createController(item, false, false);
                        expect(ctrl.isStackButtonDisabled()).toBe(true);
                    });

                    it('should call service when requested ', function () {
                        ctrl = createController(item, false, true);
                        spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                        ctrl.requestStackTrace();
                        expect(taskResultService.requestStackTrace).toHaveBeenCalledWith(item.id);
                    });

                    it('should disable button when requested', function () {
                        ctrl = createController(item, false, true);
                        spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                        expect(ctrl.requested).toBe(false);
                        ctrl.requestStackTrace();
                        $scope.$apply();
                        expect(ctrl.requested).toBe(true);
                    });

                    it('should call trigger notifications after service call', function () {
                        ctrl = createController(item, false, true);
                        spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                        spyOn(spNotificationService, 'addNotification').and.callThrough();
                        spyOn(spNotificationService, 'triggerDirective').and.callThrough();
                        ctrl.requestStackTrace();
                        $scope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalled();
                        expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFN0YWNrVHJhY2VEaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHVEQUF1RCx1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUt6STs7SUFFQSxJQUFJLHNCQUFzQjtJQUMxQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtREFBbUQ7WUFDekcsdUJBQXVCLGtEQUFrRDtXQUMxRSxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHNDQUFzQyxZQUFNOztnQkFFakQsSUFBSSxvQkFBaUI7b0JBQUUsY0FBVztvQkFBRSx3QkFBcUI7b0JBQUUscUJBQWtCO29CQUN6RSxhQUFVO29CQUFFLEtBQUU7b0JBQUUsU0FBTTs7Z0JBRTFCLFdBQVcsT0FBTyxzQkFBc0I7O2dCQUV4QyxXQUFXLE9BQU8sVUFBQyxxQkFBcUIseUJBQ3JCLGVBQWUsY0FBYyxjQUFjLHNCQUFzQixNQUFTOztvQkFFekYsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGNBQWM7b0JBQ2QsU0FBUyxhQUFhO29CQUN0Qix3QkFBd0I7b0JBQ3hCLGFBQWE7b0JBQ2IsS0FBSzs7O2dCQUdULFNBQVMsaUJBQWlCLElBQUksU0FBUyxXQUFXO29CQUM5QyxJQUFJLGFBQWEsWUFBWSxzQ0FBc0M7d0JBQy9ELG1CQUFtQjt3QkFDbkIsUUFBUTt3QkFDUixZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsa0JBQWtCO3dCQUNsQixpQkFBaUI7O29CQUVyQixPQUFPOzs7Z0JBR1gsU0FBUyxtQkFBbUI7b0JBQ3hCLE9BQU8sSUFBSSxXQUFXLG1CQUFtQjs7O2dCQUc3QyxTQUFTLHNCQUFzQixZQUFNO29CQUNqQyxJQUFJLE9BQUk7d0JBQUUsT0FBSTs7b0JBRWQsV0FBVyxZQUFNO3dCQUNiLE9BQU87OztvQkFHWCxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxPQUFPLGlCQUFpQixNQUFNLE1BQU07d0JBQ3BDLE9BQU8sS0FBSyx5QkFBeUIsS0FBSzs7O29CQUc5QyxHQUFHLG9EQUFvRCxZQUFNO3dCQUN6RCxPQUFPLGlCQUFpQixNQUFNLE1BQU07d0JBQ3BDLEtBQUssWUFBWTt3QkFDakIsT0FBTyxLQUFLLHlCQUF5QixLQUFLOzs7b0JBRzlDLEdBQUcsd0RBQXdELFlBQU07d0JBQzdELE9BQU8saUJBQWlCLE1BQU0sT0FBTzt3QkFDckMsT0FBTyxLQUFLLHlCQUF5QixLQUFLOzs7b0JBRzlDLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLE9BQU8saUJBQWlCLE1BQU0sT0FBTzt3QkFDckMsTUFBTSxtQkFBbUIscUJBQXFCLElBQUksWUFBWSxHQUFHO3dCQUNqRSxLQUFLO3dCQUNMLE9BQU8sa0JBQWtCLG1CQUFtQixxQkFBcUIsS0FBSzs7O29CQUcxRSxHQUFHLHdDQUF3QyxZQUFNO3dCQUM3QyxPQUFPLGlCQUFpQixNQUFNLE9BQU87d0JBQ3JDLE1BQU0sbUJBQW1CLHFCQUFxQixJQUFJLFlBQVksR0FBRzt3QkFDakUsT0FBTyxLQUFLLFdBQVcsS0FBSzt3QkFDNUIsS0FBSzt3QkFDTCxPQUFPO3dCQUNQLE9BQU8sS0FBSyxXQUFXLEtBQUs7OztvQkFHaEMsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsT0FBTyxpQkFBaUIsTUFBTSxPQUFPO3dCQUNyQyxNQUFNLG1CQUFtQixxQkFBcUIsSUFBSSxZQUFZLEdBQUc7d0JBQ2pFLE1BQU0sdUJBQXVCLG1CQUFtQixJQUFJO3dCQUNwRCxNQUFNLHVCQUF1QixvQkFBb0IsSUFBSTt3QkFDckQsS0FBSzt3QkFDTCxPQUFPO3dCQUNQLE9BQU8sc0JBQXNCLGlCQUFpQjt3QkFDOUMsT0FBTyxzQkFBc0Isa0JBQWtCOzs7Ozs7R0FtQnhEIiwiZmlsZSI6ImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFN0YWNrVHJhY2VEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZS5qcyc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnVGFza01hbmFnZU1lbnRTdGFja1RyYWNlRGlhbG9nQ3RybCcsICgpID0+IHtcblxuICAgIGxldCB0YXNrUmVzdWx0U2VydmljZSwgJGNvbnRyb2xsZXIsIHNwTm90aWZpY2F0aW9uU2VydmljZSwgdGFza1Jlc3VsdFRlc3REYXRhLFxuICAgICAgICBUYXNrUmVzdWx0LCAkcSwgJHNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGFza01hbmFnZW1lbnRNb2R1bGUsIHRlc3RNb2R1bGUpKTtcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF90YXNrUmVzdWx0U2VydmljZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9UYXNrUmVzdWx0XywgX3Rhc2tSZXN1bHRUZXN0RGF0YV8sIF8kcV8pID0+IHtcblxuICAgICAgICB0YXNrUmVzdWx0U2VydmljZSA9IF90YXNrUmVzdWx0U2VydmljZV87XG4gICAgICAgIHRhc2tSZXN1bHRUZXN0RGF0YSA9IF90YXNrUmVzdWx0VGVzdERhdGFfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICBUYXNrUmVzdWx0ID0gX1Rhc2tSZXN1bHRfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcih0ciwgaXNBZG1pbiwgaGFzUmlnaHRzKSB7XG4gICAgICAgIGxldCBjb250cm9sbGVyID0gJGNvbnRyb2xsZXIoJ1Rhc2tNYW5hZ2VtZW50U3RhY2tUcmFjZURpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICB0YXNrUmVzdWx0U2VydmljZTogdGFza1Jlc3VsdFNlcnZpY2UsXG4gICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICAgIHRhc2tSZXN1bHQ6IHRyLFxuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlOiBzcE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBGVUxMX1RBU0tfQUNDRVNTOiBoYXNSaWdodHMsXG4gICAgICAgICAgICBTUF9TWVNURU1fQURNSU46IGlzQWRtaW5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFza1Jlc3VsdCh0YXNrUmVzdWx0VGVzdERhdGEuVEFTS1JFUzEpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzdGFjayB0cmFjZSBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgIGxldCBjdHJsLCBpdGVtO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZVRhc2tSZXN1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBlbmFibGVkIGJ5IGRlZmF1bHQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tCdXR0b25EaXNhYmxlZCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBkaXNhYmxlZCB3aGVuIGEgcmVxdWVzdCBpcyBpbiBwcm9ncmVzcycsICgpID0+IHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0sIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgY3RybC5yZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdGFja0J1dHRvbkRpc2FibGVkKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZGlzYWJsZWQgYnkgZGVmYXVsdCBkdWUgdG8gaW1wcm9wZXIgcmlnaHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tCdXR0b25EaXNhYmxlZCgpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2VydmljZSB3aGVuIHJlcXVlc3RlZCAnLCAoKSA9PiB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3JlcXVlc3RTdGFja1RyYWNlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICBjdHJsLnJlcXVlc3RTdGFja1RyYWNlKCk7XG4gICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UucmVxdWVzdFN0YWNrVHJhY2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0uaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRpc2FibGUgYnV0dG9uIHdoZW4gcmVxdWVzdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgc3B5T24odGFza1Jlc3VsdFNlcnZpY2UsICdyZXF1ZXN0U3RhY2tUcmFjZScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwucmVxdWVzdGVkKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgIGN0cmwucmVxdWVzdFN0YWNrVHJhY2UoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnJlcXVlc3RlZCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRyaWdnZXIgbm90aWZpY2F0aW9ucyBhZnRlciBzZXJ2aWNlIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3JlcXVlc3RTdGFja1RyYWNlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGROb3RpZmljYXRpb24nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ3RyaWdnZXJEaXJlY3RpdmUnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIGN0cmwucmVxdWVzdFN0YWNrVHJhY2UoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
