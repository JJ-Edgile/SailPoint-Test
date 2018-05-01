System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the ColumnSuggestService.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('ColumnSuggestService', function () {
                var columnSuggestService, $httpBackend;

                beforeEach(module(formModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_columnSuggestService_, _$httpBackend_) {
                    columnSuggestService = _columnSuggestService_;
                    $httpBackend = _$httpBackend_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getObjects', function () {

                    it('should call out to backend to get values', function () {
                        var promise,
                            suggestUrl = '/identityiq/ui/rest/suggest/column/Identity/region?' + 'extraParams=%7B%22isLcm%22:true,%22lcmAction%22:%22Request+Access%22%7D&' + 'filterString=somefilterString&limit=5&query=Aa&start=0',
                            extraParams = {
                            suggestClass: 'Identity',
                            suggestColumn: 'region',
                            isLcm: true,
                            lcmAction: 'Request Access',
                            filterString: 'somefilterString'
                        },
                            expectedResponse = {
                            count: 1,
                            objects: [{
                                id: 'someplace'
                            }]
                        };

                        $httpBackend.expectGET(suggestUrl).respond(200, expectedResponse);

                        promise = columnSuggestService.getObjects('Aa', 0, 5, extraParams);

                        expect(promise).toBeTruthy();

                        promise.then(function (response) {
                            expect(response.count).toEqual(expectedResponse.count);
                            expect(response.objects.length).toEqual(expectedResponse.objects.length);
                        });

                        $httpBackend.flush();
                    });
                });

                describe('getExtraParams', function () {

                    it('should return the params off of the scope', function () {
                        var extraParams,
                            scope = {
                            extraParams: {
                                suggestClass: 'Identity',
                                suggestColumn: 'region'
                            }
                        };

                        extraParams = columnSuggestService.getExtraParams(scope);

                        expect(extraParams.suggestClass).toEqual(scope.extraParams.suggestClass);
                        expect(extraParams.suggestColumn).toEqual(scope.extraParams.suggestColumn);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0NvbHVtblN1Z2dlc3RTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBQTFGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLHdCQUF3QixZQUFXO2dCQUN4QyxJQUFJLHNCQUNBOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLHdCQUF3QixnQkFBZ0I7b0JBQy9ELHVCQUF1QjtvQkFDdkIsZUFBZTs7O2dCQUduQixVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLGNBQWMsWUFBVzs7b0JBRTlCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELElBQUk7NEJBQ0EsYUFBYSx3REFDVCw2RUFDQTs0QkFDSixjQUFjOzRCQUNWLGNBQWM7NEJBQ2QsZUFBZTs0QkFDZixPQUFPOzRCQUNQLFdBQVc7NEJBQ1gsY0FBYzs7NEJBRWxCLG1CQUFtQjs0QkFDZixPQUFPOzRCQUNQLFNBQVMsQ0FBQztnQ0FDTixJQUFJOzs7O3dCQUloQixhQUFhLFVBQVUsWUFBWSxRQUFRLEtBQUs7O3dCQUVoRCxVQUFVLHFCQUFxQixXQUFXLE1BQU0sR0FBRyxHQUFHOzt3QkFFdEQsT0FBTyxTQUFTOzt3QkFFaEIsUUFBUSxLQUFLLFVBQVMsVUFBVTs0QkFDNUIsT0FBTyxTQUFTLE9BQU8sUUFBUSxpQkFBaUI7NEJBQ2hELE9BQU8sU0FBUyxRQUFRLFFBQVEsUUFBUSxpQkFBaUIsUUFBUTs7O3dCQUdyRSxhQUFhOzs7O2dCQUtyQixTQUFTLGtCQUFrQixZQUFXOztvQkFFbEMsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsSUFBSTs0QkFDQSxRQUFROzRCQUNKLGFBQWE7Z0NBQ1QsY0FBYztnQ0FDZCxlQUFlOzs7O3dCQUkzQixjQUFjLHFCQUFxQixlQUFlOzt3QkFFbEQsT0FBTyxZQUFZLGNBQWMsUUFBUSxNQUFNLFlBQVk7d0JBQzNELE9BQU8sWUFBWSxlQUFlLFFBQVEsTUFBTSxZQUFZOzs7Ozs7R0FPckUiLCJmaWxlIjoiY29tbW9uL2Zvcm0vQ29sdW1uU3VnZ2VzdFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIENvbHVtblN1Z2dlc3RTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnQ29sdW1uU3VnZ2VzdFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sdW1uU3VnZ2VzdFNlcnZpY2UsXG4gICAgICAgICRodHRwQmFja2VuZDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfY29sdW1uU3VnZ2VzdFNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXykge1xuICAgICAgICBjb2x1bW5TdWdnZXN0U2VydmljZSA9IF9jb2x1bW5TdWdnZXN0U2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRPYmplY3RzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIG91dCB0byBiYWNrZW5kIHRvIGdldCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLFxuICAgICAgICAgICAgICAgIHN1Z2dlc3RVcmwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9zdWdnZXN0L2NvbHVtbi9JZGVudGl0eS9yZWdpb24/JyArXG4gICAgICAgICAgICAgICAgICAgICdleHRyYVBhcmFtcz0lN0IlMjJpc0xjbSUyMjp0cnVlLCUyMmxjbUFjdGlvbiUyMjolMjJSZXF1ZXN0K0FjY2VzcyUyMiU3RCYnICtcbiAgICAgICAgICAgICAgICAgICAgJ2ZpbHRlclN0cmluZz1zb21lZmlsdGVyU3RyaW5nJmxpbWl0PTUmcXVlcnk9QWEmc3RhcnQ9MCcsXG4gICAgICAgICAgICAgICAgZXh0cmFQYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RDbGFzczogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdENvbHVtbjogJ3JlZ2lvbicsXG4gICAgICAgICAgICAgICAgICAgIGlzTGNtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsY21BY3Rpb246ICdSZXF1ZXN0IEFjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0cmluZzogJ3NvbWVmaWx0ZXJTdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnc29tZXBsYWNlJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoc3VnZ2VzdFVybCkucmVzcG9uZCgyMDAsIGV4cGVjdGVkUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gY29sdW1uU3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cygnQWEnLCAwLCA1LCBleHRyYVBhcmFtcyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5jb3VudCkudG9FcXVhbChleHBlY3RlZFJlc3BvbnNlLmNvdW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2Uub2JqZWN0cy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRSZXNwb25zZS5vYmplY3RzLmxlbmd0aCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RXh0cmFQYXJhbXMnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFyYW1zIG9mZiBvZiB0aGUgc2NvcGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBleHRyYVBhcmFtcyxcbiAgICAgICAgICAgICAgICBzY29wZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RDbGFzczogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RDb2x1bW46ICdyZWdpb24nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBleHRyYVBhcmFtcyA9IGNvbHVtblN1Z2dlc3RTZXJ2aWNlLmdldEV4dHJhUGFyYW1zKHNjb3BlKTtcblxuICAgICAgICAgICAgZXhwZWN0KGV4dHJhUGFyYW1zLnN1Z2dlc3RDbGFzcykudG9FcXVhbChzY29wZS5leHRyYVBhcmFtcy5zdWdnZXN0Q2xhc3MpO1xuICAgICAgICAgICAgZXhwZWN0KGV4dHJhUGFyYW1zLnN1Z2dlc3RDb2x1bW4pLnRvRXF1YWwoc2NvcGUuZXh0cmFQYXJhbXMuc3VnZ2VzdENvbHVtbik7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
