System.register(['test/js/TestInitializer', 'workitem/pamApproval/PamApprovalModule', 'workitem/WorkItemModule', 'test/js/TestModule', 'test/js/CustomMatchers', 'test/js/workitem/pamApproval/PamTestData'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for WorkItemService.
     */
    'use strict';

    var pamApprovalModule, workItemModule, testModule, CustomMatchers, PAM_TEST_DATA;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsCustomMatchers) {
            CustomMatchers = _testJsCustomMatchers['default'];
        }, function (_testJsWorkitemPamApprovalPamTestData) {
            PAM_TEST_DATA = _testJsWorkitemPamApprovalPamTestData['default'];
        }],
        execute: function () {
            describe('WorkItemService', function () {

                var baseURL = '/identityiq/ui/rest/workItems',
                    ID1 = 'id1',
                    ID2 = 'id2',
                    ID3 = 'id3',
                    ID4 = 'id4',
                    ID5 = 'id5',
                    approvalData = {
                    id: ID1,
                    target: {
                        id: 'target1Id',
                        name: 'target1Name',
                        displayName: 'target1DisplayName',
                        workgroup: false
                    },
                    requester: {
                        id: 'requester1Id',
                        name: 'requester1Name',
                        displayName: 'requester1DisplayName',
                        workgroup: false
                    },
                    created: 1423077394799,
                    workItemType: 'Approval',
                    approvalItems: [{
                        commentCount: 1,
                        displayValue: 'Benefits Display',
                        value: 'Benefits',
                        id: 'item1',
                        itemType: 'Role',
                        operation: 'Add',
                        newAccount: true,
                        description: null,
                        owner: {
                            id: '897987f',
                            name: 'Bob.Jones',
                            displayName: 'Bob Jones'
                        },
                        assignmentNote: null
                    }]
                },
                    violationReviewWorkItemData = {
                    id: ID2,
                    target: {
                        id: 'target2Id',
                        name: 'target2Name',
                        displayName: 'target2DisplayName',
                        workgroup: false
                    },
                    requester: {
                        id: 'requester2Id',
                        name: 'requester2Name',
                        displayName: 'requester2DisplayName',
                        workgroup: false
                    },
                    created: 1423077394790,
                    workItemType: 'ViolationReview',
                    violations: [{ violation: 'details' }],
                    requestedItems: [{ entitlementValue: 'value' }]
                },
                    workItemData = {
                    id: ID3,
                    target: {
                        id: 'target3Id',
                        name: 'target3Name',
                        displayName: 'target3DisplayName',
                        workgroup: false
                    },
                    requester: {
                        id: 'requester3Id',
                        name: 'requester3Name',
                        displayName: 'requester3DisplayName',
                        workgroup: false
                    },
                    created: 1423077394799,
                    workItemType: 'SomeOtherType'
                },
                    formData = {
                    id: ID4,
                    target: {
                        id: 'target4Id',
                        name: 'target4Name',
                        displayName: 'target4DisplayName',
                        workgroup: false
                    },
                    requester: {
                        id: 'requester4Id',
                        name: 'requester4Name',
                        displayName: 'requester4DisplayName',
                        workgroup: false
                    },
                    created: 1423077394799,
                    workItemType: 'Form',
                    forms: [{ form: 'details' }]
                },
                    nonAccessRequestApprovalData = {
                    id: ID5,
                    target: {
                        id: 'target1Id',
                        name: 'target1Name',
                        displayName: 'target1DisplayName',
                        workgroup: false
                    },
                    requester: {
                        id: 'requester1Id',
                        name: 'requester1Name',
                        displayName: 'requester1DisplayName',
                        workgroup: false
                    },
                    created: 1423077394799,
                    workItemType: 'Approval'
                },
                    workItemService,
                    testService,
                    $httpBackend,
                    WorkItem,
                    infoModalService,
                    ViolationReviewWorkItem,
                    Approval,
                    $rootScope,
                    spModal,
                    $q,
                    modalInstance;

                // Use the access request module.
                beforeEach(module(workItemModule, pamApprovalModule, testModule, 'ngAnimateMock'));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    /* Override the spWorkItem directive with a do nothing directive so we can
                     * unit test the workitem dialog without having to worry about anything
                     * sp-work-item does. */
                    $provide.service('spWorkItemDirective', function () {
                        return {};
                    });
                }));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_WorkItem_, _ViolationReviewWorkItem_, _Approval_, _spModal_, _testService_, _infoModalService_, _workItemService_, _$httpBackend_, _$rootScope_, _$q_) {
                    WorkItem = _WorkItem_;
                    ViolationReviewWorkItem = _ViolationReviewWorkItem_;
                    Approval = _Approval_;
                    workItemService = _workItemService_;
                    $httpBackend = _$httpBackend_;
                    $rootScope = _$rootScope_;
                    spModal = _spModal_;
                    infoModalService = _infoModalService_;
                    testService = _testService_;
                    $q = _$q_;

                    /* The functions under test do not return a reference to the modal,
                     * sneak a reference out so we can programatically close it without
                     * falling back to searching the dom for the exit button */
                    var originalOpen = spModal.open;
                    spModal.open = function () {
                        modalInstance = originalOpen.apply(spModal, arguments);
                        return modalInstance;
                    };
                }));

                afterEach(inject(function ($animate) {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                    if (modalInstance) {
                        modalInstance.close();
                        $animate.flush();
                        modalInstance = undefined;
                    }
                }));

                function checkWorkItem(workItem, id, type, workItemType) {
                    expect(workItem instanceof type).toBeTruthy();
                    expect(workItem.id).toEqual(id);
                    expect(workItem.workItemType).toEqual(workItemType);
                }

                describe('getWorkItem()', function () {
                    function testGetWorkItem(id, data, expectedType, expectedWorkItemType) {
                        var url = baseURL + '/' + id,
                            returnedWorkItem,
                            returnedPromise;

                        $httpBackend.expectGET(url).respond(200, data);
                        returnedPromise = workItemService.getWorkItem(id);
                        returnedPromise.then(function (workItem) {
                            returnedWorkItem = workItem;
                        });
                        $httpBackend.flush();
                        $rootScope.$apply();

                        checkWorkItem(returnedWorkItem, id, expectedType, expectedWorkItemType);
                    }

                    it('returns an approval', function () {
                        testGetWorkItem(ID1, approvalData, Approval, 'Approval');
                    });

                    it('returns a violation review', function () {
                        testGetWorkItem(ID2, violationReviewWorkItemData, ViolationReviewWorkItem, 'ViolationReview');
                    });

                    it('returns a work item', function () {
                        testGetWorkItem(ID3, workItemData, WorkItem, 'SomeOtherType');
                    });

                    it('returns rejected promise if work item does not exist', function () {
                        var rejectPromise,
                            rejected = false,
                            workItemId = '12345',
                            url = baseURL + '/' + workItemId;

                        $httpBackend.expectGET(url).respond(404, '');

                        rejectPromise = workItemService.getWorkItem(workItemId);

                        rejectPromise['catch'](function () {
                            rejected = true;
                        });

                        $httpBackend.flush();
                        $rootScope.$apply();

                        expect(rejected).toBe(true);
                    });
                });

                describe('getWorkItemFromSession()', function () {
                    var SESSION_URL = baseURL + '/session';

                    it('calls out to proper REST endpoint', function () {
                        $httpBackend.expectGET(SESSION_URL).respond(200, workItemData);

                        workItemService.getWorkItemFromSession().then(function (workItem) {
                            checkWorkItem(workItem, workItemData.id, WorkItem, 'SomeOtherType');
                        });

                        $httpBackend.flush();
                    });

                    it('returns a rejected promise if work item does not exist', function () {
                        var rejected = false;

                        $httpBackend.expectGET(SESSION_URL).respond(404, '');

                        workItemService.getWorkItemFromSession()['catch'](function () {
                            rejected = true;
                        });

                        $httpBackend.flush();
                        $rootScope.$apply();

                        expect(rejected).toEqual(true);
                    });
                });

                describe('getWorkItems()', function () {

                    it('should pass through to getWorkItemsByType', function () {
                        var start = 0,
                            limit = 10,
                            sort = [{ 'property': 'created', 'direction': 'DESC' }];

                        workItemService.getWorkItemsByType = testService.createPromiseSpy(false, {}, {});

                        workItemService.getWorkItems(start, limit, sort);

                        expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                        expect(workItemService.getWorkItemsByType).toHaveBeenCalledWith([], start, limit, sort);
                    });
                });

                describe('getWorkItemsByType()', function () {
                    var sort = {
                        toJson: jasmine.createSpy().and.returnValue(angular.toJson([{ 'property': 'created', 'direction': 'DESC' }]))
                    };

                    function testGetWorkItemsByType(params, queryString) {
                        $httpBackend.expectGET(baseURL + queryString).respond(200, {});
                        workItemService.getWorkItemsByType(params.type, params.start, params.limit, params.sort);
                        $httpBackend.flush();
                    }

                    it('should pass the type param specified in an array', function () {
                        var params = {
                            type: ['Form'],
                            start: 0,
                            limit: 10,
                            sort: sort
                        },
                            queryStr = '/?limit=10&sort=%5B%7B%22property%22:%22created%22,' + '%22direction%22:%22DESC%22%7D%5D&start=0&type=Form';

                        testGetWorkItemsByType(params, queryStr);
                    });

                    it('should send a single type when string specified', function () {
                        var params = {
                            type: 'Form',
                            start: 0,
                            limit: 10,
                            sort: sort
                        },
                            queryStr = '/?limit=10&sort=%5B%7B%22property%22:%22created%22,' + '%22direction%22:%22DESC%22%7D%5D&start=0&type=Form';

                        testGetWorkItemsByType(params, queryStr);
                    });

                    it('should pass multiple type params if specified', function () {
                        var params = {
                            type: ['Form', 'Approval'],
                            start: 0,
                            limit: 10,
                            sort: sort
                        },
                            queryStr = '/?limit=10&sort=%5B%7B%22property%22:%22created%22,' + '%22direction%22:%22DESC%22%7D%5D&start=0&type=Form&type=Approval';

                        testGetWorkItemsByType(params, queryStr);
                    });

                    it('should not send a type when empty array specified', function () {
                        var params = {
                            type: [],
                            start: 0,
                            limit: 10,
                            sort: sort
                        },
                            queryStr = '/?limit=10&sort=%5B%7B%22property%22:%22created%22,' + '%22direction%22:%22DESC%22%7D%5D&start=0';

                        testGetWorkItemsByType(params, queryStr);
                    });

                    it('should not send a type when undefined specified', function () {
                        var params = {
                            start: 0,
                            limit: 10,
                            sort: sort
                        },
                            queryStr = '/?limit=10&sort=%5B%7B%22property%22:%22created%22,' + '%22direction%22:%22DESC%22%7D%5D&start=0';

                        testGetWorkItemsByType(params, queryStr);
                    });
                });

                describe('registerWorkItem()', function () {
                    it('causes createWorkItem() to create a new type', function () {
                        // Create a factory to test with.
                        var NEW_WORK_ITEM = {
                            somethingSpecial: 'yay!'
                        };

                        var factory = {
                            isWorkItemHandled: function (workItemData) {
                                return workItemData.taco === true;
                            },

                            createWorkItem: function (workItemData) {
                                return NEW_WORK_ITEM;
                            }
                        };

                        // Register the factory.
                        workItemService.registerWorkItem(factory);

                        // Create a new work item.
                        var workItem = workItemService.createWorkItem({ taco: true });
                        expect(workItem).toEqual(NEW_WORK_ITEM);
                    });
                });

                describe('createWorkItem()', function () {
                    var PAM_APPROVAL = PAM_TEST_DATA.approval;

                    var PamApproval = undefined;

                    beforeEach(inject(function (_PamApproval_) {
                        PamApproval = _PamApproval_;
                    }));

                    function testCreateWorkItem(id, data, expectedType, expectedWorkItemType) {
                        var workItem = workItemService.createWorkItem(data);
                        expect(workItem instanceof expectedType).toBeTruthy();
                        expect(workItem.getId()).toEqual(id);
                        expect(workItem.getWorkItemType()).toEqual(expectedWorkItemType);
                    }

                    it('creates an approval', function () {
                        testCreateWorkItem(ID1, approvalData, Approval, 'Approval');
                    });

                    it('creates a violation review', function () {
                        testCreateWorkItem(ID2, violationReviewWorkItemData, ViolationReviewWorkItem, 'ViolationReview');
                    });

                    it('creates a PAM approval', function () {
                        testCreateWorkItem(PAM_APPROVAL.id, PAM_APPROVAL, PamApproval, 'Approval');
                    });

                    it('creates a work item', function () {
                        testCreateWorkItem(ID3, workItemData, WorkItem, 'SomeOtherType');
                    });

                    it('creates a work item for an approval without approval items', function () {
                        testCreateWorkItem(ID5, nonAccessRequestApprovalData, WorkItem, 'Approval');
                    });
                });

                describe('openWorkItemDialog', function () {
                    function setUpGetWorkItem(data) {
                        var workItem = workItemService.createWorkItem(data),
                            deferred = $q.defer();
                        deferred.resolve(workItem);
                        spyOn(workItemService, 'getWorkItem').and.returnValue(deferred.promise);
                    }

                    function testAlertTitleMessageKey(key, length) {
                        spyOn(spModal, 'open').and.callThrough();
                        workItemService.openWorkItemDialog('id', 'full');
                        $rootScope.$apply();
                        var element = angular.element('#modal-content .no-pad')[0];
                        expect(angular.element(element).find('.alert-title').length).toBe(length);
                        if (key) {
                            expect(angular.element(element).find('.alert-title')[0].innerText).toBe(key);
                        }
                    }

                    it('should open spModal when called', function () {
                        setUpGetWorkItem(violationReviewWorkItemData);
                        spyOn(spModal, 'open').and.callThrough();
                        workItemService.openWorkItemDialog('id', 'full');
                        $rootScope.$broadcast('$animate:close');
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should set appropriate message key for violation workitem', function () {
                        setUpGetWorkItem(violationReviewWorkItemData);
                        testAlertTitleMessageKey('ui_work_item_dialog_violation_alert', 1);
                    });

                    it('should set appropriate message key for approval workitem', function () {
                        setUpGetWorkItem(approvalData);
                        testAlertTitleMessageKey('ui_work_item_dialog_approval_alert', 1);
                    });

                    it('should not show alert div when workitem type does not support Later functionality', function () {
                        setUpGetWorkItem(formData);
                        testAlertTitleMessageKey(null, 0);
                    });
                });

                describe('showDetailsDialog()', function () {
                    it('should open spModal', function () {
                        var workItem;
                        spyOn(spModal, 'open');
                        workItem = workItemService.createWorkItem(workItemData);
                        workItemService.showDetailsDialog(workItem);
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('showForwardDialog()', function () {
                    it('should open spModal', function () {
                        var workItem = undefined,
                            title = 'work_item_title',
                            helpText = 'help_text';
                        spyOn(spModal, 'open');
                        workItem = workItemService.createWorkItem(workItemData);
                        workItemService.showForwardDialog(workItem, function () {}, title, helpText);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].title).toEqual(title);
                        expect(spModal.open.calls.mostRecent().args[0].resolve.helpText()).toEqual(helpText);
                    });
                });

                describe('getForwardingHistory()', function () {
                    var workItemId = '1234',
                        historyUrl = baseURL + '/' + workItemId + '/ownerHistory',
                        history = [{
                        previousOwner: 'J-bob',
                        newOwner: 'K-bob',
                        date: 1391618385380,
                        comment: 'Hey K-bob ... take care of this'
                    }, {
                        previousOwner: 'K-bob',
                        newOwner: 'Foo-bob',
                        date: 1391618389999,
                        comment: 'Nope ... Foo-bob gets to deal.'
                    }];

                    // Add a custom matcher to check an $http GET response.
                    beforeEach(function () {
                        jasmine.addMatchers(CustomMatchers);
                    });

                    it('gets forwarding history', function () {
                        var ownerHistory;
                        $httpBackend.expectGET(historyUrl).respond(200, history);
                        ownerHistory = workItemService.getForwardingHistory(workItemId);
                        $httpBackend.flush();
                        ownerHistory.then(function (result) {
                            expect(result).toEqualResponse(history);
                        });
                        $rootScope.$apply();
                    });

                    it('fails on REST error', function () {
                        var failSpy = jasmine.createSpy('call fail');
                        $httpBackend.expectGET(historyUrl).respond(500, '');
                        workItemService.getForwardingHistory(workItemId)['catch'](failSpy);
                        $httpBackend.flush();
                        $rootScope.$apply();
                        expect(failSpy).toHaveBeenCalled();
                    });

                    it('pukes with no workItemId', function () {
                        expect(function () {
                            workItemService.getForwardingHistory(null);
                        }).toThrow();
                        $httpBackend.verifyNoOutstandingRequest();
                    });
                });

                describe('getIdentityDetails()', function () {
                    it('should make REST call to identityDetails', function () {
                        var url = baseURL + '/1/identityDetails';
                        $httpBackend.expectGET(url).respond(200, {});
                        workItemService.getIdentityDetails('1');
                        $httpBackend.flush();
                    });
                });

                describe('deleteWorkItem()', function () {
                    function testDeleteWorkItem(id, data) {
                        var url = baseURL + '/' + id;
                        $httpBackend.expectDELETE(url).respond(200);
                        workItemService.deleteWorkItem(id);
                        $httpBackend.flush();
                    }

                    it('deletes an approval work item', function () {
                        testDeleteWorkItem(ID1, workItemData);
                    });
                    it('deletes a violation review work item', function () {
                        testDeleteWorkItem(ID2, workItemData);
                    });
                    it('deletes a other type work item', function () {
                        testDeleteWorkItem(ID3, workItemData);
                    });
                });

                describe('forwardWorkItem()', function () {
                    var getUrl = function (workItemId) {
                        return baseURL + '/' + workItemId + '/forward';
                    };

                    it('sends a POST request with comment', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(getUrl(workItemData.id), { targetIdentity: '4567', comment: 'random comment' }).respond(200, '{"message":null,"success":true}');
                        promise = workItemService.forwardWorkItem(workItemData.id, '4567', 'random comment');
                        spy = testService.spyOnSuccess(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('sends a POST request without comment', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(getUrl(workItemData.id), { targetIdentity: '4567' }).respond(200, '{"message":null,"success":true}');
                        promise = workItemService.forwardWorkItem(workItemData.id, '4567', null);
                        spy = testService.spyOnSuccess(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(getUrl(workItemData.id)).respond(500, '');
                        promise = workItemService.forwardWorkItem(workItemData.id, '4567', null);
                        spy = testService.spyOnFailure(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST SuccessResult error', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(getUrl(workItemData.id)).respond(200, '{"message":"Cannot forward work item to existing owner","success":false}');
                        promise = workItemService.forwardWorkItem(workItemData.id, '4567', 'this should fail');
                        spy = testService.spyOnFailure(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no workItemId', function () {
                        expect(function () {
                            workItemService.forwardWorkItem(null, '4567', null);
                        }).toThrow();
                        $httpBackend.verifyNoOutstandingRequest();
                    });

                    it('pukes with no targetIdentity', function () {
                        expect(function () {
                            workItemService.forwardWorkItem(workItemData.id, null, null);
                        }).toThrow();
                        $httpBackend.verifyNoOutstandingRequest();
                    });
                });

                describe('isSupportedWorkItemType()', function () {

                    it('matches an approval', function () {
                        expect(workItemService.isSupportedWorkItemType(approvalData.workItemType)).toBe(true);
                        $httpBackend.verifyNoOutstandingRequest();
                    });

                    it('matches a form', function () {
                        expect(workItemService.isSupportedWorkItemType(formData.workItemType)).toBe(true);
                        $httpBackend.verifyNoOutstandingRequest();
                    });

                    it('matches a violation review', function () {
                        expect(workItemService.isSupportedWorkItemType(violationReviewWorkItemData.workItemType)).toBe(true);
                        $httpBackend.verifyNoOutstandingRequest();
                    });

                    it('is not a supported work item type', function () {
                        expect(workItemService.isSupportedWorkItemType(workItemData.workItemType)).toBe(false);
                        $httpBackend.verifyNoOutstandingRequest();
                    });

                    it('throws an exception for null work item type', function () {
                        expect(function () {
                            workItemService.isSupportedWorkItemType(null);
                        }).toThrow();
                        $httpBackend.verifyNoOutstandingRequest();
                    });
                });

                describe('openUnSupportedWorkItemDialog()', function () {

                    it('should open infoModal when called', function () {
                        spyOn(infoModalService, 'open').and.callThrough();
                        workItemService.openUnSupportedWorkItemDialog();
                        $rootScope.$apply();
                        expect(infoModalService.open).toHaveBeenCalled();
                    });
                });

                describe('getWorkItemTypeTranslation', function () {

                    it('should throw if type is null', function () {
                        expect(function () {
                            workItemService.getWorkItemTypeTranslation(null, 'ui_foobar');
                        }).toThrow();
                    });

                    it('should throw if messageKey is null', function () {
                        expect(function () {
                            workItemService.getWorkItemTypeTranslation('foo', null);
                        }).toThrow();
                    });

                    it('should not throw if type and messageKey are not null', function () {
                        expect(function () {
                            workItemService.getWorkItemTypeTranslation('foo', 'ui_foobar');
                        }).not.toThrow();
                    });
                });

                describe('navigateToWorkItemPage', function () {
                    var navigationService;
                    beforeEach(inject(function (_navigationService_) {
                        navigationService = _navigationService_;
                        spyOn(navigationService, 'go');
                    }));

                    it('throws if workItemId is null', function () {
                        expect(function () {
                            workItemService.navigateToWorkItemPage();
                        }).toThrow();
                    });

                    it('navigates to the viewWorkItem outcome', function () {
                        workItemService.navigateToWorkItemPage('1234');
                        expect(navigationService.go).toHaveBeenCalledWith({
                            outcome: 'viewWorkItem?id=1234'
                        });
                    });

                    it('adds reset flag', function () {
                        workItemService.navigateToWorkItemPage('1234', true);
                        expect(navigationService.go).toHaveBeenCalledWith({
                            outcome: 'viewWorkItem?id=1234&reset=true'
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsMkJBQTJCLHNCQUFzQiwwQkFBMEIsNkNBQTZDLFVBQVUsU0FBUzs7Ozs7O0lBQ2pPOztJQU9JLElBQUksbUJBQW1CLGdCQUFnQixZQUFZLGdCQUFnQjtJQUNuRSxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysb0JBQW9CLHNDQUFzQztXQUMzRCxVQUFVLHlCQUF5QjtZQUNsQyxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsdUJBQXVCO1lBQ2hDLGlCQUFpQixzQkFBc0I7V0FDeEMsVUFBVSx1Q0FBdUM7WUFDaEQsZ0JBQWdCLHNDQUFzQzs7UUFFMUQsU0FBUyxZQUFZO1lBUDdCLFNBQVMsbUJBQW1CLFlBQVc7O2dCQUVuQyxJQUFJLFVBQVU7b0JBQ1YsTUFBTTtvQkFDTixNQUFNO29CQUNOLE1BQU07b0JBQ04sTUFBTTtvQkFDTixNQUFNO29CQUNOLGVBQWU7b0JBQ1gsSUFBSTtvQkFDSixRQUFRO3dCQUNKLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLFdBQVc7O29CQUVmLFdBQVc7d0JBQ1AsSUFBSTt3QkFDSixNQUFNO3dCQUNOLGFBQWE7d0JBQ2IsV0FBVzs7b0JBRWYsU0FBUztvQkFDVCxjQUFjO29CQUNkLGVBQWUsQ0FBQzt3QkFDWixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsT0FBTzt3QkFDUCxJQUFJO3dCQUNKLFVBQVU7d0JBQ1YsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsT0FBTzs0QkFDSCxJQUFJOzRCQUNKLE1BQU07NEJBQ04sYUFBYTs7d0JBRWpCLGdCQUFnQjs7O29CQUd4Qiw4QkFBOEI7b0JBQzFCLElBQUk7b0JBQ0osUUFBUTt3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QUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxPQUFPLGlCQUFpQixNQUFNOzs7O2dCQUl0QyxTQUFTLDhCQUE4QixZQUFXOztvQkFFOUMsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxZQUFXOzRCQUNkLGdCQUFnQiwyQkFBMkIsTUFBTTsyQkFDbEQ7OztvQkFHUCxHQUFHLHNDQUFzQyxZQUFXO3dCQUNoRCxPQUFPLFlBQVc7NEJBQ2QsZ0JBQWdCLDJCQUEyQixPQUFPOzJCQUNuRDs7O29CQUdQLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLE9BQU8sWUFBVzs0QkFDZCxnQkFBZ0IsMkJBQTJCLE9BQU87MkJBQ25ELElBQUk7Ozs7Z0JBSWYsU0FBUywwQkFBMEIsWUFBVztvQkFDMUMsSUFBSTtvQkFDSixXQUFXLE9BQU8sVUFBUyxxQkFBcUI7d0JBQzVDLG9CQUFvQjt3QkFDcEIsTUFBTSxtQkFBbUI7OztvQkFHN0IsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxZQUFXOzRCQUNkLGdCQUFnQjsyQkFDakI7OztvQkFHUCxHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxnQkFBZ0IsdUJBQXVCO3dCQUN2QyxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQjs0QkFDOUMsU0FBUzs7OztvQkFJakIsR0FBRyxtQkFBbUIsWUFBVzt3QkFDN0IsZ0JBQWdCLHVCQUF1QixRQUFRO3dCQUMvQyxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQjs0QkFDOUMsU0FBUzs7Ozs7OztHQVF0QiIsImZpbGUiOiJ3b3JraXRlbS9Xb3JrSXRlbVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1BcHByb3ZhbE1vZHVsZSBmcm9tICd3b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1BcHByb3ZhbE1vZHVsZSc7XG5pbXBvcnQgd29ya0l0ZW1Nb2R1bGUgZnJvbSAnd29ya2l0ZW0vV29ya0l0ZW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcbmltcG9ydCBDdXN0b21NYXRjaGVycyBmcm9tICd0ZXN0L2pzL0N1c3RvbU1hdGNoZXJzJztcblxuaW1wb3J0IFBBTV9URVNUX0RBVEEgZnJvbSAndGVzdC9qcy93b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1UZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIFdvcmtJdGVtU2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1dvcmtJdGVtU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC93b3JrSXRlbXMnLFxuICAgICAgICBJRDEgPSAnaWQxJyxcbiAgICAgICAgSUQyID0gJ2lkMicsXG4gICAgICAgIElEMyA9ICdpZDMnLFxuICAgICAgICBJRDQgPSAnaWQ0JyxcbiAgICAgICAgSUQ1ID0gJ2lkNScsXG4gICAgICAgIGFwcHJvdmFsRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBJRDEsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ3RhcmdldDFJZCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhcmdldDFOYW1lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3RhcmdldDFEaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAncmVxdWVzdGVyMUlkJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVxdWVzdGVyMU5hbWUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncmVxdWVzdGVyMURpc3BsYXlOYW1lJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlZDogMTQyMzA3NzM5NDc5OSxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ0FwcHJvdmFsJyxcbiAgICAgICAgICAgIGFwcHJvdmFsSXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgY29tbWVudENvdW50OiAxLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ0JlbmVmaXRzIERpc3BsYXknLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgIGlkOiAnaXRlbTEnLFxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlOiAnUm9sZScsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnQWRkJyxcbiAgICAgICAgICAgICAgICBuZXdBY2NvdW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIG93bmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnODk3OTg3ZicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdCb2IuSm9uZXMnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0JvYiBKb25lcydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnROb3RlOiBudWxsXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbURhdGEgPSB7XG4gICAgICAgICAgICBpZDogSUQyLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICd0YXJnZXQySWQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd0YXJnZXQyTmFtZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICd0YXJnZXQyRGlzcGxheU5hbWUnLFxuICAgICAgICAgICAgICAgIHdvcmtncm91cDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1ZXN0ZXI6IHtcbiAgICAgICAgICAgICAgICBpZDogJ3JlcXVlc3RlcjJJZCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JlcXVlc3RlcjJOYW1lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JlcXVlc3RlcjJEaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IDE0MjMwNzczOTQ3OTAsXG4gICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgdmlvbGF0aW9uczogW3t2aW9sYXRpb246ICdkZXRhaWxzJ31dLFxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbXM6IFt7ZW50aXRsZW1lbnRWYWx1ZTogJ3ZhbHVlJ31dXG4gICAgICAgIH0sXG4gICAgICAgIHdvcmtJdGVtRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBJRDMsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ3RhcmdldDNJZCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhcmdldDNOYW1lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3RhcmdldDNEaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAncmVxdWVzdGVyM0lkJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVxdWVzdGVyM05hbWUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncmVxdWVzdGVyM0Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlZDogMTQyMzA3NzM5NDc5OSxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ1NvbWVPdGhlclR5cGUnXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1EYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkOiBJRDQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAndGFyZ2V0NElkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RhcmdldDROYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICd0YXJnZXQ0RGlzcGxheU5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZXF1ZXN0ZXI0SWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncmVxdWVzdGVyNE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3JlcXVlc3RlcjREaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtncm91cDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IDE0MjMwNzczOTQ3OTksXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgZm9ybXM6IFt7Zm9ybTogJ2RldGFpbHMnfV1cbiAgICAgICAgfSxcbiAgICAgICAgbm9uQWNjZXNzUmVxdWVzdEFwcHJvdmFsRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBJRDUsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ3RhcmdldDFJZCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhcmdldDFOYW1lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3RhcmdldDFEaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAncmVxdWVzdGVyMUlkJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVxdWVzdGVyMU5hbWUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncmVxdWVzdGVyMURpc3BsYXlOYW1lJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlZDogMTQyMzA3NzM5NDc5OSxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ0FwcHJvdmFsJ1xuICAgICAgICB9LFxuICAgICAgICB3b3JrSXRlbVNlcnZpY2UsIHRlc3RTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsIFdvcmtJdGVtLCBpbmZvTW9kYWxTZXJ2aWNlLFxuICAgICAgICBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSwgQXBwcm92YWwsICRyb290U2NvcGUsIHNwTW9kYWwsICRxLCBtb2RhbEluc3RhbmNlO1xuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1Nb2R1bGUsIHBhbUFwcHJvdmFsTW9kdWxlLCB0ZXN0TW9kdWxlLCAnbmdBbmltYXRlTW9jaycpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICAgICAgLyogT3ZlcnJpZGUgdGhlIHNwV29ya0l0ZW0gZGlyZWN0aXZlIHdpdGggYSBkbyBub3RoaW5nIGRpcmVjdGl2ZSBzbyB3ZSBjYW5cbiAgICAgICAgICogdW5pdCB0ZXN0IHRoZSB3b3JraXRlbSBkaWFsb2cgd2l0aG91dCBoYXZpbmcgdG8gd29ycnkgYWJvdXQgYW55dGhpbmdcbiAgICAgICAgICogc3Atd29yay1pdGVtIGRvZXMuICovXG4gICAgICAgICRwcm92aWRlLnNlcnZpY2UoJ3NwV29ya0l0ZW1EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyB9KTtcbiAgICB9KSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Xb3JrSXRlbV8sIF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV8sIF9BcHByb3ZhbF8sIF9zcE1vZGFsXywgX3Rlc3RTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW5mb01vZGFsU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3dvcmtJdGVtU2VydmljZV8sIF8kaHR0cEJhY2tlbmRfLCBfJHJvb3RTY29wZV8sIF8kcV8pIHtcbiAgICAgICAgV29ya0l0ZW0gPSBfV29ya0l0ZW1fO1xuICAgICAgICBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSA9IF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV87XG4gICAgICAgIEFwcHJvdmFsID0gX0FwcHJvdmFsXztcbiAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICBpbmZvTW9kYWxTZXJ2aWNlID0gX2luZm9Nb2RhbFNlcnZpY2VfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRxID0gXyRxXztcblxuICAgICAgICAvKiBUaGUgZnVuY3Rpb25zIHVuZGVyIHRlc3QgZG8gbm90IHJldHVybiBhIHJlZmVyZW5jZSB0byB0aGUgbW9kYWwsXG4gICAgICAgICAqIHNuZWFrIGEgcmVmZXJlbmNlIG91dCBzbyB3ZSBjYW4gcHJvZ3JhbWF0aWNhbGx5IGNsb3NlIGl0IHdpdGhvdXRcbiAgICAgICAgICogZmFsbGluZyBiYWNrIHRvIHNlYXJjaGluZyB0aGUgZG9tIGZvciB0aGUgZXhpdCBidXR0b24gKi9cbiAgICAgICAgdmFyIG9yaWdpbmFsT3BlbiA9IHNwTW9kYWwub3BlbjtcbiAgICAgICAgc3BNb2RhbC5vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gb3JpZ2luYWxPcGVuLmFwcGx5KHNwTW9kYWwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZTtcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCRhbmltYXRlKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIGlmIChtb2RhbEluc3RhbmNlKSB7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICAgICAgICAkYW5pbWF0ZS5mbHVzaCgpO1xuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrV29ya0l0ZW0od29ya0l0ZW0sIGlkLCB0eXBlLCB3b3JrSXRlbVR5cGUpIHtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtIGluc3RhbmNlb2YgdHlwZSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaWQpLnRvRXF1YWwoaWQpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0ud29ya0l0ZW1UeXBlKS50b0VxdWFsKHdvcmtJdGVtVHlwZSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dldFdvcmtJdGVtKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdEdldFdvcmtJdGVtKGlkLCBkYXRhLCBleHBlY3RlZFR5cGUsIGV4cGVjdGVkV29ya0l0ZW1UeXBlKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gYmFzZVVSTCArICcvJyArIGlkLFxuICAgICAgICAgICAgICAgIHJldHVybmVkV29ya0l0ZW0sIHJldHVybmVkUHJvbWlzZTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCBkYXRhKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbShpZCk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UudGhlbihmdW5jdGlvbih3b3JrSXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybmVkV29ya0l0ZW0gPSB3b3JrSXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBjaGVja1dvcmtJdGVtKHJldHVybmVkV29ya0l0ZW0sIGlkLCBleHBlY3RlZFR5cGUsIGV4cGVjdGVkV29ya0l0ZW1UeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGFwcHJvdmFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW0oSUQxLCBhcHByb3ZhbERhdGEsIEFwcHJvdmFsLCAnQXBwcm92YWwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYSB2aW9sYXRpb24gcmV2aWV3JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW0oSUQyLCB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbURhdGEsIFZpb2xhdGlvblJldmlld1dvcmtJdGVtLCAnVmlvbGF0aW9uUmV2aWV3Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgd29yayBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW0oSUQzLCB3b3JrSXRlbURhdGEsIFdvcmtJdGVtLCAnU29tZU90aGVyVHlwZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyByZWplY3RlZCBwcm9taXNlIGlmIHdvcmsgaXRlbSBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlamVjdFByb21pc2UsXG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkID0gJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICB1cmwgPSBiYXNlVVJMICsgJy8nICsgd29ya0l0ZW1JZDtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoNDA0LCAnJyk7XG5cbiAgICAgICAgICAgIHJlamVjdFByb21pc2UgPSB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW0od29ya0l0ZW1JZCk7XG5cbiAgICAgICAgICAgIHJlamVjdFByb21pc2UuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFdvcmtJdGVtRnJvbVNlc3Npb24oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgU0VTU0lPTl9VUkwgPSBiYXNlVVJMICsgJy9zZXNzaW9uJztcblxuICAgICAgICBpdCgnY2FsbHMgb3V0IHRvIHByb3BlciBSRVNUIGVuZHBvaW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKFNFU1NJT05fVVJMKS5yZXNwb25kKDIwMCwgd29ya0l0ZW1EYXRhKTtcblxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtRnJvbVNlc3Npb24oKS50aGVuKGZ1bmN0aW9uKHdvcmtJdGVtKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tXb3JrSXRlbSh3b3JrSXRlbSwgd29ya0l0ZW1EYXRhLmlkLCBXb3JrSXRlbSwgJ1NvbWVPdGhlclR5cGUnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYSByZWplY3RlZCBwcm9taXNlIGlmIHdvcmsgaXRlbSBkb2VzIG5vdCBleGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlamVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoU0VTU0lPTl9VUkwpLnJlc3BvbmQoNDA0LCAnJyk7XG5cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbUZyb21TZXNzaW9uKCkuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFdvcmtJdGVtcygpJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBwYXNzIHRocm91Z2ggdG8gZ2V0V29ya0l0ZW1zQnlUeXBlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gMTAsXG4gICAgICAgICAgICAgICAgc29ydCA9IFt7J3Byb3BlcnR5JzogJ2NyZWF0ZWQnLCdkaXJlY3Rpb24nOiAnREVTQyd9XTtcblxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtc0J5VHlwZSA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHt9LCB7fSk7XG5cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXMoc3RhcnQsIGxpbWl0LCBzb3J0KTtcblxuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXNCeVR5cGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChbXSwgc3RhcnQsIGxpbWl0LCBzb3J0KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRXb3JrSXRlbXNCeVR5cGUoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc29ydCA9IHtcbiAgICAgICAgICAgIHRvSnNvbjogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgYW5ndWxhci50b0pzb24oW3sncHJvcGVydHknOiAnY3JlYXRlZCcsJ2RpcmVjdGlvbic6ICdERVNDJ31dKVxuICAgICAgICAgICAgKVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RHZXRXb3JrSXRlbXNCeVR5cGUocGFyYW1zLCBxdWVyeVN0cmluZykge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMICsgcXVlcnlTdHJpbmcpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlKHBhcmFtcy50eXBlLCBwYXJhbXMuc3RhcnQsIHBhcmFtcy5saW1pdCwgcGFyYW1zLnNvcnQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCAoJ3Nob3VsZCBwYXNzIHRoZSB0eXBlIHBhcmFtIHNwZWNpZmllZCBpbiBhbiBhcnJheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogWydGb3JtJ10sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gJy8/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJjcmVhdGVkJTIyLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJyUyMmRpcmVjdGlvbiUyMjolMjJERVNDJTIyJTdEJTVEJnN0YXJ0PTAmdHlwZT1Gb3JtJztcblxuICAgICAgICAgICAgdGVzdEdldFdvcmtJdGVtc0J5VHlwZShwYXJhbXMsIHF1ZXJ5U3RyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZW5kIGEgc2luZ2xlIHR5cGUgd2hlbiBzdHJpbmcgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gJy8/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJjcmVhdGVkJTIyLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJyUyMmRpcmVjdGlvbiUyMjolMjJERVNDJTIyJTdEJTVEJnN0YXJ0PTAmdHlwZT1Gb3JtJztcblxuICAgICAgICAgICAgdGVzdEdldFdvcmtJdGVtc0J5VHlwZShwYXJhbXMsIHF1ZXJ5U3RyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBwYXNzIG11bHRpcGxlIHR5cGUgcGFyYW1zIGlmIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogWydGb3JtJywgJ0FwcHJvdmFsJ10sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gJy8/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJjcmVhdGVkJTIyLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJyUyMmRpcmVjdGlvbiUyMjolMjJERVNDJTIyJTdEJTVEJnN0YXJ0PTAmdHlwZT1Gb3JtJnR5cGU9QXBwcm92YWwnO1xuXG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW1zQnlUeXBlKHBhcmFtcywgcXVlcnlTdHIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZW5kIGEgdHlwZSB3aGVuIGVtcHR5IGFycmF5IHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogW10sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gJy8/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJjcmVhdGVkJTIyLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJyUyMmRpcmVjdGlvbiUyMjolMjJERVNDJTIyJTdEJTVEJnN0YXJ0PTAnO1xuXG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW1zQnlUeXBlKHBhcmFtcywgcXVlcnlTdHIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZW5kIGEgdHlwZSB3aGVuIHVuZGVmaW5lZCBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IHNvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gJy8/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJjcmVhdGVkJTIyLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJyUyMmRpcmVjdGlvbiUyMjolMjJERVNDJTIyJTdEJTVEJnN0YXJ0PTAnO1xuXG4gICAgICAgICAgICB0ZXN0R2V0V29ya0l0ZW1zQnlUeXBlKHBhcmFtcywgcXVlcnlTdHIpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlZ2lzdGVyV29ya0l0ZW0oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhdXNlcyBjcmVhdGVXb3JrSXRlbSgpIHRvIGNyZWF0ZSBhIG5ldyB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZmFjdG9yeSB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjb25zdCBORVdfV09SS19JVEVNID0ge1xuICAgICAgICAgICAgICAgIHNvbWV0aGluZ1NwZWNpYWw6ICd5YXkhJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHtcbiAgICAgICAgICAgICAgICBpc1dvcmtJdGVtSGFuZGxlZDogZnVuY3Rpb24od29ya0l0ZW1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3b3JrSXRlbURhdGEudGFjbyA9PT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgY3JlYXRlV29ya0l0ZW06IGZ1bmN0aW9uKHdvcmtJdGVtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTkVXX1dPUktfSVRFTTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgZmFjdG9yeS5cbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5yZWdpc3RlcldvcmtJdGVtKGZhY3RvcnkpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgd29yayBpdGVtLlxuICAgICAgICAgICAgbGV0IHdvcmtJdGVtID0gd29ya0l0ZW1TZXJ2aWNlLmNyZWF0ZVdvcmtJdGVtKHsgdGFjbzogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbSkudG9FcXVhbChORVdfV09SS19JVEVNKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlV29ya0l0ZW0oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBQQU1fQVBQUk9WQUwgPSBQQU1fVEVTVF9EQVRBLmFwcHJvdmFsO1xuXG4gICAgICAgIGxldCBQYW1BcHByb3ZhbDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX1BhbUFwcHJvdmFsXykgPT4ge1xuICAgICAgICAgICAgUGFtQXBwcm92YWwgPSBfUGFtQXBwcm92YWxfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gdGVzdENyZWF0ZVdvcmtJdGVtKGlkLCBkYXRhLCBleHBlY3RlZFR5cGUsIGV4cGVjdGVkV29ya0l0ZW1UeXBlKSB7XG4gICAgICAgICAgICB2YXIgd29ya0l0ZW0gPSB3b3JrSXRlbVNlcnZpY2UuY3JlYXRlV29ya0l0ZW0oZGF0YSk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW0gaW5zdGFuY2VvZiBleHBlY3RlZFR5cGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRJZCgpKS50b0VxdWFsKGlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRXb3JrSXRlbVR5cGUoKSkudG9FcXVhbChleHBlY3RlZFdvcmtJdGVtVHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnY3JlYXRlcyBhbiBhcHByb3ZhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdENyZWF0ZVdvcmtJdGVtKElEMSwgYXBwcm92YWxEYXRhLCBBcHByb3ZhbCwgJ0FwcHJvdmFsJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjcmVhdGVzIGEgdmlvbGF0aW9uIHJldmlldycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdENyZWF0ZVdvcmtJdGVtKElEMiwgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1EYXRhLCBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSwgJ1Zpb2xhdGlvblJldmlldycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY3JlYXRlcyBhIFBBTSBhcHByb3ZhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdENyZWF0ZVdvcmtJdGVtKFBBTV9BUFBST1ZBTC5pZCwgUEFNX0FQUFJPVkFMLCBQYW1BcHByb3ZhbCwgJ0FwcHJvdmFsJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjcmVhdGVzIGEgd29yayBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0ZXN0Q3JlYXRlV29ya0l0ZW0oSUQzLCB3b3JrSXRlbURhdGEsIFdvcmtJdGVtLCAnU29tZU90aGVyVHlwZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY3JlYXRlcyBhIHdvcmsgaXRlbSBmb3IgYW4gYXBwcm92YWwgd2l0aG91dCBhcHByb3ZhbCBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdENyZWF0ZVdvcmtJdGVtKElENSwgbm9uQWNjZXNzUmVxdWVzdEFwcHJvdmFsRGF0YSwgV29ya0l0ZW0sICdBcHByb3ZhbCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuV29ya0l0ZW1EaWFsb2cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0VXBHZXRXb3JrSXRlbShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgd29ya0l0ZW0gPSB3b3JrSXRlbVNlcnZpY2UuY3JlYXRlV29ya0l0ZW0oZGF0YSksXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh3b3JrSXRlbSk7XG4gICAgICAgICAgICBzcHlPbih3b3JrSXRlbVNlcnZpY2UsICdnZXRXb3JrSXRlbScpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RBbGVydFRpdGxlTWVzc2FnZUtleShrZXksIGxlbmd0aCkge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5vcGVuV29ya0l0ZW1EaWFsb2coJ2lkJywgJ2Z1bGwnKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnI21vZGFsLWNvbnRlbnQgLm5vLXBhZCcpWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCcuYWxlcnQtdGl0bGUnKS5sZW5ndGgpLnRvQmUobGVuZ3RoKTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoJy5hbGVydC10aXRsZScpWzBdLmlubmVyVGV4dCkudG9CZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHNwTW9kYWwgd2hlbiBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwR2V0V29ya0l0ZW0odmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1EYXRhKTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2Uub3BlbldvcmtJdGVtRGlhbG9nKCdpZCcsICdmdWxsJyk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRhbmltYXRlOmNsb3NlJyk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBhcHByb3ByaWF0ZSBtZXNzYWdlIGtleSBmb3IgdmlvbGF0aW9uIHdvcmtpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRVcEdldFdvcmtJdGVtKHZpb2xhdGlvblJldmlld1dvcmtJdGVtRGF0YSk7XG4gICAgICAgICAgICB0ZXN0QWxlcnRUaXRsZU1lc3NhZ2VLZXkoJ3VpX3dvcmtfaXRlbV9kaWFsb2dfdmlvbGF0aW9uX2FsZXJ0JywgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGFwcHJvcHJpYXRlIG1lc3NhZ2Uga2V5IGZvciBhcHByb3ZhbCB3b3JraXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0VXBHZXRXb3JrSXRlbShhcHByb3ZhbERhdGEpO1xuICAgICAgICAgICAgdGVzdEFsZXJ0VGl0bGVNZXNzYWdlS2V5KCd1aV93b3JrX2l0ZW1fZGlhbG9nX2FwcHJvdmFsX2FsZXJ0JywgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHNob3cgYWxlcnQgZGl2IHdoZW4gd29ya2l0ZW0gdHlwZSBkb2VzIG5vdCBzdXBwb3J0IExhdGVyIGZ1bmN0aW9uYWxpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldFVwR2V0V29ya0l0ZW0oZm9ybURhdGEpO1xuICAgICAgICAgICAgdGVzdEFsZXJ0VGl0bGVNZXNzYWdlS2V5KG51bGwsIDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RGV0YWlsc0RpYWxvZygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBzcE1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgd29ya0l0ZW07XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xuICAgICAgICAgICAgd29ya0l0ZW0gPSB3b3JrSXRlbVNlcnZpY2UuY3JlYXRlV29ya0l0ZW0od29ya0l0ZW1EYXRhKTtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5zaG93RGV0YWlsc0RpYWxvZyh3b3JrSXRlbSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dGb3J3YXJkRGlhbG9nKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHNwTW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCB3b3JrSXRlbSxcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICd3b3JrX2l0ZW1fdGl0bGUnLFxuICAgICAgICAgICAgICAgIGhlbHBUZXh0ID0gJ2hlbHBfdGV4dCc7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xuICAgICAgICAgICAgd29ya0l0ZW0gPSB3b3JrSXRlbVNlcnZpY2UuY3JlYXRlV29ya0l0ZW0od29ya0l0ZW1EYXRhKTtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5zaG93Rm9yd2FyZERpYWxvZyh3b3JrSXRlbSwgKCkgPT4ge30sIHRpdGxlLCBoZWxwVGV4dCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnRpdGxlKS50b0VxdWFsKHRpdGxlKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ucmVzb2x2ZS5oZWxwVGV4dCgpKS50b0VxdWFsKGhlbHBUZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Rm9yd2FyZGluZ0hpc3RvcnkoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd29ya0l0ZW1JZCA9ICcxMjM0JyxcbiAgICAgICAgICAgIGhpc3RvcnlVcmwgPSBiYXNlVVJMICsgJy8nICsgd29ya0l0ZW1JZCArICcvb3duZXJIaXN0b3J5JyxcbiAgICAgICAgICAgIGhpc3RvcnkgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c093bmVyOiAnSi1ib2InLFxuICAgICAgICAgICAgICAgICAgICBuZXdPd25lcjogJ0stYm9iJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogMTM5MTYxODM4NTM4MCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDogJ0hleSBLLWJvYiAuLi4gdGFrZSBjYXJlIG9mIHRoaXMnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzT3duZXI6ICdLLWJvYicsXG4gICAgICAgICAgICAgICAgICAgIG5ld093bmVyOiAnRm9vLWJvYicsXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IDEzOTE2MTgzODk5OTksXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdOb3BlIC4uLiBGb28tYm9iIGdldHMgdG8gZGVhbC4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAvLyBBZGQgYSBjdXN0b20gbWF0Y2hlciB0byBjaGVjayBhbiAkaHR0cCBHRVQgcmVzcG9uc2UuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKEN1c3RvbU1hdGNoZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2dldHMgZm9yd2FyZGluZyBoaXN0b3J5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgb3duZXJIaXN0b3J5O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChoaXN0b3J5VXJsKS5yZXNwb25kKDIwMCwgaGlzdG9yeSk7XG4gICAgICAgICAgICBvd25lckhpc3RvcnkgPSB3b3JrSXRlbVNlcnZpY2UuZ2V0Rm9yd2FyZGluZ0hpc3Rvcnkod29ya0l0ZW1JZCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIG93bmVySGlzdG9yeS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWxSZXNwb25zZShoaXN0b3J5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmYWlsU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoJ2NhbGwgZmFpbCcpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChoaXN0b3J5VXJsKS5yZXNwb25kKDUwMCwgJycpO1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldEZvcndhcmRpbmdIaXN0b3J5KHdvcmtJdGVtSWQpLmNhdGNoKGZhaWxTcHkpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGZhaWxTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gd29ya0l0ZW1JZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5nZXRGb3J3YXJkaW5nSGlzdG9yeShudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eURldGFpbHMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIG1ha2UgUkVTVCBjYWxsIHRvIGlkZW50aXR5RGV0YWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHVybCA9IGJhc2VVUkwgKyAnLzEvaWRlbnRpdHlEZXRhaWxzJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldElkZW50aXR5RGV0YWlscygnMScpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2RlbGV0ZVdvcmtJdGVtKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdERlbGV0ZVdvcmtJdGVtKGlkLCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gYmFzZVVSTCArICcvJyArIGlkO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdERFTEVURSh1cmwpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5kZWxldGVXb3JrSXRlbShpZCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdkZWxldGVzIGFuIGFwcHJvdmFsIHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdERlbGV0ZVdvcmtJdGVtKElEMSwgd29ya0l0ZW1EYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdkZWxldGVzIGEgdmlvbGF0aW9uIHJldmlldyB3b3JrIGl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRlc3REZWxldGVXb3JrSXRlbShJRDIsIHdvcmtJdGVtRGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnZGVsZXRlcyBhIG90aGVyIHR5cGUgd29yayBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0ZXN0RGVsZXRlV29ya0l0ZW0oSUQzLCB3b3JrSXRlbURhdGEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmb3J3YXJkV29ya0l0ZW0oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24od29ya0l0ZW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VVUkwgKyAnLycgKyB3b3JrSXRlbUlkICsgJy9mb3J3YXJkJztcbiAgICAgICAgfTtcblxuICAgICAgICBpdCgnc2VuZHMgYSBQT1NUIHJlcXVlc3Qgd2l0aCBjb21tZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoZ2V0VXJsKHdvcmtJdGVtRGF0YS5pZCksIHsgdGFyZ2V0SWRlbnRpdHk6ICc0NTY3JywgY29tbWVudDogJ3JhbmRvbSBjb21tZW50JyB9KVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgJ3tcIm1lc3NhZ2VcIjpudWxsLFwic3VjY2Vzc1wiOnRydWV9Jyk7XG4gICAgICAgICAgICBwcm9taXNlID0gd29ya0l0ZW1TZXJ2aWNlLmZvcndhcmRXb3JrSXRlbSh3b3JrSXRlbURhdGEuaWQsICc0NTY3JywgJ3JhbmRvbSBjb21tZW50Jyk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NlbmRzIGEgUE9TVCByZXF1ZXN0IHdpdGhvdXQgY29tbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGdldFVybCh3b3JrSXRlbURhdGEuaWQpLCB7IHRhcmdldElkZW50aXR5OiAnNDU2NycgfSlcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsICd7XCJtZXNzYWdlXCI6bnVsbCxcInN1Y2Nlc3NcIjp0cnVlfScpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHdvcmtJdGVtU2VydmljZS5mb3J3YXJkV29ya0l0ZW0od29ya0l0ZW1EYXRhLmlkLCAnNDU2NycsIG51bGwpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoZ2V0VXJsKHdvcmtJdGVtRGF0YS5pZCkpLnJlc3BvbmQoNTAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gd29ya0l0ZW1TZXJ2aWNlLmZvcndhcmRXb3JrSXRlbSh3b3JrSXRlbURhdGEuaWQsICc0NTY3JywgbnVsbCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgU3VjY2Vzc1Jlc3VsdCBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGdldFVybCh3b3JrSXRlbURhdGEuaWQpKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgJ3tcIm1lc3NhZ2VcIjpcIkNhbm5vdCBmb3J3YXJkIHdvcmsgaXRlbSB0byBleGlzdGluZyBvd25lclwiLFwic3VjY2Vzc1wiOmZhbHNlfScpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHdvcmtJdGVtU2VydmljZS5mb3J3YXJkV29ya0l0ZW0od29ya0l0ZW1EYXRhLmlkLCAnNDU2NycsICd0aGlzIHNob3VsZCBmYWlsJyk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gd29ya0l0ZW1JZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5mb3J3YXJkV29ya0l0ZW0obnVsbCwgJzQ1NjcnLCBudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyB0YXJnZXRJZGVudGl0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5mb3J3YXJkV29ya0l0ZW0od29ya0l0ZW1EYXRhLmlkLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1N1cHBvcnRlZFdvcmtJdGVtVHlwZSgpJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ21hdGNoZXMgYW4gYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUoYXBwcm92YWxEYXRhLndvcmtJdGVtVHlwZSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ21hdGNoZXMgYSBmb3JtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlKGZvcm1EYXRhLndvcmtJdGVtVHlwZSkpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ21hdGNoZXMgYSB2aW9sYXRpb24gcmV2aWV3JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlKHZpb2xhdGlvblJldmlld1dvcmtJdGVtRGF0YS53b3JrSXRlbVR5cGUpKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpcyBub3QgYSBzdXBwb3J0ZWQgd29yayBpdGVtIHR5cGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUod29ya0l0ZW1EYXRhLndvcmtJdGVtVHlwZSkpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXhjZXB0aW9uIGZvciBudWxsIHdvcmsgaXRlbSB0eXBlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmlzU3VwcG9ydGVkV29ya0l0ZW1UeXBlKG51bGwpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKCknLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gaW5mb01vZGFsIHdoZW4gY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihpbmZvTW9kYWxTZXJ2aWNlLCAnb3BlbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLm9wZW5VblN1cHBvcnRlZFdvcmtJdGVtRGlhbG9nKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGluZm9Nb2RhbFNlcnZpY2Uub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRXb3JrSXRlbVR5cGVUcmFuc2xhdGlvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgdHlwZSBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtVHlwZVRyYW5zbGF0aW9uKG51bGwsICd1aV9mb29iYXInKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBtZXNzYWdlS2V5IGlzIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1UeXBlVHJhbnNsYXRpb24oJ2ZvbycsIG51bGwpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBpZiB0eXBlIGFuZCBtZXNzYWdlS2V5IGFyZSBub3QgbnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbVR5cGVUcmFuc2xhdGlvbignZm9vJywgJ3VpX2Zvb2JhcicpO1xuICAgICAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmF2aWdhdGVUb1dvcmtJdGVtUGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmF2aWdhdGlvblNlcnZpY2U7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9uYXZpZ2F0aW9uU2VydmljZV8pIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgd29ya0l0ZW1JZCBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLm5hdmlnYXRlVG9Xb3JrSXRlbVBhZ2UoKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ25hdmlnYXRlcyB0byB0aGUgdmlld1dvcmtJdGVtIG91dGNvbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5uYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlKCcxMjM0Jyk7XG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICAgICAgICBvdXRjb21lOiAndmlld1dvcmtJdGVtP2lkPTEyMzQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgcmVzZXQgZmxhZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLm5hdmlnYXRlVG9Xb3JrSXRlbVBhZ2UoJzEyMzQnLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgICAgIG91dGNvbWU6ICd2aWV3V29ya0l0ZW0/aWQ9MTIzNCZyZXNldD10cnVlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
