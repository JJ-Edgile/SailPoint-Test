System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('CertificationItemCardDirective', function () {

                var $compile = undefined,
                    CertificationItem = undefined,
                    ColumnConfig = undefined,
                    spTranslateFilter = undefined,
                    $scope = undefined,
                    element = undefined,
                    item = undefined,
                    colKey = undefined,
                    actionData = undefined,
                    certificationItemDetailService = undefined,
                    hasDetails = undefined,
                    certId = undefined,
                    certType = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams:12 */
                beforeEach(inject(function (_$compile_, $rootScope, _CertificationItem_, configService, _ColumnConfig_, _spTranslateFilter_, $q, certificationActionsFactoryService, CertificationActionStatus, CertificationActions, _certificationItemDetailService_, certificationDataService) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    CertificationItem = _CertificationItem_;
                    ColumnConfig = _ColumnConfig_;
                    spTranslateFilter = _spTranslateFilter_;
                    certificationItemDetailService = _certificationItemDetailService_;

                    // Mock up the column configs.
                    colKey = 'someKey';
                    var colCfgs = [createColumnConfig('Identity-firstname'), createColumnConfig('Identity-lastname'), createColumnConfig('typeMessageKey'), createColumnConfig('summaryStatus'), createColumnConfig('decisions'), createColumnConfig('policyViolation.policy.name'), createColumnConfig('policyViolation.owner.displayName'), createColumnConfig('application'), createColumnConfig('instance'), createColumnConfig('accountName'), createColumnConfig('comments')];
                    var data = {};
                    data[colKey] = colCfgs;
                    spyOn(configService, 'getColumnConfigEntries').and.returnValue($q.when({ data: data }));

                    // Mock the CertificationActionsFactoryService to return actions to make buttons.
                    actionData = {
                        status: 'foo',
                        promptKey: 'bar'
                    };
                    var actions = new CertificationActions([new CertificationActionStatus(actionData)], []);
                    spyOn(certificationActionsFactoryService, 'getCertificationActions').and.returnValue(actions);

                    hasDetails = true;
                    spyOn(certificationItemDetailService, 'hasDetails').and.callFake(function () {
                        return hasDetails;
                    });
                    certId = 'cert1';
                    certType = 'Manager';
                    spyOn(certificationDataService, 'getCertification').and.returnValue({
                        id: certId
                    });
                    spyOn(certificationDataService, 'getCertificationType').and.returnValue(certType);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function createColumnConfig(colKey) {
                    var msg = colKey + '_msg';
                    spTranslateFilter.addMessage(colKey, msg);

                    return new ColumnConfig({
                        dataIndex: colKey,
                        headerKey: colKey
                    });
                }

                function createPolicyViolation() {
                    return new CertificationItem({
                        id: '872347',
                        type: CertificationItem.Type.PolicyViolation,
                        typeMessageKey: 'pv',
                        description: 'I am a policy violation',
                        policyViolationDTO: {
                            policy: {
                                id: 'policyId',
                                name: 'no scrubs',
                                description: 'policy description',
                                type: 'Advanced',
                                ruleDescription: ''
                            },
                            rule: 'phil miller',
                            owner: {
                                attributes: null,
                                id: '1231231212asdfad',
                                firstName: 'tandy',
                                name: '',
                                displayName: 'randy tandy',
                                locked: false,
                                workgroup: false
                            },
                            status: 'policy_violation_open',
                            statusDisplayValue: 'some calculated display value',
                            summary: 'policy violation summary'
                        },
                        decisionStatus: {
                            decisions: [actionData]
                        }
                    });
                }

                function createRole() {
                    return new CertificationItem({
                        id: '9873478234',
                        type: CertificationItem.Type.Bundle,
                        typeMessageKey: 'rollin',
                        displayName: 'They see me rollin ... with my homies',
                        decisionStatus: {
                            decisions: [actionData]
                        }
                    });
                }

                function createEntitlement() {
                    return new CertificationItem({
                        id: '187388487363',
                        type: CertificationItem.Type.Exception,
                        typeMessageKey: 'exceptional',
                        displayName: 'Value entitlemented on fluffy bunnies',
                        application: 'entitled app',
                        accountName: 'entitleboy',
                        decisionStatus: {
                            decisions: [actionData]
                        }
                    });
                }

                function createDataOwner() {
                    return new CertificationItem({
                        id: '187388487363',
                        type: CertificationItem.Type.DataOwner,
                        typeMessageKey: 'entitlementOwner',
                        displayName: 'Value entitlement owner turtle turtle in your t shirt',
                        application: 'entitled app',
                        accountName: 'entitleboy',
                        decisionStatus: {
                            decisions: [actionData]
                        }
                    });
                }

                function createAccount() {
                    return new CertificationItem({
                        id: '874378372884',
                        type: CertificationItem.Type.Account,
                        typeMessageKey: 'accounting',
                        application: 'accounting app',
                        accountName: 'accounter',
                        decisionStatus: {
                            decisions: [actionData]
                        }
                    });
                }

                function compile() {
                    var eltDef = '<sp-certification-item-card sp-item="item" sp-column-config-key="colKey" />';
                    element = angular.element(eltDef);

                    $scope.item = item;
                    $scope.colKey = colKey;

                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                function checkTitle(expected) {
                    var title = element.find('.panel-title');
                    expect(title.length).toEqual(1);
                    var value = title.text().trim();
                    expect(value).toEqual(expected);
                }

                function getDetails(expectedNum) {
                    var deets = element.find('.list-group-item');
                    expect(deets.length).toEqual(expectedNum);
                    return deets;
                }

                function getDetailLabel(detail) {
                    var label = detail.find('.cert-item-card-label');
                    expect(label.length).toEqual(1);
                    return label.text().trim();
                }

                function getDetailValue(detail) {
                    var value = detail.find('.cert-item-card-value');
                    expect(value.length).toEqual(1);
                    return value.text().trim();
                }

                function checkDetailLabel(detail, expectedLabel) {
                    var label = getDetailLabel(detail);
                    expect(label).toEqual(expectedLabel);
                }

                function checkDetailValue(detail, expectedValue) {
                    var value = getDetailValue(detail);
                    expect(value).toEqual(expectedValue);
                }

                function checkDetail(details, idx, col) {
                    expect(idx < details.length).toBeTruthy();
                    var detail = angular.element(details[idx]);

                    // Check the label.
                    checkDetailLabel(detail, col + '_msg:');

                    // Check the value. Do 'dot property get' by recursing into the object.
                    // Split the property key by the dot and then apply reduce function to each property.
                    var expected = col.split('.').reduce(function (item, i) {
                        return item[i];
                    }, item);
                    checkDetailValue(detail, expected);
                }

                it('gets eviscerated when no item is given', function () {
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                it('longs for better days when no column config key is given', function () {
                    item = {};
                    colKey = null;
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                describe('warnings', function () {
                    function hasWarnings() {
                        var warnings = element.find('.panel-title .cert-item-warnings .text-danger');
                        return warnings.length > 0;
                    }

                    it('are displayed in title when available', function () {
                        item = createPolicyViolation();
                        item.unremovedRemediation = true;
                        compile();
                        expect(hasWarnings()).toEqual(true);
                    });

                    it('are not displayed in title when not available', function () {
                        item = createPolicyViolation();
                        compile();
                        expect(hasWarnings()).toEqual(false);
                    });
                });

                describe('description', function () {
                    function checkDescription(description) {
                        var body = element.find('.panel-body');
                        if (description) {
                            expect(body.length).toEqual(1);
                            expect(body.text().trim()).toEqual(item.description);
                        } else {
                            expect(body.length).toEqual(0);
                        }
                    }

                    it('is shown if available', function () {
                        item = createPolicyViolation();
                        compile();
                        checkDescription(item.description);
                    });

                    it('is not shown if unavailable', function () {
                        item = createPolicyViolation();
                        item.description = null;
                        compile();
                        checkDescription(null);
                    });
                });

                describe('policy violation', function () {
                    beforeEach(function () {
                        item = createPolicyViolation();
                    });

                    it('shows policy rule in title', function () {
                        compile();
                        checkTitle(item.policyViolation.rule);
                    });

                    it('shows the type, policy name, and violation owner', function () {
                        compile();
                        var deets = getDetails(3);
                        checkDetail(deets, 0, 'typeMessageKey');
                        checkDetail(deets, 1, 'policyViolation.policy.name');
                        checkDetail(deets, 2, 'policyViolation.owner.displayName');
                    });
                });

                describe('role', function () {
                    beforeEach(function () {
                        item = createRole();
                    });

                    it('shows role name in title', function () {
                        compile();
                        checkTitle(item.displayName);
                    });

                    it('shows the type', function () {
                        compile();
                        var deets = getDetails(1);
                        checkDetail(deets, 0, 'typeMessageKey');
                    });
                });

                describe('entitlement', function () {
                    beforeEach(function () {
                        item = createEntitlement();
                    });

                    it('shows the display name in the title', function () {
                        compile();
                        checkTitle(item.displayName);
                    });

                    it('shows the type, application, and account name', function () {
                        compile();
                        var deets = getDetails(3);
                        checkDetail(deets, 0, 'typeMessageKey');
                        checkDetail(deets, 1, 'application');
                        checkDetail(deets, 2, 'accountName');
                    });

                    it('shows the instance if available', function () {
                        item.instance = 'instance1';
                        compile();
                        var deets = getDetails(4);
                        checkDetail(deets, 2, 'instance');
                    });
                });

                describe('entitlement owner', function () {
                    beforeEach(function () {
                        certType = 'DataOwner';
                        item = createDataOwner();
                    });

                    it('shows the display name in the title', function () {
                        compile();
                        checkTitle(item.displayName);
                    });

                    it('shows the type, application, and account name', function () {
                        compile();
                        var deets = getDetails(3);
                        checkDetail(deets, 0, 'typeMessageKey');
                        checkDetail(deets, 1, 'application');
                        checkDetail(deets, 2, 'accountName');
                    });

                    it('shows the instance if available', function () {
                        item.instance = 'instance1';
                        compile();
                        var deets = getDetails(4);
                        checkDetail(deets, 2, 'instance');
                    });
                });

                describe('account', function () {
                    beforeEach(function () {
                        item = createAccount();
                    });

                    it('shows the account name in the title', function () {
                        compile();
                        checkTitle(item.accountName);
                    });

                    it('shows the type and application', function () {
                        compile();
                        var deets = getDetails(2);
                        checkDetail(deets, 0, 'typeMessageKey');
                        checkDetail(deets, 1, 'application');
                    });

                    it('shows the instance if available', function () {
                        item.instance = 'instance1';
                        compile();
                        var deets = getDetails(3);
                        checkDetail(deets, 2, 'instance');
                    });
                });

                describe('returned items', function () {
                    beforeEach(function () {
                        item = createRole();
                        item.decisions = 'do it!';
                    });

                    function testReturnedItem(status) {
                        item.summaryStatus = status;
                        compile();
                        var deets = getDetails(4);
                        checkDetail(deets, 1, 'summaryStatus');
                        checkDetail(deets, 3, 'decisions');
                    }

                    it('that are challenged show the summary status and decision', function () {
                        testReturnedItem(CertificationItem.Status.Challenged);
                    });

                    it('that are waiting review show the summary status and decision', function () {
                        testReturnedItem(CertificationItem.Status.WaitingReview);
                    });

                    it('that are returned show the summary status and decision', function () {
                        testReturnedItem(CertificationItem.Status.Returned);
                    });

                    describe('comments', function () {
                        beforeEach(function () {
                            spTranslateFilter.addMessage('cert_item_tbl_header_comment_from_user', 'Comments from {0}');
                            spTranslateFilter.addMessage('cert_item_tbl_header_comment', 'Comments');
                        });

                        function setComment(comment, isDelegation) {
                            item.attributes = {
                                comments: {}
                            };

                            var propName = isDelegation ? 'delegationComments' : 'challengeCompletionComments';
                            item.attributes.comments[propName] = comment;
                        }

                        function testComments(isDelegation, label) {
                            var status = isDelegation ? CertificationItem.Status.WaitingReview : CertificationItem.Status.Challenged;
                            var comment = 'yo adrian!';

                            item.summaryStatus = status;
                            setComment(comment, isDelegation);

                            compile();
                            var deets = getDetails(4);
                            var commentDetail = angular.element(deets[2]);
                            checkDetailLabel(commentDetail, label);
                            checkDetailValue(commentDetail, comment);
                        }

                        it('are displayed for delegations with the delegates name if available', function () {
                            var user = 'rocky balboa';
                            item.delegation.completionUser = user;
                            testComments(true, 'Comments from ' + user + ':');
                        });

                        it('are displayed for challenges with the challengers name if available', function () {
                            var user = 'rocky balboa';
                            item.challengeHistory.owner = 'rocky balboa';
                            testComments(false, 'Comments from ' + user + ':');
                        });

                        it('are displayed for delegations with generic message if no delegate name is available', function () {
                            testComments(true, 'Comments:');
                        });

                        it('are displayed for challenges with generic message if no challenger name is available', function () {
                            testComments(false, 'Comments:');
                        });
                    });
                });

                describe('decision', function () {
                    it('button and menu are displayed', function () {
                        var buttonsSelector = '.cert-action-column button';
                        var buttons = element.find(buttonsSelector);
                        expect(buttons.length).toEqual(2);

                        var actionButton = element.find(buttonsSelector + '.cert-action-' + actionData.status);
                        expect(actionButton.length).toEqual(1);

                        var menuButton = element.find(buttonsSelector + '.dropdown-toggle');
                        expect(menuButton.length).toEqual(1);
                    });
                });

                describe('details button', function () {
                    var DETAILS_BUTTON_SELECTOR = '.panel-heading button';
                    it('is is shown if there are details', function () {
                        compile();
                        var detailsButton = element.find(DETAILS_BUTTON_SELECTOR);
                        expect(detailsButton.length).toEqual(1);
                    });

                    it('is not shown if there are no details', function () {
                        hasDetails = false;
                        compile();
                        var detailsButton = element.find(DETAILS_BUTTON_SELECTOR);
                        expect(detailsButton.length).toEqual(0);
                    });

                    it('launches detail dialog when clicked', function () {
                        spyOn(certificationItemDetailService, 'showDetailDialog');
                        compile();
                        var detailsButton = element.find(DETAILS_BUTTON_SELECTOR);
                        angular.element(detailsButton).click();
                        $scope.$apply();
                        expect(certificationItemDetailService.showDetailDialog).toHaveBeenCalledWith(certId, item);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1DYXJkRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0Q0FBNEMsVUFBVSxTQUFTO0lBQzVJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsa0NBQWtDLFlBQU07O2dCQUU3QyxJQUFJLFdBQVE7b0JBQUUsb0JBQWlCO29CQUFFLGVBQVk7b0JBQUUsb0JBQWlCO29CQUFFLFNBQU07b0JBQUUsVUFBTztvQkFBRSxPQUFJO29CQUFFLFNBQU07b0JBQUUsYUFBVTtvQkFDdkcsaUNBQThCO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxXQUFROztnQkFFaEUsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSxxQkFBcUIsZUFBZSxnQkFDNUQscUJBQXFCLElBQUksb0NBQW9DLDJCQUM3RCxzQkFBc0Isa0NBQWtDLDBCQUE2QjtvQkFDcEcsV0FBVztvQkFDWCxTQUFTLFdBQVc7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLGlDQUFpQzs7O29CQUdqQyxTQUFTO29CQUNULElBQUksVUFBVSxDQUNWLG1CQUFtQix1QkFDbkIsbUJBQW1CLHNCQUNuQixtQkFBbUIsbUJBQ25CLG1CQUFtQixrQkFDbkIsbUJBQW1CLGNBQ25CLG1CQUFtQixnQ0FDbkIsbUJBQW1CLHNDQUNuQixtQkFBbUIsZ0JBQ25CLG1CQUFtQixhQUNuQixtQkFBbUIsZ0JBQ25CLG1CQUFtQjtvQkFFdkIsSUFBSSxPQUFPO29CQUNYLEtBQUssVUFBVTtvQkFDZixNQUFNLGVBQWUsMEJBQTBCLElBQUks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QUFtQixPQUFJOzs7d0JBRzdDLEdBQUcsdUZBQXVGLFlBQU07NEJBQzVGLGFBQWEsTUFBTTs7O3dCQUd2QixHQUFHLHdGQUF3RixZQUFNOzRCQUM3RixhQUFhLE9BQU87Ozs7O2dCQUtoQyxTQUFTLFlBQVksWUFBTTtvQkFDdkIsR0FBRyxpQ0FBaUMsWUFBTTt3QkFDdEMsSUFBTSxrQkFBa0I7d0JBQ3hCLElBQUksVUFBVSxRQUFRLEtBQUs7d0JBQzNCLE9BQU8sUUFBUSxRQUFRLFFBQVE7O3dCQUUvQixJQUFJLGVBQWUsUUFBUSxLQUFRLGtCQUFlLGtCQUFnQixXQUFXO3dCQUM3RSxPQUFPLGFBQWEsUUFBUSxRQUFROzt3QkFFcEMsSUFBSSxhQUFhLFFBQVEsS0FBUSxrQkFBZTt3QkFDaEQsT0FBTyxXQUFXLFFBQVEsUUFBUTs7OztnQkFJMUMsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsSUFBTSwwQkFBMEI7b0JBQ2hDLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDO3dCQUNBLElBQUksZ0JBQWdCLFFBQVEsS0FBSzt3QkFDakMsT0FBTyxjQUFjLFFBQVEsUUFBUTs7O29CQUd6QyxHQUFHLHdDQUF3QyxZQUFNO3dCQUM3QyxhQUFhO3dCQUNiO3dCQUNBLElBQUksZ0JBQWdCLFFBQVEsS0FBSzt3QkFDakMsT0FBTyxjQUFjLFFBQVEsUUFBUTs7O29CQUd6QyxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxNQUFNLGdDQUFnQzt3QkFDdEM7d0JBQ0EsSUFBSSxnQkFBZ0IsUUFBUSxLQUFLO3dCQUNqQyxRQUFRLFFBQVEsZUFBZTt3QkFDL0IsT0FBTzt3QkFDUCxPQUFPLCtCQUErQixrQkFBa0IscUJBQXFCLFFBQVE7Ozs7OztHQWM5RiIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25JdGVtQ2FyZERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uSXRlbUNhcmREaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0ICRjb21waWxlLCBDZXJ0aWZpY2F0aW9uSXRlbSwgQ29sdW1uQ29uZmlnLCBzcFRyYW5zbGF0ZUZpbHRlciwgJHNjb3BlLCBlbGVtZW50LCBpdGVtLCBjb2xLZXksIGFjdGlvbkRhdGEsXHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCBoYXNEZXRhaWxzLCBjZXJ0SWQsIGNlcnRUeXBlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjEyICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSwgX0NlcnRpZmljYXRpb25JdGVtXywgY29uZmlnU2VydmljZSwgX0NvbHVtbkNvbmZpZ18sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX3NwVHJhbnNsYXRlRmlsdGVyXywgJHEsIGNlcnRpZmljYXRpb25BY3Rpb25zRmFjdG9yeVNlcnZpY2UsIENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkFjdGlvbnMsIF9jZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2VfLCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xyXG4gICAgICAgIENvbHVtbkNvbmZpZyA9IF9Db2x1bW5Db25maWdfO1xyXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyID0gX3NwVHJhbnNsYXRlRmlsdGVyXztcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gTW9jayB1cCB0aGUgY29sdW1uIGNvbmZpZ3MuXHJcbiAgICAgICAgY29sS2V5ID0gJ3NvbWVLZXknO1xyXG4gICAgICAgIGxldCBjb2xDZmdzID0gW1xyXG4gICAgICAgICAgICBjcmVhdGVDb2x1bW5Db25maWcoJ0lkZW50aXR5LWZpcnN0bmFtZScpLFxyXG4gICAgICAgICAgICBjcmVhdGVDb2x1bW5Db25maWcoJ0lkZW50aXR5LWxhc3RuYW1lJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygndHlwZU1lc3NhZ2VLZXknKSxcclxuICAgICAgICAgICAgY3JlYXRlQ29sdW1uQ29uZmlnKCdzdW1tYXJ5U3RhdHVzJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygnZGVjaXNpb25zJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygncG9saWN5VmlvbGF0aW9uLnBvbGljeS5uYW1lJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygncG9saWN5VmlvbGF0aW9uLm93bmVyLmRpc3BsYXlOYW1lJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygnYXBwbGljYXRpb24nKSxcclxuICAgICAgICAgICAgY3JlYXRlQ29sdW1uQ29uZmlnKCdpbnN0YW5jZScpLFxyXG4gICAgICAgICAgICBjcmVhdGVDb2x1bW5Db25maWcoJ2FjY291bnROYW1lJyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUNvbHVtbkNvbmZpZygnY29tbWVudHMnKVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBkYXRhW2NvbEtleV0gPSBjb2xDZmdzO1xyXG4gICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb2x1bW5Db25maWdFbnRyaWVzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oeyBkYXRhOiBkYXRhIH0pKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayB0aGUgQ2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZSB0byByZXR1cm4gYWN0aW9ucyB0byBtYWtlIGJ1dHRvbnMuXHJcbiAgICAgICAgYWN0aW9uRGF0YSA9IHtcclxuICAgICAgICAgICAgc3RhdHVzOiAnZm9vJyxcclxuICAgICAgICAgICAgcHJvbXB0S2V5OiAnYmFyJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvbnMoWyBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyhhY3Rpb25EYXRhKSBdLCBbXSk7XHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkFjdGlvbnNGYWN0b3J5U2VydmljZSwgJ2dldENlcnRpZmljYXRpb25BY3Rpb25zJykuYW5kLnJldHVyblZhbHVlKGFjdGlvbnMpO1xyXG5cclxuICAgICAgICBoYXNEZXRhaWxzID0gdHJ1ZTtcclxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdoYXNEZXRhaWxzJykuYW5kLmNhbGxGYWtlKCgpID0+IGhhc0RldGFpbHMpO1xyXG4gICAgICAgIGNlcnRJZCA9ICdjZXJ0MSc7XHJcbiAgICAgICAgY2VydFR5cGUgPSAnTWFuYWdlcic7XHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgIGlkOiBjZXJ0SWRcclxuICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5yZXR1cm5WYWx1ZShjZXJ0VHlwZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbHVtbkNvbmZpZyhjb2xLZXkpIHtcclxuICAgICAgICBsZXQgbXNnID0gYCR7Y29sS2V5fV9tc2dgO1xyXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmFkZE1lc3NhZ2UoY29sS2V5LCBtc2cpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IENvbHVtbkNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRhdGFJbmRleDogY29sS2V5LFxyXG4gICAgICAgICAgICBoZWFkZXJLZXk6IGNvbEtleVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBvbGljeVZpb2xhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgaWQ6ICc4NzIzNDcnLFxyXG4gICAgICAgICAgICB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLlBvbGljeVZpb2xhdGlvbixcclxuICAgICAgICAgICAgdHlwZU1lc3NhZ2VLZXk6ICdwdicsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSSBhbSBhIHBvbGljeSB2aW9sYXRpb24nLFxyXG4gICAgICAgICAgICBwb2xpY3lWaW9sYXRpb25EVE86IHtcclxuICAgICAgICAgICAgICAgIHBvbGljeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAncG9saWN5SWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdubyBzY3J1YnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAncG9saWN5IGRlc2NyaXB0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQWR2YW5jZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVEZXNjcmlwdGlvbjogJydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBydWxlOiAncGhpbCBtaWxsZXInLFxyXG4gICAgICAgICAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzMTIzMTIxMmFzZGZhZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lOiAndGFuZHknLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAncmFuZHkgdGFuZHknLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3BvbGljeV92aW9sYXRpb25fb3BlbicsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNEaXNwbGF5VmFsdWU6ICdzb21lIGNhbGN1bGF0ZWQgZGlzcGxheSB2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiAncG9saWN5IHZpb2xhdGlvbiBzdW1tYXJ5J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbIGFjdGlvbkRhdGEgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlUm9sZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgaWQ6ICc5ODczNDc4MjM0JyxcclxuICAgICAgICAgICAgdHlwZTogQ2VydGlmaWNhdGlvbkl0ZW0uVHlwZS5CdW5kbGUsXHJcbiAgICAgICAgICAgIHR5cGVNZXNzYWdlS2V5OiAncm9sbGluJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUaGV5IHNlZSBtZSByb2xsaW4gLi4uIHdpdGggbXkgaG9taWVzJyxcclxuICAgICAgICAgICAgZGVjaXNpb25TdGF0dXM6IHtcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uczogWyBhY3Rpb25EYXRhIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVudGl0bGVtZW50KCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogJzE4NzM4ODQ4NzM2MycsXHJcbiAgICAgICAgICAgIHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRXhjZXB0aW9uLFxyXG4gICAgICAgICAgICB0eXBlTWVzc2FnZUtleTogJ2V4Y2VwdGlvbmFsJyxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdWYWx1ZSBlbnRpdGxlbWVudGVkIG9uIGZsdWZmeSBidW5uaWVzJyxcclxuICAgICAgICAgICAgYXBwbGljYXRpb246ICdlbnRpdGxlZCBhcHAnLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ2VudGl0bGVib3knLFxyXG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbIGFjdGlvbkRhdGEgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRGF0YU93bmVyKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICBpZDogJzE4NzM4ODQ4NzM2MycsXHJcbiAgICAgICAgICAgIHR5cGU6IENlcnRpZmljYXRpb25JdGVtLlR5cGUuRGF0YU93bmVyLFxyXG4gICAgICAgICAgICB0eXBlTWVzc2FnZUtleTogJ2VudGl0bGVtZW50T3duZXInLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1ZhbHVlIGVudGl0bGVtZW50IG93bmVyIHR1cnRsZSB0dXJ0bGUgaW4geW91ciB0IHNoaXJ0JyxcclxuICAgICAgICAgICAgYXBwbGljYXRpb246ICdlbnRpdGxlZCBhcHAnLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ2VudGl0bGVib3knLFxyXG4gICAgICAgICAgICBkZWNpc2lvblN0YXR1czoge1xyXG4gICAgICAgICAgICAgICAgZGVjaXNpb25zOiBbIGFjdGlvbkRhdGEgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWNjb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgaWQ6ICc4NzQzNzgzNzI4ODQnLFxyXG4gICAgICAgICAgICB0eXBlOiBDZXJ0aWZpY2F0aW9uSXRlbS5UeXBlLkFjY291bnQsXHJcbiAgICAgICAgICAgIHR5cGVNZXNzYWdlS2V5OiAnYWNjb3VudGluZycsXHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnYWNjb3VudGluZyBhcHAnLFxyXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ2FjY291bnRlcicsXHJcbiAgICAgICAgICAgIGRlY2lzaW9uU3RhdHVzOiB7XHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbnM6IFsgYWN0aW9uRGF0YSBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xyXG4gICAgICAgIGxldCBlbHREZWYgPSBgPHNwLWNlcnRpZmljYXRpb24taXRlbS1jYXJkIHNwLWl0ZW09XCJpdGVtXCIgc3AtY29sdW1uLWNvbmZpZy1rZXk9XCJjb2xLZXlcIiAvPmA7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHREZWYpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgJHNjb3BlLmNvbEtleSA9IGNvbEtleTtcclxuXHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1RpdGxlKGV4cGVjdGVkKSB7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gZWxlbWVudC5maW5kKCcucGFuZWwtdGl0bGUnKTtcclxuICAgICAgICBleHBlY3QodGl0bGUubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRpdGxlLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgZXhwZWN0KHZhbHVlKS50b0VxdWFsKGV4cGVjdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREZXRhaWxzKGV4cGVjdGVkTnVtKSB7XHJcbiAgICAgICAgbGV0IGRlZXRzID0gZWxlbWVudC5maW5kKCcubGlzdC1ncm91cC1pdGVtJyk7XHJcbiAgICAgICAgZXhwZWN0KGRlZXRzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZE51bSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZXRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERldGFpbExhYmVsKGRldGFpbCkge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IGRldGFpbC5maW5kKCcuY2VydC1pdGVtLWNhcmQtbGFiZWwnKTtcclxuICAgICAgICBleHBlY3QobGFiZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIHJldHVybiBsYWJlbC50ZXh0KCkudHJpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERldGFpbFZhbHVlKGRldGFpbCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGRldGFpbC5maW5kKCcuY2VydC1pdGVtLWNhcmQtdmFsdWUnKTtcclxuICAgICAgICBleHBlY3QodmFsdWUubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50ZXh0KCkudHJpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrRGV0YWlsTGFiZWwoZGV0YWlsLCBleHBlY3RlZExhYmVsKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gZ2V0RGV0YWlsTGFiZWwoZGV0YWlsKTtcclxuICAgICAgICBleHBlY3QobGFiZWwpLnRvRXF1YWwoZXhwZWN0ZWRMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tEZXRhaWxWYWx1ZShkZXRhaWwsIGV4cGVjdGVkVmFsdWUpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBnZXREZXRhaWxWYWx1ZShkZXRhaWwpO1xyXG4gICAgICAgIGV4cGVjdCh2YWx1ZSkudG9FcXVhbChleHBlY3RlZFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0RldGFpbChkZXRhaWxzLCBpZHgsIGNvbCkge1xyXG4gICAgICAgIGV4cGVjdChpZHggPCBkZXRhaWxzLmxlbmd0aCkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIGxldCBkZXRhaWwgPSBhbmd1bGFyLmVsZW1lbnQoZGV0YWlsc1tpZHhdKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhlIGxhYmVsLlxyXG4gICAgICAgIGNoZWNrRGV0YWlsTGFiZWwoZGV0YWlsLCBgJHtjb2x9X21zZzpgKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhlIHZhbHVlLiBEbyAnZG90IHByb3BlcnR5IGdldCcgYnkgcmVjdXJzaW5nIGludG8gdGhlIG9iamVjdC5cclxuICAgICAgICAvLyBTcGxpdCB0aGUgcHJvcGVydHkga2V5IGJ5IHRoZSBkb3QgYW5kIHRoZW4gYXBwbHkgcmVkdWNlIGZ1bmN0aW9uIHRvIGVhY2ggcHJvcGVydHkuXHJcbiAgICAgICAgbGV0IGV4cGVjdGVkID0gY29sLnNwbGl0KCcuJykucmVkdWNlKChpdGVtLCBpKSA9PiBpdGVtW2ldLCBpdGVtKTtcclxuICAgICAgICBjaGVja0RldGFpbFZhbHVlKGRldGFpbCwgZXhwZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdnZXRzIGV2aXNjZXJhdGVkIHdoZW4gbm8gaXRlbSBpcyBnaXZlbicsICgpID0+IHtcclxuICAgICAgICBleHBlY3QoKCkgPT4gY29tcGlsZSgpKS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnbG9uZ3MgZm9yIGJldHRlciBkYXlzIHdoZW4gbm8gY29sdW1uIGNvbmZpZyBrZXkgaXMgZ2l2ZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgaXRlbSA9IHt9O1xyXG4gICAgICAgIGNvbEtleSA9IG51bGw7XHJcbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBpbGUoKSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3dhcm5pbmdzJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhc1dhcm5pbmdzKCkge1xyXG4gICAgICAgICAgICBsZXQgd2FybmluZ3MgPSBlbGVtZW50LmZpbmQoJy5wYW5lbC10aXRsZSAuY2VydC1pdGVtLXdhcm5pbmdzIC50ZXh0LWRhbmdlcicpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHdhcm5pbmdzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2FyZSBkaXNwbGF5ZWQgaW4gdGl0bGUgd2hlbiBhdmFpbGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVQb2xpY3lWaW9sYXRpb24oKTtcclxuICAgICAgICAgICAgaXRlbS51bnJlbW92ZWRSZW1lZGlhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc1dhcm5pbmdzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhcmUgbm90IGRpc3BsYXllZCBpbiB0aXRsZSB3aGVuIG5vdCBhdmFpbGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVQb2xpY3lWaW9sYXRpb24oKTtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFzV2FybmluZ3MoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZGVzY3JpcHRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tEZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgYm9keSA9IGVsZW1lbnQuZmluZCgnLnBhbmVsLWJvZHknKTtcclxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYm9keS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYm9keS50ZXh0KCkudHJpbSgpKS50b0VxdWFsKGl0ZW0uZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJvZHkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnaXMgc2hvd24gaWYgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlUG9saWN5VmlvbGF0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgY2hlY2tEZXNjcmlwdGlvbihpdGVtLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIG5vdCBzaG93biBpZiB1bmF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZVBvbGljeVZpb2xhdGlvbigpO1xyXG4gICAgICAgICAgICBpdGVtLmRlc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBjaGVja0Rlc2NyaXB0aW9uKG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BvbGljeSB2aW9sYXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVQb2xpY3lWaW9sYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHBvbGljeSBydWxlIGluIHRpdGxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGNoZWNrVGl0bGUoaXRlbS5wb2xpY3lWaW9sYXRpb24ucnVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgdHlwZSwgcG9saWN5IG5hbWUsIGFuZCB2aW9sYXRpb24gb3duZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IGRlZXRzID0gZ2V0RGV0YWlscygzKTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDAsICd0eXBlTWVzc2FnZUtleScpO1xyXG4gICAgICAgICAgICBjaGVja0RldGFpbChkZWV0cywgMSwgJ3BvbGljeVZpb2xhdGlvbi5wb2xpY3kubmFtZScpO1xyXG4gICAgICAgICAgICBjaGVja0RldGFpbChkZWV0cywgMiwgJ3BvbGljeVZpb2xhdGlvbi5vd25lci5kaXNwbGF5TmFtZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3JvbGUnLCAoKSA9PiB7XHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVSb2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyByb2xlIG5hbWUgaW4gdGl0bGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgY2hlY2tUaXRsZShpdGVtLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIHRoZSB0eXBlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoMSk7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAwLCAndHlwZU1lc3NhZ2VLZXknKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdlbnRpdGxlbWVudCcsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUVudGl0bGVtZW50KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgZGlzcGxheSBuYW1lIGluIHRoZSB0aXRsZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBjaGVja1RpdGxlKGl0ZW0uZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHR5cGUsIGFwcGxpY2F0aW9uLCBhbmQgYWNjb3VudCBuYW1lJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoMyk7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAwLCAndHlwZU1lc3NhZ2VLZXknKTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDEsICdhcHBsaWNhdGlvbicpO1xyXG4gICAgICAgICAgICBjaGVja0RldGFpbChkZWV0cywgMiwgJ2FjY291bnROYW1lJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgaW5zdGFuY2UgaWYgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmluc3RhbmNlID0gJ2luc3RhbmNlMSc7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IGRlZXRzID0gZ2V0RGV0YWlscyg0KTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDIsICdpbnN0YW5jZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2VudGl0bGVtZW50IG93bmVyJywgKCkgPT4ge1xyXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjZXJ0VHlwZSA9ICdEYXRhT3duZXInO1xyXG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlRGF0YU93bmVyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgZGlzcGxheSBuYW1lIGluIHRoZSB0aXRsZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBjaGVja1RpdGxlKGl0ZW0uZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHR5cGUsIGFwcGxpY2F0aW9uLCBhbmQgYWNjb3VudCBuYW1lJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoMyk7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAwLCAndHlwZU1lc3NhZ2VLZXknKTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDEsICdhcHBsaWNhdGlvbicpO1xyXG4gICAgICAgICAgICBjaGVja0RldGFpbChkZWV0cywgMiwgJ2FjY291bnROYW1lJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgaW5zdGFuY2UgaWYgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmluc3RhbmNlID0gJ2luc3RhbmNlMSc7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IGRlZXRzID0gZ2V0RGV0YWlscyg0KTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDIsICdpbnN0YW5jZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2FjY291bnQnLCAoKSA9PiB7XHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVBY2NvdW50KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyB0aGUgYWNjb3VudCBuYW1lIGluIHRoZSB0aXRsZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBjaGVja1RpdGxlKGl0ZW0uYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHR5cGUgYW5kIGFwcGxpY2F0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoMik7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAwLCAndHlwZU1lc3NhZ2VLZXknKTtcclxuICAgICAgICAgICAgY2hlY2tEZXRhaWwoZGVldHMsIDEsICdhcHBsaWNhdGlvbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIGluc3RhbmNlIGlmIGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgaXRlbS5pbnN0YW5jZSA9ICdpbnN0YW5jZTEnO1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoMyk7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAyLCAnaW5zdGFuY2UnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdyZXR1cm5lZCBpdGVtcycsICgpID0+IHtcclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZVJvbGUoKTtcclxuICAgICAgICAgICAgaXRlbS5kZWNpc2lvbnMgPSAnZG8gaXQhJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdFJldHVybmVkSXRlbShzdGF0dXMpIHtcclxuICAgICAgICAgICAgaXRlbS5zdW1tYXJ5U3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZWV0cyA9IGdldERldGFpbHMoNCk7XHJcbiAgICAgICAgICAgIGNoZWNrRGV0YWlsKGRlZXRzLCAxLCAnc3VtbWFyeVN0YXR1cycpO1xyXG4gICAgICAgICAgICBjaGVja0RldGFpbChkZWV0cywgMywgJ2RlY2lzaW9ucycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3RoYXQgYXJlIGNoYWxsZW5nZWQgc2hvdyB0aGUgc3VtbWFyeSBzdGF0dXMgYW5kIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0UmV0dXJuZWRJdGVtKENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5DaGFsbGVuZ2VkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3RoYXQgYXJlIHdhaXRpbmcgcmV2aWV3IHNob3cgdGhlIHN1bW1hcnkgc3RhdHVzIGFuZCBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFJldHVybmVkSXRlbShDZXJ0aWZpY2F0aW9uSXRlbS5TdGF0dXMuV2FpdGluZ1Jldmlldyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aGF0IGFyZSByZXR1cm5lZCBzaG93IHRoZSBzdW1tYXJ5IHN0YXR1cyBhbmQgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RSZXR1cm5lZEl0ZW0oQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLlJldHVybmVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2NvbW1lbnRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmFkZE1lc3NhZ2UoJ2NlcnRfaXRlbV90YmxfaGVhZGVyX2NvbW1lbnRfZnJvbV91c2VyJywgJ0NvbW1lbnRzIGZyb20gezB9Jyk7XHJcbiAgICAgICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5hZGRNZXNzYWdlKCdjZXJ0X2l0ZW1fdGJsX2hlYWRlcl9jb21tZW50JywgJ0NvbW1lbnRzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q29tbWVudChjb21tZW50LCBpc0RlbGVnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYXR0cmlidXRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tZW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BOYW1lID0gKGlzRGVsZWdhdGlvbikgPyAnZGVsZWdhdGlvbkNvbW1lbnRzJyA6ICdjaGFsbGVuZ2VDb21wbGV0aW9uQ29tbWVudHMnO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hdHRyaWJ1dGVzLmNvbW1lbnRzW3Byb3BOYW1lXSA9IGNvbW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RDb21tZW50cyhpc0RlbGVnYXRpb24sIGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID1cclxuICAgICAgICAgICAgICAgICAgICAoaXNEZWxlZ2F0aW9uKSA/IENlcnRpZmljYXRpb25JdGVtLlN0YXR1cy5XYWl0aW5nUmV2aWV3IDogQ2VydGlmaWNhdGlvbkl0ZW0uU3RhdHVzLkNoYWxsZW5nZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tbWVudCA9ICd5byBhZHJpYW4hJztcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtLnN1bW1hcnlTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBzZXRDb21tZW50KGNvbW1lbnQsIGlzRGVsZWdhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlZXRzID0gZ2V0RGV0YWlscyg0KTtcclxuICAgICAgICAgICAgICAgIGxldCBjb21tZW50RGV0YWlsID0gYW5ndWxhci5lbGVtZW50KGRlZXRzWzJdKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrRGV0YWlsTGFiZWwoY29tbWVudERldGFpbCwgbGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tEZXRhaWxWYWx1ZShjb21tZW50RGV0YWlsLCBjb21tZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXQoJ2FyZSBkaXNwbGF5ZWQgZm9yIGRlbGVnYXRpb25zIHdpdGggdGhlIGRlbGVnYXRlcyBuYW1lIGlmIGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gJ3JvY2t5IGJhbGJvYSc7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRlbGVnYXRpb24uY29tcGxldGlvblVzZXIgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgdGVzdENvbW1lbnRzKHRydWUsIGBDb21tZW50cyBmcm9tICR7dXNlcn06YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FyZSBkaXNwbGF5ZWQgZm9yIGNoYWxsZW5nZXMgd2l0aCB0aGUgY2hhbGxlbmdlcnMgbmFtZSBpZiBhdmFpbGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlciA9ICdyb2NreSBiYWxib2EnO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jaGFsbGVuZ2VIaXN0b3J5Lm93bmVyID0gJ3JvY2t5IGJhbGJvYSc7XHJcbiAgICAgICAgICAgICAgICB0ZXN0Q29tbWVudHMoZmFsc2UsIGBDb21tZW50cyBmcm9tICR7dXNlcn06YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FyZSBkaXNwbGF5ZWQgZm9yIGRlbGVnYXRpb25zIHdpdGggZ2VuZXJpYyBtZXNzYWdlIGlmIG5vIGRlbGVnYXRlIG5hbWUgaXMgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVzdENvbW1lbnRzKHRydWUsICdDb21tZW50czonKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnYXJlIGRpc3BsYXllZCBmb3IgY2hhbGxlbmdlcyB3aXRoIGdlbmVyaWMgbWVzc2FnZSBpZiBubyBjaGFsbGVuZ2VyIG5hbWUgaXMgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVzdENvbW1lbnRzKGZhbHNlLCAnQ29tbWVudHM6Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2RlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdidXR0b24gYW5kIG1lbnUgYXJlIGRpc3BsYXllZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYnV0dG9uc1NlbGVjdG9yID0gJy5jZXJ0LWFjdGlvbi1jb2x1bW4gYnV0dG9uJztcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoYnV0dG9uc1NlbGVjdG9yKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFjdGlvbkJ1dHRvbiA9IGVsZW1lbnQuZmluZChgJHtidXR0b25zU2VsZWN0b3J9LmNlcnQtYWN0aW9uLSR7YWN0aW9uRGF0YS5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY3Rpb25CdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnVCdXR0b24gPSBlbGVtZW50LmZpbmQoYCR7YnV0dG9uc1NlbGVjdG9yfS5kcm9wZG93bi10b2dnbGVgKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2RldGFpbHMgYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IERFVEFJTFNfQlVUVE9OX1NFTEVDVE9SID0gJy5wYW5lbC1oZWFkaW5nIGJ1dHRvbic7XHJcbiAgICAgICAgaXQoJ2lzIGlzIHNob3duIGlmIHRoZXJlIGFyZSBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxzQnV0dG9uID0gZWxlbWVudC5maW5kKERFVEFJTFNfQlVUVE9OX1NFTEVDVE9SKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRldGFpbHNCdXR0b24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHNob3duIGlmIHRoZXJlIGFyZSBubyBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBoYXNEZXRhaWxzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IGRldGFpbHNCdXR0b24gPSBlbGVtZW50LmZpbmQoREVUQUlMU19CVVRUT05fU0VMRUNUT1IpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGV0YWlsc0J1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdsYXVuY2hlcyBkZXRhaWwgZGlhbG9nIHdoZW4gY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnc2hvd0RldGFpbERpYWxvZycpO1xyXG4gICAgICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxzQnV0dG9uID0gZWxlbWVudC5maW5kKERFVEFJTFNfQlVUVE9OX1NFTEVDVE9SKTtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRldGFpbHNCdXR0b24pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93RGV0YWlsRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
