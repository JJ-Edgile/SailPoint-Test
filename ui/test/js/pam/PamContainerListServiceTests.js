System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the PamContainerListService.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('PamContainerListService', function () {
                var baseURLContainers = '/ui/rest/pam/containers';
                var pamContainerListService = undefined,
                    $httpBackend = undefined,
                    $window = undefined;

                // Use the identity module.
                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamContainerListService_, _$httpBackend_, _$window_) {
                    $httpBackend = _$httpBackend_;
                    pamContainerListService = _pamContainerListService_;
                    $window = _$window_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getContainers', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call getContainers', function () {
                        currentUrl = baseURLContainers;
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = pamContainerListService.getContainers();
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJMaXN0U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7Ozs7OztJQVE3RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7O1FBRTlCLFNBQVMsWUFBWTtZQUw3QixTQUFTLDJCQUEyQixZQUFXO2dCQUMzQyxJQUFNLG9CQUFpQjtnQkFDdkIsSUFBSSwwQkFBdUI7b0JBQUUsZUFBWTtvQkFBRSxVQUFPOzs7Z0JBR2xELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLDJCQUEyQixnQkFBZ0IsV0FBVztvQkFDN0UsZUFBZTtvQkFDZiwwQkFBMEI7b0JBQzFCLFVBQVU7OztnQkFHZCxVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLGlCQUFpQixZQUFXO29CQUNqQyxJQUFJLFVBQU87d0JBQUUsYUFBVTs7b0JBRXZCLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLGFBQWE7d0JBQ2IsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSx3QkFBd0I7d0JBQ2xDLGFBQWE7Ozs7OztHQWV0QiIsImZpbGUiOiJwYW0vUGFtQ29udGFpbmVyTGlzdFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBQYW1Db250YWluZXJMaXN0U2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1BhbUNvbnRhaW5lckxpc3RTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgYmFzZVVSTENvbnRhaW5lcnMgPSBgL3VpL3Jlc3QvcGFtL2NvbnRhaW5lcnNgO1xuICAgIGxldCBwYW1Db250YWluZXJMaXN0U2VydmljZSwgJGh0dHBCYWNrZW5kLCAkd2luZG93O1xuXG4gICAgLy8gVXNlIHRoZSBpZGVudGl0eSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcGFtQ29udGFpbmVyTGlzdFNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXywgXyR3aW5kb3dfKSB7XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBwYW1Db250YWluZXJMaXN0U2VydmljZSA9IF9wYW1Db250YWluZXJMaXN0U2VydmljZV87XG4gICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENvbnRhaW5lcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIGN1cnJlbnRVcmw7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldENvbnRhaW5lcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBiYXNlVVJMQ29udGFpbmVycztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHBhbUNvbnRhaW5lckxpc3RTZXJ2aWNlLmdldENvbnRhaW5lcnMoKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
