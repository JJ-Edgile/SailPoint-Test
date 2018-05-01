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
             * Tests for the ManageAccountActionDialogCtrl.
             */
            describe('ManageAccountActionDialogCtrl', function () {

                var quickLink = 'Manage%20Accounts';
                var $rootScope = undefined,
                    $controller = undefined,
                    $httpBackend = undefined,
                    testService = undefined,
                    manageAccountService = undefined,
                    ctrl = undefined,
                    $q = undefined,
                    $uibModalInstance = undefined,
                    promiseTrackerService = undefined,
                    link = undefined,
                    identityId = undefined,
                    IdentityRequestItem = undefined,
                    WorkflowResultItem = undefined,
                    manageAccountDataService = undefined,
                    managePasswordService = undefined;

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 13 */
                beforeEach(inject(function (_manageAccountService_, _manageAccountDataService_, _testService_, _$controller_, _$rootScope_, _$httpBackend_, _$q_, _promiseTrackerService_, PasswordLink, linkTestData, _IdentityRequestItem_, _WorkflowResultItem_, _managePasswordService_) {

                    // Save the services.
                    manageAccountDataService = _manageAccountDataService_;
                    manageAccountService = _manageAccountService_;
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
                    IdentityRequestItem = _IdentityRequestItem_;
                    promiseTrackerService = _promiseTrackerService_;
                    WorkflowResultItem = _WorkflowResultItem_;
                    link = new PasswordLink(linkTestData.LINK1);
                    identityId = link.getIdentityId();
                }));

                beforeEach(function () {
                    // Create the controller to test with.
                    ctrl = $controller('ManageAccountActionDialogCtrl', {
                        manageAccountService: manageAccountService,
                        managePasswordService: managePasswordService,
                        manageAccountDataService: manageAccountDataService,
                        $uibModalInstance: $uibModalInstance,
                        promiseTrackerService: promiseTrackerService,
                        identityId: identityId,
                        link: link,
                        operation: {
                            messageKey: 'ui_manage_accounts_op_disable'
                        },
                        IdentityRequestItem: IdentityRequestItem
                    });
                });

                describe('submit', function () {
                    it('sets errors if submit fails', function () {
                        var deferred = $q.defer();
                        spyOn(manageAccountService, 'submit').and.returnValue(deferred.promise);
                        deferred.reject({ messages: ['you suck'] });
                        ctrl.submit(quickLink, identityId, link, {});
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(1);
                    });

                    it('sets comments correctly', function () {
                        var deferred = $q.defer();
                        manageAccountDataService.quickLinkName = quickLink;
                        spyOn(manageAccountService, 'submit').and.returnValue(deferred.promise);
                        deferred.reject({ messages: ['you suck'] });

                        ctrl.showComment();
                        ctrl.comment = 'This is a test';

                        link.action = 'ui_manage_accounts_op_disable';
                        link.comment = ctrl.comment;

                        var decisions = {};
                        decisions[link.id] = link;

                        ctrl.submit();
                        $rootScope.$apply();
                        expect(manageAccountService.submit).toHaveBeenCalledWith(quickLink, identityId, decisions);
                    });

                    it('does not set errors if submit succeeds', function () {
                        var deferred = $q.defer();
                        spyOn(manageAccountService, 'submit').and.returnValue(deferred.promise);
                        deferred.resolve(new WorkflowResultItem({}));

                        ctrl.submit(quickLink, identityId, link, {});
                        $rootScope.$apply();
                        expect(ctrl.getErrors().length).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnRBY3Rpb25EaWFsb2dUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHNCQUFzQixtQkFBbUIsVUFBVSxTQUFTOzs7SUFHL0g7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxlQUFlO1FBQzVCLFNBQVMsWUFBWTs7Ozs7WUFGN0IsU0FBUyxpQ0FBaUMsWUFBVzs7Z0JBRWpELElBQU0sWUFBWTtnQkFDbEIsSUFBSSxhQUFVO29CQUFFLGNBQVc7b0JBQUUsZUFBWTtvQkFBRSxjQUFXO29CQUFFLHVCQUFvQjtvQkFBRSxPQUFJO29CQUFFLEtBQUU7b0JBQ2xGLG9CQUFpQjtvQkFBRSx3QkFBcUI7b0JBQUUsT0FBSTtvQkFBRSxhQUFVO29CQUFFLHNCQUFtQjtvQkFBRSxxQkFBa0I7b0JBQ25HLDJCQUF3QjtvQkFBRSx3QkFBcUI7OztnQkFHbkQsV0FBVyxPQUFPLFlBQVk7Ozs7OztnQkFNOUIsV0FBVyxPQUFPLFVBQVMsd0JBQXdCLDRCQUE0QixlQUFlLGVBQ25FLGNBQWMsZ0JBQWdCLE1BQU0seUJBQ3BDLGNBQWMsY0FBYyx1QkFBdUIsc0JBQ2xELHlCQUF5Qjs7O29CQUdqRCwyQkFBMkI7b0JBQzNCLHVCQUF1QjtvQkFDdkIsd0JBQXdCO29CQUN4QixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLEtBQUs7b0JBQ0wsb0JBQW9CO3dCQUNoQixPQUFPLFFBQVE7d0JBQ2YsU0FBUyxRQUFRO3dCQUNqQixVQUFVLFFBQVE7O29CQUV0QixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIscUJBQXFCO29CQUNyQixPQUFPLElBQUksYUFBYSxhQUFhO29CQUNyQyxhQUFhLEtBQUs7OztnQkFHdEIsV0FBWSxZQUFXOztvQkFFbkIsT0FBTyxZQUFZLGlDQUFpQzt3QkFDaEQsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLDBCQUEwQjt3QkFDMUIsbUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLFlBQVk7d0JBQ1osTUFBTTt3QkFDTixXQUFXOzRCQUNQLFlBQVk7O3dCQUVoQixxQkFBcUI7Ozs7Z0JBSTdCLFNBQVMsVUFBVSxZQUFXO29CQUMxQixHQUFHLCtCQUErQixZQUFXO3dCQUN6QyxJQUFJLFdBQVcsR0FBRzt3QkFDbEIsTUFBTSxzQkFBc0IsVUFBVSxJQUFJLFlBQVksU0FBUzt3QkFDL0QsU0FBUyxPQUFPLEVBQUMsVUFBVSxDQUFDO3dCQUM1QixLQUFLLE9BQU8sV0FBVyxZQUFZLE1BQU07d0JBQ3pDLFdBQVc7d0JBQ1gsT0FBTyxLQUFLLFlBQVksUUFBUSxRQUFROzs7b0JBRzVDLEdBQUcsMkJBQTJCLFlBQVc7d0JBQ3JDLElBQUksV0FBVyxHQUFHO3dCQUNsQix5QkFBeUIsZ0JBQWdCO3dCQUN6QyxNQUFNLHNCQUFzQixVQUFVLElBQUksWUFBWSxTQUFTO3dCQUMvRCxTQUFTLE9BQU8sRUFBQyxVQUFVLENBQUM7O3dCQUU1QixLQUFLO3dCQUNMLEtBQUssVUFBVTs7d0JBRWYsS0FBSyxTQUFTO3dCQUNkLEtBQUssVUFBVSxLQUFLOzt3QkFFcEIsSUFBSSxZQUFZO3dCQUNoQixVQUFVLEtBQUssTUFBTTs7d0JBRXJCLEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLHFCQUFxQixRQUFRLHFCQUFxQixXQUFXLFlBQVk7OztvQkFHcEYsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxXQUFXLEdBQUc7d0JBQ2xCLE1BQU0sc0JBQXNCLFVBQVUsSUFBSSxZQUFZLFNBQVM7d0JBQy9ELFNBQVMsUUFBUSxJQUFJLG1CQUFtQjs7d0JBR3hDLEtBQUssT0FBTyxXQUFXLFlBQVksTUFBTTt3QkFDekMsV0FBVzt3QkFDWCxPQUFPLEtBQUssWUFBWSxRQUFRLFFBQVE7Ozs7OztHQXFCakQiLCJmaWxlIjoiaWRlbnRpdHkvTWFuYWdlQWNjb3VudEFjdGlvbkRpYWxvZ1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vTGlua1Rlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIE1hbmFnZUFjY291bnRBY3Rpb25EaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnTWFuYWdlQWNjb3VudEFjdGlvbkRpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHF1aWNrTGluayA9ICdNYW5hZ2UlMjBBY2NvdW50cyc7XG4gICAgbGV0ICRyb290U2NvcGUsICRjb250cm9sbGVyLCAkaHR0cEJhY2tlbmQsIHRlc3RTZXJ2aWNlLCBtYW5hZ2VBY2NvdW50U2VydmljZSwgY3RybCwgJHEsXG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLCBwcm9taXNlVHJhY2tlclNlcnZpY2UsIGxpbmssIGlkZW50aXR5SWQsIElkZW50aXR5UmVxdWVzdEl0ZW0sIFdvcmtmbG93UmVzdWx0SXRlbSxcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLCBtYW5hZ2VQYXNzd29yZFNlcnZpY2U7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlIGFuZCBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9tYW5hZ2VBY2NvdW50U2VydmljZV8sIF9tYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXywgXyRodHRwQmFja2VuZF8sIF8kcV8sIF9wcm9taXNlVHJhY2tlclNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkTGluaywgbGlua1Rlc3REYXRhLCBfSWRlbnRpdHlSZXF1ZXN0SXRlbV8sIF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudFNlcnZpY2VfO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlID0ge1xuICAgICAgICAgICAgY2xvc2U6IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICBkaXNtaXNzOiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICAgICAgc2V0VGl0bGU6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbSA9IF9JZGVudGl0eVJlcXVlc3RJdGVtXztcbiAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlID0gX3Byb21pc2VUcmFja2VyU2VydmljZV87XG4gICAgICAgIFdvcmtmbG93UmVzdWx0SXRlbSA9IF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fO1xuICAgICAgICBsaW5rID0gbmV3IFBhc3N3b3JkTGluayhsaW5rVGVzdERhdGEuTElOSzEpO1xuICAgICAgICBpZGVudGl0eUlkID0gbGluay5nZXRJZGVudGl0eUlkKCk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignTWFuYWdlQWNjb3VudEFjdGlvbkRpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBtYW5hZ2VBY2NvdW50U2VydmljZTogbWFuYWdlQWNjb3VudFNlcnZpY2UsXG4gICAgICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2U6IG1hbmFnZVBhc3N3b3JkU2VydmljZSxcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZTogbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlLFxuICAgICAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlOiBwcm9taXNlVHJhY2tlclNlcnZpY2UsXG4gICAgICAgICAgICBpZGVudGl0eUlkOiBpZGVudGl0eUlkLFxuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIG9wZXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VLZXk6ICd1aV9tYW5hZ2VfYWNjb3VudHNfb3BfZGlzYWJsZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtOiBJZGVudGl0eVJlcXVlc3RJdGVtXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2V0cyBlcnJvcnMgaWYgc3VibWl0IGZhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdzdWJtaXQnKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe21lc3NhZ2VzOiBbJ3lvdSBzdWNrJ119KTtcbiAgICAgICAgICAgIGN0cmwuc3VibWl0KHF1aWNrTGluaywgaWRlbnRpdHlJZCwgbGluaywge30pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEVycm9ycygpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgY29tbWVudHMgY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnF1aWNrTGlua05hbWUgPSBxdWlja0xpbms7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ3N1Ym1pdCcpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7bWVzc2FnZXM6IFsneW91IHN1Y2snXX0pO1xuXG4gICAgICAgICAgICBjdHJsLnNob3dDb21tZW50KCk7XG4gICAgICAgICAgICBjdHJsLmNvbW1lbnQgPSAnVGhpcyBpcyBhIHRlc3QnO1xuXG4gICAgICAgICAgICBsaW5rLmFjdGlvbiA9ICd1aV9tYW5hZ2VfYWNjb3VudHNfb3BfZGlzYWJsZSc7XG4gICAgICAgICAgICBsaW5rLmNvbW1lbnQgPSBjdHJsLmNvbW1lbnQ7XG5cbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSB7fTtcbiAgICAgICAgICAgIGRlY2lzaW9uc1tsaW5rLmlkXSA9IGxpbms7XG5cbiAgICAgICAgICAgIGN0cmwuc3VibWl0KCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnRTZXJ2aWNlLnN1Ym1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgocXVpY2tMaW5rLCBpZGVudGl0eUlkLCBkZWNpc2lvbnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2V0IGVycm9ycyBpZiBzdWJtaXQgc3VjY2VlZHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ3N1Ym1pdCcpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobmV3IFdvcmtmbG93UmVzdWx0SXRlbSh7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGN0cmwuc3VibWl0KHF1aWNrTGluaywgaWRlbnRpdHlJZCwgbGluaywge30pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEVycm9ycygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
