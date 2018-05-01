System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule'], function (_export) {

    /**
     * Tests for the ApprovalItemDirectiveCtrl.
     */
    'use strict';

    var approvalModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('ApprovalItemDirectiveCtrl', function () {
                // This has a lot of tests in it ... and that's ok.
                // jshint maxstatements: 100
                var parentUniquifier = 'Approval0',
                    scope,
                    modal,
                    $controller,
                    $rootScope,
                    approvalService,
                    approvalCommentService,
                    approvalCompletionService,
                    testService,
                    Approval,
                    ApprovalItem,
                    APPROVAL_ITEM_ROLE_COLUMN_CONFIG,
                    APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG,
                    roleColumns,
                    entitlementColumns,
                    ctrl,
                    approvalTestDataService;

                beforeEach(module(approvalModule, testModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 */
                /* jshint maxparams: 10 */
                beforeEach(inject(function (_$rootScope_, _$controller_, _testService_, _approvalService_, _APPROVAL_ITEM_ROLE_COLUMN_CONFIG_, _APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG_, _ColumnConfig_, _Approval_, _ApprovalItem_, _approvalTestDataService_) {

                    // Save the services that we need to use.
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    approvalService = _approvalService_;
                    Approval = _Approval_;
                    ApprovalItem = _ApprovalItem_;
                    approvalTestDataService = _approvalTestDataService_;

                    // Create a mock approvalCompletionService that returns a promise for openCompletionDialog.
                    approvalCompletionService = {
                        openCompletionDialog: jasmine.createSpy().and.callFake(function () {
                            return testService.createResponsePromise();
                        })
                    };

                    approvalCommentService = {
                        openCommentDialog: testService.createPromiseSpy(false)
                    };

                    // Create a mock scope.
                    scope = $rootScope.$new();

                    // Reset the modal.
                    modal = null;

                    APPROVAL_ITEM_ROLE_COLUMN_CONFIG = _APPROVAL_ITEM_ROLE_COLUMN_CONFIG_;
                    APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG = _APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG_;

                    roleColumns = [new _ColumnConfig_({
                        dataIndex: 'roleColumn1'
                    }), new _ColumnConfig_({
                        dataIndex: 'roleColumn2'
                    })];
                    entitlementColumns = [new _ColumnConfig_({
                        dataIndex: 'entitlementColumn1'
                    }), new _ColumnConfig_({
                        dataIndex: 'entitlementColumn1'
                    })];
                }));

                /**
                 * Create an ApprovalItemDirectiveCtrl with some optional overrides.
                 *
                 * @param {int} idx  The index of the item - 0 for a role request, 1 for an
                 *    entitlement request, and 2 for an account request.
                 * @param {Object} [itemOverrides]  Optional object containing properties
                 *    that will override the given item.
                 * @param {Boolean} [explode]  If true, the controller will fail on calls
                 *    to approve/reject/undo/etc...
                 */
                var createController = function (idx, itemOverrides, explode, listIndex) {
                    var approval = approvalTestDataService.createApproval(),
                        item = approval.approvalItems[idx];

                    // If overrides were specified, apply them.
                    if (itemOverrides) {
                        angular.extend(item, itemOverrides);
                    }

                    createControllerWithItem(item, approval, explode, listIndex);
                };

                /**
                 * Create an ApprovalItemDirectiveCtrl with the given approval item and approval.
                 */
                var createControllerWithItem = function (itemData, approvalData, explode, listIndex) {
                    var functionMock, approval, approvalItem, configService;

                    // Create a modal spy.
                    modal = {
                        open: jasmine.createSpy().and.callFake(function () {
                            // Open returns an object with a promise for the result property.
                            return {
                                result: testService.createResponsePromise()
                            };
                        })
                    };

                    // If approval data was given, pull the ApprovalItem out of the actual Approval object.
                    if (approvalData) {
                        approval = new Approval(approvalData);

                        if (itemData) {
                            approval.approvalItems.forEach(function (item) {
                                if (item.id === itemData.id) {
                                    approvalItem = item;
                                }
                            });
                        }
                    } else if (itemData) {
                        // If there was no approval data, just create an ApprovalItem.
                        approvalItem = new ApprovalItem(itemData);
                    }

                    // Put the required stuff into the scope.
                    scope = $rootScope.$new();
                    scope.approvalItem = approvalItem;
                    scope.approval = approval;
                    scope.completionCallback = jasmine.createSpy('completionCallback');
                    scope.index = listIndex;
                    scope.parentUniquifier = parentUniquifier;

                    /**
                     * For most tests, return that we have a number of items remaining
                     * so the completion dialog won't popup.
                     */
                    if (approval) {
                        approval.getRemainingCount = function () {
                            return 3;
                        };
                    }

                    // Create a function that will return a resolved or rejected promise.
                    functionMock = testService.createResponseFunction(explode);

                    // Override the approvalService with mock functions.
                    approvalService.complete = jasmine.createSpy().and.callFake(functionMock);
                    approvalService.approveItem = jasmine.createSpy().and.callFake(functionMock);
                    approvalService.rejectItem = jasmine.createSpy().and.callFake(functionMock);
                    approvalService.undoItem = jasmine.createSpy().and.callFake(functionMock);

                    // Mock out configService
                    configService = {
                        getColumnConfig: jasmine.createSpy().and.callFake(function (key) {
                            if (APPROVAL_ITEM_ROLE_COLUMN_CONFIG === key) {
                                return roleColumns;
                            } else if (APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG === key) {
                                return entitlementColumns;
                            }
                            throw 'Unknown column config for test - ' + key;
                        })
                    };

                    // Create the controller to test with.
                    ctrl = $controller('ApprovalItemDirectiveCtrl', {
                        $scope: scope,
                        spModal: modal,
                        approvalService: approvalService,
                        approvalCommentService: approvalCommentService,
                        configService: configService,
                        approvalCompletionService: approvalCompletionService,
                        APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG: APPROVAL_ITEM_ENTITLEMENT_COLUMN_CONFIG,
                        APPROVAL_ITEM_ROLE_COLUMN_CONFIG: APPROVAL_ITEM_ROLE_COLUMN_CONFIG
                    });
                };

                it('pukes if no approval item is in scope', function () {
                    createControllerWithItem(null, approvalTestDataService.createApproval());
                    expect(ctrl.showDateColumn).toThrow();
                });

                it('hides date column with no sunrise/sunset', function () {
                    createController(2);
                    expect(ctrl.showDateColumn()).toEqual(false);
                });

                it('shows date column with sunrise', function () {
                    createController(1);
                    expect(ctrl.showDateColumn()).toEqual(true);
                });

                it('shows date column with sunset', function () {
                    createController(0);
                    expect(ctrl.showDateColumn()).toEqual(true);
                });

                it('shows date column with if item had sunrise/sunset', function () {
                    createController(3);
                    expect(ctrl.showDateColumn()).toEqual(true);
                });

                describe('getColumnConfigs()', function () {
                    it('return role columns for a role item', function () {
                        createController(0);
                        expect(ctrl.getColumnConfigs()).toEqual(roleColumns);
                    });

                    it('return entitlement columns for a entitlement item', function () {
                        createController(1);
                        expect(ctrl.getColumnConfigs()).toEqual(entitlementColumns);
                    });

                    it('throws if column configs were not properly loaded', function () {
                        createController(1);
                        entitlementColumns = null;
                        expect(function () {
                            ctrl.getColumnConfigs();
                        }).toThrow();
                    });
                });

                it('opens the approval item details dialog', function () {
                    var openArgs;

                    createController(1);

                    // Show the description.
                    ctrl.showItemDetails();

                    // Check that the modal was opened with the expected stuff.
                    expect(modal.open).toHaveBeenCalled();

                    openArgs = modal.open.calls.mostRecent().args[0];

                    expect(openArgs.title).toEqual('ui_my_approvals_item_detail_title');
                    expect(openArgs.controller).toEqual('ApprovalItemDetailDialogCtrl');
                    expect(openArgs.scope).toBe(scope);
                    expect(openArgs.scope.displayDescriptionTab).toBeUndefined();
                });

                describe('approve()', function () {
                    it('cries if an approval is not in scope', function () {
                        // Create an ApprovalItemDirectiveCtrl with an item but without an approval.
                        var item = approvalTestDataService.createApproval().approvalItems[0];
                        createControllerWithItem(item, null, false);
                        expect(function () {
                            ctrl.approve();
                        }).toThrow();
                    });

                    it('approves an item without a decision', function () {
                        // Create an ApprovalItemDirectiveCtrl without a decision.
                        createController(2);

                        // Approve it.  Check that the decision is immediately reflected.
                        ctrl.approve();
                        expect(scope.approvalItem.isApproved()).toEqual(true);

                        // Invoke $apply to cause the promise to be resolved.  Make sure
                        // the decision remains.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                    });

                    it('approves an item with a decision', function () {
                        // The first item starts out as rejected.
                        createController(0);

                        // Approve it.  Check that the decision is immediately reflected.
                        ctrl.approve();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                        expect(scope.approvalItem.isRejected()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Make sure
                        // the decision remains.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                    });

                    it('does not change the decision if the approvalService fails', function () {
                        // Create a controller that will fail when calling the approvalService.
                        // The item starts with a rejected decision.
                        createController(0, null, true);

                        // Approve it - decision changes immediately
                        ctrl.approve();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                        expect(scope.approvalItem.isRejected()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Since this
                        // fails, the decision should revert to what it was.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(false);
                        expect(scope.approvalItem.isRejected()).toEqual(true);
                    });

                    it('does nothing if the item is already approved', function () {
                        // The second item already approved.
                        createController(1);

                        // Approve it.
                        ctrl.approve();

                        // Ensure that the approvalService wasn't called.
                        expect(approvalService.approveItem).not.toHaveBeenCalled();
                    });

                    it('calls notifyObjectNotFoundException on 404', function () {
                        // Create an ApprovalItemDirectiveCtrl without a decision.
                        createController(2);

                        // Make approval fail with a 404.
                        testService.errorResponse.status = 404;
                        approvalService.approveItem = testService.createResponseFunction(true);

                        // Approve it.  Check that the decision is immediately reflected.
                        ctrl.approve();

                        // Invoke $apply to cause the promise to be resolved.
                        $rootScope.$apply();

                        expect(scope.completionCallback).toHaveBeenCalled();
                        expect(scope.completionCallback.calls.mostRecent().args[0].isSuccess()).toEqual(false);
                    });

                    it('shows the expired sunset dialog when appropriate', function () {
                        spyOn(approvalService, 'showExpiredSunsetDialog');

                        // override sunset expired on first item
                        createController(0, { sunsetExpired: true });
                        ctrl.approve();

                        expect(approvalService.showExpiredSunsetDialog).toHaveBeenCalledWith(false);
                    });
                });

                describe('reject()', function () {
                    it('cries if an approval is not in scope', function () {
                        // Create an ApprovalItemDirectiveCtrl with an item but without an approval.
                        var item = approvalTestDataService.createApproval().approvalItems[1];
                        createControllerWithItem(item, null, false);
                        expect(function () {
                            ctrl.reject();
                        }).toThrow();
                    });

                    it('rejects an item without a decision', function () {
                        // Create an ApprovalItemDirectiveCtrl without a decision.
                        createController(2);

                        // Reject it.  Check that the decision is immediately reflected.
                        ctrl.reject();
                        expect(scope.approvalItem.isRejected()).toEqual(true);

                        // Invoke $apply to cause the promise to be resolved.  Make sure
                        // the decision remains.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isRejected()).toEqual(true);
                    });

                    it('rejects an item with a decision', function () {
                        // The second item starts out as approved.
                        createController(1);

                        // Reject it.  Check that the decision is immediately reflected.
                        ctrl.reject();
                        expect(scope.approvalItem.isRejected()).toEqual(true);
                        expect(scope.approvalItem.isApproved()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Make sure
                        // the decision remains.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isRejected()).toEqual(true);
                    });

                    it('does not change the decision if the approvalService fails', function () {
                        // Create a controller that will fail when calling the approvalService.
                        // The item starts with a approved decision.
                        createController(1, null, true);

                        // Reject it - decision changes immediately
                        ctrl.reject();
                        expect(scope.approvalItem.isRejected()).toEqual(true);
                        expect(scope.approvalItem.isApproved()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Since this
                        // fails, the decision should revert to what it was.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                    });

                    it('does nothing if the item is already rejected', function () {
                        // The first item already rejected.
                        createController(0);

                        // Reject it.
                        ctrl.reject();

                        // Ensure that the approvalService wasn't called.
                        expect(approvalService.rejectItem).not.toHaveBeenCalled();
                    });

                    it('calls notifyObjectNotFoundException on 404', function () {
                        // Create an ApprovalItemDirectiveCtrl without a decision.
                        createController(2);

                        // Make rejecting fail with a 404.
                        testService.errorResponse.status = 404;
                        approvalService.rejectItem = testService.createResponseFunction(true);

                        // Reject it.  Check that the decision is immediately reflected.
                        ctrl.reject();

                        // Invoke $apply to cause the promise to be resolved.
                        $rootScope.$apply();

                        expect(scope.completionCallback).toHaveBeenCalled();
                        expect(scope.completionCallback.calls.mostRecent().args[0].isSuccess()).toEqual(false);
                    });
                });

                describe('undo()', function () {
                    it('cries if an approval is not in scope', function () {
                        // Create an ApprovalItemDirectiveCtrl with an item but without an approval.
                        var item = approvalTestDataService.createApproval().approvalItems[0];
                        createControllerWithItem(item, null, false);
                        expect(function () {
                            ctrl.undo();
                        }).toThrow();
                    });

                    it('undoes an item with a decision', function () {
                        // The second item starts out as approved.
                        createController(1);

                        // Undo it.  Check that the decision is immediately reflected.
                        ctrl.undo();
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(scope.approvalItem.isApproved()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Make sure
                        // the decision remains.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                    });

                    it('does not change the decision if the approvalService fails', function () {
                        // Create a controller that will fail when calling the approvalService.
                        // The item starts with a approved decision.
                        createController(1, null, true);

                        // Undo it - decision changes immediately
                        ctrl.undo();
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(scope.approvalItem.isApproved()).toEqual(false);

                        // Invoke $apply to cause the promise to be resolved.  Since this
                        // fails, the decision should revert to what it was.
                        $rootScope.$apply();
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                    });

                    it('does nothing on an item without a decision', function () {
                        // The third item has no decision.
                        createController(2);

                        // Undo it.
                        ctrl.undo();

                        // Ensure that the approvalService wasn't called.
                        expect(approvalService.undoItem).not.toHaveBeenCalled();
                    });

                    it('calls notifyObjectNotFoundException on 404', function () {
                        // Create an ApprovalItemDirectiveCtrl with a decision.
                        createController(0);

                        // Make undo fail with a 404.
                        testService.errorResponse.status = 404;
                        approvalService.undoItem = testService.createResponseFunction(true);

                        // Undo it.  Check that the decision is immediately reflected.
                        ctrl.undo();

                        // Invoke $apply to cause the promise to be resolved.
                        $rootScope.$apply();

                        expect(scope.completionCallback).toHaveBeenCalled();
                        expect(scope.completionCallback.calls.mostRecent().args[0].isSuccess()).toEqual(false);
                    });
                });

                describe('completion', function () {

                    /**
                     * Set the remaining item count for the controller.
                     */
                    var setupRemainingCount = function (count) {
                        scope.approval.getRemainingCount = function () {
                            return count;
                        };
                    };

                    /**
                     * Most of these tests are going to be using the same controller, so
                     * go ahead and set one up.
                     */
                    beforeEach(function () {
                        // Create the controller with an item that doesn't have a decision.
                        createController(2);
                    });

                    it('does not popup the dialog if not approval is incomplete', function () {
                        // Fake like there are more items remaining than there really are.
                        setupRemainingCount(2);

                        // Approve the item and make sure the modal wasn't displayed.
                        ctrl.approve();
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                        expect(approvalCompletionService.openCompletionDialog).not.toHaveBeenCalled();
                    });

                    it('does not popup the dialog if undoing the last decision', function () {
                        // Fake like there are more items remaining than there really are.
                        setupRemainingCount(2);

                        // Approve the item and make sure the modal wasn't displayed.
                        ctrl.approve();
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                        expect(approvalCompletionService.openCompletionDialog).not.toHaveBeenCalled();

                        // Now tell the controller that all decisions are done and undo the
                        // decision.
                        setupRemainingCount(0);
                        ctrl.undo();
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(false);
                        expect(scope.approvalItem.isRejected()).toEqual(false);
                        expect(approvalCompletionService.openCompletionDialog).not.toHaveBeenCalled();
                    });

                    it('pops up the dialog if making the last decision', function () {
                        var args;

                        // Tell the controller that this is the last decision.
                        setupRemainingCount(0);

                        // Approve the item and make sure the modal was displayed.
                        ctrl.approve();
                        $rootScope.$apply();
                        expect(scope.approvalItem.isApproved()).toEqual(true);
                        expect(approvalCompletionService.openCompletionDialog).toHaveBeenCalled();

                        args = approvalCompletionService.openCompletionDialog.calls.mostRecent().args;
                        expect(args[0]).toEqual(scope);
                        expect(args[1]).toEqual(scope.approval);
                    });
                });

                describe('open comment dialog', function () {
                    it('should call the service method', function () {
                        createController(2);
                        ctrl.showApprovalItemComments();
                        expect(approvalCommentService.openCommentDialog).toHaveBeenCalled();
                    });
                });

                describe('open sunrise edit dialog', function () {

                    it('should open the dialog', function () {
                        var modalArgs;
                        createController(0);
                        spyOn(scope.approvalItem, 'allowEditSunsetOnly').and.returnValue(true);
                        ctrl.showSunriseSunsetDialog();
                        expect(modal.open).toHaveBeenCalled();
                        modalArgs = modal.open.calls.mostRecent().args[0];
                        expect(modalArgs.keyboard).toBeFalsy();
                        expect(modalArgs.backdrop).toEqual('static');
                        expect(modalArgs.resolve.sunriseDate().getTime()).toEqual(1391618385380);
                        expect(modalArgs.resolve.sunsetDate().getTime()).toEqual(1392223185380);
                        expect(modalArgs.resolve.sunsetOnly()).toEqual(true);
                    });
                });

                describe('getUniquifier()', function () {
                    it('gets a unique string with the index', function () {
                        createController(0, {}, false, 4);
                        expect(ctrl.getUniquifier()).toEqual(parentUniquifier + 'Item4');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBSzdHOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFQN0IsU0FBUyw2QkFBNkIsWUFBVzs7O2dCQUc3QyxJQUFJLG1CQUFtQjtvQkFDbkI7b0JBQU87b0JBQU87b0JBQWE7b0JBQVk7b0JBQWlCO29CQUN4RDtvQkFBMkI7b0JBQWE7b0JBQVU7b0JBQ2xEO29CQUFrQztvQkFDbEM7b0JBQWE7b0JBQW9CO29CQUFNOztnQkFFM0MsV0FBVyxPQUFPLGdCQUFnQjs7Ozs7O2dCQU1sQyxXQUFXLE9BQU8sVUFBUyxjQUFjLGVBQWUsZUFBZSxtQkFDNUMsb0NBQW9DLDJDQUNwQyxnQkFBZ0IsWUFBWSxnQkFBZ0IsMkJBQTJCOzs7b0JBRzlGLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixjQUFjO29CQUNkLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxlQUFlO29CQUNmLDBCQUEwQjs7O29CQUcxQiw0QkFBNEI7d0JBQ3hCLHNCQUFzQixRQUFRLFlBQVksSUFBSSxTQUFTLFlBQVc7NEJBQzlELE9BQU8sWUFBWTs7OztvQkFJM0IseUJBQXlCO3dCQUNyQixtQkFBbUIsWUFBWSxpQkFBaUI7Ozs7b0JBSXBELFFBQVEsV0FBVzs7O29CQUduQixRQUFROztvQkFFUixtQ0FBbUM7b0JBQ25DLDBDQUEwQzs7b0JBRTFDLGNBQWMsQ0FDVixJQUFJLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWixJQUFJLGVBQWU7d0JBQ2xCLFdBQVc7O29CQUduQixx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QkFHL0QsR0FBRyxrREFBa0QsWUFBVzt3QkFDNUQsSUFBSTs7O3dCQUdKLG9CQUFvQjs7O3dCQUdwQixLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxNQUFNLGFBQWEsY0FBYyxRQUFRO3dCQUNoRCxPQUFPLDBCQUEwQixzQkFBc0I7O3dCQUV2RCxPQUFPLDBCQUEwQixxQkFBcUIsTUFBTSxhQUFhO3dCQUN6RSxPQUFPLEtBQUssSUFBSSxRQUFRO3dCQUN4QixPQUFPLEtBQUssSUFBSSxRQUFRLE1BQU07Ozs7Z0JBSXRDLFNBQVMsdUJBQXVCLFlBQVc7b0JBQ3ZDLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLGlCQUFpQjt3QkFDakIsS0FBSzt3QkFDTCxPQUFPLHVCQUF1QixtQkFBbUI7Ozs7Z0JBSXpELFNBQVMsNEJBQTRCLFlBQVc7O29CQUU1QyxHQUFHLDBCQUEwQixZQUFXO3dCQUNwQyxJQUFJO3dCQUNKLGlCQUFpQjt3QkFDakIsTUFBTSxNQUFNLGNBQWMsdUJBQXVCLElBQUksWUFBWTt3QkFDakUsS0FBSzt3QkFDTCxPQUFPLE1BQU0sTUFBTTt3QkFDbkIsWUFBWSxNQUFNLEtBQUssTUFBTSxhQUFhLEtBQUs7d0JBQy9DLE9BQU8sVUFBVSxVQUFVO3dCQUMzQixPQUFPLFVBQVUsVUFBVSxRQUFRO3dCQUNuQyxPQUFPLFVBQVUsUUFBUSxjQUFjLFdBQVcsUUFBUTt3QkFDMUQsT0FBTyxVQUFVLFFBQVEsYUFBYSxXQUFXLFFBQVE7d0JBQ3pELE9BQU8sVUFBVSxRQUFRLGNBQWMsUUFBUTs7OztnQkFJdkQsU0FBUyxtQkFBbUIsWUFBVztvQkFDbkMsR0FBSSx1Q0FBdUMsWUFBVzt3QkFDbEQsaUJBQWlCLEdBQUcsSUFBSSxPQUFPO3dCQUMvQixPQUFPLEtBQUssaUJBQWlCLFFBQVEsbUJBQW1COzs7Ozs7R0FxQmpFIiwiZmlsZSI6ImFwcHJvdmFsL0FwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYXBwcm92YWxNb2R1bGUgZnJvbSAnYXBwcm92YWwvQXBwcm92YWxNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQXBwcm92YWxJdGVtRGlyZWN0aXZlQ3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBcHByb3ZhbEl0ZW1EaXJlY3RpdmVDdHJsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBUaGlzIGhhcyBhIGxvdCBvZiB0ZXN0cyBpbiBpdCAuLi4gYW5kIHRoYXQncyBvay5cclxuICAgIC8vIGpzaGludCBtYXhzdGF0ZW1lbnRzOiAxMDBcclxuICAgIHZhciBwYXJlbnRVbmlxdWlmaWVyID0gJ0FwcHJvdmFsMCcsXHJcbiAgICAgICAgc2NvcGUsIG1vZGFsLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgYXBwcm92YWxTZXJ2aWNlLCBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2UsIHRlc3RTZXJ2aWNlLCBBcHByb3ZhbCwgQXBwcm92YWxJdGVtLFxyXG4gICAgICAgIEFQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHLCBBUFBST1ZBTF9JVEVNX0VOVElUTEVNRU5UX0NPTFVNTl9DT05GSUcsXHJcbiAgICAgICAgcm9sZUNvbHVtbnMsIGVudGl0bGVtZW50Q29sdW1ucywgY3RybCwgYXBwcm92YWxUZXN0RGF0YVNlcnZpY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXBwcm92YWxNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHRoZSBtb2NrcyBmb3Igb3VyIHRlc3RzIC0gYSBzY29wZSBhbmQgdGhlIGNvbnRyb2xsZXIuXHJcbiAgICAgKi9cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEwICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29udHJvbGxlcl8sIF90ZXN0U2VydmljZV8sIF9hcHByb3ZhbFNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0FQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHXywgX0FQUFJPVkFMX0lURU1fRU5USVRMRU1FTlRfQ09MVU1OX0NPTkZJR18sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ29sdW1uQ29uZmlnXywgX0FwcHJvdmFsXywgX0FwcHJvdmFsSXRlbV8sIF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV8pIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMgdGhhdCB3ZSBuZWVkIHRvIHVzZS5cclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgYXBwcm92YWxTZXJ2aWNlID0gX2FwcHJvdmFsU2VydmljZV87XHJcbiAgICAgICAgQXBwcm92YWwgPSBfQXBwcm92YWxfO1xyXG4gICAgICAgIEFwcHJvdmFsSXRlbSA9IF9BcHByb3ZhbEl0ZW1fO1xyXG4gICAgICAgIGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlID0gX2FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbW9jayBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlIHRoYXQgcmV0dXJucyBhIHByb21pc2UgZm9yIG9wZW5Db21wbGV0aW9uRGlhbG9nLlxyXG4gICAgICAgIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIG9wZW5Db21wbGV0aW9uRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVSZXNwb25zZVByb21pc2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBvcGVuQ29tbWVudERpYWxvZzogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxyXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBtb2RhbC5cclxuICAgICAgICBtb2RhbCA9IG51bGw7XHJcblxyXG4gICAgICAgIEFQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHID0gX0FQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHXztcclxuICAgICAgICBBUFBST1ZBTF9JVEVNX0VOVElUTEVNRU5UX0NPTFVNTl9DT05GSUcgPSBfQVBQUk9WQUxfSVRFTV9FTlRJVExFTUVOVF9DT0xVTU5fQ09ORklHXztcclxuXHJcbiAgICAgICAgcm9sZUNvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBfQ29sdW1uQ29uZmlnXyh7XHJcbiAgICAgICAgICAgICAgICBkYXRhSW5kZXg6ICdyb2xlQ29sdW1uMSdcclxuICAgICAgICAgICAgfSksbmV3IF9Db2x1bW5Db25maWdfKHtcclxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ3JvbGVDb2x1bW4yJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZW50aXRsZW1lbnRDb2x1bW5zID0gW1xyXG4gICAgICAgICAgICBuZXcgX0NvbHVtbkNvbmZpZ18oe1xyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZW50aXRsZW1lbnRDb2x1bW4xJ1xyXG4gICAgICAgICAgICB9KSxuZXcgX0NvbHVtbkNvbmZpZ18oe1xyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZW50aXRsZW1lbnRDb2x1bW4xJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIF07XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gQXBwcm92YWxJdGVtRGlyZWN0aXZlQ3RybCB3aXRoIHNvbWUgb3B0aW9uYWwgb3ZlcnJpZGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7aW50fSBpZHggIFRoZSBpbmRleCBvZiB0aGUgaXRlbSAtIDAgZm9yIGEgcm9sZSByZXF1ZXN0LCAxIGZvciBhblxyXG4gICAgICogICAgZW50aXRsZW1lbnQgcmVxdWVzdCwgYW5kIDIgZm9yIGFuIGFjY291bnQgcmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbaXRlbU92ZXJyaWRlc10gIE9wdGlvbmFsIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXNcclxuICAgICAqICAgIHRoYXQgd2lsbCBvdmVycmlkZSB0aGUgZ2l2ZW4gaXRlbS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2V4cGxvZGVdICBJZiB0cnVlLCB0aGUgY29udHJvbGxlciB3aWxsIGZhaWwgb24gY2FsbHNcclxuICAgICAqICAgIHRvIGFwcHJvdmUvcmVqZWN0L3VuZG8vZXRjLi4uXHJcbiAgICAgKi9cclxuICAgIHZhciBjcmVhdGVDb250cm9sbGVyID0gZnVuY3Rpb24oaWR4LCBpdGVtT3ZlcnJpZGVzLCBleHBsb2RlLCBsaXN0SW5kZXgpIHtcclxuICAgICAgICB2YXIgYXBwcm92YWwgPSBhcHByb3ZhbFRlc3REYXRhU2VydmljZS5jcmVhdGVBcHByb3ZhbCgpLFxyXG4gICAgICAgICAgICBpdGVtID0gYXBwcm92YWwuYXBwcm92YWxJdGVtc1tpZHhdO1xyXG5cclxuICAgICAgICAvLyBJZiBvdmVycmlkZXMgd2VyZSBzcGVjaWZpZWQsIGFwcGx5IHRoZW0uXHJcbiAgICAgICAgaWYgKGl0ZW1PdmVycmlkZXMpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoaXRlbSwgaXRlbU92ZXJyaWRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDb250cm9sbGVyV2l0aEl0ZW0oaXRlbSwgYXBwcm92YWwsIGV4cGxvZGUsIGxpc3RJbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIEFwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmwgd2l0aCB0aGUgZ2l2ZW4gYXBwcm92YWwgaXRlbSBhbmQgYXBwcm92YWwuXHJcbiAgICAgKi9cclxuICAgIHZhciBjcmVhdGVDb250cm9sbGVyV2l0aEl0ZW0gPSBmdW5jdGlvbihpdGVtRGF0YSwgYXBwcm92YWxEYXRhLCBleHBsb2RlLCBsaXN0SW5kZXgpIHtcclxuICAgICAgICB2YXIgZnVuY3Rpb25Nb2NrLCBhcHByb3ZhbCwgYXBwcm92YWxJdGVtLCBjb25maWdTZXJ2aWNlO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2RhbCBzcHkuXHJcbiAgICAgICAgbW9kYWwgPSB7XHJcbiAgICAgICAgICAgIG9wZW46IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gT3BlbiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgcHJvbWlzZSBmb3IgdGhlIHJlc3VsdCBwcm9wZXJ0eS5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0ZXN0U2VydmljZS5jcmVhdGVSZXNwb25zZVByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBJZiBhcHByb3ZhbCBkYXRhIHdhcyBnaXZlbiwgcHVsbCB0aGUgQXBwcm92YWxJdGVtIG91dCBvZiB0aGUgYWN0dWFsIEFwcHJvdmFsIG9iamVjdC5cclxuICAgICAgICBpZiAoYXBwcm92YWxEYXRhKSB7XHJcbiAgICAgICAgICAgIGFwcHJvdmFsID0gbmV3IEFwcHJvdmFsKGFwcHJvdmFsRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFwcHJvdmFsLmFwcHJvdmFsSXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGl0ZW1EYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXRlbURhdGEpIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgd2FzIG5vIGFwcHJvdmFsIGRhdGEsIGp1c3QgY3JlYXRlIGFuIEFwcHJvdmFsSXRlbS5cclxuICAgICAgICAgICAgYXBwcm92YWxJdGVtID0gbmV3IEFwcHJvdmFsSXRlbShpdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQdXQgdGhlIHJlcXVpcmVkIHN0dWZmIGludG8gdGhlIHNjb3BlLlxyXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuYXBwcm92YWxJdGVtID0gYXBwcm92YWxJdGVtO1xyXG4gICAgICAgIHNjb3BlLmFwcHJvdmFsID0gYXBwcm92YWw7XHJcbiAgICAgICAgc2NvcGUuY29tcGxldGlvbkNhbGxiYWNrID0gamFzbWluZS5jcmVhdGVTcHkoJ2NvbXBsZXRpb25DYWxsYmFjaycpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gbGlzdEluZGV4O1xyXG4gICAgICAgIHNjb3BlLnBhcmVudFVuaXF1aWZpZXIgPSBwYXJlbnRVbmlxdWlmaWVyO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGb3IgbW9zdCB0ZXN0cywgcmV0dXJuIHRoYXQgd2UgaGF2ZSBhIG51bWJlciBvZiBpdGVtcyByZW1haW5pbmdcclxuICAgICAgICAgKiBzbyB0aGUgY29tcGxldGlvbiBkaWFsb2cgd29uJ3QgcG9wdXAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGFwcHJvdmFsKSB7XHJcbiAgICAgICAgICAgIGFwcHJvdmFsLmdldFJlbWFpbmluZ0NvdW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgd2lsbCByZXR1cm4gYSByZXNvbHZlZCBvciByZWplY3RlZCBwcm9taXNlLlxyXG4gICAgICAgIGZ1bmN0aW9uTW9jayA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlRnVuY3Rpb24oZXhwbG9kZSk7XHJcblxyXG4gICAgICAgIC8vIE92ZXJyaWRlIHRoZSBhcHByb3ZhbFNlcnZpY2Ugd2l0aCBtb2NrIGZ1bmN0aW9ucy5cclxuICAgICAgICBhcHByb3ZhbFNlcnZpY2UuY29tcGxldGUgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbk1vY2spO1xyXG4gICAgICAgIGFwcHJvdmFsU2VydmljZS5hcHByb3ZlSXRlbSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uTW9jayk7XHJcbiAgICAgICAgYXBwcm92YWxTZXJ2aWNlLnJlamVjdEl0ZW0gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbk1vY2spO1xyXG4gICAgICAgIGFwcHJvdmFsU2VydmljZS51bmRvSXRlbSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uTW9jayk7XHJcblxyXG4gICAgICAgIC8vIE1vY2sgb3V0IGNvbmZpZ1NlcnZpY2VcclxuICAgICAgICBjb25maWdTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBnZXRDb2x1bW5Db25maWc6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm9sZUNvbHVtbnM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBUFBST1ZBTF9JVEVNX0VOVElUTEVNRU5UX0NPTFVNTl9DT05GSUcgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdGxlbWVudENvbHVtbnM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnVW5rbm93biBjb2x1bW4gY29uZmlnIGZvciB0ZXN0IC0gJyArIGtleTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQXBwcm92YWxJdGVtRGlyZWN0aXZlQ3RybCcsIHtcclxuICAgICAgICAgICAgJHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgc3BNb2RhbDogbW9kYWwsXHJcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZTogYXBwcm92YWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlOiBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBjb25maWdTZXJ2aWNlLFxyXG4gICAgICAgICAgICBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlOiBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICAgICBBUFBST1ZBTF9JVEVNX0VOVElUTEVNRU5UX0NPTFVNTl9DT05GSUc6IEFQUFJPVkFMX0lURU1fRU5USVRMRU1FTlRfQ09MVU1OX0NPTkZJRyxcclxuICAgICAgICAgICAgQVBQUk9WQUxfSVRFTV9ST0xFX0NPTFVNTl9DT05GSUc6IEFQUFJPVkFMX0lURU1fUk9MRV9DT0xVTU5fQ09ORklHXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBpdCgncHVrZXMgaWYgbm8gYXBwcm92YWwgaXRlbSBpcyBpbiBzY29wZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXJXaXRoSXRlbShudWxsLCBhcHByb3ZhbFRlc3REYXRhU2VydmljZS5jcmVhdGVBcHByb3ZhbCgpKTtcclxuICAgICAgICBleHBlY3QoY3RybC5zaG93RGF0ZUNvbHVtbikudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2hpZGVzIGRhdGUgY29sdW1uIHdpdGggbm8gc3VucmlzZS9zdW5zZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjcmVhdGVDb250cm9sbGVyKDIpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLnNob3dEYXRlQ29sdW1uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIGRhdGUgY29sdW1uIHdpdGggc3VucmlzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMSk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RhdGVDb2x1bW4oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBkYXRlIGNvbHVtbiB3aXRoIHN1bnNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMCk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RhdGVDb2x1bW4oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyBkYXRlIGNvbHVtbiB3aXRoIGlmIGl0ZW0gaGFkIHN1bnJpc2Uvc3Vuc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigzKTtcclxuICAgICAgICBleHBlY3QoY3RybC5zaG93RGF0ZUNvbHVtbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldENvbHVtbkNvbmZpZ3MoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm4gcm9sZSBjb2x1bW5zIGZvciBhIHJvbGUgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDApO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDb2x1bW5Db25maWdzKCkpLnRvRXF1YWwocm9sZUNvbHVtbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJuIGVudGl0bGVtZW50IGNvbHVtbnMgZm9yIGEgZW50aXRsZW1lbnQgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDb2x1bW5Db25maWdzKCkpLnRvRXF1YWwoZW50aXRsZW1lbnRDb2x1bW5zKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBjb2x1bW4gY29uZmlncyB3ZXJlIG5vdCBwcm9wZXJseSBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigxKTtcclxuICAgICAgICAgICAgZW50aXRsZW1lbnRDb2x1bW5zID0gbnVsbDtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge2N0cmwuZ2V0Q29sdW1uQ29uZmlncygpO30pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdvcGVucyB0aGUgYXBwcm92YWwgaXRlbSBkZXRhaWxzIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvcGVuQXJncztcclxuXHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigxKTtcclxuXHJcbiAgICAgICAgLy8gU2hvdyB0aGUgZGVzY3JpcHRpb24uXHJcbiAgICAgICAgY3RybC5zaG93SXRlbURldGFpbHMoKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgbW9kYWwgd2FzIG9wZW5lZCB3aXRoIHRoZSBleHBlY3RlZCBzdHVmZi5cclxuICAgICAgICBleHBlY3QobW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICBvcGVuQXJncyA9IG1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcblxyXG4gICAgICAgIGV4cGVjdChvcGVuQXJncy50aXRsZSkudG9FcXVhbCgndWlfbXlfYXBwcm92YWxzX2l0ZW1fZGV0YWlsX3RpdGxlJyk7XHJcbiAgICAgICAgZXhwZWN0KG9wZW5BcmdzLmNvbnRyb2xsZXIpLnRvRXF1YWwoJ0FwcHJvdmFsSXRlbURldGFpbERpYWxvZ0N0cmwnKTtcclxuICAgICAgICBleHBlY3Qob3BlbkFyZ3Muc2NvcGUpLnRvQmUoc2NvcGUpO1xyXG4gICAgICAgIGV4cGVjdChvcGVuQXJncy5zY29wZS5kaXNwbGF5RGVzY3JpcHRpb25UYWIpLnRvQmVVbmRlZmluZWQoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgnYXBwcm92ZSgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ2NyaWVzIGlmIGFuIGFwcHJvdmFsIGlzIG5vdCBpbiBzY29wZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gQXBwcm92YWxJdGVtRGlyZWN0aXZlQ3RybCB3aXRoIGFuIGl0ZW0gYnV0IHdpdGhvdXQgYW4gYXBwcm92YWwuXHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXBwcm92YWxUZXN0RGF0YVNlcnZpY2UuY3JlYXRlQXBwcm92YWwoKS5hcHByb3ZhbEl0ZW1zWzBdO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyV2l0aEl0ZW0oaXRlbSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGN0cmwuYXBwcm92ZSgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhcHByb3ZlcyBhbiBpdGVtIHdpdGhvdXQgYSBkZWNpc2lvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYW4gQXBwcm92YWxJdGVtRGlyZWN0aXZlQ3RybCB3aXRob3V0IGEgZGVjaXNpb24uXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMik7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHByb3ZlIGl0LiAgQ2hlY2sgdGhhdCB0aGUgZGVjaXNpb24gaXMgaW1tZWRpYXRlbHkgcmVmbGVjdGVkLlxyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgJGFwcGx5IHRvIGNhdXNlIHRoZSBwcm9taXNlIHRvIGJlIHJlc29sdmVkLiAgTWFrZSBzdXJlXHJcbiAgICAgICAgICAgIC8vIHRoZSBkZWNpc2lvbiByZW1haW5zLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FwcHJvdmVzIGFuIGl0ZW0gd2l0aCBhIGRlY2lzaW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBmaXJzdCBpdGVtIHN0YXJ0cyBvdXQgYXMgcmVqZWN0ZWQuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHByb3ZlIGl0LiAgQ2hlY2sgdGhhdCB0aGUgZGVjaXNpb24gaXMgaW1tZWRpYXRlbHkgcmVmbGVjdGVkLlxyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNSZWplY3RlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSAkYXBwbHkgdG8gY2F1c2UgdGhlIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQuICBNYWtlIHN1cmVcclxuICAgICAgICAgICAgLy8gdGhlIGRlY2lzaW9uIHJlbWFpbnMuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNBcHByb3ZlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgY2hhbmdlIHRoZSBkZWNpc2lvbiBpZiB0aGUgYXBwcm92YWxTZXJ2aWNlIGZhaWxzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNvbnRyb2xsZXIgdGhhdCB3aWxsIGZhaWwgd2hlbiBjYWxsaW5nIHRoZSBhcHByb3ZhbFNlcnZpY2UuXHJcbiAgICAgICAgICAgIC8vIFRoZSBpdGVtIHN0YXJ0cyB3aXRoIGEgcmVqZWN0ZWQgZGVjaXNpb24uXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMCwgbnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHByb3ZlIGl0IC0gZGVjaXNpb24gY2hhbmdlcyBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNSZWplY3RlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSAkYXBwbHkgdG8gY2F1c2UgdGhlIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQuICBTaW5jZSB0aGlzXHJcbiAgICAgICAgICAgIC8vIGZhaWxzLCB0aGUgZGVjaXNpb24gc2hvdWxkIHJldmVydCB0byB3aGF0IGl0IHdhcy5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiB0aGUgaXRlbSBpcyBhbHJlYWR5IGFwcHJvdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBzZWNvbmQgaXRlbSBhbHJlYWR5IGFwcHJvdmVkLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwcm92ZSBpdC5cclxuICAgICAgICAgICAgY3RybC5hcHByb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgYXBwcm92YWxTZXJ2aWNlIHdhc24ndCBjYWxsZWQuXHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUl0ZW0pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyBub3RpZnlPYmplY3ROb3RGb3VuZEV4Y2VwdGlvbiBvbiA0MDQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEFwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmwgd2l0aG91dCBhIGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBhcHByb3ZhbCBmYWlsIHdpdGggYSA0MDQuXHJcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmVycm9yUmVzcG9uc2Uuc3RhdHVzID0gNDA0O1xyXG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUl0ZW0gPSB0ZXN0U2VydmljZS5jcmVhdGVSZXNwb25zZUZ1bmN0aW9uKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwcm92ZSBpdC4gIENoZWNrIHRoYXQgdGhlIGRlY2lzaW9uIGlzIGltbWVkaWF0ZWx5IHJlZmxlY3RlZC5cclxuICAgICAgICAgICAgY3RybC5hcHByb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgJGFwcGx5IHRvIGNhdXNlIHRoZSBwcm9taXNlIHRvIGJlIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmNvbXBsZXRpb25DYWxsYmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuY29tcGxldGlvbkNhbGxiYWNrLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmlzU3VjY2VzcygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBleHBpcmVkIHN1bnNldCBkaWFsb2cgd2hlbiBhcHByb3ByaWF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oYXBwcm92YWxTZXJ2aWNlLCAnc2hvd0V4cGlyZWRTdW5zZXREaWFsb2cnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIHN1bnNldCBleHBpcmVkIG9uIGZpcnN0IGl0ZW1cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigwLCB7IHN1bnNldEV4cGlyZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGN0cmwuYXBwcm92ZSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5zaG93RXhwaXJlZFN1bnNldERpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdyZWplY3QoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdjcmllcyBpZiBhbiBhcHByb3ZhbCBpcyBub3QgaW4gc2NvcGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEFwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmwgd2l0aCBhbiBpdGVtIGJ1dCB3aXRob3V0IGFuIGFwcHJvdmFsLlxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlLmNyZWF0ZUFwcHJvdmFsKCkuYXBwcm92YWxJdGVtc1sxXTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcldpdGhJdGVtKGl0ZW0sIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjdHJsLnJlamVjdCgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZWplY3RzIGFuIGl0ZW0gd2l0aG91dCBhIGRlY2lzaW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBBcHByb3ZhbEl0ZW1EaXJlY3RpdmVDdHJsIHdpdGhvdXQgYSBkZWNpc2lvbi5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpdC4gIENoZWNrIHRoYXQgdGhlIGRlY2lzaW9uIGlzIGltbWVkaWF0ZWx5IHJlZmxlY3RlZC5cclxuICAgICAgICAgICAgY3RybC5yZWplY3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgJGFwcGx5IHRvIGNhdXNlIHRoZSBwcm9taXNlIHRvIGJlIHJlc29sdmVkLiAgTWFrZSBzdXJlXHJcbiAgICAgICAgICAgIC8vIHRoZSBkZWNpc2lvbiByZW1haW5zLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlamVjdHMgYW4gaXRlbSB3aXRoIGEgZGVjaXNpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVGhlIHNlY29uZCBpdGVtIHN0YXJ0cyBvdXQgYXMgYXBwcm92ZWQuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWplY3QgaXQuICBDaGVjayB0aGF0IHRoZSBkZWNpc2lvbiBpcyBpbW1lZGlhdGVseSByZWZsZWN0ZWQuXHJcbiAgICAgICAgICAgIGN0cmwucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNSZWplY3RlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgJGFwcGx5IHRvIGNhdXNlIHRoZSBwcm9taXNlIHRvIGJlIHJlc29sdmVkLiAgTWFrZSBzdXJlXHJcbiAgICAgICAgICAgIC8vIHRoZSBkZWNpc2lvbiByZW1haW5zLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IGNoYW5nZSB0aGUgZGVjaXNpb24gaWYgdGhlIGFwcHJvdmFsU2VydmljZSBmYWlscycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBjb250cm9sbGVyIHRoYXQgd2lsbCBmYWlsIHdoZW4gY2FsbGluZyB0aGUgYXBwcm92YWxTZXJ2aWNlLlxyXG4gICAgICAgICAgICAvLyBUaGUgaXRlbSBzdGFydHMgd2l0aCBhIGFwcHJvdmVkIGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDEsIG51bGwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVqZWN0IGl0IC0gZGVjaXNpb24gY2hhbmdlcyBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICBjdHJsLnJlamVjdCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gSW52b2tlICRhcHBseSB0byBjYXVzZSB0aGUgcHJvbWlzZSB0byBiZSByZXNvbHZlZC4gIFNpbmNlIHRoaXNcclxuICAgICAgICAgICAgLy8gZmFpbHMsIHRoZSBkZWNpc2lvbiBzaG91bGQgcmV2ZXJ0IHRvIHdoYXQgaXQgd2FzLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNBcHByb3ZlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBpdGVtIGlzIGFscmVhZHkgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGZpcnN0IGl0ZW0gYWxyZWFkeSByZWplY3RlZC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpdC5cclxuICAgICAgICAgICAgY3RybC5yZWplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBhcHByb3ZhbFNlcnZpY2Ugd2Fzbid0IGNhbGxlZC5cclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5yZWplY3RJdGVtKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgbm90aWZ5T2JqZWN0Tm90Rm91bmRFeGNlcHRpb24gb24gNDA0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBBcHByb3ZhbEl0ZW1EaXJlY3RpdmVDdHJsIHdpdGhvdXQgYSBkZWNpc2lvbi5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgcmVqZWN0aW5nIGZhaWwgd2l0aCBhIDQwNC5cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuZXJyb3JSZXNwb25zZS5zdGF0dXMgPSA0MDQ7XHJcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5yZWplY3RJdGVtID0gdGVzdFNlcnZpY2UuY3JlYXRlUmVzcG9uc2VGdW5jdGlvbih0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpdC4gIENoZWNrIHRoYXQgdGhlIGRlY2lzaW9uIGlzIGltbWVkaWF0ZWx5IHJlZmxlY3RlZC5cclxuICAgICAgICAgICAgY3RybC5yZWplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSAkYXBwbHkgdG8gY2F1c2UgdGhlIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuY29tcGxldGlvbkNhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5jb21wbGV0aW9uQ2FsbGJhY2suY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uaXNTdWNjZXNzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCd1bmRvKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnY3JpZXMgaWYgYW4gYXBwcm92YWwgaXMgbm90IGluIHNjb3BlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBBcHByb3ZhbEl0ZW1EaXJlY3RpdmVDdHJsIHdpdGggYW4gaXRlbSBidXQgd2l0aG91dCBhbiBhcHByb3ZhbC5cclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhcHByb3ZhbFRlc3REYXRhU2VydmljZS5jcmVhdGVBcHByb3ZhbCgpLmFwcHJvdmFsSXRlbXNbMF07XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXJXaXRoSXRlbShpdGVtLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC51bmRvKCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VuZG9lcyBhbiBpdGVtIHdpdGggYSBkZWNpc2lvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBUaGUgc2Vjb25kIGl0ZW0gc3RhcnRzIG91dCBhcyBhcHByb3ZlZC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVuZG8gaXQuICBDaGVjayB0aGF0IHRoZSBkZWNpc2lvbiBpcyBpbW1lZGlhdGVseSByZWZsZWN0ZWQuXHJcbiAgICAgICAgICAgIGN0cmwudW5kbygpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNBcHByb3ZlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSAkYXBwbHkgdG8gY2F1c2UgdGhlIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQuICBNYWtlIHN1cmVcclxuICAgICAgICAgICAgLy8gdGhlIGRlY2lzaW9uIHJlbWFpbnMuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNSZWplY3RlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgY2hhbmdlIHRoZSBkZWNpc2lvbiBpZiB0aGUgYXBwcm92YWxTZXJ2aWNlIGZhaWxzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNvbnRyb2xsZXIgdGhhdCB3aWxsIGZhaWwgd2hlbiBjYWxsaW5nIHRoZSBhcHByb3ZhbFNlcnZpY2UuXHJcbiAgICAgICAgICAgIC8vIFRoZSBpdGVtIHN0YXJ0cyB3aXRoIGEgYXBwcm92ZWQgZGVjaXNpb24uXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoMSwgbnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVbmRvIGl0IC0gZGVjaXNpb24gY2hhbmdlcyBpbW1lZGlhdGVseVxyXG4gICAgICAgICAgICBjdHJsLnVuZG8oKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgJGFwcGx5IHRvIGNhdXNlIHRoZSBwcm9taXNlIHRvIGJlIHJlc29sdmVkLiAgU2luY2UgdGhpc1xyXG4gICAgICAgICAgICAvLyBmYWlscywgdGhlIGRlY2lzaW9uIHNob3VsZCByZXZlcnQgdG8gd2hhdCBpdCB3YXMuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5hcHByb3ZhbEl0ZW0uaXNSZWplY3RlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgb24gYW4gaXRlbSB3aXRob3V0IGEgZGVjaXNpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVGhlIHRoaXJkIGl0ZW0gaGFzIG5vIGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gVW5kbyBpdC5cclxuICAgICAgICAgICAgY3RybC51bmRvKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgYXBwcm92YWxTZXJ2aWNlIHdhc24ndCBjYWxsZWQuXHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UudW5kb0l0ZW0pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyBub3RpZnlPYmplY3ROb3RGb3VuZEV4Y2VwdGlvbiBvbiA0MDQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIEFwcHJvdmFsSXRlbURpcmVjdGl2ZUN0cmwgd2l0aCBhIGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDApO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSB1bmRvIGZhaWwgd2l0aCBhIDQwNC5cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuZXJyb3JSZXNwb25zZS5zdGF0dXMgPSA0MDQ7XHJcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS51bmRvSXRlbSA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlRnVuY3Rpb24odHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBVbmRvIGl0LiAgQ2hlY2sgdGhhdCB0aGUgZGVjaXNpb24gaXMgaW1tZWRpYXRlbHkgcmVmbGVjdGVkLlxyXG4gICAgICAgICAgICBjdHJsLnVuZG8oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSAkYXBwbHkgdG8gY2F1c2UgdGhlIHByb21pc2UgdG8gYmUgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuY29tcGxldGlvbkNhbGxiYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5jb21wbGV0aW9uQ2FsbGJhY2suY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uaXNTdWNjZXNzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb21wbGV0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB0aGUgcmVtYWluaW5nIGl0ZW0gY291bnQgZm9yIHRoZSBjb250cm9sbGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBzZXR1cFJlbWFpbmluZ0NvdW50ID0gZnVuY3Rpb24oY291bnQpIHtcclxuICAgICAgICAgICAgc2NvcGUuYXBwcm92YWwuZ2V0UmVtYWluaW5nQ291bnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb3VudDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb3N0IG9mIHRoZXNlIHRlc3RzIGFyZSBnb2luZyB0byBiZSB1c2luZyB0aGUgc2FtZSBjb250cm9sbGVyLCBzb1xyXG4gICAgICAgICAqIGdvIGFoZWFkIGFuZCBzZXQgb25lIHVwLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB3aXRoIGFuIGl0ZW0gdGhhdCBkb2Vzbid0IGhhdmUgYSBkZWNpc2lvbi5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHBvcHVwIHRoZSBkaWFsb2cgaWYgbm90IGFwcHJvdmFsIGlzIGluY29tcGxldGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gRmFrZSBsaWtlIHRoZXJlIGFyZSBtb3JlIGl0ZW1zIHJlbWFpbmluZyB0aGFuIHRoZXJlIHJlYWxseSBhcmUuXHJcbiAgICAgICAgICAgIHNldHVwUmVtYWluaW5nQ291bnQoMik7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHByb3ZlIHRoZSBpdGVtIGFuZCBtYWtlIHN1cmUgdGhlIG1vZGFsIHdhc24ndCBkaXNwbGF5ZWQuXHJcbiAgICAgICAgICAgIGN0cmwuYXBwcm92ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2Uub3BlbkNvbXBsZXRpb25EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBwb3B1cCB0aGUgZGlhbG9nIGlmIHVuZG9pbmcgdGhlIGxhc3QgZGVjaXNpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gRmFrZSBsaWtlIHRoZXJlIGFyZSBtb3JlIGl0ZW1zIHJlbWFpbmluZyB0aGFuIHRoZXJlIHJlYWxseSBhcmUuXHJcbiAgICAgICAgICAgIHNldHVwUmVtYWluaW5nQ291bnQoMik7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHByb3ZlIHRoZSBpdGVtIGFuZCBtYWtlIHN1cmUgdGhlIG1vZGFsIHdhc24ndCBkaXNwbGF5ZWQuXHJcbiAgICAgICAgICAgIGN0cmwuYXBwcm92ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2Uub3BlbkNvbXBsZXRpb25EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3cgdGVsbCB0aGUgY29udHJvbGxlciB0aGF0IGFsbCBkZWNpc2lvbnMgYXJlIGRvbmUgYW5kIHVuZG8gdGhlXHJcbiAgICAgICAgICAgIC8vIGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBzZXR1cFJlbWFpbmluZ0NvdW50KDApO1xyXG4gICAgICAgICAgICBjdHJsLnVuZG8oKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWxJdGVtLmlzUmVqZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLm9wZW5Db21wbGV0aW9uRGlhbG9nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncG9wcyB1cCB0aGUgZGlhbG9nIGlmIG1ha2luZyB0aGUgbGFzdCBkZWNpc2lvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJncztcclxuXHJcbiAgICAgICAgICAgIC8vIFRlbGwgdGhlIGNvbnRyb2xsZXIgdGhhdCB0aGlzIGlzIHRoZSBsYXN0IGRlY2lzaW9uLlxyXG4gICAgICAgICAgICBzZXR1cFJlbWFpbmluZ0NvdW50KDApO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwcm92ZSB0aGUgaXRlbSBhbmQgbWFrZSBzdXJlIHRoZSBtb2RhbCB3YXMgZGlzcGxheWVkLlxyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmFwcHJvdmFsSXRlbS5pc0FwcHJvdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLm9wZW5Db21wbGV0aW9uRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICBhcmdzID0gYXBwcm92YWxDb21wbGV0aW9uU2VydmljZS5vcGVuQ29tcGxldGlvbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoc2NvcGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXJnc1sxXSkudG9FcXVhbChzY29wZS5hcHByb3ZhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnb3BlbiBjb21tZW50IGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgc2VydmljZSBtZXRob2QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigyKTtcclxuICAgICAgICAgICAgY3RybC5zaG93QXBwcm92YWxJdGVtQ29tbWVudHMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsQ29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdvcGVuIHN1bnJpc2UgZWRpdCBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsQXJncztcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigwKTtcclxuICAgICAgICAgICAgc3B5T24oc2NvcGUuYXBwcm92YWxJdGVtLCAnYWxsb3dFZGl0U3Vuc2V0T25seScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5zaG93U3VucmlzZVN1bnNldERpYWxvZygpO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBtb2RhbEFyZ3MgPSBtb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBleHBlY3QobW9kYWxBcmdzLmtleWJvYXJkKS50b0JlRmFsc3koKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy5iYWNrZHJvcCkudG9FcXVhbCgnc3RhdGljJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5yaXNlRGF0ZSgpLmdldFRpbWUoKSkudG9FcXVhbCgxMzkxNjE4Mzg1MzgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsQXJncy5yZXNvbHZlLnN1bnNldERhdGUoKS5nZXRUaW1lKCkpLnRvRXF1YWwoMTM5MjIyMzE4NTM4MCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbEFyZ3MucmVzb2x2ZS5zdW5zZXRPbmx5KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0VW5pcXVpZmllcigpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQgKCdnZXRzIGEgdW5pcXVlIHN0cmluZyB3aXRoIHRoZSBpbmRleCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKDAsIHt9LCBmYWxzZSwgNCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFVuaXF1aWZpZXIoKSkudG9FcXVhbChwYXJlbnRVbmlxdWlmaWVyICsgJ0l0ZW00Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
