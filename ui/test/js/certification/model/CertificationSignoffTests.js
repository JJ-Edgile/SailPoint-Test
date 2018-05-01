System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationSignoff', function () {
                var CertificationSignoff = undefined,
                    IdentitySummary = undefined,
                    certificationTestData = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationSignoff_, _IdentitySummary_, _certificationTestData_) {
                    CertificationSignoff = _CertificationSignoff_;
                    certificationTestData = _certificationTestData_;
                    IdentitySummary = _IdentitySummary_;
                }));

                it('throws with no data', function () {
                    expect(function () {
                        new CertificationSignoff();
                    }).toThrow();
                });

                it('initializes with data', function () {
                    var data = certificationTestData.CERTIFICATION_SIGNED.signoffs[0],
                        test = new CertificationSignoff(data);

                    expect(test.signer).toEqual(new IdentitySummary(data.signer));
                    expect(test.date).toEqual(new Date(data.date));
                    expect(test.application).toEqual(data.application);
                    expect(test.account).toEqual(data.account);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblNpZ25vZmZUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDZCQUE2QixVQUFVLFNBQVM7O0lBRTdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsd0JBQXdCLFlBQU07Z0JBQ25DLElBQUksdUJBQW9CO29CQUFFLGtCQUFlO29CQUFFLHdCQUFxQjs7Z0JBRWhFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHdCQUF3QixtQkFBbUIseUJBQTRCO29CQUN0Rix1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsa0JBQWtCOzs7Z0JBR3RCLEdBQUcsdUJBQXVCLFlBQU07b0JBQzVCLE9BQU8sWUFBTTt3QkFBRSxJQUFJO3VCQUEyQjs7O2dCQUdsRCxHQUFHLHlCQUF5QixZQUFNO29CQUM5QixJQUFJLE9BQU8sc0JBQXNCLHFCQUFxQixTQUFTO3dCQUMzRCxPQUFPLElBQUkscUJBQXFCOztvQkFFcEMsT0FBTyxLQUFLLFFBQVEsUUFBUSxJQUFJLGdCQUFnQixLQUFLO29CQUNyRCxPQUFPLEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxLQUFLO29CQUN4QyxPQUFPLEtBQUssYUFBYSxRQUFRLEtBQUs7b0JBQ3RDLE9BQU8sS0FBSyxTQUFTLFFBQVEsS0FBSzs7Ozs7R0FldkMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9DZXJ0aWZpY2F0aW9uU2lnbm9mZlRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uU2lnbm9mZicsICgpID0+IHtcbiAgICBsZXQgQ2VydGlmaWNhdGlvblNpZ25vZmYsIElkZW50aXR5U3VtbWFyeSwgY2VydGlmaWNhdGlvblRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9DZXJ0aWZpY2F0aW9uU2lnbm9mZl8sIF9JZGVudGl0eVN1bW1hcnlfLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXykgPT4ge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uU2lnbm9mZiA9IF9DZXJ0aWZpY2F0aW9uU2lnbm9mZl87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgICAgICBJZGVudGl0eVN1bW1hcnkgPSBfSWRlbnRpdHlTdW1tYXJ5XztcbiAgICB9KSk7XG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gZGF0YScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IENlcnRpZmljYXRpb25TaWdub2ZmKCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbml0aWFsaXplcyB3aXRoIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fU0lHTkVELnNpZ25vZmZzWzBdLFxuICAgICAgICAgICAgdGVzdCA9IG5ldyBDZXJ0aWZpY2F0aW9uU2lnbm9mZihkYXRhKTtcblxuICAgICAgICBleHBlY3QodGVzdC5zaWduZXIpLnRvRXF1YWwobmV3IElkZW50aXR5U3VtbWFyeShkYXRhLnNpZ25lcikpO1xuICAgICAgICBleHBlY3QodGVzdC5kYXRlKS50b0VxdWFsKG5ldyBEYXRlKGRhdGEuZGF0ZSkpO1xuICAgICAgICBleHBlY3QodGVzdC5hcHBsaWNhdGlvbikudG9FcXVhbChkYXRhLmFwcGxpY2F0aW9uKTtcbiAgICAgICAgZXhwZWN0KHRlc3QuYWNjb3VudCkudG9FcXVhbChkYXRhLmFjY291bnQpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
