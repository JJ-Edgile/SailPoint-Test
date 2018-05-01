System.register(['test/js/TestInitializer', 'identity/IdentityModule', './IdentityTestData'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_IdentityTestData) {}],
        execute: function () {

            /**
             * Tests for the manageAccountService.
             */
            describe('manageAccountService', function () {
                var quicklink = 'Manage%20Accounts';
                var baseURLManageAccounts = '/identityiq/ui/rest/quickLinks/' + quicklink + '/';
                var Identity = undefined,
                    manageAccountService = undefined,
                    identityTestData = undefined,
                    $httpBackend = undefined,
                    AccountLink = undefined,
                    identity1 = undefined,
                    identity2 = undefined,
                    linkData = undefined,
                    resultData = undefined;

                // Use the identity module.
                beforeEach(module(identityModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_ID', '123');
                }));

                beforeEach(inject(function (_Identity_, _manageAccountService_, _identityTestData_, _$httpBackend_, _AccountLink_) {
                    Identity = _Identity_;
                    AccountLink = _AccountLink_;
                    manageAccountService = _manageAccountService_;
                    identityTestData = _identityTestData_;
                    $httpBackend = _$httpBackend_;
                    identity1 = new Identity(identityTestData.IDENTITY1);
                    identity2 = new Identity(identityTestData.IDENTITY2);
                    linkData = {
                        id: 'linkId'
                    };
                    resultData = {
                        id: linkData.id,
                        error: null,
                        deleted: false,
                        account: linkData
                    };
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('isSelfService', function () {
                    it('should return true for selfService user', function () {
                        expect(manageAccountService.isSelfService('123')).toBeTruthy();
                    });

                    it('should return false for non-selfSerivce user', function () {
                        expect(manageAccountService.isSelfService('456')).toBeFalsy();
                    });
                });

                describe('get create account config', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call get create account config', function () {
                        currentUrl = baseURLManageAccounts + 'identities/' + identity1.getId() + '/links/createAccountConfig';
                        $httpBackend.expectGET(currentUrl).respond(200, {});
                        promise = manageAccountService.getCreateAccountConfig(quicklink, identity1.getId());
                        $httpBackend.flush();
                    });
                });

                describe('get manage account links', function () {
                    var promise = undefined,
                        currentUrl = undefined;

                    it('should call get manage accounts', function () {
                        currentUrl = baseURLManageAccounts + 'identities/' + identity1.getId() + '/links/';
                        $httpBackend.expectGET(currentUrl).respond(200, { objects: [] });
                        promise = manageAccountService.getManageAccounts(identity1.getId(), 0, 0, quicklink);
                        $httpBackend.flush();
                    });
                });

                describe('refresh links ', function () {
                    it('calls get the refresh REST URL and returns AccountRefreshResults', function () {
                        // Mock our backend.
                        var url = baseURLManageAccounts + ('identities/' + identity1.getId() + '/links/refresh');
                        var data = {
                            linkIds: [linkData.id]
                        };
                        $httpBackend.expectPOST(url, data).respond(200, [resultData]);

                        // Call the service and save the result.
                        var refreshResults = undefined;
                        manageAccountService.refreshLinks(quicklink, identity1.getId(), [linkData.id]).then(function (results) {
                            return refreshResults = results;
                        });
                        $httpBackend.flush();

                        expect(refreshResults.length).toEqual(1);
                        expect(refreshResults[0].id).toEqual(resultData.id);
                        expect(refreshResults[0].error).toEqual(resultData.error);
                        expect(refreshResults[0].deleted).toEqual(resultData.deleted);
                        expect(refreshResults[0].account.id).toEqual(resultData.account.id);
                    });
                });

                describe('submit', function () {
                    var promise = undefined,
                        data = undefined,
                        goodResult = undefined,
                        decisions = undefined,
                        priority = undefined;

                    beforeEach(function () {
                        decisions = [{}];
                        priority = 'High';
                        goodResult = [{
                            workflowStatus: 'executing'
                        }];
                        data = {
                            priority: priority,
                            decisions: decisions
                        };
                    });

                    it('should call REST service with decisions', function () {
                        var submitUrl = baseURLManageAccounts + 'identities/' + identity1.getId() + '/links/submitAccountDecisions';
                        $httpBackend.expectPOST(submitUrl, data).respond(200, goodResult);
                        promise = manageAccountService.submit(quicklink, identity1.getId(), decisions, priority);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnRTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUs3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7UUFDaEMsU0FBUyxZQUFZOzs7OztZQUQ3QixTQUFTLHdCQUF3QixZQUFXO2dCQUN4QyxJQUFNLFlBQVk7Z0JBQ2xCLElBQU0sd0JBQXFCLG9DQUFxQyxZQUFTO2dCQUN6RSxJQUFJLFdBQVE7b0JBQUUsdUJBQW9CO29CQUFFLG1CQUFnQjtvQkFBRSxlQUFZO29CQUFFLGNBQVc7b0JBQzNFLFlBQVM7b0JBQUUsWUFBUztvQkFBRSxXQUFRO29CQUFFLGFBQVU7OztnQkFHOUMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjtvQkFDckMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxZQUFZLHdCQUF3QixvQkFDdkQsZ0JBQWdCLGVBQWU7b0JBQ25DLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCx1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixZQUFZLElBQUksU0FBUyxpQkFBaUI7b0JBQzFDLFlBQVksSUFBSSxTQUFTLGlCQUFpQjtvQkFDMUMsV0FBVzt3QkFDUCxJQUFJOztvQkFFUixhQUFhO3dCQUNULElBQUksU0FBUzt3QkFDYixPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzs7OztnQkFJakIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFHakIsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsT0FBTyxxQkFBcUIsY0FBYyxRQUFROzs7b0JBR3RELEdBQUcsZ0RBQWdELFlBQVc7d0JBQzFELE9BQU8scUJBQXFCLGNBQWMsUUFBUTs7OztnQkFLMUQsU0FBUyw2QkFBNkIsWUFBVztvQkFDN0MsSUFBSSxVQUFPO3dCQUFFLGFBQVU7O29CQUV2QixHQUFHLHlDQUF5QyxZQUFXO3dCQUNuRCxhQUFhLHdCQUF3QixnQkFDakMsVUFBVSxVQUFVO3dCQUN4QixhQUFhLFVBQVUsWUFBWSxRQUFRLEtBQUs7d0JBQ2hELFVBQVUscUJBQXFCLHVCQUF1QixXQUFXLFVBQVU7d0JBQzNFLGFBQWE7Ozs7Z0JBS3JCLFNBQVMsNEJBQTRCLFlBQVc7b0JBQzVDLElBQUksVUFBTzt3QkFBRSxhQUFVOztvQkFFdkIsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsYUFBYSx3QkFBd0IsZ0JBQ2pDLFVBQVUsVUFBVTt3QkFDeEIsYUFBYSxVQUFVLFlBQVksUUFBUSxLQUFLLEVBQUMsU0FBUzt3QkFDMUQsVUFBVSxxQkFBcUIsa0JBQWtCLFVBQVUsU0FBUyxHQUFHLEdBQUc7d0JBQzFFLGFBQWE7Ozs7Z0JBSXJCLFNBQVMsa0JBQWtCLFlBQU07b0JBQzdCLEdBQUcsb0VBQW9FLFlBQVc7O3dCQUU5RSxJQUFJLE1BQU0seUJBQXFCLGdCQUFpQixVQUFVLFVBQU87d0JBQ2pFLElBQUksT0FBTzs0QkFDUCxTQUFTLENBQUUsU0FBUzs7d0JBRXhCLGFBQWEsV0FBVyxLQUFLLE1BQU0sUUFBUSxLQUFLLENBQUU7Ozt3QkFHbEQsSUFBSSxpQkFBYzt3QkFDbEIscUJBQXFCLGFBQWEsV0FBVyxVQUFVLFNBQVMsQ0FBRSxTQUFTLEtBQ3ZFLEtBQUssVUFBQyxTQUFPOzRCQVVELE9BVk0saUJBQWlCOzt3QkFDdkMsYUFBYTs7d0JBRWIsT0FBTyxlQUFlLFFBQVEsUUFBUTt3QkFDdEMsT0FBTyxlQUFlLEdBQUcsSUFBSSxRQUFRLFdBQVc7d0JBQ2hELE9BQU8sZUFBZSxHQUFHLE9BQU8sUUFBUSxXQUFXO3dCQUNuRCxPQUFPLGVBQWUsR0FBRyxTQUFTLFFBQVEsV0FBVzt3QkFDckQsT0FBTyxlQUFlLEdBQUcsUUFBUSxJQUFJLFFBQVEsV0FBVyxRQUFROzs7O2dCQUl4RSxTQUFTLFVBQVUsWUFBVztvQkFDMUIsSUFBSSxVQUFPO3dCQUFFLE9BQUk7d0JBQUUsYUFBVTt3QkFBRSxZQUFTO3dCQUFFLFdBQVE7O29CQUVsRCxXQUFXLFlBQVc7d0JBQ2xCLFlBQVksQ0FBQzt3QkFHYixXQUFXO3dCQUNYLGFBQWEsQ0FBQzs0QkFDVixnQkFBZ0I7O3dCQUVwQixPQUFPOzRCQUNILFVBQVU7NEJBQ1YsV0FBVzs7OztvQkFJbkIsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsSUFBSSxZQUFZLHdCQUF3QixnQkFBZ0IsVUFBVSxVQUFVO3dCQUM1RSxhQUFhLFdBQVcsV0FBVyxNQUFNLFFBQVEsS0FBSzt3QkFDdEQsVUFBVSxxQkFBcUIsT0FBTyxXQUFXLFVBQVUsU0FBUyxXQUFXO3dCQUMvRSxhQUFhOzs7Ozs7R0FtQnRCIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZUFjY291bnRTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0ICcuL0lkZW50aXR5VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgbWFuYWdlQWNjb3VudFNlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdtYW5hZ2VBY2NvdW50U2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHF1aWNrbGluayA9ICdNYW5hZ2UlMjBBY2NvdW50cyc7XG4gICAgY29uc3QgYmFzZVVSTE1hbmFnZUFjY291bnRzID0gYC9pZGVudGl0eWlxL3VpL3Jlc3QvcXVpY2tMaW5rcy8ke3F1aWNrbGlua30vYDtcbiAgICBsZXQgSWRlbnRpdHksIG1hbmFnZUFjY291bnRTZXJ2aWNlLCBpZGVudGl0eVRlc3REYXRhLCAkaHR0cEJhY2tlbmQsIEFjY291bnRMaW5rLFxuICAgICAgICBpZGVudGl0eTEsIGlkZW50aXR5MiwgbGlua0RhdGEsIHJlc3VsdERhdGE7XG5cbiAgICAvLyBVc2UgdGhlIGlkZW50aXR5IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX0lEJywgJzEyMycpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9JZGVudGl0eV8sIF9tYW5hZ2VBY2NvdW50U2VydmljZV8sIF9pZGVudGl0eVRlc3REYXRhXyxcbiAgICAgICAgICAgIF8kaHR0cEJhY2tlbmRfLCBfQWNjb3VudExpbmtfKSB7XG4gICAgICAgIElkZW50aXR5ID0gX0lkZW50aXR5XztcbiAgICAgICAgQWNjb3VudExpbmsgPSBfQWNjb3VudExpbmtfO1xuICAgICAgICBtYW5hZ2VBY2NvdW50U2VydmljZSA9IF9tYW5hZ2VBY2NvdW50U2VydmljZV87XG4gICAgICAgIGlkZW50aXR5VGVzdERhdGEgPSBfaWRlbnRpdHlUZXN0RGF0YV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBpZGVudGl0eTEgPSBuZXcgSWRlbnRpdHkoaWRlbnRpdHlUZXN0RGF0YS5JREVOVElUWTEpO1xuICAgICAgICBpZGVudGl0eTIgPSBuZXcgSWRlbnRpdHkoaWRlbnRpdHlUZXN0RGF0YS5JREVOVElUWTIpO1xuICAgICAgICBsaW5rRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnbGlua0lkJ1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHREYXRhID0ge1xuICAgICAgICAgICAgaWQ6IGxpbmtEYXRhLmlkLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGFjY291bnQ6IGxpbmtEYXRhXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU2VsZlNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3Igc2VsZlNlcnZpY2UgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnRTZXJ2aWNlLmlzU2VsZlNlcnZpY2UoJzEyMycpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBub24tc2VsZlNlcml2Y2UgdXNlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnRTZXJ2aWNlLmlzU2VsZlNlcnZpY2UoJzQ1NicpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXQgY3JlYXRlIGFjY291bnQgY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBjdXJyZW50VXJsO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXQgY3JlYXRlIGFjY291bnQgY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdXJyZW50VXJsID0gYmFzZVVSTE1hbmFnZUFjY291bnRzICsgJ2lkZW50aXRpZXMvJyArXG4gICAgICAgICAgICAgICAgaWRlbnRpdHkxLmdldElkKCkgKyAnL2xpbmtzL2NyZWF0ZUFjY291bnRDb25maWcnO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjdXJyZW50VXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1hbmFnZUFjY291bnRTZXJ2aWNlLmdldENyZWF0ZUFjY291bnRDb25maWcocXVpY2tsaW5rLCBpZGVudGl0eTEuZ2V0SWQoKSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXQgbWFuYWdlIGFjY291bnQgbGlua3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UsIGN1cnJlbnRVcmw7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldCBtYW5hZ2UgYWNjb3VudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmwgPSBiYXNlVVJMTWFuYWdlQWNjb3VudHMgKyAnaWRlbnRpdGllcy8nICtcbiAgICAgICAgICAgICAgICBpZGVudGl0eTEuZ2V0SWQoKSArICcvbGlua3MvJztcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY3VycmVudFVybCkucmVzcG9uZCgyMDAsIHtvYmplY3RzOiBbXX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1hbmFnZUFjY291bnRTZXJ2aWNlLmdldE1hbmFnZUFjY291bnRzKGlkZW50aXR5MS5nZXRJZCgpLCAwLCAwLCBxdWlja2xpbmspO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlZnJlc2ggbGlua3MgJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FsbHMgZ2V0IHRoZSByZWZyZXNoIFJFU1QgVVJMIGFuZCByZXR1cm5zIEFjY291bnRSZWZyZXNoUmVzdWx0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gTW9jayBvdXIgYmFja2VuZC5cbiAgICAgICAgICAgIGxldCB1cmwgPSBiYXNlVVJMTWFuYWdlQWNjb3VudHMgKyBgaWRlbnRpdGllcy8ke2lkZW50aXR5MS5nZXRJZCgpfS9saW5rcy9yZWZyZXNoYDtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGxpbmtJZHM6IFsgbGlua0RhdGEuaWQgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKHVybCwgZGF0YSkucmVzcG9uZCgyMDAsIFsgcmVzdWx0RGF0YSBdKTtcblxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgc2VydmljZSBhbmQgc2F2ZSB0aGUgcmVzdWx0LlxuICAgICAgICAgICAgbGV0IHJlZnJlc2hSZXN1bHRzO1xuICAgICAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2UucmVmcmVzaExpbmtzKHF1aWNrbGluaywgaWRlbnRpdHkxLmdldElkKCksIFsgbGlua0RhdGEuaWQgXSkuXG4gICAgICAgICAgICAgICAgdGhlbigocmVzdWx0cykgPT4gcmVmcmVzaFJlc3VsdHMgPSByZXN1bHRzKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QocmVmcmVzaFJlc3VsdHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHJlZnJlc2hSZXN1bHRzWzBdLmlkKS50b0VxdWFsKHJlc3VsdERhdGEuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHJlZnJlc2hSZXN1bHRzWzBdLmVycm9yKS50b0VxdWFsKHJlc3VsdERhdGEuZXJyb3IpO1xuICAgICAgICAgICAgZXhwZWN0KHJlZnJlc2hSZXN1bHRzWzBdLmRlbGV0ZWQpLnRvRXF1YWwocmVzdWx0RGF0YS5kZWxldGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWZyZXNoUmVzdWx0c1swXS5hY2NvdW50LmlkKS50b0VxdWFsKHJlc3VsdERhdGEuYWNjb3VudC5pZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgZGF0YSwgZ29vZFJlc3VsdCwgZGVjaXNpb25zLCBwcmlvcml0eTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVjaXNpb25zID0gW3tcblxuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBwcmlvcml0eSA9ICdIaWdoJztcbiAgICAgICAgICAgIGdvb2RSZXN1bHQgPSBbe1xuICAgICAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnZXhlY3V0aW5nJ1xuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IGRlY2lzaW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIFJFU1Qgc2VydmljZSB3aXRoIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHN1Ym1pdFVybCA9IGJhc2VVUkxNYW5hZ2VBY2NvdW50cyArICdpZGVudGl0aWVzLycgKyBpZGVudGl0eTEuZ2V0SWQoKSArICcvbGlua3Mvc3VibWl0QWNjb3VudERlY2lzaW9ucyc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChzdWJtaXRVcmwsIGRhdGEpLnJlc3BvbmQoMjAwLCBnb29kUmVzdWx0KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VBY2NvdW50U2VydmljZS5zdWJtaXQocXVpY2tsaW5rLCBpZGVudGl0eTEuZ2V0SWQoKSwgZGVjaXNpb25zLCBwcmlvcml0eSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
