System.register(['test/js/TestInitializer', 'ssr/SelfServiceRegistrationModule'], function (_export) {
    'use strict';

    var ssrModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_ssrSelfServiceRegistrationModule) {
            ssrModule = _ssrSelfServiceRegistrationModule['default'];
        }],
        execute: function () {

            describe('SelfServiceRegistrationSuccessPageCtrl', function () {
                var ctrl,
                    navigationService,
                    configService,
                    $controller,
                    SP_CONFIG_SERVICE = {
                    SSR_REDIRECT_URL: 'SSR_REDIRECT_URL',
                    SSR_LOGIN_OUTCOME: 'SSR_LOGIN_OUTCOME'
                };

                beforeEach(module(ssrModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONFIG_SERVICE', SP_CONFIG_SERVICE);
                }));

                beforeEach(inject(function (_$controller_, _configService_) {
                    $controller = _$controller_;
                    configService = _configService_;

                    navigationService = {
                        go: jasmine.createSpy()
                    };
                }));

                function createController() {
                    ctrl = $controller('SelfServiceRegistrationSuccessPageCtrl', {
                        navigationService: navigationService,
                        configService: configService,
                        SP_CONFIG_SERVICE: SP_CONFIG_SERVICE
                    });
                }

                describe('onLoginClick', function () {

                    it('should navigate the window to a configured URL', function () {
                        var URL = 'http://www.google.com';

                        spyOn(configService, 'getConfigValue').and.callFake(function (key) {
                            return key === SP_CONFIG_SERVICE.SSR_REDIRECT_URL ? URL : undefined;
                        });

                        createController();

                        ctrl.onLoginClick();

                        expect(navigationService.go).toHaveBeenCalledWith({ url: URL });
                    });

                    it('should navigate to configured outcome when no URL', function () {
                        var OUTCOME = 'mobileLogoutSuccess';

                        spyOn(configService, 'getConfigValue').and.callFake(function (key) {
                            return key === SP_CONFIG_SERVICE.SSR_REDIRECT_URL ? undefined : OUTCOME;
                        });

                        createController();

                        ctrl.onLoginClick();

                        expect(navigationService.go).toHaveBeenCalledWith({ outcome: OUTCOME });
                    });

                    it('should navigate to fallback outcome', function () {
                        var FALLBACK = 'logoutSuccess';

                        spyOn(configService, 'getConfigValue').and.returnValue(undefined);

                        createController();

                        ctrl.onLoginClick();

                        expect(navigationService.go).toHaveBeenCalledWith({ outcome: FALLBACK });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNzci9TZWxmU2VydmljZVJlZ2lzdHJhdGlvblN1Y2Nlc3NQYWdlQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTO0lBQ3JHOztJQUVJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsWUFBWSxrQ0FBa0M7O1FBRWxELFNBQVMsWUFBWTs7WUFGN0IsU0FBUywwQ0FBMEMsWUFBVztnQkFDMUQsSUFBSTtvQkFDQTtvQkFDQTtvQkFDQTtvQkFDQSxvQkFBb0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsbUJBQW1COzs7Z0JBRzNCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxxQkFBcUI7OztnQkFHM0MsV0FBVyxPQUFPLFVBQVMsZUFBZ0IsaUJBQWlCO29CQUN4RCxjQUFjO29CQUNkLGdCQUFnQjs7b0JBRWhCLG9CQUFvQjt3QkFDaEIsSUFBSSxRQUFROzs7O2dCQUlwQixTQUFTLG1CQUFtQjtvQkFDeEIsT0FBTyxZQUFZLDBDQUEwQzt3QkFDekQsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLG1CQUFtQjs7OztnQkFJM0IsU0FBUyxnQkFBZ0IsWUFBVzs7b0JBRWhDLEdBQUcsa0RBQWtELFlBQVc7d0JBQzVELElBQUksTUFBTTs7d0JBRVYsTUFBTSxlQUFlLGtCQUFrQixJQUFJLFNBQVMsVUFBUyxLQUFLOzRCQUM5RCxPQUFPLFFBQVEsa0JBQWtCLG1CQUFtQixNQUFNOzs7d0JBRzlEOzt3QkFFQSxLQUFLOzt3QkFFTCxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQixFQUFFLEtBQUs7OztvQkFHN0QsR0FBRyxxREFBcUQsWUFBVzt3QkFDL0QsSUFBSSxVQUFVOzt3QkFFZCxNQUFNLGVBQWUsa0JBQWtCLElBQUksU0FBUyxVQUFTLEtBQUs7NEJBQzlELE9BQU8sUUFBUSxrQkFBa0IsbUJBQW1CLFlBQVk7Ozt3QkFHcEU7O3dCQUVBLEtBQUs7O3dCQUVMLE9BQU8sa0JBQWtCLElBQUkscUJBQXFCLEVBQUUsU0FBUzs7O29CQUdqRSxHQUFHLHVDQUF1QyxZQUFXO3dCQUNqRCxJQUFJLFdBQVc7O3dCQUVmLE1BQU0sZUFBZSxrQkFBa0IsSUFBSSxZQUFZOzt3QkFFdkQ7O3dCQUVBLEtBQUs7O3dCQUVMLE9BQU8sa0JBQWtCLElBQUkscUJBQXFCLEVBQUUsU0FBUzs7Ozs7O0dBVXRFIiwiZmlsZSI6InNzci9TZWxmU2VydmljZVJlZ2lzdHJhdGlvblN1Y2Nlc3NQYWdlQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHNzck1vZHVsZSBmcm9tICdzc3IvU2VsZlNlcnZpY2VSZWdpc3RyYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnU2VsZlNlcnZpY2VSZWdpc3RyYXRpb25TdWNjZXNzUGFnZUN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3RybCxcbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgIGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICRjb250cm9sbGVyLFxuICAgICAgICBTUF9DT05GSUdfU0VSVklDRSA9IHtcbiAgICAgICAgICAgIFNTUl9SRURJUkVDVF9VUkw6ICdTU1JfUkVESVJFQ1RfVVJMJyxcbiAgICAgICAgICAgIFNTUl9MT0dJTl9PVVRDT01FOiAnU1NSX0xPR0lOX09VVENPTUUnXG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzc3JNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05GSUdfU0VSVklDRScsIFNQX0NPTkZJR19TRVJWSUNFKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCAgX2NvbmZpZ1NlcnZpY2VfKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgY29uZmlnU2VydmljZSA9IF9jb25maWdTZXJ2aWNlXztcblxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdvOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdTZWxmU2VydmljZVJlZ2lzdHJhdGlvblN1Y2Nlc3NQYWdlQ3RybCcsIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICBTUF9DT05GSUdfU0VSVklDRTogU1BfQ09ORklHX1NFUlZJQ0VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ29uTG9naW5DbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdGhlIHdpbmRvdyB0byBhIGNvbmZpZ3VyZWQgVVJMJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgVVJMID0gJ2h0dHA6Ly93d3cuZ29vZ2xlLmNvbSc7XG5cbiAgICAgICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb25maWdWYWx1ZScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ID09PSBTUF9DT05GSUdfU0VSVklDRS5TU1JfUkVESVJFQ1RfVVJMID8gVVJMIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgY3RybC5vbkxvZ2luQ2xpY2soKTtcblxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHVybDogVVJMIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIGNvbmZpZ3VyZWQgb3V0Y29tZSB3aGVuIG5vIFVSTCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIE9VVENPTUUgPSAnbW9iaWxlTG9nb3V0U3VjY2Vzcyc7XG5cbiAgICAgICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb25maWdWYWx1ZScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ID09PSBTUF9DT05GSUdfU0VSVklDRS5TU1JfUkVESVJFQ1RfVVJMID8gdW5kZWZpbmVkIDogT1VUQ09NRTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGN0cmwub25Mb2dpbkNsaWNrKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBvdXRjb21lOiBPVVRDT01FIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIGZhbGxiYWNrIG91dGNvbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBGQUxMQkFDSyA9ICdsb2dvdXRTdWNjZXNzJztcblxuICAgICAgICAgICAgc3B5T24oY29uZmlnU2VydmljZSwgJ2dldENvbmZpZ1ZhbHVlJykuYW5kLnJldHVyblZhbHVlKHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgY3RybC5vbkxvZ2luQ2xpY2soKTtcblxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IG91dGNvbWU6IEZBTExCQUNLIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
