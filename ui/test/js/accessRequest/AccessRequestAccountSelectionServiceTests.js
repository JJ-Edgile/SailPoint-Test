System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestAccountSelectionService
             */
            describe('AccessRequestAccountSelectionService', function () {

                var accessRequestAccountSelectionService, spModal, AccessRequestItem, IdentityAccountSelection, RequestedAccessItem, AssignedRole, accessRequestTestData;

                ////////////////////////////////////////////////////////////////////////////
                //
                // GLOBAL SETUP
                //
                ////////////////////////////////////////////////////////////////////////////

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                // Setup the dependencies.
                /* jshint maxparams:7 */
                beforeEach(inject(function (_accessRequestAccountSelectionService_, _spModal_, _AccessRequestItem_, _IdentityAccountSelection_, _RequestedAccessItem_, _AssignedRole_, _accessRequestTestData_) {
                    accessRequestAccountSelectionService = _accessRequestAccountSelectionService_;
                    AccessRequestItem = _AccessRequestItem_;
                    IdentityAccountSelection = _IdentityAccountSelection_;
                    RequestedAccessItem = _RequestedAccessItem_;
                    AssignedRole = _AssignedRole_;
                    spModal = _spModal_;
                    accessRequestTestData = _accessRequestTestData_;
                }));

                describe('openDialog()', function () {
                    var accessItem, accountSelections, assignedRoles;

                    beforeEach(function () {
                        accessItem = new AccessRequestItem({});
                        accountSelections = [new IdentityAccountSelection({}), new IdentityAccountSelection({})];
                        assignedRoles = [new AssignedRole({}), new AssignedRole({})];
                    });

                    it('should throw if accessItem is not defined', function () {
                        expect(function () {
                            accessRequestAccountSelectionService.openDialog(null);
                        }).toThrow();
                    });

                    it('should throw if both accountSelections and ambiguousAssignedRoles are not defined', function () {
                        expect(function () {
                            accessRequestAccountSelectionService.openDialog(accessItem, null, null);
                        }).toThrow();
                    });

                    it('should open dialog with all the correct values resolved', function () {
                        var permittedBy = '1234',
                            assignmentId = 'abcd';

                        var callArgs;

                        spyOn(spModal, 'open').and.returnValue({});
                        accessRequestAccountSelectionService.openDialog(accessItem, accountSelections, assignedRoles, permittedBy, assignmentId);
                        expect(spModal.open).toHaveBeenCalled();
                        callArgs = spModal.open.calls.mostRecent().args;
                        expect(callArgs[0].resolve.accessRequestItem()).toEqual(accessItem);
                        expect(callArgs[0].resolve.accountSelections()).toEqual(accountSelections);
                        expect(callArgs[0].resolve.ambiguousAssignedRoles()).toEqual(assignedRoles);
                        expect(callArgs[0].resolve.permittedById()).toEqual(permittedBy);
                        expect(callArgs[0].resolve.assignmentId()).toEqual(assignmentId);
                    });
                });

                describe('editAccountSelections', function () {
                    var permittedBy = '1234',
                        assignmentId = 'abcd',
                        accountSelections,
                        accessItem,
                        requestedItem,
                        addtQuestions,
                        $rootScope,
                        accessRequestItemsService,
                        accessRequestDataService;

                    beforeEach(inject(function (_$rootScope_, $q, AccessRequestAdditionalQuestions, _accessRequestDataService_, _accessRequestItemsService_) {
                        var addtQuestionsDeferred;

                        $rootScope = _$rootScope_;
                        accessRequestDataService = _accessRequestDataService_;
                        accessRequestItemsService = _accessRequestItemsService_;

                        accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1), new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION2)];
                        accessItem = new AccessRequestItem(accessRequestTestData.PERMITTED_ROLE);
                        requestedItem = new RequestedAccessItem(accessItem);
                        requestedItem.accountSelections = accountSelections;
                        requestedItem.permittedById = permittedBy;
                        requestedItem.assignmentId = assignmentId;

                        // Create a fake response for the additional questions call.
                        addtQuestionsDeferred = $q.defer();
                        addtQuestions = new AccessRequestAdditionalQuestions({
                            accountSelections: [accessRequestTestData.IDENTITY_ACCT_SELECTION1]
                        });
                        addtQuestionsDeferred.resolve(addtQuestions);
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(addtQuestionsDeferred.promise);

                        // Spy on the dialog getting opened.
                        spyOn(accessRequestAccountSelectionService, 'openDialog');
                    }));

                    it('throws if called without requestedAccessItem', function () {
                        expect(function () {
                            accessRequestAccountSelectionService.editAccountSelections(null);
                        }).toThrow();
                    });

                    /**
                     * Mock the accessRequestDataService to return identities with the given IDs.
                     *
                     * @param {Array<String>} identityIds  An array of the IDs of identities to return.
                     */
                    function mockIdentities(identityIds) {
                        spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.callFake(function () {
                            return identityIds.map(function (identityId) {
                                return {
                                    // Create a fake Identity with a getId() method.
                                    getId: function () {
                                        return identityId;
                                    }
                                };
                            });
                        });
                    }

                    it('does not retrieve additional questions with no new identities', function () {
                        // Make the identities match the selections that are on the requested item.
                        mockIdentities([accessRequestTestData.IDENTITY_ACCT_SELECTION1.identityId, accessRequestTestData.IDENTITY_ACCT_SELECTION2.identityId]);
                        accessRequestAccountSelectionService.editAccountSelections(requestedItem);
                        $rootScope.$apply();
                        expect(accessRequestItemsService.getAdditionalQuestions).not.toHaveBeenCalled();
                    });

                    it('retrieves additional questions with new identities', function () {
                        var callArgs;

                        // Add one additional identity (over what is already in the account selections).
                        mockIdentities([accessRequestTestData.IDENTITY_ACCT_SELECTION1.identityId, accessRequestTestData.IDENTITY_ACCT_SELECTION2.identityId, 'dudeLooksLikeALady']);

                        // Null this out so the data service doesn't try to look up this item.
                        requestedItem.permittedById = null;

                        accessRequestAccountSelectionService.editAccountSelections(requestedItem);
                        $rootScope.$apply();
                        expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                        callArgs = accessRequestItemsService.getAdditionalQuestions.calls.mostRecent().args;
                        expect(callArgs[0]).toEqual(accessItem);
                        expect(callArgs[2]).toBeNull();
                        expect(callArgs[3]).toEqual(assignmentId);
                    });

                    it('merges account selections into existing account selections', function () {
                        var callArgs;

                        // Add one additional identity (over what is already in the account selections).
                        mockIdentities(['dudeLooksLikeALady']);

                        // Null this out so the data service doesn't try to look up this item.
                        requestedItem.permittedById = null;

                        spyOn(IdentityAccountSelection, 'mergeAccountSelections').and.callThrough();

                        accessRequestAccountSelectionService.editAccountSelections(requestedItem);
                        $rootScope.$apply();
                        expect(IdentityAccountSelection.mergeAccountSelections).toHaveBeenCalled();
                        callArgs = IdentityAccountSelection.mergeAccountSelections.calls.mostRecent().args;

                        expect(callArgs[0]).toEqual(requestedItem.accountSelections);
                        expect(callArgs[1]).toEqual(addtQuestions.accountSelections);
                    });

                    it('calls openDialog with the right values', function () {
                        var callArgs;

                        accessRequestAccountSelectionService.editAccountSelections(requestedItem);
                        $rootScope.$apply();

                        expect(accessRequestAccountSelectionService.openDialog).toHaveBeenCalled();
                        callArgs = accessRequestAccountSelectionService.openDialog.calls.mostRecent().args;
                        expect(callArgs[0]).toEqual(accessItem);
                        expect(callArgs[1]).toEqual(accountSelections);
                        expect(callArgs[2]).toEqual(undefined);
                        expect(callArgs[3]).toEqual(permittedBy);
                        expect(callArgs[4]).toEqual(assignmentId);
                    });
                });

                describe('count functions', function () {
                    var accessItem, requestedAccessItem, target1Data, target2Data;

                    beforeEach(function () {
                        accessItem = new AccessRequestItem({ id: '123' });
                        requestedAccessItem = new RequestedAccessItem(accessItem);
                        target1Data = {
                            applicationId: 'app1',
                            allowCreate: true
                        };
                        target2Data = {
                            applicationId: 'app1',
                            allowCreate: true
                        };
                    });

                    describe('getTotalAccountSelectionCount()', function () {
                        it('returns zero for RequestedAccessItem with no account selections', function () {
                            var cnt;
                            requestedAccessItem.accountSelections = [new IdentityAccountSelection({ provisioningTargets: [] })];
                            cnt = accessRequestAccountSelectionService.getTotalAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(0);
                        });

                        it('returns two for RequestedAccessItem with an account selection with two targets', function () {
                            var cnt;
                            requestedAccessItem.accountSelections = [new IdentityAccountSelection({
                                provisioningTargets: [target1Data, target2Data]
                            })];
                            cnt = accessRequestAccountSelectionService.getTotalAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(2);
                        });

                        it('returns two for RequestedAccessItem with two account selection with one target each', function () {
                            var cnt;
                            requestedAccessItem.accountSelections = [new IdentityAccountSelection({
                                provisioningTargets: [target1Data]
                            }), new IdentityAccountSelection({
                                provisioningTargets: [target2Data]
                            })];
                            cnt = accessRequestAccountSelectionService.getTotalAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(2);
                        });
                    });

                    describe('getCompletedAccountSelectionCount()', function () {
                        beforeEach(function () {
                            // Add some selections to the requested item.
                            requestedAccessItem.accountSelections = [new IdentityAccountSelection({
                                provisioningTargets: [target1Data]
                            }), new IdentityAccountSelection({
                                provisioningTargets: [target2Data]
                            })];
                        });

                        it('returns 0 for RequestedAccessItem with no account selections', function () {
                            var cnt;
                            requestedAccessItem.accountSelections = [new IdentityAccountSelection({ provisioningTargets: [] })];
                            cnt = accessRequestAccountSelectionService.getCompletedAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(0);
                        });

                        it('returns 0 when no selections are made', function () {
                            var cnt = accessRequestAccountSelectionService.getCompletedAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(0);
                        });

                        it('returns the number of selections that have been made', function () {
                            var cnt;
                            requestedAccessItem.accountSelections[0].provisioningTargets[0].setCreateAccount(true);
                            cnt = accessRequestAccountSelectionService.getCompletedAccountSelectionCount(requestedAccessItem);
                            expect(cnt).toEqual(1);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0QkFBNEIsVUFBVSxTQUFTO0lBQWhJOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQzdCLFNBQVMsd0NBQXdDLFlBQVc7O2dCQUV4RCxJQUFJLHNDQUFzQyxTQUFTLG1CQUFtQiwwQkFDbEUscUJBQXFCLGNBQWM7Ozs7Ozs7OztnQkFTdkMsV0FBVyxPQUFPOzs7O2dCQUlsQixXQUFXLE9BQU8sVUFBUyx3Q0FBd0MsV0FDeEMscUJBQXFCLDRCQUNyQix1QkFBdUIsZ0JBQWdCLHlCQUF5QjtvQkFDdkYsdUNBQXVDO29CQUN2QyxvQkFBb0I7b0JBQ3BCLDJCQUEyQjtvQkFDM0Isc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLFVBQVU7b0JBQ1Ysd0JBQXdCOzs7Z0JBRzVCLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLElBQUksWUFBWSxtQkFBbUI7O29CQUVuQyxXQUFXLFlBQVc7d0JBQ2xCLGFBQWEsSUFBSSxrQkFBa0I7d0JBQ25DLG9CQUFvQixDQUNoQixJQUFJLHlCQUF5QixLQUM3QixJQUFJLHlCQUF5Qjt3QkFFakMsZ0JBQWdCLENBQ1osSUFBSSxhQUFhLEtBQ2pCLElBQUksYUFBYTs7O29CQUl6QixHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxPQUFPLFlBQVc7NEJBQ2QscUNBQXFDLFdBQVc7MkJBQ2pEOzs7b0JBR1AsR0FBRyxxRkFBcUYsWUFBVzt3QkFDL0YsT0FBTyxZQUFXOzRCQUNkLHFDQUFxQyxXQUFXLFlBQVksTUFBTTsyQkFDbkU7OztvQkFHUCxHQUFHLDJE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Q0FBRTtnQ0FFM0IsSUFBSSx5QkFBeUI7Z0NBQ3pCLHFCQUFxQixDQUFFOzs0QkFHL0IsTUFBTSxxQ0FBcUMsOEJBQThCOzRCQUN6RSxPQUFPLEtBQUssUUFBUTs7OztvQkFJNUIsU0FBUyx1Q0FBdUMsWUFBVzt3QkFDdkQsV0FBVyxZQUFXOzs0QkFFbEIsb0JBQW9CLG9CQUFvQixDQUNwQyxJQUFJLHlCQUF5QjtnQ0FDekIscUJBQXFCLENBQUU7Z0NBRTNCLElBQUkseUJBQXlCO2dDQUN6QixxQkFBcUIsQ0FBRTs7Ozt3QkFLbkMsR0FBRyxnRUFBZ0UsWUFBVzs0QkFDMUUsSUFBSTs0QkFDSixvQkFBb0Isb0JBQW9CLENBQUMsSUFBSSx5QkFBeUIsRUFBQyxxQkFBcUI7NEJBQzVGLE1BQU0scUNBQXFDLGtDQUFrQzs0QkFDN0UsT0FBTyxLQUFLLFFBQVE7Ozt3QkFHeEIsR0FBRyx5Q0FBeUMsWUFBVzs0QkFDbkQsSUFBSSxNQUFNLHFDQUFxQyxrQ0FBa0M7NEJBQ2pGLE9BQU8sS0FBSyxRQUFROzs7d0JBR3hCLEdBQUcsd0RBQXdELFlBQVc7NEJBQ2xFLElBQUk7NEJBQ0osb0JBQW9CLGtCQUFrQixHQUFHLG9CQUFvQixHQUFHLGlCQUFpQjs0QkFDakYsTUFBTSxxQ0FBcUMsa0NBQWtDOzRCQUM3RSxPQUFPLEtBQUssUUFBUTs7Ozs7OztHQU5qQyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vQWNjZXNzUmVxdWVzdFRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZVxuICovXG5kZXNjcmliZSgnQWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLCBzcE1vZGFsLCBBY2Nlc3NSZXF1ZXN0SXRlbSwgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLFxuICAgICAgICBSZXF1ZXN0ZWRBY2Nlc3NJdGVtLCBBc3NpZ25lZFJvbGUsIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YTtcblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvL1xuICAgIC8vIEdMT0JBTCBTRVRVUFxuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgLy8gU2V0dXAgdGhlIGRlcGVuZGVuY2llcy5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlXywgX3NwTW9kYWxfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9BY2Nlc3NSZXF1ZXN0SXRlbV8sIF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9SZXF1ZXN0ZWRBY2Nlc3NJdGVtXywgX0Fzc2lnbmVkUm9sZV8sIF9hY2Nlc3NSZXF1ZXN0VGVzdERhdGFfKSB7XG4gICAgICAgIGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2VfO1xuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbSA9IF9BY2Nlc3NSZXF1ZXN0SXRlbV87XG4gICAgICAgIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiA9IF9JZGVudGl0eUFjY291bnRTZWxlY3Rpb25fO1xuICAgICAgICBSZXF1ZXN0ZWRBY2Nlc3NJdGVtID0gX1JlcXVlc3RlZEFjY2Vzc0l0ZW1fO1xuICAgICAgICBBc3NpZ25lZFJvbGUgPSBfQXNzaWduZWRSb2xlXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgYWNjZXNzUmVxdWVzdFRlc3REYXRhID0gX2FjY2Vzc1JlcXVlc3RUZXN0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5EaWFsb2coKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWNjZXNzSXRlbSwgYWNjb3VudFNlbGVjdGlvbnMsIGFzc2lnbmVkUm9sZXM7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFjY2Vzc0l0ZW0gPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oe30pO1xuICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7fSksXG4gICAgICAgICAgICAgICAgbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7fSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBhc3NpZ25lZFJvbGVzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBBc3NpZ25lZFJvbGUoe30pLFxuICAgICAgICAgICAgICAgIG5ldyBBc3NpZ25lZFJvbGUoe30pXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIGFjY2Vzc0l0ZW0gaXMgbm90IGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2Uub3BlbkRpYWxvZyhudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBib3RoIGFjY291bnRTZWxlY3Rpb25zIGFuZCBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzIGFyZSBub3QgZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5vcGVuRGlhbG9nKGFjY2Vzc0l0ZW0sIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gZGlhbG9nIHdpdGggYWxsIHRoZSBjb3JyZWN0IHZhbHVlcyByZXNvbHZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBlcm1pdHRlZEJ5ID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRJZCA9ICdhYmNkJztcblxuICAgICAgICAgICAgdmFyIGNhbGxBcmdzO1xuXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7fSk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2Uub3BlbkRpYWxvZyhhY2Nlc3NJdGVtLCBhY2NvdW50U2VsZWN0aW9ucywgYXNzaWduZWRSb2xlcyxcbiAgICAgICAgICAgICAgICBwZXJtaXR0ZWRCeSwgYXNzaWdubWVudElkKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGNhbGxBcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLnJlc29sdmUuYWNjZXNzUmVxdWVzdEl0ZW0oKSkudG9FcXVhbChhY2Nlc3NJdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXS5yZXNvbHZlLmFjY291bnRTZWxlY3Rpb25zKCkpLnRvRXF1YWwoYWNjb3VudFNlbGVjdGlvbnMpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLnJlc29sdmUuYW1iaWd1b3VzQXNzaWduZWRSb2xlcygpKS50b0VxdWFsKGFzc2lnbmVkUm9sZXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLnJlc29sdmUucGVybWl0dGVkQnlJZCgpKS50b0VxdWFsKHBlcm1pdHRlZEJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXS5yZXNvbHZlLmFzc2lnbm1lbnRJZCgpKS50b0VxdWFsKGFzc2lnbm1lbnRJZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRBY2NvdW50U2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGVybWl0dGVkQnkgPSAnMTIzNCcsIGFzc2lnbm1lbnRJZCA9ICdhYmNkJyxcbiAgICAgICAgICAgIGFjY291bnRTZWxlY3Rpb25zLCBhY2Nlc3NJdGVtLCByZXF1ZXN0ZWRJdGVtLCBhZGR0UXVlc3Rpb25zLFxuICAgICAgICAgICAgJHJvb3RTY29wZSwgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgJHEsIEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXywgX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfKSB7XG4gICAgICAgICAgICB2YXIgYWRkdFF1ZXN0aW9uc0RlZmVycmVkO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3REYXRhU2VydmljZV87XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfO1xuXG4gICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjEpLFxuICAgICAgICAgICAgICAgIG5ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24oYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMilcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBhY2Nlc3NJdGVtID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5QRVJNSVRURURfUk9MRSk7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0oYWNjZXNzSXRlbSk7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gYWNjb3VudFNlbGVjdGlvbnM7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLnBlcm1pdHRlZEJ5SWQgPSBwZXJtaXR0ZWRCeTtcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0uYXNzaWdubWVudElkID0gYXNzaWdubWVudElkO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBmYWtlIHJlc3BvbnNlIGZvciB0aGUgYWRkaXRpb25hbCBxdWVzdGlvbnMgY2FsbC5cbiAgICAgICAgICAgIGFkZHRRdWVzdGlvbnNEZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBhZGR0UXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtcbiAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogWyBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWRkdFF1ZXN0aW9uc0RlZmVycmVkLnJlc29sdmUoYWRkdFF1ZXN0aW9ucyk7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShhZGR0UXVlc3Rpb25zRGVmZXJyZWQucHJvbWlzZSk7XG5cbiAgICAgICAgICAgIC8vIFNweSBvbiB0aGUgZGlhbG9nIGdldHRpbmcgb3BlbmVkLlxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLCAnb3BlbkRpYWxvZycpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQgKCd0aHJvd3MgaWYgY2FsbGVkIHdpdGhvdXQgcmVxdWVzdGVkQWNjZXNzSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5lZGl0QWNjb3VudFNlbGVjdGlvbnMobnVsbCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb2NrIHRoZSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgdG8gcmV0dXJuIGlkZW50aXRpZXMgd2l0aCB0aGUgZ2l2ZW4gSURzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IGlkZW50aXR5SWRzICBBbiBhcnJheSBvZiB0aGUgSURzIG9mIGlkZW50aXRpZXMgdG8gcmV0dXJuLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbW9ja0lkZW50aXRpZXMoaWRlbnRpdHlJZHMpIHtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRJZGVudGl0aWVzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZGVudGl0eUlkcy5tYXAoZnVuY3Rpb24oaWRlbnRpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZmFrZSBJZGVudGl0eSB3aXRoIGEgZ2V0SWQoKSBtZXRob2QuXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkZW50aXR5SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdkb2VzIG5vdCByZXRyaWV2ZSBhZGRpdGlvbmFsIHF1ZXN0aW9ucyB3aXRoIG5vIG5ldyBpZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBpZGVudGl0aWVzIG1hdGNoIHRoZSBzZWxlY3Rpb25zIHRoYXQgYXJlIG9uIHRoZSByZXF1ZXN0ZWQgaXRlbS5cbiAgICAgICAgICAgIG1vY2tJZGVudGl0aWVzKFsgYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZX0FDQ1RfU0VMRUNUSU9OMS5pZGVudGl0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04yLmlkZW50aXR5SWQgXSk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UuZWRpdEFjY291bnRTZWxlY3Rpb25zKHJlcXVlc3RlZEl0ZW0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXRyaWV2ZXMgYWRkaXRpb25hbCBxdWVzdGlvbnMgd2l0aCBuZXcgaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNhbGxBcmdzO1xuXG4gICAgICAgICAgICAvLyBBZGQgb25lIGFkZGl0aW9uYWwgaWRlbnRpdHkgKG92ZXIgd2hhdCBpcyBhbHJlYWR5IGluIHRoZSBhY2NvdW50IHNlbGVjdGlvbnMpLlxuICAgICAgICAgICAgbW9ja0lkZW50aXRpZXMoWyBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xLmlkZW50aXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjIuaWRlbnRpdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2R1ZGVMb29rc0xpa2VBTGFkeScgXSk7XG5cbiAgICAgICAgICAgIC8vIE51bGwgdGhpcyBvdXQgc28gdGhlIGRhdGEgc2VydmljZSBkb2Vzbid0IHRyeSB0byBsb29rIHVwIHRoaXMgaXRlbS5cbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0ucGVybWl0dGVkQnlJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5lZGl0QWNjb3VudFNlbGVjdGlvbnMocmVxdWVzdGVkSXRlbSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgY2FsbEFyZ3MgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICBleHBlY3QoY2FsbEFyZ3NbMF0pLnRvRXF1YWwoYWNjZXNzSXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoY2FsbEFyZ3NbMl0pLnRvQmVOdWxsKCk7XG4gICAgICAgICAgICBleHBlY3QoY2FsbEFyZ3NbM10pLnRvRXF1YWwoYXNzaWdubWVudElkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ21lcmdlcyBhY2NvdW50IHNlbGVjdGlvbnMgaW50byBleGlzdGluZyBhY2NvdW50IHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjYWxsQXJncztcblxuICAgICAgICAgICAgLy8gQWRkIG9uZSBhZGRpdGlvbmFsIGlkZW50aXR5IChvdmVyIHdoYXQgaXMgYWxyZWFkeSBpbiB0aGUgYWNjb3VudCBzZWxlY3Rpb25zKS5cbiAgICAgICAgICAgIG1vY2tJZGVudGl0aWVzKFsgJ2R1ZGVMb29rc0xpa2VBTGFkeScgXSk7XG5cbiAgICAgICAgICAgIC8vIE51bGwgdGhpcyBvdXQgc28gdGhlIGRhdGEgc2VydmljZSBkb2Vzbid0IHRyeSB0byBsb29rIHVwIHRoaXMgaXRlbS5cbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0ucGVybWl0dGVkQnlJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIHNweU9uKElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiwgJ21lcmdlQWNjb3VudFNlbGVjdGlvbnMnKS5hbmQuY2FsbFRocm91Z2goKTtcblxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLmVkaXRBY2NvdW50U2VsZWN0aW9ucyhyZXF1ZXN0ZWRJdGVtKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLm1lcmdlQWNjb3VudFNlbGVjdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGNhbGxBcmdzID0gSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uLm1lcmdlQWNjb3VudFNlbGVjdGlvbnMuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG5cbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXSkudG9FcXVhbChyZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1sxXSkudG9FcXVhbChhZGR0UXVlc3Rpb25zLmFjY291bnRTZWxlY3Rpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdjYWxscyBvcGVuRGlhbG9nIHdpdGggdGhlIHJpZ2h0IHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNhbGxBcmdzO1xuXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UuZWRpdEFjY291bnRTZWxlY3Rpb25zKHJlcXVlc3RlZEl0ZW0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5vcGVuRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBjYWxsQXJncyA9IGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5vcGVuRGlhbG9nLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdKS50b0VxdWFsKGFjY2Vzc0l0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzFdKS50b0VxdWFsKGFjY291bnRTZWxlY3Rpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1syXSkudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzNdKS50b0VxdWFsKHBlcm1pdHRlZEJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1s0XSkudG9FcXVhbChhc3NpZ25tZW50SWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb3VudCBmdW5jdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY2Vzc0l0ZW0sIHJlcXVlc3RlZEFjY2Vzc0l0ZW0sIHRhcmdldDFEYXRhLCB0YXJnZXQyRGF0YTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWNjZXNzSXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbSh7aWQ6ICcxMjMnfSk7XG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0oYWNjZXNzSXRlbSk7XG4gICAgICAgICAgICB0YXJnZXQxRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnYXBwMScsXG4gICAgICAgICAgICAgICAgYWxsb3dDcmVhdGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0YXJnZXQyRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnYXBwMScsXG4gICAgICAgICAgICAgICAgYWxsb3dDcmVhdGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRUb3RhbEFjY291bnRTZWxlY3Rpb25Db3VudCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgncmV0dXJucyB6ZXJvIGZvciBSZXF1ZXN0ZWRBY2Nlc3NJdGVtIHdpdGggbm8gYWNjb3VudCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNudDtcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW25ldyBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24oe3Byb3Zpc2lvbmluZ1RhcmdldHM6IFtdfSldO1xuICAgICAgICAgICAgICAgIGNudCA9IGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5nZXRUb3RhbEFjY291bnRTZWxlY3Rpb25Db3VudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY250KS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHR3byBmb3IgUmVxdWVzdGVkQWNjZXNzSXRlbSB3aXRoIGFuIGFjY291bnQgc2VsZWN0aW9uIHdpdGggdHdvIHRhcmdldHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY250O1xuICAgICAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uYWNjb3VudFNlbGVjdGlvbnMgPSBbbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldHM6IFsgdGFyZ2V0MURhdGEsIHRhcmdldDJEYXRhIF1cbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY250ID0gYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLmdldFRvdGFsQWNjb3VudFNlbGVjdGlvbkNvdW50KHJlcXVlc3RlZEFjY2Vzc0l0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjbnQpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHdvIGZvciBSZXF1ZXN0ZWRBY2Nlc3NJdGVtIHdpdGggdHdvIGFjY291bnQgc2VsZWN0aW9uIHdpdGggb25lIHRhcmdldCBlYWNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNudDtcbiAgICAgICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldHM6IFsgdGFyZ2V0MURhdGEgXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdUYXJnZXRzOiBbIHRhcmdldDJEYXRhIF1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNudCA9IGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5nZXRUb3RhbEFjY291bnRTZWxlY3Rpb25Db3VudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY250KS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRDb21wbGV0ZWRBY2NvdW50U2VsZWN0aW9uQ291bnQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgc29tZSBzZWxlY3Rpb25zIHRvIHRoZSByZXF1ZXN0ZWQgaXRlbS5cbiAgICAgICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW1xuICAgICAgICAgICAgICAgICAgICBuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldHM6IFsgdGFyZ2V0MURhdGEgXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aXNpb25pbmdUYXJnZXRzOiBbIHRhcmdldDJEYXRhIF1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIDAgZm9yIFJlcXVlc3RlZEFjY2Vzc0l0ZW0gd2l0aCBubyBhY2NvdW50IHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY250O1xuICAgICAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uYWNjb3VudFNlbGVjdGlvbnMgPSBbbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbih7cHJvdmlzaW9uaW5nVGFyZ2V0czogW119KV07XG4gICAgICAgICAgICAgICAgY250ID0gYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLmdldENvbXBsZXRlZEFjY291bnRTZWxlY3Rpb25Db3VudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY250KS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIDAgd2hlbiBubyBzZWxlY3Rpb25zIGFyZSBtYWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNudCA9IGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5nZXRDb21wbGV0ZWRBY2NvdW50U2VsZWN0aW9uQ291bnQocmVxdWVzdGVkQWNjZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNudCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0aGUgbnVtYmVyIG9mIHNlbGVjdGlvbnMgdGhhdCBoYXZlIGJlZW4gbWFkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjbnQ7XG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9uc1swXS5wcm92aXNpb25pbmdUYXJnZXRzWzBdLnNldENyZWF0ZUFjY291bnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgY250ID0gYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLmdldENvbXBsZXRlZEFjY291bnRTZWxlY3Rpb25Db3VudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY250KS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
