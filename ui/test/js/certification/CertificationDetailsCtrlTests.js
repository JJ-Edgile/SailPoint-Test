System.register(['test/js/TestInitializer', 'certification/CertificationModule', './CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationDetailsCtrl', function () {
                // Use the module.
                beforeEach(module(certificationModule));

                var $controller = undefined,
                    Certification = undefined,
                    certificationTestData = undefined,
                    detailsCtrl = undefined,
                    modalInstance = undefined,
                    certificationDataService = undefined;

                beforeEach(inject(function (_$controller_, _Certification_, _certificationTestData_, _certificationDataService_) {
                    $controller = _$controller_;
                    Certification = _Certification_;
                    certificationTestData = _certificationTestData_;
                    certificationDataService = _certificationDataService_;

                    modalInstance = {
                        close: jasmine.createSpy()
                    };

                    spyOn(certificationDataService, 'getTotalCount').and.returnValue(30);
                    spyOn(certificationDataService, 'getCompleteCount').and.returnValue(10);

                    var cert = new Certification(certificationTestData.CERTIFICATION_1);
                    detailsCtrl = $controller('CertificationDetailsCtrl', {
                        certification: cert,
                        $uibModalInstance: modalInstance
                    });
                }));

                it('should close modal', function () {
                    detailsCtrl.closeDialog();
                    expect(modalInstance.close).toHaveBeenCalled();
                });

                describe('getOwners()', function () {
                    it('should return single owner with only one name', function () {
                        expect(detailsCtrl.getOwners()).toEqual('James.Smith');
                    });

                    it('should return comma delimited string with multiple names', function () {
                        // Add a name to the certifiers list.
                        detailsCtrl.cert.certifiers.push('Peewee.Herman');
                        expect(detailsCtrl.getOwners()).toEqual('James.Smith, Peewee.Herman');
                    });
                });

                describe('getCompletionRatio()', function () {
                    it('should format the ratio', function () {
                        expect(detailsCtrl.getCompletionRatio()).toEqual('10/30');
                    });
                });

                describe('getRemediationRatio()', function () {
                    it('should format the ratio', function () {
                        var data = certificationTestData.CERTIFICATION_1;
                        expect(detailsCtrl.getRemediationRatio()).toEqual(data.remediationsCompleted + '/' + data.remediationsStarted);
                    });
                });

                describe('hasEsig()', function () {
                    it('should return false with no signature', function () {
                        expect(detailsCtrl.hasEsig()).toEqual(false);
                    });

                    it('should return false with signatures but no esig meanings', function () {
                        var cert = new Certification(angular.copy(certificationTestData.CERTIFICATION_SIGNED));
                        delete cert.signoffs[0].esigMeaning;
                        detailsCtrl = $controller('CertificationDetailsCtrl', {
                            certification: cert,
                            $uibModalInstance: modalInstance
                        });

                        expect(detailsCtrl.hasEsig()).toEqual(false);
                    });

                    it('should return true with esig meaning in signature', function () {
                        var cert = new Certification(angular.copy(certificationTestData.CERTIFICATION_SIGNED));
                        detailsCtrl = $controller('CertificationDetailsCtrl', {
                            certification: cert,
                            $uibModalInstance: modalInstance
                        });

                        expect(detailsCtrl.hasEsig()).toEqual(true);
                    });
                });

                describe('getSigners()', function () {
                    it('should return undefined for unsigned cert', function () {
                        expect(detailsCtrl.getSigners()).not.toBeDefined();
                    });

                    it('should return all display names for signers if signed', function () {
                        var cert = new Certification(angular.copy(certificationTestData.CERTIFICATION_SIGNED)),
                            signers = undefined;
                        cert.signoffs.push({
                            signer: {
                                displayName: 'Another Signer',
                                name: 'Signer.One'
                            }
                        });
                        detailsCtrl = $controller('CertificationDetailsCtrl', {
                            certification: cert,
                            $uibModalInstance: modalInstance
                        });

                        signers = detailsCtrl.getSigners();
                        expect(signers).toBeDefined();
                        expect(signers.length).toEqual(cert.signoffs.length);
                        expect(signers[0]).toEqual(cert.signoffs[0].signer.displayName);
                        expect(signers[1]).toEqual(cert.signoffs[1].signer.displayName);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRldGFpbHNDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0QkFBNEIsVUFBVSxTQUFTOzs7SUFHNUg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyw0QkFBNEIsWUFBVzs7Z0JBRTVDLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksY0FBVztvQkFBRSxnQkFBYTtvQkFBRSx3QkFBcUI7b0JBQUUsY0FBVztvQkFBRSxnQkFBYTtvQkFBRSwyQkFBd0I7O2dCQUUzRyxXQUFXLE9BQU8sVUFBUyxlQUFlLGlCQUFpQix5QkFBeUIsNEJBQTRCO29CQUM1RyxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4QiwyQkFBMkI7O29CQUUzQixnQkFBZ0I7d0JBQ1osT0FBTyxRQUFROzs7b0JBR25CLE1BQU0sMEJBQTBCLGlCQUFpQixJQUFJLFlBQVk7b0JBQ2pFLE1BQU0sMEJBQTBCLG9CQUFvQixJQUFJLFlBQVk7O29CQUVwRSxJQUFJLE9BQU8sSUFBSSxjQUFjLHNCQUFzQjtvQkFDbkQsY0FBYyxZQUFZLDRCQUE0Qjt3QkFDbEQsZUFBZTt3QkFDZixtQkFBbUI7Ozs7Z0JBSTNCLEdBQUcsc0JBQXNCLFlBQVc7b0JBQ2hDLFlBQVk7b0JBQ1osT0FBTyxjQUFjLE9BQU87OztnQkFHaEMsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELE9BQU8sWUFBWSxhQUFhLFFBQVE7OztvQkFHNUMsR0FBRyw0REFBNEQsWUFBVzs7d0JBRXRFLFlBQVksS0FBSyxXQUFXLEtBQUs7d0JBQ2pDLE9BQU8sWUFBWSxhQUFhLFFBQVE7Ozs7Z0JBSWhELFNBQVMsd0JBQXdCLFlBQVc7b0JBQ3hDLEdBQUcsMkJBQTJCLFlBQVc7d0JBQ3JDLE9BQU8sWUFBWSxzQkFBc0IsUUFBUTs7OztnQkFJekQsU0FBUyx5QkFBeUIsWUFBVztvQkFDekMsR0FBRywyQkFBMkIsWUFBVzt3QkFDckMsSUFBSSxPQUFPLHNCQUFzQjt3QkFDakMsT0FBTyxZQUFZLHVCQUNkLFFBQVEsS0FBSyx3QkFBd0IsTUFBTSxLQUFLOzs7O2dCQUk3RCxTQUFTLGFBQWEsWUFBTTtvQkFDeEIsR0FBRyx5Q0FBeUMsWUFBTTt3QkFDOUMsT0FBTyxZQUFZLFdBQVcsUUFBUTs7O29CQUcxQyxHQUFHLDREQUE0RCxZQUFNO3dCQUNqRSxJQUFJLE9BQU8sSUFBSSxjQUFjLFFBQVEsS0FBSyxzQkFBc0I7d0JBQ2hFLE9BQU8sS0FBSyxTQUFTLEdBQUc7d0JBQ3hCLGNBQWMsWUFBWSw0QkFBNEI7NEJBQ2xELGVBQWU7NEJBQ2YsbUJBQW1COzs7d0JBR3ZCLE9BQU8sWUFBWSxXQUFXLFFBQVE7OztvQkFHMUMsR0FBRyxxREFBcUQsWUFBTTt3QkFDMUQsSUFBSSxPQUFPLElBQUksY0FBYyxRQUFRLEtBQUssc0JBQXNCO3dCQUNoRSxjQUFjLFlBQVksNEJBQTRCOzRCQUNsRCxlQUFlOzRCQUNmLG1CQUFtQjs7O3dCQUd2QixPQUFPLFlBQVksV0FBVyxRQUFROzs7O2dCQUk5QyxTQUFTLGdCQUFnQixZQUFNO29CQUMzQixHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxPQUFPLFlBQVksY0FBYyxJQUFJOzs7b0JBR3pDLEdBQUcseURBQXlELFlBQU07d0JBQzlELElBQUksT0FBTyxJQUFJLGNBQWMsUUFBUSxLQUFLLHNCQUFzQjs0QkFDNUQsVUFBTzt3QkFDWCxLQUFLLFNBQVMsS0FBSzs0QkFDZixRQUFRO2dDQUNKLGFBQWE7Z0NBQ2IsTUFBTTs7O3dCQUdkLGNBQWMsWUFBWSw0QkFBNEI7NEJBQ2xELGVBQWU7NEJBQ2YsbUJBQW1COzs7d0JBR3ZCLFVBQVUsWUFBWTt3QkFDdEIsT0FBTyxTQUFTO3dCQUNoQixPQUFPLFFBQVEsUUFBUSxRQUFRLEtBQUssU0FBUzt3QkFDN0MsT0FBTyxRQUFRLElBQUksUUFBUSxLQUFLLFNBQVMsR0FBRyxPQUFPO3dCQUNuRCxPQUFPLFFBQVEsSUFBSSxRQUFRLEtBQUssU0FBUyxHQUFHLE9BQU87Ozs7OztHQWdCNUQiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRGV0YWlsc0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25EZXRhaWxzQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFVzZSB0aGUgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGxldCAkY29udHJvbGxlciwgQ2VydGlmaWNhdGlvbiwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBkZXRhaWxzQ3RybCwgbW9kYWxJbnN0YW5jZSwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX0NlcnRpZmljYXRpb25fLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uID0gX0NlcnRpZmljYXRpb25fO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XG5cbiAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgIGNsb3NlOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0VG90YWxDb3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgzMCk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENvbXBsZXRlQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoMTApO1xuXG4gICAgICAgIGxldCBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG4gICAgICAgIGRldGFpbHNDdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25EZXRhaWxzQ3RybCcsIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb246IGNlcnQsXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogbW9kYWxJbnN0YW5jZVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIGNsb3NlIG1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRldGFpbHNDdHJsLmNsb3NlRGlhbG9nKCk7XG4gICAgICAgIGV4cGVjdChtb2RhbEluc3RhbmNlLmNsb3NlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0T3duZXJzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc2luZ2xlIG93bmVyIHdpdGggb25seSBvbmUgbmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGRldGFpbHNDdHJsLmdldE93bmVycygpKS50b0VxdWFsKCdKYW1lcy5TbWl0aCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb21tYSBkZWxpbWl0ZWQgc3RyaW5nIHdpdGggbXVsdGlwbGUgbmFtZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIEFkZCBhIG5hbWUgdG8gdGhlIGNlcnRpZmllcnMgbGlzdC5cbiAgICAgICAgICAgIGRldGFpbHNDdHJsLmNlcnQuY2VydGlmaWVycy5wdXNoKCdQZWV3ZWUuSGVybWFuJyk7XG4gICAgICAgICAgICBleHBlY3QoZGV0YWlsc0N0cmwuZ2V0T3duZXJzKCkpLnRvRXF1YWwoJ0phbWVzLlNtaXRoLCBQZWV3ZWUuSGVybWFuJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENvbXBsZXRpb25SYXRpbygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZm9ybWF0IHRoZSByYXRpbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGRldGFpbHNDdHJsLmdldENvbXBsZXRpb25SYXRpbygpKS50b0VxdWFsKCcxMC8zMCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZW1lZGlhdGlvblJhdGlvKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBmb3JtYXQgdGhlIHJhdGlvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzE7XG4gICAgICAgICAgICBleHBlY3QoZGV0YWlsc0N0cmwuZ2V0UmVtZWRpYXRpb25SYXRpbygpKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKGRhdGEucmVtZWRpYXRpb25zQ29tcGxldGVkICsgJy8nICsgZGF0YS5yZW1lZGlhdGlvbnNTdGFydGVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzRXNpZygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aXRoIG5vIHNpZ25hdHVyZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChkZXRhaWxzQ3RybC5oYXNFc2lnKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aXRoIHNpZ25hdHVyZXMgYnV0IG5vIGVzaWcgbWVhbmluZ3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGFuZ3VsYXIuY29weShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9TSUdORUQpKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjZXJ0LnNpZ25vZmZzWzBdLmVzaWdNZWFuaW5nO1xuICAgICAgICAgICAgZGV0YWlsc0N0cmwgPSAkY29udHJvbGxlcignQ2VydGlmaWNhdGlvbkRldGFpbHNDdHJsJywge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb246IGNlcnQsXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6IG1vZGFsSW5zdGFuY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QoZGV0YWlsc0N0cmwuaGFzRXNpZygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aXRoIGVzaWcgbWVhbmluZyBpbiBzaWduYXR1cmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGFuZ3VsYXIuY29weShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9TSUdORUQpKTtcbiAgICAgICAgICAgIGRldGFpbHNDdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25EZXRhaWxzQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uOiBjZXJ0LFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiBtb2RhbEluc3RhbmNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGRldGFpbHNDdHJsLmhhc0VzaWcoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0U2lnbmVycygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB1bmRlZmluZWQgZm9yIHVuc2lnbmVkIGNlcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoZGV0YWlsc0N0cmwuZ2V0U2lnbmVycygpKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYWxsIGRpc3BsYXkgbmFtZXMgZm9yIHNpZ25lcnMgaWYgc2lnbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnQgPSBuZXcgQ2VydGlmaWNhdGlvbihhbmd1bGFyLmNvcHkoY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fU0lHTkVEKSksXG4gICAgICAgICAgICAgICAgc2lnbmVycztcbiAgICAgICAgICAgIGNlcnQuc2lnbm9mZnMucHVzaCh7XG4gICAgICAgICAgICAgICAgc2lnbmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQW5vdGhlciBTaWduZXInLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU2lnbmVyLk9uZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRldGFpbHNDdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25EZXRhaWxzQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uOiBjZXJ0LFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiBtb2RhbEluc3RhbmNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2lnbmVycyA9IGRldGFpbHNDdHJsLmdldFNpZ25lcnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChzaWduZXJzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNpZ25lcnMubGVuZ3RoKS50b0VxdWFsKGNlcnQuc2lnbm9mZnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGV4cGVjdChzaWduZXJzWzBdKS50b0VxdWFsKGNlcnQuc2lnbm9mZnNbMF0uc2lnbmVyLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChzaWduZXJzWzFdKS50b0VxdWFsKGNlcnQuc2lnbm9mZnNbMV0uc2lnbmVyLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
