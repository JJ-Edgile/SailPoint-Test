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

            describe('spTaskManagementScheduledActionColumn', function () {

                var elementDefinition = '<sp-task-management-scheduled-action-column />',
                    TaskSchedule = undefined,
                    taskScheduleTestData = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    testService = undefined;

                beforeEach(module(taskManagementModule, testModule));
                beforeEach(module(function ($provide) {
                    $provide.constant('FULL_TASK_ACCESS', true);
                }));

                beforeEach(inject(function (_TaskSchedule_, _$compile_, _taskScheduleTestData_, _$rootScope_, _testService_) {
                    TaskSchedule = _TaskSchedule_;
                    taskScheduleTestData = _taskScheduleTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                    testService = _testService_;
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);

                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createTaskSchedule() {
                    return new TaskSchedule(taskScheduleTestData.TASKSCHED1);
                }

                it('should render relevant buttons', function () {
                    var sched = createTaskSchedule(),
                        el = createElement(sched);

                    expect(el.find('i.fa-calendar').length).toEqual(1);
                    expect(el.find('i.fa-times').length).toEqual(1);
                });

                describe('TaskManagementScheduledActionColumnDirectiveCtrl', function () {
                    var taskScheduleService = undefined,
                        spModal = undefined,
                        $controller = undefined,
                        $q = undefined;

                    beforeEach(inject(function (_$controller_, _$q_, _taskScheduleService_, _spModal_) {
                        taskScheduleService = _taskScheduleService_;
                        $controller = _$controller_;
                        $q = _$q_;
                        spModal = _spModal_;
                    }));

                    function createController(isAdmin, hasRights) {
                        return $controller('TaskManagementScheduledActionColumnDirectiveCtrl', {
                            taskScheduleService: taskScheduleService,
                            TaskSchedule: TaskSchedule,
                            spModal: spModal,
                            SP_SYSTEM_ADMIN: isAdmin,
                            FULL_TASK_ACCESS: hasRights
                        });
                    }

                    describe('show delete button', function () {
                        it('should return true if user is an admin', function () {
                            var ctrl = createController('true', false);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return true if user is admin and has rights', function () {
                            var ctrl = createController('true', true);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return true if user has the rights', function () {
                            var ctrl = createController(false, true);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return false if user does not have the rights', function () {
                            var ctrl = createController(false, false);
                            expect(ctrl.showDeleteButton()).not.toBeTruthy();
                        });
                    });

                    describe('showDeleteModal', function () {

                        it('should call spModal service', function () {
                            var ctrl = createController(),
                                item = createTaskSchedule();

                            spyOn(ctrl.spModal, 'open');
                            ctrl.showDeleteModal(item);
                            expect(ctrl.spModal.open).toHaveBeenCalled();
                        });
                    });

                    describe('show postpone button', function () {
                        it('should return true if user is an admin', function () {
                            var ctrl = createController('true', false);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return true if user is admin and has rights', function () {
                            var ctrl = createController('true', true);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return true if user has the rights', function () {
                            var ctrl = createController(false, true);
                            expect(ctrl.showDeleteButton()).toBeTruthy();
                        });

                        it('should return false if user does not have the rights', function () {
                            var ctrl = createController(false, false);
                            expect(ctrl.showDeleteButton()).not.toBeTruthy();
                        });
                    });

                    describe('showPostponeModal', function () {

                        it('should call spModal service', function () {
                            var ctrl = createController(),
                                item = createTaskSchedule();

                            spyOn(ctrl.spModal, 'open');
                            ctrl.showPostponeModal(item);
                            expect(ctrl.spModal.open).toHaveBeenCalled();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFNjaGVkdWxlZEFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix1REFBdUQsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLekk7O0lBRUEsSUFBSSxzQkFBc0I7SUFDMUIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbURBQW1EO1lBQ3pHLHVCQUF1QixrREFBa0Q7V0FDMUUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyx5Q0FBeUMsWUFBTTs7Z0JBRXBELElBQUksb0JBQWlCO29CQUNqQixlQUFZO29CQUFFLHVCQUFvQjtvQkFBRSxXQUFRO29CQUFFLFNBQU07b0JBQUUsY0FBVzs7Z0JBRXJFLFdBQVcsT0FBTyxzQkFBc0I7Z0JBQ3hDLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxvQkFBb0I7OztnQkFHMUMsV0FBVyxPQUFPLFVBQUMsZ0JBQWdCLFlBQ2hCLHdCQUF3QixjQUFjLGVBQWtCO29CQUN2RSxlQUFlO29CQUNmLHVCQUF1QjtvQkFDdkIsV0FBVztvQkFDWCxTQUFTLGFBQWE7b0JBQ3RCLGNBQWM7OztnQkFHbEIsU0FBUyxjQUFjLE1BQU07b0JBQ3pCLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixPQUFPLE9BQU87b0JBQ2QsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsU0FBUyxxQkFBcUI7b0JBQzFCLE9BQU8sSUFBSSxhQUFhLHFCQUFxQjs7O2dCQUdqRCxHQUFHLGtDQUFrQyxZQUFNO29CQUN2QyxJQUFJLFFBQVE7d0JBQ1IsS0FBSyxjQUFjOztvQkFFdkIsT0FBTyxHQUFHLEtBQUssaUJBQWlCLFFBQVEsUUFBUTtvQkFDaEQsT0FBTyxHQUFHLEtBQUssY0FBYyxRQUFRLFFBQVE7OztnQkFHakQsU0FBUyxvREFBb0QsWUFBTTtvQkFDL0QsSUFBSSxzQkFBbUI7d0JBQUUsVUFBTzt3QkFBRSxjQUFXO3dCQUFFLEtBQUU7O29CQUVqRCxXQUFXLE9BQU8sVUFBQyxlQUFlLE1BQU0sdUJBQXVCLFdBQWM7d0JBQ3pFLHNCQUFzQjt3QkFDdEIsY0FBYzt3QkFDZCxLQUFLO3dCQUNMLFVBQVU7OztvQkFHZCxTQUFTLGlCQUFpQixTQUFTLFdBQVc7d0JBQzFDLE9BQU8sWUFBWSxvREFBb0Q7NEJBQ25FLHFCQUFxQjs0QkFDckIsY0FBYzs0QkFDZCxTQUFTOzRCQUNULGlCQUFpQjs0QkFDakIsa0JBQWtCOzs7O29CQUkxQixTQUFTLHNCQUFzQixZQUFNO3dCQUNqQyxHQUFHLDBDQUEwQyxZQUFNOzRCQUMvQyxJQUFJLE9BQU8saUJBQWlCLFFBQVE7NEJBQ3BDLE9BQU8sS0FBSyxvQkFBb0I7Ozt3QkFHcEMsR0FBRyxzREFBc0QsWUFBTTs0QkFDM0QsSUFBSSxPQUFPLGlCQUFpQixRQUFROzRCQUNwQyxPQUFPLEtBQUssb0JBQW9COzs7d0JBR3BDLEdBQUcsNkNBQTZDLFlBQU07NEJBQ2xELElBQUksT0FBTyxpQkFBaUIsT0FBTzs0QkFDbkMsT0FBTyxLQUFLLG9CQUFvQjs7O3dCQUdwQyxHQUFHLHdEQUF3RCxZQUFNOzRCQUM3RCxJQUFJLE9BQU8saUJBQWlCLE9BQU87NEJBQ25DLE9BQU8sS0FBSyxvQkFBb0IsSUFBSTs7OztvQkFLNUMsU0FBUyxtQkFBbUIsWUFBTTs7d0JBRTlCLEdBQUcsK0JBQStCLFlBQU07NEJBQ3BDLElBQUksT0FBTztnQ0FDUCxPQUFPOzs0QkFFWCxNQUFNLEtBQUssU0FBUzs0QkFDcEIsS0FBSyxnQkFBZ0I7NEJBQ3JCLE9BQU8sS0FBSyxRQUFRLE1BQU07Ozs7b0JBS2xDLFNBQVMsd0JBQXdCLFlBQU07d0JBQ25DLEdBQUcsMENBQTBDLFlBQU07NEJBQy9DLElBQUksT0FBTyxpQkFBaUIsUUFBUTs0QkFDcEMsT0FBTyxLQUFLLG9CQUFvQjs7O3dCQUdwQyxHQUFHLHNEQUFzRCxZQUFNOzRCQUMzRCxJQUFJLE9BQU8saUJBQWlCLFFBQVE7NEJBQ3BDLE9BQU8sS0FBSyxvQkFBb0I7Ozt3QkFHcEMsR0FBRyw2Q0FBNkMsWUFBTTs0QkFDbEQsSUFBSSxPQUFPLGlCQUFpQixPQUFPOzRCQUNuQyxPQUFPLEtBQUssb0JBQW9COzs7d0JBR3BDLEdBQUcsd0RBQXdELFlBQU07NEJBQzdELElBQUksT0FBTyxpQkFBaUIsT0FBTzs0QkFDbkMsT0FBTyxLQUFLLG9CQUFvQixJQUFJOzs7O29CQUs1QyxTQUFTLHFCQUFxQixZQUFNOzt3QkFFaEMsR0FBRywrQkFBK0IsWUFBTTs0QkFDcEMsSUFBSSxPQUFPO2dDQUNQLE9BQU87OzRCQUVYLE1BQU0sS0FBSyxTQUFTOzRCQUNwQixLQUFLLGtCQUFrQjs0QkFDdkIsT0FBTyxLQUFLLFFBQVEsTUFBTTs7Ozs7OztHQWtCdkMiLCJmaWxlIjoiYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50U2NoZWR1bGVkQWN0aW9uQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZS5qcyc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnc3BUYXNrTWFuYWdlbWVudFNjaGVkdWxlZEFjdGlvbkNvbHVtbicsICgpID0+IHtcblxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9IGA8c3AtdGFzay1tYW5hZ2VtZW50LXNjaGVkdWxlZC1hY3Rpb24tY29sdW1uIC8+YCxcbiAgICAgICAgVGFza1NjaGVkdWxlLCB0YXNrU2NoZWR1bGVUZXN0RGF0YSwgJGNvbXBpbGUsICRzY29wZSwgdGVzdFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YXNrTWFuYWdlbWVudE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdGVUxMX1RBU0tfQUNDRVNTJywgdHJ1ZSk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9UYXNrU2NoZWR1bGVfLCBfJGNvbXBpbGVfLFxuICAgICAgICAgICAgICAgICAgICAgICBfdGFza1NjaGVkdWxlVGVzdERhdGFfLCBfJHJvb3RTY29wZV8sIF90ZXN0U2VydmljZV8pID0+IHtcbiAgICAgICAgVGFza1NjaGVkdWxlID0gX1Rhc2tTY2hlZHVsZV87XG4gICAgICAgIHRhc2tTY2hlZHVsZVRlc3REYXRhID0gX3Rhc2tTY2hlZHVsZVRlc3REYXRhXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcblxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrU2NoZWR1bGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFza1NjaGVkdWxlKHRhc2tTY2hlZHVsZVRlc3REYXRhLlRBU0tTQ0hFRDEpO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIHJlbGV2YW50IGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBzY2hlZCA9IGNyZWF0ZVRhc2tTY2hlZHVsZSgpLFxuICAgICAgICAgICAgZWwgPSBjcmVhdGVFbGVtZW50KHNjaGVkKTtcblxuICAgICAgICBleHBlY3QoZWwuZmluZCgnaS5mYS1jYWxlbmRhcicpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2kuZmEtdGltZXMnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnVGFza01hbmFnZW1lbnRTY2hlZHVsZWRBY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywgKCkgPT4ge1xuICAgICAgICBsZXQgdGFza1NjaGVkdWxlU2VydmljZSwgc3BNb2RhbCwgJGNvbnRyb2xsZXIsICRxO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfLCBfJHFfLCBfdGFza1NjaGVkdWxlU2VydmljZV8sIF9zcE1vZGFsXykgPT4ge1xuICAgICAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZSA9IF90YXNrU2NoZWR1bGVTZXJ2aWNlXztcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgICAgICRxID0gXyRxXztcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGlzQWRtaW4sIGhhc1JpZ2h0cykge1xuICAgICAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdUYXNrTWFuYWdlbWVudFNjaGVkdWxlZEFjdGlvbkNvbHVtbkRpcmVjdGl2ZUN0cmwnLCB7XG4gICAgICAgICAgICAgICAgdGFza1NjaGVkdWxlU2VydmljZTogdGFza1NjaGVkdWxlU2VydmljZSxcbiAgICAgICAgICAgICAgICBUYXNrU2NoZWR1bGU6IFRhc2tTY2hlZHVsZSxcbiAgICAgICAgICAgICAgICBzcE1vZGFsOiBzcE1vZGFsLFxuICAgICAgICAgICAgICAgIFNQX1NZU1RFTV9BRE1JTjogaXNBZG1pbixcbiAgICAgICAgICAgICAgICBGVUxMX1RBU0tfQUNDRVNTOiBoYXNSaWdodHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpYmUoJ3Nob3cgZGVsZXRlIGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdXNlciBpcyBhbiBhZG1pbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ3RydWUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RlbGV0ZUJ1dHRvbigpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB1c2VyIGlzIGFkbWluIGFuZCBoYXMgcmlnaHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigndHJ1ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdXNlciBoYXMgdGhlIHJpZ2h0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHVzZXIgZG9lcyBub3QgaGF2ZSB0aGUgcmlnaHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkubm90LnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93RGVsZXRlTW9kYWwnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcE1vZGFsIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVUYXNrU2NoZWR1bGUoKTtcblxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwuc3BNb2RhbCwgJ29wZW4nKTtcbiAgICAgICAgICAgICAgICBjdHJsLnNob3dEZWxldGVNb2RhbChpdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93IHBvc3Rwb25lIGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdXNlciBpcyBhbiBhZG1pbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ3RydWUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RlbGV0ZUJ1dHRvbigpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB1c2VyIGlzIGFkbWluIGFuZCBoYXMgcmlnaHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigndHJ1ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdXNlciBoYXMgdGhlIHJpZ2h0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHVzZXIgZG9lcyBub3QgaGF2ZSB0aGUgcmlnaHRzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEZWxldGVCdXR0b24oKSkubm90LnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdzaG93UG9zdHBvbmVNb2RhbCcsICgpID0+IHtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNwTW9kYWwgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZVRhc2tTY2hlZHVsZSgpO1xuXG4gICAgICAgICAgICAgICAgc3B5T24oY3RybC5zcE1vZGFsLCAnb3BlbicpO1xuICAgICAgICAgICAgICAgIGN0cmwuc2hvd1Bvc3Rwb25lTW9kYWwoaXRlbSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
