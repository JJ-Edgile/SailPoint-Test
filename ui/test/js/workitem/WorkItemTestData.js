System.register(['angular', 'workitem/WorkItemModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var angular, workItemModule;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {

            angular.module(workItemModule).

            /**
             * This contains data used for testing work items.
             */
            factory('workItemTestData', function () {

                return {
                    workItemTestData1: {
                        id: '1',
                        target: {
                            id: '778897239487',
                            name: 'James.Hetfield',
                            displayName: 'James Hetfield',
                            workgroup: false
                        },
                        requester: {
                            id: '87289234897234',
                            name: 'Dave.Mustaine',
                            displayName: 'Dave Mustaine',
                            workgroup: false
                        },
                        created: 126230400000,
                        workItemType: 'ViolationReview',
                        violations: [// Add more violations here to test multiple violations.
                        {
                            policyName: 'Sailpoint Test',
                            ruleName: 'sailpoint dev test',
                            workitemId: '1',
                            leftBundles: ['sailpoint dev'],
                            policyType: 'SOD',
                            entitlements: null,
                            rightBundles: ['sailpoint test']
                        }, {
                            policyName: 'Sailpoint Test',
                            ruleName: 'sailpoint test dev',
                            workitemId: '1',
                            leftBundles: ['SailPoint Developer'],
                            policyType: 'SOD',
                            entitlements: null,
                            rightBundles: ['SailPoint Tester']
                        }],
                        requestedItems: [{
                            accountName: 'New account',
                            attributes: { allowRequestsWithViolations: true },
                            entitlementApplication: null,
                            entitlementName: null,
                            entitlementRequest: false,
                            entitlementValue: null,
                            id: 'a307972ac8f8443aa7da5511eecbd97b',
                            operation: 'Add',
                            roleId: '297ed0d04d544d69014d544dd2ee0398',
                            roleName: 'Benefits Clerk',
                            state: 'Finished'
                        }, {
                            accountName: 'New account',
                            attributes: { allowRequestsWithViolations: false },
                            entitlementApplication: null,
                            entitlementName: null,
                            entitlementRequest: false,
                            entitlementValue: null,
                            description: 'A boring description about nothing',
                            id: '8e734b8372f54cea960923ecbb2f4f39',
                            operation: 'Add',
                            roleId: '297ed0d04d544d69014d544e0b4a0729',
                            roleName: 'SailPoint Developer',
                            state: 'Pending'
                        }, {
                            accountName: 'New account',
                            entitlementApplication: null,
                            entitlementName: null,
                            entitlementRequest: false,
                            entitlementValue: null,
                            id: 'b69253553a694f608b6de7f4a4b9dae9',
                            operation: 'Add',
                            roleId: '297ed0d04d544d69014d544e0b53072a',
                            roleName: 'SailPoint Tester',
                            state: 'Pending'
                        }, {
                            accountName: 'New account',
                            entitlementApplication: 'RealLDAPWithDemoData',
                            entitlementName: 'groups',
                            entitlementRequest: true,
                            entitlementValue: 'cn=\\\'Quote\\\' group,OU=pass-thru,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            id: '85a5941cc1444875b1299b1615c6beda',
                            operation: 'Add',
                            roleId: null,
                            roleName: null,
                            state: 'Pending'
                        }] },

                    workItemTestData2: {
                        id: '2',
                        target: {
                            id: '35345345',
                            name: 'Coco.Chanel',
                            displayName: 'Coco Chanel',
                            workgroup: false
                        },
                        requester: {
                            id: '57565675675',
                            name: 'Christian.Dior',
                            displayName: 'Christian Dior',
                            workgroup: false
                        },
                        created: 126230400000,
                        workItemType: 'Approval'
                    },

                    workItemTestData3: {
                        accessRequestName: null,
                        allowRequestsWithViolations: true,
                        assignee: null,
                        attributes: null,
                        commentCount: 0,
                        created: 1438370139578,
                        esigMeaning: null,
                        id: '297ed0d04ee52c50014ee58a8dba002b',
                        owner: {
                            attributes: null,
                            displayName: 'James Smith',
                            id: '297ed0d04ed01fea014ed0209e9305b7',
                            name: 'James.Smith',
                            workgroup: false
                        },
                        priority: 'Normal',
                        requestedItems: [{
                            accountName: null,
                            attributes: {},
                            entitlementApplication: null,
                            entitlementName: null,
                            entitlementRequest: false,
                            entitlementValue: null,
                            id: '073653ce9d724b1e858792efb69eea53',
                            operation: 'Add',
                            roleId: '297ed0d04ed01fea014ed020ac5f0753',
                            roleName: 'SailPoint Developer',
                            state: 'Pending'
                        }, {
                            accountName: 'Amanda.Ross',
                            attributes: {},
                            entitlementApplication: 'ADDirectDemodata',
                            entitlementName: 'memberOf',
                            entitlementRequest: true,
                            entitlementValue: 'CN=a2a,OU=HierarchicalGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            id: 'ecdf6b8b5b71454c902707b74f81ed2c',
                            operation: 'Add',
                            roleId: null,
                            roleName: null,
                            state: 'Pending'
                        }, {
                            accountName: 'Amanda.Ross',
                            attributes: {},
                            entitlementApplication: 'ADDirectDemodata',
                            entitlementName: 'memberOf',
                            entitlementRequest: true,
                            entitlementValue: 'CN=a2b,OU=HierarchicalGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            id: '6a4abc15f36544f8b56a8e7cb36ecb6c',
                            operation: 'Add',
                            roleId: null,
                            roleName: null,
                            state: 'Pending'
                        }],
                        requester: {
                            attributes: null,
                            displayName: 'James Smith',
                            id: '297ed0d04ed01fea014ed0209e9305b7',
                            name: 'James.Smith',
                            workgroup: false
                        },
                        target: {
                            attributes: null,
                            displayName: 'Amanda Ross',
                            id: '297ed0d04ed01fea014ed020683802f3',
                            name: 'Amanda.Ross',
                            workgroup: false
                        },
                        violations: [{
                            constraintDescription: 'baaaad',
                            policyName: 'entitlement test policy',
                            ruleName: 'a2a violates a2b',
                            workitemId: '297ed0d04ee52c50014ee58a8dba002b',
                            leftBundles: null,
                            policyType: 'EntitlementSOD',
                            entitlements: [{
                                application: 'ADDirectDemodata',
                                name: 'memberOf',
                                value: 'CN=a2a,OU=HierarchicalGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com'
                            }, {
                                application: 'ADDirectDemodata',
                                name: 'memberOf',
                                value: 'CN=a2b,OU=HierarchicalGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com'
                            }],
                            rightBundles: null
                        }],
                        workItemName: '0000000011',
                        workItemType: 'ViolationReview'
                    },

                    workItemTestData4: {
                        id: '2',
                        target: {
                            id: '35345345',
                            name: 'Coco.Chanel',
                            displayName: 'Coco Chanel',
                            workgroup: false
                        },
                        requester: {
                            id: '57565675675',
                            name: 'Christian.Dior',
                            displayName: 'Christian Dior',
                            workgroup: false
                        },
                        created: 126230400000,
                        workItemType: 'Form'
                    },

                    APPROVAL: {
                        'id': '1234',
                        'workItemName': '49',
                        'workItemType': 'Approval',
                        'accessRequestName': '129',
                        'requestType': 'AccessRequest',
                        'created': 1391618385380,
                        'target': {
                            'id': '80987',
                            'name': 'Harry.Dixon',
                            'displayName': 'Harry Dixon'
                        },
                        'requester': {
                            'id': 'jhjhdf8798',
                            'name': 'Mary.Johnson',
                            'displayName': 'Mary Johnson'
                        },
                        'owner': {
                            'id': '897987f',
                            'name': 'James.Smith',
                            'displayName': 'James Smith'
                        },
                        'assignee': {
                            'id': '34955890fnksio',
                            'name': 'Amanda.Ross',
                            'displayName': 'Amanda Ross'
                        },
                        'priority': 'High',
                        'comments': [{
                            'author': 'James.Smith',
                            'comment': 'some comment here',
                            'date': 1391618385380
                        }],
                        'commentCount': 1,
                        'approvalItems': [{
                            'comments': [{
                                'author': 'James.Smith',
                                'comment': 'some comment here',
                                'date': 1391618385380
                            }],
                            'commentCount': 1,
                            'displayValue': 'Benefits Display',
                            'value': 'Benefits',
                            'id': 'item1',
                            'itemType': 'Role',
                            'operation': 'Add',
                            'newAccount': true,
                            'editable': true,
                            'decision': 'Rejected',
                            'sunrise': 1391618385380,
                            'sunset': 1392223185380,
                            'description': null,
                            'owner': {
                                'id': '897987f',
                                'name': 'Bob.Jones',
                                'displayName': 'Bob Jones'
                            },
                            'assignmentNote': 'some assignment note'
                        }, {
                            'application': 'Active_Directory',
                            'comments': [{
                                'author': 'James.Smith',
                                'comment': 'some comment here',
                                'date': 98739872341
                            }],
                            'commentCount': 1,
                            'displayName': 'Group',
                            'displayValue': 'Domain Administrators Display',
                            'id': 'item2',
                            'itemType': 'Entitlement',
                            'name': 'groupmbr',
                            'nativeIdentity': '100',
                            'accountDisplayName': 'hdixon',
                            'operation': 'Add',
                            'editable': true,
                            'newAccount': false,
                            'value': 'Domain Administrators',
                            'decision': 'Approved',
                            'sunrise': 1391618385380,
                            'owner': null,
                            'description': '<em>Domain Administrators</em> is a group of people that think they are really ' + 'cool, but they\'re actually super nerds.  It\'s alright ... they do have ' + 'a lot of power and can do cool stuff like unlock your account when you\'ve ' + 'had a few too many, or make it so your boss isn\'t able to login on April ' + 'fools day.  Just promise to give them tickets to the advance screening ' + 'of any Sci-Fi film and they will do your bidding.  Bribery ... it works ' + 'on all types.  Give it a try ... you\'ll see.',
                            'assignmentNote': null
                        }, {
                            'application': 'Oracle_DB',
                            'comments': [{
                                'author': 'James.Smith',
                                'comment': 'some comment here',
                                'date': 98739872341
                            }, {
                                'author': 'James.Smith',
                                'comment': 'some other comment now',
                                'date': 98739992341
                            }],
                            'commentCount': 2,
                            'id': 'item3',
                            'itemType': 'Account',
                            'nativeIdentity': '100',
                            'accountDisplayName': 'hdixon',
                            'operation': 'Delete',
                            'editable': true,
                            'newAccount': false,
                            'decision': null,
                            'assignmentNote': null
                        }, {
                            'comments': [],
                            'commentCount': 0,
                            'displayValue': 'Blarghthmp',
                            'value': 'Blarghthmp',
                            'id': 'item4',
                            'itemType': 'Role',
                            'operation': 'Add',
                            'editable': true,
                            'newAccount': false,
                            'hadSunriseSunset': true,
                            'description': null,
                            'assignmentNote': 'some assignment note'
                        }]
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtVGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsV0FBVyw0QkFBNEIsVUFBVSxTQUFTOztJQUMzRTs7SUFHSSxJQUFJLFNBQVM7SUFDYixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSx5QkFBeUI7WUFDbEMsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixRQUFRLE9BQU87Ozs7O1lBS2YsUUFBUSxvQkFBb0IsWUFBVzs7Z0JBRW5DLE9BQU87b0JBQ0gsbUJBQW1CO3dCQUNmLElBQUk7d0JBQ0osUUFBUTs0QkFDSixJQUFJOzRCQUNKLE1BQU07NEJBQ04sYUFBYTs0QkFDYixXQUFXOzt3QkFFZixXQUFXOzRCQUNQLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzRCQUNiLFdBQVc7O3dCQUVmLFNBQVM7d0JBQ1QsY0FBYzt3QkFDZCxZQUFZO3dCQUNSOzRCQUNJLFlBQVk7NEJBQ1osVUFBVTs0QkFDVixZQUFZOzRCQUNaLGFBQWEsQ0FDVDs0QkFFSixZQUFZOzRCQUNaLGNBQWM7NEJBQ2QsY0FBYyxDQUNWOzJCQUdSOzRCQUNJLFlBQVk7NEJBQ1osVUFBVTs0QkFDVixZQUFZOzRCQUNaLGFBQWEsQ0FDVDs0QkFFSixZQUFZOzRCQUNaLGNBQWM7NEJBQ2QsY0FBYyxDQUNWOzt3QkFJWixnQkFBZ0IsQ0FDWjs0QkFDSSxhQUFhOzRCQUNiLFlBQVksRUFBQyw2QkFBNkI7NEJBQzFDLHdCQUF3Qjs0QkFDeEIsaUJBQWlCOzRCQUNqQixvQkFBb0I7NEJBQ3BCLGtCQUFrQjs0QkFDbEIsSUFBSTs0QkFDSixXQUFXOzRCQUNYLFFBQVE7NEJBQ1IsVUFBVTs0QkFDVixPQUFPOzJCQUVYOzRCQUNJLGFBQWE7NEJBQ2IsWUFBWSxFQUFDLDZCQUE2Qjs0QkFDMUMsd0JBQXdCOzRCQUN4QixpQkFBaUI7NEJBQ2pC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Q1osa0JBQW1COzRCQUNuQixzQkFBdUI7NEJBQ3ZCLGFBQWM7NEJBQ2QsWUFBWTs0QkFDWixjQUFlOzRCQUNmLFlBQVk7NEJBQ1osa0JBQWtCOzJCQUNuQjs0QkFDQyxZQUFhOzRCQUNiLGdCQUFpQjs0QkFDakIsZ0JBQWlCOzRCQUNqQixTQUFVOzRCQUNWLE1BQU87NEJBQ1AsWUFBWTs0QkFDWixhQUFjOzRCQUNkLFlBQVk7NEJBQ1osY0FBZTs0QkFDZixvQkFBb0I7NEJBQ3BCLGVBQWU7NEJBQ2Ysa0JBQWtCOzs7Ozs7O0dBaEIvQiIsImZpbGUiOiJ3b3JraXRlbS9Xb3JrSXRlbVRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE1IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUod29ya0l0ZW1Nb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgZGF0YSB1c2VkIGZvciB0ZXN0aW5nIHdvcmsgaXRlbXMuXG4gKi9cbmZhY3RvcnkoJ3dvcmtJdGVtVGVzdERhdGEnLCBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHdvcmtJdGVtVGVzdERhdGExOiB7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc3Nzg4OTcyMzk0ODcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKYW1lcy5IZXRmaWVsZCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdKYW1lcyBIZXRmaWVsZCcsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAnODcyODkyMzQ4OTcyMzQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdEYXZlLk11c3RhaW5lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0RhdmUgTXVzdGFpbmUnLFxuICAgICAgICAgICAgICAgIHdvcmtncm91cDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVhdGVkOiAxMjYyMzA0MDAwMDAsXG4gICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgdmlvbGF0aW9uczogWyAvLyBBZGQgbW9yZSB2aW9sYXRpb25zIGhlcmUgdG8gdGVzdCBtdWx0aXBsZSB2aW9sYXRpb25zLlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5TmFtZTogJ1NhaWxwb2ludCBUZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdzYWlscG9pbnQgZGV2IHRlc3QnLFxuICAgICAgICAgICAgICAgICAgICB3b3JraXRlbUlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnRCdW5kbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2FpbHBvaW50IGRldidcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ1NPRCcsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50czogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRCdW5kbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2FpbHBvaW50IHRlc3QnXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5TmFtZTogJ1NhaWxwb2ludCBUZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdzYWlscG9pbnQgdGVzdCBkZXYnLFxuICAgICAgICAgICAgICAgICAgICB3b3JraXRlbUlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnRCdW5kbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2FpbFBvaW50IERldmVsb3BlcidcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VHlwZTogJ1NPRCcsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50czogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRCdW5kbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2FpbFBvaW50IFRlc3RlcidcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdOZXcgYWNjb3VudCcsXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHthbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnM6IHRydWV9LFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50UmVxdWVzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnYTMwNzk3MmFjOGY4NDQzYWE3ZGE1NTExZWVjYmQ5N2InLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxuICAgICAgICAgICAgICAgICAgICByb2xlSWQ6ICcyOTdlZDBkMDRkNTQ0ZDY5MDE0ZDU0NGRkMmVlMDM5OCcsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnQmVuZWZpdHMgQ2xlcmsnLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogJ0ZpbmlzaGVkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ05ldyBhY2NvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge2FsbG93UmVxdWVzdHNXaXRoVmlvbGF0aW9uczogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50UmVxdWVzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQSBib3JpbmcgZGVzY3JpcHRpb24gYWJvdXQgbm90aGluZycsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnOGU3MzRiODM3MmY1NGNlYTk2MDkyM2VjYmIyZjRmMzknLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxuICAgICAgICAgICAgICAgICAgICByb2xlSWQ6ICcyOTdlZDBkMDRkNTQ0ZDY5MDE0ZDU0NGUwYjRhMDcyOScsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnU2FpbFBvaW50IERldmVsb3BlcicsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAnUGVuZGluZydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdOZXcgYWNjb3VudCcsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50QXBwbGljYXRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRSZXF1ZXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRWYWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdiNjkyNTM1NTNhNjk0ZjYwOGI2ZGU3ZjRhNGI5ZGFlOScsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVJZDogJzI5N2VkMGQwNGQ1NDRkNjkwMTRkNTQ0ZTBiNTMwNzJhJyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdTYWlsUG9pbnQgVGVzdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICdQZW5kaW5nJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ05ldyBhY2NvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRBcHBsaWNhdGlvbjogJ1JlYWxMREFQV2l0aERlbW9EYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnROYW1lOiAnZ3JvdXBzJyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRSZXF1ZXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudFZhbHVlOiAnY249XFxcXFxcJ1F1b3RlXFxcXFxcJyBncm91cCxPVT1wYXNzLXRocnUsT1U9RGVtb0RhdGEsREM9dGVzdCxEQz1zYWlscG9pbnQsREM9Y29tJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICc4NWE1OTQxY2MxNDQ0ODc1YjEyOTliMTYxNWM2YmVkYScsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVJZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAnUGVuZGluZydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdfSxcblxuICAgICAgICB3b3JrSXRlbVRlc3REYXRhMjoge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgIGlkOiAnMzUzNDUzNDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdDb2NvLkNoYW5lbCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdDb2NvIENoYW5lbCcsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAnNTc1NjU2NzU2NzUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdDaHJpc3RpYW4uRGlvcicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdDaHJpc3RpYW4gRGlvcicsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IDEyNjIzMDQwMDAwMCxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ0FwcHJvdmFsJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHdvcmtJdGVtVGVzdERhdGEzOiB7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0TmFtZTogbnVsbCxcbiAgICAgICAgICAgIGFsbG93UmVxdWVzdHNXaXRoVmlvbGF0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgIGFzc2lnbmVlOiBudWxsLFxuICAgICAgICAgICAgYXR0cmlidXRlczogbnVsbCxcbiAgICAgICAgICAgIGNvbW1lbnRDb3VudDogMCxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IDE0MzgzNzAxMzk1NzgsXG4gICAgICAgICAgICBlc2lnTWVhbmluZzogbnVsbCxcbiAgICAgICAgICAgIGlkOiAnMjk3ZWQwZDA0ZWU1MmM1MDAxNGVlNThhOGRiYTAwMmInLFxuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSmFtZXMgU21pdGgnLFxuICAgICAgICAgICAgICAgIGlkOiAnMjk3ZWQwZDA0ZWQwMWZlYTAxNGVkMDIwOWU5MzA1YjcnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKYW1lcy5TbWl0aCcsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW9yaXR5OiAnTm9ybWFsJyxcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50QXBwbGljYXRpb246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRSZXF1ZXN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRWYWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcwNzM2NTNjZTlkNzI0YjFlODU4NzkyZWZiNjllZWE1MycsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVJZDogJzI5N2VkMGQwNGVkMDFmZWEwMTRlZDAyMGFjNWYwNzUzJyxcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdTYWlsUG9pbnQgRGV2ZWxvcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6ICdQZW5kaW5nJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FtYW5kYS5Sb3NzJyxcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50QXBwbGljYXRpb246ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnROYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudFJlcXVlc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6ICdDTj1hMmEsT1U9SGllcmFyY2hpY2FsR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZWNkZjZiOGI1YjcxNDU0YzkwMjcwN2I3NGY4MWVkMmMnLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxuICAgICAgICAgICAgICAgICAgICByb2xlSWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogJ1BlbmRpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnQW1hbmRhLlJvc3MnLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRBcHBsaWNhdGlvbjogJ0FERGlyZWN0RGVtb2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudE5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0bGVtZW50UmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRWYWx1ZTogJ0NOPWEyYixPVT1IaWVyYXJjaGljYWxHcm91cHMsT1U9RGVtb0RhdGEsREM9dGVzdCxEQz1zYWlscG9pbnQsREM9Y29tJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICc2YTRhYmMxNWYzNjU0NGY4YjU2YThlN2NiMzZlY2I2YycsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXG4gICAgICAgICAgICAgICAgICAgIHJvbGVJZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiAnUGVuZGluZydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVxdWVzdGVyOiB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogbnVsbCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0phbWVzIFNtaXRoJyxcbiAgICAgICAgICAgICAgICBpZDogJzI5N2VkMGQwNGVkMDFmZWEwMTRlZDAyMDllOTMwNWI3JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgIHdvcmtncm91cDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQW1hbmRhIFJvc3MnLFxuICAgICAgICAgICAgICAgIGlkOiAnMjk3ZWQwZDA0ZWQwMWZlYTAxNGVkMDIwNjgzODAyZjMnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdBbWFuZGEuUm9zcycsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpb2xhdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnREZXNjcmlwdGlvbjogJ2JhYWFhZCcsXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdlbnRpdGxlbWVudCB0ZXN0IHBvbGljeScsXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVOYW1lOiAnYTJhIHZpb2xhdGVzIGEyYicsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtpdGVtSWQ6ICcyOTdlZDBkMDRlZTUyYzUwMDE0ZWU1OGE4ZGJhMDAyYicsXG4gICAgICAgICAgICAgICAgICAgIGxlZnRCdW5kbGVzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwb2xpY3lUeXBlOiAnRW50aXRsZW1lbnRTT0QnLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdGxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FERGlyZWN0RGVtb2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDTj1hMmEsT1U9SGllcmFyY2hpY2FsR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ049YTJiLE9VPUhpZXJhcmNoaWNhbEdyb3VwcyxPVT1EZW1vRGF0YSxEQz10ZXN0LERDPXNhaWxwb2ludCxEQz1jb20nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QnVuZGxlczogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB3b3JrSXRlbU5hbWU6ICcwMDAwMDAwMDExJyxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ1Zpb2xhdGlvblJldmlldydcbiAgICAgICAgfSxcblxuICAgICAgICB3b3JrSXRlbVRlc3REYXRhNDoge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgIGlkOiAnMzUzNDUzNDUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdDb2NvLkNoYW5lbCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdDb2NvIENoYW5lbCcsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgIGlkOiAnNTc1NjU2NzU2NzUnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdDaHJpc3RpYW4uRGlvcicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdDaHJpc3RpYW4gRGlvcicsXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IDEyNjIzMDQwMDAwMCxcbiAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ0Zvcm0nXG4gICAgICAgIH0sXG5cbiAgICAgICAgQVBQUk9WQUw6IHtcbiAgICAgICAgICAgICdpZCcgOiAnMTIzNCcsXG4gICAgICAgICAgICAnd29ya0l0ZW1OYW1lJzogJzQ5JyxcbiAgICAgICAgICAgICd3b3JrSXRlbVR5cGUnOiAnQXBwcm92YWwnLFxuICAgICAgICAgICAgJ2FjY2Vzc1JlcXVlc3ROYW1lJzogJzEyOScsXG4gICAgICAgICAgICAncmVxdWVzdFR5cGUnIDogJ0FjY2Vzc1JlcXVlc3QnLFxuICAgICAgICAgICAgJ2NyZWF0ZWQnIDogMTM5MTYxODM4NTM4MCxcbiAgICAgICAgICAgICd0YXJnZXQnIDoge1xuICAgICAgICAgICAgICAgICdpZCc6ICc4MDk4NycsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnSGFycnkuRGl4b24nLFxuICAgICAgICAgICAgICAgICdkaXNwbGF5TmFtZSc6ICdIYXJyeSBEaXhvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncmVxdWVzdGVyJyA6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiAnamhqaGRmODc5OCcsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnTWFyeS5Kb2huc29uJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnTWFyeSBKb2huc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdvd25lcicgOiB7XG4gICAgICAgICAgICAgICAgJ2lkJzogJzg5Nzk4N2YnLFxuICAgICAgICAgICAgICAgICduYW1lJzogJ0phbWVzLlNtaXRoJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnSmFtZXMgU21pdGgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2Fzc2lnbmVlJyA6IHtcbiAgICAgICAgICAgICAgICAnaWQnOiAnMzQ5NTU4OTBmbmtzaW8nLFxuICAgICAgICAgICAgICAgICduYW1lJzogJ0FtYW5kYS5Sb3NzJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnQW1hbmRhIFJvc3MnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3ByaW9yaXR5JzogJ0hpZ2gnLFxuICAgICAgICAgICAgJ2NvbW1lbnRzJyA6IFt7XG4gICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIGNvbW1lbnQgaGVyZScsXG4gICAgICAgICAgICAgICAgJ2RhdGUnOiAxMzkxNjE4Mzg1MzgwXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdjb21tZW50Q291bnQnOiAxLFxuICAgICAgICAgICAgJ2FwcHJvdmFsSXRlbXMnIDogW3tcbiAgICAgICAgICAgICAgICAnY29tbWVudHMnIDogW3tcbiAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudCcgOiAnc29tZSBjb21tZW50IGhlcmUnLFxuICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IDEzOTE2MTgzODUzODBcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JyA6IDEsXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZScgOiAnQmVuZWZpdHMgRGlzcGxheScsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICdCZW5lZml0cycsXG4gICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtMScsXG4gICAgICAgICAgICAgICAgJ2l0ZW1UeXBlJzogJ1JvbGUnLFxuICAgICAgICAgICAgICAgICdvcGVyYXRpb24nIDogJ0FkZCcsXG4gICAgICAgICAgICAgICAgJ25ld0FjY291bnQnIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnZWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdkZWNpc2lvbic6ICdSZWplY3RlZCcsXG4gICAgICAgICAgICAgICAgJ3N1bnJpc2UnOiAxMzkxNjE4Mzg1MzgwLFxuICAgICAgICAgICAgICAgICdzdW5zZXQnOiAxMzkyMjIzMTg1MzgwLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6IG51bGwsXG4gICAgICAgICAgICAgICAgJ293bmVyJyA6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJzg5Nzk4N2YnLFxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdCb2IuSm9uZXMnLFxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnQm9iIEpvbmVzJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2Fzc2lnbm1lbnROb3RlJzogJ3NvbWUgYXNzaWdubWVudCBub3RlJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicgOiAnQWN0aXZlX0RpcmVjdG9yeScsXG4gICAgICAgICAgICAgICAgJ2NvbW1lbnRzJyA6IFt7XG4gICAgICAgICAgICAgICAgICAgICdhdXRob3InIDogJ0phbWVzLlNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnIDogJ3NvbWUgY29tbWVudCBoZXJlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiA5ODczOTg3MjM0MVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICdjb21tZW50Q291bnQnIDogMSxcbiAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnIDogJ0dyb3VwJyxcbiAgICAgICAgICAgICAgICAnZGlzcGxheVZhbHVlJyA6ICdEb21haW4gQWRtaW5pc3RyYXRvcnMgRGlzcGxheScsXG4gICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtMicsXG4gICAgICAgICAgICAgICAgJ2l0ZW1UeXBlJzogJ0VudGl0bGVtZW50JyxcbiAgICAgICAgICAgICAgICAnbmFtZScgOiAnZ3JvdXBtYnInLFxuICAgICAgICAgICAgICAgICduYXRpdmVJZGVudGl0eScgOiAnMTAwJyxcbiAgICAgICAgICAgICAgICAnYWNjb3VudERpc3BsYXlOYW1lJyA6ICdoZGl4b24nLFxuICAgICAgICAgICAgICAgICdvcGVyYXRpb24nIDogJ0FkZCcsXG4gICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnbmV3QWNjb3VudCcgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndmFsdWUnIDogJ0RvbWFpbiBBZG1pbmlzdHJhdG9ycycsXG4gICAgICAgICAgICAgICAgJ2RlY2lzaW9uJzogJ0FwcHJvdmVkJyxcbiAgICAgICAgICAgICAgICAnc3VucmlzZSc6IDEzOTE2MTgzODUzODAsXG4gICAgICAgICAgICAgICAgJ293bmVyJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnPGVtPkRvbWFpbiBBZG1pbmlzdHJhdG9yczwvZW0+IGlzIGEgZ3JvdXAgb2YgcGVvcGxlIHRoYXQgdGhpbmsgdGhleSBhcmUgcmVhbGx5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnY29vbCwgYnV0IHRoZXlcXCdyZSBhY3R1YWxseSBzdXBlciBuZXJkcy4gIEl0XFwncyBhbHJpZ2h0IC4uLiB0aGV5IGRvIGhhdmUgJyArXG4gICAgICAgICAgICAgICAgICAgICdhIGxvdCBvZiBwb3dlciBhbmQgY2FuIGRvIGNvb2wgc3R1ZmYgbGlrZSB1bmxvY2sgeW91ciBhY2NvdW50IHdoZW4geW91XFwndmUgJyArXG4gICAgICAgICAgICAgICAgICAgICdoYWQgYSBmZXcgdG9vIG1hbnksIG9yIG1ha2UgaXQgc28geW91ciBib3NzIGlzblxcJ3QgYWJsZSB0byBsb2dpbiBvbiBBcHJpbCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2Zvb2xzIGRheS4gIEp1c3QgcHJvbWlzZSB0byBnaXZlIHRoZW0gdGlja2V0cyB0byB0aGUgYWR2YW5jZSBzY3JlZW5pbmcgJyArXG4gICAgICAgICAgICAgICAgICAgICdvZiBhbnkgU2NpLUZpIGZpbG0gYW5kIHRoZXkgd2lsbCBkbyB5b3VyIGJpZGRpbmcuICBCcmliZXJ5IC4uLiBpdCB3b3JrcyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ29uIGFsbCB0eXBlcy4gIEdpdmUgaXQgYSB0cnkgLi4uIHlvdVxcJ2xsIHNlZS4nLFxuICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6IG51bGxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nIDogJ09yYWNsZV9EQicsXG4gICAgICAgICAgICAgICAgJ2NvbW1lbnRzJyA6IFt7XG4gICAgICAgICAgICAgICAgICAgICdhdXRob3InIDogJ0phbWVzLlNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnIDogJ3NvbWUgY29tbWVudCBoZXJlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiA5ODczOTg3MjM0MVxuICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAnYXV0aG9yJyA6ICdKYW1lcy5TbWl0aCcsXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIG90aGVyIGNvbW1lbnQgbm93JyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiA5ODczOTk5MjM0MVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICdjb21tZW50Q291bnQnIDogMixcbiAgICAgICAgICAgICAgICAnaWQnIDogJ2l0ZW0zJyxcbiAgICAgICAgICAgICAgICAnaXRlbVR5cGUnOiAnQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgJ25hdGl2ZUlkZW50aXR5JyA6ICcxMDAnLFxuICAgICAgICAgICAgICAgICdhY2NvdW50RGlzcGxheU5hbWUnIDogJ2hkaXhvbicsXG4gICAgICAgICAgICAgICAgJ29wZXJhdGlvbicgOiAnRGVsZXRlJyxcbiAgICAgICAgICAgICAgICAnZWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICduZXdBY2NvdW50JyA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdkZWNpc2lvbic6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2Fzc2lnbm1lbnROb3RlJzogbnVsbFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbXSxcbiAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JyA6IDAsXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZScgOiAnQmxhcmdodGhtcCcsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICdCbGFyZ2h0aG1wJyxcbiAgICAgICAgICAgICAgICAnaWQnIDogJ2l0ZW00JyxcbiAgICAgICAgICAgICAgICAnaXRlbVR5cGUnOiAnUm9sZScsXG4gICAgICAgICAgICAgICAgJ29wZXJhdGlvbicgOiAnQWRkJyxcbiAgICAgICAgICAgICAgICAnZWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICduZXdBY2NvdW50JyA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdoYWRTdW5yaXNlU3Vuc2V0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiBudWxsLFxuICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6ICdzb21lIGFzc2lnbm1lbnQgbm90ZSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9O1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
