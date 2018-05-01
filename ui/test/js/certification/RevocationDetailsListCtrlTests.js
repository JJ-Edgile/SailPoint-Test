System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('RevocationDetailsListCtrl', function () {

                var $stateParams = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    certificationService = undefined,
                    cert = undefined,
                    $q = undefined,
                    spModal = undefined,
                    navigationService = undefined,
                    SortOrder = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$controller_, _certificationService_, certificationTestData, _$q_, Certification, _$rootScope_, _spModal_, _navigationService_, _SortOrder_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    certificationService = _certificationService_;
                    navigationService = _navigationService_;
                    $q = _$q_;
                    spModal = _spModal_;
                    SortOrder = _SortOrder_;

                    // Create some mock data
                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    $stateParams = {
                        certificationId: cert.id
                    };

                    spyOn(spModal, 'open').and.returnValue({ result: { 'finally': function (func) {
                                func.call();
                            } } });
                    spyOn(navigationService, 'back');
                    spyOn(certificationService, 'getCertification').and.callFake(function () {
                        return $q.when({ object: cert });
                    });
                    spyOn(certificationService, 'getConfiguration').and.callFake(function () {
                        return $q.when({ object: {} });
                    });
                }));

                function createController(missingCert, rejectSubCert) {
                    var promise = rejectSubCert ? $q.reject({ data: { message: 'oops' } }) : $q.when({}),
                        fakeCert = missingCert ? undefined : cert,
                        emptyConfig = missingCert ? undefined : {};

                    spyOn(certificationService, 'getRevocationItems').and.returnValue(promise);

                    var certificationDataService = {
                        getCertification: function () {
                            return fakeCert;
                        },
                        getConfiguration: function () {
                            return emptyConfig;
                        },
                        setDataTableConfig: function () {}
                    };

                    return $controller('RevocationDetailsListCtrl', {
                        certificationService: certificationService,
                        certificationDataService: certificationDataService,
                        $stateParams: $stateParams
                    });
                }

                it('throws if certification ID is missing', function () {
                    delete $stateParams.certificationId;
                    expect(function () {
                        createController(false, false);
                    }).toThrow();
                });

                it('should load parent cert and config if it is missing', function () {
                    createController(true, false);
                    expect(certificationService.getCertification).toHaveBeenCalled();
                    expect(certificationService.getConfiguration).toHaveBeenCalled();
                });

                describe('getItems()', function () {
                    it('calls service', function () {
                        var ctrl = createController(false, false);
                        expect(certificationService.getCertification).not.toHaveBeenCalled();
                        expect(certificationService.getRevocationItems).not.toHaveBeenCalled();
                        ctrl.getItems(0, null);
                        $rootScope.$digest();
                        expect(certificationService.getRevocationItems).toHaveBeenCalledWith(cert.id, 0, 10, null);
                    });

                    it('opens alert dialog when exception and calls navigationService.back', function () {
                        var ctrl = createController(false, true);
                        expect(certificationService.getCertification).not.toHaveBeenCalled();
                        expect(certificationService.getRevocationItems).not.toHaveBeenCalled();
                        ctrl.getItems(0, null);
                        $rootScope.$digest();
                        expect(certificationService.getRevocationItems).toHaveBeenCalledWith(cert.id, 0, 10, null);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(navigationService.back).toHaveBeenCalled();
                    });

                    it('adds sort order', function () {
                        var ctrl = createController(false, true),
                            sortOrder = new SortOrder('PROP1', true);
                        ctrl.getItems(0, sortOrder);
                        $rootScope.$digest();
                        expect(certificationService.getRevocationItems).toHaveBeenCalledWith(cert.id, 0, 10, sortOrder);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vUmV2b2NhdGlvbkRldGFpbHNMaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7O0lBSWpHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDZCQUE2QixZQUFXOztnQkFFN0MsSUFBSSxlQUFZO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSx1QkFBb0I7b0JBQUUsT0FBSTtvQkFBRSxLQUFFO29CQUFFLFVBQU87b0JBQUUsb0JBQWlCO29CQUFFLFlBQVM7O2dCQUVoSCxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSx3QkFBd0IsdUJBQXVCLE1BQzlELGVBQWUsY0FBYyxXQUFXLHFCQUFxQixhQUFhO29CQUNqRyxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLEtBQUs7b0JBQ0wsVUFBVTtvQkFDVixZQUFZOzs7b0JBR1osT0FBTyxJQUFJLGNBQWMsc0JBQXNCO29CQUMvQyxlQUFlO3dCQUNYLGlCQUFpQixLQUFLOzs7b0JBRzFCLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFTLFVBQUMsTUFBUztnQ0FBRSxLQUFLOztvQkFDN0UsTUFBTSxtQkFBbUI7b0JBQ3pCLE1BQU0sc0JBQXNCLG9CQUFvQixJQUFJLFNBQVMsWUFBTTt3QkFDL0QsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFROztvQkFFN0IsTUFBTSxzQkFBc0Isb0JBQW9CLElBQUksU0FBUyxZQUFNO3dCQUMvRCxPQUFPLEdBQUcsS0FBSyxFQUFFLFFBQVE7Ozs7Z0JBSWpDLFNBQVMsaUJBQWlCLGFBQWEsZUFBZTtvQkFDbEQsSUFBSSxVQUFVLGdCQUFnQixHQUFHLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxjQUFZLEdBQUcsS0FBSzt3QkFDekUsV0FBVyxjQUFjLFlBQVk7d0JBQ3JDLGNBQWMsY0FBYyxZQUFZOztvQkFFNUMsTUFBTSxzQkFBc0Isc0JBQXNCLElBQUksWUFBWTs7b0JBRWxFLElBQUksMkJBQTJCO3dCQUMzQixrQkFBa0IsWUFBTTs0QkFDcEIsT0FBTzs7d0JBRVgsa0JBQWtCLFlBQU07NEJBQ3BCLE9BQU87O3dCQUVYLG9CQUFvQixZQUFNOzs7b0JBRzlCLE9BQU8sWUFBWSw2QkFBNkI7d0JBQzVDLHNCQUFzQjt3QkFDdEIsMEJBQTBCO3dCQUMxQixjQUFjOzs7O2dCQUl0QixHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxPQUFPLGFBQWE7b0JBQ3BCLE9BQU8sWUFBVzt3QkFBRSxpQkFBaUIsT0FBTzt1QkFBVzs7O2dCQUczRCxHQUFHLHVEQUF1RCxZQUFNO29CQUM1RCxpQkFBaUIsTUFBTTtvQkFDdkIsT0FBTyxxQkFBcUIsa0JBQWtCO29CQUM5QyxPQUFPLHFCQUFxQixrQkFBa0I7OztnQkFHbEQsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLEdBQUcsaUJBQWlCLFlBQVc7d0JBQzNCLElBQUksT0FBTyxpQkFBaUIsT0FBTzt3QkFDbkMsT0FBTyxxQkFBcUIsa0JBQWtCLElBQUk7d0JBQ2xELE9BQU8scUJBQXFCLG9CQUFvQixJQUFJO3dCQUNwRCxLQUFLLFNBQVMsR0FBRzt3QkFDakIsV0FBVzt3QkFDWCxPQUFPLHFCQUFxQixvQkFBb0IscUJBQXFCLEtBQUssSUFBSSxHQUFHLElBQUk7OztvQkFHekYsR0FBRyxzRUFBc0UsWUFBTTt3QkFDM0UsSUFBSSxPQUFPLGlCQUFpQixPQUFPO3dCQUNuQyxPQUFPLHFCQUFxQixrQkFBa0IsSUFBSTt3QkFDbEQsT0FBTyxxQkFBcUIsb0JBQW9CLElBQUk7d0JBQ3BELEtBQUssU0FBUyxHQUFHO3dCQUNqQixXQUFXO3dCQUNYLE9BQU8scUJBQXFCLG9CQUFvQixxQkFBcUIsS0FBSyxJQUFJLEdBQUcsSUFBSTt3QkFDckYsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLE9BQU8sa0JBQWtCLE1BQU07OztvQkFHbkMsR0FBRyxtQkFBbUIsWUFBTTt3QkFDeEIsSUFBSSxPQUFPLGlCQUFpQixPQUFPOzRCQUMvQixZQUFZLElBQUksVUFBVSxTQUFTO3dCQUN2QyxLQUFLLFNBQVMsR0FBRzt3QkFDakIsV0FBVzt3QkFDWCxPQUFPLHFCQUFxQixvQkFBb0IscUJBQXFCLEtBQUssSUFBSSxHQUFHLElBQUk7Ozs7OztHQXdCOUYiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9SZXZvY2F0aW9uRGV0YWlsc0xpc3RDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdSZXZvY2F0aW9uRGV0YWlsc0xpc3RDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJHN0YXRlUGFyYW1zLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgY2VydGlmaWNhdGlvblNlcnZpY2UsIGNlcnQsICRxLCBzcE1vZGFsLCBuYXZpZ2F0aW9uU2VydmljZSwgU29ydE9yZGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF9jZXJ0aWZpY2F0aW9uU2VydmljZV8sIGNlcnRpZmljYXRpb25UZXN0RGF0YSwgXyRxXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uLCBfJHJvb3RTY29wZV8sIF9zcE1vZGFsXywgX25hdmlnYXRpb25TZXJ2aWNlXywgX1NvcnRPcmRlcl8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcblxuICAgICAgICAvLyBDcmVhdGUgc29tZSBtb2NrIGRhdGFcbiAgICAgICAgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xuICAgICAgICAkc3RhdGVQYXJhbXMgPSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSWQ6IGNlcnQuaWRcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7IHJlc3VsdDogeyBmaW5hbGx5OiAoZnVuYykgPT4geyBmdW5jLmNhbGwoKTsgfX19KTtcbiAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdiYWNrJyk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IG9iamVjdDogY2VydCB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbih7IG9iamVjdDoge30gfSk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIobWlzc2luZ0NlcnQsIHJlamVjdFN1YkNlcnQpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSByZWplY3RTdWJDZXJ0ID8gJHEucmVqZWN0KHtkYXRhOiB7bWVzc2FnZTogJ29vcHMnfX0pIDogJHEud2hlbih7fSksXG4gICAgICAgICAgICBmYWtlQ2VydCA9IG1pc3NpbmdDZXJ0ID8gdW5kZWZpbmVkIDogY2VydCxcbiAgICAgICAgICAgIGVtcHR5Q29uZmlnID0gbWlzc2luZ0NlcnQgPyB1bmRlZmluZWQgOiB7fTtcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldFJldm9jYXRpb25JdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShwcm9taXNlKTtcblxuICAgICAgICBsZXQgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0ge1xuICAgICAgICAgICAgZ2V0Q2VydGlmaWNhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWtlQ2VydDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDb25maWd1cmF0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5Q29uZmlnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldERhdGFUYWJsZUNvbmZpZzogKCkgPT4ge31cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1Jldm9jYXRpb25EZXRhaWxzTGlzdEN0cmwnLCB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZTogY2VydGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2U6IGNlcnRpZmljYXRpb25EYXRhU2VydmljZSxcbiAgICAgICAgICAgICRzdGF0ZVBhcmFtczogJHN0YXRlUGFyYW1zXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0KCd0aHJvd3MgaWYgY2VydGlmaWNhdGlvbiBJRCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlbGV0ZSAkc3RhdGVQYXJhbXMuY2VydGlmaWNhdGlvbklkO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIGZhbHNlKTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBsb2FkIHBhcmVudCBjZXJ0IGFuZCBjb25maWcgaWYgaXQgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcih0cnVlLCBmYWxzZSk7XG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDb25maWd1cmF0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbXMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbGxzIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0UmV2b2NhdGlvbkl0ZW1zKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwLCBudWxsKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFJldm9jYXRpb25JdGVtcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgMCwgMTAsIG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb3BlbnMgYWxlcnQgZGlhbG9nIHdoZW4gZXhjZXB0aW9uIGFuZCBjYWxscyBuYXZpZ2F0aW9uU2VydmljZS5iYWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFJldm9jYXRpb25JdGVtcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0SXRlbXMoMCwgbnVsbCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZXZvY2F0aW9uSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQuaWQsIDAsIDEwLCBudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5iYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHNvcnQgb3JkZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IG5ldyBTb3J0T3JkZXIoJ1BST1AxJywgdHJ1ZSk7XG4gICAgICAgICAgICBjdHJsLmdldEl0ZW1zKDAsIHNvcnRPcmRlcik7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZXZvY2F0aW9uSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQuaWQsIDAsIDEwLCBzb3J0T3JkZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
