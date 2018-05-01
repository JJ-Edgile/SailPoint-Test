System.register(['test/js/TestInitializer', 'certification/CertificationModule', './CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationEntityService', function () {
                // Use the module.
                beforeEach(module(certificationModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                var baseURL = '/identityiq/ui/rest/certifications/',
                    certificationEntityService,
                    certificationTestData,
                    http,
                    ListResultDTO,
                    CertificationEntity;

                beforeEach(inject(function (_$httpBackend_, _certificationEntityService_, _certificationTestData_, _SortOrder_, _ListResultDTO_, _CertificationEntity_) {
                    http = _$httpBackend_;
                    certificationEntityService = _certificationEntityService_;
                    certificationTestData = _certificationTestData_;
                    ListResultDTO = _ListResultDTO_;
                    CertificationEntity = _CertificationEntity_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getCertificationEntities()', function () {
                    it('should throw when no id is provided', function () {
                        expect(function () {
                            certificationEntityService.getCertificationEntities(null, 0, 20, null, null, null);
                        }).toThrow();
                    });

                    it('should return a ListResultDTO with transformed CertificationEntity objects', function () {
                        var id = '1234',
                            name = 'James',
                            promise = undefined;

                        http.expectGET(baseURL + id + '/entities?limit=5&query=' + name + '&start=2').respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);
                        promise = certificationEntityService.getCertificationEntities(id, 2, 5, name, null, null);
                        http.flush();

                        promise.then(function (data) {
                            expect(data.data.constructor.name).toBe('ListResultDTO');

                            // Ensure the response was transformed correctly.
                            var entity = data.data.objects[0];
                            expect(entity instanceof CertificationEntity).toEqual(true);
                            expect(entity.id).toEqual(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0].id);
                            expect(entity.targetDisplayName).toEqual(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT.objects[0].targetDisplayName);
                        });
                    });

                    it('should default start and limit values if not provided', function () {
                        var id = '1234';

                        http.expectGET(baseURL + id + '/entities?limit=20&start=0').respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);

                        certificationEntityService.getCertificationEntities(id, null, null, null, null, null);
                        http.flush();
                    });

                    describe('include statistics', function () {
                        var id = '98234';

                        function setupExpectedHTTPCall(includeStats) {
                            var url = '' + baseURL + id + '/entities?';
                            var sep = '';
                            if (includeStats) {
                                url += 'includeStatistics=true';
                                sep = '&';
                            }
                            url += sep + 'limit=20&start=0';

                            http.expectGET(url).respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);
                        }

                        it('are not included if not specified', function () {
                            setupExpectedHTTPCall(false);
                            certificationEntityService.getCertificationEntities(id, null, null, null, null, null);
                            http.flush();
                        });

                        it('are not included if includeStatistics is false', function () {
                            setupExpectedHTTPCall(false);
                            certificationEntityService.getCertificationEntities(id, null, null, null, null, null, false);
                            http.flush();
                        });

                        it('are included if includeStatistics is true', function () {
                            setupExpectedHTTPCall(true);
                            certificationEntityService.getCertificationEntities(id, null, null, null, null, null, true);
                            http.flush();
                        });
                    });

                    it('adds the query to the URL', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities?limit=20&query=abc&start=0').respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);

                        certificationEntityService.getCertificationEntities(id, 0, 20, 'abc', null, null);
                        http.flush();
                    });

                    it('adds the statuses as query parameters', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities?limit=20&start=0&status=foo&status=bar').respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);

                        certificationEntityService.getCertificationEntities(id, 0, 20, null, ['foo', 'bar'], null);
                        http.flush();
                    });

                    it('adds the excluded statuses as query parameters', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities?excludedStatus=foo&excludedStatus=bar&limit=20&start=0').respond(200, certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);

                        certificationEntityService.getCertificationEntities(id, 0, 20, null, null, ['foo', 'bar']);
                        http.flush();
                    });
                });

                describe('getCertificationEntityIds()', function () {
                    it('should throw when no id is provided', function () {
                        expect(function () {
                            return certificationEntityService.getCertificationEntityIds(null, null, null, null);
                        }).toThrow();
                    });

                    it('should return an array of IDs', function () {
                        var id = '1234',
                            ids = undefined;

                        http.expectGET(baseURL + id + '/entities/ids').respond(200, [id]);
                        certificationEntityService.getCertificationEntityIds(id, null, null, null).then(function (result) {
                            return ids = result;
                        });
                        http.flush();

                        expect(ids).toEqual([id]);
                    });

                    it('adds the query to the URL', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities/ids?query=abc').respond(200, [id]);

                        certificationEntityService.getCertificationEntityIds(id, 'abc', null, null);
                        http.flush();
                    });

                    it('adds the statuses as query parameters', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities/ids?status=foo&status=bar').respond(200, [id]);

                        certificationEntityService.getCertificationEntityIds(id, null, ['foo', 'bar'], null);
                        http.flush();
                    });

                    it('adds the excluded statuses as query parameters', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/entities/ids?excludedStatus=foo&excludedStatus=bar').respond(200, [id]);

                        certificationEntityService.getCertificationEntityIds(id, null, null, ['foo', 'bar']);
                        http.flush();
                    });
                });

                describe('getEntity()', function () {
                    it('throws with no cert id', function () {
                        expect(function () {
                            certificationEntityService.getEntity(undefined, '1234');
                        }).toThrow();
                    });

                    it('throws with no entity id', function () {
                        expect(function () {
                            certificationEntityService.getEntity('1234');
                        }).toThrow();
                    });

                    it('should resolve with a CertificationEntity object from REST resource', function () {
                        var id = 'cert1',
                            entityId = 'person1',
                            expectedUrl = '' + baseURL + id + '/entities/' + entityId,
                            entityResult = {
                            id: 'person1',
                            targetDisplayName: 'Person One',
                            itemStatusCount: {
                                Bundle: {
                                    Open: 5,
                                    Complete: 3
                                }
                            }
                        },
                            promise = undefined;

                        http.expectGET(expectedUrl).respond(200, entityResult);
                        promise = certificationEntityService.getEntity(id, entityId);
                        promise.then(function (result) {
                            expect(result instanceof CertificationEntity).toEqual(true);
                            expect(result.id).toEqual(entityResult.id);
                        });

                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDRCQUE0QixVQUFVLFNBQVM7OztJQUc1SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUo3QixTQUFTLDhCQUE4QixZQUFXOztnQkFFOUMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxJQUFJLFVBQVU7b0JBQ1Y7b0JBQTRCO29CQUF1QjtvQkFDbkQ7b0JBQWU7O2dCQUVuQixXQUFXLE9BQU8sVUFBUyxnQkFBZ0IsOEJBQ2hCLHlCQUF5QixhQUFhLGlCQUN0Qyx1QkFBdUI7b0JBQzlDLE9BQU87b0JBQ1AsNkJBQTZCO29CQUM3Qix3QkFBd0I7b0JBQ3hCLGdCQUFnQjtvQkFDaEIsc0JBQXNCOzs7Z0JBRzFCLFVBQVUsWUFBVztvQkFDakIsS0FBSztvQkFDTCxLQUFLOzs7Z0JBR1QsU0FBUyw4QkFBOEIsWUFBVztvQkFDOUMsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsT0FBTyxZQUFXOzRCQUNkLDJCQUEyQix5QkFBeUIsTUFBTSxHQUFHLElBQUksTUFBTSxNQUFNOzJCQUM5RTs7O29CQUdQLEdBQUcsOEVBQThFLFlBQVc7d0JBQ3hGLElBQUksS0FBSzs0QkFDTCxPQUFPOzRCQUNQLFVBQU87O3dCQUVYLEtBQUssVUFBVSxVQUFVLEtBQUssNkJBQTZCLE9BQU8sWUFDN0QsUUFBUSxLQUFLLHNCQUFzQjt3QkFDeEMsVUFBVSwyQkFBMkIseUJBQXlCLElBQUksR0FBRyxHQUFHLE1BQU0sTUFBTTt3QkFDcEYsS0FB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dHlTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFVzZSB0aGUgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICB2YXIgYmFzZVVSTCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L2NlcnRpZmljYXRpb25zLycsXG4gICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIGh0dHAsXG4gICAgICAgIExpc3RSZXN1bHREVE8sIENlcnRpZmljYXRpb25FbnRpdHk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGh0dHBCYWNrZW5kXywgX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvblRlc3REYXRhXywgX1NvcnRPcmRlcl8sIF9MaXN0UmVzdWx0RFRPXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2VydGlmaWNhdGlvbkVudGl0eV8pIHtcbiAgICAgICAgaHR0cCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgICAgICBMaXN0UmVzdWx0RFRPID0gX0xpc3RSZXN1bHREVE9fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRW50aXR5ID0gX0NlcnRpZmljYXRpb25FbnRpdHlfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENlcnRpZmljYXRpb25FbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBubyBpZCBpcyBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcyhudWxsLCAwLCAyMCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgTGlzdFJlc3VsdERUTyB3aXRoIHRyYW5zZm9ybWVkIENlcnRpZmljYXRpb25FbnRpdHkgb2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSmFtZXMnLFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvZW50aXRpZXM/bGltaXQ9NSZxdWVyeT0nICsgbmFtZSArICcmc3RhcnQ9MicpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9FTlRJVFlfTElTVF9SRVNVTFQpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcyhpZCwgMiwgNSwgbmFtZSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRhdGEuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IGRhdGEuZGF0YS5vYmplY3RzWzBdO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbnRpdHkgaW5zdGFuY2VvZiBDZXJ0aWZpY2F0aW9uRW50aXR5KS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbnRpdHkuaWQpLnRvRXF1YWwoY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxULm9iamVjdHNbMF0uaWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbnRpdHkudGFyZ2V0RGlzcGxheU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50b0VxdWFsKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVC5vYmplY3RzWzBdLnRhcmdldERpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRlZmF1bHQgc3RhcnQgYW5kIGxpbWl0IHZhbHVlcyBpZiBub3QgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9lbnRpdGllcz9saW1pdD0yMCZzdGFydD0wJylcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVCk7XG5cbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcyhpZCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdpbmNsdWRlIHN0YXRpc3RpY3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnOTgyMzQnO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXR1cEV4cGVjdGVkSFRUUENhbGwoaW5jbHVkZVN0YXRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IGAke2Jhc2VVUkx9JHtpZH0vZW50aXRpZXM/YDtcbiAgICAgICAgICAgICAgICBsZXQgc2VwID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVTdGF0cykge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gJ2luY2x1ZGVTdGF0aXN0aWNzPXRydWUnO1xuICAgICAgICAgICAgICAgICAgICBzZXAgPSAnJic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVybCArPSBgJHtzZXB9bGltaXQ9MjAmc3RhcnQ9MGA7XG5cbiAgICAgICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl9FTlRJVFlfTElTVF9SRVNVTFQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdCgnYXJlIG5vdCBpbmNsdWRlZCBpZiBub3Qgc3BlY2lmaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwRXhwZWN0ZWRIVFRQQ2FsbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKGlkLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2FyZSBub3QgaW5jbHVkZWQgaWYgaW5jbHVkZVN0YXRpc3RpY3MgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dXBFeHBlY3RlZEhUVFBDYWxsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMoaWQsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2FyZSBpbmNsdWRlZCBpZiBpbmNsdWRlU3RhdGlzdGljcyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldHVwRXhwZWN0ZWRIVFRQQ2FsbCh0cnVlKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMoaWQsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIHRydWUpO1xuICAgICAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyB0aGUgcXVlcnkgdG8gdGhlIFVSTCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvZW50aXRpZXM/bGltaXQ9MjAmcXVlcnk9YWJjJnN0YXJ0PTAnKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxUKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKGlkLCAwLCAyMCwgJ2FiYycsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyB0aGUgc3RhdHVzZXMgYXMgcXVlcnkgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvZW50aXRpZXM/bGltaXQ9MjAmc3RhcnQ9MCZzdGF0dXM9Zm9vJnN0YXR1cz1iYXInKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxUKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKGlkLCAwLCAyMCwgbnVsbCwgWyAnZm9vJywgJ2JhcicgXSwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHRoZSBleGNsdWRlZCBzdGF0dXNlcyBhcyBxdWVyeSBwYXJhbWV0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9lbnRpdGllcz9leGNsdWRlZFN0YXR1cz1mb28mZXhjbHVkZWRTdGF0dXM9YmFyJmxpbWl0PTIwJnN0YXJ0PTAnKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fRU5USVRZX0xJU1RfUkVTVUxUKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKGlkLCAwLCAyMCwgbnVsbCwgbnVsbCwgWyAnZm9vJywgJ2JhcicgXSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENlcnRpZmljYXRpb25FbnRpdHlJZHMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdoZW4gbm8gaWQgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXR5SWRzKG51bGwsIG51bGwsIG51bGwsIG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIElEcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIGlkcztcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9lbnRpdGllcy9pZHMnKS5yZXNwb25kKDIwMCwgWyBpZCBdKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdHlJZHMoaWQsIG51bGwsIG51bGwsIG51bGwpLnRoZW4oKHJlc3VsdCkgPT4gaWRzID0gcmVzdWx0KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KGlkcykudG9FcXVhbChbIGlkIF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyB0aGUgcXVlcnkgdG8gdGhlIFVSTCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvZW50aXRpZXMvaWRzP3F1ZXJ5PWFiYycpLnJlc3BvbmQoMjAwLCBbIGlkIF0pO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXR5SWRzKGlkLCAnYWJjJywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHRoZSBzdGF0dXNlcyBhcyBxdWVyeSBwYXJhbWV0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9lbnRpdGllcy9pZHM/c3RhdHVzPWZvbyZzdGF0dXM9YmFyJykucmVzcG9uZCgyMDAsIFsgaWQgXSk7XG5cbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdHlJZHMoaWQsIG51bGwsIFsgJ2ZvbycsICdiYXInIF0sIG51bGwpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyB0aGUgZXhjbHVkZWQgc3RhdHVzZXMgYXMgcXVlcnkgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvZW50aXRpZXMvaWRzP2V4Y2x1ZGVkU3RhdHVzPWZvbyZleGNsdWRlZFN0YXR1cz1iYXInKS5yZXNwb25kKDIwMCwgWyBpZCBdKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0eUlkcyhpZCwgbnVsbCwgbnVsbCwgWyAnZm9vJywgJ2JhcicgXSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEVudGl0eSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gY2VydCBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldEVudGl0eSh1bmRlZmluZWQsICcxMjM0Jyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGVudGl0eSBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldEVudGl0eSgnMTIzNCcpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVzb2x2ZSB3aXRoIGEgQ2VydGlmaWNhdGlvbkVudGl0eSBvYmplY3QgZnJvbSBSRVNUIHJlc291cmNlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gJ2NlcnQxJyxcbiAgICAgICAgICAgICAgICBlbnRpdHlJZCA9ICdwZXJzb24xJyxcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGAke2Jhc2VVUkx9JHtpZH0vZW50aXRpZXMvJHtlbnRpdHlJZH1gLFxuICAgICAgICAgICAgICAgIGVudGl0eVJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwZXJzb24xJyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWU6ICdQZXJzb24gT25lJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbVN0YXR1c0NvdW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVuOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlOiAzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwgZW50aXR5UmVzdWx0KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkoaWQsIGVudGl0eUlkKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCBpbnN0YW5jZW9mIENlcnRpZmljYXRpb25FbnRpdHkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5pZCkudG9FcXVhbChlbnRpdHlSZXN1bHQuaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
