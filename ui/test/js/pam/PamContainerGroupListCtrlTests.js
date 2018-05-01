System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PamContainerGroupListCtrl', function () {

                var $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    $stateParams = undefined,
                    pamContainerService = undefined,
                    containerId = undefined,
                    testService = undefined,
                    $httpBackend = undefined,
                    DataTableDirectiveConfig = undefined,
                    DataRefreshTrigger = undefined;

                beforeEach(module(pamModule, testModule));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$httpBackend_, _$stateParams_, _pamContainerService_, _testService_, _DataTableDirectiveConfig_, _DataRefreshTrigger_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $httpBackend = _$httpBackend_;
                    $stateParams = _$stateParams_;
                    pamContainerService = _pamContainerService_;
                    DataTableDirectiveConfig = _DataTableDirectiveConfig_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    containerId = 0;

                    spyOn(pamContainerService, 'getGroups').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    return $controller('PamContainerGroupListCtrl', {
                        pamContainerService: pamContainerService
                    });
                }

                describe('getGroups()', function () {
                    it('calls getGroups on pamContainerService', function () {
                        var ctrl = createController(),
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        ctrl.containerId = containerId;
                        ctrl.getGroups(start, limit, sortOrder);

                        expect(pamContainerService.getGroups).toHaveBeenCalledWith(containerId, start, limit, sortOrder);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJHcm91cExpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsNkJBQTZCLFlBQVc7O2dCQUU3QyxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLGVBQVk7b0JBQUUsc0JBQW1CO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxlQUFZO29CQUMxRywyQkFBd0I7b0JBQUUscUJBQWtCOztnQkFFaEQsV0FBVyxPQUFPLFdBQVc7OztnQkFHN0IsV0FBVyxPQUFPLFVBQVMsZUFBZSxNQUFNLGNBQWMsZ0JBQWdCLGdCQUNuRCx1QkFBdUIsZUFBZSw0QkFBNEIsc0JBQXNCO29CQUMvRyxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsY0FBYztvQkFDZCxlQUFlO29CQUNmLGVBQWU7b0JBQ2Ysc0JBQXNCO29CQUN0QiwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIsY0FBYzs7b0JBRWQsTUFBTSxxQkFBcUIsYUFBYSxJQUFJLFNBQVMsWUFBVzt3QkFDNUQsT0FBTyxZQUFZLGNBQWMsT0FBTyxJQUFJOzs7O2dCQUlwRCxTQUFTLG1CQUFtQjtvQkFDeEIsU0FBUyxXQUFXO29CQUNwQixPQUFPLFlBQVksNkJBQTZCO3dCQUN4QyxxQkFBcUI7Ozs7Z0JBSWpDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxJQUFJLE9BQU87NEJBQ1AsUUFBUTs0QkFDUixRQUFROzRCQUNSLFlBQVksRUFBQyxNQUFNO3dCQUN2QixLQUFLLGNBQWM7d0JBQ25CLEtBQUssVUFBVSxPQUFPLE9BQU87O3dCQUU3QixPQUFPLG9CQUFvQixXQUFXLHFCQUFxQixhQUFhLE9BQU8sT0FBTzs7Ozs7O0dBcUIvRiIsImZpbGUiOiJwYW0vUGFtQ29udGFpbmVyR3JvdXBMaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ1BhbUNvbnRhaW5lckdyb3VwTGlzdEN0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGVQYXJhbXMsIHBhbUNvbnRhaW5lclNlcnZpY2UsIGNvbnRhaW5lcklkLCB0ZXN0U2VydmljZSwgJGh0dHBCYWNrZW5kLFxuICAgICAgICBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcsIERhdGFSZWZyZXNoVHJpZ2dlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcV8sIF8kcm9vdFNjb3BlXywgXyRodHRwQmFja2VuZF8sIF8kc3RhdGVQYXJhbXNfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wYW1Db250YWluZXJTZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgX0RhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZ18sIF9EYXRhUmVmcmVzaFRyaWdnZXJfKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XG4gICAgICAgIHBhbUNvbnRhaW5lclNlcnZpY2UgPSBfcGFtQ29udGFpbmVyU2VydmljZV87XG4gICAgICAgIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyA9IF9EYXRhVGFibGVEaXJlY3RpdmVDb25maWdfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcbiAgICAgICAgY29udGFpbmVySWQgPSAwO1xuXG4gICAgICAgIHNweU9uKHBhbUNvbnRhaW5lclNlcnZpY2UsICdnZXRHcm91cHMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge30sIHt9KTtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignUGFtQ29udGFpbmVyR3JvdXBMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICBwYW1Db250YWluZXJTZXJ2aWNlOiBwYW1Db250YWluZXJTZXJ2aWNlXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0R3JvdXBzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2NhbGxzIGdldEdyb3VwcyBvbiBwYW1Db250YWluZXJTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSAxMCxcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSB7YmxhaDogJ3Rlc3QnfTtcbiAgICAgICAgICAgIGN0cmwuY29udGFpbmVySWQgPSBjb250YWluZXJJZDtcbiAgICAgICAgICAgIGN0cmwuZ2V0R3JvdXBzKHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0R3JvdXBzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb250YWluZXJJZCwgc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
