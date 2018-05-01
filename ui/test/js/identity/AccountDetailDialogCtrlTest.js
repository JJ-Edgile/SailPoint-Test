System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule', './LinkTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_LinkTestData) {}],
        execute: function () {

            /**
             * Tests for the AccountDetailDialogCtrl.
             */
            describe('AccountDetailDialogCtrl', function () {

                var $rootScope = undefined,
                    $q = undefined,
                    $controller = undefined,
                    testService = undefined,
                    identityService = undefined,
                    ctrl = undefined,
                    link = undefined,
                    linkAttr = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 7 */
                beforeEach(inject(function (_identityService_, linkTestData, Link, _testService_, _$controller_, _$rootScope_, _$q_) {

                    // Save the services.
                    identityService = _identityService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;

                    // Create an identity to test with.
                    link = new Link(linkTestData.LINK1);
                    linkAttr = { Id: '1',
                        Department: 'Test',
                        location: 'Austin' };

                    // Mock out the identity service to return link details.
                    identityService.getDetails = testService.createPromiseSpy(false, {
                        status: 200,
                        data: linkAttr
                    }, {});
                }));

                describe('load account details ctrl', function () {
                    it('fetches account details when loaded', function () {

                        // Create the controller to test with.
                        ctrl = $controller('AccountDetailDialogCtrl', {
                            detailLink: link,
                            quickLinkName: 'Manage Accounts',
                            identityService: identityService,
                            $q: $q
                        });

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();

                        expect(identityService.getDetails).toHaveBeenCalled();
                        expect(ctrl.details).not.toBeNull();
                        expect(ctrl.details).toBeDefined();
                        expect(ctrl.details).toEqual(linkAttr);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0FjY291bnREZXRhaWxEaWFsb2dDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHNCQUFzQixtQkFBbUIsVUFBVSxTQUFTOzs7SUFHL0g7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxlQUFlO1FBQzVCLFNBQVMsWUFBWTs7Ozs7WUFGN0IsU0FBUywyQkFBMkIsWUFBVzs7Z0JBRTNDLElBQUksYUFBVTtvQkFBRSxLQUFFO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxrQkFBZTtvQkFBRSxPQUFJO29CQUNuRSxPQUFJO29CQUFFLFdBQVE7OztnQkFHZCxXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyxtQkFBbUIsY0FBYyxNQUFNLGVBQWUsZUFDekUsY0FBYyxNQUFNOzs7b0JBR3hCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsS0FBSzs7O29CQUdMLE9BQU8sSUFBSSxLQUFLLGFBQWE7b0JBQzdCLFdBQVcsRUFBRSxJQUFJO3dCQUNULFlBQVk7d0JBQ1osVUFBVTs7O29CQUdsQixnQkFBZ0IsYUFDWixZQUFZLGlCQUFpQixPQUFPO3dCQUNoQyxRQUFRO3dCQUNSLE1BQU07dUJBQ1A7OztnQkFHWCxTQUFTLDZCQUE2QixZQUFXO29CQUM3QyxHQUFHLHVDQUF1QyxZQUFXOzs7d0JBR2pELE9BQU8sWUFBWSwyQkFBMkI7NEJBQzFDLFlBQVk7NEJBQ1osZUFBZTs0QkFDZixpQkFBaUI7NEJBQ2pCLElBQUk7Ozs7d0JBSVIsV0FBVzs7d0JBRVgsT0FBTyxnQkFBZ0IsWUFBWTt3QkFDbkMsT0FBTyxLQUFLLFNBQVMsSUFBSTt3QkFDekIsT0FBTyxLQUFLLFNBQVM7d0JBQ3JCLE9BQU8sS0FBSyxTQUFTLFFBQVE7Ozs7OztHQWlCdEMiLCJmaWxlIjoiaWRlbnRpdHkvQWNjb3VudERldGFpbERpYWxvZ0N0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0xpbmtUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBY2NvdW50RGV0YWlsRGlhbG9nQ3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2NvdW50RGV0YWlsRGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCAkcm9vdFNjb3BlLCAkcSwgJGNvbnRyb2xsZXIsIHRlc3RTZXJ2aWNlLCBpZGVudGl0eVNlcnZpY2UsIGN0cmwsXHJcbiAgICBsaW5rLCBsaW5rQXR0cjtcclxuXHJcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBpZGVudGl0eU1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxyXG4gICAgICovXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfaWRlbnRpdHlTZXJ2aWNlXywgbGlua1Rlc3REYXRhLCBMaW5rLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxyXG4gICAgICAgICAgICBfJHJvb3RTY29wZV8sIF8kcV8pIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXHJcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRxID0gXyRxXztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGlkZW50aXR5IHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBsaW5rID0gbmV3IExpbmsobGlua1Rlc3REYXRhLkxJTksxKTtcclxuICAgICAgICBsaW5rQXR0ciA9IHsgSWQ6ICcxJyxcclxuICAgICAgICAgICAgICAgIERlcGFydG1lbnQ6ICdUZXN0JyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQXVzdGluJyB9O1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgaWRlbnRpdHkgc2VydmljZSB0byByZXR1cm4gbGluayBkZXRhaWxzLlxyXG4gICAgICAgIGlkZW50aXR5U2VydmljZS5nZXREZXRhaWxzID1cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBsaW5rQXR0clxyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2xvYWQgYWNjb3VudCBkZXRhaWxzIGN0cmwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZmV0Y2hlcyBhY2NvdW50IGRldGFpbHMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjb3VudERldGFpbERpYWxvZ0N0cmwnLCB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxMaW5rOiBsaW5rLFxyXG4gICAgICAgICAgICAgICAgcXVpY2tMaW5rTmFtZTogJ01hbmFnZSBBY2NvdW50cycsXHJcbiAgICAgICAgICAgICAgICBpZGVudGl0eVNlcnZpY2U6IGlkZW50aXR5U2VydmljZSxcclxuICAgICAgICAgICAgICAgICRxOiAkcVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nZXREZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmRldGFpbHMpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kZXRhaWxzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5kZXRhaWxzKS50b0VxdWFsKGxpbmtBdHRyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
