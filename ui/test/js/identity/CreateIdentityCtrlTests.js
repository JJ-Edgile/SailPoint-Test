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

            describe('CreateIdentityCtrl', function () {
                var $httpBackend = undefined,
                    $controller = undefined,
                    $scope = undefined,
                    $rootScope = undefined,
                    $stateParams = undefined,
                    identityProvisioningFormDataService = undefined,
                    spModal = undefined,
                    identityProvisioningFormService = undefined,
                    testService = undefined,
                    $q = undefined,
                    formService = undefined,
                    locals = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$httpBackend_, _$controller_, _identityProvisioningFormDataService_, _$rootScope_, _spModal_, _identityProvisioningFormService_, _testService_, _$q_, _formService_) {
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

                    locals = {
                        $scope: $scope,
                        $stateParams: $stateParams,
                        identityProvisioningFormDataService: identityProvisioningFormDataService
                    };
                }));

                function createController(locals) {
                    $stateParams.identityId = 'someId';
                    $stateParams.quickLink = 'accountQuickLinkName';
                    return $controller('CreateIdentityCtrl', locals);
                }

                describe('disableSubmit', function () {
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
                        actualResult = ctrl.disableSubmit();
                        expect(identityProvisioningFormDataService.isDirty).toHaveBeenCalled();
                        expect(actualResult).toBeFalsy();
                    });
                });

                describe('setPriority', function () {
                    it('return true with identityProvisioningFormDataService disableSubmit is true', function () {
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
                    var navigationService = undefined,
                        promiseTrackerService = undefined,
                        mockForm = undefined,
                        ctrl = undefined;

                    beforeEach(inject(function (_navigationService_, _promiseTrackerService_, _Form_) {
                        mockForm = {
                            clearErrors: jasmine.createSpy()
                        };
                        navigationService = _navigationService_;
                        promiseTrackerService = _promiseTrackerService_;

                        spyOn(identityProvisioningFormDataService, 'getFormConfig').and.returnValue(mockForm);
                        spyOn(promiseTrackerService, 'track');
                        spyOn(identityProvisioningFormService, 'getForm').and.returnValue($q.when(new _Form_({})));
                        spyOn(navigationService, 'go').and.callFake(angular.noop);
                        locals.promiseTrackerService = promiseTrackerService;
                        locals.navigationService = navigationService;
                        ctrl = createController(locals);
                        $scope.$apply();
                    }));

                    it('calls identityProvisioningFormService  submitCreateForm', function () {
                        spyOn(identityProvisioningFormService, 'submitCreateForm').and.callFake(function () {
                            return $q.when({ getOutcome: angular.noop });
                        });
                        ctrl.submit();
                        $scope.$apply();
                        expect(promiseTrackerService.track).toHaveBeenCalled();
                        expect(identityProvisioningFormService.submitCreateForm).toHaveBeenCalled();
                    });

                    it('should call spmodal if submitted an error', function () {
                        var errorMessages = ['error 1', 'error 2'],
                            submitResult = $q.reject(errorMessages),
                            openArg = undefined;
                        spyOn(identityProvisioningFormService, 'submitCreateForm').and.returnValue(submitResult);
                        spyOn(spModal, 'open').and.callFake(angular.noop);

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
                        spyOn(identityProvisioningFormService, 'submitCreateForm').and.returnValue(submitResult);
                        spyOn(formService, 'applyErrors').and.callFake(angular.noop);

                        ctrl = createController(locals);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(formService.applyErrors).toHaveBeenCalled();
                    });

                    it('should clear errors on the form before submit', function () {
                        spyOn(identityProvisioningFormService, 'submitCreateForm').and.callFake(function () {
                            return $q.when({ getOutcome: angular.noop });
                        });
                        ctrl.submit();
                        $scope.$apply();
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
                        actualResult = ctrl.disableSubmit();
                        expect(actualResult).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NyZWF0ZUlkZW50aXR5Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUk3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHNCQUFzQixZQUFXO2dCQUN0QyxJQUFJLGVBQVk7b0JBQUUsY0FBVztvQkFBRSxTQUFNO29CQUFFLGFBQVU7b0JBQUUsZUFBWTtvQkFBRSxzQ0FBbUM7b0JBQUUsVUFBTztvQkFDekcsa0NBQStCO29CQUFFLGNBQVc7b0JBQUUsS0FBRTtvQkFBRSxjQUFXO29CQUFFLFNBQU07O2dCQUV6RSxXQUFXLE9BQU8sZ0JBQWdCOzs7Z0JBR2xDLFdBQVcsT0FBTyxVQUFTLGdCQUFnQixlQUFlLHVDQUF1QyxjQUN0RSxXQUFXLG1DQUFtQyxlQUFlLE1BQU0sZUFBZTtvQkFDekcsZUFBZTtvQkFDZixjQUFjO29CQUNkLHNDQUFzQztvQkFDdEMsa0NBQWtDO29CQUNsQyxjQUFjO29CQUNkLFNBQVMsYUFBYTtvQkFDdEIsZUFBZTtvQkFDZixLQUFLO29CQUNMLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixjQUFjOztvQkFFZCxTQUFVO3dCQUNOLFFBQVE7d0JBQ1IsY0FBYzt3QkFDZCxxQ0FBcUM7Ozs7Z0JBSTdDLFNBQVMsaUJBQWlCLFFBQVE7b0JBQzlCLGFBQWEsYUFBYTtvQkFDMUIsYUFBYSxZQUFZO29CQUN6QixPQUFPLFlBQVksc0JBQXNCOzs7Z0JBRzdDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcsd0VBQXdFLFlBQVc7d0JBQ2xGLElBQUksV0FBVyxFQUFDLFFB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SWRlbnRpdHlDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQ3JlYXRlSWRlbnRpdHlDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRodHRwQmFja2VuZCwgJGNvbnRyb2xsZXIsICRzY29wZSwgJHJvb3RTY29wZSwgJHN0YXRlUGFyYW1zLCBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgc3BNb2RhbCxcbiAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSwgdGVzdFNlcnZpY2UsICRxLCBmb3JtU2VydmljZSwgbG9jYWxzO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDkgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGh0dHBCYWNrZW5kXywgXyRjb250cm9sbGVyXywgX2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlXywgXyRyb290U2NvcGVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zcE1vZGFsXywgX2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfJHFfLCBfZm9ybVNlcnZpY2VfKSB7XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlID0gX2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlXztcbiAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSA9IF9pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlXztcbiAgICAgICAgZm9ybVNlcnZpY2UgPSBfZm9ybVNlcnZpY2VfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkc3RhdGVQYXJhbXMgPSB7fTtcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG5cbiAgICAgICAgbG9jYWxzID0gIHtcbiAgICAgICAgICAgICRzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZTogaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2VcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKGxvY2Fscykge1xuICAgICAgICAkc3RhdGVQYXJhbXMuaWRlbnRpdHlJZCA9ICdzb21lSWQnO1xuICAgICAgICAkc3RhdGVQYXJhbXMucXVpY2tMaW5rID0gJ2FjY291bnRRdWlja0xpbmtOYW1lJztcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdDcmVhdGVJZGVudGl0eUN0cmwnLCBsb2NhbHMpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdkaXNhYmxlU3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm4gdHJ1ZSB3aXRoIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlIGlzRGlydHkgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0ge2Zvcm1JZDogJ2Zvcm0wMDEnLFxuICAgICAgICAgICAgICAgICAgICBxdWlja0xpbmtOYW1lOiAnRWRpdCBJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXI6ICd0ZXN0IG1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBnZXRSZXF1aXJlZEl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9ybURhdGExID0ge2Zvcm1JZDogJ2Zvcm0wMDEnLFxuICAgICAgICAgICAgICAgICAgICBxdWlja0xpbmtOYW1lOiAnRWRpdCBJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXI6ICd0ZXN0IG1hbmFnZXIyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0JyYXppbCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGdldFJlcXVpcmVkSXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpLFxuICAgICAgICAgICAgICAgIGFjdHVhbFJlc3VsdDtcbiAgICAgICAgICAgIGN0cmwuZm9ybURhdGEgPSBmb3JtRGF0YTtcbiAgICAgICAgICAgIGN0cmwuaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UuZm9ybURhdGEgPSBmb3JtRGF0YTE7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgJ2lzRGlydHknKS5hbmQucmV0dXJuVmFsdWUoJ3RydWUnKTtcbiAgICAgICAgICAgIGFjdHVhbFJlc3VsdCA9IGN0cmwuZGlzYWJsZVN1Ym1pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmlzRGlydHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxSZXN1bHQpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXRQcmlvcml0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJuIHRydWUgd2l0aCBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSBkaXNhYmxlU3VibWl0IGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gJ05vcm1hbCc7XG4gICAgICAgICAgICBjdHJsLnNldFByaW9yaXR5KHByaW9yaXR5KTtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRQcmlvcml0eSgpKS50b0VxdWFsKHByaW9yaXR5KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnByaW9yaXR5KS50b0VxdWFsKHByaW9yaXR5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNTZXRQcmlvcml0eUVuYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbmZpZ1NlcnZpY2UsIFNQX0NPTkZJR19TRVJWSUNFLCBsb2NhbHM7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2NvbmZpZ1NlcnZpY2VfLCBfU1BfQ09ORklHX1NFUlZJQ0VfKSB7XG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xuICAgICAgICAgICAgU1BfQ09ORklHX1NFUlZJQ0UgPSBfU1BfQ09ORklHX1NFUlZJQ0VfO1xuICAgICAgICAgICAgc3B5T24oY29uZmlnU2VydmljZSwgJ2dldENvbmZpZ1ZhbHVlJyk7XG4gICAgICAgICAgICBsb2NhbHMgPSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2U6IGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGRpc2FibGVkIGlmIGNvbmZpZyBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2Fscyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmdldENvbmZpZ1ZhbHVlKS5cbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKFNQX0NPTkZJR19TRVJWSUNFLkFDQ0VTU19SRVFVRVNUX0FMTE9XX1BSSU9SSVRZX0VESVRJTkcpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTZXRQcmlvcml0eUVuYWJsZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZW5hYmxlZCBpZiBjb25maWcgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uZmlnU2VydmljZS5nZXRDb25maWdWYWx1ZS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcblxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnVmFsdWUpLlxuICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoU1BfQ09ORklHX1NFUlZJQ0UuQUNDRVNTX1JFUVVFU1RfQUxMT1dfUFJJT1JJVFlfRURJVElORyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NldFByaW9yaXR5RW5hYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uU2VydmljZSwgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCBtb2NrRm9ybSwgY3RybDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbmF2aWdhdGlvblNlcnZpY2VfLCBfcHJvbWlzZVRyYWNrZXJTZXJ2aWNlXywgX0Zvcm1fKSB7XG4gICAgICAgICAgICBtb2NrRm9ybSA9IHtcbiAgICAgICAgICAgICAgICBjbGVhckVycm9yczogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIHByb21pc2VUcmFja2VyU2VydmljZSA9IF9wcm9taXNlVHJhY2tlclNlcnZpY2VfO1xuXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgJ2dldEZvcm1Db25maWcnKS5hbmQucmV0dXJuVmFsdWUobW9ja0Zvcm0pO1xuICAgICAgICAgICAgc3B5T24ocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAndHJhY2snKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdnZXRGb3JtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4obmV3IF9Gb3JtXyh7fSkpKTtcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIGxvY2Fscy5wcm9taXNlVHJhY2tlclNlcnZpY2UgPSBwcm9taXNlVHJhY2tlclNlcnZpY2U7XG4gICAgICAgICAgICBsb2NhbHMubmF2aWdhdGlvblNlcnZpY2UgPSBuYXZpZ2F0aW9uU2VydmljZTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2Fscyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnY2FsbHMgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSAgc3VibWl0Q3JlYXRlRm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSwgJ3N1Ym1pdENyZWF0ZUZvcm0nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oe2dldE91dGNvbWU6IGFuZ3VsYXIubm9vcH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2Uuc3VibWl0Q3JlYXRlRm9ybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc3Btb2RhbCBpZiBzdWJtaXR0ZWQgYW4gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlcnJvck1lc3NhZ2VzID0gWydlcnJvciAxJywgJ2Vycm9yIDInXSxcbiAgICAgICAgICAgICAgICBzdWJtaXRSZXN1bHQgPSAkcS5yZWplY3QoZXJyb3JNZXNzYWdlcyksXG4gICAgICAgICAgICAgICAgb3BlbkFyZztcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdzdWJtaXRDcmVhdGVGb3JtJykuYW5kLnJldHVyblZhbHVlKHN1Ym1pdFJlc3VsdCk7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuXG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIG9wZW5BcmcgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XG4gICAgICAgICAgICBleHBlY3Qob3BlbkFyZy5jb250ZW50KS50b0VxdWFsKGVycm9yTWVzc2FnZXMuam9pbignXFxuJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZm9yIHNlcnZpY2UuYXBwbHlFcnJvcnMgaWYgdGhlcmUgYXJlIHZhbGlkYXRpb24gZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzID0gW3snc29tZUZpZWxkJzogJ2ltcG9ydGFudCB2YWxpZGF0aW9uIG1lc3NhZ2UnfV0sXG4gICAgICAgICAgICAgICAgc3VibWl0UmVzdWx0ID0gJHEucmVqZWN0KHtpdGVtczogdmFsaWRhdGlvbkVycm9yc30pO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZSwgJ3N1Ym1pdENyZWF0ZUZvcm0nKS5hbmQucmV0dXJuVmFsdWUoc3VibWl0UmVzdWx0KTtcbiAgICAgICAgICAgIHNweU9uKGZvcm1TZXJ2aWNlLCAnYXBwbHlFcnJvcnMnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcblxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKTtcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGZvcm1TZXJ2aWNlLmFwcGx5RXJyb3JzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2xlYXIgZXJyb3JzIG9uIHRoZSBmb3JtIGJlZm9yZSBzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UsICdzdWJtaXRDcmVhdGVGb3JtJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHtnZXRPdXRjb21lOiBhbmd1bGFyLm5vb3B9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrRm9ybS5jbGVhckVycm9ycykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduYXZpZ2F0ZVRvT3V0Y29tZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgaWRlbnRpdHlTZXJ2aWNlLCBuYXZpZ2F0aW9uU2VydmljZSwgUXVpY2tMaW5rLFxuICAgICAgICAgICAgaG9tZU91dGNvbWUgPSAnSE9NRScsXG4gICAgICAgICAgICBpZGVudGl0eUF0dHJpYnV0ZU91dGNvbWUgPSAnVklFV19JREVOVElUWScsXG4gICAgICAgICAgICBsb2NhbHM7XG5cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVPdXRjb21lTmF2aWdhdGlvbihvdXRjb21lLCBleHBlY3RlZFN0YXRlKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIobG9jYWxzKSxcbiAgICAgICAgICAgICAgICBhY3R1YWxBcmdzO1xuICAgICAgICAgICAgY3RybC5uYXZpZ2F0ZVRvT3V0Y29tZShvdXRjb21lKTtcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgYWN0dWFsQXJncyA9IG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbEFyZ3NbMF0uc3RhdGUpLnRvRXF1YWwoZXhwZWN0ZWRTdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfaWRlbnRpdHlTZXJ2aWNlXywgX25hdmlnYXRpb25TZXJ2aWNlXywgX1F1aWNrTGlua18pIHtcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZSA9IF9pZGVudGl0eVNlcnZpY2VfO1xuICAgICAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSBfbmF2aWdhdGlvblNlcnZpY2VfO1xuICAgICAgICAgICAgUXVpY2tMaW5rID0gX1F1aWNrTGlua187XG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJyk7XG4gICAgICAgICAgICBsb2NhbHMgPSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2U6IGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIGlkZW50aXR5U2VydmljZTogaWRlbnRpdHlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIG5hdmlnYXRpb24gc2VydmljZSB0byBuYXYgdG8gaWRlbnRpdHkgYXR0cmlidXRlIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgbW9ja0FjdGlvbk1hcCA9IHt9LFxuICAgICAgICAgICAgICAgIG1vY2tMaW5rID0gbmV3IFF1aWNrTGluayh7aWQ6ICdzb21lTGluayd9KTtcbiAgICAgICAgICAgIG1vY2tBY3Rpb25NYXBbUXVpY2tMaW5rLkFjdGlvbnMuVklFV19JREVOVElUWV0gPSBtb2NrTGluaztcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ2dldEF2YWlsYWJsZUFjdGlvbnNNYXAnKS5hbmQucmV0dXJuVmFsdWUobW9ja0FjdGlvbk1hcCk7XG4gICAgICAgICAgICB2YWxpZGF0ZU91dGNvbWVOYXZpZ2F0aW9uKGlkZW50aXR5QXR0cmlidXRlT3V0Y29tZSwgJ2lkZW50aXRpZXMuaWRlbnRpdHkuYXR0cmlidXRlcycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBuYXZpZ2F0aW9uIHNlcnZpY2UgdG8gbmF2IHRvIGhvbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlT3V0Y29tZU5hdmlnYXRpb24oaG9tZU91dGNvbWUsICdob21lJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRGlydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWxlZ2F0ZSB0byBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGxvY2Fscyk7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSwgJ2lzRGlydHknKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5pc0RpcnR5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uU2VydmljZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbmF2aWdhdGlvblNlcnZpY2VfKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XG4gICAgICAgICAgICBsb2NhbHMubmF2aWdhdGlvblNlcnZpY2UgPSBuYXZpZ2F0aW9uU2VydmljZTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdyZXR1cm4gbm90IGRpcnR5IGFmdGVyIGNhbmNlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0ge2Zvcm1JZDogJ2Zvcm0wMDEnLFxuICAgICAgICAgICAgICAgICAgICBxdWlja0xpbmtOYW1lOiAnRWRpdCBJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXI6ICd0ZXN0IG1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9fSxcbiAgICAgICAgICAgICAgICBmb3JtRGF0YTEgPSB7Zm9ybUlkOiAnZm9ybTAwMScsXG4gICAgICAgICAgICAgICAgICAgIHF1aWNrTGlua05hbWU6ICdFZGl0IElkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgZ2V0VmFsdWVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlcjogJ3Rlc3QgbWFuYWdlcjInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQnJhemlsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgY3RybCxcbiAgICAgICAgICAgICAgICBhY3R1YWxSZXN1bHQ7XG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2dvJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihsb2NhbHMpO1xuICAgICAgICAgICAgY3RybC5mb3JtRGF0YSA9IGZvcm1EYXRhO1xuICAgICAgICAgICAgY3RybC5pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5mb3JtRGF0YSA9IGZvcm1EYXRhMTtcbiAgICAgICAgICAgIGN0cmwucmVzZXQoKTtcbiAgICAgICAgICAgIGFjdHVhbFJlc3VsdCA9IGN0cmwuZGlzYWJsZVN1Ym1pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
