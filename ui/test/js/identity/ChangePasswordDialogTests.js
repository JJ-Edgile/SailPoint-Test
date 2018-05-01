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
             * Tests for the SyncPasswordDialogCtrl.
             */
            describe('ChangePasswordDialogCtrl', function () {

                var quickLink = 'Manage%20Passwords';
                var $rootScope = undefined,
                    $controller = undefined,
                    $httpBackend = undefined,
                    testService = undefined,
                    managePasswordService = undefined,
                    ctrl = undefined,
                    $q = undefined,
                    $uibModalInstance = undefined,
                    promiseTrackerService = undefined,
                    link = undefined,
                    identityId = undefined,
                    IdentityRequestItem = undefined,
                    PasswordChangeResultItem = undefined,
                    managePasswordDataService = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 12 */
                beforeEach(inject(function (_managePasswordService_, _managePasswordDataService_, _testService_, _$controller_, _$rootScope_, _$httpBackend_, _$q_, _promiseTrackerService_, PasswordLink, linkTestData, _IdentityRequestItem_, _PasswordChangeResultItem_) {

                    // Save the services.
                    managePasswordDataService = _managePasswordDataService_;
                    managePasswordService = _managePasswordService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    $q = _$q_;
                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy(),
                        setTitle: jasmine.createSpy()
                    };
                    IdentityRequestItem = _IdentityRequestItem_;
                    promiseTrackerService = _promiseTrackerService_;
                    PasswordChangeResultItem = _PasswordChangeResultItem_;
                    link = new PasswordLink(linkTestData.LINK1);
                    identityId = link.getIdentityId();
                }));

                beforeEach(function () {
                    // Create the controller to test with.
                    ctrl = $controller('ChangePasswordDialogCtrl', {
                        managePasswordService: managePasswordService,
                        managePasswordDataService: managePasswordDataService,
                        $uibModalInstance: $uibModalInstance,
                        promiseTrackerService: promiseTrackerService,
                        identityId: identityId,
                        link: link,
                        IdentityRequestItem: IdentityRequestItem
                    });
                });

                describe('change password dialog ctrl isSubmitDisabled', function () {
                    it('submit button should be disabled', function () {
                        var submitDisabled = ctrl.isSubmitDisabled();
                        expect(submitDisabled).toBeTruthy();
                    });

                    it('submit button should be enabled', function () {
                        ctrl.newPassword = 'abcd';
                        ctrl.confirmPassword = 'abcd';
                        var submitDisabled = ctrl.isSubmitDisabled();
                        expect(submitDisabled).toBeFalsy();
                    });

                    it('submit button should be disabled when passwords dont match', function () {
                        ctrl.newPassword = 'abcd';
                        ctrl.confirmPassword = 'asbcd';
                        var submitDisabled = ctrl.isSubmitDisabled();
                        expect(submitDisabled).toBeTruthy();
                    });
                });

                describe('generatePassword', function () {
                    it('sets errors if generatePassword fails', function () {
                        var deferred = $q.defer();
                        spyOn(managePasswordService, 'generatePassword').and.returnValue(deferred.promise);
                        deferred.reject({ messages: ['you suck'] });

                        ctrl.generatePassword(identityId, link, quickLink);
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(1);
                    });

                    it('does not set errors if generatePassword fails', function () {

                        var deferred = $q.defer();
                        spyOn(managePasswordService, 'generatePassword').and.returnValue(deferred.promise);
                        deferred.resolve(new PasswordChangeResultItem({
                            passwordChanges: [{
                                linkId: '123'
                            }]
                        }));

                        ctrl.generatePassword(identityId, link, quickLink);
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(0);
                    });
                });

                describe('submit', function () {
                    it('sets errors if submit fails', function () {
                        var deferred = $q.defer();
                        spyOn(managePasswordService, 'changePassword').and.returnValue(deferred.promise);
                        deferred.reject({ messages: ['you suck'] });

                        ctrl.submit(identityId, link, quickLink);
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(1);
                    });

                    it('does not set errors if submit fails', function () {

                        var deferred = $q.defer();
                        spyOn(managePasswordService, 'changePassword').and.returnValue(deferred.promise);
                        deferred.resolve(new PasswordChangeResultItem({
                            passwordChanges: [{
                                linkId: '123'
                            }]
                        }));

                        ctrl.submit(identityId, link, quickLink);
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NoYW5nZVBhc3N3b3JkRGlhbG9nVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsbUJBQW1CLFVBQVUsU0FBUzs7O0lBRy9IOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsZUFBZTtRQUM1QixTQUFTLFlBQVk7Ozs7O1lBRjdCLFNBQVMsNEJBQTRCLFlBQVc7O2dCQUU1QyxJQUFNLFlBQVk7Z0JBQ2xCLElBQUksYUFBVTtvQkFBRSxjQUFXO29CQUFFLGVBQVk7b0JBQUUsY0FBVztvQkFBRSx3QkFBcUI7b0JBQUUsT0FBSTtvQkFBRSxLQUFFO29CQUNuRixvQkFBaUI7b0JBQUUsd0JBQXFCO29CQUFFLE9BQUk7b0JBQUUsYUFBVTtvQkFBRSxzQkFBbUI7b0JBQUUsMkJBQXdCO29CQUN6Ryw0QkFBeUI7OztnQkFHN0IsV0FBVyxPQUFPLFlBQVk7Ozs7OztnQkFNOUIsV0FBVyxPQUFPLFVBQVMseUJBQXlCLDZCQUE2QixlQUFlLGVBQ3JFLGNBQWMsZ0JBQWdCLE1BQU0seUJBQ3BDLGNBQWMsY0FBYyx1QkFBdUIsNEJBQTRCOzs7b0JBR3RHLDRCQUE0QjtvQkFDNUIsd0JBQXdCO29CQUN4QixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLEtBQUs7b0JBQ0wsb0JBQW9CO3dCQUNoQixPQUFPLFFBQVE7d0JBQ2YsU0FBUyxRQUFRO3dCQUNqQixVQUFVLFFBQVE7O29CQUV0QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsMkJBQTJCO29CQUMzQixPQUFPLElBQUksYUFBYSxhQUFhO29CQUNyQyxhQUFhLEtBQUs7OztnQkFHdEIsV0FBWSxZQUFXOztvQkFFbkIsT0FBTyxZQUFZLDRCQUE0Qjt3QkFDM0MsdUJBQXVCO3dCQUN2QiwyQkFBMkI7d0JBQzNCLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixZQUFZO3dCQUNaLE1BQU07d0JBQ04scUJBQXFCOzs7O2dCQUk3QixTQUFTLGdEQUFnRCxZQUFXO29CQUNoRSxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxJQUFJLGlCQUFpQixLQUFLO3dCQUMxQixPQUFPLGdCQUFnQjs7O29CQUczQixHQUFHLG1DQUFtQyxZQUFXO3dCQUM3QyxLQUFLLGNBQWM7d0JBQ25CLEtBQUssa0JBQWtCO3dCQUN2QixJQUFJLGlCQUFpQixLQUFLO3dCQUMxQixPQUFPLGdCQUFnQjs7O29CQUczQixHQUFHLDhEQUE4RCxZQUFXO3dCQUN4RSxLQUFLLGNBQWM7d0JBQ25CLEtBQUssa0JBQWtCO3dCQUN2QixJQUFJLGlCQUFpQixLQUFLO3dCQUMxQixPQUFPLGdCQUFnQjs7OztnQkFJL0IsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsSUFBSSxXQUFXLEdBQUc7d0JBQ2xCLE1BQU0sdUJBQXVCLG9CQUFvQixJQUFJLFlBQVksU0FBUzt3QkFDMUUsU0FBUyxPQUFPLEVBQUMsVUFBVSxDQUFDOzt3QkFFNUIsS0FBSyxpQkFBaUIsWUFBWSxNQUFNO3dCQUN4QyxXQUFXO3dCQUNYLE9BQU8sS0FBSyxZQUFZLFFBQVEsUUFBUTs7O29CQUc1QyxHQUFHLGlEQUFpRCxZQUFXOzt3QkFFM0QsSUFBSSxXQUFXLEdBQUc7d0JBQ2xCLE1BQU0sdUJBQXVCLG9CQUFvQixJQUFJLFlBQVksU0FBUzt3QkFDMUUsU0FBUyxRQUFRLElBQUkseUJBQXlCOzRCQUMxQyxpQkFBaUIsQ0FBQztnQ0FDZCxRQUFROzs7O3dCQUloQixLQUFLLGlCQUFpQixZQUFZLE1BQU07d0JBQ3hDLFdBQVc7d0JBQ1gsT0FBTyxLQUFLLFlBQVksUUFBUSxRQUFROzs7O2dCQUloRCxTQUFTLFVBQVUsWUFBVztvQkFDMUIsR0FBRywrQkFBK0IsWUFBVzt3QkFDekMsSUFBSSxXQUFXLEdBQUc7d0JBQ2xCLE1BQU0sdUJBQXVCLGtCQUFrQixJQUFJLFlBQVksU0FBUzt3QkFDeEUsU0FBUyxPQUFPLEVBQUMsVUFBVSxDQUFDOzt3QkFFNUIsS0FBSyxPQUFPLFlBQVksTUFBTTt3QkFDOUIsV0FBVzt3QkFDWCxPQUFPLEtBQUssWUFBWSxRQUFRLFFBQVE7OztvQkFHNUMsR0FBRyx1Q0FBdUMsWUFBVzs7d0JBRWpELElBQUksV0FBVyxHQUFHO3dCQUNsQixNQUFNLHVCQUF1QixrQkFBa0IsSUFBSSxZQUFZLFNBQVM7d0JBQ3hFLFNBQVMsUUFBUSxJQUFJLHlCQUF5Qjs0QkFDMUMsaUJBQWlCLENBQUM7Z0NBQ2QsUUFBUTs7Ozt3QkFJaEIsS0FBSyxPQUFPLFlBQVksTUFBTTt3QkFDOUIsV0FBVzt3QkFDWCxPQUFPLEtBQUssWUFBWSxRQUFRLFFBQVE7Ozs7OztHQXNCakQiLCJmaWxlIjoiaWRlbnRpdHkvQ2hhbmdlUGFzc3dvcmREaWFsb2dUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuaW1wb3J0ICcuL0xpbmtUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBTeW5jUGFzc3dvcmREaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnQ2hhbmdlUGFzc3dvcmREaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBxdWlja0xpbmsgPSAnTWFuYWdlJTIwUGFzc3dvcmRzJztcbiAgICBsZXQgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsICRodHRwQmFja2VuZCwgdGVzdFNlcnZpY2UsIG1hbmFnZVBhc3N3b3JkU2VydmljZSwgY3RybCwgJHEsXG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLCBwcm9taXNlVHJhY2tlclNlcnZpY2UsIGxpbmssIGlkZW50aXR5SWQsIElkZW50aXR5UmVxdWVzdEl0ZW0sIFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSxcbiAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZTtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxuICAgICAqL1xuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEyICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX21hbmFnZVBhc3N3b3JkU2VydmljZV8sIF9tYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8sIF8kaHR0cEJhY2tlbmRfLCBfJHFfLCBfcHJvbWlzZVRyYWNrZXJTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzd29yZExpbmssIGxpbmtUZXN0RGF0YSwgX0lkZW50aXR5UmVxdWVzdEl0ZW1fLCBfUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtXykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlID0gX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICBkaXNtaXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICAgICAgc2V0VGl0bGU6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbSA9IF9JZGVudGl0eVJlcXVlc3RJdGVtXztcbiAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlID0gX3Byb21pc2VUcmFja2VyU2VydmljZV87XG4gICAgICAgIFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSA9IF9QYXNzd29yZENoYW5nZVJlc3VsdEl0ZW1fO1xuICAgICAgICBsaW5rID0gbmV3IFBhc3N3b3JkTGluayhsaW5rVGVzdERhdGEuTElOSzEpO1xuICAgICAgICBpZGVudGl0eUlkID0gbGluay5nZXRJZGVudGl0eUlkKCk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQ2hhbmdlUGFzc3dvcmREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlOiBtYW5hZ2VQYXNzd29yZFNlcnZpY2UsXG4gICAgICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlOiBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlLFxuICAgICAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlOiBwcm9taXNlVHJhY2tlclNlcnZpY2UsXG4gICAgICAgICAgICBpZGVudGl0eUlkOiBpZGVudGl0eUlkLFxuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW06IElkZW50aXR5UmVxdWVzdEl0ZW1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hhbmdlIHBhc3N3b3JkIGRpYWxvZyBjdHJsIGlzU3VibWl0RGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3N1Ym1pdCBidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc3VibWl0RGlzYWJsZWQgPSBjdHJsLmlzU3VibWl0RGlzYWJsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdWJtaXREaXNhYmxlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc3VibWl0IGJ1dHRvbiBzaG91bGQgYmUgZW5hYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5uZXdQYXNzd29yZCA9ICdhYmNkJztcbiAgICAgICAgICAgIGN0cmwuY29uZmlybVBhc3N3b3JkID0gJ2FiY2QnO1xuICAgICAgICAgICAgbGV0IHN1Ym1pdERpc2FibGVkID0gY3RybC5pc1N1Ym1pdERpc2FibGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3VibWl0RGlzYWJsZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc3VibWl0IGJ1dHRvbiBzaG91bGQgYmUgZGlzYWJsZWQgd2hlbiBwYXNzd29yZHMgZG9udCBtYXRjaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5uZXdQYXNzd29yZCA9ICdhYmNkJztcbiAgICAgICAgICAgIGN0cmwuY29uZmlybVBhc3N3b3JkID0gJ2FzYmNkJztcbiAgICAgICAgICAgIGxldCBzdWJtaXREaXNhYmxlZCA9IGN0cmwuaXNTdWJtaXREaXNhYmxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHN1Ym1pdERpc2FibGVkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dlbmVyYXRlUGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3NldHMgZXJyb3JzIGlmIGdlbmVyYXRlUGFzc3dvcmQgZmFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdnZW5lcmF0ZVBhc3N3b3JkJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHttZXNzYWdlczogWyd5b3Ugc3VjayddfSk7XG5cbiAgICAgICAgICAgIGN0cmwuZ2VuZXJhdGVQYXNzd29yZChpZGVudGl0eUlkLCBsaW5rLCBxdWlja0xpbmspO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEVycm9ycygpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IHNldCBlcnJvcnMgaWYgZ2VuZXJhdGVQYXNzd29yZCBmYWlscycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnZ2VuZXJhdGVQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICBsaW5rSWQ6ICcxMjMnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgY3RybC5nZW5lcmF0ZVBhc3N3b3JkKGlkZW50aXR5SWQsIGxpbmssIHF1aWNrTGluayk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RXJyb3JzKCkubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3NldHMgZXJyb3JzIGlmIHN1Ym1pdCBmYWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJ2NoYW5nZVBhc3N3b3JkJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHttZXNzYWdlczogWyd5b3Ugc3VjayddfSk7XG5cbiAgICAgICAgICAgIGN0cmwuc3VibWl0KGlkZW50aXR5SWQsIGxpbmssIHF1aWNrTGluayk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RXJyb3JzKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2V0IGVycm9ycyBpZiBzdWJtaXQgZmFpbHMnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJ2NoYW5nZVBhc3N3b3JkJykuYW5kLnJldHVyblZhbHVlKGRlZmVycmVkLnByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShuZXcgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtKHtcbiAgICAgICAgICAgICAgICBwYXNzd29yZENoYW5nZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtJZDogJzEyMydcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdChpZGVudGl0eUlkLCBsaW5rLCBxdWlja0xpbmspO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEVycm9ycygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
