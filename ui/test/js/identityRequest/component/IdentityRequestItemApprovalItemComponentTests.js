System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('spIdentityRequestItemApprovalItem', function () {

                var elementDefinition = '<sp-identity-request-item-approval-item sp-request-item="requestItem" sp-request="request"\n                                                     sp-approval-item="approvalItem"/>',
                    $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    requestItem = undefined,
                    request = undefined,
                    approvalItem = undefined,
                    identityRequestService = undefined,
                    $q = undefined,
                    emailDialogService = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$compile_, $rootScope, IdentityRequestItem, IdentityRequest, identityRequestTestData, ApprovalItemSummary, _identityRequestService_, _emailDialogService_, _$q_) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    requestItem = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_ITEM_1);
                    request = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    approvalItem = new ApprovalItemSummary(identityRequestTestData.IDENTITY_REQUEST_ITEM_1.approvalItemSummaries[0]);
                    identityRequestService = _identityRequestService_;
                    $q = _$q_;
                    emailDialogService = _emailDialogService_;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(requestItem, request, approvalItem) {
                    $scope.requestItem = requestItem;
                    $scope.request = request;
                    $scope.approvalItem = approvalItem;
                    element = $compile(elementDefinition)($scope);
                    $scope.$apply();
                }

                it('throws with no identity request item', function () {
                    expect(function () {
                        return createElement(undefined, request, approvalItem);
                    }).toThrow();
                });

                it('throws with no identity request', function () {
                    expect(function () {
                        return createElement(requestItem, undefined, approvalItem);
                    }).toThrow();
                });

                it('throws with no approval item', function () {
                    expect(function () {
                        return createElement(requestItem, request, undefined);
                    }).toThrow();
                });

                it('renders owner display name', function () {
                    createElement(requestItem, request, approvalItem);
                    expect(angular.element(element).text().trim().indexOf(approvalItem.owner.displayName)).toEqual(0);
                });

                it('renders email and comment button', function () {
                    createElement(requestItem, request, approvalItem);
                    expect(element.find('.identity-request-item-email-btn').length).toEqual(1);
                    expect(element.find('.identity-request-item-comment-btn').length).toEqual(1);
                });

                describe('launches email dialog', function () {
                    var identityRequestService = undefined,
                        emailDialogService = undefined;

                    beforeEach(inject(function (_identityRequestService_, _emailDialogService_) {
                        identityRequestService = _identityRequestService_;
                        emailDialogService = _emailDialogService_;

                        spyOn(identityRequestService, 'getApprovalReminderEmailTemplate');
                        spyOn(identityRequestService, 'sendApprovalReminderEmail');
                        spyOn(emailDialogService, 'sendEmailWithDialog');
                    }));

                    it('should call emailDialogService.sendEmailWithDialog() with correct functions', function () {
                        createElement(requestItem, request, approvalItem);

                        // Click the email button
                        element.find('.identity-request-item-email-btn').click();
                        $scope.$apply();

                        expect(emailDialogService.sendEmailWithDialog).toHaveBeenCalled();

                        // Call the argument functions to make sure the get/send functions are correct
                        var args = emailDialogService.sendEmailWithDialog.calls.mostRecent().args;
                        args[0]();
                        expect(identityRequestService.getApprovalReminderEmailTemplate).toHaveBeenCalledWith(request.id, approvalItem.workItemId);
                        args[1]();
                        expect(identityRequestService.sendApprovalReminderEmail).toHaveBeenCalledWith(request.id, approvalItem.workItemId);
                    });
                });

                describe('comment button', function () {
                    var approvalCommentService = undefined,
                        approvalItem2 = undefined;

                    beforeEach(inject(function (_approvalCommentService_, ApprovalItemSummary, identityRequestTestData) {
                        approvalCommentService = _approvalCommentService_;
                        spyOn(approvalCommentService, 'openCommentDialog');

                        createElement(requestItem, request, approvalItem);

                        // Click the email button
                        element.find('.identity-request-item-comment-btn').click();
                        $scope.$apply();

                        approvalItem2 = new ApprovalItemSummary(identityRequestTestData.IDENTITY_REQUEST_ITEM_1.approvalItemSummaries[1]);
                    }));

                    it('should call approvalCommentService.openCommentDialog() with correct params', function () {
                        expect(approvalCommentService.openCommentDialog).toHaveBeenCalledWith(approvalItem.workItemId, approvalItem.approvalItemId, 'ui_identity_request_comment_dialog_title', approvalItem);
                    });

                    it('should turn green when there are comments', function () {
                        var commentBtn = element.find('button.identity-request-item-comment-btn');
                        expect(commentBtn.hasClass('btn-success')).toBe(true);
                    });

                    it('should show number of comments when there are comments', function () {
                        var commentCount = element.find('span.comment-count');
                        expect(!!commentCount).toBe(true);
                        expect(commentCount.text().indexOf('8') > 0).toBe(true);
                    });

                    it('is hidden if user cannot access comments', function () {
                        createElement(requestItem, request, approvalItem2);
                        var commentBtn = element.find('button.identity-request-item-comment-btn');
                        expect(commentBtn.length).toBe(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbUFwcHJvdmFsSXRlbUNvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsK0JBQStCLFVBQVUsU0FBUzs7O0lBR25JOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLDBCQUEwQjtRQUN2QyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMscUNBQXFDLFlBQU07O2dCQUVoRCxJQUFJLG9CQUFpQjtvQkFHakIsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsY0FBVztvQkFBRSxVQUFPO29CQUFFLGVBQVk7b0JBQUUseUJBQXNCO29CQUFFLEtBQUU7b0JBQ3pGLHFCQUFrQjs7Z0JBRXRCLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVkscUJBQXFCLGlCQUFpQix5QkFDOUQscUJBQXFCLDBCQUEwQixzQkFBc0IsTUFBUztvQkFDN0YsV0FBVztvQkFDWCxTQUFTO29CQUNULGNBQWMsSUFBSSxvQkFBb0Isd0JBQXdCO29CQUM5RCxVQUFVLElBQUksZ0JBQWdCLHdCQUF3QjtvQkFDdEQsZUFDSSxJQUFJLG9CQUFvQix3QkFBd0Isd0JBQXdCLHNCQUFzQjtvQkFDbEcseUJBQXlCO29CQUN6QixLQUFLO29CQUNMLHFCQUFxQjs7O2dCQUd6QixVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsY0FBYyxhQUFhLFNBQVMsY0FBYztvQkFDdkQsT0FBTyxjQUFjO29CQUNyQixPQUFPLFVBQVU7b0JBQ2pCLE9BQU8sZUFBZTtvQkFDdEIsVUFBVSxTQUFTLG1CQUFtQjtvQkFDdEMsT0FBTzs7O2dCQUdYLEdBQUcsd0NBQXdDLFlBQU07b0JBQzdDLE9BQU8sWUFBQTt3QkFVUyxPQVZILGNBQWMsV0FBVyxTQUFTO3VCQUFlOzs7Z0JBR2xFLEdBQUcsbUNBQW1DLFlBQU07b0JBQ3hDLE9BQU8sWUFBQTt3QkFZUyxPQVpILGNBQWMsYUFBYSxXQUFXO3VCQUFlOzs7Z0JBR3RFLEdBQUcsZ0NBQWdDLFlBQU07b0JBQ3JDLE9BQU8sWUFBQTt3QkFjUyxPQWRILGNBQWMsYUFBYSxTQUFTO3VCQUFZOzs7Z0JBR2pFLEdBQUcsOEJBQThCLFlBQU07b0JBQ25DLGNBQWMsYUFBYSxTQUFTO29CQUNwQyxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU8sT0FBTyxRQUFRLGFBQWEsTUFBTSxjQUFjLFFBQVE7OztnQkFHbkcsR0FBRyxvQ0FBb0MsWUFBTTtvQkFDekMsY0FBYyxhQUFhLFNBQVM7b0JBQ3BDLE9BQU8sUUFBUSxLQUFLLG9DQUFvQyxRQUFRLFFBQVE7b0JBQ3hFLE9BQU8sUUFBUSxLQUFLLHNDQUFzQyxRQUFRLFFBQVE7OztnQkFHOUUsU0FBUyx5QkFBeUIsWUFBTTtvQkFDcEMsSUFBSSx5QkFBc0I7d0JBQUUscUJBQWtCOztvQkFFOUMsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLHNCQUF5Qjt3QkFDbEUseUJBQXlCO3dCQUN6QixxQkFBcUI7O3dCQUVyQixNQUFNLHdCQUF3Qjt3QkFDOUIsTUFBTSx3QkFBd0I7d0JBQzlCLE1BQU0sb0JBQW9COzs7b0JBRzlCLEdBQUcsK0VBQStFLFlBQU07d0JBQ3BGLGNBQWMsYUFBYSxTQUFTOzs7d0JBR3BDLFFBQVEsS0FBSyxvQ0FBb0M7d0JBQ2pELE9BQU87O3dCQUVQLE9BQU8sbUJBQW1CLHFCQUFxQjs7O3dCQUcvQyxJQUFJLE9BQU8sbUJBQW1CLG9CQUFvQixNQUFNLGFBQWE7d0JBQ3JFLEtBQUs7d0JBQ0wsT0FBTyx1QkFBdUIsa0NBQ3pCLHFCQUFxQixRQUFRLElBQUksYUFBYTt3QkFDbkQsS0FBSzt3QkFDTCxPQUFPLHVCQUF1QiwyQkFDekIscUJBQXFCLFFBQVEsSUFBSSxhQUFhOzs7O2dCQUkzRCxTQUFTLGtCQUFrQixZQUFNO29CQUM3QixJQUFJLHlCQUFzQjt3QkFBRSxnQkFBYTs7b0JBRXpDLFdBQVcsT0FBTyxVQUFDLDBCQUEwQixxQkFBcUIseUJBQTRCO3dCQUMxRix5QkFBeUI7d0JBQ3pCLE1BQU0sd0JBQXdCOzt3QkFFOUIsY0FBYyxhQUFhLFNBQVM7Ozt3QkFHcEMsUUFBUSxLQUFLLHNDQUFzQzt3QkFDbkQsT0FBTzs7d0JBRVAsZ0JBQ0ksSUFBSSxvQkFBb0Isd0JBQXdCLHdCQUF3QixzQkFBc0I7OztvQkFHdEcsR0FBRyw4RUFBOEUsWUFBTTt3QkFDbkYsT0FBTyx1QkFBdUIsbUJBQW1CLHFCQUFxQixhQUFhLFlBQy9FLGFBQWEsZ0JBQWdCLDRDQUE0Qzs7O29CQUdqRixHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCxJQUFJLGFBQWEsUUFBUSxLQUFLO3dCQUM5QixPQUFPLFdBQVcsU0FBUyxnQkFBZ0IsS0FBSzs7O29CQUdwRCxHQUFHLDBEQUEwRCxZQUFNO3dCQUMvRCxJQUFJLGVBQWUsUUFBUSxLQUFLO3dCQUNoQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEtBQUs7d0JBQzVCLE9BQU8sYUFBYSxPQUFPLFFBQVEsT0FBTyxHQUFHLEtBQUs7OztvQkFHdEQsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsY0FBYyxhQUFhLFNBQVM7d0JBQ3BDLElBQUksYUFBYSxRQUFRLEtBQUs7d0JBQzlCLE9BQU8sV0FBVyxRQUFRLEtBQUs7Ozs7OztHQW1CeEMiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RJdGVtQXBwcm92YWxJdGVtQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xuaW1wb3J0ICcuLi9JZGVudGl0eVJlcXVlc3RUZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdzcElkZW50aXR5UmVxdWVzdEl0ZW1BcHByb3ZhbEl0ZW0nLCAoKSA9PiB7XG5cbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPVxuICAgICAgICAgICAgYDxzcC1pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tYXBwcm92YWwtaXRlbSBzcC1yZXF1ZXN0LWl0ZW09XCJyZXF1ZXN0SXRlbVwiIHNwLXJlcXVlc3Q9XCJyZXF1ZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtYXBwcm92YWwtaXRlbT1cImFwcHJvdmFsSXRlbVwiLz5gLFxuICAgICAgICAkY29tcGlsZSwgJHNjb3BlLCBlbGVtZW50LCByZXF1ZXN0SXRlbSwgcmVxdWVzdCwgYXBwcm92YWxJdGVtLCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAkcSxcbiAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA5ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsIElkZW50aXR5UmVxdWVzdEl0ZW0sIElkZW50aXR5UmVxdWVzdCwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmFsSXRlbVN1bW1hcnksIF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXywgX2VtYWlsRGlhbG9nU2VydmljZV8sIF8kcV8pID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICByZXF1ZXN0SXRlbSA9IG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfSVRFTV8xKTtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xKTtcbiAgICAgICAgYXBwcm92YWxJdGVtID1cbiAgICAgICAgICAgIG5ldyBBcHByb3ZhbEl0ZW1TdW1tYXJ5KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfSVRFTV8xLmFwcHJvdmFsSXRlbVN1bW1hcmllc1swXSk7XG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlID0gX2VtYWlsRGlhbG9nU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocmVxdWVzdEl0ZW0sIHJlcXVlc3QsIGFwcHJvdmFsSXRlbSkge1xuICAgICAgICAkc2NvcGUucmVxdWVzdEl0ZW0gPSByZXF1ZXN0SXRlbTtcbiAgICAgICAgJHNjb3BlLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAkc2NvcGUuYXBwcm92YWxJdGVtID0gYXBwcm92YWxJdGVtO1xuICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoZWxlbWVudERlZmluaXRpb24pKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gaWRlbnRpdHkgcmVxdWVzdCBpdGVtJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCh1bmRlZmluZWQsIHJlcXVlc3QsIGFwcHJvdmFsSXRlbSkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBpZGVudGl0eSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChyZXF1ZXN0SXRlbSwgdW5kZWZpbmVkLCBhcHByb3ZhbEl0ZW0pKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gYXBwcm92YWwgaXRlbScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQocmVxdWVzdEl0ZW0sIHJlcXVlc3QsIHVuZGVmaW5lZCkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW5kZXJzIG93bmVyIGRpc3BsYXkgbmFtZScsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudChyZXF1ZXN0SXRlbSwgcmVxdWVzdCwgYXBwcm92YWxJdGVtKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS50ZXh0KCkudHJpbSgpLmluZGV4T2YoYXBwcm92YWxJdGVtLm93bmVyLmRpc3BsYXlOYW1lKSkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW5kZXJzIGVtYWlsIGFuZCBjb21tZW50IGJ1dHRvbicsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudChyZXF1ZXN0SXRlbSwgcmVxdWVzdCwgYXBwcm92YWxJdGVtKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmlkZW50aXR5LXJlcXVlc3QtaXRlbS1lbWFpbC1idG4nKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tY29tbWVudC1idG4nKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbGF1bmNoZXMgZW1haWwgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgZW1haWxEaWFsb2dTZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV8sIF9lbWFpbERpYWxvZ1NlcnZpY2VfKSA9PiB7XG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xuICAgICAgICAgICAgZW1haWxEaWFsb2dTZXJ2aWNlID0gX2VtYWlsRGlhbG9nU2VydmljZV87XG5cbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdnZXRBcHByb3ZhbFJlbWluZGVyRW1haWxUZW1wbGF0ZScpO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ3NlbmRBcHByb3ZhbFJlbWluZGVyRW1haWwnKTtcbiAgICAgICAgICAgIHNweU9uKGVtYWlsRGlhbG9nU2VydmljZSwgJ3NlbmRFbWFpbFdpdGhEaWFsb2cnKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBlbWFpbERpYWxvZ1NlcnZpY2Uuc2VuZEVtYWlsV2l0aERpYWxvZygpIHdpdGggY29ycmVjdCBmdW5jdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KHJlcXVlc3RJdGVtLCByZXF1ZXN0LCBhcHByb3ZhbEl0ZW0pO1xuXG4gICAgICAgICAgICAvLyBDbGljayB0aGUgZW1haWwgYnV0dG9uXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tZW1haWwtYnRuJykuY2xpY2soKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGVtYWlsRGlhbG9nU2VydmljZS5zZW5kRW1haWxXaXRoRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgICAgIC8vIENhbGwgdGhlIGFyZ3VtZW50IGZ1bmN0aW9ucyB0byBtYWtlIHN1cmUgdGhlIGdldC9zZW5kIGZ1bmN0aW9ucyBhcmUgY29ycmVjdFxuICAgICAgICAgICAgbGV0IGFyZ3MgPSBlbWFpbERpYWxvZ1NlcnZpY2Uuc2VuZEVtYWlsV2l0aERpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGFyZ3NbMF0oKTtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldEFwcHJvdmFsUmVtaW5kZXJFbWFpbFRlbXBsYXRlKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0LmlkLCBhcHByb3ZhbEl0ZW0ud29ya0l0ZW1JZCk7XG4gICAgICAgICAgICBhcmdzWzFdKCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5zZW5kQXBwcm92YWxSZW1pbmRlckVtYWlsKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0LmlkLCBhcHByb3ZhbEl0ZW0ud29ya0l0ZW1JZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbW1lbnQgYnV0dG9uJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXBwcm92YWxDb21tZW50U2VydmljZSwgYXBwcm92YWxJdGVtMjtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2FwcHJvdmFsQ29tbWVudFNlcnZpY2VfLCBBcHByb3ZhbEl0ZW1TdW1tYXJ5LCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSkgPT4ge1xuICAgICAgICAgICAgYXBwcm92YWxDb21tZW50U2VydmljZSA9IF9hcHByb3ZhbENvbW1lbnRTZXJ2aWNlXztcbiAgICAgICAgICAgIHNweU9uKGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsICdvcGVuQ29tbWVudERpYWxvZycpO1xuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KHJlcXVlc3RJdGVtLCByZXF1ZXN0LCBhcHByb3ZhbEl0ZW0pO1xuXG4gICAgICAgICAgICAvLyBDbGljayB0aGUgZW1haWwgYnV0dG9uXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tY29tbWVudC1idG4nKS5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBhcHByb3ZhbEl0ZW0yID1cbiAgICAgICAgICAgICAgICBuZXcgQXBwcm92YWxJdGVtU3VtbWFyeShpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0lURU1fMS5hcHByb3ZhbEl0ZW1TdW1tYXJpZXNbMV0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGFwcHJvdmFsQ29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2coKSB3aXRoIGNvcnJlY3QgcGFyYW1zJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsQ29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGFwcHJvdmFsSXRlbS53b3JrSXRlbUlkLFxuICAgICAgICAgICAgICAgIGFwcHJvdmFsSXRlbS5hcHByb3ZhbEl0ZW1JZCwgJ3VpX2lkZW50aXR5X3JlcXVlc3RfY29tbWVudF9kaWFsb2dfdGl0bGUnLCBhcHByb3ZhbEl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHR1cm4gZ3JlZW4gd2hlbiB0aGVyZSBhcmUgY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbWVudEJ0biA9IGVsZW1lbnQuZmluZCgnYnV0dG9uLmlkZW50aXR5LXJlcXVlc3QtaXRlbS1jb21tZW50LWJ0bicpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbW1lbnRCdG4uaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBudW1iZXIgb2YgY29tbWVudHMgd2hlbiB0aGVyZSBhcmUgY29tbWVudHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tbWVudENvdW50ID0gZWxlbWVudC5maW5kKCdzcGFuLmNvbW1lbnQtY291bnQnKTtcbiAgICAgICAgICAgIGV4cGVjdCghIWNvbW1lbnRDb3VudCkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjb21tZW50Q291bnQudGV4dCgpLmluZGV4T2YoJzgnKSA+IDApLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpcyBoaWRkZW4gaWYgdXNlciBjYW5ub3QgYWNjZXNzIGNvbW1lbnRzJywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChyZXF1ZXN0SXRlbSwgcmVxdWVzdCwgYXBwcm92YWxJdGVtMik7XG4gICAgICAgICAgICBsZXQgY29tbWVudEJ0biA9IGVsZW1lbnQuZmluZCgnYnV0dG9uLmlkZW50aXR5LXJlcXVlc3QtaXRlbS1jb21tZW50LWJ0bicpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbW1lbnRCdG4ubGVuZ3RoKS50b0JlKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
