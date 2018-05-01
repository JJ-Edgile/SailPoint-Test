System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule', './CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationSignatureListCtrl', function () {
                var $controller = undefined,
                    $rootScope = undefined,
                    certificationService = undefined,
                    certificationDataService = undefined,
                    cert = undefined,
                    dataCert = undefined,
                    $stateParams = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$controller_, _certificationService_, _certificationDataService_, certificationTestData, Certification, _$rootScope_, testService) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    certificationService = _certificationService_;
                    certificationDataService = _certificationDataService_;

                    // Create some mock data
                    cert = new Certification(certificationTestData.CERTIFICATION_SIGNED);
                    dataCert = undefined;
                    $stateParams = {
                        certificationId: cert.id
                    };

                    spyOn(certificationService, 'getCertification').and.returnValue(testService.createPromise(false, {
                        object: cert
                    }));

                    spyOn(certificationDataService, 'getCertification').and.callFake(function () {
                        return dataCert;
                    });
                }));

                describe('load()', function () {
                    it('uses the certification in certificationDataService if exists', function () {
                        var ctrl = undefined;
                        dataCert = cert;
                        dataCert.name = 'poop';
                        ctrl = $controller('CertificationSignatureListCtrl', {
                            certificationService: certificationService,
                            certificationDataService: certificationDataService,
                            $stateParams: $stateParams
                        });

                        $rootScope.$apply();
                        expect(certificationDataService.getCertification).toHaveBeenCalled();
                        expect(certificationService.getCertification).not.toHaveBeenCalled();
                        expect(ctrl.certification).toEqual(dataCert);
                    });

                    it('loads the certification from certificationService if does not exist in certificationDataService', function () {
                        var ctrl = $controller('CertificationSignatureListCtrl', {
                            certificationService: certificationService,
                            certificationDataService: certificationDataService,
                            $stateParams: $stateParams
                        });

                        $rootScope.$apply();
                        expect(certificationDataService.getCertification).toHaveBeenCalled();
                        expect(certificationService.getCertification).toHaveBeenCalled();
                        expect(ctrl.certification).toEqual(cert);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblNpZ25hdHVyZUxpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUzs7SUFFbEo7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUw3QixTQUFTLGtDQUFrQyxZQUFNO2dCQUM3QyxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSx1QkFBb0I7b0JBQUUsMkJBQXdCO29CQUFFLE9BQUk7b0JBQUUsV0FBUTtvQkFBRSxlQUFZOztnQkFFekcsV0FBVyxPQUFPLHFCQUFxQjs7O2dCQUd2QyxXQUFXLE9BQU8sVUFBQyxlQUFlLHdCQUF3Qiw0QkFDdkMsdUJBQXVCLGVBQWUsY0FBYyxhQUFnQjtvQkFDbkYsY0FBYztvQkFDZCxhQUFhO29CQUNiLHVCQUF1QjtvQkFDdkIsMkJBQTJCOzs7b0JBRzNCLE9BQU8sSUFBSSxjQUFjLHNCQUFzQjtvQkFDL0MsV0FBVztvQkFDWCxlQUFlO3dCQUNYLGlCQUFpQixLQUFLOzs7b0JBRzFCLE1BQU0sc0JBQXNCLG9CQUFvQixJQUFJLFlBQVksWUFBWSxjQUFjLE9BQU87d0JBQzdGLFFBQVE7OztvQkFHWixNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxTQUFTLFlBQU07d0JBQ25FLE9BQU87Ozs7Z0JBSWYsU0FBUyxVQUFVLFlBQU07b0JBQ3JCLEdBQUcsZ0VBQWdFLFlBQU07d0JBQ3JFLElBQUksT0FBSTt3QkFDUixXQUFXO3dCQUNYLFNBQVMsT0FBTzt3QkFDaEIsT0FBTyxZQUFZLGtDQUFrQzs0QkFDakQsc0JBQXNCOzRCQUN0QiwwQkFBMEI7NEJBQzFCLGNBQWM7Ozt3QkFHbEIsV0FBVzt3QkFDWCxPQUFPLHlCQUF5QixrQkFBa0I7d0JBQ2xELE9BQU8scUJBQXFCLGtCQUFrQixJQUFJO3dCQUNsRCxPQUFPLEtBQUssZUFBZSxRQUFROzs7b0JBR3ZDLEdBQUcsbUdBQW1HLFlBQU07d0JBQ3hHLElBQUksT0FBTyxZQUFZLGtDQUFrQzs0QkFDckQsc0JBQXNCOzRCQUN0QiwwQkFBMEI7NEJBQzFCLGNBQWM7Ozt3QkFHbEIsV0FBVzt3QkFDWCxPQUFPLHlCQUF5QixrQkFBa0I7d0JBQ2xELE9BQU8scUJBQXFCLGtCQUFrQjt3QkFDOUMsT0FBTyxLQUFLLGVBQWUsUUFBUTs7Ozs7O0dBa0I1QyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25TaWduYXR1cmVMaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuaW1wb3J0ICcuL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uU2lnbmF0dXJlTGlzdEN0cmwnLCAoKSA9PiB7XG4gICAgbGV0ICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBjZXJ0aWZpY2F0aW9uU2VydmljZSwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBjZXJ0LCBkYXRhQ2VydCwgJHN0YXRlUGFyYW1zO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfLCBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDZXJ0aWZpY2F0aW9uLCBfJHJvb3RTY29wZV8sIHRlc3RTZXJ2aWNlKSA9PiB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXztcblxuICAgICAgICAvLyBDcmVhdGUgc29tZSBtb2NrIGRhdGFcbiAgICAgICAgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX1NJR05FRCk7XG4gICAgICAgIGRhdGFDZXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgICAkc3RhdGVQYXJhbXMgPSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSWQ6IGNlcnQuaWRcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge1xuICAgICAgICAgICAgb2JqZWN0OiBjZXJ0XG4gICAgICAgIH0pKTtcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhQ2VydDtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3VzZXMgdGhlIGNlcnRpZmljYXRpb24gaW4gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlIGlmIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsO1xuICAgICAgICAgICAgZGF0YUNlcnQgPSBjZXJ0O1xuICAgICAgICAgICAgZGF0YUNlcnQubmFtZSA9ICdwb29wJztcbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQ2VydGlmaWNhdGlvblNpZ25hdHVyZUxpc3RDdHJsJywge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlOiBjZXJ0aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2U6IGNlcnRpZmljYXRpb25EYXRhU2VydmljZSxcbiAgICAgICAgICAgICAgICAkc3RhdGVQYXJhbXM6ICRzdGF0ZVBhcmFtc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldENlcnRpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2VydGlmaWNhdGlvbikudG9FcXVhbChkYXRhQ2VydCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdsb2FkcyB0aGUgY2VydGlmaWNhdGlvbiBmcm9tIGNlcnRpZmljYXRpb25TZXJ2aWNlIGlmIGRvZXMgbm90IGV4aXN0IGluIGNlcnRpZmljYXRpb25EYXRhU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25TaWduYXR1cmVMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZTogY2VydGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlOiBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2VydGlmaWNhdGlvbikudG9FcXVhbChjZXJ0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
