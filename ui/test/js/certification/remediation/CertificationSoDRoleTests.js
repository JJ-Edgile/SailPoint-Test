System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationSoDRole', function () {

                var CertificationSoDRole = undefined,
                    data = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationSoDRole_, certificationTestData) {
                    CertificationSoDRole = _CertificationSoDRole_;
                    data = certificationTestData.REMEDIATION_ADVICE_RESULT.advice.leftRoles[0];
                }));

                describe('constructor', function () {
                    it('sets values', function () {
                        var testRole = new CertificationSoDRole(data);
                        expect(testRole.id).toEqual(data.id);
                        expect(testRole.name).toEqual(data.name);
                        expect(testRole.displayableName).toEqual(data.displayableName);
                        expect(testRole.description).toEqual(data.description);
                        expect(testRole.selected).toEqual(data.selected);
                        expect(testRole.certItemId).toEqual(data.certItemId);
                        expect(testRole.entityId).toEqual(data.entityId);
                        expect(testRole.status).toEqual(data.status);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblNvRFJvbGVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7OztJQUc3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHdCQUF3QixZQUFNOztnQkFFbkMsSUFBSSx1QkFBb0I7b0JBQUUsT0FBSTs7Z0JBRTlCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHdCQUF3Qix1QkFBMEI7b0JBQ2pFLHVCQUF1QjtvQkFDdkIsT0FBTyxzQkFBc0IsMEJBQTBCLE9BQU8sVUFBVTs7O2dCQUc1RSxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxlQUFlLFlBQU07d0JBQ3BCLElBQUksV0FBVyxJQUFJLHFCQUFxQjt3QkFDeEMsT0FBTyxTQUFTLElBQUksUUFBUSxLQUFLO3dCQUNqQyxPQUFPLFNBQVMsTUFBTSxRQUFRLEtBQUs7d0JBQ25DLE9BQU8sU0FBUyxpQkFBaUIsUUFBUSxLQUFLO3dCQUM5QyxPQUFPLFNBQVMsYUFBYSxRQUFRLEtBQUs7d0JBQzFDLE9BQU8sU0FBUyxVQUFVLFFBQVEsS0FBSzt3QkFDdkMsT0FBTyxTQUFTLFlBQVksUUFBUSxLQUFLO3dCQUN6QyxPQUFPLFNBQVMsVUFBVSxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sU0FBUyxRQUFRLFFBQVEsS0FBSzs7Ozs7O0dBYTlDIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblNvRFJvbGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uU29EUm9sZScsICgpID0+IHtcblxuICAgIGxldCBDZXJ0aWZpY2F0aW9uU29EUm9sZSwgZGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2VydGlmaWNhdGlvblNvRFJvbGVfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEpID0+IHtcbiAgICAgICAgQ2VydGlmaWNhdGlvblNvRFJvbGUgPSBfQ2VydGlmaWNhdGlvblNvRFJvbGVfO1xuICAgICAgICBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQuYWR2aWNlLmxlZnRSb2xlc1swXTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZXN0Um9sZSA9IG5ldyBDZXJ0aWZpY2F0aW9uU29EUm9sZShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5pZCkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5uYW1lKS50b0VxdWFsKGRhdGEubmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFJvbGUuZGlzcGxheWFibGVOYW1lKS50b0VxdWFsKGRhdGEuZGlzcGxheWFibGVOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5kZXNjcmlwdGlvbikudG9FcXVhbChkYXRhLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5zZWxlY3RlZCkudG9FcXVhbChkYXRhLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Um9sZS5jZXJ0SXRlbUlkKS50b0VxdWFsKGRhdGEuY2VydEl0ZW1JZCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFJvbGUuZW50aXR5SWQpLnRvRXF1YWwoZGF0YS5lbnRpdHlJZCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFJvbGUuc3RhdHVzKS50b0VxdWFsKGRhdGEuc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
