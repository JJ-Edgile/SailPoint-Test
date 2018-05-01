System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('RoleProfileDetailDialogService', function () {

                var certificationService = undefined,
                    roleProfileDetailDialogService = undefined,
                    spModal = undefined,
                    $rootScope = undefined,
                    certId = undefined,
                    certItem = undefined,
                    dialogId = 'roleProfileDetailDialog';

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_certificationService_, _roleProfileDetailDialogService_, _spModal_, _$rootScope_) {
                    certificationService = _certificationService_;
                    roleProfileDetailDialogService = _roleProfileDetailDialogService_;
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
                        roleProfileDetailDialogService.showDialog(certId, certItem);
                        expect(spModal.open).toHaveBeenCalled();
                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.id).toBe(dialogId);
                    });
                });

                describe('RoleProfileDetailDialogCtrl', function () {
                    var $controller = undefined;

                    beforeEach(inject(function (_$controller_) {
                        $controller = _$controller_;
                    }));

                    function createCtrl(certId, certItem) {
                        return $controller('RoleProfileDetailDialogCtrl', {
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

                    describe('getRoleProfileDetails()', function () {
                        it('should call through to certification service', function () {
                            var ctrl = createCtrl(certId, certItem);
                            spyOn(certificationService, 'getRoleProfileDetails').and.callFake(angular.noop);
                            ctrl.getRoleProfileDetails();
                            expect(certificationService.getRoleProfileDetails).toHaveBeenCalledWith(certId, certItem);
                        });
                    });

                    describe('isRoleProfileDetailsReady()', function () {
                        it('should return true when role profile is available', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.roleProfileDetails = 'anything';
                            expect(ctrl.isRoleProfileDetailsReady()).toBeTruthy();
                        });

                        it('should return false when identity attributes are unavailable', function () {
                            var ctrl = createCtrl(certId, certItem);
                            ctrl.roleProfileDetails = undefined;
                            expect(ctrl.isRoleProfileDetailsReady()).toBeFalsy();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vUm9sZVByb2ZpbGVEZXRhaWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7OztJQUdqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxrQ0FBa0MsWUFBTTs7Z0JBRTdDLElBQUksdUJBQW9CO29CQUFFLGlDQUE4QjtvQkFBRSxVQUFPO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxXQUFRO29CQUMzRixXQUFXOztnQkFFZixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyx3QkFBd0Isa0NBQWtDLFdBQVcsY0FBaUI7b0JBQ3JHLHVCQUF1QjtvQkFDdkIsaUNBQWlDO29CQUNqQyxVQUFVO29CQUNWLGFBQWE7O29CQUViLFNBQVM7b0JBQ1QsV0FBVzt3QkFDUCxJQUFJOzs7b0JBR1IsTUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTLFFBQVE7OztnQkFHaEQsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsdUJBQXVCLFlBQU07d0JBQzVCLCtCQUErQixXQUFXLFFBQVE7d0JBQ2xELE9BQU8sUUFBUSxNQUFNO3dCQUNyQixJQUFJLFNBQVMsUUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFLO3dCQUNsRCxPQUFPLE9BQU8sSUFBSSxLQUFLOzs7O2dCQUkvQixTQUFTLCtCQUErQixZQUFNO29CQUMxQyxJQUFJLGNBQVc7O29CQUVmLFdBQVcsT0FBTyxVQUFDLGVBQWtCO3dCQUNqQyxjQUFjOzs7b0JBR2xCLFNBQVMsV0FBVyxRQUFRLFVBQVU7d0JBQ2xDLE9BQU8sWUFBWSwrQkFBK0I7NEJBQzlDLGlCQUFpQjs0QkFDakIsbUJBQW1COzs7O29CQUkzQixTQUFTLGdCQUFnQixZQUFNO3dCQUMzQixHQUFHLG1EQUFtRCxZQUFNOzRCQUN4RCxPQUFPLFlBQU07Z0NBQ1QsV0FBVyxXQUFXOytCQUN2Qjs7O3dCQUdQLEdBQUcscURBQXFELFlBQU07NEJBQzFELE9BQU8sWUFBTTtnQ0FDVCxXQUFXLFFBQVE7K0JBQ3BCOzs7O29CQUlYLFNBQVMsMkJBQTJCLFlBQU07d0JBQ3RDLEdBQUcsZ0RBQWdELFlBQU07NEJBQ3JELElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLE1BQU0sc0JBQXNCLHlCQUF5QixJQUFJLFNBQVMsUUFBUTs0QkFDMUUsS0FBSzs0QkFDTCxPQUFPLHFCQUFxQix1QkFBdUIscUJBQXFCLFFBQVE7Ozs7b0JBSXhGLFNBQVMsK0JBQStCLFlBQU07d0JBQzFDLEdBQUcscURBQXFELFlBQU07NEJBQzFELElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLEtBQUsscUJBQXFCOzRCQUMxQixPQUFPLEtBQUssNkJBQTZCOzs7d0JBRzdDLEdBQUcsZ0VBQWdFLFlBQU07NEJBQ3JFLElBQUksT0FBTyxXQUFXLFFBQVE7NEJBQzlCLEtBQUsscUJBQXFCOzRCQUMxQixPQUFPLEtBQUssNkJBQTZCOzs7Ozs7O0dBbUJ0RCIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL1JvbGVQcm9maWxlRGV0YWlsRGlhbG9nU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ1JvbGVQcm9maWxlRGV0YWlsRGlhbG9nU2VydmljZScsICgpID0+IHtcblxuICAgIGxldCBjZXJ0aWZpY2F0aW9uU2VydmljZSwgcm9sZVByb2ZpbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLCBzcE1vZGFsLCAkcm9vdFNjb3BlLCBjZXJ0SWQsIGNlcnRJdGVtLFxuICAgICAgICBkaWFsb2dJZCA9ICdyb2xlUHJvZmlsZURldGFpbERpYWxvZyc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25TZXJ2aWNlXywgX3JvbGVQcm9maWxlRGV0YWlsRGlhbG9nU2VydmljZV8sIF9zcE1vZGFsXywgXyRyb290U2NvcGVfKSA9PiB7XG4gICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25TZXJ2aWNlXztcbiAgICAgICAgcm9sZVByb2ZpbGVEZXRhaWxEaWFsb2dTZXJ2aWNlID0gX3JvbGVQcm9maWxlRGV0YWlsRGlhbG9nU2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgY2VydElkID0gJzEyMyc7XG4gICAgICAgIGNlcnRJdGVtID0ge1xuICAgICAgICAgICAgaWQ6ICczMjEnXG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdyBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIG1vZGVsJywgKCkgPT4ge1xuICAgICAgICAgICAgcm9sZVByb2ZpbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2coY2VydElkLCBjZXJ0SXRlbSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5pZCkudG9CZShkaWFsb2dJZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1JvbGVQcm9maWxlRGV0YWlsRGlhbG9nQ3RybCcsICgpID0+IHtcbiAgICAgICAgbGV0ICRjb250cm9sbGVyO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbnRyb2xsZXJfKSA9PiB7XG4gICAgICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAkY29udHJvbGxlcignUm9sZVByb2ZpbGVEZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JZDogY2VydElkLFxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtOiBjZXJ0SXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmliZSgnY29uc3RydXRjdG9yJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBjZXJ0aWZjaWF0aW9uSWQgaXMgbm90IHN1cHBsaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUN0cmwodW5kZWZpbmVkLCBjZXJ0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgY2VydGlmaWNhdGlvbkl0ZW0gaXMgbm90IHN1cHBsaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUN0cmwoY2VydElkLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ2V0Um9sZVByb2ZpbGVEZXRhaWxzKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uIHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Um9sZVByb2ZpbGVEZXRhaWxzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICAgICAgY3RybC5nZXRSb2xlUHJvZmlsZURldGFpbHMoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Um9sZVByb2ZpbGVEZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaXNSb2xlUHJvZmlsZURldGFpbHNSZWFkeSgpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHJvbGUgcHJvZmlsZSBpcyBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsKGNlcnRJZCwgY2VydEl0ZW0pO1xuICAgICAgICAgICAgICAgIGN0cmwucm9sZVByb2ZpbGVEZXRhaWxzID0gJ2FueXRoaW5nJztcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1JvbGVQcm9maWxlRGV0YWlsc1JlYWR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIGlkZW50aXR5IGF0dHJpYnV0ZXMgYXJlIHVuYXZhaWxhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ3RybChjZXJ0SWQsIGNlcnRJdGVtKTtcbiAgICAgICAgICAgICAgICBjdHJsLnJvbGVQcm9maWxlRGV0YWlscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1JvbGVQcm9maWxlRGV0YWlsc1JlYWR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
