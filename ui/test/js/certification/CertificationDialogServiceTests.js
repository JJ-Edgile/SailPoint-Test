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

            describe('certificationDialogService', function () {

                var CertificationDecision = undefined,
                    CertificationItem = undefined,
                    certificationDataService = undefined,
                    certificationDialogService = undefined,
                    commentService = undefined,
                    $q = undefined,
                    $scope = undefined,
                    cert = undefined,
                    certItem = undefined,
                    certificationTestData = undefined,
                    CertificationActionStatus = undefined,
                    spModal = undefined;

                function getStatus(status) {
                    return new CertificationActionStatus({
                        status: status
                    });
                }

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function ($rootScope, _CertificationDecision_, _certificationTestData_, _certificationDataService_, _certificationDialogService_, _commentService_, _$q_, _CertificationItem_, Certification, CertificationConfig, _CertificationActionStatus_, _spModal_) {
                    certificationDataService = _certificationDataService_;
                    CertificationDecision = _CertificationDecision_;
                    certificationDialogService = _certificationDialogService_;
                    CertificationItem = _CertificationItem_;
                    $q = _$q_;
                    commentService = _commentService_;
                    $scope = $rootScope.$new();
                    certificationTestData = _certificationTestData_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    spModal = _spModal_;

                    // Create some data to test with.
                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    certItem = new CertificationItem(certificationTestData.CERT_ITEMS[1]);

                    // Initialize the data service with a cert.
                    certificationDataService.initialize(cert);

                    // Setup the config in the service.
                    certificationDataService.initializeConfiguration(new CertificationConfig({
                        statusesRequiringComments: ['Mitigated'],
                        mitigationExpirationDate: new Date(),
                        useLinkAttributeValueForRevocationModification: true
                    }));
                }));

                function testDialogRequired(certItem, status, expectRequired) {
                    var showFunction = undefined;
                    certificationDialogService.getDialog(certItem, status).then(function (returnedShowFunc) {
                        showFunction = returnedShowFunc;
                    });
                    $scope.$apply();
                    expect(!!showFunction).toEqual(expectRequired);
                }

                function testCertificationDecision(decision, certItem, status, comments) {
                    expect(decision).toBeDefined();
                    expect(decision.getItem()).toEqual(certItem);
                    expect(decision.status).toEqual(status);
                    expect(decision.comments).toEqual(comments);
                }

                describe('getDialog()', function () {

                    beforeEach(function () {
                        spyOn(spModal, 'open').and.callThrough();
                    });

                    function getDialog(spyMethod) {
                        if (spyMethod) {
                            spyOn(certificationDialogService, spyMethod).and.returnValue($q.when(true));
                        }
                        var dialog = undefined;
                        certificationDialogService.getDialog(certItem, getStatus('Approved')).then(function (showFunc) {
                            return dialog = showFunc;
                        });
                        $scope.$apply();
                        return dialog;
                    }

                    function testDialog(spyMethod) {
                        var dialog = getDialog(spyMethod);
                        expect(dialog).not.toBeUndefined();
                        dialog();
                    }

                    it('returns comment dialog if comments are required', function () {
                        spyOn(commentService, 'openCommentDialog').and.callThrough();
                        testDialog('isCommentDialogRequired');
                        expect(commentService.openCommentDialog).toHaveBeenCalled();
                    });

                    it('returns policy violation dialog if item is a policy violation', function () {
                        spyOn(certificationDialogService, 'showViolationRevocationDialog');
                        testDialog('isPolicyViolationRevocation');
                        expect(certificationDialogService.showViolationRevocationDialog).toHaveBeenCalled();
                    });

                    it('returns non-policy violation revocation dialog if it is revocation with summary', function () {
                        spyOn(certificationDialogService, 'showNonViolationRevocationDialog');
                        testDialog('isRevocationWithSummary');
                        expect(certificationDialogService.showNonViolationRevocationDialog).toHaveBeenCalled();
                    });

                    it('returns blocked by parent dialog if there is parent decision', function () {
                        spyOn(certificationDialogService, 'showBlockedByParentDialog');
                        testDialog('isBlockedByParentDecision');
                        expect(certificationDialogService.showBlockedByParentDialog).toHaveBeenCalled();
                    });

                    it('returns undefined if no dialogs are enabled', function () {
                        var dialog = getDialog(null);
                        expect(dialog).toBeUndefined();
                    });

                    it('does not call further dialog checks if a dialog is shown', function () {
                        spyOn(certificationDialogService, 'isPolicyViolationRevocation');
                        testDialog('isCommentDialogRequired');
                        expect(certificationDialogService.isPolicyViolationRevocation).not.toHaveBeenCalled();
                    });

                    it('Returns allow exceptions dialog', function () {
                        spyOn(certificationDialogService, 'showAllowExceptionDialog');
                        testDialog('isAllowExceptionDialogRequired');
                        expect(certificationDialogService.showAllowExceptionDialog).toHaveBeenCalled();
                    });
                });

                it('comment dialog resolves with a cert decision with comments', function () {
                    // Setup some spies to show the dialog and resolve it with a comment.
                    spyOn(certificationDialogService, 'isCommentDialogRequired').and.returnValue($q.when(true));
                    var commentText = 'blah blah';
                    spyOn(commentService, 'openCommentDialog').and.callFake(function () {
                        return $q.when(commentText);
                    });

                    // Make this a Challenged item so we can test oneStep Accept
                    certItem.summaryStatus = CertificationItem.Status.Challenged;

                    // Open the comment dialog.
                    var decision = undefined;
                    certificationDialogService.showCommentDialog(certItem, getStatus('Approved')).then(function (commentDecision) {
                        decision = commentDecision;
                    });
                    $scope.$apply();
                    expect(commentService.openCommentDialog).toHaveBeenCalled();

                    // Check that the CertificationDecision is correct.
                    testCertificationDecision(decision, certItem, 'Approved', commentText);
                    expect(decision.oneStepChallenge).toEqual(true);
                    expect(decision.challengeAction).toEqual(CertificationActionStatus.ChallengeAction.Accept);
                });

                describe('getChallengeCommentIfRequired', function () {

                    it('opens comment dialog when item is in challenged state', function () {
                        spyOn(commentService, 'openCommentDialog').and.callThrough();

                        certItem.summaryStatus = CertificationItem.Status.Challenged;

                        certificationDialogService.getChallengeCommentIfRequired(certItem, 'Accept');

                        expect(commentService.openCommentDialog).toHaveBeenCalled();
                    });

                    it('returns promise that resolves with null when item is not in challenged state', function () {
                        certificationDialogService.getChallengeCommentIfRequired(certItem, 'Accept').then(function (nullpromise) {
                            expect(nullpromise).toBe(null);
                        });
                    });
                });

                describe('showCommentDialog', function () {

                    it('opens comment dialog with comments and readOnly', function () {
                        spyOn(commentService, 'openCommentDialog').and.callThrough();

                        certItem.summaryStatus = CertificationItem.Status.Challenged;
                        var comment = 'this is a comment',
                            existingDecision = { 'comments': comment };
                        certificationDialogService.showCommentDialog(certItem, 'Approved', existingDecision, true);

                        expect(commentService.openCommentDialog).toHaveBeenCalledWith(null, null, comment, true);
                    });
                });

                describe('isCommentDialogRequired', function () {
                    var requiresComments = undefined;

                    beforeEach(function () {
                        spyOn(certificationDataService.getConfiguration(), 'doesStatusRequireComment').and.returnValue(requiresComments);
                    });

                    it('is not required for a status not requiring a comment', function () {
                        requiresComments = true;
                        testDialogRequired(certItem, getStatus('Approved'), false);
                    });

                    it('is required for a status requiring a comment', function () {
                        requiresComments = false;
                        testDialogRequired(certItem, getStatus('Approved'), true);
                    });
                });

                describe('isRevocation()', function () {
                    it('returns true for the remediated status', function () {
                        var isIt = certificationDialogService.isRevocation(new CertificationActionStatus({ status: 'Remediated' }));
                        expect(isIt).toEqual(true);
                    });

                    it('returns false for statuses other than remediated', function () {
                        var isIt = certificationDialogService.isRevocation(new CertificationActionStatus({ status: 'Approved' }));
                        expect(isIt).toEqual(false);
                    });
                });

                describe('checkPolicyViolationRevocation()', function () {
                    function testPolicyViolation(type, decision, expectIt) {
                        certItem.type = type;
                        var isIt = certificationDialogService.checkPolicyViolationRevocation(certItem, new CertificationActionStatus({
                            status: decision,
                            delegationReviewAction: CertificationActionStatus.DelegationAction.Reject
                        }));
                        expect(isIt).toEqual(expectIt);
                    }

                    it('returns true for a policy violation item with a revocation status', function () {
                        testPolicyViolation(CertificationItem.Type.PolicyViolation, 'Remediated', true);
                    });

                    it('returns false for a revoke of a non-policy violation', function () {
                        testPolicyViolation(CertificationItem.Type.Entitlement, 'Remediated', false);
                    });

                    it('returns false for a non-revoke of a policy violation', function () {
                        testPolicyViolation(CertificationItem.Type.PolicyViolation, 'Approved', false);
                    });
                });

                describe('isPolicyViolationRevocation()', function () {
                    var checkValue = false;

                    beforeEach(function () {
                        checkValue = false;
                        spyOn(certificationDialogService, 'checkPolicyViolationRevocation').and.callFake(function () {
                            return checkValue;
                        });
                    });

                    it('is not required when checkPolicyViolationRevocation returns false', function () {
                        checkValue = false;
                        testDialogRequired(certItem, getStatus('Remediated'), false);
                    });

                    it('is required when checkPolicyViolationRevocation returns true', function () {
                        checkValue = true;
                        testDialogRequired(certItem, getStatus('Remediated'), true);
                    });
                });

                describe('checkRevocationWithSummary()', function () {
                    it('returns false if not revocation', function () {
                        expect(certificationDialogService.checkRevocationWithSummary(certItem, new CertificationActionStatus({ status: 'Approved' }))).toEqual(false);
                    });

                    it('returns false if revocation but summary not needed', function () {
                        spyOn(certificationDataService, 'needsRemediationSummary').and.returnValue(false);
                        expect(certificationDialogService.checkRevocationWithSummary(certItem, new CertificationActionStatus({ status: 'Remediated' }))).toEqual(false);
                    });

                    it('returns false if revocation with summary but is a rejected challenge', function () {
                        var status = new CertificationActionStatus({ status: 'Remediated', challengeAction: 'Reject' });
                        spyOn(certificationDataService, 'needsRemediationSummary').and.returnValue(true);
                        expect(certificationDialogService.checkRevocationWithSummary(certItem, status)).toEqual(false);
                    });

                    it('returns true if revocation and summary is needed', function () {
                        spyOn(certificationDataService, 'needsRemediationSummary').and.returnValue(true);
                        expect(certificationDialogService.checkRevocationWithSummary(certItem, new CertificationActionStatus({ status: 'Remediated' }))).toEqual(true);
                    });
                });

                describe('isRevocationWithSummary()', function () {
                    var checkValue = false;

                    beforeEach(function () {
                        checkValue = false;
                        spyOn(certificationDialogService, 'checkRevocationWithSummary').and.callFake(function () {
                            return checkValue;
                        });
                    });

                    it('is not required when checkAllowExceptionDialogRequired returns false', function () {
                        checkValue = false;
                        testDialogRequired(certItem, getStatus('Remediated'), false);
                    });

                    it('is required when checkAllowExceptionDialogRequired returns true', function () {
                        checkValue = true;
                        testDialogRequired(certItem, getStatus('Remediated'), true);
                    });
                });

                describe('isBlockedByParentDecision()', function () {
                    function createActionStatus(status, delegationReviewAction) {
                        return {
                            status: status,
                            name: status,
                            delegationReviewAction: delegationReviewAction
                        };
                    }

                    function testBlockedByParent(dependentDecision, status, sourceDecisions, expectIt, isChallenge) {
                        var testIt = undefined;
                        certItem.decisionStatus.dependentDecision = dependentDecision;
                        certItem.requiresChallengeDecision = isChallenge;
                        status.challengeAction = !!isChallenge ? 'Reject' : undefined;
                        spyOn(certificationDataService.decisions, 'getSourceDecisions').and.returnValue(sourceDecisions);
                        certificationDialogService.isBlockedByParentDecision(certItem, status).then(function (isIt) {
                            testIt = isIt;
                        });
                        $scope.$apply();
                        expect(testIt).toEqual(expectIt);
                    }

                    it('returns true if the item decision status is dependent', function () {
                        testBlockedByParent(true, createActionStatus('Remediated'), null, true);
                    });

                    it('returns true if there are source decisions', function () {
                        testBlockedByParent(false, createActionStatus('Remediated'), [{}, {}], true);
                    });

                    it('returns false if there are no dependent decisions', function () {
                        testBlockedByParent(false, createActionStatus('Remediated'), null, false);
                    });

                    it('returns false if it is an Accept delegation review', function () {
                        testBlockedByParent(true, createActionStatus('Remediated', 'Accept'), null, false);
                    });

                    it('returns false if it is a Reject delegation review', function () {
                        testBlockedByParent(true, createActionStatus('Remediated', 'Reject'), null, true);
                    });

                    it('returns false if item decision status is dependent, but is challenged', function () {
                        testBlockedByParent(true, createActionStatus('Remediated'), null, false, true);
                    });
                });

                describe('showViolationRevocationDialog()', function () {
                    var certificationService = undefined,
                        remediationAdviceResult = undefined;

                    beforeEach(inject(function (_certificationService_, RemediationAdviceResult) {
                        certificationService = _certificationService_;
                        spyOn(certificationService, 'getViolationRemediationAdvice').and.callFake(function () {
                            return $q.when(remediationAdviceResult);
                        });

                        spyOn(certificationDialogService, 'showRevocationDialog').and.callFake(function () {
                            return $q.when({});
                        });
                        remediationAdviceResult = new RemediationAdviceResult(angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT));
                    }));

                    it('gets the remediation advice and calls through to showRevocationDialog', function () {
                        var existingDecision = { status: 'Remediated' },
                            readOnly = true;
                        certificationDialogService.showViolationRevocationDialog(certItem, getStatus('Remediated'), existingDecision, readOnly);
                        $scope.$apply();
                        expect(certificationService.getViolationRemediationAdvice).toHaveBeenCalled();
                        expect(certificationDialogService.showRevocationDialog).toHaveBeenCalledWith(certItem, getStatus('Remediated'), remediationAdviceResult.advice, remediationAdviceResult.summary, existingDecision, readOnly);
                    });
                });

                describe('showNonViolationRevocationDialog()', function () {
                    var certificationService = undefined,
                        remediationAdviceResult = undefined;

                    beforeEach(inject(function (_certificationService_, RemediationAdviceResult) {
                        certificationService = _certificationService_;
                        spyOn(certificationService, 'getRemediationSummary').and.callFake(function () {
                            return $q.when(remediationAdviceResult.summary);
                        });

                        spyOn(certificationDialogService, 'showRevocationDialog').and.callFake(function () {
                            return $q.when({});
                        });
                        remediationAdviceResult = new RemediationAdviceResult(angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT));
                    }));

                    it('gets the remediation summary and calls through to showRevocationDialog', function () {
                        var existingDecision = { status: 'Remediated' },
                            readOnly = true;
                        certificationDialogService.showNonViolationRevocationDialog(certItem, getStatus('Remediated'), existingDecision, readOnly);
                        $scope.$apply();
                        expect(certificationService.getRemediationSummary).toHaveBeenCalled();
                        expect(certificationDialogService.showRevocationDialog).toHaveBeenCalledWith(certItem, getStatus('Remediated'), undefined, remediationAdviceResult.summary, existingDecision, readOnly);
                    });
                });

                describe('showRevocationDialog()', function () {
                    var remediationDialogService = undefined,
                        CertificationRemediationDialogContext = undefined,
                        RemediationDialogResult = undefined,
                        remediationAdvice = undefined,
                        remediationSummary = undefined;

                    beforeEach(inject(function (_remediationDialogService_, _CertificationRemediationDialogContext_, _RemediationDialogResult_) {
                        remediationDialogService = _remediationDialogService_;
                        CertificationRemediationDialogContext = _CertificationRemediationDialogContext_;
                        RemediationDialogResult = _RemediationDialogResult_;

                        remediationAdvice = angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT.advice);
                        remediationSummary = angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT.summary);
                    }));

                    function spyOnRemediationDialogServiceAndTest(reject, result, existingDecision, readOnly) {
                        spyOn(remediationDialogService, 'showRevocationDialog').and.callFake(function () {
                            return reject ? $q.reject() : $q.when(result);
                        });
                        return certificationDialogService.showRevocationDialog(certItem, getStatus('Remediated'), remediationAdvice, remediationSummary, existingDecision, readOnly);
                    }

                    it('calls remediationDialogService to show the dialog', function () {
                        spyOnRemediationDialogServiceAndTest();
                        expect(remediationDialogService.showRevocationDialog).toHaveBeenCalled();
                    });

                    it('sets the values in the RemediationDialogContext', function () {
                        var readOnly = true;
                        spyOnRemediationDialogServiceAndTest(false, {}, undefined, readOnly);
                        var args = remediationDialogService.showRevocationDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        var context = args[2];
                        expect(context.readOnly).toEqual(readOnly);
                        // Set in top level configuration initialization
                        expect(context.useLinkAttributeValueForRevocationModification).toEqual(true);
                    });

                    it('passes an existing decision as a RemediationDialogResult in the dialog context', function () {
                        var existingDecision = {
                            recipientSummary: {
                                id: '1234',
                                name: 'Bob'
                            },
                            comments: 'hello',
                            remediationDetails: [],
                            revokedRoles: ['role1', 'role2'],
                            selectedViolationEntitlements: {}
                        },
                            expectedExistingResult = new RemediationDialogResult(existingDecision);
                        spyOnRemediationDialogServiceAndTest(false, {}, existingDecision);
                        var args = remediationDialogService.showRevocationDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        var context = args[2];
                        expect(context.existingResult).toEqual(expectedExistingResult);
                    });

                    it('returns rejected promise if read only', function () {
                        var rejected = undefined;
                        spyOnRemediationDialogServiceAndTest(true, undefined, undefined, true).then(function () {
                            rejected = false;
                        }, function () {
                            rejected = true;
                        });
                        $scope.$apply();
                        expect(rejected).toEqual(true);
                    });

                    it('returns rejected promise with reason if dialog is not needed for existing result', function () {
                        var rejected = undefined,
                            rejectedReason = undefined;
                        spyOnRemediationDialogServiceAndTest(false, undefined, {}).then(function () {
                            rejected = false;
                        }, function (reason) {
                            rejected = true;
                            rejectedReason = reason;
                        });
                        $scope.$apply();
                        expect(rejected).toEqual(true);
                        expect(rejectedReason).toBeDefined();
                    });

                    it('returns resolved promise with decision if dialog is not needed for new decision', function () {
                        var rejected = undefined,
                            resolveResult = undefined;
                        spyOnRemediationDialogServiceAndTest(false, undefined).then(function (result) {
                            rejected = false;
                            resolveResult = result;
                        }, function (reason) {
                            rejected = true;
                        });
                        $scope.$apply();
                        expect(rejected).toEqual(false);
                        expect(resolveResult instanceof CertificationDecision).toEqual(true);
                    });

                    it('applies RemediationDialogResult to decision if dialog is needed', function () {
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

                        certItem.summaryStatus = CertificationItem.Status.Challenged;
                        spyOnRemediationDialogServiceAndTest(false, remediationResult).then(function (result) {
                            decision = result;
                        });
                        $scope.$apply();
                        expect(decision.recipient).toEqual(remediationResult.recipientSummary.id);
                        expect(decision.recipientSummary).toEqual(remediationResult.recipientSummary);
                        expect(decision.comments).toEqual(remediationResult.comments);
                        expect(decision.revokedRoles).toEqual(remediationResult.revokedRoles);
                        expect(decision.selectedViolationEntitlements).toEqual(remediationResult.selectedViolationEntitlements);
                        expect(decision.remediationDetails).toEqual(remediationResult.remediationDetails);
                        expect(decision.oneStepChallenge).toEqual(true);
                        expect(decision.challengeAction).toEqual(CertificationActionStatus.ChallengeAction.Accept);
                    });
                });

                describe('showBlockedByParentDialog()', function () {
                    it('opens a dialog', function () {
                        spyOn(spModal, 'open').and.callThrough();
                        certificationDialogService.showBlockedByParentDialog(certItem);
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('always returns rejected promise', function () {
                        var promiseResolved = undefined;
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.when()
                        });
                        certificationDialogService.showBlockedByParentDialog(certItem).then(function () {
                            return promiseResolved = true;
                        })['catch'](function () {
                            return promiseResolved = false;
                        });
                        $scope.$apply();
                        expect(promiseResolved).toEqual(false);
                    });
                });

                describe('showCertificationDelegationDialog()', function () {
                    var certificationService = undefined,
                        description = 'Certify the Production SOD-893 violation on \'Donna Scott\'',
                        itemDecision = {
                        recipient: { id: '1234' },
                        comments: 'dfdeere',
                        description: 'some description'
                    };

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;
                        spyOn(certificationService, 'getDelegationDescription').and.callFake(function () {
                            return $q.when(description);
                        });
                        spyOn(certificationDialogService, 'showDelegationDialog').and.returnValue({
                            result: $q.when(itemDecision)
                        });
                    }));

                    it('creates an item decision', function () {
                        spyOn(CertificationDecision, 'createItemDecision');
                        certificationDialogService.showCertificationDelegationDialog(certItem, getStatus('Remediated'));
                        $scope.$apply();
                        expect(CertificationDecision.createItemDecision).toHaveBeenCalled();
                    });

                    it('gets a description and calls showDelegationDialog', function () {
                        certificationDialogService.showCertificationDelegationDialog(certItem, getStatus('Remediated'));
                        $scope.$apply();
                        expect(certificationService.getDelegationDescription).toHaveBeenCalled();
                        expect(certificationDialogService.showDelegationDialog).toHaveBeenCalled();
                    });

                    it('returns promise resolved with item decision', function () {
                        var decisionPromise = certificationDialogService.showCertificationDelegationDialog(certItem, getStatus('Remediated'));
                        $scope.$apply();

                        decisionPromise.then(function (decision) {
                            expect(decision.recipient).toEqual(itemDecision.recipient.id);
                            expect(decision.comments).toEqual(itemDecision.comments);
                            expect(decision.description).toEqual(itemDecision.description);
                        });
                    });
                });

                describe('showCertificationReassignDialog()', function () {
                    var certificationService = undefined,
                        bulkDecision = {
                        recipient: { id: '1234' },
                        comments: 'adfadsfasd',
                        description: 'adsfasdfasd'
                    };

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;

                        spyOn(certificationDialogService, 'showDelegationDialog').and.returnValue($q.when(bulkDecision));

                        // mock out decision store functions
                        certificationDataService.decisions = {
                            removeBulkOverlaps: function () {},
                            removeLineItemOverlaps: function () {}
                        };
                    }));

                    function setupSaveDecisionsSpy(reject) {
                        spyOn(certificationService, 'saveDecisions').and.returnValue(reject ? $q.reject({ status: 409 }) : $q.when({ data: { object: {} } }));
                    }

                    it('creates a bulk decision', function () {
                        setupSaveDecisionsSpy();
                        spyOn(CertificationDecision, 'createBulkDecision');
                        certificationDialogService.showCertificationReassignDialog(certItem);
                        $scope.$apply();
                        expect(CertificationDecision.createBulkDecision).toHaveBeenCalled();
                    });

                    it('calls showDelegationDialog', function () {
                        setupSaveDecisionsSpy();
                        certificationDialogService.showCertificationReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationDialogService.showDelegationDialog).toHaveBeenCalled();
                    });

                    it('calls saveDecisions', function () {
                        setupSaveDecisionsSpy();
                        certificationDialogService.showCertificationReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                    });

                    it('shows retry dialog if cert is locked', function () {
                        setupSaveDecisionsSpy(true);
                        spyOn(certificationDialogService, 'showRetryDialog').and.returnValue($q.when());
                        certificationDialogService.showCertificationReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationDialogService.showRetryDialog).toHaveBeenCalled();
                    });

                    it('shows error modal if saveDecisions returns error', function () {
                        spyOn(certificationService, 'saveDecisions').and.returnValue($q.when({
                            data: {
                                errors: ['Can\'t self certify'],
                                status: 'error'
                            }
                        }));

                        spyOn(spModal, 'open').and.callThrough();
                        certificationDialogService.showCertificationReassignDialog(certItem);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('showCertificationEntityReassignDialog()', function () {
                    var certificationService = undefined,
                        bulkDecision = {
                        recipient: { id: '1234' },
                        comments: 'adfadsfasd',
                        description: 'adsfasdfasd'
                    };

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;

                        spyOn(certificationDialogService, 'showDelegationDialog').and.returnValue($q.when(bulkDecision));

                        // mock out decision store functions
                        certificationDataService.decisions = {
                            removeBulkOverlaps: function () {},
                            removeLineItemOverlaps: function () {}
                        };
                    }));

                    function setupSaveDecisionsSpy(reject) {
                        spyOn(certificationService, 'saveDecisions').and.returnValue(reject ? $q.reject({ status: 409 }) : $q.when({ data: { object: {} } }));
                    }

                    it('creates a bulk decision', function () {
                        setupSaveDecisionsSpy();
                        spyOn(CertificationDecision, 'createBulkDecision');
                        certificationDialogService.showCertificationEntityReassignDialog(certItem);
                        $scope.$apply();
                        expect(CertificationDecision.createBulkDecision).toHaveBeenCalled();
                    });

                    it('calls showDelegationDialog', function () {
                        setupSaveDecisionsSpy();
                        certificationDialogService.showCertificationEntityReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationDialogService.showDelegationDialog).toHaveBeenCalled();
                    });

                    it('calls saveDecisions', function () {
                        setupSaveDecisionsSpy();
                        certificationDialogService.showCertificationEntityReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                    });

                    it('shows retry dialog if cert is locked', function () {
                        setupSaveDecisionsSpy(true);
                        spyOn(certificationDialogService, 'showRetryDialog').and.returnValue($q.when());
                        certificationDialogService.showCertificationEntityReassignDialog(certItem);
                        $scope.$apply();
                        expect(certificationDialogService.showRetryDialog).toHaveBeenCalled();
                    });

                    it('shows error modal if saveDecisions returns error', function () {
                        spyOn(certificationService, 'saveDecisions').and.returnValue($q.when({
                            data: {
                                errors: ['Can\'t self certify'],
                                status: 'error'
                            }
                        }));

                        spyOn(spModal, 'open').and.callThrough();
                        certificationDialogService.showCertificationEntityReassignDialog(certItem);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('showCertificationEntityDelegationDialog()', function () {
                    var certificationService = undefined,
                        bulkDecision = {
                        recipient: { id: '1234' },
                        comments: 'adfadsfasd',
                        description: 'adsfasdfasd'
                    };

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;

                        spyOn(certificationDialogService, 'showDelegationDialog').and.returnValue($q.when(bulkDecision));

                        // mock out decision store functions
                        certificationDataService.decisions = {
                            removeBulkOverlaps: function () {},
                            removeLineItemOverlaps: function () {}
                        };
                    }));

                    function setupSaveDecisionsSpy(reject) {
                        spyOn(certificationService, 'saveDecisions').and.returnValue(reject ? $q.reject({ status: 409 }) : $q.when({ data: { object: {} } }));
                    }

                    it('creates a bulk decision', function () {
                        setupSaveDecisionsSpy();
                        spyOn(CertificationDecision, 'createBulkDecision');
                        certificationDialogService.showCertificationEntityDelegationDialog(certItem);
                        $scope.$apply();
                        expect(CertificationDecision.createBulkDecision).toHaveBeenCalled();
                    });

                    it('calls showDelegationDialog', function () {
                        setupSaveDecisionsSpy();
                        certificationDialogService.showCertificationEntityDelegationDialog(certItem, 3);
                        $scope.$apply();
                        expect(certificationDialogService.showDelegationDialog).toHaveBeenCalled();
                    });

                    it('calls saveDecisions', function () {
                        setupSaveDecisionsSpy(true);
                        certificationDialogService.showCertificationEntityDelegationDialog(certItem);
                        $scope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                        bulkDecision.status = CertificationActionStatus.DelegationAction;
                    });

                    it('shows retry dialog if cert is locked', function () {
                        setupSaveDecisionsSpy(true);
                        spyOn(certificationDialogService, 'showRetryDialog').and.returnValue($q.when());
                        certificationDialogService.showCertificationEntityDelegationDialog(certItem);
                        $scope.$apply();
                        expect(certificationDialogService.showRetryDialog).toHaveBeenCalled();
                    });

                    it('shows error modal if saveDecisions returns error', function () {
                        spyOn(certificationService, 'saveDecisions').and.returnValue($q.when({
                            data: {
                                errors: ['Can\'t self certify'],
                                status: 'error'
                            }
                        }));

                        spyOn(spModal, 'open').and.callThrough();
                        certificationDialogService.showCertificationEntityDelegationDialog(certItem);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('showDelegationDialog', function () {
                    beforeEach(function () {
                        spyOn(spModal, 'open').and.callThrough();
                    });

                    it('calls spModal open', function () {
                        certificationDialogService.showDelegationDialog('title');
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('showEntityDelegationRevokeConfirmationDialog()', function () {
                    var certificationService = undefined,
                        delegatedEntity = undefined;

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;
                        delegatedEntity = angular.copy(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0]);
                    }));

                    function setupSaveDecisionsSpy(reject) {
                        spyOn(certificationService, 'saveDecisions').and.returnValue(reject ? $q.reject({ status: 409 }) : $q.when({ data: { object: {} } }));
                    }

                    it('creates a bulk decision', function () {
                        spyOn(CertificationDecision, 'createBulkDecision');
                        certificationDialogService.showEntityDelegationRevokeConfirmationDialog(delegatedEntity);
                        $scope.$apply();
                        expect(CertificationDecision.createBulkDecision).toHaveBeenCalled();
                    });

                    it('shows confirm dialog', function () {
                        spyOn(spModal, 'confirm').and.callThrough();
                        certificationDialogService.showEntityDelegationRevokeConfirmationDialog(delegatedEntity);
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('calls saveDecisions', function () {
                        setupSaveDecisionsSpy();
                        spyOn(spModal, 'confirm').and.returnValue($q.when());
                        certificationDialogService.showEntityDelegationRevokeConfirmationDialog(delegatedEntity);
                        $scope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                    });

                    it('shows error modal if saveDecisions returns error', function () {
                        spyOn(certificationService, 'saveDecisions').and.returnValue($q.when({
                            data: {
                                errors: ['Can\'t self certify'],
                                status: 'error'
                            }
                        }));

                        spyOn(spModal, 'open').and.callThrough();
                        certificationDialogService.showEntityDelegationRevokeConfirmationDialog(delegatedEntity);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('isAllowExceptionDialogRequired()', function () {
                    var checkValue = false;

                    beforeEach(function () {
                        checkValue = false;
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue({
                            doesStatusRequireComment: function () {
                                return false;
                            }
                        });
                        spyOn(certificationDialogService, 'checkAllowExceptionDialogRequired').and.callFake(function () {
                            return checkValue;
                        });
                    });

                    it('is not required when checkAllowExceptionDialogRequired returns false', function () {
                        checkValue = false;
                        testDialogRequired(certItem, getStatus('Mitigated'), false);
                    });

                    it('is required when checkAllowExceptionDialogRequired returns true', function () {
                        checkValue = true;
                        testDialogRequired(certItem, getStatus('Mitigated'), true);
                    });
                });

                describe('checkAllowExceptionDialogRequired()', function () {
                    var config = {
                        allowExceptionPopup: undefined,
                        doesStatusRequireComment: function () {
                            return false;
                        }
                    };

                    beforeEach(function () {
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(config);
                    });

                    it('is not required when allowExceptionPopup is false', function () {
                        config.allowExceptionPopup = false;
                        expect(certificationDialogService.checkAllowExceptionDialogRequired(getStatus('Mitigated'))).toEqual(false);
                    });

                    it('is required when allowExceptionPopup is true and status is Mitigated', function () {
                        config.allowExceptionPopup = true;
                        expect(certificationDialogService.checkAllowExceptionDialogRequired(getStatus('Mitigated'))).toEqual(true);
                    });

                    it('is not required when decision status is not Mitigated', function () {
                        config.allowExceptionPopup = true;
                        expect(certificationDialogService.checkAllowExceptionDialogRequired(getStatus('Approved'))).toEqual(false);
                    });

                    it('is not required for accept delegation action', function () {
                        var status = new CertificationActionStatus({
                            delegationReviewAction: CertificationActionStatus.DelegationAction.Accept
                        });

                        expect(certificationDialogService.checkAllowExceptionDialogRequired(status)).toEqual(false);
                    });
                });

                describe('allow exception dialog', function () {
                    var dialogResult = undefined,
                        policyViolationDialogService = undefined,
                        SelectionModel = undefined,
                        CertificationTableScope = undefined;

                    beforeEach(inject(function (_policyViolationDialogService_, _SelectionModel_, _CertificationTableScope_) {
                        policyViolationDialogService = _policyViolationDialogService_;
                        SelectionModel = _SelectionModel_;
                        CertificationTableScope = _CertificationTableScope_;

                        dialogResult = {
                            mitigationExpirationDate: new Date(),
                            comments: 'allow this!'
                        };

                        spyOn(policyViolationDialogService, 'showAllowExceptionDialog').and.returnValue($q.when(dialogResult));
                    }));

                    it('calls through to PolicyViolationDialogService.showAllowExceptionDialog', function () {
                        certificationDialogService.showAllowExceptionDialog();
                        expect(policyViolationDialogService.showAllowExceptionDialog).toHaveBeenCalled();
                    });

                    it('sets the expiration date and comments on the decision', function () {
                        var decision = undefined;
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated')).then(function (result) {
                            return decision = result;
                        });
                        $scope.$apply();
                        expect(decision).toBeDefined();
                        expect(decision.mitigationExpirationDate).toEqual(dialogResult.mitigationExpirationDate);
                        expect(decision.comments).toEqual(dialogResult.comments);
                    });

                    it('sets the challenge properties on the decision if challenge item', function () {
                        certItem.summaryStatus = CertificationItem.Status.Challenged;
                        var decision = undefined;
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated')).then(function (result) {
                            return decision = result;
                        });
                        $scope.$apply();
                        expect(decision).toBeDefined();
                        expect(decision.oneStepChallenge).toEqual(true);
                        expect(decision.challengeAction).toEqual(CertificationActionStatus.ChallengeAction.Accept);
                    });

                    function testDialogConfigValue(name, value) {
                        $scope.$apply();
                        expect(policyViolationDialogService.showAllowExceptionDialog).toHaveBeenCalled();
                        var args = policyViolationDialogService.showAllowExceptionDialog.calls.mostRecent().args;
                        expect(args).toBeDefined();
                        expect(args.length).toEqual(1);
                        expect(args[0][name]).toEqual(value);
                    }

                    it('uses configuration for requireComments', function () {
                        // Mitigated is set as a status requiring comments in the certificationDataService
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'));
                        testDialogConfigValue('requireComments', true);
                    });

                    it('uses configuration for showExpirationDate', function () {
                        certificationDataService.certificationConfig.allowExceptionPopup = true;
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'));
                        testDialogConfigValue('showExpirationDate', true);
                    });

                    it('uses configuration for expiration date', function () {
                        var date = new Date();
                        certificationDataService.certificationConfig.mitigationExpirationDate = date;
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'));
                        testDialogConfigValue('expirationDate', date);
                    });

                    it('uses the expiration date and comments from existing decision', function () {
                        var existingDecision = {
                            comments: 'something else',
                            mitigationExpirationDate: new Date()
                        };
                        certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'), existingDecision);
                        testDialogConfigValue('comments', existingDecision.comments);
                        testDialogConfigValue('expirationDate', existingDecision.mitigationExpirationDate);
                    });

                    describe('showAllowExceptionDialog()', function () {
                        it('sets the display name based on the item display name', function () {
                            certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'));
                            testDialogConfigValue('displayName', certItem.displayName);
                        });

                        it('sets the display name based on the item description', function () {
                            delete certItem.displayName;
                            certificationDialogService.showAllowExceptionDialog(certItem, getStatus('Mitigated'));
                            testDialogConfigValue('displayName', certItem.description);
                        });
                    });

                    describe('showAllowExceptionDialogBulk', function () {
                        it('sets the bulkCount', function () {
                            certificationDialogService.showAllowExceptionDialogBulk(new SelectionModel(), new CertificationTableScope(), getStatus('Mitigated'), 25);
                            testDialogConfigValue('bulkCount', 25);
                            testDialogConfigValue('displayName', undefined);
                        });
                    });
                });

                describe('showRetryDialog', function () {
                    beforeEach(function () {
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.when({})
                        });
                    });

                    it('calls spModal open and the retry function', function () {
                        var testObj = {
                            retryFunc: function () {
                                return 'something';
                            }
                        };

                        spyOn(testObj, 'retryFunc');
                        certificationDialogService.showRetryDialog(testObj.retryFunc);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(testObj.retryFunc).toHaveBeenCalled();
                    });
                });

                describe('getDelegationRevokeConfirmationIfRequired()', function () {
                    var delegatedCert = undefined;

                    beforeEach(function () {
                        spyOn(spModal, 'confirm');
                        delegatedCert = new CertificationItem(certificationTestData.CERT_ITEMS[0]);
                        delegatedCert.summaryStatus = CertificationItem.Status.Delegated;
                    });

                    it('should call spModal.confirm() when action status is Approved', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Approved }));
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should call spModal.confirm() when action status is Acknowledged', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Acknowledged }));
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should call spModal.confirm() when action status is Mitigated', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Mitigated }));
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should call spModal.confirm() when action status is Remediated', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Remediated }));
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should call spModal.confirm() when action status is Cleared', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Cleared }));
                        $scope.$apply();
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('should not call spModal.confirm() when action status is Delegated', function () {
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Delegated }));
                        $scope.$apply();
                        expect(spModal.confirm).not.toHaveBeenCalled();
                    });

                    it('should not call spModal.confirm() when there is an existing decision.revokeDelegation', function () {
                        var existingDecision = CertificationDecision.createItemDecision(delegatedCert, getStatus('Approved'));
                        existingDecision.revokeDelegation = true;
                        certificationDialogService.getDelegationRevokeConfirmationIfRequired(delegatedCert, new CertificationActionStatus({ status: CertificationActionStatus.Name.Remediated }), existingDecision);
                        $scope.$apply();
                        expect(spModal.confirm).not.toHaveBeenCalled();
                    });
                });

                describe('showCertificationReminderEmailDialog()', function () {
                    var certificationService = undefined,
                        certId = 'cert1',
                        emailDialogService = undefined;

                    beforeEach(inject(function (_certificationService_, _emailDialogService_) {
                        certificationService = _certificationService_;
                        emailDialogService = _emailDialogService_;

                        spyOn(certificationService, 'getCertificationReminderEmailTemplate');
                        spyOn(certificationService, 'sendCertificationReminderEmail');
                        spyOn(emailDialogService, 'sendEmailWithDialog');
                    }));

                    it('should call emailDialogService.sendEmailWithDialog() with correct functions', function () {
                        certificationDialogService.showCertificationReminderEmailDialog(certId);
                        $scope.$apply();
                        expect(emailDialogService.sendEmailWithDialog).toHaveBeenCalled();

                        // Call the argument functions to make sure the get/send functions are correct
                        var args = emailDialogService.sendEmailWithDialog.calls.mostRecent().args;
                        args[0]();
                        expect(certificationService.getCertificationReminderEmailTemplate).toHaveBeenCalledWith(certId);
                        args[1]();
                        expect(certificationService.sendCertificationReminderEmail).toHaveBeenCalledWith(certId);
                    });
                });

                describe('confirmRevokeAccountDecisionChange', function () {
                    function testConfirmRevokeAccount(currentStatus, status, decision, isShow, isPassedDecision) {
                        spyOn(spModal, 'confirm').and.returnValue($q.when());
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(decision);
                        certItem.decisionStatus = {
                            currentState: {
                                name: currentStatus
                            }
                        };
                        certificationDialogService.confirmAccountDecisionChange([certItem], status, isPassedDecision ? decision : undefined);
                        if (isShow) {
                            expect(spModal.confirm).toHaveBeenCalled();
                        } else {
                            expect(spModal.confirm).not.toHaveBeenCalled();
                        }

                        if (!isPassedDecision) {
                            expect(certificationDataService.decisions.getEffectiveDecisionByItem).toHaveBeenCalledWith(certItem);
                        }
                    }

                    it('does not show if existing decision is not RevokeAccount', function () {
                        var decision = CertificationDecision.createItemDecision(certItem, getStatus('Approved'));
                        testConfirmRevokeAccount(undefined, getStatus('Approved'), decision, false, true);
                    });

                    it('shows dialog if existing decision is RevokeAccount', function () {
                        var decision = CertificationDecision.createItemDecision(certItem, getStatus('RevokeAccount'));
                        testConfirmRevokeAccount(undefined, getStatus('Approved'), decision, true, true);
                    });

                    it('does not show if saved decision is RevokeAccount with existing decision already made', function () {
                        var decision = CertificationDecision.createItemDecision(certItem, getStatus('Approved'));
                        testConfirmRevokeAccount('RevokeAccount', getStatus('Approved'), decision, false, true);
                    });

                    it('shows dialog if saved decision is RevokeAccount with no decision made', function () {
                        testConfirmRevokeAccount('RevokeAccount', getStatus('Approved'), undefined, true, true);
                    });

                    it('fetches the effective decision if not passed', function () {
                        testConfirmRevokeAccount('RevokeAccount', getStatus('Approved'), undefined, true, false);
                    });
                });

                describe('isDialogRequired()', function () {
                    function setupDialogRequired(spyResults) {
                        var methods = ['checkAllowExceptionDialogRequired', 'checkCommentDialogRequired', 'checkRevocationWithSummary', 'checkPolicyViolationRevocation'];
                        spyResults = spyResults || {};
                        methods.forEach(function (method) {
                            var returnValue = spyResults[method] || false;
                            spyOn(certificationDialogService, method).and.returnValue(returnValue);
                        });
                    }

                    it('returns false if none of the dialogs are required', function () {
                        setupDialogRequired();
                        expect(certificationDialogService.isDialogRequired(certItem, getStatus('Mitigated'))).toEqual(false);
                    });

                    it('returns true if allow exception dialog is required', function () {
                        setupDialogRequired({
                            'checkAllowExceptionDialogRequired': true
                        });
                        expect(certificationDialogService.isDialogRequired(certItem, getStatus('Mitigated'))).toEqual(true);
                    });

                    it('returns true if comment dialog is required', function () {
                        setupDialogRequired({
                            'checkCommentDialogRequired': true
                        });
                        expect(certificationDialogService.isDialogRequired(certItem, getStatus('Mitigated'))).toEqual(true);
                    });

                    it('returns true if remediation summary is required', function () {
                        setupDialogRequired({
                            'checkRevocationWithSummary': true
                        });
                        expect(certificationDialogService.isDialogRequired(certItem, getStatus('Revoked'))).toEqual(true);
                    });

                    it('returns true if violation revocation', function () {
                        setupDialogRequired({
                            'checkPolicyViolationRevocation': true
                        });
                        expect(certificationDialogService.isDialogRequired(certItem, getStatus('Revoked'))).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHVCQUF1QixVQUFVLFNBQVM7O0lBRXZIOztJQUVBLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsOEJBQThCLFlBQU07O2dCQUV6QyxJQUFJLHdCQUFxQjtvQkFBRSxvQkFBaUI7b0JBQUUsMkJBQXdCO29CQUFFLDZCQUEwQjtvQkFDOUYsaUJBQWM7b0JBQUUsS0FBRTtvQkFBRSxTQUFNO29CQUFFLE9BQUk7b0JBQUUsV0FBUTtvQkFBRSx3QkFBcUI7b0JBQUUsNEJBQXlCO29CQUM1RixVQUFPOztnQkFFWCxTQUFTLFVBQVUsUUFBUTtvQkFDdkIsT0FBTyxJQUFJLDBCQUEwQjt3QkFDakMsUUFBUTs7OztnQkFJaEIsV0FBVyxPQUFPLHFCQUFxQjs7O2dCQUd2QyxXQUFXLE9BQU8sVUFBQyxZQUFZLHlCQUF5Qix5QkFBeUIsNEJBQzlELDhCQUE4QixrQkFBa0IsTUFBTSxxQkFBcUIsZUFDM0UscUJBQXFCLDZCQUE2QixXQUFjO29CQUMvRSwyQkFBMkI7b0JBQzNCLHdCQUF3QjtvQkFDeEIsNkJBQTZCO29CQUM3QixvQkFBb0I7b0JBQ3BCLEtBQUs7b0JBQ0wsaUJBQWlCO29CQUNqQixTQUFVLFdBQVc7b0JBQ3JCLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1QixVQUFVOzs7b0JBR1YsT0FBTyxJQUFJLGNBQWMsc0JBQXNCO29CQUMvQyxXQUFXLElBQUksa0JBQWtCLHNCQUFzQixXQUFXOzs7b0JBR2xFLHlCQUF5QixXQUFXOzs7b0JBR3BD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b0JBQW9COzRCQUNoQixrQ0FBbUM7O3dCQUV2QyxPQUFPLDJCQUEyQixpQkFBaUIsVUFBVSxVQUFVLGFBQWEsUUFBUTs7Ozs7O0dBT3JHIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCBDZXJ0aWZpY2F0aW9uSXRlbSwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSxcclxuICAgICAgICBjb21tZW50U2VydmljZSwgJHEsICRzY29wZSwgY2VydCwgY2VydEl0ZW0sIGNlcnRpZmljYXRpb25UZXN0RGF0YSwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyxcclxuICAgICAgICBzcE1vZGFsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN0YXR1cyhzdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xyXG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMiAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKCRyb290U2NvcGUsIF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlXywgX2NvbW1lbnRTZXJ2aWNlXywgXyRxXywgX0NlcnRpZmljYXRpb25JdGVtXywgQ2VydGlmaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQ29uZmlnLCBfQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c18sIF9zcE1vZGFsXykgPT4ge1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbiA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgIGNvbW1lbnRTZXJ2aWNlID0gX2NvbW1lbnRTZXJ2aWNlXztcclxuICAgICAgICAkc2NvcGUgID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgY2VydGlmaWNhdGlvblRlc3REYXRhID0gX2NlcnRpZmljYXRpb25UZXN0RGF0YV87XHJcbiAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyA9IF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXztcclxuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XHJcbiAgICAgICAgY2VydEl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRfSVRFTVNbMV0pO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBkYXRhIHNlcnZpY2Ugd2l0aCBhIGNlcnQuXHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHRoZSBjb25maWcgaW4gdGhlIHNlcnZpY2UuXHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemVDb25maWd1cmF0aW9uKG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKHtcclxuICAgICAgICAgICAgc3RhdHVzZXNSZXF1aXJpbmdDb21tZW50czogWydNaXRpZ2F0ZWQnXSxcclxuICAgICAgICAgICAgbWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICB1c2VMaW5rQXR0cmlidXRlVmFsdWVGb3JSZXZvY2F0aW9uTW9kaWZpY2F0aW9uOiB0cnVlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3REaWFsb2dSZXF1aXJlZChjZXJ0SXRlbSwgc3RhdHVzLCBleHBlY3RSZXF1aXJlZCkge1xyXG4gICAgICAgIGxldCBzaG93RnVuY3Rpb247XHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuZ2V0RGlhbG9nKGNlcnRJdGVtLCBzdGF0dXMpLnRoZW4oKHJldHVybmVkU2hvd0Z1bmMpID0+IHtcclxuICAgICAgICAgICAgc2hvd0Z1bmN0aW9uID0gcmV0dXJuZWRTaG93RnVuYztcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KCEhc2hvd0Z1bmN0aW9uKS50b0VxdWFsKGV4cGVjdFJlcXVpcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0Q2VydGlmaWNhdGlvbkRlY2lzaW9uKGRlY2lzaW9uLCBjZXJ0SXRlbSwgc3RhdHVzLCBjb21tZW50cykge1xyXG4gICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZURlZmluZWQoKTtcclxuICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0SXRlbSgpKS50b0VxdWFsKGNlcnRJdGVtKTtcclxuICAgICAgICBleHBlY3QoZGVjaXNpb24uc3RhdHVzKS50b0VxdWFsKHN0YXR1cyk7XHJcbiAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNvbW1lbnRzKS50b0VxdWFsKGNvbW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RGlhbG9nKCknLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREaWFsb2coc3B5TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmIChzcHlNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCBzcHlNZXRob2QpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHRydWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGlhbG9nO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXREaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaG93RnVuYykgPT4gZGlhbG9nID0gc2hvd0Z1bmMpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWFsb2c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0RGlhbG9nKHNweU1ldGhvZCkge1xyXG4gICAgICAgICAgICBsZXQgZGlhbG9nID0gZ2V0RGlhbG9nKHNweU1ldGhvZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaWFsb2cpLm5vdC50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGRpYWxvZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgY29tbWVudCBkaWFsb2cgaWYgY29tbWVudHMgYXJlIHJlcXVpcmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjb21tZW50U2VydmljZSwgJ29wZW5Db21tZW50RGlhbG9nJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2coJ2lzQ29tbWVudERpYWxvZ1JlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBwb2xpY3kgdmlvbGF0aW9uIGRpYWxvZyBpZiBpdGVtIGlzIGEgcG9saWN5IHZpb2xhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93VmlvbGF0aW9uUmV2b2NhdGlvbkRpYWxvZycpO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nKCdpc1BvbGljeVZpb2xhdGlvblJldm9jYXRpb24nKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dWaW9sYXRpb25SZXZvY2F0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG5vbi1wb2xpY3kgdmlvbGF0aW9uIHJldm9jYXRpb24gZGlhbG9nIGlmIGl0IGlzIHJldm9jYXRpb24gd2l0aCBzdW1tYXJ5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dOb25WaW9sYXRpb25SZXZvY2F0aW9uRGlhbG9nJyk7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2coJ2lzUmV2b2NhdGlvbldpdGhTdW1tYXJ5Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Tm9uVmlvbGF0aW9uUmV2b2NhdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBibG9ja2VkIGJ5IHBhcmVudCBkaWFsb2cgaWYgdGhlcmUgaXMgcGFyZW50IGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dCbG9ja2VkQnlQYXJlbnREaWFsb2cnKTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZygnaXNCbG9ja2VkQnlQYXJlbnREZWNpc2lvbicpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0Jsb2NrZWRCeVBhcmVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbm8gZGlhbG9ncyBhcmUgZW5hYmxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpYWxvZyA9IGdldERpYWxvZyhudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpYWxvZykudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgY2FsbCBmdXJ0aGVyIGRpYWxvZyBjaGVja3MgaWYgYSBkaWFsb2cgaXMgc2hvd24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnaXNQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uJyk7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2coJ2lzQ29tbWVudERpYWxvZ1JlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5pc1BvbGljeVZpb2xhdGlvblJldm9jYXRpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdSZXR1cm5zIGFsbG93IGV4Y2VwdGlvbnMgZGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZycpO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nKCdpc0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2NvbW1lbnQgZGlhbG9nIHJlc29sdmVzIHdpdGggYSBjZXJ0IGRlY2lzaW9uIHdpdGggY29tbWVudHMnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gU2V0dXAgc29tZSBzcGllcyB0byBzaG93IHRoZSBkaWFsb2cgYW5kIHJlc29sdmUgaXQgd2l0aCBhIGNvbW1lbnQuXHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdpc0NvbW1lbnREaWFsb2dSZXF1aXJlZCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHRydWUpKTtcclxuICAgICAgICBsZXQgY29tbWVudFRleHQgPSAnYmxhaCBibGFoJztcclxuICAgICAgICBzcHlPbihjb21tZW50U2VydmljZSwgJ29wZW5Db21tZW50RGlhbG9nJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbihjb21tZW50VGV4dCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1ha2UgdGhpcyBhIENoYWxsZW5nZWQgaXRlbSBzbyB3ZSBjYW4gdGVzdCBvbmVTdGVwIEFjY2VwdFxyXG4gICAgICAgIGNlcnRJdGVtLnN1bW1hcnlTdGF0dXMgPSBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuQ2hhbGxlbmdlZDtcclxuXHJcbiAgICAgICAgLy8gT3BlbiB0aGUgY29tbWVudCBkaWFsb2cuXHJcbiAgICAgICAgbGV0IGRlY2lzaW9uO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpLnRoZW4oKGNvbW1lbnREZWNpc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBkZWNpc2lvbiA9IGNvbW1lbnREZWNpc2lvbjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KGNvbW1lbnRTZXJ2aWNlLm9wZW5Db21tZW50RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIENlcnRpZmljYXRpb25EZWNpc2lvbiBpcyBjb3JyZWN0LlxyXG4gICAgICAgIHRlc3RDZXJ0aWZpY2F0aW9uRGVjaXNpb24oZGVjaXNpb24sIGNlcnRJdGVtLCAnQXBwcm92ZWQnLCBjb21tZW50VGV4dCk7XHJcbiAgICAgICAgZXhwZWN0KGRlY2lzaW9uLm9uZVN0ZXBDaGFsbGVuZ2UpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNoYWxsZW5nZUFjdGlvbikudG9FcXVhbChDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLkNoYWxsZW5nZUFjdGlvbi5BY2NlcHQpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRDaGFsbGVuZ2VDb21tZW50SWZSZXF1aXJlZCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ29wZW5zIGNvbW1lbnQgZGlhbG9nIHdoZW4gaXRlbSBpcyBpbiBjaGFsbGVuZ2VkIHN0YXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjb21tZW50U2VydmljZSwgJ29wZW5Db21tZW50RGlhbG9nJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICBjZXJ0SXRlbS5zdW1tYXJ5U3RhdHVzID0gQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWQ7XHJcblxyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXRDaGFsbGVuZ2VDb21tZW50SWZSZXF1aXJlZChjZXJ0SXRlbSwgJ0FjY2VwdCcpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGNvbW1lbnRTZXJ2aWNlLm9wZW5Db21tZW50RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIG51bGwgd2hlbiBpdGVtIGlzIG5vdCBpbiBjaGFsbGVuZ2VkIHN0YXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXRDaGFsbGVuZ2VDb21tZW50SWZSZXF1aXJlZChjZXJ0SXRlbSwgJ0FjY2VwdCcpLnRoZW4oKG51bGxwcm9taXNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QobnVsbHByb21pc2UpLnRvQmUobnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dDb21tZW50RGlhbG9nJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgY29tbWVudCBkaWFsb2cgd2l0aCBjb21tZW50cyBhbmQgcmVhZE9ubHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNvbW1lbnRTZXJ2aWNlLCAnb3BlbkNvbW1lbnREaWFsb2cnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgICAgIGNlcnRJdGVtLnN1bW1hcnlTdGF0dXMgPSBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuQ2hhbGxlbmdlZDtcclxuICAgICAgICAgICAgbGV0IGNvbW1lbnQgPSAndGhpcyBpcyBhIGNvbW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbiA9IHsgJ2NvbW1lbnRzJyA6IGNvbW1lbnR9O1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q29tbWVudERpYWxvZyhjZXJ0SXRlbSwgJ0FwcHJvdmVkJywgZXhpc3RpbmdEZWNpc2lvbiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG51bGwsIG51bGwsIGNvbW1lbnQsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzQ29tbWVudERpYWxvZ1JlcXVpcmVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCByZXF1aXJlc0NvbW1lbnRzO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oKSwgJ2RvZXNTdGF0dXNSZXF1aXJlQ29tbWVudCcpLlxyXG4gICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKHJlcXVpcmVzQ29tbWVudHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlcXVpcmVkIGZvciBhIHN0YXR1cyBub3QgcmVxdWlyaW5nIGEgY29tbWVudCcsICgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWlyZXNDb21tZW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2dSZXF1aXJlZChjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyByZXF1aXJlZCBmb3IgYSBzdGF0dXMgcmVxdWlyaW5nIGEgY29tbWVudCcsICgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWlyZXNDb21tZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nUmVxdWlyZWQoY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNSZXZvY2F0aW9uKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgdGhlIHJlbWVkaWF0ZWQgc3RhdHVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXNJdCA9IGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmlzUmV2b2NhdGlvbihuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7c3RhdHVzOiAnUmVtZWRpYXRlZCd9KSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpc0l0KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igc3RhdHVzZXMgb3RoZXIgdGhhbiByZW1lZGlhdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXNJdCA9IGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmlzUmV2b2NhdGlvbihuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7c3RhdHVzOiAnQXBwcm92ZWQnfSkpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNJdCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uKCknLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdFBvbGljeVZpb2xhdGlvbih0eXBlLCBkZWNpc2lvbiwgZXhwZWN0SXQpIHtcclxuICAgICAgICAgICAgY2VydEl0ZW0udHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIGxldCBpc0l0ID0gY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uKGNlcnRJdGVtLFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogZGVjaXNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGlvblJldmlld0FjdGlvbjogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLlJlamVjdFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXNJdCkudG9FcXVhbChleHBlY3RJdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhIHBvbGljeSB2aW9sYXRpb24gaXRlbSB3aXRoIGEgcmV2b2NhdGlvbiBzdGF0dXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RQb2xpY3lWaW9sYXRpb24oQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5Qb2xpY3lWaW9sYXRpb24sICdSZW1lZGlhdGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIHJldm9rZSBvZiBhIG5vbi1wb2xpY3kgdmlvbGF0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0UG9saWN5VmlvbGF0aW9uKENlcnRpZmljYXRpb25JdGVtLlR5cGUuRW50aXRsZW1lbnQsICdSZW1lZGlhdGVkJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBub24tcmV2b2tlIG9mIGEgcG9saWN5IHZpb2xhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFBvbGljeVZpb2xhdGlvbihDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLlBvbGljeVZpb2xhdGlvbiwgJ0FwcHJvdmVkJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzUG9saWN5VmlvbGF0aW9uUmV2b2NhdGlvbigpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjaGVja1ZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVja1ZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IGNoZWNrVmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlcXVpcmVkIHdoZW4gY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uIHJldHVybnMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZ1JlcXVpcmVkKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgcmVxdWlyZWQgd2hlbiBjaGVja1BvbGljeVZpb2xhdGlvblJldm9jYXRpb24gcmV0dXJucyB0cnVlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVja1ZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZ1JlcXVpcmVkKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2hlY2tSZXZvY2F0aW9uV2l0aFN1bW1hcnkoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgcmV2b2NhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmNoZWNrUmV2b2NhdGlvbldpdGhTdW1tYXJ5KGNlcnRJdGVtLFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe3N0YXR1czogJ0FwcHJvdmVkJ30pKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHJldm9jYXRpb24gYnV0IHN1bW1hcnkgbm90IG5lZWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnbmVlZHNSZW1lZGlhdGlvblN1bW1hcnknKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuY2hlY2tSZXZvY2F0aW9uV2l0aFN1bW1hcnkoY2VydEl0ZW0sXHJcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7c3RhdHVzOiAnUmVtZWRpYXRlZCd9KSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiByZXZvY2F0aW9uIHdpdGggc3VtbWFyeSBidXQgaXMgYSByZWplY3RlZCBjaGFsbGVuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7IHN0YXR1czogJ1JlbWVkaWF0ZWQnLCBjaGFsbGVuZ2VBY3Rpb246ICdSZWplY3QnIH0pO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICduZWVkc1JlbWVkaWF0aW9uU3VtbWFyeScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmNoZWNrUmV2b2NhdGlvbldpdGhTdW1tYXJ5KGNlcnRJdGVtLCBzdGF0dXMpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiByZXZvY2F0aW9uIGFuZCBzdW1tYXJ5IGlzIG5lZWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnbmVlZHNSZW1lZGlhdGlvblN1bW1hcnknKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5jaGVja1Jldm9jYXRpb25XaXRoU3VtbWFyeShjZXJ0SXRlbSxcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtzdGF0dXM6ICdSZW1lZGlhdGVkJ30pKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1Jldm9jYXRpb25XaXRoU3VtbWFyeSgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjaGVja1ZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVja1ZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnY2hlY2tSZXZvY2F0aW9uV2l0aFN1bW1hcnknKS5hbmQuY2FsbEZha2UoKCkgPT4gY2hlY2tWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgcmVxdWlyZWQgd2hlbiBjaGVja0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQgcmV0dXJucyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2tWYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nUmVxdWlyZWQoY2VydEl0ZW0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyByZXF1aXJlZCB3aGVuIGNoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZCByZXR1cm5zIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nUmVxdWlyZWQoY2VydEl0ZW0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc0Jsb2NrZWRCeVBhcmVudERlY2lzaW9uKCknLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQWN0aW9uU3RhdHVzKHN0YXR1cywgZGVsZWdhdGlvblJldmlld0FjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBzdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBkZWxlZ2F0aW9uUmV2aWV3QWN0aW9uOiBkZWxlZ2F0aW9uUmV2aWV3QWN0aW9uXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0QmxvY2tlZEJ5UGFyZW50KGRlcGVuZGVudERlY2lzaW9uLCBzdGF0dXMsIHNvdXJjZURlY2lzaW9ucywgZXhwZWN0SXQsIGlzQ2hhbGxlbmdlKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0SXQ7XHJcbiAgICAgICAgICAgIGNlcnRJdGVtLmRlY2lzaW9uU3RhdHVzLmRlcGVuZGVudERlY2lzaW9uID0gZGVwZW5kZW50RGVjaXNpb247XHJcbiAgICAgICAgICAgIGNlcnRJdGVtLnJlcXVpcmVzQ2hhbGxlbmdlRGVjaXNpb24gPSBpc0NoYWxsZW5nZTtcclxuICAgICAgICAgICAgc3RhdHVzLmNoYWxsZW5nZUFjdGlvbiA9ICEhaXNDaGFsbGVuZ2UgPyAnUmVqZWN0JyA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldFNvdXJjZURlY2lzaW9ucycpLmFuZC5yZXR1cm5WYWx1ZShzb3VyY2VEZWNpc2lvbnMpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5pc0Jsb2NrZWRCeVBhcmVudERlY2lzaW9uKGNlcnRJdGVtLCBzdGF0dXMpLnRoZW4oKGlzSXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3RJdCA9IGlzSXQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0SXQpLnRvRXF1YWwoZXhwZWN0SXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgaXRlbSBkZWNpc2lvbiBzdGF0dXMgaXMgZGVwZW5kZW50JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0QmxvY2tlZEJ5UGFyZW50KHRydWUsIGNyZWF0ZUFjdGlvblN0YXR1cygnUmVtZWRpYXRlZCcpLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgc291cmNlIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdEJsb2NrZWRCeVBhcmVudChmYWxzZSwgY3JlYXRlQWN0aW9uU3RhdHVzKCdSZW1lZGlhdGVkJyksIFt7fSx7fV0sIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gZGVwZW5kZW50IGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdEJsb2NrZWRCeVBhcmVudChmYWxzZSwgY3JlYXRlQWN0aW9uU3RhdHVzKCdSZW1lZGlhdGVkJyksIG51bGwsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgaXQgaXMgYW4gQWNjZXB0IGRlbGVnYXRpb24gcmV2aWV3JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0QmxvY2tlZEJ5UGFyZW50KHRydWUsIGNyZWF0ZUFjdGlvblN0YXR1cygnUmVtZWRpYXRlZCcsICdBY2NlcHQnKSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpdCBpcyBhIFJlamVjdCBkZWxlZ2F0aW9uIHJldmlldycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdEJsb2NrZWRCeVBhcmVudCh0cnVlLCBjcmVhdGVBY3Rpb25TdGF0dXMoJ1JlbWVkaWF0ZWQnLCAnUmVqZWN0JyksIG51bGwsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpdGVtIGRlY2lzaW9uIHN0YXR1cyBpcyBkZXBlbmRlbnQsIGJ1dCBpcyBjaGFsbGVuZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0QmxvY2tlZEJ5UGFyZW50KHRydWUsIGNyZWF0ZUFjdGlvblN0YXR1cygnUmVtZWRpYXRlZCcpLCBudWxsLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd1Zpb2xhdGlvblJldm9jYXRpb25EaWFsb2coKScsICgpID0+IHtcclxuICAgICAgICBsZXQgY2VydGlmaWNhdGlvblNlcnZpY2UsIHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXywgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldFZpb2xhdGlvblJlbWVkaWF0aW9uQWR2aWNlJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dSZXZvY2F0aW9uRGlhbG9nJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHt9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0ID1cclxuICAgICAgICAgICAgICAgIG5ldyBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdChhbmd1bGFyLmNvcHkoY2VydGlmaWNhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQpKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdnZXRzIHRoZSByZW1lZGlhdGlvbiBhZHZpY2UgYW5kIGNhbGxzIHRocm91Z2ggdG8gc2hvd1Jldm9jYXRpb25EaWFsb2cnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBleGlzdGluZ0RlY2lzaW9uID0geyBzdGF0dXM6ICdSZW1lZGlhdGVkJ30sXHJcbiAgICAgICAgICAgICAgICByZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dWaW9sYXRpb25SZXZvY2F0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSxcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nRGVjaXNpb24sIHJlYWRPbmx5KTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0VmlvbGF0aW9uUmVtZWRpYXRpb25BZHZpY2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXZvY2F0aW9uRGlhbG9nKVxyXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSxcclxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0LmFkdmljZSwgcmVtZWRpYXRpb25BZHZpY2VSZXN1bHQuc3VtbWFyeSwgZXhpc3RpbmdEZWNpc2lvbiwgcmVhZE9ubHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dOb25WaW9sYXRpb25SZXZvY2F0aW9uRGlhbG9nKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25TZXJ2aWNlLCByZW1lZGlhdGlvbkFkdmljZVJlc3VsdDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9jZXJ0aWZpY2F0aW9uU2VydmljZV8sIFJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25TZXJ2aWNlXztcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXRSZW1lZGlhdGlvblN1bW1hcnknKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4ocmVtZWRpYXRpb25BZHZpY2VSZXN1bHQuc3VtbWFyeSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93UmV2b2NhdGlvbkRpYWxvZycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbih7fSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZW1lZGlhdGlvbkFkdmljZVJlc3VsdCA9XHJcbiAgICAgICAgICAgICAgICBuZXcgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQoYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxUKSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnZ2V0cyB0aGUgcmVtZWRpYXRpb24gc3VtbWFyeSBhbmQgY2FsbHMgdGhyb3VnaCB0byBzaG93UmV2b2NhdGlvbkRpYWxvZycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGV4aXN0aW5nRGVjaXNpb24gPSB7IHN0YXR1czogJ1JlbWVkaWF0ZWQnfSxcclxuICAgICAgICAgICAgICAgIHJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd05vblZpb2xhdGlvblJldm9jYXRpb25EaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpLFxyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbiwgcmVhZE9ubHkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvblN1bW1hcnkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXZvY2F0aW9uRGlhbG9nKVxyXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgcmVtZWRpYXRpb25BZHZpY2VSZXN1bHQuc3VtbWFyeSwgZXhpc3RpbmdEZWNpc2lvbiwgcmVhZE9ubHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dSZXZvY2F0aW9uRGlhbG9nKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZSwgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCwgUmVtZWRpYXRpb25EaWFsb2dSZXN1bHQsXHJcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlLCByZW1lZGlhdGlvblN1bW1hcnk7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlXywgX0NlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfUmVtZWRpYXRpb25EaWFsb2dSZXN1bHRfKSA9PiB7XHJcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZSA9IF9yZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2VfO1xyXG4gICAgICAgICAgICBDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0ID0gX0NlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRfO1xyXG4gICAgICAgICAgICBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCA9IF9SZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdF87XHJcblxyXG4gICAgICAgICAgICByZW1lZGlhdGlvbkFkdmljZSA9IGFuZ3VsYXIuY29weShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVC5hZHZpY2UpO1xyXG4gICAgICAgICAgICByZW1lZGlhdGlvblN1bW1hcnkgPSBhbmd1bGFyLmNvcHkoY2VydGlmaWNhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQuc3VtbWFyeSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzcHlPblJlbWVkaWF0aW9uRGlhbG9nU2VydmljZUFuZFRlc3QocmVqZWN0LCByZXN1bHQsIGV4aXN0aW5nRGVjaXNpb24sIHJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIHNweU9uKHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dSZXZvY2F0aW9uRGlhbG9nJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocmVqZWN0KSA/ICRxLnJlamVjdCgpIDogJHEud2hlbihyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXZvY2F0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSxcclxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlLCByZW1lZGlhdGlvblN1bW1hcnksIGV4aXN0aW5nRGVjaXNpb24sIHJlYWRPbmx5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyByZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2UgdG8gc2hvdyB0aGUgZGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPblJlbWVkaWF0aW9uRGlhbG9nU2VydmljZUFuZFRlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZS5zaG93UmV2b2NhdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgdmFsdWVzIGluIHRoZSBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNweU9uUmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlQW5kVGVzdChmYWxzZSwge30sIHVuZGVmaW5lZCwgcmVhZE9ubHkpO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZS5zaG93UmV2b2NhdGlvbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGFyZ3NbMl07XHJcbiAgICAgICAgICAgIGV4cGVjdChjb250ZXh0LnJlYWRPbmx5KS50b0VxdWFsKHJlYWRPbmx5KTtcclxuICAgICAgICAgICAgLy8gU2V0IGluIHRvcCBsZXZlbCBjb25maWd1cmF0aW9uIGluaXRpYWxpemF0aW9uXHJcbiAgICAgICAgICAgIGV4cGVjdChjb250ZXh0LnVzZUxpbmtBdHRyaWJ1dGVWYWx1ZUZvclJldm9jYXRpb25Nb2RpZmljYXRpb24pLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwYXNzZXMgYW4gZXhpc3RpbmcgZGVjaXNpb24gYXMgYSBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCBpbiB0aGUgZGlhbG9nIGNvbnRleHQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBleGlzdGluZ0RlY2lzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0JvYidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogJ2hlbGxvJyxcclxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uRGV0YWlsczogW10sXHJcbiAgICAgICAgICAgICAgICByZXZva2VkUm9sZXM6IFsncm9sZTEnLCAncm9sZTInXSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzOiB7fVxyXG4gICAgICAgICAgICB9LCBleHBlY3RlZEV4aXN0aW5nUmVzdWx0ID0gbmV3IFJlbWVkaWF0aW9uRGlhbG9nUmVzdWx0KGV4aXN0aW5nRGVjaXNpb24pO1xyXG4gICAgICAgICAgICBzcHlPblJlbWVkaWF0aW9uRGlhbG9nU2VydmljZUFuZFRlc3QoZmFsc2UsIHt9LCBleGlzdGluZ0RlY2lzaW9uKTtcclxuICAgICAgICAgICAgbGV0IGFyZ3MgPSByZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1Jldm9jYXRpb25EaWFsb2cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBhcmdzWzJdO1xyXG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5leGlzdGluZ1Jlc3VsdCkudG9FcXVhbChleHBlY3RlZEV4aXN0aW5nUmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgcmVqZWN0ZWQgcHJvbWlzZSBpZiByZWFkIG9ubHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWplY3RlZDtcclxuICAgICAgICAgICAgc3B5T25SZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2VBbmRUZXN0KHRydWUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyByZWplY3RlZCBwcm9taXNlIHdpdGggcmVhc29uIGlmIGRpYWxvZyBpcyBub3QgbmVlZGVkIGZvciBleGlzdGluZyByZXN1bHQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWplY3RlZCwgcmVqZWN0ZWRSZWFzb247XHJcbiAgICAgICAgICAgIHNweU9uUmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlQW5kVGVzdChmYWxzZSwgdW5kZWZpbmVkLCB7fSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZWplY3RlZFJlYXNvbiA9IHJlYXNvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVqZWN0ZWRSZWFzb24pLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHJlc29sdmVkIHByb21pc2Ugd2l0aCBkZWNpc2lvbiBpZiBkaWFsb2cgaXMgbm90IG5lZWRlZCBmb3IgbmV3IGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVqZWN0ZWQsIHJlc29sdmVSZXN1bHQ7XHJcbiAgICAgICAgICAgIHNweU9uUmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlQW5kVGVzdChmYWxzZSwgdW5kZWZpbmVkKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlUmVzdWx0ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9LCAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZWplY3RlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlUmVzdWx0IGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvbkRlY2lzaW9uKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYXBwbGllcyBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCB0byBkZWNpc2lvbiBpZiBkaWFsb2cgaXMgbmVlZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb24sXHJcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvblJlc3VsdCA9IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2FiY2QnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czogJ2kgc2FpZCBzb21ldGhpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldm9rZWRSb2xlczogWydyb2wxJywgJ3JvbGUyJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbWU6ICd0aGluZydcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkRldGFpbHM6IFt7IG5ld1ZhbHVlOiAneWFkZGF5YWRkYSd9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjZXJ0SXRlbS5zdW1tYXJ5U3RhdHVzID0gQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWQ7XHJcbiAgICAgICAgICAgIHNweU9uUmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlQW5kVGVzdChmYWxzZSwgcmVtZWRpYXRpb25SZXN1bHQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZWNpcGllbnQpLnRvRXF1YWwocmVtZWRpYXRpb25SZXN1bHQucmVjaXBpZW50U3VtbWFyeS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZWNpcGllbnRTdW1tYXJ5KS50b0VxdWFsKHJlbWVkaWF0aW9uUmVzdWx0LnJlY2lwaWVudFN1bW1hcnkpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uY29tbWVudHMpLnRvRXF1YWwocmVtZWRpYXRpb25SZXN1bHQuY29tbWVudHMpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24ucmV2b2tlZFJvbGVzKS50b0VxdWFsKHJlbWVkaWF0aW9uUmVzdWx0LnJldm9rZWRSb2xlcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykudG9FcXVhbChyZW1lZGlhdGlvblJlc3VsdC5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZW1lZGlhdGlvbkRldGFpbHMpLnRvRXF1YWwocmVtZWRpYXRpb25SZXN1bHQucmVtZWRpYXRpb25EZXRhaWxzKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLm9uZVN0ZXBDaGFsbGVuZ2UpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jaGFsbGVuZ2VBY3Rpb24pLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5DaGFsbGVuZ2VBY3Rpb24uQWNjZXB0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd0Jsb2NrZWRCeVBhcmVudERpYWxvZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdvcGVucyBhIGRpYWxvZycsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0Jsb2NrZWRCeVBhcmVudERpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Fsd2F5cyByZXR1cm5zIHJlamVjdGVkIHByb21pc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlUmVzb2x2ZWQ7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEud2hlbigpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93QmxvY2tlZEJ5UGFyZW50RGlhbG9nKGNlcnRJdGVtKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcHJvbWlzZVJlc29sdmVkID0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBwcm9taXNlUmVzb2x2ZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZXNvbHZlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd0NlcnRpZmljYXRpb25EZWxlZ2F0aW9uRGlhbG9nKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdDZXJ0aWZ5IHRoZSBQcm9kdWN0aW9uIFNPRC04OTMgdmlvbGF0aW9uIG9uIFxcJ0Rvbm5hIFNjb3R0XFwnJyxcclxuICAgICAgICAgICAgaXRlbURlY2lzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50OiB7IGlkOiAnMTIzNCcgfSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnZGZkZWVyZScsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3NvbWUgZGVzY3JpcHRpb24nXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvblNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25TZXJ2aWNlXztcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXREZWxlZ2F0aW9uRGVzY3JpcHRpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93RGVsZWdhdGlvbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6ICRxLndoZW4oaXRlbURlY2lzaW9uKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdjcmVhdGVzIGFuIGl0ZW0gZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKENlcnRpZmljYXRpb25EZWNpc2lvbiwgJ2NyZWF0ZUl0ZW1EZWNpc2lvbicpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkRlbGVnYXRpb25EaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0cyBhIGRlc2NyaXB0aW9uIGFuZCBjYWxscyBzaG93RGVsZWdhdGlvbkRpYWxvZycsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25EZWxlZ2F0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldERlbGVnYXRpb25EZXNjcmlwdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgcHJvbWlzZSByZXNvbHZlZCB3aXRoIGl0ZW0gZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvblByb21pc2UgPSBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkRlbGVnYXRpb25EaWFsb2coY2VydEl0ZW0sXHJcbiAgICAgICAgICAgICAgICBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGRlY2lzaW9uUHJvbWlzZS50aGVuKChkZWNpc2lvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnJlY2lwaWVudCkudG9FcXVhbChpdGVtRGVjaXNpb24ucmVjaXBpZW50LmlkKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jb21tZW50cykudG9FcXVhbChpdGVtRGVjaXNpb24uY29tbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGl0ZW1EZWNpc2lvbi5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dDZXJ0aWZpY2F0aW9uUmVhc3NpZ25EaWFsb2coKScsICgpID0+IHtcclxuICAgICAgICBsZXQgY2VydGlmaWNhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgIGJ1bGtEZWNpc2lvbiA9IHtcclxuICAgICAgICAgICAgcmVjaXBpZW50OiB7IGlkOiAnMTIzNCcgfSxcclxuICAgICAgICAgICAgY29tbWVudHM6ICdhZGZhZHNmYXNkJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdhZHNmYXNkZmFzZCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XHJcblxyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dEZWxlZ2F0aW9uRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oYnVsa0RlY2lzaW9uKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtb2NrIG91dCBkZWNpc2lvbiBzdG9yZSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1bGtPdmVybGFwczogKCkgPT4ge30sXHJcbiAgICAgICAgICAgICAgICByZW1vdmVMaW5lSXRlbU92ZXJsYXBzOiAoKSA9PiB7fVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0dXBTYXZlRGVjaXNpb25zU3B5KHJlamVjdCkge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ3NhdmVEZWNpc2lvbnMnKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICByZWplY3QgPyAkcS5yZWplY3QoeyBzdGF0dXM6IDQwOSB9KSA6ICRxLndoZW4oeyBkYXRhOiB7IG9iamVjdDoge30gfSB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnY3JlYXRlcyBhIGJ1bGsgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwU2F2ZURlY2lzaW9uc1NweSgpO1xyXG4gICAgICAgICAgICBzcHlPbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24sICdjcmVhdGVCdWxrRGVjaXNpb24nKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25SZWFzc2lnbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNob3dEZWxlZ2F0aW9uRGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25SZWFzc2lnbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dEZWxlZ2F0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyBzYXZlRGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25SZWFzc2lnbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHJldHJ5IGRpYWxvZyBpZiBjZXJ0IGlzIGxvY2tlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgc2V0dXBTYXZlRGVjaXNpb25zU3B5KHRydWUpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dSZXRyeURpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvblJlYXNzaWduRGlhbG9nKGNlcnRJdGVtKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1JldHJ5RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBlcnJvciBtb2RhbCBpZiBzYXZlRGVjaXNpb25zIHJldHVybnMgZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2F2ZURlY2lzaW9ucycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBbJ0NhblxcJ3Qgc2VsZiBjZXJ0aWZ5J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dDZXJ0aWZpY2F0aW9uUmVhc3NpZ25EaWFsb2coY2VydEl0ZW0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93Q2VydGlmaWNhdGlvbkVudGl0eVJlYXNzaWduRGlhbG9nKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICBidWxrRGVjaXNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICByZWNpcGllbnQ6IHsgaWQ6ICcxMjM0JyB9LFxyXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdhZGZhZHNmYXNkJyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnYWRzZmFzZGZhc2QnXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvblNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25TZXJ2aWNlXztcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd0RlbGVnYXRpb25EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihidWxrRGVjaXNpb24pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1vY2sgb3V0IGRlY2lzaW9uIHN0b3JlIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQnVsa092ZXJsYXBzOiAoKSA9PiB7fSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZUxpbmVJdGVtT3ZlcmxhcHM6ICgpID0+IHt9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXR1cFNhdmVEZWNpc2lvbnNTcHkocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2F2ZURlY2lzaW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHJlamVjdCA/ICRxLnJlamVjdCh7IHN0YXR1czogNDA5IH0pIDogJHEud2hlbih7IGRhdGE6IHsgb2JqZWN0OiB7fSB9IH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdjcmVhdGVzIGEgYnVsayBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgc2V0dXBTYXZlRGVjaXNpb25zU3B5KCk7XHJcbiAgICAgICAgICAgIHNweU9uKENlcnRpZmljYXRpb25EZWNpc2lvbiwgJ2NyZWF0ZUJ1bGtEZWNpc2lvbicpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkVudGl0eVJlYXNzaWduRGlhbG9nKGNlcnRJdGVtKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgc2hvd0RlbGVnYXRpb25EaWFsb2cnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwU2F2ZURlY2lzaW9uc1NweSgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkVudGl0eVJlYXNzaWduRGlhbG9nKGNlcnRJdGVtKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNhdmVEZWNpc2lvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwU2F2ZURlY2lzaW9uc1NweSgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkVudGl0eVJlYXNzaWduRGlhbG9nKGNlcnRJdGVtKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgcmV0cnkgZGlhbG9nIGlmIGNlcnQgaXMgbG9ja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd1JldHJ5RGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dDZXJ0aWZpY2F0aW9uRW50aXR5UmVhc3NpZ25EaWFsb2coY2VydEl0ZW0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93UmV0cnlEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGVycm9yIG1vZGFsIGlmIHNhdmVEZWNpc2lvbnMgcmV0dXJucyBlcnJvcicsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzYXZlRGVjaXNpb25zJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IFsnQ2FuXFwndCBzZWxmIGNlcnRpZnknXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25FbnRpdHlSZWFzc2lnbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dDZXJ0aWZpY2F0aW9uRW50aXR5RGVsZWdhdGlvbkRpYWxvZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjZXJ0aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgYnVsa0RlY2lzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50OiB7IGlkOiAnMTIzNCcgfSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnYWRmYWRzZmFzZCcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2Fkc2Zhc2RmYXNkJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XHJcblxyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dEZWxlZ2F0aW9uRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oYnVsa0RlY2lzaW9uKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtb2NrIG91dCBkZWNpc2lvbiBzdG9yZSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUJ1bGtPdmVybGFwczogKCkgPT4ge30sXHJcbiAgICAgICAgICAgICAgICByZW1vdmVMaW5lSXRlbU92ZXJsYXBzOiAoKSA9PiB7fVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwU2F2ZURlY2lzaW9uc1NweShyZWplY3QpIHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzYXZlRGVjaXNpb25zJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgcmVqZWN0ID8gJHEucmVqZWN0KHsgc3RhdHVzOiA0MDkgfSkgOiAkcS53aGVuKHsgZGF0YTogeyBvYmplY3Q6IHt9IH0gfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2NyZWF0ZXMgYSBidWxrIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkoKTtcclxuICAgICAgICAgICAgc3B5T24oQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCAnY3JlYXRlQnVsa0RlY2lzaW9uJyk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dDZXJ0aWZpY2F0aW9uRW50aXR5RGVsZWdhdGlvbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNob3dEZWxlZ2F0aW9uRGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25FbnRpdHlEZWxlZ2F0aW9uRGlhbG9nKGNlcnRJdGVtLCAzKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNhdmVEZWNpc2lvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwU2F2ZURlY2lzaW9uc1NweSh0cnVlKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0NlcnRpZmljYXRpb25FbnRpdHlEZWxlZ2F0aW9uRGlhbG9nKGNlcnRJdGVtKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBidWxrRGVjaXNpb24uc3RhdHVzID0gQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgcmV0cnkgZGlhbG9nIGlmIGNlcnQgaXMgbG9ja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cFNhdmVEZWNpc2lvbnNTcHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd1JldHJ5RGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dDZXJ0aWZpY2F0aW9uRW50aXR5RGVsZWdhdGlvbkRpYWxvZyhjZXJ0SXRlbSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXRyeURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgZXJyb3IgbW9kYWwgaWYgc2F2ZURlY2lzaW9ucyByZXR1cm5zIGVycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ3NhdmVEZWNpc2lvbnMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczogWydDYW5cXCd0IHNlbGYgY2VydGlmeSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdlcnJvcidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvbkVudGl0eURlbGVnYXRpb25EaWFsb2coY2VydEl0ZW0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93RGVsZWdhdGlvbkRpYWxvZycsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNwTW9kYWwgb3BlbicsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RlbGVnYXRpb25EaWFsb2coJ3RpdGxlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93RW50aXR5RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbkRpYWxvZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjZXJ0aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgZGVsZWdhdGVkRW50aXR5O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XHJcbiAgICAgICAgICAgIGRlbGVnYXRlZEVudGl0eSA9IGFuZ3VsYXIuY29weShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9FTlRJVFlfTElTVF9SRVNVTFQub2JqZWN0c1swXSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXR1cFNhdmVEZWNpc2lvbnNTcHkocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2F2ZURlY2lzaW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHJlamVjdCA/ICRxLnJlamVjdCh7IHN0YXR1czogNDA5IH0pIDogJHEud2hlbih7IGRhdGE6IHsgb2JqZWN0OiB7fSB9IH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdjcmVhdGVzIGEgYnVsayBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCAnY3JlYXRlQnVsa0RlY2lzaW9uJyk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dFbnRpdHlEZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uRGlhbG9nKGRlbGVnYXRlZEVudGl0eSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGNvbmZpcm0gZGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93RW50aXR5RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbkRpYWxvZyhkZWxlZ2F0ZWRFbnRpdHkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNhdmVEZWNpc2lvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwU2F2ZURlY2lzaW9uc1NweSgpO1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93RW50aXR5RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbkRpYWxvZyhkZWxlZ2F0ZWRFbnRpdHkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBlcnJvciBtb2RhbCBpZiBzYXZlRGVjaXNpb25zIHJldHVybnMgZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2F2ZURlY2lzaW9ucycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBbJ0NhblxcJ3Qgc2VsZiBjZXJ0aWZ5J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dFbnRpdHlEZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uRGlhbG9nKGRlbGVnYXRlZEVudGl0eSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjaGVja1ZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVja1ZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENvbmZpZ3VyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgZG9lc1N0YXR1c1JlcXVpcmVDb21tZW50OiAoKSA9PiB7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCAnY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZ1JlcXVpcmVkJykuYW5kLmNhbGxGYWtlKCgpID0+IGNoZWNrVmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlcXVpcmVkIHdoZW4gY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZ1JlcXVpcmVkIHJldHVybnMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZ1JlcXVpcmVkKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyByZXF1aXJlZCB3aGVuIGNoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZCByZXR1cm5zIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nUmVxdWlyZWQoY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJyksIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIGFsbG93RXhjZXB0aW9uUG9wdXA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZG9lc1N0YXR1c1JlcXVpcmVDb21tZW50OiAoKSA9PiB7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlcXVpcmVkIHdoZW4gYWxsb3dFeGNlcHRpb25Qb3B1cCBpcyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uZmlnLmFsbG93RXhjZXB0aW9uUG9wdXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmNoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZChnZXRTdGF0dXMoJ01pdGlnYXRlZCcpKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyByZXF1aXJlZCB3aGVuIGFsbG93RXhjZXB0aW9uUG9wdXAgaXMgdHJ1ZSBhbmQgc3RhdHVzIGlzIE1pdGlnYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uZmlnLmFsbG93RXhjZXB0aW9uUG9wdXAgPSB0cnVlO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuY2hlY2tBbGxvd0V4Y2VwdGlvbkRpYWxvZ1JlcXVpcmVkKGdldFN0YXR1cygnTWl0aWdhdGVkJykpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlcXVpcmVkIHdoZW4gZGVjaXNpb24gc3RhdHVzIGlzIG5vdCBNaXRpZ2F0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5hbGxvd0V4Y2VwdGlvblBvcHVwID0gdHJ1ZTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmNoZWNrQWxsb3dFeGNlcHRpb25EaWFsb2dSZXF1aXJlZChnZXRTdGF0dXMoJ0FwcHJvdmVkJykpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIG5vdCByZXF1aXJlZCBmb3IgYWNjZXB0IGRlbGVnYXRpb24gYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xyXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvblJldmlld0FjdGlvbjogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5EZWxlZ2F0aW9uQWN0aW9uLkFjY2VwdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5jaGVja0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQoc3RhdHVzKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYWxsb3cgZXhjZXB0aW9uIGRpYWxvZycsICgpID0+IHtcclxuICAgICAgICBsZXQgZGlhbG9nUmVzdWx0LCBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLCBTZWxlY3Rpb25Nb2RlbCwgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGU7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZV8sIF9TZWxlY3Rpb25Nb2RlbF8sIF9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZV8pID0+IHtcclxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBfU2VsZWN0aW9uTW9kZWxfO1xyXG4gICAgICAgICAgICBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZSA9IF9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZV87XHJcblxyXG4gICAgICAgICAgICBkaWFsb2dSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICBtaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogJ2FsbG93IHRoaXMhJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSwgJ3Nob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGRpYWxvZ1Jlc3VsdCkpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gUG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2cnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZygpO1xyXG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdzZXRzIHRoZSBleHBpcmF0aW9uIGRhdGUgYW5kIGNvbW1lbnRzIG9uIHRoZSBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJykpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiBkZWNpc2lvbiA9IHJlc3VsdCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24ubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKS50b0VxdWFsKGRpYWxvZ1Jlc3VsdC5taXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uY29tbWVudHMpLnRvRXF1YWwoZGlhbG9nUmVzdWx0LmNvbW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIGNoYWxsZW5nZSBwcm9wZXJ0aWVzIG9uIHRoZSBkZWNpc2lvbiBpZiBjaGFsbGVuZ2UgaXRlbScsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydEl0ZW0uc3VtbWFyeVN0YXR1cyA9IENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5DaGFsbGVuZ2VkO1xyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb247XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZyhjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdNaXRpZ2F0ZWQnKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IGRlY2lzaW9uID0gcmVzdWx0KTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24pLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5vbmVTdGVwQ2hhbGxlbmdlKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uY2hhbGxlbmdlQWN0aW9uKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuQ2hhbGxlbmdlQWN0aW9uLkFjY2VwdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3REaWFsb2dDb25maWdWYWx1ZShuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJncykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXVtuYW1lXSkudG9FcXVhbCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgndXNlcyBjb25maWd1cmF0aW9uIGZvciByZXF1aXJlQ29tbWVudHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIE1pdGlnYXRlZCBpcyBzZXQgYXMgYSBzdGF0dXMgcmVxdWlyaW5nIGNvbW1lbnRzIGluIHRoZSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpKTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZ0NvbmZpZ1ZhbHVlKCdyZXF1aXJlQ29tbWVudHMnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VzZXMgY29uZmlndXJhdGlvbiBmb3Igc2hvd0V4cGlyYXRpb25EYXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2VydGlmaWNhdGlvbkNvbmZpZy5hbGxvd0V4Y2VwdGlvblBvcHVwID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpKTtcclxuICAgICAgICAgICAgdGVzdERpYWxvZ0NvbmZpZ1ZhbHVlKCdzaG93RXhwaXJhdGlvbkRhdGUnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VzZXMgY29uZmlndXJhdGlvbiBmb3IgZXhwaXJhdGlvbiBkYXRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jZXJ0aWZpY2F0aW9uQ29uZmlnLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZyhjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdNaXRpZ2F0ZWQnKSk7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2dDb25maWdWYWx1ZSgnZXhwaXJhdGlvbkRhdGUnLCBkYXRlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VzZXMgdGhlIGV4cGlyYXRpb24gZGF0ZSBhbmQgY29tbWVudHMgZnJvbSBleGlzdGluZyBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGV4aXN0aW5nRGVjaXNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50czogJ3NvbWV0aGluZyBlbHNlJyxcclxuICAgICAgICAgICAgICAgIG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZTogbmV3IERhdGUoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJyksIGV4aXN0aW5nRGVjaXNpb24pO1xyXG4gICAgICAgICAgICB0ZXN0RGlhbG9nQ29uZmlnVmFsdWUoJ2NvbW1lbnRzJywgZXhpc3RpbmdEZWNpc2lvbi5jb21tZW50cyk7XHJcbiAgICAgICAgICAgIHRlc3REaWFsb2dDb25maWdWYWx1ZSgnZXhwaXJhdGlvbkRhdGUnLCBleGlzdGluZ0RlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdzaG93QWxsb3dFeGNlcHRpb25EaWFsb2coKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3NldHMgdGhlIGRpc3BsYXkgbmFtZSBiYXNlZCBvbiB0aGUgaXRlbSBkaXNwbGF5IG5hbWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93QWxsb3dFeGNlcHRpb25EaWFsb2coY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJykpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpYWxvZ0NvbmZpZ1ZhbHVlKCdkaXNwbGF5TmFtZScsIGNlcnRJdGVtLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2V0cyB0aGUgZGlzcGxheSBuYW1lIGJhc2VkIG9uIHRoZSBpdGVtIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGNlcnRJdGVtLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpKTtcclxuICAgICAgICAgICAgICAgIHRlc3REaWFsb2dDb25maWdWYWx1ZSgnZGlzcGxheU5hbWUnLCBjZXJ0SXRlbS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nQnVsaycsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3NldHMgdGhlIGJ1bGtDb3VudCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dBbGxvd0V4Y2VwdGlvbkRpYWxvZ0J1bGsobmV3IFNlbGVjdGlvbk1vZGVsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKCksIGdldFN0YXR1cygnTWl0aWdhdGVkJyksIDI1KTtcclxuICAgICAgICAgICAgICAgIHRlc3REaWFsb2dDb25maWdWYWx1ZSgnYnVsa0NvdW50JywgMjUpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpYWxvZ0NvbmZpZ1ZhbHVlKCdkaXNwbGF5TmFtZScsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dSZXRyeURpYWxvZycsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKHt9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHNwTW9kYWwgb3BlbiBhbmQgdGhlIHJldHJ5IGZ1bmN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGVzdE9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHJldHJ5RnVuYzogKCkgPT4geyByZXR1cm4gJ3NvbWV0aGluZyc7IH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKHRlc3RPYmosICdyZXRyeUZ1bmMnKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1JldHJ5RGlhbG9nKHRlc3RPYmoucmV0cnlGdW5jKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0T2JqLnJldHJ5RnVuYykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldERlbGVnYXRpb25SZXZva2VDb25maXJtYXRpb25JZlJlcXVpcmVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGRlbGVnYXRlZENlcnQ7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpO1xyXG4gICAgICAgICAgICBkZWxlZ2F0ZWRDZXJ0ID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdKTtcclxuICAgICAgICAgICAgZGVsZWdhdGVkQ2VydC5zdW1tYXJ5U3RhdHVzID0gQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkRlbGVnYXRlZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNwTW9kYWwuY29uZmlybSgpIHdoZW4gYWN0aW9uIHN0YXR1cyBpcyBBcHByb3ZlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuZ2V0RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbklmUmVxdWlyZWQoZGVsZWdhdGVkQ2VydCxcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtzdGF0dXM6IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZH0pKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcE1vZGFsLmNvbmZpcm0oKSB3aGVuIGFjdGlvbiBzdGF0dXMgaXMgQWNrbm93bGVkZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZChkZWxlZ2F0ZWRDZXJ0LFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe3N0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFja25vd2xlZGdlZH0pKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcE1vZGFsLmNvbmZpcm0oKSB3aGVuIGFjdGlvbiBzdGF0dXMgaXMgTWl0aWdhdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZChkZWxlZ2F0ZWRDZXJ0LFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe3N0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZH0pKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcE1vZGFsLmNvbmZpcm0oKSB3aGVuIGFjdGlvbiBzdGF0dXMgaXMgUmVtZWRpYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuZ2V0RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbklmUmVxdWlyZWQoZGVsZWdhdGVkQ2VydCxcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtzdGF0dXM6IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkfSkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNwTW9kYWwuY29uZmlybSgpIHdoZW4gYWN0aW9uIHN0YXR1cyBpcyBDbGVhcmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5nZXREZWxlZ2F0aW9uUmV2b2tlQ29uZmlybWF0aW9uSWZSZXF1aXJlZChkZWxlZ2F0ZWRDZXJ0LFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe3N0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWR9KSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHNwTW9kYWwuY29uZmlybSgpIHdoZW4gYWN0aW9uIHN0YXR1cyBpcyBEZWxlZ2F0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmdldERlbGVnYXRpb25SZXZva2VDb25maXJtYXRpb25JZlJlcXVpcmVkKGRlbGVnYXRlZENlcnQsXHJcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7c3RhdHVzOiBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkfSkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgc3BNb2RhbC5jb25maXJtKCkgd2hlbiB0aGVyZSBpcyBhbiBleGlzdGluZyBkZWNpc2lvbi5yZXZva2VEZWxlZ2F0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdEZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oZGVsZWdhdGVkQ2VydCwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKTtcclxuICAgICAgICAgICAgZXhpc3RpbmdEZWNpc2lvbi5yZXZva2VEZWxlZ2F0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuZ2V0RGVsZWdhdGlvblJldm9rZUNvbmZpcm1hdGlvbklmUmVxdWlyZWQoZGVsZWdhdGVkQ2VydCxcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtzdGF0dXM6IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkfSksXHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0RlY2lzaW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dDZXJ0aWZpY2F0aW9uUmVtaW5kZXJFbWFpbERpYWxvZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjZXJ0aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgY2VydElkID0gJ2NlcnQxJyxcclxuICAgICAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXywgX2VtYWlsRGlhbG9nU2VydmljZV8pID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgICAgICBlbWFpbERpYWxvZ1NlcnZpY2UgPSBfZW1haWxEaWFsb2dTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblJlbWluZGVyRW1haWxUZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ3NlbmRDZXJ0aWZpY2F0aW9uUmVtaW5kZXJFbWFpbCcpO1xyXG4gICAgICAgICAgICBzcHlPbihlbWFpbERpYWxvZ1NlcnZpY2UsICdzZW5kRW1haWxXaXRoRGlhbG9nJyk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZW1haWxEaWFsb2dTZXJ2aWNlLnNlbmRFbWFpbFdpdGhEaWFsb2coKSB3aXRoIGNvcnJlY3QgZnVuY3Rpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5zaG93Q2VydGlmaWNhdGlvblJlbWluZGVyRW1haWxEaWFsb2coY2VydElkKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZW1haWxEaWFsb2dTZXJ2aWNlLnNlbmRFbWFpbFdpdGhEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIGFyZ3VtZW50IGZ1bmN0aW9ucyB0byBtYWtlIHN1cmUgdGhlIGdldC9zZW5kIGZ1bmN0aW9ucyBhcmUgY29ycmVjdFxyXG4gICAgICAgICAgICBsZXQgYXJncyA9IGVtYWlsRGlhbG9nU2VydmljZS5zZW5kRW1haWxXaXRoRGlhbG9nLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBhcmdzWzBdKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uUmVtaW5kZXJFbWFpbFRlbXBsYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQpO1xyXG4gICAgICAgICAgICBhcmdzWzFdKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zZW5kQ2VydGlmaWNhdGlvblJlbWluZGVyRW1haWwpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uZmlybVJldm9rZUFjY291bnREZWNpc2lvbkNoYW5nZScsICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiB0ZXN0Q29uZmlybVJldm9rZUFjY291bnQoY3VycmVudFN0YXR1cywgc3RhdHVzLCBkZWNpc2lvbiwgaXNTaG93LCBpc1Bhc3NlZERlY2lzaW9uKSB7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbScpLmFuZC5yZXR1cm5WYWx1ZShkZWNpc2lvbik7XHJcbiAgICAgICAgICAgIGNlcnRJdGVtLmRlY2lzaW9uU3RhdHVzID0ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5jb25maXJtQWNjb3VudERlY2lzaW9uQ2hhbmdlKFtjZXJ0SXRlbV0sIHN0YXR1cyxcclxuICAgICAgICAgICAgICAgIChpc1Bhc3NlZERlY2lzaW9uKSA/IGRlY2lzaW9uIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgaWYgKGlzU2hvdykge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpc1Bhc3NlZERlY2lzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydEl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyBpZiBleGlzdGluZyBkZWNpc2lvbiBpcyBub3QgUmV2b2tlQWNjb3VudCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKTtcclxuICAgICAgICAgICAgdGVzdENvbmZpcm1SZXZva2VBY2NvdW50KHVuZGVmaW5lZCwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpLCBkZWNpc2lvbiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgZGlhbG9nIGlmIGV4aXN0aW5nIGRlY2lzaW9uIGlzIFJldm9rZUFjY291bnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnUmV2b2tlQWNjb3VudCcpKTtcclxuICAgICAgICAgICAgdGVzdENvbmZpcm1SZXZva2VBY2NvdW50KHVuZGVmaW5lZCwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpLCBkZWNpc2lvbiwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGlmIHNhdmVkIGRlY2lzaW9uIGlzIFJldm9rZUFjY291bnQgd2l0aCBleGlzdGluZyBkZWNpc2lvbiBhbHJlYWR5IG1hZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oY2VydEl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSk7XHJcbiAgICAgICAgICAgIHRlc3RDb25maXJtUmV2b2tlQWNjb3VudCgnUmV2b2tlQWNjb3VudCcsIGdldFN0YXR1cygnQXBwcm92ZWQnKSwgZGVjaXNpb24sIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGRpYWxvZyBpZiBzYXZlZCBkZWNpc2lvbiBpcyBSZXZva2VBY2NvdW50IHdpdGggbm8gZGVjaXNpb24gbWFkZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdENvbmZpcm1SZXZva2VBY2NvdW50KCdSZXZva2VBY2NvdW50JywgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpLCB1bmRlZmluZWQsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZmV0Y2hlcyB0aGUgZWZmZWN0aXZlIGRlY2lzaW9uIGlmIG5vdCBwYXNzZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RDb25maXJtUmV2b2tlQWNjb3VudCgnUmV2b2tlQWNjb3VudCcsIGdldFN0YXR1cygnQXBwcm92ZWQnKSwgdW5kZWZpbmVkLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNEaWFsb2dSZXF1aXJlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwRGlhbG9nUmVxdWlyZWQoc3B5UmVzdWx0cykge1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kcyA9IFtcclxuICAgICAgICAgICAgICAgICdjaGVja0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQnLFxyXG4gICAgICAgICAgICAgICAgJ2NoZWNrQ29tbWVudERpYWxvZ1JlcXVpcmVkJyxcclxuICAgICAgICAgICAgICAgICdjaGVja1Jldm9jYXRpb25XaXRoU3VtbWFyeScsXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uJ1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBzcHlSZXN1bHRzID0gc3B5UmVzdWx0cyB8fCB7fTtcclxuICAgICAgICAgICAgbWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IHNweVJlc3VsdHNbbWV0aG9kXSB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLCBtZXRob2QpLmFuZC5yZXR1cm5WYWx1ZShyZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm9uZSBvZiB0aGUgZGlhbG9ncyBhcmUgcmVxdWlyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwRGlhbG9nUmVxdWlyZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EaWFsb2dTZXJ2aWNlLmlzRGlhbG9nUmVxdWlyZWQoY2VydEl0ZW0sIGdldFN0YXR1cygnTWl0aWdhdGVkJykpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbGxvdyBleGNlcHRpb24gZGlhbG9nIGlzIHJlcXVpcmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cERpYWxvZ1JlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICdjaGVja0FsbG93RXhjZXB0aW9uRGlhbG9nUmVxdWlyZWQnOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuaXNEaWFsb2dSZXF1aXJlZChjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdNaXRpZ2F0ZWQnKSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY29tbWVudCBkaWFsb2cgaXMgcmVxdWlyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwRGlhbG9nUmVxdWlyZWQoe1xyXG4gICAgICAgICAgICAgICAgJ2NoZWNrQ29tbWVudERpYWxvZ1JlcXVpcmVkJyA6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5pc0RpYWxvZ1JlcXVpcmVkKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ01pdGlnYXRlZCcpKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiByZW1lZGlhdGlvbiBzdW1tYXJ5IGlzIHJlcXVpcmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cERpYWxvZ1JlcXVpcmVkKHtcclxuICAgICAgICAgICAgICAgICdjaGVja1Jldm9jYXRpb25XaXRoU3VtbWFyeScgOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRpYWxvZ1NlcnZpY2UuaXNEaWFsb2dSZXF1aXJlZChjZXJ0SXRlbSwgZ2V0U3RhdHVzKCdSZXZva2VkJykpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ3JldHVybnMgdHJ1ZSBpZiB2aW9sYXRpb24gcmV2b2NhdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgc2V0dXBEaWFsb2dSZXF1aXJlZCh7XHJcbiAgICAgICAgICAgICAgICAnY2hlY2tQb2xpY3lWaW9sYXRpb25SZXZvY2F0aW9uJyA6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGlhbG9nU2VydmljZS5pc0RpYWxvZ1JlcXVpcmVkKGNlcnRJdGVtLCBnZXRTdGF0dXMoJ1Jldm9rZWQnKSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
