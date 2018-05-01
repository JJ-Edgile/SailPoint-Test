System.register(['test/js/TestInitializer', 'adminConsole/AdminConsoleAppModule.js', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var adminConsoleModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleAdminConsoleAppModuleJs) {
            adminConsoleModule = _adminConsoleAdminConsoleAppModuleJs['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('AdminConsolePageCtrl', function () {

                var testService = undefined,
                    $controller = undefined,
                    $state = undefined,
                    SHOW_TASKS = undefined,
                    SHOW_PROVISIONING = undefined,
                    $rootScope = undefined;

                beforeEach(module(adminConsoleModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SHOW_TASKS', true);
                    $provide.constant('SHOW_PROVISIONING', true);
                }));

                beforeEach(inject(function (_testService_, _$controller_, _$state_, _$rootScope_, _SHOW_TASKS_, _SHOW_PROVISIONING_) {
                    testService = _testService_;
                    $controller = _$controller_;
                    $state = _$state_;
                    $rootScope = _$rootScope_;
                    SHOW_TASKS = _SHOW_TASKS_;
                    SHOW_PROVISIONING = _SHOW_PROVISIONING_;
                }));

                function createController(showTasks, showProvisioning) {
                    var ctrl = $controller('AdminConsolePageCtrl', {
                        $state: $state,
                        SHOW_TASKS: showTasks,
                        SHOW_PROVISIONING: showProvisioning
                    });
                    $rootScope.$apply();
                    return ctrl;
                }

                describe('default tab access', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController(true, true);
                    });

                    it('should allow access to tasks tab', function () {
                        expect(ctrl.showTasksTab()).toBe(true);
                    });

                    it('should allow access to provisioning tab', function () {
                        expect(ctrl.showProvisioningTab()).toBe(true);
                    });

                    it('should have defaulted to the tasks tab', function () {
                        spyOn(ctrl, 'goTasksTab');
                        ctrl.goToDefaultTab();
                        expect(ctrl.goTasksTab).toHaveBeenCalled();
                    });
                });

                describe('only has task access', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController(true, false);
                    });

                    it('should not allow access to provisioning tab', function () {
                        expect(ctrl.showProvisioningTab()).toBe(false);
                    });

                    it('should allow access to tasks tab', function () {
                        expect(ctrl.showTasksTab()).toBe(true);
                    });

                    it('should have defaulted to the tasks tab', function () {
                        spyOn(ctrl, 'goTasksTab');
                        ctrl.goToDefaultTab();
                        expect(ctrl.goTasksTab).toHaveBeenCalled();
                    });
                });

                describe('only has provisioning access', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController(false, true);
                    });

                    it('should allow access to provisioning tab', function () {
                        expect(ctrl.showProvisioningTab()).toBe(true);
                    });

                    it('should not allow access to tasks tab', function () {
                        expect(ctrl.showTasksTab()).toBe(false);
                    });

                    it('should have defaulted to the provisioning tab', function () {
                        spyOn(ctrl, 'goProvisioningTab');
                        ctrl.goToDefaultTab();
                        expect(ctrl.goProvisioningTab).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9BZG1pbkNvbnNvbGVDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5Qyx1QkFBdUIsVUFBVSxTQUFTOzs7SUFHM0g7O0lBRUEsSUFBSSxvQkFBb0I7SUFDeEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0NBQXNDO1lBQzVGLHFCQUFxQixxQ0FBcUM7V0FDM0QsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyx3QkFBd0IsWUFBTTs7Z0JBRW5DLElBQUksY0FBVztvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQUUsYUFBVTtvQkFBRSxvQkFBaUI7b0JBQUUsYUFBVTs7Z0JBRS9FLFdBQVcsT0FBTyxvQkFBb0I7O2dCQUV0QyxXQUFXLE9BQU8sVUFBQSxVQUFZO29CQUMxQixTQUFTLFNBQVMsY0FBYztvQkFDaEMsU0FBUyxTQUFTLHFCQUFxQjs7O2dCQUczQyxXQUFXLE9BQU8sVUFBQyxlQUFlLGVBQWUsVUFBVSxjQUFjLGNBQWMscUJBQXdCO29CQUMzRyxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxhQUFhO29CQUNiLGFBQWE7b0JBQ2Isb0JBQW9COzs7Z0JBR3hCLFNBQVMsaUJBQWlCLFdBQVcsa0JBQWtCO29CQUNuRCxJQUFJLE9BQU8sWUFBWSx3QkFBd0I7d0JBQzNDLFFBQVE7d0JBQ1IsWUFBWTt3QkFDWixtQkFBbUI7O29CQUV2QixXQUFXO29CQUNYLE9BQU87OztnQkFHWCxTQUFTLHNCQUFzQixZQUFNO29CQUNqQyxJQUFJLE9BQUk7O29CQUVSLFdBQVcsWUFBTTt3QkFDYixPQUFPLGlCQUFpQixNQUFNOzs7b0JBR2xDLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLE9BQU8sS0FBSyxnQkFBZ0IsS0FBSzs7O29CQUdyQyxHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxPQUFPLEtBQUssdUJBQXVCLEtBQUs7OztvQkFHNUMsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsTUFBTSxNQUFNO3dCQUNaLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFlBQVk7Ozs7Z0JBS2hDLFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLElBQUksT0FBSTs7b0JBRVIsV0FBVyxZQUFNO3dCQUNiLE9BQU8saUJBQWlCLE1BQU07OztvQkFHbEMsR0FBRywrQ0FBK0MsWUFBTTt3QkFDcEQsT0FBTyxLQUFLLHVCQUF1QixLQUFLOzs7b0JBRzVDLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLE9BQU8sS0FBSyxnQkFBZ0IsS0FBSzs7O29CQUdyQyxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxNQUFNLE1BQU07d0JBQ1osS0FBSzt3QkFDTCxPQUFPLEtBQUssWUFBWTs7OztnQkFJaEMsU0FBUyxnQ0FBZ0MsWUFBTTtvQkFDM0MsSUFBSSxPQUFJOztvQkFFUixXQUFXLFlBQU07d0JBQ2IsT0FBTyxpQkFBaUIsT0FBTzs7O29CQUduQyxHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxPQUFPLEtBQUssdUJBQXVCLEtBQUs7OztvQkFHNUMsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsT0FBTyxLQUFLLGdCQUFnQixLQUFLOzs7b0JBR3JDLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELE1BQU0sTUFBTTt3QkFDWixLQUFLO3dCQUNMLE9BQU8sS0FBSyxtQkFBbUI7Ozs7OztHQWtCeEMiLCJmaWxlIjoiYWRtaW5Db25zb2xlL0FkbWluQ29uc29sZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhZG1pbkNvbnNvbGVNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL0FkbWluQ29uc29sZUFwcE1vZHVsZS5qcyc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWRtaW5Db25zb2xlUGFnZUN0cmwnLCAoKSA9PiB7XG5cbiAgICBsZXQgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkc3RhdGUsIFNIT1dfVEFTS1MsIFNIT1dfUFJPVklTSU9OSU5HLCAkcm9vdFNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWRtaW5Db25zb2xlTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSgkcHJvdmlkZSA9PiB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTSE9XX1RBU0tTJywgdHJ1ZSk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTSE9XX1BST1ZJU0lPTklORycsIHRydWUpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHN0YXRlXywgXyRyb290U2NvcGVfLCBfU0hPV19UQVNLU18sIF9TSE9XX1BST1ZJU0lPTklOR18pID0+IHtcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBTSE9XX1RBU0tTID0gX1NIT1dfVEFTS1NfO1xuICAgICAgICBTSE9XX1BST1ZJU0lPTklORyA9IF9TSE9XX1BST1ZJU0lPTklOR187XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihzaG93VGFza3MsIHNob3dQcm92aXNpb25pbmcpIHtcbiAgICAgICAgbGV0IGN0cmwgPSAkY29udHJvbGxlcignQWRtaW5Db25zb2xlUGFnZUN0cmwnLCB7XG4gICAgICAgICAgICAkc3RhdGU6ICRzdGF0ZSxcbiAgICAgICAgICAgIFNIT1dfVEFTS1M6IHNob3dUYXNrcyxcbiAgICAgICAgICAgIFNIT1dfUFJPVklTSU9OSU5HOiBzaG93UHJvdmlzaW9uaW5nXG4gICAgICAgIH0pO1xuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gY3RybDtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZGVmYXVsdCB0YWIgYWNjZXNzJywgKCkgPT4ge1xuICAgICAgICBsZXQgY3RybDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IGFjY2VzcyB0byB0YXNrcyB0YWInLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93VGFza3NUYWIoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBhY2Nlc3MgdG8gcHJvdmlzaW9uaW5nIHRhYicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dQcm92aXNpb25pbmdUYWIoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGRlZmF1bHRlZCB0byB0aGUgdGFza3MgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2dvVGFza3NUYWInKTtcbiAgICAgICAgICAgIGN0cmwuZ29Ub0RlZmF1bHRUYWIoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdvVGFza3NUYWIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbmx5IGhhcyB0YXNrIGFjY2VzcycsICgpID0+IHtcbiAgICAgICAgbGV0IGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih0cnVlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGFsbG93IGFjY2VzcyB0byBwcm92aXNpb25pbmcgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd1Byb3Zpc2lvbmluZ1RhYigpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBhY2Nlc3MgdG8gdGFza3MgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd1Rhc2tzVGFiKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBkZWZhdWx0ZWQgdG8gdGhlIHRhc2tzIHRhYicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnb1Rhc2tzVGFiJyk7XG4gICAgICAgICAgICBjdHJsLmdvVG9EZWZhdWx0VGFiKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nb1Rhc2tzVGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29ubHkgaGFzIHByb3Zpc2lvbmluZyBhY2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjdHJsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IGFjY2VzcyB0byBwcm92aXNpb25pbmcgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd1Byb3Zpc2lvbmluZ1RhYigpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBhbGxvdyBhY2Nlc3MgdG8gdGFza3MgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd1Rhc2tzVGFiKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgZGVmYXVsdGVkIHRvIHRoZSBwcm92aXNpb25pbmcgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2dvUHJvdmlzaW9uaW5nVGFiJyk7XG4gICAgICAgICAgICBjdHJsLmdvVG9EZWZhdWx0VGFiKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nb1Byb3Zpc2lvbmluZ1RhYikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
