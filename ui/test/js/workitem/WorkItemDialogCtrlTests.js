System.register(['test/js/TestInitializer', 'workitem/WorkItemModule', './WorkItemTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_WorkItemTestData) {}],
        execute: function () {

            describe('WorkItemDialogCtrl', function () {

                var dialogController, $controller, workItemService, approvalData, workItemTestData;

                // Let the tests know we'll use the workitem module.  Approval module is used for test data.
                beforeEach(module(workItemModule));

                beforeEach(inject(function (_$controller_, _workItemService_, WorkItem, _workItemTestData_) {
                    $controller = _$controller_;
                    workItemService = _workItemService_;
                    approvalData = angular.copy(_workItemTestData_.APPROVAL);
                    approvalData.workItemType = WorkItem.WorkItemType.Approval;
                    workItemTestData = _workItemTestData_;
                }));

                function setUpController(data) {
                    dialogController = $controller('WorkItemDialogCtrl', {
                        workItem: workItemService.createWorkItem(data),
                        getTemplateStyle: function () {
                            return 'full';
                        },
                        onComplete: function () {}
                    });
                }

                describe('getAlertClass', function () {
                    it('should return appropriate string for workitem of type violation', function () {
                        setUpController(workItemTestData.workItemTestData1);
                        expect(dialogController.getAlertClass()).toBe('alert-danger');
                    });
                    it('should return appropriate string for workitem of type approval', function () {
                        setUpController(approvalData);
                        expect(dialogController.getAlertClass()).toBe('alert-info');
                    });
                });

                describe('getButtonClass', function () {
                    it('should return appropriate string for workitem of type violation', function () {
                        setUpController(workItemTestData.workItemTestData1);
                        expect(dialogController.getButtonClass()).toBe('btn-danger');
                    });
                    it('should return appropriate string for workitem of type approval', function () {
                        setUpController(approvalData);
                        expect(dialogController.getButtonClass()).toBe('btn-base');
                    });
                });

                describe('getAlertTextKey', function () {
                    it('should return appropriate string for workitem of type violation', function () {
                        setUpController(workItemTestData.workItemTestData1);
                        expect(dialogController.getAlertTextKey()).toBe('ui_work_item_dialog_violation_alert');
                    });
                    it('should return appropriate string for workitem of type approval', function () {
                        setUpController(approvalData);
                        expect(dialogController.getAlertTextKey()).toBe('ui_work_item_dialog_approval_alert');
                    });
                });

                describe('showInfoAlert', function () {
                    it('should return true for workitem of type violation', function () {
                        setUpController(workItemTestData.workItemTestData1);
                        expect(dialogController.showInfoAlert()).toBeTruthy();
                    });
                    it('should return true for workitem of type approval', function () {
                        setUpController(approvalData);
                        expect(dialogController.showInfoAlert()).toBeTruthy();
                    });
                    it('should return false for workitems not of type violation or approval', function () {
                        setUpController(workItemTestData.workItemTestData4);
                        expect(dialogController.showInfoAlert()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7SUFDakg7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1FBQ2hDLFNBQVMsWUFBWTs7WUFGN0IsU0FBUyxzQkFBc0IsWUFBVzs7Z0JBRXRDLElBQUksa0JBQWtCLGFBQWEsaUJBQWlCLGNBQWM7OztnQkFHbEUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxtQkFBbUIsVUFDbEMsb0JBQW9CO29CQUMzQyxjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsZUFBZSxRQUFRLEtBQUssbUJBQW1CO29CQUMvQyxhQUFhLGVBQWUsU0FBUyxhQUFhO29CQUNsRCxtQkFBbUI7OztnQkFHdkIsU0FBUyxnQkFBZ0IsTUFBTTtvQkFDM0IsbUJBQW1CLFlBQVksc0JBQXNCO3dCQUNqRCxVQUFVLGdCQUFnQixlQUFlO3dCQUN6QyxrQkFBa0IsWUFBVzs0QkFBRSxPQUFPOzt3QkFDdEMsWUFBWSxZQUFXOzs7O2dCQUkvQixTQUFTLGlCQUFpQixZQUFXO29CQUNqQyxHQUFHLG1FQUFtRSxZQUFXO3dCQUM3RSxnQkFBZ0IsaUJBQWlCO3dCQUNqQyxPQUFPLGlCQUFpQixpQkFBaUIsS0FBSzs7b0JBRWxELEdBQUcsa0VBQWtFLFlBQVc7d0JBQzVFLGdCQUFnQjt3QkFDaEIsT0FBTyxpQkFBaUIsaUJBQWlCLEtBQUs7Ozs7Z0JBSXRELFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLEdBQUcsbUVBQW1FLFlBQVc7d0JBQzdFLGdCQUFnQixpQkFBaUI7d0JBQ2pDLE9BQU8saUJBQWlCLGtCQUFrQixLQUFLOztvQkFFbkQsR0FBRyxrRUFBa0UsWUFBVzt3QkFDNUUsZ0JBQWdCO3dCQUNoQixPQUFPLGlCQUFpQixrQkFBa0IsS0FBSzs7OztnQkFJdkQsU0FBUyxtQkFBbUIsWUFBVztvQkFDbkMsR0FBRyxtRUFBbUUsWUFBVzt3QkFDN0UsZ0JBQWdCLGlCQUFpQjt3QkFDakMsT0FBTyxpQkFBaUIsbUJBQW1CLEtBQUs7O29CQUVwRCxHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxnQkFBZ0I7d0JBQ2hCLE9BQU8saUJBQWlCLG1CQUFtQixLQUFLOzs7O2dCQUl4RCxTQUFTLGlCQUFpQixZQUFXO29CQUNqQyxHQUFHLHFEQUFxRCxZQUFXO3dCQUMvRCxnQkFBZ0IsaUJBQWlCO3dCQUNqQyxPQUFPLGlCQUFpQixpQkFBaUI7O29CQUU3QyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxnQkFBZ0I7d0JBQ2hCLE9BQU8saUJBQWlCLGlCQUFpQjs7b0JBRTdDLEdBQUcsdUVBQXVFLFlBQVc7d0JBQ2pGLGdCQUFnQixpQkFBaUI7d0JBQ2pDLE9BQU8saUJBQWlCLGlCQUFpQjs7Ozs7O0dBV2xEIiwiZmlsZSI6IndvcmtpdGVtL1dvcmtJdGVtRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE1IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcbmltcG9ydCAnLi9Xb3JrSXRlbVRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1dvcmtJdGVtRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGRpYWxvZ0NvbnRyb2xsZXIsICRjb250cm9sbGVyLCB3b3JrSXRlbVNlcnZpY2UsIGFwcHJvdmFsRGF0YSwgd29ya0l0ZW1UZXN0RGF0YTtcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHdvcmtpdGVtIG1vZHVsZS4gIEFwcHJvdmFsIG1vZHVsZSBpcyB1c2VkIGZvciB0ZXN0IGRhdGEuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF93b3JrSXRlbVNlcnZpY2VfLCBXb3JrSXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfd29ya0l0ZW1UZXN0RGF0YV8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB3b3JrSXRlbVNlcnZpY2UgPSBfd29ya0l0ZW1TZXJ2aWNlXztcbiAgICAgICAgYXBwcm92YWxEYXRhID0gYW5ndWxhci5jb3B5KF93b3JrSXRlbVRlc3REYXRhXy5BUFBST1ZBTCk7XG4gICAgICAgIGFwcHJvdmFsRGF0YS53b3JrSXRlbVR5cGUgPSBXb3JrSXRlbS5Xb3JrSXRlbVR5cGUuQXBwcm92YWw7XG4gICAgICAgIHdvcmtJdGVtVGVzdERhdGEgPSBfd29ya0l0ZW1UZXN0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gc2V0VXBDb250cm9sbGVyKGRhdGEpIHtcbiAgICAgICAgZGlhbG9nQ29udHJvbGxlciA9ICRjb250cm9sbGVyKCdXb3JrSXRlbURpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICB3b3JrSXRlbTogd29ya0l0ZW1TZXJ2aWNlLmNyZWF0ZVdvcmtJdGVtKGRhdGEpLFxuICAgICAgICAgICAgZ2V0VGVtcGxhdGVTdHlsZTogZnVuY3Rpb24oKSB7IHJldHVybiAnZnVsbCc7IH0sXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdnZXRBbGVydENsYXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcHJvcHJpYXRlIHN0cmluZyBmb3Igd29ya2l0ZW0gb2YgdHlwZSB2aW9sYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExKTtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250cm9sbGVyLmdldEFsZXJ0Q2xhc3MoKSkudG9CZSgnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhcHByb3ByaWF0ZSBzdHJpbmcgZm9yIHdvcmtpdGVtIG9mIHR5cGUgYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwQ29udHJvbGxlcihhcHByb3ZhbERhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0NvbnRyb2xsZXIuZ2V0QWxlcnRDbGFzcygpKS50b0JlKCdhbGVydC1pbmZvJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEJ1dHRvbkNsYXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcHJvcHJpYXRlIHN0cmluZyBmb3Igd29ya2l0ZW0gb2YgdHlwZSB2aW9sYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExKTtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250cm9sbGVyLmdldEJ1dHRvbkNsYXNzKCkpLnRvQmUoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcHJvcHJpYXRlIHN0cmluZyBmb3Igd29ya2l0ZW0gb2YgdHlwZSBhcHByb3ZhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXBDb250cm9sbGVyKGFwcHJvdmFsRGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoZGlhbG9nQ29udHJvbGxlci5nZXRCdXR0b25DbGFzcygpKS50b0JlKCdidG4tYmFzZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRBbGVydFRleHRLZXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYXBwcm9wcmlhdGUgc3RyaW5nIGZvciB3b3JraXRlbSBvZiB0eXBlIHZpb2xhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXBDb250cm9sbGVyKHdvcmtJdGVtVGVzdERhdGEud29ya0l0ZW1UZXN0RGF0YTEpO1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0NvbnRyb2xsZXIuZ2V0QWxlcnRUZXh0S2V5KCkpLnRvQmUoJ3VpX3dvcmtfaXRlbV9kaWFsb2dfdmlvbGF0aW9uX2FsZXJ0Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhcHByb3ByaWF0ZSBzdHJpbmcgZm9yIHdvcmtpdGVtIG9mIHR5cGUgYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwQ29udHJvbGxlcihhcHByb3ZhbERhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0NvbnRyb2xsZXIuZ2V0QWxlcnRUZXh0S2V5KCkpLnRvQmUoJ3VpX3dvcmtfaXRlbV9kaWFsb2dfYXBwcm92YWxfYWxlcnQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0luZm9BbGVydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciB3b3JraXRlbSBvZiB0eXBlIHZpb2xhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXBDb250cm9sbGVyKHdvcmtJdGVtVGVzdERhdGEud29ya0l0ZW1UZXN0RGF0YTEpO1xuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZ0NvbnRyb2xsZXIuc2hvd0luZm9BbGVydCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciB3b3JraXRlbSBvZiB0eXBlIGFwcHJvdmFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVcENvbnRyb2xsZXIoYXBwcm92YWxEYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250cm9sbGVyLnNob3dJbmZvQWxlcnQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIHdvcmtpdGVtcyBub3Qgb2YgdHlwZSB2aW9sYXRpb24gb3IgYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwQ29udHJvbGxlcih3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGE0KTtcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250cm9sbGVyLnNob3dJbmZvQWxlcnQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
