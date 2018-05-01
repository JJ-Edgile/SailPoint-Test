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
             * Tests for the AccountSelectionStepHandler.
             */
            describe('AccountSelectionStepHandler', function () {

                var permittedById = '1234',
                    assignmentId = 'lksdhf',
                    handler,
                    accessRequestItemsService,
                    AccountSelectionStepHandler,
                    accessRequestItem,
                    entitlementRequestItem,
                    accountSelections,
                    target,
                    uniqueAssignmentPromiseSpy,
                    testService,
                    $rootScope;

                beforeEach(module(testModule, accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams:7 */
                beforeEach(inject(function (_AccountSelectionStepHandler_, AccessRequestItem, IdentityAccountSelection, _testService_, _accessRequestItemsService_, _$rootScope_, accessRequestTestData) {
                    AccountSelectionStepHandler = _AccountSelectionStepHandler_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;

                    accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1), new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION2)];

                    accessRequestItem = new AccessRequestItem(accessRequestTestData.ROLE);

                    entitlementRequestItem = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);

                    target = accountSelections[0].getProvisioningTargets()[1];

                    // Mock the unique assignment check to pass or fail.
                    uniqueAssignmentPromiseSpy = testService.createPromiseSpy(false);
                    accessRequestItemsService.checkUniqueAssignment = uniqueAssignmentPromiseSpy;

                    // Create the StepHandler to test with.
                    handler = new AccountSelectionStepHandler(accessRequestItem, target, accountSelections, permittedById, assignmentId);
                }));

                describe('constructor', function () {
                    it('requires an accessRequestItem', function () {
                        expect(function () {
                            new AccountSelectionStepHandler(null, target, accountSelections, null, null);
                        }).toThrow();
                    });

                    it('requires a provisioningTarget', function () {
                        expect(function () {
                            new AccountSelectionStepHandler(accessRequestItem, null, accountSelections, null, null);
                        }).toThrow();
                    });

                    it('requires account selections provisioningTarget', function () {
                        expect(function () {
                            new AccountSelectionStepHandler(accessRequestItem, target, null, null, null);
                        }).toThrow();
                    });

                    it('initializes values correctly', function () {
                        expect(handler.accessRequestItem).toEqual(accessRequestItem);
                        expect(handler.provisioningTarget).toEqual(target);
                        expect(handler.accountSelection).toEqual(accountSelections[0]);
                        expect(handler.accountSelections).toEqual(accountSelections);
                        expect(handler.identityIdx).toEqual(0);
                        expect(handler.appIdx).toEqual(1);
                        expect(handler.permittedById).toEqual(permittedById);
                        expect(handler.assignmentId).toEqual(assignmentId);
                        expect(handler.nonUniqueAssignmentError).toEqual(false);
                    });
                });

                it('returns the correct total identities count', function () {
                    expect(handler.getTotalIdentities()).toEqual(2);
                });

                it('clears selections', function () {
                    var acct = target.getAccountInfos()[0];
                    spyOn(target, 'clear').and.callThrough();

                    handler.selectAccount(acct);
                    handler.clearSelection();
                    expect(target.clear).toHaveBeenCalled();
                });

                it('selects the correct account for a target', function () {
                    var acct = target.getAccountInfos()[0];
                    handler.selectAccount(acct);

                    expect(target.getSelectedAccount().equals(acct)).toBeTruthy();
                    expect(target.isCreateAccount()).toEqual(false);
                });

                it('returns true for isAccountSelected() on the correct account', function () {
                    var acct = target.getAccountInfos()[0],
                        acct2 = target.getAccountInfos()[1];
                    handler.selectAccount(acct);

                    expect(handler.isAccountSelected(acct)).toEqual(true);
                    expect(handler.isAccountSelected(acct2)).toEqual(false);
                });

                it('selects "create new account"', function () {
                    var acct = target.getAccountInfos()[0];

                    // First select an account so we can check that it gets cleared.
                    handler.selectAccount(acct);

                    handler.selectCreateAccount();

                    expect(target.getSelectedAccount()).toBeNull();
                    expect(target.isCreateAccount()).toEqual(true);
                });

                it('returns correct value for isCreateAccountSelected()', function () {
                    expect(handler.isCreateAccountSelected()).toEqual(false);
                    handler.selectCreateAccount();
                    expect(handler.isCreateAccountSelected()).toEqual(true);
                });

                describe('hasMoreTargetsOnCurrentIdentity()', function () {
                    it('returns true if not on the last app', function () {
                        var firstTarget = accountSelections[0].getProvisioningTargets()[0],
                            handler = new AccountSelectionStepHandler(accessRequestItem, firstTarget, accountSelections, permittedById, assignmentId);
                        expect(handler.hasMoreTargetsOnCurrentIdentity()).toEqual(true);
                    });

                    it('returns false if on the last app', function () {
                        expect(handler.hasMoreTargetsOnCurrentIdentity()).toEqual(false);
                    });
                });

                describe('validateUniqueAssignment()', function () {
                    function validateUniqueAssignment(catchFunc) {
                        var promise = handler.validateUniqueAssignment();
                        if (catchFunc) {
                            promise = promise['catch'](catchFunc);
                        }
                        $rootScope.$digest();
                        return promise;
                    }

                    it('does not check unique assignment if not a role', function () {
                        handler.accessRequestItem = entitlementRequestItem;
                        validateUniqueAssignment();
                        expect(accessRequestItemsService.checkUniqueAssignment).not.toHaveBeenCalled();
                    });

                    it('does not check unique assignment if more targets exist', function () {
                        var firstTarget = accountSelections[0].getProvisioningTargets()[0];
                        handler = new AccountSelectionStepHandler(accessRequestItem, firstTarget, accountSelections, permittedById, assignmentId);
                        validateUniqueAssignment();
                        expect(accessRequestItemsService.checkUniqueAssignment).not.toHaveBeenCalled();
                    });

                    it('checks unique assignment when on last target', function () {
                        var requestedItem;

                        validateUniqueAssignment();
                        expect(accessRequestItemsService.checkUniqueAssignment).toHaveBeenCalled();

                        // Check that a requested item was passed with the expected data.
                        requestedItem = accessRequestItemsService.checkUniqueAssignment.calls.mostRecent().args[0];
                        expect(requestedItem.item).toEqual(handler.accessRequestItem);
                        expect(requestedItem.accountSelections[0]).toEqual(handler.accountSelections[0]);
                    });

                    it('should pass assignmentId if set', function () {
                        var requestedItem;

                        validateUniqueAssignment();
                        expect(accessRequestItemsService.checkUniqueAssignment).toHaveBeenCalled();

                        // Check that a requested item was passed with the expected data.
                        requestedItem = accessRequestItemsService.checkUniqueAssignment.calls.mostRecent().args[0];
                        expect(requestedItem.assignmentId).toEqual(assignmentId);
                    });

                    it('should pass permitted by id to service', function () {
                        var requestedItem;

                        validateUniqueAssignment();
                        expect(accessRequestItemsService.checkUniqueAssignment).toHaveBeenCalled();

                        requestedItem = accessRequestItemsService.checkUniqueAssignment.calls.mostRecent().args[0];
                        expect(requestedItem.permittedById).toEqual(permittedById);
                    });

                    it('sets error flag if unique assignment check fails', function () {
                        var rejected = undefined;
                        uniqueAssignmentPromiseSpy.makeReject(true);
                        validateUniqueAssignment(function () {
                            return rejected = true;
                        });
                        expect(handler.nonUniqueAssignmentError).toEqual(true);
                        expect(rejected).toEqual(true);
                    });

                    it('resets error flag if unique assignment check passes', function () {
                        handler.nonUniqueAssignmentError = true;
                        uniqueAssignmentPromiseSpy.makeReject(false);
                        validateUniqueAssignment();
                        expect(handler.nonUniqueAssignmentError).toEqual(false);
                    });

                    it('resets error flag if identity has more targets', function () {
                        var firstTarget = accountSelections[0].getProvisioningTargets()[0];
                        handler = new AccountSelectionStepHandler(accessRequestItem, firstTarget, accountSelections, permittedById, assignmentId);
                        handler.nonUniqueAssignmentError = true;
                        validateUniqueAssignment();
                        expect(handler.nonUniqueAssignmentError).toEqual(false);
                    });
                });

                it('returns the correct title', function () {
                    expect(handler.getTitle()).toEqual('ui_acct_select_title');
                });

                it('returns the correct stepId', function () {
                    expect(handler.getStepId()).toEqual('accountSelection_0-1');
                });

                describe('isSaveDisabled()', function () {
                    it('returns true if nothing has been selected', function () {
                        expect(handler.isSaveDisabled()).toEqual(true);
                    });

                    it('returns false if an account has been selected', function () {
                        var acct = target.getAccountInfos()[0];
                        handler.selectAccount(acct);
                        expect(handler.isSaveDisabled()).toEqual(false);
                    });

                    it('returns false if create account has been selected', function () {
                        handler.selectCreateAccount();
                        expect(handler.isSaveDisabled()).toEqual(false);
                    });
                });

                describe('getSaveButtonLabel()', function () {
                    it('returns "Apply" if on last step', function () {
                        expect(handler.getSaveButtonLabel(true)).toEqual('ui_acct_select_apply');
                    });

                    it('returns "Next Identity" if on last app of an identity', function () {
                        expect(handler.getSaveButtonLabel(false)).toEqual('ui_acct_select_next_identity_button');
                    });

                    it('returns "Next App" if more apps exist on the identity', function () {
                        var firstTarget = accountSelections[0].getProvisioningTargets()[0],
                            handler = new AccountSelectionStepHandler(accessRequestItem, firstTarget, accountSelections, permittedById, assignmentId);
                        expect(handler.getSaveButtonLabel(false)).toEqual('ui_acct_select_next_app_button');
                    });
                });

                describe('save()', function () {
                    it('resolves with the provisioning target', function () {
                        var promise = handler.save(),
                            spy = testService.spyOnSuccess(promise);
                        $rootScope.$digest();
                        expect(spy).toHaveBeenCalledWith(target);
                    });

                    it('rejects if unique assignment check fails', function () {
                        var promise, spy;

                        // Set the unique check to reject.
                        uniqueAssignmentPromiseSpy.makeReject(true);

                        // Attempt to save.
                        promise = handler.save();
                        spy = testService.spyOnFailure(promise);
                        $rootScope.$digest();

                        // Make sure the modal stayed open.
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjb3VudFNlbGVjdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUztJQUF0Sjs7SUFHSSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsK0JBQStCLFlBQVc7O2dCQUUvQyxJQUFJLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZjtvQkFBUztvQkFBMkI7b0JBQ3BDO29CQUFtQjtvQkFDbkI7b0JBQW1CO29CQUFRO29CQUE0QjtvQkFBYTs7Z0JBRXhFLFdBQVcsT0FBTyxZQUFZOzs7Ozs7Z0JBTTlCLFdBQVcsT0FBTyxVQUFTLCtCQUErQixtQkFBbUIsMEJBQ2xELGVBQWUsNkJBQTZCLGNBQWMsdUJBQXVCO29CQUN4Ryw4QkFBOEI7b0JBQzlCLDRCQUE0QjtvQkFDNUIsY0FBYztvQkFDZCxhQUFhOztvQkFFYixvQkFBb0IsQ0FDaEIsSUFBSSx5QkFBeUIsc0JBQXNCLDJCQUNuRCxJQUFJLHlCQUF5QixzQkFBc0I7O29CQUd2RCxvQkFBb0IsSUFBSSxrQkFBa0Isc0JBQXNCOztvQkFFaEUseUJBQXlCLElBQUksa0JBQWtCLHNCQUFzQjs7b0JBRXJFLFNBQVMsa0JBQWtCLEdBQUcseUJBQXlCOzs7b0JBR3ZELDZCQUE2QixZQUFZLGlCQUFpQjtvQkFDMUQsMEJBQTBCLHdCQUF3Qjs7O29CQUdsRCxVQUFVLElBQUksNEJBQTRCLG1CQUFtQixRQUFRLG1CQUMzQixlQUFlOzs7Z0JBRzdELFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLGlD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LGFBQWE7d0JBQy9CLFdBQVc7Ozt3QkFHWCxPQUFPLEtBQUs7Ozs7OztHQVdyQiIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcbmltcG9ydCAnLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWNjb3VudFNlbGVjdGlvblN0ZXBIYW5kbGVyLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0FjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBwZXJtaXR0ZWRCeUlkID0gJzEyMzQnLFxyXG4gICAgICAgIGFzc2lnbm1lbnRJZCA9ICdsa3NkaGYnLFxyXG4gICAgICAgIGhhbmRsZXIsIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsIEFjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlcixcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbSwgZW50aXRsZW1lbnRSZXF1ZXN0SXRlbSxcclxuICAgICAgICBhY2NvdW50U2VsZWN0aW9ucywgdGFyZ2V0LCB1bmlxdWVBc3NpZ25tZW50UHJvbWlzZVNweSwgdGVzdFNlcnZpY2UsICRyb290U2NvcGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxyXG4gICAgICovXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXJfLCBBY2Nlc3NSZXF1ZXN0SXRlbSwgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rlc3RTZXJ2aWNlXywgX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfLCBfJHJvb3RTY29wZV8sIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgIEFjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlciA9IF9BY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXJfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcblxyXG4gICAgICAgIGFjY291bnRTZWxlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjEpLFxyXG4gICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjIpXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW0gPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLlJPTEUpO1xyXG5cclxuICAgICAgICBlbnRpdGxlbWVudFJlcXVlc3RJdGVtID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5FTlRJVExFTUVOVCk7XHJcblxyXG4gICAgICAgIHRhcmdldCA9IGFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVsxXTtcclxuXHJcbiAgICAgICAgLy8gTW9jayB0aGUgdW5pcXVlIGFzc2lnbm1lbnQgY2hlY2sgdG8gcGFzcyBvciBmYWlsLlxyXG4gICAgICAgIHVuaXF1ZUFzc2lnbm1lbnRQcm9taXNlU3B5ID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSk7XHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQgPSB1bmlxdWVBc3NpZ25tZW50UHJvbWlzZVNweTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBTdGVwSGFuZGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgaGFuZGxlciA9IG5ldyBBY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXIoYWNjZXNzUmVxdWVzdEl0ZW0sIHRhcmdldCwgYWNjb3VudFNlbGVjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWl0dGVkQnlJZCwgYXNzaWdubWVudElkKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmVxdWlyZXMgYW4gYWNjZXNzUmVxdWVzdEl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbmV3IEFjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlcihudWxsLCB0YXJnZXQsIGFjY291bnRTZWxlY3Rpb25zLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVxdWlyZXMgYSBwcm92aXNpb25pbmdUYXJnZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbmV3IEFjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlcihhY2Nlc3NSZXF1ZXN0SXRlbSwgbnVsbCwgYWNjb3VudFNlbGVjdGlvbnMsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXF1aXJlcyBhY2NvdW50IHNlbGVjdGlvbnMgcHJvdmlzaW9uaW5nVGFyZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBBY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXIoYWNjZXNzUmVxdWVzdEl0ZW0sIHRhcmdldCwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIHZhbHVlcyBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuYWNjZXNzUmVxdWVzdEl0ZW0pLnRvRXF1YWwoYWNjZXNzUmVxdWVzdEl0ZW0pO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5wcm92aXNpb25pbmdUYXJnZXQpLnRvRXF1YWwodGFyZ2V0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuYWNjb3VudFNlbGVjdGlvbikudG9FcXVhbChhY2NvdW50U2VsZWN0aW9uc1swXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmFjY291bnRTZWxlY3Rpb25zKS50b0VxdWFsKGFjY291bnRTZWxlY3Rpb25zKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaWRlbnRpdHlJZHgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmFwcElkeCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIucGVybWl0dGVkQnlJZCkudG9FcXVhbChwZXJtaXR0ZWRCeUlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuYXNzaWdubWVudElkKS50b0VxdWFsKGFzc2lnbm1lbnRJZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLm5vblVuaXF1ZUFzc2lnbm1lbnRFcnJvcikudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB0b3RhbCBpZGVudGl0aWVzIGNvdW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0VG90YWxJZGVudGl0aWVzKCkpLnRvRXF1YWwoMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY2xlYXJzIHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYWNjdCA9IHRhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuICAgICAgICBzcHlPbih0YXJnZXQsICdjbGVhcicpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG5cclxuICAgICAgICBoYW5kbGVyLnNlbGVjdEFjY291bnQoYWNjdCk7XHJcbiAgICAgICAgaGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIGV4cGVjdCh0YXJnZXQuY2xlYXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzZWxlY3RzIHRoZSBjb3JyZWN0IGFjY291bnQgZm9yIGEgdGFyZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGFjY3QgPSB0YXJnZXQuZ2V0QWNjb3VudEluZm9zKClbMF07XHJcbiAgICAgICAgaGFuZGxlci5zZWxlY3RBY2NvdW50KGFjY3QpO1xyXG5cclxuICAgICAgICBleHBlY3QodGFyZ2V0LmdldFNlbGVjdGVkQWNjb3VudCgpLmVxdWFscyhhY2N0KSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGV4cGVjdCh0YXJnZXQuaXNDcmVhdGVBY2NvdW50KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaXNBY2NvdW50U2VsZWN0ZWQoKSBvbiB0aGUgY29ycmVjdCBhY2NvdW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGFjY3QgPSB0YXJnZXQuZ2V0QWNjb3VudEluZm9zKClbMF0sXHJcbiAgICAgICAgICAgIGFjY3QyID0gdGFyZ2V0LmdldEFjY291bnRJbmZvcygpWzFdO1xyXG4gICAgICAgIGhhbmRsZXIuc2VsZWN0QWNjb3VudChhY2N0KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNBY2NvdW50U2VsZWN0ZWQoYWNjdCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNBY2NvdW50U2VsZWN0ZWQoYWNjdDIpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzZWxlY3RzIFwiY3JlYXRlIG5ldyBhY2NvdW50XCInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYWNjdCA9IHRhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuXHJcbiAgICAgICAgLy8gRmlyc3Qgc2VsZWN0IGFuIGFjY291bnQgc28gd2UgY2FuIGNoZWNrIHRoYXQgaXQgZ2V0cyBjbGVhcmVkLlxyXG4gICAgICAgIGhhbmRsZXIuc2VsZWN0QWNjb3VudChhY2N0KTtcclxuXHJcbiAgICAgICAgaGFuZGxlci5zZWxlY3RDcmVhdGVBY2NvdW50KCk7XHJcblxyXG4gICAgICAgIGV4cGVjdCh0YXJnZXQuZ2V0U2VsZWN0ZWRBY2NvdW50KCkpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KHRhcmdldC5pc0NyZWF0ZUFjY291bnQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGNvcnJlY3QgdmFsdWUgZm9yIGlzQ3JlYXRlQWNjb3VudFNlbGVjdGVkKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoaGFuZGxlci5pc0NyZWF0ZUFjY291bnRTZWxlY3RlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICBoYW5kbGVyLnNlbGVjdENyZWF0ZUFjY291bnQoKTtcclxuICAgICAgICBleHBlY3QoaGFuZGxlci5pc0NyZWF0ZUFjY291bnRTZWxlY3RlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hhc01vcmVUYXJnZXRzT25DdXJyZW50SWRlbnRpdHkoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbm90IG9uIHRoZSBsYXN0IGFwcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlyc3RUYXJnZXQgPSBhY2NvdW50U2VsZWN0aW9uc1swXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMF0sXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gbmV3IEFjY291bnRTZWxlY3Rpb25TdGVwSGFuZGxlcihhY2Nlc3NSZXF1ZXN0SXRlbSwgZmlyc3RUYXJnZXQsIGFjY291bnRTZWxlY3Rpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWl0dGVkQnlJZCwgYXNzaWdubWVudElkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaGFzTW9yZVRhcmdldHNPbkN1cnJlbnRJZGVudGl0eSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBvbiB0aGUgbGFzdCBhcHAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaGFzTW9yZVRhcmdldHNPbkN1cnJlbnRJZGVudGl0eSgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCd2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlVW5pcXVlQXNzaWdubWVudChjYXRjaEZ1bmMpIHtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBoYW5kbGVyLnZhbGlkYXRlVW5pcXVlQXNzaWdubWVudCgpO1xyXG4gICAgICAgICAgICBpZiAoY2F0Y2hGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS5jYXRjaChjYXRjaEZ1bmMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjaGVjayB1bmlxdWUgYXNzaWdubWVudCBpZiBub3QgYSByb2xlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIuYWNjZXNzUmVxdWVzdEl0ZW0gPSBlbnRpdGxlbWVudFJlcXVlc3RJdGVtO1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuY2hlY2tVbmlxdWVBc3NpZ25tZW50KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgY2hlY2sgdW5pcXVlIGFzc2lnbm1lbnQgaWYgbW9yZSB0YXJnZXRzIGV4aXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJzdFRhcmdldCA9IGFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXTtcclxuICAgICAgICAgICAgaGFuZGxlciA9IG5ldyBBY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXIoYWNjZXNzUmVxdWVzdEl0ZW0sIGZpcnN0VGFyZ2V0LCBhY2NvdW50U2VsZWN0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWl0dGVkQnlJZCwgYXNzaWdubWVudElkKTtcclxuICAgICAgICAgICAgdmFsaWRhdGVVbmlxdWVBc3NpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmNoZWNrVW5pcXVlQXNzaWdubWVudCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NoZWNrcyB1bmlxdWUgYXNzaWdubWVudCB3aGVuIG9uIGxhc3QgdGFyZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ZWRJdGVtO1xyXG5cclxuICAgICAgICAgICAgdmFsaWRhdGVVbmlxdWVBc3NpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmNoZWNrVW5pcXVlQXNzaWdubWVudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBhIHJlcXVlc3RlZCBpdGVtIHdhcyBwYXNzZWQgd2l0aCB0aGUgZXhwZWN0ZWQgZGF0YS5cclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuY2hlY2tVbmlxdWVBc3NpZ25tZW50LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5pdGVtKS50b0VxdWFsKGhhbmRsZXIuYWNjZXNzUmVxdWVzdEl0ZW0pO1xyXG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9uc1swXSkudG9FcXVhbChoYW5kbGVyLmFjY291bnRTZWxlY3Rpb25zWzBdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBwYXNzIGFzc2lnbm1lbnRJZCBpZiBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3RlZEl0ZW07XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuY2hlY2tVbmlxdWVBc3NpZ25tZW50KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IGEgcmVxdWVzdGVkIGl0ZW0gd2FzIHBhc3NlZCB3aXRoIHRoZSBleHBlY3RlZCBkYXRhLlxyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmFzc2lnbm1lbnRJZCkudG9FcXVhbChhc3NpZ25tZW50SWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHBhc3MgcGVybWl0dGVkIGJ5IGlkIHRvIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3RlZEl0ZW07XHJcblxyXG4gICAgICAgICAgICB2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuY2hlY2tVbmlxdWVBc3NpZ25tZW50KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLnBlcm1pdHRlZEJ5SWQpLnRvRXF1YWwocGVybWl0dGVkQnlJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIGVycm9yIGZsYWcgaWYgdW5pcXVlIGFzc2lnbm1lbnQgY2hlY2sgZmFpbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHJlamVjdGVkO1xyXG4gICAgICAgICAgICB1bmlxdWVBc3NpZ25tZW50UHJvbWlzZVNweS5tYWtlUmVqZWN0KHRydWUpO1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKCkgPT4gcmVqZWN0ZWQgPSB0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIubm9uVW5pcXVlQXNzaWdubWVudEVycm9yKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVqZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXNldHMgZXJyb3IgZmxhZyBpZiB1bmlxdWUgYXNzaWdubWVudCBjaGVjayBwYXNzZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaGFuZGxlci5ub25VbmlxdWVBc3NpZ25tZW50RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB1bmlxdWVBc3NpZ25tZW50UHJvbWlzZVNweS5tYWtlUmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgdmFsaWRhdGVVbmlxdWVBc3NpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLm5vblVuaXF1ZUFzc2lnbm1lbnRFcnJvcikudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXNldHMgZXJyb3IgZmxhZyBpZiBpZGVudGl0eSBoYXMgbW9yZSB0YXJnZXRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJzdFRhcmdldCA9IGFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXTtcclxuICAgICAgICAgICAgaGFuZGxlciA9IG5ldyBBY2NvdW50U2VsZWN0aW9uU3RlcEhhbmRsZXIoYWNjZXNzUmVxdWVzdEl0ZW0sIGZpcnN0VGFyZ2V0LCBhY2NvdW50U2VsZWN0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVybWl0dGVkQnlJZCwgYXNzaWdubWVudElkKTtcclxuICAgICAgICAgICAgaGFuZGxlci5ub25VbmlxdWVBc3NpZ25tZW50RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YWxpZGF0ZVVuaXF1ZUFzc2lnbm1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIubm9uVW5pcXVlQXNzaWdubWVudEVycm9yKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHRpdGxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0VGl0bGUoKSkudG9FcXVhbCgndWlfYWNjdF9zZWxlY3RfdGl0bGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IHN0ZXBJZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChoYW5kbGVyLmdldFN0ZXBJZCgpKS50b0VxdWFsKCdhY2NvdW50U2VsZWN0aW9uXzAtMScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzU2F2ZURpc2FibGVkKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5vdGhpbmcgaGFzIGJlZW4gc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNTYXZlRGlzYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYW4gYWNjb3VudCBoYXMgYmVlbiBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjdCA9IHRhcmdldC5nZXRBY2NvdW50SW5mb3MoKVswXTtcclxuICAgICAgICAgICAgaGFuZGxlci5zZWxlY3RBY2NvdW50KGFjY3QpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgY3JlYXRlIGFjY291bnQgaGFzIGJlZW4gc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaGFuZGxlci5zZWxlY3RDcmVhdGVBY2NvdW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFNhdmVCdXR0b25MYWJlbCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgXCJBcHBseVwiIGlmIG9uIGxhc3Qgc3RlcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRTYXZlQnV0dG9uTGFiZWwodHJ1ZSkpLnRvRXF1YWwoJ3VpX2FjY3Rfc2VsZWN0X2FwcGx5Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIFwiTmV4dCBJZGVudGl0eVwiIGlmIG9uIGxhc3QgYXBwIG9mIGFuIGlkZW50aXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmdldFNhdmVCdXR0b25MYWJlbChmYWxzZSkpLnRvRXF1YWwoJ3VpX2FjY3Rfc2VsZWN0X25leHRfaWRlbnRpdHlfYnV0dG9uJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIFwiTmV4dCBBcHBcIiBpZiBtb3JlIGFwcHMgZXhpc3Qgb24gdGhlIGlkZW50aXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXJzdFRhcmdldCA9IGFjY291bnRTZWxlY3Rpb25zWzBdLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBuZXcgQWNjb3VudFNlbGVjdGlvblN0ZXBIYW5kbGVyKGFjY2Vzc1JlcXVlc3RJdGVtLCBmaXJzdFRhcmdldCwgYWNjb3VudFNlbGVjdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXR0ZWRCeUlkLCBhc3NpZ25tZW50SWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRTYXZlQnV0dG9uTGFiZWwoZmFsc2UpKS50b0VxdWFsKCd1aV9hY2N0X3NlbGVjdF9uZXh0X2FwcF9idXR0b24nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzYXZlKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmVzb2x2ZXMgd2l0aCB0aGUgcHJvdmlzaW9uaW5nIHRhcmdldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9IGhhbmRsZXIuc2F2ZSgpLFxyXG4gICAgICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlamVjdHMgaWYgdW5pcXVlIGFzc2lnbm1lbnQgY2hlY2sgZmFpbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdW5pcXVlIGNoZWNrIHRvIHJlamVjdC5cclxuICAgICAgICAgICAgdW5pcXVlQXNzaWdubWVudFByb21pc2VTcHkubWFrZVJlamVjdCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gc2F2ZS5cclxuICAgICAgICAgICAgcHJvbWlzZSA9IGhhbmRsZXIuc2F2ZSgpO1xyXG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBtb2RhbCBzdGF5ZWQgb3Blbi5cclxuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
