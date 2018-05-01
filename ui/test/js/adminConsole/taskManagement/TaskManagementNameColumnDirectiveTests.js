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

            describe('spTaskManagementNameColumn', function () {

                var elementDefinition = '<sp-task-management-name-column spmodel="item" />',
                    TaskSchedule = undefined,
                    TaskResult = undefined,
                    taskScheduleTestData = undefined,
                    taskResultTestData = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(taskManagementModule, testModule));

                beforeEach(inject(function (_TaskSchedule_, _TaskResult_, _taskScheduleTestData_, _taskResultTestData_, _$compile_, _$rootScope_) {
                    TaskResult = _TaskResult_;
                    TaskSchedule = _TaskSchedule_;
                    taskResultTestData = _taskResultTestData_;
                    taskScheduleTestData = _taskScheduleTestData_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                }));

                function createElement(item) {
                    var element = angular.element(elementDefinition);

                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                function createTaskResult() {
                    return new TaskResult(taskResultTestData.TASKRES1);
                }

                function createTaskSchedule() {
                    return new TaskSchedule(taskScheduleTestData.TASKSCHED1);
                }

                it('should render styled span for TaskResult', function () {
                    var taskRes = createTaskResult(),
                        el = createElement(taskRes);
                    expect(el.find('span.font-semibold').length).toEqual(1);
                });

                it('should render styled span for TaskSchedule', function () {
                    var taskSched = createTaskSchedule(),
                        el = createElement(taskSched);
                    expect(el.find('span.font-semibold').length).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE5hbWVDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsdURBQXVELHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBS3pJOztJQUVBLElBQUksc0JBQXNCO0lBQzFCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEO1dBQzFFLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsOEJBQThCLFlBQU07O2dCQUV6QyxJQUFJLG9CQUFpQjtvQkFDakIsZUFBWTtvQkFBRSxhQUFVO29CQUFFLHVCQUFvQjtvQkFBRSxxQkFBa0I7b0JBQUUsV0FBUTtvQkFBRSxTQUFNOztnQkFFeEYsV0FBVyxPQUFPLHNCQUFzQjs7Z0JBRXhDLFdBQVcsT0FBTyxVQUFDLGdCQUFnQixjQUFjLHdCQUF3QixzQkFDckQsWUFBWSxjQUFpQjtvQkFDN0MsYUFBYTtvQkFDYixlQUFlO29CQUNmLHFCQUFxQjtvQkFDckIsdUJBQXVCO29CQUN2QixXQUFXO29CQUNYLFNBQVMsYUFBYTs7O2dCQUcxQixTQUFTLGNBQWMsTUFBTTtvQkFDekIsSUFBSSxVQUFVLFFBQVEsUUFBUTs7b0JBRTlCLE9BQU8sT0FBTztvQkFDZCxTQUFTLFNBQVM7b0JBQ2xCLE9BQU87O29CQUVQLE9BQU87OztnQkFHWCxTQUFTLG1CQUFtQjtvQkFDeEIsT0FBTyxJQUFJLFdBQVcsbUJBQW1COzs7Z0JBRzdDLFNBQVMscUJBQXFCO29CQUMxQixPQUFPLElBQUksYUFBYSxxQkFBcUI7OztnQkFJakQsR0FBRyw0Q0FBNEMsWUFBTTtvQkFDakQsSUFBSSxVQUFVO3dCQUNWLEtBQUssY0FBYztvQkFDdkIsT0FBTyxHQUFHLEtBQUssc0JBQXNCLFFBQVEsUUFBUTs7O2dCQUd6RCxHQUFHLDhDQUE4QyxZQUFNO29CQUNuRCxJQUFJLFlBQVk7d0JBQ1osS0FBSyxjQUFjO29CQUN2QixPQUFPLEdBQUcsS0FBSyxzQkFBc0IsUUFBUSxRQUFROzs7OztHQWdCMUQiLCJmaWxlIjoiYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TmFtZUNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0YXNrTWFuYWdlbWVudE1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRNb2R1bGUuanMnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ3NwVGFza01hbmFnZW1lbnROYW1lQ29sdW1uJywgKCkgPT4ge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxzcC10YXNrLW1hbmFnZW1lbnQtbmFtZS1jb2x1bW4gc3Btb2RlbD1cIml0ZW1cIiAvPmAsXG4gICAgICAgIFRhc2tTY2hlZHVsZSwgVGFza1Jlc3VsdCwgdGFza1NjaGVkdWxlVGVzdERhdGEsIHRhc2tSZXN1bHRUZXN0RGF0YSwgJGNvbXBpbGUsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Rhc2tTY2hlZHVsZV8sIF9UYXNrUmVzdWx0XywgX3Rhc2tTY2hlZHVsZVRlc3REYXRhXywgX3Rhc2tSZXN1bHRUZXN0RGF0YV8sXG4gICAgICAgICAgICAgICAgICAgICAgICBfJGNvbXBpbGVfLCBfJHJvb3RTY29wZV8pID0+IHtcbiAgICAgICAgVGFza1Jlc3VsdCA9IF9UYXNrUmVzdWx0XztcbiAgICAgICAgVGFza1NjaGVkdWxlID0gX1Rhc2tTY2hlZHVsZV87XG4gICAgICAgIHRhc2tSZXN1bHRUZXN0RGF0YSA9IF90YXNrUmVzdWx0VGVzdERhdGFfO1xuICAgICAgICB0YXNrU2NoZWR1bGVUZXN0RGF0YSA9IF90YXNrU2NoZWR1bGVUZXN0RGF0YV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0pIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuXG4gICAgICAgICRzY29wZS5pdGVtID0gaXRlbTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFza1Jlc3VsdCh0YXNrUmVzdWx0VGVzdERhdGEuVEFTS1JFUzEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tTY2hlZHVsZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrU2NoZWR1bGUodGFza1NjaGVkdWxlVGVzdERhdGEuVEFTS1NDSEVEMSk7XG4gICAgfVxuXG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciBzdHlsZWQgc3BhbiBmb3IgVGFza1Jlc3VsdCcsICgpID0+IHtcbiAgICAgICAgbGV0IHRhc2tSZXMgPSBjcmVhdGVUYXNrUmVzdWx0KCksXG4gICAgICAgICAgICBlbCA9IGNyZWF0ZUVsZW1lbnQodGFza1Jlcyk7XG4gICAgICAgIGV4cGVjdChlbC5maW5kKCdzcGFuLmZvbnQtc2VtaWJvbGQnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciBzdHlsZWQgc3BhbiBmb3IgVGFza1NjaGVkdWxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgdGFza1NjaGVkID0gY3JlYXRlVGFza1NjaGVkdWxlKCksXG4gICAgICAgICAgICBlbCA9IGNyZWF0ZUVsZW1lbnQodGFza1NjaGVkKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ3NwYW4uZm9udC1zZW1pYm9sZCcpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
