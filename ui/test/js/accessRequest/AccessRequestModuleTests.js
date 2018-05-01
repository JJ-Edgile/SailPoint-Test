System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Test the AccessRequestModule
     */
    //TODO: We split this into separate files (AccessRequestRunner, AccessRequestRoutingConfig), test each well
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('AccessRequestModule', function () {
                var mockBacker = {},
                    configServiceMock = {
                    getConfigValue: function (key) {
                        return mockBacker[key];
                    }
                },
                    mockHome = { url: 'fakeHome' },
                    state,
                    $rootScope,
                    accessRequestDataService,
                    spConfigService,
                    userId,
                    userName,
                    displayName,
                    flowMasterService;

                beforeEach(module(accessRequestModule));

                beforeEach(module(function ($provide, $stateProvider) {
                    userId = '123';
                    userName = 'john.doe';
                    displayName = 'Johnny Doe';

                    $provide.constant('SP_CURR_USER_ID', userId);
                    $provide.constant('SP_CURR_USER_NAME', userName);
                    $provide.constant('SP_CURR_DISPLAYABLE_USER_NAME', displayName);
                    $provide.value('configService', configServiceMock);

                    flowMasterService = {
                        registerFlow: jasmine.createSpy()
                    };
                    $provide.value('flowMasterService', flowMasterService);

                    $stateProvider.state('home', mockHome);
                }));

                beforeEach(inject(function (_accessRequestDataService_, _$state_, _$rootScope_, SP_CONFIG_SERVICE) {
                    state = _$state_;
                    $rootScope = _$rootScope_;
                    accessRequestDataService = _accessRequestDataService_;
                    spConfigService = SP_CONFIG_SERVICE;
                }));

                /**
                 * Test the AccessRequestDataService init logic
                 */
                describe('init logic', function () {

                    it('should initialize accessRequestDataService for accessRequest page', function () {
                        mockBacker[spConfigService.USER_ACCESS_CONFIGS] = {
                            actionRequestAccessDefault: {
                                allowOthers: true,
                                allowSelf: true,
                                allowBulk: false
                            },
                            RequestAccess: {
                                allowOthers: true,
                                allowSelf: true,
                                allowBulk: true
                            }
                        };

                        spyOn(accessRequestDataService, 'setAllowRequestForOthers');
                        spyOn(accessRequestDataService, 'setAllowRequestForSelf');
                        spyOn(accessRequestDataService, 'setAllowBulkRequest');
                        spyOn(accessRequestDataService, 'setInitialized');
                        spyOn(accessRequestDataService, 'setQuickLinkName').and.callThrough();
                        state.go('accessRequest', { quickLink: 'RequestAccess' });
                        expect(accessRequestDataService.setAllowRequestForOthers).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setAllowRequestForSelf).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setAllowBulkRequest).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setInitialized).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setQuickLinkName).toHaveBeenCalledWith('RequestAccess');
                    });

                    it('should initialize accessRequestDataService for accessRequestSelf page', function () {
                        mockBacker[spConfigService.USER_ACCESS_CONFIGS] = {
                            actionRequestAccessDefault: {
                                allowOthers: false,
                                allowSelf: true,
                                allowBulk: true
                            }
                        };

                        spyOn(accessRequestDataService, 'setAllowRequestForOthers');
                        spyOn(accessRequestDataService, 'setAllowRequestForSelf');
                        spyOn(accessRequestDataService, 'setInitialized');
                        spyOn(accessRequestDataService, 'setQuickLinkName');
                        state.go('accessRequestSelf');
                        expect(accessRequestDataService.setAllowRequestForOthers).toHaveBeenCalledWith(false);
                        expect(accessRequestDataService.setAllowRequestForSelf).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setInitialized).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setQuickLinkName).not.toHaveBeenCalled();
                    });

                    it('should initialize accessRequestDataService for accessRequestSelf page using quickLinkName', function () {
                        mockBacker[spConfigService.USER_ACCESS_CONFIGS] = {
                            actionRequestAccessDefault: {
                                allowOthers: false,
                                allowSelf: true,
                                allowBulk: false
                            },
                            RequestAccess: {
                                allowOthers: true,
                                allowSelf: true,
                                allowBulk: true
                            }
                        };

                        spyOn(accessRequestDataService, 'setAllowRequestForOthers');
                        spyOn(accessRequestDataService, 'setAllowRequestForSelf');
                        spyOn(accessRequestDataService, 'setAllowBulkRequest');
                        spyOn(accessRequestDataService, 'setInitialized');
                        spyOn(accessRequestDataService, 'setQuickLinkName').and.callThrough();
                        state.go('accessRequestSelf', { quickLink: 'RequestAccess' });
                        expect(accessRequestDataService.setQuickLinkName).toHaveBeenCalledWith('RequestAccess');
                        expect(accessRequestDataService.setAllowRequestForOthers).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setAllowRequestForSelf).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setAllowBulkRequest).toHaveBeenCalledWith(true);
                        expect(accessRequestDataService.setInitialized).toHaveBeenCalledWith(true);
                    });

                    it('should add current user to data service when self service and no identity has been loaded', function () {
                        var identities;
                        mockBacker[spConfigService.USER_ACCESS_CONFIGS] = {
                            actionRequestAccessDefault: {
                                allowOthers: false,
                                allowSelf: true,
                                allowBulk: true
                            }
                        };

                        expect(accessRequestDataService.getAccessRequest().getIdentities().length).toEqual(0);

                        spyOn(accessRequestDataService, 'isSelfService').and.callThrough();
                        spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.callThrough();

                        state.go('accessRequestSelf');

                        expect(accessRequestDataService.isSelfService()).toEqual(true);
                        expect(accessRequestDataService.getAccessRequest().addIdentity).toHaveBeenCalled();

                        identities = accessRequestDataService.getAccessRequest().getIdentities();

                        expect(identities.length).toEqual(1);

                        expect(identities[0].id).toEqual(userId);
                        expect(identities[0].name).toEqual(userName);
                        expect(identities[0].displayName).toEqual(displayName);
                        expect(identities[0].displayableName).toEqual(displayName);
                    });

                    it('should register the accessRequest flow', function () {
                        var flow;
                        expect(flowMasterService.registerFlow).toHaveBeenCalled();
                        flow = flowMasterService.registerFlow.calls.mostRecent().args[0];
                        expect(flow.name).toEqual('accessRequest');
                    });
                });

                describe('states', function () {
                    var externalState = {
                        name: ''
                    },
                        internalState = {
                        name: 'someAppState'
                    },
                        lcmState = {
                        name: 'accessRequest'
                    },
                        addState = {
                        name: 'accessRequest/manageAccess/add'
                    },
                        removeState = {
                        name: 'accessRequest/manageAccess/remove'
                    },
                        reviewState = {
                        name: 'accessRequest/review'
                    };

                    function setupLcmStateChange(requestForOther, requstForSelf) {
                        spyOn(accessRequestDataService, 'isAllowRequestForOthers').and.returnValue(requestForOther);
                        spyOn(accessRequestDataService, 'isAllowRequestForSelf').and.returnValue(requstForSelf);
                        spyOn(state, 'go');
                    }

                    function assertLcmStateChange(event, stateName) {
                        expect(event.defaultPrevented).toBeTruthy();
                        if (stateName) {
                            expect(state.go).toHaveBeenCalled();
                            expect(state.go.calls.mostRecent().args[0]).toEqual(stateName);
                        }
                    }

                    it('should redirect to home when user does not have access to lcm from an external state', function () {
                        setupLcmStateChange(false, false);
                        var event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, externalState);
                        assertLcmStateChange(event, 'home');
                    });

                    it('should cancel navigation when user does not have access to lcm from from an internal state', function () {
                        setupLcmStateChange(false, false);
                        var event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, internalState);
                        assertLcmStateChange(event);
                    });

                    it('should cancel navigation when user navigates to add access prematurely', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', addState, undefined, internalState);
                        assertLcmStateChange(event);
                    });

                    it('should cancel navigation when user navigates to remove access prematurely', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', removeState, undefined, internalState);
                        assertLcmStateChange(event);
                    });

                    it('should cancel navigation when user navigates to review access prematurely', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', reviewState, undefined, internalState);
                        assertLcmStateChange(event);
                    });

                    it('should navigate to add access when user navigates to add access from outside', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', addState, undefined, externalState);
                        assertLcmStateChange(event, 'accessRequestSelf.add');
                    });

                    it('should navigate to add access when user navigates to remove access from outside', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', removeState, undefined, externalState);
                        assertLcmStateChange(event, 'accessRequestSelf.add');
                    });

                    it('should navigate to add access when user navigates to review access from outside', function () {
                        setupLcmStateChange(false, true);
                        var event = $rootScope.$broadcast('$stateChangeStart', reviewState, undefined, externalState);
                        assertLcmStateChange(event, 'accessRequestSelf.add');
                    });

                    describe('non-self service state redirect', function () {
                        describe('from external states', function () {
                            it('should redirect to self service when user does not have access to request for others', function () {
                                setupLcmStateChange(false, true);
                                var event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, externalState);
                                assertLcmStateChange(event, 'accessRequestSelf.add');
                            });
                        });

                        describe('from internal states', function () {
                            it('should not redirect when user has access to request for others ', function () {
                                setupLcmStateChange(false, true);
                                var event = $rootScope.$broadcast('$stateChangeStart', lcmState, undefined, internalState);
                                assertLcmStateChange(event, 'accessRequestSelf');
                            });
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7Ozs7SUFBckc7O0lBUUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyx1QkFBdUIsWUFBVztnQkFDdkMsSUFBSSxhQUFhO29CQUNiLG9CQUFvQjtvQkFDaEIsZ0JBQWdCLFVBQVMsS0FBSzt3QkFDMUIsT0FBTyxXQUFXOzs7b0JBRzFCLFdBQVcsRUFBRSxLQUFLO29CQUNsQjtvQkFBTztvQkFBWTtvQkFBMEI7b0JBQWlCO29CQUFRO29CQUN0RTtvQkFBYTs7Z0JBRWpCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVUsZ0JBQWdCO29CQUNqRCxTQUFTO29CQUNULFdBQVc7b0JBQ1gsY0FBYzs7b0JBRWQsU0FBUyxTQUFTLG1CQUFtQjtvQkFDckMsU0FBUyxTQUFTLHFCQUFxQjtvQkFDdkMsU0FBUyxTQUFTLGlDQUFpQztvQkFDbkQsU0FBUyxNQUFNLGlCQUFpQjs7b0JBRWhDLG9CQUFvQjt3QkFDaEIsY0FBYyxRQUFROztvQkFFMUIsU0FBUyxNQUFNLHFCQUFxQjs7b0JBRXBDLGVBQWUsTUFBTSxRQUFROzs7Z0JBR2pDLFdBQVcsT0FBTyxVQUFTLDRCQUE0QixVQUFVLGNBQWMsbUJBQW1CO29CQUM5RixRQUFRO29CQUNSLGFBQWE7b0JBQ2IsMkJBQTJCO29CQUMzQixrQkFBa0I7Ozs7OztnQkFNdEIsU0FBUyxjQUFjLFlBQVc7O29CQUU5QixHQUFHLHFFQUFxRSxZQUFXO3dCQUMvRSxXQUFXLGdCQUFnQix1QkFBdUI7NEJBQ2hELDRCQUE0QjtnQ0FDMUIsYUFBYTtnQ0FDYixXQUFXO2dDQUNY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LHFCQUFxQjs7O29CQUd6QixHQUFHLGdGQUFnRixZQUFXO3dCQUMxRixvQkFBb0IsT0FBTzt3QkFDM0IsSUFBSSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsVUFBVSxXQUFXO3dCQUM1RSxxQkFBcUIsT0FBTzs7O29CQUdoQyxHQUFHLG1GQUFtRixZQUFXO3dCQUM3RixvQkFBb0IsT0FBTzt3QkFDM0IsSUFBSSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsYUFBYSxXQUFXO3dCQUMvRSxxQkFBcUIsT0FBTzs7O29CQUdoQyxHQUFHLG1GQUFtRixZQUFXO3dCQUM3RixvQkFBb0IsT0FBTzt3QkFDM0IsSUFBSSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsYUFBYSxXQUFXO3dCQUMvRSxxQkFBcUIsT0FBTzs7O29CQUloQyxTQUFTLG1DQUFtQyxZQUFXO3dCQUNuRCxTQUFTLHdCQUF3QixZQUFXOzRCQUN4QyxHQUFHLHdGQUF3RixZQUFXO2dDQUNsRyxvQkFBb0IsT0FBTztnQ0FDM0IsSUFBSSxRQUFRLFdBQVcsV0FBVyxxQkFBcUIsVUFBVSxXQUFXO2dDQUM1RSxxQkFBcUIsT0FBTzs7Ozt3QkFJcEMsU0FBUyx3QkFBd0IsWUFBVzs0QkFDeEMsR0FBRyxtRUFBbUUsWUFBVztnQ0FDN0Usb0JBQW9CLE9BQU87Z0NBQzNCLElBQUksUUFBUSxXQUFXLFdBQVcscUJBQXFCLFVBQVUsV0FBVztnQ0FDNUUscUJBQXFCLE9BQU87Ozs7Ozs7O0dBa0I3QyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3QgdGhlIEFjY2Vzc1JlcXVlc3RNb2R1bGVcbiAqL1xuLy9UT0RPOiBXZSBzcGxpdCB0aGlzIGludG8gc2VwYXJhdGUgZmlsZXMgKEFjY2Vzc1JlcXVlc3RSdW5uZXIsIEFjY2Vzc1JlcXVlc3RSb3V0aW5nQ29uZmlnKSwgdGVzdCBlYWNoIHdlbGxcbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0TW9kdWxlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vY2tCYWNrZXIgPSB7fSxcbiAgICAgICAgY29uZmlnU2VydmljZU1vY2sgPSB7XG4gICAgICAgICAgICBnZXRDb25maWdWYWx1ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vY2tCYWNrZXJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW9ja0hvbWUgPSB7IHVybDogJ2Zha2VIb21lJ30sXG4gICAgICAgIHN0YXRlLCAkcm9vdFNjb3BlLCBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsIHNwQ29uZmlnU2VydmljZSwgdXNlcklkLCB1c2VyTmFtZSxcbiAgICAgICAgZGlzcGxheU5hbWUsIGZsb3dNYXN0ZXJTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUsICRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgICAgIHVzZXJJZCA9ICcxMjMnO1xuICAgICAgICB1c2VyTmFtZSA9ICdqb2huLmRvZSc7XG4gICAgICAgIGRpc3BsYXlOYW1lID0gJ0pvaG5ueSBEb2UnO1xuXG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfSUQnLCB1c2VySWQpO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX05BTUUnLCB1c2VyTmFtZSk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX0RJU1BMQVlBQkxFX1VTRVJfTkFNRScsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgJHByb3ZpZGUudmFsdWUoJ2NvbmZpZ1NlcnZpY2UnLCBjb25maWdTZXJ2aWNlTW9jayk7XG5cbiAgICAgICAgZmxvd01hc3RlclNlcnZpY2UgPSB7XG4gICAgICAgICAgICByZWdpc3RlckZsb3c6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICAgICAgJHByb3ZpZGUudmFsdWUoJ2Zsb3dNYXN0ZXJTZXJ2aWNlJywgZmxvd01hc3RlclNlcnZpY2UpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywgbW9ja0hvbWUpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBfJHN0YXRlXywgXyRyb290U2NvcGVfLCBTUF9DT05GSUdfU0VSVklDRSkge1xuICAgICAgICBzdGF0ZSA9IF8kc3RhdGVfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXztcbiAgICAgICAgc3BDb25maWdTZXJ2aWNlID0gU1BfQ09ORklHX1NFUlZJQ0U7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVGVzdCB0aGUgQWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlIGluaXQgbG9naWNcbiAgICAgKi9cbiAgICBkZXNjcmliZSgnaW5pdCBsb2dpYycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgZm9yIGFjY2Vzc1JlcXVlc3QgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbW9ja0JhY2tlcltzcENvbmZpZ1NlcnZpY2UuVVNFUl9BQ0NFU1NfQ09ORklHU10gPSB7XG4gICAgICAgICAgICAgIGFjdGlvblJlcXVlc3RBY2Nlc3NEZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYWxsb3dPdGhlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxsb3dTZWxmOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsbG93QnVsazogZmFsc2VcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZXF1ZXN0QWNjZXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93T3RoZXJzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93QnVsazogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldEFsbG93UmVxdWVzdEZvck90aGVycycpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0QWxsb3dSZXF1ZXN0Rm9yU2VsZicpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0QWxsb3dCdWxrUmVxdWVzdCcpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0SW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldFF1aWNrTGlua05hbWUnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHN0YXRlLmdvKCdhY2Nlc3NSZXF1ZXN0Jywge3F1aWNrTGluazogJ1JlcXVlc3RBY2Nlc3MnfSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEFsbG93UmVxdWVzdEZvck90aGVycykudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEFsbG93UmVxdWVzdEZvclNlbGYpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRBbGxvd0J1bGtSZXF1ZXN0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0SW5pdGlhbGl6ZWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRRdWlja0xpbmtOYW1lKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnUmVxdWVzdEFjY2VzcycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlIGZvciBhY2Nlc3NSZXF1ZXN0U2VsZiBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtb2NrQmFja2VyW3NwQ29uZmlnU2VydmljZS5VU0VSX0FDQ0VTU19DT05GSUdTXSA9IHtcbiAgICAgICAgICAgICAgYWN0aW9uUmVxdWVzdEFjY2Vzc0RlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogZmFsc2UsXG4gICAgICAgICAgICAgICAgYWxsb3dTZWxmOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsbG93QnVsazogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdzZXRBbGxvd1JlcXVlc3RGb3JPdGhlcnMnKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldEFsbG93UmVxdWVzdEZvclNlbGYnKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldEluaXRpYWxpemVkJyk7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdzZXRRdWlja0xpbmtOYW1lJyk7XG4gICAgICAgICAgICBzdGF0ZS5nbygnYWNjZXNzUmVxdWVzdFNlbGYnKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0QWxsb3dSZXF1ZXN0Rm9yT3RoZXJzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEFsbG93UmVxdWVzdEZvclNlbGYpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRJbml0aWFsaXplZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldFF1aWNrTGlua05hbWUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgZm9yIGFjY2Vzc1JlcXVlc3RTZWxmIHBhZ2UgdXNpbmcgcXVpY2tMaW5rTmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbW9ja0JhY2tlcltzcENvbmZpZ1NlcnZpY2UuVVNFUl9BQ0NFU1NfQ09ORklHU10gPSB7XG4gICAgICAgICAgICAgIGFjdGlvblJlcXVlc3RBY2Nlc3NEZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgYWxsb3dPdGhlcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFsbG93U2VsZjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd0J1bGs6IGZhbHNlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFJlcXVlc3RBY2Nlc3M6IHtcbiAgICAgICAgICAgICAgICBhbGxvd090aGVyczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxsb3dCdWxrOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldEFsbG93UmVxdWVzdEZvck90aGVycycpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0QWxsb3dSZXF1ZXN0Rm9yU2VsZicpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0QWxsb3dCdWxrUmVxdWVzdCcpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnc2V0SW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3NldFF1aWNrTGlua05hbWUnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHN0YXRlLmdvKCdhY2Nlc3NSZXF1ZXN0U2VsZicsIHtxdWlja0xpbms6ICdSZXF1ZXN0QWNjZXNzJ30pO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRRdWlja0xpbmtOYW1lKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnUmVxdWVzdEFjY2VzcycpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRBbGxvd1JlcXVlc3RGb3JPdGhlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRBbGxvd1JlcXVlc3RGb3JTZWxmKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0QWxsb3dCdWxrUmVxdWVzdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnNldEluaXRpYWxpemVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgY3VycmVudCB1c2VyIHRvIGRhdGEgc2VydmljZSB3aGVuIHNlbGYgc2VydmljZSBhbmQgbm8gaWRlbnRpdHkgaGFzIGJlZW4gbG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWRlbnRpdGllcztcbiAgICAgICAgICAgIG1vY2tCYWNrZXJbc3BDb25maWdTZXJ2aWNlLlVTRVJfQUNDRVNTX0NPTkZJR1NdID0ge1xuICAgICAgICAgICAgICBhY3Rpb25SZXF1ZXN0QWNjZXNzRGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIGFsbG93T3RoZXJzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhbGxvd1NlbGY6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxsb3dCdWxrOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldElkZW50aXRpZXMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG5cbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzU2VsZlNlcnZpY2UnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRJZGVudGl0eScpLmFuZC5jYWxsVGhyb3VnaCgpO1xuXG4gICAgICAgICAgICBzdGF0ZS5nbygnYWNjZXNzUmVxdWVzdFNlbGYnKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5pc1NlbGZTZXJ2aWNlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICBpZGVudGl0aWVzID0gYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5nZXRJZGVudGl0aWVzKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0aWVzLmxlbmd0aCkudG9FcXVhbCgxKTtcblxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXRpZXNbMF0uaWQpLnRvRXF1YWwodXNlcklkKTtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0aWVzWzBdLm5hbWUpLnRvRXF1YWwodXNlck5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXRpZXNbMF0uZGlzcGxheU5hbWUpLnRvRXF1YWwoZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXRpZXNbMF0uZGlzcGxheWFibGVOYW1lKS50b0VxdWFsKGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWdpc3RlciB0aGUgYWNjZXNzUmVxdWVzdCBmbG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZmxvdztcbiAgICAgICAgICAgIGV4cGVjdChmbG93TWFzdGVyU2VydmljZS5yZWdpc3RlckZsb3cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGZsb3cgPSBmbG93TWFzdGVyU2VydmljZS5yZWdpc3RlckZsb3cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XG4gICAgICAgICAgICBleHBlY3QoZmxvdy5uYW1lKS50b0VxdWFsKCdhY2Nlc3NSZXF1ZXN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0YXRlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGludGVybmFsU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWVBcHBTdGF0ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsY21TdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWNjZXNzUmVxdWVzdCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYWNjZXNzUmVxdWVzdC9tYW5hZ2VBY2Nlc3MvYWRkJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZVN0YXRlID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdhY2Nlc3NSZXF1ZXN0L21hbmFnZUFjY2Vzcy9yZW1vdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmV2aWV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FjY2Vzc1JlcXVlc3QvcmV2aWV3J1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXR1cExjbVN0YXRlQ2hhbmdlKHJlcXVlc3RGb3JPdGhlciwgcmVxdXN0Rm9yU2VsZikge1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnaXNBbGxvd1JlcXVlc3RGb3JPdGhlcnMnKS5hbmQucmV0dXJuVmFsdWUocmVxdWVzdEZvck90aGVyKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ2lzQWxsb3dSZXF1ZXN0Rm9yU2VsZicpLmFuZC5yZXR1cm5WYWx1ZShyZXF1c3RGb3JTZWxmKTtcbiAgICAgICAgICAgIHNweU9uKHN0YXRlLCAnZ28nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCBzdGF0ZU5hbWUpIHtcbiAgICAgICAgICAgIGV4cGVjdChldmVudC5kZWZhdWx0UHJldmVudGVkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBpZihzdGF0ZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoc3RhdGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgcmVkaXJlY3QgdG8gaG9tZSB3aGVuIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gbGNtIGZyb20gYW4gZXh0ZXJuYWwgc3RhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldHVwTGNtU3RhdGVDaGFuZ2UoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBsY21TdGF0ZSwgdW5kZWZpbmVkLCBleHRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCAnaG9tZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbmNlbCBuYXZpZ2F0aW9uIHdoZW4gdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBsY20gZnJvbSBmcm9tIGFuIGludGVybmFsIHN0YXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR1cExjbVN0YXRlQ2hhbmdlKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgbGNtU3RhdGUsIHVuZGVmaW5lZCwgaW50ZXJuYWxTdGF0ZSk7XG4gICAgICAgICAgICBhc3NlcnRMY21TdGF0ZUNoYW5nZShldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FuY2VsIG5hdmlnYXRpb24gd2hlbiB1c2VyIG5hdmlnYXRlcyB0byBhZGQgYWNjZXNzIHByZW1hdHVyZWx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR1cExjbVN0YXRlQ2hhbmdlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBhZGRTdGF0ZSwgdW5kZWZpbmVkLCBpbnRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYW5jZWwgbmF2aWdhdGlvbiB3aGVuIHVzZXIgbmF2aWdhdGVzIHRvIHJlbW92ZSBhY2Nlc3MgcHJlbWF0dXJlbHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNldHVwTGNtU3RhdGVDaGFuZ2UoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gJHJvb3RTY29wZS4kYnJvYWRjYXN0KCckc3RhdGVDaGFuZ2VTdGFydCcsIHJlbW92ZVN0YXRlLCB1bmRlZmluZWQsIGludGVybmFsU3RhdGUpO1xuICAgICAgICAgICAgYXNzZXJ0TGNtU3RhdGVDaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbmNlbCBuYXZpZ2F0aW9uIHdoZW4gdXNlciBuYXZpZ2F0ZXMgdG8gcmV2aWV3IGFjY2VzcyBwcmVtYXR1cmVseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0dXBMY21TdGF0ZUNoYW5nZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgcmV2aWV3U3RhdGUsIHVuZGVmaW5lZCwgaW50ZXJuYWxTdGF0ZSk7XG4gICAgICAgICAgICBhc3NlcnRMY21TdGF0ZUNoYW5nZShldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gYWRkIGFjY2VzcyB3aGVuIHVzZXIgbmF2aWdhdGVzIHRvIGFkZCBhY2Nlc3MgZnJvbSBvdXRzaWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR1cExjbVN0YXRlQ2hhbmdlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBhZGRTdGF0ZSwgdW5kZWZpbmVkLCBleHRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCAnYWNjZXNzUmVxdWVzdFNlbGYuYWRkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gYWRkIGFjY2VzcyB3aGVuIHVzZXIgbmF2aWdhdGVzIHRvIHJlbW92ZSBhY2Nlc3MgZnJvbSBvdXRzaWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR1cExjbVN0YXRlQ2hhbmdlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCByZW1vdmVTdGF0ZSwgdW5kZWZpbmVkLCBleHRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCAnYWNjZXNzUmVxdWVzdFNlbGYuYWRkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gYWRkIGFjY2VzcyB3aGVuIHVzZXIgbmF2aWdhdGVzIHRvIHJldmlldyBhY2Nlc3MgZnJvbSBvdXRzaWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR1cExjbVN0YXRlQ2hhbmdlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCByZXZpZXdTdGF0ZSwgdW5kZWZpbmVkLCBleHRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCAnYWNjZXNzUmVxdWVzdFNlbGYuYWRkJyk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgZGVzY3JpYmUoJ25vbi1zZWxmIHNlcnZpY2Ugc3RhdGUgcmVkaXJlY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlKCdmcm9tIGV4dGVybmFsIHN0YXRlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGl0KCdzaG91bGQgcmVkaXJlY3QgdG8gc2VsZiBzZXJ2aWNlIHdoZW4gdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byByZXF1ZXN0IGZvciBvdGhlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dXBMY21TdGF0ZUNoYW5nZShmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9ICRyb290U2NvcGUuJGJyb2FkY2FzdCgnJHN0YXRlQ2hhbmdlU3RhcnQnLCBsY21TdGF0ZSwgdW5kZWZpbmVkLCBleHRlcm5hbFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0TGNtU3RhdGVDaGFuZ2UoZXZlbnQsICdhY2Nlc3NSZXF1ZXN0U2VsZi5hZGQnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZXNjcmliZSgnZnJvbSBpbnRlcm5hbCBzdGF0ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCByZWRpcmVjdCB3aGVuIHVzZXIgaGFzIGFjY2VzcyB0byByZXF1ZXN0IGZvciBvdGhlcnMgJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHVwTGNtU3RhdGVDaGFuZ2UoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJyRzdGF0ZUNoYW5nZVN0YXJ0JywgbGNtU3RhdGUsIHVuZGVmaW5lZCwgaW50ZXJuYWxTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydExjbVN0YXRlQ2hhbmdlKGV2ZW50LCAnYWNjZXNzUmVxdWVzdFNlbGYnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
