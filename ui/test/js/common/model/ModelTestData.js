System.register(['angular', 'common/model/ModelModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var angular, modelModule;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            angular.module(modelModule).

            /**
             * Test data used for testing sailpoint.model.
             */
            factory('modelTestData', function () {

                var genericResult = {
                    attributes: { foobar: 'bingo' },
                    complete: true,
                    errors: ['error 1', 'error 2'],
                    failure: false,
                    metaData: {
                        totalEntitlementCount: 3
                    },
                    requestID: '1234',
                    retry: false,
                    retryWait: 0,
                    status: 'success',
                    success: true,
                    warnings: ['warning 1', 'warning 2']
                };

                return {
                    GENERIC_REQUEST_RESULT: angular.copy(genericResult),

                    GENERIC_LIST_RESULT: angular.extend({}, genericResult, {
                        count: 2,
                        objects: [{
                            description: '<strong><em>This committee is in charge of stuff for the company</em></strong>',
                            applicationName: 'ADDirectDemodata',
                            value: 'CN=BenefitCommittee_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            roleName: 'Direct',
                            property: 'memberOf',
                            displayValue: 'BenefitCommittee_AD'
                        }, {
                            description: '<strong><em>Group assigned to workers in the Benefits department</em></strong>',
                            applicationName: 'ADDirectDemodata',
                            value: 'CN=Benefits_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            property: 'memberOf',
                            roleName: 'ADDirect-Benefits Clerk',
                            displayValue: 'Benefits_AD'
                        }]
                    }),

                    GENERIC_OBJECT_RESULT: angular.extend({}, genericResult, {
                        object: {
                            description: '<strong><em>This committee is in charge of stuff for the company</em></strong>',
                            applicationName: 'ADDirectDemodata',
                            value: 'CN=BenefitCommittee_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            roleName: 'Direct',
                            property: 'memberOf',
                            displayValue: 'BenefitCommittee_AD'
                        }
                    }),

                    ROLE_ENTITLEMENT_DATA: {
                        description: '<strong><em>LDP-Testing of internally developed products<\/em><\/strong>',
                        applicationName: 'RealLDAPWithDemoData',
                        value: 'CN=QualityAssurance_LDP,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                        property: 'groups',
                        roleName: 'direct',
                        displayValue: 'QualityAssurance_LDP'
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
                    },

                    ROLE_POLICY_VIOLATION_DATA: {
                        policyName: 'role pv policyName',
                        description: 'role pv description',
                        ruleName: 'role pv ruleName',
                        workItemId: 'role pv workItemId',
                        leftBundles: ['role pv leftBundle1', 'role pv leftBundle2'],
                        rightBundles: ['role pv rightBundle1', 'role pv rightBundle2']
                    },

                    ENTITLEMENT_POLICY_VIOLATION_DATA: {
                        policyName: 'entitlement pv policyName',
                        description: 'entitlement pv description',
                        ruleName: 'entitlement pv ruleName',
                        workItemId: 'entitlement pv workItemId',
                        entitlements: [{
                            application: 'entitlement app1',
                            name: 'entitlement name1',
                            value: 'entitlement value1'
                        }, {
                            application: 'entitlement app2',
                            name: 'entitlement name2',
                            value: 'entitlement value2'
                        }]
                    },

                    POLICY_VIOLATION_ROLE: {
                        id: '11',
                        accessType: 'Role',
                        displayableAccessType: 'Role',
                        name: 'role pv leftBundle1',
                        displayableName: 'lefty',
                        owner: 'Chamillionaire',
                        description: 'just ridin dirty',
                        riskScoreWeight: 800
                    },

                    VIOLATION_REVIEW_ROLE: {
                        accountName: 'New account',
                        attributes: { allowRequestsWithViolations: false },
                        entitlementApplication: null,
                        entitlementName: null,
                        entitlementRequest: false,
                        entitlementValue: null,
                        description: 'A boring description about nothing',
                        id: '33',
                        operation: 'Add',
                        roleId: '333',
                        roleName: 'role pv leftBundle1',
                        state: 'Pending'
                    },

                    POLICY_VIOLATION_ENTITLEMENT: {
                        id: '22',
                        accessType: 'Entitlement',
                        displayableAccessType: 'Entitlement!!',
                        displayableName: 'entitlement value1',
                        owner: 'J Mon$y',
                        description: 'go to work',
                        icon: 'champagneBottle',
                        application: 'entitlement app1',
                        attribute: 'entitlement name1',
                        value: 'entitlement value1'
                    },

                    VIOLATION_REVIEW_ENTITLEMENT: {
                        accountName: 'Amanda.Ross',
                        attributes: {},
                        entitlementApplication: 'entitlement app1',
                        entitlementName: 'entitlement name1',
                        entitlementRequest: true,
                        entitlementValue: 'entitlement value1',
                        id: '44',
                        operation: 'Add',
                        roleId: null,
                        roleName: null,
                        state: 'Pending'
                    },

                    ENTITLEMENT: {
                        id: '2',
                        accessType: 'Entitlement',
                        displayableAccessType: 'Entitlement!!',
                        displayableName: 'Poppin dat cris',
                        value: 'CN=Quest,OU=Tribe,OU=Called,DC=test,DC=sailpoint,DC=com',
                        owner: 'J Mon$y',
                        description: 'go to work',
                        icon: 'champagneBottle',
                        application: 'Bar',
                        attribute: 'libation'
                    },

                    IDENTITY_SEARCH_ROLE: {
                        id: '3',
                        accessType: 'Role',
                        displayableAccessType: 'Role!!',
                        name: 'Id searchin',
                        displayableName: 'and with my homies',
                        owner: 'Chamillionaire',
                        description: 'my posse',
                        riskScoreWeight: 0,
                        riskScoreColor: '000000',
                        riskScoreTextColor: 'FFFFFF',
                        populationStatistics: {
                            total: 20,
                            count: 10,
                            highRisk: true
                        },
                        permitted: true
                    },

                    ROLE: {
                        id: '1',
                        accessType: 'Role',
                        displayableAccessType: 'Role',
                        name: 'They see me role-in',
                        displayableName: 'with my homies',
                        owner: 'Chamillionaire',
                        description: 'just ridin dirty',
                        riskScoreWeight: 800
                    },

                    POPULATION_STATISTICS: {
                        total: 20,
                        count: 10,
                        highRisk: true
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Nb2RlbFRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLFdBQVcsNkJBQTZCLFVBQVUsU0FBUzs7SUFDNUU7O0lBR0ksSUFBSSxTQUFTO0lBQ2IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLFVBQVU7WUFDMUIsVUFBVSxTQUFTO1dBQ3BCLFVBQVUseUJBQXlCO1lBQ2xDLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7O1lBTDdCLFFBQVEsT0FBTzs7Ozs7WUFLWCxRQUFRLGlCQUFpQixZQUFXOztnQkFFaEMsSUFBSSxnQkFBZ0I7b0JBQ2hCLFlBQVksRUFBRSxRQUFRO29CQUN0QixVQUFVO29CQUNWLFFBQVEsQ0FBQyxXQUFXO29CQUNwQixTQUFTO29CQUNULFVBQVU7d0JBQ04sdUJBQXVCOztvQkFFM0IsV0FBVztvQkFDWCxPQUFPO29CQUNQLFdBQVc7b0JBQ1gsUUFBUTtvQkFDUixTQUFTO29CQUNULFVBQVUsQ0FBQyxhQUFhOzs7Z0JBRzVCLE9BQU87b0JBQ0gsd0JBQXdCLFFBQVEsS0FBSzs7b0JBRXJDLHFCQUFxQixRQUFRLE9BQU8sSUFBSSxlQUFlO3dCQUNuRCxPQUFPO3dCQUNQLFNBQVMsQ0FDTDs0QkFDSSxhQUFhOzRCQUNiLGlCQUFpQjs0QkFDakIsT0FBTzs0QkFDUCxVQUFVOzRCQUNWLFVBQVU7NEJBQ1YsY0FBYzsyQkFFbEI7NEJBQ0ksYUFBYTs0QkFDYixpQkFBaUI7NEJBQ2pCLE9BQU87NEJBQ1AsVUFBVTs0QkFDVixVQUFVOzRCQUNWLGNBQWM7Ozs7b0JBSzFCLHVCQUF1QixRQUFRLE9BQU8sSUFBSSxlQUFlO3dCQUNyRCxRQUFROzRCQUNKLGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixPQUFPOzRCQUNQLFVBQVU7NEJBQ1YsVUFBVTs0QkFDVixjQUFjOzs7O29CQUl0Qix1QkFBdUI7d0JBQ25CLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixPQUFPO3dC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LCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUobW9kZWxNb2R1bGUpLlxuXG4vKipcbiAqIFRlc3QgZGF0YSB1c2VkIGZvciB0ZXN0aW5nIHNhaWxwb2ludC5tb2RlbC5cbiAqL1xuICAgIGZhY3RvcnkoJ21vZGVsVGVzdERhdGEnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgZ2VuZXJpY1Jlc3VsdCA9IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZm9vYmFyOiAnYmluZ28nIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yczogWydlcnJvciAxJywgJ2Vycm9yIDInXSxcbiAgICAgICAgICAgIGZhaWx1cmU6IGZhbHNlLFxuICAgICAgICAgICAgbWV0YURhdGE6IHtcbiAgICAgICAgICAgICAgICB0b3RhbEVudGl0bGVtZW50Q291bnQ6IDNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1ZXN0SUQ6ICcxMjM0JyxcbiAgICAgICAgICAgIHJldHJ5OiBmYWxzZSxcbiAgICAgICAgICAgIHJldHJ5V2FpdDogMCxcbiAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIHdhcm5pbmdzOiBbJ3dhcm5pbmcgMScsICd3YXJuaW5nIDInXVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBHRU5FUklDX1JFUVVFU1RfUkVTVUxUOiBhbmd1bGFyLmNvcHkoZ2VuZXJpY1Jlc3VsdCksXG5cbiAgICAgICAgICAgIEdFTkVSSUNfTElTVF9SRVNVTFQ6IGFuZ3VsYXIuZXh0ZW5kKHt9LCBnZW5lcmljUmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJzxzdHJvbmc+PGVtPlRoaXMgY29tbWl0dGVlIGlzIGluIGNoYXJnZSBvZiBzdHVmZiBmb3IgdGhlIGNvbXBhbnk8L2VtPjwvc3Ryb25nPicsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ049QmVuZWZpdENvbW1pdHRlZV9BRCxPVT1kZW1vR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ0RpcmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ0JlbmVmaXRDb21taXR0ZWVfQUQnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnPHN0cm9uZz48ZW0+R3JvdXAgYXNzaWduZWQgdG8gd29ya2VycyBpbiB0aGUgQmVuZWZpdHMgZGVwYXJ0bWVudDwvZW0+PC9zdHJvbmc+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FERGlyZWN0RGVtb2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDTj1CZW5lZml0c19BRCxPVT1kZW1vR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnQUREaXJlY3QtQmVuZWZpdHMgQ2xlcmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnQmVuZWZpdHNfQUQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgR0VORVJJQ19PQkpFQ1RfUkVTVUxUOiBhbmd1bGFyLmV4dGVuZCh7fSwgZ2VuZXJpY1Jlc3VsdCwge1xuICAgICAgICAgICAgICAgIG9iamVjdDoge1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJzxzdHJvbmc+PGVtPlRoaXMgY29tbWl0dGVlIGlzIGluIGNoYXJnZSBvZiBzdHVmZiBmb3IgdGhlIGNvbXBhbnk8L2VtPjwvc3Ryb25nPicsXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FERGlyZWN0RGVtb2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0NOPUJlbmVmaXRDb21taXR0ZWVfQUQsT1U9ZGVtb0dyb3VwcyxPVT1EZW1vRGF0YSxEQz10ZXN0LERDPXNhaWxwb2ludCxEQz1jb20nLFxuICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ0RpcmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbWVtYmVyT2YnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdCZW5lZml0Q29tbWl0dGVlX0FEJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBST0xFX0VOVElUTEVNRU5UX0RBVEE6IHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJzxzdHJvbmc+PGVtPkxEUC1UZXN0aW5nIG9mIGludGVybmFsbHkgZGV2ZWxvcGVkIHByb2R1Y3RzPFxcL2VtPjxcXC9zdHJvbmc+JyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdSZWFsTERBUFdpdGhEZW1vRGF0YScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdDTj1RdWFsaXR5QXNzdXJhbmNlX0xEUCxPVT1kZW1vR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdncm91cHMnLFxuICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnZGlyZWN0JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdRdWFsaXR5QXNzdXJhbmNlX0xEUCdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIEFQUFJPVkFMOiB7XG4gICAgICAgICAgICAgICAgJ2lkJyA6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAnd29ya0l0ZW1OYW1lJzogJzQ5JyxcbiAgICAgICAgICAgICAgICAnd29ya0l0ZW1UeXBlJzogJ0FwcHJvdmFsJyxcbiAgICAgICAgICAgICAgICAnYWNjZXNzUmVxdWVzdE5hbWUnOiAnMTI5JyxcbiAgICAgICAgICAgICAgICAncmVxdWVzdFR5cGUnIDogJ0FjY2Vzc1JlcXVlc3QnLFxuICAgICAgICAgICAgICAgICdjcmVhdGVkJyA6IDEzOTE2MTgzODUzODAsXG4gICAgICAgICAgICAgICAgJ3RhcmdldCcgOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICc4MDk4NycsXG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogJ0hhcnJ5LkRpeG9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ0hhcnJ5IERpeG9uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3JlcXVlc3RlcicgOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICdqaGpoZGY4Nzk4JyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnTWFyeS5Kb2huc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ01hcnkgSm9obnNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdvd25lcicgOiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICc4OTc5ODdmJyxcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnSmFtZXMgU21pdGgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnYXNzaWduZWUnIDoge1xuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnMzQ5NTU4OTBmbmtzaW8nLFxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdBbWFuZGEuUm9zcycsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5TmFtZSc6ICdBbWFuZGEgUm9zcydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdwcmlvcml0eSc6ICdIaWdoJyxcbiAgICAgICAgICAgICAgICAnY29tbWVudHMnIDogW3tcbiAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudCcgOiAnc29tZSBjb21tZW50IGhlcmUnLFxuICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IDEzOTE2MTgzODUzODBcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JzogMSxcbiAgICAgICAgICAgICAgICAnYXBwcm92YWxJdGVtcycgOiBbe1xuICAgICAgICAgICAgICAgICAgICAnY29tbWVudHMnIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICdhdXRob3InIDogJ0phbWVzLlNtaXRoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIGNvbW1lbnQgaGVyZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IDEzOTE2MTgzODUzODBcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50Q291bnQnIDogMSxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZScgOiAnQmVuZWZpdHMgRGlzcGxheScsXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAnQmVuZWZpdHMnLFxuICAgICAgICAgICAgICAgICAgICAnaWQnIDogJ2l0ZW0xJyxcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1UeXBlJzogJ1JvbGUnLFxuICAgICAgICAgICAgICAgICAgICAnb3BlcmF0aW9uJyA6ICdBZGQnLFxuICAgICAgICAgICAgICAgICAgICAnbmV3QWNjb3VudCcgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnZWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnZGVjaXNpb24nOiAnUmVqZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICAnc3VucmlzZSc6IDEzOTE2MTgzODUzODAsXG4gICAgICAgICAgICAgICAgICAgICdzdW5zZXQnOiAxMzkyMjIzMTg1MzgwLFxuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAnb3duZXInIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogJzg5Nzk4N2YnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnQm9iLkpvbmVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5TmFtZSc6ICdCb2IgSm9uZXMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6ICdzb21lIGFzc2lnbm1lbnQgbm90ZSdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicgOiAnQWN0aXZlX0RpcmVjdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnIDogJ3NvbWUgY29tbWVudCBoZXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogOTg3Mzk4NzIzNDFcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50Q291bnQnIDogMSxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJyA6ICdHcm91cCcsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5VmFsdWUnIDogJ0RvbWFpbiBBZG1pbmlzdHJhdG9ycyBEaXNwbGF5JyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtMicsXG4gICAgICAgICAgICAgICAgICAgICdpdGVtVHlwZSc6ICdFbnRpdGxlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgICduYW1lJyA6ICdncm91cG1icicsXG4gICAgICAgICAgICAgICAgICAgICduYXRpdmVJZGVudGl0eScgOiAnMTAwJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FjY291bnREaXNwbGF5TmFtZScgOiAnaGRpeG9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ29wZXJhdGlvbicgOiAnQWRkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ25ld0FjY291bnQnIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAnRG9tYWluIEFkbWluaXN0cmF0b3JzJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlY2lzaW9uJzogJ0FwcHJvdmVkJyxcbiAgICAgICAgICAgICAgICAgICAgJ3N1bnJpc2UnOiAxMzkxNjE4Mzg1MzgwLFxuICAgICAgICAgICAgICAgICAgICAnb3duZXInOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnPGVtPkRvbWFpbiBBZG1pbmlzdHJhdG9yczwvZW0+IGlzIGEgZ3JvdXAgb2YgcGVvcGxlIHRoYXQgdGhpbmsgdGhleSBhcmUgcmVhbGx5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnY29vbCwgYnV0IHRoZXlcXCdyZSBhY3R1YWxseSBzdXBlciBuZXJkcy4gIEl0XFwncyBhbHJpZ2h0IC4uLiB0aGV5IGRvIGhhdmUgJyArXG4gICAgICAgICAgICAgICAgICAgICdhIGxvdCBvZiBwb3dlciBhbmQgY2FuIGRvIGNvb2wgc3R1ZmYgbGlrZSB1bmxvY2sgeW91ciBhY2NvdW50IHdoZW4geW91XFwndmUgJyArXG4gICAgICAgICAgICAgICAgICAgICdoYWQgYSBmZXcgdG9vIG1hbnksIG9yIG1ha2UgaXQgc28geW91ciBib3NzIGlzblxcJ3QgYWJsZSB0byBsb2dpbiBvbiBBcHJpbCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2Zvb2xzIGRheS4gIEp1c3QgcHJvbWlzZSB0byBnaXZlIHRoZW0gdGlja2V0cyB0byB0aGUgYWR2YW5jZSBzY3JlZW5pbmcgJyArXG4gICAgICAgICAgICAgICAgICAgICdvZiBhbnkgU2NpLUZpIGZpbG0gYW5kIHRoZXkgd2lsbCBkbyB5b3VyIGJpZGRpbmcuICBCcmliZXJ5IC4uLiBpdCB3b3JrcyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ29uIGFsbCB0eXBlcy4gIEdpdmUgaXQgYSB0cnkgLi4uIHlvdVxcJ2xsIHNlZS4nLFxuICAgICAgICAgICAgICAgICAgICAnYXNzaWdubWVudE5vdGUnOiBudWxsXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nIDogJ09yYWNsZV9EQicsXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnIDogJ3NvbWUgY29tbWVudCBoZXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogOTg3Mzk4NzIzNDFcbiAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYXV0aG9yJyA6ICdKYW1lcy5TbWl0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tbWVudCcgOiAnc29tZSBvdGhlciBjb21tZW50IG5vdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6IDk4NzM5OTkyMzQxXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JyA6IDIsXG4gICAgICAgICAgICAgICAgICAgICdpZCcgOiAnaXRlbTMnLFxuICAgICAgICAgICAgICAgICAgICAnaXRlbVR5cGUnOiAnQWNjb3VudCcsXG4gICAgICAgICAgICAgICAgICAgICduYXRpdmVJZGVudGl0eScgOiAnMTAwJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FjY291bnREaXNwbGF5TmFtZScgOiAnaGRpeG9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ29wZXJhdGlvbicgOiAnRGVsZXRlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ25ld0FjY291bnQnIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICdkZWNpc2lvbic6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6IG51bGxcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnRDb3VudCcgOiAwLFxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheVZhbHVlJyA6ICdCbGFyZ2h0aG1wJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICdCbGFyZ2h0aG1wJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtNCcsXG4gICAgICAgICAgICAgICAgICAgICdpdGVtVHlwZSc6ICdSb2xlJyxcbiAgICAgICAgICAgICAgICAgICAgJ29wZXJhdGlvbicgOiAnQWRkJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ25ld0FjY291bnQnIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICdoYWRTdW5yaXNlU3Vuc2V0JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJ2Fzc2lnbm1lbnROb3RlJzogJ3NvbWUgYXNzaWdubWVudCBub3RlJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBST0xFX1BPTElDWV9WSU9MQVRJT05fREFUQToge1xuICAgICAgICAgICAgICAgIHBvbGljeU5hbWU6ICdyb2xlIHB2IHBvbGljeU5hbWUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAncm9sZSBwdiBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcnVsZU5hbWU6ICdyb2xlIHB2IHJ1bGVOYW1lJyxcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkOiAncm9sZSBwdiB3b3JrSXRlbUlkJyxcbiAgICAgICAgICAgICAgICBsZWZ0QnVuZGxlczogWydyb2xlIHB2IGxlZnRCdW5kbGUxJywgJ3JvbGUgcHYgbGVmdEJ1bmRsZTInXSxcbiAgICAgICAgICAgICAgICByaWdodEJ1bmRsZXM6IFsncm9sZSBwdiByaWdodEJ1bmRsZTEnLCAncm9sZSBwdiByaWdodEJ1bmRsZTInXVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgRU5USVRMRU1FTlRfUE9MSUNZX1ZJT0xBVElPTl9EQVRBOiB7XG4gICAgICAgICAgICAgICAgcG9saWN5TmFtZTogJ2VudGl0bGVtZW50IHB2IHBvbGljeU5hbWUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZW50aXRsZW1lbnQgcHYgZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJ1bGVOYW1lOiAnZW50aXRsZW1lbnQgcHYgcnVsZU5hbWUnLFxuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQ6ICdlbnRpdGxlbWVudCBwdiB3b3JrSXRlbUlkJyxcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdlbnRpdGxlbWVudCBhcHAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdlbnRpdGxlbWVudCBuYW1lMScsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2VudGl0bGVtZW50IHZhbHVlMSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdlbnRpdGxlbWVudCBhcHAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdlbnRpdGxlbWVudCBuYW1lMicsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2VudGl0bGVtZW50IHZhbHVlMidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIFBPTElDWV9WSU9MQVRJT05fUk9MRToge1xuICAgICAgICAgICAgICAgIGlkOiAnMTEnLFxuICAgICAgICAgICAgICAgIGFjY2Vzc1R5cGU6ICdSb2xlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdSb2xlJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncm9sZSBwdiBsZWZ0QnVuZGxlMScsXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnbGVmdHknLFxuICAgICAgICAgICAgICAgIG93bmVyOiAnQ2hhbWlsbGlvbmFpcmUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnanVzdCByaWRpbiBkaXJ0eScsXG4gICAgICAgICAgICAgICAgcmlza1Njb3JlV2VpZ2h0OiA4MDBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIFZJT0xBVElPTl9SRVZJRVdfUk9MRToge1xuICAgICAgICAgICAgICAgIGFjY291bnROYW1lOiAnTmV3IGFjY291bnQnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHthbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnM6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudFJlcXVlc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBIGJvcmluZyBkZXNjcmlwdGlvbiBhYm91dCBub3RoaW5nJyxcbiAgICAgICAgICAgICAgICBpZDogJzMzJyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxuICAgICAgICAgICAgICAgIHJvbGVJZDogJzMzMycsXG4gICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdyb2xlIHB2IGxlZnRCdW5kbGUxJyxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ1BlbmRpbmcnXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBQT0xJQ1lfVklPTEFUSU9OX0VOVElUTEVNRU5UOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcyMicsXG4gICAgICAgICAgICAgICAgYWNjZXNzVHlwZTogJ0VudGl0bGVtZW50JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdFbnRpdGxlbWVudCEhJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdlbnRpdGxlbWVudCB2YWx1ZTEnLFxuICAgICAgICAgICAgICAgIG93bmVyOiAnSiBNb24keScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdnbyB0byB3b3JrJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnY2hhbXBhZ25lQm90dGxlJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2VudGl0bGVtZW50IGFwcDEnLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2VudGl0bGVtZW50IG5hbWUxJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2VudGl0bGVtZW50IHZhbHVlMSdcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIFZJT0xBVElPTl9SRVZJRVdfRU5USVRMRU1FTlQ6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TmFtZTogJ0FtYW5kYS5Sb3NzJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiAnZW50aXRsZW1lbnQgYXBwMScsXG4gICAgICAgICAgICAgICAgZW50aXRsZW1lbnROYW1lOiAnZW50aXRsZW1lbnQgbmFtZTEnLFxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50UmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudFZhbHVlOiAnZW50aXRsZW1lbnQgdmFsdWUxJyxcbiAgICAgICAgICAgICAgICBpZDogJzQ0JyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxuICAgICAgICAgICAgICAgIHJvbGVJZDogbnVsbCxcbiAgICAgICAgICAgICAgICByb2xlTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBzdGF0ZTogJ1BlbmRpbmcnXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBFTlRJVExFTUVOVDoge1xuICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgYWNjZXNzVHlwZTogJ0VudGl0bGVtZW50JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdFbnRpdGxlbWVudCEhJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdQb3BwaW4gZGF0IGNyaXMnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnQ049UXVlc3QsT1U9VHJpYmUsT1U9Q2FsbGVkLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdKIE1vbiR5JyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2dvIHRvIHdvcmsnLFxuICAgICAgICAgICAgICAgIGljb246ICdjaGFtcGFnbmVCb3R0bGUnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQmFyJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdsaWJhdGlvbidcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIElERU5USVRZX1NFQVJDSF9ST0xFOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgICAgICBhY2Nlc3NUeXBlOiAnUm9sZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVBY2Nlc3NUeXBlOiAnUm9sZSEhJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnSWQgc2VhcmNoaW4nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ2FuZCB3aXRoIG15IGhvbWllcycsXG4gICAgICAgICAgICAgICAgb3duZXI6ICdDaGFtaWxsaW9uYWlyZScsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdteSBwb3NzZScsXG4gICAgICAgICAgICAgICAgcmlza1Njb3JlV2VpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIHJpc2tTY29yZUNvbG9yOiAnMDAwMDAwJyxcbiAgICAgICAgICAgICAgICByaXNrU2NvcmVUZXh0Q29sb3I6ICdGRkZGRkYnLFxuICAgICAgICAgICAgICAgIHBvcHVsYXRpb25TdGF0aXN0aWNzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEwLFxuICAgICAgICAgICAgICAgICAgICBoaWdoUmlzazogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGVybWl0dGVkOiB0cnVlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBST0xFOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICBhY2Nlc3NUeXBlOiAnUm9sZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVBY2Nlc3NUeXBlOiAnUm9sZScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ1RoZXkgc2VlIG1lIHJvbGUtaW4nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ3dpdGggbXkgaG9taWVzJyxcbiAgICAgICAgICAgICAgICBvd25lcjogJ0NoYW1pbGxpb25haXJlJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2p1c3QgcmlkaW4gZGlydHknLFxuICAgICAgICAgICAgICAgIHJpc2tTY29yZVdlaWdodDogODAwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBQT1BVTEFUSU9OX1NUQVRJU1RJQ1M6IHtcbiAgICAgICAgICAgICAgICB0b3RhbDogMjAsXG4gICAgICAgICAgICAgICAgY291bnQ6IDEwLFxuICAgICAgICAgICAgICAgIGhpZ2hSaXNrOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
