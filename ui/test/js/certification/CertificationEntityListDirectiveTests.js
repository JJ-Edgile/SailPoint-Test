System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationEntityListDirective', function () {

                var certificationEntityService = undefined,
                    certificationDataService = undefined,
                    ListResultDTO = undefined,
                    CertificationEntity = undefined,
                    Certification = undefined,
                    $q = undefined,
                    entitiesResult = undefined,
                    entityId = undefined,
                    certificationType = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$q_, certificationTestData, _certificationEntityService_, _ListResultDTO_, _CertificationEntity_, _certificationDataService_, _Certification_) {
                    certificationEntityService = _certificationEntityService_;
                    certificationDataService = _certificationDataService_;
                    CertificationEntity = _CertificationEntity_;
                    Certification = _Certification_;
                    ListResultDTO = _ListResultDTO_;
                    $q = _$q_;

                    // Create some mock data
                    var json = angular.copy(certificationTestData.CERTIFICATION_ENTITY_LIST_RESULT);
                    json.objects = json.objects.map(function (object) {
                        return new CertificationEntity(object);
                    });
                    entitiesResult = new ListResultDTO(json);
                    entityId = json.objects[0].id;

                    spyOn(certificationEntityService, 'getCertificationEntities').and.callFake(function () {
                        return $q.when({
                            data: entitiesResult
                        });
                    });

                    // For most tests we want manager, but some will override this then set it back.
                    certificationType = Certification.Type.Manager;
                    spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                        return certificationType;
                    });
                }));

                function setupResults(total, start, count) {
                    var objects = [];
                    for (var i = start; i < start + count; i++) {
                        objects.push(new CertificationEntity({
                            id: 'id' + i,
                            displayableName: 'name' + i
                        }));
                    }

                    entitiesResult = new ListResultDTO({
                        count: total,
                        objects: objects
                    });
                }

                function setupBulkEntityDecisions() {
                    var bulkEntityDecisions = ['foo', 'bar'];
                    spyOn(certificationDataService, 'getConfiguration').and.returnValue({
                        bulkEntityDecisions: bulkEntityDecisions
                    });
                    return bulkEntityDecisions;
                }

                describe('controller', function () {

                    var $stateParams = undefined,
                        $controller = undefined,
                        $rootScope = undefined,
                        CertificationEntityListState = undefined,
                        showItemStatusCounts = undefined;

                    beforeEach(inject(function (_$controller_, _$rootScope_, _CertificationEntityListState_) {
                        $controller = _$controller_;
                        $rootScope = _$rootScope_;
                        CertificationEntityListState = _CertificationEntityListState_;

                        showItemStatusCounts = false;

                        // Create some mock data
                        $stateParams = {
                            certificationId: 'someCert'
                        };
                    }));

                    /**
                     * Create the controller.
                     *
                     * @param {CertificationEntityListState} [state]  The optional state to use for the controller.
                     *
                     * @return {CertificationEntityListDirectiveCtrl} The controller.
                     */
                    function createController(state) {
                        var ctrl = $controller('CertificationEntityListDirectiveCtrl', {
                            $stateParams: $stateParams,
                            $scope: $rootScope
                        }, {
                            state: state,
                            showItemStatusCounts: showItemStatusCounts
                        });

                        ctrl.$onInit();
                        return ctrl;
                    }

                    describe('constructor', function () {
                        it('should load entities when created', function () {
                            createController();
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalled();
                        });

                        it('should create a DataRefreshTrigger with refresh action of fetchEntities()', function () {
                            var ctrl = createController();
                            spyOn(ctrl, 'fetchEntities');
                            spyOn(ctrl.state.checkboxMultiSelect.selectionModel, 'clear');
                            expect(ctrl.refreshTrigger).toBeDefined();
                            ctrl.refreshTrigger.refresh();
                            expect(ctrl.fetchEntities).toHaveBeenCalled();
                            expect(ctrl.state.checkboxMultiSelect.selectionModel.clear).toHaveBeenCalled();
                        });
                    });

                    describe('loadEntities()', function () {
                        it('should call certificationEntityService.getCertificationEntities', function () {
                            var ctrl = createController();
                            $rootScope.$digest();
                            certificationEntityService.getCertificationEntities.calls.reset();
                            ctrl.loadEntities();
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(ctrl.id, 0, 20, undefined, null, null, false);
                        });

                        it('gets item counts when requested', function () {
                            showItemStatusCounts = true;
                            var ctrl = createController();
                            $rootScope.$digest();
                            certificationEntityService.getCertificationEntities.calls.reset();
                            ctrl.loadEntities();
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(ctrl.id, 0, 20, undefined, null, null, true);
                        });
                    });

                    describe('loadMoreEntities()', function () {
                        it('increments the page if there are more', function () {
                            setupResults(25, 0, 20);
                            var ctrl = createController();
                            $rootScope.$digest();
                            expect(ctrl.state.pagesDisplayed).toEqual(1);
                            ctrl.loadMoreEntities();
                            expect(ctrl.state.pagesDisplayed).toEqual(2);
                        });

                        it('does not increment the page if there are no more results', function () {
                            setupResults(5, 0, 5);
                            var ctrl = createController();
                            $rootScope.$digest();
                            expect(ctrl.state.pagesDisplayed).toEqual(1);
                            ctrl.loadMoreEntities();
                            expect(ctrl.state.pagesDisplayed).toEqual(1);
                        });

                        it('calls getCertificationEntities()', function () {
                            setupResults(25, 0, 20);
                            var ctrl = createController();
                            $rootScope.$digest();
                            certificationEntityService.getCertificationEntities.calls.reset();
                            ctrl.loadMoreEntities();
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(ctrl.id, 20, 20, undefined, null, null, false);
                        });
                    });

                    describe('fetchEntities()', function () {
                        it('does not load again if already loading', function () {
                            var ctrl = createController();
                            expect(ctrl.loadingEntities).toEqual(true);
                            expect(certificationEntityService.getCertificationEntities.calls.count()).toEqual(1);

                            // Now try to fetch while the other one is still pending - check that it does nothing.
                            ctrl.fetchEntities();
                            expect(certificationEntityService.getCertificationEntities.calls.count()).toEqual(1);

                            // Let the first promise resolve, then try again.  This one should go through.
                            $rootScope.$digest();
                            expect(ctrl.loadingEntities).toEqual(false);
                            ctrl.fetchEntities();
                            expect(certificationEntityService.getCertificationEntities.calls.count()).toEqual(2);
                        });

                        it('loads the first 20 the first time it is called', function () {
                            var ctrl = createController();
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(ctrl.id, 0, 20, undefined, null, null, false);
                        });

                        it('starts where it left off when loading subsequent pages', function () {
                            // Load the first 20 when constructed.
                            setupResults(45, 0, 20);
                            var ctrl = createController();
                            $rootScope.$digest();
                            expect(ctrl.entityListData.length).toEqual(20);

                            // Now load the next 20, and make sure they are appended.
                            setupResults(45, 20, 20);
                            ctrl.state.pagesDisplayed = 2;
                            ctrl.fetchEntities();
                            $rootScope.$digest();
                            expect(ctrl.entityListData.length).toEqual(40);
                        });

                        it('loads the full list size if called with multiple pages and no data has been loaded', function () {
                            // Setup a state that will make 3 pages of data be loaded upon construction.
                            var state = new CertificationEntityListState();
                            state.pagesDisplayed = 3;

                            // Create a controller - this will cause the fetch to occur.
                            setupResults(65, 0, 60);
                            var ctrl = createController(state);
                            expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith(ctrl.id, 0, 60, undefined, null, null, false);
                            $rootScope.$digest();
                            expect(ctrl.entityListData.length).toEqual(60);
                        });

                        it('stores the total list size on the controller', function () {
                            var total = 23;
                            setupResults(total, 0, 20);
                            var ctrl = createController();
                            $rootScope.$digest();
                            expect(ctrl.entityListCount).toEqual(total);
                        });
                    });

                    describe('getBulkEntityDecisions()', function () {
                        it('calls certificationDataService.getConfiguration', function () {
                            var bulkEntityDecisions = setupBulkEntityDecisions(),
                                ctrl = createController();
                            var val = ctrl.getBulkEntityDecisions();
                            expect(certificationDataService.getConfiguration).toHaveBeenCalled();
                            expect(val).toBe(bulkEntityDecisions);
                        });

                        it('returns empty array if getConfiguration is undefined', function () {
                            var ctrl = createController();
                            spyOn(certificationDataService, 'getConfiguration').and.returnValue(undefined);
                            var val = ctrl.getBulkEntityDecisions();
                            expect(certificationDataService.getConfiguration).toHaveBeenCalled();
                            expect(val).toEqual([]);
                        });
                    });

                    describe('getEntityName()', function () {
                        it('should truncate names longer than MAX_ENTITY_DISPLAY_LENGTH', function () {
                            var ctrl = createController(),
                                shortName = {
                                displayableName: 'Adam Sandler'
                            },
                                longName = {
                                displayableName: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff'
                            },
                                truncatedLongName = {
                                displayableName: 'Hubert Blaine Wolfes...'
                            };

                            expect(ctrl.getEntityName(shortName)).toBe(shortName.displayableName);
                            expect(ctrl.getEntityName(longName)).toBe(truncatedLongName.displayableName);
                        });

                        it('should truncate names longer than MAX_WIDE_ENTITY_DISPLAY_LENGTH', function () {
                            var ctrl = createController(),
                                shortName = {
                                displayableName: 'Adam Sandler'
                            },
                                longName = {
                                displayableName: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff'
                            },
                                truncatedLongName = {
                                displayableName: 'Hubert Blaine Wolfeschlegelsteinhausenbe...'
                            };

                            // We expect a different max length for some cert types.
                            try {
                                certificationType = Certification.Type.DataOwner;
                                expect(ctrl.getEntityName(shortName)).toBe(shortName.displayableName);
                                expect(ctrl.getEntityName(longName)).toBe(truncatedLongName.displayableName);
                                certificationType = Certification.Type.AccountGroupMembership;
                                expect(ctrl.getEntityName(shortName)).toBe(shortName.displayableName);
                                expect(ctrl.getEntityName(longName)).toBe(truncatedLongName.displayableName);
                                certificationType = Certification.Type.AccountGroupPermissions;
                                expect(ctrl.getEntityName(shortName)).toBe(shortName.displayableName);
                                expect(ctrl.getEntityName(longName)).toBe(truncatedLongName.displayableName);
                            } finally {
                                // Set it back.
                                certificationType = Certification.Type.Manager;
                            }
                        });
                    });

                    describe('isSelected()', function () {
                        it('compares to certificationDataService selectedEntity', function () {
                            var entity = { id: 'dummy' },
                                ctrl = createController();
                            certificationDataService.selectedEntity = entity;
                            expect(ctrl.isSelected(entity)).toEqual(true);
                        });

                        it('returns true if no entity passed and no selectedEntity set', function () {
                            var entity = { id: 'dummy' },
                                ctrl = createController();
                            certificationDataService.selectedEntity = undefined;
                            expect(ctrl.isSelected()).toEqual(true);
                            expect(ctrl.isSelected(entity)).toEqual(false);
                        });
                    });

                    it('goToDetailView() calls through to data service', function () {
                        var ctrl = createController(),
                            entityId = '1234',
                            entity = { id: '1234' };
                        spyOn(certificationDataService, 'goToDetailView');
                        ctrl.goToDetailView(entity);
                        expect(certificationDataService.goToDetailView).toHaveBeenCalledWith(entityId, null);
                    });

                    it('goToWorksheetView() calls through to data service', function () {
                        var ctrl = createController();
                        spyOn(certificationDataService, 'goToWorksheetView');
                        ctrl.goToWorksheetView();
                        expect(certificationDataService.goToWorksheetView).toHaveBeenCalled();
                    });

                    describe('showUndoEntityDelegation', function () {
                        var ctrl = undefined,
                            cert = undefined,
                            entity = undefined;

                        beforeEach(inject(function (Certification, certificationTestData) {
                            ctrl = createController();
                            cert = new Certification(certificationTestData.CERTIFICATION_1);
                            spyOn(certificationDataService, 'getCertification').and.returnValue(cert);
                        }));

                        function testShowUndoEntityDelegationTest(isDelegated, isEditable, expected) {
                            entity = {
                                isEntityDelegated: function () {
                                    return isDelegated;
                                }
                            };
                            cert.editable = isEditable;

                            var showUndoBtn = ctrl.showUndoEntityDelegation(entity);
                            expect(showUndoBtn).toBe(expected);
                        }

                        it('is false if certification is not editable', function () {
                            testShowUndoEntityDelegationTest(true, false, false);
                        });

                        it('is false if entity is not delegated', function () {
                            testShowUndoEntityDelegationTest(false, true, false);
                        });

                        it('is true if entity is delegated and certification is editable', function () {
                            testShowUndoEntityDelegationTest(true, true, true);
                        });
                    });

                    describe('getAllEntitiesStr()', function () {
                        var val = undefined,
                            ctrl = undefined;

                        beforeEach(inject(function (Certification, certificationTestData) {
                            ctrl = createController();
                        }));

                        it('All entities str should be ui_cert_all_identities for Manager cert', function () {
                            val = ctrl.getAllEntitiesStr();
                            expect(val).toBe('ui_cert_all_identities');
                        });

                        it('All entities str should be ui_cert_all_entitlements for Entitlement Owner cert', function () {
                            try {
                                certificationType = Certification.Type.DataOwner;
                                val = ctrl.getAllEntitiesStr();
                                expect(val).toBe('ui_cert_all_entitlements');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });

                        it('All entities str should be ui_cert_all_account_groups for Account Group Membership cert', function () {
                            try {
                                certificationType = Certification.Type.AccountGroupMembership;
                                val = ctrl.getAllEntitiesStr();
                                expect(val).toBe('ui_cert_all_account_groups');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });

                        it('All entities str should be ui_cert_all_account_groups for Account Group Permissions cert', function () {
                            try {
                                certificationType = Certification.Type.AccountGroupPermissions;
                                val = ctrl.getAllEntitiesStr();
                                expect(val).toBe('ui_cert_all_account_groups');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });
                    });

                    describe('getAllEntitiesSrStr()', function () {
                        var val = undefined,
                            ctrl = undefined;

                        beforeEach(inject(function (Certification, certificationTestData) {
                            ctrl = createController();
                        }));

                        it('All entities sr str should be ui_cert_view_all_identities_sr for Manager cert', function () {
                            val = ctrl.getAllEntitiesSrStr();
                            expect(val).toBe('ui_cert_view_all_identities_sr');
                        });

                        it('All entities sr str should be ui_cert_view_all_entitlements_sr for Entitlement Owner cert', function () {
                            try {
                                certificationType = Certification.Type.DataOwner;
                                val = ctrl.getAllEntitiesSrStr();
                                expect(val).toBe('ui_cert_view_all_entitlements_sr');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });

                        it('All entities sr str should be ui_cert_view_all_entitlements_sr for AccountGroupMembership cert', function () {
                            try {
                                certificationType = Certification.Type.AccountGroupMembership;
                                val = ctrl.getAllEntitiesSrStr();
                                expect(val).toBe('ui_cert_view_all_account_groups_sr');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });

                        it('All entities sr str should be ui_cert_view_all_entitlements_sr for AccountGroupPermissions cert', function () {
                            try {
                                certificationType = Certification.Type.AccountGroupPermissions;
                                val = ctrl.getAllEntitiesSrStr();
                                expect(val).toBe('ui_cert_view_all_account_groups_sr');
                            } finally {
                                // Set cert type back.
                                certificationType = Certification.Type.Manager;
                            }
                        });
                    });
                });

                describe('directive', function () {

                    var $compile = undefined,
                        CertificationEntityListDirectiveConfig = undefined,
                        CertificationItem = undefined,
                        $scope = undefined,
                        $window = undefined,
                        element = undefined,
                        usePager = undefined,
                        showItemStatusCounts = undefined;

                    /* jshint maxparams:8 */
                    beforeEach(inject(function (_$compile_, $rootScope, $stateParams, certificationTestData, Certification, _$window_, _CertificationEntityListDirectiveConfig_, _CertificationItem_) {
                        $compile = _$compile_;
                        $scope = $rootScope.$new();
                        $window = _$window_;
                        CertificationEntityListDirectiveConfig = _CertificationEntityListDirectiveConfig_;
                        CertificationItem = _CertificationItem_;

                        usePager = false;
                        showItemStatusCounts = false;

                        // This is required by the directive.
                        $stateParams.certificationId = '1234';

                        var cert = new Certification(certificationTestData.CERTIFICATION_1);
                        spyOn(certificationDataService, 'getCertification').and.returnValue(cert);
                    }));

                    afterEach(function () {
                        if (element) {
                            element.remove();
                        }
                        if ($scope) {
                            // Destroy the scope so the sp-if-xs resize listener is cleaned up.
                            $scope.$destroy();
                        }
                    });

                    function createElement() {
                        var showBulk = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
                        var showSearch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
                        var statuses = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        var excludedStatuses = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

                        var elt = '<sp-certification-entity-list sp-config="config"\n                                               sp-use-entity-pager="usePager"\n                                               sp-show-item-status-counts="showItemStatusCounts" />';

                        element = angular.element(elt);

                        $scope.config = new CertificationEntityListDirectiveConfig({
                            showBulkDecisions: showBulk,
                            showSearch: showSearch,
                            statuses: statuses,
                            excludedStatuses: excludedStatuses
                        });

                        $scope.usePager = usePager;
                        $scope.showItemStatusCounts = showItemStatusCounts;

                        $compile(element)($scope);
                        $scope.$digest();

                        // Make it desktop sized by default.
                        $window.innerWidth = 1024;
                        $scope.$digest();
                    }

                    describe('header', function () {
                        function hasHeader() {
                            return element.find('.cert-id-menu-header').length > 0;
                        }

                        it('is displayed if showing bulk selections', function () {
                            setupBulkEntityDecisions();
                            createElement(true, false);
                            expect(hasHeader()).toEqual(true);
                        });

                        it('is displayed if showing the search box', function () {
                            createElement(false, true);
                            expect(hasHeader()).toEqual(true);
                        });

                        it('is not displayed if bulk and the search bar are not available', function () {
                            createElement(false, false);
                            expect(hasHeader()).toEqual(false);
                        });
                    });

                    it('search filters the list when the button is clicked', function () {
                        createElement(false, true);

                        certificationEntityService.getCertificationEntities.calls.reset();
                        var searchField = element.find('#idSearchField');
                        searchField.val('love');
                        searchField.trigger('input');
                        var searchButton = element.find('#idSearchBtn');
                        searchButton.click();

                        expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith('1234', 0, 20, 'love', null, null, false);
                    });

                    it('filters based on status if passed into config', function () {
                        var statuses = [CertificationItem.Status.Complete];
                        createElement(false, false, statuses);
                        expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith('1234', 0, 20, undefined, statuses, null, false);
                    });

                    it('filters based on excluded status if passed into config', function () {
                        var statuses = [CertificationItem.Status.Complete];
                        createElement(false, false, null, statuses);
                        expect(certificationEntityService.getCertificationEntities).toHaveBeenCalledWith('1234', 0, 20, undefined, null, statuses, false);
                    });

                    it('table is displayed on desktop', function () {
                        createElement();
                        var table = element.find('table.cert-id-list');
                        expect(table.length).toEqual(1);
                    });

                    describe('mobile', function () {
                        function mobilize() {
                            $window.innerWidth = 667;
                            $scope.$digest();
                        }

                        beforeEach(function () {
                            // Use a single result so it is easier to click.
                            setupResults(1, 0, 1);
                        });

                        function clickCard() {
                            var cards = element.find('div.cert-entity-list-cards');
                            var card = cards.find('.panel-body');
                            card.click();
                        }

                        it('shows cards', function () {
                            createElement();
                            mobilize();
                            var cards = element.find('div.cert-entity-list-cards');
                            expect(cards.length).toEqual(1);
                        });

                        it('shows the remaining item count when requested', function () {
                            // Mock out the getIncompleteCount() method on the one entity that is returned.
                            var incompleteCount = 3478;
                            entitiesResult.objects[0].itemStatusCount = {
                                getIncompleteCount: jasmine.createSpy('getIncompleteCount').and.returnValue(incompleteCount)
                            };

                            // Setup the directive to display the counts.
                            showItemStatusCounts = true;

                            createElement();
                            mobilize();
                            var counts = element.find('div.cert-entity-list-cards > .panel > .panel-body > span.pull-right > span.label');
                            expect(counts.length).toEqual(1);
                            expect(counts.text().trim()).toEqual(incompleteCount.toString(10));
                        });

                        it('goes to the detail view when a card is clicked', function () {
                            createElement();
                            mobilize();
                            spyOn(certificationDataService, 'goToDetailView');
                            clickCard();
                            expect(certificationDataService.goToDetailView).toHaveBeenCalledWith('id0', null);
                        });

                        it('passes a callback when paging is configured and a card is clicked', function () {
                            var pagerId = '123837734';
                            usePager = true;
                            createElement();
                            mobilize();

                            spyOn(certificationEntityService, 'getCertificationEntityIds').and.returnValue($q.when([pagerId]));
                            spyOn(certificationDataService, 'goToDetailView');
                            clickCard();
                            expect(certificationDataService.goToDetailView).toHaveBeenCalled();

                            var args = certificationDataService.goToDetailView.calls.mostRecent().args;
                            expect(args[0]).toEqual('id0');
                            expect(angular.isFunction(args[1])).toEqual(true);

                            var pager = undefined;
                            args[1]().then(function (entityPager) {
                                return pager = entityPager;
                            });
                            $scope.$digest();
                            expect(certificationEntityService.getCertificationEntityIds).toHaveBeenCalled();
                            expect(pager.currentIdx).toEqual(0);
                            expect(pager.entityIds).toEqual([pagerId]);
                        });
                    });

                    it('load more button', function () {
                        function getButton() {
                            return element.find('button.load-more');
                        }

                        function hasButton() {
                            return getButton().length > 0;
                        }

                        it('is not displayed if there are no more results', function () {
                            setupResults(5, 0, 5);
                            createElement();
                            expect(hasButton()).toEqual(false);
                        });

                        it('is displayed if there are more results', function () {
                            setupResults(25, 0, 20);
                            createElement();
                            expect(hasButton()).toEqual(true);
                        });

                        it('loads the next page of data when clicked', function () {
                            // Do an initial load of the first 20 identities.
                            setupResults(25, 0, 20);
                            createElement();
                            var button = getButton();

                            // Make the button click return 5 more identities.
                            setupResults(25, 20, 5);
                            button.click();

                            // Check that we have 25 rows now (well ... actually 26 because of the "Worksheet View" row).
                            var rows = element.find('table.cert-id-list tr');
                            expect(rows.length).toEqual(26);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7O0lBR2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLG9DQUFvQyxZQUFXOztnQkFFcEQsSUFBSSw2QkFBMEI7b0JBQUUsMkJBQXdCO29CQUFFLGdCQUFhO29CQUFFLHNCQUFtQjtvQkFBRSxnQkFBYTtvQkFDdkcsS0FBRTtvQkFBRSxpQkFBYztvQkFBRSxXQUFRO29CQUFFLG9CQUFpQjs7Z0JBRW5ELFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxNQUFNLHVCQUF1Qiw4QkFBOEIsaUJBQzNELHVCQUF1Qiw0QkFBNEIsaUJBQWlCO29CQUMzRiw2QkFBNkI7b0JBQzdCLDJCQUEyQjtvQkFDM0Isc0JBQXNCO29CQUN0QixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsS0FBSzs7O29CQUdMLElBQUksT0FBTyxRQUFRLEtBQUssc0JBQXNCO29CQUM5QyxLQUFLLFVBQVUsS0FBSyxRQUFRLElBQUksVUFBQSxRQUFNO3dCQWN0QixPQWQwQixJQUFJLG9CQUFvQjs7b0JBQ2xFLGlCQUFpQixJQUFJLGNBQWM7b0JBQ25DLFdBQVcsS0FBSyxRQUFRLEdBQUc7O29CQUUzQixNQUFNLDRCQUE0Qiw0QkFBNEIsSUFBSSxTQUFTLFlBQU07d0JBQzdFLE9BQU8sR0FBRyxLQUFLOzRCQUNYLE1BQU07Ozs7O29CQUtkLG9CQUFvQixjQUFjLEtBQUs7b0JBQ3ZDLE1BQU0sMEJBQTBCLHdCQUF3QixJQUFJLFNBQVMsWUFBQTt3QkFnQnJELE9BaEIyRDs7OztnQkFJL0UsU0FBUyxhQUFhLE9BQU8sT0FBTyxPQUFPO29CQUN2QyxJQUFJLFVBQVU7b0JBQ2QsS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLFFBQVEsT0FBTyxLQUFLO3dCQUN4QyxRQUFRLEtBQUssSUFBSSxvQkFBb0I7NEJBQ2pDLElBQUUsT0FBTzs0QkFDVCxpQkFBZSxTQUFTOzs7O29CQUloQyxpQkFBaUIsSUFBSSxjQUFjO3dCQUMvQixPQUFPO3dCQUNQLFNBQVM7Ozs7Z0JBSWpCLFNBQVMsMkJBQTJCO29CQUNoQyxJQUFJLHNCQUFzQixDQUFDLE9BQU87b0JBQ2xDLE1BQU0sMEJBQTBCLG9CQUFvQixJQUFJLFlBQVk7d0JBQ2hFLHFCQUFxQjs7b0JBRXpCLE9BQU87OztnQkFHWCxTQUFTLGNBQWMsWUFBTTs7b0JBRXpCLElBQUksZUFBWTt3QkFBRSxjQUFXO3dCQUFFLGFBQVU7d0JBQUUsK0JBQTRCO3dCQUFFLHVCQUFvQjs7b0JBRTdGLFdBQVcsT0FBTyxVQUFTLGVBQWUsY0FBYyxnQ0FBZ0M7d0JBQ3BGLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYiwrQkFBK0I7O3dCQUUvQix1QkFBdUI7Ozt3QkFHdkIsZUFBZTs0QkFDWCxpQkFBaUI7Ozs7Ozs7Ozs7O29CQVd6QixTQUFTLGlCQUFpQixPQUFPO3dCQUM3QixJQUFJLE9BQU8sWUFBWSx3Q0FBd0M7NEJBQ3ZELGNBQWM7NEJBQ2QsUUFBUTsyQkFDVDs0QkFDQyxPQUFPOzRCQUNQLHNCQUFzQjs7O3dCQUc5QixLQUFLO3dCQUNMLE9BQU87OztvQkFHWCxTQUFTLGVBQWUsWUFBTTt3QkFDMUIsR0FBRyxxQ0FBcUMsWUFBTTs0QkFDMUM7NEJBQ0EsT0FBTywyQkFBMkIsMEJBQTBCOzs7d0JBR2hFLEdBQUcsNkVBQTZFLFlBQU07NEJBQ2xGLElBQUksT0FBTzs0QkFDWCxNQUFNLE1BQU07NEJBQ1osTUFBTSxLQUFLLE1BQU0sb0JBQW9CLGdCQUFnQjs0QkFDckQsT0FBTyxLQUFLLGdCQUFnQjs0QkFDNUIsS0FBSyxlQUFlOzRCQUNwQixPQUFPLEtBQUssZUFBZTs0QkFDM0IsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLGVBQWUsT0FBTzs7OztvQkFJcEUsU0FBUyxrQkFBa0IsWUFBVzt3QkFDbEMsR0FBRyxtRUFBbUUsWUFBVzs0QkFDN0UsSUFBSSxPQUFPOzRCQUNYLFdBQVc7NEJBQ1gsMkJBQTJCLHlCQUF5QixNQUFNOzRCQUMxRCxLQUFLOzRCQUNMLE9BQU8sMkJBQTJCLDBCQUM3QixxQkFBcUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxXQUFXLE1BQU0sTUFBTTs7O3dCQUdyRSxHQUFHLG1DQUFtQyxZQUFNOzRCQUN4Qyx1QkFBdUI7NEJBQ3ZCLElBQUksT0FBTzs0QkFDWCxXQUFXOzRCQUNYLDJCQUEyQix5QkFBeUIsTUFBTTs0QkFDMUQsS0FBSzs0QkFDTCxPQUFPLDJCQUEyQiwwQkFDN0IscUJBQXFCLEtBQUssSUFBSSxHQUFHLElBQUksV0FBVyxNQUFNLE1BQU07Ozs7b0JBSXpFLFNBQVMsc0JBQXNCLFlBQU07d0JBQ2pDLEdBQUcseUNBQXlDLFlBQU07NEJBQzlDLGFBQWEsSUFBSSxHQUFHOzRCQUNwQixJQUFJLE9BQU87NEJBQ1gsV0FBVzs0QkFDWCxPQUFPLEtBQUssTUFBTSxnQkFBZ0IsUUFBUTs0QkFDMUMsS0FBSzs0QkFDTCxPQUFPLEtBQUssTUFBTSxnQkFBZ0IsUUFBUTs7O3dCQUc5QyxHQUFHLDREQUE0RCxZQUFNOzRCQUNqRSxhQUFhLEdBQUcsR0FBRzs0QkFDbkIsSUFBSSxPQUFPOzRCQUNYLFdBQVc7NEJBQ1gsT0FBTyxLQUFLLE1BQU0sZ0JBQWdCLFFBQVE7NEJBQzFDLEtBQUs7NEJBQ0wsT0FBTyxLQUFLLE1BQU0sZ0JBQWdCLFFBQVE7Ozt3QkFHOUMsR0FBRyxvQ0FBb0MsWUFBTTs0QkFDekMsYUFBYSxJQUFJLEdBQUc7NEJBQ3BCLElBQUksT0FBTzs0QkFDWCxXQUFXOzRCQUNYLDJCQUEyQix5QkFBeUIsTUFBTTs0QkFDMUQsS0FBSzs0QkFDTCxPQUFPLDJCQUEyQiwwQkFDN0IscUJBQXFCLEtBQUssSUFBSSxJQUFJLElBQUksV0FBVyxNQUFNLE1BQU07Ozs7b0JBSTFFLFNBQVMsbUJBQW1CLFlBQU07d0JBQzlCLEdBQUcsMENBQTBDLFlBQU07NEJBQy9DLElBQUksT0FBTzs0QkFDWCxPQUFPLEtBQUssaUJBQWlCLFFBQVE7NEJBQ3JDLE9BQU8sMkJBQTJCLHlCQUF5QixNQUFNLFNBQVMsUUFBUTs7OzRCQUdsRixLQUFLOzRCQUNMLE9BQU8sMkJBQTJCLHlCQUF5QixNQUFNLFNBQVMsUUFBUTs7OzRCQUdsRixXQUFXOzRCQUNYLE9BQU8sS0FBSyxpQkFBaUIsUUFBUTs0QkFDckMsS0FBSzs0QkFDTCxPQUFPLDJCQUEyQix5QkFBeUIsTUFBTSxTQUFTLFFBQVE7Ozt3QkFHdEYsR0FBRyxrREFBa0QsWUFBTTs0QkFDdkQsSUFBSSxPQUFPOzRCQUNYLE9BQU8sMkJBQTJCLDBCQUM3QixxQkFBcUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxXQUFXLE1BQU0sTUFBTTs7O3dCQUdyRSxHQUFHLDBEQUEwRCxZQUFNOzs0QkFFL0QsYUFBYSxJQUFJLEdBQUc7NEJBQ3BCLElBQUksT0FBTzs0QkFDWCxXQUFXOzRCQUNYLE9BQU8sS0FBSyxlQUFlLFFBQVEsUUFBUTs7OzRCQUczQyxhQUFhLElBQUksSUFBSTs0QkFDckIsS0FBSyxNQUFNLGlCQUFpQjs0QkFDNUIsS0FBSzs0QkFDTCxXQUFXOzRCQUNYLE9BQU8sS0FBSyxlQUFlLFFBQVEsUUFBUTs7O3dCQUcvQyxHQUFHLHNGQUFzRixZQUFNOzs0QkFFM0YsSUFBSSxRQUFRLElBQUk7NEJBQ2hCLE1BQU0saUJBQWlCOzs7NEJBR3ZCLGFBQWEsSUFBSSxHQUFHOzRCQUNwQixJQUFJLE9BQU8saUJBQWlCOzRCQUM1QixPQUFPLDJCQUEyQiwwQkFDOUIscUJBQXFCLEtBQUssSUFBSSxHQUFHLElBQUksV0FBVyxNQUFNLE1BQU07NEJBQ2hFLFdBQVc7NEJBQ1gsT0FBTyxLQUFLLGVBQWUsUUFBUSxRQUFROzs7d0JBRy9DLEdBQUcsZ0RBQWdELFlBQU07NEJBQ3JELElBQUksUUFBUTs0QkFDWixhQUFhLE9BQU8sR0FBRzs0QkFDdkIsSUFBSSxPQUFPOzRCQUNYLFdBQVc7NEJBQ1gsT0FBTyxLQUFLLGlCQUFpQixRQUFROzs7O29CQUs3QyxTQUFTLDRCQUE0QixZQUFNO3dCQUN2QyxHQUFHLG1EQUFtRCxZQUFNOzRCQUN4RCxJQUFJLHNCQUFzQjtnQ0FDdEIsT0FBTzs0QkFDWCxJQUFJLE1BQU0sS0FBSzs0QkFDZixPQUFPLHlCQUF5QixrQkFBa0I7NEJBQ2xELE9BQU8sS0FBSyxLQUFLOzs7d0JBR3JCLEdBQUcsd0RBQXdELFlBQU07NEJBQzdELElBQUksT0FBTzs0QkFDWCxNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxZQUFZOzRCQUNwRSxJQUFJLE1BQU0sS0FBSzs0QkFDZixPQUFPLHlCQUF5QixrQkFBa0I7NEJBQ2xELE9BQU8sS0FBSyxRQUFROzs7O29CQUk1QixTQUFTLG1CQUFtQixZQUFXO3dCQUNuQyxHQUFHLCtEQUErRCxZQUFXOzRCQUN6RSxJQUFJLE9BQU87Z0NBQ1AsWUFBWTtnQ0FDUixpQkFBaUI7O2dDQUVyQixXQUFXO2dDQUNQLGlCQUFpQjs7Z0NBRXJCLG9CQUFvQjtnQ0FDaEIsaUJBQWlCOzs7NEJBR3pCLE9BQU8sS0FBSyxjQUFjLFlBQVksS0FBSyxVQUFVOzRCQUNyRCxPQUFPLEtBQUssY0FBYyxXQUFXLEtBQUssa0JBQWtCOzs7d0JBR2hFLEdBQUcsb0VBQW9FLFlBQVc7NEJBQzlFLElBQUksT0FBTztnQ0FDUCxZQUFZO2dDQUNSLGlCQUFpQjs7Z0NBRXJCLFdBQVc7Z0NBQ1AsaUJBQWlCOztnQ0FFckIsb0JBQW9CO2dDQUNoQixpQkFBaUI7Ozs7NEJBSXpCLElBQUk7Z0NBQ0Esb0JBQW9CLGNBQWMsS0FBSztnQ0FDdkMsT0FBTyxLQUFLLGNBQWMsWUFBWSxLQUFLLFVBQVU7Z0NBQ3JELE9BQU8sS0FBSyxjQUFjLFdBQVcsS0FBSyxrQkFBa0I7Z0NBQzVELG9CQUFvQixjQUFjLEtBQUs7Z0NBQ3ZDLE9BQU8sS0FBSyxjQUFjLFlBQVksS0FBSyxVQUFVO2dDQUNyRCxPQUFPLEtBQUssY0FBYyxXQUFXLEtBQUssa0JBQWtCO2dDQUM1RCxvQkFBb0IsY0FBYyxLQUFLO2dDQUN2QyxPQUFPLEtBQUssY0FBYyxZQUFZLEtBQUssVUFBVTtnQ0FDckQsT0FBTyxLQUFLLGNBQWMsV0FBVyxLQUFLLGtCQUFrQjtzQ0FFeEQ7O2dDQUVKLG9CQUFvQixjQUFjLEtBQUs7Ozs7O29CQU9uRCxTQUFTLGdCQUFnQixZQUFNO3dCQUMzQixHQUFHLHVEQUF1RCxZQUFNOzRCQUM1RCxJQUFJLFNBQVMsRUFBRSxJQUFJO2dDQUNmLE9BQU87NEJBQ1gseUJBQXlCLGlCQUFpQjs0QkFDMUMsT0FBTyxLQUFLLFdBQVcsU0FBUyxRQUFROzs7d0JBRzVDLEdBQUcsOERBQThELFlBQU07NEJBQ25FLElBQUksU0FBUyxFQUFFLElBQUk7Z0NBQ2YsT0FBTzs0QkFDWCx5QkFBeUIsaUJBQWlCOzRCQUMxQyxPQUFPLEtBQUssY0FBYyxRQUFROzRCQUNsQyxPQUFPLEtBQUssV0FBVyxTQUFTLFFBQVE7Ozs7b0JBSWhELEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELElBQUksT0FBTzs0QkFDUCxXQUFXOzRCQUNYLFNBQVMsRUFBRSxJQUFJO3dCQUNuQixNQUFNLDBCQUEwQjt3QkFDaEMsS0FBSyxlQUFlO3dCQUNwQixPQUFPLHlCQUF5QixnQkFBZ0IscUJBQXFCLFVBQVU7OztvQkFHbkYsR0FBRyxxREFBcUQsWUFBTTt3QkFDMUQsSUFBSSxPQUFPO3dCQUNYLE1BQU0sMEJBQTBCO3dCQUNoQyxLQUFLO3dCQUNMLE9BQU8seUJBQXlCLG1CQUFtQjs7O29CQUd2RCxTQUFTLDRCQUE0QixZQUFNO3dCQUN2QyxJQUFJLE9BQUk7NEJBQUUsT0FBSTs0QkFBRSxTQUFNOzt3QkFFdEIsV0FBVyxPQUFPLFVBQUMsZUFBZSx1QkFBMEI7NEJBQ3hELE9BQU87NEJBQ1AsT0FBTyxJQUFJLGNBQWMsc0JBQXNCOzRCQUMvQyxNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxZQUFZOzs7d0JBR3hFLFNBQVMsaUNBQWlDLGFBQWEsWUFBWSxVQUFVOzRCQUN6RSxTQUFTO2dDQUNMLG1CQUFtQixZQUFBO29DQWNILE9BZFM7Ozs0QkFFN0IsS0FBSyxXQUFXOzs0QkFFaEIsSUFBSSxjQUFjLEtBQUsseUJBQXlCOzRCQUNoRCxPQUFPLGFBQWEsS0FBSzs7O3dCQUc3QixHQUFHLDZDQUE2QyxZQUFNOzRCQUNsRCxpQ0FBaUMsTUFBTSxPQUFPOzs7d0JBR2xELEdBQUcsdUNBQXVDLFlBQU07NEJBQzVDLGlDQUFpQyxPQUFPLE1BQU07Ozt3QkFHbEQsR0FBRyxnRUFBZ0UsWUFBTTs0QkFDckUsaUNBQWlDLE1BQU0sTUFBTTs7OztvQkFJckQsU0FBUyx1QkFBdUIsWUFBTTt3QkFDbEMsSUFBSSxNQUFHOzRCQUFFLE9BQUk7O3dCQUViLFdBQVcsT0FBTyxVQUFDLGVBQWUsdUJBQTBCOzRCQUN4RCxPQUFPOzs7d0JBR1gsR0FBRyxzRUFBc0UsWUFBTTs0QkFDM0UsTUFBTSxLQUFLOzRCQUNYLE9BQU8sS0FBSyxLQUFLOzs7d0JBR3JCLEdBQUcsa0ZBQWtGLFlBQU07NEJBQ3ZGLElBQUk7Z0NBQ0Esb0JBQW9CLGNBQWMsS0FBSztnQ0FDdkMsTUFBTSxLQUFLO2dDQUNYLE9BQU8sS0FBSyxLQUFLO3NDQUViOztnQ0FFSixvQkFBb0IsY0FBYyxLQUFLOzs7O3dCQUkvQyxHQUFHLDJGQUEyRixZQUFNOzRCQUNoRyxJQUFJO2dDQUNBLG9CQUFvQixjQUFjLEtBQUs7Z0NBQ3ZDLE1BQU0sS0FBSztnQ0FDWCxPQUFPLEtBQUssS0FBSztzQ0FFYjs7Z0NBRUosb0JBQW9CLGNBQWMsS0FBSzs7Ozt3QkFJL0MsR0FBRyw0RkFBNEYsWUFBTTs0QkFDakcsSUFBSTtnQ0FDQSxvQkFBb0IsY0FBYyxLQUFLO2dDQUN2QyxNQUFNLEtBQUs7Z0NBQ1gsT0FBTyxLQUFLLEtBQUs7c0NBRWI7O2dDQUVKLG9CQUFvQixjQUFjLEtBQUs7Ozs7O29CQU1uRCxTQUFTLHlCQUF5QixZQUFNO3dCQUNwQyxJQUFJLE1BQUc7NEJBQUUsT0FBSTs7d0JBRWIsV0FBVyxPQUFPLFVBQUMsZUFBZSx1QkFBMEI7NEJBQ3hELE9BQU87Ozt3QkFHWCxHQUFHLGlGQUFpRixZQUFNOzRCQUN0RixNQUFNLEtBQUs7NEJBQ1gsT0FBTyxLQUFLLEtBQUs7Ozt3QkFHckIsR0FBRyw2RkFBNkYsWUFBTTs0QkFDbEcsSUFBSTtnQ0FDQSxvQkFBb0IsY0FBYyxLQUFLO2dDQUN2QyxNQUFNLEtBQUs7Z0NBQ1gsT0FBTyxLQUFLLEtBQUs7c0NBRWI7O2dDQUVKLG9CQUFvQixjQUFjLEtBQUs7Ozs7d0JBSS9DLEdBQUcsa0dBQWtHLFlBQU07NEJBQ3ZHLElBQUk7Z0NBQ0Esb0JBQW9CLGNBQWMsS0FBSztnQ0FDdkMsTUFBTSxLQUFLO2dDQUNYLE9BQU8sS0FBSyxLQUFLO3NDQUViOztnQ0FFSixvQkFBb0IsY0FBYyxLQUFLOzs7O3dCQUkvQyxHQUFHLG1HQUNDLFlBQU07NEJBQ0YsSUFBSTtnQ0FDQSxvQkFBb0IsY0FBYyxLQUFLO2dDQUN2QyxNQUFNLEtBQUs7Z0NBQ1gsT0FBTyxLQUFLLEtBQUs7c0NBRWI7O2dDQUVKLG9CQUFvQixjQUFjLEtBQUs7Ozs7OztnQkFPM0QsU0FBUyxhQUFhLFlBQU07O29CQUV4QixJQUFJLFdBQVE7d0JBQUUseUNBQXNDO3dCQUFFLG9CQUFpQjt3QkFBRSxTQUFNO3dCQUFFLFVBQU87d0JBQUUsVUFBTzt3QkFBRSxXQUFRO3dCQUN2Ryx1QkFBb0I7OztvQkFHeEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLGNBQWMsdUJBQXVCLGVBQWUsV0FDNUUsMENBQTBDLHFCQUF3Qjt3QkFDakYsV0FBVzt3QkFDWCxTQUFTLFdBQVc7d0JBQ3BCLFVBQVU7d0JBQ1YseUNBQXlDO3dCQUN6QyxvQkFBb0I7O3dCQUVwQixXQUFXO3dCQUNYLHVCQUF1Qjs7O3dCQUd2QixhQUFhLGtCQUFrQjs7d0JBRS9CLElBQUksT0FBTyxJQUFJLGNBQWMsc0JBQXNCO3dCQUNuRCxNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxZQUFZOzs7b0JBR3hFLFVBQVUsWUFBTTt3QkFDWixJQUFJLFNBQVM7NEJBQ1QsUUFBUTs7d0JBRVosSUFBSSxRQUFROzs0QkFFUixPQUFPOzs7O29CQUlmLFNBQVMsZ0JBQThGO3dCQWN2RixJQWRPLFdBQVEsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsUUFBSyxVQUFBO3dCQWV2QixJQWZ5QixhQUFVLFVBQUEsVUFBQSxLQUFBLFVBQUEsT0FBQSxZQUFHLFFBQUssVUFBQTt3QkFnQjNDLElBaEI2QyxXQUFRLFVBQUEsVUFBQSxLQUFBLFVBQUEsT0FBQSxZQUFHLE9BQUksVUFBQTt3QkFpQjVELElBakI4RCxtQkFBZ0IsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsT0FBSSxVQUFBOzt3QkFDakcsSUFBSSxNQUFHOzt3QkFLUCxVQUFVLFFBQVEsUUFBUTs7d0JBRTFCLE9BQU8sU0FBUyxJQUFJLHVDQUF1Qzs0QkFDdkQsbUJBQW1COzRCQUNuQixZQUFZOzRCQUNaLFVBQVU7NEJBQ1Ysa0JBQWtCOzs7d0JBR3RCLE9BQU8sV0FBVzt3QkFDbEIsT0FBTyx1QkFBdUI7O3dCQUU5QixTQUFTLFNBQVM7d0JBQ2xCLE9BQU87Ozt3QkFHUCxRQUFRLGFBQWE7d0JBQ3JCLE9BQU87OztvQkFHWCxTQUFTLFVBQVUsWUFBTTt3QkFDckIsU0FBUyxZQUFZOzRCQUNqQixPQUFRLFFBQVEsS0FBSyx3QkFBd0IsU0FBUzs7O3dCQUcxRCxHQUFHLDJDQUEyQyxZQUFNOzRCQUNoRDs0QkFDQSxjQUFjLE1BQU07NEJBQ3BCLE9BQU8sYUFBYSxRQUFROzs7d0JBR2hDLEdBQUcsMENBQTBDLFlBQU07NEJBQy9DLGNBQWMsT0FBTzs0QkFDckIsT0FBTyxhQUFhLFFBQVE7Ozt3QkFHaEMsR0FBRyxpRUFBaUUsWUFBTTs0QkFDdEUsY0FBYyxPQUFPOzRCQUNyQixPQUFPLGFBQWEsUUFBUTs7OztvQkFJcEMsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsY0FBYyxPQUFPOzt3QkFFckIsMkJBQTJCLHlCQUF5QixNQUFNO3dCQUMxRCxJQUFJLGNBQWMsUUFBUSxLQUFLO3dCQUMvQixZQUFZLElBQUk7d0JBQ2hCLFlBQVksUUFBUTt3QkFDcEIsSUFBSSxlQUFlLFFBQVEsS0FBSzt3QkFDaEMsYUFBYTs7d0JBRWIsT0FBTywyQkFBMkIsMEJBQzlCLHFCQUFxQixRQUFRLEdBQUcsSUFBSSxRQUFRLE1BQU0sTUFBTTs7O29CQUdoRSxHQUFHLGlEQUFpRCxZQUFNO3dCQUN0RCxJQUFJLFdBQVcsQ0FBRSxrQkFBa0IsT0FBTzt3QkFDMUMsY0FBYyxPQUFPLE9BQU87d0JBQzVCLE9BQU8sMkJBQTJCLDBCQUM5QixxQkFBcUIsUUFBUSxHQUFHLElBQUksV0FBVyxVQUFVLE1BQU07OztvQkFHdkUsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsSUFBSSxXQUFXLENBQUUsa0JBQWtCLE9BQU87d0JBQzFDLGNBQWMsT0FBTyxPQUFPLE1BQU07d0JBQ2xDLE9BQU8sMkJBQTJCLDBCQUM5QixxQkFBcUIsUUFBUSxHQUFHLElBQUksV0FBVyxNQUFNLFVBQVU7OztvQkFHdkUsR0FBRyxpQ0FBaUMsWUFBTTt3QkFDdEM7d0JBQ0EsSUFBSSxRQUFRLFFBQVEsS0FBSzt3QkFDekIsT0FBTyxNQUFNLFFBQVEsUUFBUTs7O29CQUdqQyxTQUFTLFVBQVUsWUFBTTt3QkFDckIsU0FBUyxXQUFXOzRCQUNoQixRQUFRLGFBQWE7NEJBQ3JCLE9BQU87Ozt3QkFHWCxXQUFXLFlBQU07OzRCQUViLGFBQWEsR0FBRyxHQUFHOzs7d0JBR3ZCLFNBQVMsWUFBWTs0QkFDakIsSUFBSSxRQUFRLFFBQVEsS0FBSzs0QkFDekIsSUFBSSxPQUFPLE1BQU0sS0FBSzs0QkFDdEIsS0FBSzs7O3dCQUdULEdBQUcsZUFBZSxZQUFNOzRCQUNwQjs0QkFDQTs0QkFDQSxJQUFJLFFBQVEsUUFBUSxLQUFLOzRCQUN6QixPQUFPLE1BQU0sUUFBUSxRQUFROzs7d0JBR2pDLEdBQUcsaURBQWlELFlBQU07OzRCQUV0RCxJQUFNLGtCQUFrQjs0QkFDeEIsZUFBZSxRQUFRLEdBQUcsa0JBQWtCO2dDQUN4QyxvQkFBb0IsUUFBUSxVQUFVLHNCQUFzQixJQUFJLFlBQVk7Ozs7NEJBSWhGLHVCQUF1Qjs7NEJBRXZCOzRCQUNBOzRCQUNBLElBQUksU0FDQSxRQUFRLEtBQUs7NEJBQ2pCLE9BQU8sT0FBTyxRQUFRLFFBQVE7NEJBQzlCLE9BQU8sT0FBTyxPQUFPLFFBQVEsUUFBUSxnQkFBZ0IsU0FBUzs7O3dCQUdsRSxHQUFHLGtEQUFrRCxZQUFNOzRCQUN2RDs0QkFDQTs0QkFDQSxNQUFNLDBCQUEwQjs0QkFDaEM7NEJBQ0EsT0FBTyx5QkFBeUIsZ0JBQWdCLHFCQUFxQixPQUFPOzs7d0JBR2hGLEdBQUcscUVBQXFFLFlBQU07NEJBQzFFLElBQUksVUFBVTs0QkFDZCxXQUFXOzRCQUNYOzRCQUNBOzs0QkFFQSxNQUFNLDRCQUE0Qiw2QkFBNkIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUN4RixNQUFNLDBCQUEwQjs0QkFDaEM7NEJBQ0EsT0FBTyx5QkFBeUIsZ0JBQWdCOzs0QkFFaEQsSUFBSSxPQUFPLHlCQUF5QixlQUFlLE1BQU0sYUFBYTs0QkFDdEUsT0FBTyxLQUFLLElBQUksUUFBUTs0QkFDeEIsT0FBTyxRQUFRLFdBQVcsS0FBSyxLQUFLLFFBQVE7OzRCQUU1QyxJQUFJLFFBQUs7NEJBQ1QsS0FBSyxLQUFLLEtBQUssVUFBQyxhQUFXO2dDQVlYLE9BWmdCLFFBQVE7OzRCQUN4QyxPQUFPOzRCQUNQLE9BQU8sMkJBQTJCLDJCQUEyQjs0QkFDN0QsT0FBTyxNQUFNLFlBQVksUUFBUTs0QkFDakMsT0FBTyxNQUFNLFdBQVcsUUFBUSxDQUFFOzs7O29CQUkxQyxHQUFHLG9CQUFvQixZQUFNO3dCQUN6QixTQUFTLFlBQVk7NEJBQ2pCLE9BQU8sUUFBUSxLQUFLOzs7d0JBR3hCLFNBQVMsWUFBWTs0QkFDakIsT0FBUSxZQUFZLFNBQVM7Ozt3QkFHakMsR0FBRyxpREFBaUQsWUFBTTs0QkFDdEQsYUFBYSxHQUFHLEdBQUc7NEJBQ25COzRCQUNBLE9BQU8sYUFBYSxRQUFROzs7d0JBR2hDLEdBQUcsMENBQTBDLFlBQU07NEJBQy9DLGFBQWEsSUFBSSxHQUFHOzRCQUNwQjs0QkFDQSxPQUFPLGFBQWEsUUFBUTs7O3dCQUdoQyxHQUFHLDRDQUE0QyxZQUFNOzs0QkFFakQsYUFBYSxJQUFJLEdBQUc7NEJBQ3BCOzRCQUNBLElBQUksU0FBUzs7OzRCQUdiLGFBQWEsSUFBSSxJQUFJOzRCQUNyQixPQUFPOzs7NEJBR1AsSUFBSSxPQUFPLFFBQVEsS0FBSzs0QkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTs7Ozs7OztHQW9CekMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRW50aXR5TGlzdERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uRW50aXR5TGlzdERpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBMaXN0UmVzdWx0RFRPLCBDZXJ0aWZpY2F0aW9uRW50aXR5LCBDZXJ0aWZpY2F0aW9uLFxyXG4gICAgICAgICRxLCBlbnRpdGllc1Jlc3VsdCwgZW50aXR5SWQsIGNlcnRpZmljYXRpb25UeXBlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHFfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIF9jZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZV8sIF9MaXN0UmVzdWx0RFRPXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uRW50aXR5XywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIF9DZXJ0aWZpY2F0aW9uXykge1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXztcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXztcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uRW50aXR5ID0gX0NlcnRpZmljYXRpb25FbnRpdHlfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XHJcbiAgICAgICAgTGlzdFJlc3VsdERUTyA9IF9MaXN0UmVzdWx0RFRPXztcclxuICAgICAgICAkcSA9IF8kcV87XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBzb21lIG1vY2sgZGF0YVxyXG4gICAgICAgIGxldCBqc29uID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OX0VOVElUWV9MSVNUX1JFU1VMVCk7XHJcbiAgICAgICAganNvbi5vYmplY3RzID0ganNvbi5vYmplY3RzLm1hcChvYmplY3QgPT4gbmV3IENlcnRpZmljYXRpb25FbnRpdHkob2JqZWN0KSk7XHJcbiAgICAgICAgZW50aXRpZXNSZXN1bHQgPSBuZXcgTGlzdFJlc3VsdERUTyhqc29uKTtcclxuICAgICAgICBlbnRpdHlJZCA9IGpzb24ub2JqZWN0c1swXS5pZDtcclxuXHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbih7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBlbnRpdGllc1Jlc3VsdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRm9yIG1vc3QgdGVzdHMgd2Ugd2FudCBtYW5hZ2VyLCBidXQgc29tZSB3aWxsIG92ZXJyaWRlIHRoaXMgdGhlbiBzZXQgaXQgYmFjay5cclxuICAgICAgICBjZXJ0aWZpY2F0aW9uVHlwZSA9IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyO1xyXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IGNlcnRpZmljYXRpb25UeXBlKTtcclxuXHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBSZXN1bHRzKHRvdGFsLCBzdGFydCwgY291bnQpIHtcclxuICAgICAgICBsZXQgb2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0YXJ0ICsgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBvYmplY3RzLnB1c2gobmV3IENlcnRpZmljYXRpb25FbnRpdHkoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGBpZCR7aX1gLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiBgbmFtZSR7aX1gXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudGl0aWVzUmVzdWx0ID0gbmV3IExpc3RSZXN1bHREVE8oe1xyXG4gICAgICAgICAgICBjb3VudDogdG90YWwsXHJcbiAgICAgICAgICAgIG9iamVjdHM6IG9iamVjdHNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEJ1bGtFbnRpdHlEZWNpc2lvbnMoKSB7XHJcbiAgICAgICAgbGV0IGJ1bGtFbnRpdHlEZWNpc2lvbnMgPSBbJ2ZvbycsICdiYXInXTtcclxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLnJldHVyblZhbHVlKHtcclxuICAgICAgICAgICAgYnVsa0VudGl0eURlY2lzaW9uczogYnVsa0VudGl0eURlY2lzaW9uc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBidWxrRW50aXR5RGVjaXNpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgJHN0YXRlUGFyYW1zLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3RTdGF0ZSwgc2hvd0l0ZW1TdGF0dXNDb3VudHM7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgX0NlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGVfKSB7XHJcbiAgICAgICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3RTdGF0ZSA9IF9DZXJ0aWZpY2F0aW9uRW50aXR5TGlzdFN0YXRlXztcclxuXHJcbiAgICAgICAgICAgIHNob3dJdGVtU3RhdHVzQ291bnRzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgc29tZSBtb2NrIGRhdGFcclxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbklkOiAnc29tZUNlcnQnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgdGhlIGNvbnRyb2xsZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0NlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGV9IFtzdGF0ZV0gIFRoZSBvcHRpb25hbCBzdGF0ZSB0byB1c2UgZm9yIHRoZSBjb250cm9sbGVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7Q2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDdHJsfSBUaGUgY29udHJvbGxlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25FbnRpdHlMaXN0RGlyZWN0aXZlQ3RybCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGVQYXJhbXM6ICRzdGF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGU6ICRyb290U2NvcGVcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0l0ZW1TdGF0dXNDb3VudHM6IHNob3dJdGVtU3RhdHVzQ291bnRzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3RybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBsb2FkIGVudGl0aWVzIHdoZW4gY3JlYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSBhIERhdGFSZWZyZXNoVHJpZ2dlciB3aXRoIHJlZnJlc2ggYWN0aW9uIG9mIGZldGNoRW50aXRpZXMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY3RybCwgJ2ZldGNoRW50aXRpZXMnKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGN0cmwuc3RhdGUuY2hlY2tib3hNdWx0aVNlbGVjdC5zZWxlY3Rpb25Nb2RlbCwgJ2NsZWFyJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5yZWZyZXNoVHJpZ2dlcikudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwucmVmcmVzaFRyaWdnZXIucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZmV0Y2hFbnRpdGllcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RhdGUuY2hlY2tib3hNdWx0aVNlbGVjdC5zZWxlY3Rpb25Nb2RlbC5jbGVhcikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2xvYWRFbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgY2FsbCBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMuY2FsbHMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwubG9hZEVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChjdHJsLmlkLCAwLCAyMCwgdW5kZWZpbmVkLCBudWxsLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2dldHMgaXRlbSBjb3VudHMgd2hlbiByZXF1ZXN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaG93SXRlbVN0YXR1c0NvdW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmxvYWRFbnRpdGllcygpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcylcclxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY3RybC5pZCwgMCwgMjAsIHVuZGVmaW5lZCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnbG9hZE1vcmVFbnRpdGllcygpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnaW5jcmVtZW50cyB0aGUgcGFnZSBpZiB0aGVyZSBhcmUgbW9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cygyNSwgMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0YXRlLnBhZ2VzRGlzcGxheWVkKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5sb2FkTW9yZUVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5zdGF0ZS5wYWdlc0Rpc3BsYXllZCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgaW5jcmVtZW50IHRoZSBwYWdlIGlmIHRoZXJlIGFyZSBubyBtb3JlIHJlc3VsdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXR1cFJlc3VsdHMoNSwgMCwgNSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuc3RhdGUucGFnZXNEaXNwbGF5ZWQpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmxvYWRNb3JlRW50aXRpZXMoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLnN0YXRlLnBhZ2VzRGlzcGxheWVkKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjYWxscyBnZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cygyNSwgMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5sb2FkTW9yZUVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChjdHJsLmlkLCAyMCwgMjAsIHVuZGVmaW5lZCwgbnVsbCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2ZldGNoRW50aXRpZXMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ2RvZXMgbm90IGxvYWQgYWdhaW4gaWYgYWxyZWFkeSBsb2FkaW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5sb2FkaW5nRW50aXRpZXMpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTm93IHRyeSB0byBmZXRjaCB3aGlsZSB0aGUgb3RoZXIgb25lIGlzIHN0aWxsIHBlbmRpbmcgLSBjaGVjayB0aGF0IGl0IGRvZXMgbm90aGluZy5cclxuICAgICAgICAgICAgICAgIGN0cmwuZmV0Y2hFbnRpdGllcygpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25FbnRpdGllcy5jYWxscy5jb3VudCgpKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExldCB0aGUgZmlyc3QgcHJvbWlzZSByZXNvbHZlLCB0aGVuIHRyeSBhZ2Fpbi4gIFRoaXMgb25lIHNob3VsZCBnbyB0aHJvdWdoLlxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5sb2FkaW5nRW50aXRpZXMpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5mZXRjaEVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzLmNhbGxzLmNvdW50KCkpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2xvYWRzIHRoZSBmaXJzdCAyMCB0aGUgZmlyc3QgdGltZSBpdCBpcyBjYWxsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN0cmwuaWQsIDAsIDIwLCB1bmRlZmluZWQsIG51bGwsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc3RhcnRzIHdoZXJlIGl0IGxlZnQgb2ZmIHdoZW4gbG9hZGluZyBzdWJzZXF1ZW50IHBhZ2VzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9hZCB0aGUgZmlyc3QgMjAgd2hlbiBjb25zdHJ1Y3RlZC5cclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cyg0NSwgMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmVudGl0eUxpc3REYXRhLmxlbmd0aCkudG9FcXVhbCgyMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTm93IGxvYWQgdGhlIG5leHQgMjAsIGFuZCBtYWtlIHN1cmUgdGhleSBhcmUgYXBwZW5kZWQuXHJcbiAgICAgICAgICAgICAgICBzZXR1cFJlc3VsdHMoNDUsIDIwLCAyMCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnN0YXRlLnBhZ2VzRGlzcGxheWVkID0gMjtcclxuICAgICAgICAgICAgICAgIGN0cmwuZmV0Y2hFbnRpdGllcygpO1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5lbnRpdHlMaXN0RGF0YS5sZW5ndGgpLnRvRXF1YWwoNDApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdsb2FkcyB0aGUgZnVsbCBsaXN0IHNpemUgaWYgY2FsbGVkIHdpdGggbXVsdGlwbGUgcGFnZXMgYW5kIG5vIGRhdGEgaGFzIGJlZW4gbG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgYSBzdGF0ZSB0aGF0IHdpbGwgbWFrZSAzIHBhZ2VzIG9mIGRhdGEgYmUgbG9hZGVkIHVwb24gY29uc3RydWN0aW9uLlxyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlID0gbmV3IENlcnRpZmljYXRpb25FbnRpdHlMaXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnBhZ2VzRGlzcGxheWVkID0gMztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBjb250cm9sbGVyIC0gdGhpcyB3aWxsIGNhdXNlIHRoZSBmZXRjaCB0byBvY2N1ci5cclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cyg2NSwgMCwgNjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKGN0cmwuaWQsIDAsIDYwLCB1bmRlZmluZWQsIG51bGwsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW50aXR5TGlzdERhdGEubGVuZ3RoKS50b0VxdWFsKDYwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc3RvcmVzIHRoZSB0b3RhbCBsaXN0IHNpemUgb24gdGhlIGNvbnRyb2xsZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG90YWwgPSAyMztcclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cyh0b3RhbCwgMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmVudGl0eUxpc3RDb3VudCkudG9FcXVhbCh0b3RhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2dldEJ1bGtFbnRpdHlEZWNpc2lvbnMoKScsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ2NhbGxzIGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRDb25maWd1cmF0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGtFbnRpdHlEZWNpc2lvbnMgPSBzZXR1cEJ1bGtFbnRpdHlEZWNpc2lvbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IGN0cmwuZ2V0QnVsa0VudGl0eURlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nZXRDb25maWd1cmF0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodmFsKS50b0JlKGJ1bGtFbnRpdHlEZWNpc2lvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGVtcHR5IGFycmF5IGlmIGdldENvbmZpZ3VyYXRpb24gaXMgdW5kZWZpbmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDb25maWd1cmF0aW9uJykuYW5kLnJldHVyblZhbHVlKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gY3RybC5nZXRCdWxrRW50aXR5RGVjaXNpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh2YWwpLnRvRXF1YWwoW10pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2dldEVudGl0eU5hbWUoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHRydW5jYXRlIG5hbWVzIGxvbmdlciB0aGFuIE1BWF9FTlRJVFlfRElTUExBWV9MRU5HVEgnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3J0TmFtZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnQWRhbSBTYW5kbGVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ05hbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ0h1YmVydCBCbGFpbmUgV29sZmVzY2hsZWdlbHN0ZWluaGF1c2VuYmVyZ2VyZG9yZmYnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0cnVuY2F0ZWRMb25nTmFtZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnSHViZXJ0IEJsYWluZSBXb2xmZXMuLi4nXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRFbnRpdHlOYW1lKHNob3J0TmFtZSkpLnRvQmUoc2hvcnROYW1lLmRpc3BsYXlhYmxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRFbnRpdHlOYW1lKGxvbmdOYW1lKSkudG9CZSh0cnVuY2F0ZWRMb25nTmFtZS5kaXNwbGF5YWJsZU5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG91bGQgdHJ1bmNhdGUgbmFtZXMgbG9uZ2VyIHRoYW4gTUFYX1dJREVfRU5USVRZX0RJU1BMQVlfTEVOR1RIJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBzaG9ydE5hbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ0FkYW0gU2FuZGxlcidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmdOYW1lID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdIdWJlcnQgQmxhaW5lIFdvbGZlc2NobGVnZWxzdGVpbmhhdXNlbmJlcmdlcmRvcmZmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1bmNhdGVkTG9uZ05hbWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlhYmxlTmFtZTogJ0h1YmVydCBCbGFpbmUgV29sZmVzY2hsZWdlbHN0ZWluaGF1c2VuYmUuLi4nXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBXZSBleHBlY3QgYSBkaWZmZXJlbnQgbWF4IGxlbmd0aCBmb3Igc29tZSBjZXJ0IHR5cGVzLlxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uVHlwZSA9IENlcnRpZmljYXRpb24uVHlwZS5EYXRhT3duZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RW50aXR5TmFtZShzaG9ydE5hbWUpKS50b0JlKHNob3J0TmFtZS5kaXNwbGF5YWJsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldEVudGl0eU5hbWUobG9uZ05hbWUpKS50b0JlKHRydW5jYXRlZExvbmdOYW1lLmRpc3BsYXlhYmxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwTWVtYmVyc2hpcDtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRFbnRpdHlOYW1lKHNob3J0TmFtZSkpLnRvQmUoc2hvcnROYW1lLmRpc3BsYXlhYmxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RW50aXR5TmFtZShsb25nTmFtZSkpLnRvQmUodHJ1bmNhdGVkTG9uZ05hbWUuZGlzcGxheWFibGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uVHlwZSA9IENlcnRpZmljYXRpb24uVHlwZS5BY2NvdW50R3JvdXBQZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRFbnRpdHlOYW1lKHNob3J0TmFtZSkpLnRvQmUoc2hvcnROYW1lLmRpc3BsYXlhYmxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0RW50aXR5TmFtZShsb25nTmFtZSkpLnRvQmUodHJ1bmNhdGVkTG9uZ05hbWUuZGlzcGxheWFibGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBpdCBiYWNrLlxyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc1NlbGVjdGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdjb21wYXJlcyB0byBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Ugc2VsZWN0ZWRFbnRpdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJ2R1bW15JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkgPSBlbnRpdHk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlbGVjdGVkKGVudGl0eSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBubyBlbnRpdHkgcGFzc2VkIGFuZCBubyBzZWxlY3RlZEVudGl0eSBzZXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0geyBpZDogJ2R1bW15JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlbGVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1NlbGVjdGVkKGVudGl0eSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2dvVG9EZXRhaWxWaWV3KCkgY2FsbHMgdGhyb3VnaCB0byBkYXRhIHNlcnZpY2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxyXG4gICAgICAgICAgICAgICAgZW50aXR5SWQgPSAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSB7IGlkOiAnMTIzNCcgfTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ29Ub0RldGFpbFZpZXcnKTtcclxuICAgICAgICAgICAgY3RybC5nb1RvRGV0YWlsVmlldyhlbnRpdHkpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9EZXRhaWxWaWV3KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnRpdHlJZCwgbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdnb1RvV29ya3NoZWV0VmlldygpIGNhbGxzIHRocm91Z2ggdG8gZGF0YSBzZXJ2aWNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ29Ub1dvcmtzaGVldFZpZXcnKTtcclxuICAgICAgICAgICAgY3RybC5nb1RvV29ya3NoZWV0VmlldygpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmdvVG9Xb3Jrc2hlZXRWaWV3KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdzaG93VW5kb0VudGl0eURlbGVnYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsLCBjZXJ0LCBlbnRpdHk7XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoQ2VydGlmaWNhdGlvbiwgY2VydGlmaWNhdGlvblRlc3REYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShjZXJ0KTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGVzdFNob3dVbmRvRW50aXR5RGVsZWdhdGlvblRlc3QoaXNEZWxlZ2F0ZWQsIGlzRWRpdGFibGUsIGV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbnRpdHlEZWxlZ2F0ZWQ6ICgpID0+IGlzRGVsZWdhdGVkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY2VydC5lZGl0YWJsZSA9IGlzRWRpdGFibGU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dVbmRvQnRuID0gY3RybC5zaG93VW5kb0VudGl0eURlbGVnYXRpb24oZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzaG93VW5kb0J0bikudG9CZShleHBlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBmYWxzZSBpZiBjZXJ0aWZpY2F0aW9uIGlzIG5vdCBlZGl0YWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3RTaG93VW5kb0VudGl0eURlbGVnYXRpb25UZXN0KHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2lzIGZhbHNlIGlmIGVudGl0eSBpcyBub3QgZGVsZWdhdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVzdFNob3dVbmRvRW50aXR5RGVsZWdhdGlvblRlc3QoZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgdHJ1ZSBpZiBlbnRpdHkgaXMgZGVsZWdhdGVkIGFuZCBjZXJ0aWZpY2F0aW9uIGlzIGVkaXRhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVzdFNob3dVbmRvRW50aXR5RGVsZWdhdGlvblRlc3QodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZ2V0QWxsRW50aXRpZXNTdHIoKScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbCwgY3RybDtcclxuXHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChDZXJ0aWZpY2F0aW9uLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdBbGwgZW50aXRpZXMgc3RyIHNob3VsZCBiZSB1aV9jZXJ0X2FsbF9pZGVudGl0aWVzIGZvciBNYW5hZ2VyIGNlcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBjdHJsLmdldEFsbEVudGl0aWVzU3RyKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodmFsKS50b0JlKCd1aV9jZXJ0X2FsbF9pZGVudGl0aWVzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ0FsbCBlbnRpdGllcyBzdHIgc2hvdWxkIGJlIHVpX2NlcnRfYWxsX2VudGl0bGVtZW50cyBmb3IgRW50aXRsZW1lbnQgT3duZXIgY2VydCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuRGF0YU93bmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGN0cmwuZ2V0QWxsRW50aXRpZXNTdHIoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QodmFsKS50b0JlKCd1aV9jZXJ0X2FsbF9lbnRpdGxlbWVudHMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBjZXJ0IHR5cGUgYmFjay5cclxuICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uVHlwZSA9IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdBbGwgZW50aXRpZXMgc3RyIHNob3VsZCBiZSB1aV9jZXJ0X2FsbF9hY2NvdW50X2dyb3VwcyBmb3IgQWNjb3VudCBHcm91cCBNZW1iZXJzaGlwIGNlcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cE1lbWJlcnNoaXA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gY3RybC5nZXRBbGxFbnRpdGllc1N0cigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCh2YWwpLnRvQmUoJ3VpX2NlcnRfYWxsX2FjY291bnRfZ3JvdXBzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY2VydCB0eXBlIGJhY2suXHJcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuTWFuYWdlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnQWxsIGVudGl0aWVzIHN0ciBzaG91bGQgYmUgdWlfY2VydF9hbGxfYWNjb3VudF9ncm91cHMgZm9yIEFjY291bnQgR3JvdXAgUGVybWlzc2lvbnMgY2VydCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gY3RybC5nZXRBbGxFbnRpdGllc1N0cigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCh2YWwpLnRvQmUoJ3VpX2NlcnRfYWxsX2FjY291bnRfZ3JvdXBzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgY2VydCB0eXBlIGJhY2suXHJcbiAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuTWFuYWdlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnZ2V0QWxsRW50aXRpZXNTclN0cigpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsLCBjdHJsO1xyXG5cclxuICAgICAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKENlcnRpZmljYXRpb24sIGNlcnRpZmljYXRpb25UZXN0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgaXQoJ0FsbCBlbnRpdGllcyBzciBzdHIgc2hvdWxkIGJlIHVpX2NlcnRfdmlld19hbGxfaWRlbnRpdGllc19zciBmb3IgTWFuYWdlciBjZXJ0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gY3RybC5nZXRBbGxFbnRpdGllc1NyU3RyKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodmFsKS50b0JlKCd1aV9jZXJ0X3ZpZXdfYWxsX2lkZW50aXRpZXNfc3InKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnQWxsIGVudGl0aWVzIHNyIHN0ciBzaG91bGQgYmUgdWlfY2VydF92aWV3X2FsbF9lbnRpdGxlbWVudHNfc3IgZm9yIEVudGl0bGVtZW50IE93bmVyIGNlcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lcjtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBjdHJsLmdldEFsbEVudGl0aWVzU3JTdHIoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QodmFsKS50b0JlKCd1aV9jZXJ0X3ZpZXdfYWxsX2VudGl0bGVtZW50c19zcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGNlcnQgdHlwZSBiYWNrLlxyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ0FsbCBlbnRpdGllcyBzciBzdHIgc2hvdWxkIGJlIHVpX2NlcnRfdmlld19hbGxfZW50aXRsZW1lbnRzX3NyIGZvciBBY2NvdW50R3JvdXBNZW1iZXJzaGlwIGNlcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cE1lbWJlcnNoaXA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gY3RybC5nZXRBbGxFbnRpdGllc1NyU3RyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHZhbCkudG9CZSgndWlfY2VydF92aWV3X2FsbF9hY2NvdW50X2dyb3Vwc19zcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGNlcnQgdHlwZSBiYWNrLlxyXG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlID0gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ0FsbCBlbnRpdGllcyBzciBzdHIgc2hvdWxkIGJlIHVpX2NlcnRfdmlld19hbGxfZW50aXRsZW1lbnRzX3NyIGZvciBBY2NvdW50R3JvdXBQZXJtaXNzaW9ucyBjZXJ0JyxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uVHlwZSA9IENlcnRpZmljYXRpb24uVHlwZS5BY2NvdW50R3JvdXBQZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gY3RybC5nZXRBbGxFbnRpdGllc1NyU3RyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdCh2YWwpLnRvQmUoJ3VpX2NlcnRfdmlld19hbGxfYWNjb3VudF9ncm91cHNfc3InKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCBjZXJ0IHR5cGUgYmFjay5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblR5cGUgPSBDZXJ0aWZpY2F0aW9uLlR5cGUuTWFuYWdlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdkaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCAkY29tcGlsZSwgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDb25maWcsIENlcnRpZmljYXRpb25JdGVtLCAkc2NvcGUsICR3aW5kb3csIGVsZW1lbnQsIHVzZVBhZ2VyLFxyXG4gICAgICAgICAgICBzaG93SXRlbVN0YXR1c0NvdW50cztcclxuXHJcbiAgICAgICAgLyoganNoaW50IG1heHBhcmFtczo4ICovXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsICRzdGF0ZVBhcmFtcywgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDZXJ0aWZpY2F0aW9uLCBfJHdpbmRvd18sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uRW50aXR5TGlzdERpcmVjdGl2ZUNvbmZpZ18sIF9DZXJ0aWZpY2F0aW9uSXRlbV8pID0+IHtcclxuICAgICAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgJHdpbmRvdyA9IF8kd2luZG93XztcclxuICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDb25maWcgPSBfQ2VydGlmaWNhdGlvbkVudGl0eUxpc3REaXJlY3RpdmVDb25maWdfO1xyXG4gICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XHJcblxyXG4gICAgICAgICAgICB1c2VQYWdlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzaG93SXRlbVN0YXR1c0NvdW50cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCBieSB0aGUgZGlyZWN0aXZlLlxyXG4gICAgICAgICAgICAkc3RhdGVQYXJhbXMuY2VydGlmaWNhdGlvbklkID0gJzEyMzQnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNlcnQgPSBuZXcgQ2VydGlmaWNhdGlvbihjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVElGSUNBVElPTl8xKTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShjZXJ0KTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIHNjb3BlIHNvIHRoZSBzcC1pZi14cyByZXNpemUgbGlzdGVuZXIgaXMgY2xlYW5lZCB1cC5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoc2hvd0J1bGsgPSBmYWxzZSwgc2hvd1NlYXJjaCA9IGZhbHNlLCBzdGF0dXNlcyA9IG51bGwsIGV4Y2x1ZGVkU3RhdHVzZXMgPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBlbHQgPVxyXG4gICAgICAgICAgICAgICAgYDxzcC1jZXJ0aWZpY2F0aW9uLWVudGl0eS1saXN0IHNwLWNvbmZpZz1cImNvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtdXNlLWVudGl0eS1wYWdlcj1cInVzZVBhZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1zaG93LWl0ZW0tc3RhdHVzLWNvdW50cz1cInNob3dJdGVtU3RhdHVzQ291bnRzXCIgLz5gO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHQpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNvbmZpZyA9IG5ldyBDZXJ0aWZpY2F0aW9uRW50aXR5TGlzdERpcmVjdGl2ZUNvbmZpZyh7XHJcbiAgICAgICAgICAgICAgICBzaG93QnVsa0RlY2lzaW9uczogc2hvd0J1bGssXHJcbiAgICAgICAgICAgICAgICBzaG93U2VhcmNoOiBzaG93U2VhcmNoLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IHN0YXR1c2VzLFxyXG4gICAgICAgICAgICAgICAgZXhjbHVkZWRTdGF0dXNlczogZXhjbHVkZWRTdGF0dXNlc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS51c2VQYWdlciA9IHVzZVBhZ2VyO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd0l0ZW1TdGF0dXNDb3VudHMgPSBzaG93SXRlbVN0YXR1c0NvdW50cztcclxuXHJcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIGl0IGRlc2t0b3Agc2l6ZWQgYnkgZGVmYXVsdC5cclxuICAgICAgICAgICAgJHdpbmRvdy5pbm5lcldpZHRoID0gMTAyNDtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdoZWFkZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhc0hlYWRlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZWxlbWVudC5maW5kKCcuY2VydC1pZC1tZW51LWhlYWRlcicpLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgZGlzcGxheWVkIGlmIHNob3dpbmcgYnVsayBzZWxlY3Rpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0dXBCdWxrRW50aXR5RGVjaXNpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChoYXNIZWFkZXIoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgZGlzcGxheWVkIGlmIHNob3dpbmcgdGhlIHNlYXJjaCBib3gnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChoYXNIZWFkZXIoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnaXMgbm90IGRpc3BsYXllZCBpZiBidWxrIGFuZCB0aGUgc2VhcmNoIGJhciBhcmUgbm90IGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChoYXNIZWFkZXIoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2VhcmNoIGZpbHRlcnMgdGhlIGxpc3Qgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hGaWVsZCA9IGVsZW1lbnQuZmluZCgnI2lkU2VhcmNoRmllbGQnKTtcclxuICAgICAgICAgICAgc2VhcmNoRmllbGQudmFsKCdsb3ZlJyk7XHJcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLnRyaWdnZXIoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hCdXR0b24gPSBlbGVtZW50LmZpbmQoJyNpZFNlYXJjaEJ0bicpO1xyXG4gICAgICAgICAgICBzZWFyY2hCdXR0b24uY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoJzEyMzQnLCAwLCAyMCwgJ2xvdmUnLCBudWxsLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdmaWx0ZXJzIGJhc2VkIG9uIHN0YXR1cyBpZiBwYXNzZWQgaW50byBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0dXNlcyA9IFsgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNvbXBsZXRlIF07XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlLCBzdGF0dXNlcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uRW50aXRpZXMpLlxyXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoJzEyMzQnLCAwLCAyMCwgdW5kZWZpbmVkLCBzdGF0dXNlcywgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZmlsdGVycyBiYXNlZCBvbiBleGNsdWRlZCBzdGF0dXMgaWYgcGFzc2VkIGludG8gY29uZmlnJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RhdHVzZXMgPSBbIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5Db21wbGV0ZSBdO1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGZhbHNlLCBmYWxzZSwgbnVsbCwgc3RhdHVzZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0aWVzKS5cclxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKCcxMjM0JywgMCwgMjAsIHVuZGVmaW5lZCwgbnVsbCwgc3RhdHVzZXMsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RhYmxlIGlzIGRpc3BsYXllZCBvbiBkZXNrdG9wJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZSA9IGVsZW1lbnQuZmluZCgndGFibGUuY2VydC1pZC1saXN0Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdtb2JpbGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vYmlsaXplKCkge1xyXG4gICAgICAgICAgICAgICAgJHdpbmRvdy5pbm5lcldpZHRoID0gNjY3O1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgYSBzaW5nbGUgcmVzdWx0IHNvIGl0IGlzIGVhc2llciB0byBjbGljay5cclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cygxLCAwLCAxKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGlja0NhcmQoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBlbGVtZW50LmZpbmQoJ2Rpdi5jZXJ0LWVudGl0eS1saXN0LWNhcmRzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FyZCA9IGNhcmRzLmZpbmQoJy5wYW5lbC1ib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICBjYXJkLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG93cyBjYXJkcycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIG1vYmlsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FyZHMgPSBlbGVtZW50LmZpbmQoJ2Rpdi5jZXJ0LWVudGl0eS1saXN0LWNhcmRzJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2FyZHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG93cyB0aGUgcmVtYWluaW5nIGl0ZW0gY291bnQgd2hlbiByZXF1ZXN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb2NrIG91dCB0aGUgZ2V0SW5jb21wbGV0ZUNvdW50KCkgbWV0aG9kIG9uIHRoZSBvbmUgZW50aXR5IHRoYXQgaXMgcmV0dXJuZWQuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmNvbXBsZXRlQ291bnQgPSAzNDc4O1xyXG4gICAgICAgICAgICAgICAgZW50aXRpZXNSZXN1bHQub2JqZWN0c1swXS5pdGVtU3RhdHVzQ291bnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SW5jb21wbGV0ZUNvdW50OiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0SW5jb21wbGV0ZUNvdW50JykuYW5kLnJldHVyblZhbHVlKGluY29tcGxldGVDb3VudClcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgdGhlIGRpcmVjdGl2ZSB0byBkaXNwbGF5IHRoZSBjb3VudHMuXHJcbiAgICAgICAgICAgICAgICBzaG93SXRlbVN0YXR1c0NvdW50cyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgbW9iaWxpemUoKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudHMgPVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnZGl2LmNlcnQtZW50aXR5LWxpc3QtY2FyZHMgPiAucGFuZWwgPiAucGFuZWwtYm9keSA+IHNwYW4ucHVsbC1yaWdodCA+IHNwYW4ubGFiZWwnKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjb3VudHMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNvdW50cy50ZXh0KCkudHJpbSgpKS50b0VxdWFsKGluY29tcGxldGVDb3VudC50b1N0cmluZygxMCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdnb2VzIHRvIHRoZSBkZXRhaWwgdmlldyB3aGVuIGEgY2FyZCBpcyBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgbW9iaWxpemUoKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dvVG9EZXRhaWxWaWV3Jyk7XHJcbiAgICAgICAgICAgICAgICBjbGlja0NhcmQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ29Ub0RldGFpbFZpZXcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdpZDAnLCBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncGFzc2VzIGEgY2FsbGJhY2sgd2hlbiBwYWdpbmcgaXMgY29uZmlndXJlZCBhbmQgYSBjYXJkIGlzIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZXJJZCA9ICcxMjM4Mzc3MzQnO1xyXG4gICAgICAgICAgICAgICAgdXNlUGFnZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgbW9iaWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ2dldENlcnRpZmljYXRpb25FbnRpdHlJZHMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihbcGFnZXJJZF0pKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dvVG9EZXRhaWxWaWV3Jyk7XHJcbiAgICAgICAgICAgICAgICBjbGlja0NhcmQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ29Ub0RldGFpbFZpZXcpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5nb1RvRGV0YWlsVmlldy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdKS50b0VxdWFsKCdpZDAnKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmlzRnVuY3Rpb24oYXJnc1sxXSkpLnRvRXF1YWwodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VyO1xyXG4gICAgICAgICAgICAgICAgYXJnc1sxXSgpLnRoZW4oKGVudGl0eVBhZ2VyKSA9PiBwYWdlciA9IGVudGl0eVBhZ2VyKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkVudGl0eUlkcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBhZ2VyLmN1cnJlbnRJZHgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocGFnZXIuZW50aXR5SWRzKS50b0VxdWFsKFsgcGFnZXJJZCBdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdsb2FkIG1vcmUgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCdXR0b24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCdidXR0b24ubG9hZC1tb3JlJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhc0J1dHRvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZ2V0QnV0dG9uKCkubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBub3QgZGlzcGxheWVkIGlmIHRoZXJlIGFyZSBubyBtb3JlIHJlc3VsdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXR1cFJlc3VsdHMoNSwgMCwgNSk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoaGFzQnV0dG9uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdpcyBkaXNwbGF5ZWQgaWYgdGhlcmUgYXJlIG1vcmUgcmVzdWx0cycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cygyNSwgMCwgMjApO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGhhc0J1dHRvbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdsb2FkcyB0aGUgbmV4dCBwYWdlIG9mIGRhdGEgd2hlbiBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gYW4gaW5pdGlhbCBsb2FkIG9mIHRoZSBmaXJzdCAyMCBpZGVudGl0aWVzLlxyXG4gICAgICAgICAgICAgICAgc2V0dXBSZXN1bHRzKDI1LCAwLCAyMCk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZ2V0QnV0dG9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgYnV0dG9uIGNsaWNrIHJldHVybiA1IG1vcmUgaWRlbnRpdGllcy5cclxuICAgICAgICAgICAgICAgIHNldHVwUmVzdWx0cygyNSwgMjAsIDUpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB3ZSBoYXZlIDI1IHJvd3Mgbm93ICh3ZWxsIC4uLiBhY3R1YWxseSAyNiBiZWNhdXNlIG9mIHRoZSBcIldvcmtzaGVldCBWaWV3XCIgcm93KS5cclxuICAgICAgICAgICAgICAgIGxldCByb3dzID0gZWxlbWVudC5maW5kKCd0YWJsZS5jZXJ0LWlkLWxpc3QgdHInKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyb3dzLmxlbmd0aCkudG9FcXVhbCgyNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
