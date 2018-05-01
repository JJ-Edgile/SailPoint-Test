System.register(['policyViolation/PolicyViolationModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            angular.module(policyViolationModule).

            /**
             * Policy test data factory
             */
            factory('policyTestData', function () {
                'ngInject';

                return {
                    POLICY_DATA_1: {
                        id: '7653',
                        name: 'Account Policy',
                        description: 'Account Policy for blah blah...',
                        ruleDescription: 'If this account has this role then',
                        type: 'Account'
                    },

                    POLICY_VIOLATION_DATA_1: {
                        id: '4321',
                        identity: {
                            name: 'james smith',
                            firstName: 'james',
                            lastName: 'smith'
                        },
                        owner: {
                            name: 'mary',
                            displayName: 'Mary Johnson'
                        },
                        policy: {
                            id: '1234',
                            name: 'SOD Policy',
                            description: 'SOD Policy',
                            ruleDescription: 'this is the rule description',
                            type: 'SOD'
                        },
                        ruleDescription: 'This guy should not have this access',
                        compensatingControl: 'compenstating',
                        remediationAdvice: 'remediation',
                        applicationName: 'Test application',
                        accountName: 'test account',
                        scoreWeight: 'test weight',
                        displayName: 'Displayable violation name',
                        status: 'policy_violation_open',
                        editable: true,
                        allowedActions: [{
                            messageKey: 'cert_action_mitigated',
                            name: 'Mitigated',
                            promptKey: 'cert_action_mitigate',
                            status: 'Mitigated'
                        }, {
                            messageKey: 'cert_action_remediated',
                            name: 'Remediated',
                            promptKey: 'cert_action_remediate',
                            status: 'Remediated'
                        }, {
                            messageKey: 'cert_action_delegated',
                            name: 'Delegated',
                            promptKey: 'cert_action_delegate',
                            status: 'Delegated'
                        }]
                    },
                    POLICY_VIOLATION_DATA_2: {
                        id: '1234',
                        identity: {
                            name: 'james smith',
                            firstName: 'james',
                            lastName: 'smith'
                        },
                        owner: {
                            name: 'mary',
                            displayName: 'Mary Johnson'
                        },
                        policy: {
                            id: '1234',
                            name: 'SOD Policy',
                            description: 'SOD Policy',
                            ruleDescription: 'this is the rule description',
                            type: 'SOD'
                        },
                        ruleDescription: 'This guy should not have this access',
                        compensatingControl: 'compenstating',
                        remediationAdvice: 'remediation',
                        applicationName: 'Test application',
                        accountName: 'test account',
                        scoreWeight: 'test weight',
                        status: 'policy_violation_open',
                        editable: true,
                        decisionStatus: {
                            actionRequired: false,
                            allowAcknowledge: false,
                            canChangeDecision: false,
                            currentState: {
                                messageKey: null,
                                name: null,
                                promptKey: null
                            },
                            currentStateWithStatus: null,
                            decisions: [{
                                messageKey: 'cert_action_certified',
                                name: 'Certified',
                                promptKey: 'cert_action_certify',
                                status: 'Certified'
                            }, {
                                messageKey: 'cert_action_mitigated',
                                name: 'Mitigated',
                                promptKey: 'cert_action_mitigate',
                                status: 'Mitigated'
                            }],
                            statuses: {}
                        }
                    },
                    POLICY_VIOLATION_DATA_3: {
                        id: '4321',
                        identity: {
                            name: 'james smith',
                            firstName: 'james',
                            lastName: 'smith'
                        },
                        owner: {
                            name: 'mary',
                            displayName: 'Mary Johnson'
                        },
                        policy: {
                            id: '1234',
                            name: 'Activity Policy',
                            description: 'Activity policy for testApp',
                            ruleDescription: null,
                            type: 'Activity'
                        },
                        ruleDescription: 'description for this',
                        compensatingControl: null,
                        remediationAdvice: null,
                        applicationName: null,
                        accountName: null,
                        scoreWeight: '200',
                        status: 'policy_violation_open',
                        editable: true,
                        allowedActions: [{
                            messageKey: 'cert_action_mitigated',
                            name: 'Mitigated',
                            promptKey: 'cert_action_mitigate',
                            status: 'Mitigated'
                        }, {
                            messageKey: 'cert_action_remediated',
                            name: 'Remediated',
                            promptKey: 'cert_action_remediate',
                            status: 'Remediated'
                        }],
                        activity: {
                            id: '1234',
                            user: '100',
                            action: 'Login',
                            target: 'Target Name',
                            timeStamp: '1208536200000'
                        }
                    },
                    POLICY_VIOLATION_DATA_4: {
                        id: '4321',
                        identity: {
                            name: 'james smith',
                            firstName: 'james',
                            lastName: 'smith'
                        },
                        owner: {
                            name: 'mary',
                            displayName: 'Mary Johnson'
                        },
                        policy: {
                            id: '1234',
                            name: 'Activity Policy',
                            description: 'Activity policy for testApp',
                            ruleDescription: null,
                            type: 'Activity'
                        },
                        ruleDescription: 'description for this',
                        compensatingControl: null,
                        remediationAdvice: null,
                        applicationName: null,
                        accountName: null,
                        scoreWeight: '200',
                        status: 'policy_violation_open',
                        editable: true,
                        allowedActions: [{
                            messageKey: 'cert_action_mitigated',
                            name: 'Mitigated',
                            promptKey: 'cert_action_mitigate',
                            status: 'Mitigated'
                        }, {
                            messageKey: 'cert_action_remediated',
                            name: 'Remediated',
                            promptKey: 'cert_action_remediate',
                            status: 'Remediated'
                        }],
                        activity: {
                            id: '1234',
                            user: '100',
                            action: 'Login',
                            target: 'Target Name',
                            timeStamp: '1208536200000'
                        },
                        decision: {
                            recipientSummary: {
                                displayName: 'Joe Joe'
                            },
                            status: 'Delegated'
                        }
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lUZXN0RGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUsxRTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHVDQUF1QztZQUN2RCx3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7WUFLWCxRQUFRLGtCQUFrQixZQUFNO2dCQUM1Qjs7Z0JBRUEsT0FBTztvQkFDSCxlQUFlO3dCQUNYLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLGlCQUFpQjt3QkFDakIsTUFBTTs7O29CQUdWLHlCQUF5Qjt3QkFDckIsSUFBSTt3QkFDSixVQUFVOzRCQUNOLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxVQUFVOzt3QkFFZCxPQUFPOzRCQUNILE1BQU07NEJBQ04sYUFBYTs7d0JBRWpCLFFBQVE7NEJBQ0osSUFBSTs0QkFDSixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixNQUFNOzt3QkFFVixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixhQUFhO3dCQUNiLFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixnQkFBZ0IsQ0FDWjs0QkFDSSxZQUFZOzRCQUNaLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxRQUFROzJCQUVaOzRCQUNJLFlBQVk7NEJBQ1osTUFBTTs0QkFDTixXQUFXOzRCQUNYLFFBQVE7MkJBRVo7NEJBQ0ksWUFBWTs0QkFDWixNQUFNOzRCQUNOLFdBQVc7NEJBQ1gsUUFBUTs7O29CQUlwQix5QkFBeUI7d0JBQ3JCLElBQUk7d0JBQ0osVUFBVTs0QkFDTixNQUFNOzRCQUNOLFdBQVc7NEJBQ1gsVUFBVTs7d0JBRWQsT0FBTzs0QkFDSCxNQUFNOzRCQUNOLGFBQWE7O3dCQUVqQixRQUFROzRCQUNKLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzRCQUNiLGlCQUFpQjs0QkFDakIsTUFBTTs7d0JBRVYsaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsUUFBUTt3QkFDUixVQUFVO3dCQUNWLGdCQUFnQjs0QkFDWixnQkFBZ0I7NEJBQ2hCLGtCQUFrQjs0QkFDbEIsbUJBQW1COzRCQUNuQixjQUFjO2dDQUNWLFlBQVk7Z0NBQ1osTUFBTTtnQ0FDTixXQUFXOzs0QkFFZix3QkFBd0I7NEJBQ3hCLFdBQVcsQ0FDUDtnQ0FDSSxZQUFZO2dDQUNaLE1BQU07Z0NBQ04sV0FBVztnQ0FDWCxRQUFROytCQUVaO2dDQUNJLFlBQVk7Z0NBQ1osTUFBTTtnQ0FDTixXQUFXO2dDQUNYLFFBQVE7OzRCQUdoQixVQUFVOzs7b0JBSWxCLHlCQUF5Qjt3QkFDckIsSUFBSTt3QkFDSixVQUFVOzRCQUNOLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxVQUFVOzt3QkFFZCxPQUFPOzRCQUNILE1BQU07NEJBQ04sYUFBYTs7d0JBRWpCLFFBQVE7NEJBQ0osSUFBSTs0QkFDSixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixNQUFNOzt3QkFFVixpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsZ0JBQWdCLENBQ1o7NEJBQ0ksWUFBWTs0QkFDWixNQUFNOzRCQUNOLFdBQVc7NEJBQ1gsUUFBUTsyQkFFWjs0QkFDSSxZQUFZOzRCQUNaLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxRQUFROzt3QkFHaEIsVUFBVTs0QkFDTixJQUFJOzRCQUNKLE1BQU07NEJBQ04sUUFBUTs0QkFDUixRQUFROzRCQUNSLFdBQVc7OztvQkFHbkIseUJBQXlCO3dCQUNyQixJQUFJO3dCQUNKLFVBQVU7NEJBQ04sTUFBTTs0QkFDTixXQUFXOzRCQUNYLFVBQVU7O3dCQUVkLE9BQU87NEJBQ0gsTUFBTTs0QkFDTixhQUFhOzt3QkFFakIsUUFBUTs0QkFDSixJQUFJOzRCQUNKLE1BQU07NEJBQ04sYUFBYTs0QkFDYixpQkFBaUI7NEJBQ2pCLE1BQU07O3dCQUVWLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixnQkFBZ0IsQ0FDWjs0QkFDSSxZQUFZOzRCQUNaLE1BQU07NEJBQ04sV0FBVzs0QkFDWCxRQUFROzJCQUVaOzRCQUNJLFlBQVk7NEJBQ1osTUFBTTs0QkFDTixXQUFXOzRCQUNYLFFBQVE7O3dCQUdoQixVQUFVOzRCQUNOLElBQUk7NEJBQ0osTUFBTTs0QkFDTixRQUFROzRCQUNSLFFBQVE7NEJBQ1IsV0FBVzs7d0JBRWYsVUFBVTs0QkFDTixrQkFBa0I7Z0NBQ2QsYUFBYTs7NEJBRWpCLFFBQVE7Ozs7Ozs7R0FDekIiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL1BvbGljeVRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25Nb2R1bGUnO1xuXG5hbmd1bGFyLm1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpLlxuXG4gICAgLyoqXG4gICAgICogUG9saWN5IHRlc3QgZGF0YSBmYWN0b3J5XG4gICAgICovXG4gICAgZmFjdG9yeSgncG9saWN5VGVzdERhdGEnLCAoKSA9PiB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIFBPTElDWV9EQVRBXzE6IHtcbiAgICAgICAgICAgICAgICBpZDogJzc2NTMnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdBY2NvdW50IFBvbGljeScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBY2NvdW50IFBvbGljeSBmb3IgYmxhaCBibGFoLi4uJyxcbiAgICAgICAgICAgICAgICBydWxlRGVzY3JpcHRpb246ICdJZiB0aGlzIGFjY291bnQgaGFzIHRoaXMgcm9sZSB0aGVuJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnQWNjb3VudCdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIFBPTElDWV9WSU9MQVRJT05fREFUQV8xOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc0MzIxJyxcbiAgICAgICAgICAgICAgICBpZGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnamFtZXMgc21pdGgnLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6ICdqYW1lcycsXG4gICAgICAgICAgICAgICAgICAgIGxhc3ROYW1lOiAnc21pdGgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvd25lcjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbWFyeScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTWFyeSBKb2huc29uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9saWN5OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTT0QgUG9saWN5JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTT0QgUG9saWN5JyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZURlc2NyaXB0aW9uOiAndGhpcyBpcyB0aGUgcnVsZSBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTT0QnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydWxlRGVzY3JpcHRpb246ICdUaGlzIGd1eSBzaG91bGQgbm90IGhhdmUgdGhpcyBhY2Nlc3MnLFxuICAgICAgICAgICAgICAgIGNvbXBlbnNhdGluZ0NvbnRyb2w6ICdjb21wZW5zdGF0aW5nJyxcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkFkdmljZTogJ3JlbWVkaWF0aW9uJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdUZXN0IGFwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ3Rlc3QgYWNjb3VudCcsXG4gICAgICAgICAgICAgICAgc2NvcmVXZWlnaHQ6ICd0ZXN0IHdlaWdodCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEaXNwbGF5YWJsZSB2aW9sYXRpb24gbmFtZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncG9saWN5X3Zpb2xhdGlvbl9vcGVuJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd2VkQWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnTWl0aWdhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fcmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUtleTogJ2NlcnRfYWN0aW9uX2RlbGVnYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnRGVsZWdhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdEtleTogJ2NlcnRfYWN0aW9uX2RlbGVnYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0RlbGVnYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBQT0xJQ1lfVklPTEFUSU9OX0RBVEFfMjoge1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2phbWVzIHNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAnamFtZXMnLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ3NtaXRoJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ21hcnknLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01hcnkgSm9obnNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvbGljeToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU09EIFBvbGljeScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU09EIFBvbGljeScsXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVEZXNjcmlwdGlvbjogJ3RoaXMgaXMgdGhlIHJ1bGUgZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU09EJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcnVsZURlc2NyaXB0aW9uOiAnVGhpcyBndXkgc2hvdWxkIG5vdCBoYXZlIHRoaXMgYWNjZXNzJyxcbiAgICAgICAgICAgICAgICBjb21wZW5zYXRpbmdDb250cm9sOiAnY29tcGVuc3RhdGluZycsXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25BZHZpY2U6ICdyZW1lZGlhdGlvbicsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnVGVzdCBhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICd0ZXN0IGFjY291bnQnLFxuICAgICAgICAgICAgICAgIHNjb3JlV2VpZ2h0OiAndGVzdCB3ZWlnaHQnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3BvbGljeV92aW9sYXRpb25fb3BlbicsXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVjaXNpb25TdGF0dXM6IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd0Fja25vd2xlZGdlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuQ2hhbmdlRGVjaXNpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VLZXk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZVdpdGhTdGF0dXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VLZXk6ICdjZXJ0X2FjdGlvbl9jZXJ0aWZpZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdDZXJ0aWZpZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21wdEtleTogJ2NlcnRfYWN0aW9uX2NlcnRpZnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0NlcnRpZmllZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUtleTogJ2NlcnRfYWN0aW9uX21pdGlnYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ01pdGlnYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ01pdGlnYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBQT0xJQ1lfVklPTEFUSU9OX0RBVEFfMzoge1xuICAgICAgICAgICAgICAgIGlkOiAnNDMyMScsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2phbWVzIHNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAnamFtZXMnLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ3NtaXRoJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ21hcnknLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01hcnkgSm9obnNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvbGljeToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWN0aXZpdHkgUG9saWN5JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBY3Rpdml0eSBwb2xpY3kgZm9yIHRlc3RBcHAnLFxuICAgICAgICAgICAgICAgICAgICBydWxlRGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBY3Rpdml0eSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ1bGVEZXNjcmlwdGlvbjogJ2Rlc2NyaXB0aW9uIGZvciB0aGlzJyxcbiAgICAgICAgICAgICAgICBjb21wZW5zYXRpbmdDb250cm9sOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBzY29yZVdlaWdodDogJzIwMCcsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncG9saWN5X3Zpb2xhdGlvbl9vcGVuJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd2VkQWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnTWl0aWdhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fcmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogJzEwMCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ0xvZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAnVGFyZ2V0IE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXA6ICcxMjA4NTM2MjAwMDAwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBQT0xJQ1lfVklPTEFUSU9OX0RBVEFfNDoge1xuICAgICAgICAgICAgICAgIGlkOiAnNDMyMScsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2phbWVzIHNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAnamFtZXMnLFxuICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogJ3NtaXRoJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ21hcnknLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ01hcnkgSm9obnNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvbGljeToge1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnQWN0aXZpdHkgUG9saWN5JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBY3Rpdml0eSBwb2xpY3kgZm9yIHRlc3RBcHAnLFxuICAgICAgICAgICAgICAgICAgICBydWxlRGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBY3Rpdml0eSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ1bGVEZXNjcmlwdGlvbjogJ2Rlc2NyaXB0aW9uIGZvciB0aGlzJyxcbiAgICAgICAgICAgICAgICBjb21wZW5zYXRpbmdDb250cm9sOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0aW9uQWR2aWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBzY29yZVdlaWdodDogJzIwMCcsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAncG9saWN5X3Zpb2xhdGlvbl9vcGVuJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd2VkQWN0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdNaXRpZ2F0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbXB0S2V5OiAnY2VydF9hY3Rpb25fbWl0aWdhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnTWl0aWdhdGVkJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlS2V5OiAnY2VydF9hY3Rpb25fcmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9tcHRLZXk6ICdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogJzEwMCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ0xvZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAnVGFyZ2V0IE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXA6ICcxMjA4NTM2MjAwMDAwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVjaXNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdKb2UgSm9lJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdEZWxlZ2F0ZWQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
