System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the PolicyViolation model object.
             */
            describe('PolicyViolation', function () {

                var roleData, entitlementData, roleViolationData, entitlementViolationData, violationReviewRoleData, violationReviewEntitlementData, violationRole, violationEntitlement, role, entitlement, RequestPolicyViolation, AccessRequestItem, ViolationReviewRequestedItem, roleViolation, entitlementViolation;

                // Use the access request module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PolicyViolation class and create some data to test with.
                 */
                beforeEach(inject(function (_RequestPolicyViolation_, _AccessRequestItem_, _ViolationReviewRequestedItem_, modelTestData) {
                    RequestPolicyViolation = _RequestPolicyViolation_;
                    AccessRequestItem = _AccessRequestItem_;
                    ViolationReviewRequestedItem = _ViolationReviewRequestedItem_;

                    roleData = modelTestData.POLICY_VIOLATION_ROLE;
                    entitlementData = modelTestData.POLICY_VIOLATION_ENTITLEMENT;
                    roleViolationData = modelTestData.ROLE_POLICY_VIOLATION_DATA;
                    entitlementViolationData = modelTestData.ENTITLEMENT_POLICY_VIOLATION_DATA;
                    violationReviewRoleData = modelTestData.VIOLATION_REVIEW_ROLE;
                    violationReviewEntitlementData = modelTestData.VIOLATION_REVIEW_ENTITLEMENT;

                    roleViolation = new RequestPolicyViolation(roleViolationData);
                    entitlementViolation = new RequestPolicyViolation(entitlementViolationData);
                    role = new AccessRequestItem(roleData);
                    entitlement = new AccessRequestItem(entitlementData);
                    violationRole = new ViolationReviewRequestedItem(violationReviewRoleData);
                    violationEntitlement = new ViolationReviewRequestedItem(violationReviewEntitlementData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new RequestPolicyViolation(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new RequestPolicyViolation('hi mom');
                    }).toThrow();
                    expect(function () {
                        new RequestPolicyViolation(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns policy name read from data', function () {
                    expect(roleViolation.getPolicyName()).toEqual(roleViolationData.policyName);
                });

                it('returns description read from data', function () {
                    expect(roleViolation.getDescription()).toEqual(roleViolationData.description);
                });

                it('returns rule name read from data', function () {
                    expect(roleViolation.getRuleName()).toEqual(roleViolationData.ruleName);
                });

                it('returns work item id read from data', function () {
                    expect(roleViolation.getWorkItemId()).toEqual(roleViolationData.workitemId);
                });

                it('returns role violation bundles and null entitlements read from data', function () {
                    expect(roleViolation.getLeftBundles()).toEqual(roleViolationData.leftBundles);
                    expect(roleViolation.getRightBundles()).toEqual(roleViolationData.rightBundles);
                    expect(roleViolation.getEntitlements()).toBeUndefined();
                });

                it('returns entitlement violations and null bundles read from data', function () {
                    expect(entitlementViolation.getLeftBundles()).toBeUndefined();
                    expect(entitlementViolation.getRightBundles()).toBeUndefined();
                    expect(entitlementViolation.getEntitlements()).toEqual(entitlementViolationData.entitlements);
                });

                it('role matches on role violation with AccessRequestItem', function () {
                    expect(roleViolation.isCausedBy(role)).toBeTruthy();
                });

                it('role matches on role violation with ViolationReviewRequestedItem', function () {
                    expect(roleViolation.isCausedBy(violationRole)).toBeTruthy();
                });

                it('role does not match on entitlement violation with AccessRequestItem', function () {
                    expect(entitlementViolation.isCausedBy(role)).toBeFalsy();
                });

                it('role does not match on entitlement violation with ViolationReviewRequestedItem', function () {
                    expect(entitlementViolation.isCausedBy(violationRole)).toBeFalsy();
                });

                it('entitlement matches on entitlement violation with AccessRequestItem', function () {
                    expect(entitlementViolation.isCausedBy(entitlement)).toBeTruthy();
                });

                it('entitlement matches on entitlement violation with ViolationReviewRequestedItem', function () {
                    expect(entitlementViolation.isCausedBy(violationEntitlement)).toBeTruthy();
                });

                it('entitlement does not match on role violation with AccessRequestItem', function () {
                    expect(roleViolation.isCausedBy(entitlement)).toBeFalsy();
                });

                it('entitlement does not match on role violation with ViolationReviewRequestedItem', function () {
                    expect(roleViolation.isCausedBy(violationEntitlement)).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9SZXF1ZXN0UG9saWN5VmlvbGF0aW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixvQkFBb0IsVUFBVSxTQUFTO0lBQzNHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7V0FDdkMsVUFBVSxnQkFBZ0I7UUFDN0IsU0FBUyxZQUFZOzs7OztZQUQ3QixTQUFTLG1CQUFtQixZQUFXOztnQkFFbkMsSUFBSSxVQUFVLGlCQUFpQixtQkFBbUIsMEJBQzlDLHlCQUF5QixnQ0FDekIsZUFDQSxzQkFDQSxNQUNBLGFBQ0Esd0JBQ0EsbUJBQ0EsOEJBQ0EsZUFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLDBCQUEwQixxQkFBcUIsZ0NBQy9DLGVBQWU7b0JBQ3RDLHlCQUF5QjtvQkFDekIsb0JBQW9CO29CQUNwQiwrQkFBK0I7O29CQUUvQixXQUFXLGNBQWM7b0JBQ3pCLGtCQUFrQixjQUFjO29CQUNoQyxvQkFBb0IsY0FBYztvQkFDbEMsMkJBQTJCLGNBQWM7b0JBQ3pDLDBCQUEwQixjQUFjO29CQUN4QyxpQ0FBaUMsY0FBYzs7b0JBRS9DLGdCQUFnQixJQUFJLHVCQUF1QjtvQkFDM0MsdUJBQXVCLElBQUksdUJBQXVCO29CQUNsRCxPQUFPLElBQUksa0JBQWtCO29CQUM3QixjQUFjLElBQUksa0JBQWtCO29CQUNwQyxnQkFBZ0IsSUFBSSw2QkFBNkI7b0JBQ2pELHVCQUF1QixJQUFJLDZCQUE2Qjs7O2dCQUc1RCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSx1QkFBdUI7dUJBQVU7OztnQkFHN0QsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksdUJBQXVCO3VCQUFjO29CQUM3RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSx1QkFBdUIsWUFBVzs0QkFBRSxPQUFPOzt1QkFBb0I7OztnQkFHM0YsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxjQUFjLGlCQUFpQixRQUFRLGtCQUFrQjs7O2dCQUdwRSxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLGNBQWMsa0JBQWtCLFFBQVEsa0JBQWtCOzs7Z0JBR3JFLEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLE9BQU8sY0FBYyxlQUFlLFFBQVEsa0JBQWtCOzs7Z0JBR2xFLEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELE9BQU8sY0FBYyxpQkFBaUIsUUFBUSxrQkFBa0I7OztnQkFHcEUsR0FBRyx1RUFBdUUsWUFBVztvQkFDakYsT0FBTyxjQUFjLGtCQUFrQixRQUFRLGtCQUFrQjtvQkFDakUsT0FBTyxjQUFjLG1CQUFtQixRQUFRLGtCQUFrQjtvQkFDbEUsT0FBTyxjQUFjLG1CQUFtQjs7O2dCQUc1QyxHQUFHLGtFQUFrRSxZQUFXO29CQUM1RSxPQUFPLHFCQUFxQixrQkFBa0I7b0JBQzlDLE9BQU8scUJBQXFCLG1CQUFtQjtvQkFDL0MsT0FBTyxxQkFBcUIsbUJBQW1CLFFBQVEseUJBQXlCOzs7Z0JBR3BGLEdBQUcseURBQXlELFlBQVc7b0JBQ25FLE9BQU8sY0FBYyxXQUFXLE9BQU87OztnQkFHM0MsR0FBRyxvRUFBb0UsWUFBVztvQkFDOUUsT0FBTyxjQUFjLFdBQVcsZ0JBQWdCOzs7Z0JBR3BELEdBQUcsdUVBQXVFLFlBQVc7b0JBQ2pGLE9BQU8scUJBQXFCLFdBQVcsT0FBTzs7O2dCQUdsRCxHQUFHLGtGQUFrRixZQUFXO29CQUM1RixPQUFPLHFCQUFxQixXQUFXLGdCQUFnQjs7O2dCQUczRCxHQUFHLHVFQUF1RSxZQUFXO29CQUNqRixPQUFPLHFCQUFxQixXQUFXLGNBQWM7OztnQkFHekQsR0FBRyxrRkFBa0YsWUFBVztvQkFDNUYsT0FBTyxxQkFBcUIsV0FBVyx1QkFBdUI7OztnQkFHbEUsR0FBRyx1RUFBdUUsWUFBVztvQkFDakYsT0FBTyxjQUFjLFdBQVcsY0FBYzs7O2dCQUdsRCxHQUFHLGtGQUFrRixZQUFXO29CQUM1RixPQUFPLGNBQWMsV0FBVyx1QkFBdUI7Ozs7O0dBUTVEIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9SZXF1ZXN0UG9saWN5VmlvbGF0aW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XHJcbmltcG9ydCAnLi9Nb2RlbFRlc3REYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIFBvbGljeVZpb2xhdGlvbiBtb2RlbCBvYmplY3QuXHJcbiAqL1xyXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHJvbGVEYXRhLCBlbnRpdGxlbWVudERhdGEsIHJvbGVWaW9sYXRpb25EYXRhLCBlbnRpdGxlbWVudFZpb2xhdGlvbkRhdGEsXHJcbiAgICAgICAgdmlvbGF0aW9uUmV2aWV3Um9sZURhdGEsIHZpb2xhdGlvblJldmlld0VudGl0bGVtZW50RGF0YSxcclxuICAgICAgICB2aW9sYXRpb25Sb2xlLFxyXG4gICAgICAgIHZpb2xhdGlvbkVudGl0bGVtZW50LFxyXG4gICAgICAgIHJvbGUsXHJcbiAgICAgICAgZW50aXRsZW1lbnQsXHJcbiAgICAgICAgUmVxdWVzdFBvbGljeVZpb2xhdGlvbixcclxuICAgICAgICBBY2Nlc3NSZXF1ZXN0SXRlbSxcclxuICAgICAgICBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtLFxyXG4gICAgICAgIHJvbGVWaW9sYXRpb24sXHJcbiAgICAgICAgZW50aXRsZW1lbnRWaW9sYXRpb247XHJcblxyXG4gICAgLy8gVXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIFBvbGljeVZpb2xhdGlvbiBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9SZXF1ZXN0UG9saWN5VmlvbGF0aW9uXywgX0FjY2Vzc1JlcXVlc3RJdGVtXywgX1Zpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW1fLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxUZXN0RGF0YSkge1xyXG4gICAgICAgIFJlcXVlc3RQb2xpY3lWaW9sYXRpb24gPSBfUmVxdWVzdFBvbGljeVZpb2xhdGlvbl87XHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdEl0ZW0gPSBfQWNjZXNzUmVxdWVzdEl0ZW1fO1xyXG4gICAgICAgIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0gPSBfVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbV87XHJcblxyXG4gICAgICAgIHJvbGVEYXRhID0gbW9kZWxUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX1JPTEU7XHJcbiAgICAgICAgZW50aXRsZW1lbnREYXRhID0gbW9kZWxUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX0VOVElUTEVNRU5UO1xyXG4gICAgICAgIHJvbGVWaW9sYXRpb25EYXRhID0gbW9kZWxUZXN0RGF0YS5ST0xFX1BPTElDWV9WSU9MQVRJT05fREFUQTtcclxuICAgICAgICBlbnRpdGxlbWVudFZpb2xhdGlvbkRhdGEgPSBtb2RlbFRlc3REYXRhLkVOVElUTEVNRU5UX1BPTElDWV9WSU9MQVRJT05fREFUQTtcclxuICAgICAgICB2aW9sYXRpb25SZXZpZXdSb2xlRGF0YSA9IG1vZGVsVGVzdERhdGEuVklPTEFUSU9OX1JFVklFV19ST0xFO1xyXG4gICAgICAgIHZpb2xhdGlvblJldmlld0VudGl0bGVtZW50RGF0YSA9IG1vZGVsVGVzdERhdGEuVklPTEFUSU9OX1JFVklFV19FTlRJVExFTUVOVDtcclxuXHJcbiAgICAgICAgcm9sZVZpb2xhdGlvbiA9IG5ldyBSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKHJvbGVWaW9sYXRpb25EYXRhKTtcclxuICAgICAgICBlbnRpdGxlbWVudFZpb2xhdGlvbiA9IG5ldyBSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKGVudGl0bGVtZW50VmlvbGF0aW9uRGF0YSk7XHJcbiAgICAgICAgcm9sZSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShyb2xlRGF0YSk7XHJcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oZW50aXRsZW1lbnREYXRhKTtcclxuICAgICAgICB2aW9sYXRpb25Sb2xlID0gbmV3IFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0odmlvbGF0aW9uUmV2aWV3Um9sZURhdGEpO1xyXG4gICAgICAgIHZpb2xhdGlvbkVudGl0bGVtZW50ID0gbmV3IFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0odmlvbGF0aW9uUmV2aWV3RW50aXRsZW1lbnREYXRhKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKG51bGwpOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFJlcXVlc3RQb2xpY3lWaW9sYXRpb24oJ2hpIG1vbScpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUmVxdWVzdFBvbGljeVZpb2xhdGlvbihmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgcG9saWN5IG5hbWUgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZVZpb2xhdGlvbi5nZXRQb2xpY3lOYW1lKCkpLnRvRXF1YWwocm9sZVZpb2xhdGlvbkRhdGEucG9saWN5TmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBkZXNjcmlwdGlvbiByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlVmlvbGF0aW9uLmdldERlc2NyaXB0aW9uKCkpLnRvRXF1YWwocm9sZVZpb2xhdGlvbkRhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgcnVsZSBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGVWaW9sYXRpb24uZ2V0UnVsZU5hbWUoKSkudG9FcXVhbChyb2xlVmlvbGF0aW9uRGF0YS5ydWxlTmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB3b3JrIGl0ZW0gaWQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZVZpb2xhdGlvbi5nZXRXb3JrSXRlbUlkKCkpLnRvRXF1YWwocm9sZVZpb2xhdGlvbkRhdGEud29ya2l0ZW1JZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyByb2xlIHZpb2xhdGlvbiBidW5kbGVzIGFuZCBudWxsIGVudGl0bGVtZW50cyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChyb2xlVmlvbGF0aW9uLmdldExlZnRCdW5kbGVzKCkpLnRvRXF1YWwocm9sZVZpb2xhdGlvbkRhdGEubGVmdEJ1bmRsZXMpO1xyXG4gICAgICAgIGV4cGVjdChyb2xlVmlvbGF0aW9uLmdldFJpZ2h0QnVuZGxlcygpKS50b0VxdWFsKHJvbGVWaW9sYXRpb25EYXRhLnJpZ2h0QnVuZGxlcyk7XHJcbiAgICAgICAgZXhwZWN0KHJvbGVWaW9sYXRpb24uZ2V0RW50aXRsZW1lbnRzKCkpLnRvQmVVbmRlZmluZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGVudGl0bGVtZW50IHZpb2xhdGlvbnMgYW5kIG51bGwgYnVuZGxlcyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudFZpb2xhdGlvbi5nZXRMZWZ0QnVuZGxlcygpKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50VmlvbGF0aW9uLmdldFJpZ2h0QnVuZGxlcygpKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50VmlvbGF0aW9uLmdldEVudGl0bGVtZW50cygpKS50b0VxdWFsKGVudGl0bGVtZW50VmlvbGF0aW9uRGF0YS5lbnRpdGxlbWVudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JvbGUgbWF0Y2hlcyBvbiByb2xlIHZpb2xhdGlvbiB3aXRoIEFjY2Vzc1JlcXVlc3RJdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGVWaW9sYXRpb24uaXNDYXVzZWRCeShyb2xlKSkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JvbGUgbWF0Y2hlcyBvbiByb2xlIHZpb2xhdGlvbiB3aXRoIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZVZpb2xhdGlvbi5pc0NhdXNlZEJ5KHZpb2xhdGlvblJvbGUpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncm9sZSBkb2VzIG5vdCBtYXRjaCBvbiBlbnRpdGxlbWVudCB2aW9sYXRpb24gd2l0aCBBY2Nlc3NSZXF1ZXN0SXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudFZpb2xhdGlvbi5pc0NhdXNlZEJ5KHJvbGUpKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyb2xlIGRvZXMgbm90IG1hdGNoIG9uIGVudGl0bGVtZW50IHZpb2xhdGlvbiB3aXRoIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnRWaW9sYXRpb24uaXNDYXVzZWRCeSh2aW9sYXRpb25Sb2xlKSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZW50aXRsZW1lbnQgbWF0Y2hlcyBvbiBlbnRpdGxlbWVudCB2aW9sYXRpb24gd2l0aCBBY2Nlc3NSZXF1ZXN0SXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudFZpb2xhdGlvbi5pc0NhdXNlZEJ5KGVudGl0bGVtZW50KSkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2VudGl0bGVtZW50IG1hdGNoZXMgb24gZW50aXRsZW1lbnQgdmlvbGF0aW9uIHdpdGggVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudFZpb2xhdGlvbi5pc0NhdXNlZEJ5KHZpb2xhdGlvbkVudGl0bGVtZW50KSkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2VudGl0bGVtZW50IGRvZXMgbm90IG1hdGNoIG9uIHJvbGUgdmlvbGF0aW9uIHdpdGggQWNjZXNzUmVxdWVzdEl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3Qocm9sZVZpb2xhdGlvbi5pc0NhdXNlZEJ5KGVudGl0bGVtZW50KSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZW50aXRsZW1lbnQgZG9lcyBub3QgbWF0Y2ggb24gcm9sZSB2aW9sYXRpb24gd2l0aCBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KHJvbGVWaW9sYXRpb24uaXNDYXVzZWRCeSh2aW9sYXRpb25FbnRpdGxlbWVudCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
