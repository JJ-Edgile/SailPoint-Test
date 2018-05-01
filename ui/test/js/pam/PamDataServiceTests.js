System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the PamDataService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamDataService', function () {
                var pamDataService = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamDataService_) {
                    pamDataService = _pamDataService_;
                }));

                ////////////////////////////////////////////////////////////////////////////
                //
                // PAGE STATE TESTS
                //
                ////////////////////////////////////////////////////////////////////////////

                it('starts with default page state', function () {
                    expect(pamDataService.containerListPageState).not.toBeNull();
                });

                it('resets the page state when cleared', function () {
                    pamDataService.containerListPageState = null;
                    pamDataService.clear();
                    expect(pamDataService.containerListPageState).not.toBeNull();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1EYXRhU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7Ozs7OztJQVE3RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7O1FBRTlCLFNBQVMsWUFBWTtZQUw3QixTQUFTLGtCQUFrQixZQUFXO2dCQUNsQyxJQUFJLGlCQUFjOzs7Z0JBR2xCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGtCQUFrQjtvQkFDekMsaUJBQWlCOzs7Ozs7Ozs7Z0JBVXJCLEdBQUcsa0NBQWtDLFlBQVc7b0JBQzVDLE9BQU8sZUFBZSx3QkFBd0IsSUFBSTs7O2dCQUd0RCxHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxlQUFlLHlCQUF5QjtvQkFDeEMsZUFBZTtvQkFDZixPQUFPLGVBQWUsd0JBQXdCLElBQUk7Ozs7O0dBVXZEIiwiZmlsZSI6InBhbS9QYW1EYXRhU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFBhbURhdGFTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnUGFtRGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgcGFtRGF0YVNlcnZpY2U7XG5cbiAgICAvLyBVc2UgdGhlIGlkZW50aXR5IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1EYXRhU2VydmljZV8pIHtcbiAgICAgICAgcGFtRGF0YVNlcnZpY2UgPSBfcGFtRGF0YVNlcnZpY2VfO1xuICAgIH0pKTtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vXG4gICAgLy8gUEFHRSBTVEFURSBURVNUU1xuICAgIC8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgaXQoJ3N0YXJ0cyB3aXRoIGRlZmF1bHQgcGFnZSBzdGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFtRGF0YVNlcnZpY2UuY29udGFpbmVyTGlzdFBhZ2VTdGF0ZSkubm90LnRvQmVOdWxsKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVzZXRzIHRoZSBwYWdlIHN0YXRlIHdoZW4gY2xlYXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBwYW1EYXRhU2VydmljZS5jb250YWluZXJMaXN0UGFnZVN0YXRlID0gbnVsbDtcbiAgICAgICAgcGFtRGF0YVNlcnZpY2UuY2xlYXIoKTtcbiAgICAgICAgZXhwZWN0KHBhbURhdGFTZXJ2aWNlLmNvbnRhaW5lckxpc3RQYWdlU3RhdGUpLm5vdC50b0JlTnVsbCgpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
