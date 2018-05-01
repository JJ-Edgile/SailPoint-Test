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

            describe('ManagePasswordCtrl', function () {

                var quickLink = 'Manage%20Passwords';
                var $stateParams = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    managePasswordService = undefined,
                    identityId = undefined,
                    identityService = undefined,
                    managePasswordDataService = undefined,
                    navigationService = undefined,
                    spModal = undefined,
                    $q = undefined,
                    testService = undefined,
                    CheckboxMultiSelect = undefined,
                    ListResultDTO = undefined,
                    BulkPasswordChangeResult = undefined,
                    LINK_ID_ONE = 1,
                    LINK_ID_TWO = 2,
                    LINK_ONE = undefined,
                    LINK_TWO = undefined,
                    $httpBackend = undefined,
                    configUrl = undefined,
                    QuickLink = undefined,
                    timeoutService = undefined;

                beforeEach(module(identityModule, testModule));

                /* jshint maxparams: 16 */
                beforeEach(inject(function (_$controller_, _managePasswordService_, _$q_, _QuickLink_, _identityService_, PasswordLink, _$rootScope_, _spModal_, _navigationService_, _testService_, _managePasswordDataService_, _CheckboxMultiSelect_, _ListResultDTO_, _BulkPasswordChangeResult_, _$httpBackend_, _$timeout_) {

                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    $httpBackend = _$httpBackend_;
                    managePasswordService = _managePasswordService_;
                    managePasswordDataService = _managePasswordDataService_;
                    CheckboxMultiSelect = _CheckboxMultiSelect_;
                    ListResultDTO = _ListResultDTO_;
                    BulkPasswordChangeResult = _BulkPasswordChangeResult_;
                    navigationService = _navigationService_;
                    identityService = _identityService_;
                    spModal = _spModal_;
                    $q = _$q_;
                    testService = _testService_;
                    QuickLink = _QuickLink_;
                    identityService = _identityService_;
                    timeoutService = _$timeout_;
                    identityId = '1234';
                    configUrl = '/ui/rest/configuration/uiconfig/entries?key=managePasswordLinkColConfig';

                    // Create some mock data
                    $stateParams = {
                        identityId: identityId,
                        quickLink: 'Manage%20Passwords'

                    };
                    spyOn(managePasswordService, 'getManagePasswordAccounts').and.callFake(function () {
                        return testService.createPromise(false, {}, {});
                    });

                    LINK_ONE = {
                        getId: function () {
                            return LINK_ID_ONE;
                        }
                    };
                    LINK_TWO = {
                        getId: function () {
                            return LINK_ID_TWO;
                        }
                    };
                    var map = {},
                        qlData = { name: 'Manage%20Passwords' };
                    map[QuickLink.Actions.MANAGE_PASSWORDS] = new QuickLink(qlData);
                    identityService.getAvailableActionsMap = function () {
                        return map;
                    };
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    var ctrl = $controller('ManagePasswordCtrl', {
                        $scope: $scope,
                        managePasswordService: managePasswordService,
                        managePasswordDataService: managePasswordDataService,
                        $stateParams: $stateParams,
                        CheckboxMultiSelect: CheckboxMultiSelect
                    }),
                        listResult = undefined;

                    listResult = new ListResultDTO({
                        count: 2,
                        objects: [LINK_ONE, LINK_TWO]
                    });

                    ctrl.linkListResultDTO = listResult;
                    return ctrl;
                }

                describe('constructor', function () {
                    it('throws if identity ID is missing', function () {
                        delete $stateParams.identityId;
                        expect(function () {
                            createController(0);
                        }).toThrow();
                    });
                });

                describe('getItems', function () {
                    it('getItems() calls service', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var ctrl = createController(),
                            start = 0,
                            limit = 10,
                            sortOrder = 'fakeSortOrder';
                        $httpBackend.flush();
                        $rootScope.$apply();
                        expect(managePasswordService.getManagePasswordAccounts).toHaveBeenCalled();
                        managePasswordService.getManagePasswordAccounts.calls.reset();
                        ctrl.getItems(start, limit, sortOrder);
                        expect(managePasswordService.getManagePasswordAccounts).toHaveBeenCalledWith(identityId, start, limit, sortOrder, quickLink);
                    });
                });

                describe('mergeConstraints', function () {
                    it('sets errors if mergeConstraints fails', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var ctrl = createController(),
                            deferred = $q.defer(),
                            errors = ['you suck'],
                            rejectSpy = jasmine.createSpy();
                        spyOn(managePasswordService, 'mergeConstraints').and.returnValue(deferred.promise);
                        deferred.reject(errors);

                        ctrl.getMergedConstraints(true)['catch'](rejectSpy);
                        $rootScope.$apply();
                        expect(ctrl.getErrors()).toEqual(errors);
                        expect(rejectSpy).toHaveBeenCalled();
                    });

                    it('does not set errors if mergeConstraints fails', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});

                        var ctrl = createController(),
                            deferred = $q.defer(),
                            errors = ['you suck'],
                            rejectSpy = jasmine.createSpy();
                        spyOn(managePasswordService, 'mergeConstraints').and.returnValue(deferred.promise);
                        deferred.reject(errors);

                        ctrl.getMergedConstraints(false)['catch'](rejectSpy);
                        $rootScope.$apply();
                        expect(ctrl.getErrors()).not.toEqual(errors);
                        expect(rejectSpy).toHaveBeenCalledWith(errors);
                    });
                });

                describe('isBulk', function () {
                    it('returns true if selection count is greater than 0', function () {
                        var ctrl = createController();
                        spyOn(ctrl.getCheckboxMultiSelect(), 'getSelectionCount').and.returnValue(1);
                        expect(ctrl.isBulk()).toBeTruthy();
                    });

                    it('returns false if selection count is 0', function () {
                        var ctrl = createController();
                        spyOn(ctrl.getCheckboxMultiSelect(), 'getSelectionCount').and.returnValue(0);
                        expect(ctrl.isBulk()).toBeFalsy();
                    });
                });

                it('should clear selections on successful sync submission', function () {
                    $httpBackend.expectGET(configUrl).respond(200, {});
                    var ctrl = createController(),
                        result = { newPasswordInput: new BulkPasswordChangeResult({}) };

                    // Attach a mock SelectionContext with 2 items.
                    var context = {
                        getPageState: function () {
                            return {
                                pagingData: {
                                    getTotal: function () {
                                        return 2;
                                    }
                                }
                            };
                        },

                        items: [LINK_ONE, LINK_TWO]
                    };
                    ctrl.getCheckboxMultiSelect().attach(context);

                    ctrl.getCheckboxMultiSelect().selectItem(LINK_ONE);
                    ctrl.getCheckboxMultiSelect().selectItem(LINK_TWO);
                    expect(ctrl.getCheckboxMultiSelect().getSelectionCount()).toBe(2);
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when(result)
                    });
                    spyOn(identityService, 'promptWorkItemDialog');
                    ctrl.promptSynchronizePasswords();
                    $rootScope.$apply();
                    expect(ctrl.getCheckboxMultiSelect().getSelectionCount()).toBe(0);
                    /* Just a sanity check, make sure the workitem dialog isn't popped unnecessarily */
                    expect(identityService.promptWorkItemDialog).not.toHaveBeenCalled();
                });

                it('should call the open work item modal function if change result has a workitem', function () {
                    $httpBackend.expectGET(configUrl).respond(200, {});
                    var ctrl = createController(),
                        result = { newPasswordInput: new BulkPasswordChangeResult({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: 'workitemId'
                        }) };
                    ctrl.getCheckboxMultiSelect().selectItem(LINK_ONE);
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when(result)
                    });
                    spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                    ctrl.promptSynchronizePasswords();
                    $rootScope.$apply();
                    expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                });

                it('should clear out the bulkPasswordResult when destroyed', function () {
                    createController();
                    managePasswordDataService.setBulkPasswordChangeResult({ blah: 'blah' });
                    expect(managePasswordDataService.getBulkPasswordChangeResult()).not.toBeNull();
                    $scope.$destroy();
                    expect(managePasswordDataService.getBulkPasswordChangeResult()).toBeNull();
                });

                describe('getLinkById', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                    });

                    it('should return the link if it is present on the page', function () {
                        var link = ctrl.getLinkById(LINK_ID_TWO);
                        expect(link).toBe(LINK_TWO);
                    });

                    it('should return undefined if the link is not on the page', function () {
                        var link = ctrl.getLinkById(42);
                        expect(link).toBeUndefined();
                    });
                });

                describe('generatePasswords', function () {
                    var ctrl = undefined;
                    beforeEach(function () {
                        ctrl = createController();
                    });

                    it('should call mergeConstraints', function () {
                        spyOn(managePasswordService, 'mergeConstraints').and.returnValue($q.when('hooray'));
                        ctrl.promptGeneratePasswords();
                        expect(managePasswordService.mergeConstraints).toHaveBeenCalled();
                    });

                    it('should open the workitem dialog if there is a workitem id', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var ctrl = createController();
                        ctrl.getCheckboxMultiSelect().selectItem(LINK_ONE);
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.when(new BulkPasswordChangeResult({
                                workflowWorkItemType: 'Form',
                                workflowWorkItemId: 'workitemId'
                            }))
                        });
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when());
                        spyOn(ctrl, 'getMergedConstraints').and.returnValue($q.when([]));
                        ctrl.promptGeneratePasswords();
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        $rootScope.$apply();
                        expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                    });
                });

                describe('promptChangePasswordMobile', function () {
                    it('should call the open change password modal function if promptChangePasswordMobile clicked', function () {
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        spyOn(spModal, 'open').and.returnValue({
                            result: $q.defer().promise
                        });
                        var ctrl = createController();
                        ctrl.promptChangePasswordMobile();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('constructor', function () {
                    it('should open error dialog when quicklink is not definded', function () {
                        identityService.getAvailableActionsMap = function () {
                            return {};
                        };
                        spyOn(spModal, 'open').and.returnValue({ result: $q.when() });
                        spyOn(identityService, 'goBack').and.returnValue({});
                        $httpBackend.expectGET(configUrl).respond(200, {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZVBhc3N3b3JkQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUk3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHNCQUFzQixZQUFXOztnQkFFdEMsSUFBTSxZQUFZO2dCQUNsQixJQUFJLGVBQVk7b0JBQUUsY0FBVztvQkFBRSxhQUFVO29CQUFFLFNBQU07b0JBQUUsd0JBQXFCO29CQUFFLGFBQVU7b0JBQUUsa0JBQWU7b0JBQ2pHLDRCQUF5QjtvQkFBRSxvQkFBaUI7b0JBQUUsVUFBTztvQkFBRSxLQUFFO29CQUFFLGNBQVc7b0JBQUUsc0JBQW1CO29CQUFFLGdCQUFhO29CQUMxRywyQkFBd0I7b0JBQUUsY0FBYztvQkFBRyxjQUFjO29CQUFHLFdBQVE7b0JBQUUsV0FBUTtvQkFBRSxlQUFZO29CQUFFLFlBQVM7b0JBQ3ZHLFlBQVM7b0JBQUUsaUJBQWM7O2dCQUU3QixXQUFXLE9BQU8sZ0JBQWdCOzs7Z0JBR2xDLFdBQVcsT0FBTyxVQUFTLGVBQWUseUJBQXlCLE1BQU0sYUFBYSxtQkFDM0QsY0FBYyxjQUFjLFdBQVcscUJBQXFCLGVBQzVELDZCQUE2Qix1QkFBdUIsaUJBQ3BELDRCQUE0QixnQkFBZ0IsWUFBWTs7b0JBRS9FLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLHdCQUF3QjtvQkFDeEIsNEJBQTRCO29CQUM1QixzQkFBc0I7b0JBQ3RCLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsVUFBVTtv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QVEsSUFBSSxZQUFZOzRCQUNuQyxRQUFRLEdBQUcsUUFBUTs7d0JBRXZCLElBQUksT0FBTzt3QkFDWCxLQUFLO3dCQUNMLFdBQVc7d0JBQ1gsT0FBTyxRQUFRLE1BQU07Ozs7Z0JBSTdCLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxnQkFBZ0IseUJBQXlCLFlBQVc7NEJBQUUsT0FBTzs7d0JBQzdELE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWSxFQUFDLFFBQVEsR0FBRzt3QkFDbkQsTUFBTSxpQkFBaUIsVUFBVSxJQUFJLFlBQVk7d0JBQ2pELGFBQWEsVUFBVSxXQUFXLFFBQVEsS0FBSzt3QkFDL0M7d0JBQ0EsZUFBZTt3QkFDZixPQUFPLFFBQVEsTUFBTTt3QkFDckIsT0FBTyxnQkFBZ0IsUUFBUTt3QkFDL0IsSUFBSSxXQUFXLFFBQVEsS0FBSyxNQUFNLGFBQWE7d0JBQy9DLE9BQU8sU0FBUyxHQUFHLE9BQU8sUUFBUTt3QkFDbEMsT0FBTyxTQUFTLEdBQUcsY0FBYyxRQUFROzs7Ozs7R0F3Q2xEIiwiZmlsZSI6ImlkZW50aXR5L01hbmFnZVBhc3N3b3JkQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ01hbmFnZVBhc3N3b3JkQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcXVpY2tMaW5rID0gJ01hbmFnZSUyMFBhc3N3b3Jkcyc7XG4gICAgbGV0ICRzdGF0ZVBhcmFtcywgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzY29wZSwgbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCBpZGVudGl0eUlkLCBpZGVudGl0eVNlcnZpY2UsXG4gICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UsIG5hdmlnYXRpb25TZXJ2aWNlLCBzcE1vZGFsLCAkcSwgdGVzdFNlcnZpY2UsIENoZWNrYm94TXVsdGlTZWxlY3QsIExpc3RSZXN1bHREVE8sXG4gICAgICAgIEJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdCwgTElOS19JRF9PTkUgPSAxLCBMSU5LX0lEX1RXTyA9IDIsIExJTktfT05FLCBMSU5LX1RXTywgJGh0dHBCYWNrZW5kLCBjb25maWdVcmwsXG4gICAgICAgIFF1aWNrTGluaywgdGltZW91dFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTYgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXywgXyRxXywgX1F1aWNrTGlua18sIF9pZGVudGl0eVNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkTGluaywgXyRyb290U2NvcGVfLCBfc3BNb2RhbF8sIF9uYXZpZ2F0aW9uU2VydmljZV8sIF90ZXN0U2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfLCBfQ2hlY2tib3hNdWx0aVNlbGVjdF8sIF9MaXN0UmVzdWx0RFRPXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0XywgXyRodHRwQmFja2VuZF8sIF8kdGltZW91dF8pIHtcblxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlXztcbiAgICAgICAgQ2hlY2tib3hNdWx0aVNlbGVjdCA9IF9DaGVja2JveE11bHRpU2VsZWN0XztcbiAgICAgICAgTGlzdFJlc3VsdERUTyA9IF9MaXN0UmVzdWx0RFRPXztcbiAgICAgICAgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0ID0gX0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdF87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBRdWlja0xpbmsgPSBfUXVpY2tMaW5rXztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIHRpbWVvdXRTZXJ2aWNlID0gXyR0aW1lb3V0XztcbiAgICAgICAgaWRlbnRpdHlJZCA9ICcxMjM0JztcbiAgICAgICAgY29uZmlnVXJsID0gJy91aS9yZXN0L2NvbmZpZ3VyYXRpb24vdWljb25maWcvZW50cmllcz9rZXk9bWFuYWdlUGFzc3dvcmRMaW5rQ29sQ29uZmlnJztcblxuICAgICAgICAvLyBDcmVhdGUgc29tZSBtb2NrIGRhdGFcbiAgICAgICAgJHN0YXRlUGFyYW1zID0ge1xuICAgICAgICAgICAgaWRlbnRpdHlJZDogaWRlbnRpdHlJZCxcbiAgICAgICAgICAgIHF1aWNrTGluazogJ01hbmFnZSUyMFBhc3N3b3JkcydcblxuICAgICAgICB9O1xuICAgICAgICBzcHlPbihtYW5hZ2VQYXNzd29yZFNlcnZpY2UsICdnZXRNYW5hZ2VQYXNzd29yZEFjY291bnRzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIExJTktfT05FID0ge1xuICAgICAgICAgICAgZ2V0SWQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gTElOS19JRF9PTkU7IH1cbiAgICAgICAgfTtcbiAgICAgICAgTElOS19UV08gPSB7XG4gICAgICAgICAgICBnZXRJZDogZnVuY3Rpb24oKSB7IHJldHVybiBMSU5LX0lEX1RXTzsgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbWFwID0ge30sXG4gICAgICAgICAgICBxbERhdGEgPSB7bmFtZTogJ01hbmFnZSUyMFBhc3N3b3Jkcyd9O1xuICAgICAgICBtYXBbUXVpY2tMaW5rLkFjdGlvbnMuTUFOQUdFX1BBU1NXT1JEU10gPSBuZXcgUXVpY2tMaW5rKHFsRGF0YSk7XG4gICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRBdmFpbGFibGVBY3Rpb25zTWFwID0gZnVuY3Rpb24oKSB7IHJldHVybiBtYXA7fTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgbGV0IGN0cmwgPSAkY29udHJvbGxlcignTWFuYWdlUGFzc3dvcmRDdHJsJywge1xuICAgICAgICAgICAgICAgICRzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgICAgIG1hbmFnZVBhc3N3b3JkU2VydmljZTogbWFuYWdlUGFzc3dvcmRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2U6IG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiAkc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICAgICAgQ2hlY2tib3hNdWx0aVNlbGVjdDogQ2hlY2tib3hNdWx0aVNlbGVjdFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBsaXN0UmVzdWx0O1xuXG4gICAgICAgIGxpc3RSZXN1bHQgPSBuZXcgTGlzdFJlc3VsdERUTyh7XG4gICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgIG9iamVjdHM6IFtMSU5LX09ORSwgTElOS19UV09dXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN0cmwubGlua0xpc3RSZXN1bHREVE8gPSBsaXN0UmVzdWx0O1xuICAgICAgICByZXR1cm4gY3RybDtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBpZGVudGl0eSBJRCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgJHN0YXRlUGFyYW1zLmlkZW50aXR5SWQ7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNyZWF0ZUNvbnRyb2xsZXIoMCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2dldEl0ZW1zKCkgY2FsbHMgc2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSAxMCxcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSAnZmFrZVNvcnRPcmRlcic7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlUGFzc3dvcmRTZXJ2aWNlLmdldE1hbmFnZVBhc3N3b3JkQWNjb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIG1hbmFnZVBhc3N3b3JkU2VydmljZS5nZXRNYW5hZ2VQYXNzd29yZEFjY291bnRzLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBjdHJsLmdldEl0ZW1zKHN0YXJ0LCBsaW1pdCwgc29ydE9yZGVyKTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VQYXNzd29yZFNlcnZpY2UuZ2V0TWFuYWdlUGFzc3dvcmRBY2NvdW50cykuXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHlJZCwgc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIsIHF1aWNrTGluayk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ21lcmdlQ29uc3RyYWludHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3NldHMgZXJyb3JzIGlmIG1lcmdlQ29uc3RyYWludHMgZmFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkcS5kZWZlcigpLFxuICAgICAgICAgICAgICAgIGVycm9ycyA9IFsneW91IHN1Y2snXSxcbiAgICAgICAgICAgICAgICByZWplY3RTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnbWVyZ2VDb25zdHJhaW50cycpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcnMpO1xuXG4gICAgICAgICAgICBjdHJsLmdldE1lcmdlZENvbnN0cmFpbnRzKHRydWUpLmNhdGNoKHJlamVjdFNweSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RXJyb3JzKCkpLnRvRXF1YWwoZXJyb3JzKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWplY3RTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IHNldCBlcnJvcnMgaWYgbWVyZ2VDb25zdHJhaW50cyBmYWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG5cbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKSxcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBbJ3lvdSBzdWNrJ10sXG4gICAgICAgICAgICAgICAgcmVqZWN0U3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJ21lcmdlQ29uc3RyYWludHMnKS5hbmQucmV0dXJuVmFsdWUoZGVmZXJyZWQucHJvbWlzZSk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3JzKTtcblxuICAgICAgICAgICAgY3RybC5nZXRNZXJnZWRDb25zdHJhaW50cyhmYWxzZSkuY2F0Y2gocmVqZWN0U3B5KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRFcnJvcnMoKSkubm90LnRvRXF1YWwoZXJyb3JzKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWplY3RTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGVycm9ycyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQnVsaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHNlbGVjdGlvbiBjb3VudCBpcyBncmVhdGVyIHRoYW4gMCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKSwgJ2dldFNlbGVjdGlvbkNvdW50JykuYW5kLnJldHVyblZhbHVlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNCdWxrKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgc2VsZWN0aW9uIGNvdW50IGlzIDAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oY3RybC5nZXRDaGVja2JveE11bHRpU2VsZWN0KCksICdnZXRTZWxlY3Rpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgwKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQnVsaygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNsZWFyIHNlbGVjdGlvbnMgb24gc3VjY2Vzc2Z1bCBzeW5jIHN1Ym1pc3Npb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgcmVzdWx0ID0geyBuZXdQYXNzd29yZElucHV0OiBuZXcgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KHt9KSB9O1xuXG4gICAgICAgIC8vIEF0dGFjaCBhIG1vY2sgU2VsZWN0aW9uQ29udGV4dCB3aXRoIDIgaXRlbXMuXG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgZ2V0UGFnZVN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBwYWdpbmdEYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUb3RhbDogKCkgPT4geyByZXR1cm4gMjsgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGl0ZW1zOiBbTElOS19PTkUsIExJTktfVFdPXVxuICAgICAgICB9O1xuICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5hdHRhY2goY29udGV4dCk7XG5cbiAgICAgICAgY3RybC5nZXRDaGVja2JveE11bHRpU2VsZWN0KCkuc2VsZWN0SXRlbShMSU5LX09ORSk7XG4gICAgICAgIGN0cmwuZ2V0Q2hlY2tib3hNdWx0aVNlbGVjdCgpLnNlbGVjdEl0ZW0oTElOS19UV08pO1xuICAgICAgICBleHBlY3QoY3RybC5nZXRDaGVja2JveE11bHRpU2VsZWN0KCkuZ2V0U2VsZWN0aW9uQ291bnQoKSkudG9CZSgyKTtcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKHJlc3VsdClcbiAgICAgICAgfSk7XG4gICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJyk7XG4gICAgICAgIGN0cmwucHJvbXB0U3luY2hyb25pemVQYXNzd29yZHMoKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q2hlY2tib3hNdWx0aVNlbGVjdCgpLmdldFNlbGVjdGlvbkNvdW50KCkpLnRvQmUoMCk7XG4gICAgICAgIC8qIEp1c3QgYSBzYW5pdHkgY2hlY2ssIG1ha2Ugc3VyZSB0aGUgd29ya2l0ZW0gZGlhbG9nIGlzbid0IHBvcHBlZCB1bm5lY2Vzc2FyaWx5ICovXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UucHJvbXB0V29ya0l0ZW1EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIG9wZW4gd29yayBpdGVtIG1vZGFsIGZ1bmN0aW9uIGlmIGNoYW5nZSByZXN1bHQgaGFzIGEgd29ya2l0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgcmVzdWx0ID0geyBuZXdQYXNzd29yZElucHV0OiBuZXcgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KHtcbiAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ0Zvcm0nLFxuICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJ3dvcmtpdGVtSWQnXG4gICAgICAgICAgICB9KSB9O1xuICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKExJTktfT05FKTtcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKHJlc3VsdClcbiAgICAgICAgfSk7XG4gICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgIGN0cmwucHJvbXB0U3luY2hyb25pemVQYXNzd29yZHMoKTtcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5wcm9tcHRXb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjbGVhciBvdXQgdGhlIGJ1bGtQYXNzd29yZFJlc3VsdCB3aGVuIGRlc3Ryb3llZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2Uuc2V0QnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KHtibGFoOiAnYmxhaCd9KTtcbiAgICAgICAgZXhwZWN0KG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0QnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KCkpLm5vdC50b0JlTnVsbCgpO1xuICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgZXhwZWN0KG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UuZ2V0QnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KCkpLnRvQmVOdWxsKCk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRMaW5rQnlJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY3RybDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGxpbmsgaWYgaXQgaXMgcHJlc2VudCBvbiB0aGUgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBjdHJsLmdldExpbmtCeUlkKExJTktfSURfVFdPKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rKS50b0JlKExJTktfVFdPKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdW5kZWZpbmVkIGlmIHRoZSBsaW5rIGlzIG5vdCBvbiB0aGUgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBjdHJsLmdldExpbmtCeUlkKDQyKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5rKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dlbmVyYXRlUGFzc3dvcmRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIG1lcmdlQ29uc3RyYWludHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZVBhc3N3b3JkU2VydmljZSwgJ21lcmdlQ29uc3RyYWludHMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbignaG9vcmF5JykpO1xuICAgICAgICAgICAgY3RybC5wcm9tcHRHZW5lcmF0ZVBhc3N3b3JkcygpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZVBhc3N3b3JkU2VydmljZS5tZXJnZUNvbnN0cmFpbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiB0aGUgd29ya2l0ZW0gZGlhbG9nIGlmIHRoZXJlIGlzIGEgd29ya2l0ZW0gaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLmdldENoZWNrYm94TXVsdGlTZWxlY3QoKS5zZWxlY3RJdGVtKExJTktfT05FKTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6ICRxLndoZW4obmV3IEJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdCh7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnRm9ybScsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJ3dvcmtpdGVtSWQnXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnZ2V0TWVyZ2VkQ29uc3RyYWludHMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihbXSkpO1xuICAgICAgICAgICAgY3RybC5wcm9tcHRHZW5lcmF0ZVBhc3N3b3JkcygpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5wcm9tcHRXb3JrSXRlbURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwcm9tcHRDaGFuZ2VQYXNzd29yZE1vYmlsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIG9wZW4gY2hhbmdlIHBhc3N3b3JkIG1vZGFsIGZ1bmN0aW9uIGlmIHByb21wdENoYW5nZVBhc3N3b3JkTW9iaWxlIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5wcm9tcHRDaGFuZ2VQYXNzd29yZE1vYmlsZSgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGVycm9yIGRpYWxvZyB3aGVuIHF1aWNrbGluayBpcyBub3QgZGVmaW5kZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlkZW50aXR5U2VydmljZS5nZXRBdmFpbGFibGVBY3Rpb25zTWFwID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTt9O1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe3Jlc3VsdDogJHEud2hlbigpfSk7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnb0JhY2snKS5hbmQucmV0dXJuVmFsdWUoe30pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICB0aW1lb3V0U2VydmljZS5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nb0JhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBjYWxsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGV4cGVjdChjYWxsQXJnc1swXS50aXRsZSkudG9FcXVhbCgndWlfaWRlbnRpdHlfZXJyb3JfdW5hYmxlX3RvX21hbmFnZV9pZF90aXRsZScpO1xuICAgICAgICAgICAgZXhwZWN0KGNhbGxBcmdzWzBdLndhcm5pbmdMZXZlbCkudG9FcXVhbCgnZXJyb3InKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
