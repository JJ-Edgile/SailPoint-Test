System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationRemediationDialogContext', function () {
                var CertificationRemediationDialogContext = undefined,
                    certificationDataService = undefined,
                    cert = undefined,
                    advice = undefined,
                    policyTree = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationRemediationDialogContext_, _certificationDataService_, certificationTestData, CertificationPolicyTreeNode) {
                    CertificationRemediationDialogContext = _CertificationRemediationDialogContext_;
                    certificationDataService = _certificationDataService_;

                    cert = angular.copy(certificationTestData.CERTIFICATION_1);
                    advice = angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT.advice);
                    policyTree = new CertificationPolicyTreeNode(angular.copy(certificationTestData.POLICY_TREE_NODE));
                    spyOn(certificationDataService, 'getCertification').and.returnValue(cert);
                }));

                describe('constructor', function () {
                    it('throws with no item', function () {
                        expect(function () {
                            return new CertificationRemediationDialogContext({});
                        }).toThrow();
                    });

                    it('initializes data', function () {
                        var item = { id: '1234' },
                            context = new CertificationRemediationDialogContext({}, item);
                        expect(context.item).toEqual(item);
                    });
                });

                describe('getRemediationSummary()', function () {
                    var certificationService = undefined;

                    beforeEach(inject(function (_certificationService_) {
                        certificationService = _certificationService_;
                    }));

                    it('calls certificationService to get the remdiation summary', function () {
                        var returnValue = 'test',
                            item = { id: 'item' },
                            context = new CertificationRemediationDialogContext({}, item),
                            roles = {},
                            entitlements = {};
                        spyOn(certificationService, 'getRemediationSummary').and.returnValue(returnValue);
                        expect(context.getRemediationSummary(roles, entitlements)).toEqual(returnValue);
                        expect(certificationService.getRemediationSummary).toHaveBeenCalledWith(cert.id, item.id, roles, entitlements);
                    });
                });

                describe('setupSoDRole()', function () {
                    function spyOnDecision(decision) {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue(decision);
                    }

                    it('sets the status on the role if there is a decision in the store', function () {
                        var status = 'Approved',
                            context = new CertificationRemediationDialogContext({}, {});
                        spyOnDecision({ status: status });
                        context.setupSoDRole(advice.leftRoles[0]);
                        expect(certificationDataService.decisions.getEffectiveDecision).toHaveBeenCalled();
                        expect(advice.leftRoles[0].status).toEqual(status);
                    });

                    it('does not look up the decision if the role does not have cert item id', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        spyOnDecision();
                        context.setupSoDRole(advice.rightRoles[0]);
                        expect(certificationDataService.decisions.getEffectiveDecision).not.toHaveBeenCalled();
                    });

                    it('returns false if not revoked', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        advice.leftRoles[0].status = 'Approved';
                        spyOnDecision();
                        expect(context.setupSoDRole(advice.leftRoles[0])).toEqual(false);
                    });

                    it('returns true if revoked', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        advice.leftRoles[0].status = 'Remediated';
                        spyOnDecision();
                        expect(context.setupSoDRole(advice.leftRoles[0])).toEqual(true);
                    });
                });

                describe('isSoDRoleEditable()', function () {
                    it('returns true if no existing status', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        expect(context.isSoDRoleEditable(advice.leftRoles[1])).toEqual(true);
                    });

                    it('returns false if existing status', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        expect(context.isSoDRoleEditable(advice.leftRoles[0])).toEqual(false);
                    });

                    it('returns true if existing status of Cleared', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        advice.leftRoles[0].status = 'Cleared';
                        expect(context.isSoDRoleEditable(advice.leftRoles[0])).toEqual(true);
                    });
                });

                describe('setupPolicyTreeLeaf()', function () {
                    beforeEach(function () {
                        spyOn(certificationDataService.decisions, 'getEffectiveDecision').and.returnValue({
                            status: 'Remediated'
                        });
                    });

                    it('sets the action on the status for decision in the store', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        context.setupPolicyTreeLeaf(policyTree.children[0]);
                        expect(certificationDataService.decisions.getEffectiveDecision).toHaveBeenCalled();
                        expect(policyTree.children[0].status[0].action).toEqual('Remediated');
                    });

                    it('does not look in the store if node does not have status', function () {
                        var context = new CertificationRemediationDialogContext({}, {});
                        context.setupPolicyTreeLeaf(policyTree.children[1]);
                        expect(certificationDataService.decisions.getEffectiveDecision).not.toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUzs7O0lBRzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMseUNBQXlDLFlBQU07Z0JBQ3BELElBQUksd0NBQXFDO29CQUFFLDJCQUF3QjtvQkFBRSxPQUFJO29CQUFFLFNBQU07b0JBQUUsYUFBVTs7Z0JBRTdGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHlDQUF5Qyw0QkFBNEIsdUJBQ3BFLDZCQUFnQztvQkFDaEQsd0NBQXdDO29CQUN4QywyQkFBMkI7O29CQUUzQixPQUFPLFFBQVEsS0FBSyxzQkFBc0I7b0JBQzFDLFNBQVMsUUFBUSxLQUFLLHNCQUFzQiwwQkFBMEI7b0JBQ3RFLGFBQWEsSUFBSSw0QkFBNEIsUUFBUSxLQUFLLHNCQUFzQjtvQkFDaEYsTUFBTSwwQkFBMEIsb0JBQW9CLElBQUksWUFBWTs7O2dCQUd4RSxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsT0FBTyxZQUFBOzRCQVVTLE9BVkgsSUFBSSxzQ0FBc0M7MkJBQUs7OztvQkFHaEUsR0FBRyxvQkFBb0IsWUFBTTt3QkFDekIsSUFBSSxPQUFPLEVBQUUsSUFBSTs0QkFDYixVQUFVLElBQUksc0NBQXNDLElBQUk7d0JBQzVELE9BQU8sUUFBUSxNQUFNLFFBQVE7Ozs7Z0JBSXJDLFNBQVMsMkJBQTJCLFlBQU07b0JBQ3RDLElBQUksdUJBQW9COztvQkFFeEIsV0FBVyxPQUFPLFVBQUMsd0JBQTBCO3dCQUN6Qyx1QkFBdUI7OztvQkFHM0IsR0FBSSw0REFBNEQsWUFBTTt3QkFDbEUsSUFBSSxjQUFjOzRCQUNkLE9BQU8sRUFBRSxJQUFJOzRCQUNiLFVBQVUsSUFBSSxzQ0FBc0MsSUFBSTs0QkFDeEQsUUFBUTs0QkFBSSxlQUFlO3dCQUMvQixNQUFNLHNCQUFzQix5QkFBeUIsSUFBSSxZQUFZO3dCQUNyRSxPQUFPLFFBQVEsc0JBQXNCLE9BQU8sZUFBZSxRQUFRO3dCQUNuRSxPQUFPLHFCQUFxQix1QkFDdkIscUJBQXFCLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTzs7OztnQkFLM0QsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsU0FBUyxjQUFjLFVBQVU7d0JBQzdCLE1BQU0seUJBQXlCLFdBQVcsd0JBQXdCLElBQUksWUFBWTs7O29CQUd0RixHQUFJLG1FQUFtRSxZQUFNO3dCQUN6RSxJQUFJLFNBQVM7NEJBQ1QsVUFBVSxJQUFJLHNDQUFzQyxJQUFJO3dCQUM1RCxjQUFjLEVBQUUsUUFBUTt3QkFDeEIsUUFBUSxhQUFhLE9BQU8sVUFBVTt3QkFDdEMsT0FBTyx5QkFBeUIsVUFBVSxzQkFBc0I7d0JBQ2hFLE9BQU8sT0FBTyxVQUFVLEdBQUcsUUFBUSxRQUFROzs7b0JBRy9DLEdBQUcsd0VBQXdFLFlBQU07d0JBQzdFLElBQUksVUFBVSxJQUFJLHNDQUFzQyxJQUFJO3dCQUM1RDt3QkFDQSxRQUFRLGFBQWEsT0FBTyxXQUFXO3dCQUN2QyxPQUFPLHlCQUF5QixVQUFVLHNCQUFzQixJQUFJOzs7b0JBR3hFLEdBQUcsZ0NBQWdDLFlBQU07d0JBQ3JDLElBQUksVUFBVSxJQUFJLHNDQUFzQyxJQUFJO3dCQUM1RCxPQUFPLFVBQVUsR0FBRyxTQUFTO3dCQUM3Qjt3QkFDQSxPQUFPLFFBQVEsYUFBYSxPQUFPLFVBQVUsS0FBSyxRQUFROzs7b0JBRzlELEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLElBQUksVUFBVSxJQUFJLHNDQUFzQyxJQUFJO3dCQUM1RCxPQUFPLFVBQVUsR0FBRyxTQUFTO3dCQUM3Qjt3QkFDQSxPQUFPLFFBQVEsYUFBYSxPQUFPLFVBQVUsS0FBSyxRQUFROzs7O2dCQUlsRSxTQUFTLHVCQUF1QixZQUFNO29CQUNsQyxHQUFHLHNDQUFzQyxZQUFNO3dCQUMzQyxJQUFJLFVBQVUsSUFBSSxzQ0FBc0MsSUFBSTt3QkFDNUQsT0FBTyxRQUFRLGtCQUFrQixPQUFPLFVBQVUsS0FBSyxRQUFROzs7b0JBR25FLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLElBQUksVUFBVSxJQUFJLHNDQUFzQyxJQUFJO3dCQUM1RCxPQUFPLFFBQVEsa0JBQWtCLE9BQU8sVUFBVSxLQUFLLFFBQVE7OztvQkFHbkUsR0FBRyw4Q0FBOEMsWUFBTTt3QkFDbkQsSUFBSSxVQUFVLElBQUksc0NBQXNDLElBQUk7d0JBQzVELE9BQU8sVUFBVSxHQUFHLFNBQVM7d0JBQzdCLE9BQU8sUUFBUSxrQkFBa0IsT0FBTyxVQUFVLEtBQUssUUFBUTs7OztnQkFJdkUsU0FBUyx5QkFBeUIsWUFBTTtvQkFDcEMsV0FBVyxZQUFNO3dCQUNiLE1BQU0seUJBQXlCLFdBQVcsd0JBQXdCLElBQUksWUFBWTs0QkFDOUUsUUFBUTs7OztvQkFJaEIsR0FBRywyREFBMkQsWUFBTTt3QkFDaEUsSUFBSSxVQUFVLElBQUksc0NBQXNDLElBQUk7d0JBQzVELFFBQVEsb0JBQW9CLFdBQVcsU0FBUzt3QkFDaEQsT0FBTyx5QkFBeUIsVUFBVSxzQkFBc0I7d0JBQ2hFLE9BQU8sV0FBVyxTQUFTLEdBQUcsT0FBTyxHQUFHLFFBQVEsUUFBUTs7O29CQUc1RCxHQUFHLDJEQUEyRCxZQUFNO3dCQUNoRSxJQUFJLFVBQVUsSUFBSSxzQ0FBc0MsSUFBSTt3QkFDNUQsUUFBUSxvQkFBb0IsV0FBVyxTQUFTO3dCQUNoRCxPQUFPLHlCQUF5QixVQUFVLHNCQUFzQixJQUFJOzs7Ozs7R0FnQjdFIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQnLCAoKSA9PiB7XG4gICAgbGV0IENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQsIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgY2VydCwgYWR2aWNlLCBwb2xpY3lUcmVlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9DZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0XywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8sIGNlcnRpZmljYXRpb25UZXN0RGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZSkgPT4ge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0ID0gX0NlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHRfO1xuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXztcblxuICAgICAgICBjZXJ0ID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUSUZJQ0FUSU9OXzEpO1xuICAgICAgICBhZHZpY2UgPSBhbmd1bGFyLmNvcHkoY2VydGlmaWNhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQuYWR2aWNlKTtcbiAgICAgICAgcG9saWN5VHJlZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5QT0xJQ1lfVFJFRV9OT0RFKSk7XG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb24nKS5hbmQucmV0dXJuVmFsdWUoY2VydCk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gaXRlbScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHsgaWQ6ICcxMjM0JyB9LFxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwgaXRlbSk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5pdGVtKS50b0VxdWFsKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZW1lZGlhdGlvblN1bW1hcnkoKScsICgpID0+IHtcbiAgICAgICAgbGV0IGNlcnRpZmljYXRpb25TZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvblNlcnZpY2VfKT0+IHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25TZXJ2aWNlID0gX2NlcnRpZmljYXRpb25TZXJ2aWNlXztcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0ICgnY2FsbHMgY2VydGlmaWNhdGlvblNlcnZpY2UgdG8gZ2V0IHRoZSByZW1kaWF0aW9uIHN1bW1hcnknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSAndGVzdCcsXG4gICAgICAgICAgICAgICAgaXRlbSA9IHsgaWQ6ICdpdGVtJyB9LFxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwgaXRlbSksXG4gICAgICAgICAgICAgICAgcm9sZXMgPSB7fSwgZW50aXRsZW1lbnRzID0ge307XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uU2VydmljZSwgJ2dldFJlbWVkaWF0aW9uU3VtbWFyeScpLmFuZC5yZXR1cm5WYWx1ZShyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5nZXRSZW1lZGlhdGlvblN1bW1hcnkocm9sZXMsIGVudGl0bGVtZW50cykpLnRvRXF1YWwocmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25TZXJ2aWNlLmdldFJlbWVkaWF0aW9uU3VtbWFyeSlcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgaXRlbS5pZCwgcm9sZXMsIGVudGl0bGVtZW50cyk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0dXBTb0RSb2xlKCknLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHNweU9uRGVjaXNpb24oZGVjaXNpb24pIHtcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMsICdnZXRFZmZlY3RpdmVEZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZShkZWNpc2lvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpdCAoJ3NldHMgdGhlIHN0YXR1cyBvbiB0aGUgcm9sZSBpZiB0aGVyZSBpcyBhIGRlY2lzaW9uIGluIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSAnQXBwcm92ZWQnLFxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwge30pO1xuICAgICAgICAgICAgc3B5T25EZWNpc2lvbih7IHN0YXR1czogc3RhdHVzfSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldHVwU29EUm9sZShhZHZpY2UubGVmdFJvbGVzWzBdKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldEVmZmVjdGl2ZURlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYWR2aWNlLmxlZnRSb2xlc1swXS5zdGF0dXMpLnRvRXF1YWwoc3RhdHVzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGxvb2sgdXAgdGhlIGRlY2lzaW9uIGlmIHRoZSByb2xlIGRvZXMgbm90IGhhdmUgY2VydCBpdGVtIGlkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwge30pO1xuICAgICAgICAgICAgc3B5T25EZWNpc2lvbigpO1xuICAgICAgICAgICAgY29udGV4dC5zZXR1cFNvRFJvbGUoYWR2aWNlLnJpZ2h0Um9sZXNbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbnMuZ2V0RWZmZWN0aXZlRGVjaXNpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCByZXZva2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwge30pO1xuICAgICAgICAgICAgYWR2aWNlLmxlZnRSb2xlc1swXS5zdGF0dXMgPSAnQXBwcm92ZWQnO1xuICAgICAgICAgICAgc3B5T25EZWNpc2lvbigpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuc2V0dXBTb0RSb2xlKGFkdmljZS5sZWZ0Um9sZXNbMF0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiByZXZva2VkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwge30pO1xuICAgICAgICAgICAgYWR2aWNlLmxlZnRSb2xlc1swXS5zdGF0dXMgPSAnUmVtZWRpYXRlZCc7XG4gICAgICAgICAgICBzcHlPbkRlY2lzaW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoY29udGV4dC5zZXR1cFNvRFJvbGUoYWR2aWNlLmxlZnRSb2xlc1swXSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU29EUm9sZUVkaXRhYmxlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbm8gZXhpc3Rpbmcgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSwge30pO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuaXNTb0RSb2xlRWRpdGFibGUoYWR2aWNlLmxlZnRSb2xlc1sxXSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGV4aXN0aW5nIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gbmV3IENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoe30sIHt9KTtcbiAgICAgICAgICAgIGV4cGVjdChjb250ZXh0LmlzU29EUm9sZUVkaXRhYmxlKGFkdmljZS5sZWZ0Um9sZXNbMF0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBleGlzdGluZyBzdGF0dXMgb2YgQ2xlYXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gbmV3IENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoe30sIHt9KTtcbiAgICAgICAgICAgIGFkdmljZS5sZWZ0Um9sZXNbMF0uc3RhdHVzID0gJ0NsZWFyZWQnO1xuICAgICAgICAgICAgZXhwZWN0KGNvbnRleHQuaXNTb0RSb2xlRWRpdGFibGUoYWR2aWNlLmxlZnRSb2xlc1swXSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NldHVwUG9saWN5VHJlZUxlYWYoKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogJ1JlbWVkaWF0ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGFjdGlvbiBvbiB0aGUgc3RhdHVzIGZvciBkZWNpc2lvbiBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IG5ldyBDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KHt9LCB7fSk7XG4gICAgICAgICAgICBjb250ZXh0LnNldHVwUG9saWN5VHJlZUxlYWYocG9saWN5VHJlZS5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucy5nZXRFZmZlY3RpdmVEZWNpc2lvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHBvbGljeVRyZWUuY2hpbGRyZW5bMF0uc3RhdHVzWzBdLmFjdGlvbikudG9FcXVhbCgnUmVtZWRpYXRlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgbG9vayBpbiB0aGUgc3RvcmUgaWYgbm9kZSBkb2VzIG5vdCBoYXZlIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gbmV3IENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQoe30sIHt9KTtcbiAgICAgICAgICAgIGNvbnRleHQuc2V0dXBQb2xpY3lUcmVlTGVhZihwb2xpY3lUcmVlLmNoaWxkcmVuWzFdKTtcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLmdldEVmZmVjdGl2ZURlY2lzaW9uKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
