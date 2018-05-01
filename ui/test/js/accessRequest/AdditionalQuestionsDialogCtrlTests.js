System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            describe('AdditionalQuestionsDialogCtrl', function () {

                var permittedById = '1234',
                    assignmentId = 'abcd',
                    $uibModalInstance = {
                    setTitle: angular.noop
                },
                    ctrl,
                    $controller,
                    accessRequestItem,
                    accountSelections,
                    ambiguousAssignedRoles,
                    RoleAssignmentSelectionStepHandler,
                    accessRequestItemsService,
                    accessRequestDataService,
                    testService,
                    $rootScope;

                beforeEach(module(testModule, accessRequestModule));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (IdentityAccountSelection, AccessRequestItem, AssignedRole, _$controller_, _RoleAssignmentSelectionStepHandler_, _accessRequestItemsService_, _accessRequestDataService_, _testService_, _$rootScope_, accessRequestTestData) {
                    $controller = _$controller_;
                    RoleAssignmentSelectionStepHandler = _RoleAssignmentSelectionStepHandler_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    accessRequestDataService = _accessRequestDataService_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;

                    accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1), new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION2)];

                    ambiguousAssignedRoles = [new AssignedRole(accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE1), new AssignedRole(accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE2)];

                    accessRequestItem = new AccessRequestItem(accessRequestTestData.ROLE);
                }));

                function makeController(accountSelections, ambiguousAssignedRoles, permittedById, assignmentId) {
                    ctrl = $controller('AdditionalQuestionsDialogCtrl', {
                        accessRequestItem: accessRequestItem,
                        accountSelections: accountSelections,
                        ambiguousAssignedRoles: ambiguousAssignedRoles,
                        permittedById: permittedById,
                        assignmentId: assignmentId,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                describe('constructor', function () {
                    it('initializes the parameters', function () {
                        makeController(accountSelections, ambiguousAssignedRoles, permittedById, assignmentId);

                        expect(ctrl.accessRequestItem).toEqual(accessRequestItem);
                        expect(ctrl.permittedById).toEqual(permittedById);
                        expect(ctrl.accountSelections.length).toEqual(accountSelections.length);
                        expect(ctrl.ambiguousAssignedRoles).toEqual(ambiguousAssignedRoles);
                        expect(ctrl.assignmentId).toEqual(assignmentId);
                    });

                    it('clones the account selections', function () {
                        ctrl.accountSelections[0].getProvisioningTargets()[0].setCreateAccount(true);
                        expect(accountSelections[0].getProvisioningTargets()[0].hasSelection()).toEqual(false);
                    });

                    it('creates a StepHandler for roles and account selections', function () {
                        makeController(accountSelections, ambiguousAssignedRoles, permittedById, assignmentId);

                        expect(ctrl.steps.length).toEqual(5);
                        expect(ctrl.steps[0] instanceof RoleAssignmentSelectionStepHandler).toBeTruthy();
                        expect(ctrl.steps[1].provisioningTarget).toEqual(accountSelections[0].getProvisioningTargets()[0]);
                        expect(ctrl.steps[2].provisioningTarget).toEqual(accountSelections[0].getProvisioningTargets()[1]);
                        expect(ctrl.steps[3].provisioningTarget).toEqual(accountSelections[1].getProvisioningTargets()[0]);
                        expect(ctrl.steps[4].provisioningTarget).toEqual(accountSelections[1].getProvisioningTargets()[1]);
                    });
                });

                it('formatStepResults() returns the accountSelections', function () {
                    makeController(accountSelections, ambiguousAssignedRoles, permittedById, assignmentId);
                    var results = ctrl.formatStepResults();
                    expect(results.accountSelections).toBeDefined();
                    expect(results.accountSelections).toEqual(ctrl.accountSelections);
                    expect(results.assignmentId).toEqual(ctrl.assignmentId);
                });

                describe('refreshStepHandlers()', function () {
                    var additionalQuestionsResult = {},
                        identityIds = ['1234', '5678'],
                        otherRequestedRoles = [{ mockthis: 'role' }];

                    beforeEach(function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.callFake(function () {
                            return testService.createPromise(false, additionalQuestionsResult);
                        });

                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentityIds').and.returnValue(identityIds);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getOtherRequestedRoles').and.returnValue(otherRequestedRoles);
                    });

                    it('return promise that resolves to undefined if step is not role assignment selection', function () {
                        var promise;

                        makeController(accountSelections, undefined, undefined, undefined);
                        promise = ctrl.refreshStepHandlers();
                        promise.then(function (result) {
                            expect(result).not.toBeDefined();
                            expect(accessRequestItemsService.getAdditionalQuestions).not.toHaveBeenCalled();
                        });
                        $rootScope.$apply();
                    });

                    it('sets assignment id from step result', function () {
                        var newAssignmentId = 'assignmentXXXX';
                        makeController(undefined, ambiguousAssignedRoles, undefined, undefined);
                        ctrl.stepResults[ctrl.getCurrentStep().getStepId()] = newAssignmentId;
                        ctrl.refreshStepHandlers();
                        $rootScope.$apply();
                        expect(ctrl.assignmentId).toEqual(newAssignmentId);
                    });

                    it('calls for additional questions with correct parameters', function () {
                        var newAssignmentId = 'assignmentXXXX',
                            promise,
                            addtQuestionsCall;

                        additionalQuestionsResult = { accountSelections: [] };
                        makeController(undefined, ambiguousAssignedRoles, permittedById, undefined);
                        ctrl.stepResults[ctrl.getCurrentStep().getStepId()] = newAssignmentId;

                        promise = ctrl.refreshStepHandlers();
                        promise.then(function (result) {
                            expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                            addtQuestionsCall = accessRequestItemsService.getAdditionalQuestions.calls.mostRecent();

                            expect(addtQuestionsCall.args[0]).toEqual(accessRequestItem);
                            expect(addtQuestionsCall.args[1]).toEqual(identityIds);
                            expect(addtQuestionsCall.args[2]).toEqual(permittedById);
                            expect(addtQuestionsCall.args[3]).toEqual(newAssignmentId);
                            expect(addtQuestionsCall.args[4]).toEqual(otherRequestedRoles);
                        });
                        $rootScope.$apply();
                    });

                    it('returns promise that resolves to undefined if call to additional questions returns no account selections', function () {
                        var promise;

                        additionalQuestionsResult = { accountSelections: [] };
                        makeController(undefined, ambiguousAssignedRoles, undefined, undefined);

                        promise = ctrl.refreshStepHandlers();
                        promise.then(function (result) {
                            expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                            expect(result).not.toBeDefined();
                        });
                        $rootScope.$apply();
                    });

                    it('returns promise that resolves to new array of steps if returning new account selections', function () {
                        var promise;
                        additionalQuestionsResult = { accountSelections: accountSelections };
                        makeController(undefined, ambiguousAssignedRoles, undefined, undefined);
                        promise = ctrl.refreshStepHandlers();
                        promise.then(function (result) {
                            expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                            expect(result).toBeDefined();
                            expect(result.length).toEqual(5);
                            expect(result[0] instanceof RoleAssignmentSelectionStepHandler).toBeTruthy();
                            expect(result[1].provisioningTarget).toEqual(accountSelections[0].getProvisioningTargets()[0]);
                            expect(result[2].provisioningTarget).toEqual(accountSelections[0].getProvisioningTargets()[1]);
                            expect(result[3].provisioningTarget).toEqual(accountSelections[1].getProvisioningTargets()[0]);
                            expect(result[4].provisioningTarget).toEqual(accountSelections[1].getProvisioningTargets()[1]);
                        });

                        $rootScope.$apply();
                    });

                    it('replaces account selections steps if previous account selection steps are defined', function () {
                        var promise;
                        additionalQuestionsResult = { accountSelections: [] };
                        makeController(accountSelections, ambiguousAssignedRoles, undefined, undefined);
                        expect(ctrl.steps.length).toEqual(5);
                        promise = ctrl.refreshStepHandlers();
                        promise.then(function (result) {
                            expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                            expect(result).toBeDefined();
                            expect(result.length).toEqual(1);
                            expect(result[0] instanceof RoleAssignmentSelectionStepHandler).toBeTruthy();
                        });
                    });
                });

                describe('isRoleAssignmentSelection()', function () {
                    it('returns true if on role assignment selection step', function () {
                        makeController(undefined, ambiguousAssignedRoles, permittedById, undefined);
                        expect(ctrl.getCurrentStep() instanceof RoleAssignmentSelectionStepHandler).toBeTruthy();
                        expect(ctrl.isRoleAssignmentSelection()).toBeTruthy();
                    });

                    it('returns false if on account selection step', function () {
                        makeController(accountSelections, undefined, undefined, undefined);
                        expect(ctrl.getCurrentStep() instanceof RoleAssignmentSelectionStepHandler).toBeFalsy();
                        expect(ctrl.isRoleAssignmentSelection()).toBeFalsy();
                    });
                });

                describe('isAccountSelection()', function () {
                    it('returns false if on role assignment selection step', function () {
                        makeController(accountSelections, ambiguousAssignedRoles, permittedById, undefined);
                        expect(ctrl.getCurrentStep() instanceof RoleAssignmentSelectionStepHandler).toBeTruthy();
                        expect(ctrl.isAccountSelection()).toBeFalsy();
                    });

                    it('returns true if on account selection step', function () {
                        makeController(accountSelections, undefined, undefined, undefined);
                        expect(ctrl.getCurrentStep() instanceof RoleAssignmentSelectionStepHandler).toBeFalsy();
                        expect(ctrl.isAccountSelection()).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWRkaXRpb25hbFF1ZXN0aW9uc0RpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHNCQUFzQiw0QkFBNEIsVUFBVSxTQUFTO0lBQXRKOztJQUdJLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxpQ0FBaUMsWUFBVzs7Z0JBRWpELElBQUksZ0JBQWdCO29CQUFRLGVBQWU7b0JBQ3ZDLG9CQUFvQjtvQkFDaEIsVUFBVSxRQUFROztvQkFFdEI7b0JBQU07b0JBQWE7b0JBQW1CO29CQUFtQjtvQkFDekQ7b0JBQW9DO29CQUEyQjtvQkFBMEI7b0JBQ3pGOztnQkFFSixXQUFXLE9BQU8sWUFBWTs7O2dCQUc5QixXQUFXLE9BQU8sVUFBUywwQkFBMEIsbUJBQW1CLGNBQWMsZUFDM0Qsc0NBQXNDLDZCQUN0Qyw0QkFBNEIsZUFBZSxjQUMzQyx1QkFBdUI7b0JBQzlDLGNBQWM7b0JBQ2QscUNBQXFDO29CQUNyQyw0QkFBNEI7b0JBQzVCLDJCQUEyQjtvQkFDM0IsY0FBYztvQkFDZCxhQUFhOztvQkFFYixvQkFBb0IsQ0FDaEIsSUFBSSx5QkFBeUIsc0JBQXNCLDJCQUNuRCxJQUFJLHlCQUF5QixzQkFBc0I7O29CQUd2RCx5QkFBeUIsQ0FDckIsSUFBSSxhQUFhLHNCQUFzQiwyQkFDdkMsSUFBSSxhQUFhLHNCQUFzQjs7b0JBRzNDLG9CQUFvQixJQUFJLGtCQUFrQixzQkFBc0I7OztnQkFHcEUsU0FBUyxlQUFlLG1CQUFtQix3QkFBd0IsZUFBZSxjQUFjO29CQUM1RixPQUFPLFlBQVksaUNBQWlDO3dC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QUFtQjt3QkFDaEQsZUFBZSxtQkFBbUIsd0JBQXdCLFdBQVc7d0JBQ3JFLE9BQU8sS0FBSyxNQUFNLFFBQVEsUUFBUTt3QkFDbEMsVUFBVSxLQUFLO3dCQUNmLFFBQVEsS0FBSyxVQUFTLFFBQVE7NEJBQzFCLE9BQU8sMEJBQTBCLHdCQUF3Qjs0QkFDekQsT0FBTyxRQUFROzRCQUNmLE9BQU8sT0FBTyxRQUFRLFFBQVE7NEJBQzlCLE9BQU8sT0FBTyxjQUFjLG9DQUFvQzs7Ozs7Z0JBSzVFLFNBQVMsK0JBQStCLFlBQVc7b0JBQy9DLEdBQUkscURBQXFELFlBQVc7d0JBQ2hFLGVBQWUsV0FBVyx3QkFBd0IsZUFBZTt3QkFDakUsT0FBTyxLQUFLLDRCQUE0QixvQ0FBb0M7d0JBQzVFLE9BQU8sS0FBSyw2QkFBNkI7OztvQkFHN0MsR0FBSSw4Q0FBOEMsWUFBVzt3QkFDekQsZUFBZSxtQkFBbUIsV0FBVyxXQUFXO3dCQUN4RCxPQUFPLEtBQUssNEJBQTRCLG9DQUFvQzt3QkFDNUUsT0FBTyxLQUFLLDZCQUE2Qjs7OztnQkFJakQsU0FBUyx3QkFBd0IsWUFBVztvQkFDeEMsR0FBSSxzREFBc0QsWUFBVzt3QkFDakUsZUFBZSxtQkFBbUIsd0JBQXdCLGVBQWU7d0JBQ3pFLE9BQU8sS0FBSyw0QkFBNEIsb0NBQW9DO3dCQUM1RSxPQUFPLEtBQUssc0JBQXNCOzs7b0JBR3RDLEdBQUksNkNBQTZDLFlBQVc7d0JBQ3hELGVBQWUsbUJBQW1CLFdBQVcsV0FBVzt3QkFDeEQsT0FBTyxLQUFLLDRCQUE0QixvQ0FBb0M7d0JBQzVFLE9BQU8sS0FBSyxzQkFBc0I7Ozs7OztHQU8zQyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FkZGl0aW9uYWxRdWVzdGlvbnNEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnQWRkaXRpb25hbFF1ZXN0aW9uc0RpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgcGVybWl0dGVkQnlJZCA9ICcxMjM0JywgYXNzaWdubWVudElkID0gJ2FiY2QnLFxyXG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xyXG4gICAgICAgICAgICBzZXRUaXRsZTogYW5ndWxhci5ub29wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdHJsLCAkY29udHJvbGxlciwgYWNjZXNzUmVxdWVzdEl0ZW0sIGFjY291bnRTZWxlY3Rpb25zLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLFxyXG4gICAgICAgIFJvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXIsIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgdGVzdFNlcnZpY2UsXHJcbiAgICAgICAgJHJvb3RTY29wZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBhY2Nlc3NSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiwgQWNjZXNzUmVxdWVzdEl0ZW0sIEFzc2lnbmVkUm9sZSwgXyRjb250cm9sbGVyXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9Sb2xlQXNzaWdubWVudFNlbGVjdGlvblN0ZXBIYW5kbGVyXywgX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FjY2Vzc1JlcXVlc3REYXRhU2VydmljZV8sIF90ZXN0U2VydmljZV8sIF8kcm9vdFNjb3BlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICBSb2xlQXNzaWdubWVudFNlbGVjdGlvblN0ZXBIYW5kbGVyID0gX1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXJfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV87XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3REYXRhU2VydmljZV87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcblxyXG4gICAgICAgIGFjY291bnRTZWxlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjEpLFxyXG4gICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjIpXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgYW1iaWd1b3VzQXNzaWduZWRSb2xlcyA9IFtcclxuICAgICAgICAgICAgbmV3IEFzc2lnbmVkUm9sZShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQU1CSUdVT1VTX0FTU0lHTkVEX1JPTEUxKSxcclxuICAgICAgICAgICAgbmV3IEFzc2lnbmVkUm9sZShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQU1CSUdVT1VTX0FTU0lHTkVEX1JPTEUyKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5ST0xFKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlQ29udHJvbGxlcihhY2NvdW50U2VsZWN0aW9ucywgYW1iaWd1b3VzQXNzaWduZWRSb2xlcywgcGVybWl0dGVkQnlJZCwgYXNzaWdubWVudElkKSB7XHJcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBZGRpdGlvbmFsUXVlc3Rpb25zRGlhbG9nQ3RybCcsIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW06IGFjY2Vzc1JlcXVlc3RJdGVtLFxyXG4gICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogYWNjb3VudFNlbGVjdGlvbnMsXHJcbiAgICAgICAgICAgIGFtYmlndW91c0Fzc2lnbmVkUm9sZXM6IGFtYmlndW91c0Fzc2lnbmVkUm9sZXMsXHJcbiAgICAgICAgICAgIHBlcm1pdHRlZEJ5SWQ6IHBlcm1pdHRlZEJ5SWQsXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnRJZDogYXNzaWdubWVudElkLFxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgdGhlIHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFrZUNvbnRyb2xsZXIoYWNjb3VudFNlbGVjdGlvbnMsIGFtYmlndW91c0Fzc2lnbmVkUm9sZXMsIHBlcm1pdHRlZEJ5SWQsIGFzc2lnbm1lbnRJZCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hY2Nlc3NSZXF1ZXN0SXRlbSkudG9FcXVhbChhY2Nlc3NSZXF1ZXN0SXRlbSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnBlcm1pdHRlZEJ5SWQpLnRvRXF1YWwocGVybWl0dGVkQnlJZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFjY291bnRTZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbChhY2NvdW50U2VsZWN0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbWJpZ3VvdXNBc3NpZ25lZFJvbGVzKS50b0VxdWFsKGFtYmlndW91c0Fzc2lnbmVkUm9sZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hc3NpZ25tZW50SWQpLnRvRXF1YWwoYXNzaWdubWVudElkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Nsb25lcyB0aGUgYWNjb3VudCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuYWNjb3VudFNlbGVjdGlvbnNbMF0uZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpWzBdLnNldENyZWF0ZUFjY291bnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2NvdW50U2VsZWN0aW9uc1swXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMF0uaGFzU2VsZWN0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY3JlYXRlcyBhIFN0ZXBIYW5kbGVyIGZvciByb2xlcyBhbmQgYWNjb3VudCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKGFjY291bnRTZWxlY3Rpb25zLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCBwZXJtaXR0ZWRCeUlkLCBhc3NpZ25tZW50SWQpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcHMubGVuZ3RoKS50b0VxdWFsKDUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwc1swXSBpbnN0YW5jZW9mIFJvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXIpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcHNbMV0ucHJvdmlzaW9uaW5nVGFyZ2V0KS50b0VxdWFsKGFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0ZXBzWzJdLnByb3Zpc2lvbmluZ1RhcmdldCkudG9FcXVhbChhY2NvdW50U2VsZWN0aW9uc1swXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMV0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwc1szXS5wcm92aXNpb25pbmdUYXJnZXQpLnRvRXF1YWwoYWNjb3VudFNlbGVjdGlvbnNbMV0uZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpWzBdKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcHNbNF0ucHJvdmlzaW9uaW5nVGFyZ2V0KS50b0VxdWFsKGFjY291bnRTZWxlY3Rpb25zWzFdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVsxXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZm9ybWF0U3RlcFJlc3VsdHMoKSByZXR1cm5zIHRoZSBhY2NvdW50U2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1ha2VDb250cm9sbGVyKGFjY291bnRTZWxlY3Rpb25zLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCBwZXJtaXR0ZWRCeUlkLCBhc3NpZ25tZW50SWQpO1xyXG4gICAgICAgIHZhciByZXN1bHRzID0gY3RybC5mb3JtYXRTdGVwUmVzdWx0cygpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHRzLmFjY291bnRTZWxlY3Rpb25zKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHRzLmFjY291bnRTZWxlY3Rpb25zKS50b0VxdWFsKGN0cmwuYWNjb3VudFNlbGVjdGlvbnMpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHRzLmFzc2lnbm1lbnRJZCkudG9FcXVhbChjdHJsLmFzc2lnbm1lbnRJZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncmVmcmVzaFN0ZXBIYW5kbGVycygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxRdWVzdGlvbnNSZXN1bHQgPSB7fSxcclxuICAgICAgICAgICAgaWRlbnRpdHlJZHMgPSBbJzEyMzQnLCc1Njc4J10sXHJcbiAgICAgICAgICAgIG90aGVyUmVxdWVzdGVkUm9sZXMgPSBbeyBtb2NrdGhpczogJ3JvbGUnfV07XHJcblxyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBhZGRpdGlvbmFsUXVlc3Rpb25zUmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdHlJZHMnKS5hbmQucmV0dXJuVmFsdWUoaWRlbnRpdHlJZHMpO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0T3RoZXJSZXF1ZXN0ZWRSb2xlcycpLlxyXG4gICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKG90aGVyUmVxdWVzdGVkUm9sZXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ3JldHVybiBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdW5kZWZpbmVkIGlmIHN0ZXAgaXMgbm90IHJvbGUgYXNzaWdubWVudCBzZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHByb21pc2U7XHJcblxyXG4gICAgICAgICAgICBtYWtlQ29udHJvbGxlcihhY2NvdW50U2VsZWN0aW9ucywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBjdHJsLnJlZnJlc2hTdGVwSGFuZGxlcnMoKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdzZXRzIGFzc2lnbm1lbnQgaWQgZnJvbSBzdGVwIHJlc3VsdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3QXNzaWdubWVudElkID0gJ2Fzc2lnbm1lbnRYWFhYJztcclxuICAgICAgICAgICAgbWFrZUNvbnRyb2xsZXIodW5kZWZpbmVkLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGN0cmwuc3RlcFJlc3VsdHNbY3RybC5nZXRDdXJyZW50U3RlcCgpLmdldFN0ZXBJZCgpXSA9IG5ld0Fzc2lnbm1lbnRJZDtcclxuICAgICAgICAgICAgY3RybC5yZWZyZXNoU3RlcEhhbmRsZXJzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFzc2lnbm1lbnRJZCkudG9FcXVhbChuZXdBc3NpZ25tZW50SWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ2NhbGxzIGZvciBhZGRpdGlvbmFsIHF1ZXN0aW9ucyB3aXRoIGNvcnJlY3QgcGFyYW1ldGVycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3QXNzaWdubWVudElkID0gJ2Fzc2lnbm1lbnRYWFhYJyxcclxuICAgICAgICAgICAgICAgIHByb21pc2UsIGFkZHRRdWVzdGlvbnNDYWxsO1xyXG5cclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc1Jlc3VsdCA9IHsgYWNjb3VudFNlbGVjdGlvbnM6IFtdIH07XHJcbiAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKHVuZGVmaW5lZCwgYW1iaWd1b3VzQXNzaWduZWRSb2xlcywgcGVybWl0dGVkQnlJZCwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgY3RybC5zdGVwUmVzdWx0c1tjdHJsLmdldEN1cnJlbnRTdGVwKCkuZ2V0U3RlcElkKCldID0gbmV3QXNzaWdubWVudElkO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZSA9IGN0cmwucmVmcmVzaFN0ZXBIYW5kbGVycygpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICBhZGR0UXVlc3Rpb25zQ2FsbCA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucy5jYWxscy5tb3N0UmVjZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZHRRdWVzdGlvbnNDYWxsLmFyZ3NbMF0pLnRvRXF1YWwoYWNjZXNzUmVxdWVzdEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZHRRdWVzdGlvbnNDYWxsLmFyZ3NbMV0pLnRvRXF1YWwoaWRlbnRpdHlJZHMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZHRRdWVzdGlvbnNDYWxsLmFyZ3NbMl0pLnRvRXF1YWwocGVybWl0dGVkQnlJZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWRkdFF1ZXN0aW9uc0NhbGwuYXJnc1szXSkudG9FcXVhbChuZXdBc3NpZ25tZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkZHRRdWVzdGlvbnNDYWxsLmFyZ3NbNF0pLnRvRXF1YWwob3RoZXJSZXF1ZXN0ZWRSb2xlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ3JldHVybnMgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHVuZGVmaW5lZCBpZiBjYWxsIHRvIGFkZGl0aW9uYWwgcXVlc3Rpb25zIHJldHVybnMgbm8gYWNjb3VudCBzZWxlY3Rpb25zJyxcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zUmVzdWx0ID0geyBhY2NvdW50U2VsZWN0aW9uczogW10gfTtcclxuICAgICAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKHVuZGVmaW5lZCwgYW1iaWd1b3VzQXNzaWduZWRSb2xlcywgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBjdHJsLnJlZnJlc2hTdGVwSGFuZGxlcnMoKTtcclxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpdCAoJ3JldHVybnMgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIG5ldyBhcnJheSBvZiBzdGVwcyBpZiByZXR1cm5pbmcgbmV3IGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZTtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc1Jlc3VsdCA9IHsgYWNjb3VudFNlbGVjdGlvbnM6IGFjY291bnRTZWxlY3Rpb25zIH07XHJcbiAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKHVuZGVmaW5lZCwgYW1iaWd1b3VzQXNzaWduZWRSb2xlcywgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gY3RybC5yZWZyZXNoU3RlcEhhbmRsZXJzKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCg1KTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHRbMF0gaW5zdGFuY2VvZiBSb2xlQXNzaWdubWVudFNlbGVjdGlvblN0ZXBIYW5kbGVyKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0WzFdLnByb3Zpc2lvbmluZ1RhcmdldCkudG9FcXVhbChhY2NvdW50U2VsZWN0aW9uc1swXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMF0pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdFsyXS5wcm92aXNpb25pbmdUYXJnZXQpLnRvRXF1YWwoYWNjb3VudFNlbGVjdGlvbnNbMF0uZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpWzFdKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHRbM10ucHJvdmlzaW9uaW5nVGFyZ2V0KS50b0VxdWFsKGFjY291bnRTZWxlY3Rpb25zWzFdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0WzRdLnByb3Zpc2lvbmluZ1RhcmdldCkudG9FcXVhbChhY2NvdW50U2VsZWN0aW9uc1sxXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmVwbGFjZXMgYWNjb3VudCBzZWxlY3Rpb25zIHN0ZXBzIGlmIHByZXZpb3VzIGFjY291bnQgc2VsZWN0aW9uIHN0ZXBzIGFyZSBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlO1xyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zUmVzdWx0ID0ge2FjY291bnRTZWxlY3Rpb25zOiBbXX07XHJcbiAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKGFjY291bnRTZWxlY3Rpb25zLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0ZXBzLmxlbmd0aCkudG9FcXVhbCg1KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGN0cmwucmVmcmVzaFN0ZXBIYW5kbGVycygpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0WzBdIGluc3RhbmNlb2YgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcikudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgdHJ1ZSBpZiBvbiByb2xlIGFzc2lnbm1lbnQgc2VsZWN0aW9uIHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFrZUNvbnRyb2xsZXIodW5kZWZpbmVkLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCBwZXJtaXR0ZWRCeUlkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50U3RlcCgpIGluc3RhbmNlb2YgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcikudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIG9uIGFjY291bnQgc2VsZWN0aW9uIHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFrZUNvbnRyb2xsZXIoYWNjb3VudFNlbGVjdGlvbnMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50U3RlcCgpIGluc3RhbmNlb2YgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcikudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb24oKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNBY2NvdW50U2VsZWN0aW9uKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgZmFsc2UgaWYgb24gcm9sZSBhc3NpZ25tZW50IHNlbGVjdGlvbiBzdGVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1ha2VDb250cm9sbGVyKGFjY291bnRTZWxlY3Rpb25zLCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzLCBwZXJtaXR0ZWRCeUlkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50U3RlcCgpIGluc3RhbmNlb2YgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcikudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0FjY291bnRTZWxlY3Rpb24oKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGlmIG9uIGFjY291bnQgc2VsZWN0aW9uIHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFrZUNvbnRyb2xsZXIoYWNjb3VudFNlbGVjdGlvbnMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50U3RlcCgpIGluc3RhbmNlb2YgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcikudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQWNjb3VudFNlbGVjdGlvbigpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
