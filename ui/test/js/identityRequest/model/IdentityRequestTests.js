System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequest', function () {
                var IdentityRequest = undefined,
                    identityRequestTestData = undefined,
                    IdentityRequestItem = undefined,
                    IdentityRequestPolicyViolation = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_IdentityRequest_, _identityRequestTestData_, _IdentityRequestItem_, _IdentityRequestPolicyViolation_) {
                    IdentityRequest = _IdentityRequest_;
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestItem = _IdentityRequestItem_;
                    IdentityRequestPolicyViolation = _IdentityRequestPolicyViolation_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_1,
                            identityRequest = new IdentityRequest(data);
                        expect(identityRequest.id).toEqual(data.id);
                        expect(identityRequest.externalTicketId).toEqual(data.externalTicketId);
                        expect(identityRequest.requestId).toEqual(data.requestId);
                        expect(identityRequest.type).toEqual(data.type);
                        expect(identityRequest.targetDisplayName).toEqual(data.targetDisplayName);
                        expect(identityRequest.requesterDisplayName).toEqual(data.requesterDisplayName);
                        expect(identityRequest.priority).toEqual(data.priority);
                        expect(identityRequest.executionStatus).toEqual(data.executionStatus);
                        expect(identityRequest.items).toBeDefined();
                        expect(identityRequest.items.length).toEqual(1);
                        expect(identityRequest.items[0] instanceof IdentityRequestItem).toEqual(true);
                        expect(identityRequest.cancelable).toEqual(data.cancelable);
                        expect(identityRequest.endDate).toEqual(new Date(data.endDate));
                        expect(identityRequest.terminatedDate).toEqual(new Date(data.terminatedDate));
                        expect(identityRequest.state).toEqual(data.state);
                        expect(identityRequest.verificationDate).toEqual(new Date(data.verificationDate));
                        expect(identityRequest.completionStatus).toEqual(data.completionStatus);
                        expect(identityRequest.policyViolations).toBeDefined();
                        expect(identityRequest.policyViolations.length).toEqual(2);
                        expect(identityRequest.policyViolations[0] instanceof IdentityRequestPolicyViolation).toEqual(true);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new IdentityRequest();
                        }).toThrow();
                    });
                });

                function testStatus(executionStatus, completionStatus, functionName, expectedValue) {
                    var data = identityRequestTestData.IDENTITY_REQUEST_1,
                        identityRequest = new IdentityRequest(data);
                    identityRequest.executionStatus = executionStatus;
                    identityRequest.completionStatus = completionStatus;
                    expect(identityRequest[functionName]()).toEqual(expectedValue);
                }

                describe('isCanceled()', function () {
                    it('returns true for Terminated', function () {
                        testStatus('Terminated', undefined, 'isCanceled', true);
                    });

                    it('returns false for non-Terminated', function () {
                        testStatus('Completed', undefined, 'isCanceled', false);
                        testStatus('Executing', undefined, 'isCanceled', false);
                        testStatus('Verifying', undefined, 'isCanceled', false);
                    });
                });

                describe('isComplete()', function () {
                    it('returns true for Completed', function () {
                        testStatus('Completed', undefined, 'isComplete', true);
                    });

                    it('returns false for non-Completed', function () {
                        testStatus('Terminated', undefined, 'isComplete', false);
                        testStatus('Executing', undefined, 'isComplete', false);
                        testStatus('Verifying', undefined, 'isComplete', false);
                    });
                });

                describe('isSuccess()', function () {
                    it('returns true for Completed with Success', function () {
                        testStatus('Completed', 'Success', 'isSuccess', true);
                    });

                    it('returns false if not completed with success', function () {
                        testStatus('Terminated', undefined, 'isSuccess', false);
                        testStatus('Executing', undefined, 'isSuccess', false);
                        testStatus('Verifying', undefined, 'isSuccess', false);
                        testStatus('Completed', 'Failure', 'isSuccess', false);
                        testStatus('Completed', 'Incomplete', 'isSuccess', false);
                    });
                });

                describe('isFailure()', function () {
                    it('returns true for Completed with Failure', function () {
                        testStatus('Completed', 'Failure', 'isFailure', true);
                    });

                    it('returns false if not completed with failure', function () {
                        testStatus('Terminated', undefined, 'isFailure', false);
                        testStatus('Executing', undefined, 'isFailure', false);
                        testStatus('Verifying', undefined, 'isFailure', false);
                        testStatus('Completed', 'Success', 'isFailure', false);
                        testStatus('Completed', 'Incomplete', 'isFailure', false);
                    });
                });

                describe('isPartialSuccess', function () {
                    it('returns true for Completed with Incomplete', function () {
                        testStatus('Completed', 'Incomplete', 'isPartialSuccess', true);
                    });

                    it('returns false if not completed with incomplete', function () {
                        testStatus('Terminated', undefined, 'isPartialSuccess', false);
                        testStatus('Executing', undefined, 'isPartialSuccess', false);
                        testStatus('Verifying', undefined, 'isPartialSuccess', false);
                        testStatus('Completed', 'Success', 'isPartialSuccess', false);
                        testStatus('Completed', 'Failure', 'isPartialSuccess', false);
                    });
                });

                describe('isExecuting', function () {
                    it('returns true for Pending or Verifying status', function () {
                        testStatus('Pending', undefined, 'isExecuting', true);
                        testStatus('Verifying', undefined, 'isExecuting', true);
                    });

                    it('returns false if not pending or verifying', function () {
                        testStatus('Terminated', undefined, 'isExecuting', false);
                        testStatus('Completed', undefined, 'isExecuting', false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLCtCQUErQixVQUFVLFNBQVM7OztJQUduSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSwwQkFBMEI7UUFDdkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLG1CQUFtQixZQUFXO2dCQUNuQyxJQUFJLGtCQUFlO29CQUFFLDBCQUF1QjtvQkFBRSxzQkFBbUI7b0JBQUUsaUNBQThCOztnQkFFakcsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsbUJBQW1CLDJCQUMxQyx1QkFBdUIsa0NBQWtDO29CQUN6RCxrQkFBa0I7b0JBQ2xCLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixpQ0FBaUM7OztnQkFHckMsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyx3QkFBd0I7NEJBQy9CLGtCQUFrQixJQUFJLGdCQUFnQjt3QkFDMUMsT0FBTyxnQkFBZ0IsSUFBSSxRQUFRLEtBQUs7d0JBQ3hDLE9BQU8sZ0JBQWdCLGtCQUFrQixRQUFRLEtBQUs7d0JBQ3RELE9BQU8sZ0JBQWdCLFdBQVcsUUFBUSxLQUFLO3dCQUMvQyxPQUFPLGdCQUFnQixNQUFNLFFBQVEsS0FBSzt3QkFDMUMsT0FBTyxnQkFBZ0IsbUJBQW1CLFFBQVEsS0FBSzt3QkFDdkQsT0FBTyxnQkFBZ0Isc0JBQXNCLFFBQVEsS0FBSzt3QkFDMUQsT0FBTyxnQkFBZ0IsVUFBVSxRQUFRLEtBQUs7d0JBQzlDLE9BQU8sZ0JBQWdCLGlCQUFpQixRQUFRLEtBQUs7d0JBQ3JELE9BQU8sZ0JBQWdCLE9BQU87d0JBQzlCLE9BQU8sZ0JBQWdC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d0JBQ2hELFdBQVcsYUFBYSxXQUFXLGVBQWU7OztvQkFHdEQsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsV0FBVyxjQUFjLFdBQVcsZUFBZTt3QkFDbkQsV0FBVyxhQUFhLFdBQVcsZUFBZTs7Ozs7O0dBVzNEIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBJZGVudGl0eVJlcXVlc3QsIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLCBJZGVudGl0eVJlcXVlc3RJdGVtLCBJZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb247XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0lkZW50aXR5UmVxdWVzdF8sIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sXHJcbiAgICAgICAgX0lkZW50aXR5UmVxdWVzdEl0ZW1fLCBfSWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uXykge1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdCA9IF9JZGVudGl0eVJlcXVlc3RfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtID0gX0lkZW50aXR5UmVxdWVzdEl0ZW1fO1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbiA9IF9JZGVudGl0eVJlcXVlc3RQb2xpY3lWaW9sYXRpb25fO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSxcclxuICAgICAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoZGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QuaWQpLnRvRXF1YWwoZGF0YS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QuZXh0ZXJuYWxUaWNrZXRJZCkudG9FcXVhbChkYXRhLmV4dGVybmFsVGlja2V0SWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0LnJlcXVlc3RJZCkudG9FcXVhbChkYXRhLnJlcXVlc3RJZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QudHlwZSkudG9FcXVhbChkYXRhLnR5cGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0LnRhcmdldERpc3BsYXlOYW1lKS50b0VxdWFsKGRhdGEudGFyZ2V0RGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0LnJlcXVlc3RlckRpc3BsYXlOYW1lKS50b0VxdWFsKGRhdGEucmVxdWVzdGVyRGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0LnByaW9yaXR5KS50b0VxdWFsKGRhdGEucHJpb3JpdHkpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0LmV4ZWN1dGlvblN0YXR1cykudG9FcXVhbChkYXRhLmV4ZWN1dGlvblN0YXR1cyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QuaXRlbXMpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QuaXRlbXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0Lml0ZW1zWzBdIGluc3RhbmNlb2YgSWRlbnRpdHlSZXF1ZXN0SXRlbSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdC5jYW5jZWxhYmxlKS50b0VxdWFsKGRhdGEuY2FuY2VsYWJsZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QuZW5kRGF0ZSkudG9FcXVhbChuZXcgRGF0ZShkYXRhLmVuZERhdGUpKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdC50ZXJtaW5hdGVkRGF0ZSkudG9FcXVhbChuZXcgRGF0ZShkYXRhLnRlcm1pbmF0ZWREYXRlKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3Quc3RhdGUpLnRvRXF1YWwoZGF0YS5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QudmVyaWZpY2F0aW9uRGF0ZSkudG9FcXVhbChuZXcgRGF0ZShkYXRhLnZlcmlmaWNhdGlvbkRhdGUpKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdC5jb21wbGV0aW9uU3RhdHVzKS50b0VxdWFsKGRhdGEuY29tcGxldGlvblN0YXR1cyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3QucG9saWN5VmlvbGF0aW9ucykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdC5wb2xpY3lWaW9sYXRpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdC5wb2xpY3lWaW9sYXRpb25zWzBdIGluc3RhbmNlb2YgSWRlbnRpdHlSZXF1ZXN0UG9saWN5VmlvbGF0aW9uKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIGRhdGEgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IElkZW50aXR5UmVxdWVzdCgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdFN0YXR1cyhleGVjdXRpb25TdGF0dXMsIGNvbXBsZXRpb25TdGF0dXMsIGZ1bmN0aW9uTmFtZSwgZXhwZWN0ZWRWYWx1ZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xLFxyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGRhdGEpO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdC5leGVjdXRpb25TdGF0dXMgPSBleGVjdXRpb25TdGF0dXM7XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LmNvbXBsZXRpb25TdGF0dXMgPSBjb21wbGV0aW9uU3RhdHVzO1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RbZnVuY3Rpb25OYW1lXSgpKS50b0VxdWFsKGV4cGVjdGVkVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdpc0NhbmNlbGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgZm9yIFRlcm1pbmF0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1Rlcm1pbmF0ZWQnLCB1bmRlZmluZWQsICdpc0NhbmNlbGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tVGVybWluYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnQ29tcGxldGVkJywgdW5kZWZpbmVkLCAnaXNDYW5jZWxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnRXhlY3V0aW5nJywgdW5kZWZpbmVkLCAnaXNDYW5jZWxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnVmVyaWZ5aW5nJywgdW5kZWZpbmVkLCAnaXNDYW5jZWxlZCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNDb21wbGV0ZSgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGZvciBDb21wbGV0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0NvbXBsZXRlZCcsIHVuZGVmaW5lZCwgJ2lzQ29tcGxldGUnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1Db21wbGV0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1Rlcm1pbmF0ZWQnLCB1bmRlZmluZWQsICdpc0NvbXBsZXRlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdFeGVjdXRpbmcnLCB1bmRlZmluZWQsICdpc0NvbXBsZXRlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdWZXJpZnlpbmcnLCB1bmRlZmluZWQsICdpc0NvbXBsZXRlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1N1Y2Nlc3MoKScsICgpID0+IHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgdHJ1ZSBmb3IgQ29tcGxldGVkIHdpdGggU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnQ29tcGxldGVkJywgJ1N1Y2Nlc3MnLCAnaXNTdWNjZXNzJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBjb21wbGV0ZWQgd2l0aCBzdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdUZXJtaW5hdGVkJywgdW5kZWZpbmVkLCAnaXNTdWNjZXNzJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdFeGVjdXRpbmcnLCB1bmRlZmluZWQsICdpc1N1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1ZlcmlmeWluZycsIHVuZGVmaW5lZCwgJ2lzU3VjY2VzcycsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnQ29tcGxldGVkJywgJ0ZhaWx1cmUnLCAnaXNTdWNjZXNzJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdDb21wbGV0ZWQnLCAnSW5jb21wbGV0ZScsICdpc1N1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzRmFpbHVyZSgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGZvciBDb21wbGV0ZWQgd2l0aCBGYWlsdXJlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdDb21wbGV0ZWQnLCAnRmFpbHVyZScsICdpc0ZhaWx1cmUnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IGNvbXBsZXRlZCB3aXRoIGZhaWx1cmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1Rlcm1pbmF0ZWQnLCB1bmRlZmluZWQsICdpc0ZhaWx1cmUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0V4ZWN1dGluZycsIHVuZGVmaW5lZCwgJ2lzRmFpbHVyZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnVmVyaWZ5aW5nJywgdW5kZWZpbmVkLCAnaXNGYWlsdXJlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdDb21wbGV0ZWQnLCAnU3VjY2VzcycsICdpc0ZhaWx1cmUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0NvbXBsZXRlZCcsICdJbmNvbXBsZXRlJywgJ2lzRmFpbHVyZScsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNQYXJ0aWFsU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgdHJ1ZSBmb3IgQ29tcGxldGVkIHdpdGggSW5jb21wbGV0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnQ29tcGxldGVkJywgJ0luY29tcGxldGUnLCAnaXNQYXJ0aWFsU3VjY2VzcycsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgY29tcGxldGVkIHdpdGggaW5jb21wbGV0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnVGVybWluYXRlZCcsIHVuZGVmaW5lZCwgJ2lzUGFydGlhbFN1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0V4ZWN1dGluZycsIHVuZGVmaW5lZCwgJ2lzUGFydGlhbFN1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1ZlcmlmeWluZycsIHVuZGVmaW5lZCwgJ2lzUGFydGlhbFN1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0NvbXBsZXRlZCcsICdTdWNjZXNzJywgJ2lzUGFydGlhbFN1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ0NvbXBsZXRlZCcsICdGYWlsdXJlJywgJ2lzUGFydGlhbFN1Y2Nlc3MnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNFeGVjdXRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgZm9yIFBlbmRpbmcgb3IgVmVyaWZ5aW5nIHN0YXR1cycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnUGVuZGluZycsIHVuZGVmaW5lZCwgJ2lzRXhlY3V0aW5nJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0dXMoJ1ZlcmlmeWluZycsIHVuZGVmaW5lZCwgJ2lzRXhlY3V0aW5nJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBwZW5kaW5nIG9yIHZlcmlmeWluZycsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXR1cygnVGVybWluYXRlZCcsIHVuZGVmaW5lZCwgJ2lzRXhlY3V0aW5nJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdHVzKCdDb21wbGV0ZWQnLCB1bmRlZmluZWQsICdpc0V4ZWN1dGluZycsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
