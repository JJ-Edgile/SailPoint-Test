System.register(['test/js/TestInitializer', 'workitem/WorkItemModule', 'workitem/WorkItemAbstractModule', 'test/js/workitem/WorkItemTestData', 'test/js/workitem/AbstractWorkItemDirectiveTestCtrl'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var workItemModule, workItemAbstractModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_workitemWorkItemAbstractModule) {
            workItemAbstractModule = _workitemWorkItemAbstractModule['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}, function (_testJsWorkitemAbstractWorkItemDirectiveTestCtrl) {}],
        execute: function () {

            describe('AbstractWorkItemDirectiveCtrl', function () {

                var $controller, ctrl, navigationService, WorkItemHeaderDirectiveStates, workItemTestData;

                beforeEach(module(workItemModule, workItemAbstractModule));

                beforeEach(inject(function (_$controller_, _navigationService_, _WorkItemHeaderDirectiveStates_, _workItemTestData_) {
                    $controller = _$controller_;
                    navigationService = _navigationService_;
                    WorkItemHeaderDirectiveStates = _WorkItemHeaderDirectiveStates_;
                    workItemTestData = _workItemTestData_;
                }));

                function createController(style) {
                    ctrl = $controller('AbstractWorkItemDirectiveTestCtrl', {
                        navigationService: navigationService
                    }, {
                        templateStyle: style,
                        workItem: workItemTestData.workItemTestData1
                    });
                    ctrl.initialize();
                }

                it('should throw if templateStyle does not match with allowed values', function () {
                    expect(function () {
                        createController(WorkItemHeaderDirectiveStates.full);
                    }).not.toThrow();
                    expect(function () {
                        createController('foo');
                    }).toThrow();
                });

                describe('isFull', function () {
                    it('should return true when style is full', function () {
                        createController(WorkItemHeaderDirectiveStates.full);
                        expect(ctrl.isFull()).toBeTruthy();
                    });
                    it('should return false when style is not full', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        expect(ctrl.isFull()).toBeFalsy();
                    });
                });

                describe('isSummary', function () {
                    it('should return true when style is summary', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        expect(ctrl.isSummary()).toBeTruthy();
                    });
                    it('should return false when style is not summary', function () {
                        createController(WorkItemHeaderDirectiveStates.full);
                        expect(ctrl.isSummary()).toBeFalsy();
                    });
                });

                describe('isCollapsible', function () {
                    it('should return true when style is collapsible', function () {
                        createController(WorkItemHeaderDirectiveStates.collapsible);
                        expect(ctrl.isCollapsible()).toBeTruthy();
                    });
                    it('should return false when style is not collapsible', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        expect(ctrl.isCollapsible()).toBeFalsy();
                    });
                });

                describe('getTemplateStyle', function () {
                    it('should return full when style is full', function () {
                        createController(WorkItemHeaderDirectiveStates.full);
                        expect(ctrl.getTemplateStyle()).toBe(WorkItemHeaderDirectiveStates.full);
                    });
                    it('should return summary when style is summary', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        expect(ctrl.getTemplateStyle()).toBe(WorkItemHeaderDirectiveStates.summary);
                    });
                    it('should return collapsible when style is collapsible', function () {
                        createController(WorkItemHeaderDirectiveStates.collapsible);
                        expect(ctrl.getTemplateStyle()).toBe(WorkItemHeaderDirectiveStates.collapsible);
                    });
                });

                describe('toggleCollapsed', function () {
                    it('should toggle the value of collapsed for collapsible', function () {
                        createController(WorkItemHeaderDirectiveStates.collapsible);
                        // Collapse state starts out true for type collapsible.
                        expect(ctrl.isCollapsed).toBeTruthy();
                        ctrl.toggleCollapsed();
                        expect(ctrl.isCollapsed).toBeFalsy();
                        ctrl.toggleCollapsed();
                        expect(ctrl.isCollapsed).toBeTruthy();
                    });
                });

                describe('initialize collapsed', function () {
                    it('should initialize collapsed for collapsible', function () {
                        createController(WorkItemHeaderDirectiveStates.collapsible);
                        // Collapse state starts out true for type collapsible.
                        expect(ctrl.isCollapsed).toBeTruthy();
                    });
                    it('should initialize collapsed for summary', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        // Collapse state starts out true for type summary.
                        expect(ctrl.isCollapsed).toBeTruthy();
                    });
                    it('should initialize collapsed for full', function () {
                        createController(WorkItemHeaderDirectiveStates.full);
                        // Collapse state starts out false for type full.
                        expect(ctrl.isCollapsed).toBeFalsy();
                    });
                });
                describe('goToFull', function () {

                    it('calls navigation service with correct parameters', function () {
                        createController(WorkItemHeaderDirectiveStates.summary);
                        spyOn(navigationService, 'go');

                        ctrl.goToFull();

                        expect(navigationService.go).toHaveBeenCalled();

                        expect(navigationService.go.calls.mostRecent().args[0].state).toEqual('commonWorkItem');
                        expect(navigationService.go.calls.mostRecent().args[0].stateParams.workItemId).toEqual(workItemTestData.workItemTestData1.id);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL0Fic3RyYWN0V29ya0l0ZW1EaXJlY3RpdmVDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixtQ0FBbUMscUNBQXFDLHVEQUF1RCxVQUFVLFNBQVM7O0lBQ3pOOztJQUdJLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsaUNBQWlDO1lBQzFDLHlCQUF5QixnQ0FBZ0M7V0FDMUQsVUFBVSxpQ0FBaUMsSUFBSSxVQUFVLGtEQUFrRDtRQUM5RyxTQUFTLFlBQVk7O1lBRjdCLFNBQVMsaUNBQWlDLFlBQVc7O2dCQUVqRCxJQUFJLGFBQWEsTUFBTSxtQkFBbUIsK0JBQStCOztnQkFFekUsV0FBVyxPQUFPLGdCQUFnQjs7Z0JBRWxDLFdBQVcsT0FBTyxVQUFTLGVBQWUscUJBQW9CLGlDQUNuQyxvQkFBb0I7b0JBQzNDLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixnQ0FBZ0M7b0JBQ2hDLG1CQUFtQjs7O2dCQUd2QixTQUFTLGlCQUFpQixPQUFPO29CQUM3QixPQUFPLFlBQVkscUNBQXFDO3dCQUNwRCxtQkFBb0I7dUJBQ3JCO3dCQUNDLGVBQWU7d0JBQ2YsVUFBVSxpQkFBaUI7O29CQUUvQixLQUFLOzs7Z0JBR1QsR0FBRyxvRUFBb0UsWUFBVztvQkFDOUUsT0FBTyxZQUFXO3dCQUNkLGlCQUFpQiw4QkFBOEI7dUJBQ2hELElBQUk7b0JBQ1AsT0FBTyxZQUFXO3dCQUNkLGlCQUFpQjt1QkFDbEI7OztnQkFHUCxTQUFTLFVBQVUsWUFBVztvQkFDMUIsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsaUJBQWlCLDhCQUE4Qjt3QkFDL0MsT0FBTyxLQUFLLFVBQVU7O29CQUUxQixHQUFHLDhDQUE4QyxZQUFXO3dCQUN4RCxpQkFBaUIsOEJBQThCO3dCQUMvQyxPQUFPLEtBQUssVUFBVTs7OztnQkFJOUIsU0FBUyxhQUFhLFlBQVc7b0JBQzdCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELGlCQUFpQiw4QkFBOEI7d0JBQy9DLE9BQU8sS0FBSyxhQUFhOztvQkFFN0IsR0FBRyxpREFBaUQsWUFBVzt3QkFDM0QsaUJBQWlCLDhCQUE4Qjt3QkFDL0MsT0FBTyxLQUFLLGFBQWE7Ozs7Z0JBSWpDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcsZ0RBQWdELFlBQVc7d0JBQzFELGlCQUFpQiw4QkFBOEI7d0JBQy9DLE9BQU8sS0FBSyxpQkFBaUI7O29CQUVqQyxHQUFHLHFEQUFxRCxZQUFXO3dCQUMvRCxpQkFBaUIsOEJBQThCO3dCQUMvQyxPQUFPLEtBQUssaUJBQWlCOzs7O2dCQUlyQyxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxpQkFBaUIsOEJBQThCO3dCQUMvQyxPQUFPLEtBQUssb0JBQW9CLEtBQUssOEJBQThCOztvQkFFdkUsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsaUJBQWlCLDhCQUE4Qjt3QkFDL0MsT0FBTyxLQUFLLG9CQUFvQixLQUFLLDhCQUE4Qjs7b0JBRXZFLEdBQUcsdURBQXVELFlBQVc7d0JBQ2pFLGlCQUFpQiw4QkFBOEI7d0JBQy9DLE9BQU8sS0FBSyxvQkFBb0IsS0FBSyw4QkFBOEI7Ozs7Z0JBSTNFLFNBQVMsbUJBQW1CLFlBQVc7b0JBQ25DLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLGlCQUFpQiw4QkFBOEI7O3dCQUUvQyxPQUFPLEtBQUssYUFBYTt3QkFDekIsS0FBSzt3QkFDTCxPQUFPLEtBQUssYUFBYTt3QkFDekIsS0FBSzt3QkFDTCxPQUFPLEtBQUssYUFBYTs7OztnQkFJakMsU0FBUyx3QkFBd0IsWUFBVztvQkFDeEMsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsaUJBQWlCLDhCQUE4Qjs7d0JBRS9DLE9BQU8sS0FBSyxhQUFhOztvQkFFN0IsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsaUJBQWlCLDhCQUE4Qjs7d0JBRS9DLE9BQU8sS0FBSyxhQUFhOztvQkFFN0IsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsaUJBQWlCLDhCQUE4Qjs7d0JBRS9DLE9BQU8sS0FBSyxhQUFhOzs7Z0JBSWpDLFNBQVMsWUFBWSxZQUFXOztvQkFFNUIsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsaUJBQWlCLDhCQUE4Qjt3QkFDL0MsTUFBTSxtQkFBbUI7O3dCQUV6QixLQUFLOzt3QkFFTCxPQUFPLGtCQUFrQixJQUFJOzt3QkFFN0IsT0FBTyxrQkFBa0IsR0FBRyxNQUFNLGFBQWEsS0FBSyxHQUFHLE9BQ25ELFFBQVE7d0JBQ1osT0FBTyxrQkFBa0IsR0FBRyxNQUFNLGFBQWEsS0FBSyxHQUFHLFlBQVksWUFDL0QsUUFBUSxpQkFBaUIsa0JBQWtCOzs7Ozs7R0FNeEQiLCJmaWxlIjoid29ya2l0ZW0vQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNSBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbU1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbU1vZHVsZSc7XG5pbXBvcnQgd29ya0l0ZW1BYnN0cmFjdE1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbUFic3RyYWN0TW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy93b3JraXRlbS9Xb3JrSXRlbVRlc3REYXRhJztcbmltcG9ydCAndGVzdC9qcy93b3JraXRlbS9BYnN0cmFjdFdvcmtJdGVtRGlyZWN0aXZlVGVzdEN0cmwnO1xuXG5kZXNjcmliZSgnQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZUN0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkY29udHJvbGxlciwgY3RybCwgbmF2aWdhdGlvblNlcnZpY2UsIFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLCB3b3JrSXRlbVRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1Nb2R1bGUsIHdvcmtJdGVtQWJzdHJhY3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF9uYXZpZ2F0aW9uU2VydmljZV8sX1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfd29ya0l0ZW1UZXN0RGF0YV8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XG4gICAgICAgIFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzID0gX1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzXztcbiAgICAgICAgd29ya0l0ZW1UZXN0RGF0YSA9IF93b3JrSXRlbVRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHN0eWxlKSB7XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWJzdHJhY3RXb3JrSXRlbURpcmVjdGl2ZVRlc3RDdHJsJywge1xuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgOiBuYXZpZ2F0aW9uU2VydmljZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVN0eWxlOiBzdHlsZSxcbiAgICAgICAgICAgIHdvcmtJdGVtOiB3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExXG4gICAgICAgIH0pO1xuICAgICAgICBjdHJsLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGlmIHRlbXBsYXRlU3R5bGUgZG9lcyBub3QgbWF0Y2ggd2l0aCBhbGxvd2VkIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLmZ1bGwpO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCdmb28nKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gc3R5bGUgaXMgZnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5mdWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRnVsbCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHN0eWxlIGlzIG5vdCBmdWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLnN1bW1hcnkpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNGdWxsKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1N1bW1hcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHN0eWxlIGlzIHN1bW1hcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVTdGF0ZXMuc3VtbWFyeSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1bW1hcnkoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBzdHlsZSBpcyBub3Qgc3VtbWFyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5mdWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3VtbWFyeSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNDb2xsYXBzaWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gc3R5bGUgaXMgY29sbGFwc2libGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVTdGF0ZXMuY29sbGFwc2libGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDb2xsYXBzaWJsZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHN0eWxlIGlzIG5vdCBjb2xsYXBzaWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5zdW1tYXJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2libGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFRlbXBsYXRlU3R5bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZnVsbCB3aGVuIHN0eWxlIGlzIGZ1bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVTdGF0ZXMuZnVsbCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRUZW1wbGF0ZVN0eWxlKCkpLnRvQmUoV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVTdGF0ZXMuZnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBzdW1tYXJ5IHdoZW4gc3R5bGUgaXMgc3VtbWFyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5zdW1tYXJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFRlbXBsYXRlU3R5bGUoKSkudG9CZShXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5zdW1tYXJ5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbGxhcHNpYmxlIHdoZW4gc3R5bGUgaXMgY29sbGFwc2libGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmVTdGF0ZXMuY29sbGFwc2libGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VGVtcGxhdGVTdHlsZSgpKS50b0JlKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLmNvbGxhcHNpYmxlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlQ29sbGFwc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIHRoZSB2YWx1ZSBvZiBjb2xsYXBzZWQgZm9yIGNvbGxhcHNpYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLmNvbGxhcHNpYmxlKTtcbiAgICAgICAgICAgIC8vIENvbGxhcHNlIHN0YXRlIHN0YXJ0cyBvdXQgdHJ1ZSBmb3IgdHlwZSBjb2xsYXBzaWJsZS5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZUNvbGxhcHNlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDb2xsYXBzZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgY3RybC50b2dnbGVDb2xsYXBzZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2luaXRpYWxpemUgY29sbGFwc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBjb2xsYXBzZWQgZm9yIGNvbGxhcHNpYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLmNvbGxhcHNpYmxlKTtcbiAgICAgICAgICAgIC8vIENvbGxhcHNlIHN0YXRlIHN0YXJ0cyBvdXQgdHJ1ZSBmb3IgdHlwZSBjb2xsYXBzaWJsZS5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgY29sbGFwc2VkIGZvciBzdW1tYXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLnN1bW1hcnkpO1xuICAgICAgICAgICAgLy8gQ29sbGFwc2Ugc3RhdGUgc3RhcnRzIG91dCB0cnVlIGZvciB0eXBlIHN1bW1hcnkuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbGxhcHNlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIGNvbGxhcHNlZCBmb3IgZnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihXb3JrSXRlbUhlYWRlckRpcmVjdGl2ZVN0YXRlcy5mdWxsKTtcbiAgICAgICAgICAgIC8vIENvbGxhcHNlIHN0YXRlIHN0YXJ0cyBvdXQgZmFsc2UgZm9yIHR5cGUgZnVsbC5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgICBkZXNjcmliZSgnZ29Ub0Z1bGwnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnY2FsbHMgbmF2aWdhdGlvbiBzZXJ2aWNlIHdpdGggY29ycmVjdCBwYXJhbWV0ZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKFdvcmtJdGVtSGVhZGVyRGlyZWN0aXZlU3RhdGVzLnN1bW1hcnkpO1xuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xuXG4gICAgICAgICAgICBjdHJsLmdvVG9GdWxsKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uc3RhdGUpLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwoJ2NvbW1vbldvcmtJdGVtJyk7XG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uc3RhdGVQYXJhbXMud29ya0l0ZW1JZCkuXG4gICAgICAgICAgICAgICAgdG9FcXVhbCh3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
