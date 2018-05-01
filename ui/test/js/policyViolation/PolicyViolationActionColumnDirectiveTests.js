System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationActionColumnDirectiveCtrl', function () {

                var ctrl = undefined,
                    $controller = undefined,
                    testViolation = undefined,
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    policyTestData = undefined,
                    PolicyViolationAction = undefined,
                    PolicyViolation = undefined,
                    policyViolationDecisionService = undefined,
                    elementDefinition = '<sp-policy-violation-action-column sp-model="item" />';

                beforeEach(module(policyViolationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function ($rootScope, _$compile_, _$controller_, _PolicyViolation_, _policyTestData_, _PolicyViolationAction_, _policyViolationDecisionService_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    PolicyViolation = _PolicyViolation_;
                    PolicyViolationAction = _PolicyViolationAction_;
                    policyTestData = _policyTestData_;
                    policyViolationDecisionService = _policyViolationDecisionService_;
                    testViolation = new PolicyViolation(policyTestData.POLICY_VIOLATION_DATA_1);

                    createController();
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(item) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function createController() {
                    ctrl = $controller('PolicyViolationActionColumnDirectiveCtrl', { PolicyViolationAction: PolicyViolationAction }, { item: testViolation });
                    ctrl.$onInit();
                }

                it('throws with no spModel specified', function () {
                    expect(function () {
                        var ctrl = $controller('PolicyViolationActionColumnDirectiveCtrl', {}, { item: null });
                        ctrl.$onInit();
                    }).toThrow();
                });

                it('getDisplayName return policy name', function () {
                    expect(ctrl.getPolicyDisplayName()).toEqual(testViolation.getPolicyName());
                });

                describe('action initialization', function () {
                    describe('with no saved decision', function () {
                        it('initializes button actions', function () {
                            expect(ctrl.buttonActions.length).toEqual(2);
                            expect(ctrl.buttonActions[0].name).toEqual(PolicyViolationAction.Status.Mitigated);
                            expect(ctrl.buttonActions[1].name).toEqual(PolicyViolationAction.Status.Remediated);
                        });

                        it('initializes menu actions', function () {
                            expect(ctrl.menuActions.length).toEqual(1);
                            expect(ctrl.menuActions[0].name).toEqual(PolicyViolationAction.Status.Delegated);
                        });
                    });

                    describe('with saved decision', function () {
                        it('has no actions if violation is not editable', function () {
                            testViolation.editable = false;

                            createController();
                            expect(ctrl.buttonActions.length).toEqual(0);
                            expect(ctrl.menuActions.length).toEqual(0);
                        });

                        it('puts all actions in the menu', function () {
                            testViolation.decision = {
                                status: PolicyViolationAction.Status.Mitigated
                            };
                            createController();
                            expect(ctrl.buttonActions.length).toEqual(0);
                            expect(ctrl.menuActions.length).toEqual(2);
                        });

                        it('excludes the action for the saved decision', function () {
                            testViolation.decision = {
                                status: PolicyViolationAction.Status.Mitigated
                            };
                            createController();
                            expect(ctrl.buttonActions.length).toEqual(0);
                            expect(ctrl.menuActions.length).toEqual(2);
                            expect(ctrl.menuActions[0].name).toEqual(PolicyViolationAction.Status.Remediated);
                            expect(ctrl.menuActions[1].name).toEqual(PolicyViolationAction.Status.Delegated);
                        });
                    });
                });

                it('shows detail menu action', function () {
                    createElement(testViolation);
                    var menuItems = element.find('.policy-violation-action-column ul.dropdown-menu li');
                    expect(menuItems.length).toBe(2);
                    expect(menuItems[1].textContent.indexOf('ui_policy_violation_action_details') > -1).toBe(true);
                });

                it('shows edit decision menu', function () {
                    testViolation.decision = {
                        status: PolicyViolationAction.Status.Delegated
                    };

                    createElement(testViolation);
                    var menuItems = element.find('.policy-violation-action-column ul.dropdown-menu li');
                    expect(menuItems.length).toBe(4);
                    expect(menuItems[0].textContent.indexOf('ui_policy_violation_action_edit_decision') > -1).toBe(true);
                });

                it('does not show edit decision menu when there is no decision', function () {
                    createElement(testViolation);
                    var menuItems = element.find('.policy-violation-action-column ul.dropdown-menu li');
                    expect(menuItems.length).toBe(2);
                    expect(menuItems[0].textContent.indexOf('ui_policy_violation_action_edit_decision') > -1).toBe(false);
                });

                it('shows view decision menu', function () {
                    testViolation.decision = {
                        status: PolicyViolationAction.Status.Remediated
                    };

                    testViolation.editable = false;

                    createElement(testViolation);
                    var menuItems = element.find('.policy-violation-action-column ul.dropdown-menu li');
                    expect(menuItems.length).toBe(2);
                    expect(menuItems[0].textContent.indexOf('ui_policy_violation_action_view_decision') > -1).toBe(true);
                    expect(menuItems[1].textContent.indexOf('ui_policy_violation_action_details') > -1).toBe(true);
                });

                it('reinitializes if item changes', function () {
                    createElement(testViolation);
                    var controller = element.controller('spPolicyViolationActionColumn');
                    spyOn(controller, 'initializeActions');

                    $scope.item = new PolicyViolation(policyTestData.POLICY_VIOLATION_DATA_2);
                    $scope.$apply();

                    expect(controller.initializeActions).toHaveBeenCalled();
                });

                it('calls through to policyViolationDecisionService to set decision when button is clicked', function () {
                    spyOn(policyViolationDecisionService, 'setDecision').and.returnValue({ 'catch': function () {} });
                    createElement(testViolation);
                    var mitigatedButton = element.find('button.policy-violation-action.Mitigated');
                    angular.element(mitigatedButton).click();
                    expect(policyViolationDecisionService.setDecision).toHaveBeenCalledWith(testViolation, PolicyViolationAction.Status.Mitigated);
                });

                describe('getCurrentDecision()', function () {
                    it('gets the current pending item decision', function () {
                        var currentDecision = {
                            status: PolicyViolationAction.Status.Delegated
                        };

                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(currentDecision);

                        expect(ctrl.getCurrentDecision()).toBe(currentDecision);
                    });

                    it('gets the existing item decision if there is no pending decision', function () {
                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Remediated
                        };

                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(undefined);
                        expect(ctrl.getCurrentDecision()).toBe(testViolation.decision);
                    });

                    it('returns undefined if no existing or pending decision exists', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(undefined);
                        expect(ctrl.getCurrentDecision()).toBe(undefined);
                    });
                });

                describe('isCurrentUnsavedDecision()', function () {
                    it('returns false if no decision for violation', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(undefined);
                        expect(ctrl.isCurrentUnsavedDecision({
                            status: PolicyViolationAction.Status.Mitigated
                        })).toEqual(false);
                    });

                    it('returns false if decision for violation does not match status', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Remediated
                        });
                        expect(ctrl.isCurrentUnsavedDecision({
                            status: PolicyViolationAction.Status.Mitigated
                        })).toEqual(false);
                    });

                    it('returns true if decision for violation matches status', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Mitigated
                        });
                        expect(ctrl.isCurrentUnsavedDecision({
                            status: PolicyViolationAction.Status.Mitigated
                        })).toEqual(true);
                    });

                    it('adds class to the action button for matching status', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Mitigated
                        });
                        createElement(testViolation);
                        var mitigatedButton = element.find('button.policy-violation-action.Mitigated');
                        expect(angular.element(mitigatedButton).hasClass('policy-violation-action-current-decision-btn')).toEqual(true);
                    });
                });

                describe('getCurrentDecisionAction()', function () {
                    it('returns action for the unsaved decision if exists', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Remediated
                        });

                        var action = ctrl.getCurrentDecisionAction();
                        expect(action.status).toBe(PolicyViolationAction.Status.Remediated);
                    });

                    it('returns action for the saved decision if unsaved decision does not exist', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(undefined);

                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Remediated
                        };

                        var action = ctrl.getCurrentDecisionAction();
                        expect(action.status).toBe(PolicyViolationAction.Status.Remediated);
                    });
                });

                describe('hasSavedDecision()', function () {
                    it('returns true if policy violation has saved decision', function () {
                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Remediated
                        };

                        var hasSavedDecision = ctrl.hasSavedDecision();
                        expect(hasSavedDecision).toBe(true);
                    });

                    it('returns false if policy violation does not have saved decision', function () {
                        var hasSavedDecision = ctrl.hasSavedDecision();
                        expect(hasSavedDecision).toBe(false);
                    });

                    it('shows status message key as text if saved decision exists', function () {
                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Remediated
                        };
                        createElement(testViolation);
                        var currentDecisionText = element.find('span.policy-violation-action-current-decision-text');
                        var actionMessageName = ctrl.getCurrentDecisionActionName();
                        expect(currentDecisionText[0].classList.contains(actionMessageName)).toBeTruthy();
                    });
                });

                describe('getCurrentDecisionActionOnMenu()', function () {
                    it('returns the action for the current decision if it is in the menu', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Delegated
                        });

                        var action = ctrl.getCurrentDecisionActionOnMenu();
                        expect(action.status).toBe(PolicyViolationAction.Status.Delegated);
                    });

                    it('returns undefined if not current decision', function () {
                        var action = ctrl.getCurrentDecisionActionOnMenu();
                        expect(action).toBeUndefined();
                    });

                    it('returns undefined if current decision is not on the menu', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Remediated
                        });

                        var action = ctrl.getCurrentDecisionActionOnMenu();
                        expect(action).toBeUndefined();
                    });
                });

                describe('canEditDecision', function () {
                    beforeEach(function () {
                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Delegated
                        };
                    });

                    it('returns true if editable and there is an existing decision', function () {
                        testViolation.editable = true;

                        var editable = ctrl.canEditDecision();
                        expect(editable).toBe(true);
                    });

                    it('returns false if not editable and there is an existing decision', function () {
                        testViolation.editable = false;

                        var editable = ctrl.canEditDecision();
                        expect(editable).toBe(false);
                    });

                    it('returns true if editable and there is pending decision', function () {
                        var currentDecision = {
                            status: PolicyViolationAction.Status.Delegated
                        };

                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(currentDecision);

                        testViolation.editable = true;

                        var editable = ctrl.canEditDecision();
                        expect(editable).toBe(true);
                    });

                    it('returns false if not editable and there is a pending decision', function () {
                        var currentDecision = {
                            status: PolicyViolationAction.Status.Delegated
                        };

                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue(currentDecision);

                        testViolation.editable = false;

                        var editable = ctrl.canEditDecision();
                        expect(editable).toBe(false);
                    });
                });

                describe('canViewDecision', function () {
                    beforeEach(function () {
                        testViolation.decision = {
                            status: PolicyViolationAction.Status.Remediated
                        };
                    });

                    it('returns false if editable', function () {
                        testViolation.editable = true;

                        var editable = ctrl.canViewDecision();
                        expect(editable).toBe(false);
                    });

                    it('returns true if not editable', function () {
                        testViolation.editable = false;

                        var editable = ctrl.canViewDecision();
                        expect(editable).toBe(true);
                    });
                });

                describe('isEdited', function () {
                    it('returns true when decision is edited', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Remediated,
                            edited: true
                        });

                        var edited = ctrl.isEdited();
                        expect(edited).toBe(true);
                    });

                    it('returns false when decision is not edited', function () {
                        spyOn(policyViolationDecisionService, 'getDecision').and.returnValue({
                            status: PolicyViolationAction.Status.Remediated,
                            edited: false
                        });

                        var edited = ctrl.isEdited();
                        expect(edited).toBe(false);
                    });
                });

                it('editDecision calls through to policyViolationDecisionService editDecision', function () {
                    testViolation.editable = true;

                    spyOn(policyViolationDecisionService, 'editDecision').and.returnValue({ 'catch': function () {} });
                    ctrl.editDecision();
                    expect(policyViolationDecisionService.editDecision).toHaveBeenCalledWith(testViolation, false);
                });

                it('viewDecision calls through to policyViolationDecisionService viewDecision', function () {
                    testViolation.editable = false;

                    spyOn(policyViolationDecisionService, 'viewDecision').and.returnValue({ 'catch': function () {} });
                    ctrl.viewDecision();
                    expect(policyViolationDecisionService.viewDecision).toHaveBeenCalledWith(testViolation);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7Ozs7SUFLckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNENBQTRDLFlBQVc7O2dCQUU1RCxJQUFJLE9BQUk7b0JBQUUsY0FBVztvQkFBRSxnQkFBYTtvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxpQkFBYztvQkFDM0Usd0JBQXFCO29CQUFFLGtCQUFlO29CQUFFLGlDQUE4QjtvQkFDdEUsb0JBQWlCOztnQkFFckIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxlQUFlLG1CQUFtQixrQkFDMUQseUJBQXlCLGtDQUFrQztvQkFDbEYsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQix3QkFBd0I7b0JBQ3hCLGlCQUFpQjtvQkFDakIsaUNBQWlDO29CQUNqQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsZUFBZTs7b0JBRW5EOzs7Z0JBR0osVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLGNBQWMsTUFBTTtvQkFDekIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLE9BQU8sT0FBTztvQkFDZCxTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksNENBQ2YsRUFBRSx1QkFBdUIseUJBQ3pCLEVBQUUsTUFBTTtvQkFDWixLQUFLOzs7Z0JBR1QsR0FBSSxvQ0FBb0Ms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TCxPQUFPLCtCQUErQixjQUFjLHFCQUFxQixlQUFlOzs7Z0JBRzVGLEdBQUcsNkVBQTZFLFlBQU07b0JBQ2xGLGNBQWMsV0FBVzs7b0JBRXpCLE1BQU0sZ0NBQWdDLGdCQUFnQixJQUFJLFlBQVksRUFBRSxTQUFPLFlBQU07b0JBQ3JGLEtBQUs7b0JBQ0wsT0FBTywrQkFBK0IsY0FBYyxxQkFBcUI7Ozs7O0dBYTlFIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcG9saWN5VmlvbGF0aW9uTW9kdWxlIGZyb20gJ3BvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uQWN0aW9uQ29sdW1uRGlyZWN0aXZlQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGN0cmwsICRjb250cm9sbGVyLCB0ZXN0VmlvbGF0aW9uLCBlbGVtZW50LCAkc2NvcGUsICRjb21waWxlLCBwb2xpY3lUZXN0RGF0YSxcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uLCBQb2xpY3lWaW9sYXRpb24sIHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSxcbiAgICAgICAgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLXBvbGljeS12aW9sYXRpb24tYWN0aW9uLWNvbHVtbiBzcC1tb2RlbD1cIml0ZW1cIiAvPmA7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBfJGNvbnRyb2xsZXJfLCBfUG9saWN5VmlvbGF0aW9uXywgX3BvbGljeVRlc3REYXRhXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXywgX3BvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZV8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICBQb2xpY3lWaW9sYXRpb24gPSBfUG9saWN5VmlvbGF0aW9uXztcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uID0gX1BvbGljeVZpb2xhdGlvbkFjdGlvbl87XG4gICAgICAgIHBvbGljeVRlc3REYXRhID0gX3BvbGljeVRlc3REYXRhXztcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZV87XG4gICAgICAgIHRlc3RWaW9sYXRpb24gPSBuZXcgUG9saWN5VmlvbGF0aW9uKHBvbGljeVRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV8xKTtcblxuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaXRlbSkge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignUG9saWN5VmlvbGF0aW9uQWN0aW9uQ29sdW1uRGlyZWN0aXZlQ3RybCcsXG4gICAgICAgICAgICB7IFBvbGljeVZpb2xhdGlvbkFjdGlvbjogUG9saWN5VmlvbGF0aW9uQWN0aW9uIH0sXG4gICAgICAgICAgICB7IGl0ZW06IHRlc3RWaW9sYXRpb24gfSk7XG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xuICAgIH1cblxuICAgIGl0ICgndGhyb3dzIHdpdGggbm8gc3BNb2RlbCBzcGVjaWZpZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCAgPSAkY29udHJvbGxlcignUG9saWN5VmlvbGF0aW9uQWN0aW9uQ29sdW1uRGlyZWN0aXZlQ3RybCcsIHt9LCB7aXRlbTogbnVsbH0pO1xuICAgICAgICAgICAgY3RybC4kb25Jbml0KCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXREaXNwbGF5TmFtZSByZXR1cm4gcG9saWN5IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjdHJsLmdldFBvbGljeURpc3BsYXlOYW1lKCkpLnRvRXF1YWwodGVzdFZpb2xhdGlvbi5nZXRQb2xpY3lOYW1lKCkpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FjdGlvbiBpbml0aWFsaXphdGlvbicsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ3dpdGggbm8gc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgYnV0dG9uIGFjdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuYnV0dG9uQWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuYnV0dG9uQWN0aW9uc1swXS5uYW1lKS50b0VxdWFsKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuTWl0aWdhdGVkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5idXR0b25BY3Rpb25zWzFdLm5hbWUpLnRvRXF1YWwoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdpbml0aWFsaXplcyBtZW51IGFjdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwubWVudUFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1lbnVBY3Rpb25zWzBdLm5hbWUpLnRvRXF1YWwoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5EZWxlZ2F0ZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCd3aXRoIHNhdmVkIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ2hhcyBubyBhY3Rpb25zIGlmIHZpb2xhdGlvbiBpcyBub3QgZWRpdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFZpb2xhdGlvbi5lZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmJ1dHRvbkFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1lbnVBY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncHV0cyBhbGwgYWN0aW9ucyBpbiB0aGUgbWVudScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXN0VmlvbGF0aW9uLmRlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuTWl0aWdhdGVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuYnV0dG9uQWN0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwubWVudUFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdleGNsdWRlcyB0aGUgYWN0aW9uIGZvciB0aGUgc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGVzdFZpb2xhdGlvbi5kZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmJ1dHRvbkFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1lbnVBY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5tZW51QWN0aW9uc1swXS5uYW1lKS50b0VxdWFsKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwubWVudUFjdGlvbnNbMV0ubmFtZSkudG9FcXVhbChQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgZGV0YWlsIG1lbnUgYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KHRlc3RWaW9sYXRpb24pO1xuICAgICAgICBsZXQgbWVudUl0ZW1zID0gZWxlbWVudC5maW5kKCcucG9saWN5LXZpb2xhdGlvbi1hY3Rpb24tY29sdW1uIHVsLmRyb3Bkb3duLW1lbnUgbGknKTtcbiAgICAgICAgZXhwZWN0KG1lbnVJdGVtcy5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChtZW51SXRlbXNbMV0udGV4dENvbnRlbnQuaW5kZXhPZigndWlfcG9saWN5X3Zpb2xhdGlvbl9hY3Rpb25fZGV0YWlscycpID4gLTEpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgZWRpdCBkZWNpc2lvbiBtZW51JywgKCkgPT4ge1xuICAgICAgICB0ZXN0VmlvbGF0aW9uLmRlY2lzaW9uID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQodGVzdFZpb2xhdGlvbik7XG4gICAgICAgIGxldCBtZW51SXRlbXMgPSBlbGVtZW50LmZpbmQoJy5wb2xpY3ktdmlvbGF0aW9uLWFjdGlvbi1jb2x1bW4gdWwuZHJvcGRvd24tbWVudSBsaScpO1xuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9CZSg0KTtcbiAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1swXS50ZXh0Q29udGVudC5pbmRleE9mKCd1aV9wb2xpY3lfdmlvbGF0aW9uX2FjdGlvbl9lZGl0X2RlY2lzaW9uJykgPiAtMSkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBzaG93IGVkaXQgZGVjaXNpb24gbWVudSB3aGVuIHRoZXJlIGlzIG5vIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVFbGVtZW50KHRlc3RWaW9sYXRpb24pO1xuICAgICAgICBsZXQgbWVudUl0ZW1zID0gZWxlbWVudC5maW5kKCcucG9saWN5LXZpb2xhdGlvbi1hY3Rpb24tY29sdW1uIHVsLmRyb3Bkb3duLW1lbnUgbGknKTtcbiAgICAgICAgZXhwZWN0KG1lbnVJdGVtcy5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChtZW51SXRlbXNbMF0udGV4dENvbnRlbnQuaW5kZXhPZigndWlfcG9saWN5X3Zpb2xhdGlvbl9hY3Rpb25fZWRpdF9kZWNpc2lvbicpID4gLTEpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3dzIHZpZXcgZGVjaXNpb24gbWVudScsICgpID0+IHtcbiAgICAgICAgdGVzdFZpb2xhdGlvbi5kZWNpc2lvbiA9IHtcbiAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkXG4gICAgICAgIH07XG5cbiAgICAgICAgdGVzdFZpb2xhdGlvbi5lZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQodGVzdFZpb2xhdGlvbik7XG4gICAgICAgIGxldCBtZW51SXRlbXMgPSBlbGVtZW50LmZpbmQoJy5wb2xpY3ktdmlvbGF0aW9uLWFjdGlvbi1jb2x1bW4gdWwuZHJvcGRvd24tbWVudSBsaScpO1xuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9CZSgyKTtcbiAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1swXS50ZXh0Q29udGVudC5pbmRleE9mKCd1aV9wb2xpY3lfdmlvbGF0aW9uX2FjdGlvbl92aWV3X2RlY2lzaW9uJykgPiAtMSkudG9CZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1sxXS50ZXh0Q29udGVudC5pbmRleE9mKCd1aV9wb2xpY3lfdmlvbGF0aW9uX2FjdGlvbl9kZXRhaWxzJykgPiAtMSkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZWluaXRpYWxpemVzIGlmIGl0ZW0gY2hhbmdlcycsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCh0ZXN0VmlvbGF0aW9uKTtcbiAgICAgICAgbGV0IGNvbnRyb2xsZXIgPSBlbGVtZW50LmNvbnRyb2xsZXIoJ3NwUG9saWN5VmlvbGF0aW9uQWN0aW9uQ29sdW1uJyk7XG4gICAgICAgIHNweU9uKGNvbnRyb2xsZXIsICdpbml0aWFsaXplQWN0aW9ucycpO1xuXG4gICAgICAgICRzY29wZS5pdGVtID0gbmV3IFBvbGljeVZpb2xhdGlvbihwb2xpY3lUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX0RBVEFfMik7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICBleHBlY3QoY29udHJvbGxlci5pbml0aWFsaXplQWN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gcG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlIHRvIHNldCBkZWNpc2lvbiB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdzZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh7IGNhdGNoOiAoKSA9PiB7fX0pO1xuICAgICAgICBjcmVhdGVFbGVtZW50KHRlc3RWaW9sYXRpb24pO1xuICAgICAgICBsZXQgbWl0aWdhdGVkQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24ucG9saWN5LXZpb2xhdGlvbi1hY3Rpb24uTWl0aWdhdGVkJyk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChtaXRpZ2F0ZWRCdXR0b24pLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uuc2V0RGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRlc3RWaW9sYXRpb24sXG4gICAgICAgICAgICBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q3VycmVudERlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdnZXRzIHRoZSBjdXJyZW50IHBlbmRpbmcgaXRlbSBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoY3VycmVudERlY2lzaW9uKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkpLnRvQmUoY3VycmVudERlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2dldHMgdGhlIGV4aXN0aW5nIGl0ZW0gZGVjaXNpb24gaWYgdGhlcmUgaXMgbm8gcGVuZGluZyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgJ2dldERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50RGVjaXNpb24oKSkudG9CZSh0ZXN0VmlvbGF0aW9uLmRlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbm8gZXhpc3Rpbmcgb3IgcGVuZGluZyBkZWNpc2lvbiBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkpLnRvQmUodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNDdXJyZW50VW5zYXZlZERlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIGRlY2lzaW9uIGZvciB2aW9sYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDdXJyZW50VW5zYXZlZERlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuTWl0aWdhdGVkXG4gICAgICAgICAgICB9KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGRlY2lzaW9uIGZvciB2aW9sYXRpb24gZG9lcyBub3QgbWF0Y2ggc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ3VycmVudFVuc2F2ZWREZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZFxuICAgICAgICAgICAgfSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGRlY2lzaW9uIGZvciB2aW9sYXRpb24gbWF0Y2hlcyBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0N1cnJlbnRVbnNhdmVkRGVjaXNpb24oe1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWRcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyBjbGFzcyB0byB0aGUgYWN0aW9uIGJ1dHRvbiBmb3IgbWF0Y2hpbmcgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCh0ZXN0VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGxldCBtaXRpZ2F0ZWRCdXR0b24gPSBlbGVtZW50LmZpbmQoJ2J1dHRvbi5wb2xpY3ktdmlvbGF0aW9uLWFjdGlvbi5NaXRpZ2F0ZWQnKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQobWl0aWdhdGVkQnV0dG9uKS5oYXNDbGFzcygncG9saWN5LXZpb2xhdGlvbi1hY3Rpb24tY3VycmVudC1kZWNpc2lvbi1idG4nKSlcbiAgICAgICAgICAgICAgICAudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q3VycmVudERlY2lzaW9uQWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGFjdGlvbiBmb3IgdGhlIHVuc2F2ZWQgZGVjaXNpb24gaWYgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uQWN0aW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uLnN0YXR1cykudG9CZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhY3Rpb24gZm9yIHRoZSBzYXZlZCBkZWNpc2lvbiBpZiB1bnNhdmVkIGRlY2lzaW9uIGRvZXMgbm90IGV4aXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgdGVzdFZpb2xhdGlvbi5kZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uQWN0aW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uLnN0YXR1cykudG9CZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNTYXZlZERlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcG9saWN5IHZpb2xhdGlvbiBoYXMgc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0VmlvbGF0aW9uLmRlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgaGFzU2F2ZWREZWNpc2lvbiA9IGN0cmwuaGFzU2F2ZWREZWNpc2lvbigpO1xuICAgICAgICAgICAgZXhwZWN0KGhhc1NhdmVkRGVjaXNpb24pLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHBvbGljeSB2aW9sYXRpb24gZG9lcyBub3QgaGF2ZSBzYXZlZCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoYXNTYXZlZERlY2lzaW9uID0gY3RybC5oYXNTYXZlZERlY2lzaW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoaGFzU2F2ZWREZWNpc2lvbikudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyBzdGF0dXMgbWVzc2FnZSBrZXkgYXMgdGV4dCBpZiBzYXZlZCBkZWNpc2lvbiBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0VmlvbGF0aW9uLmRlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5SZW1lZGlhdGVkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCh0ZXN0VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGVjaXNpb25UZXh0ID0gZWxlbWVudC5maW5kKCdzcGFuLnBvbGljeS12aW9sYXRpb24tYWN0aW9uLWN1cnJlbnQtZGVjaXNpb24tdGV4dCcpO1xuICAgICAgICAgICAgbGV0IGFjdGlvbk1lc3NhZ2VOYW1lID0gY3RybC5nZXRDdXJyZW50RGVjaXNpb25BY3Rpb25OYW1lKCk7XG4gICAgICAgICAgICBleHBlY3QoY3VycmVudERlY2lzaW9uVGV4dFswXS5jbGFzc0xpc3QuY29udGFpbnMoYWN0aW9uTWVzc2FnZU5hbWUpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEN1cnJlbnREZWNpc2lvbkFjdGlvbk9uTWVudSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0aGUgYWN0aW9uIGZvciB0aGUgY3VycmVudCBkZWNpc2lvbiBpZiBpdCBpcyBpbiB0aGUgbWVudScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgJ2dldERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuRGVsZWdhdGVkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uQWN0aW9uT25NZW51KCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0aW9uLnN0YXR1cykudG9CZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBub3QgY3VycmVudCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjdHJsLmdldEN1cnJlbnREZWNpc2lvbkFjdGlvbk9uTWVudSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdGlvbikudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgY3VycmVudCBkZWNpc2lvbiBpcyBub3Qgb24gdGhlIG1lbnUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gY3RybC5nZXRDdXJyZW50RGVjaXNpb25BY3Rpb25Pbk1lbnUoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb24pLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuRWRpdERlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBlZGl0YWJsZSBhbmQgdGhlcmUgaXMgYW4gZXhpc3RpbmcgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0VmlvbGF0aW9uLmVkaXRhYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgbGV0IGVkaXRhYmxlID0gY3RybC5jYW5FZGl0RGVjaXNpb24oKTtcbiAgICAgICAgICAgIGV4cGVjdChlZGl0YWJsZSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IGVkaXRhYmxlIGFuZCB0aGVyZSBpcyBhbiBleGlzdGluZyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZWRpdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgbGV0IGVkaXRhYmxlID0gY3RybC5jYW5FZGl0RGVjaXNpb24oKTtcbiAgICAgICAgICAgIGV4cGVjdChlZGl0YWJsZSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZWRpdGFibGUgYW5kIHRoZXJlIGlzIHBlbmRpbmcgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VycmVudERlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5EZWxlZ2F0ZWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgJ2dldERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKGN1cnJlbnREZWNpc2lvbik7XG5cbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZWRpdGFibGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgZWRpdGFibGUgPSBjdHJsLmNhbkVkaXREZWNpc2lvbigpO1xuICAgICAgICAgICAgZXhwZWN0KGVkaXRhYmxlKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgZWRpdGFibGUgYW5kIHRoZXJlIGlzIGEgcGVuZGluZyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50RGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoY3VycmVudERlY2lzaW9uKTtcblxuICAgICAgICAgICAgdGVzdFZpb2xhdGlvbi5lZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsZXQgZWRpdGFibGUgPSBjdHJsLmNhbkVkaXREZWNpc2lvbigpO1xuICAgICAgICAgICAgZXhwZWN0KGVkaXRhYmxlKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuVmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGVkaXRhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdFZpb2xhdGlvbi5lZGl0YWJsZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGxldCBlZGl0YWJsZSA9IGN0cmwuY2FuVmlld0RlY2lzaW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoZWRpdGFibGUpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5vdCBlZGl0YWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RWaW9sYXRpb24uZWRpdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgbGV0IGVkaXRhYmxlID0gY3RybC5jYW5WaWV3RGVjaXNpb24oKTtcbiAgICAgICAgICAgIGV4cGVjdChlZGl0YWJsZSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNFZGl0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBkZWNpc2lvbiBpcyBlZGl0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdnZXREZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgZWRpdGVkOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGVkaXRlZCA9IGN0cmwuaXNFZGl0ZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlZGl0ZWQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gZGVjaXNpb24gaXMgbm90IGVkaXRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZSwgJ2dldERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGVkaXRlZCA9IGN0cmwuaXNFZGl0ZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlZGl0ZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdlZGl0RGVjaXNpb24gY2FsbHMgdGhyb3VnaCB0byBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UgZWRpdERlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VmlvbGF0aW9uLmVkaXRhYmxlID0gdHJ1ZTtcblxuICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2UsICdlZGl0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoeyBjYXRjaDogKCkgPT4ge319KTtcbiAgICAgICAgY3RybC5lZGl0RGVjaXNpb24oKTtcbiAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2VydmljZS5lZGl0RGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRlc3RWaW9sYXRpb24sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCd2aWV3RGVjaXNpb24gY2FsbHMgdGhyb3VnaCB0byBwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Ugdmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VmlvbGF0aW9uLmVkaXRhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGVjaXNpb25TZXJ2aWNlLCAndmlld0RlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHsgY2F0Y2g6ICgpID0+IHt9fSk7XG4gICAgICAgIGN0cmwudmlld0RlY2lzaW9uKCk7XG4gICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EZWNpc2lvblNlcnZpY2Uudmlld0RlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0ZXN0VmlvbGF0aW9uKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
