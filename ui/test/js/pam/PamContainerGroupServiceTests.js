System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the pamContainerGroupService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamContainerGroupService', function () {
                var containerId = 1;
                var groupId = 2;
                var baseURLContainers = '/ui/rest/pam/containers/' + containerId + '/groups/' + groupId;
                var pamContainerGroupService = undefined,
                    $httpBackend = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamContainerGroupService_, _$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                    pamContainerGroupService = _pamContainerGroupService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getIdentities', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getIdentities', function () {
                        currentUrl = baseURLContainers + '/identities';
                        $httpBackend.expectGET(currentUrl).respond(200, { id: 1 });
                        promise = pamContainerGroupService.getIdentities(containerId, groupId);
                        $httpBackend.flush();
                    });
                });

                describe('getPermissions', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getPermissions', function () {
                        currentUrl = baseURLContainers + '/permissions';
                        $httpBackend.expectGET(currentUrl).respond(200, { id: 1 });
                        promise = pamContainerGroupService.getPermissions(containerId, groupId);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJHcm91cFNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsa0JBQWtCLFVBQVUsU0FBUzs7Ozs7Ozs7SUFRN0U7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjOztRQUU5QixTQUFTLFlBQVk7WUFMN0IsU0FBUyw0QkFBNEIsWUFBVztnQkFDNUMsSUFBTSxjQUFjO2dCQUNwQixJQUFNLFVBQVU7Z0JBQ2hCLElBQU0sb0JBQWlCLDZCQUE4QixjQUFXLGFBQVc7Z0JBQzNFLElBQUksMkJBQXdCO29CQUFFLGVBQVk7OztnQkFHMUMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLGdCQUFnQjtvQkFDbkUsZUFBZTtvQkFDZiwyQkFBMkI7OztnQkFHL0IsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsSUFBSSxVQUFPO3dCQUFFLGFBQVU7O29CQUV2QixHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxhQUFnQixvQkFBaUI7d0JBQ2pDLGFBQWEsVUFBVSxZQUFZLFFBQVEsS0FBSyxFQUFDLElBQUk7d0JBQ3JELFVBQVUseUJBQXlCLGNBQWMsYUFBYTt3QkFDOUQsYUFBYTs7OztnQkFJckIsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsSUFBSSxVQUFPO3dCQUFFLGFBQVU7O29CQUV2QixHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxhQUFnQixvQkFBaUI7d0JBQ2pDLGFBQWEsVUFBVSxZQUFZLFFBQVEsS0FBSyxFQUFDLElBQUk7d0JBQ3JELFVBQVUseUJBQXlCLGVBQWUsYUFBYTt3QkFDL0QsYUFBYTs7Ozs7O0dBZXRCIiwiZmlsZSI6InBhbS9QYW1Db250YWluZXJHcm91cFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBwYW1Db250YWluZXJHcm91cFNlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdQYW1Db250YWluZXJHcm91cFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb250YWluZXJJZCA9IDE7XG4gICAgY29uc3QgZ3JvdXBJZCA9IDI7XG4gICAgY29uc3QgYmFzZVVSTENvbnRhaW5lcnMgPSBgL3VpL3Jlc3QvcGFtL2NvbnRhaW5lcnMvJHtjb250YWluZXJJZH0vZ3JvdXBzLyR7Z3JvdXBJZH1gO1xuICAgIGxldCBwYW1Db250YWluZXJHcm91cFNlcnZpY2UsICRodHRwQmFja2VuZDtcblxuICAgIC8vIFVzZSB0aGUgaWRlbnRpdHkgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3BhbUNvbnRhaW5lckdyb3VwU2VydmljZV8sIF8kaHR0cEJhY2tlbmRfKSB7XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBwYW1Db250YWluZXJHcm91cFNlcnZpY2UgPSBfcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgY3VycmVudFVybDtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0SWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3VycmVudFVybCA9IGAke2Jhc2VVUkxDb250YWluZXJzfS9pZGVudGl0aWVzYDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtpZDogMX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lckdyb3VwU2VydmljZS5nZXRJZGVudGl0aWVzKGNvbnRhaW5lcklkLCBncm91cElkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRQZXJtaXNzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgY3VycmVudFVybDtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0UGVybWlzc2lvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBgJHtiYXNlVVJMQ29udGFpbmVyc30vcGVybWlzc2lvbnNgO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjdXJyZW50VXJsKS5yZXNwb25kKDIwMCwge2lkOiAxfSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlLmdldFBlcm1pc3Npb25zKGNvbnRhaW5lcklkLCBncm91cElkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
