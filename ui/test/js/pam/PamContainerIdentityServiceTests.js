System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the pamContainerIdentityService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamContainerIdentityService', function () {
                var containerId = 1;
                var identityId = 2;
                var baseURLContainers = '/ui/rest/pam/containers/' + containerId + '/identities/' + identityId;
                var pamContainerIdentityService = undefined,
                    $httpBackend = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamContainerIdentityService_, _$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                    pamContainerIdentityService = _pamContainerIdentityService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getPermissions', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getPermissions', function () {
                        currentUrl = baseURLContainers + '/permissions';
                        $httpBackend.expectGET(currentUrl).respond(200, { id: 1 });
                        promise = pamContainerIdentityService.getPermissions(containerId, identityId);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJJZGVudGl0eVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0JBQWtCLFVBQVUsU0FBUzs7Ozs7Ozs7SUFRN0U7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjOztRQUU5QixTQUFTLFlBQVk7WUFMN0IsU0FBUywrQkFBK0IsWUFBVztnQkFDL0MsSUFBTSxjQUFjO2dCQUNwQixJQUFNLGFBQWE7Z0JBQ25CLElBQU0sb0JBQWlCLDZCQUE4QixjQUFXLGlCQUFlO2dCQUMvRSxJQUFJLDhCQUEyQjtvQkFBRSxlQUFZOzs7Z0JBRzdDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLCtCQUErQixnQkFBZ0I7b0JBQ3RFLGVBQWU7b0JBQ2YsOEJBQThCOzs7Z0JBR2xDLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLElBQUksVUFBTzt3QkFBRSxhQUFVOztvQkFFdkIsR0FBRyw4QkFBOEIsWUFBVzt3QkFDeEMsYUFBZ0Isb0JBQWlCO3dCQUNqQyxhQUFhLFVBQVUsWUFBWSxRQUFRLEtBQUssRUFBQyxJQUFJO3dCQUNyRCxVQUFVLDRCQUE0QixlQUFlLGFBQWE7d0JBQ2xFLGFBQWE7Ozs7OztHQWN0QiIsImZpbGUiOiJwYW0vUGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnUGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgY29udGFpbmVySWQgPSAxO1xuICAgIGNvbnN0IGlkZW50aXR5SWQgPSAyO1xuICAgIGNvbnN0IGJhc2VVUkxDb250YWluZXJzID0gYC91aS9yZXN0L3BhbS9jb250YWluZXJzLyR7Y29udGFpbmVySWR9L2lkZW50aXRpZXMvJHtpZGVudGl0eUlkfWA7XG4gICAgbGV0IHBhbUNvbnRhaW5lcklkZW50aXR5U2VydmljZSwgJGh0dHBCYWNrZW5kO1xuXG4gICAgLy8gVXNlIHRoZSBpZGVudGl0eSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlXywgXyRodHRwQmFja2VuZF8pIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHBhbUNvbnRhaW5lcklkZW50aXR5U2VydmljZSA9IF9wYW1Db250YWluZXJJZGVudGl0eVNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRQZXJtaXNzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgY3VycmVudFVybDtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0UGVybWlzc2lvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBgJHtiYXNlVVJMQ29udGFpbmVyc30vcGVybWlzc2lvbnNgO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjdXJyZW50VXJsKS5yZXNwb25kKDIwMCwge2lkOiAxfSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlLmdldFBlcm1pc3Npb25zKGNvbnRhaW5lcklkLCBpZGVudGl0eUlkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
