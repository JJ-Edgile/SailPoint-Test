System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ManageAccountCtrl', function () {
                var $controller = undefined,
                    $scope = undefined,
                    $rootScope = undefined,
                    $stateParams = undefined,
                    manageAccountDataService = undefined,
                    spModal = undefined,
                    manageAccountService = undefined,
                    $q = undefined,
                    identityService = undefined,
                    $httpBackend = undefined,
                    configUrl = undefined,
                    testService = undefined,
                    AccountLink = undefined,
                    WorkflowResultItem = undefined,
                    account = undefined,
                    status = undefined,
                    QuickLink = undefined,
                    timeoutService = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 16 */
                beforeEach(inject(function (_$controller_, _manageAccountDataService_, _$rootScope_, _$stateParams_, _spModal_, _manageAccountService_, _$q_, _identityService_, _$httpBackend_, _testService_, _AccountLink_, _WorkflowResultItem_, _QuickLink_, ListResultDTO, configService, _$timeout_) {
                    $controller = _$controller_;
                    manageAccountDataService = _manageAccountDataService_;
                    manageAccountService = _manageAccountService_;
                    identityService = _identityService_;
                    $scope = _$rootScope_.$new();
                    $stateParams = _$stateParams_;
                    $q = _$q_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    testService = _testService_;
                    AccountLink = _AccountLink_;
                    WorkflowResultItem = _WorkflowResultItem_;
                    QuickLink = _QuickLink_;
                    timeoutService = _$timeout_;
                    configUrl = '/ui/rest/configuration/uiconfig/entries?key=manageAccountLinkColConfig';

                    // Mock the manageAccountService to return a single account.
                    status = 'double platinum';
                    account = new AccountLink({
                        id: '12345',
                        status: status
                    });
                    spyOn(manageAccountService, 'getManageAccounts').and.callFake(function () {
                        return $q.when({
                            data: new ListResultDTO({
                                count: 1,
                                objects: [account]
                            })
                        });
                    });

                    // Mock fake configs to avoid HTTP calls.
                    spyOn(manageAccountService, 'getCreateAccountConfig').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });
                    spyOn(configService, 'getColumnConfigEntries').and.returnValue($q.when({ data: {} }));

                    var map = {},
                        qlData = { name: 'accountQuickLinkName' };
                    map[QuickLink.Actions.MANAGE_ACCOUNTS] = new QuickLink(qlData);
                    identityService.getAvailableActionsMap = function () {
                        return map;
                    };
                }));

                function createController() {
                    $stateParams.identityId = 'someId';
                    $stateParams.quickLink = 'accountQuickLinkName';
                    return $controller('ManageAccountCtrl', {
                        $scope: $scope,
                        $stateParams: $stateParams,
                        manageAccountDataService: manageAccountDataService
                    });
                }

                describe('account refresh', function () {
                    var foundLink = undefined,
                        notFoundLink = undefined;

                    beforeEach(function () {
                        foundLink = new AccountLink({
                            id: account.id,
                            status: 'i am an updated status'
                        });

                        notFoundLink = new AccountLink({
                            id: 'this ID will not be found anywhere',
                            status: 'blurghhthhhhh'
                        });
                    });

                    it('registers controller with the AccountRefreshTracker when constructed', function () {
                        var tracker = manageAccountDataService.getAccountRefreshTracker();
                        spyOn(tracker, 'registerRefreshListener');
                        var ctrl = createController();
                        expect(tracker.registerRefreshListener).toHaveBeenCalledWith(ctrl);
                    });

                    it('unregisters controller from the AccountRefreshTracker when destroyed', function () {
                        var tracker = manageAccountDataService.getAccountRefreshTracker();
                        spyOn(tracker, 'unregisterRefreshListener');
                        var ctrl = createController();
                        $scope.$destroy();
                        expect(tracker.unregisterRefreshListener).toHaveBeenCalledWith(ctrl);
                    });

                    describe('linkRefreshed()', function () {
                        it('does nothing if link is not in the list anymore', function () {
                            var ctrl = createController();
                            $scope.$digest();
                            ctrl.linkRefreshed(notFoundLink);
                            expect(account.status).toEqual(status);
                        });

                        it('updates the link in the list with the updated properties', function () {
                            var ctrl = createController();
                            $scope.$digest();
                            ctrl.linkRefreshed(foundLink);
                            expect(account.status).toEqual(foundLink.status);
                        });
                    });

                    describe('linkDeleted()', function () {
                        it('does nothing if link is not in the list anymore', function () {
                            var ctrl = createController();
                            $scope.$digest();
                            ctrl.linkDeleted(notFoundLink);
                            expect(account.deleted).toBeFalsy();
                        });

                        it('marks the link in the list as deleted', function () {
                            var ctrl = createController();
                            $scope.$digest();
                            ctrl.linkDeleted(foundLink.id);
                            expect(account.deleted).toEqual(true);
                        });
                    });
                });

                describe('auto-refresh', function () {
                    var isBeingTracked = undefined;

                    beforeEach(function () {
                        // Make the account that gets returned be setup to auto-refresh.
                        account.supportsRefresh = true;
                        account.autoRefresh = true;

                        // Mock the AccountRefreshTracker to return our values.
                        isBeingTracked = false;
                        var tracker = manageAccountDataService.getAccountRefreshTracker();
                        spyOn(tracker, 'isBeingTracked').and.callFake(function () {
                            return isBeingTracked;
                        });

                        // Also, watch for any accounts that are being refreshed.
                        spyOn(tracker, 'accountsBeingRefreshed');

                        // Neuter the refreshLink() call.
                        spyOn(manageAccountService, 'refreshLinks').and.returnValue($q.when([{ i: 'am a result' }]));
                    });

                    function checkRefresh(expectIt) {
                        var tracker = manageAccountDataService.getAccountRefreshTracker();

                        if (expectIt) {
                            expect(manageAccountService.refreshLinks).toHaveBeenCalledWith($stateParams.quickLink, $stateParams.identityId, [account.id]);

                            expect(tracker.accountsBeingRefreshed).toHaveBeenCalled();
                            var accountsBeingRefreshed = tracker.accountsBeingRefreshed.calls.mostRecent().args[0];
                            expect(accountsBeingRefreshed).toEqual([account.id]);
                        } else {
                            expect(manageAccountService.refreshLinks).not.toHaveBeenCalled();
                            expect(tracker.accountsBeingRefreshed).not.toHaveBeenCalled();
                        }
                    }

                    it('ignores accounts that are not setup for autoRefresh', function () {
                        // Turn off auto-refresh for the account being returned.
                        account.autoRefresh = false;

                        // This loads the items, which will try to auto-refresh.
                        createController();
                        $scope.$digest();

                        // Check that nothing happened.
                        checkRefresh(false);
                    });

                    it('ignores accounts that have been tracked', function () {
                        // Make the account appear to have been tracked.
                        isBeingTracked = true;

                        // This loads the items, which will try to auto-refresh.
                        createController();
                        $scope.$digest();

                        // Check that nothing happened.
                        checkRefresh(false);
                    });

                    it('refreshes accounts that can be refreshed but have not been refreshed yet', function () {
                        // This loads the items, which will try to auto-refresh.
                        createController();
                        $scope.$digest();

                        // Check that nothing happened.
                        checkRefresh(true);
                    });
                });

                describe('isExpanded', function () {
                    it('should call through to manageAccountDataService and return result', function () {
                        var item = { id: 123 },
                            ctrl = createController(),
                            expectedResult = true,
                            actualResult = undefined;
                        spyOn(manageAccountDataService, 'isExpanded').and.returnValue(expectedResult);
                        actualResult = ctrl.isExpanded(item);
                        expect(manageAccountDataService.isExpanded).toHaveBeenCalledWith(item);
                        expect(actualResult).toBe(expectedResult);
                    });
                });

                describe('toggleExpanded', function () {
                    it('should call through to manageAccountDataService', function () {
                        var item = { id: 123 },
                            ctrl = createController();
                        spyOn(manageAccountDataService, 'toggleExpanded');
                        ctrl.toggleExpanded(item);
                        expect(manageAccountDataService.toggleExpanded).toHaveBeenCalledWith(item);
                    });
                });

                it('should call through to manageAccountDataService to determine if dirty', function () {
                    spyOn(manageAccountDataService, 'isDirty').and.callThrough();
                    var ctrl = createController();
                    ctrl.isDirty();
                    expect(manageAccountDataService.isDirty).toHaveBeenCalled();
                });

                it('should call the open create account modal function if promptCreateAccount clicked', function () {
                    var deferred = $q.defer();
                    spyOn(identityService, 'getIdentity').and.returnValue(deferred.promise);
                    spyOn(spModal, 'open').and.returnValue(deferred.promise);
                    $httpBackend.expectGET(configUrl).respond(200, {});
                    var ctrl = createController();
                    ctrl.promptCreateAccount();
                    $rootScope.$apply();
                    expect(spModal.open).toHaveBeenCalled();
                });

                describe('promptAccountActionMobile', function () {
                    it('should call the open account action modal function if promptAccountActionMobile clicked', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var deferred = $q.defer();
                        spyOn(spModal, 'open').and.returnValue({
                            result: deferred.promise
                        });
                        deferred.resolve(new WorkflowResultItem({}));
                        var ctrl = createController();
                        $rootScope.$apply();
                        spyOn(ctrl, 'fetchItems').and.returnValue($q.when());
                        spyOn(ctrl, 'updateMenuItems').and.callFake(angular.noop);

                        ctrl.promptAccountActionMobile(new AccountLink({}), {});
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(ctrl.fetchItems).toHaveBeenCalled();
                        expect(ctrl.updateMenuItems).toHaveBeenCalled();
                    });
                });

                describe('constructor', function () {
                    it('should open error dialog when quicklink is not definded', function () {
                        identityService.getAvailableActionsMap = function () {
                            return {};
                        };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });
                        spyOn(identityService, 'goBack').and.returnValue({});
                        createController();
                        timeoutService.flush();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(identityService.goBack).toHaveBeenCalled();
                        var callArgs = spModal.open.calls.mostRecent().args;
                        expect(callArgs[0].title).toEqual('ui_identity_error_unable_to_manage_id_title');
                        expect(callArgs[0].warningLevel).toEqual('error');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnRDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSTdHOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMscUJBQXFCLFlBQVc7Z0JBQ3JDLElBQUksY0FBVztvQkFBRSxTQUFNO29CQUFFLGFBQVU7b0JBQUUsZUFBWTtvQkFBRSwyQkFBd0I7b0JBQUUsVUFBTztvQkFBRSx1QkFBb0I7b0JBQUUsS0FBRTtvQkFDMUcsa0JBQWU7b0JBQUUsZUFBWTtvQkFBRSxZQUFTO29CQUFFLGNBQVc7b0JBQUUsY0FBVztvQkFBRSxxQkFBa0I7b0JBQUUsVUFBTztvQkFBRSxTQUFNO29CQUN2RyxZQUFTO29CQUFFLGlCQUFjOztnQkFFN0IsV0FBVyxPQUFPLGdCQUFnQjs7O2dCQUdsQyxXQUFXLE9BQU8sVUFBUyxlQUFlLDRCQUE0QixjQUFjLGdCQUFnQixXQUN6RSx3QkFBd0IsTUFBTSxtQkFBbUIsZ0JBQWdCLGVBQ2pFLGVBQWUsc0JBQXNCLGFBQWEsZUFBZSxlQUNqRSxZQUFZO29CQUNuQyxjQUFjO29CQUNkLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2QixrQkFBa0I7b0JBQ2xCLFNBQVMsYUFBYTtvQkFDdEIsZUFBZTtvQkFDZixLQUFLO29CQUNMLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixlQUFlO29CQUNmLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixZQUFZOzs7b0JBR1osU0FBUztvQkFDVCxVQUFVLElBQUks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YWdlQWNjb3VudEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ01hbmFnZUFjY291bnRDdHJsJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGNvbnRyb2xsZXIsICRzY29wZSwgJHJvb3RTY29wZSwgJHN0YXRlUGFyYW1zLCBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsIHNwTW9kYWwsIG1hbmFnZUFjY291bnRTZXJ2aWNlLCAkcSxcclxuICAgICAgICBpZGVudGl0eVNlcnZpY2UsICRodHRwQmFja2VuZCwgY29uZmlnVXJsLCB0ZXN0U2VydmljZSwgQWNjb3VudExpbmssIFdvcmtmbG93UmVzdWx0SXRlbSwgYWNjb3VudCwgc3RhdHVzLFxyXG4gICAgICAgIFF1aWNrTGluaywgdGltZW91dFNlcnZpY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxNiAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgX21hbmFnZUFjY291bnREYXRhU2VydmljZV8sIF8kcm9vdFNjb3BlXywgXyRzdGF0ZVBhcmFtc18sIF9zcE1vZGFsXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYW5hZ2VBY2NvdW50U2VydmljZV8sIF8kcV8sIF9pZGVudGl0eVNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXywgX3Rlc3RTZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9BY2NvdW50TGlua18sIF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fLCBfUXVpY2tMaW5rXywgTGlzdFJlc3VsdERUTywgY29uZmlnU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kdGltZW91dF8pIHtcclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlID0gX21hbmFnZUFjY291bnREYXRhU2VydmljZV87XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudFNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5U2VydmljZSA9IF9pZGVudGl0eVNlcnZpY2VfO1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgQWNjb3VudExpbmsgPSBfQWNjb3VudExpbmtfO1xyXG4gICAgICAgIFdvcmtmbG93UmVzdWx0SXRlbSA9IF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fO1xyXG4gICAgICAgIFF1aWNrTGluayA9IF9RdWlja0xpbmtfO1xyXG4gICAgICAgIHRpbWVvdXRTZXJ2aWNlID0gXyR0aW1lb3V0XztcclxuICAgICAgICBjb25maWdVcmwgPSAnL3VpL3Jlc3QvY29uZmlndXJhdGlvbi91aWNvbmZpZy9lbnRyaWVzP2tleT1tYW5hZ2VBY2NvdW50TGlua0NvbENvbmZpZyc7XHJcblxyXG4gICAgICAgIC8vIE1vY2sgdGhlIG1hbmFnZUFjY291bnRTZXJ2aWNlIHRvIHJldHVybiBhIHNpbmdsZSBhY2NvdW50LlxyXG4gICAgICAgIHN0YXR1cyA9ICdkb3VibGUgcGxhdGludW0nO1xyXG4gICAgICAgIGFjY291bnQgPSBuZXcgQWNjb3VudExpbmsoe1xyXG4gICAgICAgICAgICBpZDogJzEyMzQ1JyxcclxuICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ2dldE1hbmFnZUFjY291bnRzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgTGlzdFJlc3VsdERUTyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogWyBhY2NvdW50IF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNb2NrIGZha2UgY29uZmlncyB0byBhdm9pZCBIVFRQIGNhbGxzLlxyXG4gICAgICAgIHNweU9uKG1hbmFnZUFjY291bnRTZXJ2aWNlLCAnZ2V0Q3JlYXRlQWNjb3VudENvbmZpZycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3B5T24oY29uZmlnU2VydmljZSwgJ2dldENvbHVtbkNvbmZpZ0VudHJpZXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7IGRhdGE6IHt9IH0pKTtcclxuXHJcbiAgICAgICAgbGV0IG1hcCA9IHt9LFxyXG4gICAgICAgICAgICBxbERhdGEgPSB7bmFtZTogJ2FjY291bnRRdWlja0xpbmtOYW1lJ307XHJcbiAgICAgICAgbWFwW1F1aWNrTGluay5BY3Rpb25zLk1BTkFHRV9BQ0NPVU5UU10gPSBuZXcgUXVpY2tMaW5rKHFsRGF0YSk7XHJcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlLmdldEF2YWlsYWJsZUFjdGlvbnNNYXAgPSBmdW5jdGlvbigpIHsgcmV0dXJuIG1hcDt9O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zLmlkZW50aXR5SWQgPSAnc29tZUlkJztcclxuICAgICAgICAkc3RhdGVQYXJhbXMucXVpY2tMaW5rID0gJ2FjY291bnRRdWlja0xpbmtOYW1lJztcclxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ01hbmFnZUFjY291bnRDdHJsJywge1xyXG4gICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcclxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXHJcbiAgICAgICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZTogbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FjY291bnQgcmVmcmVzaCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZm91bmRMaW5rLCBub3RGb3VuZExpbms7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3VuZExpbmsgPSBuZXcgQWNjb3VudExpbmsoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGFjY291bnQuaWQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdpIGFtIGFuIHVwZGF0ZWQgc3RhdHVzJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5vdEZvdW5kTGluayA9IG5ldyBBY2NvdW50TGluayh7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3RoaXMgSUQgd2lsbCBub3QgYmUgZm91bmQgYW55d2hlcmUnLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnYmx1cmdoaHRoaGhoaCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZWdpc3RlcnMgY29udHJvbGxlciB3aXRoIHRoZSBBY2NvdW50UmVmcmVzaFRyYWNrZXIgd2hlbiBjb25zdHJ1Y3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrZXIgPSBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuZ2V0QWNjb3VudFJlZnJlc2hUcmFja2VyKCk7XHJcbiAgICAgICAgICAgIHNweU9uKHRyYWNrZXIsICdyZWdpc3RlclJlZnJlc2hMaXN0ZW5lcicpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIucmVnaXN0ZXJSZWZyZXNoTGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN0cmwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndW5yZWdpc3RlcnMgY29udHJvbGxlciBmcm9tIHRoZSBBY2NvdW50UmVmcmVzaFRyYWNrZXIgd2hlbiBkZXN0cm95ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFja2VyID0gbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmdldEFjY291bnRSZWZyZXNoVHJhY2tlcigpO1xyXG4gICAgICAgICAgICBzcHlPbih0cmFja2VyLCAndW5yZWdpc3RlclJlZnJlc2hMaXN0ZW5lcicpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0cmFja2VyLnVucmVnaXN0ZXJSZWZyZXNoTGlzdGVuZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN0cmwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnbGlua1JlZnJlc2hlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIGxpbmsgaXMgbm90IGluIHRoZSBsaXN0IGFueW1vcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmxpbmtSZWZyZXNoZWQobm90Rm91bmRMaW5rKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2NvdW50LnN0YXR1cykudG9FcXVhbChzdGF0dXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCd1cGRhdGVzIHRoZSBsaW5rIGluIHRoZSBsaXN0IHdpdGggdGhlIHVwZGF0ZWQgcHJvcGVydGllcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwubGlua1JlZnJlc2hlZChmb3VuZExpbmspO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY291bnQuc3RhdHVzKS50b0VxdWFsKGZvdW5kTGluay5zdGF0dXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2xpbmtEZWxldGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgbGluayBpcyBub3QgaW4gdGhlIGxpc3QgYW55bW9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwubGlua0RlbGV0ZWQobm90Rm91bmRMaW5rKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2NvdW50LmRlbGV0ZWQpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdtYXJrcyB0aGUgbGluayBpbiB0aGUgbGlzdCBhcyBkZWxldGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5saW5rRGVsZXRlZChmb3VuZExpbmsuaWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY291bnQuZGVsZXRlZCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYXV0by1yZWZyZXNoJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBpc0JlaW5nVHJhY2tlZDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIGFjY291bnQgdGhhdCBnZXRzIHJldHVybmVkIGJlIHNldHVwIHRvIGF1dG8tcmVmcmVzaC5cclxuICAgICAgICAgICAgYWNjb3VudC5zdXBwb3J0c1JlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBhY2NvdW50LmF1dG9SZWZyZXNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vY2sgdGhlIEFjY291bnRSZWZyZXNoVHJhY2tlciB0byByZXR1cm4gb3VyIHZhbHVlcy5cclxuICAgICAgICAgICAgaXNCZWluZ1RyYWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHRyYWNrZXIgPSBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuZ2V0QWNjb3VudFJlZnJlc2hUcmFja2VyKCk7XHJcbiAgICAgICAgICAgIHNweU9uKHRyYWNrZXIsICdpc0JlaW5nVHJhY2tlZCcpLmFuZC5jYWxsRmFrZSgoKSA9PiBpc0JlaW5nVHJhY2tlZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbHNvLCB3YXRjaCBmb3IgYW55IGFjY291bnRzIHRoYXQgYXJlIGJlaW5nIHJlZnJlc2hlZC5cclxuICAgICAgICAgICAgc3B5T24odHJhY2tlciwgJ2FjY291bnRzQmVpbmdSZWZyZXNoZWQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5ldXRlciB0aGUgcmVmcmVzaExpbmsoKSBjYWxsLlxyXG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ3JlZnJlc2hMaW5rcycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKFsgeyBpOiAnYW0gYSByZXN1bHQnIH0gXSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja1JlZnJlc2goZXhwZWN0SXQpIHtcclxuICAgICAgICAgICAgbGV0IHRyYWNrZXIgPSBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuZ2V0QWNjb3VudFJlZnJlc2hUcmFja2VyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXhwZWN0SXQpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50U2VydmljZS5yZWZyZXNoTGlua3MpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKCRzdGF0ZVBhcmFtcy5xdWlja0xpbmssICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkLCBbIGFjY291bnQuaWQgXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuYWNjb3VudHNCZWluZ1JlZnJlc2hlZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY291bnRzQmVpbmdSZWZyZXNoZWQgPSB0cmFja2VyLmFjY291bnRzQmVpbmdSZWZyZXNoZWQuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjb3VudHNCZWluZ1JlZnJlc2hlZCkudG9FcXVhbChbIGFjY291bnQuaWQgXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudFNlcnZpY2UucmVmcmVzaExpbmtzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRyYWNrZXIuYWNjb3VudHNCZWluZ1JlZnJlc2hlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lnbm9yZXMgYWNjb3VudHMgdGhhdCBhcmUgbm90IHNldHVwIGZvciBhdXRvUmVmcmVzaCcsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gVHVybiBvZmYgYXV0by1yZWZyZXNoIGZvciB0aGUgYWNjb3VudCBiZWluZyByZXR1cm5lZC5cclxuICAgICAgICAgICAgYWNjb3VudC5hdXRvUmVmcmVzaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBsb2FkcyB0aGUgaXRlbXMsIHdoaWNoIHdpbGwgdHJ5IHRvIGF1dG8tcmVmcmVzaC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBub3RoaW5nIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICBjaGVja1JlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaWdub3JlcyBhY2NvdW50cyB0aGF0IGhhdmUgYmVlbiB0cmFja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBhY2NvdW50IGFwcGVhciB0byBoYXZlIGJlZW4gdHJhY2tlZC5cclxuICAgICAgICAgICAgaXNCZWluZ1RyYWNrZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBsb2FkcyB0aGUgaXRlbXMsIHdoaWNoIHdpbGwgdHJ5IHRvIGF1dG8tcmVmcmVzaC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBub3RoaW5nIGhhcHBlbmVkLlxyXG4gICAgICAgICAgICBjaGVja1JlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVmcmVzaGVzIGFjY291bnRzIHRoYXQgY2FuIGJlIHJlZnJlc2hlZCBidXQgaGF2ZSBub3QgYmVlbiByZWZyZXNoZWQgeWV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUaGlzIGxvYWRzIHRoZSBpdGVtcywgd2hpY2ggd2lsbCB0cnkgdG8gYXV0by1yZWZyZXNoLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IG5vdGhpbmcgaGFwcGVuZWQuXHJcbiAgICAgICAgICAgIGNoZWNrUmVmcmVzaCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc0V4cGFuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlIGFuZCByZXR1cm4gcmVzdWx0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0ge2lkOiAxMjN9LFxyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkUmVzdWx0ID0gdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFjdHVhbFJlc3VsdDtcclxuICAgICAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLCAnaXNFeHBhbmRlZCcpLmFuZC5yZXR1cm5WYWx1ZShleHBlY3RlZFJlc3VsdCk7XHJcbiAgICAgICAgICAgIGFjdHVhbFJlc3VsdCA9IGN0cmwuaXNFeHBhbmRlZChpdGVtKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5pc0V4cGFuZGVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbFJlc3VsdCkudG9CZShleHBlY3RlZFJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgndG9nZ2xlRXhwYW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7aWQ6IDEyM30sXHJcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsICd0b2dnbGVFeHBhbmRlZCcpO1xyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZUV4cGFuZGVkKGl0ZW0pO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnRvZ2dsZUV4cGFuZGVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIG1hbmFnZUFjY291bnREYXRhU2VydmljZSB0byBkZXRlcm1pbmUgaWYgZGlydHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UsICdpc0RpcnR5JykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgY3RybC5pc0RpcnR5KCk7XHJcbiAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5pc0RpcnR5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIG9wZW4gY3JlYXRlIGFjY291bnQgbW9kYWwgZnVuY3Rpb24gaWYgcHJvbXB0Q3JlYXRlQWNjb3VudCBjbGlja2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcclxuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcclxuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGNvbmZpZ1VybCkucmVzcG9uZCgyMDAsIHt9KTtcclxuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICBjdHJsLnByb21wdENyZWF0ZUFjY291bnQoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdwcm9tcHRBY2NvdW50QWN0aW9uTW9iaWxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBvcGVuIGFjY291bnQgYWN0aW9uIG1vZGFsIGZ1bmN0aW9uIGlmIHByb21wdEFjY291bnRBY3Rpb25Nb2JpbGUgY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGNvbmZpZ1VybCkucmVzcG9uZCgyMDAsIHt9KTtcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBkZWZlcnJlZC5wcm9taXNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe30pKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdmZXRjaEl0ZW1zJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICd1cGRhdGVNZW51SXRlbXMnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwucHJvbXB0QWNjb3VudEFjdGlvbk1vYmlsZShuZXcgQWNjb3VudExpbmsoe30pLCB7fSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZmV0Y2hJdGVtcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC51cGRhdGVNZW51SXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBlcnJvciBkaWFsb2cgd2hlbiBxdWlja2xpbmsgaXMgbm90IGRlZmluZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRBdmFpbGFibGVBY3Rpb25zTWFwID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTt9O1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7cmVzdWx0OiAkcS53aGVuKCl9KTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAnZ29CYWNrJykuYW5kLnJldHVyblZhbHVlKHt9KTtcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICB0aW1lb3V0U2VydmljZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UuZ29CYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBjYWxsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLnRpdGxlKS50b0VxdWFsKCd1aV9pZGVudGl0eV9lcnJvcl91bmFibGVfdG9fbWFuYWdlX2lkX3RpdGxlJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXS53YXJuaW5nTGV2ZWwpLnRvRXF1YWwoJ2Vycm9yJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
