System.register(['angular', 'approval/ApprovalModule'], function (_export) {
    'use strict';

    var angular, approvalModule;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }],
        execute: function () {

            angular.module(approvalModule).factory('approvalTestDataService', function () {

                return {
                    /**
                     * Create a single approval to test with.
                     */
                    createApproval: function () {
                        var FAKE_APPROVAL = {
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
                        };

                        return angular.copy(FAKE_APPROVAL);
                    },
                    GENERIC_LIST_RESULT: {
                        attributes: { foobar: 'bingo' },
                        complete: true,
                        count: 2,
                        errors: ['error 1', 'error 2'],
                        failure: false,
                        metaData: {
                            totalEntitlementCount: 3
                        },
                        objects: [{
                            description: '<strong><em>This committee is in charge of stuff for the company</em></strong>',
                            applicationName: 'ADDirectDemodata',
                            value: 'CN=BenefitCommittee_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            roleName: 'Direct',
                            property: 'memberOf',
                            displayValue: 'BenefitCommittee_AD'
                        }, {
                            description: '<strong><em>Group assigned to workers in the Benefits department of HR</em></strong>',
                            applicationName: 'ADDirectDemodata',
                            value: 'CN=Benefits_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                            property: 'memberOf',
                            roleName: 'ADDirect-Benefits Clerk',
                            displayValue: 'Benefits_AD'
                        }],
                        requestID: '1234',
                        retry: false,
                        retryWait: 0,
                        status: 'success',
                        success: true,
                        warnings: ['warning 1', 'warning 2']
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLFdBQVcsNEJBQTRCLFVBQVUsU0FBUztJQUEzRTs7SUFHSSxJQUFJLFNBQVM7SUFDYixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSx5QkFBeUI7WUFDbEMsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixRQUFRLE9BQU8sZ0JBRWYsUUFBUSwyQkFBMkIsWUFBVzs7Z0JBRTFDLE9BQU87Ozs7b0JBSUgsZ0JBQWdCLFlBQVc7d0JBQ3ZCLElBQUksZ0JBQWdCOzRCQUNoQixNQUFPOzRCQUNQLGdCQUFnQjs0QkFDaEIsZ0JBQWdCOzRCQUNoQixxQkFBcUI7NEJBQ3JCLGVBQWdCOzRCQUNoQixXQUFZOzRCQUNaLFVBQVc7Z0NBQ1AsTUFBTTtnQ0FDTixRQUFRO2dDQUNSLGVBQWU7OzRCQUVuQixhQUFjO2dDQUNWLE1BQU07Z0NBQ04sUUFBUTtnQ0FDUixlQUFlOzs0QkFFbkIsU0FBVTtnQ0FDTixNQUFNO2dDQUNOLFFBQVE7Z0NBQ1IsZUFBZTs7NEJBRW5CLFlBQWE7Z0NBQ1QsTUFBTTtnQ0FDTixRQUFRO2dDQUNSLGVBQWU7OzRCQUVuQixZQUFZOzRCQUNaLFlBQWEsQ0FBQztnQ0FDVixVQUFXO2dDQUNYLFdBQVk7Z0NBQ1osUUFBUTs7NEJBRVosZ0JBQWdCOzRCQUNoQixpQkFBa0IsQ0FBQztnQ0FDZixZQUFhLENBQUM7b0NBQ1YsVUFBVztvQ0FDWCxXQUFZO29DQUNaLFFBQVE7O2dDQUVaLGdCQUFpQjtnQ0FDakIsZ0JBQWlCO2dDQUNqQixTQUFVO2dDQUNWLE1BQU87Z0NBQ1AsWUFBWTtnQ0FDWixhQUFjO2dDQUNkLGNBQWU7Z0NBQ2YsWUFBWTtnQ0FDWixZQUFZO2dDQUNaLFdBQVc7Z0NBQ1gsVUFBVTtnQ0FDVixlQUFlO2dDQUNmLFNBQVU7b0NBQ04sTUFBTTtvQ0FDTixRQUFRO29DQUNSLGVBQWU7O2dDQUVuQixrQkFBa0I7K0JBQ25CO2dDQUNDLGVBQWdCO2dDQUNoQixZQUFhLENBQUM7b0NBQ1YsVUFBVztvQ0FDWCxXQUFZO29DQUNaLFFBQVE7O2dDQUVaLGdCQUFpQjtnQ0FDakIsZUFBZ0I7Z0NBQ2hCLGdCQUFpQjtnQ0FDakIsTUFBTztnQ0FDUCxZQUFZO2dDQUNaLFFBQVM7Z0NBQ1Qsa0JBQW1CO2dDQUNuQixzQkFBdUI7Z0NBQ3ZCLGFBQWM7Z0NBQ2QsWUFBWTtnQ0FDWixjQUFlO2dDQUNmLFNBQVU7Z0NBQ1YsWUFBWTtnQ0FDWixXQUFXO2dDQUNYLFNBQVM7Z0NBQ1QsZUFBZSxvRkFDWCw4RUFDQSxnRkFDQSwrRUFDQSw0RUFDQSw2RUFDQTtnQ0FDSixrQkFBa0I7K0JBQ25CO2dDQUNDLGVBQWdCO2dDQUNoQixZQUFhLENBQUM7b0NBQ1YsVUFBVztvQ0FDWCxXQUFZO29DQUNaLFFBQVE7bUNBQ1Y7b0NBQ0UsVUFBVztvQ0FDWCxXQUFZO29DQUNaLFFBQVE7O2dDQUVaLGdCQUFpQjtnQ0FDakIsTUFBTztnQ0FDUCxZQUFZO2dDQUNaLGtCQUFtQjtnQ0FDbkIsc0JBQXVCO2dDQUN2QixhQUFjO2dDQUNkLFlBQVk7Z0NBQ1osY0FBZTtnQ0FDZixZQUFZO2dDQUNaLGtCQUFrQjsrQkFDbkI7Z0NBQ0MsWUFBYTtnQ0FDYixnQkFBaUI7Z0NBQ2pCLGdCQUFpQjtnQ0FDakIsU0FBVTtnQ0FDVixNQUFPO2dDQUNQLFlBQVk7Z0NBQ1osYUFBYztnQ0FDZCxZQUFZO2dDQUNaLGNBQWU7Z0NBQ2Ysb0JBQW9CO2dDQUNwQixlQUFlO2dDQUNmLGtCQUFrQjs7Ozt3QkFJMUIsT0FBTyxRQUFRLEtBQUs7O29CQUV4QixxQkFBcUI7d0JBQ2pCLFlBQVksRUFBRSxRQUFRO3dCQUN0QixVQUFVO3dCQUNWLE9BQU87d0JBQ1AsUUFBUSxDQUFDLFdBQVc7d0JBQ3BCLFNBQVM7d0JBQ1QsVUFBVTs0QkFDTix1QkFBdUI7O3dCQUUzQixTQUFTLENBQ0w7NEJBQ0ksYUFBYTs0QkFDYixpQkFBaUI7NEJBQ2pCLE9BQU87NEJBQ1AsVUFBVTs0QkFDVixVQUFVOzRCQUNWLGNBQWM7MkJBRWxCOzRCQUNJLGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixPQUFPOzRCQUNQLFVBQVU7NEJBQ1YsVUFBVTs0QkFDVixjQUFjOzt3QkFHdEIsV0FBVzt3QkFDWCxPQUFPO3dCQUNQLFdBQVc7d0JBQ1gsUUFBUTt3QkFDUixTQUFTO3dCQUNULFVBQVUsQ0FBQyxhQUFhOzs7Ozs7R0FFakMiLCJmaWxlIjoiYXBwcm92YWwvQXBwcm92YWxUZXN0RGF0YVNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0IGFwcHJvdmFsTW9kdWxlIGZyb20gJ2FwcHJvdmFsL0FwcHJvdmFsTW9kdWxlJztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKGFwcHJvdmFsTW9kdWxlKS5cclxuXHJcbmZhY3RvcnkoJ2FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBzaW5nbGUgYXBwcm92YWwgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUFwcHJvdmFsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIEZBS0VfQVBQUk9WQUwgPSB7XHJcbiAgICAgICAgICAgICAgICAnaWQnIDogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgJ3dvcmtJdGVtTmFtZSc6ICc0OScsXHJcbiAgICAgICAgICAgICAgICAnd29ya0l0ZW1UeXBlJzogJ0FwcHJvdmFsJyxcclxuICAgICAgICAgICAgICAgICdhY2Nlc3NSZXF1ZXN0TmFtZSc6ICcxMjknLFxyXG4gICAgICAgICAgICAgICAgJ3JlcXVlc3RUeXBlJyA6ICdBY2Nlc3NSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgICdjcmVhdGVkJyA6IDEzOTE2MTgzODUzODAsXHJcbiAgICAgICAgICAgICAgICAndGFyZ2V0JyA6IHtcclxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnODA5ODcnLFxyXG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogJ0hhcnJ5LkRpeG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGlzcGxheU5hbWUnOiAnSGFycnkgRGl4b24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ3JlcXVlc3RlcicgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ2poamhkZjg3OTgnLFxyXG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogJ01hcnkuSm9obnNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ01hcnkgSm9obnNvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAnb3duZXInIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6ICc4OTc5ODdmJyxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdKYW1lcy5TbWl0aCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ0phbWVzIFNtaXRoJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdhc3NpZ25lZScgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJzM0OTU1ODkwZm5rc2lvJyxcclxuICAgICAgICAgICAgICAgICAgICAnbmFtZSc6ICdBbWFuZGEuUm9zcycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ0FtYW5kYSBSb3NzJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdwcmlvcml0eSc6ICdIaWdoJyxcclxuICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICdhdXRob3InIDogJ0phbWVzLlNtaXRoJyxcclxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudCcgOiAnc29tZSBjb21tZW50IGhlcmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkYXRlJzogMTM5MTYxODM4NTM4MFxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JzogMSxcclxuICAgICAgICAgICAgICAgICdhcHByb3ZhbEl0ZW1zJyA6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnRzJyA6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhdXRob3InIDogJ0phbWVzLlNtaXRoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnIDogJ3NvbWUgY29tbWVudCBoZXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiAxMzkxNjE4Mzg1MzgwXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnRDb3VudCcgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5VmFsdWUnIDogJ0JlbmVmaXRzIERpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAnQmVuZWZpdHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdpZCcgOiAnaXRlbTEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdpdGVtVHlwZSc6ICdSb2xlJyxcclxuICAgICAgICAgICAgICAgICAgICAnb3BlcmF0aW9uJyA6ICdBZGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICduZXdBY2NvdW50JyA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAnZGVjaXNpb24nOiAnUmVqZWN0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdW5yaXNlJzogMTM5MTYxODM4NTM4MCxcclxuICAgICAgICAgICAgICAgICAgICAnc3Vuc2V0JzogMTM5MjIyMzE4NTM4MCxcclxuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICdvd25lcicgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6ICc4OTc5ODdmJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiAnQm9iLkpvbmVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJzogJ0JvYiBKb25lcydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6ICdzb21lIGFzc2lnbm1lbnQgbm90ZSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nIDogJ0FjdGl2ZV9EaXJlY3RvcnknLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXV0aG9yJyA6ICdKYW1lcy5TbWl0aCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIGNvbW1lbnQgaGVyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogOTg3Mzk4NzIzNDFcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JyA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlOYW1lJyA6ICdHcm91cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZScgOiAnRG9tYWluIEFkbWluaXN0cmF0b3JzIERpc3BsYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICdpZCcgOiAnaXRlbTInLFxyXG4gICAgICAgICAgICAgICAgICAgICdpdGVtVHlwZSc6ICdFbnRpdGxlbWVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnIDogJ2dyb3VwbWJyJyxcclxuICAgICAgICAgICAgICAgICAgICAnbmF0aXZlSWRlbnRpdHknIDogJzEwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FjY291bnREaXNwbGF5TmFtZScgOiAnaGRpeG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAnb3BlcmF0aW9uJyA6ICdBZGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdlZGl0YWJsZSc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ25ld0FjY291bnQnIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyA6ICdEb21haW4gQWRtaW5pc3RyYXRvcnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWNpc2lvbic6ICdBcHByb3ZlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N1bnJpc2UnOiAxMzkxNjE4Mzg1MzgwLFxyXG4gICAgICAgICAgICAgICAgICAgICdvd25lcic6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJzxlbT5Eb21haW4gQWRtaW5pc3RyYXRvcnM8L2VtPiBpcyBhIGdyb3VwIG9mIHBlb3BsZSB0aGF0IHRoaW5rIHRoZXkgYXJlIHJlYWxseSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Nvb2wsIGJ1dCB0aGV5XFwncmUgYWN0dWFsbHkgc3VwZXIgbmVyZHMuICBJdFxcJ3MgYWxyaWdodCAuLi4gdGhleSBkbyBoYXZlICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYSBsb3Qgb2YgcG93ZXIgYW5kIGNhbiBkbyBjb29sIHN0dWZmIGxpa2UgdW5sb2NrIHlvdXIgYWNjb3VudCB3aGVuIHlvdVxcJ3ZlICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaGFkIGEgZmV3IHRvbyBtYW55LCBvciBtYWtlIGl0IHNvIHlvdXIgYm9zcyBpc25cXCd0IGFibGUgdG8gbG9naW4gb24gQXByaWwgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdmb29scyBkYXkuICBKdXN0IHByb21pc2UgdG8gZ2l2ZSB0aGVtIHRpY2tldHMgdG8gdGhlIGFkdmFuY2Ugc2NyZWVuaW5nICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnb2YgYW55IFNjaS1GaSBmaWxtIGFuZCB0aGV5IHdpbGwgZG8geW91ciBiaWRkaW5nLiAgQnJpYmVyeSAuLi4gaXQgd29ya3MgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdvbiBhbGwgdHlwZXMuICBHaXZlIGl0IGEgdHJ5IC4uLiB5b3VcXCdsbCBzZWUuJyxcclxuICAgICAgICAgICAgICAgICAgICAnYXNzaWdubWVudE5vdGUnOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyA6ICdPcmFjbGVfREInLFxyXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50cycgOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXV0aG9yJyA6ICdKYW1lcy5TbWl0aCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIGNvbW1lbnQgaGVyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogOTg3Mzk4NzIzNDFcclxuICAgICAgICAgICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tbWVudCcgOiAnc29tZSBvdGhlciBjb21tZW50IG5vdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRlJzogOTg3Mzk5OTIzNDFcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudENvdW50JyA6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtMycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1UeXBlJzogJ0FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICduYXRpdmVJZGVudGl0eScgOiAnMTAwJyxcclxuICAgICAgICAgICAgICAgICAgICAnYWNjb3VudERpc3BsYXlOYW1lJyA6ICdoZGl4b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdvcGVyYXRpb24nIDogJ0RlbGV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAnbmV3QWNjb3VudCcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAnZGVjaXNpb24nOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICdhc3NpZ25tZW50Tm90ZSc6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAnY29tbWVudHMnIDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnRDb3VudCcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5VmFsdWUnIDogJ0JsYXJnaHRobXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZScgOiAnQmxhcmdodGhtcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJyA6ICdpdGVtNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2l0ZW1UeXBlJzogJ1JvbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdvcGVyYXRpb24nIDogJ0FkZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2VkaXRhYmxlJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAnbmV3QWNjb3VudCcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAnaGFkU3VucmlzZVN1bnNldCc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAnYXNzaWdubWVudE5vdGUnOiAnc29tZSBhc3NpZ25tZW50IG5vdGUnXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShGQUtFX0FQUFJPVkFMKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIEdFTkVSSUNfTElTVF9SRVNVTFQ6IHtcclxuICAgICAgICAgICAgYXR0cmlidXRlczogeyBmb29iYXI6ICdiaW5nbycgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvdW50OiAyLFxyXG4gICAgICAgICAgICBlcnJvcnM6IFsnZXJyb3IgMScsICdlcnJvciAyJ10sXHJcbiAgICAgICAgICAgIGZhaWx1cmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBtZXRhRGF0YToge1xyXG4gICAgICAgICAgICAgICAgdG90YWxFbnRpdGxlbWVudENvdW50OiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9iamVjdHM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJzxzdHJvbmc+PGVtPlRoaXMgY29tbWl0dGVlIGlzIGluIGNoYXJnZSBvZiBzdHVmZiBmb3IgdGhlIGNvbXBhbnk8L2VtPjwvc3Ryb25nPicsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQUREaXJlY3REZW1vZGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDTj1CZW5lZml0Q29tbWl0dGVlX0FELE9VPWRlbW9Hcm91cHMsT1U9RGVtb0RhdGEsREM9dGVzdCxEQz1zYWlscG9pbnQsREM9Y29tJyxcclxuICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ0RpcmVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6ICdtZW1iZXJPZicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnQmVuZWZpdENvbW1pdHRlZV9BRCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICc8c3Ryb25nPjxlbT5Hcm91cCBhc3NpZ25lZCB0byB3b3JrZXJzIGluIHRoZSBCZW5lZml0cyBkZXBhcnRtZW50IG9mIEhSPC9lbT48L3N0cm9uZz4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FERGlyZWN0RGVtb2RhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ049QmVuZWZpdHNfQUQsT1U9ZGVtb0dyb3VwcyxPVT1EZW1vRGF0YSxEQz10ZXN0LERDPXNhaWxwb2ludCxEQz1jb20nLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbWVtYmVyT2YnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnQUREaXJlY3QtQmVuZWZpdHMgQ2xlcmsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ0JlbmVmaXRzX0FEJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXF1ZXN0SUQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgcmV0cnk6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXRyeVdhaXQ6IDAsXHJcbiAgICAgICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICB3YXJuaW5nczogWyd3YXJuaW5nIDEnLCAnd2FybmluZyAyJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
