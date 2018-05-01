System.register(['test/js/TestInitializer', 'workitem/WorkItemModule', 'workitem/pamApproval/PamApprovalModule', 'workitem/pamApproval/PamApprovalWorkItemRegistrar', 'test/js/workitem/WorkItemTestData', 'test/js/workitem/pamApproval/PamTestData'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the WorkItemTemplateService.
     */
    'use strict';

    var workItemModule, pamApprovalModule, pamApprovalWorkItemRegistrar, PAM_TEST_DATA;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }, function (_workitemPamApprovalPamApprovalWorkItemRegistrar) {
            pamApprovalWorkItemRegistrar = _workitemPamApprovalPamApprovalWorkItemRegistrar['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}, function (_testJsWorkitemPamApprovalPamTestData) {
            PAM_TEST_DATA = _testJsWorkitemPamApprovalPamTestData['default'];
        }],
        execute: function () {
            describe('WorkItemTemplateService', function () {

                var WorkItem, ViolationReviewWorkItem, WorkItemTemplateService, Approval, PamApproval, $rootScope, workItemTestData;

                beforeEach(module(workItemModule, pamApprovalModule));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_workItemTemplateService_, _WorkItem_, _ViolationReviewWorkItem_, _$rootScope_, _workItemTestData_, _PamApproval_, _Approval_) {
                    WorkItemTemplateService = _workItemTemplateService_;
                    WorkItem = _WorkItem_;
                    ViolationReviewWorkItem = _ViolationReviewWorkItem_;
                    $rootScope = _$rootScope_;
                    workItemTestData = _workItemTestData_;
                    Approval = _Approval_;
                    PamApproval = _PamApproval_;
                }));

                function testTemplate(workItem, expectedTemplate) {
                    var template;
                    spyOn(WorkItemTemplateService, 'getTemplate').and.callThrough();
                    template = WorkItemTemplateService.getTemplate(workItem);
                    expect(WorkItemTemplateService.getTemplate).toHaveBeenCalledWith(workItem);
                    expect(template).toEqual(expectedTemplate);
                }

                it('get form work item template', function () {
                    var template = '<div class="form-work-item-container">' + '  <div class="form-work-item-row">' + '    <sp-work-item-form sp-work-item="workItem"' + '                       sp-template-style="{{templateStyle}}"' + '                       sp-completion-callback="completionCallback" />' + '  </div>' + '</div>';
                    testTemplate(new WorkItem(workItemTestData.workItemTestData4), template);
                });

                it('get violation review work item template', function () {
                    var template = '<sp-violation-review-work-item sp-workitem="workItem" ' + 'sp-completion-callback="completionCallback" ' + 'sp-template-style="{{templateStyle}}" />';
                    testTemplate(new ViolationReviewWorkItem(workItemTestData.workItemTestData1), template);
                });

                it('get approval work item template', function () {
                    var template = '<sp-approval sp-approval="workItem" ' + 'sp-completion-callback="completionCallback" ' + 'sp-template-style="{{templateStyle}}" ' + 'sp-index="index" />';
                    testTemplate(new Approval(workItemTestData.APPROVAL), template);
                });

                it('get PAM approval work item template', function () {
                    testTemplate(new PamApproval(PAM_TEST_DATA.approval), pamApprovalWorkItemRegistrar.PAM_APPROVAL_TEMPLATE);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLDBDQUEwQyxxREFBcUQscUNBQXFDLDZDQUE2QyxVQUFVLFNBQVM7Ozs7OztJQUMzUTs7SUFPSSxJQUFJLGdCQUFnQixtQkFBbUIsOEJBQThCO0lBQ3JFLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsdUNBQXVDO1lBQ2hELG9CQUFvQixzQ0FBc0M7V0FDM0QsVUFBVSxrREFBa0Q7WUFDM0QsK0JBQStCLGlEQUFpRDtXQUNqRixVQUFVLGlDQUFpQyxJQUFJLFVBQVUsdUNBQXVDO1lBQy9GLGdCQUFnQixzQ0FBc0M7O1FBRTFELFNBQVMsWUFBWTtZQUw3QixTQUFTLDJCQUEyQixZQUFXOztnQkFFM0MsSUFBSSxVQUFVLHlCQUF5Qix5QkFBeUIsVUFBVSxhQUFhLFlBQVk7O2dCQUVuRyxXQUFXLE9BQU8sZ0JBQWdCOzs7Z0JBR2xDLFdBQVcsT0FBTyxVQUFTLDJCQUEyQixZQUFZLDJCQUN2QyxjQUFjLG9CQUFvQixlQUFlLFlBQVk7b0JBQ3BGLDBCQUEwQjtvQkFDMUIsV0FBVztvQkFDWCwwQkFBMEI7b0JBQzFCLGFBQWE7b0JBQ2IsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLGNBQWM7OztnQkFHbEIsU0FBUyxhQUFhLFVBQVUsa0JBQWtCO29CQUM5QyxJQUFJO29CQUNKLE1BQU0seUJBQXlCLGVBQWUsSUFBSTtvQkFDbEQsV0FBVyx3QkFBd0IsWUFBWTtvQkFDL0MsT0FBTyx3QkFBd0IsYUFBYSxxQkFBcUI7b0JBQ2pFLE9BQU8sVUFBVSxRQUFROzs7Z0JBRzdCLEdBQUcsK0JBQStCLFlBQVc7b0JBQ3pDLElBQUksV0FBVywyQ0FDQSx1Q0FDQSxtREFDQSxpRUFDQSwwRUFDQSxhQUNBO29CQUNmLGFBQWEsSUFBSSxTQUFTLGlCQUFpQixvQkFBb0I7OztnQkFHbkUsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsSUFBSSxXQUFXLDJEQUNYLGlEQUNBO29CQUNKLGFBQWEsSUFBSSx3QkFBd0IsaUJBQWlCLG9CQUFvQjs7O2dCQUdsRixHQUFHLG1DQUFtQyxZQUFXO29CQUM3QyxJQUFJLFdBQVcseUNBQ1gsaURBQ0EsMkNBQ0E7b0JBQ0osYUFBYSxJQUFJLFNBQVMsaUJBQWlCLFdBQVc7OztnQkFHMUQsR0FBRyx1Q0FBdUMsWUFBTTtvQkFDNUMsYUFBYSxJQUFJLFlBQVksY0FBYyxXQUFXLDZCQUE2Qjs7Ozs7R0FEeEYiLCJmaWxlIjoid29ya2l0ZW0vV29ya0l0ZW1UZW1wbGF0ZVNlcnZpY2VUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE0IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdvcmtJdGVtTW9kdWxlIGZyb20gJ3dvcmtpdGVtL1dvcmtJdGVtTW9kdWxlJztcbmltcG9ydCBwYW1BcHByb3ZhbE1vZHVsZSBmcm9tICd3b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1BcHByb3ZhbE1vZHVsZSc7XG5pbXBvcnQgcGFtQXBwcm92YWxXb3JrSXRlbVJlZ2lzdHJhciBmcm9tICd3b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1BcHByb3ZhbFdvcmtJdGVtUmVnaXN0cmFyJztcbmltcG9ydCAndGVzdC9qcy93b3JraXRlbS9Xb3JrSXRlbVRlc3REYXRhJztcbmltcG9ydCBQQU1fVEVTVF9EQVRBIGZyb20gJ3Rlc3QvanMvd29ya2l0ZW0vcGFtQXBwcm92YWwvUGFtVGVzdERhdGEnO1xuXG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBXb3JrSXRlbVRlbXBsYXRlU2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1dvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgV29ya0l0ZW0sIFZpb2xhdGlvblJldmlld1dvcmtJdGVtLCBXb3JrSXRlbVRlbXBsYXRlU2VydmljZSwgQXBwcm92YWwsIFBhbUFwcHJvdmFsLCAkcm9vdFNjb3BlLCB3b3JrSXRlbVRlc3REYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1Nb2R1bGUsIHBhbUFwcHJvdmFsTW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfd29ya0l0ZW1UZW1wbGF0ZVNlcnZpY2VfLCBfV29ya0l0ZW1fLCBfVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXywgX3dvcmtJdGVtVGVzdERhdGFfLCBfUGFtQXBwcm92YWxfLCBfQXBwcm92YWxfKSB7XG4gICAgICAgIFdvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlID0gX3dvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlXztcbiAgICAgICAgV29ya0l0ZW0gPSBfV29ya0l0ZW1fO1xuICAgICAgICBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSA9IF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHdvcmtJdGVtVGVzdERhdGEgPSBfd29ya0l0ZW1UZXN0RGF0YV87XG4gICAgICAgIEFwcHJvdmFsID0gX0FwcHJvdmFsXztcbiAgICAgICAgUGFtQXBwcm92YWwgPSBfUGFtQXBwcm92YWxfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHRlc3RUZW1wbGF0ZSh3b3JrSXRlbSwgZXhwZWN0ZWRUZW1wbGF0ZSkge1xuICAgICAgICB2YXIgdGVtcGxhdGU7XG4gICAgICAgIHNweU9uKFdvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlLCAnZ2V0VGVtcGxhdGUnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgdGVtcGxhdGUgPSBXb3JrSXRlbVRlbXBsYXRlU2VydmljZS5nZXRUZW1wbGF0ZSh3b3JrSXRlbSk7XG4gICAgICAgIGV4cGVjdChXb3JrSXRlbVRlbXBsYXRlU2VydmljZS5nZXRUZW1wbGF0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgod29ya0l0ZW0pO1xuICAgICAgICBleHBlY3QodGVtcGxhdGUpLnRvRXF1YWwoZXhwZWN0ZWRUZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgaXQoJ2dldCBmb3JtIHdvcmsgaXRlbSB0ZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSAnPGRpdiBjbGFzcz1cImZvcm0td29yay1pdGVtLWNvbnRhaW5lclwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8ZGl2IGNsYXNzPVwiZm9ybS13b3JrLWl0ZW0tcm93XCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgPHNwLXdvcmstaXRlbS1mb3JtIHNwLXdvcmstaXRlbT1cIndvcmtJdGVtXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgICAgICAgc3AtdGVtcGxhdGUtc3R5bGU9XCJ7e3RlbXBsYXRlU3R5bGV9fVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgIHNwLWNvbXBsZXRpb24tY2FsbGJhY2s9XCJjb21wbGV0aW9uQ2FsbGJhY2tcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIHRlc3RUZW1wbGF0ZShuZXcgV29ya0l0ZW0od29ya0l0ZW1UZXN0RGF0YS53b3JrSXRlbVRlc3REYXRhNCksIHRlbXBsYXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXQgdmlvbGF0aW9uIHJldmlldyB3b3JrIGl0ZW0gdGVtcGxhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJzxzcC12aW9sYXRpb24tcmV2aWV3LXdvcmstaXRlbSBzcC13b3JraXRlbT1cIndvcmtJdGVtXCIgJyArXG4gICAgICAgICAgICAnc3AtY29tcGxldGlvbi1jYWxsYmFjaz1cImNvbXBsZXRpb25DYWxsYmFja1wiICcgK1xuICAgICAgICAgICAgJ3NwLXRlbXBsYXRlLXN0eWxlPVwie3t0ZW1wbGF0ZVN0eWxlfX1cIiAvPic7XG4gICAgICAgIHRlc3RUZW1wbGF0ZShuZXcgVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW0od29ya0l0ZW1UZXN0RGF0YS53b3JrSXRlbVRlc3REYXRhMSksIHRlbXBsYXRlKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXQgYXBwcm92YWwgd29yayBpdGVtIHRlbXBsYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICc8c3AtYXBwcm92YWwgc3AtYXBwcm92YWw9XCJ3b3JrSXRlbVwiICcgK1xuICAgICAgICAgICAgJ3NwLWNvbXBsZXRpb24tY2FsbGJhY2s9XCJjb21wbGV0aW9uQ2FsbGJhY2tcIiAnICtcbiAgICAgICAgICAgICdzcC10ZW1wbGF0ZS1zdHlsZT1cInt7dGVtcGxhdGVTdHlsZX19XCIgJyArXG4gICAgICAgICAgICAnc3AtaW5kZXg9XCJpbmRleFwiIC8+JztcbiAgICAgICAgdGVzdFRlbXBsYXRlKG5ldyBBcHByb3ZhbCh3b3JrSXRlbVRlc3REYXRhLkFQUFJPVkFMKSwgdGVtcGxhdGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldCBQQU0gYXBwcm92YWwgd29yayBpdGVtIHRlbXBsYXRlJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VGVtcGxhdGUobmV3IFBhbUFwcHJvdmFsKFBBTV9URVNUX0RBVEEuYXBwcm92YWwpLCBwYW1BcHByb3ZhbFdvcmtJdGVtUmVnaXN0cmFyLlBBTV9BUFBST1ZBTF9URU1QTEFURSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
