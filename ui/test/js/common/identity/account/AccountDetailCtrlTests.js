System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('AccountDetailCtrl', function () {

                var $controller = undefined,
                    Entitlement = undefined,
                    LinkAttribute = undefined,
                    showEntitlementDetailsFunc = undefined,
                    $uibModalInstance = undefined,
                    $rootScope = undefined;

                beforeEach(module(accountModule));

                beforeEach(inject(function (_$controller_, _Entitlement_, _LinkAttribute_, _$rootScope_, $q) {
                    $controller = _$controller_;
                    Entitlement = _Entitlement_;
                    LinkAttribute = _LinkAttribute_;
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

                function createController(account) {
                    return $controller('AccountDetailCtrl', {
                        account: account,
                        showEntitlementDetailsFunc: showEntitlementDetailsFunc,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                it('blows up with no account', function () {
                    expect(function () {
                        return createController(null);
                    }).toThrow();
                });

                it('stores the account', function () {
                    var account = { applicationDetails: 'thing' },
                        ctrl = createController(account);
                    expect(ctrl.account).toEqual(account);
                });

                describe('getApplicationRemediators()', function () {
                    it('returns null for empty or undefined remediators', function () {
                        var account = { some: 'thing' },
                            ctrl = createController(account);
                        expect(ctrl.getApplicationRemediators()).toEqual(null);
                        account.application = { remediators: [] };
                        ctrl = createController(account);
                        expect(ctrl.getApplicationRemediators()).toEqual(null);
                    });

                    it('returns a CSV for defined remediators', function () {
                        var account = {
                            application: {
                                remediators: [{
                                    displayName: 'Person One'
                                }, {
                                    displayName: 'Person Two'
                                }]
                            }
                        },
                            ctrl = createController(account);
                        expect(ctrl.getApplicationRemediators()).toEqual('Person One, Person Two');
                    });
                });

                describe('showEntitlementDetails()', function () {
                    it('closes modal instance and calls showEntitlementDetailsFunc with entitlement', function () {
                        var account = { some: 'thing' },
                            entitlement = { managedAttributeId: '1234' },
                            ctrl = createController(account);

                        ctrl.showEntitlementDetails(entitlement);
                        $rootScope.$apply();
                        expect($uibModalInstance.close).toHaveBeenCalled();
                        expect(showEntitlementDetailsFunc).toHaveBeenCalledWith(entitlement);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FjY291bnREZXRhaWxDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxVQUFVLFNBQVM7OztJQUc3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLGdCQUFnQiw0Q0FBNEM7O1FBRWhFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxxQkFBcUIsWUFBTTs7Z0JBRWhDLElBQUksY0FBVztvQkFBRSxjQUFXO29CQUFFLGdCQUFhO29CQUFFLDZCQUEwQjtvQkFBRSxvQkFBaUI7b0JBQUUsYUFBVTs7Z0JBRXRHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUsZUFBZSxpQkFBaUIsY0FBYyxJQUFPO29CQUNuRixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixhQUFhOztvQkFFYiw2QkFBNkIsUUFBUSxVQUFVLGVBQWUsSUFBSSxTQUFTLFVBQUMsYUFBVzt3QkFhdkUsT0FiNEU7O29CQUM1RixJQUFJLHNCQUFzQixHQUFHO29CQUM3QixvQkFBb0I7d0JBQ2hCLE9BQU8sUUFBUSxZQUFZLElBQUksU0FBUyxZQUFBOzRCQWV4QixPQWY4QixvQkFBb0I7O3dCQUNsRSxRQUFRLG9CQUFvQjs7OztnQkFJcEMsU0FBUyxpQkFBaUIsU0FBUztvQkFDL0IsT0FBTyxZQUFZLHFCQUFxQjt3QkFDcEMsU0FBUzt3QkFDVCw0QkFBNEI7d0JBQzVCLG1CQUFtQjs7OztnQkFJM0IsR0FBRyw0QkFBNEIsWUFBTTtvQkFDakMsT0FBTyxZQUFBO3dCQWlCUyxPQWpCSCxpQkFBaUI7dUJBQU87OztnQkFHekMsR0FBRyxzQkFBc0IsWUFBTTtvQkFDM0IsSUFBSSxVQUFVLEVBQUUsb0JBQW9CO3dCQUNoQyxPQUFPLGlCQUFpQjtvQkFDNUIsT0FBTyxLQUFLLFNBQVMsUUFBUTs7O2dCQUdqQyxTQUFTLCtCQUErQixZQUFNO29CQUMxQyxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLFVBQVUsRUFBRSxNQUFNOzRCQUNsQixPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLDZCQUE2QixRQUFRO3dCQUNqRCxRQUFRLGNBQWMsRUFBRSxhQUFjO3dCQUN0QyxPQUFPLGlCQUFpQjt3QkFDeEIsT0FBTyxLQUFLLDZCQUE2QixRQUFROzs7b0JBR3JELEdBQUcseUNBQXlDLFlBQU07d0JBQzlDLElBQUksVUFBVTs0QkFDTixhQUFhO2dDQUNULGFBQWEsQ0FBQztvQ0FDVixhQUFhO21DQUNkO29DQUNDLGFBQWE7Ozs7NEJBSXpCLE9BQU8saUJBQWlCO3dCQUM1QixPQUFPLEtBQUssNkJBQTZCLFFBQVE7Ozs7Z0JBSXpELFNBQVMsNEJBQTRCLFlBQU07b0JBQ3ZDLEdBQUcsK0VBQStFLFlBQU07d0JBQ3BGLElBQUksVUFBVSxFQUFFLE1BQU07NEJBQ2xCLGNBQWMsRUFBRSxvQkFBb0I7NEJBQ3BDLE9BQU8saUJBQWlCOzt3QkFFNUIsS0FBSyx1QkFBdUI7d0JBQzVCLFdBQVc7d0JBQ1gsT0FBTyxrQkFBa0IsT0FBTzt3QkFDaEMsT0FBTyw0QkFBNEIscUJBQXFCOzs7Ozs7R0F3QmpFIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FjY291bnREZXRhaWxDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWNjb3VudERldGFpbEN0cmwnLCAoKSA9PiB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsIEVudGl0bGVtZW50LCBMaW5rQXR0cmlidXRlLCBzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYywgJHVpYk1vZGFsSW5zdGFuY2UsICRyb290U2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2NvdW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXywgX0VudGl0bGVtZW50XywgX0xpbmtBdHRyaWJ1dGVfLCBfJHJvb3RTY29wZV8sICRxKSA9PiB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgRW50aXRsZW1lbnQgPSBfRW50aXRsZW1lbnRfO1xuICAgICAgICBMaW5rQXR0cmlidXRlID0gX0xpbmtBdHRyaWJ1dGVfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuXG4gICAgICAgIHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ3Nob3dEZXRhaWxzJykuYW5kLmNhbGxGYWtlKChlbnRpdGxlbWVudCkgPT4gZW50aXRsZW1lbnQpO1xuICAgICAgICBsZXQgbW9kYWxSZXN1bHREZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IG1vZGFsUmVzdWx0RGVmZXJyZWQucmVzb2x2ZSgpKSxcbiAgICAgICAgICAgIHJlc3VsdDogbW9kYWxSZXN1bHREZWZlcnJlZC5wcm9taXNlXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihhY2NvdW50KSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignQWNjb3VudERldGFpbEN0cmwnLCB7XG4gICAgICAgICAgICBhY2NvdW50OiBhY2NvdW50LFxuICAgICAgICAgICAgc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmM6IHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jLFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0KCdibG93cyB1cCB3aXRoIG5vIGFjY291bnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcmVzIHRoZSBhY2NvdW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgYWNjb3VudCA9IHsgYXBwbGljYXRpb25EZXRhaWxzOiAndGhpbmcnIH0sXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihhY2NvdW50KTtcbiAgICAgICAgZXhwZWN0KGN0cmwuYWNjb3VudCkudG9FcXVhbChhY2NvdW50KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRBcHBsaWNhdGlvblJlbWVkaWF0b3JzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgZm9yIGVtcHR5IG9yIHVuZGVmaW5lZCByZW1lZGlhdG9ycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY2NvdW50ID0geyBzb21lOiAndGhpbmcnIH0sXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoYWNjb3VudCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRBcHBsaWNhdGlvblJlbWVkaWF0b3JzKCkpLnRvRXF1YWwobnVsbCk7XG4gICAgICAgICAgICBhY2NvdW50LmFwcGxpY2F0aW9uID0geyByZW1lZGlhdG9yczogIFtdIH07XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihhY2NvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFwcGxpY2F0aW9uUmVtZWRpYXRvcnMoKSkudG9FcXVhbChudWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYSBDU1YgZm9yIGRlZmluZWQgcmVtZWRpYXRvcnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWNjb3VudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWVkaWF0b3JzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnUGVyc29uIE9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1BlcnNvbiBUd28nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihhY2NvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEFwcGxpY2F0aW9uUmVtZWRpYXRvcnMoKSkudG9FcXVhbCgnUGVyc29uIE9uZSwgUGVyc29uIFR3bycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RW50aXRsZW1lbnREZXRhaWxzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjbG9zZXMgbW9kYWwgaW5zdGFuY2UgYW5kIGNhbGxzIHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jIHdpdGggZW50aXRsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWNjb3VudCA9IHsgc29tZTogJ3RoaW5nJyB9LFxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50ID0geyBtYW5hZ2VkQXR0cmlidXRlSWQ6ICcxMjM0JyB9LFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGFjY291bnQpO1xuXG4gICAgICAgICAgICBjdHJsLnNob3dFbnRpdGxlbWVudERldGFpbHMoZW50aXRsZW1lbnQpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnRpdGxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
