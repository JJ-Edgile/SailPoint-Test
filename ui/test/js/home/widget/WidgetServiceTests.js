System.register(['test/js/TestInitializer', 'home/widget/WidgetModule'], function (_export) {
    'use strict';

    var homeWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWidgetModule) {
            homeWidgetModule = _homeWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('WidgetService', function () {
                var $scope,
                    $httpBackend,
                    widgetService,
                    Widget,
                    url = '/ui/rest/me/widgets',
                    urlWithAllTrue = url + '?all=true',
                    response = [{
                    name: 'testWidget',
                    id: '1234'
                }, {
                    name: 'testWidget2',
                    id: '7777'
                }];

                beforeEach(module(homeWidgetModule));

                beforeEach(inject(function (_widgetService_, _$rootScope_, _$httpBackend_, _Widget_) {
                    $scope = _$rootScope_.$new();
                    widgetService = _widgetService_;
                    $httpBackend = _$httpBackend_;
                    Widget = _Widget_;
                }));

                function testGetWidgetsWithUrl(url, all) {
                    var widgets;
                    $httpBackend.expectGET(url).respond(200, response);
                    widgetService.getWidgets(all).then(function (returnedResponse) {
                        widgets = returnedResponse;
                    });
                    $httpBackend.flush();
                    expect(widgets).toEqual(response.map(function (data) {
                        return new Widget(data);
                    }));
                }

                describe('getWidgets', function () {
                    it('returns widgets', function () {
                        testGetWidgetsWithUrl(url, null);
                    });

                    it('sets all param true when all is true', function () {
                        testGetWidgetsWithUrl(urlWithAllTrue, true);
                    });

                    it('sets all param false when all is false', function () {
                        testGetWidgetsWithUrl(url, false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L1dpZGdldFNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUztJQUE1Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLG1CQUFtQix3QkFBd0I7O1FBRS9DLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxpQkFBaUIsWUFBVztnQkFDakMsSUFBSTtvQkFBUTtvQkFBYztvQkFBZTtvQkFDckMsTUFBTTtvQkFDTixpQkFBaUIsTUFBTTtvQkFDdkIsV0FBWSxDQUFDO29CQUNULE1BQU07b0JBQ04sSUFBSTttQkFDTjtvQkFDRSxNQUFNO29CQUNOLElBQUk7OztnQkFHWixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxpQkFBaUIsY0FBYyxnQkFBZ0IsVUFBVTtvQkFDaEYsU0FBUyxhQUFhO29CQUN0QixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsU0FBUzs7O2dCQUdiLFNBQVMsc0JBQXNCLEtBQUssS0FBSztvQkFDckMsSUFBSTtvQkFDSixhQUFhLFVBQVUsS0FBSyxRQUFRLEtBQUs7b0JBQ3pDLGNBQWMsV0FBVyxLQUFLLEtBQUssVUFBUyxrQkFBa0I7d0JBQzFELFVBQVU7O29CQUVkLGFBQWE7b0JBQ2IsT0FBTyxTQUFTLFFBQVEsU0FBUyxJQUFJLFVBQVMsTUFBTTt3QkFDaEQsT0FBTyxJQUFJLE9BQU87Ozs7Z0JBSTFCLFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLG1CQUFtQixZQUFXO3dCQUM3QixzQkFBc0IsS0FBSzs7O29CQUcvQixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxzQkFBc0IsZ0JBQWdCOzs7b0JBRzFDLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELHNCQUFzQixLQUFLOzs7Ozs7R0FjcEMiLCJmaWxlIjoiaG9tZS93aWRnZXQvV2lkZ2V0U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBob21lV2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L1dpZGdldE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdXaWRnZXRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGh0dHBCYWNrZW5kLCB3aWRnZXRTZXJ2aWNlLCBXaWRnZXQsXG4gICAgICAgIHVybCA9ICcvdWkvcmVzdC9tZS93aWRnZXRzJyxcbiAgICAgICAgdXJsV2l0aEFsbFRydWUgPSB1cmwgKyAnP2FsbD10cnVlJyxcbiAgICAgICAgcmVzcG9uc2UgPSAgW3tcbiAgICAgICAgICAgIG5hbWU6ICd0ZXN0V2lkZ2V0JyxcbiAgICAgICAgICAgIGlkOiAnMTIzNCdcbiAgICAgICAgfSx7XG4gICAgICAgICAgICBuYW1lOiAndGVzdFdpZGdldDInLFxuICAgICAgICAgICAgaWQ6ICc3Nzc3J1xuICAgICAgICB9XTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGhvbWVXaWRnZXRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF93aWRnZXRTZXJ2aWNlXywgXyRyb290U2NvcGVfLCBfJGh0dHBCYWNrZW5kXywgX1dpZGdldF8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgd2lkZ2V0U2VydmljZSA9IF93aWRnZXRTZXJ2aWNlXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIFdpZGdldCA9IF9XaWRnZXRfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHRlc3RHZXRXaWRnZXRzV2l0aFVybCh1cmwsIGFsbCkge1xuICAgICAgICB2YXIgd2lkZ2V0cztcbiAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgIHdpZGdldFNlcnZpY2UuZ2V0V2lkZ2V0cyhhbGwpLnRoZW4oZnVuY3Rpb24ocmV0dXJuZWRSZXNwb25zZSkge1xuICAgICAgICAgICAgd2lkZ2V0cyA9IHJldHVybmVkUmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgZXhwZWN0KHdpZGdldHMpLnRvRXF1YWwocmVzcG9uc2UubWFwKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2lkZ2V0KGRhdGEpO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dldFdpZGdldHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgd2lkZ2V0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdEdldFdpZGdldHNXaXRoVXJsKHVybCwgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIGFsbCBwYXJhbSB0cnVlIHdoZW4gYWxsIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRlc3RHZXRXaWRnZXRzV2l0aFVybCh1cmxXaXRoQWxsVHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIGFsbCBwYXJhbSBmYWxzZSB3aGVuIGFsbCBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdEdldFdpZGdldHNXaXRoVXJsKHVybCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
