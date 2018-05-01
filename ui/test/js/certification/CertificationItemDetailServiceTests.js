System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('certificationItemDetailService', function () {
                var certificationItemDetailService = undefined,
                    certificationService = undefined,
                    roleDetailDialogService = undefined,
                    accountDetailDialogService = undefined,
                    managedAttributeService = undefined,
                    managedAttributeDialogService = undefined,
                    spModal = undefined,
                    $q = undefined,
                    item = undefined,
                    certId = undefined,
                    policyViolationDialogService = undefined,
                    certificationDataService = undefined,
                    Certification = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 12 */
                beforeEach(inject(function (_certificationItemDetailService_, _certificationService_, _roleDetailDialogService_, _accountDetailDialogService_, _managedAttributeService_, _managedAttributeDialogService_, CertificationItem, _spModal_, _$q_, _policyViolationDialogService_, _certificationDataService_, _Certification_) {
                    certificationItemDetailService = _certificationItemDetailService_;
                    certificationService = _certificationService_;
                    roleDetailDialogService = _roleDetailDialogService_;
                    accountDetailDialogService = _accountDetailDialogService_;
                    managedAttributeService = _managedAttributeService_;
                    managedAttributeDialogService = _managedAttributeDialogService_;
                    spModal = _spModal_;
                    $q = _$q_;
                    policyViolationDialogService = _policyViolationDialogService_;
                    certificationDataService = _certificationDataService_;
                    Certification = _Certification_;

                    item = new CertificationItem({
                        id: 'certItem1',
                        accountName: 'someAccount'
                    });
                    certId = 'cert1';
                }));

                describe('showDetailDialog()', function () {
                    it('throws without certificationId', function () {
                        expect(function () {
                            return certificationItemDetailService.showDetailDialog(undefined, item);
                        }).toThrow();
                    });

                    it('throws without certificationItem', function () {
                        expect(function () {
                            return certificationItemDetailService.showDetailDialog(certId, undefined);
                        }).toThrow();
                    });

                    it('calls through to policyViolationDialogService to show policyViolation detail dialog', function () {
                        spyOn(policyViolationDialogService, 'showDetailsDialog');
                        spyOn(item, 'isPolicyViolation').and.returnValue(true);
                        item.policyViolation = { id: '1234' };
                        certificationItemDetailService.showDetailDialog(certId, item);
                        expect(policyViolationDialogService.showDetailsDialog).toHaveBeenCalledWith({ policyViolation: item.policyViolation });
                    });

                    it('shows role detail dialog for role item', function () {
                        spyOn(roleDetailDialogService, 'showDialog');
                        spyOn(certificationService, 'getRoleDetails').and.returnValue($q.when({}));
                        spyOn(certificationService, 'getRoleEntitlementDetailsUrl');

                        spyOn(item, 'isRole').and.returnValue(true);
                        certificationItemDetailService.showDetailDialog(certId, item);

                        expect(roleDetailDialogService.showDialog).toHaveBeenCalled();
                        var args = roleDetailDialogService.showDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        var urlFunc = args[2];
                        expect(angular.isFunction(urlFunc)).toEqual(true);
                        urlFunc('ma1');
                        expect(certificationService.getRoleEntitlementDetailsUrl).toHaveBeenCalledWith(certId, item.id, 'ma1');
                    });

                    it('shows managed attribute detail dialog for exception item', function () {
                        var managedAttributeDetail = {
                            id: 'xyx'
                        },
                            url = 'some/url';
                        spyOn(managedAttributeDialogService, 'showDialog');
                        spyOn(certificationService, 'getEntitlementDetailsUrl').and.returnValue(url);
                        spyOn(managedAttributeService, 'getEntitlementDetails').and.callFake(function () {
                            return managedAttributeDetail;
                        });

                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                        certificationItemDetailService.showDetailDialog(certId, item);
                        expect(certificationService.getEntitlementDetailsUrl).toHaveBeenCalledWith(certId, item.id);
                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(url);
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(managedAttributeDetail, url);
                    });

                    it('shows managed attribute detail dialog for account group permissions exception item', function () {
                        var managedAttributeDetail = {
                            id: 'xyx'
                        },
                            url = 'some/url';
                        spyOn(managedAttributeDialogService, 'showDialog');
                        spyOn(certificationService, 'getEntitlementDetailsUrl').and.returnValue(url);
                        spyOn(managedAttributeService, 'getEntitlementDetails').and.callFake(function () {
                            return managedAttributeDetail;
                        });

                        spyOn(certificationItemDetailService, 'isAccountGroupPermissionsException').and.returnValue(true);
                        certificationItemDetailService.showDetailDialog(certId, item);

                        expect(certificationService.getEntitlementDetailsUrl).toHaveBeenCalledWith(certId, item.id);
                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(url);
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(managedAttributeDetail, url);
                    });

                    it('calls through to entitlementOwnerDetailDialogService', function () {
                        spyOn(item, 'isEntitlementOwner').and.returnValue(true);
                        spyOn(certificationItemDetailService, 'showEntitlementOwnerDetailDialog').and.callFake(angular.noop);

                        certificationItemDetailService.showDetailDialog(certId, item);
                        expect(certificationItemDetailService.showEntitlementOwnerDetailDialog).toHaveBeenCalled();
                    });

                    it('throws for unsupported type', function () {
                        spyOn(item, 'isPolicyViolation').and.returnValue(false);
                        spyOn(item, 'isRole').and.returnValue(false);
                        spyOn(item, 'isException').and.returnValue(false);
                        expect(function () {
                            return certificationItemDetailService.showDetailDialog(certId, item);
                        }).toThrow();
                    });

                    it('should call through to showRoleProfileDetailDialog', function () {
                        spyOn(item, 'isRoleProfile').and.returnValue(true);
                        spyOn(certificationItemDetailService, 'showRoleProfileDetailDialog').and.callFake(angular.noop);
                        certificationItemDetailService.showDetailDialog(certId, item);
                        expect(certificationItemDetailService.showRoleProfileDetailDialog).toHaveBeenCalled();
                    });
                });

                describe('hasDetails()', function () {
                    it('throws without certificationItem', function () {
                        expect(function () {
                            return certificationItemDetailService.hasDetails();
                        }).toThrow();
                    });

                    it('returns true for policy violation', function () {
                        spyOn(item, 'isPolicyViolation').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(true);
                    });

                    it('returns true for role', function () {
                        spyOn(item, 'isRole').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(true);
                    });

                    it('returns true for group attribute', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(true);
                    });

                    it('returns true for entitlement owner', function () {
                        spyOn(item, 'isEntitlementOwner').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(true);
                    });

                    it('should return true for role profile', function () {
                        spyOn(item, 'isRoleProfile').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(true);
                    });

                    it('returns false for others', function () {
                        spyOn(item, 'isRole').and.returnValue(false);
                        spyOn(item, 'isPolicyViolation').and.returnValue(false);
                        spyOn(item, 'isGroupAttributeException').and.returnValue(false);
                        expect(certificationItemDetailService.hasDetails(item)).toEqual(false);
                    });

                    it('returns false if noGroupAttributeException is true and item is group' + 'attribute or not group permission exception', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        expect(certificationItemDetailService.hasDetails(item, true)).toEqual(false);
                    });
                });

                describe('showAccountDetailDialog()', function () {
                    it('throws without certificationId', function () {
                        expect(function () {
                            return certificationItemDetailService.showAccountDetailDialog(undefined, item);
                        }).toThrow();
                    });

                    it('throws without certificationItem', function () {
                        expect(function () {
                            return certificationItemDetailService.showAccountDetailDialog(certId, undefined);
                        }).toThrow();
                    });

                    it('shows account detail dialog', function () {
                        spyOn(accountDetailDialogService, 'showDialog');
                        spyOn(certificationService, 'getAccountDetails').and.returnValue($q.when({}));
                        spyOn(certificationService, 'getAccountEntitlementDetailsUrl');

                        certificationItemDetailService.showAccountDetailDialog(certId, item);
                        expect(accountDetailDialogService.showDialog).toHaveBeenCalled();
                        var args = accountDetailDialogService.showDialog.calls.mostRecent().args;
                        expect(args.length).toEqual(2);
                        var urlFunc = args[1];
                        expect(angular.isFunction(urlFunc)).toEqual(true);
                        urlFunc('ma1');
                        expect(certificationService.getAccountEntitlementDetailsUrl).toHaveBeenCalledWith(certId, item.id, 'ma1');
                    });
                });

                describe('showEntitlementOwnerDetailDialog', function () {
                    var entitlementOwnerDetailDialogService = undefined;
                    beforeEach(inject(function (_entitlementOwnerDetailDialogService_) {
                        entitlementOwnerDetailDialogService = _entitlementOwnerDetailDialogService_;
                    }));

                    it('should call through to entitlementOwnerDetailDialogService', function () {
                        spyOn(item, 'isEntitlementOwner').and.returnValue(true);
                        spyOn(entitlementOwnerDetailDialogService, 'showDialog').and.callFake(angular.noop);
                        certificationItemDetailService.showDetailDialog(certId, item);
                        expect(entitlementOwnerDetailDialogService.showDialog).toHaveBeenCalled();
                    });
                });

                describe('showRoleSnapshotDetails', function () {
                    var certificationEntityService = undefined;
                    beforeEach(inject(function (_certificationEntityService_) {
                        certificationEntityService = _certificationEntityService_;
                    }));

                    it('should call through to certificationEntityService', function () {
                        spyOn(certificationEntityService, 'showRoleSnapshotDetailDialog').and.callFake(angular.noop);
                        certificationItemDetailService.showRoleSnapshotDetails(certId, item);
                        expect(certificationEntityService.showRoleSnapshotDetailDialog).toHaveBeenCalled();
                    });
                });

                describe('hasAccountDetails()', function () {
                    it('throws without certificationItem', function () {
                        expect(function () {
                            return certificationItemDetailService.hasAccountDetails();
                        }).toThrow();
                    });

                    it('returns true for exception item', function () {
                        spyOn(item, 'isException').and.returnValue(true);
                        spyOn(certificationDataService, 'getCertificationType').and.callFake(function () {
                            return Certification.Type.Manager;
                        });
                        expect(certificationItemDetailService.hasAccountDetails(item)).toEqual(true);
                    });

                    it('returns false for exceptions on the IdentityIQ application', function () {
                        spyOn(item, 'isException').and.returnValue(true);
                        item.application = 'IdentityIQ';
                        expect(certificationItemDetailService.hasAccountDetails(item)).toEqual(false);
                    });

                    it('returns true for account item', function () {
                        spyOn(item, 'isAccount').and.returnValue(true);
                        expect(certificationItemDetailService.hasAccountDetails(item)).toEqual(true);
                    });

                    it('returns false for other items', function () {
                        spyOn(item, 'isException').and.returnValue(false);
                        spyOn(item, 'isAccount').and.returnValue(false);
                        expect(certificationItemDetailService.hasAccountDetails(item)).toEqual(false);
                    });
                });

                describe('hasRoleDetails()', function () {
                    it('throws without certificationItem', function () {
                        expect(function () {
                            return certificationItemDetailService.hasRoleDetails();
                        }).toThrow();
                    });

                    it('returns true for role composition role item', function () {
                        spyOn(item, 'isRoleCompRoleItem').and.returnValue(true);
                        expect(certificationItemDetailService.hasRoleDetails(item)).toEqual(true);
                    });

                    it('returns false for role composition role item', function () {
                        spyOn(item, 'isRoleCompRoleItem').and.returnValue(false);
                        expect(certificationItemDetailService.hasRoleDetails(item)).toEqual(false);
                    });
                });

                describe('showRoleDetailDialog', function () {
                    it('shows role hierarchy dialog for role comp role', function () {
                        spyOn(roleDetailDialogService, 'showHeirarchy');
                        spyOn(certificationService, 'getRoleDetails').and.returnValue($q.when({}));
                        spyOn(certificationService, 'getRoleEntitlementDetailsUrl');

                        spyOn(item, 'isRoleCompRoleItem').and.returnValue(true);
                        certificationItemDetailService.showRoleDetailDialog(certId, item);

                        expect(roleDetailDialogService.showHeirarchy).toHaveBeenCalled();
                        var args = roleDetailDialogService.showHeirarchy.calls.mostRecent().args;
                        expect(args.length).toEqual(3);
                        var urlFunc = args[2];
                        expect(angular.isFunction(urlFunc)).toEqual(true);
                        urlFunc('ma1');
                        expect(certificationService.getRoleEntitlementDetailsUrl).toHaveBeenCalledWith(certId, item.id, 'ma1');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyx1QkFBdUIsVUFBVSxTQUFTOztJQUV2SDs7SUFFQSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLGtDQUFrQyxZQUFNO2dCQUM3QyxJQUFJLGlDQUE4QjtvQkFBRSx1QkFBb0I7b0JBQUUsMEJBQXVCO29CQUFFLDZCQUEwQjtvQkFDekcsMEJBQXVCO29CQUFFLGdDQUE2QjtvQkFBRSxVQUFPO29CQUFFLEtBQUU7b0JBQUUsT0FBSTtvQkFBRSxTQUFNO29CQUFFLCtCQUE0QjtvQkFDL0csMkJBQXdCO29CQUFFLGdCQUFhOztnQkFFM0MsV0FBVyxPQUFPLHFCQUFxQjs7O2dCQUd2QyxXQUFXLE9BQU8sVUFBQyxrQ0FBa0Msd0JBQXdCLDJCQUMxRCw4QkFBOEIsMkJBQTJCLGlDQUN6RCxtQkFBbUIsV0FBVyxNQUFNLGdDQUNwQyw0QkFBNEIsaUJBQW9CO29CQUMvRCxpQ0FBaUM7b0JBQ2pDLHVCQUF1QjtvQkFDdkIsMEJBQTBCO29CQUMxQiw2QkFBNkI7b0JBQzdCLDBCQUEwQjtvQkFDMUIsZ0NBQWdDO29CQUNoQyxVQUFVO29CQUNWLEtBQUs7b0JBQ0wsK0JBQStCO29CQUMvQiwyQkFBMkI7b0JBQzNCLGdCQUFnQjs7b0JBRWhCLE9BQU8sSUFBSSxrQkFBa0I7d0JBQ3pCLElBQUk7d0JBQ0osYUFBYTs7b0JBRWpCLFNBQVM7OztnQkFHYixTQUFTLHNCQUFzQixZQUFNO29CQUNqQyxHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxPQUFPLFlB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K0IsZUFBZSxPQUFPLFFBQVE7OztvQkFHeEUsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsTUFBTSxNQUFNLHNCQUFzQixJQUFJLFlBQVk7d0JBQ2xELE9BQU8sK0JBQStCLGVBQWUsT0FBTyxRQUFROzs7O2dCQUk1RSxTQUFTLHdCQUF3QixZQUFNO29CQUNuQyxHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCxNQUFNLHlCQUF5Qjt3QkFDL0IsTUFBTSxzQkFBc0Isa0JBQWtCLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3RFLE1BQU0sc0JBQXNCOzt3QkFFNUIsTUFBTSxNQUFNLHNCQUFzQixJQUFJLFlBQVk7d0JBQ2xELCtCQUErQixxQkFBcUIsUUFBUTs7d0JBRTVELE9BQU8sd0JBQXdCLGVBQWU7d0JBQzlDLElBQUksT0FBTyx3QkFBd0IsY0FBYyxNQUFNLGFBQWE7d0JBQ3BFLE9BQU8sS0FBSyxRQUFRLFFBQVE7d0JBQzVCLElBQUksVUFBVSxLQUFLO3dCQUNuQixPQUFPLFFBQVEsV0FBVyxVQUFVLFFBQVE7d0JBQzVDLFFBQVE7d0JBQ1IsT0FBTyxxQkFBcUIsOEJBQThCLHFCQUFxQixRQUFRLEtBQUssSUFBSTs7Ozs7O0dBeUN6RyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsIGNlcnRpZmljYXRpb25TZXJ2aWNlLCByb2xlRGV0YWlsRGlhbG9nU2VydmljZSwgYWNjb3VudERldGFpbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLCBtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSwgc3BNb2RhbCwgJHEsIGl0ZW0sIGNlcnRJZCwgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSxcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCBDZXJ0aWZpY2F0aW9uO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogMTIgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZV8sIF9jZXJ0aWZpY2F0aW9uU2VydmljZV8sIF9yb2xlRGV0YWlsRGlhbG9nU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIF9hY2NvdW50RGV0YWlsRGlhbG9nU2VydmljZV8sIF9tYW5hZ2VkQXR0cmlidXRlU2VydmljZV8sIF9tYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLCBfc3BNb2RhbF8sIF8kcV8sIF9wb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIF9DZXJ0aWZpY2F0aW9uXykgPT4ge1xuICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlXztcbiAgICAgICAgY2VydGlmaWNhdGlvblNlcnZpY2UgPSBfY2VydGlmaWNhdGlvblNlcnZpY2VfO1xuICAgICAgICByb2xlRGV0YWlsRGlhbG9nU2VydmljZSA9IF9yb2xlRGV0YWlsRGlhbG9nU2VydmljZV87XG4gICAgICAgIGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlID0gX2FjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfO1xuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSA9IF9tYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlXztcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XG5cbiAgICAgICAgaXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XG4gICAgICAgICAgICBpZDogJ2NlcnRJdGVtMScsXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ3NvbWVBY2NvdW50J1xuICAgICAgICB9KTtcbiAgICAgICAgY2VydElkID0gJ2NlcnQxJztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0RldGFpbERpYWxvZygpJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgY2VydGlmaWNhdGlvbklkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93RGV0YWlsRGlhbG9nKHVuZGVmaW5lZCwgaXRlbSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNlcnRpZmljYXRpb25JdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93RGV0YWlsRGlhbG9nKGNlcnRJZCwgdW5kZWZpbmVkKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlIHRvIHNob3cgcG9saWN5VmlvbGF0aW9uIGRldGFpbCBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd0RldGFpbHNEaWFsb2cnKTtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1BvbGljeVZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGl0ZW0ucG9saWN5VmlvbGF0aW9uID0geyBpZDogJzEyMzQnIH07XG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0RldGFpbERpYWxvZyhjZXJ0SWQsIGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd0RldGFpbHNEaWFsb2cpXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgcG9saWN5VmlvbGF0aW9uIDogaXRlbS5wb2xpY3lWaW9sYXRpb259KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHJvbGUgZGV0YWlsIGRpYWxvZyBmb3Igcm9sZSBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24ocm9sZURldGFpbERpYWxvZ1NlcnZpY2UsICdzaG93RGlhbG9nJyk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldFJvbGVEZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Um9sZUVudGl0bGVtZW50RGV0YWlsc1VybCcpO1xuXG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNSb2xlJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcblxuICAgICAgICAgICAgZXhwZWN0KHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBhcmdzID0gcm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgIGxldCB1cmxGdW5jID0gYXJnc1syXTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmlzRnVuY3Rpb24odXJsRnVuYykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB1cmxGdW5jKCdtYTEnKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRSb2xlRW50aXRsZW1lbnREZXRhaWxzVXJsKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChjZXJ0SWQsIGl0ZW0uaWQsICdtYTEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIG1hbmFnZWQgYXR0cmlidXRlIGRldGFpbCBkaWFsb2cgZm9yIGV4Y2VwdGlvbiBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICd4eXgnXG4gICAgICAgICAgICB9LCB1cmwgPSAnc29tZS91cmwnO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsICdzaG93RGlhbG9nJyk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldEVudGl0bGVtZW50RGV0YWlsc1VybCcpLmFuZC5yZXR1cm5WYWx1ZSh1cmwpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudERldGFpbHMnKS5hbmQuY2FsbEZha2UoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZURldGFpbCApO1xuXG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNHcm91cEF0dHJpYnV0ZUV4Y2VwdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLmNhbGxGYWtlKCgpID0+XG4gICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHNVcmwpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJZCwgaXRlbS5pZCk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh1cmwpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwsIHVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyBtYW5hZ2VkIGF0dHJpYnV0ZSBkZXRhaWwgZGlhbG9nIGZvciBhY2NvdW50IGdyb3VwIHBlcm1pc3Npb25zIGV4Y2VwdGlvbiBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICd4eXgnXG4gICAgICAgICAgICB9LCB1cmwgPSAnc29tZS91cmwnO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsICdzaG93RGlhbG9nJyk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldEVudGl0bGVtZW50RGV0YWlsc1VybCcpLmFuZC5yZXR1cm5WYWx1ZSh1cmwpO1xuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudERldGFpbHMnKS5hbmQuY2FsbEZha2UoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZURldGFpbCApO1xuXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdpc0FjY291bnRHcm91cFBlcm1pc3Npb25zRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcblxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlsc1VybCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydElkLCBpdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVybCk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURldGFpbCwgdXJsKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gZW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNFbnRpdGxlbWVudE93bmVyJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCAnc2hvd0VudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2cnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcblxuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0VudGl0bGVtZW50T3duZXJEZXRhaWxEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyBmb3IgdW5zdXBwb3J0ZWQgdHlwZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1BvbGljeVZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNSb2xlJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0V4Y2VwdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBzaG93Um9sZVByb2ZpbGVEZXRhaWxEaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNSb2xlUHJvZmlsZScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSwgJ3Nob3dSb2xlUHJvZmlsZURldGFpbERpYWxvZycpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd1JvbGVQcm9maWxlRGV0YWlsRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0RldGFpbHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNlcnRpZmljYXRpb25JdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgcG9saWN5IHZpb2xhdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1BvbGljeVZpb2xhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuaGFzRGV0YWlscyhpdGVtKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igcm9sZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1JvbGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0RldGFpbHMoaXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGdyb3VwIGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0dyb3VwQXR0cmlidXRlRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzKGl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBlbnRpdGxlbWVudCBvd25lcicsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0VudGl0bGVtZW50T3duZXInKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0RldGFpbHMoaXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIHJvbGUgcHJvZmlsZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1JvbGVQcm9maWxlJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzKGl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igb3RoZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzUm9sZScpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNQb2xpY3lWaW9sYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzKGl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm9Hcm91cEF0dHJpYnV0ZUV4Y2VwdGlvbiBpcyB0cnVlIGFuZCBpdGVtIGlzIGdyb3VwJyArXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSBvciBub3QgZ3JvdXAgcGVybWlzc2lvbiBleGNlcHRpb24nLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0dyb3VwQXR0cmlidXRlRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNEZXRhaWxzKGl0ZW0sIHRydWUpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0FjY291bnREZXRhaWxEaWFsb2coKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNlcnRpZmljYXRpb25JZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0FjY291bnREZXRhaWxEaWFsb2codW5kZWZpbmVkLCBpdGVtKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgY2VydGlmaWNhdGlvbkl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLnNob3dBY2NvdW50RGV0YWlsRGlhbG9nKGNlcnRJZCwgdW5kZWZpbmVkKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgYWNjb3VudCBkZXRhaWwgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oYWNjb3VudERldGFpbERpYWxvZ1NlcnZpY2UsICdzaG93RGlhbG9nJyk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldEFjY291bnREZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0QWNjb3VudEVudGl0bGVtZW50RGV0YWlsc1VybCcpO1xuXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0FjY291bnREZXRhaWxEaWFsb2coY2VydElkLCBpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2NvdW50RGV0YWlsRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBsZXQgYXJncyA9IGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3M7XG4gICAgICAgICAgICBleHBlY3QoYXJncy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBsZXQgdXJsRnVuYyA9IGFyZ3NbMV07XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5pc0Z1bmN0aW9uKHVybEZ1bmMpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgdXJsRnVuYygnbWExJyk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvblNlcnZpY2UuZ2V0QWNjb3VudEVudGl0bGVtZW50RGV0YWlsc1VybCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydElkLCBpdGVtLmlkLCAnbWExJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dFbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBsZXQgZW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2U7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfZW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2VfKSA9PiB7XG4gICAgICAgICAgICBlbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nU2VydmljZSA9IF9lbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nU2VydmljZV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBlbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0VudGl0bGVtZW50T3duZXInKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBzcHlPbihlbnRpdGxlbWVudE93bmVyRGV0YWlsRGlhbG9nU2VydmljZSwgJ3Nob3dEaWFsb2cnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93RGV0YWlsRGlhbG9nKGNlcnRJZCwgaXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoZW50aXRsZW1lbnRPd25lckRldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93Um9sZVNuYXBzaG90RGV0YWlscycsICgpID0+IHtcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlO1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXykgPT4ge1xuICAgICAgICAgICAgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2VfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ3Nob3dSb2xlU25hcHNob3REZXRhaWxEaWFsb2cnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93Um9sZVNuYXBzaG90RGV0YWlscyhjZXJ0SWQsIGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLnNob3dSb2xlU25hcHNob3REZXRhaWxEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzQWNjb3VudERldGFpbHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNlcnRpZmljYXRpb25JdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNBY2NvdW50RGV0YWlscygpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGV4Y2VwdGlvbiBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQuY2FsbEZha2UoKCkgPT4gQ2VydGlmaWNhdGlvbi5UeXBlLk1hbmFnZXIpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNBY2NvdW50RGV0YWlscyhpdGVtKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGV4Y2VwdGlvbnMgb24gdGhlIElkZW50aXR5SVEgYXBwbGljYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNFeGNlcHRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBpdGVtLmFwcGxpY2F0aW9uID0gJ0lkZW50aXR5SVEnO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNBY2NvdW50RGV0YWlscyhpdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFjY291bnQgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0FjY291bnQnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0FjY291bnREZXRhaWxzKGl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igb3RoZXIgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihpdGVtLCAnaXNFeGNlcHRpb24nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzQWNjb3VudCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLmhhc0FjY291bnREZXRhaWxzKGl0ZW0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzUm9sZURldGFpbHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNlcnRpZmljYXRpb25JdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNSb2xlRGV0YWlscygpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHJvbGUgY29tcG9zaXRpb24gcm9sZSBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzUm9sZUNvbXBSb2xlSXRlbScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UuaGFzUm9sZURldGFpbHMoaXRlbSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciByb2xlIGNvbXBvc2l0aW9uIHJvbGUgaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc1JvbGVDb21wUm9sZUl0ZW0nKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5oYXNSb2xlRGV0YWlscyhpdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dSb2xlRGV0YWlsRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvd3Mgcm9sZSBoaWVyYXJjaHkgZGlhbG9nIGZvciByb2xlIGNvbXAgcm9sZScsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLCAnc2hvd0hlaXJhcmNoeScpO1xuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvblNlcnZpY2UsICdnZXRSb2xlRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHt9KSk7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldFJvbGVFbnRpdGxlbWVudERldGFpbHNVcmwnKTtcblxuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzUm9sZUNvbXBSb2xlSXRlbScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93Um9sZURldGFpbERpYWxvZyhjZXJ0SWQsIGl0ZW0pO1xuXG4gICAgICAgICAgICBleHBlY3Qocm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0hlaXJhcmNoeSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgbGV0IGFyZ3MgPSByb2xlRGV0YWlsRGlhbG9nU2VydmljZS5zaG93SGVpcmFyY2h5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3MubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICAgICAgbGV0IHVybEZ1bmMgPSBhcmdzWzJdO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuaXNGdW5jdGlvbih1cmxGdW5jKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIHVybEZ1bmMoJ21hMScpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudERldGFpbHNVcmwpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGNlcnRJZCwgaXRlbS5pZCwgJ21hMScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
