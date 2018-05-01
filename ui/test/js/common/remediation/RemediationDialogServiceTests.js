System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', './RemediationTestData', 'SailPointHelpers'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule, expectReject;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}, function (_SailPointHelpers) {
            expectReject = _SailPointHelpers.expectReject;
        }],
        execute: function () {

            describe('remediationDialogService', function () {
                var $q = undefined,
                    spModal = undefined,
                    remediationDialogService = undefined,
                    $scope = undefined,
                    remediationTestData = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_$q_, _spModal_, _remediationDialogService_, _$rootScope_, _remediationTestData_) {
                    $q = _$q_;
                    spModal = _spModal_;
                    remediationDialogService = _remediationDialogService_;
                    $scope = _$rootScope_;
                    remediationTestData = _remediationTestData_;
                }));

                describe('showRevocationDialog()', function () {
                    var remediationAdvice = undefined,
                        remediationSummary = undefined,
                        dialogContext = undefined,
                        dialogResult = undefined;

                    beforeEach(inject(function (_RemediationAdvice_, _RemediationSummary_, RemediationDialogResult, RemediationDialogContext) {
                        remediationAdvice = new _RemediationAdvice_(angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.advice));
                        remediationSummary = new _RemediationSummary_(angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.advice));

                        dialogContext = new RemediationDialogContext();
                        dialogResult = new RemediationDialogResult({
                            comments: 'a b c d'
                        });
                    }));

                    function spyOnModal(reject) {
                        spyOn(spModal, 'open').and.callFake(function () {
                            return {
                                result: reject ? $q.reject() : $q.when(dialogResult)
                            };
                        });
                    }

                    function testModal(expectedModalCall) {
                        spyOnModal();
                        remediationDialogService.showRevocationDialog(remediationAdvice, remediationSummary, dialogContext).then(function (resolveResult) {
                            if (expectedModalCall) {
                                expect(resolveResult).toEqual(dialogResult);
                            } else {
                                expect(resolveResult).not.toBeDefined();
                            }
                        });
                        $scope.$apply();
                        if (expectedModalCall) {
                            expect(spModal.open).toHaveBeenCalled();
                        } else {
                            expect(spModal.open).not.toHaveBeenCalled();
                        }
                    }

                    function setupSummary(requiresRecipient, isModifiable, hasDetails) {
                        spyOn(remediationSummary, 'requiresRecipientSelection').and.returnValue(requiresRecipient);
                        spyOn(remediationSummary, 'isModifiable').and.returnValue(isModifiable);
                        spyOn(remediationSummary, 'hasRoleRevocationDetails').and.returnValue(hasDetails);
                    }

                    it('throws without dialog context', function () {
                        expect(function () {
                            return remediationDialogService.showRevocationDialog(remediationAdvice, remediationSummary);
                        }).toThrow();
                    });

                    it('resolves without opening modal if summary is defined without requiring recipient selection, revocation' + 'modification or role revocation details', function () {

                        setupSummary(false, false, false);
                        testModal(false);
                    });

                    it('resolves without opening modal if summary is defined without requiring recipient selection, revocation' + 'modification, but with role revocation details with existing result', function () {
                        setupSummary(false, false, true);
                        // Even with role revocation details dont open because there is an existing result
                        dialogContext.existingResult = {};
                        testModal(false);
                    });

                    it('opens modal if recipient selection is required', function () {
                        setupSummary(true, false, false);
                        testModal(true);
                    });

                    it('opens modal if revocation modifiable', function () {
                        setupSummary(false, true, false);
                        testModal(true);
                    });

                    it('opens modal if role revocation details modifiable', function () {
                        setupSummary(false, false, true);
                        testModal(true);
                    });

                    it('opens modal if no summary', function () {
                        remediationSummary = undefined;
                        testModal(true);
                    });

                    function testModalSize(isEntitlementSoD, expectedSize) {
                        // Give this entitlements to remediate for an SoD.
                        if (isEntitlementSoD) {
                            remediationAdvice.entitlementsToRemediate = remediationTestData.POLICY_TREE_NODE;
                        }
                        spyOnModal(true);
                        remediationDialogService.showRevocationDialog(remediationAdvice, remediationSummary, dialogContext)['catch'](expectReject);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                        var modalConfig = spModal.open.calls.mostRecent().args[0];
                        expect(modalConfig.size).toEqual(expectedSize);
                    }

                    it('opens a large modal for entitlement SoD', function () {
                        testModalSize(true, 'lg');
                    });

                    it('opens a normal size modal for non-entitlement SoD', function () {
                        testModalSize(false, undefined);
                    });

                    it('returns rejected promise if dialog is canceled', function () {
                        var rejected = undefined;
                        spyOnModal(true);
                        remediationDialogService.showRevocationDialog(remediationAdvice, remediationSummary, dialogContext).then(function () {
                            return rejected = false;
                        })['catch'](function () {
                            return rejected = true;
                        });
                        $scope.$apply();
                        expect(rejected).toEqual(true);
                    });

                    it('returns rejected promise if dialog is resolved but readOnly is true', function () {
                        var rejected = undefined;
                        dialogContext.readOnly = true;
                        spyOnModal(false);
                        remediationDialogService.showRevocationDialog(remediationAdvice, remediationSummary, dialogContext).then(function () {
                            return rejected = false;
                        })['catch'](function () {
                            return rejected = true;
                        });
                        $scope.$apply();
                        expect(rejected).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLHlCQUF5QixxQkFBcUIsVUFBVSxTQUFTOzs7SUFHako7O0lBRUEsSUFBSSxtQkFBbUI7SUFDdkIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxzQkFBc0IsSUFBSSxVQUFVLG1CQUFtQjtZQUNoRSxlQUFlLGtCQUxuQjs7UUFPQSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNEJBQTRCLFlBQU07Z0JBQ3ZDLElBQUksS0FBRTtvQkFBRSxVQUFPO29CQUFFLDJCQUF3QjtvQkFBRSxTQUFNO29CQUFFLHNCQUFtQjs7Z0JBRXRFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLE1BQU0sV0FBVyw0QkFBNEIsY0FBYyx1QkFBMEI7b0JBQ3BHLEtBQUs7b0JBQ0wsVUFBVTtvQkFDViwyQkFBMkI7b0JBQzNCLFNBQVM7b0JBQ1Qsc0JBQXNCOzs7Z0JBRzFCLFNBQVMsMEJBQTBCLFlBQU07b0JBQ3JDLElBQUksb0JBQWlCO3dCQUFFLHFCQUFrQjt3QkFBRSxnQkFBYTt3QkFBRSxlQUFZOztvQkFFdEUsV0FBVyxPQUFPLFVBQUMscUJBQXFCLHNCQUNyQix5QkFBeUIsMEJBQTZCO3dCQUNyRSxvQkFBb0IsSUFBSSxvQkFDcEIsUUFBUSxLQUFLLG9CQUFvQiwwQkFBMEI7d0JBRS9ELHFCQUFxQixJQUFJLHFCQUNyQixRQUFRLEtBQUssb0JBQW9CLDBCQUEwQjs7d0JBRy9ELGdCQUFnQixJQUFJO3dCQUNwQixlQUFlLElBQUksd0JBQXdCOzRCQUN2QyxVQUFVOzs7O29CQUlsQixTQUFTLFdBQVcsUUFBUTt3QkFDeEIsTUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTLFlBQU07NEJBQ3RDLE9BQU87Z0NBQ0gsUUFBUSxTQUFXLEdBQUcsV0FBVyxHQUFHLEtBQUs7Ozs7O29CQUtyRCxTQUFTLFVBQVUsbUJBQW1CO3dCQUNsQzt3QkFDQSx5QkFBeUIscUJBQXFCLG1CQUFtQixvQkFBb0IsZUFDaEYsS0FBSyxVQUFDLGVBQWtCOzRCQUNyQixJQUFJLG1CQUFtQjtnQ0FDbkIsT0FBTyxlQUFlLFFBQVE7bUNBQzNCO2dDQUNILE9BQU8sZUFBZSxJQUFJOzs7d0JBR3RDLE9BQU87d0JBQ1AsSUFBSSxtQkFBbUI7NEJBQ25CLE9BQU8sUUFBUSxNQUFNOytCQUNsQjs0QkFDSCxPQUFPLFFBQVEsTUFBTSxJQUFJOzs7O29CQUlqQyxTQUFTLGFBQWEsbUJBQW1CLGNBQWMsWUFBWTt3QkFDL0QsTUFBTSxvQkFBb0IsOEJBQThCLElBQUksWUFBWTt3QkFDeEUsTUFBTSxvQkFBb0IsZ0JBQWdCLElBQUksWUFBWTt3QkFDMUQsTUFBTSxvQkFBb0IsNEJBQTRCLElBQUksWUFBWTs7O29CQUcxRSxHQUFHLGlDQUFpQyxZQUFNO3dCQUN0QyxPQUFPLFlBQUE7NEJBU1MsT0FSWix5QkFBeUIscUJBQXFCLG1CQUFtQjsyQkFBcUI7OztvQkFHOUYsR0FBRywyR0FDQywyQ0FBMkMsWUFBTTs7d0JBRWpELGFBQWEsT0FBTyxPQUFPO3dCQUMzQixVQUFVOzs7b0JBR2QsR0FBRywyR0FDQyx1RUFBdUUsWUFBTTt3QkFDN0UsYUFBYSxPQUFPLE9BQU87O3dCQUUzQixjQUFjLGlCQUFpQjt3QkFDL0IsVUFBVTs7O29CQUdkLEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELGFBQWEsTUFBTSxPQUFPO3dCQUMxQixVQUFVOzs7b0JBR2QsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsYUFBYSxPQUFPLE1BQU07d0JBQzFCLFVBQVU7OztvQkFHZCxHQUFHLHFEQUFxRCxZQUFNO3dCQUMxRCxhQUFhLE9BQU8sT0FBTzt3QkFDM0IsVUFBVTs7O29CQUlkLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLHFCQUFxQjt3QkFDckIsVUFBVTs7O29CQUdkLFNBQVMsY0FBYyxrQkFBa0IsY0FBYzs7d0JBRW5ELElBQUksa0JBQWtCOzRCQUNsQixrQkFBa0IsMEJBQTBCLG9CQUFvQjs7d0JBRXBFLFdBQVc7d0JBQ1gseUJBQXlCLHFCQUFxQixtQkFBbUIsb0JBQW9CLGVBQWMsU0FDeEY7d0JBQ1gsT0FBTzt3QkFDUCxPQUFPLFFBQVEsTUFBTTt3QkFDckIsSUFBSSxjQUFjLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSzt3QkFDdkQsT0FBTyxZQUFZLE1BQU0sUUFBUTs7O29CQUdyQyxHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxjQUFjLE1BQU07OztvQkFHeEIsR0FBRyxxREFBcUQsWUFBTTt3QkFDMUQsY0FBYyxPQUFPOzs7b0JBR3pCLEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELElBQUksV0FBUTt3QkFDWixXQUFXO3dCQUNYLHlCQUF5QixxQkFBcUIsbUJBQW1CLG9CQUFvQixlQUNoRixLQUFLLFlBQUE7NEJBS00sT0FMQSxXQUFXOzJCQUFNLFNBQ3RCLFlBQUE7NEJBTUssT0FOQyxXQUFXOzt3QkFDNUIsT0FBTzt3QkFDUCxPQUFPLFVBQVUsUUFBUTs7O29CQUc3QixHQUFHLHVFQUF1RSxZQUFNO3dCQUM1RSxJQUFJLFdBQVE7d0JBQ1osY0FBYyxXQUFXO3dCQUN6QixXQUFXO3dCQUNYLHlCQUF5QixxQkFBcUIsbUJBQW1CLG9CQUFvQixlQUNoRixLQUFLLFlBQUE7NEJBT00sT0FQQSxXQUFXOzJCQUFNLFNBQ3RCLFlBQUE7NEJBUUssT0FSQyxXQUFXOzt3QkFDNUIsT0FBTzt3QkFDUCxPQUFPLFVBQVUsUUFBUTs7Ozs7O0dBZWxDIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuL1JlbWVkaWF0aW9uVGVzdERhdGEnO1xuaW1wb3J0IHtleHBlY3RSZWplY3R9IGZyb20gJ1NhaWxQb2ludEhlbHBlcnMnO1xuXG5kZXNjcmliZSgncmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCAkcSwgc3BNb2RhbCwgcmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlLCAkc2NvcGUsIHJlbWVkaWF0aW9uVGVzdERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZW1lZGlhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kcV8sIF9zcE1vZGFsXywgX3JlbWVkaWF0aW9uRGlhbG9nU2VydmljZV8sIF8kcm9vdFNjb3BlXywgX3JlbWVkaWF0aW9uVGVzdERhdGFfKSA9PiB7XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgcmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlID0gX3JlbWVkaWF0aW9uRGlhbG9nU2VydmljZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgcmVtZWRpYXRpb25UZXN0RGF0YSA9IF9yZW1lZGlhdGlvblRlc3REYXRhXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd1Jldm9jYXRpb25EaWFsb2coKScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlbWVkaWF0aW9uQWR2aWNlLCByZW1lZGlhdGlvblN1bW1hcnksIGRpYWxvZ0NvbnRleHQsIGRpYWxvZ1Jlc3VsdDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JlbWVkaWF0aW9uQWR2aWNlXywgX1JlbWVkaWF0aW9uU3VtbWFyeV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBSZW1lZGlhdGlvbkRpYWxvZ1Jlc3VsdCwgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KSA9PiB7XG4gICAgICAgICAgICByZW1lZGlhdGlvbkFkdmljZSA9IG5ldyBfUmVtZWRpYXRpb25BZHZpY2VfKFxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuY29weShyZW1lZGlhdGlvblRlc3REYXRhLlJFTUVESUFUSU9OX0FEVklDRV9SRVNVTFQuYWR2aWNlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uU3VtbWFyeSA9IG5ldyBfUmVtZWRpYXRpb25TdW1tYXJ5XyhcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmNvcHkocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULmFkdmljZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGRpYWxvZ0NvbnRleHQgPSBuZXcgUmVtZWRpYXRpb25EaWFsb2dDb250ZXh0KCk7XG4gICAgICAgICAgICBkaWFsb2dSZXN1bHQgPSBuZXcgUmVtZWRpYXRpb25EaWFsb2dSZXN1bHQoe1xuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiAnYSBiIGMgZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc3B5T25Nb2RhbChyZWplY3QpIHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IChyZWplY3QpID8gJHEucmVqZWN0KCkgOiAkcS53aGVuKGRpYWxvZ1Jlc3VsdClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0ZXN0TW9kYWwoZXhwZWN0ZWRNb2RhbENhbGwpIHtcbiAgICAgICAgICAgIHNweU9uTW9kYWwoKTtcbiAgICAgICAgICAgIHJlbWVkaWF0aW9uRGlhbG9nU2VydmljZS5zaG93UmV2b2NhdGlvbkRpYWxvZyhyZW1lZGlhdGlvbkFkdmljZSwgcmVtZWRpYXRpb25TdW1tYXJ5LCBkaWFsb2dDb250ZXh0KVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNvbHZlUmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleHBlY3RlZE1vZGFsQ2FsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHJlc29sdmVSZXN1bHQpLnRvRXF1YWwoZGlhbG9nUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXNvbHZlUmVzdWx0KS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgaWYgKGV4cGVjdGVkTW9kYWxDYWxsKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBTdW1tYXJ5KHJlcXVpcmVzUmVjaXBpZW50LCBpc01vZGlmaWFibGUsIGhhc0RldGFpbHMpIHtcbiAgICAgICAgICAgIHNweU9uKHJlbWVkaWF0aW9uU3VtbWFyeSwgJ3JlcXVpcmVzUmVjaXBpZW50U2VsZWN0aW9uJykuYW5kLnJldHVyblZhbHVlKHJlcXVpcmVzUmVjaXBpZW50KTtcbiAgICAgICAgICAgIHNweU9uKHJlbWVkaWF0aW9uU3VtbWFyeSwgJ2lzTW9kaWZpYWJsZScpLmFuZC5yZXR1cm5WYWx1ZShpc01vZGlmaWFibGUpO1xuICAgICAgICAgICAgc3B5T24ocmVtZWRpYXRpb25TdW1tYXJ5LCAnaGFzUm9sZVJldm9jYXRpb25EZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKGhhc0RldGFpbHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGRpYWxvZyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+XG4gICAgICAgICAgICAgICAgcmVtZWRpYXRpb25EaWFsb2dTZXJ2aWNlLnNob3dSZXZvY2F0aW9uRGlhbG9nKHJlbWVkaWF0aW9uQWR2aWNlLCByZW1lZGlhdGlvblN1bW1hcnkpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXNvbHZlcyB3aXRob3V0IG9wZW5pbmcgbW9kYWwgaWYgc3VtbWFyeSBpcyBkZWZpbmVkIHdpdGhvdXQgcmVxdWlyaW5nIHJlY2lwaWVudCBzZWxlY3Rpb24sIHJldm9jYXRpb24nICtcbiAgICAgICAgICAgICdtb2RpZmljYXRpb24gb3Igcm9sZSByZXZvY2F0aW9uIGRldGFpbHMnLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHNldHVwU3VtbWFyeShmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIHRlc3RNb2RhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXNvbHZlcyB3aXRob3V0IG9wZW5pbmcgbW9kYWwgaWYgc3VtbWFyeSBpcyBkZWZpbmVkIHdpdGhvdXQgcmVxdWlyaW5nIHJlY2lwaWVudCBzZWxlY3Rpb24sIHJldm9jYXRpb24nICtcbiAgICAgICAgICAgICdtb2RpZmljYXRpb24sIGJ1dCB3aXRoIHJvbGUgcmV2b2NhdGlvbiBkZXRhaWxzIHdpdGggZXhpc3RpbmcgcmVzdWx0JywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBTdW1tYXJ5KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBFdmVuIHdpdGggcm9sZSByZXZvY2F0aW9uIGRldGFpbHMgZG9udCBvcGVuIGJlY2F1c2UgdGhlcmUgaXMgYW4gZXhpc3RpbmcgcmVzdWx0XG4gICAgICAgICAgICBkaWFsb2dDb250ZXh0LmV4aXN0aW5nUmVzdWx0ID0ge307XG4gICAgICAgICAgICB0ZXN0TW9kYWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb3BlbnMgbW9kYWwgaWYgcmVjaXBpZW50IHNlbGVjdGlvbiBpcyByZXF1aXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNldHVwU3VtbWFyeSh0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGVzdE1vZGFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb3BlbnMgbW9kYWwgaWYgcmV2b2NhdGlvbiBtb2RpZmlhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBTdW1tYXJ5KGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICB0ZXN0TW9kYWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdvcGVucyBtb2RhbCBpZiByb2xlIHJldm9jYXRpb24gZGV0YWlscyBtb2RpZmlhYmxlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0dXBTdW1tYXJ5KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB0ZXN0TW9kYWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgaXQoJ29wZW5zIG1vZGFsIGlmIG5vIHN1bW1hcnknLCAoKSA9PiB7XG4gICAgICAgICAgICByZW1lZGlhdGlvblN1bW1hcnkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0ZXN0TW9kYWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RNb2RhbFNpemUoaXNFbnRpdGxlbWVudFNvRCwgZXhwZWN0ZWRTaXplKSB7XG4gICAgICAgICAgICAvLyBHaXZlIHRoaXMgZW50aXRsZW1lbnRzIHRvIHJlbWVkaWF0ZSBmb3IgYW4gU29ELlxuICAgICAgICAgICAgaWYgKGlzRW50aXRsZW1lbnRTb0QpIHtcbiAgICAgICAgICAgICAgICByZW1lZGlhdGlvbkFkdmljZS5lbnRpdGxlbWVudHNUb1JlbWVkaWF0ZSA9IHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNweU9uTW9kYWwodHJ1ZSk7XG4gICAgICAgICAgICByZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1Jldm9jYXRpb25EaWFsb2cocmVtZWRpYXRpb25BZHZpY2UsIHJlbWVkaWF0aW9uU3VtbWFyeSwgZGlhbG9nQ29udGV4dClcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXhwZWN0UmVqZWN0KTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGxldCBtb2RhbENvbmZpZyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbENvbmZpZy5zaXplKS50b0VxdWFsKGV4cGVjdGVkU2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnb3BlbnMgYSBsYXJnZSBtb2RhbCBmb3IgZW50aXRsZW1lbnQgU29EJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdE1vZGFsU2l6ZSh0cnVlLCAnbGcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIGEgbm9ybWFsIHNpemUgbW9kYWwgZm9yIG5vbi1lbnRpdGxlbWVudCBTb0QnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0TW9kYWxTaXplKGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyByZWplY3RlZCBwcm9taXNlIGlmIGRpYWxvZyBpcyBjYW5jZWxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZWplY3RlZDtcbiAgICAgICAgICAgIHNweU9uTW9kYWwodHJ1ZSk7XG4gICAgICAgICAgICByZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1Jldm9jYXRpb25EaWFsb2cocmVtZWRpYXRpb25BZHZpY2UsIHJlbWVkaWF0aW9uU3VtbWFyeSwgZGlhbG9nQ29udGV4dClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZWplY3RlZCA9IGZhbHNlKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiByZWplY3RlZCA9IHRydWUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyByZWplY3RlZCBwcm9taXNlIGlmIGRpYWxvZyBpcyByZXNvbHZlZCBidXQgcmVhZE9ubHkgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCByZWplY3RlZDtcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRleHQucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICAgICAgc3B5T25Nb2RhbChmYWxzZSk7XG4gICAgICAgICAgICByZW1lZGlhdGlvbkRpYWxvZ1NlcnZpY2Uuc2hvd1Jldm9jYXRpb25EaWFsb2cocmVtZWRpYXRpb25BZHZpY2UsIHJlbWVkaWF0aW9uU3VtbWFyeSwgZGlhbG9nQ29udGV4dClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZWplY3RlZCA9IGZhbHNlKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiByZWplY3RlZCA9IHRydWUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHJlamVjdGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
