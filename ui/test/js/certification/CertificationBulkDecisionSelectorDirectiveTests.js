System.register(['certification/CertificationModule', 'test/js/TestInitializer'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}],
        execute: function () {

            describe('CertificationBulkDecisionSelectorDirective', function () {

                var elementDefinition = '<sp-certification-bulk-decision-selector sp-certification="cert"' + ' sp-bulk-decisions="decisions " sp-checkbox-multi-select="checkboxMultiSelect"' + ' sp-filter-values="filters" sp-table="table" />',
                    $scope = undefined,
                    $compile = undefined,
                    checkboxMultiSelect = undefined,
                    cert = undefined,
                    isReadOnly = undefined,
                    table = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function ($rootScope, _$compile_, certificationTestData, Certification, CheckboxMultiSelect, certificationItemService, CertificationTable) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;

                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    checkboxMultiSelect = new CheckboxMultiSelect();

                    isReadOnly = false;
                    spyOn(certificationItemService, 'isItemReadOnly').and.callFake(function () {
                        return isReadOnly;
                    });

                    table = new CertificationTable({ columnConfigKey: 'foo' });
                    table.getDataTableConfig().pageState.pagingData.setTotal(0);
                }));

                function createElement(decisions) {
                    var element = angular.element(elementDefinition);
                    $scope.cert = cert;
                    $scope.decisions = decisions;
                    $scope.checkboxMultiSelect = checkboxMultiSelect;
                    $scope.filters = {
                        filter: 'this'
                    };
                    $scope.table = table;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function testSelector(decisions, expectElement, expectEnabled) {
                    var element = createElement(decisions);
                    var span = element.find('#bulkDecisionSelector');

                    expect(span.length).toEqual(expectElement ? 1 : 0);

                    if (expectElement) {
                        var button = element.find('button');
                        expect(button.attr('disabled')).toEqual(!expectEnabled ? 'disabled' : undefined);
                    }

                    return element;
                }

                it('is not displayed if there are no decisions', function () {
                    var decisions = null;
                    testSelector(decisions, false, false);
                });

                it('is not displayed if the cert is not editable', function () {
                    cert.editable = false;
                    testSelector(['Decision1'], false, false);
                });

                it('is displayed if there are bulk decisions', function () {
                    var decisions = ['Approve', 'Revoke'];
                    testSelector(decisions, true, false);
                });

                it('is enabled if items are selected', function () {
                    var decisions = ['Approve'];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234', isChallengedState: function () {
                            return false;
                        } });
                    testSelector(decisions, true, true);
                });

                it('is disabled if no items are selected', function () {
                    var decisions = ['Approve'];
                    spyOn(checkboxMultiSelect.getSelectionModel(), 'hasSelections').and.returnValue(false);
                    testSelector(decisions, true, false);
                });

                it('is disabled if only read only items are selected', function () {
                    var decisions = ['Approve'];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234', isChallengedState: function () {
                            return false;
                        } });
                    isReadOnly = true;
                    testSelector(decisions, true, false);
                });

                it('is disabled if select everything was checked, but all items were removed', function () {
                    // pretend we selected everything
                    checkboxMultiSelect.getSelectionModel().isInclude = false;
                    var decisions = ['Approve'];
                    testSelector(decisions, true, false);
                });

                it('is disabled if selected item is challenged', function () {
                    var decisions = ['Reassign'];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234', isChallengedState: function () {
                            return true;
                        } });
                    testSelector(decisions, true, false);
                });

                it('contains a menu item for each decision', function () {
                    var decisions = ['bulk1', 'bulk2', 'bulk3'];
                    var element = createElement(decisions);

                    var listItems = element.find('li');
                    expect(listItems.length).toEqual(decisions.length);

                    for (var i = 0; i < listItems.length; i++) {
                        var anchor = angular.element(listItems[i]).find('a');
                        expect(anchor.text().trim()).toEqual('cert_bulk_decision_' + decisions[i]);
                    }
                });

                it('shows button with action name and item count if there is only one decision available', function () {
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234', isChallengedState: function () {
                            return false;
                        } });

                    var decisions = ['bulk1'],
                        element = createElement(decisions),
                        button = element.find('button');

                    expect(button.length).toEqual(1);

                    var btnInnerText = button[0].innerText.trim();

                    expect(btnInnerText.startsWith('cert_bulk_decision_' + decisions[0])).toEqual(true);
                    expect(btnInnerText.indexOf('1 ui_selected')).not.toEqual(-1);
                });

                describe('click', function () {
                    var certificationBulkDecisionService = undefined,
                        certificationDataService = undefined,
                        $rootScope = undefined,
                        cancelDecision = undefined,
                        fakeDecision = undefined,
                        element = undefined,
                        spModal = undefined,
                        $q = undefined,
                        hasDecision = undefined;

                    var decisions = ['decision1', 'Reassign', 'RevokeAccount'];

                    beforeEach(inject(function (_certificationBulkDecisionService_, _certificationDataService_, _$rootScope_, _$q_, _spModal_) {
                        certificationBulkDecisionService = _certificationBulkDecisionService_;
                        certificationDataService = _certificationDataService_;
                        $rootScope = _$rootScope_;
                        spModal = _spModal_;
                        $q = _$q_;

                        // Mock out the bulk decision service to return a promise.
                        cancelDecision = false;
                        fakeDecision = 'look ma ... no hands!';
                        spyOn(certificationBulkDecisionService, 'bulkDecide').and.callFake(function () {
                            if (cancelDecision) {
                                return $q.reject();
                            }
                            return $q.when(fakeDecision);
                        });
                        spyOn(certificationDataService.decisions, 'addBulkDecision');

                        // Add a selection.
                        checkboxMultiSelect.getSelectionModel().add({
                            id: '1',
                            isChallengedState: function () {
                                return false;
                            },
                            decisionStatus: {
                                hasDecision: jasmine.createSpy().and.callFake(function () {
                                    return hasDecision;
                                })
                            }
                        });
                        hasDecision = true;
                        // Create the element.
                        element = createElement(decisions);
                    }));

                    function click(decisionIndex) {
                        var anchors = element.find('a');
                        angular.element(anchors[decisionIndex ? decisionIndex : 0]).click();
                    }

                    it('removes read only selections and does not save decision if empty', function () {
                        isReadOnly = true;
                        click();
                        expect(checkboxMultiSelect.getSelectionModel().getSelectionIds()).not.toContain('1');
                        expect(certificationBulkDecisionService.bulkDecide).not.toHaveBeenCalled();
                    });

                    it('removes items that do not have the account decision', function () {
                        hasDecision = false;
                        click(2);
                        expect(checkboxMultiSelect.getSelectionModel().getSelectionIds()).not.toContain('1');
                        expect(certificationBulkDecisionService.bulkDecide).not.toHaveBeenCalled();
                    });

                    it('shows confirm dialog when items are filtered for reassign action', function () {
                        spyOn(spModal, 'confirm').and.returnValue($q.when());
                        checkboxMultiSelect.getSelectionModel().add({ id: '2', isChallengedState: function () {
                                return false;
                            } });
                        spyOn(checkboxMultiSelect.getSelectionModel(), 'filterSelections').and.returnValue({
                            size: function () {
                                return 1;
                            }
                        });
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);
                        click(1);
                        expect(spModal.confirm).toHaveBeenCalled();
                    });

                    it('calls bulkDecide', function () {
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);
                        click();
                        expect(certificationBulkDecisionService.bulkDecide).toHaveBeenCalledWith(decisions[0], checkboxMultiSelect.getSelectionModel(), $scope.filters, 1, table);
                    });

                    it('adds a bulk decision after bulk deciding', function () {
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);
                        click();
                        $rootScope.$digest();
                        expect(certificationDataService.decisions.addBulkDecision).toHaveBeenCalledWith(fakeDecision);
                    });

                    it('clears the selection model after bulk deciding', function () {
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);
                        spyOn(checkboxMultiSelect.getSelectionModel(), 'clear');
                        click();
                        $rootScope.$digest();
                        expect(checkboxMultiSelect.getSelectionModel().clear).toHaveBeenCalled();
                    });

                    it('does not add a bulk decision if bulk deciding was cancelled', function () {
                        cancelDecision = true;
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);

                        click();
                        $rootScope.$digest();
                        expect(certificationDataService.decisions.addBulkDecision).not.toHaveBeenCalled();
                    });

                    it('does not clear the selection model if bulk deciding was cancelled', function () {
                        cancelDecision = true;
                        spyOn(checkboxMultiSelect.getSelectionModel(), 'clear');
                        spyOn(checkboxMultiSelect, 'getSelectionCount').and.returnValue(1);
                        click();
                        $rootScope.$digest();
                        expect(checkboxMultiSelect.getSelectionModel().clear).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlbGVjdG9yRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMscUNBQXFDLDRCQUE0QixVQUFVLFNBQVM7OztJQUdqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw4Q0FBOEMsWUFBVzs7Z0JBRTlELElBQUksb0JBQW9CLHFFQUNwQixtRkFDQTtvQkFDQSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsc0JBQW1CO29CQUFFLE9BQUk7b0JBQUUsYUFBVTtvQkFBRSxRQUFLOztnQkFFbEUsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSx1QkFBdUIsZUFBZSxxQkFDOUQsMEJBQTBCLG9CQUFvQjtvQkFDckUsU0FBUyxXQUFXO29CQUNwQixXQUFXOztvQkFFWCxPQUFPLElBQUksY0FBYyxzQkFBc0I7b0JBQy9DLHNCQUFzQixJQUFJOztvQkFFMUIsYUFBYTtvQkFDYixNQUFNLDBCQUEwQixrQkFBa0IsSUFBSSxTQUFTLFlBQU07d0JBQUUsT0FBTzs7O29CQUU5RSxRQUFRLElBQUksbUJBQW1CLEVBQUUsaUJBQWlCO29CQUNsRCxNQUFNLHFCQUFxQixVQUFVLFdBQVcsU0FBUzs7O2dCQUc3RCxTQUFTLGNBQWMsV0FBVztvQkFDOUIsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsT0FBTyxPQUFPO29CQUNkLE9BQU8sWUFBWTtvQkFDbkIsT0FBTyxzQkFBc0I7b0JBQzdCLE9BQU8sVUFBVTt3QkFDYixRQUFROztvQkFFWixPQUFPLFFBQVE7b0JBQ2YsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLGFBQWEsV0FB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TSxvQkFBb0IscUJBQXFCLG9CQUFvQixJQUFJLFlBQVk7NEJBQy9FLE1BQU0sWUFBQTtnQ0FnQ1UsT0FoQ0o7Ozt3QkFFaEIsTUFBTSxxQkFBcUIscUJBQXFCLElBQUksWUFBWTt3QkFDaEUsTUFBTTt3QkFDTixPQUFPLFFBQVEsU0FBUzs7O29CQUc1QixHQUFHLG9CQUFvQixZQUFNO3dCQUN6QixNQUFNLHFCQUFxQixxQkFBcUIsSUFBSSxZQUFZO3dCQUNoRTt3QkFDQSxPQUFPLGlDQUFpQyxZQUNwQyxxQkFBcUIsVUFBVSxJQUFJLG9CQUFvQixxQkFBcUIsT0FBTyxTQUFTLEdBQUc7OztvQkFHdkcsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsTUFBTSxxQkFBcUIscUJBQXFCLElBQUksWUFBWTt3QkFDaEU7d0JBQ0EsV0FBVzt3QkFDWCxPQUFPLHlCQUF5QixVQUFVLGlCQUFpQixxQkFBcUI7OztvQkFHcEYsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsTUFBTSxxQkFBcUIscUJBQXFCLElBQUksWUFBWTt3QkFDaEUsTUFBTSxvQkFBb0IscUJBQXFCO3dCQUMvQzt3QkFDQSxXQUFXO3dCQUNYLE9BQU8sb0JBQW9CLG9CQUFvQixPQUFPOzs7b0JBRzFELEdBQUcsK0RBQStELFlBQU07d0JBQ3BFLGlCQUFpQjt3QkFDakIsTUFBTSxxQkFBcUIscUJBQXFCLElBQUksWUFBWTs7d0JBRWhFO3dCQUNBLFdBQVc7d0JBQ1gsT0FBTyx5QkFBeUIsVUFBVSxpQkFBaUIsSUFBSTs7O29CQUduRSxHQUFHLHFFQUFxRSxZQUFNO3dCQUMxRSxpQkFBaUI7d0JBQ2pCLE1BQU0sb0JBQW9CLHFCQUFxQjt3QkFDL0MsTUFBTSxxQkFBcUIscUJBQXFCLElBQUksWUFBWTt3QkFDaEU7d0JBQ0EsV0FBVzt3QkFDWCxPQUFPLG9CQUFvQixvQkFBb0IsT0FBTyxJQUFJOzs7Ozs7R0FzQ25FIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlbGVjdG9yRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5cclxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZWxlY3RvckRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9ICc8c3AtY2VydGlmaWNhdGlvbi1idWxrLWRlY2lzaW9uLXNlbGVjdG9yIHNwLWNlcnRpZmljYXRpb249XCJjZXJ0XCInICtcclxuICAgICAgICAnIHNwLWJ1bGstZGVjaXNpb25zPVwiZGVjaXNpb25zIFwiIHNwLWNoZWNrYm94LW11bHRpLXNlbGVjdD1cImNoZWNrYm94TXVsdGlTZWxlY3RcIicgK1xyXG4gICAgICAgICcgc3AtZmlsdGVyLXZhbHVlcz1cImZpbHRlcnNcIiBzcC10YWJsZT1cInRhYmxlXCIgLz4nLFxyXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGUsIGNoZWNrYm94TXVsdGlTZWxlY3QsIGNlcnQsIGlzUmVhZE9ubHksIHRhYmxlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIENlcnRpZmljYXRpb24sIENoZWNrYm94TXVsdGlTZWxlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UsIENlcnRpZmljYXRpb25UYWJsZSkge1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuXHJcbiAgICAgICAgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xyXG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QgPSBuZXcgQ2hlY2tib3hNdWx0aVNlbGVjdCgpO1xyXG5cclxuICAgICAgICBpc1JlYWRPbmx5ID0gZmFsc2U7XHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnaXNJdGVtUmVhZE9ubHknKS5hbmQuY2FsbEZha2UoKCkgPT4geyByZXR1cm4gaXNSZWFkT25seTsgfSk7XHJcblxyXG4gICAgICAgIHRhYmxlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZSh7IGNvbHVtbkNvbmZpZ0tleTogJ2ZvbycgfSk7XHJcbiAgICAgICAgdGFibGUuZ2V0RGF0YVRhYmxlQ29uZmlnKCkucGFnZVN0YXRlLnBhZ2luZ0RhdGEuc2V0VG90YWwoMCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChkZWNpc2lvbnMpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgJHNjb3BlLmNlcnQgPSBjZXJ0O1xyXG4gICAgICAgICRzY29wZS5kZWNpc2lvbnMgPSBkZWNpc2lvbnM7XHJcbiAgICAgICAgJHNjb3BlLmNoZWNrYm94TXVsdGlTZWxlY3QgPSBjaGVja2JveE11bHRpU2VsZWN0O1xyXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0ge1xyXG4gICAgICAgICAgICBmaWx0ZXI6ICd0aGlzJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLnRhYmxlID0gdGFibGU7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdFNlbGVjdG9yKGRlY2lzaW9ucywgZXhwZWN0RWxlbWVudCwgZXhwZWN0RW5hYmxlZCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChkZWNpc2lvbnMpO1xyXG4gICAgICAgIGxldCBzcGFuID0gZWxlbWVudC5maW5kKCcjYnVsa0RlY2lzaW9uU2VsZWN0b3InKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHNwYW4ubGVuZ3RoKS50b0VxdWFsKChleHBlY3RFbGVtZW50KSA/IDEgOiAwKTtcclxuXHJcbiAgICAgICAgaWYgKGV4cGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChidXR0b24uYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCghZXhwZWN0RW5hYmxlZCA/ICdkaXNhYmxlZCcgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ2lzIG5vdCBkaXNwbGF5ZWQgaWYgdGhlcmUgYXJlIG5vIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICBsZXQgZGVjaXNpb25zID0gbnVsbDtcclxuICAgICAgICB0ZXN0U2VsZWN0b3IoZGVjaXNpb25zLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzIG5vdCBkaXNwbGF5ZWQgaWYgdGhlIGNlcnQgaXMgbm90IGVkaXRhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgIGNlcnQuZWRpdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0ZXN0U2VsZWN0b3IoWydEZWNpc2lvbjEnXSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdpcyBkaXNwbGF5ZWQgaWYgdGhlcmUgYXJlIGJ1bGsgZGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbJ0FwcHJvdmUnLCAnUmV2b2tlJ107XHJcbiAgICAgICAgdGVzdFNlbGVjdG9yKGRlY2lzaW9ucywgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzIGVuYWJsZWQgaWYgaXRlbXMgYXJlIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbJ0FwcHJvdmUnXTtcclxuICAgICAgICBjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuYWRkKHsgaWQ6ICcxMjM0JywgaXNDaGFsbGVuZ2VkU3RhdGU6ICgpID0+IGZhbHNlIH0pO1xyXG4gICAgICAgIHRlc3RTZWxlY3RvcihkZWNpc2lvbnMsIHRydWUsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzIGRpc2FibGVkIGlmIG5vIGl0ZW1zIGFyZSBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZGVjaXNpb25zID0gWydBcHByb3ZlJ107XHJcbiAgICAgICAgc3B5T24oY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLCAnaGFzU2VsZWN0aW9ucycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgdGVzdFNlbGVjdG9yKGRlY2lzaW9ucywgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzIGRpc2FibGVkIGlmIG9ubHkgcmVhZCBvbmx5IGl0ZW1zIGFyZSBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZGVjaXNpb25zID0gWydBcHByb3ZlJ107XHJcbiAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmFkZCh7IGlkOiAnMTIzNCcsIGlzQ2hhbGxlbmdlZFN0YXRlOiAoKSA9PiBmYWxzZSB9KTtcclxuICAgICAgICBpc1JlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICB0ZXN0U2VsZWN0b3IoZGVjaXNpb25zLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnaXMgZGlzYWJsZWQgaWYgc2VsZWN0IGV2ZXJ5dGhpbmcgd2FzIGNoZWNrZWQsIGJ1dCBhbGwgaXRlbXMgd2VyZSByZW1vdmVkJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIHByZXRlbmQgd2Ugc2VsZWN0ZWQgZXZlcnl0aGluZ1xyXG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5pc0luY2x1ZGUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGVjaXNpb25zID0gWydBcHByb3ZlJ107XHJcbiAgICAgICAgdGVzdFNlbGVjdG9yKGRlY2lzaW9ucywgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2lzIGRpc2FibGVkIGlmIHNlbGVjdGVkIGl0ZW0gaXMgY2hhbGxlbmdlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZGVjaXNpb25zID0gWydSZWFzc2lnbiddO1xyXG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoeyBpZDogJzEyMzQnLCBpc0NoYWxsZW5nZWRTdGF0ZTogKCkgPT4gdHJ1ZSB9KTtcclxuICAgICAgICB0ZXN0U2VsZWN0b3IoZGVjaXNpb25zLCB0cnVlLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnY29udGFpbnMgYSBtZW51IGl0ZW0gZm9yIGVhY2ggZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGRlY2lzaW9ucyA9IFsgJ2J1bGsxJywgJ2J1bGsyJywgJ2J1bGszJyBdO1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChkZWNpc2lvbnMpO1xyXG5cclxuICAgICAgICBsZXQgbGlzdEl0ZW1zID0gZWxlbWVudC5maW5kKCdsaScpO1xyXG4gICAgICAgIGV4cGVjdChsaXN0SXRlbXMubGVuZ3RoKS50b0VxdWFsKGRlY2lzaW9ucy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYW5jaG9yID0gYW5ndWxhci5lbGVtZW50KGxpc3RJdGVtc1tpXSkuZmluZCgnYScpO1xyXG4gICAgICAgICAgICBleHBlY3QoYW5jaG9yLnRleHQoKS50cmltKCkpLnRvRXF1YWwoJ2NlcnRfYnVsa19kZWNpc2lvbl8nICsgZGVjaXNpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvd3MgYnV0dG9uIHdpdGggYWN0aW9uIG5hbWUgYW5kIGl0ZW0gY291bnQgaWYgdGhlcmUgaXMgb25seSBvbmUgZGVjaXNpb24gYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoeyBpZDogJzEyMzQnLCBpc0NoYWxsZW5nZWRTdGF0ZTogKCkgPT4gZmFsc2UgfSk7XHJcblxyXG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbJ2J1bGsxJ10sXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGRlY2lzaW9ucyksXHJcbiAgICAgICAgICAgIGJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGV4cGVjdChidXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICBsZXQgYnRuSW5uZXJUZXh0ID0gYnV0dG9uWzBdLmlubmVyVGV4dC50cmltKCk7XHJcblxyXG4gICAgICAgIGV4cGVjdChidG5Jbm5lclRleHQuc3RhcnRzV2l0aCgnY2VydF9idWxrX2RlY2lzaW9uXycgKyBkZWNpc2lvbnNbMF0pKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChidG5Jbm5lclRleHQuaW5kZXhPZignMSB1aV9zZWxlY3RlZCcpKS5ub3QudG9FcXVhbCgtMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICRyb290U2NvcGUsIGNhbmNlbERlY2lzaW9uLCBmYWtlRGVjaXNpb24sXHJcbiAgICAgICAgICAgIGVsZW1lbnQsIHNwTW9kYWwsICRxLCBoYXNEZWNpc2lvbjtcclxuXHJcbiAgICAgICAgbGV0IGRlY2lzaW9ucyA9IFsgJ2RlY2lzaW9uMScsICdSZWFzc2lnbicsICdSZXZva2VBY2NvdW50JyBdO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXywgXyRxXywgX3NwTW9kYWxfKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlXztcclxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XHJcbiAgICAgICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgICAgICRxID0gXyRxXztcclxuXHJcbiAgICAgICAgICAgIC8vIE1vY2sgb3V0IHRoZSBidWxrIGRlY2lzaW9uIHNlcnZpY2UgdG8gcmV0dXJuIGEgcHJvbWlzZS5cclxuICAgICAgICAgICAgY2FuY2VsRGVjaXNpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgZmFrZURlY2lzaW9uID0gJ2xvb2sgbWEgLi4uIG5vIGhhbmRzISc7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLCAnYnVsa0RlY2lkZScpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsRGVjaXNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihmYWtlRGVjaXNpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2FkZEJ1bGtEZWNpc2lvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGEgc2VsZWN0aW9uLlxyXG4gICAgICAgICAgICBjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuYWRkKHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICAgICAgICBpc0NoYWxsZW5nZWRTdGF0ZTogKCkgPT4gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0RlY2lzaW9uOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZSgoKSA9PiBoYXNEZWNpc2lvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGhhc0RlY2lzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbGVtZW50LlxyXG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChkZWNpc2lvbnMpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xpY2soZGVjaXNpb25JbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgYW5jaG9ycyA9IGVsZW1lbnQuZmluZCgnYScpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoYW5jaG9yc1tkZWNpc2lvbkluZGV4ID8gZGVjaXNpb25JbmRleCA6IDBdKS5jbGljaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgcmVhZCBvbmx5IHNlbGVjdGlvbnMgYW5kIGRvZXMgbm90IHNhdmUgZGVjaXNpb24gaWYgZW1wdHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzUmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBjbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldFNlbGVjdGlvbklkcygpKS5ub3QudG9Db250YWluKCcxJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uQnVsa0RlY2lzaW9uU2VydmljZS5idWxrRGVjaWRlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVtb3ZlcyBpdGVtcyB0aGF0IGRvIG5vdCBoYXZlIHRoZSBhY2NvdW50IGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBoYXNEZWNpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjbGljaygyKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25JZHMoKSkubm90LnRvQ29udGFpbignMScpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UuYnVsa0RlY2lkZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGNvbmZpcm0gZGlhbG9nIHdoZW4gaXRlbXMgYXJlIGZpbHRlcmVkIGZvciByZWFzc2lnbiBhY3Rpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoeyBpZDogJzInLCBpc0NoYWxsZW5nZWRTdGF0ZTogKCkgPT4gZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKSwgJ2ZpbHRlclNlbGVjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogKCkgPT4gMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3B5T24oY2hlY2tib3hNdWx0aVNlbGVjdCwgJ2dldFNlbGVjdGlvbkNvdW50JykuYW5kLnJldHVyblZhbHVlKDEpO1xyXG4gICAgICAgICAgICBjbGljaygxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgYnVsa0RlY2lkZScsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2hlY2tib3hNdWx0aVNlbGVjdCwgJ2dldFNlbGVjdGlvbkNvdW50JykuYW5kLnJldHVyblZhbHVlKDEpO1xyXG4gICAgICAgICAgICBjbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UuYnVsa0RlY2lkZSkuXHJcbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChkZWNpc2lvbnNbMF0sIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKSwgJHNjb3BlLmZpbHRlcnMsIDEsIHRhYmxlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FkZHMgYSBidWxrIGRlY2lzaW9uIGFmdGVyIGJ1bGsgZGVjaWRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNoZWNrYm94TXVsdGlTZWxlY3QsICdnZXRTZWxlY3Rpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgxKTtcclxuICAgICAgICAgICAgY2xpY2soKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmFkZEJ1bGtEZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoZmFrZURlY2lzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NsZWFycyB0aGUgc2VsZWN0aW9uIG1vZGVsIGFmdGVyIGJ1bGsgZGVjaWRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGNoZWNrYm94TXVsdGlTZWxlY3QsICdnZXRTZWxlY3Rpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgxKTtcclxuICAgICAgICAgICAgc3B5T24oY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLCAnY2xlYXInKTtcclxuICAgICAgICAgICAgY2xpY2soKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuY2xlYXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IGFkZCBhIGJ1bGsgZGVjaXNpb24gaWYgYnVsayBkZWNpZGluZyB3YXMgY2FuY2VsbGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYW5jZWxEZWNpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHNweU9uKGNoZWNrYm94TXVsdGlTZWxlY3QsICdnZXRTZWxlY3Rpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSgxKTtcclxuXHJcbiAgICAgICAgICAgIGNsaWNrKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5hZGRCdWxrRGVjaXNpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjbGVhciB0aGUgc2VsZWN0aW9uIG1vZGVsIGlmIGJ1bGsgZGVjaWRpbmcgd2FzIGNhbmNlbGxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2FuY2VsRGVjaXNpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBzcHlPbihjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCksICdjbGVhcicpO1xyXG4gICAgICAgICAgICBzcHlPbihjaGVja2JveE11bHRpU2VsZWN0LCAnZ2V0U2VsZWN0aW9uQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoMSk7XHJcbiAgICAgICAgICAgIGNsaWNrKCk7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmNsZWFyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
