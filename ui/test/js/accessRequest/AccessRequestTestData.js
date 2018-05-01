System.register(['accessRequest/AccessRequestModule'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {

            angular.module(accessRequestModule).

            /**
             * This contains test data used by the access request tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('accessRequestTestData', function () {

                var roleTarget1 = {
                    role: 'keep rollin rollin',
                    application: 'back up back up',
                    nativeIdentity: 'tell me what you gonna do now',
                    accountName: 'people in the house',
                    instance: 'put them hands in the air'
                };

                return {
                    IDENTITY1: {
                        id: '1',
                        name: 'jbob',
                        displayName: 'Jay Bob',
                        managerName: 'Joe Bob',
                        location: 'Austin',
                        department: 'Agriculture'
                    },

                    IDENTITY2: {
                        id: '2',
                        name: 'kbob',
                        displayName: 'Kay Bob',
                        managerName: 'Jim Bob',
                        location: 'Austin',
                        department: 'Agriculture'
                    },

                    IDENTITY3: {
                        id: '3',
                        name: 'tbob',
                        displayName: 'Tee Bob',
                        managerName: 'Jim Bob',
                        location: 'Wisconsin',
                        department: 'Code Monkeys'
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

                    PERMITTED_ROLE: {
                        id: '1.5',
                        accessType: 'Role',
                        displayableAccessType: 'Role',
                        name: 'Today was a good day...',
                        displayableName: '... didn\'t even have to use my AK',
                        owner: 'ICE T',
                        description: 'I gotta go cuz I got me a drop top',
                        riskScoreWeight: 300,
                        permitted: true
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

                    COL_CONFIG1: {
                        dataIndex: 'name',
                        label: 'Username'
                    },

                    COL_CONFIG2: {
                        dataIndex: 'displayableName',
                        label: 'Name'
                    },

                    COL_CONFIG3: {
                        dataIndex: 'id',
                        fieldOnly: true
                    },

                    ROLE_TARGET1: roleTarget1,

                    CURRENT_ACCESS_ROLE: {
                        id: '1',
                        accessType: 'Role',
                        displayableAccessType: 'Role',
                        name: 'nameblah',
                        displayableName: 'displayablenameblah',
                        owner: 'ownerblah',
                        description: 'descriptionblah',
                        riskScoreWeight: 800,
                        riskScoreColor: '#FF0000',
                        riskScoreTextColor: '#FFFFFF',
                        status: 'requested',
                        statusLabel: 'Requested',
                        sunrise: 1391618385380,
                        sunset: 1392223185380,
                        assignmentId: 'assignmentIdBlah',
                        roleLocation: 'assigned',
                        removable: true,
                        roleTargets: [roleTarget1]
                    },

                    CURRENT_ACCESS_ENTITLEMENT: {
                        id: '2',
                        accessType: 'Entitlement',
                        displayableAccessType: 'Entitlement',
                        displayableName: 'entblah',
                        value: 'entblah',
                        owner: 'entownerblah',
                        description: 'entdescriptionblah',
                        icon: 'enticonblah',
                        application: 'entapplicationblah',
                        attribute: 'entattributeblah',
                        status: 'active',
                        statusLabel: 'Active',
                        nativeIdentity: 'nativeblah',
                        accountName: 'accountblah',
                        instance: 'instanceblah',
                        removable: true
                    },

                    ROLE_TO_REMOVE: {
                        id: '5',
                        accessType: 'Role',
                        displayableAccessType: 'Role',
                        name: 'removeme',
                        displayableName: 'displayablenameblah',
                        owner: 'ownerblah',
                        description: 'descriptionblah',
                        riskScoreWeight: 800,
                        riskScoreColor: '#FF0000',
                        riskScoreTextColor: '#FFFFFF',
                        status: 'requested',
                        statusLabel: 'Requested',
                        sunrise: 1391618385380,
                        sunset: 1392223185380,
                        assignmentId: 'removedroleassignmentIdBlah',
                        assignmentNote: 'blahblahblah',
                        roleLocation: 'assigned'
                    },

                    IDENTITY_ACCT_SELECTION1: {
                        identityId: 'ted.tacular.id',
                        identityName: 'ted.tacular',
                        provisioningTargets: [{
                            applicationId: 'appId',
                            applicationName: 'appName',
                            roleName: 'Boss',
                            allowCreate: false,
                            accountInfos: [{
                                instance: 'tedsAccount',
                                nativeIdentity: 'ted',
                                displayName: 'Ted Tacular'
                            }, {
                                instance: 'tedsAlt',
                                nativeIdentity: 'alted',
                                displayName: 'Ted A Tacular'
                            }]
                        }, {
                            applicationId: 'appId2',
                            applicationName: 'appName2',
                            roleName: 'Endentured Servant',
                            allowCreate: true,
                            accountInfos: [{
                                instance: 'lackyInstance',
                                nativeIdentity: 'lacky',
                                displayName: 'Lacker'
                            }, {
                                instance: 'slackyInstance',
                                nativeIdentity: 'slacky',
                                displayName: 'Slacker'
                            }]
                        }]
                    },

                    IDENTITY_ACCT_SELECTION2: {
                        identityId: 'tim.tacular.id',
                        identityName: 'tim.tacular',
                        provisioningTargets: [{
                            applicationId: 'appId',
                            applicationName: 'appName',
                            roleName: 'Boss',
                            allowCreate: false,
                            accountInfos: [{
                                instance: 'timsAccount',
                                nativeIdentity: 'tim',
                                displayName: 'Tim Tacular'
                            }, {
                                instance: 'timsAlt',
                                nativeIdentity: 'timmy',
                                displayName: 'Tim E Tacular'
                            }]
                        }, {
                            applicationId: 'appId2',
                            applicationName: 'appName2',
                            roleName: 'Endentured Servant',
                            allowCreate: true,
                            accountInfos: [{
                                instance: 'lackyInstance',
                                nativeIdentity: 'tbone',
                                displayName: 'T-Bone'
                            }, {
                                instance: 'slackyInstance',
                                nativeIdentity: 'koko',
                                displayName: 'Gammy'
                            }]
                        }]
                    },

                    AMBIGUOUS_ASSIGNED_ROLE1: {
                        assignmentId: 'assignment1',
                        roleId: '1234',
                        name: 'assignedRole1',
                        assignmentNote: 'i assigned this out of boredom',
                        assigner: 'Dum.Bo',
                        created: 1391618385380
                    },

                    AMBIGUOUS_ASSIGNED_ROLE2: {
                        assignmentId: 'assignment2',
                        roleId: '5678',
                        name: 'assignedRole2',
                        assignmentNote: 'i assigned this out of spite',
                        assigner: 'Herp.Derp',
                        created: 1391718385380
                    },

                    POPULATION_STATISTICS: {
                        total: 20,
                        count: 10,
                        highRisk: true
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
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdFRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHNDQUFzQyxVQUFVLFNBQVM7SUFBMUU7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQ0FBbUM7WUFDbkQsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUo3QixRQUFRLE9BQU87Ozs7Ozs7WUFPZixRQUFRLHlCQUF5QixZQUFXOztnQkFFeEMsSUFBSSxjQUFjO29CQUNkLE1BQU07b0JBQ04sYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsVUFBVTs7O2dCQUdkLE9BQU87b0JBQ0gsV0FBVzt3QkFDUCxJQUFJO3dCQUNKLE1BQU07d0JBQ04sYUFBYTt3QkFDYixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsWUFBWTs7O29CQUdoQixXQUFXO3dCQUNQLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixZQUFZOzs7b0JBR2hCLFdBQVc7d0JBQ1AsSUFBSTt3QkFDSixNQUFNO3dCQUNOLGFBQWE7d0JBQ2IsYUFBYTt3QkFDYixVQUFVO3dCQUNWLFlBQVk7OztvQkFHaEIsTUFBTTt3QkFDRixJQUFJO3dCQUNKLFlBQVk7d0JBQ1osdUJBQXVCO3dCQUN2QixNQUFNO3dCQUNOLGlCQUFpQjt3QkFDakIsT0FBTzt3QkFDUCxhQUFhO3dCQUNiLGlCQUFpQjs7O29CQUdyQixnQkFBZ0I7d0JBQ1osSUFBSTt3QkFDSixZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsTUFBTTt3QkFDTixpQkFBaUI7d0JBQ2pCLE9BQU87d0JBQ1AsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLFdBQVc7OztvQkFHZixhQUFhO3dCQUNULElBQUk7d0JBQ0osWUFBWTt3QkFDWix1QkFBdUI7d0JBQ3ZCLGlCQUFpQjt3QkFDakIsT0FBTzt3QkFD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QkFDcEIsa0JBQWtCO3dCQUNsQixJQUFJO3dCQUNKLFdBQVc7d0JBQ1gsUUFBUTt3QkFDUixVQUFVO3dCQUNWLE9BQU87Ozs7OztHQVNoQiIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShhY2Nlc3NSZXF1ZXN0TW9kdWxlKS5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbnRhaW5zIHRlc3QgZGF0YSB1c2VkIGJ5IHRoZSBhY2Nlc3MgcmVxdWVzdCB0ZXN0cy4gIERvbid0IG1vZGlmeSB0aGlzIGRhdGFcclxuICogZGlyZWN0bHkgZnJvbSB3aXRoaW4geW91ciB0ZXN0cy4gIElmIHlvdSBuZWVkIHRvIG1vZGlmeSBkYXRhLCB1c2UgYW5ndWxhci5jb3B5KCkgdG8gY3JlYXRlIHlvdXIgb3duXHJcbiAqIGNvcHkgYmVmb3JlIGNoYW5naW5nIGl0LlxyXG4gKi9cclxuZmFjdG9yeSgnYWNjZXNzUmVxdWVzdFRlc3REYXRhJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHJvbGVUYXJnZXQxID0ge1xyXG4gICAgICAgIHJvbGU6ICdrZWVwIHJvbGxpbiByb2xsaW4nLFxyXG4gICAgICAgIGFwcGxpY2F0aW9uOiAnYmFjayB1cCBiYWNrIHVwJyxcclxuICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3RlbGwgbWUgd2hhdCB5b3UgZ29ubmEgZG8gbm93JyxcclxuICAgICAgICBhY2NvdW50TmFtZTogJ3Blb3BsZSBpbiB0aGUgaG91c2UnLFxyXG4gICAgICAgIGluc3RhbmNlOiAncHV0IHRoZW0gaGFuZHMgaW4gdGhlIGFpcidcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBJREVOVElUWTE6IHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgbmFtZTogJ2pib2InLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0pheSBCb2InLFxyXG4gICAgICAgICAgICBtYW5hZ2VyTmFtZTogJ0pvZSBCb2InLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogJ0F1c3RpbicsXHJcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6ICdBZ3JpY3VsdHVyZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJREVOVElUWTI6IHtcclxuICAgICAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICAgICAgbmFtZTogJ2tib2InLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0theSBCb2InLFxyXG4gICAgICAgICAgICBtYW5hZ2VyTmFtZTogJ0ppbSBCb2InLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogJ0F1c3RpbicsXHJcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6ICdBZ3JpY3VsdHVyZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJREVOVElUWTM6IHtcclxuICAgICAgICAgICAgaWQ6ICczJyxcclxuICAgICAgICAgICAgbmFtZTogJ3Rib2InLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZSBCb2InLFxyXG4gICAgICAgICAgICBtYW5hZ2VyTmFtZTogJ0ppbSBCb2InLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogJ1dpc2NvbnNpbicsXHJcbiAgICAgICAgICAgIGRlcGFydG1lbnQ6ICdDb2RlIE1vbmtleXMnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUk9MRToge1xyXG4gICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICBhY2Nlc3NUeXBlOiAnUm9sZScsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjZXNzVHlwZTogJ1JvbGUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnVGhleSBzZWUgbWUgcm9sZS1pbicsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ3dpdGggbXkgaG9taWVzJyxcclxuICAgICAgICAgICAgb3duZXI6ICdDaGFtaWxsaW9uYWlyZScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnanVzdCByaWRpbiBkaXJ0eScsXHJcbiAgICAgICAgICAgIHJpc2tTY29yZVdlaWdodDogODAwXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUEVSTUlUVEVEX1JPTEU6IHtcclxuICAgICAgICAgICAgaWQ6ICcxLjUnLFxyXG4gICAgICAgICAgICBhY2Nlc3NUeXBlOiAnUm9sZScsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjZXNzVHlwZTogJ1JvbGUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnVG9kYXkgd2FzIGEgZ29vZCBkYXkuLi4nLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICcuLi4gZGlkblxcJ3QgZXZlbiBoYXZlIHRvIHVzZSBteSBBSycsXHJcbiAgICAgICAgICAgIG93bmVyOiAnSUNFIFQnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0kgZ290dGEgZ28gY3V6IEkgZ290IG1lIGEgZHJvcCB0b3AnLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVXZWlnaHQ6IDMwMCxcclxuICAgICAgICAgICAgcGVybWl0dGVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRU5USVRMRU1FTlQ6IHtcclxuICAgICAgICAgICAgaWQ6ICcyJyxcclxuICAgICAgICAgICAgYWNjZXNzVHlwZTogJ0VudGl0bGVtZW50JyxcclxuICAgICAgICAgICAgZGlzcGxheWFibGVBY2Nlc3NUeXBlOiAnRW50aXRsZW1lbnQhIScsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ1BvcHBpbiBkYXQgY3JpcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnQ049UXVlc3QsT1U9VHJpYmUsT1U9Q2FsbGVkLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXHJcbiAgICAgICAgICAgIG93bmVyOiAnSiBNb24keScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZ28gdG8gd29yaycsXHJcbiAgICAgICAgICAgIGljb246ICdjaGFtcGFnbmVCb3R0bGUnLFxyXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0JhcicsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2xpYmF0aW9uJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIElERU5USVRZX1NFQVJDSF9ST0xFOiB7XHJcbiAgICAgICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgICAgIGFjY2Vzc1R5cGU6ICdSb2xlJyxcclxuICAgICAgICAgICAgZGlzcGxheWFibGVBY2Nlc3NUeXBlOiAnUm9sZSEhJyxcclxuICAgICAgICAgICAgbmFtZTogJ0lkIHNlYXJjaGluJyxcclxuICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnYW5kIHdpdGggbXkgaG9taWVzJyxcclxuICAgICAgICAgICAgb3duZXI6ICdDaGFtaWxsaW9uYWlyZScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnbXkgcG9zc2UnLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVXZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHJpc2tTY29yZUNvbG9yOiAnMDAwMDAwJyxcclxuICAgICAgICAgICAgcmlza1Njb3JlVGV4dENvbG9yOiAnRkZGRkZGJyxcclxuICAgICAgICAgICAgcG9wdWxhdGlvblN0YXRpc3RpY3M6IHtcclxuICAgICAgICAgICAgICAgIHRvdGFsOiAyMCxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgIGhpZ2hSaXNrOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBlcm1pdHRlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENPTF9DT05GSUcxOiB7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ25hbWUnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ1VzZXJuYW1lJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENPTF9DT05GSUcyOiB7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2Rpc3BsYXlhYmxlTmFtZScsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnTmFtZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDT0xfQ09ORklHMzoge1xyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ICdpZCcsXHJcbiAgICAgICAgICAgIGZpZWxkT25seTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFJPTEVfVEFSR0VUMTogcm9sZVRhcmdldDEsXHJcblxyXG4gICAgICAgIENVUlJFTlRfQUNDRVNTX1JPTEU6IHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgYWNjZXNzVHlwZTogJ1JvbGUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdSb2xlJyxcclxuICAgICAgICAgICAgbmFtZTogJ25hbWVibGFoJyxcclxuICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnZGlzcGxheWFibGVuYW1lYmxhaCcsXHJcbiAgICAgICAgICAgIG93bmVyOiAnb3duZXJibGFoJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGlvbmJsYWgnLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVXZWlnaHQ6IDgwMCxcclxuICAgICAgICAgICAgcmlza1Njb3JlQ29sb3I6ICcjRkYwMDAwJyxcclxuICAgICAgICAgICAgcmlza1Njb3JlVGV4dENvbG9yOiAnI0ZGRkZGRicsXHJcbiAgICAgICAgICAgIHN0YXR1czogJ3JlcXVlc3RlZCcsXHJcbiAgICAgICAgICAgIHN0YXR1c0xhYmVsOiAnUmVxdWVzdGVkJyxcclxuICAgICAgICAgICAgc3VucmlzZTogMTM5MTYxODM4NTM4MCxcclxuICAgICAgICAgICAgc3Vuc2V0OiAxMzkyMjIzMTg1MzgwLFxyXG4gICAgICAgICAgICBhc3NpZ25tZW50SWQ6ICdhc3NpZ25tZW50SWRCbGFoJyxcclxuICAgICAgICAgICAgcm9sZUxvY2F0aW9uOiAnYXNzaWduZWQnLFxyXG4gICAgICAgICAgICByZW1vdmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHJvbGVUYXJnZXRzOiBbIHJvbGVUYXJnZXQxIF1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDVVJSRU5UX0FDQ0VTU19FTlRJVExFTUVOVDoge1xyXG4gICAgICAgICAgICBpZDogJzInLFxyXG4gICAgICAgICAgICBhY2Nlc3NUeXBlOiAnRW50aXRsZW1lbnQnLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdFbnRpdGxlbWVudCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ2VudGJsYWgnLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ2VudGJsYWgnLFxyXG4gICAgICAgICAgICBvd25lcjogJ2VudG93bmVyYmxhaCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZW50ZGVzY3JpcHRpb25ibGFoJyxcclxuICAgICAgICAgICAgaWNvbjogJ2VudGljb25ibGFoJyxcclxuICAgICAgICAgICAgYXBwbGljYXRpb246ICdlbnRhcHBsaWNhdGlvbmJsYWgnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdlbnRhdHRyaWJ1dGVibGFoJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcclxuICAgICAgICAgICAgc3RhdHVzTGFiZWw6ICdBY3RpdmUnLFxyXG4gICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ25hdGl2ZWJsYWgnLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ2FjY291bnRibGFoJyxcclxuICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZWJsYWgnLFxyXG4gICAgICAgICAgICByZW1vdmFibGU6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBST0xFX1RPX1JFTU9WRToge1xyXG4gICAgICAgICAgICBpZDogJzUnLFxyXG4gICAgICAgICAgICBhY2Nlc3NUeXBlOiAnUm9sZScsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlQWNjZXNzVHlwZTogJ1JvbGUnLFxyXG4gICAgICAgICAgICBuYW1lOiAncmVtb3ZlbWUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdkaXNwbGF5YWJsZW5hbWVibGFoJyxcclxuICAgICAgICAgICAgb3duZXI6ICdvd25lcmJsYWgnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2Rlc2NyaXB0aW9uYmxhaCcsXHJcbiAgICAgICAgICAgIHJpc2tTY29yZVdlaWdodDogODAwLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVDb2xvcjogJyNGRjAwMDAnLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVUZXh0Q29sb3I6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAncmVxdWVzdGVkJyxcclxuICAgICAgICAgICAgc3RhdHVzTGFiZWw6ICdSZXF1ZXN0ZWQnLFxyXG4gICAgICAgICAgICBzdW5yaXNlOiAxMzkxNjE4Mzg1MzgwLFxyXG4gICAgICAgICAgICBzdW5zZXQ6IDEzOTIyMjMxODUzODAsXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnRJZDogJ3JlbW92ZWRyb2xlYXNzaWdubWVudElkQmxhaCcsXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnROb3RlOiAnYmxhaGJsYWhibGFoJyxcclxuICAgICAgICAgICAgcm9sZUxvY2F0aW9uOiAnYXNzaWduZWQnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xOiB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6ICd0ZWQudGFjdWxhci5pZCcsXHJcbiAgICAgICAgICAgIGlkZW50aXR5TmFtZTogJ3RlZC50YWN1bGFyJyxcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0czogW3tcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICdhcHBJZCcsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdhcHBOYW1lJyxcclxuICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnQm9zcycsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NyZWF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50SW5mb3M6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICd0ZWRzQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICd0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVGVkIFRhY3VsYXInXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICd0ZWRzQWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2FsdGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlZCBBIFRhY3VsYXInXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnYXBwSWQyJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ2FwcE5hbWUyJyxcclxuICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnRW5kZW50dXJlZCBTZXJ2YW50JyxcclxuICAgICAgICAgICAgICAgIGFsbG93Q3JlYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudEluZm9zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnbGFja3lJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdsYWNreScsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdMYWNrZXInXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdzbGFja3lJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdzbGFja3knLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU2xhY2tlcidcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04yOiB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6ICd0aW0udGFjdWxhci5pZCcsXHJcbiAgICAgICAgICAgIGlkZW50aXR5TmFtZTogJ3RpbS50YWN1bGFyJyxcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVGFyZ2V0czogW3tcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6ICdhcHBJZCcsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdhcHBOYW1lJyxcclxuICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnQm9zcycsXHJcbiAgICAgICAgICAgICAgICBhbGxvd0NyZWF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50SW5mb3M6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICd0aW1zQWNjb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICd0aW0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVGltIFRhY3VsYXInXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICd0aW1zQWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3RpbW15JyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RpbSBFIFRhY3VsYXInXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnYXBwSWQyJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ2FwcE5hbWUyJyxcclxuICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnRW5kZW50dXJlZCBTZXJ2YW50JyxcclxuICAgICAgICAgICAgICAgIGFsbG93Q3JlYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWNjb3VudEluZm9zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnbGFja3lJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICd0Ym9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdULUJvbmUnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdzbGFja3lJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdrb2tvJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0dhbW15J1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBBTUJJR1VPVVNfQVNTSUdORURfUk9MRTE6IHtcclxuICAgICAgICAgICAgYXNzaWdubWVudElkOiAnYXNzaWdubWVudDEnLFxyXG4gICAgICAgICAgICByb2xlSWQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgbmFtZTogJ2Fzc2lnbmVkUm9sZTEnLFxyXG4gICAgICAgICAgICBhc3NpZ25tZW50Tm90ZTogJ2kgYXNzaWduZWQgdGhpcyBvdXQgb2YgYm9yZWRvbScsXHJcbiAgICAgICAgICAgIGFzc2lnbmVyOiAnRHVtLkJvJyxcclxuICAgICAgICAgICAgY3JlYXRlZDogMTM5MTYxODM4NTM4MFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEFNQklHVU9VU19BU1NJR05FRF9ST0xFMjoge1xyXG4gICAgICAgICAgICBhc3NpZ25tZW50SWQ6ICdhc3NpZ25tZW50MicsXHJcbiAgICAgICAgICAgIHJvbGVJZDogJzU2NzgnLFxyXG4gICAgICAgICAgICBuYW1lOiAnYXNzaWduZWRSb2xlMicsXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnROb3RlOiAnaSBhc3NpZ25lZCB0aGlzIG91dCBvZiBzcGl0ZScsXHJcbiAgICAgICAgICAgIGFzc2lnbmVyOiAnSGVycC5EZXJwJyxcclxuICAgICAgICAgICAgY3JlYXRlZDogMTM5MTcxODM4NTM4MFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFBPUFVMQVRJT05fU1RBVElTVElDUzoge1xyXG4gICAgICAgICAgICB0b3RhbDogMjAsXHJcbiAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgaGlnaFJpc2s6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBST0xFX1BPTElDWV9WSU9MQVRJT05fREFUQToge1xyXG4gICAgICAgICAgICBwb2xpY3lOYW1lOiAncm9sZSBwdiBwb2xpY3lOYW1lJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdyb2xlIHB2IGRlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgcnVsZU5hbWU6ICdyb2xlIHB2IHJ1bGVOYW1lJyxcclxuICAgICAgICAgICAgd29ya0l0ZW1JZDogJ3JvbGUgcHYgd29ya0l0ZW1JZCcsXHJcbiAgICAgICAgICAgIGxlZnRCdW5kbGVzOiBbJ3JvbGUgcHYgbGVmdEJ1bmRsZTEnLCAncm9sZSBwdiBsZWZ0QnVuZGxlMiddLFxyXG4gICAgICAgICAgICByaWdodEJ1bmRsZXM6IFsncm9sZSBwdiByaWdodEJ1bmRsZTEnLCAncm9sZSBwdiByaWdodEJ1bmRsZTInXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEVOVElUTEVNRU5UX1BPTElDWV9WSU9MQVRJT05fREFUQToge1xyXG4gICAgICAgICAgICBwb2xpY3lOYW1lOiAnZW50aXRsZW1lbnQgcHYgcG9saWN5TmFtZScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZW50aXRsZW1lbnQgcHYgZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICBydWxlTmFtZTogJ2VudGl0bGVtZW50IHB2IHJ1bGVOYW1lJyxcclxuICAgICAgICAgICAgd29ya0l0ZW1JZDogJ2VudGl0bGVtZW50IHB2IHdvcmtJdGVtSWQnLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudHM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2VudGl0bGVtZW50IGFwcDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdlbnRpdGxlbWVudCBuYW1lMScsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdlbnRpdGxlbWVudCB2YWx1ZTEnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnZW50aXRsZW1lbnQgYXBwMicsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2VudGl0bGVtZW50IG5hbWUyJyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2VudGl0bGVtZW50IHZhbHVlMidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFBPTElDWV9WSU9MQVRJT05fUk9MRToge1xyXG4gICAgICAgICAgICBpZDogJzExJyxcclxuICAgICAgICAgICAgYWNjZXNzVHlwZTogJ1JvbGUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZUFjY2Vzc1R5cGU6ICdSb2xlJyxcclxuICAgICAgICAgICAgbmFtZTogJ3JvbGUgcHYgbGVmdEJ1bmRsZTEnLFxyXG4gICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdsZWZ0eScsXHJcbiAgICAgICAgICAgIG93bmVyOiAnQ2hhbWlsbGlvbmFpcmUnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2p1c3QgcmlkaW4gZGlydHknLFxyXG4gICAgICAgICAgICByaXNrU2NvcmVXZWlnaHQ6IDgwMFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZJT0xBVElPTl9SRVZJRVdfUk9MRToge1xyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ05ldyBhY2NvdW50JyxcclxuICAgICAgICAgICAgYXR0cmlidXRlczoge2FsbG93UmVxdWVzdHNXaXRoVmlvbGF0aW9uczogZmFsc2V9LFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50UmVxdWVzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQSBib3JpbmcgZGVzY3JpcHRpb24gYWJvdXQgbm90aGluZycsXHJcbiAgICAgICAgICAgIGlkOiAnMzMnLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246ICdBZGQnLFxyXG4gICAgICAgICAgICByb2xlSWQ6ICczMzMnLFxyXG4gICAgICAgICAgICByb2xlTmFtZTogJ3JvbGUgcHYgbGVmdEJ1bmRsZTEnLFxyXG4gICAgICAgICAgICBzdGF0ZTogJ1BlbmRpbmcnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUE9MSUNZX1ZJT0xBVElPTl9FTlRJVExFTUVOVDoge1xyXG4gICAgICAgICAgICBpZDogJzIyJyxcclxuICAgICAgICAgICAgYWNjZXNzVHlwZTogJ0VudGl0bGVtZW50JyxcclxuICAgICAgICAgICAgZGlzcGxheWFibGVBY2Nlc3NUeXBlOiAnRW50aXRsZW1lbnQhIScsXHJcbiAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ2VudGl0bGVtZW50IHZhbHVlMScsXHJcbiAgICAgICAgICAgIG93bmVyOiAnSiBNb24keScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZ28gdG8gd29yaycsXHJcbiAgICAgICAgICAgIGljb246ICdjaGFtcGFnbmVCb3R0bGUnLFxyXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2VudGl0bGVtZW50IGFwcDEnLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdlbnRpdGxlbWVudCBuYW1lMScsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnZW50aXRsZW1lbnQgdmFsdWUxJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZJT0xBVElPTl9SRVZJRVdfRU5USVRMRU1FTlQ6IHtcclxuICAgICAgICAgICAgYWNjb3VudE5hbWU6ICdBbWFuZGEuUm9zcycsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudEFwcGxpY2F0aW9uOiAnZW50aXRsZW1lbnQgYXBwMScsXHJcbiAgICAgICAgICAgIGVudGl0bGVtZW50TmFtZTogJ2VudGl0bGVtZW50IG5hbWUxJyxcclxuICAgICAgICAgICAgZW50aXRsZW1lbnRSZXF1ZXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBlbnRpdGxlbWVudFZhbHVlOiAnZW50aXRsZW1lbnQgdmFsdWUxJyxcclxuICAgICAgICAgICAgaWQ6ICc0NCcsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ0FkZCcsXHJcbiAgICAgICAgICAgIHJvbGVJZDogbnVsbCxcclxuICAgICAgICAgICAgcm9sZU5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgIHN0YXRlOiAnUGVuZGluZydcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
