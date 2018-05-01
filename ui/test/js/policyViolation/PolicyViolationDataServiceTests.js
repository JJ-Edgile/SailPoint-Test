System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('policyViolationDataService', function () {

                var policyViolationDataService = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_policyViolationDataService_) {

                    policyViolationDataService = _policyViolationDataService_;
                }));

                describe('setDecisionConfig', function () {
                    it('sets the decisionConfig in the service', function () {
                        var config = {};
                        policyViolationDataService.setDecisionConfig(config);
                        expect(policyViolationDataService.decisionConfig).toBe(config);
                    });

                    it('sets the available decisions in the tabs', function () {
                        var config = {
                            availableBulkDecisions: [{
                                status: 'Mitigated'
                            }]
                        };
                        spyOn(policyViolationDataService.openTab, 'setAvailableBulkDecisions');
                        spyOn(policyViolationDataService.completeTab, 'setAvailableBulkDecisions');
                        policyViolationDataService.setDecisionConfig(config);
                        expect(policyViolationDataService.openTab.setAvailableBulkDecisions).toHaveBeenCalledWith(config.availableBulkDecisions);
                        expect(policyViolationDataService.completeTab.setAvailableBulkDecisions).toHaveBeenCalledWith(config.availableBulkDecisions);
                    });
                });

                describe('tabs', function () {

                    it('defaults to open tab', function () {
                        expect(policyViolationDataService.currentTab).toBe(policyViolationDataService.openTab);
                    });

                    describe('getCurrentTab()', function () {
                        it('returns the currentTab', function () {
                            expect(policyViolationDataService.getCurrentTab()).toBe(policyViolationDataService.currentTab);
                        });
                    });

                    describe('changeTab()', function () {
                        it('calls through to data service to set the current tab', function () {
                            policyViolationDataService.changeTab(policyViolationDataService.completeTab);
                            expect(policyViolationDataService.getCurrentTab()).toBe(policyViolationDataService.completeTab);
                        });
                    });

                    describe('getTabs()', function () {
                        it('returns the two tabs', function () {
                            expect(policyViolationDataService.getTabs()).toEqual([policyViolationDataService.openTab, policyViolationDataService.completeTab]);
                        });
                    });

                    describe('tab counts', function () {
                        beforeEach(function () {
                            policyViolationDataService.statusCountMap = {
                                Open: 2,
                                Remediated: 5
                            };
                        });

                        it('gets the tab count for the given tab', function () {
                            spyOn(policyViolationDataService.completeTab, 'getCount').and.callThrough();
                            var tabCount = policyViolationDataService.getTabCount(policyViolationDataService.completeTab);
                            expect(policyViolationDataService.completeTab.getCount).toHaveBeenCalled();
                            expect(tabCount).toEqual(5);
                        });
                    });

                    describe('initializeCurrentTab', function () {
                        function testInitializeCurrentTab(counts, currentTab, expectedTab) {
                            policyViolationDataService.statusCountMap = counts;
                            policyViolationDataService.currentTab = currentTab;
                            policyViolationDataService.initializeCurrentTab();
                            expect(policyViolationDataService.currentTab).toBe(expectedTab);
                        }

                        it('changes to complete tab if open tab is empty and complete tab is not', function () {
                            var counts = {
                                Open: 0,
                                Remediated: 5
                            };
                            testInitializeCurrentTab(counts, policyViolationDataService.openTab, policyViolationDataService.completeTab);
                        });

                        it('stays on open tab if both tabs are empty', function () {
                            var counts = {
                                Open: 0,
                                Remediated: 0
                            };
                            testInitializeCurrentTab(counts, policyViolationDataService.openTab, policyViolationDataService.openTab);
                        });

                        it('stays on open tab if not empty', function () {
                            var counts = {
                                Open: 5,
                                Remediated: 5
                            };
                            testInitializeCurrentTab(counts, policyViolationDataService.openTab, policyViolationDataService.openTab);
                        });

                        it('stays on complete tab if current', function () {
                            var counts = {
                                Open: 5,
                                Remediated: 0
                            };
                            testInitializeCurrentTab(counts, policyViolationDataService.completeTab, policyViolationDataService.completeTab);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7SUFHckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsOEJBQThCLFlBQU07O2dCQUV6QyxJQUFJLDZCQUEwQjs7Z0JBRTlCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDhCQUFpQzs7b0JBRWhELDZCQUE2Qjs7O2dCQUlqQyxTQUFTLHFCQUFxQixZQUFNO29CQUNoQyxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxJQUFJLFNBQVM7d0JBQ2IsMkJBQTJCLGtCQUFrQjt3QkFDN0MsT0FBTywyQkFBMkIsZ0JBQWdCLEtBQUs7OztvQkFHM0QsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsSUFBSSxTQUFTOzRCQUNULHdCQUF3QixDQUFDO2dDQUNyQixRQUFROzs7d0JBR2hCLE1BQU0sMkJBQTJCLFNBQVM7d0JBQzFDLE1BQU0sMkJBQTJCLGFBQWE7d0JBQzlDLDJCQUEyQixrQkFBa0I7d0JBQzdDLE9BQU8sMkJBQTJCLFFBQVEsMkJBQ3JDLHFCQUFxQixPQUFPO3dCQUNqQyxPQUFPLDJCQUEyQixZQUFZLDJCQUN6QyxxQkFBcUIsT0FBTzs7OztnQkFJekMsU0FBUyxRQUFRLFlBQU07O29CQUVuQixHQUFHLHdCQUF3QixZQUFNO3dCQUM3QixPQUFPLDJCQUEyQixZQUFZLEtBQUssMkJBQTJCOzs7b0JBR2xGLFNBQVMsbUJBQW1CLFlBQU07d0JBQzlCLEdBQUcsMEJBQTBCLFlBQU07NEJBQy9CLE9BQU8sMkJBQTJCLGlCQUFpQixLQUFLLDJCQUEyQjs7OztvQkFJM0YsU0FBUyxlQUFlLFlBQU07d0JBQzFCLEdBQUcsd0RBQXdELFlBQU07NEJBQzdELDJCQUEyQixVQUFVLDJCQUEyQjs0QkFDaEUsT0FBTywyQkFBMkIsaUJBQWlCLEtBQUssMkJBQTJCOzs7O29CQUkzRixTQUFTLGFBQWEsWUFBTTt3QkFDeEIsR0FBRyx3QkFBd0IsWUFBTTs0QkFDN0IsT0FBTywyQkFBMkIsV0FBVyxRQUN6QyxDQUFDLDJCQUEyQixTQUFTLDJCQUEyQjs7OztvQkFJNUUsU0FBUyxjQUFjLFlBQU07d0JBQ3pCLFdBQVcsWUFBTTs0QkFDYiwyQkFBMkIsaUJBQWlCO2dDQUN4QyxNQUFNO2dDQUNOLFlBQVk7Ozs7d0JBSXBCLEdBQUcsd0NBQXdDLFlBQU07NEJBQzdDLE1BQU0sMkJBQTJCLGFBQWEsWUFBWSxJQUFJOzRCQUM5RCxJQUFJLFdBQVcsMkJBQTJCLFlBQVksMkJBQTJCOzRCQUNqRixPQUFPLDJCQUEyQixZQUFZLFVBQVU7NEJBQ3hELE9BQU8sVUFBVSxRQUFROzs7O29CQUlqQyxTQUFTLHdCQUF3QixZQUFNO3dCQUNuQyxTQUFTLHlCQUF5QixRQUFRLFlBQVksYUFBYTs0QkFDL0QsMkJBQTJCLGlCQUFpQjs0QkFDNUMsMkJBQTJCLGFBQWE7NEJBQ3hDLDJCQUEyQjs0QkFDM0IsT0FBTywyQkFBMkIsWUFBWSxLQUFLOzs7d0JBR3ZELEdBQUcsd0VBQXdFLFlBQU07NEJBQzdFLElBQUksU0FBUztnQ0FDVCxNQUFNO2dDQUNOLFlBQVk7OzRCQUVoQix5QkFBeUIsUUFDckIsMkJBQTJCLFNBQzNCLDJCQUEyQjs7O3dCQUduQyxHQUFHLDRDQUE0QyxZQUFNOzRCQUNqRCxJQUFJLFNBQVM7Z0NBQ1QsTUFBTTtnQ0FDTixZQUFZOzs0QkFFaEIseUJBQXlCLFFBQ3JCLDJCQUEyQixTQUMzQiwyQkFBMkI7Ozt3QkFHbkMsR0FBRyxrQ0FBa0MsWUFBTTs0QkFDdkMsSUFBSSxTQUFTO2dDQUNULE1BQU07Z0NBQ04sWUFBWTs7NEJBRWhCLHlCQUF5QixRQUNyQiwyQkFBMkIsU0FDM0IsMkJBQTJCOzs7d0JBR25DLEdBQUcsb0NBQW9DLFlBQU07NEJBQ3pDLElBQUksU0FBUztnQ0FDVCxNQUFNO2dDQUNOLFlBQVk7OzRCQUVoQix5QkFBeUIsUUFDckIsMkJBQTJCLGFBQzNCLDJCQUEyQjs7Ozs7OztHQUU1QyIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25Nb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZScsICgpID0+IHtcblxuICAgIGxldCBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9wb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZV8pID0+IHtcblxuICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZV87XG5cbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnc2V0RGVjaXNpb25Db25maWcnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIHRoZSBkZWNpc2lvbkNvbmZpZyBpbiB0aGUgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7fTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLnNldERlY2lzaW9uQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25Db25maWcpLnRvQmUoY29uZmlnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGF2YWlsYWJsZSBkZWNpc2lvbnMgaW4gdGhlIHRhYnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ01pdGlnYXRlZCdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIsICdzZXRBdmFpbGFibGVCdWxrRGVjaXNpb25zJyk7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYiwgJ3NldEF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMnKTtcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLnNldERlY2lzaW9uQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYi5zZXRBdmFpbGFibGVCdWxrRGVjaXNpb25zKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25maWcuYXZhaWxhYmxlQnVsa0RlY2lzaW9ucyk7XG4gICAgICAgICAgICBleHBlY3QocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIuc2V0QXZhaWxhYmxlQnVsa0RlY2lzaW9ucylcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29uZmlnLmF2YWlsYWJsZUJ1bGtEZWNpc2lvbnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0YWJzJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBvcGVuIHRhYicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiKS50b0JlKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ2V0Q3VycmVudFRhYigpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybnMgdGhlIGN1cnJlbnRUYWInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmdldEN1cnJlbnRUYWIoKSkudG9CZShwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jdXJyZW50VGFiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2hhbmdlVGFiKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBkYXRhIHNlcnZpY2UgdG8gc2V0IHRoZSBjdXJyZW50IHRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jaGFuZ2VUYWIocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5nZXRDdXJyZW50VGFiKCkpLnRvQmUocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRUYWJzKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgncmV0dXJucyB0aGUgdHdvIHRhYnMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmdldFRhYnMoKSkudG9FcXVhbChcbiAgICAgICAgICAgICAgICAgICAgW3BvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIsIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3RhYiBjb3VudHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5zdGF0dXNDb3VudE1hcCA9IHtcbiAgICAgICAgICAgICAgICAgICAgT3BlbjogMixcbiAgICAgICAgICAgICAgICAgICAgUmVtZWRpYXRlZDogNVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2dldHMgdGhlIHRhYiBjb3VudCBmb3IgdGhlIGdpdmVuIHRhYicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYiwgJ2dldENvdW50JykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICAgICAgbGV0IHRhYkNvdW50ID0gcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZ2V0VGFiQ291bnQocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYi5nZXRDb3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0YWJDb3VudCkudG9FcXVhbCg1KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZUN1cnJlbnRUYWInLCAoKSA9PiB7XG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0SW5pdGlhbGl6ZUN1cnJlbnRUYWIoY291bnRzLCBjdXJyZW50VGFiLCBleHBlY3RlZFRhYikge1xuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLnN0YXR1c0NvdW50TWFwID0gY291bnRzO1xuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmN1cnJlbnRUYWIgPSBjdXJyZW50VGFiO1xuICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemVDdXJyZW50VGFiKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmN1cnJlbnRUYWIpLnRvQmUoZXhwZWN0ZWRUYWIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdCgnY2hhbmdlcyB0byBjb21wbGV0ZSB0YWIgaWYgb3BlbiB0YWIgaXMgZW1wdHkgYW5kIGNvbXBsZXRlIHRhYiBpcyBub3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgT3BlbjogMCxcbiAgICAgICAgICAgICAgICAgICAgUmVtZWRpYXRlZDogNVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGVzdEluaXRpYWxpemVDdXJyZW50VGFiKGNvdW50cyxcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYixcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuY29tcGxldGVUYWIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzdGF5cyBvbiBvcGVuIHRhYiBpZiBib3RoIHRhYnMgYXJlIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIE9wZW46IDAsXG4gICAgICAgICAgICAgICAgICAgIFJlbWVkaWF0ZWQ6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRlc3RJbml0aWFsaXplQ3VycmVudFRhYihjb3VudHMsXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIsXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLm9wZW5UYWIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzdGF5cyBvbiBvcGVuIHRhYiBpZiBub3QgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgT3BlbjogNSxcbiAgICAgICAgICAgICAgICAgICAgUmVtZWRpYXRlZDogNVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGVzdEluaXRpYWxpemVDdXJyZW50VGFiKGNvdW50cyxcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYixcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2Uub3BlblRhYik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3N0YXlzIG9uIGNvbXBsZXRlIHRhYiBpZiBjdXJyZW50JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIE9wZW46IDUsXG4gICAgICAgICAgICAgICAgICAgIFJlbWVkaWF0ZWQ6IDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRlc3RJbml0aWFsaXplQ3VycmVudFRhYihjb3VudHMsXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmNvbXBsZXRlVGFiLFxuICAgICAgICAgICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5jb21wbGV0ZVRhYik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
