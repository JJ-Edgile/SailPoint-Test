System.register(['common/widget/WizardDialogCtrl', 'common/widget/WidgetModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var WizardDialogCtrl, widgetModule, testModule;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_commonWidgetWizardDialogCtrl) {
            WizardDialogCtrl = _commonWidgetWizardDialogCtrl['default'];
        }, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('WizardDialogCtrl', function () {

                var $controller, $rootScope, step1, step2, step3, result1, ctrl, $uibModalInstance, testService;

                ////////////////////////////////////////////////////////////////////////////
                //
                // DEFINE A WIZARD SUB-CLASS CONTROLLER TO TEST WITH
                //
                ////////////////////////////////////////////////////////////////////////////

                var TestWizardDialogCtrl = (function (_WizardDialogCtrl) {
                    TestWizardDialogCtrl.$inject = ["$uibModalInstance", "$q"];
                    _inherits(TestWizardDialogCtrl, _WizardDialogCtrl);

                    function TestWizardDialogCtrl($uibModalInstance, $q) {
                        _classCallCheck(this, TestWizardDialogCtrl);

                        _get(Object.getPrototypeOf(TestWizardDialogCtrl.prototype), 'constructor', this).call(this, $uibModalInstance);

                        result1 = 'result1';

                        step1 = {
                            getTitle: function () {
                                return 'Step 1';
                            },
                            getStepId: function () {
                                return 'step1';
                            },
                            isSaveDisabled: function () {
                                return false;
                            },
                            getSaveButtonLabel: function (isLastStep) {
                                return 'Go to next step';
                            },
                            save: function () {
                                var deferred = $q.defer();
                                deferred.resolve(result1);
                                return deferred.promise;
                            }
                        };

                        step2 = {
                            getTitle: function () {
                                return 'Step 2';
                            },
                            getStepId: function () {
                                return 'step2';
                            },
                            isSaveDisabled: function () {
                                return false;
                            },
                            getSaveButtonLabel: function (isLastStep) {
                                return 'Go to Step 3';
                            },
                            save: function () {
                                var deferred = $q.defer();
                                deferred.resolve('result2');
                                return deferred.promise;
                            }
                        };

                        step3 = {
                            getTitle: function () {
                                return 'Step 3';
                            },
                            getStepId: function () {
                                return 'step3';
                            },
                            isSaveDisabled: function () {
                                return false;
                            },
                            getSaveButtonLabel: function (isLastStep) {
                                return 'DONESKI!';
                            },
                            save: function () {
                                var deferred = $q.defer();
                                deferred.resolve('result3');
                                return deferred.promise;
                            }
                        };

                        this.initialize();
                    }

                    // Register the controller so we can use it.

                    /**
                     * @return {Array<StepHandler>} The StepHandlers for the dialog.
                     */

                    _createClass(TestWizardDialogCtrl, [{
                        key: 'createStepHandlers',
                        value: function createStepHandlers() {
                            // Start with just step1.  Saving step1 will add two more steps.
                            return [step1];
                        }

                        /**
                         * @return {Promise<Array<StepHandler>>} The updated StepHandlers.
                         */
                    }, {
                        key: 'refreshStepHandlers',
                        value: function refreshStepHandlers() {
                            // Start with newSteps as null to test that steps are changed if
                            // null is returned.
                            var newSteps = null;

                            // If we are on step1, add the rest of the steps.
                            if (step1 === this.getCurrentStep()) {
                                newSteps = [step1, step2, step3];
                            }

                            return testService.createPromise(false, newSteps);
                        }
                    }]);

                    return TestWizardDialogCtrl;
                })(WizardDialogCtrl);

                angular.module(widgetModule).controller('TestWizardDialogCtrl', TestWizardDialogCtrl);

                ////////////////////////////////////////////////////////////////////////////
                //
                // TESTS
                //
                ////////////////////////////////////////////////////////////////////////////

                // Needed for testService
                beforeEach(module(testModule));

                beforeEach(module(widgetModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, _testService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;

                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy(),
                        setTitle: jasmine.createSpy()
                    };

                    ctrl = $controller('TestWizardDialogCtrl', {
                        $uibModalInstance: $uibModalInstance
                    });
                }));

                describe('constructor', function () {
                    it('requires a $uibModalInstance', function () {
                        // Test without a $uibModalInstance.
                        expect(function () {
                            $controller('TestWizardDialogCtrl', {});
                        }).toThrow();

                        // Test with a $uibModalInstance.
                        expect(ctrl).toBeDefined();
                        expect(ctrl.$uibModalInstance).toEqual($uibModalInstance);
                    });

                    it('starts on the first step', function () {
                        expect(ctrl.currentStepIdx).toEqual(0);
                    });

                    it('starts with empty results', function () {
                        expect(ctrl.stepResults).toBeDefined();
                        expect(Object.keys(ctrl.stepResults).length).toEqual(0);
                    });

                    it('creates the steps', function () {
                        expect(ctrl.steps.length).toEqual(1);
                        expect(ctrl.steps[0]).toEqual(step1);
                    });

                    it('sets the modal title to that of the first step', function () {
                        expect($uibModalInstance.setTitle).toHaveBeenCalledWith('Step 1');
                    });
                });

                it('returns the current step', function () {
                    expect(ctrl.getCurrentStep()).toEqual(step1);
                });

                describe('hasMoreSteps()', function () {
                    it('returns false if there are no more steps', function () {
                        expect(ctrl.hasMoreSteps()).toEqual(false);
                    });

                    it('returns true if there are more steps', function () {
                        ctrl.steps = [step1, step2];
                        expect(ctrl.hasMoreSteps()).toEqual(true);
                    });

                    it('returns false if there are multiple steps but we are on the last step', function () {
                        ctrl.steps = [step1, step2];
                        ctrl.currentStepIdx = 1;
                        expect(ctrl.hasMoreSteps()).toEqual(false);
                    });
                });

                describe('isShowPrevious()', function () {
                    it('returns false if on the first step', function () {
                        expect(ctrl.isShowPrevious()).toEqual(false);
                    });

                    it('returns true if not on the first step', function () {
                        ctrl.currentStepIdx = 1;
                        expect(ctrl.isShowPrevious()).toEqual(true);
                    });
                });

                describe('previous()', function () {
                    it('throws if on the first step', function () {
                        expect(function () {
                            ctrl.previous();
                        }).toThrow();
                    });

                    it('goes to the previous step', function () {
                        ctrl.currentStepIdx = 1;
                        ctrl.previous();
                        expect(ctrl.currentStepIdx).toEqual(0);
                    });

                    it('sets the modal title to that of the new step', function () {
                        // Advance to the second step.
                        ctrl.save();
                        $rootScope.$digest();

                        // Go back to the first step.
                        ctrl.previous();

                        // Check that the title was set 3 times (construction, next, prev) and
                        // that it matches the current step.
                        expect($uibModalInstance.setTitle.calls.count()).toEqual(3);
                        expect($uibModalInstance.setTitle.calls.mostRecent().args[0]).toEqual('Step 1');
                    });
                });

                it('isSaveDisabled() delegates to the current StepHandler', function () {
                    spyOn(step1, 'isSaveDisabled').and.callThrough();
                    spyOn(step2, 'isSaveDisabled').and.callThrough();

                    expect(ctrl.isSaveDisabled()).toEqual(false);
                    expect(step1.isSaveDisabled).toHaveBeenCalled();
                    expect(step2.isSaveDisabled).not.toHaveBeenCalled();

                    ctrl.save();
                    $rootScope.$digest();
                    expect(ctrl.isSaveDisabled()).toEqual(false);
                    expect(step1.isSaveDisabled.calls.count()).toEqual(1);
                    expect(step2.isSaveDisabled).toHaveBeenCalled();
                });

                describe('getSaveButtonLabel()', function () {
                    it('delegates to the current StepHandler', function () {
                        spyOn(step1, 'getSaveButtonLabel').and.callThrough();
                        spyOn(step2, 'getSaveButtonLabel').and.callThrough();
                        spyOn(step3, 'getSaveButtonLabel').and.callThrough();

                        // Check the first step.
                        expect(ctrl.getSaveButtonLabel()).toEqual('Go to next step');
                        expect(step1.getSaveButtonLabel).toHaveBeenCalledWith(true);
                        expect(step2.getSaveButtonLabel).not.toHaveBeenCalled();

                        // Check the second step.
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.getSaveButtonLabel()).toEqual('Go to Step 3');
                        expect(step1.getSaveButtonLabel.calls.count()).toEqual(1);
                        expect(step2.getSaveButtonLabel).toHaveBeenCalledWith(false);

                        // Check the last step.
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.getSaveButtonLabel()).toEqual('DONESKI!');
                        expect(step1.getSaveButtonLabel.calls.count()).toEqual(1);
                        expect(step3.getSaveButtonLabel).toHaveBeenCalledWith(true);
                    });
                });

                describe('save()', function () {
                    it('calls save on the current step', function () {
                        spyOn(step1, 'save').and.callThrough();
                        spyOn(step2, 'save').and.callThrough();

                        ctrl.save();
                        $rootScope.$digest();
                        expect(step1.save).toHaveBeenCalled();
                        expect(step2.save).not.toHaveBeenCalled();

                        ctrl.save();
                        $rootScope.$digest();
                        expect(step1.save.calls.count()).toEqual(1);
                        expect(step2.save).toHaveBeenCalled();
                    });

                    it('saves the step results', function () {
                        ctrl.save();
                        $rootScope.$digest();
                        expect(Object.keys(ctrl.stepResults).length).toEqual(1);
                        expect(ctrl.stepResults.step1).toEqual('result1');

                        ctrl.save();
                        $rootScope.$digest();
                        expect(Object.keys(ctrl.stepResults).length).toEqual(2);
                        expect(ctrl.stepResults.step1).toEqual('result1');
                        expect(ctrl.stepResults.step2).toEqual('result2');
                    });

                    it('overwrites previous step results when going back to a step and saving again', function () {
                        ctrl.save();
                        $rootScope.$digest();
                        expect(Object.keys(ctrl.stepResults).length).toEqual(1);
                        expect(ctrl.stepResults.step1).toEqual('result1');

                        // Go back to the first step.
                        ctrl.previous();

                        // Save again ... with a different result.
                        result1 = 'newResult!';
                        ctrl.save();
                        $rootScope.$digest();
                        expect(Object.keys(ctrl.stepResults).length).toEqual(1);
                        expect(ctrl.stepResults.step1).toEqual('newResult!');
                    });

                    it('sets new steps when refreshStepHandlers() returns values', function () {
                        // The controller is implemented to start with only step1, but add
                        // step2 and step3 upon saving step1.
                        expect(ctrl.steps.length).toEqual(1);

                        // Save and check that new steps were added.
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.steps.length).toEqual(3);
                    });

                    it('does not set new steps when refreshStepHandlers() returns null', function () {
                        var originalSteps;

                        // Move to step2, this should have 3 steps now.
                        ctrl.save();
                        $rootScope.$digest();

                        // Saving on step 2 returns null. Make sure the steps don't change.
                        originalSteps = ctrl.steps;
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.steps).toEqual(originalSteps);
                        expect(ctrl.steps.length).toEqual(3);
                    });

                    it('moves to the next step when there are more steps', function () {
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.getCurrentStep()).toEqual(step2);
                    });

                    function goToLastStep() {
                        // Save twice to get to the last step.
                        ctrl.save();
                        $rootScope.$digest();
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.getCurrentStep()).toEqual(step3);
                    }

                    function saveDialog() {
                        goToLastStep();
                        ctrl.save();
                        $rootScope.$digest();
                    }

                    it('does not move to the next step when saving fails', function () {
                        // Go to the last step.
                        goToLastStep();

                        // Save again.  Should still be on last step.
                        ctrl.save();
                        $rootScope.$digest();
                        expect(ctrl.getCurrentStep()).toEqual(step3);
                    });

                    it('closes the modal with the stepResults when there are no more steps', function () {
                        var results;

                        saveDialog();

                        expect($uibModalInstance.close).toHaveBeenCalled();
                        results = $uibModalInstance.close.calls.first().args[0];
                        expect(Object.keys(results).length).toEqual(3);
                        expect(results.step1).toEqual('result1');
                        expect(results.step2).toEqual('result2');
                        expect(results.step3).toEqual('result3');
                    });

                    it('sets the modal title to that of the new step', function () {
                        // Advance to the second step.
                        ctrl.save();
                        $rootScope.$digest();

                        // Check that the title was set 2 times (construction, next) and
                        // that it matches the current step.
                        expect($uibModalInstance.setTitle.calls.count()).toEqual(2);
                        expect($uibModalInstance.setTitle.calls.mostRecent().args[0]).toEqual('Step 2');
                    });

                    it('formats the step results if subclass returns a value', function () {
                        // Make the controller return formatted results;
                        var formattedResults = { step1: 'Malcolm blowers are NUMBER 1!!!' };
                        spyOn(ctrl, 'formatStepResults').and.returnValue(formattedResults);

                        saveDialog();
                        expect($uibModalInstance.close).toHaveBeenCalledWith(formattedResults);
                    });

                    it('returns raw step results if subclass returns null for formatStepResults()', function () {
                        saveDialog();
                        expect($uibModalInstance.close).toHaveBeenCalledWith(ctrl.stepResults);
                    });
                });

                it('cancel() dismisses the modal', function () {
                    ctrl.cancel();
                    expect($uibModalInstance.dismiss).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvV2l6YXJkRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLGtDQUFrQyw4QkFBOEIsdUJBQXVCLFVBQVUsU0FBUztJQUEzSDs7SUFHSSxJQUFJLGtCQUFrQixjQUFjOztJQUVwQyxJQUFJLGVBQWUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0lBRWppQixJQUFJLE9BQU8sU0FBUyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxTQUFTLE1BQU0sV0FBVyxPQUFPLFFBQVEsRUFBRSxJQUFJLFNBQVMsSUFBSSxXQUFXLEtBQUssV0FBVyxLQUFLLFNBQVMsT0FBTyxJQUFJLFdBQVcsTUFBTSxTQUFTLFNBQVMsV0FBVyxJQUFJLE9BQU8sT0FBTyx5QkFBeUIsUUFBUSxXQUFXLElBQUksU0FBUyxXQUFXLEVBQUUsSUFBSSxTQUFTLE9BQU8sZUFBZSxTQUFTLElBQUksV0FBVyxNQUFNLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxLQUFLLFFBQVEsTUFBTSxVQUFVLE1BQU0sVUFBVSxTQUFTLE1BQU0sT0FBTyxTQUFTLFdBQVcsU0FBUyxvQkFBb0IsSUFBSSxXQUFXLE1BQU0sRUFBRSxPQUFPLEtBQUssY0FBYyxFQUFFLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxXQUFXLFdB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LFFBQVE7d0JBQzlCLE9BQU8sUUFBUSxPQUFPLFFBQVE7d0JBQzlCLE9BQU8sUUFBUSxPQUFPLFFBQVE7OztvQkFHbEMsR0FBRyxnREFBZ0QsWUFBVzs7d0JBRTFELEtBQUs7d0JBQ0wsV0FBVzs7Ozt3QkFJWCxPQUFPLGtCQUFrQixTQUFTLE1BQU0sU0FBUyxRQUFRO3dCQUN6RCxPQUFPLGtCQUFrQixTQUFTLE1BQU0sYUFBYSxLQUFLLElBQUksUUFBUTs7O29CQUcxRSxHQUFHLHdEQUF3RCxZQUFXOzt3QkFFbEUsSUFBSSxtQkFBbUIsRUFBRSxPQUFPO3dCQUNoQyxNQUFNLE1BQU0scUJBQXFCLElBQUksWUFBWTs7d0JBRWpEO3dCQUNBLE9BQU8sa0JBQWtCLE9BQU8scUJBQXFCOzs7b0JBR3pELEdBQUcsNkVBQTZFLFlBQVc7d0JBQ3ZGO3dCQUNBLE9BQU8sa0JBQWtCLE9BQU8scUJBQXFCLEtBQUs7Ozs7Z0JBSWxFLEdBQUcsZ0NBQWdDLFlBQVc7b0JBQzFDLEtBQUs7b0JBQ0wsT0FBTyxrQkFBa0IsU0FBUzs7Ozs7R0FtQ3ZDIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvV2l6YXJkRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFdpemFyZERpYWxvZ0N0cmwgZnJvbSAnY29tbW9uL3dpZGdldC9XaXphcmREaWFsb2dDdHJsJztcclxuaW1wb3J0IHdpZGdldE1vZHVsZSBmcm9tICdjb21tb24vd2lkZ2V0L1dpZGdldE1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnV2l6YXJkRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgc3RlcDEsIHN0ZXAyLCBzdGVwMywgcmVzdWx0MSwgY3RybCwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlc3RTZXJ2aWNlO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vXHJcbiAgICAvLyBERUZJTkUgQSBXSVpBUkQgU1VCLUNMQVNTIENPTlRST0xMRVIgVE8gVEVTVCBXSVRIXHJcbiAgICAvL1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGNsYXNzIFRlc3RXaXphcmREaWFsb2dDdHJsIGV4dGVuZHMgV2l6YXJkRGlhbG9nQ3RybCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCR1aWJNb2RhbEluc3RhbmNlLCAkcSkge1xyXG4gICAgICAgICAgICBzdXBlcigkdWliTW9kYWxJbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQxID0gJ3Jlc3VsdDEnO1xyXG5cclxuICAgICAgICAgICAgc3RlcDEgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRUaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdTdGVwIDEnO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldFN0ZXBJZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdGVwMSc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaXNTYXZlRGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBnZXRTYXZlQnV0dG9uTGFiZWw6IGZ1bmN0aW9uKGlzTGFzdFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0dvIHRvIG5leHQgc3RlcCc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2F2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc3RlcDIgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRUaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdTdGVwIDInO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldFN0ZXBJZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdGVwMic7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaXNTYXZlRGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBnZXRTYXZlQnV0dG9uTGFiZWw6IGZ1bmN0aW9uKGlzTGFzdFN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0dvIHRvIFN0ZXAgMyc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2F2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCdyZXN1bHQyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzdGVwMyA9IHtcclxuICAgICAgICAgICAgICAgIGdldFRpdGxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1N0ZXAgMyc7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0U3RlcElkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3N0ZXAzJztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc1NhdmVEaXNhYmxlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGdldFNhdmVCdXR0b25MYWJlbDogZnVuY3Rpb24oaXNMYXN0U3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnRE9ORVNLSSEnO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgncmVzdWx0MycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxTdGVwSGFuZGxlcj59IFRoZSBTdGVwSGFuZGxlcnMgZm9yIHRoZSBkaWFsb2cuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlU3RlcEhhbmRsZXJzKCkge1xyXG4gICAgICAgICAgICAvLyBTdGFydCB3aXRoIGp1c3Qgc3RlcDEuICBTYXZpbmcgc3RlcDEgd2lsbCBhZGQgdHdvIG1vcmUgc3RlcHMuXHJcbiAgICAgICAgICAgIHJldHVybiBbIHN0ZXAxIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5PFN0ZXBIYW5kbGVyPj59IFRoZSB1cGRhdGVkIFN0ZXBIYW5kbGVycy5cclxuICAgICAgICAgKi9cclxuICAgICAgICByZWZyZXNoU3RlcEhhbmRsZXJzKCkge1xyXG4gICAgICAgICAgICAvLyBTdGFydCB3aXRoIG5ld1N0ZXBzIGFzIG51bGwgdG8gdGVzdCB0aGF0IHN0ZXBzIGFyZSBjaGFuZ2VkIGlmXHJcbiAgICAgICAgICAgIC8vIG51bGwgaXMgcmV0dXJuZWQuXHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwcyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgb24gc3RlcDEsIGFkZCB0aGUgcmVzdCBvZiB0aGUgc3RlcHMuXHJcbiAgICAgICAgICAgIGlmIChzdGVwMSA9PT0gdGhpcy5nZXRDdXJyZW50U3RlcCgpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwcyA9IFtzdGVwMSwgc3RlcDIsIHN0ZXAzXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIG5ld1N0ZXBzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVnaXN0ZXIgdGhlIGNvbnRyb2xsZXIgc28gd2UgY2FuIHVzZSBpdC5cclxuICAgIGFuZ3VsYXIubW9kdWxlKHdpZGdldE1vZHVsZSkuXHJcbiAgICAgICAgY29udHJvbGxlcignVGVzdFdpemFyZERpYWxvZ0N0cmwnLCBUZXN0V2l6YXJkRGlhbG9nQ3RybCk7XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vXHJcbiAgICAvLyBURVNUU1xyXG4gICAgLy9cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyBOZWVkZWQgZm9yIHRlc3RTZXJ2aWNlXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod2lkZ2V0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfdGVzdFNlcnZpY2VfKSB7XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG5cclxuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZSA9IHtcclxuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCksXHJcbiAgICAgICAgICAgIGRpc21pc3M6IGphc21pbmUuY3JlYXRlU3B5KCksXHJcbiAgICAgICAgICAgIHNldFRpdGxlOiBqYXNtaW5lLmNyZWF0ZVNweSgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdUZXN0V2l6YXJkRGlhbG9nQ3RybCcsIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXF1aXJlcyBhICR1aWJNb2RhbEluc3RhbmNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFRlc3Qgd2l0aG91dCBhICR1aWJNb2RhbEluc3RhbmNlLlxyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7ICRjb250cm9sbGVyKCdUZXN0V2l6YXJkRGlhbG9nQ3RybCcsIHt9KTsgfSkudG9UaHJvdygpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGVzdCB3aXRoIGEgJHVpYk1vZGFsSW5zdGFuY2UuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC4kdWliTW9kYWxJbnN0YW5jZSkudG9FcXVhbCgkdWliTW9kYWxJbnN0YW5jZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzdGFydHMgb24gdGhlIGZpcnN0IHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY3VycmVudFN0ZXBJZHgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzdGFydHMgd2l0aCBlbXB0eSByZXN1bHRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0ZXBSZXN1bHRzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMoY3RybC5zdGVwUmVzdWx0cykubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY3JlYXRlcyB0aGUgc3RlcHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwc1swXSkudG9FcXVhbChzdGVwMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSBtb2RhbCB0aXRsZSB0byB0aGF0IG9mIHRoZSBmaXJzdCBzdGVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5zZXRUaXRsZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ1N0ZXAgMScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIGN1cnJlbnQgc3RlcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmdldEN1cnJlbnRTdGVwKCkpLnRvRXF1YWwoc3RlcDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hhc01vcmVTdGVwcygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG5vIG1vcmUgc3RlcHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzTW9yZVN0ZXBzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBtb3JlIHN0ZXBzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc3RlcHMgPSBbIHN0ZXAxLCBzdGVwMiBdO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNNb3JlU3RlcHMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG11bHRpcGxlIHN0ZXBzIGJ1dCB3ZSBhcmUgb24gdGhlIGxhc3Qgc3RlcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnN0ZXBzID0gWyBzdGVwMSwgc3RlcDIgXTtcclxuICAgICAgICAgICAgY3RybC5jdXJyZW50U3RlcElkeCA9IDE7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc01vcmVTdGVwcygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1Nob3dQcmV2aW91cygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgb24gdGhlIGZpcnN0IHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTaG93UHJldmlvdXMoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbm90IG9uIHRoZSBmaXJzdCBzdGVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuY3VycmVudFN0ZXBJZHggPSAxO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1Nob3dQcmV2aW91cygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3ByZXZpb3VzKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgndGhyb3dzIGlmIG9uIHRoZSBmaXJzdCBzdGVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC5wcmV2aW91cygpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdnb2VzIHRvIHRoZSBwcmV2aW91cyBzdGVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuY3VycmVudFN0ZXBJZHggPSAxO1xyXG4gICAgICAgICAgICBjdHJsLnByZXZpb3VzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmN1cnJlbnRTdGVwSWR4KS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgbW9kYWwgdGl0bGUgdG8gdGhhdCBvZiB0aGUgbmV3IHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgc2Vjb25kIHN0ZXAuXHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdvIGJhY2sgdG8gdGhlIGZpcnN0IHN0ZXAuXHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHRpdGxlIHdhcyBzZXQgMyB0aW1lcyAoY29uc3RydWN0aW9uLCBuZXh0LCBwcmV2KSBhbmRcclxuICAgICAgICAgICAgLy8gdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IHN0ZXAuXHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5zZXRUaXRsZS5jYWxscy5jb3VudCgpKS50b0VxdWFsKDMpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2Uuc2V0VGl0bGUuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoJ1N0ZXAgMScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzU2F2ZURpc2FibGVkKCkgZGVsZWdhdGVzIHRvIHRoZSBjdXJyZW50IFN0ZXBIYW5kbGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3B5T24oc3RlcDEsICdpc1NhdmVEaXNhYmxlZCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgIHNweU9uKHN0ZXAyLCAnaXNTYXZlRGlzYWJsZWQnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNTYXZlRGlzYWJsZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KHN0ZXAxLmlzU2F2ZURpc2FibGVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KHN0ZXAyLmlzU2F2ZURpc2FibGVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICBleHBlY3QoY3RybC5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICBleHBlY3Qoc3RlcDEuaXNTYXZlRGlzYWJsZWQuY2FsbHMuY291bnQoKSkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3Qoc3RlcDIuaXNTYXZlRGlzYWJsZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRTYXZlQnV0dG9uTGFiZWwoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdkZWxlZ2F0ZXMgdG8gdGhlIGN1cnJlbnQgU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oc3RlcDEsICdnZXRTYXZlQnV0dG9uTGFiZWwnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgc3B5T24oc3RlcDIsICdnZXRTYXZlQnV0dG9uTGFiZWwnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgc3B5T24oc3RlcDMsICdnZXRTYXZlQnV0dG9uTGFiZWwnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBmaXJzdCBzdGVwLlxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTYXZlQnV0dG9uTGFiZWwoKSkudG9FcXVhbCgnR28gdG8gbmV4dCBzdGVwJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwMS5nZXRTYXZlQnV0dG9uTGFiZWwpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RlcDIuZ2V0U2F2ZUJ1dHRvbkxhYmVsKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHNlY29uZCBzdGVwLlxyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFNhdmVCdXR0b25MYWJlbCgpKS50b0VxdWFsKCdHbyB0byBTdGVwIDMnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXAxLmdldFNhdmVCdXR0b25MYWJlbC5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RlcDIuZ2V0U2F2ZUJ1dHRvbkxhYmVsKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgbGFzdCBzdGVwLlxyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFNhdmVCdXR0b25MYWJlbCgpKS50b0VxdWFsKCdET05FU0tJIScpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RlcDEuZ2V0U2F2ZUJ1dHRvbkxhYmVsLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwMy5nZXRTYXZlQnV0dG9uTGFiZWwpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NhdmUoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdjYWxscyBzYXZlIG9uIHRoZSBjdXJyZW50IHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oc3RlcDEsICdzYXZlJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIHNweU9uKHN0ZXAyLCAnc2F2ZScpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RlcDEuc2F2ZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3RlcDIuc2F2ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXAxLnNhdmUuY2FsbHMuY291bnQoKSkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXAyLnNhdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NhdmVzIHRoZSBzdGVwIHJlc3VsdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMoY3RybC5zdGVwUmVzdWx0cykubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwUmVzdWx0cy5zdGVwMSkudG9FcXVhbCgncmVzdWx0MScpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMoY3RybC5zdGVwUmVzdWx0cykubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwUmVzdWx0cy5zdGVwMSkudG9FcXVhbCgncmVzdWx0MScpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwUmVzdWx0cy5zdGVwMikudG9FcXVhbCgncmVzdWx0MicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnb3ZlcndyaXRlcyBwcmV2aW91cyBzdGVwIHJlc3VsdHMgd2hlbiBnb2luZyBiYWNrIHRvIGEgc3RlcCBhbmQgc2F2aW5nIGFnYWluJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KE9iamVjdC5rZXlzKGN0cmwuc3RlcFJlc3VsdHMpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcFJlc3VsdHMuc3RlcDEpLnRvRXF1YWwoJ3Jlc3VsdDEnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdvIGJhY2sgdG8gdGhlIGZpcnN0IHN0ZXAuXHJcbiAgICAgICAgICAgIGN0cmwucHJldmlvdXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgYWdhaW4gLi4uIHdpdGggYSBkaWZmZXJlbnQgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXN1bHQxID0gJ25ld1Jlc3VsdCEnO1xyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyhjdHJsLnN0ZXBSZXN1bHRzKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0ZXBSZXN1bHRzLnN0ZXAxKS50b0VxdWFsKCduZXdSZXN1bHQhJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIG5ldyBzdGVwcyB3aGVuIHJlZnJlc2hTdGVwSGFuZGxlcnMoKSByZXR1cm5zIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBUaGUgY29udHJvbGxlciBpcyBpbXBsZW1lbnRlZCB0byBzdGFydCB3aXRoIG9ubHkgc3RlcDEsIGJ1dCBhZGRcclxuICAgICAgICAgICAgLy8gc3RlcDIgYW5kIHN0ZXAzIHVwb24gc2F2aW5nIHN0ZXAxLlxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTYXZlIGFuZCBjaGVjayB0aGF0IG5ldyBzdGVwcyB3ZXJlIGFkZGVkLlxyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0ZXBzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHNldCBuZXcgc3RlcHMgd2hlbiByZWZyZXNoU3RlcEhhbmRsZXJzKCkgcmV0dXJucyBudWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFN0ZXBzO1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0byBzdGVwMiwgdGhpcyBzaG91bGQgaGF2ZSAzIHN0ZXBzIG5vdy5cclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2aW5nIG9uIHN0ZXAgMiByZXR1cm5zIG51bGwuIE1ha2Ugc3VyZSB0aGUgc3RlcHMgZG9uJ3QgY2hhbmdlLlxyXG4gICAgICAgICAgICBvcmlnaW5hbFN0ZXBzID0gY3RybC5zdGVwcztcclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdGVwcykudG9FcXVhbChvcmlnaW5hbFN0ZXBzKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RlcHMubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbW92ZXMgdG8gdGhlIG5leHQgc3RlcCB3aGVuIHRoZXJlIGFyZSBtb3JlIHN0ZXBzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudFN0ZXAoKSkudG9FcXVhbChzdGVwMik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdvVG9MYXN0U3RlcCgpIHtcclxuICAgICAgICAgICAgLy8gU2F2ZSB0d2ljZSB0byBnZXQgdG8gdGhlIGxhc3Qgc3RlcC5cclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEN1cnJlbnRTdGVwKCkpLnRvRXF1YWwoc3RlcDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2F2ZURpYWxvZygpIHtcclxuICAgICAgICAgICAgZ29Ub0xhc3RTdGVwKCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBtb3ZlIHRvIHRoZSBuZXh0IHN0ZXAgd2hlbiBzYXZpbmcgZmFpbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gR28gdG8gdGhlIGxhc3Qgc3RlcC5cclxuICAgICAgICAgICAgZ29Ub0xhc3RTdGVwKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTYXZlIGFnYWluLiAgU2hvdWxkIHN0aWxsIGJlIG9uIGxhc3Qgc3RlcC5cclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50U3RlcCgpKS50b0VxdWFsKHN0ZXAzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Nsb3NlcyB0aGUgbW9kYWwgd2l0aCB0aGUgc3RlcFJlc3VsdHMgd2hlbiB0aGVyZSBhcmUgbm8gbW9yZSBzdGVwcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cztcclxuXHJcbiAgICAgICAgICAgIHNhdmVEaWFsb2coKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICByZXN1bHRzID0gJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UuY2FsbHMuZmlyc3QoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMocmVzdWx0cykubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0cy5zdGVwMSkudG9FcXVhbCgncmVzdWx0MScpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0cy5zdGVwMikudG9FcXVhbCgncmVzdWx0MicpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0cy5zdGVwMykudG9FcXVhbCgncmVzdWx0MycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgbW9kYWwgdGl0bGUgdG8gdGhhdCBvZiB0aGUgbmV3IHN0ZXAnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgc2Vjb25kIHN0ZXAuXHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHRpdGxlIHdhcyBzZXQgMiB0aW1lcyAoY29uc3RydWN0aW9uLCBuZXh0KSBhbmRcclxuICAgICAgICAgICAgLy8gdGhhdCBpdCBtYXRjaGVzIHRoZSBjdXJyZW50IHN0ZXAuXHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5zZXRUaXRsZS5jYWxscy5jb3VudCgpKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2Uuc2V0VGl0bGUuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoJ1N0ZXAgMicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZm9ybWF0cyB0aGUgc3RlcCByZXN1bHRzIGlmIHN1YmNsYXNzIHJldHVybnMgYSB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBjb250cm9sbGVyIHJldHVybiBmb3JtYXR0ZWQgcmVzdWx0cztcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFJlc3VsdHMgPSB7IHN0ZXAxOiAnTWFsY29sbSBibG93ZXJzIGFyZSBOVU1CRVIgMSEhIScgfTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2Zvcm1hdFN0ZXBSZXN1bHRzJykuYW5kLnJldHVyblZhbHVlKGZvcm1hdHRlZFJlc3VsdHMpO1xyXG5cclxuICAgICAgICAgICAgc2F2ZURpYWxvZygpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZvcm1hdHRlZFJlc3VsdHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyByYXcgc3RlcCByZXN1bHRzIGlmIHN1YmNsYXNzIHJldHVybnMgbnVsbCBmb3IgZm9ybWF0U3RlcFJlc3VsdHMoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzYXZlRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY3RybC5zdGVwUmVzdWx0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY2FuY2VsKCkgZGlzbWlzc2VzIHRoZSBtb2RhbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGN0cmwuY2FuY2VsKCk7XHJcbiAgICAgICAgZXhwZWN0KCR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
