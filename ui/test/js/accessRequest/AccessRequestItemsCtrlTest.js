System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestItemsCtrl.
             */
            describe('AccessRequestItemsCtrl', function () {

                var $controller, testService, accessRequestDataService, accessRequestItemsService, accessRequestFilterService, accessRequestAccountSelectionService, PageState, $rootScope, ctrl, item, item2, identity, additionalQuestions, configServiceMock, filtersDeferred, acctSelectionDeferred, modalDeferred, spModal, accessRequestDeepFilterService, location, SEARCH_TYPE_KEYWORD, SEARCH_TYPE_POPULATION, SEARCH_TYPE_IDENTITY, AccessRequestItem;

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Let the tests know we'll use the access request module.
                beforeEach(module(accessRequestModule, function ($qProvider) {
                    // ignore the unhandled rejections on this controller since they are handled on the SelectButtonDirective
                    $qProvider.errorOnUnhandledRejections(false);
                }));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 20 */
                beforeEach(inject(function (_accessRequestDataService_, _accessRequestItemsService_, _AccessRequestItem_, Identity, AccessRequestAdditionalQuestions, _PageState_, _testService_, _$controller_, _$rootScope_, _accessRequestFilterService_, _accessRequestAccountSelectionService_, $q, _spModal_, _accessRequestDeepFilterService_, $location, accessRequestTestData, _SEARCH_TYPE_KEYWORD_, _SEARCH_TYPE_POPULATION_, _SEARCH_TYPE_IDENTITY_) {

                    // Save the services.
                    accessRequestDataService = _accessRequestDataService_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    accessRequestFilterService = _accessRequestFilterService_;
                    accessRequestAccountSelectionService = _accessRequestAccountSelectionService_;
                    accessRequestDeepFilterService = _accessRequestDeepFilterService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    PageState = _PageState_;
                    $rootScope = _$rootScope_;
                    filtersDeferred = $q.defer();
                    spModal = _spModal_;
                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.when()
                    });
                    spyOn(_accessRequestFilterService_, 'getAccessItemFilters').and.returnValue(filtersDeferred.promise);
                    location = $location;
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    SEARCH_TYPE_POPULATION = _SEARCH_TYPE_POPULATION_;
                    SEARCH_TYPE_IDENTITY = _SEARCH_TYPE_IDENTITY_;
                    AccessRequestItem = _AccessRequestItem_;
                    acctSelectionDeferred = $q.defer();

                    // Create an item and identity to test with.
                    item = new AccessRequestItem(accessRequestTestData.ROLE);
                    item2 = new AccessRequestItem(accessRequestTestData.PERMITTED_ROLE);
                    identity = new Identity(accessRequestTestData.IDENTITY1);

                    // Mock out the item service to return a single item.
                    accessRequestItemsService.getAccessRequestItems = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: 1,
                            objects: [item]
                        }
                    });

                    // Mock out getAdditionalQuestions() to return some permits.
                    additionalQuestions = new AccessRequestAdditionalQuestions({
                        permittedRoles: [accessRequestTestData.PERMITTED_ROLE]
                    });
                    spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestions));

                    // Mock out the config service
                    configServiceMock = {
                        getColumnConfigEntries: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {}
                        }, {})
                    };

                    // Mock out the data service to spy on item selection changes.
                    spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity]);
                    spyOn(accessRequestDataService.getAccessRequest(), 'getIdentityIds').and.returnValue([identity.id]);
                    spyOn(accessRequestDataService.getAccessRequest(), 'addRequestedItem').and.returnValue(true);
                    spyOn(accessRequestDataService.getAccessRequest(), 'removeRequestedItem').and.returnValue(true);
                    spyOn(accessRequestDataService.getAccessRequest(), 'setPermittedRoles');
                    spyOn(_accessRequestDataService_, 'getQuickLinkName').and.returnValue('Request Access');

                    /* Mock opening the accountSelection dialog */
                    modalDeferred = $q.defer();
                    spyOn(accessRequestAccountSelectionService, 'openDialog').and.returnValue(modalDeferred.promise);
                    spyOn(accessRequestAccountSelectionService, 'editAccountSelections').and.returnValue(acctSelectionDeferred.promise);

                    ctrl = createController();

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                }));

                function createController() {
                    // Create the controller to test with.
                    return $controller('AccessRequestItemsCtrl', {
                        accessRequestItemsService: accessRequestItemsService,
                        accessRequestDataService: accessRequestDataService,
                        configService: configServiceMock
                    });
                }

                it('fetches items when loaded', function () {
                    // The start and limit are hard-coded.
                    expect(accessRequestItemsService.getAccessRequestItems).toHaveBeenCalledWith(undefined, {}, 0, 12, identity.getId(), SEARCH_TYPE_KEYWORD, 'Request Access');
                });

                it('fetches filters when loaded', function () {
                    expect(accessRequestFilterService.getAccessItemFilters).toHaveBeenCalledWith(accessRequestDataService.getAccessRequest().getRequesteeId(), SEARCH_TYPE_KEYWORD);
                });

                describe('isSearchBlocked()', function () {
                    it('returns false if search type is keyword', function () {
                        expect(ctrl.isSearchBlocked()).toEqual(false);
                    });

                    it('returns false if search type is not keyword and there are applied filters', function () {
                        spyOn(ctrl, 'hasAppliedFilters').and.returnValue(true);
                        expect(ctrl.isSearchBlocked()).toEqual(false);
                    });

                    it('returns true if search type is not keyword and no search applied filters', function () {
                        spyOn(ctrl, 'hasAppliedFilters').and.returnValue(false);
                        ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                        expect(ctrl.isSearchBlocked()).toEqual(true);
                        ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                        expect(ctrl.isSearchBlocked()).toEqual(true);
                    });

                    it('blocks search and returns empty promise', function () {
                        var data;
                        spyOn(ctrl, 'isSearchBlocked').and.returnValue(true);
                        accessRequestItemsService.getAccessRequestItems.calls.reset();
                        data = ctrl.doSearch().then(function (result) {
                            data = result.data;
                        });

                        $rootScope.$digest();
                        expect(accessRequestItemsService.getAccessRequestItems).not.toHaveBeenCalled();
                        expect(data.objects).toEqual([]);
                        expect(data.count).toEqual(0);
                    });
                });

                describe('select item', function () {
                    it('adds items', function () {
                        ctrl.selectItem(item, null);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).toHaveBeenCalledWith(item, null);
                    });

                    it('adds permitted items', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'getOtherRequestedRoles').and.returnValue([]);
                        ctrl.selectItem(item2, item);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).toHaveBeenCalledWith(item2, item);
                    });

                    it('loads additional questions the first time it is called', function () {
                        ctrl.selectItem(item);
                        $rootScope.$digest();
                        expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalledWith(item, [identity.id], undefined, undefined, [], 'Request Access');
                    });

                    it('should call pass permitting role and other requested roles if set', function () {
                        var fakeRequestedRole = { foo: 'bar' };
                        var fakePermittedRole = { foo: 'baz' };
                        spyOn(accessRequestDataService.getAccessRequest(), 'getOtherRequestedRoles').and.returnValue([fakeRequestedRole, fakePermittedRole]);
                        ctrl.selectItem(item, item2);
                        $rootScope.$digest();
                        expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalledWith(item, [identity.id], item2, undefined, [fakeRequestedRole, fakePermittedRole], 'Request Access');
                    });

                    it('loads additional questions the subsequent times it is called', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'getPermittedRoles').and.returnValue(additionalQuestions.permittedRoles);
                        ctrl.selectItem(item);
                        $rootScope.$digest();
                        expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();

                        ctrl.selectItem(item);
                        $rootScope.$digest();
                        expect(accessRequestItemsService.getAdditionalQuestions).toHaveBeenCalled();
                    });

                    it('saves permitted roles in the data service', function () {
                        ctrl.selectItem(item);
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().setPermittedRoles).toHaveBeenCalledWith(item.getId(), additionalQuestions.permittedRoles);
                    });

                    describe('additional questions dialog', function () {
                        it('does not open the additional questions dialog if there are null account selections and ' + 'ambiguous assigned roles', function () {
                            ctrl.selectItem(item);
                            $rootScope.$digest();
                            expect(accessRequestAccountSelectionService.openDialog).not.toHaveBeenCalled();
                        });

                        it('does not open the account selection dialog if there are empty account selections', function () {
                            additionalQuestions.accountSelections = [];
                            ctrl.selectItem(item);
                            $rootScope.$digest();
                            expect(accessRequestAccountSelectionService.openDialog).not.toHaveBeenCalled();
                        });

                        it('does not open the account selection dialog if there are empty ambiguous assigned roles', function () {
                            additionalQuestions.ambiguousAssignedRoles = [];
                            ctrl.selectItem(item);
                            $rootScope.$digest();
                            expect(accessRequestAccountSelectionService.openDialog).not.toHaveBeenCalled();
                        });

                        it('opens the account selection dialog if there are account selections', function () {
                            // Add some account selections to cause the dialog to popup.
                            var acctSels = ['foobar'];
                            additionalQuestions.accountSelections = acctSels;

                            spyOn(accessRequestDataService.getAccessRequest(), 'getOtherRequestedRoles').and.returnValue([]);
                            ctrl.selectItem(item, item2);
                            $rootScope.$digest();
                            expect(accessRequestAccountSelectionService.openDialog).toHaveBeenCalledWith(item, acctSels, undefined, item2.id, undefined);
                        });

                        it('opens the account selection dialog if there are ambiguous assigned roles', function () {
                            var ambiguousAssignedRoles = [{ whatever: 'yea' }];
                            additionalQuestions.ambiguousAssignedRoles = ambiguousAssignedRoles;

                            ctrl.selectItem(item);
                            $rootScope.$digest();
                            expect(accessRequestAccountSelectionService.openDialog).toHaveBeenCalledWith(item, undefined, ambiguousAssignedRoles, undefined, undefined);
                        });

                        it('deselects the item if the dialog is canceled', function () {
                            // Add some account selections to cause the dialog to popup.
                            var acctSels = [{}];
                            additionalQuestions.accountSelections = acctSels;

                            ctrl.selectItem(item);
                            $rootScope.$digest();

                            // Resolving simulates getting the additional questions back
                            acctSelectionDeferred.resolve(additionalQuestions);
                            $rootScope.$digest();

                            // Rejecting simulates a canceled dialog.
                            modalDeferred.reject();
                            $rootScope.$digest();

                            expect(ctrl.isItemSelected(item)).toEqual(false);
                        });

                        it('sets selections and assignment id when dialog is completed', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'setRequestedItemAccountSelections');
                            spyOn(accessRequestDataService.getAccessRequest(), 'setAssignmentId');

                            // Add some account selections to cause the dialog to popup on selectedItem.
                            var acctSels = [{}],
                                assignedRoles = [{}],
                                assignmentId = '1244';

                            additionalQuestions.accountSelections = acctSels;
                            additionalQuestions.ambiguousAssignedRoles = assignedRoles;
                            ctrl.selectItem(item);
                            $rootScope.$digest();

                            // Resolving simulates getting the additional questions back
                            acctSelectionDeferred.resolve(additionalQuestions);
                            $rootScope.$digest();

                            // Resolving simulates a finished dialog.
                            modalDeferred.resolve({
                                accountSelections: acctSels,
                                assignmentId: assignmentId
                            });
                            $rootScope.$digest();

                            expect(accessRequestDataService.getAccessRequest().setRequestedItemAccountSelections).toHaveBeenCalledWith(item, acctSels);
                            expect(accessRequestDataService.getAccessRequest().setAssignmentId).toHaveBeenCalledWith(item, assignmentId);
                        });
                    });
                });

                it('removes item when deselected', function () {
                    ctrl.deselectItem(item);
                    expect(accessRequestDataService.getAccessRequest().removeRequestedItem).toHaveBeenCalledWith(item);
                });

                var testItemSelection = function (isSelected) {
                    var selected;
                    spyOn(accessRequestDataService.getAccessRequest(), 'hasRequestedItem').and.returnValue(isSelected);
                    selected = ctrl.isItemSelected(item);
                    expect(accessRequestDataService.getAccessRequest().hasRequestedItem).toHaveBeenCalledWith(item);
                    expect(selected).toEqual(isSelected);
                };

                it('says that an item is selected if added', function () {
                    testItemSelection(true);
                });

                it('says that an item is not selected if not added', function () {
                    testItemSelection(false);
                });

                it('returns permitted roles from the data service', function () {
                    spyOn(accessRequestDataService.getAccessRequest(), 'getPermittedRoles');
                    ctrl.getPermittedRoles(item);
                    expect(accessRequestDataService.getAccessRequest().getPermittedRoles).toHaveBeenCalledWith(item.getId());
                });

                describe('getSelectedPermittedRoleCount function', function () {
                    it('returns 0 when no permitted roles exist', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedPermittedItems').and.returnValue([]);
                        expect(ctrl.getSelectedPermittedRoleCount(item)).toEqual(0);
                        expect(accessRequestDataService.getAccessRequest().getRequestedPermittedItems).toHaveBeenCalledWith({ item: item });
                    });

                    it('returns the correct count', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedPermittedItems').and.returnValue([{}, {}, {}]);
                        expect(ctrl.getSelectedPermittedRoleCount(item)).toEqual(3);
                        expect(accessRequestDataService.getAccessRequest().getRequestedPermittedItems).toHaveBeenCalledWith({ item: item });
                    });
                });

                it('tracks which roles have expanded permits', function () {
                    expect(ctrl.isShowPermittedRoles(item)).toBeFalsy();
                    ctrl.toggleShowPermittedRoles(item);
                    expect(ctrl.isShowPermittedRoles(item)).toBeTruthy();
                    ctrl.toggleShowPermittedRoles(item);
                    expect(ctrl.isShowPermittedRoles(item)).toBeFalsy();
                    expect(ctrl.isShowPermittedRoles(item2)).toBeFalsy();
                });

                describe('editAccountSelections()', function () {
                    var item, requestedItem;

                    beforeEach(function () {
                        item = {
                            id: 321
                        };
                        requestedItem = {
                            item: item,
                            accountSelections: []
                        };
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItem').and.callFake(function (item) {
                            if (item.id === 321) {
                                return requestedItem;
                            }
                            return undefined;
                        });
                    });

                    it('should throw if no requesteditem for access item', function () {
                        expect(function () {
                            ctrl.editAccountSelections({ item: 123 });
                        }).toThrow();
                    });

                    it('should open the account selection dialog when called', function () {
                        ctrl.editAccountSelections(item);
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalledWith(requestedItem);
                    });

                    it('should not update the requestedItem when the dialog is rejected', function () {
                        var accountSelections = [{ 'this is': 'a test' }];
                        requestedItem.accountSelections = accountSelections;
                        ctrl.editAccountSelections(item);
                        acctSelectionDeferred.reject();
                        $rootScope.$digest();
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalled();
                        expect(requestedItem.accountSelections).toBe(accountSelections);
                    });

                    it('should update the requestedItem when the dialog is resolved', function () {
                        var accountSelections = [{ 'this is': 'a test' }],
                            updatedAccountSelections = [{ foo: 'bar' }, { something: 'else' }];
                        requestedItem.accountSelections = accountSelections;
                        requestedItem.accountSelections = accountSelections;
                        ctrl.editAccountSelections(item);
                        acctSelectionDeferred.resolve({
                            accountSelections: updatedAccountSelections
                        });
                        $rootScope.$digest();
                        expect(accessRequestAccountSelectionService.editAccountSelections).toHaveBeenCalled();
                        expect(requestedItem.accountSelections).toBe(updatedAccountSelections);
                    });
                });

                describe('select item pending or currently assigned', function () {
                    var additionalQuestionsCurrentlyAssigned, additionalQuestionsPending, additionalQuestionsRandomStatus, additionalQuestionsInvalidRequestees, additionalQuestionsBulkAssignedOrPending;

                    // Setup the dependencies.
                    beforeEach(inject(function (AccessRequestAdditionalQuestions) {
                        additionalQuestionsCurrentlyAssigned = new AccessRequestAdditionalQuestions({
                            status: AccessRequestAdditionalQuestions.STATUS_CURRENTLY_ASSIGNED
                        });
                        additionalQuestionsPending = new AccessRequestAdditionalQuestions({
                            status: AccessRequestAdditionalQuestions.STATUS_PENDING_REQUEST
                        });
                        additionalQuestionsRandomStatus = new AccessRequestAdditionalQuestions({
                            status: 'Mandelbaum!'
                        });
                        additionalQuestionsInvalidRequestees = new AccessRequestAdditionalQuestions({
                            status: AccessRequestAdditionalQuestions.STATUS_INVALID_REQUESTEES,
                            invalidRequestees: ['someguy']
                        });
                        additionalQuestionsBulkAssignedOrPending = new AccessRequestAdditionalQuestions({
                            status: AccessRequestAdditionalQuestions.STATUS_BULK_ASSIGNED_OR_PENDING,
                            invalidRequestees: ['someguy']
                        });
                        /* Remove the spy */
                        accessRequestItemsService.getAdditionalQuestions = {};
                    }));

                    it('should select the item when an item has no status', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestions));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).toHaveBeenCalledWith(item, null);
                    });

                    it('should select the item when an item has random status', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsRandomStatus));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).toHaveBeenCalledWith(item, null);
                    });

                    it('should not select the item when an item is currently assigned', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsCurrentlyAssigned));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).not.toHaveBeenCalled();
                    });

                    it('should not select the item when an item is pending', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsPending));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(accessRequestDataService.getAccessRequest().addRequestedItem).not.toHaveBeenCalled();
                    });

                    it('should open the modal when an item is currently assigned', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsCurrentlyAssigned));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should open the modal when an item is pending', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsPending));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should open a modal when has invalid requestees', function () {
                        var recentArg;
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsInvalidRequestees));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                        recentArg = spModal.open.calls.mostRecent().args[0];
                        /* Exercise some of the args*/
                        expect(recentArg.id).toEqual('invalidRequesteesDialog');
                        expect(recentArg.warningLevel).toEqual('warning');
                        expect(recentArg.resolve.messageKey()).toEqual('ui_access_request_invalid_requestees_header');
                        expect(recentArg.resolve.invalidRequestees()).toEqual(additionalQuestionsInvalidRequestees.invalidRequestees);
                        expect(recentArg.resolve.renderLimit()).toEqual(5);
                    });

                    it('should open a modal when has bulk assigned or pending', function () {
                        var recentArg;
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestionsBulkAssignedOrPending));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                        recentArg = spModal.open.calls.mostRecent().args[0];
                        /* Exercise some of the args*/
                        expect(recentArg.id).toEqual('invalidRequesteesDialog');
                        expect(recentArg.warningLevel).toEqual('warning');
                        expect(recentArg.resolve.messageKey()).toEqual('ui_access_request_bulk_assigned_header');
                        expect(recentArg.resolve.invalidRequestees()).toEqual(additionalQuestionsInvalidRequestees.invalidRequestees);
                        expect(recentArg.resolve.renderLimit()).toEqual(5);
                    });

                    it('should not open the modal when an item has no status', function () {
                        spyOn(accessRequestItemsService, 'getAdditionalQuestions').and.returnValue(testService.createPromise(false, additionalQuestions));
                        ctrl.selectItem(item, null);
                        $rootScope.$digest();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });
                });

                describe('deep filter service', function () {
                    var identityData, identity, navigationService, spNotificationService;

                    beforeEach(inject(function (Identity, accessRequestTestData, $q, _navigationService_, _spNotificationService_) {
                        navigationService = _navigationService_;
                        spNotificationService = _spNotificationService_;
                        identityData = accessRequestTestData.IDENTITY1;
                        identity = new Identity(identityData);
                        accessRequestDeepFilterService.getTargetIdentity = jasmine.createSpy('getTargetIdentity').and.callFake(function () {
                            return $q.when(identity);
                        });
                        spyOn(location, 'path').and.returnValue('/accessRequestSelf/add');
                        spyOn(navigationService, 'go');
                        spyOn(spNotificationService, 'addNotification');
                    }));

                    it('should call getTargetIdentity when deepLinkManageAccess is true', function () {
                        accessRequestDeepFilterService.deepLinkManageAccess = true;

                        // Create the controller so the init gets fired.
                        createController();
                        expect(accessRequestDeepFilterService.getTargetIdentity).toHaveBeenCalled();
                    });

                    it('should not call getTargetIdentity when deepLinkManageAccess is false', function () {
                        accessRequestDeepFilterService.deepLinkManageAccess = false;

                        // Create the controller so the init gets fired.
                        createController();
                        expect(accessRequestDeepFilterService.getTargetIdentity).not.toHaveBeenCalled();
                    });

                    it('should not call getTargetIdentity when deepLinkReview is true', function () {
                        accessRequestDeepFilterService.deepLinkReview = false;

                        // Create the controller so the init gets fired.
                        createController();
                        expect(accessRequestDeepFilterService.getTargetIdentity).not.toHaveBeenCalled();
                    });

                    it('should set error and go back to home if target identity is null', function () {
                        identity = null;
                        accessRequestDeepFilterService.deepLinkManageAccess = true;
                        createController();
                        $rootScope.$apply();
                        expect(spNotificationService.addNotification).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalled();
                        var args = navigationService.go.calls.mostRecent().args;
                        expect(args[0].state).toEqual('home');
                    });

                    describe('deep link init', function () {
                        var filterData = {
                            filterKey: 'filter values'
                        };

                        function setupDeepLinkController(searchType, isAllowed) {
                            var newCtrl;
                            accessRequestDeepFilterService.deepLinkManageAccess = true;
                            accessRequestDeepFilterService.requestAccessSearchType = searchType;

                            spyOn(accessRequestFilterService, 'getAccessFilterValues').and.returnValue(filtersDeferred.promise);
                            spyOn(accessRequestDataService, 'setSearchType').and.callThrough();

                            accessRequestDeepFilterService.getItemSearchData = testService.createPromiseSpy(false, {
                                searchTerm: 'some search term',
                                filterValues: filterData
                            });

                            // Create the controller to test with.
                            newCtrl = createController();

                            spyOn(newCtrl, 'isSearchTypeAllowed').and.callFake(function () {
                                return isAllowed;
                            });

                            $rootScope.$apply();
                            return newCtrl;
                        }

                        it('should set AccessRequestDataService search type to AccessRequestDeepFilterService search type', function () {
                            ctrl = setupDeepLinkController(SEARCH_TYPE_POPULATION, true);
                            expect(accessRequestDataService.setSearchType).toHaveBeenCalledWith(SEARCH_TYPE_POPULATION);
                            expect(accessRequestDataService.getSearchType()).toEqual(SEARCH_TYPE_POPULATION);
                        });

                        it('should not change search type if not allowed', function () {
                            ctrl = setupDeepLinkController(SEARCH_TYPE_POPULATION, false);
                            expect(accessRequestDataService.setSearchType).not.toHaveBeenCalled();
                            expect(accessRequestDataService.getSearchType()).toEqual(SEARCH_TYPE_KEYWORD);
                        });

                        it('should merge searchData', function () {
                            ctrl = setupDeepLinkController(SEARCH_TYPE_KEYWORD, true);
                            expect(ctrl.getPageState().searchData.searchTerm).toEqual('some search term');
                            expect(ctrl.getPageState().searchData.filterValues).toEqual(filterData);
                        });
                    });
                });

                describe('showItemDetails()', function () {
                    it('should throw when no item is passed', function () {
                        expect(function () {
                            ctrl.showItemDetails();
                        }).toThrow();
                    });

                    it('should open a modal dialog', function () {
                        ctrl.showItemDetails(item);
                        $rootScope.$digest();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('search type', function () {
                    it('defaults to keyword', function () {
                        expect(ctrl.getSearchType()).toEqual(SEARCH_TYPE_KEYWORD);
                    });

                    it('getSearchType() returns current search type', function () {
                        spyOn(accessRequestDataService, 'getSearchType');
                        expect(accessRequestDataService.getSearchType).not.toHaveBeenCalled();
                        ctrl.getSearchType();
                        expect(accessRequestDataService.getSearchType).toHaveBeenCalled();
                    });

                    describe('changeSearchType()', function () {
                        var filterData1 = {
                            filter1: 'Who\'s that dapper swindler',
                            filter2: 'out of Tammany hall?',
                            filter3: 'it\'s The Sneak!'
                        },
                            filterData2 = {
                            filter7: 'Who put a bengal tiger in the Kaiser\'s latrine??',
                            filter8: 'it\'s The Sneak!'
                        };

                        it('does nothing if the search type does not change', function () {
                            // Check that the type is the same and that filters haven't been loaded.
                            spyOn(ctrl, 'doLoadFilters');
                            expect(ctrl.doLoadFilters).not.toHaveBeenCalled();
                            ctrl.changeSearchType(SEARCH_TYPE_KEYWORD);

                            expect(ctrl.doLoadFilters).not.toHaveBeenCalled();
                            expect(accessRequestDataService.getSearchType()).toEqual(SEARCH_TYPE_KEYWORD);
                        });

                        it('changes the search type', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.getSearchType()).toEqual(SEARCH_TYPE_POPULATION);
                        });

                        it('hides filters when going to Keyword search type', function () {
                            ctrl.filtersDisplayed = true;
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.filtersDisplayed).toEqual(false);
                        });

                        function setupSearchData(filterData, filterGroups) {
                            angular.extend(ctrl.getPageState().searchData.filterValues, filterData);
                            angular.extend(ctrl.searchScratchPad.filterValues, filterData);
                            ctrl.getPageState().searchData.filterGroups = filterGroups;
                        }

                        function assertSearchData(expectedValues, expectedFilterGroups) {
                            expect(ctrl.getPageState().searchData.filterValues).toEqual(expectedValues);
                            expect(ctrl.searchScratchPad.filterValues).toEqual(expectedValues);
                            expect(ctrl.getPageState().searchData.filterGroups).toEqual(expectedFilterGroups);
                        }

                        it('creates blank search data when switching to a new type', function () {
                            // Fill in some search data.
                            setupSearchData(filterData1);

                            // Switch types.
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);

                            // Check that the filter values are blank for the scratch pad and search data.
                            assertSearchData({});
                        });

                        it('restores the previous search data when switching types', function () {
                            // Use searchData1 for keyword, switch to population search and use searchData2.
                            setupSearchData(filterData1);
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            setupSearchData(filterData2);

                            // Go back to keyword search and make sure we're using searchData1.
                            ctrl.changeSearchType(SEARCH_TYPE_KEYWORD);
                            assertSearchData(filterData1);
                        });

                        it('does not restore the search scratch pad when switching types', function () {
                            var scratchPadData = {
                                filter1: 'who\'s that jaunty jackanapes',
                                filter2: 'with moxie and pizzazz?'
                            };

                            // Setup searchData1 with different values in the scratch pad.
                            setupSearchData(filterData1);
                            ctrl.searchScratchPad.filterValues = scratchPadData;

                            // Switching to another type and switching back should not remember the scratch pad.
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            ctrl.changeSearchType(SEARCH_TYPE_KEYWORD);
                            assertSearchData(filterData1);
                        });

                        it('loads filters when switching types', function () {
                            // Make the get filters call return something new.
                            var newFilters = ['not', 'really', 'filters', 'but', 'that', 'is', 'alright'],
                                expectedFilterGroups = [['not', 'really', 'filters', 'but'], ['that', 'is', 'alright']];
                            filtersDeferred.resolve(newFilters);

                            // Spy on doLoadFilters to ensure it gets called when switch.
                            spyOn(ctrl, 'doLoadFilters').and.callThrough();
                            expect(ctrl.doLoadFilters).not.toHaveBeenCalled();

                            // Fire!!!!
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            $rootScope.$apply();

                            // Make sure new filters have been loaded and that filters have changed.
                            expect(ctrl.getPageState().searchData.filterGroups).toEqual(expectedFilterGroups);
                            expect(ctrl.doLoadFilters).toHaveBeenCalled();
                        });

                        it('does not reload filters when switching back to a previous type', function () {
                            var keywordFilters = ['keyword'],
                                returnedFilters = ['population'];

                            // Set the keyword filters and make the filter service return population filters
                            // when switching types.
                            ctrl.getPageState().searchData.filterGroups = [keywordFilters];
                            filtersDeferred.resolve(returnedFilters);

                            // Spy on loading so that we can see how many times it is called.
                            spyOn(ctrl, 'doLoadFilters').and.callThrough();
                            expect(ctrl.doLoadFilters).not.toHaveBeenCalled();

                            // Switch types - ensure it is called once.
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            $rootScope.$apply();
                            expect(ctrl.doLoadFilters).toHaveBeenCalled();
                            expect(ctrl.getPageState().searchData.filterGroups).toEqual([returnedFilters]);

                            // Switch back - it should use the cached values and not have loaded again.
                            ctrl.doLoadFilters.calls.reset();
                            ctrl.changeSearchType(SEARCH_TYPE_KEYWORD);
                            expect(ctrl.doLoadFilters).not.toHaveBeenCalled();
                            expect(ctrl.getPageState().searchData.filterGroups).toEqual([keywordFilters]);
                        });
                    });

                    describe('isKeywordSearchType()', function () {
                        it('returns true if keyword search type', function () {
                            expect(ctrl.isKeywordSearchType()).toEqual(true);
                        });
                        it('return false if not keyword search type', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.isKeywordSearchType()).toEqual(false);
                            ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                            expect(ctrl.isKeywordSearchType()).toEqual(false);
                        });
                    });

                    describe('isPopulationSearchType()', function () {
                        it('returns true if population search type', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.isPopulationSearchType()).toEqual(true);
                        });
                        it('return false if not population search type', function () {
                            expect(ctrl.isPopulationSearchType()).toEqual(false);
                            ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                            expect(ctrl.isPopulationSearchType()).toEqual(false);
                        });
                    });

                    describe('isIdentitySearchType()', function () {
                        it('returns true if identity search type', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                            expect(ctrl.isIdentitySearchType()).toEqual(true);
                        });
                        it('return false if not identity search type', function () {
                            expect(ctrl.isIdentitySearchType()).toEqual(false);
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.isIdentitySearchType()).toEqual(false);
                        });
                    });

                    it('disables hiding filters on search if identity or population search type', function () {
                        expect(ctrl.isHideFiltersOnSearch()).toEqual(true);
                        ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                        expect(ctrl.isHideFiltersOnSearch()).toEqual(false);
                        ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                        expect(ctrl.isHideFiltersOnSearch()).toEqual(false);
                    });

                    describe('getFilterGroups', function () {
                        it('returns undefined if isForKeywordSearchType is true and search type is not keyword', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                            expect(ctrl.getFilterGroups(true)).toEqual(undefined);
                        });

                        it('returns filters if isForKeywordSearchType is true and search type is keyword', function () {
                            expect(ctrl.getFilterGroups(true)).toEqual(ctrl.filterGroups);
                        });

                        it('returns undefined if isForKeywordSearchType is false and search type is keyword', function () {
                            expect(ctrl.getFilterGroups(false)).toEqual(undefined);
                        });

                        it('returns undefined if isForKeywordSearchType is true and search type is not keyword', function () {
                            ctrl.changeSearchType(SEARCH_TYPE_IDENTITY);
                            expect(ctrl.getFilterGroups(false)).toEqual(ctrl.filterGroups);
                            ctrl.changeSearchType(SEARCH_TYPE_POPULATION);
                            expect(ctrl.getFilterGroups(false)).toEqual(ctrl.filterGroups);
                        });
                    });
                });

                describe('isPopulationSearchAllowed()', function () {
                    it('returns the correct config value', function () {
                        configServiceMock.getConfigValue = jasmine.createSpy().and.returnValue(true);
                        expect(ctrl.isPopulationSearchAllowed()).toEqual(true);
                        expect(configServiceMock.getConfigValue).toHaveBeenCalled();
                    });

                    it('returns false if no value is configured', function () {
                        configServiceMock.getConfigValue = jasmine.createSpy().and.returnValue(null);
                        expect(ctrl.isPopulationSearchAllowed()).toEqual(false);
                        expect(configServiceMock.getConfigValue).toHaveBeenCalled();
                    });
                });

                describe('isIdentitySearchAllowed()', function () {
                    it('returns the correct config value', function () {
                        configServiceMock.getConfigValue = jasmine.createSpy().and.returnValue(true);
                        expect(ctrl.isIdentitySearchAllowed()).toEqual(true);
                        expect(configServiceMock.getConfigValue).toHaveBeenCalled();
                    });

                    it('returns false if no value is configured', function () {
                        configServiceMock.getConfigValue = jasmine.createSpy().and.returnValue(null);
                        expect(ctrl.isIdentitySearchAllowed()).toEqual(false);
                        expect(configServiceMock.getConfigValue).toHaveBeenCalled();
                    });
                });

                describe('isSearchTypeAllowed', function () {
                    it('returns true if keyword search type', function () {
                        expect(ctrl.isSearchTypeAllowed(SEARCH_TYPE_KEYWORD)).toEqual(true);
                    });

                    it('returns false if identity search type is not allowed', function () {
                        spyOn(ctrl, 'isIdentitySearchAllowed').and.returnValue(false);
                        expect(ctrl.isSearchTypeAllowed(SEARCH_TYPE_IDENTITY)).toEqual(false);
                    });

                    it('returns true if identity search type is allowed', function () {
                        spyOn(ctrl, 'isIdentitySearchAllowed').and.returnValue(true);
                        expect(ctrl.isSearchTypeAllowed(SEARCH_TYPE_IDENTITY)).toEqual(true);
                    });

                    it('returns false if population search type is not allowed', function () {
                        spyOn(ctrl, 'isPopulationSearchAllowed').and.returnValue(false);
                        expect(ctrl.isSearchTypeAllowed(SEARCH_TYPE_POPULATION)).toEqual(false);
                    });

                    it('returns true if population search type is allowed', function () {
                        spyOn(ctrl, 'isPopulationSearchAllowed').and.returnValue(true);
                        expect(ctrl.isSearchTypeAllowed(SEARCH_TYPE_POPULATION)).toEqual(true);
                    });
                });

                describe('item population statistics', function () {
                    var itemWithStatstics;
                    beforeEach(inject(function (accessRequestTestData) {
                        itemWithStatstics = new AccessRequestItem(accessRequestTestData.IDENTITY_SEARCH_ROLE);
                    }));

                    describe('isPopulationPercentageHigh', function () {
                        it('returns true if population percentage is high', function () {
                            itemWithStatstics.populationStatistics.count = 18;
                            expect(ctrl.isPopulationPercentageHigh(itemWithStatstics)).toEqual(true);
                        });

                        it('returns false if population percentage is not high', function () {
                            // cutoff for High is 80 percent, test 75
                            itemWithStatstics.populationStatistics.count = 15;
                            expect(ctrl.isPopulationPercentageHigh(itemWithStatstics)).toEqual(false);
                        });
                    });

                    describe('isPopulationPercentageMedium', function () {
                        it('returns true if population percentage is medium', function () {
                            itemWithStatstics.populationStatistics.count = 10;
                            expect(ctrl.isPopulationPercentageMedium(itemWithStatstics)).toEqual(true);
                        });

                        it('returns false if population percentage is too high', function () {
                            // cutoff for Medium is 79 percent, test 80
                            itemWithStatstics.populationStatistics.count = 16;
                            expect(ctrl.isPopulationPercentageMedium(itemWithStatstics)).toEqual(false);
                        });

                        it('returns false if population percentage is too low', function () {
                            // cutoff for Medium is 30 percent, test 25
                            itemWithStatstics.populationStatistics.count = 5;
                            expect(ctrl.isPopulationPercentageMedium(itemWithStatstics)).toEqual(false);
                        });
                    });

                    describe('isPopulationPercentageLow', function () {
                        it('returns true if population percentage is low', function () {
                            itemWithStatstics.populationStatistics.count = 5;
                            expect(ctrl.isPopulationPercentageLow(itemWithStatstics)).toEqual(true);
                        });

                        it('returns false if population percentage is too high', function () {
                            // cutoff for Low is 29 percent, test 30
                            itemWithStatstics.populationStatistics.count = 6;
                            expect(ctrl.isPopulationPercentageLow(itemWithStatstics)).toEqual(false);
                        });
                    });

                    describe('showMatchedPopulationDialog()', function () {
                        it('should throw when no item is passed', function () {
                            expect(function () {
                                ctrl.showMatchedPopulationDialog();
                            }).toThrow();
                        });

                        it('should open a modal dialog', function () {
                            ctrl.showMatchedPopulationDialog(item);
                            $rootScope.$digest();
                            expect(spModal.open).toHaveBeenCalled();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEl0ZW1zQ3RybFRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUztJQUF0Sjs7SUFHSSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsMEJBQTBCLFlBQVc7O2dCQUUxQyxJQUFJLGFBQWEsYUFDYiwwQkFBMEIsMkJBQTJCLDRCQUNyRCxzQ0FBc0MsV0FBVyxZQUFZLE1BQU0sTUFBTSxPQUFPLFVBQVUscUJBQzFGLG1CQUFtQixpQkFBaUIsdUJBQXVCLGVBQWUsU0FDMUUsZ0NBQWdDLFVBQVUscUJBQXFCLHdCQUF3QixzQkFDdkY7OztnQkFJSixXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLHFCQUFxQixVQUFTLFlBQVk7O29CQUV4RCxXQUFXLDJCQUEyQjs7Ozs7OztnQkFPMUMsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLDZCQUM1QixxQkFBcUIsVUFBVSxrQ0FDL0IsYUFBYSxlQUFlLGVBQWUsY0FDM0MsOEJBQThCLHdDQUF3QyxJQUN0RSxXQUFXLGtDQUFrQyxXQUFXLHVCQUN4RCx1QkFBdUIsMEJBQTBCLHdCQUF3Qjs7O29CQUdoRywyQkFBMkI7b0JBQzNCLDRCQUE0QjtvQkFDNUIsNkJBQTZCO29CQUM3Qix1Q0FBdUM7b0JBQ3ZDLGlDQUFpQztvQkFDakMsY0FBYztvQkFDZCxjQUFjO29CQUNkLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixrQkFBa0IsR0FBRztvQkFDckIsVUFBVTtvQkFDVixNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVk7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Tjs7O3dCQUdQLEdBQUcsOEJBQThCLFlBQVc7NEJBQ3hDLEtBQUssNEJBQTRCOzRCQUNqQyxXQUFXOzRCQUNYLE9BQU8sUUFBUSxNQUFNOzs7Ozs7O0dBakRsQyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RJdGVtc0N0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcbmltcG9ydCAnLi9BY2Nlc3NSZXF1ZXN0VGVzdERhdGEnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWNjZXNzUmVxdWVzdEl0ZW1zQ3RybC5cclxuICovXHJcbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0SXRlbXNDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSxcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsIGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZSwgUGFnZVN0YXRlLCAkcm9vdFNjb3BlLCBjdHJsLCBpdGVtLCBpdGVtMiwgaWRlbnRpdHksIGFkZGl0aW9uYWxRdWVzdGlvbnMsXHJcbiAgICAgICAgY29uZmlnU2VydmljZU1vY2ssIGZpbHRlcnNEZWZlcnJlZCwgYWNjdFNlbGVjdGlvbkRlZmVycmVkLCBtb2RhbERlZmVycmVkLCBzcE1vZGFsLFxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgbG9jYXRpb24sIFNFQVJDSF9UWVBFX0tFWVdPUkQsIFNFQVJDSF9UWVBFX1BPUFVMQVRJT04sIFNFQVJDSF9UWVBFX0lERU5USVRZLFxyXG4gICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtO1xyXG5cclxuXHJcbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUsIGZ1bmN0aW9uKCRxUHJvdmlkZXIpIHtcclxuICAgICAgICAvLyBpZ25vcmUgdGhlIHVuaGFuZGxlZCByZWplY3Rpb25zIG9uIHRoaXMgY29udHJvbGxlciBzaW5jZSB0aGV5IGFyZSBoYW5kbGVkIG9uIHRoZSBTZWxlY3RCdXR0b25EaXJlY3RpdmVcclxuICAgICAgICAkcVByb3ZpZGVyLmVycm9yT25VbmhhbmRsZWRSZWplY3Rpb25zKGZhbHNlKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAqL1xyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMjAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQWNjZXNzUmVxdWVzdEl0ZW1fLCBJZGVudGl0eSwgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfUGFnZVN0YXRlXywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlXywgX2FjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZV8sICRxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NwTW9kYWxfLCBfYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlXywgJGxvY2F0aW9uLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfU0VBUkNIX1RZUEVfS0VZV09SRF8sIF9TRUFSQ0hfVFlQRV9QT1BVTEFUSU9OXywgX1NFQVJDSF9UWVBFX0lERU5USVRZXykge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlXztcclxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgIFBhZ2VTdGF0ZSA9IF9QYWdlU3RhdGVfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgZmlsdGVyc0RlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihfYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2VfLCAnZ2V0QWNjZXNzSXRlbUZpbHRlcnMnKS5hbmQucmV0dXJuVmFsdWUoZmlsdGVyc0RlZmVycmVkLnByb21pc2UpO1xyXG4gICAgICAgIGxvY2F0aW9uID0gJGxvY2F0aW9uO1xyXG4gICAgICAgIFNFQVJDSF9UWVBFX0tFWVdPUkQgPSBfU0VBUkNIX1RZUEVfS0VZV09SRF87XHJcbiAgICAgICAgU0VBUkNIX1RZUEVfUE9QVUxBVElPTiA9IF9TRUFSQ0hfVFlQRV9QT1BVTEFUSU9OXztcclxuICAgICAgICBTRUFSQ0hfVFlQRV9JREVOVElUWSA9IF9TRUFSQ0hfVFlQRV9JREVOVElUWV87XHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdEl0ZW0gPSBfQWNjZXNzUmVxdWVzdEl0ZW1fO1xyXG4gICAgICAgIGFjY3RTZWxlY3Rpb25EZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhbiBpdGVtIGFuZCBpZGVudGl0eSB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgaXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSk7XHJcbiAgICAgICAgaXRlbTIgPSBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLlBFUk1JVFRFRF9ST0xFKTtcclxuICAgICAgICBpZGVudGl0eSA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIGl0ZW0gc2VydmljZSB0byByZXR1cm4gYSBzaW5nbGUgaXRlbS5cclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3RJdGVtcyA9XHJcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaXRlbSBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCBnZXRBZGRpdGlvbmFsUXVlc3Rpb25zKCkgdG8gcmV0dXJuIHNvbWUgcGVybWl0cy5cclxuICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtcclxuICAgICAgICAgICAgcGVybWl0dGVkUm9sZXM6IFsgYWNjZXNzUmVxdWVzdFRlc3REYXRhLlBFUk1JVFRFRF9ST0xFIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgYWRkaXRpb25hbFF1ZXN0aW9ucylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgY29uZmlnIHNlcnZpY2VcclxuICAgICAgICBjb25maWdTZXJ2aWNlTW9jayA9IHtcclxuICAgICAgICAgICAgZ2V0Q29sdW1uQ29uZmlnRW50cmllczogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7fVxyXG4gICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgZGF0YSBzZXJ2aWNlIHRvIHNweSBvbiBpdGVtIHNlbGVjdGlvbiBjaGFuZ2VzLlxyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRJZGVudGl0aWVzJykuYW5kLnJldHVyblZhbHVlKFsgaWRlbnRpdHkgXSk7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldElkZW50aXR5SWRzJykuYW5kLnJldHVyblZhbHVlKFtpZGVudGl0eS5pZF0pO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRSZXF1ZXN0ZWRJdGVtJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdyZW1vdmVSZXF1ZXN0ZWRJdGVtJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdzZXRQZXJtaXR0ZWRSb2xlcycpO1xyXG4gICAgICAgIHNweU9uKF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCAnZ2V0UXVpY2tMaW5rTmFtZScpLmFuZC5yZXR1cm5WYWx1ZSgnUmVxdWVzdCBBY2Nlc3MnKTtcclxuXHJcbiAgICAgICAgLyogTW9jayBvcGVuaW5nIHRoZSBhY2NvdW50U2VsZWN0aW9uIGRpYWxvZyAqL1xyXG4gICAgICAgIG1vZGFsRGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZSwgJ29wZW5EaWFsb2cnKVxyXG4gICAgICAgICAgICAuYW5kLnJldHVyblZhbHVlKG1vZGFsRGVmZXJyZWQucHJvbWlzZSk7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLCAnZWRpdEFjY291bnRTZWxlY3Rpb25zJylcclxuICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZShhY2N0U2VsZWN0aW9uRGVmZXJyZWQucHJvbWlzZSk7XHJcblxyXG4gICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdEl0ZW1zQ3RybCcsIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZTogYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSxcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlOiBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2VNb2NrXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ2ZldGNoZXMgaXRlbXMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBUaGUgc3RhcnQgYW5kIGxpbWl0IGFyZSBoYXJkLWNvZGVkLlxyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3RJdGVtcykuXHJcbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwge30sIDAsIDEyLCBpZGVudGl0eS5nZXRJZCgpLCBTRUFSQ0hfVFlQRV9LRVlXT1JELCAnUmVxdWVzdCBBY2Nlc3MnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdmZXRjaGVzIGZpbHRlcnMgd2hlbiBsb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UuZ2V0QWNjZXNzSXRlbUZpbHRlcnMpLlxyXG4gICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlcXVlc3RlZUlkKCksIFNFQVJDSF9UWVBFX0tFWVdPUkQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzU2VhcmNoQmxvY2tlZCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgc2VhcmNoIHR5cGUgaXMga2V5d29yZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlYXJjaEJsb2NrZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHNlYXJjaCB0eXBlIGlzIG5vdCBrZXl3b3JkIGFuZCB0aGVyZSBhcmUgYXBwbGllZCBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNBcHBsaWVkRmlsdGVycycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTZWFyY2hCbG9ja2VkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHNlYXJjaCB0eXBlIGlzIG5vdCBrZXl3b3JkIGFuZCBubyBzZWFyY2ggYXBwbGllZCBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdoYXNBcHBsaWVkRmlsdGVycycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTZWFyY2hCbG9ja2VkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9JREVOVElUWSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2VhcmNoQmxvY2tlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCAoJ2Jsb2NrcyBzZWFyY2ggYW5kIHJldHVybnMgZW1wdHkgcHJvbWlzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzU2VhcmNoQmxvY2tlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0SXRlbXMuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgZGF0YSA9IGN0cmwuZG9TZWFyY2goKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0SXRlbXMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLm9iamVjdHMpLnRvRXF1YWwoW10pO1xyXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5jb3VudCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWxlY3QgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdhZGRzIGl0ZW1zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBudWxsKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhZGRzIHBlcm1pdHRlZCBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0T3RoZXJSZXF1ZXN0ZWRSb2xlcycpLmFuZC5yZXR1cm5WYWx1ZShbXSk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtMiwgaXRlbSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0yLCBpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2xvYWRzIGFkZGl0aW9uYWwgcXVlc3Rpb25zIHRoZSBmaXJzdCB0aW1lIGl0IGlzIGNhbGxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLCBbaWRlbnRpdHkuaWRdLFxyXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFtdLCAnUmVxdWVzdCBBY2Nlc3MnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHBhc3MgcGVybWl0dGluZyByb2xlIGFuZCBvdGhlciByZXF1ZXN0ZWQgcm9sZXMgaWYgc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmYWtlUmVxdWVzdGVkUm9sZSA9IHtmb286ICdiYXInfTtcclxuICAgICAgICAgICAgdmFyIGZha2VQZXJtaXR0ZWRSb2xlID0ge2ZvbzogJ2Jheid9O1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0T3RoZXJSZXF1ZXN0ZWRSb2xlcycpLlxyXG4gICAgICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZShbZmFrZVJlcXVlc3RlZFJvbGUsIGZha2VQZXJtaXR0ZWRSb2xlXSk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBpdGVtMik7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKS5cclxuICAgICAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLCBbaWRlbnRpdHkuaWRdLCBpdGVtMiwgdW5kZWZpbmVkLCBbZmFrZVJlcXVlc3RlZFJvbGUsIGZha2VQZXJtaXR0ZWRSb2xlXSxcclxuICAgICAgICAgICAgICAgICAgICAnUmVxdWVzdCBBY2Nlc3MnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2xvYWRzIGFkZGl0aW9uYWwgcXVlc3Rpb25zIHRoZSBzdWJzZXF1ZW50IHRpbWVzIGl0IGlzIGNhbGxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UGVybWl0dGVkUm9sZXMnKS5cclxuICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZShhZGRpdGlvbmFsUXVlc3Rpb25zLnBlcm1pdHRlZFJvbGVzKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2F2ZXMgcGVybWl0dGVkIHJvbGVzIGluIHRoZSBkYXRhIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuc2V0UGVybWl0dGVkUm9sZXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbS5nZXRJZCgpLCBhZGRpdGlvbmFsUXVlc3Rpb25zLnBlcm1pdHRlZFJvbGVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2FkZGl0aW9uYWwgcXVlc3Rpb25zIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3Qgb3BlbiB0aGUgYWRkaXRpb25hbCBxdWVzdGlvbnMgZGlhbG9nIGlmIHRoZXJlIGFyZSBudWxsIGFjY291bnQgc2VsZWN0aW9ucyBhbmQgJyArXHJcbiAgICAgICAgICAgICAgICAnYW1iaWd1b3VzIGFzc2lnbmVkIHJvbGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2Uub3BlbkRpYWxvZykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3Qgb3BlbiB0aGUgYWNjb3VudCBzZWxlY3Rpb24gZGlhbG9nIGlmIHRoZXJlIGFyZSBlbXB0eSBhY2NvdW50IHNlbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5vcGVuRGlhbG9nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBvcGVuIHRoZSBhY2NvdW50IHNlbGVjdGlvbiBkaWFsb2cgaWYgdGhlcmUgYXJlIGVtcHR5IGFtYmlndW91cyBhc3NpZ25lZCByb2xlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9ucy5hbWJpZ3VvdXNBc3NpZ25lZFJvbGVzID0gW107XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2Uub3BlbkRpYWxvZykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnb3BlbnMgdGhlIGFjY291bnQgc2VsZWN0aW9uIGRpYWxvZyBpZiB0aGVyZSBhcmUgYWNjb3VudCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgc29tZSBhY2NvdW50IHNlbGVjdGlvbnMgdG8gY2F1c2UgdGhlIGRpYWxvZyB0byBwb3B1cC5cclxuICAgICAgICAgICAgICAgIHZhciBhY2N0U2VscyA9IFsgJ2Zvb2JhcicgXTtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMgPSBhY2N0U2VscztcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0T3RoZXJSZXF1ZXN0ZWRSb2xlcycpLmFuZC5yZXR1cm5WYWx1ZShbXSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSwgaXRlbTIpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLm9wZW5EaWFsb2cpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0sIGFjY3RTZWxzLCB1bmRlZmluZWQsIGl0ZW0yLmlkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdvcGVucyB0aGUgYWNjb3VudCBzZWxlY3Rpb24gZGlhbG9nIGlmIHRoZXJlIGFyZSBhbWJpZ3VvdXMgYXNzaWduZWQgcm9sZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbWJpZ3VvdXNBc3NpZ25lZFJvbGVzID0gWyB7IHdoYXRldmVyOiAneWVhJ30gXTtcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnMuYW1iaWd1b3VzQXNzaWduZWRSb2xlcyA9IGFtYmlndW91c0Fzc2lnbmVkUm9sZXM7XHJcblxyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdEFjY291bnRTZWxlY3Rpb25TZXJ2aWNlLm9wZW5EaWFsb2cpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0sIHVuZGVmaW5lZCwgYW1iaWd1b3VzQXNzaWduZWRSb2xlcywgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkZXNlbGVjdHMgdGhlIGl0ZW0gaWYgdGhlIGRpYWxvZyBpcyBjYW5jZWxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHNvbWUgYWNjb3VudCBzZWxlY3Rpb25zIHRvIGNhdXNlIHRoZSBkaWFsb2cgdG8gcG9wdXAuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWNjdFNlbHMgPSBbe31dO1xyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9ucy5hY2NvdW50U2VsZWN0aW9ucyA9IGFjY3RTZWxzO1xyXG5cclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlc29sdmluZyBzaW11bGF0ZXMgZ2V0dGluZyB0aGUgYWRkaXRpb25hbCBxdWVzdGlvbnMgYmFja1xyXG4gICAgICAgICAgICAgICAgYWNjdFNlbGVjdGlvbkRlZmVycmVkLnJlc29sdmUoYWRkaXRpb25hbFF1ZXN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWplY3Rpbmcgc2ltdWxhdGVzIGEgY2FuY2VsZWQgZGlhbG9nLlxyXG4gICAgICAgICAgICAgICAgbW9kYWxEZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSXRlbVNlbGVjdGVkKGl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2V0cyBzZWxlY3Rpb25zIGFuZCBhc3NpZ25tZW50IGlkIHdoZW4gZGlhbG9nIGlzIGNvbXBsZXRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3NldFJlcXVlc3RlZEl0ZW1BY2NvdW50U2VsZWN0aW9ucycpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3NldEFzc2lnbm1lbnRJZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBzb21lIGFjY291bnQgc2VsZWN0aW9ucyB0byBjYXVzZSB0aGUgZGlhbG9nIHRvIHBvcHVwIG9uIHNlbGVjdGVkSXRlbS5cclxuICAgICAgICAgICAgICAgIHZhciBhY2N0U2VscyA9IFt7fV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduZWRSb2xlcyA9IFt7fV0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudElkID0gJzEyNDQnO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnMuYWNjb3VudFNlbGVjdGlvbnMgPSBhY2N0U2VscztcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnMuYW1iaWd1b3VzQXNzaWduZWRSb2xlcyA9IGFzc2lnbmVkUm9sZXM7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZpbmcgc2ltdWxhdGVzIGdldHRpbmcgdGhlIGFkZGl0aW9uYWwgcXVlc3Rpb25zIGJhY2tcclxuICAgICAgICAgICAgICAgIGFjY3RTZWxlY3Rpb25EZWZlcnJlZC5yZXNvbHZlKGFkZGl0aW9uYWxRdWVzdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2aW5nIHNpbXVsYXRlcyBhIGZpbmlzaGVkIGRpYWxvZy5cclxuICAgICAgICAgICAgICAgIG1vZGFsRGVmZXJyZWQucmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnM6IGFjY3RTZWxzLFxyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRJZDogYXNzaWdubWVudElkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLnNldFJlcXVlc3RlZEl0ZW1BY2NvdW50U2VsZWN0aW9ucykuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSwgYWNjdFNlbHMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuc2V0QXNzaWdubWVudElkKS5cclxuICAgICAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLCBhc3NpZ25tZW50SWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW1vdmVzIGl0ZW0gd2hlbiBkZXNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3RybC5kZXNlbGVjdEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkucmVtb3ZlUmVxdWVzdGVkSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdGVzdEl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbihpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdoYXNSZXF1ZXN0ZWRJdGVtJykuYW5kLnJldHVyblZhbHVlKGlzU2VsZWN0ZWQpO1xyXG4gICAgICAgIHNlbGVjdGVkID0gY3RybC5pc0l0ZW1TZWxlY3RlZChpdGVtKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5oYXNSZXF1ZXN0ZWRJdGVtKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtKTtcclxuICAgICAgICBleHBlY3Qoc2VsZWN0ZWQpLnRvRXF1YWwoaXNTZWxlY3RlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGl0KCdzYXlzIHRoYXQgYW4gaXRlbSBpcyBzZWxlY3RlZCBpZiBhZGRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRlc3RJdGVtU2VsZWN0aW9uKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3NheXMgdGhhdCBhbiBpdGVtIGlzIG5vdCBzZWxlY3RlZCBpZiBub3QgYWRkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB0ZXN0SXRlbVNlbGVjdGlvbihmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBwZXJtaXR0ZWQgcm9sZXMgZnJvbSB0aGUgZGF0YSBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFBlcm1pdHRlZFJvbGVzJyk7XHJcbiAgICAgICAgY3RybC5nZXRQZXJtaXR0ZWRSb2xlcyhpdGVtKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5nZXRQZXJtaXR0ZWRSb2xlcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbS5nZXRJZCgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRTZWxlY3RlZFBlcm1pdHRlZFJvbGVDb3VudCBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIDAgd2hlbiBubyBwZXJtaXR0ZWQgcm9sZXMgZXhpc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZFBlcm1pdHRlZEl0ZW1zJykuYW5kLnJldHVyblZhbHVlKFtdKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U2VsZWN0ZWRQZXJtaXR0ZWRSb2xlQ291bnQoaXRlbSkpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlcXVlc3RlZFBlcm1pdHRlZEl0ZW1zKS5cclxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtpdGVtOiBpdGVtfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IGNvdW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZXF1ZXN0ZWRQZXJtaXR0ZWRJdGVtcycpLlxyXG4gICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFt7fSx7fSx7fV0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTZWxlY3RlZFBlcm1pdHRlZFJvbGVDb3VudChpdGVtKSkudG9FcXVhbCgzKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0UmVxdWVzdGVkUGVybWl0dGVkSXRlbXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoe2l0ZW06IGl0ZW19KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd0cmFja3Mgd2hpY2ggcm9sZXMgaGF2ZSBleHBhbmRlZCBwZXJtaXRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNTaG93UGVybWl0dGVkUm9sZXMoaXRlbSkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIGN0cmwudG9nZ2xlU2hvd1Blcm1pdHRlZFJvbGVzKGl0ZW0pO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmlzU2hvd1Blcm1pdHRlZFJvbGVzKGl0ZW0pKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgY3RybC50b2dnbGVTaG93UGVybWl0dGVkUm9sZXMoaXRlbSk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNTaG93UGVybWl0dGVkUm9sZXMoaXRlbSkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmlzU2hvd1Blcm1pdHRlZFJvbGVzKGl0ZW0yKSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZWRpdEFjY291bnRTZWxlY3Rpb25zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbSwgcmVxdWVzdGVkSXRlbTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAzMjFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW0nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5pZCA9PT0gMzIxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RlZEl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyByZXF1ZXN0ZWRpdGVtIGZvciBhY2Nlc3MgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmVkaXRBY2NvdW50U2VsZWN0aW9ucyh7aXRlbTogMTIzfSk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBhY2NvdW50IHNlbGVjdGlvbiBkaWFsb2cgd2hlbiBjYWxsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC5lZGl0QWNjb3VudFNlbGVjdGlvbnMoaXRlbSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0QWNjb3VudFNlbGVjdGlvblNlcnZpY2UuZWRpdEFjY291bnRTZWxlY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChyZXF1ZXN0ZWRJdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdXBkYXRlIHRoZSByZXF1ZXN0ZWRJdGVtIHdoZW4gdGhlIGRpYWxvZyBpcyByZWplY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjb3VudFNlbGVjdGlvbnMgPSBbeyd0aGlzIGlzJzogJ2EgdGVzdCd9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IGFjY291bnRTZWxlY3Rpb25zO1xyXG4gICAgICAgICAgICBjdHJsLmVkaXRBY2NvdW50U2VsZWN0aW9ucyhpdGVtKTtcclxuICAgICAgICAgICAgYWNjdFNlbGVjdGlvbkRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5lZGl0QWNjb3VudFNlbGVjdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uYWNjb3VudFNlbGVjdGlvbnMpLnRvQmUoYWNjb3VudFNlbGVjdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgcmVxdWVzdGVkSXRlbSB3aGVuIHRoZSBkaWFsb2cgaXMgcmVzb2x2ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGFjY291bnRTZWxlY3Rpb25zID0gW3sndGhpcyBpcyc6ICdhIHRlc3QnfV0sXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkQWNjb3VudFNlbGVjdGlvbnMgPSBbe2ZvbzogJ2Jhcid9LCB7c29tZXRoaW5nOiAnZWxzZSd9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IGFjY291bnRTZWxlY3Rpb25zO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gYWNjb3VudFNlbGVjdGlvbnM7XHJcbiAgICAgICAgICAgIGN0cmwuZWRpdEFjY291bnRTZWxlY3Rpb25zKGl0ZW0pO1xyXG4gICAgICAgICAgICBhY2N0U2VsZWN0aW9uRGVmZXJyZWQucmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50U2VsZWN0aW9uczogdXBkYXRlZEFjY291bnRTZWxlY3Rpb25zXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RBY2NvdW50U2VsZWN0aW9uU2VydmljZS5lZGl0QWNjb3VudFNlbGVjdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZEl0ZW0uYWNjb3VudFNlbGVjdGlvbnMpLnRvQmUodXBkYXRlZEFjY291bnRTZWxlY3Rpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWxlY3QgaXRlbSBwZW5kaW5nIG9yIGN1cnJlbnRseSBhc3NpZ25lZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhZGRpdGlvbmFsUXVlc3Rpb25zQ3VycmVudGx5QXNzaWduZWQsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnNQZW5kaW5nLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zUmFuZG9tU3RhdHVzLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zSW52YWxpZFJlcXVlc3RlZXMsXHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnNCdWxrQXNzaWduZWRPclBlbmRpbmc7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHRoZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMpIHtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc0N1cnJlbnRseUFzc2lnbmVkID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMuU1RBVFVTX0NVUlJFTlRMWV9BU1NJR05FRFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc1BlbmRpbmcgPSBuZXcgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMoe1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucy5TVEFUVVNfUEVORElOR19SRVFVRVNUXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zUmFuZG9tU3RhdHVzID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogJ01hbmRlbGJhdW0hJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc0ludmFsaWRSZXF1ZXN0ZWVzID0gbmV3IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMuU1RBVFVTX0lOVkFMSURfUkVRVUVTVEVFUyxcclxuICAgICAgICAgICAgICAgIGludmFsaWRSZXF1ZXN0ZWVzOiBbJ3NvbWVndXknXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFF1ZXN0aW9uc0J1bGtBc3NpZ25lZE9yUGVuZGluZyA9IG5ldyBBY2Nlc3NSZXF1ZXN0QWRkaXRpb25hbFF1ZXN0aW9ucyh7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zLlNUQVRVU19CVUxLX0FTU0lHTkVEX09SX1BFTkRJTkcsXHJcbiAgICAgICAgICAgICAgICBpbnZhbGlkUmVxdWVzdGVlczogWydzb21lZ3V5J11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8qIFJlbW92ZSB0aGUgc3B5ICovXHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucyA9IHt9O1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzZWxlY3QgdGhlIGl0ZW0gd2hlbiBhbiBpdGVtIGhhcyBubyBzdGF0dXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgJ2dldEFkZGl0aW9uYWxRdWVzdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBhZGRpdGlvbmFsUXVlc3Rpb25zKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRSZXF1ZXN0ZWRJdGVtKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLCBudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgc2VsZWN0IHRoZSBpdGVtIHdoZW4gYW4gaXRlbSBoYXMgcmFuZG9tIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGFkZGl0aW9uYWxRdWVzdGlvbnNSYW5kb21TdGF0dXMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBudWxsKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0sIG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZWxlY3QgdGhlIGl0ZW0gd2hlbiBhbiBpdGVtIGlzIGN1cnJlbnRseSBhc3NpZ25lZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGFkZGl0aW9uYWxRdWVzdGlvbnNDdXJyZW50bHlBc3NpZ25lZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0sIG51bGwpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkUmVxdWVzdGVkSXRlbSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgc2VsZWN0IHRoZSBpdGVtIHdoZW4gYW4gaXRlbSBpcyBwZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsICdnZXRBZGRpdGlvbmFsUXVlc3Rpb25zJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgYWRkaXRpb25hbFF1ZXN0aW9uc1BlbmRpbmcpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBudWxsKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZFJlcXVlc3RlZEl0ZW0pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiB0aGUgbW9kYWwgd2hlbiBhbiBpdGVtIGlzIGN1cnJlbnRseSBhc3NpZ25lZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGFkZGl0aW9uYWxRdWVzdGlvbnNDdXJyZW50bHlBc3NpZ25lZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0sIG51bGwpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gdGhlIG1vZGFsIHdoZW4gYW4gaXRlbSBpcyBwZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsICdnZXRBZGRpdGlvbmFsUXVlc3Rpb25zJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgYWRkaXRpb25hbFF1ZXN0aW9uc1BlbmRpbmcpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBudWxsKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgbW9kYWwgd2hlbiBoYXMgaW52YWxpZCByZXF1ZXN0ZWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNlbnRBcmc7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsICdnZXRBZGRpdGlvbmFsUXVlc3Rpb25zJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgYWRkaXRpb25hbFF1ZXN0aW9uc0ludmFsaWRSZXF1ZXN0ZWVzKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdEl0ZW0oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIHJlY2VudEFyZyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcclxuICAgICAgICAgICAgLyogRXhlcmNpc2Ugc29tZSBvZiB0aGUgYXJncyovXHJcbiAgICAgICAgICAgIGV4cGVjdChyZWNlbnRBcmcuaWQpLnRvRXF1YWwoJ2ludmFsaWRSZXF1ZXN0ZWVzRGlhbG9nJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZWNlbnRBcmcud2FybmluZ0xldmVsKS50b0VxdWFsKCd3YXJuaW5nJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZWNlbnRBcmcucmVzb2x2ZS5tZXNzYWdlS2V5KCkpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X2ludmFsaWRfcmVxdWVzdGVlc19oZWFkZXInKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlY2VudEFyZy5yZXNvbHZlLmludmFsaWRSZXF1ZXN0ZWVzKCkpLnRvRXF1YWwoXHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsUXVlc3Rpb25zSW52YWxpZFJlcXVlc3RlZXMuaW52YWxpZFJlcXVlc3RlZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVjZW50QXJnLnJlc29sdmUucmVuZGVyTGltaXQoKSkudG9FcXVhbCg1KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgbW9kYWwgd2hlbiBoYXMgYnVsayBhc3NpZ25lZCBvciBwZW5kaW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNlbnRBcmc7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UsICdnZXRBZGRpdGlvbmFsUXVlc3Rpb25zJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgYWRkaXRpb25hbFF1ZXN0aW9uc0J1bGtBc3NpZ25lZE9yUGVuZGluZylcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJdGVtKGl0ZW0sIG51bGwpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICByZWNlbnRBcmcgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIC8qIEV4ZXJjaXNlIHNvbWUgb2YgdGhlIGFyZ3MqL1xyXG4gICAgICAgICAgICBleHBlY3QocmVjZW50QXJnLmlkKS50b0VxdWFsKCdpbnZhbGlkUmVxdWVzdGVlc0RpYWxvZycpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVjZW50QXJnLndhcm5pbmdMZXZlbCkudG9FcXVhbCgnd2FybmluZycpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVjZW50QXJnLnJlc29sdmUubWVzc2FnZUtleSgpKS50b0VxdWFsKCd1aV9hY2Nlc3NfcmVxdWVzdF9idWxrX2Fzc2lnbmVkX2hlYWRlcicpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVjZW50QXJnLnJlc29sdmUuaW52YWxpZFJlcXVlc3RlZXMoKSkudG9FcXVhbChcclxuICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxRdWVzdGlvbnNJbnZhbGlkUmVxdWVzdGVlcy5pbnZhbGlkUmVxdWVzdGVlcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZWNlbnRBcmcucmVzb2x2ZS5yZW5kZXJMaW1pdCgpKS50b0VxdWFsKDUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBvcGVuIHRoZSBtb2RhbCB3aGVuIGFuIGl0ZW0gaGFzIG5vIHN0YXR1cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGFkZGl0aW9uYWxRdWVzdGlvbnMpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SXRlbShpdGVtLCBudWxsKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2RlZXAgZmlsdGVyIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaWRlbnRpdHlEYXRhLCBpZGVudGl0eSwgbmF2aWdhdGlvblNlcnZpY2UsIHNwTm90aWZpY2F0aW9uU2VydmljZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oSWRlbnRpdHksIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSwgJHEsIF9uYXZpZ2F0aW9uU2VydmljZV8sIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcclxuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlID0gX3NwTm90aWZpY2F0aW9uU2VydmljZV87XHJcbiAgICAgICAgICAgIGlkZW50aXR5RGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTE7XHJcbiAgICAgICAgICAgIGlkZW50aXR5ID0gbmV3IElkZW50aXR5KGlkZW50aXR5RGF0YSk7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRUYXJnZXRJZGVudGl0eSA9XHJcbiAgICAgICAgICAgICAgICBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0VGFyZ2V0SWRlbnRpdHknKS5hbmQuY2FsbEZha2UoKCkgPT4gJHEud2hlbihpZGVudGl0eSkpO1xyXG4gICAgICAgICAgICBzcHlPbihsb2NhdGlvbiwgJ3BhdGgnKS5hbmQucmV0dXJuVmFsdWUoJy9hY2Nlc3NSZXF1ZXN0U2VsZi9hZGQnKTtcclxuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xyXG4gICAgICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGROb3RpZmljYXRpb24nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRUYXJnZXRJZGVudGl0eSB3aGVuIGRlZXBMaW5rTWFuYWdlQWNjZXNzIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmRlZXBMaW5rTWFuYWdlQWNjZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciBzbyB0aGUgaW5pdCBnZXRzIGZpcmVkLlxyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0VGFyZ2V0SWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBnZXRUYXJnZXRJZGVudGl0eSB3aGVuIGRlZXBMaW5rTWFuYWdlQWNjZXNzIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5kZWVwTGlua01hbmFnZUFjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHNvIHRoZSBpbml0IGdldHMgZmlyZWQuXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRUYXJnZXRJZGVudGl0eSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBnZXRUYXJnZXRJZGVudGl0eSB3aGVuIGRlZXBMaW5rUmV2aWV3IGlzIHRydWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmRlZXBMaW5rUmV2aWV3ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgc28gdGhlIGluaXQgZ2V0cyBmaXJlZC5cclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHNldCBlcnJvciBhbmQgZ28gYmFjayB0byBob21lIGlmIHRhcmdldCBpZGVudGl0eSBpcyBudWxsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZGVudGl0eSA9IG51bGw7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5kZWVwTGlua01hbmFnZUFjY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBhcmdzID0gbmF2aWdhdGlvblNlcnZpY2UuZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLnN0YXRlKS50b0VxdWFsKCdob21lJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlICgnZGVlcCBsaW5rIGluaXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJLZXkgOiAnZmlsdGVyIHZhbHVlcydcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldHVwRGVlcExpbmtDb250cm9sbGVyKHNlYXJjaFR5cGUsIGlzQWxsb3dlZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0N0cmw7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZGVlcExpbmtNYW5hZ2VBY2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLnJlcXVlc3RBY2Nlc3NTZWFyY2hUeXBlID0gc2VhcmNoVHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgJ2dldEFjY2Vzc0ZpbHRlclZhbHVlcycpLmFuZC5yZXR1cm5WYWx1ZShmaWx0ZXJzRGVmZXJyZWQucHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdzZXRTZWFyY2hUeXBlJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldEl0ZW1TZWFyY2hEYXRhID1cclxuICAgICAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hUZXJtOiAnc29tZSBzZWFyY2ggdGVybScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IGZpbHRlckRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICAgICAgICAgIG5ld0N0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3B5T24obmV3Q3RybCwgJ2lzU2VhcmNoVHlwZUFsbG93ZWQnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQWxsb3dlZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3Q3RybDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBzZXQgQWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlIHNlYXJjaCB0eXBlIHRvIEFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSBzZWFyY2ggdHlwZScsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHJsID0gc2V0dXBEZWVwTGlua0NvbnRyb2xsZXIoU0VBUkNIX1RZUEVfUE9QVUxBVElPTiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRTZWFyY2hUeXBlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldFNlYXJjaFR5cGUoKSkudG9FcXVhbChTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2hhbmdlIHNlYXJjaCB0eXBlIGlmIG5vdCBhbGxvd2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsID0gc2V0dXBEZWVwTGlua0NvbnRyb2xsZXIoU0VBUkNIX1RZUEVfUE9QVUxBVElPTiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRTZWFyY2hUeXBlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRTZWFyY2hUeXBlKCkpLnRvRXF1YWwoU0VBUkNIX1RZUEVfS0VZV09SRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBtZXJnZSBzZWFyY2hEYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsID0gc2V0dXBEZWVwTGlua0NvbnRyb2xsZXIoU0VBUkNIX1RZUEVfS0VZV09SRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5zZWFyY2hEYXRhLnNlYXJjaFRlcm0pLnRvRXF1YWwoJ3NvbWUgc2VhcmNoIHRlcm0nKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBhZ2VTdGF0ZSgpLnNlYXJjaERhdGEuZmlsdGVyVmFsdWVzKS50b0VxdWFsKGZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93SXRlbURldGFpbHMoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBubyBpdGVtIGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNob3dJdGVtRGV0YWlscygpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIG1vZGFsIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNob3dJdGVtRGV0YWlscyhpdGVtKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBrZXl3b3JkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFNlYXJjaFR5cGUoKSkudG9FcXVhbChTRUFSQ0hfVFlQRV9LRVlXT1JEKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2dldFNlYXJjaFR5cGUoKSByZXR1cm5zIGN1cnJlbnQgc2VhcmNoIHR5cGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAnZ2V0U2VhcmNoVHlwZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldFNlYXJjaFR5cGUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGN0cmwuZ2V0U2VhcmNoVHlwZSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldFNlYXJjaFR5cGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NoYW5nZVNlYXJjaFR5cGUoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRGF0YTEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyMTogJ1dob1xcJ3MgdGhhdCBkYXBwZXIgc3dpbmRsZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjI6ICdvdXQgb2YgVGFtbWFueSBoYWxsPycsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyMzogJ2l0XFwncyBUaGUgU25lYWshJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpbHRlckRhdGEyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjc6ICdXaG8gcHV0IGEgYmVuZ2FsIHRpZ2VyIGluIHRoZSBLYWlzZXJcXCdzIGxhdHJpbmU/PycsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyODogJ2l0XFwncyBUaGUgU25lYWshJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIHNlYXJjaCB0eXBlIGRvZXMgbm90IGNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgdHlwZSBpcyB0aGUgc2FtZSBhbmQgdGhhdCBmaWx0ZXJzIGhhdmVuJ3QgYmVlbiBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnZG9Mb2FkRmlsdGVycycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZG9Mb2FkRmlsdGVycykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9LRVlXT1JEKTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5kb0xvYWRGaWx0ZXJzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRTZWFyY2hUeXBlKCkpLnRvRXF1YWwoU0VBUkNIX1RZUEVfS0VZV09SRCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2NoYW5nZXMgdGhlIHNlYXJjaCB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTZWFyY2hUeXBlKCkpLnRvRXF1YWwoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2hpZGVzIGZpbHRlcnMgd2hlbiBnb2luZyB0byBLZXl3b3JkIHNlYXJjaCB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmZpbHRlcnNEaXNwbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZmlsdGVyc0Rpc3BsYXllZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXBTZWFyY2hEYXRhKGZpbHRlckRhdGEsIGZpbHRlckdyb3Vwcykge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoY3RybC5nZXRQYWdlU3RhdGUoKS5zZWFyY2hEYXRhLmZpbHRlclZhbHVlcywgZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChjdHJsLnNlYXJjaFNjcmF0Y2hQYWQuZmlsdGVyVmFsdWVzLCBmaWx0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ2V0UGFnZVN0YXRlKCkuc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMgPSBmaWx0ZXJHcm91cHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFzc2VydFNlYXJjaERhdGEoZXhwZWN0ZWRWYWx1ZXMsIGV4cGVjdGVkRmlsdGVyR3JvdXBzKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5zZWFyY2hEYXRhLmZpbHRlclZhbHVlcykudG9FcXVhbChleHBlY3RlZFZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zZWFyY2hTY3JhdGNoUGFkLmZpbHRlclZhbHVlcykudG9FcXVhbChleHBlY3RlZFZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQYWdlU3RhdGUoKS5zZWFyY2hEYXRhLmZpbHRlckdyb3VwcykudG9FcXVhbChleHBlY3RlZEZpbHRlckdyb3Vwcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0KCdjcmVhdGVzIGJsYW5rIHNlYXJjaCBkYXRhIHdoZW4gc3dpdGNoaW5nIHRvIGEgbmV3IHR5cGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZpbGwgaW4gc29tZSBzZWFyY2ggZGF0YS5cclxuICAgICAgICAgICAgICAgIHNldHVwU2VhcmNoRGF0YShmaWx0ZXJEYXRhMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3dpdGNoIHR5cGVzLlxyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIGZpbHRlciB2YWx1ZXMgYXJlIGJsYW5rIGZvciB0aGUgc2NyYXRjaCBwYWQgYW5kIHNlYXJjaCBkYXRhLlxyXG4gICAgICAgICAgICAgICAgYXNzZXJ0U2VhcmNoRGF0YSh7fSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Jlc3RvcmVzIHRoZSBwcmV2aW91cyBzZWFyY2ggZGF0YSB3aGVuIHN3aXRjaGluZyB0eXBlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHNlYXJjaERhdGExIGZvciBrZXl3b3JkLCBzd2l0Y2ggdG8gcG9wdWxhdGlvbiBzZWFyY2ggYW5kIHVzZSBzZWFyY2hEYXRhMi5cclxuICAgICAgICAgICAgICAgIHNldHVwU2VhcmNoRGF0YShmaWx0ZXJEYXRhMSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICBzZXR1cFNlYXJjaERhdGEoZmlsdGVyRGF0YTIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdvIGJhY2sgdG8ga2V5d29yZCBzZWFyY2ggYW5kIG1ha2Ugc3VyZSB3ZSdyZSB1c2luZyBzZWFyY2hEYXRhMS5cclxuICAgICAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9LRVlXT1JEKTtcclxuICAgICAgICAgICAgICAgIGFzc2VydFNlYXJjaERhdGEoZmlsdGVyRGF0YTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCByZXN0b3JlIHRoZSBzZWFyY2ggc2NyYXRjaCBwYWQgd2hlbiBzd2l0Y2hpbmcgdHlwZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzY3JhdGNoUGFkRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIxOiAnd2hvXFwncyB0aGF0IGphdW50eSBqYWNrYW5hcGVzJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIyOiAnd2l0aCBtb3hpZSBhbmQgcGl6emF6ej8nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldHVwIHNlYXJjaERhdGExIHdpdGggZGlmZmVyZW50IHZhbHVlcyBpbiB0aGUgc2NyYXRjaCBwYWQuXHJcbiAgICAgICAgICAgICAgICBzZXR1cFNlYXJjaERhdGEoZmlsdGVyRGF0YTEpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWFyY2hTY3JhdGNoUGFkLmZpbHRlclZhbHVlcyA9IHNjcmF0Y2hQYWREYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN3aXRjaGluZyB0byBhbm90aGVyIHR5cGUgYW5kIHN3aXRjaGluZyBiYWNrIHNob3VsZCBub3QgcmVtZW1iZXIgdGhlIHNjcmF0Y2ggcGFkLlxyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX0tFWVdPUkQpO1xyXG4gICAgICAgICAgICAgICAgYXNzZXJ0U2VhcmNoRGF0YShmaWx0ZXJEYXRhMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2xvYWRzIGZpbHRlcnMgd2hlbiBzd2l0Y2hpbmcgdHlwZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIGdldCBmaWx0ZXJzIGNhbGwgcmV0dXJuIHNvbWV0aGluZyBuZXcuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3RmlsdGVycyA9IFsgJ25vdCcsICdyZWFsbHknLCAnZmlsdGVycycsICdidXQnLCAndGhhdCcsICdpcycsICdhbHJpZ2h0JyBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkRmlsdGVyR3JvdXBzID0gW1snbm90JywgJ3JlYWxseScsICdmaWx0ZXJzJywgJ2J1dCddLCBbJ3RoYXQnLCAnaXMnLCAnYWxyaWdodCddXTtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNEZWZlcnJlZC5yZXNvbHZlKG5ld0ZpbHRlcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNweSBvbiBkb0xvYWRGaWx0ZXJzIHRvIGVuc3VyZSBpdCBnZXRzIGNhbGxlZCB3aGVuIHN3aXRjaC5cclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdkb0xvYWRGaWx0ZXJzJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5kb0xvYWRGaWx0ZXJzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZpcmUhISEhXHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSBuZXcgZmlsdGVycyBoYXZlIGJlZW4gbG9hZGVkIGFuZCB0aGF0IGZpbHRlcnMgaGF2ZSBjaGFuZ2VkLlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UGFnZVN0YXRlKCkuc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMpLnRvRXF1YWwoZXhwZWN0ZWRGaWx0ZXJHcm91cHMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZG9Mb2FkRmlsdGVycykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCByZWxvYWQgZmlsdGVycyB3aGVuIHN3aXRjaGluZyBiYWNrIHRvIGEgcHJldmlvdXMgdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXdvcmRGaWx0ZXJzID0gWyAna2V5d29yZCcgXSxcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5lZEZpbHRlcnMgPSBbICdwb3B1bGF0aW9uJyBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUga2V5d29yZCBmaWx0ZXJzIGFuZCBtYWtlIHRoZSBmaWx0ZXIgc2VydmljZSByZXR1cm4gcG9wdWxhdGlvbiBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHN3aXRjaGluZyB0eXBlcy5cclxuICAgICAgICAgICAgICAgIGN0cmwuZ2V0UGFnZVN0YXRlKCkuc2VhcmNoRGF0YS5maWx0ZXJHcm91cHMgPSBba2V5d29yZEZpbHRlcnNdO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyc0RlZmVycmVkLnJlc29sdmUocmV0dXJuZWRGaWx0ZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTcHkgb24gbG9hZGluZyBzbyB0aGF0IHdlIGNhbiBzZWUgaG93IG1hbnkgdGltZXMgaXQgaXMgY2FsbGVkLlxyXG4gICAgICAgICAgICAgICAgc3B5T24oY3RybCwgJ2RvTG9hZEZpbHRlcnMnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmRvTG9hZEZpbHRlcnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3dpdGNoIHR5cGVzIC0gZW5zdXJlIGl0IGlzIGNhbGxlZCBvbmNlLlxyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmRvTG9hZEZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBhZ2VTdGF0ZSgpLnNlYXJjaERhdGEuZmlsdGVyR3JvdXBzKS50b0VxdWFsKFtyZXR1cm5lZEZpbHRlcnNdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTd2l0Y2ggYmFjayAtIGl0IHNob3VsZCB1c2UgdGhlIGNhY2hlZCB2YWx1ZXMgYW5kIG5vdCBoYXZlIGxvYWRlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgIGN0cmwuZG9Mb2FkRmlsdGVycy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX0tFWVdPUkQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZG9Mb2FkRmlsdGVycykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFBhZ2VTdGF0ZSgpLnNlYXJjaERhdGEuZmlsdGVyR3JvdXBzKS50b0VxdWFsKFtrZXl3b3JkRmlsdGVyc10pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc0tleXdvcmRTZWFyY2hUeXBlKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBrZXl3b3JkIHNlYXJjaCB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0tleXdvcmRTZWFyY2hUeXBlKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdCgncmV0dXJuIGZhbHNlIGlmIG5vdCBrZXl3b3JkIHNlYXJjaCB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0tleXdvcmRTZWFyY2hUeXBlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX0lERU5USVRZKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzS2V5d29yZFNlYXJjaFR5cGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaXNQb3B1bGF0aW9uU2VhcmNoVHlwZSgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcG9wdWxhdGlvbiBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uU2VhcmNoVHlwZSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaXQoJ3JldHVybiBmYWxzZSBpZiBub3QgcG9wdWxhdGlvbiBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uU2VhcmNoVHlwZSgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9JREVOVElUWSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1BvcHVsYXRpb25TZWFyY2hUeXBlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2lzSWRlbnRpdHlTZWFyY2hUeXBlKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBpZGVudGl0eSBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX0lERU5USVRZKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSWRlbnRpdHlTZWFyY2hUeXBlKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdCgncmV0dXJuIGZhbHNlIGlmIG5vdCBpZGVudGl0eSBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eVNlYXJjaFR5cGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0lkZW50aXR5U2VhcmNoVHlwZSgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkaXNhYmxlcyBoaWRpbmcgZmlsdGVycyBvbiBzZWFyY2ggaWYgaWRlbnRpdHkgb3IgcG9wdWxhdGlvbiBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0hpZGVGaWx0ZXJzT25TZWFyY2goKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5jaGFuZ2VTZWFyY2hUeXBlKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0hpZGVGaWx0ZXJzT25TZWFyY2goKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9JREVOVElUWSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSGlkZUZpbHRlcnNPblNlYXJjaCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2dldEZpbHRlckdyb3VwcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgdW5kZWZpbmVkIGlmIGlzRm9yS2V5d29yZFNlYXJjaFR5cGUgaXMgdHJ1ZSBhbmQgc2VhcmNoIHR5cGUgaXMgbm90IGtleXdvcmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwuY2hhbmdlU2VhcmNoVHlwZShTRUFSQ0hfVFlQRV9JREVOVElUWSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRGaWx0ZXJHcm91cHModHJ1ZSkpLnRvRXF1YWwodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgZmlsdGVycyBpZiBpc0ZvcktleXdvcmRTZWFyY2hUeXBlIGlzIHRydWUgYW5kIHNlYXJjaCB0eXBlIGlzIGtleXdvcmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEZpbHRlckdyb3Vwcyh0cnVlKSkudG9FcXVhbChjdHJsLmZpbHRlckdyb3Vwcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBpc0ZvcktleXdvcmRTZWFyY2hUeXBlIGlzIGZhbHNlIGFuZCBzZWFyY2ggdHlwZSBpcyBrZXl3b3JkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRGaWx0ZXJHcm91cHMoZmFsc2UpKS50b0VxdWFsKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBpc0ZvcktleXdvcmRTZWFyY2hUeXBlIGlzIHRydWUgYW5kIHNlYXJjaCB0eXBlIGlzIG5vdCBrZXl3b3JkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfSURFTlRJVFkpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RmlsdGVyR3JvdXBzKGZhbHNlKSkudG9FcXVhbChjdHJsLmZpbHRlckdyb3Vwcyk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmNoYW5nZVNlYXJjaFR5cGUoU0VBUkNIX1RZUEVfUE9QVUxBVElPTik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRGaWx0ZXJHcm91cHMoZmFsc2UpKS50b0VxdWFsKGN0cmwuZmlsdGVyR3JvdXBzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNQb3B1bGF0aW9uU2VhcmNoQWxsb3dlZCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGNvcnJlY3QgY29uZmlnIHZhbHVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2VNb2NrLmdldENvbmZpZ1ZhbHVlID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUG9wdWxhdGlvblNlYXJjaEFsbG93ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2VNb2NrLmdldENvbmZpZ1ZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIHZhbHVlIGlzIGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uZmlnU2VydmljZU1vY2suZ2V0Q29uZmlnVmFsdWUgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uU2VhcmNoQWxsb3dlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2VNb2NrLmdldENvbmZpZ1ZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNJZGVudGl0eVNlYXJjaEFsbG93ZWQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb3JyZWN0IGNvbmZpZyB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlTW9jay5nZXRDb25maWdWYWx1ZSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0lkZW50aXR5U2VhcmNoQWxsb3dlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZU1vY2suZ2V0Q29uZmlnVmFsdWUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gdmFsdWUgaXMgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlTW9jay5nZXRDb25maWdWYWx1ZSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKG51bGwpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0lkZW50aXR5U2VhcmNoQWxsb3dlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2VNb2NrLmdldENvbmZpZ1ZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNTZWFyY2hUeXBlQWxsb3dlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYga2V5d29yZCBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlYXJjaFR5cGVBbGxvd2VkKFNFQVJDSF9UWVBFX0tFWVdPUkQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpZGVudGl0eSBzZWFyY2ggdHlwZSBpcyBub3QgYWxsb3dlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNJZGVudGl0eVNlYXJjaEFsbG93ZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlYXJjaFR5cGVBbGxvd2VkKFNFQVJDSF9UWVBFX0lERU5USVRZKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgaWRlbnRpdHkgc2VhcmNoIHR5cGUgaXMgYWxsb3dlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNJZGVudGl0eVNlYXJjaEFsbG93ZWQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2VhcmNoVHlwZUFsbG93ZWQoU0VBUkNIX1RZUEVfSURFTlRJVFkpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBwb3B1bGF0aW9uIHNlYXJjaCB0eXBlIGlzIG5vdCBhbGxvd2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc1BvcHVsYXRpb25TZWFyY2hBbGxvd2VkJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTZWFyY2hUeXBlQWxsb3dlZChTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcG9wdWxhdGlvbiBzZWFyY2ggdHlwZSBpcyBhbGxvd2VkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc1BvcHVsYXRpb25TZWFyY2hBbGxvd2VkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlYXJjaFR5cGVBbGxvd2VkKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2l0ZW0gcG9wdWxhdGlvbiBzdGF0aXN0aWNzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1XaXRoU3RhdHN0aWNzO1xyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICAgICBpdGVtV2l0aFN0YXRzdGljcyA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfU0VBUkNIX1JPTEUpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2lzUG9wdWxhdGlvblBlcmNlbnRhZ2VIaWdoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGlmIHBvcHVsYXRpb24gcGVyY2VudGFnZSBpcyBoaWdoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtV2l0aFN0YXRzdGljcy5wb3B1bGF0aW9uU3RhdGlzdGljcy5jb3VudCA9IDE4O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZUhpZ2goaXRlbVdpdGhTdGF0c3RpY3MpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBwb3B1bGF0aW9uIHBlcmNlbnRhZ2UgaXMgbm90IGhpZ2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIC8vIGN1dG9mZiBmb3IgSGlnaCBpcyA4MCBwZXJjZW50LCB0ZXN0IDc1XHJcbiAgICAgICAgICAgICAgICBpdGVtV2l0aFN0YXRzdGljcy5wb3B1bGF0aW9uU3RhdGlzdGljcy5jb3VudCA9IDE1O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZUhpZ2goaXRlbVdpdGhTdGF0c3RpY3MpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc1BvcHVsYXRpb25QZXJjZW50YWdlTWVkaXVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGlmIHBvcHVsYXRpb24gcGVyY2VudGFnZSBpcyBtZWRpdW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1XaXRoU3RhdHN0aWNzLnBvcHVsYXRpb25TdGF0aXN0aWNzLmNvdW50ID0gMTA7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1BvcHVsYXRpb25QZXJjZW50YWdlTWVkaXVtKGl0ZW1XaXRoU3RhdHN0aWNzKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCAoJ3JldHVybnMgZmFsc2UgaWYgcG9wdWxhdGlvbiBwZXJjZW50YWdlIGlzIHRvbyBoaWdoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjdXRvZmYgZm9yIE1lZGl1bSBpcyA3OSBwZXJjZW50LCB0ZXN0IDgwXHJcbiAgICAgICAgICAgICAgICBpdGVtV2l0aFN0YXRzdGljcy5wb3B1bGF0aW9uU3RhdGlzdGljcy5jb3VudCA9IDE2O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZU1lZGl1bShpdGVtV2l0aFN0YXRzdGljcykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBwb3B1bGF0aW9uIHBlcmNlbnRhZ2UgaXMgdG9vIGxvdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3V0b2ZmIGZvciBNZWRpdW0gaXMgMzAgcGVyY2VudCwgdGVzdCAyNVxyXG4gICAgICAgICAgICAgICAgaXRlbVdpdGhTdGF0c3RpY3MucG9wdWxhdGlvblN0YXRpc3RpY3MuY291bnQgPSA1O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZU1lZGl1bShpdGVtV2l0aFN0YXRzdGljcykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2lzUG9wdWxhdGlvblBlcmNlbnRhZ2VMb3cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgcG9wdWxhdGlvbiBwZXJjZW50YWdlIGlzIGxvdycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVdpdGhTdGF0c3RpY3MucG9wdWxhdGlvblN0YXRpc3RpY3MuY291bnQgPSA1O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZUxvdyhpdGVtV2l0aFN0YXRzdGljcykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIHBvcHVsYXRpb24gcGVyY2VudGFnZSBpcyB0b28gaGlnaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3V0b2ZmIGZvciBMb3cgaXMgMjkgcGVyY2VudCwgdGVzdCAzMFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpdGhTdGF0c3RpY3MucG9wdWxhdGlvblN0YXRpc3RpY3MuY291bnQgPSA2O1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNQb3B1bGF0aW9uUGVyY2VudGFnZUxvdyhpdGVtV2l0aFN0YXRzdGljcykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3Nob3dNYXRjaGVkUG9wdWxhdGlvbkRpYWxvZygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBubyBpdGVtIGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwuc2hvd01hdGNoZWRQb3B1bGF0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIGEgbW9kYWwgZGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNob3dNYXRjaGVkUG9wdWxhdGlvbkRpYWxvZyhpdGVtKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
