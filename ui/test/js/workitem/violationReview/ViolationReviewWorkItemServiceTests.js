System.register(['test/js/TestInitializer', 'workitem/violationReview/ViolationReviewModule', 'test/js/workitem/WorkItemTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var violationReviewModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemViolationReviewViolationReviewModule) {
            violationReviewModule = _workitemViolationReviewViolationReviewModule['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}],
        execute: function () {

            /**
             * Tests for the ViolationReviewWorkItemService.
             */
            describe('ViolationReviewWorkItemService', function () {

                var violationReviewWorkItemService, $httpBackend, workItemTestData;

                beforeEach(module(violationReviewModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_$httpBackend_, _violationReviewWorkItemService_, _workItemTestData_) {
                    $httpBackend = _$httpBackend_;
                    violationReviewWorkItemService = _violationReviewWorkItemService_;
                    workItemTestData = _workItemTestData_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('resolveViolations()', function () {
                    it('should patch to the correct end point with the correct parameters', function () {
                        var workItemId = workItemTestData.workItemTestData1.id,
                            rejectedItems = ['1', '2'],
                            resubmitUrl = createViolationReviewURL(workItemId);
                        $httpBackend.expectPATCH(resubmitUrl, {
                            violationReviewDecision: 'remediate',
                            rejectedApprovalItems: rejectedItems
                        }).respond(200, {});
                        violationReviewWorkItemService.resolveViolations(workItemId, rejectedItems);
                        $httpBackend.flush();
                    });
                });

                describe('submitWithViolations()', function () {
                    var workItemId, resubmitUrl;

                    beforeEach(function () {
                        workItemId = workItemTestData.workItemTestData1.id;
                        resubmitUrl = createViolationReviewURL(workItemId);
                    });

                    it('should send completion comment when specified', function () {
                        var comment = 'this is a comment';

                        $httpBackend.expectPATCH(resubmitUrl, {
                            violationReviewDecision: 'ignore',
                            completionComments: comment
                        }).respond(200, {});
                        violationReviewWorkItemService.submitWithViolations(workItemId, comment);
                        $httpBackend.flush();
                    });

                    it('should not send completionComments when specified', function () {
                        $httpBackend.expectPATCH(resubmitUrl, {
                            violationReviewDecision: 'ignore'
                        }).respond(200, {});
                        violationReviewWorkItemService.submitWithViolations(workItemId);
                        $httpBackend.flush();
                    });
                });

                describe('getWorkItems()', function () {
                    function createGetURL(start, limit) {
                        return '/identityiq/ui/rest/workItems/?limit=' + limit + '&start=' + start + '&type=ViolationReview';
                    }

                    it('should make a GET request to the backend', function () {
                        var getURL = createGetURL(0, 5);

                        $httpBackend.expectGET(getURL).respond(200, {});
                        violationReviewWorkItemService.getWorkItems(0, 5);
                        $httpBackend.flush();
                    });

                    it('should default to start=0 and limit=12 if no params are provided', function () {
                        var getURL = createGetURL(0, 12);

                        $httpBackend.expectGET(getURL).respond(200, {});
                        violationReviewWorkItemService.getWorkItems();
                        $httpBackend.flush();
                    });
                });

                function createViolationReviewURL(workItemId) {
                    return '/identityiq/ui/rest/workItems/' + workItemId + '/violationReviews';
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0RBQWtELHNDQUFzQyxVQUFVLFNBQVM7O0lBQ3ZKOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcsd0JBQXdCLDhDQUE4QztXQUN2RSxVQUFVLGlDQUFpQztRQUM5QyxTQUFTLFlBQVk7Ozs7O1lBQzdCLFNBQVMsa0NBQWtDLFlBQVc7O2dCQUVsRCxJQUFJLGdDQUFnQyxjQUFjOztnQkFFbEQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxnQkFBZ0Isa0NBQWtDLG9CQUFvQjtvQkFDN0YsZUFBZTtvQkFDZixpQ0FBaUM7b0JBQ2pDLG1CQUFtQjs7O2dCQUd2QixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxHQUFHLHFFQUFxRSxZQUFXO3dCQUMvRSxJQUFJLGFBQWEsaUJBQWlCLGtCQUFrQjs0QkFDaEQsZ0JBQWdCLENBQUMsS0FBSzs0QkFDdEIsY0FBYyx5QkFBeUI7d0JBQzNDLGFBQWEsWUFBWSxhQUFhOzRCQUNsQyx5QkFBeUI7NEJBQ3pCLHVCQUF1QjsyQkFDeEIsUUFBUSxLQUFLO3dCQUNoQiwrQkFBK0Isa0JBQWtCLFlBQVk7d0JBQzdELGFBQWE7Ozs7Z0JBSXJCLFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLElBQUksWUFBWTs7b0JBRWhCLFdBQVcsWUFBVzt3QkFDbEIsYUFBYSxpQkFBaUIsa0JBQWtCO3dCQUNoRCxjQUFjLHlCQUF5Qjs7O29CQUczQyxHQUFHLGlEQUFpRCxZQUFXO3dCQUMzRCxJQUFJLFVBQVU7O3dCQUVkLGFBQWEsWUFBWSxhQUFhOzRCQUNsQyx5QkFBeUI7NEJBQ3pCLG9CQUFvQjsyQkFDckIsUUFBUSxLQUFLO3dCQUNoQiwrQkFBK0IscUJBQXFCLFlBQVk7d0JBQ2hFLGFBQWE7OztvQkFHakIsR0FBRyxxREFBcUQsWUFBVzt3QkFDL0QsYUFBYSxZQUFZLGFBQWE7NEJBQ2xDLHlCQUF5QjsyQkFDMUIsUUFBUSxLQUFLO3dCQUNoQiwrQkFBK0IscUJBQXFCO3dCQUNwRCxhQUFhOzs7O2dCQUtyQixTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxTQUFTLGFBQWEsT0FBTyxPQUFPO3dCQUNoQyxPQUFPLDBDQUEwQyxRQUFRLFlBQVksUUFBUTs7O29CQUdqRixHQUFHLDRDQUE0QyxZQUFXO3dCQUN0RCxJQUFJLFNBQVMsYUFBYSxHQUFHOzt3QkFFN0IsYUFBYSxVQUFVLFFBQVEsUUFBUSxLQUFLO3dCQUM1QywrQkFBK0IsYUFBYSxHQUFHO3dCQUMvQyxhQUFhOzs7b0JBR2pCLEdBQUcsb0VBQW9FLFlBQVc7d0JBQzlFLElBQUksU0FBUyxhQUFhLEdBQUc7O3dCQUU3QixhQUFhLFVBQVUsUUFBUSxRQUFRLEtBQUs7d0JBQzVDLCtCQUErQjt3QkFDL0IsYUFBYTs7OztnQkFJckIsU0FBUyx5QkFBeUIsWUFBWTtvQkFDMUMsT0FBTyxtQ0FBbUMsYUFBYTs7Ozs7R0FRNUQiLCJmaWxlIjoid29ya2l0ZW0vdmlvbGF0aW9uUmV2aWV3L1Zpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE1IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHZpb2xhdGlvblJldmlld01vZHVsZSBmcm9tICd3b3JraXRlbS92aW9sYXRpb25SZXZpZXcvVmlvbGF0aW9uUmV2aWV3TW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy93b3JraXRlbS9Xb3JrSXRlbVRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1Zpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZSwgJGh0dHBCYWNrZW5kLCB3b3JrSXRlbVRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodmlvbGF0aW9uUmV2aWV3TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRodHRwQmFja2VuZF8sIF92aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2VfLCBfd29ya0l0ZW1UZXN0RGF0YV8pIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZSA9IF92aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2VfO1xuICAgICAgICB3b3JrSXRlbVRlc3REYXRhID0gX3dvcmtJdGVtVGVzdERhdGFfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXNvbHZlVmlvbGF0aW9ucygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcGF0Y2ggdG8gdGhlIGNvcnJlY3QgZW5kIHBvaW50IHdpdGggdGhlIGNvcnJlY3QgcGFyYW1ldGVycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHdvcmtJdGVtSWQgPSB3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExLmlkLFxuICAgICAgICAgICAgICAgIHJlamVjdGVkSXRlbXMgPSBbJzEnLCAnMiddLFxuICAgICAgICAgICAgICAgIHJlc3VibWl0VXJsID0gY3JlYXRlVmlvbGF0aW9uUmV2aWV3VVJMKHdvcmtJdGVtSWQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBBVENIKHJlc3VibWl0VXJsLCB7XG4gICAgICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3RGVjaXNpb246ICdyZW1lZGlhdGUnLFxuICAgICAgICAgICAgICAgIHJlamVjdGVkQXBwcm92YWxJdGVtczogcmVqZWN0ZWRJdGVtc1xuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHt9KTtcbiAgICAgICAgICAgIHZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5yZXNvbHZlVmlvbGF0aW9ucyh3b3JrSXRlbUlkLCByZWplY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXRXaXRoVmlvbGF0aW9ucygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3b3JrSXRlbUlkLCByZXN1Ym1pdFVybDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd29ya0l0ZW1JZCA9IHdvcmtJdGVtVGVzdERhdGEud29ya0l0ZW1UZXN0RGF0YTEuaWQ7XG4gICAgICAgICAgICByZXN1Ym1pdFVybCA9IGNyZWF0ZVZpb2xhdGlvblJldmlld1VSTCh3b3JrSXRlbUlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZW5kIGNvbXBsZXRpb24gY29tbWVudCB3aGVuIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSAndGhpcyBpcyBhIGNvbW1lbnQnO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UEFUQ0gocmVzdWJtaXRVcmwsIHtcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdEZWNpc2lvbjogJ2lnbm9yZScsXG4gICAgICAgICAgICAgICAgY29tcGxldGlvbkNvbW1lbnRzOiBjb21tZW50XG4gICAgICAgICAgICB9KS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLnN1Ym1pdFdpdGhWaW9sYXRpb25zKHdvcmtJdGVtSWQsIGNvbW1lbnQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHNlbmQgY29tcGxldGlvbkNvbW1lbnRzIHdoZW4gc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UEFUQ0gocmVzdWJtaXRVcmwsIHtcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdEZWNpc2lvbjogJ2lnbm9yZSdcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2Uuc3VibWl0V2l0aFZpb2xhdGlvbnMod29ya0l0ZW1JZCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXRXb3JrSXRlbXMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVHZXRVUkwoc3RhcnQsIGxpbWl0KSB7XG4gICAgICAgICAgICByZXR1cm4gJy9pZGVudGl0eWlxL3VpL3Jlc3Qvd29ya0l0ZW1zLz9saW1pdD0nICsgbGltaXQgKyAnJnN0YXJ0PScgKyBzdGFydCArICcmdHlwZT1WaW9sYXRpb25SZXZpZXcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBtYWtlIGEgR0VUIHJlcXVlc3QgdG8gdGhlIGJhY2tlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBnZXRVUkwgPSBjcmVhdGVHZXRVUkwoMCwgNSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZ2V0VVJMKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtcygwLCA1KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlZmF1bHQgdG8gc3RhcnQ9MCBhbmQgbGltaXQ9MTIgaWYgbm8gcGFyYW1zIGFyZSBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGdldFVSTCA9IGNyZWF0ZUdldFVSTCgwLCAxMik7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZ2V0VVJMKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgdmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtcygpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVmlvbGF0aW9uUmV2aWV3VVJMKHdvcmtJdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuICcvaWRlbnRpdHlpcS91aS9yZXN0L3dvcmtJdGVtcy8nICsgd29ya0l0ZW1JZCArICcvdmlvbGF0aW9uUmV2aWV3cyc7XG4gICAgfVxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
