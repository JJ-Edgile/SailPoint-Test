System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('certificationItemService', function () {
                var certificationItemService = undefined,
                    certificationDataService = undefined,
                    certificationDialogService = undefined,
                    certificationService = undefined,
                    $q = undefined,
                    $scope = undefined,
                    CertificationDecision = undefined,
                    certItem = undefined,
                    showDialog = undefined,
                    dialogDecision = undefined,
                    CertificationActionStatus = undefined,
                    CertificationDecisionStatus = undefined,
                    CertificationItem = undefined,
                    certificationTestData = undefined,
                    showFunc = undefined,
                    noDialogReason = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 13 */
                beforeEach(inject(function (_certificationItemService_, _certificationDataService_, _certificationService_, $rootScope, _CertificationDecision_, _certificationTestData_, _CertificationItem_, _certificationDialogService_, _CertificationActionStatus_, _CertificationDecisionStatus_, _$q_, Certification) {
                    certificationDataService = _certificationDataService_;
                    certificationItemService = _certificationItemService_;
                    certificationService = _certificationService_;
                    CertificationDecision = _CertificationDecision_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    CertificationDecisionStatus = _CertificationDecisionStatus_;
                    CertificationItem = _CertificationItem_;
                    certificationTestData = _certificationTestData_;
                    certificationDialogService = _certificationDialogService_;
                    $q = _$q_;
                    $scope = $rootScope.$new();

                    certItem = createCertificationItem(certificationTestData.CERT_ITEMS[0]);
                    certificationDataService.initialize(new Certification(certificationTestData.CERTIFICATION_1));
                    certificationDataService.initializeConfiguration({
                        processRevokesImmediately: false
                    });
                    certificationDataService.decisions.clearDecisions();

                    // Don't show a dialog for most tests - default to cancelling the dialog.
                    showDialog = false;
                    dialogDecision = undefined;

                    showFunc = jasmine.createSpy('showFunc').and.callFake(function () {
                        // If there is a decision, resolve with it.
                        if (dialogDecision) {
                            return $q.when(dialogDecision);
                        }

                        if (noDialogReason) {
                            return $q.reject(noDialogReason);
                        }

                        // Otherwise, simulate cancelling the dialog by rejecting.
                        return $q.reject();
                    });

                    spyOn(certificationDialogService, 'getDialog').and.callFake(function () {
                        // If not showing a dialog, just resolve with undefined.
                        if (!showDialog) {
                            return $q.when(undefined);
                        }

                        // We're showing a dialog, so resolve with a "show function".
                        return $q.when(showFunc);
                    });
                }));

                function createCertificationItem(data) {
                    var certItem = new CertificationItem(data);
                    certItem.canChangeDecision = true;
                    return certItem;
                }

                function getStatus(status, action) {
                    var config = {
                        status: status
                    };
                    if (!!action) {
                        config.delegationReviewAction = action;
                    }
                    return new CertificationActionStatus(config);
                }

                describe('setDecision()', function () {
                    it('adds a new decision if none exists', function () {
                        var toggleDecision = undefined;
                        certificationItemService.setDecision(certItem, getStatus('Approved')).then(function (returnedDecision) {
                            return toggleDecision = returnedDecision;
                        });
                        $scope.$apply();
                        var storedDecision = certificationDataService.decisions.getEffectiveDecision(certItem.id);
                        expect(storedDecision).toBeDefined();
                        expect(storedDecision).toBe(toggleDecision);
                    });

                    it('removes existing decision if same status', function () {
                        certificationItemService.setDecision(certItem, getStatus('Approved'));
                        $scope.$apply();
                        expect(certificationDataService.decisions.getDecision(certItem.id)).toBeDefined();
                        var toggleDecision = undefined;
                        certificationItemService.setDecision(certItem, getStatus('Approved')).then(function (returnedDecision) {
                            return toggleDecision = returnedDecision;
                        });

                        $scope.$apply();
                        expect(certificationDataService.decisions.getEffectiveDecision(certItem.id)).not.toBeDefined();
                        expect(toggleDecision).toBeUndefined();
                    });

                    it('replaces existing decision if different status', function () {
                        var decision = undefined;
                        certificationItemService.setDecision(certItem, getStatus('Approved'));
                        $scope.$apply();
                        decision = certificationDataService.decisions.getDecision(certItem.id);
                        expect(decision).toBeDefined();

                        var toggleDecision = undefined;
                        certificationItemService.setDecision(certItem, getStatus('Remediated')).then(function (returnedDecision) {
                            return toggleDecision = returnedDecision;
                        });
                        $scope.$apply();
                        decision = certificationDataService.decisions.getEffectiveDecision(certItem.id);
                        expect(decision).toBeDefined();
                        expect(decision.status).toEqual('Remediated');
                        expect(decision).toBe(toggleDecision);
                    });

                    describe('challenge comment dialog', function () {
                        var showChallengeCommentDialog = false,
                            challengeComment = 'i challenge this';

                        beforeEach(function () {
                            spyOn(certificationDialogService, 'getChallengeCommentIfRequired').and.callFake(function () {
                                // If not showing a dialog, just resolve with undefined.
                                if (!showChallengeCommentDialog) {
                                    return $q.when();
                                }

                                return $q.when(challengeComment);
                            });
                        });

                        it('sets challengeComments on decision when shown', function () {
                            var toggleDecision = undefined;

                            showChallengeCommentDialog = true;

                            certificationItemService.setDecision(certItem, getStatus('Approved')).then(function (returnedDecision) {
                                return toggleDecision = returnedDecision;
                            });

                            $scope.$apply();

                            var decision = certificationDataService.decisions.getDecision(certItem.id);

                            expect(decision).toBeDefined();
                            expect(decision).toBe(toggleDecision);
                            expect(decision.challengeComments).toBeDefined();
                            expect(decision.challengeComments).toEqual(challengeComment);
                        });

                        it('does not set challengeComments on decision when not shown', function () {
                            var toggleDecision = undefined;

                            showChallengeCommentDialog = false;

                            certificationItemService.setDecision(certItem, getStatus('Approved')).then(function (returnedDecision) {
                                return toggleDecision = returnedDecision;
                            });

                            $scope.$apply();

                            var decision = certificationDataService.decisions.getDecision(certItem.id);

                            expect(decision).toBeDefined();
                            expect(decision).toBe(toggleDecision);
                            expect(decision.challengeComments).not.toBeDefined();
                            expect(decision.challengeComments).not.toEqual(challengeComment);
                        });
                    });

                    describe('delegationRevokeConfirmation', function () {
                        var userClickedNo = false,
                            userClickedYes = false,
                            delegatedCert = undefined;

                        beforeEach(function () {
                            spyOn(certificationDialogService, 'getDelegationRevokeConfirmationIfRequired').and.callFake(function () {
                                // If user clicked 'no', reject and bail
                                if (userClickedNo) {
                                    return $q.reject();
                                }
                                // If user clicked 'yes', resolve with true
                                if (userClickedYes) {
                                    return $q.when(true);
                                }
                                // Dialog is not needed
                                return $q.when();
                            });
                            delegatedCert = createCertificationItem(certificationTestData.CERT_ITEMS[0]);
                            delegatedCert.summaryStatus = CertificationItem.Status.Delegated;
                        });

                        it('if user clicked yes, set new status', function () {
                            var toggleDecision = undefined;

                            userClickedYes = true;
                            certificationItemService.setDecision(delegatedCert, getStatus('Approved')).then(function (returnedDecision) {
                                return toggleDecision = returnedDecision;
                            });

                            $scope.$apply();

                            var decision = certificationDataService.decisions.getDecision(delegatedCert.id);
                            expect(decision).toBeDefined();
                            expect(decision.revokeDelegation).toBeTruthy();
                            expect(decision).toBe(toggleDecision);
                        });

                        it('if user clicked no, keep current status', function () {
                            var toggleDecision = undefined;

                            userClickedNo = true;
                            certificationItemService.setDecision(delegatedCert, getStatus('Remediated')).then(function (returnedDecision) {
                                return toggleDecision = returnedDecision;
                            })['catch'](angular.noop);

                            $scope.$apply();

                            var decision = certificationDataService.decisions.getDecision(delegatedCert.id);
                            expect(decision).toBeUndefined();
                            expect(toggleDecision).toBeUndefined();
                        });
                    });

                    describe('dialog', function () {
                        beforeEach(function () {
                            // Show a dialog for these tests, but cancel by default.
                            showDialog = true;
                            dialogDecision = undefined;
                        });

                        it('saves decision from dialog', function () {
                            // Setup a decision so that the dialog will get resolved.
                            dialogDecision = CertificationDecision.createItemDecision(certItem, getStatus('Approved'), 'some comments');

                            // Toggle the decision and apply so that the dialog will be displayed and resolved.
                            var toggleDecision = undefined;
                            certificationItemService.setDecision(certItem, getStatus('Approved')).then(function (returnedDecision) {
                                return toggleDecision = returnedDecision;
                            });
                            $scope.$apply();

                            // Make sure that the decision was saved with the details from the dialog.
                            var decision = certificationDataService.decisions.getDecision(certItem.id);
                            expect(decision).toBeDefined();
                            expect(decision.getItem()).toEqual(dialogDecision.getItem());
                            expect(decision.status).toEqual(dialogDecision.status);
                            expect(decision.comments).toEqual(dialogDecision.comments);
                            expect(decision).toBe(toggleDecision);
                        });

                        it('does not change decision if dialog is cancelled', function () {
                            // Toggle the decision and apply so that the dialog will cancel.
                            var rejected = false;
                            certificationItemService.setDecision(certItem, getStatus('Approved'))['catch'](function () {
                                return rejected = true;
                            });
                            $scope.$apply();

                            // Make sure that the decision was not saved.
                            var decision = certificationDataService.decisions.getDecision(certItem.id);
                            expect(decision).not.toBeDefined();
                            expect(rejected).toEqual(true);
                        });

                        it('restores previous decision if dialog is cancelled', function () {
                            // Make a decision without showing the dialog.
                            showDialog = false;
                            certificationItemService.setDecision(certItem, getStatus('Approved'));
                            $scope.$apply();

                            // Make sure the initial decision is saved.
                            var oldDecision = certificationDataService.decisions.getDecision(certItem.id);
                            expect(oldDecision).toBeDefined();
                            expect(oldDecision.getItem()).toEqual(certItem);
                            expect(oldDecision.status).toEqual('Approved');

                            // Re-enable the dialog, but it will be cancelled.
                            showDialog = true;
                            certificationItemService.setDecision(certItem, getStatus('Revoked'))['catch'](angular.noop);
                            $scope.$apply();

                            // Make sure that the initial decision has not been changed.
                            var newDecision = certificationDataService.decisions.getDecision(certItem.id);
                            expect(newDecision).toBeDefined();
                            expect(newDecision).toEqual(oldDecision);
                        });
                    });

                    it('throws with no certificationItem', function () {
                        expect(function () {
                            return certificationItemService.setDecision(undefined, getStatus('Approved'));
                        });
                    });

                    it('throws with no status', function () {
                        expect(function () {
                            return certificationItemService.setDecision(certItem, undefined);
                        });
                    });
                });

                describe('isItemReadOnly()', function () {
                    function testItemReadOnly(canChangeDecision, requiresReview, requiresChallengeDecision, readOnly) {
                        var item = {
                            canChangeDecision: canChangeDecision,
                            requiresReview: requiresReview,
                            requiresChallengeDecision: requiresChallengeDecision
                        };
                        expect(certificationItemService.isItemReadOnly(item)).toEqual(readOnly);
                    }

                    it('returns true if cannot change decision and neither review nor challenge decision are required', function () {
                        testItemReadOnly(false, false, false, true);
                    });

                    it('returns false if can change decision', function () {
                        testItemReadOnly(true, false, false, false);
                    });

                    it('returns false if cannot change decision but review is required', function () {
                        testItemReadOnly(false, true, false, false);
                    });

                    it('returns false if cannot change decision but challenge decision is required', function () {
                        testItemReadOnly(false, false, true, false);
                    });
                });

                describe('revoke account confirmation', function () {
                    function testConfirmRevokeAccount(resolved, isSuccess, isDecisionSet) {
                        spyOn(certificationDialogService, 'confirmAccountDecisionChange').and.callFake(function () {
                            if (resolved) {
                                return $q.when();
                            } else {
                                return $q.reject();
                            }
                        });
                        var success = undefined;
                        certificationItemService.setDecision(certItem, getStatus('Approved')).then(function () {
                            return success = true;
                        })['catch'](function () {
                            return success = false;
                        });
                        $scope.$apply();

                        // Make sure that the decision was not saved.
                        var decision = certificationDataService.decisions.getDecision(certItem.id);
                        if (isDecisionSet) {
                            expect(decision).toBeDefined();
                        } else {
                            expect(decision).not.toBeDefined();
                        }

                        expect(success).toEqual(isSuccess);
                    }

                    it('continues with changing decision if confirmed', function () {
                        testConfirmRevokeAccount(true, true, true);
                    });

                    it('does not change decision if canceled', function () {
                        testConfirmRevokeAccount(false, false, false);
                    });
                });

                describe('getDecision()', function () {
                    it('returns decision in the store if one exists', function () {
                        var decision = { status: 'Approved' };
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(decision);
                        var foundDecision = certificationItemService.getDecision(certItem);
                        expect(certificationDataService.decisions.getEffectiveDecision).toHaveBeenCalledWith(certItem.id, undefined, certItem);
                        expect(foundDecision).toEqual(decision);
                    });

                    it('returns decision on item if none exists in the store', function () {
                        var decision = { status: 'Approved' };
                        certItem.decision = decision;
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(undefined);
                        var foundDecision = certificationItemService.getDecision(certItem);
                        expect(certificationDataService.decisions.getEffectiveDecision).toHaveBeenCalledWith(certItem.id, undefined, certItem);
                        expect(foundDecision).toEqual(decision);
                    });

                    it('returns decision if no item decision but identity delegation exists', function () {
                        var decisionStatus = new CertificationDecisionStatus({
                            currentState: new CertificationActionStatus({
                                status: CertificationActionStatus.Name.Delegated,
                                name: CertificationActionStatus.Name.Delegated
                            }),
                            delegationComments: 'comments 1',
                            delegationDescription: 'desc 1',
                            delegationOwner: {
                                displayName: 'George Jetson',
                                id: 'delownerid1'
                            }
                        });

                        certItem.decisionStatus = decisionStatus;
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(undefined);
                        var foundDecision = certificationItemService.getDecision(certItem);
                        expect(certificationDataService.decisions.getEffectiveDecision).toHaveBeenCalledWith(certItem.id, undefined, certItem);
                        expect(foundDecision.getItemId()).toEqual(certItem.id);
                        expect(foundDecision.status).toEqual(CertificationActionStatus.Name.Delegated);
                        expect(foundDecision.recipient).toEqual(decisionStatus.delegationOwner.id);
                        expect(foundDecision.comments).toEqual(decisionStatus.delegationComments);
                        expect(foundDecision.description).toEqual(decisionStatus.delegationDescription);
                    });
                });

                describe('view/edit decisions', function () {
                    var itemDecision = undefined,
                        hasDialog = undefined,
                        isReadOnly = undefined,
                        existingDecision = undefined;

                    beforeEach(function () {
                        spyOn(certificationItemService, 'getDecision').and.callFake(function () {
                            return itemDecision;
                        });
                        spyOn(certificationItemService, 'isItemReadOnly').and.callFake(function () {
                            return isReadOnly;
                        });
                        spyOn(certificationDialogService, 'isDialogRequired').and.callFake(function () {
                            return hasDialog;
                        });
                        itemDecision = undefined;
                        isReadOnly = undefined;
                        hasDialog = undefined;
                        existingDecision = CertificationDecision.createItemDecision(certItem, getStatus('Mitigated'));
                    });

                    function setup(newItemDecision, newIsReadOnly, newHasDialog) {
                        itemDecision = newItemDecision;
                        isReadOnly = newIsReadOnly;
                        hasDialog = newHasDialog;
                    }

                    describe('canViewDecision', function () {
                        it('return false if there is no decision', function () {
                            setup(undefined, true, true);
                            expect(certificationItemService.canViewDecision(certItem)).toEqual(false);
                        });

                        it('returns false if there is a decision but no dialog required', function () {
                            setup(existingDecision, true, false);
                            expect(certificationItemService.canViewDecision(certItem)).toEqual(false);
                        });

                        it('returns false if there is a decision and dialog required, but not read only', function () {
                            setup(existingDecision, false, true);
                            expect(certificationItemService.canViewDecision(certItem)).toEqual(false);
                        });

                        it('return true if there is a decision with dialog and it is read only', function () {
                            setup(existingDecision, true, true);
                            expect(certificationItemService.canViewDecision(certItem)).toEqual(true);
                        });
                    });

                    describe('canEditDecision', function () {
                        it('return false if there is no decision', function () {
                            setup(undefined, false, true);
                            expect(certificationItemService.canEditDecision(certItem)).toEqual(false);
                        });

                        it('returns false if there is a decision but no dialog required', function () {
                            setup(existingDecision, false, false);
                            expect(certificationItemService.canEditDecision(certItem)).toEqual(false);
                        });

                        it('returns false if there is a decision and dialog required, but read only', function () {
                            setup(existingDecision, true, false);
                            expect(certificationItemService.canEditDecision(certItem)).toEqual(false);
                        });

                        it('return true if there is a decision with dialog and it is not read only', function () {
                            setup(existingDecision, false, true);
                            expect(certificationItemService.canEditDecision(certItem)).toEqual(true);
                        });

                        it('return false if cert is not editable', function () {
                            setup(existingDecision, false, true);
                            spyOn(certificationDataService, 'isCertificationEditable').and.returnValue(false);
                            expect(certificationItemService.canEditDecision(certItem)).toEqual(false);
                        });
                    });

                    describe('viewDecision', function () {
                        it('calls editDecision with readOnly true', function () {
                            spyOn(certificationItemService, 'editDecision');
                            certificationItemService.viewDecision(certItem);
                            expect(certificationItemService.editDecision).toHaveBeenCalledWith(certItem, true);
                        });
                    });

                    describe('editDecision', function () {
                        var spNotificationService = undefined;

                        beforeEach(inject(function (_spNotificationService_) {
                            spNotificationService = _spNotificationService_;
                            spyOn(spNotificationService, 'addMessage');
                            spyOn(spNotificationService, 'triggerDirective');
                        }));

                        it('throws with no item', function () {
                            expect(function () {
                                return certificationItemService.editDecision();
                            }).toThrow();
                        });

                        it('throws if item has no decision', function () {
                            setup(undefined, false, true);
                            expect(function () {
                                return certificationItemService.editDecision(certItem);
                            }).toThrow();
                        });

                        it('gets the dialog for the decision and calls through with existing decision adn readOnly flag', function () {
                            setup(existingDecision, false, false);
                            showDialog = true;
                            certificationItemService.editDecision(certItem, true);
                            $scope.$apply();
                            expect(showFunc).toHaveBeenCalledWith(existingDecision, true);
                        });

                        it('adds new decision to store', function () {
                            setup(existingDecision, false, false);
                            showDialog = true;
                            dialogDecision = CertificationDecision.createItemDecision(certItem, getStatus('Mitigated'), 'hello');
                            certificationItemService.editDecision(certItem);
                            $scope.$apply();
                            expect(certificationDataService.decisions.getEffectiveDecision(certItem.id)).toEqual(dialogDecision);
                        });

                        it('does not add new decision to store if canceled', function () {
                            setup(existingDecision, false, false);
                            certificationDataService.decisions.addDecision(existingDecision);
                            showDialog = true;
                            certificationItemService.editDecision(certItem);
                            $scope.$apply();
                            expect(certificationDataService.decisions.getEffectiveDecision(certItem.id)).toEqual(existingDecision);
                        });

                        it('returns promise with new decision', function () {
                            var resolvedVal = undefined;
                            setup(existingDecision, false, false);
                            showDialog = true;
                            dialogDecision = CertificationDecision.createItemDecision(certItem, getStatus('Mitigated'), 'hello');
                            certificationItemService.editDecision(certItem).then(function (val) {
                                return resolvedVal = val;
                            });
                            $scope.$apply();
                            expect(resolvedVal).toEqual(dialogDecision);
                        });

                        it('returns rejected promise if there is no dialog ', function () {
                            var rejected = undefined;
                            setup(existingDecision, false, false);
                            certificationItemService.editDecision(certItem).then(function () {
                                return rejected = false;
                            })['catch'](function () {
                                return rejected = true;
                            });
                            $scope.$apply();
                            expect(rejected).toEqual(true);
                        });

                        it('adds notification message with reason if no dialog is launched', function () {
                            var rejected = undefined;
                            setup(existingDecision, true, true);
                            showDialog = true;
                            noDialogReason = 'NO DIALOG!';
                            certificationItemService.editDecision(certItem).then(function () {
                                return rejected = false;
                            })['catch'](function () {
                                return rejected = true;
                            });
                            $scope.$apply();
                            expect(rejected).toEqual(true);
                            expect(spNotificationService.addMessage).toHaveBeenCalled();
                            expect(spNotificationService.addMessage.calls.mostRecent().args[0].messageOrKey).toEqual(noDialogReason);
                            expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyx1QkFBdUIsVUFBVSxTQUFTOztJQUV2SDs7SUFFQSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLDRCQUE0QixZQUFXO2dCQUM1QyxJQUFJLDJCQUF3QjtvQkFBRSwyQkFBd0I7b0JBQUUsNkJBQTBCO29CQUM5RSx1QkFBb0I7b0JBQUUsS0FBRTtvQkFBRSxTQUFNO29CQUFFLHdCQUFxQjtvQkFBRSxXQUFRO29CQUFFLGFBQVU7b0JBQUUsaUJBQWM7b0JBQzdGLDRCQUF5QjtvQkFBRSw4QkFBMkI7b0JBQUUsb0JBQWlCO29CQUFFLHdCQUFxQjtvQkFBRSxXQUFRO29CQUMxRyxpQkFBYzs7Z0JBRWxCLFdBQVcsT0FBTyxxQkFBcUI7OztnQkFHdkMsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLDRCQUE0Qix3QkFDeEQsWUFBWSx5QkFBeUIseUJBQXlCLHFCQUM5RCw4QkFBOEIsNkJBQTZCLCtCQUMzRCxNQUFNLGVBQWU7b0JBQzVDLDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1Qiw4QkFBOEI7b0JBQzlCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4Qiw2QkFBNkI7b0JBQzdCLEtBQUs7b0JBQ0wsU0FBVSxXQUFXOztvQkFFckIsV0FBVyx3QkFBd0Isc0JBQXNCLFdBQVc7b0JBQ3BFLHlCQUF5QixXQUFXLElBQUksY0FBYyxzQkFBc0I7b0JBQzVFLHlCQUF5Qix3QkFBd0I7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aUJBQWlCLHNCQUFzQixtQkFBbUIsVUFBVSxVQUFVLGNBQWM7NEJBQzVGLHlCQUF5QixhQUFhLFVBQVUsS0FBSyxVQUFDLEtBQUc7Z0NBc0N6QyxPQXRDOEMsY0FBYzs7NEJBQzVFLE9BQU87NEJBQ1AsT0FBTyxhQUFhLFFBQVE7Ozt3QkFHaEMsR0FBRyxtREFBbUQsWUFBTTs0QkFDeEQsSUFBSSxXQUFROzRCQUNaLE1BQU0sa0JBQWtCLE9BQU87NEJBQy9CLHlCQUF5QixhQUFhLFVBQ2pDLEtBQUssWUFBQTtnQ0F1Q00sT0F2Q0EsV0FBVzsrQkFBTSxTQUN0QixZQUFBO2dDQXdDSyxPQXhDQyxXQUFXOzs0QkFDNUIsT0FBTzs0QkFDUCxPQUFPLFVBQVUsUUFBUTs7O3dCQUc3QixHQUFHLGtFQUFrRSxZQUFNOzRCQUN2RSxJQUFJLFdBQVE7NEJBQ1osTUFBTSxrQkFBa0IsTUFBTTs0QkFDOUIsYUFBYTs0QkFDYixpQkFBaUI7NEJBQ2pCLHlCQUF5QixhQUFhLFVBQ2pDLEtBQUssWUFBQTtnQ0F5Q00sT0F6Q0EsV0FBVzsrQkFBTSxTQUN0QixZQUFBO2dDQTBDSyxPQTFDQyxXQUFXOzs0QkFDNUIsT0FBTzs0QkFDUCxPQUFPLFVBQVUsUUFBUTs0QkFDekIsT0FBTyxzQkFBc0IsWUFBWTs0QkFDekMsT0FBTyxzQkFBc0IsV0FBVyxNQUFNLGFBQWEsS0FBSyxHQUFHLGNBQzlELFFBQVE7NEJBQ2IsT0FBTyxzQkFBc0Isa0JBQWtCOzs7Ozs7O0dBaUQ1RCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25JdGVtU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSxcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UsICRxLCAkc2NvcGUsIENlcnRpZmljYXRpb25EZWNpc2lvbiwgY2VydEl0ZW0sIHNob3dEaWFsb2csIGRpYWxvZ0RlY2lzaW9uLFxuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLCBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMsIENlcnRpZmljYXRpb25JdGVtLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIHNob3dGdW5jLFxuICAgICAgICBub0RpYWxvZ1JlYXNvbjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEzICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2NlcnRpZmljYXRpb25JdGVtU2VydmljZV8sIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUsIF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXywgX0NlcnRpZmljYXRpb25JdGVtXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2VfLCBfQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c18sIF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXNfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcV8sIENlcnRpZmljYXRpb24pIHtcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2VfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbiA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMgPSBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2VfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRzY29wZSAgPSAkcm9vdFNjb3BlLiRuZXcoKTtcblxuICAgICAgICBjZXJ0SXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdKTtcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUobmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSkpO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUNvbmZpZ3VyYXRpb24oe1xuICAgICAgICAgICAgcHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuY2xlYXJEZWNpc2lvbnMoKTtcblxuICAgICAgICAvLyBEb24ndCBzaG93IGEgZGlhbG9nIGZvciBtb3N0IHRlc3RzIC0gZGVmYXVsdCB0byBjYW5jZWxsaW5nIHRoZSBkaWFsb2cuXG4gICAgICAgIHNob3dEaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgZGlhbG9nRGVjaXNpb24gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgc2hvd0Z1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnc2hvd0Z1bmMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBkZWNpc2lvbiwgcmVzb2x2ZSB3aXRoIGl0LlxuICAgICAgICAgICAgaWYgKGRpYWxvZ0RlY2lzaW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oZGlhbG9nRGVjaXNpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9EaWFsb2dSZWFzb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KG5vRGlhbG9nUmVhc29uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBzaW11bGF0ZSBjYW5jZWxsaW5nIHRoZSBkaWFsb2cgYnkgcmVqZWN0aW5nLlxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ2dldERpYWxvZycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBub3Qgc2hvd2luZyBhIGRpYWxvZywganVzdCByZXNvbHZlIHdpdGggdW5kZWZpbmVkLlxuICAgICAgICAgICAgaWYgKCFzaG93RGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4odW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UncmUgc2hvd2luZyBhIGRpYWxvZywgc28gcmVzb2x2ZSB3aXRoIGEgXCJzaG93IGZ1bmN0aW9uXCIuXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbihzaG93RnVuYyk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKGRhdGEpIHtcbiAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGRhdGEpO1xuICAgICAgICBjZXJ0SXRlbS5jYW5DaGFuZ2VEZWNpc2lvbiA9IHRydWU7XG4gICAgICAgIHJldHVybiBjZXJ0SXRlbTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFN0YXR1cyhzdGF0dXMsIGFjdGlvbikge1xuICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCEhYWN0aW9uKSB7XG4gICAgICAgICAgICBjb25maWcuZGVsZWdhdGlvblJldmlld0FjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoY29uZmlnKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnc2V0RGVjaXNpb24oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnYWRkcyBhIG5ldyBkZWNpc2lvbiBpZiBub25lIGV4aXN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHRvZ2dsZURlY2lzaW9uO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpLlxuICAgICAgICAgICAgICAgIHRoZW4oKHJldHVybmVkRGVjaXNpb24pID0+IHRvZ2dsZURlY2lzaW9uID0gcmV0dXJuZWREZWNpc2lvbik7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBsZXQgc3RvcmVkRGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldEVmZmVjdGl2ZURlY2lzaW9uKGNlcnRJdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZWREZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZWREZWNpc2lvbikudG9CZSh0b2dnbGVEZWNpc2lvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIGV4aXN0aW5nIGRlY2lzaW9uIGlmIHNhbWUgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXREZWNpc2lvbihjZXJ0SXRlbS5pZCkpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBsZXQgdG9nZ2xlRGVjaXNpb247XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSkuXG4gICAgICAgICAgICAgICAgdGhlbigocmV0dXJuZWREZWNpc2lvbikgPT4gdG9nZ2xlRGVjaXNpb24gPSByZXR1cm5lZERlY2lzaW9uKTtcblxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RWZmZWN0aXZlRGVjaXNpb24oY2VydEl0ZW0uaWQpKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0b2dnbGVEZWNpc2lvbikudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVwbGFjZXMgZXhpc3RpbmcgZGVjaXNpb24gaWYgZGlmZmVyZW50IHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uKGNlcnRJdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcblxuICAgICAgICAgICAgbGV0IHRvZ2dsZURlY2lzaW9uO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSkuXG4gICAgICAgICAgICAgICAgdGhlbigocmV0dXJuZWREZWNpc2lvbikgPT4gdG9nZ2xlRGVjaXNpb24gPSByZXR1cm5lZERlY2lzaW9uKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGRlY2lzaW9uID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXRFZmZlY3RpdmVEZWNpc2lvbihjZXJ0SXRlbS5pZCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uc3RhdHVzKS50b0VxdWFsKCdSZW1lZGlhdGVkJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24pLnRvQmUodG9nZ2xlRGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2hhbGxlbmdlIGNvbW1lbnQgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3dDaGFsbGVuZ2VDb21tZW50RGlhbG9nID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlQ29tbWVudCA9ICdpIGNoYWxsZW5nZSB0aGlzJztcblxuICAgICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdnZXRDaGFsbGVuZ2VDb21tZW50SWZSZXF1aXJlZCcpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCBzaG93aW5nIGEgZGlhbG9nLCBqdXN0IHJlc29sdmUgd2l0aCB1bmRlZmluZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2hvd0NoYWxsZW5nZUNvbW1lbnREaWFsb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihjaGFsbGVuZ2VDb21tZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2V0cyBjaGFsbGVuZ2VDb21tZW50cyBvbiBkZWNpc2lvbiB3aGVuIHNob3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0b2dnbGVEZWNpc2lvbjtcblxuICAgICAgICAgICAgICAgIHNob3dDaGFsbGVuZ2VDb21tZW50RGlhbG9nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5zZXREZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKS5cbiAgICAgICAgICAgICAgICAgICAgdGhlbigocmV0dXJuZWREZWNpc2lvbikgPT4gdG9nZ2xlRGVjaXNpb24gPSByZXR1cm5lZERlY2lzaW9uKTtcblxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RGVjaXNpb24oY2VydEl0ZW0uaWQpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZSh0b2dnbGVEZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNoYWxsZW5nZUNvbW1lbnRzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jaGFsbGVuZ2VDb21tZW50cykudG9FcXVhbChjaGFsbGVuZ2VDb21tZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3Qgc2V0IGNoYWxsZW5nZUNvbW1lbnRzIG9uIGRlY2lzaW9uIHdoZW4gbm90IHNob3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0b2dnbGVEZWNpc2lvbjtcblxuICAgICAgICAgICAgICAgIHNob3dDaGFsbGVuZ2VDb21tZW50RGlhbG9nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSkuXG4gICAgICAgICAgICAgICAgICAgIHRoZW4oKHJldHVybmVkRGVjaXNpb24pID0+IHRvZ2dsZURlY2lzaW9uID0gcmV0dXJuZWREZWNpc2lvbik7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uKGNlcnRJdGVtLmlkKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGVjaXNpb24pLnRvQmUodG9nZ2xlRGVjaXNpb24pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jaGFsbGVuZ2VDb21tZW50cykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNoYWxsZW5nZUNvbW1lbnRzKS5ub3QudG9FcXVhbChjaGFsbGVuZ2VDb21tZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdkZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVzZXJDbGlja2VkTm8gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VyQ2xpY2tlZFllcyA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlZENlcnQ7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnZ2V0RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbklmUmVxdWlyZWQnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB1c2VyIGNsaWNrZWQgJ25vJywgcmVqZWN0IGFuZCBiYWlsXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyQ2xpY2tlZE5vKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdXNlciBjbGlja2VkICd5ZXMnLCByZXNvbHZlIHdpdGggdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckNsaWNrZWRZZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIERpYWxvZyBpcyBub3QgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGVsZWdhdGVkQ2VydCA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdKTtcbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZWRDZXJ0LnN1bW1hcnlTdGF0dXMgPSBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuRGVsZWdhdGVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdpZiB1c2VyIGNsaWNrZWQgeWVzLCBzZXQgbmV3IHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlRGVjaXNpb247XG5cbiAgICAgICAgICAgICAgICB1c2VyQ2xpY2tlZFllcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKGRlbGVnYXRlZENlcnQsIGdldFN0YXR1cygnQXBwcm92ZWQnKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybmVkRGVjaXNpb24pID0+IHRvZ2dsZURlY2lzaW9uID0gcmV0dXJuZWREZWNpc2lvbik7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uKGRlbGVnYXRlZENlcnQuaWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGVjaXNpb24ucmV2b2tlRGVsZWdhdGlvbikudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZSh0b2dnbGVEZWNpc2lvbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2lmIHVzZXIgY2xpY2tlZCBubywga2VlcCBjdXJyZW50IHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlRGVjaXNpb247XG5cbiAgICAgICAgICAgICAgICB1c2VyQ2xpY2tlZE5vID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24oZGVsZWdhdGVkQ2VydCwgZ2V0U3RhdHVzKCdSZW1lZGlhdGVkJykpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXR1cm5lZERlY2lzaW9uKSA9PiB0b2dnbGVEZWNpc2lvbiA9IHJldHVybmVkRGVjaXNpb24pLmNhdGNoKGFuZ3VsYXIubm9vcCk7XG5cbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uKGRlbGVnYXRlZENlcnQuaWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0b2dnbGVEZWNpc2lvbikudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTaG93IGEgZGlhbG9nIGZvciB0aGVzZSB0ZXN0cywgYnV0IGNhbmNlbCBieSBkZWZhdWx0LlxuICAgICAgICAgICAgICAgIHNob3dEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpYWxvZ0RlY2lzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzYXZlcyBkZWNpc2lvbiBmcm9tIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTZXR1cCBhIGRlY2lzaW9uIHNvIHRoYXQgdGhlIGRpYWxvZyB3aWxsIGdldCByZXNvbHZlZC5cbiAgICAgICAgICAgICAgICBkaWFsb2dEZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oY2VydEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGdldFN0YXR1cygnQXBwcm92ZWQnKSwgJ3NvbWUgY29tbWVudHMnKTtcblxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgZGVjaXNpb24gYW5kIGFwcGx5IHNvIHRoYXQgdGhlIGRpYWxvZyB3aWxsIGJlIGRpc3BsYXllZCBhbmQgcmVzb2x2ZWQuXG4gICAgICAgICAgICAgICAgbGV0IHRvZ2dsZURlY2lzaW9uO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5zZXREZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKS5cbiAgICAgICAgICAgICAgICAgICAgdGhlbigocmV0dXJuZWREZWNpc2lvbikgPT4gdG9nZ2xlRGVjaXNpb24gPSByZXR1cm5lZERlY2lzaW9uKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZGVjaXNpb24gd2FzIHNhdmVkIHdpdGggdGhlIGRldGFpbHMgZnJvbSB0aGUgZGlhbG9nLlxuICAgICAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RGVjaXNpb24oY2VydEl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0SXRlbSgpKS50b0VxdWFsKGRpYWxvZ0RlY2lzaW9uLmdldEl0ZW0oKSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnN0YXR1cykudG9FcXVhbChkaWFsb2dEZWNpc2lvbi5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jb21tZW50cykudG9FcXVhbChkaWFsb2dEZWNpc2lvbi5jb21tZW50cyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlKHRvZ2dsZURlY2lzaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgY2hhbmdlIGRlY2lzaW9uIGlmIGRpYWxvZyBpcyBjYW5jZWxsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBkZWNpc2lvbiBhbmQgYXBwbHkgc28gdGhhdCB0aGUgZGlhbG9nIHdpbGwgY2FuY2VsLlxuICAgICAgICAgICAgICAgIGxldCByZWplY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5zZXREZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKS5cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2goKCkgPT4gcmVqZWN0ZWQgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZGVjaXNpb24gd2FzIG5vdCBzYXZlZC5cbiAgICAgICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uKGNlcnRJdGVtLmlkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGVjaXNpb24pLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZWplY3RlZCkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmVzdG9yZXMgcHJldmlvdXMgZGVjaXNpb24gaWYgZGlhbG9nIGlzIGNhbmNlbGxlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBNYWtlIGEgZGVjaXNpb24gd2l0aG91dCBzaG93aW5nIHRoZSBkaWFsb2cuXG4gICAgICAgICAgICAgICAgc2hvd0RpYWxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5zZXREZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGluaXRpYWwgZGVjaXNpb24gaXMgc2F2ZWQuXG4gICAgICAgICAgICAgICAgbGV0IG9sZERlY2lzaW9uID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXREZWNpc2lvbihjZXJ0SXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9sZERlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChvbGREZWNpc2lvbi5nZXRJdGVtKCkpLnRvRXF1YWwoY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChvbGREZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoJ0FwcHJvdmVkJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZS1lbmFibGUgdGhlIGRpYWxvZywgYnV0IGl0IHdpbGwgYmUgY2FuY2VsbGVkLlxuICAgICAgICAgICAgICAgIHNob3dEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5zZXREZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdSZXZva2VkJykpLmNhdGNoKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIGluaXRpYWwgZGVjaXNpb24gaGFzIG5vdCBiZWVuIGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgbGV0IG5ld0RlY2lzaW9uID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXREZWNpc2lvbihjZXJ0SXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG5ld0RlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChuZXdEZWNpc2lvbikudG9FcXVhbChvbGREZWNpc2lvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNlcnRpZmljYXRpb25JdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKHVuZGVmaW5lZCwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24oY2VydEl0ZW0sIHVuZGVmaW5lZCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0l0ZW1SZWFkT25seSgpJywgKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiB0ZXN0SXRlbVJlYWRPbmx5KGNhbkNoYW5nZURlY2lzaW9uLCByZXF1aXJlc1JldmlldywgcmVxdWlyZXNDaGFsbGVuZ2VEZWNpc2lvbiwgcmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0ge1xuICAgICAgICAgICAgICAgIGNhbkNoYW5nZURlY2lzaW9uOiBjYW5DaGFuZ2VEZWNpc2lvbixcbiAgICAgICAgICAgICAgICByZXF1aXJlc1JldmlldzogcmVxdWlyZXNSZXZpZXcsXG4gICAgICAgICAgICAgICAgcmVxdWlyZXNDaGFsbGVuZ2VEZWNpc2lvbjogcmVxdWlyZXNDaGFsbGVuZ2VEZWNpc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuaXNJdGVtUmVhZE9ubHkoaXRlbSkpLnRvRXF1YWwocmVhZE9ubHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjYW5ub3QgY2hhbmdlIGRlY2lzaW9uIGFuZCBuZWl0aGVyIHJldmlldyBub3IgY2hhbGxlbmdlIGRlY2lzaW9uIGFyZSByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RJdGVtUmVhZE9ubHkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGNhbiBjaGFuZ2UgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0SXRlbVJlYWRPbmx5KHRydWUsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjYW5ub3QgY2hhbmdlIGRlY2lzaW9uIGJ1dCByZXZpZXcgaXMgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0SXRlbVJlYWRPbmx5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjYW5ub3QgY2hhbmdlIGRlY2lzaW9uIGJ1dCBjaGFsbGVuZ2UgZGVjaXNpb24gaXMgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0SXRlbVJlYWRPbmx5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXZva2UgYWNjb3VudCBjb25maXJtYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHRlc3RDb25maXJtUmV2b2tlQWNjb3VudChyZXNvbHZlZCwgaXNTdWNjZXNzLCBpc0RlY2lzaW9uU2V0KSB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ2NvbmZpcm1BY2NvdW50RGVjaXNpb25DaGFuZ2UnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBzdWNjZXNzO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpLlxuICAgICAgICAgICAgICAgIHRoZW4oKCkgPT4gc3VjY2VzcyA9IHRydWUpLlxuICAgICAgICAgICAgICAgIGNhdGNoKCgpID0+IHN1Y2Nlc3MgPSBmYWxzZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBkZWNpc2lvbiB3YXMgbm90IHNhdmVkLlxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXREZWNpc2lvbihjZXJ0SXRlbS5pZCk7XG4gICAgICAgICAgICBpZiAoaXNEZWNpc2lvblNldCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwZWN0KHN1Y2Nlc3MpLnRvRXF1YWwoaXNTdWNjZXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdjb250aW51ZXMgd2l0aCBjaGFuZ2luZyBkZWNpc2lvbiBpZiBjb25maXJtZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0Q29uZmlybVJldm9rZUFjY291bnQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjaGFuZ2UgZGVjaXNpb24gaWYgY2FuY2VsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0Q29uZmlybVJldm9rZUFjY291bnQoZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldERlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGRlY2lzaW9uIGluIHRoZSBzdG9yZSBpZiBvbmUgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0geyBzdGF0dXM6ICdBcHByb3ZlZCd9O1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldEVmZmVjdGl2ZURlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKGRlY2lzaW9uKTtcbiAgICAgICAgICAgIGxldCBmb3VuZERlY2lzaW9uID0gY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmdldERlY2lzaW9uKGNlcnRJdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldEVmZmVjdGl2ZURlY2lzaW9uKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SXRlbS5pZCwgdW5kZWZpbmVkLCBjZXJ0SXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoZm91bmREZWNpc2lvbikudG9FcXVhbChkZWNpc2lvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGRlY2lzaW9uIG9uIGl0ZW0gaWYgbm9uZSBleGlzdHMgaW4gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0geyBzdGF0dXM6ICdBcHByb3ZlZCd9O1xuICAgICAgICAgICAgY2VydEl0ZW0uZGVjaXNpb24gPSBkZWNpc2lvbjtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgbGV0IGZvdW5kRGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZ2V0RGVjaXNpb24oY2VydEl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RWZmZWN0aXZlRGVjaXNpb24pXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJdGVtLmlkLCB1bmRlZmluZWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uKS50b0VxdWFsKGRlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZGVjaXNpb24gaWYgbm8gaXRlbSBkZWNpc2lvbiBidXQgaWRlbnRpdHkgZGVsZWdhdGlvbiBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25TdGF0dXMgPSBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGU6IG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvbkNvbW1lbnRzOiAnY29tbWVudHMgMScsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvbkRlc2NyaXB0aW9uOiAnZGVzYyAxJyxcbiAgICAgICAgICAgICAgICBkZWxlZ2F0aW9uT3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdHZW9yZ2UgSmV0c29uJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkZWxvd25lcmlkMSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2VydEl0ZW0uZGVjaXNpb25TdGF0dXMgPSBkZWNpc2lvblN0YXR1cztcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgbGV0IGZvdW5kRGVjaXNpb24gPSBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZ2V0RGVjaXNpb24oY2VydEl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RWZmZWN0aXZlRGVjaXNpb24pXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJdGVtLmlkLCB1bmRlZmluZWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uLmdldEl0ZW1JZCgpKS50b0VxdWFsKGNlcnRJdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uLnN0YXR1cykudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uLnJlY2lwaWVudCkudG9FcXVhbChkZWNpc2lvblN0YXR1cy5kZWxlZ2F0aW9uT3duZXIuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KGZvdW5kRGVjaXNpb24uY29tbWVudHMpLnRvRXF1YWwoZGVjaXNpb25TdGF0dXMuZGVsZWdhdGlvbkNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGRlY2lzaW9uU3RhdHVzLmRlbGVnYXRpb25EZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndmlldy9lZGl0IGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbiwgaGFzRGlhbG9nLCBpc1JlYWRPbmx5LCBleGlzdGluZ0RlY2lzaW9uO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4gaXRlbURlY2lzaW9uKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgJ2lzSXRlbVJlYWRPbmx5JykuYW5kLmNhbGxGYWtlKCgpID0+IGlzUmVhZE9ubHkpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdpc0RpYWxvZ1JlcXVpcmVkJykuYW5kLmNhbGxGYWtlKCgpID0+IGhhc0RpYWxvZyk7XG4gICAgICAgICAgICBpdGVtRGVjaXNpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpc1JlYWRPbmx5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaGFzRGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cChuZXdJdGVtRGVjaXNpb24sIG5ld0lzUmVhZE9ubHksIG5ld0hhc0RpYWxvZykge1xuICAgICAgICAgICAgaXRlbURlY2lzaW9uID0gbmV3SXRlbURlY2lzaW9uO1xuICAgICAgICAgICAgaXNSZWFkT25seSA9IG5ld0lzUmVhZE9ubHk7XG4gICAgICAgICAgICBoYXNEaWFsb2cgPSBuZXdIYXNEaWFsb2c7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmliZSgnY2FuVmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybiBmYWxzZSBpZiB0aGVyZSBpcyBubyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR1cCh1bmRlZmluZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuY2FuVmlld0RlY2lzaW9uKGNlcnRJdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgYSBkZWNpc2lvbiBidXQgbm8gZGlhbG9nIHJlcXVpcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwKGV4aXN0aW5nRGVjaXNpb24sIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmNhblZpZXdEZWNpc2lvbihjZXJ0SXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGlzIGEgZGVjaXNpb24gYW5kIGRpYWxvZyByZXF1aXJlZCwgYnV0IG5vdCByZWFkIG9ubHknLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXAoZXhpc3RpbmdEZWNpc2lvbiwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuY2FuVmlld0RlY2lzaW9uKGNlcnRJdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybiB0cnVlIGlmIHRoZXJlIGlzIGEgZGVjaXNpb24gd2l0aCBkaWFsb2cgYW5kIGl0IGlzIHJlYWQgb25seScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmNhblZpZXdEZWNpc2lvbihjZXJ0SXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2NhbkVkaXREZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm4gZmFsc2UgaWYgdGhlcmUgaXMgbm8gZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXAodW5kZWZpbmVkLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5jYW5FZGl0RGVjaXNpb24oY2VydEl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBhIGRlY2lzaW9uIGJ1dCBubyBkaWFsb2cgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXAoZXhpc3RpbmdEZWNpc2lvbiwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmNhbkVkaXREZWNpc2lvbihjZXJ0SXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGlzIGEgZGVjaXNpb24gYW5kIGRpYWxvZyByZXF1aXJlZCwgYnV0IHJlYWQgb25seScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5jYW5FZGl0RGVjaXNpb24oY2VydEl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmV0dXJuIHRydWUgaWYgdGhlcmUgaXMgYSBkZWNpc2lvbiB3aXRoIGRpYWxvZyBhbmQgaXQgaXMgbm90IHJlYWQgb25seScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5jYW5FZGl0RGVjaXNpb24oY2VydEl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm4gZmFsc2UgaWYgY2VydCBpcyBub3QgZWRpdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXAoZXhpc3RpbmdEZWNpc2lvbiwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2lzQ2VydGlmaWNhdGlvbkVkaXRhYmxlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmNhbkVkaXREZWNpc2lvbihjZXJ0SXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3ZpZXdEZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdjYWxscyBlZGl0RGVjaXNpb24gd2l0aCByZWFkT25seSB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgJ2VkaXREZWNpc2lvbicpO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS52aWV3RGVjaXNpb24oY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZWRpdERlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2VkaXREZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzcE5vdGlmaWNhdGlvblNlcnZpY2U7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfc3BOb3RpZmljYXRpb25TZXJ2aWNlXykgPT4ge1xuICAgICAgICAgICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE1lc3NhZ2UnKTtcbiAgICAgICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICd0cmlnZ2VyRGlyZWN0aXZlJyk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZWRpdERlY2lzaW9uKCkpLnRvVGhyb3coKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgndGhyb3dzIGlmIGl0ZW0gaGFzIG5vIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwKHVuZGVmaW5lZCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZWRpdERlY2lzaW9uKGNlcnRJdGVtKSkudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdnZXRzIHRoZSBkaWFsb2cgZm9yIHRoZSBkZWNpc2lvbiBhbmQgY2FsbHMgdGhyb3VnaCB3aXRoIGV4aXN0aW5nIGRlY2lzaW9uIGFkbiByZWFkT25seSBmbGFnJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwKGV4aXN0aW5nRGVjaXNpb24sIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2hvd0RpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmVkaXREZWNpc2lvbihjZXJ0SXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzaG93RnVuYykudG9IYXZlQmVlbkNhbGxlZFdpdGgoZXhpc3RpbmdEZWNpc2lvbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2FkZHMgbmV3IGRlY2lzaW9uIHRvIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwKGV4aXN0aW5nRGVjaXNpb24sIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2hvd0RpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlhbG9nRGVjaXNpb24gPSBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpLCAnaGVsbG8nKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZWRpdERlY2lzaW9uKGNlcnRJdGVtKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RWZmZWN0aXZlRGVjaXNpb24oY2VydEl0ZW0uaWQpKS50b0VxdWFsKGRpYWxvZ0RlY2lzaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgYWRkIG5ldyBkZWNpc2lvbiB0byBzdG9yZSBpZiBjYW5jZWxlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuYWRkRGVjaXNpb24oZXhpc3RpbmdEZWNpc2lvbik7XG4gICAgICAgICAgICAgICAgc2hvd0RpYWxvZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmVkaXREZWNpc2lvbihjZXJ0SXRlbSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldEVmZmVjdGl2ZURlY2lzaW9uKGNlcnRJdGVtLmlkKSkudG9FcXVhbChleGlzdGluZ0RlY2lzaW9uKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmV0dXJucyBwcm9taXNlIHdpdGggbmV3IGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXNvbHZlZFZhbDtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNob3dEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpYWxvZ0RlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdNaXRpZ2F0ZWQnKSwgJ2hlbGxvJyk7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmVkaXREZWNpc2lvbihjZXJ0SXRlbSkudGhlbigodmFsKSA9PiByZXNvbHZlZFZhbCA9IHZhbCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlZFZhbCkudG9FcXVhbChkaWFsb2dEZWNpc2lvbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybnMgcmVqZWN0ZWQgcHJvbWlzZSBpZiB0aGVyZSBpcyBubyBkaWFsb2cgJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZWplY3RlZDtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5lZGl0RGVjaXNpb24oY2VydEl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlamVjdGVkID0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiByZWplY3RlZCA9IHRydWUpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVqZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2FkZHMgbm90aWZpY2F0aW9uIG1lc3NhZ2Ugd2l0aCByZWFzb24gaWYgbm8gZGlhbG9nIGlzIGxhdW5jaGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZWplY3RlZDtcbiAgICAgICAgICAgICAgICBzZXR1cChleGlzdGluZ0RlY2lzaW9uLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBzaG93RGlhbG9nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub0RpYWxvZ1JlYXNvbiA9ICdOTyBESUFMT0chJztcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuZWRpdERlY2lzaW9uKGNlcnRJdGVtKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZWplY3RlZCA9IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gcmVqZWN0ZWQgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTWVzc2FnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTWVzc2FnZS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5tZXNzYWdlT3JLZXkpXG4gICAgICAgICAgICAgICAgICAgIC50b0VxdWFsKG5vRGlhbG9nUmVhc29uKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
