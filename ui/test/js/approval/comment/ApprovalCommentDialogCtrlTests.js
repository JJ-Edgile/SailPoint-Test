System.register(['test/js/TestInitializer', 'approval/comment/ApprovalCommentModule', 'approval/ApprovalModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the ApprovalCommentDialogCtrl.
     */
    'use strict';

    var approvalCommentModule, approvalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalCommentApprovalCommentModule) {
            approvalCommentModule = _approvalCommentApprovalCommentModule['default'];
        }, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }],
        execute: function () {
            describe('ApprovalCommentDialogCtrl', function () {
                var ctrl = undefined,
                    $controller = undefined,
                    approvalCommentService = undefined,
                    scope = undefined,
                    comments = undefined,
                    http = undefined,
                    approval = undefined,
                    approvalItem = undefined,
                    callback = undefined;

                beforeEach(module(approvalCommentModule, approvalModule));

                /**
                 * Create mock objects for our tests.
                 */
                beforeEach(inject(function (_$controller_, $q, $rootScope, _approvalCommentService_, $httpBackend) {
                    $controller = _$controller_;
                    scope = $rootScope.$new();
                    approvalCommentService = _approvalCommentService_;
                    http = $httpBackend;

                    // The controller will have the approval and item by default.  These can be
                    // removed by passing parameters to createController.
                    approval = { id: '1234' };
                    approvalItem = { id: '5678' };
                    callback = jasmine.createSpy();

                    comments = [{
                        'author': 'James Smith',
                        'comment': 'snake, report!',
                        'date': '452436536456'
                    }, {
                        'author': 'Snake',
                        'comment': 'augh, broke my knife',
                        'date': '452436536654'
                    }, {
                        'author': 'Random Guy',
                        'comment': 'olololololololololololololo',
                        'date': '452436536789'
                    }];

                    spyOn(approvalCommentService, 'getComments').and.callThrough();
                    spyOn(approvalCommentService, 'addComment').and.callThrough();
                }));

                /**
                 * helper function to create controller
                 */
                function createController(approvalId, approvalItemId) {
                    return $controller('ApprovalCommentDialogCtrl', {
                        approvalId: approvalId,
                        approvalCommentService: approvalCommentService,
                        approvalItemId: approvalItemId,
                        comments: comments,
                        errorCallback: callback
                    });
                }

                it('throws if approval id is not provided', function () {
                    expect(function () {
                        ctrl = createController(null, null);
                        ctrl.$onInit();
                    }).toThrow();
                });

                describe('validate', function () {
                    beforeEach(function () {
                        ctrl = createController(approval.id, null);
                    });

                    it('will validate if text is entered', function () {
                        ctrl.newComment.text = 'new comment text';
                        expect(ctrl.validate()).toBe(true);
                    });

                    it('will validate if text is entered', function () {
                        ctrl.newComment.text = undefined;
                        expect(ctrl.validate()).toBe(false);
                    });
                });

                /**
                 * test the controller when set to pull/add comments for an approval
                 */
                describe('test Approval', function () {
                    beforeEach(function () {
                        ctrl = createController(approval.id, null);
                        ctrl.newComment.text = 'new comment text';
                    });

                    it('adds a comment', function () {
                        http.expectPOST(SailPoint.CONTEXT_PATH + 'ui/rest/approvals/comments').respond(200, '');
                        ctrl.addComment();
                        expect(approvalCommentService.addComment).toHaveBeenCalledWith('1234', null, 'new comment text');
                    });
                });

                /**
                 * test the controller when set to pull/add comments for an approval item
                 */
                describe('test ApprovalItem', function () {
                    beforeEach(function () {
                        ctrl = createController(approval.id, approvalItem.id);
                        ctrl.newComment.text = 'new comment text';
                    });

                    it('adds an item comment', function () {
                        http.expectPOST(SailPoint.CONTEXT_PATH + 'ui/rest/approvals/comments').respond(200, '');
                        ctrl.addComment();
                        expect(approvalCommentService.addComment).toHaveBeenCalledWith('1234', '5678', 'new comment text');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL2NvbW1lbnQvQXBwcm92YWxDb21tZW50RGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsNEJBQTRCLFVBQVUsU0FBUzs7Ozs7Ozs7SUFRakk7O0lBRUEsSUFBSSx1QkFBdUI7SUFDM0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSx5QkFBeUI7WUFDbEMsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNkJBQTZCLFlBQVc7Z0JBQzdDLElBQUksT0FBSTtvQkFBRSxjQUFXO29CQUFFLHlCQUFzQjtvQkFBRSxRQUFLO29CQUFFLFdBQVE7b0JBQUUsT0FBSTtvQkFBRSxXQUFRO29CQUFFLGVBQVk7b0JBQUUsV0FBUTs7Z0JBRXRHLFdBQVcsT0FBTyx1QkFBdUI7Ozs7O2dCQUt6QyxXQUFXLE9BQU8sVUFBUyxlQUFlLElBQUksWUFBWSwwQkFBMEIsY0FBYztvQkFDOUYsY0FBYztvQkFDZCxRQUFRLFdBQVc7b0JBQ25CLHlCQUF5QjtvQkFDekIsT0FBTzs7OztvQkFJUCxXQUFXLEVBQUMsSUFBSTtvQkFDaEIsZUFBZSxFQUFDLElBQUk7b0JBQ3BCLFdBQVcsUUFBUTs7b0JBRW5CLFdBQVcsQ0FDSDt3QkFDSSxVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsUUFBUTt1QkFFWjt3QkFDSSxVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsUUFBUTt1QkFFWjt3QkFDSSxVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsUUFBUTs7O29CQUlwQixNQUFNLHdCQUF3QixlQUFlLElBQUk7b0JBQ2pELE1BQU0sd0JBQXdCLGNBQWMsSUFBSTs7Ozs7O2dCQU1wRCxTQUFTLGlCQUFpQixZQUFZLGdCQUFnQjtvQkFDbEQsT0FBTyxZQUFZLDZCQUE2Qjt3QkFDNUMsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixlQUFlOzs7O2dCQUl2QixHQUFHLHlDQUF5QyxZQUFNO29CQUM5QyxPQUFPLFlBQU07d0JBQ1QsT0FBTyxpQkFBaUIsTUFBTTt3QkFDOUIsS0FBSzt1QkFDTjs7O2dCQUdQLFNBQVMsWUFBWSxZQUFNO29CQUN2QixXQUFXLFlBQVc7d0JBQ2xCLE9BQU8saUJBQWlCLFNBQVMsSUFBSTs7O29CQUd6QyxHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxLQUFLLFdBQVcsT0FBTzt3QkFDdkIsT0FBTyxLQUFLLFlBQVksS0FBSzs7O29CQUdqQyxHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxLQUFLLFdBQVcsT0FBTzt3QkFDdkIsT0FBTyxLQUFLLFlBQVksS0FBSzs7Ozs7OztnQkFPckMsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsV0FBVyxZQUFXO3dCQUNsQixPQUFPLGlCQUFpQixTQUFTLElBQUk7d0JBQ3JDLEtBQUssV0FBVyxPQUFPOzs7b0JBRzNCLEdBQUcsa0JBQWtCLFlBQVc7d0JBQzVCLEtBQUssV0FBVyxVQUFVLGVBQWUsOEJBQ3pDLFFBQVEsS0FBSzt3QkFDYixLQUFLO3dCQUNMLE9BQU8sdUJBQXVCLFlBQVkscUJBQXFCLFFBQVEsTUFBTTs7Ozs7OztnQkFPckYsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsV0FBVyxZQUFXO3dCQUNsQixPQUFPLGlCQUFpQixTQUFTLElBQUksYUFBYTt3QkFDbEQsS0FBSyxXQUFXLE9BQU87OztvQkFHM0IsR0FBRyx3QkFBd0IsWUFBVzt3QkFDbEMsS0FBSyxXQUFXLFVBQVUsZUFBZSw4QkFDekMsUUFBUSxLQUFLO3dCQUNiLEtBQUs7d0JBQ0wsT0FBTyx1QkFBdUIsWUFBWSxxQkFBcUIsUUFBUSxRQUFROzs7Ozs7R0FleEYiLCJmaWxlIjoiYXBwcm92YWwvY29tbWVudC9BcHByb3ZhbENvbW1lbnREaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFwcHJvdmFsQ29tbWVudE1vZHVsZSBmcm9tICdhcHByb3ZhbC9jb21tZW50L0FwcHJvdmFsQ29tbWVudE1vZHVsZSc7XG5pbXBvcnQgYXBwcm92YWxNb2R1bGUgZnJvbSAnYXBwcm92YWwvQXBwcm92YWxNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgQXBwcm92YWxDb21tZW50RGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ0FwcHJvdmFsQ29tbWVudERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgY3RybCwgJGNvbnRyb2xsZXIsIGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsIHNjb3BlLCBjb21tZW50cywgaHR0cCwgYXBwcm92YWwsIGFwcHJvdmFsSXRlbSwgY2FsbGJhY2s7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhcHByb3ZhbENvbW1lbnRNb2R1bGUsIGFwcHJvdmFsTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbW9jayBvYmplY3RzIGZvciBvdXIgdGVzdHMuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgJHEsICRyb290U2NvcGUsIF9hcHByb3ZhbENvbW1lbnRTZXJ2aWNlXywgJGh0dHBCYWNrZW5kKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgYXBwcm92YWxDb21tZW50U2VydmljZSA9IF9hcHByb3ZhbENvbW1lbnRTZXJ2aWNlXztcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcblxuICAgICAgICAvLyBUaGUgY29udHJvbGxlciB3aWxsIGhhdmUgdGhlIGFwcHJvdmFsIGFuZCBpdGVtIGJ5IGRlZmF1bHQuICBUaGVzZSBjYW4gYmVcbiAgICAgICAgLy8gcmVtb3ZlZCBieSBwYXNzaW5nIHBhcmFtZXRlcnMgdG8gY3JlYXRlQ29udHJvbGxlci5cbiAgICAgICAgYXBwcm92YWwgPSB7aWQ6ICcxMjM0J307XG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IHtpZDogJzU2NzgnfTtcbiAgICAgICAgY2FsbGJhY2sgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuXG4gICAgICAgIGNvbW1lbnRzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2F1dGhvcic6ICdKYW1lcyBTbWl0aCcsXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50JzogJ3NuYWtlLCByZXBvcnQhJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiAnNDUyNDM2NTM2NDU2J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnYXV0aG9yJzogJ1NuYWtlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnOiAnYXVnaCwgYnJva2UgbXkga25pZmUnLFxuICAgICAgICAgICAgICAgICAgICAnZGF0ZSc6ICc0NTI0MzY1MzY2NTQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICdhdXRob3InOiAnUmFuZG9tIEd1eScsXG4gICAgICAgICAgICAgICAgICAgICdjb21tZW50JzogJ29sb2xvbG9sb2xvbG9sb2xvbG9sb2xvbG9sbycsXG4gICAgICAgICAgICAgICAgICAgICdkYXRlJzogJzQ1MjQzNjUzNjc4OSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgIHNweU9uKGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsICdnZXRDb21tZW50cycpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICBzcHlPbihhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLCAnYWRkQ29tbWVudCcpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIGhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgY29udHJvbGxlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoYXBwcm92YWxJZCwgYXBwcm92YWxJdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdBcHByb3ZhbENvbW1lbnREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgYXBwcm92YWxJZDogYXBwcm92YWxJZCxcbiAgICAgICAgICAgIGFwcHJvdmFsQ29tbWVudFNlcnZpY2U6IGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsXG4gICAgICAgICAgICBhcHByb3ZhbEl0ZW1JZDogYXBwcm92YWxJdGVtSWQsXG4gICAgICAgICAgICBjb21tZW50czogY29tbWVudHMsXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgndGhyb3dzIGlmIGFwcHJvdmFsIGlkIGlzIG5vdCBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKG51bGwsIG51bGwpO1xuICAgICAgICAgICAgY3RybC4kb25Jbml0KCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd2YWxpZGF0ZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGFwcHJvdmFsLmlkLCBudWxsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3dpbGwgdmFsaWRhdGUgaWYgdGV4dCBpcyBlbnRlcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgY3RybC5uZXdDb21tZW50LnRleHQgPSAnbmV3IGNvbW1lbnQgdGV4dCc7XG4gICAgICAgICAgICBleHBlY3QoY3RybC52YWxpZGF0ZSgpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2lsbCB2YWxpZGF0ZSBpZiB0ZXh0IGlzIGVudGVyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjdHJsLm5ld0NvbW1lbnQudGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnZhbGlkYXRlKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIHRlc3QgdGhlIGNvbnRyb2xsZXIgd2hlbiBzZXQgdG8gcHVsbC9hZGQgY29tbWVudHMgZm9yIGFuIGFwcHJvdmFsXG4gICAgICovXG4gICAgZGVzY3JpYmUoJ3Rlc3QgQXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGFwcHJvdmFsLmlkLCBudWxsKTtcbiAgICAgICAgICAgIGN0cmwubmV3Q29tbWVudC50ZXh0ID0gJ25ldyBjb21tZW50IHRleHQnO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyBhIGNvbW1lbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChTYWlsUG9pbnQuQ09OVEVYVF9QQVRIICsgJ3VpL3Jlc3QvYXBwcm92YWxzL2NvbW1lbnRzJykuXG4gICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgY3RybC5hZGRDb21tZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxDb21tZW50U2VydmljZS5hZGRDb21tZW50KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnMTIzNCcsIG51bGwsICduZXcgY29tbWVudCB0ZXh0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogdGVzdCB0aGUgY29udHJvbGxlciB3aGVuIHNldCB0byBwdWxsL2FkZCBjb21tZW50cyBmb3IgYW4gYXBwcm92YWwgaXRlbVxuICAgICAqL1xuICAgIGRlc2NyaWJlKCd0ZXN0IEFwcHJvdmFsSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoYXBwcm92YWwuaWQsIGFwcHJvdmFsSXRlbS5pZCk7XG4gICAgICAgICAgICBjdHJsLm5ld0NvbW1lbnQudGV4dCA9ICduZXcgY29tbWVudCB0ZXh0JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgYW4gaXRlbSBjb21tZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICd1aS9yZXN0L2FwcHJvdmFscy9jb21tZW50cycpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGN0cmwuYWRkQ29tbWVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsQ29tbWVudFNlcnZpY2UuYWRkQ29tbWVudCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJzEyMzQnLCAnNTY3OCcsICduZXcgY29tbWVudCB0ZXh0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
