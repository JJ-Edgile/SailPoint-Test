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

            describe('PamContainerCtrl', function () {

                var $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    pamContainerService = undefined,
                    testService = undefined;

                beforeEach(module(pamModule, testModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, _pamContainerService_, _testService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    pamContainerService = _pamContainerService_;
                    testService = _testService_;
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    return $controller('PamContainerCtrl', {
                        $scope: $scope,
                        pamContainerService: pamContainerService
                    });
                }

                describe('constructor', function () {
                    it('calls getContainer', function () {
                        spyOn(pamContainerService, 'getContainer').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        createController();
                        expect(pamContainerService.getContainer).toHaveBeenCalled();
                        pamContainerService.getContainer.calls.reset();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9tb2RlbC9QYW1Db250YWluZXJDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLHNCQUFtQjtvQkFBRSxjQUFXOztnQkFFckUsV0FBVyxPQUFPLFdBQVc7O2dCQUU3QixXQUFXLE9BQU8sVUFBUyxlQUFlLGNBQWMsdUJBQXVCLGVBQWU7b0JBQzFGLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixzQkFBc0I7b0JBQ3RCLGNBQWM7OztnQkFHbEIsU0FBUyxtQkFBbUI7b0JBQ3hCLFNBQVMsV0FBVztvQkFDcEIsT0FBTyxZQUFZLG9CQUFvQjt3QkFDL0IsUUFBUTt3QkFDUixxQkFBcUI7Ozs7Z0JBSWpDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLHNCQUFzQixZQUFXO3dCQUNoQyxNQUFNLHFCQUFxQixnQkFBZ0IsSUFBSSxTQUFTLFlBQVc7NEJBQy9ELE9BQU8sWUFBWSxjQUFjLE9BQU8sSUFBSTs7d0JBRWhEO3dCQUNBLE9BQU8sb0JBQW9CLGNBQWM7d0JBQ3pDLG9CQUFvQixhQUFhLE1BQU07Ozs7OztHQWtCaEQiLCJmaWxlIjoicGFtL21vZGVsL1BhbUNvbnRhaW5lckN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1Db250YWluZXJDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzY29wZSwgcGFtQ29udGFpbmVyU2VydmljZSwgdGVzdFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgX3BhbUNvbnRhaW5lclNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZSA9IF9wYW1Db250YWluZXJTZXJ2aWNlXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1BhbUNvbnRhaW5lckN0cmwnLCB7XG4gICAgICAgICAgICAgICAgJHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZTogcGFtQ29udGFpbmVyU2VydmljZVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdjYWxscyBnZXRDb250YWluZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHBhbUNvbnRhaW5lclNlcnZpY2UsICdnZXRDb250YWluZXInKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChwYW1Db250YWluZXJTZXJ2aWNlLmdldENvbnRhaW5lcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZS5nZXRDb250YWluZXIuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
