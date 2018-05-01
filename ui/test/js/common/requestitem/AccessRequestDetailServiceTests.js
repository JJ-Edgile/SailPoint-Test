System.register(['test/js/TestInitializer', 'common/requestItem/RequestItemModule'], function (_export) {
    'use strict';

    var requestItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRequestItemRequestItemModule) {
            requestItemModule = _commonRequestItemRequestItemModule['default'];
        }],
        execute: function () {

            describe('AccessRequestDetailService', function () {

                var baseURL = '/identityiq/ui/rest/requestAccess/',
                    accessRequestDetailService,
                    $httpBackend;

                // Use the access request module.
                beforeEach(module(requestItemModule, function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_accessRequestDetailService_, _$httpBackend_) {
                    accessRequestDetailService = _accessRequestDetailService_;
                    $httpBackend = _$httpBackend_;
                }));

                describe('getRoleEntitlements()', function () {
                    var itemsURL = baseURL + 'accessItems/whatever/simpleEntitlements',
                        response = {
                        count: 2,
                        objects: [{}, {}]
                    },
                        promise;

                    it('should fetch the role entitlements', function () {
                        $httpBackend.expectGET(itemsURL).respond(200, response);
                        promise = accessRequestDetailService.getRoleEntitlements('whatever');
                        promise.then(function (response) {
                            expect(response.getObjects().length).toEqual(2);
                        });
                        $httpBackend.flush();
                    });

                    it('should throw when no item is provided', function () {
                        expect(function () {
                            promise = accessRequestDetailService.getRoleEntitlements();
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZXF1ZXN0aXRlbS9BY2Nlc3NSZXF1ZXN0RGV0YWlsU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsVUFBVSxTQUFTO0lBQXhHOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQzs7UUFFNUQsU0FBUyxZQUFZOztZQUg3QixTQUFTLDhCQUE4QixZQUFXOztnQkFFOUMsSUFBSSxVQUFVO29CQUNWO29CQUE0Qjs7O2dCQUdoQyxXQUFXLE9BQU8sbUJBQ2QsVUFBUyxVQUFVO29CQUNmLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHN0MsV0FBVyxPQUFPLFVBQVMsOEJBQThCLGdCQUFnQjtvQkFDckUsNkJBQTZCO29CQUM3QixlQUFlOzs7Z0JBR25CLFNBQVMseUJBQXlCLFlBQVc7b0JBQ3pDLElBQUksV0FBVyxVQUFVO3dCQUNyQixXQUFXO3dCQUNQLE9BQU87d0JBQ1AsU0FBUyxDQUFFLElBQUk7O3dCQUVuQjs7b0JBRUosR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsYUFBYSxVQUFVLFVBQVUsUUFBUSxLQUFLO3dCQUM5QyxVQUFVLDJCQUEyQixvQkFBb0I7d0JBQ3pELFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sU0FBUyxhQUFhLFFBQVEsUUFBUTs7d0JBRWpELGFBQWE7OztvQkFHakIsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsT0FBTyxZQUFXOzRCQUNkLFVBQVUsMkJBQTJCOzJCQUN0Qzs7Ozs7O0dBV1oiLCJmaWxlIjoiY29tbW9uL3JlcXVlc3RpdGVtL0FjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlcXVlc3RJdGVtTW9kdWxlIGZyb20gJ2NvbW1vbi9yZXF1ZXN0SXRlbS9SZXF1ZXN0SXRlbU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0RGV0YWlsU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9yZXF1ZXN0QWNjZXNzLycsXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlLCAkaHR0cEJhY2tlbmQ7XG5cbiAgICAvLyBVc2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZXF1ZXN0SXRlbU1vZHVsZSxcbiAgICAgICAgZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcbiAgICAgICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2FjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlXywgXyRodHRwQmFja2VuZF8pIHtcbiAgICAgICAgYWNjZXNzUmVxdWVzdERldGFpbFNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERldGFpbFNlcnZpY2VfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Um9sZUVudGl0bGVtZW50cygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpdGVtc1VSTCA9IGJhc2VVUkwgKyAnYWNjZXNzSXRlbXMvd2hhdGV2ZXIvc2ltcGxlRW50aXRsZW1lbnRzJyxcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsge30sIHt9IF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9taXNlO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggdGhlIHJvbGUgZW50aXRsZW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGl0ZW1zVVJMKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMoJ3doYXRldmVyJyk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZ2V0T2JqZWN0cygpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBubyBpdGVtIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMoKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
