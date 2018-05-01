System.register(['systemSetup/oAuth/OAuthClientConfigModule', './OAuthClientTestData'], function (_export) {
    /* Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved. */

    'use strict';

    var oAuthClientConfigModule;
    return {
        setters: [function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }, function (_OAuthClientTestData) {}],
        execute: function () {

            /*
             * Tests for the service to call the back end oAuthClientConfig rest endpoint.
             */
            describe('OAuthClientConfigService', function () {
                var baseURLOAuthClientConfig = '/identityiq/rest/oauth2/clients';
                var OAuthClient = undefined,
                    oAuthClientConfigService = undefined,
                    oAuthClientTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                beforeEach(module(oAuthClientConfigModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_OAuthClient_, _oAuthClientConfigService_, _oAuthClientTestData_, _$httpBackend_, _SortOrder_) {
                    OAuthClient = _OAuthClient_;
                    oAuthClientConfigService = _oAuthClientConfigService_;
                    oAuthClientTestData = _oAuthClientTestData_;
                    $httpBackend = _$httpBackend_;
                    SortOrder = _SortOrder_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                function verifySuccess(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 2;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (response) {
                        expect(response).not.toBe(null);
                        expect(response.data).not.toBe(null);
                        expect(response.data.objects).not.toBe(null);
                        var objects = response.data.objects;
                        expect(response.data.count).toEqual(expectedCount);
                        expect(objects.length).toEqual(expectedCount);
                        objects.forEach(function (obj) {
                            expect(obj instanceof OAuthClient).toBeTruthy();
                        });
                    });
                }

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

                describe('get clients', function () {
                    var response = undefined,
                        client1 = undefined,
                        client2 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        client1 = oAuthClientTestData.CLIENT1;
                        client2 = oAuthClientTestData.CLIENT2;
                        response = {
                            count: 2,
                            objects: [client1, client2]
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLOAuthClientConfig).respond(200, response);
                        promise = oAuthClientConfigService.getClients(null, null, null);
                        verifySuccess(promise);
                        $httpBackend.flush();
                    });

                    it('handles a failure', function () {
                        $httpBackend.expectGET(baseURLOAuthClientConfig).respond(500, response);
                        promise = oAuthClientConfigService.getClients(null, null, null);
                        verifyFailure(promise);
                        $httpBackend.flush();
                    });
                });

                describe('update client', function () {
                    var response = undefined,
                        client1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        client1 = oAuthClientTestData.CLIENT1;
                        response = {};
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectPUT(baseURLOAuthClientConfig + '/' + client1.clientId).respond(200, response);
                        promise = oAuthClientConfigService.update(client1);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles a failure', function () {
                        $httpBackend.expectPUT(baseURLOAuthClientConfig + '/' + client1.clientId).respond(500, response);
                        promise = oAuthClientConfigService.update(client1);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles a failure', function () {
                        $httpBackend.expectPUT(baseURLOAuthClientConfig + '/' + client1.clientId).respond(400, response);
                        promise = oAuthClientConfigService.update(client1);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });

                describe('create client', function () {
                    var response = undefined,
                        client1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        client1 = oAuthClientTestData.CLIENT1;
                        client1.clientId = null;
                        response = {};
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig).respond(200, response);
                        promise = oAuthClientConfigService.create(client1);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles a failure', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig).respond(500, response);
                        promise = oAuthClientConfigService.create(client1);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles a failure', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig).respond(400, response);
                        promise = oAuthClientConfigService.create(client1);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });

                describe('delete client', function () {
                    var response = undefined,
                        client1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        client1 = oAuthClientTestData.CLIENT1;
                        response = {};
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectDELETE(baseURLOAuthClientConfig + '/' + client1.clientId).respond(200, response);
                        promise = oAuthClientConfigService.remove(client1);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles 500 failure', function () {
                        $httpBackend.expectDELETE(baseURLOAuthClientConfig + '/' + client1.clientId).respond(500, response);
                        promise = oAuthClientConfigService.remove(client1);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles 400 failure', function () {
                        $httpBackend.expectDELETE(baseURLOAuthClientConfig + '/' + client1.clientId).respond(400, response);
                        promise = oAuthClientConfigService.remove(client1);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });

                describe('regenerateKeys', function () {
                    var response = undefined,
                        client1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        client1 = oAuthClientTestData.CLIENT1;
                        response = {};
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig + '/' + client1.clientId + '/regenerateKeys').respond(200, response);
                        promise = oAuthClientConfigService.regenerateKeys(client1);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                        });
                        $httpBackend.flush();
                    });

                    it('handles 500 failure', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig + '/' + client1.clientId + '/regenerateKeys').respond(500, response);
                        promise = oAuthClientConfigService.regenerateKeys(client1);
                        verifyFailure(promise, 500);
                        $httpBackend.flush();
                    });

                    it('handles 400 failure', function () {
                        $httpBackend.expectPOST(baseURLOAuthClientConfig + '/' + client1.clientId + '/regenerateKeys').respond(400, response);
                        promise = oAuthClientConfigService.regenerateKeys(client1);
                        verifyFailure(promise, 400);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDZDQUE2QywwQkFBMEIsVUFBVSxTQUFTOzs7SUFHdkc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSwwQ0FBMEM7WUFDMUQsMEJBQTBCLHlDQUF5QztXQUNwRSxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7Ozs7O1lBRjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQU0sMkJBQTJCO2dCQUNqQyxJQUFJLGNBQVc7b0JBQUUsMkJBQXdCO29CQUFFLHNCQUFtQjtvQkFBRSxlQUFZO29CQUFFLFlBQVM7O2dCQUV2RixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLGVBQWUsNEJBQTRCLHVCQUM5RCxnQkFBZ0IsYUFBYTtvQkFDakMsY0FBYztvQkFDZCwyQkFBMkI7b0JBQzNCLHNCQUFzQjtvQkFDdEIsZUFBZTtvQkFDZixZQUFZOzs7Z0JBR2hCLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsY0FBYyxTQUFTLGVBQWU7b0JBQzNDLElBQUksUUFBUSxZQUFZLGdCQUFnQjt3QkFDcEMsZ0JBQWdCOztvQkFFcEIsT0FBTyxTQUFTO29CQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVO3dCQUM1QixPQUFPLFVBQVUsSUFBSSxLQUFLO3dCQUMxQixPQUFPLFNBQVMsTUFBTSxJQUFJLEtBQUs7d0JBQy9CLE9BQU8sU0FBUyxLQUFLLFNBQVMsSUFBSSxLQUFLO3dCQUN2QyxJQUFJLFVBQVUsU0FBUyxLQUFLO3dCQUM1QixPQUFPLFNBQVMsS0FBSyxPQUFPLFFBQVE7d0JBQ3BDLE9BQU8sUUFBUSxRQUFRLFFBQVE7d0JBQy9C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VSx5QkFBeUIsZUFBZTt3QkFDbEQsY0FBYyxTQUFTO3dCQUN2QixhQUFhOzs7b0JBR2pCLEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLGFBQWEsV0FBVywyQkFBMkIsTUFBTSxRQUFRLFdBQVcsbUJBQzVFLFFBQVEsS0FBSzt3QkFDYixVQUFVLHlCQUF5QixlQUFlO3dCQUNsRCxjQUFjLFNBQVM7d0JBQ3ZCLGFBQWE7Ozs7OztHQU10QiIsImZpbGUiOiJzeXN0ZW1TZXR1cC9vQXV0aC9PQXV0aENsaWVudENvbmZpZ1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoQykgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuICBBbGwgcmlnaHRzIHJlc2VydmVkLiAqL1xuXG5pbXBvcnQgb0F1dGhDbGllbnRDb25maWdNb2R1bGUgZnJvbSAnc3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRDb25maWdNb2R1bGUnO1xuaW1wb3J0ICcuL09BdXRoQ2xpZW50VGVzdERhdGEnO1xuXG4vKlxuICogVGVzdHMgZm9yIHRoZSBzZXJ2aWNlIHRvIGNhbGwgdGhlIGJhY2sgZW5kIG9BdXRoQ2xpZW50Q29uZmlnIHJlc3QgZW5kcG9pbnQuXG4gKi9cbmRlc2NyaWJlKCdPQXV0aENsaWVudENvbmZpZ1NlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBiYXNlVVJMT0F1dGhDbGllbnRDb25maWcgPSAnL2lkZW50aXR5aXEvcmVzdC9vYXV0aDIvY2xpZW50cyc7XG4gICAgbGV0IE9BdXRoQ2xpZW50LCBvQXV0aENsaWVudENvbmZpZ1NlcnZpY2UsIG9BdXRoQ2xpZW50VGVzdERhdGEsICRodHRwQmFja2VuZCwgU29ydE9yZGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUob0F1dGhDbGllbnRDb25maWdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfT0F1dGhDbGllbnRfLCBfb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlXywgX29BdXRoQ2xpZW50VGVzdERhdGFfLFxuICAgICAgICAgICAgXyRodHRwQmFja2VuZF8sIF9Tb3J0T3JkZXJfKSB7XG4gICAgICAgIE9BdXRoQ2xpZW50ID0gX09BdXRoQ2xpZW50XztcbiAgICAgICAgb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlID0gX29BdXRoQ2xpZW50Q29uZmlnU2VydmljZV87XG4gICAgICAgIG9BdXRoQ2xpZW50VGVzdERhdGEgPSBfb0F1dGhDbGllbnRUZXN0RGF0YV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlTdWNjZXNzKHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcbiAgICAgICAgICAgIGV4cGVjdGVkQ291bnQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHMpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb3VudCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIG9iamVjdHMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvYmogaW5zdGFuY2VvZiBPQXV0aENsaWVudCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZlcmlmeUZhaWx1cmUocHJvbWlzZSwgaHR0cEVycm9yKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGh0dHBFcnJvcikpIHtcbiAgICAgICAgICAgIGh0dHBFcnJvciA9IDUwMDtcbiAgICAgICAgfVxuICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICAgICAgICAgLy8gZmFpbFxuICAgICAgICAgICAgZXhwZWN0KGZhbHNlKS50b0JlKHRydWUpO1xuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5zdGF0dXMpLnRvRXF1YWwoaHR0cEVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dldCBjbGllbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXNwb25zZSwgY2xpZW50MSwgY2xpZW50MiwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xpZW50MSA9IG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMTtcbiAgICAgICAgICAgIGNsaWVudDIgPSBvQXV0aENsaWVudFRlc3REYXRhLkNMSUVOVDI7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbY2xpZW50MSwgY2xpZW50Ml1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMT0F1dGhDbGllbnRDb25maWcpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLmdldENsaWVudHMobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlTdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdoYW5kbGVzIGEgZmFpbHVyZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMT0F1dGhDbGllbnRDb25maWcpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoNTAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLmdldENsaWVudHMobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndXBkYXRlIGNsaWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UsIGNsaWVudDEsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsaWVudDEgPSBvQXV0aENsaWVudFRlc3REYXRhLkNMSUVOVDE7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBVVChiYXNlVVJMT0F1dGhDbGllbnRDb25maWcgKyAnLycgKyBjbGllbnQxLmNsaWVudElkKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS51cGRhdGUoY2xpZW50MSk7XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdoYW5kbGVzIGEgZmFpbHVyZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBVVChiYXNlVVJMT0F1dGhDbGllbnRDb25maWcgKyAnLycgKyBjbGllbnQxLmNsaWVudElkKS5cbiAgICAgICAgICAgIHJlc3BvbmQoNTAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLnVwZGF0ZShjbGllbnQxKTtcbiAgICAgICAgICAgIHZlcmlmeUZhaWx1cmUocHJvbWlzZSwgNTAwKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyBhIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQVVQoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnICsgJy8nICsgY2xpZW50MS5jbGllbnRJZCkuXG4gICAgICAgICAgICByZXNwb25kKDQwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS51cGRhdGUoY2xpZW50MSk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDQwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjcmVhdGUgY2xpZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXNwb25zZSwgY2xpZW50MSwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xpZW50MSA9IG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMTtcbiAgICAgICAgICAgIGNsaWVudDEuY2xpZW50SWQgPSBudWxsO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7IH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5jcmVhdGUoY2xpZW50MSk7XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdoYW5kbGVzIGEgZmFpbHVyZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnKS5cbiAgICAgICAgICAgIHJlc3BvbmQoNTAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLmNyZWF0ZShjbGllbnQxKTtcbiAgICAgICAgICAgIHZlcmlmeUZhaWx1cmUocHJvbWlzZSwgNTAwKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyBhIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkxPQXV0aENsaWVudENvbmZpZykuXG4gICAgICAgICAgICByZXNwb25kKDQwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5jcmVhdGUoY2xpZW50MSk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDQwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkZWxldGUgY2xpZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXNwb25zZSwgY2xpZW50MSwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xpZW50MSA9IG9BdXRoQ2xpZW50VGVzdERhdGEuQ0xJRU5UMTtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0REVMRVRFKGJhc2VVUkxPQXV0aENsaWVudENvbmZpZyArICcvJyArIGNsaWVudDEuY2xpZW50SWQpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLnJlbW92ZShjbGllbnQxKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhbmRsZXMgNTAwIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RERUxFVEUoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnICsgJy8nICsgY2xpZW50MS5jbGllbnRJZCkuXG4gICAgICAgICAgICByZXNwb25kKDUwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZW1vdmUoY2xpZW50MSk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDUwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhbmRsZXMgNDAwIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RERUxFVEUoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnICsgJy8nICsgY2xpZW50MS5jbGllbnRJZCkuXG4gICAgICAgICAgICByZXNwb25kKDQwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZW1vdmUoY2xpZW50MSk7XG4gICAgICAgICAgICB2ZXJpZnlGYWlsdXJlKHByb21pc2UsIDQwMCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWdlbmVyYXRlS2V5cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UsIGNsaWVudDEsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsaWVudDEgPSBvQXV0aENsaWVudFRlc3REYXRhLkNMSUVOVDE7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnICsgJy8nICsgY2xpZW50MS5jbGllbnRJZCArICcvcmVnZW5lcmF0ZUtleXMnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZWdlbmVyYXRlS2V5cyhjbGllbnQxKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2hhbmRsZXMgNTAwIGZhaWx1cmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkxPQXV0aENsaWVudENvbmZpZyArICcvJyArIGNsaWVudDEuY2xpZW50SWQgKyAnL3JlZ2VuZXJhdGVLZXlzJykuXG4gICAgICAgICAgICByZXNwb25kKDUwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG9BdXRoQ2xpZW50Q29uZmlnU2VydmljZS5yZWdlbmVyYXRlS2V5cyhjbGllbnQxKTtcbiAgICAgICAgICAgIHZlcmlmeUZhaWx1cmUocHJvbWlzZSwgNTAwKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaGFuZGxlcyA0MDAgZmFpbHVyZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYmFzZVVSTE9BdXRoQ2xpZW50Q29uZmlnICsgJy8nICsgY2xpZW50MS5jbGllbnRJZCArICcvcmVnZW5lcmF0ZUtleXMnKS5cbiAgICAgICAgICAgIHJlc3BvbmQoNDAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gb0F1dGhDbGllbnRDb25maWdTZXJ2aWNlLnJlZ2VuZXJhdGVLZXlzKGNsaWVudDEpO1xuICAgICAgICAgICAgdmVyaWZ5RmFpbHVyZShwcm9taXNlLCA0MDApO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
