System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', './IdentityRequestTestData', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestService', function () {

                var http = undefined,
                    identityRequestService = undefined,
                    SortOrder = undefined,
                    IdentityRequest = undefined,
                    ListResultDTO = undefined,
                    identityRequestTestData = undefined,
                    RequestResultDTO = undefined,
                    testService = undefined,
                    url = '/identityiq/ui/rest/identityRequests';

                beforeEach(module(identityRequestModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$httpBackend_, _identityRequestService_, _IdentityRequest_, _ListResultDTO_, _identityRequestTestData_, _SortOrder_, _RequestResultDTO_, _testService_) {

                    http = _$httpBackend_;
                    identityRequestService = _identityRequestService_;
                    IdentityRequest = _IdentityRequest_;
                    ListResultDTO = _ListResultDTO_;
                    identityRequestTestData = _identityRequestTestData_;
                    SortOrder = _SortOrder_;
                    RequestResultDTO = _RequestResultDTO_;
                    testService = _testService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getIdentityRequests()', function () {

                    var identityRequestListResult = undefined,
                        start = undefined,
                        limit = undefined,
                        filterValueService = undefined;

                    beforeEach(inject(function (_filterValueService_) {
                        filterValueService = _filterValueService_;
                        start = 10;
                        limit = 10;
                        identityRequestListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_1]
                        };
                        spyOn(filterValueService, 'getQueryParams').and.callThrough();
                    }));

                    it('should retrieve identity requests from REST with null sort', function () {

                        http.expectGET(url + '?limit=10&start=10').respond(200, identityRequestListResult);
                        identityRequestService.getIdentityRequests(start, limit, undefined, null).then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequest');
                        });
                        http.flush();
                    });

                    it('should retrieve identity requests from REST with sort', function () {

                        http.expectGET(url + '?limit=10&sort=%5B%5D&start=10').respond(200, identityRequestListResult);
                        identityRequestService.getIdentityRequests(start, limit, undefined, new SortOrder()).then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequest');
                        });
                        http.flush();
                    });

                    it('retrieves identity requests with filters', function () {
                        var filters = {
                            filter1: {
                                value: 'hello'
                            },
                            filter2: {
                                value: 'goodbye'
                            }
                        },
                            expectedUrl = url + '?filter1=' + testService.getQueryParamString(filters.filter1) + ('&filter2=' + testService.getQueryParamString(filters.filter2) + '&limit=10&start=10');
                        http.expectGET(expectedUrl).respond(200, identityRequestListResult);
                        identityRequestService.getIdentityRequests(start, limit, filters);
                        http.flush();
                        expect(filterValueService.getQueryParams).toHaveBeenCalledWith(filters, ['id', 'name']);
                    });

                    it('retrieves identity requests with search term', function () {
                        var searchTerm = 'hello',
                            expectedUrl = url + '?limit=10&query=hello&start=10';
                        http.expectGET(expectedUrl).respond(200, identityRequestListResult);
                        identityRequestService.getIdentityRequests(start, limit, undefined, undefined, searchTerm);
                        http.flush();
                    });
                });

                describe('getFilters()', function () {
                    var Filter = undefined;

                    beforeEach(inject(function (_Filter_) {
                        Filter = _Filter_;
                    }));

                    var filter = {
                        property: 'requester',
                        multiValued: false,
                        label: 'Requester',
                        dataType: 'Identity'
                    },
                        filters = [];

                    it('should return an array of filters', function () {
                        filters = [new Filter(filter)];
                        http.expectGET(url + '/filters').respond(200, [filter]);
                        identityRequestService.getFilters().then(function (filtersData) {
                            expect(filtersData.length).toEqual(1);
                            expect(filtersData).toEqual(filters);
                        });
                        http.flush();
                    });
                });

                describe('cancelRequest()', function () {

                    it('should throw with no requestId', function () {
                        expect(function () {
                            return identityRequestService.cancelRequest(null, 'cancel this');
                        }).toThrow();
                    });

                    it('should post the cancel request with comments', function () {
                        var requestId = '11',
                            input = {
                            comments: 'Cancel this request'
                        };

                        http.expectPOST(url + '/' + requestId + '/cancel', input).respond(200, null);

                        identityRequestService.cancelRequest(requestId, input.comments).then(function (response) {
                            expect(response).toBeDefined();
                            expect(response instanceof RequestResultDTO).toEqual(true);
                        });
                        http.flush();
                    });
                });

                describe('showRoleDetailsDialog()', function () {
                    var roleDetailDialogService = undefined,
                        $q = undefined;

                    beforeEach(inject(function (_roleDetailDialogService_, _$q_) {
                        $q = _$q_;
                        roleDetailDialogService = _roleDetailDialogService_;
                    }));

                    it('shows roleDetails dialog for role', function () {
                        spyOn(roleDetailDialogService, 'showDialog');
                        spyOn(identityRequestService, 'getRoleDetails').and.returnValue($q.when({}));

                        identityRequestService.showRoleDetailsDialog('requestId', 'itemId');

                        expect(roleDetailDialogService.showDialog).toHaveBeenCalled();
                        var args = roleDetailDialogService.showDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        var urlFunc = args[2];
                        expect(angular.isFunction(urlFunc)).toEqual(true);
                    });
                });

                describe('showManagedAttributeDetailsDialog()', function () {
                    var managedAttributeDialogService = undefined,
                        managedAttributeService = undefined;

                    beforeEach(inject(function (_managedAttributeDialogService_, _managedAttributeService_) {
                        managedAttributeService = _managedAttributeService_;
                        managedAttributeDialogService = _managedAttributeDialogService_;
                    }));

                    it('shows managed attribute detail dialog for managedAttribute', function () {
                        var managedAttributeDetail = { id: '5555' },
                            requestId = '1234',
                            itemId = '1111',
                            managedAttrURL = url + '/' + requestId + '/items/' + itemId + '/managedAttributeDetails';
                        spyOn(managedAttributeDialogService, 'showDialog');
                        spyOn(managedAttributeService, 'getEntitlementDetails').and.callFake(function () {
                            return managedAttributeDetail;
                        });

                        identityRequestService.showManagedAttributeDetailsDialog(requestId, itemId);

                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalled();
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalled();
                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(managedAttrURL);
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(managedAttributeDetail, managedAttrURL);
                    });
                });

                describe('getInteractions()', function () {

                    var approvalListResult = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        start = 10;
                        limit = 10;
                        approvalListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_APPROVAL_SUMMARY_1]
                        };
                    });

                    it('should retrieve interactions from REST with null sort', function () {

                        http.expectGET(url + '/1/interactions?limit=10&start=10').respond(200, approvalListResult);
                        promise = identityRequestService.getInteractions('1', start, limit, null);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestApprovalSummary');
                        });
                    });

                    it('should retrieve approval history from REST with sort', function () {

                        http.expectGET(url + '/1/interactions?limit=10&sort=%5B%5D&start=10').respond(200, approvalListResult);
                        promise = identityRequestService.getInteractions('1', start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestApprovalSummary');
                        });
                    });
                });

                describe('getApprovalReminderEmailTemplate()', function () {
                    var templateData = {
                        toIdentity: {
                            id: '1234',
                            name: 'Gilligan'
                        }
                    },
                        EmailTemplate = undefined;

                    beforeEach(inject(function (_EmailTemplate_) {
                        EmailTemplate = _EmailTemplate_;
                    }));

                    it('throws with bad inputs', function () {
                        expect(function () {
                            return identityRequestService.getApprovalReminderEmailTemplate(undefined, 'abcd');
                        }).toThrow();
                        expect(function () {
                            return identityRequestService.getApprovalReminderEmailTemplate('1234', undefined);
                        }).toThrow();
                    });

                    it('should return an EmailTemplate', function () {
                        var requestId = 'request1',
                            workItemId = 'workItem1';

                        http.expectGET(url + '/' + requestId + '/email/' + workItemId + '/reminder').respond(200, templateData);
                        identityRequestService.getApprovalReminderEmailTemplate(requestId, workItemId).then(function (template) {
                            expect(template).toBeDefined();
                            expect(template instanceof EmailTemplate).toEqual(true);
                        });
                        http.flush();
                    });
                });

                describe('sendApprovalReminderEmailTemplate()', function () {
                    var templateData = {
                        toIdentity: {
                            id: '1234',
                            name: 'Gilligan'
                        }
                    };

                    it('throws with bad inputs', function () {
                        expect(function () {
                            return identityRequestService.sendApprovalReminderEmail(undefined, 'abcd', templateData);
                        }).toThrow();
                        expect(function () {
                            return identityRequestService.sendApprovalReminderEmail('1234', undefined, templateData);
                        }).toThrow();
                        expect(function () {
                            return identityRequestService.sendApprovalReminderEmail('1234', 'abcd', undefined);
                        }).toThrow();
                    });

                    it('should call resource', function () {
                        var requestId = 'request1',
                            workItemId = 'workItem1',
                            input = {
                            emailTemplate: templateData
                        };

                        http.expectPOST(url + '/' + requestId + '/email/' + workItemId + '/reminder/send', input).respond(200, null);

                        identityRequestService.sendApprovalReminderEmail(requestId, workItemId, templateData).then(function (response) {
                            expect(response).toBeDefined();
                            expect(response.status).toBe(200);
                        });
                        http.flush();
                    });
                });

                describe('getFilteredItems()', function () {

                    var filteredItemsListResult = undefined,
                        compilationStatusFilter = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        start = 0;
                        limit = 10;
                        compilationStatusFilter = {
                            operation: 'Equals',
                            value: 'Filtered'
                        };
                        filteredItemsListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_ITEM_1]
                        };
                    });

                    it('should retrieve filtered items from REST with null sort', function () {

                        http.expectGET(url + '/1/items?colKey=columns&compilationStatus=' + testService.getQueryParamString(compilationStatusFilter) + '&limit=10&start=0').respond(200, filteredItemsListResult);
                        promise = identityRequestService.getFilteredItems('1', start, limit, null, 'columns');
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });

                    it('should retrieve filtered items from REST with sort', function () {

                        http.expectGET(url + '/1/items?colKey=columns&compilationStatus=' + testService.getQueryParamString(compilationStatusFilter) + '&limit=10&sort=%5B%5D&start=0').respond(200, filteredItemsListResult);
                        promise = identityRequestService.getFilteredItems('1', start, limit, new SortOrder(), 'columns');
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });
                });

                describe('getUnFilteredItems()', function () {

                    var unFilteredItemsListResult = undefined,
                        compilationStatusFilter = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        start = 0;
                        limit = 10;
                        compilationStatusFilter = {
                            operation: 'NotEquals',
                            value: ['Filtered', 'Expansion']
                        };
                        unFilteredItemsListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_ITEM_2]
                        };
                    });

                    it('should retrieve unfiltered items from REST with null sort', function () {

                        http.expectGET(url + '/2/items?colKey=columns&compilationStatus=' + testService.getQueryParamString(compilationStatusFilter) + '&limit=10&start=0').respond(200, unFilteredItemsListResult);
                        promise = identityRequestService.getUnFilteredItems('2', start, limit, null, 'columns');
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });

                    it('should retrieve unfiltered items from REST with sort', function () {

                        http.expectGET(url + '/2/items?colKey=columns&compilationStatus=' + testService.getQueryParamString(compilationStatusFilter) + '&limit=10&sort=%5B%5D&start=0').respond(200, unFilteredItemsListResult);
                        promise = identityRequestService.getUnFilteredItems('2', start, limit, new SortOrder(), 'columns');
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });
                });

                describe('getIdentityRequest()', function () {
                    var identityRequestObjectResult = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        identityRequestObjectResult = {
                            object: identityRequestTestData.IDENTITY_REQUEST_1
                        };
                    });

                    it('should retrieve identityRequest from REST', function () {
                        http.expectGET(url + '/1').respond(200, identityRequestObjectResult);
                        promise = identityRequestService.getIdentityRequest(1);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response instanceof IdentityRequest).toEqual(true);
                        });
                    });

                    it('should throw if no requestId', function () {
                        expect(function () {
                            identityRequestService.getIdentityRequest();
                        }).toThrow();
                    });
                });

                describe('getMessages()', function () {

                    var messagesListResult = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        start = 0;
                        limit = 5;
                        messagesListResult = {
                            count: 1,
                            objects: [{ type: 'Info', messageOrKey: 'informational message' }]
                        };
                    });

                    it('should retrieve messages from REST with null sort', function () {

                        http.expectGET(url + '/1/messages?limit=5&start=0').respond(200, messagesListResult);
                        promise = identityRequestService.getMessages('1', start, limit, null);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('SpMessage');
                        });
                    });

                    it('should retrieve messages from REST with sort', function () {

                        http.expectGET(url + '/1/messages?limit=5&sort=%5B%5D&start=0').respond(200, messagesListResult);
                        promise = identityRequestService.getMessages('1', start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('SpMessage');
                        });
                    });
                });

                describe('getProvisioningItems()', function () {

                    var provisioningItemsListResult = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined,
                        groupBy = undefined;

                    beforeEach(function () {
                        start = 0;
                        limit = 10;
                        groupBy = 'provisioningEngine';
                        provisioningItemsListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_ITEM_2]
                        };
                    });

                    it('should retrieve provisioning items from REST with null sort', function () {
                        var expectedURL = url + '/2/changeItems?groupBy=' + groupBy + '&limit=10&start=0';

                        http.expectGET(expectedURL).respond(200, provisioningItemsListResult);
                        promise = identityRequestService.getProvisioningItems('2', start, limit, null, groupBy);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });

                    it('should retrieve provisioning items from REST with sort', function () {
                        var expectedURL = url + '/2/changeItems?groupBy=' + groupBy + '&limit=10&sort=%5B%5D&start=0';

                        http.expectGET(expectedURL).respond(200, provisioningItemsListResult);
                        promise = identityRequestService.getProvisioningItems('2', start, limit, new SortOrder(), groupBy);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('IdentityRequestItem');
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5Qyw2QkFBNkIsdUJBQXVCLFVBQVUsU0FBUzs7O0lBR3hKOztJQUVBLElBQUksdUJBQXVCO0lBQzNCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsMEJBQTBCLElBQUksVUFBVSxtQkFBbUI7WUFDcEUsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQkFBMEIsWUFBTTs7Z0JBRXJDLElBQUksT0FBSTtvQkFBRSx5QkFBc0I7b0JBQUUsWUFBUztvQkFBRSxrQkFBZTtvQkFBRSxnQkFBYTtvQkFBRSwwQkFBdUI7b0JBQ2hHLG1CQUFnQjtvQkFBRSxjQUFXO29CQUM3QixNQUFNOztnQkFFVixXQUFXLE9BQU8sdUJBQXVCOztnQkFFekMsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7OztnQkFJekMsV0FBVyxPQUFPLFVBQUMsZ0JBQWdCLDBCQUEwQixtQkFBbUIsaUJBQzdELDJCQUEyQixhQUFhLG9CQUFvQixlQUFrQjs7b0JBRTdGLE9BQU87b0JBQ1AseUJBQXlCO29CQUN6QixrQkFBa0I7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsMEJBQTBCO29CQUMxQixZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsY0FBYzs7O2dCQUdsQixVQUFVLFlBQU07b0JBQ1osS0FBSztvQkFDTCxLQUFLOzs7Z0JBR1QsU0FBUyx5QkFBeUIsWUFBTTs7b0JBRXBDLElBQUksNEJBQXlCO3dCQUFFLFFBQUs7d0JBQUUsUUFBSzt3QkFBRSxxQkFBa0I7O29CQUUvRCxXQUFXLE9BQU8sVUFBQyxzQkFBeUI7d0JBQ3hDLHFCQUFxQjt3QkFDckIsUUFB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dUIscUJBQXFCLEtBQUssT0FBTyxPQUFPLElBQUksYUFBYTt3QkFDMUYsS0FBSzt3QkFDTCxRQUFRLEtBQUssVUFBUyxVQUFVOzs0QkFFNUIsT0FBTyxTQUFTLEtBQUssWUFBWSxNQUFNLEtBQUs7NEJBQzVDLE9BQU8sU0FBUyxLQUFLLFFBQVEsR0FBRyxZQUFZLE1BQU0sS0FBSzs7Ozs7OztHQXFDcEUiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcbmltcG9ydCAnLi9JZGVudGl0eVJlcXVlc3RUZXN0RGF0YSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0U2VydmljZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgaHR0cCwgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgU29ydE9yZGVyLCBJZGVudGl0eVJlcXVlc3QsIExpc3RSZXN1bHREVE8sIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLFxyXG4gICAgICAgIFJlcXVlc3RSZXN1bHREVE8sIHRlc3RTZXJ2aWNlLFxyXG4gICAgICAgIHVybCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L2lkZW50aXR5UmVxdWVzdHMnO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGh0dHBCYWNrZW5kXywgX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfLCBfSWRlbnRpdHlSZXF1ZXN0XywgX0xpc3RSZXN1bHREVE9fLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sIF9Tb3J0T3JkZXJfLCBfUmVxdWVzdFJlc3VsdERUT18sIF90ZXN0U2VydmljZV8pID0+IHtcclxuXHJcbiAgICAgICAgaHR0cCA9IF8kaHR0cEJhY2tlbmRfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0ID0gX0lkZW50aXR5UmVxdWVzdF87XHJcbiAgICAgICAgTGlzdFJlc3VsdERUTyA9IF9MaXN0UmVzdWx0RFRPXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XHJcbiAgICAgICAgUmVxdWVzdFJlc3VsdERUTyA9IF9SZXF1ZXN0UmVzdWx0RFRPXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xyXG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eVJlcXVlc3RzKCknLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBpZGVudGl0eVJlcXVlc3RMaXN0UmVzdWx0LCBzdGFydCwgbGltaXQsIGZpbHRlclZhbHVlU2VydmljZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9maWx0ZXJWYWx1ZVNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgICAgIGZpbHRlclZhbHVlU2VydmljZSA9IF9maWx0ZXJWYWx1ZVNlcnZpY2VfO1xyXG4gICAgICAgICAgICBzdGFydCA9IDEwO1xyXG4gICAgICAgICAgICBsaW1pdCA9IDEwO1xyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RMaXN0UmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzcHlPbihmaWx0ZXJWYWx1ZVNlcnZpY2UsICdnZXRRdWVyeVBhcmFtcycpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBpZGVudGl0eSByZXF1ZXN0cyBmcm9tIFJFU1Qgd2l0aCBudWxsIHNvcnQnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnP2xpbWl0PTEwJnN0YXJ0PTEwJylcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgaWRlbnRpdHlSZXF1ZXN0TGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0SWRlbnRpdHlSZXF1ZXN0cyhzdGFydCwgbGltaXQsIHVuZGVmaW5lZCwgbnVsbClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xpc3RSZXN1bHREVE8nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBpZGVudGl0eSByZXF1ZXN0cyBmcm9tIFJFU1Qgd2l0aCBzb3J0JywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsICsgJz9saW1pdD0xMCZzb3J0PSU1QiU1RCZzdGFydD0xMCcpXHJcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGlkZW50aXR5UmVxdWVzdExpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldElkZW50aXR5UmVxdWVzdHMoc3RhcnQsIGxpbWl0LCB1bmRlZmluZWQsIG5ldyBTb3J0T3JkZXIoKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xpc3RSZXN1bHREVE8nKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHJpZXZlcyBpZGVudGl0eSByZXF1ZXN0cyB3aXRoIGZpbHRlcnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdoZWxsbydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdnb29kYnllJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGAke3VybH0/ZmlsdGVyMT0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5maWx0ZXIxKX1gICtcclxuICAgICAgICAgICAgICAgICAgICBgJmZpbHRlcjI9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMuZmlsdGVyMil9JmxpbWl0PTEwJnN0YXJ0PTEwYDtcclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLnJlc3BvbmQoMjAwLCBpZGVudGl0eVJlcXVlc3RMaXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRJZGVudGl0eVJlcXVlc3RzKHN0YXJ0LCBsaW1pdCwgZmlsdGVycyk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgZXhwZWN0KGZpbHRlclZhbHVlU2VydmljZS5nZXRRdWVyeVBhcmFtcykudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmlsdGVycywgWydpZCcsICduYW1lJ10pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0cmlldmVzIGlkZW50aXR5IHJlcXVlc3RzIHdpdGggc2VhcmNoIHRlcm0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hUZXJtID0gJ2hlbGxvJyxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYCR7dXJsfT9saW1pdD0xMCZxdWVyeT1oZWxsbyZzdGFydD0xMGA7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwgaWRlbnRpdHlSZXF1ZXN0TGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0SWRlbnRpdHlSZXF1ZXN0cyhzdGFydCwgbGltaXQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBzZWFyY2hUZXJtKTtcclxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEZpbHRlcnMoKScsICgpID0+IHtcclxuICAgICAgICBsZXQgRmlsdGVyO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX0ZpbHRlcl8pID0+IHtcclxuICAgICAgICAgICAgRmlsdGVyID0gX0ZpbHRlcl87XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBsZXQgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdyZXF1ZXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgbXVsdGlWYWx1ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSZXF1ZXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdJZGVudGl0eSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmlsdGVycyA9IFtdO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiBmaWx0ZXJzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJzID0gW25ldyBGaWx0ZXIoZmlsdGVyKV07XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke3VybH0vZmlsdGVyc2ApLnJlc3BvbmQoMjAwLCBbZmlsdGVyXSk7XHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0RmlsdGVycygpLnRoZW4oKGZpbHRlcnNEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoZmlsdGVyc0RhdGEubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGZpbHRlcnNEYXRhKS50b0VxdWFsKGZpbHRlcnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NhbmNlbFJlcXVlc3QoKScsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIHJlcXVlc3RJZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuY2FuY2VsUmVxdWVzdChudWxsLCAnY2FuY2VsIHRoaXMnKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHBvc3QgdGhlIGNhbmNlbCByZXF1ZXN0IHdpdGggY29tbWVudHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0SWQgPSAnMTEnLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6ICdDYW5jZWwgdGhpcyByZXF1ZXN0J1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChgJHt1cmx9LyR7cmVxdWVzdElkfS9jYW5jZWxgLCBpbnB1dCkucmVzcG9uZCgyMDAsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5jYW5jZWxSZXF1ZXN0KHJlcXVlc3RJZCwgaW5wdXQuY29tbWVudHMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlIGluc3RhbmNlb2YgUmVxdWVzdFJlc3VsdERUTykudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd1JvbGVEZXRhaWxzRGlhbG9nKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLCAkcTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9yb2xlRGV0YWlsRGlhbG9nU2VydmljZV8sIF8kcV8pID0+IHtcclxuICAgICAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgICAgICByb2xlRGV0YWlsRGlhbG9nU2VydmljZSA9IF9yb2xlRGV0YWlsRGlhbG9nU2VydmljZV87XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3Mgcm9sZURldGFpbHMgZGlhbG9nIGZvciByb2xlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihyb2xlRGV0YWlsRGlhbG9nU2VydmljZSwgJ3Nob3dEaWFsb2cnKTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ2dldFJvbGVEZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcclxuXHJcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2Uuc2hvd1JvbGVEZXRhaWxzRGlhbG9nKCdyZXF1ZXN0SWQnLCAnaXRlbUlkJyk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3Qocm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICAgICAgbGV0IHVybEZ1bmMgPSBhcmdzWzJdO1xyXG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5pc0Z1bmN0aW9uKHVybEZ1bmMpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dNYW5hZ2VkQXR0cmlidXRlRGV0YWlsc0RpYWxvZygpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSwgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VfLCBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcclxuICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VfO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIG1hbmFnZWQgYXR0cmlidXRlIGRldGFpbCBkaWFsb2cgZm9yIG1hbmFnZWRBdHRyaWJ1dGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYW5hZ2VkQXR0cmlidXRlRGV0YWlsID0geyBpZDogJzU1NTUnIH0sIHJlcXVlc3RJZCA9ICcxMjM0JywgaXRlbUlkID0gJzExMTEnLFxyXG4gICAgICAgICAgICAgICAgbWFuYWdlZEF0dHJVUkwgPSBgJHt1cmx9LyR7cmVxdWVzdElkfS9pdGVtcy8ke2l0ZW1JZH0vbWFuYWdlZEF0dHJpYnV0ZURldGFpbHNgO1xyXG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSwgJ3Nob3dEaWFsb2cnKTtcclxuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudERldGFpbHMnKS5hbmQuY2FsbEZha2UoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZURldGFpbCApO1xyXG5cclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5zaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbHNEaWFsb2cocmVxdWVzdElkLCBpdGVtSWQpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlscykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtYW5hZ2VkQXR0clVSTCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcclxuICAgICAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwsIG1hbmFnZWRBdHRyVVJMKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRJbnRlcmFjdGlvbnMoKScsICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGFwcHJvdmFsTGlzdFJlc3VsdCwgc3RhcnQsIGxpbWl0LCBwcm9taXNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzdGFydCA9IDEwO1xyXG4gICAgICAgICAgICBsaW1pdCA9IDEwO1xyXG4gICAgICAgICAgICBhcHByb3ZhbExpc3RSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFtpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0FQUFJPVkFMX1NVTU1BUllfMV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBpbnRlcmFjdGlvbnMgZnJvbSBSRVNUIHdpdGggbnVsbCBzb3J0JywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsICsgJy8xL2ludGVyYWN0aW9ucz9saW1pdD0xMCZzdGFydD0xMCcpXHJcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIGFwcHJvdmFsTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldEludGVyYWN0aW9ucygnMScsIHN0YXJ0LCBsaW1pdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdEFwcHJvdmFsU3VtbWFyeScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBhcHByb3ZhbCBoaXN0b3J5IGZyb20gUkVTVCB3aXRoIHNvcnQnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnLzEvaW50ZXJhY3Rpb25zP2xpbWl0PTEwJnNvcnQ9JTVCJTVEJnN0YXJ0PTEwJylcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgYXBwcm92YWxMaXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0SW50ZXJhY3Rpb25zKCcxJywgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCkpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdJZGVudGl0eVJlcXVlc3RBcHByb3ZhbFN1bW1hcnknKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0QXBwcm92YWxSZW1pbmRlckVtYWlsVGVtcGxhdGUoKScsICgpID0+IHtcclxuICAgICAgICBsZXQgdGVtcGxhdGVEYXRhID0ge1xyXG4gICAgICAgICAgICB0b0lkZW50aXR5OiB7XHJcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0dpbGxpZ2FuJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgRW1haWxUZW1wbGF0ZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9FbWFpbFRlbXBsYXRlXykgPT4ge1xyXG4gICAgICAgICAgICBFbWFpbFRlbXBsYXRlID0gX0VtYWlsVGVtcGxhdGVfO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIGJhZCBpbnB1dHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldEFwcHJvdmFsUmVtaW5kZXJFbWFpbFRlbXBsYXRlKHVuZGVmaW5lZCwgJ2FiY2QnKSkudG9UaHJvdygpO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRBcHByb3ZhbFJlbWluZGVyRW1haWxUZW1wbGF0ZSgnMTIzNCcsIHVuZGVmaW5lZCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gRW1haWxUZW1wbGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3RJZCA9ICdyZXF1ZXN0MScsXHJcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkID0gJ3dvcmtJdGVtMSc7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChgJHt1cmx9LyR7cmVxdWVzdElkfS9lbWFpbC8ke3dvcmtJdGVtSWR9L3JlbWluZGVyYClcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgdGVtcGxhdGVEYXRhKTtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRBcHByb3ZhbFJlbWluZGVyRW1haWxUZW1wbGF0ZShyZXF1ZXN0SWQsIHdvcmtJdGVtSWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigodGVtcGxhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QodGVtcGxhdGUpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHRlbXBsYXRlIGluc3RhbmNlb2YgRW1haWxUZW1wbGF0ZSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VuZEFwcHJvdmFsUmVtaW5kZXJFbWFpbFRlbXBsYXRlKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlRGF0YSA9IHtcclxuICAgICAgICAgICAgdG9JZGVudGl0eToge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdHaWxsaWdhbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBiYWQgaW5wdXRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gaWRlbnRpdHlSZXF1ZXN0U2VydmljZVxyXG4gICAgICAgICAgICAgICAgLnNlbmRBcHByb3ZhbFJlbWluZGVyRW1haWwodW5kZWZpbmVkLCAnYWJjZCcsIHRlbXBsYXRlRGF0YSkpLnRvVGhyb3coKTtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGlkZW50aXR5UmVxdWVzdFNlcnZpY2VcclxuICAgICAgICAgICAgICAgIC5zZW5kQXBwcm92YWxSZW1pbmRlckVtYWlsKCcxMjM0JywgdW5kZWZpbmVkLCB0ZW1wbGF0ZURhdGEpKS50b1Rocm93KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAuc2VuZEFwcHJvdmFsUmVtaW5kZXJFbWFpbCgnMTIzNCcsICdhYmNkJywgdW5kZWZpbmVkKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHJlc291cmNlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdElkID0gJ3JlcXVlc3QxJyxcclxuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWQgPSAnd29ya0l0ZW0xJyxcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsVGVtcGxhdGU6IHRlbXBsYXRlRGF0YVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChgJHt1cmx9LyR7cmVxdWVzdElkfS9lbWFpbC8ke3dvcmtJdGVtSWR9L3JlbWluZGVyL3NlbmRgLCBpbnB1dClcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLnNlbmRBcHByb3ZhbFJlbWluZGVyRW1haWwocmVxdWVzdElkLCB3b3JrSXRlbUlkLCB0ZW1wbGF0ZURhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLnN0YXR1cykudG9CZSgyMDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRGaWx0ZXJlZEl0ZW1zKCknLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zTGlzdFJlc3VsdCwgY29tcGlsYXRpb25TdGF0dXNGaWx0ZXIsIHN0YXJ0LCBsaW1pdCwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBsaW1pdCA9IDEwO1xyXG4gICAgICAgICAgICBjb21waWxhdGlvblN0YXR1c0ZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ0VxdWFscycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ0ZpbHRlcmVkJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zTGlzdFJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW2lkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfSVRFTV8xXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGZpbHRlcmVkIGl0ZW1zIGZyb20gUkVTVCB3aXRoIG51bGwgc29ydCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGAke3VybH0vMS9pdGVtcz9jb2xLZXk9Y29sdW1ucyZjb21waWxhdGlvblN0YXR1cz0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoXHJcbiAgICAgICAgICAgICAgICBjb21waWxhdGlvblN0YXR1c0ZpbHRlcil9JmxpbWl0PTEwJnN0YXJ0PTBgKS5yZXNwb25kKDIwMCwgZmlsdGVyZWRJdGVtc0xpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRGaWx0ZXJlZEl0ZW1zKCcxJywgc3RhcnQsIGxpbWl0LCBudWxsLCAnY29sdW1ucycpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdJZGVudGl0eVJlcXVlc3RJdGVtJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIGZpbHRlcmVkIGl0ZW1zIGZyb20gUkVTVCB3aXRoIHNvcnQnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChgJHt1cmx9LzEvaXRlbXM/Y29sS2V5PWNvbHVtbnMmY29tcGlsYXRpb25TdGF0dXM9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgY29tcGlsYXRpb25TdGF0dXNGaWx0ZXIpfSZsaW1pdD0xMCZzb3J0PSU1QiU1RCZzdGFydD0wYCkucmVzcG9uZCgyMDAsIGZpbHRlcmVkSXRlbXNMaXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0RmlsdGVyZWRJdGVtcygnMScsIHN0YXJ0LCBsaW1pdCwgbmV3IFNvcnRPcmRlcigpLCAnY29sdW1ucycpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdJZGVudGl0eVJlcXVlc3RJdGVtJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFVuRmlsdGVyZWRJdGVtcygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgdW5GaWx0ZXJlZEl0ZW1zTGlzdFJlc3VsdCwgY29tcGlsYXRpb25TdGF0dXNGaWx0ZXIsIHN0YXJ0LCBsaW1pdCwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICBsaW1pdCA9IDEwO1xyXG4gICAgICAgICAgICBjb21waWxhdGlvblN0YXR1c0ZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ05vdEVxdWFscycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWydGaWx0ZXJlZCcsICdFeHBhbnNpb24nXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB1bkZpbHRlcmVkSXRlbXNMaXN0UmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9JVEVNXzJdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgdW5maWx0ZXJlZCBpdGVtcyBmcm9tIFJFU1Qgd2l0aCBudWxsIHNvcnQnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChgJHt1cmx9LzIvaXRlbXM/Y29sS2V5PWNvbHVtbnMmY29tcGlsYXRpb25TdGF0dXM9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgY29tcGlsYXRpb25TdGF0dXNGaWx0ZXIpfSZsaW1pdD0xMCZzdGFydD0wYCkucmVzcG9uZCgyMDAsIHVuRmlsdGVyZWRJdGVtc0xpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRVbkZpbHRlcmVkSXRlbXMoJzInLCBzdGFydCwgbGltaXQsIG51bGwsICdjb2x1bW5zJyk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdEl0ZW0nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgdW5maWx0ZXJlZCBpdGVtcyBmcm9tIFJFU1Qgd2l0aCBzb3J0JywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7dXJsfS8yL2l0ZW1zP2NvbEtleT1jb2x1bW5zJmNvbXBpbGF0aW9uU3RhdHVzPSR7dGVzdFNlcnZpY2UuZ2V0UXVlcnlQYXJhbVN0cmluZyhcclxuICAgICAgICAgICAgICAgIGNvbXBpbGF0aW9uU3RhdHVzRmlsdGVyKX0mbGltaXQ9MTAmc29ydD0lNUIlNUQmc3RhcnQ9MGApLnJlc3BvbmQoMjAwLCB1bkZpbHRlcmVkSXRlbXNMaXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0VW5GaWx0ZXJlZEl0ZW1zKCcyJywgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCksICdjb2x1bW5zJyk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdEl0ZW0nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0SWRlbnRpdHlSZXF1ZXN0KCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlkZW50aXR5UmVxdWVzdE9iamVjdFJlc3VsdCwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0T2JqZWN0UmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0OiBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBpZGVudGl0eVJlcXVlc3QgZnJvbSBSRVNUJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybCArICcvMScpLnJlc3BvbmQoMjAwLCBpZGVudGl0eVJlcXVlc3RPYmplY3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRJZGVudGl0eVJlcXVlc3QoMSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UgaW5zdGFuY2VvZiBJZGVudGl0eVJlcXVlc3QpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIHJlcXVlc3RJZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldElkZW50aXR5UmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0TWVzc2FnZXMoKScsICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzTGlzdFJlc3VsdCwgc3RhcnQsIGxpbWl0LCBwcm9taXNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzdGFydCA9IDA7XHJcbiAgICAgICAgICAgIGxpbWl0ID0gNTtcclxuICAgICAgICAgICAgbWVzc2FnZXNMaXN0UmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbe3R5cGU6ICdJbmZvJywgbWVzc2FnZU9yS2V5OiAnaW5mb3JtYXRpb25hbCBtZXNzYWdlJ31dXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgbWVzc2FnZXMgZnJvbSBSRVNUIHdpdGggbnVsbCBzb3J0JywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsICsgJy8xL21lc3NhZ2VzP2xpbWl0PTUmc3RhcnQ9MCcpXHJcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIG1lc3NhZ2VzTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldE1lc3NhZ2VzKCcxJywgc3RhcnQsIGxpbWl0LCBudWxsKTtcclxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgcmVzcG9uc2Ugd2FzIHRyYW5zZm9ybWVkIGNvcnJlY3RseS5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0xpc3RSZXN1bHREVE8nKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uY29uc3RydWN0b3IubmFtZSkudG9CZSgnU3BNZXNzYWdlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIG1lc3NhZ2VzIGZyb20gUkVTVCB3aXRoIHNvcnQnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnLzEvbWVzc2FnZXM/bGltaXQ9NSZzb3J0PSU1QiU1RCZzdGFydD0wJylcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgbWVzc2FnZXNMaXN0UmVzdWx0KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0TWVzc2FnZXMoJzEnLCBzdGFydCwgbGltaXQsIG5ldyBTb3J0T3JkZXIoKSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ1NwTWVzc2FnZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRQcm92aXNpb25pbmdJdGVtcygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgcHJvdmlzaW9uaW5nSXRlbXNMaXN0UmVzdWx0LCBzdGFydCwgbGltaXQsIHByb21pc2UsIGdyb3VwQnk7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgbGltaXQgPSAxMDtcclxuICAgICAgICAgICAgZ3JvdXBCeSA9ICdwcm92aXNpb25pbmdFbmdpbmUnO1xyXG4gICAgICAgICAgICBwcm92aXNpb25pbmdJdGVtc0xpc3RSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFtpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0lURU1fMl1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBwcm92aXNpb25pbmcgaXRlbXMgZnJvbSBSRVNUIHdpdGggbnVsbCBzb3J0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRVUkwgPSBgJHt1cmx9LzIvY2hhbmdlSXRlbXM/Z3JvdXBCeT0ke2dyb3VwQnl9JmxpbWl0PTEwJnN0YXJ0PTBgO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoZXhwZWN0ZWRVUkwpLnJlc3BvbmQoMjAwLCBwcm92aXNpb25pbmdJdGVtc0xpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRQcm92aXNpb25pbmdJdGVtcygnMicsIHN0YXJ0LCBsaW1pdCwgbnVsbCwgZ3JvdXBCeSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ0lkZW50aXR5UmVxdWVzdEl0ZW0nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0cmlldmUgcHJvdmlzaW9uaW5nIGl0ZW1zIGZyb20gUkVTVCB3aXRoIHNvcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBleHBlY3RlZFVSTCA9IGAke3VybH0vMi9jaGFuZ2VJdGVtcz9ncm91cEJ5PSR7Z3JvdXBCeX0mbGltaXQ9MTAmc29ydD0lNUIlNUQmc3RhcnQ9MGA7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChleHBlY3RlZFVSTCkucmVzcG9uZCgyMDAsIHByb3Zpc2lvbmluZ0l0ZW1zTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldFByb3Zpc2lvbmluZ0l0ZW1zKCcyJywgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCksIGdyb3VwQnkpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdJZGVudGl0eVJlcXVlc3RJdGVtJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
