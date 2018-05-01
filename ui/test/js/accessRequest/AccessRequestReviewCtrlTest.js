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

            /**
             * Tests for the AccessRequestReviewCtrl.
             */
            describe('AccessRequestReviewCtrl', function () {

                var $controller,
                    accessRequestDataService,
                    accessRequestReviewService,
                    accessRequestAccountSelectionService,
                    configServiceMock,
                    testService,
                    ctrl,
                    item1,
                    item2,
                    requestedItem1,
                    requestedItem2,
                    identity,
                    $rootScope,
                    notificationService,
                    configService,
                    accessRequestDeepFilterService,
                    navigationService,
                    location,
                    promiseTrackerService,
                    goodResp,
                    goodRespMultiple,
                    badResp,
                    partialResp,
                    workItemResp,
                    policyViolationResp,
                    isMobile = false,
                    formWorkItemResp,
                    accessRequestTestData,
                    workItemService = {
                    navigateToWorkItemPage: jasmine.createSpy('navigateToWorkItemPage'),
                    openWorkItemDialog: angular.noop
                },
                    gotPolicyViolations = {
                    status: 200,
                    data: {
                        objects: [{
                            policyName: 'SOD Policy',
                            description: 'Accounts Receivable and Accounts Payable should not be combined.',
                            ruleName: 'Accounting SOD-762',
                            workitemId: '2c908cd54ba92fde014bbdbeacbf04d2'
                        }]
                    }
                };

                // Let the tests know we'll use the access request module.
                beforeEach(module(testModule, accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 18 */
                beforeEach(inject(function (_accessRequestDataService_, AccessRequestItem, RequestedAccessItem, Identity, _$rootScope_, _spNotificationService_, _$controller_, _testService_, _accessRequestReviewService_, _accessRequestAccountSelectionService_, _configService_, SP_CONFIG_SERVICE, _accessRequestDeepFilterService_, _navigationService_, $location, _promiseTrackerService_, SubmitResultItem, _accessRequestTestData_) {

                    // Save the services.
                    accessRequestDataService = _accessRequestDataService_;
                    accessRequestReviewService = _accessRequestReviewService_;
                    accessRequestAccountSelectionService = _accessRequestAccountSelectionService_;
                    accessRequestDeepFilterService = _accessRequestDeepFilterService_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    notificationService = _spNotificationService_;
                    configService = _configService_;
                    navigationService = _navigationService_;
                    location = $location;
                    promiseTrackerService = _promiseTrackerService_;
                    accessRequestTestData = _accessRequestTestData_;

                    // Mock out the config service
                    configServiceMock = {
                        getColumnConfigEntries: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {}
                        }, {}),
                        getConfigValue: configService.getConfigValue,
                        isMobile: function () {
                            return isMobile;
                        }
                    };

                    // Create some identities and items to test with.
                    identity = new Identity(accessRequestTestData.IDENTITY1);
                    item1 = new AccessRequestItem(accessRequestTestData.ROLE);
                    item2 = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);
                    requestedItem1 = new RequestedAccessItem(item1);
                    requestedItem2 = new RequestedAccessItem(item2);
                    requestedItem2.permittedById = item1.getId();

                    spyOn($rootScope, '$broadcast').and.callThrough();

                    // Spy on navigationService.go() and do nothing since 'home' isn't defined.
                    spyOn(navigationService, 'go').and.returnValue(null);

                    // Spy on the promise tracker, but call through so it does stuff
                    spyOn(promiseTrackerService, 'track').and.callThrough();

                    // Create the controller to test with.
                    ctrl = createController();

                    SailPoint.configData = {};
                    SailPoint.configData[SP_CONFIG_SERVICE.ACCESS_REQUEST_ALLOW_PRIORITY_EDITING] = true;

                    goodResp = [new SubmitResultItem({
                        workflowStatus: 'executing',
                        identityRequestId: '1234'
                    })];

                    goodRespMultiple = [new SubmitResultItem({
                        workflowStatus: 'executing',
                        identityRequestId: '1234'
                    }), new SubmitResultItem({
                        workflowStatus: 'executing',
                        identityRequestId: '3456'
                    })];

                    badResp = [new SubmitResultItem({
                        workflowStatus: 'failed',
                        messages: [{
                            messageOrKey: 'ui_access_request_submitted_requests_failed_with_violation',
                            status: 'ERROR'
                        }]
                    })];

                    partialResp = [new SubmitResultItem({
                        workflowStatus: 'failed'
                    }), new SubmitResultItem({
                        workflowStatus: 'executing'
                    })];

                    workItemResp = [new SubmitResultItem({
                        allowViolations: false,
                        approvalItems: [{
                            approvalItemId: 'aee9fecab0bb43598a254a87cf495233',
                            requestItemId: '12345134513451234'
                        }],
                        identityRequestId: '9',
                        workflowStatus: 'approving',
                        workflowWorkItemId: '2c908cb84e6e5250014e6e6c98250059',
                        workflowWorkItemType: 'ManualAction'
                    })];

                    formWorkItemResp = [new SubmitResultItem({
                        allowViolations: false,
                        approvalItems: [{
                            approvalItemId: 'b43598a254a87cf495233',
                            requestItemId: '3451234'
                        }],
                        identityRequestId: '9',
                        workflowStatus: 'approving',
                        workflowWorkItemId: '250014e6e6c98250059',
                        workflowWorkItemType: 'Form'
                    })];

                    policyViolationResp = [new SubmitResultItem({
                        workflowStatus: 'approving',
                        workflowWorkItemType: 'ViolationReview',
                        workflowWorkItemId: '2c908cd54ba92fde014bbdbeacbf04d2',
                        approvalItems: [{
                            requestItemId: '1',
                            approvalItemId: 'approvalItemId1'
                        }]
                    })];

                    $rootScope.$apply();
                }));

                function createController() {
                    return $controller('AccessRequestReviewCtrl', {
                        accessRequestDataService: accessRequestDataService,
                        configService: configServiceMock,
                        workItemService: workItemService
                    });
                }

                describe('added access request items', function () {

                    var doRemove = true,
                        permittedItemMap;

                    /**
                     * Inject the dependencies and setup mocks.
                     */
                    beforeEach(inject(function () {
                        // Mock out the data service.
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([requestedItem1, requestedItem2]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getTopLevelRequestedItems').and.returnValue([requestedItem1]);

                        permittedItemMap = {
                            '1': [requestedItem2],
                            '2': []
                        };

                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedPermittedItems').and.callFake(function (requestedItem) {
                            return permittedItemMap[requestedItem.getUniqueId()];
                        });

                        spyOn(accessRequestDataService.getAccessRequest(), 'removeRequestedItem').and.callFake(function () {
                            return doRemove;
                        });
                        spyOn(ctrl, 'addRemovedItemMessage').and.callThrough();
                    }));

                    it('getRequestedItems() returns the added access items', function () {
                        var items = ctrl.getRequestedItems();
                        expect(accessRequestDataService.getAccessRequest().getRequestedItems).toHaveBeenCalled();
                        expect(items.length).toEqual(2);
                        expect(items.indexOf(requestedItem1)).toBeGreaterThan(-1);
                        expect(items.indexOf(requestedItem2)).toBeGreaterThan(-1);
                    });

                    it('getTopLevelRequestedItems() returns the top level added access items', function () {
                        var items = ctrl.getTopLevelRequestedItems();
                        expect(accessRequestDataService.getAccessRequest().getTopLevelRequestedItems).toHaveBeenCalled();
                        expect(items.length).toEqual(1);
                        expect(items.indexOf(requestedItem1)).toBeGreaterThan(-1);
                        expect(items.indexOf(requestedItem2)).not.toBeGreaterThan(-1);
                    });

                    it('getRequestedPermittedItems() returns the permitted roles for the given item', function () {
                        var permittedItems = ctrl.getRequestedPermittedItems(requestedItem1);
                        expect(accessRequestDataService.getAccessRequest().getRequestedPermittedItems).toHaveBeenCalledWith(requestedItem1);
                        expect(permittedItems.length).toEqual(1);
                        expect(permittedItems.indexOf(requestedItem1)).not.toBeGreaterThan(-1);
                        expect(permittedItems.indexOf(requestedItem2)).toBeGreaterThan(-1);
                        permittedItems = ctrl.getRequestedPermittedItems(requestedItem2);
                        expect(accessRequestDataService.getAccessRequest().getRequestedPermittedItems).toHaveBeenCalledWith(requestedItem2);
                        expect(permittedItems.length).toEqual(0);
                    });

                    it('removeRequestedItem() removes the added access items', function () {
                        ctrl.removeRequestedItem(requestedItem1);
                        expect(accessRequestDataService.getAccessRequest().removeRequestedItem).toHaveBeenCalledWith(item1);
                        expect(ctrl.addRemovedItemMessage).toHaveBeenCalledWith(item1);
                        expect(ctrl.screenReaderMessages.length).toEqual(1);
                    });

                    it('removeRequestedItem() does not add screen reader message if item not removed', function () {
                        doRemove = false;
                        ctrl.removeRequestedItem(requestedItem1);
                        expect(ctrl.addRemovedItemMessage).not.toHaveBeenCalled();
                    });
                });

                it('tracks which roles have expanded permits', function () {
                    expect(ctrl.isShowPermittedRoles(requestedItem1)).toBeTruthy();
                    ctrl.toggleShowPermittedRoles(requestedItem1);
                    expect(ctrl.isShowPermittedRoles(requestedItem1)).toBeFalsy();
                    ctrl.toggleShowPermittedRoles(requestedItem1);
                    expect(ctrl.isShowPermittedRoles(requestedItem1)).toBeTruthy();
                    expect(ctrl.isShowPermittedRoles(requestedItem2)).toBeTruthy();
                });

                describe('hasRequestedItems', function () {
                    it('should return false if has no add access requests', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([]);
                        hasAccessRequests = ctrl.hasRequestedItems();
                        expect(hasAccessRequests).toBeFalsy();
                    });
                    it('should return true if has an add access requests', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue(['foo']);
                        hasAccessRequests = ctrl.hasRequestedItems();
                        expect(hasAccessRequests).toBeTruthy();
                    });
                    it('should return true if has multiple add access requests', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue(['foo', 'bar']);
                        hasAccessRequests = ctrl.hasRequestedItems();
                        expect(hasAccessRequests).toBeTruthy();
                    });
                });

                describe('removed current access items', function () {

                    var doRemove = true,
                        removedItem1,
                        removedItem2;

                    /**
                     * Inject the dependencies and setup mocks.
                     */
                    beforeEach(inject(function (RemovedAccessItem) {
                        removedItem1 = new RemovedAccessItem(item1);
                        removedItem2 = new RemovedAccessItem(item2);
                        // Mock out the data service.
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue([removedItem1, removedItem2]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'removeRemovedCurrentAccessItem').and.callFake(function () {
                            return doRemove;
                        });
                        spyOn(ctrl, 'addRemovedItemMessage').and.callThrough();
                    }));

                    it('getRemovedCurrentAccessItems() returns the removed access items', function () {
                        var items = ctrl.getRemovedCurrentAccessItems();
                        expect(accessRequestDataService.getAccessRequest().getRemovedCurrentAccessItems).toHaveBeenCalled();
                        expect(items.length).toEqual(2);
                        expect(items.indexOf(removedItem1)).toBeGreaterThan(-1);
                        expect(items.indexOf(removedItem2)).toBeGreaterThan(-1);
                    });

                    it('removeRemovedCurrentAccessItem() removes the access items', function () {
                        ctrl.removeRemovedCurrentAccessItem(removedItem1);
                        expect(accessRequestDataService.getAccessRequest().removeRemovedCurrentAccessItem).toHaveBeenCalledWith(item1);
                        expect(ctrl.addRemovedItemMessage).toHaveBeenCalledWith(item1);
                        expect(ctrl.screenReaderMessages.length).toEqual(1);
                    });

                    it('removeRemovedCurrentAccessItem() does not add screen reader message if item not removed', function () {
                        doRemove = false;
                        ctrl.removeRemovedCurrentAccessItem(removedItem1);
                        expect(ctrl.addRemovedItemMessage).not.toHaveBeenCalled();
                    });
                });

                describe('hasRemovedCurrentAccessItems', function () {
                    it('should return false if has no remove access requests', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue([]);
                        hasAccessRequests = ctrl.hasRemovedCurrentAccessItems();
                        expect(hasAccessRequests).toBeFalsy();
                    });
                    it('should return true if has a remove access request', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue(['foo']);
                        hasAccessRequests = ctrl.hasRemovedCurrentAccessItems();
                        expect(hasAccessRequests).toBeTruthy();
                    });
                    it('should return true if has multiple remove access requests', function () {
                        var hasAccessRequests;
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue(['foo', 'bar']);
                        hasAccessRequests = ctrl.hasRemovedCurrentAccessItems();
                        expect(hasAccessRequests).toBeTruthy();
                    });
                });

                describe('cancelAccessRequest', function () {
                    var spModal, $q, doCancel;

                    beforeEach(inject(function (_spModal_, _$q_) {
                        $q = _$q_;
                        spModal = _spModal_;
                        doCancel = false;

                        spyOn(spModal, 'open').and.callFake(function () {
                            var deferred = $q.defer();
                            if (doCancel) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                            }

                            return {
                                result: deferred.promise
                            };
                        });
                    }));

                    it('should open modal', function () {
                        ctrl.cancelAccessRequest();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should go to home and complete the flow if modal is accepted', function () {
                        var config;

                        // Set up the test to accept the cancel dialog.
                        doCancel = true;
                        ctrl.cancelAccessRequest();
                        $rootScope.$digest();
                        expect(navigationService.go).toHaveBeenCalled();
                        config = navigationService.go.calls.mostRecent().args[0];
                        expect(config).not.toBeNull();
                        expect(config.outcome).toEqual('viewHome');
                        expect(config.state).toEqual('home');
                        expect(config.stateParams).toEqual({ completeFlow: 'accessRequest' });
                    });

                    it('should not go to home if modal is rejected', function () {
                        ctrl.cancelAccessRequest();
                        $rootScope.$digest();
                        expect(navigationService.go).not.toHaveBeenCalled();
                    });

                    it('should create dialog with appropriate configs', function () {
                        ctrl.cancelAccessRequest();
                        expect(spModal.open.calls.mostRecent().args[0].content).toEqual('ui_access_cancel_request_dialog_text');

                        ctrl.policyViolations.push('foo');

                        ctrl.cancelAccessRequest();
                        expect(spModal.open.calls.mostRecent().args[0].content).toEqual('ui_access_cancel_request_dialog_violations_text');

                        // Not sure how we can really test the action function other than if it's there or not.
                        expect(spModal.open.calls.mostRecent().args[0].buttons[1].action).toBeTruthy();
                    });
                });

                describe('submitWithViolations', function () {
                    var $q;
                    beforeEach(inject(function (_$q_) {
                        $q = _$q_;
                        accessRequestReviewService.submitWithViolations = jasmine.createSpy();
                    }));

                    it('should call through to accessRequestReviewService.submitWithViolations', function () {
                        accessRequestReviewService.submitWithViolations.and.returnValue($q.defer().promise);
                        ctrl.submitWithViolations();
                        $rootScope.$apply();
                        expect(accessRequestReviewService.submitWithViolations).toHaveBeenCalled();
                    });

                    describe('with required comment', function () {
                        var violationService, initialRequireComment;

                        beforeEach(inject(function (_violationService_) {
                            violationService = _violationService_;
                            initialRequireComment = ctrl.requireViolationComment;
                        }));

                        afterEach(function () {
                            ctrl.requireViolationComment = initialRequireComment;
                        });

                        it('should prompt with comment dialog if required', function () {
                            violationService.showCommentDialog = jasmine.createSpy().and.returnValue($q.defer().promise);
                            ctrl.requireViolationComment = true;

                            ctrl.submitWithViolations();
                            $rootScope.$apply();
                            expect(violationService.showCommentDialog).toHaveBeenCalled();
                        });

                        it('should call through to accessRequestReviewService.submitWithViolations with comment', function () {
                            var comment = 'test comment';
                            violationService.showCommentDialog = jasmine.createSpy().and.returnValue($q.when(comment));
                            accessRequestReviewService.submitWithViolations.and.returnValue($q.defer().promise);
                            ctrl.requireViolationComment = true;

                            ctrl.submitWithViolations();
                            $rootScope.$apply();
                            expect(accessRequestReviewService.submitWithViolations).toHaveBeenCalled();
                            expect(accessRequestReviewService.submitWithViolations.calls.mostRecent().args[1]).toBe(comment);
                        });
                    });
                });

                describe('submit', function () {
                    var submitDeferred, resubmitDeferred;

                    beforeEach(inject(function ($q) {
                        submitDeferred = $q.defer();
                        resubmitDeferred = $q.defer();

                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            return submitDeferred.promise;
                        });

                        spyOn(accessRequestReviewService, 'resolveViolations').and.callFake(function () {
                            return resubmitDeferred.promise;
                        });

                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([requestedItem1, requestedItem2]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItemById').and.callFake(function (itemId) {
                            if ('1' === itemId) {
                                return requestedItem1;
                            }
                            if ('2' === itemId) {
                                return requestedItem2;
                            }
                            throw 'Unhandled item ID: ' + itemId;
                        });
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue([item2]);
                    }));

                    it('clears itemsMissingAccountSelections', function () {
                        ctrl.itemsMissingAccountSelections = ['one fish', 'two fish'];
                        ctrl.submit();
                        expect(ctrl.itemsMissingAccountSelections).toEqual([]);
                    });

                    it('should call review service submitAccessRequestItems', function () {
                        ctrl.submit();

                        expect(accessRequestReviewService.submitAccessRequestItems).toHaveBeenCalledWith([identity], [requestedItem1, requestedItem2], [item2], null);
                    });

                    it('should call review service with priority submitAccessRequestItems', function () {
                        ctrl.setPriority('Low');
                        ctrl.submit();

                        expect(accessRequestReviewService.submitAccessRequestItems).toHaveBeenCalledWith([identity], [requestedItem1, requestedItem2], [item2], 'Low');
                    });

                    it('should add tracked promise', function () {
                        expect(promiseTrackerService.track).not.toHaveBeenCalled();
                        ctrl.submit();
                        expect(promiseTrackerService.track).toHaveBeenCalled();
                        expect(promiseTrackerService.isInProgress()).toBe(true);
                    });

                    it('should call resolveViolations if has policy violations', function () {
                        spyOn(ctrl, 'hasPolicyViolations').and.returnValue(true);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(accessRequestReviewService.resolveViolations).toHaveBeenCalled();
                        expect(accessRequestReviewService.resolveViolations.calls.mostRecent().args[1]).toEqual([]);
                    });

                    describe('with missing account selections', function () {

                        beforeEach(inject(function (RESPONSE_ERROR_TYPE) {
                            var responseData = {
                                status: 400,
                                data: {
                                    items: {
                                        '1': [accessRequestTestData.IDENTITY_ACCT_SELECTION1],
                                        '2': [accessRequestTestData.IDENTITY_ACCT_SELECTION2]
                                    },
                                    type: RESPONSE_ERROR_TYPE.MISSINGACCOUNTSELECTIONS
                                }
                            };

                            // Make the submission fail.
                            submitDeferred.reject(responseData);
                        }));

                        it('sets isSubmitting to false', function () {
                            expect(promiseTrackerService.track).not.toHaveBeenCalled();
                            ctrl.submit();
                            $rootScope.$apply();
                            expect(promiseTrackerService.track).toHaveBeenCalled();
                            expect(promiseTrackerService.isInProgress()).toBe(false);
                        });

                        it('adds missing account selections to RequestedAccessItem', inject(function (IdentityAccountSelection) {
                            var sel1 = accessRequestTestData.IDENTITY_ACCT_SELECTION1,
                                sel2 = accessRequestTestData.IDENTITY_ACCT_SELECTION2;

                            spyOn(IdentityAccountSelection, 'mergeAccountSelections').and.callThrough();

                            // Make item1 start with a selection and item2 not have any.  The selections
                            // returned in the response should get merged with what is already there.
                            requestedItem1.accountSelections = [new IdentityAccountSelection(sel2)];
                            requestedItem2.accountSelections = [];

                            // Submit.
                            ctrl.submit();
                            $rootScope.$apply();

                            // Verify that the account selections got updated on the items.
                            expect(requestedItem1.accountSelections.length).toEqual(2);
                            expect(requestedItem1.accountSelections[0].getIdentityId()).toEqual(sel2.identityId);
                            expect(requestedItem1.accountSelections[1].getIdentityId()).toEqual(sel1.identityId);

                            expect(requestedItem2.accountSelections.length).toEqual(1);
                            expect(requestedItem2.accountSelections[0].getIdentityId()).toEqual(sel2.identityId);

                            expect(IdentityAccountSelection.mergeAccountSelections).toHaveBeenCalled();
                        }));

                        it('sets itemsMissingAccountSelections', function () {
                            var item1Name = requestedItem1.item.getDisplayableName(),
                                item2Name = requestedItem2.item.getDisplayableName();

                            ctrl.submit();
                            $rootScope.$apply();

                            expect(ctrl.itemsMissingAccountSelections.length).toEqual(2);
                            expect(ctrl.itemsMissingAccountSelections.indexOf(item1Name > -1)).toBeTruthy();
                            expect(ctrl.itemsMissingAccountSelections.indexOf(item2Name > -1)).toBeTruthy();
                        });
                    });

                    describe('with items already assigned', function () {
                        beforeEach(inject(function (RESPONSE_ERROR_TYPE) {
                            var responseData = {
                                status: 400,
                                data: {
                                    items: ['item1', 'item2'],
                                    type: RESPONSE_ERROR_TYPE.DUPLICATEASSIGNMENT
                                }
                            };

                            // Make the submission fail.
                            submitDeferred.reject(responseData);
                        }));

                        it('sets isSubmitting to false', function () {
                            expect(promiseTrackerService.track).not.toHaveBeenCalled();
                            ctrl.submit();
                            expect(promiseTrackerService.track).toHaveBeenCalled();
                            expect(promiseTrackerService.isInProgress()).toBe(true);
                            $rootScope.$apply();
                            expect(promiseTrackerService.isInProgress()).toBe(false);
                        });

                        it('sets itemsAlreadyAssigned', function () {
                            ctrl.submit();
                            $rootScope.$apply();

                            expect(ctrl.itemsAlreadyAssigned.length).toEqual(2);
                            expect(ctrl.itemsAlreadyAssigned[0]).toEqual('item1');
                            expect(ctrl.itemsAlreadyAssigned[1]).toEqual('item2');
                        });
                    });
                });

                describe('submit set notifications, good response', function () {
                    var testResp;

                    beforeEach(inject(function ($q) {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.resolve(testResp);
                            return deferred.promise;
                        });
                        spyOn(notificationService, 'addNotification');
                    }));

                    it('should call NotificationService with success message with identity request id', function () {
                        testResp = goodResp;
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(notificationService.addNotification).toHaveBeenCalledWith('ui_access_request_submitted_requests_with_id', 'SUCCESS', ['1234']);
                    });

                    it('should call NotificationService with success message without identity request id', function () {
                        testResp = goodRespMultiple;
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(notificationService.addNotification).toHaveBeenCalledWith('ui_access_request_submitted_requests', 'SUCCESS', undefined);
                    });
                });

                describe('submit set notifications, bad response', function () {
                    beforeEach(inject(function ($q) {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.resolve(badResp);
                            return deferred.promise;
                        });
                        spyOn(notificationService, 'addNotification');
                    }));

                    it('should call NotificationService with error message', function () {
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(notificationService.addNotification).toHaveBeenCalledWith('ui_access_request_submitted_requests_failed_with_violation', 'ERROR', undefined, true);
                    });
                });

                describe('submit set notifications, partial response', function () {
                    beforeEach(inject(function ($q) {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.resolve(partialResp);
                            return deferred.promise;
                        });
                        spyOn(notificationService, 'addNotification');
                    }));

                    it('should call NotificationService with warning message', function () {
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(notificationService.addNotification).toHaveBeenCalledWith('ui_access_request_submitted_requests_failures', 'WARN', [1, 1], true);
                    });
                });

                describe('submit button', function () {
                    beforeEach(function () {
                        /* Disregard the existing conditions, here we are testing the violation stuff */
                        spyOn(ctrl, 'hasRequestedItems').and.returnValue(true);
                        spyOn(ctrl, 'hasRemovedCurrentAccessItems').and.returnValue(true);
                    });

                    it('should be disabled if there are policy violations but no selections', function () {
                        spyOn(ctrl, 'hasPolicyViolations').and.returnValue(true);
                        expect(ctrl.getSubmitDisabled()).toBe(true);
                    });

                    it('should be enabled if there are policy violations and selections', function () {
                        spyOn(ctrl, 'hasPolicyViolations').and.returnValue(true);
                        ctrl.approvalItemRemoved = true;
                        expect(ctrl.getSubmitDisabled()).toBe(false);
                    });
                });

                describe('submit work item response', function () {
                    var deferred, $q;
                    beforeEach(inject(function (_$q_) {
                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);
                        $q = _$q_;
                        deferred = $q.defer();
                        spyOn(workItemService, 'openWorkItemDialog').and.returnValue(deferred.promise);
                    }));

                    it('should not call openWorkItemDialog for single user before prompting', function () {
                        workItemService.isSupportedWorkItemType = jasmine.createSpy().and.returnValue(false);

                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            deferred.resolve(workItemResp);
                            return deferred.promise;
                        });
                        spyOn(accessRequestDataService, 'isSingleUserRequest').and.returnValue(true);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(workItemService.openWorkItemDialog).not.toHaveBeenCalled();
                    });

                    it('should not call openWorkItemDialog for multiple user', function () {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            deferred.resolve(workItemResp);
                            return deferred.promise;
                        });
                        spyOn(accessRequestDataService, 'isSingleUserRequest').and.returnValue(false);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(workItemService.openWorkItemDialog).not.toHaveBeenCalled();
                    });

                    it('should not call openWorkItemDialog for single user without work item', function () {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            deferred.resolve(goodResp);
                            return deferred.promise;
                        });
                        spyOn(accessRequestDataService, 'isSingleUserRequest').and.returnValue(true);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(workItemService.openWorkItemDialog).not.toHaveBeenCalled();
                    });

                    it('should not call openWorkItemDialog for multiple user without work item', function () {
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            deferred.resolve(goodResp);
                            return deferred.promise;
                        });
                        spyOn(accessRequestDataService, 'isSingleUserRequest').and.returnValue(false);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(workItemService.openWorkItemDialog).not.toHaveBeenCalled();
                    });

                    describe('unsupported work item types', function () {
                        var supportedWorkItemType = false;

                        beforeEach(function () {
                            accessRequestReviewService.submitAccessRequestItems = jasmine.createSpy().and.returnValue($q.when(workItemResp));

                            accessRequestDataService.isSingleUserRequest = function () {
                                return true;
                            };

                            workItemService.isSupportedWorkItemType = function () {
                                return supportedWorkItemType;
                            };
                        });

                        function setupFormToManualActionTest(mobile) {
                            isMobile = mobile;

                            //for a form
                            supportedWorkItemType = true;

                            // mock openWorkItemDialog to return manualAction work item
                            workItemService.openWorkItemDialog = jasmine.createSpy().and.returnValue($q.when(workItemResp[0]));

                            // mock submit to return form work item
                            accessRequestReviewService.submitAccessRequestItems = jasmine.createSpy().and.returnValue($q.when(formWorkItemResp[0]));

                            spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);

                            $rootScope.$apply();

                            ctrl.submit();

                            //for manual action work item
                            supportedWorkItemType = false;
                        }

                        it('should show warning modal for unsupported work item on mobile', function () {
                            isMobile = true;

                            workItemService.openUnSupportedWorkItemDialog = jasmine.createSpy().and.returnValue($q.when());

                            ctrl.submit();
                            $rootScope.$apply();
                            expect(workItemService.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                        });

                        it('should navigate to JSF work item page for unsupported work item on desktop', function () {
                            isMobile = false;
                            ctrl.submit();
                            $rootScope.$apply();
                            expect(workItemService.navigateToWorkItemPage).toHaveBeenCalledWith(workItemResp[0].workflowWorkItemId);
                        });

                        it('should navigate to JSF work item page from a form for unsupported work item on desktop', function () {
                            setupFormToManualActionTest(false);
                            expect(workItemService.navigateToWorkItemPage).toHaveBeenCalledWith(workItemResp[0].workflowWorkItemId);
                        });

                        it('should show warning modal from a form for unsupported work item on mobile', function () {
                            setupFormToManualActionTest(true);
                            expect(workItemService.openUnSupportedWorkItemDialog).toHaveBeenCalled();
                        });
                    });
                });

                describe('submitAccessRequest policy violations response', function () {
                    beforeEach(inject(function ($q) {
                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);
                        spyOn(accessRequestReviewService, 'submitAccessRequestItems').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.resolve(policyViolationResp);
                            return deferred.promise;
                        });
                        spyOn(accessRequestDataService, 'getPolicyViolations').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.resolve(gotPolicyViolations);
                            return deferred.promise;
                        });
                    }));

                    it('should have policy violations set in ctrl', function () {
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(ctrl.hasPolicyViolations()).toBeTruthy();
                        expect(ctrl.getPolicyViolations().length).toEqual(1);

                        ctrl.clearPolicyViolations();
                        expect(ctrl.hasPolicyViolations()).toBeFalsy();
                        expect(ctrl.getPolicyViolations().length).toEqual(0);
                    });

                    it('should update the requested items with their respective approval ids', function () {
                        var requestedItem;
                        ctrl.submit();
                        $rootScope.$apply();
                        requestedItem = accessRequestDataService.getAccessRequest().getRequestedItem(item1);
                        expect(requestedItem.getApprovalItemId()).toEqual('approvalItemId1');
                    });

                    it('should not throw if an request item is not found', function () {
                        var approvalItems = policyViolationResp[0].approvalItems,
                            stash = approvalItems[0];
                        approvalItems[0] = { requestItemId: 'doesNotExist' };
                        expect(function () {
                            ctrl.submit();
                            $rootScope.$apply();
                        }).not.toThrow();
                        approvalItems[0] = stash;
                    });
                });

                describe('removing all items', function () {
                    beforeEach(inject(function (AccessRequestItem, Identity) {
                        // Create some identities and items to test with.
                        item1 = new AccessRequestItem(accessRequestTestData.ROLE);
                        item2 = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);

                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);
                    }));

                    it('should disable submit button', function () {
                        expect(ctrl.hasRequestedItems()).toBe(true);
                        ctrl.removeRequestedItem(requestedItem1);
                        expect(ctrl.hasRequestedItems()).toBe(true);
                        expect(ctrl.getSubmitDisabled()).toBe(false);

                        ctrl.removeRequestedItem(requestedItem2);
                        expect(ctrl.hasRequestedItems()).toBe(false);
                        expect(ctrl.getSubmitDisabled()).toBe(true);
                    });
                });

                describe('setting priority', function () {
                    it('should default to normal/null priority', function () {
                        expect(ctrl.getPriority()).toBeNull();
                    });
                    it('should allow setting priority on data service', function () {
                        expect(ctrl.getPriority()).toBeNull();
                        ctrl.setPriority('Low');
                        expect(accessRequestDataService.priority).toBe('Low');
                    });
                });

                describe('editAccountSelections()', function () {
                    var item, requestedItem, modalDeferred;

                    beforeEach(inject(function ($q) {
                        item = {
                            id: 321
                        };
                        requestedItem = {
                            item: item,
                            accountSelections: []
                        };
                        modalDeferred = $q.defer();
                        spyOn(accessRequestAccountSelectionService, 'editAccountSelections').and.returnValue(modalDeferred.promise);
                    }));

                    it('should open the account selection dialog when called', function () {
                        ctrl.editAccountSelections(requestedItem);
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalled();
                    });

                    it('should not update the requestedItem when the dialog is rejected', function () {
                        var accountSelections = [{ 'this is': 'a test' }];
                        requestedItem.accountSelections = accountSelections;
                        ctrl.editAccountSelections(requestedItem);
                        modalDeferred.reject();
                        $rootScope.$digest();
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalled();
                        expect(requestedItem.accountSelections).toBe(accountSelections);
                    });

                    it('should update the requestedItem when the dialog is resolved', function () {
                        var accountSelections = [{ 'this is': 'a test' }],
                            updatedAccountSelections = [{ foo: 'bar' }, { something: 'else' }];
                        requestedItem.accountSelections = accountSelections;
                        ctrl.editAccountSelections(requestedItem);
                        modalDeferred.resolve({
                            accountSelections: updatedAccountSelections
                        });
                        $rootScope.$digest();
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalled();
                        expect(requestedItem.accountSelections).toBe(updatedAccountSelections);
                    });
                });

                describe('showGlobalSunriseSunsetDialog', function () {
                    var spModal, $q;

                    beforeEach(inject(function (_spModal_, _$q_) {
                        $q = _$q_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                    }));

                    it('should open modal', function () {
                        var modalArgs,
                            items,
                            sunriseDate = new Date();

                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);

                        items = ctrl.getRequestedItems();
                        items[0].setSunriseDate(sunriseDate);
                        items[1].setSunriseDate(sunriseDate);

                        ctrl.showGlobalSunriseSunsetDialog(items);

                        modalArgs = spModal.open.calls.mostRecent().args[0];

                        expect(modalArgs.resolve.sunriseDate().getTime()).toBe(sunriseDate.getTime());
                        expect(modalArgs.resolve.sunsetDate()).toBe(undefined);
                        expect(modalArgs.resolve.sunsetOnly()).toEqual(false);
                        expect(modalArgs.title).toBe('ui_request_edit_start_end_date');
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should pass sunsetOnly and set title if true', function () {
                        ctrl.showGlobalSunriseSunsetDialog(ctrl.getRequestedItems(), true);

                        var modalArgs = spModal.open.calls.mostRecent().args[0];

                        expect(modalArgs.resolve.sunsetOnly()).toEqual(true);
                        expect(modalArgs.title).toBe('ui_request_edit_end_date');
                    });
                });

                describe('showSunriseSunsetDialog', function () {
                    var spModal, $q;

                    beforeEach(inject(function (_spModal_, _$q_) {
                        $q = _$q_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                    }));

                    it('should open modal', function () {
                        var modalArgs,
                            sunriseDate = new Date();

                        requestedItem1.setSunriseDate(sunriseDate);
                        ctrl.showSunriseSunsetDialog(requestedItem1);

                        modalArgs = spModal.open.calls.mostRecent().args[0];

                        expect(modalArgs.resolve.sunriseDate().getTime()).toBe(sunriseDate.getTime());
                        expect(modalArgs.resolve.sunsetDate()).toBe(undefined);
                        expect(modalArgs.resolve.sunsetOnly()).toEqual(false);
                        expect(modalArgs.title).toBe('ui_item_edit_start_end_date');
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should pass sunsetOnly if provided', function () {
                        var modalArgs,
                            sunriseDate = new Date();

                        requestedItem1.setSunsetDate(sunriseDate);
                        ctrl.showSunriseSunsetDialog(requestedItem1, true);

                        modalArgs = spModal.open.calls.mostRecent().args[0];

                        expect(modalArgs.resolve.sunsetOnly()).toEqual(true);
                        expect(modalArgs.title).toBe('ui_item_edit_end_date');
                    });
                });

                describe('areGlobalDatesSet', function () {
                    it('should return false when item\'s dates don\'t match', function () {
                        var items,
                            sunriseDate = new Date();

                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeFalsy();

                        items = ctrl.getRequestedItems();
                        items[0].setSunriseDate(sunriseDate);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeFalsy();
                    });

                    it('should return true when item\'s dates do match', function () {
                        var items,
                            sunriseDate = new Date();

                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeFalsy();

                        items = ctrl.getRequestedItems();
                        items[0].setSunriseDate(sunriseDate);
                        items[1].setSunriseDate(sunriseDate);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeTruthy();
                    });

                    it('should return true when date objects are different but with same time', function () {
                        var items,
                            sunriseDate1 = new Date(accessRequestTestData.CURRENT_ACCESS_ROLE.sunrise),
                            sunriseDate2 = new Date(accessRequestTestData.CURRENT_ACCESS_ROLE.sunrise);

                        accessRequestDataService.getAccessRequest().addRequestedItem(item1);
                        accessRequestDataService.getAccessRequest().addRequestedItem(item2);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeFalsy();

                        items = ctrl.getRequestedItems();
                        items[0].setSunriseDate(sunriseDate1);
                        items[1].setSunriseDate(sunriseDate2);

                        expect(ctrl.areGlobalDatesSet(ctrl.getRequestedItems())).toBeTruthy();
                    });
                });

                describe('showCommentDialog', function () {
                    var roleData, spModal, $q, requestedAccessItem, role;

                    beforeEach(inject(function (_spModal_, _$q_, RequestedAccessItem, AccessRequestItem) {
                        roleData = accessRequestTestData.CURRENT_ACCESS_ROLE;
                        role = new AccessRequestItem(roleData);
                        requestedAccessItem = new RequestedAccessItem(role);

                        $q = _$q_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                    }));

                    it('should show modal', function () {
                        var modalArgs;

                        ctrl.showCommentDialog(requestedAccessItem);

                        modalArgs = spModal.open.calls.mostRecent().args[0];

                        expect(modalArgs.title).toBe('ui_access_request_comment_note_dialog_title');
                        expect(modalArgs.resolve.requestedAccessItem()).toBe(requestedAccessItem);

                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('useSunriseDates', function () {

                    it('should be false when SailPoint.configData.USE_SUNRISE_DATES is false', function () {
                        SailPoint.configData.USE_SUNRISE_DATES = false;
                        expect(ctrl.useSunriseDates()).toBeFalsy();
                    });

                    it('should be true when SailPoint.configData.USE_SUNRISE_DATES is true', function () {
                        SailPoint.configData.USE_SUNRISE_DATES = true;
                        expect(ctrl.useSunriseDates()).toBeTruthy();
                    });
                });

                describe('deep filter service', function () {
                    var identityData, identity;

                    beforeEach(inject(function (Identity, $q) {
                        identityData = accessRequestTestData.IDENTITY1;
                        identity = new Identity(identityData);
                        accessRequestDeepFilterService.getTargetIdentity = jasmine.createSpy('getTargetIdentity').and.callFake(function () {
                            return $q.when(identity);
                        });
                        spyOn(location, 'path').and.returnValue('/accessRequest/review');
                        spyOn(notificationService, 'addNotification');
                    }));

                    it('should call getTargetIdentity when deepLinkReview is true', function () {
                        accessRequestDeepFilterService.deepLinkReview = true;

                        // Create the controller so the init gets fired.
                        createController();
                        expect(accessRequestDeepFilterService.getTargetIdentity).toHaveBeenCalled();
                    });

                    it('should not call getTargetIdentity when deepLinkReview is false', function () {
                        accessRequestDeepFilterService.deepLinkReview = false;

                        // Create the controller so the init gets fired.
                        createController();
                        expect(accessRequestDeepFilterService.getTargetIdentity).not.toHaveBeenCalled();
                    });

                    it('should set error and go back to home if target identity is null', function () {
                        identity = null;
                        accessRequestDeepFilterService.deepLinkReview = true;
                        createController();
                        $rootScope.$apply();
                        expect(notificationService.addNotification).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].state).toEqual('home');
                    });

                    it('should add request items for each review item', inject(function ($q) {
                        spyOn(accessRequestDeepFilterService, 'getReviewItems').and.returnValue($q.when([{ thing: 'value' }]));
                        spyOn(accessRequestDataService.getAccessRequest(), 'addRequestedItem');
                        accessRequestDeepFilterService.deepLinkReview = true;

                        // Create the controller so the init gets fired.
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).not.toHaveBeenCalled();
                        createController();
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).toHaveBeenCalled();
                    }));
                });

                describe('showItemDetails', function () {
                    var roleData, spModal, $q, requestedAccessItem, role;

                    beforeEach(inject(function (_spModal_, _$q_, RequestedAccessItem, AccessRequestItem) {
                        roleData = accessRequestTestData.CURRENT_ACCESS_ROLE;
                        role = new AccessRequestItem(roleData);
                        requestedAccessItem = new RequestedAccessItem(role);

                        $q = _$q_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                    }));

                    it('should throw when no item is passed', function () {
                        expect(function () {
                            ctrl.showItemDetails();
                        }).toThrow();
                    });

                    it('should open a modal dialog', function () {
                        ctrl.showItemDetails(requestedAccessItem.item, true);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('hasPolicyViolation for item', function () {
                    var roleData, entitlementData, roleViolationData, entitlementViolationData, AccessRequestItem, RequestedAccessItem, role, entitlement, roleViolation, entitlementViolation, requestedRoleItem, requestedEntitlementItem;

                    /**
                     * Setup the PolicyViolation class and create some data to test with.
                     */
                    /**
                     * Setup the PolicyViolation class and create some data to test with.
                     */
                    beforeEach(inject(function (RequestPolicyViolation, _AccessRequestItem_, _RequestedAccessItem_) {
                        AccessRequestItem = _AccessRequestItem_;
                        RequestedAccessItem = _RequestedAccessItem_;

                        roleData = accessRequestTestData.POLICY_VIOLATION_ROLE;
                        entitlementData = accessRequestTestData.POLICY_VIOLATION_ENTITLEMENT;
                        roleViolationData = accessRequestTestData.ROLE_POLICY_VIOLATION_DATA;
                        entitlementViolationData = accessRequestTestData.ENTITLEMENT_POLICY_VIOLATION_DATA;

                        roleViolation = new RequestPolicyViolation(roleViolationData);
                        entitlementViolation = new RequestPolicyViolation(entitlementViolationData);
                        role = new AccessRequestItem(roleData);
                        entitlement = new AccessRequestItem(entitlementData);
                        requestedRoleItem = new RequestedAccessItem(role);
                        requestedEntitlementItem = new RequestedAccessItem(entitlement);
                    }));

                    it('has role violation', function () {
                        ctrl.clearPolicyViolations();
                        ctrl.policyViolations.push(roleViolation);
                        expect(ctrl.hasPolicyViolation(requestedRoleItem)).toBeTruthy();
                        expect(ctrl.hasPolicyViolation(requestedEntitlementItem)).toBeFalsy();
                    });

                    it('has entitlement violation', function () {
                        ctrl.clearPolicyViolations();
                        ctrl.policyViolations.push(entitlementViolation);
                        expect(ctrl.hasPolicyViolation(requestedRoleItem)).toBeFalsy();
                        expect(ctrl.hasPolicyViolation(requestedEntitlementItem)).toBeTruthy();
                    });
                });

                describe('showViolationDetails', function () {
                    var spModal,
                        ruleName = 'rule',
                        policyName = 'policy';

                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                        spyOn(spModal, 'open');
                    }));

                    it('should set the modal title to the rule name', function () {
                        var violation = {
                            policyName: policyName,
                            ruleName: ruleName
                        };
                        ctrl.showViolationDetails(item1.id, violation);
                        expect(spModal.open).toHaveBeenCalled();
                        spModal.open.calls.mostRecent().args[0].title = ruleName;
                    });
                });

                describe('sortByPolicyViolation filter', function () {
                    var filter,
                        mockCtrl,
                        itemA = { displayableName: 'whatever' },
                        itemB = { displayableName: 'stupid' },
                        itemC = { displayableName: 'dumb' },
                        hasViolations = false;

                    beforeEach(inject(function (sortByPolicyViolationFilter) {
                        filter = sortByPolicyViolationFilter;

                        mockCtrl = {
                            hasPolicyViolations: jasmine.createSpy().and.callFake(function () {
                                return hasViolations;
                            }),
                            hasPolicyViolation: jasmine.createSpy().and.callFake(function (item) {
                                // Fake it so item c has the violation.
                                return item === itemC;
                            })
                        };
                    }));

                    it('does nothing if no violations', function () {
                        var items = [itemA, itemB, itemC];
                        filter(items, mockCtrl);
                        expect(items).toEqual([itemA, itemB, itemC]);
                        expect(mockCtrl.hasPolicyViolation).not.toHaveBeenCalled();
                    });

                    it('moves items with violations to the front', function () {
                        var items = [itemA, itemB, itemC];
                        hasViolations = true;
                        filter(items, mockCtrl);
                        expect(items).toEqual([itemC, itemA, itemB]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdFJldmlld0N0cmxUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsc0JBQXNCLDRCQUE0QixVQUFVLFNBQVM7SUFBdEo7O0lBR0ksSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOzs7OztZQUE3QixTQUFTLDJCQUEyQixZQUFXOztnQkFFM0MsSUFBSTtvQkFBYTtvQkFBMEI7b0JBQTRCO29CQUNuRTtvQkFBbUI7b0JBQWE7b0JBQU07b0JBQU87b0JBQU87b0JBQWdCO29CQUFnQjtvQkFBVTtvQkFDOUY7b0JBQXFCO29CQUFlO29CQUFnQztvQkFBbUI7b0JBQ3ZGO29CQUF1QjtvQkFBVTtvQkFBa0I7b0JBQVM7b0JBQWE7b0JBQWM7b0JBQ3ZGLFdBQVc7b0JBQU87b0JBQWtCO29CQUVwQyxrQkFBa0I7b0JBQ2Qsd0JBQXdCLFFBQVEsVUFBVTtvQkFDMUMsb0JBQW9CLFFBQVE7O29CQUdoQyxzQkFBc0I7b0JBQ2xCLFFBQVE7b0JBQ1IsTUFBTTt3QkFDRixTQUFTLENBQ0w7NEJBQ0ksWUFBYTs0QkFDYixhQUFjOzRCQUNkLFVBQVc7NEJBQ1gsWUFBYTs7Ozs7O2dCQVFqQyxXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsbUJBQW1CLHFCQUMvQyxVQUFVLGNBQWMseUJBQ3hCLGVBQWUsZUFBZSw4QkFDOUIsd0NBQXdDLGlCQUFpQixtQkFDekQsa0NBQWtDLHFCQUFxQixXQUN2RCx5QkFBeUIsa0JBQWtCLHlCQUF5Qjs7O29CQUczRiwyQkFBMkI7b0JBQzNCLDZCQUE2Qjtv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QzNCLFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLGdCQUFnQjs7b0JBRXBCLFdBQVcsT0FBTyxVQUFTLDZCQUE2Qjt3QkFDcEQsU0FBUzs7d0JBRVQsV0FBVzs0QkFDUCxxQkFBcUIsUUFBUSxZQUFZLElBQUksU0FBUyxZQUFXO2dDQUM3RCxPQUFPOzs0QkFFWCxvQkFBb0IsUUFBUSxZQUFZLElBQUksU0FBUyxVQUFTLE1BQU07O2dDQUVoRSxPQUFRLFNBQVM7Ozs7O29CQUs3QixHQUFHLGlDQUFpQyxZQUFXO3dCQUMzQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLE9BQU87d0JBQzNCLE9BQU8sT0FBTzt3QkFDZCxPQUFPLE9BQU8sUUFBUSxDQUFDLE9BQU8sT0FBTzt3QkFDckMsT0FBTyxTQUFTLG9CQUFvQixJQUFJOzs7b0JBRzVDLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELElBQUksUUFBUSxDQUFDLE9BQU8sT0FBTzt3QkFDM0IsZ0JBQWdCO3dCQUNoQixPQUFPLE9BQU87d0JBQ2QsT0FBTyxPQUFPLFFBQVEsQ0FBQyxPQUFPLE9BQU87Ozs7OztHQXBDOUMiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0UmV2aWV3Q3RybFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBY2Nlc3NSZXF1ZXN0UmV2aWV3Q3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0UmV2aWV3Q3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciAkY29udHJvbGxlciwgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZSwgYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gICAgICAgIGNvbmZpZ1NlcnZpY2VNb2NrLCB0ZXN0U2VydmljZSwgY3RybCwgaXRlbTEsIGl0ZW0yLCByZXF1ZXN0ZWRJdGVtMSwgcmVxdWVzdGVkSXRlbTIsIGlkZW50aXR5LCAkcm9vdFNjb3BlLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2UsIGNvbmZpZ1NlcnZpY2UsIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgbmF2aWdhdGlvblNlcnZpY2UsIGxvY2F0aW9uLFxyXG4gICAgICAgIHByb21pc2VUcmFja2VyU2VydmljZSwgZ29vZFJlc3AsIGdvb2RSZXNwTXVsdGlwbGUsIGJhZFJlc3AsIHBhcnRpYWxSZXNwLCB3b3JrSXRlbVJlc3AsIHBvbGljeVZpb2xhdGlvblJlc3AsXHJcbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZSwgZm9ybVdvcmtJdGVtUmVzcCwgYWNjZXNzUmVxdWVzdFRlc3REYXRhLFxyXG5cclxuICAgICAgICB3b3JrSXRlbVNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRlVG9Xb3JrSXRlbVBhZ2U6IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlJyksXHJcbiAgICAgICAgICAgIG9wZW5Xb3JrSXRlbURpYWxvZzogYW5ndWxhci5ub29wXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ290UG9saWN5VmlvbGF0aW9ucyA9IHtcclxuICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGljeU5hbWUgOiAnU09EIFBvbGljeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogJ0FjY291bnRzIFJlY2VpdmFibGUgYW5kIEFjY291bnRzIFBheWFibGUgc2hvdWxkIG5vdCBiZSBjb21iaW5lZC4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydWxlTmFtZSA6ICdBY2NvdW50aW5nIFNPRC03NjInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JraXRlbUlkIDogJzJjOTA4Y2Q1NGJhOTJmZGUwMTRiYmRiZWFjYmYwNGQyJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAqL1xyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTggKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBBY2Nlc3NSZXF1ZXN0SXRlbSwgUmVxdWVzdGVkQWNjZXNzSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkZW50aXR5LCBfJHJvb3RTY29wZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRjb250cm9sbGVyXywgX3Rlc3RTZXJ2aWNlXywgX2FjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2VfLCBfY29uZmlnU2VydmljZV8sIFNQX0NPTkZJR19TRVJWSUNFLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZV8sIF9uYXZpZ2F0aW9uU2VydmljZV8sICRsb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wcm9taXNlVHJhY2tlclNlcnZpY2VfLCBTdWJtaXRSZXN1bHRJdGVtLCBfYWNjZXNzUmVxdWVzdFRlc3REYXRhXykge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZV87XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZV87XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZV87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgIG5vdGlmaWNhdGlvblNlcnZpY2UgPSBfc3BOb3RpZmljYXRpb25TZXJ2aWNlXztcclxuICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xyXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcclxuICAgICAgICBsb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAgICBwcm9taXNlVHJhY2tlclNlcnZpY2UgPSBfcHJvbWlzZVRyYWNrZXJTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEgPSBfYWNjZXNzUmVxdWVzdFRlc3REYXRhXztcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIGNvbmZpZyBzZXJ2aWNlXHJcbiAgICAgICAgY29uZmlnU2VydmljZU1vY2sgPSB7XHJcbiAgICAgICAgICAgIGdldENvbHVtbkNvbmZpZ0VudHJpZXM6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge31cclxuICAgICAgICAgICAgfSwge30pLFxyXG4gICAgICAgICAgICBnZXRDb25maWdWYWx1ZSA6IGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUsXHJcbiAgICAgICAgICAgIGlzTW9iaWxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc01vYmlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBzb21lIGlkZW50aXRpZXMgYW5kIGl0ZW1zIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBpZGVudGl0eSA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxKTtcclxuICAgICAgICBpdGVtMSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSk7XHJcbiAgICAgICAgaXRlbTIgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UKTtcclxuICAgICAgICByZXF1ZXN0ZWRJdGVtMSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGl0ZW0xKTtcclxuICAgICAgICByZXF1ZXN0ZWRJdGVtMiA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGl0ZW0yKTtcclxuICAgICAgICByZXF1ZXN0ZWRJdGVtMi5wZXJtaXR0ZWRCeUlkID0gaXRlbTEuZ2V0SWQoKTtcclxuXHJcbiAgICAgICAgc3B5T24oJHJvb3RTY29wZSwgJyRicm9hZGNhc3QnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgLy8gU3B5IG9uIG5hdmlnYXRpb25TZXJ2aWNlLmdvKCkgYW5kIGRvIG5vdGhpbmcgc2luY2UgJ2hvbWUnIGlzbid0IGRlZmluZWQuXHJcbiAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpLmFuZC5yZXR1cm5WYWx1ZShudWxsKTtcclxuXHJcbiAgICAgICAgLy8gU3B5IG9uIHRoZSBwcm9taXNlIHRyYWNrZXIsIGJ1dCBjYWxsIHRocm91Z2ggc28gaXQgZG9lcyBzdHVmZlxyXG4gICAgICAgIHNweU9uKHByb21pc2VUcmFja2VyU2VydmljZSwgJ3RyYWNrJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuXHJcbiAgICAgICAgU2FpbFBvaW50LmNvbmZpZ0RhdGEgPSB7fTtcclxuICAgICAgICBTYWlsUG9pbnQuY29uZmlnRGF0YVtTUF9DT05GSUdfU0VSVklDRS5BQ0NFU1NfUkVRVUVTVF9BTExPV19QUklPUklUWV9FRElUSU5HXSA9IHRydWU7XHJcblxyXG4gICAgICAgIGdvb2RSZXNwID1cclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdleGVjdXRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJzEyMzQnXHJcbiAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZ29vZFJlc3BNdWx0aXBsZSA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICBuZXcgU3VibWl0UmVzdWx0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnZXhlY3V0aW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICcxMjM0J1xyXG4gICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdleGVjdXRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJzM0NTYnXHJcbiAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgYmFkUmVzcCA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2ZhaWxlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VPcktleTogJ3VpX2FjY2Vzc19yZXF1ZXN0X3N1Ym1pdHRlZF9yZXF1ZXN0c19mYWlsZWRfd2l0aF92aW9sYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdFUlJPUidcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcGFydGlhbFJlc3AgPVxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBuZXcgU3VibWl0UmVzdWx0SXRlbSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdmYWlsZWQnXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2V4ZWN1dGluZydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgIHdvcmtJdGVtUmVzcCA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1Zpb2xhdGlvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbUlkOiAnYWVlOWZlY2FiMGJiNDM1OThhMjU0YTg3Y2Y0OTUyMzMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SXRlbUlkOiAnMTIzNDUxMzQ1MTM0NTEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICc5JyxcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnMmM5MDhjYjg0ZTZlNTI1MDAxNGU2ZTZjOTgyNTAwNTknLFxyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnTWFudWFsQWN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZm9ybVdvcmtJdGVtUmVzcCA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1Zpb2xhdGlvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbUlkOiAnYjQzNTk4YTI1NGE4N2NmNDk1MjMzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEl0ZW1JZDogJzM0NTEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICc5JyxcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnMjUwMDE0ZTZlNmM5ODI1MDA1OScsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbVR5cGU6ICdGb3JtJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uUmVzcCA9XHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTdWJtaXRSZXN1bHRJdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbVR5cGUgOiAnVmlvbGF0aW9uUmV2aWV3JyxcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtSWQgOiAnMmM5MDhjZDU0YmE5MmZkZTAxNGJiZGJlYWNiZjA0ZDInLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SXRlbUlkOiAnMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1JZDogJ2FwcHJvdmFsSXRlbUlkMSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcclxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0FjY2Vzc1JlcXVlc3RSZXZpZXdDdHJsJywge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSxcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZTogY29uZmlnU2VydmljZU1vY2ssXHJcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZTogd29ya0l0ZW1TZXJ2aWNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FkZGVkIGFjY2VzcyByZXF1ZXN0IGl0ZW1zJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBkb1JlbW92ZSA9IHRydWUsXHJcbiAgICAgICAgICAgIHBlcm1pdHRlZEl0ZW1NYXA7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gTW9jayBvdXQgdGhlIGRhdGEgc2VydmljZS5cclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldElkZW50aXRpZXMnKS5hbmQucmV0dXJuVmFsdWUoWyBpZGVudGl0eSBdKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyByZXF1ZXN0ZWRJdGVtMSwgcmVxdWVzdGVkSXRlbTIgXSk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRUb3BMZXZlbFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyByZXF1ZXN0ZWRJdGVtMSBdKTtcclxuXHJcbiAgICAgICAgICAgIHBlcm1pdHRlZEl0ZW1NYXAgPSB7XHJcbiAgICAgICAgICAgICAgICAnMSc6IFsgcmVxdWVzdGVkSXRlbTIgXSxcclxuICAgICAgICAgICAgICAgICcyJzogWyBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkUGVybWl0dGVkSXRlbXMnKS5cclxuICAgICAgICAgICAgICAgIGFuZC5jYWxsRmFrZShmdW5jdGlvbihyZXF1ZXN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBlcm1pdHRlZEl0ZW1NYXBbcmVxdWVzdGVkSXRlbS5nZXRVbmlxdWVJZCgpXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAncmVtb3ZlUmVxdWVzdGVkSXRlbScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb1JlbW92ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdhZGRSZW1vdmVkSXRlbU1lc3NhZ2UnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdnZXRSZXF1ZXN0ZWRJdGVtcygpIHJldHVybnMgdGhlIGFkZGVkIGFjY2VzcyBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlcXVlc3RlZEl0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtcy5pbmRleE9mKHJlcXVlc3RlZEl0ZW0xKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmluZGV4T2YocmVxdWVzdGVkSXRlbTIpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0VG9wTGV2ZWxSZXF1ZXN0ZWRJdGVtcygpIHJldHVybnMgdGhlIHRvcCBsZXZlbCBhZGRlZCBhY2Nlc3MgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gY3RybC5nZXRUb3BMZXZlbFJlcXVlc3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFRvcExldmVsUmVxdWVzdGVkSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmluZGV4T2YocmVxdWVzdGVkSXRlbTEpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXRlbXMuaW5kZXhPZihyZXF1ZXN0ZWRJdGVtMikpLm5vdC50b0JlR3JlYXRlclRoYW4oLTEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0UmVxdWVzdGVkUGVybWl0dGVkSXRlbXMoKSByZXR1cm5zIHRoZSBwZXJtaXR0ZWQgcm9sZXMgZm9yIHRoZSBnaXZlbiBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwZXJtaXR0ZWRJdGVtcyA9IGN0cmwuZ2V0UmVxdWVzdGVkUGVybWl0dGVkSXRlbXMocmVxdWVzdGVkSXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5nZXRSZXF1ZXN0ZWRQZXJtaXR0ZWRJdGVtcykuXHJcbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0ZWRJdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtaXR0ZWRJdGVtcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtaXR0ZWRJdGVtcy5pbmRleE9mKHJlcXVlc3RlZEl0ZW0xKSkubm90LnRvQmVHcmVhdGVyVGhhbigtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwZXJtaXR0ZWRJdGVtcy5pbmRleE9mKHJlcXVlc3RlZEl0ZW0yKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcclxuICAgICAgICAgICAgcGVybWl0dGVkSXRlbXMgPSBjdHJsLmdldFJlcXVlc3RlZFBlcm1pdHRlZEl0ZW1zKHJlcXVlc3RlZEl0ZW0yKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0UmVxdWVzdGVkUGVybWl0dGVkSXRlbXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgocmVxdWVzdGVkSXRlbTIpO1xyXG4gICAgICAgICAgICBleHBlY3QocGVybWl0dGVkSXRlbXMubGVuZ3RoKS50b0VxdWFsKDApO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZVJlcXVlc3RlZEl0ZW0oKSByZW1vdmVzIHRoZSBhZGRlZCBhY2Nlc3MgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5yZW1vdmVSZXF1ZXN0ZWRJdGVtKHJlcXVlc3RlZEl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkucmVtb3ZlUmVxdWVzdGVkSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hZGRSZW1vdmVkSXRlbU1lc3NhZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2NyZWVuUmVhZGVyTWVzc2FnZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVtb3ZlUmVxdWVzdGVkSXRlbSgpIGRvZXMgbm90IGFkZCBzY3JlZW4gcmVhZGVyIG1lc3NhZ2UgaWYgaXRlbSBub3QgcmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkb1JlbW92ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdHJsLnJlbW92ZVJlcXVlc3RlZEl0ZW0ocmVxdWVzdGVkSXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hZGRSZW1vdmVkSXRlbU1lc3NhZ2UpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndHJhY2tzIHdoaWNoIHJvbGVzIGhhdmUgZXhwYW5kZWQgcGVybWl0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmlzU2hvd1Blcm1pdHRlZFJvbGVzKHJlcXVlc3RlZEl0ZW0xKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGN0cmwudG9nZ2xlU2hvd1Blcm1pdHRlZFJvbGVzKHJlcXVlc3RlZEl0ZW0xKTtcclxuICAgICAgICBleHBlY3QoY3RybC5pc1Nob3dQZXJtaXR0ZWRSb2xlcyhyZXF1ZXN0ZWRJdGVtMSkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIGN0cmwudG9nZ2xlU2hvd1Blcm1pdHRlZFJvbGVzKHJlcXVlc3RlZEl0ZW0xKTtcclxuICAgICAgICBleHBlY3QoY3RybC5pc1Nob3dQZXJtaXR0ZWRSb2xlcyhyZXF1ZXN0ZWRJdGVtMSkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QoY3RybC5pc1Nob3dQZXJtaXR0ZWRSb2xlcyhyZXF1ZXN0ZWRJdGVtMikpLnRvQmVUcnV0aHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNSZXF1ZXN0ZWRJdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGhhcyBubyBhZGQgYWNjZXNzIHJlcXVlc3RzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoYXNBY2Nlc3NSZXF1ZXN0cztcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuYW5kLnJldHVyblZhbHVlKFtdKTtcclxuICAgICAgICAgICAgaGFzQWNjZXNzUmVxdWVzdHMgPSBjdHJsLmhhc1JlcXVlc3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNBY2Nlc3NSZXF1ZXN0cykudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBoYXMgYW4gYWRkIGFjY2VzcyByZXF1ZXN0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGFzQWNjZXNzUmVxdWVzdHM7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZXF1ZXN0ZWRJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShbJ2ZvbyddKTtcclxuICAgICAgICAgICAgaGFzQWNjZXNzUmVxdWVzdHMgPSBjdHJsLmhhc1JlcXVlc3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNBY2Nlc3NSZXF1ZXN0cykudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgaGFzIG11bHRpcGxlIGFkZCBhY2Nlc3MgcmVxdWVzdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhhc0FjY2Vzc1JlcXVlc3RzO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbXMnKS5hbmQucmV0dXJuVmFsdWUoWydmb28nLCAnYmFyJ10pO1xyXG4gICAgICAgICAgICBoYXNBY2Nlc3NSZXF1ZXN0cyA9IGN0cmwuaGFzUmVxdWVzdGVkSXRlbXMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0FjY2Vzc1JlcXVlc3RzKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncmVtb3ZlZCBjdXJyZW50IGFjY2VzcyBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZG9SZW1vdmUgPSB0cnVlLCByZW1vdmVkSXRlbTEsIHJlbW92ZWRJdGVtMjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKFJlbW92ZWRBY2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtMSA9IG5ldyBSZW1vdmVkQWNjZXNzSXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtMiA9IG5ldyBSZW1vdmVkQWNjZXNzSXRlbShpdGVtMik7XHJcbiAgICAgICAgICAgIC8vIE1vY2sgb3V0IHRoZSBkYXRhIHNlcnZpY2UuXHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRJZGVudGl0aWVzJykuYW5kLnJldHVyblZhbHVlKFsgaWRlbnRpdHkgXSk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyByZW1vdmVkSXRlbTEsIHJlbW92ZWRJdGVtMiBdKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3JlbW92ZVJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbScpLlxyXG4gICAgICAgICAgICAgICAgYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb1JlbW92ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdhZGRSZW1vdmVkSXRlbU1lc3NhZ2UnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdnZXRSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zKCkgcmV0dXJucyB0aGUgcmVtb3ZlZCBhY2Nlc3MgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gY3RybC5nZXRSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmluZGV4T2YocmVtb3ZlZEl0ZW0xKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zLmluZGV4T2YocmVtb3ZlZEl0ZW0yKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZVJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbSgpIHJlbW92ZXMgdGhlIGFjY2VzcyBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnJlbW92ZVJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbShyZW1vdmVkSXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5yZW1vdmVSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW0pLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hZGRSZW1vdmVkSXRlbU1lc3NhZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2NyZWVuUmVhZGVyTWVzc2FnZXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVtb3ZlUmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtKCkgZG9lcyBub3QgYWRkIHNjcmVlbiByZWFkZXIgbWVzc2FnZSBpZiBpdGVtIG5vdCByZW1vdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvUmVtb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN0cmwucmVtb3ZlUmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtKHJlbW92ZWRJdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFkZFJlbW92ZWRJdGVtTWVzc2FnZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaGFzIG5vIHJlbW92ZSBhY2Nlc3MgcmVxdWVzdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhhc0FjY2Vzc1JlcXVlc3RzO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShbXSk7XHJcbiAgICAgICAgICAgIGhhc0FjY2Vzc1JlcXVlc3RzID0gY3RybC5oYXNSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNBY2Nlc3NSZXF1ZXN0cykudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBoYXMgYSByZW1vdmUgYWNjZXNzIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGhhc0FjY2Vzc1JlcXVlc3RzO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShbJ2ZvbyddKTtcclxuICAgICAgICAgICAgaGFzQWNjZXNzUmVxdWVzdHMgPSBjdHJsLmhhc1JlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0FjY2Vzc1JlcXVlc3RzKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBoYXMgbXVsdGlwbGUgcmVtb3ZlIGFjY2VzcyByZXF1ZXN0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGFzQWNjZXNzUmVxdWVzdHM7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZW1vdmVkQ3VycmVudEFjY2Vzc0l0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWydmb28nLCAnYmFyJ10pO1xyXG4gICAgICAgICAgICBoYXNBY2Nlc3NSZXF1ZXN0cyA9IGN0cmwuaGFzUmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcygpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFzQWNjZXNzUmVxdWVzdHMpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjYW5jZWxBY2Nlc3NSZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNwTW9kYWwsICRxLCBkb0NhbmNlbDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwTW9kYWxfLCBfJHFfKSB7XHJcbiAgICAgICAgICAgICRxID0gXyRxXztcclxuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICAgICAgZG9DYW5jZWwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkb0NhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBkZWZlcnJlZC5wcm9taXNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBtb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmNhbmNlbEFjY2Vzc1JlcXVlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGdvIHRvIGhvbWUgYW5kIGNvbXBsZXRlIHRoZSBmbG93IGlmIG1vZGFsIGlzIGFjY2VwdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWc7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdXAgdGhlIHRlc3QgdG8gYWNjZXB0IHRoZSBjYW5jZWwgZGlhbG9nLlxyXG4gICAgICAgICAgICBkb0NhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIGN0cmwuY2FuY2VsQWNjZXNzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGNvbmZpZyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5vdXRjb21lKS50b0VxdWFsKCd2aWV3SG9tZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnN0YXRlKS50b0VxdWFsKCdob21lJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuc3RhdGVQYXJhbXMpLnRvRXF1YWwoeyBjb21wbGV0ZUZsb3c6ICdhY2Nlc3NSZXF1ZXN0JyB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZ28gdG8gaG9tZSBpZiBtb2RhbCBpcyByZWplY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmNhbmNlbEFjY2Vzc1JlcXVlc3QoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgZGlhbG9nIHdpdGggYXBwcm9wcmlhdGUgY29uZmlncycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmNhbmNlbEFjY2Vzc1JlcXVlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5jb250ZW50KS50b0VxdWFsKCd1aV9hY2Nlc3NfY2FuY2VsX3JlcXVlc3RfZGlhbG9nX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwucG9saWN5VmlvbGF0aW9ucy5wdXNoKCdmb28nKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuY2FuY2VsQWNjZXNzUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAudG9FcXVhbCgndWlfYWNjZXNzX2NhbmNlbF9yZXF1ZXN0X2RpYWxvZ192aW9sYXRpb25zX3RleHQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5vdCBzdXJlIGhvdyB3ZSBjYW4gcmVhbGx5IHRlc3QgdGhlIGFjdGlvbiBmdW5jdGlvbiBvdGhlciB0aGFuIGlmIGl0J3MgdGhlcmUgb3Igbm90LlxyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmJ1dHRvbnNbMV0uYWN0aW9uKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3VibWl0V2l0aFZpb2xhdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHE7XHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXykge1xyXG4gICAgICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zID0gamFzbWluZS5jcmVhdGVTcHkoKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zLmFuZC5yZXR1cm5WYWx1ZSgkcS5kZWZlcigpLnByb21pc2UpO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdFdpdGhWaW9sYXRpb25zKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2l0aCByZXF1aXJlZCBjb21tZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB2aW9sYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJlcXVpcmVDb21tZW50O1xyXG5cclxuICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3Zpb2xhdGlvblNlcnZpY2VfKSB7XHJcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0gX3Zpb2xhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJlcXVpcmVDb21tZW50ID0gY3RybC5yZXF1aXJlVmlvbGF0aW9uQ29tbWVudDtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5yZXF1aXJlVmlvbGF0aW9uQ29tbWVudCA9IGluaXRpYWxSZXF1aXJlQ29tbWVudDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHByb21wdCB3aXRoIGNvbW1lbnQgZGlhbG9nIGlmIHJlcXVpcmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoJHEuZGVmZXIoKS5wcm9taXNlKTtcclxuICAgICAgICAgICAgICAgIGN0cmwucmVxdWlyZVZpb2xhdGlvbkNvbW1lbnQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0V2l0aFZpb2xhdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodmlvbGF0aW9uU2VydmljZS5zaG93Q29tbWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zIHdpdGggY29tbWVudCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSAndGVzdCBjb21tZW50JztcclxuICAgICAgICAgICAgICAgIHZpb2xhdGlvblNlcnZpY2Uuc2hvd0NvbW1lbnREaWFsb2cgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGNvbW1lbnQpKTtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zLmFuZC5yZXR1cm5WYWx1ZSgkcS5kZWZlcigpLnByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5yZXF1aXJlVmlvbGF0aW9uQ29tbWVudCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXRXaXRoVmlvbGF0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRXaXRoVmlvbGF0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdKS50b0JlKGNvbW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3VibWl0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHN1Ym1pdERlZmVycmVkLCByZXN1Ym1pdERlZmVycmVkO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcSkge1xyXG4gICAgICAgICAgICBzdWJtaXREZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHJlc3VibWl0RGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VibWl0RGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZSwgJ3Jlc29sdmVWaW9sYXRpb25zJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VibWl0RGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdGllcycpLmFuZC5yZXR1cm5WYWx1ZShbaWRlbnRpdHldKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoW3JlcXVlc3RlZEl0ZW0xLCByZXF1ZXN0ZWRJdGVtMl0pO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbUJ5SWQnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oaXRlbUlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJzEnID09PSBpdGVtSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdGVkSXRlbTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoJzInID09PSBpdGVtSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdGVkSXRlbTI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnVW5oYW5kbGVkIGl0ZW0gSUQ6ICcgKyBpdGVtSWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShbaXRlbTJdKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdjbGVhcnMgaXRlbXNNaXNzaW5nQWNjb3VudFNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5pdGVtc01pc3NpbmdBY2NvdW50U2VsZWN0aW9ucyA9IFsgJ29uZSBmaXNoJywgJ3R3byBmaXNoJyBdO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pdGVtc01pc3NpbmdBY2NvdW50U2VsZWN0aW9ucykudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCByZXZpZXcgc2VydmljZSBzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5zdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoW2lkZW50aXR5XSwgW3JlcXVlc3RlZEl0ZW0xLCByZXF1ZXN0ZWRJdGVtMl0sIFtpdGVtMl0sIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgcmV2aWV3IHNlcnZpY2Ugd2l0aCBwcmlvcml0eSBzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5zZXRQcmlvcml0eSgnTG93Jyk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2Uuc3VibWl0QWNjZXNzUmVxdWVzdEl0ZW1zKS5cclxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKFtpZGVudGl0eV0sIFtyZXF1ZXN0ZWRJdGVtMSwgcmVxdWVzdGVkSXRlbTJdLCBbaXRlbTJdLCAnTG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIHRyYWNrZWQgcHJvbWlzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLnRyYWNrKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLnRyYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UuaXNJblByb2dyZXNzKCkpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCByZXNvbHZlVmlvbGF0aW9ucyBpZiBoYXMgcG9saWN5IHZpb2xhdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2hhc1BvbGljeVZpb2xhdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZS5yZXNvbHZlVmlvbGF0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UucmVzb2x2ZVZpb2xhdGlvbnMuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMV0pLnRvRXF1YWwoW10pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2l0aCBtaXNzaW5nIGFjY291bnQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oUkVTUE9OU0VfRVJST1JfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMSc6IFsgYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMSBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzInOiBbIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjIgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBSRVNQT05TRV9FUlJPUl9UWVBFLk1JU1NJTkdBQ0NPVU5UU0VMRUNUSU9OU1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgc3VibWlzc2lvbiBmYWlsLlxyXG4gICAgICAgICAgICAgICAgc3VibWl0RGVmZXJyZWQucmVqZWN0KHJlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzZXRzIGlzU3VibWl0dGluZyB0byBmYWxzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS5pc0luUHJvZ3Jlc3MoKSkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FkZHMgbWlzc2luZyBhY2NvdW50IHNlbGVjdGlvbnMgdG8gUmVxdWVzdGVkQWNjZXNzSXRlbScsIGluamVjdChmdW5jdGlvbihJZGVudGl0eUFjY291bnRTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWwxID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMSxcclxuICAgICAgICAgICAgICAgICAgICBzZWwyID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMjtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihJZGVudGl0eUFjY291bnRTZWxlY3Rpb24sICdtZXJnZUFjY291bnRTZWxlY3Rpb25zJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBpdGVtMSBzdGFydCB3aXRoIGEgc2VsZWN0aW9uIGFuZCBpdGVtMiBub3QgaGF2ZSBhbnkuICBUaGUgc2VsZWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuZWQgaW4gdGhlIHJlc3BvbnNlIHNob3VsZCBnZXQgbWVyZ2VkIHdpdGggd2hhdCBpcyBhbHJlYWR5IHRoZXJlLlxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTEuYWNjb3VudFNlbGVjdGlvbnMgPSBbIG5ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24oc2VsMikgXTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0yLmFjY291bnRTZWxlY3Rpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3VibWl0LlxyXG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlIGFjY291bnQgc2VsZWN0aW9ucyBnb3QgdXBkYXRlZCBvbiB0aGUgaXRlbXMuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbTEuYWNjb3VudFNlbGVjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0xLmFjY291bnRTZWxlY3Rpb25zWzBdLmdldElkZW50aXR5SWQoKSkudG9FcXVhbChzZWwyLmlkZW50aXR5SWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0xLmFjY291bnRTZWxlY3Rpb25zWzFdLmdldElkZW50aXR5SWQoKSkudG9FcXVhbChzZWwxLmlkZW50aXR5SWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtMi5hY2NvdW50U2VsZWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbTIuYWNjb3VudFNlbGVjdGlvbnNbMF0uZ2V0SWRlbnRpdHlJZCgpKS50b0VxdWFsKHNlbDIuaWRlbnRpdHlJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KElkZW50aXR5QWNjb3VudFNlbGVjdGlvbi5tZXJnZUFjY291bnRTZWxlY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzZXRzIGl0ZW1zTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTFOYW1lID0gcmVxdWVzdGVkSXRlbTEuaXRlbS5nZXREaXNwbGF5YWJsZU5hbWUoKSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtMk5hbWUgPSByZXF1ZXN0ZWRJdGVtMi5pdGVtLmdldERpc3BsYXlhYmxlTmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zLmluZGV4T2YoaXRlbTFOYW1lID4gLTEpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pdGVtc01pc3NpbmdBY2NvdW50U2VsZWN0aW9ucy5pbmRleE9mKGl0ZW0yTmFtZSA+IC0xKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3dpdGggaXRlbXMgYWxyZWFkeSBhc3NpZ25lZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihSRVNQT05TRV9FUlJPUl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFsnaXRlbTEnLCAnaXRlbTInXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogUkVTUE9OU0VfRVJST1JfVFlQRS5EVVBMSUNBVEVBU1NJR05NRU5UXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBzdWJtaXNzaW9uIGZhaWwuXHJcbiAgICAgICAgICAgICAgICBzdWJtaXREZWZlcnJlZC5yZWplY3QocmVzcG9uc2VEYXRhKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3NldHMgaXNTdWJtaXR0aW5nIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLnRyYWNrKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UudHJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UuaXNJblByb2dyZXNzKCkpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS5pc0luUHJvZ3Jlc3MoKSkudG9CZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3NldHMgaXRlbXNBbHJlYWR5QXNzaWduZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zQWxyZWFkeUFzc2lnbmVkLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zQWxyZWFkeUFzc2lnbmVkWzBdKS50b0VxdWFsKCdpdGVtMScpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXNBbHJlYWR5QXNzaWduZWRbMV0pLnRvRXF1YWwoJ2l0ZW0yJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCBzZXQgbm90aWZpY2F0aW9ucywgZ29vZCByZXNwb25zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0ZXN0UmVzcDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0ZXN0UmVzcCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKG5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGROb3RpZmljYXRpb24nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBOb3RpZmljYXRpb25TZXJ2aWNlIHdpdGggc3VjY2VzcyBtZXNzYWdlIHdpdGggaWRlbnRpdHkgcmVxdWVzdCBpZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0UmVzcCA9IGdvb2RSZXNwO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qobm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pXHJcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3VpX2FjY2Vzc19yZXF1ZXN0X3N1Ym1pdHRlZF9yZXF1ZXN0c193aXRoX2lkJywgJ1NVQ0NFU1MnLCBbJzEyMzQnXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBOb3RpZmljYXRpb25TZXJ2aWNlIHdpdGggc3VjY2VzcyBtZXNzYWdlIHdpdGhvdXQgaWRlbnRpdHkgcmVxdWVzdCBpZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0UmVzcCA9IGdvb2RSZXNwTXVsdGlwbGU7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbilcclxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndWlfYWNjZXNzX3JlcXVlc3Rfc3VibWl0dGVkX3JlcXVlc3RzJywgJ1NVQ0NFU1MnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCBzZXQgbm90aWZpY2F0aW9ucywgYmFkIHJlc3BvbnNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShiYWRSZXNwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24obm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE5vdGlmaWNhdGlvbicpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIE5vdGlmaWNhdGlvblNlcnZpY2Ugd2l0aCBlcnJvciBtZXNzYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbilcclxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndWlfYWNjZXNzX3JlcXVlc3Rfc3VibWl0dGVkX3JlcXVlc3RzX2ZhaWxlZF93aXRoX3Zpb2xhdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdFUlJPUicsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3VibWl0IHNldCBub3RpZmljYXRpb25zLCBwYXJ0aWFsIHJlc3BvbnNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwYXJ0aWFsUmVzcCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKG5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGROb3RpZmljYXRpb24nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBOb3RpZmljYXRpb25TZXJ2aWNlIHdpdGggd2FybmluZyBtZXNzYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbilcclxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndWlfYWNjZXNzX3JlcXVlc3Rfc3VibWl0dGVkX3JlcXVlc3RzX2ZhaWx1cmVzJywgJ1dBUk4nLCBbMSwxXSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3VibWl0IGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8qIERpc3JlZ2FyZCB0aGUgZXhpc3RpbmcgY29uZGl0aW9ucywgaGVyZSB3ZSBhcmUgdGVzdGluZyB0aGUgdmlvbGF0aW9uIHN0dWZmICovXHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNSZXF1ZXN0ZWRJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2hhc1JlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZGlzYWJsZWQgaWYgdGhlcmUgYXJlIHBvbGljeSB2aW9sYXRpb25zIGJ1dCBubyBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNQb2xpY3lWaW9sYXRpb25zJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTdWJtaXREaXNhYmxlZCgpKS50b0JlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGJlIGVuYWJsZWQgaWYgdGhlcmUgYXJlIHBvbGljeSB2aW9sYXRpb25zIGFuZCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNQb2xpY3lWaW9sYXRpb25zJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmFsSXRlbVJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTdWJtaXREaXNhYmxlZCgpKS50b0JlKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3VibWl0IHdvcmsgaXRlbSByZXNwb25zZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCwgJHE7XHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXykge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0oaXRlbTIpO1xyXG4gICAgICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgc3B5T24od29ya0l0ZW1TZXJ2aWNlLCAnb3BlbldvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBvcGVuV29ya0l0ZW1EaWFsb2cgZm9yIHNpbmdsZSB1c2VyIGJlZm9yZSBwcm9tcHRpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldElkZW50aXRpZXMnKS5hbmQucmV0dXJuVmFsdWUoWyBpZGVudGl0eSBdKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHdvcmtJdGVtUmVzcCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzU2luZ2xlVXNlclJlcXVlc3QnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2Uub3BlbldvcmtJdGVtRGlhbG9nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIG9wZW5Xb3JrSXRlbURpYWxvZyBmb3IgbXVsdGlwbGUgdXNlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0UmV2aWV3U2VydmljZSwgJ3N1Ym1pdEFjY2Vzc1JlcXVlc3RJdGVtcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUod29ya0l0ZW1SZXNwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnaXNTaW5nbGVVc2VyUmVxdWVzdCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2Uub3BlbldvcmtJdGVtRGlhbG9nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIG9wZW5Xb3JrSXRlbURpYWxvZyBmb3Igc2luZ2xlIHVzZXIgd2l0aG91dCB3b3JrIGl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGdvb2RSZXNwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnaXNTaW5nbGVVc2VyUmVxdWVzdCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5vcGVuV29ya0l0ZW1EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgb3BlbldvcmtJdGVtRGlhbG9nIGZvciBtdWx0aXBsZSB1c2VyIHdpdGhvdXQgd29yayBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RSZXZpZXdTZXJ2aWNlLCAnc3VibWl0QWNjZXNzUmVxdWVzdEl0ZW1zJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShnb29kUmVzcCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzU2luZ2xlVXNlclJlcXVlc3QnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLm9wZW5Xb3JrSXRlbURpYWxvZykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3Vuc3VwcG9ydGVkIHdvcmsgaXRlbSB0eXBlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkV29ya0l0ZW1UeXBlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2Uuc3VibWl0QWNjZXNzUmVxdWVzdEl0ZW1zID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUoJHEud2hlbih3b3JrSXRlbVJlc3ApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuaXNTaW5nbGVVc2VyUmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2UuaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkV29ya0l0ZW1UeXBlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXR1cEZvcm1Ub01hbnVhbEFjdGlvblRlc3QobW9iaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpc01vYmlsZSA9IG1vYmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZvciBhIGZvcm1cclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFdvcmtJdGVtVHlwZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbW9jayBvcGVuV29ya0l0ZW1EaWFsb2cgdG8gcmV0dXJuIG1hbnVhbEFjdGlvbiB3b3JrIGl0ZW1cclxuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5vcGVuV29ya0l0ZW1EaWFsb2cgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHdvcmtJdGVtUmVzcFswXSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1vY2sgc3VibWl0IHRvIHJldHVybiBmb3JtIHdvcmsgaXRlbVxyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2Uuc3VibWl0QWNjZXNzUmVxdWVzdEl0ZW1zID1cclxuICAgICAgICAgICAgICAgICAgICBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGZvcm1Xb3JrSXRlbVJlc3BbMF0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdGllcycpLmFuZC5yZXR1cm5WYWx1ZShbaWRlbnRpdHldKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9mb3IgbWFudWFsIGFjdGlvbiB3b3JrIGl0ZW1cclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFdvcmtJdGVtVHlwZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHNob3cgd2FybmluZyBtb2RhbCBmb3IgdW5zdXBwb3J0ZWQgd29yayBpdGVtIG9uIG1vYmlsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5vcGVuVW5TdXBwb3J0ZWRXb3JrSXRlbURpYWxvZyA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLm9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSB0byBKU0Ygd29yayBpdGVtIHBhZ2UgZm9yIHVuc3VwcG9ydGVkIHdvcmsgaXRlbSBvbiBkZXNrdG9wJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLm5hdmlnYXRlVG9Xb3JrSXRlbVBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHdvcmtJdGVtUmVzcFswXS53b3JrZmxvd1dvcmtJdGVtSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gSlNGIHdvcmsgaXRlbSBwYWdlIGZyb20gYSBmb3JtIGZvciB1bnN1cHBvcnRlZCB3b3JrIGl0ZW0gb24gZGVza3RvcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0dXBGb3JtVG9NYW51YWxBY3Rpb25UZXN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UubmF2aWdhdGVUb1dvcmtJdGVtUGFnZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgod29ya0l0ZW1SZXNwWzBdLndvcmtmbG93V29ya0l0ZW1JZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHdhcm5pbmcgbW9kYWwgZnJvbSBhIGZvcm0gZm9yIHVuc3VwcG9ydGVkIHdvcmsgaXRlbSBvbiBtb2JpbGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNldHVwRm9ybVRvTWFudWFsQWN0aW9uVGVzdCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2Uub3BlblVuU3VwcG9ydGVkV29ya0l0ZW1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzdWJtaXRBY2Nlc3NSZXF1ZXN0IHBvbGljeSB2aW9sYXRpb25zIHJlc3BvbnNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0yKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdFJldmlld1NlcnZpY2UsICdzdWJtaXRBY2Nlc3NSZXF1ZXN0SXRlbXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwb2xpY3lWaW9sYXRpb25SZXNwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnZ2V0UG9saWN5VmlvbGF0aW9ucycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGdvdFBvbGljeVZpb2xhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHBvbGljeSB2aW9sYXRpb25zIHNldCBpbiBjdHJsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1BvbGljeVZpb2xhdGlvbnMoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQb2xpY3lWaW9sYXRpb25zKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5jbGVhclBvbGljeVZpb2xhdGlvbnMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUG9saWN5VmlvbGF0aW9ucygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UG9saWN5VmlvbGF0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIHJlcXVlc3RlZCBpdGVtcyB3aXRoIHRoZWlyIHJlc3BlY3RpdmUgYXBwcm92YWwgaWRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ZWRJdGVtO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtID0gYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5nZXRSZXF1ZXN0ZWRJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0QXBwcm92YWxJdGVtSWQoKSkudG9FcXVhbCgnYXBwcm92YWxJdGVtSWQxJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHRocm93IGlmIGFuIHJlcXVlc3QgaXRlbSBpcyBub3QgZm91bmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFwcHJvdmFsSXRlbXMgPSBwb2xpY3lWaW9sYXRpb25SZXNwWzBdLmFwcHJvdmFsSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBzdGFzaCA9IGFwcHJvdmFsSXRlbXNbMF07XHJcbiAgICAgICAgICAgIGFwcHJvdmFsSXRlbXNbMF0gPSB7cmVxdWVzdEl0ZW1JZDogJ2RvZXNOb3RFeGlzdCd9O1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSkubm90LnRvVGhyb3coKTtcclxuICAgICAgICAgICAgYXBwcm92YWxJdGVtc1swXSA9IHN0YXNoO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdyZW1vdmluZyBhbGwgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihBY2Nlc3NSZXF1ZXN0SXRlbSwgSWRlbnRpdHkpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHNvbWUgaWRlbnRpdGllcyBhbmQgaXRlbXMgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAgICBpdGVtMSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSk7XHJcbiAgICAgICAgICAgIGl0ZW0yID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5FTlRJVExFTUVOVCk7XHJcblxyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0oaXRlbTIpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNhYmxlIHN1Ym1pdCBidXR0b24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUmVxdWVzdGVkSXRlbXMoKSkudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5yZW1vdmVSZXF1ZXN0ZWRJdGVtKHJlcXVlc3RlZEl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUmVxdWVzdGVkSXRlbXMoKSkudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3VibWl0RGlzYWJsZWQoKSkudG9CZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnJlbW92ZVJlcXVlc3RlZEl0ZW0ocmVxdWVzdGVkSXRlbTIpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNSZXF1ZXN0ZWRJdGVtcygpKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3VibWl0RGlzYWJsZWQoKSkudG9CZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZXR0aW5nIHByaW9yaXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWZhdWx0IHRvIG5vcm1hbC9udWxsIHByaW9yaXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFByaW9yaXR5KCkpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBzZXR0aW5nIHByaW9yaXR5IG9uIGRhdGEgc2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQcmlvcml0eSgpKS50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICBjdHJsLnNldFByaW9yaXR5KCdMb3cnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5wcmlvcml0eSkudG9CZSgnTG93Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZWRpdEFjY291bnRTZWxlY3Rpb25zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbSwgcmVxdWVzdGVkSXRlbSwgbW9kYWxEZWZlcnJlZDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEpIHtcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAzMjFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbW9kYWxEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZSwgJ2VkaXRBY2NvdW50U2VsZWN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShtb2RhbERlZmVycmVkLnByb21pc2UpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBhY2NvdW50IHNlbGVjdGlvbiBkaWFsb2cgd2hlbiBjYWxsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5lZGl0QWNjb3VudFNlbGVjdGlvbnMocmVxdWVzdGVkSXRlbSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UuZWRpdEFjY291bnRTZWxlY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHVwZGF0ZSB0aGUgcmVxdWVzdGVkSXRlbSB3aGVuIHRoZSBkaWFsb2cgaXMgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFjY291bnRTZWxlY3Rpb25zID0gW3sndGhpcyBpcyc6ICdhIHRlc3QnfV07XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0uYWNjb3VudFNlbGVjdGlvbnMgPSBhY2NvdW50U2VsZWN0aW9ucztcclxuICAgICAgICAgICAgY3RybC5lZGl0QWNjb3VudFNlbGVjdGlvbnMocmVxdWVzdGVkSXRlbSk7XHJcbiAgICAgICAgICAgIG1vZGFsRGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLmVkaXRBY2NvdW50U2VsZWN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9ucykudG9CZShhY2NvdW50U2VsZWN0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSByZXF1ZXN0ZWRJdGVtIHdoZW4gdGhlIGRpYWxvZyBpcyByZXNvbHZlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjb3VudFNlbGVjdGlvbnMgPSBbeyd0aGlzIGlzJzogJ2EgdGVzdCd9XSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRBY2NvdW50U2VsZWN0aW9ucyA9IFt7Zm9vOiAnYmFyJ30sIHtzb21ldGhpbmc6ICdlbHNlJ31dO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gYWNjb3VudFNlbGVjdGlvbnM7XHJcbiAgICAgICAgICAgIGN0cmwuZWRpdEFjY291bnRTZWxlY3Rpb25zKHJlcXVlc3RlZEl0ZW0pO1xyXG4gICAgICAgICAgICBtb2RhbERlZmVycmVkLnJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnM6IHVwZGF0ZWRBY2NvdW50U2VsZWN0aW9uc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UuZWRpdEFjY291bnRTZWxlY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zKS50b0JlKHVwZGF0ZWRBY2NvdW50U2VsZWN0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd0dsb2JhbFN1bnJpc2VTdW5zZXREaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3BNb2RhbCwgJHE7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9zcE1vZGFsXywgXyRxXykge1xyXG4gICAgICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIG1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEFyZ3MsIGl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgc3VucmlzZURhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0yKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1zID0gY3RybC5nZXRSZXF1ZXN0ZWRJdGVtcygpO1xyXG4gICAgICAgICAgICBpdGVtc1swXS5zZXRTdW5yaXNlRGF0ZShzdW5yaXNlRGF0ZSk7XHJcbiAgICAgICAgICAgIGl0ZW1zWzFdLnNldFN1bnJpc2VEYXRlKHN1bnJpc2VEYXRlKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0dsb2JhbFN1bnJpc2VTdW5zZXREaWFsb2coaXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxBcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy5yZXNvbHZlLnN1bnJpc2VEYXRlKCkuZ2V0VGltZSgpKS50b0JlKHN1bnJpc2VEYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5zZXREYXRlKCkpLnRvQmUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy5yZXNvbHZlLnN1bnNldE9ubHkoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MudGl0bGUpLnRvQmUoJ3VpX3JlcXVlc3RfZWRpdF9zdGFydF9lbmRfZGF0ZScpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcGFzcyBzdW5zZXRPbmx5IGFuZCBzZXQgdGl0bGUgaWYgdHJ1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY3RybC5zaG93R2xvYmFsU3VucmlzZVN1bnNldERpYWxvZyhjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5zZXRPbmx5KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MudGl0bGUpLnRvQmUoJ3VpX3JlcXVlc3RfZWRpdF9lbmRfZGF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dTdW5yaXNlU3Vuc2V0RGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNwTW9kYWwsICRxO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sIF8kcV8pIHtcclxuICAgICAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6ICRxLmRlZmVyKCkucHJvbWlzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBtb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxBcmdzLFxyXG4gICAgICAgICAgICAgICAgc3VucmlzZURhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTEuc2V0U3VucmlzZURhdGUoc3VucmlzZURhdGUpO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dTdW5yaXNlU3Vuc2V0RGlhbG9nKHJlcXVlc3RlZEl0ZW0xKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5yaXNlRGF0ZSgpLmdldFRpbWUoKSkudG9CZShzdW5yaXNlRGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWxBcmdzLnJlc29sdmUuc3Vuc2V0RGF0ZSgpKS50b0JlKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5zZXRPbmx5KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWxBcmdzLnRpdGxlKS50b0JlKCd1aV9pdGVtX2VkaXRfc3RhcnRfZW5kX2RhdGUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHBhc3Mgc3Vuc2V0T25seSBpZiBwcm92aWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsQXJncyxcclxuICAgICAgICAgICAgICAgIHN1bnJpc2VEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0xLnNldFN1bnNldERhdGUoc3VucmlzZURhdGUpO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dTdW5yaXNlU3Vuc2V0RGlhbG9nKHJlcXVlc3RlZEl0ZW0xLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5zZXRPbmx5KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MudGl0bGUpLnRvQmUoJ3VpX2l0ZW1fZWRpdF9lbmRfZGF0ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FyZUdsb2JhbERhdGVzU2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBpdGVtXFwncyBkYXRlcyBkb25cXCd0IG1hdGNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyxcclxuICAgICAgICAgICAgICAgIHN1bnJpc2VEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbShpdGVtMik7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVHbG9iYWxEYXRlc1NldChjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCkpKS50b0JlRmFsc3koKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1zID0gY3RybC5nZXRSZXF1ZXN0ZWRJdGVtcygpO1xyXG4gICAgICAgICAgICBpdGVtc1swXS5zZXRTdW5yaXNlRGF0ZShzdW5yaXNlRGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVHbG9iYWxEYXRlc1NldChjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCkpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGl0ZW1cXCdzIGRhdGVzIGRvIG1hdGNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyxcclxuICAgICAgICAgICAgICAgIHN1bnJpc2VEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbShpdGVtMik7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVHbG9iYWxEYXRlc1NldChjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCkpKS50b0JlRmFsc3koKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1zID0gY3RybC5nZXRSZXF1ZXN0ZWRJdGVtcygpO1xyXG4gICAgICAgICAgICBpdGVtc1swXS5zZXRTdW5yaXNlRGF0ZShzdW5yaXNlRGF0ZSk7XHJcbiAgICAgICAgICAgIGl0ZW1zWzFdLnNldFN1bnJpc2VEYXRlKHN1bnJpc2VEYXRlKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFyZUdsb2JhbERhdGVzU2V0KGN0cmwuZ2V0UmVxdWVzdGVkSXRlbXMoKSkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGRhdGUgb2JqZWN0cyBhcmUgZGlmZmVyZW50IGJ1dCB3aXRoIHNhbWUgdGltZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMsXHJcbiAgICAgICAgICAgICAgICBzdW5yaXNlRGF0ZTEgPSBuZXcgRGF0ZShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQ1VSUkVOVF9BQ0NFU1NfUk9MRS5zdW5yaXNlKSxcclxuICAgICAgICAgICAgICAgIHN1bnJpc2VEYXRlMiA9IG5ldyBEYXRlKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5DVVJSRU5UX0FDQ0VTU19ST0xFLnN1bnJpc2UpO1xyXG5cclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKGl0ZW0yKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFyZUdsb2JhbERhdGVzU2V0KGN0cmwuZ2V0UmVxdWVzdGVkSXRlbXMoKSkpLnRvQmVGYWxzeSgpO1xyXG5cclxuICAgICAgICAgICAgaXRlbXMgPSBjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGl0ZW1zWzBdLnNldFN1bnJpc2VEYXRlKHN1bnJpc2VEYXRlMSk7XHJcbiAgICAgICAgICAgIGl0ZW1zWzFdLnNldFN1bnJpc2VEYXRlKHN1bnJpc2VEYXRlMik7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVHbG9iYWxEYXRlc1NldChjdHJsLmdldFJlcXVlc3RlZEl0ZW1zKCkpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd0NvbW1lbnREaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcm9sZURhdGEsIHNwTW9kYWwsICRxLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtLCByb2xlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sIF8kcV8sIFJlcXVlc3RlZEFjY2Vzc0l0ZW0sIEFjY2Vzc1JlcXVlc3RJdGVtKSB7XHJcbiAgICAgICAgICAgIHJvbGVEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX1JPTEU7XHJcbiAgICAgICAgICAgIHJvbGUgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0ocm9sZURhdGEpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0ocm9sZSk7XHJcblxyXG4gICAgICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IG1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEFyZ3M7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNob3dDb21tZW50RGlhbG9nKHJlcXVlc3RlZEFjY2Vzc0l0ZW0pO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxBcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy50aXRsZSkudG9CZSgndWlfYWNjZXNzX3JlcXVlc3RfY29tbWVudF9ub3RlX2RpYWxvZ190aXRsZScpO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWxBcmdzLnJlc29sdmUucmVxdWVzdGVkQWNjZXNzSXRlbSgpKS50b0JlKHJlcXVlc3RlZEFjY2Vzc0l0ZW0pO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3VzZVN1bnJpc2VEYXRlcycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGJlIGZhbHNlIHdoZW4gU2FpbFBvaW50LmNvbmZpZ0RhdGEuVVNFX1NVTlJJU0VfREFURVMgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgU2FpbFBvaW50LmNvbmZpZ0RhdGEuVVNFX1NVTlJJU0VfREFURVMgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwudXNlU3VucmlzZURhdGVzKCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGJlIHRydWUgd2hlbiBTYWlsUG9pbnQuY29uZmlnRGF0YS5VU0VfU1VOUklTRV9EQVRFUyBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIFNhaWxQb2ludC5jb25maWdEYXRhLlVTRV9TVU5SSVNFX0RBVEVTID0gdHJ1ZTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwudXNlU3VucmlzZURhdGVzKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdkZWVwIGZpbHRlciBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGlkZW50aXR5RGF0YSwgaWRlbnRpdHk7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKElkZW50aXR5LCAkcSkge1xyXG4gICAgICAgICAgICBpZGVudGl0eURhdGEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxO1xyXG4gICAgICAgICAgICBpZGVudGl0eSA9IG5ldyBJZGVudGl0eShpZGVudGl0eURhdGEpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0VGFyZ2V0SWRlbnRpdHkgPVxyXG4gICAgICAgICAgICAgICAgamFzbWluZS5jcmVhdGVTcHkoJ2dldFRhcmdldElkZW50aXR5JykuYW5kLmNhbGxGYWtlKCgpID0+ICRxLndoZW4oaWRlbnRpdHkpKTtcclxuICAgICAgICAgICAgc3B5T24obG9jYXRpb24sICdwYXRoJykuYW5kLnJldHVyblZhbHVlKCcvYWNjZXNzUmVxdWVzdC9yZXZpZXcnKTtcclxuICAgICAgICAgICAgc3B5T24obm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE5vdGlmaWNhdGlvbicpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldFRhcmdldElkZW50aXR5IHdoZW4gZGVlcExpbmtSZXZpZXcgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZGVlcExpbmtSZXZpZXcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHNvIHRoZSBpbml0IGdldHMgZmlyZWQuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRUYXJnZXRJZGVudGl0eSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIGdldFRhcmdldElkZW50aXR5IHdoZW4gZGVlcExpbmtSZXZpZXcgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmRlZXBMaW5rUmV2aWV3ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgc28gdGhlIGluaXQgZ2V0cyBmaXJlZC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHNldCBlcnJvciBhbmQgZ28gYmFjayB0byBob21lIGlmIHRhcmdldCBpZGVudGl0eSBpcyBudWxsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZGVudGl0eSA9IG51bGw7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5kZWVwTGlua1JldmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJnc1swXS5zdGF0ZSkudG9FcXVhbCgnaG9tZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGFkZCByZXF1ZXN0IGl0ZW1zIGZvciBlYWNoIHJldmlldyBpdGVtJywgaW5qZWN0KGZ1bmN0aW9uKCRxKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgJ2dldFJldmlld0l0ZW1zJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oW3t0aGluZzogJ3ZhbHVlJ31dKSk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRSZXF1ZXN0ZWRJdGVtJyk7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5kZWVwTGlua1JldmlldyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgc28gdGhlIGluaXQgZ2V0cyBmaXJlZC5cclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93SXRlbURldGFpbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcm9sZURhdGEsIHNwTW9kYWwsICRxLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtLCByb2xlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sIF8kcV8sIFJlcXVlc3RlZEFjY2Vzc0l0ZW0sIEFjY2Vzc1JlcXVlc3RJdGVtKSB7XHJcbiAgICAgICAgICAgIHJvbGVEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX1JPTEU7XHJcbiAgICAgICAgICAgIHJvbGUgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0ocm9sZURhdGEpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0ocm9sZSk7XHJcblxyXG4gICAgICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIG5vIGl0ZW0gaXMgcGFzc2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2hvd0l0ZW1EZXRhaWxzKCk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgbW9kYWwgZGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0l0ZW1EZXRhaWxzKHJlcXVlc3RlZEFjY2Vzc0l0ZW0uaXRlbSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzUG9saWN5VmlvbGF0aW9uIGZvciBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJvbGVEYXRhLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudERhdGEsXHJcbiAgICAgICAgICAgIHJvbGVWaW9sYXRpb25EYXRhLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudFZpb2xhdGlvbkRhdGEsXHJcbiAgICAgICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtLFxyXG4gICAgICAgICAgICBSZXF1ZXN0ZWRBY2Nlc3NJdGVtLFxyXG4gICAgICAgICAgICByb2xlLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudCxcclxuICAgICAgICAgICAgcm9sZVZpb2xhdGlvbixcclxuICAgICAgICAgICAgZW50aXRsZW1lbnRWaW9sYXRpb24sXHJcbiAgICAgICAgICAgIHJlcXVlc3RlZFJvbGVJdGVtLFxyXG4gICAgICAgICAgICByZXF1ZXN0ZWRFbnRpdGxlbWVudEl0ZW07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHVwIHRoZSBQb2xpY3lWaW9sYXRpb24gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHVwIHRoZSBQb2xpY3lWaW9sYXRpb24gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKFJlcXVlc3RQb2xpY3lWaW9sYXRpb24sIF9BY2Nlc3NSZXF1ZXN0SXRlbV8sIF9SZXF1ZXN0ZWRBY2Nlc3NJdGVtXykge1xyXG4gICAgICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbSA9IF9BY2Nlc3NSZXF1ZXN0SXRlbV87XHJcbiAgICAgICAgICAgIFJlcXVlc3RlZEFjY2Vzc0l0ZW0gPSBfUmVxdWVzdGVkQWNjZXNzSXRlbV87XHJcblxyXG4gICAgICAgICAgICByb2xlRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX1JPTEU7XHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50RGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX0VOVElUTEVNRU5UO1xyXG4gICAgICAgICAgICByb2xlVmlvbGF0aW9uRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5ST0xFX1BPTElDWV9WSU9MQVRJT05fREFUQTtcclxuICAgICAgICAgICAgZW50aXRsZW1lbnRWaW9sYXRpb25EYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UX1BPTElDWV9WSU9MQVRJT05fREFUQTtcclxuXHJcbiAgICAgICAgICAgIHJvbGVWaW9sYXRpb24gPSBuZXcgUmVxdWVzdFBvbGljeVZpb2xhdGlvbihyb2xlVmlvbGF0aW9uRGF0YSk7XHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50VmlvbGF0aW9uID0gbmV3IFJlcXVlc3RQb2xpY3lWaW9sYXRpb24oZW50aXRsZW1lbnRWaW9sYXRpb25EYXRhKTtcclxuICAgICAgICAgICAgcm9sZSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShyb2xlRGF0YSk7XHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50ID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGVudGl0bGVtZW50RGF0YSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZFJvbGVJdGVtID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0ocm9sZSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEVudGl0bGVtZW50SXRlbSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGVudGl0bGVtZW50KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdoYXMgcm9sZSB2aW9sYXRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5jbGVhclBvbGljeVZpb2xhdGlvbnMoKTtcclxuICAgICAgICAgICAgY3RybC5wb2xpY3lWaW9sYXRpb25zLnB1c2gocm9sZVZpb2xhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1BvbGljeVZpb2xhdGlvbihyZXF1ZXN0ZWRSb2xlSXRlbSkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUG9saWN5VmlvbGF0aW9uKHJlcXVlc3RlZEVudGl0bGVtZW50SXRlbSkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaGFzIGVudGl0bGVtZW50IHZpb2xhdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmNsZWFyUG9saWN5VmlvbGF0aW9ucygpO1xyXG4gICAgICAgICAgICBjdHJsLnBvbGljeVZpb2xhdGlvbnMucHVzaChlbnRpdGxlbWVudFZpb2xhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1BvbGljeVZpb2xhdGlvbihyZXF1ZXN0ZWRSb2xlSXRlbSkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQb2xpY3lWaW9sYXRpb24ocmVxdWVzdGVkRW50aXRsZW1lbnRJdGVtKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93VmlvbGF0aW9uRGV0YWlscycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzcE1vZGFsLFxyXG4gICAgICAgICAgICBydWxlTmFtZSA9ICdydWxlJyxcclxuICAgICAgICAgICAgcG9saWN5TmFtZSA9ICdwb2xpY3knO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8pIHtcclxuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBtb2RhbCB0aXRsZSB0byB0aGUgcnVsZSBuYW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB2aW9sYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lOYW1lOiBwb2xpY3lOYW1lLFxyXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6IHJ1bGVOYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd1Zpb2xhdGlvbkRldGFpbHMoaXRlbTEuaWQsIHZpb2xhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnRpdGxlID0gcnVsZU5hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NvcnRCeVBvbGljeVZpb2xhdGlvbiBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyLCBtb2NrQ3RybCxcclxuICAgICAgICAgICAgaXRlbUEgPSB7IGRpc3BsYXlhYmxlTmFtZTogJ3doYXRldmVyJ30sXHJcbiAgICAgICAgICAgIGl0ZW1CID0geyBkaXNwbGF5YWJsZU5hbWU6ICdzdHVwaWQnfSxcclxuICAgICAgICAgICAgaXRlbUMgPSB7IGRpc3BsYXlhYmxlTmFtZTogJ2R1bWInfSxcclxuICAgICAgICAgICAgaGFzVmlvbGF0aW9ucyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihzb3J0QnlQb2xpY3lWaW9sYXRpb25GaWx0ZXIpIHtcclxuICAgICAgICAgICAgZmlsdGVyID0gc29ydEJ5UG9saWN5VmlvbGF0aW9uRmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgbW9ja0N0cmwgPSB7XHJcbiAgICAgICAgICAgICAgICBoYXNQb2xpY3lWaW9sYXRpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzVmlvbGF0aW9ucztcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgaGFzUG9saWN5VmlvbGF0aW9uOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmFrZSBpdCBzbyBpdGVtIGMgaGFzIHRoZSB2aW9sYXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpdGVtID09PSBpdGVtQyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBubyB2aW9sYXRpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IFtpdGVtQSwgaXRlbUIsIGl0ZW1DXTtcclxuICAgICAgICAgICAgZmlsdGVyKGl0ZW1zLCBtb2NrQ3RybCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtcykudG9FcXVhbChbaXRlbUEsIGl0ZW1CLCBpdGVtQ10pO1xyXG4gICAgICAgICAgICBleHBlY3QobW9ja0N0cmwuaGFzUG9saWN5VmlvbGF0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbW92ZXMgaXRlbXMgd2l0aCB2aW9sYXRpb25zIHRvIHRoZSBmcm9udCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBbaXRlbUEsIGl0ZW1CLCBpdGVtQ107XHJcbiAgICAgICAgICAgIGhhc1Zpb2xhdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbXMsIG1vY2tDdHJsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zKS50b0VxdWFsKFtpdGVtQywgaXRlbUEsIGl0ZW1CXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
