System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spIdentityRequestItemStatus', function () {

                var elementDefinition = '<sp-identity-request-item-status sp-item="item" sp-request="request"/>',
                    $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    item = undefined,
                    identityRequest = undefined,
                    spDateService = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$compile_, $rootScope, IdentityRequestItem, IdentityRequest, identityRequestTestData, spTranslateFilter, _spDateService_) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_ITEM_1);
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    spDateService = _spDateService_;
                    spTranslateFilter.configureCatalog({
                        'ui_identity_request_item_status_denied': 'Denied',
                        'ui_identity_request_item_status_canceled': 'Canceled',
                        'ui_identity_request_item_status_failed': 'Failed',
                        'ui_identity_request_item_status_complete': 'Complete',
                        'ui_identity_request_item_status_unverified': 'Unverified',
                        'ui_identity_request_item_status_not_verifiable': 'Not Verifiable',
                        'ui_identity_request_item_status_provisioning': 'Provisioning',
                        'ui_identity_request_item_status_waiting_approval_days': '{0} days',
                        'ui_identity_request_item_status_waiting': 'Waiting'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(requestItem, request) {
                    $scope.item = requestItem;
                    $scope.request = request;
                    element = $compile(elementDefinition)($scope);
                    $scope.$apply();
                }

                it('throws with no identity request item', function () {
                    expect(function () {
                        return createElement(undefined, identityRequest);
                    }).toThrow();
                });

                it('throws with no request', function () {
                    expect(function () {
                        return createElement(item, undefined);
                    }).toThrow();
                });

                describe('approvals', function () {
                    var approvalsElement = undefined;

                    beforeEach(function () {
                        spyOn(spDateService, 'getDaysSince').and.callFake(function (date) {
                            if (date === item.approvalItemSummaries[0].created) {
                                return 5;
                            } else {
                                return 3;
                            }
                        });
                        createElement(item, identityRequest);
                        approvalsElement = element.find('.identity-request-item-status-approval');
                        expect(approvalsElement.length).toEqual(1);
                    });

                    it('shows message with largest days waiting on value', function () {
                        expect(approvalsElement.find('.identity-request-item-status-approval-label').text().trim()).toEqual('5 days:');
                    });

                    it('lists approvers in more/less list', function () {
                        var approvalsList = approvalsElement.find('.identity-request-item-status-approval-list .more-less-list-item');
                        expect(approvalsList.length).toEqual(2);
                    });
                });

                function spyIfTrue(item, statusFunc, trueStatusFunc) {
                    spyOn(item, statusFunc).and.returnValue(statusFunc === trueStatusFunc);
                }

                function spyOnItemChecks(item, trueStatusFunc) {
                    spyIfTrue(item, 'isApproved', trueStatusFunc);
                    spyIfTrue(item, 'isCanceled', trueStatusFunc);
                    spyIfTrue(item, 'isDenied', trueStatusFunc);
                    spyIfTrue(item, 'isFailed', trueStatusFunc);
                    spyIfTrue(item, 'isComplete', trueStatusFunc);
                    spyIfTrue(item, 'isProvisioning', trueStatusFunc);
                    spyIfTrue(item, 'isUnverifiable', trueStatusFunc);
                }

                function testElement(expectedMessage, expectedClass) {
                    expect(element.find('.identity-request-item-status-approval').length).toEqual(0);
                    var statusElement = element.find('.identity-request-item-status-label');
                    expect(statusElement.length).toEqual(1);
                    expect(statusElement.find('.label.' + expectedClass).length).toEqual(1);
                    expect(statusElement.text().indexOf(expectedMessage)).not.toEqual(-1);
                }

                function testStatusLabel(trueStatusFunc, expectedMessage, expectedClass) {
                    identityRequest.executionStatus = 'Executing';
                    delete item.approvalItemSummaries;

                    spyOnItemChecks(item, trueStatusFunc);
                    createElement(item, identityRequest);
                    testElement(expectedMessage, expectedClass);
                }

                describe('denied', function () {
                    it('shows denied message with danger class', function () {
                        testStatusLabel('isDenied', 'Denied', 'label-danger');
                    });
                });

                describe('canceled', function () {
                    it('shows canceled message with danger class', function () {
                        testStatusLabel('isCanceled', 'Canceled', 'label-danger');
                    });
                });

                describe('failed', function () {
                    it('shows failed message with danger class', function () {
                        testStatusLabel('isFailed', 'Failed', 'label-danger');
                    });
                });

                describe('complete', function () {
                    it('shows complete message with success class', function () {
                        testStatusLabel('isComplete', 'Complete', 'label-success');
                    });
                });

                describe('unverifiable', function () {
                    it('shows unverifiable message with success class', function () {
                        testStatusLabel('isUnverifiable', 'Not Verifiable', 'label-success');
                    });
                });

                describe('provisioning', function () {
                    it('shows provisioning message with info class', function () {
                        testStatusLabel('isProvisioning', 'Provisioning', 'label-info');
                    });
                });

                describe('waiting', function () {
                    it('shows waiting message with info class if nothing else is true', function () {
                        testStatusLabel(undefined, 'Waiting', 'label-info');
                    });
                });

                describe('unverified and complete', function () {
                    it('shows unverified with warning class if request is complete but item is not complete or failed', function () {
                        // Simulate item where request is completed but the item was never verified
                        delete item.approvalItemSummaries;
                        item.provisioningState = 'Pending';
                        identityRequest.executionStatus = 'Completed';

                        spyOnItemChecks(item, undefined);
                        createElement(item, identityRequest);
                        testElement('Unverified', 'label-warning');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbVN0YXR1c0NvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsOEJBQThCLDRDQUE0QyxVQUFVLFNBQVM7OztJQUc5Szs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSwwQkFBMEIsSUFBSSxVQUFVLHNDQUFzQztRQUMzRixTQUFTLFlBQVk7O1lBSDdCLFNBQVMsK0JBQStCLFlBQU07O2dCQUUxQyxJQUFJLG9CQUFpQjtvQkFDakIsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsT0FBSTtvQkFBRSxrQkFBZTtvQkFBRSxnQkFBYTs7Z0JBRW5FLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVkscUJBQXFCLGlCQUFpQix5QkFDOUQsbUJBQW1CLGlCQUFvQjtvQkFDdEQsV0FBVztvQkFDWCxTQUFTO29CQUNULE9BQU8sSUFBSSxvQkFBb0Isd0JBQXdCO29CQUN2RCxrQkFBa0IsSUFBSSxnQkFBZ0Isd0JBQXdCO29CQUM5RCxnQkFBZ0I7b0JBQ2hCLGtCQUFrQixpQkFBaUI7d0JBQy9CLDBDQUEwQzt3QkFDMUMsNENBQTRDO3dCQUM1QywwQ0FBMEM7d0JBQzFDLDRDQUE0Qzt3QkFDNUMsOENBQThDO3dCQUM5QyxrREFBa0Q7d0JBQ2xELGdEQUFnRDt3QkFDaEQseURBQTBEO3dCQUMxRCwyQ0FBNEM7Ozs7Z0JBSXBELFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxjQUFjLGFBQWEsU0FBUztvQkFDekMsT0FBTyxPQUFPO29CQUNkLE9BQU8sVUFBVTtvQkFDakIsVUFBVSxTQUFTLG1CQUFt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QkFFbEMsZ0JBQWdCLE1BQU07d0JBQ3RCLGNBQWMsTUFBTTt3QkFDcEIsWUFBWSxjQUFjOzs7Ozs7R0FpQm5DIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbVN0YXR1c0NvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5UmVxdWVzdE1vZHVsZSBmcm9tICdpZGVudGl0eVJlcXVlc3QvSWRlbnRpdHlSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCAnLi4vSWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEnO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xuXG5kZXNjcmliZSgnc3BJZGVudGl0eVJlcXVlc3RJdGVtU3RhdHVzJywgKCkgPT4ge1xuXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gYDxzcC1pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tc3RhdHVzIHNwLWl0ZW09XCJpdGVtXCIgc3AtcmVxdWVzdD1cInJlcXVlc3RcIi8+YCxcbiAgICAgICAgJGNvbXBpbGUsICRzY29wZSwgZWxlbWVudCwgaXRlbSwgaWRlbnRpdHlSZXF1ZXN0LCBzcERhdGVTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsIElkZW50aXR5UmVxdWVzdEl0ZW0sIElkZW50aXR5UmVxdWVzdCwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLCBfc3BEYXRlU2VydmljZV8pID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICBpdGVtID0gbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9JVEVNXzEpO1xuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XG4gICAgICAgIHNwRGF0ZVNlcnZpY2UgPSBfc3BEYXRlU2VydmljZV87XG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9zdGF0dXNfZGVuaWVkJzogJ0RlbmllZCcsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX3N0YXR1c19jYW5jZWxlZCc6ICdDYW5jZWxlZCcsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX3N0YXR1c19mYWlsZWQnOiAnRmFpbGVkJyxcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X2l0ZW1fc3RhdHVzX2NvbXBsZXRlJzogJ0NvbXBsZXRlJyxcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X2l0ZW1fc3RhdHVzX3VudmVyaWZpZWQnOiAnVW52ZXJpZmllZCcsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX3N0YXR1c19ub3RfdmVyaWZpYWJsZSc6ICdOb3QgVmVyaWZpYWJsZScsXG4gICAgICAgICAgICAndWlfaWRlbnRpdHlfcmVxdWVzdF9pdGVtX3N0YXR1c19wcm92aXNpb25pbmcnOiAnUHJvdmlzaW9uaW5nJyxcbiAgICAgICAgICAgICd1aV9pZGVudGl0eV9yZXF1ZXN0X2l0ZW1fc3RhdHVzX3dhaXRpbmdfYXBwcm92YWxfZGF5cycgOiAnezB9IGRheXMnLFxuICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfaXRlbV9zdGF0dXNfd2FpdGluZycgOiAnV2FpdGluZydcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocmVxdWVzdEl0ZW0sIHJlcXVlc3QpIHtcbiAgICAgICAgJHNjb3BlLml0ZW0gPSByZXF1ZXN0SXRlbTtcbiAgICAgICAgJHNjb3BlLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoZWxlbWVudERlZmluaXRpb24pKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBpdCgndGhyb3dzIHdpdGggbm8gaWRlbnRpdHkgcmVxdWVzdCBpdGVtJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCh1bmRlZmluZWQsIGlkZW50aXR5UmVxdWVzdCkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3Mgd2l0aCBubyByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChpdGVtLCB1bmRlZmluZWQpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYXBwcm92YWxzJywgKCkgPT4ge1xuICAgICAgICBsZXQgYXBwcm92YWxzRWxlbWVudDtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIHNweU9uKHNwRGF0ZVNlcnZpY2UsICdnZXREYXlzU2luY2UnKS5hbmQuY2FsbEZha2UoKGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZSA9PT0gaXRlbS5hcHByb3ZhbEl0ZW1TdW1tYXJpZXNbMF0uY3JlYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcbiAgICAgICAgICAgIGFwcHJvdmFsc0VsZW1lbnQgPSBlbGVtZW50LmZpbmQoJy5pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tc3RhdHVzLWFwcHJvdmFsJyk7XG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxzRWxlbWVudC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyBtZXNzYWdlIHdpdGggbGFyZ2VzdCBkYXlzIHdhaXRpbmcgb24gdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxzRWxlbWVudC5maW5kKCcuaWRlbnRpdHktcmVxdWVzdC1pdGVtLXN0YXR1cy1hcHByb3ZhbC1sYWJlbCcpXG4gICAgICAgICAgICAgICAgLnRleHQoKS50cmltKCkpLnRvRXF1YWwoJzUgZGF5czonKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2xpc3RzIGFwcHJvdmVycyBpbiBtb3JlL2xlc3MgbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbHNMaXN0ID1cbiAgICAgICAgICAgICAgICBhcHByb3ZhbHNFbGVtZW50LmZpbmQoJy5pZGVudGl0eS1yZXF1ZXN0LWl0ZW0tc3RhdHVzLWFwcHJvdmFsLWxpc3QgLm1vcmUtbGVzcy1saXN0LWl0ZW0nKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbHNMaXN0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzcHlJZlRydWUoaXRlbSwgc3RhdHVzRnVuYywgdHJ1ZVN0YXR1c0Z1bmMpIHtcbiAgICAgICAgc3B5T24oaXRlbSwgc3RhdHVzRnVuYykuYW5kLnJldHVyblZhbHVlKHN0YXR1c0Z1bmMgPT09IHRydWVTdGF0dXNGdW5jKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcHlPbkl0ZW1DaGVja3MoaXRlbSwgdHJ1ZVN0YXR1c0Z1bmMpIHtcbiAgICAgICAgc3B5SWZUcnVlKGl0ZW0sICdpc0FwcHJvdmVkJywgdHJ1ZVN0YXR1c0Z1bmMpO1xuICAgICAgICBzcHlJZlRydWUoaXRlbSwgJ2lzQ2FuY2VsZWQnLCB0cnVlU3RhdHVzRnVuYyk7XG4gICAgICAgIHNweUlmVHJ1ZShpdGVtLCAnaXNEZW5pZWQnLCB0cnVlU3RhdHVzRnVuYyk7XG4gICAgICAgIHNweUlmVHJ1ZShpdGVtLCAnaXNGYWlsZWQnLCB0cnVlU3RhdHVzRnVuYyk7XG4gICAgICAgIHNweUlmVHJ1ZShpdGVtLCAnaXNDb21wbGV0ZScsIHRydWVTdGF0dXNGdW5jKTtcbiAgICAgICAgc3B5SWZUcnVlKGl0ZW0sICdpc1Byb3Zpc2lvbmluZycsIHRydWVTdGF0dXNGdW5jKTtcbiAgICAgICAgc3B5SWZUcnVlKGl0ZW0sICdpc1VudmVyaWZpYWJsZScsIHRydWVTdGF0dXNGdW5jKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0RWxlbWVudChleHBlY3RlZE1lc3NhZ2UsIGV4cGVjdGVkQ2xhc3MpIHtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmlkZW50aXR5LXJlcXVlc3QtaXRlbS1zdGF0dXMtYXBwcm92YWwnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIGxldCBzdGF0dXNFbGVtZW50ID0gZWxlbWVudC5maW5kKCcuaWRlbnRpdHktcmVxdWVzdC1pdGVtLXN0YXR1cy1sYWJlbCcpO1xuICAgICAgICBleHBlY3Qoc3RhdHVzRWxlbWVudC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChzdGF0dXNFbGVtZW50LmZpbmQoYC5sYWJlbC4ke2V4cGVjdGVkQ2xhc3N9YCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3Qoc3RhdHVzRWxlbWVudC50ZXh0KCkuaW5kZXhPZihleHBlY3RlZE1lc3NhZ2UpKS5ub3QudG9FcXVhbCgtMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdFN0YXR1c0xhYmVsKHRydWVTdGF0dXNGdW5jLCBleHBlY3RlZE1lc3NhZ2UsIGV4cGVjdGVkQ2xhc3MpIHtcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LmV4ZWN1dGlvblN0YXR1cyA9ICdFeGVjdXRpbmcnO1xuICAgICAgICBkZWxldGUgaXRlbS5hcHByb3ZhbEl0ZW1TdW1tYXJpZXM7XG5cbiAgICAgICAgc3B5T25JdGVtQ2hlY2tzKGl0ZW0sIHRydWVTdGF0dXNGdW5jKTtcbiAgICAgICAgY3JlYXRlRWxlbWVudChpdGVtLCBpZGVudGl0eVJlcXVlc3QpO1xuICAgICAgICB0ZXN0RWxlbWVudChleHBlY3RlZE1lc3NhZ2UsIGV4cGVjdGVkQ2xhc3MpO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdkZW5pZWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG93cyBkZW5pZWQgbWVzc2FnZSB3aXRoIGRhbmdlciBjbGFzcycsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RTdGF0dXNMYWJlbCgnaXNEZW5pZWQnLCAnRGVuaWVkJywgJ2xhYmVsLWRhbmdlcicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5jZWxlZCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3dzIGNhbmNlbGVkIG1lc3NhZ2Ugd2l0aCBkYW5nZXIgY2xhc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0U3RhdHVzTGFiZWwoJ2lzQ2FuY2VsZWQnLCAnQ2FuY2VsZWQnLCAnbGFiZWwtZGFuZ2VyJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2ZhaWxlZCcsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3dzIGZhaWxlZCBtZXNzYWdlIHdpdGggZGFuZ2VyIGNsYXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdFN0YXR1c0xhYmVsKCdpc0ZhaWxlZCcsICdGYWlsZWQnLCAnbGFiZWwtZGFuZ2VyJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvd3MgY29tcGxldGUgbWVzc2FnZSB3aXRoIHN1Y2Nlc3MgY2xhc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0U3RhdHVzTGFiZWwoJ2lzQ29tcGxldGUnLCAnQ29tcGxldGUnLCAnbGFiZWwtc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1bnZlcmlmaWFibGUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG93cyB1bnZlcmlmaWFibGUgbWVzc2FnZSB3aXRoIHN1Y2Nlc3MgY2xhc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICB0ZXN0U3RhdHVzTGFiZWwoJ2lzVW52ZXJpZmlhYmxlJywgJ05vdCBWZXJpZmlhYmxlJywgJ2xhYmVsLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncHJvdmlzaW9uaW5nJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvd3MgcHJvdmlzaW9uaW5nIG1lc3NhZ2Ugd2l0aCBpbmZvIGNsYXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdFN0YXR1c0xhYmVsKCdpc1Byb3Zpc2lvbmluZycsICdQcm92aXNpb25pbmcnLCAnbGFiZWwtaW5mbycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3YWl0aW5nJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvd3Mgd2FpdGluZyBtZXNzYWdlIHdpdGggaW5mbyBjbGFzcyBpZiBub3RoaW5nIGVsc2UgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RTdGF0dXNMYWJlbCh1bmRlZmluZWQsICdXYWl0aW5nJywgJ2xhYmVsLWluZm8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndW52ZXJpZmllZCBhbmQgY29tcGxldGUnLCAoKSA9PiB7XG4gICAgICAgIGl0ICgnc2hvd3MgdW52ZXJpZmllZCB3aXRoIHdhcm5pbmcgY2xhc3MgaWYgcmVxdWVzdCBpcyBjb21wbGV0ZSBidXQgaXRlbSBpcyBub3QgY29tcGxldGUgb3IgZmFpbGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgaXRlbSB3aGVyZSByZXF1ZXN0IGlzIGNvbXBsZXRlZCBidXQgdGhlIGl0ZW0gd2FzIG5ldmVyIHZlcmlmaWVkXG4gICAgICAgICAgICBkZWxldGUgaXRlbS5hcHByb3ZhbEl0ZW1TdW1tYXJpZXM7XG4gICAgICAgICAgICBpdGVtLnByb3Zpc2lvbmluZ1N0YXRlID0gJ1BlbmRpbmcnO1xuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0LmV4ZWN1dGlvblN0YXR1cyA9ICdDb21wbGV0ZWQnO1xuXG4gICAgICAgICAgICBzcHlPbkl0ZW1DaGVja3MoaXRlbSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcbiAgICAgICAgICAgIHRlc3RFbGVtZW50KCdVbnZlcmlmaWVkJywgJ2xhYmVsLXdhcm5pbmcnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
