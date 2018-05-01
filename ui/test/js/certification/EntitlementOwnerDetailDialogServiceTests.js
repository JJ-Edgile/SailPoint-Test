System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('EntitlementOwnerDetailDialogService', function () {

                var certificationService = undefined,
                    entitlementOwnerDetailDialogService = undefined,
                    spModal = undefined,
                    $rootScope = undefined,
                    certId = undefined,
                    certItem = undefined,
                    title = 'ui_cert_ent_owner_detail_dialog_title';

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_certificationService_, _entitlementOwnerDetailDialogService_, _spModal_, _$rootScope_) {
                    certificationService = _certificationService_;
                    entitlementOwnerDetailDialogService = _entitlementOwnerDetailDialogService_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;

                    certId = '123';
                    certItem = {
                        id: '321'
                    };

                    spyOn(spModal, 'open').and.callFake(angular.noop);
                }));

                describe('show dialog', function () {
                    it('should open a model', function () {
                        entitlementOwnerDetailDialogService.showDialog(certId, certItem);
                        expect(spModal.open).toHaveBeenCalled();
                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.title).toBe(title);
                    });
                });

                describe('EntitlementOwnerDetailDialogCtrl', function () {
                    var $controller = undefined,
                        start = 0,
                        limit = 5;

                    beforeEach(inject(function (_$controller_) {
                        $controller = _$controller_;
                    }));

                    function createCtrl(certId, certItem) {
                        return $controller('EntitlementOwnerDetailDialogCtrl', {
                            certificationId: certId,
                            certificationItem: certItem
                        });
                    }

                    describe('construtctor', function () {
                        it('should throw if certifciationId is not supplied', function () {
                            expect(function () {
                                createCtrl(undefined, certItem);
                            }).toThrow();
                        });

                        it('should throw if certificationItem is not supplied', function () {
                            expect(function () {
                                createCtrl(certId, undefined);
                            }).toThrow();
                        });
                    });

                    describe('getAccountDetails()', function () {
                        it('should call through to certification service', function () {
                            var ctrl = createCtrl(certId, certItem);
                            spyOn(certificationService, 'getAccountDetails').and.callFake(angular.noop);
                            ctrl.getAccountDetails();
                            expect(certificationService.getAccountDetails).toHaveBeenCalledWith(certId, certItem.id);
                        });
                    });

                    describe('getLinkAttributes()', function () {
                        it('should call through to certification service', function () {
                            var ctrl = createCtrl(certId, certItem);
                            spyOn(certificationService, 'getIdentityAttributes').and.callFake(angular.noop);
                            ctrl.getIdentityAttributes();
                            expect(certificationService.getIdentityAttributes).toHaveBeenCalledWith(certId, certItem.id);
                        });
                    });

                    describe('getLinkAttributes()', function () {
                        it('should call through to certification service', function () {
                            var ctrl = createCtrl(certId, certItem);
                            spyOn(certificationService, 'getLinkAttributes').and.callFake(angular.noop);
                            ctrl.getLinkAttributes(start, limit);
                            expect(certificationService.getLinkAttributes).toHaveBeenCalledWith(certId, certItem.id, start, limit);
                        });
                    });

                    describe('isIdentityDetailsReady()', function () {
                        it('should return true when identity attributes are available', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.identityAttributes = [];
                            expect(ctrl.isIdentityDetailsReady()).toBeTruthy();
                        });

                        it('should return false when identity attributes are unavailable', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.identityAttributes = undefined;
                            expect(ctrl.isIdentityDetailsReady()).toBeFalsy();
                        });
                    });

                    describe('isAccountDetailsReady()', function () {
                        it('should return true when identity attributes are available', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.account = {};
                            expect(ctrl.isAccountDetailsReady()).toBeTruthy();
                        });

                        it('should return false when identity attributes are unavailable', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.account = undefined;
                            expect(ctrl.isAccountDetailsReady()).toBeFalsy();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vRW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7O0lBR2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLHVDQUF1QyxZQUFNOztnQkFFbEQsSUFBSSx1QkFBb0I7b0JBQUUsc0NBQW1DO29CQUFFLFVBQU87b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLFdBQVE7b0JBQ2hHLFFBQVE7O2dCQUVaLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHdCQUF3Qix1Q0FBdUMsV0FBVyxjQUFpQjtvQkFDMUcsdUJBQXVCO29CQUN2QixzQ0FBc0M7b0JBQ3RDLFVBQVU7b0JBQ1YsYUFBYTs7b0JBRWIsU0FBUztvQkFDVCxXQUFXO3dCQUNQLElBQUk7OztvQkFHUixNQUFNLFNBQVMsUUFBUSxJQUFJLFNBQVMsUUFBUTs7O2dCQUdoRCxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsb0NBQW9DLFdBQVcsUUFBUTt3QkFDdkQsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLElBQUksU0FBUyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUs7d0JBQ2xELE9BQU8sT0FBTyxPQUFPLEtBQUs7Ozs7Z0JBSWxDLFNBQVMsb0NBQW9DLFlBQU07b0JBQy9DLElBQUksY0FBVzt3QkFDWCxRQUFRO3dCQUNSLFFBQVE7O29CQUVaLFdBQVcsT0FBTyxVQUFDLGVBQWtCO3dCQUNqQyxjQUFjOzs7b0JBR2xCLFNBQVMsV0FBVyxRQUFRLFVBQVU7d0JBQ2xDLE9BQU8sWUFBWSxvQ0FBb0M7NEJBQ25ELGlCQUFpQjs0QkFDakIsbUJBQW1COzs7O29CQUkzQixTQUFTLGdCQUFnQixZQUFNO3dCQUMzQixHQUFHLG1EQUFtRCxZQUFNOzRCQUN4RCxPQUFPLFlBQU07Z0NBQ1QsV0FBVyxXQUFXOytCQUN2Qjs7O3dCQUdQLEdBQUcscURBQXFELFlBQU07NEJBQzFELE9BQU8sWUFBTTtnQ0FDVCxXQUFXLFFBQVE7K0JBQ3BCOzs7O29CQUlYLFNBQVMsdUJBQXVCLFlBQU07d0JBQ2xDLEdBQUcsZ0RBQWdELFlBQU07NEJBQ3JELElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLE1BQU0sc0JBQXNCLHFCQUFxQixJQUFJLFNBQVMsUUFBUTs0QkFDdEUsS0FBSzs0QkFDTCxPQUFPLHFCQUFxQixtQkFBbUIscUJBQXFCLFFBQVEsU0FBUzs7OztvQkFJN0YsU0FBUyx1QkFBdUIsWUFBTTt3QkFDbEMsR0FBRyxnREFBZ0QsWUFBTTs0QkFDckQsSUFBSSxPQUFPLFdBQVcsUUFBUTs0QkFDOUIsTUFBTSxzQkFBc0IseUJBQXlCLElBQUksU0FBUyxRQUFROzRCQUMxRSxLQUFLOzRCQUNMLE9BQU8scUJBQXFCLHVCQUF1QixxQkFBcUIsUUFBUSxTQUFTOzs7O29CQUlqRyxTQUFTLHVCQUF1QixZQUFNO3dCQUNsQyxHQUFHLGdEQUFnRCxZQUFNOzRCQUNyRCxJQUFJLE9BQU8sV0FBVyxRQUFROzRCQUM5QixNQUFNLHNCQUFzQixxQkFBcUIsSUFBSSxTQUFTLFFBQVE7NEJBQ3RFLEtBQUssa0JBQWtCLE9BQU87NEJBQzlCLE9BQU8scUJBQXFCLG1CQUFtQixxQkFBcUIsUUFBUSxTQUFTLElBQUksT0FBTzs7OztvQkFJeEcsU0FBUyw0QkFBNEIsWUFBTTt3QkFDdkMsR0FBRyw2REFBNkQsWUFBTTs0QkFDbEUsSUFBSSxPQUFPLFdBQVcsUUFBUTs0QkFDOUIsS0FBSyxxQkFBcUI7NEJBQzFCLE9BQU8sS0FBSywwQkFBMEI7Ozt3QkFHMUMsR0FBRyxnRUFBZ0UsWUFBTTs0QkFDckUsSUFBSSxPQUFPLFdBQVcsUUFBUTs0QkFDOUIsS0FBSyxxQkFBcUI7NEJBQzFCLE9BQU8sS0FBSywwQkFBMEI7Ozs7b0JBSTlDLFNBQVMsMkJBQTJCLFlBQU07d0JBQ3RDLEdBQUcsNkRBQTZELFlBQU07NEJBQ2xFLElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLEtBQUssVUFBVTs0QkFDZixPQUFPLEtBQUsseUJBQXlCOzs7d0JBR3pDLEdBQUcsZ0VBQWdFLFlBQU07NEJBQ3JFLElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLEtBQUssVUFBVTs0QkFDZixPQUFPLEtBQUsseUJBQXlCOzs7Ozs7O0dBbUJsRCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0VudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnRW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICBsZXQgY2VydGlmaWNhdGlvblNlcnZpY2UsIGVudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2dTZXJ2aWNlLCBzcE1vZGFsLCAkcm9vdFNjb3BlLCBjZXJ0SWQsIGNlcnRJdGVtLFxuICAgICAgICB0aXRsZSA9ICd1aV9jZXJ0X2VudF9vd25lcl9kZXRhaWxfZGlhbG9nX3RpdGxlJztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvblNlcnZpY2VfLCBfZW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2VfLCBfc3BNb2RhbF8sIF8kcm9vdFNjb3BlXykgPT4ge1xuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIGVudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2dTZXJ2aWNlID0gX2VudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2dTZXJ2aWNlXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcblxuICAgICAgICBjZXJ0SWQgPSAnMTIzJztcbiAgICAgICAgY2VydEl0ZW0gPSB7XG4gICAgICAgICAgICBpZDogJzMyMSdcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdzaG93IGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgbW9kZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBlbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcudGl0bGUpLnRvQmUodGl0bGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdFbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nQ3RybCcsICgpID0+IHtcbiAgICAgICAgbGV0ICRjb250cm9sbGVyLFxuICAgICAgICAgICAgc3RhcnQgPSAwLFxuICAgICAgICAgICAgbGltaXQgPSA1O1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfKSA9PiB7XG4gICAgICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAkY29udHJvbGxlcignRW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbklkOiBjZXJ0SWQsXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW06IGNlcnRJdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaWJlKCdjb25zdHJ1dGN0b3InLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIGNlcnRpZmNpYXRpb25JZCBpcyBub3Qgc3VwcGxpZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ3RybCh1bmRlZmluZWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBjZXJ0aWZpY2F0aW9uSXRlbSBpcyBub3Qgc3VwcGxpZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ3RybChjZXJ0SWQsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRBY2NvdW50RGV0YWlscygpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gY2VydGlmaWNhdGlvbiBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ3RybChjZXJ0SWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldEFjY291bnREZXRhaWxzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICAgICAgY3RybC5nZXRBY2NvdW50RGV0YWlscygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRBY2NvdW50RGV0YWlscykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydElkLCBjZXJ0SXRlbS5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2dldExpbmtBdHRyaWJ1dGVzKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0SWRlbnRpdHlBdHRyaWJ1dGVzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICAgICAgY3RybC5nZXRJZGVudGl0eUF0dHJpYnV0ZXMoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0SWRlbnRpdHlBdHRyaWJ1dGVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGNlcnRJdGVtLmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ2V0TGlua0F0dHJpYnV0ZXMoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGNlcnRpZmljYXRpb24gc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUN0cmwoY2VydElkLCBjZXJ0SXRlbSk7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXRMaW5rQXR0cmlidXRlcycpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgICAgIGN0cmwuZ2V0TGlua0F0dHJpYnV0ZXMoc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0TGlua0F0dHJpYnV0ZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJZCwgY2VydEl0ZW0uaWQsIHN0YXJ0LCBsaW1pdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2lzSWRlbnRpdHlEZXRhaWxzUmVhZHkoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBpZGVudGl0eSBhdHRyaWJ1dGVzIGFyZSBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIGN0cmwuaWRlbnRpdHlBdHRyaWJ1dGVzID0gW107XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eURldGFpbHNSZWFkeSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBpZGVudGl0eSBhdHRyaWJ1dGVzIGFyZSB1bmF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUN0cmwoY2VydElkLCBjZXJ0SXRlbSk7XG4gICAgICAgICAgICAgICAgY3RybC5pZGVudGl0eUF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eURldGFpbHNSZWFkeSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaXNBY2NvdW50RGV0YWlsc1JlYWR5KCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gaWRlbnRpdHkgYXR0cmlidXRlcyBhcmUgYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ3RybChjZXJ0SWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgICAgICBjdHJsLmFjY291bnQgPSB7fTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0FjY291bnREZXRhaWxzUmVhZHkoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gaWRlbnRpdHkgYXR0cmlidXRlcyBhcmUgdW5hdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIGN0cmwuYWNjb3VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0FjY291bnREZXRhaWxzUmVhZHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
