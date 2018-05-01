System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestAdditionalQuestions model object.
             */
            describe('AccesRequestAdditionalQuestions', function () {
                var AccessRequestAdditionalQuestions, AccessRequestItem, IdentityAccountSelection, questionData;

                function checkPermittedRoles(permittedRoles) {
                    expect(permittedRoles.length).toEqual(2);
                    expect(permittedRoles[0] instanceof AccessRequestItem).toBeTruthy();
                    expect(permittedRoles[0].id).toEqual(1);
                    expect(permittedRoles[0].displayableName).toEqual('someName');
                    expect(permittedRoles[1] instanceof AccessRequestItem).toBeTruthy();
                    expect(permittedRoles[1].id).toEqual(2);
                    expect(permittedRoles[1].displayableName).toEqual('someOtherName');
                }

                function checkAccountSelections(accountSelections) {
                    expect(accountSelections.length).toEqual(2);
                    expect(accountSelections[0] instanceof IdentityAccountSelection).toBeTruthy();
                    expect(accountSelections[0].identityId).toEqual('ted.red');
                    expect(accountSelections[0].identityName).toEqual('Ted Red');
                    expect(accountSelections[1] instanceof IdentityAccountSelection).toBeTruthy();
                    expect(accountSelections[1].identityId).toEqual('jim.him');
                    expect(accountSelections[1].identityName).toEqual('Jim Him');
                }

                function checkAmbiguousAssignedRoles(assignedRoles) {
                    expect(assignedRoles.length).toEqual(2);
                    expect(assignedRoles[0].assignmentId).toEqual('assignment1');
                    expect(assignedRoles[0].roleId).toEqual('1234');
                    expect(assignedRoles[1].assignmentId).toEqual('assignment2');
                    expect(assignedRoles[1].roleId).toEqual('5678');
                }

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the CurrentAccessItem class and create some data to test with.
                 */
                beforeEach(inject(function (_AccessRequestAdditionalQuestions_, _AccessRequestItem_, _IdentityAccountSelection_, accessRequestTestData) {
                    AccessRequestAdditionalQuestions = _AccessRequestAdditionalQuestions_;
                    AccessRequestItem = _AccessRequestItem_;
                    IdentityAccountSelection = _IdentityAccountSelection_;

                    questionData = {
                        permittedRoles: [{
                            id: 1,
                            displayableName: 'someName'
                        }, {
                            id: 2,
                            displayableName: 'someOtherName'
                        }],
                        accountSelections: [{
                            identityId: 'ted.red',
                            identityName: 'Ted Red'
                        }, {
                            identityId: 'jim.him',
                            identityName: 'Jim Him'
                        }],
                        ambiguousAssignedRoles: [accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE1, accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE2]
                    };
                }));

                it('should throw if constructor called without an object', function () {
                    expect(function () {
                        new AccessRequestAdditionalQuestions();
                    }).toThrow();
                });

                it('should throw if the data passed to the constructor is a primitive', function () {
                    expect(function () {
                        new AccessRequestAdditionalQuestions('foo');
                    }).toThrow();
                });

                it('should have no permitted roles if none passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({});
                    expect(questions.permittedRoles).not.toBeDefined();
                });

                it('should have no permitted roles if undefined passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ permittedRoles: undefined });
                    expect(questions.permittedRoles).not.toBeDefined();
                });

                it('should have an empty array for permmitted roles if an empty array is passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ permittedRoles: [] });
                    expect(questions.permittedRoles).toEqual([]);
                });

                it('should have an an access item for every permitted role', function () {
                    var questions = new AccessRequestAdditionalQuestions({ permittedRoles: questionData.permittedRoles });
                    checkPermittedRoles(questions.permittedRoles);
                });

                it('should have no account selections if none passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({});
                    expect(questions.accountSelections).not.toBeDefined();
                });

                it('should have no account selections if undefined passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ accountSelections: undefined });
                    expect(questions.accountSelections).not.toBeDefined();
                });

                it('should have an empty array for account selections if an empty array is passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ accountSelections: [] });
                    expect(questions.accountSelections).toEqual([]);
                });

                it('should have an an account selection for every account selection item', function () {
                    var questions = new AccessRequestAdditionalQuestions({ accountSelections: questionData.accountSelections });
                    checkAccountSelections(questions.accountSelections);
                });

                it('should have no ambiguous assigned roles if none passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({});
                    expect(questions.ambiguousAssignedRoles).not.toBeDefined();
                });

                it('should have no ambiguous assigned roles if undefined passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ ambiguousAssignedRoles: undefined });
                    expect(questions.ambiguousAssignedRoles).not.toBeDefined();
                });

                it('should have an empty array for ambiguous assigned roles if an empty array is passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ ambiguousAssignedRoles: [] });
                    expect(questions.ambiguousAssignedRoles).toEqual([]);
                });

                it('should have an an assigned role for every ambiguous assigned role', function () {
                    var questions = new AccessRequestAdditionalQuestions({ ambiguousAssignedRoles: questionData.ambiguousAssignedRoles });
                    checkAmbiguousAssignedRoles(questions.ambiguousAssignedRoles);
                });

                it('should have an empty invalidRequestee property if an empty array is passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({ invalidRequestees: [] });
                    expect(questions.invalidRequestees).toEqual([]);
                });

                it('should have an undefined invalidRequestee if not passed', function () {
                    var questions = new AccessRequestAdditionalQuestions({});
                    expect(questions.invalidRequestees).not.toBeDefined();
                });

                it('should have an undefined invalidRequestee property if passed value is not an array', function () {
                    expect(function () {
                        new AccessRequestAdditionalQuestions({ invalidRequestees: 7 });
                    }).toThrow();
                });

                it('should have expected objects for every object passed', function () {
                    var questions = new AccessRequestAdditionalQuestions(questionData);
                    checkPermittedRoles(questions.permittedRoles);
                    checkAccountSelections(questions.accountSelections);
                    checkAmbiguousAssignedRoles(questions.ambiguousAssignedRoles);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnNUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7SUFDN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxtQ0FBbUMsWUFBVztnQkFDbkQsSUFBSSxrQ0FDQSxtQkFDQSwwQkFDQTs7Z0JBRUosU0FBUyxvQkFBb0IsZ0JBQWdCO29CQUN6QyxPQUFPLGVBQWUsUUFBUSxRQUFRO29CQUN0QyxPQUFPLGVBQWUsY0FBYyxtQkFBbUI7b0JBQ3ZELE9BQU8sZUFBZSxHQUFHLElBQUksUUFBUTtvQkFDckMsT0FBTyxlQUFlLEdBQUcsaUJBQWlCLFFBQVE7b0JBQ2xELE9BQU8sZUFBZSxjQUFjLG1CQUFtQjtvQkFDdkQsT0FBTyxlQUFlLEdBQUcsSUFBSSxRQUFRO29CQUNyQyxPQUFPLGVBQWUsR0FBRyxpQkFBaUIsUUFBUTs7O2dCQUd0RCxTQUFTLHVCQUF1QixtQkFBbUI7b0JBQy9DLE9BQU8sa0JBQWtCLFFBQVEsUUFBUTtvQkFDekMsT0FBTyxrQkFBa0IsY0FBYywwQkFBMEI7b0JBQ2pFLE9BQU8sa0JBQWtCLEdBQUcsWUFBWSxRQUFRO29CQUNoRCxPQUFPLGtCQUFrQixHQUFHLGNBQWMsUUFBUTtvQkFDbEQsT0FBTyxrQkFBa0IsY0FBYywwQkFBMEI7b0JBQ2pFLE9BQU8sa0JBQWtCLEdBQUcsWUFBWSxRQUFRO29CQUNoRCxPQUFPLGtCQUFrQixHQUFHLGNBQWMsUUFBUTs7O2dCQUd0RCxTQUFTLDRCQUE0QixlQUFlO29CQUNoRCxPQUFPLGNBQWMsUUFBUSxRQUFRO29CQUNy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SSxZQUFZLElBQUksaUNBQWlDO29CQUNyRCxPQUFPLFVBQVUsbUJBQW1CLElBQUk7OztnQkFHNUMsR0FBRyxzRkFBc0YsWUFBVztvQkFDaEcsT0FBTyxZQUFXO3dCQUNkLElBQUksaUNBQWlDLEVBQUMsbUJBQW1CO3VCQUMxRDs7O2dCQUdQLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLElBQUksWUFBWSxJQUFJLGlDQUFpQztvQkFDckQsb0JBQW9CLFVBQVU7b0JBQzlCLHVCQUF1QixVQUFVO29CQUNqQyw0QkFBNEIsVUFBVTs7Ozs7R0FPM0MiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9tb2RlbC9BY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9uc1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuaW1wb3J0ICcuLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnQWNjZXNSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyxcbiAgICAgICAgQWNjZXNzUmVxdWVzdEl0ZW0sXG4gICAgICAgIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbixcbiAgICAgICAgcXVlc3Rpb25EYXRhO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tQZXJtaXR0ZWRSb2xlcyhwZXJtaXR0ZWRSb2xlcykge1xuICAgICAgICBleHBlY3QocGVybWl0dGVkUm9sZXMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocGVybWl0dGVkUm9sZXNbMF0gaW5zdGFuY2VvZiBBY2Nlc3NSZXF1ZXN0SXRlbSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QocGVybWl0dGVkUm9sZXNbMF0uaWQpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChwZXJtaXR0ZWRSb2xlc1swXS5kaXNwbGF5YWJsZU5hbWUpLnRvRXF1YWwoJ3NvbWVOYW1lJyk7XG4gICAgICAgIGV4cGVjdChwZXJtaXR0ZWRSb2xlc1sxXSBpbnN0YW5jZW9mIEFjY2Vzc1JlcXVlc3RJdGVtKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChwZXJtaXR0ZWRSb2xlc1sxXS5pZCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHBlcm1pdHRlZFJvbGVzWzFdLmRpc3BsYXlhYmxlTmFtZSkudG9FcXVhbCgnc29tZU90aGVyTmFtZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQWNjb3VudFNlbGVjdGlvbnMoYWNjb3VudFNlbGVjdGlvbnMpIHtcbiAgICAgICAgZXhwZWN0KGFjY291bnRTZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KGFjY291bnRTZWxlY3Rpb25zWzBdIGluc3RhbmNlb2YgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChhY2NvdW50U2VsZWN0aW9uc1swXS5pZGVudGl0eUlkKS50b0VxdWFsKCd0ZWQucmVkJyk7XG4gICAgICAgIGV4cGVjdChhY2NvdW50U2VsZWN0aW9uc1swXS5pZGVudGl0eU5hbWUpLnRvRXF1YWwoJ1RlZCBSZWQnKTtcbiAgICAgICAgZXhwZWN0KGFjY291bnRTZWxlY3Rpb25zWzFdIGluc3RhbmNlb2YgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChhY2NvdW50U2VsZWN0aW9uc1sxXS5pZGVudGl0eUlkKS50b0VxdWFsKCdqaW0uaGltJyk7XG4gICAgICAgIGV4cGVjdChhY2NvdW50U2VsZWN0aW9uc1sxXS5pZGVudGl0eU5hbWUpLnRvRXF1YWwoJ0ppbSBIaW0nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FtYmlndW91c0Fzc2lnbmVkUm9sZXMoYXNzaWduZWRSb2xlcykge1xuICAgICAgICBleHBlY3QoYXNzaWduZWRSb2xlcy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChhc3NpZ25lZFJvbGVzWzBdLmFzc2lnbm1lbnRJZCkudG9FcXVhbCgnYXNzaWdubWVudDEnKTtcbiAgICAgICAgZXhwZWN0KGFzc2lnbmVkUm9sZXNbMF0ucm9sZUlkKS50b0VxdWFsKCcxMjM0Jyk7XG4gICAgICAgIGV4cGVjdChhc3NpZ25lZFJvbGVzWzFdLmFzc2lnbm1lbnRJZCkudG9FcXVhbCgnYXNzaWdubWVudDInKTtcbiAgICAgICAgZXhwZWN0KGFzc2lnbmVkUm9sZXNbMV0ucm9sZUlkKS50b0VxdWFsKCc1Njc4Jyk7XG4gICAgfVxuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIEN1cnJlbnRBY2Nlc3NJdGVtIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnNfLCBfQWNjZXNzUmVxdWVzdEl0ZW1fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEpIHtcbiAgICAgICAgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMgPSBfQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnNfO1xuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbSA9IF9BY2Nlc3NSZXF1ZXN0SXRlbV87XG4gICAgICAgIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiA9IF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fO1xuXG4gICAgICAgIHF1ZXN0aW9uRGF0YSA9IHtcbiAgICAgICAgICAgIHBlcm1pdHRlZFJvbGVzOiBbe1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ3NvbWVOYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ3NvbWVPdGhlck5hbWUnXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGFjY291bnRTZWxlY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICd0ZWQucmVkJyxcbiAgICAgICAgICAgICAgICBpZGVudGl0eU5hbWU6ICdUZWQgUmVkJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICdqaW0uaGltJyxcbiAgICAgICAgICAgICAgICBpZGVudGl0eU5hbWU6ICdKaW0gSGltJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzOiBbXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdFRlc3REYXRhLkFNQklHVU9VU19BU1NJR05FRF9ST0xFMSxcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQU1CSUdVT1VTX0FTU0lHTkVEX1JPTEUyXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBjb25zdHJ1Y3RvciBjYWxsZWQgd2l0aG91dCBhbiBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGlzIGEgcHJpbWl0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKCdmb28nKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIG5vIHBlcm1pdHRlZCByb2xlcyBpZiBub25lIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHt9KTtcbiAgICAgICAgZXhwZWN0KHF1ZXN0aW9ucy5wZXJtaXR0ZWRSb2xlcykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgbm8gcGVybWl0dGVkIHJvbGVzIGlmIHVuZGVmaW5lZCBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7cGVybWl0dGVkUm9sZXM6IHVuZGVmaW5lZH0pO1xuICAgICAgICBleHBlY3QocXVlc3Rpb25zLnBlcm1pdHRlZFJvbGVzKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhbiBlbXB0eSBhcnJheSBmb3IgcGVybW1pdHRlZCByb2xlcyBpZiBhbiBlbXB0eSBhcnJheSBpcyBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7cGVybWl0dGVkUm9sZXM6IFtdfSk7XG4gICAgICAgIGV4cGVjdChxdWVzdGlvbnMucGVybWl0dGVkUm9sZXMpLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGFuIGFuIGFjY2VzcyBpdGVtIGZvciBldmVyeSBwZXJtaXR0ZWQgcm9sZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtwZXJtaXR0ZWRSb2xlczogcXVlc3Rpb25EYXRhLnBlcm1pdHRlZFJvbGVzfSk7XG4gICAgICAgIGNoZWNrUGVybWl0dGVkUm9sZXMocXVlc3Rpb25zLnBlcm1pdHRlZFJvbGVzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBubyBhY2NvdW50IHNlbGVjdGlvbnMgaWYgbm9uZSBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7fSk7XG4gICAgICAgIGV4cGVjdChxdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIG5vIGFjY291bnQgc2VsZWN0aW9ucyBpZiB1bmRlZmluZWQgcGFzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoe2FjY291bnRTZWxlY3Rpb25zOiB1bmRlZmluZWR9KTtcbiAgICAgICAgZXhwZWN0KHF1ZXN0aW9ucy5hY2NvdW50U2VsZWN0aW9ucykubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYW4gZW1wdHkgYXJyYXkgZm9yIGFjY291bnQgc2VsZWN0aW9ucyBpZiBhbiBlbXB0eSBhcnJheSBpcyBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7YWNjb3VudFNlbGVjdGlvbnM6IFtdfSk7XG4gICAgICAgIGV4cGVjdChxdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMpLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGFuIGFuIGFjY291bnQgc2VsZWN0aW9uIGZvciBldmVyeSBhY2NvdW50IHNlbGVjdGlvbiBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoe2FjY291bnRTZWxlY3Rpb25zOiBxdWVzdGlvbkRhdGEuYWNjb3VudFNlbGVjdGlvbnN9KTtcbiAgICAgICAgY2hlY2tBY2NvdW50U2VsZWN0aW9ucyhxdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIG5vIGFtYmlndW91cyBhc3NpZ25lZCByb2xlcyBpZiBub25lIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHt9KTtcbiAgICAgICAgZXhwZWN0KHF1ZXN0aW9ucy5hbWJpZ3VvdXNBc3NpZ25lZFJvbGVzKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBubyBhbWJpZ3VvdXMgYXNzaWduZWQgcm9sZXMgaWYgdW5kZWZpbmVkIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHthbWJpZ3VvdXNBc3NpZ25lZFJvbGVzOiB1bmRlZmluZWR9KTtcbiAgICAgICAgZXhwZWN0KHF1ZXN0aW9ucy5hbWJpZ3VvdXNBc3NpZ25lZFJvbGVzKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhbiBlbXB0eSBhcnJheSBmb3IgYW1iaWd1b3VzIGFzc2lnbmVkIHJvbGVzIGlmIGFuIGVtcHR5IGFycmF5IGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHthbWJpZ3VvdXNBc3NpZ25lZFJvbGVzOiBbXX0pO1xuICAgICAgICBleHBlY3QocXVlc3Rpb25zLmFtYmlndW91c0Fzc2lnbmVkUm9sZXMpLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGFuIGFuIGFzc2lnbmVkIHJvbGUgZm9yIGV2ZXJ5IGFtYmlndW91cyBhc3NpZ25lZCByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbnMgPVxuICAgICAgICAgICAgbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHthbWJpZ3VvdXNBc3NpZ25lZFJvbGVzOiBxdWVzdGlvbkRhdGEuYW1iaWd1b3VzQXNzaWduZWRSb2xlc30pO1xuICAgICAgICBjaGVja0FtYmlndW91c0Fzc2lnbmVkUm9sZXMocXVlc3Rpb25zLmFtYmlndW91c0Fzc2lnbmVkUm9sZXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGFuIGVtcHR5IGludmFsaWRSZXF1ZXN0ZWUgcHJvcGVydHkgaWYgYW4gZW1wdHkgYXJyYXkgaXMgcGFzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoe2ludmFsaWRSZXF1ZXN0ZWVzOiBbXX0pO1xuICAgICAgICBleHBlY3QocXVlc3Rpb25zLmludmFsaWRSZXF1ZXN0ZWVzKS50b0VxdWFsKFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhbiB1bmRlZmluZWQgaW52YWxpZFJlcXVlc3RlZSBpZiBub3QgcGFzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoe30pO1xuICAgICAgICBleHBlY3QocXVlc3Rpb25zLmludmFsaWRSZXF1ZXN0ZWVzKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhbiB1bmRlZmluZWQgaW52YWxpZFJlcXVlc3RlZSBwcm9wZXJ0eSBpZiBwYXNzZWQgdmFsdWUgaXMgbm90IGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7aW52YWxpZFJlcXVlc3RlZXM6IDd9KTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGV4cGVjdGVkIG9iamVjdHMgZm9yIGV2ZXJ5IG9iamVjdCBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyhxdWVzdGlvbkRhdGEpO1xuICAgICAgICBjaGVja1Blcm1pdHRlZFJvbGVzKHF1ZXN0aW9ucy5wZXJtaXR0ZWRSb2xlcyk7XG4gICAgICAgIGNoZWNrQWNjb3VudFNlbGVjdGlvbnMocXVlc3Rpb25zLmFjY291bnRTZWxlY3Rpb25zKTtcbiAgICAgICAgY2hlY2tBbWJpZ3VvdXNBc3NpZ25lZFJvbGVzKHF1ZXN0aW9ucy5hbWJpZ3VvdXNBc3NpZ25lZFJvbGVzKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
