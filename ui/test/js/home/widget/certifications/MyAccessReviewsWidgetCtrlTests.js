System.register(['test/js/TestInitializer', 'home/widget/certifications/CertificationsWidgetModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var certWidgetModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetCertificationsCertificationsWidgetModule) {
            certWidgetModule = _homeWidgetCertificationsCertificationsWidgetModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('MyAccessReviewsWidgetCtrl', function () {
                var $controller, ctrl, widgetDataService, navigationService;

                beforeEach(module(certWidgetModule, testModule));

                beforeEach(inject(function (_$controller_, $rootScope, testService) {
                    $controller = _$controller_;

                    widgetDataService = {
                        getMyAccessReviews: testService.createPromiseSpy()
                    };

                    navigationService = {
                        go: jasmine.createSpy()
                    };

                    ctrl = $controller('MyAccessReviewsWidgetCtrl', {
                        $scope: $rootScope.$new(),
                        widgetDataService: widgetDataService,
                        navigationService: navigationService,
                        spTranslateFilter: angular.noop
                    });
                }));

                describe('loadObjects', function () {
                    it('should delegate to widgetDataService', function () {
                        var start = 0,
                            limit = 5;

                        ctrl.loadObjects(start, limit);

                        expect(widgetDataService.getMyAccessReviews).toHaveBeenCalledWith(start, limit);
                    });
                });

                describe('viewAll', function () {
                    it('should delegate to navigationService', function () {
                        var config = {
                            outcome: 'viewResponsiveCertification#/certifications'
                        };

                        ctrl.viewAll();

                        expect(navigationService.go).toHaveBeenCalledWith(config);
                    });
                });

                describe('viewObject', function () {
                    it('should delegate to navigationService', function () {
                        var object = {
                            id: '1',
                            defaultView: 'viewCertDetail?certificationId=1'
                        },
                            config = {
                            outcome: object.defaultView,
                            navigationHistory: 'viewHome'
                        };

                        ctrl.viewObject(object);

                        expect(navigationService.go).toHaveBeenCalledWith(config);
                    });
                });

                describe('getCompletionDisplayStyle', function () {
                    it('should return full', function () {
                        expect(ctrl.getCompletionDisplayStyle()).toEqual('full');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL015QWNjZXNzUmV2aWV3c1dpZGdldEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseURBQXlELHVCQUF1QixVQUFVLFNBQVM7SUFBL0k7O0lBR0ksSUFBSSxrQkFBa0I7SUFDdEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscURBQXFEO1lBQzNHLG1CQUFtQixvREFBb0Q7V0FDeEUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSSxhQUFhLE1BQU0sbUJBQW1COztnQkFFMUMsV0FBVyxPQUFPLGtCQUFrQjs7Z0JBRXBDLFdBQVcsT0FBTyxVQUFTLGVBQWUsWUFBWSxhQUFhO29CQUMvRCxjQUFjOztvQkFFZCxvQkFBb0I7d0JBQ2hCLG9CQUFvQixZQUFZOzs7b0JBR3BDLG9CQUFvQjt3QkFDaEIsSUFBSSxRQUFROzs7b0JBR2hCLE9BQU8sWUFBWSw2QkFBNkI7d0JBQzVDLFFBQVEsV0FBVzt3QkFDbkIsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLG1CQUFtQixRQUFROzs7O2dCQUluQyxTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxRQUFROzRCQUNSLFFBQVE7O3dCQUVaLEtBQUssWUFBWSxPQUFPOzt3QkFFeEIsT0FBTyxrQkFBa0Isb0JBQW9CLHFCQUFxQixPQUFPOzs7O2dCQUlqRixTQUFTLFdBQVcsWUFBVztvQkFDM0IsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxTQUFTOzRCQUNULFNBQVM7Ozt3QkFHYixLQUFLOzt3QkFFTCxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQjs7OztnQkFJMUQsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksU0FBUzs0QkFDTCxJQUFJOzRCQUNKLGFBQWE7OzRCQUVqQixTQUFTOzRCQUNMLFNBQVMsT0FBTzs0QkFDaEIsbUJBQW1COzs7d0JBRzNCLEtBQUssV0FBVzs7d0JBRWhCLE9BQU8sa0JBQWtCLElBQUkscUJBQXFCOzs7O2dCQUkxRCxTQUFTLDZCQUE2QixZQUFXO29CQUM3QyxHQUFHLHNCQUFzQixZQUFXO3dCQUNoQyxPQUFPLEtBQUssNkJBQTZCLFFBQVE7Ozs7OztHQVkxRCIsImZpbGUiOiJob21lL3dpZGdldC9jZXJ0aWZpY2F0aW9ucy9NeUFjY2Vzc1Jldmlld3NXaWRnZXRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvY2VydGlmaWNhdGlvbnMvQ2VydGlmaWNhdGlvbnNXaWRnZXRNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ015QWNjZXNzUmV2aWV3c1dpZGdldEN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNvbnRyb2xsZXIsIGN0cmwsIHdpZGdldERhdGFTZXJ2aWNlLCBuYXZpZ2F0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRXaWRnZXRNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sICRyb290U2NvcGUsIHRlc3RTZXJ2aWNlKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcblxuICAgICAgICB3aWRnZXREYXRhU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldE15QWNjZXNzUmV2aWV3czogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnbzogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICB9O1xuXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignTXlBY2Nlc3NSZXZpZXdzV2lkZ2V0Q3RybCcsIHtcbiAgICAgICAgICAgICRzY29wZTogJHJvb3RTY29wZS4kbmV3KCksXG4gICAgICAgICAgICB3aWRnZXREYXRhU2VydmljZTogd2lkZ2V0RGF0YVNlcnZpY2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcjogYW5ndWxhci5ub29wXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdsb2FkT2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGVnYXRlIHRvIHdpZGdldERhdGFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNTtcblxuICAgICAgICAgICAgY3RybC5sb2FkT2JqZWN0cyhzdGFydCwgbGltaXQpO1xuXG4gICAgICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YVNlcnZpY2UuZ2V0TXlBY2Nlc3NSZXZpZXdzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzdGFydCwgbGltaXQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd2aWV3QWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZWdhdGUgdG8gbmF2aWdhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgb3V0Y29tZTogJ3ZpZXdSZXNwb25zaXZlQ2VydGlmaWNhdGlvbiMvY2VydGlmaWNhdGlvbnMnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLnZpZXdBbGwoKTtcblxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25maWcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd2aWV3T2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgZGVsZWdhdGUgdG8gbmF2aWdhdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWaWV3OiAndmlld0NlcnREZXRhaWw/Y2VydGlmaWNhdGlvbklkPTEnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIG91dGNvbWU6IG9iamVjdC5kZWZhdWx0VmlldyxcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbkhpc3Rvcnk6ICd2aWV3SG9tZSdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjdHJsLnZpZXdPYmplY3Qob2JqZWN0KTtcblxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb25maWcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRDb21wbGV0aW9uRGlzcGxheVN0eWxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZ1bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldENvbXBsZXRpb25EaXNwbGF5U3R5bGUoKSkudG9FcXVhbCgnZnVsbCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
