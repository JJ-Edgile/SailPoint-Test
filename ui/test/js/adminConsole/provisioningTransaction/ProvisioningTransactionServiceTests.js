System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule', './ProvisioningTransactionTestData', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var provTransModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModule) {
            provTransModule = _adminConsoleProvisioningTransactionProvisioningTransactionModule['default'];
        }, function (_ProvisioningTransactionTestData) {}, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            /**
             * Tests for the ProvisioningTransactionService.
             */
            describe('ProvisioningTransactionService', function () {
                var baseURLProvisioningTransactions = '/identityiq/rest/provisioningTransactions';
                var baseURLReport = '/identityiq/rest/report';
                var COLUMNS_LIST = 'created,name,operation,source,applicationName,identityName,nativeIdentity,' + 'accountDisplayName,integration,type,status';
                var ProvisioningTransaction = undefined,
                    provisioningTransactionService = undefined,
                    provisioningTransactionTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                // Use the provisioning transaction module.
                beforeEach(module(provTransModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_NAME', 'spadmin');
                }));

                beforeEach(inject(function (_ProvisioningTransaction_, _provisioningTransactionService_, _provisioningTransactionTestData_, _$httpBackend_, _SortOrder_) {
                    ProvisioningTransaction = _ProvisioningTransaction_;
                    provisioningTransactionService = _provisioningTransactionService_;
                    provisioningTransactionTestData = _provisioningTransactionTestData_;
                    $httpBackend = _$httpBackend_;
                    SortOrder = _SortOrder_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                /**
                 * Verify that the given result promise contains the expected data.
                 * You must call $httpBackend.flush() after this to get the promise to
                 * be resolved.
                 *
                 * @param {Number} expectedCount  The expected number of identities in
                 *   the response.  If not specified, default to 4.
                 */
                function verifyResult(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 4;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (response) {
                        expect(response).not.toBe(null);
                        expect(response.data).not.toBe(null);
                        expect(response.data.objects).not.toBe(null);
                        var objects = response.data.objects;
                        expect(response.data.count).toEqual(expectedCount);
                        expect(objects.length).toEqual(expectedCount);
                        objects.forEach(function (obj) {
                            expect(obj instanceof ProvisioningTransaction).toBeTruthy();
                        });
                    });
                }

                describe('get transactions', function () {
                    var response = undefined,
                        pto1 = undefined,
                        pto2 = undefined,
                        pto3 = undefined,
                        pto4 = undefined,
                        statusCounts = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        pto1 = provisioningTransactionTestData.PTO1;
                        pto2 = provisioningTransactionTestData.PTO2;
                        pto3 = provisioningTransactionTestData.PTO3;
                        pto4 = provisioningTransactionTestData.PTO4;
                        statusCounts = provisioningTransactionTestData.STATUSCOUNTS;
                        response = {
                            count: 4,
                            objects: [pto1, pto2, pto3, pto4]
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions).respond(200, response);
                        promise = provisioningTransactionService.getTransactions(null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination options', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?limit=1&start=2').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(null, 2, 1);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with sorting info', function () {
                        var sort = new SortOrder();
                        sort.addSort('identityName', true);

                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?limit=10&sort=%5B%7B%22property%22:%22identityName%22,%22direction%22:%22ASC%22%7D%5D&start=10').respond(200, response);

                        promise = provisioningTransactionService.getTransactions(null, 10, 10, sort);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with status param', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?status=Success').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(null, null, null, null, 'Success');
                        verifyResult(promise, 4);
                        $httpBackend.flush();
                    });

                    it('accepts a request with query param', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?query=foo').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(null, null, null, null, null, 'foo');
                        verifyResult(promise, 4);
                        $httpBackend.flush();
                    });

                    it('accepts a request with operation filter', function () {
                        var filters = {
                            operation: {
                                value: 'Create'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?operation=Create').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter', function () {
                        var filters = {
                            type: {
                                value: 'Auto'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?type=Auto').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with applicationName filter', function () {
                        var filters = {
                            applicationName: {
                                value: 'testApp'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?applicationName=testApp').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with identityName filter', function () {
                        var filters = {
                            identityName: {
                                value: 'spadmin'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?identityName=spadmin').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with accountDisplayName filter', function () {
                        var filters = {
                            accountDisplayName: {
                                value: 'Administrator'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?accountDisplayName=Administrator').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with source filter', function () {
                        var filters = {
                            source: {
                                value: 'Batch'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?source=Batch').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('can return an empty result', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions).respond(200, {
                            count: 0,
                            objects: []
                        });
                        promise = provisioningTransactionService.getTransactions(null, null, null);
                        verifyResult(promise, 0);
                        $httpBackend.flush();
                    });

                    it('accepts a request with date filter', function () {
                        var filters = {
                            startDateRange: {
                                value: '1500000000000'
                            },
                            endDateRange: {
                                value: '1500000000100'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?endDateRange=1500000000100&startDateRange=1500000000000').respond(200, response);
                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('correctly handles mult-valued object filters', function () {
                        var filters = {
                            applicationName: {
                                value: [{
                                    id: 'foo',
                                    displayName: 'Foo'
                                }, {
                                    id: 'bar',
                                    displayName: 'Bar'
                                }]
                            }
                        };

                        $httpBackend.expectGET(baseURLProvisioningTransactions + '?applicationName=foo&applicationName=bar').respond(200, response);

                        promise = provisioningTransactionService.getTransactions(filters, null, null);
                        verifyResult(promise);

                        $httpBackend.flush();
                    });
                });

                describe('get transaction details', function () {
                    var pto1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        pto1 = provisioningTransactionTestData.PTO1;
                    });

                    it('accepts a PTO detailed request', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/1').respond(200, pto1);
                        promise = provisioningTransactionService.getTransactionDetails(1);
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                            expect(response['id']).toEqual('1');
                            expect(response['name']).toEqual('1');
                            expect(response['integration']).toEqual('IdentityIQ');
                            expect(response['operation']).toEqual('Create');
                            expect(response['source']).toEqual('LCM');
                            expect(response['status']).toEqual('Success');
                            expect(response['source']).toEqual('LCM');
                            expect(response['identityName']).toEqual('spadmin');
                            expect(response['applicationName']).toEqual('testApp');
                            expect(response['nativeIdentity']).toEqual('spadmin');
                            expect(response['accountDisplayName']).toEqual('Administrator');
                            expect(response['type']).toEqual('Auto');
                        });
                        $httpBackend.flush();
                    });

                    it('reject if PTO does not exist', function () {
                        var promiseRejected = false;
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/doesnotexist').respond(200, undefined);
                        provisioningTransactionService.getTransactionDetails('doesnotexist')['catch'](function () {
                            return promiseRejected = true;
                        });
                        $httpBackend.flush();
                        expect(promiseRejected).toBeTruthy();
                    });
                });

                describe('get status counts', function () {
                    var statusCounts = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        statusCounts = provisioningTransactionTestData.STATUSCOUNTS;
                    });

                    it('accepts a status count request', function () {
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/statusCounts').respond(200, statusCounts);
                        promise = provisioningTransactionService.getStatusCounts();
                        promise.then(function (response) {
                            var map = response;
                            expect(map).not.toBe(null);
                            expect(map['Total']).toEqual(4);
                            expect(map['Success']).toEqual(4);
                            expect(map['Failed']).toEqual(0);
                            expect(map['Pending']).toEqual(0);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('post retry', function () {
                    var promise = undefined,
                        id = 'testId';

                    it('accepts a pto id', function () {
                        $httpBackend.expectPOST(baseURLProvisioningTransactions + '/' + id + '/retry').respond(200);
                        promise = provisioningTransactionService.retry(id);
                        promise.then(function (response) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });

                    it('responds to error', function () {
                        $httpBackend.expectPOST(baseURLProvisioningTransactions + '/' + id + '/retry').respond(500);
                        promise = provisioningTransactionService.retry(id);
                        promise.then(function (response) {
                            //just make sure this resolves to error
                            expect(false).toBeTruthy();
                        }, function (response) {
                            //just make sure this resolves to error
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('post override', function () {
                    var promise = undefined,
                        id = 'testId',
                        ownerId = 'self',
                        data = {
                        ownerId: ownerId,
                        handledErrors: [500]
                    };

                    it('accepts a pto id', function () {
                        $httpBackend.expectPOST(baseURLProvisioningTransactions + '/' + id + '/force', data).respond(200);
                        promise = provisioningTransactionService.override(id, ownerId);
                        promise.then(function (response) {
                            //just make sure this resolves
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });

                    it('responds to error', function () {
                        $httpBackend.expectPOST(baseURLProvisioningTransactions + '/' + id + '/force', data).respond(500);
                        promise = provisioningTransactionService.override(id, ownerId);
                        promise.then(function (response) {
                            //just make sure this resolves to error
                            expect(false).toBeTruthy();
                        }, function (response) {
                            //just make sure this resolves to error
                            expect(true).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('showOverrideDialog', function () {
                    var modalInstance = undefined,
                        mockModal = undefined;
                    beforeEach(inject(function (spModal) {
                        mockModal = spModal;
                        spyOn(mockModal, 'open');
                    }));

                    it('calls spModal', function () {
                        modalInstance = provisioningTransactionService.showOverrideDialog();
                        expect(mockModal.open).toHaveBeenCalled();
                    });
                });

                describe('get run report', function () {
                    var taskResultId = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        taskResultId = provisioningTransactionTestData.TESTTASKRESULTID;
                    });

                    it('accepts a run report request', function () {
                        var filters = {
                            columns: COLUMNS_LIST
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST).respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with columns filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST).respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with date range filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            startDateRange: {
                                value: '1500000000000'
                            },
                            endDateRange: {
                                value: '1500000000100'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&endDateRange=1500000000100&startDateRange=1500000000000').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with operation filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            operation: {
                                value: 'Modify'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&operation=Modify').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with source filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            source: {
                                value: 'LCM'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&source=LCM').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with type filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            type: {
                                value: 'Auto'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&type=Auto').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with status param', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&status=Success').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null, 'Success');
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with accountDisplayName filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            accountDisplayName: {
                                value: 'Administrator'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?accountDisplayName=Administrator' + '&columns=' + COLUMNS_LIST).respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with identityName filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            identityName: {
                                value: 'spadmin'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&identityName=spadmin').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with applicationName filter', function () {
                        var filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            applicationName: {
                                value: 'TestApp'
                            }
                        };
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?applicationName=TestApp' + '&columns=' + COLUMNS_LIST).respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, null);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });

                    it('accepts a run report request with filter and sort', function () {
                        var sort = new SortOrder(),
                            filters = {
                            columns: {
                                value: COLUMNS_LIST
                            },
                            source: {
                                value: 'LCM'
                            }
                        };
                        sort.addSort('applicationName', true);
                        $httpBackend.expectGET(baseURLProvisioningTransactions + '/runReport' + '?columns=' + COLUMNS_LIST + '&sort=%5B%7B%22property%22:%22applicationName%22,%22direction%22:%22ASC%22%7D%5D&source=LCM').respond(200, taskResultId);
                        promise = provisioningTransactionService.runReport(filters, sort);
                        promise.then(function (response) {
                            expect(response).toBe(taskResultId);
                        });
                        $httpBackend.flush();
                    });
                });

                describe('post add email notification', function () {
                    var taskResultId = undefined;

                    beforeEach(function () {
                        taskResultId = provisioningTransactionTestData.TESTTASKRESULTID;
                    });

                    it('posts to the report notification endpoint ', function () {
                        var id = '123';
                        $httpBackend.expectPOST(baseURLReport + '/' + id + '/notification').respond(200, '');
                        provisioningTransactionService.addEmailNotification(id);

                        $httpBackend.flush();
                    });
                });

                describe('openDetailsDialog', function () {
                    var spModal = undefined;

                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                    }));

                    it('should call the modal service', function () {
                        var transaction = new ProvisioningTransaction({ id: '1' });

                        spyOn(spModal, 'open');

                        provisioningTransactionService.openDetailsDialog(transaction);

                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('getDetailsDialogTitle', function () {
                    var messages = {
                        'ui_prov_trans_details_title': 'Transaction Details',
                        'ui_prov_trans_details_title_identity': 'Transaction Details: {0}'
                    };

                    beforeEach(inject(function (spTranslateFilter) {
                        spTranslateFilter.configureCatalog(messages);
                    }));

                    it('should return correct title when identity exists', function () {
                        var title = undefined,
                            transaction = new ProvisioningTransaction({
                            id: '1',
                            identityDisplayName: 'Bob'
                        });

                        title = provisioningTransactionService.getDetailsDialogTitle(transaction);

                        expect(title).toEqual('Transaction Details: Bob');
                    });

                    it('should return correct title when no identity exists', function () {
                        var title = undefined,
                            transaction = new ProvisioningTransaction({
                            id: '1'
                        });

                        title = provisioningTransactionService.getDetailsDialogTitle(transaction);

                        expect(title).toEqual('Transaction Details');
                    });
                });

                describe('reloadData', function () {
                    var reload = jasmine.createSpy();
                    beforeEach(function () {
                        provisioningTransactionService.initReload(reload);
                    });

                    it('should return correct title when identity exists', function () {
                        provisioningTransactionService.reloadData();
                        expect(reload).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0VBQXNFLHFDQUFxQyw0Q0FBNEMsVUFBVSxTQUFTOzs7OztJQUtsTjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUVBQW1FO1lBQ3pILGtCQUFrQixrRUFBa0U7V0FDckYsVUFBVSxrQ0FBa0MsSUFBSSxVQUFVLHNDQUFzQztRQUNuRyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsa0NBQWtDLFlBQVc7Z0JBQ2xELElBQU0sa0NBQWtDO2dCQUN4QyxJQUFNLGdCQUFnQjtnQkFDdEIsSUFBTSxlQUFlLCtFQUNqQjtnQkFDSixJQUFJLDBCQUF1QjtvQkFBRSxpQ0FBOEI7b0JBQUUsa0NBQStCO29CQUFFLGVBQVk7b0JBQ3RHLFlBQVM7OztnQkFHYixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1CO29CQUNyQyxTQUFTLFNBQVMscUJBQXFCOzs7Z0JBRzNDLFdBQVcsT0FBTyxVQUFTLDJCQUEyQixrQ0FDOUMsbUNBQW1DLGdCQUFnQixhQUFhO29CQUNwRSwwQkFBMEI7b0JBQzFCLGlDQUFpQztvQkFDakMsa0NBQWtDO29CQUNsQyxlQUFlO29CQUNmLFlBQVk7OztnQkFHaEIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7Ozs7Ozs7Ozs7O2dCQVdqQixTQUFTLGFBQWEsU0FBUyxlQUFlO29CQUMxQyxJQUFJLFFBQVEsWUFBWSxnQkFBZ0I7d0JBQ3BDLGdCQUFnQjs7b0JBRXBCLE9BQU8sU0FBUztvQkFDaEIsUUFBUSxLQUFLLFVBQVMsVUFBVTt3QkFDNUIsT0FBTyxVQUFVLElBQUksS0FBSzt3QkFD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c0I7d0JBQ3JDLGtCQUFrQixpQkFBaUI7OztvQkFHdkMsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsSUFBSSxRQUFLOzRCQUFFLGNBQWMsSUFBSSx3QkFBd0I7NEJBQ2pELElBQUk7NEJBQ0oscUJBQXFCOzs7d0JBR3pCLFFBQVEsK0JBQStCLHNCQUFzQjs7d0JBRTdELE9BQU8sT0FBTyxRQUFROzs7b0JBRzFCLEdBQUcsdURBQXVELFlBQU07d0JBQzVELElBQUksUUFBSzs0QkFBRSxjQUFjLElBQUksd0JBQXdCOzRCQUNqRCxJQUFJOzs7d0JBR1IsUUFBUSwrQkFBK0Isc0JBQXNCOzt3QkFFN0QsT0FBTyxPQUFPLFFBQVE7Ozs7Z0JBSzlCLFNBQVMsY0FBYyxZQUFNO29CQUN6QixJQUFJLFNBQVMsUUFBUTtvQkFDckIsV0FBVyxZQUFNO3dCQUNiLCtCQUErQixXQUFXOzs7b0JBRzlDLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELCtCQUErQjt3QkFDL0IsT0FBTyxRQUFROzs7Ozs7R0FwQ3hCIiwiZmlsZSI6ImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwcm92VHJhbnNNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uL1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlJztcbmltcG9ydCAnLi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgPSAnL2lkZW50aXR5aXEvcmVzdC9wcm92aXNpb25pbmdUcmFuc2FjdGlvbnMnO1xuICAgIGNvbnN0IGJhc2VVUkxSZXBvcnQgPSAnL2lkZW50aXR5aXEvcmVzdC9yZXBvcnQnO1xuICAgIGNvbnN0IENPTFVNTlNfTElTVCA9ICdjcmVhdGVkLG5hbWUsb3BlcmF0aW9uLHNvdXJjZSxhcHBsaWNhdGlvbk5hbWUsaWRlbnRpdHlOYW1lLG5hdGl2ZUlkZW50aXR5LCcgK1xuICAgICAgICAnYWNjb3VudERpc3BsYXlOYW1lLGludGVncmF0aW9uLHR5cGUsc3RhdHVzJztcbiAgICBsZXQgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24sIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSwgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YSwgJGh0dHBCYWNrZW5kLFxuICAgICAgICBTb3J0T3JkZXI7XG5cbiAgICAvLyBVc2UgdGhlIHByb3Zpc2lvbmluZyB0cmFuc2FjdGlvbiBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocHJvdlRyYW5zTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfTkFNRScsICdzcGFkbWluJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uXywgX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZV8sXG4gICAgICAgICAgICBfcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YV8sIF8kaHR0cEJhY2tlbmRfLCBfU29ydE9yZGVyXykge1xuICAgICAgICBQcm92aXNpb25pbmdUcmFuc2FjdGlvbiA9IF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl87XG4gICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSA9IF9wcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2VfO1xuICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhID0gX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGFfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVmVyaWZ5IHRoYXQgdGhlIGdpdmVuIHJlc3VsdCBwcm9taXNlIGNvbnRhaW5zIHRoZSBleHBlY3RlZCBkYXRhLlxuICAgICAqIFlvdSBtdXN0IGNhbGwgJGh0dHBCYWNrZW5kLmZsdXNoKCkgYWZ0ZXIgdGhpcyB0byBnZXQgdGhlIHByb21pc2UgdG9cbiAgICAgKiBiZSByZXNvbHZlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZENvdW50ICBUaGUgZXhwZWN0ZWQgbnVtYmVyIG9mIGlkZW50aXRpZXMgaW5cbiAgICAgKiAgIHRoZSByZXNwb25zZS4gIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHQgdG8gNC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgZXhwZWN0ZWRDb3VudCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChleHBlY3RlZENvdW50KSkge1xuICAgICAgICAgICAgZXhwZWN0ZWRDb3VudCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0cykubm90LnRvQmUobnVsbCk7XG4gICAgICAgICAgICBsZXQgb2JqZWN0cyA9IHJlc3BvbnNlLmRhdGEub2JqZWN0cztcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvdW50KS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdHMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xuICAgICAgICAgICAgb2JqZWN0cy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9iaiBpbnN0YW5jZW9mIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2dldCB0cmFuc2FjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlLCBwdG8xLCBwdG8yLCBwdG8zLCBwdG80LCBzdGF0dXNDb3VudHMsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHB0bzEgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLlBUTzE7XG4gICAgICAgICAgICBwdG8yID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YS5QVE8yO1xuICAgICAgICAgICAgcHRvMyA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEuUFRPMztcbiAgICAgICAgICAgIHB0bzQgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLlBUTzQ7XG4gICAgICAgICAgICBzdGF0dXNDb3VudHMgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLlNUQVRVU0NPVU5UUztcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGNvdW50OiA0LFxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgcHRvMSwgcHRvMiwgcHRvMywgcHRvNCBdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHBhZ2luYXRpb24gb3B0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJz9saW1pdD0xJnN0YXJ0PTInKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRUcmFuc2FjdGlvbnMobnVsbCwgMiwgMSk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggc29ydGluZyBpbmZvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcbiAgICAgICAgICAgIHNvcnQuYWRkU29ydCgnaWRlbnRpdHlOYW1lJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoXG4gICAgICAgICAgICAgICAgYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArXG4gICAgICAgICAgICAgICAgJz9saW1pdD0xMCZzb3J0PSU1QiU3QiUyMnByb3BlcnR5JTIyOiUyMmlkZW50aXR5TmFtZSUyMiwlMjJkaXJlY3Rpb24lMjI6JTIyQVNDJTIyJTdEJTVEJnN0YXJ0PTEwJ1xuICAgICAgICAgICAgKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhudWxsLCAxMCwgMTAsIHNvcnQpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHN0YXR1cyBwYXJhbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJz9zdGF0dXM9U3VjY2VzcycpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhudWxsLCBudWxsLCBudWxsLCBudWxsLCAnU3VjY2VzcycpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UsIDQpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHF1ZXJ5IHBhcmFtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnP3F1ZXJ5PWZvbycpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCAnZm9vJyk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgNCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBvcGVyYXRpb24gZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDcmVhdGUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICc/b3BlcmF0aW9uPUNyZWF0ZScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCB0eXBlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0F1dG8nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICc/dHlwZT1BdXRvJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGFwcGxpY2F0aW9uTmFtZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3Rlc3RBcHAnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICc/YXBwbGljYXRpb25OYW1lPXRlc3RBcHAnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRUcmFuc2FjdGlvbnMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggaWRlbnRpdHlOYW1lIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpdHlOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnc3BhZG1pbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJz9pZGVudGl0eU5hbWU9c3BhZG1pbicpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBhY2NvdW50RGlzcGxheU5hbWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50RGlzcGxheU5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBZG1pbmlzdHJhdG9yJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnP2FjY291bnREaXNwbGF5TmFtZT1BZG1pbmlzdHJhdG9yJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHNvdXJjZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIHNvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0JhdGNoJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnP3NvdXJjZT1CYXRjaCcpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FuIHJldHVybiBhbiBlbXB0eSByZXN1bHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHtcbiAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UsIDApO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGRhdGUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVSYW5nZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzE1MDAwMDAwMDAwMDAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmREYXRlUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxNTAwMDAwMDAwMTAwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgK1xuICAgICAgICAgICAgICAgICc/ZW5kRGF0ZVJhbmdlPTE1MDAwMDAwMDAxMDAmc3RhcnREYXRlUmFuZ2U9MTUwMDAwMDAwMDAwMCcpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY29ycmVjdGx5IGhhbmRsZXMgbXVsdC12YWx1ZWQgb2JqZWN0IGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZm9vJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRm9vJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2JhcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0JhcidcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnP2FwcGxpY2F0aW9uTmFtZT1mb28mYXBwbGljYXRpb25OYW1lPWJhcicpXG4gICAgICAgICAgICAgICAgLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgdHJhbnNhY3Rpb24gZGV0YWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHRvMSwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcHRvMSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEuUFRPMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBQVE8gZGV0YWlsZWQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJy8xJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHB0bzEpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRUcmFuc2FjdGlvbkRldGFpbHMoMSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydpZCddKS50b0VxdWFsKCcxJyk7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnbmFtZSddKS50b0VxdWFsKCcxJyk7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnaW50ZWdyYXRpb24nXSkudG9FcXVhbCgnSWRlbnRpdHlJUScpO1xuICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ29wZXJhdGlvbiddKS50b0VxdWFsKCdDcmVhdGUnKTtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydzb3VyY2UnXSkudG9FcXVhbCgnTENNJyk7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnc3RhdHVzJ10pLnRvRXF1YWwoJ1N1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydzb3VyY2UnXSkudG9FcXVhbCgnTENNJyk7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnaWRlbnRpdHlOYW1lJ10pLnRvRXF1YWwoJ3NwYWRtaW4nKTtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydhcHBsaWNhdGlvbk5hbWUnXSkudG9FcXVhbCgndGVzdEFwcCcpO1xuICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ25hdGl2ZUlkZW50aXR5J10pLnRvRXF1YWwoJ3NwYWRtaW4nKTtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydhY2NvdW50RGlzcGxheU5hbWUnXSkudG9FcXVhbCgnQWRtaW5pc3RyYXRvcicpO1xuICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3R5cGUnXSkudG9FcXVhbCgnQXV0bycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlamVjdCBpZiBQVE8gZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlUmVqZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvZG9lc25vdGV4aXN0JykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25EZXRhaWxzKCdkb2Vzbm90ZXhpc3QnKS5jYXRjaChcbiAgICAgICAgICAgICAgICAoKSA9PiBwcm9taXNlUmVqZWN0ZWQgPSB0cnVlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZWplY3RlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgc3RhdHVzIGNvdW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc3RhdHVzQ291bnRzLCBwcm9taXNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGF0dXNDb3VudHMgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLlNUQVRVU0NPVU5UUztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBzdGF0dXMgY291bnQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJy9zdGF0dXNDb3VudHMnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgc3RhdHVzQ291bnRzKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0U3RhdHVzQ291bnRzKCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgbGV0IG1hcCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICBleHBlY3QobWFwKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgZXhwZWN0KG1hcFsnVG90YWwnXSkudG9FcXVhbCg0KTtcbiAgICAgICAgICAgICAgZXhwZWN0KG1hcFsnU3VjY2VzcyddKS50b0VxdWFsKDQpO1xuICAgICAgICAgICAgICBleHBlY3QobWFwWydGYWlsZWQnXSkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgICAgZXhwZWN0KG1hcFsnUGVuZGluZyddKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwb3N0IHJldHJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwcm9taXNlLCBpZCA9ICd0ZXN0SWQnO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcHRvIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJy8nICsgaWQgKyAnL3JldHJ5JykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDApO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5yZXRyeShpZCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgLy9qdXN0IG1ha2Ugc3VyZSB0aGlzIHJlc29sdmVzXG4gICAgICAgICAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVzcG9uZHMgdG8gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnLycgKyBpZCArICcvcmV0cnknKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDUwMCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLnJldHJ5KGlkKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAvL2p1c3QgbWFrZSBzdXJlIHRoaXMgcmVzb2x2ZXMgdG8gZXJyb3JcbiAgICAgICAgICAgICAgZXhwZWN0KGZhbHNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vanVzdCBtYWtlIHN1cmUgdGhpcyByZXNvbHZlcyB0byBlcnJvclxuICAgICAgICAgICAgICAgIGV4cGVjdCh0cnVlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncG9zdCBvdmVycmlkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcHJvbWlzZSwgaWQgPSAndGVzdElkJywgb3duZXJJZCA9ICdzZWxmJyxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBvd25lcklkOiBvd25lcklkLFxuICAgICAgICAgICAgICAgIGhhbmRsZWRFcnJvcnM6IFs1MDBdXG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBwdG8gaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnLycgKyBpZCArICcvZm9yY2UnLCBkYXRhKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLm92ZXJyaWRlKGlkLCBvd25lcklkKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAvL2p1c3QgbWFrZSBzdXJlIHRoaXMgcmVzb2x2ZXNcbiAgICAgICAgICAgICAgZXhwZWN0KHRydWUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXNwb25kcyB0byBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvJyArIGlkICsgJy9mb3JjZScsIGRhdGEpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoNTAwKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2Uub3ZlcnJpZGUoaWQsIG93bmVySWQpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIC8vanVzdCBtYWtlIHN1cmUgdGhpcyByZXNvbHZlcyB0byBlcnJvclxuICAgICAgICAgICAgICBleHBlY3QoZmFsc2UpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy9qdXN0IG1ha2Ugc3VyZSB0aGlzIHJlc29sdmVzIHRvIGVycm9yXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRydWUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd092ZXJyaWRlRGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBtb2RhbEluc3RhbmNlLCBtb2NrTW9kYWw7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKHNwTW9kYWwpIHtcbiAgICAgICAgICAgIG1vY2tNb2RhbCA9IHNwTW9kYWw7XG4gICAgICAgICAgICBzcHlPbihtb2NrTW9kYWwsICdvcGVuJyk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnY2FsbHMgc3BNb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5zaG93T3ZlcnJpZGVEaWFsb2coKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBydW4gcmVwb3J0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0YXNrUmVzdWx0SWQsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRhc2tSZXN1bHRJZCA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEuVEVTVFRBU0tSRVNVTFRJRDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBydW4gcmVwb3J0IHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IENPTFVNTlNfTElTVFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvcnVuUmVwb3J0JyArXG4gICAgICAgICAgICAgICAgICAgICc/Y29sdW1ucz0nICsgQ09MVU1OU19MSVNUKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgdGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucnVuUmVwb3J0KGZpbHRlcnMsIG51bGwpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZSh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBydW4gcmVwb3J0IHJlcXVlc3Qgd2l0aCBjb2x1bW5zIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgY29sdW1uczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQ09MVU1OU19MSVNUXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvcnVuUmVwb3J0JyArXG4gICAgICAgICAgICAgICAgICAgICc/Y29sdW1ucz0nICsgQ09MVU1OU19MSVNUKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgdGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucnVuUmVwb3J0KGZpbHRlcnMsIG51bGwpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZSh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBydW4gcmVwb3J0IHJlcXVlc3Qgd2l0aCBkYXRlIHJhbmdlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgY29sdW1uczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQ09MVU1OU19MSVNUXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdGFydERhdGVSYW5nZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzE1MDAwMDAwMDAwMDAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmREYXRlUmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxNTAwMDAwMDAwMTAwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnL3J1blJlcG9ydCcgK1xuICAgICAgICAgICAgICAgICAgICAnP2NvbHVtbnM9JyArIENPTFVNTlNfTElTVCArXG4gICAgICAgICAgICAgICAgICAgICcmZW5kRGF0ZVJhbmdlPTE1MDAwMDAwMDAxMDAmc3RhcnREYXRlUmFuZ2U9MTUwMDAwMDAwMDAwMCcpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5ydW5SZXBvcnQoZmlsdGVycywgbnVsbCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlKHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJ1biByZXBvcnQgcmVxdWVzdCB3aXRoIG9wZXJhdGlvbiBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IENPTFVNTlNfTElTVFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTW9kaWZ5J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnL3J1blJlcG9ydCcgK1xuICAgICAgICAgICAgICAgICAgICAnP2NvbHVtbnM9JyArIENPTFVNTlNfTElTVCArXG4gICAgICAgICAgICAgICAgICAgICcmb3BlcmF0aW9uPU1vZGlmeScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5ydW5SZXBvcnQoZmlsdGVycywgbnVsbCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlKHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJ1biByZXBvcnQgcmVxdWVzdCB3aXRoIHNvdXJjZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IENPTFVNTlNfTElTVFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTENNJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnL3J1blJlcG9ydCcgK1xuICAgICAgICAgICAgICAgICAgICAnP2NvbHVtbnM9JyArIENPTFVNTlNfTElTVCArXG4gICAgICAgICAgICAgICAgICAgICcmc291cmNlPUxDTScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5ydW5SZXBvcnQoZmlsdGVycywgbnVsbCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlKHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJ1biByZXBvcnQgcmVxdWVzdCB3aXRoIHR5cGUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBDT0xVTU5TX0xJU1RcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBdXRvJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnL3J1blJlcG9ydCcgK1xuICAgICAgICAgICAgICAgICAgICAnP2NvbHVtbnM9JyArIENPTFVNTlNfTElTVCArXG4gICAgICAgICAgICAgICAgICAgICcmdHlwZT1BdXRvJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLnJ1blJlcG9ydChmaWx0ZXJzLCBudWxsKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmUodGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcnVuIHJlcG9ydCByZXF1ZXN0IHdpdGggc3RhdHVzIHBhcmFtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBDT0xVTU5TX0xJU1RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJy9ydW5SZXBvcnQnICtcbiAgICAgICAgICAgICAgICAgICAgJz9jb2x1bW5zPScgKyBDT0xVTU5TX0xJU1QgK1xuICAgICAgICAgICAgICAgICAgICAnJnN0YXR1cz1TdWNjZXNzJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLnJ1blJlcG9ydChmaWx0ZXJzLCBudWxsLCAnU3VjY2VzcycpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZSh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBydW4gcmVwb3J0IHJlcXVlc3Qgd2l0aCBhY2NvdW50RGlzcGxheU5hbWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBDT0xVTU5TX0xJU1RcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFjY291bnREaXNwbGF5TmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FkbWluaXN0cmF0b3InXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvcnVuUmVwb3J0JyArXG4gICAgICAgICAgICAgICAgICAgICc/YWNjb3VudERpc3BsYXlOYW1lPUFkbWluaXN0cmF0b3InICtcbiAgICAgICAgICAgICAgICAgICAgJyZjb2x1bW5zPScgKyBDT0xVTU5TX0xJU1QpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5ydW5SZXBvcnQoZmlsdGVycywgbnVsbCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0JlKHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJ1biByZXBvcnQgcmVxdWVzdCB3aXRoIGlkZW50aXR5TmFtZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IENPTFVNTlNfTElTVFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlOYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnc3BhZG1pbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25zICsgJy9ydW5SZXBvcnQnICtcbiAgICAgICAgICAgICAgICAgICAgJz9jb2x1bW5zPScgKyBDT0xVTU5TX0xJU1QgK1xuICAgICAgICAgICAgICAgICAgICAnJmlkZW50aXR5TmFtZT1zcGFkbWluJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHRhc2tSZXN1bHRJZCk7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLnJ1blJlcG9ydChmaWx0ZXJzLCBudWxsKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvQmUodGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcnVuIHJlcG9ydCByZXF1ZXN0IHdpdGggYXBwbGljYXRpb25OYW1lIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgY29sdW1uczoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQ09MVU1OU19MSVNUXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdUZXN0QXBwJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxQcm92aXNpb25pbmdUcmFuc2FjdGlvbnMgKyAnL3J1blJlcG9ydCcgK1xuICAgICAgICAgICAgICAgICAgICAnP2FwcGxpY2F0aW9uTmFtZT1UZXN0QXBwJyArXG4gICAgICAgICAgICAgICAgICAgICcmY29sdW1ucz0nICsgQ09MVU1OU19MSVNUKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgdGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucnVuUmVwb3J0KGZpbHRlcnMsIG51bGwpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZSh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSBydW4gcmVwb3J0IHJlcXVlc3Qgd2l0aCBmaWx0ZXIgYW5kIHNvcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ID0gbmV3IFNvcnRPcmRlcigpLFxuICAgICAgICAgICAgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBDT0xVTU5TX0xJU1RcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0xDTSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCdhcHBsaWNhdGlvbk5hbWUnLCB0cnVlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9ucyArICcvcnVuUmVwb3J0JyArXG4gICAgICAgICAgICAgICAgICAgICc/Y29sdW1ucz0nICsgQ09MVU1OU19MSVNUICtcbiAgICAgICAgICAgICAgICAgICAgJyZzb3J0PSU1QiU3QiUyMnByb3BlcnR5JTIyOiUyMmFwcGxpY2F0aW9uTmFtZSUyMiwlMjJkaXJlY3Rpb24lMjI6JTIyQVNDJTIyJTdEJTVEJnNvdXJjZT1MQ00nKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgdGFza1Jlc3VsdElkKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UucnVuUmVwb3J0KGZpbHRlcnMsIHNvcnQpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9CZSh0YXNrUmVzdWx0SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncG9zdCBhZGQgZW1haWwgbm90aWZpY2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0YXNrUmVzdWx0SWQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRhc2tSZXN1bHRJZCA9IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uVGVzdERhdGEuVEVTVFRBU0tSRVNVTFRJRDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Bvc3RzIHRvIHRoZSByZXBvcnQgbm90aWZpY2F0aW9uIGVuZHBvaW50ICcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGlkID0gJzEyMyc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVChiYXNlVVJMUmVwb3J0ICsgJy8nICsgaWQgKyAnL25vdGlmaWNhdGlvbicpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuYWRkRW1haWxOb3RpZmljYXRpb24oaWQpO1xuXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvcGVuRGV0YWlsc0RpYWxvZycsICgpID0+IHtcbiAgICAgICAgbGV0IHNwTW9kYWw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9zcE1vZGFsXykgPT4ge1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aGUgbW9kYWwgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0cmFuc2FjdGlvbiA9IG5ldyBQcm92aXNpb25pbmdUcmFuc2FjdGlvbih7IGlkOiAnMScgfSk7XG5cbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG5cbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5vcGVuRGV0YWlsc0RpYWxvZyh0cmFuc2FjdGlvbik7XG5cbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREZXRhaWxzRGlhbG9nVGl0bGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0ge1xuICAgICAgICAgICAgJ3VpX3Byb3ZfdHJhbnNfZGV0YWlsc190aXRsZSc6ICdUcmFuc2FjdGlvbiBEZXRhaWxzJyxcbiAgICAgICAgICAgICd1aV9wcm92X3RyYW5zX2RldGFpbHNfdGl0bGVfaWRlbnRpdHknOiAnVHJhbnNhY3Rpb24gRGV0YWlsczogezB9J1xuICAgICAgICB9O1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChzcFRyYW5zbGF0ZUZpbHRlcikgPT4ge1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyhtZXNzYWdlcyk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBjb3JyZWN0IHRpdGxlIHdoZW4gaWRlbnRpdHkgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpdGxlLCB0cmFuc2FjdGlvbiA9IG5ldyBQcm92aXNpb25pbmdUcmFuc2FjdGlvbih7XG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICBpZGVudGl0eURpc3BsYXlOYW1lOiAnQm9iJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRpdGxlID0gcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldERldGFpbHNEaWFsb2dUaXRsZSh0cmFuc2FjdGlvbik7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0aXRsZSkudG9FcXVhbCgnVHJhbnNhY3Rpb24gRGV0YWlsczogQm9iJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGNvcnJlY3QgdGl0bGUgd2hlbiBubyBpZGVudGl0eSBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGl0bGUsIHRyYW5zYWN0aW9uID0gbmV3IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICBpZDogJzEnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGl0bGUgPSBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0RGV0YWlsc0RpYWxvZ1RpdGxlKHRyYW5zYWN0aW9uKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRpdGxlKS50b0VxdWFsKCdUcmFuc2FjdGlvbiBEZXRhaWxzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVsb2FkRGF0YScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlbG9hZCA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmluaXRSZWxvYWQocmVsb2FkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCB0aXRsZSB3aGVuIGlkZW50aXR5IGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5yZWxvYWREYXRhKCk7XG4gICAgICAgICAgICBleHBlY3QocmVsb2FkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
