System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule', 'test/js/approval/ApprovalTestDataService'], function (_export) {
    'use strict';

    var approvalModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsApprovalApprovalTestDataService) {}],
        execute: function () {

            /**
             * Tests for the ApprovalDirectiveCtrl.
             */
            describe('ApprovalDirectiveCtrl', function () {

                var scope, $controller, testService, approvalService, violationService, configService, navigationService, configServiceResult, approvalCompletionService, approvalTestDataService, Approval, callback, ctrl, collapsible, approvalCommentService, workgroupAssignmentService;

                // Load the test module to get the testService.
                // Let the tests know we'll use the approval module.
                beforeEach(module(approvalModule, testModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 */
                /* jshint maxparams:8 */
                beforeEach(inject(function (_$controller_, _approvalService_, _testService_, _violationService_, _navigationService_, _Approval_, _approvalTestDataService_, _workgroupAssignmentService_) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    Approval = _Approval_;
                    navigationService = _navigationService_;
                    approvalTestDataService = _approvalTestDataService_;
                    workgroupAssignmentService = _workgroupAssignmentService_;

                    // Create a mock scope.
                    scope = {};

                    // Create a mock approvalCompletionService.
                    approvalCompletionService = {
                        openCompletionDialog: testService.createPromiseSpy(false)
                    };

                    approvalCommentService = {
                        openCommentDialog: testService.createPromiseSpy(false)
                    };

                    // Create a mock configService.
                    configServiceResult = true;
                    configService = {
                        getConfigValue: jasmine.createSpy('getConfigValue').and.callFake(function () {
                            return configServiceResult;
                        })
                    };

                    // Override our mock approval service methods.
                    approvalService = _approvalService_;
                    approvalService.approveAll = testService.createResponseFunction();
                    approvalService.rejectAll = testService.createResponseFunction();

                    violationService = _violationService_;

                    collapsible = true;
                    callback = jasmine.createSpy('callback');
                }));

                /**
                 * Create an ApprovalDirectiveCtrl that is at the first position in the list, with
                 * some optional overrides.
                 */
                var createController = function (approvalOverrides, index) {
                    var approval = angular.copy(approvalTestDataService.createApproval());

                    // If overrides were specified, apply them.
                    if (approvalOverrides) {
                        angular.extend(approval, approvalOverrides);
                    }

                    createControllerWithApproval(approval, index);
                };

                /**
                 * Create an ApprovalDirectiveCtrl with the given approval and position in the list.
                 */
                var createControllerWithApproval = function (approval, index) {
                    scope.approval = approval ? new Approval(approval) : null;
                    scope.completionCallback = callback;
                    scope.templateStyle = collapsible ? 'collapsible' : 'full';
                    scope.index = index;

                    scope.$new = function () {
                        return {};
                    };

                    // Create the controller to test with.
                    ctrl = $controller('ApprovalDirectiveCtrl', {
                        $scope: scope,
                        approvalService: approvalService,
                        approvalCommentService: approvalCommentService,
                        approvalCompletionService: approvalCompletionService,
                        violationService: violationService,
                        configService: configService,
                        navigationService: navigationService
                    });
                };

                it('pukes if there is no approval in scope', function () {
                    createControllerWithApproval(null, 0);
                    expect(function () {
                        ctrl.completePreDecided();
                    }).toThrow();
                });

                describe('toggleCollapsed()', function () {
                    it('toggles the collapsed state', function () {
                        createController();
                        expect(ctrl.isCollapsed).toEqual(true);
                        ctrl.toggleCollapsed();
                        expect(ctrl.isCollapsed).toEqual(false);
                        ctrl.toggleCollapsed();
                        expect(ctrl.isCollapsed).toEqual(true);
                    });

                    it('does not toggle the collapsed state when approval is not collapsible', function () {
                        collapsible = false;
                        createController();
                        expect(ctrl.isCollapsed).toEqual(false);
                        ctrl.toggleCollapsed();
                        expect(ctrl.isCollapsed).toEqual(false);
                    });
                });

                describe('collapsible', function () {
                    it('defaults to expanded if collapsible is not in scope', function () {
                        collapsible = null;
                        createController();
                        expect(ctrl.isCollapsed).toEqual(false);
                    });

                    it('defaults to not collapsible if collapsible is not in scope', function () {
                        collapsible = null;
                        createController();
                        expect(ctrl.isCollapsible()).toEqual(false);
                    });
                });

                describe('allowPriorityEditing()', function () {
                    it('returns the config service value', function () {
                        var allow = ctrl.allowPriorityEditing();
                        expect(allow).toEqual(configServiceResult);
                    });

                    it('defaults to false if property is not configured', function () {
                        var allow;
                        configServiceResult = null;
                        allow = ctrl.allowPriorityEditing();
                        expect(allow).toEqual(false);
                    });
                });

                /**
                 * Verify that the completion dialog was opened with the appropriate settings.
                 */
                var checkCompletionDialog = function () {
                    var args;

                    expect(approvalCompletionService.openCompletionDialog).toHaveBeenCalled();

                    args = approvalCompletionService.openCompletionDialog.calls.mostRecent().args;
                    expect(args[0]).toEqual(scope);
                    expect(args[1]).toEqual(scope.approval);
                };

                describe('approve all', function () {
                    it('sets all items to approved', function () {
                        createController();
                        ctrl.approveAll();
                        angular.forEach(scope.approval.approvalItems, function (item) {
                            expect(item.decision).toEqual('Approved');
                        });
                    });

                    it('shows the completion dialog', function () {
                        createController();
                        ctrl.approveAll();
                        checkCompletionDialog();
                    });

                    it('shows the expired sunset dialog when appropriate', function () {
                        // make second item have expired sunset date
                        var approval = angular.copy(approvalTestDataService.createApproval());
                        approval.approvalItems[1].sunsetExpired = true;

                        spyOn(approvalService, 'showExpiredSunsetDialog');

                        createControllerWithApproval(approval);
                        ctrl.approveAll();

                        expect(approvalService.showExpiredSunsetDialog).toHaveBeenCalledWith(true);
                    });
                });

                describe('reject all', function () {
                    it('sets all items to rejected', function () {
                        createController();
                        ctrl.rejectAll();
                        angular.forEach(scope.approval.approvalItems, function (item) {
                            expect(item.decision).toEqual('Rejected');
                        });
                    });

                    it('shows the completion dialog', function () {
                        createController();
                        ctrl.rejectAll();
                        checkCompletionDialog();
                    });
                });

                describe('show violations', function () {
                    var spModal,
                        ruleName = 'rule',
                        policyName = 'policy';

                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                        spyOn(spModal, 'open');
                    }));

                    it('should set the modal title to the rule name', function () {
                        var violation = {
                            policyName: policyName,
                            ruleName: ruleName
                        };
                        createController();
                        ctrl.showViolationDetails(scope.approval.id, violation);
                        expect(spModal.open).toHaveBeenCalled();
                        spModal.open.calls.mostRecent().args[0].title = ruleName;
                    });
                });

                describe('show edit priority dialog', function () {
                    var spModal, $q, $rootScope;

                    beforeEach(inject(function (_spModal_, _$q_, _$rootScope_) {
                        spModal = _spModal_;
                        $q = _$q_;
                        $rootScope = _$rootScope_;

                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                    }));

                    it('opens the modal', function () {
                        createController();
                        ctrl.showEditPriorityDialog();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].controller).toEqual('ApprovalPriorityDialogCtrl');
                    });

                    it('sets the approval priority upon completion', function () {
                        var deferred = $q.defer();
                        deferred.resolve('Low');

                        // Make the modal return a result that resolves to 'Low'.  This
                        // simulates the savePriority() function.
                        spModal.open.and.returnValue({
                            result: deferred.promise
                        });

                        createController();
                        ctrl.showEditPriorityDialog();

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();

                        // Check that the approval has the new priority.
                        expect(scope.approval.priority).toEqual('Low');
                    });
                });

                describe('open comment dialog', function () {
                    it('should call the service method', function () {
                        createController();
                        ctrl.showApprovalComments();
                        expect(approvalCommentService.openCommentDialog).toHaveBeenCalled();
                    });
                });

                describe('show forward dialog', function () {
                    var spModal;

                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                        spyOn(spModal, 'open');
                        createController();
                    }));

                    it('opens the modal', function () {
                        ctrl.showForwardDialog();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                it('showWorkgroupAssignmentDialog() opens dialog with the approval', function () {
                    spyOn(workgroupAssignmentService, 'showWorkgroupAssignmentDialog');
                    createController();
                    ctrl.showWorkgroupAssignmentDialog();
                    expect(workgroupAssignmentService.showWorkgroupAssignmentDialog).toHaveBeenCalled();
                    var args = workgroupAssignmentService.showWorkgroupAssignmentDialog.calls.argsFor(0);
                    expect(args[0]).toEqual(scope.approval);
                });

                describe('getUniquifier()', function () {
                    it('gets a unique string with the index', function () {
                        createController({}, 4);
                        expect(ctrl.getUniquifier()).toEqual('Approval4');
                    });
                });

                describe('viewIdentityRequest', function () {
                    it('calls navigation service with correct parameters', function () {
                        spyOn(navigationService, 'go');
                        createController();

                        ctrl.viewIdentityRequest();

                        expect(navigationService.go).toHaveBeenCalled();
                        expect(navigationService.go.calls.mostRecent().args[0].outcome).toEqual('viewAccessRequestDetail#/request/' + scope.approval.accessRequestName);
                        expect(navigationService.go.calls.mostRecent().args[0].navigationHistory).toEqual('viewCommonWorkItem#/commonWorkItem/' + scope.approval.getId());
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsRGlyZWN0aXZlQ3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsNkNBQTZDLFVBQVUsU0FBUztJQUN6Sjs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdDQUF3QztRQUNyRCxTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMseUJBQXlCLFlBQVc7O2dCQUV6QyxJQUFJLE9BQU8sYUFBYSxhQUFhLGlCQUFpQixrQkFBa0IsZUFBZSxtQkFDbkYscUJBQXFCLDJCQUEyQix5QkFBeUIsVUFBVSxVQUFVLE1BQzdGLGFBQWEsd0JBQXdCOzs7O2dCQUl6QyxXQUFXLE9BQU8sZ0JBQWdCOzs7Ozs7Z0JBTWxDLFdBQVcsT0FBTyxVQUFTLGVBQWUsbUJBQW1CLGVBQWUsb0JBQ2pELHFCQUFxQixZQUFZLDJCQUNqQyw4QkFBOEI7OztvQkFHckQsY0FBYztvQkFDZCxjQUFjO29CQUNkLFdBQVc7b0JBQ1gsb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLDZCQUE2Qjs7O29CQUc3QixRQUFROzs7b0JBR1IsNEJBQTRCO3dCQUN4QixzQkFBc0IsWUFBWSxpQkFBaUI7OztvQkFHdkQseUJBQXlCO3dCQUNyQixtQkFBbUIsWUFBWSxpQkFBaUI7Ozs7b0JBSXBELHNCQUFzQjtvQkFDdEIsZ0JBQWdCO3dCQUNaLGdCQUFnQixRQUFRLFVBQVUsa0JBQWtCLElBQUksU0FBUyxZQUFXOzRCQUN4RSxPQUFPOzs7OztvQkFLZixrQkFBa0I7b0JBQ2xCLGdCQUFnQixhQUFhLFlBQVk7b0JBQ3pDLGdCQUFnQixZQUFZLFlBQVk7O29CQUV4QyxtQkFBbUI7O29CQUVuQixj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QXVCLG1CQUFtQjs7OztnQkFJekQsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsSUFBSTs7b0JBRUosV0FBVyxPQUFPLFVBQVMsV0FBVzt3QkFDbEMsVUFBVTt3QkFDVCxNQUFNLFNBQVM7d0JBQ2hCOzs7b0JBR0osR0FBRyxtQkFBbUIsWUFBVzt3QkFDN0IsS0FBSzt3QkFDTCxPQUFPLFFBQVEsTUFBTTs7OztnQkFJN0IsR0FBRyxrRUFBa0UsWUFBTTtvQkFDdkUsTUFBTSw0QkFBNEI7b0JBQ2xDO29CQUNBLEtBQUs7b0JBQ0wsT0FBTywyQkFBMkIsK0JBQStCO29CQUNqRSxJQUFJLE9BQU8sMkJBQTJCLDhCQUE4QixNQUFNLFFBQVE7b0JBQ2xGLE9BQU8sS0FBSyxJQUFJLFFBQVEsTUFBTTs7O2dCQUlsQyxTQUFTLG1CQUFtQixZQUFXO29CQUNuQyxHQUFJLHVDQUF1QyxZQUFXO3dCQUNsRCxpQkFBaUIsSUFBSTt3QkFDckIsT0FBTyxLQUFLLGlCQUFpQixRQUFROzs7O2dCQUk3QyxTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxNQUFNLG1CQUFtQjt3QkFDekI7O3dCQUVBLEtBQUs7O3dCQUVMLE9BQU8sa0JBQWtCLElBQUk7d0JBQzdCLE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxhQUFhLEtBQUssR0FBRyxTQUNuRCxRQUFRLHNDQUFzQyxNQUFNLFNBQVM7d0JBQ2pFLE9BQU8sa0JBQWtCLEdBQUcsTUFBTSxhQUFhLEtBQUssR0FBRyxtQkFDbkQsUUFBUSx3Q0FBd0MsTUFBTSxTQUFTOzs7Ozs7R0FJNUUiLCJmaWxlIjoiYXBwcm92YWwvQXBwcm92YWxEaXJlY3RpdmVDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYXBwcm92YWxNb2R1bGUgZnJvbSAnYXBwcm92YWwvQXBwcm92YWxNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL2FwcHJvdmFsL0FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFwcHJvdmFsRGlyZWN0aXZlQ3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBcHByb3ZhbERpcmVjdGl2ZUN0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgc2NvcGUsICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgYXBwcm92YWxTZXJ2aWNlLCB2aW9sYXRpb25TZXJ2aWNlLCBjb25maWdTZXJ2aWNlLCBuYXZpZ2F0aW9uU2VydmljZSxcclxuICAgICAgICBjb25maWdTZXJ2aWNlUmVzdWx0LCBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlLCBhcHByb3ZhbFRlc3REYXRhU2VydmljZSwgQXBwcm92YWwsIGNhbGxiYWNrLCBjdHJsLFxyXG4gICAgICAgIGNvbGxhcHNpYmxlLCBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLCB3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZTtcclxuXHJcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxyXG4gICAgLy8gTGV0IHRoZSB0ZXN0cyBrbm93IHdlJ2xsIHVzZSB0aGUgYXBwcm92YWwgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXBwcm92YWxNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIHRoZSBtb2NrcyBmb3Igb3VyIHRlc3RzIC0gYSBzY29wZSBhbmQgdGhlIGNvbnRyb2xsZXIuXHJcbiAgICAgKi9cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6OCAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX2FwcHJvdmFsU2VydmljZV8sIF90ZXN0U2VydmljZV8sIF92aW9sYXRpb25TZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9uYXZpZ2F0aW9uU2VydmljZV8sIF9BcHByb3ZhbF8sIF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2VfKSB7XHJcblxyXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgQXBwcm92YWwgPSBfQXBwcm92YWxfO1xyXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcclxuICAgICAgICBhcHByb3ZhbFRlc3REYXRhU2VydmljZSA9IF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV87XHJcbiAgICAgICAgd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2UgPSBfd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2VfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxyXG4gICAgICAgIHNjb3BlID0ge307XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG1vY2sgYXBwcm92YWxDb21wbGV0aW9uU2VydmljZS5cclxuICAgICAgICBhcHByb3ZhbENvbXBsZXRpb25TZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBvcGVuQ29tcGxldGlvbkRpYWxvZzogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlID0ge1xyXG4gICAgICAgICAgICBvcGVuQ29tbWVudERpYWxvZzogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIGNvbmZpZ1NlcnZpY2UuXHJcbiAgICAgICAgY29uZmlnU2VydmljZVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgY29uZmlnU2VydmljZSA9IHtcclxuICAgICAgICAgICAgZ2V0Q29uZmlnVmFsdWU6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRDb25maWdWYWx1ZScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWdTZXJ2aWNlUmVzdWx0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE92ZXJyaWRlIG91ciBtb2NrIGFwcHJvdmFsIHNlcnZpY2UgbWV0aG9kcy5cclxuICAgICAgICBhcHByb3ZhbFNlcnZpY2UgPSBfYXBwcm92YWxTZXJ2aWNlXztcclxuICAgICAgICBhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUFsbCA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlRnVuY3Rpb24oKTtcclxuICAgICAgICBhcHByb3ZhbFNlcnZpY2UucmVqZWN0QWxsID0gdGVzdFNlcnZpY2UuY3JlYXRlUmVzcG9uc2VGdW5jdGlvbigpO1xyXG5cclxuICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0gX3Zpb2xhdGlvblNlcnZpY2VfO1xyXG5cclxuICAgICAgICBjb2xsYXBzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBqYXNtaW5lLmNyZWF0ZVNweSgnY2FsbGJhY2snKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbiBBcHByb3ZhbERpcmVjdGl2ZUN0cmwgdGhhdCBpcyBhdCB0aGUgZmlyc3QgcG9zaXRpb24gaW4gdGhlIGxpc3QsIHdpdGhcclxuICAgICAqIHNvbWUgb3B0aW9uYWwgb3ZlcnJpZGVzLlxyXG4gICAgICovXHJcbiAgICB2YXIgY3JlYXRlQ29udHJvbGxlciA9IGZ1bmN0aW9uKGFwcHJvdmFsT3ZlcnJpZGVzLCBpbmRleCkge1xyXG4gICAgICAgIHZhciBhcHByb3ZhbCA9IGFuZ3VsYXIuY29weShhcHByb3ZhbFRlc3REYXRhU2VydmljZS5jcmVhdGVBcHByb3ZhbCgpKTtcclxuXHJcbiAgICAgICAgLy8gSWYgb3ZlcnJpZGVzIHdlcmUgc3BlY2lmaWVkLCBhcHBseSB0aGVtLlxyXG4gICAgICAgIGlmIChhcHByb3ZhbE92ZXJyaWRlcykge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChhcHByb3ZhbCwgYXBwcm92YWxPdmVycmlkZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcldpdGhBcHByb3ZhbChhcHByb3ZhbCwgaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbiBBcHByb3ZhbERpcmVjdGl2ZUN0cmwgd2l0aCB0aGUgZ2l2ZW4gYXBwcm92YWwgYW5kIHBvc2l0aW9uIGluIHRoZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICB2YXIgY3JlYXRlQ29udHJvbGxlcldpdGhBcHByb3ZhbCA9IGZ1bmN0aW9uKGFwcHJvdmFsLCBpbmRleCkge1xyXG4gICAgICAgIHNjb3BlLmFwcHJvdmFsID0gKGFwcHJvdmFsKSA/IG5ldyBBcHByb3ZhbChhcHByb3ZhbCkgOiBudWxsO1xyXG4gICAgICAgIHNjb3BlLmNvbXBsZXRpb25DYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHNjb3BlLnRlbXBsYXRlU3R5bGUgPSBjb2xsYXBzaWJsZSA/ICdjb2xsYXBzaWJsZScgOiAnZnVsbCc7XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgc2NvcGUuJG5ldyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0FwcHJvdmFsRGlyZWN0aXZlQ3RybCcsIHtcclxuICAgICAgICAgICAgJHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlOiBhcHByb3ZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgIGFwcHJvdmFsQ29tbWVudFNlcnZpY2U6IGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsXHJcbiAgICAgICAgICAgIGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2U6IGFwcHJvdmFsQ29tcGxldGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgIHZpb2xhdGlvblNlcnZpY2U6IHZpb2xhdGlvblNlcnZpY2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpdCgncHVrZXMgaWYgdGhlcmUgaXMgbm8gYXBwcm92YWwgaW4gc2NvcGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjcmVhdGVDb250cm9sbGVyV2l0aEFwcHJvdmFsKG51bGwsIDApO1xyXG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC5jb21wbGV0ZVByZURlY2lkZWQoKTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUNvbGxhcHNlZCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3RvZ2dsZXMgdGhlIGNvbGxhcHNlZCBzdGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZUNvbGxhcHNlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbGxhcHNlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlQ29sbGFwc2VkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3QgdG9nZ2xlIHRoZSBjb2xsYXBzZWQgc3RhdGUgd2hlbiBhcHByb3ZhbCBpcyBub3QgY29sbGFwc2libGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29sbGFwc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbGxhcHNlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlQ29sbGFwc2VkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb2xsYXBzaWJsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBleHBhbmRlZCBpZiBjb2xsYXBzaWJsZSBpcyBub3QgaW4gc2NvcGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29sbGFwc2libGUgPSBudWxsO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2VkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RlZmF1bHRzIHRvIG5vdCBjb2xsYXBzaWJsZSBpZiBjb2xsYXBzaWJsZSBpcyBub3QgaW4gc2NvcGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29sbGFwc2libGUgPSBudWxsO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29sbGFwc2libGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYWxsb3dQcmlvcml0eUVkaXRpbmcoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb25maWcgc2VydmljZSB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWxsb3cgPSBjdHJsLmFsbG93UHJpb3JpdHlFZGl0aW5nKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhbGxvdykudG9FcXVhbChjb25maWdTZXJ2aWNlUmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RlZmF1bHRzIHRvIGZhbHNlIGlmIHByb3BlcnR5IGlzIG5vdCBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGxvdztcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZVJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGFsbG93ID0gY3RybC5hbGxvd1ByaW9yaXR5RWRpdGluZygpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWxsb3cpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZnkgdGhhdCB0aGUgY29tcGxldGlvbiBkaWFsb2cgd2FzIG9wZW5lZCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBzZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgdmFyIGNoZWNrQ29tcGxldGlvbkRpYWxvZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhcmdzO1xyXG5cclxuICAgICAgICBleHBlY3QoYXBwcm92YWxDb21wbGV0aW9uU2VydmljZS5vcGVuQ29tcGxldGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICBhcmdzID0gYXBwcm92YWxDb21wbGV0aW9uU2VydmljZS5vcGVuQ29tcGxldGlvbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbChzY29wZSk7XHJcbiAgICAgICAgZXhwZWN0KGFyZ3NbMV0pLnRvRXF1YWwoc2NvcGUuYXBwcm92YWwpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2FwcHJvdmUgYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3NldHMgYWxsIGl0ZW1zIHRvIGFwcHJvdmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgY3RybC5hcHByb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5hcHByb3ZhbC5hcHByb3ZhbEl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbS5kZWNpc2lvbikudG9FcXVhbCgnQXBwcm92ZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgY29tcGxldGlvbiBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjdHJsLmFwcHJvdmVBbGwoKTtcclxuICAgICAgICAgICAgY2hlY2tDb21wbGV0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgZXhwaXJlZCBzdW5zZXQgZGlhbG9nIHdoZW4gYXBwcm9wcmlhdGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc2Vjb25kIGl0ZW0gaGF2ZSBleHBpcmVkIHN1bnNldCBkYXRlXHJcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbCA9IGFuZ3VsYXIuY29weShhcHByb3ZhbFRlc3REYXRhU2VydmljZS5jcmVhdGVBcHByb3ZhbCgpKTtcclxuICAgICAgICAgICAgYXBwcm92YWwuYXBwcm92YWxJdGVtc1sxXS5zdW5zZXRFeHBpcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGFwcHJvdmFsU2VydmljZSwgJ3Nob3dFeHBpcmVkU3Vuc2V0RGlhbG9nJyk7XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyV2l0aEFwcHJvdmFsKGFwcHJvdmFsKTtcclxuICAgICAgICAgICAgY3RybC5hcHByb3ZlQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLnNob3dFeHBpcmVkU3Vuc2V0RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBkZXNjcmliZSgncmVqZWN0IGFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzZXRzIGFsbCBpdGVtcyB0byByZWplY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGN0cmwucmVqZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5hcHByb3ZhbC5hcHByb3ZhbEl0ZW1zLCBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbS5kZWNpc2lvbikudG9FcXVhbCgnUmVqZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgY29tcGxldGlvbiBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjdHJsLnJlamVjdEFsbCgpO1xyXG4gICAgICAgICAgICBjaGVja0NvbXBsZXRpb25EaWFsb2coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93IHZpb2xhdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3BNb2RhbCxcclxuICAgICAgICAgICAgcnVsZU5hbWUgPSAncnVsZScsXHJcbiAgICAgICAgICAgIHBvbGljeU5hbWUgPSAncG9saWN5JztcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwTW9kYWxfKSB7XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgbW9kYWwgdGl0bGUgdG8gdGhlIHJ1bGUgbmFtZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdmlvbGF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5TmFtZTogcG9saWN5TmFtZSxcclxuICAgICAgICAgICAgICAgIHJ1bGVOYW1lOiBydWxlTmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd1Zpb2xhdGlvbkRldGFpbHMoc2NvcGUuYXBwcm92YWwuaWQsIHZpb2xhdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnRpdGxlID0gcnVsZU5hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3cgZWRpdCBwcmlvcml0eSBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3BNb2RhbCwgJHEsICRyb290U2NvcGU7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9zcE1vZGFsXywgXyRxXywgXyRyb290U2NvcGVfKSB7XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgICRxID0gXyRxXztcclxuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuXHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ29wZW5zIHRoZSBtb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0VkaXRQcmlvcml0eURpYWxvZygpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uY29udHJvbGxlcikudG9FcXVhbCgnQXBwcm92YWxQcmlvcml0eURpYWxvZ0N0cmwnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIGFwcHJvdmFsIHByaW9yaXR5IHVwb24gY29tcGxldGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCdMb3cnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIG1vZGFsIHJldHVybiBhIHJlc3VsdCB0aGF0IHJlc29sdmVzIHRvICdMb3cnLiAgVGhpc1xyXG4gICAgICAgICAgICAvLyBzaW11bGF0ZXMgdGhlIHNhdmVQcmlvcml0eSgpIGZ1bmN0aW9uLlxyXG4gICAgICAgICAgICBzcE1vZGFsLm9wZW4uYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogZGVmZXJyZWQucHJvbWlzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgY3RybC5zaG93RWRpdFByaW9yaXR5RGlhbG9nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGFwcHJvdmFsIGhhcyB0aGUgbmV3IHByaW9yaXR5LlxyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuYXBwcm92YWwucHJpb3JpdHkpLnRvRXF1YWwoJ0xvdycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ29wZW4gY29tbWVudCBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIHNlcnZpY2UgbWV0aG9kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgY3RybC5zaG93QXBwcm92YWxDb21tZW50cygpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxDb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3cgZm9yd2FyZCBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3BNb2RhbDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwTW9kYWxfKSB7XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgdGhlIG1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2hvd0ZvcndhcmREaWFsb2coKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dXb3JrZ3JvdXBBc3NpZ25tZW50RGlhbG9nKCkgb3BlbnMgZGlhbG9nIHdpdGggdGhlIGFwcHJvdmFsJywgKCkgPT4ge1xyXG4gICAgICAgIHNweU9uKHdvcmtncm91cEFzc2lnbm1lbnRTZXJ2aWNlLCAnc2hvd1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2cnKTtcclxuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgY3RybC5zaG93V29ya2dyb3VwQXNzaWdubWVudERpYWxvZygpO1xyXG4gICAgICAgIGV4cGVjdCh3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZS5zaG93V29ya2dyb3VwQXNzaWdubWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGxldCBhcmdzID0gd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2Uuc2hvd1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2cuY2FsbHMuYXJnc0ZvcigwKTtcclxuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbChzY29wZS5hcHByb3ZhbCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFVuaXF1aWZpZXIoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0ICgnZ2V0cyBhIHVuaXF1ZSBzdHJpbmcgd2l0aCB0aGUgaW5kZXgnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcih7fSwgNCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFVuaXF1aWZpZXIoKSkudG9FcXVhbCgnQXBwcm92YWw0Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgndmlld0lkZW50aXR5UmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdjYWxscyBuYXZpZ2F0aW9uIHNlcnZpY2Ugd2l0aCBjb3JyZWN0IHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnZpZXdJZGVudGl0eVJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ub3V0Y29tZSkuXHJcbiAgICAgICAgICAgICAgICB0b0VxdWFsKCd2aWV3QWNjZXNzUmVxdWVzdERldGFpbCMvcmVxdWVzdC8nICsgc2NvcGUuYXBwcm92YWwuYWNjZXNzUmVxdWVzdE5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ubmF2aWdhdGlvbkhpc3RvcnkpLlxyXG4gICAgICAgICAgICAgICAgdG9FcXVhbCgndmlld0NvbW1vbldvcmtJdGVtIy9jb21tb25Xb3JrSXRlbS8nICsgc2NvcGUuYXBwcm92YWwuZ2V0SWQoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
