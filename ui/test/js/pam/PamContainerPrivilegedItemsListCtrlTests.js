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

            describe('PamContainerPrivilegedItemsListCtrl', function () {

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

                    spyOn(pamContainerService, 'getPrivilegedItems').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    return $controller('PamContainerPrivilegedItemsListCtrl', {
                        pamContainerService: pamContainerService
                    });
                }

                describe('getPrivilegedItems()', function () {
                    it('calls getPrivilegedItems on pamContainerService', function () {
                        var ctrl = createController(),
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        ctrl.containerId = containerId;
                        ctrl.getPrivilegedItems(start, limit, sortOrder);

                        expect(pamContainerService.getPrivilegedItems).toHaveBeenCalledWith(containerId, start, limit, sortOrder);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJQcml2aWxlZ2VkSXRlbXNMaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpQkFBaUIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUluRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHVDQUF1QyxZQUFXOztnQkFFdkQsSUFBSSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxlQUFZO29CQUFFLHNCQUFtQjtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsZUFBWTtvQkFDMUcsMkJBQXdCO29CQUFFLHFCQUFrQjs7Z0JBRWhELFdBQVcsT0FBTyxXQUFXOzs7Z0JBRzdCLFdBQVcsT0FBTyxVQUFTLGVBQWUsTUFBTSxjQUFjLGdCQUFnQixnQkFDbkQsdUJBQXVCLGVBQWUsNEJBQTRCLHNCQUFzQjtvQkFDL0csY0FBYztvQkFDZCxhQUFhO29CQUNiLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixlQUFlO29CQUNmLHNCQUFzQjtvQkFDdEIsMkJBQTJCO29CQUMzQixxQkFBcUI7b0JBQ3JCLGNBQWM7O29CQUVkLE1BQU0scUJBQXFCLHNCQUFzQixJQUFJLFNBQVMsWUFBVzt3QkFDckUsT0FBTyxZQUFZLGNBQWMsT0FBTyxJQUFJOzs7O2dCQUlwRCxTQUFTLG1CQUFtQjtvQkFDeEIsU0FBUyxXQUFXO29CQUNwQixPQUFPLFlBQVksdUNBQXVDO3dCQUNsRCxxQkFBcUI7Ozs7Z0JBSWpDLFNBQVMsd0JBQXdCLFlBQVc7b0JBQ3hDLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELElBQUksT0FBTzs0QkFDUCxRQUFROzRCQUNSLFFBQVE7NEJBQ1IsWUFBWSxFQUFDLE1BQU07d0JBQ3ZCLEtBQUssY0FBYzt3QkFDbkIsS0FBSyxtQkFBbUIsT0FBTyxPQUFPOzt3QkFFdEMsT0FBTyxvQkFBb0Isb0JBQW9CLHFCQUFxQixhQUFhLE9BQU8sT0FBTzs7Ozs7O0dBcUJ4RyIsImZpbGUiOiJwYW0vUGFtQ29udGFpbmVyUHJpdmlsZWdlZEl0ZW1zTGlzdEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1Db250YWluZXJQcml2aWxlZ2VkSXRlbXNMaXN0Q3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCAkc2NvcGUsICRzdGF0ZVBhcmFtcywgcGFtQ29udGFpbmVyU2VydmljZSwgY29udGFpbmVySWQsIHRlc3RTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsXG4gICAgICAgIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZywgRGF0YVJlZnJlc2hUcmlnZ2VyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA5ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRxXywgXyRyb290U2NvcGVfLCBfJGh0dHBCYWNrZW5kXywgXyRzdGF0ZVBhcmFtc18sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BhbUNvbnRhaW5lclNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnXywgX0RhdGFSZWZyZXNoVHJpZ2dlcl8pIHtcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkc3RhdGVQYXJhbXMgPSBfJHN0YXRlUGFyYW1zXztcbiAgICAgICAgcGFtQ29udGFpbmVyU2VydmljZSA9IF9wYW1Db250YWluZXJTZXJ2aWNlXztcbiAgICAgICAgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnID0gX0RhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZ187XG4gICAgICAgIERhdGFSZWZyZXNoVHJpZ2dlciA9IF9EYXRhUmVmcmVzaFRyaWdnZXJfO1xuICAgICAgICBjb250YWluZXJJZCA9IDA7XG5cbiAgICAgICAgc3B5T24ocGFtQ29udGFpbmVyU2VydmljZSwgJ2dldFByaXZpbGVnZWRJdGVtcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7fSwge30pO1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdQYW1Db250YWluZXJQcml2aWxlZ2VkSXRlbXNMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICBwYW1Db250YWluZXJTZXJ2aWNlOiBwYW1Db250YWluZXJTZXJ2aWNlXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0UHJpdmlsZWdlZEl0ZW1zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2NhbGxzIGdldFByaXZpbGVnZWRJdGVtcyBvbiBwYW1Db250YWluZXJTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSAxMCxcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSB7YmxhaDogJ3Rlc3QnfTtcbiAgICAgICAgICAgIGN0cmwuY29udGFpbmVySWQgPSBjb250YWluZXJJZDtcbiAgICAgICAgICAgIGN0cmwuZ2V0UHJpdmlsZWdlZEl0ZW1zKHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lclNlcnZpY2UuZ2V0UHJpdmlsZWdlZEl0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjb250YWluZXJJZCwgc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
