System.register(['test/js/TestInitializer', 'quickLink/launch/QuickLinkLaunchModule'], function (_export) {

    /**
     * Tests for the QuickLinkActionService
     */
    'use strict';

    var quickLinkLaunchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkLaunchQuickLinkLaunchModule) {
            quickLinkLaunchModule = _quickLinkLaunchQuickLinkLaunchModule['default'];
        }],
        execute: function () {
            describe('QuickLinkActionService', function () {
                var quickLinkActionService;

                beforeEach(module(quickLinkLaunchModule));

                beforeEach(inject(function (_quickLinkActionService_) {
                    quickLinkActionService = _quickLinkActionService_;
                }));

                it('should throw if quickLinkLaunchResult or the action is not available', function () {
                    var launchResult = null;
                    expect(function () {
                        quickLinkActionService.mapAction(launchResult, null);
                    }).toThrow();
                });

                it('should map manageWorkItems action with Approval work item type to myApprovals state', function () {
                    var launchResult = {
                        action: 'manageWorkItems',
                        args: {
                            workItemType: 'Approval'
                        }
                    };

                    expect(quickLinkActionService.mapAction(launchResult, null)).toBe('myApprovals');
                });

                it('should map manageWorkItems action with Form work item type to forms state', function () {
                    var launchResult = {
                        action: 'manageWorkItems',
                        args: {
                            workItemType: 'Form'
                        }
                    };

                    expect(quickLinkActionService.mapAction(launchResult, null)).toBe('forms');
                });

                it('should map managedWorkItems action with ViolationReview work item type to listViolations state', function () {
                    var launchResult = {
                        action: 'manageWorkItems',
                        args: {
                            workItemType: 'ViolationReview'
                        }
                    };

                    expect(quickLinkActionService.mapAction(launchResult, null)).toBe('listViolations');
                });

                it('should map requestAccess action to accessRequest.selectUser state', function () {
                    var launchResult = {
                        action: 'requestAccess'
                    },
                        quickLink = {
                        allowOthers: true
                    };

                    expect(quickLinkActionService.mapAction(launchResult, quickLink)).toBe('accessRequest.selectUser');
                });

                it('should map requestAccess action to accessRequestSelf state', function () {
                    var launchResult = {
                        action: 'requestAccess'
                    },
                        quickLink = {
                        allowOthers: false
                    };

                    expect(quickLinkActionService.mapAction(launchResult, quickLink)).toBe('accessRequestSelf');
                });

                it('should map viewCertifications action to certifications state', function () {
                    var launchResult = {
                        action: 'viewCertifications'
                    };

                    expect(quickLinkActionService.mapAction(launchResult)).toBe('certifications');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rQWN0aW9uU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMsVUFBVSxTQUFTOzs7OztJQUExRzs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTtZQUo3QixTQUFTLDBCQUEwQixZQUFXO2dCQUMxQyxJQUFJOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUywwQkFBMEI7b0JBQ2pELHlCQUF5Qjs7O2dCQUc3QixHQUFHLHdFQUF3RSxZQUFXO29CQUNsRixJQUFJLGVBQWU7b0JBQ25CLE9BQU8sWUFBVzt3QkFDZCx1QkFBdUIsVUFBVSxjQUFjO3VCQUNoRDs7O2dCQUdQLEdBQUcsdUZBQXVGLFlBQVc7b0JBQ2pHLElBQUksZUFBZTt3QkFDWCxRQUFRO3dCQUNSLE1BQU07NEJBQ0YsY0FBYzs7OztvQkFJMUIsT0FBTyx1QkFBdUIsVUFBVSxjQUFjLE9BQU8sS0FBSzs7O2dCQUd0RSxHQUFHLDZFQUE2RSxZQUFXO29CQUN2RixJQUFJLGVBQWU7d0JBQ1gsUUFBUTt3QkFDUixNQUFNOzRCQUNGLGNBQWM7Ozs7b0JBSTFCLE9BQU8sdUJBQXVCLFVBQVUsY0FBYyxPQUFPLEtBQUs7OztnQkFHdEUsR0FBRyxrR0FBa0csWUFBVztvQkFDNUcsSUFBSSxlQUFlO3dCQUNmLFFBQVE7d0JBQ1IsTUFBTTs0QkFDRixjQUFjOzs7O29CQUl0QixPQUFPLHVCQUF1QixVQUFVLGNBQWMsT0FBTyxLQUFLOzs7Z0JBR3RFLEdBQUcscUVBQXFFLFlBQVc7b0JBQy9FLElBQUksZUFBZTt3QkFDWCxRQUFROzt3QkFFWixZQUFZO3dCQUNSLGFBQWE7OztvQkFHckIsT0FBTyx1QkFBdUIsVUFBVSxjQUFjLFlBQVksS0FBSzs7O2dCQUczRSxHQUFHLDhEQUE4RCxZQUFXO29CQUN4RSxJQUFJLGVBQWU7d0JBQ1gsUUFBUTs7d0JBRVosWUFBWTt3QkFDUixhQUFhOzs7b0JBR3JCLE9BQU8sdUJBQXVCLFVBQVUsY0FBYyxZQUFZLEtBQUs7OztnQkFHM0UsR0FBRyxnRUFBZ0UsWUFBTTtvQkFDckUsSUFBSSxlQUFlO3dCQUNmLFFBQVE7OztvQkFHWixPQUFPLHVCQUF1QixVQUFVLGVBQWUsS0FBSzs7Ozs7R0FVakUiLCJmaWxlIjoicXVpY2tMaW5rL2xhdW5jaC9RdWlja0xpbmtBY3Rpb25TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHF1aWNrTGlua0xhdW5jaE1vZHVsZSBmcm9tICdxdWlja0xpbmsvbGF1bmNoL1F1aWNrTGlua0xhdW5jaE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBRdWlja0xpbmtBY3Rpb25TZXJ2aWNlXG4gKi9cbmRlc2NyaWJlKCdRdWlja0xpbmtBY3Rpb25TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHF1aWNrTGlua0FjdGlvblNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShxdWlja0xpbmtMYXVuY2hNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9xdWlja0xpbmtBY3Rpb25TZXJ2aWNlXykge1xuICAgICAgICBxdWlja0xpbmtBY3Rpb25TZXJ2aWNlID0gX3F1aWNrTGlua0FjdGlvblNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgcXVpY2tMaW5rTGF1bmNoUmVzdWx0IG9yIHRoZSBhY3Rpb24gaXMgbm90IGF2YWlsYWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGF1bmNoUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVpY2tMaW5rQWN0aW9uU2VydmljZS5tYXBBY3Rpb24obGF1bmNoUmVzdWx0LCBudWxsKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBtYXAgbWFuYWdlV29ya0l0ZW1zIGFjdGlvbiB3aXRoIEFwcHJvdmFsIHdvcmsgaXRlbSB0eXBlIHRvIG15QXBwcm92YWxzIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsYXVuY2hSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnbWFuYWdlV29ya0l0ZW1zJyxcbiAgICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtVHlwZTogJ0FwcHJvdmFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KHF1aWNrTGlua0FjdGlvblNlcnZpY2UubWFwQWN0aW9uKGxhdW5jaFJlc3VsdCwgbnVsbCkpLnRvQmUoJ215QXBwcm92YWxzJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCBtYW5hZ2VXb3JrSXRlbXMgYWN0aW9uIHdpdGggRm9ybSB3b3JrIGl0ZW0gdHlwZSB0byBmb3JtcyBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGF1bmNoUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogJ21hbmFnZVdvcmtJdGVtcycsXG4gICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KHF1aWNrTGlua0FjdGlvblNlcnZpY2UubWFwQWN0aW9uKGxhdW5jaFJlc3VsdCwgbnVsbCkpLnRvQmUoJ2Zvcm1zJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCBtYW5hZ2VkV29ya0l0ZW1zIGFjdGlvbiB3aXRoIFZpb2xhdGlvblJldmlldyB3b3JrIGl0ZW0gdHlwZSB0byBsaXN0VmlvbGF0aW9ucyBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGF1bmNoUmVzdWx0ID0ge1xuICAgICAgICAgICAgYWN0aW9uOiAnbWFuYWdlV29ya0l0ZW1zJyxcbiAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KHF1aWNrTGlua0FjdGlvblNlcnZpY2UubWFwQWN0aW9uKGxhdW5jaFJlc3VsdCwgbnVsbCkpLnRvQmUoJ2xpc3RWaW9sYXRpb25zJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCByZXF1ZXN0QWNjZXNzIGFjdGlvbiB0byBhY2Nlc3NSZXF1ZXN0LnNlbGVjdFVzZXIgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhdW5jaFJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdyZXF1ZXN0QWNjZXNzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHF1aWNrTGluayA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogdHJ1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QocXVpY2tMaW5rQWN0aW9uU2VydmljZS5tYXBBY3Rpb24obGF1bmNoUmVzdWx0LCBxdWlja0xpbmspKS50b0JlKCdhY2Nlc3NSZXF1ZXN0LnNlbGVjdFVzZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbWFwIHJlcXVlc3RBY2Nlc3MgYWN0aW9uIHRvIGFjY2Vzc1JlcXVlc3RTZWxmIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsYXVuY2hSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAncmVxdWVzdEFjY2VzcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWlja0xpbmsgPSB7XG4gICAgICAgICAgICAgICAgYWxsb3dPdGhlcnM6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChxdWlja0xpbmtBY3Rpb25TZXJ2aWNlLm1hcEFjdGlvbihsYXVuY2hSZXN1bHQsIHF1aWNrTGluaykpLnRvQmUoJ2FjY2Vzc1JlcXVlc3RTZWxmJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1hcCB2aWV3Q2VydGlmaWNhdGlvbnMgYWN0aW9uIHRvIGNlcnRpZmljYXRpb25zIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbGF1bmNoUmVzdWx0ID0ge1xuICAgICAgICAgICAgYWN0aW9uOiAndmlld0NlcnRpZmljYXRpb25zJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChxdWlja0xpbmtBY3Rpb25TZXJ2aWNlLm1hcEFjdGlvbihsYXVuY2hSZXN1bHQpKS50b0JlKCdjZXJ0aWZpY2F0aW9ucycpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
