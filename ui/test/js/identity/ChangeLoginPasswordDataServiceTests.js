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

            describe('ChangeLoginPasswordDataService', function () {
                var changeLoginPasswordDataService = undefined;

                beforeEach(module(identityModule, testModule));
                beforeEach(inject(function (_changeLoginPasswordDataService_) {
                    changeLoginPasswordDataService = _changeLoginPasswordDataService_;
                }));

                describe('isDirty', function () {
                    it('should return false when password fields are empty and reset required not selected', function () {
                        expect(changeLoginPasswordDataService.isDirty()).toBeFalsy();
                    });

                    it('should return false when password is the empty string and reset required not selected', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().password = '';
                        expect(changeLoginPasswordDataService.isDirty()).toBeFalsy();
                    });

                    it('should return false when confirm password is the empty string and reset required not selected', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().confirmPassword = '';
                        expect(changeLoginPasswordDataService.isDirty()).toBeFalsy();
                    });

                    it('should return true when confirm password is not falsy and reset required not selected', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().confirmPassword = 'someValue';
                        expect(changeLoginPasswordDataService.isDirty()).toBeTruthy();
                    });

                    it('should return true when password is not falsy and reset required not selected', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().password = 'adifferent value';
                        expect(changeLoginPasswordDataService.isDirty()).toBeTruthy();
                    });

                    it('should return true when reset required selected', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().isRequireResetSelected = true;
                        expect(changeLoginPasswordDataService.isDirty()).toBeTruthy();
                    });

                    it('should return true when a combination of values are truthy', function () {
                        changeLoginPasswordDataService.getChangeLoginPasswordData().confirmPassword = 'confirmEntered';
                        changeLoginPasswordDataService.getChangeLoginPasswordData().isRequireResetSelected = true;
                        expect(changeLoginPasswordDataService.isDirty()).toBeTruthy();
                    });
                });

                describe('reset', function () {
                    it('should reset the password change data', function () {
                        var data = changeLoginPasswordDataService.getChangeLoginPasswordData();
                        data.password = 'password field';
                        data.confirmPassword = 'confirm field';
                        data.isRequireResetSelected = true;

                        changeLoginPasswordDataService.reset();

                        expect(data.password).toBeFalsy();
                        expect(data.confirmPassword).toBeFalsy();
                        expect(data.isRequireResetSelected).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUk3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLGtDQUFrQyxZQUFXO2dCQUNsRCxJQUFJLGlDQUE4Qjs7Z0JBRWxDLFdBQVcsT0FBTyxnQkFBZ0I7Z0JBQ2xDLFdBQVcsT0FBTyxVQUFTLGtDQUFrQztvQkFDekQsaUNBQWlDOzs7Z0JBR3JDLFNBQVMsV0FBVyxZQUFXO29CQUMzQixHQUFHLHNGQUFzRixZQUFXO3dCQUNoRyxPQUFPLCtCQUErQixXQUFXOzs7b0JBR3JELEdBQUcseUZBQXlGLFlBQVc7d0JBQ25HLCtCQUErQiw2QkFBNkIsV0FBVzt3QkFDdkUsT0FBTywrQkFBK0IsV0FBVzs7O29CQUdyRCxHQUFHLGlHQUFpRyxZQUFXO3dCQUMzRywrQkFBK0IsNkJBQTZCLGtCQUFrQjt3QkFDOUUsT0FBTywrQkFBK0IsV0FBVzs7O29CQUdyRCxHQUFHLHlGQUF5RixZQUFXO3dCQUNuRywrQkFBK0IsNkJBQTZCLGtCQUFrQjt3QkFDOUUsT0FBTywrQkFBK0IsV0FBVzs7O29CQUdyRCxHQUFHLGlGQUFpRixZQUFXO3dCQUMzRiwrQkFBK0IsNkJBQTZCLFdBQVc7d0JBQ3ZFLE9BQU8sK0JBQStCLFdBQVc7OztvQkFHckQsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0QsK0JBQStCLDZCQUE2Qix5QkFBeUI7d0JBQ3JGLE9BQU8sK0JBQStCLFdBQVc7OztvQkFJckQsR0FBRyw4REFBOEQsWUFBVzt3QkFDeEUsK0JBQStCLDZCQUE2QixrQkFBa0I7d0JBQzlFLCtCQUErQiw2QkFBNkIseUJBQXlCO3dCQUNyRixPQUFPLCtCQUErQixXQUFXOzs7O2dCQUl6RCxTQUFTLFNBQVMsWUFBVztvQkFDekIsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsSUFBSSxPQUFPLCtCQUErQjt3QkFDMUMsS0FBSyxXQUFXO3dCQUNoQixLQUFLLGtCQUFrQjt3QkFDdkIsS0FBSyx5QkFBeUI7O3dCQUU5QiwrQkFBK0I7O3dCQUUvQixPQUFPLEtBQUssVUFBVTt3QkFDdEIsT0FBTyxLQUFLLGlCQUFpQjt3QkFDN0IsT0FBTyxLQUFLLHdCQUF3Qjs7Ozs7O0dBYTdDIiwiZmlsZSI6ImlkZW50aXR5L0NoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0NoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9jaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2VfKSB7XG4gICAgICAgIGNoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZSA9IF9jaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpc0RpcnR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGFzc3dvcmQgZmllbGRzIGFyZSBlbXB0eSBhbmQgcmVzZXQgcmVxdWlyZWQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGFzc3dvcmQgaXMgdGhlIGVtcHR5IHN0cmluZyBhbmQgcmVzZXQgcmVxdWlyZWQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0Q2hhbmdlTG9naW5QYXNzd29yZERhdGEoKS5wYXNzd29yZCA9ICcnO1xuICAgICAgICAgICAgZXhwZWN0KGNoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZS5pc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIGNvbmZpcm0gcGFzc3dvcmQgaXMgdGhlIGVtcHR5IHN0cmluZyBhbmQgcmVzZXQgcmVxdWlyZWQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0Q2hhbmdlTG9naW5QYXNzd29yZERhdGEoKS5jb25maXJtUGFzc3dvcmQgPSAnJztcbiAgICAgICAgICAgIGV4cGVjdChjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIGNvbmZpcm0gcGFzc3dvcmQgaXMgbm90IGZhbHN5IGFuZCByZXNldCByZXF1aXJlZCBub3Qgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZS5nZXRDaGFuZ2VMb2dpblBhc3N3b3JkRGF0YSgpLmNvbmZpcm1QYXNzd29yZCA9ICdzb21lVmFsdWUnO1xuICAgICAgICAgICAgZXhwZWN0KGNoYW5nZUxvZ2luUGFzc3dvcmREYXRhU2VydmljZS5pc0RpcnR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHBhc3N3b3JkIGlzIG5vdCBmYWxzeSBhbmQgcmVzZXQgcmVxdWlyZWQgbm90IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0Q2hhbmdlTG9naW5QYXNzd29yZERhdGEoKS5wYXNzd29yZCA9ICdhZGlmZmVyZW50IHZhbHVlJztcbiAgICAgICAgICAgIGV4cGVjdChjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiByZXNldCByZXF1aXJlZCBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmdldENoYW5nZUxvZ2luUGFzc3dvcmREYXRhKCkuaXNSZXF1aXJlUmVzZXRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBleHBlY3QoY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBhIGNvbWJpbmF0aW9uIG9mIHZhbHVlcyBhcmUgdHJ1dGh5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0Q2hhbmdlTG9naW5QYXNzd29yZERhdGEoKS5jb25maXJtUGFzc3dvcmQgPSAnY29uZmlybUVudGVyZWQnO1xuICAgICAgICAgICAgY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmdldENoYW5nZUxvZ2luUGFzc3dvcmREYXRhKCkuaXNSZXF1aXJlUmVzZXRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBleHBlY3QoY2hhbmdlTG9naW5QYXNzd29yZERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJlc2V0IHRoZSBwYXNzd29yZCBjaGFuZ2UgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0Q2hhbmdlTG9naW5QYXNzd29yZERhdGEoKTtcbiAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAncGFzc3dvcmQgZmllbGQnO1xuICAgICAgICAgICAgZGF0YS5jb25maXJtUGFzc3dvcmQgPSAnY29uZmlybSBmaWVsZCc7XG4gICAgICAgICAgICBkYXRhLmlzUmVxdWlyZVJlc2V0U2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkRGF0YVNlcnZpY2UucmVzZXQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGRhdGEucGFzc3dvcmQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEuY29uZmlybVBhc3N3b3JkKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLmlzUmVxdWlyZVJlc2V0U2VsZWN0ZWQpLnRvQmVGYWxzeSgpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
