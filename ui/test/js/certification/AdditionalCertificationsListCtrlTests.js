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

            describe('AdditionalCertificationsListCtrl', function () {

                var $stateParams = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    certificationService = undefined,
                    cert = undefined,
                    $q = undefined,
                    spModal = undefined,
                    navigationService = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$controller_, _certificationService_, certificationTestData, _$q_, Certification, _$rootScope_, _spModal_, _navigationService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    certificationService = _certificationService_;
                    navigationService = _navigationService_;
                    $q = _$q_;
                    spModal = _spModal_;

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

                    spyOn(certificationService, 'getSubCertifications').and.returnValue(promise);

                    var certificationDataService = {
                        getCertification: function () {
                            return fakeCert;
                        },
                        getConfiguration: function () {
                            return emptyConfig;
                        },
                        setDataTableConfig: function () {}
                    };

                    return $controller('AdditionalCertificationsListCtrl', {
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
                        expect(certificationService.getSubCertifications).not.toHaveBeenCalled();
                        ctrl.getItems(0);
                        $rootScope.$digest();
                        expect(certificationService.getSubCertifications).toHaveBeenCalledWith(cert.id, 0, 10, null);
                    });

                    it('opens alert dialog when exception and calls navigationService.back', function () {
                        var ctrl = createController(false, true);
                        expect(certificationService.getCertification).not.toHaveBeenCalled();
                        expect(certificationService.getSubCertifications).not.toHaveBeenCalled();
                        ctrl.getItems(0);
                        $rootScope.$digest();
                        expect(certificationService.getSubCertifications).toHaveBeenCalledWith(cert.id, 0, 10, null);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(navigationService.back).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQWRkaXRpb25hbENlcnRpZmljYXRpb25zTGlzdEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7OztJQUlqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQ0FBb0MsWUFBVzs7Z0JBRXBELElBQUksZUFBWTtvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsdUJBQW9CO29CQUFFLE9BQUk7b0JBQUUsS0FBRTtvQkFBRSxVQUFPO29CQUFFLG9CQUFpQjs7Z0JBRXJHLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxlQUFlLHdCQUF3Qix1QkFBdUIsTUFDOUQsZUFBZSxjQUFjLFdBQVcscUJBQXFCO29CQUNwRixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLEtBQUs7b0JBQ0wsVUFBVTs7O29CQUdWLE9BQU8sSUFBSSxjQUFjLHNCQUFzQjtvQkFDL0MsZUFBZTt3QkFDWCxpQkFBaUIsS0FBSzs7O29CQUcxQixNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBUyxVQUFDLE1BQVM7Z0NBQUUsS0FBSzs7b0JBQzdFLE1BQU0sbUJBQW1CO29CQUN6QixNQUFNLHNCQUFzQixvQkFBb0IsSUFBSSxTQUFTLFlBQU07d0JBQy9ELE9BQU8sR0FBRyxLQUFLLEVBQUUsUUFBUTs7b0JBRTdCLE1BQU0sc0JBQXNCLG9CQUFvQixJQUFJLFNBQVMsWUFBTTt3QkFDL0QsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFROzs7O2dCQUlqQyxTQUFTLGlCQUFpQixhQUFhLGVBQWU7b0JBQ2xELElBQUksVUFBVSxnQkFBZ0IsR0FBRyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsY0FBWSxHQUFHLEtBQUs7d0JBQ3pFLFdBQVcsY0FBYyxZQUFZO3dCQUNyQyxjQUFjLGNBQWMsWUFBWTs7b0JBRTVDLE1BQU0sc0JBQXNCLHdCQUF3QixJQUFJLFlBQVk7O29CQUVwRSxJQUFJLDJCQUEyQjt3QkFDM0Isa0JBQWtCLFlBQU07NEJBQ3BCLE9BQU87O3dCQUVYLGtCQUFrQixZQUFNOzRCQUNwQixPQUFPOzt3QkFFWCxvQkFBb0IsWUFBTTs7O29CQUc5QixPQUFPLFlBQVksb0NBQW9DO3dCQUNuRCxzQkFBc0I7d0JBQ3RCLDBCQUEwQjt3QkFDMUIsY0FBYzs7OztnQkFJdEIsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsT0FBTyxhQUFhO29CQUNwQixPQUFPLFlBQVc7d0JBQUUsaUJBQWlCLE9BQU87dUJBQVc7OztnQkFHM0QsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsaUJBQWlCLE1BQU07b0JBQ3ZCLE9BQU8scUJBQXFCLGtCQUFrQjtvQkFDOUMsT0FBTyxxQkFBcUIsa0JBQWtCOzs7Z0JBR2xELFNBQVMsY0FBYyxZQUFNO29CQUN6QixHQUFHLGlCQUFpQixZQUFXO3dCQUMzQixJQUFJLE9BQU8saUJBQWlCLE9BQU87d0JBQ25DLE9BQU8scUJBQXFCLGtCQUFrQixJQUFJO3dCQUNsRCxPQUFPLHFCQUFxQixzQkFBc0IsSUFBSTt3QkFDdEQsS0FBSyxTQUFTO3dCQUNkLFdBQVc7d0JBQ1gsT0FBTyxxQkFBcUIsc0JBQXNCLHFCQUFxQixLQUFLLElBQUksR0FBRyxJQUFJOzs7b0JBRzNGLEdBQUcsc0VBQXNFLFlBQU07d0JBQzNFLElBQUksT0FBTyxpQkFBaUIsT0FBTzt3QkFDbkMsT0FBTyxxQkFBcUIsa0JBQWtCLElBQUk7d0JBQ2xELE9BQU8scUJBQXFCLHNCQUFzQixJQUFJO3dCQUN0RCxLQUFLLFNBQVM7d0JBQ2QsV0FBVzt3QkFDWCxPQUFPLHFCQUFxQixzQkFBc0IscUJBQXFCLEtBQUssSUFBSSxHQUFHLElBQUk7d0JBQ3ZGLE9BQU8sUUFBUSxNQUFNO3dCQUNyQixPQUFPLGtCQUFrQixNQUFNOzs7Ozs7R0F1QnhDIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQWRkaXRpb25hbENlcnRpZmljYXRpb25zTGlzdEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ0FkZGl0aW9uYWxDZXJ0aWZpY2F0aW9uc0xpc3RDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJHN0YXRlUGFyYW1zLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgY2VydGlmaWNhdGlvblNlcnZpY2UsIGNlcnQsICRxLCBzcE1vZGFsLCBuYXZpZ2F0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIF8kcV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbiwgXyRyb290U2NvcGVfLCBfc3BNb2RhbF8sIF9uYXZpZ2F0aW9uU2VydmljZV8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzb21lIG1vY2sgZGF0YVxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG4gICAgICAgICRzdGF0ZVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JZDogY2VydC5pZFxuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiB7IGZpbmFsbHk6IChmdW5jKSA9PiB7IGZ1bmMuY2FsbCgpOyB9fX0pO1xuICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2JhY2snKTtcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHsgb2JqZWN0OiBjZXJ0IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHsgb2JqZWN0OiB7fSB9KTtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihtaXNzaW5nQ2VydCwgcmVqZWN0U3ViQ2VydCkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IHJlamVjdFN1YkNlcnQgPyAkcS5yZWplY3Qoe2RhdGE6IHttZXNzYWdlOiAnb29wcyd9fSkgOiAkcS53aGVuKHt9KSxcbiAgICAgICAgICAgIGZha2VDZXJ0ID0gbWlzc2luZ0NlcnQgPyB1bmRlZmluZWQgOiBjZXJ0LFxuICAgICAgICAgICAgZW1wdHlDb25maWcgPSBtaXNzaW5nQ2VydCA/IHVuZGVmaW5lZCA6IHt9O1xuXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0U3ViQ2VydGlmaWNhdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUocHJvbWlzZSk7XG5cbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldENlcnRpZmljYXRpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFrZUNlcnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29uZmlndXJhdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbXB0eUNvbmZpZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXREYXRhVGFibGVDb25maWc6ICgpID0+IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdBZGRpdGlvbmFsQ2VydGlmaWNhdGlvbnNMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlOiBjZXJ0aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZTogY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXQoJ3Rocm93cyBpZiBjZXJ0aWZpY2F0aW9uIElEIGlzIG1pc3NpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVsZXRlICRzdGF0ZVBhcmFtcy5jZXJ0aWZpY2F0aW9uSWQ7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3JlYXRlQ29udHJvbGxlcihmYWxzZSwgZmFsc2UpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxvYWQgcGFyZW50IGNlcnQgYW5kIGNvbmZpZyBpZiBpdCBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKHRydWUsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRJdGVtcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FsbHMgc2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRTdWJDZXJ0aWZpY2F0aW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0SXRlbXMoMCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRTdWJDZXJ0aWZpY2F0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgMCwgMTAsIG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb3BlbnMgYWxlcnQgZGlhbG9nIHdoZW4gZXhjZXB0aW9uIGFuZCBjYWxscyBuYXZpZ2F0aW9uU2VydmljZS5iYWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFN1YkNlcnRpZmljYXRpb25zKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFN1YkNlcnRpZmljYXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0LmlkLCAwLCAxMCwgbnVsbCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuYmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
