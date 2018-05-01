System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule', 'test/js/CustomMatchers', './ApprovalTestDataService'], function (_export) {
    'use strict';

    var approvalModule, testModule, CustomMatchers;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsCustomMatchers) {
            CustomMatchers = _testJsCustomMatchers['default'];
        }, function (_ApprovalTestDataService) {}],
        execute: function () {

            describe('ApprovalService', function () {
                var types = ['anotherTest'],
                    twoTypes = ['oneType', 'anotherType'],
                    owner = 'test',
                    http,
                    approvalService,
                    spHttpService,
                    testService,
                    approvalTestDataService;

                beforeEach(module(testModule));
                beforeEach(module(approvalModule));

                beforeEach(inject(function ($httpBackend, _approvalService_, _spHttpService_, _testService_, _approvalTestDataService_) {
                    http = $httpBackend;
                    approvalService = _approvalService_;
                    spHttpService = _spHttpService_;
                    testService = _testService_;
                    approvalTestDataService = _approvalTestDataService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getApprovalCount()', function () {

                    /**
                     * Create the URL for the count endpoint with the given query string.
                     */
                    var countUrl = function (suffix) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/count?' + suffix;
                    };

                    it('should apply passed parameters to ajax call', function () {
                        http.expectGET(countUrl('ownerId=test&requestTypes=anotherTest')).respond(200, '');
                        approvalService.getApprovalCount(types, owner);
                        http.flush();
                    });

                    it('should allow the caller to not specify the owner', function () {
                        http.expectGET(countUrl('requestTypes=anotherTest')).respond(200, '');
                        approvalService.getApprovalCount(types);
                        http.flush();
                    });

                    it('should accept a list of types', function () {
                        http.expectGET(countUrl('requestTypes=oneType&requestTypes=anotherType')).respond(200, '');
                        approvalService.getApprovalCount(twoTypes);
                        http.flush();
                    });

                    it('should do something with the returned value', function () {
                        http.expectGET(countUrl('requestTypes=anotherTest')).respond(200, 23);
                        var tmp;
                        approvalService.getApprovalCount(types).then(function (response) {
                            tmp = response.data;
                        });
                        http.flush();
                        expect(tmp).toEqual(23);
                    });
                });

                describe('getApprovals()', function () {
                    var sortJson = '[{\'property\':\'foo\',\'direction\':\'DESC\'}]',
                        sortMock = {
                        toJson: function () {
                            return sortJson;
                        }
                    },
                        escapedSortJson,
                        Approval;

                    beforeEach(inject(function (testService, _Approval_) {
                        escapedSortJson = testService.encodeUriQuery(sortJson);
                        Approval = _Approval_;
                    }));

                    /**
                     * Create the URL for the approvals endpoint with the given query string.
                     */
                    var approvalsUrl = function (suffix) {
                        var url = SailPoint.CONTEXT_PATH + '/ui/rest/approvals/';
                        if (suffix) {
                            url += '?' + suffix;
                        }
                        return url;
                    };

                    it('should apply passed parameters to ajax call', function () {
                        http.expectGET(approvalsUrl('limit=13&requestTypes=anotherTest&sort=' + escapedSortJson + '&start=1')).respond(200, '');
                        approvalService.getApprovals(types, 1, 13, sortMock);
                        http.flush();
                    });

                    it('should allow not specifying a sort', function () {
                        http.expectGET(approvalsUrl('limit=13&requestTypes=anotherTest&start=1')).respond(200, '');
                        approvalService.getApprovals(types, 1, 13, null);
                        http.flush();
                    });

                    it('should accept a list of types', function () {
                        http.expectGET(approvalsUrl('limit=13&requestTypes=oneType&requestTypes=anotherType&start=1')).respond(200, '');
                        approvalService.getApprovals(twoTypes, 1, 13, null);
                        http.flush();
                    });

                    it('should allow not specifying a limit', function () {
                        http.expectGET(approvalsUrl('requestTypes=anotherTest&start=1')).respond(200, '');
                        approvalService.getApprovals(types, 1, null, null);
                        http.flush();
                    });

                    it('should allow not specifying a start', function () {
                        http.expectGET(approvalsUrl('requestTypes=anotherTest')).respond(200, '');
                        approvalService.getApprovals(types, null, null, null);
                        http.flush();
                    });

                    it('should allow not specifying types', function () {
                        http.expectGET(approvalsUrl()).respond(200, '');
                        approvalService.getApprovals(null, null, null, null);
                        http.flush();
                    });

                    it('should do something with the returned value', function () {
                        var approvalData = approvalTestDataService.createApproval(),
                            response = {
                            objects: [approvalData],
                            count: 1
                        },
                            tmp = {};

                        http.expectGET(approvalsUrl()).respond(200, response);
                        approvalService.getApprovals().then(function (response) {
                            tmp = response;
                        });
                        http.flush();
                        expect(tmp.data.count).toEqual(1);
                        expect(tmp.data.objects.length).toEqual(1);
                        expect(tmp.data.objects[0] instanceof Approval).toBeTruthy();
                    });
                });

                var approvalId = '1234',
                    itemId = '5678',
                    itemUrl = SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/items/' + itemId;

                describe('approveItem()', function () {
                    var approveUrl = itemUrl + '/approve';

                    it('approves an item', function () {
                        var promise, spy;
                        http.expectPOST(approveUrl).respond(200, '');
                        promise = approvalService.approveItem(approvalId, itemId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(approveUrl).respond(500, '');
                        promise = approvalService.approveItem(approvalId, itemId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.approveItem(null, itemId);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no itemId', function () {
                        expect(function () {
                            approvalService.approveItem(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('rejectItem()', function () {
                    var rejectUrl = itemUrl + '/reject';

                    it('rejects an item', function () {
                        var promise, spy;
                        http.expectPOST(rejectUrl).respond(200, '');
                        promise = approvalService.rejectItem(approvalId, itemId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(rejectUrl).respond(500, '');
                        promise = approvalService.rejectItem(approvalId, itemId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.rejectItem(null, itemId);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no itemId', function () {
                        expect(function () {
                            approvalService.rejectItem(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('undoItem()', function () {
                    var undoUrl = itemUrl + '/undo';

                    it('undoes an item', function () {
                        var promise, spy;
                        http.expectPOST(undoUrl).respond(200, '');
                        promise = approvalService.undoItem(approvalId, itemId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(undoUrl).respond(500, '');
                        promise = approvalService.undoItem(approvalId, itemId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.undoItem(null, itemId);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no itemId', function () {
                        expect(function () {
                            approvalService.undoItem(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('getItemTargetAccounts()', function () {
                    var targetsUrl = itemUrl + '/targetAccounts',
                        accounts = [{
                        role: 'So',
                        application: 'Sleepy',
                        account: 'Need to ... zz...zz...'
                    }, {
                        role: 'Coffee',
                        application: 'GOOD',
                        account: 'Me awakey now!!!'
                    }];

                    // Add a custom matcher to check an $http GET response.
                    beforeEach(function () {
                        jasmine.addMatchers(CustomMatchers);
                    });

                    it('gets target accounts', function () {
                        var targets, spy;
                        http.expectGET(targetsUrl).respond(200, accounts);
                        targets = approvalService.getItemTargetAccounts(approvalId, itemId);
                        spy = testService.spyOnSuccess(targets.$promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                        expect(targets).toEqualResponse(accounts);
                    });

                    it('fails on REST error', function () {
                        var targets, spy;
                        http.expectGET(targetsUrl).respond(500, '');
                        targets = approvalService.getItemTargetAccounts(approvalId, itemId);
                        spy = testService.spyOnFailure(targets.$promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                        expect(targets.length).toEqual(0);
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.getItemTargetAccounts(null, itemId);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no itemId', function () {
                        expect(function () {
                            approvalService.getItemTargetAccounts(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('complete()', function () {
                    var getCompleteUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/complete';
                    };

                    it('completes an approval', function () {
                        var promise, spy;
                        http.expectPOST(getCompleteUrl(approvalId)).respond(200, '');
                        promise = approvalService.complete(approvalId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(getCompleteUrl(approvalId)).respond(500, '');
                        promise = approvalService.complete(approvalId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.complete(null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                var username = 'brubble',
                    password = 'xyzzy',
                    userPasswordData = {
                    signatureAccountId: username,
                    signaturePassword: password
                },
                    passwordData = {
                    signaturePassword: password
                };

                describe('sign()', function () {
                    var getUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/complete';
                    };

                    it('signs an approval with username and password', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId), userPasswordData).respond(200, '');
                        promise = approvalService.sign(approvalId, password, username);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('signs an approval with only password', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId), passwordData).respond(200, '');
                        promise = approvalService.sign(approvalId, password);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId), passwordData).respond(500, '');
                        promise = approvalService.sign(approvalId, password);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no password', function () {
                        expect(function () {
                            approvalService.sign(approvalId, null, username);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.sign(null, password);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('approveAll()', function () {
                    var getUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/approveAll';
                    };

                    it('approves all decisions', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId)).respond(200, '');
                        promise = approvalService.approveAll(approvalId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId)).respond(500, '');
                        promise = approvalService.approveAll(approvalId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.approveAll(null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('rejectAll()', function () {
                    var getUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/rejectAll';
                    };

                    it('rejects all decisions', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId)).respond(200, '');
                        promise = approvalService.rejectAll(approvalId);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId)).respond(500, '');
                        promise = approvalService.rejectAll(approvalId);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.rejectAll(null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('setPriority()', function () {
                    var getUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId;
                    };

                    it('sends a PATCH request', function () {
                        var promise, spy;
                        http.expectPATCH(getUrl(approvalId), { priority: 'High' }).respond(200, '');
                        promise = approvalService.setPriority(approvalId, 'High');
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPATCH(getUrl(approvalId)).respond(500, '');
                        promise = approvalService.setPriority(approvalId, 'High');
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.setPriority(null, 'High');
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no priority', function () {
                        expect(function () {
                            approvalService.setPriority(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('assign()', function () {
                    var assignee = 'workgroupMember';
                    var getUrl = function (approvalId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/assign';
                    };

                    it('sends a POST request', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId), { targetIdentity: assignee }).respond(200, '');
                        promise = approvalService.assign(approvalId, assignee);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId)).respond(500, '');
                        promise = approvalService.assign(approvalId, assignee);
                        spy = testService.spyOnFailure(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.assign(null, assignee);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('succeeds with no assignee', function () {
                        var promise, spy;
                        http.expectPOST(getUrl(approvalId), { targetIdentity: null }).respond(200, '');
                        promise = approvalService.assign(approvalId, null);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                        http.verifyNoOutstandingRequest();
                    });
                });

                describe('setSunriseSunset()', function () {
                    var sunrise = new Date().getTime(),
                        sunset = sunrise + 86400000;

                    function getUrl(approvalId, itemId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/items/' + itemId;
                    }

                    it('should send a http request when everything is ok', function () {
                        var promise,
                            spy,
                            dates = {
                            sunrise: sunrise,
                            sunset: sunset
                        };
                        http.expectPATCH(getUrl(approvalId, itemId), dates).respond(200, '');
                        promise = approvalService.setSunriseSunset(approvalId, itemId, dates);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('should throw when sunset before sunrise', function () {
                        var dates = {
                            sunrise: sunset,
                            sunset: sunrise
                        };

                        expect(function () {
                            approvalService.setSunriseSunset(approvalId, itemId, dates);
                        }).toThrow();
                    });

                    it('should throw when sunrise is before today', function () {
                        var dates = {
                            sunrise: sunrise - 172800000
                        };

                        expect(function () {
                            approvalService.setSunriseSunset(approvalId, itemId, dates);
                        }).toThrow();
                    });

                    it('should throw when sunset is before today', function () {
                        var dates = {
                            sunrise: sunset - 172800000
                        };

                        expect(function () {
                            approvalService.setSunriseSunset(approvalId, itemId, dates);
                        }).toThrow();
                    });

                    it('should default undefined values to null', function () {
                        var promise,
                            spy,
                            dates = {};
                        http.expectPATCH(getUrl(approvalId, itemId), { sunrise: null, sunset: null }).respond(200, '');
                        promise = approvalService.setSunriseSunset(approvalId, itemId, dates);
                        spy = testService.spyOnSuccess(promise);
                        http.flush();
                        expect(spy).toHaveBeenCalled();
                    });
                });

                describe('getRoleEntitlements', function () {
                    var getUrl = function (approvalId, itemId) {
                        return SailPoint.CONTEXT_PATH + '/ui/rest/approvals/' + approvalId + '/items/' + itemId + '/simpleEntitlements';
                    };

                    var listResult;

                    // Add a custom matcher to check an $http GET response.
                    beforeEach(inject(function (approvalTestDataService) {
                        jasmine.addMatchers(CustomMatchers);

                        listResult = approvalTestDataService.GENERIC_LIST_RESULT;
                    }));

                    it('pukes with no approvalId', function () {
                        expect(function () {
                            approvalService.getRoleEntitlements(null, itemId);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('pukes with no itemId', function () {
                        expect(function () {
                            approvalService.getRoleEntitlements(approvalId, null);
                        }).toThrow();
                        http.verifyNoOutstandingRequest();
                    });

                    it('gets role entitlements', function () {
                        var gotRoleEntitlements, spy;
                        http.expectGET(getUrl(approvalId, itemId)).respond(200, listResult);
                        gotRoleEntitlements = approvalService.getRoleEntitlements(approvalId, itemId);
                        spy = testService.spyOnSuccess(gotRoleEntitlements);
                        gotRoleEntitlements.then(function (roleEntitlements) {
                            expect(spy).toHaveBeenCalled();
                            expect(roleEntitlements).toEqualResponse(listResult);
                        });
                        http.flush();
                    });
                });

                describe('showExpiredSunsetDialog', function () {
                    var BULK_MSG = 'bulk message',
                        NON_BULK_MSG = 'non bulk message';

                    var spModal = undefined;

                    beforeEach(inject(function (_spModal_, spTranslateFilter) {
                        spModal = _spModal_;

                        spTranslateFilter.configureCatalog({
                            'ui_my_approvals_sunset_expired_content_bulk': BULK_MSG,
                            'ui_my_approvals_sunset_expired_content': NON_BULK_MSG
                        });
                    }));

                    it('should show proper message when bulk is true', function () {
                        spyOn(spModal, 'open');

                        approvalService.showExpiredSunsetDialog(true);

                        expect(spModal.open).toHaveBeenCalledWith({
                            title: 'ui_my_approvals_sunset_expired_title',
                            content: BULK_MSG,
                            buttons: [{
                                displayValue: 'ui_button_close',
                                primary: true
                            }]
                        });
                    });

                    it('should show proper message when bulk is not true', function () {
                        spyOn(spModal, 'open');

                        approvalService.showExpiredSunsetDialog(false);

                        expect(spModal.open).toHaveBeenCalledWith({
                            title: 'ui_my_approvals_sunset_expired_title',
                            content: NON_BULK_MSG,
                            buttons: [{
                                displayValue: 'ui_button_close',
                                primary: true
                            }]
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsU2VydmljZVRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixzQkFBc0IsMEJBQTBCLDhCQUE4QixVQUFVLFNBQVM7SUFDcEs7O0lBRUEsSUFBSSxnQkFBZ0IsWUFBWTtJQUNoQyxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHVCQUF1QjtZQUNoQyxpQkFBaUIsc0JBQXNCO1dBQ3hDLFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxtQkFBbUIsWUFBVztnQkFDbkMsSUFBSSxRQUFRLENBQUM7b0JBQ1QsV0FBVyxDQUFDLFdBQVc7b0JBQ3ZCLFFBQVE7b0JBQ1I7b0JBQU07b0JBQWlCO29CQUFlO29CQUFhOztnQkFFdkQsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxjQUFjLG1CQUFtQixpQkFBaUIsZUFDbEQsMkJBQTJCO29CQUNsRCxPQUFPO29CQUNQLGtCQUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLDBCQUEwQjs7O2dCQUc5QixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUdULFNBQVMsc0JBQXNCLFlBQVc7Ozs7O29CQUt0QyxJQUFJLFdBQVcsVUFBUyxRQUFRO3dCQUM1QixPQUFPLFVBQVUsZUFBZSw4QkFBOEI7OztvQkFHbEUsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsS0FBSyxVQUFVLFNBQVMsMENBQ3BCLFFBQVEsS0FBSzt3QkFDakIsZ0JBQWdCLGlCQUFpQixPQUFPO3dCQUN4QyxLQUFLOzs7b0JBR1QsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsS0FBSyxVQUFVLFNBQVMs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QVcsT0FBTyxVQUFDLFdBQVcsbUJBQXNCO3dCQUNoRCxVQUFVOzt3QkFFVixrQkFBa0IsaUJBQWlCOzRCQUMvQiwrQ0FBK0M7NEJBQy9DLDBDQUEwQzs7OztvQkFJbEQsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsTUFBTSxTQUFTOzt3QkFFZixnQkFBZ0Isd0JBQXdCOzt3QkFFeEMsT0FBTyxRQUFRLE1BQU0scUJBQXFCOzRCQUN0QyxPQUFPOzRCQUNQLFNBQVM7NEJBQ1QsU0FBUyxDQUFDO2dDQUNOLGNBQWM7Z0NBQ2QsU0FBUzs7Ozs7b0JBS3JCLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELE1BQU0sU0FBUzs7d0JBRWYsZ0JBQWdCLHdCQUF3Qjs7d0JBRXhDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQjs0QkFDdEMsT0FBTzs0QkFDUCxTQUFTOzRCQUNULFNBQVMsQ0FBQztnQ0FDTixjQUFjO2dDQUNkLFNBQVM7Ozs7Ozs7O0dBMkMxQiIsImZpbGUiOiJhcHByb3ZhbC9BcHByb3ZhbFNlcnZpY2VUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYXBwcm92YWxNb2R1bGUgZnJvbSAnYXBwcm92YWwvQXBwcm92YWxNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcbmltcG9ydCBDdXN0b21NYXRjaGVycyBmcm9tICd0ZXN0L2pzL0N1c3RvbU1hdGNoZXJzJztcbmltcG9ydCAnLi9BcHByb3ZhbFRlc3REYXRhU2VydmljZSc7XG5cbmRlc2NyaWJlKCdBcHByb3ZhbFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdHlwZXMgPSBbJ2Fub3RoZXJUZXN0J10sXG4gICAgICAgIHR3b1R5cGVzID0gWydvbmVUeXBlJywgJ2Fub3RoZXJUeXBlJ10sXG4gICAgICAgIG93bmVyID0gJ3Rlc3QnLFxuICAgICAgICBodHRwLCBhcHByb3ZhbFNlcnZpY2UsIHNwSHR0cFNlcnZpY2UsIHRlc3RTZXJ2aWNlLCBhcHByb3ZhbFRlc3REYXRhU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhcHByb3ZhbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGh0dHBCYWNrZW5kLCBfYXBwcm92YWxTZXJ2aWNlXywgX3NwSHR0cFNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV8pIHtcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgYXBwcm92YWxTZXJ2aWNlID0gX2FwcHJvdmFsU2VydmljZV87XG4gICAgICAgIHNwSHR0cFNlcnZpY2UgPSBfc3BIdHRwU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgYXBwcm92YWxUZXN0RGF0YVNlcnZpY2UgPSBfYXBwcm92YWxUZXN0RGF0YVNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFwcHJvdmFsQ291bnQoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgdGhlIFVSTCBmb3IgdGhlIGNvdW50IGVuZHBvaW50IHdpdGggdGhlIGdpdmVuIHF1ZXJ5IHN0cmluZy5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBjb3VudFVybCA9IGZ1bmN0aW9uKHN1ZmZpeCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzL2NvdW50PycgKyBzdWZmaXg7XG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhcHBseSBwYXNzZWQgcGFyYW1ldGVycyB0byBhamF4IGNhbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGNvdW50VXJsKCdvd25lcklkPXRlc3QmcmVxdWVzdFR5cGVzPWFub3RoZXJUZXN0JykpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxDb3VudCh0eXBlcywgb3duZXIpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IHRoZSBjYWxsZXIgdG8gbm90IHNwZWNpZnkgdGhlIG93bmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChjb3VudFVybCgncmVxdWVzdFR5cGVzPWFub3RoZXJUZXN0JykpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxDb3VudCh0eXBlcyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgbGlzdCBvZiB0eXBlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoY291bnRVcmwoJ3JlcXVlc3RUeXBlcz1vbmVUeXBlJnJlcXVlc3RUeXBlcz1hbm90aGVyVHlwZScpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLmdldEFwcHJvdmFsQ291bnQodHdvVHlwZXMpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXR1cm5lZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoY291bnRVcmwoJ3JlcXVlc3RUeXBlcz1hbm90aGVyVGVzdCcpKS5yZXNwb25kKDIwMCwgMjMpO1xuICAgICAgICAgICAgdmFyIHRtcDtcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbENvdW50KHR5cGVzKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgdG1wID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcCkudG9FcXVhbCgyMyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnZ2V0QXBwcm92YWxzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNvcnRKc29uID0gJ1t7XFwncHJvcGVydHlcXCc6XFwnZm9vXFwnLFxcJ2RpcmVjdGlvblxcJzpcXCdERVNDXFwnfV0nLFxuICAgICAgICAgICAgc29ydE1vY2sgPSB7XG4gICAgICAgICAgICAgICAgdG9Kc29uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRKc29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVkU29ydEpzb24sIEFwcHJvdmFsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKHRlc3RTZXJ2aWNlLCBfQXBwcm92YWxfKSB7XG4gICAgICAgICAgICBlc2NhcGVkU29ydEpzb24gPSB0ZXN0U2VydmljZS5lbmNvZGVVcmlRdWVyeShzb3J0SnNvbik7XG4gICAgICAgICAgICBBcHByb3ZhbCA9IF9BcHByb3ZhbF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBVUkwgZm9yIHRoZSBhcHByb3ZhbHMgZW5kcG9pbnQgd2l0aCB0aGUgZ2l2ZW4gcXVlcnkgc3RyaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGFwcHJvdmFsc1VybCA9IGZ1bmN0aW9uKHN1ZmZpeCkge1xuICAgICAgICAgICAgdmFyIHVybCA9IFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLyc7XG4gICAgICAgICAgICBpZiAoc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgdXJsICs9ICc/JyArIHN1ZmZpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhcHBseSBwYXNzZWQgcGFyYW1ldGVycyB0byBhamF4IGNhbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGFwcHJvdmFsc1VybCgnbGltaXQ9MTMmcmVxdWVzdFR5cGVzPWFub3RoZXJUZXN0JnNvcnQ9JyArIGVzY2FwZWRTb3J0SnNvbiArICcmc3RhcnQ9MScpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLmdldEFwcHJvdmFscyh0eXBlcywgMSwgMTMsIHNvcnRNb2NrKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyBub3Qgc3BlY2lmeWluZyBhIHNvcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGFwcHJvdmFsc1VybCgnbGltaXQ9MTMmcmVxdWVzdFR5cGVzPWFub3RoZXJUZXN0JnN0YXJ0PTEnKSkuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHModHlwZXMsIDEsIDEzLCBudWxsKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBsaXN0IG9mIHR5cGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChhcHByb3ZhbHNVcmwoJ2xpbWl0PTEzJnJlcXVlc3RUeXBlcz1vbmVUeXBlJnJlcXVlc3RUeXBlcz1hbm90aGVyVHlwZSZzdGFydD0xJykpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxzKHR3b1R5cGVzLCAxLCAxMywgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgbm90IHNwZWNpZnlpbmcgYSBsaW1pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYXBwcm92YWxzVXJsKCdyZXF1ZXN0VHlwZXM9YW5vdGhlclRlc3Qmc3RhcnQ9MScpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLmdldEFwcHJvdmFscyh0eXBlcywgMSwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYWxsb3cgbm90IHNwZWNpZnlpbmcgYSBzdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYXBwcm92YWxzVXJsKCdyZXF1ZXN0VHlwZXM9YW5vdGhlclRlc3QnKSkuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHModHlwZXMsIG51bGwsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGFsbG93IG5vdCBzcGVjaWZ5aW5nIHR5cGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVChhcHByb3ZhbHNVcmwoKSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHMobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZG8gc29tZXRoaW5nIHdpdGggdGhlIHJldHVybmVkIHZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXBwcm92YWxEYXRhID0gYXBwcm92YWxUZXN0RGF0YVNlcnZpY2UuY3JlYXRlQXBwcm92YWwoKSxcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW2FwcHJvdmFsRGF0YV0sXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxXG4gICAgICAgICAgICAgICAgfSwgdG1wID0ge307XG5cbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGFwcHJvdmFsc1VybCgpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLmdldEFwcHJvdmFscygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0bXAgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcC5kYXRhLmNvdW50KS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcC5kYXRhLm9iamVjdHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcC5kYXRhLm9iamVjdHNbMF0gaW5zdGFuY2VvZiBBcHByb3ZhbCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgdmFyIGFwcHJvdmFsSWQgPSAnMTIzNCcsXG4gICAgICAgIGl0ZW1JZCA9ICc1Njc4JyxcbiAgICAgICAgaXRlbVVybCA9IFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkICsgJy9pdGVtcy8nICsgaXRlbUlkO1xuXG4gICAgZGVzY3JpYmUoJ2FwcHJvdmVJdGVtKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFwcHJvdmVVcmwgPSBpdGVtVXJsICsgJy9hcHByb3ZlJztcblxuICAgICAgICBpdCgnYXBwcm92ZXMgYW4gaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChhcHByb3ZlVXJsKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5hcHByb3ZlSXRlbShhcHByb3ZhbElkLCBpdGVtSWQpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZmFpbHMgb24gUkVTVCBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChhcHByb3ZlVXJsKS5yZXNwb25kKDUwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5hcHByb3ZlSXRlbShhcHByb3ZhbElkLCBpdGVtSWQpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25GYWlsdXJlKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBhcHByb3ZhbElkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5hcHByb3ZlSXRlbShudWxsLCBpdGVtSWQpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIG5vIGl0ZW1JZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUl0ZW0oYXBwcm92YWxJZCwgbnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVqZWN0SXRlbSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RVcmwgPSBpdGVtVXJsICsgJy9yZWplY3QnO1xuXG4gICAgICAgIGl0KCdyZWplY3RzIGFuIGl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QocmVqZWN0VXJsKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5yZWplY3RJdGVtKGFwcHJvdmFsSWQsIGl0ZW1JZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKHJlamVjdFVybCkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UucmVqZWN0SXRlbShhcHByb3ZhbElkLCBpdGVtSWQpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25GYWlsdXJlKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBhcHByb3ZhbElkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5yZWplY3RJdGVtKG51bGwsIGl0ZW1JZCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gaXRlbUlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5yZWplY3RJdGVtKGFwcHJvdmFsSWQsIG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3VuZG9JdGVtKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVuZG9VcmwgPSBpdGVtVXJsICsgJy91bmRvJztcblxuICAgICAgICBpdCgndW5kb2VzIGFuIGl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodW5kb1VybCkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UudW5kb0l0ZW0oYXBwcm92YWxJZCwgaXRlbUlkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodW5kb1VybCkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UudW5kb0l0ZW0oYXBwcm92YWxJZCwgaXRlbUlkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZShwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbFNlcnZpY2UudW5kb0l0ZW0obnVsbCwgaXRlbUlkKTsgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBpdGVtSWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxTZXJ2aWNlLnVuZG9JdGVtKGFwcHJvdmFsSWQsIG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEl0ZW1UYXJnZXRBY2NvdW50cygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0YXJnZXRzVXJsID0gaXRlbVVybCArICcvdGFyZ2V0QWNjb3VudHMnLFxuICAgICAgICAgICAgYWNjb3VudHMgPSBbe1xuICAgICAgICAgICAgICAgIHJvbGU6ICdTbycsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdTbGVlcHknLFxuICAgICAgICAgICAgICAgIGFjY291bnQ6ICdOZWVkIHRvIC4uLiB6ei4uLnp6Li4uJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJvbGU6ICdDb2ZmZWUnLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnR09PRCcsXG4gICAgICAgICAgICAgICAgYWNjb3VudDogJ01lIGF3YWtleSBub3chISEnXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICAvLyBBZGQgYSBjdXN0b20gbWF0Y2hlciB0byBjaGVjayBhbiAkaHR0cCBHRVQgcmVzcG9uc2UuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKEN1c3RvbU1hdGNoZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2dldHMgdGFyZ2V0IGFjY291bnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0cywgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodGFyZ2V0c1VybCkucmVzcG9uZCgyMDAsIGFjY291bnRzKTtcbiAgICAgICAgICAgIHRhcmdldHMgPSBhcHByb3ZhbFNlcnZpY2UuZ2V0SXRlbVRhcmdldEFjY291bnRzKGFwcHJvdmFsSWQsIGl0ZW1JZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3ModGFyZ2V0cy4kcHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0cykudG9FcXVhbFJlc3BvbnNlKGFjY291bnRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRzLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh0YXJnZXRzVXJsKS5yZXNwb25kKDUwMCwgJycpO1xuICAgICAgICAgICAgdGFyZ2V0cyA9IGFwcHJvdmFsU2VydmljZS5nZXRJdGVtVGFyZ2V0QWNjb3VudHMoYXBwcm92YWxJZCwgaXRlbUlkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZSh0YXJnZXRzLiRwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YXJnZXRzLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbFNlcnZpY2UuZ2V0SXRlbVRhcmdldEFjY291bnRzKG51bGwsIGl0ZW1JZCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gaXRlbUlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5nZXRJdGVtVGFyZ2V0QWNjb3VudHMoYXBwcm92YWxJZCwgbnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29tcGxldGUoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0Q29tcGxldGVVcmwgPSBmdW5jdGlvbihhcHByb3ZhbElkKSB7XG4gICAgICAgICAgICByZXR1cm4gU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9hcHByb3ZhbHMvJyArIGFwcHJvdmFsSWQgKyAnL2NvbXBsZXRlJztcbiAgICAgICAgfTtcblxuICAgICAgICBpdCgnY29tcGxldGVzIGFuIGFwcHJvdmFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldENvbXBsZXRlVXJsKGFwcHJvdmFsSWQpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5jb21wbGV0ZShhcHByb3ZhbElkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoZ2V0Q29tcGxldGVVcmwoYXBwcm92YWxJZCkpLnJlc3BvbmQoNTAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLmNvbXBsZXRlKGFwcHJvdmFsSWQpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25GYWlsdXJlKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBhcHByb3ZhbElkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5jb21wbGV0ZShudWxsKTsgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHZhciB1c2VybmFtZSA9ICdicnViYmxlJyxcbiAgICAgICAgcGFzc3dvcmQgPSAneHl6enknLFxuICAgICAgICB1c2VyUGFzc3dvcmREYXRhID0ge1xuICAgICAgICAgICAgc2lnbmF0dXJlQWNjb3VudElkOiB1c2VybmFtZSxcbiAgICAgICAgICAgIHNpZ25hdHVyZVBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9LFxuICAgICAgICBwYXNzd29yZERhdGEgPSB7XG4gICAgICAgICAgICBzaWduYXR1cmVQYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfTtcblxuICAgIGRlc2NyaWJlKCdzaWduKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGdldFVybCA9IGZ1bmN0aW9uKGFwcHJvdmFsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBTYWlsUG9pbnQuQ09OVEVYVF9QQVRIICsgJy91aS9yZXN0L2FwcHJvdmFscy8nICsgYXBwcm92YWxJZCArICcvY29tcGxldGUnO1xuICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzaWducyBhbiBhcHByb3ZhbCB3aXRoIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoYXBwcm92YWxJZCksIHVzZXJQYXNzd29yZERhdGEpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLnNpZ24oYXBwcm92YWxJZCwgcGFzc3dvcmQsIHVzZXJuYW1lKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NpZ25zIGFuIGFwcHJvdmFsIHdpdGggb25seSBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoYXBwcm92YWxJZCksIHBhc3N3b3JkRGF0YSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2Uuc2lnbihhcHByb3ZhbElkLCBwYXNzd29yZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldFVybChhcHByb3ZhbElkKSwgcGFzc3dvcmREYXRhKS5yZXNwb25kKDUwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5zaWduKGFwcHJvdmFsSWQsIHBhc3N3b3JkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZShwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxTZXJ2aWNlLnNpZ24oYXBwcm92YWxJZCwgbnVsbCwgdXNlcm5hbWUpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIG5vIGFwcHJvdmFsSWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxTZXJ2aWNlLnNpZ24obnVsbCwgcGFzc3dvcmQpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FwcHJvdmVBbGwoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oYXBwcm92YWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkICsgJy9hcHByb3ZlQWxsJztcbiAgICAgICAgfTtcblxuICAgICAgICBpdCgnYXBwcm92ZXMgYWxsIGRlY2lzaW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoYXBwcm92YWxJZCkpLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLmFwcHJvdmVBbGwoYXBwcm92YWxJZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldFVybChhcHByb3ZhbElkKSkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUFsbChhcHByb3ZhbElkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZShwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbFNlcnZpY2UuYXBwcm92ZUFsbChudWxsKTsgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWplY3RBbGwoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oYXBwcm92YWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkICsgJy9yZWplY3RBbGwnO1xuICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdyZWplY3RzIGFsbCBkZWNpc2lvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoZ2V0VXJsKGFwcHJvdmFsSWQpKS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5yZWplY3RBbGwoYXBwcm92YWxJZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldFVybChhcHByb3ZhbElkKSkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UucmVqZWN0QWxsKGFwcHJvdmFsSWQpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25GYWlsdXJlKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVrZXMgd2l0aCBubyBhcHByb3ZhbElkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGFwcHJvdmFsU2VydmljZS5yZWplY3RBbGwobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0UHJpb3JpdHkoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oYXBwcm92YWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkO1xuICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzZW5kcyBhIFBBVENIIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBBVENIKGdldFVybChhcHByb3ZhbElkKSwgeyBwcmlvcml0eTogJ0hpZ2gnIH0pLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLnNldFByaW9yaXR5KGFwcHJvdmFsSWQsICdIaWdoJyk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQQVRDSChnZXRVcmwoYXBwcm92YWxJZCkpLnJlc3BvbmQoNTAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLnNldFByaW9yaXR5KGFwcHJvdmFsSWQsICdIaWdoJyk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIG5vIGFwcHJvdmFsSWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxTZXJ2aWNlLnNldFByaW9yaXR5KG51bGwsICdIaWdoJyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgYXBwcm92YWxTZXJ2aWNlLnNldFByaW9yaXR5KGFwcHJvdmFsSWQsIG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Fzc2lnbigpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhc3NpZ25lZSA9ICd3b3JrZ3JvdXBNZW1iZXInO1xuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oYXBwcm92YWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkICsgJy9hc3NpZ24nO1xuICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzZW5kcyBhIFBPU1QgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoYXBwcm92YWxJZCksIHsgdGFyZ2V0SWRlbnRpdHk6IGFzc2lnbmVlIH0pLnJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICBwcm9taXNlID0gYXBwcm92YWxTZXJ2aWNlLmFzc2lnbihhcHByb3ZhbElkLCBhc3NpZ25lZSk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmYWlscyBvbiBSRVNUIGVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5O1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGdldFVybChhcHByb3ZhbElkKSkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UuYXNzaWduKGFwcHJvdmFsSWQsIGFzc2lnbmVlKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uRmFpbHVyZShwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBhcHByb3ZhbFNlcnZpY2UuYXNzaWduKG51bGwsIGFzc2lnbmVlKTsgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc3VjY2VlZHMgd2l0aCBubyBhc3NpZ25lZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoYXBwcm92YWxJZCksIHsgdGFyZ2V0SWRlbnRpdHk6IG51bGwgfSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2UuYXNzaWduKGFwcHJvdmFsSWQsIG51bGwpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXRTdW5yaXNlU3Vuc2V0KCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN1bnJpc2UgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgIHN1bnNldCA9IHN1bnJpc2UgKyA4NjQwMDAwMDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRVcmwoYXBwcm92YWxJZCwgaXRlbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gU2FpbFBvaW50LkNPTlRFWFRfUEFUSCArICcvdWkvcmVzdC9hcHByb3ZhbHMvJyArIGFwcHJvdmFsSWQgKyAnL2l0ZW1zLycgKyBpdGVtSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIHNlbmQgYSBodHRwIHJlcXVlc3Qgd2hlbiBldmVyeXRoaW5nIGlzIG9rJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSwgc3B5LFxuICAgICAgICAgICAgICAgIGRhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdW5yaXNlOiBzdW5yaXNlLFxuICAgICAgICAgICAgICAgICAgICBzdW5zZXQ6IHN1bnNldFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBBVENIKGdldFVybChhcHByb3ZhbElkLCBpdGVtSWQpLCBkYXRlcykucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhcHByb3ZhbFNlcnZpY2Uuc2V0U3VucmlzZVN1bnNldChhcHByb3ZhbElkLCBpdGVtSWQsIGRhdGVzKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhwcm9taXNlKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIHN1bnNldCBiZWZvcmUgc3VucmlzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBzdW5yaXNlOiBzdW5zZXQsXG4gICAgICAgICAgICAgICAgICAgIHN1bnNldDogc3VucmlzZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2Uuc2V0U3VucmlzZVN1bnNldChhcHByb3ZhbElkLCBpdGVtSWQsIGRhdGVzKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIHN1bnJpc2UgaXMgYmVmb3JlIHRvZGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bnJpc2U6IHN1bnJpc2UgLSAxNzI4MDAwMDBcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLnNldFN1bnJpc2VTdW5zZXQoYXBwcm92YWxJZCwgaXRlbUlkLCBkYXRlcyk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2hlbiBzdW5zZXQgaXMgYmVmb3JlIHRvZGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgc3VucmlzZTogc3Vuc2V0IC0gMTcyODAwMDAwXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLnNldFN1bnJpc2VTdW5zZXQoYXBwcm92YWxJZCwgaXRlbUlkLCBkYXRlcyk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGVmYXVsdCB1bmRlZmluZWQgdmFsdWVzIHRvIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHksXG4gICAgICAgICAgICAgICAgZGF0ZXMgPSB7fTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UEFUQ0goZ2V0VXJsKGFwcHJvdmFsSWQsIGl0ZW1JZCksIHtzdW5yaXNlOiBudWxsLCBzdW5zZXQ6IG51bGx9KS5yZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFwcHJvdmFsU2VydmljZS5zZXRTdW5yaXNlU3Vuc2V0KGFwcHJvdmFsSWQsIGl0ZW1JZCwgZGF0ZXMpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFJvbGVFbnRpdGxlbWVudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGdldFVybCA9IGZ1bmN0aW9uKGFwcHJvdmFsSWQsIGl0ZW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNhaWxQb2ludC5DT05URVhUX1BBVEggKyAnL3VpL3Jlc3QvYXBwcm92YWxzLycgKyBhcHByb3ZhbElkICsgJy9pdGVtcy8nICsgaXRlbUlkICtcbiAgICAgICAgICAgICAgICAnL3NpbXBsZUVudGl0bGVtZW50cyc7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGxpc3RSZXN1bHQ7XG5cbiAgICAgICAgLy8gQWRkIGEgY3VzdG9tIG1hdGNoZXIgdG8gY2hlY2sgYW4gJGh0dHAgR0VUIHJlc3BvbnNlLlxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihhcHByb3ZhbFRlc3REYXRhU2VydmljZSkge1xuICAgICAgICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhDdXN0b21NYXRjaGVycyk7XG5cbiAgICAgICAgICAgIGxpc3RSZXN1bHQgPSBhcHByb3ZhbFRlc3REYXRhU2VydmljZS5HRU5FUklDX0xJU1RfUkVTVUxUO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gYXBwcm92YWxJZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRSb2xlRW50aXRsZW1lbnRzKG51bGwsIGl0ZW1JZCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICBodHRwLnZlcmlmeU5vT3V0c3RhbmRpbmdSZXF1ZXN0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIG5vIGl0ZW1JZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZS5nZXRSb2xlRW50aXRsZW1lbnRzKGFwcHJvdmFsSWQsIG51bGwpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZ2V0cyByb2xlIGVudGl0bGVtZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGdvdFJvbGVFbnRpdGxlbWVudHMsIHNweTtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGdldFVybChhcHByb3ZhbElkLCBpdGVtSWQpKS5yZXNwb25kKDIwMCwgbGlzdFJlc3VsdCk7XG4gICAgICAgICAgICBnb3RSb2xlRW50aXRsZW1lbnRzID0gYXBwcm92YWxTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMoYXBwcm92YWxJZCwgaXRlbUlkKTtcbiAgICAgICAgICAgIHNweSA9IHRlc3RTZXJ2aWNlLnNweU9uU3VjY2Vzcyhnb3RSb2xlRW50aXRsZW1lbnRzKTtcbiAgICAgICAgICAgIGdvdFJvbGVFbnRpdGxlbWVudHMudGhlbihmdW5jdGlvbihyb2xlRW50aXRsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyb2xlRW50aXRsZW1lbnRzKS50b0VxdWFsUmVzcG9uc2UobGlzdFJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0V4cGlyZWRTdW5zZXREaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEJVTEtfTVNHID0gJ2J1bGsgbWVzc2FnZScsXG4gICAgICAgICAgICAgIE5PTl9CVUxLX01TRyA9ICdub24gYnVsayBtZXNzYWdlJztcblxuICAgICAgICBsZXQgc3BNb2RhbDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX3NwTW9kYWxfLCBzcFRyYW5zbGF0ZUZpbHRlcikgPT4ge1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcblxuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAgICAgJ3VpX215X2FwcHJvdmFsc19zdW5zZXRfZXhwaXJlZF9jb250ZW50X2J1bGsnOiBCVUxLX01TRyxcbiAgICAgICAgICAgICAgICAndWlfbXlfYXBwcm92YWxzX3N1bnNldF9leHBpcmVkX2NvbnRlbnQnOiBOT05fQlVMS19NU0dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IHByb3BlciBtZXNzYWdlIHdoZW4gYnVsayBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcblxuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlLnNob3dFeHBpcmVkU3Vuc2V0RGlhbG9nKHRydWUpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICd1aV9teV9hcHByb3ZhbHNfc3Vuc2V0X2V4cGlyZWRfdGl0bGUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEJVTEtfTVNHLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogJ3VpX2J1dHRvbl9jbG9zZScsXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBwcm9wZXIgbWVzc2FnZSB3aGVuIGJ1bGsgaXMgbm90IHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpO1xuXG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2Uuc2hvd0V4cGlyZWRTdW5zZXREaWFsb2coZmFsc2UpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICd1aV9teV9hcHByb3ZhbHNfc3Vuc2V0X2V4cGlyZWRfdGl0bGUnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IE5PTl9CVUxLX01TRyxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICd1aV9idXR0b25fY2xvc2UnLFxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
