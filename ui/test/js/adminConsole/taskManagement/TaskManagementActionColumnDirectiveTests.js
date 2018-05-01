System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var taskManagementModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModuleJs) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spTaskManagementActiveActionColumn', function () {

                var elementDefinition = '<sp-task-management-active-action-column sp-model="item" />',
                    TaskResult = undefined,
                    taskResultTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(taskManagementModule, testModule));

                beforeEach(inject(function (_TaskResult_, _$compile_, _taskResultTestData_, _$rootScope_) {
                    TaskResult = _TaskResult_;
                    taskResultTestData = _taskResultTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);

                    $scope.columnDataCtrl = {};
                    $scope.columnDataCtrl.spModel = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createTaskResult() {
                    return new TaskResult(taskResultTestData.TASKRES1);
                }

                it('should render relevant buttons', function () {
                    var tr = createTaskResult(),
                        el = createElement(tr);

                    // find terminate button
                    expect(el.find('i.fa-code').length).toEqual(1);
                });

                describe('TaskManagementActiveActionColumnDirectiveCtrl', function () {

                    var taskResultService = undefined,
                        spModal = undefined,
                        $controller = undefined,
                        $q = undefined;

                    beforeEach(inject(function (_$controller_, _$q_, _taskResultService_, _spModal_) {
                        taskResultService = _taskResultService_;
                        $controller = _$controller_;
                        $q = _$q_;
                        spModal = _spModal_;
                    }));

                    function createController(isAdmin, hasRights) {

                        return $controller('TaskManagementActiveActionColumnDirectiveCtrl', {
                            taskResultService: taskResultService,
                            SP_SYSTEM_ADMIN: isAdmin,
                            FULL_TASK_ACCESS: hasRights
                        });
                    }

                    describe('show terminate button', function () {
                        it('should return true if user is an admin', function () {
                            var ctrl = createController('true', false);
                            expect(ctrl.showTerminateButton()).toBeTruthy();
                        });

                        it('should return true if user is admin and has rights', function () {
                            var ctrl = createController('true', true);
                            expect(ctrl.showTerminateButton()).toBeTruthy();
                        });

                        it('should return true if user has the rights', function () {
                            var ctrl = createController(false, true);
                            expect(ctrl.showTerminateButton()).toBeTruthy();
                        });

                        it('should return false if user does not have the rights', function () {
                            var ctrl = createController(false, false);
                            expect(ctrl.showTerminateButton()).not.toBeTruthy();
                        });
                    });

                    describe('terminate task', function () {
                        var item = undefined,
                            deferred = undefined;

                        beforeEach(function () {
                            item = createTaskResult();
                            deferred = $q.defer();
                        });

                        it('should pop open the modal', function () {
                            var ctrl = undefined;

                            spyOn(spModal, 'confirm').and.callThrough();
                            ctrl = createController(false, true);
                            ctrl.openTerminateTaskDialog(item);
                            deferred.resolve();
                            $scope.$apply();
                            expect(spModal.confirm).toHaveBeenCalled();
                        });

                        it('should call the service', function () {
                            var ctrl = undefined;
                            ctrl = createController(false, true);
                            spyOn(taskResultService, 'terminateTaskResult').and.returnValue($q.when());
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            ctrl.openTerminateTaskDialog(item);
                            $scope.$apply();
                            expect(taskResultService.terminateTaskResult).toHaveBeenCalledWith(item.id);
                            expect(spModal.confirm).toHaveBeenCalled();
                        });

                        it('should not call the service when not confirmed', function () {
                            var ctrl = createController(false, true);
                            spyOn(taskResultService, 'terminateTaskResult').and.returnValue($q.when());
                            spyOn(spModal, 'confirm').and.returnValue($q.reject());
                            ctrl.openTerminateTaskDialog(item);
                            $scope.$apply();
                            expect(taskResultService.terminateTaskResult).not.toHaveBeenCalled();
                            expect(spModal.confirm).toHaveBeenCalled();
                        });

                        it('should open the not found modal when there is a 404', function () {
                            var ctrl = undefined,
                                fake404 = {
                                status: 404
                            };
                            ctrl = createController(false, true);

                            spyOn(taskResultService, 'terminateTaskResult').and.returnValue($q.reject(fake404));
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            spyOn(spModal, 'open').and.returnValue({
                                result: $q.defer().promise
                            });
                            ctrl.openTerminateTaskDialog(item);
                            $scope.$apply();
                            expect(taskResultService.terminateTaskResult).toHaveBeenCalledWith(item.id);
                            expect(spModal.confirm).toHaveBeenCalled();
                            expect(spModal.open).toHaveBeenCalled();
                        });
                    });

                    describe('request stack trace', function () {
                        var item = undefined,
                            deferred = undefined;

                        beforeEach(function () {
                            item = createTaskResult();
                            deferred = $q.defer();
                        });

                        it('button should be disabled', function () {
                            var ctrl = createController(false, false);

                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(true);
                        });

                        it('button should be enabled when stack is present', function () {
                            var ctrl = createController(false, false);
                            item.stack = 'stuff';

                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(false);
                        });

                        it('button should be disabled with correct rights due to no host', function () {
                            var ctrl = createController(false, true);

                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(true);
                        });

                        it('button should be enabled with correct rights', function () {
                            var ctrl = createController(false, true);
                            item.host = '127.0.0.1';
                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(false);
                        });

                        it('button should be dsiabled when a request is in progress', function () {
                            var ctrl = createController(false, true);
                            ctrl.stackTraceButtonDisabled = true;
                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(true);
                        });

                        it('button should be dsiabled when there is no host', function () {
                            var ctrl = createController(false, true);
                            item.host = null;
                            expect(ctrl.isStackTraceButtonDisabled(item)).toBe(true);
                        });

                        it('should pop open the modal', function () {
                            var ctrl = undefined;

                            spyOn(spModal, 'open').and.callThrough();
                            ctrl = createController(false, true);
                            ctrl.openTerminateTaskDialog(item);
                            deferred.resolve();
                            $scope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                        });

                        it('should call the service', function () {
                            var ctrl = createController(false, true);
                            spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                            spyOn(spModal, 'open').and.returnValue($q.when());
                            ctrl.onStackTraceButton(item);
                            $scope.$apply();
                            expect(taskResultService.requestStackTrace).toHaveBeenCalledWith(item.id);
                            expect(spModal.open).toHaveBeenCalled();
                        });

                        it('should not call the service there is already a stack', function () {
                            var ctrl = createController(false, true);
                            spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                            spyOn(ctrl, 'openStackTraceDialog');
                            item.stack = 'stuff';
                            ctrl.onStackTraceButton(item);
                            $scope.$apply();
                            expect(ctrl.openStackTraceDialog).toHaveBeenCalledWith(item);
                            expect(taskResultService.requestStackTrace).not.toHaveBeenCalled();
                        });

                        it('should open the stack trace modal when there is a stack', function () {
                            var ctrl = createController(false, true);
                            spyOn(ctrl, 'openStackTraceDialog').and.callThrough();
                            spyOn(spModal, 'open').and.callThrough();
                            item.stack = 'stuff';
                            ctrl.onStackTraceButton(item);
                            $scope.$apply();
                            expect(ctrl.openStackTraceDialog).toHaveBeenCalledWith(item);
                            expect(spModal.open).toHaveBeenCalled();
                        });

                        it('should disable stack button after calling service', function () {
                            var ctrl = createController(false, true);
                            expect(ctrl.stackTraceButtonDisabled).toBe(false);
                            spyOn(taskResultService, 'requestStackTrace').and.returnValue($q.when());
                            ctrl.onStackTraceButton(item);
                            $scope.$apply();
                            expect(ctrl.stackTraceButtonDisabled).toBe(true);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudEFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix1REFBdUQsdUJBQXVCLFVBQVUsU0FBUzs7O0lBR3pJOztJQUVBLElBQUksc0JBQXNCO0lBQzFCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEO1dBQzFFLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsc0NBQXNDLFlBQU07O2dCQUVqRCxJQUFJLG9CQUFpQjtvQkFDakIsYUFBVTtvQkFBRSxxQkFBa0I7b0JBQUUsV0FBUTtvQkFBRSxTQUFNOztnQkFFcEQsV0FBVyxPQUFPLHNCQUFzQjs7Z0JBRXhDLFdBQVcsT0FBTyxVQUFDLGNBQWMsWUFDZCxzQkFBc0IsY0FBaUI7b0JBQ3RELGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixXQUFXO29CQUNYLFNBQVMsYUFBYTs7O2dCQUcxQixTQUFTLGNBQWMsTUFBTTtvQkFDekIsSUFBSSxVQUFVLFFBQVEsUUFBUTs7b0JBRTlCLE9BQU8saUJBQWlCO29CQUN4QixPQUFPLGVBQWUsVUFBVTtvQkFDaEMsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsU0FBUyxtQkFBbUI7b0JBQ3hCLE9BQU8sSUFBSSxXQUFXLG1CQUFtQjs7O2dCQUc3QyxHQUFHLGtDQUFrQyxZQUFNO29CQUN2QyxJQUFJLEtBQUs7d0JBQ0wsS0FBSyxjQUFjOzs7b0JBR3ZCLE9BQU8sR0FBRyxLQUFLLGFBQWEsUUFBUSxRQUFROzs7Z0JBSWhELFNBQVMsaURBQWlELFlBQU07O29CQUU1RCxJQUFJLG9CQUFpQjt3QkFBRSxVQUFPO3dCQUFFLGNBQVc7d0JBQUUsS0FB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N0QsSUFBSSxPQUFPLGlCQUFpQixPQUFPOzRCQUNuQyxNQUFNLG1CQUFtQixxQkFBcUIsSUFBSSxZQUFZLEdBQUc7NEJBQ2pFLE1BQU0sTUFBTTs0QkFDWixLQUFLLFFBQVE7NEJBQ2IsS0FBSyxtQkFBbUI7NEJBQ3hCLE9BQU87NEJBQ1AsT0FBTyxLQUFLLHNCQUFzQixxQkFBcUI7NEJBQ3ZELE9BQU8sa0JBQWtCLG1CQUFtQixJQUFJOzs7d0JBR3BELEdBQUcsMkRBQTJELFlBQU07NEJBQ2hFLElBQUksT0FBTyxpQkFBaUIsT0FBTzs0QkFDbkMsTUFBTSxNQUFNLHdCQUF3QixJQUFJOzRCQUN4QyxNQUFNLFNBQVMsUUFBUSxJQUFJOzRCQUMzQixLQUFLLFFBQVE7NEJBQ2IsS0FBSyxtQkFBbUI7NEJBQ3hCLE9BQU87NEJBQ1AsT0FBTyxLQUFLLHNCQUFzQixxQkFBcUI7NEJBQ3ZELE9BQU8sUUFBUSxNQUFNOzs7d0JBR3pCLEdBQUcscURBQXFELFlBQU07NEJBQzFELElBQUksT0FBTyxpQkFBaUIsT0FBTzs0QkFDbkMsT0FBTyxLQUFLLDBCQUEwQixLQUFLOzRCQUMzQyxNQUFNLG1CQUFtQixxQkFBcUIsSUFBSSxZQUFZLEdBQUc7NEJBQ2pFLEtBQUssbUJBQW1COzRCQUN4QixPQUFPOzRCQUNQLE9BQU8sS0FBSywwQkFBMEIsS0FBSzs7Ozs7OztHQW1CeEQiLCJmaWxlIjoiYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50QWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlLmpzJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcFRhc2tNYW5hZ2VtZW50QWN0aXZlQWN0aW9uQ29sdW1uJywgKCkgPT4ge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxzcC10YXNrLW1hbmFnZW1lbnQtYWN0aXZlLWFjdGlvbi1jb2x1bW4gc3AtbW9kZWw9XCJpdGVtXCIgLz5gLFxuICAgICAgICBUYXNrUmVzdWx0LCB0YXNrUmVzdWx0VGVzdERhdGEsICRjb21waWxlLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YXNrTWFuYWdlbWVudE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9UYXNrUmVzdWx0XywgXyRjb21waWxlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2tSZXN1bHRUZXN0RGF0YV8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBUYXNrUmVzdWx0ID0gX1Rhc2tSZXN1bHRfO1xuICAgICAgICB0YXNrUmVzdWx0VGVzdERhdGEgPSBfdGFza1Jlc3VsdFRlc3REYXRhXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaXRlbSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG5cbiAgICAgICAgJHNjb3BlLmNvbHVtbkRhdGFDdHJsID0ge307XG4gICAgICAgICRzY29wZS5jb2x1bW5EYXRhQ3RybC5zcE1vZGVsID0gaXRlbTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFza1Jlc3VsdCh0YXNrUmVzdWx0VGVzdERhdGEuVEFTS1JFUzEpO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIHJlbGV2YW50IGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgIGxldCB0ciA9IGNyZWF0ZVRhc2tSZXN1bHQoKSxcbiAgICAgICAgICAgIGVsID0gY3JlYXRlRWxlbWVudCh0cik7XG5cbiAgICAgICAgLy8gZmluZCB0ZXJtaW5hdGUgYnV0dG9uXG4gICAgICAgIGV4cGVjdChlbC5maW5kKCdpLmZhLWNvZGUnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdUYXNrTWFuYWdlbWVudEFjdGl2ZUFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRhc2tSZXN1bHRTZXJ2aWNlLCBzcE1vZGFsLCAkY29udHJvbGxlciwgJHE7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29udHJvbGxlcl8sIF8kcV8sIF90YXNrUmVzdWx0U2VydmljZV8sIF9zcE1vZGFsXykgPT4ge1xuICAgICAgICAgICAgdGFza1Jlc3VsdFNlcnZpY2UgPSBfdGFza1Jlc3VsdFNlcnZpY2VfO1xuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaXNBZG1pbiwgaGFzUmlnaHRzKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAkY29udHJvbGxlcignVGFza01hbmFnZW1lbnRBY3RpdmVBY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywge1xuICAgICAgICAgICAgICAgIHRhc2tSZXN1bHRTZXJ2aWNlOiB0YXNrUmVzdWx0U2VydmljZSxcbiAgICAgICAgICAgICAgICBTUF9TWVNURU1fQURNSU46IGlzQWRtaW4sXG4gICAgICAgICAgICAgICAgRlVMTF9UQVNLX0FDQ0VTUzogaGFzUmlnaHRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93IHRlcm1pbmF0ZSBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHVzZXIgaXMgYW4gYWRtaW4nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCd0cnVlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dUZXJtaW5hdGVCdXR0b24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdXNlciBpcyBhZG1pbiBhbmQgaGFzIHJpZ2h0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ3RydWUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zaG93VGVybWluYXRlQnV0dG9uKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHVzZXIgaGFzIHRoZSByaWdodHMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zaG93VGVybWluYXRlQnV0dG9uKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB1c2VyIGRvZXMgbm90IGhhdmUgdGhlIHJpZ2h0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zaG93VGVybWluYXRlQnV0dG9uKCkpLm5vdC50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgndGVybWluYXRlIHRhc2snLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSwgZGVmZXJyZWQ7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVUYXNrUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcG9wIG9wZW4gdGhlIG1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuXG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3RybC5vcGVuVGVybWluYXRlVGFza0RpYWxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmw7XG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNweU9uKHRhc2tSZXN1bHRTZXJ2aWNlLCAndGVybWluYXRlVGFza1Jlc3VsdCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgY3RybC5vcGVuVGVybWluYXRlVGFza0RpYWxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLnRlcm1pbmF0ZVRhc2tSZXN1bHQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHRoZSBzZXJ2aWNlIHdoZW4gbm90IGNvbmZpcm1lZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNweU9uKHRhc2tSZXN1bHRTZXJ2aWNlLCAndGVybWluYXRlVGFza1Jlc3VsdCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgpKTtcbiAgICAgICAgICAgICAgICBjdHJsLm9wZW5UZXJtaW5hdGVUYXNrRGlhbG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UudGVybWluYXRlVGFza1Jlc3VsdCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBub3QgZm91bmQgbW9kYWwgd2hlbiB0aGVyZSBpcyBhIDQwNCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCxcbiAgICAgICAgICAgICAgICBmYWtlNDA0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA0MDRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3Rlcm1pbmF0ZVRhc2tSZXN1bHQnKS5hbmQucmV0dXJuVmFsdWUoJHEucmVqZWN0KGZha2U0MDQpKTtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiAkcS5kZWZlcigpLnByb21pc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjdHJsLm9wZW5UZXJtaW5hdGVUYXNrRGlhbG9nKGl0ZW0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UudGVybWluYXRlVGFza1Jlc3VsdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdyZXF1ZXN0IHN0YWNrIHRyYWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0sIGRlZmVycmVkO1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlVGFza1Jlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnYnV0dG9uIHNob3VsZCBiZSBkaXNhYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkKGl0ZW0pKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdidXR0b24gc2hvdWxkIGJlIGVuYWJsZWQgd2hlbiBzdGFjayBpcyBwcmVzZW50JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhY2sgPSAnc3R1ZmYnO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdGFja1RyYWNlQnV0dG9uRGlzYWJsZWQoaXRlbSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkIHdpdGggY29ycmVjdCByaWdodHMgZHVlIHRvIG5vIGhvc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkKGl0ZW0pKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdidXR0b24gc2hvdWxkIGJlIGVuYWJsZWQgd2l0aCBjb3JyZWN0IHJpZ2h0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGl0ZW0uaG9zdCA9ICcxMjcuMC4wLjEnO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkKGl0ZW0pKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnYnV0dG9uIHNob3VsZCBiZSBkc2lhYmxlZCB3aGVuIGEgcmVxdWVzdCBpcyBpbiBwcm9ncmVzcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN0cmwuc3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1N0YWNrVHJhY2VCdXR0b25EaXNhYmxlZChpdGVtKSkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnYnV0dG9uIHNob3VsZCBiZSBkc2lhYmxlZCB3aGVuIHRoZXJlIGlzIG5vIGhvc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpdGVtLmhvc3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkKGl0ZW0pKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcG9wIG9wZW4gdGhlIG1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsO1xuXG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY3RybC5vcGVuVGVybWluYXRlVGFza0RpYWxvZyhpdGVtKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3JlcXVlc3RTdGFja1RyYWNlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgICAgICBjdHJsLm9uU3RhY2tUcmFjZUJ1dHRvbihpdGVtKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRhc2tSZXN1bHRTZXJ2aWNlLnJlcXVlc3RTdGFja1RyYWNlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCB0aGUgc2VydmljZSB0aGVyZSBpcyBhbHJlYWR5IGEgc3RhY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3JlcXVlc3RTdGFja1RyYWNlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgc3B5T24oY3RybCwgJ29wZW5TdGFja1RyYWNlRGlhbG9nJyk7XG4gICAgICAgICAgICAgICAgaXRlbS5zdGFjayA9ICdzdHVmZic7XG4gICAgICAgICAgICAgICAgY3RybC5vblN0YWNrVHJhY2VCdXR0b24oaXRlbSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm9wZW5TdGFja1RyYWNlRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodGFza1Jlc3VsdFNlcnZpY2UucmVxdWVzdFN0YWNrVHJhY2UpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBzdGFjayB0cmFjZSBtb2RhbCB3aGVuIHRoZXJlIGlzIGEgc3RhY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnb3BlblN0YWNrVHJhY2VEaWFsb2cnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhY2sgPSAnc3R1ZmYnO1xuICAgICAgICAgICAgICAgIGN0cmwub25TdGFja1RyYWNlQnV0dG9uKGl0ZW0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5vcGVuU3RhY2tUcmFjZURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgZGlzYWJsZSBzdGFjayBidXR0b24gYWZ0ZXIgY2FsbGluZyBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RhY2tUcmFjZUJ1dHRvbkRpc2FibGVkKS50b0JlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzcHlPbih0YXNrUmVzdWx0U2VydmljZSwgJ3JlcXVlc3RTdGFja1RyYWNlJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICAgICAgY3RybC5vblN0YWNrVHJhY2VCdXR0b24oaXRlbSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0YWNrVHJhY2VCdXR0b25EaXNhYmxlZCkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
