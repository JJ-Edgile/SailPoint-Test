System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestProvisioningItemsComponent', function () {

                var identityRequestService = undefined,
                    $componentController = undefined,
                    identityRequest = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestService_, _$componentController_, identityRequestTestData, IdentityRequest) {

                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                }));

                function createController(requestId) {
                    var bindings = {
                        requestId: requestId
                    };
                    var ctrl = $componentController('spIdentityRequestProvisioningItems', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {
                    it('throws if no request id', function () {
                        expect(function () {
                            return createController(null);
                        }).toThrow();
                    });
                });

                describe('getProvisioningItems', function () {
                    it('calls through identityRequestService to get provisioning items', function () {

                        var ctrl = createController(identityRequest.id),
                            groupBy = 'someGroupBy';
                        spyOn(identityRequestService, 'getProvisioningItems');
                        ctrl.getProvisioningItems(0, 5, undefined, groupBy);

                        expect(identityRequestService.getProvisioningItems).toHaveBeenCalledWith(identityRequest.id, 0, 5, undefined, groupBy);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0UHJvdmlzaW9uaW5nSXRlbXNDb21wb25lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7Ozs7SUFLckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNkNBQTZDLFlBQVc7O2dCQUU3RCxJQUFJLHlCQUFzQjtvQkFBRSx1QkFBb0I7b0JBQUUsa0JBQWU7O2dCQUVqRSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQywwQkFBMEIsd0JBQXdCLHlCQUF5QixpQkFBb0I7O29CQUU5Ryx1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsa0JBQWtCLElBQUksZ0JBQWdCLHdCQUF3Qjs7O2dCQUdsRSxTQUFTLGlCQUFpQixXQUFXO29CQUNqQyxJQUFJLFdBQVc7d0JBQ1gsV0FBVzs7b0JBRWYsSUFBSSxPQUFPLHFCQUFxQixzQ0FBc0MsTUFBTTtvQkFDNUUsS0FBSztvQkFDTCxPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLE9BQU8sWUFBQTs0QkFVUyxPQVZILGlCQUFpQjsyQkFBTzs7OztnQkFJN0MsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRyxrRUFBa0UsWUFBTTs7d0JBRXZFLElBQUksT0FBTyxpQkFBaUIsZ0JBQWdCOzRCQUM1QyxVQUFVO3dCQUNWLE1BQU0sd0JBQXdCO3dCQUM5QixLQUFLLHFCQUFxQixHQUFHLEdBQUcsV0FBVzs7d0JBRTNDLE9BQU8sdUJBQXVCLHNCQUFzQixxQkFBcUIsZ0JBQWdCLElBQUksR0FBRyxHQUM1RixXQUFXOzs7Ozs7R0FnQnhCIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0UHJvdmlzaW9uaW5nSXRlbXNDb21wb25lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0UHJvdmlzaW9uaW5nSXRlbXNDb21wb25lbnQnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAkY29tcG9uZW50Q29udHJvbGxlciwgaWRlbnRpdHlSZXF1ZXN0O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfLCBfJGNvbXBvbmVudENvbnRyb2xsZXJfLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgSWRlbnRpdHlSZXF1ZXN0KSA9PiB7XG5cbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihyZXF1ZXN0SWQpIHtcbiAgICAgICAgbGV0IGJpbmRpbmdzID0ge1xuICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWRcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RQcm92aXNpb25pbmdJdGVtcycsIG51bGwsIGJpbmRpbmdzKTtcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIGlmIG5vIHJlcXVlc3QgaWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihudWxsKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRQcm92aXNpb25pbmdJdGVtcycsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggaWRlbnRpdHlSZXF1ZXN0U2VydmljZSB0byBnZXQgcHJvdmlzaW9uaW5nIGl0ZW1zJywgKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaWRlbnRpdHlSZXF1ZXN0LmlkKSxcbiAgICAgICAgICAgIGdyb3VwQnkgPSAnc29tZUdyb3VwQnknO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ2dldFByb3Zpc2lvbmluZ0l0ZW1zJyk7XG4gICAgICAgICAgICBjdHJsLmdldFByb3Zpc2lvbmluZ0l0ZW1zKDAsIDUsIHVuZGVmaW5lZCwgZ3JvdXBCeSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldFByb3Zpc2lvbmluZ0l0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpZGVudGl0eVJlcXVlc3QuaWQsIDAsIDUsXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBncm91cEJ5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
