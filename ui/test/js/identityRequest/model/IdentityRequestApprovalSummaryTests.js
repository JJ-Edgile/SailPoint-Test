System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequestApprovalSummary', function () {
                var identityRequestTestData = undefined,
                    IdentityRequestApprovalSummary = undefined,
                    IdentityRequestApprovalComment = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestTestData_, _IdentityRequestApprovalSummary_, _IdentityRequestApprovalComment_) {
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestApprovalSummary = _IdentityRequestApprovalSummary_;
                    IdentityRequestApprovalComment = _IdentityRequestApprovalComment_;
                }));

                describe('init', function () {

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new IdentityRequestApprovalSummary();
                        }).toThrow();
                    });

                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_APPROVAL_SUMMARY_1,
                            test = new IdentityRequestApprovalSummary(data);
                        expect(test.workItemId).toEqual(data.workItemId);
                        expect(test.workItemArchiveId).toEqual(data.workItemArchiveId);
                        expect(test.workItemName).toEqual(data.workItemName);
                        expect(test.ownerDisplayName).toEqual(data.ownerDisplayName);
                        expect(test.comments).toBeDefined();
                        expect(test.comments[0] instanceof IdentityRequestApprovalComment).toEqual(true);
                        expect(test.comments.length).toEqual(data.comments.length);
                        expect(test.openDate).toEqual(new Date(data.openDate));
                        expect(test.completeDate).toEqual(new Date(data.completeDate));
                        expect(test.status).toEqual(data.status);
                        expect(test.description).toEqual(data.description);
                        expect(test.approvalItemCount).toEqual(data.approvalItemCount);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbFN1bW1hcnlUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLCtCQUErQixVQUFVLFNBQVM7OztJQUduSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSwwQkFBMEI7UUFDdkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGtDQUFrQyxZQUFXO2dCQUNsRCxJQUFJLDBCQUF1QjtvQkFBRSxpQ0FBOEI7b0JBQUUsaUNBQThCOztnQkFFM0YsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsMkJBQTJCLGtDQUNsRCxrQ0FBa0M7b0JBQ2xDLDBCQUEwQjtvQkFDMUIsaUNBQWlDO29CQUNqQyxpQ0FBaUM7OztnQkFHckMsU0FBUyxRQUFRLFlBQVc7O29CQUV4QixHQUFHLHVDQUF1QyxZQUFXO3dCQUNqRCxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBcUM7OztvQkFHNUQsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxPQUFPLHdCQUF3Qjs0QkFDL0IsT0FBTyxJQUFJLCtCQUErQjt3QkFDOUMsT0FBTyxLQUFLLFlBQVksUUFBUSxLQUFLO3dCQUNyQyxPQUFPLEtBQUssbUJBQW1CLFFBQVEsS0FBSzt3QkFDNUMsT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO3dCQUN2QyxPQUFPLEtBQUssa0JBQWtCLFFBQVEsS0FBSzt3QkFDM0MsT0FBTyxLQUFLLFVBQVU7d0JBQ3RCLE9BQU8sS0FBSyxTQUFTLGNBQWMsZ0NBQWdDLFFBQVE7d0JBQzNFLE9BQU8sS0FBSyxTQUFTLFFBQVEsUUFBUSxLQUFLLFNBQVM7d0JBQ25ELE9BQU8sS0FBSyxVQUFVLFFBQVEsSUFBSSxLQUFLLEtBQUs7d0JBQzVDLE9BQU8sS0FBSyxjQUFjLFFBQVEsSUFBSSxLQUFLLEtBQUs7d0JBQ2hELE9BQU8sS0FBSyxRQUFRLFFBQVEsS0FBSzt3QkFDakMsT0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLEtBQUssbUJBQW1CLFFBQVEsS0FBSzs7Ozs7O0dBZXJEIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbFN1bW1hcnlUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3RBcHByb3ZhbFN1bW1hcnknLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgSWRlbnRpdHlSZXF1ZXN0QXBwcm92YWxTdW1tYXJ5LCBJZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnQ7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXywgX0lkZW50aXR5UmVxdWVzdEFwcHJvdmFsU3VtbWFyeV8sXHJcbiAgICAgICAgX0lkZW50aXR5UmVxdWVzdEFwcHJvdmFsQ29tbWVudF8pIHtcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0QXBwcm92YWxTdW1tYXJ5ID0gX0lkZW50aXR5UmVxdWVzdEFwcHJvdmFsU3VtbWFyeV87XHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0QXBwcm92YWxDb21tZW50ID0gX0lkZW50aXR5UmVxdWVzdEFwcHJvdmFsQ29tbWVudF87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBkYXRhIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG5ldyBJZGVudGl0eVJlcXVlc3RBcHByb3ZhbFN1bW1hcnkoKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCBwcm92aWRlZCBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9BUFBST1ZBTF9TVU1NQVJZXzEsXHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdEFwcHJvdmFsU3VtbWFyeShkYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3Qud29ya0l0ZW1JZCkudG9FcXVhbChkYXRhLndvcmtJdGVtSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC53b3JrSXRlbUFyY2hpdmVJZCkudG9FcXVhbChkYXRhLndvcmtJdGVtQXJjaGl2ZUlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3Qud29ya0l0ZW1OYW1lKS50b0VxdWFsKGRhdGEud29ya0l0ZW1OYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3Qub3duZXJEaXNwbGF5TmFtZSkudG9FcXVhbChkYXRhLm93bmVyRGlzcGxheU5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5jb21tZW50cykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY29tbWVudHNbMF0gaW5zdGFuY2VvZiBJZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbW1lbnRzLmxlbmd0aCkudG9FcXVhbChkYXRhLmNvbW1lbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0Lm9wZW5EYXRlKS50b0VxdWFsKG5ldyBEYXRlKGRhdGEub3BlbkRhdGUpKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY29tcGxldGVEYXRlKS50b0VxdWFsKG5ldyBEYXRlKGRhdGEuY29tcGxldGVEYXRlKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnN0YXR1cykudG9FcXVhbChkYXRhLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmRlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5hcHByb3ZhbEl0ZW1Db3VudCkudG9FcXVhbChkYXRhLmFwcHJvdmFsSXRlbUNvdW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
