System.register(['test/js/TestInitializer', 'approval/comment/ApprovalCommentModule', 'test/js/TestModule', 'test/js/CustomMatchers', 'SailPointHelpers'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var approvalCommentModule, testModule, CustomMatchers, expectReject;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalCommentApprovalCommentModule) {
            approvalCommentModule = _approvalCommentApprovalCommentModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsCustomMatchers) {
            CustomMatchers = _testJsCustomMatchers['default'];
        }, function (_SailPointHelpers) {
            expectReject = _SailPointHelpers.expectReject;
        }],
        execute: function () {

            describe('ApprovalCommentService', function () {

                var spModal = undefined,
                    http = undefined,
                    testService = undefined,
                    approvalCommentService = undefined,
                    scope = undefined,
                    title = undefined,
                    approval = undefined,
                    $rootScope = undefined,
                    approvalId = '1234',
                    itemId = '5678';

                /**
                 * Helper function to get the right url
                 *
                 * @param approvalId
                 * @param approvalItemId
                 * @returns {string}
                 */
                var getCommentsUrl = function (approvalId, approvalItemId) {
                    var baseUrl = SailPoint.CONTEXT_PATH + '/ui/rest/approvals';
                    return !!approvalItemId ? baseUrl + '/' + approvalId + '/items/' + approvalItemId + '/comments' : baseUrl + '/' + approvalId + '/comments';
                };

                beforeEach(module(testModule, approvalCommentModule));

                /**
                 * Setup the mocks for our tests.
                 */
                beforeEach(inject(function ($httpBackend, _$rootScope_, _spModal_, _approvalCommentService_, _testService_) {

                    // Save the services.
                    http = $httpBackend;
                    $rootScope = _$rootScope_;
                    scope = $rootScope.$new();
                    spModal = _spModal_;
                    approvalCommentService = _approvalCommentService_;
                    testService = _testService_;

                    title = 'this is a comment dialog';
                    approval = {
                        id: '1234',
                        commentCount: 1
                    };
                    spModal.open = jasmine.createSpy().and.callFake(function () {
                        return {
                            result: testService.createResponsePromise(false)
                        };
                    });
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                /**
                 * Verify that the comment dialog was opened with the appropriate settings.
                 */
                var checkCommentDialog = function () {
                    var templateUrl = undefined,
                        args = undefined;

                    expect(spModal.open).toHaveBeenCalled();

                    args = spModal.open.calls.mostRecent().args[0];

                    templateUrl = 'approval/comment/template/comment-dialog.html';

                    expect(args.templateUrl).toEqual(templateUrl);
                    expect(args.controller).toEqual('ApprovalCommentDialogCtrl as dialogCtrl');
                    expect(args.backdrop).toEqual('static');
                    expect(args.keyboard).toEqual(false);
                };

                describe('openCommentDialog', function () {
                    it('opens the completion dialog', function () {
                        approvalCommentService.openCommentDialog(approvalId, itemId, title, approval);
                        checkCommentDialog();
                    });

                    it('increments commentCount when completion succeeds', function () {
                        approvalCommentService.openCommentDialog(approvalId, itemId, title, approval);
                        $rootScope.$apply();
                        expect(approval.commentCount).toEqual(2);
                    });

                    it('rejects when dialog is cancelled', function () {
                        spModal.open = jasmine.createSpy().and.callFake(function () {
                            return {
                                result: testService.createResponsePromise(true)
                            };
                        });
                        var rejected = false;
                        approvalCommentService.openCommentDialog(approvalId, itemId, title, approval)['catch'](function () {
                            rejected = true;
                        });
                        $rootScope.$apply();
                        expect(rejected).toEqual(true);
                    });
                });

                describe('getComments()', function () {
                    var comments = [{
                        'author': 'James.Smith',
                        'comment': 'some comment here',
                        'date': 1391618385380
                    }, {
                        'author': 'Harry.Dixon',
                        'comment': 'something else to say',
                        'date': 1391618389980
                    }];

                    // Add a custom matcher to check an $http GET response.
                    beforeEach(function () {
                        jasmine.addMatchers(CustomMatchers);
                    });

                    it('gets approval comments', function () {
                        http.expectGET(getCommentsUrl(approvalId)).respond(200, comments);

                        var responseComments = [],
                            gotComments = approvalCommentService.getComments(approvalId);

                        gotComments.then(function (response) {
                            responseComments = response;
                        });

                        http.flush();

                        expect(responseComments).toEqualResponse(comments);
                    });

                    it('gets approval item comments', function () {
                        http.expectGET(getCommentsUrl(approvalId, itemId)).respond(200, comments);

                        var responseComments = [],
                            gotComments = approvalCommentService.getComments(approvalId, itemId);

                        gotComments.then(function (response) {
                            responseComments = response;
                        });

                        http.flush();

                        expect(responseComments).toEqualResponse(comments);
                    });

                    it('fails on REST error', function () {
                        var responseComments = [],
                            rejected = false;

                        http.expectGET(getCommentsUrl(approvalId)).respond(500, '');

                        approvalCommentService.getComments(approvalId).then(function (response) {
                            responseComments = response;
                        })['catch'](function () {
                            rejected = true;
                        });

                        http.flush();
                        expect(rejected).toBe(true);
                        expect(responseComments.length).toEqual(0);
                    });

                    it('throws with no approvalId', function () {
                        expect(function () {
                            approvalCommentService.getComments(null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('addComment()', function () {
                    var promise = undefined,
                        spy = undefined,
                        responseData = {
                        data: {}
                    };

                    it('sends a POST request', function () {
                        http.expectPOST(getCommentsUrl(approvalId), { comment: 'some new comment' }).respond(200, responseData);
                        promise = approvalCommentService.addComment(approvalId, null, 'some new comment')['catch'](expectReject);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('sends a POST request', function () {
                        http.expectPOST(getCommentsUrl(approvalId, itemId), { comment: 'some new comment' }).respond(200, responseData);
                        promise = approvalCommentService.addComment(approvalId, itemId, 'some new comment')['catch'](expectReject);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        http.expectPOST(getCommentsUrl(approvalId)).respond(500, '');
                        promise = approvalCommentService.addComment(approvalId, null, 'some new comment');
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('throws with no approvalId', function () {
                        expect(function () {
                            approvalCommentService.addComment(null, null, 'some new comment');
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('throws with no comment', function () {
                        expect(function () {
                            approvalCommentService.addComment(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL2NvbW1lbnQvQXBwcm92YWxDb21tZW50U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsc0JBQXNCLDBCQUEwQixxQkFBcUIsVUFBVSxTQUFTOzs7OztJQUsxSzs7SUFFQSxJQUFJLHVCQUF1QixZQUFZLGdCQUFnQjtJQUN2RCxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHVCQUF1QjtZQUNoQyxpQkFBaUIsc0JBQXNCO1dBQ3hDLFVBQVUsbUJBQW1CO1lBQzVCLGVBQWUsa0JBUm5COztRQVVBLFNBQVMsWUFBWTs7WUFSN0IsU0FBUywwQkFBMEIsWUFBVzs7Z0JBRTFDLElBQUksVUFBTztvQkFBRSxPQUFJO29CQUFFLGNBQVc7b0JBQUUseUJBQXNCO29CQUFFLFFBQUs7b0JBQUUsUUFBSztvQkFBRSxXQUFRO29CQUFFLGFBQVU7b0JBQ3RGLGFBQWE7b0JBQ2IsU0FBUzs7Ozs7Ozs7O2dCQVNiLElBQUksaUJBQWlCLFVBQUMsWUFBWSxnQkFBbUI7b0JBQ2pELElBQUksVUFBYSxVQUFVLGVBQVk7b0JBQ3ZDLE9BQU8sQ0FBQyxDQUFDLGlCQUFvQixVQUFPLE1BQUksYUFBVSxZQUFVLGlCQUFjLGNBQy9ELFVBQU8sTUFBSSxhQUFVOzs7Z0JBR3BDLFdBQVcsT0FBTyxZQUFZOzs7OztnQkFLOUIsV0FBVyxPQUFPLFVBQVMsY0FBYyxjQUFjLFdBQVcsMEJBQTBCLGVBQWU7OztvQkFHdkcsT0FBTztvQkFDUCxhQUFhO29CQUNiLFFBQVEsV0FBVztvQkFDbkIsVUFBVTtvQkFDVix5QkFBeUI7b0JBQ3pCLGNBQWM7O29CQUVkLFFBQVE7b0JBQ1IsV0FBVzt3QkFDUCxJQUFJO3dCQUNKLGNBQWM7O29CQUVs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QXVCLFdBQVcsWUFBWSxNQUFNLG9CQUFtQixTQUFPO3dCQUN4RixNQUFNLFlBQVksYUFBYTt3QkFDL0IsS0FBSzt3QkFDTCxPQUFPLEtBQUs7OztvQkFHaEIsR0FBRyx3QkFBd0IsWUFBVzt3QkFDbEMsS0FBSyxXQUFXLGVBQWUsWUFBWSxTQUFTLEVBQUUsU0FBUyxzQkFBc0IsUUFBUSxLQUN6Rjt3QkFDSixVQUFVLHVCQUF1QixXQUFXLFlBQVksUUFBUSxvQkFBbUIsU0FBTzt3QkFDMUYsTUFBTSxZQUFZLGFBQWE7d0JBQy9CLEtBQUs7d0JBQ0wsT0FBTyxLQUFLOzs7b0JBR2hCLEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLEtBQUssV0FBVyxlQUFlLGFBQWEsUUFBUSxLQUFLO3dCQUN6RCxVQUFVLHVCQUF1QixXQUFXLFlBQVksTUFBTTt3QkFDOUQsTUFBTSxZQUFZLGFBQWE7d0JBQy9CLEtBQUs7d0JBQ0wsT0FBTyxLQUFLOzs7b0JBR2hCLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLE9BQU8sWUFBVzs0QkFBRSx1QkFBdUIsV0FBVyxNQUFNLE1BQU07MkJBQXdCO3dCQUMxRixLQUFLOzs7b0JBR1QsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsT0FBTyxZQUFXOzRCQUFFLHVCQUF1QixXQUFXLFlBQVk7MkJBQVU7d0JBQzVFLEtBQUs7Ozs7OztHQTJCZCIsImZpbGUiOiJhcHByb3ZhbC9jb21tZW50L0FwcHJvdmFsQ29tbWVudFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYXBwcm92YWxDb21tZW50TW9kdWxlIGZyb20gJ2FwcHJvdmFsL2NvbW1lbnQvQXBwcm92YWxDb21tZW50TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgQ3VzdG9tTWF0Y2hlcnMgZnJvbSAndGVzdC9qcy9DdXN0b21NYXRjaGVycyc7XG5pbXBvcnQge2V4cGVjdFJlamVjdH0gZnJvbSAnU2FpbFBvaW50SGVscGVycyc7XG5cbmRlc2NyaWJlKCdBcHByb3ZhbENvbW1lbnRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgc3BNb2RhbCwgaHR0cCwgdGVzdFNlcnZpY2UsIGFwcHJvdmFsQ29tbWVudFNlcnZpY2UsIHNjb3BlLCB0aXRsZSwgYXBwcm92YWwsICRyb290U2NvcGUsXG4gICAgICAgIGFwcHJvdmFsSWQgPSAnMTIzNCcsXG4gICAgICAgIGl0ZW1JZCA9ICc1Njc4JztcblxuICAgIC8qKlxuICAgICAqIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgdGhlIHJpZ2h0IHVybFxuICAgICAqXG4gICAgICogQHBhcmFtIGFwcHJvdmFsSWRcbiAgICAgKiBAcGFyYW0gYXBwcm92YWxJdGVtSWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGxldCBnZXRDb21tZW50c1VybCA9IChhcHByb3ZhbElkLCBhcHByb3ZhbEl0ZW1JZCkgPT4ge1xuICAgICAgICBsZXQgYmFzZVVybCA9IGAke1NhaWxQb2ludC5DT05URVhUX1BBVEh9L3VpL3Jlc3QvYXBwcm92YWxzYDtcbiAgICAgICAgcmV0dXJuICEhYXBwcm92YWxJdGVtSWQgPyBgJHtiYXNlVXJsfS8ke2FwcHJvdmFsSWR9L2l0ZW1zLyR7YXBwcm92YWxJdGVtSWR9L2NvbW1lbnRzYCA6XG4gICAgICAgICAgICAgICAgYCR7YmFzZVVybH0vJHthcHByb3ZhbElkfS9jb21tZW50c2A7XG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGFwcHJvdmFsQ29tbWVudE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIG1vY2tzIGZvciBvdXIgdGVzdHMuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGh0dHBCYWNrZW5kLCBfJHJvb3RTY29wZV8sIF9zcE1vZGFsXywgX2FwcHJvdmFsQ29tbWVudFNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfKSB7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXG4gICAgICAgIGh0dHAgPSAkaHR0cEJhY2tlbmQ7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIGFwcHJvdmFsQ29tbWVudFNlcnZpY2UgPSBfYXBwcm92YWxDb21tZW50U2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcblxuICAgICAgICB0aXRsZSA9ICd0aGlzIGlzIGEgY29tbWVudCBkaWFsb2cnO1xuICAgICAgICBhcHByb3ZhbCA9IHtcbiAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICBjb21tZW50Q291bnQ6IDFcbiAgICAgICAgfTtcbiAgICAgICAgc3BNb2RhbC5vcGVuID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlUHJvbWlzZShmYWxzZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZ5IHRoYXQgdGhlIGNvbW1lbnQgZGlhbG9nIHdhcyBvcGVuZWQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgc2V0dGluZ3MuXG4gICAgICovXG4gICAgbGV0IGNoZWNrQ29tbWVudERpYWxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdGVtcGxhdGVVcmwsIGFyZ3M7XG5cbiAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIGFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XG5cbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnYXBwcm92YWwvY29tbWVudC90ZW1wbGF0ZS9jb21tZW50LWRpYWxvZy5odG1sJztcblxuICAgICAgICBleHBlY3QoYXJncy50ZW1wbGF0ZVVybCkudG9FcXVhbCh0ZW1wbGF0ZVVybCk7XG4gICAgICAgIGV4cGVjdChhcmdzLmNvbnRyb2xsZXIpLnRvRXF1YWwoJ0FwcHJvdmFsQ29tbWVudERpYWxvZ0N0cmwgYXMgZGlhbG9nQ3RybCcpO1xuICAgICAgICBleHBlY3QoYXJncy5iYWNrZHJvcCkudG9FcXVhbCgnc3RhdGljJyk7XG4gICAgICAgIGV4cGVjdChhcmdzLmtleWJvYXJkKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgZGVzY3JpYmUoJ29wZW5Db21tZW50RGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBpdCgnb3BlbnMgdGhlIGNvbXBsZXRpb24gZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgYXBwcm92YWxDb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZyhhcHByb3ZhbElkLCBpdGVtSWQsIHRpdGxlLCBhcHByb3ZhbCk7XG4gICAgICAgICAgICBjaGVja0NvbW1lbnREaWFsb2coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luY3JlbWVudHMgY29tbWVudENvdW50IHdoZW4gY29tcGxldGlvbiBzdWNjZWVkcycsICgpID0+IHtcbiAgICAgICAgICAgIGFwcHJvdmFsQ29tbWVudFNlcnZpY2Uub3BlbkNvbW1lbnREaWFsb2coYXBwcm92YWxJZCwgaXRlbUlkLCB0aXRsZSwgYXBwcm92YWwpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbC5jb21tZW50Q291bnQpLnRvRXF1YWwoMik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZWplY3RzIHdoZW4gZGlhbG9nIGlzIGNhbmNlbGxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNwTW9kYWwub3BlbiA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlUHJvbWlzZSh0cnVlKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCByZWplY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYXBwcm92YWxDb21tZW50U2VydmljZS5vcGVuQ29tbWVudERpYWxvZyhhcHByb3ZhbElkLCBpdGVtSWQsIHRpdGxlLCBhcHByb3ZhbCkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRDb21tZW50cygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjb21tZW50cyA9IFt7XG4gICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21lIGNvbW1lbnQgaGVyZScsXG4gICAgICAgICAgICAgICAgJ2RhdGUnOiAxMzkxNjE4Mzg1MzgwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgJ2F1dGhvcicgOiAnSGFycnkuRGl4b24nLFxuICAgICAgICAgICAgICAgICdjb21tZW50JyA6ICdzb21ldGhpbmcgZWxzZSB0byBzYXknLFxuICAgICAgICAgICAgICAgICdkYXRlJzogMTM5MTYxODM4OTk4MFxuICAgICAgICAgICAgfV07XG5cbiAgICAgICAgLy8gQWRkIGEgY3VzdG9tIG1hdGNoZXIgdG8gY2hlY2sgYW4gJGh0dHAgR0VUIHJlc3BvbnNlLlxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhDdXN0b21NYXRjaGVycyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRzIGFwcHJvdmFsIGNvbW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChnZXRDb21tZW50c1VybChhcHByb3ZhbElkKSkucmVzcG9uZCgyMDAsIGNvbW1lbnRzKTtcblxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlQ29tbWVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICBnb3RDb21tZW50cyA9IGFwcHJvdmFsQ29tbWVudFNlcnZpY2UuZ2V0Q29tbWVudHMoYXBwcm92YWxJZCk7XG5cbiAgICAgICAgICAgIGdvdENvbW1lbnRzLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDb21tZW50cyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlQ29tbWVudHMpLnRvRXF1YWxSZXNwb25zZShjb21tZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRzIGFwcHJvdmFsIGl0ZW0gY29tbWVudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGdldENvbW1lbnRzVXJsKGFwcHJvdmFsSWQsIGl0ZW1JZCkpLnJlc3BvbmQoMjAwLCBjb21tZW50cyk7XG5cbiAgICAgICAgICAgIGxldCByZXNwb25zZUNvbW1lbnRzID0gW10sXG4gICAgICAgICAgICAgICAgZ290Q29tbWVudHMgPSBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLmdldENvbW1lbnRzKGFwcHJvdmFsSWQsIGl0ZW1JZCk7XG5cbiAgICAgICAgICAgIGdvdENvbW1lbnRzLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDb21tZW50cyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlQ29tbWVudHMpLnRvRXF1YWxSZXNwb25zZShjb21tZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2VDb21tZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIHJlamVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGdldENvbW1lbnRzVXJsKGFwcHJvdmFsSWQpKS5yZXNwb25kKDUwMCwgJycpO1xuXG4gICAgICAgICAgICBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLmdldENvbW1lbnRzKGFwcHJvdmFsSWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29tbWVudHMgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlQ29tbWVudHMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLmdldENvbW1lbnRzKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FkZENvbW1lbnQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgc3B5LFxuICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGE6IHt9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzZW5kcyBhIFBPU1QgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldENvbW1lbnRzVXJsKGFwcHJvdmFsSWQpLCB7IGNvbW1lbnQ6ICdzb21lIG5ldyBjb21tZW50JyB9KS5yZXNwb25kKDIwMCwgcmVzcG9uc2VEYXRhKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLmFkZENvbW1lbnQoYXBwcm92YWxJZCwgbnVsbCwgJ3NvbWUgbmV3IGNvbW1lbnQnKS5jYXRjaChleHBlY3RSZWplY3QpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2VuZHMgYSBQT1NUIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRDb21tZW50c1VybChhcHByb3ZhbElkLCBpdGVtSWQpLCB7IGNvbW1lbnQ6ICdzb21lIG5ldyBjb21tZW50JyB9KS5yZXNwb25kKDIwMCxcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsQ29tbWVudFNlcnZpY2UuYWRkQ29tbWVudChhcHByb3ZhbElkLCBpdGVtSWQsICdzb21lIG5ldyBjb21tZW50JykuY2F0Y2goZXhwZWN0UmVqZWN0KTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRDb21tZW50c1VybChhcHByb3ZhbElkKSkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbENvbW1lbnRTZXJ2aWNlLmFkZENvbW1lbnQoYXBwcm92YWxJZCwgbnVsbCwgJ3NvbWUgbmV3IGNvbW1lbnQnKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZShwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGFwcHJvdmFsSWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxDb21tZW50U2VydmljZS5hZGRDb21tZW50KG51bGwsIG51bGwsICdzb21lIG5ldyBjb21tZW50Jyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNvbW1lbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxDb21tZW50U2VydmljZS5hZGRDb21tZW50KGFwcHJvdmFsSWQsIG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
