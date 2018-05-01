System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'SailPointHelpers'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, expectReject;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_SailPointHelpers) {
            expectReject = _SailPointHelpers.expectReject;
        }],
        execute: function () {

            describe('certificationDataService', function () {

                var certificationDataService = undefined,
                    CertificationDecision = undefined,
                    certificationTestData = undefined,
                    CertificationViewState = undefined,
                    CertificationItem = undefined,
                    Certification = undefined,
                    CertificationActionStatus = undefined,
                    cert = undefined,
                    worksheetMocks = undefined,
                    detailMocks = undefined,
                    certificationEntityService = undefined,
                    $q = undefined,
                    $rootScope = undefined;

                function getStatus(status) {
                    return new CertificationActionStatus({
                        status: status
                    });
                }

                /**
                 * Mock out the methods on the given CertificationViewState class so that we can spy on them.
                 */
                function setupViewStateMocks(clazz) {
                    var mocks = {
                        reset: jasmine.createSpy('reset'),
                        setupCheckboxModels: jasmine.createSpy('setupCheckboxModels'),
                        initializeFilters: jasmine.createSpy('initializeFilters'),
                        getSelectionModelScope: jasmine.createSpy('getSelectionModelScope'),
                        refreshCurrentTab: jasmine.createSpy('refreshCurrentTab')
                    };

                    angular.forEach(mocks, function (mock, methodName) {
                        clazz.prototype[methodName] = mock;
                    });

                    return mocks;
                }

                beforeEach(module(certificationModule));

                beforeEach(inject(function (CertificationWorksheetViewState, CertificationDetailViewState) {
                    worksheetMocks = setupViewStateMocks(CertificationWorksheetViewState);
                    detailMocks = setupViewStateMocks(CertificationDetailViewState);
                }));

                /* jshint maxparams:10 */
                beforeEach(inject(function (_certificationDataService_, _CertificationDecision_, _CertificationItem_, _certificationTestData_, _Certification_, _CertificationViewState_, _CertificationActionStatus_, _certificationEntityService_, _$q_, _$rootScope_) {
                    certificationDataService = _certificationDataService_;
                    CertificationDecision = _CertificationDecision_;
                    CertificationItem = _CertificationItem_;
                    certificationTestData = _certificationTestData_;
                    Certification = _Certification_;
                    CertificationViewState = _CertificationViewState_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    certificationEntityService = _certificationEntityService_;
                    $q = _$q_;
                    $rootScope = _$rootScope_;

                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                }));

                describe('initialize()', function () {
                    it('sets the certification', function () {
                        certificationDataService.initialize(cert);
                        expect(certificationDataService.certification).toEqual(cert);
                    });

                    it('clears the decisions', function () {
                        var item = {
                            getId: function () {
                                return 'abcd';
                            }
                        };
                        var decision = CertificationDecision.createItemDecision(item, getStatus('Approved'));
                        certificationDataService.decisions.addDecision(decision);
                        certificationDataService.initialize(cert);
                        expect(certificationDataService.decisions.getDecisionCount()).toEqual(0);
                    });

                    it('sets up view state', function () {
                        certificationDataService.initialize(cert);
                        expect(certificationDataService.getViewState()).toBeDefined();
                    });

                    it('clears the selectedEntity if specified', function () {
                        certificationDataService.initialize(cert);
                        certificationDataService.selectedEntity = { some: 'person' };
                        certificationDataService.initialize(cert, true);
                        expect(certificationDataService.selectedEntity).not.toBeDefined();
                    });

                    it('leaves the selectedEntity if not specified', function () {
                        certificationDataService.initialize(cert);
                        certificationDataService.selectedEntity = { some: 'person' };
                        certificationDataService.initialize(cert, false);
                        expect(certificationDataService.selectedEntity).toEqual({ some: 'person' });
                    });

                    it('notifies all certification load listeners', function () {
                        var listener1 = createCertLoadListener();
                        var listener2 = createCertLoadListener();

                        certificationDataService.registerCertificationLoadListener(listener1);
                        certificationDataService.registerCertificationLoadListener(listener2);

                        certificationDataService.initialize(cert);
                        expect(listener1.certificationLoaded).toHaveBeenCalledWith(cert);
                        expect(listener2.certificationLoaded).toHaveBeenCalledWith(cert);
                    });

                    it('resets mobile entity view state', function () {
                        spyOn(certificationDataService.mobileEntityViewState, 'reset');
                        certificationDataService.initialize(cert);
                        expect(certificationDataService.mobileEntityViewState.reset).toHaveBeenCalledWith(cert);
                    });
                });

                function createCertLoadListener() {
                    return {
                        certificationLoaded: jasmine.createSpy('certificationLoaded')
                    };
                }

                describe('register certification load listener', function () {
                    it('adds a listener', function () {
                        var listener = {};
                        certificationDataService.registerCertificationLoadListener(listener);
                        expect(certificationDataService.certificationLoadListeners.length).toEqual(1);
                    });

                    it('calls the listener immediately if a certification is already initialized', function () {
                        certificationDataService.initialize(cert);
                        var listener = createCertLoadListener();
                        certificationDataService.registerCertificationLoadListener(listener);
                        expect(listener.certificationLoaded).toHaveBeenCalledWith(cert);
                    });

                    it('does not call the listener immediately if a certification is not initialized', function () {
                        var listener = createCertLoadListener();
                        certificationDataService.registerCertificationLoadListener(listener);
                        expect(listener.certificationLoaded).not.toHaveBeenCalled();
                    });
                });

                describe('deregister certification load listener', function () {
                    it('does nothing if the listener has not been registered', function () {
                        certificationDataService.registerCertificationLoadListener({});
                        certificationDataService.deregisterCertificationLoadListener({ something: 'new' });
                        expect(certificationDataService.certificationLoadListeners.length).toEqual(1);
                    });

                    it('removes the listener', function () {
                        var listener = {};
                        certificationDataService.registerCertificationLoadListener(listener);
                        certificationDataService.deregisterCertificationLoadListener(listener);
                        expect(certificationDataService.certificationLoadListeners.length).toEqual(0);
                    });
                });

                describe('configuration', function () {
                    it('is initially undefined', function () {
                        expect(certificationDataService.getConfiguration()).not.toBeDefined();
                    });

                    it('sets the configuration', function () {
                        var config = { config: 'this' };
                        certificationDataService.initializeConfiguration(config);
                        expect(certificationDataService.getConfiguration()).toBe(config);
                    });
                });

                describe('checkbox models', function () {
                    beforeEach(function () {
                        spyOn(certificationDataService, 'isCheckboxRequired').and.returnValue(true);
                    });

                    it('are not set after initialize with no configuration', function () {
                        certificationDataService.initialize(cert);
                        expect(worksheetMocks.setupCheckboxModels).not.toHaveBeenCalled();
                    });

                    it('are not set after configuration initialization with no cert', function () {
                        certificationDataService.initializeConfiguration({});
                        expect(worksheetMocks.setupCheckboxModels).not.toHaveBeenCalled();
                    });

                    it('are setup after initializing both cert and configuration', function () {
                        certificationDataService.initialize(cert);
                        certificationDataService.initializeConfiguration(cert);
                        expect(worksheetMocks.setupCheckboxModels).toHaveBeenCalledWith(true);
                    });
                });

                describe('initializeDataTableFilters()', function () {
                    it('sets filters on the DecisionsLeft and Complete tables', function () {
                        var filters = { i: 'amTheFilters' };
                        certificationDataService.setDataTableFilters(filters);
                        certificationDataService.initialize(cert, false, false);
                        expect(certificationDataService.getViewState().initializeFilters).toHaveBeenCalledWith(filters);
                    });
                });

                describe('isCertificationEditable', function () {
                    it('return false if certification is not defined', function () {
                        expect(certificationDataService.isCertificationEditable()).toEqual(false);
                    });

                    it('returns false if certification config is not defined', function () {
                        certificationDataService.initialize({ id: '1234', some: 'cert', phase: 'Active' });
                        expect(certificationDataService.isCertificationEditable()).toEqual(false);
                    });

                    it('returns false if certification and config are defined but cert is not editable', function () {
                        certificationDataService.initialize({ id: '1234', some: 'cert', editable: false });
                        certificationDataService.initializeConfiguration({ some: 'config' });
                        expect(certificationDataService.isCertificationEditable()).toEqual(false);
                    });

                    it('returns true if certification and config are defined and cert is editable', function () {
                        certificationDataService.initialize({ id: '1234', some: 'cert', editable: true });
                        certificationDataService.initializeConfiguration({ some: 'config' });
                        expect(certificationDataService.isCertificationEditable()).toEqual(true);
                    });
                });

                describe('needsRemediationSummary()', function () {
                    it('returns true if cert item subtype is a role and showRoleRevocationDetails is true', function () {
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[1]);
                        certificationDataService.initializeConfiguration({
                            showRoleRevocationDetails: true,
                            revocationModificationEnabled: false
                        });
                        expect(certificationDataService.needsRemediationSummary(certItem, false)).toEqual(true);
                    });

                    it('returns false if cert item subtype is a role and showRoleRevocationDetails is false', function () {
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[1]);
                        certificationDataService.initializeConfiguration({
                            showRoleRevocationDetails: false,
                            revocationModificationEnabled: false
                        });
                        expect(certificationDataService.needsRemediationSummary(certItem, false)).toEqual(false);
                    });

                    it('returns false if cert item subtype is a role and showRoleRevocationDetails is true but ' + 'skipRoleRevocationDetails is true', function () {
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[1]);
                        certificationDataService.initializeConfiguration({
                            showRoleRevocationDetails: true,
                            revocationModificationEnabled: false
                        });
                        expect(certificationDataService.needsRemediationSummary(certItem, true)).toEqual(false);
                    });

                    it('returs true if cert item subtype not a role and revocationModificationEnabled is true', function () {
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[0]);
                        certificationDataService.initializeConfiguration({
                            revocationModificationEnabled: true,
                            showRoleRevocationDetails: true
                        });
                        expect(certificationDataService.needsRemediationSummary(certItem)).toEqual(true);
                    });

                    it('returns false if cert item subtype is not a role and revocationModificationEnabled is false', function () {
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[0]);
                        certificationDataService.initializeConfiguration({
                            revocationModificationEnabled: false,
                            showRoleRevocationDetails: true
                        });
                        expect(certificationDataService.needsRemediationSummary(certItem)).toEqual(false);
                    });
                });

                it('gets processRevokesImmediately flag from the configuration', function () {
                    var config = { processRevokesImmediately: false };
                    certificationDataService.initializeConfiguration(config);
                    expect(certificationDataService.isProcessRevokesImmediately()).toEqual(config.processRevokesImmediately);
                });

                it('getTotalCount() delegates to CertificationItemStatusCount', function () {
                    spyOn(cert.itemStatusCount, 'getTotalCount').and.returnValue(43);
                    certificationDataService.initialize(cert);
                    var count = certificationDataService.getTotalCount();
                    expect(cert.itemStatusCount.getTotalCount).toHaveBeenCalled();
                    expect(count).toEqual(43);
                });

                it('getCompleteCount() delegates to CertificationItemStatusCount', function () {
                    spyOn(cert.itemStatusCount, 'getCompleteCount').and.returnValue(43);
                    certificationDataService.initialize(cert);
                    var count = certificationDataService.getCompleteCount();
                    expect(cert.itemStatusCount.getCompleteCount).toHaveBeenCalled();
                    expect(count).toEqual(43);
                });

                describe('view state', function () {
                    var rejectUnsavedDecisions = undefined;

                    beforeEach(function () {
                        rejectUnsavedDecisions = false;
                        certificationDataService.initialize(cert);
                        spyOn(certificationDataService, 'checkForUnsavedDecisions').and.callFake(function () {
                            return rejectUnsavedDecisions ? $q.reject() : $q.when();
                        });
                    });

                    describe('getViewState()', function () {
                        it('returns worksheet view when no entity is selected', function () {
                            certificationDataService.selectedEntity = undefined;
                            expect(certificationDataService.getViewState()).toEqual(certificationDataService.worksheetViewState);
                        });

                        it('returns detail view when an entity is selected', function () {
                            certificationDataService.selectedEntity = { some: 'person' };
                            expect(certificationDataService.getViewState()).toEqual(certificationDataService.detailViewState);
                        });
                    });

                    describe('goToWorksheetView', function () {
                        it('clears the selected identity', function () {
                            certificationDataService.selectedEntity = { some: 'person' };
                            certificationDataService.goToWorksheetView();
                            $rootScope.$apply();
                            expect(certificationDataService.selectedEntity).not.toBeDefined();
                            expect(certificationDataService.getViewState()).toEqual(certificationDataService.worksheetViewState);
                        });

                        it('clears entity list pager', function () {
                            certificationDataService.selectedEntity = { some: 'person' };
                            certificationDataService.entityListPager = { page: 'on' };
                            certificationDataService.goToWorksheetView();
                            $rootScope.$apply();
                            expect(certificationDataService.entityListPager).not.toBeDefined();
                        });

                        it('hides the entity list', function () {
                            certificationDataService.showEntityList = true;
                            certificationDataService.goToWorksheetView();
                            $rootScope.$apply();
                            expect(certificationDataService.showEntityList).toEqual(false);
                        });

                        it('does not clear selected identity if unsaved decision dialog is rejected', function () {
                            certificationDataService.selectedEntity = { some: 'person' };
                            rejectUnsavedDecisions = true;
                            certificationDataService.goToWorksheetView();
                            $rootScope.$apply();
                            expect(certificationDataService.checkForUnsavedDecisions).toHaveBeenCalled();
                            expect(certificationDataService.selectedEntity).toEqual({ some: 'person' });
                            expect(certificationDataService.getViewState()).toEqual(certificationDataService.detailViewState);
                        });

                        it('does not check for unsaved decisions if selectedEntity is not set', function () {
                            certificationDataService.selectedEntity = undefined;
                            certificationDataService.goToWorksheetView();
                            $rootScope.$apply();
                            expect(certificationDataService.checkForUnsavedDecisions).not.toHaveBeenCalled();
                        });
                    });

                    describe('goToDetailView', function () {
                        it('throws without an entityId', function () {
                            expect(function () {
                                certificationDataService.goToDetailView();
                            }).toThrow();
                        });

                        it('hides the entity list', function () {
                            var entity = { id: '1234', some: 'person' };
                            certificationDataService.showEntityList = true;
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            certificationDataService.goToDetailView(entity.id);
                            $rootScope.$apply();
                            expect(certificationDataService.showEntityList).toEqual(false);
                        });

                        it('fetches the full entity then sets the selected entity and resets the detail view state', function () {
                            var entity = { id: '1234', some: 'person' };
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            certificationDataService.goToDetailView(entity.id);
                            $rootScope.$apply();
                            expect(certificationDataService.selectedEntity).toEqual(entity);
                            expect(detailMocks.reset).toHaveBeenCalledWith(cert, entity);
                        });

                        it('does not fetch full entity if check for unsaved decisions is rejected', function () {
                            var entity = { id: '1234', some: 'person' };
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            rejectUnsavedDecisions = true;
                            certificationDataService.goToDetailView(entity.id);
                            $rootScope.$apply();
                            expect(certificationDataService.checkForUnsavedDecisions).toHaveBeenCalled();
                            expect(detailMocks.reset).not.toHaveBeenCalled();
                        });

                        it('does not check for unsaved decisions if switching between entities', function () {
                            var entity = { id: '1234', some: 'person' };
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            certificationDataService.selectedEntity = { another: 'entity' };
                            certificationDataService.goToDetailView(entity.id);
                            $rootScope.$apply();
                            expect(certificationDataService.checkForUnsavedDecisions).not.toHaveBeenCalled();
                            expect(detailMocks.reset).toHaveBeenCalled();
                        });

                        it('entity pager is saved if callback is supplied', function () {
                            var pager = { i: 'am a pager ... 1990s represent!!' };
                            var entityPagerCallback = jasmine.createSpy().and.callFake(function () {
                                return $q.when(pager);
                            });

                            var entity = { id: '1234', some: 'person' };
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            certificationDataService.goToDetailView(entity.id, entityPagerCallback);
                            $rootScope.$apply();

                            expect(entityPagerCallback).toHaveBeenCalled();
                            expect(certificationDataService.entityListPager).toEqual(pager);
                        });
                    });

                    describe('refreshView()', function () {
                        it('refreshes and constrains for worksheet view', function () {
                            certificationDataService.initialize(cert);
                            certificationDataService.refreshView();
                            expect(worksheetMocks.reset).toHaveBeenCalled();
                            expect(worksheetMocks.refreshCurrentTab).toHaveBeenCalled();
                        });

                        it('fetches entity and resets view for detail view', function () {
                            var entity = { id: 'person' };
                            spyOn(certificationEntityService, 'getEntity').and.returnValue($q.when(entity));
                            certificationDataService.initialize(cert);
                            certificationDataService.goToDetailView(entity);
                            $rootScope.$apply();
                            certificationEntityService.getEntity.calls.reset();
                            certificationDataService.refreshView();
                            expect(certificationEntityService.getEntity).toHaveBeenCalledWith(cert.id, entity.id);
                            expect(detailMocks.reset).toHaveBeenCalledWith(cert, entity);
                        });

                        describe('with auto-advance', function () {
                            var entity1 = undefined,
                                entity1Completed = undefined,
                                entity2 = undefined;

                            function createMockEntity(id, complete) {
                                return {
                                    id: id,
                                    isComplete: jasmine.createSpy().and.returnValue(complete)
                                };
                            }

                            function createMockPager(hasNext, nextId) {
                                return {
                                    hasNext: jasmine.createSpy().and.returnValue(hasNext),
                                    next: jasmine.createSpy().and.returnValue(nextId)
                                };
                            }

                            beforeEach(function () {
                                entity1 = createMockEntity('entity1', false);
                                entity1Completed = createMockEntity('entity1', true);
                                entity2 = createMockEntity('entity2', false);

                                // Mock getEntity() to return:
                                // 1) First call: entity1 (incomplete)
                                // 2) Second call: entity1 (complete) to simulate completing the entity
                                // 3) Third call: entity2 for the auto-advance
                                spyOn(certificationEntityService, 'getEntity').and.returnValues($q.when(entity1), $q.when(entity1Completed), $q.when(entity2));

                                // Start on the detail view.
                                certificationDataService.initialize(cert);
                                certificationDataService.goToDetailView(entity1);
                                $rootScope.$apply();

                                expect(certificationEntityService.getEntity.calls.count()).toEqual(1);
                                expect(certificationDataService.selectedEntity).toBe(entity1);
                            });

                            it('stays on the same entity if there is no pager', function () {
                                certificationDataService.refreshView(true);
                                $rootScope.$apply();

                                expect(certificationEntityService.getEntity.calls.count()).toEqual(2);
                                expect(certificationDataService.selectedEntity).toBe(entity1Completed);
                            });

                            it('stays on the same entity if we are on the last entity in the pager', function () {
                                certificationDataService.entityListPager = createMockPager(false);
                                certificationDataService.refreshView(true);
                                $rootScope.$apply();

                                expect(certificationEntityService.getEntity.calls.count()).toEqual(2);
                                expect(certificationDataService.selectedEntity).toBe(entity1Completed);
                            });

                            it('stays on the same entity if the entity is not complete', function () {
                                // Rewire entity1 to not be complete when we refetch it.
                                entity1Completed.isComplete = jasmine.createSpy().and.returnValue(false);
                                certificationDataService.entityListPager = createMockPager(true, entity2.id);
                                certificationDataService.refreshView(true);
                                $rootScope.$apply();

                                expect(certificationEntityService.getEntity.calls.count()).toEqual(2);
                                expect(certificationDataService.selectedEntity).toBe(entity1Completed);
                            });

                            it('moves to the next entity if the current entity is complete and there are more entities', function () {
                                certificationDataService.entityListPager = createMockPager(true, entity2.id);
                                certificationDataService.refreshView(true);
                                $rootScope.$apply();

                                expect(certificationEntityService.getEntity.calls.count()).toEqual(3);
                                expect(certificationDataService.selectedEntity).toBe(entity2);
                            });
                        });
                    });
                });

                describe('checkForUnsavedDecisions()', function () {
                    var decisionCount = undefined,
                        resolveDialog = undefined,
                        spModal = undefined;
                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                        spyOn(spModal, 'confirm').and.callFake(function () {
                            return resolveDialog ? $q.when() : $q.reject();
                        });
                        certificationDataService.initialize(cert);
                        decisionCount = 2;
                        resolveDialog = true;
                        spyOn(certificationDataService.decisions, 'getDecisionCount').and.callFake(function () {
                            return decisionCount;
                        });
                        spyOn(certificationDataService.decisions, 'clearDecisions').and.callThrough();
                    }));

                    it('returns resolved promise if no decisions', function () {
                        var resolved = false;
                        decisionCount = 0;
                        certificationDataService.checkForUnsavedDecisions().then(function () {
                            return resolved = true;
                        });
                        $rootScope.$apply();
                        expect(certificationDataService.decisions.getDecisionCount).toHaveBeenCalled();
                        expect(resolved).toEqual(true);
                        expect(spModal.confirm).not.toHaveBeenCalled();
                    });

                    it('opens dialog and returns promise if decisions exist', function () {
                        var resolved = false;
                        certificationDataService.checkForUnsavedDecisions().then(function () {
                            return resolved = true;
                        });
                        expect(certificationDataService.decisions.getDecisionCount).toHaveBeenCalled();
                        $rootScope.$apply();
                        expect(resolved).toEqual(true);
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('clears decisions if the dialog resolves', function () {
                        certificationDataService.checkForUnsavedDecisions();
                        $rootScope.$apply();
                        expect(certificationDataService.decisions.clearDecisions).toHaveBeenCalled();
                    });

                    it('does not clear decisions if the dialog rejects', function () {
                        resolveDialog = false;
                        certificationDataService.checkForUnsavedDecisions()['catch'](expectReject);
                        $rootScope.$apply();
                        expect(certificationDataService.decisions.clearDecisions).not.toHaveBeenCalled();
                    });
                });

                describe('checkTablePreSearch', function () {
                    beforeEach(function () {
                        certificationDataService.initialize(cert);
                    });

                    it('returns resolved promise if filter values match', function () {
                        var searchData = {
                            filterValues: {
                                a: 'b'
                            }
                        },
                            result = undefined;

                        spyOn(certificationDataService, 'checkForUnsavedDecisions');
                        certificationDataService.checkTablePreSearch(searchData, searchData).then(function () {
                            return result = true;
                        });
                        $rootScope.$apply();
                        expect(result).toEqual(true);
                        expect(certificationDataService.checkForUnsavedDecisions).not.toHaveBeenCalled();
                    });

                    it('checks for unsaved decisions if filter values do not match', function () {
                        var oldSearchData = {
                            filterValues: {
                                a: 'b'
                            }
                        },
                            newSearchData = {
                            filterValues: {}
                        };

                        // Just checking we pass the result of this method call back, should be a promise but whatever
                        spyOn(certificationDataService, 'checkForUnsavedDecisions').and.returnValue('whatever');
                        var result = certificationDataService.checkTablePreSearch(oldSearchData, newSearchData);
                        $rootScope.$apply();
                        expect(result).toEqual('whatever');
                        expect(certificationDataService.checkForUnsavedDecisions).toHaveBeenCalled();
                    });
                });

                it('toggleEntityList() flips the value of showEntityList', function () {
                    expect(certificationDataService.showEntityList).toBeFalsy();
                    certificationDataService.toggleEntityList();
                    expect(certificationDataService.showEntityList).toBeTruthy();
                    certificationDataService.toggleEntityList();
                    expect(certificationDataService.showEntityList).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxxQkFBcUIsVUFBVSxTQUFTOzs7SUFHckg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsZUFBZSxrQkFObkI7O1FBUUEsU0FBUyxZQUFZOztZQU43QixTQUFTLDRCQUE0QixZQUFXOztnQkFFNUMsSUFBSSwyQkFBd0I7b0JBQUUsd0JBQXFCO29CQUFFLHdCQUFxQjtvQkFBRSx5QkFBc0I7b0JBQzlGLG9CQUFpQjtvQkFBRSxnQkFBYTtvQkFBRSw0QkFBeUI7b0JBQUUsT0FBSTtvQkFBRSxpQkFBYztvQkFBRSxjQUFXO29CQUM5Riw2QkFBMEI7b0JBQUUsS0FBRTtvQkFBRSxhQUFVOztnQkFFOUMsU0FBUyxVQUFVLFFBQVE7b0JBQ3ZCLE9BQU8sSUFBSSwwQkFBMEI7d0JBQ2pDLFFBQVE7Ozs7Ozs7Z0JBT2hCLFNBQVMsb0JBQW9CLE9BQU87b0JBQ2hDLElBQUksUUFBUTt3QkFDUixPQUFPLFFBQVEsVUFBVTt3QkFDekIscUJBQXFCLFFBQVEsVUFBVTt3QkFDdkMsbUJBQW1CLFFBQVEsVUFBVTt3QkFDckMsd0JBQXdCLFFBQVEsVUFBVTt3QkFDMUMsbUJBQW1CLFFBQVEsVUFBVTs7O29CQUd6QyxRQUFRLFFBQVEsT0FBTyxVQUFDLE1BQU0sWUFBZTt3QkFDekMsTUFBTSxVQUFVLGNBQWM7OztvQkFHbEMsT0FBTzs7O2dCQUdYLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGlDQUFpQyw4QkFBaUM7b0JBQ2pGLGlCQUFpQixvQkFBb0I7b0JBQ3JDLGNBQWMsb0JBQW9COzs7O2dCQUl0QyxXQUFX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QU8seUJBQXlCLFVBQVUsZ0JBQWdCLElBQUk7Ozs7Z0JBSXRFLFNBQVMsdUJBQXVCLFlBQU07b0JBQ2xDLFdBQVcsWUFBTTt3QkFDYix5QkFBeUIsV0FBVzs7O29CQUd4QyxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLGFBQWE7NEJBQ2IsY0FBYztnQ0FDVixHQUFHOzs7NEJBRVIsU0FBTTs7d0JBRVQsTUFBTSwwQkFBMEI7d0JBQ2hDLHlCQUF5QixvQkFBb0IsWUFBWSxZQUFZLEtBQUssWUFBQTs0QkE4QjFELE9BOUJnRSxTQUFTOzt3QkFDekYsV0FBVzt3QkFDWCxPQUFPLFFBQVEsUUFBUTt3QkFDdkIsT0FBTyx5QkFBeUIsMEJBQTBCLElBQUk7OztvQkFHbEUsR0FBRyw4REFBOEQsWUFBTTt3QkFDbkUsSUFBSSxnQkFBZ0I7NEJBQ2hCLGNBQWM7Z0NBQ1YsR0FBRzs7OzRCQUVSLGdCQUFnQjs0QkFDZixjQUFjOzs7O3dCQUlsQixNQUFNLDBCQUEwQiw0QkFBNEIsSUFBSSxZQUFZO3dCQUM1RSxJQUFJLFNBQVMseUJBQXlCLG9CQUFvQixlQUFlO3dCQUN6RSxXQUFXO3dCQUNYLE9BQU8sUUFBUSxRQUFRO3dCQUN2QixPQUFPLHlCQUF5QiwwQkFBMEI7Ozs7Z0JBSWxFLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLE9BQU8seUJBQXlCLGdCQUFnQjtvQkFDaEQseUJBQXlCO29CQUN6QixPQUFPLHlCQUF5QixnQkFBZ0I7b0JBQ2hELHlCQUF5QjtvQkFDekIsT0FBTyx5QkFBeUIsZ0JBQWdCOzs7OztHQXFDckQiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQge2V4cGVjdFJlamVjdH0gZnJvbSAnU2FpbFBvaW50SGVscGVycyc7XG5cbmRlc2NyaWJlKCdjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsIENlcnRpZmljYXRpb25EZWNpc2lvbiwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLFxuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSwgQ2VydGlmaWNhdGlvbiwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cywgY2VydCwgd29ya3NoZWV0TW9ja3MsIGRldGFpbE1vY2tzLFxuICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJHEsICRyb290U2NvcGU7XG5cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb2NrIG91dCB0aGUgbWV0aG9kcyBvbiB0aGUgZ2l2ZW4gQ2VydGlmaWNhdGlvblZpZXdTdGF0ZSBjbGFzcyBzbyB0aGF0IHdlIGNhbiBzcHkgb24gdGhlbS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXR1cFZpZXdTdGF0ZU1vY2tzKGNsYXp6KSB7XG4gICAgICAgIGxldCBtb2NrcyA9IHtcbiAgICAgICAgICAgIHJlc2V0OiBqYXNtaW5lLmNyZWF0ZVNweSgncmVzZXQnKSxcbiAgICAgICAgICAgIHNldHVwQ2hlY2tib3hNb2RlbHM6IGphc21pbmUuY3JlYXRlU3B5KCdzZXR1cENoZWNrYm94TW9kZWxzJyksXG4gICAgICAgICAgICBpbml0aWFsaXplRmlsdGVyczogamFzbWluZS5jcmVhdGVTcHkoJ2luaXRpYWxpemVGaWx0ZXJzJyksXG4gICAgICAgICAgICBnZXRTZWxlY3Rpb25Nb2RlbFNjb3BlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0U2VsZWN0aW9uTW9kZWxTY29wZScpLFxuICAgICAgICAgICAgcmVmcmVzaEN1cnJlbnRUYWI6IGphc21pbmUuY3JlYXRlU3B5KCdyZWZyZXNoQ3VycmVudFRhYicpXG4gICAgICAgIH07XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1vY2tzLCAobW9jaywgbWV0aG9kTmFtZSkgPT4ge1xuICAgICAgICAgICAgY2xhenoucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbW9jaztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1vY2tzO1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChDZXJ0aWZpY2F0aW9uV29ya3NoZWV0Vmlld1N0YXRlLCBDZXJ0aWZpY2F0aW9uRGV0YWlsVmlld1N0YXRlKSA9PiB7XG4gICAgICAgIHdvcmtzaGVldE1vY2tzID0gc2V0dXBWaWV3U3RhdGVNb2NrcyhDZXJ0aWZpY2F0aW9uV29ya3NoZWV0Vmlld1N0YXRlKTtcbiAgICAgICAgZGV0YWlsTW9ja3MgPSBzZXR1cFZpZXdTdGF0ZU1vY2tzKENlcnRpZmljYXRpb25EZXRhaWxWaWV3U3RhdGUpO1xuICAgIH0pKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6MTAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXywgX0NlcnRpZmljYXRpb25EZWNpc2lvbl8sIF9DZXJ0aWZpY2F0aW9uSXRlbV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8sIF9DZXJ0aWZpY2F0aW9uXywgX0NlcnRpZmljYXRpb25WaWV3U3RhdGVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXywgX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXywgXyRxXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8pIHtcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbiA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uID0gX0NlcnRpZmljYXRpb25fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlID0gX0NlcnRpZmljYXRpb25WaWV3U3RhdGVfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcblxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2luaXRpYWxpemUoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2V0cyB0aGUgY2VydGlmaWNhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNlcnRpZmljYXRpb24pLnRvRXF1YWwoY2VydCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjbGVhcnMgdGhlIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgZ2V0SWQ6ICgpID0+ICdhYmNkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oaXRlbSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuYWRkRGVjaXNpb24oZGVjaXNpb24pO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHVwIHZpZXcgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCkpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjbGVhcnMgdGhlIHNlbGVjdGVkRW50aXR5IGlmIHNwZWNpZmllZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5ID0geyBzb21lOiAncGVyc29uJyB9O1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCwgdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5KS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2xlYXZlcyB0aGUgc2VsZWN0ZWRFbnRpdHkgaWYgbm90IHNwZWNpZmllZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5ID0geyBzb21lOiAncGVyc29uJyB9O1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCwgZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9FcXVhbCh7c29tZTogJ3BlcnNvbid9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ25vdGlmaWVzIGFsbCBjZXJ0aWZpY2F0aW9uIGxvYWQgbGlzdGVuZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyMSA9IGNyZWF0ZUNlcnRMb2FkTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcjIgPSBjcmVhdGVDZXJ0TG9hZExpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5yZWdpc3RlckNlcnRpZmljYXRpb25Mb2FkTGlzdGVuZXIobGlzdGVuZXIxKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5yZWdpc3RlckNlcnRpZmljYXRpb25Mb2FkTGlzdGVuZXIobGlzdGVuZXIyKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBleHBlY3QobGlzdGVuZXIxLmNlcnRpZmljYXRpb25Mb2FkZWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQpO1xuICAgICAgICAgICAgZXhwZWN0KGxpc3RlbmVyMi5jZXJ0aWZpY2F0aW9uTG9hZGVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Jlc2V0cyBtb2JpbGUgZW50aXR5IHZpZXcgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UubW9iaWxlRW50aXR5Vmlld1N0YXRlLCAncmVzZXQnKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5tb2JpbGVFbnRpdHlWaWV3U3RhdGUucmVzZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNlcnRMb2FkTGlzdGVuZXIoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uTG9hZGVkOiBqYXNtaW5lLmNyZWF0ZVNweSgnY2VydGlmaWNhdGlvbkxvYWRlZCcpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3JlZ2lzdGVyIGNlcnRpZmljYXRpb24gbG9hZCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgaXQoJ2FkZHMgYSBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHt9O1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZ2lzdGVyQ2VydGlmaWNhdGlvbkxvYWRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNlcnRpZmljYXRpb25Mb2FkTGlzdGVuZXJzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRoZSBsaXN0ZW5lciBpbW1lZGlhdGVseSBpZiBhIGNlcnRpZmljYXRpb24gaXMgYWxyZWFkeSBpbml0aWFsaXplZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQpO1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gY3JlYXRlQ2VydExvYWRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZ2lzdGVyQ2VydGlmaWNhdGlvbkxvYWRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICBleHBlY3QobGlzdGVuZXIuY2VydGlmaWNhdGlvbkxvYWRlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjYWxsIHRoZSBsaXN0ZW5lciBpbW1lZGlhdGVseSBpZiBhIGNlcnRpZmljYXRpb24gaXMgbm90IGluaXRpYWxpemVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gY3JlYXRlQ2VydExvYWRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZ2lzdGVyQ2VydGlmaWNhdGlvbkxvYWRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICBleHBlY3QobGlzdGVuZXIuY2VydGlmaWNhdGlvbkxvYWRlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVyZWdpc3RlciBjZXJ0aWZpY2F0aW9uIGxvYWQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIGxpc3RlbmVyIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZ2lzdGVyQ2VydGlmaWNhdGlvbkxvYWRMaXN0ZW5lcih7fSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVyZWdpc3RlckNlcnRpZmljYXRpb25Mb2FkTGlzdGVuZXIoeyBzb21ldGhpbmc6ICduZXcnIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jZXJ0aWZpY2F0aW9uTG9hZExpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIHRoZSBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHt9O1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZ2lzdGVyQ2VydGlmaWNhdGlvbkxvYWRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVyZWdpc3RlckNlcnRpZmljYXRpb25Mb2FkTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jZXJ0aWZpY2F0aW9uTG9hZExpc3RlbmVycy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2lzIGluaXRpYWxseSB1bmRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbigpKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGNvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7IGNvbmZpZzogJ3RoaXMnfTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbihjb25maWcpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRDb25maWd1cmF0aW9uKCkpLnRvQmUoY29uZmlnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2tib3ggbW9kZWxzJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2lzQ2hlY2tib3hSZXF1aXJlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FyZSBub3Qgc2V0IGFmdGVyIGluaXRpYWxpemUgd2l0aCBubyBjb25maWd1cmF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya3NoZWV0TW9ja3Muc2V0dXBDaGVja2JveE1vZGVscykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FyZSBub3Qgc2V0IGFmdGVyIGNvbmZpZ3VyYXRpb24gaW5pdGlhbGl6YXRpb24gd2l0aCBubyBjZXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemVDb25maWd1cmF0aW9uKHt9KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3Jrc2hlZXRNb2Nrcy5zZXR1cENoZWNrYm94TW9kZWxzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXJlIHNldHVwIGFmdGVyIGluaXRpYWxpemluZyBib3RoIGNlcnQgYW5kIGNvbmZpZ3VyYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbihjZXJ0KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3Jrc2hlZXRNb2Nrcy5zZXR1cENoZWNrYm94TW9kZWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbml0aWFsaXplRGF0YVRhYmxlRmlsdGVycygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2V0cyBmaWx0ZXJzIG9uIHRoZSBEZWNpc2lvbnNMZWZ0IGFuZCBDb21wbGV0ZSB0YWJsZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHsgaTogJ2FtVGhlRmlsdGVycycgfTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZXREYXRhVGFibGVGaWx0ZXJzKGZpbHRlcnMpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCkuaW5pdGlhbGl6ZUZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGZpbHRlcnMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0NlcnRpZmljYXRpb25FZGl0YWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJuIGZhbHNlIGlmIGNlcnRpZmljYXRpb24gaXMgbm90IGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaXNDZXJ0aWZpY2F0aW9uRWRpdGFibGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGNlcnRpZmljYXRpb24gY29uZmlnIGlzIG5vdCBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZSh7IGlkOiAnMTIzNCcsIHNvbWU6ICdjZXJ0JywgcGhhc2U6ICdBY3RpdmUnfSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmlzQ2VydGlmaWNhdGlvbkVkaXRhYmxlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjZXJ0aWZpY2F0aW9uIGFuZCBjb25maWcgYXJlIGRlZmluZWQgYnV0IGNlcnQgaXMgbm90IGVkaXRhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZSh7aWQ6ICcxMjM0Jywgc29tZTogJ2NlcnQnLCBlZGl0YWJsZTogZmFsc2V9KTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbih7IHNvbWU6ICdjb25maWcnfSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmlzQ2VydGlmaWNhdGlvbkVkaXRhYmxlKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGNlcnRpZmljYXRpb24gYW5kIGNvbmZpZyBhcmUgZGVmaW5lZCBhbmQgY2VydCBpcyBlZGl0YWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoe2lkOiAnMTIzNCcsIHNvbWU6ICdjZXJ0JywgZWRpdGFibGU6IHRydWV9KTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbih7IHNvbWU6ICdjb25maWcnfSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmlzQ2VydGlmaWNhdGlvbkVkaXRhYmxlKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ25lZWRzUmVtZWRpYXRpb25TdW1tYXJ5KCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjZXJ0IGl0ZW0gc3VidHlwZSBpcyBhIHJvbGUgYW5kIHNob3dSb2xlUmV2b2NhdGlvbkRldGFpbHMgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzFdKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbih7XG4gICAgICAgICAgICAgICAgc2hvd1JvbGVSZXZvY2F0aW9uRGV0YWlsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXZvY2F0aW9uTW9kaWZpY2F0aW9uRW5hYmxlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5uZWVkc1JlbWVkaWF0aW9uU3VtbWFyeShjZXJ0SXRlbSwgZmFsc2UpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjZXJ0IGl0ZW0gc3VidHlwZSBpcyBhIHJvbGUgYW5kIHNob3dSb2xlUmV2b2NhdGlvbkRldGFpbHMgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjZXJ0SXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1sxXSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUNvbmZpZ3VyYXRpb24oe1xuICAgICAgICAgICAgICAgIHNob3dSb2xlUmV2b2NhdGlvbkRldGFpbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJldm9jYXRpb25Nb2RpZmljYXRpb25FbmFibGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLm5lZWRzUmVtZWRpYXRpb25TdW1tYXJ5KGNlcnRJdGVtLCBmYWxzZSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjZXJ0IGl0ZW0gc3VidHlwZSBpcyBhIHJvbGUgYW5kIHNob3dSb2xlUmV2b2NhdGlvbkRldGFpbHMgaXMgdHJ1ZSBidXQgJyArXG4gICAgICAgICAgICAnc2tpcFJvbGVSZXZvY2F0aW9uRGV0YWlscyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzFdKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbih7XG4gICAgICAgICAgICAgICAgc2hvd1JvbGVSZXZvY2F0aW9uRGV0YWlsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXZvY2F0aW9uTW9kaWZpY2F0aW9uRW5hYmxlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5uZWVkc1JlbWVkaWF0aW9uU3VtbWFyeShjZXJ0SXRlbSwgdHJ1ZSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJzIHRydWUgaWYgY2VydCBpdGVtIHN1YnR5cGUgbm90IGEgcm9sZSBhbmQgcmV2b2NhdGlvbk1vZGlmaWNhdGlvbkVuYWJsZWQgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzBdKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplQ29uZmlndXJhdGlvbih7XG4gICAgICAgICAgICAgICAgcmV2b2NhdGlvbk1vZGlmaWNhdGlvbkVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd1JvbGVSZXZvY2F0aW9uRGV0YWlsczogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLm5lZWRzUmVtZWRpYXRpb25TdW1tYXJ5KGNlcnRJdGVtKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgY2VydCBpdGVtIHN1YnR5cGUgaXMgbm90IGEgcm9sZSBhbmQgcmV2b2NhdGlvbk1vZGlmaWNhdGlvbkVuYWJsZWQgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjZXJ0SXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1swXSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUNvbmZpZ3VyYXRpb24oe1xuICAgICAgICAgICAgICAgIHJldm9jYXRpb25Nb2RpZmljYXRpb25FbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Um9sZVJldm9jYXRpb25EZXRhaWxzOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UubmVlZHNSZW1lZGlhdGlvblN1bW1hcnkoY2VydEl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0cyBwcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5IGZsYWcgZnJvbSB0aGUgY29uZmlndXJhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY29uZmlnID0geyBwcm9jZXNzUmV2b2tlc0ltbWVkaWF0ZWx5OiBmYWxzZSB9O1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUNvbmZpZ3VyYXRpb24oY29uZmlnKTtcbiAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pc1Byb2Nlc3NSZXZva2VzSW1tZWRpYXRlbHkoKSkudG9FcXVhbChjb25maWcucHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0VG90YWxDb3VudCgpIGRlbGVnYXRlcyB0byBDZXJ0aWZpY2F0aW9uSXRlbVN0YXR1c0NvdW50JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjZXJ0Lml0ZW1TdGF0dXNDb3VudCwgJ2dldFRvdGFsQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoNDMpO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgbGV0IGNvdW50ID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFRvdGFsQ291bnQoKTtcbiAgICAgICAgZXhwZWN0KGNlcnQuaXRlbVN0YXR1c0NvdW50LmdldFRvdGFsQ291bnQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvdW50KS50b0VxdWFsKDQzKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRDb21wbGV0ZUNvdW50KCkgZGVsZWdhdGVzIHRvIENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQnLCAoKSA9PiB7XG4gICAgICAgIHNweU9uKGNlcnQuaXRlbVN0YXR1c0NvdW50LCAnZ2V0Q29tcGxldGVDb3VudCcpLmFuZC5yZXR1cm5WYWx1ZSg0Myk7XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5pbml0aWFsaXplKGNlcnQpO1xuICAgICAgICBsZXQgY291bnQgPSBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Q29tcGxldGVDb3VudCgpO1xuICAgICAgICBleHBlY3QoY2VydC5pdGVtU3RhdHVzQ291bnQuZ2V0Q29tcGxldGVDb3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoY291bnQpLnRvRXF1YWwoNDMpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZpZXcgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGxldCByZWplY3RVbnNhdmVkRGVjaXNpb25zO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0VW5zYXZlZERlY2lzaW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdjaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMnKS5hbmQuY2FsbEZha2UoKCkgPT5cbiAgICAgICAgICAgICAgICAocmVqZWN0VW5zYXZlZERlY2lzaW9ucykgPyAkcS5yZWplY3QoKSA6ICRxLndoZW4oKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRWaWV3U3RhdGUoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHdvcmtzaGVldCB2aWV3IHdoZW4gbm8gZW50aXR5IGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpKS50b0VxdWFsKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS53b3Jrc2hlZXRWaWV3U3RhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGRldGFpbCB2aWV3IHdoZW4gYW4gZW50aXR5IGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSA9IHsgc29tZTogJ3BlcnNvbid9O1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0Vmlld1N0YXRlKCkpLnRvRXF1YWwoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRldGFpbFZpZXdTdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2dvVG9Xb3Jrc2hlZXRWaWV3JywgKCkgPT4ge1xuICAgICAgICAgICAgaXQgKCdjbGVhcnMgdGhlIHNlbGVjdGVkIGlkZW50aXR5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSA9IHsgc29tZTogJ3BlcnNvbid9O1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvV29ya3NoZWV0VmlldygpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRWaWV3U3RhdGUoKSkudG9FcXVhbChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uud29ya3NoZWV0Vmlld1N0YXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCAoJ2NsZWFycyBlbnRpdHkgbGlzdCBwYWdlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkgPSB7IHNvbWU6ICdwZXJzb24nfTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZW50aXR5TGlzdFBhZ2VyID0geyBwYWdlOiAnb24nIH07XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9Xb3Jrc2hlZXRWaWV3KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmVudGl0eUxpc3RQYWdlcikubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2hpZGVzIHRoZSBlbnRpdHkgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2hvd0VudGl0eUxpc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvV29ya3NoZWV0VmlldygpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zaG93RW50aXR5TGlzdCkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2RvZXMgbm90IGNsZWFyIHNlbGVjdGVkIGlkZW50aXR5IGlmIHVuc2F2ZWQgZGVjaXNpb24gZGlhbG9nIGlzIHJlamVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSA9IHsgc29tZTogJ3BlcnNvbid9O1xuICAgICAgICAgICAgICAgIHJlamVjdFVuc2F2ZWREZWNpc2lvbnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvV29ya3NoZWV0VmlldygpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNlbGVjdGVkRW50aXR5KS50b0VxdWFsKHsgc29tZTogJ3BlcnNvbid9KTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldFZpZXdTdGF0ZSgpKS50b0VxdWFsKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZXRhaWxWaWV3U3RhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBjaGVjayBmb3IgdW5zYXZlZCBkZWNpc2lvbnMgaWYgc2VsZWN0ZWRFbnRpdHkgaXMgbm90IHNldCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9Xb3Jrc2hlZXRWaWV3KCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrRm9yVW5zYXZlZERlY2lzaW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZ29Ub0RldGFpbFZpZXcnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCAoJ3Rocm93cyB3aXRob3V0IGFuIGVudGl0eUlkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldygpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2hpZGVzIHRoZSBlbnRpdHkgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJzEyMzQnLCBzb21lOiAncGVyc29uJ307XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnNob3dFbnRpdHlMaXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ2dldEVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGVudGl0eSkpO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldyhlbnRpdHkuaWQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zaG93RW50aXR5TGlzdCkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2ZldGNoZXMgdGhlIGZ1bGwgZW50aXR5IHRoZW4gc2V0cyB0aGUgc2VsZWN0ZWQgZW50aXR5IGFuZCByZXNldHMgdGhlIGRldGFpbCB2aWV3IHN0YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB7IGlkOiAnMTIzNCcsIHNvbWU6ICdwZXJzb24nfTtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ2dldEVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGVudGl0eSkpO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldyhlbnRpdHkuaWQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9FcXVhbChlbnRpdHkpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZXRhaWxNb2Nrcy5yZXNldCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydCwgZW50aXR5KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgZmV0Y2ggZnVsbCBlbnRpdHkgaWYgY2hlY2sgZm9yIHVuc2F2ZWQgZGVjaXNpb25zIGlzIHJlamVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSB7IGlkOiAnMTIzNCcsIHNvbWU6ICdwZXJzb24nfTtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ2dldEVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGVudGl0eSkpO1xuICAgICAgICAgICAgICAgIHJlamVjdFVuc2F2ZWREZWNpc2lvbnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldyhlbnRpdHkuaWQpO1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGV0YWlsTW9ja3MucmVzZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2RvZXMgbm90IGNoZWNrIGZvciB1bnNhdmVkIGRlY2lzaW9ucyBpZiBzd2l0Y2hpbmcgYmV0d2VlbiBlbnRpdGllcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJzEyMzQnLCBzb21lOiAncGVyc29uJ307XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdnZXRFbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihlbnRpdHkpKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkgPSB7IGFub3RoZXI6ICdlbnRpdHknIH07XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9EZXRhaWxWaWV3KGVudGl0eS5pZCk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrRm9yVW5zYXZlZERlY2lzaW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGV0YWlsTW9ja3MucmVzZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZW50aXR5IHBhZ2VyIGlzIHNhdmVkIGlmIGNhbGxiYWNrIGlzIHN1cHBsaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwYWdlciA9IHsgaTogJ2FtIGEgcGFnZXIgLi4uIDE5OTBzIHJlcHJlc2VudCEhJyB9O1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHlQYWdlckNhbGxiYWNrID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihwYWdlcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJzEyMzQnLCBzb21lOiAncGVyc29uJ307XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdnZXRFbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihlbnRpdHkpKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ29Ub0RldGFpbFZpZXcoZW50aXR5LmlkLCBlbnRpdHlQYWdlckNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGVudGl0eVBhZ2VyQ2FsbGJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmVudGl0eUxpc3RQYWdlcikudG9FcXVhbChwYWdlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3JlZnJlc2hWaWV3KCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgncmVmcmVzaGVzIGFuZCBjb25zdHJhaW5zIGZvciB3b3Jrc2hlZXQgdmlldycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UucmVmcmVzaFZpZXcoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qod29ya3NoZWV0TW9ja3MucmVzZXQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qod29ya3NoZWV0TW9ja3MucmVmcmVzaEN1cnJlbnRUYWIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZmV0Y2hlcyBlbnRpdHkgYW5kIHJlc2V0cyB2aWV3IGZvciBkZXRhaWwgdmlldycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJ3BlcnNvbid9O1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLCAnZ2V0RW50aXR5JykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZW50aXR5KSk7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9EZXRhaWxWaWV3KGVudGl0eSk7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UucmVmcmVzaFZpZXcoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0RW50aXR5KVxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgZW50aXR5LmlkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGV0YWlsTW9ja3MucmVzZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnQsIGVudGl0eSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzY3JpYmUoJ3dpdGggYXV0by1hZHZhbmNlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHkxLCBlbnRpdHkxQ29tcGxldGVkLCBlbnRpdHkyO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlTW9ja0VudGl0eShpZCwgY29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGxldGU6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKGNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tQYWdlcihoYXNOZXh0LCBuZXh0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc05leHQ6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKGhhc05leHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUobmV4dElkKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHkxID0gY3JlYXRlTW9ja0VudGl0eSgnZW50aXR5MScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5MUNvbXBsZXRlZCA9IGNyZWF0ZU1vY2tFbnRpdHkoJ2VudGl0eTEnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5MiA9IGNyZWF0ZU1vY2tFbnRpdHkoJ2VudGl0eTInLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTW9jayBnZXRFbnRpdHkoKSB0byByZXR1cm46XG4gICAgICAgICAgICAgICAgICAgIC8vIDEpIEZpcnN0IGNhbGw6IGVudGl0eTEgKGluY29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIC8vIDIpIFNlY29uZCBjYWxsOiBlbnRpdHkxIChjb21wbGV0ZSkgdG8gc2ltdWxhdGUgY29tcGxldGluZyB0aGUgZW50aXR5XG4gICAgICAgICAgICAgICAgICAgIC8vIDMpIFRoaXJkIGNhbGw6IGVudGl0eTIgZm9yIHRoZSBhdXRvLWFkdmFuY2VcbiAgICAgICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdnZXRFbnRpdHknKS5hbmQuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZXMoJHEud2hlbihlbnRpdHkxKSwgJHEud2hlbihlbnRpdHkxQ29tcGxldGVkKSwgJHEud2hlbihlbnRpdHkyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgb24gdGhlIGRldGFpbCB2aWV3LlxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9EZXRhaWxWaWV3KGVudGl0eTEpO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkuY2FsbHMuY291bnQoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9CZShlbnRpdHkxKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGl0KCdzdGF5cyBvbiB0aGUgc2FtZSBlbnRpdHkgaWYgdGhlcmUgaXMgbm8gcGFnZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5yZWZyZXNoVmlldyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0RW50aXR5LmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkpLnRvQmUoZW50aXR5MUNvbXBsZXRlZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpdCgnc3RheXMgb24gdGhlIHNhbWUgZW50aXR5IGlmIHdlIGFyZSBvbiB0aGUgbGFzdCBlbnRpdHkgaW4gdGhlIHBhZ2VyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZW50aXR5TGlzdFBhZ2VyID0gY3JlYXRlTW9ja1BhZ2VyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZnJlc2hWaWV3KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkuY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9CZShlbnRpdHkxQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGl0KCdzdGF5cyBvbiB0aGUgc2FtZSBlbnRpdHkgaWYgdGhlIGVudGl0eSBpcyBub3QgY29tcGxldGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJld2lyZSBlbnRpdHkxIHRvIG5vdCBiZSBjb21wbGV0ZSB3aGVuIHdlIHJlZmV0Y2ggaXQuXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eTFDb21wbGV0ZWQuaXNDb21wbGV0ZSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmVudGl0eUxpc3RQYWdlciA9IGNyZWF0ZU1vY2tQYWdlcih0cnVlLCBlbnRpdHkyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZnJlc2hWaWV3KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkuY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9CZShlbnRpdHkxQ29tcGxldGVkKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGl0KCdtb3ZlcyB0byB0aGUgbmV4dCBlbnRpdHkgaWYgdGhlIGN1cnJlbnQgZW50aXR5IGlzIGNvbXBsZXRlIGFuZCB0aGVyZSBhcmUgbW9yZSBlbnRpdGllcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmVudGl0eUxpc3RQYWdlciA9IGNyZWF0ZU1vY2tQYWdlcih0cnVlLCBlbnRpdHkyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnJlZnJlc2hWaWV3KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRFbnRpdHkuY2FsbHMuY291bnQoKSkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zZWxlY3RlZEVudGl0eSkudG9CZShlbnRpdHkyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMoKScsICgpID0+IHtcbiAgICAgICAgbGV0IGRlY2lzaW9uQ291bnQsIHJlc29sdmVEaWFsb2csIHNwTW9kYWw7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfc3BNb2RhbF8pID0+IHtcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5jYWxsRmFrZSgoKSA9PiByZXNvbHZlRGlhbG9nID8gJHEud2hlbigpIDogJHEucmVqZWN0KCkpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoY2VydCk7XG4gICAgICAgICAgICBkZWNpc2lvbkNvdW50ID0gMjtcbiAgICAgICAgICAgIHJlc29sdmVEaWFsb2cgPSB0cnVlO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldERlY2lzaW9uQ291bnQnKS5hbmQuY2FsbEZha2UoKCkgPT4gZGVjaXNpb25Db3VudCk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnY2xlYXJEZWNpc2lvbnMnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHJlc29sdmVkIHByb21pc2UgaWYgbm8gZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICBkZWNpc2lvbkNvdW50ID0gMDtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5jaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMoKS50aGVuKCgpID0+IHJlc29sdmVkID0gdHJ1ZSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RGVjaXNpb25Db3VudCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIGRpYWxvZyBhbmQgcmV0dXJucyBwcm9taXNlIGlmIGRlY2lzaW9ucyBleGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrRm9yVW5zYXZlZERlY2lzaW9ucygpLnRoZW4oKCkgPT4gcmVzb2x2ZWQgPSB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldERlY2lzaW9uQ291bnQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjbGVhcnMgZGVjaXNpb25zIGlmIHRoZSBkaWFsb2cgcmVzb2x2ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2hlY2tGb3JVbnNhdmVkRGVjaXNpb25zKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuY2xlYXJEZWNpc2lvbnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGNsZWFyIGRlY2lzaW9ucyBpZiB0aGUgZGlhbG9nIHJlamVjdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlRGlhbG9nID0gZmFsc2U7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2hlY2tGb3JVbnNhdmVkRGVjaXNpb25zKCkuY2F0Y2goZXhwZWN0UmVqZWN0KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5jbGVhckRlY2lzaW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2tUYWJsZVByZVNlYXJjaCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZShjZXJ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcmVzb2x2ZWQgcHJvbWlzZSBpZiBmaWx0ZXIgdmFsdWVzIG1hdGNoJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlYXJjaERhdGEgPSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGE6ICdiJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJlc3VsdDtcblxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnY2hlY2tGb3JVbnNhdmVkRGVjaXNpb25zJyk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2hlY2tUYWJsZVByZVNlYXJjaChzZWFyY2hEYXRhLCBzZWFyY2hEYXRhKS50aGVuKCgpID0+IHJlc3VsdCA9IHRydWUpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrRm9yVW5zYXZlZERlY2lzaW9ucykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NoZWNrcyBmb3IgdW5zYXZlZCBkZWNpc2lvbnMgaWYgZmlsdGVyIHZhbHVlcyBkbyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb2xkU2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgYTogJ2InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbmV3U2VhcmNoRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IHt9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBKdXN0IGNoZWNraW5nIHdlIHBhc3MgdGhlIHJlc3VsdCBvZiB0aGlzIG1ldGhvZCBjYWxsIGJhY2ssIHNob3VsZCBiZSBhIHByb21pc2UgYnV0IHdoYXRldmVyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdjaGVja0ZvclVuc2F2ZWREZWNpc2lvbnMnKS5hbmQucmV0dXJuVmFsdWUoJ3doYXRldmVyJyk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrVGFibGVQcmVTZWFyY2gob2xkU2VhcmNoRGF0YSwgbmV3U2VhcmNoRGF0YSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbCgnd2hhdGV2ZXInKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2hlY2tGb3JVbnNhdmVkRGVjaXNpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RvZ2dsZUVudGl0eUxpc3QoKSBmbGlwcyB0aGUgdmFsdWUgb2Ygc2hvd0VudGl0eUxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zaG93RW50aXR5TGlzdCkudG9CZUZhbHN5KCk7XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS50b2dnbGVFbnRpdHlMaXN0KCk7XG4gICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2hvd0VudGl0eUxpc3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLnRvZ2dsZUVudGl0eUxpc3QoKTtcbiAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5zaG93RW50aXR5TGlzdCkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
