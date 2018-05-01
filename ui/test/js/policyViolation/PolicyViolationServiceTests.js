System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', './PolicyTestData', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_PolicyTestData) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PolicyViolationService', function () {

                var http = undefined,
                    policyViolationService = undefined,
                    testService = undefined,
                    PolicyViolation = undefined,
                    ListResultDTO = undefined,
                    policyViolationTestData = undefined,
                    SortOrder = undefined,
                    $scope = undefined,
                    url = '/identityiq/ui/rest/policyViolations';

                beforeEach(module(policyViolationModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$httpBackend_, _policyViolationService_, _PolicyViolation_, _ListResultDTO_, _policyTestData_, _SortOrder_, _testService_, $rootScope) {

                    http = _$httpBackend_;
                    policyViolationService = _policyViolationService_;
                    PolicyViolation = _PolicyViolation_;
                    ListResultDTO = _ListResultDTO_;
                    policyViolationTestData = _policyTestData_;
                    SortOrder = _SortOrder_;
                    testService = _testService_;
                    $scope = $rootScope.$new();
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getPolicyViolations()', function () {

                    var policyViolationListResult = undefined,
                        start = undefined,
                        limit = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        start = 10;
                        limit = 10;
                        policyViolationListResult = {
                            count: 1,
                            objects: [policyViolationTestData.POLICY_VIOLATION_DATA_1]
                        };
                    });

                    it('should retrieve policy violations from REST with null sort', function () {

                        http.expectGET(url + '?limit=10&start=10').respond(200, policyViolationListResult);
                        promise = policyViolationService.getPolicyViolations(start, limit, null);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('PolicyViolation');
                        });
                    });

                    it('should retrieve policy violations from REST with sort', function () {

                        http.expectGET(url + '?limit=10&sort=%5B%5D&start=10').respond(200, policyViolationListResult);
                        promise = policyViolationService.getPolicyViolations(start, limit, new SortOrder());
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('PolicyViolation');
                        });
                    });

                    it('should convert and pass through filter values', function () {
                        var filterValues = {
                            type: {
                                value: 'SOD'
                            }
                        },
                            expectedUrl = url + ('?limit=10&start=10&type=' + testService.getQueryParamString(filterValues.type));
                        http.expectGET(expectedUrl).respond(200, policyViolationListResult);
                        promise = policyViolationService.getPolicyViolations(start, limit, undefined, filterValues);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('PolicyViolation');
                        });
                    });

                    it('should include showAll param', function () {
                        http.expectGET(url + '?limit=10&showAll=true&start=10').respond(200, policyViolationListResult);
                        promise = policyViolationService.getPolicyViolations(start, limit, null, null, true);
                        http.flush();
                    });

                    it('should add query params from decision scope if passed', function () {
                        http.expectGET(url + '?limit=10&includedStatus=Open&start=10').respond(200, policyViolationListResult);
                        var decisionScope = {
                            addQueryParameters: function (params) {
                                params.includedStatus = ['Open'];
                            }
                        };
                        promise = policyViolationService.getPolicyViolations(start, limit, null, null, false, decisionScope);
                        http.flush();
                    });

                    it('should set decisionScope on PolicyViolations', function () {
                        http.expectGET(url + '?limit=10&includedStatus=Open&start=10').respond(200, policyViolationListResult);
                        var decisionScope = {
                            addQueryParameters: function (params) {
                                params.includedStatus = ['Open'];
                            },
                            statuses: ['Open', 'Delegated']
                        };
                        promise = policyViolationService.getPolicyViolations(start, limit, null, null, false, decisionScope);
                        http.flush();
                        promise.then(function (response) {
                            // Ensure the response was transformed correctly.
                            expect(response.data.constructor.name).toBe('ListResultDTO');
                            expect(response.data.objects[0].constructor.name).toBe('PolicyViolation');
                            expect(response.data.objects[0].decisionScope).toBeDefined();
                            expect(response.data.objects[0].decisionScope.statuses).toBeDefined();
                            expect(response.data.objects[0].decisionScope.statuses.length).toBe(2);
                            expect(response.data.objects[0].decisionScope.statuses).toBe(decisionScope.statuses);
                        });
                    });
                });

                describe('saveDecisions()', function () {
                    it('throws with no decisions', function () {
                        expect(function () {
                            return policyViolationService.saveDecision();
                        }).toThrow();
                    });

                    it('should convert the decisions', function () {
                        var decision1 = {
                            item: {
                                id: '1234'
                            },
                            selectedViolationEntitlements: [{
                                some: 'thing'
                            }],
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision1;
                            }
                        },
                            expectedDecision1 = policyViolationService.convertDecision(decision1);

                        spyOn(policyViolationService, 'convertDecision').and.callThrough();
                        http.expectPOST(url + '/decisions', {
                            decisions: [expectedDecision1]
                        }).respond(200, { data: {} });
                        policyViolationService.saveDecisions([decision1]);
                        http.flush();
                        expect(policyViolationService.convertDecision).toHaveBeenCalledWith(decision1);
                    });

                    it('POSTS converted decisions to server', function () {
                        var decision1 = {
                            item: {
                                id: '1234'
                            },
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision1;
                            }
                        },
                            expectedDecision1 = policyViolationService.convertDecision(decision1),
                            decision2 = {
                            item: {
                                id: 'abcd'
                            },
                            getItemId: function () {
                                return 'abcd';
                            },
                            status: 'Delegated',
                            clone: function () {
                                return decision2;
                            }
                        },
                            expectedDecision2 = policyViolationService.convertDecision(decision2);

                        http.expectPOST(url + '/decisions', {
                            decisions: [expectedDecision1, expectedDecision2]
                        }).respond(200, { data: {} });
                        policyViolationService.saveDecisions([decision1, decision2]);
                        http.flush();
                    });

                    it('sets the showAll flag if passed in', function () {
                        var decision1 = {
                            item: {
                                id: '1234'
                            },
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision1;
                            }
                        },
                            expectedDecision1 = policyViolationService.convertDecision(decision1);
                        http.expectPOST(url + '/decisions', {
                            decisions: [expectedDecision1],
                            showAll: true
                        }).respond(200, { data: {} });
                        policyViolationService.saveDecisions([decision1], true);
                        http.flush();
                    });

                    it('returns rejected promise if result is error', function () {
                        var decision1 = {
                            item: {
                                id: '1234'
                            },
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision1;
                            }
                        },
                            expectedDecision1 = policyViolationService.convertDecision(decision1),
                            responseData = {
                            status: 'Error',
                            errors: ['something went wrong']
                        },
                            success = undefined,
                            reason = undefined;

                        http.expectPOST(url + '/decisions', {
                            decisions: [expectedDecision1]
                        }).respond(200, responseData);
                        policyViolationService.saveDecisions([decision1])['catch'](function (error) {
                            success = false;
                            reason = error;
                        });
                        http.flush();
                        $scope.$apply();
                        $scope.$apply();

                        expect(success).toEqual(false);
                        expect(reason).toEqual(responseData.errors);
                    });

                    it('returns warning if invalidItemCount is greater than zero', function () {
                        var decision1 = {
                            item: {
                                id: '1234'
                            },
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision1;
                            }
                        },
                            expectedDecision1 = policyViolationService.convertDecision(decision1),
                            responseData = {
                            status: 'Warning',
                            attributes: {
                                invalidItemCount: 4
                            }
                        },
                            warnings = undefined;

                        http.expectPOST(url + '/decisions', {
                            decisions: [expectedDecision1]
                        }).respond(200, responseData);
                        policyViolationService.saveDecisions([decision1]).then(function (result) {
                            warnings = result;
                        });
                        http.flush();
                        $scope.$apply();

                        expect(warnings).toBeDefined();
                        expect(warnings.length).toEqual(1);
                    });
                });

                describe('certify', function () {
                    it('throws with no decisions', function () {
                        expect(function () {
                            return policyViolationService.certify();
                        }).toThrow();
                    });

                    it('calls through to convertDecision with the decision and POSTS', function () {
                        var decision = {
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
                            status: 'Certified',
                            getItemId: function () {
                                return undefined;
                            },
                            clone: function () {
                                return decision;
                            }
                        },
                            expectedDecision = policyViolationService.convertDecision(decision);
                        spyOn(policyViolationService, 'convertDecision').and.callThrough();
                        http.expectPOST(url + '/certify', {
                            decisions: [expectedDecision]
                        }).respond(200, { status: 'Success' });
                        policyViolationService.certify(decision);
                        http.flush();
                        expect(policyViolationService.convertDecision).toHaveBeenCalledWith(decision);
                    });

                    it('sets the showAll flag if passed in', function () {
                        var decision = {
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
                            status: 'Certified',
                            getItemId: function () {
                                return undefined;
                            },
                            clone: function () {
                                return decision;
                            }
                        },
                            expectedDecision = policyViolationService.convertDecision(decision);
                        http.expectPOST(url + '/certify', {
                            decisions: [expectedDecision],
                            showAll: true
                        }).respond(200, { status: 'Success' });
                        policyViolationService.certify(decision, true);
                        http.flush();
                    });

                    it('returns resolved promise if result is Success', function () {
                        var decision = {
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
                            status: 'Certified',
                            getItemId: function () {
                                return undefined;
                            },
                            clone: function () {
                                return decision;
                            }
                        },
                            expectedDecision = policyViolationService.convertDecision(decision),
                            resolved = undefined;

                        http.expectPOST(url + '/certify', {
                            decisions: [expectedDecision]
                        }).respond(200, { status: 'Success' });
                        policyViolationService.certify(decision).then(function () {
                            return resolved = true;
                        });
                        http.flush();
                        $scope.$apply();
                        expect(resolved).toEqual(true);
                    });

                    it('returns rejected promise if result is not Success', function () {
                        var decision = {
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
                            status: 'Certified',
                            getItemId: function () {
                                return undefined;
                            },
                            clone: function () {
                                return decision;
                            }
                        },
                            expectedDecision = policyViolationService.convertDecision(decision),
                            resolved = undefined;

                        http.expectPOST(url + '/certify', {
                            decisions: [expectedDecision]
                        }).respond(200, { status: 'Error' });
                        policyViolationService.certify(decision).then(function () {
                            return resolved = true;
                        })['catch'](function () {
                            return resolved = false;
                        });
                        http.flush();
                        $scope.$apply();
                        expect(resolved).toEqual(false);
                    });
                });

                describe('convertDecision', function () {
                    var filterValueService = undefined;

                    beforeEach(inject(function (_filterValueService_) {
                        filterValueService = _filterValueService_;
                    }));

                    it('should convert selectedViolationEntitlements to JSON string', function () {
                        var selectedViolationEntitlements = [{
                            some: 'thing'
                        }],
                            decision = {
                            item: {
                                id: '1234'
                            },
                            selectedViolationEntitlements: selectedViolationEntitlements,
                            getItemId: function () {
                                return '1234';
                            },
                            status: 'Mitigated',
                            clone: function () {
                                return decision;
                            }
                        },
                            converted = policyViolationService.convertDecision(decision);

                        expect(converted.selectedViolationEntitlements).toEqual(angular.toJson(selectedViolationEntitlements));
                    });

                    it('should call filterValueService to convert filterValues', function () {
                        var decision = {
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
                            status: 'Certified',
                            clone: function () {
                                return decision;
                            },
                            getItemId: function () {
                                return undefined;
                            }
                        },
                            converted = undefined;
                        spyOn(filterValueService, 'getQueryParams').and.callThrough();
                        converted = policyViolationService.convertDecision(decision);
                        expect(filterValueService.getQueryParams).toHaveBeenCalled();
                        expect(converted.selectionModel.filterValues).toEqual(filterValueService.getQueryParams(decision.selectionModel.filterValues));
                    });

                    it('should set policyViolationId if there is an item', function () {
                        var itemId = '1234',
                            decision = {
                            clone: function () {
                                return decision;
                            },
                            getItemId: function () {
                                return itemId;
                            }
                        },
                            converted = policyViolationService.convertDecision(decision);
                        expect(converted.policyViolationId).toEqual(itemId);
                    });
                });

                describe('getConfiguration()', function () {
                    var PolicyViolationDecisionConfig = undefined;
                    beforeEach(inject(function (_PolicyViolationDecisionConfig_) {
                        PolicyViolationDecisionConfig = _PolicyViolationDecisionConfig_;
                    }));

                    it('fetches config and initializes PolicyViolationDecisionConfig object', function () {
                        var result = undefined;
                        http.expectGET(url + '/config').respond(200, {});
                        policyViolationService.getConfiguration().then(function (callResult) {
                            return result = callResult;
                        });
                        http.flush();
                        expect(result instanceof PolicyViolationDecisionConfig).toEqual(true);
                    });
                });

                describe('getRemediationAdvice()', function () {
                    var RemediationAdviceResult = undefined;

                    beforeEach(inject(function (_RemediationAdviceResult_) {
                        RemediationAdviceResult = _RemediationAdviceResult_;
                    }));

                    it('throws without violationId', function () {
                        expect(function () {
                            return policyViolationService.getRemediationAdvice();
                        }).toThrow();
                    });

                    it('should return RemediationAdviceResult', function () {
                        var pvId = 'pv1234';

                        http.expectGET(url + '/' + pvId + '/remediationAdvice').respond(200, { advice: {}, summary: {} });
                        policyViolationService.getRemediationAdvice(pvId).then(function (adviceResult) {
                            expect(adviceResult instanceof RemediationAdviceResult).toEqual(true);
                        });
                        http.flush();
                    });
                });

                describe('getRemediationSummary()', function () {
                    var RemediationSummary = undefined;

                    beforeEach(inject(function (_RemediationSummary_) {
                        RemediationSummary = _RemediationSummary_;
                    }));

                    it('throws without violationId', function () {
                        expect(function () {
                            return policyViolationService.getRemediationAdvice();
                        }).toThrow();
                    });

                    function testRemediationSummary(revokedRoles, selectedViolationEntitlements) {
                        var pvId = 'pv1234',
                            input = {};
                        if (revokedRoles) {
                            input.revokedRoles = revokedRoles;
                        } else if (selectedViolationEntitlements) {
                            input.selectedViolationEntitlements = angular.toJson(selectedViolationEntitlements);
                        }
                        http.expectPOST(url + '/' + pvId + '/remediationSummary', input).respond(200, {});
                        policyViolationService.getRemediationSummary(pvId, revokedRoles, selectedViolationEntitlements).then(function (summary) {
                            expect(summary instanceof RemediationSummary).toEqual(true);
                        });
                        http.flush();
                    }

                    it('should return RemediationSummary for revoked roles', function () {
                        var revokedRoles = ['role1', 'role2'];
                        testRemediationSummary(revokedRoles);
                    });

                    it('should return RemediationSummary for selected violation entitlements', function () {
                        var selectedViolationEntitlements = [{}, {}];
                        testRemediationSummary(undefined, selectedViolationEntitlements);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5QyxvQkFBb0IsdUJBQXVCLFVBQVUsU0FBUzs7O0lBRy9JOztJQUVBLElBQUksdUJBQXVCO0lBQzNCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsaUJBQWlCLElBQUksVUFBVSxtQkFBbUI7WUFDM0QsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQkFBMEIsWUFBTTs7Z0JBRXJDLElBQUksT0FBSTtvQkFBRSx5QkFBc0I7b0JBQUUsY0FBVztvQkFBRSxrQkFBZTtvQkFBRSxnQkFBYTtvQkFBRSwwQkFBdUI7b0JBQ2xHLFlBQVM7b0JBQUUsU0FBTTtvQkFBRSxNQUFNOztnQkFFN0IsV0FBVyxPQUFPLHVCQUF1Qjs7Z0JBRXpDLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7Ozs7Z0JBSXpDLFdBQVcsT0FBTyxVQUFDLGdCQUFnQiwwQkFBMEIsbUJBQW1CLGlCQUM1RSxrQkFBa0IsYUFBYSxlQUFlLFlBQWU7O29CQUU3RCxPQUFPO29CQUNQLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtvQkFDMUIsWUFBWTtvQkFDWixjQUFjO29CQUNkLFNBQVMsV0FBVzs7O2dCQUd4QixVQUFVLFlBQU07b0JBQ1osS0FBSztvQkFDTCxLQUFLOzs7Z0JBR1QsU0FBUyx5QkFBeUIsWUFBTTs7b0JBRXBDLElBQUksNEJBQXlCO3dCQUFFLFFBQUs7d0JBQUUsUUFBSzt3QkFBRSxVQUFPOztvQkFFcEQsV0FBVyxZQUFXO3dCQUNsQixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsNEJBQTRCOzRCQUN4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RCxLQUFLOzs7b0JBR1QsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxlQUFlLENBQUMsU0FBUzt3QkFDN0IsdUJBQXVCOzs7b0JBRzNCLEdBQUcsd0VBQXdFLFlBQU07d0JBQzdFLElBQUksZ0NBQWdDLENBQUMsSUFBSTt3QkFDekMsdUJBQXVCLFdBQVc7Ozs7OztHQXFGM0MiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25Nb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAnLi9Qb2xpY3lUZXN0RGF0YSc7XHJcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uU2VydmljZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgaHR0cCwgcG9saWN5VmlvbGF0aW9uU2VydmljZSwgdGVzdFNlcnZpY2UsIFBvbGljeVZpb2xhdGlvbiwgTGlzdFJlc3VsdERUTywgcG9saWN5VmlvbGF0aW9uVGVzdERhdGEsXHJcbiAgICAgICAgU29ydE9yZGVyLCAkc2NvcGUsIHVybCA9ICcvaWRlbnRpdHlpcS91aS9yZXN0L3BvbGljeVZpb2xhdGlvbnMnO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGh0dHBCYWNrZW5kXywgX3BvbGljeVZpb2xhdGlvblNlcnZpY2VfLCBfUG9saWN5VmlvbGF0aW9uXywgX0xpc3RSZXN1bHREVE9fLFxyXG4gICAgICAgIF9wb2xpY3lUZXN0RGF0YV8sIF9Tb3J0T3JkZXJfLCBfdGVzdFNlcnZpY2VfLCAkcm9vdFNjb3BlKSA9PiB7XHJcblxyXG4gICAgICAgIGh0dHAgPSBfJGh0dHBCYWNrZW5kXztcclxuICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvblNlcnZpY2VfO1xyXG4gICAgICAgIFBvbGljeVZpb2xhdGlvbiA9IF9Qb2xpY3lWaW9sYXRpb25fO1xyXG4gICAgICAgIExpc3RSZXN1bHREVE8gPSBfTGlzdFJlc3VsdERUT187XHJcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uVGVzdERhdGEgPSBfcG9saWN5VGVzdERhdGFfO1xyXG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xyXG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XHJcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFBvbGljeVZpb2xhdGlvbnMoKScsICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHBvbGljeVZpb2xhdGlvbkxpc3RSZXN1bHQsIHN0YXJ0LCBsaW1pdCwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSAxMDtcclxuICAgICAgICAgICAgbGltaXQgPSAxMDtcclxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uTGlzdFJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW3BvbGljeVZpb2xhdGlvblRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV8xXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHJpZXZlIHBvbGljeSB2aW9sYXRpb25zIGZyb20gUkVTVCB3aXRoIG51bGwgc29ydCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQodXJsICsgJz9saW1pdD0xMCZzdGFydD0xMCcpXHJcbiAgICAgICAgICAgICAgICAucmVzcG9uZCgyMDAsIHBvbGljeVZpb2xhdGlvbkxpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRQb2xpY3lWaW9sYXRpb25zKHN0YXJ0LCBsaW1pdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ1BvbGljeVZpb2xhdGlvbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSBwb2xpY3kgdmlvbGF0aW9ucyBmcm9tIFJFU1Qgd2l0aCBzb3J0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnP2xpbWl0PTEwJnNvcnQ9JTVCJTVEJnN0YXJ0PTEwJylcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgcG9saWN5VmlvbGF0aW9uTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCkpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdQb2xpY3lWaW9sYXRpb24nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgY29udmVydCBhbmQgcGFzcyB0aHJvdWdoIGZpbHRlciB2YWx1ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NPRCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSB1cmwgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA/bGltaXQ9MTAmc3RhcnQ9MTAmdHlwZT0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVyVmFsdWVzLnR5cGUpfWA7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwgcG9saWN5VmlvbGF0aW9uTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0LCB1bmRlZmluZWQsIGZpbHRlclZhbHVlcyk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmUgdGhlIHJlc3BvbnNlIHdhcyB0cmFuc2Zvcm1lZCBjb3JyZWN0bHkuXHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdMaXN0UmVzdWx0RFRPJyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmNvbnN0cnVjdG9yLm5hbWUpLnRvQmUoJ1BvbGljeVZpb2xhdGlvbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbmNsdWRlIHNob3dBbGwgcGFyYW0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybCArICc/bGltaXQ9MTAmc2hvd0FsbD10cnVlJnN0YXJ0PTEwJykucmVzcG9uZCgyMDAsIHBvbGljeVZpb2xhdGlvbkxpc3RSZXN1bHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRQb2xpY3lWaW9sYXRpb25zKHN0YXJ0LCBsaW1pdCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBhZGQgcXVlcnkgcGFyYW1zIGZyb20gZGVjaXNpb24gc2NvcGUgaWYgcGFzc2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnP2xpbWl0PTEwJmluY2x1ZGVkU3RhdHVzPU9wZW4mc3RhcnQ9MTAnKS5yZXNwb25kKDIwMCwgcG9saWN5VmlvbGF0aW9uTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvblNjb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgYWRkUXVlcnlQYXJhbWV0ZXJzOiAocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmluY2x1ZGVkU3RhdHVzID0gWydPcGVuJ107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFBvbGljeVZpb2xhdGlvbnMoc3RhcnQsIGxpbWl0LCBudWxsLCBudWxsLCBmYWxzZSwgZGVjaXNpb25TY29wZSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZGVjaXNpb25TY29wZSBvbiBQb2xpY3lWaW9sYXRpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnP2xpbWl0PTEwJmluY2x1ZGVkU3RhdHVzPU9wZW4mc3RhcnQ9MTAnKS5yZXNwb25kKDIwMCwgcG9saWN5VmlvbGF0aW9uTGlzdFJlc3VsdCk7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvblNjb3BlID0ge1xyXG4gICAgICAgICAgICAgICAgYWRkUXVlcnlQYXJhbWV0ZXJzOiAocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmluY2x1ZGVkU3RhdHVzID0gWydPcGVuJ107XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnT3BlbicsICdEZWxlZ2F0ZWQnXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRQb2xpY3lWaW9sYXRpb25zKHN0YXJ0LCBsaW1pdCwgbnVsbCwgbnVsbCwgZmFsc2UsIGRlY2lzaW9uU2NvcGUpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSByZXNwb25zZSB3YXMgdHJhbnNmb3JtZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY29uc3RydWN0b3IubmFtZSkudG9CZSgnTGlzdFJlc3VsdERUTycpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXS5jb25zdHJ1Y3Rvci5uYW1lKS50b0JlKCdQb2xpY3lWaW9sYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uZGVjaXNpb25TY29wZSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uZGVjaXNpb25TY29wZS5zdGF0dXNlcykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uZGVjaXNpb25TY29wZS5zdGF0dXNlcy5sZW5ndGgpLnRvQmUoMik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLmRlY2lzaW9uU2NvcGUuc3RhdHVzZXMpLnRvQmUoZGVjaXNpb25TY29wZS5zdGF0dXNlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NhdmVEZWNpc2lvbnMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gZGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gcG9saWN5VmlvbGF0aW9uU2VydmljZS5zYXZlRGVjaXNpb24oKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNvbnZlcnQgdGhlIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uMSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb21lOiAndGhpbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbUlkOiAoKSA9PiAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnTWl0aWdhdGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZTogKCkgPT4gZGVjaXNpb24xXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWREZWNpc2lvbjEgPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNvbnZlcnREZWNpc2lvbihkZWNpc2lvbjEpO1xyXG5cclxuICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uU2VydmljZSwgJ2NvbnZlcnREZWNpc2lvbicpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodXJsICsgJy9kZWNpc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFtleHBlY3RlZERlY2lzaW9uMV1cclxuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHsgZGF0YToge30gfSk7XHJcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhbZGVjaXNpb24xXSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChkZWNpc2lvbjEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnUE9TVFMgY29udmVydGVkIGRlY2lzaW9ucyB0byBzZXJ2ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdNaXRpZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvbjFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uMSA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uMSksXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2FiY2QnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICdhYmNkJyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdEZWxlZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvbjJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uMiA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uMik7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodXJsICsgJy9kZWNpc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFtleHBlY3RlZERlY2lzaW9uMSwgZXhwZWN0ZWREZWNpc2lvbjJdXHJcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7IGRhdGE6IHt9IH0pO1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMoW2RlY2lzaW9uMSwgZGVjaXNpb24yXSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIHNob3dBbGwgZmxhZyBpZiBwYXNzZWQgaW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdNaXRpZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvbjFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uMSA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uMSk7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVCh1cmwgKyAnL2RlY2lzaW9ucycsIHtcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW2V4cGVjdGVkRGVjaXNpb24xXSxcclxuICAgICAgICAgICAgICAgIHNob3dBbGw6IHRydWVcclxuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHsgZGF0YToge30gfSk7XHJcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhbZGVjaXNpb24xXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgcmVqZWN0ZWQgcHJvbWlzZSBpZiByZXN1bHQgaXMgZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdNaXRpZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvbjFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uMSA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uMSksXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc29tZXRoaW5nIHdlbnQgd3JvbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSwgc3VjY2VzcywgcmVhc29uO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKHVybCArICcvZGVjaXNpb25zJywge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbZXhwZWN0ZWREZWNpc2lvbjFdXHJcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCByZXNwb25zZURhdGEpO1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLnNhdmVEZWNpc2lvbnMoW2RlY2lzaW9uMV0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVhc29uID0gZXJyb3I7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHN1Y2Nlc3MpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVhc29uKS50b0VxdWFsKHJlc3BvbnNlRGF0YS5lcnJvcnMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB3YXJuaW5nIGlmIGludmFsaWRJdGVtQ291bnQgaXMgZ3JlYXRlciB0aGFuIHplcm8nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbjEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdNaXRpZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvbjFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uMSA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uMSksXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnV2FybmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkSXRlbUNvdW50OiA0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgd2FybmluZ3M7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodXJsICsgJy9kZWNpc2lvbnMnLCB7XHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFtleHBlY3RlZERlY2lzaW9uMV1cclxuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHJlc3BvbnNlRGF0YSk7XHJcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvblNlcnZpY2Uuc2F2ZURlY2lzaW9ucyhbZGVjaXNpb24xXSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3YXJuaW5ncyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHdhcm5pbmdzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qod2FybmluZ3MubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NlcnRpZnknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY2VydGlmeSgpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGNvbnZlcnREZWNpc2lvbiB3aXRoIHRoZSBkZWNpc2lvbiBhbmQgUE9TVFMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWYWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbWVib2R5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdpdXNlZHRva25vdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnc29tZWJvZHknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdDZXJ0aWZpZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldEl0ZW1JZDogKCkgPT4gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkRGVjaXNpb24gPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNvbnZlcnREZWNpc2lvbihkZWNpc2lvbik7XHJcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvblNlcnZpY2UsICdjb252ZXJ0RGVjaXNpb24nKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKHVybCArICcvY2VydGlmeScsIHtcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW2V4cGVjdGVkRGVjaXNpb25dXHJcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7IHN0YXR1czogJ1N1Y2Nlc3MnIH0pO1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNlcnRpZnkoZGVjaXNpb24pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNvbnZlcnREZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoZGVjaXNpb24pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgc2hvd0FsbCBmbGFnIGlmIHBhc3NlZCBpbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tZWJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2l1c2VkdG9rbm93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdzb21lYm9keSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0NlcnRpZmllZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbUlkOiAoKSA9PiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmU6ICgpID0+IGRlY2lzaW9uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWREZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uKTtcclxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKHVybCArICcvY2VydGlmeScsIHtcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW2V4cGVjdGVkRGVjaXNpb25dLFxyXG4gICAgICAgICAgICAgICAgc2hvd0FsbDogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5yZXNwb25kKDIwMCwgeyBzdGF0dXM6ICdTdWNjZXNzJyB9KTtcclxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uU2VydmljZS5jZXJ0aWZ5KGRlY2lzaW9uLCB0cnVlKTtcclxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyByZXNvbHZlZCBwcm9taXNlIGlmIHJlc3VsdCBpcyBTdWNjZXNzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnaXVzZWR0b2tub3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3NvbWVib2R5J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnQ2VydGlmaWVkJyxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZTogKCkgPT4gZGVjaXNpb25cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZERlY2lzaW9uID0gcG9saWN5VmlvbGF0aW9uU2VydmljZS5jb252ZXJ0RGVjaXNpb24oZGVjaXNpb24pLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWQ7XHJcblxyXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QodXJsICsgJy9jZXJ0aWZ5Jywge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbZXhwZWN0ZWREZWNpc2lvbl1cclxuICAgICAgICAgICAgfSkucmVzcG9uZCgyMDAsIHsgc3RhdHVzOiAnU3VjY2VzcycgfSk7XHJcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY2VydGlmeShkZWNpc2lvbikudGhlbigoKSA9PiByZXNvbHZlZCA9IHRydWUpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyByZWplY3RlZCBwcm9taXNlIGlmIHJlc3VsdCBpcyBub3QgU3VjY2VzcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29tZWJvZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2l1c2VkdG9rbm93JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdzb21lYm9keSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ0NlcnRpZmllZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbUlkOiAoKSA9PiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmU6ICgpID0+IGRlY2lzaW9uXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWREZWNpc2lvbiA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uKSxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKHVybCArICcvY2VydGlmeScsIHtcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogW2V4cGVjdGVkRGVjaXNpb25dXHJcbiAgICAgICAgICAgIH0pLnJlc3BvbmQoMjAwLCB7IHN0YXR1czogJ0Vycm9yJyB9KTtcclxuICAgICAgICAgICAgcG9saWN5VmlvbGF0aW9uU2VydmljZS5jZXJ0aWZ5KGRlY2lzaW9uKS50aGVuKCgpID0+IHJlc29sdmVkID0gdHJ1ZSkuY2F0Y2goKCkgPT4gcmVzb2x2ZWQgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnZlcnREZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICBsZXQgZmlsdGVyVmFsdWVTZXJ2aWNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2ZpbHRlclZhbHVlU2VydmljZV8pID0+IHtcclxuICAgICAgICAgICAgZmlsdGVyVmFsdWVTZXJ2aWNlID0gX2ZpbHRlclZhbHVlU2VydmljZV87XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNvbnZlcnQgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMgdG8gSlNPTiBzdHJpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgc29tZTogJ3RoaW5nJ1xyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzOiBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtSWQ6ICgpID0+ICcxMjM0JyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdNaXRpZ2F0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lOiAoKSA9PiBkZWNpc2lvblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbnZlcnRlZCA9IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuY29udmVydERlY2lzaW9uKGRlY2lzaW9uKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChjb252ZXJ0ZWQuc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpXHJcbiAgICAgICAgICAgICAgICAudG9FcXVhbChhbmd1bGFyLnRvSnNvbihzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZmlsdGVyVmFsdWVTZXJ2aWNlIHRvIGNvbnZlcnQgZmlsdGVyVmFsdWVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb21lYm9keToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnaXVzZWR0b2tub3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3NvbWVib2R5J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnQ2VydGlmaWVkJyxcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZTogKCkgPT4gZGVjaXNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbUlkOiAoKSA9PiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH0sIGNvbnZlcnRlZDtcclxuICAgICAgICAgICAgc3B5T24oZmlsdGVyVmFsdWVTZXJ2aWNlLCAnZ2V0UXVlcnlQYXJhbXMnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICAgICAgY29udmVydGVkID0gcG9saWN5VmlvbGF0aW9uU2VydmljZS5jb252ZXJ0RGVjaXNpb24oZGVjaXNpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoZmlsdGVyVmFsdWVTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb252ZXJ0ZWQuc2VsZWN0aW9uTW9kZWwuZmlsdGVyVmFsdWVzKVxyXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoZmlsdGVyVmFsdWVTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1zKGRlY2lzaW9uLnNlbGVjdGlvbk1vZGVsLmZpbHRlclZhbHVlcykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHNldCBwb2xpY3lWaW9sYXRpb25JZCBpZiB0aGVyZSBpcyBhbiBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbUlkID0gJzEyMzQnLFxyXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvbmU6ICgpID0+IGRlY2lzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGdldEl0ZW1JZDogKCkgPT4gaXRlbUlkXHJcbiAgICAgICAgICAgICAgICB9LCBjb252ZXJ0ZWQgPSBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmNvbnZlcnREZWNpc2lvbihkZWNpc2lvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb252ZXJ0ZWQucG9saWN5VmlvbGF0aW9uSWQpLnRvRXF1YWwoaXRlbUlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRDb25maWd1cmF0aW9uKCknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnO1xyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWdfKSA9PiB7XHJcbiAgICAgICAgICAgIFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnID0gX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uQ29uZmlnXztcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdmZXRjaGVzIGNvbmZpZyBhbmQgaW5pdGlhbGl6ZXMgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25Db25maWcgb2JqZWN0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwgKyAnL2NvbmZpZycpLnJlc3BvbmQoMjAwLCB7fSk7XHJcbiAgICAgICAgICAgIHBvbGljeVZpb2xhdGlvblNlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbigpLnRoZW4oKGNhbGxSZXN1bHQpID0+IHJlc3VsdCA9IGNhbGxSZXN1bHQpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHQgaW5zdGFuY2VvZiBQb2xpY3lWaW9sYXRpb25EZWNpc2lvbkNvbmZpZykudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRSZW1lZGlhdGlvbkFkdmljZSgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBSZW1lZGlhdGlvbkFkdmljZVJlc3VsdDtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9SZW1lZGlhdGlvbkFkdmljZVJlc3VsdF8pID0+IHtcclxuICAgICAgICAgICAgUmVtZWRpYXRpb25BZHZpY2VSZXN1bHQgPSBfUmVtZWRpYXRpb25BZHZpY2VSZXN1bHRfO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IHZpb2xhdGlvbklkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gcG9saWN5VmlvbGF0aW9uU2VydmljZS5nZXRSZW1lZGlhdGlvbkFkdmljZSgpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIFJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcHZJZCA9ICdwdjEyMzQnO1xyXG5cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RHRVQoYCR7dXJsfS8ke3B2SWR9L3JlbWVkaWF0aW9uQWR2aWNlYClcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwgeyBhZHZpY2U6IHt9LCBzdW1tYXJ5OiB7fX0pO1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFJlbWVkaWF0aW9uQWR2aWNlKHB2SWQpLnRoZW4oKGFkdmljZVJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFkdmljZVJlc3VsdCBpbnN0YW5jZW9mIFJlbWVkaWF0aW9uQWR2aWNlUmVzdWx0KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldFJlbWVkaWF0aW9uU3VtbWFyeSgpJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBSZW1lZGlhdGlvblN1bW1hcnk7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUmVtZWRpYXRpb25TdW1tYXJ5XykgPT4ge1xyXG4gICAgICAgICAgICBSZW1lZGlhdGlvblN1bW1hcnkgPSBfUmVtZWRpYXRpb25TdW1tYXJ5XztcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCB2aW9sYXRpb25JZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHBvbGljeVZpb2xhdGlvblNlcnZpY2UuZ2V0UmVtZWRpYXRpb25BZHZpY2UoKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0UmVtZWRpYXRpb25TdW1tYXJ5KHJldm9rZWRSb2xlcywgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpIHtcclxuICAgICAgICAgICAgbGV0IHB2SWQgPSAncHYxMjM0JyxcclxuICAgICAgICAgICAgICAgIGlucHV0ID0ge307XHJcbiAgICAgICAgICAgIGlmIChyZXZva2VkUm9sZXMpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LnJldm9rZWRSb2xlcyA9IHJldm9rZWRSb2xlcztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMgPSBhbmd1bGFyLnRvSnNvbihzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKGAke3VybH0vJHtwdklkfS9yZW1lZGlhdGlvblN1bW1hcnlgLCBpbnB1dClcclxuICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwge30pO1xyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25TZXJ2aWNlLmdldFJlbWVkaWF0aW9uU3VtbWFyeShwdklkLCByZXZva2VkUm9sZXMsIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHN1bW1hcnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3VtbWFyeSBpbnN0YW5jZW9mIFJlbWVkaWF0aW9uU3VtbWFyeSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBSZW1lZGlhdGlvblN1bW1hcnkgZm9yIHJldm9rZWQgcm9sZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXZva2VkUm9sZXMgPSBbJ3JvbGUxJywgJ3JvbGUyJ107XHJcbiAgICAgICAgICAgIHRlc3RSZW1lZGlhdGlvblN1bW1hcnkocmV2b2tlZFJvbGVzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gUmVtZWRpYXRpb25TdW1tYXJ5IGZvciBzZWxlY3RlZCB2aW9sYXRpb24gZW50aXRsZW1lbnRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMgPSBbe30sIHt9XTtcclxuICAgICAgICAgICAgdGVzdFJlbWVkaWF0aW9uU3VtbWFyeSh1bmRlZmluZWQsIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
