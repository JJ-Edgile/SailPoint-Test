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

            describe('CertificationCampaignsWidgetCtrl', function () {
                var $controller, ctrl, widgetDataService, navigationService;

                beforeEach(module(certWidgetModule, testModule));

                beforeEach(inject(function (_$controller_, $rootScope, testService) {
                    $controller = _$controller_;

                    widgetDataService = {
                        getCertificationCampaigns: testService.createPromiseSpy()
                    };

                    navigationService = {
                        go: jasmine.createSpy()
                    };

                    ctrl = $controller('CertificationCampaignsWidgetCtrl', {
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

                        expect(widgetDataService.getCertificationCampaigns).toHaveBeenCalledWith(start, limit);
                    });
                });

                describe('viewAll', function () {
                    it('should delegate to navigationService', function () {
                        var config = {
                            outcome: 'viewCertificationGroupList'
                        };

                        ctrl.viewAll();

                        expect(navigationService.go).toHaveBeenCalledWith(config);
                    });
                });

                describe('viewObject', function () {
                    it('should delegate to navigationService', function () {
                        var object = {
                            id: '1'
                        },
                            config = {
                            outcome: 'viewCertificationGroup?certGroupId=' + object.id,
                            navigationHistory: 'viewHome'
                        };

                        ctrl.viewObject(object);

                        expect(navigationService.go).toHaveBeenCalledWith(config);
                    });
                });

                describe('getCompletionDisplayStyle', function () {
                    it('should return percentage', function () {
                        expect(ctrl.getCompletionDisplayStyle()).toEqual('percentage');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL0NlcnRpZmljYXRpb25DYW1wYWlnbnNXaWRnZXRDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlEQUF5RCx1QkFBdUIsVUFBVSxTQUFTO0lBQS9JOztJQUdJLElBQUksa0JBQWtCO0lBQ3RCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFEQUFxRDtZQUMzRyxtQkFBbUIsb0RBQW9EO1dBQ3hFLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsb0NBQW9DLFlBQVc7Z0JBQ3BELElBQUksYUFBYSxNQUFNLG1CQUFtQjs7Z0JBRTFDLFdBQVcsT0FBTyxrQkFBa0I7O2dCQUVwQyxXQUFXLE9BQU8sVUFBUyxlQUFlLFlBQVksYUFBYTtvQkFDL0QsY0FBYzs7b0JBRWQsb0JBQW9CO3dCQUNoQiwyQkFBMkIsWUFBWTs7O29CQUczQyxvQkFBb0I7d0JBQ2hCLElBQUksUUFBUTs7O29CQUdoQixPQUFPLFlBQVksb0NBQW9DO3dCQUNuRCxRQUFRLFdBQVc7d0JBQ25CLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixtQkFBbUIsUUFBUTs7OztnQkFJbkMsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksUUFBUTs0QkFDUixRQUFROzt3QkFFWixLQUFLLFlBQVksT0FBTzs7d0JBRXhCLE9BQU8sa0JBQWtCLDJCQUEyQixxQkFBcUIsT0FBTzs7OztnQkFJeEYsU0FBUyxXQUFXLFlBQVc7b0JBQzNCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksU0FBUzs0QkFDVCxTQUFTOzs7d0JBR2IsS0FBSzs7d0JBRUwsT0FBTyxrQkFBa0IsSUFBSSxxQkFBcUI7Ozs7Z0JBSTFELFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLFNBQVM7NEJBQ0wsSUFBSTs7NEJBRVIsU0FBUzs0QkFDTCxTQUFTLHdDQUF3QyxPQUFPOzRCQUN4RCxtQkFBbUI7Ozt3QkFHM0IsS0FBSyxXQUFXOzt3QkFFaEIsT0FBTyxrQkFBa0IsSUFBSSxxQkFBcUI7Ozs7Z0JBSTFELFNBQVMsNkJBQTZCLFlBQVc7b0JBQzdDLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDLE9BQU8sS0FBSyw2QkFBNkIsUUFBUTs7Ozs7O0dBWTFEIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL0NlcnRpZmljYXRpb25DYW1wYWlnbnNXaWRnZXRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvY2VydGlmaWNhdGlvbnMvQ2VydGlmaWNhdGlvbnNXaWRnZXRNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25DYW1wYWlnbnNXaWRnZXRDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRjb250cm9sbGVyLCBjdHJsLCB3aWRnZXREYXRhU2VydmljZSwgbmF2aWdhdGlvblNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0V2lkZ2V0TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCAkcm9vdFNjb3BlLCB0ZXN0U2VydmljZSkge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG5cbiAgICAgICAgd2lkZ2V0RGF0YVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXRDZXJ0aWZpY2F0aW9uQ2FtcGFpZ25zOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KClcbiAgICAgICAgfTtcblxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdvOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdDZXJ0aWZpY2F0aW9uQ2FtcGFpZ25zV2lkZ2V0Q3RybCcsIHtcbiAgICAgICAgICAgICRzY29wZTogJHJvb3RTY29wZS4kbmV3KCksXG4gICAgICAgICAgICB3aWRnZXREYXRhU2VydmljZTogd2lkZ2V0RGF0YVNlcnZpY2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcjogYW5ndWxhci5ub29wXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdsb2FkT2JqZWN0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGVnYXRlIHRvIHdpZGdldERhdGFTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNTtcblxuICAgICAgICAgICAgY3RybC5sb2FkT2JqZWN0cyhzdGFydCwgbGltaXQpO1xuXG4gICAgICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkNhbXBhaWducykudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndmlld0FsbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGRlbGVnYXRlIHRvIG5hdmlnYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIG91dGNvbWU6ICd2aWV3Q2VydGlmaWNhdGlvbkdyb3VwTGlzdCdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGN0cmwudmlld0FsbCgpO1xuXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZpZXdPYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBkZWxlZ2F0ZSB0byBuYXZpZ2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBvdXRjb21lOiAndmlld0NlcnRpZmljYXRpb25Hcm91cD9jZXJ0R3JvdXBJZD0nICsgb2JqZWN0LmlkLFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uSGlzdG9yeTogJ3ZpZXdIb21lJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGN0cmwudmlld09iamVjdChvYmplY3QpO1xuXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENvbXBsZXRpb25EaXNwbGF5U3R5bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gcGVyY2VudGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q29tcGxldGlvbkRpc3BsYXlTdHlsZSgpKS50b0VxdWFsKCdwZXJjZW50YWdlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
