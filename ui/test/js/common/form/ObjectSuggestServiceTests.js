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

            describe('ObjectSuggestService', function () {
                var http, objectSuggestService, testService;

                beforeEach(module(testModule, formModule));

                beforeEach(inject(function ($httpBackend, _objectSuggestService_, _testService_) {
                    http = $httpBackend;
                    objectSuggestService = _objectSuggestService_;
                    testService = _testService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getObjects', function () {
                    var limit = 10,
                        query = 'jo',
                        clazz = 'application',
                        extraParams = { workgroup: 'testWorkgroup' };

                    /**
                     * Create the URL for the application suggest resource.
                     */
                    var url = function (clazz, query, limit, start, extraParams, filterString) {
                        var url = SailPoint.CONTEXT_PATH + '/ui/rest/suggest/object/' + clazz + '?',
                            sep = '';
                        if (extraParams) {
                            var escapedExtraParams = testService.encodeUriQuery(angular.toJson(extraParams));
                            url += sep + 'extraParams=' + escapedExtraParams;
                            sep = '&';
                        }
                        if (filterString) {
                            url += sep + 'filterString=' + filterString;
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
                        if (start >= 0) {
                            url += sep + 'start=' + start;
                            sep = '&';
                        }
                        return url;
                    };

                    it('applies passed parameters to ajax call', function () {
                        http.expectGET(url(clazz, query, limit, 0, extraParams)).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, limit, 0, extraParams);
                        http.flush();
                    });

                    it('should add limit and query to request', function () {
                        http.expectGET(url(clazz, query, limit)).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, limit);
                        http.flush();
                    });

                    it('should allow a null limit', function () {
                        http.expectGET(url(clazz, query, null)).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, null);
                        http.flush();
                    });

                    it('allows a null query', function () {
                        http.expectGET(url(clazz, null, limit)).respond(200, '');
                        objectSuggestService.getObjects(clazz, null, limit);
                        http.flush();
                    });

                    it('allows an empty query', function () {
                        http.expectGET(url(clazz, '', limit)).respond(200, '');
                        objectSuggestService.getObjects(clazz, '', limit);
                        http.flush();
                    });

                    it('should turn a whitespace-only query into null', function () {
                        http.expectGET(url(clazz, '', limit)).respond(200, '');
                        objectSuggestService.getObjects(clazz, ' ', limit);
                        http.flush();
                    });

                    it('allows a null extraParams', function () {
                        http.expectGET(url(clazz, query, limit, 0, null)).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, limit, 0, null);
                        http.flush();
                    });

                    it('should return applications', function () {
                        var applications;
                        http.expectGET(url(clazz, query, limit)).respond(200, {
                            objects: [],
                            count: 0
                        });

                        objectSuggestService.getObjects(clazz, query, limit).then(function (data) {
                            applications = data.objects;
                        });
                        http.flush();

                        expect(applications.length).toEqual(0);
                    });

                    it('gets the filterString off the extraParams if defined', function () {
                        var tempExtraParams = angular.copy(extraParams);
                        tempExtraParams.filterString = 'someFilterString';
                        http.expectGET(url(clazz, query, limit, 0, extraParams, 'someFilterString')).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, limit, 0, tempExtraParams);
                        http.flush();
                    });

                    it('uses the passed in filter string if defined', function () {
                        var tempExtraParams = angular.copy(extraParams);
                        tempExtraParams.filterString = 'someFilterString';
                        http.expectGET(url(clazz, query, limit, 0, extraParams, 'otherFilterString')).respond(200, '');
                        objectSuggestService.getObjects(clazz, query, limit, 0, tempExtraParams, 'otherFilterString');
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL09iamVjdFN1Z2dlc3RTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTO0lBQzVHOztJQUVBLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7V0FDcEMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyx3QkFBd0IsWUFBVztnQkFDeEMsSUFBSSxNQUFNLHNCQUFzQjs7Z0JBRWhDLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsY0FBYyx3QkFBd0IsZUFBZTtvQkFDNUUsT0FBTztvQkFDUCx1QkFBdUI7b0JBQ3ZCLGNBQWM7OztnQkFHbEIsVUFBVSxZQUFXO29CQUNqQixLQUFLO29CQUNMLEtBQUs7OztnQkFJVCxTQUFTLGNBQWMsWUFBVztvQkFDOUIsSUFBSSxRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixjQUFjLEVBQUUsV0FBVzs7Ozs7b0JBSy9CLElBQUksTUFBTSxVQUFTLE9BQU8sT0FBTyxPQUFPLE9BQU8sYUFBYSxjQUFjO3dCQUN0RSxJQUFJLE1BQU0sVUFBVSxlQUFlLDZCQUE2QixRQUFROzRCQUNwRSxNQUFNO3dCQUNWLElBQUksYUFBYTs0QkFDYixJQUFJLHFCQUFxQixZQUFZLGVBQWUsUUFBUSxPQUFPOzRCQUNuRSxPQUFPLE1BQU0saUJBQWlCOzRCQUM5QixNQUFNOzt3QkFFVixJQUFJLGNBQWM7NEJBQ2QsT0FBTyxNQUFNLGtCQUFrQjs0QkFDL0IsTUFBTTs7d0JBRVYsSUFBSSxPQUFPOzRCQUNQLE9BQU8sTUFBTSxXQUFXOzRCQUN4QixNQUFNOzt3QkFFVixJQUFJLFFBQVEsVUFBVSxVQUFVLFVBQVUsTUFBTTs0QkFDNUMsUUFBUSxNQUFNOzRCQUNkLE9BQU8sTUFBTSxXQUFXOzRCQUN4QixNQUFNOzt3QkFFVixJQUFJLFNBQVMsR0FBRzs0QkFDWixPQUFPLE1BQU0sV0FBVzs0QkFDeEIsTUFBTTs7d0JBRVYsT0FBTzs7O29CQUdYLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELEtBQUssVUFBVSxJQUFJLE9BQU8sT0FBTyxPQUFPLEdBQUcsY0FDdkMsUUFBUSxLQUFLO3dCQUNqQixxQkFBcUIsV0FBVyxPQUFPLE9BQU8sT0FBTyxHQUFHO3dCQUN4RCxLQUFLOzs7b0JBR1QsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsS0FBSyxVQUFVLElBQUksT0FBTyxPQUFPLFFBQVEsUUFBUSxLQUFLO3dCQUN0RCxxQkFBcUIsV0FBVyxPQUFPLE9BQU87d0JBQzlDLEtBQUs7OztvQkFHVCxHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxLQUFLLFVBQVUsSUFBSSxPQUFPLE9BQU8sT0FBTyxRQUFRLEtBQUs7d0JBQ3JELHFCQUFxQixXQUFXLE9BQU8sT0FBTzt3QkFDOUMsS0FBSzs7O29CQUdULEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLEtBQUssVUFBVSxJQUFJLE9BQU8sTUFBTSxRQUFRLFFBQVEsS0FBSzt3QkFDckQscUJBQXFCLFdBQVcsT0FBTyxNQUFNO3dCQUM3QyxLQUFLOzs7b0JBR1QsR0FBRyx5QkFBeUIsWUFBVzt3QkFDbkMsS0FBSyxVQUFVLElBQUksT0FBTyxJQUFJLFFBQVEsUUFBUSxLQUFLO3dCQUNuRCxxQkFBcUIsV0FBVyxPQUFPLElBQUk7d0JBQzNDLEtBQUs7OztvQkFHVCxHQUFHLGlEQUFpRCxZQUFXO3dCQUMzRCxLQUFLLFVBQVUsSUFBSSxPQUFPLElBQUksUUFBUSxRQUFRLEtBQUs7d0JBQ25ELHFCQUFxQixXQUFXLE9BQU8sS0FBSzt3QkFDNUMsS0FBSzs7O29CQUdULEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLEtBQUssVUFBVSxJQUFJLE9BQU8sT0FBTyxPQUFPLEdBQUcsT0FBTyxRQUFRLEtBQUs7d0JBQy9ELHFCQUFxQixXQUFXLE9BQU8sT0FBTyxPQUFPLEdBQUc7d0JBQ3hELEtBQUs7OztvQkFHVCxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJO3dCQUNKLEtBQUssVUFBVSxJQUFJLE9BQU8sT0FBTyxRQUFRLFFBQVEsS0FBSzs0QkFDbEQsU0FBUzs0QkFDVCxPQUFPOzs7d0JBR1gscUJBQXFCLFdBQVcsT0FBTyxPQUFPLE9BQzFDLEtBQUssVUFBUyxNQUFNOzRCQUNoQixlQUFlLEtBQUs7O3dCQUU1QixLQUFLOzt3QkFFTCxPQUFPLGFBQWEsUUFBUSxRQUFROzs7b0JBR3hDLEdBQUcsd0RBQXdELFlBQU07d0JBQzdELElBQUksa0JBQWtCLFFBQVEsS0FBSzt3QkFDbkMsZ0JBQWdCLGVBQWU7d0JBQy9CLEtBQUssVUFBVSxJQUFJLE9BQU8sT0FBTyxPQUFPLEdBQUcsYUFBYSxxQkFBcUIsUUFBUSxLQUFLO3dCQUMxRixxQkFBcUIsV0FBVyxPQUFPLE9BQU8sT0FBTyxHQUFHO3dCQUN4RCxLQUFLOzs7b0JBR1QsR0FBRywrQ0FBK0MsWUFBTTt3QkFDcEQsSUFBSSxrQkFBa0IsUUFBUSxLQUFLO3dCQUNuQyxnQkFBZ0IsZUFBZTt3QkFDL0IsS0FBSyxVQUFVLElBQUksT0FBTyxPQUFPLE9BQU8sR0FBRyxhQUFhLHNCQUFzQixRQUFRLEtBQUs7d0JBQzNGLHFCQUFxQixXQUFXLE9BQU8sT0FBTyxPQUFPLEdBQUcsaUJBQWlCO3dCQUN6RSxLQUFLOzs7Ozs7R0FXZCIsImZpbGUiOiJjb21tb24vZm9ybS9PYmplY3RTdWdnZXN0U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdPYmplY3RTdWdnZXN0U2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBodHRwLCBvYmplY3RTdWdnZXN0U2VydmljZSwgdGVzdFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBmb3JtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF9vYmplY3RTdWdnZXN0U2VydmljZV8sIF90ZXN0U2VydmljZV8pIHtcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgb2JqZWN0U3VnZ2VzdFNlcnZpY2UgPSBfb2JqZWN0U3VnZ2VzdFNlcnZpY2VfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXRPYmplY3RzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgcXVlcnkgPSAnam8nLFxuICAgICAgICAgICAgY2xhenogPSAnYXBwbGljYXRpb24nLFxuICAgICAgICAgICAgZXh0cmFQYXJhbXMgPSB7IHdvcmtncm91cDogJ3Rlc3RXb3JrZ3JvdXAnfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBVUkwgZm9yIHRoZSBhcHBsaWNhdGlvbiBzdWdnZXN0IHJlc291cmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHVybCA9IGZ1bmN0aW9uKGNsYXp6LCBxdWVyeSwgbGltaXQsIHN0YXJ0LCBleHRyYVBhcmFtcywgZmlsdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9zdWdnZXN0L29iamVjdC8nICsgY2xhenogKyAnPycsXG4gICAgICAgICAgICAgICAgc2VwID0gJyc7XG4gICAgICAgICAgICBpZiAoZXh0cmFQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXNjYXBlZEV4dHJhUGFyYW1zID0gdGVzdFNlcnZpY2UuZW5jb2RlVXJpUXVlcnkoYW5ndWxhci50b0pzb24oZXh0cmFQYXJhbXMpKTtcbiAgICAgICAgICAgICAgICB1cmwgKz0gc2VwICsgJ2V4dHJhUGFyYW1zPScgKyBlc2NhcGVkRXh0cmFQYXJhbXM7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpbHRlclN0cmluZykge1xuICAgICAgICAgICAgICAgIHVybCArPSBzZXAgKyAnZmlsdGVyU3RyaW5nPScgKyBmaWx0ZXJTdHJpbmc7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IHNlcCArICdsaW1pdD0nICsgbGltaXQ7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHF1ZXJ5KSAmJiBxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpO1xuICAgICAgICAgICAgICAgIHVybCArPSBzZXAgKyAncXVlcnk9JyArIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIHNlcCA9ICcmJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGFydCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IHNlcCArICdzdGFydD0nICsgc3RhcnQ7XG4gICAgICAgICAgICAgICAgc2VwID0gJyYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfTtcblxuICAgICAgICBpdCgnYXBwbGllcyBwYXNzZWQgcGFyYW1ldGVycyB0byBhamF4IGNhbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgcXVlcnksIGxpbWl0LCAwLCBleHRyYVBhcmFtcykpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKGNsYXp6LCBxdWVyeSwgbGltaXQsIDAsIGV4dHJhUGFyYW1zKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgbGltaXQgYW5kIHF1ZXJ5IHRvIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgcXVlcnksIGxpbWl0KSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIG9iamVjdFN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMoY2xhenosIHF1ZXJ5LCBsaW1pdCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgYSBudWxsIGxpbWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwoY2xhenosIHF1ZXJ5LCBudWxsKSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIG9iamVjdFN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMoY2xhenosIHF1ZXJ5LCBudWxsKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FsbG93cyBhIG51bGwgcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgbnVsbCwgbGltaXQpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgb2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cyhjbGF6eiwgbnVsbCwgbGltaXQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWxsb3dzIGFuIGVtcHR5IHF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwoY2xhenosICcnLCBsaW1pdCkpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKGNsYXp6LCAnJywgbGltaXQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHR1cm4gYSB3aGl0ZXNwYWNlLW9ubHkgcXVlcnkgaW50byBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwoY2xhenosICcnLCBsaW1pdCkpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKGNsYXp6LCAnICcsIGxpbWl0KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FsbG93cyBhIG51bGwgZXh0cmFQYXJhbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgcXVlcnksIGxpbWl0LCAwLCBudWxsKSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIG9iamVjdFN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMoY2xhenosIHF1ZXJ5LCBsaW1pdCwgMCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9ucztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgcXVlcnksIGxpbWl0KSkucmVzcG9uZCgyMDAsIHtcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXSxcbiAgICAgICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG9iamVjdFN1Z2dlc3RTZXJ2aWNlLmdldE9iamVjdHMoY2xhenosIHF1ZXJ5LCBsaW1pdCkuXG4gICAgICAgICAgICAgICAgdGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9ucyA9IGRhdGEub2JqZWN0cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFwcGxpY2F0aW9ucy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRzIHRoZSBmaWx0ZXJTdHJpbmcgb2ZmIHRoZSBleHRyYVBhcmFtcyBpZiBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBFeHRyYVBhcmFtcyA9IGFuZ3VsYXIuY29weShleHRyYVBhcmFtcyk7XG4gICAgICAgICAgICB0ZW1wRXh0cmFQYXJhbXMuZmlsdGVyU3RyaW5nID0gJ3NvbWVGaWx0ZXJTdHJpbmcnO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsKGNsYXp6LCBxdWVyeSwgbGltaXQsIDAsIGV4dHJhUGFyYW1zLCAnc29tZUZpbHRlclN0cmluZycpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgb2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cyhjbGF6eiwgcXVlcnksIGxpbWl0LCAwLCB0ZW1wRXh0cmFQYXJhbXMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndXNlcyB0aGUgcGFzc2VkIGluIGZpbHRlciBzdHJpbmcgaWYgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wRXh0cmFQYXJhbXMgPSBhbmd1bGFyLmNvcHkoZXh0cmFQYXJhbXMpO1xuICAgICAgICAgICAgdGVtcEV4dHJhUGFyYW1zLmZpbHRlclN0cmluZyA9ICdzb21lRmlsdGVyU3RyaW5nJztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybChjbGF6eiwgcXVlcnksIGxpbWl0LCAwLCBleHRyYVBhcmFtcywgJ290aGVyRmlsdGVyU3RyaW5nJykpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKGNsYXp6LCBxdWVyeSwgbGltaXQsIDAsIHRlbXBFeHRyYVBhcmFtcywgJ290aGVyRmlsdGVyU3RyaW5nJyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
