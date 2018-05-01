System.register(['certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            angular.module(certificationModule).

            /**
             * This contains test data used by the certification tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('certificationTestData', ["CertificationActionStatus", "Icon", function (CertificationActionStatus, Icon) {
                'ngInject';

                return {
                    SCORECARD: {
                        composite: 373,
                        compensated: true,
                        scores: [{
                            categoryDisplayName: 'Catty',
                            score: 837,
                            compensatedScore: 223,
                            compensated: true
                        }, {
                            categoryDisplayName: 'Doggy',
                            score: 222,
                            compensatedScore: 222,
                            compensated: false
                        }]
                    },

                    CERTIFICATION_1: {
                        id: '124387',
                        type: 'Manager',
                        availableBulkDecisions: [{ value: 'Approved', key: 'ui_approved' }, { value: 'Remediated', key: 'ui_remediated' }, { value: 'Reassign', key: 'ui_reassign' }, { value: 'Undo', key: 'ui_undo' }],
                        certifiers: ['James.Smith'],
                        editable: true,
                        entityType: 'Identity',
                        expiration: 1454621708422,
                        name: 'Manager Access Review for James Smith',
                        nextPhaseTransition: 1454621708460,
                        phase: 'Active',
                        workItemId: 'workItemid1',
                        signOffComplete: false,
                        certificationCount: 10,
                        remediationsCompleted: 2,
                        remediationsStarted: 5,
                        completedEntities: 4,
                        totalEntities: 9,
                        itemStatusCount: {
                            counts: {
                                Bundle: {
                                    Open: 1,
                                    Delegated: 2,
                                    Returned: 3,
                                    Complete: 5,
                                    WaitingReview: 8,
                                    Challenged: 13
                                },
                                Exception: {
                                    Open: 21,
                                    Delegated: 34,
                                    Returned: 55,
                                    Complete: 89,
                                    WaitingReview: 2,
                                    Challenged: 3
                                },
                                Account: {
                                    Open: 5,
                                    Delegated: 7,
                                    Returned: 11,
                                    Complete: 13,
                                    WaitingReview: 31,
                                    Challenged: 37
                                },
                                PolicyViolation: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                DataOwner: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRoleHierarchy: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRoleRequirement: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRolePermit: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRoleProfile: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRoleGrantedCapability: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                BusinessRoleGrantedScope: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                AccountGroupMembership: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                }
                            }

                        },
                        tags: []
                    },
                    CERTIFICATION_2: {
                        id: '124387',
                        type: 'Manager',
                        availableBulkDecisions: [{ value: 'Approved', key: 'ui_approved' }, { value: 'Remediated', key: 'ui_remediated' }, { value: 'Reassign', key: 'ui_reassign' }, { value: 'Undo', key: 'ui_undo' }],
                        certifiers: ['James.Smith'],
                        entityType: 'BusinessRole',
                        editable: true,
                        expiration: 1454621708422,
                        name: 'Manager Access Review for James Smith',
                        nextPhaseTransition: 1454621708460,
                        phase: 'Active',
                        workItemId: 'workItemid1',
                        signOffComplete: true,
                        certificationCount: 10,
                        remediationsCompleted: 2,
                        remediationsStarted: 5,
                        completedEntities: 4,
                        totalEntities: 9,
                        itemStatusCount: {
                            counts: {
                                Bundle: {
                                    Open: 1,
                                    Delegated: 2,
                                    Returned: 3,
                                    Complete: 5,
                                    WaitingReview: 8,
                                    Challenged: 13
                                },
                                Exception: {
                                    Open: 21,
                                    Delegated: 34,
                                    Returned: 55,
                                    Complete: 89,
                                    WaitingReview: 2,
                                    Challenged: 3
                                },
                                Account: {
                                    Open: 5,
                                    Delegated: 7,
                                    Returned: 11,
                                    Complete: 13,
                                    WaitingReview: 31,
                                    Challenged: 37
                                },
                                PolicyViolation: {
                                    Open: 41,
                                    Delegated: 43,
                                    Returned: 47,
                                    Complete: 53,
                                    WaitingReview: 59,
                                    Challenged: 61
                                },
                                DataOwner: {
                                    Open: 67,
                                    Delegated: 71,
                                    Returned: 73,
                                    Complete: 79,
                                    WaitingReview: 83,
                                    Challenged: 87
                                }

                            }
                        },
                        tags: []
                    },
                    LIST_RESULT_CERT_1: {
                        attributes: { foobar: 'bingo' },
                        complete: true,
                        count: 2,
                        errors: ['error 1', 'error 2'],
                        failure: false,
                        metaData: {
                            totalEntitlementCount: 3
                        },
                        objects: [{
                            id: '1',
                            type: 'Manager',
                            availableBulkDecisions: [{ value: 'Approved', key: 'ui_approved' }, { value: 'Remediated', key: 'ui_remediated' }, { value: 'Reassign', key: 'ui_reassign' }, { value: 'Undo', key: 'ui_undo' }],
                            certifiers: ['James.Smith'],
                            editable: true,
                            expiration: 1454621708422,
                            name: 'Manager Access Review for James Smith',
                            nextPhaseTransition: 1454621708460,
                            phase: 'Active',
                            signOffComplete: false,
                            certificationCount: 10,
                            remediationsCompleted: 2,
                            remediationsStarted: 5,
                            tags: []
                        }, {
                            id: '2',
                            type: 'Manager',
                            availableBulkDecisions: [{ value: 'Approved', key: 'ui_approved' }, { value: 'Remediated', key: 'ui_remediated' }, { value: 'Reassign', key: 'ui_reassign' }, { value: 'Undo', key: 'ui_undo' }],
                            certifiers: ['James.Smith', 'Aaron.Nichols'],
                            editable: true,
                            expiration: 1454621708422,
                            name: 'Manager Access Review for Aaron Nichols',
                            nextPhaseTransition: 1454621708460,
                            phase: 'Active',
                            signOffComplete: false,
                            certificationCount: 10,
                            remediationsCompleted: 2,
                            remediationsStarted: 5,
                            tags: []
                        }],
                        requestID: '1234',
                        retry: false,
                        retryWait: 0,
                        status: 'success',
                        success: true,
                        warnings: ['warning 1', 'warning 2']
                    },

                    LIST_RESULT_REVOCATION_ITEMS: {
                        attributes: null,
                        complete: false,
                        count: '2',
                        errors: null,
                        failure: false,
                        metaData: null,
                        objects: [{
                            details: 'It has been described as an architectural tour de force of Wright\'s organic philosophy.',
                            expiration: '1471459822511',
                            identityName: 'Frank Lloyd Wright',
                            owner: 'Edgar J. Kaufmann',
                            requestType: 'OpenTicket',
                            requester: 'Liliane Kaufmann',
                            status: 'Open',
                            displayableName: 'Fallingwater'
                        }, {
                            details: 'Erected in 1909 Oak Park Horse Show Association',
                            expiration: '1471459822511',
                            identityName: 'Richard W. Bock',
                            owner: 'Scoville Park',
                            requestType: 'OpenTicket',
                            requester: 'Frank Lloyd Wright',
                            status: 'Open',
                            displayableName: 'Horse Show Fountain'
                        }],
                        requestID: null,
                        retry: false,
                        retryWait: '0',
                        status: 'success',
                        success: true,
                        warnings: null
                    },

                    CERT_ITEMS: [{
                        id: '1234',
                        type: 'Exception',
                        displayName: 'Some Display Name1',
                        description: 'This is a test certification item1',
                        decisionStatus: {
                            decisions: [new CertificationActionStatus({
                                name: 'Approved',
                                promptKey: 'Approved'
                            }), new CertificationActionStatus({
                                name: 'Remediated',
                                promptKey: 'Remediated'
                            })],
                            currentState: new CertificationActionStatus({ name: 'Approved' }),
                            sourceItemId: '1245',
                            parentItemDisplayNames: ['item 1 name'],
                            dependantDecisions: true,
                            delegationOwner: {
                                displayName: 'George Jetson'
                            },
                            delegationComments: 'delegation comments 1',
                            delegationDescription: 'delegation description 1'
                        },
                        summaryStatus: 'Complete',
                        attributes: {
                            firstName: 'Turd',
                            lastName: 'Ferguson',
                            targetId: '123456'
                        },
                        entityId: 'person1',
                        application: 'app1',
                        nativeIdentity: 'account1',
                        instance: 'instance1',
                        groupAttribute: true
                    }, {
                        id: '5678',
                        type: 'Bundle',
                        subType: 'AssignedRole',
                        displayName: 'Some Display Name2',
                        description: 'This is a test certification item2',
                        decisionStatus: {
                            decisions: [new CertificationActionStatus({
                                name: 'Approved',
                                promptKey: 'Approved'
                            }), new CertificationActionStatus({
                                name: 'Remediated',
                                promptKey: 'Remediated'
                            })]
                        },
                        policyViolationDTO: {
                            policy: {
                                name: 'this is a policy name',
                                description: 'this is a policy description',
                                ruleDescription: 'this is a policy rule description'
                            },
                            rule: 'this is a policy violation rule',
                            owner: {
                                name: 'this is a policy violation owner'
                            },
                            sodConflict: 'this is a policy violation conflict',
                            statusDisplayValue: 'this is a policy violation status display value',
                            summary: 'this is a policy violation summary',
                            applicationName: 'this is a policy violation application',
                            accountName: 'this is a policy violation account name',
                            compensatingControl: 'this is a policy violation compensating control',
                            remediationAdvice: 'this is a policy violation remediation advice',
                            scoreWeight: 300
                        },
                        summaryStatus: 'Complete',
                        attributes: {},
                        entityId: 'person1',
                        challengeOwnerName: 'challengeOwner',
                        challengeComment: 'i challenge this',
                        challengeDecision: 'Accept',
                        challengeDecisionComment: 'I accept this challenge',
                        challengeDeciderName: 'ChallengeDecider',
                        delegationCompletionComments: 'completed!!!',
                        delegationCompletionUser: 'The Complete-inator',
                        policyViolations: ['Violation 1', 'Violation 2'],
                        accountStatusIcons: [new Icon({
                            icon: '/ui/images/logo.png',
                            title: 'Invalid'
                        })],
                        roleApplications: 'App1, App2',
                        roleAccountNames: 'Acct1, acct2, acctx'
                    }, {
                        id: '1111',
                        type: 'Bundle',
                        subType: 'AssignedRole',
                        displayName: 'Some Display Name3',
                        description: 'This is a test certification item3',
                        decisionStatus: {
                            decisions: [new CertificationActionStatus({
                                name: 'Remediated',
                                promptKey: 'Remediated'
                            })]
                        },
                        summaryStatus: 'Complete',
                        application: 'app',
                        attribute: 'name',
                        value: 'value',
                        permission: false,
                        attributes: {},
                        entityId: 'person1'
                    }, {
                        id: '2222',
                        type: 'Bundle',
                        subType: 'AssignedRole',
                        displayName: 'Some Display Name4',
                        description: 'This is a test certification item4',
                        decisionStatus: {
                            decisions: [new CertificationActionStatus({
                                name: 'Remediated',
                                promptKey: 'Remediated'
                            })]
                        },
                        summaryStatus: 'Complete',
                        roleName: 'role1',
                        attributes: {},
                        entityId: 'person1'
                    }, {
                        id: '3333',
                        type: 'Bundle',
                        subType: 'AssignedRole',
                        displayName: 'Some Display Name5',
                        description: 'This is a test certification item5',
                        decisionStatus: {
                            decisions: [new CertificationActionStatus({
                                name: 'Remediated',
                                promptKey: 'Remediated'
                            })]
                        },
                        summaryStatus: 'Complete',
                        roleName: 'role1',
                        attributes: {},
                        entityId: 'person1',
                        unremovedRemediation: true,
                        currentMitigation: false,
                        expiredMitigation: false,
                        provisionAddsRequest: false,
                        lastMitigationDate: 1454621708422
                    }],

                    HISTORY_DATA_RESPONSE: {
                        'attributes': null,
                        'complete': true,
                        'count': 6,
                        'errors': null,
                        'failure': false,
                        'metaData': null,
                        'objects': [{
                            'status': 'Approved',
                            'actor': 'James Smith',
                            'entryDate': '1/25/16 10:38 AM',
                            'comments': null
                        }],
                        'requestID': null,
                        'retry': false,
                        'retryWait': 0,
                        'status': 'success',
                        'success': true,
                        'warnings': null
                    },

                    HISTORY_DATA: [{
                        'status': 'Approved',
                        'actor': 'James Smith',
                        'entryDate': '1/25/16 10:38 AM',
                        'comments': null
                    }, {
                        'status': null,
                        'type': 'Comment',
                        'actor': 'James Smith',
                        'entryDate': '1/25/16 10:38 AM',
                        'comments': 'My comments go here.'
                    }],

                    CERTIFICATION_ENTITY_LIST_RESULT: {
                        complete: true,
                        count: 3,
                        errors: ['error 1', 'error 2'],
                        failure: false,
                        objects: [{
                            id: '1234',
                            displayableName: 'James.Spader',
                            delegation: {
                                ownerName: 'Arch Stanton',
                                created: 1454621708422
                            }
                        }, {
                            id: '4567',
                            displayableName: 'James.Cogburn'
                        }, {
                            id: '9876',
                            displayableName: 'Jim.Rockford'
                        }],
                        requestID: '12345678',
                        retry: false,
                        retryWait: 0,
                        status: 'success',
                        success: true,
                        warnings: ['warning 1', 'warning 2']
                    },

                    CERTIFICATION_ENTITY_LIST_RESULT2: {
                        complete: true,
                        count: 3,
                        errors: ['error 1', 'error 2'],
                        failure: false,
                        objects: [{
                            id: '1234',
                            targetId: 'abcd',
                            description: 'entitlement1',
                            attribute: 'member',
                            displayableName: 'tester',
                            type: 'DataOwner',
                            certificationItemCount: 3,
                            summaryStatus: 'Open'
                        }, {
                            id: '4567',
                            targetId: 'efgh',
                            description: 'entitlement2',
                            attribute: 'member',
                            displayableName: 'admin',
                            type: 'DataOwner',
                            certificationItemCount: 5,
                            summaryStatus: 'Delegated'
                        }],
                        requestID: '12345678',
                        retry: false,
                        retryWait: 0,
                        status: 'success',
                        success: true,
                        warnings: ['warning 1', 'warning 2']
                    },

                    CERTIFICATION_SIGNED: {
                        id: '98765',
                        type: 'Manager',
                        availableBulkDecisions: [{ value: 'Approved', key: 'ui_approved' }, { value: 'Remediated', key: 'ui_remediated' }, { value: 'Reassign', key: 'ui_reassign' }, { value: 'Undo', key: 'ui_undo' }],
                        certifiers: ['James.Smith'],
                        editable: false,
                        expiration: 1454621708422,
                        name: 'Manager Access Review for James Smith',
                        nextPhaseTransition: 1454621708460,
                        phase: 'Revocation',
                        signoffs: [{
                            date: 1454621708422,
                            signer: {
                                name: 'Bob',
                                displayName: 'My Name Is Bob',
                                id: 'bobsid'
                            },
                            application: 'App1',
                            account: 'BobsAcct',
                            esigMeaning: 'I saw the sign and it opened up my eyes'
                        }],
                        certificationCount: 10,
                        remediationsCompleted: 2,
                        remediationsStarted: 5,
                        tags: []
                    },
                    REMEDIATION_ADVICE_RESULT: {
                        advice: {
                            violationConstraint: 'This is my constraint',
                            violationSummary: 'I have a story to tell you about this violation.',
                            remediationAdvice: 'FIGURE IT OUT!',
                            leftRoles: [{
                                id: 'left1',
                                name: 'left1Name',
                                displayableName: 'left1DisplayableName',
                                description: 'i am a left role',
                                selected: false,
                                certItemId: 'leftRoleCertItemId',
                                entityId: 'leftRoleEntityId',
                                status: 'Remediated'
                            }, {
                                id: 'left2',
                                name: 'left2Name',
                                displayableName: 'left2DisplayableName',
                                description: 'i am a left role too',
                                selected: false,
                                certItemId: 'leftRole2CertItemId',
                                entityId: 'leftRole2EntityId'
                            }],
                            rightRoles: [{
                                id: 'right1',
                                name: 'right1Name',
                                displayableName: 'right1DisplayableName',
                                description: 'i am a right role'
                            }]
                        },
                        summary: {
                            id: '1234',
                            enableOverrideDefaultRemediator: true,
                            defaultRemediator: {
                                name: 'Dude',
                                id: 'whatever'
                            },
                            comments: 'fix this dude',
                            remediationDetails: [{
                                application: 'App1',
                                applicationId: 'App1ID',
                                account: 'MyAcct',
                                nativeIdentity: '1234abcd',
                                attribute: 'SomeAttribute',
                                attributeValue: 'SomeValue',
                                selectOptions: [['Remove', 'remove'], ['Set', 'set']],
                                inputType: 'text',
                                editable: true,
                                existingRemediation: false,
                                operation: ['Set', 'set']
                            }],
                            remediationAction: 'OpenWorkItem'
                        }
                    },

                    POLICY_TREE_NODE: {
                        operator: 'OR',
                        children: [{
                            application: 'The World',
                            applicationId: '12345',
                            name: 'memberOf',
                            value: 'cn=upright citizens,dc=com',
                            displayValue: 'Upright Citizens',
                            description: 'The coolest of the cool',
                            permission: false,
                            selected: true,
                            status: [{
                                associatedItemId: 'certItem987',
                                associatedEntityId: 'certEntity234',
                                action: 'Approved'
                            }]
                        }, {
                            application: 'Austin',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=stealing cheating liars,dc=com',
                            displayValue: 'Stealing Cheating Liars',
                            description: 'ice cold',
                            permission: false,
                            selected: false,
                            status: null
                        }]
                    },
                    POLICY_TREE_AND_NODE: {
                        operator: 'AND',
                        children: [{
                            application: 'MyApp',
                            applicationId: '12345',
                            name: 'memberOf',
                            value: 'cn=true,dc=com',
                            displayValue: 'Some value',
                            description: 'test app',
                            permission: false,
                            selected: true,
                            status: [{
                                associatedItemId: 'certItem987',
                                associatedEntityId: 'certEntity234',
                                action: 'Remediated'
                            }]
                        }, {
                            application: 'YourApp',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=false,dc=com',
                            displayValue: 'Some other value',
                            description: 'test app',
                            permission: false,
                            selected: false,
                            status: [{
                                associatedItemId: 'certItem9871',
                                associatedEntityId: 'certEntity2341',
                                action: 'Remediated'
                            }]
                        }]
                    },
                    POLICY_TREE_AND_NODE_NO_LINE_ITEM_DECISIONS: {
                        operator: 'AND',
                        children: [{
                            application: 'MyApp',
                            applicationId: '12345',
                            name: 'memberOf',
                            value: 'cn=true,dc=com',
                            displayValue: 'Some value',
                            description: 'test app',
                            permission: false,
                            selected: true,
                            status: null
                        }, {
                            application: 'YourApp',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=false,dc=com',
                            displayValue: 'Some other value',
                            description: 'test app',
                            permission: false,
                            selected: false,
                            status: null
                        }]
                    },
                    ROLE_SNAPSHOT: {
                        attributes: {
                            accountSelectorRules: 'rule1'
                        },
                        description: 'description',
                        displayName: 'Test Role',
                        id: 'roleId1',
                        ownerDisplayName: 'Test User',
                        scopeDisplayName: 'Some Scope',
                        typeDisplayName: 'AssignOrDetect'
                    }
                };
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHNDQUFzQyxVQUFVLFNBQVM7OztJQUd0RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7OztZQU9mLFFBQVEsK0RBQXlCLFVBQVMsMkJBQTJCLE1BQU07Z0JBQ3ZFOztnQkFFQSxPQUFPO29CQUNILFdBQVc7d0JBQ1AsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLFFBQVEsQ0FBQzs0QkFDRCxxQkFBcUI7NEJBQ3JCLE9BQU87NEJBQ1Asa0JBQWtCOzRCQUNsQixhQUFhOzJCQUNkOzRCQUNDLHFCQUFxQjs0QkFDckIsT0FBTzs0QkFDUCxrQkFBa0I7NEJBQ2xCLGFBQWE7Ozs7b0JBS3pCLGlCQUFpQjt3QkFDYixJQUFJO3dCQUNKLE1BQU07d0JBQ04sd0JBQXdCLENBQUMsRUFBQyxPQUFPLFlBQVksS0FBSyxpQkFDOUMsRUFBQyxPQUFPLGNBQWMsS0FBSyxtQkFDM0IsRUFBQyxPQUFPLFlBQVksS0FBSyxpQkFDekIsRUFBQyxPQUFPLFFBQVEsS0FBSzt3QkFDekIsWUFBWSxDQUFDO3dCQUNiLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixZQUFZO3dCQUNaLE1BQU07d0JBQ04scUJBQXFCO3dCQUNyQixPQUFPO3dCQUNQLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsaUJBQWlCOzRCQUNiLFFBQVE7Z0NBQ0osUUFBUTtvQ0FDSixNQUFNO29DQUNOLFdBQVc7b0NBQ1gsVUFBVTtvQ0FDVixVQUFVO29DQUNWLGVBQWU7b0NBQ2YsWUFBWTs7Z0NBRWhCLFdBQVc7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QUNWLFFBQVE7MkJBQ1Q7NEJBQ0MsYUFBYTs0QkFDYixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxjQUFjOzRCQUNkLGFBQWE7NEJBQ2IsWUFBWTs0QkFDWixVQUFVOzRCQUNWLFFBQVE7OztvQkFHaEIsZUFBZTt3QkFDWCxZQUFZOzRCQUNSLHNCQUFzQjs7d0JBRTFCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixJQUFJO3dCQUNKLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7Ozs7OztHQTVCMUIiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uVGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkuXG5cbi8qKlxuICogVGhpcyBjb250YWlucyB0ZXN0IGRhdGEgdXNlZCBieSB0aGUgY2VydGlmaWNhdGlvbiB0ZXN0cy4gIERvbid0IG1vZGlmeSB0aGlzIGRhdGFcbiAqIGRpcmVjdGx5IGZyb20gd2l0aGluIHlvdXIgdGVzdHMuICBJZiB5b3UgbmVlZCB0byBtb2RpZnkgZGF0YSwgdXNlIGFuZ3VsYXIuY29weSgpIHRvIGNyZWF0ZSB5b3VyIG93blxuICogY29weSBiZWZvcmUgY2hhbmdpbmcgaXQuXG4gKi9cbmZhY3RvcnkoJ2NlcnRpZmljYXRpb25UZXN0RGF0YScsIGZ1bmN0aW9uKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMsIEljb24pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgU0NPUkVDQVJEOiB7XG4gICAgICAgICAgICBjb21wb3NpdGU6IDM3MyxcbiAgICAgICAgICAgIGNvbXBlbnNhdGVkOiB0cnVlLFxuICAgICAgICAgICAgc2NvcmVzOiBbe1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeURpc3BsYXlOYW1lOiAnQ2F0dHknLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogODM3LFxuICAgICAgICAgICAgICAgICAgICBjb21wZW5zYXRlZFNjb3JlOiAyMjMsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBlbnNhdGVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeURpc3BsYXlOYW1lOiAnRG9nZ3knLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogMjIyLFxuICAgICAgICAgICAgICAgICAgICBjb21wZW5zYXRlZFNjb3JlOiAyMjIsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBlbnNhdGVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcblxuICAgICAgICBDRVJUSUZJQ0FUSU9OXzE6IHtcbiAgICAgICAgICAgIGlkOiAnMTI0Mzg3JyxcbiAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VyJyxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFt7dmFsdWU6ICdBcHByb3ZlZCcsIGtleTogJ3VpX2FwcHJvdmVkJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnUmVtZWRpYXRlZCcsIGtleTogJ3VpX3JlbWVkaWF0ZWQnfSxcbiAgICAgICAgICAgICAgICB7dmFsdWU6ICdSZWFzc2lnbicsIGtleTogJ3VpX3JlYXNzaWduJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnVW5kbycsIGtleTogJ3VpX3VuZG8nfV0sXG4gICAgICAgICAgICBjZXJ0aWZpZXJzOiBbJ0phbWVzLlNtaXRoJ10sXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudGl0eVR5cGU6ICdJZGVudGl0eScsXG4gICAgICAgICAgICBleHBpcmF0aW9uOiAxNDU0NjIxNzA4NDIyLFxuICAgICAgICAgICAgbmFtZTogJ01hbmFnZXIgQWNjZXNzIFJldmlldyBmb3IgSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgbmV4dFBoYXNlVHJhbnNpdGlvbjogMTQ1NDYyMTcwODQ2MCxcbiAgICAgICAgICAgIHBoYXNlOiAnQWN0aXZlJyxcbiAgICAgICAgICAgIHdvcmtJdGVtSWQ6ICd3b3JrSXRlbWlkMScsXG4gICAgICAgICAgICBzaWduT2ZmQ29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkNvdW50OiAxMCxcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uc0NvbXBsZXRlZDogMixcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uc1N0YXJ0ZWQ6IDUsXG4gICAgICAgICAgICBjb21wbGV0ZWRFbnRpdGllczogNCxcbiAgICAgICAgICAgIHRvdGFsRW50aXRpZXM6IDksXG4gICAgICAgICAgICBpdGVtU3RhdHVzQ291bnQ6IHtcbiAgICAgICAgICAgICAgICBjb3VudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiAxM1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBFeGNlcHRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDIxLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiAzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybmVkOiA1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlOiA4OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiAzXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEFjY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogMTEsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogMTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiAzMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDM3XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFBvbGljeVZpb2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbjogNDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDQ3LFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGU6IDUzLFxuICAgICAgICAgICAgICAgICAgICAgICAgV2FpdGluZ1JldmlldzogNTksXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiA2MVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBEYXRhT3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDQxLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiA0MyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybmVkOiA0NyxcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlOiA1MyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDU5LFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbGxlbmdlZDogNjFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgQnVzaW5lc3NSb2xlSGllcmFyY2h5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA0MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiA1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDYxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEJ1c2luZXNzUm9sZVJlcXVpcmVtZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA0MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiA1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDYxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEJ1c2luZXNzUm9sZVBlcm1pdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbjogNDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDQ3LFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGU6IDUzLFxuICAgICAgICAgICAgICAgICAgICAgICAgV2FpdGluZ1JldmlldzogNTksXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiA2MVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBCdXNpbmVzc1JvbGVQcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA0MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiA1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDYxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEJ1c2luZXNzUm9sZUdyYW50ZWRDYXBhYmlsaXR5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA0MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiA1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDYxXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEJ1c2luZXNzUm9sZUdyYW50ZWRTY29wZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbjogNDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDQ3LFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGU6IDUzLFxuICAgICAgICAgICAgICAgICAgICAgICAgV2FpdGluZ1JldmlldzogNTksXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiA2MVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBBY2NvdW50R3JvdXBNZW1iZXJzaGlwOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA0MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIERlbGVnYXRlZDogNDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogNDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiA1OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDYxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWdzOiBbXVxuICAgICAgICB9LFxuICAgICAgICBDRVJUSUZJQ0FUSU9OXzI6IHtcbiAgICAgICAgICAgIGlkOiAnMTI0Mzg3JyxcbiAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VyJyxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFt7dmFsdWU6ICdBcHByb3ZlZCcsIGtleTogJ3VpX2FwcHJvdmVkJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnUmVtZWRpYXRlZCcsIGtleTogJ3VpX3JlbWVkaWF0ZWQnfSxcbiAgICAgICAgICAgICAgICB7dmFsdWU6ICdSZWFzc2lnbicsIGtleTogJ3VpX3JlYXNzaWduJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnVW5kbycsIGtleTogJ3VpX3VuZG8nfV0sXG4gICAgICAgICAgICBjZXJ0aWZpZXJzOiBbJ0phbWVzLlNtaXRoJ10sXG4gICAgICAgICAgICBlbnRpdHlUeXBlOiAnQnVzaW5lc3NSb2xlJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZXhwaXJhdGlvbjogMTQ1NDYyMTcwODQyMixcbiAgICAgICAgICAgIG5hbWU6ICdNYW5hZ2VyIEFjY2VzcyBSZXZpZXcgZm9yIEphbWVzIFNtaXRoJyxcbiAgICAgICAgICAgIG5leHRQaGFzZVRyYW5zaXRpb246IDE0NTQ2MjE3MDg0NjAsXG4gICAgICAgICAgICBwaGFzZTogJ0FjdGl2ZScsXG4gICAgICAgICAgICB3b3JrSXRlbUlkOiAnd29ya0l0ZW1pZDEnLFxuICAgICAgICAgICAgc2lnbk9mZkNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkNvdW50OiAxMCxcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uc0NvbXBsZXRlZDogMixcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uc1N0YXJ0ZWQ6IDUsXG4gICAgICAgICAgICBjb21wbGV0ZWRFbnRpdGllczogNCxcbiAgICAgICAgICAgIHRvdGFsRW50aXRpZXM6IDksXG4gICAgICAgICAgICBpdGVtU3RhdHVzQ291bnQ6IHtcbiAgICAgICAgICAgICAgICBjb3VudHM6IHtcbiAgICAgICAgICAgICAgICAgICAgQnVuZGxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiAxM1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBFeGNlcHRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDIxLFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiAzNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybmVkOiA1NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlOiA4OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiAzXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIEFjY291bnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5lZDogMTEsXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21wbGV0ZTogMTMsXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWl0aW5nUmV2aWV3OiAzMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENoYWxsZW5nZWQ6IDM3XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFBvbGljeVZpb2xhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbjogNDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWxlZ2F0ZWQ6IDQzLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmV0dXJuZWQ6IDQ3LFxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGU6IDUzLFxuICAgICAgICAgICAgICAgICAgICAgICAgV2FpdGluZ1JldmlldzogNTksXG4gICAgICAgICAgICAgICAgICAgICAgICBDaGFsbGVuZ2VkOiA2MVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBEYXRhT3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW46IDY3LFxuICAgICAgICAgICAgICAgICAgICAgICAgRGVsZWdhdGVkOiA3MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJldHVybmVkOiA3MyxcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlOiA3OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhaXRpbmdSZXZpZXc6IDgzLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbGxlbmdlZDogODdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhZ3M6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIExJU1RfUkVTVUxUX0NFUlRfMToge1xuICAgICAgICAgICAgYXR0cmlidXRlczoge2Zvb2JhcjogJ2JpbmdvJ30sXG4gICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgZXJyb3JzOiBbJ2Vycm9yIDEnLCAnZXJyb3IgMiddLFxuICAgICAgICAgICAgZmFpbHVyZTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhRGF0YToge1xuICAgICAgICAgICAgICAgIHRvdGFsRW50aXRsZW1lbnRDb3VudDogM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlQnVsa0RlY2lzaW9uczogW3t2YWx1ZTogJ0FwcHJvdmVkJywga2V5OiAndWlfYXBwcm92ZWQnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogJ1JlbWVkaWF0ZWQnLCBrZXk6ICd1aV9yZW1lZGlhdGVkJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICdSZWFzc2lnbicsIGtleTogJ3VpX3JlYXNzaWduJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWU6ICdVbmRvJywga2V5OiAndWlfdW5kbyd9XSxcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWVyczogWydKYW1lcy5TbWl0aCddLFxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJhdGlvbjogMTQ1NDYyMTcwODQyMixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ01hbmFnZXIgQWNjZXNzIFJldmlldyBmb3IgSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICBuZXh0UGhhc2VUcmFuc2l0aW9uOiAxNDU0NjIxNzA4NDYwLFxuICAgICAgICAgICAgICAgICAgICBwaGFzZTogJ0FjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHNpZ25PZmZDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25Db3VudDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uc0NvbXBsZXRlZDogMixcbiAgICAgICAgICAgICAgICAgICAgcmVtZWRpYXRpb25zU3RhcnRlZDogNSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogW11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ01hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVCdWxrRGVjaXNpb25zOiBbe3ZhbHVlOiAnQXBwcm92ZWQnLCBrZXk6ICd1aV9hcHByb3ZlZCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3ZhbHVlOiAnUmVtZWRpYXRlZCcsIGtleTogJ3VpX3JlbWVkaWF0ZWQnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogJ1JlYXNzaWduJywga2V5OiAndWlfcmVhc3NpZ24nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogJ1VuZG8nLCBrZXk6ICd1aV91bmRvJ31dLFxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpZXJzOiBbJ0phbWVzLlNtaXRoJywgJ0Fhcm9uLk5pY2hvbHMnXSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyYXRpb246IDE0NTQ2MjE3MDg0MjIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdNYW5hZ2VyIEFjY2VzcyBSZXZpZXcgZm9yIEFhcm9uIE5pY2hvbHMnLFxuICAgICAgICAgICAgICAgICAgICBuZXh0UGhhc2VUcmFuc2l0aW9uOiAxNDU0NjIxNzA4NDYwLFxuICAgICAgICAgICAgICAgICAgICBwaGFzZTogJ0FjdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHNpZ25PZmZDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25Db3VudDogMTAsXG4gICAgICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uc0NvbXBsZXRlZDogMixcbiAgICAgICAgICAgICAgICAgICAgcmVtZWRpYXRpb25zU3RhcnRlZDogNSxcbiAgICAgICAgICAgICAgICAgICAgdGFnczogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVxdWVzdElEOiAnMTIzNCcsXG4gICAgICAgICAgICByZXRyeTogZmFsc2UsXG4gICAgICAgICAgICByZXRyeVdhaXQ6IDAsXG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogWyd3YXJuaW5nIDEnLCAnd2FybmluZyAyJ11cbiAgICAgICAgfSxcblxuICAgICAgICBMSVNUX1JFU1VMVF9SRVZPQ0FUSU9OX0lURU1TOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgY291bnQ6ICcyJyxcbiAgICAgICAgICAgIGVycm9yczogbnVsbCxcbiAgICAgICAgICAgIGZhaWx1cmU6IGZhbHNlLFxuICAgICAgICAgICAgbWV0YURhdGE6IG51bGwsXG4gICAgICAgICAgICBvYmplY3RzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiAnSXQgaGFzIGJlZW4gZGVzY3JpYmVkIGFzIGFuIGFyY2hpdGVjdHVyYWwgdG91ciBkZSBmb3JjZSBvZiBXcmlnaHRcXCdzIG9yZ2FuaWMgcGhpbG9zb3BoeS4nLFxuICAgICAgICAgICAgICAgICAgICBleHBpcmF0aW9uOiAnMTQ3MTQ1OTgyMjUxMScsXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5TmFtZTogJ0ZyYW5rIExsb3lkIFdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiAnRWRnYXIgSi4gS2F1Zm1hbm4nLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VHlwZTogJ09wZW5UaWNrZXQnLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZXI6ICdMaWxpYW5lIEthdWZtYW5uJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnT3BlbicsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ0ZhbGxpbmd3YXRlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogJ0VyZWN0ZWQgaW4gMTkwOSBPYWsgUGFyayBIb3JzZSBTaG93IEFzc29jaWF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJhdGlvbjogJzE0NzE0NTk4MjI1MTEnLFxuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eU5hbWU6ICdSaWNoYXJkIFcuIEJvY2snLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogJ1Njb3ZpbGxlIFBhcmsnLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0VHlwZTogJ09wZW5UaWNrZXQnLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0ZXI6ICdGcmFuayBMbG95ZCBXcmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdPcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnSG9yc2UgU2hvdyBGb3VudGFpbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVxdWVzdElEOiBudWxsLFxuICAgICAgICAgICAgcmV0cnk6IGZhbHNlLFxuICAgICAgICAgICAgcmV0cnlXYWl0OiAnMCcsXG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIENFUlRfSVRFTVM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdFeGNlcHRpb24nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU29tZSBEaXNwbGF5IE5hbWUxJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSB0ZXN0IGNlcnRpZmljYXRpb24gaXRlbTEnLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uU3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW25ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBcHByb3ZlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgICAgICAgICAgfSksIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdSZW1lZGlhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdEtleTogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0YXRlOiBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7IG5hbWU6ICdBcHByb3ZlZCd9KSxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSXRlbUlkOiAnMTI0NScsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEl0ZW1EaXNwbGF5TmFtZXM6IFsnaXRlbSAxIG5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kYW50RGVjaXNpb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0aW9uT3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnR2VvcmdlIEpldHNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGlvbkNvbW1lbnRzOiAnZGVsZWdhdGlvbiBjb21tZW50cyAxJyxcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGlvbkRlc2NyaXB0aW9uOiAnZGVsZWdhdGlvbiBkZXNjcmlwdGlvbiAxJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VtbWFyeVN0YXR1czogJ0NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TmFtZTogJ1R1cmQnLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ0Zlcmd1c29uJyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6ICcxMjM0NTYnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbnRpdHlJZDogJ3BlcnNvbjEnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnYXBwMScsXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MScsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZTEnLFxuICAgICAgICAgICAgICAgIGdyb3VwQXR0cmlidXRlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnNTY3OCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0J1bmRsZScsXG4gICAgICAgICAgICAgICAgc3ViVHlwZTogJ0Fzc2lnbmVkUm9sZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lIERpc3BsYXkgTmFtZTInLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyBhIHRlc3QgY2VydGlmaWNhdGlvbiBpdGVtMicsXG4gICAgICAgICAgICAgICAgZGVjaXNpb25TdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FwcHJvdmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdEtleTogJ0FwcHJvdmVkJ1xuICAgICAgICAgICAgICAgICAgICB9KSwgbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1JlbWVkaWF0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfSldXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EVE86IHtcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAndGhpcyBpcyBhIHBvbGljeSBuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGhpcyBpcyBhIHBvbGljeSBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBydWxlRGVzY3JpcHRpb246ICd0aGlzIGlzIGEgcG9saWN5IHJ1bGUgZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJ1bGU6ICd0aGlzIGlzIGEgcG9saWN5IHZpb2xhdGlvbiBydWxlJyxcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0aGlzIGlzIGEgcG9saWN5IHZpb2xhdGlvbiBvd25lcidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc29kQ29uZmxpY3Q6ICd0aGlzIGlzIGEgcG9saWN5IHZpb2xhdGlvbiBjb25mbGljdCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0Rpc3BsYXlWYWx1ZTogJ3RoaXMgaXMgYSBwb2xpY3kgdmlvbGF0aW9uIHN0YXR1cyBkaXNwbGF5IHZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeTogJ3RoaXMgaXMgYSBwb2xpY3kgdmlvbGF0aW9uIHN1bW1hcnknLFxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICd0aGlzIGlzIGEgcG9saWN5IHZpb2xhdGlvbiBhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAndGhpcyBpcyBhIHBvbGljeSB2aW9sYXRpb24gYWNjb3VudCBuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgY29tcGVuc2F0aW5nQ29udHJvbDogJ3RoaXMgaXMgYSBwb2xpY3kgdmlvbGF0aW9uIGNvbXBlbnNhdGluZyBjb250cm9sJyxcbiAgICAgICAgICAgICAgICAgICAgcmVtZWRpYXRpb25BZHZpY2U6ICd0aGlzIGlzIGEgcG9saWN5IHZpb2xhdGlvbiByZW1lZGlhdGlvbiBhZHZpY2UnLFxuICAgICAgICAgICAgICAgICAgICBzY29yZVdlaWdodDogMzAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5U3RhdHVzOiAnQ29tcGxldGUnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICAgICAgICAgIGVudGl0eUlkOiAncGVyc29uMScsXG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlT3duZXJOYW1lOiAnY2hhbGxlbmdlT3duZXInLFxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZUNvbW1lbnQ6ICdpIGNoYWxsZW5nZSB0aGlzJyxcbiAgICAgICAgICAgICAgICBjaGFsbGVuZ2VEZWNpc2lvbjogJ0FjY2VwdCcsXG4gICAgICAgICAgICAgICAgY2hhbGxlbmdlRGVjaXNpb25Db21tZW50OiAnSSBhY2NlcHQgdGhpcyBjaGFsbGVuZ2UnLFxuICAgICAgICAgICAgICAgIGNoYWxsZW5nZURlY2lkZXJOYW1lOiAnQ2hhbGxlbmdlRGVjaWRlcicsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvbkNvbXBsZXRpb25Db21tZW50czogJ2NvbXBsZXRlZCEhIScsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvbkNvbXBsZXRpb25Vc2VyOiAnVGhlIENvbXBsZXRlLWluYXRvcicsXG4gICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uczogWydWaW9sYXRpb24gMScsICdWaW9sYXRpb24gMiddLFxuICAgICAgICAgICAgICAgIGFjY291bnRTdGF0dXNJY29uczogW25ldyBJY29uKHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJy91aS9pbWFnZXMvbG9nby5wbmcnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0ludmFsaWQnXG4gICAgICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgICAgIHJvbGVBcHBsaWNhdGlvbnM6ICdBcHAxLCBBcHAyJyxcbiAgICAgICAgICAgICAgICByb2xlQWNjb3VudE5hbWVzOiAnQWNjdDEsIGFjY3QyLCBhY2N0eCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMTExJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQnVuZGxlJyxcbiAgICAgICAgICAgICAgICBzdWJUeXBlOiAnQXNzaWduZWRSb2xlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgRGlzcGxheSBOYW1lMycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIGEgdGVzdCBjZXJ0aWZpY2F0aW9uIGl0ZW0zJyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFtuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdSZW1lZGlhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9KV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1bW1hcnlTdGF0dXM6ICdDb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdhcHAnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAndmFsdWUnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICAgICAgICAgIGVudGl0eUlkOiAncGVyc29uMSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICcyMjIyJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQnVuZGxlJyxcbiAgICAgICAgICAgICAgICBzdWJUeXBlOiAnQXNzaWduZWRSb2xlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgRGlzcGxheSBOYW1lNCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGlzIGlzIGEgdGVzdCBjZXJ0aWZpY2F0aW9uIGl0ZW00JyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xuICAgICAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFtuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdSZW1lZGlhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9KV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1bW1hcnlTdGF0dXM6ICdDb21wbGV0ZScsXG4gICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdyb2xlMScsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICAgICAgICAgICAgZW50aXR5SWQ6ICdwZXJzb24xJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogJzMzMzMnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdCdW5kbGUnLFxuICAgICAgICAgICAgICAgIHN1YlR5cGU6ICdBc3NpZ25lZFJvbGUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU29tZSBEaXNwbGF5IE5hbWU1JyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoaXMgaXMgYSB0ZXN0IGNlcnRpZmljYXRpb24gaXRlbTUnLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uU3RhdHVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW25ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdSZW1lZGlhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdEtleTogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VtbWFyeVN0YXR1czogJ0NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgICByb2xlTmFtZTogJ3JvbGUxJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgICAgICAgICAgICBlbnRpdHlJZDogJ3BlcnNvbjEnLFxuICAgICAgICAgICAgICAgIHVucmVtb3ZlZFJlbWVkaWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRNaXRpZ2F0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBleHBpcmVkTWl0aWdhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvdmlzaW9uQWRkc1JlcXVlc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhc3RNaXRpZ2F0aW9uRGF0ZTogMTQ1NDYyMTcwODQyMlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIEhJU1RPUllfREFUQV9SRVNQT05TRToge1xuICAgICAgICAgICAgJ2F0dHJpYnV0ZXMnOiBudWxsLFxuICAgICAgICAgICAgJ2NvbXBsZXRlJzogdHJ1ZSxcbiAgICAgICAgICAgICdjb3VudCc6IDYsXG4gICAgICAgICAgICAnZXJyb3JzJzogbnVsbCxcbiAgICAgICAgICAgICdmYWlsdXJlJzogZmFsc2UsXG4gICAgICAgICAgICAnbWV0YURhdGEnOiBudWxsLFxuICAgICAgICAgICAgJ29iamVjdHMnOiBbe1xuICAgICAgICAgICAgICAgICdzdGF0dXMnOiAnQXBwcm92ZWQnLFxuICAgICAgICAgICAgICAgICdhY3Rvcic6ICdKYW1lcyBTbWl0aCcsXG4gICAgICAgICAgICAgICAgJ2VudHJ5RGF0ZSc6ICcxLzI1LzE2IDEwOjM4IEFNJyxcbiAgICAgICAgICAgICAgICAnY29tbWVudHMnOiBudWxsXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdyZXF1ZXN0SUQnOiBudWxsLFxuICAgICAgICAgICAgJ3JldHJ5JzogZmFsc2UsXG4gICAgICAgICAgICAncmV0cnlXYWl0JzogMCxcbiAgICAgICAgICAgICdzdGF0dXMnOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAnc3VjY2Vzcyc6IHRydWUsXG4gICAgICAgICAgICAnd2FybmluZ3MnOiBudWxsXG4gICAgICAgIH0sXG5cbiAgICAgICAgSElTVE9SWV9EQVRBOiBbe1xuICAgICAgICAgICAgJ3N0YXR1cyc6ICdBcHByb3ZlZCcsXG4gICAgICAgICAgICAnYWN0b3InOiAnSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgJ2VudHJ5RGF0ZSc6ICcxLzI1LzE2IDEwOjM4IEFNJyxcbiAgICAgICAgICAgICdjb21tZW50cyc6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnc3RhdHVzJzogbnVsbCxcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdDb21tZW50JyxcbiAgICAgICAgICAgICAgICAnYWN0b3InOiAnSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgICAgICdlbnRyeURhdGUnOiAnMS8yNS8xNiAxMDozOCBBTScsXG4gICAgICAgICAgICAgICAgJ2NvbW1lbnRzJzogJ015IGNvbW1lbnRzIGdvIGhlcmUuJ1xuICAgICAgICAgICAgfV0sXG5cbiAgICAgICAgQ0VSVElGSUNBVElPTl9FTlRJVFlfTElTVF9SRVNVTFQ6IHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgY291bnQ6IDMsXG4gICAgICAgICAgICBlcnJvcnM6IFsnZXJyb3IgMScsICdlcnJvciAyJ10sXG4gICAgICAgICAgICBmYWlsdXJlOiBmYWxzZSxcbiAgICAgICAgICAgIG9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ0phbWVzLlNwYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyTmFtZTogJ0FyY2ggU3RhbnRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiAxNDU0NjIxNzA4NDIyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICc0NTY3JyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnSmFtZXMuQ29nYnVybidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICc5ODc2JyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnSmltLlJvY2tmb3JkJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZXF1ZXN0SUQ6ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICByZXRyeTogZmFsc2UsXG4gICAgICAgICAgICByZXRyeVdhaXQ6IDAsXG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICB3YXJuaW5nczogWyd3YXJuaW5nIDEnLCAnd2FybmluZyAyJ11cbiAgICAgICAgfSxcblxuICAgICAgICBDRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVDI6IHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgY291bnQ6IDMsXG4gICAgICAgICAgICBlcnJvcnM6IFsnZXJyb3IgMScsICdlcnJvciAyJ10sXG4gICAgICAgICAgICBmYWlsdXJlOiBmYWxzZSxcbiAgICAgICAgICAgIG9iamVjdHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldElkOiAnYWJjZCcsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZW50aXRsZW1lbnQxJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnbWVtYmVyJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAndGVzdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0RhdGFPd25lcicsXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtQ291bnQ6IDMsXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlTdGF0dXM6ICdPcGVuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzQ1NjcnLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZDogJ2VmZ2gnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2VudGl0bGVtZW50MicsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ21lbWJlcicsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ2FkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0RhdGFPd25lcicsXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtQ291bnQ6IDUsXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlTdGF0dXM6ICdEZWxlZ2F0ZWQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlcXVlc3RJRDogJzEyMzQ1Njc4JyxcbiAgICAgICAgICAgIHJldHJ5OiBmYWxzZSxcbiAgICAgICAgICAgIHJldHJ5V2FpdDogMCxcbiAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHdhcm5pbmdzOiBbJ3dhcm5pbmcgMScsICd3YXJuaW5nIDInXVxuICAgICAgICB9LFxuXG4gICAgICAgIENFUlRJRklDQVRJT05fU0lHTkVEOiB7XG4gICAgICAgICAgICBpZDogJzk4NzY1JyxcbiAgICAgICAgICAgIHR5cGU6ICdNYW5hZ2VyJyxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFt7dmFsdWU6ICdBcHByb3ZlZCcsIGtleTogJ3VpX2FwcHJvdmVkJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnUmVtZWRpYXRlZCcsIGtleTogJ3VpX3JlbWVkaWF0ZWQnfSxcbiAgICAgICAgICAgICAgICB7dmFsdWU6ICdSZWFzc2lnbicsIGtleTogJ3VpX3JlYXNzaWduJ30sXG4gICAgICAgICAgICAgICAge3ZhbHVlOiAnVW5kbycsIGtleTogJ3VpX3VuZG8nfV0sXG4gICAgICAgICAgICBjZXJ0aWZpZXJzOiBbJ0phbWVzLlNtaXRoJ10sXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBleHBpcmF0aW9uOiAxNDU0NjIxNzA4NDIyLFxuICAgICAgICAgICAgbmFtZTogJ01hbmFnZXIgQWNjZXNzIFJldmlldyBmb3IgSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgbmV4dFBoYXNlVHJhbnNpdGlvbjogMTQ1NDYyMTcwODQ2MCxcbiAgICAgICAgICAgIHBoYXNlOiAnUmV2b2NhdGlvbicsXG4gICAgICAgICAgICBzaWdub2ZmczogW3tcbiAgICAgICAgICAgICAgICBkYXRlOiAxNDU0NjIxNzA4NDIyLFxuICAgICAgICAgICAgICAgIHNpZ25lcjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQm9iJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNeSBOYW1lIElzIEJvYicsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnYm9ic2lkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50OiAnQm9ic0FjY3QnLFxuICAgICAgICAgICAgICAgIGVzaWdNZWFuaW5nOiAnSSBzYXcgdGhlIHNpZ24gYW5kIGl0IG9wZW5lZCB1cCBteSBleWVzJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uQ291bnQ6IDEwLFxuICAgICAgICAgICAgcmVtZWRpYXRpb25zQ29tcGxldGVkOiAyLFxuICAgICAgICAgICAgcmVtZWRpYXRpb25zU3RhcnRlZDogNSxcbiAgICAgICAgICAgIHRhZ3M6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIFJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQ6IHtcbiAgICAgICAgICAgIGFkdmljZToge1xuICAgICAgICAgICAgICAgIHZpb2xhdGlvbkNvbnN0cmFpbnQ6ICdUaGlzIGlzIG15IGNvbnN0cmFpbnQnLFxuICAgICAgICAgICAgICAgIHZpb2xhdGlvblN1bW1hcnk6ICdJIGhhdmUgYSBzdG9yeSB0byB0ZWxsIHlvdSBhYm91dCB0aGlzIHZpb2xhdGlvbi4nLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlOiAnRklHVVJFIElUIE9VVCEnLFxuICAgICAgICAgICAgICAgIGxlZnRSb2xlczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsZWZ0MScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsZWZ0MU5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdsZWZ0MURpc3BsYXlhYmxlTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaSBhbSBhIGxlZnQgcm9sZScsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VydEl0ZW1JZDogJ2xlZnRSb2xlQ2VydEl0ZW1JZCcsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eUlkOiAnbGVmdFJvbGVFbnRpdHlJZCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbGVmdDInLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbGVmdDJOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnbGVmdDJEaXNwbGF5YWJsZU5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2kgYW0gYSBsZWZ0IHJvbGUgdG9vJyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZXJ0SXRlbUlkOiAnbGVmdFJvbGUyQ2VydEl0ZW1JZCcsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eUlkOiAnbGVmdFJvbGUyRW50aXR5SWQnXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgcmlnaHRSb2xlczogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyaWdodDEnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAncmlnaHQxTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ3JpZ2h0MURpc3BsYXlhYmxlTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaSBhbSBhIHJpZ2h0IHJvbGUnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdW1tYXJ5OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBlbmFibGVPdmVycmlkZURlZmF1bHRSZW1lZGlhdG9yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRSZW1lZGlhdG9yOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdEdWRlJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd3aGF0ZXZlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnZml4IHRoaXMgZHVkZScsXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25EZXRhaWxzOiBbe1xuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnLFxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnQXBwMUlEJyxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJ015QWNjdCcsXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnMTIzNGFiY2QnLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdTb21lQXR0cmlidXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlVmFsdWU6ICdTb21lVmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb25zOiBbW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1JlbW92ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAncmVtb3ZlJ1xuICAgICAgICAgICAgICAgICAgICBdLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZXQnXG4gICAgICAgICAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgICAgICAgICBpbnB1dFR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVtZWRpYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246IFsnU2V0JywgJ3NldCddXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25BY3Rpb246ICdPcGVuV29ya0l0ZW0nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUE9MSUNZX1RSRUVfTk9ERToge1xuICAgICAgICAgICAgb3BlcmF0b3I6ICdPUicsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ1RoZSBXb3JsZCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY249dXByaWdodCBjaXRpemVucyxkYz1jb20nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ1VwcmlnaHQgQ2l0aXplbnMnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGNvb2xlc3Qgb2YgdGhlIGNvb2wnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogW3tcbiAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRlZEl0ZW1JZDogJ2NlcnRJdGVtOTg3JyxcbiAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRlZEVudGl0eUlkOiAnY2VydEVudGl0eTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ0FwcHJvdmVkJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBdXN0aW4nLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICc4NzQ1JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY249c3RlYWxpbmcgY2hlYXRpbmcgbGlhcnMsZGM9Y29tJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdTdGVhbGluZyBDaGVhdGluZyBMaWFycycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdpY2UgY29sZCcsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogbnVsbFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgUE9MSUNZX1RSRUVfQU5EX05PREU6IHtcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnQU5EJyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnTXlBcHAnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICcxMjM0NScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2NuPXRydWUsZGM9Y29tJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdTb21lIHZhbHVlJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3Rlc3QgYXBwJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGFzc29jaWF0ZWRJdGVtSWQ6ICdjZXJ0SXRlbTk4NycsXG4gICAgICAgICAgICAgICAgICAgIGFzc29jaWF0ZWRFbnRpdHlJZDogJ2NlcnRFbnRpdHkyMzQnLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdSZW1lZGlhdGVkJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdZb3VyQXBwJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnODc0NScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2NuPWZhbHNlLGRjPWNvbScsXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnU29tZSBvdGhlciB2YWx1ZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICd0ZXN0IGFwcCcsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogW3tcbiAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRlZEl0ZW1JZDogJ2NlcnRJdGVtOTg3MScsXG4gICAgICAgICAgICAgICAgICAgIGFzc29jaWF0ZWRFbnRpdHlJZDogJ2NlcnRFbnRpdHkyMzQxJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgUE9MSUNZX1RSRUVfQU5EX05PREVfTk9fTElORV9JVEVNX0RFQ0lTSU9OUzoge1xuICAgICAgICAgICAgb3BlcmF0b3I6ICdBTkQnLFxuICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdNeUFwcCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY249dHJ1ZSxkYz1jb20nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ1NvbWUgdmFsdWUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCBhcHAnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogbnVsbFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnWW91ckFwcCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzg3NDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjbj1mYWxzZSxkYz1jb20nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ1NvbWUgb3RoZXIgdmFsdWUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCBhcHAnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IG51bGxcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIFJPTEVfU05BUFNIT1Q6IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0b3JSdWxlczogJ3J1bGUxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUZXN0IFJvbGUnLFxuICAgICAgICAgICAgaWQ6ICdyb2xlSWQxJyxcbiAgICAgICAgICAgIG93bmVyRGlzcGxheU5hbWU6ICdUZXN0IFVzZXInLFxuICAgICAgICAgICAgc2NvcGVEaXNwbGF5TmFtZTogJ1NvbWUgU2NvcGUnLFxuICAgICAgICAgICAgdHlwZURpc3BsYXlOYW1lOiAnQXNzaWduT3JEZXRlY3QnXG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
