System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the IdentityAccountSelection model object.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('IdentityAccountSelection', function () {
                var identityAccountData = {
                    identityId: 'ted.tacular.id',
                    identityName: 'ted.tacular',
                    provisioningTargets: []
                },
                    provisioningTargetData = [{ applicationId: 'appId1' }, { applicationId: 'appId2' }, { applicationId: 'appId3' }, { applicationId: 'appId4' }],
                    IdentityAccountSelection,
                    ProvisioningTarget,
                    identityAccount;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the IdentityAccountSelection class and create some data to test with.
                 */
                beforeEach(inject(function (_IdentityAccountSelection_, _ProvisioningTarget_) {
                    IdentityAccountSelection = _IdentityAccountSelection_;
                    ProvisioningTarget = _ProvisioningTarget_;
                    identityAccountData.provisioningTargets = provisioningTargetData;
                    identityAccount = new IdentityAccountSelection(identityAccountData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new IdentityAccountSelection(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new IdentityAccountSelection('hi mom');
                    }).toThrow();
                    expect(function () {
                        new IdentityAccountSelection(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('clones itself ... like a virus ... an awesome account selection virus', function () {
                    var cloned = identityAccount.clone();
                    expect(cloned.getIdentityId()).toEqual(identityAccount.getIdentityId());
                    expect(cloned.getIdentityName()).toEqual(identityAccount.getIdentityName());

                    // These are different objects.
                    expect(cloned.getProvisioningTargets()).not.toBe(identityAccount.getProvisioningTargets());
                    expect(cloned.getProvisioningTargets().length).toEqual(identityAccount.getProvisioningTargets().length);
                });

                it('returns an identityId read from data', function () {
                    expect(identityAccount.getIdentityId()).toEqual(identityAccountData.identityId);
                });

                it('returns an identityName read from data', function () {
                    expect(identityAccount.getIdentityName()).toEqual(identityAccountData.identityName);
                });

                it('returns provisioningTargets read from data', function () {
                    var targets = identityAccount.getProvisioningTargets();
                    expect(angular.isArray(targets)).toBeTruthy();
                    expect(targets[0] instanceof ProvisioningTarget).toBeTruthy();
                    expect(targets[1] instanceof ProvisioningTarget).toBeTruthy();
                    expect(targets[2] instanceof ProvisioningTarget).toBeTruthy();
                    expect(targets[3] instanceof ProvisioningTarget).toBeTruthy();
                });

                it('adds provisioning targets', function () {
                    var newTarget = new ProvisioningTarget({ applicationId: 'getDownWitYoBadSelf' });
                    identityAccount.addProvisioningTarget(newTarget);
                    expect(identityAccount.getProvisioningTargets().indexOf(newTarget) > -1).toBeTruthy();
                });

                describe('allTargetsHaveSelections()', function () {

                    /**
                     * Create a mock ProvisioningTarget with or without a selection.
                     *
                     * @param {boolean} hasSelection  Whether the target should have a selection.
                     *
                     * @return {Object} A mock ProvisioningTarget with hasSelection() stubbed out.
                     */
                    function createProvisioningTarget(hasSelection) {
                        return {
                            hasSelection: function () {
                                return hasSelection;
                            }
                        };
                    }

                    it('returns true if all targets have selections', function () {
                        identityAccount.provisioningTargets = [createProvisioningTarget(true), createProvisioningTarget(true)];
                        expect(identityAccount.allTargetsHaveSelections()).toEqual(true);
                    });

                    it('returns false if first target does not have a selection', function () {
                        identityAccount.provisioningTargets = [createProvisioningTarget(false), createProvisioningTarget(true)];
                        expect(identityAccount.allTargetsHaveSelections()).toEqual(false);
                    });

                    it('returns false if last target does not have a selection', function () {
                        identityAccount.provisioningTargets = [createProvisioningTarget(true), createProvisioningTarget(false)];
                        expect(identityAccount.allTargetsHaveSelections()).toEqual(false);
                    });

                    it('returns false if no targets have selections', function () {
                        identityAccount.provisioningTargets = [createProvisioningTarget(false), createProvisioningTarget(false)];
                        expect(identityAccount.allTargetsHaveSelections()).toEqual(false);
                    });
                });

                describe('mergeAccountSelections', function () {
                    var sel1, sel2, acctSelData, existingSelections;

                    beforeEach(inject(function (accessRequestTestData) {
                        acctSelData = accessRequestTestData.IDENTITY_ACCT_SELECTION1;
                        sel1 = new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1);
                        sel2 = new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION2);
                        existingSelections = [sel1];
                    }));

                    it('does nothing with null newSelections', function () {
                        var merged = IdentityAccountSelection.mergeAccountSelections(existingSelections, null);
                        expect(existingSelections.length).toEqual(1);
                        expect(merged).toEqual(existingSelections);
                    });

                    it('does nothing with empty newSelections', function () {
                        var merged = IdentityAccountSelection.mergeAccountSelections(existingSelections, []);
                        expect(existingSelections.length).toEqual(1);
                        expect(merged).toEqual(existingSelections);
                    });

                    it('adds a new selection when an existing selection is not found', function () {
                        var merged = IdentityAccountSelection.mergeAccountSelections(existingSelections, [sel2]);
                        expect(existingSelections.length).toEqual(2);
                        expect(merged.indexOf(sel2) > -1).toBeTruthy();
                    });

                    /**
                     * Test that merging a matching identity selection with the given provisioning target
                     * data adds a new provisioning target to the existing target.
                     *
                     * @param {Object} targetData  Data to be used to construct the provisioning target.
                     */
                    function testAddNewTarget(targetData) {
                        var newAcctSelData = angular.copy(acctSelData),
                            newAcctSel,
                            merged,
                            newTarget;

                        newAcctSelData.provisioningTargets = [targetData];

                        newAcctSel = new IdentityAccountSelection(newAcctSelData);
                        newTarget = newAcctSel.getProvisioningTargets()[0];
                        merged = IdentityAccountSelection.mergeAccountSelections(existingSelections, [newAcctSel]);

                        // The list shouldn't grow - it should be added to the existing selection.
                        expect(merged.length).toEqual(1);
                        expect(merged[0].getProvisioningTargets().indexOf(newTarget) > -1).toBeTruthy();
                    }

                    it('adds a new target when an existing target app is not found', function () {
                        testAddNewTarget({
                            applicationId: 'itsAFestivusMiracle',
                            applicationName: 'A Festivus for the rest of us',
                            allowCreate: false,
                            accountInfos: [{
                                instance: 'tedsAccount',
                                nativeIdentity: 'ted',
                                displayName: 'Ted Tacular'
                            }]
                        });
                    });

                    it('adds a new target when an existing target role is not found', function () {
                        var targetData = angular.copy(acctSelData.provisioningTargets[0]);
                        targetData.roleName = 'airingOfGrievances';
                        testAddNewTarget(targetData);
                    });

                    it('does not add a target if it already exists', function () {
                        var merged = IdentityAccountSelection.mergeAccountSelections(existingSelections, [sel1]);
                        expect(merged.length).toEqual(1);
                    });
                });

                describe('find', function () {
                    var acctSel2Data, ProvisioningTarget, target, acctSel2;

                    beforeEach(inject(function (_ProvisioningTarget_, accessRequestTestData) {
                        ProvisioningTarget = _ProvisioningTarget_;
                        target = identityAccount.provisioningTargets[0];
                        acctSel2Data = accessRequestTestData.IDENTITY_ACCT_SELECTION2;
                        acctSel2 = new IdentityAccountSelection(acctSel2Data);
                    }));

                    it('returns null if account selections is null', function () {
                        var found = IdentityAccountSelection.find(null, identityAccount, target);
                        expect(found).toBeNull();
                    });

                    it('returns null if a matching account selection is not found', function () {
                        var selections = [identityAccount],
                            found = IdentityAccountSelection.find(selections, acctSel2, target);
                        expect(found).toBeNull();
                    });

                    it('returns null if provisioning target has a different application', function () {
                        var selections = [identityAccount],
                            target2 = new ProvisioningTarget({
                            applicationId: 'someOtherAppId',
                            roleName: 'Boss'
                        }),
                            found = IdentityAccountSelection.find(selections, identityAccount, target2);
                        expect(found).toBeNull();
                    });

                    it('returns null if provisioning target has a different role', function () {
                        var selections = [identityAccount],
                            target2 = new ProvisioningTarget({
                            applicationId: 'appId',
                            roleName: 'NotSuchABoss'
                        }),
                            found = IdentityAccountSelection.find(selections, identityAccount, target2);
                        expect(found).toBeNull();
                    });

                    it('returns a cloned account selection when a match is found', function () {
                        var selections = [identityAccount],
                            target2 = identityAccount.provisioningTargets[0],
                            found;

                        spyOn(identityAccount, 'clone').and.callThrough();

                        found = IdentityAccountSelection.find(selections, identityAccount, target2);
                        expect(identityAccount.clone).toHaveBeenCalled();
                        checkFoundAccountSelection(found, identityAccount.getIdentityId(), target2.applicationId, target2.roleName);
                    });

                    it('returns a cloned account selection in a list with multiple selections', function () {
                        var selections = [identityAccount, acctSel2],
                            target2 = acctSel2.provisioningTargets[1],
                            found;

                        spyOn(acctSel2, 'clone').and.callThrough();

                        found = IdentityAccountSelection.find(selections, acctSel2, target2);
                        expect(acctSel2.clone).toHaveBeenCalled();
                        checkFoundAccountSelection(found, acctSel2.getIdentityId(), target2.applicationId, target2.roleName);
                    });

                    function checkFoundAccountSelection(found, identityId, appId, roleName) {
                        var foundTarget;

                        expect(found).not.toBeNull();
                        expect(found.getIdentityId()).toEqual(identityId);
                        expect(found.getProvisioningTargets().length).toEqual(1);
                        foundTarget = found.getProvisioningTargets()[0];
                        expect(foundTarget.applicationId).toEqual(appId);
                        expect(foundTarget.roleName).toEqual(roleName);
                    }
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7Ozs7O0lBS2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksc0JBQXNCO29CQUN0QixZQUFZO29CQUNaLGNBQWM7b0JBQ2QscUJBQXFCOztvQkFFekIseUJBQXlCLENBQ3JCLEVBQUMsZUFBZSxZQUNoQixFQUFDLGVBQWUsWUFDaEIsRUFBQyxlQUFlLFlBQ2hCLEVBQUMsZUFBZTtvQkFFcEI7b0JBQ0E7b0JBQ0E7OztnQkFHQSxXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsc0JBQXNCO29CQUN6RSwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIsb0JBQW9CLHNCQUFzQjtvQkFDMUMsa0JBQWtCLElBQUkseUJBQXlCOzs7Z0JBR25ELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5Qjt1QkFBVTs7O2dCQUcvRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSx5QkFBeUI7dUJBQWM7b0JBQy9ELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5QixZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUc3RixHQUFHLHlFQUF5RSxZQUFXO29CQUNuRixJQUFJLFNBQVMsZ0JBQWdCO29CQUM3QixPQUFPLE9BQU8saUJBQWlCLFFBQVEsZ0JBQWdCO29CQUN2RCxPQUFPLE9BQU8sbUJBQW1CLFFBQVEsZ0JBQWdCOzs7b0JBR3pELE9BQU8sT0FB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LDREQUE0RCxZQUFXO3dCQUN0RSxJQUFJLGFBQWEsQ0FBRTs0QkFDZixVQUFVLElBQUksbUJBQW1COzRCQUM3QixlQUFlOzRCQUNmLFVBQVU7OzRCQUVkLFFBQVEseUJBQXlCLEtBQUssWUFBWSxpQkFBaUI7d0JBQ3ZFLE9BQU8sT0FBTzs7O29CQUdsQixHQUFHLDREQUE0RCxZQUFXO3dCQUN0RSxJQUFJLGFBQWEsQ0FBRTs0QkFDZixVQUFVLGdCQUFnQixvQkFBb0I7NEJBQzlDOzt3QkFFSixNQUFNLGlCQUFpQixTQUFTLElBQUk7O3dCQUVwQyxRQUFRLHlCQUF5QixLQUFLLFlBQVksaUJBQWlCO3dCQUNuRSxPQUFPLGdCQUFnQixPQUFPO3dCQUM5QiwyQkFBMkIsT0FBTyxnQkFBZ0IsaUJBQ3ZCLFFBQVEsZUFBZSxRQUFROzs7b0JBRzlELEdBQUcseUVBQXlFLFlBQVc7d0JBQ25GLElBQUksYUFBYSxDQUFFLGlCQUFpQjs0QkFDaEMsVUFBVSxTQUFTLG9CQUFvQjs0QkFDdkM7O3dCQUVKLE1BQU0sVUFBVSxTQUFTLElBQUk7O3dCQUU3QixRQUFRLHlCQUF5QixLQUFLLFlBQVksVUFBVTt3QkFDNUQsT0FBTyxTQUFTLE9BQU87d0JBQ3ZCLDJCQUEyQixPQUFPLFNBQVMsaUJBQ2hCLFFBQVEsZUFBZSxRQUFROzs7b0JBRzlELFNBQVMsMkJBQTJCLE9BQU8sWUFBWSxPQUFPLFVBQVU7d0JBQ3BFLElBQUk7O3dCQUVKLE9BQU8sT0FBTyxJQUFJO3dCQUNsQixPQUFPLE1BQU0saUJBQWlCLFFBQVE7d0JBQ3RDLE9BQU8sTUFBTSx5QkFBeUIsUUFBUSxRQUFRO3dCQUN0RCxjQUFjLE1BQU0seUJBQXlCO3dCQUM3QyxPQUFPLFlBQVksZUFBZSxRQUFRO3dCQUMxQyxPQUFPLFlBQVksVUFBVSxRQUFROzs7Ozs7R0FJOUMiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9tb2RlbC9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uIG1vZGVsIG9iamVjdC5cclxuICovXHJcbmRlc2NyaWJlKCdJZGVudGl0eUFjY291bnRTZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpZGVudGl0eUFjY291bnREYXRhID0ge1xyXG4gICAgICAgIGlkZW50aXR5SWQ6ICd0ZWQudGFjdWxhci5pZCcsXHJcbiAgICAgICAgaWRlbnRpdHlOYW1lOiAndGVkLnRhY3VsYXInLFxyXG4gICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldHM6IFtdXHJcbiAgICB9LFxyXG4gICAgcHJvdmlzaW9uaW5nVGFyZ2V0RGF0YSA9IFtcclxuICAgICAgICB7YXBwbGljYXRpb25JZDogJ2FwcElkMSd9LFxyXG4gICAgICAgIHthcHBsaWNhdGlvbklkOiAnYXBwSWQyJ30sXHJcbiAgICAgICAge2FwcGxpY2F0aW9uSWQ6ICdhcHBJZDMnfSxcclxuICAgICAgICB7YXBwbGljYXRpb25JZDogJ2FwcElkNCd9XHJcbiAgICBdLFxyXG4gICAgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLFxyXG4gICAgUHJvdmlzaW9uaW5nVGFyZ2V0LFxyXG4gICAgaWRlbnRpdHlBY2NvdW50O1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fLCBfUHJvdmlzaW9uaW5nVGFyZ2V0Xykge1xyXG4gICAgICAgIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiA9IF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fO1xyXG4gICAgICAgIFByb3Zpc2lvbmluZ1RhcmdldCA9IF9Qcm92aXNpb25pbmdUYXJnZXRfO1xyXG4gICAgICAgIGlkZW50aXR5QWNjb3VudERhdGEucHJvdmlzaW9uaW5nVGFyZ2V0cyA9IHByb3Zpc2lvbmluZ1RhcmdldERhdGE7XHJcbiAgICAgICAgaWRlbnRpdHlBY2NvdW50ID0gbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihpZGVudGl0eUFjY291bnREYXRhKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24obnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Nsb25lcyBpdHNlbGYgLi4uIGxpa2UgYSB2aXJ1cyAuLi4gYW4gYXdlc29tZSBhY2NvdW50IHNlbGVjdGlvbiB2aXJ1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbG9uZWQgPSBpZGVudGl0eUFjY291bnQuY2xvbmUoKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldElkZW50aXR5SWQoKSkudG9FcXVhbChpZGVudGl0eUFjY291bnQuZ2V0SWRlbnRpdHlJZCgpKTtcclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldElkZW50aXR5TmFtZSgpKS50b0VxdWFsKGlkZW50aXR5QWNjb3VudC5nZXRJZGVudGl0eU5hbWUoKSk7XHJcblxyXG4gICAgICAgIC8vIFRoZXNlIGFyZSBkaWZmZXJlbnQgb2JqZWN0cy5cclxuICAgICAgICBleHBlY3QoY2xvbmVkLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKSkubm90LnRvQmUoaWRlbnRpdHlBY2NvdW50LmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKSk7XHJcbiAgICAgICAgZXhwZWN0KGNsb25lZC5nZXRQcm92aXNpb25pbmdUYXJnZXRzKCkubGVuZ3RoKS50b0VxdWFsKGlkZW50aXR5QWNjb3VudC5nZXRQcm92aXNpb25pbmdUYXJnZXRzKCkubGVuZ3RoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFuIGlkZW50aXR5SWQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2NvdW50LmdldElkZW50aXR5SWQoKSkudG9FcXVhbChpZGVudGl0eUFjY291bnREYXRhLmlkZW50aXR5SWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYW4gaWRlbnRpdHlOYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjb3VudC5nZXRJZGVudGl0eU5hbWUoKSkudG9FcXVhbChpZGVudGl0eUFjY291bnREYXRhLmlkZW50aXR5TmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBwcm92aXNpb25pbmdUYXJnZXRzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldHMgPSBpZGVudGl0eUFjY291bnQuZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpO1xyXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkodGFyZ2V0cykpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QodGFyZ2V0c1swXSBpbnN0YW5jZW9mIFByb3Zpc2lvbmluZ1RhcmdldCkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGV4cGVjdCh0YXJnZXRzWzFdIGluc3RhbmNlb2YgUHJvdmlzaW9uaW5nVGFyZ2V0KS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgZXhwZWN0KHRhcmdldHNbMl0gaW5zdGFuY2VvZiBQcm92aXNpb25pbmdUYXJnZXQpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBleHBlY3QodGFyZ2V0c1szXSBpbnN0YW5jZW9mIFByb3Zpc2lvbmluZ1RhcmdldCkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2FkZHMgcHJvdmlzaW9uaW5nIHRhcmdldHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbmV3VGFyZ2V0ID0gbmV3IFByb3Zpc2lvbmluZ1RhcmdldCh7IGFwcGxpY2F0aW9uSWQ6ICdnZXREb3duV2l0WW9CYWRTZWxmJyB9KTtcclxuICAgICAgICBpZGVudGl0eUFjY291bnQuYWRkUHJvdmlzaW9uaW5nVGFyZ2V0KG5ld1RhcmdldCk7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjb3VudC5nZXRQcm92aXNpb25pbmdUYXJnZXRzKCkuaW5kZXhPZihuZXdUYXJnZXQpID4gLTEpLnRvQmVUcnV0aHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhbGxUYXJnZXRzSGF2ZVNlbGVjdGlvbnMoKScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBtb2NrIFByb3Zpc2lvbmluZ1RhcmdldCB3aXRoIG9yIHdpdGhvdXQgYSBzZWxlY3Rpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhhc1NlbGVjdGlvbiAgV2hldGhlciB0aGUgdGFyZ2V0IHNob3VsZCBoYXZlIGEgc2VsZWN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBBIG1vY2sgUHJvdmlzaW9uaW5nVGFyZ2V0IHdpdGggaGFzU2VsZWN0aW9uKCkgc3R1YmJlZCBvdXQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KGhhc1NlbGVjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaGFzU2VsZWN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzU2VsZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbGwgdGFyZ2V0cyBoYXZlIHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlBY2NvdW50LnByb3Zpc2lvbmluZ1RhcmdldHMgPSBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQodHJ1ZSlcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjb3VudC5hbGxUYXJnZXRzSGF2ZVNlbGVjdGlvbnMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZmlyc3QgdGFyZ2V0IGRvZXMgbm90IGhhdmUgYSBzZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlBY2NvdW50LnByb3Zpc2lvbmluZ1RhcmdldHMgPSBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KHRydWUpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eUFjY291bnQuYWxsVGFyZ2V0c0hhdmVTZWxlY3Rpb25zKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBsYXN0IHRhcmdldCBkb2VzIG5vdCBoYXZlIGEgc2VsZWN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5QWNjb3VudC5wcm92aXNpb25pbmdUYXJnZXRzID0gW1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KHRydWUpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KGZhbHNlKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2NvdW50LmFsbFRhcmdldHNIYXZlU2VsZWN0aW9ucygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gdGFyZ2V0cyBoYXZlIHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlBY2NvdW50LnByb3Zpc2lvbmluZ1RhcmdldHMgPSBbXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KGZhbHNlKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2NvdW50LmFsbFRhcmdldHNIYXZlU2VsZWN0aW9ucygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdtZXJnZUFjY291bnRTZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbDEsIHNlbDIsIGFjY3RTZWxEYXRhLCBleGlzdGluZ1NlbGVjdGlvbnM7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICAgICBhY2N0U2VsRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjE7XHJcbiAgICAgICAgICAgIHNlbDEgPSBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjEpO1xyXG4gICAgICAgICAgICBzZWwyID0gbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04yKTtcclxuICAgICAgICAgICAgZXhpc3RpbmdTZWxlY3Rpb25zID0gWyBzZWwxIF07XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3RoaW5nIHdpdGggbnVsbCBuZXdTZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXJnZWQgPSBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24ubWVyZ2VBY2NvdW50U2VsZWN0aW9ucyhleGlzdGluZ1NlbGVjdGlvbnMsIG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3QoZXhpc3RpbmdTZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lcmdlZCkudG9FcXVhbChleGlzdGluZ1NlbGVjdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3RoaW5nIHdpdGggZW1wdHkgbmV3U2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbWVyZ2VkID0gSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLm1lcmdlQWNjb3VudFNlbGVjdGlvbnMoZXhpc3RpbmdTZWxlY3Rpb25zLCBbXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ1NlbGVjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWVyZ2VkKS50b0VxdWFsKGV4aXN0aW5nU2VsZWN0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhZGRzIGEgbmV3IHNlbGVjdGlvbiB3aGVuIGFuIGV4aXN0aW5nIHNlbGVjdGlvbiBpcyBub3QgZm91bmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1lcmdlZCA9IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbi5tZXJnZUFjY291bnRTZWxlY3Rpb25zKGV4aXN0aW5nU2VsZWN0aW9ucywgWyBzZWwyIF0pO1xyXG4gICAgICAgICAgICBleHBlY3QoZXhpc3RpbmdTZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lcmdlZC5pbmRleE9mKHNlbDIpID4gLTEpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCB0aGF0IG1lcmdpbmcgYSBtYXRjaGluZyBpZGVudGl0eSBzZWxlY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlzaW9uaW5nIHRhcmdldFxyXG4gICAgICAgICAqIGRhdGEgYWRkcyBhIG5ldyBwcm92aXNpb25pbmcgdGFyZ2V0IHRvIHRoZSBleGlzdGluZyB0YXJnZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0RGF0YSAgRGF0YSB0byBiZSB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgcHJvdmlzaW9uaW5nIHRhcmdldC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0QWRkTmV3VGFyZ2V0KHRhcmdldERhdGEpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0FjY3RTZWxEYXRhID0gYW5ndWxhci5jb3B5KGFjY3RTZWxEYXRhKSxcclxuICAgICAgICAgICAgICAgIG5ld0FjY3RTZWwsIG1lcmdlZCwgbmV3VGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgbmV3QWNjdFNlbERhdGEucHJvdmlzaW9uaW5nVGFyZ2V0cyA9IFsgdGFyZ2V0RGF0YSBdO1xyXG5cclxuICAgICAgICAgICAgbmV3QWNjdFNlbCA9IG5ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24obmV3QWNjdFNlbERhdGEpO1xyXG4gICAgICAgICAgICBuZXdUYXJnZXQgPSBuZXdBY2N0U2VsLmdldFByb3Zpc2lvbmluZ1RhcmdldHMoKVswXTtcclxuICAgICAgICAgICAgbWVyZ2VkID0gSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLm1lcmdlQWNjb3VudFNlbGVjdGlvbnMoZXhpc3RpbmdTZWxlY3Rpb25zLCBbIG5ld0FjY3RTZWwgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgbGlzdCBzaG91bGRuJ3QgZ3JvdyAtIGl0IHNob3VsZCBiZSBhZGRlZCB0byB0aGUgZXhpc3Rpbmcgc2VsZWN0aW9uLlxyXG4gICAgICAgICAgICBleHBlY3QobWVyZ2VkLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lcmdlZFswXS5nZXRQcm92aXNpb25pbmdUYXJnZXRzKCkuaW5kZXhPZihuZXdUYXJnZXQpID4gLTEpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdhZGRzIGEgbmV3IHRhcmdldCB3aGVuIGFuIGV4aXN0aW5nIHRhcmdldCBhcHAgaXMgbm90IGZvdW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RBZGROZXdUYXJnZXQoe1xyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJ2l0c0FGZXN0aXZ1c01pcmFjbGUnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQSBGZXN0aXZ1cyBmb3IgdGhlIHJlc3Qgb2YgdXMnLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dDcmVhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudEluZm9zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAndGVkc0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAndGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZCBUYWN1bGFyJ1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhZGRzIGEgbmV3IHRhcmdldCB3aGVuIGFuIGV4aXN0aW5nIHRhcmdldCByb2xlIGlzIG5vdCBmb3VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0RGF0YSA9IGFuZ3VsYXIuY29weShhY2N0U2VsRGF0YS5wcm92aXNpb25pbmdUYXJnZXRzWzBdKTtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YS5yb2xlTmFtZSA9ICdhaXJpbmdPZkdyaWV2YW5jZXMnO1xyXG4gICAgICAgICAgICB0ZXN0QWRkTmV3VGFyZ2V0KHRhcmdldERhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgYWRkIGEgdGFyZ2V0IGlmIGl0IGFscmVhZHkgZXhpc3RzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXJnZWQgPSBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24ubWVyZ2VBY2NvdW50U2VsZWN0aW9ucyhleGlzdGluZ1NlbGVjdGlvbnMsIFsgc2VsMSBdKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lcmdlZC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZmluZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhY2N0U2VsMkRhdGEsIFByb3Zpc2lvbmluZ1RhcmdldCwgdGFyZ2V0LCBhY2N0U2VsMjtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1Byb3Zpc2lvbmluZ1RhcmdldF8sIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICAgICBQcm92aXNpb25pbmdUYXJnZXQgPSBfUHJvdmlzaW9uaW5nVGFyZ2V0XztcclxuICAgICAgICAgICAgdGFyZ2V0ID0gaWRlbnRpdHlBY2NvdW50LnByb3Zpc2lvbmluZ1RhcmdldHNbMF07XHJcbiAgICAgICAgICAgIGFjY3RTZWwyRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjI7XHJcbiAgICAgICAgICAgIGFjY3RTZWwyID0gbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihhY2N0U2VsMkRhdGEpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiBhY2NvdW50IHNlbGVjdGlvbnMgaXMgbnVsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZm91bmQgPSBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24uZmluZChudWxsLCBpZGVudGl0eUFjY291bnQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZCkudG9CZU51bGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiBhIG1hdGNoaW5nIGFjY291bnQgc2VsZWN0aW9uIGlzIG5vdCBmb3VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IFsgaWRlbnRpdHlBY2NvdW50IF0sXHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbi5maW5kKHNlbGVjdGlvbnMsIGFjY3RTZWwyLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICBleHBlY3QoZm91bmQpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgcHJvdmlzaW9uaW5nIHRhcmdldCBoYXMgYSBkaWZmZXJlbnQgYXBwbGljYXRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbIGlkZW50aXR5QWNjb3VudCBdLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0MiA9IG5ldyBQcm92aXNpb25pbmdUYXJnZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICdzb21lT3RoZXJBcHBJZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdCb3NzJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbi5maW5kKHNlbGVjdGlvbnMsIGlkZW50aXR5QWNjb3VudCwgdGFyZ2V0Mik7XHJcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZCkudG9CZU51bGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiBwcm92aXNpb25pbmcgdGFyZ2V0IGhhcyBhIGRpZmZlcmVudCByb2xlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25zID0gWyBpZGVudGl0eUFjY291bnQgXSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDIgPSBuZXcgUHJvdmlzaW9uaW5nVGFyZ2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnYXBwSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnTm90U3VjaEFCb3NzJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmb3VuZCA9IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbi5maW5kKHNlbGVjdGlvbnMsIGlkZW50aXR5QWNjb3VudCwgdGFyZ2V0Mik7XHJcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZCkudG9CZU51bGwoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYSBjbG9uZWQgYWNjb3VudCBzZWxlY3Rpb24gd2hlbiBhIG1hdGNoIGlzIGZvdW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25zID0gWyBpZGVudGl0eUFjY291bnQgXSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDIgPSBpZGVudGl0eUFjY291bnQucHJvdmlzaW9uaW5nVGFyZ2V0c1swXSxcclxuICAgICAgICAgICAgICAgIGZvdW5kO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlBY2NvdW50LCAnY2xvbmUnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgICAgIGZvdW5kID0gSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLmZpbmQoc2VsZWN0aW9ucywgaWRlbnRpdHlBY2NvdW50LCB0YXJnZXQyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjb3VudC5jbG9uZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBjaGVja0ZvdW5kQWNjb3VudFNlbGVjdGlvbihmb3VuZCwgaWRlbnRpdHlBY2NvdW50LmdldElkZW50aXR5SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Mi5hcHBsaWNhdGlvbklkLCB0YXJnZXQyLnJvbGVOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgYSBjbG9uZWQgYWNjb3VudCBzZWxlY3Rpb24gaW4gYSBsaXN0IHdpdGggbXVsdGlwbGUgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IFsgaWRlbnRpdHlBY2NvdW50LCBhY2N0U2VsMiBdLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0MiA9IGFjY3RTZWwyLnByb3Zpc2lvbmluZ1RhcmdldHNbMV0sXHJcbiAgICAgICAgICAgICAgICBmb3VuZDtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGFjY3RTZWwyLCAnY2xvbmUnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgICAgIGZvdW5kID0gSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLmZpbmQoc2VsZWN0aW9ucywgYWNjdFNlbDIsIHRhcmdldDIpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjdFNlbDIuY2xvbmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgY2hlY2tGb3VuZEFjY291bnRTZWxlY3Rpb24oZm91bmQsIGFjY3RTZWwyLmdldElkZW50aXR5SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Mi5hcHBsaWNhdGlvbklkLCB0YXJnZXQyLnJvbGVOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tGb3VuZEFjY291bnRTZWxlY3Rpb24oZm91bmQsIGlkZW50aXR5SWQsIGFwcElkLCByb2xlTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZm91bmRUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoZm91bmQpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZm91bmQuZ2V0SWRlbnRpdHlJZCgpKS50b0VxdWFsKGlkZW50aXR5SWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoZm91bmQuZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZm91bmRUYXJnZXQgPSBmb3VuZC5nZXRQcm92aXNpb25pbmdUYXJnZXRzKClbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZFRhcmdldC5hcHBsaWNhdGlvbklkKS50b0VxdWFsKGFwcElkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZvdW5kVGFyZ2V0LnJvbGVOYW1lKS50b0VxdWFsKHJvbGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
