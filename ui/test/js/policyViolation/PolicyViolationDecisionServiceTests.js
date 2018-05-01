System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', 'test/js/policyViolation/PolicyTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_testJsPolicyViolationPolicyTestData) {}],
        execute: function () {

            describe('policyViolationDecisionService', function () {
                var PolicyViolation = undefined,
                    PolicyViolationDecision = undefined,
                    policyViolationDataService = undefined,
                    policyViolationDialogService = undefined,
                    delegationDialogService = undefined,
                    policyViolationDecisionService = undefined,
                    PolicyViolationAction = undefined,
                    $q = undefined,
                    $scope = undefined,
                    policyViolation = undefined,
                    dialogDecision = undefined,
                    showFunc = undefined,
                    spModal = undefined,
                    policyTestData = undefined;

                beforeEach(module(policyViolationModule));

                /* jshint maxparams: 11 */
                beforeEach(inject(function (_PolicyViolation_, _PolicyViolationDecision_, _policyViolationDataService_, _delegationDialogService_, _policyViolationDialogService_, _policyViolationDecisionService_, _policyTestData_, _$q_, $rootScope, _PolicyViolationAction_, _spModal_) {

                    PolicyViolation = _PolicyViolation_;
                    PolicyViolationDecision = _PolicyViolationDecision_;
                    policyViolationDataService = _policyViolationDataService_;
                    policyViolationDialogService = _policyViolationDialogService_;
                    delegationDialogService = _delegationDialogService_;
                    policyViolationDecisionService = _policyViolationDecisionService_;
                    PolicyViolationAction = _PolicyViolationAction_;
                    $q = _$q_;
                    policyTestData = _policyTestData_;
                    $scope = $rootScope.$new();

                    policyViolationDataService.decisions.clearDecisions();
                    policyViolation = new PolicyViolation(policyTestData.POLICY_VIOLATION_DATA_1);

                    dialogDecision = undefined;

                    spModal = _spModal_;
                    showFunc = jasmine.createSpy('showFunc').and.callFake(function () {
                        // If there is a decision, resolve with it.
                        if (dialogDecision) {
                            return $q.when(dialogDecision);
                        }

                        // Otherwise, simulate cancelling the dialog by rejecting.
                        return $q.reject();
                    });
                }));

                describe('setDecision', function () {
                    var showDialog = undefined;

                    beforeEach(function () {
                        // Don't show a dialog for most tests - default to cancelling the dialog.
                        showDialog = false;

                        spyOn(policyViolationDecisionService, 'getDialog').and.callFake(function () {
                            // If not showing a dialog, just resolve with undefined.
                            if (!showDialog) {
                                return $q.when(undefined);
                            }

                            // We're showing a dialog, so resolve with a "show function".
                            return $q.when(showFunc);
                        });
                    });

                    it('throws with no policyViolation', function () {
                        expect(function () {
                            return policyViolationDecisionService.setDecision(undefined, 'Mitigated');
                        }).toThrow();
                    });

                    it('throws with no status', function () {
                        expect(function () {
                            return policyViolationDecisionService.setDecision(policyViolation, undefined);
                        }).toThrow();
                    });

                    it('sets the decision in the store', function () {
                        var status = 'Mitigated',
                            decision = undefined;
                        policyViolationDecisionService.setDecision(policyViolation, status);
                        $scope.$apply();
                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(decision).toBeDefined();
                        expect(decision.getItem()).toBe(policyViolation);
                        expect(decision.status).toEqual(status);
                    });

                    it('removes an existing decision with same status', function () {
                        var status = 'Mitigated',
                            decision = undefined;
                        policyViolationDecisionService.setDecision(policyViolation, status);
                        $scope.$apply();
                        // Second time should remove it.
                        policyViolationDecisionService.setDecision(policyViolation, status);
                        $scope.$apply();

                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(decision).not.toBeDefined();
                    });

                    it('replaces a decision if status is different', function () {
                        var status1 = 'Mitigated',
                            status2 = 'NotMitigated',
                            decision = undefined;
                        policyViolationDecisionService.setDecision(policyViolation, status1);
                        $scope.$apply();
                        // Second time should replace it since status is different.
                        policyViolationDecisionService.setDecision(policyViolation, status2);
                        $scope.$apply();

                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(decision).toBeDefined();
                        expect(decision.status).toEqual(status2);
                    });

                    it('calls the dialog function and uses the resulting decision if required', function () {
                        var status = 'Mitigated',
                            comments = 'whatever',
                            decision = undefined;
                        showDialog = true;
                        dialogDecision = PolicyViolationDecision.createDecision(policyViolation, status);
                        dialogDecision.comments = comments;
                        policyViolationDecisionService.setDecision(policyViolation, status);
                        $scope.$apply();
                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(decision).toBe(dialogDecision);
                    });

                    it('does not add decision if dialog function is canceled', function () {
                        var rejectSpy = jasmine.createSpy('reject'),
                            decision = undefined;
                        showDialog = true;
                        policyViolationDecisionService.setDecision(policyViolation, 'Mitigated')['catch'](rejectSpy);
                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        $scope.$apply();
                        expect(decision).not.toBeDefined();
                        expect(rejectSpy).toHaveBeenCalled();
                    });

                    it('restores existing decision if dialog function is cancelled', function () {
                        var status = 'Mitigated',
                            comments = 'blah blah',
                            rejectSpy = jasmine.createSpy('reject'),
                            decision = undefined,
                            newDecision = undefined;

                        showDialog = true;
                        dialogDecision = PolicyViolationDecision.createDecision(policyViolation, status);
                        dialogDecision.comments = comments;
                        policyViolationDecisionService.setDecision(policyViolation, status);
                        $scope.$apply();
                        decision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(decision).toBe(dialogDecision);
                        dialogDecision = undefined;
                        policyViolationDecisionService.setDecision(policyViolation, 'NotMitigated')['catch'](rejectSpy);
                        $scope.$apply();
                        expect(rejectSpy).toHaveBeenCalled();
                        newDecision = policyViolationDataService.decisions.getEffectiveDecision(policyViolation.getId(), policyViolation.getScope());
                        expect(newDecision).toBe(decision);
                    });
                });

                describe('getDialog()', function () {
                    function setupCheckSpies(spies) {
                        angular.forEach(spies, function (val, key) {
                            spyOn(policyViolationDecisionService, key).and.returnValue($q.when(val));
                        });
                    }
                    it('returns empty resolved promise if no dialog is required', function () {
                        var result = undefined;
                        setupCheckSpies({
                            'checkAllowExceptionDialogRequired': false,
                            'isDelegation': false,
                            'checkRemediationDialogRequired': false
                        });
                        policyViolationDecisionService.getDialog(policyViolation, PolicyViolationAction.Status.Mitigated).then(function (dialogResult) {
                            return result = dialogResult;
                        });
                        $scope.$apply();
                        expect(result).not.toBeDefined();
                    });

                    function testDialog(status, spyKey) {
                        var result = undefined;
                        spyOn(policyViolationDecisionService, spyKey);
                        policyViolationDecisionService.getDialog(policyViolation, status).then(function (dialogResult) {
                            return result = dialogResult;
                        });
                        $scope.$apply();
                        expect(result).toBeDefined();
                        result();
                        expect(policyViolationDecisionService[spyKey]).toHaveBeenCalledWith(policyViolation);
                    }

                    it('returns allow exception dialog function if required', function () {
                        setupCheckSpies({
                            'checkAllowExceptionDialogRequired': true
                        });
                        testDialog(PolicyViolationAction.Status.Mitigated, 'showAllowExceptionDialog');
                    });

                    it('returns delegation dialog function if required', function () {
                        setupCheckSpies({
                            'isDelegation': true
                        });
                        testDialog(PolicyViolationAction.Status.Delegated, 'showDelegationDialog');
                    });

                    it('returns remediation dialog function if required', function () {
                        setupCheckSpies({
                            'checkRemediationDialogRequired': true
                        });
                        testDialog(PolicyViolationAction.Status.Remediated, 'showRemediationDialog');
                    });
                });

                describe('showDelegationDialog', function () {
                    var dialogResult = {
                        recipient: {
                            id: 'recipientIdentityId'
                        },
                        comments: 'delegated this to you!',
                        description: 'delegation description'
                    },
                        existingDecision = {
                        comments: 'some decision comment',
                        description: 'some description',
                        recipientSummary: 'delegationRecipient'
                    };

                    beforeEach(function () {
                        spyOn(delegationDialogService, 'showDelegationDialog').and.returnValue($q.when(dialogResult));
                    });

                    it('calls dialog service with correct configuration', function () {
                        var expectedArgs = {
                            title: 'ui_delegation_title',
                            description: 'certify_violation_desc',
                            helpText: 'ui_delegation_help_text',
                            comments: null,
                            recipient: null
                        };
                        policyViolationDecisionService.showDelegationDialog(policyViolation);
                        expect(delegationDialogService.showDelegationDialog).toHaveBeenCalled();
                        expect(delegationDialogService.showDelegationDialog.calls.mostRecent().args[0]).toEqual(expectedArgs);
                    });

                    it('calls dialog service with existing decision', function () {
                        var expectedArgs = {
                            title: 'ui_delegation_title',
                            description: existingDecision.description,
                            helpText: 'ui_delegation_help_text',
                            comments: existingDecision.comments,
                            recipient: existingDecision.recipientSummary
                        };
                        policyViolationDecisionService.showDelegationDialog(policyViolation, existingDecision);
                        expect(delegationDialogService.showDelegationDialog).toHaveBeenCalled();
                        expect(delegationDialogService.showDelegationDialog.calls.mostRecent().args[0]).toEqual(expectedArgs);
                    });

                    it('returns promise with policy violation decision based on dialog', function () {
                        var result = undefined;
                        policyViolationDecisionService.showDelegationDialog(policyViolation).then(function (callResult) {
                            result = callResult;
                        });
                        $scope.$apply();
                        expect(result instanceof PolicyViolationDecision).toEqual(true);
                        expect(result.recipient).toEqual(dialogResult.recipient.id);
                        expect(result.recipientSummary).toEqual(dialogResult.recipient);
                        expect(result.comments).toEqual(dialogResult.comments);
                        expect(result.description).toEqual(dialogResult.description);
                    });
                });

                describe('showAllowExceptionDialog()', function () {
                    var dialogResult = undefined;
                    beforeEach(function () {
                        dialogResult = {
                            mitigationExpirationDate: new Date(),
                            comments: 'allow this!'
                        };
                        policyViolationDataService.decisionConfig = {
                            allowMitigationExpirationEditing: false,
                            requireMitigationComments: true,
                            defaultMitigationExpirationDate: new Date()
                        };

                        spyOn(policyViolationDialogService, 'showAllowExceptionDialog').and.returnValue($q.when(dialogResult));
                    });

                    it('calls dialog service with correct configuration', function () {
                        var nowDate = new Date(new Date().setHours(0, 0, 0, 0)),
                            expectedArgs = {
                            displayName: policyViolation.displayName,
                            requireComments: policyViolationDataService.decisionConfig.requireMitigationComments,
                            expirationDate: policyViolationDataService.decisionConfig.defaultMitigationExpirationDate,
                            minDate: nowDate,
                            maxDate: null,
                            showExpirationDate: policyViolationDataService.decisionConfig.allowMitigationExpirationEditing,
                            readOnly: false
                        };
                        policyViolationDecisionService.showAllowExceptionDialog(policyViolation);
                        expect(policyViolationDialogService.showAllowExceptionDialog).toHaveBeenCalled();
                        expect(policyViolationDialogService.showAllowExceptionDialog.calls.mostRecent().args[0]).toEqual(expectedArgs);
                    });

                    it('shows dialog with existing decision and readOnly', function () {
                        var nowDate = new Date(new Date().setHours(0, 0, 0, 0)),
                            existingDecision = {
                            comments: 'some decision comment',
                            mitigationExpirationDate: 'some date'
                        },
                            expectedArgs = {
                            comments: existingDecision.comments,
                            displayName: policyViolation.displayName,
                            requireComments: policyViolationDataService.decisionConfig.requireMitigationComments,
                            expirationDate: existingDecision.mitigationExpirationDate,
                            minDate: nowDate,
                            maxDate: null,
                            showExpirationDate: policyViolationDataService.decisionConfig.allowMitigationExpirationEditing,
                            readOnly: true
                        };

                        policyViolationDecisionService.showAllowExceptionDialog(policyViolation, existingDecision,
                        /*readOnly*/true);
                        expect(policyViolationDialogService.showAllowExceptionDialog).toHaveBeenCalled();
                        expect(policyViolationDialogService.showAllowExceptionDialog.calls.mostRecent().args[0]).toEqual(expectedArgs);
                    });

                    it('returns promise with policy violation decision based on dialog', function () {
                        var result = undefined;
                        policyViolationDecisionService.showAllowExceptionDialog(policyViolation).then(function (callResult) {
                            result = callResult;
                        });
                        $scope.$apply();
                        expect(result instanceof PolicyViolationDecision).toEqual(true);
                        expect(result.mitigationExpirationDate).toEqual(dialogResult.mitigationExpirationDate);
                        expect(result.comments).toEqual(dialogResult.comments);
                    });
                });

                describe('checkAllowExceptionDialog()', function () {
                    it('returns a promise that resolves to false if not Mitigated status', function () {
                        var result = undefined;
                        policyViolationDecisionService.checkAllowExceptionDialogRequired(PolicyViolationAction.Status.Remediated).then(function (checkResult) {
                            return result = checkResult;
                        });
                        $scope.$apply();
                        expect(result).toEqual(false);
                    });

                    it('returns a promise that resolves to true if Mitigated status', function () {
                        var result = undefined;
                        policyViolationDecisionService.checkAllowExceptionDialogRequired(PolicyViolationAction.Status.Mitigated).then(function (checkResult) {
                            return result = checkResult;
                        });
                        $scope.$apply();
                        expect(result).toEqual(true);
                    });
                });

                describe('isDelegation()', function () {
                    it('returns a promise that resolves to false if not Delegated status', function () {
                        var result = undefined;
                        policyViolationDecisionService.isDelegation(PolicyViolationAction.Status.Remediated).then(function (checkResult) {
                            return result = checkResult;
                        });
                        $scope.$apply();
                        expect(result).toEqual(false);
                    });

                    it('returns a promise that resolves to true if Delegated status', function () {
                        var result = undefined;
                        policyViolationDecisionService.isDelegation(PolicyViolationAction.Status.Delegated).then(function (checkResult) {
                            return result = checkResult;
                        });
                        $scope.$apply();
                        expect(result).toEqual(true);
                    });
                });

                describe('checkRemediationDialogRequired()', function () {
                    it('returns a promise that resolves to false if not Remediated status', function () {
                        policyViolationDecisionService.checkRemediationDialogRequired(PolicyViolationAction.Status.Mitigated).then(function (checkResult) {
                            return expect(checkResult).toEqual(false);
                        });
                        $scope.$apply();
                    });

                    it('returns a promise that resolves to true if Mitigated status', function () {
                        policyViolationDecisionService.checkRemediationDialogRequired(PolicyViolationAction.Status.Remediated).then(function (checkResult) {
                            return expect(checkResult).toEqual(true);
                        });
                        $scope.$apply();
                    });
                });

                describe('showRemediationDialog', function () {
                    var policyViolationService = undefined,
                        remediationDialogService = undefined,
                        PolicyViolationRemediationDialogContext = undefined,
                        RemediationDialogResult = undefined;

                    beforeEach(inject(function (_policyViolationService_, _remediationDialogService_, _PolicyViolationRemediationDialogContext_, _RemediationDialogResult_) {
                        policyViolationService = _policyViolationService_;
                        remediationDialogService = _remediationDialogService_;
                        PolicyViolationRemediationDialogContext = _PolicyViolationRemediationDialogContext_;
                        RemediationDialogResult = _RemediationDialogResult_;
                    }));

                    function setup(remediationAdviceResult, dialogReject, dialogResult) {
                        spyOn(policyViolationService, 'getRemediationAdvice').and.returnValue($q.when(remediationAdviceResult));
                        spyOn(remediationDialogService, 'showRevocationDialog').and.returnValue(dialogReject ? $q.reject() : $q.resolve(dialogResult));
                    }

                    it('throws with no policy violation', function () {
                        expect(function () {
                            return policyViolationDecisionService.showRemediationDialog();
                        }).toThrow();
                    });

                    it('calls to get the remediation advice result', function () {
                        setup({}, false);
                        policyViolationDecisionService.showRemediationDialog(policyViolation);
                        $scope.$apply();
                        expect(policyViolationService.getRemediationAdvice).toHaveBeenCalledWith(policyViolation.id);
                    });

                    it('calls the remediation dialog service to show the dialog', function () {
                        var readOnly = true,
                            status = 'Mitigated',
                            existingDecision = PolicyViolationDecision.createDecision(policyViolation, status),
                            remediationAdviceResult = {
                            advice: {},
                            summary: {}
                        };

                        setup(remediationAdviceResult, false);

                        policyViolationDecisionService.showRemediationDialog(policyViolation, existingDecision, readOnly)['catch'](function () {});
                        $scope.$apply();
                        expect(remediationDialogService.showRevocationDialog).toHaveBeenCalled();
                        var args = remediationDialogService.showRevocationDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        expect(args[0]).toBe(remediationAdviceResult.advice);
                        expect(args[1]).toBe(remediationAdviceResult.summary);
                        expect(args[2]).toEqual(new PolicyViolationRemediationDialogContext({
                            existingResult: new RemediationDialogResult(existingDecision),
                            readOnly: readOnly
                        }, policyViolation));
                    });

                    it('applies the dialog result to the returned decision', function () {
                        var decision = undefined,
                            remediationResult = new RemediationDialogResult({
                            recipientSummary: {
                                id: 'abcd'
                            },
                            comments: 'i said something',
                            revokedRoles: ['rol1', 'role2'],
                            selectedViolationEntitlements: [{
                                some: 'thing'
                            }],
                            remediationDetails: [{ newValue: 'yaddayadda' }]
                        });
                        setup({}, false, remediationResult);
                        policyViolationDecisionService.showRemediationDialog(policyViolation).then(function (result) {
                            decision = result;
                        });
                        $scope.$apply();
                        expect(decision.recipient).toEqual(remediationResult.recipientSummary.id);
                        expect(decision.recipientSummary).toEqual(remediationResult.recipientSummary);
                        expect(decision.comments).toEqual(remediationResult.comments);
                        expect(decision.revokedRoles).toEqual(remediationResult.revokedRoles);
                        expect(decision.selectedViolationEntitlements).toEqual(remediationResult.selectedViolationEntitlements);
                        expect(decision.remediationDetails).toEqual(remediationResult.remediationDetails);
                    });

                    it('rejects with reason if no result from remediationDialogService and existingDecision is passed', function () {
                        var existingDecision = PolicyViolationDecision.createDecision(policyViolation, 'Remediated'),
                            decision = undefined,
                            reason = undefined;

                        setup({}, false, undefined);
                        policyViolationDecisionService.showRemediationDialog(policyViolation, existingDecision).then(function (result) {
                            return decision = result;
                        })['catch'](function (result) {
                            return reason = result;
                        });
                        $scope.$apply();
                        expect(decision).not.toBeDefined();
                        expect(reason).toBeDefined();
                    });
                });

                describe('getDelegationRevokeConfirmationIfRequired()', function () {

                    beforeEach(function () {
                        spyOn(spModal, 'confirm');
                    });

                    it('should call spModal.confirm() for action Mitigated if existing decision is Delegated', function () {
                        var delegatedPolicyViolation = new PolicyViolation(policyTestData.POLICY_VIOLATION_DATA_4);
                        policyViolationDecisionService.getDelegationRevokeConfirmationIfRequired(delegatedPolicyViolation, PolicyViolationAction.Status.Mitigated);
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should not call spModal.confirm() for action Mitigated if no existing Delegated decision', function () {
                        policyViolationDecisionService.getDelegationRevokeConfirmationIfRequired(policyViolation, PolicyViolationAction.Status.Mitigated);
                        $scope.$apply();
                        expect(spModal.confirm).not.toHaveBeenCalled();
                    });
                });

                describe('editDecision', function () {
                    var spNotificationService = undefined;

                    beforeEach(inject(function (_spNotificationService_) {
                        spNotificationService = _spNotificationService_;
                        spyOn(spNotificationService, 'addMessage');
                        spyOn(spNotificationService, 'triggerDirective');
                    }));

                    it('shows warning notification if dialog function rejects with a reason', function () {
                        var dialogDeferred = $q.defer(),
                            dialogFunc = function () {
                            return dialogDeferred.promise;
                        },
                            reason = 'some reason';

                        spyOn(policyViolationDecisionService, 'getDialog').and.returnValue($q.when(dialogFunc));
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({});

                        policyViolationDecisionService.editDecision(policyViolation)['catch'](function () {});

                        $scope.$apply();
                        dialogDeferred.reject(reason);
                        $scope.$apply();

                        expect(spNotificationService.addMessage).toHaveBeenCalled();
                        var args = spNotificationService.addMessage.calls.mostRecent().args;
                        expect(args.length).toEqual(1);
                        expect(args[0].messageOrKey).toEqual(reason);
                        expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLDJDQUEyQyxVQUFVLFNBQVM7OztJQUcvSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSxzQ0FBc0M7UUFDbkQsU0FBUyxZQUFZOztZQUg3QixTQUFTLGtDQUFrQyxZQUFNO2dCQUM3QyxJQUFJLGtCQUFlO29CQUFFLDBCQUF1QjtvQkFBRSw2QkFBMEI7b0JBQUUsK0JBQTRCO29CQUNsRywwQkFBdUI7b0JBQUUsaUNBQThCO29CQUFFLHdCQUFxQjtvQkFBRSxLQUFFO29CQUFFLFNBQU07b0JBQUUsa0JBQWU7b0JBQzNHLGlCQUFjO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFBRSxpQkFBYzs7Z0JBRXJELFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxtQkFBbUIsMkJBQTJCLDhCQUM5QywyQkFBMkIsZ0NBQWdDLGtDQUMzRCxrQkFBa0IsTUFBTSxZQUFZLHlCQUF5QixXQUFjOztvQkFFMUYsa0JBQWtCO29CQUNsQiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtvQkFDN0IsK0JBQStCO29CQUMvQiwwQkFBMEI7b0JBQzFCLGlDQUFpQztvQkFDakMsd0JBQXdCO29CQUN4QixLQUFNO29CQUNOLGlCQUFpQjtvQkFDakIsU0FBUyxXQUFXOztvQkFFcEIsMkJBQTJCLFVBQVU7b0JBQ3JDLGtCQUFrQixJQUFJLGdCQUFnQixlQUFlOztvQkFFckQsaUJBQWlCOztvQkFFakIsVUFBVTtvQkFDVixXQUFXLFFBQVEsVUFBVSxZQUFZLElBQUksU0FBUyxZQUFNOzt3QkFFeEQsSUFBSSxnQkFBZ0I7NEJBQ2hCLE9BQU8sR0FBRyxLQUFL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LE9BQU8sS0FBSyxHQUFHLGNBQWMsUUFBUTt3QkFDckMsT0FBTyxzQkFBc0Isa0JBQWtCOzs7Ozs7R0F1QnhEIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9wb2xpY3lWaW9sYXRpb24vUG9saWN5VGVzdERhdGEnO1xuXG5kZXNjcmliZSgncG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBQb2xpY3lWaW9sYXRpb24sIFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLCBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSwgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSxcbiAgICAgICAgZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2UsIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgUG9saWN5VmlvbGF0aW9uQWN0aW9uLCAkcSwgJHNjb3BlLCBwb2xpY3lWaW9sYXRpb24sXG4gICAgICAgIGRpYWxvZ0RlY2lzaW9uLCBzaG93RnVuYywgc3BNb2RhbCwgcG9saWN5VGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDExICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Qb2xpY3lWaW9sYXRpb25fLCBfUG9saWN5VmlvbGF0aW9uRGVjaXNpb25fLCBfcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICBfZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2VfLCBfcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZV8sIF9wb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICBfcG9saWN5VGVzdERhdGFfLCBfJHFfLCAkcm9vdFNjb3BlLCBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXywgX3NwTW9kYWxfKSA9PiB7XG5cbiAgICAgICAgUG9saWN5VmlvbGF0aW9uID0gX1BvbGljeVZpb2xhdGlvbl87XG4gICAgICAgIFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uID0gX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uXztcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UgPSBfcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2VfO1xuICAgICAgICBkZWxlZ2F0aW9uRGlhbG9nU2VydmljZSA9IF9kZWxlZ2F0aW9uRGlhbG9nU2VydmljZV87XG4gICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2VfO1xuICAgICAgICBQb2xpY3lWaW9sYXRpb25BY3Rpb24gPSBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXztcbiAgICAgICAgJHEgPSAgXyRxXztcbiAgICAgICAgcG9saWN5VGVzdERhdGEgPSBfcG9saWN5VGVzdERhdGFfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcblxuICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuY2xlYXJEZWNpc2lvbnMoKTtcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uID0gbmV3IFBvbGljeVZpb2xhdGlvbihwb2xpY3lUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX0RBVEFfMSk7XG5cbiAgICAgICAgZGlhbG9nRGVjaXNpb24gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgc2hvd0Z1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnc2hvd0Z1bmMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBkZWNpc2lvbiwgcmVzb2x2ZSB3aXRoIGl0LlxuICAgICAgICAgICAgaWYgKGRpYWxvZ0RlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oZGlhbG9nRGVjaXNpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIHNpbXVsYXRlIGNhbmNlbGxpbmcgdGhlIGRpYWxvZyBieSByZWplY3RpbmcuXG4gICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdzZXREZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgbGV0IHNob3dEaWFsb2c7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBEb24ndCBzaG93IGEgZGlhbG9nIGZvciBtb3N0IHRlc3RzIC0gZGVmYXVsdCB0byBjYW5jZWxsaW5nIHRoZSBkaWFsb2cuXG4gICAgICAgICAgICBzaG93RGlhbG9nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgJ2dldERpYWxvZycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm90IHNob3dpbmcgYSBkaWFsb2csIGp1c3QgcmVzb2x2ZSB3aXRoIHVuZGVmaW5lZC5cbiAgICAgICAgICAgICAgICBpZiAoIXNob3dEaWFsb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4odW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBXZSdyZSBzaG93aW5nIGEgZGlhbG9nLCBzbyByZXNvbHZlIHdpdGggYSBcInNob3cgZnVuY3Rpb25cIi5cbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihzaG93RnVuYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIHBvbGljeVZpb2xhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2V0RGVjaXNpb24odW5kZWZpbmVkLCAnTWl0aWdhdGVkJykpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2V0RGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLCB1bmRlZmluZWQpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSBkZWNpc2lvbiBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gJ01pdGlnYXRlZCcsXG4gICAgICAgICAgICAgICAgZGVjaXNpb247XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2V0RGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLCBzdGF0dXMpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZGVjaXNpb24gPSBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnNcbiAgICAgICAgICAgICAgICAuZ2V0RWZmZWN0aXZlRGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLmdldElkKCksIHBvbGljeVZpb2xhdGlvbi5nZXRTY29wZSgpKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5nZXRJdGVtKCkpLnRvQmUocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoc3RhdHVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlbW92ZXMgYW4gZXhpc3RpbmcgZGVjaXNpb24gd2l0aCBzYW1lIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSAnTWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zZXREZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1cyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAvLyBTZWNvbmQgdGltZSBzaG91bGQgcmVtb3ZlIGl0LlxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNldERlY2lzaW9uKHBvbGljeVZpb2xhdGlvbiwgc3RhdHVzKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZGVjaXNpb24gPSBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnNcbiAgICAgICAgICAgICAgICAuZ2V0RWZmZWN0aXZlRGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLmdldElkKCksIHBvbGljeVZpb2xhdGlvbi5nZXRTY29wZSgpKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXBsYWNlcyBhIGRlY2lzaW9uIGlmIHN0YXR1cyBpcyBkaWZmZXJlbnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzMSA9ICdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgIHN0YXR1czIgPSAnTm90TWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zZXREZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1czEpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgLy8gU2Vjb25kIHRpbWUgc2hvdWxkIHJlcGxhY2UgaXQgc2luY2Ugc3RhdHVzIGlzIGRpZmZlcmVudC5cbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zZXREZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1czIpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBkZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uc1xuICAgICAgICAgICAgICAgIC5nZXRFZmZlY3RpdmVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24uZ2V0SWQoKSwgcG9saWN5VmlvbGF0aW9uLmdldFNjb3BlKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnN0YXR1cykudG9FcXVhbChzdGF0dXMyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRoZSBkaWFsb2cgZnVuY3Rpb24gYW5kIHVzZXMgdGhlIHJlc3VsdGluZyBkZWNpc2lvbiBpZiByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSAnTWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICBjb21tZW50cyA9ICd3aGF0ZXZlcicsXG4gICAgICAgICAgICAgICAgZGVjaXNpb247XG4gICAgICAgICAgICBzaG93RGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgIGRpYWxvZ0RlY2lzaW9uID0gUG9saWN5VmlvbGF0aW9uRGVjaXNpb24uY3JlYXRlRGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLCBzdGF0dXMpO1xuICAgICAgICAgICAgZGlhbG9nRGVjaXNpb24uY29tbWVudHMgPSBjb21tZW50cztcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zZXREZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1cyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBkZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uc1xuICAgICAgICAgICAgICAgIC5nZXRFZmZlY3RpdmVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24uZ2V0SWQoKSwgcG9saWN5VmlvbGF0aW9uLmdldFNjb3BlKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlKGRpYWxvZ0RlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGFkZCBkZWNpc2lvbiBpZiBkaWFsb2cgZnVuY3Rpb24gaXMgY2FuY2VsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVqZWN0U3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ3JlamVjdCcpLCBkZWNpc2lvbjtcbiAgICAgICAgICAgIHNob3dEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNldERlY2lzaW9uKHBvbGljeVZpb2xhdGlvbiwgJ01pdGlnYXRlZCcpLmNhdGNoKHJlamVjdFNweSk7XG4gICAgICAgICAgICBkZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uc1xuICAgICAgICAgICAgICAgIC5nZXRFZmZlY3RpdmVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24uZ2V0SWQoKSwgcG9saWN5VmlvbGF0aW9uLmdldFNjb3BlKCkpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWplY3RTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Jlc3RvcmVzIGV4aXN0aW5nIGRlY2lzaW9uIGlmIGRpYWxvZyBmdW5jdGlvbiBpcyBjYW5jZWxsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gJ01pdGlnYXRlZCcsXG4gICAgICAgICAgICAgICAgY29tbWVudHMgPSAnYmxhaCBibGFoJyxcbiAgICAgICAgICAgICAgICByZWplY3RTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVqZWN0JyksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24sIG5ld0RlY2lzaW9uO1xuXG4gICAgICAgICAgICBzaG93RGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgIGRpYWxvZ0RlY2lzaW9uID0gUG9saWN5VmlvbGF0aW9uRGVjaXNpb24uY3JlYXRlRGVjaXNpb24ocG9saWN5VmlvbGF0aW9uLCBzdGF0dXMpO1xuICAgICAgICAgICAgZGlhbG9nRGVjaXNpb24uY29tbWVudHMgPSBjb21tZW50cztcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zZXREZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1cyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBkZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uc1xuICAgICAgICAgICAgICAgIC5nZXRFZmZlY3RpdmVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24uZ2V0SWQoKSwgcG9saWN5VmlvbGF0aW9uLmdldFNjb3BlKCkpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlKGRpYWxvZ0RlY2lzaW9uKTtcbiAgICAgICAgICAgIGRpYWxvZ0RlY2lzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNldERlY2lzaW9uKHBvbGljeVZpb2xhdGlvbiwgJ05vdE1pdGlnYXRlZCcpLmNhdGNoKHJlamVjdFNweSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVqZWN0U3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBuZXdEZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uc1xuICAgICAgICAgICAgICAgIC5nZXRFZmZlY3RpdmVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24uZ2V0SWQoKSwgcG9saWN5VmlvbGF0aW9uLmdldFNjb3BlKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG5ld0RlY2lzaW9uKS50b0JlKGRlY2lzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHNldHVwQ2hlY2tTcGllcyhzcGllcykge1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNwaWVzLCAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsIGtleSkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4odmFsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpdCgncmV0dXJucyBlbXB0eSByZXNvbHZlZCBwcm9taXNlIGlmIG5vIGRpYWxvZyBpcyByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBzZXR1cENoZWNrU3BpZXMoe1xuICAgICAgICAgICAgICAgICdjaGVja0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnaXNEZWxlZ2F0aW9uJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ2NoZWNrUmVtZWRpYXRpb25EaWFsb2dSZXF1aXJlZCc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5nZXREaWFsb2cocG9saWN5VmlvbGF0aW9uLCBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZClcbiAgICAgICAgICAgICAgICAudGhlbigoZGlhbG9nUmVzdWx0KSA9PiByZXN1bHQgPSBkaWFsb2dSZXN1bHQpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3REaWFsb2coc3RhdHVzLCBzcHlLZXkpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsIHNweUtleSk7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UuZ2V0RGlhbG9nKHBvbGljeVZpb2xhdGlvbiwgc3RhdHVzKVxuICAgICAgICAgICAgICAgIC50aGVuKChkaWFsb2dSZXN1bHQpID0+IHJlc3VsdCA9IGRpYWxvZ1Jlc3VsdCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgcmVzdWx0KCk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlW3NweUtleV0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHBvbGljeVZpb2xhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgncmV0dXJucyBhbGxvdyBleGNlcHRpb24gZGlhbG9nIGZ1bmN0aW9uIGlmIHJlcXVpcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBDaGVja1NwaWVzKHtcbiAgICAgICAgICAgICAgICAnY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZ1JlcXVpcmVkJzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZXN0RGlhbG9nKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuTWl0aWdhdGVkLCAnc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGRlbGVnYXRpb24gZGlhbG9nIGZ1bmN0aW9uIGlmIHJlcXVpcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBDaGVja1NwaWVzKHtcbiAgICAgICAgICAgICAgICAnaXNEZWxlZ2F0aW9uJzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZXN0RGlhbG9nKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuRGVsZWdhdGVkLCAnc2hvd0RlbGVnYXRpb25EaWFsb2cnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcmVtZWRpYXRpb24gZGlhbG9nIGZ1bmN0aW9uIGlmIHJlcXVpcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBDaGVja1NwaWVzKHtcbiAgICAgICAgICAgICAgICAnY2hlY2tSZW1lZGlhdGlvbkRpYWxvZ1JlcXVpcmVkJzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0ZXN0RGlhbG9nKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZCwgJ3Nob3dSZW1lZGlhdGlvbkRpYWxvZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RGVsZWdhdGlvbkRpYWxvZycsICgpID0+IHtcbiAgICAgICAgbGV0IGRpYWxvZ1Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICByZWNpcGllbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZWNpcGllbnRJZGVudGl0eUlkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdkZWxlZ2F0ZWQgdGhpcyB0byB5b3UhJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2RlbGVnYXRpb24gZGVzY3JpcHRpb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBjb21tZW50czogJ3NvbWUgZGVjaXNpb24gY29tbWVudCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdzb21lIGRlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZWNpcGllbnRTdW1tYXJ5OiAnZGVsZWdhdGlvblJlY2lwaWVudCdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihkZWxlZ2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dEZWxlZ2F0aW9uRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZGlhbG9nUmVzdWx0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBkaWFsb2cgc2VydmljZSB3aXRoIGNvcnJlY3QgY29uZmlndXJhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBleHBlY3RlZEFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAndWlfZGVsZWdhdGlvbl90aXRsZScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnY2VydGlmeV92aW9sYXRpb25fZGVzYycsXG4gICAgICAgICAgICAgICAgICAgIGhlbHBUZXh0OiAndWlfZGVsZWdhdGlvbl9oZWxwX3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50OiBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zaG93RGVsZWdhdGlvbkRpYWxvZyhwb2xpY3lWaW9sYXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZWxlZ2F0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoZXhwZWN0ZWRBcmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIGRpYWxvZyBzZXJ2aWNlIHdpdGggZXhpc3RpbmcgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRBcmdzID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAndWlfZGVsZWdhdGlvbl90aXRsZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGV4aXN0aW5nRGVjaXNpb24uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgaGVscFRleHQ6ICd1aV9kZWxlZ2F0aW9uX2hlbHBfdGV4dCcsXG4gICAgICAgICAgICAgICAgY29tbWVudHM6IGV4aXN0aW5nRGVjaXNpb24uY29tbWVudHMsXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50OiBleGlzdGluZ0RlY2lzaW9uLnJlY2lwaWVudFN1bW1hcnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cocG9saWN5VmlvbGF0aW9uLCBleGlzdGluZ0RlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWxlZ2F0aW9uRGlhbG9nU2VydmljZS5zaG93RGVsZWdhdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZWxlZ2F0aW9uRGlhbG9nLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKGV4cGVjdGVkQXJncyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHByb21pc2Ugd2l0aCBwb2xpY3kgdmlvbGF0aW9uIGRlY2lzaW9uIGJhc2VkIG9uIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cocG9saWN5VmlvbGF0aW9uKS50aGVuKChjYWxsUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbFJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCBpbnN0YW5jZW9mIFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5yZWNpcGllbnQpLnRvRXF1YWwoZGlhbG9nUmVzdWx0LnJlY2lwaWVudC5pZCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LnJlY2lwaWVudFN1bW1hcnkpLnRvRXF1YWwoZGlhbG9nUmVzdWx0LnJlY2lwaWVudCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmNvbW1lbnRzKS50b0VxdWFsKGRpYWxvZ1Jlc3VsdC5jb21tZW50cyk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0LmRlc2NyaXB0aW9uKS50b0VxdWFsKGRpYWxvZ1Jlc3VsdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZygpJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGlhbG9nUmVzdWx0O1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGRpYWxvZ1Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBtaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdhbGxvdyB0aGlzISdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbkNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd01pdGlnYXRpb25FeHBpcmF0aW9uRWRpdGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVxdWlyZU1pdGlnYXRpb25Db21tZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0TWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZGlhbG9nUmVzdWx0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBkaWFsb2cgc2VydmljZSB3aXRoIGNvcnJlY3QgY29uZmlndXJhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub3dEYXRlID0gbmV3IERhdGUobmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwLCAwKSksXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRBcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcG9saWN5VmlvbGF0aW9uLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlQ29tbWVudHM6IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uQ29uZmlnLnJlcXVpcmVNaXRpZ2F0aW9uQ29tbWVudHMsXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbkNvbmZpZy5kZWZhdWx0TWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlLFxuICAgICAgICAgICAgICAgICAgICBtaW5EYXRlOiBub3dEYXRlLFxuICAgICAgICAgICAgICAgICAgICBtYXhEYXRlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzaG93RXhwaXJhdGlvbkRhdGU6IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uQ29uZmlnLmFsbG93TWl0aWdhdGlvbkV4cGlyYXRpb25FZGl0aW5nLFxuICAgICAgICAgICAgICAgICAgICByZWFkT25seTogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZyhwb2xpY3lWaW9sYXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoZXhwZWN0ZWRBcmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGRpYWxvZyB3aXRoIGV4aXN0aW5nIGRlY2lzaW9uIGFuZCByZWFkT25seScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub3dEYXRlID0gbmV3IERhdGUobmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwLCAwKSksXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6ICdzb21lIGRlY2lzaW9uIGNvbW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICBtaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6ICdzb21lIGRhdGUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZEFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBleGlzdGluZ0RlY2lzaW9uLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcG9saWN5VmlvbGF0aW9uLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlQ29tbWVudHM6IHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9uQ29uZmlnLnJlcXVpcmVNaXRpZ2F0aW9uQ29tbWVudHMsXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBleGlzdGluZ0RlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgbWluRGF0ZTogbm93RGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0V4cGlyYXRpb25EYXRlOiBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbkNvbmZpZy5hbGxvd01pdGlnYXRpb25FeHBpcmF0aW9uRWRpdGluZyxcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKHBvbGljeVZpb2xhdGlvbiwgZXhpc3RpbmdEZWNpc2lvbixcbiAgICAgICAgICAgICAgICAvKnJlYWRPbmx5Ki8gdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSlcbiAgICAgICAgICAgICAgICAudG9FcXVhbChleHBlY3RlZEFyZ3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBwcm9taXNlIHdpdGggcG9saWN5IHZpb2xhdGlvbiBkZWNpc2lvbiBiYXNlZCBvbiBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZyhwb2xpY3lWaW9sYXRpb24pLnRoZW4oKGNhbGxSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsUmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0IGluc3RhbmNlb2YgUG9saWN5VmlvbGF0aW9uRGVjaXNpb24pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0Lm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSkudG9FcXVhbChkaWFsb2dSZXN1bHQubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQuY29tbWVudHMpLnRvRXF1YWwoZGlhbG9nUmVzdWx0LmNvbW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZygpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBmYWxzZSBpZiBub3QgTWl0aWdhdGVkIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UuY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZ1JlcXVpcmVkKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZClcbiAgICAgICAgICAgICAgICAudGhlbigoY2hlY2tSZXN1bHQpID0+IHJlc3VsdCA9IGNoZWNrUmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIE1pdGlnYXRlZCBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLmNoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZChQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZClcbiAgICAgICAgICAgICAgICAudGhlbigoY2hlY2tSZXN1bHQpID0+IHJlc3VsdCA9IGNoZWNrUmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRGVsZWdhdGlvbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBmYWxzZSBpZiBub3QgRGVsZWdhdGVkIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UuaXNEZWxlZ2F0aW9uKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZClcbiAgICAgICAgICAgICAgICAudGhlbigoY2hlY2tSZXN1bHQpID0+IHJlc3VsdCA9IGNoZWNrUmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0cnVlIGlmIERlbGVnYXRlZCBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLmlzRGVsZWdhdGlvbihQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZClcbiAgICAgICAgICAgICAgICAudGhlbigoY2hlY2tSZXN1bHQpID0+IHJlc3VsdCA9IGNoZWNrUmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NoZWNrUmVtZWRpYXRpb25EaWFsb2dSZXF1aXJlZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBmYWxzZSBpZiBub3QgUmVtZWRpYXRlZCBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UuY2hlY2tSZW1lZGlhdGlvbkRpYWxvZ1JlcXVpcmVkKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuTWl0aWdhdGVkKVxuICAgICAgICAgICAgICAgIC50aGVuKChjaGVja1Jlc3VsdCkgPT4gZXhwZWN0KGNoZWNrUmVzdWx0KS50b0VxdWFsKGZhbHNlKSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRydWUgaWYgTWl0aWdhdGVkIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5jaGVja1JlbWVkaWF0aW9uRGlhbG9nUmVxdWlyZWQoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkKVxuICAgICAgICAgICAgICAgIC50aGVuKChjaGVja1Jlc3VsdCkgPT4gZXhwZWN0KGNoZWNrUmVzdWx0KS50b0VxdWFsKHRydWUpKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd1JlbWVkaWF0aW9uRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBsZXQgcG9saWN5VmlvbGF0aW9uU2VydmljZSwgcmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlLCAgUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0LFxuICAgICAgICAgICAgUmVtZWRpYXRpb25EaWFsb2dSZXN1bHQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9wb2xpY3lWaW9sYXRpb25TZXJ2aWNlXywgX3JlbWVkaWF0aW9uRGlhbG9nU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0XywgX1JlbWVkaWF0aW9uRGlhbG9nUmVzdWx0XykgPT4ge1xuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZSA9IF9yZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2VfO1xuICAgICAgICAgICAgUG9saWN5VmlvbGF0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0ID0gX1BvbGljeVZpb2xhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dF87XG4gICAgICAgICAgICBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCA9IF9SZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cChyZW1lZGlhdGlvbkFkdmljZVJlc3VsdCwgZGlhbG9nUmVqZWN0LCBkaWFsb2dSZXN1bHQpIHtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdnZXRSZW1lZGlhdGlvbkFkdmljZScpXG4gICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0KSk7XG4gICAgICAgICAgICBzcHlPbihyZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93UmV2b2NhdGlvbkRpYWxvZycpXG4gICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZShkaWFsb2dSZWplY3QgPyAkcS5yZWplY3QoKSA6ICRxLnJlc29sdmUoZGlhbG9nUmVzdWx0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gcG9saWN5IHZpb2xhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd1JlbWVkaWF0aW9uRGlhbG9nKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRvIGdldCB0aGUgcmVtZWRpYXRpb24gYWR2aWNlIHJlc3VsdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNldHVwKHt9LCBmYWxzZSk7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd1JlbWVkaWF0aW9uRGlhbG9nKHBvbGljeVZpb2xhdGlvbik7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvbkFkdmljZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgocG9saWN5VmlvbGF0aW9uLmlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRoZSByZW1lZGlhdGlvbiBkaWFsb2cgc2VydmljZSB0byBzaG93IHRoZSBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVhZE9ubHkgPSB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1cyA9ICdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nRGVjaXNpb24gPSBQb2xpY3lWaW9sYXRpb25EZWNpc2lvbi5jcmVhdGVEZWNpc2lvbihwb2xpY3lWaW9sYXRpb24sIHN0YXR1cyksXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25BZHZpY2VSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFkdmljZToge30sXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnk6IHt9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2V0dXAocmVtZWRpYXRpb25BZHZpY2VSZXN1bHQsIGZhbHNlKTtcblxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLnNob3dSZW1lZGlhdGlvbkRpYWxvZyhwb2xpY3lWaW9sYXRpb24sIGV4aXN0aW5nRGVjaXNpb24sIHJlYWRPbmx5KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXZvY2F0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBsZXQgYXJncyA9IHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZS5zaG93UmV2b2NhdGlvbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdKS50b0JlKHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0LmFkdmljZSk7XG4gICAgICAgICAgICBleHBlY3QoYXJnc1sxXSkudG9CZShyZW1lZGlhdGlvbkFkdmljZVJlc3VsdC5zdW1tYXJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzJdKS50b0VxdWFsKG5ldyBQb2xpY3lWaW9sYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoe1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzdWx0OiBuZXcgUmVtZWRpYXRpb25EaWFsb2dSZXN1bHQoZXhpc3RpbmdEZWNpc2lvbiksXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHJlYWRPbmx5XG4gICAgICAgICAgICB9LCBwb2xpY3lWaW9sYXRpb24pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FwcGxpZXMgdGhlIGRpYWxvZyByZXN1bHQgdG8gdGhlIHJldHVybmVkIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uUmVzdWx0ID0gbmV3IFJlbWVkaWF0aW9uRGlhbG9nUmVzdWx0KHtcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdhYmNkJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czogJ2kgc2FpZCBzb21ldGhpbmcnLFxuICAgICAgICAgICAgICAgICAgICByZXZva2VkUm9sZXM6IFsncm9sMScsICdyb2xlMiddLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6ICd0aGluZydcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uRGV0YWlsczogW3sgbmV3VmFsdWU6ICd5YWRkYXlhZGRhJ31dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXR1cCh7fSwgZmFsc2UsIHJlbWVkaWF0aW9uUmVzdWx0KTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5zaG93UmVtZWRpYXRpb25EaWFsb2cocG9saWN5VmlvbGF0aW9uKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnJlY2lwaWVudCkudG9FcXVhbChyZW1lZGlhdGlvblJlc3VsdC5yZWNpcGllbnRTdW1tYXJ5LmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZWNpcGllbnRTdW1tYXJ5KS50b0VxdWFsKHJlbWVkaWF0aW9uUmVzdWx0LnJlY2lwaWVudFN1bW1hcnkpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNvbW1lbnRzKS50b0VxdWFsKHJlbWVkaWF0aW9uUmVzdWx0LmNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZXZva2VkUm9sZXMpLnRvRXF1YWwocmVtZWRpYXRpb25SZXN1bHQucmV2b2tlZFJvbGVzKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykudG9FcXVhbChyZW1lZGlhdGlvblJlc3VsdC5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24ucmVtZWRpYXRpb25EZXRhaWxzKS50b0VxdWFsKHJlbWVkaWF0aW9uUmVzdWx0LnJlbWVkaWF0aW9uRGV0YWlscyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZWplY3RzIHdpdGggcmVhc29uIGlmIG5vIHJlc3VsdCBmcm9tIHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZSBhbmQgZXhpc3RpbmdEZWNpc2lvbiBpcyBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdEZWNpc2lvbiA9IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLmNyZWF0ZURlY2lzaW9uKHBvbGljeVZpb2xhdGlvbiwgJ1JlbWVkaWF0ZWQnKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiwgcmVhc29uO1xuXG4gICAgICAgICAgICBzZXR1cCh7fSwgZmFsc2UsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2hvd1JlbWVkaWF0aW9uRGlhbG9nKHBvbGljeVZpb2xhdGlvbiwgZXhpc3RpbmdEZWNpc2lvbilcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiBkZWNpc2lvbiA9IHJlc3VsdClcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlc3VsdCkgPT4gcmVhc29uID0gcmVzdWx0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmVhc29uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZCgpJywgKCkgPT4ge1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNwTW9kYWwuY29uZmlybSgpIGZvciBhY3Rpb24gTWl0aWdhdGVkIGlmIGV4aXN0aW5nIGRlY2lzaW9uIGlzIERlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWxlZ2F0ZWRQb2xpY3lWaW9sYXRpb24gPSBuZXcgUG9saWN5VmlvbGF0aW9uKHBvbGljeVRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV80KTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5nZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZChcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZWRQb2xpY3lWaW9sYXRpb24sXG4gICAgICAgICAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHNwTW9kYWwuY29uZmlybSgpIGZvciBhY3Rpb24gTWl0aWdhdGVkIGlmIG5vIGV4aXN0aW5nIERlbGVnYXRlZCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5nZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZChcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb24sXG4gICAgICAgICAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0RGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgIGxldCBzcE5vdGlmaWNhdGlvblNlcnZpY2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfKSA9PiB7XG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UgPSBfc3BOb3RpZmljYXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE1lc3NhZ2UnKTtcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ3RyaWdnZXJEaXJlY3RpdmUnKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG93cyB3YXJuaW5nIG5vdGlmaWNhdGlvbiBpZiBkaWFsb2cgZnVuY3Rpb24gcmVqZWN0cyB3aXRoIGEgcmVhc29uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRpYWxvZ0RlZmVycmVkID0gJHEuZGVmZXIoKSxcbiAgICAgICAgICAgICAgICBkaWFsb2dGdW5jID0gKCkgPT4gZGlhbG9nRGVmZXJyZWQucHJvbWlzZSxcbiAgICAgICAgICAgICAgICByZWFzb24gPSAnc29tZSByZWFzb24nO1xuXG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihkaWFsb2dGdW5jKSk7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh7fSk7XG5cbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5lZGl0RGVjaXNpb24ocG9saWN5VmlvbGF0aW9uKS5jYXRjaCgoKSA9PiB7fSk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGRpYWxvZ0RlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2UuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICBleHBlY3QoYXJncy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXS5tZXNzYWdlT3JLZXkpLnRvRXF1YWwocmVhc29uKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UudHJpZ2dlckRpcmVjdGl2ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
