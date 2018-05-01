System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('ApprovalItemSummary', function () {
                var identityRequestTestData = undefined,
                    ApprovalItemSummary = undefined,
                    IdentitySummary = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestTestData_, _ApprovalItemSummary_, _IdentitySummary_) {
                    identityRequestTestData = _identityRequestTestData_;
                    ApprovalItemSummary = _ApprovalItemSummary_;
                    IdentitySummary = _IdentitySummary_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1.approvalItemSummaries[0],
                            test = new ApprovalItemSummary(data);
                        expect(test.workItemId).toEqual(data.workItemId);
                        expect(test.approvalItemId).toEqual(data.approvalItemId);
                        expect(test.owner).toEqual(new IdentitySummary(data.owner));
                        expect(test.commentCount).toEqual(data.commentCount);
                        expect(test.created).toEqual(new Date(data.created));
                        expect(test.canAccessComments).toEqual(data.canAccessComments);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new ApprovalItemSummary();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9BcHByb3ZhbEl0ZW1TdW1tYXJ5VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5QywrQkFBK0IsVUFBVSxTQUFTOzs7SUFHbkk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyx1QkFBdUIsWUFBVztnQkFDdkMsSUFBSSwwQkFBdUI7b0JBQUUsc0JBQW1CO29CQUFFLGtCQUFlOztnQkFFakUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsMkJBQTJCLHVCQUF1QixtQkFBbUI7b0JBQzVGLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixrQkFBa0I7OztnQkFHdEIsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTyx3QkFBd0Isd0JBQXdCLHNCQUFzQjs0QkFDN0UsT0FBTyxJQUFJLG9CQUFvQjt3QkFDbkMsT0FBTyxLQUFLLFlBQVksUUFBUSxLQUFLO3dCQUNyQyxPQUFPLEtBQUssZ0JBQWdCLFFBQVEsS0FBSzt3QkFDekMsT0FBTyxLQUFLLE9BQU8sUUFBUSxJQUFJLGdCQUFnQixLQUFLO3dCQUNwRCxPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sS0FBSyxTQUFTLFFBQVEsSUFBSSxLQUFLLEtBQUs7d0JBQzNDLE9BQU8sS0FBSyxtQkFBbUIsUUFBUSxLQUFLOzs7b0JBR2hELEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELE9BQU8sWUFBTTs0QkFBRSxJQUFJOzJCQUEwQjs7Ozs7O0dBZ0J0RCIsImZpbGUiOiJpZGVudGl0eVJlcXVlc3QvbW9kZWwvQXBwcm92YWxJdGVtU3VtbWFyeVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0FwcHJvdmFsSXRlbVN1bW1hcnknLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsIEFwcHJvdmFsSXRlbVN1bW1hcnksIElkZW50aXR5U3VtbWFyeTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXywgX0FwcHJvdmFsSXRlbVN1bW1hcnlfLCBfSWRlbnRpdHlTdW1tYXJ5Xykge1xuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XG4gICAgICAgIEFwcHJvdmFsSXRlbVN1bW1hcnkgPSBfQXBwcm92YWxJdGVtU3VtbWFyeV87XG4gICAgICAgIElkZW50aXR5U3VtbWFyeSA9IF9JZGVudGl0eVN1bW1hcnlfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9JVEVNXzEuYXBwcm92YWxJdGVtU3VtbWFyaWVzWzBdLFxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgQXBwcm92YWxJdGVtU3VtbWFyeShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LndvcmtJdGVtSWQpLnRvRXF1YWwoZGF0YS53b3JrSXRlbUlkKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmFwcHJvdmFsSXRlbUlkKS50b0VxdWFsKGRhdGEuYXBwcm92YWxJdGVtSWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3Qub3duZXIpLnRvRXF1YWwobmV3IElkZW50aXR5U3VtbWFyeShkYXRhLm93bmVyKSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5jb21tZW50Q291bnQpLnRvRXF1YWwoZGF0YS5jb21tZW50Q291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY3JlYXRlZCkudG9FcXVhbChuZXcgRGF0ZShkYXRhLmNyZWF0ZWQpKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNhbkFjY2Vzc0NvbW1lbnRzKS50b0VxdWFsKGRhdGEuY2FuQWNjZXNzQ29tbWVudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIGRhdGEgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG5ldyBBcHByb3ZhbEl0ZW1TdW1tYXJ5KCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
