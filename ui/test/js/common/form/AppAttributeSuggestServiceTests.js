System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var formModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('AppAttributeSuggestService', function () {
                var http,
                    attributeSuggestService,
                    testService,
                    baseURL = SailPoint.CONTEXT_PATH + '/ui/rest/suggest/applications';

                beforeEach(module(testModule, formModule));

                beforeEach(inject(function ($httpBackend, _appAttributeSuggestService_, _testService_) {
                    http = $httpBackend;
                    attributeSuggestService = _appAttributeSuggestService_;
                    testService = _testService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getAttributes', function () {

                    var limit = 10,
                        query = 'jo',
                        applications;

                    beforeEach(function () {
                        applications = [];
                    });

                    /**
                     * Create the URL for the attribute suggest resource.
                     */
                    var url = function (query, limit, applications, extraParams) {
                        var url = baseURL + '/attributes?',
                            sep = '';
                        if (applications) {
                            angular.forEach(applications, function (application) {
                                url += sep + 'applications=' + application.id;
                                sep = '&';
                            });
                        }
                        if (angular.isDefined(extraParams)) {
                            url += sep + 'extraParams=' + testService.encodeUriQuery(angular.toJson(extraParams));
                            sep = '&';
                        }
                        if (limit) {
                            url += sep + 'limit=' + limit;
                            sep = '&';
                        }
                        if (angular.isDefined(query) && query !== null) {
                            query = query.trim();
                            url += sep + 'query=' + query;
                            sep = '&';
                        }
                        url += sep + 'start=0';
                        return url;
                    };

                    it('should add limt and query to request', function () {
                        http.expectGET(url(query, limit)).respond(200, '');
                        attributeSuggestService.getAttributes(query, limit);
                        http.flush();
                    });

                    it('should allow a null limit', function () {
                        http.expectGET(url(query, null)).respond(200, '');
                        attributeSuggestService.getAttributes(query, null);
                        http.flush();
                    });

                    it('allows a null query', function () {
                        http.expectGET(url(null, limit)).respond(200, '');
                        attributeSuggestService.getAttributes(null, limit);
                        http.flush();
                    });

                    it('allows an empty query', function () {
                        http.expectGET(url('', limit)).respond(200, '');
                        attributeSuggestService.getAttributes('', limit);
                        http.flush();
                    });

                    it('should turn a whitespace-only query into null', function () {
                        http.expectGET(url('', limit)).respond(200, '');
                        attributeSuggestService.getAttributes(' ', limit);
                        http.flush();
                    });

                    it('should add parmeter for single application', function () {
                        applications.push({ id: '001' });
                        http.expectGET(url(query, limit, applications)).respond(200, '');
                        attributeSuggestService.getAttributes(query, limit, applications);
                        http.flush();
                    });

                    it('should add parmeter for multiple applications', function () {
                        applications.push({ id: '001' }, { id: '002' });
                        http.expectGET(url(query, limit, applications)).respond(200, '');
                        attributeSuggestService.getAttributes(query, limit, applications);
                        http.flush();
                    });

                    it('should add parameter for extraParams', function () {
                        var extraParams = {
                            'this': 'that'
                        };

                        http.expectGET(url(query, limit, applications, extraParams)).respond(200, '');
                        attributeSuggestService.getAttributes(query, limit, applications, 0, extraParams);
                        http.flush();
                    });

                    it('should return attributes', function () {
                        var attributes;
                        http.expectGET(url(query, limit)).respond(200, {
                            objects: ['a thing', 'another thing'],
                            count: 0
                        });

                        attributeSuggestService.getAttributes(query, limit).then(function (data) {
                            attributes = data;
                        });
                        http.flush();

                        expect(attributes.length).toEqual(2);
                    });
                });

                describe('getApplicationAttributeValues', function () {

                    it('should return application attribute values', function () {
                        var application = 'MyApp',
                            attribute = 'group',
                            isPermission = false,
                            start = 0,
                            limit = 5,
                            query = 'va',
                            url = baseURL + '/attributes/values?application=' + application + '&attribute=' + attribute + '&isPermission=' + isPermission + '&limit=5&query=' + query + '&start=0',
                            values = {
                            count: 4,
                            objects: ['val1', 'val2', 'val3', 'val4']
                        },
                            promise = undefined;

                        http.expectGET(url).respond(200, values);
                        promise = attributeSuggestService.getApplicationAttributeValues(application, attribute, isPermission, start, limit, query);
                        http.flush();
                        promise.then(function (data) {
                            expect(data.length).toEqual(values.count);
                            expect(data[0]).toEqual(values.objects[0]);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0FwcEF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTO0lBQzVHOztJQUVBLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7V0FDcEMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyw4QkFBOEIsWUFBVztnQkFDOUMsSUFBSTtvQkFBTTtvQkFBeUI7b0JBQy9CLFVBQVUsVUFBVSxlQUFlOztnQkFFdkMsV0FBVyxPQUFPLFlBQVk7O2dCQUU5QixXQUFXLE9BQU8sVUFBUyxjQUFjLDhCQUE4QixlQUFlO29CQUNsRixPQUFPO29CQUNQLDBCQUEwQjtvQkFDMUIsY0FBYzs7O2dCQUdsQixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUlULFNBQVMsaUJBQWlCLFlBQVc7O29CQUVqQyxJQUFJLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUjs7b0JBRUosV0FBVyxZQUFXO3dCQUNsQixlQUFlOzs7Ozs7b0JBTW5CLElBQUksTUFBTSxVQUFTLE9BQU8sT0FBTyxjQUFjLGFBQWE7d0JBQ3hELElBQUksTUFBTSxVQUFVOzRCQUNoQixNQUFNO3dCQUNWLElBQUcsY0FBYzs0QkFDYixRQUFRLFFBQVEsY0FBYyxVQUFTLGFBQWE7Z0NBQ2hELE9BQU8sTUFBTSxrQkFBa0IsWUFBWTtnQ0FDM0MsTUFBTTs7O3dCQUdkLElBQUksUUFBUSxVQUFVLGNBQWU7NEJBQ2pDLE9BQU8sTUFBTSxpQkFBa0IsWUFBWSxlQUFlLFFBQVEsT0FBTzs0QkFDekUsTUFBTTs7d0JBRVYsSUFBSSxPQUFPOzRCQUNQLE9BQU8sTUFBTSxXQUFXOzRCQUN4QixNQUFN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ZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaHR0cCwgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UsIHRlc3RTZXJ2aWNlLFxuICAgICAgICBiYXNlVVJMID0gU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9zdWdnZXN0L2FwcGxpY2F0aW9ucyc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBmb3JtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF9hcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZV8sIF90ZXN0U2VydmljZV8pIHtcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UgPSBfYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2VfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXRBdHRyaWJ1dGVzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGxpbWl0ID0gMTAsXG4gICAgICAgICAgICBxdWVyeSA9ICdqbycsXG4gICAgICAgICAgICBhcHBsaWNhdGlvbnM7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9ucyA9IFtdO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBVUkwgZm9yIHRoZSBhdHRyaWJ1dGUgc3VnZ2VzdCByZXNvdXJjZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhciB1cmwgPSBmdW5jdGlvbihxdWVyeSwgbGltaXQsIGFwcGxpY2F0aW9ucywgZXh0cmFQYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciB1cmwgPSBiYXNlVVJMICsgJy9hdHRyaWJ1dGVzPycsXG4gICAgICAgICAgICAgICAgc2VwID0gJyc7XG4gICAgICAgICAgICBpZihhcHBsaWNhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goYXBwbGljYXRpb25zLCBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB1cmwgKz0gc2VwICsgJ2FwcGxpY2F0aW9ucz0nICsgYXBwbGljYXRpb24uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHNlcCA9ICcmJztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChleHRyYVBhcmFtcykpICB7XG4gICAgICAgICAgICAgICAgdXJsICs9IHNlcCArICdleHRyYVBhcmFtcz0nICsgIHRlc3RTZXJ2aWNlLmVuY29kZVVyaVF1ZXJ5KGFuZ3VsYXIudG9Kc29uKGV4dHJhUGFyYW1zKSk7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IHNlcCArICdsaW1pdD0nICsgbGltaXQ7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHF1ZXJ5KSAmJiBxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgICAgICAgICAgICAgIHVybCArPSBzZXAgKyAncXVlcnk9JyArIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIHNlcCA9ICcmJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVybCArPSBzZXAgKyAnc3RhcnQ9MCc7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGxpbXQgYW5kIHF1ZXJ5IHRvIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChxdWVyeSwgbGltaXQpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcyhxdWVyeSwgbGltaXQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IGEgbnVsbCBsaW1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsKHF1ZXJ5LCBudWxsKSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlLmdldEF0dHJpYnV0ZXMocXVlcnksIG51bGwpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWxsb3dzIGEgbnVsbCBxdWVyeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsKG51bGwsIGxpbWl0KSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlLmdldEF0dHJpYnV0ZXMobnVsbCwgbGltaXQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWxsb3dzIGFuIGVtcHR5IHF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwoJycsIGxpbWl0KSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZVN1Z2dlc3RTZXJ2aWNlLmdldEF0dHJpYnV0ZXMoJycsIGxpbWl0KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0dXJuIGEgd2hpdGVzcGFjZS1vbmx5IHF1ZXJ5IGludG8gbnVsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsKCcnLCBsaW1pdCkpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVTdWdnZXN0U2VydmljZS5nZXRBdHRyaWJ1dGVzKCcgJywgbGltaXQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFkZCBwYXJtZXRlciBmb3Igc2luZ2xlIGFwcGxpY2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbnMucHVzaCh7aWQ6ICcwMDEnfSk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwocXVlcnksIGxpbWl0LCBhcHBsaWNhdGlvbnMpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcyhxdWVyeSwgbGltaXQsIGFwcGxpY2F0aW9ucyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIHBhcm1ldGVyIGZvciBtdWx0aXBsZSBhcHBsaWNhdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9ucy5wdXNoKHtpZDogJzAwMSd9LCB7aWQ6ICcwMDInfSk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwocXVlcnksIGxpbWl0LCBhcHBsaWNhdGlvbnMpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcyhxdWVyeSwgbGltaXQsIGFwcGxpY2F0aW9ucyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIHBhcmFtZXRlciBmb3IgZXh0cmFQYXJhbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBleHRyYVBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICB0aGlzOiAndGhhdCdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChxdWVyeSwgbGltaXQsIGFwcGxpY2F0aW9ucywgZXh0cmFQYXJhbXMpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXR0cmlidXRlcyhxdWVyeSwgbGltaXQsIGFwcGxpY2F0aW9ucywgMCwgZXh0cmFQYXJhbXMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhdHRyaWJ1dGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlcztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChxdWVyeSwgbGltaXQpKS5yZXNwb25kKDIwMCwge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsnYSB0aGluZycsICdhbm90aGVyIHRoaW5nJ10sXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhdHRyaWJ1dGVTdWdnZXN0U2VydmljZS5nZXRBdHRyaWJ1dGVzKHF1ZXJ5LCBsaW1pdCkuXG4gICAgICAgICAgICAgICAgdGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYXR0cmlidXRlcy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFwcGxpY2F0aW9uQXR0cmlidXRlVmFsdWVzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYXBwbGljYXRpb24gYXR0cmlidXRlIHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGFwcGxpY2F0aW9uID0gJ015QXBwJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZSA9ICdncm91cCcsXG4gICAgICAgICAgICBpc1Blcm1pc3Npb24gPSBmYWxzZSxcbiAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgIGxpbWl0ID0gNSxcbiAgICAgICAgICAgIHF1ZXJ5ID0gJ3ZhJyxcbiAgICAgICAgICAgIHVybCA9IGJhc2VVUkwgKyAnL2F0dHJpYnV0ZXMvdmFsdWVzP2FwcGxpY2F0aW9uPScgKyBhcHBsaWNhdGlvbiArICcmYXR0cmlidXRlPScgKyBhdHRyaWJ1dGUgK1xuICAgICAgICAgICAgICAgICcmaXNQZXJtaXNzaW9uPScgKyBpc1Blcm1pc3Npb24gKyAnJmxpbWl0PTUmcXVlcnk9JyArIHF1ZXJ5ICsgJyZzdGFydD0wJyxcbiAgICAgICAgICAgIHZhbHVlcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudDogNCxcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbJ3ZhbDEnLCAndmFsMicsICd2YWwzJywgJ3ZhbDQnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIHZhbHVlcyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UuZ2V0QXBwbGljYXRpb25BdHRyaWJ1dGVWYWx1ZXMoXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLCBhdHRyaWJ1dGUsIGlzUGVybWlzc2lvbiwgc3RhcnQsIGxpbWl0LCBxdWVyeSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhLmxlbmd0aCkudG9FcXVhbCh2YWx1ZXMuY291bnQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhWzBdKS50b0VxdWFsKHZhbHVlcy5vYmplY3RzWzBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
