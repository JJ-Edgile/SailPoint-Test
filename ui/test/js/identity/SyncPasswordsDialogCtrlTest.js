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
             * Tests for the SyncPasswordDialogCtrl.
             */
            describe('SyncPasswordDialogCtrl', function () {

                var $rootScope = undefined,
                    $controller = undefined,
                    $httpBackend = undefined,
                    testService = undefined,
                    managePasswordService = undefined,
                    ctrl = undefined,
                    $q = undefined,
                    $uibModalInstance = undefined,
                    promiseTrackerService = undefined,
                    currentPasswordLinks = undefined,
                    CurrentPasswordStepHandler = undefined,
                    NewPasswordStepHandler = undefined,
                    link = undefined,
                    identityId = undefined;
                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 11 */
                beforeEach(inject(function (_managePasswordService_, _testService_, _$controller_, _$rootScope_, _$httpBackend_, _$q_, _promiseTrackerService_, _CurrentPasswordStepHandler_, _NewPasswordStepHandler_, Link, linkTestData) {

                    // Save the services.
                    managePasswordService = _managePasswordService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    $q = _$q_;
                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy(),
                        setTitle: jasmine.createSpy()
                    };
                    promiseTrackerService = _promiseTrackerService_;
                    link = new Link(linkTestData.LINK1);
                    identityId = link.getIdentityId();
                    currentPasswordLinks = [link];
                    CurrentPasswordStepHandler = _CurrentPasswordStepHandler_;
                    NewPasswordStepHandler = _NewPasswordStepHandler_;
                }));

                describe('sychronize password ctrl', function () {
                    beforeEach(function () {
                        // Create the controller to test with.
                        ctrl = $controller('SyncPasswordDialogCtrl', {
                            managePasswordService: managePasswordService,
                            $q: $q,
                            $uibModalInstance: $uibModalInstance,
                            promiseTrackerService: promiseTrackerService,
                            selectionModel: {},
                            identityId: identityId,
                            policies: [],
                            currentPasswordLinks: currentPasswordLinks,
                            CurrentPasswordStepHandler: CurrentPasswordStepHandler,
                            NewPasswordStepHandler: NewPasswordStepHandler
                        });
                    });

                    it('creates handlers for current password input and new password input', function () {
                        var handlers = ctrl.createStepHandlers();
                        expect(handlers.length).toEqual(2);
                        expect(handlers[0].getStepId()).toEqual('currentPasswordInput');
                        expect(handlers[1].getStepId()).toEqual('newPasswordInput');
                    });

                    it('creates handler for new password input only when no current password is needed', function () {
                        ctrl.currentPasswordLinks = [];
                        var handlers = ctrl.createStepHandlers();
                        expect(handlers.length).toEqual(1);
                        expect(handlers[0].getStepId()).toEqual('newPasswordInput');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L1N5bmNQYXNzd29yZHNEaWFsb2dDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHNCQUFzQixtQkFBbUIsVUFBVSxTQUFTOzs7SUFHL0g7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxlQUFlO1FBQzVCLFNBQVMsWUFBWTs7Ozs7WUFGN0IsU0FBUywwQkFBMEIsWUFBVzs7Z0JBRTFDLElBQUksYUFBVTtvQkFBRSxjQUFXO29CQUFFLGVBQVk7b0JBQUUsY0FBVztvQkFBRSx3QkFBcUI7b0JBQUUsT0FBSTtvQkFBRSxLQUFFO29CQUNuRixvQkFBaUI7b0JBQUUsd0JBQXFCO29CQUFFLHVCQUFvQjtvQkFBRSw2QkFBMEI7b0JBQzFGLHlCQUFzQjtvQkFBRSxPQUFJO29CQUFFLGFBQVU7O2dCQUU1QyxXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyx5QkFBeUIsZUFBZSxlQUMzRCxjQUFjLGdCQUFnQixNQUFNLHlCQUF5Qiw4QkFDN0QsMEJBQTBCLE1BQU0sY0FBYzs7O29CQUdsRCx3QkFBd0I7b0JBQ3hCLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsS0FBSztvQkFDTCxvQkFBb0I7d0JBQ2hCLE9BQU8sUUFBUTt3QkFDZixTQUFTLFFBQVE7d0JBQ2pCLFVBQVUsUUFBUTs7b0JBRXRCLHdCQUF3QjtvQkFDeEIsT0FBTyxJQUFJLEtBQUssYUFBYTtvQkFDN0IsYUFBYSxLQUFLO29CQUNsQix1QkFBdUIsQ0FBQztvQkFDeEIsNkJBQTZCO29CQUM3Qix5QkFBeUI7OztnQkFHN0IsU0FBUyw0QkFBNEIsWUFBVztvQkFDNUMsV0FBWSxZQUFXOzt3QkFFbkIsT0FBTyxZQUFZLDBCQUEwQjs0QkFDekMsdUJBQXVCOzRCQUN2QixJQUFJOzRCQUNKLG1CQUFtQjs0QkFDbkIsdUJBQXVCOzRCQUN2QixnQkFBZ0I7NEJBQ2hCLFlBQVk7NEJBQ1osVUFBVTs0QkFDVixzQkFBc0I7NEJBQ3RCLDRCQUE0Qjs0QkFDNUIsd0JBQXdCOzs7O29CQUloQyxHQUFHLHNFQUFzRSxZQUFXO3dCQUNoRixJQUFJLFdBQVcsS0FBSzt3QkFDcEIsT0FBTyxTQUFTLFFBQVEsUUFBUTt3QkFDaEMsT0FBTyxTQUFTLEdBQUcsYUFBYSxRQUFRO3dCQUN4QyxPQUFPLFNBQVMsR0FBRyxhQUFhLFFBQVE7OztvQkFHNUMsR0FBRyxrRkFBa0YsWUFBVzt3QkFDNUYsS0FBSyx1QkFBdUI7d0JBQzVCLElBQUksV0FBVyxLQUFLO3dCQUNwQixPQUFPLFNBQVMsUUFBUSxRQUFRO3dCQUNoQyxPQUFPLFNBQVMsR0FBRyxhQUFhLFFBQVE7Ozs7OztHQXNCakQiLCJmaWxlIjoiaWRlbnRpdHkvU3luY1Bhc3N3b3Jkc0RpYWxvZ0N0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vTGlua1Rlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFN5bmNQYXNzd29yZERpYWxvZ0N0cmwuXG4gKi9cbmRlc2NyaWJlKCdTeW5jUGFzc3dvcmREaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsICRodHRwQmFja2VuZCwgdGVzdFNlcnZpY2UsIG1hbmFnZVBhc3N3b3JkU2VydmljZSwgY3RybCwgJHEsXG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLCBwcm9taXNlVHJhY2tlclNlcnZpY2UsIGN1cnJlbnRQYXNzd29yZExpbmtzLCBDdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlcixcbiAgICAgICAgTmV3UGFzc3dvcmRTdGVwSGFuZGxlciwgbGluaywgaWRlbnRpdHlJZDtcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxuICAgICAgICAgICAgXyRyb290U2NvcGVfLCBfJGh0dHBCYWNrZW5kXywgXyRxXywgX3Byb21pc2VUcmFja2VyU2VydmljZV8sIF9DdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlcl8sXG4gICAgICAgICAgICBfTmV3UGFzc3dvcmRTdGVwSGFuZGxlcl8sIExpbmssIGxpbmtUZXN0RGF0YSkge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICBkaXNtaXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICAgICAgc2V0VGl0bGU6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlID0gX3Byb21pc2VUcmFja2VyU2VydmljZV87XG4gICAgICAgIGxpbmsgPSBuZXcgTGluayhsaW5rVGVzdERhdGEuTElOSzEpO1xuICAgICAgICBpZGVudGl0eUlkID0gbGluay5nZXRJZGVudGl0eUlkKCk7XG4gICAgICAgIGN1cnJlbnRQYXNzd29yZExpbmtzID0gW2xpbmtdO1xuICAgICAgICBDdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlciA9IF9DdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlcl87XG4gICAgICAgIE5ld1Bhc3N3b3JkU3RlcEhhbmRsZXIgPSBfTmV3UGFzc3dvcmRTdGVwSGFuZGxlcl87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ3N5Y2hyb25pemUgcGFzc3dvcmQgY3RybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1N5bmNQYXNzd29yZERpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICAgICAgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlOiBtYW5hZ2VQYXNzd29yZFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgJHE6ICRxLFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiAkdWliTW9kYWxJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBwcm9taXNlVHJhY2tlclNlcnZpY2U6IHByb21pc2VUcmFja2VyU2VydmljZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbDoge30sXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogaWRlbnRpdHlJZCxcbiAgICAgICAgICAgICAgICBwb2xpY2llczogW10sXG4gICAgICAgICAgICAgICAgY3VycmVudFBhc3N3b3JkTGlua3M6IGN1cnJlbnRQYXNzd29yZExpbmtzLFxuICAgICAgICAgICAgICAgIEN1cnJlbnRQYXNzd29yZFN0ZXBIYW5kbGVyOiBDdXJyZW50UGFzc3dvcmRTdGVwSGFuZGxlcixcbiAgICAgICAgICAgICAgICBOZXdQYXNzd29yZFN0ZXBIYW5kbGVyOiBOZXdQYXNzd29yZFN0ZXBIYW5kbGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NyZWF0ZXMgaGFuZGxlcnMgZm9yIGN1cnJlbnQgcGFzc3dvcmQgaW5wdXQgYW5kIG5ldyBwYXNzd29yZCBpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVycy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlcnNbMF0uZ2V0U3RlcElkKCkpLnRvRXF1YWwoJ2N1cnJlbnRQYXNzd29yZElucHV0Jyk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlcnNbMV0uZ2V0U3RlcElkKCkpLnRvRXF1YWwoJ25ld1Bhc3N3b3JkSW5wdXQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NyZWF0ZXMgaGFuZGxlciBmb3IgbmV3IHBhc3N3b3JkIGlucHV0IG9ubHkgd2hlbiBubyBjdXJyZW50IHBhc3N3b3JkIGlzIG5lZWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5jdXJyZW50UGFzc3dvcmRMaW5rcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGhhbmRsZXJzID0gY3RybC5jcmVhdGVTdGVwSGFuZGxlcnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlcnNbMF0uZ2V0U3RlcElkKCkpLnRvRXF1YWwoJ25ld1Bhc3N3b3JkSW5wdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
