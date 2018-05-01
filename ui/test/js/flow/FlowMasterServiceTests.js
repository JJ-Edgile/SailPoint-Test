System.register(['test/js/TestInitializer', 'flow/FlowModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var flowModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_flowFlowModule) {
            flowModule = _flowFlowModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('FlowMasterService', function () {

                var leaveFlowMsg = 'leave flow',
                    leaveFlowTitle = 'leave flow title',
                    flowMasterService,
                    Flow,
                    $rootScope,
                    flow1,
                    flow2,
                    flow3,
                    flow4,
                    stateChangeEvent;

                beforeEach(module(flowModule));

                beforeEach(inject(function (_flowMasterService_, _Flow_, _$rootScope_, spTranslateFilter) {
                    flowMasterService = _flowMasterService_;
                    Flow = _Flow_;
                    $rootScope = _$rootScope_;

                    spTranslateFilter.configureCatalog({
                        'ui_flow_leave_flow_message': leaveFlowMsg,
                        'ui_flow_leave_flow_title': leaveFlowTitle
                    });

                    flow1 = new Flow('flow1', ['flow1State', 'flow1State2'], null);
                    flow2 = new Flow('flow2', ['flow2State', 'flow2State2'], null);
                    flow3 = new Flow('flow3', ['flow3State', 'flow3State2'], null);
                    // Flow4 has duplicate validStates with flow3.
                    flow4 = new Flow('flow4', ['flow3State', 'flow3State2'], null);

                    flowMasterService.registerFlow(flow1);
                    flowMasterService.registerFlow(flow2);
                    flowMasterService.registerFlow(flow3);
                    flowMasterService.registerFlow(flow4);
                }));

                describe('registerFlow()', function () {
                    var flow = {
                        name: 'mockFlow'
                    };

                    it('registers a flow', function () {
                        flowMasterService.registerFlow(flow);
                        // No public way to get the registered flows, so just assume no exception is
                        // a good thing.  This will be tested more later with the start/complete/invalid
                        // tests.
                    });

                    it('pukes if you register a flow with a duplicate name', function () {
                        flowMasterService.registerFlow(flow);
                        expect(function () {
                            flowMasterService.registerFlow(flow);
                        }).toThrow();
                    });
                });

                function fireStateChange(toStateName, toParams) {
                    var toState = {
                        name: toStateName
                    },
                        fromState = 'foo',
                        fromParams = {};

                    stateChangeEvent = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState, fromParams);
                }

                describe('start flow', function () {
                    it('does not start a flow if the state is not valid for any flows', function () {
                        fireStateChange('notRegistered');
                        expect(flowMasterService.getActiveFlow()).toBeFalsy();
                    });

                    it('pukes if two flows are found with the same valid state', function () {
                        expect(function () {
                            fireStateChange('flow3State');
                        }).toThrow();
                    });

                    it('starts a flow if the state matches the first valid state', function () {
                        fireStateChange('flow1State');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                    });

                    it('starts a flow if the state matches a subsequent valid state', function () {
                        fireStateChange('flow1State2');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                    });

                    it('starts a flow after completing another flow', function () {
                        fireStateChange('flow1State');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                        fireStateChange('flow2State', {
                            completeFlow: flow1.name
                        });
                        expect(flowMasterService.getActiveFlow()).toEqual(flow2);
                    });

                    it('does not start a new flow if another flow is active', function () {
                        fireStateChange('flow1State');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                        fireStateChange('flow2State');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                    });
                });

                describe('complete flow', function () {
                    var params = {
                        completeFlow: 'flow1'
                    };

                    it('pukes if there is no active flow', function () {
                        expect(function () {
                            fireStateChange('flow2State', params);
                        }).toThrow();
                    });

                    it('pukes if the requested flow to complete is not the active flow', function () {
                        fireStateChange('flow2State');
                        expect(function () {
                            fireStateChange('flow1State', params);
                        }).toThrow();
                    });

                    it('completes a flow', function () {
                        fireStateChange('flow1State');
                        expect(flowMasterService.getActiveFlow()).toEqual(flow1);
                        fireStateChange('notRegisteredState', params);
                        expect(flowMasterService.getActiveFlow()).toBeFalsy();
                    });
                });

                describe('transitioning to an invalid state', function () {
                    var onExitCfg, activeFlow, spModal, confirmDialog, $state;

                    beforeEach(inject(function (_spModal_, _$state_, $q) {
                        spModal = _spModal_;
                        $state = _$state_;
                        confirmDialog = false;

                        // Make the modal either confirm or reject.
                        spyOn(spModal, 'open').and.callFake(function () {
                            var deferred = $q.defer();
                            if (confirmDialog) {
                                deferred.resolve();
                            } else {
                                deferred.reject();
                            }

                            return {
                                result: deferred.promise
                            };
                        });

                        // Watch for state changes.
                        spyOn($state, 'go');

                        // Set up an onExitCfg for the flow.  This will be tweaked with the tests.
                        onExitCfg = {};

                        // Create and register a flow to test with.
                        activeFlow = new Flow('activeFlow', ['activeFlowState'], onExitCfg);
                        flowMasterService.registerFlow(activeFlow);

                        // Activate the flow that we're testing with.
                        fireStateChange('activeFlowState');
                        expect(flowMasterService.getActiveFlow()).toEqual(activeFlow);
                    }));

                    it('still transitions even if showWarningFunction returns false', function () {
                        onExitCfg.showWarningFunction = function () {
                            return false;
                        };
                        fireStateChange('anotherFlow');
                        expect(flowMasterService.getActiveFlow()).toEqual(null);
                        expect($state.go).toHaveBeenCalled();
                    });

                    it('shows the dialog if showWarningFunction returns true', function () {
                        onExitCfg.showWarningFunction = function () {
                            return true;
                        };
                        fireStateChange('anotherFlow');
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('shows the dialog by default even if showWarningFunction is not defined', function () {
                        fireStateChange('anotherFlow');
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('doesn\'t show the dialog if showWarningFunction returns false', function () {
                        onExitCfg.showWarningFunction = function () {
                            return false;
                        };
                        fireStateChange('anotherFlow');
                        expect(spModal.open).not.toHaveBeenCalled();
                    });

                    function getDialogMessage() {
                        if (!spModal.open.calls.mostRecent) {
                            throw 'Modal should have been opened.';
                        }
                        return spModal.open.calls.mostRecent().args[0].content;
                    }

                    it('shows a dialog with the default message if a message is not configured', function () {
                        fireStateChange('anotherFlow');
                        expect(spModal.open).toHaveBeenCalled();
                        expect(getDialogMessage()).toEqual(leaveFlowMsg);
                    });

                    it('shows a dialog with the configured message', function () {
                        var msg = 'this is a new message';
                        onExitCfg.message = msg;
                        fireStateChange('anotherFlow');
                        expect(getDialogMessage()).toEqual(msg);
                    });

                    describe('cancel dialog', function () {
                        var onExitFunction;

                        beforeEach(function () {
                            onExitFunction = jasmine.createSpy();
                            onExitCfg.onExitFunction = onExitFunction;
                        });

                        it('does not call the onExitFunction', function () {
                            fireStateChange('anotherFlow');
                            $rootScope.$digest();
                            expect(onExitFunction).not.toHaveBeenCalled();
                        });

                        it('does not clear the activeFlow or transition', function () {
                            fireStateChange('anotherFlow');
                            $rootScope.$digest();
                            expect($state.go).not.toHaveBeenCalled();
                        });
                    });

                    describe('accept dialog', function () {
                        var stateName = 'anotherFlow',
                            onExitFunction,
                            resolveOnExitFunction;

                        beforeEach(inject(function ($q) {
                            // Make the dialog get accepted.
                            confirmDialog = true;
                            resolveOnExitFunction = true;

                            onExitFunction = jasmine.createSpy().and.callFake(function () {
                                var deferred = $q.defer();
                                if (resolveOnExitFunction) {
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                }
                                return deferred.promise;
                            });

                            onExitCfg.onExitFunction = onExitFunction;
                        }));

                        function checkStateTransition() {
                            expect($state.go).toHaveBeenCalled();
                            expect($state.go.calls.mostRecent().args[0].name).toEqual(stateName);
                        }

                        it('still transitions if an showWarningFunction is not configured', function () {
                            expect(onExitCfg.showWarningFunction).toBe(undefined);
                            fireStateChange('anotherFlow');
                            $rootScope.$digest();
                            checkStateTransition();
                        });

                        it('calls the onExitFunction', function () {
                            fireStateChange(stateName);
                            $rootScope.$digest();
                            expect(onExitFunction).toHaveBeenCalled();
                        });

                        it('clears activeFlow and transitions with no onExitFunction', function () {
                            delete onExitCfg.onExitFunction;
                            fireStateChange(stateName);
                            $rootScope.$digest();
                            expect(flowMasterService.getActiveFlow()).toBeNull();
                            checkStateTransition();
                        });

                        it('clears activeFlow and transitions with onExitFunction that resolves', function () {
                            fireStateChange(stateName);
                            $rootScope.$digest();
                            expect(flowMasterService.getActiveFlow()).toBeNull();
                            checkStateTransition();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsb3cvRmxvd01hc3RlclNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbUJBQW1CLDRDQUE0QyxVQUFVLFNBQVM7SUFBOUg7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlCQUFpQjtZQUN2RSxhQUFhLGdCQUFnQjtXQUM5QixVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBRjdCLFNBQVMscUJBQXFCLFlBQVc7O2dCQUVyQyxJQUFJLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQjtvQkFBbUI7b0JBQU07b0JBQVk7b0JBQU87b0JBQU87b0JBQU87b0JBQU87O2dCQUdyRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxxQkFBcUIsUUFBUSxjQUFjLG1CQUFtQjtvQkFDckYsb0JBQW9CO29CQUNwQixPQUFPO29CQUNQLGFBQWE7O29CQUViLGtCQUFrQixpQkFBaUI7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsNEJBQTRCOzs7b0JBR2hDLFFBQVEsSUFBSSxLQUFLLFNBQVMsQ0FBRSxjQUFjLGdCQUFnQjtvQkFDMUQsUUFBUSxJQUFJLEtBQUssU0FBUyxDQUFFLGNBQWMsZ0JBQWdCO29CQUMxRCxRQUFRLElBQUksS0FBSyxTQUFTLENBQUUsY0FBYyxnQkFBZ0I7O29CQUUxRCxRQUFRLElBQUksS0FBSyxTQUFTLENBQUUsY0FBYyxnQkFBZ0I7O29CQUUxRCxrQkFBa0IsYUFBYTtvQkFDL0Isa0JBQWtCLGFBQWE7b0JBQy9CLGtCQUFrQixhQUFhO29CQUMvQixrQkFBa0IsYUFBYTs7O2dCQUluQyxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxJQUFJLE9BQU87d0JBQ1AsTUFBTTs7O29CQUdWLEdBQUcsb0JBQW9CLFlBQVc7d0JBQzlCLGtCQUFrQixhQUFhOzs7Ozs7b0JBTW5DLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hF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QUNsQixPQUFPLE9BQU8sR0FBRyxNQUFNLGFBQWEsS0FBSyxHQUFHLE1BQU0sUUFBUTs7O3dCQUc5RCxHQUFHLGlFQUFpRSxZQUFXOzRCQUMzRSxPQUFPLFVBQVUscUJBQXFCLEtBQUs7NEJBQzNDLGdCQUFnQjs0QkFDaEIsV0FBVzs0QkFDWDs7O3dCQUdKLEdBQUcsNEJBQTRCLFlBQVc7NEJBQ3RDLGdCQUFnQjs0QkFDaEIsV0FBVzs0QkFDWCxPQUFPLGdCQUFnQjs7O3dCQUczQixHQUFHLDREQUE0RCxZQUFXOzRCQUN0RSxPQUFPLFVBQVU7NEJBQ2pCLGdCQUFnQjs0QkFDaEIsV0FBVzs0QkFDWCxPQUFPLGtCQUFrQixpQkFBaUI7NEJBQzFDOzs7d0JBR0osR0FBRyx1RUFBdUUsWUFBVzs0QkFDakYsZ0JBQWdCOzRCQUNoQixXQUFXOzRCQUNYLE9BQU8sa0JBQWtCLGlCQUFpQjs0QkFDMUM7Ozs7Ozs7R0FxQmIiLCJmaWxlIjoiZmxvdy9GbG93TWFzdGVyU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBmbG93TW9kdWxlIGZyb20gJ2Zsb3cvRmxvd01vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcclxuXHJcbmRlc2NyaWJlKCdGbG93TWFzdGVyU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBsZWF2ZUZsb3dNc2cgPSAnbGVhdmUgZmxvdycsXHJcbiAgICAgICAgbGVhdmVGbG93VGl0bGUgPSAnbGVhdmUgZmxvdyB0aXRsZScsXHJcbiAgICAgICAgZmxvd01hc3RlclNlcnZpY2UsIEZsb3csICRyb290U2NvcGUsIGZsb3cxLCBmbG93MiwgZmxvdzMsIGZsb3c0LCBzdGF0ZUNoYW5nZUV2ZW50O1xyXG5cclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmbG93TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2Zsb3dNYXN0ZXJTZXJ2aWNlXywgX0Zsb3dfLCBfJHJvb3RTY29wZV8sIHNwVHJhbnNsYXRlRmlsdGVyKSB7XHJcbiAgICAgICAgZmxvd01hc3RlclNlcnZpY2UgPSBfZmxvd01hc3RlclNlcnZpY2VfO1xyXG4gICAgICAgIEZsb3cgPSBfRmxvd187XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuXHJcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XHJcbiAgICAgICAgICAgICd1aV9mbG93X2xlYXZlX2Zsb3dfbWVzc2FnZSc6IGxlYXZlRmxvd01zZyxcclxuICAgICAgICAgICAgJ3VpX2Zsb3dfbGVhdmVfZmxvd190aXRsZSc6IGxlYXZlRmxvd1RpdGxlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZsb3cxID0gbmV3IEZsb3coJ2Zsb3cxJywgWyAnZmxvdzFTdGF0ZScsICdmbG93MVN0YXRlMiddLCBudWxsKTtcclxuICAgICAgICBmbG93MiA9IG5ldyBGbG93KCdmbG93MicsIFsgJ2Zsb3cyU3RhdGUnLCAnZmxvdzJTdGF0ZTInXSwgbnVsbCk7XHJcbiAgICAgICAgZmxvdzMgPSBuZXcgRmxvdygnZmxvdzMnLCBbICdmbG93M1N0YXRlJywgJ2Zsb3czU3RhdGUyJ10sIG51bGwpO1xyXG4gICAgICAgIC8vIEZsb3c0IGhhcyBkdXBsaWNhdGUgdmFsaWRTdGF0ZXMgd2l0aCBmbG93My5cclxuICAgICAgICBmbG93NCA9IG5ldyBGbG93KCdmbG93NCcsIFsgJ2Zsb3czU3RhdGUnLCAnZmxvdzNTdGF0ZTInXSwgbnVsbCk7XHJcblxyXG4gICAgICAgIGZsb3dNYXN0ZXJTZXJ2aWNlLnJlZ2lzdGVyRmxvdyhmbG93MSk7XHJcbiAgICAgICAgZmxvd01hc3RlclNlcnZpY2UucmVnaXN0ZXJGbG93KGZsb3cyKTtcclxuICAgICAgICBmbG93TWFzdGVyU2VydmljZS5yZWdpc3RlckZsb3coZmxvdzMpO1xyXG4gICAgICAgIGZsb3dNYXN0ZXJTZXJ2aWNlLnJlZ2lzdGVyRmxvdyhmbG93NCk7XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdyZWdpc3RlckZsb3coKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmbG93ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbW9ja0Zsb3cnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaXQoJ3JlZ2lzdGVycyBhIGZsb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmxvd01hc3RlclNlcnZpY2UucmVnaXN0ZXJGbG93KGZsb3cpO1xyXG4gICAgICAgICAgICAvLyBObyBwdWJsaWMgd2F5IHRvIGdldCB0aGUgcmVnaXN0ZXJlZCBmbG93cywgc28ganVzdCBhc3N1bWUgbm8gZXhjZXB0aW9uIGlzXHJcbiAgICAgICAgICAgIC8vIGEgZ29vZCB0aGluZy4gIFRoaXMgd2lsbCBiZSB0ZXN0ZWQgbW9yZSBsYXRlciB3aXRoIHRoZSBzdGFydC9jb21wbGV0ZS9pbnZhbGlkXHJcbiAgICAgICAgICAgIC8vIHRlc3RzLlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgaWYgeW91IHJlZ2lzdGVyIGEgZmxvdyB3aXRoIGEgZHVwbGljYXRlIG5hbWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmxvd01hc3RlclNlcnZpY2UucmVnaXN0ZXJGbG93KGZsb3cpO1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGZsb3dNYXN0ZXJTZXJ2aWNlLnJlZ2lzdGVyRmxvdyhmbG93KTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGZpcmVTdGF0ZUNoYW5nZSh0b1N0YXRlTmFtZSwgdG9QYXJhbXMpIHtcclxuICAgICAgICB2YXIgdG9TdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRvU3RhdGVOYW1lXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZyb21TdGF0ZSA9ICdmb28nLFxyXG4gICAgICAgICAgICBmcm9tUGFyYW1zID0ge307XHJcblxyXG4gICAgICAgIHN0YXRlQ2hhbmdlRXZlbnQgPVxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ3N0YXJ0IGZsb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZG9lcyBub3Qgc3RhcnQgYSBmbG93IGlmIHRoZSBzdGF0ZSBpcyBub3QgdmFsaWQgZm9yIGFueSBmbG93cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ25vdFJlZ2lzdGVyZWQnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3dNYXN0ZXJTZXJ2aWNlLmdldEFjdGl2ZUZsb3coKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwdWtlcyBpZiB0d28gZmxvd3MgYXJlIGZvdW5kIHdpdGggdGhlIHNhbWUgdmFsaWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBmaXJlU3RhdGVDaGFuZ2UoJ2Zsb3czU3RhdGUnKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc3RhcnRzIGEgZmxvdyBpZiB0aGUgc3RhdGUgbWF0Y2hlcyB0aGUgZmlyc3QgdmFsaWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdmbG93MVN0YXRlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5nZXRBY3RpdmVGbG93KCkpLnRvRXF1YWwoZmxvdzEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc3RhcnRzIGEgZmxvdyBpZiB0aGUgc3RhdGUgbWF0Y2hlcyBhIHN1YnNlcXVlbnQgdmFsaWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdmbG93MVN0YXRlMicpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmxvd01hc3RlclNlcnZpY2UuZ2V0QWN0aXZlRmxvdygpKS50b0VxdWFsKGZsb3cxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3N0YXJ0cyBhIGZsb3cgYWZ0ZXIgY29tcGxldGluZyBhbm90aGVyIGZsb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdmbG93MVN0YXRlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5nZXRBY3RpdmVGbG93KCkpLnRvRXF1YWwoZmxvdzEpO1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Zsb3cyU3RhdGUnLCB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUZsb3c6IGZsb3cxLm5hbWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5nZXRBY3RpdmVGbG93KCkpLnRvRXF1YWwoZmxvdzIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3Qgc3RhcnQgYSBuZXcgZmxvdyBpZiBhbm90aGVyIGZsb3cgaXMgYWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZSgnZmxvdzFTdGF0ZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmxvd01hc3RlclNlcnZpY2UuZ2V0QWN0aXZlRmxvdygpKS50b0VxdWFsKGZsb3cxKTtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdmbG93MlN0YXRlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5nZXRBY3RpdmVGbG93KCkpLnRvRXF1YWwoZmxvdzEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbXBsZXRlIGZsb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBjb21wbGV0ZUZsb3c6ICdmbG93MSdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpdCgncHVrZXMgaWYgdGhlcmUgaXMgbm8gYWN0aXZlIGZsb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBmaXJlU3RhdGVDaGFuZ2UoJ2Zsb3cyU3RhdGUnLCBwYXJhbXMpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwdWtlcyBpZiB0aGUgcmVxdWVzdGVkIGZsb3cgdG8gY29tcGxldGUgaXMgbm90IHRoZSBhY3RpdmUgZmxvdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Zsb3cyU3RhdGUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBmaXJlU3RhdGVDaGFuZ2UoJ2Zsb3cxU3RhdGUnLCBwYXJhbXMpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjb21wbGV0ZXMgYSBmbG93JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZSgnZmxvdzFTdGF0ZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmxvd01hc3RlclNlcnZpY2UuZ2V0QWN0aXZlRmxvdygpKS50b0VxdWFsKGZsb3cxKTtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdub3RSZWdpc3RlcmVkU3RhdGUnLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBleHBlY3QoZmxvd01hc3RlclNlcnZpY2UuZ2V0QWN0aXZlRmxvdygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCd0cmFuc2l0aW9uaW5nIHRvIGFuIGludmFsaWQgc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgb25FeGl0Q2ZnLCBhY3RpdmVGbG93LCBzcE1vZGFsLCBjb25maXJtRGlhbG9nLCAkc3RhdGU7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9zcE1vZGFsXywgXyRzdGF0ZV8sICRxKSB7XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xyXG4gICAgICAgICAgICBjb25maXJtRGlhbG9nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBtb2RhbCBlaXRoZXIgY29uZmlybSBvciByZWplY3QuXHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maXJtRGlhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGRlZmVycmVkLnByb21pc2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gV2F0Y2ggZm9yIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAgICAgICAgIHNweU9uKCRzdGF0ZSwgJ2dvJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdXAgYW4gb25FeGl0Q2ZnIGZvciB0aGUgZmxvdy4gIFRoaXMgd2lsbCBiZSB0d2Vha2VkIHdpdGggdGhlIHRlc3RzLlxyXG4gICAgICAgICAgICBvbkV4aXRDZmcgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgcmVnaXN0ZXIgYSBmbG93IHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICAgICAgYWN0aXZlRmxvdyA9IG5ldyBGbG93KCdhY3RpdmVGbG93JywgWyAnYWN0aXZlRmxvd1N0YXRlJyBdLCBvbkV4aXRDZmcpO1xyXG4gICAgICAgICAgICBmbG93TWFzdGVyU2VydmljZS5yZWdpc3RlckZsb3coYWN0aXZlRmxvdyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgZmxvdyB0aGF0IHdlJ3JlIHRlc3Rpbmcgd2l0aC5cclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdhY3RpdmVGbG93U3RhdGUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZsb3dNYXN0ZXJTZXJ2aWNlLmdldEFjdGl2ZUZsb3coKSkudG9FcXVhbChhY3RpdmVGbG93KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzdGlsbCB0cmFuc2l0aW9ucyBldmVuIGlmIHNob3dXYXJuaW5nRnVuY3Rpb24gcmV0dXJucyBmYWxzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBvbkV4aXRDZmcuc2hvd1dhcm5pbmdGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Fub3RoZXJGbG93Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5nZXRBY3RpdmVGbG93KCkpLnRvRXF1YWwobnVsbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBkaWFsb2cgaWYgc2hvd1dhcm5pbmdGdW5jdGlvbiByZXR1cm5zIHRydWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgb25FeGl0Q2ZnLnNob3dXYXJuaW5nRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Fub3RoZXJGbG93Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBkaWFsb2cgYnkgZGVmYXVsdCBldmVuIGlmIHNob3dXYXJuaW5nRnVuY3Rpb24gaXMgbm90IGRlZmluZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdhbm90aGVyRmxvdycpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzblxcJ3Qgc2hvdyB0aGUgZGlhbG9nIGlmIHNob3dXYXJuaW5nRnVuY3Rpb24gcmV0dXJucyBmYWxzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBvbkV4aXRDZmcuc2hvd1dhcm5pbmdGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Fub3RoZXJGbG93Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERpYWxvZ01lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIGlmICghc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93ICdNb2RhbCBzaG91bGQgaGF2ZSBiZWVuIG9wZW5lZC4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uY29udGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBhIGRpYWxvZyB3aXRoIHRoZSBkZWZhdWx0IG1lc3NhZ2UgaWYgYSBtZXNzYWdlIGlzIG5vdCBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZSgnYW5vdGhlckZsb3cnKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RGlhbG9nTWVzc2FnZSgpKS50b0VxdWFsKGxlYXZlRmxvd01zZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBhIGRpYWxvZyB3aXRoIHRoZSBjb25maWd1cmVkIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9ICd0aGlzIGlzIGEgbmV3IG1lc3NhZ2UnO1xyXG4gICAgICAgICAgICBvbkV4aXRDZmcubWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdhbm90aGVyRmxvdycpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RGlhbG9nTWVzc2FnZSgpKS50b0VxdWFsKG1zZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdjYW5jZWwgZGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBvbkV4aXRGdW5jdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBvbkV4aXRGdW5jdGlvbiA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcbiAgICAgICAgICAgICAgICBvbkV4aXRDZmcub25FeGl0RnVuY3Rpb24gPSBvbkV4aXRGdW5jdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgY2FsbCB0aGUgb25FeGl0RnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZSgnYW5vdGhlckZsb3cnKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9uRXhpdEZ1bmN0aW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBjbGVhciB0aGUgYWN0aXZlRmxvdyBvciB0cmFuc2l0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2UoJ2Fub3RoZXJGbG93Jyk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnYWNjZXB0IGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGVOYW1lID0gJ2Fub3RoZXJGbG93JyxcclxuICAgICAgICAgICAgICAgIG9uRXhpdEZ1bmN0aW9uLCByZXNvbHZlT25FeGl0RnVuY3Rpb247XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgZGlhbG9nIGdldCBhY2NlcHRlZC5cclxuICAgICAgICAgICAgICAgIGNvbmZpcm1EaWFsb2cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZU9uRXhpdEZ1bmN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbkV4aXRGdW5jdGlvbiA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVPbkV4aXRGdW5jdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBvbkV4aXRDZmcub25FeGl0RnVuY3Rpb24gPSBvbkV4aXRGdW5jdGlvbjtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdGF0ZVRyYW5zaXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLm5hbWUpLnRvRXF1YWwoc3RhdGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXQoJ3N0aWxsIHRyYW5zaXRpb25zIGlmIGFuIHNob3dXYXJuaW5nRnVuY3Rpb24gaXMgbm90IGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChvbkV4aXRDZmcuc2hvd1dhcm5pbmdGdW5jdGlvbikudG9CZSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgZmlyZVN0YXRlQ2hhbmdlKCdhbm90aGVyRmxvdycpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja1N0YXRlVHJhbnNpdGlvbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjYWxscyB0aGUgb25FeGl0RnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZShzdGF0ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob25FeGl0RnVuY3Rpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnY2xlYXJzIGFjdGl2ZUZsb3cgYW5kIHRyYW5zaXRpb25zIHdpdGggbm8gb25FeGl0RnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvbkV4aXRDZmcub25FeGl0RnVuY3Rpb247XHJcbiAgICAgICAgICAgICAgICBmaXJlU3RhdGVDaGFuZ2Uoc3RhdGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZsb3dNYXN0ZXJTZXJ2aWNlLmdldEFjdGl2ZUZsb3coKSkudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrU3RhdGVUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2NsZWFycyBhY3RpdmVGbG93IGFuZCB0cmFuc2l0aW9ucyB3aXRoIG9uRXhpdEZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGZpcmVTdGF0ZUNoYW5nZShzdGF0ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmxvd01hc3RlclNlcnZpY2UuZ2V0QWN0aXZlRmxvdygpKS50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tTdGF0ZVRyYW5zaXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
