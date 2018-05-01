System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', '../AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestRoleTarget model object.
             */
            describe('AccessRequestRoleTarget', function () {
                var roleTargetData, AccessRequestRoleTarget, roleTarget;

                // Use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Setup the AccessRequestRoleTarget class and create some data to test with.
                 */
                beforeEach(inject(function (_AccessRequestRoleTarget_, accessRequestTestData) {
                    AccessRequestRoleTarget = _AccessRequestRoleTarget_;
                    roleTargetData = accessRequestTestData.ROLE_TARGET1;
                    roleTarget = new AccessRequestRoleTarget(roleTargetData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new AccessRequestRoleTarget(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new AccessRequestRoleTarget('whatever');
                    }).toThrow();
                });

                it('returns role name from data', function () {
                    expect(roleTarget.getRole()).toEqual(roleTargetData.role);
                });

                it('returns application name from data', function () {
                    expect(roleTarget.getApplication()).toEqual(roleTargetData.application);
                });

                it('returns instance from data', function () {
                    expect(roleTarget.getInstance()).toEqual(roleTargetData.instance);
                });

                it('returns native identity from data', function () {
                    expect(roleTarget.getNativeIdentity()).toEqual(roleTargetData.nativeIdentity);
                });

                it('returns account name from data', function () {
                    expect(roleTarget.getAccountName()).toEqual(roleTargetData.accountName);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvbW9kZWwvQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7SUFDN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUywyQkFBMkIsWUFBVztnQkFDM0MsSUFBSSxnQkFDQSx5QkFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLDJCQUEyQix1QkFBdUI7b0JBQ3pFLDBCQUEwQjtvQkFDMUIsaUJBQWlCLHNCQUFzQjtvQkFDdkMsYUFBYSxJQUFJLHdCQUF3Qjs7O2dCQUc3QyxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSx3QkFBd0I7dUJBQVU7OztnQkFHOUQsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksd0JBQXdCO3VCQUFnQjs7O2dCQUdwRSxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLFdBQVcsV0FBVyxRQUFRLGVBQWU7OztnQkFHeEQsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxXQUFXLGtCQUFrQixRQUFRLGVBQWU7OztnQkFHL0QsR0FBRyw4QkFBOEIsWUFBVztvQkFDeEMsT0FBTyxXQUFXLGVBQWUsUUFBUSxlQUFlOzs7Z0JBRzVELEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLE9BQU8sV0FBVyxxQkFBcUIsUUFBUSxlQUFlOzs7Z0JBR2xFLEdBQUcsa0NBQWtDLFlBQVc7b0JBQzVDLE9BQU8sV0FBVyxrQkFBa0IsUUFBUSxlQUFlOzs7OztHQWFoRSIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L21vZGVsL0FjY2Vzc1JlcXVlc3RSb2xlVGFyZ2V0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5pbXBvcnQgJy4uL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldCBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciByb2xlVGFyZ2V0RGF0YSxcbiAgICAgICAgQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXQsXG4gICAgICAgIHJvbGVUYXJnZXQ7XG5cbiAgICAvLyBVc2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2Nlc3NSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgQWNjZXNzUmVxdWVzdFJvbGVUYXJnZXQgY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldF8sIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xuICAgICAgICBBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldCA9IF9BY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldF87XG4gICAgICAgIHJvbGVUYXJnZXREYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLlJPTEVfVEFSR0VUMTtcbiAgICAgICAgcm9sZVRhcmdldCA9IG5ldyBBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldChyb2xlVGFyZ2V0RGF0YSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3JlcXVpcmVzIG5vbi1udWxsIGRhdGEgaW4gdGhlIGNvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEFjY2Vzc1JlcXVlc3RSb2xlVGFyZ2V0KG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBBY2Nlc3NSZXF1ZXN0Um9sZVRhcmdldCgnd2hhdGV2ZXInKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgcm9sZSBuYW1lIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qocm9sZVRhcmdldC5nZXRSb2xlKCkpLnRvRXF1YWwocm9sZVRhcmdldERhdGEucm9sZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhcHBsaWNhdGlvbiBuYW1lIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qocm9sZVRhcmdldC5nZXRBcHBsaWNhdGlvbigpKS50b0VxdWFsKHJvbGVUYXJnZXREYXRhLmFwcGxpY2F0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGluc3RhbmNlIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qocm9sZVRhcmdldC5nZXRJbnN0YW5jZSgpKS50b0VxdWFsKHJvbGVUYXJnZXREYXRhLmluc3RhbmNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG5hdGl2ZSBpZGVudGl0eSBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJvbGVUYXJnZXQuZ2V0TmF0aXZlSWRlbnRpdHkoKSkudG9FcXVhbChyb2xlVGFyZ2V0RGF0YS5uYXRpdmVJZGVudGl0eSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhY2NvdW50IG5hbWUgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyb2xlVGFyZ2V0LmdldEFjY291bnROYW1lKCkpLnRvRXF1YWwocm9sZVRhcmdldERhdGEuYWNjb3VudE5hbWUpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
