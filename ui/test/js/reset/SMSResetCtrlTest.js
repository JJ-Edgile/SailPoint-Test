System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {

    /**
     * Tests for the SMSResetCtrl.
     */
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {
            describe('SMSResetCtrl', function () {

                var rootScope, scope, http, changePasswordService, unlockAccountService;

                beforeEach(module(resetModule));

                /*
                 * Creates a controller with a mock scope object
                 */
                var createWithValidData = function () {
                    scope.textCode = '123456';
                    scope.passwordModel.password = 'nicePassword';
                    scope.passwordModel.confirm = 'nicePassword';
                };

                var createWithInvalidData = function () {
                    scope.textCode = '123456';
                    scope.passwordModel.password = 'nicePassword';
                    scope.passwordModel.confirm = 'NOTnicePassword';
                };

                var getUrl = function () {
                    return '/ui/rest/userReset/sendSMS';
                };

                // now for the tests
                describe('password reset:', function () {
                    beforeEach(inject(function ($rootScope, $httpBackend, $controller, $q) {
                        rootScope = $rootScope;
                        scope = $rootScope.$new();
                        http = $httpBackend;

                        changePasswordService = {
                            withSMS: jasmine.createSpy().and.callFake(function () {
                                var deferred = $q.defer();
                                deferred.reject({ data: { message: ['Password Policy violated.'] } });
                                return deferred.promise;
                            })
                        };

                        $controller('SMSResetCtrl', {
                            $scope: scope,
                            changePasswordService: changePasswordService
                        });
                    }));

                    describe('on initialization', function () {
                        it('should disable the submit button', function () {
                            expect(scope.isDisableSubmit()).toEqual(true);
                        });
                    });

                    describe('when valid', function () {
                        it('should enable the submit button', function () {
                            createWithValidData();
                            expect(scope.isDisableSubmit()).toEqual(false);
                        });
                    });

                    describe('when invalid', function () {
                        it('should disable the submit button', function () {
                            createWithInvalidData();
                            expect(scope.isDisableSubmit()).toEqual(true);
                        });
                    });

                    describe('calls sendSMS', function () {
                        it('with success', function () {
                            http.expectPOST(getUrl()).respond(200, {});
                            scope.sendSMS();
                            http.flush();

                            expect(scope.smsStatus.show).toBe(true);
                            expect(scope.smsStatus.hasError).toBe(false);
                        });

                        it('with error', function () {
                            http.expectPOST(getUrl()).respond(503, { message: ['SMS Service Provider is unavailable at this time'] });
                            scope.sendSMS();
                            http.flush();

                            expect(scope.smsStatus.show).toBe(true);
                            expect(scope.smsStatus.hasError).toBe(true);
                            expect(scope.smsStatus.text).toBe('SMS Service Provider is unavailable at this time');
                        });
                    });

                    describe('call submit', function () {
                        it('with error', function () {
                            createWithValidData();
                            scope.submit();
                            rootScope.$apply();
                            expect(changePasswordService.withSMS).toHaveBeenCalled();
                            expect(scope.errorMessages).toBe('Password Policy violated.');
                        });
                    });

                    describe('Successful withSMS', function () {
                        var routingService, spModal;

                        function setupModalMock(_spModal_, $q) {
                            spModal = _spModal_;
                            spyOn(spModal, 'open').and.callFake(function () {
                                var deferred = $q.defer();
                                deferred.resolve();
                                return {
                                    result: deferred.promise
                                };
                            });
                        }

                        beforeEach(inject(function ($rootScope, $httpBackend, $controller, $q, _spModal_) {

                            rootScope = $rootScope;
                            scope = $rootScope.$new();
                            http = $httpBackend;

                            spModal = _spModal_;
                            setupModalMock(_spModal_, $q);

                            changePasswordService = {
                                withSMS: jasmine.createSpy().and.callFake(function () {
                                    var deferred = $q.defer();
                                    deferred.resolve({
                                        status: 200
                                    });
                                    return deferred.promise;
                                })
                            };

                            routingService = {
                                navigateSuccess: jasmine.createSpy().and.callFake(function () {
                                    return;
                                })

                            };

                            $controller('SMSResetCtrl', {
                                $scope: scope,
                                changePasswordService: changePasswordService,
                                unlockAccountService: unlockAccountService,
                                routingService: routingService,
                                spModal: spModal
                            });

                            $rootScope.$apply();
                        }));

                        describe('Valid Data, Success changePasswordService', function () {

                            it('should allow submit to be called successfully and callloginUser', function () {
                                spyOn(scope, 'showResetPopup').and.callThrough();
                                createWithValidData();
                                scope.submit();
                                rootScope.$apply();
                                expect(changePasswordService.withSMS).toHaveBeenCalled();
                                expect(scope.showResetPopup).toHaveBeenCalled();
                                expect(spModal.open).toHaveBeenCalled();
                                expect(routingService.navigateSuccess).toHaveBeenCalled();
                            });
                        });
                    });
                });

                describe('account unlock:', function () {
                    //Create a mock ResetDataService service that will be used by the RoutingService.
                    beforeEach(module(function ($provide) {
                        // Provide the mock as the ResetDataService, so this service will use it.
                        $provide.factory('resetDataService', function () {
                            return {
                                smsStatus: {},
                                action: 'accountUnlock'
                            };
                        });
                    }));

                    beforeEach(inject(function ($rootScope, $httpBackend, $controller, $q) {

                        rootScope = $rootScope;
                        scope = $rootScope.$new();
                        http = $httpBackend;

                        unlockAccountService = {
                            withSMS: jasmine.createSpy().and.callFake(function () {
                                var deferred = $q.defer();
                                deferred.reject({ data: { message: ['Password Policy violated.'] }, status: 500 });
                                return deferred.promise;
                            })
                        };

                        $controller('SMSResetCtrl', {
                            $scope: scope,
                            unlockAccountService: unlockAccountService
                        });
                        $rootScope.$apply();
                    }));

                    describe('call submit', function () {
                        it('with error', function () {
                            createWithValidData();
                            scope.submit();
                            rootScope.$apply();
                            expect(unlockAccountService.withSMS).toHaveBeenCalled();
                            expect(scope.errorMessages).toBe('Password Policy violated.');
                            expect(scope.smsStatus.show).toBe(false);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1NNU1Jlc2V0Q3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlCQUF5QixVQUFVLFNBQVM7Ozs7O0lBS3BGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxzQkFBc0I7WUFDNUUsY0FBYyxxQkFBcUI7O1FBRXZDLFNBQVMsWUFBWTtZQU43QixTQUFTLGdCQUFnQixZQUFXOztnQkFFaEMsSUFBSSxXQUFXLE9BQU8sTUFBTSx1QkFBdUI7O2dCQUVuRCxXQUFXLE9BQU87Ozs7O2dCQUtsQixJQUFJLHNCQUFzQixZQUFXO29CQUNqQyxNQUFNLFdBQVc7b0JBQ2pCLE1BQU0sY0FBYyxXQUFXO29CQUMvQixNQUFNLGNBQWMsVUFBVTs7O2dCQUdsQyxJQUFJLHdCQUF3QixZQUFXO29CQUNuQyxNQUFNLFdBQVc7b0JBQ2pCLE1BQU0sY0FBYyxXQUFXO29CQUMvQixNQUFNLGNBQWMsVUFBVTs7O2dCQUdsQyxJQUFJLFNBQVMsWUFBVztvQkFDcEIsT0FBTzs7OztnQkFJWCxTQUFTLG1CQUFtQixZQUFXO29CQUNuQyxXQUFXLE9BQU8sVUFBUyxZQUFZLGNBQWMsYUFBYSxJQUFJO3dCQUNsRSxZQUFZO3dCQUNaLFFBQVEsV0FBVzt3QkFDbkIsT0FBTzs7d0JBRVAsd0JBQXdCOzRCQUNwQixTQUFTLFFBQVEsWUFBWSxJQUFJLFNBQVMsWUFBVztnQ0FDakQsSUFBSSxXQUFXLEdBQUc7Z0NBQ2xCLFNBQVMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLENBQUM7Z0NBQ2xDLE9BQU8sU0FBUzs7Ozt3QkFJeEIsWUFBWSxnQkFBZ0I7NEJBQ3hCLFFBQVE7NEJBQ1IsdUJBQXVCOzs7O29CQUkvQixTQUFTLHFCQUFxQixZQUFXO3dCQUNyQyxHQUFHLG9DQUFvQyxZQUFXOzRCQUM5QyxPQUFPLE1BQU0sbUJBQW1CLFFBQVE7Ozs7b0JBSWhELFNBQVMsY0FBYyxZQUFXO3dCQUM5QixHQUFHLG1DQUFtQyxZQUFXOzRCQUM3Qzs0QkFDQSxPQUFPLE1BQU0sbUJBQW1CLFFBQVE7Ozs7b0JBSWhELFNBQVMsZ0JBQWdCLFlBQVc7d0JBQ2hDLEdBQUcsb0NBQW9DLFlBQVc7NEJBQzlDOzRCQUNBLE9BQU8sTUFBTSxtQkFBbUIsUUFBUTs7OztvQkFJaEQsU0FBUyxpQkFBaUIsWUFBVzt3QkFDakMsR0FBRyxnQkFBZ0IsWUFBVzs0QkFDMUIsS0FBSyxXQUFXLFVBQVUsUUFBUSxLQUFLOzRCQUN2QyxNQUFNOzRCQUNOLEtBQUs7OzRCQUVMLE9BQU8sTUFBTSxVQUFVLE1BQU0sS0FBSzs0QkFDbEMsT0FBTyxNQUFNLFVBQVUsVUFBVSxLQUFLOzs7d0JBRzFDLEdBQUcsY0FBYyxZQUFXOzRCQUN4QixLQUFLLFdBQVcsVUFBVSxRQUFRLEtBQzlCLEVBQUMsU0FBUyxDQUFDOzRCQUNmLE1BQU07NEJBQ04sS0FBSzs7NEJBRUwsT0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLOzRCQUNsQyxPQUFPLE1BQU0sVUFBVSxVQUFVLEtBQUs7NEJBQ3RDLE9BQU8sTUFBTSxVQUFVLE1BQU0sS0FBSzs7OztvQkFJMUMsU0FBUyxlQUFlLFlBQVc7d0JBQy9CLEdBQUcsY0FBYyxZQUFXOzRCQUN4Qjs0QkFDQSxNQUFNOzRCQUNOLFVBQVU7NEJBQ1YsT0FBTyxzQkFBc0IsU0FBUzs0QkFDdEMsT0FBTyxNQUFNLGVBQWUsS0FBSzs7OztvQkFJekMsU0FBUyxzQkFBc0IsWUFBVzt3QkFDdEMsSUFBSSxnQkFBZ0I7O3dCQUVwQixTQUFTLGVBQWUsV0FBVyxJQUFJOzRCQUNuQyxVQUFVOzRCQUNWLE1BQU0sU0FBUyxRQUFRLElBQUksU0FBUyxZQUFXO2dDQUMzQyxJQUFJLFdBQVcsR0FBRztnQ0FDbEIsU0FBUztnQ0FDVCxPQUFPO29DQUNILFFBQVEsU0FBUzs7Ozs7d0JBSzdCLFdBQVcsT0FBTyxVQUFTLFlBQVksY0FBYyxhQUFhLElBQUksV0FBVzs7NEJBRTdFLFlBQVk7NEJBQ1osUUFBUSxXQUFXOzRCQUNuQixPQUFPOzs0QkFFUCxVQUFVOzRCQUNWLGVBQWUsV0FBVzs7NEJBRTFCLHdCQUF3QjtnQ0FDcEIsU0FBUyxRQUFRLFlBQVksSUFBSSxTQUM3QixZQUFXO29DQUNQLElBQUksV0FBVyxHQUFHO29DQUNsQixTQUFTLFFBQVE7d0NBQ2IsUUFBUTs7b0NBRVosT0FBTyxTQUFTOzs7OzRCQUk1QixpQkFBaUI7Z0NBQ1QsaUJBQWlCLFFBQVEsWUFBWSxJQUFJLFNBQ2pDLFlBQVc7b0NBQ1A7Ozs7OzRCQUtwQixZQUFZLGdCQUFnQjtnQ0FDeEIsUUFBUTtnQ0FDUix1QkFBdUI7Z0NBQ3ZCLHNCQUFzQjtnQ0FDdEIsZ0JBQWdCO2dDQUNoQixTQUFTOzs7NEJBR2IsV0FBVzs7O3dCQUlmLFNBQVMsNkNBQTZDLFlBQVc7OzRCQUU3RCxHQUFHLG1FQUFtRSxZQUFXO2dDQUM3RSxNQUFNLE9BQU8sa0JBQWtCLElBQUk7Z0NBQ25DO2dDQUNBLE1BQU07Z0NBQ04sVUFBVTtnQ0FDVixPQUFPLHNCQUFzQixTQUFTO2dDQUN0QyxPQUFPLE1BQU0sZ0JBQWdCO2dDQUM3QixPQUFPLFFBQVEsTUFBTTtnQ0FDckIsT0FBTyxlQUFlLGlCQUFpQjs7Ozs7O2dCQU92RCxTQUFTLG1CQUFtQixZQUFXOztvQkFFbkMsV0FBVyxPQUFPLFVBQVMsVUFBVTs7d0JBRWpDLFNBQVMsUUFBUSxvQkFBb0IsWUFBVzs0QkFDNUMsT0FBTztnQ0FDSCxXQUFXO2dDQUNYLFFBQVE7Ozs7O29CQUtwQixXQUFXLE9BQU8sVUFBUyxZQUFZLGNBQWMsYUFBYSxJQUFJOzt3QkFFbEUsWUFBWTt3QkFDWixRQUFRLFdBQVc7d0JBQ25CLE9BQU87O3dCQUVQLHVCQUF1Qjs0QkFDbkIsU0FBUyxRQUFRLFlBQVksSUFBSSxTQUM3QixZQUFXO2dDQUNQLElBQUksV0FBVyxHQUFHO2dDQUNsQixTQUFTLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxDQUFDLGdDQUErQixRQUFRO2dDQUN6RSxPQUFPLFNBQVM7Ozs7d0JBSTVCLFlBQVksZ0JBQWdCOzRCQUN4QixRQUFROzRCQUNSLHNCQUFzQjs7d0JBRTFCLFdBQVc7OztvQkFJZixTQUFTLGVBQWUsWUFBVzt3QkFDL0IsR0FBRyxjQUFjLFlBQVc7NEJBQ3hCOzRCQUNBLE1BQU07NEJBQ04sVUFBVTs0QkFDVixPQUFPLHFCQUFxQixTQUFTOzRCQUNyQyxPQUFPLE1BQU0sZUFBZSxLQUFLOzRCQUNqQyxPQUFPLE1BQU0sVUFBVSxNQUFNLEtBQUs7Ozs7Ozs7R0FPL0MiLCJmaWxlIjoicmVzZXQvU01TUmVzZXRDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlc2V0TW9kdWxlIGZyb20gJ3Jlc2V0L1Jlc2V0QXBwTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFNNU1Jlc2V0Q3RybC5cbiAqL1xuZGVzY3JpYmUoJ1NNU1Jlc2V0Q3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHJvb3RTY29wZSwgc2NvcGUsIGh0dHAsIGNoYW5nZVBhc3N3b3JkU2VydmljZSwgdW5sb2NrQWNjb3VudFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZXNldE1vZHVsZSkpO1xuXG4gICAgLypcbiAgICAgKiBDcmVhdGVzIGEgY29udHJvbGxlciB3aXRoIGEgbW9jayBzY29wZSBvYmplY3RcbiAgICAgKi9cbiAgICB2YXIgY3JlYXRlV2l0aFZhbGlkRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzY29wZS50ZXh0Q29kZSA9ICcxMjM0NTYnO1xuICAgICAgICBzY29wZS5wYXNzd29yZE1vZGVsLnBhc3N3b3JkID0gJ25pY2VQYXNzd29yZCc7XG4gICAgICAgIHNjb3BlLnBhc3N3b3JkTW9kZWwuY29uZmlybSA9ICduaWNlUGFzc3dvcmQnO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlV2l0aEludmFsaWREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNjb3BlLnRleHRDb2RlID0gJzEyMzQ1Nic7XG4gICAgICAgIHNjb3BlLnBhc3N3b3JkTW9kZWwucGFzc3dvcmQgPSAnbmljZVBhc3N3b3JkJztcbiAgICAgICAgc2NvcGUucGFzc3dvcmRNb2RlbC5jb25maXJtID0gJ05PVG5pY2VQYXNzd29yZCc7XG4gICAgfTtcblxuICAgIHZhciBnZXRVcmwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcvdWkvcmVzdC91c2VyUmVzZXQvc2VuZFNNUyc7XG4gICAgfTtcblxuICAgIC8vIG5vdyBmb3IgdGhlIHRlc3RzXG4gICAgZGVzY3JpYmUoJ3Bhc3N3b3JkIHJlc2V0OicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cEJhY2tlbmQsICRjb250cm9sbGVyLCAkcSkge1xuICAgICAgICAgICAgcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICAgICBodHRwID0gJGh0dHBCYWNrZW5kO1xuXG4gICAgICAgICAgICBjaGFuZ2VQYXNzd29yZFNlcnZpY2UgPSB7XG4gICAgICAgICAgICAgICAgd2l0aFNNUzogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7ZGF0YToge21lc3NhZ2U6IFsnUGFzc3dvcmQgUG9saWN5IHZpb2xhdGVkLiddfX0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJGNvbnRyb2xsZXIoJ1NNU1Jlc2V0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICAkc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZTogY2hhbmdlUGFzc3dvcmRTZXJ2aWNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGRlc2NyaWJlKCdvbiBpbml0aWFsaXphdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBkaXNhYmxlIHRoZSBzdWJtaXQgYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmlzRGlzYWJsZVN1Ym1pdCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHZhbGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGVuYWJsZSB0aGUgc3VibWl0IGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVdpdGhWYWxpZERhdGEoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuaXNEaXNhYmxlU3VibWl0KCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGludmFsaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgZGlzYWJsZSB0aGUgc3VibWl0IGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVdpdGhJbnZhbGlkRGF0YSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5pc0Rpc2FibGVTdWJtaXQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2FsbHMgc2VuZFNNUycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQoJ3dpdGggc3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoKSkucmVzcG9uZCgyMDAsIHt9KTtcbiAgICAgICAgICAgICAgICBzY29wZS5zZW5kU01TKCk7XG4gICAgICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNtc1N0YXR1cy5zaG93KS50b0JlKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5zbXNTdGF0dXMuaGFzRXJyb3IpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCd3aXRoIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldFVybCgpKS5yZXNwb25kKDUwMyxcbiAgICAgICAgICAgICAgICAgICAge21lc3NhZ2U6IFsnU01TIFNlcnZpY2UgUHJvdmlkZXIgaXMgdW5hdmFpbGFibGUgYXQgdGhpcyB0aW1lJ119KTtcbiAgICAgICAgICAgICAgICBzY29wZS5zZW5kU01TKCk7XG4gICAgICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNtc1N0YXR1cy5zaG93KS50b0JlKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5zbXNTdGF0dXMuaGFzRXJyb3IpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNtc1N0YXR1cy50ZXh0KS50b0JlKCdTTVMgU2VydmljZSBQcm92aWRlciBpcyB1bmF2YWlsYWJsZSBhdCB0aGlzIHRpbWUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2FsbCBzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCd3aXRoIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlV2l0aFZhbGlkRGF0YSgpO1xuICAgICAgICAgICAgICAgIHNjb3BlLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hhbmdlUGFzc3dvcmRTZXJ2aWNlLndpdGhTTVMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZXJyb3JNZXNzYWdlcykudG9CZSgnUGFzc3dvcmQgUG9saWN5IHZpb2xhdGVkLicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdTdWNjZXNzZnVsIHdpdGhTTVMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByb3V0aW5nU2VydmljZSwgc3BNb2RhbDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXBNb2RhbE1vY2soX3NwTW9kYWxfLCAkcSkge1xuICAgICAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogZGVmZXJyZWQucHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cEJhY2tlbmQsICRjb250cm9sbGVyLCAkcSwgX3NwTW9kYWxfKSB7XG5cbiAgICAgICAgICAgICAgICByb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAgICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcblxuICAgICAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICAgICAgICAgc2V0dXBNb2RhbE1vY2soX3NwTW9kYWxfLCAkcSk7XG5cbiAgICAgICAgICAgICAgICBjaGFuZ2VQYXNzd29yZFNlcnZpY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpdGhTTVM6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHJvdXRpbmdTZXJ2aWNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVTdWNjZXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyKCdTTVNSZXNldEN0cmwnLCB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZTogY2hhbmdlUGFzc3dvcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICB1bmxvY2tBY2NvdW50U2VydmljZTogdW5sb2NrQWNjb3VudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIHJvdXRpbmdTZXJ2aWNlOiByb3V0aW5nU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgc3BNb2RhbDogc3BNb2RhbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBkZXNjcmliZSgnVmFsaWQgRGF0YSwgU3VjY2VzcyBjaGFuZ2VQYXNzd29yZFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGl0KCdzaG91bGQgYWxsb3cgc3VibWl0IHRvIGJlIGNhbGxlZCBzdWNjZXNzZnVsbHkgYW5kIGNhbGxsb2dpblVzZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc3B5T24oc2NvcGUsICdzaG93UmVzZXRQb3B1cCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVXaXRoVmFsaWREYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgICAgICByb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjaGFuZ2VQYXNzd29yZFNlcnZpY2Uud2l0aFNNUykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuc2hvd1Jlc2V0UG9wdXApLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qocm91dGluZ1NlcnZpY2UubmF2aWdhdGVTdWNjZXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhY2NvdW50IHVubG9jazonLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9DcmVhdGUgYSBtb2NrIFJlc2V0RGF0YVNlcnZpY2Ugc2VydmljZSB0aGF0IHdpbGwgYmUgdXNlZCBieSB0aGUgUm91dGluZ1NlcnZpY2UuXG4gICAgICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICAgICAvLyBQcm92aWRlIHRoZSBtb2NrIGFzIHRoZSBSZXNldERhdGFTZXJ2aWNlLCBzbyB0aGlzIHNlcnZpY2Ugd2lsbCB1c2UgaXQuXG4gICAgICAgICAgICAkcHJvdmlkZS5mYWN0b3J5KCdyZXNldERhdGFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc21zU3RhdHVzOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnYWNjb3VudFVubG9jaydcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cEJhY2tlbmQsICRjb250cm9sbGVyLCAkcSkge1xuXG4gICAgICAgICAgICByb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgIGh0dHAgPSAkaHR0cEJhY2tlbmQ7XG5cbiAgICAgICAgICAgIHVubG9ja0FjY291bnRTZXJ2aWNlID0ge1xuICAgICAgICAgICAgICAgIHdpdGhTTVM6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe2RhdGE6IHttZXNzYWdlOiBbJ1Bhc3N3b3JkIFBvbGljeSB2aW9sYXRlZC4nXX0sIHN0YXR1czogNTAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRjb250cm9sbGVyKCdTTVNSZXNldEN0cmwnLCB7XG4gICAgICAgICAgICAgICAgJHNjb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICB1bmxvY2tBY2NvdW50U2VydmljZTogdW5sb2NrQWNjb3VudFNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICB9KSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2NhbGwgc3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgnd2l0aCBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVdpdGhWYWxpZERhdGEoKTtcbiAgICAgICAgICAgICAgICBzY29wZS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgICByb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHVubG9ja0FjY291bnRTZXJ2aWNlLndpdGhTTVMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuZXJyb3JNZXNzYWdlcykudG9CZSgnUGFzc3dvcmQgUG9saWN5IHZpb2xhdGVkLicpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5zbXNTdGF0dXMuc2hvdykudG9CZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
