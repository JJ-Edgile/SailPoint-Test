System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {

            describe('PamIdentityPermissionAccountsFilter', function () {
                var pamIdentityPermissionAccountsFilter = undefined,
                    filteredVal = undefined,
                    spTranslateFilter = undefined,
                    groupText = undefined,
                    appText = undefined;
                var MSG_GROUP = 'ui_pam_container_identity_permission_group';
                var MSG_ACCOUNT = 'ui_pam_container_identity_permission_account';

                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamIdentityPermissionAccountsFilter_, _spTranslateFilter_) {
                    pamIdentityPermissionAccountsFilter = _pamIdentityPermissionAccountsFilter_;
                    spTranslateFilter = _spTranslateFilter_;

                    groupText = spTranslateFilter(MSG_GROUP);
                    appText = spTranslateFilter(MSG_ACCOUNT);
                }));

                it('should return group text for a granting account with a groupName', function () {
                    var groups = [{
                        groupName: 'group1',
                        appName: 'app1'
                    }];
                    filteredVal = pamIdentityPermissionAccountsFilter(groups);
                    expect(filteredVal).toContain(groupText);
                });

                it('should return app text for a granting account without a groupName', function () {
                    var accts = [{
                        nativeIdentity: 'nativeIdentity1',
                        appName: 'app1'
                    }];
                    filteredVal = pamIdentityPermissionAccountsFilter(accts);
                    expect(filteredVal).toContain(appText);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eVBlcm1pc3Npb25BY2NvdW50c0ZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7O0lBSTdFOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYzs7UUFFOUIsU0FBUyxZQUFZOztZQUw3QixTQUFTLHVDQUF1QyxZQUFXO2dCQUN2RCxJQUFJLHNDQUFtQztvQkFBRSxjQUFXO29CQUFFLG9CQUFpQjtvQkFBRSxZQUFTO29CQUFFLFVBQU87Z0JBQzNGLElBQU0sWUFBWTtnQkFDbEIsSUFBTSxjQUFjOztnQkFFcEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsdUNBQXVDLHFCQUFxQjtvQkFDbkYsc0NBQXNDO29CQUN0QyxvQkFBb0I7O29CQUVwQixZQUFZLGtCQUFrQjtvQkFDOUIsVUFBVSxrQkFBa0I7OztnQkFHaEMsR0FBRyxvRUFBb0UsWUFBVztvQkFDOUUsSUFBSSxTQUFTLENBQUM7d0JBQ1YsV0FBVzt3QkFDWCxTQUFTOztvQkFFYixjQUFjLG9DQUFvQztvQkFDbEQsT0FBTyxhQUFhLFVBQVU7OztnQkFHbEMsR0FBRyxxRUFBcUUsWUFBVztvQkFDL0UsSUFBSSxRQUFRLENBQUM7d0JBQ1QsZ0JBQWdCO3dCQUNoQixTQUFTOztvQkFFYixjQUFjLG9DQUFvQztvQkFDbEQsT0FBTyxhQUFhLFVBQVU7Ozs7O0dBZ0JuQyIsImZpbGUiOiJwYW0vUGFtSWRlbnRpdHlQZXJtaXNzaW9uQWNjb3VudHNGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcblxuZGVzY3JpYmUoJ1BhbUlkZW50aXR5UGVybWlzc2lvbkFjY291bnRzRmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHBhbUlkZW50aXR5UGVybWlzc2lvbkFjY291bnRzRmlsdGVyLCBmaWx0ZXJlZFZhbCwgc3BUcmFuc2xhdGVGaWx0ZXIsIGdyb3VwVGV4dCwgYXBwVGV4dDtcbiAgICBjb25zdCBNU0dfR1JPVVAgPSAndWlfcGFtX2NvbnRhaW5lcl9pZGVudGl0eV9wZXJtaXNzaW9uX2dyb3VwJztcbiAgICBjb25zdCBNU0dfQUNDT1VOVCA9ICd1aV9wYW1fY29udGFpbmVyX2lkZW50aXR5X3Blcm1pc3Npb25fYWNjb3VudCc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1JZGVudGl0eVBlcm1pc3Npb25BY2NvdW50c0ZpbHRlcl8sIF9zcFRyYW5zbGF0ZUZpbHRlcl8pIHtcbiAgICAgICAgcGFtSWRlbnRpdHlQZXJtaXNzaW9uQWNjb3VudHNGaWx0ZXIgPSBfcGFtSWRlbnRpdHlQZXJtaXNzaW9uQWNjb3VudHNGaWx0ZXJfO1xuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlciA9IF9zcFRyYW5zbGF0ZUZpbHRlcl87XG5cbiAgICAgICAgZ3JvdXBUZXh0ID0gc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0dST1VQKTtcbiAgICAgICAgYXBwVGV4dCA9IHNwVHJhbnNsYXRlRmlsdGVyKE1TR19BQ0NPVU5UKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBncm91cCB0ZXh0IGZvciBhIGdyYW50aW5nIGFjY291bnQgd2l0aCBhIGdyb3VwTmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZ3JvdXBzID0gW3tcbiAgICAgICAgICAgIGdyb3VwTmFtZTogJ2dyb3VwMScsXG4gICAgICAgICAgICBhcHBOYW1lOiAnYXBwMSdcbiAgICAgICAgfV07XG4gICAgICAgIGZpbHRlcmVkVmFsID0gcGFtSWRlbnRpdHlQZXJtaXNzaW9uQWNjb3VudHNGaWx0ZXIoZ3JvdXBzKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0NvbnRhaW4oZ3JvdXBUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcCB0ZXh0IGZvciBhIGdyYW50aW5nIGFjY291bnQgd2l0aG91dCBhIGdyb3VwTmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgYWNjdHMgPSBbe1xuICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICduYXRpdmVJZGVudGl0eTEnLFxuICAgICAgICAgICAgYXBwTmFtZTogJ2FwcDEnXG4gICAgICAgIH1dO1xuICAgICAgICBmaWx0ZXJlZFZhbCA9IHBhbUlkZW50aXR5UGVybWlzc2lvbkFjY291bnRzRmlsdGVyKGFjY3RzKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsKS50b0NvbnRhaW4oYXBwVGV4dCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
