System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/CertificationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationCertificationTestData) {}],
        execute: function () {

            describe('RoleSoDRevocationStepHandler', function () {

                var RoleSoDRevocationStepHandler = undefined,
                    SoDRole = undefined,
                    advice = undefined,
                    $rootScope = undefined,
                    certificationDataService = undefined,
                    dialogContext = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_RoleSoDRevocationStepHandler_, _SoDRole_, certificationTestData, RemediationAdvice, _$rootScope_, _certificationDataService_, RemediationDialogContext) {
                    RoleSoDRevocationStepHandler = _RoleSoDRevocationStepHandler_;
                    SoDRole = _SoDRole_;
                    advice = new RemediationAdvice(certificationTestData.REMEDIATION_ADVICE_RESULT.advice);
                    $rootScope = _$rootScope_;
                    certificationDataService = _certificationDataService_;
                    dialogContext = new RemediationDialogContext({});
                }));

                describe('constructor', function () {
                    it('throws without advice', function () {
                        expect(function () {
                            new RoleSoDRevocationStepHandler(dialogContext, undefined);
                        }).toThrow();
                    });

                    it('throws without dialogContext', function () {
                        expect(function () {
                            new RoleSoDRevocationStepHandler(undefined, advice);
                        }).toThrow();
                    });

                    it('pulls data off the advice', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice);
                        expect(stepHandler.violationConstraint).toEqual(advice.violationConstraint);
                        expect(stepHandler.violationSummary).toEqual(advice.violationSummary);
                    });
                });

                describe('roles map', function () {
                    it('creates array of objects for left and right roles', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice),
                            testRoleSide = function (roleSide, expectedLabel, expectedRoles) {
                            expect(roleSide).toBeDefined();
                            expect(roleSide.label).toEqual(expectedLabel);
                            expect(roleSide.roles).toEqual(expectedRoles);
                        };
                        expect(stepHandler.roleSides).toBeDefined();
                        testRoleSide(stepHandler.roleSides[0], 'ui_violation_conflicting_roles', advice.leftRoles);
                        testRoleSide(stepHandler.roleSides[1], 'ui_violation_original_roles', advice.rightRoles);
                    });

                    it('calls dialogContext.setupSoDRole for each role', function () {
                        // Toggle all the left roles
                        spyOn(dialogContext, 'setupSoDRole').and.callFake(function (role) {
                            return advice.leftRoles.indexOf(role) > -1;
                        });
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice),
                            testSetupSoDRole = function (roles, toggled) {
                            roles.forEach(function (role) {
                                expect(stepHandler.dialogContext.setupSoDRole).toHaveBeenCalledWith(role);
                                expect(stepHandler.isSelected(role)).toEqual(toggled);
                            });
                        };
                        testSetupSoDRole(advice.leftRoles, true);
                        testSetupSoDRole(advice.rightRoles, false);
                    });

                    it('toggles selection of previously selected roles', function () {
                        var selectedRoles = ['right1Name'],
                            stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice, selectedRoles);
                        expect(stepHandler.isSelected(advice.rightRoles[0])).toEqual(true);
                    });
                });

                describe('isSaveDisabled()', function () {
                    it('returns true if no roles selected', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice);
                        stepHandler.selectedRoles.clear();
                        expect(stepHandler.isSaveDisabled()).toEqual(true);
                    });

                    it('returns false if a role is selected', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice);
                        stepHandler.selectedRoles.clear();
                        stepHandler.toggle(advice.rightRoles[0]);
                        expect(stepHandler.isSaveDisabled()).toEqual(false);
                    });
                });

                describe('save()', function () {
                    it('resolves with selected role names', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice),
                            saveResult = undefined;
                        stepHandler.selectedRoles.clear();
                        stepHandler.toggle(advice.rightRoles[0]);
                        stepHandler.toggle(advice.leftRoles[0]);
                        stepHandler.save().then(function (result) {
                            saveResult = result;
                        });
                        $rootScope.$apply();
                        expect(saveResult).toBeDefined();
                        expect(saveResult.revokedRoles).toBeDefined();
                        expect(saveResult.revokedRoles).toContain(advice.rightRoles[0].name);
                        expect(saveResult.revokedRoles).toContain(advice.leftRoles[0].name);
                        expect(saveResult.revokedRoles).not.toContain(advice.leftRoles[1].name);
                    });
                });

                describe('isEditable()', function () {
                    it('calls through and returns value of dialogContext.isSoDRoleEditable', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice),
                            role = advice.leftRoles[1];
                        spyOn(stepHandler.dialogContext, 'isSoDRoleEditable').and.returnValue(true);
                        expect(stepHandler.isEditable(role)).toEqual(true);
                        expect(stepHandler.dialogContext.isSoDRoleEditable).toHaveBeenCalledWith(role);
                    });
                });

                describe('toggle()', function () {
                    it('adds role to selections if not already selected', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice);
                        stepHandler.selectedRoles.clear();
                        stepHandler.toggle(advice.leftRoles[0]);
                        expect(stepHandler.isSelected(advice.leftRoles[0])).toEqual(true);
                    });

                    it('removes role from selection if selected', function () {
                        var stepHandler = new RoleSoDRevocationStepHandler(dialogContext, advice);
                        stepHandler.selectedRoles.clear();
                        stepHandler.toggle(advice.leftRoles[0]);
                        stepHandler.toggle(advice.leftRoles[0]);
                        expect(stepHandler.isSelected(advice.leftRoles[0])).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9Sb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxnREFBZ0QsVUFBVSxTQUFTOzs7SUFHaEo7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsMkNBQTJDO1FBQ3hELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxnQ0FBZ0MsWUFBTTs7Z0JBRTNDLElBQUksK0JBQTRCO29CQUFFLFVBQU87b0JBQUUsU0FBTTtvQkFBRSxhQUFVO29CQUFFLDJCQUF3QjtvQkFBRSxnQkFBYTs7Z0JBRXRHLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxnQ0FBZ0MsV0FBVyx1QkFBdUIsbUJBQ2xFLGNBQWMsNEJBQTRCLDBCQUE2QjtvQkFDdEYsK0JBQStCO29CQUMvQixVQUFVO29CQUNWLFNBQVMsSUFBSSxrQkFBa0Isc0JBQXNCLDBCQUEwQjtvQkFDL0UsYUFBYTtvQkFDYiwyQkFBMkI7b0JBQzNCLGdCQUFnQixJQUFJLHlCQUF5Qjs7O2dCQUdqRCxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFNOzRCQUFFLElBQUksNkJBQTZCLGVBQWU7MkJBQWU7OztvQkFHbEYsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsT0FBTyxZQUFNOzRCQUFFLElBQUksNkJBQTZCLFdBQVc7MkJBQVk7OztvQkFHM0UsR0FBRyw2QkFBNkIsWUFBTTt3QkFDbEMsSUFBSSxjQUFjLElBQUksNkJBQTZCLGVBQWU7d0JBQ2xFLE9BQU8sWUFBWSxxQkFBcUIsUUFBUSxPQUFPO3dCQUN2RCxPQUFPLFlBQVksa0JBQWtCLFFBQVEsT0FBTzs7OztnQkFJNUQsU0FBUyxhQUFh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NkIsZUFBZTt3QkFDbEUsWUFBWSxjQUFjO3dCQUMxQixZQUFZLE9BQU8sT0FBTyxVQUFVO3dCQUNwQyxZQUFZLE9BQU8sT0FBTyxVQUFVO3dCQUNwQyxPQUFPLFlBQVksV0FBVyxPQUFPLFVBQVUsS0FBSyxRQUFROzs7Ozs7R0FxQnJFIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9Sb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1JvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXInLCAoKSA9PiB7XG5cbiAgICBsZXQgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlciwgU29EUm9sZSwgYWR2aWNlLCAkcm9vdFNjb3BlLCBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsIGRpYWxvZ0NvbnRleHQ7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Sb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXywgX1NvRFJvbGVfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIFJlbWVkaWF0aW9uQWR2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICBfJHJvb3RTY29wZV8sIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfLCBSZW1lZGlhdGlvbkRpYWxvZ0NvbnRleHQpID0+IHtcbiAgICAgICAgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlciA9IF9Sb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXztcbiAgICAgICAgU29EUm9sZSA9IF9Tb0RSb2xlXztcbiAgICAgICAgYWR2aWNlID0gbmV3IFJlbWVkaWF0aW9uQWR2aWNlKGNlcnRpZmljYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULmFkdmljZSk7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfO1xuICAgICAgICBkaWFsb2dDb250ZXh0ID0gbmV3IFJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgYWR2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgdW5kZWZpbmVkKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgZGlhbG9nQ29udGV4dCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG5ldyBSb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKHVuZGVmaW5lZCwgYWR2aWNlKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncHVsbHMgZGF0YSBvZmYgdGhlIGFkdmljZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKGRpYWxvZ0NvbnRleHQsIGFkdmljZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIudmlvbGF0aW9uQ29uc3RyYWludCkudG9FcXVhbChhZHZpY2UudmlvbGF0aW9uQ29uc3RyYWludCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIudmlvbGF0aW9uU3VtbWFyeSkudG9FcXVhbChhZHZpY2UudmlvbGF0aW9uU3VtbWFyeSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JvbGVzIG1hcCcsICgpID0+IHtcbiAgICAgICAgaXQoJ2NyZWF0ZXMgYXJyYXkgb2Ygb2JqZWN0cyBmb3IgbGVmdCBhbmQgcmlnaHQgcm9sZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UpLFxuICAgICAgICAgICAgICAgIHRlc3RSb2xlU2lkZSA9IGZ1bmN0aW9uKHJvbGVTaWRlLCBleHBlY3RlZExhYmVsLCBleHBlY3RlZFJvbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyb2xlU2lkZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJvbGVTaWRlLmxhYmVsKS50b0VxdWFsKGV4cGVjdGVkTGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3Qocm9sZVNpZGUucm9sZXMpLnRvRXF1YWwoZXhwZWN0ZWRSb2xlcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5yb2xlU2lkZXMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICB0ZXN0Um9sZVNpZGUoc3RlcEhhbmRsZXIucm9sZVNpZGVzWzBdLCAndWlfdmlvbGF0aW9uX2NvbmZsaWN0aW5nX3JvbGVzJywgYWR2aWNlLmxlZnRSb2xlcyk7XG4gICAgICAgICAgICB0ZXN0Um9sZVNpZGUoc3RlcEhhbmRsZXIucm9sZVNpZGVzWzFdLCAndWlfdmlvbGF0aW9uX29yaWdpbmFsX3JvbGVzJywgYWR2aWNlLnJpZ2h0Um9sZXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgZGlhbG9nQ29udGV4dC5zZXR1cFNvRFJvbGUgZm9yIGVhY2ggcm9sZScsICgpID0+IHtcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBhbGwgdGhlIGxlZnQgcm9sZXNcbiAgICAgICAgICAgIHNweU9uKGRpYWxvZ0NvbnRleHQsICdzZXR1cFNvRFJvbGUnKS5hbmQuY2FsbEZha2UoKHJvbGUpID0+IGFkdmljZS5sZWZ0Um9sZXMuaW5kZXhPZihyb2xlKSA+IC0xKTtcbiAgICAgICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBSb2xlU29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKGRpYWxvZ0NvbnRleHQsIGFkdmljZSksXG4gICAgICAgICAgICAgICAgdGVzdFNldHVwU29EUm9sZSA9IChyb2xlcywgdG9nZ2xlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByb2xlcy5mb3JFYWNoKChyb2xlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuZGlhbG9nQ29udGV4dC5zZXR1cFNvRFJvbGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2VsZWN0ZWQocm9sZSkpLnRvRXF1YWwodG9nZ2xlZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZXN0U2V0dXBTb0RSb2xlKGFkdmljZS5sZWZ0Um9sZXMsIHRydWUpO1xuICAgICAgICAgICAgdGVzdFNldHVwU29EUm9sZShhZHZpY2UucmlnaHRSb2xlcywgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndG9nZ2xlcyBzZWxlY3Rpb24gb2YgcHJldmlvdXNseSBzZWxlY3RlZCByb2xlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFJvbGVzID0gWydyaWdodDFOYW1lJ10sXG4gICAgICAgICAgICAgICAgc3RlcEhhbmRsZXIgPSBuZXcgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UsIHNlbGVjdGVkUm9sZXMpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2VsZWN0ZWQoYWR2aWNlLnJpZ2h0Um9sZXNbMF0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1NhdmVEaXNhYmxlZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5vIHJvbGVzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgYWR2aWNlKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnNlbGVjdGVkUm9sZXMuY2xlYXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhIHJvbGUgaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIuc2VsZWN0ZWRSb2xlcy5jbGVhcigpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIudG9nZ2xlKGFkdmljZS5yaWdodFJvbGVzWzBdKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2F2ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVzb2x2ZXMgd2l0aCBzZWxlY3RlZCByb2xlIG5hbWVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgYWR2aWNlKSxcbiAgICAgICAgICAgICAgICBzYXZlUmVzdWx0O1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIuc2VsZWN0ZWRSb2xlcy5jbGVhcigpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIudG9nZ2xlKGFkdmljZS5yaWdodFJvbGVzWzBdKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnRvZ2dsZShhZHZpY2UubGVmdFJvbGVzWzBdKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnNhdmUoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNhdmVSZXN1bHQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2F2ZVJlc3VsdC5yZXZva2VkUm9sZXMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2F2ZVJlc3VsdC5yZXZva2VkUm9sZXMpLnRvQ29udGFpbihhZHZpY2UucmlnaHRSb2xlc1swXS5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChzYXZlUmVzdWx0LnJldm9rZWRSb2xlcykudG9Db250YWluKGFkdmljZS5sZWZ0Um9sZXNbMF0ubmFtZSk7XG4gICAgICAgICAgICBleHBlY3Qoc2F2ZVJlc3VsdC5yZXZva2VkUm9sZXMpLm5vdC50b0NvbnRhaW4oYWR2aWNlLmxlZnRSb2xlc1sxXS5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNFZGl0YWJsZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCBhbmQgcmV0dXJucyB2YWx1ZSBvZiBkaWFsb2dDb250ZXh0LmlzU29EUm9sZUVkaXRhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgYWR2aWNlKSxcbiAgICAgICAgICAgICAgICByb2xlID0gYWR2aWNlLmxlZnRSb2xlc1sxXTtcbiAgICAgICAgICAgIHNweU9uKHN0ZXBIYW5kbGVyLmRpYWxvZ0NvbnRleHQsICdpc1NvRFJvbGVFZGl0YWJsZScpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc0VkaXRhYmxlKHJvbGUpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmRpYWxvZ0NvbnRleHQuaXNTb0RSb2xlRWRpdGFibGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHJvbGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0b2dnbGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2FkZHMgcm9sZSB0byBzZWxlY3Rpb25zIGlmIG5vdCBhbHJlYWR5IHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IFJvbGVTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgYWR2aWNlKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnNlbGVjdGVkUm9sZXMuY2xlYXIoKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnRvZ2dsZShhZHZpY2UubGVmdFJvbGVzWzBdKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NlbGVjdGVkKGFkdmljZS5sZWZ0Um9sZXNbMF0pKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIHJvbGUgZnJvbSBzZWxlY3Rpb24gaWYgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgUm9sZVNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIuc2VsZWN0ZWRSb2xlcy5jbGVhcigpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIudG9nZ2xlKGFkdmljZS5sZWZ0Um9sZXNbMF0pO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIudG9nZ2xlKGFkdmljZS5sZWZ0Um9sZXNbMF0pO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2VsZWN0ZWQoYWR2aWNlLmxlZnRSb2xlc1swXSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
