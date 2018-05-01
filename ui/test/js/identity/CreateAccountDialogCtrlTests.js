System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule', './LinkTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_LinkTestData) {}],
        execute: function () {

            /**
             * Tests for the CreateAccountDialogCtrl.
             */
            describe('CreateAccountDialogCtrl', function () {

                var $uibModalInstance = undefined,
                    $controller = undefined,
                    testService = undefined,
                    manageAccountService = undefined,
                    manageAccountDataService = undefined,
                    identity = undefined,
                    suggestParam = undefined,
                    identityService = undefined,
                    $rootScope = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_manageAccountService_, _manageAccountDataService_, _identityService_, Identity, _testService_, _$controller_, _$rootScope_) {

                    // Save the services.
                    manageAccountService = _manageAccountService_;
                    manageAccountDataService = _manageAccountDataService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy()
                    };
                    identityService = _identityService_;
                    // Create an identity to test with.
                    identity = new Identity({ id: 'test1', displayableName: 'Test User1' });
                    suggestParam = { lcmApplication: true };

                    // Mock out the services
                    identityService.getIdentity = testService.createPromiseSpy(false, identity, {});
                    manageAccountService.getCreateAccountConfig = testService.createPromiseSpy(false, {
                        status: 200,
                        data: suggestParam
                    }, {});
                }));

                function createController() {
                    var ctrl = $controller('CreateAccountDialogCtrl', {
                        identityId: identity.getId(),
                        identityService: identityService,
                        manageAccountDataService: manageAccountDataService,
                        manageAccountService: manageAccountService,
                        createAccountConfig: {
                            accountOnlyAppsAvailable: true,
                            allowAccountOnlyRequests: true
                        },
                        $uibModalInstance: $uibModalInstance
                    });
                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                    return ctrl;
                }

                describe('load create account dialog ctrl', function () {
                    it('fetches application suggest parameters when loaded', function () {
                        // Create the controller to test with.
                        var ctrl = createController();

                        manageAccountDataService.addCreateAccountAction = testService.createPromiseSpy(false, {}, {});
                        ctrl.submit();
                        expect(manageAccountDataService.addCreateAccountAction).toHaveBeenCalled();
                    });

                    it('disable submit when application is not defined', function () {
                        // Create the controller to test with.
                        var ctrl = createController();

                        var disable = ctrl.disableSubmit();
                        expect(disable).toBeTruthy();
                    });

                    it('enable submit when application is defined', function () {
                        // Create the controller to test with.
                        var ctrl = createController();

                        ctrl.application = 'Test App';
                        var disable = ctrl.disableSubmit();
                        expect(disable).toBeFalsy();
                    });
                });

                describe('suggestParams', function () {
                    it('should have already requested applications', function () {
                        var mockAppId = 'bogusAppId',
                            ctrl = undefined,
                            params = undefined;
                        manageAccountDataService.addCreateAccountAction('fakeIdentityId', { id: mockAppId, name: 'bogusAppName' });
                        ctrl = createController();
                        params = ctrl.suggestParams;
                        expect(params.requestedApplications.length).toBe(1);
                        expect(params.requestedApplications[0]).toBe(mockAppId);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NyZWF0ZUFjY291bnREaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsbUJBQW1CLFVBQVUsU0FBUzs7O0lBRy9IOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsZUFBZTtRQUM1QixTQUFTLFlBQVk7Ozs7O1lBRjdCLFNBQVMsMkJBQTJCLFlBQVc7O2dCQUUzQyxJQUFJLG9CQUFpQjtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsdUJBQW9CO29CQUFFLDJCQUF3QjtvQkFDM0YsV0FBUTtvQkFBRSxlQUFZO29CQUFFLGtCQUFlO29CQUFFLGFBQVU7OztnQkFHdkQsV0FBVyxPQUFPLFlBQVk7Ozs7OztnQkFNOUIsV0FBVyxPQUFPLFVBQVMsd0JBQXdCLDRCQUMzQyxtQkFBbUIsVUFBVSxlQUFlLGVBQWUsY0FBYzs7O29CQUc3RSx1QkFBdUI7b0JBQ3ZCLDJCQUEyQjtvQkFDM0IsY0FBYztvQkFDZCxhQUFhO29CQUNiLGNBQWM7b0JBQ2Qsb0JBQW9CO3dCQUNaLE9BQU8sUUFBUTt3QkFDZixTQUFTLFFBQVE7O29CQUV6QixrQkFBa0I7O29CQUVsQixXQUFXLElBQUksU0FBUyxFQUFDLElBQUksU0FBUyxpQkFBaUI7b0JBQ3ZELGVBQWUsRUFBRSxnQkFBZ0I7OztvQkFHakMsZ0JBQWdCLGNBQWMsWUFBWSxpQkFBaUIsT0FBTyxVQUFVO29CQUM1RSxxQkFBcUIseUJBQ2pCLFlBQVksaUJBQWlCLE9BQU87d0JBQ2hDLFFBQVE7d0JBQ1IsTUFBTTt1QkFDUDs7O2dCQUdYLFNBQVMsbUJBQW1CO29CQUN4QixJQUFJLE9BQU8sWUFBWSwyQkFBMkI7d0JBQzlDLFlBQVksU0FBUzt3QkFDckIsaUJBQWlCO3dCQUNqQiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIscUJBQXFCOzRCQUNqQiwwQkFBMEI7NEJBQzFCLDBCQUEwQjs7d0JBRTlCLG1CQUFtQjs7O29CQUd2QixXQUFXO29CQUNYLE9BQU87OztnQkFHWCxTQUFTLG1DQUFtQyxZQUFXO29CQUNuRCxHQUFHLHNEQUFzRCxZQUFXOzt3QkFFaEUsSUFBSSxPQUFPOzt3QkFFWCx5QkFBeUIseUJBQXlCLFlBQVksaUJBQWlCLE9BQU8sSUFBSTt3QkFDMUYsS0FBSzt3QkFDTCxPQUFPLHlCQUF5Qix3QkFBd0I7OztvQkFHNUQsR0FBRyxrREFBa0QsWUFBVzs7d0JBRTVELElBQUksT0FBTzs7d0JBRVgsSUFBSSxVQUFVLEtBQUs7d0JBQ25CLE9BQU8sU0FBUzs7O29CQUdwQixHQUFHLDZDQUE2QyxZQUFXOzt3QkFFdkQsSUFBSSxPQUFPOzt3QkFFWCxLQUFLLGNBQWM7d0JBQ25CLElBQUksVUFBVSxLQUFLO3dCQUNuQixPQUFPLFNBQVM7Ozs7Z0JBSXhCLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcsOENBQThDLFlBQVc7d0JBQ3hELElBQUksWUFBWTs0QkFDWixPQUFJOzRCQUFFLFNBQU07d0JBQ2hCLHlCQUF5Qix1QkFBdUIsa0JBQWtCLEVBQUMsSUFBSSxXQUFXLE1BQU07d0JBQ3hGLE9BQU87d0JBQ1AsU0FBUyxLQUFLO3dCQUNkLE9BQU8sT0FBTyxzQkFBc0IsUUFBUSxLQUFLO3dCQUNqRCxPQUFPLE9BQU8sc0JBQXNCLElBQUksS0FBSzs7Ozs7O0dBbUJ0RCIsImZpbGUiOiJpZGVudGl0eS9DcmVhdGVBY2NvdW50RGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vTGlua1Rlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIENyZWF0ZUFjY291bnREaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnQ3JlYXRlQWNjb3VudERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkdWliTW9kYWxJbnN0YW5jZSwgJGNvbnRyb2xsZXIsIHRlc3RTZXJ2aWNlLCBtYW5hZ2VBY2NvdW50U2VydmljZSwgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLFxuICAgICAgICBpZGVudGl0eSwgc3VnZ2VzdFBhcmFtLCBpZGVudGl0eVNlcnZpY2UsICRyb290U2NvcGU7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX21hbmFnZUFjY291bnRTZXJ2aWNlXywgX21hbmFnZUFjY291bnREYXRhU2VydmljZV8sXG4gICAgICAgICAgICBfaWRlbnRpdHlTZXJ2aWNlXywgSWRlbnRpdHksIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICBtYW5hZ2VBY2NvdW50U2VydmljZSA9IF9tYW5hZ2VBY2NvdW50U2VydmljZV87XG4gICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZSA9IF9tYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICAgICAgZGlzbWlzczogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIC8vIENyZWF0ZSBhbiBpZGVudGl0eSB0byB0ZXN0IHdpdGguXG4gICAgICAgIGlkZW50aXR5ID0gbmV3IElkZW50aXR5KHtpZDogJ3Rlc3QxJywgZGlzcGxheWFibGVOYW1lOiAnVGVzdCBVc2VyMSd9KTtcbiAgICAgICAgc3VnZ2VzdFBhcmFtID0geyBsY21BcHBsaWNhdGlvbjogdHJ1ZSB9O1xuXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBzZXJ2aWNlc1xuICAgICAgICBpZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdHkgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCBpZGVudGl0eSwge30pO1xuICAgICAgICBtYW5hZ2VBY2NvdW50U2VydmljZS5nZXRDcmVhdGVBY2NvdW50Q29uZmlnID1cbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiBzdWdnZXN0UGFyYW1cbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICBsZXQgY3RybCA9ICRjb250cm9sbGVyKCdDcmVhdGVBY2NvdW50RGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6IGlkZW50aXR5LmdldElkKCksXG4gICAgICAgICAgICBpZGVudGl0eVNlcnZpY2U6IGlkZW50aXR5U2VydmljZSxcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZTogbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2U6IG1hbmFnZUFjY291bnRTZXJ2aWNlLFxuICAgICAgICAgICAgY3JlYXRlQWNjb3VudENvbmZpZzoge1xuICAgICAgICAgICAgICAgIGFjY291bnRPbmx5QXBwc0F2YWlsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd0FjY291bnRPbmx5UmVxdWVzdHM6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gY3RybDtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnbG9hZCBjcmVhdGUgYWNjb3VudCBkaWFsb2cgY3RybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZmV0Y2hlcyBhcHBsaWNhdGlvbiBzdWdnZXN0IHBhcmFtZXRlcnMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmFkZENyZWF0ZUFjY291bnRBY3Rpb24gPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7fSwge30pO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuYWRkQ3JlYXRlQWNjb3VudEFjdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZGlzYWJsZSBzdWJtaXQgd2hlbiBhcHBsaWNhdGlvbiBpcyBub3QgZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBsZXQgZGlzYWJsZSA9IGN0cmwuZGlzYWJsZVN1Ym1pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGRpc2FibGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VuYWJsZSBzdWJtaXQgd2hlbiBhcHBsaWNhdGlvbiBpcyBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGN0cmwuYXBwbGljYXRpb24gPSAnVGVzdCBBcHAnO1xuICAgICAgICAgICAgbGV0IGRpc2FibGUgPSBjdHJsLmRpc2FibGVTdWJtaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChkaXNhYmxlKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VnZ2VzdFBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYWxyZWFkeSByZXF1ZXN0ZWQgYXBwbGljYXRpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgbW9ja0FwcElkID0gJ2JvZ3VzQXBwSWQnLFxuICAgICAgICAgICAgICAgIGN0cmwsIHBhcmFtcztcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZS5hZGRDcmVhdGVBY2NvdW50QWN0aW9uKCdmYWtlSWRlbnRpdHlJZCcsIHtpZDogbW9ja0FwcElkLCBuYW1lOiAnYm9ndXNBcHBOYW1lJ30pO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHBhcmFtcyA9IGN0cmwuc3VnZ2VzdFBhcmFtcztcbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMucmVxdWVzdGVkQXBwbGljYXRpb25zLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChwYXJhbXMucmVxdWVzdGVkQXBwbGljYXRpb25zWzBdKS50b0JlKG1vY2tBcHBJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
