System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', '../IdentityRequestTestData'], function (_export) {
    /* (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_IdentityRequestTestData) {}],
        execute: function () {

            describe('IdentityRequestItem', function () {
                var IdentityRequestItem = undefined,
                    identityRequestTestData = undefined,
                    ApprovalItemSummary = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_IdentityRequestItem_, _identityRequestTestData_, _ApprovalItemSummary_) {
                    IdentityRequestItem = _IdentityRequestItem_;
                    identityRequestTestData = _identityRequestTestData_;
                    ApprovalItemSummary = _ApprovalItemSummary_;
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1,
                            test = new IdentityRequestItem(data);
                        expect(test.id).toEqual(data.id);
                        expect(test.applicationName).toEqual(data.applicationName);
                        expect(test.role).toEqual(data.role);
                        expect(test.entitlement).toEqual(data.entitlement);
                        expect(test.name).toEqual(data.name);
                        expect(test.value).toEqual(data.value);
                        expect(test.displayableValue).toEqual(data.displayableValue);
                        expect(test.operation).toEqual(data.operation);
                        expect(test.accountName).toEqual(data.accountName);
                        expect(test.provisioningState).toEqual(data.provisioningState);
                        expect(test.approvalState).toEqual(data.approvalState);
                        expect(test.displayableAccountName).toEqual(data.displayableAccountName);
                        expect(test.provisioningEngine).toEqual(data.provisioningEngine);
                        expect(test.retries).toEqual(data.retries);
                        expect(test.startDate).toEqual(new Date(data.startDate));
                        expect(test.endDate).toEqual(new Date(data.endDate));
                        expect(test.compilationStatus).toEqual(data.compilationStatus);
                        expect(test.instance).toEqual(data.instance);
                        expect(test.requesterComments).toEqual(data.requesterComments);
                        expect(test.provisioningRequestId).toEqual(data.provisioningRequestId);
                    });

                    it('should construct approval item summaries', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1,
                            test = new IdentityRequestItem(data);
                        expect(test.approvalItemSummaries).toBeDefined();
                        expect(test.approvalItemSummaries.length).toEqual(2);
                        expect(test.approvalItemSummaries[0] instanceof ApprovalItemSummary).toEqual(true);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new IdentityRequestItem();
                        }).toThrow();
                    });
                });

                function testStateFunction(approvalState, provisioningState, stateFunc, expectedResult, clearApprovalItems) {
                    var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1,
                        test = new IdentityRequestItem(data);
                    test.approvalState = approvalState;
                    test.provisioningState = provisioningState;
                    if (clearApprovalItems) {
                        delete test.approvalItemSummaries;
                    }
                    expect(test[stateFunc]()).toEqual(expectedResult);
                }

                describe('isApproved()', function () {
                    it('returns false if approvalState is pending', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Pending, undefined, 'isApproved', false);
                    });

                    it('returns false if approvalState is not Finished', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Rejected, undefined, 'isApproved', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Canceled, undefined, 'isApproved', false);
                    });

                    it('returns true if approvalState is Finished', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, undefined, 'isApproved', true);
                    });
                });

                describe('isDenied()', function () {
                    it('returns false if approvalState is pending', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Pending, undefined, 'isDenied', false);
                    });

                    it('returns false if approvalState is Finished or Canceled', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, undefined, 'isDenied', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Canceled, undefined, 'isDenied', false);
                    });

                    it('returns true if approvalState is Rejected', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Rejected, undefined, 'isDenied', true);
                    });
                });

                describe('isCanceled', function () {
                    it('returns true if approval state is canceled', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Canceled, undefined, 'isCanceled', true);
                    });

                    it('returns false if approval state is Finished or Rejected', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, undefined, 'isCanceled', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Rejected, undefined, 'isCanceled', false);
                    });
                });

                describe('isFailed()', function () {
                    it('returns false if not approved', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Pending, IdentityRequestItem.ProvisioningState.Pending, 'isFailed', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Rejected, IdentityRequestItem.ProvisioningState.Pending, 'isFailed', false);
                    });

                    it('returns false if approved and provisioning state is not Failed', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Pending, 'isFailed', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Commited, 'isFailed', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Finished, 'isFailed', false);
                    });

                    it('returns true if approved and provisioning state is Failed', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Failed, 'isFailed', true);
                    });
                });

                describe('isComplete()', function () {
                    it('returns false if approved and provisioning state is not Finished', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Pending, 'isComplete', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Commited, 'isComplete', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Failed, 'isComplete', false);
                    });

                    it('returns true if approved and provisioning state is Finished', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Finished, 'isComplete', true);
                    });
                });

                describe('isUnverifiable()', function () {

                    it('returns false if approved and provisioning state is not Unverifiable', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Pending, 'isUnverifiable', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Finished, 'isUnverifiable', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Failed, 'isUnverifiable', false);
                    });

                    it('returns true if approved and provisioning state is Unverifiable', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Unverifiable, 'isUnverifiable', true);
                    });
                });

                describe('isProvisioning()', function () {

                    it('returns false if approved and is complete, failed, unverifiable or pending', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Finished, 'isProvisioning', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Failed, 'isProvisioning', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Unverifiable, 'isProvisioning', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Pending, 'isProvisioning', false);
                    });

                    it('returns true if committed or retrying', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Commited, 'isProvisioning', true);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Retry, 'isProvisioning', true);
                    });
                });

                describe('isProvisioningPending()', function () {

                    it('returns false if is complete, failed, or unverifiable', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Finished, 'isProvisioningPending', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Failed, 'isProvisioningPending', false);
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Unverifiable, 'isProvisioningPending', false);
                    });

                    it('returns true if pending or null', function () {
                        testStateFunction(IdentityRequestItem.ApprovalState.Finished, IdentityRequestItem.ProvisioningState.Pending, 'isProvisioningPending', true);
                        testStateFunction(undefined, undefined, 'isProvisioningPending', true);
                    });
                });

                describe('sets the correct compilation status', function () {

                    it('returns the correct non-null status', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1,
                            test = new IdentityRequestItem(data);
                        expect(test.compilationStatus).toEqual(data.compilationStatus);
                    });

                    it('returns Requested if null', function () {
                        var data = identityRequestTestData.IDENTITY_REQUEST_ITEM_1;
                        data.compilationStatus = null;
                        var test = new IdentityRequestItem(data);
                        expect(test.compilationStatus).toEqual('Requested');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9tb2RlbC9JZGVudGl0eVJlcXVlc3RJdGVtVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5QywrQkFBK0IsVUFBVSxTQUFTOzs7SUFHbkk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDO1dBQy9ELFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyx1QkFBdUIsWUFBVztnQkFDdkMsSUFBSSxzQkFBbUI7b0JBQUUsMEJBQXVCO29CQUFFLHNCQUFtQjs7Z0JBRXJFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHVCQUF1QiwyQkFBMkIsdUJBQXVCO29CQUNoRyxzQkFBc0I7b0JBQ3RCLDBCQUEwQjtvQkFDMUIsc0JBQXNCOzs7Z0JBRzFCLFNBQVMsUUFBUSxZQUFXO29CQUN4QixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLE9BQU8sd0JBQXdCOzRCQUMvQixPQUFPLElBQUksb0JBQW9CO3dCQUNuQyxPQUFPLEtBQUssSUFBSSxRQUFRLEtBQUs7d0JBQzdCLE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxLQUFLO3dCQUMxQyxPQUFPLEtBQUssTUFBTSxRQUFRLEtBQUs7d0JBQy9CLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxLQUFLLE1BQU0sUUFBUSxLQUFLO3dCQUMvQixPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7d0JBQ2hDLE9BQU8sS0FBSyxrQkFBa0IsUUFBUSxLQUFLO3dCQUMzQyxPQUFPLEtBQUssV0FBVyxRQUFRLEtBQUs7d0JBQ3BDLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSzt3QkFDdEMsT0FBTyxLQUFLLG1CQUFtQixRQUFRLEtBQUs7d0JBQzVDLE9BQU8sS0FBSyxlQUFlLFFBQVEs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L21vZGVsL0lkZW50aXR5UmVxdWVzdEl0ZW1UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0lkZW50aXR5UmVxdWVzdFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3RJdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgSWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsIEFwcHJvdmFsSXRlbVN1bW1hcnk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0lkZW50aXR5UmVxdWVzdEl0ZW1fLCBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfLCBfQXBwcm92YWxJdGVtU3VtbWFyeV8pIHtcclxuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtID0gX0lkZW50aXR5UmVxdWVzdEl0ZW1fO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBBcHByb3ZhbEl0ZW1TdW1tYXJ5ID0gX0FwcHJvdmFsSXRlbVN1bW1hcnlfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfSVRFTV8xLFxyXG4gICAgICAgICAgICAgICAgdGVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3RJdGVtKGRhdGEpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5pZCkudG9FcXVhbChkYXRhLmlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuYXBwbGljYXRpb25OYW1lKS50b0VxdWFsKGRhdGEuYXBwbGljYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3Qucm9sZSkudG9FcXVhbChkYXRhLnJvbGUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5lbnRpdGxlbWVudCkudG9FcXVhbChkYXRhLmVudGl0bGVtZW50KTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QubmFtZSkudG9FcXVhbChkYXRhLm5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC52YWx1ZSkudG9FcXVhbChkYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGlzcGxheWFibGVWYWx1ZSkudG9FcXVhbChkYXRhLmRpc3BsYXlhYmxlVmFsdWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5vcGVyYXRpb24pLnRvRXF1YWwoZGF0YS5vcGVyYXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5hY2NvdW50TmFtZSkudG9FcXVhbChkYXRhLmFjY291bnROYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QucHJvdmlzaW9uaW5nU3RhdGUpLnRvRXF1YWwoZGF0YS5wcm92aXNpb25pbmdTdGF0ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmFwcHJvdmFsU3RhdGUpLnRvRXF1YWwoZGF0YS5hcHByb3ZhbFN0YXRlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZGlzcGxheWFibGVBY2NvdW50TmFtZSkudG9FcXVhbChkYXRhLmRpc3BsYXlhYmxlQWNjb3VudE5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5wcm92aXNpb25pbmdFbmdpbmUpLnRvRXF1YWwoZGF0YS5wcm92aXNpb25pbmdFbmdpbmUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5yZXRyaWVzKS50b0VxdWFsKGRhdGEucmV0cmllcyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnN0YXJ0RGF0ZSkudG9FcXVhbChuZXcgRGF0ZShkYXRhLnN0YXJ0RGF0ZSkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5lbmREYXRlKS50b0VxdWFsKG5ldyBEYXRlKGRhdGEuZW5kRGF0ZSkpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5jb21waWxhdGlvblN0YXR1cykudG9FcXVhbChkYXRhLmNvbXBpbGF0aW9uU3RhdHVzKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuaW5zdGFuY2UpLnRvRXF1YWwoZGF0YS5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnJlcXVlc3RlckNvbW1lbnRzKS50b0VxdWFsKGRhdGEucmVxdWVzdGVyQ29tbWVudHMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5wcm92aXNpb25pbmdSZXF1ZXN0SWQpLnRvRXF1YWwoZGF0YS5wcm92aXNpb25pbmdSZXF1ZXN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGNvbnN0cnVjdCBhcHByb3ZhbCBpdGVtIHN1bW1hcmllcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0lURU1fMSxcclxuICAgICAgICAgICAgICAgIHRlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0SXRlbShkYXRhKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3QuYXBwcm92YWxJdGVtU3VtbWFyaWVzKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5hcHByb3ZhbEl0ZW1TdW1tYXJpZXMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdC5hcHByb3ZhbEl0ZW1TdW1tYXJpZXNbMF0gaW5zdGFuY2VvZiBBcHByb3ZhbEl0ZW1TdW1tYXJ5KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIGRhdGEgaXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RTdGF0ZUZ1bmN0aW9uKGFwcHJvdmFsU3RhdGUsIHByb3Zpc2lvbmluZ1N0YXRlLCBzdGF0ZUZ1bmMsIGV4cGVjdGVkUmVzdWx0LCBjbGVhckFwcHJvdmFsSXRlbXMpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfSVRFTV8xLFxyXG4gICAgICAgICAgICB0ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oZGF0YSk7XHJcbiAgICAgICAgdGVzdC5hcHByb3ZhbFN0YXRlID0gYXBwcm92YWxTdGF0ZTtcclxuICAgICAgICB0ZXN0LnByb3Zpc2lvbmluZ1N0YXRlID0gcHJvdmlzaW9uaW5nU3RhdGU7XHJcbiAgICAgICAgaWYgKGNsZWFyQXBwcm92YWxJdGVtcykge1xyXG4gICAgICAgICAgICBkZWxldGUgdGVzdC5hcHByb3ZhbEl0ZW1TdW1tYXJpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cGVjdCh0ZXN0W3N0YXRlRnVuY10oKSkudG9FcXVhbChleHBlY3RlZFJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzQXBwcm92ZWQoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHByb3ZhbFN0YXRlIGlzIHBlbmRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5QZW5kaW5nLCB1bmRlZmluZWQsICdpc0FwcHJvdmVkJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHByb3ZhbFN0YXRlIGlzIG5vdCBGaW5pc2hlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLlJlamVjdGVkLCB1bmRlZmluZWQsICdpc0FwcHJvdmVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuQ2FuY2VsZWQsIHVuZGVmaW5lZCwgJ2lzQXBwcm92ZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYXBwcm92YWxTdGF0ZSBpcyBGaW5pc2hlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLCB1bmRlZmluZWQsICdpc0FwcHJvdmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNEZW5pZWQoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHByb3ZhbFN0YXRlIGlzIHBlbmRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5QZW5kaW5nLCB1bmRlZmluZWQsICdpc0RlbmllZCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYXBwcm92YWxTdGF0ZSBpcyBGaW5pc2hlZCBvciBDYW5jZWxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLCB1bmRlZmluZWQsICdpc0RlbmllZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkNhbmNlbGVkLCB1bmRlZmluZWQsICdpc0RlbmllZCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhcHByb3ZhbFN0YXRlIGlzIFJlamVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuUmVqZWN0ZWQsIHVuZGVmaW5lZCwgJ2lzRGVuaWVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNDYW5jZWxlZCcsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFwcHJvdmFsIHN0YXRlIGlzIGNhbmNlbGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuQ2FuY2VsZWQsIHVuZGVmaW5lZCwgJ2lzQ2FuY2VsZWQnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYXBwcm92YWwgc3RhdGUgaXMgRmluaXNoZWQgb3IgUmVqZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCwgdW5kZWZpbmVkLCAnaXNDYW5jZWxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLlJlamVjdGVkLCB1bmRlZmluZWQsICdpc0NhbmNlbGVkJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzRmFpbGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IGFwcHJvdmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuUGVuZGluZywgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5QZW5kaW5nLFxyXG4gICAgICAgICAgICAgICAgJ2lzRmFpbGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuUmVqZWN0ZWQsIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUGVuZGluZyxcclxuICAgICAgICAgICAgICAgICdpc0ZhaWxlZCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYXBwcm92ZWQgYW5kIHByb3Zpc2lvbmluZyBzdGF0ZSBpcyBub3QgRmFpbGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlBlbmRpbmcsICdpc0ZhaWxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5Db21taXRlZCwgJ2lzRmFpbGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZpbmlzaGVkLCAnaXNGYWlsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYXBwcm92ZWQgYW5kIHByb3Zpc2lvbmluZyBzdGF0ZSBpcyBGYWlsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmFpbGVkLCAnaXNGYWlsZWQnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc0NvbXBsZXRlKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYXBwcm92ZWQgYW5kIHByb3Zpc2lvbmluZyBzdGF0ZSBpcyBub3QgRmluaXNoZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUGVuZGluZywgJ2lzQ29tcGxldGUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuQ29tbWl0ZWQsICdpc0NvbXBsZXRlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZhaWxlZCwgJ2lzQ29tcGxldGUnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYXBwcm92ZWQgYW5kIHByb3Zpc2lvbmluZyBzdGF0ZSBpcyBGaW5pc2hlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5GaW5pc2hlZCwgJ2lzQ29tcGxldGUnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1VudmVyaWZpYWJsZSgpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHByb3ZlZCBhbmQgcHJvdmlzaW9uaW5nIHN0YXRlIGlzIG5vdCBVbnZlcmlmaWFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUGVuZGluZywgJ2lzVW52ZXJpZmlhYmxlJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkZpbmlzaGVkLCAnaXNVbnZlcmlmaWFibGUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmFpbGVkLCAnaXNVbnZlcmlmaWFibGUnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYXBwcm92ZWQgYW5kIHByb3Zpc2lvbmluZyBzdGF0ZSBpcyBVbnZlcmlmaWFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuVW52ZXJpZmlhYmxlLCAnaXNVbnZlcmlmaWFibGUnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1Byb3Zpc2lvbmluZygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhcHByb3ZlZCBhbmQgaXMgY29tcGxldGUsIGZhaWxlZCwgdW52ZXJpZmlhYmxlIG9yIHBlbmRpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmluaXNoZWQsICdpc1Byb3Zpc2lvbmluZycsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5GYWlsZWQsICdpc1Byb3Zpc2lvbmluZycsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5VbnZlcmlmaWFibGUsICdpc1Byb3Zpc2lvbmluZycsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5QZW5kaW5nLCAnaXNQcm92aXNpb25pbmcnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY29tbWl0dGVkIG9yIHJldHJ5aW5nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLkNvbW1pdGVkLCAnaXNQcm92aXNpb25pbmcnLCB0cnVlKTtcclxuICAgICAgICAgICAgdGVzdFN0YXRlRnVuY3Rpb24oSWRlbnRpdHlSZXF1ZXN0SXRlbS5BcHByb3ZhbFN0YXRlLkZpbmlzaGVkLFxyXG4gICAgICAgICAgICAgICAgSWRlbnRpdHlSZXF1ZXN0SXRlbS5Qcm92aXNpb25pbmdTdGF0ZS5SZXRyeSwgJ2lzUHJvdmlzaW9uaW5nJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzUHJvdmlzaW9uaW5nUGVuZGluZygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBpcyBjb21wbGV0ZSwgZmFpbGVkLCBvciB1bnZlcmlmaWFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmluaXNoZWQsICdpc1Byb3Zpc2lvbmluZ1BlbmRpbmcnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuRmFpbGVkLCAnaXNQcm92aXNpb25pbmdQZW5kaW5nJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbihJZGVudGl0eVJlcXVlc3RJdGVtLkFwcHJvdmFsU3RhdGUuRmluaXNoZWQsXHJcbiAgICAgICAgICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtLlByb3Zpc2lvbmluZ1N0YXRlLlVudmVyaWZpYWJsZSwgJ2lzUHJvdmlzaW9uaW5nUGVuZGluZycsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBwZW5kaW5nIG9yIG51bGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RTdGF0ZUZ1bmN0aW9uKElkZW50aXR5UmVxdWVzdEl0ZW0uQXBwcm92YWxTdGF0ZS5GaW5pc2hlZCxcclxuICAgICAgICAgICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0uUHJvdmlzaW9uaW5nU3RhdGUuUGVuZGluZywgJ2lzUHJvdmlzaW9uaW5nUGVuZGluZycsIHRydWUpO1xyXG4gICAgICAgICAgICB0ZXN0U3RhdGVGdW5jdGlvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2lzUHJvdmlzaW9uaW5nUGVuZGluZycsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NldHMgdGhlIGNvcnJlY3QgY29tcGlsYXRpb24gc3RhdHVzJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCBub24tbnVsbCBzdGF0dXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9JVEVNXzEsXHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oZGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbXBpbGF0aW9uU3RhdHVzKS50b0VxdWFsKGRhdGEuY29tcGlsYXRpb25TdGF0dXMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBSZXF1ZXN0ZWQgaWYgbnVsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0lURU1fMTtcclxuICAgICAgICAgICAgZGF0YS5jb21waWxhdGlvblN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oZGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbXBpbGF0aW9uU3RhdHVzKS50b0VxdWFsKCdSZXF1ZXN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
