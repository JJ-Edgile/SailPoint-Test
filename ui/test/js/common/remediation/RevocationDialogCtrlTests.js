System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', './RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RevocationDialogCtrl', function () {
                var $controller = undefined,
                    $uibModalInstance = undefined,
                    adviceResult = undefined,
                    RevocationRecipientStepHandler = undefined,
                    RemediationAdviceResult = undefined,
                    RoleSoDRevocationStepHandler = undefined,
                    EntitlementSoDRevocationStepHandler = undefined,
                    $scope = undefined,
                    $q = undefined,
                    remediationTestData = undefined,
                    RevocationModificationStepHandler = undefined,
                    RoleRevocationDetailsStepHandler = undefined,
                    PolicyTreeNode = undefined,
                    RemediationDialogContext = undefined;

                beforeEach(module(remediationModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function (_$controller_, _remediationTestData_, _RemediationAdviceResult_, _RevocationRecipientStepHandler_, _RoleSoDRevocationStepHandler_, _EntitlementSoDRevocationStepHandler_, _$rootScope_, _$q_, _RevocationModificationStepHandler_, _RoleRevocationDetailsStepHandler_, _PolicyTreeNode_, _RemediationDialogContext_) {
                    $controller = _$controller_;
                    remediationTestData = _remediationTestData_;
                    RemediationAdviceResult = _RemediationAdviceResult_;
                    RevocationRecipientStepHandler = _RevocationRecipientStepHandler_;
                    RoleSoDRevocationStepHandler = _RoleSoDRevocationStepHandler_;
                    EntitlementSoDRevocationStepHandler = _EntitlementSoDRevocationStepHandler_;
                    RoleRevocationDetailsStepHandler = _RoleRevocationDetailsStepHandler_;
                    PolicyTreeNode = _PolicyTreeNode_;
                    adviceResult = new RemediationAdviceResult(remediationTestData.REMEDIATION_ADVICE_RESULT);
                    $uibModalInstance = {
                        setTitle: angular.noop
                    };
                    $scope = _$rootScope_;
                    $q = _$q_;
                    RevocationModificationStepHandler = _RevocationModificationStepHandler_;
                    RemediationDialogContext = _RemediationDialogContext_;
                }));

                function makeController(advice, summary, dialogContextData) {
                    var dialogContext = new RemediationDialogContext(dialogContextData || {});

                    return $controller('RevocationDialogCtrl', {
                        dialogContext: dialogContext,
                        remediationAdvice: advice,
                        remediationSummary: summary,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                describe('createStepHandlers()', function () {
                    it('returns RevocationRecipientStepHandler if only summary', function () {
                        var ctrl = undefined,
                            stepHandlers = undefined;

                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.summary, 'isModifiable').and.returnValue(false);
                        ctrl = makeController(adviceResult.advice, adviceResult.summary);
                        stepHandlers = ctrl.createStepHandlers();

                        expect(stepHandlers.length).toEqual(1);
                        expect(stepHandlers[0] instanceof RevocationRecipientStepHandler).toEqual(true);
                    });

                    it('initializes RevocationRecipientStepHandler with recipient and comments from existing decision', function () {
                        var existingResult = {
                            comments: 'asdfasfas',
                            recipient: 'person',
                            recipientSummary: {
                                id: 'person'
                            }
                        },
                            ctrl = undefined,
                            stepHandlers = undefined;
                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.summary, 'isModifiable').and.returnValue(false);
                        ctrl = makeController(adviceResult.advice, adviceResult.summary, {
                            existingResult: existingResult
                        });
                        stepHandlers = ctrl.createStepHandlers();
                        expect(stepHandlers[0].recipient).toEqual(existingResult.recipientSummary);
                        expect(stepHandlers[0].comments).toEqual(existingResult.comments);
                    });

                    it('returns RoleSoDRevocationStepHandler if required', function () {
                        var ctrl = undefined,
                            stepHandlers = undefined;

                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(true);
                        ctrl = makeController(adviceResult.advice, undefined);
                        stepHandlers = ctrl.createStepHandlers();

                        expect(stepHandlers.length).toEqual(1);
                        expect(stepHandlers[0] instanceof RoleSoDRevocationStepHandler).toEqual(true);
                    });

                    it('initialized RoleSODRevocationStepHandler with revokedRoles if existing decision', function () {
                        var existingResult = {
                            revokedRoles: ['right1Name']
                        },
                            ctrl = undefined,
                            stepHandlers = undefined;

                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(true);
                        ctrl = makeController(adviceResult.advice, undefined, {
                            existingResult: existingResult
                        });
                        stepHandlers = ctrl.createStepHandlers();
                        expect(stepHandlers[0].isSelected(adviceResult.advice.rightRoles[0])).toEqual(true);
                    });

                    function setupAdviceResult() {
                        var adviceResultData = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT);
                        adviceResultData.advice = angular.copy(adviceResultData.advice);
                        adviceResultData.advice.leftRoles = null;
                        adviceResultData.advice.rightRoles = null;
                        adviceResultData.advice.entitlementsToRemediate = remediationTestData.POLICY_TREE_NODE;
                        adviceResult = new RemediationAdviceResult(adviceResultData);
                        return adviceResult;
                    }

                    it('returns EntitlementSoDRevocationStepHandler if required', function () {
                        var adviceResult = setupAdviceResult(),
                            ctrl = makeController(adviceResult.advice, undefined),
                            stepHandlers = ctrl.createStepHandlers();

                        expect(stepHandlers.length).toEqual(1);
                        expect(stepHandlers[0] instanceof EntitlementSoDRevocationStepHandler).toEqual(true);
                    });

                    it('initializes EntitlementSoDRevocationStepHandler with selectedViolationEntitlements if existing decision', function () {
                        var adviceResult = setupAdviceResult(),
                            existingResult = {
                            selectedViolationEntitlements: [new PolicyTreeNode(remediationTestData.POLICY_TREE_NODE.children[0])]
                        },
                            ctrl = makeController(adviceResult.advice, undefined, {
                            existingResult: existingResult
                        }),
                            stepHandlers = ctrl.createStepHandlers();
                        expect(stepHandlers[0].policyTree.children[0].selected).toEqual(true);
                        expect(stepHandlers[0].policyTree.children[1].selected).toEqual(false);
                    });

                    it('returns RevocationModificationStepHandler if required', function () {
                        var ctrl = undefined,
                            stepHandlers = undefined;

                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.advice, 'isEntitlementSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.summary, 'requiresRecipientSelection').and.returnValue(false);
                        spyOn(adviceResult.summary, 'isModifiable').and.returnValue(true);
                        ctrl = makeController(adviceResult.advice, adviceResult.summary);
                        stepHandlers = ctrl.createStepHandlers();

                        expect(stepHandlers.length).toEqual(1);
                        expect(stepHandlers[0] instanceof RevocationModificationStepHandler).toEqual(true);
                    });

                    it('initializes RevocationModificationStepHandler with existing remediation details if existing decision' + 'specified', function () {
                        var existingResult = {
                            remediationDetails: angular.copy(adviceResult.summary.remediationDetails)
                        },
                            ctrl = undefined,
                            stepHandlers = undefined,
                            newValue = 'asdfasdfasdfasdfasdf';
                        existingResult.remediationDetails[0].newValue = newValue;
                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.advice, 'isEntitlementSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.summary, 'requiresRecipientSelection').and.returnValue(false);
                        spyOn(adviceResult.summary, 'isModifiable').and.returnValue(true);
                        ctrl = makeController(adviceResult.advice, adviceResult.summary, {
                            existingResult: existingResult
                        });
                        stepHandlers = ctrl.createStepHandlers();
                        expect(stepHandlers[0].lineItemGroups[0].items[0].newValue).toEqual(newValue);
                    });

                    it('returns RoleRevocationDetailsStepHandler if required', function () {
                        var ctrl = undefined,
                            stepHandlers = undefined;

                        spyOn(adviceResult.advice, 'isRoleSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.advice, 'isEntitlementSoDViolation').and.returnValue(false);
                        spyOn(adviceResult.summary, 'requiresRecipientSelection').and.returnValue(false);
                        spyOn(adviceResult.summary, 'isModifiable').and.returnValue(false);
                        spyOn(adviceResult.summary, 'hasRoleRevocationDetails').and.returnValue(true);
                        ctrl = makeController(adviceResult.advice, adviceResult.summary);
                        stepHandlers = ctrl.createStepHandlers();

                        expect(stepHandlers.length).toEqual(1);
                        expect(stepHandlers[0] instanceof RoleRevocationDetailsStepHandler).toEqual(true);
                    });
                });

                describe('refreshStepHandlers()', function () {
                    it('resolves to nothing if not on role sod step', function () {
                        var ctrl = makeController(adviceResult.advice, adviceResult.summary),
                            promiseResult = undefined;
                        spyOn(ctrl, 'isRoleSoDStep').and.returnValue(false);
                        ctrl.refreshStepHandlers().then(function (result) {
                            promiseResult = result;
                        });
                        $scope.$apply();
                        expect(promiseResult).not.toBeDefined();
                    });

                    describe('Role SoD step', function () {
                        var stepResult = {
                            revokedRoles: ['role1']
                        },
                            requiresRecipientSelection = undefined,
                            isModifiable = undefined,
                            ctrl = undefined;

                        function getRefreshResult() {
                            var promiseResult = undefined;
                            ctrl.refreshStepHandlers().then(function (result) {
                                promiseResult = result;
                            });
                            $scope.$apply();
                            expect(ctrl.dialogContext.getRemediationSummary).toHaveBeenCalledWith(stepResult.revokedRoles, undefined);
                            return promiseResult;
                        }

                        beforeEach(function () {
                            ctrl = makeController(adviceResult.advice, undefined);
                            spyOn(ctrl, 'isRoleSoDStep').and.returnValue(true);
                            spyOn(ctrl.dialogContext, 'getRemediationSummary').and.returnValue($q.when({
                                requiresRecipientSelection: function () {
                                    return !!requiresRecipientSelection;
                                },
                                isModifiable: function () {
                                    return !!isModifiable;
                                },
                                hasRoleRevocationDetails: function () {
                                    return false;
                                },
                                remediationDetails: [{}, {}]
                            }));
                            ctrl.stepResults[ctrl.getCurrentStep().getStepId()] = stepResult;
                            $scope.$apply();
                        });

                        it('calls through to getRemediationSummary and resolves with same steps if no ' + 'recipient selection or revocation is needed', function () {
                            var stepsLength = ctrl.steps.length,
                                promiseResult = undefined;

                            requiresRecipientSelection = false;
                            isModifiable = false;
                            promiseResult = getRefreshResult();
                            expect(promiseResult).toBeDefined();
                            expect(promiseResult.length).toEqual(stepsLength);
                        });

                        it('calls through to getRemediationSummary and resolves with additional steps if ' + 'recipient selection and/or revocation modification is needed', function () {
                            var stepsLength = ctrl.steps.length,
                                promiseResult = undefined;

                            requiresRecipientSelection = true;
                            isModifiable = true;
                            promiseResult = getRefreshResult();
                            expect(promiseResult).toBeDefined();
                            expect(promiseResult.length).toEqual(stepsLength + 2);
                            expect(promiseResult[promiseResult.length - 2] instanceof RevocationModificationStepHandler).toEqual(true);
                            expect(promiseResult[promiseResult.length - 1] instanceof RevocationRecipientStepHandler).toEqual(true);
                        });

                        it('does not set recipient from existing decision', function () {
                            ctrl.existingDecision = {
                                comments: 'asdfasfas',
                                recipient: 'person',
                                recipientSummary: {
                                    id: 'person'
                                }
                            };
                            requiresRecipientSelection = true;
                            isModifiable = false;
                            var promiseResult = getRefreshResult();
                            expect(promiseResult.length).toEqual(2);
                            expect(promiseResult[1].recipient).not.toBeDefined();
                        });
                    });
                });

                describe('formatStepResults()', function () {
                    it('merges stepResult properties into single result object', function () {
                        var stepResults = {
                            step1: {
                                prop1: 'a',
                                prop2: 'b'
                            },
                            step2: {
                                prop3: 'c'
                            }
                        },
                            ctrl = makeController(adviceResult.advice, adviceResult.summary),
                            formattedResults = undefined;
                        ctrl.stepResults = stepResults;
                        formattedResults = ctrl.formatStepResults();
                        expect(formattedResults).toBeDefined();
                        expect(formattedResults.prop1).toEqual(stepResults.step1.prop1);
                        expect(formattedResults.prop2).toEqual(stepResults.step1.prop2);
                        expect(formattedResults.prop3).toEqual(stepResults.step2.prop3);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9SZXZvY2F0aW9uRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsMEJBQTBCLFVBQVUsU0FBUzs7O0lBRzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsd0JBQXdCLFlBQU07Z0JBQ25DLElBQUksY0FBVztvQkFBRSxvQkFBaUI7b0JBQUUsZUFBWTtvQkFBRSxpQ0FBOEI7b0JBQUUsMEJBQXVCO29CQUNyRywrQkFBNEI7b0JBQUUsc0NBQW1DO29CQUFFLFNBQU07b0JBQ3pFLEtBQUU7b0JBQUUsc0JBQW1CO29CQUFFLG9DQUFpQztvQkFDMUQsbUNBQWdDO29CQUFFLGlCQUFjO29CQUFFLDJCQUF3Qjs7Z0JBRTlFLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxlQUFlLHVCQUF1QiwyQkFDdEMsa0NBQWtDLGdDQUNsQyx1Q0FBdUMsY0FBYyxNQUNyRCxxQ0FBcUMsb0NBQW9DLGtCQUN6RSw0QkFBK0I7b0JBQzlDLGNBQWM7b0JBQ2Qsc0JBQXNCO29CQUN0QiwwQkFBMEI7b0JBQzFCLGlDQUFpQztvQkFDakMsK0JBQStCO29CQUMvQixzQ0FBc0M7b0JBQ3RDLG1DQUFtQztvQkFDbkMsaUJBQWlCO29CQUNqQixlQUFlLElBQUksd0JBQXdCLG9CQUFvQjtvQkFDL0Qsb0JBQW9CO3dCQUNoQixVQUFVLFFBQVE7O29CQUV0QixTQUFTO29CQUNULEtBQUs7b0JBQ0wsb0NBQW9DO29CQUNwQywyQkFBMkI7OztnQkFHL0IsU0FBUyxlQUFlLFFBQVEsU0FBUyxtQkFBbUI7b0JBQ3hELElBQUksZ0JBQWdCLElBQUkseUJBQXlCLHFCQUFxQjs7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QUFPLGlCQUFpQixPQUFPLFFBQVEsWUFBWSxNQUFNO3dCQUN6RCxPQUFPLGlCQUFpQixPQUFPLFFBQVEsWUFBWSxNQUFNOzs7Ozs7R0EyQmxFIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9SZXZvY2F0aW9uRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4vUmVtZWRpYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdSZXZvY2F0aW9uRGlhbG9nQ3RybCcsICgpID0+IHtcbiAgICBsZXQgJGNvbnRyb2xsZXIsICR1aWJNb2RhbEluc3RhbmNlLCBhZHZpY2VSZXN1bHQsIFJldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlciwgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQsXG4gICAgICAgIFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIsIEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyLCAkc2NvcGUsXG4gICAgICAgICRxLCByZW1lZGlhdGlvblRlc3REYXRhLCBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIsXG4gICAgICAgIFJvbGVSZXZvY2F0aW9uRGV0YWlsc1N0ZXBIYW5kbGVyLCBQb2xpY3lUcmVlTm9kZSwgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVtZWRpYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEyICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29udHJvbGxlcl8sIF9yZW1lZGlhdGlvblRlc3REYXRhXywgX1JlbWVkaWF0aW9uQWR2aWNlUmVzdWx0XyxcbiAgICAgICAgICAgICAgICAgICAgICAgX1Jldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlcl8sIF9Sb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX0VudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXywgXyRyb290U2NvcGVfLCBfJHFfLFxuICAgICAgICAgICAgICAgICAgICAgICBfUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyXywgX1JvbGVSZXZvY2F0aW9uRGV0YWlsc1N0ZXBIYW5kbGVyXywgX1BvbGljeVRyZWVOb2RlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX1JlbWVkaWF0aW9uRGlhbG9nQ29udGV4dF8pID0+IHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICByZW1lZGlhdGlvblRlc3REYXRhID0gX3JlbWVkaWF0aW9uVGVzdERhdGFfO1xuICAgICAgICBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdCA9IF9SZW1lZGlhdGlvbkFkdmljZVJlc3VsdF87XG4gICAgICAgIFJldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlciA9IF9SZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXJfO1xuICAgICAgICBSb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyID0gX1JvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXJfO1xuICAgICAgICBFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlciA9IF9FbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlcl87XG4gICAgICAgIFJvbGVSZXZvY2F0aW9uRGV0YWlsc1N0ZXBIYW5kbGVyID0gX1JvbGVSZXZvY2F0aW9uRGV0YWlsc1N0ZXBIYW5kbGVyXztcbiAgICAgICAgUG9saWN5VHJlZU5vZGUgPSBfUG9saWN5VHJlZU5vZGVfO1xuICAgICAgICBhZHZpY2VSZXN1bHQgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxUKTtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBzZXRUaXRsZTogYW5ndWxhci5ub29wXG4gICAgICAgIH07XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIgPSBfUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyXztcbiAgICAgICAgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0ID0gX1JlbWVkaWF0aW9uRGlhbG9nQ29udGV4dF87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gbWFrZUNvbnRyb2xsZXIoYWR2aWNlLCBzdW1tYXJ5LCBkaWFsb2dDb250ZXh0RGF0YSkge1xuICAgICAgICBsZXQgZGlhbG9nQ29udGV4dCA9IG5ldyBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoZGlhbG9nQ29udGV4dERhdGEgfHwge30pO1xuXG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignUmV2b2NhdGlvbkRpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBkaWFsb2dDb250ZXh0OiBkaWFsb2dDb250ZXh0LFxuICAgICAgICAgICAgcmVtZWRpYXRpb25BZHZpY2U6IGFkdmljZSxcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uU3VtbWFyeTogc3VtbWFyeSxcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiAkdWliTW9kYWxJbnN0YW5jZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlU3RlcEhhbmRsZXJzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIFJldm9jYXRpb25SZWNpcGllbnRTdGVwSGFuZGxlciBpZiBvbmx5IHN1bW1hcnknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCwgc3RlcEhhbmRsZXJzO1xuXG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuYWR2aWNlLCAnaXNSb2xlU29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5zdW1tYXJ5LCAnaXNNb2RpZmlhYmxlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIGN0cmwgPSBtYWtlQ29udHJvbGxlcihhZHZpY2VSZXN1bHQuYWR2aWNlLCBhZHZpY2VSZXN1bHQuc3VtbWFyeSk7XG4gICAgICAgICAgICBzdGVwSGFuZGxlcnMgPSBjdHJsLmNyZWF0ZVN0ZXBIYW5kbGVycygpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXJzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlcnNbMF0gaW5zdGFuY2VvZiBSZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXIpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyBSZXZvY2F0aW9uUmVjaXBpZW50U3RlcEhhbmRsZXIgd2l0aCByZWNpcGllbnQgYW5kIGNvbW1lbnRzIGZyb20gZXhpc3RpbmcgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnYXNkZmFzZmFzJyxcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50OiAncGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50U3VtbWFyeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdwZXJzb24nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBjdHJsLCBzdGVwSGFuZGxlcnM7XG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuYWR2aWNlLCAnaXNSb2xlU29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5zdW1tYXJ5LCAnaXNNb2RpZmlhYmxlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIGN0cmwgPSBtYWtlQ29udHJvbGxlcihhZHZpY2VSZXN1bHQuYWR2aWNlLCBhZHZpY2VSZXN1bHQuc3VtbWFyeSwge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzdWx0OiBleGlzdGluZ1Jlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdGVwSGFuZGxlcnMgPSBjdHJsLmNyZWF0ZVN0ZXBIYW5kbGVycygpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyc1swXS5yZWNpcGllbnQpLnRvRXF1YWwoZXhpc3RpbmdSZXN1bHQucmVjaXBpZW50U3VtbWFyeSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXJzWzBdLmNvbW1lbnRzKS50b0VxdWFsKGV4aXN0aW5nUmVzdWx0LmNvbW1lbnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlciBpZiByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsLCBzdGVwSGFuZGxlcnM7XG5cbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5hZHZpY2UsICdpc1JvbGVTb0RWaW9sYXRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVycyA9IGN0cmwuY3JlYXRlU3RlcEhhbmRsZXJzKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlcnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyc1swXSBpbnN0YW5jZW9mIFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbml0aWFsaXplZCBSb2xlU09EUmV2b2NhdGlvblN0ZXBIYW5kbGVyIHdpdGggcmV2b2tlZFJvbGVzIGlmIGV4aXN0aW5nIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHJldm9rZWRSb2xlczogWydyaWdodDFOYW1lJ11cbiAgICAgICAgICAgIH0sIGN0cmwsIHN0ZXBIYW5kbGVycztcblxuICAgICAgICAgICAgc3B5T24oYWR2aWNlUmVzdWx0LmFkdmljZSwgJ2lzUm9sZVNvRFZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGN0cmwgPSBtYWtlQ29udHJvbGxlcihhZHZpY2VSZXN1bHQuYWR2aWNlLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1Jlc3VsdDogZXhpc3RpbmdSZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlcnNbMF0uaXNTZWxlY3RlZChhZHZpY2VSZXN1bHQuYWR2aWNlLnJpZ2h0Um9sZXNbMF0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cEFkdmljZVJlc3VsdCgpIHtcbiAgICAgICAgICAgIGxldCBhZHZpY2VSZXN1bHREYXRhID0gYW5ndWxhci5jb3B5KHJlbWVkaWF0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVCk7XG4gICAgICAgICAgICBhZHZpY2VSZXN1bHREYXRhLmFkdmljZSA9IGFuZ3VsYXIuY29weShhZHZpY2VSZXN1bHREYXRhLmFkdmljZSk7XG4gICAgICAgICAgICBhZHZpY2VSZXN1bHREYXRhLmFkdmljZS5sZWZ0Um9sZXMgPSBudWxsO1xuICAgICAgICAgICAgYWR2aWNlUmVzdWx0RGF0YS5hZHZpY2UucmlnaHRSb2xlcyA9IG51bGw7XG4gICAgICAgICAgICBhZHZpY2VSZXN1bHREYXRhLmFkdmljZS5lbnRpdGxlbWVudHNUb1JlbWVkaWF0ZSA9IHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERTtcbiAgICAgICAgICAgIGFkdmljZVJlc3VsdCA9IG5ldyBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdChhZHZpY2VSZXN1bHREYXRhKTtcbiAgICAgICAgICAgIHJldHVybiBhZHZpY2VSZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgncmV0dXJucyBFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlciBpZiByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZHZpY2VSZXN1bHQgPSBzZXR1cEFkdmljZVJlc3VsdCgpLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBtYWtlQ29udHJvbGxlcihhZHZpY2VSZXN1bHQuYWR2aWNlLCB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHN0ZXBIYW5kbGVycyA9IGN0cmwuY3JlYXRlU3RlcEhhbmRsZXJzKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlcnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyc1swXSBpbnN0YW5jZW9mIEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgRW50aXRsZW1lbnRTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIgd2l0aCBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyBpZiBleGlzdGluZyBkZWNpc2lvbicsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFkdmljZVJlc3VsdCA9IHNldHVwQWR2aWNlUmVzdWx0KCksXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUG9saWN5VHJlZU5vZGUocmVtZWRpYXRpb25UZXN0RGF0YS5QT0xJQ1lfVFJFRV9OT0RFLmNoaWxkcmVuWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1Jlc3VsdDogZXhpc3RpbmdSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBIYW5kbGVycyA9IGN0cmwuY3JlYXRlU3RlcEhhbmRsZXJzKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyc1swXS5wb2xpY3lUcmVlLmNoaWxkcmVuWzBdLnNlbGVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlcnNbMF0ucG9saWN5VHJlZS5jaGlsZHJlblsxXS5zZWxlY3RlZCkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBSZXZvY2F0aW9uTW9kaWZpY2F0aW9uU3RlcEhhbmRsZXIgaWYgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCwgc3RlcEhhbmRsZXJzO1xuXG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuYWR2aWNlLCAnaXNSb2xlU29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5hZHZpY2UsICdpc0VudGl0bGVtZW50U29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5zdW1tYXJ5LCAncmVxdWlyZXNSZWNpcGllbnRTZWxlY3Rpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24oYWR2aWNlUmVzdWx0LnN1bW1hcnksICdpc01vZGlmaWFibGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgYWR2aWNlUmVzdWx0LnN1bW1hcnkpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXJzWzBdIGluc3RhbmNlb2YgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyIHdpdGggZXhpc3RpbmcgcmVtZWRpYXRpb24gZGV0YWlscyBpZiBleGlzdGluZyBkZWNpc2lvbicgK1xuICAgICAgICAgICAgJ3NwZWNpZmllZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBleGlzdGluZ1Jlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkRldGFpbHM6IGFuZ3VsYXIuY29weShhZHZpY2VSZXN1bHQuc3VtbWFyeS5yZW1lZGlhdGlvbkRldGFpbHMpXG4gICAgICAgICAgICB9LCBjdHJsLCBzdGVwSGFuZGxlcnMsIG5ld1ZhbHVlID0gJ2FzZGZhc2RmYXNkZmFzZGZhc2RmJztcbiAgICAgICAgICAgIGV4aXN0aW5nUmVzdWx0LnJlbWVkaWF0aW9uRGV0YWlsc1swXS5uZXdWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgc3B5T24oYWR2aWNlUmVzdWx0LmFkdmljZSwgJ2lzUm9sZVNvRFZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuYWR2aWNlLCAnaXNFbnRpdGxlbWVudFNvRFZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuc3VtbWFyeSwgJ3JlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5zdW1tYXJ5LCAnaXNNb2RpZmlhYmxlJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgY3RybCA9IG1ha2VDb250cm9sbGVyKGFkdmljZVJlc3VsdC5hZHZpY2UsIGFkdmljZVJlc3VsdC5zdW1tYXJ5LCB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdSZXN1bHQ6IGV4aXN0aW5nUmVzdWx0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVycyA9IGN0cmwuY3JlYXRlU3RlcEhhbmRsZXJzKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXJzWzBdLmxpbmVJdGVtR3JvdXBzWzBdLml0ZW1zWzBdLm5ld1ZhbHVlKS50b0VxdWFsKG5ld1ZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgUm9sZVJldm9jYXRpb25EZXRhaWxzU3RlcEhhbmRsZXIgaWYgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCwgc3RlcEhhbmRsZXJzO1xuXG4gICAgICAgICAgICBzcHlPbihhZHZpY2VSZXN1bHQuYWR2aWNlLCAnaXNSb2xlU29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5hZHZpY2UsICdpc0VudGl0bGVtZW50U29EVmlvbGF0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGFkdmljZVJlc3VsdC5zdW1tYXJ5LCAncmVxdWlyZXNSZWNpcGllbnRTZWxlY3Rpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24oYWR2aWNlUmVzdWx0LnN1bW1hcnksICdpc01vZGlmaWFibGUnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24oYWR2aWNlUmVzdWx0LnN1bW1hcnksICdoYXNSb2xlUmV2b2NhdGlvbkRldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgYWR2aWNlUmVzdWx0LnN1bW1hcnkpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXJzWzBdIGluc3RhbmNlb2YgUm9sZVJldm9jYXRpb25EZXRhaWxzU3RlcEhhbmRsZXIpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlZnJlc2hTdGVwSGFuZGxlcnMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Jlc29sdmVzIHRvIG5vdGhpbmcgaWYgbm90IG9uIHJvbGUgc29kIHN0ZXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IG1ha2VDb250cm9sbGVyKGFkdmljZVJlc3VsdC5hZHZpY2UsIGFkdmljZVJlc3VsdC5zdW1tYXJ5KSxcbiAgICAgICAgICAgICAgICBwcm9taXNlUmVzdWx0O1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzUm9sZVNvRFN0ZXAnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgY3RybC5yZWZyZXNoU3RlcEhhbmRsZXJzKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZVJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZXN1bHQpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnUm9sZSBTb0Qgc3RlcCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICByZXZva2VkUm9sZXM6IFsncm9sZTEnXVxuICAgICAgICAgICAgICAgIH0sIHJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgIGlzTW9kaWZpYWJsZSxcbiAgICAgICAgICAgICAgICBjdHJsO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSZWZyZXNoUmVzdWx0KCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlUmVzdWx0O1xuICAgICAgICAgICAgICAgIGN0cmwucmVmcmVzaFN0ZXBIYW5kbGVycygpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5kaWFsb2dDb250ZXh0LmdldFJlbWVkaWF0aW9uU3VtbWFyeSlcbiAgICAgICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHN0ZXBSZXN1bHQucmV2b2tlZFJvbGVzLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNSb2xlU29EU3RlcCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLmRpYWxvZ0NvbnRleHQsICdnZXRSZW1lZGlhdGlvblN1bW1hcnknKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uOiAoKSA9PiB7IHJldHVybiAhIXJlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uOyB9LFxuICAgICAgICAgICAgICAgICAgICBpc01vZGlmaWFibGU6ICgpID0+IHsgcmV0dXJuICEhaXNNb2RpZmlhYmxlOyB9LFxuICAgICAgICAgICAgICAgICAgICBoYXNSb2xlUmV2b2NhdGlvbkRldGFpbHM6ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkRldGFpbHM6IFt7fSx7fV1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgY3RybC5zdGVwUmVzdWx0c1tjdHJsLmdldEN1cnJlbnRTdGVwKCkuZ2V0U3RlcElkKCldID0gc3RlcFJlc3VsdDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gZ2V0UmVtZWRpYXRpb25TdW1tYXJ5IGFuZCByZXNvbHZlcyB3aXRoIHNhbWUgc3RlcHMgaWYgbm8gJyArXG4gICAgICAgICAgICAgICAgJ3JlY2lwaWVudCBzZWxlY3Rpb24gb3IgcmV2b2NhdGlvbiBpcyBuZWVkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ZXBzTGVuZ3RoID0gY3RybC5zdGVwcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VSZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICByZXF1aXJlc1JlY2lwaWVudFNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlzTW9kaWZpYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHByb21pc2VSZXN1bHQgPSBnZXRSZWZyZXNoUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZXN1bHQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZXN1bHQubGVuZ3RoKS50b0VxdWFsKHN0ZXBzTGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBnZXRSZW1lZGlhdGlvblN1bW1hcnkgYW5kIHJlc29sdmVzIHdpdGggYWRkaXRpb25hbCBzdGVwcyBpZiAnICtcbiAgICAgICAgICAgICAgICAncmVjaXBpZW50IHNlbGVjdGlvbiBhbmQvb3IgcmV2b2NhdGlvbiBtb2RpZmljYXRpb24gaXMgbmVlZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdGVwc0xlbmd0aCA9IGN0cmwuc3RlcHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgcmVxdWlyZXNSZWNpcGllbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlzTW9kaWZpYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJvbWlzZVJlc3VsdCA9IGdldFJlZnJlc2hSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVJlc3VsdCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoc3RlcHNMZW5ndGggKyAyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVJlc3VsdFtwcm9taXNlUmVzdWx0Lmxlbmd0aCAtIDJdIGluc3RhbmNlb2YgUmV2b2NhdGlvbk1vZGlmaWNhdGlvblN0ZXBIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVJlc3VsdFtwcm9taXNlUmVzdWx0Lmxlbmd0aCAtIDFdIGluc3RhbmNlb2YgUmV2b2NhdGlvblJlY2lwaWVudFN0ZXBIYW5kbGVyKVxuICAgICAgICAgICAgICAgICAgICAudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3Qgc2V0IHJlY2lwaWVudCBmcm9tIGV4aXN0aW5nIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN0cmwuZXhpc3RpbmdEZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6ICdhc2RmYXNmYXMnLFxuICAgICAgICAgICAgICAgICAgICByZWNpcGllbnQ6ICdwZXJzb24nLFxuICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRTdW1tYXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3BlcnNvbidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxdWlyZXNSZWNpcGllbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlzTW9kaWZpYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlUmVzdWx0ID0gZ2V0UmVmcmVzaFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwcm9taXNlUmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocHJvbWlzZVJlc3VsdFsxXS5yZWNpcGllbnQpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Zvcm1hdFN0ZXBSZXN1bHRzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdtZXJnZXMgc3RlcFJlc3VsdCBwcm9wZXJ0aWVzIGludG8gc2luZ2xlIHJlc3VsdCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcFJlc3VsdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXAxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wMTogJ2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDI6ICdiJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwMjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDM6ICdjJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjdHJsID0gbWFrZUNvbnRyb2xsZXIoYWR2aWNlUmVzdWx0LmFkdmljZSwgYWR2aWNlUmVzdWx0LnN1bW1hcnkpLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHM7XG4gICAgICAgICAgICBjdHJsLnN0ZXBSZXN1bHRzID0gc3RlcFJlc3VsdHM7XG4gICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzID0gY3RybC5mb3JtYXRTdGVwUmVzdWx0cygpO1xuICAgICAgICAgICAgZXhwZWN0KGZvcm1hdHRlZFJlc3VsdHMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZm9ybWF0dGVkUmVzdWx0cy5wcm9wMSkudG9FcXVhbChzdGVwUmVzdWx0cy5zdGVwMS5wcm9wMSk7XG4gICAgICAgICAgICBleHBlY3QoZm9ybWF0dGVkUmVzdWx0cy5wcm9wMikudG9FcXVhbChzdGVwUmVzdWx0cy5zdGVwMS5wcm9wMik7XG4gICAgICAgICAgICBleHBlY3QoZm9ybWF0dGVkUmVzdWx0cy5wcm9wMykudG9FcXVhbChzdGVwUmVzdWx0cy5zdGVwMi5wcm9wMyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
