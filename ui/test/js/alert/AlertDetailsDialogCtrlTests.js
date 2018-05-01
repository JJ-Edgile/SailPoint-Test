System.register(['test/js/TestInitializer', 'alert/AlertModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }],
        execute: function () {

            describe('AlertDetailsDialogCtrl', function () {
                var ID = '1';

                var alertService = undefined,
                    Alert = undefined,
                    $controller = undefined,
                    $q = undefined;

                beforeEach(module(alertModule));

                beforeEach(inject(function (_alertService_, _Alert_, _$controller_, _$q_) {
                    alertService = _alertService_;
                    Alert = _Alert_;
                    $controller = _$controller_;
                    $q = _$q_;
                }));

                function createController() {
                    spyOn(alertService, 'getAlertDetails').and.returnValue($q.when({}));

                    return $controller('AlertDetailsDialogCtrl', {
                        alertService: alertService,
                        Alert: Alert,
                        alertId: ID
                    });
                }

                it('should fetch the details when constructed', function () {
                    createController();

                    expect(alertService.getAlertDetails).toHaveBeenCalledWith(ID);
                });

                describe('canViewResult', function () {

                    it('should return true if actionType WORKFLOW and canViewTaskResult true', function () {
                        var ctrl = createController();
                        ctrl.item = new Alert({});
                        ctrl.item.actions = [{
                            id: '1',
                            created: '04/01/2016',
                            actionType: 'WORKFLOW',
                            actionTypeDisplay: 'Workflow',
                            canViewTaskResult: true,
                            definitionName: 'Alert Def',
                            result: {
                                resultId: '1234',
                                resultName: 'I am the Result',
                                workflowName: 'I am the Workflow',
                                notification: [{
                                    displayName: 'I was Notified',
                                    name: 'notifiedPerson',
                                    emails: ['email1@ex.com', 'email2@ex.com']
                                }]
                            }
                        }];

                        expect(ctrl.canViewResult(ctrl.item.actions[0])).toBe(true);
                    });

                    it('should return false if actionType WORKFLOW and canViewTaskResult false', function () {
                        var ctrl = createController();
                        ctrl.item = new Alert({});
                        ctrl.item.actions = [{
                            id: '1',
                            created: '04/01/2016',
                            actionType: 'WORKFLOW',
                            actionTypeDisplay: 'Workflow',
                            canViewTaskResult: false,
                            definitionName: 'Alert Def',
                            result: {
                                resultId: '1234',
                                resultName: 'I am the Result',
                                workflowName: 'I am the Workflow',
                                notification: [{
                                    displayName: 'I was Notified',
                                    name: 'notifiedPerson',
                                    emails: ['email1@ex.com', 'email2@ex.com']
                                }]
                            }
                        }];

                        expect(ctrl.canViewResult(ctrl.item.actions[0])).toBe(false);
                    });

                    it('should return false if actionType not WORKFLOW or CERTIFICATION', function () {
                        var ctrl = createController();
                        ctrl.item = new Alert({});
                        ctrl.item.actions = [{
                            id: '1',
                            created: '04/01/2016',
                            actionType: 'WORKFLOW2',
                            actionTypeDisplay: 'Workflow',
                            canViewTaskResult: false,
                            definitionName: 'Alert Def',
                            result: {
                                resultId: '1234',
                                resultName: 'I am the Result',
                                workflowName: 'I am the Workflow',
                                notification: [{
                                    displayName: 'I was Notified',
                                    name: 'notifiedPerson',
                                    emails: ['email1@ex.com', 'email2@ex.com']
                                }]
                            }
                        }];

                        expect(ctrl.canViewResult(ctrl.item.actions[0])).toBe(false);
                    });

                    it('should return false if undefined resultId', function () {
                        var ctrl = createController();
                        ctrl.item = new Alert({});
                        ctrl.item.actions = [{
                            id: '1',
                            created: '04/01/2016',
                            actionType: 'WORKFLOW',
                            actionTypeDisplay: 'Workflow',
                            canViewTaskResult: true,
                            definitionName: 'Alert Def',
                            result: {
                                resultName: 'I am the Result',
                                workflowName: 'I am the Workflow',
                                notification: [{
                                    displayName: 'I was Notified',
                                    name: 'notifiedPerson',
                                    emails: ['email1@ex.com', 'email2@ex.com']
                                }]
                            }
                        }];

                        expect(ctrl.canViewResult(ctrl.item.actions[0])).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGV0YWlsc0RpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0JBQXNCLFVBQVUsU0FBUzs7Ozs7SUFLakY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1CQUFtQjtZQUN6RSxjQUFjLGtCQUFrQjs7UUFFcEMsU0FBUyxZQUFZOztZQUw3QixTQUFTLDBCQUEwQixZQUFNO2dCQUNyQyxJQUFNLEtBQUs7O2dCQUVYLElBQUksZUFBWTtvQkFBRSxRQUFLO29CQUFFLGNBQVc7b0JBQUUsS0FBRTs7Z0JBRXhDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGdCQUFnQixTQUFTLGVBQWUsTUFBUztvQkFDaEUsZUFBZTtvQkFDZixRQUFRO29CQUNSLGNBQWM7b0JBQ2QsS0FBSzs7O2dCQUdULFNBQVMsbUJBQW1CO29CQUN4QixNQUFNLGNBQWMsbUJBQW1CLElBQUksWUFBWSxHQUFHLEtBQUs7O29CQUUvRCxPQUFPLFlBQVksMEJBQTBCO3dCQUN6QyxjQUFjO3dCQUNkLE9BQU87d0JBQ1AsU0FBUzs7OztnQkFJakIsR0FBSSw2Q0FBNkMsWUFBTTtvQkFDbkQ7O29CQUVBLE9BQU8sYUFBYSxpQkFBaUIscUJBQXFCOzs7Z0JBRzlELFNBQVMsaUJBQWlCLFlBQU07O29CQUU1QixHQUFHLHdFQUF3RSxZQUFNO3dCQUM3RSxJQUFJLE9BQU87d0JBQ1gsS0FBSyxPQUFPLElBQUksTUFBTTt3QkFDdEIsS0FBSyxLQUFLLFVBQVUsQ0FDaEI7NEJBQ0ksSUFBSTs0QkFDSixTQUFTOzRCQUNULFlBQVk7NEJBQ1osbUJBQW1COzRCQUNuQixtQkFBbUI7NEJBQ25CLGdCQUFnQjs0QkFDaEIsUUFBUTtnQ0FDSixVQUFVO2dDQUNWLFlBQVk7Z0NBQ1osY0FBYztnQ0FDZCxjQUFjLENBQ1Y7b0NBQ0ksYUFBYTtvQ0FDYixNQUFNO29DQUNOLFFBQVEsQ0FBQyxpQkFBaUI7Ozs7O3dCQU85QyxPQUFPLEtBQUssY0FBYyxLQUFLLEtBQUssUUFBUSxLQUFLLEtBQUs7OztvQkFHMUQsR0FBRywwRUFBMEUsWUFBTTt3QkFDL0UsSUFBSSxPQUFPO3dCQUNYLEtBQUssT0FBTyxJQUFJLE1BQU07d0JBQ3RCLEtBQUssS0FBSyxVQUFVLENBQ2hCOzRCQUNJLElBQUk7NEJBQ0osU0FBUzs0QkFDVCxZQUFZOzRCQUNaLG1CQUFtQjs0QkFDbkIsbUJBQW1COzRCQUNuQixnQkFBZ0I7NEJBQ2hCLFFBQVE7Z0NBQ0osVUFBVTtnQ0FDVixZQUFZO2dDQUNaLGNBQWM7Z0NBQ2QsY0FBYyxDQUNWO29DQUNJLGFBQWE7b0NBQ2IsTUFBTTtvQ0FDTixRQUFRLENBQUMsaUJBQWlCOzs7Ozt3QkFPOUMsT0FBTyxLQUFLLGNBQWMsS0FBSyxLQUFLLFFBQVEsS0FBSyxLQUFLOzs7b0JBRzFELEdBQUcsbUVBQW1FLFlBQU07d0JBQ3hFLElBQUksT0FBTzt3QkFDWCxLQUFLLE9BQU8sSUFBSSxNQUFNO3dCQUN0QixLQUFLLEtBQUssVUFBVSxDQUNoQjs0QkFDSSxJQUFJOzRCQUNKLFNBQVM7NEJBQ1QsWUFBWTs0QkFDWixtQkFBbUI7NEJBQ25CLG1CQUFtQjs0QkFDbkIsZ0JBQWdCOzRCQUNoQixRQUFRO2dDQUNKLFVBQVU7Z0NBQ1YsWUFBWTtnQ0FDWixjQUFjO2dDQUNkLGNBQWMsQ0FDVjtvQ0FDSSxhQUFhO29DQUNiLE1BQU07b0NBQ04sUUFBUSxDQUFDLGlCQUFpQjs7Ozs7d0JBTzlDLE9BQU8sS0FBSyxjQUFjLEtBQUssS0FBSyxRQUFRLEtBQUssS0FBSzs7O29CQUcxRCxHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxJQUFJLE9BQU87d0JBQ1gsS0FBSyxPQUFPLElBQUksTUFBTTt3QkFDdEIsS0FBSyxLQUFLLFVBQVUsQ0FDaEI7NEJBQ0ksSUFBSTs0QkFDSixTQUFTOzRCQUNULFlBQVk7NEJBQ1osbUJBQW1COzRCQUNuQixtQkFBbUI7NEJBQ25CLGdCQUFnQjs0QkFDaEIsUUFBUTtnQ0FDSixZQUFZO2dDQUNaLGNBQWM7Z0NBQ2QsY0FBYyxDQUNWO29DQUNJLGFBQWE7b0NBQ2IsTUFBTTtvQ0FDTixRQUFRLENBQUMsaUJBQWlCOzs7Ozt3QkFPOUMsT0FBTyxLQUFLLGNBQWMsS0FBSyxLQUFLLFFBQVEsS0FBSyxLQUFLOzs7Ozs7R0FBL0QiLCJmaWxlIjoiYWxlcnQvQWxlcnREZXRhaWxzRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhbGVydE1vZHVsZSBmcm9tICdhbGVydC9BbGVydE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdBbGVydERldGFpbHNEaWFsb2dDdHJsJywgKCkgPT4ge1xuICAgIGNvbnN0IElEID0gJzEnO1xuXG4gICAgbGV0IGFsZXJ0U2VydmljZSwgQWxlcnQsICRjb250cm9sbGVyLCAkcTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFsZXJ0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2FsZXJ0U2VydmljZV8sIF9BbGVydF8sIF8kY29udHJvbGxlcl8sIF8kcV8pID0+IHtcbiAgICAgICAgYWxlcnRTZXJ2aWNlID0gX2FsZXJ0U2VydmljZV87XG4gICAgICAgIEFsZXJ0ID0gX0FsZXJ0XztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgc3B5T24oYWxlcnRTZXJ2aWNlLCAnZ2V0QWxlcnREZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcblxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0FsZXJ0RGV0YWlsc0RpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBhbGVydFNlcnZpY2U6IGFsZXJ0U2VydmljZSxcbiAgICAgICAgICAgIEFsZXJ0OiBBbGVydCxcbiAgICAgICAgICAgIGFsZXJ0SWQ6IElEXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0ICgnc2hvdWxkIGZldGNoIHRoZSBkZXRhaWxzIHdoZW4gY29uc3RydWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICBleHBlY3QoYWxlcnRTZXJ2aWNlLmdldEFsZXJ0RGV0YWlscykudG9IYXZlQmVlbkNhbGxlZFdpdGgoSUQpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhblZpZXdSZXN1bHQnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhY3Rpb25UeXBlIFdPUktGTE9XIGFuZCBjYW5WaWV3VGFza1Jlc3VsdCB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLml0ZW0gPSBuZXcgQWxlcnQoe30pO1xuICAgICAgICAgICAgY3RybC5pdGVtLmFjdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiAnMDQvMDEvMjAxNicsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblR5cGU6ICdXT1JLRkxPVycsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblR5cGVEaXNwbGF5OiAnV29ya2Zsb3cnLFxuICAgICAgICAgICAgICAgICAgICBjYW5WaWV3VGFza1Jlc3VsdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbk5hbWU6ICdBbGVydCBEZWYnLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdElkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHROYW1lOiAnSSBhbSB0aGUgUmVzdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93TmFtZTogJ0kgYW0gdGhlIFdvcmtmbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdJIHdhcyBOb3RpZmllZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdub3RpZmllZFBlcnNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsczogWydlbWFpbDFAZXguY29tJywgJ2VtYWlsMkBleC5jb20nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhblZpZXdSZXN1bHQoY3RybC5pdGVtLmFjdGlvbnNbMF0pKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBhY3Rpb25UeXBlIFdPUktGTE9XIGFuZCBjYW5WaWV3VGFza1Jlc3VsdCBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5pdGVtID0gbmV3IEFsZXJ0KHt9KTtcbiAgICAgICAgICAgIGN0cmwuaXRlbS5hY3Rpb25zID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogJzA0LzAxLzIwMTYnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25UeXBlOiAnV09SS0ZMT1cnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25UeXBlRGlzcGxheTogJ1dvcmtmbG93JyxcbiAgICAgICAgICAgICAgICAgICAgY2FuVmlld1Rhc2tSZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uTmFtZTogJ0FsZXJ0IERlZicsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdE5hbWU6ICdJIGFtIHRoZSBSZXN1bHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dOYW1lOiAnSSBhbSB0aGUgV29ya2Zsb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0kgd2FzIE5vdGlmaWVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vdGlmaWVkUGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxzOiBbJ2VtYWlsMUBleC5jb20nLCAnZW1haWwyQGV4LmNvbSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2FuVmlld1Jlc3VsdChjdHJsLml0ZW0uYWN0aW9uc1swXSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBhY3Rpb25UeXBlIG5vdCBXT1JLRkxPVyBvciBDRVJUSUZJQ0FUSU9OJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLml0ZW0gPSBuZXcgQWxlcnQoe30pO1xuICAgICAgICAgICAgY3RybC5pdGVtLmFjdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiAnMDQvMDEvMjAxNicsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvblR5cGU6ICdXT1JLRkxPVzInLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25UeXBlRGlzcGxheTogJ1dvcmtmbG93JyxcbiAgICAgICAgICAgICAgICAgICAgY2FuVmlld1Rhc2tSZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uTmFtZTogJ0FsZXJ0IERlZicsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdE5hbWU6ICdJIGFtIHRoZSBSZXN1bHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dOYW1lOiAnSSBhbSB0aGUgV29ya2Zsb3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0kgd2FzIE5vdGlmaWVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vdGlmaWVkUGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWxzOiBbJ2VtYWlsMUBleC5jb20nLCAnZW1haWwyQGV4LmNvbSddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2FuVmlld1Jlc3VsdChjdHJsLml0ZW0uYWN0aW9uc1swXSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB1bmRlZmluZWQgcmVzdWx0SWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwuaXRlbSA9IG5ldyBBbGVydCh7fSk7XG4gICAgICAgICAgICBjdHJsLml0ZW0uYWN0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6ICcwNC8wMS8yMDE2JyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uVHlwZTogJ1dPUktGTE9XJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uVHlwZURpc3BsYXk6ICdXb3JrZmxvdycsXG4gICAgICAgICAgICAgICAgICAgIGNhblZpZXdUYXNrUmVzdWx0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uTmFtZTogJ0FsZXJ0IERlZicsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0TmFtZTogJ0kgYW0gdGhlIFJlc3VsdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd05hbWU6ICdJIGFtIHRoZSBXb3JrZmxvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSSB3YXMgTm90aWZpZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbm90aWZpZWRQZXJzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbHM6IFsnZW1haWwxQGV4LmNvbScsICdlbWFpbDJAZXguY29tJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5jYW5WaWV3UmVzdWx0KGN0cmwuaXRlbS5hY3Rpb25zWzBdKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
