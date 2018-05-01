System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the pamPermissionService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamPermissionService', function () {
                var baseURL = '/ui/rest/pam/permissions';
                var pamPermissionService = undefined,
                    $httpBackend = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamPermissionService_, _$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                    pamPermissionService = _pamPermissionService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getPermissions', function () {
                    var promise = undefined;

                    it('should call getPermissions', function () {
                        $httpBackend.expectGET(baseURL).respond(200);
                        promise = pamPermissionService.getPermissions();
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1QZXJtaXNzaW9uU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7Ozs7OztJQVE3RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7O1FBRTlCLFNBQVMsWUFBWTtZQUw3QixTQUFTLHdCQUF3QixZQUFXO2dCQUN4QyxJQUFNLFVBQU87Z0JBQ2IsSUFBSSx1QkFBb0I7b0JBQUUsZUFBWTs7O2dCQUd0QyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx3QkFBd0IsZ0JBQWdCO29CQUMvRCxlQUFlO29CQUNmLHVCQUF1Qjs7O2dCQUczQixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxJQUFJLFVBQU87O29CQUVYLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLGFBQWEsVUFBVSxTQUFTLFFBQVE7d0JBQ3hDLFVBQVUscUJBQXFCO3dCQUMvQixhQUFhOzs7Ozs7R0FhdEIiLCJmaWxlIjoicGFtL1BhbVBlcm1pc3Npb25TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgcGFtUGVybWlzc2lvblNlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdQYW1QZXJtaXNzaW9uU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJhc2VVUkwgPSBgL3VpL3Jlc3QvcGFtL3Blcm1pc3Npb25zYDtcbiAgICBsZXQgcGFtUGVybWlzc2lvblNlcnZpY2UsICRodHRwQmFja2VuZDtcblxuICAgIC8vIFVzZSB0aGUgaWRlbnRpdHkgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3BhbVBlcm1pc3Npb25TZXJ2aWNlXywgXyRodHRwQmFja2VuZF8pIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHBhbVBlcm1pc3Npb25TZXJ2aWNlID0gX3BhbVBlcm1pc3Npb25TZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGVybWlzc2lvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldFBlcm1pc3Npb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkwpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwYW1QZXJtaXNzaW9uU2VydmljZS5nZXRQZXJtaXNzaW9ucygpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
