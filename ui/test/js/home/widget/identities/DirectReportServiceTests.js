System.register(['test/js/TestInitializer', 'home/widget/identities/IdentitiesWidgetModule'], function (_export) {
    'use strict';

    var identitiesWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetIdentitiesIdentitiesWidgetModule) {
            identitiesWidgetModule = _homeWidgetIdentitiesIdentitiesWidgetModule['default'];
        }],
        execute: function () {

            describe('DirectReportService', function () {
                var directReportService,
                    $httpBackend,
                    DirectReport,
                    data = {
                    count: 2,
                    objects: [{
                        id: '123',
                        name: '123guy',
                        displayName: '123 guy',
                        actions: ['321']
                    }, {
                        id: '456',
                        name: '456guy',
                        displayName: '456 guy',
                        actions: ['654']
                    }]
                };

                beforeEach(module(identitiesWidgetModule));

                beforeEach(inject(function (_directReportService_, _DirectReport_, _$httpBackend_) {
                    directReportService = _directReportService_;
                    DirectReport = _DirectReport_;
                    $httpBackend = _$httpBackend_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getDirectReports()', function () {
                    var BASE_URL = '/ui/rest/identities/widgets/directReports',
                        QUERY_URL = BASE_URL + '?limit=10&query=blah&start=0',
                        PAGING_URL = BASE_URL + '?limit=10&start=0';

                    it('calls REST endpoint', function () {
                        $httpBackend.expectGET(PAGING_URL).respond(200, data);
                        directReportService.getDirectReports(null, 0, 10);
                        $httpBackend.flush();
                    });

                    it('sends the query parameter if the search term is specified', function () {
                        $httpBackend.expectGET(QUERY_URL).respond(200, data);
                        directReportService.getDirectReports('blah', 0, 10);
                        $httpBackend.flush();
                    });

                    it('returns a ListResult with DirectReports', function () {
                        var reportsPromise, reports;

                        $httpBackend.expectGET(PAGING_URL).respond(200, data);
                        reportsPromise = directReportService.getDirectReports(null, 0, 10).then(function (response) {
                            reports = response;
                        });
                        $httpBackend.flush();

                        expect(reports).toBeDefined();
                        expect(reports.count).toEqual(2);
                        expect(reports.objects.length).toEqual(2);

                        expect(reports.objects[0] instanceof DirectReport).toEqual(true);
                        expect(reports.objects[0].id).toEqual(data.objects[0].id);
                        expect(reports.objects[0].name).toEqual(data.objects[0].name);
                        expect(reports.objects[0].displayName).toEqual(data.objects[0].displayName);
                        expect(reports.objects[0].actions).toEqual(data.objects[0].actions);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2lkZW50aXRpZXMvRGlyZWN0UmVwb3J0U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrREFBa0QsVUFBVSxTQUFTO0lBQWpIOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSw2Q0FBNkM7WUFDbkcseUJBQXlCLDRDQUE0Qzs7UUFFekUsU0FBUyxZQUFZOztZQUg3QixTQUFTLHVCQUF1QixZQUFXO2dCQUN2QyxJQUFJO29CQUFxQjtvQkFBYztvQkFDbkMsT0FBTztvQkFDSCxPQUFPO29CQUNQLFNBQVMsQ0FBQzt3QkFDTixJQUFJO3dCQUNKLE1BQU07d0JBQ04sYUFBYTt3QkFDYixTQUFTLENBQUU7dUJBQ1o7d0JBQ0MsSUFBSTt3QkFDSixNQUFNO3dCQUNOLGFBQWE7d0JBQ2IsU0FBUyxDQUFFOzs7O2dCQUl2QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx1QkFBdUIsZ0JBQWdCLGdCQUFnQjtvQkFDOUUsc0JBQXNCO29CQUN0QixlQUFlO29CQUNmLGVBQWU7OztnQkFHbkIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxzQkFBc0IsWUFBVztvQkFDdEMsSUFBSSxXQUFXO3dCQUNYLFlBQVksV0FBVzt3QkFDdkIsYUFBYSxXQUFXOztvQkFFNUIsR0FBRyx1QkFBdUIsWUFBVzt3QkFDakMsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLO3dCQUNoRCxvQkFBb0IsaUJBQWlCLE1BQU0sR0FBRzt3QkFDOUMsYUFBYTs7O29CQUdqQixHQUFHLDZEQUE2RCxZQUFXO3dCQUN2RSxhQUFhLFVBQVUsV0FBVyxRQUFRLEtBQUs7d0JBQy9DLG9CQUFvQixpQkFBaUIsUUFBUSxHQUFHO3dCQUNoRCxhQUFhOzs7b0JBR2pCLEdBQUcsMkNBQTJDLFlBQVc7d0JBQ3JELElBQUksZ0JBQWdCOzt3QkFFcEIsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLO3dCQUNoRCxpQkFBaUIsb0JBQW9CLGlCQUFpQixNQUFNLEdBQUcsSUFBSSxLQUFLLFVBQVMsVUFBVTs0QkFDdkYsVUFBVTs7d0JBRWQsYUFBYTs7d0JBRWIsT0FBTyxTQUFTO3dCQUNoQixPQUFPLFFBQVEsT0FBTyxRQUFRO3dCQUM5QixPQUFPLFFBQVEsUUFBUSxRQUFRLFFBQVE7O3dCQUV2QyxPQUFPLFFBQVEsUUFBUSxjQUFjLGNBQWMsUUFBUTt3QkFDM0QsT0FBTyxRQUFRLFFBQVEsR0FBRyxJQUFJLFFBQVEsS0FBSyxRQUFRLEdBQUc7d0JBQ3RELE9BQU8sUUFBUSxRQUFRLEdBQUcsTUFBTSxRQUFRLEtBQUssUUFBUSxHQUFHO3dCQUN4RCxPQUFPLFFBQVEsUUFBUSxHQUFHLGFBQWEsUUFBUSxLQUFLLFFBQVEsR0FBRzt3QkFDL0QsT0FBTyxRQUFRLFFBQVEsR0FBRyxTQUFTLFFBQVEsS0FBSyxRQUFRLEdBQUc7Ozs7OztHQWFwRSIsImZpbGUiOiJob21lL3dpZGdldC9pZGVudGl0aWVzL0RpcmVjdFJlcG9ydFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdGllc1dpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9pZGVudGl0aWVzL0lkZW50aXRpZXNXaWRnZXRNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0RpcmVjdFJlcG9ydFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBkaXJlY3RSZXBvcnRTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsIERpcmVjdFJlcG9ydCxcclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgb2JqZWN0czogW3tcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICcxMjNndXknLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICcxMjMgZ3V5JyxcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsgJzMyMScgXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzQ1NicsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnNDU2Z3V5JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnNDU2IGd1eScsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBbICc2NTQnIF1cclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXRpZXNXaWRnZXRNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZGlyZWN0UmVwb3J0U2VydmljZV8sIF9EaXJlY3RSZXBvcnRfLCBfJGh0dHBCYWNrZW5kXykge1xyXG4gICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UgPSBfZGlyZWN0UmVwb3J0U2VydmljZV87XHJcbiAgICAgICAgRGlyZWN0UmVwb3J0ID0gX0RpcmVjdFJlcG9ydF87XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcclxuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXREaXJlY3RSZXBvcnRzKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgQkFTRV9VUkwgPSAnL3VpL3Jlc3QvaWRlbnRpdGllcy93aWRnZXRzL2RpcmVjdFJlcG9ydHMnLFxyXG4gICAgICAgICAgICBRVUVSWV9VUkwgPSBCQVNFX1VSTCArICc/bGltaXQ9MTAmcXVlcnk9YmxhaCZzdGFydD0wJyxcclxuICAgICAgICAgICAgUEFHSU5HX1VSTCA9IEJBU0VfVVJMICsgJz9saW1pdD0xMCZzdGFydD0wJztcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIFJFU1QgZW5kcG9pbnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChQQUdJTkdfVVJMKS5yZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cyhudWxsLCAwLCAxMCk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2VuZHMgdGhlIHF1ZXJ5IHBhcmFtZXRlciBpZiB0aGUgc2VhcmNoIHRlcm0gaXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoUVVFUllfVVJMKS5yZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIGRpcmVjdFJlcG9ydFNlcnZpY2UuZ2V0RGlyZWN0UmVwb3J0cygnYmxhaCcsIDAsIDEwKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgTGlzdFJlc3VsdCB3aXRoIERpcmVjdFJlcG9ydHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlcG9ydHNQcm9taXNlLCByZXBvcnRzO1xyXG5cclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChQQUdJTkdfVVJMKS5yZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIHJlcG9ydHNQcm9taXNlID0gZGlyZWN0UmVwb3J0U2VydmljZS5nZXREaXJlY3RSZXBvcnRzKG51bGwsIDAsIDEwKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRzID0gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChyZXBvcnRzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVwb3J0cy5jb3VudCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcG9ydHMub2JqZWN0cy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QocmVwb3J0cy5vYmplY3RzWzBdIGluc3RhbmNlb2YgRGlyZWN0UmVwb3J0KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVwb3J0cy5vYmplY3RzWzBdLmlkKS50b0VxdWFsKGRhdGEub2JqZWN0c1swXS5pZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXBvcnRzLm9iamVjdHNbMF0ubmFtZSkudG9FcXVhbChkYXRhLm9iamVjdHNbMF0ubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXBvcnRzLm9iamVjdHNbMF0uZGlzcGxheU5hbWUpLnRvRXF1YWwoZGF0YS5vYmplY3RzWzBdLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcG9ydHMub2JqZWN0c1swXS5hY3Rpb25zKS50b0VxdWFsKGRhdGEub2JqZWN0c1swXS5hY3Rpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
