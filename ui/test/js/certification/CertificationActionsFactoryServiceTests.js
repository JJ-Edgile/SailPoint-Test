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

            describe('certificationActionsFactoryService', function () {
                var CertificationActionStatus = undefined,
                    CertificationItem = undefined,
                    CertificationDecisionStatus = undefined,
                    certificationActionsFactoryService = undefined,
                    certEditable = undefined;

                beforeEach(module(certificationModule, testModule));

                beforeEach(inject(function (certificationTestData, _CertificationItem_, _CertificationActionStatus_, _CertificationDecisionStatus_, _certificationActionsFactoryService_, _certificationDataService_) {
                    CertificationActionStatus = _CertificationActionStatus_;
                    CertificationItem = _CertificationItem_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    CertificationDecisionStatus = _CertificationDecisionStatus_;
                    certificationActionsFactoryService = _certificationActionsFactoryService_;

                    certEditable = true;
                    spyOn(_certificationDataService_, 'isCertificationEditable').and.callFake(function () {
                        return certEditable;
                    });
                }));

                function createCertificationItem(statuses, decisionState, summaryStatus, policyType) {
                    var decisionStatus = new CertificationDecisionStatus({});
                    if (statuses) {
                        statuses.forEach(function (status) {
                            return decisionStatus.decisions.push(new CertificationActionStatus({
                                status: status,
                                promptKey: status,
                                name: status
                            }));
                        });
                    }

                    if (decisionState) {
                        decisionStatus.currentState = new CertificationActionStatus({
                            status: decisionState,
                            promptKey: decisionState,
                            name: decisionState
                        });
                    }

                    return new CertificationItem({
                        id: '1234',
                        decisionStatus: decisionStatus,
                        policyType: policyType,
                        summaryStatus: summaryStatus ? summaryStatus : CertificationItem.Status.Open,
                        roleName: 'Role1',
                        canChangeDecision: true
                    });
                }

                describe('getCertificationActions(item)', function () {
                    it('null item throws', function () {
                        expect(function () {
                            certificationActionsFactoryService.getCertificationActions(null);
                        }).toThrow();
                    });

                    it('item with empty decisions does not fail', function () {
                        var item = createCertificationItem([], CertificationActionStatus.Name.Approved, CertificationItem.Status.Open);
                        var actions = certificationActionsFactoryService.getCertificationActions(item);
                        expect(actions).toBeTruthy();
                        expect(actions.getButtonActions().length).toEqual(0);
                        expect(actions.getMenuActions().length).toEqual(0);
                    });

                    it('item with fleshed-out decisions gives two buttons and some menus', function () {
                        var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated], undefined, CertificationItem.Status.Open);
                        var actions = certificationActionsFactoryService.getCertificationActions(item);
                        expect(actions).toBeTruthy();
                        expect(actions.getButtonActions().length).toEqual(2);
                        expect(actions.getMenuActions().length).toEqual(2);
                    });

                    it('excludes unsupported operations', function () {
                        var item = createCertificationItem([CertificationActionStatus.Name.ApproveAccount, CertificationActionStatus.Name.Modified, CertificationActionStatus.Name.AccountReassign], undefined, CertificationItem.Status.Open),
                            actions = certificationActionsFactoryService.getCertificationActions(item);
                        expect(actions.getButtonActions().length).toEqual(0);
                        expect(actions.getMenuActions().length).toEqual(0);
                    });
                });

                describe('Status Open, getButtonDecisions(item, availableDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. For Open items, current
                        // status is always undefined.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.Open);
                    });

                    // Note status Open and Returned are identical so we only test one of them here.

                    it('no available decisions should return empty button decisions', function () {
                        var buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, new Set());
                        expect(buttonDecisions.length).toEqual(0);
                    });

                    it('available non-button-worthy decisions should return empty button decisions', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Cleared, CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Acknowledged]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(0);
                    });

                    it('one available decision should return one button decision', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(1);
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Approved);
                    });

                    it('more than two available decisions should return two button decisions', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(2);
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Approved);
                        expect(buttonDecisions[1]).toEqual(CertificationActionStatus.Name.Remediated);
                    });
                });

                describe('Status Delegated, getButtonDecisions(item, availableDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions and current status don't matter here.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.Delegated);
                    });

                    it('should return empty button decisions', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(0);
                    });
                });

                describe('Status Complete, getButtonDecisions(item, availableDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions and current status don't matter here.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.Complete);
                    });

                    it('should return empty button decisions', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(0);
                    });
                });

                describe('Status Returned, getButtonDecisions(item, availableDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions and current status don't matter here.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.Returned);
                    });

                    it('should return empty button decisions if cert not editable', function () {
                        item.canChangeDecision = false;

                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(0);
                    });
                });

                describe('Status WaitingReview, getButtonDecisions(item, availableDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. .
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Remediated, CertificationItem.Status.WaitingReview);
                        item.requiresReview = true;
                    });

                    // Note WaitingReview and Challenged are identical so we only test one of them here.

                    it('no available decisions should return empty button decisions', function () {
                        var buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, new Set());
                        expect(buttonDecisions.length).toEqual(0);
                    });

                    it('current state not available should return one button', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(1);
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Approved);
                    });

                    it('opposite is not available should return one button', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Remediated]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(1);
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Remediated);
                    });

                    it('challenge phase special case should return one button', function () {
                        item.canChangeDecision = false;
                        var availableDecisions = new Set([CertificationActionStatus.Name.Remediated]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(1);
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Remediated);
                    });

                    it('standard two buttons', function () {
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            buttonDecisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(2);
                        // The current status, and its opposite.
                        expect(buttonDecisions[0]).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(buttonDecisions[1]).toEqual(CertificationActionStatus.Name.Approved);
                    });
                });

                describe('Default status, createButtonActions(item, buttonDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. For Open items, current
                        // status is always undefined. We assume Open status since this is the general case.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.Open);
                    });

                    // Note status Open and Returned are identical so we only test one of them here.

                    it('null button decisions returns empty list', function () {
                        var actions = certificationActionsFactoryService.createButtonActions(item, null);
                        expect(actions.length).toEqual(0);
                    });

                    it('empty button decisions returns empty list', function () {
                        var actions = certificationActionsFactoryService.createButtonActions(item, []);
                        expect(actions.length).toEqual(0);
                    });

                    it('two decisions returns two buttons', function () {
                        var decisions = [CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated],
                            actions = certificationActionsFactoryService.createButtonActions(item, decisions);
                        expect(actions.length).toEqual(2);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Approved);
                        expect(actions[0].promptKey).toEqual('cert_action_approve');
                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[1].promptKey).toEqual('cert_action_remediate');
                    });
                });

                describe('WaitingReview, createButtonActions(item, buttonDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. Current status doesn't matter.
                        item = createCertificationItem(undefined, undefined, CertificationItem.Status.WaitingReview);
                    });

                    it('two decisions returns two buttons', function () {
                        var decisions = [CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated],
                            actions = certificationActionsFactoryService.createButtonActions(item, decisions);
                        expect(actions.length).toEqual(2);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Approved);
                        expect(actions[0].promptKey).toEqual('cert_accept_delegation_review');
                        expect(actions[0].delegationReviewAction).toEqual(CertificationActionStatus.DelegationAction.Accept);

                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[1].promptKey).toEqual('cert_action_remediate');
                        expect(actions[1].delegationReviewAction).toEqual(CertificationActionStatus.DelegationAction.Reject);
                    });
                });

                describe('Challenged, createButtonActions(item, buttonDecisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. Current status doesn't matter.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Remediated, CertificationItem.Status.Challenged);
                    });

                    it('two decisions returns two buttons', function () {
                        var decisions = [CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated],
                            actions = certificationActionsFactoryService.createButtonActions(item, decisions);
                        expect(actions.length).toEqual(2);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Approved);
                        expect(actions[0].promptKey).toEqual('cert_reject_challenge');
                        expect(actions[0].challengeAction).toEqual(CertificationActionStatus.DelegationAction.Reject);

                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[1].promptKey).toEqual('cert_action_remediate');
                        expect(actions[1].challengeAction).toEqual(CertificationActionStatus.DelegationAction.Accept);
                        expect(actions[1].oneStepChallenge).toEqual(true);
                    });

                    it('canChangeDecion false without requireChallengeDecision returns no decisions', function () {
                        item.canChangeDecision = false;
                        item.requiresChallengeDecision = false;
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                            decisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(decisions.length).toEqual(0);
                    });

                    it('canChangeDecision false with requiresChallengeDecision true returns normal challenge decisions', function () {
                        item.canChangeDecision = false;
                        item.requiresChallengeDecision = true;
                        var availableDecisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                            decisions = certificationActionsFactoryService.getButtonDecisions(item, availableDecisions);
                        expect(decisions.length).toEqual(2);
                    });
                });

                describe('Default status, createMenuItems(item, decisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API. . We assume WaitingReview
                        // status since this is the general case.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Approved, CertificationItem.Status.WaitingReview);
                    });

                    it('null decisions returns empty list', function () {
                        var actions = certificationActionsFactoryService.createMenuItems(item, null);
                        expect(actions.length).toEqual(0);
                    });

                    it('empty decisions returns empty list', function () {
                        var actions = certificationActionsFactoryService.createMenuItems(item, new Set());
                        expect(actions.length).toEqual(0);
                    });

                    it('four decisions returns three actions minus current status', function () {
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(3);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[0].promptKey).toEqual('cert_action_remediate');
                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Mitigated);
                        expect(actions[1].promptKey).toEqual('cert_action_mitigate');
                        expect(actions[2].name).toEqual(CertificationActionStatus.Name.Delegated);
                        expect(actions[2].promptKey).toEqual('cert_action_delegate');
                    });
                });

                describe('Complete, createMenuItems(item, decisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Approved, CertificationItem.Status.Complete);
                    });

                    it('item not editable returns empty menu', function () {
                        item.canChangeDecision = false;
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(0);
                    });

                    it('four decisions returns four actions, minus current status plus Undo', function () {
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(4);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Cleared);
                        expect(actions[0].promptKey).toEqual('cert_action_undo');
                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[1].promptKey).toEqual('cert_action_remediate');
                        expect(actions[2].name).toEqual(CertificationActionStatus.Name.Mitigated);
                        expect(actions[2].promptKey).toEqual('cert_action_mitigate');
                        expect(actions[3].name).toEqual(CertificationActionStatus.Name.Delegated);
                        expect(actions[3].promptKey).toEqual('cert_action_delegate');
                    });
                });

                describe('Challenged, createMenuItems(item, decisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Approved, CertificationItem.Status.Challenged);
                    });

                    it('four decisions returns two actions, minus current status and delegate', function () {
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(2);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[0].promptKey).toEqual('cert_action_remediate');
                        expect(actions[0].challengeAction).toEqual(CertificationActionStatus.DelegationAction.Accept);
                        expect(actions[0].oneStepChallenge).toEqual(true);
                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Mitigated);
                        expect(actions[1].promptKey).toEqual('cert_action_mitigate');
                        expect(actions[1].challengeAction).toEqual(CertificationActionStatus.DelegationAction.Accept);
                        expect(actions[1].oneStepChallenge).toEqual(true);
                    });
                });

                describe('Delegated, createMenuItems(item, decisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Delegated, CertificationItem.Status.Delegated);
                    });

                    it('three decisions returns three actions, minus current status plus Undo', function () {
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(3);
                        expect(actions[0].name).toEqual(CertificationActionStatus.Name.Cleared);
                        expect(actions[0].promptKey).toEqual('cert_action_undo');
                        expect(actions[1].name).toEqual(CertificationActionStatus.Name.Approved);
                        expect(actions[1].promptKey).toEqual('cert_action_approve');
                        expect(actions[2].name).toEqual(CertificationActionStatus.Name.Remediated);
                        expect(actions[2].promptKey).toEqual('cert_action_remediate');
                    });

                    it('item not editable returns empty menu', function () {
                        item.canChangeDecision = false;
                        var decisions = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Delegated]),
                            actions = certificationActionsFactoryService.createMenuItems(item, decisions);
                        expect(actions.length).toEqual(0);
                    });
                });

                describe('WaitingReview, createMenuItems(item, decisions)', function () {
                    var item = undefined;

                    beforeEach(function () {
                        // Available decisions don't matter here since we pass it in the tested API.
                        item = createCertificationItem(undefined, CertificationActionStatus.Name.Remediated, CertificationItem.Status.WaitingReview);
                        item.requiresReview = true;
                    });

                    it('challenge phase special case should return empty menu', function () {
                        item.canChangeDecision = false;
                        var availableDecisions = new Set([CertificationActionStatus.Name.Remediated]),
                            buttonDecisions = certificationActionsFactoryService.createMenuItems(item, availableDecisions);
                        expect(buttonDecisions.length).toEqual(0);
                    });
                });

                describe('popNextAvailableDecision(availableDecisions, excludedDecisions)', function () {
                    it('null available', function () {
                        var excluded = new Set([CertificationActionStatus.Name.Approved]),
                            popped = certificationActionsFactoryService.popNextAvailableDecision(null, excluded);
                        expect(popped).toBeNull();
                    });

                    it('empty available', function () {
                        var excluded = new Set([CertificationActionStatus.Name.Approved]),
                            popped = certificationActionsFactoryService.popNextAvailableDecision(new Set(), excluded);
                        expect(popped).toBeNull();
                    });

                    it('null excluded', function () {
                        var available = new Set([CertificationActionStatus.Name.Approved]),
                            popped = certificationActionsFactoryService.popNextAvailableDecision(available, null);
                        expect(popped).toEqual(CertificationActionStatus.Name.Approved);
                        popped = certificationActionsFactoryService.popNextAvailableDecision(available, null);
                        expect(popped).toBeNull();
                    });

                    it('empty excluded', function () {
                        var available = new Set([CertificationActionStatus.Name.Approved]),
                            excluded = new Set(),
                            popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toEqual(CertificationActionStatus.Name.Approved);
                        popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toBeNull();
                    });

                    it('verify list in canonical order and exclusions are exluded, verify pops', function () {
                        var available = new Set([CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Cleared, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved]),
                            excluded = new Set([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toEqual(CertificationActionStatus.Name.Approved);
                        popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toEqual(CertificationActionStatus.Name.Remediated);
                        popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toEqual(CertificationActionStatus.Name.Mitigated);
                        popped = certificationActionsFactoryService.popNextAvailableDecision(available, excluded);
                        expect(popped).toBeNull();
                    });
                });

                describe('popNextAvailableOppositeDecision(originalStatus, availableDecisions)', function () {
                    it('null originalStatus', function () {
                        var available = new Set([CertificationActionStatus.Name.Approved]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(null, available);
                        expect(popped).toBeNull();
                    });

                    it('null available', function () {
                        var original = CertificationActionStatus.Name.Remediated,
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, null);
                        expect(popped).toBeNull();
                    });

                    it('empty available', function () {
                        var original = CertificationActionStatus.Name.Remediated,
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, new Set());
                        expect(popped).toBeNull();
                    });

                    it('approved becomes remediated which is available', function () {
                        var original = CertificationActionStatus.Name.Approved,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Remediated);
                    });

                    it('approved but remediated not available', function () {
                        var original = CertificationActionStatus.Name.Approved,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toBeNull();
                    });

                    it('mitigated becomes remediated which is available', function () {
                        var original = CertificationActionStatus.Name.Mitigated,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Remediated);
                    });

                    it('mitigated but remediated not available', function () {
                        var original = CertificationActionStatus.Name.Mitigated,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toBeNull();
                    });

                    it('remediated becomes approved if its available', function () {
                        var original = CertificationActionStatus.Name.Remediated,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Approved);
                    });

                    it('remediated becomes mitigated if approved not available', function () {
                        var original = CertificationActionStatus.Name.Remediated,
                            available = new Set([CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Mitigated);
                    });

                    it('remediated but no valid opposite available', function () {
                        var original = CertificationActionStatus.Name.Remediated,
                            available = new Set([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toBeNull();
                    });

                    it('revokeaccount becomes approved if its available', function () {
                        var original = CertificationActionStatus.Name.RevokeAccount,
                            available = new Set([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Approved);
                    });

                    it('revokeaccount becomes mitigated if approved not available', function () {
                        var original = CertificationActionStatus.Name.RevokeAccount,
                            available = new Set([CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toEqual(CertificationActionStatus.Name.Mitigated);
                    });

                    it('revokeaccount but no valid opposite available', function () {
                        var original = CertificationActionStatus.Name.RevokeAccount,
                            available = new Set([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Cleared]),
                            popped = certificationActionsFactoryService.popNextAvailableOppositeDecision(original, available);
                        expect(popped).toBeNull();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsdUJBQXVCLFVBQVUsU0FBUzs7SUFFdkg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxzQ0FBc0MsWUFBVztnQkFDdEQsSUFBSSw0QkFBeUI7b0JBQUUsb0JBQWlCO29CQUFFLDhCQUEyQjtvQkFBRSxxQ0FBa0M7b0JBQzdHLGVBQVk7O2dCQUVoQixXQUFXLE9BQU8scUJBQXFCOztnQkFFdkMsV0FBVyxPQUFPLFVBQVMsdUJBQXVCLHFCQUFxQiw2QkFDNUMsK0JBQStCLHNDQUMvQiw0QkFBNEI7b0JBQ25ELDRCQUE0QjtvQkFDNUIsb0JBQW9CO29CQUNwQiw0QkFBNEI7b0JBQzVCLDhCQUE4QjtvQkFDOUIscUNBQXFDOztvQkFFckMsZUFBZTtvQkFDZixNQUFNLDRCQUE0QiwyQkFBMkIsSUFBSSxTQUFTLFlBQUE7d0JBVTFELE9BVmdFOzs7O2dCQUdwRixTQUFTLHdCQUF3QixVQUFVLGVBQWUsZUFBZSxZQUFZO29CQUNqRixJQUFJLGlCQUFpQixJQUFJLDRCQUE0QjtvQkFDckQsSUFBSSxVQUFVO3dCQUNWLFNBQVMsUUFBUSxVQUFDLFFBQU07NEJBWVIsT0FaYSxlQUFlLFVBQVUsS0FBSyxJQUFJLDBCQUEwQjtnQ0FDckYsUUFBUTtnQ0FDUixXQUFXO2dDQUNYLE1BQU07Ozs7O29CQUlkLElBQUksZUFBZTt3QkFDZixlQUFlLGVBQWUsSUFBSSwwQkFBMEI7NEJBQ3hELFFBQVE7NEJBQ1IsV0FBVzs0QkFDWCxNQUFN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QUFLOzRCQUNuQyxTQUFTLG1DQUFtQyxpQ0FBaUMsVUFBVTt3QkFDM0YsT0FBTyxRQUFROzs7Ozs7R0FqRnhCIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLCBDZXJ0aWZpY2F0aW9uSXRlbSwgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzLCBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLFxuICAgICAgICBjZXJ0RWRpdGFibGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIF9DZXJ0aWZpY2F0aW9uSXRlbV8sIF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzXywgX2NlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfKSB7XG4gICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMgPSBfQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c187XG4gICAgICAgIENlcnRpZmljYXRpb25JdGVtID0gX0NlcnRpZmljYXRpb25JdGVtXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyA9IF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1c187XG4gICAgICAgIGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZV87XG5cbiAgICAgICAgY2VydEVkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3B5T24oX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sICdpc0NlcnRpZmljYXRpb25FZGl0YWJsZScpLmFuZC5jYWxsRmFrZSgoKSA9PiBjZXJ0RWRpdGFibGUpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHN0YXR1c2VzLCBkZWNpc2lvblN0YXRlLCBzdW1tYXJ5U3RhdHVzLCBwb2xpY3lUeXBlKSB7XG4gICAgICAgIGxldCBkZWNpc2lvblN0YXR1cyA9IG5ldyBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMoe30pO1xuICAgICAgICBpZiAoc3RhdHVzZXMpIHtcbiAgICAgICAgICAgIHN0YXR1c2VzLmZvckVhY2goKHN0YXR1cykgPT4gZGVjaXNpb25TdGF0dXMuZGVjaXNpb25zLnB1c2gobmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgICAgIHByb21wdEtleTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG5hbWU6IHN0YXR1c1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWNpc2lvblN0YXRlKSB7XG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1cy5jdXJyZW50U3RhdGUgPSBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBkZWNpc2lvblN0YXRlLFxuICAgICAgICAgICAgICAgIHByb21wdEtleTogZGVjaXNpb25TdGF0ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBkZWNpc2lvblN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgIGRlY2lzaW9uU3RhdHVzOiBkZWNpc2lvblN0YXR1cyxcbiAgICAgICAgICAgIHBvbGljeVR5cGU6IHBvbGljeVR5cGUsXG4gICAgICAgICAgICBzdW1tYXJ5U3RhdHVzOiBzdW1tYXJ5U3RhdHVzID8gc3VtbWFyeVN0YXR1cyA6IENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5PcGVuLFxuICAgICAgICAgICAgcm9sZU5hbWU6ICdSb2xlMScsXG4gICAgICAgICAgICBjYW5DaGFuZ2VEZWNpc2lvbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0Q2VydGlmaWNhdGlvbkFjdGlvbnMoaXRlbSknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdudWxsIGl0ZW0gdGhyb3dzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uQWN0aW9ucyhudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2l0ZW0gd2l0aCBlbXB0eSBkZWNpc2lvbnMgZG9lcyBub3QgZmFpbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW10sXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5PcGVuXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25BY3Rpb25zKGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmdldEJ1dHRvbkFjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucy5nZXRNZW51QWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2l0ZW0gd2l0aCBmbGVzaGVkLW91dCBkZWNpc2lvbnMgZ2l2ZXMgdHdvIGJ1dHRvbnMgYW5kIHNvbWUgbWVudXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkXSxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLk9wZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkFjdGlvbnMoaXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucykudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMuZ2V0QnV0dG9uQWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmdldE1lbnVBY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZXhjbHVkZXMgdW5zdXBwb3J0ZWQgb3BlcmF0aW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlQWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5Nb2RpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BY2NvdW50UmVhc3NpZ25dLFxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5PcGVuKSxcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uQWN0aW9ucyhpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmdldEJ1dHRvbkFjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucy5nZXRNZW51QWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU3RhdHVzIE9wZW4sIGdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBhdmFpbGFibGVEZWNpc2lvbnMpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBBdmFpbGFibGUgZGVjaXNpb25zIGRvbid0IG1hdHRlciBoZXJlIHNpbmNlIHdlIHBhc3MgaXQgaW4gdGhlIHRlc3RlZCBBUEkuIEZvciBPcGVuIGl0ZW1zLCBjdXJyZW50XG4gICAgICAgICAgICAvLyBzdGF0dXMgaXMgYWx3YXlzIHVuZGVmaW5lZC5cbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbSh1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5PcGVuXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBOb3RlIHN0YXR1cyBPcGVuIGFuZCBSZXR1cm5lZCBhcmUgaWRlbnRpY2FsIHNvIHdlIG9ubHkgdGVzdCBvbmUgb2YgdGhlbSBoZXJlLlxuXG4gICAgICAgIGl0KCdubyBhdmFpbGFibGUgZGVjaXNpb25zIHNob3VsZCByZXR1cm4gZW1wdHkgYnV0dG9uIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBidXR0b25EZWNpc2lvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhdmFpbGFibGUgbm9uLWJ1dHRvbi13b3J0aHkgZGVjaXNpb25zIHNob3VsZCByZXR1cm4gZW1wdHkgYnV0dG9uIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BY2tub3dsZWRnZWRcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29uZSBhdmFpbGFibGUgZGVjaXNpb24gc2hvdWxkIHJldHVybiBvbmUgYnV0dG9uIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChidXR0b25EZWNpc2lvbnNbMF0pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ21vcmUgdGhhbiB0d28gYXZhaWxhYmxlIGRlY2lzaW9ucyBzaG91bGQgcmV0dXJuIHR3byBidXR0b24gZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWRdKSxcbiAgICAgICAgICAgICAgICBidXR0b25EZWNpc2lvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBhdmFpbGFibGVEZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zWzBdKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zWzFdKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU3RhdHVzIERlbGVnYXRlZCwgZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtIDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEF2YWlsYWJsZSBkZWNpc2lvbnMgYW5kIGN1cnJlbnQgc3RhdHVzIGRvbid0IG1hdHRlciBoZXJlLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkRlbGVnYXRlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW1wdHkgYnV0dG9uIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdKSxcbiAgICAgICAgICAgICAgICBidXR0b25EZWNpc2lvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBhdmFpbGFibGVEZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1N0YXR1cyBDb21wbGV0ZSwgZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtIDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEF2YWlsYWJsZSBkZWNpc2lvbnMgYW5kIGN1cnJlbnQgc3RhdHVzIGRvbid0IG1hdHRlciBoZXJlLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNvbXBsZXRlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBidXR0b24gZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU3RhdHVzIFJldHVybmVkLCBnZXRCdXR0b25EZWNpc2lvbnMoaXRlbSwgYXZhaWxhYmxlRGVjaXNpb25zKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlY2lzaW9ucyBhbmQgY3VycmVudCBzdGF0dXMgZG9uJ3QgbWF0dGVyIGhlcmUuXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0odW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuUmV0dXJuZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGVtcHR5IGJ1dHRvbiBkZWNpc2lvbnMgaWYgY2VydCBub3QgZWRpdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNhbkNoYW5nZURlY2lzaW9uID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdKSxcbiAgICAgICAgICAgICAgICBidXR0b25EZWNpc2lvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBhdmFpbGFibGVEZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1N0YXR1cyBXYWl0aW5nUmV2aWV3LCBnZXRCdXR0b25EZWNpc2lvbnMoaXRlbSwgYXZhaWxhYmxlRGVjaXNpb25zKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlY2lzaW9ucyBkb24ndCBtYXR0ZXIgaGVyZSBzaW5jZSB3ZSBwYXNzIGl0IGluIHRoZSB0ZXN0ZWQgQVBJLiAuXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0odW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5XYWl0aW5nUmV2aWV3XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaXRlbS5yZXF1aXJlc1JldmlldyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE5vdGUgV2FpdGluZ1JldmlldyBhbmQgQ2hhbGxlbmdlZCBhcmUgaWRlbnRpY2FsIHNvIHdlIG9ubHkgdGVzdCBvbmUgb2YgdGhlbSBoZXJlLlxuXG4gICAgICAgIGl0KCdubyBhdmFpbGFibGUgZGVjaXNpb25zIHNob3VsZCByZXR1cm4gZW1wdHkgYnV0dG9uIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBidXR0b25EZWNpc2lvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldEJ1dHRvbkRlY2lzaW9ucyhpdGVtLCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjdXJyZW50IHN0YXRlIG5vdCBhdmFpbGFibGUgc2hvdWxkIHJldHVybiBvbmUgYnV0dG9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChidXR0b25EZWNpc2lvbnNbMF0pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wcG9zaXRlIGlzIG5vdCBhdmFpbGFibGUgc2hvdWxkIHJldHVybiBvbmUgYnV0dG9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSksXG4gICAgICAgICAgICAgICAgYnV0dG9uRGVjaXNpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5nZXRCdXR0b25EZWNpc2lvbnMoaXRlbSwgYXZhaWxhYmxlRGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChidXR0b25EZWNpc2lvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9uc1swXSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjaGFsbGVuZ2UgcGhhc2Ugc3BlY2lhbCBjYXNlIHNob3VsZCByZXR1cm4gb25lIGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2FuQ2hhbmdlRGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChidXR0b25EZWNpc2lvbnNbMF0pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc3RhbmRhcmQgdHdvIGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlRGVjaXNpb25zID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IHN0YXR1cywgYW5kIGl0cyBvcHBvc2l0ZS5cbiAgICAgICAgICAgIGV4cGVjdChidXR0b25EZWNpc2lvbnNbMF0pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbkRlY2lzaW9uc1sxXSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0RlZmF1bHQgc3RhdHVzLCBjcmVhdGVCdXR0b25BY3Rpb25zKGl0ZW0sIGJ1dHRvbkRlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtIDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEF2YWlsYWJsZSBkZWNpc2lvbnMgZG9uJ3QgbWF0dGVyIGhlcmUgc2luY2Ugd2UgcGFzcyBpdCBpbiB0aGUgdGVzdGVkIEFQSS4gRm9yIE9wZW4gaXRlbXMsIGN1cnJlbnRcbiAgICAgICAgICAgIC8vIHN0YXR1cyBpcyBhbHdheXMgdW5kZWZpbmVkLiBXZSBhc3N1bWUgT3BlbiBzdGF0dXMgc2luY2UgdGhpcyBpcyB0aGUgZ2VuZXJhbCBjYXNlLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLk9wZW5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE5vdGUgc3RhdHVzIE9wZW4gYW5kIFJldHVybmVkIGFyZSBpZGVudGljYWwgc28gd2Ugb25seSB0ZXN0IG9uZSBvZiB0aGVtIGhlcmUuXG5cbiAgICAgICAgaXQoJ251bGwgYnV0dG9uIGRlY2lzaW9ucyByZXR1cm5zIGVtcHR5IGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWN0aW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuY3JlYXRlQnV0dG9uQWN0aW9ucyhpdGVtLCBudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VtcHR5IGJ1dHRvbiBkZWNpc2lvbnMgcmV0dXJucyBlbXB0eSBsaXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZUJ1dHRvbkFjdGlvbnMoaXRlbSwgW10pO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndHdvIGRlY2lzaW9ucyByZXR1cm5zIHR3byBidXR0b25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSxcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5jcmVhdGVCdXR0b25BY3Rpb25zKGl0ZW0sIGRlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5uYW1lKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX2FwcHJvdmUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMV0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnV2FpdGluZ1JldmlldywgY3JlYXRlQnV0dG9uQWN0aW9ucyhpdGVtLCBidXR0b25EZWNpc2lvbnMpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBBdmFpbGFibGUgZGVjaXNpb25zIGRvbid0IG1hdHRlciBoZXJlIHNpbmNlIHdlIHBhc3MgaXQgaW4gdGhlIHRlc3RlZCBBUEkuIEN1cnJlbnQgc3RhdHVzIGRvZXNuJ3QgbWF0dGVyLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLldhaXRpbmdSZXZpZXdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0d28gZGVjaXNpb25zIHJldHVybnMgdHdvIGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWRdLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZUJ1dHRvbkFjdGlvbnMoaXRlbSwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLnByb21wdEtleSkudG9FcXVhbCgnY2VydF9hY2NlcHRfZGVsZWdhdGlvbl9yZXZpZXcnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLmRlbGVnYXRpb25SZXZpZXdBY3Rpb24pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLkFjY2VwdCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMV0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLmRlbGVnYXRpb25SZXZpZXdBY3Rpb24pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLlJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NoYWxsZW5nZWQsIGNyZWF0ZUJ1dHRvbkFjdGlvbnMoaXRlbSwgYnV0dG9uRGVjaXNpb25zKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlY2lzaW9ucyBkb24ndCBtYXR0ZXIgaGVyZSBzaW5jZSB3ZSBwYXNzIGl0IGluIHRoZSB0ZXN0ZWQgQVBJLiBDdXJyZW50IHN0YXR1cyBkb2Vzbid0IG1hdHRlci5cbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbSh1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0d28gZGVjaXNpb25zIHJldHVybnMgdHdvIGJ1dHRvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWRdLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZUJ1dHRvbkFjdGlvbnMoaXRlbSwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLnByb21wdEtleSkudG9FcXVhbCgnY2VydF9yZWplY3RfY2hhbGxlbmdlJyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5jaGFsbGVuZ2VBY3Rpb24pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLlJlamVjdCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMV0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLmNoYWxsZW5nZUFjdGlvbikudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLkRlbGVnYXRpb25BY3Rpb24uQWNjZXB0KTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm9uZVN0ZXBDaGFsbGVuZ2UpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYW5DaGFuZ2VEZWNpb24gZmFsc2Ugd2l0aG91dCByZXF1aXJlQ2hhbGxlbmdlRGVjaXNpb24gcmV0dXJucyBubyBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNhbkNoYW5nZURlY2lzaW9uID0gZmFsc2U7XG4gICAgICAgICAgICBpdGVtLnJlcXVpcmVzQ2hhbGxlbmdlRGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPVxuICAgICAgICAgICAgICAgICAgICBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSksXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5nZXRCdXR0b25EZWNpc2lvbnMoaXRlbSwgYXZhaWxhYmxlRGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuQ2hhbmdlRGVjaXNpb24gZmFsc2Ugd2l0aCByZXF1aXJlc0NoYWxsZW5nZURlY2lzaW9uIHRydWUgcmV0dXJucyBub3JtYWwgY2hhbGxlbmdlIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2FuQ2hhbmdlRGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGl0ZW0ucmVxdWlyZXNDaGFsbGVuZ2VEZWNpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlRGVjaXNpb25zID1cbiAgICAgICAgICAgICAgICAgICAgbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLCBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuZ2V0QnV0dG9uRGVjaXNpb25zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnRGVmYXVsdCBzdGF0dXMsIGNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBkZWNpc2lvbnMpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBBdmFpbGFibGUgZGVjaXNpb25zIGRvbid0IG1hdHRlciBoZXJlIHNpbmNlIHdlIHBhc3MgaXQgaW4gdGhlIHRlc3RlZCBBUEkuIC4gV2UgYXNzdW1lIFdhaXRpbmdSZXZpZXdcbiAgICAgICAgICAgIC8vIHN0YXR1cyBzaW5jZSB0aGlzIGlzIHRoZSBnZW5lcmFsIGNhc2UuXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0odW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuV2FpdGluZ1Jldmlld1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ251bGwgZGVjaXNpb25zIHJldHVybnMgZW1wdHkgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5jcmVhdGVNZW51SXRlbXMoaXRlbSwgbnVsbCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdlbXB0eSBkZWNpc2lvbnMgcmV0dXJucyBlbXB0eSBsaXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm91ciBkZWNpc2lvbnMgcmV0dXJucyB0aHJlZSBhY3Rpb25zIG1pbnVzIGN1cnJlbnQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZF0pLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBkZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0ubmFtZSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX3JlbWVkaWF0ZScpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMV0ubmFtZSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLnByb21wdEtleSkudG9FcXVhbCgnY2VydF9hY3Rpb25fbWl0aWdhdGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzJdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1syXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX2RlbGVnYXRlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NvbXBsZXRlLCBjcmVhdGVNZW51SXRlbXMoaXRlbSwgZGVjaXNpb25zKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlY2lzaW9ucyBkb24ndCBtYXR0ZXIgaGVyZSBzaW5jZSB3ZSBwYXNzIGl0IGluIHRoZSB0ZXN0ZWQgQVBJLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNvbXBsZXRlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXRlbSBub3QgZWRpdGFibGUgcmV0dXJucyBlbXB0eSBtZW51JywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5jYW5DaGFuZ2VEZWNpc2lvbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5NaXRpZ2F0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWRdKSxcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5jcmVhdGVNZW51SXRlbXMoaXRlbSwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvdXIgZGVjaXNpb25zIHJldHVybnMgZm91ciBhY3Rpb25zLCBtaW51cyBjdXJyZW50IHN0YXR1cyBwbHVzIFVuZG8nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZF0pLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBkZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0ubmFtZSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX3VuZG8nKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMV0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzJdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1syXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX21pdGlnYXRlJyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1szXS5uYW1lKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbM10ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9kZWxlZ2F0ZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdDaGFsbGVuZ2VkLCBjcmVhdGVNZW51SXRlbXMoaXRlbSwgZGVjaXNpb25zKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gQXZhaWxhYmxlIGRlY2lzaW9ucyBkb24ndCBtYXR0ZXIgaGVyZSBzaW5jZSB3ZSBwYXNzIGl0IGluIHRoZSB0ZXN0ZWQgQVBJLlxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3VyIGRlY2lzaW9ucyByZXR1cm5zIHR3byBhY3Rpb25zLCBtaW51cyBjdXJyZW50IHN0YXR1cyBhbmQgZGVsZWdhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZF0pLFxuICAgICAgICAgICAgICAgIGFjdGlvbnMgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBkZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0ubmFtZSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1swXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX3JlbWVkaWF0ZScpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0uY2hhbGxlbmdlQWN0aW9uKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuRGVsZWdhdGlvbkFjdGlvbi5BY2NlcHQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0ub25lU3RlcENoYWxsZW5nZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1sxXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX21pdGlnYXRlJyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1sxXS5jaGFsbGVuZ2VBY3Rpb24pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLkFjY2VwdCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1sxXS5vbmVTdGVwQ2hhbGxlbmdlKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ0RlbGVnYXRlZCwgY3JlYXRlTWVudUl0ZW1zKGl0ZW0sIGRlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtIDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEF2YWlsYWJsZSBkZWNpc2lvbnMgZG9uJ3QgbWF0dGVyIGhlcmUgc2luY2Ugd2UgcGFzcyBpdCBpbiB0aGUgdGVzdGVkIEFQSS5cbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbSh1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuRGVsZWdhdGVkXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyZWUgZGVjaXNpb25zIHJldHVybnMgdGhyZWUgYWN0aW9ucywgbWludXMgY3VycmVudCBzdGF0dXMgcGx1cyBVbmRvJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWRdKSxcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5jcmVhdGVNZW51SXRlbXMoaXRlbSwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzBdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMF0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl91bmRvJyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1sxXS5uYW1lKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uc1sxXS5wcm9tcHRLZXkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX2FwcHJvdmUnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25zWzJdLm5hbWUpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbnNbMl0ucHJvbXB0S2V5KS50b0VxdWFsKCdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2l0ZW0gbm90IGVkaXRhYmxlIHJldHVybnMgZW1wdHkgbWVudScsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2FuQ2hhbmdlRGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkXSksXG4gICAgICAgICAgICAgICAgYWN0aW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuY3JlYXRlTWVudUl0ZW1zKGl0ZW0sIGRlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1dhaXRpbmdSZXZpZXcsIGNyZWF0ZU1lbnVJdGVtcyhpdGVtLCBkZWNpc2lvbnMpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSA7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBBdmFpbGFibGUgZGVjaXNpb25zIGRvbid0IG1hdHRlciBoZXJlIHNpbmNlIHdlIHBhc3MgaXQgaW4gdGhlIHRlc3RlZCBBUEkuXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0odW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5XYWl0aW5nUmV2aWV3XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaXRlbS5yZXF1aXJlc1JldmlldyA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjaGFsbGVuZ2UgcGhhc2Ugc3BlY2lhbCBjYXNlIHNob3VsZCByZXR1cm4gZW1wdHkgbWVudScsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2FuQ2hhbmdlRGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEZWNpc2lvbnMgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgIGJ1dHRvbkRlY2lzaW9ucyA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UuY3JlYXRlTWVudUl0ZW1zKGl0ZW0sIGF2YWlsYWJsZURlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uRGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwb3BOZXh0QXZhaWxhYmxlRGVjaXNpb24oYXZhaWxhYmxlRGVjaXNpb25zLCBleGNsdWRlZERlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdudWxsIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBleGNsdWRlZCA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZURlY2lzaW9uKG51bGwsIGV4Y2x1ZGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdlbXB0eSBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhjbHVkZWQgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVEZWNpc2lvbihuZXcgU2V0KCksIGV4Y2x1ZGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdudWxsIGV4Y2x1ZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZURlY2lzaW9uKGF2YWlsYWJsZSwgbnVsbCk7XG4gICAgICAgICAgICBleHBlY3QocG9wcGVkKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCk7XG4gICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVEZWNpc2lvbihhdmFpbGFibGUsIG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9CZU51bGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VtcHR5IGV4Y2x1ZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkID0gbmV3IFNldCgpLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZURlY2lzaW9uKGF2YWlsYWJsZSwgZXhjbHVkZWQpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpO1xuICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlRGVjaXNpb24oYXZhaWxhYmxlLCBleGNsdWRlZCk7XG4gICAgICAgICAgICBleHBlY3QocG9wcGVkKS50b0JlTnVsbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndmVyaWZ5IGxpc3QgaW4gY2Fub25pY2FsIG9yZGVyIGFuZCBleGNsdXNpb25zIGFyZSBleGx1ZGVkLCB2ZXJpZnkgcG9wcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVkID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVEZWNpc2lvbihhdmFpbGFibGUsIGV4Y2x1ZGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZURlY2lzaW9uKGF2YWlsYWJsZSwgZXhjbHVkZWQpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCk7XG4gICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVEZWNpc2lvbihhdmFpbGFibGUsIGV4Y2x1ZGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCk7XG4gICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVEZWNpc2lvbihhdmFpbGFibGUsIGV4Y2x1ZGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgncG9wTmV4dEF2YWlsYWJsZU9wcG9zaXRlRGVjaXNpb24ob3JpZ2luYWxTdGF0dXMsIGF2YWlsYWJsZURlY2lzaW9ucyknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdudWxsIG9yaWdpbmFsU3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZU9wcG9zaXRlRGVjaXNpb24obnVsbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdudWxsIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZU9wcG9zaXRlRGVjaXNpb24ob3JpZ2luYWwsIG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9CZU51bGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VtcHR5IGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZU9wcG9zaXRlRGVjaXNpb24ob3JpZ2luYWwsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICBleHBlY3QocG9wcGVkKS50b0JlTnVsbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXBwcm92ZWQgYmVjb21lcyByZW1lZGlhdGVkIHdoaWNoIGlzIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBhdmFpbGFibGUgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSksXG4gICAgICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlT3Bwb3NpdGVEZWNpc2lvbihvcmlnaW5hbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXBwcm92ZWQgYnV0IHJlbWVkaWF0ZWQgbm90IGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBhdmFpbGFibGUgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkXSksXG4gICAgICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlT3Bwb3NpdGVEZWNpc2lvbihvcmlnaW5hbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdtaXRpZ2F0ZWQgYmVjb21lcyByZW1lZGlhdGVkIHdoaWNoIGlzIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5NaXRpZ2F0ZWQsXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgIHBvcHBlZCA9IGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UucG9wTmV4dEF2YWlsYWJsZU9wcG9zaXRlRGVjaXNpb24ob3JpZ2luYWwsIGF2YWlsYWJsZSk7XG4gICAgICAgICAgICBleHBlY3QocG9wcGVkKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ21pdGlnYXRlZCBidXQgcmVtZWRpYXRlZCBub3QgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsID0gQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICBhdmFpbGFibGUgPSBuZXcgU2V0KFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkXSksXG4gICAgICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlT3Bwb3NpdGVEZWNpc2lvbihvcmlnaW5hbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1lZGlhdGVkIGJlY29tZXMgYXBwcm92ZWQgaWYgaXRzIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVPcHBvc2l0ZURlY2lzaW9uKG9yaWdpbmFsLCBhdmFpbGFibGUpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVtZWRpYXRlZCBiZWNvbWVzIG1pdGlnYXRlZCBpZiBhcHByb3ZlZCBub3QgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsID0gQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVPcHBvc2l0ZURlY2lzaW9uKG9yaWdpbmFsLCBhdmFpbGFibGUpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlbWVkaWF0ZWQgYnV0IG5vIHZhbGlkIG9wcG9zaXRlIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkXSksXG4gICAgICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlT3Bwb3NpdGVEZWNpc2lvbihvcmlnaW5hbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXZva2VhY2NvdW50IGJlY29tZXMgYXBwcm92ZWQgaWYgaXRzIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZXZva2VBY2NvdW50LFxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVPcHBvc2l0ZURlY2lzaW9uKG9yaWdpbmFsLCBhdmFpbGFibGUpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV2b2tlYWNjb3VudCBiZWNvbWVzIG1pdGlnYXRlZCBpZiBhcHByb3ZlZCBub3QgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9yaWdpbmFsID0gQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJldm9rZUFjY291bnQsXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gbmV3IFNldChbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWRdKSxcbiAgICAgICAgICAgICAgICBwb3BwZWQgPSBjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLnBvcE5leHRBdmFpbGFibGVPcHBvc2l0ZURlY2lzaW9uKG9yaWdpbmFsLCBhdmFpbGFibGUpO1xuICAgICAgICAgICAgZXhwZWN0KHBvcHBlZCkudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Jldm9rZWFjY291bnQgYnV0IG5vIHZhbGlkIG9wcG9zaXRlIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZXZva2VBY2NvdW50LFxuICAgICAgICAgICAgICAgIGF2YWlsYWJsZSA9IG5ldyBTZXQoW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkXSksXG4gICAgICAgICAgICAgICAgcG9wcGVkID0gY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZS5wb3BOZXh0QXZhaWxhYmxlT3Bwb3NpdGVEZWNpc2lvbihvcmlnaW5hbCwgYXZhaWxhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChwb3BwZWQpLnRvQmVOdWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
