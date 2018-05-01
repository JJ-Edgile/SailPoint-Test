System.register(['certification/CertificationModule', 'test/js/TestInitializer', 'test/js/TestModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            /* jshint maxstatements: 51 */
            describe('spCertificationActionColumn', function () {

                var elementDefinition = '<sp-certification-action-column sp-model="item" />',
                    CertificationItem = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    $q = undefined,
                    certificationDataService = undefined,
                    certificationItemService = undefined,
                    certificationService = undefined,
                    testService = undefined,
                    commentService = undefined,
                    CertificationActionStatus = undefined,
                    CertificationConfig = undefined,
                    spTranslateFilter = undefined,
                    CertificationDecisionStatus = undefined,
                    CertificationViewState = undefined,
                    spModal = undefined,
                    certificationActionsFactoryService = undefined,
                    CertificationDecision = undefined,
                    certificationItemDetailService = undefined,
                    element = undefined,
                    Certification = undefined,
                    certificationEntityService = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 22 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _CertificationItem_, _CertificationActionStatus_, _certificationDataService_, _commentService_, _$q_, _certificationItemService_, _certificationService_, _testService_, _$controller_, _CertificationConfig_, _spTranslateFilter_, _CertificationDecisionStatus_, _CertificationViewState_, _spModal_, _certificationActionsFactoryService_, _CertificationDecision_, _certificationItemDetailService_, _Certification_, _certificationEntityService_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    CertificationItem = _CertificationItem_;
                    Certification = _Certification_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    CertificationDecisionStatus = _CertificationDecisionStatus_;
                    CertificationConfig = _CertificationConfig_;
                    CertificationViewState = _CertificationViewState_;
                    certificationActionsFactoryService = _certificationActionsFactoryService_;
                    spTranslateFilter = _spTranslateFilter_;
                    CertificationDecision = _CertificationDecision_;
                    certificationItemDetailService = _certificationItemDetailService_;
                    certificationEntityService = _certificationEntityService_;

                    commentService = _commentService_;
                    certificationDataService = _certificationDataService_;
                    certificationItemService = _certificationItemService_;
                    certificationService = _certificationService_;
                    testService = _testService_;
                    spModal = _spModal_;
                    $q = _$q_;

                    certificationDataService.initializeConfiguration(new CertificationConfig({
                        processRevokesImmediately: false
                    }));

                    spTranslateFilter.configureCatalog({
                        'cert_action_approved': 'Approved',
                        'cert_action_approve': 'Approve',
                        'cert_action_remediate': 'Revoke',
                        'ui_cert_menu_comment': 'Comment',
                        'ui_cert_menu_history': 'History',
                        'ui_cert_menu_details': 'Details',
                        'ui_cert_menu_account_details': 'Account Details',
                        'ui_cert_menu_role_details': 'Role Details'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(item) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function createController(item) {
                    var ctrl = $controller('CertificationActionColumnDirectiveCtrl', {}, { item: item });
                    ctrl.$onInit();
                    return ctrl;
                }

                function createCertificationItem(statuses, decisionState, summaryStatus, policyType) {
                    var decisionStatus = new CertificationDecisionStatus({});
                    if (statuses) {
                        statuses.forEach(function (status) {
                            return decisionStatus.decisions.push(new CertificationActionStatus({
                                status: status,
                                promptKey: status,
                                name: status
                            }));
                        });
                    }

                    if (decisionState) {
                        decisionStatus.currentState = new CertificationActionStatus({
                            status: decisionState,
                            promptKey: decisionState,
                            name: decisionState
                        });
                    }

                    return new CertificationItem({
                        id: '1234',
                        decisionStatus: decisionStatus,
                        policyType: policyType,
                        summaryStatus: summaryStatus ? summaryStatus : CertificationItem.Status.Open,
                        roleName: 'Role1',
                        canChangeDecision: true
                    });
                }

                function findTopButtons(element) {
                    return element.find('.cert-action-column > button:not(.dropdown-toggle)');
                }

                function findMenuButton(element) {
                    return element.find('.cert-action-column button.dropdown-toggle');
                }

                function findMenuItems(element) {
                    return element.find('.cert-action-column ul.dropdown-menu li');
                }

                function createCertificationDecision(status) {
                    return new CertificationDecision(new CertificationActionStatus({ status: status }));
                }

                describe('delegated items', function () {
                    var item = undefined,
                        delegatedElement = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Delegated, CertificationItem.Status.Delegated);

                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                        delegatedElement = createElement(item);
                    });

                    it('should not show action buttons', function () {
                        var topButtons = findTopButtons(delegatedElement);
                        expect(topButtons.length).toEqual(0);
                    });

                    it('shows cert-action-current-decision-state span that shows saved decision', function () {
                        var decisionStateSpan = delegatedElement.find('span.cert-action-current-decision-state');
                        expect(decisionStateSpan.length).toEqual(1);
                        expect(decisionStateSpan[0].innerText.trim()).toEqual('cert_action_delegated');
                    });
                });

                describe('summary status Complete', function () {
                    var item = undefined,
                        approvedElement = undefined;

                    function createCertificationItemWithRemediatedDecision() {
                        return createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Remediated, CertificationItem.Status.Complete);
                    }

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Approved, CertificationItem.Status.Complete);

                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });

                        approvedElement = createElement(item);
                    });

                    it('does not show button decision items', function () {
                        var topButtons = findTopButtons(approvedElement);
                        expect(topButtons.length).toEqual(0);
                    });

                    it('does not show menu items when cert is signed off', function () {
                        spyOn(certificationDataService, 'isSignedOff').and.callFake(function () {
                            return true;
                        });

                        var item = createCertificationItemWithRemediatedDecision(),
                            remediatedElement = createElement(item),
                            remediatedMenuItems = findMenuItems(remediatedElement);

                        // there should only be comment and history menu items
                        expect(remediatedMenuItems.length).toEqual(2);
                    });

                    it('shows cert-action-current-decision-state span that shows saved decision', function () {
                        var decisionStateSpan = approvedElement.find('span.cert-action-current-decision-state');
                        expect(decisionStateSpan.length).toEqual(1);
                        expect(decisionStateSpan[0].innerText.trim()).toEqual(CertificationActionStatus.Name.Approved);
                    });

                    it('shows clear menu item', function () {
                        var menuItems = findMenuItems(approvedElement);
                        expect(menuItems[0].innerText.trim().replace(/\s/g, '')).toEqual('cert_action_undo' + item.displayName);
                    });

                    it('shows correct menu item based on saved or current decision', function () {
                        var approvedMenuItems = findMenuItems(approvedElement),
                            item = createCertificationItemWithRemediatedDecision(),
                            remediatedElement = createElement(item),
                            remediatedMenuItems = findMenuItems(remediatedElement);

                        expect(approvedMenuItems[1].innerText.trim().replace(/\s/g, '')).toEqual('Revoke' + item.displayName);
                        expect(remediatedMenuItems[1].innerText.trim().replace(/\s/g, '')).toEqual('Approve' + item.displayName);
                    });
                });

                describe('miscellaneous click', function () {

                    function clickMenuItem(element, labelText) {
                        var menuOptions = findMenuItems(element);
                        var menuItem = menuOptions.find('a:contains(\'' + labelText + '\')');
                        expect(menuItem.length).toEqual(1);
                        menuItem.click();
                    }

                    function testDetailPopup() {
                        var menuItem = arguments.length <= 0 || arguments[0] === undefined ? 'Details' : arguments[0];

                        var item = createCertificationItem([CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved]);

                        spyOn(certificationDataService, 'getCertification').and.returnValue({ id: 'certId' });
                        createElement(item);
                        clickMenuItem(element, menuItem);
                        return item;
                    }

                    describe('cert type is Manager', function () {

                        beforeEach(function () {
                            spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                                return Certification.Type.Manager;
                            });
                        });

                        it('throws with no spModel specified', function () {
                            expect(function () {
                                return createElement(null);
                            }).toThrow();
                        });

                        it('does not show cert-action-current-decision-state span that shows saved decision', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved], undefined, CertificationItem.Status.Complete),
                                element = createElement(item),
                                decisionStateSpan = element.find('span.cert-action-current-decision-state');

                            expect(decisionStateSpan.length).toEqual(1);
                            expect(decisionStateSpan[0].classList.contains('ng-hide')).toEqual(true);
                        });

                        it('shows top level buttons', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Acknowledged, CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], undefined, CertificationItem.Status.Open),
                                element = createElement(item),
                                topButtons = findTopButtons(element);

                            expect(topButtons.length).toEqual(2);
                            expect(topButtons[0].innerText.trim().replace(/\s/g, '')).toEqual('Approve' + item.displayName);
                            expect(topButtons[1].innerText.trim().replace(/\s/g, '')).toEqual('Revoke' + item.displayName);
                        });

                        it('shows top level buttons in the correct order', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved], undefined, CertificationItem.Status.Open),
                                element = createElement(item),
                                topButtons = findTopButtons(element);

                            expect(topButtons.length).toEqual(2);
                            expect(topButtons[0].innerText.trim().replace(/\s/g, '')).toEqual('Approve' + item.displayName);
                            expect(topButtons[1].innerText.trim().replace(/\s/g, '')).toEqual('Revoke' + item.displayName);
                        });

                        it('always shows at least two top level buttons', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Mitigated, CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Delegated]),
                                element = createElement(item),
                                topButtons = findTopButtons(element);

                            expect(topButtons.length).toEqual(2);
                            expect(topButtons[0].innerText.trim().replace(/\s/g, '')).toEqual('Approve' + item.displayName);
                            expect(topButtons[1].innerText.trim().replace(/\s/g, '')).toEqual('Revoke' + item.displayName);
                        });

                        it('shows other items in the menu', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved]),
                                element = createElement(item),
                                menuButton = findMenuButton(element),
                                menuOptions = findMenuItems(element),
                                topButtons = findTopButtons(element);

                            expect(topButtons.length).toEqual(2);
                            expect(menuButton.length).toEqual(1);
                            expect(menuOptions.length).toEqual(2);
                            expect(menuOptions[0].innerText.trim().startsWith('Comment')).toEqual(true);
                        });

                        function testDetailsMenuItem(expectIt) {
                            var detailsMenuText = arguments.length <= 1 || arguments[1] === undefined ? 'Details' : arguments[1];
                            var type = arguments.length <= 2 || arguments[2] === undefined ? 'Certification.Type.Manager' : arguments[2];

                            var item = createCertificationItem([CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Approved]);

                            createElement(item);
                            var menuButton = findMenuButton(element),
                                menuOptions = findMenuItems(element),
                                topButtons = findTopButtons(element);
                            if (type === Certification.Type.BusinessRoleComposition || type === Certification.Type.AccountGroupPermissions) {
                                expect(topButtons.length).toEqual(2);
                                expect(menuButton.length).toEqual(1);
                                expect(menuOptions.length).toEqual(expectIt ? 2 : 1);
                                expect(menuOptions[0].innerText.trim().startsWith('History')).toEqual(true);
                                if (expectIt) {
                                    expect(menuOptions[1].innerText.trim().startsWith(detailsMenuText)).toEqual(true);
                                }
                            } else {
                                expect(topButtons.length).toEqual(2);
                                expect(menuButton.length).toEqual(1);
                                expect(menuOptions.length).toEqual(expectIt ? 3 : 2);
                                expect(menuOptions[0].innerText.trim().startsWith('Comment')).toEqual(true);
                                expect(menuOptions[1].innerText.trim().startsWith('History')).toEqual(true);
                                if (expectIt) {
                                    expect(menuOptions[2].innerText.trim().startsWith(detailsMenuText)).toEqual(true);
                                }
                            }
                        }

                        it('shows details option in the menu if certificationItemDetailService.hasDetails is true', function () {
                            spyOn(certificationItemDetailService, 'hasDetails').and.returnValue(true);
                            testDetailsMenuItem(true);
                        });

                        it('does not show details option if certificationItemDetailService.hasDetails is false', function () {
                            spyOn(certificationItemDetailService, 'hasDetails').and.returnValue(false);
                            testDetailsMenuItem(false);
                        });

                        it('shows account details option in the menu if certificationItemDetailService.hasAccountDetails is true', function () {
                            spyOn(certificationItemDetailService, 'hasAccountDetails').and.returnValue(true);
                            testDetailsMenuItem(true, 'Account Details');
                        });

                        it('does not show account details option in menu if certificationItemDetailService.hasAccountDetails false', function () {
                            spyOn(certificationItemDetailService, 'hasAccountDetails').and.returnValue(false);
                            testDetailsMenuItem(false, 'Account Details');
                        });

                        it('shows role details option in the menu if certificationItemDetailService.hasRoleDetails is true, does', function () {
                            spyOn(certificationItemDetailService, 'hasRoleDetails').and.returnValue(true);
                            testDetailsMenuItem(true, 'Role Details');
                        });

                        it('does not show role details option in menu if certificationItemDetailService.hasRoleDetails is false', function () {
                            spyOn(certificationItemDetailService, 'hasRoleDetails').and.returnValue(false);
                            testDetailsMenuItem(false, 'Role Details');
                        });

                        it('does not have comment for Role Composition cert', function () {
                            certificationItemDetailService.getCertificationType = jasmine.createSpy().and.returnValue(Certification.Type.BusinessRoleComposition);
                            testDetailsMenuItem(false, 'Role Details');
                        });

                        it('does not have comment for Account Permission cert', function () {
                            certificationItemDetailService.getCertificationType = jasmine.createSpy().and.returnValue(Certification.Type.AccountGroupPermissions);
                            testDetailsMenuItem(false, 'Account Details');
                        });

                        it('disables buttons if certification is not editable', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved]),
                                element = createElement(item),
                                topButtons = findTopButtons(element),
                                menuOptions = findMenuItems(element),
                                certEditable = false;

                            spyOn(certificationDataService, 'isCertificationEditable').and.callFake(function () {
                                return certEditable;
                            });
                            expect(angular.element(topButtons[0]).attr('disabled')).toBeDefined();
                            expect(menuOptions[0].classList.contains('disabled')).toBeTruthy();
                            certEditable = true;
                            $scope.$apply();
                            expect(angular.element(topButtons[0]).attr('disabled')).not.toBeDefined();
                            expect(menuOptions[0].classList.contains('disabled')).toBeFalsy();
                        });

                        it('sets class if decision is current', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                                element = createElement(item),
                                topButtons = element.find('.cert-action-column > button:not(.dropdown-toggle)');

                            spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(createCertificationDecision(CertificationActionStatus.Name.Approved));
                            $scope.$apply();
                            expect(angular.element(topButtons[0]).hasClass('cert-action-current-decision')).toEqual(true);
                        });

                        it('sets class if decision is edited', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                                element = createElement(item),
                                topButtons = element.find('.cert-action-column > button:not(.dropdown-toggle)'),
                                editedDecision = createCertificationDecision(CertificationActionStatus.Name.Remediated);

                            editedDecision.edited = true;

                            spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(editedDecision);
                            $scope.$apply();
                            expect(angular.element(topButtons[1]).hasClass('cert-action-current-decision')).toEqual(true);
                        });

                        it('sets decision when clicked', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]),
                                element = createElement(item),
                                topButtons = element.find('.cert-action-column > button:not(.dropdown-toggle)');

                            // We need an exact match with message keys this once.
                            item.decisionStatus.decisions[0].promptKey = 'cert_action_approve';
                            item.decisionStatus.decisions[0].messageKey = 'cert_action_approve';
                            item.decisionStatus.decisions[1].promptKey = 'cert_action_remediate';
                            item.decisionStatus.decisions[1].messageKey = 'cert_action_remediate';

                            spyOn(certificationItemService, 'setDecision').and.returnValue(testService.createPromise(false, {
                                status: 'Approved'
                            }));

                            //Click approve
                            angular.element(topButtons[0]).click();
                            $scope.$apply();
                            expect(certificationItemService.setDecision).toHaveBeenCalledWith(item, item.decisionStatus.decisions[0]);
                            certificationItemService.setDecision.calls.reset();

                            //Click remediate
                            angular.element(topButtons[1]).click();
                            $scope.$apply();
                            expect(certificationItemService.setDecision).toHaveBeenCalledWith(item, item.decisionStatus.decisions[1]);
                        });

                        it('adds comment when Comment button clicked', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved]),
                                element = createElement(item),
                                menuOptions = findMenuItems(element),
                                commentText = 'some dumb comment',
                                certEditable = true,
                                cert = {
                                id: 'somecert'
                            };
                            spyOn(certificationDataService, 'isCertificationEditable').and.callFake(function () {
                                return certEditable;
                            });
                            spyOn(commentService, 'openCommentDialog').and.returnValue(testService.createPromise(false, commentText));
                            spyOn(certificationService, 'postComment');
                            spyOn(certificationDataService, 'getCertification').and.returnValue(cert);
                            angular.element(menuOptions[0]).find('a').click();
                            $scope.$apply();
                            expect(commentService.openCommentDialog).toHaveBeenCalled();
                            $scope.$apply();
                            expect(certificationService.postComment).toHaveBeenCalledWith(cert.id, item.id, commentText);
                        });

                        it('shows the history dialog when History button is clicked', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved]),
                                element = createElement(item),
                                menuOptions = findMenuItems(element);

                            spyOn(spModal, 'open').and.callFake(function () {
                                return {
                                    result: testService.createPromise(),
                                    setTitle: function (title) {}
                                };
                            });

                            angular.element(menuOptions[1]).find('a').click();

                            expect(spModal.open).toHaveBeenCalled();
                            var spModalArgs = spModal.open.calls.mostRecent().args;
                            expect(spModalArgs.length).toEqual(1);
                            expect(spModalArgs[0].resolve.challenge).toBeDefined();
                            expect(spModalArgs[0].resolve.certId).toBeDefined();
                            expect(spModalArgs[0].resolve.itemId).toBeDefined();
                            expect(spModalArgs[0].controller).toEqual('IdentityHistoryDialogCtrl');
                        });

                        it('calls through to certificationItemDetailService to show detail dialog', function () {
                            spyOn(certificationItemDetailService, 'showDetailDialog');
                            spyOn(certificationItemDetailService, 'hasDetails').and.returnValue(true);
                            var item = testDetailPopup();
                            expect(certificationItemDetailService.showDetailDialog).toHaveBeenCalledWith('certId', item);
                        });

                        it('calls through to certificationItemDetailService to show account detail dialog', function () {
                            spyOn(certificationItemDetailService, 'showAccountDetailDialog');
                            spyOn(certificationItemDetailService, 'hasAccountDetails').and.returnValue(true);
                            var item = testDetailPopup('Account Details');
                            expect(certificationItemDetailService.showAccountDetailDialog).toHaveBeenCalledWith('certId', item);
                        });

                        it('findActionStatus should return correct status', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Remediated, CertificationItem.Status.Complete),
                                ctrl = createController(item);

                            expect(ctrl.findActionStatus({ status: CertificationActionStatus.Name.Remediated }).name).toBe(CertificationActionStatus.Name.Remediated);

                            expect(ctrl.findActionStatus({ status: CertificationActionStatus.Name.Approved }).name).toBe(CertificationActionStatus.Name.Approved);

                            expect(ctrl.findActionStatus({ status: CertificationActionStatus.Name.Cleared }).name).toBe(CertificationActionStatus.Name.Cleared);

                            expect(ctrl.findActionStatus({ status: 'foo' })).toBeUndefined();
                        });

                        it('sets class if dependent decision', function () {
                            var item = createCertificationItem([CertificationActionStatus.Name.Remediated], undefined, CertificationItem.Status.Open),
                                element = createElement(item),
                                decision = {
                                revokedRoles: ['Role1', 'Role2'],
                                status: 'Remediated'
                            },
                                topButtons = element.find('.cert-action-column > button:not(.dropdown-toggle)');

                            spyOn(certificationDataService.decisions, 'getDecision').and.returnValue(undefined);
                            spyOn(certificationDataService.decisions, 'getSourceDecisions').and.returnValue([decision]);
                            $scope.$apply();
                            expect(angular.element(topButtons[0]).hasClass('cert-action-current-decision')).toEqual(true);
                        });
                    });

                    describe('type is AccountGroupPermissions', function () {
                        it('calls through to certificationEntityService.showDetailDialog when link is clicked', function () {
                            spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupPermissions);
                            spyOn(certificationItemDetailService, 'hasDetails').and.returnValue(true);
                            spyOn(certificationEntityService, 'showManagedAttributeDetailDialog');
                            var item = testDetailPopup();
                            expect(certificationEntityService.showManagedAttributeDetailDialog).toHaveBeenCalledWith('certId', Certification.Type.AccountGroupPermissions, item.entityId);
                        });
                    });
                });

                describe('isSourceItemUndone()', function () {
                    var item = undefined,
                        ctrl = undefined,
                        sourceDecision = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Remediated, CertificationItem.Status.Complete);
                        item.decisionStatus.sourceItemId = '5678';
                        item.decisionStatus.dependentDecision = true;
                        ctrl = createController(item);
                        spyOn(certificationDataService.decisions, 'getDecision').and.callFake(function () {
                            return sourceDecision;
                        });
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    it('returns false if not a dependent decision', function () {
                        item.decisionStatus.dependentDecision = false;
                        expect(ctrl.isSourceItemUndone()).toEqual(false);
                    });

                    it('returns false if no source item id', function () {
                        delete item.decisionStatus.sourceItemId;
                        expect(ctrl.isSourceItemUndone()).toEqual(false);
                    });

                    it('returns false if no decision in the store for source item', function () {
                        sourceDecision = undefined;
                        expect(ctrl.isSourceItemUndone()).toEqual(false);
                    });

                    it('returns true if decision in the store with different status', function () {
                        sourceDecision = {
                            status: 'Undo'
                        };
                        expect(ctrl.isSourceItemUndone()).toEqual(true);
                    });
                });

                describe('isIndirectAccountDecisionUndone', function () {
                    var item = undefined,
                        ctrl = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.RevokeAccount], CertificationActionStatus.Name.RevokeAccount, CertificationItem.Status.Complete);
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });

                        ctrl = createController(item);
                    });

                    it('returns false if not undoing an account decision', function () {
                        spyOn(certificationDataService.decisions, 'isAccountDecisionUndo').and.returnValue(false);
                        expect(ctrl.isIndirectAccountDecisionUndone({})).toEqual(false);
                    });

                    it('returns false if is a direct decision that undoes an account decision', function () {
                        var decision = CertificationDecision.createItemDecision(item, new CertificationActionStatus({ status: CertificationActionStatus.Name.Cleared }));
                        spyOn(certificationDataService.decisions, 'isAccountDecisionUndo').and.returnValue(true);
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(decision);
                        expect(ctrl.isIndirectAccountDecisionUndone(decision)).toEqual(false);
                    });

                    it('returns true if is an indirect undo decision', function () {
                        var decision1 = createCertificationDecision(CertificationActionStatus.Name.Approved),
                            decision2 = createCertificationDecision(CertificationActionStatus.Name.Cleared);
                        spyOn(certificationDataService.decisions, 'isAccountDecisionUndo').and.returnValue(true);
                        // Mimic an indirect decision by using non-matching decisions.
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(decision1);
                        expect(ctrl.isIndirectAccountDecisionUndone(decision2)).toEqual(true);
                    });
                });

                describe('getCurrentDecision()', function () {

                    var item = undefined,
                        ctrl = undefined,
                        unsavedDecision = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]);
                        ctrl = createController(item);
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.callFake(function () {
                            return unsavedDecision;
                        });
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });

                        unsavedDecision = undefined;
                    });

                    it('returns action status for current decision if unsaved decision', function () {
                        unsavedDecision = {
                            status: 'Remediated'
                        };
                        expect(ctrl.getCurrentDecision()).toEqual(item.decisionStatus.decisions[1]);
                    });

                    it('returns saved action status if no unsaved decision', function () {
                        item.decisionStatus.currentState = {
                            name: 'Approved',
                            status: 'Approved'
                        };

                        expect(ctrl.getCurrentDecision()).toEqual(item.decisionStatus.currentState);
                    });

                    it('returns Undo status if source item is undone and no unsaved decision', function () {
                        spyOn(ctrl, 'isSourceItemUndone').and.returnValue(true);
                        expect(ctrl.getCurrentDecision().status).toEqual(CertificationActionStatus.Name.Cleared);
                    });

                    it('returns action status for current decision if unsaved decision if source item is undone', function () {
                        spyOn(ctrl, 'isSourceItemUndone').and.returnValue(true);
                        unsavedDecision = {
                            status: 'Approved'
                        };
                        expect(ctrl.getCurrentDecision()).toEqual(item.decisionStatus.decisions[0]);
                    });

                    it('returns undo status if indirect account decision undo', function () {
                        spyOn(ctrl, 'isIndirectAccountDecisionUndone').and.returnValue(true);
                        unsavedDecision = {
                            status: 'Approved'
                        };
                        expect(ctrl.getCurrentDecision().status).toEqual(CertificationActionStatus.Name.Cleared);
                    });

                    it('returns decision status if direct account decision undo', function () {
                        spyOn(ctrl, 'isIndirectAccountDecisionUndone').and.returnValue(false);
                        unsavedDecision = {
                            status: 'Approved'
                        };
                        expect(ctrl.getCurrentDecision().status).toEqual(CertificationActionStatus.Name.Approved);
                    });
                });

                describe('isCurrentDecision()', function () {

                    var item = undefined,
                        ctrl = undefined,
                        unsavedDecision = undefined,
                        unsavedSourceDecision = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]);
                        ctrl = createController(item);
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.callFake(function () {
                            return unsavedDecision;
                        });
                        spyOn(certificationDataService.decisions, 'getSourceDecisions').and.callFake(function () {
                            return [unsavedSourceDecision];
                        });
                        unsavedDecision = undefined;
                        unsavedSourceDecision = undefined;
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    it('returns false if decision is undefined', function () {
                        expect(ctrl.isCurrentDecision()).toEqual(false);
                    });

                    it('returns false if Delegation Review source item is undone and decision is not Cleared', function () {
                        spyOn(ctrl, 'isDelegatedItem').and.returnValue(true);
                        spyOn(ctrl, 'isSourceItemUndone').and.returnValue(true);
                        expect(ctrl.isCurrentDecision({
                            name: 'Remediated'
                        })).toEqual(false);
                    });

                    it('returns true if Delegation Review source item is undone and decision is Cleared', function () {
                        spyOn(ctrl, 'isDelegatedItem').and.returnValue(true);
                        spyOn(ctrl, 'isSourceItemUndone').and.returnValue(true);
                        expect(ctrl.isCurrentDecision({
                            name: 'Cleared'
                        })).toEqual(true);
                    });

                    it('returns true if there is an unsaved decision for the item and it matches', function () {
                        unsavedDecision = {
                            status: 'Remediated'
                        };
                        expect(ctrl.isCurrentDecision({
                            name: 'Remediated'
                        })).toEqual(true);
                    });

                    it('returns false if there is an unsaved decision for the item and it does not match', function () {
                        unsavedDecision = {
                            status: 'Remediated'
                        };
                        expect(ctrl.isCurrentDecision({
                            name: 'Approved'
                        })).toEqual(false);
                    });

                    it('returns true if there is an unsaved decision for the source item and it matches', function () {
                        unsavedSourceDecision = {
                            status: 'Remediated'
                        };
                        expect(ctrl.isCurrentDecision({
                            name: 'Remediated'
                        })).toEqual(true);
                    });

                    it('returns false if there is an unsaved decision for the source item and it does not match', function () {
                        unsavedSourceDecision = {
                            status: 'Remediated'
                        };
                        expect(ctrl.isCurrentDecision({
                            name: 'Approved'
                        })).toEqual(false);
                    });

                    it('returns true if status matches and delegationReviewAction matches', function () {
                        unsavedDecision = {
                            status: 'Remediated',
                            delegationReviewAction: 'Accept'
                        };
                        expect(ctrl.isCurrentDecision({
                            status: 'Remediated',
                            delegationReviewAction: 'Accept'
                        })).toEqual(true);
                    });

                    it('returns false if status matches and delegationReviewAction does not match', function () {
                        unsavedDecision = {
                            status: 'Remediated',
                            delegationReviewAction: 'Accept'
                        };
                        expect(ctrl.isCurrentDecision({
                            status: 'Remediated',
                            delegationReviewAction: 'Reject'
                        })).toEqual(false);
                    });

                    it('returns true if status is Cleared and we have an unsaved indirect account undo decision', function () {
                        spyOn(ctrl, 'isIndirectAccountDecisionUndone').and.returnValue(true);
                        unsavedDecision = {
                            status: 'Approved'
                        };
                        expect(ctrl.isCurrentDecision({
                            name: 'Cleared'
                        })).toEqual(true);
                    });
                });

                describe('isEdited()', function () {

                    var item = undefined,
                        ctrl = undefined,
                        unsavedDecision = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated]);
                        ctrl = createController(item);
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.callFake(function () {
                            return unsavedDecision;
                        });
                        unsavedDecision = undefined;
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    it('returns false if decision is undefined', function () {
                        expect(ctrl.isEdited()).toEqual(false);
                    });

                    it('returns false if decision is not edited', function () {
                        unsavedDecision = {
                            edited: false
                        };
                        expect(ctrl.isEdited()).toEqual(false);
                    });

                    it('returns true if decision is edited', function () {
                        unsavedDecision = {
                            edited: true
                        };
                        expect(ctrl.isEdited()).toEqual(true);
                    });
                });

                describe('getButtonDecisions', function () {
                    var item = undefined,
                        ctrl = undefined;

                    function createControllerWithStatus(status, policyType, noRemediate) {
                        var statuses = [CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated];
                        if (noRemediate) {
                            statuses.pop();
                        }
                        item = createCertificationItem(statuses, status, CertificationItem.Status.WaitingReview, policyType);
                        ctrl = createController(item);
                        spyOn(item, 'isPolicyViolation').and.returnValue(true);
                    }

                    describe('non policy violation delegated items.', function () {
                        it('Role should return Remediated for Approved', function () {
                            createControllerWithStatus(CertificationActionStatus.Name.Approved);
                            expect(ctrl.getButtonDecisions()[1].name).toBe(CertificationActionStatus.Name.Remediated);
                        });

                        it('Role should return Approved for Remediated', function () {
                            createControllerWithStatus(CertificationActionStatus.Name.Remediated);
                            expect(ctrl.getButtonDecisions()[1].name).toBe(CertificationActionStatus.Name.Approved);
                        });

                        it('Role should return Remediated for Mitigated', function () {
                            createControllerWithStatus(CertificationActionStatus.Name.Mitigated);
                            expect(ctrl.getButtonDecisions()[1].name).toBe(CertificationActionStatus.Name.Remediated);
                        });
                    });
                });

                describe('getMenuDecisions()', function () {
                    var item = undefined,
                        ctrl = undefined;

                    function createItem(status) {
                        var localItem = createCertificationItem([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Acknowledged, CertificationActionStatus.Name.Remediated], CertificationActionStatus.Name.Remediated, status);
                        return localItem;
                    }

                    it('should not return Delegated if summaryStatus is Challenged', function () {
                        item = createItem(CertificationItem.Status.Challenged);
                        ctrl = createController(item);
                        var menu = ctrl.getMenuDecisions();
                        expect(menu.length).toEqual(1);
                        expect(menu[0].name).toBe(CertificationActionStatus.Name.Acknowledged);
                    });

                    it('should return Delegated if summaryStatus is not Challenged', function () {
                        item = createItem();
                        ctrl = createController(item);
                        var menu = ctrl.getMenuDecisions();
                        expect(menu.length).toEqual(2);
                        expect(menu[0].name).toBe(CertificationActionStatus.Name.Delegated);
                        expect(menu[1].name).toBe(CertificationActionStatus.Name.Acknowledged);
                    });
                });

                describe('hasMenuAction()', function () {
                    var item = undefined,
                        ctrl = undefined;

                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Acknowledged, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated], undefined, CertificationItem.Status.Open);
                        ctrl = createController(item);
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    it('returns false if current decision is null', function () {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(null);

                        expect(ctrl.hasMenuAction()).toEqual(false);
                    });

                    it('returns false if current decision is a button', function () {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(createCertificationDecision(CertificationActionStatus.Name.Approved));

                        expect(ctrl.hasMenuAction()).toEqual(false);
                    });

                    it('returns false if current decision does not exist', function () {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(createCertificationDecision(CertificationActionStatus.Name.Cleared));

                        expect(ctrl.hasMenuAction()).toEqual(false);
                    });

                    it('returns true if current decision is a menu action', function () {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecisionByItem').and.returnValue(createCertificationDecision(CertificationActionStatus.Name.Mitigated));

                        expect(ctrl.hasMenuAction()).toEqual(true);
                    });
                });

                describe('makeDecision()', function () {
                    var ctrl = undefined,
                        item = undefined;
                    beforeEach(function () {
                        item = createCertificationItem([CertificationActionStatus.Name.Delegated, CertificationActionStatus.Name.Approved, CertificationActionStatus.Name.Remediated, CertificationActionStatus.Name.Mitigated], undefined, CertificationItem.Status.Open);
                        ctrl = createController(item);
                        spyOn(certificationItemService, 'setDecision').and.callFake(function () {
                            return $q.when();
                        });
                        spyOn(certificationActionsFactoryService, 'getCertificationActions');
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    it('should call initializeActions after setDecision', function () {
                        ctrl.makeDecision(new CertificationActionStatus({ status: CertificationActionStatus.Name.Approved }));
                        $scope.$apply();
                        expect(certificationActionsFactoryService.getCertificationActions).toHaveBeenCalled();
                    });
                });

                describe('view/edit decisions', function () {
                    var ctrl = undefined,
                        item = undefined;

                    beforeEach(function () {
                        item = createCertificationItem();
                        ctrl = createController(item);
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                    });

                    describe('canViewDecision', function () {
                        it('return calls certificationItemService.canViewDecision', function () {
                            var val = 'abcd';
                            spyOn(certificationItemService, 'canViewDecision').and.returnValue(val);
                            var returnVal = ctrl.canViewDecision();
                            expect(certificationItemService.canViewDecision).toHaveBeenCalledWith(item);
                            expect(returnVal).toEqual(val);
                        });
                    });

                    describe('canEditDecision', function () {
                        it('return calls certificationItemService.canEditDecision', function () {
                            var val = 'abcd';
                            spyOn(certificationItemService, 'canEditDecision').and.returnValue(val);
                            var returnVal = ctrl.canEditDecision();
                            expect(certificationItemService.canEditDecision).toHaveBeenCalledWith(item);
                            expect(returnVal).toEqual(val);
                        });
                    });

                    describe('editDecision', function () {
                        it('calls certificationItemService.editDecision', function () {
                            spyOn(certificationItemService, 'editDecision');
                            ctrl.editDecision();
                            expect(certificationItemService.editDecision).toHaveBeenCalledWith(item);
                        });
                    });

                    describe('viewDecision', function () {
                        it('calls certificationItemService.viewDecision', function () {
                            spyOn(certificationItemService, 'viewDecision');
                            ctrl.viewDecision();
                            expect(certificationItemService.viewDecision).toHaveBeenCalledWith(item);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHFDQUFxQywyQkFBMkIsc0JBQXNCLDRDQUE0QyxVQUFVLFNBQVM7OztJQUdsSzs7SUFFQSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsbUNBQW1DO1lBQ25ELHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1CQUFtQjtZQUNsRSxhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7OztZQUo3QixTQUFTLCtCQUErQixZQUFXOztnQkFFL0MsSUFBSSxvQkFBaUI7b0JBQ2pCLG9CQUFpQjtvQkFBRSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsY0FBVztvQkFBRSxLQUFFO29CQUFFLDJCQUF3QjtvQkFDOUUsMkJBQXdCO29CQUFFLHVCQUFvQjtvQkFBRSxjQUFXO29CQUFFLGlCQUFjO29CQUFFLDRCQUF5QjtvQkFDdEcsc0JBQW1CO29CQUFFLG9CQUFpQjtvQkFBRSw4QkFBMkI7b0JBQUUseUJBQXNCO29CQUFFLFVBQU87b0JBQ3BHLHFDQUFrQztvQkFBRSx3QkFBcUI7b0JBQUUsaUNBQThCO29CQUFFLFVBQU87b0JBQ2xHLGdCQUFhO29CQUFFLDZCQUEwQjs7Z0JBRTdDLFdBQVcsT0FBTyxxQkFBcUI7OztnQkFHdkMsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLHFCQUFxQiw2QkFDL0MsNEJBQTRCLGtCQUFrQixNQUM5Qyw0QkFBNEIsd0JBQXdCLGVBQWUsZUFDbkUsdUJBQXVCLHFCQUFxQiwrQkFDNUMsMEJBQTBCLFdBQVcsc0NBQ3JDLHlCQUF5QixrQ0FBa0MsaUJBQzNELDhCQUE4QjtvQkFDckQsU0FBUyxhQUFhO29CQUN0QixXQUFXO29CQUNYLGNBQWM7b0JBQ2Qsb0JBQW9CO29CQUNw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Ozs7O29CQUlsQyxTQUFTLGdCQUFnQixZQUFNO3dCQUMzQixHQUFHLCtDQUErQyxZQUFNOzRCQUNwRCxNQUFNLDBCQUEwQjs0QkFDaEMsS0FBSzs0QkFDTCxPQUFPLHlCQUF5QixjQUFjLHFCQUFxQjs7OztvQkFJM0UsU0FBUyxnQkFBZ0IsWUFBTTt3QkFDM0IsR0FBRywrQ0FBK0MsWUFBTTs0QkFDcEQsTUFBTSwwQkFBMEI7NEJBQ2hDLEtBQUs7NEJBQ0wsT0FBTyx5QkFBeUIsY0FBYyxxQkFBcUI7Ozs7Ozs7R0FqQ2hGIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjdGlvbkNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbi8qIGpzaGludCBtYXhzdGF0ZW1lbnRzOiA1MSAqL1xuZGVzY3JpYmUoJ3NwQ2VydGlmaWNhdGlvbkFjdGlvbkNvbHVtbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxzcC1jZXJ0aWZpY2F0aW9uLWFjdGlvbi1jb2x1bW4gc3AtbW9kZWw9XCJpdGVtXCIgLz5gLFxuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSwgJHNjb3BlLCAkY29tcGlsZSwgJGNvbnRyb2xsZXIsICRxLCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsXG4gICAgICAgIGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgY2VydGlmaWNhdGlvblNlcnZpY2UsIHRlc3RTZXJ2aWNlLCBjb21tZW50U2VydmljZSwgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyxcbiAgICAgICAgQ2VydGlmaWNhdGlvbkNvbmZpZywgc3BUcmFuc2xhdGVGaWx0ZXIsIENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cywgQ2VydGlmaWNhdGlvblZpZXdTdGF0ZSwgc3BNb2RhbCxcbiAgICAgICAgY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZSwgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsIGVsZW1lbnQsXG4gICAgICAgIENlcnRpZmljYXRpb24sIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMjIgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9DZXJ0aWZpY2F0aW9uSXRlbV8sIF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXywgX2NvbW1lbnRTZXJ2aWNlXywgXyRxXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlXywgX2NlcnRpZmljYXRpb25TZXJ2aWNlXywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfQ2VydGlmaWNhdGlvbkNvbmZpZ18sIF9zcFRyYW5zbGF0ZUZpbHRlcl8sIF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXNfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uVmlld1N0YXRlXywgX3NwTW9kYWxfLCBfY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NlcnRpZmljYXRpb25EZWNpc2lvbl8sIF9jZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2VfLCBfQ2VydGlmaWNhdGlvbl8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uID0gX0NlcnRpZmljYXRpb25fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMgPSBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzXztcbiAgICAgICAgQ2VydGlmaWNhdGlvbkNvbmZpZyA9IF9DZXJ0aWZpY2F0aW9uQ29uZmlnXztcbiAgICAgICAgQ2VydGlmaWNhdGlvblZpZXdTdGF0ZSA9IF9DZXJ0aWZpY2F0aW9uVmlld1N0YXRlXztcbiAgICAgICAgY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb24gPSBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uXztcbiAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXztcblxuICAgICAgICBjb21tZW50U2VydmljZSA9IF9jb21tZW50U2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlXztcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRxID0gXyRxXztcblxuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZUNvbmZpZ3VyYXRpb24obmV3IENlcnRpZmljYXRpb25Db25maWcoe1xuICAgICAgICAgICAgcHJvY2Vzc1Jldm9rZXNJbW1lZGlhdGVseTogZmFsc2VcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ2NlcnRfYWN0aW9uX2FwcHJvdmVkJzogJ0FwcHJvdmVkJyxcbiAgICAgICAgICAgICdjZXJ0X2FjdGlvbl9hcHByb3ZlJzogJ0FwcHJvdmUnLFxuICAgICAgICAgICAgJ2NlcnRfYWN0aW9uX3JlbWVkaWF0ZSc6ICdSZXZva2UnLFxuICAgICAgICAgICAgJ3VpX2NlcnRfbWVudV9jb21tZW50JzogJ0NvbW1lbnQnLFxuICAgICAgICAgICAgJ3VpX2NlcnRfbWVudV9oaXN0b3J5JzogJ0hpc3RvcnknLFxuICAgICAgICAgICAgJ3VpX2NlcnRfbWVudV9kZXRhaWxzJzogJ0RldGFpbHMnLFxuICAgICAgICAgICAgJ3VpX2NlcnRfbWVudV9hY2NvdW50X2RldGFpbHMnOiAnQWNjb3VudCBEZXRhaWxzJyxcbiAgICAgICAgICAgICd1aV9jZXJ0X21lbnVfcm9sZV9kZXRhaWxzJzogJ1JvbGUgRGV0YWlscydcbiAgICAgICAgfSk7XG5cbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihpdGVtKSB7XG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywge30sIHtpdGVtOiBpdGVtfSk7XG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xuICAgICAgICByZXR1cm4gY3RybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShzdGF0dXNlcywgZGVjaXNpb25TdGF0ZSwgc3VtbWFyeVN0YXR1cywgcG9saWN5VHlwZSkge1xuICAgICAgICBsZXQgZGVjaXNpb25TdGF0dXMgPSBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzKHt9KTtcbiAgICAgICAgaWYgKHN0YXR1c2VzKSB7XG4gICAgICAgICAgICBzdGF0dXNlcy5mb3JFYWNoKChzdGF0dXMpID0+IGRlY2lzaW9uU3RhdHVzLmRlY2lzaW9ucy5wdXNoKG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBwcm9tcHRLZXk6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBuYW1lOiBzdGF0dXNcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVjaXNpb25TdGF0ZSkge1xuICAgICAgICAgICAgZGVjaXNpb25TdGF0dXMuY3VycmVudFN0YXRlID0gbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogZGVjaXNpb25TdGF0ZSxcbiAgICAgICAgICAgICAgICBwcm9tcHRLZXk6IGRlY2lzaW9uU3RhdGUsXG4gICAgICAgICAgICAgICAgbmFtZTogZGVjaXNpb25TdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcbiAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1czogZGVjaXNpb25TdGF0dXMsXG4gICAgICAgICAgICBwb2xpY3lUeXBlOiBwb2xpY3lUeXBlLFxuICAgICAgICAgICAgc3VtbWFyeVN0YXR1czogc3VtbWFyeVN0YXR1cyA/IHN1bW1hcnlTdGF0dXMgOiBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuT3BlbixcbiAgICAgICAgICAgIHJvbGVOYW1lOiAnUm9sZTEnLFxuICAgICAgICAgICAgY2FuQ2hhbmdlRGVjaXNpb246IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFRvcEJ1dHRvbnMoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcuY2VydC1hY3Rpb24tY29sdW1uID4gYnV0dG9uOm5vdCguZHJvcGRvd24tdG9nZ2xlKScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRNZW51QnV0dG9uKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnLmNlcnQtYWN0aW9uLWNvbHVtbiBidXR0b24uZHJvcGRvd24tdG9nZ2xlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZE1lbnVJdGVtcyhlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJy5jZXJ0LWFjdGlvbi1jb2x1bW4gdWwuZHJvcGRvd24tbWVudSBsaScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNlcnRpZmljYXRpb25EZWNpc2lvbihzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDZXJ0aWZpY2F0aW9uRGVjaXNpb24obmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoeyBzdGF0dXM6IHN0YXR1cyB9KSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2RlbGVnYXRlZCBpdGVtcycsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0sIGRlbGVnYXRlZEVsZW1lbnQ7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oWyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5EZWxlZ2F0ZWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcbiAgICAgICAgICAgIGRlbGVnYXRlZEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzaG93IGFjdGlvbiBidXR0b25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRvcEJ1dHRvbnMgPSBmaW5kVG9wQnV0dG9ucyhkZWxlZ2F0ZWRFbGVtZW50KTtcbiAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGNlcnQtYWN0aW9uLWN1cnJlbnQtZGVjaXNpb24tc3RhdGUgc3BhbiB0aGF0IHNob3dzIHNhdmVkIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uU3RhdGVTcGFuID0gZGVsZWdhdGVkRWxlbWVudC5maW5kKCdzcGFuLmNlcnQtYWN0aW9uLWN1cnJlbnQtZGVjaXNpb24tc3RhdGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvblN0YXRlU3Bhbi5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25TdGF0ZVNwYW5bMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgnY2VydF9hY3Rpb25fZGVsZWdhdGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N1bW1hcnkgc3RhdHVzIENvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBpdGVtLCBhcHByb3ZlZEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW1XaXRoUmVtZWRpYXRlZERlY2lzaW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFsgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0sXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNvbXBsZXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFsgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNvbXBsZXRlXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5jYWxsRmFrZSgoKSA9PiBDZXJ0aWZpY2F0aW9uLlR5cGUuTWFuYWdlcik7XG5cbiAgICAgICAgICAgIGFwcHJvdmVkRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaXRlbSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGJ1dHRvbiBkZWNpc2lvbiBpdGVtcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0b3BCdXR0b25zID0gZmluZFRvcEJ1dHRvbnMoYXBwcm92ZWRFbGVtZW50KTtcbiAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IHNob3cgbWVudSBpdGVtcyB3aGVuIGNlcnQgaXMgc2lnbmVkIG9mZicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2lzU2lnbmVkT2ZmJykuYW5kLmNhbGxGYWtlKCgpID0+IHRydWUpO1xuXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtV2l0aFJlbWVkaWF0ZWREZWNpc2lvbigpLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0ZWRFbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICByZW1lZGlhdGVkTWVudUl0ZW1zID0gZmluZE1lbnVJdGVtcyhyZW1lZGlhdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIHNob3VsZCBvbmx5IGJlIGNvbW1lbnQgYW5kIGhpc3RvcnkgbWVudSBpdGVtc1xuICAgICAgICAgICAgZXhwZWN0KHJlbWVkaWF0ZWRNZW51SXRlbXMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgY2VydC1hY3Rpb24tY3VycmVudC1kZWNpc2lvbi1zdGF0ZSBzcGFuIHRoYXQgc2hvd3Mgc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb25TdGF0ZVNwYW4gPSBhcHByb3ZlZEVsZW1lbnQuZmluZCgnc3Bhbi5jZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uLXN0YXRlJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25TdGF0ZVNwYW4ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uU3RhdGVTcGFuWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGNsZWFyIG1lbnUgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBtZW51SXRlbXMgPSBmaW5kTWVudUl0ZW1zKGFwcHJvdmVkRWxlbWVudCk7XG4gICAgICAgICAgICBleHBlY3QobWVudUl0ZW1zWzBdLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxzL2csICcnKSkudG9FcXVhbCgnY2VydF9hY3Rpb25fdW5kbycgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIGNvcnJlY3QgbWVudSBpdGVtIGJhc2VkIG9uIHNhdmVkIG9yIGN1cnJlbnQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXBwcm92ZWRNZW51SXRlbXMgPSBmaW5kTWVudUl0ZW1zKGFwcHJvdmVkRWxlbWVudCksXG4gICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtV2l0aFJlbWVkaWF0ZWREZWNpc2lvbigpLFxuICAgICAgICAgICAgICAgIHJlbWVkaWF0ZWRFbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICByZW1lZGlhdGVkTWVudUl0ZW1zID0gZmluZE1lbnVJdGVtcyhyZW1lZGlhdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZlZE1lbnVJdGVtc1sxXS5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJykpLnRvRXF1YWwoJ1Jldm9rZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChyZW1lZGlhdGVkTWVudUl0ZW1zWzFdLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxzL2csICcnKSkudG9FcXVhbCgnQXBwcm92ZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtaXNjZWxsYW5lb3VzIGNsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xpY2tNZW51SXRlbShlbGVtZW50LCBsYWJlbFRleHQpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9ucyA9IGZpbmRNZW51SXRlbXMoZWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgbWVudUl0ZW0gPSBtZW51T3B0aW9ucy5maW5kKGBhOmNvbnRhaW5zKCcke2xhYmVsVGV4dH0nKWApO1xuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIG1lbnVJdGVtLmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0ZXN0RGV0YWlsUG9wdXAobWVudUl0ZW0gPSAnRGV0YWlscycpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pO1xuXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uJykuYW5kLnJldHVyblZhbHVlKHtpZDogJ2NlcnRJZCd9KTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSk7XG4gICAgICAgICAgICBjbGlja01lbnVJdGVtKGVsZW1lbnQsIG1lbnVJdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVzY3JpYmUoJ2NlcnQgdHlwZSBpcyBNYW5hZ2VyJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gc3BNb2RlbCBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChudWxsKSkudG9UaHJvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGNlcnQtYWN0aW9uLWN1cnJlbnQtZGVjaXNpb24tc3RhdGUgc3BhbiB0aGF0IHNob3dzIHNhdmVkIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW1xuICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdLFxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5Db21wbGV0ZSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBkZWNpc2lvblN0YXRlU3BhbiA9IGVsZW1lbnQuZmluZCgnc3Bhbi5jZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uLXN0YXRlJyk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoZGVjaXNpb25TdGF0ZVNwYW4ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvblN0YXRlU3BhblswXS5jbGFzc0xpc3QuY29udGFpbnMoJ25nLWhpZGUnKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvd3MgdG9wIGxldmVsIGJ1dHRvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BY2tub3dsZWRnZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0sXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLk9wZW4pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGZpbmRUb3BCdXR0b25zKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRvcEJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zWzBdLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxzL2csICcnKSkudG9FcXVhbCgnQXBwcm92ZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodG9wQnV0dG9uc1sxXS5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJykpLnRvRXF1YWwoJ1Jldm9rZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvd3MgdG9wIGxldmVsIGJ1dHRvbnMgaW4gdGhlIGNvcnJlY3Qgb3JkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkXSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuT3BlbiksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICB0b3BCdXR0b25zID0gZmluZFRvcEJ1dHRvbnMoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QodG9wQnV0dG9ucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRvcEJ1dHRvbnNbMF0uaW5uZXJUZXh0LnRyaW0oKS5yZXBsYWNlKC9cXHMvZywgJycpKS50b0VxdWFsKCdBcHByb3ZlJyArIGl0ZW0uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zWzFdLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxzL2csICcnKSkudG9FcXVhbCgnUmV2b2tlJyArIGl0ZW0uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdhbHdheXMgc2hvd3MgYXQgbGVhc3QgdHdvIHRvcCBsZXZlbCBidXR0b25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuTWl0aWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGZpbmRUb3BCdXR0b25zKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHRvcEJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zWzBdLmlubmVyVGV4dC50cmltKCkucmVwbGFjZSgvXFxzL2csICcnKSkudG9FcXVhbCgnQXBwcm92ZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICBleHBlY3QodG9wQnV0dG9uc1sxXS5pbm5lclRleHQudHJpbSgpLnJlcGxhY2UoL1xccy9nLCAnJykpLnRvRXF1YWwoJ1Jldm9rZScgKyBpdGVtLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvd3Mgb3RoZXIgaXRlbXMgaW4gdGhlIG1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgbWVudUJ1dHRvbiA9IGZpbmRNZW51QnV0dG9uKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBtZW51T3B0aW9ucyA9IGZpbmRNZW51SXRlbXMoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHRvcEJ1dHRvbnMgPSBmaW5kVG9wQnV0dG9ucyhlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobWVudUJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1lbnVPcHRpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMF0uaW5uZXJUZXh0LnRyaW0oKS5zdGFydHNXaXRoKCdDb21tZW50JykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gdGVzdERldGFpbHNNZW51SXRlbShleHBlY3RJdCwgZGV0YWlsc01lbnVUZXh0ID0gJ0RldGFpbHMnLCB0eXBlID0gJ0NlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyJykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdKTtcblxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSk7XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVCdXR0b24gPSBmaW5kTWVudUJ1dHRvbihlbGVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbWVudU9wdGlvbnMgPSBmaW5kTWVudUl0ZW1zKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICB0b3BCdXR0b25zID0gZmluZFRvcEJ1dHRvbnMoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IENlcnRpZmljYXRpb24uVHlwZS5CdXNpbmVzc1JvbGVDb21wb3NpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICB0eXBlID09PSBDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwUGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHRvcEJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QobWVudUJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChtZW51T3B0aW9ucy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0SXQgPyAyIDogMSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChtZW51T3B0aW9uc1swXS5pbm5lclRleHQudHJpbSgpLnN0YXJ0c1dpdGgoJ0hpc3RvcnknKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGVjdEl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMV0uaW5uZXJUZXh0LnRyaW0oKS5zdGFydHNXaXRoKGRldGFpbHNNZW51VGV4dCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdCh0b3BCdXR0b25zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KG1lbnVCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdEl0ID8gMyA6IDIpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMF0uaW5uZXJUZXh0LnRyaW0oKS5zdGFydHNXaXRoKCdDb21tZW50JykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChtZW51T3B0aW9uc1sxXS5pbm5lclRleHQudHJpbSgpLnN0YXJ0c1dpdGgoJ0hpc3RvcnknKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGVjdEl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMl0uaW5uZXJUZXh0LnRyaW0oKS5zdGFydHNXaXRoKGRldGFpbHNNZW51VGV4dCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0KCdzaG93cyBkZXRhaWxzIG9wdGlvbiBpbiB0aGUgbWVudSBpZiBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuaGFzRGV0YWlscyBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnaGFzRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0ZXN0RGV0YWlsc01lbnVJdGVtKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGRldGFpbHMgb3B0aW9uIGlmIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzIGlzIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnaGFzRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGVzdERldGFpbHNNZW51SXRlbShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3dzIGFjY291bnQgZGV0YWlscyBvcHRpb24gaW4gdGhlIG1lbnUgaWYgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0FjY291bnREZXRhaWxzIGlzIHRydWUnLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnaGFzQWNjb3VudERldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRlc3REZXRhaWxzTWVudUl0ZW0odHJ1ZSwgJ0FjY291bnQgRGV0YWlscycpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyBhY2NvdW50IGRldGFpbHMgb3B0aW9uIGluIG1lbnUgaWYgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0FjY291bnREZXRhaWxzIGZhbHNlJyxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSwgJ2hhc0FjY291bnREZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdERldGFpbHNNZW51SXRlbShmYWxzZSwgJ0FjY291bnQgRGV0YWlscycpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvd3Mgcm9sZSBkZXRhaWxzIG9wdGlvbiBpbiB0aGUgbWVudSBpZiBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuaGFzUm9sZURldGFpbHMgaXMgdHJ1ZSwgZG9lcycsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdoYXNSb2xlRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGVzdERldGFpbHNNZW51SXRlbSh0cnVlLCAnUm9sZSBEZXRhaWxzJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IHJvbGUgZGV0YWlscyBvcHRpb24gaW4gbWVudSBpZiBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuaGFzUm9sZURldGFpbHMgaXMgZmFsc2UnLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnaGFzUm9sZURldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB0ZXN0RGV0YWlsc01lbnVJdGVtKGZhbHNlLCAnUm9sZSBEZXRhaWxzJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBoYXZlIGNvbW1lbnQgZm9yIFJvbGUgQ29tcG9zaXRpb24gY2VydCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvblR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuQnVzaW5lc3NSb2xlQ29tcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRlc3REZXRhaWxzTWVudUl0ZW0oZmFsc2UsICdSb2xlIERldGFpbHMnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgaGF2ZSBjb21tZW50IGZvciBBY2NvdW50IFBlcm1pc3Npb24gY2VydCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuZ2V0Q2VydGlmaWNhdGlvblR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwUGVybWlzc2lvbnMpO1xuICAgICAgICAgICAgICAgIHRlc3REZXRhaWxzTWVudUl0ZW0oZmFsc2UsICdBY2NvdW50IERldGFpbHMnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZGlzYWJsZXMgYnV0dG9ucyBpZiBjZXJ0aWZpY2F0aW9uIGlzIG5vdCBlZGl0YWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGZpbmRUb3BCdXR0b25zKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBtZW51T3B0aW9ucyA9IGZpbmRNZW51SXRlbXMoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIGNlcnRFZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnaXNDZXJ0aWZpY2F0aW9uRWRpdGFibGUnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VydEVkaXRhYmxlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQodG9wQnV0dG9uc1swXSkuYXR0cignZGlzYWJsZWQnKSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgY2VydEVkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudCh0b3BCdXR0b25zWzBdKS5hdHRyKCdkaXNhYmxlZCcpKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobWVudU9wdGlvbnNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2V0cyBjbGFzcyBpZiBkZWNpc2lvbiBpcyBjdXJyZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGVsZW1lbnQuZmluZCgnLmNlcnQtYWN0aW9uLWNvbHVtbiA+IGJ1dHRvbjpub3QoLmRyb3Bkb3duLXRvZ2dsZSknKTtcblxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5hbmQucmV0dXJuVmFsdWUoY3JlYXRlQ2VydGlmaWNhdGlvbkRlY2lzaW9uKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCkpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHRvcEJ1dHRvbnNbMF0pLmhhc0NsYXNzKCdjZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3NldHMgY2xhc3MgaWYgZGVjaXNpb24gaXMgZWRpdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGVsZW1lbnQuZmluZCgnLmNlcnQtYWN0aW9uLWNvbHVtbiA+IGJ1dHRvbjpub3QoLmRyb3Bkb3duLXRvZ2dsZSknKSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdGVkRGVjaXNpb24gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uRGVjaXNpb24oQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQpO1xuXG4gICAgICAgICAgICAgICAgZWRpdGVkRGVjaXNpb24uZWRpdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbScpXG4gICAgICAgICAgICAgICAgICAgIC5hbmQucmV0dXJuVmFsdWUoZWRpdGVkRGVjaXNpb24pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHRvcEJ1dHRvbnNbMV0pLmhhc0NsYXNzKCdjZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3NldHMgZGVjaXNpb24gd2hlbiBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgdG9wQnV0dG9ucyA9IGVsZW1lbnQuZmluZCgnLmNlcnQtYWN0aW9uLWNvbHVtbiA+IGJ1dHRvbjpub3QoLmRyb3Bkb3duLXRvZ2dsZSknKTtcblxuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgYW4gZXhhY3QgbWF0Y2ggd2l0aCBtZXNzYWdlIGtleXMgdGhpcyBvbmNlLlxuICAgICAgICAgICAgICAgIGl0ZW0uZGVjaXNpb25TdGF0dXMuZGVjaXNpb25zWzBdLnByb21wdEtleSA9ICdjZXJ0X2FjdGlvbl9hcHByb3ZlJztcbiAgICAgICAgICAgICAgICBpdGVtLmRlY2lzaW9uU3RhdHVzLmRlY2lzaW9uc1swXS5tZXNzYWdlS2V5ID0gJ2NlcnRfYWN0aW9uX2FwcHJvdmUnO1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVjaXNpb25TdGF0dXMuZGVjaXNpb25zWzFdLnByb21wdEtleSA9ICdjZXJ0X2FjdGlvbl9yZW1lZGlhdGUnO1xuICAgICAgICAgICAgICAgIGl0ZW0uZGVjaXNpb25TdGF0dXMuZGVjaXNpb25zWzFdLm1lc3NhZ2VLZXkgPSAnY2VydF9hY3Rpb25fcmVtZWRpYXRlJztcblxuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgJ3NldERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgLy9DbGljayBhcHByb3ZlXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KHRvcEJ1dHRvbnNbMF0pLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uuc2V0RGVjaXNpb24pXG4gICAgICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLCBpdGVtLmRlY2lzaW9uU3RhdHVzLmRlY2lzaW9uc1swXSk7XG4gICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uLmNhbGxzLnJlc2V0KCk7XG5cbiAgICAgICAgICAgICAgICAvL0NsaWNrIHJlbWVkaWF0ZVxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCh0b3BCdXR0b25zWzFdKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLnNldERlY2lzaW9uKVxuICAgICAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSwgaXRlbS5kZWNpc2lvblN0YXR1cy5kZWNpc2lvbnNbMV0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdhZGRzIGNvbW1lbnQgd2hlbiBDb21tZW50IGJ1dHRvbiBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkXSksXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGl0ZW0pLFxuICAgICAgICAgICAgICAgICAgICBtZW51T3B0aW9ucyA9IGZpbmRNZW51SXRlbXMoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIGNvbW1lbnRUZXh0ID0gJ3NvbWUgZHVtYiBjb21tZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY2VydEVkaXRhYmxlID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2VydCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnc29tZWNlcnQnXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnaXNDZXJ0aWZpY2F0aW9uRWRpdGFibGUnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VydEVkaXRhYmxlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNweU9uKGNvbW1lbnRTZXJ2aWNlLCAnb3BlbkNvbW1lbnREaWFsb2cnKS5hbmRcbiAgICAgICAgICAgICAgICAgICAgLnJldHVyblZhbHVlKHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGNvbW1lbnRUZXh0KSk7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdwb3N0Q29tbWVudCcpO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoY2VydCk7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KG1lbnVPcHRpb25zWzBdKS5maW5kKCdhJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNvbW1lbnRTZXJ2aWNlLm9wZW5Db21tZW50RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5wb3N0Q29tbWVudCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgaXRlbS5pZCwgY29tbWVudFRleHQpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3dzIHRoZSBoaXN0b3J5IGRpYWxvZyB3aGVuIEhpc3RvcnkgYnV0dG9uIGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWRdKSxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoaXRlbSksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVPcHRpb25zID0gZmluZE1lbnVJdGVtcyhlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaXRsZTogKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQobWVudU9wdGlvbnNbMV0pLmZpbmQoJ2EnKS5jbGljaygpO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGxldCBzcE1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbEFyZ3MubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsQXJnc1swXS5yZXNvbHZlLmNoYWxsZW5nZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbEFyZ3NbMF0ucmVzb2x2ZS5jZXJ0SWQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxBcmdzWzBdLnJlc29sdmUuaXRlbUlkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsQXJnc1swXS5jb250cm9sbGVyKS50b0VxdWFsKCdJZGVudGl0eUhpc3RvcnlEaWFsb2dDdHJsJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlIHRvIHNob3cgZGV0YWlsIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdzaG93RGV0YWlsRGlhbG9nJyk7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnaGFzRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRlc3REZXRhaWxQb3B1cCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0RldGFpbERpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2NlcnRJZCcsIGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSB0byBzaG93IGFjY291bnQgZGV0YWlsIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdzaG93QWNjb3VudERldGFpbERpYWxvZycpO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSwgJ2hhc0FjY291bnREZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGVzdERldGFpbFBvcHVwKCdBY2NvdW50IERldGFpbHMnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dBY2NvdW50RGV0YWlsRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnY2VydElkJywgaXRlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2ZpbmRBY3Rpb25TdGF0dXMgc2hvdWxkIHJldHVybiBjb3JyZWN0IHN0YXR1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5Db21wbGV0ZSksXG4gICAgICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZmluZEFjdGlvblN0YXR1cyh7c3RhdHVzOiBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZH0pLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC50b0JlKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbmRBY3Rpb25TdGF0dXMoe3N0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkfSkubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLnRvQmUoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmZpbmRBY3Rpb25TdGF0dXMoe3N0YXR1czogQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWR9KS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAudG9CZShDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5maW5kQWN0aW9uU3RhdHVzKHtzdGF0dXM6ICdmb28nfSkpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2V0cyBjbGFzcyBpZiBkZXBlbmRlbnQgZGVjaXNpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0sXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLk9wZW4pLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgZGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXZva2VkUm9sZXM6IFsnUm9sZTEnLCAnUm9sZTInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRvcEJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoJy5jZXJ0LWFjdGlvbi1jb2x1bW4gPiBidXR0b246bm90KC5kcm9wZG93bi10b2dnbGUpJyk7XG5cbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0U291cmNlRGVjaXNpb25zJykuYW5kLnJldHVyblZhbHVlKFtkZWNpc2lvbl0pO1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHRvcEJ1dHRvbnNbMF0pLmhhc0NsYXNzKCdjZXJ0LWFjdGlvbi1jdXJyZW50LWRlY2lzaW9uJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3R5cGUgaXMgQWNjb3VudEdyb3VwUGVybWlzc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5zaG93RGV0YWlsRGlhbG9nIHdoZW4gbGluayBpcyBjbGlja2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJylcbiAgICAgICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuQWNjb3VudEdyb3VwUGVybWlzc2lvbnMpO1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSwgJ2hhc0RldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsICdzaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbERpYWxvZycpO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGVzdERldGFpbFBvcHVwKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLnNob3dNYW5hZ2VkQXR0cmlidXRlRGV0YWlsRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnY2VydElkJyxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbi5UeXBlLkFjY291bnRHcm91cFBlcm1pc3Npb25zLCBpdGVtLmVudGl0eUlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ2lzU291cmNlSXRlbVVuZG9uZSgpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSwgY3RybCwgc291cmNlRGVjaXNpb247XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWRdLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgICAgICBpdGVtLmRlY2lzaW9uU3RhdHVzLnNvdXJjZUl0ZW1JZCA9ICc1Njc4JztcbiAgICAgICAgICAgIGl0ZW0uZGVjaXNpb25TdGF0dXMuZGVwZW5kZW50RGVjaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2VEZWNpc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQuY2FsbEZha2UoKCkgPT4gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBhIGRlcGVuZGVudCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZGVjaXNpb25TdGF0dXMuZGVwZW5kZW50RGVjaXNpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU291cmNlSXRlbVVuZG9uZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gc291cmNlIGl0ZW0gaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgaXRlbS5kZWNpc2lvblN0YXR1cy5zb3VyY2VJdGVtSWQ7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NvdXJjZUl0ZW1VbmRvbmUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIGRlY2lzaW9uIGluIHRoZSBzdG9yZSBmb3Igc291cmNlIGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBzb3VyY2VEZWNpc2lvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU291cmNlSXRlbVVuZG9uZSgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBkZWNpc2lvbiBpbiB0aGUgc3RvcmUgd2l0aCBkaWZmZXJlbnQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgc291cmNlRGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnVW5kbydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1NvdXJjZUl0ZW1VbmRvbmUoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNJbmRpcmVjdEFjY291bnREZWNpc2lvblVuZG9uZScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0sIGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oWyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZXZva2VBY2NvdW50XSxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmV2b2tlQWNjb3VudCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuQ29tcGxldGUpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQuY2FsbEZha2UoKCkgPT4gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuXG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IHVuZG9pbmcgYW4gYWNjb3VudCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdpc0FjY291bnREZWNpc2lvblVuZG8nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJbmRpcmVjdEFjY291bnREZWNpc2lvblVuZG9uZSh7fSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpcyBhIGRpcmVjdCBkZWNpc2lvbiB0aGF0IHVuZG9lcyBhbiBhY2NvdW50IGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtLFxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHsgc3RhdHVzOiBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCB9KSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnaXNBY2NvdW50RGVjaXNpb25VbmRvJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldEVmZmVjdGl2ZURlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKGRlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSW5kaXJlY3RBY2NvdW50RGVjaXNpb25VbmRvbmUoZGVjaXNpb24pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBpcyBhbiBpbmRpcmVjdCB1bmRvIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uMSA9IGNyZWF0ZUNlcnRpZmljYXRpb25EZWNpc2lvbihDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQpLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uMiA9IGNyZWF0ZUNlcnRpZmljYXRpb25EZWNpc2lvbihDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQ2xlYXJlZCk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnaXNBY2NvdW50RGVjaXNpb25VbmRvJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgLy8gTWltaWMgYW4gaW5kaXJlY3QgZGVjaXNpb24gYnkgdXNpbmcgbm9uLW1hdGNoaW5nIGRlY2lzaW9ucy5cbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZShkZWNpc2lvbjEpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJbmRpcmVjdEFjY291bnREZWNpc2lvblVuZG9uZShkZWNpc2lvbjIpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRDdXJyZW50RGVjaXNpb24oKScsICgpID0+IHtcblxuICAgICAgICBsZXQgaXRlbSwgY3RybCwgdW5zYXZlZERlY2lzaW9uO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWRdKTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldEVmZmVjdGl2ZURlY2lzaW9uQnlJdGVtJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zYXZlZERlY2lzaW9uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5jYWxsRmFrZSgoKSA9PiBDZXJ0aWZpY2F0aW9uLlR5cGUuTWFuYWdlcik7XG5cbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYWN0aW9uIHN0YXR1cyBmb3IgY3VycmVudCBkZWNpc2lvbiBpZiB1bnNhdmVkIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgdW5zYXZlZERlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkpLnRvRXF1YWwoaXRlbS5kZWNpc2lvblN0YXR1cy5kZWNpc2lvbnNbMV0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBzYXZlZCBhY3Rpb24gc3RhdHVzIGlmIG5vIHVuc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtLmRlY2lzaW9uU3RhdHVzLmN1cnJlbnRTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQXBwcm92ZWQnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ0FwcHJvdmVkJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkpLnRvRXF1YWwoaXRlbS5kZWNpc2lvblN0YXR1cy5jdXJyZW50U3RhdGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBVbmRvIHN0YXR1cyBpZiBzb3VyY2UgaXRlbSBpcyB1bmRvbmUgYW5kIG5vIHVuc2F2ZWQgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNTb3VyY2VJdGVtVW5kb25lJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkuc3RhdHVzKS50b0VxdWFsKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYWN0aW9uIHN0YXR1cyBmb3IgY3VycmVudCBkZWNpc2lvbiBpZiB1bnNhdmVkIGRlY2lzaW9uIGlmIHNvdXJjZSBpdGVtIGlzIHVuZG9uZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc1NvdXJjZUl0ZW1VbmRvbmUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICB1bnNhdmVkRGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnQXBwcm92ZWQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q3VycmVudERlY2lzaW9uKCkpLnRvRXF1YWwoaXRlbS5kZWNpc2lvblN0YXR1cy5kZWNpc2lvbnNbMF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRvIHN0YXR1cyBpZiBpbmRpcmVjdCBhY2NvdW50IGRlY2lzaW9uIHVuZG8nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnaXNJbmRpcmVjdEFjY291bnREZWNpc2lvblVuZG9uZScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50RGVjaXNpb24oKS5zdGF0dXMpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkNsZWFyZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBkZWNpc2lvbiBzdGF0dXMgaWYgZGlyZWN0IGFjY291bnQgZGVjaXNpb24gdW5kbycsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0luZGlyZWN0QWNjb3VudERlY2lzaW9uVW5kb25lJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDdXJyZW50RGVjaXNpb24oKS5zdGF0dXMpLnRvRXF1YWwoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNDdXJyZW50RGVjaXNpb24oKScsICgpID0+IHtcblxuICAgICAgICBsZXQgaXRlbSwgY3RybCwgdW5zYXZlZERlY2lzaW9uLCB1bnNhdmVkU291cmNlRGVjaXNpb247XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bnNhdmVkRGVjaXNpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRTb3VyY2VEZWNpc2lvbnMnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbdW5zYXZlZFNvdXJjZURlY2lzaW9uXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdW5zYXZlZERlY2lzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdW5zYXZlZFNvdXJjZURlY2lzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQuY2FsbEZha2UoKCkgPT4gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGRlY2lzaW9uIGlzIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ3VycmVudERlY2lzaW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBEZWxlZ2F0aW9uIFJldmlldyBzb3VyY2UgaXRlbSBpcyB1bmRvbmUgYW5kIGRlY2lzaW9uIGlzIG5vdCBDbGVhcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzRGVsZWdhdGVkSXRlbScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc1NvdXJjZUl0ZW1VbmRvbmUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0N1cnJlbnREZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICB9KSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgRGVsZWdhdGlvbiBSZXZpZXcgc291cmNlIGl0ZW0gaXMgdW5kb25lIGFuZCBkZWNpc2lvbiBpcyBDbGVhcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oY3RybCwgJ2lzRGVsZWdhdGVkSXRlbScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc1NvdXJjZUl0ZW1VbmRvbmUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0N1cnJlbnREZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0NsZWFyZWQnXG4gICAgICAgICAgICB9KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhbiB1bnNhdmVkIGRlY2lzaW9uIGZvciB0aGUgaXRlbSBhbmQgaXQgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdSZW1lZGlhdGVkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ3VycmVudERlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBhbiB1bnNhdmVkIGRlY2lzaW9uIGZvciB0aGUgaXRlbSBhbmQgaXQgZG9lcyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB1bnNhdmVkRGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0N1cnJlbnREZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0FwcHJvdmVkJ1xuICAgICAgICAgICAgfSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGFuIHVuc2F2ZWQgZGVjaXNpb24gZm9yIHRoZSBzb3VyY2UgaXRlbSBhbmQgaXQgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgICAgICAgIHVuc2F2ZWRTb3VyY2VEZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdSZW1lZGlhdGVkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ3VycmVudERlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUmVtZWRpYXRlZCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBhbiB1bnNhdmVkIGRlY2lzaW9uIGZvciB0aGUgc291cmNlIGl0ZW0gYW5kIGl0IGRvZXMgbm90IG1hdGNoJywgKCkgPT4ge1xuICAgICAgICAgICAgdW5zYXZlZFNvdXJjZURlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDdXJyZW50RGVjaXNpb24oe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdBcHByb3ZlZCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzdGF0dXMgbWF0Y2hlcyBhbmQgZGVsZWdhdGlvblJldmlld0FjdGlvbiBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgdW5zYXZlZERlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRpb25SZXZpZXdBY3Rpb246ICdBY2NlcHQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNDdXJyZW50RGVjaXNpb24oe1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRpb25SZXZpZXdBY3Rpb246ICdBY2NlcHQnXG4gICAgICAgICAgICB9KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgc3RhdHVzIG1hdGNoZXMgYW5kIGRlbGVnYXRpb25SZXZpZXdBY3Rpb24gZG9lcyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICB1bnNhdmVkRGVjaXNpb24gPSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvblJldmlld0FjdGlvbjogJ0FjY2VwdCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0N1cnJlbnREZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnUmVtZWRpYXRlZCcsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGlvblJldmlld0FjdGlvbjogJ1JlamVjdCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzdGF0dXMgaXMgQ2xlYXJlZCBhbmQgd2UgaGF2ZSBhbiB1bnNhdmVkIGluZGlyZWN0IGFjY291bnQgdW5kbyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdpc0luZGlyZWN0QWNjb3VudERlY2lzaW9uVW5kb25lJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgdW5zYXZlZERlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ0FwcHJvdmVkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzQ3VycmVudERlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnQ2xlYXJlZCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0VkaXRlZCgpJywgKCkgPT4ge1xuXG4gICAgICAgIGxldCBpdGVtLCBjdHJsLCB1bnNhdmVkRGVjaXNpb247XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZF0pO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bnNhdmVkRGVjaXNpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBkZWNpc2lvbiBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0VkaXRlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZGVjaXNpb24gaXMgbm90IGVkaXRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHVuc2F2ZWREZWNpc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBlZGl0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNFZGl0ZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZGVjaXNpb24gaXMgZWRpdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdW5zYXZlZERlY2lzaW9uID0ge1xuICAgICAgICAgICAgICAgIGVkaXRlZDogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRWRpdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnZ2V0QnV0dG9uRGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSwgY3RybDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyV2l0aFN0YXR1cyhzdGF0dXMsIHBvbGljeVR5cGUsIG5vUmVtZWRpYXRlKSB7XG4gICAgICAgICAgICBsZXQgc3RhdHVzZXMgPSBbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5NaXRpZ2F0ZWRdO1xuICAgICAgICAgICAgaWYgKG5vUmVtZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzZXMucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oc3RhdHVzZXMsIHN0YXR1cywgQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLldhaXRpbmdSZXZpZXcsIHBvbGljeVR5cGUpO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNQb2xpY3lWaW9sYXRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNjcmliZSgnbm9uIHBvbGljeSB2aW9sYXRpb24gZGVsZWdhdGVkIGl0ZW1zLicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdSb2xlIHNob3VsZCByZXR1cm4gUmVtZWRpYXRlZCBmb3IgQXBwcm92ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcldpdGhTdGF0dXMoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRCdXR0b25EZWNpc2lvbnMoKVsxXS5uYW1lKS50b0JlKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnUm9sZSBzaG91bGQgcmV0dXJuIEFwcHJvdmVkIGZvciBSZW1lZGlhdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXJXaXRoU3RhdHVzKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5nZXRCdXR0b25EZWNpc2lvbnMoKVsxXS5uYW1lKS50b0JlKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ1JvbGUgc2hvdWxkIHJldHVybiBSZW1lZGlhdGVkIGZvciBNaXRpZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcldpdGhTdGF0dXMoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0QnV0dG9uRGVjaXNpb25zKClbMV0ubmFtZSkudG9CZShDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0TWVudURlY2lzaW9ucygpJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbSwgY3RybDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKHN0YXR1cykge1xuICAgICAgICAgICAgbGV0IGxvY2FsSXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKFtDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQXBwcm92ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BY2tub3dsZWRnZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5SZW1lZGlhdGVkXSxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICBzdGF0dXMpO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsSXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHJldHVybiBEZWxlZ2F0ZWQgaWYgc3VtbWFyeVN0YXR1cyBpcyBDaGFsbGVuZ2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUl0ZW0oQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWQpO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBsZXQgbWVudSA9IGN0cmwuZ2V0TWVudURlY2lzaW9ucygpO1xuICAgICAgICAgICAgZXhwZWN0KG1lbnUubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KG1lbnVbMF0ubmFtZSkudG9CZShDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuQWNrbm93bGVkZ2VkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gRGVsZWdhdGVkIGlmIHN1bW1hcnlTdGF0dXMgaXMgbm90IENoYWxsZW5nZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlSXRlbSgpO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBsZXQgbWVudSA9IGN0cmwuZ2V0TWVudURlY2lzaW9ucygpO1xuICAgICAgICAgICAgZXhwZWN0KG1lbnUubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KG1lbnVbMF0ubmFtZSkudG9CZShDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuRGVsZWdhdGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChtZW51WzFdLm5hbWUpLnRvQmUoQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFja25vd2xlZGdlZCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc01lbnVBY3Rpb24oKScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0sIGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oW0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5EZWxlZ2F0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFja25vd2xlZGdlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLlJlbWVkaWF0ZWQsXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5NaXRpZ2F0ZWRdLFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuT3Blbik7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjdXJyZW50IGRlY2lzaW9uIGlzIG51bGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQucmV0dXJuVmFsdWUobnVsbCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc01lbnVBY3Rpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGN1cnJlbnQgZGVjaXNpb24gaXMgYSBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2VydGlmaWNhdGlvbkRlY2lzaW9uKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc01lbnVBY3Rpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGN1cnJlbnQgZGVjaXNpb24gZG9lcyBub3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2VydGlmaWNhdGlvbkRlY2lzaW9uKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5DbGVhcmVkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzTWVudUFjdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBjdXJyZW50IGRlY2lzaW9uIGlzIGEgbWVudSBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2VydGlmaWNhdGlvbkRlY2lzaW9uKENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5NaXRpZ2F0ZWQpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNNZW51QWN0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbWFrZURlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBjdHJsLCBpdGVtO1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbShbQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkRlbGVnYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLkFwcHJvdmVkLFxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLk5hbWUuUmVtZWRpYXRlZCxcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cy5OYW1lLk1pdGlnYXRlZF0sXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5PcGVuKTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnc2V0RGVjaXNpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4gJHEud2hlbigpKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uQWN0aW9ucycpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQuY2FsbEZha2UoKCkgPT4gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBpbml0aWFsaXplQWN0aW9ucyBhZnRlciBzZXREZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGN0cmwubWFrZURlY2lzaW9uKG5ldyBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzKHtzdGF0dXM6IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMuTmFtZS5BcHByb3ZlZH0pKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uQWN0aW9uc0ZhY3RvcnlTZXJ2aWNlLmdldENlcnRpZmljYXRpb25BY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZpZXcvZWRpdCBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjdHJsLCBpdGVtO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKCk7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2FuVmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybiBjYWxscyBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuY2FuVmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSAnYWJjZCc7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnY2FuVmlld0RlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbCA9IGN0cmwuY2FuVmlld0RlY2lzaW9uKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5jYW5WaWV3RGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXR1cm5WYWwpLnRvRXF1YWwodmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnY2FuRWRpdERlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybiBjYWxscyBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2UuY2FuRWRpdERlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSAnYWJjZCc7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnY2FuRWRpdERlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbCA9IGN0cmwuY2FuRWRpdERlY2lzaW9uKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5jYW5FZGl0RGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXR1cm5WYWwpLnRvRXF1YWwodmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnZWRpdERlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ2NhbGxzIGNlcnRpZmljYXRpb25JdGVtU2VydmljZS5lZGl0RGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLCAnZWRpdERlY2lzaW9uJyk7XG4gICAgICAgICAgICAgICAgY3RybC5lZGl0RGVjaXNpb24oKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TZXJ2aWNlLmVkaXREZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZFdpdGgoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3ZpZXdEZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdjYWxscyBjZXJ0aWZpY2F0aW9uSXRlbVNlcnZpY2Uudmlld0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtU2VydmljZSwgJ3ZpZXdEZWNpc2lvbicpO1xuICAgICAgICAgICAgICAgIGN0cmwudmlld0RlY2lzaW9uKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtU2VydmljZS52aWV3RGVjaXNpb24pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
