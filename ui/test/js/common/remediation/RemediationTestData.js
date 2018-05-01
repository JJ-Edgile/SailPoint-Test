System.register(['common/remediation/RemediationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }],
        execute: function () {

            angular.module(remediationModule).factory('remediationTestData', function () {
                return {
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
                            selected: true
                        }, {
                            application: 'Austin',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=stealing cheating liars,dc=com',
                            displayValue: 'Stealing Cheating Liars',
                            description: 'ice cold',
                            permission: false,
                            selected: false
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
                            selected: true
                        }, {
                            application: 'YourApp',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=false,dc=com',
                            displayValue: 'Some other value',
                            description: 'test app',
                            permission: false,
                            selected: false
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
                            selected: true
                        }, {
                            application: 'YourApp',
                            applicationId: '8745',
                            name: 'memberOf',
                            value: 'cn=false,dc=com',
                            displayValue: 'Some other value',
                            description: 'test app',
                            permission: false,
                            selected: false
                        }]
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvblRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHlDQUF5QyxVQUFVLFNBQVM7OztJQUd6RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHFDQUFxQztZQUNyRCxvQkFBb0Isb0NBQW9DOztRQUU1RCxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTyxtQkFDZixRQUFRLHVCQUF1QixZQUFNO2dCQUNqQyxPQUFPO29CQUNILDJCQUEyQjt3QkFDdkIsUUFBUTs0QkFDSixxQkFBcUI7NEJBQ3JCLGtCQUFrQjs0QkFDbEIsbUJBQW1COzRCQUNuQixXQUFXLENBQUM7Z0NBQ1IsSUFBSTtnQ0FDSixNQUFNO2dDQUNOLGlCQUFpQjtnQ0FDakIsYUFBYTtnQ0FDYixVQUFVO2dDQUNWLFlBQVk7Z0NBQ1osVUFBVTtnQ0FDVixRQUFROytCQUNWO2dDQUNFLElBQUk7Z0NBQ0osTUFBTTtnQ0FDTixpQkFBaUI7Z0NBQ2pCLGFBQWE7Z0NBQ2IsVUFBVTtnQ0FDVixZQUFZO2dDQUNaLFVBQVU7OzRCQUVkLFlBQVksQ0FBQztnQ0FDVCxJQUFJO2dDQUNKLE1BQU07Z0NBQ04saUJBQWlCO2dDQUNqQixhQUFhOzs7d0JBR3JCLFNBQVM7NEJBQ0wsSUFBSTs0QkFDSixpQ0FBaUM7NEJBQ2pDLG1CQUFtQjtnQ0FDZixNQUFNO2dDQUNOLElBQUk7OzRCQUVSLFVBQVU7NEJBQ1Ysb0JBQW9CLENBQUM7Z0NBQ2pCLGFBQWE7Z0NBQ2IsZUFBZTtnQ0FDZixTQUFTO2dDQUNULGdCQUFnQjtnQ0FDaEIsV0FBVztnQ0FDWCxnQkFBZ0I7Z0NBQ2hCLGVBQWUsQ0FBQyxDQUNaLFVBQ0EsV0FDRCxDQUNDLE9BQ0E7Z0NBRUosV0FBVztnQ0FDWCxVQUFVO2dDQUNWLHFCQUFxQjtnQ0FDckIsV0FBVyxDQUFDLE9BQU87OzRCQUV2QixtQkFBbUI7Ozs7b0JBSTNCLGtCQUFrQjt3QkFDZCxVQUFVO3dCQUNWLFVBQVUsQ0FBQzs0QkFDUCxhQUFhOzRCQUNiLGVBQWU7NEJBQ2YsTUFBTTs0QkFDTixPQUFPOzRCQUNQLGNBQWM7NEJBQ2QsYUFBYTs0QkFDYixZQUFZOzRCQUNaLFVBQVU7MkJBQ1g7NEJBQ0MsYUFBYTs0QkFDYixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxjQUFjOzRCQUNkLGFBQWE7NEJBQ2IsWUFBWTs0QkFDWixVQUFVOzs7b0JBR2xCLHNCQUFzQjt3QkFDbEIsVUFBVTt3QkFDVixVQUFVLENBQUM7NEJBQ1AsYUFBYTs0QkFDYixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxjQUFjOzRCQUNkLGFBQWE7NEJBQ2IsWUFBWTs0QkFDWixVQUFVOzJCQUNYOzRCQUNDLGFBQWE7NEJBQ2IsZUFBZTs0QkFDZixNQUFNOzRCQUNOLE9BQU87NEJBQ1AsY0FBYzs0QkFDZCxhQUFhOzRCQUNiLFlBQVk7NEJBQ1osVUFBVTs7O29CQUdsQiw2Q0FBNkM7d0JBQ3pDLFVBQVU7d0JBQ1YsVUFBVSxDQUFDOzRCQUNQLGFBQWE7NEJBQ2IsZUFBZTs0QkFDZixNQUFNOzRCQUNOLE9BQU87NEJBQ1AsY0FBYzs0QkFDZCxhQUFhOzRCQUNiLFlBQVk7NEJBQ1osVUFBVTsyQkFDWDs0QkFDQyxhQUFhOzRCQUNiLGVBQWU7NEJBQ2YsTUFBTTs0QkFDTixPQUFPOzRCQUNQLGNBQWM7NEJBQ2QsYUFBYTs0QkFDYixZQUFZOzRCQUNaLFVBQVU7Ozs7Ozs7R0FRdkIiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL1JlbWVkaWF0aW9uVGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKS5cbmZhY3RvcnkoJ3JlbWVkaWF0aW9uVGVzdERhdGEnLCAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVDoge1xuICAgICAgICAgICAgYWR2aWNlOiB7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uQ29uc3RyYWludDogJ1RoaXMgaXMgbXkgY29uc3RyYWludCcsXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uU3VtbWFyeTogJ0kgaGF2ZSBhIHN0b3J5IHRvIHRlbGwgeW91IGFib3V0IHRoaXMgdmlvbGF0aW9uLicsXG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25BZHZpY2U6ICdGSUdVUkUgSVQgT1VUIScsXG4gICAgICAgICAgICAgICAgbGVmdFJvbGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2xlZnQxJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2xlZnQxTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ2xlZnQxRGlzcGxheWFibGVOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdpIGFtIGEgbGVmdCByb2xlJyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZXJ0SXRlbUlkOiAnbGVmdFJvbGVDZXJ0SXRlbUlkJyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5SWQ6ICdsZWZ0Um9sZUVudGl0eUlkJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsZWZ0MicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsZWZ0Mk5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdsZWZ0MkRpc3BsYXlhYmxlTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnaSBhbSBhIGxlZnQgcm9sZSB0b28nLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlcnRJdGVtSWQ6ICdsZWZ0Um9sZTJDZXJ0SXRlbUlkJyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5SWQ6ICdsZWZ0Um9sZTJFbnRpdHlJZCdcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICByaWdodFJvbGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3JpZ2h0MScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdyaWdodDFOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAncmlnaHQxRGlzcGxheWFibGVOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdpIGFtIGEgcmlnaHQgcm9sZSdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1bW1hcnk6IHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIGVuYWJsZU92ZXJyaWRlRGVmYXVsdFJlbWVkaWF0b3I6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVmYXVsdFJlbWVkaWF0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0R1ZGUnLFxuICAgICAgICAgICAgICAgICAgICBpZDogJ3doYXRldmVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICdmaXggdGhpcyBkdWRlJyxcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkRldGFpbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICdBcHAxSUQnLFxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50OiAnTXlBY2N0JyxcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICcxMjM0YWJjZCcsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ1NvbWVBdHRyaWJ1dGUnLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogJ1NvbWVWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbnM6IFtbXG4gICAgICAgICAgICAgICAgICAgICAgICAnUmVtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZW1vdmUnXG4gICAgICAgICAgICAgICAgICAgIF0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdTZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NldCdcbiAgICAgICAgICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdSZW1lZGlhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogWydTZXQnLCAnc2V0J11cbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkFjdGlvbjogJ09wZW5Xb3JrSXRlbSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBQT0xJQ1lfVFJFRV9OT0RFOiB7XG4gICAgICAgICAgICBvcGVyYXRvcjogJ09SJyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnVGhlIFdvcmxkJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnMTIzNDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjbj11cHJpZ2h0IGNpdGl6ZW5zLGRjPWNvbScsXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnVXByaWdodCBDaXRpemVucycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgY29vbGVzdCBvZiB0aGUgY29vbCcsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0F1c3RpbicsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzg3NDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjbj1zdGVhbGluZyBjaGVhdGluZyBsaWFycyxkYz1jb20nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ1N0ZWFsaW5nIENoZWF0aW5nIExpYXJzJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ljZSBjb2xkJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIFBPTElDWV9UUkVFX0FORF9OT0RFOiB7XG4gICAgICAgICAgICBvcGVyYXRvcjogJ0FORCcsXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ015QXBwJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnMTIzNDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjbj10cnVlLGRjPWNvbScsXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnU29tZSB2YWx1ZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICd0ZXN0IGFwcCcsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ1lvdXJBcHAnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICc4NzQ1JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY249ZmFsc2UsZGM9Y29tJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdTb21lIG90aGVyIHZhbHVlJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3Rlc3QgYXBwJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIFBPTElDWV9UUkVFX0FORF9OT0RFX05PX0xJTkVfSVRFTV9ERUNJU0lPTlM6IHtcbiAgICAgICAgICAgIG9wZXJhdG9yOiAnQU5EJyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnTXlBcHAnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICcxMjM0NScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2NuPXRydWUsZGM9Y29tJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdTb21lIHZhbHVlJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ3Rlc3QgYXBwJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnWW91ckFwcCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25JZDogJzg3NDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjbj1mYWxzZSxkYz1jb20nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ1NvbWUgb3RoZXIgdmFsdWUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGVzdCBhcHAnLFxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
