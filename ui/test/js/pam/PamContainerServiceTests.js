System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the pamContainerService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamContainerService', function () {
                var containerId = 1;
                var baseURLContainers = '/ui/rest/pam/containers/' + containerId;
                var pamContainerService = undefined,
                    $httpBackend = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamContainerService_, _$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                    pamContainerService = _pamContainerService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getContainer', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getContainer', function () {
                        currentUrl = baseURLContainers;
                        $httpBackend.expectGET(currentUrl).respond(200, { id: 1 });
                        promise = pamContainerService.getContainer(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getEffectiveIdentitiesCount', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getEffectiveIdentitiesCount', function () {
                        currentUrl = baseURLContainers + '/identities/effectiveCount';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getEffectiveIdentitiesCount(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getDirectIdentitiesCount', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getDirectIdentitiesCount', function () {
                        currentUrl = baseURLContainers + '/identities/directCount';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getDirectIdentitiesCount(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getEffectiveIdentities', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getEffectiveIdentities', function () {
                        currentUrl = baseURLContainers + '/identities/effective';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getEffectiveIdentities(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getDirectIdentities', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getDirectIdentities', function () {
                        currentUrl = baseURLContainers + '/identities/direct';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getDirectIdentities(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getGroups', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getGroups', function () {
                        currentUrl = baseURLContainers + '/groups';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getGroups(containerId);
                        $httpBackend.flush();
                    });
                });

                describe('getPrivilegedItems', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getPrivilegedItems', function () {
                        currentUrl = baseURLContainers + '/privilegedItems';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerService.getPrivilegedItems(containerId);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtCQUFrQixVQUFVLFNBQVM7Ozs7Ozs7O0lBUTdFOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYzs7UUFFOUIsU0FBUyxZQUFZO1lBTDdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQU0sY0FBYztnQkFDcEIsSUFBTSxvQkFBaUIsNkJBQThCO2dCQUNyRCxJQUFJLHNCQUFtQjtvQkFBRSxlQUFZOzs7Z0JBR3JDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHVCQUF1QixnQkFBZ0I7b0JBQzlELGVBQWU7b0JBQ2Ysc0JBQXNCOzs7Z0JBRzFCLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLElBQUksVUFBTzt3QkFBRSxhQUFVOztvQkFFdkIsR0FBRyw0QkFBNEIsWUFBVzt3QkFDdEMsYUFBYTt3QkFDYixhQUFhLFVBQVUsWUFBWSxRQUFRLEtBQUssRUFBQyxJQUFJO3dCQUNyRCxVQUFVLG9CQUFvQixhQUFhO3dCQUMzQyxhQUFhOzs7O2dCQUlyQixTQUFTLCtCQUErQixZQUFXO29CQUMvQyxJQUFJLFVBQU87d0JBQUUsYUFBVTs7b0JBRXZCLEdBQUcsMkNBQTJDLFlBQVc7d0JBQ3JELGFBQWdCLG9CQUFpQjt3QkFDakMsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSxvQkFBb0IsNEJBQTRCO3dCQUMxRCxhQUFhOzs7O2dCQUlyQixTQUFTLDRCQUE0QixZQUFXO29CQUM1QyxJQUFJLFVBQU87d0JBQUUsYUFBVTs7b0JBRXZCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELGFBQWdCLG9CQUFpQjt3QkFDakMsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSxvQkFBb0IseUJBQXlCO3dCQUN2RCxhQUFhOzs7O2dCQUlyQixTQUFTLDBCQUEwQixZQUFXO29CQUMxQyxJQUFJLFVBQU87d0JBQUUsYUFBVTs7b0JBRXZCLEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2hELGFBQWdCLG9CQUFpQjt3QkFDakMsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSxvQkFBb0IsdUJBQXVCO3dCQUNyRCxhQUFhOzs7O2dCQUlyQixTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxJQUFJLFVBQU87d0JBQUUsYUFBVTs7b0JBRXZCLEdBQUcsbUNBQW1DLFlBQVc7d0JBQzdDLGFBQWdCLG9CQUFpQjt3QkFDakMsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSxvQkFBb0Isb0JBQW9CO3dCQUNsRCxhQUFhOzs7O2dCQUlyQixTQUFTLGFBQWEsWUFBVztvQkFDN0IsSUFBSSxVQUFPO3dCQUFFLGFBQVU7O29CQUV2QixHQUFHLHlCQUF5QixZQUFXO3dCQUNuQyxhQUFnQixvQkFBaUI7d0JBQ2pDLGFBQWEsVUFBVSxZQUFZLFFBQVEsS0FBSyxFQUFDLFNBQVM7d0JBQzFELFVBQVUsb0JBQW9CLFVBQVU7d0JBQ3hDLGFBQWE7Ozs7Z0JBSXJCLFNBQVMsc0JBQXNCLFlBQVc7b0JBQ3RDLElBQUksVUFBTzt3QkFBRSxhQUFVOztvQkFFdkIsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsYUFBZ0Isb0JBQWlCO3dCQUNqQyxhQUFhLFVBQVUsWUFBWSxRQUFRLEtBQUssRUFBQyxTQUFTO3dCQUMxRCxVQUFVLG9CQUFvQixtQkFBbUI7d0JBQ2pELGFBQWE7Ozs7OztHQW9CdEIiLCJmaWxlIjoicGFtL1BhbUNvbnRhaW5lclNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBwYW1Db250YWluZXJTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnUGFtQ29udGFpbmVyU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lcklkID0gMTtcbiAgICBjb25zdCBiYXNlVVJMQ29udGFpbmVycyA9IGAvdWkvcmVzdC9wYW0vY29udGFpbmVycy8ke2NvbnRhaW5lcklkfWA7XG4gICAgbGV0IHBhbUNvbnRhaW5lclNlcnZpY2UsICRodHRwQmFja2VuZDtcblxuICAgIC8vIFVzZSB0aGUgaWRlbnRpdHkgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3BhbUNvbnRhaW5lclNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXykge1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZSA9IF9wYW1Db250YWluZXJTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q29udGFpbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBjdXJyZW50VXJsO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRDb250YWluZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBiYXNlVVJMQ29udGFpbmVycztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtpZDogMX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0Q29udGFpbmVyKGNvbnRhaW5lcklkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRFZmZlY3RpdmVJZGVudGl0aWVzQ291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIGN1cnJlbnRVcmw7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldEVmZmVjdGl2ZUlkZW50aXRpZXNDb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3VycmVudFVybCA9IGAke2Jhc2VVUkxDb250YWluZXJzfS9pZGVudGl0aWVzL2VmZmVjdGl2ZUNvdW50YDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0RWZmZWN0aXZlSWRlbnRpdGllc0NvdW50KGNvbnRhaW5lcklkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREaXJlY3RJZGVudGl0aWVzQ291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIGN1cnJlbnRVcmw7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldERpcmVjdElkZW50aXRpZXNDb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3VycmVudFVybCA9IGAke2Jhc2VVUkxDb250YWluZXJzfS9pZGVudGl0aWVzL2RpcmVjdENvdW50YDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0RGlyZWN0SWRlbnRpdGllc0NvdW50KGNvbnRhaW5lcklkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRFZmZlY3RpdmVJZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBjdXJyZW50VXJsO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRFZmZlY3RpdmVJZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdXJyZW50VXJsID0gYCR7YmFzZVVSTENvbnRhaW5lcnN9L2lkZW50aXRpZXMvZWZmZWN0aXZlYDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0RWZmZWN0aXZlSWRlbnRpdGllcyhjb250YWluZXJJZCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RGlyZWN0SWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgY3VycmVudFVybDtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0RGlyZWN0SWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3VycmVudFVybCA9IGAke2Jhc2VVUkxDb250YWluZXJzfS9pZGVudGl0aWVzL2RpcmVjdGA7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGN1cnJlbnRVcmwpLnJlc3BvbmQoMjAwLCB7b2JqZWN0czogW119KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwYW1Db250YWluZXJTZXJ2aWNlLmdldERpcmVjdElkZW50aXRpZXMoY29udGFpbmVySWQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEdyb3VwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgY3VycmVudFVybDtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0R3JvdXBzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdXJyZW50VXJsID0gYCR7YmFzZVVSTENvbnRhaW5lcnN9L2dyb3Vwc2A7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGN1cnJlbnRVcmwpLnJlc3BvbmQoMjAwLCB7b2JqZWN0czogW119KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwYW1Db250YWluZXJTZXJ2aWNlLmdldEdyb3Vwcyhjb250YWluZXJJZCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UHJpdmlsZWdlZEl0ZW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBjdXJyZW50VXJsO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRQcml2aWxlZ2VkSXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBgJHtiYXNlVVJMQ29udGFpbmVyc30vcHJpdmlsZWdlZEl0ZW1zYDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0UHJpdmlsZWdlZEl0ZW1zKGNvbnRhaW5lcklkKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
