System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {

            describe('AccessRequestFilterService', function () {
                var http, accessRequestFilterService, Filter, SEARCH_TYPE_KEYWORD, SEARCH_TYPE_POPULATION, FilterValue;

                beforeEach(module(accessRequestModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function ($httpBackend, _accessRequestFilterService_, _Filter_, _SEARCH_TYPE_KEYWORD_, _SEARCH_TYPE_POPULATION_, _FilterValue_) {
                    http = $httpBackend;
                    accessRequestFilterService = _accessRequestFilterService_;
                    Filter = _Filter_;
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    SEARCH_TYPE_POPULATION = _SEARCH_TYPE_POPULATION_;
                    FilterValue = _FilterValue_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getIdentityFilters()', function () {

                    var identityFiltersUrl = '/identityiq/ui/rest/requestAccess/identities/filters',
                        returnedPromise;

                    it('should call http service', function () {
                        http.expectGET(identityFiltersUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getIdentityFilters();
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });

                    it('should have the returned value', function () {
                        var tmp;
                        http.expectGET(identityFiltersUrl).respond(200, [{
                            property: 'name',
                            multiValued: false
                        }, {
                            property: 'manager',
                            multiValued: true
                        }]);
                        returnedPromise = accessRequestFilterService.getIdentityFilters();
                        returnedPromise.then(function (filters) {
                            tmp = filters;
                        });
                        http.flush();
                        expect(tmp.length).toEqual(2);
                        expect(tmp[0].constructor).toEqual(Filter);
                        expect(tmp[0].property).toEqual('name');
                        expect(tmp[0].multiValued).toBeFalsy();
                        expect(tmp[1].constructor).toEqual(Filter);
                        expect(tmp[1].property).toEqual('manager');
                        expect(tmp[1].multiValued).toBeTruthy();
                    });
                });

                describe('getAccessFilters()', function () {

                    var expectedUrl = '/identityiq/whatever?searchType=Keyword',
                        url = '/identityiq/whatever',
                        returnedPromise;

                    it('should call http service', function () {
                        http.expectGET(expectedUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessFilters(url);
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });

                    it('should have the returned value', function () {
                        var tmp;
                        http.expectGET(expectedUrl).respond(200, [{
                            property: 'name',
                            multiValued: false
                        }, {
                            property: 'owner',
                            multiValued: true
                        }]);
                        returnedPromise = accessRequestFilterService.getAccessFilters(url);
                        returnedPromise.then(function (filters) {
                            tmp = filters;
                        });
                        http.flush();
                        expect(tmp.length).toEqual(2);
                        expect(tmp[0].constructor).toEqual(Filter);
                        expect(tmp[0].property).toEqual('name');
                        expect(tmp[0].multiValued).toBeFalsy();
                        expect(tmp[1].constructor).toEqual(Filter);
                        expect(tmp[1].property).toEqual('owner');
                        expect(tmp[1].multiValued).toBeTruthy();
                    });

                    it('should send requesteeId if specified', function () {
                        var requesteeUrl = url + '?identityId=12345&searchType=Keyword';
                        http.expectGET(requesteeUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessFilters(url, '12345');
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });
                });

                describe('getAccessItemFilters()', function () {
                    var url = '/identityiq/ui/rest/requestAccess/accessItems/filters',
                        returnedPromise;

                    beforeEach(function () {
                        spyOn(accessRequestFilterService, 'getAccessFilters').and.callThrough();
                    });

                    it('should call through to getAccessFilters with correct url and requesteeId', function () {
                        var requesteeUrl = url + '?identityId=12345&searchType=Keyword';
                        http.expectGET(requesteeUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessItemFilters('12345', SEARCH_TYPE_KEYWORD);
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                        expect(accessRequestFilterService.getAccessFilters).toHaveBeenCalledWith(url, '12345', SEARCH_TYPE_KEYWORD);
                    });

                    it('should call through to getAccessFilters with correct url and requesteeId and searchType', function () {
                        var requesteeUrl = url + '?identityId=12345&searchType=Population';
                        http.expectGET(requesteeUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessItemFilters('12345', SEARCH_TYPE_POPULATION);
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                        expect(accessRequestFilterService.getAccessFilters).toHaveBeenCalledWith(url, '12345', SEARCH_TYPE_POPULATION);
                    });
                });

                describe('getCurrentAccessFilters()', function () {
                    var url = '/identityiq/ui/rest/requestAccess/currentAccessItems/filters',
                        returnedPromise;

                    beforeEach(function () {
                        spyOn(accessRequestFilterService, 'getAccessFilters').and.callThrough();
                    });

                    it('should call through to getAccessFilters with correct url and requesteeId', function () {
                        var requesteeUrl = url + '?identityId=12345&searchType=Keyword';
                        http.expectGET(requesteeUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getCurrentAccessFilters('12345');
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                        expect(accessRequestFilterService.getAccessFilters).toHaveBeenCalledWith(url, '12345');
                    });
                });

                describe('getAccessFilterValues()', function () {

                    var url = '/identityiq/ui/rest/requestAccess/accessItems/filterValues' + '?filterEntitlementApplication=Active_Directory',
                        returnedPromise;

                    it('should call http service', function () {
                        http.expectGET(url).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessFilterValues({
                            filterEntitlementApplication: 'Active_Directory'
                        });
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });

                    it('should have the returned value', function () {
                        var values;
                        http.expectGET(url).respond(200, {
                            applicationIds: new FilterValue({
                                value: {
                                    id: '1234',
                                    name: 'Active_Directory',
                                    displayName: 'Active Directory'
                                }
                            })
                        });
                        returnedPromise = accessRequestFilterService.getAccessFilterValues({
                            filterEntitlementApplication: 'Active_Directory'
                        });
                        returnedPromise.then(function (response) {
                            values = response;
                        });
                        http.flush();
                        expect(values.applicationIds instanceof FilterValue).toEqual(true);
                        expect(values.applicationIds.value.id).toEqual('1234');
                    });

                    it('should send requesteeId if specified', function () {
                        var requesteeUrl = url + '&identityId=12345';
                        http.expectGET(requesteeUrl).respond(200, '');
                        returnedPromise = accessRequestFilterService.getAccessFilterValues({
                            filterEntitlementApplication: 'Active_Directory'
                        }, '12345');
                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });

                    it('should set searchType param when searchType is specified', function () {
                        var searchTypeUrl = url + '&identityId=12345&searchType=POPULATION';

                        http.expectGET(searchTypeUrl).respond(200, '');

                        returnedPromise = accessRequestFilterService.getAccessFilterValues({
                            filterEntitlementApplication: 'Active_Directory'
                        }, '12345', 'POPULATION');

                        http.flush();
                        expect(returnedPromise).toBeDefined();
                        expect(returnedPromise.then).toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUztJQUNqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw4QkFBOEIsWUFBVztnQkFDOUMsSUFBSSxNQUFNLDRCQUE0QixRQUFRLHFCQUFxQix3QkFBd0I7O2dCQUUzRixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLGNBQWMsOEJBQThCLFVBQVUsdUJBQ3RELDBCQUEwQixlQUFlO29CQUNoRSxPQUFPO29CQUNQLDZCQUE2QjtvQkFDN0IsU0FBUztvQkFDVCxzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsY0FBYzs7O2dCQUdsQixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUdULFNBQVMsd0JBQXdCLFlBQVc7O29CQUV4QyxJQUFJLHFCQUFxQjt3QkFDakI7O29CQUVSLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDLEtBQUssVUFBVSxvQkFBb0IsUUFBUSxLQUFLO3dCQUNoRCxrQkFBa0IsMkJBQTJCO3dCQUM3QyxLQUFLO3dCQUNMLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLGdCQUFnQixNQUFNOzs7b0JBR2pDLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLElBQUk7d0JBQ0osS0FBSyxVQUFVLG9CQUNYLFFBQVEsS0FBSyxDQUFDOzRCQUNWLFVBQVU7NEJBQ1YsYUFBYTsyQkFFakI7NEJBQ0ksVUFBVTs0QkFDVixhQUFhOzt3QkFFckIsa0JBQWtCLDJCQUEyQjt3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LEtBQUs7d0JBQ0wsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sZ0JBQWdCLE1BQU07Ozs7OztHQUt0QyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBodHRwLCBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgRmlsdGVyLCBTRUFSQ0hfVFlQRV9LRVlXT1JELCBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OLCBGaWx0ZXJWYWx1ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV8sIF9GaWx0ZXJfLCBfU0VBUkNIX1RZUEVfS0VZV09SRF8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1NFQVJDSF9UWVBFX1BPUFVMQVRJT05fLCBfRmlsdGVyVmFsdWVfKSB7XG4gICAgICAgIGh0dHAgPSAkaHR0cEJhY2tlbmQ7XG4gICAgICAgIGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlXztcbiAgICAgICAgRmlsdGVyID0gX0ZpbHRlcl87XG4gICAgICAgIFNFQVJDSF9UWVBFX0tFWVdPUkQgPSBfU0VBUkNIX1RZUEVfS0VZV09SRF87XG4gICAgICAgIFNFQVJDSF9UWVBFX1BPUFVMQVRJT04gPSBfU0VBUkNIX1RZUEVfUE9QVUxBVElPTl87XG4gICAgICAgIEZpbHRlclZhbHVlID0gX0ZpbHRlclZhbHVlXztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eUZpbHRlcnMoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBpZGVudGl0eUZpbHRlcnNVcmwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9yZXF1ZXN0QWNjZXNzL2lkZW50aXRpZXMvZmlsdGVycycsXG4gICAgICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBodHRwIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGlkZW50aXR5RmlsdGVyc1VybCkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldElkZW50aXR5RmlsdGVycygpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJldHVybmVkUHJvbWlzZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UudGhlbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSByZXR1cm5lZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRtcDtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGlkZW50aXR5RmlsdGVyc1VybCkuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIFt7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ21hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aVZhbHVlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldElkZW50aXR5RmlsdGVycygpO1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlLnRoZW4oZnVuY3Rpb24oZmlsdGVycykge1xuICAgICAgICAgICAgICAgIHRtcCA9IGZpbHRlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXAubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcFswXS5jb25zdHJ1Y3RvcikudG9FcXVhbChGaWx0ZXIpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcFswXS5wcm9wZXJ0eSkudG9FcXVhbCgnbmFtZScpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcFswXS5tdWx0aVZhbHVlZCkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QodG1wWzFdLmNvbnN0cnVjdG9yKS50b0VxdWFsKEZpbHRlcik7XG4gICAgICAgICAgICBleHBlY3QodG1wWzFdLnByb3BlcnR5KS50b0VxdWFsKCdtYW5hZ2VyJyk7XG4gICAgICAgICAgICBleHBlY3QodG1wWzFdLm11bHRpVmFsdWVkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFjY2Vzc0ZpbHRlcnMoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBleHBlY3RlZFVybCA9ICcvaWRlbnRpdHlpcS93aGF0ZXZlcj9zZWFyY2hUeXBlPUtleXdvcmQnLFxuICAgICAgICAgICAgdXJsID0gJy9pZGVudGl0eWlxL3doYXRldmVyJyxcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgaHR0cCBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChleHBlY3RlZFVybCkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlcnModXJsKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlLnRoZW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB0aGUgcmV0dXJuZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0bXA7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChleHBlY3RlZFVybCkuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIFt7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpVmFsdWVkOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ293bmVyJyxcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlWYWx1ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZS5nZXRBY2Nlc3NGaWx0ZXJzKHVybCk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UudGhlbihmdW5jdGlvbihmaWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gZmlsdGVycztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QodG1wWzBdLmNvbnN0cnVjdG9yKS50b0VxdWFsKEZpbHRlcik7XG4gICAgICAgICAgICBleHBlY3QodG1wWzBdLnByb3BlcnR5KS50b0VxdWFsKCduYW1lJyk7XG4gICAgICAgICAgICBleHBlY3QodG1wWzBdLm11bHRpVmFsdWVkKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXBbMV0uY29uc3RydWN0b3IpLnRvRXF1YWwoRmlsdGVyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0bXBbMV0ucHJvcGVydHkpLnRvRXF1YWwoJ293bmVyJyk7XG4gICAgICAgICAgICBleHBlY3QodG1wWzFdLm11bHRpVmFsdWVkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2VuZCByZXF1ZXN0ZWVJZCBpZiBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ZWVVcmwgPSB1cmwgKyAnP2lkZW50aXR5SWQ9MTIzNDUmc2VhcmNoVHlwZT1LZXl3b3JkJztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHJlcXVlc3RlZVVybCkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlcnModXJsLCAnMTIzNDUnKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlLnRoZW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFjY2Vzc0l0ZW1GaWx0ZXJzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVybCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L3JlcXVlc3RBY2Nlc3MvYWNjZXNzSXRlbXMvZmlsdGVycycsXG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLCAnZ2V0QWNjZXNzRmlsdGVycycpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBnZXRBY2Nlc3NGaWx0ZXJzIHdpdGggY29ycmVjdCB1cmwgYW5kIHJlcXVlc3RlZUlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdGVlVXJsID0gdXJsICsgJz9pZGVudGl0eUlkPTEyMzQ1JnNlYXJjaFR5cGU9S2V5d29yZCc7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChyZXF1ZXN0ZWVVcmwpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZS5nZXRBY2Nlc3NJdGVtRmlsdGVycygnMTIzNDUnLCBTRUFSQ0hfVFlQRV9LRVlXT1JEKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlLnRoZW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UuZ2V0QWNjZXNzRmlsdGVycykudG9IYXZlQmVlbkNhbGxlZFdpdGgodXJsLCAnMTIzNDUnLCBTRUFSQ0hfVFlQRV9LRVlXT1JEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gZ2V0QWNjZXNzRmlsdGVycyB3aXRoIGNvcnJlY3QgdXJsIGFuZCByZXF1ZXN0ZWVJZCBhbmQgc2VhcmNoVHlwZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RlZVVybCA9IHVybCArICc/aWRlbnRpdHlJZD0xMjM0NSZzZWFyY2hUeXBlPVBvcHVsYXRpb24nO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQocmVxdWVzdGVlVXJsKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlID0gYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UuZ2V0QWNjZXNzSXRlbUZpbHRlcnMoJzEyMzQ1JywgU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJldHVybmVkUHJvbWlzZS50aGVuKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVybCwgJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q3VycmVudEFjY2Vzc0ZpbHRlcnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvcmVxdWVzdEFjY2Vzcy9jdXJyZW50QWNjZXNzSXRlbXMvZmlsdGVycycsXG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLCAnZ2V0QWNjZXNzRmlsdGVycycpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBnZXRBY2Nlc3NGaWx0ZXJzIHdpdGggY29ycmVjdCB1cmwgYW5kIHJlcXVlc3RlZUlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdGVlVXJsID0gdXJsICsgJz9pZGVudGl0eUlkPTEyMzQ1JnNlYXJjaFR5cGU9S2V5d29yZCc7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChyZXF1ZXN0ZWVVcmwpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZS5nZXRDdXJyZW50QWNjZXNzRmlsdGVycygnMTIzNDUnKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlLnRoZW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UuZ2V0QWNjZXNzRmlsdGVycykudG9IYXZlQmVlbkNhbGxlZFdpdGgodXJsLCAnMTIzNDUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0QWNjZXNzRmlsdGVyVmFsdWVzKCknLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgdXJsID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvcmVxdWVzdEFjY2Vzcy9hY2Nlc3NJdGVtcy9maWx0ZXJWYWx1ZXMnICtcbiAgICAgICAgICAgICAgICAnP2ZpbHRlckVudGl0bGVtZW50QXBwbGljYXRpb249QWN0aXZlX0RpcmVjdG9yeScsXG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2U7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGh0dHAgc2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlID0gYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UuZ2V0QWNjZXNzRmlsdGVyVmFsdWVzKHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJFbnRpdGxlbWVudEFwcGxpY2F0aW9uIDogJ0FjdGl2ZV9EaXJlY3RvcnknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlLnRoZW4pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB0aGUgcmV0dXJuZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXM7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uSWRzOiBuZXcgRmlsdGVyVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdBY3RpdmVfRGlyZWN0b3J5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FjdGl2ZSBEaXJlY3RvcnknXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZS5nZXRBY2Nlc3NGaWx0ZXJWYWx1ZXMoe1xuICAgICAgICAgICAgICAgIGZpbHRlckVudGl0bGVtZW50QXBwbGljYXRpb24gOiAnQWN0aXZlX0RpcmVjdG9yeSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHZhbHVlcy5hcHBsaWNhdGlvbklkcyBpbnN0YW5jZW9mIEZpbHRlclZhbHVlKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHZhbHVlcy5hcHBsaWNhdGlvbklkcy52YWx1ZS5pZCkudG9FcXVhbCgnMTIzNCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNlbmQgcmVxdWVzdGVlSWQgaWYgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdGVlVXJsID0gdXJsICsgJyZpZGVudGl0eUlkPTEyMzQ1JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHJlcXVlc3RlZVVybCkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlclZhbHVlcyh7XG4gICAgICAgICAgICAgICAgZmlsdGVyRW50aXRsZW1lbnRBcHBsaWNhdGlvbiA6ICdBY3RpdmVfRGlyZWN0b3J5J1xuICAgICAgICAgICAgfSwgJzEyMzQ1Jyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmV0dXJuZWRQcm9taXNlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJldHVybmVkUHJvbWlzZS50aGVuKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBzZWFyY2hUeXBlIHBhcmFtIHdoZW4gc2VhcmNoVHlwZSBpcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hUeXBlVXJsID0gdXJsICsgJyZpZGVudGl0eUlkPTEyMzQ1JnNlYXJjaFR5cGU9UE9QVUxBVElPTic7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHNlYXJjaFR5cGVVcmwpLnJlc3BvbmQoMjAwLCAnJyk7XG5cbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlclZhbHVlcyh7XG4gICAgICAgICAgICAgICAgZmlsdGVyRW50aXRsZW1lbnRBcHBsaWNhdGlvbiA6ICdBY3RpdmVfRGlyZWN0b3J5J1xuICAgICAgICAgICAgfSwgJzEyMzQ1JywgJ1BPUFVMQVRJT04nKTtcblxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJldHVybmVkUHJvbWlzZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXR1cm5lZFByb21pc2UudGhlbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
