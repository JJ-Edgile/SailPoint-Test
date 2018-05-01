System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('certificationItemSuggestService', function () {

                var certificationItemSuggestService = undefined,
                    ListResultDTO = undefined,
                    $httpBackend = undefined,
                    certId = undefined,
                    baseURL = '/identityiq/ui/rest/certifications/';

                beforeEach(module(certificationModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_certificationItemSuggestService_, _ListResultDTO_, _$httpBackend_) {
                    certificationItemSuggestService = _certificationItemSuggestService_;
                    ListResultDTO = _ListResultDTO_;
                    $httpBackend = _$httpBackend_;
                    certId = 'cert1234';
                }));

                describe('getObjects', function () {
                    it('throws with no certId', function () {
                        expect(function () {
                            return certificationItemSuggestService.getObjects('a', 0, 5, {
                                suggestFunc: 'getEntitlementNames'
                            });
                        }).toThrow();
                    });

                    it('throws with no suggestFunc', function () {
                        expect(function () {
                            return certificationItemSuggestService.getObjects('a', 0, 5, {
                                certId: 'certId'
                            });
                        }).toThrow();
                    });

                    it('calls the suggestFunc with correct parameters', function () {
                        var query = 'a',
                            start = 0,
                            limit = 5,
                            params = {
                            certId: certId,
                            suggestFunc: 'getEntitlementNames',
                            application: 'App1'
                        };
                        spyOn(certificationItemSuggestService, 'getEntitlementNames');
                        certificationItemSuggestService.getObjects(query, start, limit, params);
                        expect(certificationItemSuggestService.getEntitlementNames).toHaveBeenCalledWith(certId, query, start, limit, params);
                    });
                });

                describe('getEntitlementNames', function () {
                    it('throws with no application', function () {
                        expect(function () {
                            return certificationItemSuggestService.getEntitlementNames(certId, 'a', 0, 5, {});
                        }).toThrow();
                    });

                    it('calls through to REST resource with correct parameters', function () {
                        var url = baseURL + certId + '/items/suggest/entitlements/names?application=App1&limit=5&query=a&start=0',
                            nameResult = {
                            count: 1,
                            objects: [{ id: 'abc' }]
                        },
                            promise = undefined;
                        $httpBackend.expectGET(url).respond(200, nameResult);
                        promise = certificationItemSuggestService.getEntitlementNames(certId, 'a', 0, 5, {
                            application: 'App1'
                        });
                        $httpBackend.flush();
                        promise.then(function (response) {
                            expect(response instanceof ListResultDTO).toEqual(true);
                        });
                    });
                });

                describe('getEntitlementValues', function () {
                    it('throws with no application', function () {
                        expect(function () {
                            return certificationItemSuggestService.getEntitlementValues(certId, 'a', 0, 5, {
                                name: 'name'
                            });
                        }).toThrow();
                    });

                    it('throws with no name', function () {
                        expect(function () {
                            return certificationItemSuggestService.getEntitlementValues(certId, 'a', 0, 5, {
                                application: 'App1'
                            });
                        }).toThrow();
                    });

                    it('calls through to REST resource with correct parameters', function () {
                        var url = baseURL + certId + '/items/suggest/entitlements/values?application=App1&isPermission=true&' + 'limit=5&name=perm1&query=a&start=0',
                            result = {
                            count: 1,
                            objects: [{ id: 'abc' }]
                        },
                            promise = undefined;
                        $httpBackend.expectGET(url).respond(200, result);
                        promise = certificationItemSuggestService.getEntitlementValues(certId, 'a', 0, 5, {
                            application: 'App1',
                            name: 'perm1',
                            isPermission: true
                        });
                        $httpBackend.flush();
                        promise.then(function (response) {
                            expect(response instanceof ListResultDTO).toEqual(true);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7SUFHakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsbUNBQW1DLFlBQU07O2dCQUU5QyxJQUFJLGtDQUErQjtvQkFBRSxnQkFBYTtvQkFBRSxlQUFZO29CQUFFLFNBQU07b0JBQ3BFLFVBQVU7O2dCQUVkLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQUMsbUNBQW1DLGlCQUFpQixnQkFBbUI7b0JBQ3RGLGtDQUFrQztvQkFDbEMsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLFNBQVM7OztnQkFHYixTQUFTLGNBQWMsWUFBTTtvQkFDekIsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFBOzRCQVdTLE9BWEgsZ0NBQWdDLFdBQVcsS0FBSyxHQUFHLEdBQUc7Z0NBQy9ELGFBQWE7OzJCQUNiOzs7b0JBR1IsR0FBRyw4QkFBOEIsWUFBTTt3QkFDbkMsT0FBTyxZQUFBOzRCQWFTLE9BYkgsZ0NBQWdDLFdBQVcsS0FBSyxHQUFHLEdBQUc7Z0NBQy9ELFFBQVE7OzJCQUNSOzs7b0JBR1IsR0FBRyxpREFBaUQsWUFBTTt3QkFDdEQsSUFBSSxRQUFROzRCQUNSLFFBQVE7NEJBQ1IsUUFBUTs0QkFDUixTQUFTOzRCQUNMLFFBQVE7NEJBQ1IsYUFBYTs0QkFDYixhQUFhOzt3QkFFckIsTUFBTSxpQ0FBaUM7d0JBQ3ZDLGdDQUFnQyxXQUFXLE9BQU8sT0FBTyxPQUFPO3dCQUNoRSxPQUFPLGdDQUFnQyxxQkFDbEMscUJBQXFCLFFBQVEsT0FBTyxPQUFPLE9BQU87Ozs7Z0JBSS9ELFNBQVMsdUJBQXVCLFlBQU07b0JBQ2xDLEdBQUcsOEJBQThCLFlBQU07d0JBQ25DLE9BQU8sWUFBQTs0QkFjUyxPQWRILGdDQUFnQyxvQkFBb0IsUUFBUSxLQUFLLEdBQUcsR0FBRzsyQkFBSzs7O29CQUc3RixHQUFHLDBEQUEwRCxZQUFNO3dCQUMvRCxJQUFJLE1BQU0sVUFBVSxTQUFTOzRCQUN6QixhQUFhOzRCQUNULE9BQU87NEJBQ1AsU0FBUyxDQUFDLEVBQUUsSUFBSTs7NEJBQ2pCLFVBQU87d0JBQ2QsYUFBYSxVQUFVLEtBQUssUUFBUSxLQUFLO3dCQUN6QyxVQUFVLGdDQUFnQyxvQkFBb0IsUUFBUSxLQUFLLEdBQUcsR0FBRzs0QkFDN0UsYUFBYTs7d0JBRWpCLGFBQWE7d0JBQ2IsUUFBUSxLQUFLLFVBQVMsVUFBVTs0QkFDNUIsT0FBTyxvQkFBb0IsZUFBZSxRQUFROzs7OztnQkFLOUQsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRyw4QkFBOEIsWUFBTTt3QkFDbkMsT0FBTyxZQUFBOzRCQWlCUyxPQWpCSCxnQ0FBZ0MscUJBQXFCLFFBQVEsS0FBSyxHQUFHLEdBQUc7Z0NBQ2pGLE1BQU07OzJCQUNOOzs7b0JBR1IsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsT0FBTyxZQUFBOzRCQW1CUyxPQW5CSCxnQ0FBZ0MscUJBQXFCLFFBQVEsS0FBSyxHQUFHLEdBQUc7Z0NBQ2pGLGFBQWE7OzJCQUNiOzs7b0JBR1IsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsSUFBSSxNQUFNLFVBQVUsU0FBUywyRUFDckI7NEJBQ0osU0FBUzs0QkFDTCxPQUFPOzRCQUNQLFNBQVMsQ0FBQyxFQUFFLElBQUk7OzRCQUNqQixVQUFPO3dCQUNkLGFBQWEsVUFBVSxLQUFLLFFBQVEsS0FBSzt3QkFDekMsVUFBVSxnQ0FBZ0MscUJBQXFCLFFBQVEsS0FBSyxHQUFHLEdBQUc7NEJBQzlFLGFBQWE7NEJBQ2IsTUFBTTs0QkFDTixjQUFjOzt3QkFFbEIsYUFBYTt3QkFDYixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLG9CQUFvQixlQUFlLFFBQVE7Ozs7Ozs7R0EyQi9EIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcblxuZGVzY3JpYmUoJ2NlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICBsZXQgY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZSwgTGlzdFJlc3VsdERUTywgJGh0dHBCYWNrZW5kLCBjZXJ0SWQsXG4gICAgICAgIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9jZXJ0aWZpY2F0aW9ucy8nO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZV8sIF9MaXN0UmVzdWx0RFRPXywgXyRodHRwQmFja2VuZF8pID0+IHtcbiAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlXztcbiAgICAgICAgTGlzdFJlc3VsdERUTyA9IF9MaXN0UmVzdWx0RFRPXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIGNlcnRJZCA9ICdjZXJ0MTIzNCc7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2dldE9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjZXJ0SWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKCdhJywgMCwgNSwge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3RGdW5jOiAnZ2V0RW50aXRsZW1lbnROYW1lcydcbiAgICAgICAgICAgIH0pKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBzdWdnZXN0RnVuYycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMoJ2EnLCAwLCA1LCB7XG4gICAgICAgICAgICAgICAgY2VydElkOiAnY2VydElkJ1xuICAgICAgICAgICAgfSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRoZSBzdWdnZXN0RnVuYyB3aXRoIGNvcnJlY3QgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBxdWVyeSA9ICdhJyxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSA1LFxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2VydElkOiBjZXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RGdW5jOiAnZ2V0RW50aXRsZW1lbnROYW1lcycsXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMSdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZSwgJ2dldEVudGl0bGVtZW50TmFtZXMnKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cyhxdWVyeSwgc3RhcnQsIGxpbWl0LCBwYXJhbXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UuZ2V0RW50aXRsZW1lbnROYW1lcylcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydElkLCBxdWVyeSwgc3RhcnQsIGxpbWl0LCBwYXJhbXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRFbnRpdGxlbWVudE5hbWVzJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gYXBwbGljYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRFbnRpdGxlbWVudE5hbWVzKGNlcnRJZCwgJ2EnLCAwLCA1LCB7fSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gUkVTVCByZXNvdXJjZSB3aXRoIGNvcnJlY3QgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBiYXNlVVJMICsgY2VydElkICsgJy9pdGVtcy9zdWdnZXN0L2VudGl0bGVtZW50cy9uYW1lcz9hcHBsaWNhdGlvbj1BcHAxJmxpbWl0PTUmcXVlcnk9YSZzdGFydD0wJyxcbiAgICAgICAgICAgICAgICBuYW1lUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3sgaWQ6ICdhYmMnIH1dXG4gICAgICAgICAgICAgICAgfSwgcHJvbWlzZTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgbmFtZVJlc3VsdCk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRFbnRpdGxlbWVudE5hbWVzKGNlcnRJZCwgJ2EnLCAwLCA1LCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSBpbnN0YW5jZW9mIExpc3RSZXN1bHREVE8pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RW50aXRsZW1lbnRWYWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBhcHBsaWNhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlLmdldEVudGl0bGVtZW50VmFsdWVzKGNlcnRJZCwgJ2EnLCAwLCA1LCB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ25hbWUnXG4gICAgICAgICAgICB9KSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gbmFtZScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlLmdldEVudGl0bGVtZW50VmFsdWVzKGNlcnRJZCwgJ2EnLCAwLCA1LCB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJ1xuICAgICAgICAgICAgfSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gUkVTVCByZXNvdXJjZSB3aXRoIGNvcnJlY3QgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSBiYXNlVVJMICsgY2VydElkICsgJy9pdGVtcy9zdWdnZXN0L2VudGl0bGVtZW50cy92YWx1ZXM/YXBwbGljYXRpb249QXBwMSZpc1Blcm1pc3Npb249dHJ1ZSYnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWl0PTUmbmFtZT1wZXJtMSZxdWVyeT1hJnN0YXJ0PTAnLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7IGlkOiAnYWJjJyB9XVxuICAgICAgICAgICAgICAgIH0sIHByb21pc2U7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIHJlc3VsdCk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRFbnRpdGxlbWVudFZhbHVlcyhjZXJ0SWQsICdhJywgMCwgNSwge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Blcm0xJyxcbiAgICAgICAgICAgICAgICBpc1Blcm1pc3Npb246IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UgaW5zdGFuY2VvZiBMaXN0UmVzdWx0RFRPKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
