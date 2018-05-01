System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/model/MockViewState'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationModelMockViewState) {}],
        execute: function () {

            describe('certificationViewState', function () {

                var CertificationViewState = undefined,
                    MockViewState = undefined,
                    Certification = undefined,
                    cert = undefined,
                    state = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_Certification_, _CertificationViewState_, _MockViewState_, certificationTestData) {
                    Certification = _Certification_;
                    CertificationViewState = _CertificationViewState_;
                    MockViewState = _MockViewState_;

                    cert = new Certification(certificationTestData.CERTIFICATION_1);

                    state = new MockViewState();
                }));

                it('initializes tab configs upon construction', function () {
                    expect(state.tabConfigs).toEqual(MockViewState.TAB_CONFIGS);
                });

                describe('reset', function () {
                    var cert = { some: 'reallyAwesomeThing' };

                    it('sets the certification', function () {
                        state.reset(cert);
                        expect(state.certification).toEqual(cert);
                    });

                    it('resets selections', function () {
                        state.reset(cert);

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = MockViewState.ALL_TABLES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var table = _step.value;

                                expect(table.clearCheckboxSelections).toHaveBeenCalled();
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    });

                    it('constrains the current page', function () {
                        spyOn(state, 'constrainCurrentPage');
                        state.reset(cert);
                        expect(state.constrainCurrentPage).toHaveBeenCalled();
                    });

                    it('initializes the current tab', function () {
                        spyOn(state, 'initializeCurrentTab');
                        state.reset(cert);
                        expect(state.initializeCurrentTab).toHaveBeenCalled();
                    });
                });

                it('initializeFilters() calls through to all tables', function () {
                    var filters = { these: 'Are the filters ... MY FRIEND!!!!  And they\'ll keep on fighting till the end' };
                    state.initializeFilters(filters);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = MockViewState.ALL_TABLES[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var table = _step2.value;

                            expect(table.initializeFilters).toHaveBeenCalledWith(filters);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                _iterator2['return']();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                });

                it('setupCheckboxModels() calls through to all tables', function () {
                    state.setupCheckboxModels();
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = MockViewState.ALL_TABLES[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var table = _step3.value;

                            expect(table.setupCheckboxModel).toHaveBeenCalled();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                _iterator3['return']();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                });

                it('constrainCurrentPage() restricts the page state total based on the counts', function () {
                    var table0 = MockViewState.createTable(false, 44);
                    var table1 = MockViewState.createTable(true, 13);
                    var table2 = MockViewState.createTable(true, 8);
                    var tab0 = MockViewState.createTab('non active tab', [table0]);
                    var tab1 = MockViewState.createTab('active tab', [table1, table2]);

                    state = new MockViewState([tab0, tab1]);
                    state.changeTab(tab1.name);
                    state.constrainCurrentPage();
                    expect(table0.getDataTableConfig().getPagingData().setTotal).toHaveBeenCalledWith(44);
                    expect(table1.getDataTableConfig().getPagingData().setTotal).toHaveBeenCalledWith(13);
                    expect(table2.getDataTableConfig().getPagingData().setTotal).toHaveBeenCalledWith(8);
                });

                describe('refreshCurrentTab()', function () {
                    beforeEach(function () {
                        state.changeTab(MockViewState.TAB1.name);
                    });

                    it('refreshes tables on the current tab', function () {
                        state.refreshCurrentTab();
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = MockViewState.TAB1.tables[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var table = _step4.value;

                                expect(table.refresh).toHaveBeenCalled();
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                    _iterator4['return']();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    });

                    it('does not refresh tables on other tabs', function () {
                        state.refreshCurrentTab();
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = MockViewState.TAB2.tables[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var table = _step5.value;

                                expect(table.refresh).not.toHaveBeenCalled();
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                                    _iterator5['return']();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    });
                });

                it('getCurrentTabConfig() returns the tab for the currently selected tab', function () {
                    state.changeTab(MockViewState.TAB2.name);
                    expect(state.getCurrentTabConfig()).toEqual(MockViewState.TAB2);
                });

                it('getTabCount() delegates to the requested tab', function () {
                    var count = state.getTabCount(MockViewState.TAB1.name);
                    expect(MockViewState.TAB1.getCount).toHaveBeenCalledWith(state.getItemStatusCount());
                    expect(count).toEqual(5);
                });

                it('isTableDisplayed() delegates to the requested table', function () {
                    var isDisplayed = state.isTableDisplayed(MockViewState.TABLE1A);
                    expect(MockViewState.TABLE1A.isDisplayed).toHaveBeenCalled();
                    expect(isDisplayed).toEqual(true);
                });

                describe('initializeCurrentTab()', function () {
                    beforeEach(function () {
                        var tables = [MockViewState.createTable(true)];
                        var actionRequiredTab = MockViewState.createTab(CertificationViewState.Tab.ActionRequired, tables);
                        var decisionsLeftTab = MockViewState.createTab(CertificationViewState.Tab.DecisionsLeft, tables);
                        var completeTab = MockViewState.createTab(CertificationViewState.Tab.Complete, tables);

                        state = new MockViewState([actionRequiredTab, decisionsLeftTab, completeTab]);
                        state.reset(cert);
                        state.changeTab(undefined);
                    });

                    function makeTabsEmpty(emptyTabs) {
                        spyOn(state, 'isTabEmpty').and.callFake(function (tabName) {
                            return !!emptyTabs.find(function (current) {
                                return current === tabName;
                            });
                        });
                    }

                    it('shows complete tab if cert is signed', function () {
                        cert.signOffComplete = true;
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.Complete);
                    });

                    it('shows action required tab if non-empty', function () {
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.ActionRequired);
                    });

                    it('shows the decisions left tab if there is an empty action required tab', function () {
                        makeTabsEmpty([CertificationViewState.Tab.ActionRequired]);
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.DecisionsLeft);
                    });

                    it('shows the complete tab if there are no decisions left', function () {
                        makeTabsEmpty([CertificationViewState.Tab.ActionRequired, CertificationViewState.Tab.DecisionsLeft]);
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.Complete);
                    });

                    it('shows the action required tab if current tab is empty', function () {
                        state.changeTab(CertificationViewState.Tab.Complete);
                        makeTabsEmpty([CertificationViewState.Tab.Complete]);
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.ActionRequired);
                    });

                    it('stays on current tab if not empty', function () {
                        state.changeTab(CertificationViewState.Tab.Complete);
                        state.initializeCurrentTab();
                        expect(state.getCurrentTab()).toEqual(CertificationViewState.Tab.Complete);
                    });
                });

                describe('getTableData()', function () {
                    it('returns passed in data if no default data defined', function () {
                        expect(state.getTableData({ a: 'b' })).toEqual({ a: 'b' });
                    });

                    it('returns combination of default and passed in data if default defined', function () {
                        state = new MockViewState(undefined, { def: 'this' });
                        expect(state.getTableData({ a: 'b' })).toEqual({
                            a: 'b',
                            def: 'this'
                        });
                        expect(state.defaultTableData).toEqual({ def: 'this' });
                    });

                    it('should set the default grouping for entitlement owner certifications', function () {
                        state = new MockViewState(undefined, { certificationType: Certification.Type.DataOwner });
                        expect(state.getTableData({}).sectionHeader).toEqual('exceptionAttributeValue');
                    });

                    it('should not override grouping set the default grouping for entitlement owner certifications', function () {
                        state = new MockViewState(undefined, { sectionHeader: 'someValue' });
                        expect(state.getTableData({}).sectionHeader).toEqual('someValue');
                    });

                    it('should set the default grouping for account group membership certifications', function () {
                        state = new MockViewState(undefined, { certificationType: Certification.Type.AccountGroupMembership });
                        expect(state.getTableData({}).sectionHeader).toEqual('accountGroup');
                    });

                    it('should not override grouping set the default grouping for account group membership certifications', function () {
                        state = new MockViewState(undefined, { sectionHeader: 'someValue' });
                        expect(state.getTableData({}).sectionHeader).toEqual('someValue');
                    });

                    it('should set the default grouping for account group permissions certifications', function () {
                        state = new MockViewState(undefined, { certificationType: Certification.Type.AccountGroupPermissions });
                        expect(state.getTableData({}).sectionHeader).toEqual('accountGroup');
                    });

                    it('should not override grouping set the default grouping for account group permissions certifications', function () {
                        state = new MockViewState(undefined, { sectionHeader: 'someValue' });
                        expect(state.getTableData({}).sectionHeader).toEqual('someValue');
                    });

                    it('should set the default grouping for role membership certifications', function () {
                        state = new MockViewState(undefined, { certificationType: Certification.Type.BusinessRoleMembership });
                        expect(state.getTableData({}).sectionHeader).toEqual('displayName');
                    });

                    it('should set the default grouping for role composition certifications', function () {
                        state = new MockViewState(undefined, { certificationType: Certification.Type.BusinessRoleComposition });
                        expect(state.getTableData({}).sectionHeader).toEqual('parentTargetDisplayName');
                    });

                    it('should not set a default grouping for other cert types', function () {
                        state = new MockViewState(undefined, { defaultTableData: {
                                certificationType: Certification.Type.Identity
                            } });
                        expect(state.getTableData({}).sectionHeader).not.toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblZpZXdTdGF0ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsOENBQThDLFVBQVUsU0FBUzs7O0lBRzlJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdDQUF3QztRQUNyRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsMEJBQTBCLFlBQU07O2dCQUVyQyxJQUFJLHlCQUFzQjtvQkFBRSxnQkFBYTtvQkFBRSxnQkFBYTtvQkFBRSxPQUFJO29CQUFFLFFBQUs7O2dCQUVyRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxpQkFBaUIsMEJBQTBCLGlCQUFpQix1QkFBMEI7b0JBQ3JHLGdCQUFnQjtvQkFDaEIseUJBQXlCO29CQUN6QixnQkFBZ0I7O29CQUVoQixPQUFPLElBQUksY0FBYyxzQkFBc0I7O29CQUUvQyxRQUFRLElBQUk7OztnQkFHaEIsR0FBRyw2Q0FBNkMsWUFBTTtvQkFDbEQsT0FBTyxNQUFNLFlBQVksUUFBUSxjQUFjOzs7Z0JBR25ELFNBQVMsU0FBUyxZQUFNO29CQUNwQixJQUFJLE9BQU8sRUFBRSxNQUFNOztvQkFFbkIsR0FBRywwQkFBMEIsWUFBTTt3QkFDL0IsTUFBTSxNQUFNO3dCQUNaLE9BQU8sTUFBTSxlQUFlLFFBQVE7OztvQkFHeEMsR0FBRyxxQkFBcUIsWUFBTTt3QkFDMUIsTUFBTSxNQUFNOzt3QkFZQSxJQUFJLDRCQUE0Qjt3QkFDaEMsSUFBSSxvQkFBb0I7d0JBQ3hCLElBQUksaUJBQWlCOzt3QkFFckIsSUFBSTs0QkFkaEIsS0FBQSxJQUFBLFlBQWtCLGNBQWMsV0FBVSxPQUFBLGFBQUEsT0FBQSxFQUFBLDRCQUFBLENBQUEsUUFBQSxVQUFBLFFBQUEsT0FBQSw0QkFBQSxNQUFFO2dDQWdCeEIsSUFoQlgsUUFBSyxNQUFBOztnQ0FDVixPQUFPLE1BQU0seUJBQXlCOzswQkFtQjVCLE9BQU8sS0FBSzs0QkFDVixvQkFBb0I7NEJBQ3BCLGlCQUFpQjtrQ0FDWDs0QkFDTixJQUFJO2dDQUNBLElBQUksQ0FBQyw2QkFBNkIsVUFBVSxXQUFXO29DQUNuRCxVQUFVOztzQ0FFUjtnQ0FDTixJQUFJLG1CQUFtQjtvQ0FDbkIsTUFBTTs7Ozs7O29CQXpCbEMsR0FBRywrQkFBK0IsWUFBTTt3QkFDcEMsTUFBTSxPQUFPO3dCQUNiLE1BQU0sTUFBTTt3QkFDWixPQUFPLE1BQU0sc0JBQXNCOzs7b0JBR3ZDLEdBQUcsK0JBQStCLFlBQU07d0JBQ3BDLE1BQU0sT0FBTzt3QkFDYixNQUFNLE1BQU07d0JBQ1osT0FBTyxNQUFNLHNCQUFzQjs7OztnQkFJM0MsR0FBRyxtREFBbUQsWUFBTTtvQkFDeEQsSUFBSSxVQUFVLEVBQUUsT0FBTztvQkFDdkIsTUFBTSxrQkFBa0I7b0JBZ0NaLElBQUksNkJBQTZCO29CQUNqQyxJQUFJLHFCQUFxQjtvQkFDekIsSUFBSSxrQkFBa0I7O29CQUV0QixJQUFJO3dCQW5DaEIsS0FBQSxJQUFBLGFBQWtCLGNBQWMsV0FBVSxPQUFBLGFBQUEsUUFBQSxFQUFBLDZCQUFBLENBQUEsU0FBQSxXQUFBLFFBQUEsT0FBQSw2QkFBQSxNQUFFOzRCQXFDeEIsSUFyQ1gsUUFBSyxPQUFBOzs0QkFDVixPQUFPLE1BQU0sbUJBQW1CLHFCQUFxQjs7c0JBd0MzQyxPQUFPLEtBQUs7d0JBQ1YscUJBQXFCO3dCQUNyQixrQkFBa0I7OEJBQ1o7d0JBQ04sSUFBSTs0QkFDQSxJQUFJLENBQUMsOEJBQThCLFdBQVcsV0FBVztnQ0FDckQsV0FBVzs7a0NBRVQ7NEJBQ04sSUFBSSxvQkFBb0I7Z0NBQ3BCLE1BQU07Ozs7OztnQkE5Q2xDLEdBQUcscURBQXFELFlBQU07b0JBQzFELE1BQU07b0JBcURNLElBQUksNkJBQTZCO29CQUNqQyxJQUFJLHFCQUFxQjtvQkFDekIsSUFBSSxrQkFBa0I7O29CQUV0QixJQUFJO3dCQXhEaEIsS0FBQSxJQUFBLGFBQWtCLGNBQWMsV0FBVSxPQUFBLGFBQUEsUUFBQSxFQUFBLDZCQUFBLENBQUEsU0FBQSxXQUFBLFFBQUEsT0FBQSw2QkFBQSxNQUFFOzRCQTBEeEIsSUExRFgsUUFBSyxPQUFBOzs0QkFDVixPQUFPLE1BQU0sb0JBQW9COztzQkE2RHZCLE9BQU8sS0FBSzt3QkFDVixxQkFBcUI7d0JBQ3JCLGtCQUFrQjs4QkFDWjt3QkFDTixJQUFJOzRCQUNBLElBQUksQ0FBQyw4QkFBOEIsV0FBVyxXQUFXO2dDQUNyRCxXQUFXOztrQ0FFVDs0QkFDTixJQUFJLG9CQUFvQjtnQ0FDcEIsTUFBTTs7Ozs7O2dCQW5FbEMsR0FBRyw2RUFBNkUsWUFBTTtvQkFDbEYsSUFBSSxTQUFTLGNBQWMsWUFBWSxPQUFPO29CQUM5QyxJQUFJLFNBQVMsY0FBYyxZQUFZLE1BQU07b0JBQzdDLElBQUksU0FBUyxjQUFjLFlBQVksTUFBTTtvQkFDN0MsSUFBSSxPQUFPLGNBQWMsVUFBVSxrQkFBa0IsQ0FBRTtvQkFDdkQsSUFBSSxPQUFPLGNBQWMsVUFBVSxjQUFjLENBQUUsUUFBUTs7b0JBRTNELFFBQVEsSUFBSSxjQUFjLENBQUUsTUFBTTtvQkFDbEMsTUFBTSxVQUFVLEtBQUs7b0JBQ3JCLE1BQU07b0JBQ04sT0FBTyxPQUFPLHFCQUFxQixnQkFBZ0IsVUFBVSxxQkFBcUI7b0JBQ2xGLE9BQU8sT0FBTyxxQkFBcUIsZ0JBQWdCLFVBQVUscUJBQXFCO29CQUNsRixPQUFPLE9BQU8scUJBQXFCLGdCQUFnQixVQUFVLHFCQUFxQjs7O2dCQUd0RixTQUFTLHVCQUF1QixZQUFNO29CQUNsQyxXQUFXLFlBQU07d0JBQ2IsTUFBTSxVQUFVLGNBQWMsS0FBSzs7O29CQUd2QyxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxNQUFNO3dCQTBFTSxJQUFJLDZCQUE2Qjt3QkFDakMsSUFBSSxxQkFBcUI7d0JBQ3pCLElBQUksa0JBQWtCOzt3QkFFdEIsSUFBSTs0QkE3RWhCLEtBQUEsSUFBQSxhQUFrQixjQUFjLEtBQUssT0FBTSxPQUFBLGFBQUEsUUFBQSxFQUFBLDZCQUFBLENBQUEsU0FBQSxXQUFBLFFBQUEsT0FBQSw2QkFBQSxNQUFFO2dDQStFekIsSUEvRVgsUUFBSyxPQUFBOztnQ0FDVixPQUFPLE1BQU0sU0FBUzs7MEJBa0ZaLE9BQU8sS0FBSzs0QkFDVixxQkFBcUI7NEJBQ3JCLGtCQUFrQjtrQ0FDWjs0QkFDTixJQUFJO2dDQUNBLElBQUksQ0FBQyw4QkFBOEIsV0FBVyxXQUFXO29DQUNyRCxXQUFXOztzQ0FFVDtnQ0FDTixJQUFJLG9CQUFvQjtvQ0FDcEIsTUFBTTs7Ozs7O29CQXhGbEMsR0FBRyx5Q0FBeUMsWUFBTTt3QkFDOUMsTUFBTTt3QkErRk0sSUFBSSw2QkFBNkI7d0JBQ2pDLElBQUkscUJBQXFCO3dCQUN6QixJQUFJLGtCQUFrQjs7d0JBRXRCLElBQUk7NEJBbEdoQixLQUFBLElBQUEsYUFBa0IsY0FBYyxLQUFLLE9BQU0sT0FBQSxhQUFBLFFBQUEsRUFBQSw2QkFBQSxDQUFBLFNBQUEsV0FBQSxRQUFBLE9BQUEsNkJBQUEsTUFBRTtnQ0FvR3pCLElBcEdYLFFBQUssT0FBQTs7Z0NBQ1YsT0FBTyxNQUFNLFNBQVMsSUFBSTs7MEJBdUdoQixPQUFPLEtBQUs7NEJBQ1YscUJBQXFCOzRCQUNyQixrQkFBa0I7a0NBQ1o7NEJBQ04sSUFBSTtnQ0FDQSxJQUFJLENBQUMsOEJBQThCLFdBQVcsV0FBVztvQ0FDckQsV0FBVzs7c0NBRVQ7Z0NBQ04sSUFBSSxvQkFBb0I7b0NBQ3BCLE1BQU07Ozs7Ozs7Z0JBNUd0QyxHQUFHLHdFQUF3RSxZQUFNO29CQUM3RSxNQUFNLFVBQVUsY0FBYyxLQUFLO29CQUNuQyxPQUFPLE1BQU0sdUJBQXVCLFFBQVEsY0FBYzs7O2dCQUc5RCxHQUFHLGdEQUFnRCxZQUFNO29CQUNyRCxJQUFJLFFBQVEsTUFBTSxZQUFZLGNBQWMsS0FBSztvQkFDakQsT0FBTyxjQUFjLEtBQUssVUFBVSxxQkFBcUIsTUFBTTtvQkFDL0QsT0FBTyxPQUFPLFFBQVE7OztnQkFHMUIsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsSUFBSSxjQUFjLE1BQU0saUJBQWlCLGNBQWM7b0JBQ3ZELE9BQU8sY0FBYyxRQUFRLGFBQWE7b0JBQzFDLE9BQU8sYUFBYSxRQUFROzs7Z0JBR2hDLFNBQVMsMEJBQTBCLFlBQU07b0JBQ3JDLFdBQVcsWUFBTTt3QkFDYixJQUFJLFNBQVMsQ0FBRSxjQUFjLFlBQVk7d0JBQ3pDLElBQUksb0JBQW9CLGNBQWMsVUFBVSx1QkFBdUIsSUFBSSxnQkFBZ0I7d0JBQzNGLElBQUksbUJBQW1CLGNBQWMsVUFBVSx1QkFBdUIsSUFBSSxlQUFlO3dCQUN6RixJQUFJLGNBQWMsY0FBYyxVQUFVLHVCQUF1QixJQUFJLFVBQVU7O3dCQUUvRSxRQUFRLElBQUksY0FBYyxDQUFFLG1CQUFtQixrQkFBa0I7d0JBQ2pFLE1BQU0sTUFBTTt3QkFDWixNQUFNLFVBQVU7OztvQkFHcEIsU0FBUyxjQUFjLFdBQVc7d0JBQzlCLE1BQU0sT0FBTyxjQUFjLElBQUksU0FBUyxVQUFDLFNBQU87NEJBb0hoQyxPQXBIcUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFDLFNBQU87Z0NBcUgxRCxPQXJIK0QsWUFBWTs7Ozs7b0JBR25HLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLEtBQUssa0JBQWtCO3dCQUN2QixNQUFNO3dCQUNOLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSx1QkFBdUIsSUFBSTs7O29CQUdyRSxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxNQUFNO3dCQUNOLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSx1QkFBdUIsSUFBSTs7O29CQUdyRSxHQUFHLHlFQUF5RSxZQUFNO3dCQUM5RSxjQUFjLENBQUUsdUJBQXVCLElBQUk7d0JBQzNDLE1BQU07d0JBQ04sT0FBTyxNQUFNLGlCQUFpQixRQUFRLHVCQUF1QixJQUFJOzs7b0JBR3JFLEdBQUcseURBQXlELFlBQU07d0JBQzlELGNBQWMsQ0FBRSx1QkFBdUIsSUFBSSxnQkFBZ0IsdUJBQXVCLElBQUk7d0JBQ3RGLE1BQU07d0JBQ04sT0FBTyxNQUFNLGlCQUFpQixRQUFRLHVCQUF1QixJQUFJOzs7b0JBR3JFLEdBQUcseURBQXlELFlBQU07d0JBQzlELE1BQU0sVUFBVSx1QkFBdUIsSUFBSTt3QkFDM0MsY0FBYyxDQUFFLHVCQUF1QixJQUFJO3dCQUMzQyxNQUFNO3dCQUNOLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSx1QkFBdUIsSUFBSTs7O29CQUdyRSxHQUFHLHFDQUFxQyxZQUFNO3dCQUMxQyxNQUFNLFVBQVUsdUJBQXVCLElBQUk7d0JBQzNDLE1BQU07d0JBQ04sT0FBTyxNQUFNLGlCQUFpQixRQUFRLHVCQUF1QixJQUFJOzs7O2dCQUl6RSxTQUFTLGtCQUFrQixZQUFNO29CQUM3QixHQUFHLHFEQUFxRCxZQUFNO3dCQUMxRCxPQUFPLE1BQU0sYUFBYSxFQUFFLEdBQUcsUUFBUSxRQUFRLEVBQUUsR0FBSTs7O29CQUd6RCxHQUFHLHdFQUF3RSxZQUFNO3dCQUM3RSxRQUFRLElBQUksY0FBYyxXQUFXLEVBQUUsS0FBSzt3QkFDNUMsT0FBTyxNQUFNLGFBQWEsRUFBRSxHQUFHLFFBQVEsUUFBUTs0QkFDM0MsR0FBRzs0QkFDSCxLQUFLOzt3QkFFVCxPQUFPLE1BQU0sa0JBQWtCLFFBQVEsRUFBRSxLQUFLOzs7b0JBR2xELEdBQUcsd0VBQXdFLFlBQU07d0JBQzdFLFFBQVEsSUFBSSxjQUFjLFdBQVcsRUFBRSxtQkFBbUIsY0FBYyxLQUFLO3dCQUM3RSxPQUFPLE1BQU0sYUFBYSxJQUFJLGVBQWUsUUFBUTs7O29CQUd6RCxHQUFHLDhGQUE4RixZQUFNO3dCQUNuRyxRQUFRLElBQUksY0FBYyxXQUFXLEVBQUUsZUFBZTt3QkFDdEQsT0FBTyxNQUFNLGFBQWEsSUFBSSxlQUFlLFFBQVE7OztvQkFHekQsR0FBRywrRUFBK0UsWUFBTTt3QkFDcEYsUUFBUSxJQUFJLGNBQWMsV0FBVyxFQUFFLG1CQUFtQixjQUFjLEtBQUs7d0JBQzdFLE9BQU8sTUFBTSxhQUFhLElBQUksZUFBZSxRQUFROzs7b0JBR3pELEdBQUcscUdBQXFHLFlBQU07d0JBQzFHLFFBQVEsSUFBSSxjQUFjLFdBQVcsRUFBRSxlQUFlO3dCQUN0RCxPQUFPLE1BQU0sYUFBYSxJQUFJLGVBQWUsUUFBUTs7O29CQUd6RCxHQUFHLGdGQUFnRixZQUFNO3dCQUNyRixRQUFRLElBQUksY0FBYyxXQUFXLEVBQUUsbUJBQW1CLGNBQWMsS0FBSzt3QkFDN0UsT0FBTyxNQUFNLGFBQWEsSUFBSSxlQUFlLFFBQVE7OztvQkFHekQsR0FBRyxzR0FBc0csWUFBTTt3QkFDM0csUUFBUSxJQUFJLGNBQWMsV0FBVyxFQUFFLGVBQWU7d0JBQ3RELE9BQU8sTUFBTSxhQUFhLElBQUksZUFBZSxRQUFROzs7b0JBR3pELEdBQUcsc0VBQXNFLFlBQU07d0JBQzNFLFFBQVEsSUFBSSxjQUFjLFdBQVcsRUFBRSxtQkFBbUIsY0FBYyxLQUFLO3dCQUM3RSxPQUFPLE1BQU0sYUFBYSxJQUFJLGVBQWUsUUFBUTs7O29CQUd6RCxHQUFHLHVFQUF1RSxZQUFNO3dCQUM1RSxRQUFRLElBQUksY0FBYyxXQUFXLEVBQUUsbUJBQW1CLGNBQWMsS0FBSzt3QkFDN0UsT0FBTyxNQUFNLGFBQWEsSUFBSSxlQUFlLFFBQVE7OztvQkFHekQsR0FBRywwREFBMEQsWUFBTTt3QkFDL0QsUUFBUSxJQUFJLGNBQWMsV0FBVyxFQUFFLGtCQUFrQjtnQ0FDckQsbUJBQW1CLGNBQWMsS0FBSzs7d0JBRTFDLE9BQU8sTUFBTSxhQUFhLElBQUksZUFBZSxJQUFJOzs7Ozs7R0E2SDFEIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblZpZXdTdGF0ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jZXJ0aWZpY2F0aW9uL21vZGVsL01vY2tWaWV3U3RhdGUnO1xuXG5kZXNjcmliZSgnY2VydGlmaWNhdGlvblZpZXdTdGF0ZScsICgpID0+IHtcblxuICAgIGxldCBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLCBNb2NrVmlld1N0YXRlLCBDZXJ0aWZpY2F0aW9uLCBjZXJ0LCBzdGF0ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfQ2VydGlmaWNhdGlvbl8sIF9DZXJ0aWZpY2F0aW9uVmlld1N0YXRlXywgX01vY2tWaWV3U3RhdGVfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEpID0+IHtcbiAgICAgICAgQ2VydGlmaWNhdGlvbiA9IF9DZXJ0aWZpY2F0aW9uXztcbiAgICAgICAgQ2VydGlmaWNhdGlvblZpZXdTdGF0ZSA9IF9DZXJ0aWZpY2F0aW9uVmlld1N0YXRlXztcbiAgICAgICAgTW9ja1ZpZXdTdGF0ZSA9IF9Nb2NrVmlld1N0YXRlXztcblxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG5cbiAgICAgICAgc3RhdGUgPSBuZXcgTW9ja1ZpZXdTdGF0ZSgpO1xuICAgIH0pKTtcblxuICAgIGl0KCdpbml0aWFsaXplcyB0YWIgY29uZmlncyB1cG9uIGNvbnN0cnVjdGlvbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHN0YXRlLnRhYkNvbmZpZ3MpLnRvRXF1YWwoTW9ja1ZpZXdTdGF0ZS5UQUJfQ09ORklHUyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzZXQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjZXJ0ID0geyBzb21lOiAncmVhbGx5QXdlc29tZVRoaW5nJyB9O1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSBjZXJ0aWZpY2F0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUucmVzZXQoY2VydCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuY2VydGlmaWNhdGlvbikudG9FcXVhbChjZXJ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Jlc2V0cyBzZWxlY3Rpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUucmVzZXQoY2VydCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHRhYmxlIG9mIE1vY2tWaWV3U3RhdGUuQUxMX1RBQkxFUykge1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5jbGVhckNoZWNrYm94U2VsZWN0aW9ucykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY29uc3RyYWlucyB0aGUgY3VycmVudCBwYWdlJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3RhdGUsICdjb25zdHJhaW5DdXJyZW50UGFnZScpO1xuICAgICAgICAgICAgc3RhdGUucmVzZXQoY2VydCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuY29uc3RyYWluQ3VycmVudFBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIHRoZSBjdXJyZW50IHRhYicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHN0YXRlLCAnaW5pdGlhbGl6ZUN1cnJlbnRUYWInKTtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KGNlcnQpO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmluaXRpYWxpemVDdXJyZW50VGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2luaXRpYWxpemVGaWx0ZXJzKCkgY2FsbHMgdGhyb3VnaCB0byBhbGwgdGFibGVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgZmlsdGVycyA9IHsgdGhlc2U6ICdBcmUgdGhlIGZpbHRlcnMgLi4uIE1ZIEZSSUVORCEhISEgIEFuZCB0aGV5XFwnbGwga2VlcCBvbiBmaWdodGluZyB0aWxsIHRoZSBlbmQnIH07XG4gICAgICAgIHN0YXRlLmluaXRpYWxpemVGaWx0ZXJzKGZpbHRlcnMpO1xuICAgICAgICBmb3IgKGxldCB0YWJsZSBvZiBNb2NrVmlld1N0YXRlLkFMTF9UQUJMRVMpIHtcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5pbml0aWFsaXplRmlsdGVycykudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmlsdGVycyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdzZXR1cENoZWNrYm94TW9kZWxzKCkgY2FsbHMgdGhyb3VnaCB0byBhbGwgdGFibGVzJywgKCkgPT4ge1xuICAgICAgICBzdGF0ZS5zZXR1cENoZWNrYm94TW9kZWxzKCk7XG4gICAgICAgIGZvciAobGV0IHRhYmxlIG9mIE1vY2tWaWV3U3RhdGUuQUxMX1RBQkxFUykge1xuICAgICAgICAgICAgZXhwZWN0KHRhYmxlLnNldHVwQ2hlY2tib3hNb2RlbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnY29uc3RyYWluQ3VycmVudFBhZ2UoKSByZXN0cmljdHMgdGhlIHBhZ2Ugc3RhdGUgdG90YWwgYmFzZWQgb24gdGhlIGNvdW50cycsICgpID0+IHtcbiAgICAgICAgbGV0IHRhYmxlMCA9IE1vY2tWaWV3U3RhdGUuY3JlYXRlVGFibGUoZmFsc2UsIDQ0KTtcbiAgICAgICAgbGV0IHRhYmxlMSA9IE1vY2tWaWV3U3RhdGUuY3JlYXRlVGFibGUodHJ1ZSwgMTMpO1xuICAgICAgICBsZXQgdGFibGUyID0gTW9ja1ZpZXdTdGF0ZS5jcmVhdGVUYWJsZSh0cnVlLCA4KTtcbiAgICAgICAgbGV0IHRhYjAgPSBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYignbm9uIGFjdGl2ZSB0YWInLCBbIHRhYmxlMCBdKTtcbiAgICAgICAgbGV0IHRhYjEgPSBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYignYWN0aXZlIHRhYicsIFsgdGFibGUxLCB0YWJsZTIgXSk7XG5cbiAgICAgICAgc3RhdGUgPSBuZXcgTW9ja1ZpZXdTdGF0ZShbIHRhYjAsIHRhYjEgXSk7XG4gICAgICAgIHN0YXRlLmNoYW5nZVRhYih0YWIxLm5hbWUpO1xuICAgICAgICBzdGF0ZS5jb25zdHJhaW5DdXJyZW50UGFnZSgpO1xuICAgICAgICBleHBlY3QodGFibGUwLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKS5zZXRUb3RhbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoNDQpO1xuICAgICAgICBleHBlY3QodGFibGUxLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKS5zZXRUb3RhbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMTMpO1xuICAgICAgICBleHBlY3QodGFibGUyLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKS5zZXRUb3RhbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoOCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVmcmVzaEN1cnJlbnRUYWIoKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS5jaGFuZ2VUYWIoTW9ja1ZpZXdTdGF0ZS5UQUIxLm5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVmcmVzaGVzIHRhYmxlcyBvbiB0aGUgY3VycmVudCB0YWInLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS5yZWZyZXNoQ3VycmVudFRhYigpO1xuICAgICAgICAgICAgZm9yIChsZXQgdGFibGUgb2YgTW9ja1ZpZXdTdGF0ZS5UQUIxLnRhYmxlcykge1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0YWJsZS5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCByZWZyZXNoIHRhYmxlcyBvbiBvdGhlciB0YWJzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUucmVmcmVzaEN1cnJlbnRUYWIoKTtcbiAgICAgICAgICAgIGZvciAobGV0IHRhYmxlIG9mIE1vY2tWaWV3U3RhdGUuVEFCMi50YWJsZXMpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QodGFibGUucmVmcmVzaCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0Q3VycmVudFRhYkNvbmZpZygpIHJldHVybnMgdGhlIHRhYiBmb3IgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0YWInLCAoKSA9PiB7XG4gICAgICAgIHN0YXRlLmNoYW5nZVRhYihNb2NrVmlld1N0YXRlLlRBQjIubmFtZSk7XG4gICAgICAgIGV4cGVjdChzdGF0ZS5nZXRDdXJyZW50VGFiQ29uZmlnKCkpLnRvRXF1YWwoTW9ja1ZpZXdTdGF0ZS5UQUIyKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRUYWJDb3VudCgpIGRlbGVnYXRlcyB0byB0aGUgcmVxdWVzdGVkIHRhYicsICgpID0+IHtcbiAgICAgICAgbGV0IGNvdW50ID0gc3RhdGUuZ2V0VGFiQ291bnQoTW9ja1ZpZXdTdGF0ZS5UQUIxLm5hbWUpO1xuICAgICAgICBleHBlY3QoTW9ja1ZpZXdTdGF0ZS5UQUIxLmdldENvdW50KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzdGF0ZS5nZXRJdGVtU3RhdHVzQ291bnQoKSk7XG4gICAgICAgIGV4cGVjdChjb3VudCkudG9FcXVhbCg1KTtcbiAgICB9KTtcblxuICAgIGl0KCdpc1RhYmxlRGlzcGxheWVkKCkgZGVsZWdhdGVzIHRvIHRoZSByZXF1ZXN0ZWQgdGFibGUnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpc0Rpc3BsYXllZCA9IHN0YXRlLmlzVGFibGVEaXNwbGF5ZWQoTW9ja1ZpZXdTdGF0ZS5UQUJMRTFBKTtcbiAgICAgICAgZXhwZWN0KE1vY2tWaWV3U3RhdGUuVEFCTEUxQS5pc0Rpc3BsYXllZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoaXNEaXNwbGF5ZWQpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZUN1cnJlbnRUYWIoKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFibGVzID0gWyBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYmxlKHRydWUpIF07XG4gICAgICAgICAgICBsZXQgYWN0aW9uUmVxdWlyZWRUYWIgPSBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYihDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5BY3Rpb25SZXF1aXJlZCwgdGFibGVzKTtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnNMZWZ0VGFiID0gTW9ja1ZpZXdTdGF0ZS5jcmVhdGVUYWIoQ2VydGlmaWNhdGlvblZpZXdTdGF0ZS5UYWIuRGVjaXNpb25zTGVmdCwgdGFibGVzKTtcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZVRhYiA9IE1vY2tWaWV3U3RhdGUuY3JlYXRlVGFiKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkNvbXBsZXRlLCB0YWJsZXMpO1xuXG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKFsgYWN0aW9uUmVxdWlyZWRUYWIsIGRlY2lzaW9uc0xlZnRUYWIsIGNvbXBsZXRlVGFiIF0pO1xuICAgICAgICAgICAgc3RhdGUucmVzZXQoY2VydCk7XG4gICAgICAgICAgICBzdGF0ZS5jaGFuZ2VUYWIodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbWFrZVRhYnNFbXB0eShlbXB0eVRhYnMpIHtcbiAgICAgICAgICAgIHNweU9uKHN0YXRlLCAnaXNUYWJFbXB0eScpLmFuZC5jYWxsRmFrZSgodGFiTmFtZSkgPT4gISFlbXB0eVRhYnMuZmluZCgoY3VycmVudCkgPT4gY3VycmVudCA9PT0gdGFiTmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Nob3dzIGNvbXBsZXRlIHRhYiBpZiBjZXJ0IGlzIHNpZ25lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNlcnQuc2lnbk9mZkNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVDdXJyZW50VGFiKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0Q3VycmVudFRhYigpKS50b0VxdWFsKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGFjdGlvbiByZXF1aXJlZCB0YWIgaWYgbm9uLWVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZUN1cnJlbnRUYWIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRDdXJyZW50VGFiKCkpLnRvRXF1YWwoQ2VydGlmaWNhdGlvblZpZXdTdGF0ZS5UYWIuQWN0aW9uUmVxdWlyZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgdGhlIGRlY2lzaW9ucyBsZWZ0IHRhYiBpZiB0aGVyZSBpcyBhbiBlbXB0eSBhY3Rpb24gcmVxdWlyZWQgdGFiJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFrZVRhYnNFbXB0eShbIENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkFjdGlvblJlcXVpcmVkIF0pO1xuICAgICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZUN1cnJlbnRUYWIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRDdXJyZW50VGFiKCkpLnRvRXF1YWwoQ2VydGlmaWNhdGlvblZpZXdTdGF0ZS5UYWIuRGVjaXNpb25zTGVmdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyB0aGUgY29tcGxldGUgdGFiIGlmIHRoZXJlIGFyZSBubyBkZWNpc2lvbnMgbGVmdCcsICgpID0+IHtcbiAgICAgICAgICAgIG1ha2VUYWJzRW1wdHkoWyBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5BY3Rpb25SZXF1aXJlZCwgQ2VydGlmaWNhdGlvblZpZXdTdGF0ZS5UYWIuRGVjaXNpb25zTGVmdCBdKTtcbiAgICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVDdXJyZW50VGFiKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0Q3VycmVudFRhYigpKS50b0VxdWFsKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBhY3Rpb24gcmVxdWlyZWQgdGFiIGlmIGN1cnJlbnQgdGFiIGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUuY2hhbmdlVGFiKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkNvbXBsZXRlKTtcbiAgICAgICAgICAgIG1ha2VUYWJzRW1wdHkoWyBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5Db21wbGV0ZSBdKTtcbiAgICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVDdXJyZW50VGFiKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0Q3VycmVudFRhYigpKS50b0VxdWFsKENlcnRpZmljYXRpb25WaWV3U3RhdGUuVGFiLkFjdGlvblJlcXVpcmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3N0YXlzIG9uIGN1cnJlbnQgdGFiIGlmIG5vdCBlbXB0eScsICgpID0+IHtcbiAgICAgICAgICAgIHN0YXRlLmNoYW5nZVRhYihDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5Db21wbGV0ZSk7XG4gICAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplQ3VycmVudFRhYigpO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmdldEN1cnJlbnRUYWIoKSkudG9FcXVhbChDZXJ0aWZpY2F0aW9uVmlld1N0YXRlLlRhYi5Db21wbGV0ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFRhYmxlRGF0YSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBwYXNzZWQgaW4gZGF0YSBpZiBubyBkZWZhdWx0IGRhdGEgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRUYWJsZURhdGEoeyBhOiAnYicgfSkpLnRvRXF1YWwoeyBhIDogJ2InIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBjb21iaW5hdGlvbiBvZiBkZWZhdWx0IGFuZCBwYXNzZWQgaW4gZGF0YSBpZiBkZWZhdWx0IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKHVuZGVmaW5lZCwgeyBkZWY6ICd0aGlzJyB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRUYWJsZURhdGEoeyBhOiAnYicgfSkpLnRvRXF1YWwoe1xuICAgICAgICAgICAgICAgIGE6ICdiJyxcbiAgICAgICAgICAgICAgICBkZWY6ICd0aGlzJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZGVmYXVsdFRhYmxlRGF0YSkudG9FcXVhbCh7IGRlZjogJ3RoaXMnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3IgZW50aXRsZW1lbnQgb3duZXIgY2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKHVuZGVmaW5lZCwgeyBjZXJ0aWZpY2F0aW9uVHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lciB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRUYWJsZURhdGEoe30pLnNlY3Rpb25IZWFkZXIpLnRvRXF1YWwoJ2V4Y2VwdGlvbkF0dHJpYnV0ZVZhbHVlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IG92ZXJyaWRlIGdyb3VwaW5nIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3IgZW50aXRsZW1lbnQgb3duZXIgY2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKHVuZGVmaW5lZCwgeyBzZWN0aW9uSGVhZGVyOiAnc29tZVZhbHVlJyB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRUYWJsZURhdGEoe30pLnNlY3Rpb25IZWFkZXIpLnRvRXF1YWwoJ3NvbWVWYWx1ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3IgYWNjb3VudCBncm91cCBtZW1iZXJzaGlwIGNlcnRpZmljYXRpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUgPSBuZXcgTW9ja1ZpZXdTdGF0ZSh1bmRlZmluZWQsIHsgY2VydGlmaWNhdGlvblR5cGU6IENlcnRpZmljYXRpb24uVHlwZS5BY2NvdW50R3JvdXBNZW1iZXJzaGlwIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmdldFRhYmxlRGF0YSh7fSkuc2VjdGlvbkhlYWRlcikudG9FcXVhbCgnYWNjb3VudEdyb3VwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IG92ZXJyaWRlIGdyb3VwaW5nIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3IgYWNjb3VudCBncm91cCBtZW1iZXJzaGlwIGNlcnRpZmljYXRpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUgPSBuZXcgTW9ja1ZpZXdTdGF0ZSh1bmRlZmluZWQsIHsgc2VjdGlvbkhlYWRlcjogJ3NvbWVWYWx1ZScgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0VGFibGVEYXRhKHt9KS5zZWN0aW9uSGVhZGVyKS50b0VxdWFsKCdzb21lVmFsdWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGRlZmF1bHQgZ3JvdXBpbmcgZm9yIGFjY291bnQgZ3JvdXAgcGVybWlzc2lvbnMgY2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKHVuZGVmaW5lZCwgeyBjZXJ0aWZpY2F0aW9uVHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cFBlcm1pc3Npb25zIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmdldFRhYmxlRGF0YSh7fSkuc2VjdGlvbkhlYWRlcikudG9FcXVhbCgnYWNjb3VudEdyb3VwJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IG92ZXJyaWRlIGdyb3VwaW5nIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3IgYWNjb3VudCBncm91cCBwZXJtaXNzaW9ucyBjZXJ0aWZpY2F0aW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vY2tWaWV3U3RhdGUodW5kZWZpbmVkLCB7IHNlY3Rpb25IZWFkZXI6ICdzb21lVmFsdWUnIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHN0YXRlLmdldFRhYmxlRGF0YSh7fSkuc2VjdGlvbkhlYWRlcikudG9FcXVhbCgnc29tZVZhbHVlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBkZWZhdWx0IGdyb3VwaW5nIGZvciByb2xlIG1lbWJlcnNoaXAgY2VydGlmaWNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZSA9IG5ldyBNb2NrVmlld1N0YXRlKHVuZGVmaW5lZCwgeyBjZXJ0aWZpY2F0aW9uVHlwZTogQ2VydGlmaWNhdGlvbi5UeXBlLkJ1c2luZXNzUm9sZU1lbWJlcnNoaXAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0VGFibGVEYXRhKHt9KS5zZWN0aW9uSGVhZGVyKS50b0VxdWFsKCdkaXNwbGF5TmFtZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgZGVmYXVsdCBncm91cGluZyBmb3Igcm9sZSBjb21wb3NpdGlvbiBjZXJ0aWZpY2F0aW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vY2tWaWV3U3RhdGUodW5kZWZpbmVkLCB7IGNlcnRpZmljYXRpb25UeXBlOiBDZXJ0aWZpY2F0aW9uLlR5cGUuQnVzaW5lc3NSb2xlQ29tcG9zaXRpb24gfSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RhdGUuZ2V0VGFibGVEYXRhKHt9KS5zZWN0aW9uSGVhZGVyKS50b0VxdWFsKCdwYXJlbnRUYXJnZXREaXNwbGF5TmFtZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzZXQgYSBkZWZhdWx0IGdyb3VwaW5nIGZvciBvdGhlciBjZXJ0IHR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RhdGUgPSBuZXcgTW9ja1ZpZXdTdGF0ZSh1bmRlZmluZWQsIHsgZGVmYXVsdFRhYmxlRGF0YToge1xuICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25UeXBlOiBDZXJ0aWZpY2F0aW9uLlR5cGUuSWRlbnRpdHlcbiAgICAgICAgICAgIH19KTtcbiAgICAgICAgICAgIGV4cGVjdChzdGF0ZS5nZXRUYWJsZURhdGEoe30pLnNlY3Rpb25IZWFkZXIpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
