System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('SoDRole', function () {

                var SoDRole = undefined,
                    data = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_SoDRole_, remediationTestData) {
                    SoDRole = _SoDRole_;
                    data = remediationTestData.REMEDIATION_ADVICE_RESULT.advice.leftRoles[0];
                }));

                describe('constructor', function () {
                    it('sets values', function () {
                        var testRole = new SoDRole(data);
                        expect(testRole.id).toEqual(data.id);
                        expect(testRole.name).toEqual(data.name);
                        expect(testRole.displayableName).toEqual(data.displayableName);
                        expect(testRole.description).toEqual(data.description);
                        expect(testRole.selected).toEqual(data.selected);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9Tb0RSb2xlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHdDQUF3QywyQkFBMkIsVUFBVSxTQUFTOzs7SUFHOUg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFDQUFxQztZQUMzRixvQkFBb0Isb0NBQW9DO1dBQ3pELFVBQVUsc0JBQXNCO1FBQ25DLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxXQUFXLFlBQU07O2dCQUV0QixJQUFJLFVBQU87b0JBQUUsT0FBSTs7Z0JBRWpCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFdBQVcscUJBQXdCO29CQUNsRCxVQUFVO29CQUNWLE9BQU8sb0JBQW9CLDBCQUEwQixPQUFPLFVBQVU7OztnQkFHMUUsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsZUFBZSxZQUFNO3dCQUNwQixJQUFJLFdBQVcsSUFBSSxRQUFRO3dCQUMzQixPQUFPLFNBQVMsSUFBSSxRQUFRLEtBQUs7d0JBQ2pDLE9BQU8sU0FBUyxNQUFNLFFBQVEsS0FBSzt3QkFDbkMsT0FBTyxTQUFTLGlCQUFpQixRQUFRLEtBQUs7d0JBQzlDLE9BQU8sU0FBUyxhQUFhLFFBQVEsS0FBSzt3QkFDMUMsT0FBTyxTQUFTLFVBQVUsUUFBUSxLQUFLOzs7Ozs7R0FhaEQiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL21vZGVsL1NvRFJvbGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9SZW1lZGlhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1NvRFJvbGUnLCAoKSA9PiB7XG5cbiAgICBsZXQgU29EUm9sZSwgZGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1NvRFJvbGVfLCByZW1lZGlhdGlvblRlc3REYXRhKSA9PiB7XG4gICAgICAgIFNvRFJvbGUgPSBfU29EUm9sZV87XG4gICAgICAgIGRhdGEgPSByZW1lZGlhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQuYWR2aWNlLmxlZnRSb2xlc1swXTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0Um9sZSA9IG5ldyBTb0RSb2xlKGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RSb2xlLmlkKS50b0VxdWFsKGRhdGEuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RSb2xlLm5hbWUpLnRvRXF1YWwoZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5kaXNwbGF5YWJsZU5hbWUpLnRvRXF1YWwoZGF0YS5kaXNwbGF5YWJsZU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RSb2xlLmRlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RSb2xlLnNlbGVjdGVkKS50b0VxdWFsKGRhdGEuc2VsZWN0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
