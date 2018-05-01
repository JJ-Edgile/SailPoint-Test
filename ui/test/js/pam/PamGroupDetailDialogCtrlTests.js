System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the PamGroupDetailDialogCtrl.
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
            describe('PamGroupDetailDialogCtrl', function () {

                var $rootScope = undefined,
                    $q = undefined,
                    $controller = undefined,
                    testService = undefined,
                    pamContainerGroupService = undefined,
                    ctrl = undefined,
                    group = undefined,
                    ContainerGroup = undefined;

                // Load the test module to get the testService and pamModule.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_pamContainerGroupService_, _testService_, _$controller_, _$rootScope_, _$q_, _ContainerGroup_) {

                    // Save the services.
                    pamContainerGroupService = _pamContainerGroupService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    ContainerGroup = _ContainerGroup_;

                    group = new ContainerGroup({
                        id: 1,
                        displayName: 'Group',
                        containerId: 1
                    });

                    // Mock out the pamContainerGroupService to return mocked identities.
                    pamContainerGroupService.getIdentities = testService.createPromiseSpy(false, {
                        status: 200,
                        data: []
                    }, {});

                    // Mock out the pamContainerGroupService to return mocked permissions.
                    pamContainerGroupService.getPermissions = testService.createPromiseSpy(false, {
                        status: 200,
                        data: []
                    }, {});
                }));

                describe('getIdentities()', function () {
                    it('calls pamContainerGroupService.getIdentities', function () {

                        // Create the controller to test with.
                        ctrl = $controller('PamGroupDetailDialogCtrl', {
                            group: group,
                            pamContainerGroupService: pamContainerGroupService
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        ctrl.getIdentities();

                        expect(pamContainerGroupService.getIdentities).toHaveBeenCalled();
                        expect(ctrl.group).toEqual(group);
                    });
                });

                describe('getPermissionsForContainer()', function () {
                    it('calls pamContainerGroupService.getPermissions', function () {

                        // Create the controller to test with.
                        ctrl = $controller('PamGroupDetailDialogCtrl', {
                            group: group,
                            pamContainerGroupService: pamContainerGroupService
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        ctrl.getPermissionsForContainer();

                        expect(pamContainerGroupService.getPermissions).toHaveBeenCalled();
                        expect(ctrl.group).toEqual(group);
                    });
                });

                describe('getAllPermissions()', function () {
                    it('calls pamContainerGroupService.getPermissions', function () {

                        // Create the controller to test with.
                        ctrl = $controller('PamGroupDetailDialogCtrl', {
                            group: group,
                            pamContainerGroupService: pamContainerGroupService
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        ctrl.getAllPermissions();

                        expect(pamContainerGroupService.getPermissions).toHaveBeenCalled();
                        expect(ctrl.group).toEqual(group);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Hcm91cERldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7OztJQU1uRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7O2dCQUU1QyxJQUFJLGFBQVU7b0JBQUUsS0FBRTtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsMkJBQXdCO29CQUFFLE9BQUk7b0JBQzVFLFFBQUs7b0JBQUUsaUJBQWM7OztnQkFHckIsV0FBVyxPQUFPLFlBQVk7Ozs7OztnQkFNOUIsV0FBVyxPQUFPLFVBQVMsNEJBQTZCLGVBQWUsZUFBZSxjQUFjLE1BQ3pFLGtCQUFrQjs7O29CQUd6QywyQkFBMkI7b0JBQzNCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLEtBQUs7b0JBQ0wsaUJBQWlCOztvQkFFakIsUUFBUSxJQUFJLGVBQWU7d0JBQ3ZCLElBQUk7d0JBQ0osYUFBYTt3QkFDYixhQUFhOzs7O29CQUlqQix5QkFBeUIsZ0JBQ3JCLFlBQVksaUJBQWlCLE9BQU87d0JBQ2hDLFFBQVE7d0JBQ1IsTUFBTTt1QkFDUDs7O29CQUdQLHlCQUF5QixpQkFDckIsWUFBWSxpQkFBaUIsT0FBTzt3QkFDaEMsUUFBUTt3QkFDUixNQUFNO3VCQUNQOzs7Z0JBR1gsU0FBUyxtQkFBbUIsWUFBVztvQkFDbkMsR0FBRyxnREFBZ0QsWUFBVzs7O3dCQUcxRCxPQUFPLFlBQVksNEJBQTRCOzRCQUMzQyxPQUFPOzRCQUNQLDBCQUEwQjs7Ozt3QkFJOUIsV0FBVzt3QkFDWCxLQUFLOzt3QkFFTCxPQUFPLHlCQUF5QixlQUFlO3dCQUMvQyxPQUFPLEtBQUssT0FBTyxRQUFROzs7O2dCQUtuQyxTQUFTLGdDQUFnQyxZQUFXO29CQUNoRCxHQUFHLGlEQUFpRCxZQUFXOzs7d0JBRzNELE9BQU8sWUFBWSw0QkFBNEI7NEJBQzNDLE9BQU87NEJBQ1AsMEJBQTBCOzs7O3dCQUk5QixXQUFXO3dCQUNYLEtBQUs7O3dCQUVMLE9BQU8seUJBQXlCLGdCQUFnQjt3QkFDaEQsT0FBTyxLQUFLLE9BQU8sUUFBUTs7OztnQkFLbkMsU0FBUyx1QkFBdUIsWUFBVztvQkFDdkMsR0FBRyxpREFBaUQsWUFBVzs7O3dCQUczRCxPQUFPLFlBQVksNEJBQTRCOzRCQUMzQyxPQUFPOzRCQUNQLDBCQUEwQjs7Ozt3QkFJOUIsV0FBVzt3QkFDWCxLQUFLOzt3QkFFTCxPQUFPLHlCQUF5QixnQkFBZ0I7d0JBQ2hELE9BQU8sS0FBSyxPQUFPLFFBQVE7Ozs7OztHQWNwQyIsImZpbGUiOiJwYW0vUGFtR3JvdXBEZXRhaWxEaWFsb2dDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFBhbUdyb3VwRGV0YWlsRGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ1BhbUdyb3VwRGV0YWlsRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRyb290U2NvcGUsICRxLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsIHBhbUNvbnRhaW5lckdyb3VwU2VydmljZSwgY3RybCxcbiAgICBncm91cCwgQ29udGFpbmVyR3JvdXA7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBwYW1Nb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgcGFtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXG4gICAgICovXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1Db250YWluZXJHcm91cFNlcnZpY2VfLCAgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfJHFfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9Db250YWluZXJHcm91cF8pIHtcblxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cbiAgICAgICAgcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlID0gX3BhbUNvbnRhaW5lckdyb3VwU2VydmljZV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIENvbnRhaW5lckdyb3VwID0gX0NvbnRhaW5lckdyb3VwXztcblxuICAgICAgICBncm91cCA9IG5ldyBDb250YWluZXJHcm91cCh7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnR3JvdXAnLFxuICAgICAgICAgICAgY29udGFpbmVySWQ6IDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIHBhbUNvbnRhaW5lckdyb3VwU2VydmljZSB0byByZXR1cm4gbW9ja2VkIGlkZW50aXRpZXMuXG4gICAgICAgIHBhbUNvbnRhaW5lckdyb3VwU2VydmljZS5nZXRJZGVudGl0aWVzID1cbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBwYW1Db250YWluZXJHcm91cFNlcnZpY2UgdG8gcmV0dXJuIG1vY2tlZCBwZXJtaXNzaW9ucy5cbiAgICAgICAgcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlLmdldFBlcm1pc3Npb25zID1cbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgfSwge30pO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0aWVzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2NhbGxzIHBhbUNvbnRhaW5lckdyb3VwU2VydmljZS5nZXRJZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1BhbUdyb3VwRGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXAsXG4gICAgICAgICAgICAgICAgcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlOiBwYW1Db250YWluZXJHcm91cFNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBjdHJsLmdldElkZW50aXRpZXMoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lckdyb3VwU2VydmljZS5nZXRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5ncm91cCkudG9FcXVhbChncm91cCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGVybWlzc2lvbnNGb3JDb250YWluZXIoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnY2FsbHMgcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlLmdldFBlcm1pc3Npb25zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1BhbUdyb3VwRGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXAsXG4gICAgICAgICAgICAgICAgcGFtQ29udGFpbmVyR3JvdXBTZXJ2aWNlOiBwYW1Db250YWluZXJHcm91cFNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBjdHJsLmdldFBlcm1pc3Npb25zRm9yQ29udGFpbmVyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwYW1Db250YWluZXJHcm91cFNlcnZpY2UuZ2V0UGVybWlzc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdyb3VwKS50b0VxdWFsKGdyb3VwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRBbGxQZXJtaXNzaW9ucygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdjYWxscyBwYW1Db250YWluZXJHcm91cFNlcnZpY2UuZ2V0UGVybWlzc2lvbnMnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignUGFtR3JvdXBEZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cCxcbiAgICAgICAgICAgICAgICBwYW1Db250YWluZXJHcm91cFNlcnZpY2U6IHBhbUNvbnRhaW5lckdyb3VwU2VydmljZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0QWxsUGVybWlzc2lvbnMoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lckdyb3VwU2VydmljZS5nZXRQZXJtaXNzaW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ3JvdXApLnRvRXF1YWwoZ3JvdXApO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
