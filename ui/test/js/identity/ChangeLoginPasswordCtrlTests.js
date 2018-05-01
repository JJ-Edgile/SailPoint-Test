System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ChangeLoginPasswordCtrl', function () {
                var ctrl = undefined,
                    deferredPolicy = undefined,
                    deferredSubmit = undefined,
                    $scope = undefined,
                    changeLoginPasswordDataService = undefined,
                    changeLoginPasswordService = undefined,
                    spNotificationService = undefined,
                    password = 'password',
                    notPassword = 'notPassword',
                    identityId = 'someid',
                    quickLink = 'View Identity';

                beforeEach(module(identityModule, testModule));

                beforeEach(inject(function (_changeLoginPasswordService_, _changeLoginPasswordDataService_, _spNotificationService_, _$controller_, _$q_, _$rootScope_) {
                    var $stateParams = {
                        identityId: identityId,
                        quickLink: quickLink
                    };
                    changeLoginPasswordService = _changeLoginPasswordService_;
                    changeLoginPasswordDataService = _changeLoginPasswordDataService_;
                    spNotificationService = _spNotificationService_;
                    $scope = _$rootScope_;
                    deferredPolicy = _$q_.defer();
                    deferredSubmit = _$q_.defer();
                    spyOn(changeLoginPasswordService, 'getLoginPasswordPolicy').and.returnValue(deferredPolicy.promise);
                    spyOn(changeLoginPasswordService, 'submitPasswordChange').and.returnValue(deferredSubmit.promise);

                    ctrl = _$controller_('ChangeLoginPasswordCtrl', {
                        changeLoginPasswordService: changeLoginPasswordService,
                        changeLoginPasswordDataService: changeLoginPasswordDataService,
                        $stateParams: $stateParams
                    });
                }));

                describe('isSubmittable', function () {
                    it('should return false when password fields are empty and not require reset selected', function () {
                        expect(ctrl.isSubmittable()).toBeFalsy();
                    });

                    it('should return true when password fields are empty and require reset selected', function () {
                        ctrl.changeLoginData.isRequireResetSelected = true;
                        expect(ctrl.isSubmittable()).toBeTruthy();
                    });

                    it('should return false when password fields do not match and not require reset selected', function () {
                        ctrl.changeLoginData.password = 'something';
                        expect(ctrl.isSubmittable()).toBeFalsy();
                    });

                    it('should return false when password fields do not match and require reset selected', function () {
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.isRequireResetSelected = true;
                        expect(ctrl.isSubmittable()).toBeFalsy();
                    });

                    it('should return false when password validation error when require reset not selected', function () {
                        spyOn(ctrl, 'hasPasswordMatchErrors').and.returnValue(true);
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.confirmPassword = notPassword;
                        expect(ctrl.isSubmittable()).toBeFalsy();
                    });

                    it('should return false when password validation error when require reset selected', function () {
                        spyOn(ctrl, 'hasPasswordMatchErrors').and.returnValue(true);
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.confirmPassword = notPassword;
                        ctrl.changeLoginData.isRequireResetSelected = true;
                        expect(ctrl.isSubmittable()).toBeFalsy();
                    });

                    it('should return true when no password validation error and require reset selected', function () {
                        spyOn(ctrl, 'hasPasswordMatchErrors').and.returnValue(false);
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.confirmPassword = password;
                        ctrl.changeLoginData.isRequireResetSelected = true;
                        expect(ctrl.isSubmittable()).toBeTruthy();
                    });

                    it('should return true when no password validation error and require reset not selected', function () {
                        spyOn(ctrl, 'hasPasswordMatchErrors').and.returnValue(false);
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.confirmPassword = password;
                        expect(ctrl.isSubmittable()).toBeTruthy();
                    });
                });

                describe('arePasswordFieldsDirty', function () {
                    it('should return true if both password and confirm fields have values', function () {
                        ctrl.changeLoginData.password = password;
                        ctrl.changeLoginData.confirmPassword = notPassword;
                        expect(ctrl.arePasswordFieldsDirty()).toBeTruthy();
                    });

                    it('should return false if both password and confirm fields are empty', function () {
                        expect(ctrl.arePasswordFieldsDirty()).toBeFalsy();
                    });

                    it('should return false if password field is empty', function () {
                        ctrl.changeLoginData.password = password;
                        expect(ctrl.arePasswordFieldsDirty()).toBeFalsy();
                    });

                    it('should return false if confirm password field is empty', function () {
                        ctrl.changeLoginData.confirmPassword = password;
                        expect(ctrl.arePasswordFieldsDirty()).toBeFalsy();
                    });
                });

                describe('toggleRequireReset', function () {
                    it('should toggle the isRequireResetSelected', function () {
                        expect(ctrl.isRequireReset()).toBeFalsy();
                        ctrl.toggleRequireReset();
                        expect(ctrl.isRequireReset()).toBeTruthy();
                        ctrl.toggleRequireReset();
                        expect(ctrl.isRequireReset()).toBeFalsy();
                    });
                });

                describe('isDirty', function () {
                    it('should call through to changeLoginPasswordDataService', function () {
                        var expected = false,
                            actual = undefined;
                        spyOn(changeLoginPasswordDataService, 'isDirty').and.returnValue(expected);
                        actual = ctrl.isDirty();

                        expect(changeLoginPasswordDataService.isDirty).toHaveBeenCalled();
                        expect(actual).toBe(expected);
                    });
                });

                describe('hasPasswordPolicy', function () {
                    it('return false if no constraints in policy', function () {
                        deferredPolicy.resolve([]);
                        $scope.$apply();
                        expect(ctrl.hasPasswordPolicy()).toBeFalsy();
                    });

                    it('return true if policy has constraints', function () {
                        deferredPolicy.resolve(['some constraint']);
                        $scope.$apply();
                        expect(ctrl.hasPasswordPolicy()).toBeTruthy();
                    });
                });

                describe('shouldShowPolicy', function () {
                    it('should return true if there is a policy and no violations', function () {
                        deferredPolicy.resolve(['blah blah blah']);
                        $scope.$apply();
                        expect(ctrl.shouldShowPolicy()).toBeTruthy();
                    });

                    it('should return false if there is no policy', function () {
                        deferredPolicy.resolve([]);
                        $scope.$apply();
                        expect(ctrl.hasPasswordPolicy()).toBeFalsy();
                    });

                    it('should return false if there is a policy and violations', function () {
                        deferredPolicy.resolve(['whateves']);
                        ctrl.constraintErrors = ['something wrong'];
                        $scope.$apply();
                        expect(ctrl.shouldShowPolicy()).toBeFalsy();
                    });
                });

                describe('hasConstraintErrors', function () {
                    it('should return true if there are constraint errors', function () {
                        ctrl.constraintErrors = ['something wrong'];
                        expect(ctrl.hasConstraintErrors()).toBeTruthy();
                    });

                    it('should return false if there are no constraint errors', function () {
                        ctrl.constraintErrors = [];
                        expect(ctrl.hasConstraintErrors()).toBeFalsy();
                    });
                });

                describe('submitPasswordChange', function () {
                    var WorkflowResultItem = undefined;

                    beforeEach(inject(function (_WorkflowResultItem_) {
                        WorkflowResultItem = _WorkflowResultItem_;
                    }));

                    it('should call through to changeLoginPasswordService.submitPasswordChange', function () {
                        changeLoginPasswordDataService.changeLoginData.password = password;
                        changeLoginPasswordDataService.changeLoginData.confirmPassword = password;
                        ctrl.submitPasswordChange();
                        expect(changeLoginPasswordService.submitPasswordChange).toHaveBeenCalledWith(identityId, quickLink, password, false);
                    });

                    it('should set constraint errors on reject', function () {
                        var expectedErrors = ['error 1', 'error 2'];
                        deferredSubmit.reject({ messages: expectedErrors });
                        ctrl.submitPasswordChange();
                        $scope.$apply();
                        expect(ctrl.constraintErrors).toBe(expectedErrors);
                    });

                    it('should clear constraint errors on resolve', function () {
                        ctrl.constraintErrors = ['something'];
                        deferredSubmit.resolve(new WorkflowResultItem({}));
                        ctrl.submitPasswordChange();
                        $scope.$apply();
                        expect(ctrl.constraintErrors).toBe(null);
                    });

                    it('should notify on resolve', function () {
                        deferredSubmit.resolve(new WorkflowResultItem({}));
                        spyOn(spNotificationService, 'addNotification');
                        spyOn(spNotificationService, 'triggerDirective');
                        ctrl.submitPasswordChange();
                        $scope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalled();
                        expect(spNotificationService.triggerDirective).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NoYW5nZUxvZ2luUGFzc3dvcmRDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSTdHOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsMkJBQTJCLFlBQVc7Z0JBQzNDLElBQUksT0FBSTtvQkFBRSxpQkFBYztvQkFBRSxpQkFBYztvQkFDcEMsU0FBTTtvQkFBRSxpQ0FBOEI7b0JBQUUsNkJBQTBCO29CQUFFLHdCQUFxQjtvQkFDekYsV0FBVztvQkFDWCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsWUFBWTs7Z0JBRWhCLFdBQVcsT0FBTyxnQkFBZ0I7O2dCQUVsQyxXQUFXLE9BQU8sVUFBUyw4QkFBOEIsa0NBQWtDLHlCQUNoRSxlQUFlLE1BQU0sY0FBYztvQkFDMUQsSUFBSSxlQUFlO3dCQUNmLFlBQVk7d0JBQ1osV0FBVzs7b0JBRWYsNkJBQTZCO29CQUM3QixpQ0FBaUM7b0JBQ2pDLHdCQUF3QjtvQkFDeEIsU0FBUztvQkFDVCxpQkFBaUIsS0FBSztvQkFDdEIsaUJBQWlCLEtBQUs7b0JBQ3RCLE1BQU0sNEJBQTRCLDBCQUEwQixJQUFJLFlBQVksZUFBZTtvQkFDM0YsTUFBTSw0QkFBNEIsd0JBQXdCLElBQUksWUFBWSxlQUFlOztvQkFFekYsT0FBTyxjQUFjLDJCQUEyQjt3QkFDNUMsNEJBQTRCO3dCQUM1QixnQ0FBZ0M7d0JBQ2hDLGNBQWM7Ozs7Z0JBSXRCLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcscUZBQXFGLFlBQVc7d0JBQy9GLE9BQU8sS0FBSyxpQkFBaUI7OztvQkFH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dUJBQXVCO3dCQUM3QixLQUFLO3dCQUNMLE9BQU87d0JBQ1AsT0FBTyxzQkFBc0IsaUJBQWlCO3dCQUM5QyxPQUFPLHNCQUFzQixrQkFBa0I7Ozs7OztHQWlCeEQiLCJmaWxlIjoiaWRlbnRpdHkvQ2hhbmdlTG9naW5QYXNzd29yZEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDaGFuZ2VMb2dpblBhc3N3b3JkQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBjdHJsLCBkZWZlcnJlZFBvbGljeSwgZGVmZXJyZWRTdWJtaXQsXG4gICAgICAgICRzY29wZSwgY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLCBjaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZSwgc3BOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwYXNzd29yZCA9ICdwYXNzd29yZCcsXG4gICAgICAgIG5vdFBhc3N3b3JkID0gJ25vdFBhc3N3b3JkJyxcbiAgICAgICAgaWRlbnRpdHlJZCA9ICdzb21laWQnLFxuICAgICAgICBxdWlja0xpbmsgPSAnVmlldyBJZGVudGl0eSc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2NoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlXywgX2NoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kY29udHJvbGxlcl8sIF8kcV8sIF8kcm9vdFNjb3BlXykge1xuICAgICAgICBsZXQgJHN0YXRlUGFyYW1zID0ge1xuICAgICAgICAgICAgaWRlbnRpdHlJZDogaWRlbnRpdHlJZCxcbiAgICAgICAgICAgIHF1aWNrTGluazogcXVpY2tMaW5rXG4gICAgICAgIH07XG4gICAgICAgIGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlID0gX2NoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlID0gX2NoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZV87XG4gICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIGRlZmVycmVkUG9saWN5ID0gXyRxXy5kZWZlcigpO1xuICAgICAgICBkZWZlcnJlZFN1Ym1pdCA9IF8kcV8uZGVmZXIoKTtcbiAgICAgICAgc3B5T24oY2hhbmdlTG9naW5QYXNzd29yZFNlcnZpY2UsICdnZXRMb2dpblBhc3N3b3JkUG9saWN5JykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkUG9saWN5LnByb21pc2UpO1xuICAgICAgICBzcHlPbihjaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZSwgJ3N1Ym1pdFBhc3N3b3JkQ2hhbmdlJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkU3VibWl0LnByb21pc2UpO1xuXG4gICAgICAgIGN0cmwgPSBfJGNvbnRyb2xsZXJfKCdDaGFuZ2VMb2dpblBhc3N3b3JkQ3RybCcsIHtcbiAgICAgICAgICAgIGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlOiBjaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZSxcbiAgICAgICAgICAgIGNoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZTogY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXNcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2lzU3VibWl0dGFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBwYXNzd29yZCBmaWVsZHMgYXJlIGVtcHR5IGFuZCBub3QgcmVxdWlyZSByZXNldCBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdWJtaXR0YWJsZSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHBhc3N3b3JkIGZpZWxkcyBhcmUgZW1wdHkgYW5kIHJlcXVpcmUgcmVzZXQgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLmlzUmVxdWlyZVJlc2V0U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdWJtaXR0YWJsZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGFzc3dvcmQgZmllbGRzIGRvIG5vdCBtYXRjaCBhbmQgbm90IHJlcXVpcmUgcmVzZXQgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLnBhc3N3b3JkID0gJ3NvbWV0aGluZyc7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Ym1pdHRhYmxlKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHBhc3N3b3JkIGZpZWxkcyBkbyBub3QgbWF0Y2ggYW5kIHJlcXVpcmUgcmVzZXQgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICBjdHJsLmNoYW5nZUxvZ2luRGF0YS5pc1JlcXVpcmVSZXNldFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3VibWl0dGFibGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGFzc3dvcmQgdmFsaWRhdGlvbiBlcnJvciB3aGVuIHJlcXVpcmUgcmVzZXQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaGFzUGFzc3dvcmRNYXRjaEVycm9ycycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICBjdHJsLmNoYW5nZUxvZ2luRGF0YS5jb25maXJtUGFzc3dvcmQgPSBub3RQYXNzd29yZDtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3VibWl0dGFibGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGFzc3dvcmQgdmFsaWRhdGlvbiBlcnJvciB3aGVuIHJlcXVpcmUgcmVzZXQgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNQYXNzd29yZE1hdGNoRXJyb3JzJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLmNvbmZpcm1QYXNzd29yZCA9IG5vdFBhc3N3b3JkO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEuaXNSZXF1aXJlUmVzZXRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Ym1pdHRhYmxlKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gbm8gcGFzc3dvcmQgdmFsaWRhdGlvbiBlcnJvciBhbmQgcmVxdWlyZSByZXNldCBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2hhc1Bhc3N3b3JkTWF0Y2hFcnJvcnMnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLmNvbmZpcm1QYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEuaXNSZXF1aXJlUmVzZXRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Ym1pdHRhYmxlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIG5vIHBhc3N3b3JkIHZhbGlkYXRpb24gZXJyb3IgYW5kIHJlcXVpcmUgcmVzZXQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaGFzUGFzc3dvcmRNYXRjaEVycm9ycycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBjdHJsLmNoYW5nZUxvZ2luRGF0YS5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEuY29uZmlybVBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Ym1pdHRhYmxlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXJlUGFzc3dvcmRGaWVsZHNEaXJ0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGJvdGggcGFzc3dvcmQgYW5kIGNvbmZpcm0gZmllbGRzIGhhdmUgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmNoYW5nZUxvZ2luRGF0YS5wYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEuY29uZmlybVBhc3N3b3JkID0gbm90UGFzc3dvcmQ7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVQYXNzd29yZEZpZWxkc0RpcnR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgYm90aCBwYXNzd29yZCBhbmQgY29uZmlybSBmaWVsZHMgYXJlIGVtcHR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVQYXNzd29yZEZpZWxkc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBwYXNzd29yZCBmaWVsZCBpcyBlbXB0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5jaGFuZ2VMb2dpbkRhdGEucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFyZVBhc3N3b3JkRmllbGRzRGlydHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGNvbmZpcm0gcGFzc3dvcmQgZmllbGQgaXMgZW1wdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlTG9naW5EYXRhLmNvbmZpcm1QYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYXJlUGFzc3dvcmRGaWVsZHNEaXJ0eSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlUmVxdWlyZVJlc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIHRoZSBpc1JlcXVpcmVSZXNldFNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JlcXVpcmVSZXNldCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlUmVxdWlyZVJlc2V0KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JlcXVpcmVSZXNldCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVJlcXVpcmVSZXNldCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSZXF1aXJlUmVzZXQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRGlydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBhY3R1YWw7XG4gICAgICAgICAgICBzcHlPbihjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UsICdpc0RpcnR5JykuYW5kLnJldHVyblZhbHVlKGV4cGVjdGVkKTtcbiAgICAgICAgICAgIGFjdHVhbCA9IGN0cmwuaXNEaXJ0eSgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmlzRGlydHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWwpLnRvQmUoZXhwZWN0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNQYXNzd29yZFBvbGljeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJuIGZhbHNlIGlmIG5vIGNvbnN0cmFpbnRzIGluIHBvbGljeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWRQb2xpY3kucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQYXNzd29yZFBvbGljeSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybiB0cnVlIGlmIHBvbGljeSBoYXMgY29uc3RyYWludHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkUG9saWN5LnJlc29sdmUoWydzb21lIGNvbnN0cmFpbnQnXSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQYXNzd29yZFBvbGljeSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dQb2xpY3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGVyZSBpcyBhIHBvbGljeSBhbmQgbm8gdmlvbGF0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWRQb2xpY3kucmVzb2x2ZShbJ2JsYWggYmxhaCBibGFoJ10pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvdWxkU2hvd1BvbGljeSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIG5vIHBvbGljeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVmZXJyZWRQb2xpY3kucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNQYXNzd29yZFBvbGljeSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlcmUgaXMgYSBwb2xpY3kgYW5kIHZpb2xhdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlZmVycmVkUG9saWN5LnJlc29sdmUoWyd3aGF0ZXZlcyddKTtcbiAgICAgICAgICAgIGN0cmwuY29uc3RyYWludEVycm9ycyA9IFsnc29tZXRoaW5nIHdyb25nJ107XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG91bGRTaG93UG9saWN5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNDb25zdHJhaW50RXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlcmUgYXJlIGNvbnN0cmFpbnQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmNvbnN0cmFpbnRFcnJvcnMgPSBbJ3NvbWV0aGluZyB3cm9uZyddO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzQ29uc3RyYWludEVycm9ycygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGFyZSBubyBjb25zdHJhaW50IGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5jb25zdHJhaW50RXJyb3JzID0gW107XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNDb25zdHJhaW50RXJyb3JzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXRQYXNzd29yZENoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgV29ya2Zsb3dSZXN1bHRJdGVtO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fKSB7XG4gICAgICAgICAgICBXb3JrZmxvd1Jlc3VsdEl0ZW0gPSBfV29ya2Zsb3dSZXN1bHRJdGVtXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlLnN1Ym1pdFBhc3N3b3JkQ2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuY2hhbmdlTG9naW5EYXRhLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuY2hhbmdlTG9naW5EYXRhLmNvbmZpcm1QYXNzd29yZCA9IHBhc3N3b3JkO1xuICAgICAgICAgICAgY3RybC5zdWJtaXRQYXNzd29yZENoYW5nZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlLnN1Ym1pdFBhc3N3b3JkQ2hhbmdlKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChpZGVudGl0eUlkLCBxdWlja0xpbmssIHBhc3N3b3JkLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNvbnN0cmFpbnQgZXJyb3JzIG9uIHJlamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGV4cGVjdGVkRXJyb3JzID0gWydlcnJvciAxJywgJ2Vycm9yIDInXTtcbiAgICAgICAgICAgIGRlZmVycmVkU3VibWl0LnJlamVjdCh7bWVzc2FnZXM6IGV4cGVjdGVkRXJyb3JzfSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdFBhc3N3b3JkQ2hhbmdlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jb25zdHJhaW50RXJyb3JzKS50b0JlKGV4cGVjdGVkRXJyb3JzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBjb25zdHJhaW50IGVycm9ycyBvbiByZXNvbHZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmNvbnN0cmFpbnRFcnJvcnMgPSBbJ3NvbWV0aGluZyddO1xuICAgICAgICAgICAgZGVmZXJyZWRTdWJtaXQucmVzb2x2ZShuZXcgV29ya2Zsb3dSZXN1bHRJdGVtKHt9KSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdFBhc3N3b3JkQ2hhbmdlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jb25zdHJhaW50RXJyb3JzKS50b0JlKG51bGwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdGlmeSBvbiByZXNvbHZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZFN1Ym1pdC5yZXNvbHZlKG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe30pKTtcbiAgICAgICAgICAgIHNweU9uKHNwTm90aWZpY2F0aW9uU2VydmljZSwgJ2FkZE5vdGlmaWNhdGlvbicpO1xuICAgICAgICAgICAgc3B5T24oc3BOb3RpZmljYXRpb25TZXJ2aWNlLCAndHJpZ2dlckRpcmVjdGl2ZScpO1xuICAgICAgICAgICAgY3RybC5zdWJtaXRQYXNzd29yZENoYW5nZSgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE5vdGlmaWNhdGlvblNlcnZpY2UudHJpZ2dlckRpcmVjdGl2ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
