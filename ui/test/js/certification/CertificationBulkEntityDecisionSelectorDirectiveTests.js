System.register(['certification/CertificationModule', 'test/js/TestInitializer', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('CertificationBulkEntityDecisionSelectorDirective', function () {

                var elementDefinition = '<sp-certification-bulk-entity-decision-selector sp-certification="cert"' + ' sp-bulk-decisions="decisions " sp-checkbox-multi-select="checkboxMultiSelect"' + ' sp-refresh-trigger="refreshTrigger"/>',
                    $scope = undefined,
                    $compile = undefined,
                    checkboxMultiSelect = undefined,
                    cert = undefined,
                    testService = undefined,
                    DataRefreshTrigger = undefined,
                    refreshSpy = undefined,
                    REASSIGN = 'Reassign',
                    DELEGATED = 'Delegated',
                    $controller = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function ($rootScope, _$compile_, certificationTestData, Certification, CheckboxMultiSelect, _DataRefreshTrigger_, _testService_, _$controller_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    testService = _testService_;
                    DataRefreshTrigger = _DataRefreshTrigger_;

                    cert = new Certification(certificationTestData.CERTIFICATION_1);
                    checkboxMultiSelect = new CheckboxMultiSelect();
                }));

                function createElement(decisions) {
                    var element = angular.element(elementDefinition);
                    $scope.cert = cert;
                    $scope.decisions = decisions;
                    $scope.checkboxMultiSelect = checkboxMultiSelect;

                    $scope.refreshTrigger = new DataRefreshTrigger();
                    refreshSpy = jasmine.createSpy();
                    $scope.refreshTrigger.onRefresh(refreshSpy, $scope);

                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function testDropdownSelector(decisions, expectElement, expectEnabled) {
                    var element = createElement(decisions);
                    var span = element.find('#dropdownBulkEntityDecisionSelector');

                    expect(span.length).toEqual(expectElement ? 1 : 0);

                    if (expectElement) {
                        var button = element.find('button');
                        expect(button.attr('disabled')).toEqual(!expectEnabled ? 'disabled' : undefined);
                    }

                    return element;
                }

                function testButtonSelectors(decisions, expectReassign, expectDelegate, expectEnabled) {
                    var element = createElement(decisions),
                        singleButtons = element.find('#singleButtonBulkEntitySpan').find('button'),
                        reassignButton = element.find('#bulkReassignEntityButton'),
                        delegateButton = element.find('#bulkDelegateEntityButton');

                    expect(singleButtons.length).toEqual(expectReassign || expectDelegate ? 1 : 0);
                    expect(reassignButton.length).toEqual(expectReassign ? 1 : 0);
                    expect(delegateButton.length).toEqual(expectDelegate ? 1 : 0);

                    if (expectReassign) {
                        expect(reassignButton.attr('disabled')).toEqual(!expectEnabled ? 'disabled' : undefined);
                    }
                    if (expectDelegate) {
                        expect(delegateButton.attr('disabled')).toEqual(!expectEnabled ? 'disabled' : undefined);
                    }

                    return element;
                }

                it('menu and buttons are not displayed if there are no decisions', function () {
                    var decisions = null;
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('menu is not displayed if the cert is not editable', function () {
                    var decisions = [REASSIGN, DELEGATED];
                    cert.editable = false;
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('buttons are not displayed if the cert is not editable', function () {
                    var decisions = [REASSIGN];
                    cert.editable = false;
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('menu is displayed if there are more than 1 bulk decisions', function () {
                    var decisions = [REASSIGN, DELEGATED];
                    testDropdownSelector(decisions, true, false);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('menu is enabled if items are selected', function () {
                    var decisions = [REASSIGN, DELEGATED];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234' });
                    testDropdownSelector(decisions, true, true);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('menu is disabled if no items are selected', function () {
                    var decisions = [REASSIGN, DELEGATED];
                    spyOn(checkboxMultiSelect.getSelectionModel(), 'hasSelections').and.returnValue(false);
                    testDropdownSelector(decisions, true, false);
                    testButtonSelectors(decisions, false, false, false);
                });

                it('contains a menu item for each decision', function () {
                    var decisions = [REASSIGN, DELEGATED];
                    var element = createElement(decisions);

                    var listItems = element.find('li');
                    expect(listItems.length).toEqual(decisions.length);

                    for (var i = 0; i < listItems.length; i++) {
                        var anchor = angular.element(listItems[i]).find('a');
                        expect(anchor.text().trim()).toEqual('cert_bulk_decision_' + decisions[i].toLowerCase());
                    }
                });

                it('reassign button is displayed but disabled when reassign is the only decision', function () {
                    var decisions = [REASSIGN];
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, true, false, false);
                });

                it('reassign button is displayed and enabled when reassign is the only decision and item is selected', function () {
                    var decisions = [REASSIGN];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234' });
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, true, false, true);
                });

                it('delegate button is displayed but disabled when delegate is the only decision', function () {
                    var decisions = [DELEGATED];
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, false, true, false);
                });

                it('delegate button is displayed and enabled when delegate is the only decision and item is selected', function () {
                    var decisions = [DELEGATED];
                    checkboxMultiSelect.getSelectionModel().add({ id: '1234' });
                    testDropdownSelector(decisions, false, false);
                    testButtonSelectors(decisions, false, true, true);
                });

                describe('click', function () {
                    var certificationBulkDecisionService = undefined,
                        certificationDataService = undefined,
                        $rootScope = undefined,
                        fakeDecision = undefined,
                        element = undefined,
                        infoModalService = undefined,
                        CertificationActionStatus = undefined,
                        spModal = undefined,
                        $q = undefined;

                    var decisions = [REASSIGN, DELEGATED];

                    beforeEach(inject(function (_certificationBulkDecisionService_, _certificationDataService_, _$rootScope_, _infoModalService_, _spModal_, _CertificationActionStatus_, _$q_) {
                        certificationBulkDecisionService = _certificationBulkDecisionService_;
                        certificationDataService = _certificationDataService_;
                        $rootScope = _$rootScope_;
                        infoModalService = _infoModalService_;
                        CertificationActionStatus = _CertificationActionStatus_;
                        spModal = _spModal_;
                        $q = _$q_;

                        // Mock out the bulk decision service to return a promise.
                        fakeDecision = 'look ma ... no hands!';
                        certificationBulkDecisionService.bulkEntityDecide = testService.createPromiseSpy(false, fakeDecision, null);
                        spyOn(checkboxMultiSelect.getSelectionModel(), 'clear');

                        certificationDataService.checkForUnsavedDecisions = testService.createPromiseSpy(false, {}, null);

                        // Create the element.
                        element = createElement(decisions);
                    }));

                    function click(choice) {
                        var anchors = element.find('a');
                        expect(anchors.length).toEqual(2);
                        angular.element(anchors[choice]).click();
                    }

                    it('calls bulkEntityDecide', function () {
                        // Add a selection.
                        checkboxMultiSelect.getSelectionModel().add({ id: '1' });

                        click(0);
                        expect(certificationBulkDecisionService.bulkEntityDecide).toHaveBeenCalledWith(decisions[0], checkboxMultiSelect.getSelectionModel(), 1, 'Identity');
                    });

                    it('checks for unsaved item decisions', function () {
                        // Add a selection.
                        checkboxMultiSelect.getSelectionModel().add({ id: '1' });
                        click(0);
                        $rootScope.$digest();
                        expect(certificationDataService.checkForUnsavedDecisions).toHaveBeenCalled();
                    });

                    it('clears the selection model and refreshes list after bulk deciding', function () {
                        // Add a selection.
                        checkboxMultiSelect.getSelectionModel().add({ id: '1' });

                        click(0);
                        $rootScope.$digest();
                        expect(checkboxMultiSelect.getSelectionModel().clear).toHaveBeenCalled();
                        expect(refreshSpy).toHaveBeenCalled();
                    });

                    it('does not clear the selection model or refresh list if bulk deciding was cancelled', function () {
                        certificationBulkDecisionService.bulkEntityDecide = testService.createPromiseSpy(true, fakeDecision, null);

                        // Add a selection.
                        checkboxMultiSelect.getSelectionModel().add({ id: '1' });

                        click(0);
                        $rootScope.$digest();
                        expect(checkboxMultiSelect.getSelectionModel().clear).not.toHaveBeenCalled();
                        expect(refreshSpy).not.toHaveBeenCalled();
                    });

                    it('shows no delegatables dialog', function () {
                        spyOn(infoModalService, 'open');

                        // Add two delegated selections.
                        checkboxMultiSelect.getSelectionModel().add({ id: '2', summaryStatus: CertificationActionStatus.Name.Delegated });
                        checkboxMultiSelect.getSelectionModel().add({ id: '3', summaryStatus: CertificationActionStatus.Name.Delegated });

                        click(1);
                        expect(infoModalService.open).toHaveBeenCalled();
                    });

                    it('shows some already delegated dialog', function () {
                        spyOn(spModal, 'confirm').and.returnValue($q.when());

                        // Add one open selections and one already delegated.
                        checkboxMultiSelect.getSelectionModel().add({ id: '4' });
                        checkboxMultiSelect.getSelectionModel().add({ id: '5', summaryStatus: CertificationActionStatus.Name.Delegated });

                        click(1);
                        expect(spModal.confirm).toHaveBeenCalled();
                    });
                });

                describe('type specific methods', function () {
                    var ctrl = undefined,
                        Certification = undefined;

                    beforeEach(inject(function (_Certification_) {
                        ctrl = createController();
                        Certification = _Certification_;
                    }));

                    function createController() {
                        var newCtrl = $controller('CertificationBulkEntityDecisionSelectorDirectiveCtrl', {
                            $scope: $scope
                        }, {
                            certification: {},
                            refreshTrigger: {}
                        });
                        newCtrl.$onInit();
                        return newCtrl;
                    }

                    it('identity type', function () {
                        var type = Certification.EntityType.Identity;

                        expect(ctrl.getConfirmDialogText(type)).toEqual('cert_bulk_entity_delegation_confirm_dialog_text');
                        expect(ctrl.getNoDelegationTitle(type)).toEqual('cert_bulk_entity_delegation_nodelegation_dialog_title');
                        expect(ctrl.getNoDelegationText(type)).toEqual('cert_bulk_entity_delegation_nodelegation_dialog_text');
                    });

                    it('dataowner type', function () {
                        var type = Certification.EntityType.DataOwner;

                        expect(ctrl.getConfirmDialogText(type)).toEqual('cert_entitlement_owner_bulk_entity_delegation_confirm_dialog_text');
                        expect(ctrl.getNoDelegationTitle(type)).toEqual('cert_entitlement_owner_bulk_entity_delegation_nodelegation_dialog_title');
                        expect(ctrl.getNoDelegationText(type)).toEqual('cert_entitlement_owner_bulk_entity_delegation_nodelegation_dialog_text');
                    });

                    it('AccountGroup type', function () {
                        var type = Certification.EntityType.AccountGroup;

                        expect(ctrl.getConfirmDialogText(type)).toEqual('cert_account_group_bulk_entity_delegation_confirm_dialog_text');
                        expect(ctrl.getNoDelegationTitle(type)).toEqual('cert_account_group_bulk_entity_delegation_nodelegation_dialog_title');
                        expect(ctrl.getNoDelegationText(type)).toEqual('cert_account_group_bulk_entity_delegation_nodelegation_dialog_text');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkJ1bGtFbnRpdHlEZWNpc2lvblNlbGVjdG9yRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMscUNBQXFDLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHdkg7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDbEUsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxvREFBb0QsWUFBVzs7Z0JBRXBFLElBQUksb0JBQW9CLDRFQUNoQixtRkFDQTtvQkFDSixTQUFNO29CQUFFLFdBQVE7b0JBQUUsc0JBQW1CO29CQUFFLE9BQUk7b0JBQUUsY0FBVztvQkFBRSxxQkFBa0I7b0JBQUUsYUFBVTtvQkFDeEYsV0FBVztvQkFBWSxZQUFZO29CQUFhLGNBQVc7O2dCQUUvRCxXQUFXLE9BQU8scUJBQXFCOzs7Z0JBR3ZDLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSx1QkFBdUIsZUFBZSxxQkFDOUQsc0JBQXNCLGVBQWUsZUFBZTtvQkFDM0UsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxxQkFBcUI7O29CQUVyQixPQUFPLElBQUksY0FBYyxzQkFBc0I7b0JBQy9DLHNCQUFzQixJQUFJOzs7Z0JBRzlCLFNBQVMsY0FBYyxXQUFXO29CQUM5QixJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixPQUFPLE9BQU87b0JBQ2QsT0FBTyxZQUFZO29CQUNuQixPQUFPLHNCQUFzQjs7b0JBRTdCLE9BQU8saUJBQWlCLElBQUk7b0JBQzVCLGFBQWEsUUFBUTtvQkFDckIsT0FBTyxlQUFlLFVBQVUsWUFBWTs7b0JBRTVDLFNBQVMsU0FBUztvQkFD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LElBQUk7d0JBQ1Qsb0JBQW9CLG9CQUFvQixJQUNwQyxFQUFDLElBQUksS0FBSyxlQUFlLDBCQUEwQixLQUFLOzt3QkFFNUQsTUFBTTt3QkFDTixPQUFPLFFBQVEsU0FBUzs7OztnQkFLaEMsU0FBUyx5QkFBeUIsWUFBTTtvQkFDcEMsSUFBSSxPQUFJO3dCQUFFLGdCQUFhOztvQkFFdkIsV0FBVyxPQUFPLFVBQUMsaUJBQW9CO3dCQUNuQyxPQUFPO3dCQUNQLGdCQUFnQjs7O29CQUdwQixTQUFTLG1CQUFtQjt3QkFDeEIsSUFBSSxVQUFVLFlBQVksd0RBQ3RCOzRCQUNJLFFBQVE7MkJBRVo7NEJBQ0ksZUFBZTs0QkFDZixnQkFBZ0I7O3dCQUd4QixRQUFRO3dCQUNSLE9BQU87OztvQkFHWCxHQUFHLGlCQUFpQixZQUFNO3dCQUN0QixJQUFJLE9BQU8sY0FBYyxXQUFXOzt3QkFFcEMsT0FBTyxLQUFLLHFCQUFxQixPQUFPLFFBQVE7d0JBQ2hELE9BQU8sS0FBSyxxQkFBcUIsT0FBTyxRQUFRO3dCQUNoRCxPQUFPLEtBQUssb0JBQW9CLE9BQU8sUUFBUTs7O29CQUduRCxHQUFHLGtCQUFrQixZQUFNO3dCQUN2QixJQUFJLE9BQU8sY0FBYyxXQUFXOzt3QkFFcEMsT0FBTyxLQUFLLHFCQUFxQixPQUM1QixRQUFRO3dCQUNiLE9BQU8sS0FBSyxxQkFBcUIsT0FDNUIsUUFBUTt3QkFDYixPQUFPLEtBQUssb0JBQW9CLE9BQzNCLFFBQVE7OztvQkFHakIsR0FBRyxxQkFBcUIsWUFBTTt3QkFDMUIsSUFBSSxPQUFPLGNBQWMsV0FBVzs7d0JBRXBDLE9BQU8sS0FBSyxxQkFBcUIsT0FDNUIsUUFBUTt3QkFDYixPQUFPLEtBQUsscUJBQXFCLE9BQzVCLFFBQVE7d0JBQ2IsT0FBTyxLQUFLLG9CQUFvQixPQUMzQixRQUFROzs7Ozs7R0FTdEIiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uQnVsa0VudGl0eURlY2lzaW9uU2VsZWN0b3JEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkJ1bGtFbnRpdHlEZWNpc2lvblNlbGVjdG9yRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSAnPHNwLWNlcnRpZmljYXRpb24tYnVsay1lbnRpdHktZGVjaXNpb24tc2VsZWN0b3Igc3AtY2VydGlmaWNhdGlvbj1cImNlcnRcIicgK1xuICAgICAgICAgICAgJyBzcC1idWxrLWRlY2lzaW9ucz1cImRlY2lzaW9ucyBcIiBzcC1jaGVja2JveC1tdWx0aS1zZWxlY3Q9XCJjaGVja2JveE11bHRpU2VsZWN0XCInICtcbiAgICAgICAgICAgICcgc3AtcmVmcmVzaC10cmlnZ2VyPVwicmVmcmVzaFRyaWdnZXJcIi8+JyxcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZSwgY2hlY2tib3hNdWx0aVNlbGVjdCwgY2VydCwgdGVzdFNlcnZpY2UsIERhdGFSZWZyZXNoVHJpZ2dlciwgcmVmcmVzaFNweSxcbiAgICAgICAgUkVBU1NJR04gPSAnUmVhc3NpZ24nLCBERUxFR0FURUQgPSAnRGVsZWdhdGVkJywgJGNvbnRyb2xsZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDZXJ0aWZpY2F0aW9uLCBDaGVja2JveE11bHRpU2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9EYXRhUmVmcmVzaFRyaWdnZXJfLCBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICBEYXRhUmVmcmVzaFRyaWdnZXIgPSBfRGF0YVJlZnJlc2hUcmlnZ2VyXztcblxuICAgICAgICBjZXJ0ID0gbmV3IENlcnRpZmljYXRpb24oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRJRklDQVRJT05fMSk7XG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QgPSBuZXcgQ2hlY2tib3hNdWx0aVNlbGVjdCgpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZGVjaXNpb25zKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJHNjb3BlLmNlcnQgPSBjZXJ0O1xuICAgICAgICAkc2NvcGUuZGVjaXNpb25zID0gZGVjaXNpb25zO1xuICAgICAgICAkc2NvcGUuY2hlY2tib3hNdWx0aVNlbGVjdCA9IGNoZWNrYm94TXVsdGlTZWxlY3Q7XG5cbiAgICAgICAgJHNjb3BlLnJlZnJlc2hUcmlnZ2VyID0gbmV3IERhdGFSZWZyZXNoVHJpZ2dlcigpO1xuICAgICAgICByZWZyZXNoU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgJHNjb3BlLnJlZnJlc2hUcmlnZ2VyLm9uUmVmcmVzaChyZWZyZXNoU3B5LCAkc2NvcGUpO1xuXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdERyb3Bkb3duU2VsZWN0b3IoZGVjaXNpb25zLCBleHBlY3RFbGVtZW50LCBleHBlY3RFbmFibGVkKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChkZWNpc2lvbnMpO1xuICAgICAgICBsZXQgc3BhbiA9IGVsZW1lbnQuZmluZCgnI2Ryb3Bkb3duQnVsa0VudGl0eURlY2lzaW9uU2VsZWN0b3InKTtcblxuICAgICAgICBleHBlY3Qoc3Bhbi5sZW5ndGgpLnRvRXF1YWwoKGV4cGVjdEVsZW1lbnQpID8gMSA6IDApO1xuXG4gICAgICAgIGlmIChleHBlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24nKTtcbiAgICAgICAgICAgIGV4cGVjdChidXR0b24uYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCghZXhwZWN0RW5hYmxlZCA/ICdkaXNhYmxlZCcgOiB1bmRlZmluZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdEJ1dHRvblNlbGVjdG9ycyhkZWNpc2lvbnMsIGV4cGVjdFJlYXNzaWduLCBleHBlY3REZWxlZ2F0ZSwgZXhwZWN0RW5hYmxlZCkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVjaXNpb25zKSxcbiAgICAgICAgICAgIHNpbmdsZUJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoJyNzaW5nbGVCdXR0b25CdWxrRW50aXR5U3BhbicpLmZpbmQoJ2J1dHRvbicpLFxuICAgICAgICAgICAgcmVhc3NpZ25CdXR0b24gPSBlbGVtZW50LmZpbmQoJyNidWxrUmVhc3NpZ25FbnRpdHlCdXR0b24nKSxcbiAgICAgICAgICAgIGRlbGVnYXRlQnV0dG9uID0gZWxlbWVudC5maW5kKCcjYnVsa0RlbGVnYXRlRW50aXR5QnV0dG9uJyk7XG5cbiAgICAgICAgZXhwZWN0KHNpbmdsZUJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKChleHBlY3RSZWFzc2lnbiB8fCBleHBlY3REZWxlZ2F0ZSkgPyAxIDogMCk7XG4gICAgICAgIGV4cGVjdChyZWFzc2lnbkJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0UmVhc3NpZ24gPyAxIDogMCk7XG4gICAgICAgIGV4cGVjdChkZWxlZ2F0ZUJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0RGVsZWdhdGUgPyAxIDogMCk7XG5cbiAgICAgICAgaWYgKGV4cGVjdFJlYXNzaWduKSB7XG4gICAgICAgICAgICBleHBlY3QocmVhc3NpZ25CdXR0b24uYXR0cignZGlzYWJsZWQnKSkudG9FcXVhbCghZXhwZWN0RW5hYmxlZCA/ICdkaXNhYmxlZCcgOiB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHBlY3REZWxlZ2F0ZSkge1xuICAgICAgICAgICAgZXhwZWN0KGRlbGVnYXRlQnV0dG9uLmF0dHIoJ2Rpc2FibGVkJykpLnRvRXF1YWwoIWV4cGVjdEVuYWJsZWQgPyAnZGlzYWJsZWQnIDogdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGl0KCdtZW51IGFuZCBidXR0b25zIGFyZSBub3QgZGlzcGxheWVkIGlmIHRoZXJlIGFyZSBubyBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBudWxsO1xuICAgICAgICB0ZXN0RHJvcGRvd25TZWxlY3RvcihkZWNpc2lvbnMsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIHRlc3RCdXR0b25TZWxlY3RvcnMoZGVjaXNpb25zLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdtZW51IGlzIG5vdCBkaXNwbGF5ZWQgaWYgdGhlIGNlcnQgaXMgbm90IGVkaXRhYmxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW1JFQVNTSUdOLCBERUxFR0FURURdO1xuICAgICAgICBjZXJ0LmVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRlc3REcm9wZG93blNlbGVjdG9yKGRlY2lzaW9ucywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgdGVzdEJ1dHRvblNlbGVjdG9ycyhkZWNpc2lvbnMsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2J1dHRvbnMgYXJlIG5vdCBkaXNwbGF5ZWQgaWYgdGhlIGNlcnQgaXMgbm90IGVkaXRhYmxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW1JFQVNTSUdOXTtcbiAgICAgICAgY2VydC5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0ZXN0RHJvcGRvd25TZWxlY3RvcihkZWNpc2lvbnMsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIHRlc3RCdXR0b25TZWxlY3RvcnMoZGVjaXNpb25zLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdtZW51IGlzIGRpc3BsYXllZCBpZiB0aGVyZSBhcmUgbW9yZSB0aGFuIDEgYnVsayBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbUkVBU1NJR04sIERFTEVHQVRFRF07XG4gICAgICAgIHRlc3REcm9wZG93blNlbGVjdG9yKGRlY2lzaW9ucywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB0ZXN0QnV0dG9uU2VsZWN0b3JzKGRlY2lzaW9ucywgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbWVudSBpcyBlbmFibGVkIGlmIGl0ZW1zIGFyZSBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGRlY2lzaW9ucyA9IFtSRUFTU0lHTiwgREVMRUdBVEVEXTtcbiAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmFkZCh7aWQ6ICcxMjM0J30pO1xuICAgICAgICB0ZXN0RHJvcGRvd25TZWxlY3RvcihkZWNpc2lvbnMsIHRydWUsIHRydWUpO1xuICAgICAgICB0ZXN0QnV0dG9uU2VsZWN0b3JzKGRlY2lzaW9ucywgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbWVudSBpcyBkaXNhYmxlZCBpZiBubyBpdGVtcyBhcmUgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbUkVBU1NJR04sIERFTEVHQVRFRF07XG4gICAgICAgIHNweU9uKGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKSwgJ2hhc1NlbGVjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICB0ZXN0RHJvcGRvd25TZWxlY3RvcihkZWNpc2lvbnMsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgdGVzdEJ1dHRvblNlbGVjdG9ycyhkZWNpc2lvbnMsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnRhaW5zIGEgbWVudSBpdGVtIGZvciBlYWNoIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW1JFQVNTSUdOLCBERUxFR0FURURdO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVjaXNpb25zKTtcblxuICAgICAgICBsZXQgbGlzdEl0ZW1zID0gZWxlbWVudC5maW5kKCdsaScpO1xuICAgICAgICBleHBlY3QobGlzdEl0ZW1zLmxlbmd0aCkudG9FcXVhbChkZWNpc2lvbnMubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFuY2hvciA9IGFuZ3VsYXIuZWxlbWVudChsaXN0SXRlbXNbaV0pLmZpbmQoJ2EnKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmNob3IudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgnY2VydF9idWxrX2RlY2lzaW9uXycgKyBkZWNpc2lvbnNbaV0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdyZWFzc2lnbiBidXR0b24gaXMgZGlzcGxheWVkIGJ1dCBkaXNhYmxlZCB3aGVuIHJlYXNzaWduIGlzIHRoZSBvbmx5IGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW1JFQVNTSUdOXTtcbiAgICAgICAgdGVzdERyb3Bkb3duU2VsZWN0b3IoZGVjaXNpb25zLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0ZXN0QnV0dG9uU2VsZWN0b3JzKGRlY2lzaW9ucywgdHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZWFzc2lnbiBidXR0b24gaXMgZGlzcGxheWVkIGFuZCBlbmFibGVkIHdoZW4gcmVhc3NpZ24gaXMgdGhlIG9ubHkgZGVjaXNpb24gYW5kIGl0ZW0gaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBkZWNpc2lvbnMgPSBbUkVBU1NJR05dO1xuICAgICAgICBjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuYWRkKHtpZDogJzEyMzQnfSk7XG4gICAgICAgIHRlc3REcm9wZG93blNlbGVjdG9yKGRlY2lzaW9ucywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgdGVzdEJ1dHRvblNlbGVjdG9ycyhkZWNpc2lvbnMsIHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWxlZ2F0ZSBidXR0b24gaXMgZGlzcGxheWVkIGJ1dCBkaXNhYmxlZCB3aGVuIGRlbGVnYXRlIGlzIHRoZSBvbmx5IGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW0RFTEVHQVRFRF07XG4gICAgICAgIHRlc3REcm9wZG93blNlbGVjdG9yKGRlY2lzaW9ucywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgdGVzdEJ1dHRvblNlbGVjdG9ycyhkZWNpc2lvbnMsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGVsZWdhdGUgYnV0dG9uIGlzIGRpc3BsYXllZCBhbmQgZW5hYmxlZCB3aGVuIGRlbGVnYXRlIGlzIHRoZSBvbmx5IGRlY2lzaW9uIGFuZCBpdGVtIGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVjaXNpb25zID0gW0RFTEVHQVRFRF07XG4gICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoe2lkOiAnMTIzNCd9KTtcbiAgICAgICAgdGVzdERyb3Bkb3duU2VsZWN0b3IoZGVjaXNpb25zLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0ZXN0QnV0dG9uU2VsZWN0b3JzKGRlY2lzaW9ucywgZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgY2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UsIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJHJvb3RTY29wZSwgZmFrZURlY2lzaW9uLCBlbGVtZW50LFxuICAgICAgICAgICAgaW5mb01vZGFsU2VydmljZSwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cywgc3BNb2RhbCwgJHE7XG5cbiAgICAgICAgbGV0IGRlY2lzaW9ucyA9IFtSRUFTU0lHTiwgREVMRUdBVEVEXTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIF8kcm9vdFNjb3BlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbmZvTW9kYWxTZXJ2aWNlXywgX3NwTW9kYWxfLCBfQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1c18sIF8kcV8pID0+IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlXztcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgICAgIGluZm9Nb2RhbFNlcnZpY2UgPSBfaW5mb01vZGFsU2VydmljZV87XG4gICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgICAgICRxID0gXyRxXztcblxuICAgICAgICAgICAgLy8gTW9jayBvdXQgdGhlIGJ1bGsgZGVjaXNpb24gc2VydmljZSB0byByZXR1cm4gYSBwcm9taXNlLlxuICAgICAgICAgICAgZmFrZURlY2lzaW9uID0gJ2xvb2sgbWEgLi4uIG5vIGhhbmRzISc7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uQnVsa0RlY2lzaW9uU2VydmljZS5idWxrRW50aXR5RGVjaWRlID1cbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCBmYWtlRGVjaXNpb24sIG51bGwpO1xuICAgICAgICAgICAgc3B5T24oY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLCAnY2xlYXInKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmNoZWNrRm9yVW5zYXZlZERlY2lzaW9ucyA9IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHt9LCBudWxsKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBlbGVtZW50LlxuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVjaXNpb25zKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsaWNrKGNob2ljZSkge1xuICAgICAgICAgICAgbGV0IGFuY2hvcnMgPSBlbGVtZW50LmZpbmQoJ2EnKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmNob3JzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChhbmNob3JzW2Nob2ljZV0pLmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnY2FsbHMgYnVsa0VudGl0eURlY2lkZScsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBhIHNlbGVjdGlvbi5cbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoe2lkOiAnMSd9KTtcblxuICAgICAgICAgICAgY2xpY2soMCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UuYnVsa0VudGl0eURlY2lkZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zWzBdLCBjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCksIDEsICdJZGVudGl0eScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2hlY2tzIGZvciB1bnNhdmVkIGl0ZW0gZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIGEgc2VsZWN0aW9uLlxuICAgICAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmFkZCh7aWQ6ICcxJ30pO1xuICAgICAgICAgICAgY2xpY2soMCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuY2hlY2tGb3JVbnNhdmVkRGVjaXNpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjbGVhcnMgdGhlIHNlbGVjdGlvbiBtb2RlbCBhbmQgcmVmcmVzaGVzIGxpc3QgYWZ0ZXIgYnVsayBkZWNpZGluZycsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBhIHNlbGVjdGlvbi5cbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoe2lkOiAnMSd9KTtcblxuICAgICAgICAgICAgY2xpY2soMCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuY2xlYXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZWZyZXNoU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjbGVhciB0aGUgc2VsZWN0aW9uIG1vZGVsIG9yIHJlZnJlc2ggbGlzdCBpZiBidWxrIGRlY2lkaW5nIHdhcyBjYW5jZWxsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uQnVsa0RlY2lzaW9uU2VydmljZS5idWxrRW50aXR5RGVjaWRlID1cbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KHRydWUsIGZha2VEZWNpc2lvbiwgbnVsbCk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhIHNlbGVjdGlvbi5cbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoe2lkOiAnMSd9KTtcblxuICAgICAgICAgICAgY2xpY2soMCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChjaGVja2JveE11bHRpU2VsZWN0LmdldFNlbGVjdGlvbk1vZGVsKCkuY2xlYXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocmVmcmVzaFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIG5vIGRlbGVnYXRhYmxlcyBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihpbmZvTW9kYWxTZXJ2aWNlLCAnb3BlbicpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdHdvIGRlbGVnYXRlZCBzZWxlY3Rpb25zLlxuICAgICAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmFkZChcbiAgICAgICAgICAgICAgICB7aWQ6ICcyJywgc3VtbWFyeVN0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZH0pO1xuICAgICAgICAgICAgY2hlY2tib3hNdWx0aVNlbGVjdC5nZXRTZWxlY3Rpb25Nb2RlbCgpLmFkZChcbiAgICAgICAgICAgICAgICB7aWQ6ICczJywgc3VtbWFyeVN0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZH0pO1xuXG4gICAgICAgICAgICBjbGljaygxKTtcbiAgICAgICAgICAgIGV4cGVjdChpbmZvTW9kYWxTZXJ2aWNlLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHNvbWUgYWxyZWFkeSBkZWxlZ2F0ZWQgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ2NvbmZpcm0nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcblxuICAgICAgICAgICAgLy8gQWRkIG9uZSBvcGVuIHNlbGVjdGlvbnMgYW5kIG9uZSBhbHJlYWR5IGRlbGVnYXRlZC5cbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoXG4gICAgICAgICAgICAgICAge2lkOiAnNCd9KTtcbiAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3QuZ2V0U2VsZWN0aW9uTW9kZWwoKS5hZGQoXG4gICAgICAgICAgICAgICAge2lkOiAnNScsIHN1bW1hcnlTdGF0dXM6IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWR9KTtcblxuICAgICAgICAgICAgY2xpY2soMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5jb25maXJtKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHlwZSBzcGVjaWZpYyBtZXRob2RzJywgKCkgPT4ge1xuICAgICAgICBsZXQgY3RybCwgQ2VydGlmaWNhdGlvbjtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX0NlcnRpZmljYXRpb25fKSA9PiB7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgQ2VydGlmaWNhdGlvbiA9IF9DZXJ0aWZpY2F0aW9uXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICBsZXQgbmV3Q3RybCA9ICRjb250cm9sbGVyKCdDZXJ0aWZpY2F0aW9uQnVsa0VudGl0eURlY2lzaW9uU2VsZWN0b3JEaXJlY3RpdmVDdHJsJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZTogJHNjb3BlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb246IHt9LFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoVHJpZ2dlcjoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbmV3Q3RybC4kb25Jbml0KCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3Q3RybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdpZGVudGl0eSB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBDZXJ0aWZpY2F0aW9uLkVudGl0eVR5cGUuSWRlbnRpdHk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldENvbmZpcm1EaWFsb2dUZXh0KHR5cGUpKS50b0VxdWFsKCdjZXJ0X2J1bGtfZW50aXR5X2RlbGVnYXRpb25fY29uZmlybV9kaWFsb2dfdGV4dCcpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Tm9EZWxlZ2F0aW9uVGl0bGUodHlwZSkpLnRvRXF1YWwoJ2NlcnRfYnVsa19lbnRpdHlfZGVsZWdhdGlvbl9ub2RlbGVnYXRpb25fZGlhbG9nX3RpdGxlJyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXROb0RlbGVnYXRpb25UZXh0KHR5cGUpKS50b0VxdWFsKCdjZXJ0X2J1bGtfZW50aXR5X2RlbGVnYXRpb25fbm9kZWxlZ2F0aW9uX2RpYWxvZ190ZXh0Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkYXRhb3duZXIgdHlwZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0eXBlID0gQ2VydGlmaWNhdGlvbi5FbnRpdHlUeXBlLkRhdGFPd25lcjtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q29uZmlybURpYWxvZ1RleHQodHlwZSkpXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoJ2NlcnRfZW50aXRsZW1lbnRfb3duZXJfYnVsa19lbnRpdHlfZGVsZWdhdGlvbl9jb25maXJtX2RpYWxvZ190ZXh0Jyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXROb0RlbGVnYXRpb25UaXRsZSh0eXBlKSlcbiAgICAgICAgICAgICAgICAudG9FcXVhbCgnY2VydF9lbnRpdGxlbWVudF9vd25lcl9idWxrX2VudGl0eV9kZWxlZ2F0aW9uX25vZGVsZWdhdGlvbl9kaWFsb2dfdGl0bGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldE5vRGVsZWdhdGlvblRleHQodHlwZSkpXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoJ2NlcnRfZW50aXRsZW1lbnRfb3duZXJfYnVsa19lbnRpdHlfZGVsZWdhdGlvbl9ub2RlbGVnYXRpb25fZGlhbG9nX3RleHQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ0FjY291bnRHcm91cCB0eXBlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBDZXJ0aWZpY2F0aW9uLkVudGl0eVR5cGUuQWNjb3VudEdyb3VwO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDb25maXJtRGlhbG9nVGV4dCh0eXBlKSlcbiAgICAgICAgICAgICAgICAudG9FcXVhbCgnY2VydF9hY2NvdW50X2dyb3VwX2J1bGtfZW50aXR5X2RlbGVnYXRpb25fY29uZmlybV9kaWFsb2dfdGV4dCcpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Tm9EZWxlZ2F0aW9uVGl0bGUodHlwZSkpXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoJ2NlcnRfYWNjb3VudF9ncm91cF9idWxrX2VudGl0eV9kZWxlZ2F0aW9uX25vZGVsZWdhdGlvbl9kaWFsb2dfdGl0bGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldE5vRGVsZWdhdGlvblRleHQodHlwZSkpXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwoJ2NlcnRfYWNjb3VudF9ncm91cF9idWxrX2VudGl0eV9kZWxlZ2F0aW9uX25vZGVsZWdhdGlvbl9kaWFsb2dfdGV4dCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
