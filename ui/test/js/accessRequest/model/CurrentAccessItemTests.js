System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the CurrentAccessItem model object.
             */
            describe('CurrentAccessItem', function () {
                var roleData, entitlementData, CurrentAccessItem, role, entitlement, AccessRequestRoleTarget;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the CurrentAccessItem class and create some data to test with.
                 */
                beforeEach(inject(function (_CurrentAccessItem_, _AccessRequestRoleTarget_, accessRequestTestData) {
                    CurrentAccessItem = _CurrentAccessItem_;
                    AccessRequestRoleTarget = _AccessRequestRoleTarget_;

                    roleData = accessRequestTestData.CURRENT_ACCESS_ROLE;
                    entitlementData = accessRequestTestData.CURRENT_ACCESS_ENTITLEMENT;

                    role = new CurrentAccessItem(roleData);
                    entitlement = new CurrentAccessItem(entitlementData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new CurrentAccessItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new CurrentAccessItem('whatever');
                    }).toThrow();
                });

                it('extends AccessRequestItem', function () {
                    // pick some AccessRequestItem methods and see if they exist
                    expect(CurrentAccessItem.prototype.isRole).toBeDefined();
                    expect(CurrentAccessItem.prototype.isEntitlement).toBeDefined();
                });

                it('returns status from data', function () {
                    expect(role.getStatus()).toEqual(roleData.status);
                    expect(entitlement.getStatus()).toEqual(entitlementData.status);
                });

                it('returns correct value for isActive', function () {
                    expect(role.isActive()).toEqual(false);
                    expect(entitlement.isActive()).toEqual(true);
                });

                it('returns correct value for isRequested', function () {
                    expect(role.isRequested()).toEqual(true);
                    expect(entitlement.isRequested()).toEqual(false);
                });

                it('returns statusLabel from data', function () {
                    expect(role.getStatusLabel()).toEqual(roleData.statusLabel);
                    expect(entitlement.getStatusLabel()).toEqual(entitlementData.statusLabel);
                });

                it('returns sunrise from data', function () {
                    expect(role.getSunrise()).toEqual(new Date(roleData.sunrise));
                    expect(entitlement.getSunrise()).not.toBeDefined();
                });

                it('returns sunset from data', function () {
                    expect(role.getSunset()).toEqual(new Date(roleData.sunset));
                    expect(entitlement.getSunset()).not.toBeDefined();
                });

                it('return nativeIdentity from data', function () {
                    expect(entitlement.getNativeIdentity()).toEqual(entitlementData.nativeIdentity);
                });

                it('return accountName from data', function () {
                    expect(entitlement.getAccountName()).toEqual(entitlementData.accountName);
                });

                it('return instance from data', function () {
                    expect(entitlement.getInstance()).toEqual(entitlementData.instance);
                });

                it('returns value from data', function () {
                    expect(entitlement.getValue()).toEqual(entitlementData.value);
                });

                it('return assignment id from data', function () {
                    expect(role.getAssignmentId()).toEqual(roleData.assignmentId);
                });

                it('return role targets from data', function () {
                    expect(role.getRoleTargets()).toBeDefined();
                    expect(role.getRoleTargets().length).toEqual(1);
                    expect(role.getRoleTargets()[0]).toEqual(new AccessRequestRoleTarget(roleData.roleTargets[0]));
                });

                it('return role location from data', function () {
                    expect(role.getRoleLocation()).toEqual(roleData.roleLocation);
                });

                it('should return true if role location is assigned', function () {
                    role.roleLocation = 'assigned';
                    expect(role.isAssigned()).toBeTruthy();
                });

                it('should return false if role location is not assigned', function () {
                    role.roleLocation = 'detected';
                    expect(role.isAssigned()).toBeFalsy();
                });

                it('should return true if role location is detected', function () {
                    role.roleLocation = 'detected';
                    expect(role.isDetected()).toBeTruthy();
                });

                it('should return false if role location is not detected', function () {
                    role.roleLocation = 'assigned';
                    expect(role.isDetected()).toBeFalsy();
                });

                it('returns a unique with getUniqueId()', function () {
                    var entitlementDataNoId = angular.copy(entitlementData),
                        entitlementNoId;
                    entitlementDataNoId.id = undefined;
                    entitlementNoId = new CurrentAccessItem(entitlementDataNoId);

                    expect(role.getUniqueId()).toEqual(role.getId() + role.getAssignmentId());
                    expect(entitlement.getUniqueId()).toEqual(entitlement.getId() + entitlement.getNativeIdentity() + entitlement.getInstance());
                    expect(entitlementNoId.getUniqueId()).toEqual(entitlementNoId.getApplication() + entitlementNoId.getAttribute() + entitlementNoId.getValue() + entitlementNoId.getNativeIdentity() + entitlementNoId.getInstance());
                });

                it('return removable from data', function () {
                    expect(role.isRemovable()).toEqual(roleData.removable);
                    expect(entitlement.isRemovable()).toEqual(entitlementData.removable);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvQ3VycmVudEFjY2Vzc0l0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7SUFDN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxxQkFBcUIsWUFBVztnQkFDckMsSUFBSSxVQUFVLGlCQUFpQixtQkFBbUIsTUFBTSxhQUFhOzs7Z0JBR3JFLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLHFCQUFxQiwyQkFBMkIsdUJBQXVCO29CQUM5RixvQkFBb0I7b0JBQ3BCLDBCQUEwQjs7b0JBRTFCLFdBQVcsc0JBQXNCO29CQUNqQyxrQkFBa0Isc0JBQXNCOztvQkFFeEMsT0FBTyxJQUFJLGtCQUFrQjtvQkFDN0IsY0FBYyxJQUFJLGtCQUFrQjs7O2dCQUd4QyxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxrQkFBa0I7dUJBQVU7OztnQkFHeEQsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksa0JBQWtCO3VCQUFnQjs7O2dCQUc5RCxHQUFHLDZCQUE2QixZQUFXOztvQkFFdkMsT0FBTyxrQkFBa0IsVUFBVSxRQUFRO29CQUMzQyxPQUFPLGtCQUFrQixVQUFVLGVBQWU7OztnQkFHdEQsR0FBRyw0QkFBNEIsWUFBVztvQkFDdEMsT0FBTyxLQUFLLGFBQWEsUUFBUSxTQUFTO29CQUMxQyxPQUFPLFlBQVksYUFBYSxRQUFRLGdCQUFnQjs7O2dCQUc1RCxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLEtBQUssWUFBWSxRQUFRO29CQUNoQyxPQUFPLFlBQVksWUFBWSxRQUFROzs7Z0JBRzNDLEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sS0FBSyxlQUFlLFFBQVE7b0JBQ25DLE9BQU8sWUFBWSxlQUFlLFFBQVE7OztnQkFHOUMsR0FBRyxpQ0FBaUMsWUFBVztvQkFDM0MsT0FBTyxLQUFLLGtCQUFrQixRQUFRLFNBQVM7b0JBQy9DLE9BQU8sWUFBWSxrQkFBa0IsUUFBUSxnQkFBZ0I7OztnQkFHakUsR0FBRyw2QkFBNkIsWUFBVztvQkFDdkMsT0FBTyxLQUFLLGNBQWMsUUFBUSxJQUFJLEtBQUssU0FBUztvQkFDcEQsT0FBTyxZQUFZLGNBQWMsSUFBSTs7O2dCQUd6QyxHQUFHLDRCQUE0QixZQUFXO29CQUN0QyxPQUFPLEtBQUssYUFBYSxRQUFRLElBQUksS0FBSyxTQUFTO29CQUNuRCxPQUFPLFlBQVksYUFBYSxJQUFJOzs7Z0JBR3hDLEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sWUFBWSxxQkFBcUIsUUFBUSxnQkFBZ0I7OztnQkFHcEUsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsT0FBTyxZQUFZLGtCQUFrQixRQUFRLGdCQUFnQjs7O2dCQUdqRSxHQUFHLDZCQUE2QixZQUFXO29CQUN2QyxPQUFPLFlBQVksZUFBZSxRQUFRLGdCQUFnQjs7O2dCQUc5RCxHQUFHLDJCQUEyQixZQUFXO29CQUNyQyxPQUFPLFlBQVksWUFBWSxRQUFRLGdCQUFnQjs7O2dCQUczRCxHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxPQUFPLEtBQUssbUJBQW1CLFFBQVEsU0FBUzs7O2dCQUdwRCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxPQUFPLEtBQUssa0JBQWtCO29CQUM5QixPQUFPLEtBQUssaUJBQWlCLFFBQVEsUUFBUTtvQkFDN0MsT0FBTyxLQUFLLGlCQUFpQixJQUFJLFFBQzdCLElBQUksd0JBQXdCLFNBQVMsWUFBWTs7O2dCQUd6RCxHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxPQUFPLEtBQUssbUJBQW1CLFFBQVEsU0FBUzs7O2dCQUdwRCxHQUFHLG1EQUFtRCxZQUFXO29CQUM3RCxLQUFLLGVBQWU7b0JBQ3BCLE9BQU8sS0FBSyxjQUFjOzs7Z0JBRzlCLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLEtBQUssZUFBZTtvQkFDcEIsT0FBTyxLQUFLLGNBQWM7OztnQkFHOUIsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsS0FBSyxlQUFlO29CQUNwQixPQUFPLEtBQUssY0FBYzs7O2dCQUc5QixHQUFHLHdEQUF3RCxZQUFXO29CQUNsRSxLQUFLLGVBQWU7b0JBQ3BCLE9BQU8sS0FBSyxjQUFjOzs7Z0JBRzlCLEdBQUcsdUNBQXVDLFlBQVc7b0JBQ2pELElBQUksc0JBQXNCLFFBQVEsS0FBSzt3QkFDbkM7b0JBQ0osb0JBQW9CLEtBQUs7b0JBQ3pCLGtCQUFrQixJQUFJLGtCQUFrQjs7b0JBRXhDLE9BQU8sS0FBSyxlQUFlLFFBQ3ZCLEtBQUssVUFBVSxLQUFLO29CQUN4QixPQUFPLFlBQVksZUFBZSxRQUM5QixZQUFZLFVBQVUsWUFBWSxzQkFBc0IsWUFBWTtvQkFDeEUsT0FBTyxnQkFBZ0IsZUFBZSxRQUNsQyxnQkFBZ0IsbUJBQW1CLGdCQUFnQixpQkFDL0MsZ0JBQWdCLGFBQWEsZ0JBQWdCLHNCQUM3QyxnQkFBZ0I7OztnQkFHNUIsR0FBRyw4QkFBOEIsWUFBVztvQkFDeEMsT0FBTyxLQUFLLGVBQWUsUUFBUSxTQUFTO29CQUM1QyxPQUFPLFlBQVksZUFBZSxRQUFRLGdCQUFnQjs7Ozs7R0FTL0QiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9tb2RlbC9DdXJyZW50QWNjZXNzSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuaW1wb3J0ICcuLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgQ3VycmVudEFjY2Vzc0l0ZW0gbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnQ3VycmVudEFjY2Vzc0l0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgcm9sZURhdGEsIGVudGl0bGVtZW50RGF0YSwgQ3VycmVudEFjY2Vzc0l0ZW0sIHJvbGUsIGVudGl0bGVtZW50LCBBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldDtcblxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBDdXJyZW50QWNjZXNzSXRlbSBjbGFzcyBhbmQgY3JlYXRlIHNvbWUgZGF0YSB0byB0ZXN0IHdpdGguXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0N1cnJlbnRBY2Nlc3NJdGVtXywgX0FjY2Vzc1JlcXVlc3RSb2xlVGFyZ2V0XywgYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XG4gICAgICAgIEN1cnJlbnRBY2Nlc3NJdGVtID0gX0N1cnJlbnRBY2Nlc3NJdGVtXztcbiAgICAgICAgQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXQgPSBfQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXRfO1xuXG4gICAgICAgIHJvbGVEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkNVUlJFTlRfQUNDRVNTX1JPTEU7XG4gICAgICAgIGVudGl0bGVtZW50RGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5DVVJSRU5UX0FDQ0VTU19FTlRJVExFTUVOVDtcblxuICAgICAgICByb2xlID0gbmV3IEN1cnJlbnRBY2Nlc3NJdGVtKHJvbGVEYXRhKTtcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgQ3VycmVudEFjY2Vzc0l0ZW0oZW50aXRsZW1lbnREYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgQ3VycmVudEFjY2Vzc0l0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEN1cnJlbnRBY2Nlc3NJdGVtKCd3aGF0ZXZlcicpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXh0ZW5kcyBBY2Nlc3NSZXF1ZXN0SXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBwaWNrIHNvbWUgQWNjZXNzUmVxdWVzdEl0ZW0gbWV0aG9kcyBhbmQgc2VlIGlmIHRoZXkgZXhpc3RcbiAgICAgICAgZXhwZWN0KEN1cnJlbnRBY2Nlc3NJdGVtLnByb3RvdHlwZS5pc1JvbGUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChDdXJyZW50QWNjZXNzSXRlbS5wcm90b3R5cGUuaXNFbnRpdGxlbWVudCkudG9CZURlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHN0YXR1cyBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0U3RhdHVzKCkpLnRvRXF1YWwocm9sZURhdGEuc3RhdHVzKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldFN0YXR1cygpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5zdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgY29ycmVjdCB2YWx1ZSBmb3IgaXNBY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuaXNBY3RpdmUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5pc0FjdGl2ZSgpKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgY29ycmVjdCB2YWx1ZSBmb3IgaXNSZXF1ZXN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuaXNSZXF1ZXN0ZWQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmlzUmVxdWVzdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgc3RhdHVzTGFiZWwgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlLmdldFN0YXR1c0xhYmVsKCkpLnRvRXF1YWwocm9sZURhdGEuc3RhdHVzTGFiZWwpO1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0U3RhdHVzTGFiZWwoKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuc3RhdHVzTGFiZWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgc3VucmlzZSBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0U3VucmlzZSgpKS50b0VxdWFsKG5ldyBEYXRlKHJvbGVEYXRhLnN1bnJpc2UpKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldFN1bnJpc2UoKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBzdW5zZXQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlLmdldFN1bnNldCgpKS50b0VxdWFsKG5ldyBEYXRlKHJvbGVEYXRhLnN1bnNldCkpO1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0U3Vuc2V0KCkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybiBuYXRpdmVJZGVudGl0eSBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldE5hdGl2ZUlkZW50aXR5KCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLm5hdGl2ZUlkZW50aXR5KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm4gYWNjb3VudE5hbWUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRBY2NvdW50TmFtZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS5hY2NvdW50TmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJuIGluc3RhbmNlIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0SW5zdGFuY2UoKSkudG9FcXVhbChlbnRpdGxlbWVudERhdGEuaW5zdGFuY2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdmFsdWUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRWYWx1ZSgpKS50b0VxdWFsKGVudGl0bGVtZW50RGF0YS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJuIGFzc2lnbm1lbnQgaWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlLmdldEFzc2lnbm1lbnRJZCgpKS50b0VxdWFsKHJvbGVEYXRhLmFzc2lnbm1lbnRJZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJuIHJvbGUgdGFyZ2V0cyBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0Um9sZVRhcmdldHMoKSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0Um9sZVRhcmdldHMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyb2xlLmdldFJvbGVUYXJnZXRzKClbMF0pLnRvRXF1YWwoXG4gICAgICAgICAgICBuZXcgQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXQocm9sZURhdGEucm9sZVRhcmdldHNbMF0pKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm4gcm9sZSBsb2NhdGlvbiBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0Um9sZUxvY2F0aW9uKCkpLnRvRXF1YWwocm9sZURhdGEucm9sZUxvY2F0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgcm9sZSBsb2NhdGlvbiBpcyBhc3NpZ25lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByb2xlLnJvbGVMb2NhdGlvbiA9ICdhc3NpZ25lZCc7XG4gICAgICAgIGV4cGVjdChyb2xlLmlzQXNzaWduZWQoKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgcm9sZSBsb2NhdGlvbiBpcyBub3QgYXNzaWduZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcm9sZS5yb2xlTG9jYXRpb24gPSAnZGV0ZWN0ZWQnO1xuICAgICAgICBleHBlY3Qocm9sZS5pc0Fzc2lnbmVkKCkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiByb2xlIGxvY2F0aW9uIGlzIGRldGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJvbGUucm9sZUxvY2F0aW9uID0gJ2RldGVjdGVkJztcbiAgICAgICAgZXhwZWN0KHJvbGUuaXNEZXRlY3RlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiByb2xlIGxvY2F0aW9uIGlzIG5vdCBkZXRlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByb2xlLnJvbGVMb2NhdGlvbiA9ICdhc3NpZ25lZCc7XG4gICAgICAgIGV4cGVjdChyb2xlLmlzRGV0ZWN0ZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHVuaXF1ZSB3aXRoIGdldFVuaXF1ZUlkKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVudGl0bGVtZW50RGF0YU5vSWQgPSBhbmd1bGFyLmNvcHkoZW50aXRsZW1lbnREYXRhKSxcbiAgICAgICAgICAgIGVudGl0bGVtZW50Tm9JZDtcbiAgICAgICAgZW50aXRsZW1lbnREYXRhTm9JZC5pZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZW50aXRsZW1lbnROb0lkID0gbmV3IEN1cnJlbnRBY2Nlc3NJdGVtKGVudGl0bGVtZW50RGF0YU5vSWQpO1xuXG4gICAgICAgIGV4cGVjdChyb2xlLmdldFVuaXF1ZUlkKCkpLnRvRXF1YWwoXG4gICAgICAgICAgICByb2xlLmdldElkKCkgKyByb2xlLmdldEFzc2lnbm1lbnRJZCgpKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldFVuaXF1ZUlkKCkpLnRvRXF1YWwoXG4gICAgICAgICAgICBlbnRpdGxlbWVudC5nZXRJZCgpICsgZW50aXRsZW1lbnQuZ2V0TmF0aXZlSWRlbnRpdHkoKSArIGVudGl0bGVtZW50LmdldEluc3RhbmNlKCkpO1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnROb0lkLmdldFVuaXF1ZUlkKCkpLnRvRXF1YWwoXG4gICAgICAgICAgICBlbnRpdGxlbWVudE5vSWQuZ2V0QXBwbGljYXRpb24oKSArIGVudGl0bGVtZW50Tm9JZC5nZXRBdHRyaWJ1dGUoKSArXG4gICAgICAgICAgICAgICAgZW50aXRsZW1lbnROb0lkLmdldFZhbHVlKCkgKyBlbnRpdGxlbWVudE5vSWQuZ2V0TmF0aXZlSWRlbnRpdHkoKSArXG4gICAgICAgICAgICAgICAgZW50aXRsZW1lbnROb0lkLmdldEluc3RhbmNlKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybiByZW1vdmFibGUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlLmlzUmVtb3ZhYmxlKCkpLnRvRXF1YWwocm9sZURhdGEucmVtb3ZhYmxlKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmlzUmVtb3ZhYmxlKCkpLnRvRXF1YWwoZW50aXRsZW1lbnREYXRhLnJlbW92YWJsZSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
