System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationItem', function () {

                beforeEach(module(certificationModule));

                var CertificationItem, CertificationDecisionStatus, certificationTestData;

                beforeEach(inject(function (_CertificationItem_, _CertificationDecisionStatus_, _certificationTestData_) {
                    CertificationItem = _CertificationItem_;
                    CertificationDecisionStatus = _CertificationDecisionStatus_;
                    certificationTestData = _certificationTestData_;
                }));

                function createItem(idx, overrides) {
                    var data = angular.copy(certificationTestData.CERT_ITEMS[idx]);
                    if (overrides) {
                        angular.extend(data, overrides);
                    }
                    return new CertificationItem(data);
                }

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = certificationTestData.CERT_ITEMS[1],
                            test = new CertificationItem(data);

                        expect(test.id).toEqual(data.id);
                        expect(test.type).toEqual(data.type);
                        expect(test.subType).toEqual(data.subType);
                        expect(test.typeMessageKey).toEqual(data.typeMessageKey);
                        expect(test.displayName).toEqual(data.displayName);
                        expect(test.description).toEqual(data.description);
                        expect(test.decisionStatus).toEqual(new CertificationDecisionStatus(data.decisionStatus));
                        expect(test.entityId).toEqual(data.entityId);
                        expect(test.policyViolation.policy.name).toEqual(data.policyViolationDTO.policy.name);
                        expect(test.policyViolation.rule).toEqual(data.policyViolationDTO.rule);
                        expect(test.policyViolation.owner.name).toEqual(data.policyViolationDTO.owner.name);
                        expect(test.policyViolation.policy.description).toEqual(data.policyViolationDTO.policy.description);
                        expect(test.policyViolation.policy.ruleDescription).toEqual(data.policyViolationDTO.policy.ruleDescription);
                        expect(test.policyViolation.sodConflict).toEqual(data.policyViolationDTO.sodConflict);
                        expect(test.policyViolation.statusDisplayValue).toEqual(data.policyViolationDTO.statusDisplayValue);
                        expect(test.policyViolation.summary).toEqual(data.policyViolationDTO.summary);
                        expect(test.policyViolation.applicationName).toEqual(data.policyViolationDTO.applicationName);
                        expect(test.policyViolation.accountName).toEqual(data.policyViolationDTO.accountName);
                        expect(test.policyViolation.compensatingControl).toEqual(data.policyViolationDTO.compensatingControl);
                        expect(test.policyViolation.remediationAdvice).toEqual(data.policyViolationDTO.remediationAdvice);
                        expect(test.policyViolation.scoreWeight).toEqual(data.policyViolationDTO.scoreWeight);
                        expect(test.summaryStatus).toEqual(data.summaryStatus);
                        expect(test.attributes).toEqual(data.attributes);
                        expect(test.challengeHistory.owner).toEqual(data.challengeOwnerName);
                        expect(test.challengeHistory.challengeComment).toEqual(data.challengeComment);
                        expect(test.challengeHistory.decision).toEqual(data.challengeDecision);
                        expect(test.challengeHistory.decisionComment).toEqual(data.challengeDecisionComment);
                        expect(test.challengeHistory.deciderName).toEqual(data.challengeDeciderName);
                        expect(test.delegation.completionComments).toEqual(data.delegationCompletionComments);
                        expect(test.delegation.completionUser).toEqual(data.delegationCompletionUser);
                        expect(test.policyViolations).toEqual(data.policyViolations);
                        expect(test.accountStatusIcons).toEqual(data.accountStatusIcons);
                        expect(test.groupAttribute).toEqual(false);
                    });

                    it('should initialize account info', function () {
                        var data = certificationTestData.CERT_ITEMS[0],
                            test = new CertificationItem(data);
                        expect(test.application).toEqual(data.application);
                        expect(test.nativeIdentity).toEqual(data.nativeIdentity);
                        expect(test.instance).toEqual(data.instance);
                        expect(test.groupAttribute).toEqual(data.groupAttribute);
                    });

                    it('should initialize role application and account info', function () {
                        var data = certificationTestData.CERT_ITEMS[1],
                            test = new CertificationItem(data);
                        expect(test.roleApplications).toEqual(data.roleApplications);
                        expect(test.roleAccountNames).toEqual(data.roleAccountNames);
                    });

                    it('should throw with no config data', function () {
                        expect(function () {
                            new CertificationItem();
                        }).toThrow();
                    });
                });

                describe('isPolicyViolation()', function () {
                    it('returns true for a policy violation', function () {
                        var item = createItem(0, { type: CertificationItem.Type.PolicyViolation });
                        expect(item.isPolicyViolation()).toEqual(true);
                    });

                    it('returns false for a non-policy violation', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception });
                        expect(item.isPolicyViolation()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isPolicyViolation()).toEqual(false);
                    });
                });

                describe('isRole()', function () {
                    it('returns true for a role', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Bundle });
                        expect(item.isRole()).toEqual(true);
                    });

                    it('returns false for a non-role', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception });
                        expect(item.isRole()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isRole()).toEqual(false);
                    });
                });

                describe('isException()', function () {
                    it('returns true for a exception', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception });
                        expect(item.isException()).toEqual(true);
                    });

                    it('returns false for a non-exception', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Bundle });
                        expect(item.isException()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isException()).toEqual(false);
                    });
                });

                describe('isAccount()', function () {
                    it('returns true for account type', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Account });
                        expect(item.isAccount()).toEqual(true);
                    });

                    it('returns false for a non-account type', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Bundle });
                        expect(item.isAccount()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isAccount()).toEqual(false);
                    });
                });

                describe('isAssignedRole()', function () {
                    it('returns true for an assigned role', function () {
                        var item = createItem(0, { subType: CertificationItem.SubType.AssignedRole });
                        expect(item.isAssignedRole()).toEqual(true);
                    });

                    it('returns false for a non-assigned role', function () {
                        var item = createItem(0, { type: CertificationItem.Entitlement });
                        expect(item.isAssignedRole()).toEqual(false);
                    });

                    it('returns false when sub type is null', function () {
                        var item = createItem(0, { subType: null });
                        expect(item.isAssignedRole()).toEqual(false);
                    });
                });

                describe('isRoleProfile', function () {
                    it('returns true for a role profile', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleProfile });
                        expect(item.isRoleProfile()).toEqual(true);
                    });

                    it('returns false for a non-role profile cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Entitlement });
                        expect(item.isRoleProfile()).toEqual(false);
                    });
                });

                describe('isEntitlementOwner()', function () {
                    it('returns true for an entitlement owner', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner });
                        expect(item.isEntitlementOwner()).toEqual(true);
                    });

                    it('returns false for a non-entitlement owner', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception });
                        expect(item.isEntitlementOwner()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isEntitlementOwner()).toEqual(false);
                    });
                });

                describe('isAccountGroupMembership()', function () {
                    it('returns true for an account group membership', function () {
                        var item = createItem(0, { type: CertificationItem.Type.AccountGroupMembership });
                        expect(item.isAccountGroupMembership()).toEqual(true);
                    });

                    it('returns false for a non-account group membership', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner });
                        expect(item.isAccountGroupMembership()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isAccountGroupMembership()).toEqual(false);
                    });
                });

                describe('isRoleCompRoleItem()', function () {
                    it('returns true for inherited role of role composition cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleHierarchy });
                        expect(item.isRoleCompRoleItem()).toEqual(true);
                    });

                    it('returns true for required role of role composition cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleRequirement });
                        expect(item.isRoleCompRoleItem()).toEqual(true);
                    });

                    it('returns true for permitted role of role composition cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRolePermit });
                        expect(item.isRoleCompRoleItem()).toEqual(true);
                    });

                    it('returns false for non-role role composition cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleProfile });
                        expect(item.isRoleCompRoleItem()).toEqual(false);
                    });

                    it('returns false when type is null', function () {
                        var item = createItem(0, { type: null });
                        expect(item.isRoleCompRoleItem()).toEqual(false);
                    });
                });

                describe('getComments()', function () {
                    it('returns blank string when no comment is found', function () {
                        var item = createItem(0);
                        expect(item.getComments()).toBe(' ');
                    });

                    it('returns completion comment', function () {
                        var comments = { attributes: { comments: { challengeCompletionComments: 'fuzzy wuzzy' } } },
                            item = createItem(0, comments);
                        expect(item.getComments()).toBe(comments.attributes.comments.challengeCompletionComments);
                    });

                    it('returns delegation comment', function () {
                        var comments = { attributes: { comments: { delegationComments: 'fuzzy wuzzy was hungry' } } },
                            item = createItem(0, comments);
                        expect(item.getComments()).toBe(comments.attributes.comments.delegationComments);
                    });
                });

                describe('matchesAccount()', function () {
                    function testMatchesAccount(item1, item2, isMatch) {
                        var certItem1 = new CertificationItem(item1),
                            certItem2 = new CertificationItem(item2);
                        expect(certItem1.matchesAccount(certItem2)).toEqual(isMatch);
                    }
                    it('returns false if applications do not match', function () {
                        testMatchesAccount({
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, {
                            application: 'DifferentApp',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, false);
                    });

                    it('returns false if nativeIdentity does not match', function () {
                        testMatchesAccount({
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, {
                            application: 'App1',
                            nativeIdentity: 'NewAccount',
                            instance: 'Instance1'
                        }, false);
                    });

                    it('returns false if instance does not match', function () {
                        testMatchesAccount({
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, {
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'SomeOtherInstance'
                        }, false);
                    });

                    it('returns true if all three account properties match', function () {
                        testMatchesAccount({
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, {
                            application: 'App1',
                            nativeIdentity: 'Account1',
                            instance: 'Instance1'
                        }, true);
                    });
                });

                describe('isGroupAttributeException', function () {
                    it('should return true for exception items that are group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception, groupAttribute: true });
                        expect(item.isGroupAttributeException()).toEqual(true);
                    });
                    it('should return false for exception items that are not group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception, groupAttribute: false });
                        expect(item.isGroupAttributeException()).toEqual(false);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Account, groupAttribute: true });
                        expect(item.isGroupAttributeException()).toEqual(false);
                    });
                });

                describe('notGroupAttributeException', function () {
                    it('should return true for exception items that is not group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception, groupAttribute: false });
                        expect(item.notGroupAttributeException()).toEqual(true);
                    });
                    it('should return false for exception items that are group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Exception, groupAttribute: true });
                        expect(item.notGroupAttributeException()).toEqual(false);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Account, groupAttribute: true });
                        expect(item.notGroupAttributeException()).toEqual(false);
                    });
                });

                describe('isDataOwnerGroupAttribute', function () {
                    it('should return true for dataowner items that are group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner, groupAttribute: true });
                        expect(item.isDataOwnerGroupAttribute()).toEqual(true);
                    });
                    it('should return false for dataowner items that are not group attributes', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner, groupAttribute: false });
                        expect(item.isDataOwnerGroupAttribute()).toEqual(false);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.Account, groupAttribute: true });
                        expect(item.isDataOwnerGroupAttribute()).toEqual(false);
                    });
                });

                describe('isRoleCompRoleItem', function () {
                    it('should return true for role comp role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleHierarchy });
                        expect(item.isRoleCompRoleItem()).toEqual(true);
                    });
                    it('should return false for role comp non-role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleProfile });
                        expect(item.isRoleCompRoleItem()).toEqual(false);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner });
                        expect(item.isRoleCompRoleItem()).toEqual(false);
                    });
                });

                describe('isRoleCompNonRoleItem', function () {
                    it('should return true for role comp non-role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleProfile });
                        expect(item.isRoleCompNonRoleItem()).toEqual(true);
                    });
                    it('should return false for role comp role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleHierarchy });
                        expect(item.isRoleCompNonRoleItem()).toEqual(false);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner });
                        expect(item.isRoleCompNonRoleItem()).toEqual(false);
                    });
                });

                describe('isRoleCompItem', function () {
                    it('should return true for role comp non-role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleProfile });
                        expect(item.isRoleCompItem()).toEqual(true);
                    });
                    it('should return true for role comp role cert item', function () {
                        var item = createItem(0, { type: CertificationItem.Type.BusinessRoleHierarchy });
                        expect(item.isRoleCompItem()).toEqual(true);
                    });
                    it('should return false for other items', function () {
                        var item = createItem(0, { type: CertificationItem.Type.DataOwner });
                        expect(item.isRoleCompItem()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7OztJQUc3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHFCQUFxQixZQUFXOztnQkFFckMsV0FBVyxPQUFPOztnQkFFbEIsSUFBSSxtQkFBbUIsNkJBQTZCOztnQkFFcEQsV0FBVyxPQUFPLFVBQVMscUJBQXFCLCtCQUErQix5QkFBeUI7b0JBQ3BHLG9CQUFvQjtvQkFDcEIsOEJBQThCO29CQUM5Qix3QkFBd0I7OztnQkFHNUIsU0FBUyxXQUFXLEtBQUssV0FBVztvQkFDaEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsV0FBVztvQkFDekQsSUFBSSxXQUFXO3dCQUNYLFFBQVEsT0FBTyxNQUFNOztvQkFFekIsT0FBTyxJQUFJLGtCQUFrQjs7O2dCQUdqQyxTQUFTLFFBQVEsWUFBVztvQkFDeEIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxPQUFPLHNCQUFzQixXQUFXOzRCQUN4QyxPQUFPLElBQUksa0JBQWtCOzt3QkFFakMsT0FBTyxLQUFLLElBQUksUUFBUSxLQUFLO3dCQUM3QixPQUFPLEtBQUssTUFBTSxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sS0FBSyxTQUFTLFFBQVEsS0FBSzt3QkFDbEMsT0FBTyxLQUFLLGdCQUFnQixRQUFRLEtBQUs7d0JBQ3pDLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLEtBQUssZ0JBQWdCLFFBQVEsSUFBSSw0QkFBNEIsS0FB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a0JBQWtCLEtBQUs7d0JBQ3hELE9BQU8sS0FBSyx5QkFBeUIsUUFBUTs7b0JBRWpELEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLElBQUksT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixLQUFLO3dCQUN4RCxPQUFPLEtBQUsseUJBQXlCLFFBQVE7Ozs7Z0JBSXJELFNBQVMsa0JBQWtCLFlBQU07b0JBQzdCLEdBQUcsdURBQXVELFlBQU07d0JBQzVELElBQUksT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixLQUFLO3dCQUN4RCxPQUFPLEtBQUssa0JBQWtCLFFBQVE7O29CQUUxQyxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsS0FBSzt3QkFDeEQsT0FBTyxLQUFLLGtCQUFrQixRQUFROztvQkFFMUMsR0FBRyx1Q0FBdUMsWUFBTTt3QkFDNUMsSUFBSSxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU0sa0JBQWtCLEtBQUs7d0JBQ3hELE9BQU8sS0FBSyxrQkFBa0IsUUFBUTs7Ozs7O0dBUS9DIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkl0ZW1UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uSXRlbScsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgdmFyIENlcnRpZmljYXRpb25JdGVtLCBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMsIGNlcnRpZmljYXRpb25UZXN0RGF0YTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9DZXJ0aWZpY2F0aW9uSXRlbV8sIF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXNfLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXykge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cyA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXNfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKGlkeCwgb3ZlcnJpZGVzKSB7XG4gICAgICAgIGxldCBkYXRhID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TW2lkeF0pO1xuICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChkYXRhLCBvdmVycmlkZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oZGF0YSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1sxXSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5pZCkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnR5cGUpLnRvRXF1YWwoZGF0YS50eXBlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnN1YlR5cGUpLnRvRXF1YWwoZGF0YS5zdWJUeXBlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnR5cGVNZXNzYWdlS2V5KS50b0VxdWFsKGRhdGEudHlwZU1lc3NhZ2VLZXkpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGlzcGxheU5hbWUpLnRvRXF1YWwoZGF0YS5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZXNjcmlwdGlvbikudG9FcXVhbChkYXRhLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlY2lzaW9uU3RhdHVzKS50b0VxdWFsKG5ldyBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMoZGF0YS5kZWNpc2lvblN0YXR1cykpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZW50aXR5SWQpLnRvRXF1YWwoZGF0YS5lbnRpdHlJZCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5wb2xpY3lWaW9sYXRpb24ucG9saWN5Lm5hbWUpLnRvRXF1YWwoZGF0YS5wb2xpY3lWaW9sYXRpb25EVE8ucG9saWN5Lm5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucG9saWN5VmlvbGF0aW9uLnJ1bGUpLnRvRXF1YWwoZGF0YS5wb2xpY3lWaW9sYXRpb25EVE8ucnVsZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5wb2xpY3lWaW9sYXRpb24ub3duZXIubmFtZSkudG9FcXVhbChkYXRhLnBvbGljeVZpb2xhdGlvbkRUTy5vd25lci5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5wb2xpY3kuZGVzY3JpcHRpb24pLnRvRXF1YWwoZGF0YS5wb2xpY3lWaW9sYXRpb25EVE8ucG9saWN5LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5wb2xpY3kucnVsZURlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLnBvbGljeS5ydWxlRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucG9saWN5VmlvbGF0aW9uLnNvZENvbmZsaWN0KS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLnNvZENvbmZsaWN0KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5zdGF0dXNEaXNwbGF5VmFsdWUpLnRvRXF1YWwoZGF0YS5wb2xpY3lWaW9sYXRpb25EVE8uc3RhdHVzRGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5zdW1tYXJ5KS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLnN1bW1hcnkpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucG9saWN5VmlvbGF0aW9uLmFwcGxpY2F0aW9uTmFtZSkudG9FcXVhbChkYXRhLnBvbGljeVZpb2xhdGlvbkRUTy5hcHBsaWNhdGlvbk5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucG9saWN5VmlvbGF0aW9uLmFjY291bnROYW1lKS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLmFjY291bnROYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5jb21wZW5zYXRpbmdDb250cm9sKS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLmNvbXBlbnNhdGluZ0NvbnRyb2wpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QucG9saWN5VmlvbGF0aW9uLnJlbWVkaWF0aW9uQWR2aWNlKS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9uRFRPLnJlbWVkaWF0aW9uQWR2aWNlKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnBvbGljeVZpb2xhdGlvbi5zY29yZVdlaWdodCkudG9FcXVhbChkYXRhLnBvbGljeVZpb2xhdGlvbkRUTy5zY29yZVdlaWdodCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zdW1tYXJ5U3RhdHVzKS50b0VxdWFsKGRhdGEuc3VtbWFyeVN0YXR1cyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5hdHRyaWJ1dGVzKS50b0VxdWFsKGRhdGEuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5jaGFsbGVuZ2VIaXN0b3J5Lm93bmVyKS50b0VxdWFsKGRhdGEuY2hhbGxlbmdlT3duZXJOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNoYWxsZW5nZUhpc3RvcnkuY2hhbGxlbmdlQ29tbWVudCkudG9FcXVhbChkYXRhLmNoYWxsZW5nZUNvbW1lbnQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY2hhbGxlbmdlSGlzdG9yeS5kZWNpc2lvbikudG9FcXVhbChkYXRhLmNoYWxsZW5nZURlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNoYWxsZW5nZUhpc3RvcnkuZGVjaXNpb25Db21tZW50KS50b0VxdWFsKGRhdGEuY2hhbGxlbmdlRGVjaXNpb25Db21tZW50KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNoYWxsZW5nZUhpc3RvcnkuZGVjaWRlck5hbWUpLnRvRXF1YWwoZGF0YS5jaGFsbGVuZ2VEZWNpZGVyTmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5kZWxlZ2F0aW9uLmNvbXBsZXRpb25Db21tZW50cykudG9FcXVhbChkYXRhLmRlbGVnYXRpb25Db21wbGV0aW9uQ29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGVsZWdhdGlvbi5jb21wbGV0aW9uVXNlcikudG9FcXVhbChkYXRhLmRlbGVnYXRpb25Db21wbGV0aW9uVXNlcik7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5wb2xpY3lWaW9sYXRpb25zKS50b0VxdWFsKGRhdGEucG9saWN5VmlvbGF0aW9ucyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5hY2NvdW50U3RhdHVzSWNvbnMpLnRvRXF1YWwoZGF0YS5hY2NvdW50U3RhdHVzSWNvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZ3JvdXBBdHRyaWJ1dGUpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgYWNjb3VudCBpbmZvJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1swXSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuYXBwbGljYXRpb24pLnRvRXF1YWwoZGF0YS5hcHBsaWNhdGlvbik7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5uYXRpdmVJZGVudGl0eSkudG9FcXVhbChkYXRhLm5hdGl2ZUlkZW50aXR5KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Lmluc3RhbmNlKS50b0VxdWFsKGRhdGEuaW5zdGFuY2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZ3JvdXBBdHRyaWJ1dGUpLnRvRXF1YWwoZGF0YS5ncm91cEF0dHJpYnV0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSByb2xlIGFwcGxpY2F0aW9uIGFuZCBhY2NvdW50IGluZm8nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzFdLFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5yb2xlQXBwbGljYXRpb25zKS50b0VxdWFsKGRhdGEucm9sZUFwcGxpY2F0aW9ucyk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5yb2xlQWNjb3VudE5hbWVzKS50b0VxdWFsKGRhdGEucm9sZUFjY291bnROYW1lcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBjb25maWcgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSgpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1BvbGljeVZpb2xhdGlvbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhIHBvbGljeSB2aW9sYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLlBvbGljeVZpb2xhdGlvbiB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUG9saWN5VmlvbGF0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIG5vbi1wb2xpY3kgdmlvbGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5FeGNlcHRpb24gfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1BvbGljeVZpb2xhdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0eXBlIGlzIG51bGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBudWxsIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNQb2xpY3lWaW9sYXRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzUm9sZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhIHJvbGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkJ1bmRsZSB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBub24tcm9sZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHR5cGUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IG51bGwgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRXhjZXB0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGEgZXhjZXB0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5FeGNlcHRpb24gfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0V4Y2VwdGlvbigpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBub24tZXhjZXB0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdW5kbGUgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0V4Y2VwdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiB0eXBlIGlzIG51bGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBudWxsIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNFeGNlcHRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQWNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhY2NvdW50IHR5cGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnQgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0FjY291bnQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGEgbm9uLWFjY291bnQgdHlwZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVuZGxlIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNBY2NvdW50KCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHR5cGUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IG51bGwgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0FjY291bnQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQXNzaWduZWRSb2xlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIGFzc2lnbmVkIHJvbGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyBzdWJUeXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5TdWJUeXBlLkFzc2lnbmVkUm9sZSB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzQXNzaWduZWRSb2xlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIG5vbi1hc3NpZ25lZCByb2xlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uRW50aXRsZW1lbnQgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0Fzc2lnbmVkUm9sZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBzdWIgdHlwZSBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgc3ViVHlwZTogbnVsbCB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzQXNzaWduZWRSb2xlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JvbGVQcm9maWxlJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhIHJvbGUgcHJvZmlsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVzaW5lc3NSb2xlUHJvZmlsZX0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlUHJvZmlsZSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBub24tcm9sZSBwcm9maWxlIGNlcnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLkVudGl0bGVtZW50IH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlUHJvZmlsZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0VudGl0bGVtZW50T3duZXIoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYW4gZW50aXRsZW1lbnQgb3duZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkRhdGFPd25lcn0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNFbnRpdGxlbWVudE93bmVyKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIG5vbi1lbnRpdGxlbWVudCBvd25lcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNFbnRpdGxlbWVudE93bmVyKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHR5cGUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IG51bGwgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0VudGl0bGVtZW50T3duZXIoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQWNjb3VudEdyb3VwTWVtYmVyc2hpcCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhbiBhY2NvdW50IGdyb3VwIG1lbWJlcnNoaXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnRHcm91cE1lbWJlcnNoaXB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzQWNjb3VudEdyb3VwTWVtYmVyc2hpcCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYSBub24tYWNjb3VudCBncm91cCBtZW1iZXJzaGlwJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5EYXRhT3duZXIgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0FjY291bnRHcm91cE1lbWJlcnNoaXAoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdHlwZSBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogbnVsbCB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzQWNjb3VudEdyb3VwTWVtYmVyc2hpcCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNSb2xlQ29tcFJvbGVJdGVtKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGluaGVyaXRlZCByb2xlIG9mIHJvbGUgY29tcG9zaXRpb24gY2VydCBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdXNpbmVzc1JvbGVIaWVyYXJjaHl9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZUNvbXBSb2xlSXRlbSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciByZXF1aXJlZCByb2xlIG9mIHJvbGUgY29tcG9zaXRpb24gY2VydCBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdXNpbmVzc1JvbGVSZXF1aXJlbWVudH0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlQ29tcFJvbGVJdGVtKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHBlcm1pdHRlZCByb2xlIG9mIHJvbGUgY29tcG9zaXRpb24gY2VydCBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdXNpbmVzc1JvbGVQZXJtaXR9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZUNvbXBSb2xlSXRlbSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLXJvbGUgcm9sZSBjb21wb3NpdGlvbiBjZXJ0IGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkJ1c2luZXNzUm9sZVByb2ZpbGUgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGVDb21wUm9sZUl0ZW0oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gdHlwZSBpcyBudWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogbnVsbCB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZUNvbXBSb2xlSXRlbSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q29tbWVudHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgYmxhbmsgc3RyaW5nIHdoZW4gbm8gY29tbWVudCBpcyBmb3VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwKTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmdldENvbW1lbnRzKCkpLnRvQmUoJyAnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgY29tcGxldGlvbiBjb21tZW50JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbW1lbnRzID0geyBhdHRyaWJ1dGVzOiB7Y29tbWVudHM6IHtjaGFsbGVuZ2VDb21wbGV0aW9uQ29tbWVudHM6ICdmdXp6eSB3dXp6eSd9fX0sXG4gICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0Q29tbWVudHMoKSlcbiAgICAgICAgICAgICAgICAudG9CZShjb21tZW50cy5hdHRyaWJ1dGVzLmNvbW1lbnRzLmNoYWxsZW5nZUNvbXBsZXRpb25Db21tZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGRlbGVnYXRpb24gY29tbWVudCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb21tZW50cyA9IHsgYXR0cmlidXRlczoge2NvbW1lbnRzOiB7ZGVsZWdhdGlvbkNvbW1lbnRzOiAnZnV6enkgd3V6enkgd2FzIGh1bmdyeSd9fX0sXG4gICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0Q29tbWVudHMoKSlcbiAgICAgICAgICAgICAgICAudG9CZShjb21tZW50cy5hdHRyaWJ1dGVzLmNvbW1lbnRzLmRlbGVnYXRpb25Db21tZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWF0Y2hlc0FjY291bnQoKScsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gdGVzdE1hdGNoZXNBY2NvdW50KGl0ZW0xLCBpdGVtMiwgaXNNYXRjaCkge1xuICAgICAgICAgICAgbGV0IGNlcnRJdGVtMSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbShpdGVtMSksXG4gICAgICAgICAgICAgICAgY2VydEl0ZW0yID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGl0ZW0yKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0SXRlbTEubWF0Y2hlc0FjY291bnQoY2VydEl0ZW0yKSkudG9FcXVhbChpc01hdGNoKTtcbiAgICAgICAgfVxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHBsaWNhdGlvbnMgZG8gbm90IG1hdGNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdE1hdGNoZXNBY2NvdW50KHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnLFxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnQWNjb3VudDEnLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnSW5zdGFuY2UxJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnRGlmZmVyZW50QXBwJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ0FjY291bnQxJyxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ0luc3RhbmNlMSdcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbmF0aXZlSWRlbnRpdHkgZG9lcyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0TWF0Y2hlc0FjY291bnQoe1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdBY2NvdW50MScsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdJbnN0YW5jZTEnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ05ld0FjY291bnQnLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnSW5zdGFuY2UxJ1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpbnN0YW5jZSBkb2VzIG5vdCBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RNYXRjaGVzQWNjb3VudCh7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ0FjY291bnQxJyxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ0luc3RhbmNlMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnLFxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnQWNjb3VudDEnLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnU29tZU90aGVySW5zdGFuY2UnXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWxsIHRocmVlIGFjY291bnQgcHJvcGVydGllcyBtYXRjaCcsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RNYXRjaGVzQWNjb3VudCh7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ0FjY291bnQxJyxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ0luc3RhbmNlMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnLFxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnQWNjb3VudDEnLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnSW5zdGFuY2UxJ1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIGV4Y2VwdGlvbiBpdGVtcyB0aGF0IGFyZSBncm91cCBhdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHt0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkV4Y2VwdGlvbiwgZ3JvdXBBdHRyaWJ1dGU6IHRydWV9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24oKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBleGNlcHRpb24gaXRlbXMgdGhhdCBhcmUgbm90IGdyb3VwIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwge3R5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uLCBncm91cEF0dHJpYnV0ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnQsIGdyb3VwQXR0cmlidXRlOiB0cnVlfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0dyb3VwQXR0cmlidXRlRXhjZXB0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdub3RHcm91cEF0dHJpYnV0ZUV4Y2VwdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgZXhjZXB0aW9uIGl0ZW1zIHRoYXQgaXMgbm90IGdyb3VwIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwge3R5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uLCBncm91cEF0dHJpYnV0ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLm5vdEdyb3VwQXR0cmlidXRlRXhjZXB0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3IgZXhjZXB0aW9uIGl0ZW1zIHRoYXQgYXJlIGdyb3VwIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwge3R5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uLCBncm91cEF0dHJpYnV0ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0ubm90R3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnQsIGdyb3VwQXR0cmlidXRlOiB0cnVlfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5ub3RHcm91cEF0dHJpYnV0ZUV4Y2VwdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNEYXRhT3duZXJHcm91cEF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgZGF0YW93bmVyIGl0ZW1zIHRoYXQgYXJlIGdyb3VwIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkRhdGFPd25lciwgZ3JvdXBBdHRyaWJ1dGU6IHRydWUgfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0RhdGFPd25lckdyb3VwQXR0cmlidXRlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3IgZGF0YW93bmVyIGl0ZW1zIHRoYXQgYXJlIG5vdCBncm91cCBhdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5EYXRhT3duZXIsIGdyb3VwQXR0cmlidXRlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzRGF0YU93bmVyR3JvdXBBdHRyaWJ1dGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnQsIGdyb3VwQXR0cmlidXRlOiB0cnVlfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc0RhdGFPd25lckdyb3VwQXR0cmlidXRlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JvbGVDb21wUm9sZUl0ZW0nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIHJvbGUgY29tcCByb2xlIGNlcnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVzaW5lc3NSb2xlSGllcmFyY2h5fSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGVDb21wUm9sZUl0ZW0oKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciByb2xlIGNvbXAgbm9uLXJvbGUgY2VydCBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdXNpbmVzc1JvbGVQcm9maWxlfSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGVDb21wUm9sZUl0ZW0oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkRhdGFPd25lcn0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlQ29tcFJvbGVJdGVtKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JvbGVDb21wTm9uUm9sZUl0ZW0nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIHJvbGUgY29tcCBub24tcm9sZSBjZXJ0IGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkJ1c2luZXNzUm9sZVByb2ZpbGV9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZUNvbXBOb25Sb2xlSXRlbSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIHJvbGUgY29tcCByb2xlIGNlcnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVzaW5lc3NSb2xlSGllcmFyY2h5fSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGVDb21wTm9uUm9sZUl0ZW0oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUl0ZW0oMCwgeyB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkRhdGFPd25lcn0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlQ29tcE5vblJvbGVJdGVtKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JvbGVDb21wSXRlbScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3Igcm9sZSBjb21wIG5vbi1yb2xlIGNlcnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVzaW5lc3NSb2xlUHJvZmlsZX0pO1xuICAgICAgICAgICAgZXhwZWN0KGl0ZW0uaXNSb2xlQ29tcEl0ZW0oKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIHJvbGUgY29tcCByb2xlIGNlcnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlSXRlbSgwLCB7IHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuQnVzaW5lc3NSb2xlSGllcmFyY2h5fSk7XG4gICAgICAgICAgICBleHBlY3QoaXRlbS5pc1JvbGVDb21wSXRlbSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIG90aGVyIGl0ZW1zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVJdGVtKDAsIHsgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5EYXRhT3duZXJ9KTtcbiAgICAgICAgICAgIGV4cGVjdChpdGVtLmlzUm9sZUNvbXBJdGVtKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
