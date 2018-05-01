System.register(['test/js/TestInitializer', 'home/widget/WidgetModule'], function (_export) {
    'use strict';

    var homeWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWidgetModule) {
            homeWidgetModule = _homeWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('WidgetDataService', function () {
                var SP_CONTEXT_PATH = '/identityiq',
                    $httpBackend,
                    widgetDataService;

                beforeEach(module(homeWidgetModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', SP_CONTEXT_PATH);
                }));

                beforeEach(inject(function (_$httpBackend_, _widgetDataService_) {
                    $httpBackend = _$httpBackend_;
                    widgetDataService = _widgetDataService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getMyAccessReviews', function () {
                    var start = 0,
                        limit = 5;

                    it('should call out to the REST endpoint with correct params', function () {
                        var URL = SP_CONTEXT_PATH + '/ui/rest/certifications/widgets/myAccessReviews?limit=5&start=0';

                        $httpBackend.expectGET(URL).respond(200, { count: 0, objects: [] });

                        widgetDataService.getMyAccessReviews(start, limit);

                        $httpBackend.flush();
                    });
                });

                describe('getCertificationCampaigns', function () {
                    var start = 0,
                        limit = 5;

                    it('should call out to the REST endpoint with correct params', function () {
                        var URL = SP_CONTEXT_PATH + '/ui/rest/certifications/widgets/certificationCampaigns?limit=5&start=0';

                        $httpBackend.expectGET(URL).respond(200, { count: 0, objects: [] });

                        widgetDataService.getCertificationCampaigns(start, limit);

                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L1dpZGdldERhdGFTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7SUFBNUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxtQkFBbUIsd0JBQXdCOztRQUUvQyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMscUJBQXFCLFlBQVc7Z0JBQ3JDLElBQUksa0JBQWtCO29CQUNsQjtvQkFBYzs7Z0JBRWxCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQVMsZ0JBQWdCLHFCQUFxQjtvQkFDNUQsZUFBZTtvQkFDZixvQkFBb0I7OztnQkFHeEIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxzQkFBc0IsWUFBVztvQkFDdEMsSUFBSSxRQUFRO3dCQUNSLFFBQVE7O29CQUVaLEdBQUcsNERBQTRELFlBQVc7d0JBQ3RFLElBQUksTUFBTSxrQkFBa0I7O3dCQUU1QixhQUFhLFVBQVUsS0FBSyxRQUFRLEtBQUssRUFBRSxPQUFPLEdBQUcsU0FBUzs7d0JBRTlELGtCQUFrQixtQkFBbUIsT0FBTzs7d0JBRTVDLGFBQWE7Ozs7Z0JBS3JCLFNBQVMsNkJBQTZCLFlBQVc7b0JBQzdDLElBQUksUUFBUTt3QkFDUixRQUFROztvQkFFWixHQUFHLDREQUE0RCxZQUFXO3dCQUN0RSxJQUFJLE1BQU0sa0JBQWtCOzt3QkFFNUIsYUFBYSxVQUFVLEtBQUssUUFBUSxLQUFLLEVBQUUsT0FBTyxHQUFHLFNBQVM7O3dCQUU5RCxrQkFBa0IsMEJBQTBCLE9BQU87O3dCQUVuRCxhQUFhOzs7Ozs7R0FXdEIiLCJmaWxlIjoiaG9tZS93aWRnZXQvV2lkZ2V0RGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaG9tZVdpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG5kZXNjcmliZSgnV2lkZ2V0RGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgU1BfQ09OVEVYVF9QQVRIID0gJy9pZGVudGl0eWlxJyxcbiAgICAgICAgJGh0dHBCYWNrZW5kLCB3aWRnZXREYXRhU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGhvbWVXaWRnZXRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCBTUF9DT05URVhUX1BBVEgpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kaHR0cEJhY2tlbmRfLCBfd2lkZ2V0RGF0YVNlcnZpY2VfKSB7XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICB3aWRnZXREYXRhU2VydmljZSA9IF93aWRnZXREYXRhU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldE15QWNjZXNzUmV2aWV3cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSAwLFxuICAgICAgICAgICAgbGltaXQgPSA1O1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gdGhlIFJFU1QgZW5kcG9pbnQgd2l0aCBjb3JyZWN0IHBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIFVSTCA9IFNQX0NPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9jZXJ0aWZpY2F0aW9ucy93aWRnZXRzL215QWNjZXNzUmV2aWV3cz9saW1pdD01JnN0YXJ0PTAnO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKFVSTCkucmVzcG9uZCgyMDAsIHsgY291bnQ6IDAsIG9iamVjdHM6IFtdIH0pO1xuXG4gICAgICAgICAgICB3aWRnZXREYXRhU2VydmljZS5nZXRNeUFjY2Vzc1Jldmlld3Moc3RhcnQsIGxpbWl0KTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q2VydGlmaWNhdGlvbkNhbXBhaWducycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RhcnQgPSAwLFxuICAgICAgICAgICAgbGltaXQgPSA1O1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gdGhlIFJFU1QgZW5kcG9pbnQgd2l0aCBjb3JyZWN0IHBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIFVSTCA9IFNQX0NPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9jZXJ0aWZpY2F0aW9ucy93aWRnZXRzL2NlcnRpZmljYXRpb25DYW1wYWlnbnM/bGltaXQ9NSZzdGFydD0wJztcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChVUkwpLnJlc3BvbmQoMjAwLCB7IGNvdW50OiAwLCBvYmplY3RzOiBbXSB9KTtcblxuICAgICAgICAgICAgd2lkZ2V0RGF0YVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkNhbXBhaWducyhzdGFydCwgbGltaXQpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
