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
             * Tests for the AccessRequestIdentitiesCtrl.
             */
            describe('AccessRequestIdentitiesCtrl', function () {

                var $rootScope, $controller, testService, stateParams, AccessRequest, accessRequestDataService, accessRequestIdentityService, PageState, ctrl, identity1, identity2, identity3, miniIdentity, accessRequestFilterService, deferred, timeout, checkRemovedAccessResolve, spModal, resolveModal, accessRequestTestData;

                // Load the test module to get the testService.
                beforeEach(module(testModule));

                // Let the tests know we'll use the access request module.
                beforeEach(module(accessRequestModule, function ($provide) {
                    /* Inject some test functions into configService */
                    $provide.decorator('configService', function ($delegate, testService, SP_CONFIG_SERVICE) {
                        var originalGetConfigValueFn = $delegate.getConfigValue;

                        $delegate.getConfigValue = function (key) {
                            /* Fake max requestable identities down to a managable number */
                            if (key === SP_CONFIG_SERVICE.ACCESS_REQUEST_MAX_IDENTITY_SELECT) {
                                return 2;
                            }
                            /* Mock out the runInitialLoad value */
                            if (key === SP_CONFIG_SERVICE.DISABLE_INITIAL_ACCESS_REQUEST_GRID_LOAD) {
                                return false;
                            }
                            return originalGetConfigValueFn.call(this, key);
                        };

                        $delegate.getColumnConfigEntries = testService.createPromiseSpy(false, {
                            status: 200,
                            data: { 'uiRequestAccessIdentityCard': {} }
                        }, {});

                        $delegate.getIdentityDetailsConfig = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {}
                        }, {});

                        return $delegate;
                    });
                }));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams : 14 */
                beforeEach(inject(function (_AccessRequest_, _accessRequestDataService_, _accessRequestIdentityService_, Identity, _PageState_, _testService_, _$controller_, _$rootScope_, _accessRequestFilterService_, $q, configService, $timeout, $stateParams, _accessRequestTestData_) {

                    // Save the services.
                    AccessRequest = _AccessRequest_;
                    accessRequestDataService = _accessRequestDataService_;
                    accessRequestIdentityService = _accessRequestIdentityService_;
                    $controller = _$controller_;
                    testService = _testService_;
                    PageState = _PageState_;
                    $rootScope = _$rootScope_;
                    accessRequestFilterService = _accessRequestFilterService_;
                    timeout = $timeout;
                    accessRequestTestData = _accessRequestTestData_;
                    deferred = $q.defer();
                    spyOn(accessRequestFilterService, 'getIdentityFilters').and.returnValue(deferred.promise);
                    spyOn(_accessRequestDataService_, 'getQuickLinkName').and.returnValue('Request Access');

                    stateParams = $stateParams;

                    // Create an identity to test with.
                    identity1 = new Identity(accessRequestTestData.IDENTITY1);
                    identity2 = new Identity(accessRequestTestData.IDENTITY2);
                    identity3 = new Identity(accessRequestTestData.IDENTITY3);
                    miniIdentity = new Identity({ 'id': '2c908cae486a4ba601486a4d9ba90423', 'name': 'vpodesta' });

                    // Mock out the identity service to return a single identity.
                    accessRequestIdentityService.getIdentities = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: 1,
                            objects: [identity1]
                        }
                    }, {});

                    // Mock out the getAllIdentities call
                    accessRequestIdentityService.getAllIdentities = testService.createPromiseSpy(false, {
                        status: 200,
                        data: {
                            count: 1,
                            objects: [miniIdentity]
                        }
                    }, {});

                    // Create the controller to test with.
                    ctrl = $controller('AccessRequestIdentitiesCtrl', {
                        accessRequestIdentityService: accessRequestIdentityService,
                        configService: configService,
                        accessRequestDataService: accessRequestDataService
                    });

                    spyOn(ctrl, 'showHasRemovedAccessDialog').and.callFake(function () {
                        return checkRemovedAccessResolve ? $q.when() : $q.reject();
                    });
                    checkRemovedAccessResolve = true;

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                }));

                it('fetches identities when loaded', function () {
                    // The start and limit are hard-coded.
                    expect(accessRequestIdentityService.getIdentities).toHaveBeenCalledWith(undefined, {}, 0, 12, 'Request Access');
                    expect(accessRequestIdentityService.getAllIdentities).toHaveBeenCalledWith(undefined, {}, 'Request Access');
                });

                it('adds identities when selected', function () {
                    spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.returnValue(true);
                    ctrl.selectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.getAccessRequest().addIdentity).toHaveBeenCalledWith(identity1);
                });

                it('removes identities when deselected', function () {
                    spyOn(accessRequestDataService.getAccessRequest(), 'removeIdentity').and.returnValue(true);
                    ctrl.deselectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.getAccessRequest().removeIdentity).toHaveBeenCalledWith(identity1);
                });

                it('resets manage access paging when selecting or deselecting', function () {
                    spyOn(accessRequestDataService, 'resetManageAccessPaging').and.callThrough();
                    spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.returnValue({
                        failed: false
                    });
                    spyOn(accessRequestDataService.getAccessRequest(), 'removeIdentity').and.returnValue({
                        failed: false
                    });
                    ctrl.selectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.resetManageAccessPaging).toHaveBeenCalled();
                    ctrl.deselectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.resetManageAccessPaging.calls.count()).toBe(2);
                });

                it('does not reset manage access paging if nothing is selected or deselected', function () {
                    spyOn(accessRequestDataService, 'resetManageAccessPaging');
                    spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.returnValue({
                        failed: true,
                        errors: [AccessRequest.ERRORS.HAS_REMOVED_ACCESS]
                    });
                    spyOn(accessRequestDataService.getAccessRequest(), 'removeIdentity').and.returnValue({
                        failed: true,
                        errors: [AccessRequest.ERRORS.HAS_REMOVED_ACCESS]
                    });
                    checkRemovedAccessResolve = false;
                    ctrl.selectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.resetManageAccessPaging).not.toHaveBeenCalled();
                    ctrl.deselectIdentity(identity1);
                    $rootScope.$apply();
                    expect(accessRequestDataService.resetManageAccessPaging).not.toHaveBeenCalled();
                });

                var testIdentitySelection = function (isSelected) {
                    var selected;
                    spyOn(accessRequestDataService.getAccessRequest(), 'hasIdentity').and.returnValue(isSelected);
                    selected = ctrl.isIdentitySelected(identity1);
                    expect(accessRequestDataService.getAccessRequest().hasIdentity).toHaveBeenCalledWith(identity1);
                    expect(selected).toEqual(isSelected);
                };

                it('says that an identity is selected if added', function () {
                    testIdentitySelection(true);
                });

                it('says that an identity is not selected if not added', function () {
                    testIdentitySelection(false);
                });

                it('returns the selected identities', function () {
                    var identities;
                    spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities').and.returnValue([identity1]);
                    identities = ctrl.getSelectedIdentities();
                    expect(accessRequestDataService.getAccessRequest().getIdentities).toHaveBeenCalled();
                    expect(identities.length).toEqual(1);
                    expect(identities[0]).toEqual(identity1);
                });

                describe('isIdentityDisabled()', function () {
                    it('returns false if bulk identity requests are allowed', function () {
                        // Add an identity so that this would otherwise return true if bulk were disabled.
                        ctrl.selectIdentity(identity1);
                        expect(ctrl.isIdentityDisabled(identity2)).toEqual(false);
                    });

                    describe('when bulk request is disabled', function () {
                        beforeEach(function () {
                            accessRequestDataService.setAllowBulkRequest(false);
                        });

                        it('returns false if no identity is selected', function () {
                            expect(ctrl.isIdentityDisabled(identity1)).toEqual(false);
                        });

                        it('returns false if the same identity is selected', function () {
                            ctrl.selectIdentity(identity1);
                            expect(ctrl.isIdentityDisabled(identity1)).toEqual(false);
                        });

                        it('returns true if a different identity is selected', function () {
                            ctrl.selectIdentity(identity1);
                            expect(ctrl.isIdentityDisabled(identity2)).toEqual(true);
                        });
                    });
                });

                describe('allow bulk identity requests', function () {
                    it('is true if configuration not present', function () {
                        expect(ctrl.allowBulkIdentityRequest()).toEqual(true);
                    });

                    it('returns the configured value', function () {
                        accessRequestDataService.setAllowBulkRequest(false);
                        expect(ctrl.allowBulkIdentityRequest()).toEqual(false);
                    });
                });

                describe('unsupported identity operation errors', function () {
                    var failedResponse = {
                        failed: true,
                        errors: ['unsupportedError']
                    };

                    function setupSpy(functionToSpyOn) {
                        spyOn(accessRequestDataService.getAccessRequest(), functionToSpyOn).and.returnValue(failedResponse);
                    }

                    it('should throw if adding identity fails with unsupported error', function () {
                        setupSpy('addIdentity');
                        expect(function () {
                            ctrl.selectIdentity(identity1);
                        }).toThrow();
                    });

                    it('should throw if removing identity fails with unsupported error', function () {
                        setupSpy('removeIdentity');
                        expect(function () {
                            ctrl.deselectIdentity(identity1);
                        }).toThrow();
                    });

                    it('should throw if toggling all identities fails with unsupported error', function () {
                        setupSpy('addIdentities');
                        expect(function () {
                            ctrl.toggleSelectAllIdentities();
                        }).toThrow();
                    });
                });

                /**
                 * Set the allIdentities and count in the controller to the given list.
                 */
                function setupAllIdentities(identities) {
                    ctrl.allIdentities = identities;
                    ctrl.allIdentitiesCount = identities.length;
                }

                /**
                 * Test to make sure state params work
                 */
                describe('stateParams.selectedView should enable the selected view', function () {

                    // setup stateParams.selectedView to be true
                    beforeEach(inject(function ($stateParams) {
                        $stateParams.selectedView = true;
                    }));

                    // set it back
                    afterEach(inject(function ($stateParams) {
                        $stateParams.selectedView = false;
                    }));

                    it('should call fetchSelectedIdentities when stateParams selectedView is enabled', function () {
                        spyOn(ctrl, 'fetchSelectedIdentities').and.callFake(angular.noop);
                        spyOn(ctrl, 'doSearch').and.callThrough();

                        ctrl.initialize();
                        $rootScope.$apply();

                        expect(ctrl.fetchSelectedIdentities).toHaveBeenCalled();
                        expect(ctrl.doSearch).not.toHaveBeenCalled();

                        expect(ctrl.selectedDisplayed).toBeTruthy();
                    });
                });

                describe('show too much selected dialog', function () {
                    var spModal;

                    // Setup the dependencies.
                    beforeEach(inject(function (_spModal_, _$q_, _AccessRequest_) {
                        spModal = _spModal_;
                        setupModalMock(_spModal_, _$q_);
                    }));

                    it('does not prompt when max identities not reached', function () {
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(spModal.open).not.toHaveBeenCalled();

                        ctrl.selectIdentity(identity2);
                        $rootScope.$apply();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });

                    it('does prompt when max identities reached', function () {
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        ctrl.selectIdentity(identity2);
                        $rootScope.$apply();
                        ctrl.selectIdentity(identity3);
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('does not prompt when select all not too much happens', function () {
                        setupAllIdentities([identity1, identity2]);
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });

                    it('does prompt when select all too much identities happens', function () {
                        setupAllIdentities([identity1, identity2, identity3]);
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should prompt when current selected items and search result count exceed max allowable', function () {
                        spyOn(accessRequestDataService.accessRequest, 'getIdentities').and.returnValue([{}]);
                        spyOn(ctrl.getPageState().pagingData, 'getTotal').and.returnValue(2);
                        setupAllIdentities([identity1, identity2]);
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                /**
                 * Test to see if modal opens with IdentityDetailDialogCtrl
                 */
                describe('show identity detail dialog', function () {
                    var Identity, spModal;

                    beforeEach(inject(function (_Identity_, _spModal_) {
                        Identity = _Identity_;
                        spModal = _spModal_;
                        spyOn(spModal, 'open');
                    }));

                    /**
                     * Make sure that an identity is required.
                     */
                    it('explodes if no identity is specified', function () {
                        expect(function () {
                            ctrl.getIdentityDetails(null);
                        }).toThrow();
                    });

                    /**
                     * Make sure showIdentityDetails() method opens the modal with the correct IdentityDetailDialogController
                     */
                    it('opens the modal', function () {
                        var identity = new Identity(accessRequestTestData.IDENTITY1);
                        ctrl.showIdentityDetails(identity);

                        $rootScope.$apply();

                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].controller).toEqual('IdentityDetailDialogCtrl as dialogCtrl');
                    });
                });

                describe('identity selection', function () {

                    beforeEach(inject(function () {
                        setupAllIdentities([identity1]);

                        accessRequestIdentityService.getSelectedIdentities = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 1,
                                objects: [identity1]
                            }
                        }, {});
                    }));

                    it('throws if bulk identity requests are not enabled', function () {
                        accessRequestDataService.setAllowBulkRequest(false);
                        expect(function () {
                            ctrl.toggleSelectAllIdentities();
                        }).toThrow();
                    });

                    it('sets all selected/unselected when toggle is clicked', function () {
                        expect(ctrl.allSelected).toBeFalsy();

                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeTruthy();

                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeFalsy();
                    });

                    it('deselect unselects all', function () {
                        expect(ctrl.allSelected).toBeFalsy();

                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeTruthy();

                        ctrl.deselectIdentity(identity1);
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeFalsy();
                    });

                    it('select selects all', function () {
                        expect(ctrl.allSelected).toBeFalsy();

                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeTruthy();
                    });

                    it('resets manage access paging when selecting or deselecting all', function () {
                        spyOn(accessRequestDataService, 'resetManageAccessPaging').and.callThrough();
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(accessRequestDataService.resetManageAccessPaging).toHaveBeenCalled();
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(accessRequestDataService.resetManageAccessPaging).toHaveBeenCalled();
                    });

                    it('select with multiple identities sets select all correctly', function () {
                        setupAllIdentities([identity1, identity2]);
                        expect(ctrl.allSelected).toBeFalsy();

                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeFalsy();

                        ctrl.selectIdentity(identity2);
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeTruthy();

                        ctrl.deselectIdentity(identity2);
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeFalsy();
                    });

                    it('unselects all when searching returns more than the selected users', function () {
                        // Start showing 1 of 2 identities - this is the default setup.
                        expect(ctrl.items.length).toEqual(1);
                        expect(ctrl.allIdentities.length).toEqual(1);
                        expect(ctrl.allSelected).toBeFalsy();

                        // Select all and verify that allSelected is true.
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toBeTruthy();

                        // Search again returning 2 of 2 identities - identity2 shouldn't
                        // be selected after this.
                        accessRequestIdentityService.getAllIdentities = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 2,
                                objects: [identity1, identity2]
                            }
                        }, {});
                        accessRequestIdentityService.getIdentities = testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 2,
                                objects: [identity1, identity2]
                            }
                        }, {});
                        ctrl.search();
                        timeout.flush();
                        $rootScope.$apply();

                        // Verify that allSelected is false.
                        expect(ctrl.allSelected).toBeFalsy();
                    });

                    it('toggle show selected toggles selectedDisplayed flag', function () {
                        expect(ctrl.selectedDisplayed).toBeFalsy();

                        ctrl.toggleShowSelected();
                        expect(ctrl.selectedDisplayed).toBeTruthy();

                        ctrl.toggleShowSelected();
                        expect(ctrl.selectedDisplayed).toBeFalsy();
                    });

                    it('fetch items calls fetchSelectedIdentities when in selected view', function () {
                        expect(ctrl.selectedDisplayed).toBeFalsy();

                        // select some identities
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();

                        // toggle show selected to show selected
                        ctrl.toggleShowSelected();
                        expect(ctrl.selectedDisplayed).toBeTruthy();

                        spyOn(ctrl, 'fetchSelectedIdentities');
                        ctrl.fetchItems();

                        expect(ctrl.fetchSelectedIdentities).toHaveBeenCalled();
                    });

                    it('backupIdentities should be set when in selected view', function () {
                        // select some identities
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();

                        ctrl.toggleShowSelected();
                        expect(ctrl.selectedDisplayed).toBeTruthy();

                        expect(ctrl.backupSelectedIdentities.length).toEqual(1);
                        ctrl.toggleShowSelected();
                        ctrl.selectIdentity(identity2);
                        $rootScope.$apply();
                        ctrl.toggleShowSelected();
                        expect(ctrl.backupSelectedIdentities.length).toEqual(2);
                    });

                    it('toggleSelectAll should call addIdentities/removeAllIdentities when in selected view', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'addIdentities').and.callThrough();
                        spyOn(accessRequestDataService.getAccessRequest(), 'removeAllIdentities').and.callThrough();

                        // select some identities
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();

                        ctrl.toggleShowSelected();
                        expect(ctrl.selectedDisplayed).toBeTruthy();
                        expect(ctrl.allSelected).toBeTruthy();
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().removeAllIdentities).toHaveBeenCalled();
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().addIdentities).toHaveBeenCalled();
                        expect(ctrl.allSelected).toBeTruthy();
                    });
                });

                /**
                 * Setup the spModal mock to either resolve or reject.
                 *
                 * @param {boolean} resolve  True if the modal should resolve, false to reject.
                 */
                function setupModal(resolve) {
                    resolveModal = resolve;
                }

                /**
                 * Setup calls to spModal.open() to mock the response.
                 */
                function setupModalMock(_spModal_, $q) {
                    spModal = _spModal_;
                    spyOn(spModal, 'open').and.callFake(function () {
                        var deferred = $q.defer();

                        if (resolveModal) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }

                        return {
                            result: deferred.promise
                        };
                    });
                }

                describe('prevent adding identities if role is in cart', function () {
                    var roleRequestedItem, entitlementRequestedItem;

                    beforeEach(inject(function (_spModal_, $q, AccessRequestItem, RequestedAccessItem) {
                        var role = new AccessRequestItem(accessRequestTestData.ROLE),
                            entitlement = new AccessRequestItem(accessRequestTestData.ENTITLEMENT);

                        setupModalMock(_spModal_, $q);

                        roleRequestedItem = new RequestedAccessItem(role);
                        entitlementRequestedItem = new RequestedAccessItem(entitlement);

                        spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.callThrough();
                        spyOn(accessRequestDataService.getAccessRequest(), 'addIdentities').and.callThrough();
                    }));

                    describe('selectIdentity()', function () {
                        it('adds identity if cart has no items', function () {
                            ctrl.selectIdentity(identity1);
                            $rootScope.$apply();
                            expect(accessRequestDataService.getAccessRequest().addIdentity).toHaveBeenCalledWith(identity1);
                        });

                        it('adds identity if cart has no roles', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([entitlementRequestedItem]);
                            ctrl.selectIdentity(identity1);
                            $rootScope.$apply();
                            expect(accessRequestDataService.getAccessRequest().addIdentity).toHaveBeenCalledWith(identity1);
                        });

                        it('shows modal if cart has role', function () {
                            var args;
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);
                            ctrl.selectIdentity(identity1);
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            args = spModal.open.calls.mostRecent().args;
                            expect(args[0].content).toEqual('ui_access_request_lose_requested_roles_warning');
                        });

                        it('does not add identity if "no" is selected in dialog', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);

                            setupModal(false);
                            ctrl.selectIdentity(identity1);
                            expect(accessRequestDataService.getAccessRequest().addIdentity.calls.count()).toBe(1);
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            $rootScope.$apply();
                            expect(accessRequestDataService.getAccessRequest().addIdentity.calls.count()).toBe(1);
                        });

                        it('adds identity if "yes" is selected in dialog', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);
                            setupModal(true);
                            ctrl.selectIdentity(identity1);
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            $rootScope.$apply();
                            expect(accessRequestDataService.getAccessRequest().addIdentity).toHaveBeenCalledWith(identity1);
                        });
                    });

                    describe('toggleSelectAllIdentities()', function () {
                        function checkAllIdentitiesAdded() {
                            expect(accessRequestDataService.getAccessRequest().addIdentities).toHaveBeenCalledWith(ctrl.allIdentities);
                        }

                        it('adds all identities if cart has no items', function () {
                            ctrl.toggleSelectAllIdentities();
                            $rootScope.$apply();
                            checkAllIdentitiesAdded();
                        });

                        it('adds all identities if cart has no roles', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([entitlementRequestedItem]);
                            ctrl.toggleSelectAllIdentities();
                            $rootScope.$apply();
                            checkAllIdentitiesAdded();
                        });

                        it('shows modal if cart has role', function () {
                            var args;
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);
                            ctrl.toggleSelectAllIdentities();
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            args = spModal.open.calls.mostRecent().args;
                            expect(args[0].content).toEqual('ui_access_request_lose_requested_roles_warning');
                        });

                        it('does not add identities if "no" is selected in dialog', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);
                            setupModal(false);
                            ctrl.toggleSelectAllIdentities();
                            expect(accessRequestDataService.getAccessRequest().addIdentities.calls.count()).toBe(1);
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            $rootScope.$apply();
                            expect(accessRequestDataService.getAccessRequest().addIdentities.calls.count()).toBe(1);
                        });

                        it('adds identities if "yes" is selected in dialog', function () {
                            spyOn(accessRequestDataService.getAccessRequest(), 'getRequestedItems').and.returnValue([roleRequestedItem]);
                            setupModal(true);
                            ctrl.toggleSelectAllIdentities();
                            $rootScope.$apply();
                            expect(spModal.open).toHaveBeenCalled();
                            $rootScope.$apply();
                            checkAllIdentitiesAdded();
                        });
                    });
                });

                describe('check removed access', function () {
                    // Setup the dependencies.
                    beforeEach(inject(function (_spModal_, $q) {
                        setupModalMock(_spModal_, $q);
                        ctrl.showHasRemovedAccessDialog.and.callThrough();
                        spyOn(accessRequestDataService.getAccessRequest(), 'getRemovedCurrentAccessItems').and.returnValue([{ id: 'whatever' }]);
                    }));

                    it('should call showHasRemovedAccessDialog when selecting identity', function () {
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(ctrl.showHasRemovedAccessDialog).toHaveBeenCalled();
                    });

                    it('should not select identity if showHasRemovedAccessDialog resolves to false', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'addIdentity').and.returnValue(true);
                        setupModal(false);
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().addIdentity.calls.count()).toBe(1);
                        setupModal(true);
                        ctrl.selectIdentity(identity1);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().addIdentity.calls.count()).toBe(2);
                    });

                    it('should call showHasRemovedAccessDialog when deselecting identity', function () {
                        ctrl.deselectIdentity(identity1);
                        $rootScope.$apply();
                        expect(ctrl.showHasRemovedAccessDialog).toHaveBeenCalled();
                    });

                    it('should not deselect identity if showHasRemovedAccessDialog resolves to false', function () {
                        spyOn(accessRequestDataService.getAccessRequest(), 'removeIdentity').and.returnValue(true);
                        setupModal(false);
                        ctrl.deselectIdentity(identity1);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().removeIdentity.calls.count()).toBe(1);
                        setupModal(true);
                        ctrl.deselectIdentity(identity1);
                        $rootScope.$apply();
                        expect(accessRequestDataService.getAccessRequest().removeIdentity.calls.count()).toBe(2);
                    });

                    it('should call showHasRemovedAccessDialog when toggling select all', function () {
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.showHasRemovedAccessDialog).toHaveBeenCalled();
                    });

                    it('should not toggle select all if showHasRemovedAccessDialog resolves to false', function () {
                        setupModal(false);
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toEqual(false);
                        setupModal(true);
                        ctrl.toggleSelectAllIdentities();
                        $rootScope.$apply();
                        expect(ctrl.allSelected).toEqual(true);
                    });

                    it('should show warning dialog if any removed access items are selected', function () {
                        var args;
                        setupModal(true);
                        ctrl.showHasRemovedAccessDialog();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        args = spModal.open.calls.mostRecent().args;
                        expect(args[0].content).toEqual('ui_access_request_lose_removed_access_items_warning');
                    });

                    it('should not show modal if no removed access items are selected', function () {
                        accessRequestDataService.getAccessRequest().getRemovedCurrentAccessItems.and.returnValue([]);
                        spyOn(accessRequestDataService.getAccessRequest(), 'removeIdentity').and.returnValue({ failed: false });
                        ctrl.deselectIdentity(identity1);
                        $rootScope.$apply();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });
                });

                describe('page state', function () {

                    beforeEach(inject(function () {
                        ctrl.selectedPageState = new PageState();
                        ctrl.pageState = new PageState();

                        /* Create different attributes on each so we can compare */
                        ctrl.selectedPageState.pagingData.itemsPerPage = 100;
                        ctrl.pageState.pagingData.itemsPerPage = 1;
                    }));

                    it('getPageState() returns default pageState', function () {
                        var pageState = ctrl.getPageState();
                        expect(pageState.pagingData.itemsPerPage).toEqual(1);
                    });

                    it('getPageState() returns selected pageState when in selected view', function () {
                        ctrl.toggleShowSelected();
                        var pageState = ctrl.getPageState();
                        expect(pageState.pagingData.itemsPerPage).toEqual(100);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdElkZW50aXRpZXNDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHNCQUFzQiw0QkFBNEIsVUFBVSxTQUFTO0lBQXRKOztJQUdJLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCO1dBQ2hDLFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7Ozs7WUFBN0IsU0FBUywrQkFBK0IsWUFBVzs7Z0JBRS9DLElBQUksWUFBWSxhQUFhLGFBQWEsYUFDdEMsZUFBZSwwQkFBMEIsOEJBQThCLFdBQ3ZFLE1BQU0sV0FBVyxXQUFXLFdBQVcsY0FBYyw0QkFBNEIsVUFDakYsU0FBUywyQkFBMkIsU0FBUyxjQUM3Qzs7O2dCQUlKLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8scUJBQXFCLFVBQVMsVUFBVTs7b0JBRXRELFNBQVMsVUFBVSxpQkFBaUIsVUFBUyxXQUFXLGFBQWEsbUJBQW1CO3dCQUNwRixJQUFJLDJCQUEyQixVQUFVOzt3QkFFekMsVUFBVSxpQkFBaUIsVUFBUyxLQUFLOzs0QkFFckMsSUFBRyxRQUFRLGtCQUFrQixvQ0FBb0M7Z0NBQzdELE9BQU87Ozs0QkFHWCxJQUFJLFFBQVEsa0JBQWtCLDBDQUEwQztnQ0FDcEUsT0FBTzs7NEJBRVgsT0FBTyx5QkFBeUIsS0FBSyxNQUFNOzs7d0JBRy9DLFVBQVUseUJBQXlCLFlBQVksaUJBQWlCLE9BQU87NEJBQ25FLFFBQVE7NEJBQ1IsTUFBTSxFQUFDLCtCQUErQjsyQkFDdkM7O3dCQUVILFVBQVUsMkJBQTJCLFlBQVksaUJBQWlCLE9BQU87NEJBQ3JFLFFBQVE7NEJBQ1IsTUFBTTsyQkFDUDs7d0JBRUgsT0FB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WUFBWSxLQUFLO3dCQUNyQixPQUFPLFVBQVUsV0FBVyxjQUFjLFFBQVE7Ozs7OztHQWQzRCIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RJZGVudGl0aWVzQ3RybFRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBY2Nlc3NSZXF1ZXN0SWRlbnRpdGllc0N0cmwuXHJcbiAqL1xyXG5kZXNjcmliZSgnQWNjZXNzUmVxdWVzdElkZW50aXRpZXNDdHJsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyICRyb290U2NvcGUsICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgc3RhdGVQYXJhbXMsXHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdCwgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLCBQYWdlU3RhdGUsXHJcbiAgICAgICAgY3RybCwgaWRlbnRpdHkxLCBpZGVudGl0eTIsIGlkZW50aXR5MywgbWluaUlkZW50aXR5LCBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgZGVmZXJyZWQsXHJcbiAgICAgICAgdGltZW91dCwgY2hlY2tSZW1vdmVkQWNjZXNzUmVzb2x2ZSwgc3BNb2RhbCwgcmVzb2x2ZU1vZGFsLFxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YTtcclxuXHJcblxyXG4gICAgLy8gTG9hZCB0aGUgdGVzdCBtb2R1bGUgdG8gZ2V0IHRoZSB0ZXN0U2VydmljZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICAvLyBMZXQgdGhlIHRlc3RzIGtub3cgd2UnbGwgdXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2Nlc3NSZXF1ZXN0TW9kdWxlLCBmdW5jdGlvbigkcHJvdmlkZSkge1xyXG4gICAgICAgIC8qIEluamVjdCBzb21lIHRlc3QgZnVuY3Rpb25zIGludG8gY29uZmlnU2VydmljZSAqL1xyXG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcignY29uZmlnU2VydmljZScsIGZ1bmN0aW9uKCRkZWxlZ2F0ZSwgdGVzdFNlcnZpY2UsIFNQX0NPTkZJR19TRVJWSUNFKSB7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEdldENvbmZpZ1ZhbHVlRm4gPSAkZGVsZWdhdGUuZ2V0Q29uZmlnVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAkZGVsZWdhdGUuZ2V0Q29uZmlnVmFsdWUgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICAgIC8qIEZha2UgbWF4IHJlcXVlc3RhYmxlIGlkZW50aXRpZXMgZG93biB0byBhIG1hbmFnYWJsZSBudW1iZXIgKi9cclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gU1BfQ09ORklHX1NFUlZJQ0UuQUNDRVNTX1JFUVVFU1RfTUFYX0lERU5USVRZX1NFTEVDVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLyogTW9jayBvdXQgdGhlIHJ1bkluaXRpYWxMb2FkIHZhbHVlICovXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBTUF9DT05GSUdfU0VSVklDRS5ESVNBQkxFX0lOSVRJQUxfQUNDRVNTX1JFUVVFU1RfR1JJRF9MT0FEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0Q29uZmlnVmFsdWVGbi5jYWxsKHRoaXMsIGtleSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAkZGVsZWdhdGUuZ2V0Q29sdW1uQ29uZmlnRW50cmllcyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyd1aVJlcXVlc3RBY2Nlc3NJZGVudGl0eUNhcmQnOiB7fX1cclxuICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgJGRlbGVnYXRlLmdldElkZW50aXR5RGV0YWlsc0NvbmZpZyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge31cclxuICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cclxuICAgICAqL1xyXG4gICAgLyoganNoaW50IG1heHBhcmFtcyA6IDE0ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQWNjZXNzUmVxdWVzdF8sIF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfLCBfYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZGVudGl0eSwgX1BhZ2VTdGF0ZV8sIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8sIF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV8sICRxLCBjb25maWdTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQsICRzdGF0ZVBhcmFtcywgX2FjY2Vzc1JlcXVlc3RUZXN0RGF0YV8pIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdCA9IF9BY2Nlc3NSZXF1ZXN0XztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgUGFnZVN0YXRlID0gX1BhZ2VTdGF0ZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV87XHJcbiAgICAgICAgdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSA9IF9hY2Nlc3NSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgJ2dldElkZW50aXR5RmlsdGVycycpLmFuZC5yZXR1cm5WYWx1ZShkZWZlcnJlZC5wcm9taXNlKTtcclxuICAgICAgICBzcHlPbihfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXywgJ2dldFF1aWNrTGlua05hbWUnKS5hbmQucmV0dXJuVmFsdWUoJ1JlcXVlc3QgQWNjZXNzJyk7XHJcblxyXG4gICAgICAgIHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW4gaWRlbnRpdHkgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgIGlkZW50aXR5MSA9IG5ldyBJZGVudGl0eShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxKTtcclxuICAgICAgICBpZGVudGl0eTIgPSBuZXcgSWRlbnRpdHkoYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMik7XHJcbiAgICAgICAgaWRlbnRpdHkzID0gbmV3IElkZW50aXR5KGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTMpO1xyXG4gICAgICAgIG1pbmlJZGVudGl0eSA9IG5ldyBJZGVudGl0eSh7J2lkJzogJzJjOTA4Y2FlNDg2YTRiYTYwMTQ4NmE0ZDliYTkwNDIzJywnbmFtZSc6ICd2cG9kZXN0YSd9KTtcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIGlkZW50aXR5IHNlcnZpY2UgdG8gcmV0dXJuIGEgc2luZ2xlIGlkZW50aXR5LlxyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdGllcyA9XHJcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaWRlbnRpdHkxIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgZ2V0QWxsSWRlbnRpdGllcyBjYWxsXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzID1cclxuICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW21pbmlJZGVudGl0eV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwge30pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdElkZW50aXRpZXNDdHJsJywge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlOiBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLFxyXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBjb25maWdTZXJ2aWNlLFxyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzcHlPbihjdHJsLCAnc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoY2hlY2tSZW1vdmVkQWNjZXNzUmVzb2x2ZSkgPyAkcS53aGVuKCkgOiAkcS5yZWplY3QoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjaGVja1JlbW92ZWRBY2Nlc3NSZXNvbHZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gUnVuIGEgZGlnZXN0IGN5Y2xlIHRvIHJlc29sdmUgdGhlIHByb21pc2UuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgaXQoJ2ZldGNoZXMgaWRlbnRpdGllcyB3aGVuIGxvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFRoZSBzdGFydCBhbmQgbGltaXQgYXJlIGhhcmQtY29kZWQuXHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdGllcykuXHJcbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwge30sIDAsIDEyLCAnUmVxdWVzdCBBY2Nlc3MnKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsIHt9LCAnUmVxdWVzdCBBY2Nlc3MnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdhZGRzIGlkZW50aXRpZXMgd2hlbiBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHkxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW1vdmVzIGlkZW50aXRpZXMgd2hlbiBkZXNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3JlbW92ZUlkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIGN0cmwuZGVzZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkucmVtb3ZlSWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5MSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVzZXRzIG1hbmFnZSBhY2Nlc3MgcGFnaW5nIHdoZW4gc2VsZWN0aW5nIG9yIGRlc2VsZWN0aW5nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCAncmVzZXRNYW5hZ2VBY2Nlc3NQYWdpbmcnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnYWRkSWRlbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICBmYWlsZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3JlbW92ZUlkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgZmFpbGVkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UucmVzZXRNYW5hZ2VBY2Nlc3NQYWdpbmcpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICBjdHJsLmRlc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UucmVzZXRNYW5hZ2VBY2Nlc3NQYWdpbmcuY2FsbHMuY291bnQoKSkudG9CZSgyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCByZXNldCBtYW5hZ2UgYWNjZXNzIHBhZ2luZyBpZiBub3RoaW5nIGlzIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UsICdyZXNldE1hbmFnZUFjY2Vzc1BhZ2luZycpO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgIGZhaWxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbQWNjZXNzUmVxdWVzdC5FUlJPUlMuSEFTX1JFTU9WRURfQUNDRVNTXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdyZW1vdmVJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgIGZhaWxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZXJyb3JzOiBbQWNjZXNzUmVxdWVzdC5FUlJPUlMuSEFTX1JFTU9WRURfQUNDRVNTXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNoZWNrUmVtb3ZlZEFjY2Vzc1Jlc29sdmUgPSBmYWxzZTtcclxuICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnJlc2V0TWFuYWdlQWNjZXNzUGFnaW5nKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGN0cmwuZGVzZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5yZXNldE1hbmFnZUFjY2Vzc1BhZ2luZykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0ZXN0SWRlbnRpdHlTZWxlY3Rpb24gPSBmdW5jdGlvbihpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xyXG4gICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdoYXNJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZShpc1NlbGVjdGVkKTtcclxuICAgICAgICBzZWxlY3RlZCA9IGN0cmwuaXNJZGVudGl0eVNlbGVjdGVkKGlkZW50aXR5MSk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuaGFzSWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5MSk7XHJcbiAgICAgICAgZXhwZWN0KHNlbGVjdGVkKS50b0VxdWFsKGlzU2VsZWN0ZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpdCgnc2F5cyB0aGF0IGFuIGlkZW50aXR5IGlzIHNlbGVjdGVkIGlmIGFkZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGVzdElkZW50aXR5U2VsZWN0aW9uKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3NheXMgdGhhdCBhbiBpZGVudGl0eSBpcyBub3Qgc2VsZWN0ZWQgaWYgbm90IGFkZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGVzdElkZW50aXR5U2VsZWN0aW9uKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBzZWxlY3RlZCBpZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGlkZW50aXRpZXM7XHJcbiAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldElkZW50aXRpZXMnKS5hbmQucmV0dXJuVmFsdWUoWyBpZGVudGl0eTEgXSk7XHJcbiAgICAgICAgaWRlbnRpdGllcyA9IGN0cmwuZ2V0U2VsZWN0ZWRJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuZ2V0SWRlbnRpdGllcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0aWVzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3QoaWRlbnRpdGllc1swXSkudG9FcXVhbChpZGVudGl0eTEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzSWRlbnRpdHlEaXNhYmxlZCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYnVsayBpZGVudGl0eSByZXF1ZXN0cyBhcmUgYWxsb3dlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBBZGQgYW4gaWRlbnRpdHkgc28gdGhhdCB0aGlzIHdvdWxkIG90aGVyd2lzZSByZXR1cm4gdHJ1ZSBpZiBidWxrIHdlcmUgZGlzYWJsZWQuXHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eURpc2FibGVkKGlkZW50aXR5MikpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2hlbiBidWxrIHJlcXVlc3QgaXMgZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5zZXRBbGxvd0J1bGtSZXF1ZXN0KGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBubyBpZGVudGl0eSBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eURpc2FibGVkKGlkZW50aXR5MSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBzYW1lIGlkZW50aXR5IGlzIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc0lkZW50aXR5RGlzYWJsZWQoaWRlbnRpdHkxKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhIGRpZmZlcmVudCBpZGVudGl0eSBpcyBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0eURpc2FibGVkKGlkZW50aXR5MikpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FsbG93IGJ1bGsgaWRlbnRpdHkgcmVxdWVzdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnaXMgdHJ1ZSBpZiBjb25maWd1cmF0aW9uIG5vdCBwcmVzZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbG93QnVsa0lkZW50aXR5UmVxdWVzdCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0aGUgY29uZmlndXJlZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0QWxsb3dCdWxrUmVxdWVzdChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbG93QnVsa0lkZW50aXR5UmVxdWVzdCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCd1bnN1cHBvcnRlZCBpZGVudGl0eSBvcGVyYXRpb24gZXJyb3JzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGZhaWxlZFJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBmYWlsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGVycm9yczogWyd1bnN1cHBvcnRlZEVycm9yJ11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXR1cFNweShmdW5jdGlvblRvU3B5T24pIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgZnVuY3Rpb25Ub1NweU9uKS5hbmQucmV0dXJuVmFsdWUoZmFpbGVkUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBhZGRpbmcgaWRlbnRpdHkgZmFpbHMgd2l0aCB1bnN1cHBvcnRlZCBlcnJvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cFNweSgnYWRkSWRlbnRpdHknKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgcmVtb3ZpbmcgaWRlbnRpdHkgZmFpbHMgd2l0aCB1bnN1cHBvcnRlZCBlcnJvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cFNweSgncmVtb3ZlSWRlbnRpdHknKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY3RybC5kZXNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiB0b2dnbGluZyBhbGwgaWRlbnRpdGllcyBmYWlscyB3aXRoIHVuc3VwcG9ydGVkIGVycm9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldHVwU3B5KCdhZGRJZGVudGl0aWVzJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYWxsSWRlbnRpdGllcyBhbmQgY291bnQgaW4gdGhlIGNvbnRyb2xsZXIgdG8gdGhlIGdpdmVuIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldHVwQWxsSWRlbnRpdGllcyhpZGVudGl0aWVzKSB7XHJcbiAgICAgICAgY3RybC5hbGxJZGVudGl0aWVzID0gaWRlbnRpdGllcztcclxuICAgICAgICBjdHJsLmFsbElkZW50aXRpZXNDb3VudCA9IGlkZW50aXRpZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCB0byBtYWtlIHN1cmUgc3RhdGUgcGFyYW1zIHdvcmtcclxuICAgICAqL1xyXG4gICAgZGVzY3JpYmUoJ3N0YXRlUGFyYW1zLnNlbGVjdGVkVmlldyBzaG91bGQgZW5hYmxlIHRoZSBzZWxlY3RlZCB2aWV3JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vIHNldHVwIHN0YXRlUGFyYW1zLnNlbGVjdGVkVmlldyB0byBiZSB0cnVlXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZVBhcmFtcy5zZWxlY3RlZFZpZXcgPSB0cnVlO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IGl0IGJhY2tcclxuICAgICAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICAkc3RhdGVQYXJhbXMuc2VsZWN0ZWRWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZmV0Y2hTZWxlY3RlZElkZW50aXRpZXMgd2hlbiBzdGF0ZVBhcmFtcyBzZWxlY3RlZFZpZXcgaXMgZW5hYmxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnZmV0Y2hTZWxlY3RlZElkZW50aXRpZXMnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2RvU2VhcmNoJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZldGNoU2VsZWN0ZWRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmRvU2VhcmNoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvdyB0b28gbXVjaCBzZWxlY3RlZCBkaWFsb2cnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3BNb2RhbDtcclxuXHJcbiAgICAgICAgLy8gU2V0dXAgdGhlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sIF8kcV8sIF9BY2Nlc3NSZXF1ZXN0Xykge1xyXG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG4gICAgICAgICAgICBzZXR1cE1vZGFsTW9jayhfc3BNb2RhbF8sIF8kcV8pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHByb21wdCB3aGVuIG1heCBpZGVudGl0aWVzIG5vdCByZWFjaGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkyKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgcHJvbXB0IHdoZW4gbWF4IGlkZW50aXRpZXMgcmVhY2hlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkyKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTMpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBwcm9tcHQgd2hlbiBzZWxlY3QgYWxsIG5vdCB0b28gbXVjaCBoYXBwZW5zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldHVwQWxsSWRlbnRpdGllcyhbaWRlbnRpdHkxLCBpZGVudGl0eTJdKTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIHByb21wdCB3aGVuIHNlbGVjdCBhbGwgdG9vIG11Y2ggaWRlbnRpdGllcyBoYXBwZW5zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldHVwQWxsSWRlbnRpdGllcyhbaWRlbnRpdHkxLCBpZGVudGl0eTIsIGlkZW50aXR5M10pO1xyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHByb21wdCB3aGVuIGN1cnJlbnQgc2VsZWN0ZWQgaXRlbXMgYW5kIHNlYXJjaCByZXN1bHQgY291bnQgZXhjZWVkIG1heCBhbGxvd2FibGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmFjY2Vzc1JlcXVlc3QsICdnZXRJZGVudGl0aWVzJykuYW5kLnJldHVyblZhbHVlKFt7fV0pO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldFBhZ2VTdGF0ZSgpLnBhZ2luZ0RhdGEsICdnZXRUb3RhbCcpLmFuZC5yZXR1cm5WYWx1ZSgyKTtcclxuICAgICAgICAgICAgc2V0dXBBbGxJZGVudGl0aWVzKFtpZGVudGl0eTEsIGlkZW50aXR5Ml0pO1xyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IHRvIHNlZSBpZiBtb2RhbCBvcGVucyB3aXRoIElkZW50aXR5RGV0YWlsRGlhbG9nQ3RybFxyXG4gICAgICovXHJcbiAgICBkZXNjcmliZSgnc2hvdyBpZGVudGl0eSBkZXRhaWwgZGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIElkZW50aXR5LCBzcE1vZGFsO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfSWRlbnRpdHlfLCBfc3BNb2RhbF8pIHtcclxuICAgICAgICAgICAgSWRlbnRpdHkgPSBfSWRlbnRpdHlfO1xyXG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWFrZSBzdXJlIHRoYXQgYW4gaWRlbnRpdHkgaXMgcmVxdWlyZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXQoJ2V4cGxvZGVzIGlmIG5vIGlkZW50aXR5IGlzIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGN0cmwuZ2V0SWRlbnRpdHlEZXRhaWxzKG51bGwpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ha2Ugc3VyZSBzaG93SWRlbnRpdHlEZXRhaWxzKCkgbWV0aG9kIG9wZW5zIHRoZSBtb2RhbCB3aXRoIHRoZSBjb3JyZWN0IElkZW50aXR5RGV0YWlsRGlhbG9nQ29udHJvbGxlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGl0KCdvcGVucyB0aGUgbW9kYWwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGlkZW50aXR5ID0gbmV3IElkZW50aXR5KGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTEpO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dJZGVudGl0eURldGFpbHMoaWRlbnRpdHkpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5jb250cm9sbGVyKS5cclxuICAgICAgICAgICAgICAgICAgICB0b0VxdWFsKCdJZGVudGl0eURldGFpbERpYWxvZ0N0cmwgYXMgZGlhbG9nQ3RybCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpZGVudGl0eSBzZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldHVwQWxsSWRlbnRpdGllcyhbaWRlbnRpdHkxXSk7XHJcblxyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldFNlbGVjdGVkSWRlbnRpdGllcyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaWRlbnRpdHkxIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBidWxrIGlkZW50aXR5IHJlcXVlc3RzIGFyZSBub3QgZW5hYmxlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2Uuc2V0QWxsb3dCdWxrUmVxdWVzdChmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgYWxsIHNlbGVjdGVkL3Vuc2VsZWN0ZWQgd2hlbiB0b2dnbGUgaXMgY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnRvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYWxsU2VsZWN0ZWQpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkZXNlbGVjdCB1bnNlbGVjdHMgYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlRmFsc3koKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZVRydXRoeSgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC5kZXNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NlbGVjdCBzZWxlY3RzIGFsbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXNldHMgbWFuYWdlIGFjY2VzcyBwYWdpbmcgd2hlbiBzZWxlY3Rpbmcgb3IgZGVzZWxlY3RpbmcgYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSwgJ3Jlc2V0TWFuYWdlQWNjZXNzUGFnaW5nJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnJlc2V0TWFuYWdlQWNjZXNzUGFnaW5nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLnJlc2V0TWFuYWdlQWNjZXNzUGFnaW5nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZWxlY3Qgd2l0aCBtdWx0aXBsZSBpZGVudGl0aWVzIHNldHMgc2VsZWN0IGFsbCBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0dXBBbGxJZGVudGl0aWVzKFtpZGVudGl0eTEsIGlkZW50aXR5Ml0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlRmFsc3koKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkyKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYWxsU2VsZWN0ZWQpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuZGVzZWxlY3RJZGVudGl0eShpZGVudGl0eTIpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd1bnNlbGVjdHMgYWxsIHdoZW4gc2VhcmNoaW5nIHJldHVybnMgbW9yZSB0aGFuIHRoZSBzZWxlY3RlZCB1c2VycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBTdGFydCBzaG93aW5nIDEgb2YgMiBpZGVudGl0aWVzIC0gdGhpcyBpcyB0aGUgZGVmYXVsdCBzZXR1cC5cclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxJZGVudGl0aWVzLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYWxsU2VsZWN0ZWQpLnRvQmVGYWxzeSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2VsZWN0IGFsbCBhbmQgdmVyaWZ5IHRoYXQgYWxsU2VsZWN0ZWQgaXMgdHJ1ZS5cclxuICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlVHJ1dGh5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZWFyY2ggYWdhaW4gcmV0dXJuaW5nIDIgb2YgMiBpZGVudGl0aWVzIC0gaWRlbnRpdHkyIHNob3VsZG4ndFxyXG4gICAgICAgICAgICAvLyBiZSBzZWxlY3RlZCBhZnRlciB0aGlzLlxyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldEFsbElkZW50aXRpZXMgPVxyXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaWRlbnRpdHkxLCBpZGVudGl0eTIgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzID1cclxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBbIGlkZW50aXR5MSwgaWRlbnRpdHkyIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VhcmNoKCk7XHJcbiAgICAgICAgICAgIHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IGFsbFNlbGVjdGVkIGlzIGZhbHNlLlxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxTZWxlY3RlZCkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0b2dnbGUgc2hvdyBzZWxlY3RlZCB0b2dnbGVzIHNlbGVjdGVkRGlzcGxheWVkIGZsYWcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvQmVGYWxzeSgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC50b2dnbGVTaG93U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2hvd1NlbGVjdGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNlbGVjdGVkRGlzcGxheWVkKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2ZldGNoIGl0ZW1zIGNhbGxzIGZldGNoU2VsZWN0ZWRJZGVudGl0aWVzIHdoZW4gaW4gc2VsZWN0ZWQgdmlldycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zZWxlY3RlZERpc3BsYXllZCkudG9CZUZhbHN5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWxlY3Qgc29tZSBpZGVudGl0aWVzXHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRvZ2dsZSBzaG93IHNlbGVjdGVkIHRvIHNob3cgc2VsZWN0ZWRcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTaG93U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdmZXRjaFNlbGVjdGVkSWRlbnRpdGllcycpO1xyXG4gICAgICAgICAgICBjdHJsLmZldGNoSXRlbXMoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmZldGNoU2VsZWN0ZWRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdiYWNrdXBJZGVudGl0aWVzIHNob3VsZCBiZSBzZXQgd2hlbiBpbiBzZWxlY3RlZCB2aWV3JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIHNlbGVjdCBzb21lIGlkZW50aXRpZXNcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgY3RybC50b2dnbGVTaG93U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvQmVUcnV0aHkoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmJhY2t1cFNlbGVjdGVkSWRlbnRpdGllcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2hvd1NlbGVjdGVkKCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkyKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTaG93U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYmFja3VwU2VsZWN0ZWRJZGVudGl0aWVzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RvZ2dsZVNlbGVjdEFsbCBzaG91bGQgY2FsbCBhZGRJZGVudGl0aWVzL3JlbW92ZUFsbElkZW50aXRpZXMgd2hlbiBpbiBzZWxlY3RlZCB2aWV3JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRJZGVudGl0aWVzJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdyZW1vdmVBbGxJZGVudGl0aWVzJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWxlY3Qgc29tZSBpZGVudGl0aWVzXHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2hvd1NlbGVjdGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNlbGVjdGVkRGlzcGxheWVkKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5yZW1vdmVBbGxJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0JlVHJ1dGh5KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgc3BNb2RhbCBtb2NrIHRvIGVpdGhlciByZXNvbHZlIG9yIHJlamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlc29sdmUgIFRydWUgaWYgdGhlIG1vZGFsIHNob3VsZCByZXNvbHZlLCBmYWxzZSB0byByZWplY3QuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldHVwTW9kYWwocmVzb2x2ZSkge1xyXG4gICAgICAgIHJlc29sdmVNb2RhbCA9IHJlc29sdmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCBjYWxscyB0byBzcE1vZGFsLm9wZW4oKSB0byBtb2NrIHRoZSByZXNwb25zZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0dXBNb2RhbE1vY2soX3NwTW9kYWxfLCAkcSkge1xyXG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzb2x2ZU1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDogZGVmZXJyZWQucHJvbWlzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdwcmV2ZW50IGFkZGluZyBpZGVudGl0aWVzIGlmIHJvbGUgaXMgaW4gY2FydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByb2xlUmVxdWVzdGVkSXRlbSwgZW50aXRsZW1lbnRSZXF1ZXN0ZWRJdGVtO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sICRxLCBBY2Nlc3NSZXF1ZXN0SXRlbSwgUmVxdWVzdGVkQWNjZXNzSXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgcm9sZSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSksXHJcbiAgICAgICAgICAgICAgICBlbnRpdGxlbWVudCA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuRU5USVRMRU1FTlQpO1xyXG5cclxuICAgICAgICAgICAgc2V0dXBNb2RhbE1vY2soX3NwTW9kYWxfLCAkcSk7XHJcblxyXG4gICAgICAgICAgICByb2xlUmVxdWVzdGVkSXRlbSA9IG5ldyBSZXF1ZXN0ZWRBY2Nlc3NJdGVtKHJvbGUpO1xyXG4gICAgICAgICAgICBlbnRpdGxlbWVudFJlcXVlc3RlZEl0ZW0gPSBuZXcgUmVxdWVzdGVkQWNjZXNzSXRlbShlbnRpdGxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnYWRkSWRlbnRpdHknKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2FkZElkZW50aXRpZXMnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdzZWxlY3RJZGVudGl0eSgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGlkZW50aXR5IGlmIGNhcnQgaGFzIG5vIGl0ZW1zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkSWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FkZHMgaWRlbnRpdHkgaWYgY2FydCBoYXMgbm8gcm9sZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZXF1ZXN0ZWRJdGVtcycpLlxyXG4gICAgICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZShbIGVudGl0bGVtZW50UmVxdWVzdGVkSXRlbSBdKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvd3MgbW9kYWwgaWYgY2FydCBoYXMgcm9sZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3M7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbXMnKS5cclxuICAgICAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyByb2xlUmVxdWVzdGVkSXRlbSBdKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICBhcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0uY29udGVudCkudG9FcXVhbCgndWlfYWNjZXNzX3JlcXVlc3RfbG9zZV9yZXF1ZXN0ZWRfcm9sZXNfd2FybmluZycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBhZGQgaWRlbnRpdHkgaWYgXCJub1wiIGlzIHNlbGVjdGVkIGluIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFsgcm9sZVJlcXVlc3RlZEl0ZW0gXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0dXBNb2RhbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eS5jYWxscy5jb3VudCgpKS50b0JlKDEpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eS5jYWxscy5jb3VudCgpKS50b0JlKDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGlkZW50aXR5IGlmIFwieWVzXCIgaXMgc2VsZWN0ZWQgaW4gZGlhbG9nJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbXMnKS5cclxuICAgICAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyByb2xlUmVxdWVzdGVkSXRlbSBdKTtcclxuICAgICAgICAgICAgICAgIHNldHVwTW9kYWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZElkZW50aXR5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3RvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0FsbElkZW50aXRpZXNBZGRlZCgpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmFkZElkZW50aXRpZXMpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN0cmwuYWxsSWRlbnRpdGllcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGFsbCBpZGVudGl0aWVzIGlmIGNhcnQgaGFzIG5vIGl0ZW1zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnRvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0FsbElkZW50aXRpZXNBZGRlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGFsbCBpZGVudGl0aWVzIGlmIGNhcnQgaGFzIG5vIHJvbGVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVxdWVzdGVkSXRlbXMnKS5cclxuICAgICAgICAgICAgICAgICAgICBhbmQucmV0dXJuVmFsdWUoWyBlbnRpdGxlbWVudFJlcXVlc3RlZEl0ZW0gXSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnRvZ2dsZVNlbGVjdEFsbElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBjaGVja0FsbElkZW50aXRpZXNBZGRlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG93cyBtb2RhbCBpZiBjYXJ0IGhhcyByb2xlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJncztcclxuICAgICAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdnZXRSZXF1ZXN0ZWRJdGVtcycpLlxyXG4gICAgICAgICAgICAgICAgICAgIGFuZC5yZXR1cm5WYWx1ZShbIHJvbGVSZXF1ZXN0ZWRJdGVtIF0pO1xyXG4gICAgICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgYXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmNvbnRlbnQpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X2xvc2VfcmVxdWVzdGVkX3JvbGVzX3dhcm5pbmcnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgYWRkIGlkZW50aXRpZXMgaWYgXCJub1wiIGlzIHNlbGVjdGVkIGluIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFsgcm9sZVJlcXVlc3RlZEl0ZW0gXSk7XHJcbiAgICAgICAgICAgICAgICBzZXR1cE1vZGFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkSWRlbnRpdGllcy5jYWxscy5jb3VudCgpKS50b0JlKDEpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0aWVzLmNhbGxzLmNvdW50KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FkZHMgaWRlbnRpdGllcyBpZiBcInllc1wiIGlzIHNlbGVjdGVkIGluIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ2dldFJlcXVlc3RlZEl0ZW1zJykuXHJcbiAgICAgICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFsgcm9sZVJlcXVlc3RlZEl0ZW0gXSk7XHJcbiAgICAgICAgICAgICAgICBzZXR1cE1vZGFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrQWxsSWRlbnRpdGllc0FkZGVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NoZWNrIHJlbW92ZWQgYWNjZXNzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gU2V0dXAgdGhlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sICRxKSB7XHJcbiAgICAgICAgICAgIHNldHVwTW9kYWxNb2NrKF9zcE1vZGFsXywgJHEpO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dIYXNSZW1vdmVkQWNjZXNzRGlhbG9nLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0UmVtb3ZlZEN1cnJlbnRBY2Nlc3NJdGVtcycpLlxyXG4gICAgICAgICAgICAgICAgYW5kLnJldHVyblZhbHVlKFt7IGlkOiAnd2hhdGV2ZXInfV0pO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNob3dIYXNSZW1vdmVkQWNjZXNzRGlhbG9nIHdoZW4gc2VsZWN0aW5nIGlkZW50aXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgc2VsZWN0IGlkZW50aXR5IGlmIHNob3dIYXNSZW1vdmVkQWNjZXNzRGlhbG9nIHJlc29sdmVzIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCksICdhZGRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgc2V0dXBNb2RhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0KCkuYWRkSWRlbnRpdHkuY2FsbHMuY291bnQoKSkudG9CZSgxKTtcclxuICAgICAgICAgICAgc2V0dXBNb2RhbCh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5zZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5hZGRJZGVudGl0eS5jYWxscy5jb3VudCgpKS50b0JlKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cgd2hlbiBkZXNlbGVjdGluZyBpZGVudGl0eScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsLmRlc2VsZWN0SWRlbnRpdHkoaWRlbnRpdHkxKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZGVzZWxlY3QgaWRlbnRpdHkgaWYgc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cgcmVzb2x2ZXMgdG8gZmFsc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3JlbW92ZUlkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBzZXR1cE1vZGFsKGZhbHNlKTtcclxuICAgICAgICAgICAgY3RybC5kZXNlbGVjdElkZW50aXR5KGlkZW50aXR5MSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLnJlbW92ZUlkZW50aXR5LmNhbGxzLmNvdW50KCkpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIHNldHVwTW9kYWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0cmwuZGVzZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKS5yZW1vdmVJZGVudGl0eS5jYWxscy5jb3VudCgpKS50b0JlKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgc2hvd0hhc1JlbW92ZWRBY2Nlc3NEaWFsb2cgd2hlbiB0b2dnbGluZyBzZWxlY3QgYWxsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlU2VsZWN0QWxsSWRlbnRpdGllcygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93SGFzUmVtb3ZlZEFjY2Vzc0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCB0b2dnbGUgc2VsZWN0IGFsbCBpZiBzaG93SGFzUmVtb3ZlZEFjY2Vzc0RpYWxvZyByZXNvbHZlcyB0byBmYWxzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cE1vZGFsKGZhbHNlKTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0dXBNb2RhbCh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTZWxlY3RBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbFNlbGVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHNob3cgd2FybmluZyBkaWFsb2cgaWYgYW55IHJlbW92ZWQgYWNjZXNzIGl0ZW1zIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYXJncztcclxuICAgICAgICAgICAgc2V0dXBNb2RhbCh0cnVlKTtcclxuICAgICAgICAgICAgY3RybC5zaG93SGFzUmVtb3ZlZEFjY2Vzc0RpYWxvZygpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLmNvbnRlbnQpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X2xvc2VfcmVtb3ZlZF9hY2Nlc3NfaXRlbXNfd2FybmluZycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzaG93IG1vZGFsIGlmIG5vIHJlbW92ZWQgYWNjZXNzIGl0ZW1zIGFyZSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldFJlbW92ZWRDdXJyZW50QWNjZXNzSXRlbXMuYW5kLnJldHVyblZhbHVlKFtdKTtcclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLmdldEFjY2Vzc1JlcXVlc3QoKSwgJ3JlbW92ZUlkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKHtmYWlsZWQ6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIGN0cmwuZGVzZWxlY3RJZGVudGl0eShpZGVudGl0eTEpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BhZ2Ugc3RhdGUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0ZWRQYWdlU3RhdGUgPSBuZXcgUGFnZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIGN0cmwucGFnZVN0YXRlID0gbmV3IFBhZ2VTdGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgLyogQ3JlYXRlIGRpZmZlcmVudCBhdHRyaWJ1dGVzIG9uIGVhY2ggc28gd2UgY2FuIGNvbXBhcmUgKi9cclxuICAgICAgICAgICAgY3RybC5zZWxlY3RlZFBhZ2VTdGF0ZS5wYWdpbmdEYXRhLml0ZW1zUGVyUGFnZSA9IDEwMDtcclxuICAgICAgICAgICAgY3RybC5wYWdlU3RhdGUucGFnaW5nRGF0YS5pdGVtc1BlclBhZ2UgPSAxO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2dldFBhZ2VTdGF0ZSgpIHJldHVybnMgZGVmYXVsdCBwYWdlU3RhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VTdGF0ZSA9IGN0cmwuZ2V0UGFnZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlU3RhdGUucGFnaW5nRGF0YS5pdGVtc1BlclBhZ2UpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdnZXRQYWdlU3RhdGUoKSByZXR1cm5zIHNlbGVjdGVkIHBhZ2VTdGF0ZSB3aGVuIGluIHNlbGVjdGVkIHZpZXcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY3RybC50b2dnbGVTaG93U2VsZWN0ZWQoKTtcclxuICAgICAgICAgICAgdmFyIHBhZ2VTdGF0ZSA9IGN0cmwuZ2V0UGFnZVN0YXRlKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdlU3RhdGUucGFnaW5nRGF0YS5pdGVtc1BlclBhZ2UpLnRvRXF1YWwoMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
