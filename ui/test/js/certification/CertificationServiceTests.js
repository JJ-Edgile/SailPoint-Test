System.register(['test/js/TestInitializer', 'certification/CertificationModule', './CertificationTestData', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CertificationService', function () {

                // Use the module.
                beforeEach(module(certificationModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                var baseURLNoSlash = '/identityiq/ui/rest/certifications',
                    baseURL = baseURLNoSlash + '/',
                    certificationService,
                    certificationTestData,
                    http,
                    SortOrder,
                    CertificationItem,
                    Certification,
                    ObjectResultDTO,
                    RemediationSummary,
                    Filter,
                    testService,
                    RoleDetail,
                    EmailTemplate,
                    CertificationTableScope,
                    ApplicationAccount,
                    managedAttributeService;

                /* jshint maxparams: 15 */
                beforeEach(inject(function (_$httpBackend_, _certificationService_, _certificationTestData_, _SortOrder_, _CertificationItem_, _Certification_, _ObjectResultDTO_, _RemediationSummary_, _Filter_, _testService_, _RoleDetail_, _EmailTemplate_, _CertificationTableScope_, _ApplicationAccount_, _managedAttributeService_) {
                    http = _$httpBackend_;
                    certificationService = _certificationService_;
                    certificationTestData = _certificationTestData_;
                    SortOrder = _SortOrder_;
                    CertificationItem = _CertificationItem_;
                    Certification = _Certification_;
                    ObjectResultDTO = _ObjectResultDTO_;
                    RemediationSummary = _RemediationSummary_;
                    Filter = _Filter_;
                    testService = _testService_;
                    RoleDetail = _RoleDetail_;
                    EmailTemplate = _EmailTemplate_;
                    CertificationTableScope = _CertificationTableScope_;
                    ApplicationAccount = _ApplicationAccount_;
                    managedAttributeService = _managedAttributeService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getCertification()', function () {
                    it('should retrieve certification data from REST', function () {
                        var id = '1234',
                            promise = undefined;
                        http.expectGET(baseURL + id).respond(200, { object: certificationTestData.CERTIFICATION_1 });
                        promise = certificationService.getCertification(id);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.getObject() instanceof Certification).toEqual(true);
                        });
                    });

                    it('should throw an exception when no id is passed', function () {
                        expect(function () {
                            certificationService.getCertification();
                        }).toThrow();
                    });
                });

                describe('getCertifications()', function () {
                    it('should retrieve the certifications for the user from REST with null sort', function () {
                        var start = 10,
                            limit = 12,
                            promise = undefined;
                        http.expectGET(baseURLNoSlash + '?limit=12&start=10').respond(200, certificationTestData.LIST_RESULT_CERT_1);
                        promise = certificationService.getCertifications(start, limit);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('Certification');
                        });
                    });

                    it('should retrieve the certifications for the user from REST with sort param', function () {

                        var start = 10,
                            limit = 12,
                            promise = undefined;

                        http.expectGET(baseURLNoSlash + '?limit=12&sort=%5B%5D&start=10').respond(200, certificationTestData.LIST_RESULT_CERT_1);
                        promise = certificationService.getCertifications(start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('Certification');
                        });
                    });
                });

                describe('getSubCertifications()', function () {
                    it('should retrieve sub-certification data from REST', function () {
                        var id = '1234',
                            start = 10,
                            limit = 5,
                            promise = undefined;
                        http.expectGET(baseURL + id + '/subCertifications?limit=5&sort=%5B%5D&start=10').respond(200, certificationTestData.LIST_RESULT_CERT_1);
                        promise = certificationService.getSubCertifications(id, start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('Certification');
                        });
                    });

                    it('should retrieve sub-certification data from REST when null sort', function () {
                        var id = '1234',
                            start = 1,
                            limit = 5;
                        http.expectGET(baseURL + id + '/subCertifications?limit=5&start=1').respond(200, certificationTestData.LIST_RESULT_CERT_1);
                        certificationService.getSubCertifications(id, start, limit, null);
                        http.flush();
                    });

                    it('should default to appropriate start and limit values with null params', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/subCertifications?limit=' + certificationService.defaultLimit + '&start=' + certificationService.defaultStart).respond(200, certificationTestData.LIST_RESULT_CERT_1);
                        certificationService.getSubCertifications(id, null, null, null);
                        http.flush();
                    });

                    it('should throw an exception when no id is passed', function () {
                        expect(function () {
                            certificationService.getSubCertifications();
                        }).toThrow();
                    });
                });

                describe('getCertificationItems()', function () {
                    var certificationItemTestData = undefined;

                    beforeEach(function () {
                        certificationItemTestData = {
                            count: certificationTestData.CERT_ITEMS.length,
                            objects: certificationTestData.CERT_ITEMS
                        };
                    });

                    it('should return certification items data', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            groupBy = 'blah',
                            promise;
                        http.expectGET(baseURL + id + '/items?groupBy=blah&limit=5&sort=%5B%5D&start=0').respond(200, certificationItemTestData);
                        promise = certificationService.getCertificationItems(id, null, start, limit, new SortOrder(), groupBy);
                        http.flush();
                        promise.then(function (response) {
                            expect(response.data.getObjects().length).toEqual(certificationItemTestData.count);
                            expect(response.data.objects[0] instanceof CertificationItem).toEqual(true);
                        });
                    });

                    it('should retrieve certification items data from REST when sort is null', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            promise;
                        http.expectGET(baseURL + id + '/items?limit=5&start=0').respond(200, certificationItemTestData);

                        promise = certificationService.getCertificationItems(id, null, start, limit, null);
                        http.flush();
                        promise.then(function (response) {
                            expect(response.data.getObjects().length).toEqual(certificationItemTestData.count);
                            expect(response.data.objects[0] instanceof CertificationItem).toEqual(true);
                        });
                    });

                    it('should add query params from tableScope when defined', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            tableScope = new CertificationTableScope({
                            statuses: ['Open', 'Complete'],
                            includedTypes: ['Exception', 'PolicyViolation'],
                            excludedTypes: ['Exception', 'PolicyViolation']
                        });
                        spyOn(tableScope, 'addQueryParameters').and.callThrough();
                        http.expectGET(baseURL + id + '/items?excludedType=Exception&excludedType=PolicyViolation&' + 'includedType=Exception&includedType=PolicyViolation&limit=5&start=0&summaryStatus=Open&' + 'summaryStatus=Complete').respond(200, certificationItemTestData);

                        certificationService.getCertificationItems(id, tableScope, start, limit);
                        expect(tableScope.addQueryParameters).toHaveBeenCalled();
                        http.flush();
                    });

                    it('should add filter values when defined', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            filters = {
                            displayName: {
                                value: 'testName'
                            }
                        },
                            expectedUrl = baseURL + id + ('/items?displayName=' + testService.getQueryParamString(filters.displayName) + '&limit=5&start=0');
                        http.expectGET(expectedUrl).respond(200, certificationItemTestData);

                        certificationService.getCertificationItems(id, null, start, limit, null, null, null, filters);
                        http.flush();
                    });

                    it('should call entity endpoint for items if entityId is specified', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            tableScope = new CertificationTableScope({
                            entity: {
                                id: 'princess'
                            }
                        }),
                            expectedUrl = '' + baseURL + id + '/entities/' + tableScope.entity.id + '/items?limit=5&start=0';

                        http.expectGET(expectedUrl).respond(200, certificationItemTestData);

                        certificationService.getCertificationItems(id, tableScope, start, limit);
                        http.flush();
                    });

                    it('should covert additionalEntitlement filter to JSON string', function () {
                        var id = '12345678',
                            start = 0,
                            limit = 5,
                            filters = {
                            app: {
                                value: {
                                    name: 'name',
                                    value: 'value',
                                    isPermission: false,
                                    additionalEntitlement: true
                                }
                            }
                        },

                        // Spell this out since we don't have any good method to get the encoding right with some encoded
                        // commas and some not, etc.
                        encodedApp = '%7B%22value%22:%22%7B%5C%22name%5C%22:%5C%22name%5C%22,' + '%5C%22value%5C%22:%5C%22value%5C%22,%5C%22isPermission%5C%22:false,' + '%5C%22additionalEntitlement%5C%22:true%7D%22%7D',
                            expectedUrl = baseURL + id + ('/items?app=' + encodedApp + '&limit=5&start=0');

                        http.expectGET(expectedUrl).respond(200, certificationItemTestData);
                        certificationService.getCertificationItems(id, null, start, limit, null, null, null, filters);
                        http.flush();
                    });
                });

                describe('getRevocationItems()', function () {
                    it('should retrieve revocation data from REST', function () {
                        var id = '1234',
                            start = 10,
                            limit = 5,
                            promise = undefined;
                        http.expectGET(baseURL + id + '/revocations?limit=5&sort=%5B%5D&start=10').respond(200, certificationTestData.LIST_RESULT_REVOCATION_ITEMS);
                        promise = certificationService.getRevocationItems(id, start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('CertificationRevocation');
                        });
                    });

                    it('should retrieve revocation data from REST when null sort', function () {
                        var id = '1234',
                            start = 1,
                            limit = 5;
                        http.expectGET(baseURL + id + '/revocations?limit=5&start=1').respond(200, certificationTestData.LIST_RESULT_REVOCATION_ITEMS);
                        certificationService.getRevocationItems(id, start, limit, null);
                        http.flush();
                    });

                    it('should default to appropriate start and limit values with null params', function () {
                        var id = '1234';
                        http.expectGET(baseURL + id + '/revocations?limit=' + certificationService.defaultLimit + '&start=' + certificationService.defaultStart).respond(200, certificationTestData.LIST_RESULT_REVOCATION_ITEMS);
                        certificationService.getRevocationItems(id, null, null, null);
                        http.flush();
                    });

                    it('should throw an exception when no id is passed', function () {
                        expect(function () {
                            certificationService.getRevocationItems(null, null, null, null);
                        }).toThrow();
                    });
                });

                describe('saveDecisions()', function () {
                    var filterValueService = undefined;

                    function createDecision(decision) {
                        //Fudge a clone that just returns the decision
                        decision.clone = function () {
                            return decision;
                        };
                        decision.getItem = function () {
                            return decision.item;
                        };
                        decision.getItemId = function () {
                            return decision.item ? decision.item.id : undefined;
                        };
                        return decision;
                    }

                    beforeEach(inject(function (_filterValueService_) {
                        filterValueService = _filterValueService_;
                    }));

                    it('should post decisions to server', function () {
                        var id = '12345678',
                            decisions = [createDecision({
                            some: 'thing'
                        }), createDecision({
                            some: 'stuff'
                        })];
                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: decisions
                        }).respond(200, { data: {} });
                        certificationService.saveDecisions(id, decisions);
                        http.flush();
                    });

                    it('should convert selectedViolationEntitlements to JSON string', function () {
                        var id = '12345678',
                            decisions = [createDecision({
                            selectedViolationEntitlements: [{
                                some: 'thing'
                            }]
                        }), createDecision({
                            some: 'stuff'
                        })],
                            expectedDecisions = angular.copy(decisions);
                        expectedDecisions[0].selectedViolationEntitlements = angular.toJson(expectedDecisions[0].selectedViolationEntitlements);
                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: expectedDecisions
                        }).respond(200, { data: {} });
                        certificationService.saveDecisions(id, decisions);
                        http.flush();
                    });

                    it('should delete certificationItem from decision before posting', function () {
                        var id = '12345678',
                            decisions = [createDecision({
                            item: {
                                id: 'dfafadsfa'
                            }
                        })],
                            expectedDecisions = angular.copy(decisions);

                        expectedDecisions[0].certificationItemId = expectedDecisions[0].item.id;
                        delete expectedDecisions[0].item;

                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: expectedDecisions
                        }).respond(200, { data: {} });
                        certificationService.saveDecisions(id, decisions);
                        http.flush();
                    });

                    it('should call through to convert params to what the server expects if there are filter values', function () {
                        var id = '12345678',
                            decisions = [createDecision({
                            selectionModel: {
                                filterValues: {
                                    somebody: {
                                        value: {
                                            id: 'iusedtoknow',
                                            displayName: 'somebody'
                                        }
                                    }
                                }
                            },
                            status: 'Approved'
                        })],
                            expectedDecisions = angular.copy(decisions);
                        expectedDecisions[0].selectionModel.filterValues.somebody.value = 'iusedtoknow';
                        spyOn(filterValueService, 'getQueryParams').and.callThrough();
                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: expectedDecisions
                        }).respond(200, { data: {} });
                        certificationService.saveDecisions(id, decisions);
                        http.flush();
                        expect(filterValueService.getQueryParams).toHaveBeenCalled();
                    });

                    it('should convert SelectionModelGroups on selection model to simple SelectionModel objects', function () {
                        var id = '12345678',
                            filterValues = {
                            value: {
                                some: 'thing'
                            }
                        },
                            selectionModelGroup = {
                            filterValues: filterValues
                        },
                            decisions = [createDecision({
                            selectionModel: {
                                getCompleteGroupSelectionModels: jasmine.createSpy('getCompleteGroupSelectionModels').and.returnValue([selectionModelGroup]),
                                groups: [{}]
                            },
                            status: 'Approved'
                        })],
                            expectedDecisions = angular.copy(decisions);
                        selectionModelGroup.clone = function () {
                            return selectionModelGroup;
                        };
                        expectedDecisions[0].selectionModel.groups = [selectionModelGroup];
                        spyOn(filterValueService, 'getQueryParams').and.callThrough();
                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: expectedDecisions
                        }).respond(200, { data: {} });
                        certificationService.saveDecisions(id, decisions);
                        http.flush();
                        expect(decisions[0].selectionModel.getCompleteGroupSelectionModels).toHaveBeenCalled();
                        expect(filterValueService.getQueryParams).toHaveBeenCalledWith(filterValues, null, true);
                    });

                    it('should convert result to ObjectResultDTO with Certification object', function () {
                        var id = '12345678',
                            decisions = [createDecision({
                            some: 'thing'
                        }), createDecision({
                            some: 'stuff'
                        })],
                            result = {
                            object: certificationTestData.CERTIFICATION_1
                        },
                            promise;

                        http.expectPOST(baseURL + id + '/decisions', {
                            decisions: decisions
                        }).respond(200, result);
                        promise = certificationService.saveDecisions(id, decisions);
                        http.flush();
                        promise.then(function (response) {
                            expect(response.data instanceof ObjectResultDTO).toEqual(true);
                            expect(response.data.getObject() instanceof Certification).toEqual(true);
                        });
                    });
                });

                describe('signOff()', function () {

                    it('should signoff the certification when no credentials passed in', function () {
                        var id = '12345678',
                            result = {
                            object: certificationTestData.CERTIFICATION_1
                        };

                        http.expectPOST(baseURL + id + '/sign').respond(200, result);
                        certificationService.signOff(id);
                        http.flush();
                    });

                    it('should signoff the certification when credentials passed in for esig', function () {
                        var id = '12345678',
                            username = 'user1',
                            password = 'xyzzy',
                            credentials = {
                            signatureAccountId: username,
                            signaturePassword: password
                        },
                            result = {
                            object: certificationTestData.CERTIFICATION_1
                        };

                        http.expectPOST(baseURL + id + '/sign', credentials).respond(200, result);
                        certificationService.signOff(id, username, password);
                        http.flush();
                    });
                });

                describe('getViolationRemediationAdvice()', function () {
                    var RemediationAdviceResult = undefined,
                        CertificationRemediationAdvice = undefined;

                    beforeEach(inject(function (_RemediationAdviceResult_, _CertificationRemediationAdvice_) {
                        RemediationAdviceResult = _RemediationAdviceResult_;
                        CertificationRemediationAdvice = _CertificationRemediationAdvice_;
                    }));

                    it('should return RemediationAdviceResult', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            promise = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + itemId + '/remediationAdvice').respond(200, certificationTestData.REMEDIATION_ADVICE_RESULT);
                        promise = certificationService.getViolationRemediationAdvice(certId, itemId);
                        http.flush();
                        promise.then(function (adviceResult) {
                            expect(adviceResult instanceof RemediationAdviceResult).toEqual(true);
                            expect(adviceResult.advice instanceof CertificationRemediationAdvice).toEqual(true);
                        });
                    });

                    it('should throw if response data not correct', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            responseData = null,
                            rejectPromise = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + itemId + '/remediationAdvice').respond(200, responseData);
                        certificationService.getViolationRemediationAdvice(certId, itemId)['catch'](function () {
                            return rejectPromise = true;
                        });
                        http.flush();
                        expect(rejectPromise).toBeTruthy();
                    });
                });

                describe('getDelegationDescription()', function () {
                    it('should throw if response data not correct', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            responseData = null,
                            rejectPromise = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + itemId + '/delegationDescription').respond(200, responseData);

                        certificationService.getDelegationDescription(certId, itemId)['catch'](function () {
                            return rejectPromise = true;
                        });
                        http.flush();
                        expect(rejectPromise).toBeTruthy();
                    });
                });

                describe('getRemediationSummary()', function () {
                    it('should return RemediationSummary for revoked roles', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            input = {
                            revokedRoles: ['role1', 'role2']
                        },
                            promise = undefined;

                        http.expectPOST('' + baseURL + certId + '/items/' + itemId + '/remediationSummary', input).respond(200, certificationTestData.REMEDIATION_ADVICE_RESULT.summary);
                        promise = certificationService.getRemediationSummary(certId, itemId, input.revokedRoles, undefined);
                        http.flush();
                        promise.then(function (summary) {
                            expect(summary instanceof RemediationSummary).toEqual(true);
                        });
                    });

                    it('should return RemediationSummary for selected violation entitlements', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            input = {
                            selectedViolationEntitlements: angular.toJson(certificationTestData.POLICY_TREE_NODE)
                        },
                            promise = undefined;

                        http.expectPOST('' + baseURL + certId + '/items/' + itemId + '/remediationSummary', input).respond(200, certificationTestData.REMEDIATION_ADVICE_RESULT.summary);
                        promise = certificationService.getRemediationSummary(certId, itemId, undefined, certificationTestData.POLICY_TREE_NODE);
                        http.flush();
                        promise.then(function (summary) {
                            expect(summary instanceof RemediationSummary).toEqual(true);
                        });
                    });

                    it('should throw if response data not correct', function () {
                        var certId = 'cert1',
                            itemId = 'item1',
                            input = {
                            revokedRoles: ['role1', 'role2']
                        },
                            responseData = null,
                            rejectPromise = undefined;

                        http.expectPOST('' + baseURL + certId + '/items/' + itemId + '/remediationSummary', input).respond(200, responseData);
                        certificationService.getRemediationSummary(certId, itemId, input.revokedRoles)['catch'](function () {
                            return rejectPromise = true;
                        });
                        http.flush();
                        expect(rejectPromise).toBeTruthy();
                    });
                });

                describe('getFilters()', function () {
                    var filter = {
                        property: 'manager',
                        multiValued: false,
                        label: 'Manager',
                        dataType: 'SomeType',
                        allowedValues: null,
                        attributes: {}
                    },
                        filters = [];

                    it('should return an array of filters', function () {
                        var certId = 'cert1',
                            promise = undefined;

                        filters = [new Filter(filter)];
                        http.expectGET('' + baseURL + certId + '/items/filters').respond(200, [filter]);
                        promise = certificationService.getFilters(certId);
                        http.flush();
                        promise.then(function (filtersData) {
                            expect(filtersData.length).toEqual(1);
                            expect(filtersData).toEqual(filters);
                        });
                    });
                });

                describe('getRoleDetails()', function () {
                    it('dies with no cert id', function () {
                        expect(function () {
                            return certificationService.getRoleDetails(null, 'itemid');
                        }).toThrow();
                    });

                    it('dies with no cert item id', function () {
                        expect(function () {
                            return certificationService.getRoleDetails('certId', null);
                        }).toThrow();
                    });

                    it('returns the role details', function () {
                        var certId = 'certId',
                            certItemId = 'certItemId',
                            role = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + certItemId + '/roleDetails').respond(200, {});

                        certificationService.getRoleDetails(certId, certItemId).then(function (returnedRole) {
                            role = returnedRole;
                        });

                        http.flush();

                        expect(role).toBeDefined();
                        expect(role instanceof RoleDetail).toEqual(true);
                    });
                });

                describe('getRoleHierarchy()', function () {
                    it('dies with no cert id', function () {
                        expect(function () {
                            return certificationService.getRoleHierarchy(null, 'itemid', 'roleId');
                        }).toThrow();
                    });

                    it('dies with no cert item id', function () {
                        expect(function () {
                            return certificationService.getRoleHierarchy('certId', null, 'roleId');
                        }).toThrow();
                    });

                    it('dies with no role id', function () {
                        expect(function () {
                            return certificationService.getRoleHierarchy('certId', 'itemId', null);
                        }).toThrow();
                    });

                    it('returns the role details', function () {
                        var certId = 'certId',
                            certItemId = 'certItemId',
                            roleId = 'roleId',
                            hierarchy = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + certItemId + '/roleDetails/' + roleId + '/hierarchy').respond(200, [{ id: 'role1' }, { id: 'role2' }]);

                        certificationService.getRoleHierarchy(certId, certItemId, roleId).then(function (returnedHierarchy) {
                            hierarchy = returnedHierarchy;
                        });

                        http.flush();

                        expect(hierarchy).toBeDefined();
                        expect(angular.isArray(hierarchy)).toEqual(true);
                        expect(hierarchy.length).toEqual(2);
                        expect(hierarchy[0] instanceof RoleDetail).toEqual(true);
                        expect(hierarchy[1] instanceof RoleDetail).toEqual(true);
                    });
                });

                describe('getCertificationReminderEmailTemplate()', function () {
                    var templateData = {
                        toIdentity: {
                            id: '1234',
                            name: 'Gilligan'
                        }
                    };

                    it('should return an EmailTemplate', function () {
                        var certId = 'cert1',
                            promise = undefined;

                        http.expectGET('' + baseURL + certId + '/email/reminder').respond(200, templateData);
                        promise = certificationService.getCertificationReminderEmailTemplate(certId);
                        http.flush();

                        promise.then(function (template) {
                            expect(template).toBeDefined();
                            expect(template instanceof EmailTemplate).toEqual(true);
                        });
                    });
                });

                describe('sendCertificationReminderEmail()', function () {
                    var templateData = {
                        toIdentity: {
                            id: '1234',
                            name: 'Gilligan'
                        }
                    };

                    it('should call resource', function () {
                        var certId = 'cert1',
                            input = {
                            emailTemplate: templateData
                        },
                            promise = undefined;

                        http.expectPOST('' + baseURL + certId + '/email/reminder/send', input).respond(200, null);

                        promise = certificationService.sendCertificationReminderEmail(certId, templateData);
                        http.flush();

                        promise.then(function (response) {
                            expect(response).toBeDefined();
                            expect(response.status).toBe(200);
                        });
                    });
                });

                describe('rescindCertification', function () {
                    it('should call resource', function () {
                        var promise = undefined,
                            certId = 'cert1';
                        http.expectPOST('' + baseURL + certId + '/rescind', null).respond(200, null);

                        promise = certificationService.rescindCertification(certId);
                        http.flush();

                        promise.then(function (response) {
                            expect(response).toBeDefined();
                            expect(response.status).toBe(200);
                        });
                    });
                });

                describe('getAccountDetails()', function () {
                    it('dies with no cert id', function () {
                        expect(function () {
                            return certificationService.getAccountDetails(null, 'itemid');
                        }).toThrow();
                    });

                    it('dies with no cert item id', function () {
                        expect(function () {
                            return certificationService.getAccountDetails('certId', null);
                        }).toThrow();
                    });

                    it('returns the application account details', function () {
                        var certId = 'certId',
                            certItemId = 'certItemId',
                            applicationAccount = undefined;

                        http.expectGET('' + baseURL + certId + '/items/' + certItemId + '/accountDetails').respond(200, {});

                        certificationService.getAccountDetails(certId, certItemId).then(function (returnedAccount) {
                            applicationAccount = returnedAccount;
                        });

                        http.flush();

                        expect(applicationAccount).toBeDefined();
                        expect(applicationAccount instanceof ApplicationAccount).toEqual(true);
                    });
                });

                describe('getEntitlementDetailsUrl()', function () {
                    it('throws with no cert id', function () {
                        expect(function () {
                            return certificationService.getEntitlementDetailsUrl(null, 'itemid');
                        }).toThrow();
                    });

                    it('throws with no cert item id', function () {
                        expect(function () {
                            return certificationService.getEntitlementDetailsUrl('certId', null);
                        }).toThrow();
                    });

                    it('returns the url to the managed attribute details resource', function () {
                        var certId = '1234',
                            certItemId = '5678',
                            url = '' + baseURL + certId + '/items/' + certItemId + '/managedAttributeDetails';
                        expect(certificationService.getEntitlementDetailsUrl(certId, certItemId)).toEqual(url);
                    });
                });

                describe('forwardCertification()', function () {
                    var workItemService = undefined;

                    beforeEach(inject(function (_workItemService_) {
                        workItemService = _workItemService_;
                    }));

                    it('throws with no certification', function () {
                        expect(function () {
                            return certificationService.forwardCertification(null, function () {});
                        }).toThrow();
                    });

                    it('throws with no callback function', function () {
                        expect(function () {
                            return certificationService.forwardCertification({}, null);
                        }).toThrow();
                    });

                    it('calls workItemService showForwardDialog to forward', function () {
                        var workItemId = 'workItem1234',
                            cert = {
                            workItemId: workItemId
                        },
                            callbackFn = function () {
                            return true;
                        };
                        spyOn(workItemService, 'showForwardDialog');
                        certificationService.forwardCertification(cert, callbackFn);
                        expect(workItemService.showForwardDialog).toHaveBeenCalled();
                        var args = workItemService.showForwardDialog.calls.mostRecent().args;
                        expect(args[0]).toEqual(cert.workItemId);
                        expect(args[1]).toEqual(callbackFn);
                    });
                });

                describe('getIdentityAttributes', function () {
                    it('should call through to backend', function () {
                        var certId = '123',
                            certItemId = '321',
                            expectedUrl = '' + baseURL + certId + '/items/' + certItemId + '/identityAttributes';
                        http.expectGET(expectedUrl).respond(200, { attributes: [] });
                        certificationService.getIdentityAttributes(certId, certItemId);
                        http.flush();
                    });
                });

                describe('getLinkAttributes', function () {
                    it('should call through to backend', function () {
                        var certId = '123',
                            certItemId = '321',
                            expectedUrl = '' + baseURL + certId + '/items/' + certItemId + '/linkAttributes',
                            response = {
                            objects: []
                        };
                        http.expectGET(expectedUrl).respond(200, response);
                        certificationService.getLinkAttributes(certId, certItemId);
                        http.flush();
                    });
                });

                describe('getRoleProfile', function () {
                    it('should call through to the backend and return a RoleProfile', function () {
                        var certId = '123',
                            certItem = { id: '321' },
                            expectedUrl = '' + baseURL + certId + '/items/' + certItem.id + '/roleProfile',
                            name = 'someName',
                            permissions = ['thing one', 'thing two'],
                            constraints = ['foo'],
                            response = {
                            name: name,
                            permissions: permissions,
                            constraints: constraints
                        };
                        http.expectGET(expectedUrl).respond(200, response);
                        certificationService.getRoleProfileDetails(certId, certItem).then(function (response) {
                            expect(response.name).toEqual(name);
                            expect(response.constraints).toEqual(constraints);
                            expect(response.permissions).toEqual(permissions);
                        });
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHbEo7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1CQUFtQjtZQUNsRSxhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLHdCQUF3QixZQUFXOzs7Z0JBR3hDLFdBQVcsT0FBTyxxQkFBcUI7O2dCQUV2QyxXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLElBQUksaUJBQWlCO29CQUFzQyxVQUFVLGlCQUFpQjtvQkFDbEY7b0JBQXNCO29CQUF1QjtvQkFBTTtvQkFBVztvQkFBbUI7b0JBQ2pGO29CQUFpQjtvQkFBb0I7b0JBQVE7b0JBQWE7b0JBQVk7b0JBQ3RFO29CQUF5QjtvQkFBb0I7OztnQkFHakQsV0FBVyxPQUFPLFVBQVMsZ0JBQWdCLHdCQUF3Qix5QkFBeUIsYUFDakUscUJBQXFCLGlCQUFpQixtQkFDdEMsc0JBQXNCLFVBQVUsZUFBZSxjQUFjLGlCQUM3RCwyQkFBMkIsc0JBQXNCLDJCQUEyQjtvQkFDbkcsT0FBTztvQkFDUCx1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixxQkFBcUI7b0JBQ3JCLFNBQVM7b0JBQ1QsY0FBYztvQkFDZCxhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsMEJBQTBCO29CQUMxQixxQkFBcUI7b0JBQ3JCLDBCQUEwQjs7O2dCQUc5QixVQUFVLFlBQVc7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QUFLOzs7O2dCQUliLFNBQVMsa0JBQWtCLFlBQU07b0JBQzdCLEdBQUcsK0RBQStELFlBQU07d0JBQ3BFLElBQUksU0FBUzs0QkFDVCxXQUFXLEVBQUMsSUFBSTs0QkFDaEIsY0FBVyxLQUFNLFVBQVUsU0FBTSxZQUFVLFNBQVMsS0FBRTs0QkFDdEQsT0FBTzs0QkFDUCxjQUFjLENBQUMsYUFBYTs0QkFDNUIsY0FBYyxDQUFDOzRCQUNmLFdBQVc7NEJBQ1AsTUFBTTs0QkFDTixhQUFhOzRCQUNiLGFBQWE7O3dCQUVyQixLQUFLLFVBQVUsYUFBYSxRQUFRLEtBQUs7d0JBQ3pDLHFCQUFxQixzQkFBc0IsUUFBUSxVQUFVLEtBQUssVUFBQSxVQUFZOzRCQUMxRSxPQUFPLFNBQVMsTUFBTSxRQUFROzRCQUM5QixPQUFPLFNBQVMsYUFBYSxRQUFROzRCQUNyQyxPQUFPLFNBQVMsYUFBYSxRQUFROzt3QkFFekMsS0FBSzs7Ozs7O0dBNEJkIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gVXNlIHRoZSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcblxuICAgIHZhciBiYXNlVVJMTm9TbGFzaCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L2NlcnRpZmljYXRpb25zJywgYmFzZVVSTCA9IGJhc2VVUkxOb1NsYXNoICsgJy8nLFxuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBodHRwLCBTb3J0T3JkZXIsIENlcnRpZmljYXRpb25JdGVtLCBDZXJ0aWZpY2F0aW9uLFxuICAgICAgICBPYmplY3RSZXN1bHREVE8sIFJlbWVkaWF0aW9uU3VtbWFyeSwgRmlsdGVyLCB0ZXN0U2VydmljZSwgUm9sZURldGFpbCwgRW1haWxUZW1wbGF0ZSxcbiAgICAgICAgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUsIEFwcGxpY2F0aW9uQWNjb3VudCwgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2U7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxNSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kaHR0cEJhY2tlbmRfLCBfY2VydGlmaWNhdGlvblNlcnZpY2VfLCBfY2VydGlmaWNhdGlvblRlc3REYXRhXywgX1NvcnRPcmRlcl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NlcnRpZmljYXRpb25JdGVtXywgX0NlcnRpZmljYXRpb25fLCBfT2JqZWN0UmVzdWx0RFRPXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfUmVtZWRpYXRpb25TdW1tYXJ5XywgX0ZpbHRlcl8sIF90ZXN0U2VydmljZV8sIF9Sb2xlRGV0YWlsXywgX0VtYWlsVGVtcGxhdGVfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZV8sIF9BcHBsaWNhdGlvbkFjY291bnRfLCBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfKSB7XG4gICAgICAgIGh0dHAgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgICAgIENlcnRpZmljYXRpb25JdGVtID0gX0NlcnRpZmljYXRpb25JdGVtXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbiA9IF9DZXJ0aWZpY2F0aW9uXztcbiAgICAgICAgT2JqZWN0UmVzdWx0RFRPID0gX09iamVjdFJlc3VsdERUT187XG4gICAgICAgIFJlbWVkaWF0aW9uU3VtbWFyeSA9IF9SZW1lZGlhdGlvblN1bW1hcnlfO1xuICAgICAgICBGaWx0ZXIgPSBfRmlsdGVyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBSb2xlRGV0YWlsID0gX1JvbGVEZXRhaWxfO1xuICAgICAgICBFbWFpbFRlbXBsYXRlID0gX0VtYWlsVGVtcGxhdGVfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZSA9IF9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZV87XG4gICAgICAgIEFwcGxpY2F0aW9uQWNjb3VudCA9IF9BcHBsaWNhdGlvbkFjY291bnRfO1xuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSA9IF9tYW5hZ2VkQXR0cmlidXRlU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q2VydGlmaWNhdGlvbigpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgY2VydGlmaWNhdGlvbiBkYXRhIGZyb20gUkVTVCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnLCBwcm9taXNlO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkKS5yZXNwb25kKDIwMCwge29iamVjdDogY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMX0pO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb24oaWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5nZXRPYmplY3QoKSBpbnN0YW5jZW9mIENlcnRpZmljYXRpb24pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBubyBpZCBpcyBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENlcnRpZmljYXRpb25zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSB0aGUgY2VydGlmaWNhdGlvbnMgZm9yIHRoZSB1c2VyIGZyb20gUkVTVCB3aXRoIG51bGwgc29ydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMTAsIGxpbWl0ID0gMTIsIHByb21pc2U7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChiYXNlVVJMTm9TbGFzaCArICc/bGltaXQ9MTImc3RhcnQ9MTAnKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkxJU1RfUkVTVUxUX0NFUlRfMSk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbnMoc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgcmVzcG9uc2Ugd2FzIHRyYW5zZm9ybWVkIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdDZXJ0aWZpY2F0aW9uJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSB0aGUgY2VydGlmaWNhdGlvbnMgZm9yIHRoZSB1c2VyIGZyb20gUkVTVCB3aXRoIHNvcnQgcGFyYW0nLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMTAsIGxpbWl0ID0gMTIsIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkxOb1NsYXNoICsgJz9saW1pdD0xMiZzb3J0PSU1QiU1RCZzdGFydD0xMCcpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuTElTVF9SRVNVTFRfQ0VSVF8xKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9ucyhzdGFydCwgbGltaXQsIG5ldyBTb3J0T3JkZXIoKSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdDZXJ0aWZpY2F0aW9uJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0U3ViQ2VydGlmaWNhdGlvbnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIHN1Yi1jZXJ0aWZpY2F0aW9uIGRhdGEgZnJvbSBSRVNUJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzNCcsXG4gICAgICAgICAgICAgICAgc3RhcnQgPSAxMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvc3ViQ2VydGlmaWNhdGlvbnM/bGltaXQ9NSZzb3J0PSU1QiU1RCZzdGFydD0xMCcpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuTElTVF9SRVNVTFRfQ0VSVF8xKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRTdWJDZXJ0aWZpY2F0aW9ucyhpZCwgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCkpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xpc3RSZXN1bHREVE8nKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0NlcnRpZmljYXRpb24nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIHN1Yi1jZXJ0aWZpY2F0aW9uIGRhdGEgZnJvbSBSRVNUIHdoZW4gbnVsbCBzb3J0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzNCcsXG4gICAgICAgICAgICAgICAgc3RhcnQgPSAxLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvc3ViQ2VydGlmaWNhdGlvbnM/bGltaXQ9NSZzdGFydD0xJylcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25UZXN0RGF0YS5MSVNUX1JFU1VMVF9DRVJUXzEpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0U3ViQ2VydGlmaWNhdGlvbnMoaWQsIHN0YXJ0LCBsaW1pdCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGVmYXVsdCB0byBhcHByb3ByaWF0ZSBzdGFydCBhbmQgbGltaXQgdmFsdWVzIHdpdGggbnVsbCBwYXJhbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvc3ViQ2VydGlmaWNhdGlvbnM/bGltaXQ9JyArIGNlcnRpZmljYXRpb25TZXJ2aWNlLmRlZmF1bHRMaW1pdCArXG4gICAgICAgICAgICAgICAgJyZzdGFydD0nICsgY2VydGlmaWNhdGlvblNlcnZpY2UuZGVmYXVsdFN0YXJ0KS5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkxJU1RfUkVTVUxUX0NFUlRfMSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRTdWJDZXJ0aWZpY2F0aW9ucyhpZCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gbm8gaWQgaXMgcGFzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0U3ViQ2VydGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0Q2VydGlmaWNhdGlvbkl0ZW1zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGE7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgY291bnQ6IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY2VydGlmaWNhdGlvbiBpdGVtcyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXG4gICAgICAgICAgICAgICAgZ3JvdXBCeSA9ICdibGFoJyxcbiAgICAgICAgICAgICAgICBwcm9taXNlO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9pdGVtcz9ncm91cEJ5PWJsYWgmbGltaXQ9NSZzb3J0PSU1QiU1RCZzdGFydD0wJylcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGEpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb25JdGVtcyhpZCwgbnVsbCwgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCksIGdyb3VwQnkpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuZ2V0T2JqZWN0cygpLmxlbmd0aCkudG9FcXVhbChjZXJ0aWZpY2F0aW9uSXRlbVRlc3REYXRhLmNvdW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdIGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvbkl0ZW0pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBjZXJ0aWZpY2F0aW9uIGl0ZW1zIGRhdGEgZnJvbSBSRVNUIHdoZW4gc29ydCBpcyBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvaXRlbXM/bGltaXQ9NSZzdGFydD0wJylcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGEpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkl0ZW1zKGlkLCBudWxsLCBzdGFydCwgbGltaXQsIG51bGwpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuZ2V0T2JqZWN0cygpLmxlbmd0aCkudG9FcXVhbChjZXJ0aWZpY2F0aW9uSXRlbVRlc3REYXRhLmNvdW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdIGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvbkl0ZW0pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcXVlcnkgcGFyYW1zIGZyb20gdGFibGVTY29wZSB3aGVuIGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICAgICAgc3RhcnQgPSAwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNSxcbiAgICAgICAgICAgICAgICB0YWJsZVNjb3BlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnT3BlbicsICdDb21wbGV0ZSddLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlZFR5cGVzOiBbJ0V4Y2VwdGlvbicsICdQb2xpY3lWaW9sYXRpb24nXSxcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRUeXBlczogWydFeGNlcHRpb24nLCAnUG9saWN5VmlvbGF0aW9uJ11cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNweU9uKHRhYmxlU2NvcGUsICdhZGRRdWVyeVBhcmFtZXRlcnMnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvaXRlbXM/ZXhjbHVkZWRUeXBlPUV4Y2VwdGlvbiZleGNsdWRlZFR5cGU9UG9saWN5VmlvbGF0aW9uJicgK1xuICAgICAgICAgICAgICAgICdpbmNsdWRlZFR5cGU9RXhjZXB0aW9uJmluY2x1ZGVkVHlwZT1Qb2xpY3lWaW9sYXRpb24mbGltaXQ9NSZzdGFydD0wJnN1bW1hcnlTdGF0dXM9T3BlbiYnICtcbiAgICAgICAgICAgICAgICAnc3VtbWFyeVN0YXR1cz1Db21wbGV0ZScpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uSXRlbVRlc3REYXRhKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkl0ZW1zKGlkLCB0YWJsZVNjb3BlLCBzdGFydCwgbGltaXQpO1xuICAgICAgICAgICAgZXhwZWN0KHRhYmxlU2NvcGUuYWRkUXVlcnlQYXJhbWV0ZXJzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWRkIGZpbHRlciB2YWx1ZXMgd2hlbiBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndGVzdE5hbWUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYmFzZVVSTCArIGlkICtcbiAgICAgICAgICAgICAgICAgICAgYC9pdGVtcz9kaXNwbGF5TmFtZT0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5kaXNwbGF5TmFtZSl9JmxpbWl0PTUmc3RhcnQ9MGA7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChleHBlY3RlZFVybClcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGEpO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRDZXJ0aWZpY2F0aW9uSXRlbXMoaWQsIG51bGwsIHN0YXJ0LCBsaW1pdCwgbnVsbCwgbnVsbCwgbnVsbCwgZmlsdGVycyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGVudGl0eSBlbmRwb2ludCBmb3IgaXRlbXMgaWYgZW50aXR5SWQgaXMgc3BlY2lmaWVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQ1Njc4JyxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSA1LFxuICAgICAgICAgICAgICAgIHRhYmxlU2NvcGUgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoe1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAncHJpbmNlc3MnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9ICBgJHtiYXNlVVJMfSR7aWR9L2VudGl0aWVzLyR7dGFibGVTY29wZS5lbnRpdHkuaWR9L2l0ZW1zP2xpbWl0PTUmc3RhcnQ9MGA7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvbkl0ZW1UZXN0RGF0YSk7XG5cbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldENlcnRpZmljYXRpb25JdGVtcyhpZCwgdGFibGVTY29wZSwgc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb3ZlcnQgYWRkaXRpb25hbEVudGl0bGVtZW50IGZpbHRlciB0byBKU09OIHN0cmluZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICAgICAgc3RhcnQgPSAwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgICAgICBhcHA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUGVybWlzc2lvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbEVudGl0bGVtZW50OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIFNwZWxsIHRoaXMgb3V0IHNpbmNlIHdlIGRvbid0IGhhdmUgYW55IGdvb2QgbWV0aG9kIHRvIGdldCB0aGUgZW5jb2RpbmcgcmlnaHQgd2l0aCBzb21lIGVuY29kZWRcbiAgICAgICAgICAgICAgICAvLyBjb21tYXMgYW5kIHNvbWUgbm90LCBldGMuXG4gICAgICAgICAgICAgICAgZW5jb2RlZEFwcCA9ICclN0IlMjJ2YWx1ZSUyMjolMjIlN0IlNUMlMjJuYW1lJTVDJTIyOiU1QyUyMm5hbWUlNUMlMjIsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyU1QyUyMnZhbHVlJTVDJTIyOiU1QyUyMnZhbHVlJTVDJTIyLCU1QyUyMmlzUGVybWlzc2lvbiU1QyUyMjpmYWxzZSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJTVDJTIyYWRkaXRpb25hbEVudGl0bGVtZW50JTVDJTIyOnRydWUlN0QlMjIlN0QnLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYmFzZVVSTCArIGlkICsgYC9pdGVtcz9hcHA9JHtlbmNvZGVkQXBwfSZsaW1pdD01JnN0YXJ0PTBgO1xuXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChleHBlY3RlZFVybClcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25JdGVtVGVzdERhdGEpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvbkl0ZW1zKGlkLCBudWxsLCBzdGFydCwgbGltaXQsIG51bGwsIG51bGwsIG51bGwsIGZpbHRlcnMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZXZvY2F0aW9uSXRlbXMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIHJldm9jYXRpb24gZGF0YSBmcm9tIFJFU1QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDEwLFxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNSxcbiAgICAgICAgICAgICAgICBwcm9taXNlO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYmFzZVVSTCArIGlkICsgJy9yZXZvY2F0aW9ucz9saW1pdD01JnNvcnQ9JTVCJTVEJnN0YXJ0PTEwJylcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGNlcnRpZmljYXRpb25UZXN0RGF0YS5MSVNUX1JFU1VMVF9SRVZPQ0FUSU9OX0lURU1TKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZXZvY2F0aW9uSXRlbXMoaWQsIHN0YXJ0LCBsaW1pdCwgbmV3IFNvcnRPcmRlcigpKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgcmVzcG9uc2Ugd2FzIHRyYW5zZm9ybWVkIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdDZXJ0aWZpY2F0aW9uUmV2b2NhdGlvbicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgcmV2b2NhdGlvbiBkYXRhIGZyb20gUkVTVCB3aGVuIG51bGwgc29ydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMSxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDU7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChiYXNlVVJMICsgaWQgKyAnL3Jldm9jYXRpb25zP2xpbWl0PTUmc3RhcnQ9MScpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuTElTVF9SRVNVTFRfUkVWT0NBVElPTl9JVEVNUyk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZXZvY2F0aW9uSXRlbXMoaWQsIHN0YXJ0LCBsaW1pdCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGVmYXVsdCB0byBhcHByb3ByaWF0ZSBzdGFydCBhbmQgbGltaXQgdmFsdWVzIHdpdGggbnVsbCBwYXJhbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0JztcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGJhc2VVUkwgKyBpZCArICcvcmV2b2NhdGlvbnM/bGltaXQ9JyArIGNlcnRpZmljYXRpb25TZXJ2aWNlLmRlZmF1bHRMaW1pdCArXG4gICAgICAgICAgICAgICAgJyZzdGFydD0nICsgY2VydGlmaWNhdGlvblNlcnZpY2UuZGVmYXVsdFN0YXJ0KVxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgY2VydGlmaWNhdGlvblRlc3REYXRhLkxJU1RfUkVTVUxUX1JFVk9DQVRJT05fSVRFTVMpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0UmV2b2NhdGlvbkl0ZW1zKGlkLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBubyBpZCBpcyBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZXZvY2F0aW9uSXRlbXMobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NhdmVEZWNpc2lvbnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZmlsdGVyVmFsdWVTZXJ2aWNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZURlY2lzaW9uKGRlY2lzaW9uKSB7XG4gICAgICAgICAgICAvL0Z1ZGdlIGEgY2xvbmUgdGhhdCBqdXN0IHJldHVybnMgdGhlIGRlY2lzaW9uXG4gICAgICAgICAgICBkZWNpc2lvbi5jbG9uZSA9ICgpID0+IGRlY2lzaW9uO1xuICAgICAgICAgICAgZGVjaXNpb24uZ2V0SXRlbSA9ICgpID0+IGRlY2lzaW9uLml0ZW07XG4gICAgICAgICAgICBkZWNpc2lvbi5nZXRJdGVtSWQgPSAoKSA9PiBkZWNpc2lvbi5pdGVtID8gZGVjaXNpb24uaXRlbS5pZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBkZWNpc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfZmlsdGVyVmFsdWVTZXJ2aWNlXykgPT4ge1xuICAgICAgICAgICAgZmlsdGVyVmFsdWVTZXJ2aWNlID0gX2ZpbHRlclZhbHVlU2VydmljZV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIHBvc3QgZGVjaXNpb25zIHRvIHNlcnZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJzEyMzQ1Njc4JyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnMgPSBbIGNyZWF0ZURlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgc29tZTogJ3RoaW5nJ1xuICAgICAgICAgICAgICAgIH0pLCBjcmVhdGVEZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgICAgIHNvbWU6ICdzdHVmZidcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoYmFzZVVSTCArIGlkICsgJy9kZWNpc2lvbnMnLCB7XG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBkZWNpc2lvbnNcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7IGRhdGE6IHt9IH0pO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhpZCwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb252ZXJ0IHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzIHRvIEpTT04gc3RyaW5nJywgKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGlkID0gJzEyMzQ1Njc4JyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnMgPSBbIGNyZWF0ZURlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb21lOiAndGhpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSksIGNyZWF0ZURlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgc29tZTogJ3N0dWZmJ1xuICAgICAgICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9ucyA9IGFuZ3VsYXIuY29weShkZWNpc2lvbnMpO1xuICAgICAgICAgICAgZXhwZWN0ZWREZWNpc2lvbnNbMF0uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMgPVxuICAgICAgICAgICAgICAgIGFuZ3VsYXIudG9Kc29uKGV4cGVjdGVkRGVjaXNpb25zWzBdLnNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzKTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChiYXNlVVJMICsgaWQgKyAnL2RlY2lzaW9ucycsIHtcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IGV4cGVjdGVkRGVjaXNpb25zXG4gICAgICAgICAgICB9KS5yZXNwb25kKDIwMCwgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMoaWQsIGRlY2lzaW9ucyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIGNlcnRpZmljYXRpb25JdGVtIGZyb20gZGVjaXNpb24gYmVmb3JlIHBvc3RpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9ucyA9IFsgY3JlYXRlRGVjaXNpb24oe1xuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2RmYWZhZHNmYSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9ucyA9IGFuZ3VsYXIuY29weShkZWNpc2lvbnMpO1xuXG4gICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uc1swXS5jZXJ0aWZpY2F0aW9uSXRlbUlkID0gZXhwZWN0ZWREZWNpc2lvbnNbMF0uaXRlbS5pZDtcbiAgICAgICAgICAgIGRlbGV0ZSBleHBlY3RlZERlY2lzaW9uc1swXS5pdGVtO1xuXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoYmFzZVVSTCArIGlkICsgJy9kZWNpc2lvbnMnLCB7XG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBleHBlY3RlZERlY2lzaW9uc1xuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHsgZGF0YToge30gfSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zKGlkLCBkZWNpc2lvbnMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBjb252ZXJ0IHBhcmFtcyB0byB3aGF0IHRoZSBzZXJ2ZXIgZXhwZWN0cyBpZiB0aGVyZSBhcmUgZmlsdGVyIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zID0gWyBjcmVhdGVEZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpdXNlZHRva25vdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3NvbWVib2R5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgICAgICB9KV0sXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWREZWNpc2lvbnMgPSBhbmd1bGFyLmNvcHkoZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGV4cGVjdGVkRGVjaXNpb25zWzBdLnNlbGVjdGlvbk1vZGVsLmZpbHRlclZhbHVlcy5zb21lYm9keS52YWx1ZSA9ICdpdXNlZHRva25vdyc7XG4gICAgICAgICAgICBzcHlPbihmaWx0ZXJWYWx1ZVNlcnZpY2UsICdnZXRRdWVyeVBhcmFtcycpLmFuZC5jYWxsVGhyb3VnaCgpO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGJhc2VVUkwgKyBpZCArICcvZGVjaXNpb25zJywge1xuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogZXhwZWN0ZWREZWNpc2lvbnNcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7IGRhdGE6IHt9IH0pO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhpZCwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJWYWx1ZVNlcnZpY2UuZ2V0UXVlcnlQYXJhbXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb252ZXJ0IFNlbGVjdGlvbk1vZGVsR3JvdXBzIG9uIHNlbGVjdGlvbiBtb2RlbCB0byBzaW1wbGUgU2VsZWN0aW9uTW9kZWwgb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc29tZTogJ3RoaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbEdyb3VwID0ge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IGZpbHRlclZhbHVlc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zID0gWyBjcmVhdGVEZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDb21wbGV0ZUdyb3VwU2VsZWN0aW9uTW9kZWxzOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0Q29tcGxldGVHcm91cFNlbGVjdGlvbk1vZGVscycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZShbIHNlbGVjdGlvbk1vZGVsR3JvdXAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHM6IFt7fV1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnQXBwcm92ZWQnXG4gICAgICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkRGVjaXNpb25zID0gYW5ndWxhci5jb3B5KGRlY2lzaW9ucyk7XG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbEdyb3VwLmNsb25lID0gKCkgPT4gc2VsZWN0aW9uTW9kZWxHcm91cDtcbiAgICAgICAgICAgIGV4cGVjdGVkRGVjaXNpb25zWzBdLnNlbGVjdGlvbk1vZGVsLmdyb3VwcyA9IFtzZWxlY3Rpb25Nb2RlbEdyb3VwXTtcbiAgICAgICAgICAgIHNweU9uKGZpbHRlclZhbHVlU2VydmljZSwgJ2dldFF1ZXJ5UGFyYW1zJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoYmFzZVVSTCArIGlkICsgJy9kZWNpc2lvbnMnLCB7XG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBleHBlY3RlZERlY2lzaW9uc1xuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHsgZGF0YToge30gfSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zYXZlRGVjaXNpb25zKGlkLCBkZWNpc2lvbnMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uc1swXS5zZWxlY3Rpb25Nb2RlbC5nZXRDb21wbGV0ZUdyb3VwU2VsZWN0aW9uTW9kZWxzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmaWx0ZXJWYWx1ZXMsIG51bGwsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNvbnZlcnQgcmVzdWx0IHRvIE9iamVjdFJlc3VsdERUTyB3aXRoIENlcnRpZmljYXRpb24gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9ucyA9IFsgY3JlYXRlRGVjaXNpb24oe1xuICAgICAgICAgICAgICAgICAgICBzb21lOiAndGhpbmcnXG4gICAgICAgICAgICAgICAgfSksIGNyZWF0ZURlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICAgICAgc29tZTogJ3N0dWZmJ1xuICAgICAgICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMVxuICAgICAgICAgICAgICAgIH0sIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChiYXNlVVJMICsgaWQgKyAnL2RlY2lzaW9ucycsIHtcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IGRlY2lzaW9uc1xuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHJlc3VsdCk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhpZCwgZGVjaXNpb25zKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhIGluc3RhbmNlb2YgT2JqZWN0UmVzdWx0RFRPKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmdldE9iamVjdCgpIGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvbikudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaWduT2ZmKCknLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIHNpZ25vZmYgdGhlIGNlcnRpZmljYXRpb24gd2hlbiBubyBjcmVkZW50aWFscyBwYXNzZWQgaW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpZCA9ICcxMjM0NTY3OCcsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzFcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoYmFzZVVSTCArIGlkICsgJy9zaWduJykucmVzcG9uZCgyMDAsIHJlc3VsdCk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKGlkKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaWdub2ZmIHRoZSBjZXJ0aWZpY2F0aW9uIHdoZW4gY3JlZGVudGlhbHMgcGFzc2VkIGluIGZvciBlc2lnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzNDU2NzgnLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lID0gJ3VzZXIxJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZCA9ICd4eXp6eScsXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVBY2NvdW50SWQ6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChiYXNlVVJMICsgaWQgKyAnL3NpZ24nLCBjcmVkZW50aWFscykucmVzcG9uZCgyMDAsIHJlc3VsdCk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5zaWduT2ZmKGlkLCB1c2VybmFtZSwgcGFzc3dvcmQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRWaW9sYXRpb25SZW1lZGlhdGlvbkFkdmljZSgpJywgKCkgPT4ge1xuICAgICAgICBsZXQgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQsIENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkFkdmljZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JlbWVkaWF0aW9uQWR2aWNlUmVzdWx0XywgX0NlcnRpZmljYXRpb25SZW1lZGlhdGlvbkFkdmljZV8pID0+IHtcbiAgICAgICAgICAgIFJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0ID0gX1JlbWVkaWF0aW9uQWR2aWNlUmVzdWx0XztcbiAgICAgICAgICAgIENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkFkdmljZSA9IF9DZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2VfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJ2NlcnQxJyxcbiAgICAgICAgICAgICAgICBpdGVtSWQgPSAnaXRlbTEnLFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2l0ZW1zLyR7aXRlbUlkfS9yZW1lZGlhdGlvbkFkdmljZWApXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVCk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0VmlvbGF0aW9uUmVtZWRpYXRpb25BZHZpY2UoY2VydElkLCBpdGVtSWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChhZHZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoYWR2aWNlUmVzdWx0IGluc3RhbmNlb2YgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkdmljZVJlc3VsdC5hZHZpY2UgaW5zdGFuY2VvZiBDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2UpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiByZXNwb25zZSBkYXRhIG5vdCBjb3JyZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJ2NlcnQxJyxcbiAgICAgICAgICAgICAgICBpdGVtSWQgPSAnaXRlbTEnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IG51bGwsXG4gICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZTtcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7YmFzZVVSTH0ke2NlcnRJZH0vaXRlbXMvJHtpdGVtSWR9L3JlbWVkaWF0aW9uQWR2aWNlYClcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRWaW9sYXRpb25SZW1lZGlhdGlvbkFkdmljZShjZXJ0SWQsIGl0ZW1JZCkuY2F0Y2goKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmVqZWN0UHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREZWxlZ2F0aW9uRGVzY3JpcHRpb24oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiByZXNwb25zZSBkYXRhIG5vdCBjb3JyZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJ2NlcnQxJyxcbiAgICAgICAgICAgICAgICBpdGVtSWQgPSAnaXRlbTEnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IG51bGwsXG4gICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZTtcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7YmFzZVVSTH0ke2NlcnRJZH0vaXRlbXMvJHtpdGVtSWR9L2RlbGVnYXRpb25EZXNjcmlwdGlvbmApXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCByZXNwb25zZURhdGEpO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXREZWxlZ2F0aW9uRGVzY3JpcHRpb24oY2VydElkLCBpdGVtSWQpLmNhdGNoKCgpID0+XG4gICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmVqZWN0UHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZW1lZGlhdGlvblN1bW1hcnkoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gUmVtZWRpYXRpb25TdW1tYXJ5IGZvciByZXZva2VkIHJvbGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnRJZCA9ICdjZXJ0MScsXG4gICAgICAgICAgICAgICAgaXRlbUlkID0gJ2l0ZW0xJyxcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmV2b2tlZFJvbGVzOiBbJ3JvbGUxJywgJ3JvbGUyJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChgJHtiYXNlVVJMfSR7Y2VydElkfS9pdGVtcy8ke2l0ZW1JZH0vcmVtZWRpYXRpb25TdW1tYXJ5YCwgaW5wdXQpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVC5zdW1tYXJ5KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvblN1bW1hcnkoXG4gICAgICAgICAgICAgICAgY2VydElkLCBpdGVtSWQsIGlucHV0LnJldm9rZWRSb2xlcywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbigoc3VtbWFyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdW1tYXJ5IGluc3RhbmNlb2YgUmVtZWRpYXRpb25TdW1tYXJ5KS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIFJlbWVkaWF0aW9uU3VtbWFyeSBmb3Igc2VsZWN0ZWQgdmlvbGF0aW9uIGVudGl0bGVtZW50cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnY2VydDEnLFxuICAgICAgICAgICAgICAgIGl0ZW1JZCA9ICdpdGVtMScsXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzOiBhbmd1bGFyLnRvSnNvbihjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChgJHtiYXNlVVJMfSR7Y2VydElkfS9pdGVtcy8ke2l0ZW1JZH0vcmVtZWRpYXRpb25TdW1tYXJ5YCwgaW5wdXQpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVC5zdW1tYXJ5KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvblN1bW1hcnkoXG4gICAgICAgICAgICAgICAgY2VydElkLCBpdGVtSWQsIHVuZGVmaW5lZCwgY2VydGlmaWNhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX05PREUpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChzdW1tYXJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN1bW1hcnkgaW5zdGFuY2VvZiBSZW1lZGlhdGlvblN1bW1hcnkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgcmVzcG9uc2UgZGF0YSBub3QgY29ycmVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNlcnRJZCA9ICdjZXJ0MScsXG4gICAgICAgICAgICAgICAgaXRlbUlkID0gJ2l0ZW0xJyxcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmV2b2tlZFJvbGVzOiBbJ3JvbGUxJywgJ3JvbGUyJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IG51bGwsXG4gICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZTtcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2l0ZW1zLyR7aXRlbUlkfS9yZW1lZGlhdGlvblN1bW1hcnlgLCBpbnB1dClcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvblN1bW1hcnkoY2VydElkLCBpdGVtSWQsIGlucHV0LnJldm9rZWRSb2xlcykuY2F0Y2goKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHRydWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QocmVqZWN0UHJvbWlzZSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRGaWx0ZXJzKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBmaWx0ZXIgPSB7XG4gICAgICAgICAgICBwcm9wZXJ0eTogJ21hbmFnZXInLFxuICAgICAgICAgICAgbXVsdGlWYWx1ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFiZWw6ICdNYW5hZ2VyJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnU29tZVR5cGUnLFxuICAgICAgICAgICAgYWxsb3dlZFZhbHVlczogbnVsbCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmlsdGVycyA9IFtdO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIGZpbHRlcnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJ2NlcnQxJywgcHJvbWlzZTtcblxuICAgICAgICAgICAgZmlsdGVycyA9IFtuZXcgRmlsdGVyKGZpbHRlcildO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7YmFzZVVSTH0ke2NlcnRJZH0vaXRlbXMvZmlsdGVyc2ApLnJlc3BvbmQoMjAwLCBbZmlsdGVyXSk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0RmlsdGVycyhjZXJ0SWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChmaWx0ZXJzRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChmaWx0ZXJzRGF0YS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZpbHRlcnNEYXRhKS50b0VxdWFsKGZpbHRlcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFJvbGVEZXRhaWxzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkaWVzIHdpdGggbm8gY2VydCBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSb2xlRGV0YWlscyhudWxsLCAnaXRlbWlkJykpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RpZXMgd2l0aCBubyBjZXJ0IGl0ZW0gaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Um9sZURldGFpbHMoJ2NlcnRJZCcsIG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICBpdCgncmV0dXJucyB0aGUgcm9sZSBkZXRhaWxzJywgKCkgPT4ge1xuICAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnY2VydElkJyxcbiAgICAgICAgICAgICAgICAgY2VydEl0ZW1JZCA9ICdjZXJ0SXRlbUlkJyxcbiAgICAgICAgICAgICAgICAgcm9sZTtcblxuICAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2l0ZW1zLyR7Y2VydEl0ZW1JZH0vcm9sZURldGFpbHNgKS5cbiAgICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHt9KTtcblxuICAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFJvbGVEZXRhaWxzKGNlcnRJZCwgY2VydEl0ZW1JZCkudGhlbigocmV0dXJuZWRSb2xlID0+IHtcbiAgICAgICAgICAgICAgICAgcm9sZSA9IHJldHVybmVkUm9sZTtcbiAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgICBleHBlY3Qocm9sZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICBleHBlY3Qocm9sZSBpbnN0YW5jZW9mIFJvbGVEZXRhaWwpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSb2xlSGllcmFyY2h5KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkaWVzIHdpdGggbm8gY2VydCBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSb2xlSGllcmFyY2h5KG51bGwsICdpdGVtaWQnLCAncm9sZUlkJykpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RpZXMgd2l0aCBubyBjZXJ0IGl0ZW0gaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Um9sZUhpZXJhcmNoeSgnY2VydElkJywgbnVsbCwgJ3JvbGVJZCcpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaWVzIHdpdGggbm8gcm9sZSBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSb2xlSGllcmFyY2h5KCdjZXJ0SWQnLCAnaXRlbUlkJywgbnVsbCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHJvbGUgZGV0YWlscycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnY2VydElkJyxcbiAgICAgICAgICAgICAgICBjZXJ0SXRlbUlkID0gJ2NlcnRJdGVtSWQnLFxuICAgICAgICAgICAgICAgIHJvbGVJZCA9ICdyb2xlSWQnLFxuICAgICAgICAgICAgICAgIGhpZXJhcmNoeTtcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7YmFzZVVSTH0ke2NlcnRJZH0vaXRlbXMvJHtjZXJ0SXRlbUlkfS9yb2xlRGV0YWlscy8ke3JvbGVJZH0vaGllcmFyY2h5YCkuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIFt7IGlkOiAncm9sZTEnIH0sIHsgaWQ6ICdyb2xlMicgfV0pO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSb2xlSGllcmFyY2h5KGNlcnRJZCwgY2VydEl0ZW1JZCwgcm9sZUlkKS50aGVuKChyZXR1cm5lZEhpZXJhcmNoeSA9PiB7XG4gICAgICAgICAgICAgICAgaGllcmFyY2h5ID0gcmV0dXJuZWRIaWVyYXJjaHk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgZXhwZWN0KGhpZXJhcmNoeSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkoaGllcmFyY2h5KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChoaWVyYXJjaHkubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGhpZXJhcmNoeVswXSBpbnN0YW5jZW9mIFJvbGVEZXRhaWwpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoaGllcmFyY2h5WzFdIGluc3RhbmNlb2YgUm9sZURldGFpbCkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdnZXRDZXJ0aWZpY2F0aW9uUmVtaW5kZXJFbWFpbFRlbXBsYXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZURhdGEgPSB7XG4gICAgICAgICAgICB0b0lkZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2lsbGlnYW4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gRW1haWxUZW1wbGF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnY2VydDEnLFxuICAgICAgICAgICAgICAgIHByb21pc2U7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2VtYWlsL3JlbWluZGVyYCkucmVzcG9uZCgyMDAsIHRlbXBsYXRlRGF0YSk7XG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvblJlbWluZGVyRW1haWxUZW1wbGF0ZShjZXJ0SWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oKHRlbXBsYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0ZW1wbGF0ZSBpbnN0YW5jZW9mIEVtYWlsVGVtcGxhdGUpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VuZENlcnRpZmljYXRpb25SZW1pbmRlckVtYWlsKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZURhdGEgPSB7XG4gICAgICAgICAgICB0b0lkZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnR2lsbGlnYW4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHJlc291cmNlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnRJZCA9ICdjZXJ0MScsXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsVGVtcGxhdGU6IHRlbXBsYXRlRGF0YVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcblxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2VtYWlsL3JlbWluZGVyL3NlbmRgLCBpbnB1dCkucmVzcG9uZCgyMDAsIG51bGwpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gY2VydGlmaWNhdGlvblNlcnZpY2Uuc2VuZENlcnRpZmljYXRpb25SZW1pbmRlckVtYWlsKGNlcnRJZCwgdGVtcGxhdGVEYXRhKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2Uuc3RhdHVzKS50b0JlKDIwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzY2luZENlcnRpZmljYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCByZXNvdXJjZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlLFxuICAgICAgICAgICAgICAgIGNlcnRJZCA9ICdjZXJ0MSc7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoYCR7YmFzZVVSTH0ke2NlcnRJZH0vcmVzY2luZGAsIG51bGwpLnJlc3BvbmQoMjAwLCBudWxsKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IGNlcnRpZmljYXRpb25TZXJ2aWNlLnJlc2NpbmRDZXJ0aWZpY2F0aW9uKGNlcnRJZCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFjY291bnREZXRhaWxzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkaWVzIHdpdGggbm8gY2VydCBpZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRBY2NvdW50RGV0YWlscyhudWxsLCAnaXRlbWlkJykpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RpZXMgd2l0aCBubyBjZXJ0IGl0ZW0gaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0QWNjb3VudERldGFpbHMoJ2NlcnRJZCcsIG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBhcHBsaWNhdGlvbiBhY2NvdW50IGRldGFpbHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJ2NlcnRJZCcsXG4gICAgICAgICAgICAgICAgY2VydEl0ZW1JZCA9ICdjZXJ0SXRlbUlkJyxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbkFjY291bnQ7XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke2Jhc2VVUkx9JHtjZXJ0SWR9L2l0ZW1zLyR7Y2VydEl0ZW1JZH0vYWNjb3VudERldGFpbHNgKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwge30pO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRBY2NvdW50RGV0YWlscyhjZXJ0SWQsIGNlcnRJdGVtSWQpLnRoZW4oKHJldHVybmVkQWNjb3VudCA9PiB7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25BY2NvdW50ID0gcmV0dXJuZWRBY2NvdW50O1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcHBsaWNhdGlvbkFjY291bnQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYXBwbGljYXRpb25BY2NvdW50IGluc3RhbmNlb2YgQXBwbGljYXRpb25BY2NvdW50KS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRFbnRpdGxlbWVudERldGFpbHNVcmwoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNlcnQgaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzVXJsKG51bGwsICdpdGVtaWQnKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gY2VydCBpdGVtIGlkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlsc1VybCgnY2VydElkJywgbnVsbCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHVybCB0byB0aGUgbWFuYWdlZCBhdHRyaWJ1dGUgZGV0YWlscyByZXNvdXJjZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnMTIzNCcsXG4gICAgICAgICAgICAgICAgY2VydEl0ZW1JZCA9ICc1Njc4JyxcbiAgICAgICAgICAgICAgICB1cmwgPSBgJHtiYXNlVVJMfSR7Y2VydElkfS9pdGVtcy8ke2NlcnRJdGVtSWR9L21hbmFnZWRBdHRyaWJ1dGVEZXRhaWxzYDtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHNVcmwoY2VydElkLCBjZXJ0SXRlbUlkKSkudG9FcXVhbCh1cmwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdmb3J3YXJkQ2VydGlmaWNhdGlvbigpJywgKCkgPT4ge1xuICAgICAgICBsZXQgd29ya0l0ZW1TZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfd29ya0l0ZW1TZXJ2aWNlXykgPT4ge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gY2VydGlmaWNhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uU2VydmljZS5mb3J3YXJkQ2VydGlmaWNhdGlvbihudWxsLCAoKSA9PiB7fSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNhbGxiYWNrIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25TZXJ2aWNlLmZvcndhcmRDZXJ0aWZpY2F0aW9uKHt9LCBudWxsKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgd29ya0l0ZW1TZXJ2aWNlIHNob3dGb3J3YXJkRGlhbG9nIHRvIGZvcndhcmQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29ya0l0ZW1JZCA9ICd3b3JrSXRlbTEyMzQnLFxuICAgICAgICAgICAgICAgIGNlcnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQ6IHdvcmtJdGVtSWRcbiAgICAgICAgICAgICAgICB9LCBjYWxsYmFja0ZuID0gKCkgPT4gdHJ1ZTtcbiAgICAgICAgICAgIHNweU9uKHdvcmtJdGVtU2VydmljZSwgJ3Nob3dGb3J3YXJkRGlhbG9nJyk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5mb3J3YXJkQ2VydGlmaWNhdGlvbihjZXJ0LCBjYWxsYmFja0ZuKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2Uuc2hvd0ZvcndhcmREaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gd29ya0l0ZW1TZXJ2aWNlLnNob3dGb3J3YXJkRGlhbG9nLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoY2VydC53b3JrSXRlbUlkKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzFdKS50b0VxdWFsKGNhbGxiYWNrRm4pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eUF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIGJhY2tlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2VydElkID0gJzEyMycsXG4gICAgICAgICAgICAgICAgY2VydEl0ZW1JZCA9ICczMjEnLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYCR7YmFzZVVSTH0ke2NlcnRJZH0vaXRlbXMvJHtjZXJ0SXRlbUlkfS9pZGVudGl0eUF0dHJpYnV0ZXNgO1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLnJlc3BvbmQoMjAwLCB7YXR0cmlidXRlczogW119KTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldElkZW50aXR5QXR0cmlidXRlcyhjZXJ0SWQsIGNlcnRJdGVtSWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRMaW5rQXR0cmlidXRlcycsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gYmFja2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0SWQgPSAnMTIzJyxcbiAgICAgICAgICAgICAgICBjZXJ0SXRlbUlkID0gJzMyMScsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBgJHtiYXNlVVJMfSR7Y2VydElkfS9pdGVtcy8ke2NlcnRJdGVtSWR9L2xpbmtBdHRyaWJ1dGVzYCxcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRMaW5rQXR0cmlidXRlcyhjZXJ0SWQsIGNlcnRJdGVtSWQpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSb2xlUHJvZmlsZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gdGhlIGJhY2tlbmQgYW5kIHJldHVybiBhIFJvbGVQcm9maWxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnRJZCA9ICcxMjMnLFxuICAgICAgICAgICAgICAgIGNlcnRJdGVtID0ge2lkOiAnMzIxJ30sXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBgJHtiYXNlVVJMfSR7Y2VydElkfS9pdGVtcy8ke2NlcnRJdGVtLmlkfS9yb2xlUHJvZmlsZWAsXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdzb21lTmFtZScsXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnMgPSBbJ3RoaW5nIG9uZScsICd0aGluZyB0d28nXSxcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50cyA9IFsnZm9vJ10sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiBwZXJtaXNzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludHM6IGNvbnN0cmFpbnRzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0Um9sZVByb2ZpbGVEZXRhaWxzKGNlcnRJZCwgY2VydEl0ZW0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5uYW1lKS50b0VxdWFsKG5hbWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5jb25zdHJhaW50cykudG9FcXVhbChjb25zdHJhaW50cyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnBlcm1pc3Npb25zKS50b0VxdWFsKHBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
