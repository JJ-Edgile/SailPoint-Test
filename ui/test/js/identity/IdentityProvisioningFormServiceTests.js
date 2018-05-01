System.register(['test/js/TestInitializer', 'identity/IdentityModule', './IdentityTestData'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_IdentityTestData) {}],
        execute: function () {

            /**
             * Tests for the manageAccountService.
             */
            describe('identityProvisioningFormService', function () {
                var quicklink = 'Edit%20Identity';
                var baseURLManageAccounts = '/identityiq/ui/rest/quickLinks/' + quicklink + '/';
                var identityProvisioningFormService = undefined,
                    $httpBackend = undefined,
                    identityTestData = undefined,
                    Identity = undefined,
                    identity1 = undefined,
                    UpdateIdentityResultItem = undefined;

                // Use the identity module.
                beforeEach(module(identityModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_ID', '123');
                }));

                beforeEach(inject(function (_identityProvisioningFormService_, _$httpBackend_, _identityTestData_, _Identity_, _UpdateIdentityResultItem_) {
                    identityProvisioningFormService = _identityProvisioningFormService_;
                    $httpBackend = _$httpBackend_;
                    identityTestData = _identityTestData_;
                    Identity = _Identity_;
                    identity1 = new Identity(identityTestData.IDENTITY1);
                    UpdateIdentityResultItem = _UpdateIdentityResultItem_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getForm', function () {
                    it('should return edit identity form', function () {
                        var promise = undefined,
                            currentUrl = baseURLManageAccounts + 'form?identityId=' + identity1.getId();
                        $httpBackend.expectGET(currentUrl).respond(200, {});
                        promise = identityProvisioningFormService.getForm(quicklink, identity1.getId());
                        $httpBackend.flush();
                    });
                });

                describe('submitting forms', function () {
                    var promiseTrackerService = undefined,
                        $http = undefined,
                        $rootScope = undefined,
                        $q = undefined,
                        formData = undefined;

                    beforeEach(inject(function (_promiseTrackerService_, _$http_, _$rootScope_, _$q_) {
                        promiseTrackerService = _promiseTrackerService_;
                        spyOn(promiseTrackerService, 'track');
                        $http = _$http_;
                        $rootScope = _$rootScope_;
                        $q = _$q_;

                        formData = {
                            formId: 'form001',
                            quickLinkName: 'Edit Identity',
                            getValues: function () {
                                return {
                                    manager: 'test manager',
                                    location: 'US'
                                };
                            },
                            getValuesForSubmission: function () {
                                return {
                                    manager: 'test manager',
                                    location: 'US'
                                };
                            }
                        };
                    }));

                    describe('submitUpdateForm', function () {
                        it('should post to expected endpoint', function () {
                            var comment = 'Some comments',
                                priority = 'Normal',
                                currentUrl = baseURLManageAccounts + 'form?identityId=' + identity1.getId();
                            $httpBackend.expectPOST(currentUrl).respond(200, {});
                            identityProvisioningFormService.submitUpdateForm(quicklink, identity1.getId(), formData, comment, priority);
                            $httpBackend.flush();
                        });

                        it('should add promise to promise tracker', function () {
                            var resultItem = {
                                outcome: 'whatever'
                            },
                                promise = $q.when({ data: resultItem }),
                                result = undefined;
                            spyOn($http, 'post').and.returnValue(promise);
                            identityProvisioningFormService.submitUpdateForm(quicklink, identity1.getId(), formData).then(function (callResult) {
                                return result = callResult;
                            });
                            $rootScope.$apply();
                            expect(promiseTrackerService.track).toHaveBeenCalled();
                            expect(result).toEqual(new UpdateIdentityResultItem(resultItem));
                        });

                        it('should reject with an array of messages on error', function () {
                            var errorMessages = ['update error 1', 'error 2'],
                                promise = $q.reject({ data: errorMessages }),
                                actualResult = undefined;
                            spyOn($http, 'post').and.returnValue(promise);
                            identityProvisioningFormService.submitUpdateForm(quicklink, identity1.getId(), formData)['catch'](function (error) {
                                actualResult = error;
                            });
                            $rootScope.$apply();
                            expect(actualResult).toBe(errorMessages);
                        });
                    });

                    describe('submitCreateForm', function () {
                        it('should post to expected endpoint', function () {
                            var comment = 'Some comments',
                                priority = 'Normal',
                                promise = undefined,
                                currentUrl = baseURLManageAccounts + 'form';
                            $httpBackend.expectPOST(currentUrl).respond(200, {});
                            promise = identityProvisioningFormService.submitCreateForm(quicklink, formData, comment, priority);
                            $httpBackend.flush();
                        });

                        it('should add promise to promise tracker', function () {
                            var promise = $q.when({ data: new UpdateIdentityResultItem({}) });
                            spyOn($http, 'post').and.returnValue(promise);
                            identityProvisioningFormService.submitCreateForm(quicklink, formData);
                            $rootScope.$apply();
                            expect(promiseTrackerService.track).toHaveBeenCalled();
                        });

                        it('should reject with an array of messages on error', function () {
                            var errorMessages = ['create error 1', 'error 2'],
                                promise = $q.reject({ data: errorMessages }),
                                actualResult = undefined;
                            spyOn($http, 'post').and.returnValue(promise);
                            identityProvisioningFormService.submitCreateForm(quicklink, formData)['catch'](function (error) {
                                actualResult = error;
                            });
                            $rootScope.$apply();
                            expect(actualResult).toBe(errorMessages);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBSzdHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtRQUNoQyxTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMsbUNBQW1DLFlBQVc7Z0JBQ25ELElBQU0sWUFBWTtnQkFDbEIsSUFBTSx3QkFBcUIsb0NBQXFDLFlBQVM7Z0JBQ3pFLElBQUksa0NBQStCO29CQUFFLGVBQVk7b0JBQUUsbUJBQWdCO29CQUFFLFdBQVE7b0JBQUUsWUFBUztvQkFBRSwyQkFBd0I7OztnQkFHbEgsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjtvQkFDckMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxtQ0FBbUMsZ0JBQWdCLG9CQUFvQixZQUN2RSw0QkFBNEI7b0JBQ25ELGtDQUFrQztvQkFDbEMsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLFdBQVc7b0JBQ1gsWUFBWSxJQUFJLFNBQVMsaUJBQWlCO29CQUMxQywyQkFBMkI7OztnQkFHL0IsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxXQUFXLFlBQVc7b0JBQzNCLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLElBQUksVUFBTzs0QkFBRSxhQUFnQix3QkFBcUIscUJBQW1CLFVBQVU7d0JBQy9FLGFBQWEsVUFBVSxZQUFZLFFBQVEsS0FBSzt3QkFDaEQsVUFBVSxnQ0FBZ0MsUUFBUSxXQUFXLFVBQVU7d0JBQ3ZFLGFBQWE7Ozs7Z0JBSXJCLFNBQVMsb0JBQW9CLFlBQVc7b0JBQ3BDLElBQUksd0JBQXFCO3dCQUFFLFFBQUs7d0JBQUUsYUFBVTt3QkFBRSxLQUFFO3dCQUFFLFdBQVE7O29CQUUxRCxXQUFXLE9BQU8sVUFBUyx5QkFBeUIsU0FBUyxjQUFjLE1BQU07d0JBQzdFLHdCQUF3Qjt3QkFDeEIsTUFBTSx1QkFBdUI7d0JBQzdCLFFBQVE7d0JBQ1IsYUFBYTt3QkFDYixLQUFLOzt3QkFHTCxXQUFXOzRCQUNQLFFBQVE7NEJBQ1IsZUFBZTs0QkFDZixXQUFXLFlBQVc7Z0NBQ2xCLE9BQU87b0NBQ0gsU0FBUztvQ0FDVCxVQUFVOzs7NEJBR2xCLHdCQUF3QixZQUFXO2dDQUMvQixPQUFPO29DQUNILFNBQVM7b0NBQ1QsVUFBVTs7Ozs7O29CQU0xQixTQUFTLG9CQUFvQixZQUFXO3dCQUNwQyxHQUFHLG9DQUFvQyxZQUFXOzRCQUM5QyxJQUFJLFVBQVU7Z0NBQ1YsV0FBVztnQ0FDWCxhQUFhLHdCQUF3QixxQkFBcUIsVUFBVTs0QkFDeEUsYUFBYSxXQUFXLFlBQVksUUFBUSxLQUFLOzRCQUNqRCxnQ0FDSyxpQkFBaUIsV0FBVyxVQUFVLFNBQVMsVUFBVSxTQUFTOzRCQUN2RSxhQUFhOzs7d0JBR2pCLEdBQUcseUNBQXlDLFlBQVc7NEJBQ25ELElBQUksYUFBYTtnQ0FDVCxTQUFTOztnQ0FDVixVQUFVLEdBQUcsS0FBSyxFQUFDLE1BQU07Z0NBQzVCLFNBQU07NEJBQ1YsTUFBTSxPQUFPLFFBQVEsSUFBSSxZQUFZOzRCQUNyQyxnQ0FBZ0MsaUJBQWlCLFdBQVcsVUFBVSxTQUFTLFVBQzFFLEtBQUssVUFBQyxZQUFVO2dDQWNMLE9BZFUsU0FBUzs7NEJBQ25DLFdBQVc7NEJBQ1gsT0FBTyxzQkFBc0IsT0FBTzs0QkFDcEMsT0FBTyxRQUFRLFFBQVEsSUFBSSx5QkFBeUI7Ozt3QkFHeEQsR0FBRyxvREFBb0QsWUFBVzs0QkFDOUQsSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0I7Z0NBQ25DLFVBQVUsR0FBRyxPQUFPLEVBQUMsTUFBTTtnQ0FDM0IsZUFBWTs0QkFDaEIsTUFBTSxPQUFPLFFBQVEsSUFBSSxZQUFZOzRCQUNyQyxnQ0FDSyxpQkFBaUIsV0FBVyxVQUFVLFNBQVMsVUFBUyxTQUFPLFVBQUEsT0FBUztnQ0FDckUsZUFBZTs7NEJBRXZCLFdBQVc7NEJBQ1gsT0FBTyxjQUFjLEtBQUs7Ozs7b0JBSWxDLFNBQVMsb0JBQW9CLFlBQVc7d0JBQ3BDLEdBQUcsb0NBQW9DLFlBQVc7NEJBQzlDLElBQUksVUFBVTtnQ0FDVixXQUFXO2dDQUNYLFVBQU87Z0NBQ1AsYUFBYSx3QkFBd0I7NEJBQ3pDLGFBQWEsV0FBVyxZQUFZLFFBQVEsS0FBSzs0QkFDakQsVUFBVSxnQ0FDTCxpQkFBaUIsV0FBVyxVQUFVLFNBQVM7NEJBQ3BELGFBQWE7Ozt3QkFHakIsR0FBRyx5Q0FBeUMsWUFBVzs0QkFDbkQsSUFBSSxVQUFVLEdBQUcsS0FBSyxFQUFDLE1BQU0sSUFBSSx5QkFBeUI7NEJBQzFELE1BQU0sT0FBTyxRQUFRLElBQUksWUFBWTs0QkFDckMsZ0NBQWdDLGlCQUFpQixXQUFXOzRCQUM1RCxXQUFXOzRCQUNYLE9BQU8sc0JBQXNCLE9BQU87Ozt3QkFHeEMsR0FBRyxvREFBb0QsWUFBVzs0QkFDOUQsSUFBSSxnQkFBZ0IsQ0FBQyxrQkFBa0I7Z0NBQ25DLFVBQVUsR0FBRyxPQUFPLEVBQUMsTUFBTTtnQ0FDM0IsZUFBWTs0QkFDaEIsTUFBTSxPQUFPLFFBQVEsSUFBSSxZQUFZOzRCQUNyQyxnQ0FBZ0MsaUJBQWlCLFdBQVcsVUFBUyxTQUMxRCxVQUFDLE9BQVU7Z0NBQ2QsZUFBZTs7NEJBRXZCLFdBQVc7NEJBQ1gsT0FBTyxjQUFjLEtBQUs7Ozs7Ozs7R0FtQnZDIiwiZmlsZSI6ImlkZW50aXR5L0lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgJy4vSWRlbnRpdHlUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBtYW5hZ2VBY2NvdW50U2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBxdWlja2xpbmsgPSAnRWRpdCUyMElkZW50aXR5JztcbiAgICBjb25zdCBiYXNlVVJMTWFuYWdlQWNjb3VudHMgPSBgL2lkZW50aXR5aXEvdWkvcmVzdC9xdWlja0xpbmtzLyR7cXVpY2tsaW5rfS9gO1xuICAgIGxldCBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLCAkaHR0cEJhY2tlbmQsIGlkZW50aXR5VGVzdERhdGEsIElkZW50aXR5LCBpZGVudGl0eTEsIFVwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbTtcblxuICAgIC8vIFVzZSB0aGUgaWRlbnRpdHkgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfSUQnLCAnMTIzJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXywgX2lkZW50aXR5VGVzdERhdGFfLCBfSWRlbnRpdHlfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9VcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW1fKSB7XG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2UgPSBfaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBpZGVudGl0eVRlc3REYXRhID0gX2lkZW50aXR5VGVzdERhdGFfO1xuICAgICAgICBJZGVudGl0eSA9IF9JZGVudGl0eV87XG4gICAgICAgIGlkZW50aXR5MSA9IG5ldyBJZGVudGl0eShpZGVudGl0eVRlc3REYXRhLklERU5USVRZMSk7XG4gICAgICAgIFVwZGF0ZUlkZW50aXR5UmVzdWx0SXRlbSA9IF9VcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW1fO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRGb3JtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGVkaXQgaWRlbnRpdHkgZm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHByb21pc2UsIGN1cnJlbnRVcmwgPSBgJHtiYXNlVVJMTWFuYWdlQWNjb3VudHN9Zm9ybT9pZGVudGl0eUlkPSR7aWRlbnRpdHkxLmdldElkKCl9YDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHt9KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLmdldEZvcm0ocXVpY2tsaW5rLCBpZGVudGl0eTEuZ2V0SWQoKSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0dGluZyBmb3JtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAkaHR0cCwgJHJvb3RTY29wZSwgJHEsIGZvcm1EYXRhO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wcm9taXNlVHJhY2tlclNlcnZpY2VfLCBfJGh0dHBfLCBfJHJvb3RTY29wZV8sIF8kcV8pIHtcbiAgICAgICAgICAgIHByb21pc2VUcmFja2VyU2VydmljZSA9IF9wcm9taXNlVHJhY2tlclNlcnZpY2VfO1xuICAgICAgICAgICAgc3B5T24ocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAndHJhY2snKTtcbiAgICAgICAgICAgICRodHRwID0gXyRodHRwXztcbiAgICAgICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICAgICAkcSA9IF8kcV87XG5cblxuICAgICAgICAgICAgZm9ybURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZm9ybUlkOiAnZm9ybTAwMScsXG4gICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ0VkaXQgSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2VyOiAndGVzdCBtYW5hZ2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZXNGb3JTdWJtaXNzaW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZXI6ICd0ZXN0IG1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdVUydcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3N1Ym1pdFVwZGF0ZUZvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcG9zdCB0byBleHBlY3RlZCBlbmRwb2ludCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBjb21tZW50ID0gJ1NvbWUgY29tbWVudHMnLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9ICdOb3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXJsID0gYmFzZVVSTE1hbmFnZUFjY291bnRzICsgJ2Zvcm0/aWRlbnRpdHlJZD0nICsgaWRlbnRpdHkxLmdldElkKCk7XG4gICAgICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHt9KTtcbiAgICAgICAgICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5zdWJtaXRVcGRhdGVGb3JtKHF1aWNrbGluaywgaWRlbnRpdHkxLmdldElkKCksIGZvcm1EYXRhLCBjb21tZW50LCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcHJvbWlzZSB0byBwcm9taXNlIHRyYWNrZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGNvbWU6ICd3aGF0ZXZlcidcbiAgICAgICAgICAgICAgICAgICAgfSwgcHJvbWlzZSA9ICRxLndoZW4oe2RhdGE6IHJlc3VsdEl0ZW19KSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHNweU9uKCRodHRwLCAncG9zdCcpLmFuZC5yZXR1cm5WYWx1ZShwcm9taXNlKTtcbiAgICAgICAgICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlLnN1Ym1pdFVwZGF0ZUZvcm0ocXVpY2tsaW5rLCBpZGVudGl0eTEuZ2V0SWQoKSwgZm9ybURhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChjYWxsUmVzdWx0KSA9PiByZXN1bHQgPSBjYWxsUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UudHJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKG5ldyBVcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW0ocmVzdWx0SXRlbSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmVqZWN0IHdpdGggYW4gYXJyYXkgb2YgbWVzc2FnZXMgb24gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JNZXNzYWdlcyA9IFsndXBkYXRlIGVycm9yIDEnLCAnZXJyb3IgMiddLFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gJHEucmVqZWN0KHtkYXRhOiBlcnJvck1lc3NhZ2VzfSksXG4gICAgICAgICAgICAgICAgICAgIGFjdHVhbFJlc3VsdDtcbiAgICAgICAgICAgICAgICBzcHlPbigkaHR0cCwgJ3Bvc3QnKS5hbmQucmV0dXJuVmFsdWUocHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuc3VibWl0VXBkYXRlRm9ybShxdWlja2xpbmssIGlkZW50aXR5MS5nZXRJZCgpLCBmb3JtRGF0YSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsUmVzdWx0ID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdCkudG9CZShlcnJvck1lc3NhZ2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnc3VibWl0Q3JlYXRlRm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCBwb3N0IHRvIGV4cGVjdGVkIGVuZHBvaW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbW1lbnQgPSAnU29tZSBjb21tZW50cycsXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gJ05vcm1hbCcsXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBiYXNlVVJMTWFuYWdlQWNjb3VudHMgKyAnZm9ybSc7XG4gICAgICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHt9KTtcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuc3VibWl0Q3JlYXRlRm9ybShxdWlja2xpbmssIGZvcm1EYXRhLCBjb21tZW50LCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcHJvbWlzZSB0byBwcm9taXNlIHRyYWNrZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9ICRxLndoZW4oe2RhdGE6IG5ldyBVcGRhdGVJZGVudGl0eVJlc3VsdEl0ZW0oe30pfSk7XG4gICAgICAgICAgICAgICAgc3B5T24oJGh0dHAsICdwb3N0JykuYW5kLnJldHVyblZhbHVlKHByb21pc2UpO1xuICAgICAgICAgICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2Uuc3VibWl0Q3JlYXRlRm9ybShxdWlja2xpbmssIGZvcm1EYXRhKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwcm9taXNlVHJhY2tlclNlcnZpY2UudHJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJlamVjdCB3aXRoIGFuIGFycmF5IG9mIG1lc3NhZ2VzIG9uIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTWVzc2FnZXMgPSBbJ2NyZWF0ZSBlcnJvciAxJywgJ2Vycm9yIDInXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9ICRxLnJlamVjdCh7ZGF0YTogZXJyb3JNZXNzYWdlc30pLFxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxSZXN1bHQ7XG4gICAgICAgICAgICAgICAgc3B5T24oJGh0dHAsICdwb3N0JykuYW5kLnJldHVyblZhbHVlKHByb21pc2UpO1xuICAgICAgICAgICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybVNlcnZpY2Uuc3VibWl0Q3JlYXRlRm9ybShxdWlja2xpbmssIGZvcm1EYXRhKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWxSZXN1bHQgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYWN0dWFsUmVzdWx0KS50b0JlKGVycm9yTWVzc2FnZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
