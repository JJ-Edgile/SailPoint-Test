System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('LinkActionStatusFilter', function () {
                var linkActionStatusFilter = undefined,
                    filteredVal = undefined,
                    IdentityRequestItem = undefined,
                    spTranslateFilter = undefined,
                    pendingText = undefined,
                    errorText = undefined,
                    completeText = undefined,
                    rejectText = undefined,
                    link = undefined;
                var MSG_KEY_ERROR = 'ui_lcm_manage_password_action_status_error';
                var MSG_KEY_PENDING = 'ui_lcm_manage_password_action_status_pending';
                var MSG_KEY_COMPLETE = 'ui_lcm_manage_password_action_status_complete';
                var MSG_KEY_REJECT = 'ui_lcm_manage_password_action_status_reject';

                beforeEach(module(identityModule));

                beforeEach(inject(function (_linkActionStatusFilter_, _spTranslateFilter_, _IdentityRequestItem_, linkTestData, AccountLink) {
                    linkActionStatusFilter = _linkActionStatusFilter_;
                    spTranslateFilter = _spTranslateFilter_;
                    IdentityRequestItem = _IdentityRequestItem_;

                    pendingText = '<span class="text-info">' + '<i role="presentation" class="fa fa-cog fa-spin m-r-xs"></i> ' + spTranslateFilter(MSG_KEY_PENDING) + '</span>';
                    errorText = '<span class="text-danger">' + '<i role="presentation" class="fa fa-exclamation-triangle m-r-xs"></i> ' + spTranslateFilter(MSG_KEY_ERROR) + '</span>';
                    completeText = '<span class="text-success">' + '<i role="presentation" class="fa fa-check-circle m-r-xs"></i> ' + spTranslateFilter(MSG_KEY_COMPLETE) + '</span>';
                    rejectText = '<span class="text-danger">' + '<i role="presentation" class="fa fa-exclamation-triangle m-r-xs"></i> ' + spTranslateFilter(MSG_KEY_REJECT) + '</span>';
                    link = new AccountLink(linkTestData.LINK1);
                }));

                it('should return a null value for undefined status', function () {
                    filteredVal = linkActionStatusFilter(undefined);
                    expect(filteredVal).toBeUndefined();
                });

                it('should return pending text for pending status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Pending);
                    expect(filteredVal).toEqual(pendingText);
                });

                it('should return pending text for retry status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Retry);
                    expect(filteredVal).toEqual(pendingText);
                });

                it('should return error text for failed status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Failed);
                    expect(filteredVal).toEqual(errorText);
                });

                it('should return completed text for finished status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Finished);
                    expect(filteredVal).toEqual(completeText);
                });

                it('should return rejected text for finished and rejected status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Finished, link);
                    expect(filteredVal).toEqual(rejectText);
                });

                it('should return pending text for committed status', function () {
                    filteredVal = linkActionStatusFilter(IdentityRequestItem.ProvisioningState.Committed);
                    expect(filteredVal).toEqual(pendingText);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0xpbmtBY3Rpb25TdGF0dXNGaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUl2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQkFBMEIsWUFBVztnQkFDMUMsSUFBSSx5QkFBc0I7b0JBQUUsY0FBVztvQkFBRSxzQkFBbUI7b0JBQUUsb0JBQWlCO29CQUMzRSxjQUFXO29CQUFFLFlBQVM7b0JBQUUsZUFBWTtvQkFBRSxhQUFVO29CQUFFLE9BQUk7Z0JBQzFELElBQU0sZ0JBQWdCO2dCQUN0QixJQUFNLGtCQUFrQjtnQkFDeEIsSUFBTSxtQkFBbUI7Z0JBQ3pCLElBQU0saUJBQWlCOztnQkFFdkIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsMEJBQTBCLHFCQUFxQix1QkFDbEUsY0FBYyxhQUFhO29CQUMvQix5QkFBeUI7b0JBQ3pCLG9CQUFvQjtvQkFDcEIsc0JBQXNCOztvQkFFdEIsY0FBYyw2QkFDVixrRUFDQSxrQkFBa0IsbUJBQ2xCO29CQUNKLFlBQVksK0JBQ1IsMkVBQ0Esa0JBQWtCLGlCQUNsQjtvQkFDSixlQUFlLGdDQUNYLG1FQUNBLGtCQUFrQixvQkFDbEI7b0JBQ0osYUFBYSwrQkFDYiwyRUFDQSxrQkFBa0Isa0JBQ2xCO29CQUNBLE9BQU8sSUFBSSxZQUFZLGFBQWE7OztnQkFHeEMsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsY0FBYyx1QkFBdUI7b0JBQ3JDLE9BQU8sYUFBYTs7O2dCQUd4QixHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxjQUFjLHVCQUF1QixvQkFBb0Isa0JBQWtCO29CQUMzRSxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxjQUFjLHVCQUF1QixvQkFBb0Isa0JBQWtCO29CQUMzRSxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLDhDQUE4QyxZQUFXO29CQUN4RCxjQUFjLHVCQUF1QixvQkFBb0Isa0JBQWtCO29CQUMzRSxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxjQUFjLHVCQUF1QixvQkFBb0Isa0JBQWtCO29CQUMzRSxPQUFPLGFBQWEsUUFBUTs7O2dCQUdoQyxHQUFHLGdFQUFnRSxZQUFXO29CQUMxRSxjQUFjLHVCQUF1QixvQkFBb0Isa0JBQWtCLFVBQVU7b0JBQ3JGLE9BQU8sYUFBYSxRQUFROzs7Z0JBR2hDLEdBQUcsbURBQW1ELFlBQVc7b0JBQzdELGNBQWMsdUJBQXVCLG9CQUFvQixrQkFBa0I7b0JBQzNFLE9BQU8sYUFBYSxRQUFROzs7OztHQU1qQyIsImZpbGUiOiJpZGVudGl0eS9MaW5rQWN0aW9uU3RhdHVzRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdMaW5rQWN0aW9uU3RhdHVzRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGxpbmtBY3Rpb25TdGF0dXNGaWx0ZXIsIGZpbHRlcmVkVmFsLCBJZGVudGl0eVJlcXVlc3RJdGVtLCBzcFRyYW5zbGF0ZUZpbHRlcixcbiAgICAgICAgcGVuZGluZ1RleHQsIGVycm9yVGV4dCwgY29tcGxldGVUZXh0LCByZWplY3RUZXh0LCBsaW5rO1xuICAgIGNvbnN0IE1TR19LRVlfRVJST1IgPSAndWlfbGNtX21hbmFnZV9wYXNzd29yZF9hY3Rpb25fc3RhdHVzX2Vycm9yJztcbiAgICBjb25zdCBNU0dfS0VZX1BFTkRJTkcgPSAndWlfbGNtX21hbmFnZV9wYXNzd29yZF9hY3Rpb25fc3RhdHVzX3BlbmRpbmcnO1xuICAgIGNvbnN0IE1TR19LRVlfQ09NUExFVEUgPSAndWlfbGNtX21hbmFnZV9wYXNzd29yZF9hY3Rpb25fc3RhdHVzX2NvbXBsZXRlJztcbiAgICBjb25zdCBNU0dfS0VZX1JFSkVDVCA9ICd1aV9sY21fbWFuYWdlX3Bhc3N3b3JkX2FjdGlvbl9zdGF0dXNfcmVqZWN0JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfbGlua0FjdGlvblN0YXR1c0ZpbHRlcl8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sIF9JZGVudGl0eVJlcXVlc3RJdGVtXyxcbiAgICAgICAgICAgIGxpbmtUZXN0RGF0YSwgQWNjb3VudExpbmspIHtcbiAgICAgICAgbGlua0FjdGlvblN0YXR1c0ZpbHRlciA9IF9saW5rQWN0aW9uU3RhdHVzRmlsdGVyXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtID0gX0lkZW50aXR5UmVxdWVzdEl0ZW1fO1xuXG4gICAgICAgIHBlbmRpbmdUZXh0ID0gJzxzcGFuIGNsYXNzPVwidGV4dC1pbmZvXCI+JyArXG4gICAgICAgICAgICAnPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW4gbS1yLXhzXCI+PC9pPiAnICtcbiAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyKE1TR19LRVlfUEVORElORykgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nO1xuICAgICAgICBlcnJvclRleHQgPSAnPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPicgK1xuICAgICAgICAgICAgJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIG0tci14c1wiPjwvaT4gJyArXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcihNU0dfS0VZX0VSUk9SKSArXG4gICAgICAgICAgICAnPC9zcGFuPic7XG4gICAgICAgIGNvbXBsZXRlVGV4dCA9ICc8c3BhbiBjbGFzcz1cInRleHQtc3VjY2Vzc1wiPicgK1xuICAgICAgICAgICAgJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZSBtLXIteHNcIj48L2k+ICcgK1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9DT01QTEVURSkgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nO1xuICAgICAgICByZWplY3RUZXh0ID0gJzxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIj4nICtcbiAgICAgICAgJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIG0tci14c1wiPjwvaT4gJyArXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyKE1TR19LRVlfUkVKRUNUKSArXG4gICAgICAgICc8L3NwYW4+JztcbiAgICAgICAgbGluayA9IG5ldyBBY2NvdW50TGluayhsaW5rVGVzdERhdGEuTElOSzEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgbnVsbCB2YWx1ZSBmb3IgdW5kZWZpbmVkIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmaWx0ZXJlZFZhbCA9IGxpbmtBY3Rpb25TdGF0dXNGaWx0ZXIodW5kZWZpbmVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBwZW5kaW5nIHRleHQgZm9yIHBlbmRpbmcgc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZpbHRlcmVkVmFsID0gbGlua0FjdGlvblN0YXR1c0ZpbHRlcihJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlBlbmRpbmcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwocGVuZGluZ1RleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGVuZGluZyB0ZXh0IGZvciByZXRyeSBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rQWN0aW9uU3RhdHVzRmlsdGVyKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUmV0cnkpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwocGVuZGluZ1RleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXJyb3IgdGV4dCBmb3IgZmFpbGVkIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmaWx0ZXJlZFZhbCA9IGxpbmtBY3Rpb25TdGF0dXNGaWx0ZXIoSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5GYWlsZWQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwoZXJyb3JUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvbXBsZXRlZCB0ZXh0IGZvciBmaW5pc2hlZCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rQWN0aW9uU3RhdHVzRmlsdGVyKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmluaXNoZWQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwoY29tcGxldGVUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlamVjdGVkIHRleHQgZm9yIGZpbmlzaGVkIGFuZCByZWplY3RlZCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rQWN0aW9uU3RhdHVzRmlsdGVyKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmluaXNoZWQsIGxpbmspO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWwpLnRvRXF1YWwocmVqZWN0VGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBwZW5kaW5nIHRleHQgZm9yIGNvbW1pdHRlZCBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZmlsdGVyZWRWYWwgPSBsaW5rQWN0aW9uU3RhdHVzRmlsdGVyKElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuQ29tbWl0dGVkKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0VxdWFsKHBlbmRpbmdUZXh0KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
