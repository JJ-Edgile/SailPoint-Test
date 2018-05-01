System.register(['systemSetup/oAuth/OAuthConfigurationModule', './OAuthConfigurationTestData'], function (_export) {
    /* Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved. */

    'use strict';

    var oAuthConfigurationModule;
    return {
        setters: [function (_systemSetupOAuthOAuthConfigurationModule) {
            oAuthConfigurationModule = _systemSetupOAuthOAuthConfigurationModule['default'];
        }, function (_OAuthConfigurationTestData) {}],
        execute: function () {

            /*
             * Tests for the service to call the back end oAuthConfiguration rest endpoint.
             */
            describe('OAuthConfigurationService', function () {
                var baseURLOAuthConfiguration = '/identityiq/rest/oauth2/configuration';
                var OAuthConfiguration = undefined,
                    oAuthConfigurationService = undefined,
                    oAuthConfigurationTestData = undefined,
                    $httpBackend = undefined;

                beforeEach(module(oAuthConfigurationModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_OAuthConfiguration_, _oAuthConfigurationService_, _oAuthConfigurationTestData_, _$httpBackend_) {
                    OAuthConfiguration = _OAuthConfiguration_;
                    oAuthConfigurationService = _oAuthConfigurationService_;
                    oAuthConfigurationTestData = _oAuthConfigurationTestData_;
                    $httpBackend = _$httpBackend_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                function verifyFailure(promise, httpError) {
                    if (angular.isUndefined(httpError)) {
                        httpError = 500;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (success) {
                        // fail
                        expect(false).toBe(true);
                    }, function (response) {
                        expect(response).toBeDefined();
                        expect(response.status).toBeDefined();
                        expect(response.status).toEqual(httpError);
                    });
                }

                describe('update configuration', function () {
                    var response = undefined,
                        config = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        config = oAuthConfigurationTestData;
                        response = {};
                    });

                    it('accepts update request', function () {
                        $httpBackend.expectPUT(baseURLOAuthConfiguration).respond(200, response);
                        promise = oAuthConfigurationService.update(config);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles update 500 failure', function () {
                        $httpBackend.expectPUT(baseURLOAuthConfiguration).respond(500, response);
                        promise = oAuthConfigurationService.update(config);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles update 400 failure', function () {
                        $httpBackend.expectPUT(baseURLOAuthConfiguration).respond(400, response);
                        promise = oAuthConfigurationService.update(config);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });

                describe('get configuration', function () {
                    var response = undefined,
                        config = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        config = oAuthConfigurationTestData;
                        response = {};
                    });

                    it('accepts get request', function () {
                        $httpBackend.expectGET(baseURLOAuthConfiguration).respond(200, response);
                        promise = oAuthConfigurationService.get(config);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles get 500 failure', function () {
                        $httpBackend.expectGET(baseURLOAuthConfiguration).respond(500, response);
                        promise = oAuthConfigurationService.get(config);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles get 400 failure', function () {
                        $httpBackend.expectGET(baseURLOAuthConfiguration).respond(400, response);
                        promise = oAuthConfigurationService.get(config);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ29uZmlndXJhdGlvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyw4Q0FBOEMsaUNBQWlDLFVBQVUsU0FBUzs7O0lBRy9HOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsMkNBQTJDO1lBQzNELDJCQUEyQiwwQ0FBMEM7V0FDdEUsVUFBVSw2QkFBNkI7UUFDMUMsU0FBUyxZQUFZOzs7OztZQUY3QixTQUFTLDZCQUE2QixZQUFXO2dCQUM3QyxJQUFNLDRCQUE0QjtnQkFDbEMsSUFBSSxxQkFBa0I7b0JBQUUsNEJBQXlCO29CQUFFLDZCQUEwQjtvQkFBRSxlQUFZOztnQkFFM0YsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxzQkFBc0IsNkJBQTZCLDhCQUN0RSxnQkFBZ0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsNEJBQTRCO29CQUM1Qiw2QkFBNkI7b0JBQzdCLGVBQWU7OztnQkFHbkIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxjQUFjLFNBQVMsV0FBVztvQkFDdkMsSUFBSSxRQUFRLFlBQVksWUFBWTt3QkFDaEMsWUFBWTs7b0JBRWhCLE9BQU8sU0FBUztvQkFDaEIsUUFBUSxLQUFLLFVBQVMsU0FBUzs7d0JBRTNCLE9BQU8sT0FBTyxLQUFLO3VCQUNwQixVQUFTLFVBQVU7d0JBQ2xCLE9BQU8sVUFBVTt3QkFDakIsT0FBTyxTQUFTLFFBQVE7d0JBQ3hCLE9BQU8sU0FBUyxRQUFRLFFBQVE7Ozs7Z0JBSXhDLFNBQVMsd0JBQXdCLFlBQVc7b0JBQ3hDLElBQUksV0FBUTt3QkFBRSxTQUFNO3dCQUFFLFVBQU87O29CQUU3QixXQUFXLFlBQVc7d0JBQ2xCLFNBQVM7d0JBQ1QsV0FBVzs7O29CQUlmLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLGFBQWEsVUFBVSwyQkFDbkIsUUFBUSxLQUFLO3dCQUNqQixVQUFVLDBCQUEwQixPQUFPO3dCQUMzQyxPQUFPLFNBQVM7d0JBQ2hCLFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sVUFBVSxJQUFJLEtBQUs7O3dCQUU5QixhQUFhOzs7b0JBR2pCLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLGFBQWEsVUFBVSwyQkFDdkIsUUFBUSxLQUFLO3dCQUNiLFVBQVUsMEJBQTBCLE9BQU87d0JBQzNDLGNBQWMsU0FBUzt3QkFDdkIsYUFBYTs7O29CQUdqQixHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxhQUFhLFVBQVUsMkJBQ3ZCLFFBQVEsS0FBSzt3QkFDYixVQUFVLDBCQUEwQixPQUFPO3dCQUMzQyxjQUFjLFNBQVM7d0JBQ3ZCLGFBQWE7Ozs7Z0JBS3JCLFNBQVMscUJBQXFCLFlBQVc7b0JBQ3JDLElBQUksV0FBUTt3QkFBRSxTQUFNO3dCQUFFLFVBQU87O29CQUU3QixXQUFXLFlBQVc7d0JBQ2xCLFNBQVM7d0JBQ1QsV0FBVzs7O29CQUdmLEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLGFBQWEsVUFBVSwyQkFDbkIsUUFBUSxLQUFLO3dCQUNqQixVQUFVLDBCQUEwQixJQUFJO3dCQUN4QyxPQUFPLFNBQVM7d0JBQ2hCLFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sVUFBVSxJQUFJLEtBQUs7O3dCQUU5QixhQUFhOzs7b0JBR2pCLEdBQUcsMkJBQTJCLFlBQVc7d0JBQ3JDLGFBQWEsVUFBVSwyQkFDdkIsUUFBUSxLQUFLO3dCQUNiLFVBQVUsMEJBQTBCLElBQUk7d0JBQ3hDLGNBQWMsU0FBUzt3QkFDdkIsYUFBYTs7O29CQUdqQixHQUFHLDJCQUEyQixZQUFXO3dCQUNyQyxhQUFhLFVBQVUsMkJBQ3ZCLFFBQVEsS0FBSzt3QkFDYixVQUFVLDBCQUEwQixJQUFJO3dCQUN4QyxjQUFjLFNBQVM7d0JBQ3ZCLGFBQWE7Ozs7OztHQVd0QiIsImZpbGUiOiJzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENvbmZpZ3VyYXRpb25TZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gKi9cblxuaW1wb3J0IG9BdXRoQ29uZmlndXJhdGlvbk1vZHVsZSBmcm9tICdzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENvbmZpZ3VyYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuL09BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhJztcblxuLypcbiAqIFRlc3RzIGZvciB0aGUgc2VydmljZSB0byBjYWxsIHRoZSBiYWNrIGVuZCBvQXV0aENvbmZpZ3VyYXRpb24gcmVzdCBlbmRwb2ludC5cbiAqL1xuZGVzY3JpYmUoJ09BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBiYXNlVVJMT0F1dGhDb25maWd1cmF0aW9uID0gJy9pZGVudGl0eWlxL3Jlc3Qvb2F1dGgyL2NvbmZpZ3VyYXRpb24nO1xuICAgIGxldCBPQXV0aENvbmZpZ3VyYXRpb24sIG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UsIG9BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhLCAkaHR0cEJhY2tlbmQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShvQXV0aENvbmZpZ3VyYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfT0F1dGhDb25maWd1cmF0aW9uXywgX29BdXRoQ29uZmlndXJhdGlvblNlcnZpY2VfLCBfb0F1dGhDb25maWd1cmF0aW9uVGVzdERhdGFfLFxuICAgICAgICAgICAgXyRodHRwQmFja2VuZF8pIHtcbiAgICAgICAgT0F1dGhDb25maWd1cmF0aW9uID0gX09BdXRoQ29uZmlndXJhdGlvbl87XG4gICAgICAgIG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UgPSBfb0F1dGhDb25maWd1cmF0aW9uU2VydmljZV87XG4gICAgICAgIG9BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhID0gX29BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5RmFpbHVyZShwcm9taXNlLCBodHRwRXJyb3IpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoaHR0cEVycm9yKSkge1xuICAgICAgICAgICAgaHR0cEVycm9yID0gNTAwO1xuICAgICAgICB9XG4gICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgICAgICAgICAvLyBmYWlsXG4gICAgICAgICAgICBleHBlY3QoZmFsc2UpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9FcXVhbChodHRwRXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgndXBkYXRlIGNvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlLCBjb25maWcsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbmZpZyA9IG9BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyB1cGRhdGUgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBVVChiYXNlVVJMT0F1dGhDb25maWd1cmF0aW9uKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UudXBkYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdoYW5kbGVzIHVwZGF0ZSA1MDAgZmFpbHVyZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBVVChiYXNlVVJMT0F1dGhDb25maWd1cmF0aW9uKS5cbiAgICAgICAgICAgIHJlc3BvbmQoNTAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDb25maWd1cmF0aW9uU2VydmljZS51cGRhdGUoY29uZmlnKTtcbiAgICAgICAgICAgIHZlcmlmeUZhaWx1cmUocHJvbWlzZSwgNTAwKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyB1cGRhdGUgNDAwIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQVVQoYmFzZVVSTE9BdXRoQ29uZmlndXJhdGlvbikuXG4gICAgICAgICAgICByZXNwb25kKDQwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UudXBkYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDQwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgY29uZmlndXJhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UsIGNvbmZpZywgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uZmlnID0gb0F1dGhDb25maWd1cmF0aW9uVGVzdERhdGE7XG4gICAgICAgICAgICByZXNwb25zZSA9IHsgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgZ2V0IHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTE9BdXRoQ29uZmlndXJhdGlvbikuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBvQXV0aENvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldChjb25maWcpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkubm90LnRvQmUobnVsbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyBnZXQgNTAwIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTE9BdXRoQ29uZmlndXJhdGlvbikuXG4gICAgICAgICAgICByZXNwb25kKDUwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ29uZmlndXJhdGlvblNlcnZpY2UuZ2V0KGNvbmZpZyk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDUwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhbmRsZXMgZ2V0IDQwMCBmYWlsdXJlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxPQXV0aENvbmZpZ3VyYXRpb24pLlxuICAgICAgICAgICAgcmVzcG9uZCg0MDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBvQXV0aENvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldChjb25maWcpO1xuICAgICAgICAgICAgdmVyaWZ5RmFpbHVyZShwcm9taXNlLCA0MDApO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
