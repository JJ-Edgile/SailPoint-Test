System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /* jshint maxparams: 12 */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {
            describe('ManagePasswordRowExpansionDirective', function () {
                var quickLink = 'Manage%20Passwords';
                var baseURLManagePasswords = '/ui/rest/quickLinks/' + quickLink + '/';
                var $scope = undefined,
                    $compile = undefined,
                    $provide = undefined,
                    $httpBackend = undefined,
                    managePasswordDataService = undefined,
                    managePasswordService = undefined,
                    $q = undefined,
                    spModal = undefined,
                    PasswordLink = undefined,
                    PasswordChangeError = undefined,
                    promiseTrackerService = undefined,
                    keyup = undefined,
                    PasswordChangeResultItem = undefined,
                    identityService = undefined;

                beforeEach(module(identityModule));

                beforeEach(module(function (_$provide_) {
                    $provide = _$provide_;
                    $provide.constant('SP_CURR_USER_ID', '123');
                }));

                beforeEach(inject(function (_managePasswordDataService_, _$rootScope_, _$compile_, _$httpBackend_, _PasswordLink_, _PasswordChangeError_, _promiseTrackerService_, _managePasswordService_, _$q_, _spModal_, _PasswordChangeResultItem_, _identityService_) {
                    managePasswordDataService = _managePasswordDataService_;
                    managePasswordService = _managePasswordService_;
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    $httpBackend = _$httpBackend_;
                    identityService = _identityService_;
                    $q = _$q_;
                    spModal = _spModal_;
                    PasswordLink = _PasswordLink_;
                    PasswordChangeError = _PasswordChangeError_;
                    promiseTrackerService = _promiseTrackerService_;
                    keyup = angular.element.Event('keyup');
                    PasswordChangeResultItem = _PasswordChangeResultItem_;

                    spyOn(promiseTrackerService, 'track');
                }));

                function createElement() {
                    var definition = '<sp-manage-password-row-expansion sp-link="link"></sp-manage-password-row-expansion>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockLink(status, actionStatus, identityId, linkId, appName, requiresCurrentPassword, constraintViolation) {
                    return new PasswordLink({
                        'status': status,
                        'actionStatus': actionStatus,
                        'identityId': identityId,
                        'id': linkId,
                        'applicationName': appName,
                        'requiresCurrentPassword': requiresCurrentPassword,
                        'passwordChangeErros': {
                            linkId: linkId,
                            messages: ['message1', 'message2'],
                            isConstraintsViolation: constraintViolation
                        }
                    });
                }

                function getErrorMessages(element) {
                    var errorblock = element.find('.text-danger'),
                        errorList = errorblock.find('li');
                    /* Apparently this isn't Array.map.  Whatever it is the value is the second argument to the callback */
                    return errorList.map(function (index, value) {
                        return value.innerText.trim();
                    });
                }

                function expectErrorMessages(element, button, expectedMesssages) {
                    var errorMessages = undefined,
                        i = undefined;
                    button.click();
                    errorMessages = getErrorMessages(element);
                    for (i = 0; i < expectedMesssages.length; i++) {
                        expect(errorMessages[i]).toEqual(expectedMesssages[i]);
                    }
                }

                describe('generate password button', function () {
                    it('should call generate password', function () {
                        managePasswordDataService.setQuickLinkName(quickLink);
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                        var element = createElement(),
                            generateButton = element.find('#generatePassword')[0],
                            generateURL = baseURLManagePasswords + 'identities/identityId1/links/linkId1/generatePassword';
                        $httpBackend.expectPOST(generateURL).respond(200, { object: { passwordChanges: [] } });
                        spyOn(managePasswordDataService, 'toggleLinkExpansion').and.callThrough();
                        expect(promiseTrackerService.track).not.toHaveBeenCalled();
                        generateButton.click();
                        $httpBackend.flush();
                        $scope.$apply();
                        expect(managePasswordDataService.toggleLinkExpansion).toHaveBeenCalled();
                        expect(promiseTrackerService.track).toHaveBeenCalled();
                    });

                    it('should show non-constraint errors', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                        var element = createElement(),
                            generateButton = element.find('#generatePassword')[0],
                            messages = ['some reason'],
                            errorPromise = $q.reject(new PasswordChangeError({
                            linkId: 'linkId1',
                            messages: messages,
                            constraintsViolation: false
                        }));
                        spyOn(managePasswordService, 'generatePassword').and.returnValue(errorPromise);
                        expectErrorMessages(element, generateButton, messages);
                    });

                    it('should show constraint errors', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, true);
                        var element = createElement(),
                            generateButton = element.find('#generatePassword')[0],
                            violationMessages = ['some constraint violation', 'some other constraint violation'],
                            errorPromise = $q.reject(new PasswordChangeError({
                            linkId: 'linkId1',
                            messages: violationMessages,
                            constraintsViolation: false
                        }));
                        spyOn(managePasswordService, 'generatePassword').and.returnValue(errorPromise);
                        expectErrorMessages(element, generateButton, violationMessages);
                    });

                    it('should open work item dialog if there is a work item in the result', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                        var element = createElement(),
                            generateButton = element.find('#generatePassword')[0],
                            passwordChangePromise = $q.when(new PasswordChangeResultItem({
                            workflowWorkItemId: 'workitemid',
                            workflowWorkItemType: 'Form'
                        }));
                        spyOn(managePasswordService, 'generatePassword').and.returnValue(passwordChangePromise);
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });
                        generateButton.click();
                        expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                    });
                });

                describe('submit password button', function () {
                    function populatePasswordFields(element) {
                        var newPassword = element.find('#newPassword'),
                            confirmPassword = element.find('#confirmPassword');
                        angular.element(newPassword).val('12345').trigger('input');
                        angular.element(confirmPassword).val('12345').trigger('input');
                    }

                    it('should call change password', function () {
                        managePasswordDataService.setQuickLinkName(quickLink);
                        $scope.link = createMockLink('', '', 'identityId2', 'linkId2', 'app1', false, false);
                        var element = createElement(),
                            submitButton = element.find('#submitPassword')[0],
                            changeURL = baseURLManagePasswords + 'identities/identityId2/links/linkId2/changePassword';
                        populatePasswordFields(element);
                        $scope.$digest();
                        $httpBackend.expectPOST(changeURL).respond(200, { passwordChanges: [] });
                        spyOn(managePasswordDataService, 'toggleLinkExpansion').and.callThrough();
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                        expect(promiseTrackerService.track).not.toHaveBeenCalled();
                        submitButton.click();
                        expect(promiseTrackerService.track).toHaveBeenCalled();
                        $httpBackend.flush();
                        $scope.$apply();
                        expect(managePasswordDataService.toggleLinkExpansion).toHaveBeenCalled();
                        expect(identityService.promptWorkItemDialog).not.toHaveBeenCalled();
                    });

                    it('should open work item dialog if there is a work item in the result', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                        var element = createElement(),
                            submitButton = element.find('#submitPassword')[0],
                            passwordChangePromise = $q.when({
                            status: 200,
                            data: new PasswordChangeResultItem({
                                workflowWorkItemId: 'workitemid',
                                workflowWorkItemType: 'Form'
                            })
                        });
                        populatePasswordFields(element);
                        spyOn(managePasswordService, 'changePassword').and.returnValue(passwordChangePromise);
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                        submitButton.click();
                        $scope.$apply();
                        expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                    });

                    it('should show non-constraint errors', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                        var element = createElement(),
                            sumbitButton = element.find('#submitPassword')[0],
                            messages = ['some reason'];
                        populatePasswordFields(element);

                        spyOn(managePasswordService, 'changePassword').and.returnValue($q.reject(new PasswordChangeError({
                            linkId: 'linkId1',
                            messages: messages,
                            constraintsViolation: false
                        })));
                        expectErrorMessages(element, sumbitButton, messages);
                    });

                    it('should show constraint errors', function () {
                        $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, true);
                        var element = createElement(),
                            submitButton = element.find('#submitPassword')[0],
                            violationMessages = ['some constraint violation', 'some other constraint violation'];
                        populatePasswordFields(element);
                        spyOn(managePasswordService, 'changePassword').and.returnValue($q.reject(new PasswordChangeError({
                            linkId: 'linkId1',
                            messages: violationMessages,
                            constraintsViolation: false
                        })));
                        expectErrorMessages(element, submitButton, violationMessages);
                    });

                    describe('actionStatus', function () {
                        var element = undefined,
                            submitButton = undefined;

                        beforeEach(function () {
                            $scope.link = createMockLink('', '', 'identityId1', 'linkId1', 'app1', false, false);
                            element = createElement();
                            submitButton = element.find('#submitPassword')[0];
                            populatePasswordFields(element);
                        });

                        it('should update link action status when workflow fails', function () {
                            var submitPromise = $q.when({
                                status: 200,
                                data: new PasswordChangeResultItem({
                                    workflowStatus: 'failed'
                                })
                            });
                            spyOn(managePasswordService, 'changePassword').and.returnValue(submitPromise);
                            submitButton.click();
                            $scope.$apply();
                            expect($scope.link.actionStatus).toEqual('Failed');
                        });

                        it('should update link action status when workflow complete', function () {
                            var submitPromise = $q.when({
                                status: 200,
                                data: new PasswordChangeResultItem({
                                    workflowStatus: 'complete'
                                })
                            });
                            spyOn(managePasswordService, 'changePassword').and.returnValue(submitPromise);
                            submitButton.click();
                            $scope.$apply();
                            expect($scope.link.actionStatus).toEqual('Finished');
                        });

                        it('should update link action status when workflow executing', function () {
                            var submitPromise = $q.when({
                                status: 200,
                                data: new PasswordChangeResultItem({
                                    workflowStatus: 'executing'
                                })
                            });
                            spyOn(managePasswordService, 'changePassword').and.returnValue(submitPromise);
                            submitButton.click();
                            $scope.$apply();
                            expect($scope.link.actionStatus).toEqual('Pending');
                        });
                    });
                });

                describe('show current password field', function () {
                    it('should hide current password field when current password is not required', function () {
                        $scope.link = createMockLink('', '', 'identityId', 'linkId', 'app', false, false);
                        var element = createElement();
                        $scope.$digest();
                        expect(element.find('#currentPassword').length).toEqual(0);
                    });

                    it('should hide current password field when current password is required but not for self-service', function () {
                        $scope.link = createMockLink('', '', 'identityId', 'linkId', 'app', true, false);
                        var element = createElement();
                        $scope.$digest();
                        expect(element.find('#currentPassword').length).toEqual(0);
                    });

                    it('should show current password field when current password is required and for self-service', function () {
                        $scope.link = createMockLink('', '', '123', 'linkId', 'app', true, false);
                        var element = createElement();
                        expect(element.find('#currentPassword').length).toEqual(1);
                    });
                });

                describe('show generate button', function () {
                    it('should show generate button when request is self service', function () {
                        $scope.link = createMockLink('', '', '123', 'linkId', 'app', false);
                        var element = createElement();
                        expect(element.find('#generatePassword').length).toEqual(0);
                    });

                    it('should hide generate button when request is not self service', function () {
                        $scope.link = createMockLink('', '', 'identityId', 'linkId', 'app', true);
                        var element = createElement();
                        expect(element.find('#generatePassword').length).toEqual(1);
                    });
                });

                describe('mismatched password errors', function () {
                    var PASSWORD_ONE = 'password',
                        PASSWORD_TWO = 'dorwssap';
                    var element = undefined,
                        newPassword = undefined,
                        confirmPassword = undefined,
                        row = undefined;

                    beforeEach(function () {
                        $scope.link = createMockLink();
                        element = createElement();
                        newPassword = element.find('#newPassword');
                        confirmPassword = element.find('#confirmPassword');
                        row = element.find('div')[0];
                        angular.element('body').append(element);
                    });

                    afterEach(function () {
                        element.remove();
                    });
                    function assignValue(field, value, event) {
                        if (event) {
                            field.val(value).trigger(event);
                        } else {
                            field.val(value).trigger('input');
                        }
                    }

                    it('should not be shown when only one password is entered', function () {
                        assignValue(newPassword, PASSWORD_ONE);
                        expect(element.find('.text-danger').length).toEqual(0);
                    });

                    it('should be shown when passwords do not match', function () {
                        assignValue(newPassword, PASSWORD_ONE);
                        assignValue(confirmPassword, PASSWORD_TWO, keyup);

                        expect(element.find('.text-danger').length).not.toEqual(0);
                    });

                    it('should not be shown when password fields are corrected', function () {
                        assignValue(newPassword, PASSWORD_ONE);
                        assignValue(confirmPassword, PASSWORD_TWO, keyup);
                        expect(element.find('.text-danger').length).not.toEqual(0);
                        assignValue(confirmPassword, PASSWORD_ONE, keyup);
                        expect(element.find('.text-danger').length).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkUm93RXhwYW5zaW9uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7Ozs7OztJQU12Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTtZQU43QixTQUFTLHVDQUF1QyxZQUFXO2dCQUN2RCxJQUFNLFlBQVk7Z0JBQ2xCLElBQU0seUJBQXNCLHlCQUEwQixZQUFTO2dCQUMvRCxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxXQUFRO29CQUFFLGVBQVk7b0JBQUUsNEJBQXlCO29CQUFFLHdCQUFxQjtvQkFBRSxLQUFFO29CQUFFLFVBQU87b0JBQ3ZHLGVBQVk7b0JBQUUsc0JBQW1CO29CQUFFLHdCQUFxQjtvQkFBRSxRQUFLO29CQUFFLDJCQUF3QjtvQkFBRSxrQkFBZTs7Z0JBRTlHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVk7b0JBQ25DLFdBQVc7b0JBQ1gsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyw2QkFBNkIsY0FBYyxZQUFZLGdCQUMxRSxnQkFBZ0IsdUJBQXVCLHlCQUF5Qix5QkFBeUIsTUFBTSxXQUMvRiw0QkFBNEIsbUJBQW1CO29CQUNuRCw0QkFBNEI7b0JBQzVCLHdCQUF3QjtvQkFDeEIsU0FBUztvQkFDVCxXQUFXO29CQUNYLGVBQWU7b0JBQ2Ysa0JBQWtCO29CQUNsQixLQUFLO29CQUNMLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsUUFBUSxRQUFRLFFBQVEsTUFBTTtvQkFDOUIsMkJBQTJCOztvQkFFM0IsTUFBTSx1QkFBdUI7OztnQkFHakMsU0FBUyxnQkFB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QStDLFlBQVc7d0JBQ3pELFlBQVksYUFBYTt3QkFDekIsWUFBWSxpQkFBaUIsY0FBYzs7d0JBRTNDLE9BQU8sUUFBUSxLQUFLLGdCQUFnQixRQUFRLElBQUksUUFBUTs7O29CQUc1RCxHQUFHLDBEQUEwRCxZQUFXO3dCQUNwRSxZQUFZLGFBQWE7d0JBQ3pCLFlBQVksaUJBQWlCLGNBQWM7d0JBQzNDLE9BQU8sUUFBUSxLQUFLLGdCQUFnQixRQUFRLElBQUksUUFBUTt3QkFDeEQsWUFBWSxpQkFBaUIsY0FBYzt3QkFDM0MsT0FBTyxRQUFRLEtBQUssZ0JBQWdCLFFBQVEsUUFBUTs7Ozs7O0dBYzdEIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZVBhc3N3b3JkUm93RXhwYW5zaW9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5cbi8qIGpzaGludCBtYXhwYXJhbXM6IDEyICovXG5kZXNjcmliZSgnTWFuYWdlUGFzc3dvcmRSb3dFeHBhbnNpb25EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBxdWlja0xpbmsgPSAnTWFuYWdlJTIwUGFzc3dvcmRzJztcbiAgICBjb25zdCBiYXNlVVJMTWFuYWdlUGFzc3dvcmRzID0gYC91aS9yZXN0L3F1aWNrTGlua3MvJHtxdWlja0xpbmt9L2A7XG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsICRwcm92aWRlLCAkaHR0cEJhY2tlbmQsIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UsIG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJHEsIHNwTW9kYWwsXG4gICAgICAgIFBhc3N3b3JkTGluaywgUGFzc3dvcmRDaGFuZ2VFcnJvciwgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCBrZXl1cCwgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtLCBpZGVudGl0eVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oXyRwcm92aWRlXykge1xuICAgICAgICAkcHJvdmlkZSA9IF8kcHJvdmlkZV87XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfSUQnLCAnMTIzJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF8kaHR0cEJhY2tlbmRfLFxuICAgICAgICAgICAgX1Bhc3N3b3JkTGlua18sIF9QYXNzd29yZENoYW5nZUVycm9yXywgX3Byb21pc2VUcmFja2VyU2VydmljZV8sIF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfLCBfJHFfLCBfc3BNb2RhbF8sXG4gICAgICAgICAgICBfUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtXywgX2lkZW50aXR5U2VydmljZV8pIHtcbiAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlID0gX21hbmFnZVBhc3N3b3JkU2VydmljZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgUGFzc3dvcmRMaW5rID0gX1Bhc3N3b3JkTGlua187XG4gICAgICAgIFBhc3N3b3JkQ2hhbmdlRXJyb3IgPSBfUGFzc3dvcmRDaGFuZ2VFcnJvcl87XG4gICAgICAgIHByb21pc2VUcmFja2VyU2VydmljZSA9IF9wcm9taXNlVHJhY2tlclNlcnZpY2VfO1xuICAgICAgICBrZXl1cCA9IGFuZ3VsYXIuZWxlbWVudC5FdmVudCgna2V5dXAnKTtcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtID0gX1Bhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbV87XG5cbiAgICAgICAgc3B5T24ocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAndHJhY2snKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9ICc8c3AtbWFuYWdlLXBhc3N3b3JkLXJvdy1leHBhbnNpb24gc3AtbGluaz1cImxpbmtcIj48L3NwLW1hbmFnZS1wYXNzd29yZC1yb3ctZXhwYW5zaW9uPicsXG4gICAgICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoZGVmaW5pdGlvbikoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVNb2NrTGluayhzdGF0dXMsIGFjdGlvblN0YXR1cywgaWRlbnRpdHlJZCwgbGlua0lkLCBhcHBOYW1lLFxuICAgICAgICAgICAgcmVxdWlyZXNDdXJyZW50UGFzc3dvcmQsIGNvbnN0cmFpbnRWaW9sYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQYXNzd29yZExpbmsoe1xuICAgICAgICAgICAgJ3N0YXR1cyc6IHN0YXR1cyxcbiAgICAgICAgICAgICdhY3Rpb25TdGF0dXMnOiBhY3Rpb25TdGF0dXMsXG4gICAgICAgICAgICAnaWRlbnRpdHlJZCc6IGlkZW50aXR5SWQsXG4gICAgICAgICAgICAnaWQnOiBsaW5rSWQsXG4gICAgICAgICAgICAnYXBwbGljYXRpb25OYW1lJzogYXBwTmFtZSxcbiAgICAgICAgICAgICdyZXF1aXJlc0N1cnJlbnRQYXNzd29yZCc6IHJlcXVpcmVzQ3VycmVudFBhc3N3b3JkLFxuICAgICAgICAgICAgJ3Bhc3N3b3JkQ2hhbmdlRXJyb3MnOiB7XG4gICAgICAgICAgICAgICAgbGlua0lkOiBsaW5rSWQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFsnbWVzc2FnZTEnLCAnbWVzc2FnZTInXSxcbiAgICAgICAgICAgICAgICBpc0NvbnN0cmFpbnRzVmlvbGF0aW9uOiBjb25zdHJhaW50VmlvbGF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZXMoZWxlbWVudCkge1xuICAgICAgICBsZXQgZXJyb3JibG9jayA9IGVsZW1lbnQuZmluZCgnLnRleHQtZGFuZ2VyJyksXG4gICAgICAgICAgICBlcnJvckxpc3QgPSBlcnJvcmJsb2NrLmZpbmQoJ2xpJyk7XG4gICAgICAgIC8qIEFwcGFyZW50bHkgdGhpcyBpc24ndCBBcnJheS5tYXAuICBXaGF0ZXZlciBpdCBpcyB0aGUgdmFsdWUgaXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgcmV0dXJuIGVycm9yTGlzdC5tYXAoZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwZWN0RXJyb3JNZXNzYWdlcyhlbGVtZW50LCBidXR0b24sIGV4cGVjdGVkTWVzc3NhZ2VzICkge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcywgaTtcbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGVycm9yTWVzc2FnZXMgPSBnZXRFcnJvck1lc3NhZ2VzKGVsZW1lbnQpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBleHBlY3RlZE1lc3NzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KGVycm9yTWVzc2FnZXNbaV0pLnRvRXF1YWwoZXhwZWN0ZWRNZXNzc2FnZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dlbmVyYXRlIHBhc3N3b3JkIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2VuZXJhdGUgcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2Uuc2V0UXVpY2tMaW5rTmFtZShxdWlja0xpbmspO1xuICAgICAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygnJywgJycsICdpZGVudGl0eUlkMScsICdsaW5rSWQxJywgJ2FwcDEnLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNnZW5lcmF0ZVBhc3N3b3JkJylbMF0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVVUkwgPSBiYXNlVVJMTWFuYWdlUGFzc3dvcmRzICsgJ2lkZW50aXRpZXMvaWRlbnRpdHlJZDEvbGlua3MvbGlua0lkMS9nZW5lcmF0ZVBhc3N3b3JkJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGdlbmVyYXRlVVJMKS5yZXNwb25kKDIwMCwge29iamVjdDoge3Bhc3N3b3JkQ2hhbmdlczogW119fSk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLCAndG9nZ2xlTGlua0V4cGFuc2lvbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGdlbmVyYXRlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLnRvZ2dsZUxpbmtFeHBhbnNpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UudHJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IG5vbi1jb25zdHJhaW50IGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygnJywgJycsICdpZGVudGl0eUlkMScsICdsaW5rSWQxJywgJ2FwcDEnLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNnZW5lcmF0ZVBhc3N3b3JkJylbMF0sXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBbJ3NvbWUgcmVhc29uJ10sXG4gICAgICAgICAgICAgICAgZXJyb3JQcm9taXNlID0gJHEucmVqZWN0KG5ldyBQYXNzd29yZENoYW5nZUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgbGlua0lkOiAnbGlua0lkMScsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcyxcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IGZhbHNlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnZ2VuZXJhdGVQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShlcnJvclByb21pc2UpO1xuICAgICAgICAgICAgZXhwZWN0RXJyb3JNZXNzYWdlcyhlbGVtZW50LCBnZW5lcmF0ZUJ1dHRvbiwgbWVzc2FnZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNob3cgY29uc3RyYWludCBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoJycsICcnLCAnaWRlbnRpdHlJZDEnLCAnbGlua0lkMScsICdhcHAxJywgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNnZW5lcmF0ZVBhc3N3b3JkJylbMF0sXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uTWVzc2FnZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICdzb21lIGNvbnN0cmFpbnQgdmlvbGF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NvbWUgb3RoZXIgY29uc3RyYWludCB2aW9sYXRpb24nXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBlcnJvclByb21pc2UgPSAkcS5yZWplY3QobmV3IFBhc3N3b3JkQ2hhbmdlRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBsaW5rSWQ6ICdsaW5rSWQxJyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IHZpb2xhdGlvbk1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50c1Zpb2xhdGlvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdnZW5lcmF0ZVBhc3N3b3JkJykuYW5kLnJldHVyblZhbHVlKGVycm9yUHJvbWlzZSk7XG4gICAgICAgICAgICBleHBlY3RFcnJvck1lc3NhZ2VzKGVsZW1lbnQsIGdlbmVyYXRlQnV0dG9uLCB2aW9sYXRpb25NZXNzYWdlcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiB3b3JrIGl0ZW0gZGlhbG9nIGlmIHRoZXJlIGlzIGEgd29yayBpdGVtIGluIHRoZSByZXN1bHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoJycsICcnLCAnaWRlbnRpdHlJZDEnLCAnbGlua0lkMScsICdhcHAxJywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQnV0dG9uID0gZWxlbWVudC5maW5kKCcjZ2VuZXJhdGVQYXNzd29yZCcpWzBdLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlUHJvbWlzZSA9ICRxLndoZW4oXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ0Zvcm0nXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJ2dlbmVyYXRlUGFzc3dvcmQnKS5hbmQucmV0dXJuVmFsdWUocGFzc3dvcmRDaGFuZ2VQcm9taXNlKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7cmVzdWx0OiAkcS53aGVuKCl9KTtcbiAgICAgICAgICAgIGdlbmVyYXRlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlTZXJ2aWNlLnByb21wdFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCBwYXNzd29yZCBidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gcG9wdWxhdGVQYXNzd29yZEZpZWxkcyhlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgbmV3UGFzc3dvcmQgPSBlbGVtZW50LmZpbmQoJyNuZXdQYXNzd29yZCcpLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1QYXNzd29yZCA9IGVsZW1lbnQuZmluZCgnI2NvbmZpcm1QYXNzd29yZCcpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG5ld1Bhc3N3b3JkKS52YWwoJzEyMzQ1JykudHJpZ2dlcignaW5wdXQnKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChjb25maXJtUGFzc3dvcmQpLnZhbCgnMTIzNDUnKS50cmlnZ2VyKCdpbnB1dCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGNoYW5nZSBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS5zZXRRdWlja0xpbmtOYW1lKHF1aWNrTGluayk7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQyJywgJ2xpbmtJZDInLCAnYXBwMScsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNzdWJtaXRQYXNzd29yZCcpWzBdLFxuICAgICAgICAgICAgICAgIGNoYW5nZVVSTCA9IGJhc2VVUkxNYW5hZ2VQYXNzd29yZHMgKyAnaWRlbnRpdGllcy9pZGVudGl0eUlkMi9saW5rcy9saW5rSWQyL2NoYW5nZVBhc3N3b3JkJztcbiAgICAgICAgICAgIHBvcHVsYXRlUGFzc3dvcmRGaWVsZHMoZWxlbWVudCk7XG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoY2hhbmdlVVJMKS5yZXNwb25kKDIwMCwge3Bhc3N3b3JkQ2hhbmdlczogW119KTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UsICd0b2dnbGVMaW5rRXhwYW5zaW9uJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdwcm9tcHRXb3JrSXRlbURpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VUcmFja2VyU2VydmljZS50cmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmREYXRhU2VydmljZS50b2dnbGVMaW5rRXhwYW5zaW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlTZXJ2aWNlLnByb21wdFdvcmtJdGVtRGlhbG9nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gd29yayBpdGVtIGRpYWxvZyBpZiB0aGVyZSBpcyBhIHdvcmsgaXRlbSBpbiB0aGUgcmVzdWx0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQxJywgJ2xpbmtJZDEnLCAnYXBwMScsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNzdWJtaXRQYXNzd29yZCcpWzBdLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlUHJvbWlzZSA9ICRxLndoZW4oe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2l0ZW1pZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBvcHVsYXRlUGFzc3dvcmRGaWVsZHMoZWxlbWVudCk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdjaGFuZ2VQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShwYXNzd29yZENoYW5nZVByb21pc2UpO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAncHJvbXB0V29ya0l0ZW1EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5wcm9tcHRXb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNob3cgbm9uLWNvbnN0cmFpbnQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQxJywgJ2xpbmtJZDEnLCAnYXBwMScsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgICAgICBzdW1iaXRCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNzdWJtaXRQYXNzd29yZCcpWzBdLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0gWydzb21lIHJlYXNvbiddO1xuICAgICAgICAgICAgcG9wdWxhdGVQYXNzd29yZEZpZWxkcyhlbGVtZW50KTtcblxuICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnY2hhbmdlUGFzc3dvcmQnKS5hbmQucmV0dXJuVmFsdWUoJHEucmVqZWN0KG5ldyBQYXNzd29yZENoYW5nZUVycm9yKHtcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICdsaW5rSWQxJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IGZhbHNlXG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgZXhwZWN0RXJyb3JNZXNzYWdlcyhlbGVtZW50LCBzdW1iaXRCdXR0b24sIG1lc3NhZ2VzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IGNvbnN0cmFpbnQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQxJywgJ2xpbmtJZDEnLCAnYXBwMScsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnI3N1Ym1pdFBhc3N3b3JkJylbMF0sXG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uTWVzc2FnZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICdzb21lIGNvbnN0cmFpbnQgdmlvbGF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NvbWUgb3RoZXIgY29uc3RyYWludCB2aW9sYXRpb24nXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHBvcHVsYXRlUGFzc3dvcmRGaWVsZHMoZWxlbWVudCk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdjaGFuZ2VQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3QobmV3IFBhc3N3b3JkQ2hhbmdlRXJyb3Ioe1xuICAgICAgICAgICAgICAgIGxpbmtJZDogJ2xpbmtJZDEnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiB2aW9sYXRpb25NZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50c1Zpb2xhdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICBleHBlY3RFcnJvck1lc3NhZ2VzKGVsZW1lbnQsIHN1Ym1pdEJ1dHRvbiwgdmlvbGF0aW9uTWVzc2FnZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnYWN0aW9uU3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b247XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygnJywgJycsICdpZGVudGl0eUlkMScsICdsaW5rSWQxJywgJ2FwcDEnLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZWxlbWVudC5maW5kKCcjc3VibWl0UGFzc3dvcmQnKVswXTtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVBhc3N3b3JkRmllbGRzKGVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGxpbmsgYWN0aW9uIHN0YXR1cyB3aGVuIHdvcmtmbG93IGZhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Ym1pdFByb21pc2UgPSAkcS53aGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdmYWlsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdjaGFuZ2VQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShzdWJtaXRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5saW5rLmFjdGlvblN0YXR1cykudG9FcXVhbCgnRmFpbGVkJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgbGluayBhY3Rpb24gc3RhdHVzIHdoZW4gd29ya2Zsb3cgY29tcGxldGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3VibWl0UHJvbWlzZSA9ICRxLndoZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2NvbXBsZXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnY2hhbmdlUGFzc3dvcmQnKS5hbmQucmV0dXJuVmFsdWUoc3VibWl0UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUubGluay5hY3Rpb25TdGF0dXMpLnRvRXF1YWwoJ0ZpbmlzaGVkJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgbGluayBhY3Rpb24gc3RhdHVzIHdoZW4gd29ya2Zsb3cgZXhlY3V0aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Ym1pdFByb21pc2UgPSAkcS53aGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdleGVjdXRpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdjaGFuZ2VQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZShzdWJtaXRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5saW5rLmFjdGlvblN0YXR1cykudG9FcXVhbCgnUGVuZGluZycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvdyBjdXJyZW50IHBhc3N3b3JkIGZpZWxkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaGlkZSBjdXJyZW50IHBhc3N3b3JkIGZpZWxkIHdoZW4gY3VycmVudCBwYXNzd29yZCBpcyBub3QgcmVxdWlyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoJycsICcnLCAnaWRlbnRpdHlJZCcsICdsaW5rSWQnLCAnYXBwJywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNjdXJyZW50UGFzc3dvcmQnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGlkZSBjdXJyZW50IHBhc3N3b3JkIGZpZWxkIHdoZW4gY3VycmVudCBwYXNzd29yZCBpcyByZXF1aXJlZCBidXQgbm90IGZvciBzZWxmLXNlcnZpY2UnLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgJ2FwcCcsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNjdXJyZW50UGFzc3dvcmQnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBjdXJyZW50IHBhc3N3b3JkIGZpZWxkIHdoZW4gY3VycmVudCBwYXNzd29yZCBpcyByZXF1aXJlZCBhbmQgZm9yIHNlbGYtc2VydmljZScsXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoJycsICcnLCAnMTIzJywgJ2xpbmtJZCcsICdhcHAnLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNjdXJyZW50UGFzc3dvcmQnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3cgZ2VuZXJhdGUgYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBnZW5lcmF0ZSBidXR0b24gd2hlbiByZXF1ZXN0IGlzIHNlbGYgc2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygnJywgJycsICcxMjMnLCAnbGlua0lkJywgJ2FwcCcsIGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI2dlbmVyYXRlUGFzc3dvcmQnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGlkZSBnZW5lcmF0ZSBidXR0b24gd2hlbiByZXF1ZXN0IGlzIG5vdCBzZWxmIHNlcnZpY2UnLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKCcnLCAnJywgJ2lkZW50aXR5SWQnLCAnbGlua0lkJywgJ2FwcCcsIHRydWUpO1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjZ2VuZXJhdGVQYXNzd29yZCcpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWlzbWF0Y2hlZCBwYXNzd29yZCBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgUEFTU1dPUkRfT05FID0gJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgUEFTU1dPUkRfVFdPID0gJ2Rvcndzc2FwJztcbiAgICAgICAgbGV0IGVsZW1lbnQsIG5ld1Bhc3N3b3JkLCBjb25maXJtUGFzc3dvcmQsIHJvdztcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluaygpO1xuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkID0gZWxlbWVudC5maW5kKCcjbmV3UGFzc3dvcmQnKTtcbiAgICAgICAgICAgIGNvbmZpcm1QYXNzd29yZCA9IGVsZW1lbnQuZmluZCgnI2NvbmZpcm1QYXNzd29yZCcpO1xuICAgICAgICAgICAgcm93ID0gZWxlbWVudC5maW5kKCdkaXYnKVswXTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGFzc2lnblZhbHVlKGZpZWxkLCB2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgICAgIGlmKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZmllbGQudmFsKHZhbHVlKS50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpZWxkLnZhbCh2YWx1ZSkudHJpZ2dlcignaW5wdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGJlIHNob3duIHdoZW4gb25seSBvbmUgcGFzc3dvcmQgaXMgZW50ZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzaWduVmFsdWUobmV3UGFzc3dvcmQsIFBBU1NXT1JEX09ORSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcudGV4dC1kYW5nZXInKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgc2hvd24gd2hlbiBwYXNzd29yZHMgZG8gbm90IG1hdGNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NpZ25WYWx1ZShuZXdQYXNzd29yZCwgUEFTU1dPUkRfT05FKTtcbiAgICAgICAgICAgIGFzc2lnblZhbHVlKGNvbmZpcm1QYXNzd29yZCwgUEFTU1dPUkRfVFdPLCBrZXl1cCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy50ZXh0LWRhbmdlcicpLmxlbmd0aCkubm90LnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGJlIHNob3duIHdoZW4gcGFzc3dvcmQgZmllbGRzIGFyZSBjb3JyZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFzc2lnblZhbHVlKG5ld1Bhc3N3b3JkLCBQQVNTV09SRF9PTkUpO1xuICAgICAgICAgICAgYXNzaWduVmFsdWUoY29uZmlybVBhc3N3b3JkLCBQQVNTV09SRF9UV08sIGtleXVwKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy50ZXh0LWRhbmdlcicpLmxlbmd0aCkubm90LnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBhc3NpZ25WYWx1ZShjb25maXJtUGFzc3dvcmQsIFBBU1NXT1JEX09ORSwga2V5dXApO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLnRleHQtZGFuZ2VyJykubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
