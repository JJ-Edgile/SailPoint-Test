System.register(['test/js/TestInitializer', 'test/js/TestModule', 'workitem/WorkItemModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     *
     */
    'use strict';

    var testModule, workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {
            describe('ViolationService', function () {

                var http, violationService, spHttpService, testService, violation;

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Let the tests know we'll use the workitem module.
                beforeEach(module(workItemModule));

                // Set up
                beforeEach(inject(function ($httpBackend, _violationService_, _spHttpService_, _testService_, RequestPolicyViolation, workItemTestData) {
                    http = $httpBackend;
                    violationService = _violationService_;
                    spHttpService = _spHttpService_;
                    testService = _testService_;
                    violation = new RequestPolicyViolation(workItemTestData.workItemTestData1.violations[0]);
                }));

                // Tear down
                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                // helper function to format URL
                function getUrl(workItemId, policy, rule) {
                    return SailPoint.CONTEXT_PATH + '/ui/rest/workItems/' + workItemId + '/violations/' + spHttpService.encodeComponent(policy) + '/' + spHttpService.encodeComponent(rule);
                }

                describe('violation details', function () {
                    it('should form request url from parameter', function () {
                        var workItemId = '1234',
                            policy = 'policy',
                            rule = 'rule';
                        http.expectGET(getUrl(workItemId, policy, rule)).respond(200);
                        violationService.getViolationDetails(workItemId, policy, rule);
                        http.flush();
                    });

                    it('should uri encode spaces and such', function () {
                        var workItemId = '1234',
                            policy = 'policy name',
                            rule = 'rule name';
                        http.expectGET(getUrl(workItemId, policy, rule)).respond(200);
                        violationService.getViolationDetails(workItemId, policy, rule);
                        http.flush();
                    });
                });

                describe('showViolationDialog()', function () {
                    it('should throw if no workItemId parameter', function () {
                        expect(function () {
                            violationService.showViolationDialog(null, {});
                        }).toThrow();
                    });

                    it('should not throw if workItemId is pulled from violation', inject(function (spModal) {
                        var getDeatilsArgs;
                        /* Do not acutally open the modal, just resolve its resolvables */
                        spyOn(spModal, 'open').and.callFake(function (options) {
                            options.resolve.violationDetails();
                        });
                        spyOn(violationService, 'getViolationDetails').and.callFake(angular.noop);

                        expect(function () {
                            violationService.showViolationDialog(null, violation);
                            /* Assert some things about the call to open */
                            expect(spModal.open).toHaveBeenCalled();
                            /* Assert some things about the resolvables */
                            getDeatilsArgs = violationService.getViolationDetails.calls.mostRecent().args;
                            expect(getDeatilsArgs[0]).toBe(violation.workItemId);
                            expect(getDeatilsArgs[1]).toBe(violation.policyName);
                            expect(getDeatilsArgs[2]).toBe(violation.ruleName);
                        }).not.toThrow();
                    }));

                    it('should throw if no PolicyViolation parameter', function () {
                        expect(function () {
                            violationService.showViolationDialog('123', null);
                        }).toThrow();
                    });
                });

                describe('showCommentDialog()', function () {
                    var spModal;
                    beforeEach(inject(function (_spModal_, $q) {
                        spModal = _spModal_;
                        spModal.open = jasmine.createSpy().and.returnValue($q.when());
                    }));

                    it('should call spModal with the correct parameters', function () {
                        var config;
                        violationService.showCommentDialog();
                        expect(spModal.open).toHaveBeenCalled();
                        config = spModal.open.calls.mostRecent().args[0];
                        // Spot check the config
                        expect(config.id).toEqual('violationCommentsDialog');
                        expect(config.title).toEqual('ui_violation_comment_header');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1Zpb2xhdGlvblNlcnZpY2VUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUzs7Ozs7O0lBQ2pIOztJQU9JLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDekUsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSx5QkFBeUI7WUFDbEMsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZO1lBTDdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLE1BQU0sa0JBQWtCLGVBQWUsYUFBYTs7O2dCQUd4RCxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsb0JBQW9CLGlCQUFpQixlQUNuRCx3QkFBd0Isa0JBQWtCO29CQUNqRSxPQUFPO29CQUNQLG1CQUFtQjtvQkFDbkIsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLFlBQVksSUFBSSx1QkFBdUIsaUJBQWlCLGtCQUFrQixXQUFXOzs7O2dCQUl6RixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7OztnQkFJVCxTQUFTLE9BQU8sWUFBWSxRQUFRLE1BQU07b0JBQ3RDLE9BQU8sVUFBVSxlQUFlLHdCQUF3QixhQUFhLGlCQUNqRSxjQUFjLGdCQUFnQixVQUFVLE1BQU0sY0FBYyxnQkFBZ0I7OztnQkFHcEYsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxhQUFhOzRCQUNiLFNBQVM7NEJBQ1QsT0FBTzt3QkFDWCxLQUFLLFVBQVUsT0FBTyxZQUFZLFFBQVEsT0FBTyxRQUFRO3dCQUN6RCxpQkFBaUIsb0JBQW9CLFlBQVksUUFBUTt3QkFDekQsS0FBSzs7O29CQUdULEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLElBQUksYUFBYTs0QkFDYixTQUFTOzRCQUNULE9BQU87d0JBQ1gsS0FBSyxVQUFVLE9BQU8sWUFBWSxRQUFRLE9BQU8sUUFBUTt3QkFDekQsaUJBQWlCLG9CQUFvQixZQUFZLFFBQVE7d0JBQ3pELEtBQUs7Ozs7Z0JBSWIsU0FBUyx5QkFBeUIsWUFBVztvQkFDekMsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsT0FBTyxZQUFXOzRCQUNkLGlCQUFpQixvQkFBb0IsTUFBTTsyQkFDNUM7OztvQkFHUCxHQUFHLDJEQUNDLE9BQU8sVUFBUyxTQUFTO3dCQUNyQixJQUFJOzt3QkFFSixNQUFNLFNBQVMsUUFBUSxJQUFJLFNBQVMsVUFBUyxTQUFTOzRCQUNsRCxRQUFRLFFBQVE7O3dCQUVwQixNQUFNLGtCQUFrQix1QkFBdUIsSUFBSSxTQUFTLFFBQVE7O3dCQUVwRSxPQUFPLFlBQVc7NEJBQ2QsaUJBQWlCLG9CQUFvQixNQUFNOzs0QkFFM0MsT0FBTyxRQUFRLE1BQU07OzRCQUVyQixpQkFBaUIsaUJBQWlCLG9CQUFvQixNQUFNLGFBQWE7NEJBQ3pFLE9BQU8sZUFBZSxJQUFJLEtBQUssVUFBVTs0QkFDekMsT0FBTyxlQUFlLElBQUksS0FBSyxVQUFVOzRCQUN6QyxPQUFPLGVBQWUsSUFBSSxLQUFLLFVBQVU7MkJBQzFDLElBQUk7OztvQkFHZixHQUFHLGdEQUFnRCxZQUFXO3dCQUMxRCxPQUFPLFlBQVc7NEJBQ2QsaUJBQWlCLG9CQUFvQixPQUFPOzJCQUM3Qzs7OztnQkFJWCxTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxJQUFJO29CQUNKLFdBQVcsT0FBTyxVQUFTLFdBQVcsSUFBSTt3QkFDdEMsVUFBVTt3QkFDVixRQUFRLE9BQU8sUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHOzs7b0JBRzFELEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELElBQUk7d0JBQ0osaUJBQWlCO3dCQUNqQixPQUFPLFFBQVEsTUFBTTt3QkFDckIsU0FBUyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUs7O3dCQUU5QyxPQUFPLE9BQU8sSUFBSSxRQUFRO3dCQUMxQixPQUFPLE9BQU8sT0FBTyxRQUFROzs7Ozs7R0FTdEMiLCJmaWxlIjoid29ya2l0ZW0vVmlvbGF0aW9uU2VydmljZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcblxuLyoqXG4gKlxuICovXG5kZXNjcmliZSgnVmlvbGF0aW9uU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGh0dHAsIHZpb2xhdGlvblNlcnZpY2UsIHNwSHR0cFNlcnZpY2UsIHRlc3RTZXJ2aWNlLCB2aW9sYXRpb247XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHdvcmtpdGVtIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbU1vZHVsZSkpO1xuXG4gICAgLy8gU2V0IHVwXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGh0dHBCYWNrZW5kLCBfdmlvbGF0aW9uU2VydmljZV8sIF9zcEh0dHBTZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXF1ZXN0UG9saWN5VmlvbGF0aW9uLCB3b3JrSXRlbVRlc3REYXRhKSB7XG4gICAgICAgIGh0dHAgPSAkaHR0cEJhY2tlbmQ7XG4gICAgICAgIHZpb2xhdGlvblNlcnZpY2UgPSBfdmlvbGF0aW9uU2VydmljZV87XG4gICAgICAgIHNwSHR0cFNlcnZpY2UgPSBfc3BIdHRwU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgdmlvbGF0aW9uID0gbmV3IFJlcXVlc3RQb2xpY3lWaW9sYXRpb24od29ya0l0ZW1UZXN0RGF0YS53b3JrSXRlbVRlc3REYXRhMS52aW9sYXRpb25zWzBdKTtcbiAgICB9KSk7XG5cbiAgICAvLyBUZWFyIGRvd25cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiB0byBmb3JtYXQgVVJMXG4gICAgZnVuY3Rpb24gZ2V0VXJsKHdvcmtJdGVtSWQsIHBvbGljeSwgcnVsZSkge1xuICAgICAgICByZXR1cm4gU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICcvdWkvcmVzdC93b3JrSXRlbXMvJyArIHdvcmtJdGVtSWQgKyAnL3Zpb2xhdGlvbnMvJyArXG4gICAgICAgICAgICBzcEh0dHBTZXJ2aWNlLmVuY29kZUNvbXBvbmVudChwb2xpY3kpICsgJy8nICsgc3BIdHRwU2VydmljZS5lbmNvZGVDb21wb25lbnQocnVsZSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3Zpb2xhdGlvbiBkZXRhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZm9ybSByZXF1ZXN0IHVybCBmcm9tIHBhcmFtZXRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHdvcmtJdGVtSWQgPSAnMTIzNCcsXG4gICAgICAgICAgICAgICAgcG9saWN5ID0gJ3BvbGljeScsXG4gICAgICAgICAgICAgICAgcnVsZSA9ICdydWxlJztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGdldFVybCh3b3JrSXRlbUlkLCBwb2xpY3ksIHJ1bGUpKS5yZXNwb25kKDIwMCk7XG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLmdldFZpb2xhdGlvbkRldGFpbHMod29ya0l0ZW1JZCwgcG9saWN5LCBydWxlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1cmkgZW5jb2RlIHNwYWNlcyBhbmQgc3VjaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHdvcmtJdGVtSWQgPSAnMTIzNCcsXG4gICAgICAgICAgICAgICAgcG9saWN5ID0gJ3BvbGljeSBuYW1lJyxcbiAgICAgICAgICAgICAgICBydWxlID0gJ3J1bGUgbmFtZSc7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChnZXRVcmwod29ya0l0ZW1JZCwgcG9saWN5LCBydWxlKSkucmVzcG9uZCgyMDApO1xuICAgICAgICAgICAgdmlvbGF0aW9uU2VydmljZS5nZXRWaW9sYXRpb25EZXRhaWxzKHdvcmtJdGVtSWQsIHBvbGljeSwgcnVsZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dWaW9sYXRpb25EaWFsb2coKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIHdvcmtJdGVtSWQgcGFyYW1ldGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uU2VydmljZS5zaG93VmlvbGF0aW9uRGlhbG9nKG51bGwsIHt9KTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgaWYgd29ya0l0ZW1JZCBpcyBwdWxsZWQgZnJvbSB2aW9sYXRpb24nLFxuICAgICAgICAgICAgaW5qZWN0KGZ1bmN0aW9uKHNwTW9kYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0RGVhdGlsc0FyZ3M7XG4gICAgICAgICAgICAgICAgLyogRG8gbm90IGFjdXRhbGx5IG9wZW4gdGhlIG1vZGFsLCBqdXN0IHJlc29sdmUgaXRzIHJlc29sdmFibGVzICovXG4gICAgICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnJlc29sdmUudmlvbGF0aW9uRGV0YWlscygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNweU9uKHZpb2xhdGlvblNlcnZpY2UsICdnZXRWaW9sYXRpb25EZXRhaWxzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpb2xhdGlvblNlcnZpY2Uuc2hvd1Zpb2xhdGlvbkRpYWxvZyhudWxsLCB2aW9sYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAvKiBBc3NlcnQgc29tZSB0aGluZ3MgYWJvdXQgdGhlIGNhbGwgdG8gb3BlbiAqL1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8qIEFzc2VydCBzb21lIHRoaW5ncyBhYm91dCB0aGUgcmVzb2x2YWJsZXMgKi9cbiAgICAgICAgICAgICAgICAgICAgZ2V0RGVhdGlsc0FyZ3MgPSB2aW9sYXRpb25TZXJ2aWNlLmdldFZpb2xhdGlvbkRldGFpbHMuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChnZXREZWF0aWxzQXJnc1swXSkudG9CZSh2aW9sYXRpb24ud29ya0l0ZW1JZCk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChnZXREZWF0aWxzQXJnc1sxXSkudG9CZSh2aW9sYXRpb24ucG9saWN5TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChnZXREZWF0aWxzQXJnc1syXSkudG9CZSh2aW9sYXRpb24ucnVsZU5hbWUpO1xuICAgICAgICAgICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBQb2xpY3lWaW9sYXRpb24gcGFyYW1ldGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uU2VydmljZS5zaG93VmlvbGF0aW9uRGlhbG9nKCcxMjMnLCBudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0NvbW1lbnREaWFsb2coKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3BNb2RhbDtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwTW9kYWxfLCAkcSkge1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgICAgIHNwTW9kYWwub3BlbiA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc3BNb2RhbCB3aXRoIHRoZSBjb3JyZWN0IHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb25maWc7XG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlLnNob3dDb21tZW50RGlhbG9nKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBjb25maWcgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XG4gICAgICAgICAgICAvLyBTcG90IGNoZWNrIHRoZSBjb25maWdcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcuaWQpLnRvRXF1YWwoJ3Zpb2xhdGlvbkNvbW1lbnRzRGlhbG9nJyk7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnRpdGxlKS50b0VxdWFsKCd1aV92aW9sYXRpb25fY29tbWVudF9oZWFkZXInKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
