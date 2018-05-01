System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('AdditionalCertificationActionColumnDirectiveCtrl', function () {

                var $scope = undefined,
                    $controller = undefined,
                    $q = undefined,
                    certificationService = undefined,
                    certificationDataService = undefined,
                    workItemService = undefined,
                    CertificationItem = undefined,
                    CertificationDecisionStatus = undefined,
                    spModal = undefined,
                    cert = undefined,
                    isSigned = undefined,
                    isEditable = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 11 */
                beforeEach(inject(function (_$rootScope_, _$controller_, _$q_, _CertificationItem_, _CertificationDecisionStatus_, _certificationService_, _certificationDataService_, _workItemService_, _spModal_, Certification, certificationTestData) {
                    $scope = _$rootScope_;
                    $controller = _$controller_;
                    $q = _$q_;

                    CertificationItem = _CertificationItem_;
                    CertificationDecisionStatus = _CertificationDecisionStatus_;

                    certificationService = _certificationService_;
                    certificationDataService = _certificationDataService_;
                    workItemService = _workItemService_;
                    spModal = _spModal_;
                    cert = new Certification(certificationTestData.CERTIFICATION_1);

                    spyOn(certificationDataService, 'getDataTableConfig').and.returnValue({
                        getRefreshTrigger: function () {
                            return { refresh: function () {} };
                        }
                    });
                    spyOn(certificationDataService, 'initialize');
                    spyOn(certificationDataService, 'isCertificationEditable').and.callFake(function () {
                        return isEditable;
                    });
                    spyOn(certificationDataService, 'isSignedOff').and.callFake(function () {
                        return isSigned;
                    });
                    spyOn(certificationService, 'getCertification').and.returnValue($q.when({ object: cert }));
                }));

                function createController(item, hasWorkitem) {
                    item.workItemId = hasWorkitem ? cert.workItemId : undefined;
                    var ctrl = $controller('AdditionalCertificationActionColumnDirectiveCtrl', {}, { item: item });
                    ctrl.parentCertification = cert;
                    return ctrl;
                }

                function createCertificationItem() {
                    return new CertificationItem({
                        id: '1234',
                        roleName: 'Role1',
                        decisionStatus: new CertificationDecisionStatus({}),
                        canChangeDecision: true
                    });
                }

                describe('forwardItem', function () {
                    var item = undefined,
                        ctrl = undefined;

                    beforeEach(function () {
                        item = createCertificationItem();
                        ctrl = createController(item);
                    });

                    it('should show forward dialog and refresh view', function () {
                        spyOn(certificationService, 'forwardCertification');
                        spyOn(ctrl, 'updateCertification');
                        ctrl.forwardItem();
                        $scope.$apply();

                        expect(certificationService.forwardCertification).toHaveBeenCalled();
                        var args = certificationService.forwardCertification.calls.mostRecent().args;
                        expect(args[0]).toEqual(ctrl.item);
                        expect(angular.isFunction(args[1])).toEqual(true);
                        ctrl.updateCertification.calls.reset();
                        args[1]();
                        expect(ctrl.updateCertification).toHaveBeenCalled();
                    });
                });

                describe('rescind', function () {
                    var item = undefined,
                        ctrl = undefined;

                    beforeEach(function () {
                        item = createCertificationItem();
                        ctrl = createController(item);
                        spyOn(certificationService, 'rescindCertification').and.returnValue($q.when());
                    });

                    it('should show confirmation dialog and call rescindCertification', function () {
                        spyOn(spModal, 'confirm').and.returnValue($q.when());

                        ctrl.rescind();
                        $scope.$apply();

                        expect(spModal.confirm).toHaveBeenCalled();
                        expect(certificationService.rescindCertification).toHaveBeenCalled();
                        expect(certificationDataService.initialize).toHaveBeenCalled();
                        expect(certificationDataService.getDataTableConfig).toHaveBeenCalled();
                    });

                    it('should not call rescindCertification if confirm is canceled', function () {
                        spyOn(spModal, 'confirm').and.returnValue($q.reject());

                        ctrl.rescind();
                        $scope.$apply();

                        expect(spModal.confirm).toHaveBeenCalled();
                        expect(certificationService.rescindCertification).not.toHaveBeenCalled();
                        expect(certificationDataService.initialize).not.toHaveBeenCalled();
                        expect(certificationDataService.getDataTableConfig).not.toHaveBeenCalled();
                    });
                });

                describe('canReturn', function () {
                    var item = undefined,
                        ctrl = undefined;
                    beforeEach(function () {
                        item = createCertificationItem();
                    });
                    it('should return true if parent cert is not signed off', function () {
                        isSigned = false;
                        isEditable = true;
                        ctrl = createController(item);
                        expect(ctrl.canReturn()).toBe(true);
                    });
                    it('should return false if parent cert is signed off', function () {
                        isSigned = true;
                        isEditable = true;
                        ctrl = createController(item);
                        expect(ctrl.canReturn()).toBe(false);
                    });
                    it('should return false if parent cert is not editable', function () {
                        isSigned = false;
                        isEditable = false;
                        ctrl = createController(item);
                        expect(ctrl.canReturn()).toBe(false);
                    });
                });

                describe('canEmail', function () {
                    var item = undefined,
                        ctrl = undefined;
                    beforeEach(function () {
                        item = createCertificationItem();
                    });
                    it('should return true if parent cert is not signed off', function () {
                        isSigned = false;
                        isEditable = true;
                        ctrl = createController(item);
                        expect(ctrl.canEmail()).toBe(true);
                    });
                    it('should return false if parent cert is signed off', function () {
                        isSigned = true;
                        isEditable = true;
                        ctrl = createController(item);
                        expect(ctrl.canEmail()).toBe(false);
                    });
                    it('should return false if parent cert is not editable', function () {
                        isSigned = false;
                        isEditable = false;
                        ctrl = createController(item);
                        expect(ctrl.canEmail()).toBe(false);
                    });
                });

                describe('canForward', function () {
                    var item = undefined,
                        ctrl = undefined;
                    beforeEach(function () {
                        item = createCertificationItem();
                    });
                    it('should return true if parent cert is not signed off', function () {
                        isSigned = false;
                        isEditable = true;
                        ctrl = createController(item, true);
                        expect(ctrl.canForward()).toBe(true);
                    });
                    it('should return false if parent cert is signed off', function () {
                        isSigned = true;
                        isEditable = true;
                        ctrl = createController(item, true);
                        expect(ctrl.canForward()).toBe(false);
                    });
                    it('should return false if parent cert is not editable', function () {
                        isSigned = false;
                        isEditable = false;
                        ctrl = createController(item, true);
                        expect(ctrl.canForward()).toBe(false);
                    });
                    it('should return false if there is no workItemId', function () {
                        isSigned = false;
                        isEditable = true;
                        ctrl = createController(item, false);
                        expect(ctrl.canForward()).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQWRkaXRpb25hbENlcnRpZmljYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7Ozs7SUFLakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0RBQW9ELFlBQVc7O2dCQUVwRSxJQUFJLFNBQU07b0JBQUUsY0FBVztvQkFBRSxLQUFFO29CQUFFLHVCQUFvQjtvQkFBRSwyQkFBd0I7b0JBQUUsa0JBQWU7b0JBQUUsb0JBQWlCO29CQUMzRyw4QkFBMkI7b0JBQUUsVUFBTztvQkFBRSxPQUFJO29CQUFFLFdBQVE7b0JBQUUsYUFBVTs7Z0JBRXBFLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxjQUFjLGVBQWUsTUFBTSxxQkFBcUIsK0JBQ3hELHdCQUF3Qiw0QkFBNEIsbUJBQW1CLFdBQ3ZFLGVBQWUsdUJBQXVCO29CQUM3RCxTQUFTO29CQUNULGNBQWM7b0JBQ2QsS0FBSzs7b0JBRUwsb0JBQW9CO29CQUNwQiw4QkFBOEI7O29CQUU5Qix1QkFBdUI7b0JBQ3ZCLDJCQUEyQjtvQkFDM0Isa0JBQWtCO29CQUNsQixVQUFVO29CQUNWLE9BQU8sSUFBSSxjQUFjLHNCQUFzQjs7b0JBRS9DLE1BQU0sMEJBQTBCLHNCQUFzQixJQUFJLFlBQVk7d0JBQ2xFLG1CQUFtQixZQUFNOzRCQUNyQixPQUFPLEVBQUUsU0FBUyxZQUFNOzs7b0JBR2hDLE1BQU0sMEJBQTBCO29CQUNoQyxNQUFNLDBCQUEwQiwyQkFBMkIsSUFBSSxTQUFTLFlBQUE7d0JBZ0J4RCxPQWhCOEQ7O29CQUM5RSxNQUFNLDBCQUEwQixlQUFlLElBQUksU0FBUyxZQUFBO3dCQWtCNUMsT0FsQmtEOztvQkFDbEUsTUFBTSxzQkFBc0Isb0JBQW9CLElBQUksWUFBWSxHQUFHLEtBQUssRUFBQyxRQUFROzs7Z0JBR3JGLFNBQVMsaUJBQWlCLE1BQU0sYUFBYTtvQkFDekMsS0FBSyxhQUFhLGNBQWMsS0FBSyxhQUFhO29CQUNsRCxJQUFJLE9BQU8sWUFBWSxvREFBb0QsSUFBSSxFQUFDLE1BQU07b0JBQ3RGLEtBQUssc0JBQXNCO29CQUMzQixPQUFPOzs7Z0JBR1gsU0FBUywwQkFBMEI7b0JBQy9CLE9BQU8sSUFBSSxrQkFBa0I7d0JBQ3pCLElBQUk7d0JBQ0osVUFBVTt3QkFDVixnQkFBZ0IsSUFBSSw0QkFBNEI7d0JBQ2hELG1CQUFtQjs7OztnQkFJM0IsU0FBUyxlQUFlLFlBQU07b0JBQzFCLElBQUksT0FBSTt3QkFBRSxPQUFJOztvQkFFZCxXQUFXLFlBQU07d0JBQ2IsT0FBTzt3QkFDUCxPQUFPLGlCQUFpQjs7O29CQUc1QixHQUFHLCtDQUErQyxZQUFNO3dCQUNwRCxNQUFNLHNCQUFzQjt3QkFDNUIsTUFBTSxNQUFNO3dCQUNaLEtBQUs7d0JBQ0wsT0FBTzs7d0JBRVAsT0FBTyxxQkFBcUIsc0JBQXNCO3dCQUNsRCxJQUFJLE9BQU8scUJBQXFCLHFCQUFxQixNQUFNLGFBQWE7d0JBQ3hFLE9BQU8sS0FBSyxJQUFJLFFBQVEsS0FBSzt3QkFDN0IsT0FBTyxRQUFRLFdBQVcsS0FBSyxLQUFLLFFBQVE7d0JBQzVDLEtBQUssb0JBQW9CLE1BQU07d0JBQy9CLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLHFCQUFxQjs7OztnQkFJekMsU0FBUyxXQUFXLFlBQU07b0JBQ3RCLElBQUksT0FBSTt3QkFBRSxPQUFJOztvQkFFZCxXQUFXLFlBQU07d0JBQ2IsT0FBTzt3QkFDUCxPQUFPLGlCQUFpQjt3QkFDeEIsTUFBTSxzQkFBc0Isd0JBQXdCLElBQUksWUFBWSxHQUFHOzs7b0JBRzNFLEdBQUcsaUVBQWlFLFlBQU07d0JBQ3RFLE1BQU0sU0FBUyxXQUFXLElBQUksWUFBWSxHQUFHOzt3QkFFN0MsS0FBSzt3QkFDTCxPQUFPOzt3QkFFUCxPQUFPLFFBQVEsU0FBUzt3QkFDeEIsT0FBTyxxQkFBcUIsc0JBQXNCO3dCQUNsRCxPQUFPLHlCQUF5QixZQUFZO3dCQUM1QyxPQUFPLHlCQUF5QixvQkFBb0I7OztvQkFHeEQsR0FBRywrREFBK0QsWUFBTTt3QkFDcEUsTUFBTSxTQUFTLFdBQVcsSUFBSSxZQUFZLEdBQUc7O3dCQUU3QyxLQUFLO3dCQUNMLE9BQU87O3dCQUVQLE9BQU8sUUFBUSxTQUFTO3dCQUN4QixPQUFPLHFCQUFxQixzQkFBc0IsSUFBSTt3QkFDdEQsT0FBTyx5QkFBeUIsWUFBWSxJQUFJO3dCQUNoRCxPQUFPLHlCQUF5QixvQkFBb0IsSUFBSTs7OztnQkFJaEUsU0FBUyxhQUFhLFlBQU07b0JBQ3hCLElBQUksT0FBSTt3QkFBRSxPQUFJO29CQUNkLFdBQVcsWUFBTTt3QkFDYixPQUFPOztvQkFFWCxHQUFHLHVEQUF1RCxZQUFNO3dCQUM1RCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sS0FBSyxhQUFhLEtBQUs7O29CQUVsQyxHQUFHLG9EQUFvRCxZQUFNO3dCQUN6RCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sS0FBSyxhQUFhLEtBQUs7O29CQUVsQyxHQUFHLHNEQUFzRCxZQUFNO3dCQUMzRCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsT0FBTyxpQkFBaUI7d0JBQ3hCLE9BQU8sS0FBSyxhQUFhLEtBQUs7Ozs7Z0JBSXRDLFNBQVMsWUFBWSxZQUFNO29CQUN2QixJQUFJLE9BQUk7d0JBQUUsT0FBSTtvQkFDZCxXQUFXLFlBQU07d0JBQ2IsT0FBTzs7b0JBRVgsR0FBRyx1REFBdUQsWUFBTTt3QkFDNUQsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUssWUFBWSxLQUFLOztvQkFFakMsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUssWUFBWSxLQUFLOztvQkFFakMsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLE9BQU8saUJBQWlCO3dCQUN4QixPQUFPLEtBQUssWUFBWSxLQUFLOzs7O2dCQUlyQyxTQUFTLGNBQWMsWUFBTTtvQkFDekIsSUFBSSxPQUFJO3dCQUFFLE9BQUk7b0JBQ2QsV0FBVyxZQUFNO3dCQUNiLE9BQU87O29CQUVYLEdBQUcsdURBQXVELFlBQU07d0JBQzVELFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixPQUFPLGlCQUFpQixNQUFNO3dCQUM5QixPQUFPLEtBQUssY0FBYyxLQUFLOztvQkFFbkMsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLE9BQU8saUJBQWlCLE1BQU07d0JBQzlCLE9BQU8sS0FBSyxjQUFjLEtBQUs7O29CQUVuQyxHQUFHLHNEQUFzRCxZQUFNO3dCQUMzRCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsT0FBTyxpQkFBaUIsTUFBTTt3QkFDOUIsT0FBTyxLQUFLLGNBQWMsS0FBSzs7b0JBRW5DLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixPQUFPLGlCQUFpQixNQUFNO3dCQUM5QixPQUFPLEtBQUssY0FBYyxLQUFLOzs7Ozs7R0E4QnhDIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQWRkaXRpb25hbENlcnRpZmljYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnQWRkaXRpb25hbENlcnRpZmljYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJHNjb3BlLCAkY29udHJvbGxlciwgJHEsIGNlcnRpZmljYXRpb25TZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsIHdvcmtJdGVtU2VydmljZSwgQ2VydGlmaWNhdGlvbkl0ZW0sXG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1cywgc3BNb2RhbCwgY2VydCwgaXNTaWduZWQsIGlzRWRpdGFibGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb250cm9sbGVyXywgXyRxXywgX0NlcnRpZmljYXRpb25JdGVtXywgX0NlcnRpZmljYXRpb25EZWNpc2lvblN0YXR1c18sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NlcnRpZmljYXRpb25TZXJ2aWNlXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIF93b3JrSXRlbVNlcnZpY2VfLCBfc3BNb2RhbF8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbiwgY2VydGlmaWNhdGlvblRlc3REYXRhKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcSA9IF8kcV87XG5cbiAgICAgICAgQ2VydGlmaWNhdGlvbkl0ZW0gPSBfQ2VydGlmaWNhdGlvbkl0ZW1fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdGF0dXMgPSBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzXztcblxuICAgICAgICBjZXJ0aWZpY2F0aW9uU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uU2VydmljZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICB3b3JrSXRlbVNlcnZpY2UgPSBfd29ya0l0ZW1TZXJ2aWNlXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgY2VydCA9IG5ldyBDZXJ0aWZpY2F0aW9uKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xuXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldERhdGFUYWJsZUNvbmZpZycpLmFuZC5yZXR1cm5WYWx1ZSh7XG4gICAgICAgICAgICBnZXRSZWZyZXNoVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHJlZnJlc2g6ICgpID0+IHt9IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdpbml0aWFsaXplJyk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2lzQ2VydGlmaWNhdGlvbkVkaXRhYmxlJykuYW5kLmNhbGxGYWtlKCgpID0+IGlzRWRpdGFibGUpO1xuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdpc1NpZ25lZE9mZicpLmFuZC5jYWxsRmFrZSgoKSA9PiBpc1NpZ25lZCk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHtvYmplY3Q6IGNlcnR9KSk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihpdGVtLCBoYXNXb3JraXRlbSkge1xuICAgICAgICBpdGVtLndvcmtJdGVtSWQgPSBoYXNXb3JraXRlbSA/IGNlcnQud29ya0l0ZW1JZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGN0cmwgPSAkY29udHJvbGxlcignQWRkaXRpb25hbENlcnRpZmljYXRpb25BY3Rpb25Db2x1bW5EaXJlY3RpdmVDdHJsJywge30sIHtpdGVtOiBpdGVtfSk7XG4gICAgICAgIGN0cmwucGFyZW50Q2VydGlmaWNhdGlvbiA9IGNlcnQ7XG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKCkge1xuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcbiAgICAgICAgICAgIGlkOiAnMTIzNCcsXG4gICAgICAgICAgICByb2xlTmFtZTogJ1JvbGUxJyxcbiAgICAgICAgICAgIGRlY2lzaW9uU3RhdHVzOiBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RhdHVzKHt9KSxcbiAgICAgICAgICAgIGNhbkNoYW5nZURlY2lzaW9uOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdmb3J3YXJkSXRlbScsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0sIGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gY3JlYXRlQ2VydGlmaWNhdGlvbkl0ZW0oKTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNob3cgZm9yd2FyZCBkaWFsb2cgYW5kIHJlZnJlc2ggdmlldycsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAnZm9yd2FyZENlcnRpZmljYXRpb24nKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICd1cGRhdGVDZXJ0aWZpY2F0aW9uJyk7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRJdGVtKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5mb3J3YXJkQ2VydGlmaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgbGV0IGFyZ3MgPSBjZXJ0aWZpY2F0aW9uU2VydmljZS5mb3J3YXJkQ2VydGlmaWNhdGlvbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcbiAgICAgICAgICAgIGV4cGVjdChhcmdzWzBdKS50b0VxdWFsKGN0cmwuaXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5pc0Z1bmN0aW9uKGFyZ3NbMV0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgY3RybC51cGRhdGVDZXJ0aWZpY2F0aW9uLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBhcmdzWzFdKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC51cGRhdGVDZXJ0aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc2NpbmQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtLCBjdHJsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKCk7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25TZXJ2aWNlLCAncmVzY2luZENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbigpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IGNvbmZpcm1hdGlvbiBkaWFsb2cgYW5kIGNhbGwgcmVzY2luZENlcnRpZmljYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuXG4gICAgICAgICAgICBjdHJsLnJlc2NpbmQoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwuY29uZmlybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLnJlc2NpbmRDZXJ0aWZpY2F0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0RGF0YVRhYmxlQ29uZmlnKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGNhbGwgcmVzY2luZENlcnRpZmljYXRpb24gaWYgY29uZmlybSBpcyBjYW5jZWxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgpKTtcblxuICAgICAgICAgICAgY3RybC5yZXNjaW5kKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLmNvbmZpcm0pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uU2VydmljZS5yZXNjaW5kQ2VydGlmaWNhdGlvbikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuaW5pdGlhbGl6ZSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZ2V0RGF0YVRhYmxlQ29uZmlnKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5SZXR1cm4nLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtLCBjdHJsO1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBwYXJlbnQgY2VydCBpcyBub3Qgc2lnbmVkIG9mZicsICgpID0+IHtcbiAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2FuUmV0dXJuKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBwYXJlbnQgY2VydCBpcyBzaWduZWQgb2ZmJywgKCkgPT4ge1xuICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhblJldHVybigpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHBhcmVudCBjZXJ0IGlzIG5vdCBlZGl0YWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0VkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhblJldHVybigpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuRW1haWwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtLCBjdHJsO1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0gPSBjcmVhdGVDZXJ0aWZpY2F0aW9uSXRlbSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBwYXJlbnQgY2VydCBpcyBub3Qgc2lnbmVkIG9mZicsICgpID0+IHtcbiAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2FuRW1haWwoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHBhcmVudCBjZXJ0IGlzIHNpZ25lZCBvZmYnLCAoKSA9PiB7XG4gICAgICAgICAgICBpc1NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2FuRW1haWwoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBwYXJlbnQgY2VydCBpcyBub3QgZWRpdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jYW5FbWFpbCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuRm9yd2FyZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0sIGN0cmw7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZUNlcnRpZmljYXRpb25JdGVtKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHBhcmVudCBjZXJ0IGlzIG5vdCBzaWduZWQgb2ZmJywgKCkgPT4ge1xuICAgICAgICAgICAgaXNTaWduZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlzRWRpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jYW5Gb3J3YXJkKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBwYXJlbnQgY2VydCBpcyBzaWduZWQgb2ZmJywgKCkgPT4ge1xuICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgaXNFZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhbkZvcndhcmQoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBwYXJlbnQgY2VydCBpcyBub3QgZWRpdGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgdHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jYW5Gb3J3YXJkKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlcmUgaXMgbm8gd29ya0l0ZW1JZCcsICgpID0+IHtcbiAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0sIGZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhbkZvcndhcmQoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
