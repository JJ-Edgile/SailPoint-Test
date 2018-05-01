System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the RequestedAccessItem model object.
             */
            describe('RequestedAccessItem', function () {
                var roleData, permittedRoleData, entitlementData, RequestedAccessItem, AccessRequestItem, role, permittedRole, requestedItem, entitlement, requestedItem2, requestedItem3;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the RequestedAccessItem class and create some data to test with.
                 */
                beforeEach(inject(function (_RequestedAccessItem_, _AccessRequestItem_, accessRequestTestData) {
                    RequestedAccessItem = _RequestedAccessItem_;
                    AccessRequestItem = _AccessRequestItem_;

                    roleData = accessRequestTestData.CURRENT_ACCESS_ROLE;
                    permittedRoleData = accessRequestTestData.PERMITTED_ROLE;
                    entitlementData = accessRequestTestData.CURRENT_ACCESS_ENTITLEMENT;

                    role = new AccessRequestItem(roleData);
                    permittedRole = new AccessRequestItem(permittedRoleData);
                    entitlement = new AccessRequestItem(entitlementData);
                    requestedItem = new RequestedAccessItem(role);
                    requestedItem2 = new RequestedAccessItem(entitlement);
                    requestedItem3 = new RequestedAccessItem(permittedRole);
                }));

                it('requires a non-null item in the constructor', function () {
                    expect(function () {
                        new RequestedAccessItem(null);
                    }).toThrow();
                });

                it('starts with a null permittedById', function () {
                    expect(requestedItem.permittedById).toBeNull();
                });

                it('starts with a null accountSelections', function () {
                    expect(requestedItem.accountSelections).toBeNull();
                });

                it('has the item set in the constructor', function () {
                    expect(requestedItem.item).toEqual(role);
                });

                it('returns an ID for the unique id', function () {
                    expect(requestedItem.getUniqueId()).toEqual(roleData.id);
                });

                it('should set and get account selections', function () {
                    var acctSels = ['foo'];
                    requestedItem.setAccountSelections(acctSels);
                    expect(requestedItem.getAccountSelections()).toEqual(acctSels);
                });

                it('should default sunrise date to null', function () {
                    expect(requestedItem.getSunriseDate()).toBeNull();
                });

                it('should default sunset date to null', function () {
                    expect(requestedItem.getSunsetDate()).toBeNull();
                });

                it('dateset should default to false', function () {
                    expect(requestedItem.isDateSet()).toEqual(false);
                });

                it('dateset should get set when sunrise is set', function () {
                    var sunrise = new Date();
                    requestedItem.setSunriseDate(sunrise);
                    expect(requestedItem.isDateSet()).toEqual(true);
                });

                it('dateset should get set when sunset is set', function () {
                    var sunset = new Date();
                    requestedItem.setSunsetDate(sunset);
                    expect(requestedItem.isDateSet()).toEqual(true);
                });

                it('should set and get sunrise date', function () {
                    var sunrise = new Date();
                    requestedItem.setSunriseDate(sunrise);
                    expect(requestedItem.getSunriseDate()).toEqual(sunrise);
                });

                it('should set and get sunset date', function () {
                    var sunset = new Date();
                    requestedItem.setSunsetDate(sunset);
                    expect(requestedItem.getSunsetDate()).toEqual(sunset);
                });

                it('should set and get commment', function () {
                    var comment = 'some comment';
                    requestedItem.setComment(comment);
                    expect(requestedItem.getComment()).toEqual(comment);
                });

                it('should set and get assignment note', function () {
                    var note = 'some assignment note';
                    requestedItem.setAssignmentNote(note);
                    expect(requestedItem.getAssignmentNote()).toEqual(note);
                });

                it('should set and get assignmentId', function () {
                    var assignmentId = 'testid';
                    requestedItem.setAssignmentId(assignmentId);
                    expect(requestedItem.getAssignmentId()).toEqual(assignmentId);
                });

                it('should say assignment note is allowed when item is role', function () {
                    expect(requestedItem.isAssignmentNoteAllowed()).toEqual(true);
                });

                it('should say assignment note is not allowed when item is not role', function () {
                    expect(requestedItem2.isAssignmentNoteAllowed()).toEqual(false);
                });

                it('should say assignment note is not allowed when item is a permitted by role', function () {
                    requestedItem.permittedById = 999;
                    expect(requestedItem.isAssignmentNoteAllowed()).toEqual(false);
                });

                it('assignment note should not be allowed when item has permitted flag set', function () {
                    expect(requestedItem3.isAssignmentNoteAllowed()).toEqual(false);
                });

                it('should say has comments or notes when there is a comment', function () {
                    requestedItem.setComment('blah blah');
                    expect(requestedItem.hasCommentsOrNotes()).toEqual(true);
                });

                it('should say no comments or notes when there is not a comment or note', function () {
                    expect(requestedItem.hasCommentsOrNotes()).toEqual(false);
                });

                it('should say has comments or notes when there is a assignment note', function () {
                    requestedItem.setAssignmentNote('blah blah');
                    expect(requestedItem.hasCommentsOrNotes()).toEqual(true);
                });

                describe('hasMissingAccountSelections()', function () {

                    /**
                     * Create a mock IdentityAccountSelection that returns the given value for
                     * calls to allTargetsHaveSelections.
                     *
                     * @param {boolean} hasSelections  Whether all selections are made.
                     *
                     * @return {Object} A mock IdentityAccountSelection with allTargetsHaveSelections()
                     *    stubbed out.
                     */
                    function createAccountSelection(hasSelections) {
                        return {
                            allTargetsHaveSelections: function () {
                                return hasSelections;
                            }
                        };
                    }

                    it('returns false if all have selections', function () {
                        requestedItem.accountSelections = [createAccountSelection(true), createAccountSelection(true)];
                        expect(requestedItem.hasMissingAccountSelections()).toEqual(false);
                    });

                    it('returns true if first item does not have a selection', function () {
                        requestedItem.accountSelections = [createAccountSelection(false), createAccountSelection(true)];
                        expect(requestedItem.hasMissingAccountSelections()).toEqual(true);
                    });

                    it('returns true if last item does not have a selection', function () {
                        requestedItem.accountSelections = [createAccountSelection(true), createAccountSelection(false)];
                        expect(requestedItem.hasMissingAccountSelections()).toEqual(true);
                    });

                    it('returns true if no items have selections', function () {
                        requestedItem.accountSelections = [createAccountSelection(false), createAccountSelection(false)];
                        expect(requestedItem.hasMissingAccountSelections()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvUmVxdWVzdGVkQWNjZXNzSXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUztJQUFqSTs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOzs7OztZQUM3QixTQUFTLHVCQUF1QixZQUFXO2dCQUN2QyxJQUFJLFVBQVUsbUJBQW1CLGlCQUM3QixxQkFBcUIsbUJBQW1CLE1BQU0sZUFBZSxlQUFlLGFBQWEsZ0JBQ3pGOzs7Z0JBR0osV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsdUJBQXVCLHFCQUFxQix1QkFBdUI7b0JBQzFGLHNCQUFzQjtvQkFDdEIsb0JBQW9COztvQkFFcEIsV0FBVyxzQkFBc0I7b0JBQ2pDLG9CQUFvQixzQkFBc0I7b0JBQzFDLGtCQUFrQixzQkFBc0I7O29CQUV4QyxPQUFPLElBQUksa0JBQWtCO29CQUM3QixnQkFBZ0IsSUFBSSxrQkFBa0I7b0JBQ3RDLGNBQWMsSUFBSSxrQkFBa0I7b0JBQ3BDLGdCQUFnQixJQUFJLG9CQUFvQjtvQkFDeEMsaUJBQWlCLElBQUksb0JBQW9CO29CQUN6QyxpQkFBaUIsSUFBSSxvQkFBb0I7OztnQkFHN0MsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsT0FBTyxZQUFXO3dCQUFFLElBQUksb0JBQW9CO3VCQUFVOzs7Z0JBRzFELEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLE9BQU8sY0FBYyxlQUFlOzs7Z0JBR3hDLEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELE9BQU8sY0FBYyxtQkFBbUI7OztnQkFHNUMsR0FBRyx1Q0FBdUMsWUFBVztvQkFDakQsT0FBTyxjQUFjLE1BQU0sUUFBUTs7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QUcsNENBQTRDLFlBQVc7d0JBQ3RELGNBQWMsb0JBQW9CLENBQzlCLHVCQUF1QixRQUN2Qix1QkFBdUI7d0JBRTNCLE9BQU8sY0FBYywrQkFBK0IsUUFBUTs7Ozs7O0dBRnJFIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvbW9kZWwvUmVxdWVzdGVkQWNjZXNzSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5pbXBvcnQgJy4uL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBSZXF1ZXN0ZWRBY2Nlc3NJdGVtIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ1JlcXVlc3RlZEFjY2Vzc0l0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9sZURhdGEsIHBlcm1pdHRlZFJvbGVEYXRhLCBlbnRpdGxlbWVudERhdGEsXG4gICAgICAgIFJlcXVlc3RlZEFjY2Vzc0l0ZW0sIEFjY2Vzc1JlcXVlc3RJdGVtLCByb2xlLCBwZXJtaXR0ZWRSb2xlLCByZXF1ZXN0ZWRJdGVtLCBlbnRpdGxlbWVudCwgcmVxdWVzdGVkSXRlbTIsXG4gICAgICAgIHJlcXVlc3RlZEl0ZW0zO1xuXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIFJlcXVlc3RlZEFjY2Vzc0l0ZW0gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9SZXF1ZXN0ZWRBY2Nlc3NJdGVtXywgX0FjY2Vzc1JlcXVlc3RJdGVtXywgYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XG4gICAgICAgIFJlcXVlc3RlZEFjY2Vzc0l0ZW0gPSBfUmVxdWVzdGVkQWNjZXNzSXRlbV87XG4gICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtID0gX0FjY2Vzc1JlcXVlc3RJdGVtXztcblxuICAgICAgICByb2xlRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5DVVJSRU5UX0FDQ0VTU19ST0xFO1xuICAgICAgICBwZXJtaXR0ZWRSb2xlRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5QRVJNSVRURURfUk9MRTtcbiAgICAgICAgZW50aXRsZW1lbnREYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX0VOVElUTEVNRU5UO1xuXG4gICAgICAgIHJvbGUgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0ocm9sZURhdGEpO1xuICAgICAgICBwZXJtaXR0ZWRSb2xlID0gbmV3IEFjY2Vzc1JlcXVlc3RJdGVtKHBlcm1pdHRlZFJvbGVEYXRhKTtcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oZW50aXRsZW1lbnREYXRhKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKHJvbGUpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtMiA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKGVudGl0bGVtZW50KTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbTMgPSBuZXcgUmVxdWVzdGVkQWNjZXNzSXRlbShwZXJtaXR0ZWRSb2xlKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgYSBub24tbnVsbCBpdGVtIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RhcnRzIHdpdGggYSBudWxsIHBlcm1pdHRlZEJ5SWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0ucGVybWl0dGVkQnlJZCkudG9CZU51bGwoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzdGFydHMgd2l0aCBhIG51bGwgYWNjb3VudFNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uYWNjb3VudFNlbGVjdGlvbnMpLnRvQmVOdWxsKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFzIHRoZSBpdGVtIHNldCBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uaXRlbSkudG9FcXVhbChyb2xlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIElEIGZvciB0aGUgdW5pcXVlIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldFVuaXF1ZUlkKCkpLnRvRXF1YWwocm9sZURhdGEuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBhY2NvdW50IHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY3RTZWxzID0gWyAnZm9vJyBdO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnNldEFjY291bnRTZWxlY3Rpb25zKGFjY3RTZWxzKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0QWNjb3VudFNlbGVjdGlvbnMoKSkudG9FcXVhbChhY2N0U2Vscyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlZmF1bHQgc3VucmlzZSBkYXRlIHRvIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0U3VucmlzZURhdGUoKSkudG9CZU51bGwoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGVmYXVsdCBzdW5zZXQgZGF0ZSB0byBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldFN1bnNldERhdGUoKSkudG9CZU51bGwoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkYXRlc2V0IHNob3VsZCBkZWZhdWx0IHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmlzRGF0ZVNldCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkYXRlc2V0IHNob3VsZCBnZXQgc2V0IHdoZW4gc3VucmlzZSBpcyBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN1bnJpc2UgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnNldFN1bnJpc2VEYXRlKHN1bnJpc2UpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5pc0RhdGVTZXQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkYXRlc2V0IHNob3VsZCBnZXQgc2V0IHdoZW4gc3Vuc2V0IGlzIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Vuc2V0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbS5zZXRTdW5zZXREYXRlKHN1bnNldCk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmlzRGF0ZVNldCgpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBzdW5yaXNlIGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN1bnJpc2UgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnNldFN1bnJpc2VEYXRlKHN1bnJpc2UpO1xuICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5nZXRTdW5yaXNlRGF0ZSgpKS50b0VxdWFsKHN1bnJpc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBzdW5zZXQgZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Vuc2V0ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmVxdWVzdGVkSXRlbS5zZXRTdW5zZXREYXRlKHN1bnNldCk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldFN1bnNldERhdGUoKSkudG9FcXVhbChzdW5zZXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgYW5kIGdldCBjb21tbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tbWVudCA9ICdzb21lIGNvbW1lbnQnO1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnNldENvbW1lbnQoY29tbWVudCk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmdldENvbW1lbnQoKSkudG9FcXVhbChjb21tZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGFuZCBnZXQgYXNzaWdubWVudCBub3RlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBub3RlID0gJ3NvbWUgYXNzaWdubWVudCBub3RlJztcbiAgICAgICAgcmVxdWVzdGVkSXRlbS5zZXRBc3NpZ25tZW50Tm90ZShub3RlKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0QXNzaWdubWVudE5vdGUoKSkudG9FcXVhbChub3RlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGFuZCBnZXQgYXNzaWdubWVudElkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhc3NpZ25tZW50SWQgPSAndGVzdGlkJztcbiAgICAgICAgcmVxdWVzdGVkSXRlbS5zZXRBc3NpZ25tZW50SWQoYXNzaWdubWVudElkKTtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uZ2V0QXNzaWdubWVudElkKCkpLnRvRXF1YWwoYXNzaWdubWVudElkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2F5IGFzc2lnbm1lbnQgbm90ZSBpcyBhbGxvd2VkIHdoZW4gaXRlbSBpcyByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmlzQXNzaWdubWVudE5vdGVBbGxvd2VkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNheSBhc3NpZ25tZW50IG5vdGUgaXMgbm90IGFsbG93ZWQgd2hlbiBpdGVtIGlzIG5vdCByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtMi5pc0Fzc2lnbm1lbnROb3RlQWxsb3dlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2F5IGFzc2lnbm1lbnQgbm90ZSBpcyBub3QgYWxsb3dlZCB3aGVuIGl0ZW0gaXMgYSBwZXJtaXR0ZWQgYnkgcm9sZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXF1ZXN0ZWRJdGVtLnBlcm1pdHRlZEJ5SWQgPSA5OTk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmlzQXNzaWdubWVudE5vdGVBbGxvd2VkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Fzc2lnbm1lbnQgbm90ZSBzaG91bGQgbm90IGJlIGFsbG93ZWQgd2hlbiBpdGVtIGhhcyBwZXJtaXR0ZWQgZmxhZyBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0zLmlzQXNzaWdubWVudE5vdGVBbGxvd2VkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzYXkgaGFzIGNvbW1lbnRzIG9yIG5vdGVzIHdoZW4gdGhlcmUgaXMgYSBjb21tZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3RlZEl0ZW0uc2V0Q29tbWVudCgnYmxhaCBibGFoJyk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmhhc0NvbW1lbnRzT3JOb3RlcygpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzYXkgbm8gY29tbWVudHMgb3Igbm90ZXMgd2hlbiB0aGVyZSBpcyBub3QgYSBjb21tZW50IG9yIG5vdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uaGFzQ29tbWVudHNPck5vdGVzKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzYXkgaGFzIGNvbW1lbnRzIG9yIG5vdGVzIHdoZW4gdGhlcmUgaXMgYSBhc3NpZ25tZW50IG5vdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVxdWVzdGVkSXRlbS5zZXRBc3NpZ25tZW50Tm90ZSgnYmxhaCBibGFoJyk7XG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWRJdGVtLmhhc0NvbW1lbnRzT3JOb3RlcygpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc01pc3NpbmdBY2NvdW50U2VsZWN0aW9ucygpJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG1vY2sgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgZm9yXG4gICAgICAgICAqIGNhbGxzIHRvIGFsbFRhcmdldHNIYXZlU2VsZWN0aW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBoYXNTZWxlY3Rpb25zICBXaGV0aGVyIGFsbCBzZWxlY3Rpb25zIGFyZSBtYWRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbW9jayBJZGVudGl0eUFjY291bnRTZWxlY3Rpb24gd2l0aCBhbGxUYXJnZXRzSGF2ZVNlbGVjdGlvbnMoKVxuICAgICAgICAgKiAgICBzdHViYmVkIG91dC5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oaGFzU2VsZWN0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbGxUYXJnZXRzSGF2ZVNlbGVjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzU2VsZWN0aW9ucztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYWxsIGhhdmUgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50U2VsZWN0aW9uKHRydWUpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24odHJ1ZSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5oYXNNaXNzaW5nQWNjb3VudFNlbGVjdGlvbnMoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZmlyc3QgaXRlbSBkb2VzIG5vdCBoYXZlIGEgc2VsZWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW1xuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oZmFsc2UpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24odHJ1ZSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBleHBlY3QocmVxdWVzdGVkSXRlbS5oYXNNaXNzaW5nQWNjb3VudFNlbGVjdGlvbnMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBsYXN0IGl0ZW0gZG9lcyBub3QgaGF2ZSBhIHNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50U2VsZWN0aW9uKHRydWUpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oZmFsc2UpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uaGFzTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbm8gaXRlbXMgaGF2ZSBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW1xuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oZmFsc2UpLFxuICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oZmFsc2UpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uaGFzTWlzc2luZ0FjY291bnRTZWxlY3Rpb25zKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
