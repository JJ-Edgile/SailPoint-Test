System.register(['test/js/TestInitializer', 'approval/ApprovalModule', './ApprovalTestDataService'], function (_export) {
    'use strict';

    var approvalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_ApprovalTestDataService) {}],
        execute: function () {

            /**
             * Tests for the ApprovalItemDetailDialogCtrl.
             */
            describe('ApprovalItemDetailDialogCtrl', function () {
                var ROLE_NAME = 'roley',
                    $controller,
                    $rootScope,
                    approvalService,
                    scope,
                    RoleEntitlementResultDTO,
                    targetAccounts;

                beforeEach(module(approvalModule));

                /**
                 * Create mock objects for our tests.
                 */
                beforeEach(inject(function (_$controller_, $q, _$rootScope_, _RoleEntitlementResultDTO_, approvalTestDataService) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    RoleEntitlementResultDTO = _RoleEntitlementResultDTO_;

                    // The scope will have the approval and item by default.  These can be
                    // removed by passing parameters to createController.
                    scope = {
                        approval: {
                            id: '1234'
                        },
                        approvalItem: {
                            id: '5678'
                        },
                        getDisplayValue: function () {
                            return ROLE_NAME;
                        },
                        roleEntitlements: undefined
                    };

                    // By default, use a role name that matches the approval item.
                    targetAccounts = [{ role: ROLE_NAME, application: 'appy', account: 'accountey' }, { role: ROLE_NAME, application: 'appy', account: 'accountey2' }];

                    // Mock an approvalService.
                    approvalService = {
                        getItemTargetAccounts: jasmine.createSpy().and.callFake(function () {
                            var deferred = $q.defer();

                            // Add these special properties that get returned by $resource.
                            targetAccounts.$resolved = true;
                            targetAccounts.$promise = deferred.promise;

                            deferred.resolve(targetAccounts);

                            return targetAccounts;
                        }),

                        getRoleEntitlements: jasmine.createSpy().and.callFake(function () {
                            var deferred = $q.defer();

                            // define roleEntitlements so we don't call the service again.
                            scope.roleEntitlements = [];

                            deferred.resolve(new RoleEntitlementResultDTO(approvalTestDataService.GENERIC_LIST_RESULT));

                            return deferred.promise;
                        })
                    };
                }));

                /**
                 * Create the controller for the details dialog.  If noApproval is true, the
                 * approval is omitted from the scope.  If noItem is true, the approval item
                 * is omitted from the scope.
                 */
                var createController = function (noApproval, noItem) {
                    if (noApproval) {
                        delete scope.approval;
                    }
                    if (noItem) {
                        delete scope.approvalItem;
                    }

                    $controller('ApprovalItemDetailDialogCtrl', {
                        $scope: scope,
                        approvalService: approvalService
                    });
                };

                describe('load target accounts', function () {
                    it('loads target accounts', function () {
                        createController();
                        scope.loadTargetAccounts();
                        expect(approvalService.getItemTargetAccounts).toHaveBeenCalled();
                    });

                    it('does not load description a second time', function () {
                        createController();
                        scope.loadTargetAccounts();
                        expect(approvalService.getItemTargetAccounts).toHaveBeenCalled();

                        scope.loadTargetAccounts();
                        expect(approvalService.getItemTargetAccounts.calls.count()).toEqual(1);
                    });

                    it('pukes without an approval', function () {
                        createController(true, false);
                        expect(function () {
                            scope.loadTargetAccounts();
                        }).toThrow();
                    });

                    it('pukes without an approval item', function () {
                        createController(false, true);
                        expect(function () {
                            scope.loadTargetAccounts();
                        }).toThrow();
                    });
                });

                describe('load role descriptions', function () {
                    it('loads role descriptions', function () {
                        createController();
                        scope.loadRoleEntitlements();
                        expect(approvalService.getRoleEntitlements).toHaveBeenCalled();
                    });

                    it('does not load description a second time', function () {
                        createController();
                        scope.loadRoleEntitlements();
                        expect(approvalService.getRoleEntitlements).toHaveBeenCalled();

                        scope.loadRoleEntitlements();
                        expect(approvalService.getRoleEntitlements.calls.count()).toEqual(1);
                    });

                    it('pukes without an approval', function () {
                        createController(true, false);
                        expect(function () {
                            scope.loadRoleEntitlements();
                        }).toThrow();
                    });

                    it('pukes without an approval item', function () {
                        createController(false, true);
                        expect(function () {
                            scope.loadRoleEntitlements();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsSXRlbURldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLDhCQUE4QixVQUFVLFNBQVM7SUFDcEg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxnQ0FBZ0MsWUFBVztnQkFDaEQsSUFBSSxZQUFZO29CQUNaO29CQUFhO29CQUFZO29CQUFpQjtvQkFBTztvQkFDakQ7O2dCQUVKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGVBQWUsSUFBSSxjQUFjLDRCQUE0Qix5QkFBeUI7b0JBQzdHLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYiwyQkFBMkI7Ozs7b0JBSTNCLFFBQVE7d0JBQ0osVUFBVTs0QkFDTixJQUFJOzt3QkFFUixjQUFjOzRCQUNWLElBQUk7O3dCQUVSLGlCQUFpQixZQUFXOzRCQUN4QixPQUFPOzt3QkFFWCxrQkFBa0I7Ozs7b0JBSXRCLGlCQUFpQixDQUNiLEVBQUUsTUFBTSxXQUFXLGFBQWEsUUFBUSxTQUFTLGVBQ2pELEVBQUUsTUFBTSxXQUFXLGFBQWEsUUFBUSxTQUFTOzs7b0JBSXJELGtCQUFrQjt3QkFDZCx1QkFBdUIsUUFBUSxZQUFZLElBQUksU0FBUyxZQUFXOzRCQUMvRCxJQUFJLFdBQVcsR0FBRzs7OzRCQUdsQixlQUFlLFlBQVk7NEJBQzNCLGVBQWUsV0FBVyxTQUFTOzs0QkFFbkMsU0FBUyxRQUFROzs0QkFFakIsT0FBTzs7O3dCQUdYLHFCQUFxQixRQUFRLFlBQVksSUFBSSxTQUFTLFlBQVc7NEJBQzdELElBQUksV0FBVyxHQUFHOzs7NEJBR2xCLE1BQU0sbUJBQW1COzs0QkFFekIsU0FBUyxRQUFRLElBQUkseUJBQXlCLHdCQUF3Qjs7NEJBRXRFLE9BQU8sU0FBUzs7Ozs7Ozs7OztnQkFVNUIsSUFBSSxtQkFBbUIsVUFBUyxZQUFZLFFBQVE7b0JBQ2hELElBQUksWUFBWTt3QkFDWixPQUFPLE1BQU07O29CQUVqQixJQUFJLFFBQVE7d0JBQ1IsT0FBTyxNQUFNOzs7b0JBR2pCLFlBQVksZ0NBQWdDO3dCQUN4QyxRQUFRO3dCQUNSLGlCQUFpQjs7OztnQkFJekIsU0FBUyx3QkFBd0IsWUFBVztvQkFDeEMsR0FBRyx5QkFBeUIsWUFBVzt3QkFDbkM7d0JBQ0EsTUFBTTt3QkFDTixPQUFPLGdCQUFnQix1QkFBdUI7OztvQkFHbEQsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQ7d0JBQ0EsTUFBTTt3QkFDTixPQUFPLGdCQUFnQix1QkFBdUI7O3dCQUU5QyxNQUFNO3dCQUNOLE9BQU8sZ0JBQWdCLHNCQUFzQixNQUFNLFNBQVMsUUFBUTs7O29CQUd4RSxHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxpQkFBaUIsTUFBTTt3QkFDdkIsT0FBTyxZQUFXOzRCQUFFLE1BQU07MkJBQXlCOzs7b0JBR3ZELEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLGlCQUFpQixPQUFPO3dCQUN4QixPQUFPLFlBQVc7NEJBQUUsTUFBTTsyQkFBeUI7Ozs7Z0JBSTNELFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLEdBQUcsMkJBQTJCLFlBQVc7d0JBQ3JDO3dCQUNBLE1BQU07d0JBQ04sT0FBTyxnQkFBZ0IscUJBQXFCOzs7b0JBR2hELEdBQUcsMkNBQTJDLFlBQVc7d0JBQ3JEO3dCQUNBLE1BQU07d0JBQ04sT0FBTyxnQkFBZ0IscUJBQXFCOzt3QkFFNUMsTUFBTTt3QkFDTixPQUFPLGdCQUFnQixvQkFBb0IsTUFBTSxTQUFTLFFBQVE7OztvQkFHdEUsR0FBRyw2QkFBNkIsWUFBVzt3QkFDdkMsaUJBQWlCLE1BQU07d0JBQ3ZCLE9BQU8sWUFBVzs0QkFDZCxNQUFNOzJCQUNQOzs7b0JBR1AsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsaUJBQWlCLE9BQU87d0JBQ3hCLE9BQU8sWUFBVzs0QkFDZCxNQUFNOzJCQUNQOzs7Ozs7R0FpQloiLCJmaWxlIjoiYXBwcm92YWwvQXBwcm92YWxJdGVtRGV0YWlsRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhcHByb3ZhbE1vZHVsZSBmcm9tICdhcHByb3ZhbC9BcHByb3ZhbE1vZHVsZSc7XHJcbmltcG9ydCAnLi9BcHByb3ZhbFRlc3REYXRhU2VydmljZSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBcHByb3ZhbEl0ZW1EZXRhaWxEaWFsb2dDdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0FwcHJvdmFsSXRlbURldGFpbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBST0xFX05BTUUgPSAncm9sZXknLFxyXG4gICAgICAgICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBhcHByb3ZhbFNlcnZpY2UsIHNjb3BlLCBSb2xlRW50aXRsZW1lbnRSZXN1bHREVE8sXHJcbiAgICAgICAgdGFyZ2V0QWNjb3VudHM7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXBwcm92YWxNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBtb2NrIG9iamVjdHMgZm9yIG91ciB0ZXN0cy5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgJHEsIF8kcm9vdFNjb3BlXywgX1JvbGVFbnRpdGxlbWVudFJlc3VsdERUT18sIGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPID0gX1JvbGVFbnRpdGxlbWVudFJlc3VsdERUT187XHJcblxyXG4gICAgICAgIC8vIFRoZSBzY29wZSB3aWxsIGhhdmUgdGhlIGFwcHJvdmFsIGFuZCBpdGVtIGJ5IGRlZmF1bHQuICBUaGVzZSBjYW4gYmVcclxuICAgICAgICAvLyByZW1vdmVkIGJ5IHBhc3NpbmcgcGFyYW1ldGVycyB0byBjcmVhdGVDb250cm9sbGVyLlxyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICBhcHByb3ZhbDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhcHByb3ZhbEl0ZW06IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnNTY3OCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0RGlzcGxheVZhbHVlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBST0xFX05BTUU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVFbnRpdGxlbWVudHM6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIEJ5IGRlZmF1bHQsIHVzZSBhIHJvbGUgbmFtZSB0aGF0IG1hdGNoZXMgdGhlIGFwcHJvdmFsIGl0ZW0uXHJcbiAgICAgICAgdGFyZ2V0QWNjb3VudHMgPSBbXHJcbiAgICAgICAgICAgIHsgcm9sZTogUk9MRV9OQU1FLCBhcHBsaWNhdGlvbjogJ2FwcHknLCBhY2NvdW50OiAnYWNjb3VudGV5JyB9LFxyXG4gICAgICAgICAgICB7IHJvbGU6IFJPTEVfTkFNRSwgYXBwbGljYXRpb246ICdhcHB5JywgYWNjb3VudDogJ2FjY291bnRleTInIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyBNb2NrIGFuIGFwcHJvdmFsU2VydmljZS5cclxuICAgICAgICBhcHByb3ZhbFNlcnZpY2UgPSB7XHJcbiAgICAgICAgICAgIGdldEl0ZW1UYXJnZXRBY2NvdW50czogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGVzZSBzcGVjaWFsIHByb3BlcnRpZXMgdGhhdCBnZXQgcmV0dXJuZWQgYnkgJHJlc291cmNlLlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0QWNjb3VudHMuJHJlc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRhcmdldEFjY291bnRzLiRwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRhcmdldEFjY291bnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0QWNjb3VudHM7XHJcbiAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgZ2V0Um9sZUVudGl0bGVtZW50czogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSByb2xlRW50aXRsZW1lbnRzIHNvIHdlIGRvbid0IGNhbGwgdGhlIHNlcnZpY2UgYWdhaW4uXHJcbiAgICAgICAgICAgICAgICBzY29wZS5yb2xlRW50aXRsZW1lbnRzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShuZXcgUm9sZUVudGl0bGVtZW50UmVzdWx0RFRPKGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlLkdFTkVSSUNfTElTVF9SRVNVTFQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSBjb250cm9sbGVyIGZvciB0aGUgZGV0YWlscyBkaWFsb2cuICBJZiBub0FwcHJvdmFsIGlzIHRydWUsIHRoZVxyXG4gICAgICogYXBwcm92YWwgaXMgb21pdHRlZCBmcm9tIHRoZSBzY29wZS4gIElmIG5vSXRlbSBpcyB0cnVlLCB0aGUgYXBwcm92YWwgaXRlbVxyXG4gICAgICogaXMgb21pdHRlZCBmcm9tIHRoZSBzY29wZS5cclxuICAgICAqL1xyXG4gICAgdmFyIGNyZWF0ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbihub0FwcHJvdmFsLCBub0l0ZW0pIHtcclxuICAgICAgICBpZiAobm9BcHByb3ZhbCkge1xyXG4gICAgICAgICAgICBkZWxldGUgc2NvcGUuYXBwcm92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub0l0ZW0pIHtcclxuICAgICAgICAgICAgZGVsZXRlIHNjb3BlLmFwcHJvdmFsSXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRjb250cm9sbGVyKCdBcHByb3ZhbEl0ZW1EZXRhaWxEaWFsb2dDdHJsJywge1xyXG4gICAgICAgICAgICAkc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2U6IGFwcHJvdmFsU2VydmljZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZXNjcmliZSgnbG9hZCB0YXJnZXQgYWNjb3VudHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnbG9hZHMgdGFyZ2V0IGFjY291bnRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc2NvcGUubG9hZFRhcmdldEFjY291bnRzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuZ2V0SXRlbVRhcmdldEFjY291bnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBsb2FkIGRlc2NyaXB0aW9uIGEgc2Vjb25kIHRpbWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzY29wZS5sb2FkVGFyZ2V0QWNjb3VudHMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5nZXRJdGVtVGFyZ2V0QWNjb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHNjb3BlLmxvYWRUYXJnZXRBY2NvdW50cygpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLmdldEl0ZW1UYXJnZXRBY2NvdW50cy5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgd2l0aG91dCBhbiBhcHByb3ZhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzY29wZS5sb2FkVGFyZ2V0QWNjb3VudHMoKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgd2l0aG91dCBhbiBhcHByb3ZhbCBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHNjb3BlLmxvYWRUYXJnZXRBY2NvdW50cygpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnbG9hZCByb2xlIGRlc2NyaXB0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdsb2FkcyByb2xlIGRlc2NyaXB0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIHNjb3BlLmxvYWRSb2xlRW50aXRsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuZ2V0Um9sZUVudGl0bGVtZW50cykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgbG9hZCBkZXNjcmlwdGlvbiBhIHNlY29uZCB0aW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc2NvcGUubG9hZFJvbGVFbnRpdGxlbWVudHMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5nZXRSb2xlRW50aXRsZW1lbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICBzY29wZS5sb2FkUm9sZUVudGl0bGVtZW50cygpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMuY2FsbHMuY291bnQoKSkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3B1a2VzIHdpdGhvdXQgYW4gYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcih0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmxvYWRSb2xlRW50aXRsZW1lbnRzKCk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3B1a2VzIHdpdGhvdXQgYW4gYXBwcm92YWwgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUubG9hZFJvbGVFbnRpdGxlbWVudHMoKTtcclxuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
