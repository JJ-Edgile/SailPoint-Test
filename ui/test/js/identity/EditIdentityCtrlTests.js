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

            describe('EditIdentityCtrl', function () {
                var $httpBackend = undefined,
                    $controller = undefined,
                    $scope = undefined,
                    $rootScope = undefined,
                    $stateParams = undefined,
                    identityProvisioningFormDataService = undefined,
                    spModal = undefined,
                    identityProvisioningFormService = undefined,
                    identityService = undefined,
                    testService = undefined,
                    $q = undefined,
                    formService = undefined,
                    locals = undefined,
                    timeoutService = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 11 */
                beforeEach(inject(function (_$httpBackend_, _$controller_, _identityProvisioningFormDataService_, _$rootScope_, _spModal_, _identityProvisioningFormService_, _testService_, _$q_, _formService_, _$timeout_, _identityService_) {
                    $httpBackend = _$httpBackend_;
                    $controller = _$controller_;
                    identityProvisioningFormDataService = _identityProvisioningFormDataService_;
                    identityProvisioningFormService = _identityProvisioningFormService_;
                    formService = _formService_;
                    $scope = _$rootScope_.$new();
                    $stateParams = {};
                    $q = _$q_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    timeoutService = _$timeout_;
                    identityService = _identityService_;

                    locals = {
                        $scope: $scope,
                        $stateParams: $stateParams,
                        identityProvisioningFormDataService: identityProvisioningFormDataService
                    };
                }));

                function createController(locals) {
                    $stateParams.identityId = 'someId';
                    $stateParams.quickLink = 'accountQuickLinkName';
                    return $controller('EditIdentityCtrl', locals);
                }

                describe('enableSubmit', function () {
                    it('return true with identityProvisioningFormDataService isDirty is true', function () {
                        var formData = { formId: 'form001',
                            quickLinkName: 'Edit Identity',
                            getValues: function () {
                                return {
                                    manager: 'test manager',
                                    location: 'US'
                                };
                            },
                            getRequiredItems: function () {
                                return [];
                            }
                        },
                            formData1 = { formId: 'form001',
                            quickLinkName: 'Edit Identity',
                            getValues: function () {
                                return {
                                    manager: 'test manager2',
                                    location: 'Brazil'
                                };
                            },
                            getRequiredItems: function () {
                                return [];
                            }
                        },
                            ctrl = createController(locals),
                            actualResult = undefined;
                        ctrl.formData = formData;
                        ctrl.identityProvisioningFormDataService.formData = formData1;
                        spyOn(identityProvisioningFormDataService, 'isDirty').and.returnValue('true');
                        actualResult = ctrl.enableSubmit();
                        expect(identityProvisioningFormDataService.isDirty).toHaveBeenCalled();
                        expect(actualResult).toBeTruthy();
                    });
                });

                describe('setPriority', function () {
                    it('return true with identityProvisioningFormDataService enableSubmit is true', function () {
                        var ctrl = createController(locals),
                            priority = 'Normal';
                        ctrl.setPriority(priority);
                        expect(identityProvisioningFormDataService.getPriority()).toEqual(priority);
                        expect(ctrl.priority).toEqual(priority);
                    });
                });

                describe('isSetPriorityEnabled', function () {
                    var configService = undefined,
                        SP_CONFIG_SERVICE = undefined,
                        locals = undefined;

                    beforeEach(inject(function (_configService_, _SP_CONFIG_SERVICE_) {
                        configService = _configService_;
                        SP_CONFIG_SERVICE = _SP_CONFIG_SERVICE_;
                        spyOn(configService, 'getConfigValue');
                        locals = {
                            $scope: $scope,
                            $stateParams: $stateParams,
                            identityProvisioningFormDataService: identityProvisioningFormDataService,
                            configService: configService
                        };
                    }));

                    it('should be disabled if config is false', function () {
                        configService.getConfigValue.and.returnValue(false);
                        var ctrl = createController(locals);

                        expect(configService.getConfigValue).toHaveBeenCalledWith(SP_CONFIG_SERVICE.ACCESS_REQUEST_ALLOW_PRIORITY_EDITING);
                        expect(ctrl.isSetPriorityEnabled()).toBeFalsy();
                    });

                    it('should be enabled if config is true', function () {
                        configService.getConfigValue.and.returnValue(true);
                        var ctrl = createController(locals);

                        expect(configService.getConfigValue).toHaveBeenCalledWith(SP_CONFIG_SERVICE.ACCESS_REQUEST_ALLOW_PRIORITY_EDITING);
                        expect(ctrl.isSetPriorityEnabled()).toBeTruthy();
                    });
                });

                describe('submit', function () {
                    var mockForm = undefined;

                    beforeEach(function () {
                        mockForm = {
                            clearErrors: jasmine.createSpy()
                        };
                        spyOn(identityProvisioningFormDataService, 'getFormConfig').and.returnValue(mockForm);
                    });

                    it('calls identityProvisioningFormService  submitUpdateForm', function () {
                        var ctrl = createController(locals);
                        spyOn(identityProvisioningFormService, 'submitUpdateForm').and.callFake(function () {
                            var deferred = $q.defer();
                            return deferred.promise;
                        });
                        identityProvisioningFormDataService.submit = testService.createPromiseSpy(false, true, {});
                        ctrl.submit();
                        expect(identityProvisioningFormService.submitUpdateForm).toHaveBeenCalled();
                    });

                    it('should call spmodal if submitted an error', function () {
                        var ctrl = undefined,
                            errorMessages = ['error 1', 'error 2'],
                            submitResult = $q.reject(errorMessages),
                            openArg = undefined;
                        spyOn(identityProvisioningFormService, 'getForm').and.returnValue($q.when({}));
                        spyOn(identityProvisioningFormService, 'submitUpdateForm').and.returnValue(submitResult);
                        spyOn(spModal, 'open').and.callFake(angular.noop);

                        ctrl = createController(locals);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        openArg = spModal.open.calls.mostRecent().args[0];
                        expect(openArg.content).toEqual(errorMessages.join('\n'));
                    });

                    it('should call for service.applyErrors if there are validation errors', function () {
                        var ctrl = undefined,
                            validationErrors = [{ 'someField': 'important validation message' }],
                            submitResult = $q.reject({ items: validationErrors });
                        spyOn(identityProvisioningFormService, 'getForm').and.returnValue($q.when({}));
                        spyOn(identityProvisioningFormService, 'submitUpdateForm').and.returnValue(submitResult);
                        spyOn(formService, 'applyErrors').and.callFake(angular.noop);

                        ctrl = createController(locals);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(formService.applyErrors).toHaveBeenCalled();
                    });

                    it('should clear errors on the form before submit', function () {
                        var ctrl = undefined;
                        spyOn(identityProvisioningFormService, 'submitUpdateForm').and.callFake(function () {
                            return $q.when({ getOutcome: angular.noop });
                        });
                        ctrl = createController(locals);
                        ctrl.submit();
                        expect(mockForm.clearErrors).toHaveBeenCalled();
                    });
                });

                describe('navigateToOutcome', function () {
                    var identityService = undefined,
                        navigationService = undefined,
                        QuickLink = undefined,
                        homeOutcome = 'HOME',
                        identityAttributeOutcome = 'VIEW_IDENTITY',
                        locals = undefined;

                    function validateOutcomeNavigation(outcome, expectedState) {
                        var ctrl = createController(locals),
                            actualArgs = undefined;
                        ctrl.navigateToOutcome(outcome);
                        expect(navigationService.go).toHaveBeenCalled();
                        actualArgs = navigationService.go.calls.mostRecent().args;
                        expect(actualArgs[0].state).toEqual(expectedState);
                    }

                    beforeEach(inject(function (_identityService_, _navigationService_, _QuickLink_) {
                        identityService = _identityService_;
                        navigationService = _navigationService_;
                        QuickLink = _QuickLink_;
                        spyOn(navigationService, 'go');
                        locals = {
                            $scope: $scope,
                            $stateParams: $stateParams,
                            identityProvisioningFormDataService: identityProvisioningFormDataService,
                            identityService: identityService,
                            navigationService: navigationService
                        };
                    }));

                    it('should call through to navigation service to nav to identity attribute state', function () {
                        var mockActionMap = {},
                            mockLink = new QuickLink({ id: 'someLink' });
                        mockActionMap[QuickLink.Actions.VIEW_IDENTITY] = mockLink;
                        spyOn(identityService, 'getAvailableActionsMap').and.returnValue(mockActionMap);
                        validateOutcomeNavigation(identityAttributeOutcome, 'identities.identity.attributes');
                    });

                    it('should call through to navigation service to nav to home', function () {
                        validateOutcomeNavigation(homeOutcome, 'home');
                    });
                });

                describe('isDirty', function () {
                    it('should delegate to identityProvisioningFormDataService', function () {
                        var ctrl = createController(locals);
                        spyOn(identityProvisioningFormDataService, 'isDirty').and.returnValue(true);
                        expect(ctrl.isDirty()).toBeTruthy();
                        expect(identityProvisioningFormDataService.isDirty).toHaveBeenCalled();
                    });
                });

                describe('reset', function () {
                    var navigationService = undefined;

                    beforeEach(inject(function (_navigationService_) {
                        navigationService = _navigationService_;
                        locals.navigationService = navigationService;
                    }));

                    it('return not dirty after cancel', function () {
                        var formData = { formId: 'form001',
                            quickLinkName: 'Edit Identity',
                            getValues: function () {
                                return {
                                    manager: 'test manager',
                                    location: 'US'
                                };
                            } },
                            formData1 = { formId: 'form001',
                            quickLinkName: 'Edit Identity',
                            getValues: function () {
                                return {
                                    manager: 'test manager2',
                                    location: 'Brazil'
                                };
                            } },
                            ctrl = undefined,
                            actualResult = undefined;
                        spyOn(navigationService, 'go').and.callFake(angular.noop);
                        ctrl = createController(locals);
                        ctrl.formData = formData;
                        ctrl.identityProvisioningFormDataService.formData = formData1;
                        ctrl.reset();
                        actualResult = ctrl.enableSubmit();
                        expect(actualResult).toBeFalsy();
                    });
                });

                describe('constructor', function () {
                    it('should open error dialog when quicklink is not definded', function () {
                        identityService.getAvailableActionsMap = function () {
                            return {};
                        };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });
                        spyOn(identityService, 'goBack').and.returnValue({});
                        createController(locals);
                        timeoutService.flush();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(identityService.goBack).toHaveBeenCalled();
                        var callArgs = spModal.open.calls.mostRecent().args;
                        expect(callArgs[0].title).toEqual('ui_identity_error_unable_to_manage_id_title');
                        expect(callArgs[0].warningLevel).toEqual('error');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0VkaXRJZGVudGl0eUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7Ozs7SUFJN0c7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxvQkFBb0IsWUFBVztnQkFDcEMsSUFBSSxlQUFZO29CQUFFLGNBQVc7b0JBQUUsU0FBTTtvQkFBRSxhQUFVO29CQUFFLGVBQVk7b0JBQUUsc0NBQW1DO29CQUFFLFVBQU87b0JBQ3pHLGtDQUErQjtvQkFBRSxrQkFBZTtvQkFBRSxjQUFXO29CQUFFLEtBQUU7b0JBQUUsY0FBVztvQkFBRSxTQUFNO29CQUFFLGlCQUFjOztnQkFFMUcsV0FBVyxPQUFPLGdCQUFnQjs7O2dCQUdsQyxXQUFXLE9BQU8sVUFBUyxnQkFBZ0IsZUFBZSx1Q0FBdUMsY0FDdEUsV0FBVyxtQ0FBbUMsZUFBZSxNQUFNLGVBQ25FLFlBQVksbUJBQW1CO29CQUN0RCxlQUFlO29CQUNmLGNBQWM7b0JBQ2Qsc0NBQXNDO29CQUN0QyxrQ0FBa0M7b0JBQ2xDLGNBQWM7b0JBQ2QsU0FBUyxhQUFhO29CQUN0QixlQUFlO29CQUNmLEtBQUs7b0JBQ0wsVUFBVTtvQkFDVixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixrQkFBa0I7O29CQUVsQixTQUFVO3dCQUNOLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCxxQ0FBcUM7Ozs7Z0JBSTdDLFNBQVMsaUJBQWlCLFFBQVE7b0JBQzlCLGFBQWEsYUFBYTtvQkFDMUIsYUFBYSxZQUFZO29CQUN6QixPQUFPLFlBQVksb0JBQW9COzs7Z0JBRzNDLFNB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WUFBVzs0QkFBRSxPQUFPOzt3QkFDN0QsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZLEVBQUMsUUFBUSxHQUFHO3dCQUNuRCxNQUFNLGlCQUFpQixVQUFVLElBQUksWUFBWTt3QkFDakQsaUJBQWlCO3dCQUNqQixlQUFlO3dCQUNmLE9BQU8sUUFBUSxNQUFNO3dCQUNyQixPQUFPLGdCQUFnQixRQUFRO3dCQUMvQixJQUFJLFdBQVcsUUFBUSxLQUFLLE1BQU0sYUFBYTt3QkFDL0MsT0FBTyxTQUFTLEdBQUcsT0FBTyxRQUFRO3dCQUNsQyxPQUFPLFNBQVMsR0FBRyxjQUFjLFFBQVE7Ozs7OztHQTBCbEQiLCJmaWxlIjoiaWRlbnRpdHkvRWRpdElkZW50aXR5Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnRWRpdElkZW50aXR5Q3RybCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRodHRwQmFja2VuZCwgJGNvbnRyb2xsZXIsICRzY29wZSwgJHJvb3RTY29wZSwgJHN0YXRlUGFyYW1zLCBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgc3BNb2RhbCxcclxuICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLCBpZGVudGl0eVNlcnZpY2UsIHRlc3RTZXJ2aWNlLCAkcSwgZm9ybVNlcnZpY2UsIGxvY2FscywgdGltZW91dFNlcnZpY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMSAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRodHRwQmFja2VuZF8sIF8kY29udHJvbGxlcl8sIF9pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZV8sIF8kcm9vdFNjb3BlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zcE1vZGFsXywgX2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfJHFfLCBfZm9ybVNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyR0aW1lb3V0XywgX2lkZW50aXR5U2VydmljZV8pIHtcclxuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UgPSBfaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UgPSBfaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZV87XHJcbiAgICAgICAgZm9ybVNlcnZpY2UgPSBfZm9ybVNlcnZpY2VfO1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zID0ge307XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgdGltZW91dFNlcnZpY2UgPSBfJHRpbWVvdXRfO1xyXG4gICAgICAgIGlkZW50aXR5U2VydmljZSA9IF9pZGVudGl0eVNlcnZpY2VfO1xyXG5cclxuICAgICAgICBsb2NhbHMgPSAge1xyXG4gICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcclxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXHJcbiAgICAgICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlOiBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZVxyXG4gICAgICAgIH07XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpIHtcclxuICAgICAgICAkc3RhdGVQYXJhbXMuaWRlbnRpdHlJZCA9ICdzb21lSWQnO1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcy5xdWlja0xpbmsgPSAnYWNjb3VudFF1aWNrTGlua05hbWUnO1xyXG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignRWRpdElkZW50aXR5Q3RybCcsIGxvY2Fscyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2VuYWJsZVN1Ym1pdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm4gdHJ1ZSB3aXRoIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlIGlzRGlydHkgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSB7Zm9ybUlkOiAnZm9ybTAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ0VkaXQgSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyOiAndGVzdCBtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXF1aXJlZEl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTEgPSB7Zm9ybUlkOiAnZm9ybTAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ0VkaXQgSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyOiAndGVzdCBtYW5hZ2VyMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0JyYXppbCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGdldFJlcXVpcmVkSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2FscyksXHJcbiAgICAgICAgICAgICAgICBhY3R1YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgIGN0cmwuZm9ybURhdGEgPSBmb3JtRGF0YTtcclxuICAgICAgICAgICAgY3RybC5pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5mb3JtRGF0YSA9IGZvcm1EYXRhMTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UsICdpc0RpcnR5JykuYW5kLnJldHVyblZhbHVlKCd0cnVlJyk7XHJcbiAgICAgICAgICAgIGFjdHVhbFJlc3VsdCA9IGN0cmwuZW5hYmxlU3VibWl0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5pc0RpcnR5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZXRQcmlvcml0eScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm4gdHJ1ZSB3aXRoIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlIGVuYWJsZVN1Ym1pdCBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkgPSAnTm9ybWFsJztcclxuICAgICAgICAgICAgY3RybC5zZXRQcmlvcml0eShwcmlvcml0eSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRQcmlvcml0eSgpKS50b0VxdWFsKHByaW9yaXR5KTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwucHJpb3JpdHkpLnRvRXF1YWwocHJpb3JpdHkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzU2V0UHJpb3JpdHlFbmFibGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZ1NlcnZpY2UsIFNQX0NPTkZJR19TRVJWSUNFLCBsb2NhbHM7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9jb25maWdTZXJ2aWNlXywgX1NQX0NPTkZJR19TRVJWSUNFXykge1xyXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xyXG4gICAgICAgICAgICBTUF9DT05GSUdfU0VSVklDRSA9IF9TUF9DT05GSUdfU0VSVklDRV87XHJcbiAgICAgICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb25maWdWYWx1ZScpO1xyXG4gICAgICAgICAgICBsb2NhbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcclxuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtczogJHN0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2U6IGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogY29uZmlnU2VydmljZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBkaXNhYmxlZCBpZiBjb25maWcgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICB2YXIgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmdldENvbmZpZ1ZhbHVlKS5cclxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKFNQX0NPTkZJR19TRVJWSUNFLkFDQ0VTU19SRVFVRVNUX0FMTE9XX1BSSU9SSVRZX0VESVRJTkcpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NldFByaW9yaXR5RW5hYmxlZCgpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBlbmFibGVkIGlmIGNvbmZpZyBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmdldENvbmZpZ1ZhbHVlKS5cclxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKFNQX0NPTkZJR19TRVJWSUNFLkFDQ0VTU19SRVFVRVNUX0FMTE9XX1BSSU9SSVRZX0VESVRJTkcpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NldFByaW9yaXR5RW5hYmxlZCgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBtb2NrRm9ybTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbW9ja0Zvcm0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckVycm9yczogamFzbWluZS5jcmVhdGVTcHkoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgJ2dldEZvcm1Db25maWcnKS5hbmQucmV0dXJuVmFsdWUobW9ja0Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSAgc3VibWl0VXBkYXRlRm9ybScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSwgJ3N1Ym1pdFVwZGF0ZUZvcm0nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5zdWJtaXQgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB0cnVlLCB7fSk7XHJcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLnN1Ym1pdFVwZGF0ZUZvcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNwbW9kYWwgaWYgc3VibWl0dGVkIGFuIGVycm9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlcyA9IFsnZXJyb3IgMScsICdlcnJvciAyJ10sXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRSZXN1bHQgPSAkcS5yZWplY3QoZXJyb3JNZXNzYWdlcyksXHJcbiAgICAgICAgICAgICAgICBvcGVuQXJnO1xyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLCAnZ2V0Rm9ybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHt9KSk7XHJcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdzdWJtaXRVcGRhdGVGb3JtJykuYW5kLnJldHVyblZhbHVlKHN1Ym1pdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpO1xyXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIG9wZW5BcmcgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChvcGVuQXJnLmNvbnRlbnQpLnRvRXF1YWwoZXJyb3JNZXNzYWdlcy5qb2luKCdcXG4nKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBmb3Igc2VydmljZS5hcHBseUVycm9ycyBpZiB0aGVyZSBhcmUgdmFsaWRhdGlvbiBlcnJvcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzID0gW3snc29tZUZpZWxkJzogJ2ltcG9ydGFudCB2YWxpZGF0aW9uIG1lc3NhZ2UnfV0sXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRSZXN1bHQgPSAkcS5yZWplY3Qoe2l0ZW1zOiB2YWxpZGF0aW9uRXJyb3JzfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdnZXRGb3JtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSwgJ3N1Ym1pdFVwZGF0ZUZvcm0nKS5hbmQucmV0dXJuVmFsdWUoc3VibWl0UmVzdWx0KTtcclxuICAgICAgICAgICAgc3B5T24oZm9ybVNlcnZpY2UsICdhcHBseUVycm9ycycpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xyXG5cclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZvcm1TZXJ2aWNlLmFwcGx5RXJyb3JzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgZXJyb3JzIG9uIHRoZSBmb3JtIGJlZm9yZSBzdWJtaXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmw7XHJcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdzdWJtaXRVcGRhdGVGb3JtJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oe2dldE91dGNvbWU6IGFuZ3VsYXIubm9vcH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vY2tGb3JtLmNsZWFyRXJyb3JzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ25hdmlnYXRlVG9PdXRjb21lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGlkZW50aXR5U2VydmljZSwgbmF2aWdhdGlvblNlcnZpY2UsIFF1aWNrTGluayxcclxuICAgICAgICAgICAgaG9tZU91dGNvbWUgPSAnSE9NRScsXHJcbiAgICAgICAgICAgIGlkZW50aXR5QXR0cmlidXRlT3V0Y29tZSA9ICdWSUVXX0lERU5USVRZJyxcclxuICAgICAgICAgICAgbG9jYWxzO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZU91dGNvbWVOYXZpZ2F0aW9uKG91dGNvbWUsIGV4cGVjdGVkU3RhdGUpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2FscyksXHJcbiAgICAgICAgICAgICAgICBhY3R1YWxBcmdzO1xyXG4gICAgICAgICAgICBjdHJsLm5hdmlnYXRlVG9PdXRjb21lKG91dGNvbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgYWN0dWFsQXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsQXJnc1swXS5zdGF0ZSkudG9FcXVhbChleHBlY3RlZFN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9pZGVudGl0eVNlcnZpY2VfLCBfbmF2aWdhdGlvblNlcnZpY2VfLCBfUXVpY2tMaW5rXykge1xyXG4gICAgICAgICAgICBpZGVudGl0eVNlcnZpY2UgPSBfaWRlbnRpdHlTZXJ2aWNlXztcclxuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgICAgICBRdWlja0xpbmsgPSBfUXVpY2tMaW5rXztcclxuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xyXG4gICAgICAgICAgICBsb2NhbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcclxuICAgICAgICAgICAgICAgICRzdGF0ZVBhcmFtczogJHN0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2U6IGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlTZXJ2aWNlOiBpZGVudGl0eVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIG5hdmlnYXRpb24gc2VydmljZSB0byBuYXYgdG8gaWRlbnRpdHkgYXR0cmlidXRlIHN0YXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBtb2NrQWN0aW9uTWFwID0ge30sXHJcbiAgICAgICAgICAgICAgICBtb2NrTGluayA9IG5ldyBRdWlja0xpbmsoe2lkOiAnc29tZUxpbmsnfSk7XHJcbiAgICAgICAgICAgIG1vY2tBY3Rpb25NYXBbUXVpY2tMaW5rLkFjdGlvbnMuVklFV19JREVOVElUWV0gPSBtb2NrTGluaztcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAnZ2V0QXZhaWxhYmxlQWN0aW9uc01hcCcpLmFuZC5yZXR1cm5WYWx1ZShtb2NrQWN0aW9uTWFwKTtcclxuICAgICAgICAgICAgdmFsaWRhdGVPdXRjb21lTmF2aWdhdGlvbihpZGVudGl0eUF0dHJpYnV0ZU91dGNvbWUsICdpZGVudGl0aWVzLmlkZW50aXR5LmF0dHJpYnV0ZXMnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gbmF2aWdhdGlvbiBzZXJ2aWNlIHRvIG5hdiB0byBob21lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlT3V0Y29tZU5hdmlnYXRpb24oaG9tZU91dGNvbWUsICdob21lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNEaXJ0eScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgZGVsZWdhdGUgdG8gaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2Fscyk7XHJcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLCAnaXNEaXJ0eScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5pc0RpcnR5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgncmVzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmF2aWdhdGlvblNlcnZpY2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9uYXZpZ2F0aW9uU2VydmljZV8pIHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgICAgICBsb2NhbHMubmF2aWdhdGlvblNlcnZpY2UgPSBuYXZpZ2F0aW9uU2VydmljZTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm4gbm90IGRpcnR5IGFmdGVyIGNhbmNlbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSB7Zm9ybUlkOiAnZm9ybTAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ0VkaXQgSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyOiAndGVzdCBtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfX0sXHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTEgPSB7Zm9ybUlkOiAnZm9ybTAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ0VkaXQgSWRlbnRpdHknLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyOiAndGVzdCBtYW5hZ2VyMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0JyYXppbCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgICAgIGN0cmwsXHJcbiAgICAgICAgICAgICAgICBhY3R1YWxSZXN1bHQ7XHJcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcclxuICAgICAgICAgICAgY3RybC5mb3JtRGF0YSA9IGZvcm1EYXRhO1xyXG4gICAgICAgICAgICBjdHJsLmlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmZvcm1EYXRhID0gZm9ybURhdGExO1xyXG4gICAgICAgICAgICBjdHJsLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGFjdHVhbFJlc3VsdCA9IGN0cmwuZW5hYmxlU3VibWl0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGVycm9yIGRpYWxvZyB3aGVuIHF1aWNrbGluayBpcyBub3QgZGVmaW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlTZXJ2aWNlLmdldEF2YWlsYWJsZUFjdGlvbnNNYXAgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHt9O307XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtyZXN1bHQ6ICRxLndoZW4oKX0pO1xyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnb0JhY2snKS5hbmQucmV0dXJuVmFsdWUoe30pO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKGxvY2Fscyk7XHJcbiAgICAgICAgICAgIHRpbWVvdXRTZXJ2aWNlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nb0JhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgbGV0IGNhbGxBcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBleHBlY3QoY2FsbEFyZ3NbMF0udGl0bGUpLnRvRXF1YWwoJ3VpX2lkZW50aXR5X2Vycm9yX3VuYWJsZV90b19tYW5hZ2VfaWRfdGl0bGUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLndhcm5pbmdMZXZlbCkudG9FcXVhbCgnZXJyb3InKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
