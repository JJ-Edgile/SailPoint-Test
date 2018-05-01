System.register(['test/js/TestInitializer', 'common/identity/role/IdentityRoleModule', 'test/js/common/identity/role/RoleDetailTestData'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }, function (_testJsCommonIdentityRoleRoleDetailTestData) {}],
        execute: function () {

            describe('RoleDetail', function () {

                var RoleDetail = undefined,
                    Entitlement = undefined,
                    TargetAccount = undefined,
                    IdentitySummary = undefined,
                    roleData = undefined;

                beforeEach(module(roleModule));

                beforeEach(inject(function (_RoleDetail_, _Entitlement_, _TargetAccount_, _IdentitySummary_, roleDetailTestData) {
                    RoleDetail = _RoleDetail_;
                    Entitlement = _Entitlement_;
                    TargetAccount = _TargetAccount_;
                    IdentitySummary = _IdentitySummary_;

                    roleData = roleDetailTestData.ROLE1;
                }));

                describe('constructor', function () {
                    it('explodes with no data', function () {
                        expect(function () {
                            return new RoleDetail(null);
                        }).toThrow();
                    });

                    it('sets properties correctly', function () {
                        var role = new RoleDetail(roleData);
                        expect(role.id).toEqual(roleData.id);
                        expect(role.assigned).toEqual(roleData.assigned);
                        expect(role.detected).toEqual(roleData.detected);
                        expect(role.displayName).toEqual(roleData.displayName);
                        expect(role.type).toEqual(roleData.type);
                        expect(role.owner instanceof IdentitySummary).toEqual(true);
                        expect(role.description).toEqual(roleData.description);
                        expect(role.permittedBy).toEqual(roleData.permittedBy);
                        expect(role.assignmentNote).toEqual(roleData.assignmentNote);
                        expect(role.identityHasRole).toEqual(roleData.identityHasRole);
                        expect(role.requiredRoles.length).toEqual(2);
                        expect(role.requiredRoles[0] instanceof RoleDetail).toEqual(true);
                        expect(role.permittedRoles.length).toEqual(1);
                        expect(role.permittedRoles[0] instanceof RoleDetail).toEqual(true);
                        expect(role.hierarchy.length).toEqual(1);
                        expect(role.hierarchy[0] instanceof RoleDetail).toEqual(true);
                        expect(role.hasHierarchy).toEqual(true);
                        expect(role.accountDetails.length).toEqual(1);
                        expect(role.accountDetails[0] instanceof TargetAccount).toEqual(true);
                        expect(role.contributingEntitlements.length).toEqual(2);
                        expect(role.contributingEntitlements[0] instanceof Entitlement).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkNBQTJDLG9EQUFvRCxVQUFVLFNBQVM7SUFDMUo7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3RixhQUFhLHNDQUFzQztXQUNwRCxVQUFVLDZDQUE2QztRQUMxRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsY0FBYyxZQUFNOztnQkFFekIsSUFBSSxhQUFVO29CQUFFLGNBQVc7b0JBQUUsZ0JBQWE7b0JBQUUsa0JBQWU7b0JBQUUsV0FBUTs7Z0JBRXJFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGNBQWMsZUFBZSxpQkFBaUIsbUJBQW1CLG9CQUF1QjtvQkFDdkcsYUFBYTtvQkFDYixjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsa0JBQWtCOztvQkFFbEIsV0FBVyxtQkFBbUI7OztnQkFJbEMsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcseUJBQXlCLFlBQU07d0JBQzlCLE9BQU8sWUFBQTs0QkFVUyxPQVZILElBQUksV0FBVzsyQkFBTzs7O29CQUd2QyxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxJQUFJLE9BQU8sSUFBSSxXQUFXO3dCQUMxQixPQUFPLEtBQUssSUFBSSxRQUFRLFNBQVM7d0JBQ2pDLE9BQU8sS0FBSyxVQUFVLFFBQVEsU0FBUzt3QkFDdkMsT0FBTyxLQUFLLFVBQVUsUUFBUSxTQUFTO3dCQUN2QyxPQUFPLEtBQUssYUFBYSxRQUFRLFNBQVM7d0JBQzFDLE9BQU8sS0FBSyxNQUFNLFFBQVEsU0FBUzt3QkFDbkMsT0FBTyxLQUFLLGlCQUFpQixpQkFBaUIsUUFBUTt3QkFDdEQsT0FBTyxLQUFLLGFBQWEsUUFBUSxTQUFTO3dCQUMxQyxPQUFPLEtBQUssYUFBYSxRQUFRLFNBQVM7d0JBQzFDLE9BQU8sS0FBSyxnQkFBZ0IsUUFBUSxTQUFTO3dCQUM3QyxPQUFPLEtBQUssaUJBQWlCLFFBQVEsU0FBUzt3QkFDOUMsT0FBTyxLQUFLLGNBQWMsUUFBUSxRQUFRO3dCQUMxQyxPQUFPLEtBQUssY0FBYyxjQUFjLFlBQVksUUFBUTt3QkFDNUQsT0FBTyxLQUFLLGVBQWUsUUFBUSxRQUFRO3dCQUMzQyxPQUFPLEtBQUssZUFBZSxjQUFjLFlBQVksUUFBUTt3QkFDN0QsT0FBTyxLQUFLLFVBQVUsUUFBUSxRQUFRO3dCQUN0QyxPQUFPLEtBQUssVUFBVSxjQUFjLFlBQVksUUFBUTt3QkFDeEQsT0FBTyxLQUFLLGNBQWMsUUFBUTt3QkFDbEMsT0FBTyxLQUFLLGVBQWUsUUFBUSxRQUFRO3dCQUMzQyxPQUFPLEtBQUssZUFBZSxjQUFjLGVBQWUsUUFBUTt3QkFDaEUsT0FBTyxLQUFLLHlCQUF5QixRQUFRLFFBQVE7d0JBQ3JELE9BQU8sS0FBSyx5QkFBeUIsY0FBYyxhQUFhLFFBQVE7Ozs7OztHQWlCakYiLCJmaWxlIjoiY29tbW9uL2lkZW50aXR5L3JvbGUvUm9sZURldGFpbFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCByb2xlTW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9yb2xlL0lkZW50aXR5Um9sZU1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaWRlbnRpdHkvcm9sZS9Sb2xlRGV0YWlsVGVzdERhdGEnO1xyXG5cclxuZGVzY3JpYmUoJ1JvbGVEZXRhaWwnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IFJvbGVEZXRhaWwsIEVudGl0bGVtZW50LCBUYXJnZXRBY2NvdW50LCBJZGVudGl0eVN1bW1hcnksIHJvbGVEYXRhO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJvbGVNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JvbGVEZXRhaWxfLCBfRW50aXRsZW1lbnRfLCBfVGFyZ2V0QWNjb3VudF8sIF9JZGVudGl0eVN1bW1hcnlfLCByb2xlRGV0YWlsVGVzdERhdGEpID0+IHtcclxuICAgICAgICBSb2xlRGV0YWlsID0gX1JvbGVEZXRhaWxfO1xyXG4gICAgICAgIEVudGl0bGVtZW50ID0gX0VudGl0bGVtZW50XztcclxuICAgICAgICBUYXJnZXRBY2NvdW50ID0gX1RhcmdldEFjY291bnRfO1xyXG4gICAgICAgIElkZW50aXR5U3VtbWFyeSA9IF9JZGVudGl0eVN1bW1hcnlfO1xyXG5cclxuICAgICAgICByb2xlRGF0YSA9IHJvbGVEZXRhaWxUZXN0RGF0YS5ST0xFMTtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdleHBsb2RlcyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgUm9sZURldGFpbChudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyBwcm9wZXJ0aWVzIGNvcnJlY3RseScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvbGUgPSBuZXcgUm9sZURldGFpbChyb2xlRGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLmlkKS50b0VxdWFsKHJvbGVEYXRhLmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUuYXNzaWduZWQpLnRvRXF1YWwocm9sZURhdGEuYXNzaWduZWQpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5kZXRlY3RlZCkudG9FcXVhbChyb2xlRGF0YS5kZXRlY3RlZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLmRpc3BsYXlOYW1lKS50b0VxdWFsKHJvbGVEYXRhLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUudHlwZSkudG9FcXVhbChyb2xlRGF0YS50eXBlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUub3duZXIgaW5zdGFuY2VvZiBJZGVudGl0eVN1bW1hcnkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLmRlc2NyaXB0aW9uKS50b0VxdWFsKHJvbGVEYXRhLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUucGVybWl0dGVkQnkpLnRvRXF1YWwocm9sZURhdGEucGVybWl0dGVkQnkpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5hc3NpZ25tZW50Tm90ZSkudG9FcXVhbChyb2xlRGF0YS5hc3NpZ25tZW50Tm90ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLmlkZW50aXR5SGFzUm9sZSkudG9FcXVhbChyb2xlRGF0YS5pZGVudGl0eUhhc1JvbGUpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5yZXF1aXJlZFJvbGVzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUucmVxdWlyZWRSb2xlc1swXSBpbnN0YW5jZW9mIFJvbGVEZXRhaWwpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLnBlcm1pdHRlZFJvbGVzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUucGVybWl0dGVkUm9sZXNbMF0gaW5zdGFuY2VvZiBSb2xlRGV0YWlsKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5oaWVyYXJjaHkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5oaWVyYXJjaHlbMF0gaW5zdGFuY2VvZiBSb2xlRGV0YWlsKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5oYXNIaWVyYXJjaHkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyb2xlLmFjY291bnREZXRhaWxzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJvbGUuYWNjb3VudERldGFpbHNbMF0gaW5zdGFuY2VvZiBUYXJnZXRBY2NvdW50KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5jb250cmlidXRpbmdFbnRpdGxlbWVudHMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5jb250cmlidXRpbmdFbnRpdGxlbWVudHNbMF0gaW5zdGFuY2VvZiBFbnRpdGxlbWVudCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
