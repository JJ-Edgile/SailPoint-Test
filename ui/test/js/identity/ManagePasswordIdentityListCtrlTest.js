System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule', './IdentityTestData'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_IdentityTestData) {}],
        execute: function () {

            /**
             * Tests for the ManagePasswordCtrl.
             */
            describe('QuickLinkIdentityListCtrl', function () {

                var $rootScope = undefined,
                    $httpBackend = undefined,
                    Identity = undefined,
                    $controller = undefined,
                    identity1 = undefined,
                    identity2 = undefined,
                    accountQuickLink = undefined,
                    passwordQuickLink = undefined,
                    identityId1 = undefined,
                    identityName1 = undefined,
                    pageState = undefined,
                    searchData = undefined,
                    ctrl = undefined,
                    testService = undefined,
                    identityTestData = undefined,
                    managePasswordDataService = undefined,
                    identityService = undefined,
                    quickLinkService = undefined;
                // baseURLManagePasswords = SailPoint.CONTEXT_PATH + '/ui/rest/quickLinks/Manage%20Passwords/';

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Load the identity module to get the managePasswordService.
                beforeEach(module(identityModule, function ($provide) {
                    /* Inject some test functions into configService */
                    $provide.decorator('configService', function ($delegate, testService, SP_CONFIG_SERVICE) {
                        $delegate.getColumnConfigEntries = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                'uiManagePasswordsIdentityCard': {
                                    'attribute': 'name',
                                    'label': 'User Name'
                                }, 'uiManageAccountsIdentityCard': {
                                    'attribute': 'something',
                                    'label': 'Foo Bar'
                                }
                            }
                        }, {});

                        return $delegate;
                    });
                }));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams : 16 */
                beforeEach(inject(function (_$rootScope_, $q, $timeout, $stateParams, _$httpBackend_, _testService_, _identityService_, _quickLinkService_, _Identity_, _$controller_, _PageState_, _SearchData_, _identityTestData_, configService, _managePasswordDataService_, navigationService) {
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    Identity = _Identity_;
                    $controller = _$controller_;
                    pageState = _PageState_;
                    searchData = _SearchData_;
                    identityTestData = _identityTestData_;
                    identity1 = new Identity(identityTestData.IDENTITY1);
                    identity2 = new Identity(identityTestData.IDENTITY2);
                    identityId1 = identity1.getId();
                    identityName1 = identity1.getName();
                    testService = _testService_;
                    managePasswordDataService = _managePasswordDataService_;
                    $stateParams.quickLink = 'Manage%20Passwords';
                    identityService = _identityService_;
                    quickLinkService = _quickLinkService_;

                    accountQuickLink = {
                        getAction: function () {
                            return 'manageAccounts';
                        }
                    };

                    passwordQuickLink = {
                        getAction: function () {
                            return 'managePasswords';
                        }
                    };

                    // Mock out the identity service to return a single identity.
                    identityService.getIdentities = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: 2,
                            objects: [identityTestData.IDENTITY1, identityTestData.IDENTITY2]
                        }
                    }, {});
                    // Create the controller to test with.
                    ctrl = $controller('QuickLinkIdentityListCtrl', {
                        navigationService: navigationService,
                        configService: configService,
                        PageState: pageState,
                        SearchData: searchData,
                        managePasswordDataService: managePasswordDataService,
                        quickLinkService: quickLinkService,
                        Identity: Identity,
                        identityService: identityService,
                        $q: $q,
                        $timeout: $timeout,
                        $stateParams: $stateParams
                    });
                }));

                it('search identity with given name', function () {
                    ctrl.doSearch(identityName1, null, null, null);
                    expect(identityService.getIdentities).toHaveBeenCalled();
                });

                it('fetches all identities', function () {
                    ctrl.fetchItems();
                    expect(identityService.getIdentities).toHaveBeenCalled();
                });

                it('navigate to selected identity manage password tab', function () {
                    $httpBackend.expectGET('/ui/identity/identity.jsf').respond(200, testService.response);
                    ctrl.quickLink = passwordQuickLink;
                    ctrl.selectIdentity(identity1);
                });

                it('should have a page size in multiples of twelve', function () {
                    var expectedSizes = [12, 24, 48, 60],
                        pageSizes = ctrl.getPageSizes();
                    expect(pageSizes.length).toEqual(expectedSizes.length);
                    for (var i = 0; i < pageSizes.length; i++) {
                        expect(pageSizes[i]).toEqual(expectedSizes[i]);
                    }
                });

                it('should return the correct column config', function () {
                    var columnConfig = undefined;
                    ctrl.quickLink = passwordQuickLink;
                    columnConfig = ctrl.getColumnConfigKey();
                    expect(columnConfig).toEqual('uiManagePasswordsIdentityCard');
                    ctrl.quickLink = accountQuickLink;
                    columnConfig = ctrl.getColumnConfigKey();
                    expect(columnConfig).toEqual('uiManageAccountsIdentityCard');
                });

                it('should return the correct next state', function () {
                    var nextState = undefined;
                    ctrl.quickLink = passwordQuickLink;
                    nextState = ctrl.getNextState();
                    expect(nextState).toEqual('identities.identity.passwords');
                    ctrl.quickLink = accountQuickLink;
                    nextState = ctrl.getNextState();
                    expect(nextState).toEqual('identities.identity.accounts');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkSWRlbnRpdHlMaXN0Q3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLbkk7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxtQkFBbUI7UUFDaEMsU0FBUyxZQUFZOzs7OztZQUY3QixTQUFTLDZCQUE2QixZQUFXOztnQkFFN0MsSUFBSSxhQUFVO29CQUFFLGVBQVk7b0JBQUUsV0FBUTtvQkFBRSxjQUFXO29CQUFFLFlBQVM7b0JBQUUsWUFBUztvQkFBRSxtQkFBZ0I7b0JBQUUsb0JBQWlCO29CQUMxRyxjQUFXO29CQUFFLGdCQUFhO29CQUFFLFlBQVM7b0JBQUUsYUFBVTtvQkFBRSxPQUFJO29CQUFFLGNBQVc7b0JBQUUsbUJBQWdCO29CQUN0Riw0QkFBeUI7b0JBQUUsa0JBQWU7b0JBQUUsbUJBQWdCOzs7O2dCQUloRSxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLGdCQUFnQixVQUFTLFVBQVU7O29CQUVqRCxTQUFTLFVBQVUsaUJBQWlCLFVBQVMsV0FBVyxhQUFhLG1CQUFtQjt3QkFDcEYsVUFBVSx5QkFBeUIsWUFBWSxpQkFBaUIsT0FBTzs0QkFDbkUsUUFBUTs0QkFDUixNQUFNO2dDQUNGLGlDQUFpQztvQ0FDN0IsYUFBYTtvQ0FDYixTQUFTO21DQUNWLGdDQUFnQztvQ0FDL0IsYUFBYTtvQ0FDYixTQUFTOzs7MkJBR2xCOzt3QkFFSCxPQUFPOzs7Ozs7OztnQkFRZixXQUFXLE9BQU8sVUFBUyxjQUFjLElBQUksVUFBVSxjQUFjLGdCQUFnQixlQUMxRCxtQkFBbUIsb0JBQW9CLFlBQ3ZDLGVBQWUsYUFBYSxjQUFjLG9CQUFvQixlQUM5RCw2QkFBNkIsbUJBQW1CO29CQUN2RSxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsV0FBVztvQkFDWCxjQUFjO29CQUNkLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixtQkFBbUI7b0JBQ25CLFlBQVksSUFBSSxTQUFTLGlCQUFpQjtvQkFDMUMsWUFBWSxJQUFJLFNBQVMsaUJBQWlCO29CQUMxQyxjQUFjLFVBQVU7b0JBQ3hCLGdCQUFnQixVQUFVO29CQUMxQixjQUFjO29CQUNkLDRCQUE0QjtvQkFDNUIsYUFBYSxZQUFZO29CQUN6QixrQkFBa0I7b0JBQ2xCLG1CQUFtQjs7b0JBRW5CLG1CQUFtQjt3QkFDZixXQUFXLFlBQVc7NEJBQUUsT0FBTzs7OztvQkFHbkMsb0JBQW9CO3dCQUNoQixXQUFXLFlBQVc7NEJBQUUsT0FBTzs7Ozs7b0JBSW5DLGdCQUFnQixnQkFDWixZQUFZLGlCQUFpQixPQUFPO3dCQUNoQyxRQUFRO3dCQUNSLE1BQU07NEJBQ0YsT0FBTzs0QkFDUCxTQUFTLENBQUUsaUJBQWlCLFdBQVcsaUJBQWlCOzt1QkFFN0Q7O29CQUVQLE9BQU8sWUFBWSw2QkFBNkI7d0JBQzVDLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osMkJBQTJCO3dCQUMzQixrQkFBa0I7d0JBQ2xCLFVBQVU7d0JBQ1YsaUJBQWlCO3dCQUNqQixJQUFJO3dCQUNKLFVBQVU7d0JBQ1YsY0FBYzs7OztnQkFJdEIsR0FBRyxtQ0FBbUMsWUFBVztvQkFDN0MsS0FBSyxTQUFTLGVBQWUsTUFBTSxNQUFNO29CQUN6QyxPQUFPLGdCQUFnQixlQUFlOzs7Z0JBRzFDLEdBQUcsMEJBQTBCLFlBQVc7b0JBQ3BDLEtBQUs7b0JBQ0wsT0FBTyxnQkFBZ0IsZUFBZTs7O2dCQUcxQyxHQUFHLHFEQUFxRCxZQUFXO29CQUMvRCxhQUFhLFVBQVUsNkJBQTZCLFFBQVEsS0FBSyxZQUFZO29CQUM3RSxLQUFLLFlBQVk7b0JBQ2pCLEtBQUssZUFBZTs7O2dCQUd4QixHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCxJQUFJLGdCQUFnQixDQUFDLElBQUksSUFBSSxJQUFJO3dCQUM3QixZQUFZLEtBQUs7b0JBQ3JCLE9BQU8sVUFBVSxRQUFRLFFBQVEsY0FBYztvQkFDL0MsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO3dCQUN2QyxPQUFPLFVBQVUsSUFBSSxRQUFRLGNBQWM7Ozs7Z0JBSW5ELEdBQUcsMkNBQTJDLFlBQVc7b0JBQ3JELElBQUksZUFBWTtvQkFDaEIsS0FBSyxZQUFZO29CQUNqQixlQUFlLEtBQUs7b0JBQ3BCLE9BQU8sY0FBYyxRQUFRO29CQUM3QixLQUFLLFlBQVk7b0JBQ2pCLGVBQWUsS0FBSztvQkFDcEIsT0FBTyxjQUFjLFFBQVE7OztnQkFHakMsR0FBRyx3Q0FBd0MsWUFBVztvQkFDbEQsSUFBSSxZQUFTO29CQUNiLEtBQUssWUFBWTtvQkFDakIsWUFBWSxLQUFLO29CQUNqQixPQUFPLFdBQVcsUUFBUTtvQkFDMUIsS0FBSyxZQUFZO29CQUNqQixZQUFZLEtBQUs7b0JBQ2pCLE9BQU8sV0FBVyxRQUFROzs7OztHQTJCL0IiLCJmaWxlIjoiaWRlbnRpdHkvTWFuYWdlUGFzc3dvcmRJZGVudGl0eUxpc3RDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuaW1wb3J0ICcuL0lkZW50aXR5VGVzdERhdGEnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgTWFuYWdlUGFzc3dvcmRDdHJsLlxuICovXG5kZXNjcmliZSgnUXVpY2tMaW5rSWRlbnRpdHlMaXN0Q3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRyb290U2NvcGUsICRodHRwQmFja2VuZCwgSWRlbnRpdHksICRjb250cm9sbGVyLCBpZGVudGl0eTEsIGlkZW50aXR5MiwgYWNjb3VudFF1aWNrTGluaywgcGFzc3dvcmRRdWlja0xpbmssXG4gICAgICAgIGlkZW50aXR5SWQxLCBpZGVudGl0eU5hbWUxLCBwYWdlU3RhdGUsIHNlYXJjaERhdGEsIGN0cmwsIHRlc3RTZXJ2aWNlLCBpZGVudGl0eVRlc3REYXRhLFxuICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLCBpZGVudGl0eVNlcnZpY2UsIHF1aWNrTGlua1NlcnZpY2U7XG4gICAgICAgLy8gYmFzZVVSTE1hbmFnZVBhc3N3b3JkcyA9IFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvcXVpY2tMaW5rcy9NYW5hZ2UlMjBQYXNzd29yZHMvJztcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSkpO1xuXG4gICAgLy8gTG9hZCB0aGUgaWRlbnRpdHkgbW9kdWxlIHRvIGdldCB0aGUgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAvKiBJbmplY3Qgc29tZSB0ZXN0IGZ1bmN0aW9ucyBpbnRvIGNvbmZpZ1NlcnZpY2UgKi9cbiAgICAgICAgJHByb3ZpZGUuZGVjb3JhdG9yKCdjb25maWdTZXJ2aWNlJywgZnVuY3Rpb24oJGRlbGVnYXRlLCB0ZXN0U2VydmljZSwgU1BfQ09ORklHX1NFUlZJQ0UpIHtcbiAgICAgICAgICAgICRkZWxlZ2F0ZS5nZXRDb2x1bW5Db25maWdFbnRyaWVzID0gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3VpTWFuYWdlUGFzc3dvcmRzSWRlbnRpdHlDYXJkJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdsYWJlbCc6ICdVc2VyIE5hbWUnXG4gICAgICAgICAgICAgICAgICAgIH0sICd1aU1hbmFnZUFjY291bnRzSWRlbnRpdHlDYXJkJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSc6ICdzb21ldGhpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJzogJ0ZvbyBCYXInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgICAgIHJldHVybiAkZGVsZWdhdGU7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zIDogMTYgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sICRxLCAkdGltZW91dCwgJHN0YXRlUGFyYW1zLCBfJGh0dHBCYWNrZW5kXywgX3Rlc3RTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWRlbnRpdHlTZXJ2aWNlXywgX3F1aWNrTGlua1NlcnZpY2VfLCBfSWRlbnRpdHlfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kY29udHJvbGxlcl8sIF9QYWdlU3RhdGVfLCBfU2VhcmNoRGF0YV8sIF9pZGVudGl0eVRlc3REYXRhXywgY29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZV8sIG5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBJZGVudGl0eSA9IF9JZGVudGl0eV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgcGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XG4gICAgICAgIHNlYXJjaERhdGEgPSBfU2VhcmNoRGF0YV87XG4gICAgICAgIGlkZW50aXR5VGVzdERhdGEgPSBfaWRlbnRpdHlUZXN0RGF0YV87XG4gICAgICAgIGlkZW50aXR5MSA9IG5ldyBJZGVudGl0eShpZGVudGl0eVRlc3REYXRhLklERU5USVRZMSk7XG4gICAgICAgIGlkZW50aXR5MiA9IG5ldyBJZGVudGl0eShpZGVudGl0eVRlc3REYXRhLklERU5USVRZMik7XG4gICAgICAgIGlkZW50aXR5SWQxID0gaWRlbnRpdHkxLmdldElkKCk7XG4gICAgICAgIGlkZW50aXR5TmFtZTEgPSBpZGVudGl0eTEuZ2V0TmFtZSgpO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZV87XG4gICAgICAgICRzdGF0ZVBhcmFtcy5xdWlja0xpbmsgPSAnTWFuYWdlJTIwUGFzc3dvcmRzJztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIHF1aWNrTGlua1NlcnZpY2UgPSBfcXVpY2tMaW5rU2VydmljZV87XG5cbiAgICAgICAgYWNjb3VudFF1aWNrTGluayA9IHtcbiAgICAgICAgICAgIGdldEFjdGlvbjogZnVuY3Rpb24oKSB7IHJldHVybiAnbWFuYWdlQWNjb3VudHMnOyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcGFzc3dvcmRRdWlja0xpbmsgPSB7XG4gICAgICAgICAgICBnZXRBY3Rpb246IGZ1bmN0aW9uKCkgeyByZXR1cm4gJ21hbmFnZVBhc3N3b3Jkcyc7IH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgaWRlbnRpdHkgc2VydmljZSB0byByZXR1cm4gYSBzaW5nbGUgaWRlbnRpdHkuXG4gICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzID1cbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBbIGlkZW50aXR5VGVzdERhdGEuSURFTlRJVFkxLCBpZGVudGl0eVRlc3REYXRhLklERU5USVRZMiBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge30pO1xuICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignUXVpY2tMaW5rSWRlbnRpdHlMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICBQYWdlU3RhdGU6IHBhZ2VTdGF0ZSxcbiAgICAgICAgICAgIFNlYXJjaERhdGE6IHNlYXJjaERhdGEsXG4gICAgICAgICAgICBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlOiBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgcXVpY2tMaW5rU2VydmljZTogcXVpY2tMaW5rU2VydmljZSxcbiAgICAgICAgICAgIElkZW50aXR5OiBJZGVudGl0eSxcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZTogaWRlbnRpdHlTZXJ2aWNlLFxuICAgICAgICAgICAgJHE6ICRxLFxuICAgICAgICAgICAgJHRpbWVvdXQ6ICR0aW1lb3V0LFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXNcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3NlYXJjaCBpZGVudGl0eSB3aXRoIGdpdmVuIG5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3RybC5kb1NlYXJjaChpZGVudGl0eU5hbWUxLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmV0Y2hlcyBhbGwgaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjdHJsLmZldGNoSXRlbXMoKTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnbmF2aWdhdGUgdG8gc2VsZWN0ZWQgaWRlbnRpdHkgbWFuYWdlIHBhc3N3b3JkIHRhYicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKCcvdWkvaWRlbnRpdHkvaWRlbnRpdHkuanNmJykucmVzcG9uZCgyMDAsIHRlc3RTZXJ2aWNlLnJlc3BvbnNlKTtcbiAgICAgICAgY3RybC5xdWlja0xpbmsgPSBwYXNzd29yZFF1aWNrTGluaztcbiAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgcGFnZSBzaXplIGluIG11bHRpcGxlcyBvZiB0d2VsdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGV4cGVjdGVkU2l6ZXMgPSBbMTIsIDI0LCA0OCwgNjBdLFxuICAgICAgICAgICAgcGFnZVNpemVzID0gY3RybC5nZXRQYWdlU2l6ZXMoKTtcbiAgICAgICAgZXhwZWN0KHBhZ2VTaXplcy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRTaXplcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VTaXplcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KHBhZ2VTaXplc1tpXSkudG9FcXVhbChleHBlY3RlZFNpemVzW2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGNvcnJlY3QgY29sdW1uIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY29sdW1uQ29uZmlnO1xuICAgICAgICBjdHJsLnF1aWNrTGluayA9IHBhc3N3b3JkUXVpY2tMaW5rO1xuICAgICAgICBjb2x1bW5Db25maWcgPSBjdHJsLmdldENvbHVtbkNvbmZpZ0tleSgpO1xuICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnKS50b0VxdWFsKCd1aU1hbmFnZVBhc3N3b3Jkc0lkZW50aXR5Q2FyZCcpO1xuICAgICAgICBjdHJsLnF1aWNrTGluayA9IGFjY291bnRRdWlja0xpbms7XG4gICAgICAgIGNvbHVtbkNvbmZpZyA9IGN0cmwuZ2V0Q29sdW1uQ29uZmlnS2V5KCk7XG4gICAgICAgIGV4cGVjdChjb2x1bW5Db25maWcpLnRvRXF1YWwoJ3VpTWFuYWdlQWNjb3VudHNJZGVudGl0eUNhcmQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBjb3JyZWN0IG5leHQgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG5leHRTdGF0ZTtcbiAgICAgICAgY3RybC5xdWlja0xpbmsgPSBwYXNzd29yZFF1aWNrTGluaztcbiAgICAgICAgbmV4dFN0YXRlID0gY3RybC5nZXROZXh0U3RhdGUoKTtcbiAgICAgICAgZXhwZWN0KG5leHRTdGF0ZSkudG9FcXVhbCgnaWRlbnRpdGllcy5pZGVudGl0eS5wYXNzd29yZHMnKTtcbiAgICAgICAgY3RybC5xdWlja0xpbmsgPSBhY2NvdW50UXVpY2tMaW5rO1xuICAgICAgICBuZXh0U3RhdGUgPSBjdHJsLmdldE5leHRTdGF0ZSgpO1xuICAgICAgICBleHBlY3QobmV4dFN0YXRlKS50b0VxdWFsKCdpZGVudGl0aWVzLmlkZW50aXR5LmFjY291bnRzJyk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
