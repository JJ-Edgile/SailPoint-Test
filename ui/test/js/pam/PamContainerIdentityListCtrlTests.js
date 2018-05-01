System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PamContainerIdentityListCtrl', function () {

                var $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    $stateParams = undefined,
                    pamContainerService = undefined,
                    containerId = undefined,
                    testService = undefined,
                    $httpBackend = undefined,
                    DataTableDirectiveConfig = undefined,
                    DataRefreshTrigger = undefined,
                    IDENTITY_ONE = undefined,
                    IDENTITY_TWO = undefined,
                    spModal = undefined,
                    pamActionsService = undefined,
                    $q = undefined,
                    pamUtilService = undefined;

                beforeEach(module(pamModule, testModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$httpBackend_, _$stateParams_, _spModal_, _pamContainerService_, _testService_, _DataTableDirectiveConfig_, _DataRefreshTrigger_, _pamActionsService_, _pamUtilService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    testService = _testService_;
                    spModal = _spModal_;
                    $httpBackend = _$httpBackend_;
                    $stateParams = _$stateParams_;
                    pamContainerService = _pamContainerService_;
                    DataTableDirectiveConfig = _DataTableDirectiveConfig_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    containerId = 0;
                    pamActionsService = _pamActionsService_;
                    pamUtilService = _pamUtilService_;

                    IDENTITY_ONE = {
                        getId: function () {
                            return '1';
                        },
                        getDisplayName: function () {
                            return 'Test';
                        }
                    };

                    IDENTITY_TWO = {
                        getId: function () {
                            return '2';
                        },
                        getDisplayName: function () {
                            return 'Test';
                        }
                    };

                    spyOn(pamContainerService, 'getDirectIdentitiesCount').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });
                    spyOn(pamContainerService, 'getEffectiveIdentitiesCount').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    return $controller('PamContainerIdentityListCtrl', {
                        pamContainerService: pamContainerService,
                        pamUtilService: pamUtilService
                    });
                }

                describe('toggleDirect', function () {
                    it('toggleDirect() switches direct flag', function () {
                        var ctrl = createController();
                        expect(ctrl.filterDirect).toBeTruthy();
                        ctrl.toggleDirect();
                        expect(ctrl.filterDirect).toBeFalsy();
                    });
                });

                describe('isDirect', function () {
                    it('isDirect() returns correct value', function () {
                        var ctrl = createController();
                        expect(ctrl.isDirect()).toBeTruthy();
                        ctrl.toggleDirect();
                        expect(ctrl.isDirect()).toBeFalsy();
                    });
                });

                describe('isBulk', function () {
                    it('returns true if selection count is greater than 0', function () {
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_ONE);
                        expect(ctrl.isBulk()).toBeTruthy();
                    });

                    it('returns false if selection count is 0', function () {
                        var ctrl = createController();
                        expect(ctrl.isBulk()).toBeFalsy();
                    });

                    it('returns false if provisioning is not enabled', function () {
                        spyOn(pamUtilService, 'isProvisioningEnabled').and.returnValue(false);
                        var ctrl = createController();
                        expect(ctrl.isBulk()).toBeFalsy();
                    });
                });

                describe('bulkRemove', function () {
                    it('should launch confirm dialog when bulkRemove() called', function () {
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_ONE);
                        spyOn(spModal, 'open').and.callFake(angular.noop);
                        ctrl.bulkRemove();
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should call PamActionsService.promptIdentityDeprovision', function () {
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_ONE);

                        var promise = { fake: 'promise' };
                        spyOn(pamActionsService, 'promptIdentityDeprovision').and.returnValue($q.when(promise));
                        ctrl.bulkRemove();
                        $scope.$apply();
                        expect(pamActionsService.promptIdentityDeprovision).toHaveBeenCalled();
                    });

                    it('should not call PamActionsService.promptIdentityDeprovision if more than max', function () {
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_ONE);
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_TWO);
                        ctrl.maxIdentities = 1;

                        var promise = { fake: 'promise' };
                        spyOn(pamActionsService, 'promptIdentityDeprovision').and.returnValue($q.when(promise));
                        ctrl.bulkRemove();
                        $scope.$apply();
                        expect(pamActionsService.promptIdentityDeprovision).not.toHaveBeenCalled();
                    });

                    it('should deselect selection model', function () {
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(IDENTITY_ONE);
                        expect(ctrl.getCheckboxMultiSelect().getSelectionCount()).toEqual(1);

                        var promise = { fake: 'promise' };
                        spyOn(pamActionsService, 'promptIdentityDeprovision').and.returnValue($q.when(promise));
                        ctrl.bulkRemove();
                        $scope.$apply();
                        expect(ctrl.getCheckboxMultiSelect().getSelectionCount()).toEqual(0);
                    });
                });

                describe('getIdentities()', function () {
                    it('calls getDirectIdentities when isDirect is true', function () {
                        spyOn(pamContainerService, 'getDirectIdentities').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        var ctrl = createController(),
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        expect(ctrl.isDirect()).toBeTruthy();
                        ctrl.containerId = containerId;
                        ctrl.getIdentities(start, limit, sortOrder);

                        expect(pamContainerService.getDirectIdentities).toHaveBeenCalledWith(containerId, start, limit, sortOrder);
                    });

                    it('calls getEffectiveIdentities when isDirect is false', function () {
                        spyOn(pamContainerService, 'getEffectiveIdentities').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        var ctrl = createController(),
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        expect(ctrl.isDirect()).toBeTruthy();
                        ctrl.containerId = containerId;
                        ctrl.toggleDirect();
                        expect(ctrl.isDirect()).toBeFalsy();
                        ctrl.getIdentities(start, limit, sortOrder);

                        expect(pamContainerService.getEffectiveIdentities).toHaveBeenCalledWith(containerId, start, limit, sortOrder);
                    });
                });

                describe('addIdentity', function () {
                    it('should launch wizard dialog when addIdentity() called', function () {
                        var ctrl = createController();
                        spyOn(spModal, 'open').and.callFake(angular.noop);
                        ctrl.addIdentity();
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJJZGVudGl0eUxpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsZ0NBQWdDLFlBQVc7O2dCQUVoRCxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLGVBQVk7b0JBQUUsc0JBQW1CO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxlQUFZO29CQUMxRywyQkFBd0I7b0JBQUUscUJBQWtCO29CQUFFLGVBQVk7b0JBQUUsZUFBWTtvQkFBRSxVQUFPO29CQUFFLG9CQUFpQjtvQkFBRSxLQUFFO29CQUN4RyxpQkFBYzs7Z0JBRWxCLFdBQVcsT0FBTyxXQUFXOzs7Z0JBRzdCLFdBQVcsT0FBTyxVQUFTLGVBQWUsTUFBTSxjQUFjLGdCQUFnQixnQkFBZ0IsV0FDbkUsdUJBQXVCLGVBQWUsNEJBQTRCLHNCQUNsRSxxQkFBcUIsa0JBQWtCO29CQUM5RCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsS0FBSztvQkFDTCxjQUFjO29CQUNkLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixlQUFlO29CQUNmLHNCQUFzQjtvQkFDdEIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNwQixpQkFBaUI7O29CQUVqQixlQUFlO3dCQUNYLE9BQU8sWUFBVzs0QkFBRSxPQUFPOzt3QkFDM0IsZ0JBQWdCLFlBQVc7NEJBQUUsT0FBTzs7OztvQkFHeEMsZUFBZTt3QkFDWCxPQUFPLFlBQVc7NEJBQUUsT0FBTzs7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O3dCQUN2QixPQUFPLEtBQUssWUFBWTt3QkFDeEIsS0FBSyxjQUFjO3dCQUNuQixLQUFLLGNBQWMsT0FBTyxPQUFPOzt3QkFFakMsT0FBTyxvQkFBb0IscUJBQXFCLHFCQUFxQixhQUFhLE9BQU8sT0FBTzs7O29CQUdwRyxHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxNQUFNLHFCQUFxQiwwQkFBMEIsSUFBSSxTQUFTLFlBQVc7NEJBQ3pFLE9BQU8sWUFBWSxjQUFjLE9BQU8sSUFBSTs7d0JBRWhELElBQUksT0FBTzs0QkFDUCxRQUFROzRCQUNSLFFBQVE7NEJBQ1IsWUFBWSxFQUFDLE1BQU07d0JBQ3ZCLE9BQU8sS0FBSyxZQUFZO3dCQUN4QixLQUFLLGNBQWM7d0JBQ25CLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFlBQVk7d0JBQ3hCLEtBQUssY0FBYyxPQUFPLE9BQU87O3dCQUVqQyxPQUFPLG9CQUFvQix3QkFDdEIscUJBQXFCLGFBQWEsT0FBTyxPQUFPOzs7O2dCQUk3RCxTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyx5REFBeUQsWUFBVzt3QkFDbkUsSUFBSSxPQUFPO3dCQUNYLE1BQU0sU0FBUyxRQUFRLElBQUksU0FBUyxRQUFRO3dCQUM1QyxLQUFLO3dCQUNMLE9BQU87d0JBQ1AsT0FBTyxRQUFRLE1BQU07Ozs7OztHQWdDOUIiLCJmaWxlIjoicGFtL1BhbUNvbnRhaW5lcklkZW50aXR5TGlzdEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1Db250YWluZXJJZGVudGl0eUxpc3RDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlUGFyYW1zLCBwYW1Db250YWluZXJTZXJ2aWNlLCBjb250YWluZXJJZCwgdGVzdFNlcnZpY2UsICRodHRwQmFja2VuZCxcbiAgICAgICAgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnLCBEYXRhUmVmcmVzaFRyaWdnZXIsIElERU5USVRZX09ORSwgSURFTlRJVFlfVFdPLCBzcE1vZGFsLCBwYW1BY3Rpb25zU2VydmljZSwgJHEsXG4gICAgICAgIHBhbVV0aWxTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMiAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcV8sIF8kcm9vdFNjb3BlXywgXyRodHRwQmFja2VuZF8sIF8kc3RhdGVQYXJhbXNfLCBfc3BNb2RhbF8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BhbUNvbnRhaW5lclNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnXywgX0RhdGFSZWZyZXNoVHJpZ2dlcl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BhbUFjdGlvbnNTZXJ2aWNlXywgX3BhbVV0aWxTZXJ2aWNlXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XG4gICAgICAgIHBhbUNvbnRhaW5lclNlcnZpY2UgPSBfcGFtQ29udGFpbmVyU2VydmljZV87XG4gICAgICAgIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyA9IF9EYXRhVGFibGVEaXJlY3RpdmVDb25maWdfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcbiAgICAgICAgY29udGFpbmVySWQgPSAwO1xuICAgICAgICBwYW1BY3Rpb25zU2VydmljZSA9IF9wYW1BY3Rpb25zU2VydmljZV87XG4gICAgICAgIHBhbVV0aWxTZXJ2aWNlID0gX3BhbVV0aWxTZXJ2aWNlXztcblxuICAgICAgICBJREVOVElUWV9PTkUgPSB7XG4gICAgICAgICAgICBnZXRJZDogZnVuY3Rpb24oKSB7IHJldHVybiAnMSc7IH0sXG4gICAgICAgICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24oKSB7IHJldHVybiAnVGVzdCc7IH1cbiAgICAgICAgfTtcblxuICAgICAgICBJREVOVElUWV9UV08gPSB7XG4gICAgICAgICAgICBnZXRJZDogZnVuY3Rpb24oKSB7IHJldHVybiAnMic7IH0sXG4gICAgICAgICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24oKSB7IHJldHVybiAnVGVzdCc7IH1cbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihwYW1Db250YWluZXJTZXJ2aWNlLCAnZ2V0RGlyZWN0SWRlbnRpdGllc0NvdW50JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcHlPbihwYW1Db250YWluZXJTZXJ2aWNlLCAnZ2V0RWZmZWN0aXZlSWRlbnRpdGllc0NvdW50JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1BhbUNvbnRhaW5lcklkZW50aXR5TGlzdEN0cmwnLCB7XG4gICAgICAgICAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZTogcGFtQ29udGFpbmVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwYW1VdGlsU2VydmljZTogcGFtVXRpbFNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCd0b2dnbGVEaXJlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3RvZ2dsZURpcmVjdCgpIHN3aXRjaGVzIGRpcmVjdCBmbGFnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbHRlckRpcmVjdCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgY3RybC50b2dnbGVEaXJlY3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbHRlckRpcmVjdCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRGlyZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpc0RpcmVjdCgpIHJldHVybnMgY29ycmVjdCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcmVjdCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBjdHJsLnRvZ2dsZURpcmVjdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJlY3QoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQnVsaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHNlbGVjdGlvbiBjb3VudCBpcyBncmVhdGVyIHRoYW4gMCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKElERU5USVRZX09ORSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0J1bGsoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzZWxlY3Rpb24gY291bnQgaXMgMCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0J1bGsoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHByb3Zpc2lvbmluZyBpcyBub3QgZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHBhbVV0aWxTZXJ2aWNlLCAnaXNQcm92aXNpb25pbmdFbmFibGVkJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNCdWxrKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdidWxrUmVtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbGF1bmNoIGNvbmZpcm0gZGlhbG9nIHdoZW4gYnVsa1JlbW92ZSgpIGNhbGxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKElERU5USVRZX09ORSk7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgY3RybC5idWxrUmVtb3ZlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBQYW1BY3Rpb25zU2VydmljZS5wcm9tcHRJZGVudGl0eURlcHJvdmlzaW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0Q2hlY2tib3hNdWx0aVNlbGVjdCgpLnNlbGVjdEl0ZW0oSURFTlRJVFlfT05FKTtcblxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSB7IGZha2U6ICdwcm9taXNlJyB9O1xuICAgICAgICAgICAgc3B5T24ocGFtQWN0aW9uc1NlcnZpY2UsICdwcm9tcHRJZGVudGl0eURlcHJvdmlzaW9uJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4ocHJvbWlzZSkpO1xuICAgICAgICAgICAgY3RybC5idWxrUmVtb3ZlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocGFtQWN0aW9uc1NlcnZpY2UucHJvbXB0SWRlbnRpdHlEZXByb3Zpc2lvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIFBhbUFjdGlvbnNTZXJ2aWNlLnByb21wdElkZW50aXR5RGVwcm92aXNpb24gaWYgbW9yZSB0aGFuIG1heCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKElERU5USVRZX09ORSk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKElERU5USVRZX1RXTyk7XG4gICAgICAgICAgICBjdHJsLm1heElkZW50aXRpZXMgPSAxO1xuXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHsgZmFrZTogJ3Byb21pc2UnIH07XG4gICAgICAgICAgICBzcHlPbihwYW1BY3Rpb25zU2VydmljZSwgJ3Byb21wdElkZW50aXR5RGVwcm92aXNpb24nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihwcm9taXNlKSk7XG4gICAgICAgICAgICBjdHJsLmJ1bGtSZW1vdmUoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChwYW1BY3Rpb25zU2VydmljZS5wcm9tcHRJZGVudGl0eURlcHJvdmlzaW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlc2VsZWN0IHNlbGVjdGlvbiBtb2RlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKElERU5USVRZX09ORSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDaGVja2JveE11bHRpU2VsZWN0KCkuZ2V0U2VsZWN0aW9uQ291bnQoKSkudG9FcXVhbCgxKTtcblxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSB7IGZha2U6ICdwcm9taXNlJyB9O1xuICAgICAgICAgICAgc3B5T24ocGFtQWN0aW9uc1NlcnZpY2UsICdwcm9tcHRJZGVudGl0eURlcHJvdmlzaW9uJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4ocHJvbWlzZSkpO1xuICAgICAgICAgICAgY3RybC5idWxrUmVtb3ZlKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDaGVja2JveE11bHRpU2VsZWN0KCkuZ2V0U2VsZWN0aW9uQ291bnQoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SWRlbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdjYWxscyBnZXREaXJlY3RJZGVudGl0aWVzIHdoZW4gaXNEaXJlY3QgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24ocGFtQ29udGFpbmVyU2VydmljZSwgJ2dldERpcmVjdElkZW50aXRpZXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IHtibGFoOiAndGVzdCd9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJlY3QoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgY3RybC5jb250YWluZXJJZCA9IGNvbnRhaW5lcklkO1xuICAgICAgICAgICAgY3RybC5nZXRJZGVudGl0aWVzKHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0RGlyZWN0SWRlbnRpdGllcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29udGFpbmVySWQsIHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIGdldEVmZmVjdGl2ZUlkZW50aXRpZXMgd2hlbiBpc0RpcmVjdCBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24ocGFtQ29udGFpbmVyU2VydmljZSwgJ2dldEVmZmVjdGl2ZUlkZW50aXRpZXMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IHtibGFoOiAndGVzdCd9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJlY3QoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgY3RybC5jb250YWluZXJJZCA9IGNvbnRhaW5lcklkO1xuICAgICAgICAgICAgY3RybC50b2dnbGVEaXJlY3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRGlyZWN0KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgY3RybC5nZXRJZGVudGl0aWVzKHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0RWZmZWN0aXZlSWRlbnRpdGllcylcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29udGFpbmVySWQsIHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkSWRlbnRpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBsYXVuY2ggd2l6YXJkIGRpYWxvZyB3aGVuIGFkZElkZW50aXR5KCkgY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICBjdHJsLmFkZElkZW50aXR5KCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
