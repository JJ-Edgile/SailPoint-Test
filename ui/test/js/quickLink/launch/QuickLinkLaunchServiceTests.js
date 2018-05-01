System.register(['test/js/TestInitializer', 'quickLink/launch/QuickLinkLaunchModule'], function (_export) {

    /**
     * Tests for the QuickLinkLaunchService
     */
    'use strict';

    var quickLinkLaunchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkLaunchQuickLinkLaunchModule) {
            quickLinkLaunchModule = _quickLinkLaunchQuickLinkLaunchModule['default'];
        }],
        execute: function () {
            describe('QuickLinkLaunchService', function () {
                var $rootScope,
                    quickLinkLaunchService,
                    QuickLinkLaunchResult,
                    $state,
                    $window,
                    notificationService,
                    mockWindow = {
                    location: {
                        href: ''
                    }
                };

                beforeEach(module(quickLinkLaunchModule));

                beforeEach(module(function ($provide) {
                    // Provide a mocked up $window service
                    $provide.value('$window', mockWindow);
                }));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_quickLinkLaunchService_, $q, _$rootScope_, _QuickLinkLaunchResult_, _$window_, _$state_, _spNotificationService_) {
                    $rootScope = _$rootScope_;
                    $window = _$window_;
                    $state = _$state_;
                    quickLinkLaunchService = _quickLinkLaunchService_;
                    QuickLinkLaunchResult = _QuickLinkLaunchResult_;
                    notificationService = _spNotificationService_;
                    spyOn(notificationService, 'triggerDirective');
                    spyOn(notificationService, 'addNotification');
                    spyOn(notificationService, 'addMessage');

                    spyOn($state, 'go').and.callFake(function () {
                        return null;
                    });
                }));

                it('handles quick link launch for external action', function () {
                    var resultData = {
                        action: 'external',
                        redirectUrl: 'somewhereouthere'
                    };

                    quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                    expect($window.location.href).toBe(resultData.redirectUrl);
                });

                it('handles quick link launch for other actions', function () {
                    var resultData = {
                        action: 'manageWorkItems',
                        arguments: {
                            id: 'someid',
                            workItemType: 'Approval'
                        }
                    },
                        quickLink = {
                        allowOthers: false
                    };

                    quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData), quickLink);

                    expect($state.go.calls.mostRecent().args[0]).toBe('myApprovals');
                    expect($state.go.calls.mostRecent().args[1]).toBe(resultData.arguments);
                });

                describe('workflow quick link launch', function () {
                    var workItemService;
                    beforeEach(inject(function (_workItemService_) {
                        workItemService = _workItemService_;
                    }));

                    it('goes to work item if nextWorkItemId is set and type is supported', function () {
                        var resultData = {
                            action: 'workflow',
                            nextWorkItemId: '1234',
                            nextWorkItemType: 'Approval'
                        };

                        spyOn(workItemService, 'isSupportedWorkItemType').and.returnValue(true);
                        quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                        expect($state.go.calls.mostRecent().args[0]).toBe('commonWorkItem');
                        expect($state.go.calls.mostRecent().args[1]).toEqual({ workItemId: resultData.nextWorkItemId });
                    });

                    it('stays on page and sets notification if nextWorkItemId is set and type is not supported', function () {
                        var resultData = {
                            action: 'workflow',
                            nextWorkItemId: '1234',
                            nextWorkItemType: 'Approval'
                        };

                        spyOn(workItemService, 'isSupportedWorkItemType').and.returnValue(false);
                        quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                        expect($state.go).not.toHaveBeenCalled();
                        expect(notificationService.addNotification).toHaveBeenCalled();
                        expect(notificationService.triggerDirective).toHaveBeenCalled();
                    });

                    it('stays on page and sets notification if selectIdentitiesForWorkflow is true', function () {
                        var resultData = {
                            action: 'workflow',
                            selectIdentitiesForWorkflow: true
                        };

                        quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                        expect($state.go).not.toHaveBeenCalled();
                        expect(notificationService.addNotification).toHaveBeenCalled();
                        expect(notificationService.triggerDirective).toHaveBeenCalled();
                    });

                    it('adds messages if nextWorkItemId is not set but workflow is launched', function () {
                        var resultData = {
                            action: 'workflow',
                            workflowLaunched: true,
                            messages: [{ messageOrKey: 'abc' }, { messageOrKey: 'def' }]
                        };

                        quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                        expect($state.go).not.toHaveBeenCalled();
                        expect(notificationService.addMessage.calls.count()).toBe(2);
                        expect(notificationService.addMessage.calls.argsFor(0)).toEqual([resultData.messages[0]]);
                        expect(notificationService.addMessage.calls.argsFor(1)).toEqual([resultData.messages[1]]);
                        expect(notificationService.triggerDirective).toHaveBeenCalled();
                    });
                });

                describe('unsupported action', function () {
                    it('adds message and does not go anywhere if exception from mapping action to state', function () {
                        var resultData = {
                            action: 'somedumbthing'
                        };

                        quickLinkLaunchService.handleQuickLinkLaunch(new QuickLinkLaunchResult(resultData));
                        expect($state.go).not.toHaveBeenCalled();
                        expect(notificationService.addNotification).toHaveBeenCalled();
                        expect(notificationService.triggerDirective).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rTGF1bmNoU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMsVUFBVSxTQUFTOzs7OztJQUExRzs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTtZQUo3QixTQUFTLDBCQUEwQixZQUFXO2dCQUMxQyxJQUFJO29CQUFZO29CQUF3QjtvQkFBdUI7b0JBQVE7b0JBQVM7b0JBQzVFLGFBQWE7b0JBQ1QsVUFBVzt3QkFDUCxNQUFNOzs7O2dCQUlsQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVOztvQkFFakMsU0FBUyxNQUFNLFdBQVc7Ozs7Z0JBSTlCLFdBQVcsT0FBTyxVQUFTLDBCQUEwQixJQUFJLGNBQWMseUJBQXlCLFdBQ3BFLFVBQVUseUJBQXlCO29CQUMzRCxhQUFhO29CQUNiLFVBQVU7b0JBQ1YsU0FBUztvQkFDVCx5QkFBeUI7b0JBQ3pCLHdCQUF3QjtvQkFDeEIsc0JBQXNCO29CQUN0QixNQUFNLHFCQUFxQjtvQkFDM0IsTUFBTSxxQkFBcUI7b0JBQzNCLE1BQU0scUJBQXFCOztvQkFFM0IsTUFBTSxRQUFRLE1BQU0sSUFBSSxTQUFTLFlBQVc7d0JBQ3hDLE9BQU87Ozs7Z0JBSWYsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsSUFBSSxhQUFhO3dCQUNiLFFBQVE7d0JBQ1IsYUFBYTs7O29CQUdqQix1QkFBdUIsc0JBQXNCLElBQUksc0JBQXNCO29CQUN2RSxPQUFPLFFBQVEsU0FBUyxNQUFNLEtBQUssV0FBVzs7O2dCQUdsRCxHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxJQUFJLGFBQWE7d0JBQ1QsUUFBUTt3QkFDUixXQUFXOzRCQUNQLElBQUk7NEJBQ0osY0FBYzs7O3dCQUd0QixZQUFZO3dCQUNSLGFBQWE7OztvQkFHckIsdUJBQXVCLHNCQUFzQixJQUFJLHNCQUFzQixhQUFhOztvQkFFcEYsT0FBTyxPQUFPLEdBQUcsTUFBTSxhQUFhLEtBQUssSUFBSSxLQUFLO29CQUNsRCxPQUFPLE9BQU8sR0FBRyxNQUFNLGFBQWEsS0FBSyxJQUFJLEtBQUssV0FBVzs7O2dCQUdqRSxTQUFTLDhCQUE4QixZQUFXO29CQUM5QyxJQUFJO29CQUNKLFdBQVcsT0FBTyxVQUFTLG1CQUFtQjt3QkFDMUMsa0JBQWtCOzs7b0JBR3RCLEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLElBQUksYUFBYTs0QkFDYixRQUFROzRCQUNSLGdCQUFnQjs0QkFDaEIsa0JBQWtCOzs7d0JBR3RCLE1BQU0saUJBQWlCLDJCQUEyQixJQUFJLFlBQVk7d0JBQ2xFLHVCQUF1QixzQkFBc0IsSUFBSSxzQkFBc0I7d0JBQ3ZFLE9BQU8sT0FBTyxHQUFHLE1BQU0sYUFBYSxLQUFLLElBQUksS0FBSzt3QkFDbEQsT0FBTyxPQUFPLEdBQUcsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRLEVBQUUsWUFBWSxXQUFXOzs7b0JBR2xGLEdBQUcsMEZBQTBGLFlBQVc7d0JBQ3BHLElBQUksYUFBYTs0QkFDYixRQUFROzRCQUNSLGdCQUFnQjs0QkFDaEIsa0JBQWtCOzs7d0JBR3RCLE1BQU0saUJBQWlCLDJCQUEyQixJQUFJLFlBQVk7d0JBQ2xFLHVCQUF1QixzQkFBc0IsSUFBSSxzQkFBc0I7d0JBQ3ZFLE9BQU8sT0FBTyxJQUFJLElBQUk7d0JBQ3RCLE9BQU8sb0JBQW9CLGlCQUFpQjt3QkFDNUMsT0FBTyxvQkFBb0Isa0JBQWtCOzs7b0JBR2pELEdBQUcsOEVBQThFLFlBQVc7d0JBQ3hGLElBQUksYUFBYTs0QkFDYixRQUFROzRCQUNSLDZCQUE2Qjs7O3dCQUdqQyx1QkFBdUIsc0JBQXNCLElBQUksc0JBQXNCO3dCQUN2RSxPQUFPLE9BQU8sSUFBSSxJQUFJO3dCQUN0QixPQUFPLG9CQUFvQixpQkFBaUI7d0JBQzVDLE9BQU8sb0JBQW9CLGtCQUFrQjs7O29CQUdqRCxHQUFHLHVFQUF1RSxZQUFXO3dCQUNqRixJQUFJLGFBQWE7NEJBQ2IsUUFBUTs0QkFDUixrQkFBa0I7NEJBQ2xCLFVBQVUsQ0FBQyxFQUFFLGNBQWMsU0FBUSxFQUFFLGNBQWM7Ozt3QkFHdkQsdUJBQXVCLHNCQUFzQixJQUFJLHNCQUFzQjt3QkFDdkUsT0FBTyxPQUFPLElBQUksSUFBSTt3QkFDdEIsT0FBTyxvQkFBb0IsV0FBVyxNQUFNLFNBQVMsS0FBSzt3QkFDMUQsT0FBTyxvQkFBb0IsV0FBVyxNQUFNLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxTQUFTO3dCQUNyRixPQUFPLG9CQUFvQixXQUFXLE1BQU0sUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLFNBQVM7d0JBQ3JGLE9BQU8sb0JBQW9CLGtCQUFrQjs7OztnQkFJckQsU0FBUyxzQkFBc0IsWUFBVztvQkFDdEMsR0FBSSxtRkFBbUYsWUFBVzt3QkFDOUYsSUFBSSxhQUFhOzRCQUNiLFFBQVE7Ozt3QkFHWix1QkFBdUIsc0JBQXNCLElBQUksc0JBQXNCO3dCQUN2RSxPQUFPLE9BQU8sSUFBSSxJQUFJO3dCQUN0QixPQUFPLG9CQUFvQixpQkFBaUI7d0JBQzVDLE9BQU8sb0JBQW9CLGtCQUFrQjs7Ozs7O0dBZXREIiwiZmlsZSI6InF1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rTGF1bmNoU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBxdWlja0xpbmtMYXVuY2hNb2R1bGUgZnJvbSAncXVpY2tMaW5rL2xhdW5jaC9RdWlja0xpbmtMYXVuY2hNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUXVpY2tMaW5rTGF1bmNoU2VydmljZVxuICovXG5kZXNjcmliZSgnUXVpY2tMaW5rTGF1bmNoU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcm9vdFNjb3BlLCBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLCBRdWlja0xpbmtMYXVuY2hSZXN1bHQsICRzdGF0ZSwgJHdpbmRvdywgbm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgbW9ja1dpbmRvdyA9IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiAge1xuICAgICAgICAgICAgICAgIGhyZWY6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShxdWlja0xpbmtMYXVuY2hNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgIC8vIFByb3ZpZGUgYSBtb2NrZWQgdXAgJHdpbmRvdyBzZXJ2aWNlXG4gICAgICAgICRwcm92aWRlLnZhbHVlKCckd2luZG93JywgbW9ja1dpbmRvdyk7XG4gICAgfSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9xdWlja0xpbmtMYXVuY2hTZXJ2aWNlXywgJHEsIF8kcm9vdFNjb3BlXywgX1F1aWNrTGlua0xhdW5jaFJlc3VsdF8sIF8kd2luZG93XyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRzdGF0ZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfKSB7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgICAgICRzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlID0gX3F1aWNrTGlua0xhdW5jaFNlcnZpY2VfO1xuICAgICAgICBRdWlja0xpbmtMYXVuY2hSZXN1bHQgPSBfUXVpY2tMaW5rTGF1bmNoUmVzdWx0XztcbiAgICAgICAgbm90aWZpY2F0aW9uU2VydmljZSA9IF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICBzcHlPbihub3RpZmljYXRpb25TZXJ2aWNlLCAndHJpZ2dlckRpcmVjdGl2ZScpO1xuICAgICAgICBzcHlPbihub3RpZmljYXRpb25TZXJ2aWNlLCAnYWRkTm90aWZpY2F0aW9uJyk7XG4gICAgICAgIHNweU9uKG5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGRNZXNzYWdlJyk7XG5cbiAgICAgICAgc3B5T24oJHN0YXRlLCAnZ28nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ2hhbmRsZXMgcXVpY2sgbGluayBsYXVuY2ggZm9yIGV4dGVybmFsIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzdWx0RGF0YSA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2V4dGVybmFsJyxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsOiAnc29tZXdoZXJlb3V0aGVyZSdcbiAgICAgICAgfTtcblxuICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLmhhbmRsZVF1aWNrTGlua0xhdW5jaChuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHJlc3VsdERhdGEpKTtcbiAgICAgICAgZXhwZWN0KCR3aW5kb3cubG9jYXRpb24uaHJlZikudG9CZShyZXN1bHREYXRhLnJlZGlyZWN0VXJsKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHF1aWNrIGxpbmsgbGF1bmNoIGZvciBvdGhlciBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHREYXRhID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ21hbmFnZVdvcmtJdGVtcycsXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnc29tZWlkJyxcbiAgICAgICAgICAgICAgICAgICAgd29ya0l0ZW1UeXBlOiAnQXBwcm92YWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHF1aWNrTGluayA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgcXVpY2tMaW5rTGF1bmNoU2VydmljZS5oYW5kbGVRdWlja0xpbmtMYXVuY2gobmV3IFF1aWNrTGlua0xhdW5jaFJlc3VsdChyZXN1bHREYXRhKSwgcXVpY2tMaW5rKTtcblxuICAgICAgICBleHBlY3QoJHN0YXRlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0JlKCdteUFwcHJvdmFscycpO1xuICAgICAgICBleHBlY3QoJHN0YXRlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdKS50b0JlKHJlc3VsdERhdGEuYXJndW1lbnRzKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3b3JrZmxvdyBxdWljayBsaW5rIGxhdW5jaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd29ya0l0ZW1TZXJ2aWNlO1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfd29ya0l0ZW1TZXJ2aWNlXykge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnZ29lcyB0byB3b3JrIGl0ZW0gaWYgbmV4dFdvcmtJdGVtSWQgaXMgc2V0IGFuZCB0eXBlIGlzIHN1cHBvcnRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnd29ya2Zsb3cnLFxuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbUlkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtVHlwZTogJ0FwcHJvdmFsJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24od29ya0l0ZW1TZXJ2aWNlLCAnaXNTdXBwb3J0ZWRXb3JrSXRlbVR5cGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLmhhbmRsZVF1aWNrTGlua0xhdW5jaChuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHJlc3VsdERhdGEpKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvQmUoJ2NvbW1vbldvcmtJdGVtJyk7XG4gICAgICAgICAgICBleHBlY3QoJHN0YXRlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdKS50b0VxdWFsKHsgd29ya0l0ZW1JZDogcmVzdWx0RGF0YS5uZXh0V29ya0l0ZW1JZCB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3N0YXlzIG9uIHBhZ2UgYW5kIHNldHMgbm90aWZpY2F0aW9uIGlmIG5leHRXb3JrSXRlbUlkIGlzIHNldCBhbmQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICd3b3JrZmxvdycsXG4gICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtSWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBuZXh0V29ya0l0ZW1UeXBlOiAnQXBwcm92YWwnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbih3b3JrSXRlbVNlcnZpY2UsICdpc1N1cHBvcnRlZFdvcmtJdGVtVHlwZScpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLmhhbmRsZVF1aWNrTGlua0xhdW5jaChuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHJlc3VsdERhdGEpKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qobm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3N0YXlzIG9uIHBhZ2UgYW5kIHNldHMgbm90aWZpY2F0aW9uIGlmIHNlbGVjdElkZW50aXRpZXNGb3JXb3JrZmxvdyBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICd3b3JrZmxvdycsXG4gICAgICAgICAgICAgICAgc2VsZWN0SWRlbnRpdGllc0ZvcldvcmtmbG93OiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLmhhbmRsZVF1aWNrTGlua0xhdW5jaChuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHJlc3VsdERhdGEpKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qobm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgbWVzc2FnZXMgaWYgbmV4dFdvcmtJdGVtSWQgaXMgbm90IHNldCBidXQgd29ya2Zsb3cgaXMgbGF1bmNoZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHREYXRhID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3dvcmtmbG93JyxcbiAgICAgICAgICAgICAgICB3b3JrZmxvd0xhdW5jaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbeyBtZXNzYWdlT3JLZXk6ICdhYmMnfSwgeyBtZXNzYWdlT3JLZXk6ICdkZWYnfV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHF1aWNrTGlua0xhdW5jaFNlcnZpY2UuaGFuZGxlUXVpY2tMaW5rTGF1bmNoKG5ldyBRdWlja0xpbmtMYXVuY2hSZXN1bHQocmVzdWx0RGF0YSkpO1xuICAgICAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2UuY2FsbHMuY291bnQoKSkudG9CZSgyKTtcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLmFkZE1lc3NhZ2UuY2FsbHMuYXJnc0ZvcigwKSkudG9FcXVhbChbcmVzdWx0RGF0YS5tZXNzYWdlc1swXV0pO1xuICAgICAgICAgICAgZXhwZWN0KG5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTWVzc2FnZS5jYWxscy5hcmdzRm9yKDEpKS50b0VxdWFsKFtyZXN1bHREYXRhLm1lc3NhZ2VzWzFdXSk7XG4gICAgICAgICAgICBleHBlY3Qobm90aWZpY2F0aW9uU2VydmljZS50cmlnZ2VyRGlyZWN0aXZlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Vuc3VwcG9ydGVkIGFjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCAoJ2FkZHMgbWVzc2FnZSBhbmQgZG9lcyBub3QgZ28gYW55d2hlcmUgaWYgZXhjZXB0aW9uIGZyb20gbWFwcGluZyBhY3Rpb24gdG8gc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHREYXRhID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3NvbWVkdW1idGhpbmcnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBxdWlja0xpbmtMYXVuY2hTZXJ2aWNlLmhhbmRsZVF1aWNrTGlua0xhdW5jaChuZXcgUXVpY2tMaW5rTGF1bmNoUmVzdWx0KHJlc3VsdERhdGEpKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc3RhdGUuZ28pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qobm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChub3RpZmljYXRpb25TZXJ2aWNlLnRyaWdnZXJEaXJlY3RpdmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
