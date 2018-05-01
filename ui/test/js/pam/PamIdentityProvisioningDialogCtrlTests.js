System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the PamIdentityProvisioningDialogCtrl.
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
            describe('PamIdentityProvisioningDialogCtrl', function () {

                var $controller = undefined,
                    ctrl = undefined,
                    $uibModalInstance = undefined,
                    $q = undefined,
                    PamIdentitySelectionStepHandler = undefined,
                    PamPermissionSelectionStepHandler = undefined,
                    pamIdentitySuggestService = undefined,
                    SelectionModel = undefined,
                    pamPermissionService = undefined;
                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 12 */
                beforeEach(inject(function (_$controller_, _$q_, _pamIdentitySuggestService_, _SelectionModel_, _PamIdentitySelectionStepHandler_, _PamPermissionSelectionStepHandler_, _pamPermissionService_) {

                    $controller = _$controller_;
                    pamPermissionService = _pamPermissionService_;
                    pamIdentitySuggestService = _pamIdentitySuggestService_;
                    SelectionModel = _SelectionModel_;
                    PamIdentitySelectionStepHandler = _PamIdentitySelectionStepHandler_;
                    PamPermissionSelectionStepHandler = _PamPermissionSelectionStepHandler_;
                    $q = _$q_;
                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy(),
                        setTitle: jasmine.createSpy()
                    };
                }));

                describe('PamIdentityProvisioningDialogCtrl', function () {
                    beforeEach(function () {
                        // Create the controller to test with.
                        ctrl = $controller('PamIdentityProvisioningDialogCtrl', {
                            pamIdentitySuggestService: pamIdentitySuggestService,
                            $q: $q,
                            $uibModalInstance: $uibModalInstance,
                            SelectionModel: SelectionModel,
                            PamIdentitySelectionStepHandler: PamIdentitySelectionStepHandler,
                            PamPermissionSelectionStepHandler: PamPermissionSelectionStepHandler,
                            pamPermissionService: pamPermissionService
                        });
                    });

                    it('creates handlers for identity and permission selection', function () {
                        var handlers = ctrl.createStepHandlers();
                        expect(handlers.length).toEqual(2);
                        expect(handlers[0].getStepId()).toEqual('identitySelection');
                        expect(handlers[1].getStepId()).toEqual('permissionSelection');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eVByb3Zpc2lvbmluZ0RpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7Ozs7O0lBUW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxxQ0FBcUMsWUFBVzs7Z0JBRXJELElBQUksY0FBVztvQkFBRSxPQUFJO29CQUFFLG9CQUFpQjtvQkFBRSxLQUFFO29CQUFFLGtDQUErQjtvQkFBRSxvQ0FBaUM7b0JBQzVHLDRCQUF5QjtvQkFBRSxpQkFBYztvQkFBRSx1QkFBb0I7O2dCQUVuRSxXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyxlQUFlLE1BQU0sNkJBQTZCLGtCQUNsRCxtQ0FBbUMscUNBQ25DLHdCQUF3Qjs7b0JBRS9DLGNBQWM7b0JBQ2QsdUJBQXVCO29CQUN2Qiw0QkFBNEI7b0JBQzVCLGlCQUFpQjtvQkFDakIsa0NBQWtDO29CQUNsQyxvQ0FBb0M7b0JBQ3BDLEtBQUs7b0JBQ0wsb0JBQW9CO3dCQUNoQixPQUFPLFFBQVE7d0JBQ2YsU0FBUyxRQUFRO3dCQUNqQixVQUFVLFFBQVE7Ozs7Z0JBSTFCLFNBQVMscUNBQXFDLFlBQVc7b0JBQ3JELFdBQVksWUFBVzs7d0JBRW5CLE9BQU8sWUFBWSxxQ0FBcUM7NEJBQ3BELDJCQUEyQjs0QkFDM0IsSUFBSTs0QkFDSixtQkFBbUI7NEJBQ25CLGdCQUFnQjs0QkFDaEIsaUNBQWlDOzRCQUNqQyxtQ0FBbUM7NEJBQ25DLHNCQUFzQjs7OztvQkFJOUIsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsSUFBSSxXQUFXLEtBQUs7d0JBQ3BCLE9BQU8sU0FBUyxRQUFRLFFBQVE7d0JBQ2hDLE9BQU8sU0FBUyxHQUFHLGFBQWEsUUFBUTt3QkFDeEMsT0FBTyxTQUFTLEdBQUcsYUFBYSxRQUFROzs7Ozs7R0FrQmpEIiwiZmlsZSI6InBhbS9QYW1JZGVudGl0eVByb3Zpc2lvbmluZ0RpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFBhbUlkZW50aXR5UHJvdmlzaW9uaW5nRGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ1BhbUlkZW50aXR5UHJvdmlzaW9uaW5nRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyLCBjdHJsLCAkdWliTW9kYWxJbnN0YW5jZSwgJHEsIFBhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXIsIFBhbVBlcm1pc3Npb25TZWxlY3Rpb25TdGVwSGFuZGxlcixcbiAgICAgICAgcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZSwgU2VsZWN0aW9uTW9kZWwsIHBhbVBlcm1pc3Npb25TZXJ2aWNlO1xuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBwYW1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMiAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcV8sIF9wYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlXywgX1NlbGVjdGlvbk1vZGVsXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfUGFtSWRlbnRpdHlTZWxlY3Rpb25TdGVwSGFuZGxlcl8sIF9QYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXJfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wYW1QZXJtaXNzaW9uU2VydmljZV8pIHtcblxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHBhbVBlcm1pc3Npb25TZXJ2aWNlID0gX3BhbVBlcm1pc3Npb25TZXJ2aWNlXztcbiAgICAgICAgcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZSA9IF9wYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlXztcbiAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBfU2VsZWN0aW9uTW9kZWxfO1xuICAgICAgICBQYW1JZGVudGl0eVNlbGVjdGlvblN0ZXBIYW5kbGVyID0gX1BhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXJfO1xuICAgICAgICBQYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXIgPSBfUGFtUGVybWlzc2lvblNlbGVjdGlvblN0ZXBIYW5kbGVyXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgIGNsb3NlOiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICAgICAgZGlzbWlzczogamFzbWluZS5jcmVhdGVTcHkoKSxcbiAgICAgICAgICAgIHNldFRpdGxlOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ1BhbUlkZW50aXR5UHJvdmlzaW9uaW5nRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1BhbUlkZW50aXR5UHJvdmlzaW9uaW5nRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBwYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlOiBwYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICRxOiAkcSxcbiAgICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZTogJHVpYk1vZGFsSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgU2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsLFxuICAgICAgICAgICAgICAgIFBhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXI6IFBhbUlkZW50aXR5U2VsZWN0aW9uU3RlcEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgUGFtUGVybWlzc2lvblNlbGVjdGlvblN0ZXBIYW5kbGVyOiBQYW1QZXJtaXNzaW9uU2VsZWN0aW9uU3RlcEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgcGFtUGVybWlzc2lvblNlcnZpY2U6IHBhbVBlcm1pc3Npb25TZXJ2aWNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NyZWF0ZXMgaGFuZGxlcnMgZm9yIGlkZW50aXR5IGFuZCBwZXJtaXNzaW9uIHNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVycy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlcnNbMF0uZ2V0U3RlcElkKCkpLnRvRXF1YWwoJ2lkZW50aXR5U2VsZWN0aW9uJyk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlcnNbMV0uZ2V0U3RlcElkKCkpLnRvRXF1YWwoJ3Blcm1pc3Npb25TZWxlY3Rpb24nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
