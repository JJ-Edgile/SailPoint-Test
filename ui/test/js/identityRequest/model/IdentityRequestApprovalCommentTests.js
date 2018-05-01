System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequestApprovalComment', function () {
                var identityRequestTestData = undefined,
                    IdentityRequestApprovalComment = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestTestData_, _IdentityRequestApprovalComment_) {
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestApprovalComment = _IdentityRequestApprovalComment_;
                }));

                describe('init', function () {

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new IdentityRequestApprovalComment();
                        }).toThrow();
                    });

                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_APPROVAL_COMMENT_1,
                            test = new IdentityRequestApprovalComment(data);
                        expect(test.author).toEqual(data.author);
                        expect(test.comment).toEqual(data.comment);
                        expect(test.date).toEqual(new Date(data.date));
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLCtCQUErQixVQUFVLFNBQVM7OztJQUduSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSwwQkFBMEI7UUFDdkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLGtDQUFrQyxZQUFXO2dCQUNsRCxJQUFJLDBCQUF1QjtvQkFBRSxpQ0FBOEI7O2dCQUUzRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUywyQkFBMkIsa0NBQWtDO29CQUNwRiwwQkFBMEI7b0JBQzFCLGlDQUFpQzs7O2dCQUdyQyxTQUFTLFFBQVEsWUFBVzs7b0JBRXhCLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELE9BQU8sWUFBTTs0QkFBRSxJQUFJOzJCQUFxQzs7O29CQUc1RCxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE9BQU8sd0JBQXdCOzRCQUMvQixPQUFPLElBQUksK0JBQStCO3dCQUM5QyxPQUFPLEtBQUssUUFBUSxRQUFRLEtBQUs7d0JBQ2pDLE9BQU8sS0FBSyxTQUFTLFFBQVEsS0FBSzt3QkFDbEMsT0FBTyxLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssS0FBSzs7Ozs7O0dBZWpEIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnQnLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgSWRlbnRpdHlSZXF1ZXN0QXBwcm92YWxDb21tZW50O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sIF9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnRfKSB7XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEgPSBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdEFwcHJvdmFsQ29tbWVudCA9IF9JZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnRfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgbm8gZGF0YSBpcyBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgSWRlbnRpdHlSZXF1ZXN0QXBwcm92YWxDb21tZW50KCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfQVBQUk9WQUxfQ09NTUVOVF8xLFxyXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3RBcHByb3ZhbENvbW1lbnQoZGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmF1dGhvcikudG9FcXVhbChkYXRhLmF1dGhvcik7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbW1lbnQpLnRvRXF1YWwoZGF0YS5jb21tZW50KTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGF0ZSkudG9FcXVhbChuZXcgRGF0ZShkYXRhLmRhdGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
