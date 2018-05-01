System.register(['identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {
            angular.module(identityRequestModule).

            /**
             * IdentityRequest test data factory
             */
            factory('identityRequestTestData', function () {

                return {
                    IDENTITY_REQUEST_1: {
                        id: '1234',
                        requestId: 'Request1',
                        externalTicketId: 'externalticketid1',
                        type: 'AccessRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: 1454621708422,
                        cancelable: false,
                        state: 'init',
                        verificationDate: 1454621708422,
                        completionStatus: 'Success',
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            role: true,
                            entitlement: false,
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Add',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished',
                            displayableAccountName: 'Displayable ACcount'
                        }],
                        policyViolations: [{
                            policyName: 'SOD Policy',
                            policyType: 'SOD',
                            ruleName: 'rule name'
                        }, {
                            policyName: 'Account Policy',
                            policyType: 'Account',
                            ruleName: 'account rule name'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_2: {
                        id: '5678',
                        requestId: 'Request2',
                        type: 'AccessRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '2',
                            applicationName: 'App Name2',
                            role: false,
                            entitlement: true,
                            name: 'memberOf',
                            value: 'somevalue',
                            displayableValue: 'display this',
                            operation: 'Add',
                            accountName: 'Account name',
                            approvalState: 'Pending',
                            provisioningState: 'Pending',
                            approvalItemSummaries: null
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_2_1: {
                        id: '5678',
                        requestId: 'Request2',
                        type: 'Registration',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '2',
                            applicationName: 'App Name2',
                            role: false,
                            entitlement: true,
                            name: 'password',
                            value: 'newPassword',
                            displayableValue: 'display this',
                            operation: 'Set',
                            accountName: 'Account name',
                            approvalState: 'Pending',
                            provisioningState: 'Pending',
                            approvalItemSummaries: null
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_3: {
                        id: '1234',
                        requestId: 'Request1',
                        type: 'AccountsRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            role: false,
                            entitlement: false,
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Create',
                            accountName: 'Account name',
                            displayableAccountName: 'SOME ACCOUNT NAME',
                            approvalState: 'Finished',
                            provisioningState: 'Finished',
                            approvalItemSummaries: null
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_4: {
                        id: '4444',
                        requestId: 'Request4',
                        type: 'AccountsRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            role: true,
                            entitlement: false,
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Disable',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_5: {
                        id: '5555',
                        requestId: 'Request5',
                        type: 'AccountsRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            role: true,
                            entitlement: false,
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Enable',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_6: {
                        id: '6666',
                        requestId: 'Request6',
                        type: 'AccountsRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            role: true,
                            entitlement: false,
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Unlock',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_7: {
                        id: '7777',
                        requestId: 'Request7',
                        type: 'AccountsRequest',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'App Name',
                            name: 'Some name',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Delete',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_PAM: {
                        id: '7777',
                        requestId: 'Request7',
                        type: 'PAM',
                        targetDisplayName: 'Target',
                        requesterDisplayName: 'Requester',
                        priority: 'Normal',
                        executionStatus: 'Completed',
                        endDate: '1454621708422',
                        cancelable: false,
                        items: [{
                            id: '1',
                            applicationName: 'PAM APP',
                            name: 'containerA',
                            value: 'Some value',
                            displayableValue: 'display val',
                            operation: 'Remove',
                            accountName: 'Account name',
                            approvalState: 'Finished',
                            provisioningState: 'Finished'
                        }],
                        terminatedDate: 1496352411768
                    },
                    IDENTITY_REQUEST_ITEM_1: {
                        id: '1',
                        applicationName: 'App Name',
                        role: true,
                        entitlement: false,
                        name: 'Some name',
                        value: 'Some value',
                        operation: 'Add',
                        accountName: 'Account name',
                        approvalState: 'Pending',
                        provisioningState: 'Pending',
                        displayableValue: 'display this value',
                        displayableAccountName: 'account name here',
                        provisioningEngine: 'engine1',
                        retries: 0,
                        startDate: 1496352411768,
                        endDate: 1496352411768,
                        compilationStatus: 'Filtered',
                        instance: 'instance1',
                        requesterComments: 'these are some comments',
                        provisioningRequestId: 'provisionTHIS',
                        approvalItemSummaries: [{
                            workItemId: 'workItem12435',
                            approvalItemId: 'approvalItem124234',
                            canAccessComments: true,
                            owner: {
                                name: 'Owner.Dude',
                                id: 'OwnerDude',
                                displayName: 'Owner Dude'
                            },
                            commentCount: 8,
                            created: 1496352411768
                        }, {
                            workItemId: 'workItem0000',
                            approvalItemId: 'approvalItem9999',
                            canAccessComments: false,
                            owner: {
                                name: 'Another.Dude',
                                id: 'AnotherDude',
                                displayName: 'Another Dude'
                            },
                            commentCount: 5,
                            created: 1496352411768
                        }]
                    },
                    IDENTITY_REQUEST_ITEM_2: {
                        id: '2',
                        applicationName: 'App Name2',
                        role: true,
                        entitlement: false,
                        name: 'Some name',
                        value: 'Some value',
                        operation: 'Add',
                        accountName: 'Account name',
                        approvalState: 'Pending',
                        provisioningState: 'Pending',
                        displayableValue: 'display this value',
                        displayableAccountName: 'account name here',
                        provisioningEngine: 'engine1',
                        retries: 0,
                        startDate: 1496352411768,
                        endDate: 1496352411768,
                        compilationStatus: null,
                        instance: 'instance1',
                        requesterComments: 'these are some comments'
                    },
                    IDENTITY_REQUEST_APPROVAL_SUMMARY_1: {
                        workItemId: '1',
                        workItemArchiveId: null,
                        workItemName: '200',
                        ownerDisplayName: 'Joe Smith',
                        status: 'status_message_key',
                        openDate: 1496352411768,
                        completeDate: 1496352411768,
                        description: 'approving',
                        approvalItemCount: 1,
                        comments: [{
                            author: 'Test User',
                            date: 1496352411768,
                            comment: 'some comments here'
                        }],
                        hasWorkItemAccess: true
                    },
                    IDENTITY_REQUEST_APPROVAL_COMMENT_1: {
                        author: 'Joe Smith',
                        date: 1496352411768,
                        comment: 'My comment'
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHMUU7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx1Q0FBdUM7WUFDdkQsd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZO1lBUDdCLFFBQVEsT0FBTzs7Ozs7WUFLWCxRQUFRLDJCQUEyQixZQUFNOztnQkFFckMsT0FBTztvQkFDSCxvQkFBb0I7d0JBQ2hCLElBQUk7d0JBQ0osV0FBVzt3QkFDWCxrQkFBa0I7d0JBQ2xCLE1BQU07d0JBQ04sbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixTQUFTO3dCQUNULFlBQVk7d0JBQ1osT0FBTzt3QkFDUCxrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsT0FBTyxDQUNIOzRCQUNJLElBQUk7NEJBQ0osaUJBQWlCOzRCQUNqQixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsTUFBTTs0QkFDTixPQUFPOzRCQUNQLGtCQUFrQjs0QkFDbEIsV0FBVzs0QkFDWCxhQUFhOzRCQUNiLGVBQWU7NEJBQ2YsbUJBQW1COzRCQUNuQix3QkFBd0I7O3dCQUdoQyxrQkFBa0IsQ0FDZDs0QkFDSSxZQUFZOzRCQUNaLFlBQVk7NEJBQ1osVUFBVTsyQkFFZDs0QkFDSSxZQUFZOzRCQUNaLFlBQVk7NEJBQ1osVUFBVTs7d0JBR2xCLGdCQUFnQjs7b0JBRXBCLG9CQUFvQjt3QkFDaEIsSUFBSTt3QkFDSixXQUFXO3dCQUNYLE1BQU07d0JBQ04sbUJBQW1CO3dCQUNuQixzQkFBc0I7d0JBQ3RCLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixTQUFTO3dCQUNULFlBQVk7d0JBQ1osT0FBTyxDQUNIOzRCQUNJLElBQUk7NEJBQ0osaUJBQWlCOzRCQUNqQixNQUFNOzRCQUNO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QkFDWCxhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQixTQUFTO3dCQUNULFdBQVc7d0JBQ1gsU0FBUzt3QkFDVCxtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsbUJBQW1COztvQkFFdkIscUNBQXFDO3dCQUNqQyxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixVQUFVLENBQUM7NEJBQ1AsUUFBUTs0QkFDUixNQUFNOzRCQUNOLFNBQVM7O3dCQUViLG1CQUFtQjs7b0JBRXZCLHFDQUFxQzt3QkFDakMsUUFBUTt3QkFDUixNQUFNO3dCQUNOLFNBQVM7Ozs7OztHQVB0QiIsImZpbGUiOiJpZGVudGl0eVJlcXVlc3QvSWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5hbmd1bGFyLm1vZHVsZShpZGVudGl0eVJlcXVlc3RNb2R1bGUpLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWRlbnRpdHlSZXF1ZXN0IHRlc3QgZGF0YSBmYWN0b3J5XHJcbiAgICAgKi9cclxuICAgIGZhY3RvcnkoJ2lkZW50aXR5UmVxdWVzdFRlc3REYXRhJywgKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUXzE6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6ICdSZXF1ZXN0MScsXHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbFRpY2tldElkOiAnZXh0ZXJuYWx0aWNrZXRpZDEnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0FjY2Vzc1JlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWU6ICdUYXJnZXQnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVyRGlzcGxheU5hbWU6ICdSZXF1ZXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6ICdOb3JtYWwnLFxyXG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uU3RhdHVzOiAnQ29tcGxldGVkJyxcclxuICAgICAgICAgICAgICAgIGVuZERhdGU6IDE0NTQ2MjE3MDg0MjIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiAnaW5pdCcsXHJcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25EYXRlOiAxNDU0NjIxNzA4NDIyLFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGlvblN0YXR1czogJ1N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FwcCBOYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU29tZSBuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdTb21lIHZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVWYWx1ZTogJ2Rpc3BsYXkgdmFsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnQWRkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdBY2NvdW50IG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbFN0YXRlOiAnRmluaXNoZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdTdGF0ZTogJ0ZpbmlzaGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVBY2NvdW50TmFtZTogJ0Rpc3BsYXlhYmxlIEFDY291bnQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdTT0QgUG9saWN5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ1NPRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVOYW1lOiAncnVsZSBuYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3lOYW1lOiAnQWNjb3VudCBQb2xpY3knLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3lUeXBlOiAnQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVOYW1lOiAnYWNjb3VudCBydWxlIG5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWREYXRlOiAxNDk2MzUyNDExNzY4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIElERU5USVRZX1JFUVVFU1RfMjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICc1Njc4JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogJ1JlcXVlc3QyJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdBY2Nlc3NSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnVGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlckRpc3BsYXlOYW1lOiAnUmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvblN0YXR1czogJ0NvbXBsZXRlZCcsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAnMTQ1NDYyMTcwODQyMicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZTInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnc29tZXZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVWYWx1ZTogJ2Rpc3BsYXkgdGhpcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnQWNjb3VudCBuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxTdGF0ZTogJ1BlbmRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdTdGF0ZTogJ1BlbmRpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1TdW1tYXJpZXM6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlZERhdGU6IDE0OTYzNTI0MTE3NjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgSURFTlRJVFlfUkVRVUVTVF8yXzE6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnNTY3OCcsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6ICdSZXF1ZXN0MicsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUmVnaXN0cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnVGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlckRpc3BsYXlOYW1lOiAnUmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvblN0YXR1czogJ0NvbXBsZXRlZCcsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAnMTQ1NDYyMTcwODQyMicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZTInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwYXNzd29yZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbmV3UGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB0aGlzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnU2V0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdBY2NvdW50IG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbFN0YXRlOiAnUGVuZGluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1N0YXRlOiAnUGVuZGluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbVN1bW1hcmllczogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkRGF0ZTogMTQ5NjM1MjQxMTc2OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUXzM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6ICdSZXF1ZXN0MScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnQWNjb3VudHNSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnVGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlckRpc3BsYXlOYW1lOiAnUmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvblN0YXR1czogJ0NvbXBsZXRlZCcsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAnMTQ1NDYyMTcwODQyMicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTb21lIG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbWUgdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB2YWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdDcmVhdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FjY291bnQgbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjb3VudE5hbWU6ICdTT01FIEFDQ09VTlQgTkFNRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsU3RhdGU6ICdGaW5pc2hlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1N0YXRlOiAnRmluaXNoZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1TdW1tYXJpZXM6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlZERhdGU6IDE0OTYzNTI0MTE3NjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgSURFTlRJVFlfUkVRVUVTVF80OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzQ0NDQnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiAnUmVxdWVzdDQnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0FjY291bnRzUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXREaXNwbGF5TmFtZTogJ1RhcmdldCcsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZXJEaXNwbGF5TmFtZTogJ1JlcXVlc3RlcicsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogJ05vcm1hbCcsXHJcbiAgICAgICAgICAgICAgICBleGVjdXRpb25TdGF0dXM6ICdDb21wbGV0ZWQnLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogJzE0NTQ2MjE3MDg0MjInLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTb21lIG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbWUgdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB2YWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdEaXNhYmxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdBY2NvdW50IG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZhbFN0YXRlOiAnRmluaXNoZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdTdGF0ZTogJ0ZpbmlzaGVkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB0ZXJtaW5hdGVkRGF0ZTogMTQ5NjM1MjQxMTc2OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUXzU6IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnNTU1NScsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6ICdSZXF1ZXN0NScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnQWNjb3VudHNSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnVGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlckRpc3BsYXlOYW1lOiAnUmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvblN0YXR1czogJ0NvbXBsZXRlZCcsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAnMTQ1NDYyMTcwODQyMicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU29tZSB2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlVmFsdWU6ICdkaXNwbGF5IHZhbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VuYWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnQWNjb3VudCBuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxTdGF0ZTogJ0ZpbmlzaGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlzaW9uaW5nU3RhdGU6ICdGaW5pc2hlZCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlZERhdGU6IDE0OTYzNTI0MTE3NjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgSURFTlRJVFlfUkVRVUVTVF82OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzY2NjYnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiAnUmVxdWVzdDYnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ0FjY291bnRzUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXREaXNwbGF5TmFtZTogJ1RhcmdldCcsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZXJEaXNwbGF5TmFtZTogJ1JlcXVlc3RlcicsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogJ05vcm1hbCcsXHJcbiAgICAgICAgICAgICAgICBleGVjdXRpb25TdGF0dXM6ICdDb21wbGV0ZWQnLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogJzE0NTQ2MjE3MDg0MjInLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdTb21lIG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbWUgdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB2YWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdVbmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FjY291bnQgbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsU3RhdGU6ICdGaW5pc2hlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1N0YXRlOiAnRmluaXNoZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWREYXRlOiAxNDk2MzUyNDExNzY4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIElERU5USVRZX1JFUVVFU1RfNzoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICc3Nzc3JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogJ1JlcXVlc3Q3JyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdBY2NvdW50c1JlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWU6ICdUYXJnZXQnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVyRGlzcGxheU5hbWU6ICdSZXF1ZXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6ICdOb3JtYWwnLFxyXG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uU3RhdHVzOiAnQ29tcGxldGVkJyxcclxuICAgICAgICAgICAgICAgIGVuZERhdGU6ICcxNDU0NjIxNzA4NDIyJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FwcCBOYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU29tZSB2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlVmFsdWU6ICdkaXNwbGF5IHZhbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0RlbGV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnQWNjb3VudCBuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxTdGF0ZTogJ0ZpbmlzaGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlzaW9uaW5nU3RhdGU6ICdGaW5pc2hlZCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGVybWluYXRlZERhdGU6IDE0OTYzNTI0MTE3NjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgSURFTlRJVFlfUkVRVUVTVF9QQU06IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnNzc3NycsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6ICdSZXF1ZXN0NycsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUEFNJyxcclxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnVGFyZ2V0JyxcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RlckRpc3BsYXlOYW1lOiAnUmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvblN0YXR1czogJ0NvbXBsZXRlZCcsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAnMTQ1NDYyMTcwODQyMicsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdQQU0gQVBQJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NvbnRhaW5lckEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbWUgdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB2YWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdSZW1vdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FjY291bnQgbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmFsU3RhdGU6ICdGaW5pc2hlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1N0YXRlOiAnRmluaXNoZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHRlcm1pbmF0ZWREYXRlOiAxNDk2MzUyNDExNzY4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIElERU5USVRZX1JFUVVFU1RfSVRFTV8xOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUnLFxyXG4gICAgICAgICAgICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdTb21lIG5hbWUnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdTb21lIHZhbHVlJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FjY291bnQgbmFtZScsXHJcbiAgICAgICAgICAgICAgICBhcHByb3ZhbFN0YXRlOiAnUGVuZGluZycsXHJcbiAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdTdGF0ZTogJ1BlbmRpbmcnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVWYWx1ZTogJ2Rpc3BsYXkgdGhpcyB2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZUFjY291bnROYW1lOiAnYWNjb3VudCBuYW1lIGhlcmUnLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlzaW9uaW5nRW5naW5lOiAnZW5naW5lMScsXHJcbiAgICAgICAgICAgICAgICByZXRyaWVzOiAwLFxyXG4gICAgICAgICAgICAgICAgc3RhcnREYXRlOiAxNDk2MzUyNDExNzY4LFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogMTQ5NjM1MjQxMTc2OCxcclxuICAgICAgICAgICAgICAgIGNvbXBpbGF0aW9uU3RhdHVzOiAnRmlsdGVyZWQnLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZTEnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVyQ29tbWVudHM6ICd0aGVzZSBhcmUgc29tZSBjb21tZW50cycsXHJcbiAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdSZXF1ZXN0SWQ6ICdwcm92aXNpb25USElTJyxcclxuICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbVN1bW1hcmllczogW3tcclxuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiAnd29ya0l0ZW0xMjQzNScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxJdGVtSWQ6ICdhcHByb3ZhbEl0ZW0xMjQyMzQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkFjY2Vzc0NvbW1lbnRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdPd25lci5EdWRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdPd25lckR1ZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ093bmVyIER1ZGUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb21tZW50Q291bnQ6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogMTQ5NjM1MjQxMTc2OFxyXG4gICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ya0l0ZW1JZDogJ3dvcmtJdGVtMDAwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxJdGVtSWQ6ICdhcHByb3ZhbEl0ZW05OTk5JyxcclxuICAgICAgICAgICAgICAgICAgICBjYW5BY2Nlc3NDb21tZW50czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0Fub3RoZXIuRHVkZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnQW5vdGhlckR1ZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0Fub3RoZXIgRHVkZSdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRDb3VudDogNSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkOiAxNDk2MzUyNDExNzY4XHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUX0lURU1fMjoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FwcCBOYW1lMicsXHJcbiAgICAgICAgICAgICAgICByb2xlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW50aXRsZW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NvbWUgbmFtZScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvbWUgdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnQWRkJyxcclxuICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnQWNjb3VudCBuYW1lJyxcclxuICAgICAgICAgICAgICAgIGFwcHJvdmFsU3RhdGU6ICdQZW5kaW5nJyxcclxuICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1N0YXRlOiAnUGVuZGluZycsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZVZhbHVlOiAnZGlzcGxheSB0aGlzIHZhbHVlJyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjb3VudE5hbWU6ICdhY2NvdW50IG5hbWUgaGVyZScsXHJcbiAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdFbmdpbmU6ICdlbmdpbmUxJyxcclxuICAgICAgICAgICAgICAgIHJldHJpZXM6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiAxNDk2MzUyNDExNzY4LFxyXG4gICAgICAgICAgICAgICAgY29tcGlsYXRpb25TdGF0dXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlMScsXHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZXJDb21tZW50czogJ3RoZXNlIGFyZSBzb21lIGNvbW1lbnRzJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUX0FQUFJPVkFMX1NVTU1BUllfMToge1xyXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1JZDogJzEnLFxyXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1BcmNoaXZlSWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB3b3JrSXRlbU5hbWU6ICcyMDAnLFxyXG4gICAgICAgICAgICAgICAgb3duZXJEaXNwbGF5TmFtZTogJ0pvZSBTbWl0aCcsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdzdGF0dXNfbWVzc2FnZV9rZXknLFxyXG4gICAgICAgICAgICAgICAgb3BlbkRhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2FwcHJvdmluZycsXHJcbiAgICAgICAgICAgICAgICBhcHByb3ZhbEl0ZW1Db3VudDogMSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjogJ1Rlc3QgVXNlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogMTQ5NjM1MjQxMTc2OCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tZW50OiAnc29tZSBjb21tZW50cyBoZXJlJ1xyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICBoYXNXb3JrSXRlbUFjY2VzczogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBJREVOVElUWV9SRVFVRVNUX0FQUFJPVkFMX0NPTU1FTlRfMToge1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yOiAnSm9lIFNtaXRoJyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IDE0OTYzNTI0MTE3NjgsXHJcbiAgICAgICAgICAgICAgICBjb21tZW50OiAnTXkgY29tbWVudCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
