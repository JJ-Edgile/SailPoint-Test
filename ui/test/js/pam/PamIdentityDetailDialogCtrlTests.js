System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the PamIdentityDetailDialogCtrl.
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
            describe('PamIdentityDetailDialogCtrl', function () {

                var $rootScope = undefined,
                    $q = undefined,
                    $controller = undefined,
                    testService = undefined,
                    pamContainerIdentityService = undefined,
                    ctrl = undefined,
                    identity = undefined,
                    ContainerIdentity = undefined;

                // Load the test module to get the testService and pamModule.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_pamContainerIdentityService_, _testService_, _$controller_, _$rootScope_, _$q_, _ContainerIdentity_) {

                    // Save the services.
                    pamContainerIdentityService = _pamContainerIdentityService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    ContainerIdentity = _ContainerIdentity_;

                    identity = new ContainerIdentity({
                        id: 1,
                        displayName: 'Identity',
                        containerId: 1
                    });

                    // Mock out the pamContainerIdentityService to return mocked permissions.
                    pamContainerIdentityService.getPermissions = testService.createPromiseSpy(false, {
                        status: 200,
                        data: []
                    }, {});
                }));

                describe('getPermissions()', function () {
                    it('calls pamContainerIdentityService.getPermissions', function () {

                        // Create the controller to test with.
                        ctrl = $controller('PamIdentityDetailDialogCtrl', {
                            identity: identity,
                            pamContainerIdentityService: pamContainerIdentityService
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        ctrl.getPermissions();

                        expect(pamContainerIdentityService.getPermissions).toHaveBeenCalled();
                        expect(ctrl.identity).toEqual(identity);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eURldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7OztJQU1uRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsK0JBQStCLFlBQVc7O2dCQUUvQyxJQUFJLGFBQVU7b0JBQUUsS0FBRTtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsOEJBQTJCO29CQUFFLE9BQUk7b0JBQy9FLFdBQVE7b0JBQUUsb0JBQWlCOzs7Z0JBRzNCLFdBQVcsT0FBTyxZQUFZOzs7Ozs7Z0JBTTlCLFdBQVcsT0FBTyxVQUFTLCtCQUFnQyxlQUFlLGVBQWUsY0FBYyxNQUM1RSxxQkFBcUI7OztvQkFHNUMsOEJBQThCO29CQUM5QixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixLQUFLO29CQUNMLG9CQUFvQjs7b0JBRXBCLFdBQVcsSUFBSSxrQkFBa0I7d0JBQzdCLElBQUk7d0JBQ0osYUFBYTt3QkFDYixhQUFhOzs7O29CQUlqQiw0QkFBNEIsaUJBQ3hCLFlBQVksaUJBQWlCLE9BQU87d0JBQ2hDLFFBQVE7d0JBQ1IsTUFBTTt1QkFDUDs7O2dCQUdYLFNBQVMsb0JBQW9CLFlBQVc7b0JBQ3BDLEdBQUcsb0RBQW9ELFlBQVc7Ozt3QkFHOUQsT0FBTyxZQUFZLCtCQUErQjs0QkFDOUMsVUFBVTs0QkFDViw2QkFBNkI7Ozs7d0JBSWpDLFdBQVc7d0JBQ1gsS0FBSzs7d0JBRUwsT0FBTyw0QkFBNEIsZ0JBQWdCO3dCQUNuRCxPQUFPLEtBQUssVUFBVSxRQUFROzs7Ozs7R0FpQnZDIiwiZmlsZSI6InBhbS9QYW1JZGVudGl0eURldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFtSWRlbnRpdHlEZXRhaWxEaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnUGFtSWRlbnRpdHlEZXRhaWxEaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJHJvb3RTY29wZSwgJHEsICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlLCBjdHJsLFxuICAgIGlkZW50aXR5LCBDb250YWluZXJJZGVudGl0eTtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIHBhbU1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBwYW1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3BhbUNvbnRhaW5lcklkZW50aXR5U2VydmljZV8sICBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF8kcV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NvbnRhaW5lcklkZW50aXR5Xykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICBwYW1Db250YWluZXJJZGVudGl0eVNlcnZpY2UgPSBfcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgQ29udGFpbmVySWRlbnRpdHkgPSBfQ29udGFpbmVySWRlbnRpdHlfO1xuXG4gICAgICAgIGlkZW50aXR5ID0gbmV3IENvbnRhaW5lcklkZW50aXR5KHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdJZGVudGl0eScsXG4gICAgICAgICAgICBjb250YWluZXJJZDogMVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlIHRvIHJldHVybiBtb2NrZWQgcGVybWlzc2lvbnMuXG4gICAgICAgIHBhbUNvbnRhaW5lcklkZW50aXR5U2VydmljZS5nZXRQZXJtaXNzaW9ucyA9XG4gICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGVybWlzc2lvbnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnY2FsbHMgcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlLmdldFBlcm1pc3Npb25zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1BhbUlkZW50aXR5RGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTogaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgcGFtQ29udGFpbmVySWRlbnRpdHlTZXJ2aWNlOiBwYW1Db250YWluZXJJZGVudGl0eVNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBjdHJsLmdldFBlcm1pc3Npb25zKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwYW1Db250YWluZXJJZGVudGl0eVNlcnZpY2UuZ2V0UGVybWlzc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlkZW50aXR5KS50b0VxdWFsKGlkZW50aXR5KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
