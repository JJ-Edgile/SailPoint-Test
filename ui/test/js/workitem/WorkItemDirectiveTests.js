System.register(['test/js/TestInitializer', 'workitem/WorkItemModule', './WorkItemTestData'], function (_export) {
    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }, function (_WorkItemTestData) {}],
        execute: function () {

            /**
             * Tests for the spWorkItem directive.
             */
            describe('WorkItemDirective', function () {
                var workItemTemplateService,
                    $scope,
                    $compile,
                    args,
                    violationWorkItem,
                    approvalWorkItem,
                    formWorkItem,
                    approvalData,
                    violationWorkItemData = {
                    id: 'id',
                    identityDisplayName: 'displayName',
                    requestedBy: 'requester',
                    created: 1423077394799,
                    workItemType: 'ViolationReview',
                    violations: [{ violation: 'details' }],
                    requestedItems: [{ entitlementValue: 'value' }]
                },
                    formWorkItemData = { workItemType: 'Form' },
                    dirHtml = '<sp-work-item sp-work-item="workItem" sp-full="full" ' + ' sp-completion-callback="completionCallback" />';

                function compileElement(html, workItem, full) {
                    var element = angular.element(html);

                    $scope.workItem = workItem;
                    $scope.completionCallback = jasmine.createSpy();
                    $scope.full = full;

                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                beforeEach(module(workItemModule));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _workItemTemplateService_, ViolationReviewWorkItem, Approval, WorkItem, workItemTestData) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    workItemTemplateService = _workItemTemplateService_;
                    approvalData = angular.copy(workItemTestData.APPROVAL);
                    violationWorkItem = new ViolationReviewWorkItem(violationWorkItemData);
                    approvalWorkItem = new Approval(approvalData);
                    formWorkItem = new WorkItem(formWorkItemData);
                    spyOn(workItemTemplateService, 'getTemplate').and.callFake(function () {
                        return 'fake template';
                    });
                }));

                it('should call out to workItemTemplateService with proper args', function () {
                    compileElement(dirHtml, violationWorkItem);
                    args = workItemTemplateService.getTemplate.calls.mostRecent().args;
                    expect(args.length).toBe(1);
                    expect(args[0]).toBe(violationWorkItem);
                });

                it('should watch for workItem changes get template for new work item', function () {
                    compileElement(dirHtml, violationWorkItem);

                    $scope.workItem = approvalWorkItem;
                    $scope.$apply();

                    args = workItemTemplateService.getTemplate.calls.mostRecent().args;
                    expect(args.length).toBe(1);
                    expect(args[0]).toBe(approvalWorkItem);
                });

                describe('spFull scope attribute', function () {
                    var full = 'full',
                        summary = 'summary',
                        collapsible = 'collapsible';

                    function getTemplateStyle(scope) {
                        return scope.$$childHead.templateStyle;
                    }

                    describe('when true', function () {
                        it('should translate to spTemplateStlye = full for Approvals', function () {
                            compileElement(dirHtml, approvalWorkItem, true);
                            expect(getTemplateStyle($scope)).toEqual(full);
                        });
                        it('should translate to spTemplateStlye = full for ViolationReviews', function () {
                            compileElement(dirHtml, violationWorkItem, true);
                            expect(getTemplateStyle($scope)).toEqual(full);
                        });
                        it('should translate to spTemplateStlye = full for Forms', function () {
                            compileElement(dirHtml, formWorkItem, true);
                            expect(getTemplateStyle($scope)).toEqual(full);
                        });
                    });

                    describe('when false', function () {

                        it('should translate to spTemplateStlye = collapsible for Approvals', function () {
                            compileElement(dirHtml, approvalWorkItem, false);
                            expect(getTemplateStyle($scope)).toEqual(collapsible);
                        });
                        it('should translate to spTemplateStlye = summary for ViolationReviews', function () {
                            compileElement(dirHtml, violationWorkItem, false);
                            expect(getTemplateStyle($scope)).toEqual(summary);
                        });
                        it('should translate to spTemplateStlye = summary for Forms', function () {
                            compileElement(dirHtml, formWorkItem, false);
                            expect(getTemplateStyle($scope)).toEqual(summary);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTO0lBQ2pIOztJQUVJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtRQUNoQyxTQUFTLFlBQVk7Ozs7O1lBRTdCLFNBQVMscUJBQXFCLFlBQVc7Z0JBQ3JDLElBQUk7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0E7b0JBQ0Esd0JBQXdCO29CQUNwQixJQUFJO29CQUNKLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixTQUFTO29CQUNULGNBQWM7b0JBQ2QsWUFBWSxDQUFDLEVBQUMsV0FBVztvQkFDekIsZ0JBQWdCLENBQUMsRUFBQyxrQkFBa0I7O29CQUV4QyxtQkFBbUIsRUFBQyxjQUFjO29CQUNsQyxVQUFVLDBEQUNOOztnQkFFUixTQUFTLGVBQWUsTUFBTSxVQUFVLE1BQU07b0JBQzFDLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixPQUFPLFdBQVc7b0JBQ2xCLE9BQU8scUJBQXFCLFFBQVE7b0JBQ3BDLE9BQU8sT0FBTzs7b0JBRWQsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSwyQkFBMkIseUJBQ3JELFVBQVUsVUFBVSxrQkFBa0I7b0JBQzdELFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCwwQkFBMEI7b0JBQzFCLGVBQWUsUUFBUSxLQUFLLGlCQUFpQjtvQkFDN0Msb0JBQW9CLElBQUksd0JBQXdCO29CQUNoRCxtQkFBbUIsSUFBSSxTQUFTO29CQUNoQyxlQUFlLElBQUksU0FBUztvQkFDNUIsTUFBTSx5QkFBeUIsZUFBZSxJQUFJLFNBQVMsWUFBVzt3QkFDbEUsT0FBTzs7OztnQkFJZixHQUFHLCtEQUErRCxZQUFXO29CQUN6RSxlQUFlLFNBQVM7b0JBQ3hCLE9BQU8sd0JBQXdCLFlBQVksTUFBTSxhQUFhO29CQUM5RCxPQUFPLEtBQUssUUFBUSxLQUFLO29CQUN6QixPQUFPLEtBQUssSUFBSSxLQUFLOzs7Z0JBR3pCLEdBQUcsb0VBQW9FLFlBQVc7b0JBQzlFLGVBQWUsU0FBUzs7b0JBRXhCLE9BQU8sV0FBVztvQkFDbEIsT0FBTzs7b0JBRVAsT0FBTyx3QkFBd0IsWUFBWSxNQUFNLGFBQWE7b0JBQzlELE9BQU8sS0FBSyxRQUFRLEtBQUs7b0JBQ3pCLE9BQU8sS0FBSyxJQUFJLEtBQUs7OztnQkFHekIsU0FBUywwQkFBMEIsWUFBVztvQkFDMUMsSUFBSSxPQUFPO3dCQUNQLFVBQVU7d0JBQ1YsY0FBYzs7b0JBRWxCLFNBQVMsaUJBQWlCLE9BQU87d0JBQzdCLE9BQU8sTUFBTSxZQUFZOzs7b0JBRzdCLFNBQVMsYUFBYSxZQUFXO3dCQUM3QixHQUFHLDREQUE0RCxZQUFXOzRCQUN0RSxlQUFlLFNBQVMsa0JBQWtCOzRCQUMxQyxPQUFPLGlCQUFpQixTQUFTLFFBQVE7O3dCQUU3QyxHQUFHLG1FQUFtRSxZQUFXOzRCQUM3RSxlQUFlLFNBQVMsbUJBQW1COzRCQUMzQyxPQUFPLGlCQUFpQixTQUFTLFFBQVE7O3dCQUU3QyxHQUFHLHdEQUF3RCxZQUFXOzRCQUNsRSxlQUFlLFNBQVMsY0FBYzs0QkFDdEMsT0FBTyxpQkFBaUIsU0FBUyxRQUFROzs7O29CQUlqRCxTQUFTLGNBQWMsWUFBVzs7d0JBRTlCLEdBQUcsbUVBQW1FLFlBQVc7NEJBQzdFLGVBQWUsU0FBUyxrQkFBa0I7NEJBQzFDLE9BQU8saUJBQWlCLFNBQVMsUUFBUTs7d0JBRTdDLEdBQUcsc0VBQXNFLFlBQVc7NEJBQ2hGLGVBQWUsU0FBUyxtQkFBbUI7NEJBQzNDLE9BQU8saUJBQWlCLFNBQVMsUUFBUTs7d0JBRTdDLEdBQUcsMkRBQTJELFlBQVc7NEJBQ3JFLGVBQWUsU0FBUyxjQUFjOzRCQUN0QyxPQUFPLGlCQUFpQixTQUFTLFFBQVE7Ozs7Ozs7R0FRdEQiLCJmaWxlIjoid29ya2l0ZW0vV29ya0l0ZW1EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbU1vZHVsZSBmcm9tICd3b3JraXRlbS9Xb3JrSXRlbU1vZHVsZSc7XG5pbXBvcnQgJy4vV29ya0l0ZW1UZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBzcFdvcmtJdGVtIGRpcmVjdGl2ZS5cbiAqL1xuZGVzY3JpYmUoJ1dvcmtJdGVtRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlLFxuICAgICAgICAkc2NvcGUsXG4gICAgICAgICRjb21waWxlLFxuICAgICAgICBhcmdzLFxuICAgICAgICB2aW9sYXRpb25Xb3JrSXRlbSxcbiAgICAgICAgYXBwcm92YWxXb3JrSXRlbSxcbiAgICAgICAgZm9ybVdvcmtJdGVtLFxuICAgICAgICBhcHByb3ZhbERhdGEsXG4gICAgICAgIHZpb2xhdGlvbldvcmtJdGVtRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnaWQnLFxuICAgICAgICAgICAgaWRlbnRpdHlEaXNwbGF5TmFtZTogJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICAgIHJlcXVlc3RlZEJ5OiAncmVxdWVzdGVyJyxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IDE0MjMwNzczOTQ3OTksXG4gICAgICAgICAgICB3b3JrSXRlbVR5cGU6ICdWaW9sYXRpb25SZXZpZXcnLFxuICAgICAgICAgICAgdmlvbGF0aW9uczogW3t2aW9sYXRpb246ICdkZXRhaWxzJ31dLFxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbXM6IFt7ZW50aXRsZW1lbnRWYWx1ZTogJ3ZhbHVlJ31dXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1Xb3JrSXRlbURhdGEgPSB7d29ya0l0ZW1UeXBlOiAnRm9ybSd9LFxuICAgICAgICBkaXJIdG1sID0gJzxzcC13b3JrLWl0ZW0gc3Atd29yay1pdGVtPVwid29ya0l0ZW1cIiBzcC1mdWxsPVwiZnVsbFwiICcgK1xuICAgICAgICAgICAgJyBzcC1jb21wbGV0aW9uLWNhbGxiYWNrPVwiY29tcGxldGlvbkNhbGxiYWNrXCIgLz4nO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZUVsZW1lbnQoaHRtbCwgd29ya0l0ZW0sIGZ1bGwpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoaHRtbCk7XG5cbiAgICAgICAgJHNjb3BlLndvcmtJdGVtID0gd29ya0l0ZW07XG4gICAgICAgICRzY29wZS5jb21wbGV0aW9uQ2FsbGJhY2sgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAkc2NvcGUuZnVsbCA9IGZ1bGw7XG5cbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHdvcmtJdGVtTW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF93b3JrSXRlbVRlbXBsYXRlU2VydmljZV8sIFZpb2xhdGlvblJldmlld1dvcmtJdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmFsLCBXb3JrSXRlbSwgd29ya0l0ZW1UZXN0RGF0YSkge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHdvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlID0gX3dvcmtJdGVtVGVtcGxhdGVTZXJ2aWNlXztcbiAgICAgICAgYXBwcm92YWxEYXRhID0gYW5ndWxhci5jb3B5KHdvcmtJdGVtVGVzdERhdGEuQVBQUk9WQUwpO1xuICAgICAgICB2aW9sYXRpb25Xb3JrSXRlbSA9IG5ldyBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSh2aW9sYXRpb25Xb3JrSXRlbURhdGEpO1xuICAgICAgICBhcHByb3ZhbFdvcmtJdGVtID0gbmV3IEFwcHJvdmFsKGFwcHJvdmFsRGF0YSk7XG4gICAgICAgIGZvcm1Xb3JrSXRlbSA9IG5ldyBXb3JrSXRlbShmb3JtV29ya0l0ZW1EYXRhKTtcbiAgICAgICAgc3B5T24od29ya0l0ZW1UZW1wbGF0ZVNlcnZpY2UsICdnZXRUZW1wbGF0ZScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAnZmFrZSB0ZW1wbGF0ZSc7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gd29ya0l0ZW1UZW1wbGF0ZVNlcnZpY2Ugd2l0aCBwcm9wZXIgYXJncycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlRWxlbWVudChkaXJIdG1sLCB2aW9sYXRpb25Xb3JrSXRlbSk7XG4gICAgICAgIGFyZ3MgPSB3b3JrSXRlbVRlbXBsYXRlU2VydmljZS5nZXRUZW1wbGF0ZS5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9CZSh2aW9sYXRpb25Xb3JrSXRlbSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHdhdGNoIGZvciB3b3JrSXRlbSBjaGFuZ2VzIGdldCB0ZW1wbGF0ZSBmb3IgbmV3IHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlRWxlbWVudChkaXJIdG1sLCB2aW9sYXRpb25Xb3JrSXRlbSk7XG5cbiAgICAgICAgJHNjb3BlLndvcmtJdGVtID0gYXBwcm92YWxXb3JrSXRlbTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIGFyZ3MgPSB3b3JrSXRlbVRlbXBsYXRlU2VydmljZS5nZXRUZW1wbGF0ZS5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9CZShhcHByb3ZhbFdvcmtJdGVtKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcEZ1bGwgc2NvcGUgYXR0cmlidXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmdWxsID0gJ2Z1bGwnLFxuICAgICAgICAgICAgc3VtbWFyeSA9ICdzdW1tYXJ5JyxcbiAgICAgICAgICAgIGNvbGxhcHNpYmxlID0gJ2NvbGxhcHNpYmxlJztcblxuICAgICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZVN0eWxlKHNjb3BlKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuJCRjaGlsZEhlYWQudGVtcGxhdGVTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgdHJhbnNsYXRlIHRvIHNwVGVtcGxhdGVTdGx5ZSA9IGZ1bGwgZm9yIEFwcHJvdmFscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KGRpckh0bWwsIGFwcHJvdmFsV29ya0l0ZW0sIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChnZXRUZW1wbGF0ZVN0eWxlKCRzY29wZSkpLnRvRXF1YWwoZnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgdHJhbnNsYXRlIHRvIHNwVGVtcGxhdGVTdGx5ZSA9IGZ1bGwgZm9yIFZpb2xhdGlvblJldmlld3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudChkaXJIdG1sLCB2aW9sYXRpb25Xb3JrSXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGdldFRlbXBsYXRlU3R5bGUoJHNjb3BlKSkudG9FcXVhbChmdWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUgdG8gc3BUZW1wbGF0ZVN0bHllID0gZnVsbCBmb3IgRm9ybXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudChkaXJIdG1sLCBmb3JtV29ya0l0ZW0sIHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChnZXRUZW1wbGF0ZVN0eWxlKCRzY29wZSkpLnRvRXF1YWwoZnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gZmFsc2UnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUgdG8gc3BUZW1wbGF0ZVN0bHllID0gY29sbGFwc2libGUgZm9yIEFwcHJvdmFscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KGRpckh0bWwsIGFwcHJvdmFsV29ya0l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZ2V0VGVtcGxhdGVTdHlsZSgkc2NvcGUpKS50b0VxdWFsKGNvbGxhcHNpYmxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUgdG8gc3BUZW1wbGF0ZVN0bHllID0gc3VtbWFyeSBmb3IgVmlvbGF0aW9uUmV2aWV3cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXBpbGVFbGVtZW50KGRpckh0bWwsIHZpb2xhdGlvbldvcmtJdGVtLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGdldFRlbXBsYXRlU3R5bGUoJHNjb3BlKSkudG9FcXVhbChzdW1tYXJ5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0cmFuc2xhdGUgdG8gc3BUZW1wbGF0ZVN0bHllID0gc3VtbWFyeSBmb3IgRm9ybXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb21waWxlRWxlbWVudChkaXJIdG1sLCBmb3JtV29ya0l0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZ2V0VGVtcGxhdGVTdHlsZSgkc2NvcGUpKS50b0VxdWFsKHN1bW1hcnkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
