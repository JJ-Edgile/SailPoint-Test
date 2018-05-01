System.register(['workitem/pamApproval/PamApprovalModule', 'test/js/TestInitializer', 'test/js/workitem/pamApproval/PamTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var pamApprovalModule, TEST_DATA;
    return {
        setters: [function (_workitemPamApprovalPamApprovalModule) {
            pamApprovalModule = _workitemPamApprovalPamApprovalModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsWorkitemPamApprovalPamTestData) {
            TEST_DATA = _testJsWorkitemPamApprovalPamTestData['default'];
        }],
        execute: function () {

            describe('PamApprovalDirective', function () {

                // PhantomJS renders a different date - likely due to something TimeZone-y - mocking the date filter.
                var testDate = 'A freckle past a hair';
                var mockDateFilter = jasmine.createSpy().and.returnValue(testDate);

                var approval = undefined,
                    completionCallback = undefined,
                    element = undefined,
                    $rootScope = undefined,
                    $compile = undefined,
                    PamApproval = undefined,
                    workItemService = undefined;

                beforeEach(module(pamApprovalModule));

                beforeEach(module(function ($provide) {
                    $provide.value('dateFilter', mockDateFilter);
                }));

                beforeEach(inject(function (_PamApproval_, _$compile_, _$rootScope_, _workItemService_) {
                    $compile = _$compile_;
                    $rootScope = _$rootScope_;
                    PamApproval = _PamApproval_;
                    workItemService = _workItemService_;

                    approval = new PamApproval(TEST_DATA.approval);
                    completionCallback = jasmine.createSpy('completionCallback');
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(approval) {
                    var eltDef = '<sp-pam-approval sp-work-item="approval" sp-completion-callback="callback"></sp-pam-approval>';
                    element = angular.element(eltDef);

                    var $scope = $rootScope.$new();
                    $scope.approval = approval;
                    $scope.callback = completionCallback;

                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('shows a flag for high priority approvals', function () {
                    approval.priority = 'High';
                    var elt = createElement(approval);
                    var flag = elt.find('.approval > .panel-heading i.fa-flag');
                    expect(flag.length).toEqual(1);
                });

                it('shows the requestee name in the header', function () {
                    var elt = createElement(approval);
                    var requestee = elt.find('.approval > .panel-heading .panel-title');
                    expect(requestee.text()).toContain(approval.getRequesteeName());
                });

                it('shows the creation date in the header', function () {
                    var elt = createElement(approval);
                    var requestee = elt.find('.approval > .panel-heading .text-muted');
                    expect(requestee.text()).toContain(testDate);
                });

                it('forward dialog is displayed the forward button is clicked', function () {
                    spyOn(workItemService, 'showForwardDialog');

                    var elt = createElement(approval);
                    var btn = elt.find('#buttonFwd');
                    btn.click();
                    expect(workItemService.showForwardDialog).toHaveBeenCalled();
                    var args = workItemService.showForwardDialog.calls.argsFor(0);
                    expect(args[0]).toEqual(approval.id);
                });

                describe('workgroup assignment', function () {
                    var workgroupAssignmentService = undefined;

                    beforeEach(inject(function (_workgroupAssignmentService_) {
                        workgroupAssignmentService = _workgroupAssignmentService_;
                    }));

                    function getWorkgroupApproval() {
                        var data = angular.copy(TEST_DATA.approval);
                        data.owner = {
                            id: '82374987234',
                            name: 'P Own3r',
                            displayName: 'Pown3r',
                            workgroup: true
                        };

                        return new PamApproval(data);
                    }

                    function getWorkgroupButton(elt) {
                        return elt.find('#btnWorkgroup');
                    }

                    it('button is displayed if approval is assigned to a workgroup', function () {
                        var elt = createElement(getWorkgroupApproval());
                        var btn = getWorkgroupButton(elt);
                        expect(btn.length).toEqual(1);
                    });

                    it('button is not displayed if approval is not assigned to a workgroup', function () {
                        var elt = createElement(approval);
                        var btn = getWorkgroupButton(elt);
                        expect(btn.length).toEqual(0);
                    });

                    it('shows the workgroup assignment dialog when button is clicked', function () {
                        spyOn(workgroupAssignmentService, 'showWorkgroupAssignmentDialog');
                        var approval = getWorkgroupApproval();
                        var elt = createElement(approval);
                        var btn = getWorkgroupButton(elt);
                        btn.click();
                        expect(workgroupAssignmentService.showWorkgroupAssignmentDialog).toHaveBeenCalled();
                        var args = workgroupAssignmentService.showWorkgroupAssignmentDialog.calls.argsFor(0);
                        expect(args[0]).toEqual(approval);
                    });
                });

                it('displays the details dialog when the button is clicked', function () {
                    spyOn(workItemService, 'showDetailsDialog');

                    var elt = createElement(approval);
                    var btn = elt.find('#btnDetails');
                    expect(btn.length).toEqual(1);
                    btn.click();

                    expect(workItemService.showDetailsDialog).toHaveBeenCalled();
                    expect(workItemService.showDetailsDialog.calls.argsFor(0)[0]).toEqual(approval);
                });

                describe('comments button', function () {
                    var approvalCommentService = undefined;

                    beforeEach(inject(function (_approvalCommentService_) {
                        approvalCommentService = _approvalCommentService_;
                        spyOn(approvalCommentService, 'openCommentDialog');
                    }));

                    function getCommentButton(elt) {
                        return elt.find('#btnComments');
                    }

                    it('displays the comments dialog when clicked', function () {
                        var elt = createElement(approval);
                        var btn = getCommentButton(elt);
                        btn.click();
                        expect(approvalCommentService.openCommentDialog).toHaveBeenCalled();
                        var args = approvalCommentService.openCommentDialog.calls.argsFor(0);
                        expect(args[0]).toEqual(approval.id);
                    });

                    it('shows no count when there are no comments', function () {
                        var elt = createElement(approval);
                        var count = getCommentButton(elt).find('.hidden-xs:visible');
                        expect(count.length).toEqual(0);
                    });

                    it('shows the count when there are comments', function () {
                        approval.commentCount = 5;
                        var elt = createElement(approval);
                        var count = getCommentButton(elt).find('.hidden-xs');
                        expect(count.length).toEqual(1);
                        expect(count.text()).toContain('5');
                    });
                });

                function getRightsWell(elt) {
                    return elt.find('.pam-approval .panel-body > .well');
                }

                it('shows the container name', function () {
                    var elt = createElement(approval);
                    var container = elt.find('.panel-heading span.description');
                    expect(container.text()).toContain(approval.request.containerDisplayName);
                });

                it('shows the container description', function () {
                    var elt = createElement(approval);
                    var desc = elt.find('.configurable-details-description');
                    expect(desc.text()).toContain(approval.request.containerDescription);
                });

                function testRights(isAdd) {
                    var withRights = isAdd ? 'addedRights' : 'removedRights';
                    var withoutRights = !isAdd ? 'addedRights' : 'removedRights';
                    var acctReq = approval.request.accountRequests[0];

                    acctReq[withRights] = ['right1', 'right2'];
                    acctReq[withoutRights] = [];

                    var elt = createElement(approval);
                    var rights = getRightsWell(elt);

                    var expectedText = isAdd ? 'add' : 'remove';
                    var notExpectedText = !isAdd ? 'add' : 'remove';
                    expect(rights.text()).toContain(expectedText);
                    expect(rights.text()).not.toContain(notExpectedText);

                    expect(rights.text()).toContain('right1, right2');
                }

                it('shows the added rights', function () {
                    testRights(true);
                });

                it('shows the removed rights', function () {
                    testRights(false);
                });

                describe('completion', function () {
                    var pamApprovalService = undefined,
                        approvalService = undefined,
                        spModal = undefined;

                    beforeEach(inject(function (_pamApprovalService_, _approvalService_, ApprovalResult, _spModal_, $q) {
                        pamApprovalService = _pamApprovalService_;
                        approvalService = _approvalService_;
                        spModal = _spModal_;

                        // Spy on the completion modal, and return a resolved promise to fake out clicking the "ok" button.
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });

                        // Spy on the approval service to see if we call through to approve or reject after the completion dialog.
                        spyOn(pamApprovalService, 'approve').and.returnValue($q.when());
                        spyOn(pamApprovalService, 'reject').and.returnValue($q.when());

                        // Spy on the complete function to make sure this gets called after approving/rejecting.
                        var result = new ApprovalResult({}, approval.id);
                        spyOn(approvalService, 'complete').and.returnValue($q.when(result));
                    }));

                    function testApproveReject(approve) {
                        // Clicking the button should pop up the completion modal.
                        var elt = createElement(approval);
                        var btnId = approve ? '#btnApprove' : '#btnReject';
                        var btn = elt.find(btnId);
                        btn.click();

                        // Run a digest cycle to confirm the completion dialog.
                        $rootScope.$digest();

                        // Check that the appropriate stuff was called.
                        var expectedFunc = approve ? pamApprovalService.approve : pamApprovalService.reject;
                        expect(expectedFunc).toHaveBeenCalledWith(approval.id);
                        expect(approvalService.complete).toHaveBeenCalledWith(approval.id);
                        expect(completionCallback).toHaveBeenCalled();
                    }

                    it('approves the work item when clicking the approve button', function () {
                        testApproveReject(true);
                    });

                    it('rejects the work item when clicking the reject button', function () {
                        testApproveReject(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMENBQTBDLDJCQUEyQiw2Q0FBNkMsVUFBVSxTQUFTOzs7SUFHbEo7O0lBRUEsSUFBSSxtQkFBbUI7SUFDdkIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHVDQUF1QztZQUN2RCxvQkFBb0Isc0NBQXNDO1dBQzNELFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDdEYsWUFBWSxzQ0FBc0M7O1FBRXRELFNBQVMsWUFBWTs7WUFON0IsU0FBUyx3QkFBd0IsWUFBTTs7O2dCQUduQyxJQUFJLFdBQVc7Z0JBQ2YsSUFBSSxpQkFBaUIsUUFBUSxZQUFZLElBQUksWUFBWTs7Z0JBRXpELElBQUksV0FBUTtvQkFBRSxxQkFBa0I7b0JBQUUsVUFBTztvQkFBRSxhQUFVO29CQUFFLFdBQVE7b0JBQUUsY0FBVztvQkFBRSxrQkFBZTs7Z0JBRTdGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFVBQWE7b0JBQzVCLFNBQVMsTUFBTSxjQUFjOzs7Z0JBR2pDLFdBQVcsT0FBTyxVQUFDLGVBQWUsWUFBWSxjQUFjLG1CQUFzQjtvQkFDOUUsV0FBVztvQkFDWCxhQUFhO29CQUNiLGNBQWM7b0JBQ2Qsa0JBQWtCOztvQkFFbEIsV0FBVyxJQUFJLFlBQVksVUFBVTtvQkFDckMscUJBQXFCLFFBQVEsVUFBVTs7O2dCQUczQyxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsY0FBYyxVQUFVO29CQUM3QixJQUFJLFNBQU07b0JBQ1YsVUFBVSxRQUFRLFFBQVE7O29CQUUxQixJQUFJLFNBQVMsV0FBVztvQkFDeEIsT0FBTyxXQUFXO29CQUNsQixPQUFPLFdBQVc7O29CQUVsQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdY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R2YsR0FBRyw0QkFBNEIsWUFBTTtvQkFDakMsV0FBVzs7O2dCQUdmLFNBQVMsY0FBYyxZQUFNO29CQUN6QixJQUFJLHFCQUFrQjt3QkFBRSxrQkFBZTt3QkFBRSxVQUFPOztvQkFFaEQsV0FBVyxPQUFPLFVBQUMsc0JBQXNCLG1CQUFtQixnQkFBZ0IsV0FBVyxJQUFPO3dCQUMxRixxQkFBcUI7d0JBQ3JCLGtCQUFrQjt3QkFDbEIsVUFBVTs7O3dCQUdWLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFFLFFBQVEsR0FBRzs7O3dCQUdwRCxNQUFNLG9CQUFvQixXQUFXLElBQUksWUFBWSxHQUFHO3dCQUN4RCxNQUFNLG9CQUFvQixVQUFVLElBQUksWUFBWSxHQUFHOzs7d0JBR3ZELElBQUksU0FBUyxJQUFJLGVBQWUsSUFBSSxTQUFTO3dCQUM3QyxNQUFNLGlCQUFpQixZQUFZLElBQUksWUFBWSxHQUFHLEtBQUs7OztvQkFHL0QsU0FBUyxrQkFBa0IsU0FBUzs7d0JBRWhDLElBQUksTUFBTSxjQUFjO3dCQUN4QixJQUFJLFFBQVEsVUFBWSxnQkFBZ0I7d0JBQ3hDLElBQUksTUFBTSxJQUFJLEtBQUs7d0JBQ25CLElBQUk7Ozt3QkFHSixXQUFXOzs7d0JBR1gsSUFBSSxlQUFlLFVBQVksbUJBQW1CLFVBQVUsbUJBQW1CO3dCQUMvRSxPQUFPLGNBQWMscUJBQXFCLFNBQVM7d0JBQ25ELE9BQU8sZ0JBQWdCLFVBQVUscUJBQXFCLFNBQVM7d0JBQy9ELE9BQU8sb0JBQW9COzs7b0JBRy9CLEdBQUcsMkRBQTJELFlBQU07d0JBQ2hFLGtCQUFrQjs7O29CQUd0QixHQUFHLHlEQUF5RCxZQUFNO3dCQUM5RCxrQkFBa0I7Ozs7OztHQXNCM0IiLCJmaWxlIjoid29ya2l0ZW0vcGFtQXBwcm92YWwvUGFtQXBwcm92YWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0IHBhbUFwcHJvdmFsTW9kdWxlIGZyb20gJ3dvcmtpdGVtL3BhbUFwcHJvdmFsL1BhbUFwcHJvdmFsTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBURVNUX0RBVEEgZnJvbSAndGVzdC9qcy93b3JraXRlbS9wYW1BcHByb3ZhbC9QYW1UZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnUGFtQXBwcm92YWxEaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgLy8gUGhhbnRvbUpTIHJlbmRlcnMgYSBkaWZmZXJlbnQgZGF0ZSAtIGxpa2VseSBkdWUgdG8gc29tZXRoaW5nIFRpbWVab25lLXkgLSBtb2NraW5nIHRoZSBkYXRlIGZpbHRlci5cclxuICAgIGxldCB0ZXN0RGF0ZSA9ICdBIGZyZWNrbGUgcGFzdCBhIGhhaXInO1xyXG4gICAgbGV0IG1vY2tEYXRlRmlsdGVyID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUodGVzdERhdGUpO1xyXG5cclxuICAgIGxldCBhcHByb3ZhbCwgY29tcGxldGlvbkNhbGxiYWNrLCBlbGVtZW50LCAkcm9vdFNjb3BlLCAkY29tcGlsZSwgUGFtQXBwcm92YWwsIHdvcmtJdGVtU2VydmljZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1BcHByb3ZhbE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKCgkcHJvdmlkZSkgPT4ge1xyXG4gICAgICAgICRwcm92aWRlLnZhbHVlKCdkYXRlRmlsdGVyJywgbW9ja0RhdGVGaWx0ZXIpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUGFtQXBwcm92YWxfLCBfJGNvbXBpbGVfLCBfJHJvb3RTY29wZV8sIF93b3JrSXRlbVNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgUGFtQXBwcm92YWwgPSBfUGFtQXBwcm92YWxfO1xyXG4gICAgICAgIHdvcmtJdGVtU2VydmljZSA9IF93b3JrSXRlbVNlcnZpY2VfO1xyXG5cclxuICAgICAgICBhcHByb3ZhbCA9IG5ldyBQYW1BcHByb3ZhbChURVNUX0RBVEEuYXBwcm92YWwpO1xyXG4gICAgICAgIGNvbXBsZXRpb25DYWxsYmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCdjb21wbGV0aW9uQ2FsbGJhY2snKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChhcHByb3ZhbCkge1xyXG4gICAgICAgIGxldCBlbHREZWYgPSBgPHNwLXBhbS1hcHByb3ZhbCBzcC13b3JrLWl0ZW09XCJhcHByb3ZhbFwiIHNwLWNvbXBsZXRpb24tY2FsbGJhY2s9XCJjYWxsYmFja1wiPjwvc3AtcGFtLWFwcHJvdmFsPmA7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHREZWYpO1xyXG5cclxuICAgICAgICBsZXQgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJHNjb3BlLmFwcHJvdmFsID0gYXBwcm92YWw7XHJcbiAgICAgICAgJHNjb3BlLmNhbGxiYWNrID0gY29tcGxldGlvbkNhbGxiYWNrO1xyXG5cclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc2hvd3MgYSBmbGFnIGZvciBoaWdoIHByaW9yaXR5IGFwcHJvdmFscycsICgpID0+IHtcclxuICAgICAgICBhcHByb3ZhbC5wcmlvcml0eSA9ICdIaWdoJztcclxuICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChhcHByb3ZhbCk7XHJcbiAgICAgICAgbGV0IGZsYWcgPSBlbHQuZmluZCgnLmFwcHJvdmFsID4gLnBhbmVsLWhlYWRpbmcgaS5mYS1mbGFnJyk7XHJcbiAgICAgICAgZXhwZWN0KGZsYWcubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSByZXF1ZXN0ZWUgbmFtZSBpbiB0aGUgaGVhZGVyJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICBsZXQgcmVxdWVzdGVlID0gZWx0LmZpbmQoJy5hcHByb3ZhbCA+IC5wYW5lbC1oZWFkaW5nIC5wYW5lbC10aXRsZScpO1xyXG4gICAgICAgIGV4cGVjdChyZXF1ZXN0ZWUudGV4dCgpKS50b0NvbnRhaW4oYXBwcm92YWwuZ2V0UmVxdWVzdGVlTmFtZSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyB0aGUgY3JlYXRpb24gZGF0ZSBpbiB0aGUgaGVhZGVyJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICBsZXQgcmVxdWVzdGVlID0gZWx0LmZpbmQoJy5hcHByb3ZhbCA+IC5wYW5lbC1oZWFkaW5nIC50ZXh0LW11dGVkJyk7XHJcbiAgICAgICAgZXhwZWN0KHJlcXVlc3RlZS50ZXh0KCkpLnRvQ29udGFpbih0ZXN0RGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZm9yd2FyZCBkaWFsb2cgaXMgZGlzcGxheWVkIHRoZSBmb3J3YXJkIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgIHNweU9uKHdvcmtJdGVtU2VydmljZSwgJ3Nob3dGb3J3YXJkRGlhbG9nJyk7XHJcblxyXG4gICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICBsZXQgYnRuID0gZWx0LmZpbmQoJyNidXR0b25Gd2QnKTtcclxuICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLnNob3dGb3J3YXJkRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSB3b3JrSXRlbVNlcnZpY2Uuc2hvd0ZvcndhcmREaWFsb2cuY2FsbHMuYXJnc0ZvcigwKTtcclxuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbChhcHByb3ZhbC5pZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnd29ya2dyb3VwIGFzc2lnbm1lbnQnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHdvcmtncm91cEFzc2lnbm1lbnRTZXJ2aWNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX3dvcmtncm91cEFzc2lnbm1lbnRTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICAgICB3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZSA9IF93b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZV87XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRXb3JrZ3JvdXBBcHByb3ZhbCgpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBhbmd1bGFyLmNvcHkoVEVTVF9EQVRBLmFwcHJvdmFsKTtcclxuICAgICAgICAgICAgZGF0YS5vd25lciA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnODIzNzQ5ODcyMzQnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1AgT3duM3InLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQb3duM3InLFxyXG4gICAgICAgICAgICAgICAgd29ya2dyb3VwOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBhbUFwcHJvdmFsKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0V29ya2dyb3VwQnV0dG9uKGVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWx0LmZpbmQoJyNidG5Xb3JrZ3JvdXAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdidXR0b24gaXMgZGlzcGxheWVkIGlmIGFwcHJvdmFsIGlzIGFzc2lnbmVkIHRvIGEgd29ya2dyb3VwJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChnZXRXb3JrZ3JvdXBBcHByb3ZhbCgpKTtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGdldFdvcmtncm91cEJ1dHRvbihlbHQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYnRuLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2J1dHRvbiBpcyBub3QgZGlzcGxheWVkIGlmIGFwcHJvdmFsIGlzIG5vdCBhc3NpZ25lZCB0byBhIHdvcmtncm91cCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVsdCA9IGNyZWF0ZUVsZW1lbnQoYXBwcm92YWwpO1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gZ2V0V29ya2dyb3VwQnV0dG9uKGVsdCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidG4ubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHdvcmtncm91cCBhc3NpZ25tZW50IGRpYWxvZyB3aGVuIGJ1dHRvbiBpcyBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbih3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZSwgJ3Nob3dXb3JrZ3JvdXBBc3NpZ25tZW50RGlhbG9nJyk7XHJcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbCA9IGdldFdvcmtncm91cEFwcHJvdmFsKCk7XHJcbiAgICAgICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGdldFdvcmtncm91cEJ1dHRvbihlbHQpO1xyXG4gICAgICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KHdvcmtncm91cEFzc2lnbm1lbnRTZXJ2aWNlLnNob3dXb3JrZ3JvdXBBc3NpZ25tZW50RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2Uuc2hvd1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2cuY2FsbHMuYXJnc0ZvcigwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoYXBwcm92YWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Rpc3BsYXlzIHRoZSBkZXRhaWxzIGRpYWxvZyB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICBzcHlPbih3b3JrSXRlbVNlcnZpY2UsICdzaG93RGV0YWlsc0RpYWxvZycpO1xyXG5cclxuICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChhcHByb3ZhbCk7XHJcbiAgICAgICAgbGV0IGJ0biA9IGVsdC5maW5kKCcjYnRuRGV0YWlscycpO1xyXG4gICAgICAgIGV4cGVjdChidG4ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG5cclxuICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLnNob3dEZXRhaWxzRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5zaG93RGV0YWlsc0RpYWxvZy5jYWxscy5hcmdzRm9yKDApWzBdKS50b0VxdWFsKGFwcHJvdmFsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb21tZW50cyBidXR0b24nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFwcHJvdmFsQ29tbWVudFNlcnZpY2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfYXBwcm92YWxDb21tZW50U2VydmljZV8pID0+IHtcclxuICAgICAgICAgICAgYXBwcm92YWxDb21tZW50U2VydmljZSA9IF9hcHByb3ZhbENvbW1lbnRTZXJ2aWNlXztcclxuICAgICAgICAgICAgc3B5T24oYXBwcm92YWxDb21tZW50U2VydmljZSwgJ29wZW5Db21tZW50RGlhbG9nJyk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRDb21tZW50QnV0dG9uKGVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWx0LmZpbmQoJyNidG5Db21tZW50cycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2Rpc3BsYXlzIHRoZSBjb21tZW50cyBkaWFsb2cgd2hlbiBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChhcHByb3ZhbCk7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSBnZXRDb21tZW50QnV0dG9uKGVsdCk7XHJcbiAgICAgICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxDb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IGFwcHJvdmFsQ29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2cuY2FsbHMuYXJnc0ZvcigwKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoYXBwcm92YWwuaWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3Mgbm8gY291bnQgd2hlbiB0aGVyZSBhcmUgbm8gY29tbWVudHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gZ2V0Q29tbWVudEJ1dHRvbihlbHQpLmZpbmQoJy5oaWRkZW4teHM6dmlzaWJsZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoY291bnQubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIGNvdW50IHdoZW4gdGhlcmUgYXJlIGNvbW1lbnRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBhcHByb3ZhbC5jb21tZW50Q291bnQgPSA1O1xyXG4gICAgICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChhcHByb3ZhbCk7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IGdldENvbW1lbnRCdXR0b24oZWx0KS5maW5kKCcuaGlkZGVuLXhzJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb3VudC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb3VudC50ZXh0KCkpLnRvQ29udGFpbignNScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UmlnaHRzV2VsbChlbHQpIHtcclxuICAgICAgICByZXR1cm4gZWx0LmZpbmQoJy5wYW0tYXBwcm92YWwgLnBhbmVsLWJvZHkgPiAud2VsbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG93cyB0aGUgY29udGFpbmVyIG5hbWUnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsdCA9IGNyZWF0ZUVsZW1lbnQoYXBwcm92YWwpO1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBlbHQuZmluZCgnLnBhbmVsLWhlYWRpbmcgc3Bhbi5kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgIGV4cGVjdChjb250YWluZXIudGV4dCgpKS50b0NvbnRhaW4oYXBwcm92YWwucmVxdWVzdC5jb250YWluZXJEaXNwbGF5TmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvd3MgdGhlIGNvbnRhaW5lciBkZXNjcmlwdGlvbicsICgpID0+IHtcclxuICAgICAgICBsZXQgZWx0ID0gY3JlYXRlRWxlbWVudChhcHByb3ZhbCk7XHJcbiAgICAgICAgbGV0IGRlc2MgPSBlbHQuZmluZCgnLmNvbmZpZ3VyYWJsZS1kZXRhaWxzLWRlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgZXhwZWN0KGRlc2MudGV4dCgpKS50b0NvbnRhaW4oYXBwcm92YWwucmVxdWVzdC5jb250YWluZXJEZXNjcmlwdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0UmlnaHRzKGlzQWRkKSB7XHJcbiAgICAgICAgbGV0IHdpdGhSaWdodHMgPSAoaXNBZGQpID8gJ2FkZGVkUmlnaHRzJyA6ICdyZW1vdmVkUmlnaHRzJztcclxuICAgICAgICBsZXQgd2l0aG91dFJpZ2h0cyA9ICghaXNBZGQpID8gJ2FkZGVkUmlnaHRzJyA6ICdyZW1vdmVkUmlnaHRzJztcclxuICAgICAgICBsZXQgYWNjdFJlcSA9IGFwcHJvdmFsLnJlcXVlc3QuYWNjb3VudFJlcXVlc3RzWzBdO1xyXG5cclxuICAgICAgICBhY2N0UmVxW3dpdGhSaWdodHNdID0gWyAncmlnaHQxJywgJ3JpZ2h0MicgXTtcclxuICAgICAgICBhY2N0UmVxW3dpdGhvdXRSaWdodHNdID0gW107XHJcblxyXG4gICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICBsZXQgcmlnaHRzID0gZ2V0UmlnaHRzV2VsbChlbHQpO1xyXG5cclxuICAgICAgICBsZXQgZXhwZWN0ZWRUZXh0ID0gKGlzQWRkKSA/ICdhZGQnIDogJ3JlbW92ZSc7XHJcbiAgICAgICAgbGV0IG5vdEV4cGVjdGVkVGV4dCA9ICghaXNBZGQpID8gJ2FkZCcgOiAncmVtb3ZlJztcclxuICAgICAgICBleHBlY3QocmlnaHRzLnRleHQoKSkudG9Db250YWluKGV4cGVjdGVkVGV4dCk7XHJcbiAgICAgICAgZXhwZWN0KHJpZ2h0cy50ZXh0KCkpLm5vdC50b0NvbnRhaW4obm90RXhwZWN0ZWRUZXh0KTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHJpZ2h0cy50ZXh0KCkpLnRvQ29udGFpbigncmlnaHQxLCByaWdodDInKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc2hvd3MgdGhlIGFkZGVkIHJpZ2h0cycsICgpID0+IHtcclxuICAgICAgICB0ZXN0UmlnaHRzKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSByZW1vdmVkIHJpZ2h0cycsICgpID0+IHtcclxuICAgICAgICB0ZXN0UmlnaHRzKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb21wbGV0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBwYW1BcHByb3ZhbFNlcnZpY2UsIGFwcHJvdmFsU2VydmljZSwgc3BNb2RhbDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9wYW1BcHByb3ZhbFNlcnZpY2VfLCBfYXBwcm92YWxTZXJ2aWNlXywgQXBwcm92YWxSZXN1bHQsIF9zcE1vZGFsXywgJHEpID0+IHtcclxuICAgICAgICAgICAgcGFtQXBwcm92YWxTZXJ2aWNlID0gX3BhbUFwcHJvdmFsU2VydmljZV87XHJcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZSA9IF9hcHByb3ZhbFNlcnZpY2VfO1xyXG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG5cclxuICAgICAgICAgICAgLy8gU3B5IG9uIHRoZSBjb21wbGV0aW9uIG1vZGFsLCBhbmQgcmV0dXJuIGEgcmVzb2x2ZWQgcHJvbWlzZSB0byBmYWtlIG91dCBjbGlja2luZyB0aGUgXCJva1wiIGJ1dHRvbi5cclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoeyByZXN1bHQ6ICRxLndoZW4oKSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNweSBvbiB0aGUgYXBwcm92YWwgc2VydmljZSB0byBzZWUgaWYgd2UgY2FsbCB0aHJvdWdoIHRvIGFwcHJvdmUgb3IgcmVqZWN0IGFmdGVyIHRoZSBjb21wbGV0aW9uIGRpYWxvZy5cclxuICAgICAgICAgICAgc3B5T24ocGFtQXBwcm92YWxTZXJ2aWNlLCAnYXBwcm92ZScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xyXG4gICAgICAgICAgICBzcHlPbihwYW1BcHByb3ZhbFNlcnZpY2UsICdyZWplY3QnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNweSBvbiB0aGUgY29tcGxldGUgZnVuY3Rpb24gdG8gbWFrZSBzdXJlIHRoaXMgZ2V0cyBjYWxsZWQgYWZ0ZXIgYXBwcm92aW5nL3JlamVjdGluZy5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcHByb3ZhbFJlc3VsdCh7fSwgYXBwcm92YWwuaWQpO1xyXG4gICAgICAgICAgICBzcHlPbihhcHByb3ZhbFNlcnZpY2UsICdjb21wbGV0ZScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHJlc3VsdCkpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdEFwcHJvdmVSZWplY3QoYXBwcm92ZSkge1xyXG4gICAgICAgICAgICAvLyBDbGlja2luZyB0aGUgYnV0dG9uIHNob3VsZCBwb3AgdXAgdGhlIGNvbXBsZXRpb24gbW9kYWwuXHJcbiAgICAgICAgICAgIGxldCBlbHQgPSBjcmVhdGVFbGVtZW50KGFwcHJvdmFsKTtcclxuICAgICAgICAgICAgbGV0IGJ0bklkID0gKGFwcHJvdmUpID8gJyNidG5BcHByb3ZlJyA6ICcjYnRuUmVqZWN0JztcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGVsdC5maW5kKGJ0bklkKTtcclxuICAgICAgICAgICAgYnRuLmNsaWNrKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gY29uZmlybSB0aGUgY29tcGxldGlvbiBkaWFsb2cuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgYXBwcm9wcmlhdGUgc3R1ZmYgd2FzIGNhbGxlZC5cclxuICAgICAgICAgICAgbGV0IGV4cGVjdGVkRnVuYyA9IChhcHByb3ZlKSA/IHBhbUFwcHJvdmFsU2VydmljZS5hcHByb3ZlIDogcGFtQXBwcm92YWxTZXJ2aWNlLnJlamVjdDtcclxuICAgICAgICAgICAgZXhwZWN0KGV4cGVjdGVkRnVuYykudG9IYXZlQmVlbkNhbGxlZFdpdGgoYXBwcm92YWwuaWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLmNvbXBsZXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChhcHByb3ZhbC5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb21wbGV0aW9uQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdhcHByb3ZlcyB0aGUgd29yayBpdGVtIHdoZW4gY2xpY2tpbmcgdGhlIGFwcHJvdmUgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0QXBwcm92ZVJlamVjdCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlamVjdHMgdGhlIHdvcmsgaXRlbSB3aGVuIGNsaWNraW5nIHRoZSByZWplY3QgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0QXBwcm92ZVJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
