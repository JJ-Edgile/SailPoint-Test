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
             * Tests for the GeneratePasswordDialogCtrl.
             */
            describe('GeneratePasswordDialogCtrl', function () {

                var $rootScope = undefined,
                    $controller = undefined,
                    $httpBackend = undefined,
                    testService = undefined,
                    managePasswordService = undefined,
                    ctrl = undefined,
                    $q = undefined;

                // Load the test module to get the testService and identity module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_managePasswordService_, _testService_, _$controller_, _$rootScope_, _$httpBackend_, _$q_) {

                    // Save the services.
                    managePasswordService = _managePasswordService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    $q = _$q_;
                }));

                describe('generate password ctrl', function () {
                    it('generates password', function () {
                        var generateURL = '/ui/rest/quickLinks/Manage%20Passwords/identities/id1/links/generatePassword';

                        // Create the controller to test with.
                        ctrl = $controller('GeneratePasswordDialogCtrl', {
                            managePasswordService: managePasswordService,
                            supportsSynchronize: false,
                            selectionModel: {},
                            identityId: 'id1'
                        });

                        spyOn(managePasswordService, 'generatePasswords').and.returnValue($q.when('hooray'));
                        $httpBackend.expectPOST(generateURL).respond(200, { object: { bulkChanges: [] } });
                        ctrl.submit();
                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        expect(managePasswordService.generatePasswords).toHaveBeenCalled();
                        expect(ctrl.isSynchronized()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0dlbmVyYXRlUGFzc3dvcmREaWFsb2dDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHNCQUFzQixtQkFBbUIsVUFBVSxTQUFTOzs7SUFHL0g7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxlQUFlO1FBQzVCLFNBQVMsWUFBWTs7Ozs7WUFGN0IsU0FBUyw4QkFBOEIsWUFBVzs7Z0JBRTlDLElBQUksYUFBVTtvQkFBRSxjQUFXO29CQUFFLGVBQVk7b0JBQUUsY0FBVztvQkFBRSx3QkFBcUI7b0JBQUUsT0FBSTtvQkFBRSxLQUFFOzs7Z0JBR3ZGLFdBQVcsT0FBTyxZQUFZOzs7OztnQkFLOUIsV0FBVyxPQUFPLFVBQVMseUJBQXlCLGVBQWUsZUFDM0QsY0FBYyxnQkFBZ0IsTUFBTTs7O29CQUd4Qyx3QkFBd0I7b0JBQ3hCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsS0FBSzs7O2dCQUdULFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLEdBQUcsc0JBQXNCLFlBQVc7d0JBQ2hDLElBQUksY0FDQTs7O3dCQUdKLE9BQU8sWUFBWSw4QkFBOEI7NEJBQzdDLHVCQUF1Qjs0QkFDdkIscUJBQXFCOzRCQUNyQixnQkFBZ0I7NEJBQ2hCLFlBQVk7Ozt3QkFHaEIsTUFBTSx1QkFBdUIscUJBQXFCLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQzFFLGFBQWEsV0FBVyxhQUFhLFFBQVEsS0FBSyxFQUFDLFFBQVEsRUFBQyxhQUFhO3dCQUN6RSxLQUFLOzt3QkFFTCxXQUFXO3dCQUNYLE9BQU8sc0JBQXNCLG1CQUFtQjt3QkFDaEQsT0FBTyxLQUFLLGtCQUFrQjs7Ozs7O0dBaUJ2QyIsImZpbGUiOiJpZGVudGl0eS9HZW5lcmF0ZVBhc3N3b3JkRGlhbG9nQ3RybFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4vTGlua1Rlc3REYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEdlbmVyYXRlUGFzc3dvcmREaWFsb2dDdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0dlbmVyYXRlUGFzc3dvcmREaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0ICRyb290U2NvcGUsICRjb250cm9sbGVyLCAkaHR0cEJhY2tlbmQsIHRlc3RTZXJ2aWNlLCBtYW5hZ2VQYXNzd29yZFNlcnZpY2UsIGN0cmwsICRxO1xyXG5cclxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGlkZW50aXR5IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGlkZW50aXR5TW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxyXG4gICAgICAgICAgICBfJHJvb3RTY29wZV8sIF8kaHR0cEJhY2tlbmRfLCBfJHFfKSB7XHJcblxyXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxyXG4gICAgICAgIG1hbmFnZVBhc3N3b3JkU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcclxuICAgICAgICAkcSA9IF8kcV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dlbmVyYXRlIHBhc3N3b3JkIGN0cmwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZ2VuZXJhdGVzIHBhc3N3b3JkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBnZW5lcmF0ZVVSTCA9XHJcbiAgICAgICAgICAgICAgICAnL3VpL3Jlc3QvcXVpY2tMaW5rcy9NYW5hZ2UlMjBQYXNzd29yZHMvaWRlbnRpdGllcy9pZDEvbGlua3MvZ2VuZXJhdGVQYXNzd29yZCc7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0dlbmVyYXRlUGFzc3dvcmREaWFsb2dDdHJsJywge1xyXG4gICAgICAgICAgICAgICAgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlOiBtYW5hZ2VQYXNzd29yZFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0c1N5bmNocm9uaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsOiB7fSxcclxuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICdpZDEnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnZ2VuZXJhdGVQYXNzd29yZHMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbignaG9vcmF5JykpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChnZW5lcmF0ZVVSTCkucmVzcG9uZCgyMDAsIHtvYmplY3Q6IHtidWxrQ2hhbmdlczogW119fSk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmRTZXJ2aWNlLmdlbmVyYXRlUGFzc3dvcmRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3luY2hyb25pemVkKCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
