System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ManageAccountSummaryCtrl', function () {
                var $controller = undefined,
                    $scope = undefined,
                    $stateParams = undefined,
                    $q = undefined,
                    $rootScope = undefined,
                    manageAccountDataService = undefined,
                    identityId = undefined,
                    identityName = undefined,
                    quickLink = undefined,
                    testService = undefined,
                    identityService = undefined,
                    workItemService = undefined,
                    manageAccountService = undefined,
                    WorkflowResultItem = undefined,
                    $state = undefined,
                    spNotificationService = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function (_$rootScope_, _$controller_, _manageAccountDataService_, _$stateParams_, _$q_, _testService_, _manageAccountService_, _WorkflowResultItem_, _$state_, _spNotificationService_, _identityService_, _workItemService_) {
                    $rootScope = _$rootScope_;
                    $controller = _$controller_;
                    $q = _$q_;
                    $scope = $rootScope.$new();
                    $stateParams = _$stateParams_;
                    testService = _testService_;
                    manageAccountDataService = _manageAccountDataService_;
                    manageAccountService = _manageAccountService_;
                    identityService = _identityService_;
                    identityId = '1234';
                    identityName = 'testUser';
                    quickLink = 'Manage%20Accounts';
                    WorkflowResultItem = _WorkflowResultItem_;
                    workItemService = _workItemService_;

                    // Create some mock data
                    $stateParams = {
                        identityId: identityId,
                        quickLink: quickLink
                    };
                    $state = _$state_;
                    spNotificationService = _spNotificationService_;
                }));

                function createController() {
                    return $controller('ManageAccountSummaryCtrl', {
                        $scope: $scope,
                        $stateParams: $stateParams,
                        manageAccountDataService: manageAccountDataService,
                        $state: $state,
                        spNotificationService: spNotificationService
                    });
                }

                describe('constructor', function () {
                    it('throws if identity ID is missing', function () {
                        delete $stateParams.identityId;
                        expect(function () {
                            createController(0);
                        }).toThrow();
                    });
                });

                describe('getItems', function () {
                    it('getItems() calls service', function () {
                        var ctrl = createController();
                        spyOn(manageAccountDataService, 'getSelectedAccountsListResult').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        ctrl.quickLink = quickLink;
                        expect(manageAccountDataService.getSelectedAccountsListResult).not.toHaveBeenCalled();
                        ctrl.getItems(0, 10, {}, null);
                        expect(manageAccountDataService.getSelectedAccountsListResult).toHaveBeenCalled();
                    });
                });

                describe('submit', function () {
                    it('should clear the data state and redirect when rejected with workitem id', function () {
                        var ctrl = createController(),
                            workItemId = 'someworkItem',
                            result = new WorkflowResultItem({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: workItemId
                        });
                        spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.reject(workItemId));
                        spyOn(manageAccountDataService, 'reset');
                        spyOn(workItemService, 'navigateToWorkItemPage').and.callFake(angular.noop);

                        ctrl.submit();
                        $rootScope.$apply();

                        expect(manageAccountDataService.reset).toHaveBeenCalled();
                        expect(workItemService.navigateToWorkItemPage).toHaveBeenCalledWith(workItemId);
                    });
                });

                it('should call the open work item modal function if workflow result has a workitem', function () {
                    var ctrl = createController(),
                        result = new WorkflowResultItem({
                        workflowWorkItemType: 'Form',
                        workflowWorkItemId: 'workitemId'
                    });
                    spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                    spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                    spyOn($state, 'go');
                    ctrl.submit();
                    $rootScope.$apply();
                    expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                });

                it('should call through to manageAccountDataService to determine if dirty', function () {
                    spyOn(manageAccountDataService, 'isDirty').and.callThrough();
                    var ctrl = createController();
                    ctrl.isDirty();
                    expect(manageAccountDataService.isDirty).toHaveBeenCalled();
                });

                describe('notifications', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                        spyOn($state, 'go');
                        spyOn(spNotificationService, 'addNotification');
                    });

                    it('should add info message to notification service when later-ed', function () {
                        var result = new WorkflowResultItem({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: 'workitemId'
                        });
                        spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.reject());
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalledWith('ui_manage_accounts_form_saved_for_later', 'INFO');
                        expect($state.go).toHaveBeenCalledWith('identities.identity.accounts');
                    });

                    it('should add info message to notification service when cancel-ed within the form modal', function () {
                        var result = new WorkflowResultItem({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: 'workitemId'
                        });
                        spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when({
                            cancelled: true
                        }));
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalledWith('ui_manage_accounts_form_saved_for_later', 'INFO');
                        expect($state.go).toHaveBeenCalledWith('identities.identity.accounts');
                    });

                    it('should add info message to notification when account request approver does not have email address', function () {
                        var result = new WorkflowResultItem({
                            workflowWorkItemId: 'workitemId',
                            messages: [{ messageOrKey: 'notification_failed_no_email', status: 'WARNING',
                                args: [identityName] }]
                        });
                        spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.reject());
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalledWith(result.messages[0].messageOrKey, result.messages[0].status, result.messages[0].args);
                        expect($state.go).toHaveBeenCalledWith('identities.identity.accounts');
                    });

                    it('should add success message to notification service when successfully submitted', function () {
                        var result = new WorkflowResultItem({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: 'workitemId'
                        });
                        spyOn(manageAccountService, 'submit').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when({}));
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalledWith('ui_manage_accounts_submitted', 'SUCCESS');
                        expect($state.go).toHaveBeenCalledWith('identities.identity.accounts');
                    });

                    it('should add error message to notification service when failed', function () {
                        var someMessage = 'error message';
                        spyOn(manageAccountService, 'submit').and.returnValue($q.reject({ message: someMessage }));
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalledWith(someMessage, 'ERROR', undefined, true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnRTdW1tYXJ5Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUk3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLDRCQUE0QixZQUFXO2dCQUM1QyxJQUFJLGNBQVc7b0JBQUUsU0FBTTtvQkFBRSxlQUFZO29CQUFFLEtBQUU7b0JBQUUsYUFBVTtvQkFBRSwyQkFBd0I7b0JBQUUsYUFBVTtvQkFBRSxlQUFZO29CQUNyRyxZQUFTO29CQUFFLGNBQVc7b0JBQUUsa0JBQWU7b0JBQUUsa0JBQWU7b0JBQ3hELHVCQUFvQjtvQkFBRSxxQkFBa0I7b0JBQUUsU0FBTTtvQkFBRSx3QkFBcUI7O2dCQUUzRSxXQUFXLE9BQU8sZ0JBQWdCOzs7Z0JBR2xDLFdBQVcsT0FBTyxVQUFTLGNBQWMsZUFBZSw0QkFBNEIsZ0JBQ3pELE1BQU0sZUFBZSx3QkFBd0Isc0JBQXNCLFVBQ25FLHlCQUF5QixtQkFBbUIsbUJBQW1CO29CQUN0RixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsS0FBSztvQkFDTCxTQUFTLFdBQVc7b0JBQ3BCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCwyQkFBMkI7b0JBQzNCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsWUFBWTtvQkFDWixxQkFBcUI7b0JBQ3JCLGtCQUFrQjs7O29CQUdsQixlQUFlO3dCQUNYLFlBQVk7d0JBQ1osV0FBVzs7b0JBRWYsU0FBUztvQkFDVCx3QkFBd0I7OztnQkFHNUIsU0FBUyxtQkFBbUI7b0JB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Q0ssWUFBVzt3QkFDZixJQUFJLFNBQVMsSUFBSSxtQkFBbUI7NEJBQ2hDLG9CQUFvQjs0QkFDcEIsVUFBVSxDQUFDLEVBQUMsY0FBYyxnQ0FBZ0MsUUFBUTtnQ0FDOUQsTUFBTSxDQUFDOzt3QkFFZixNQUFNLHNCQUFzQixVQUFVLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQzlELE1BQU0saUJBQWlCLHdCQUF3QixJQUFJLFlBQVksR0FBRzt3QkFDbEUsS0FBSzt3QkFDTCxXQUFXO3dCQUNYLE9BQU8sc0JBQXNCLGlCQUN4QixxQkFBcUIsT0FBTyxTQUFTLEdBQUcsY0FBYyxPQUFPLFNBQVMsR0FBRyxRQUNsRSxPQUFPLFNBQVMsR0FBRzt3QkFDL0IsT0FBTyxPQUFPLElBQUkscUJBQXFCOzs7b0JBRzNDLEdBQUcsa0ZBQWtGLFlBQVc7d0JBQzVGLElBQUksU0FBUyxJQUFJLG1CQUFtQjs0QkFDNUIsc0JBQXNCOzRCQUN0QixvQkFBb0I7O3dCQUU1QixNQUFNLHNCQUFzQixVQUFVLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQzlELE1BQU0saUJBQWlCLHdCQUF3QixJQUFJLFlBQVksR0FBRyxLQUFLO3dCQUN2RSxLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxzQkFBc0IsaUJBQ3hCLHFCQUFxQixnQ0FBZ0M7d0JBQzFELE9BQU8sT0FBTyxJQUFJLHFCQUFxQjs7O29CQUczQyxHQUFHLGdFQUFnRSxZQUFXO3dCQUMxRSxJQUFJLGNBQWM7d0JBQ2xCLE1BQU0sc0JBQXNCLFVBQVUsSUFBSSxZQUFZLEdBQUcsT0FBTyxFQUFDLFNBQVM7d0JBQzFFLEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLHNCQUFzQixpQkFBaUIscUJBQXFCLGFBQWEsU0FBUyxXQUFXOzs7Ozs7R0FtQjdHIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZUFjY291bnRTdW1tYXJ5Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ01hbmFnZUFjY291bnRTdW1tYXJ5Q3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCAkY29udHJvbGxlciwgJHNjb3BlLCAkc3RhdGVQYXJhbXMsICRxLCAkcm9vdFNjb3BlLCBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsIGlkZW50aXR5SWQsIGlkZW50aXR5TmFtZSxcbiAgICAgICAgcXVpY2tMaW5rLCB0ZXN0U2VydmljZSwgaWRlbnRpdHlTZXJ2aWNlLCB3b3JrSXRlbVNlcnZpY2UsXG4gICAgICAgIG1hbmFnZUFjY291bnRTZXJ2aWNlLCBXb3JrZmxvd1Jlc3VsdEl0ZW0sICRzdGF0ZSwgc3BOb3RpZmljYXRpb25TZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEyICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbnRyb2xsZXJfLCBfbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlXywgXyRzdGF0ZVBhcmFtc18sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRxXywgX3Rlc3RTZXJ2aWNlXywgX21hbmFnZUFjY291bnRTZXJ2aWNlXywgX1dvcmtmbG93UmVzdWx0SXRlbV8sIF8kc3RhdGVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLCBfaWRlbnRpdHlTZXJ2aWNlXywgX3dvcmtJdGVtU2VydmljZV8pIHtcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkc3RhdGVQYXJhbXMgPSBfJHN0YXRlUGFyYW1zXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudFNlcnZpY2VfO1xuICAgICAgICBpZGVudGl0eVNlcnZpY2UgPSBfaWRlbnRpdHlTZXJ2aWNlXztcbiAgICAgICAgaWRlbnRpdHlJZCA9ICcxMjM0JztcbiAgICAgICAgaWRlbnRpdHlOYW1lID0gJ3Rlc3RVc2VyJztcbiAgICAgICAgcXVpY2tMaW5rID0gJ01hbmFnZSUyMEFjY291bnRzJztcbiAgICAgICAgV29ya2Zsb3dSZXN1bHRJdGVtID0gX1dvcmtmbG93UmVzdWx0SXRlbV87XG4gICAgICAgIHdvcmtJdGVtU2VydmljZSA9IF93b3JrSXRlbVNlcnZpY2VfO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzb21lIG1vY2sgZGF0YVxuICAgICAgICAkc3RhdGVQYXJhbXMgPSB7XG4gICAgICAgICAgICBpZGVudGl0eUlkOiBpZGVudGl0eUlkLFxuICAgICAgICAgICAgcXVpY2tMaW5rOiBxdWlja0xpbmtcbiAgICAgICAgfTtcbiAgICAgICAgJHN0YXRlID0gXyRzdGF0ZV87XG4gICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignTWFuYWdlQWNjb3VudFN1bW1hcnlDdHJsJywge1xuICAgICAgICAgICAgJHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICAkc3RhdGVQYXJhbXM6ICRzdGF0ZVBhcmFtcyxcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZTogbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgJHN0YXRlOiAkc3RhdGUsXG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2U6IHNwTm90aWZpY2F0aW9uU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBpZGVudGl0eSBJRCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgJHN0YXRlUGFyYW1zLmlkZW50aXR5SWQ7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigwKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2dldEl0ZW1zKCkgY2FsbHMgc2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsICdnZXRTZWxlY3RlZEFjY291bnRzTGlzdFJlc3VsdCcpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge30sIHt9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSBxdWlja0xpbms7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmdldFNlbGVjdGVkQWNjb3VudHNMaXN0UmVzdWx0KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwLCAxMCwge30sIG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5nZXRTZWxlY3RlZEFjY291bnRzTGlzdFJlc3VsdCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciB0aGUgZGF0YSBzdGF0ZSBhbmQgcmVkaXJlY3Qgd2hlbiByZWplY3RlZCB3aXRoIHdvcmtpdGVtIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkID0gJ3NvbWV3b3JrSXRlbScsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFdvcmtmbG93UmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogd29ya0l0ZW1JZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdzdWJtaXQnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihyZXN1bHQpKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCh3b3JrSXRlbUlkKSk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsICdyZXNldCcpO1xuICAgICAgICAgICAgc3B5T24od29ya0l0ZW1TZXJ2aWNlLCAnbmF2aWdhdGVUb1dvcmtJdGVtUGFnZScpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5yZXNldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5uYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh3b3JrSXRlbUlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIG9wZW4gd29yayBpdGVtIG1vZGFsIGZ1bmN0aW9uIGlmIHdvcmtmbG93IHJlc3VsdCBoYXMgYSB3b3JraXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1JZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ3N1Ym1pdCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHJlc3VsdCkpO1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdwcm9tcHRXb3JrSXRlbURpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICBzcHlPbigkc3RhdGUsICdnbycpO1xuICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaWRlbnRpdHlTZXJ2aWNlLnByb21wdFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UgdG8gZGV0ZXJtaW5lIGlmIGRpcnR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNweU9uKG1hbmFnZUFjY291bnREYXRhU2VydmljZSwgJ2lzRGlydHknKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIGN0cmwuaXNEaXJ0eSgpO1xuICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmlzRGlydHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdub3RpZmljYXRpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE5vdGlmaWNhdGlvbicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFkZCBpbmZvIG1lc3NhZ2UgdG8gbm90aWZpY2F0aW9uIHNlcnZpY2Ugd2hlbiBsYXRlci1lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1JZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdzdWJtaXQnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihyZXN1bHQpKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgpKTtcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd1aV9tYW5hZ2VfYWNjb3VudHNfZm9ybV9zYXZlZF9mb3JfbGF0ZXInLCAnSU5GTycpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2lkZW50aXRpZXMuaWRlbnRpdHkuYWNjb3VudHMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgaW5mbyBtZXNzYWdlIHRvIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIHdoZW4gY2FuY2VsLWVkIHdpdGhpbiB0aGUgZm9ybSBtb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1JZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdzdWJtaXQnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihyZXN1bHQpKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZDogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbilcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3VpX21hbmFnZV9hY2NvdW50c19mb3JtX3NhdmVkX2Zvcl9sYXRlcicsICdJTkZPJyk7XG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnaWRlbnRpdGllcy5pZGVudGl0eS5hY2NvdW50cycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFkZCBpbmZvIG1lc3NhZ2UgdG8gbm90aWZpY2F0aW9uIHdoZW4gYWNjb3VudCByZXF1ZXN0IGFwcHJvdmVyIGRvZXMgbm90IGhhdmUgZW1haWwgYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFdvcmtmbG93UmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1JZCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7bWVzc2FnZU9yS2V5OiAnbm90aWZpY2F0aW9uX2ZhaWxlZF9ub19lbWFpbCcsIHN0YXR1czogJ1dBUk5JTkcnLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbaWRlbnRpdHlOYW1lXX1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZUFjY291bnRTZXJ2aWNlLCAnc3VibWl0JykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4ocmVzdWx0KSk7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdwcm9tcHRXb3JrSXRlbURpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3QoKSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXN1bHQubWVzc2FnZXNbMF0ubWVzc2FnZU9yS2V5LCByZXN1bHQubWVzc2FnZXNbMF0uc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2VzWzBdLmFyZ3MpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2lkZW50aXRpZXMuaWRlbnRpdHkuYWNjb3VudHMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgc3VjY2VzcyBtZXNzYWdlIHRvIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIHdoZW4gc3VjY2Vzc2Z1bGx5IHN1Ym1pdHRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ0Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtSWQ6ICd3b3JraXRlbUlkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdzdWJtaXQnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihyZXN1bHQpKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd1aV9tYW5hZ2VfYWNjb3VudHNfc3VibWl0dGVkJywgJ1NVQ0NFU1MnKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdpZGVudGl0aWVzLmlkZW50aXR5LmFjY291bnRzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGVycm9yIG1lc3NhZ2UgdG8gbm90aWZpY2F0aW9uIHNlcnZpY2Ugd2hlbiBmYWlsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzb21lTWVzc2FnZSA9ICdlcnJvciBtZXNzYWdlJztcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZUFjY291bnRTZXJ2aWNlLCAnc3VibWl0JykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCh7bWVzc2FnZTogc29tZU1lc3NhZ2V9KSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzb21lTWVzc2FnZSwgJ0VSUk9SJywgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
