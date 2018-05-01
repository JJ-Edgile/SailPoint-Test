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
             * Tests for the AccessRequestItemsService.
             */
            describe('AccessRequestItemsService', function () {

                var baseURL = '/identityiq/ui/rest/requestAccess/',
                    AccessRequestItem,
                    CurrentAccessItem,
                    AccessRequestAdditionalQuestions,
                    accessRequestItemsService,
                    $httpBackend,
                    SEARCH_TYPE_KEYWORD,
                    SEARCH_TYPE_POPULATION,
                    testService;

                function verifyResult(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 2;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (response) {
                        expect(response.data.count).toEqual(expectedCount);
                        expect(response.data.objects.length).toEqual(expectedCount);
                    });
                }

                // Use the access request module.
                beforeEach(module(accessRequestModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_AccessRequestItem_, _CurrentAccessItem_, _AccessRequestAdditionalQuestions_, _accessRequestItemsService_, _$httpBackend_, _SEARCH_TYPE_KEYWORD_, _SEARCH_TYPE_POPULATION_, _testService_) {
                    AccessRequestItem = _AccessRequestItem_;
                    CurrentAccessItem = _CurrentAccessItem_;
                    AccessRequestAdditionalQuestions = _AccessRequestAdditionalQuestions_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    $httpBackend = _$httpBackend_;
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    SEARCH_TYPE_POPULATION = _SEARCH_TYPE_POPULATION_;
                    testService = _testService_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getAccessItems()', function () {
                    var itemsURL = baseURL + 'whatever',
                        itemType = function (data) {},
                        response = {
                        count: 2,
                        objects: [{}, {}]
                    },
                        promise;

                    /**
                     * Verify that the given result promise contains the expected data.
                     * You must call $httpBackend.flush() after this to get the promise to
                     * be resolved.
                     *
                     * @param {Number} expectedCount  The expected number of items in the
                     *   response.  If not specified, default to 2.
                     */

                    it('uses keyword as the search type', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without a search term', function () {
                        $httpBackend.expectGET(itemsURL + '?limit=10&searchType=Keyword&start=0').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, 0, 10, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a search term', function () {
                        $httpBackend.expectGET(itemsURL + '?limit=10&query=sup&searchType=Keyword&start=0').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, 'sup', null, 0, 10, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination parameters', function () {
                        $httpBackend.expectGET(itemsURL + '?limit=40&searchType=Keyword&start=30').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, 30, 40, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without pagination parameters', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a requesteeId', function () {
                        $httpBackend.expectGET(itemsURL + '?identityId=1&searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, null, null, '1');
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a quickLinkName', function () {
                        $httpBackend.expectGET(itemsURL + '?quickLink=QuickLink&searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, null, null, null, null, 'QuickLink');
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with filters and sends parameters', function () {
                        var filters = {
                            filter1: {
                                value: 'hello'
                            },
                            filter2: {
                                value: 'goodbye'
                            }
                        },
                            expectedUrl = itemsURL + ('?filter1=' + testService.getQueryParamString(filters.filter1)) + ('&filter2=' + testService.getQueryParamString(filters.filter2) + '&searchType=Keyword');
                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, filters);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('handles ownerId specially', function () {
                        var filters = {
                            ownerId: {
                                value: {
                                    id: '1234',
                                    name: 'abcd'
                                }
                            },
                            otherFilter: {
                                value: {
                                    id: '5678',
                                    name: 'zyxw'
                                }
                            }
                        },
                            expectedUrl = itemsURL + ('?otherFilter=' + testService.getQueryParamString(filters.otherFilter, ['name'])) + ('&ownerId=' + testService.getQueryParamString(filters.ownerId, ['id']) + '&searchType=Keyword');

                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, filters);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    // TODO: when we get a multisuggest for identityids, change this to verify multiple identityIds
                    it('handles identityIds specially', function () {
                        var filters = {
                            identityIds: {
                                value: [{
                                    id: '1234',
                                    name: 'abcd'
                                }] },
                            otherFilter: {
                                value: {
                                    id: '5678',
                                    name: 'zyxw'
                                }
                            }
                        },
                            expectedUrl = itemsURL + ('?identityIds=' + testService.getQueryParamString(filters.identityIds, 'id')) + ('&otherFilter=' + testService.getQueryParamString(filters.otherFilter, 'name') + '&searchType=Keyword');
                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, filters);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('should translate attributes objects to attribute values', function () {
                        var filters = {
                            attributes: {
                                value: [{
                                    attribute: 'attr1',
                                    someOtherValue: 'abcd'
                                }, {
                                    attribute: 'attr2',
                                    foo: 'bar'
                                }]
                            }
                        },
                            expectedUrl = itemsURL + ('?attributes=' + testService.getQueryParamString(filters.attributes, 'attribute')) + '&searchType=Keyword';
                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, filters);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without a requesteeId', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('can return an empty result', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, {
                            count: 0,
                            objects: []
                        });
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, null, null);
                        verifyResult(promise, 0);
                        $httpBackend.flush();
                    });

                    it('converts objects to correct type', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessItems(itemsURL, itemType, null, null, null, null);
                        promise.then(function (response) {
                            var objects = response.data.objects;
                            expect(objects[0] instanceof itemType).toEqual(true);
                            expect(objects[1] instanceof itemType).toEqual(true);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('getAccessRequestItems()', function () {
                    var itemsURL = baseURL + 'accessItems',
                        response,
                        item1,
                        item2,
                        promise;

                    beforeEach(inject(function (accessRequestTestData) {
                        item1 = accessRequestTestData.ROLE;
                        item2 = accessRequestTestData.ENTITLEMENT;

                        response = {
                            count: 2,
                            objects: [item1, item2]
                        };
                    }));

                    it('calls through to getAccessItems()', function () {
                        var searchTerm = '1',
                            filterValues = {
                            whatever: {
                                value: 'else'
                            }
                        },
                            startIdx = 0,
                            limit = 10,
                            requesteeId = 'dude',
                            quickLinkName = 'QLName',
                            expectedUrl = itemsURL + '?identityId=dude&limit=10&query=1&quickLink=QLName&searchType=Keyword&start=0&' + ('whatever=' + testService.getQueryParamString(filterValues.whatever));

                        spyOn(accessRequestItemsService, 'getAccessItems').and.callThrough();
                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessRequestItems(searchTerm, filterValues, startIdx, limit, requesteeId, SEARCH_TYPE_KEYWORD, quickLinkName);
                        $httpBackend.flush();
                        expect(accessRequestItemsService.getAccessItems).toHaveBeenCalledWith(itemsURL, AccessRequestItem, searchTerm, filterValues, startIdx, limit, requesteeId, SEARCH_TYPE_KEYWORD, quickLinkName);
                    });

                    it('calls through to getAccessItems() with SEARCH_TYPE_POPULATION', function () {
                        var searchTerm = '1',
                            filterValues = {
                            whatever: {
                                value: {
                                    id: 'else',
                                    displayValue: 'stupid'
                                }
                            }
                        },
                            startIdx = 0,
                            limit = 10,
                            requesteeId = 'dude',
                            expectedUrl = itemsURL + '?identityId=dude&limit=10&query=1&searchType=Population&start=0&' + ('whatever=' + testService.getQueryParamString(filterValues.whatever, 'id'));

                        spyOn(accessRequestItemsService, 'getAccessItems').and.callThrough();

                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getAccessRequestItems(searchTerm, filterValues, startIdx, limit, requesteeId, SEARCH_TYPE_POPULATION);
                        $httpBackend.flush();

                        expect(accessRequestItemsService.getAccessItems).toHaveBeenCalledWith(itemsURL, AccessRequestItem, searchTerm, filterValues, startIdx, limit, requesteeId, SEARCH_TYPE_POPULATION, undefined);
                    });

                    it('converts objects to AccessRequestItem', function () {
                        $httpBackend.expectGET(itemsURL + '?searchType=Keyword').respond(200, response);
                        promise = accessRequestItemsService.getAccessRequestItems();
                        promise.then(function (response) {
                            var objects = response.data.objects;
                            expect(objects[0] instanceof AccessRequestItem).toEqual(true);
                            expect(objects[1] instanceof AccessRequestItem).toEqual(true);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('getCurrentAccessItems()', function () {
                    var itemsURL = baseURL + 'currentAccessItems',
                        response,
                        item1,
                        item2,
                        promise;

                    beforeEach(inject(function (accessRequestTestData) {
                        item1 = accessRequestTestData.CURRENT_ACCESS_ROLE;
                        item2 = accessRequestTestData.CURRENT_ACCESS_ENTITLEMENT;

                        response = {
                            count: 2,
                            objects: [item1, item2]
                        };
                    }));

                    it('blows up without a requesteeId', function () {
                        expect(function () {
                            accessRequestItemsService.getCurrentAccessItems('something', null, 0, 10, null);
                        }).toThrow();
                        expect(function () {
                            accessRequestItemsService.getCurrentAccessItems('something', null, 0, 10, '');
                        }).toThrow();
                    });

                    it('calls through to getAccessItems()', function () {
                        var searchTerm = '1',
                            filterValues = {
                            whatever: {
                                value: 'else'
                            }
                        },
                            startIdx = 0,
                            limit = 10,
                            requesteeId = 'dude',
                            expectedUrl = itemsURL + '?identityId=dude&limit=10&query=1&searchType=Keyword&start=0&' + ('whatever=' + testService.getQueryParamString(filterValues.whatever));

                        spyOn(accessRequestItemsService, 'getAccessItems').and.callThrough();
                        $httpBackend.expectGET(expectedUrl).respond(200, response);
                        promise = accessRequestItemsService.getCurrentAccessItems(searchTerm, filterValues, startIdx, limit, requesteeId);
                        $httpBackend.flush();
                        expect(accessRequestItemsService.getAccessItems).toHaveBeenCalledWith(itemsURL, CurrentAccessItem, searchTerm, filterValues, startIdx, limit, requesteeId);
                    });

                    it('converts objects to CurrentAccessItems', function () {
                        $httpBackend.expectGET(itemsURL + '?identityId=requestee&limit=10&searchType=Keyword&start=0').respond(200, response);
                        promise = accessRequestItemsService.getCurrentAccessItems(null, null, 0, 10, 'requestee');
                        promise.then(function (response) {
                            var objects = response.data.objects;
                            expect(objects[0] instanceof CurrentAccessItem).toEqual(true);
                            expect(objects[1] instanceof CurrentAccessItem).toEqual(true);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('getAdditionalQuestions()', function () {

                    var accessItem = {
                        id: 123
                    },
                        identityIds = ['some.guy'],
                        response = {
                        permittedRoles: [{
                            id: 321,
                            displayableName: 'Name'
                        }, {
                            id: 132,
                            displayableName: 'Other Name'
                        }]
                    },
                        promise;

                    function buildUrl(id) {
                        return '/identityiq/ui/rest/requestAccess/accessItems/' + id + '/additionalQuestions';
                    }

                    it('blows up without a accessRequestItem', function () {
                        expect(function () {
                            accessRequestItemsService.getAdditionalQuestions();
                        }).toThrow();
                    });

                    it('blows up without identityIds', function () {
                        expect(function () {
                            accessRequestItemsService.getAdditionalQuestions(accessItem);
                        }).toThrow();
                    });

                    it('converts response to AccessRequestAdditionalQuestions', function () {
                        var data = {
                            identityIds: identityIds
                        };

                        $httpBackend.expectPOST(buildUrl(accessItem.id), data).respond(200, response);
                        promise = accessRequestItemsService.getAdditionalQuestions(accessItem, identityIds);
                        $httpBackend.flush();
                        promise.then(function (response) {
                            expect(response.permittedRoles.length).toEqual(2);
                            expect(response instanceof AccessRequestAdditionalQuestions).toBeTruthy();
                            expect(response.permittedRoles[0] instanceof AccessRequestItem).toBeTruthy();
                            expect(response.permittedRoles[1] instanceof AccessRequestItem).toBeTruthy();
                        });
                    });

                    it('should reject with invalid value', function () {
                        var failure = jasmine.createSpy('failure'),
                            success = jasmine.createSpy('success'),
                            data = {
                            identityIds: identityIds
                        };
                        $httpBackend.expectPOST(buildUrl(accessItem.id), data).respond(200, undefined);
                        promise = accessRequestItemsService.getAdditionalQuestions(accessItem, identityIds);
                        promise.then(success, failure);
                        $httpBackend.flush();
                        expect(success).not.toHaveBeenCalled();
                        expect(failure).toHaveBeenCalled();
                    });

                    it('should pass permitting role id and other roles if specified', function () {
                        var permittedBy = { id: 'permittingId' },
                            requestedAccessItem1 = {
                            item: {
                                id: 1234,
                                getId: function () {
                                    return 1234;
                                }
                            }
                        },
                            requestedAccessItem2 = {
                            permittedById: 9999,
                            item: {
                                id: 4321,
                                getId: function () {
                                    return 4321;
                                }
                            }
                        },
                            otherRoles,
                            data;

                        requestedAccessItem1.accountSelections = [{}];
                        requestedAccessItem1.accountSelections[0] = createAccountSelection('123id', createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId', 'instance')));
                        requestedAccessItem2.accountSelections = [{}];
                        requestedAccessItem2.accountSelections[0] = createAccountSelection('456id', createProvisioningTarget('Role Name 27', 'App Name 1', createAccountInfo('456nId', 'instance 42')));

                        data = {
                            identityIds: identityIds,
                            permittedById: permittedBy.id,
                            otherAddedRoles: [{
                                id: 1234,
                                accountSelections: [{
                                    identityId: '123id',
                                    roleName: 'Role Name 1',
                                    applicationName: 'App Name 1',
                                    nativeIdentity: '123nId',
                                    instance: 'instance'
                                }]
                            }, {
                                id: 4321,
                                permittedById: 9999,
                                accountSelections: [{
                                    identityId: '456id',
                                    roleName: 'Role Name 27',
                                    applicationName: 'App Name 1',
                                    nativeIdentity: '456nId',
                                    instance: 'instance 42'
                                }]
                            }]
                        };

                        otherRoles = [requestedAccessItem1, requestedAccessItem2];
                        $httpBackend.expectPOST(buildUrl(accessItem.id), data).respond(200, {});
                        accessRequestItemsService.getAdditionalQuestions(accessItem, identityIds, permittedBy, undefined, otherRoles);
                        $httpBackend.flush();
                    });

                    it('should pass the assignment id if present', function () {
                        var assignmentId = 'assmntId',
                            data = {
                            identityIds: identityIds,
                            assignmentId: assignmentId
                        };
                        $httpBackend.expectPOST(buildUrl(accessItem.id), data).respond(200, {});
                        accessRequestItemsService.getAdditionalQuestions(accessItem, identityIds, undefined, assignmentId);
                        $httpBackend.flush();
                    });
                });

                describe('checkUniqueAssigment()', function () {
                    var requestedAccessItem, spy, testService, $scope, data;

                    beforeEach(inject(function (_testService_, $rootScope) {
                        $scope = $rootScope;
                        testService = _testService_;
                        requestedAccessItem = {
                            item: {
                                id: 1234
                            }
                        };
                        data = {
                            accountSelections: []
                        };
                    }));

                    it('should not generate a post with an empty account selections if no account selections', function () {
                        spy = testService.spyOnSuccess(accessRequestItemsService.checkUniqueAssignment(requestedAccessItem));
                        $scope.$apply();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('should not generate a post with an empty account selections if no provisioning targets', function () {
                        requestedAccessItem.accountSelections = [{}];

                        spy = testService.spyOnSuccess(accessRequestItemsService.checkUniqueAssignment(requestedAccessItem));
                        $scope.$apply();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('should not generate a post with an empty account selections if no account infos', function () {
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0].provisioningTargets = [createProvisioningTarget()];

                        spy = testService.spyOnSuccess(accessRequestItemsService.checkUniqueAssignment(requestedAccessItem));
                        $scope.$apply();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('should not send request with an empty account selections if target is for a create account', function () {
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0].provisioningTargets = [{
                            isCreateAccount: function () {
                                return true;
                            }
                        }];
                        requestedAccessItem.accountSelections[0].provisioningTargets[1] = createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId', 'instance'));

                        spy = testService.spyOnSuccess(accessRequestItemsService.checkUniqueAssignment(requestedAccessItem));
                        $scope.$apply();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('should generate a post with an account info for an account selection ' + 'with a provisioning target with an account info', function () {
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0] = createAccountSelection('123id', createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId', 'instance')));

                        data.accountSelections = [{
                            identityId: '123id',
                            roleName: 'Role Name 1',
                            applicationName: 'App Name 1',
                            nativeIdentity: '123nId',
                            instance: 'instance'
                        }];

                        $httpBackend.expectPOST(buildUrl(requestedAccessItem.item.id), data).respond(200, undefined);
                        accessRequestItemsService.checkUniqueAssignment(requestedAccessItem);
                        $httpBackend.flush();
                    });

                    it('should generate a post with two account info for an account selection ' + 'with a two provisioning targets with one account info each', function () {
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0] = createAccountSelection('123id', createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId', 'instance')), createProvisioningTarget(undefined, 'App Name 2', createAccountInfo('321nId')));

                        data.accountSelections = [{
                            identityId: '123id',
                            roleName: 'Role Name 1',
                            applicationName: 'App Name 1',
                            nativeIdentity: '123nId',
                            instance: 'instance'
                        }, {
                            identityId: '123id',
                            applicationName: 'App Name 2',
                            nativeIdentity: '321nId'
                        }];

                        $httpBackend.expectPOST(buildUrl(requestedAccessItem.item.id), data).respond(200, undefined);
                        accessRequestItemsService.checkUniqueAssignment(requestedAccessItem);
                        $httpBackend.flush();
                    });

                    it('should generate a post with two account info for two account selection ' + 'with one provisioning target each with an account info each', function () {
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0] = createAccountSelection('123id', createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId', 'instance')));
                        requestedAccessItem.accountSelections[1] = createAccountSelection('456id', createProvisioningTarget('Role Name 27', 'App Name 1', createAccountInfo('456nId', 'instance 42')));

                        data.accountSelections = [{
                            identityId: '123id',
                            roleName: 'Role Name 1',
                            applicationName: 'App Name 1',
                            nativeIdentity: '123nId',
                            instance: 'instance'
                        }, {
                            identityId: '456id',
                            roleName: 'Role Name 27',
                            applicationName: 'App Name 1',
                            nativeIdentity: '456nId',
                            instance: 'instance 42'
                        }];

                        $httpBackend.expectPOST(buildUrl(requestedAccessItem.item.id), data).respond(200, undefined);
                        accessRequestItemsService.checkUniqueAssignment(requestedAccessItem);
                        $httpBackend.flush();
                    });

                    it('should send assignmentId when specified', function () {
                        var assignmentId = 'assmntId';
                        requestedAccessItem.assignmentId = assignmentId;
                        requestedAccessItem.accountSelections = [{}];
                        requestedAccessItem.accountSelections[0] = createAccountSelection('123id', createProvisioningTarget('Role Name 1', 'App Name 1', createAccountInfo('123nId')));

                        data.accountSelections = [{
                            identityId: '123id',
                            roleName: 'Role Name 1',
                            applicationName: 'App Name 1',
                            nativeIdentity: '123nId'
                        }];
                        data.assignmentId = assignmentId;

                        $httpBackend.expectPOST(buildUrl(requestedAccessItem.item.id), data).respond(200, undefined);
                        accessRequestItemsService.checkUniqueAssignment(requestedAccessItem);
                        $httpBackend.flush();
                    });
                });

                describe('transformRequestedAccessItem()', function () {
                    var requestedItem1,
                        requestedItem2,
                        data = [{
                        identityId: 'ted.tacular.id',
                        roleName: 'Boss',
                        applicationName: 'appName',
                        nativeIdentity: 'ted',
                        instance: 'tedsAccount'
                    }, {
                        identityId: 'ted.tacular.id',
                        roleName: 'Endentured Servant',
                        applicationName: 'appName2',
                        nativeIdentity: 'lacky',
                        instance: 'lackyInstance'
                    }],
                        dataCreate = [{
                        identityId: 'ted.tacular.id',
                        roleName: 'Boss',
                        applicationName: 'appName',
                        nativeIdentity: 'new'
                    }, {
                        identityId: 'ted.tacular.id',
                        roleName: 'Endentured Servant',
                        applicationName: 'appName2',
                        nativeIdentity: 'new'
                    }];

                    beforeEach(inject(function (RequestedAccessItem, IdentityAccountSelection, accessRequestTestData) {
                        requestedItem1 = new RequestedAccessItem(new AccessRequestItem(accessRequestTestData.ROLE));
                        requestedItem2 = new RequestedAccessItem(new AccessRequestItem(accessRequestTestData.ROLE));
                        requestedItem1.accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1)];
                        requestedItem2.accountSelections = [new IdentityAccountSelection(accessRequestTestData.IDENTITY_ACCT_SELECTION1)];
                        //select accounts
                        requestedItem1.accountSelections[0].getProvisioningTargets().forEach(function (target) {
                            target.selectAccount(target.getAccountInfos()[0]);
                        });
                        requestedItem2.accountSelections[0].getProvisioningTargets().forEach(function (target) {
                            target.setCreateAccount(true);
                        });
                    }));

                    it('should return an array of AccessRequestInfo compatible items for existing accounts', function () {
                        var result = accessRequestItemsService.transformRequestedAccessItem(requestedItem1, false);
                        expect(result.length).toEqual(2);
                        expect(result).toEqual(data);
                    });

                    it('should return an array of items for new accounts', function () {
                        var result = accessRequestItemsService.transformRequestedAccessItem(requestedItem2, false);
                        expect(result.length).toEqual(2);
                        expect(result).toEqual(dataCreate);
                    });

                    it('should not return an array of items for new accounts with flag toggled', function () {
                        var result = accessRequestItemsService.transformRequestedAccessItem(requestedItem2, true);
                        expect(result.length).toEqual(0);
                        expect(result).toEqual([]);
                    });
                });

                describe('getPopulationIdentities()', function () {
                    var itemsURL = baseURL + 'accessItems/whatever/population',
                        data = {
                        count: 2,
                        objects: [{}, {}]
                    },
                        accessRequestItem = {
                        id: 'whatever'
                    },
                        filterValues = {
                        'q_Identity.this': {
                            value: {
                                id: 'that'
                            }
                        }
                    },
                        sortOrder = {
                        toJson: function () {
                            return 'stupidSorts';
                        }
                    },
                        promise;

                    it('should fetch the population identities', function () {
                        var expectedUrl = itemsURL + '?limit=10&' + ('q_Identity.this=' + testService.getQueryParamString(filterValues['q_Identity.this'], 'id')) + '&showNonMatched=false&sort=stupidSorts&start=0';
                        $httpBackend.expectGET(expectedUrl).respond(200, data);
                        promise = accessRequestItemsService.getPopulationIdentities(accessRequestItem, true, filterValues, 0, 10, sortOrder);
                        verifyResult(promise, 2);
                        $httpBackend.flush();
                    });

                    it('handles identityIds specially', function () {
                        var identityFilters = {
                            identityIds: {
                                value: [{
                                    id: '1234',
                                    name: 'abcd'
                                }, {
                                    id: '5678',
                                    name: 'dude'
                                }]
                            }
                        },
                            expectedUrl = itemsURL + ('?identityIds=' + testService.getQueryParamString(identityFilters.identityIds, 'id')) + '&limit=10&showNonMatched=false&sort=stupidSorts&start=0';
                        $httpBackend.expectGET(expectedUrl).respond(200, data);
                        promise = accessRequestItemsService.getPopulationIdentities(accessRequestItem, true, identityFilters, 0, 10, sortOrder);
                        verifyResult(promise, 2);
                        $httpBackend.flush();
                    });

                    it('should throw when no accessRequestItem is provided', function () {
                        expect(function () {
                            promise = accessRequestItemsService.getPopulationIdentities();
                        }).toThrow();
                    });
                });

                function createAccountSelection(identityId /*, ...provisioningTargets */) {
                    return {
                        identityId: identityId,
                        provisioningTargets: Array.prototype.slice.call(arguments, 1)
                    };
                }

                function createProvisioningTarget(roleName, applicationName, selectedAccount) {
                    return {
                        getSelectedAccount: function () {
                            return selectedAccount;
                        },
                        isCreateAccount: function () {
                            return false;
                        },
                        roleName: roleName,
                        applicationName: applicationName,
                        accountInfos: Array.prototype.slice.call(arguments, 2)
                    };
                }

                function createAccountInfo(nativeIdentity, instance) {
                    return {
                        nativeIdentity: nativeIdentity,
                        instance: instance
                    };
                }

                function buildUrl(id) {
                    return '/identityiq/ui/rest/requestAccess/accessItems/' + id + '/checkUniqueAssignment';
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsc0JBQXNCLDRCQUE0QixVQUFVLFNBQVM7SUFBdEo7O0lBR0ksSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOzs7OztZQUE3QixTQUFTLDZCQUE2QixZQUFXOztnQkFFN0MsSUFBSSxVQUFVO29CQUNWO29CQUFtQjtvQkFBbUI7b0JBQ3RDO29CQUEyQjtvQkFBYztvQkFBcUI7b0JBQzlEOztnQkFFSixTQUFTLGFBQWEsU0FBUyxlQUFlO29CQUMxQyxJQUFJLFFBQVEsWUFBWSxnQkFBZ0I7d0JBQ3BDLGdCQUFnQjs7b0JBRXBCLE9BQU8sU0FBUztvQkFDaEIsUUFBUSxLQUFLLFVBQVMsVUFBVTt3QkFDNUIsT0FBTyxTQUFTLEtBQUssT0FBTyxRQUFRO3dCQUNwQyxPQUFPLFNBQVMsS0FBSyxRQUFRLFFBQVEsUUFBUTs7Ozs7Z0JBS3JELFdBQVcsT0FBTyxxQkFBcUI7O2dCQUV2QyxXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7O2dCQUl6QyxXQUFXLE9BQU8sVUFBUyxxQkFBcUIscUJBQXFCLG9DQUMxQyw2QkFDQSxnQkFBZ0IsdUJBQXVCLDBCQUN2QyxlQUFlO29CQUN0QyxvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsbUNBQW1DO29CQUNuQyw0QkFBNEI7b0JBQzVCLGVBQWU7b0JBQ2Ysc0JBQXNCO29CQUN0Qix5QkFBeUI7b0JBQ3pCLGNBQWM7OztnQkFHbEIsVUFBVSxZQUFXO29CQUNqQixh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Vzt3QkFDaEUsT0FBTyxZQUFXOzRCQUNkLFVBQVUsMEJBQTBCOzJCQUNyQzs7OztnQkFJWCxTQUFTLHVCQUF1QiwwQ0FBMEM7b0JBQ3RFLE9BQU87d0JBQ0gsWUFBWTt3QkFDWixxQkFBcUIsTUFBTSxVQUFVLE1BQU0sS0FBSyxXQUFXOzs7O2dCQUluRSxTQUFTLHlCQUF5QixVQUFVLGlCQUFpQixpQkFBaUI7b0JBQzFFLE9BQU87d0JBQ0gsb0JBQW9CLFlBQVc7NEJBQzNCLE9BQU87O3dCQUVYLGlCQUFpQixZQUFXOzRCQUN4QixPQUFPOzt3QkFFWCxVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsY0FBYyxNQUFNLFVBQVUsTUFBTSxLQUFLLFdBQVc7Ozs7Z0JBSTVELFNBQVMsa0JBQWtCLGdCQUFnQixVQUFVO29CQUNqRCxPQUFPO3dCQUNILGdCQUFnQjt3QkFDaEIsVUFBVTs7OztnQkFJbEIsU0FBUyxTQUFTLElBQUk7b0JBQ2xCLE9BQU8sbURBQW1ELEtBQUs7Ozs7O0dBcEVwRSIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4vQWNjZXNzUmVxdWVzdFRlc3REYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuXHJcbiAqL1xyXG5kZXNjcmliZSgnQWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvcmVxdWVzdEFjY2Vzcy8nLFxyXG4gICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtLCBDdXJyZW50QWNjZXNzSXRlbSwgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMsXHJcbiAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgJGh0dHBCYWNrZW5kLCBTRUFSQ0hfVFlQRV9LRVlXT1JELCBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OLFxyXG4gICAgICAgIHRlc3RTZXJ2aWNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZlcmlmeVJlc3VsdChwcm9taXNlLCBleHBlY3RlZENvdW50KSB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcclxuICAgICAgICAgICAgZXhwZWN0ZWRDb3VudCA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvdW50KS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVc2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xyXG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCAnL2lkZW50aXR5aXEnKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQWNjZXNzUmVxdWVzdEl0ZW1fLCBfQ3VycmVudEFjY2Vzc0l0ZW1fLCBfQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnNfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRodHRwQmFja2VuZF8sIF9TRUFSQ0hfVFlQRV9LRVlXT1JEXywgX1NFQVJDSF9UWVBFX1BPUFVMQVRJT05fLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rlc3RTZXJ2aWNlXykge1xyXG4gICAgICAgIEFjY2Vzc1JlcXVlc3RJdGVtID0gX0FjY2Vzc1JlcXVlc3RJdGVtXztcclxuICAgICAgICBDdXJyZW50QWNjZXNzSXRlbSA9IF9DdXJyZW50QWNjZXNzSXRlbV87XHJcbiAgICAgICAgQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMgPSBfQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnNfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV87XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XHJcbiAgICAgICAgU0VBUkNIX1RZUEVfS0VZV09SRCA9IF9TRUFSQ0hfVFlQRV9LRVlXT1JEXztcclxuICAgICAgICBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OID0gX1NFQVJDSF9UWVBFX1BPUFVMQVRJT05fO1xyXG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEFjY2Vzc0l0ZW1zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbXNVUkwgPSBiYXNlVVJMICsgJ3doYXRldmVyJyxcclxuICAgICAgICAgICAgaXRlbVR5cGUgPSBmdW5jdGlvbihkYXRhKSB7fSxcclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7fSwge31dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb21pc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmeSB0aGF0IHRoZSBnaXZlbiByZXN1bHQgcHJvbWlzZSBjb250YWlucyB0aGUgZXhwZWN0ZWQgZGF0YS5cclxuICAgICAgICAgKiBZb3UgbXVzdCBjYWxsICRodHRwQmFja2VuZC5mbHVzaCgpIGFmdGVyIHRoaXMgdG8gZ2V0IHRoZSBwcm9taXNlIHRvXHJcbiAgICAgICAgICogYmUgcmVzb2x2ZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRDb3VudCAgVGhlIGV4cGVjdGVkIG51bWJlciBvZiBpdGVtcyBpbiB0aGVcclxuICAgICAgICAgKiAgIHJlc3BvbnNlLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdCB0byAyLlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBpdCgndXNlcyBrZXl3b3JkIGFzIHRoZSBzZWFyY2ggdHlwZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGl0ZW1zVVJMICsgJz9zZWFyY2hUeXBlPUtleXdvcmQnKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKGl0ZW1zVVJMLCBpdGVtVHlwZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRob3V0IGEgc2VhcmNoIHRlcm0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/bGltaXQ9MTAmc2VhcmNoVHlwZT1LZXl3b3JkJnN0YXJ0PTAnKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKGl0ZW1zVVJMLCBpdGVtVHlwZSwgbnVsbCwgbnVsbCwgMCwgMTAsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBhIHNlYXJjaCB0ZXJtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaXRlbXNVUkwgKyAnP2xpbWl0PTEwJnF1ZXJ5PXN1cCZzZWFyY2hUeXBlPUtleXdvcmQmc3RhcnQ9MCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCAnc3VwJywgbnVsbCwgMCwgMTAsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBwYWdpbmF0aW9uIHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/bGltaXQ9NDAmc2VhcmNoVHlwZT1LZXl3b3JkJnN0YXJ0PTMwJykuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBY2Nlc3NJdGVtcyhpdGVtc1VSTCwgaXRlbVR5cGUsIG51bGwsIG51bGwsIDMwLCA0MCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRob3V0IHBhZ2luYXRpb24gcGFyYW1ldGVycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGl0ZW1zVVJMICsgJz9zZWFyY2hUeXBlPUtleXdvcmQnKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKGl0ZW1zVVJMLCBpdGVtVHlwZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGEgcmVxdWVzdGVlSWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/aWRlbnRpdHlJZD0xJnNlYXJjaFR5cGU9S2V5d29yZCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCAnMScpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBhIHF1aWNrTGlua05hbWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/cXVpY2tMaW5rPVF1aWNrTGluayZzZWFyY2hUeXBlPUtleXdvcmQnKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKGl0ZW1zVVJMLCBpdGVtVHlwZSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCxcclxuICAgICAgICAgICAgICAgICdRdWlja0xpbmsnKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggZmlsdGVycyBhbmQgc2VuZHMgcGFyYW1ldGVycycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnaGVsbG8nXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZ29vZGJ5ZSdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBpdGVtc1VSTCArIGA/ZmlsdGVyMT0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5maWx0ZXIxKX1gICtcclxuICAgICAgICAgICAgICAgICAgICBgJmZpbHRlcjI9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMuZmlsdGVyMil9JnNlYXJjaFR5cGU9S2V5d29yZGA7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBmaWx0ZXJzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2hhbmRsZXMgb3duZXJJZCBzcGVjaWFsbHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXJJZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdhYmNkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvdGhlckZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICc1Njc4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICd6eXh3J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gaXRlbXNVUkwgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA/b3RoZXJGaWx0ZXI9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMub3RoZXJGaWx0ZXIsIFsnbmFtZSddKX1gICtcclxuICAgICAgICAgICAgICAgICAgICBgJm93bmVySWQ9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMub3duZXJJZCwgWydpZCddKX0mc2VhcmNoVHlwZT1LZXl3b3JkYDtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBmaWx0ZXJzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogd2hlbiB3ZSBnZXQgYSBtdWx0aXN1Z2dlc3QgZm9yIGlkZW50aXR5aWRzLCBjaGFuZ2UgdGhpcyB0byB2ZXJpZnkgbXVsdGlwbGUgaWRlbnRpdHlJZHNcclxuICAgICAgICBpdCgnaGFuZGxlcyBpZGVudGl0eUlkcyBzcGVjaWFsbHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FiY2QnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dfSxcclxuICAgICAgICAgICAgICAgICAgICBvdGhlckZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICc1Njc4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICd6eXh3J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gaXRlbXNVUkwgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA/aWRlbnRpdHlJZHM9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMuaWRlbnRpdHlJZHMsICdpZCcpfWAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGAmb3RoZXJGaWx0ZXI9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMub3RoZXJGaWx0ZXIsICduYW1lJyl9JnNlYXJjaFR5cGU9S2V5d29yZGA7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBmaWx0ZXJzKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdHJhbnNsYXRlIGF0dHJpYnV0ZXMgb2JqZWN0cyB0byBhdHRyaWJ1dGUgdmFsdWVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdhdHRyMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tZU90aGVyVmFsdWU6ICdhYmNkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdhdHRyMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gaXRlbXNVUkwgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA/YXR0cmlidXRlcz0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5hdHRyaWJ1dGVzLCAnYXR0cmlidXRlJyl9YCArXHJcbiAgICAgICAgICAgICAgICAgICAgYCZzZWFyY2hUeXBlPUtleXdvcmRgO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKGl0ZW1zVVJMLCBpdGVtVHlwZSwgbnVsbCwgZmlsdGVycyk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRob3V0IGEgcmVxdWVzdGVlSWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/c2VhcmNoVHlwZT1LZXl3b3JkJykuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBY2Nlc3NJdGVtcyhpdGVtc1VSTCwgaXRlbVR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FuIHJldHVybiBhbiBlbXB0eSByZXN1bHQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpdGVtc1VSTCArICc/c2VhcmNoVHlwZT1LZXl3b3JkJykuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFtdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UsIDApO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NvbnZlcnRzIG9iamVjdHMgdG8gY29ycmVjdCB0eXBlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaXRlbXNVUkwgKyAnP3NlYXJjaFR5cGU9S2V5d29yZCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMoaXRlbXNVUkwsIGl0ZW1UeXBlLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0cyA9IHJlc3BvbnNlLmRhdGEub2JqZWN0cztcclxuICAgICAgICAgICAgICAgIGV4cGVjdChvYmplY3RzWzBdIGluc3RhbmNlb2YgaXRlbVR5cGUpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0c1sxXSBpbnN0YW5jZW9mIGl0ZW1UeXBlKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0QWNjZXNzUmVxdWVzdEl0ZW1zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbXNVUkwgPSBiYXNlVVJMICsgJ2FjY2Vzc0l0ZW1zJyxcclxuICAgICAgICAgICAgcmVzcG9uc2UsIGl0ZW0xLCBpdGVtMiwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XHJcbiAgICAgICAgICAgIGl0ZW0xID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLlJPTEU7XHJcbiAgICAgICAgICAgIGl0ZW0yID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkVOVElUTEVNRU5UO1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaXRlbTEsIGl0ZW0yIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGdldEFjY2Vzc0l0ZW1zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXJjaFRlcm0gPSAnMScsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hhdGV2ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdlbHNlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydElkeCA9IDAsXHJcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVlSWQgPSAnZHVkZScsXHJcbiAgICAgICAgICAgICAgICBxdWlja0xpbmtOYW1lID0gJ1FMTmFtZScsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGl0ZW1zVVJMICtcclxuICAgICAgICAgICAgICAgICAgICBgP2lkZW50aXR5SWQ9ZHVkZSZsaW1pdD0xMCZxdWVyeT0xJnF1aWNrTGluaz1RTE5hbWUmc2VhcmNoVHlwZT1LZXl3b3JkJnN0YXJ0PTAmYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYHdoYXRldmVyPSR7dGVzdFNlcnZpY2UuZ2V0UXVlcnlQYXJhbVN0cmluZyhmaWx0ZXJWYWx1ZXMud2hhdGV2ZXIpfWA7XHJcblxyXG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWNjZXNzSXRlbXMnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChleHBlY3RlZFVybCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID1cclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdEl0ZW1zKHNlYXJjaFRlcm0sIGZpbHRlclZhbHVlcywgc3RhcnRJZHgsIGxpbWl0LCByZXF1ZXN0ZWVJZCxcclxuICAgICAgICAgICAgICAgICAgICBTRUFSQ0hfVFlQRV9LRVlXT1JELCBxdWlja0xpbmtOYW1lKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtc1VSTCwgQWNjZXNzUmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtLCBmaWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBsaW1pdCwgcmVxdWVzdGVlSWQsIFNFQVJDSF9UWVBFX0tFWVdPUkQsIHF1aWNrTGlua05hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBnZXRBY2Nlc3NJdGVtcygpIHdpdGggU0VBUkNIX1RZUEVfUE9QVUxBVElPTicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VhcmNoVGVybSA9ICcxJyxcclxuICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3aGF0ZXZlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdlbHNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ3N0dXBpZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydElkeCA9IDAsXHJcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVlSWQgPSAnZHVkZScsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGl0ZW1zVVJMICtcclxuICAgICAgICAgICAgICAgICAgICAnP2lkZW50aXR5SWQ9ZHVkZSZsaW1pdD0xMCZxdWVyeT0xJnNlYXJjaFR5cGU9UG9wdWxhdGlvbiZzdGFydD0wJicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGB3aGF0ZXZlcj0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVyVmFsdWVzLndoYXRldmVyLCAnaWQnKX1gO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgJ2dldEFjY2Vzc0l0ZW1zJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKVxyXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPVxyXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBY2Nlc3NSZXF1ZXN0SXRlbXMoc2VhcmNoVGVybSwgZmlsdGVyVmFsdWVzLCBzdGFydElkeCwgbGltaXQsIHJlcXVlc3RlZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFjY2Vzc0l0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtc1VSTCwgQWNjZXNzUmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtLCBmaWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBsaW1pdCwgcmVxdWVzdGVlSWQsIFNFQVJDSF9UWVBFX1BPUFVMQVRJT04sIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjb252ZXJ0cyBvYmplY3RzIHRvIEFjY2Vzc1JlcXVlc3RJdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaXRlbXNVUkwgKyAnP3NlYXJjaFR5cGU9S2V5d29yZCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0c1swXSBpbnN0YW5jZW9mIEFjY2Vzc1JlcXVlc3RJdGVtKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iamVjdHNbMV0gaW5zdGFuY2VvZiBBY2Nlc3NSZXF1ZXN0SXRlbSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEN1cnJlbnRBY2Nlc3NJdGVtcygpJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1zVVJMID0gYmFzZVVSTCArICdjdXJyZW50QWNjZXNzSXRlbXMnLFxyXG4gICAgICAgICAgICByZXNwb25zZSwgaXRlbTEsIGl0ZW0yLCBwcm9taXNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihhY2Nlc3NSZXF1ZXN0VGVzdERhdGEpIHtcclxuICAgICAgICAgICAgaXRlbTEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQ1VSUkVOVF9BQ0NFU1NfUk9MRTtcclxuICAgICAgICAgICAgaXRlbTIgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuQ1VSUkVOVF9BQ0NFU1NfRU5USVRMRU1FTlQ7XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAyLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogWyBpdGVtMSwgaXRlbTIgXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ2Jsb3dzIHVwIHdpdGhvdXQgYSByZXF1ZXN0ZWVJZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEN1cnJlbnRBY2Nlc3NJdGVtcygnc29tZXRoaW5nJywgbnVsbCwgMCwgMTAsIG51bGwpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0Q3VycmVudEFjY2Vzc0l0ZW1zKCdzb21ldGhpbmcnLCBudWxsLCAwLCAxMCwgJycpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGdldEFjY2Vzc0l0ZW1zKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlYXJjaFRlcm0gPSAnMScsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hhdGV2ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdlbHNlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydElkeCA9IDAsXHJcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVlSWQgPSAnZHVkZScsXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGl0ZW1zVVJMICtcclxuICAgICAgICAgICAgICAgICAgICAnP2lkZW50aXR5SWQ9ZHVkZSZsaW1pdD0xMCZxdWVyeT0xJnNlYXJjaFR5cGU9S2V5d29yZCZzdGFydD0wJicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGB3aGF0ZXZlcj0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVyVmFsdWVzLndoYXRldmVyKX1gO1xyXG5cclxuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZSwgJ2dldEFjY2Vzc0l0ZW1zJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEN1cnJlbnRBY2Nlc3NJdGVtcyhzZWFyY2hUZXJtLCBmaWx0ZXJWYWx1ZXMsIHN0YXJ0SWR4LCBsaW1pdCwgcmVxdWVzdGVlSWQpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWNjZXNzSXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW1zVVJMLCBDdXJyZW50QWNjZXNzSXRlbSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm0sIGZpbHRlclZhbHVlcywgc3RhcnRJZHgsIGxpbWl0LCByZXF1ZXN0ZWVJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjb252ZXJ0cyBvYmplY3RzIHRvIEN1cnJlbnRBY2Nlc3NJdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGl0ZW1zVVJMICsgJz9pZGVudGl0eUlkPXJlcXVlc3RlZSZsaW1pdD0xMCZzZWFyY2hUeXBlPUtleXdvcmQmc3RhcnQ9MCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0Q3VycmVudEFjY2Vzc0l0ZW1zKG51bGwsIG51bGwsIDAsIDEwLCAncmVxdWVzdGVlJyk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0c1swXSBpbnN0YW5jZW9mIEN1cnJlbnRBY2Nlc3NJdGVtKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iamVjdHNbMV0gaW5zdGFuY2VvZiBDdXJyZW50QWNjZXNzSXRlbSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEFkZGl0aW9uYWxRdWVzdGlvbnMoKScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgYWNjZXNzSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAxMjNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWRlbnRpdHlJZHMgPSBbJ3NvbWUuZ3V5J10sXHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgcGVybWl0dGVkUm9sZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDMyMSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICdOYW1lJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAxMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnT3RoZXIgTmFtZSdcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0sIHByb21pc2U7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVXJsKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnL2lkZW50aXR5aXEvdWkvcmVzdC9yZXF1ZXN0QWNjZXNzL2FjY2Vzc0l0ZW1zLycgKyBpZCArICcvYWRkaXRpb25hbFF1ZXN0aW9ucyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnYmxvd3MgdXAgd2l0aG91dCBhIGFjY2Vzc1JlcXVlc3RJdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdibG93cyB1cCB3aXRob3V0IGlkZW50aXR5SWRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuZ2V0QWRkaXRpb25hbFF1ZXN0aW9ucyhhY2Nlc3NJdGVtKTtcclxuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY29udmVydHMgcmVzcG9uc2UgdG8gQWNjZXNzUmVxdWVzdEFkZGl0aW9uYWxRdWVzdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZGVudGl0eUlkczogaWRlbnRpdHlJZHNcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJ1aWxkVXJsKGFjY2Vzc0l0ZW0uaWQpLCBkYXRhKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRBZGRpdGlvbmFsUXVlc3Rpb25zKGFjY2Vzc0l0ZW0sIGlkZW50aXR5SWRzKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnBlcm1pdHRlZFJvbGVzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSBpbnN0YW5jZW9mIEFjY2Vzc1JlcXVlc3RBZGRpdGlvbmFsUXVlc3Rpb25zKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UucGVybWl0dGVkUm9sZXNbMF0gaW5zdGFuY2VvZiBBY2Nlc3NSZXF1ZXN0SXRlbSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnBlcm1pdHRlZFJvbGVzWzFdIGluc3RhbmNlb2YgQWNjZXNzUmVxdWVzdEl0ZW0pLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmVqZWN0IHdpdGggaW52YWxpZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZmFpbHVyZSA9IGphc21pbmUuY3JlYXRlU3B5KCdmYWlsdXJlJyksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzID0gamFzbWluZS5jcmVhdGVTcHkoJ3N1Y2Nlc3MnKSxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZHM6IGlkZW50aXR5SWRzXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChidWlsZFVybChhY2Nlc3NJdGVtLmlkKSwgZGF0YSkucmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMoYWNjZXNzSXRlbSwgaWRlbnRpdHlJZHMpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3VjY2VzcywgZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3VjY2Vzcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZhaWx1cmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBwYXNzIHBlcm1pdHRpbmcgcm9sZSBpZCBhbmQgb3RoZXIgcm9sZXMgaWYgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwZXJtaXR0ZWRCeSA9IHtpZDogJ3Blcm1pdHRpbmdJZCd9LFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMTIzNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEyMzQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWl0dGVkQnlJZDogOTk5OSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiA0MzIxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gNDMyMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvdGhlclJvbGVzLCBkYXRhO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTEuYWNjb3VudFNlbGVjdGlvbnMgPSBbe31dO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtMS5hY2NvdW50U2VsZWN0aW9uc1swXSA9IGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByb3Zpc2lvbmluZ1RhcmdldCgnUm9sZSBOYW1lIDEnLCAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudEluZm8oJzEyM25JZCcsICdpbnN0YW5jZScpKSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0yLmFjY291bnRTZWxlY3Rpb25zID0gW3t9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbTIuYWNjb3VudFNlbGVjdGlvbnNbMF0gPSBjcmVhdGVBY2NvdW50U2VsZWN0aW9uKCc0NTZpZCcsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQoJ1JvbGUgTmFtZSAyNycsICdBcHAgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50SW5mbygnNDU2bklkJywgJ2luc3RhbmNlIDQyJykpKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZGVudGl0eUlkczogaWRlbnRpdHlJZHMsXHJcbiAgICAgICAgICAgICAgICBwZXJtaXR0ZWRCeUlkOiBwZXJtaXR0ZWRCeS5pZCxcclxuICAgICAgICAgICAgICAgIG90aGVyQWRkZWRSb2xlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDEyMzQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRTZWxlY3Rpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnUm9sZSBOYW1lIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJzEyM25JZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDQzMjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pdHRlZEJ5SWQ6IDk5OTksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRTZWxlY3Rpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogJzQ1NmlkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVOYW1lOiAnUm9sZSBOYW1lIDI3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FwcCBOYW1lIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICc0NTZuSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZSA0MidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBvdGhlclJvbGVzID0gW3JlcXVlc3RlZEFjY2Vzc0l0ZW0xLCByZXF1ZXN0ZWRBY2Nlc3NJdGVtMl07XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJ1aWxkVXJsKGFjY2Vzc0l0ZW0uaWQpLCBkYXRhKS5yZXNwb25kKDIwMCwge30pO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMoYWNjZXNzSXRlbSwgaWRlbnRpdHlJZHMsXHJcbiAgICAgICAgICAgICAgICBwZXJtaXR0ZWRCeSwgdW5kZWZpbmVkLCBvdGhlclJvbGVzKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcGFzcyB0aGUgYXNzaWdubWVudCBpZCBpZiBwcmVzZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBhc3NpZ25tZW50SWQgPSAnYXNzbW50SWQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZGVudGl0eUlkczogaWRlbnRpdHlJZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudElkOiBhc3NpZ25tZW50SWRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJ1aWxkVXJsKGFjY2Vzc0l0ZW0uaWQpLCBkYXRhKS5yZXNwb25kKDIwMCwge30pO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldEFkZGl0aW9uYWxRdWVzdGlvbnMoYWNjZXNzSXRlbSwgaWRlbnRpdHlJZHMsIHVuZGVmaW5lZCwgYXNzaWdubWVudElkKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NoZWNrVW5pcXVlQXNzaWdtZW50KCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVxdWVzdGVkQWNjZXNzSXRlbSwgc3B5LCB0ZXN0U2VydmljZSwgJHNjb3BlLCBkYXRhO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfdGVzdFNlcnZpY2VfLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGl0ZW06IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogMTIzNFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudFNlbGVjdGlvbnM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBnZW5lcmF0ZSBhIHBvc3Qgd2l0aCBhbiBlbXB0eSBhY2NvdW50IHNlbGVjdGlvbnMgaWYgbm8gYWNjb3VudCBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2VzcyhhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmNoZWNrVW5pcXVlQXNzaWdubWVudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBnZW5lcmF0ZSBhIHBvc3Qgd2l0aCBhbiBlbXB0eSBhY2NvdW50IHNlbGVjdGlvbnMgaWYgbm8gcHJvdmlzaW9uaW5nIHRhcmdldHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IFt7fV07XHJcblxyXG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQocmVxdWVzdGVkQWNjZXNzSXRlbSkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgZ2VuZXJhdGUgYSBwb3N0IHdpdGggYW4gZW1wdHkgYWNjb3VudCBzZWxlY3Rpb25zIGlmIG5vIGFjY291bnQgaW5mb3MnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IFt7fV07XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uYWNjb3VudFNlbGVjdGlvbnNbMF0ucHJvdmlzaW9uaW5nVGFyZ2V0cyA9IFtjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQoKV07XHJcblxyXG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MoYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQocmVxdWVzdGVkQWNjZXNzSXRlbSkpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgc2VuZCByZXF1ZXN0IHdpdGggYW4gZW1wdHkgYWNjb3VudCBzZWxlY3Rpb25zIGlmIHRhcmdldCBpcyBmb3IgYSBjcmVhdGUgYWNjb3VudCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW3t9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9uc1swXS5wcm92aXNpb25pbmdUYXJnZXRzID0gW3tcclxuICAgICAgICAgICAgICAgIGlzQ3JlYXRlQWNjb3VudDogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zWzBdLnByb3Zpc2lvbmluZ1RhcmdldHNbMV0gPVxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KCdSb2xlIE5hbWUgMScsICdBcHAgTmFtZSAxJywgY3JlYXRlQWNjb3VudEluZm8oJzEyM25JZCcsICdpbnN0YW5jZScpKTtcclxuXHJcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2VzcyhhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmNoZWNrVW5pcXVlQXNzaWdubWVudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIGEgcG9zdCB3aXRoIGFuIGFjY291bnQgaW5mbyBmb3IgYW4gYWNjb3VudCBzZWxlY3Rpb24gJyArXHJcbiAgICAgICAgICAgICd3aXRoIGEgcHJvdmlzaW9uaW5nIHRhcmdldCB3aXRoIGFuIGFjY291bnQgaW5mbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW3t9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9uc1swXSA9IGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByb3Zpc2lvbmluZ1RhcmdldCgnUm9sZSBOYW1lIDEnLCAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudEluZm8oJzEyM25JZCcsICdpbnN0YW5jZScpKSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhLmFjY291bnRTZWxlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICcxMjNpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdSb2xlIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICcxMjNuSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnaW5zdGFuY2UnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChidWlsZFVybChyZXF1ZXN0ZWRBY2Nlc3NJdGVtLml0ZW0uaWQpLCBkYXRhKS5yZXNwb25kKDIwMCwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQocmVxdWVzdGVkQWNjZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIGEgcG9zdCB3aXRoIHR3byBhY2NvdW50IGluZm8gZm9yIGFuIGFjY291bnQgc2VsZWN0aW9uICcgK1xyXG4gICAgICAgICAgICAnd2l0aCBhIHR3byBwcm92aXNpb25pbmcgdGFyZ2V0cyB3aXRoIG9uZSBhY2NvdW50IGluZm8gZWFjaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zID0gW3t9XTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9uc1swXSA9IGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByb3Zpc2lvbmluZ1RhcmdldCgnUm9sZSBOYW1lIDEnLCAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudEluZm8oJzEyM25JZCcsICdpbnN0YW5jZScpKSxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVByb3Zpc2lvbmluZ1RhcmdldCh1bmRlZmluZWQsICdBcHAgTmFtZSAyJyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50SW5mbygnMzIxbklkJykpKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuYWNjb3VudFNlbGVjdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ1JvbGUgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJzEyM25JZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZSAyJyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJzMyMW5JZCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJ1aWxkVXJsKHJlcXVlc3RlZEFjY2Vzc0l0ZW0uaXRlbS5pZCksIGRhdGEpLnJlc3BvbmQoMjAwLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmNoZWNrVW5pcXVlQXNzaWdubWVudChyZXF1ZXN0ZWRBY2Nlc3NJdGVtKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgYSBwb3N0IHdpdGggdHdvIGFjY291bnQgaW5mbyBmb3IgdHdvIGFjY291bnQgc2VsZWN0aW9uICcgK1xyXG4gICAgICAgICAgICAnd2l0aCBvbmUgcHJvdmlzaW9uaW5nIHRhcmdldCBlYWNoIHdpdGggYW4gYWNjb3VudCBpbmZvIGVhY2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hY2NvdW50U2VsZWN0aW9ucyA9IFt7fV07XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uYWNjb3VudFNlbGVjdGlvbnNbMF0gPSBjcmVhdGVBY2NvdW50U2VsZWN0aW9uKCcxMjNpZCcsXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm92aXNpb25pbmdUYXJnZXQoJ1JvbGUgTmFtZSAxJywgJ0FwcCBOYW1lIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUFjY291bnRJbmZvKCcxMjNuSWQnLCAnaW5zdGFuY2UnKSkpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zWzFdID0gY3JlYXRlQWNjb3VudFNlbGVjdGlvbignNDU2aWQnLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KCdSb2xlIE5hbWUgMjcnLCAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudEluZm8oJzQ1Nm5JZCcsICdpbnN0YW5jZSA0MicpKSk7XHJcblxyXG4gICAgICAgICAgICBkYXRhLmFjY291bnRTZWxlY3Rpb25zID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICcxMjNpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdSb2xlIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnQXBwIE5hbWUgMScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICcxMjNuSWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiAnaW5zdGFuY2UnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkZW50aXR5SWQ6ICc0NTZpZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZU5hbWU6ICdSb2xlIE5hbWUgMjcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FwcCBOYW1lIDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnNDU2bklkJyxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlIDQyJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYnVpbGRVcmwocmVxdWVzdGVkQWNjZXNzSXRlbS5pdGVtLmlkKSwgZGF0YSkucmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UuY2hlY2tVbmlxdWVBc3NpZ25tZW50KHJlcXVlc3RlZEFjY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzZW5kIGFzc2lnbm1lbnRJZCB3aGVuIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYXNzaWdubWVudElkID0gJ2Fzc21udElkJztcclxuICAgICAgICAgICAgcmVxdWVzdGVkQWNjZXNzSXRlbS5hc3NpZ25tZW50SWQgPSBhc3NpZ25tZW50SWQ7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEFjY2Vzc0l0ZW0uYWNjb3VudFNlbGVjdGlvbnMgPSBbe31dO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRBY2Nlc3NJdGVtLmFjY291bnRTZWxlY3Rpb25zWzBdID0gY3JlYXRlQWNjb3VudFNlbGVjdGlvbignMTIzaWQnLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvdmlzaW9uaW5nVGFyZ2V0KCdSb2xlIE5hbWUgMScsICdBcHAgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50SW5mbygnMTIzbklkJykpKTtcclxuXHJcbiAgICAgICAgICAgIGRhdGEuYWNjb3VudFNlbGVjdGlvbnMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHlJZDogJzEyM2lkJyxcclxuICAgICAgICAgICAgICAgICAgICByb2xlTmFtZTogJ1JvbGUgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBcHAgTmFtZSAxJyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJzEyM25JZCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZGF0YS5hc3NpZ25tZW50SWQgPSBhc3NpZ25tZW50SWQ7XHJcblxyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChidWlsZFVybChyZXF1ZXN0ZWRBY2Nlc3NJdGVtLml0ZW0uaWQpLCBkYXRhKS5yZXNwb25kKDIwMCwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5jaGVja1VuaXF1ZUFzc2lnbm1lbnQocmVxdWVzdGVkQWNjZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3RyYW5zZm9ybVJlcXVlc3RlZEFjY2Vzc0l0ZW0oKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXF1ZXN0ZWRJdGVtMSwgcmVxdWVzdGVkSXRlbTIsIGRhdGEgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQgOiAndGVkLnRhY3VsYXIuaWQnLFxyXG4gICAgICAgICAgICAgICAgcm9sZU5hbWUgOiAnQm9zcycsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWUgOiAnYXBwTmFtZScsXHJcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eSA6ICd0ZWQnLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgOiAndGVkc0FjY291bnQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGlkZW50aXR5SWQgOiAndGVkLnRhY3VsYXIuaWQnLFxyXG4gICAgICAgICAgICAgICAgcm9sZU5hbWUgOiAnRW5kZW50dXJlZCBTZXJ2YW50JyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZSA6ICdhcHBOYW1lMicsXHJcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eSA6ICdsYWNreScsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA6ICdsYWNreUluc3RhbmNlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSwgZGF0YUNyZWF0ZSA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlJZCA6ICd0ZWQudGFjdWxhci5pZCcsXHJcbiAgICAgICAgICAgICAgICByb2xlTmFtZSA6ICdCb3NzJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZSA6ICdhcHBOYW1lJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5IDogJ25ldydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlJZCA6ICd0ZWQudGFjdWxhci5pZCcsXHJcbiAgICAgICAgICAgICAgICByb2xlTmFtZSA6ICdFbmRlbnR1cmVkIFNlcnZhbnQnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lIDogJ2FwcE5hbWUyJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5IDogJ25ldydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKFJlcXVlc3RlZEFjY2Vzc0l0ZW0sIElkZW50aXR5QWNjb3VudFNlbGVjdGlvbiwgYWNjZXNzUmVxdWVzdFRlc3REYXRhKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0xID0gbmV3IFJlcXVlc3RlZEFjY2Vzc0l0ZW0oXHJcbiAgICAgICAgICAgICAgICBuZXcgQWNjZXNzUmVxdWVzdEl0ZW0oYWNjZXNzUmVxdWVzdFRlc3REYXRhLlJPTEUpKTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTIgPSBuZXcgUmVxdWVzdGVkQWNjZXNzSXRlbShcclxuICAgICAgICAgICAgICAgIG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuUk9MRSkpO1xyXG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtMS5hY2NvdW50U2VsZWN0aW9ucyA9XHJcbiAgICAgICAgICAgICAgICBbbmV3IElkZW50aXR5QWNjb3VudFNlbGVjdGlvbihhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfQUNDVF9TRUxFQ1RJT04xKV07XHJcbiAgICAgICAgICAgIHJlcXVlc3RlZEl0ZW0yLmFjY291bnRTZWxlY3Rpb25zID1cclxuICAgICAgICAgICAgICAgIFtuZXcgSWRlbnRpdHlBY2NvdW50U2VsZWN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9BQ0NUX1NFTEVDVElPTjEpXTtcclxuICAgICAgICAgICAgLy9zZWxlY3QgYWNjb3VudHNcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTEuYWNjb3VudFNlbGVjdGlvbnNbMF0uZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpLmZvckVhY2goZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2VsZWN0QWNjb3VudCh0YXJnZXQuZ2V0QWNjb3VudEluZm9zKClbMF0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVxdWVzdGVkSXRlbTIuYWNjb3VudFNlbGVjdGlvbnNbMF0uZ2V0UHJvdmlzaW9uaW5nVGFyZ2V0cygpLmZvckVhY2goZnVuY3Rpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0Q3JlYXRlQWNjb3VudCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiBBY2Nlc3NSZXF1ZXN0SW5mbyBjb21wYXRpYmxlIGl0ZW1zIGZvciBleGlzdGluZyBhY2NvdW50cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS50cmFuc2Zvcm1SZXF1ZXN0ZWRBY2Nlc3NJdGVtKHJlcXVlc3RlZEl0ZW0xLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiBpdGVtcyBmb3IgbmV3IGFjY291bnRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLnRyYW5zZm9ybVJlcXVlc3RlZEFjY2Vzc0l0ZW0ocmVxdWVzdGVkSXRlbTIsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoZGF0YUNyZWF0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHJldHVybiBhbiBhcnJheSBvZiBpdGVtcyBmb3IgbmV3IGFjY291bnRzIHdpdGggZmxhZyB0b2dnbGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLnRyYW5zZm9ybVJlcXVlc3RlZEFjY2Vzc0l0ZW0ocmVxdWVzdGVkSXRlbTIsIHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0UG9wdWxhdGlvbklkZW50aXRpZXMoKScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpdGVtc1VSTCA9IGJhc2VVUkwgKyAnYWNjZXNzSXRlbXMvd2hhdGV2ZXIvcG9wdWxhdGlvbicsXHJcbiAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsge30sIHt9IF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdEl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3doYXRldmVyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmaWx0ZXJWYWx1ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAncV9JZGVudGl0eS50aGlzJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAndGhhdCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNvcnRPcmRlciA9IHtcclxuICAgICAgICAgICAgICAgIHRvSnNvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzdHVwaWRTb3J0cyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByb21pc2U7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgZmV0Y2ggdGhlIHBvcHVsYXRpb24gaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRVcmwgPSBpdGVtc1VSTCArIGA/bGltaXQ9MTAmYCArXHJcbiAgICAgICAgICAgICAgICBgcV9JZGVudGl0eS50aGlzPSR7dGVzdFNlcnZpY2UuZ2V0UXVlcnlQYXJhbVN0cmluZyhmaWx0ZXJWYWx1ZXNbJ3FfSWRlbnRpdHkudGhpcyddLCAnaWQnKX1gICtcclxuICAgICAgICAgICAgICAgIGAmc2hvd05vbk1hdGNoZWQ9ZmFsc2Umc29ydD1zdHVwaWRTb3J0cyZzdGFydD0wYDtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChleHBlY3RlZFVybCkucmVzcG9uZCgyMDAsIGRhdGEpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZS5nZXRQb3B1bGF0aW9uSWRlbnRpdGllcyhhY2Nlc3NSZXF1ZXN0SXRlbSwgdHJ1ZSwgZmlsdGVyVmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgMCwgMTAsIHNvcnRPcmRlcik7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlLCAyKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdoYW5kbGVzIGlkZW50aXR5SWRzIHNwZWNpYWxseScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaWRlbnRpdHlGaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlJZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FiY2QnXHJcbiAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnNTY3OCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdkdWRlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGV4cGVjdGVkVXJsID0gaXRlbXNVUkwgK1xyXG4gICAgICAgICAgICAgICAgYD9pZGVudGl0eUlkcz0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoaWRlbnRpdHlGaWx0ZXJzLmlkZW50aXR5SWRzLCAnaWQnKX1gICtcclxuICAgICAgICAgICAgICAgICcmbGltaXQ9MTAmc2hvd05vbk1hdGNoZWQ9ZmFsc2Umc29ydD1zdHVwaWRTb3J0cyZzdGFydD0wJztcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChleHBlY3RlZFVybCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldFBvcHVsYXRpb25JZGVudGl0aWVzKGFjY2Vzc1JlcXVlc3RJdGVtLCB0cnVlLCBpZGVudGl0eUZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgICAwLCAxMCwgc29ydE9yZGVyKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UsIDIpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIG5vIGFjY2Vzc1JlcXVlc3RJdGVtIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLmdldFBvcHVsYXRpb25JZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRTZWxlY3Rpb24oaWRlbnRpdHlJZCAvKiwgLi4ucHJvdmlzaW9uaW5nVGFyZ2V0cyAqLykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6IGlkZW50aXR5SWQsXHJcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RhcmdldHM6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb3Zpc2lvbmluZ1RhcmdldChyb2xlTmFtZSwgYXBwbGljYXRpb25OYW1lLCBzZWxlY3RlZEFjY291bnQpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRTZWxlY3RlZEFjY291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkQWNjb3VudDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNDcmVhdGVBY2NvdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZU5hbWU6IHJvbGVOYW1lLFxyXG4gICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6IGFwcGxpY2F0aW9uTmFtZSxcclxuICAgICAgICAgICAgYWNjb3VudEluZm9zOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBY2NvdW50SW5mbyhuYXRpdmVJZGVudGl0eSwgaW5zdGFuY2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogbmF0aXZlSWRlbnRpdHksXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnVpbGRVcmwoaWQpIHtcclxuICAgICAgICByZXR1cm4gJy9pZGVudGl0eWlxL3VpL3Jlc3QvcmVxdWVzdEFjY2Vzcy9hY2Nlc3NJdGVtcy8nICsgaWQgKyAnL2NoZWNrVW5pcXVlQXNzaWdubWVudCc7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
