System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CertificationCtrl', function () {

                var $stateParams = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    certificationService = undefined,
                    cert = undefined,
                    certLoadingErrorMessage = undefined,
                    certificationDataService = undefined,
                    navigationService = undefined,
                    spModal = undefined,
                    $q = undefined,
                    testService = undefined,
                    config = undefined,
                    certificationTestData = undefined,
                    Certification = undefined,
                    electronicSignatureService = undefined,
                    CertificationConfig = undefined,
                    ObjectResultDTO = undefined,
                    certificationEntityService = undefined,
                    certObjResult = undefined,
                    filterData = undefined,
                    filtersArray = undefined,
                    Filter = undefined,
                    managedAttributeService = undefined;

                function setAllCounts(cert, status, value) {
                    for (var type in cert.itemStatusCount.counts) {
                        if (cert.itemStatusCount.counts.hasOwnProperty(type)) {
                            cert.itemStatusCount.counts[type][status] = value;
                        }
                    }
                }

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 17 */
                beforeEach(inject(function (_$controller_, _certificationService_, _certificationTestData_, _$q_, _Certification_, _$rootScope_, _spModal_, _navigationService_, _testService_, _certificationDataService_, _electronicSignatureService_, _certificationEntityService_, _CertificationConfig_, _ObjectResultDTO_, _Filter_, _managedAttributeService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    certificationService = _certificationService_;
                    certificationEntityService = _certificationEntityService_;
                    certificationDataService = _certificationDataService_;
                    navigationService = _navigationService_;
                    electronicSignatureService = _electronicSignatureService_;
                    CertificationConfig = _CertificationConfig_;
                    spModal = _spModal_;
                    $q = _$q_;
                    testService = _testService_;
                    Certification = _Certification_;
                    certificationTestData = _certificationTestData_;
                    ObjectResultDTO = _ObjectResultDTO_;
                    Filter = _Filter_;
                    managedAttributeService = _managedAttributeService_;

                    // Create some mock data
                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    certObjResult = new ObjectResultDTO({
                        object: cert,
                        warnings: ['cert_locked_warn'] });
                    $stateParams = {
                        certificationId: cert.id
                    };
                    config = {
                        some: 'configValue'
                    };
                    filterData = {
                        property: 'manager',
                        multiValued: false,
                        label: 'Manager',
                        dataType: 'SomeType',
                        allowedValues: null,
                        attributes: {}
                    };
                    filtersArray = [new Filter(filterData)];

                    // Mock the certificationService calls.
                    spyOn(certificationService, 'getCertification').and.callFake(function () {
                        return testService.createPromise(!!certLoadingErrorMessage, certObjResult, {
                            data: {
                                message: certLoadingErrorMessage
                            }
                        });
                    });
                    spyOn(certificationService, 'getConfiguration').and.callFake(function () {
                        return testService.createPromise(false, config);
                    });
                    spyOn(certificationService, 'getFilters').and.callFake(function () {
                        return testService.createPromise(false, filtersArray);
                    });
                    spyOn(certificationService, 'getCertificationItems').and.returnValue($q.when({
                        data: {
                            objects: [],
                            count: 0
                        }
                    }));
                    spyOn(certificationEntityService, 'getCertificationEntities').and.returnValue($q.when({
                        data: {
                            objects: [],
                            count: 0
                        }
                    }));
                    certLoadingErrorMessage = undefined;
                }));

                function createController() {
                    return $controller('CertificationCtrl', {
                        certificationService: certificationService,
                        certificationDataService: certificationDataService,
                        $stateParams: $stateParams
                    });
                }

                describe('constructor', function () {
                    it('throws if certification ID is missing', function () {
                        delete $stateParams.certificationId;
                        expect(function () {
                            createController();
                        }).toThrow();
                    });

                    it('loads the certification', function () {
                        var ctrl = createController();
                        spyOn(certificationDataService, 'initialize').and.callThrough();
                        expect(ctrl.id).toEqual(cert.id);
                        expect(certificationService.getCertification).toHaveBeenCalledWith(cert.id);
                        $rootScope.$apply();
                        expect(ctrl.getCertification()).toEqual(cert);
                        expect(certificationDataService.initialize).toHaveBeenCalledWith(cert, true);
                    });

                    it('does not load the certification if its already loaded', function () {
                        certificationDataService.initialize(cert);
                        createController();
                        expect(certificationService.getCertification).not.toHaveBeenCalled();
                    });

                    it('shows dialog and navigates back if cert loading fails', function () {
                        var spModalArgs = undefined;
                        spyOn(spModal, 'open').and.callFake(function () {
                            return {
                                result: testService.createPromise()
                            };
                        });
                        spyOn(navigationService, 'back');
                        certLoadingErrorMessage = 'ERROR!!';
                        createController();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        spModalArgs = spModal.open.calls.mostRecent().args;
                        expect(spModalArgs.length).toEqual(1);
                        expect(spModalArgs[0].content).toEqual(certLoadingErrorMessage);
                        $rootScope.$apply();
                        expect(navigationService.back).toHaveBeenCalled();
                    });

                    it('loads the configuration', function () {
                        createController();
                        spyOn(certificationDataService, 'initializeConfiguration');
                        expect(certificationService.getConfiguration).toHaveBeenCalledWith(cert.id);
                        $rootScope.$apply();
                        expect(certificationDataService.initializeConfiguration).toHaveBeenCalledWith(config);
                    });

                    it('loads the filters', function () {
                        spyOn(certificationDataService, 'setDataTableFilters');
                        createController();
                        expect(certificationService.getFilters).toHaveBeenCalledWith(cert.id);
                        $rootScope.$apply();
                        expect(certificationDataService.setDataTableFilters).toHaveBeenCalled();
                        var filtersPromise = certificationDataService.setDataTableFilters.calls.mostRecent().args[0],
                            foundFilters = undefined;
                        filtersPromise.then(function (filters) {
                            foundFilters = filters;
                        });
                        certificationDataService.initialize(cert, false, false);
                        $rootScope.$apply();
                        expect(foundFilters).toEqual(filtersArray);
                    });

                    it('sets the templateFunc if filter is additionalEntitlement', function () {
                        spyOn(certificationDataService, 'setDataTableFilters');
                        var ctrl = createController(),
                            templateFilter = undefined,
                            filtersPromise = undefined;
                        filtersArray.push(new Filter({
                            property: 'app',
                            attributes: {
                                additionalEntitlement: true,
                                application: 'app'
                            }
                        }));

                        filtersPromise = certificationDataService.setDataTableFilters.calls.mostRecent().args[0];
                        filtersPromise.then(function (filters) {
                            templateFilter = filters[1];
                        });
                        certificationDataService.initialize(cert, false, false);
                        $rootScope.$apply();
                        expect(templateFilter.templateFunc).toEqual(ctrl.getAdditionalEntitlementFilterTemplate);
                    });

                    it('loads the certification for detailed view', function () {
                        $stateParams = {
                            certificationId: cert.id,
                            entityId: '1234'
                        };
                        var ctrl = createController();
                        spyOn(certificationDataService, 'goToDetailView');
                        expect(ctrl.entityId).toEqual($stateParams.entityId);
                        $rootScope.$apply();
                        expect(certificationDataService.goToDetailView).toHaveBeenCalledWith($stateParams.entityId);
                        delete $stateParams.entityId;
                    });
                });

                describe('isMobileEntityListView()', function () {
                    it('returns true if an entity is not selected', function () {
                        var ctrl = createController();
                        certificationDataService.certification = cert;
                        expect(ctrl.isMobileEntityListView()).toEqual(true);
                    });

                    it('returns false if an entity is selected', function () {
                        var ctrl = createController();
                        certificationDataService.certification = cert;
                        certificationDataService.selectedEntity = {};
                        expect(ctrl.isMobileEntityListView()).toEqual(false);
                    });
                });

                it('gotoMobileEntityListView() clears the selected entity', function () {
                    var ctrl = createController();
                    certificationDataService.selectedEntity = {};
                    ctrl.gotoMobileEntityListView();
                    expect(ctrl.getEntity()).toEqual(null);
                });

                describe('entity paging', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                    });

                    describe('with no entity pager configured', function () {
                        it('hasNextEntity() returns false', function () {
                            expect(ctrl.hasNextEntity()).toEqual(false);
                        });

                        it('hasPreviousEntity() returns false', function () {
                            expect(ctrl.hasPreviousEntity()).toEqual(false);
                        });

                        it('gotoNextEntity() hurls', function () {
                            expect(function () {
                                return ctrl.gotoNextEntity();
                            }).toThrow();
                        });

                        it('gotoPreviousEntity() blows chunks', function () {
                            expect(function () {
                                return ctrl.gotoPreviousEntity();
                            }).toThrow();
                        });
                    });

                    describe('with an entity pager', function () {
                        var previousId = 'previousDude',
                            nextId = 'nextFella',
                            pager = undefined;

                        beforeEach(function () {
                            pager = {
                                hasNext: jasmine.createSpy().and.returnValue(true),
                                hasPrevious: jasmine.createSpy().and.returnValue(true),
                                next: jasmine.createSpy().and.returnValue(nextId),
                                previous: jasmine.createSpy().and.returnValue(previousId)
                            };

                            certificationDataService.entityListPager = pager;
                            spyOn(certificationDataService, 'goToDetailView');
                        });

                        it('hasNextEntity() delegates to the pager', function () {
                            expect(ctrl.hasNextEntity()).toEqual(true);
                            expect(pager.hasNext).toHaveBeenCalled();
                        });

                        it('hasPreviousEntity() delegates to the pager', function () {
                            expect(ctrl.hasPreviousEntity()).toEqual(true);
                            expect(pager.hasPrevious).toHaveBeenCalled();
                        });

                        it('gotoNextEntity() delegates to the pager and navigates to the detail view', function () {
                            ctrl.gotoNextEntity();
                            expect(pager.next).toHaveBeenCalled();
                            expect(certificationDataService.goToDetailView).toHaveBeenCalledWith(nextId);
                        });

                        it('gotoPreviousEntity() delegates to the pager and navigates to the detail view', function () {
                            ctrl.gotoPreviousEntity();
                            expect(pager.previous).toHaveBeenCalled();
                            expect(certificationDataService.goToDetailView).toHaveBeenCalledWith(previousId);
                        });
                    });
                });

                it('getItems() calls service with correct values from table', function () {
                    var ctrl = createController(),
                        cfgKey = 'whu?!',
                        groupBy = 'ya',
                        filterVals = [{ some: 'filter' }],
                        table = {
                        getDataTableConfig: function () {
                            return {
                                getColumnConfigKey: function () {
                                    return cfgKey;
                                }
                            };
                        },
                        tableScope: {
                            statuses: ['Whatever'],
                            includedTypes: ['hmmmmm'],
                            excludedTypes: ['giggity'],
                            entity: {
                                id: 'entity1234'
                            }
                        }
                    };
                    expect(certificationService.getCertificationItems).not.toHaveBeenCalled();
                    ctrl.getItems(table, 0, 10, filterVals, null, groupBy);
                    expect(certificationService.getCertificationItems).toHaveBeenCalledWith(cert.id, table.tableScope, 0, 10, null, groupBy, cfgKey, filterVals);
                });

                it('getEntities() calls service with correct values from table', function () {
                    var ctrl = createController(),
                        cfgKey = 'whu?!',
                        table = {
                        getDataTableConfig: function () {
                            return {
                                getColumnConfigKey: function () {
                                    return cfgKey;
                                }
                            };
                        }
                    };
                    expect(certificationEntityService.getCertificationEntities).not.toHaveBeenCalled();
                    ctrl.getEntities(table, 0, 10, null);
                    expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(cert.id, 0, 10, null, null, null, null, null, cfgKey);
                });

                describe('is delegated to view state', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                        certificationDataService.initialize(cert, false, false);
                    });

                    it('getCurrentTab()', function () {
                        spyOn(certificationDataService.getViewState(), 'getCurrentTab');
                        ctrl.getCurrentTab();
                        expect(certificationDataService.getViewState().getCurrentTab).toHaveBeenCalled();
                    });

                    it('getCurrentTabConfig()', function () {
                        spyOn(certificationDataService.getViewState(), 'getCurrentTabConfig');
                        ctrl.getCurrentTabConfig();
                        expect(certificationDataService.getViewState().getCurrentTabConfig).toHaveBeenCalled();
                    });

                    it('getTabCount()', function () {
                        var tab = {
                            name: 'tably namely'
                        };
                        spyOn(certificationDataService.getViewState(), 'getTabCount');
                        ctrl.getTabCount(tab);
                        expect(certificationDataService.getViewState().getTabCount).toHaveBeenCalledWith(tab.name);
                    });

                    it('changeTab()', function () {
                        var tab = 'SomeTab';
                        spyOn(certificationDataService.getViewState(), 'changeTab');
                        ctrl.changeTab(tab);
                        expect(certificationDataService.getViewState().changeTab).toHaveBeenCalledWith(tab);
                    });

                    it('isTableDisplayed()', function () {
                        var table = {};
                        spyOn(certificationDataService.getViewState(), 'isTableDisplayed');
                        ctrl.isTableDisplayed(table);
                        expect(certificationDataService.getViewState().isTableDisplayed).toHaveBeenCalledWith(table);
                    });
                });

                describe('is delegated to data service', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                    });

                    it('getDecisionCount()', function () {
                        spyOn(certificationDataService.decisions, 'getDecisionCount').and.returnValue(43);
                        var count = ctrl.getDecisionCount();
                        expect(certificationDataService.decisions.getDecisionCount).toHaveBeenCalled();
                        expect(count).toEqual(43);
                    });
                });

                describe('showExpirationDate()', function () {
                    /**
                     * Create a controller with the given date - the cert will also be loaded already.
                     */
                    function createCtrlWithExpiration(date) {
                        var ctrl = undefined;
                        cert.expiration = date;
                        ctrl = createController();
                        $rootScope.$apply();
                        return ctrl;
                    }

                    function getDate(daysFromNow) {
                        var start = new Date(),
                            newTime = start.getTime() + daysFromNow * (1000 * 60 * 60 * 24);
                        return new Date(newTime);
                    }

                    it('returns false if the certification has no expiration date', function () {
                        var ctrl = createCtrlWithExpiration(null);
                        expect(ctrl.showExpirationDate()).toEqual(false);
                    });

                    it('returns false if the expiration is more than two weeks away', function () {
                        var ctrl = createCtrlWithExpiration(getDate(16));
                        expect(ctrl.showExpirationDate()).toEqual(false);
                    });

                    it('returns false if cert is signed off', function () {
                        var ctrl = createCtrlWithExpiration(getDate(-2));
                        spyOn(ctrl, 'isSignedOff').and.returnValue(true);
                        expect(ctrl.showExpirationDate()).toEqual(false);
                    });

                    it('returns true if the expiration date is less than two weeks away', function () {
                        var ctrl = createCtrlWithExpiration(getDate(13));
                        expect(ctrl.showExpirationDate()).toEqual(true);
                    });

                    it('returns true if the certification is overdue', function () {
                        var ctrl = createCtrlWithExpiration(getDate(-2));
                        expect(ctrl.showExpirationDate()).toEqual(true);
                    });
                });

                describe('clear button', function () {
                    it('is disabled if there are no decisions', function () {
                        var ctrl = createController();
                        expect(ctrl.isClearButtonEnabled()).toEqual(false);
                    });

                    it('is enabled if there are decisions', function () {
                        spyOn(certificationDataService.decisions, 'getDecisionCount').and.returnValue(43);
                        var ctrl = createController();
                        expect(ctrl.isClearButtonEnabled()).toEqual(true);
                    });
                });

                describe('clearDecisions()', function () {
                    it('calls through to clear decisions on decision store', function () {
                        spyOn(certificationDataService.decisions, 'clearDecisions');
                        var ctrl = createController();
                        ctrl.clearDecisions();
                        expect(certificationDataService.decisions.clearDecisions).toHaveBeenCalled();
                    });
                });

                describe('save button', function () {
                    it('is disabled if there are no decisions', function () {
                        var ctrl = createController();
                        expect(ctrl.isSaveButtonEnabled()).toEqual(false);
                    });

                    it('is enabled if there are decisions', function () {
                        spyOn(certificationDataService.decisions, 'getDecisionCount').and.returnValue(43);
                        var ctrl = createController();
                        expect(ctrl.isSaveButtonEnabled()).toEqual(true);
                    });
                });

                describe('save', function () {
                    var fakeCert = undefined,
                        fakeDecisions = undefined,
                        saveReturnVal = undefined,
                        deferred = undefined,
                        failedResponse = undefined;

                    beforeEach(function () {
                        fakeCert = new Certification(certificationTestData.CERTIFICATION_1);
                        fakeDecisions = ['hi mom!'];
                    });

                    function spyOnGetDecisions() {
                        // Loading the cert resets the decisions object with a new object, so we have to spy after creation.
                        spyOn(certificationDataService.decisions, 'getDecisions').and.returnValue(fakeDecisions);
                    }

                    function setup(greatSuccess, status) {
                        var response = { status: status };
                        saveReturnVal = greatSuccess ? $q.when({ data: { object: fakeCert } }) : $q.reject(response);
                        spyOn(certificationService, 'saveDecisions').and.returnValue(saveReturnVal);
                        spyOn(certificationDataService, 'initialize').and.callThrough();
                        spyOn(certificationDataService, 'refreshView').and.callThrough();
                    }

                    function setupForSaveRetryDialog() {
                        failedResponse = { status: 409 };
                        saveReturnVal = $q.reject(failedResponse);

                        spyOn(spModal, 'open').and.callFake(function () {
                            deferred = $q.defer();
                            return {
                                result: deferred.promise
                            };
                        });
                        spyOn(certificationService, 'saveDecisions').and.callFake(function () {
                            return saveReturnVal;
                        });
                    }

                    it('calls the certification service with the decisions', function () {
                        setup(true, 200);

                        var ctrl = createController();
                        $rootScope.$apply();
                        spyOnGetDecisions();
                        certificationDataService.initialize.calls.reset();
                        ctrl.save();
                        $rootScope.$apply();

                        expect(certificationService.saveDecisions).toHaveBeenCalledWith(cert.id, fakeDecisions);
                        expect(ctrl.getCertification()).toEqual(fakeCert);
                    });

                    it('reinitialized the data service after a successful save', function () {
                        setup(true, 200);

                        var ctrl = createController();
                        $rootScope.$apply();
                        spyOnGetDecisions();
                        certificationDataService.initialize.calls.reset();
                        ctrl.save();
                        $rootScope.$apply();

                        expect(certificationDataService.initialize).toHaveBeenCalledWith(fakeCert, false);
                        expect(certificationDataService.refreshView).toHaveBeenCalledWith(true);
                    });

                    it('goes to previous page if last decision on last page is finished', function () {
                        // Make the save call return a cert that has only 30 "decisions left" items.  Total = 33.
                        setAllCounts(fakeCert, 'Open', 0);
                        setAllCounts(fakeCert, 'Delegated', 0);
                        setAllCounts(fakeCert, 'Returned', 0);
                        setAllCounts(fakeCert, 'Complete', 0);
                        setAllCounts(fakeCert, 'Challenged', 0);
                        setAllCounts(fakeCert, 'WaitingReview', 0);
                        fakeCert.itemStatusCount.counts.Bundle.Open = 30;
                        fakeCert.itemStatusCount.counts.Bundle.Complete = 3;

                        certificationDataService.initialize(fakeCert);

                        setup(true, 200);
                        var ctrl = createController();
                        spyOnGetDecisions();

                        // Go to the last page.
                        expect(ctrl.getCurrentTabConfig().tables.length).toEqual(1);
                        var table = ctrl.getCurrentTabConfig().tables[0];
                        table.getDataTableConfig().getPageState().pagingData.currentPage = 4;

                        // Save.
                        ctrl.save();
                        $rootScope.$apply();

                        // Verify that we're now on the third page.
                        expect(table.getDataTableConfig().getPageState().pagingData.currentPage).toEqual(3);
                    });

                    it('refreshes the list after a successful save', function () {
                        setup(true, 200);

                        var ctrl = createController();
                        certificationDataService.initialize(cert, false, false);

                        spyOnGetDecisions();
                        spyOn(certificationDataService.getViewState(), 'refreshCurrentTab');
                        ctrl.save();
                        $rootScope.$apply();

                        expect(certificationDataService.getViewState().refreshCurrentTab).toHaveBeenCalled();
                    });

                    it('does not reinitialize with cert and clear decisions if saving fails', function () {
                        var ctrl = createController();
                        $rootScope.$apply();
                        setup(false, 404);
                        spyOnGetDecisions();
                        certificationDataService.initialize.calls.reset();
                        ctrl.save();
                        $rootScope.$apply();

                        expect(certificationDataService.initialize).not.toHaveBeenCalled();
                    });

                    it('does not refresh the list if saving fails', function () {
                        setup(false, 404);

                        var ctrl = createController();
                        certificationDataService.initialize(cert, false, false);

                        spyOnGetDecisions();
                        spyOn(certificationDataService.getViewState(), 'refreshCurrentTab');
                        ctrl.save();
                        $rootScope.$apply();

                        expect(certificationDataService.getViewState().refreshCurrentTab).not.toHaveBeenCalled();
                    });

                    it('opens retry dialog if saving fails with 409 status', function () {
                        setupForSaveRetryDialog();

                        var ctrl = createController();
                        spyOnGetDecisions();
                        ctrl.save();
                        $rootScope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                        //retry dialog for locked cert
                        expect(spModal.open).toHaveBeenCalled();
                        certificationService.saveDecisions.calls.reset();
                        //locked cert - don't save
                        deferred.reject();
                        $rootScope.$apply();
                        expect(certificationService.saveDecisions).not.toHaveBeenCalled();
                    });

                    it('first opens retry dialog for 409 status and then resolves successfully when cert unlocked', function () {
                        setupForSaveRetryDialog();

                        var ctrl = createController(),
                            successResponse = {
                            status: 200,
                            data: { object: fakeCert }
                        };

                        spyOnGetDecisions();
                        ctrl.save();
                        $rootScope.$apply();
                        //retry dialog opened for locked cert
                        expect(spModal.open).toHaveBeenCalled();
                        //saving a locked cert
                        deferred.resolve($q.when(failedResponse));
                        $rootScope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                        //retry dialog opened for locked cert
                        expect(spModal.open).toHaveBeenCalled();
                        certificationService.saveDecisions.calls.reset();
                        spModal.open.calls.reset();
                        //saving an unlocked cert
                        saveReturnVal = $q.when(successResponse);
                        deferred.resolve($q.when(successResponse));
                        $rootScope.$apply();
                        expect(certificationService.saveDecisions).toHaveBeenCalled();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });
                });

                describe('sign', function () {

                    var deferred = undefined,
                        saveReturnVal = undefined,
                        failedResponse = undefined;

                    beforeEach(function () {
                        spyOn(electronicSignatureService, 'openDialog').and.returnValue(testService.createPromise(false, {
                            username: 'test',
                            password: 'xyzzy'
                        }));
                        spyOn(navigationService, 'back');
                    });

                    function setupForSignOffRetryDialog() {
                        failedResponse = { status: 409 };

                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(new CertificationConfig({
                            someConfig: 'test'
                        }));
                        spyOn(spModal, 'open').and.callFake(function () {
                            deferred = $q.defer();
                            return {
                                result: deferred.promise
                            };
                        });
                        spyOn(certificationService, 'signOff').and.callFake(function () {
                            return saveReturnVal;
                        });
                    }

                    it('opens the esig dialog when esig is configured', function () {
                        var ctrl = createController(),
                            username = 'test',
                            password = 'xyzzy';

                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(new CertificationConfig({
                            esigMeaning: 'Esig'
                        }));
                        spyOn(certificationService, 'signOff').and.returnValue(new Certification(certificationTestData.CERTIFICATION_2));
                        ctrl.sign();
                        expect(electronicSignatureService.openDialog).toHaveBeenCalled();
                        $rootScope.$apply();
                        expect(certificationService.signOff).toHaveBeenCalledWith(cert.id, username, password);
                        expect(ctrl.isSignedOff()).toBeTruthy();
                    });

                    it('opens the completion dialog for signOff when esig is not configured', function () {
                        var ctrl = createController();
                        spyOn(spModal, 'open').and.returnValue({
                            result: testService.createPromise(false)
                        });
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(new CertificationConfig({
                            someConfig: 'test'
                        }));
                        spyOn(certificationService, 'signOff').and.returnValue(new Certification(certificationTestData.CERTIFICATION_2));
                        ctrl.sign();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(electronicSignatureService.openDialog).not.toHaveBeenCalled();
                        $rootScope.$apply();
                        expect(certificationService.signOff).toHaveBeenCalledWith(cert.id);
                        expect(ctrl.isSignedOff()).toBeTruthy();
                    });

                    it('calls navigation service after signOff', function () {
                        var ctrl = createController();
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(new CertificationConfig({
                            esigMeaning: 'Esig'
                        }));
                        spyOn(certificationService, 'signOff');
                        ctrl.sign();
                        $rootScope.$apply();
                        expect(navigationService.back).toHaveBeenCalled();
                    });

                    it('shows dialog if there is a signoff blocked reason', function () {
                        var ctrl = undefined,
                            reason = 'dont sign this dummy';
                        cert.signoffBlockedReason = reason;
                        spyOn(spModal, 'open').and.returnValue({
                            result: testService.createPromise(false)
                        });
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(new CertificationConfig({
                            someConfig: 'test'
                        }));
                        ctrl = createController();
                        $rootScope.$apply();
                        spyOn(certificationService, 'signOff');
                        ctrl.sign();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].resolve.reason()).toEqual(reason);
                        expect(electronicSignatureService.openDialog).not.toHaveBeenCalled();
                        expect(certificationService.signOff).not.toHaveBeenCalled();
                    });

                    it('opens retry dialog if signOff fails with 409 status', function () {

                        var ctrl = createController();
                        $rootScope.$apply();
                        setupForSignOffRetryDialog();
                        ctrl.sign();
                        $rootScope.$apply();
                        //completion dialog
                        expect(spModal.open).toHaveBeenCalled();
                        deferred.resolve();
                        spModal.open.calls.reset();
                        saveReturnVal = $q.reject(failedResponse);
                        $rootScope.$apply();
                        expect(certificationService.signOff).toHaveBeenCalled();
                        certificationService.signOff.calls.reset();
                        //retry dialog
                        expect(spModal.open).toHaveBeenCalled();
                        deferred.reject();
                        $rootScope.$apply();
                        expect(certificationService.signOff).not.toHaveBeenCalled();
                    });

                    it('first opens retry dialog for 409 status and then signOff successfully when cert unlocked', function () {
                        setupForSignOffRetryDialog();
                        var successResponse = {
                            status: 200,
                            data: { object: new Certification(certificationTestData.CERTIFICATION_1) }
                        },
                            ctrl = createController();

                        ctrl.sign();
                        $rootScope.$apply();
                        //completion dialog
                        expect(spModal.open).toHaveBeenCalled();
                        deferred.resolve();
                        spModal.open.calls.reset();
                        saveReturnVal = $q.reject(failedResponse);
                        $rootScope.$apply();
                        //retry dialog for locked cert
                        expect(spModal.open).toHaveBeenCalled();
                        deferred.resolve($q.when(failedResponse));
                        spModal.open.calls.reset();
                        $rootScope.$apply();
                        expect(certificationService.signOff).toHaveBeenCalled();
                        //completion dialog
                        expect(spModal.open).toHaveBeenCalled();
                        deferred.resolve();
                        spModal.open.calls.reset();
                        certificationService.signOff.calls.reset();
                        $rootScope.$apply();
                        //saving an unlocked cert
                        //retry dialog
                        expect(spModal.open).toHaveBeenCalled();
                        saveReturnVal = $q.when(successResponse);
                        deferred.resolve($q.when(successResponse));
                        $rootScope.$apply();
                        expect(certificationService.signOff).toHaveBeenCalled();
                    });
                });

                describe('isComplete', function () {
                    var fakeCert = undefined;

                    beforeEach(function () {
                        fakeCert = new Certification(certificationTestData.CERTIFICATION_1);
                    });

                    it('is false if completed items do not equal total items', function () {

                        setAllCounts(fakeCert, 'Open', 0);
                        setAllCounts(fakeCert, 'Delegated', 0);
                        setAllCounts(fakeCert, 'Returned', 0);
                        setAllCounts(fakeCert, 'Complete', 3);
                        certificationDataService.initialize(fakeCert);

                        var ctrl = createController();
                        $rootScope.$apply();

                        expect(ctrl.isComplete()).toEqual(false);
                    });

                    it('is true if completed items equal total items, regardless of complete flag', function () {
                        setAllCounts(fakeCert, 'Open', 0);
                        setAllCounts(fakeCert, 'Delegated', 0);
                        setAllCounts(fakeCert, 'Returned', 0);
                        setAllCounts(fakeCert, 'Complete', 1);
                        setAllCounts(fakeCert, 'WaitingReview', 0);
                        setAllCounts(fakeCert, 'Challenged', 0);
                        certificationDataService.initialize(fakeCert);

                        // Ignore this flag for these purposes, since can be false for other reasons.
                        cert.complete = false;
                        var ctrl = createController();
                        $rootScope.$apply();
                        expect(ctrl.isComplete()).toEqual(true);
                    });

                    it('is false if there are pending decisions, regardless of item count', function () {
                        spyOn(certificationDataService.decisions, 'getDecisionCount').and.returnValue(2);
                        var ctrl = createController();
                        $rootScope.$apply();
                        expect(ctrl.isComplete()).toEqual(false);
                    });
                });

                describe('isSignedOff', function () {
                    it('is false if cert is not signedOff', function () {
                        cert.signOffComplete = false;
                        var ctrl = createController();
                        $rootScope.$apply();
                        expect(ctrl.isSignedOff()).toEqual(false);
                    });

                    it('is true if cert is signedOff', function () {
                        cert.signOffComplete = true;
                        var ctrl = createController();
                        $rootScope.$apply();
                        expect(ctrl.isSignedOff()).toEqual(true);
                    });
                });

                describe('showDateField()', function () {
                    it('returns false if showExpirationDate and isSignedOff are both false', function () {
                        var ctrl = createController();
                        spyOn(ctrl, 'showExpirationDate').and.returnValue(false);
                        spyOn(ctrl, 'isSignedOff').and.returnValue(false);
                        expect(ctrl.showDateField()).toEqual(false);
                    });

                    it('returns true if showExpirationDate is true', function () {
                        var ctrl = createController();
                        spyOn(ctrl, 'showExpirationDate').and.returnValue(true);
                        spyOn(ctrl, 'isSignedOff').and.returnValue(false);
                        expect(ctrl.showDateField()).toEqual(true);
                    });

                    it('returns true if isSignedOff is true', function () {
                        var ctrl = createController();
                        spyOn(ctrl, 'showExpirationDate').and.returnValue(false);
                        spyOn(ctrl, 'isSignedOff').and.returnValue(true);
                        expect(ctrl.showDateField()).toEqual(true);
                    });
                });

                describe('getBulkDecisions()', function () {
                    var CertificationViewState = undefined;

                    beforeEach(inject(function (_CertificationViewState_) {
                        CertificationViewState = _CertificationViewState_;
                    }));

                    it('returns bulk decisions for a complete tab from configuration if loaded', function () {
                        var bulkDecisions = ['decision1', 'decision2', 'Reassign', 'Cleared'],
                            filteredBulkDecisions = ['Reassign', 'Cleared'],
                            ctrl = createController();
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue({
                            bulkDecisions: bulkDecisions
                        });
                        spyOn(ctrl, 'getCurrentTab').and.returnValue(CertificationViewState.Tab.Complete);
                        expect(ctrl.getBulkDecisions()).toEqual(filteredBulkDecisions);
                    });

                    it('returns filtered bulk decisions for DecisionsLeft tab', function () {
                        var bulkDecisions = ['decision1', 'decision2', 'Cleared'],
                            filteredBulkDecisions = ['decision1', 'decision2'],
                            ctrl = createController();
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue({
                            bulkDecisions: bulkDecisions
                        });
                        spyOn(ctrl, 'getCurrentTab').and.returnValue('DecisionsLeft');
                        expect(ctrl.getBulkDecisions().length).toEqual(2);
                        expect(ctrl.getBulkDecisions()).toEqual(filteredBulkDecisions);
                    });

                    it('returns filtered bulk decisions for action required tab', function () {
                        var bulkDecisions = ['decision1', 'decision2', 'Reassign', 'Cleared'],
                            filteredBulkDecisions = ['Reassign'],
                            ctrl = createController();
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue({
                            bulkDecisions: bulkDecisions
                        });
                        spyOn(ctrl, 'getCurrentTab').and.returnValue(CertificationViewState.Tab.ActionRequired);
                        expect(ctrl.getBulkDecisions()).toEqual(filteredBulkDecisions);
                    });

                    it('returns null if configuration is not loaded', function () {
                        var ctrl = createController();
                        certificationDataService.initialize(cert, false, false);
                        spyOn(certificationDataService, 'getConfiguration').and.returnValue(undefined);
                        expect(ctrl.getBulkDecisions()).toEqual(null);
                    });
                });

                describe('goBack()', function () {

                    it('should call navigation service to go back to previous page', function () {
                        var ctrl = createController();
                        spyOn(navigationService, 'back');
                        ctrl.goBack();
                        expect(navigationService.back).toHaveBeenCalled();
                    });
                });

                describe('showMobileEntityDetails()', function () {
                    it('opens dialog to show entity details', function () {
                        var entity = { some: 'entity' },
                            ctrl = createController();
                        spyOn(spModal, 'open');
                        spyOn(ctrl, 'getEntity').and.returnValue(entity);
                        ctrl.showMobileEntityDetails();
                        expect(spModal.open).toHaveBeenCalled();
                        var args = spModal.open.calls.mostRecent().args;
                        expect(args[0].resolve.entity()).toEqual(entity);
                    });
                });

                describe('hasLoadedManagedAttributeDetail', function () {
                    var ctrl = undefined;
                    beforeEach(function () {
                        ctrl = createController();
                        spyOn(managedAttributeService, 'getEntitlementDetails');
                    });

                    describe('for non-DataOwner certifications', function () {
                        beforeEach(function () {
                            spyOn(certificationDataService, 'getCertification').and.returnValue({
                                type: Certification.Type.Identity
                            });
                            spyOn(ctrl, 'getEntity').and.returnValue({
                                id: 'whatevs'
                            });
                        });

                        it('should return false', function () {
                            expect(ctrl.hasLoadedManagedAttributeDetails()).toBeFalsy();
                        });

                        it('should not call through to managedAttributeService', function () {
                            ctrl.hasLoadedManagedAttributeDetails();
                            expect(managedAttributeService.getEntitlementDetails).not.toHaveBeenCalled();
                        });
                    });

                    describe('for DataOwner certifications', function () {
                        var maDetails = {
                            foo: 'bar'
                        },
                            certId = 'something',
                            entity1Id = '123',
                            entity2Id = '321',
                            expectedUrl1 = '/ui/rest/certifications/' + certId + '/entities/' + entity1Id + '/managedAttributeDetails',
                            expectedUrl2 = '/ui/rest/certifications/' + certId + '/entities/' + entity2Id + '/managedAttributeDetails';

                        beforeEach(function () {
                            spyOn(certificationDataService, 'getCertification').and.returnValue({
                                id: certId,
                                type: Certification.Type.DataOwner
                            });
                            spyOn(ctrl, 'getEntity').and.returnValue({
                                id: entity1Id
                            });
                            managedAttributeService.getEntitlementDetails.and.returnValue($q.when(maDetails));
                        });

                        it('should return false if the managedAttributeDetails has not been fetched', function () {
                            expect(ctrl.hasLoadedManagedAttributeDetails()).toBeFalsy();
                        });

                        it('should return true if the managedAttributeDetails has been fetched', function () {
                            ctrl.hasLoadedManagedAttributeDetails();
                            $rootScope.$apply();
                            expect(ctrl.hasLoadedManagedAttributeDetails()).toBeTruthy();
                            expect(ctrl.managedAttributeDetails).toBe(maDetails);
                        });

                        it('should call through to managedAttributeService to fetch details', function () {
                            ctrl.hasLoadedManagedAttributeDetails();
                            expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(expectedUrl1);
                        });

                        it('should clear managedAttributeDetails when fetching for new entity', function () {
                            ctrl.hasLoadedManagedAttributeDetails();
                            $rootScope.$apply();
                            expect(ctrl.managedAttributeDetails).toBeTruthy();
                            // Reset spy to return different value
                            ctrl.getEntity.and.returnValue({
                                id: entity2Id
                            });
                            ctrl.hasLoadedManagedAttributeDetails();
                            expect(ctrl.managedAttributeDetails).toBeFalsy();
                        });

                        it('should call managedAttributeService to fetch different entity details', function () {
                            ctrl.hasLoadedManagedAttributeDetails();
                            $rootScope.$apply();
                            expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(expectedUrl1);
                            // Reset spy calls and return different entity
                            managedAttributeService.getEntitlementDetails.calls.reset();
                            ctrl.getEntity.and.returnValue({
                                id: entity2Id
                            });
                            ctrl.hasLoadedManagedAttributeDetails();
                            expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(expectedUrl2);
                        });
                    });
                });

                describe('mobile entity search', function () {
                    var ctrl = undefined;
                    beforeEach(function () {
                        ctrl = createController();
                        spyOn(ctrl.entityListRefreshTrigger, 'refresh');
                    });

                    describe('mobileEntitySearch()', function () {
                        it('does nothing with event with keyCode other than 13 (enter)', function () {
                            // call once to toggle search on
                            ctrl.mobileEntitySearch();

                            // call again with non-enter event
                            ctrl.mobileEntitySearch({
                                keyCode: 23
                            });

                            expect(ctrl.entityListRefreshTrigger.refresh).not.toHaveBeenCalled();
                        });

                        it('refreshes with keyCode 13 (enter)', function () {
                            // call once to toggle search on
                            ctrl.mobileEntitySearch();

                            // call again with enter event
                            ctrl.mobileEntitySearch({
                                keyCode: 13
                            });

                            expect(ctrl.entityListRefreshTrigger.refresh).toHaveBeenCalled();
                        });

                        it('toggles searching if not already toggled on', function () {
                            ctrl.mobileEntitySearch();
                            expect(ctrl.getMobileEntityListState().searching).toEqual(true);
                            expect(ctrl.entityListRefreshTrigger.refresh).not.toHaveBeenCalled();
                        });

                        it('refreshes trigger if searching already toggled on', function () {
                            ctrl.mobileEntitySearch();
                            ctrl.mobileEntitySearch();
                            expect(ctrl.entityListRefreshTrigger.refresh).toHaveBeenCalled();
                        });
                    });

                    describe('mobileEntitySearchClear()', function () {
                        it('clears search term and refreshes trigger', function () {
                            ctrl.getMobileEntityListState().entitySearchTerm = 'abc';
                            ctrl.mobileEntitySearchClear();
                            expect(ctrl.getMobileEntityListState().entitySearchTerm).toEqual(undefined);
                            expect(ctrl.entityListRefreshTrigger.refresh).toHaveBeenCalled();
                        });

                        it('toggles search off', function () {
                            ctrl.getMobileEntityListState().searching = true;
                            ctrl.mobileEntitySearchClear();
                            expect(ctrl.getMobileEntityListState().searching).toEqual(false);
                        });
                    });

                    describe('isMobileEntitySearch()', function () {
                        it('returns searching flag from mobile entity list state', function () {
                            ctrl.getMobileEntityListState().searching = true;
                            expect(ctrl.isMobileEntitySearch()).toEqual(true);
                        });
                    });

                    describe('hasUserView()', function () {
                        it('returns true if cert type is Manager', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Manager);
                            expect(ctrl.hasUserView()).toEqual(true);
                        });

                        it('returns true if cert type is Manager', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Manager);
                            expect(ctrl.hasUserView()).toEqual(true);
                        });

                        it('returns true if cert type is ApplicationOwner', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.ApplicationOwner);
                            expect(ctrl.hasUserView()).toEqual(true);
                        });

                        it('returns true if cert type is Identity', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Identity);
                            expect(ctrl.hasUserView()).toEqual(true);
                        });

                        it('returns true if cert type is Group', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Group);
                            expect(ctrl.hasUserView()).toEqual(true);
                        });

                        it('returns false if cert type is DataOwner', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                            expect(ctrl.hasUserView()).toEqual(false);
                        });

                        it('returns false if cert type is AccountGroupMembership', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupMembership);
                            expect(ctrl.hasUserView()).toEqual(false);
                        });

                        it('returns false if cert type is AccountGroupPermissions', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupPermissions);
                            expect(ctrl.hasUserView()).toEqual(false);
                        });
                    });

                    describe('hasEntityListView()', function () {
                        it('returns true if cert type is Manager', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Manager);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is Manager', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Manager);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is ApplicationOwner', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.ApplicationOwner);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is Identity', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Identity);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is Group', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.Group);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is DataOwner', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is AccountGroupMembership', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupMembership);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is AccountGroupPermissions', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupPermissions);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });

                        it('returns true if cert type is BusinessRoleComposition', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.BusinessRoleComposition);
                            expect(ctrl.hasEntityListView()).toEqual(true);
                        });
                    });
                });

                describe('hasLoadedRoleSnapshot', function () {
                    var ctrl = undefined;
                    beforeEach(function () {
                        ctrl = createController();
                        spyOn(certificationEntityService, 'getRoleSnapshot');
                    });

                    it('should return false if no entity', function () {
                        spyOn(ctrl, 'getEntity').and.returnValue(undefined);
                        expect(ctrl.hasLoadedRoleSnapshot()).toBeFalsy();
                    });

                    describe('for non-business role certifications', function () {
                        beforeEach(function () {
                            spyOn(certificationDataService, 'getCertification').and.returnValue({
                                type: Certification.Type.Identity
                            });
                            spyOn(ctrl, 'getEntity').and.returnValue({
                                id: 'whatevs'
                            });
                        });

                        it('should return false', function () {
                            expect(ctrl.hasLoadedRoleSnapshot()).toBeFalsy();
                        });

                        it('should not call through to certificationEntityService', function () {
                            ctrl.hasLoadedRoleSnapshot();
                            expect(certificationEntityService.getRoleSnapshot).not.toHaveBeenCalled();
                        });
                    });

                    describe('for BusinessRole certifications', function () {
                        var roleSnapshot = {
                            foo: 'bar'
                        },
                            certId = 'something',
                            entity1Id = '123',
                            entity2Id = '321';

                        beforeEach(function () {
                            spyOn(certificationDataService, 'getCertification').and.returnValue({
                                id: certId,
                                type: Certification.Type.BusinessRoleComposition
                            });
                            spyOn(ctrl, 'getEntity').and.returnValue({
                                id: entity1Id
                            });
                            certificationEntityService.getRoleSnapshot.and.returnValue($q.when(roleSnapshot));
                        });

                        it('should return false if the roleSnapshot has not been fetched', function () {
                            expect(ctrl.hasLoadedRoleSnapshot()).toBeFalsy();
                        });

                        it('should return true if the roleSnapshot has been fetched', function () {
                            ctrl.hasLoadedRoleSnapshot();
                            $rootScope.$apply();
                            expect(ctrl.hasLoadedRoleSnapshot()).toBeTruthy();
                            expect(ctrl.roleSnapshot).toBe(roleSnapshot);
                        });

                        it('should call through to certificationEntityService to fetch snapshot', function () {
                            ctrl.hasLoadedRoleSnapshot();
                            expect(certificationEntityService.getRoleSnapshot).toHaveBeenCalledWith(certId, entity1Id);
                        });

                        it('should clear roleSnapshot when fetching for new entity', function () {
                            ctrl.hasLoadedRoleSnapshot();
                            $rootScope.$apply();
                            expect(ctrl.roleSnapshot).toBeTruthy();
                            // Reset spy to return different value
                            ctrl.getEntity.and.returnValue({
                                id: entity2Id
                            });
                            ctrl.hasLoadedRoleSnapshot();
                            expect(ctrl.roleSnapshot).toBeFalsy();
                        });

                        it('should call certificationEntityService to fetch different entity details', function () {
                            ctrl.hasLoadedRoleSnapshot();
                            $rootScope.$apply();
                            expect(certificationEntityService.getRoleSnapshot).toHaveBeenCalledWith(certId, entity1Id);
                            // Reset spy calls and return different entity
                            certificationEntityService.getRoleSnapshot.calls.reset();
                            ctrl.getEntity.and.returnValue({
                                id: entity2Id
                            });
                            ctrl.hasLoadedRoleSnapshot();
                            expect(certificationEntityService.getRoleSnapshot).toHaveBeenCalledWith(certId, entity2Id);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLHVCQUF1QixVQUFVLFNBQVM7SUFDdkg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxxQkFBcUIsWUFBVzs7Z0JBRXJDLElBQUksZUFBWTtvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsdUJBQW9CO29CQUFFLE9BQUk7b0JBQUUsMEJBQXVCO29CQUMxRiwyQkFBd0I7b0JBQUUsb0JBQWlCO29CQUFFLFVBQU87b0JBQUUsS0FBRTtvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQzdFLHdCQUFxQjtvQkFBRSxnQkFBYTtvQkFBRSw2QkFBMEI7b0JBQUUsc0JBQW1CO29CQUFFLGtCQUFlO29CQUN0Ryw2QkFBMEI7b0JBQUUsZ0JBQWE7b0JBQUUsYUFBVTtvQkFBRSxlQUFZO29CQUFFLFNBQU07b0JBQUUsMEJBQXVCOztnQkFFeEcsU0FBUyxhQUFhLE1BQU0sUUFBUSxPQUFPO29CQUN2QyxLQUFLLElBQUksUUFBUSxLQUFLLGdCQUFnQixRQUFRO3dCQUMxQyxJQUFJLEtBQUssZ0JBQWdCLE9BQU8sZUFBZSxPQUFPOzRCQUNsRCxLQUFLLGdCQUFnQixPQUFPLE1BQU0sVUFBVTs7Ozs7Z0JBS3hELFdBQVcsT0FBTyxxQkFBcUI7OztnQkFHdkMsV0FBVyxPQUFPLFVBQVMsZUFBZSx3QkFBd0IseUJBQXlCLE1BQ2hFLGlCQUFpQixjQUFjLFdBQVcscUJBQXFCLGVBQy9ELDRCQUE0Qiw4QkFDNUIsOEJBQThCLHVCQUF1QixtQkFBbUIsVUFDeEUsMkJBQTJC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ekMsR0FBRywyREFBMkQsWUFBTTs0QkFDaEUsS0FBSzs0QkFDTCxXQUFXOzRCQUNYLE9BQU8sS0FBSyx5QkFBeUI7NEJBQ3JDLE9BQU8sS0FBSyxjQUFjLEtBQUs7Ozt3QkFHbkMsR0FBRyx1RUFBdUUsWUFBTTs0QkFDNUUsS0FBSzs0QkFDTCxPQUFPLDJCQUEyQixpQkFBaUIscUJBQXFCLFFBQVE7Ozt3QkFHcEYsR0FBRywwREFBMEQsWUFBTTs0QkFDL0QsS0FBSzs0QkFDTCxXQUFXOzRCQUNYLE9BQU8sS0FBSyxjQUFjOzs0QkFFMUIsS0FBSyxVQUFVLElBQUksWUFBWTtnQ0FDM0IsSUFBSTs7NEJBRVIsS0FBSzs0QkFDTCxPQUFPLEtBQUssY0FBYzs7O3dCQUc5QixHQUFHLDRFQUE0RSxZQUFNOzRCQUNqRixLQUFLOzRCQUNMLFdBQVc7NEJBQ1gsT0FBTywyQkFBMkIsaUJBQWlCLHFCQUFxQixRQUFROzs0QkFFaEYsMkJBQTJCLGdCQUFnQixNQUFNOzRCQUNqRCxLQUFLLFVBQVUsSUFBSSxZQUFZO2dDQUMzQixJQUFJOzs0QkFFUixLQUFLOzRCQUNMLE9BQU8sMkJBQTJCLGlCQUFpQixxQkFBcUIsUUFBUTs7Ozs7OztHQW9CN0YiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgJHN0YXRlUGFyYW1zLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgY2VydGlmaWNhdGlvblNlcnZpY2UsIGNlcnQsIGNlcnRMb2FkaW5nRXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgbmF2aWdhdGlvblNlcnZpY2UsIHNwTW9kYWwsICRxLCB0ZXN0U2VydmljZSwgY29uZmlnLFxyXG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSwgQ2VydGlmaWNhdGlvbiwgZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2UsIENlcnRpZmljYXRpb25Db25maWcsIE9iamVjdFJlc3VsdERUTyxcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgY2VydE9ialJlc3VsdCwgZmlsdGVyRGF0YSwgZmlsdGVyc0FycmF5LCBGaWx0ZXIsIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldEFsbENvdW50cyhjZXJ0LCBzdGF0dXMsIHZhbHVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgdHlwZSBpbiBjZXJ0Lml0ZW1TdGF0dXNDb3VudC5jb3VudHMpIHtcclxuICAgICAgICAgICAgaWYgKGNlcnQuaXRlbVN0YXR1c0NvdW50LmNvdW50cy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgY2VydC5pdGVtU3RhdHVzQ291bnQuY291bnRzW3R5cGVdW3N0YXR1c10gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTcgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF9jZXJ0aWZpY2F0aW9uU2VydmljZV8sIF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfLCBfJHFfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NlcnRpZmljYXRpb25fLCBfJHJvb3RTY29wZV8sIF9zcE1vZGFsXywgX25hdmlnYXRpb25TZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfLCBfZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXywgX0NlcnRpZmljYXRpb25Db25maWdfLCBfT2JqZWN0UmVzdWx0RFRPXywgX0ZpbHRlcl8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfKSB7XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXztcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXztcclxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XHJcbiAgICAgICAgZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2UgPSBfZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2VfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb25Db25maWcgPSBfQ2VydGlmaWNhdGlvbkNvbmZpZ187XHJcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcclxuICAgICAgICAkcSA9IF8kcV87XHJcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XHJcbiAgICAgICAgY2VydGlmaWNhdGlvblRlc3REYXRhID0gX2NlcnRpZmljYXRpb25UZXN0RGF0YV87XHJcbiAgICAgICAgT2JqZWN0UmVzdWx0RFRPID0gX09iamVjdFJlc3VsdERUT187XHJcbiAgICAgICAgRmlsdGVyID0gX0ZpbHRlcl87XHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc29tZSBtb2NrIGRhdGFcclxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XHJcbiAgICAgICAgY2VydE9ialJlc3VsdCA9IG5ldyBPYmplY3RSZXN1bHREVE8oe1xyXG4gICAgICAgICAgICBvYmplY3Q6IGNlcnQsXHJcbiAgICAgICAgICAgIHdhcm5pbmdzOiBbJ2NlcnRfbG9ja2VkX3dhcm4nXX0pO1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbklkOiBjZXJ0LmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIHNvbWU6ICdjb25maWdWYWx1ZSdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZpbHRlckRhdGEgPSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5OiAnbWFuYWdlcicsXHJcbiAgICAgICAgICAgIG11bHRpVmFsdWVkOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFiZWw6ICdNYW5hZ2VyJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdTb21lVHlwZScsXHJcbiAgICAgICAgICAgIGFsbG93ZWRWYWx1ZXM6IG51bGwsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBmaWx0ZXJzQXJyYXkgPSBbbmV3IEZpbHRlcihmaWx0ZXJEYXRhKV07XHJcblxyXG4gICAgICAgIC8vIE1vY2sgdGhlIGNlcnRpZmljYXRpb25TZXJ2aWNlIGNhbGxzLlxyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoISFjZXJ0TG9hZGluZ0Vycm9yTWVzc2FnZSwgY2VydE9ialJlc3VsdCwge1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNlcnRMb2FkaW5nRXJyb3JNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBjb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0RmlsdGVycycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBmaWx0ZXJzQXJyYXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbkl0ZW1zJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbih7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFtdLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBjZXJ0TG9hZGluZ0Vycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xyXG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignQ2VydGlmaWNhdGlvbkN0cmwnLCB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlOiBjZXJ0aWZpY2F0aW9uU2VydmljZSxcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlOiBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgICAgICRzdGF0ZVBhcmFtczogJHN0YXRlUGFyYW1zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBjZXJ0aWZpY2F0aW9uIElEIGlzIG1pc3NpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVsZXRlICRzdGF0ZVBhcmFtcy5jZXJ0aWZpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgY3JlYXRlQ29udHJvbGxlcigpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdsb2FkcyB0aGUgY2VydGlmaWNhdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnaW5pdGlhbGl6ZScpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pZCkudG9FcXVhbChjZXJ0LmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQuaWQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDZXJ0aWZpY2F0aW9uKCkpLnRvRXF1YWwoY2VydCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydCwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBsb2FkIHRoZSBjZXJ0aWZpY2F0aW9uIGlmIGl0cyBhbHJlYWR5IGxvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBkaWFsb2cgYW5kIG5hdmlnYXRlcyBiYWNrIGlmIGNlcnQgbG9hZGluZyBmYWlscycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgc3BNb2RhbEFyZ3M7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnYmFjaycpO1xyXG4gICAgICAgICAgICBjZXJ0TG9hZGluZ0Vycm9yTWVzc2FnZSA9ICdFUlJPUiEhJztcclxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIHNwTW9kYWxBcmdzID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbEFyZ3MubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbEFyZ3NbMF0uY29udGVudCkudG9FcXVhbChjZXJ0TG9hZGluZ0Vycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5iYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdsb2FkcyB0aGUgY29uZmlndXJhdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2luaXRpYWxpemVDb25maWd1cmF0aW9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDb25maWd1cmF0aW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0LmlkKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoY29uZmlnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2xvYWRzIHRoZSBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdzZXREYXRhVGFibGVGaWx0ZXJzJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldEZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQuaWQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNldERhdGFUYWJsZUZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlcnNQcm9taXNlID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNldERhdGFUYWJsZUZpbHRlcnMuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0sXHJcbiAgICAgICAgICAgICAgICBmb3VuZEZpbHRlcnM7XHJcbiAgICAgICAgICAgIGZpbHRlcnNQcm9taXNlLnRoZW4oKGZpbHRlcnMpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvdW5kRmlsdGVycyA9IGZpbHRlcnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoZm91bmRGaWx0ZXJzKS50b0VxdWFsKGZpbHRlcnNBcnJheSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSB0ZW1wbGF0ZUZ1bmMgaWYgZmlsdGVyIGlzIGFkZGl0aW9uYWxFbnRpdGxlbWVudCcsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnc2V0RGF0YVRhYmxlRmlsdGVycycpO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlRmlsdGVyLCBmaWx0ZXJzUHJvbWlzZTtcclxuICAgICAgICAgICAgZmlsdGVyc0FycmF5LnB1c2gobmV3IEZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ2FwcCcsXHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbEVudGl0bGVtZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnYXBwJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJzUHJvbWlzZSA9IGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZXREYXRhVGFibGVGaWx0ZXJzLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBmaWx0ZXJzUHJvbWlzZS50aGVuKChmaWx0ZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUZpbHRlciA9IGZpbHRlcnNbMV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGVGaWx0ZXIudGVtcGxhdGVGdW5jKS50b0VxdWFsKGN0cmwuZ2V0QWRkaXRpb25hbEVudGl0bGVtZW50RmlsdGVyVGVtcGxhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbG9hZHMgdGhlIGNlcnRpZmljYXRpb24gZm9yIGRldGFpbGVkIHZpZXcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbklkOiBjZXJ0LmlkLFxyXG4gICAgICAgICAgICAgICAgZW50aXR5SWQ6ICcxMjM0J1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ29Ub0RldGFpbFZpZXcnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW50aXR5SWQpLnRvRXF1YWwoJHN0YXRlUGFyYW1zLmVudGl0eUlkKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJHN0YXRlUGFyYW1zLmVudGl0eUlkKTtcclxuICAgICAgICAgICAgZGVsZXRlICRzdGF0ZVBhcmFtcy5lbnRpdHlJZDtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc01vYmlsZUVudGl0eUxpc3RWaWV3KCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbiBlbnRpdHkgaXMgbm90IHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNlcnRpZmljYXRpb24gPSBjZXJ0O1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc01vYmlsZUVudGl0eUxpc3RWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGFuIGVudGl0eSBpcyBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jZXJ0aWZpY2F0aW9uID0gY2VydDtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5ID0ge307XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTW9iaWxlRW50aXR5TGlzdFZpZXcoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZ290b01vYmlsZUVudGl0eUxpc3RWaWV3KCkgY2xlYXJzIHRoZSBzZWxlY3RlZCBlbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5ID0ge307XHJcbiAgICAgICAgY3RybC5nb3RvTW9iaWxlRW50aXR5TGlzdFZpZXcoKTtcclxuICAgICAgICBleHBlY3QoY3RybC5nZXRFbnRpdHkoKSkudG9FcXVhbChudWxsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlbnRpdHkgcGFnaW5nJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjdHJsO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3dpdGggbm8gZW50aXR5IHBhZ2VyIGNvbmZpZ3VyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdoYXNOZXh0RW50aXR5KCkgcmV0dXJucyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc05leHRFbnRpdHkoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2hhc1ByZXZpb3VzRW50aXR5KCkgcmV0dXJucyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1ByZXZpb3VzRW50aXR5KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdnb3RvTmV4dEVudGl0eSgpIGh1cmxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KCgpID0+IGN0cmwuZ290b05leHRFbnRpdHkoKSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdnb3RvUHJldmlvdXNFbnRpdHkoKSBibG93cyBjaHVua3MnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoKCkgPT4gY3RybC5nb3RvUHJldmlvdXNFbnRpdHkoKSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3dpdGggYW4gZW50aXR5IHBhZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNJZCA9ICdwcmV2aW91c0R1ZGUnLFxyXG4gICAgICAgICAgICAgICAgbmV4dElkID0gJ25leHRGZWxsYScsXHJcbiAgICAgICAgICAgICAgICBwYWdlcjtcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFnZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzTmV4dDogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzUHJldmlvdXM6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKG5leHRJZCksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXM6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHByZXZpb3VzSWQpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5lbnRpdHlMaXN0UGFnZXIgPSBwYWdlcjtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dvVG9EZXRhaWxWaWV3Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2hhc05leHRFbnRpdHkoKSBkZWxlZ2F0ZXMgdG8gdGhlIHBhZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzTmV4dEVudGl0eSgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBhZ2VyLmhhc05leHQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaGFzUHJldmlvdXNFbnRpdHkoKSBkZWxlZ2F0ZXMgdG8gdGhlIHBhZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUHJldmlvdXNFbnRpdHkoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwYWdlci5oYXNQcmV2aW91cykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdnb3RvTmV4dEVudGl0eSgpIGRlbGVnYXRlcyB0byB0aGUgcGFnZXIgYW5kIG5hdmlnYXRlcyB0byB0aGUgZGV0YWlsIHZpZXcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmdvdG9OZXh0RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocGFnZXIubmV4dCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldykudG9IYXZlQmVlbkNhbGxlZFdpdGgobmV4dElkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZ290b1ByZXZpb3VzRW50aXR5KCkgZGVsZWdhdGVzIHRvIHRoZSBwYWdlciBhbmQgbmF2aWdhdGVzIHRvIHRoZSBkZXRhaWwgdmlldycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ290b1ByZXZpb3VzRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocGFnZXIucHJldmlvdXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ29Ub0RldGFpbFZpZXcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHByZXZpb3VzSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdnZXRJdGVtcygpIGNhbGxzIHNlcnZpY2Ugd2l0aCBjb3JyZWN0IHZhbHVlcyBmcm9tIHRhYmxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXHJcbiAgICAgICAgICAgIGNmZ0tleSA9ICd3aHU/IScsXHJcbiAgICAgICAgICAgIGdyb3VwQnkgPSAneWEnLFxyXG4gICAgICAgICAgICBmaWx0ZXJWYWxzID0gWyB7IHNvbWU6ICdmaWx0ZXInfSBdLFxyXG4gICAgICAgICAgICB0YWJsZSA9IHtcclxuICAgICAgICAgICAgICAgIGdldERhdGFUYWJsZUNvbmZpZzogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENvbHVtbkNvbmZpZ0tleTogKCkgPT4gY2ZnS2V5XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJsZVNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnV2hhdGV2ZXInXSxcclxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbJ2htbW1tbSddLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVkVHlwZXM6IFsnZ2lnZ2l0eSddLFxyXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2VudGl0eTEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uSXRlbXMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgY3RybC5nZXRJdGVtcyh0YWJsZSwgMCwgMTAsIGZpbHRlclZhbHMsIG51bGwsIGdyb3VwQnkpO1xyXG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxyXG4gICAgICAgICAgICBjZXJ0LmlkLCB0YWJsZS50YWJsZVNjb3BlLCAwLCAxMCwgbnVsbCwgZ3JvdXBCeSxcclxuICAgICAgICAgICAgY2ZnS2V5LCBmaWx0ZXJWYWxzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdnZXRFbnRpdGllcygpIGNhbGxzIHNlcnZpY2Ugd2l0aCBjb3JyZWN0IHZhbHVlcyBmcm9tIHRhYmxlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXHJcbiAgICAgICAgICAgIGNmZ0tleSA9ICd3aHU/IScsXHJcbiAgICAgICAgICAgIHRhYmxlID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YVRhYmxlQ29uZmlnOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q29sdW1uQ29uZmlnS2V5OiAoKSA9PiBjZmdLZXlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgY3RybC5nZXRFbnRpdGllcyh0YWJsZSwgMCwgMTAsIG51bGwpO1xyXG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxyXG4gICAgICAgICAgICBjZXJ0LmlkLCAwLCAxMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgY2ZnS2V5KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpcyBkZWxlZ2F0ZWQgdG8gdmlldyBzdGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjdHJsO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0LCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0Q3VycmVudFRhYigpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKSwgJ2dldEN1cnJlbnRUYWInKTtcclxuICAgICAgICAgICAgY3RybC5nZXRDdXJyZW50VGFiKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCkuZ2V0Q3VycmVudFRhYikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0Q3VycmVudFRhYkNvbmZpZygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKSwgJ2dldEN1cnJlbnRUYWJDb25maWcnKTtcclxuICAgICAgICAgICAgY3RybC5nZXRDdXJyZW50VGFiQ29uZmlnKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCkuZ2V0Q3VycmVudFRhYkNvbmZpZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0VGFiQ291bnQoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdGFiID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RhYmx5IG5hbWVseSdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLCAnZ2V0VGFiQ291bnQnKTtcclxuICAgICAgICAgICAgY3RybC5nZXRUYWJDb3VudCh0YWIpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLmdldFRhYkNvdW50KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0YWIubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjaGFuZ2VUYWIoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdGFiID0gJ1NvbWVUYWInO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCksICdjaGFuZ2VUYWInKTtcclxuICAgICAgICAgICAgY3RybC5jaGFuZ2VUYWIodGFiKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKS5jaGFuZ2VUYWIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRhYik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpc1RhYmxlRGlzcGxheWVkKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHRhYmxlID0ge307XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKSwgJ2lzVGFibGVEaXNwbGF5ZWQnKTtcclxuICAgICAgICAgICAgY3RybC5pc1RhYmxlRGlzcGxheWVkKHRhYmxlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKS5pc1RhYmxlRGlzcGxheWVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0YWJsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXMgZGVsZWdhdGVkIHRvIGRhdGEgc2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjdHJsO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZ2V0RGVjaXNpb25Db3VudCgpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXREZWNpc2lvbkNvdW50JykuYW5kLnJldHVyblZhbHVlKDQzKTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gY3RybC5nZXREZWNpc2lvbkNvdW50KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uQ291bnQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvdW50KS50b0VxdWFsKDQzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93RXhwaXJhdGlvbkRhdGUoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhIGNvbnRyb2xsZXIgd2l0aCB0aGUgZ2l2ZW4gZGF0ZSAtIHRoZSBjZXJ0IHdpbGwgYWxzbyBiZSBsb2FkZWQgYWxyZWFkeS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDdHJsV2l0aEV4cGlyYXRpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgY3RybDtcclxuICAgICAgICAgICAgY2VydC5leHBpcmF0aW9uID0gZGF0ZTtcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRlKGRheXNGcm9tTm93KSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBuZXdUaW1lID0gc3RhcnQuZ2V0VGltZSgpICsgKGRheXNGcm9tTm93ICogKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG5ld1RpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIGNlcnRpZmljYXRpb24gaGFzIG5vIGV4cGlyYXRpb24gZGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUN0cmxXaXRoRXhwaXJhdGlvbihudWxsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0V4cGlyYXRpb25EYXRlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgZXhwaXJhdGlvbiBpcyBtb3JlIHRoYW4gdHdvIHdlZWtzIGF3YXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsV2l0aEV4cGlyYXRpb24oZ2V0RGF0ZSgxNikpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RXhwaXJhdGlvbkRhdGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyBmYWxzZSBpZiBjZXJ0IGlzIHNpZ25lZCBvZmYnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ3RybFdpdGhFeHBpcmF0aW9uKGdldERhdGUoLTIpKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzU2lnbmVkT2ZmJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RXhwaXJhdGlvbkRhdGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIGV4cGlyYXRpb24gZGF0ZSBpcyBsZXNzIHRoYW4gdHdvIHdlZWtzIGF3YXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDdHJsV2l0aEV4cGlyYXRpb24oZ2V0RGF0ZSgxMykpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RXhwaXJhdGlvbkRhdGUoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgY2VydGlmaWNhdGlvbiBpcyBvdmVyZHVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ3RybFdpdGhFeHBpcmF0aW9uKGdldERhdGUoLTIpKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0V4cGlyYXRpb25EYXRlKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2xlYXIgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiB0aGVyZSBhcmUgbm8gZGVjaXNpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NsZWFyQnV0dG9uRW5hYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGVuYWJsZWQgaWYgdGhlcmUgYXJlIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSg0Myk7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NsZWFyQnV0dG9uRW5hYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NsZWFyRGVjaXNpb25zKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gY2xlYXIgZGVjaXNpb25zIG9uIGRlY2lzaW9uIHN0b3JlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnY2xlYXJEZWNpc2lvbnMnKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGN0cmwuY2xlYXJEZWNpc2lvbnMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuY2xlYXJEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzYXZlIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiB0aGVyZSBhcmUgbm8gZGVjaXNpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NhdmVCdXR0b25FbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZW5hYmxlZCBpZiB0aGVyZSBhcmUgZGVjaXNpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXREZWNpc2lvbkNvdW50JykuYW5kLnJldHVyblZhbHVlKDQzKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2F2ZUJ1dHRvbkVuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGZha2VDZXJ0LCBmYWtlRGVjaXNpb25zLCBzYXZlUmV0dXJuVmFsLCBkZWZlcnJlZCwgZmFpbGVkUmVzcG9uc2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZha2VDZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XHJcbiAgICAgICAgICAgIGZha2VEZWNpc2lvbnMgPSBbICdoaSBtb20hJyBdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzcHlPbkdldERlY2lzaW9ucygpIHtcclxuICAgICAgICAgICAgLy8gTG9hZGluZyB0aGUgY2VydCByZXNldHMgdGhlIGRlY2lzaW9ucyBvYmplY3Qgd2l0aCBhIG5ldyBvYmplY3QsIHNvIHdlIGhhdmUgdG8gc3B5IGFmdGVyIGNyZWF0aW9uLlxyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25zJykuYW5kLnJldHVyblZhbHVlKGZha2VEZWNpc2lvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0dXAoZ3JlYXRTdWNjZXNzLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0geyBzdGF0dXM6IHN0YXR1cyB9O1xyXG4gICAgICAgICAgICBzYXZlUmV0dXJuVmFsID0gKGdyZWF0U3VjY2VzcykgPyAkcS53aGVuKHsgZGF0YTogeyBvYmplY3Q6IGZha2VDZXJ0IH0gfSkgOiAkcS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ3NhdmVEZWNpc2lvbnMnKS5hbmQucmV0dXJuVmFsdWUoc2F2ZVJldHVyblZhbCk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2luaXRpYWxpemUnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAncmVmcmVzaFZpZXcnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwRm9yU2F2ZVJldHJ5RGlhbG9nKCkge1xyXG4gICAgICAgICAgICBmYWlsZWRSZXNwb25zZSA9IHsgc3RhdHVzOiA0MDkgfTtcclxuICAgICAgICAgICAgc2F2ZVJldHVyblZhbCA9ICRxLnJlamVjdChmYWlsZWRSZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogZGVmZXJyZWQucHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2F2ZURlY2lzaW9ucycpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2F2ZVJldHVyblZhbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhlIGNlcnRpZmljYXRpb24gc2VydmljZSB3aXRoIHRoZSBkZWNpc2lvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0dXAodHJ1ZSwgMjAwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBzcHlPbkdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZS5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0LmlkLCBmYWtlRGVjaXNpb25zKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q2VydGlmaWNhdGlvbigpKS50b0VxdWFsKGZha2VDZXJ0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlaW5pdGlhbGl6ZWQgdGhlIGRhdGEgc2VydmljZSBhZnRlciBhIHN1Y2Nlc3NmdWwgc2F2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cCh0cnVlLCAyMDApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHNweU9uR2V0RGVjaXNpb25zKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGN0cmwuc2F2ZSgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmYWtlQ2VydCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZnJlc2hWaWV3KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2dvZXMgdG8gcHJldmlvdXMgcGFnZSBpZiBsYXN0IGRlY2lzaW9uIG9uIGxhc3QgcGFnZSBpcyBmaW5pc2hlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBzYXZlIGNhbGwgcmV0dXJuIGEgY2VydCB0aGF0IGhhcyBvbmx5IDMwIFwiZGVjaXNpb25zIGxlZnRcIiBpdGVtcy4gIFRvdGFsID0gMzMuXHJcbiAgICAgICAgICAgIHNldEFsbENvdW50cyhmYWtlQ2VydCwgJ09wZW4nLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnRGVsZWdhdGVkJywgMCk7XHJcbiAgICAgICAgICAgIHNldEFsbENvdW50cyhmYWtlQ2VydCwgJ1JldHVybmVkJywgMCk7XHJcbiAgICAgICAgICAgIHNldEFsbENvdW50cyhmYWtlQ2VydCwgJ0NvbXBsZXRlJywgMCk7XHJcbiAgICAgICAgICAgIHNldEFsbENvdW50cyhmYWtlQ2VydCwgJ0NoYWxsZW5nZWQnLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnV2FpdGluZ1JldmlldycsIDApO1xyXG4gICAgICAgICAgICBmYWtlQ2VydC5pdGVtU3RhdHVzQ291bnQuY291bnRzLkJ1bmRsZS5PcGVuID0gMzA7XHJcbiAgICAgICAgICAgIGZha2VDZXJ0Lml0ZW1TdGF0dXNDb3VudC5jb3VudHMuQnVuZGxlLkNvbXBsZXRlID0gMztcclxuXHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGZha2VDZXJ0KTtcclxuXHJcbiAgICAgICAgICAgIHNldHVwKHRydWUsIDIwMCk7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbkdldERlY2lzaW9ucygpO1xyXG5cclxuICAgICAgICAgICAgLy8gR28gdG8gdGhlIGxhc3QgcGFnZS5cclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudFRhYkNvbmZpZygpLnRhYmxlcy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IGN0cmwuZ2V0Q3VycmVudFRhYkNvbmZpZygpLnRhYmxlc1swXTtcclxuICAgICAgICAgICAgdGFibGUuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuZ2V0UGFnZVN0YXRlKCkucGFnaW5nRGF0YS5jdXJyZW50UGFnZSA9IDQ7XHJcblxyXG4gICAgICAgICAgICAvLyBTYXZlLlxyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHdlJ3JlIG5vdyBvbiB0aGUgdGhpcmQgcGFnZS5cclxuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2VTdGF0ZSgpLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZWZyZXNoZXMgdGhlIGxpc3QgYWZ0ZXIgYSBzdWNjZXNzZnVsIHNhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0dXAodHJ1ZSwgMjAwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0LCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc3B5T25HZXREZWNpc2lvbnMoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLCAncmVmcmVzaEN1cnJlbnRUYWInKTtcclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLnJlZnJlc2hDdXJyZW50VGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCByZWluaXRpYWxpemUgd2l0aCBjZXJ0IGFuZCBjbGVhciBkZWNpc2lvbnMgaWYgc2F2aW5nIGZhaWxzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBzZXR1cChmYWxzZSwgNDA0KTtcclxuICAgICAgICAgICAgc3B5T25HZXREZWNpc2lvbnMoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCByZWZyZXNoIHRoZSBsaXN0IGlmIHNhdmluZyBmYWlscycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cChmYWxzZSwgNDA0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0LCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgc3B5T25HZXREZWNpc2lvbnMoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLCAncmVmcmVzaEN1cnJlbnRUYWInKTtcclxuICAgICAgICAgICAgY3RybC5zYXZlKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpLnJlZnJlc2hDdXJyZW50VGFiKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgcmV0cnkgZGlhbG9nIGlmIHNhdmluZyBmYWlscyB3aXRoIDQwOSBzdGF0dXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0dXBGb3JTYXZlUmV0cnlEaWFsb2coKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbkdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgLy9yZXRyeSBkaWFsb2cgZm9yIGxvY2tlZCBjZXJ0XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAvL2xvY2tlZCBjZXJ0IC0gZG9uJ3Qgc2F2ZVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdmaXJzdCBvcGVucyByZXRyeSBkaWFsb2cgZm9yIDQwOSBzdGF0dXMgYW5kIHRoZW4gcmVzb2x2ZXMgc3VjY2Vzc2Z1bGx5IHdoZW4gY2VydCB1bmxvY2tlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXR1cEZvclNhdmVSZXRyeURpYWxvZygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzUmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBvYmplY3Q6IGZha2VDZXJ0IH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzcHlPbkdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBjdHJsLnNhdmUoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy9yZXRyeSBkaWFsb2cgb3BlbmVkIGZvciBsb2NrZWQgY2VydFxyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIC8vc2F2aW5nIGEgbG9ja2VkIGNlcnRcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgkcS53aGVuKGZhaWxlZFJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIC8vcmV0cnkgZGlhbG9nIG9wZW5lZCBmb3IgbG9ja2VkIGNlcnRcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHNwTW9kYWwub3Blbi5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAvL3NhdmluZyBhbiB1bmxvY2tlZCBjZXJ0XHJcbiAgICAgICAgICAgIHNhdmVSZXR1cm5WYWwgPSAkcS53aGVuKHN1Y2Nlc3NSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoJHEud2hlbihzdWNjZXNzUmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3Blbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2lnbicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBsZXQgZGVmZXJyZWQsIHNhdmVSZXR1cm5WYWwsIGZhaWxlZFJlc3BvbnNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzcHlPbihlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZSwgJ29wZW5EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6ICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3h5enp5J1xyXG4gICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzcHlPbihuYXZpZ2F0aW9uU2VydmljZSwgJ2JhY2snKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0dXBGb3JTaWduT2ZmUmV0cnlEaWFsb2coKSB7XHJcbiAgICAgICAgICAgIGZhaWxlZFJlc3BvbnNlID0geyBzdGF0dXM6IDQwOSB9O1xyXG5cclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKHtcclxuICAgICAgICAgICAgICAgICAgICBzb21lQ29uZmlnOiAndGVzdCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBkZWZlcnJlZC5wcm9taXNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzaWduT2ZmJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzYXZlUmV0dXJuVmFsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdvcGVucyB0aGUgZXNpZyBkaWFsb2cgd2hlbiBlc2lnIGlzIGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9ICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkID0gJ3h5enp5JztcclxuXHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENvbmZpZ3VyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25Db25maWcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc2lnTWVhbmluZzogJ0VzaWcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzaWduT2ZmJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3RybC5zaWduKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZS5vcGVuRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0LmlkLCB1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NpZ25lZE9mZigpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdvcGVucyB0aGUgY29tcGxldGlvbiBkaWFsb2cgZm9yIHNpZ25PZmYgd2hlbiBlc2lnIGlzIG5vdCBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29tZUNvbmZpZzogJ3Rlc3QnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzaWduT2ZmJykuYW5kLnJldHVyblZhbHVlKFxyXG4gICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY3RybC5zaWduKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZWN0cm9uaWNTaWduYXR1cmVTZXJ2aWNlLm9wZW5EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0LmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTaWduZWRPZmYoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgbmF2aWdhdGlvbiBzZXJ2aWNlIGFmdGVyIHNpZ25PZmYnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENvbmZpZ3VyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25Db25maWcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc2lnTWVhbmluZzogJ0VzaWcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdzaWduT2ZmJyk7XHJcbiAgICAgICAgICAgIGN0cmwuc2lnbigpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuYmFjaykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgZGlhbG9nIGlmIHRoZXJlIGlzIGEgc2lnbm9mZiBibG9ja2VkIHJlYXNvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCwgcmVhc29uID0gJ2RvbnQgc2lnbiB0aGlzIGR1bW15JztcclxuICAgICAgICAgICAgY2VydC5zaWdub2ZmQmxvY2tlZFJlYXNvbiA9IHJlYXNvbjtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQ29uZmlnKHtcclxuICAgICAgICAgICAgICAgICAgICBzb21lQ29uZmlnOiAndGVzdCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnc2lnbk9mZicpO1xyXG4gICAgICAgICAgICBjdHJsLnNpZ24oKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnJlc29sdmUucmVhc29uKCkpLnRvRXF1YWwocmVhc29uKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZWN0cm9uaWNTaWduYXR1cmVTZXJ2aWNlLm9wZW5EaWFsb2cpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgcmV0cnkgZGlhbG9nIGlmIHNpZ25PZmYgZmFpbHMgd2l0aCA0MDkgc3RhdHVzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgc2V0dXBGb3JTaWduT2ZmUmV0cnlEaWFsb2coKTtcclxuICAgICAgICAgICAgY3RybC5zaWduKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vY29tcGxldGlvbiBkaWFsb2dcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNwTW9kYWwub3Blbi5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBzYXZlUmV0dXJuVmFsID0gJHEucmVqZWN0KGZhaWxlZFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnNpZ25PZmYpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2Uuc2lnbk9mZi5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAvL3JldHJ5IGRpYWxvZ1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2Uuc2lnbk9mZikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2ZpcnN0IG9wZW5zIHJldHJ5IGRpYWxvZyBmb3IgNDA5IHN0YXR1cyBhbmQgdGhlbiBzaWduT2ZmIHN1Y2Nlc3NmdWxseSB3aGVuIGNlcnQgdW5sb2NrZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0dXBGb3JTaWduT2ZmUmV0cnlEaWFsb2coKTtcclxuICAgICAgICAgICAgbGV0IHN1Y2Nlc3NSZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IG9iamVjdDogbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSkgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNpZ24oKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgLy9jb21wbGV0aW9uIGRpYWxvZ1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgc3BNb2RhbC5vcGVuLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHNhdmVSZXR1cm5WYWwgPSAkcS5yZWplY3QoZmFpbGVkUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAvL3JldHJ5IGRpYWxvZyBmb3IgbG9ja2VkIGNlcnRcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCRxLndoZW4oZmFpbGVkUmVzcG9uc2UpKTtcclxuICAgICAgICAgICAgc3BNb2RhbC5vcGVuLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIC8vY29tcGxldGlvbiBkaWFsb2dcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIHNwTW9kYWwub3Blbi5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIC8vc2F2aW5nIGFuIHVubG9ja2VkIGNlcnRcclxuICAgICAgICAgICAgLy9yZXRyeSBkaWFsb2dcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBzYXZlUmV0dXJuVmFsID0gJHEud2hlbihzdWNjZXNzUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCRxLndoZW4oc3VjY2Vzc1Jlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNDb21wbGV0ZScsICgpID0+IHtcclxuICAgICAgICBsZXQgZmFrZUNlcnQ7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZha2VDZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBmYWxzZSBpZiBjb21wbGV0ZWQgaXRlbXMgZG8gbm90IGVxdWFsIHRvdGFsIGl0ZW1zJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnT3BlbicsIDApO1xyXG4gICAgICAgICAgICBzZXRBbGxDb3VudHMoZmFrZUNlcnQsICdEZWxlZ2F0ZWQnLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnUmV0dXJuZWQnLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnQ29tcGxldGUnLCAzKTtcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoZmFrZUNlcnQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0NvbXBsZXRlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgdHJ1ZSBpZiBjb21wbGV0ZWQgaXRlbXMgZXF1YWwgdG90YWwgaXRlbXMsIHJlZ2FyZGxlc3Mgb2YgY29tcGxldGUgZmxhZycsICgpID0+IHtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnT3BlbicsIDApO1xyXG4gICAgICAgICAgICBzZXRBbGxDb3VudHMoZmFrZUNlcnQsICdEZWxlZ2F0ZWQnLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnUmV0dXJuZWQnLCAwKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnQ29tcGxldGUnLCAxKTtcclxuICAgICAgICAgICAgc2V0QWxsQ291bnRzKGZha2VDZXJ0LCAnV2FpdGluZ1JldmlldycsIDApO1xyXG4gICAgICAgICAgICBzZXRBbGxDb3VudHMoZmFrZUNlcnQsICdDaGFsbGVuZ2VkJywgMCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGZha2VDZXJ0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIElnbm9yZSB0aGlzIGZsYWcgZm9yIHRoZXNlIHB1cnBvc2VzLCBzaW5jZSBjYW4gYmUgZmFsc2UgZm9yIG90aGVyIHJlYXNvbnMuXHJcbiAgICAgICAgICAgIGNlcnQuY29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29tcGxldGUoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGZhbHNlIGlmIHRoZXJlIGFyZSBwZW5kaW5nIGRlY2lzaW9ucywgcmVnYXJkbGVzcyBvZiBpdGVtIGNvdW50JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgyKTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ29tcGxldGUoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNTaWduZWRPZmYnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2lzIGZhbHNlIGlmIGNlcnQgaXMgbm90IHNpZ25lZE9mZicsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydC5zaWduT2ZmQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2lnbmVkT2ZmKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgdHJ1ZSBpZiBjZXJ0IGlzIHNpZ25lZE9mZicsICgpID0+IHtcclxuICAgICAgICAgICAgY2VydC5zaWduT2ZmQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTaWduZWRPZmYoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93RGF0ZUZpZWxkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIGZhbHNlIGlmIHNob3dFeHBpcmF0aW9uRGF0ZSBhbmQgaXNTaWduZWRPZmYgYXJlIGJvdGggZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnc2hvd0V4cGlyYXRpb25EYXRlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzU2lnbmVkT2ZmJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RhdGVGaWVsZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgc2hvd0V4cGlyYXRpb25EYXRlIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnc2hvd0V4cGlyYXRpb25EYXRlJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNTaWduZWRPZmYnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RGF0ZUZpZWxkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ICgncmV0dXJucyB0cnVlIGlmIGlzU2lnbmVkT2ZmIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnc2hvd0V4cGlyYXRpb25EYXRlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzU2lnbmVkT2ZmJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RGF0ZUZpZWxkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0QnVsa0RlY2lzaW9ucygpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX0NlcnRpZmljYXRpb25WaWV3U3RhdGVfKSA9PiB7XHJcbiAgICAgICAgICAgIENlcnRpZmljYXRpb25WaWV3U3RhdGUgPSBfQ2VydGlmaWNhdGlvblZpZXdTdGF0ZV87XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBidWxrIGRlY2lzaW9ucyBmb3IgYSBjb21wbGV0ZSB0YWIgZnJvbSBjb25maWd1cmF0aW9uIGlmIGxvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbnMgPSBbJ2RlY2lzaW9uMScsICdkZWNpc2lvbjInLCAnUmVhc3NpZ24nLCAnQ2xlYXJlZCddLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRCdWxrRGVjaXNpb25zID0gWydSZWFzc2lnbicsICdDbGVhcmVkJ10sXHJcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIGJ1bGtEZWNpc2lvbnM6IGJ1bGtEZWNpc2lvbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRDdXJyZW50VGFiJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QnVsa0RlY2lzaW9ucygpKS50b0VxdWFsKGZpbHRlcmVkQnVsa0RlY2lzaW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZpbHRlcmVkIGJ1bGsgZGVjaXNpb25zIGZvciBEZWNpc2lvbnNMZWZ0IHRhYicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbnMgPSBbJ2RlY2lzaW9uMScsICdkZWNpc2lvbjInLCAnQ2xlYXJlZCddLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRCdWxrRGVjaXNpb25zID0gWydkZWNpc2lvbjEnLCAnZGVjaXNpb24yJ10sXHJcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgIGJ1bGtEZWNpc2lvbnM6IGJ1bGtEZWNpc2lvbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRDdXJyZW50VGFiJykuYW5kLnJldHVyblZhbHVlKCdEZWNpc2lvbnNMZWZ0Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEJ1bGtEZWNpc2lvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEJ1bGtEZWNpc2lvbnMoKSkudG9FcXVhbChmaWx0ZXJlZEJ1bGtEZWNpc2lvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmaWx0ZXJlZCBidWxrIGRlY2lzaW9ucyBmb3IgYWN0aW9uIHJlcXVpcmVkIHRhYicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbnMgPSBbJ2RlY2lzaW9uMScsICdkZWNpc2lvbjInLCAnUmVhc3NpZ24nLCAnQ2xlYXJlZCddLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRCdWxrRGVjaXNpb25zID0gWydSZWFzc2lnbiddLFxyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q29uZmlndXJhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICBidWxrRGVjaXNpb25zOiBidWxrRGVjaXNpb25zXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnZ2V0Q3VycmVudFRhYicpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5BY3Rpb25SZXF1aXJlZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEJ1bGtEZWNpc2lvbnMoKSkudG9FcXVhbChmaWx0ZXJlZEJ1bGtEZWNpc2lvbnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBudWxsIGlmIGNvbmZpZ3VyYXRpb24gaXMgbm90IGxvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENvbmZpZ3VyYXRpb24nKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QnVsa0RlY2lzaW9ucygpKS50b0VxdWFsKG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dvQmFjaygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgbmF2aWdhdGlvbiBzZXJ2aWNlIHRvIGdvIGJhY2sgdG8gcHJldmlvdXMgcGFnZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdiYWNrJyk7XHJcbiAgICAgICAgICAgIGN0cmwuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5iYWNrKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd01vYmlsZUVudGl0eURldGFpbHMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgnb3BlbnMgZGlhbG9nIHRvIHNob3cgZW50aXR5IGRldGFpbHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRpdHkgPSB7c29tZTogJ2VudGl0eSd9LFxyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2dldEVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZShlbnRpdHkpO1xyXG4gICAgICAgICAgICBjdHJsLnNob3dNb2JpbGVFbnRpdHlEZXRhaWxzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgbGV0IGFyZ3MgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdLnJlc29sdmUuZW50aXR5KCkpLnRvRXF1YWwoZW50aXR5KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdoYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlsJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjdHJsO1xyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgJ2dldEVudGl0bGVtZW50RGV0YWlscycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZm9yIG5vbi1EYXRhT3duZXIgY2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLklkZW50aXR5XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRFbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnd2hhdGV2cydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzTG9hZGVkTWFuYWdlZEF0dHJpYnV0ZURldGFpbHMoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCB0aHJvdWdoIHRvIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5oYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlscykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmb3IgRGF0YU93bmVyIGNlcnRpZmljYXRpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWFEZXRhaWxzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjZXJ0SWQgPSAnc29tZXRoaW5nJyxcclxuICAgICAgICAgICAgICAgIGVudGl0eTFJZCA9ICcxMjMnLFxyXG4gICAgICAgICAgICAgICAgZW50aXR5MklkID0gJzMyMScsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybDEgPSBgL3VpL3Jlc3QvY2VydGlmaWNhdGlvbnMvJHtjZXJ0SWR9L2VudGl0aWVzLyR7ZW50aXR5MUlkfS9tYW5hZ2VkQXR0cmlidXRlRGV0YWlsc2AsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybDIgPSBgL3VpL3Jlc3QvY2VydGlmaWNhdGlvbnMvJHtjZXJ0SWR9L2VudGl0aWVzLyR7ZW50aXR5MklkfS9tYW5hZ2VkQXR0cmlidXRlRGV0YWlsc2A7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBjZXJ0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnZ2V0RW50aXR5JykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZW50aXR5MUlkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlscy5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihtYURldGFpbHMpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgbWFuYWdlZEF0dHJpYnV0ZURldGFpbHMgaGFzIG5vdCBiZWVuIGZldGNoZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlscygpKS50b0JlRmFsc3koKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBtYW5hZ2VkQXR0cmlidXRlRGV0YWlscyBoYXMgYmVlbiBmZXRjaGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5oYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0xvYWRlZE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzKCkpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzKS50b0JlKG1hRGV0YWlscyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgdG8gZmV0Y2ggZGV0YWlscycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkTWFuYWdlZEF0dHJpYnV0ZURldGFpbHMoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGV4cGVjdGVkVXJsMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBtYW5hZ2VkQXR0cmlidXRlRGV0YWlscyB3aGVuIGZldGNoaW5nIGZvciBuZXcgZW50aXR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5oYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBzcHkgdG8gcmV0dXJuIGRpZmZlcmVudCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgY3RybC5nZXRFbnRpdHkuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZW50aXR5MklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkTWFuYWdlZEF0dHJpYnV0ZURldGFpbHMoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLm1hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzKS50b0JlRmFsc3koKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgdG8gZmV0Y2ggZGlmZmVyZW50IGVudGl0eSBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5oYXNMb2FkZWRNYW5hZ2VkQXR0cmlidXRlRGV0YWlscygpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGV4cGVjdGVkVXJsMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBzcHkgY2FsbHMgYW5kIHJldHVybiBkaWZmZXJlbnQgZW50aXR5XHJcbiAgICAgICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHMuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ2V0RW50aXR5LmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGVudGl0eTJJZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmhhc0xvYWRlZE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChleHBlY3RlZFVybDIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdtb2JpbGUgZW50aXR5IHNlYXJjaCcsICgpID0+IHtcclxuICAgICAgICBsZXQgY3RybDtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oY3RybC5lbnRpdHlMaXN0UmVmcmVzaFRyaWdnZXIsICdyZWZyZXNoJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdtb2JpbGVFbnRpdHlTZWFyY2goKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ2RvZXMgbm90aGluZyB3aXRoIGV2ZW50IHdpdGgga2V5Q29kZSBvdGhlciB0aGFuIDEzIChlbnRlciknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIG9uY2UgdG8gdG9nZ2xlIHNlYXJjaCBvblxyXG4gICAgICAgICAgICAgICAgY3RybC5tb2JpbGVFbnRpdHlTZWFyY2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGFnYWluIHdpdGggbm9uLWVudGVyIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBjdHJsLm1vYmlsZUVudGl0eVNlYXJjaCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogMjNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmVudGl0eUxpc3RSZWZyZXNoVHJpZ2dlci5yZWZyZXNoKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZWZyZXNoZXMgd2l0aCBrZXlDb2RlIDEzIChlbnRlciknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIG9uY2UgdG8gdG9nZ2xlIHNlYXJjaCBvblxyXG4gICAgICAgICAgICAgICAgY3RybC5tb2JpbGVFbnRpdHlTZWFyY2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIGFnYWluIHdpdGggZW50ZXIgZXZlbnRcclxuICAgICAgICAgICAgICAgIGN0cmwubW9iaWxlRW50aXR5U2VhcmNoKHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlOiAxM1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW50aXR5TGlzdFJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgndG9nZ2xlcyBzZWFyY2hpbmcgaWYgbm90IGFscmVhZHkgdG9nZ2xlZCBvbicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwubW9iaWxlRW50aXR5U2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRNb2JpbGVFbnRpdHlMaXN0U3RhdGUoKS5zZWFyY2hpbmcpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5lbnRpdHlMaXN0UmVmcmVzaFRyaWdnZXIucmVmcmVzaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVmcmVzaGVzIHRyaWdnZXIgaWYgc2VhcmNoaW5nIGFscmVhZHkgdG9nZ2xlZCBvbicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwubW9iaWxlRW50aXR5U2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLm1vYmlsZUVudGl0eVNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW50aXR5TGlzdFJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdtb2JpbGVFbnRpdHlTZWFyY2hDbGVhcigpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnY2xlYXJzIHNlYXJjaCB0ZXJtIGFuZCByZWZyZXNoZXMgdHJpZ2dlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ2V0TW9iaWxlRW50aXR5TGlzdFN0YXRlKCkuZW50aXR5U2VhcmNoVGVybSA9ICdhYmMnO1xyXG4gICAgICAgICAgICAgICAgY3RybC5tb2JpbGVFbnRpdHlTZWFyY2hDbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0TW9iaWxlRW50aXR5TGlzdFN0YXRlKCkuZW50aXR5U2VhcmNoVGVybSkudG9FcXVhbCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW50aXR5TGlzdFJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgndG9nZ2xlcyBzZWFyY2ggb2ZmJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybC5nZXRNb2JpbGVFbnRpdHlMaXN0U3RhdGUoKS5zZWFyY2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3RybC5tb2JpbGVFbnRpdHlTZWFyY2hDbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0TW9iaWxlRW50aXR5TGlzdFN0YXRlKCkuc2VhcmNoaW5nKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc01vYmlsZUVudGl0eVNlYXJjaCgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBzZWFyY2hpbmcgZmxhZyBmcm9tIG1vYmlsZSBlbnRpdHkgbGlzdCBzdGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuZ2V0TW9iaWxlRW50aXR5TGlzdFN0YXRlKCkuc2VhcmNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTW9iaWxlRW50aXR5U2VhcmNoKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaGFzVXNlclZpZXcoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgTWFuYWdlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1VzZXJWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgTWFuYWdlcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1VzZXJWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgQXBwbGljYXRpb25Pd25lcicsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kXHJcbiAgICAgICAgICAgICAgICAgICAgLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5BcHBsaWNhdGlvbk93bmVyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1VzZXJWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgSWRlbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuSWRlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzVXNlclZpZXcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnQgdHlwZSBpcyBHcm91cCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5Hcm91cCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNVc2VyVmlldygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGNlcnQgdHlwZSBpcyBEYXRhT3duZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuRGF0YU93bmVyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1VzZXJWaWV3KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGNlcnQgdHlwZSBpcyBBY2NvdW50R3JvdXBNZW1iZXJzaGlwJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmRcclxuICAgICAgICAgICAgICAgICAgICAucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cE1lbWJlcnNoaXApO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzVXNlclZpZXcoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgY2VydCB0eXBlIGlzIEFjY291bnRHcm91cFBlcm1pc3Npb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmRcclxuICAgICAgICAgICAgICAgICAgICAucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cFBlcm1pc3Npb25zKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1VzZXJWaWV3KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdoYXNFbnRpdHlMaXN0VmlldygpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnQgdHlwZSBpcyBNYW5hZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRW50aXR5TGlzdFZpZXcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnQgdHlwZSBpcyBNYW5hZ2VyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRW50aXR5TGlzdFZpZXcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnQgdHlwZSBpcyBBcHBsaWNhdGlvbk93bmVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmRcclxuICAgICAgICAgICAgICAgICAgICAucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkFwcGxpY2F0aW9uT3duZXIpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRW50aXR5TGlzdFZpZXcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnQgdHlwZSBpcyBJZGVudGl0eScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5JZGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNFbnRpdHlMaXN0VmlldygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY2VydCB0eXBlIGlzIEdyb3VwJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0VudGl0eUxpc3RWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgRGF0YU93bmVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lcik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNFbnRpdHlMaXN0VmlldygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY2VydCB0eXBlIGlzIEFjY291bnRHcm91cE1lbWJlcnNoaXAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZFxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwTWVtYmVyc2hpcCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNFbnRpdHlMaXN0VmlldygpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY2VydCB0eXBlIGlzIEFjY291bnRHcm91cFBlcm1pc3Npb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmRcclxuICAgICAgICAgICAgICAgICAgICAucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cFBlcm1pc3Npb25zKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0VudGl0eUxpc3RWaWV3KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IHR5cGUgaXMgQnVzaW5lc3NSb2xlQ29tcG9zaXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZFxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuQnVzaW5lc3NSb2xlQ29tcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRW50aXR5TGlzdFZpZXcoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzTG9hZGVkUm9sZVNuYXBzaG90JywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBjdHJsO1xyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ2dldFJvbGVTbmFwc2hvdCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBubyBlbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRFbnRpdHknKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzTG9hZGVkUm9sZVNuYXBzaG90KCkpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZm9yIG5vbi1idXNpbmVzcyByb2xlIGNlcnRpZmljYXRpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IENlcnRpZmljYXRpb24uVHlwZS5JZGVudGl0eVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjdHJsLCAnZ2V0RW50aXR5JykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3doYXRldnMnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0xvYWRlZFJvbGVTbmFwc2hvdCgpKS50b0JlRmFsc3koKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHRocm91Z2ggdG8gY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmhhc0xvYWRlZFJvbGVTbmFwc2hvdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldFJvbGVTbmFwc2hvdCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdmb3IgQnVzaW5lc3NSb2xlIGNlcnRpZmljYXRpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcm9sZVNuYXBzaG90ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjZXJ0SWQgPSAnc29tZXRoaW5nJyxcclxuICAgICAgICAgICAgICAgIGVudGl0eTFJZCA9ICcxMjMnLFxyXG4gICAgICAgICAgICAgICAgZW50aXR5MklkID0gJzMyMSc7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBjZXJ0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkJ1c2luZXNzUm9sZUNvbXBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRFbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBlbnRpdHkxSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Um9sZVNuYXBzaG90LmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHJvbGVTbmFwc2hvdCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSByb2xlU25hcHNob3QgaGFzIG5vdCBiZWVuIGZldGNoZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNMb2FkZWRSb2xlU25hcHNob3QoKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgcm9sZVNuYXBzaG90IGhhcyBiZWVuIGZldGNoZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmhhc0xvYWRlZFJvbGVTbmFwc2hvdCgpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0xvYWRlZFJvbGVTbmFwc2hvdCgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5yb2xlU25hcHNob3QpLnRvQmUocm9sZVNuYXBzaG90KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSB0byBmZXRjaCBzbmFwc2hvdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkUm9sZVNuYXBzaG90KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Um9sZVNuYXBzaG90KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGVudGl0eTFJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciByb2xlU25hcHNob3Qgd2hlbiBmZXRjaGluZyBmb3IgbmV3IGVudGl0eScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkUm9sZVNuYXBzaG90KCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwucm9sZVNuYXBzaG90KS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBzcHkgdG8gcmV0dXJuIGRpZmZlcmVudCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgY3RybC5nZXRFbnRpdHkuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZW50aXR5MklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkUm9sZVNuYXBzaG90KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5yb2xlU25hcHNob3QpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSB0byBmZXRjaCBkaWZmZXJlbnQgZW50aXR5IGRldGFpbHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmhhc0xvYWRlZFJvbGVTbmFwc2hvdCgpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRSb2xlU25hcHNob3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJZCwgZW50aXR5MUlkKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHNweSBjYWxscyBhbmQgcmV0dXJuIGRpZmZlcmVudCBlbnRpdHlcclxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldFJvbGVTbmFwc2hvdC5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5nZXRFbnRpdHkuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZW50aXR5MklkXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGN0cmwuaGFzTG9hZGVkUm9sZVNuYXBzaG90KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Um9sZVNuYXBzaG90KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGVudGl0eTJJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
