System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('AccountDetailsDirectiveCtrl', function () {

                var $controller = undefined,
                    showEntitlementDetailsFunc = undefined,
                    $uibModalInstance = undefined,
                    $rootScope = undefined;

                beforeEach(module(accountModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, $q) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;

                    showEntitlementDetailsFunc = jasmine.createSpy('showDetails').and.callFake(function (entitlement) {
                        return entitlement;
                    });
                    var modalResultDeferred = $q.defer();
                    $uibModalInstance = {
                        close: jasmine.createSpy().and.callFake(function () {
                            return modalResultDeferred.resolve();
                        }),
                        result: modalResultDeferred.promise
                    };
                }));

                function createController(showEntitlementDetailsFunc) {
                    var bindings = showEntitlementDetailsFunc ? { showEntitlementDetailsFunc: showEntitlementDetailsFunc } : {};
                    return $controller('AccountDetailsDirectiveCtrl', {}, bindings);
                }

                describe('showEntitlementDetails()', function () {
                    it('should call through to passed function', function () {
                        var entitlement = { managedAttributeId: '1234' },
                            ctrl = createController(showEntitlementDetailsFunc);
                        ctrl.showEntitlementDetails(entitlement);
                        expect(showEntitlementDetailsFunc).toHaveBeenCalled();
                    });
                });

                describe('hasShowDetailsFunc()', function () {
                    it('should return true if func provided', function () {
                        var ctrl = createController(showEntitlementDetailsFunc);
                        expect(ctrl.hasShowDetailsFunc()).toBeTruthy();
                    });

                    it('should return false if func not provided', function () {
                        var ctrl = createController();
                        expect(ctrl.hasShowDetailsFunc()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FjY291bnREZXRhaWxEaXJlY3RpdmVDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxVQUFVLFNBQVM7OztJQUc3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLGdCQUFnQiw0Q0FBNEM7O1FBRWhFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywrQkFBK0IsWUFBTTs7Z0JBRTFDLElBQUksY0FBVztvQkFBRSw2QkFBMEI7b0JBQUUsb0JBQWlCO29CQUFFLGFBQVU7O2dCQUUxRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxlQUFlLGNBQWMsSUFBTztvQkFDbkQsY0FBYztvQkFDZCxhQUFhOztvQkFFYiw2QkFBNkIsUUFBUSxVQUFVLGVBQWUsSUFBSSxTQUFTLFVBQUMsYUFBVzt3QkFXdkUsT0FYNEU7O29CQUM1RixJQUFJLHNCQUFzQixHQUFHO29CQUM3QixvQkFBb0I7d0JBQ2hCLE9BQU8sUUFBUSxZQUFZLElBQUksU0FBUyxZQUFBOzRCQWF4QixPQWI4QixvQkFBb0I7O3dCQUNsRSxRQUFRLG9CQUFvQjs7OztnQkFJcEMsU0FBUyxpQkFBaUIsNEJBQTRCO29CQUNsRCxJQUFJLFdBQVcsNkJBQTZCLEVBQUMsNEJBQTRCLCtCQUE4QjtvQkFDdkcsT0FBTyxZQUFZLCtCQUErQixJQUFJOzs7Z0JBRzFELFNBQVMsNEJBQTRCLFlBQU07b0JBQ3ZDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLElBQUksY0FBYyxFQUFFLG9CQUFvQjs0QkFDcEMsT0FBTyxpQkFBaUI7d0JBQzVCLEtBQUssdUJBQXVCO3dCQUM1QixPQUFPLDRCQUE0Qjs7OztnQkFJM0MsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRyx1Q0FBdUMsWUFBTTt3QkFDNUMsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLHNCQUFzQjs7O29CQUd0QyxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxJQUFJLE9BQU87d0JBQ1gsT0FBTyxLQUFLLHNCQUFzQjs7Ozs7O0dBb0IzQyIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvYWNjb3VudC9BY2NvdW50RGV0YWlsRGlyZWN0aXZlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY291bnRNb2R1bGUgZnJvbSAnY29tbW9uL2lkZW50aXR5L2FjY291bnQvSWRlbnRpdHlBY2NvdW50TW9kdWxlJztcblxuZGVzY3JpYmUoJ0FjY291bnREZXRhaWxzRGlyZWN0aXZlQ3RybCcsICgpID0+IHtcblxuICAgIGxldCAkY29udHJvbGxlciwgc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmMsICR1aWJNb2RhbEluc3RhbmNlLCAkcm9vdFNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjb3VudE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgJHEpID0+IHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuXG4gICAgICAgIHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ3Nob3dEZXRhaWxzJykuYW5kLmNhbGxGYWtlKChlbnRpdGxlbWVudCkgPT4gZW50aXRsZW1lbnQpO1xuICAgICAgICBsZXQgbW9kYWxSZXN1bHREZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IG1vZGFsUmVzdWx0RGVmZXJyZWQucmVzb2x2ZSgpKSxcbiAgICAgICAgICAgIHJlc3VsdDogbW9kYWxSZXN1bHREZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYykge1xuICAgICAgICBsZXQgYmluZGluZ3MgPSBzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYyA/IHtzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYzogc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmN9IDoge307XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignQWNjb3VudERldGFpbHNEaXJlY3RpdmVDdHJsJywge30sIGJpbmRpbmdzKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnc2hvd0VudGl0bGVtZW50RGV0YWlscygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBwYXNzZWQgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50aXRsZW1lbnQgPSB7IG1hbmFnZWRBdHRyaWJ1dGVJZDogJzEyMzQnIH0sXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmMpO1xuICAgICAgICAgICAgY3RybC5zaG93RW50aXRsZW1lbnREZXRhaWxzKGVudGl0bGVtZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNTaG93RGV0YWlsc0Z1bmMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBmdW5jIHByb3ZpZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1Nob3dEZXRhaWxzRnVuYygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGZ1bmMgbm90IHByb3ZpZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNTaG93RGV0YWlsc0Z1bmMoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
