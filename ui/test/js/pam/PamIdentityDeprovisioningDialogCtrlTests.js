System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the PamIdentityDeprovisioningDialogCtrl.
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
            describe('PamIdentityDeprovisioningDialogCtrl', function () {

                var $rootScope = undefined,
                    $q = undefined,
                    $controller = undefined,
                    testService = undefined,
                    ctrl = undefined,
                    resultItems = undefined,
                    IdentityDeprovisioningResultItem = undefined;

                // Load the test module to get the testService and pamModule.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_testService_, _$controller_, _$rootScope_, _$q_, _IdentityDeprovisioningResultItem_) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    IdentityDeprovisioningResultItem = _IdentityDeprovisioningResultItem_;

                    resultItems = [new IdentityDeprovisioningResultItem({
                        groups: ['Group 1A'],
                        hasEffectiveAccess: true,
                        identityDisplayName: 'User OneA',
                        identityId: '297e7d6d5bee56ef015bee5c81791d71',
                        identityRequestId: '',
                        messages: [],
                        workflowStatus: 'complete',
                        workflowWorkItemId: '',
                        workflowWorkItemType: ''
                    }), new IdentityDeprovisioningResultItem({
                        groups: ['Group 2A'],
                        hasEffectiveAccess: true,
                        identityDisplayName: 'User OneB',
                        identityId: '297e7d6d5bee56ef015bee5c81791d55',
                        identityRequestId: '',
                        messages: [],
                        workflowStatus: 'complete',
                        workflowWorkItemId: '',
                        workflowWorkItemType: ''
                    })];
                }));

                describe('getResults()', function () {
                    it('returns appropriate structure', function () {

                        // Create the controller to test with.
                        ctrl = $controller('PamIdentityDeprovisioningDialogCtrl', {
                            deprovisioningResultItems: resultItems
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();
                        var result = undefined;
                        ctrl.getResults().then(function (results) {
                            result = results;
                        });
                        $rootScope.$apply();
                        expect(result).toEqual({
                            data: {
                                objects: resultItems,
                                count: resultItems.length
                            }
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eURlcHJvdmlzaW9uaW5nRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpQkFBaUIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7O0lBTW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFON0IsU0FBUyx1Q0FBdUMsWUFBVzs7Z0JBRXZELElBQUksYUFBVTtvQkFBRSxLQUFFO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxPQUFJO29CQUFFLGNBQVc7b0JBQUUsbUNBQWdDOzs7Z0JBR2pHLFdBQVcsT0FBTyxZQUFZOzs7Ozs7Z0JBTTlCLFdBQVcsT0FBTyxVQUFTLGVBQWUsZUFBZSxjQUFjLE1BQU0sb0NBQW9DOzs7b0JBRzdHLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLEtBQUs7b0JBQ0wsbUNBQW1DOztvQkFFbkMsY0FBYyxDQUFDLElBQUksaUNBQWlDO3dCQUNoRCxRQUFRLENBQUM7d0JBQ1Qsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixzQkFBc0I7d0JBQ3RCLElBQUksaUNBQWlDO3dCQUNyQyxRQUFRLENBQUM7d0JBQ1Qsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixzQkFBc0I7Ozs7Z0JBSTlCLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLEdBQUcsaUNBQWlDLFlBQVc7Ozt3QkFHM0MsT0FBTyxZQUFZLHVDQUF1Qzs0QkFDdEQsMkJBQTJCOzs7O3dCQUkvQixXQUFXO3dCQUNYLElBQUksU0FBTTt3QkFDVixLQUFLLGFBQWEsS0FBSyxVQUFDLFNBQVk7NEJBQ2hDLFNBQVM7O3dCQUViLFdBQVc7d0JBQ1gsT0FBTyxRQUFRLFFBQVE7NEJBQ25CLE1BQU07Z0NBQ0YsU0FBUztnQ0FDVCxPQUFPLFlBQVk7Ozs7Ozs7O0dBcUJwQyIsImZpbGUiOiJwYW0vUGFtSWRlbnRpdHlEZXByb3Zpc2lvbmluZ0RpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFtSWRlbnRpdHlEZXByb3Zpc2lvbmluZ0RpYWxvZ0N0cmwuXG4gKi9cbmRlc2NyaWJlKCdQYW1JZGVudGl0eURlcHJvdmlzaW9uaW5nRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRyb290U2NvcGUsICRxLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsIGN0cmwsIHJlc3VsdEl0ZW1zLCBJZGVudGl0eURlcHJvdmlzaW9uaW5nUmVzdWx0SXRlbTtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIHBhbU1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBwYW1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfJHFfLCBfSWRlbnRpdHlEZXByb3Zpc2lvbmluZ1Jlc3VsdEl0ZW1fKSB7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgIElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtID0gX0lkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtXztcblxuICAgICAgICByZXN1bHRJdGVtcyA9IFtuZXcgSWRlbnRpdHlEZXByb3Zpc2lvbmluZ1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgZ3JvdXBzOiBbJ0dyb3VwIDFBJ10sXG4gICAgICAgICAgICBoYXNFZmZlY3RpdmVBY2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBpZGVudGl0eURpc3BsYXlOYW1lOiAnVXNlciBPbmVBJyxcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6ICcyOTdlN2Q2ZDViZWU1NmVmMDE1YmVlNWM4MTc5MWQ3MScsXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJycsXG4gICAgICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJycsXG4gICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJydcbiAgICAgICAgfSksIG5ldyBJZGVudGl0eURlcHJvdmlzaW9uaW5nUmVzdWx0SXRlbSh7XG4gICAgICAgICAgICBncm91cHM6IFsnR3JvdXAgMkEnXSxcbiAgICAgICAgICAgIGhhc0VmZmVjdGl2ZUFjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIGlkZW50aXR5RGlzcGxheU5hbWU6ICdVc2VyIE9uZUInLFxuICAgICAgICAgICAgaWRlbnRpdHlJZDogJzI5N2U3ZDZkNWJlZTU2ZWYwMTViZWU1YzgxNzkxZDU1JyxcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdElkOiAnJyxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnY29tcGxldGUnLFxuICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnJ1xuICAgICAgICB9KV07XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2dldFJlc3VsdHMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyBhcHByb3ByaWF0ZSBzdHJ1Y3R1cmUnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignUGFtSWRlbnRpdHlEZXByb3Zpc2lvbmluZ0RpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICAgICAgZGVwcm92aXNpb25pbmdSZXN1bHRJdGVtczogcmVzdWx0SXRlbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgY3RybC5nZXRSZXN1bHRzKCkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHJlc3VsdEl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogcmVzdWx0SXRlbXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
