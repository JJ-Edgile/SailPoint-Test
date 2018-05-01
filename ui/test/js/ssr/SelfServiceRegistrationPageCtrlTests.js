System.register(['test/js/TestInitializer', 'ssr/SelfServiceRegistrationModule'], function (_export) {
    'use strict';

    var ssrModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_ssrSelfServiceRegistrationModule) {
            ssrModule = _ssrSelfServiceRegistrationModule['default'];
        }],
        execute: function () {

            describe('SelfServiceRegistrationPageCtrl', function () {
                var ctrl,
                    formService,
                    navigationService,
                    configService,
                    $controller,
                    $q,
                    SP_CONFIG_SERVICE = {
                    SSR_REDIRECT_URL: 'SSR_REDIRECT_URL',
                    SSR_LOGIN_OUTCOME: 'SSR_LOGIN_OUTCOME'
                };

                beforeEach(module(ssrModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONFIG_SERVICE', SP_CONFIG_SERVICE);
                }));

                beforeEach(inject(function (_$controller_, _$q_, _configService_) {
                    $controller = _$controller_;
                    $q = _$q_;
                    configService = _configService_;

                    formService = {
                        getSessionForm: jasmine.createSpy().and.returnValue($q.when({}))
                    };

                    navigationService = {
                        go: jasmine.createSpy()
                    };
                }));

                function createController() {
                    ctrl = $controller('SelfServiceRegistrationPageCtrl', {
                        formService: formService,
                        navigationService: navigationService,
                        configService: configService,
                        SP_CONFIG_SERVICE: SP_CONFIG_SERVICE
                    });
                }

                describe('load', function () {

                    it('should load the form when initialized', function () {
                        createController();

                        expect(formService.getSessionForm).toHaveBeenCalled();
                    });
                });

                describe('onSuccess', function () {

                    it('should reload the form when not complete', function () {
                        var result = {
                            nextWorkItemType: 'Form'
                        };

                        createController();

                        ctrl.onSuccess(result);

                        expect(formService.getSessionForm.calls.count()).toEqual(2);
                    });

                    it('should navigate to configured outcome upon cancellation', function () {
                        var OUTCOME = 'logoutSuccess',
                            result = {
                            nextWorkItemType: undefined,
                            cancelled: true
                        };

                        spyOn(configService, 'getConfigValue').and.returnValue(OUTCOME);

                        createController();

                        ctrl.onSuccess(result);

                        expect(configService.getConfigValue).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalledWith({ outcome: OUTCOME });
                    });

                    it('should navigate to fallback if no configured outcome upon cancellation', function () {
                        var result = {
                            nextWorkItemType: undefined,
                            cancelled: true
                        };

                        spyOn(configService, 'getConfigValue').and.returnValue(undefined);

                        createController();

                        ctrl.onSuccess(result);

                        expect(configService.getConfigValue).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalledWith({ outcome: 'logoutSuccess' });
                    });

                    it('should navigate to success upon completion', function () {
                        var result = {
                            nextWorkItemType: undefined
                        };

                        createController();

                        ctrl.onSuccess(result);

                        expect(navigationService.go).toHaveBeenCalledWith({ state: 'registrationSuccess' });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNzci9TZWxmU2VydmljZVJlZ2lzdHJhdGlvblBhZ2VDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFDckc7O0lBRUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixZQUFZLGtDQUFrQzs7UUFFbEQsU0FBUyxZQUFZOztZQUY3QixTQUFTLG1DQUFtQyxZQUFXO2dCQUNuRCxJQUFJO29CQUNBO29CQUNBO29CQUNBO29CQUNBO29CQUNBO29CQUNBLG9CQUFvQjtvQkFDaEIsa0JBQWtCO29CQUNsQixtQkFBbUI7OztnQkFHM0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLHFCQUFxQjs7O2dCQUczQyxXQUFXLE9BQU8sVUFBUyxlQUFlLE1BQU0saUJBQWlCO29CQUM3RCxjQUFjO29CQUNkLEtBQUs7b0JBQ0wsZ0JBQWdCOztvQkFFaEIsY0FBYzt3QkFDVixnQkFBZ0IsUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHLEtBQUs7OztvQkFHaEUsb0JBQW9CO3dCQUNoQixJQUFJLFFBQVE7Ozs7Z0JBSXBCLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksbUNBQW1DO3dCQUNsRCxhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixtQkFBbUI7Ozs7Z0JBSTNCLFNBQVMsUUFBUSxZQUFXOztvQkFFeEIsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQ7O3dCQUVBLE9BQU8sWUFBWSxnQkFBZ0I7Ozs7Z0JBSzNDLFNBQVMsYUFBYSxZQUFXOztvQkFFN0IsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsSUFBSSxTQUFTOzRCQUNULGtCQUFrQjs7O3dCQUd0Qjs7d0JBRUEsS0FBSyxVQUFVOzt3QkFFZixPQUFPLFlBQVksZUFBZSxNQUFNLFNBQVMsUUFBUTs7O29CQUc3RCxHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxJQUFJLFVBQVU7NEJBQ1YsU0FBUzs0QkFDTCxrQkFBa0I7NEJBQ2xCLFdBQVc7Ozt3QkFHbkIsTUFBTSxlQUFlLGtCQUFrQixJQUFJLFlBQVk7O3dCQUV2RDs7d0JBRUEsS0FBSyxVQUFVOzt3QkFFZixPQUFPLGNBQWMsZ0JBQWdCO3dCQUNyQyxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQixFQUFFLFNBQVM7OztvQkFHakUsR0FBRywwRUFBMEUsWUFBVzt3QkFDcEYsSUFBSSxTQUFTOzRCQUNULGtCQUFrQjs0QkFDbEIsV0FBVzs7O3dCQUdmLE1BQU0sZUFBZSxrQkFBa0IsSUFBSSxZQUFZOzt3QkFFdkQ7O3dCQUVBLEtBQUssVUFBVTs7d0JBRWYsT0FBTyxjQUFjLGdCQUFnQjt3QkFDckMsT0FBTyxrQkFBa0IsSUFBSSxxQkFBcUIsRUFBRSxTQUFTOzs7b0JBR2pFLEdBQUcsOENBQThDLFlBQVc7d0JBQ3hELElBQUksU0FBUzs0QkFDVCxrQkFBa0I7Ozt3QkFHdEI7O3dCQUVBLEtBQUssVUFBVTs7d0JBRWYsT0FBTyxrQkFBa0IsSUFBSSxxQkFBcUIsRUFBRSxPQUFPOzs7Ozs7R0FTcEUiLCJmaWxlIjoic3NyL1NlbGZTZXJ2aWNlUmVnaXN0cmF0aW9uUGFnZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBzc3JNb2R1bGUgZnJvbSAnc3NyL1NlbGZTZXJ2aWNlUmVnaXN0cmF0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ1NlbGZTZXJ2aWNlUmVnaXN0cmF0aW9uUGFnZUN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3RybCxcbiAgICAgICAgZm9ybVNlcnZpY2UsXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICBjb25maWdTZXJ2aWNlLFxuICAgICAgICAkY29udHJvbGxlcixcbiAgICAgICAgJHEsXG4gICAgICAgIFNQX0NPTkZJR19TRVJWSUNFID0ge1xuICAgICAgICAgICAgU1NSX1JFRElSRUNUX1VSTDogJ1NTUl9SRURJUkVDVF9VUkwnLFxuICAgICAgICAgICAgU1NSX0xPR0lOX09VVENPTUU6ICdTU1JfTE9HSU5fT1VUQ09NRSdcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHNzck1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTkZJR19TRVJWSUNFJywgU1BfQ09ORklHX1NFUlZJQ0UpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcV8sIF9jb25maWdTZXJ2aWNlXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgY29uZmlnU2VydmljZSA9IF9jb25maWdTZXJ2aWNlXztcblxuICAgICAgICBmb3JtU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldFNlc3Npb25Gb3JtOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHt9KSlcbiAgICAgICAgfTtcblxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdvOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdTZWxmU2VydmljZVJlZ2lzdHJhdGlvblBhZ2VDdHJsJywge1xuICAgICAgICAgICAgZm9ybVNlcnZpY2U6IGZvcm1TZXJ2aWNlLFxuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2U6IG5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgY29uZmlnU2VydmljZTogY29uZmlnU2VydmljZSxcbiAgICAgICAgICAgIFNQX0NPTkZJR19TRVJWSUNFOiBTUF9DT05GSUdfU0VSVklDRVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnbG9hZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgbG9hZCB0aGUgZm9ybSB3aGVuIGluaXRpYWxpemVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5nZXRTZXNzaW9uRm9ybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVsb2FkIHRoZSBmb3JtIHdoZW4gbm90IGNvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLm9uU3VjY2VzcyhyZXN1bHQpO1xuXG4gICAgICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2UuZ2V0U2Vzc2lvbkZvcm0uY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSB0byBjb25maWd1cmVkIG91dGNvbWUgdXBvbiBjYW5jZWxsYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBPVVRDT01FID0gJ2xvZ291dFN1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtVHlwZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0Q29uZmlnVmFsdWUnKS5hbmQucmV0dXJuVmFsdWUoT1VUQ09NRSk7XG5cbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgY3RybC5vblN1Y2Nlc3MocmVzdWx0KTtcblxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBvdXRjb21lOiBPVVRDT01FIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIGZhbGxiYWNrIGlmIG5vIGNvbmZpZ3VyZWQgb3V0Y29tZSB1cG9uIGNhbmNlbGxhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkOiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0Q29uZmlnVmFsdWUnKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLm9uU3VjY2VzcyhyZXN1bHQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IG91dGNvbWU6ICdsb2dvdXRTdWNjZXNzJyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSB0byBzdWNjZXNzIHVwb24gY29tcGxldGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgY3RybC5vblN1Y2Nlc3MocmVzdWx0KTtcblxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHN0YXRlOiAncmVnaXN0cmF0aW9uU3VjY2VzcycgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
