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

            describe('IdentityRequestProvisioningEngineNameComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    item = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestService_, _$componentController_, _identityRequestTestData_, IdentityRequestItem) {

                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    item = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_ITEM_1);
                }));

                function createController(item) {
                    var bindings = {
                        item: item
                    };
                    var ctrl = $componentController('spIdentityRequestProvisioningEngineName', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws if not initialized correctly', function () {
                        expect(function () {
                            return createController(null);
                        }).toThrow();
                    });
                });

                describe('getProvisioningEngineName', function () {

                    it('returns the provisioning engine name if not null', function () {
                        var ctrl = createController(item);
                        expect(ctrl.getProvisioningEngineName()).toEqual(item.provisioningEngine);
                    });

                    it('returns Manual if name is null', function () {
                        item.provisioningEngine = null;
                        var ctrl = createController(item);
                        expect(ctrl.getProvisioningEngineName()).toEqual('ui_identity_request_provisioning_engine_manual');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0UHJvdmlzaW9uaW5nRW5naW5lTmFtZUNvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUtyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxrREFBa0QsWUFBVzs7Z0JBRWxFLElBQUkseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSx1QkFBb0I7b0JBQUUsT0FBSTs7Z0JBRS9FLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDBCQUEwQix3QkFBd0IsMkJBQ2pFLHFCQUF3Qjs7b0JBRXhCLHVCQUF1QjtvQkFDdkIseUJBQXlCO29CQUN6QiwwQkFBMEI7b0JBQzFCLE9BQU8sSUFBSSxvQkFBb0Isd0JBQXdCOzs7Z0JBRzNELFNBQVMsaUJBQWlCLE1BQU07b0JBQzVCLElBQUksV0FBVzt3QkFDWCxNQUFNOztvQkFFVixJQUFJLE9BQU8scUJBQXFCLDJDQUEyQyxNQUFNO29CQUNqRixLQUFLO29CQUNMLE9BQU87OztnQkFHWCxTQUFTLGNBQWMsWUFBTTs7b0JBRXpCLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLE9BQU8sWUFBQTs0QkFVUyxPQVZILGlCQUFpQjsyQkFBTzs7OztnQkFJN0MsU0FBUyw2QkFBNkIsWUFBTTs7b0JBRXhDLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELElBQUksT0FBTyxpQkFBaUI7d0JBQzVCLE9BQU8sS0FBSyw2QkFBNkIsUUFBUSxLQUFLOzs7b0JBRzFELEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLEtBQUsscUJBQXFCO3dCQUMxQixJQUFJLE9BQU8saUJBQWlCO3dCQUM1QixPQUFPLEtBQUssNkJBQTZCLFFBQ3JDOzs7Ozs7R0FnQmIiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RQcm92aXNpb25pbmdFbmdpbmVOYW1lQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0UHJvdmlzaW9uaW5nRW5naW5lTmFtZUNvbXBvbmVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgJGNvbXBvbmVudENvbnRyb2xsZXIsIGl0ZW07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXywgXyRjb21wb25lbnRDb250cm9sbGVyXywgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXyxcclxuICAgICAgICBJZGVudGl0eVJlcXVlc3RJdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBpdGVtID0gbmV3IElkZW50aXR5UmVxdWVzdEl0ZW0oaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF9JVEVNXzEpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSkge1xyXG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHtcclxuICAgICAgICAgICAgaXRlbTogaXRlbVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RQcm92aXNpb25pbmdFbmdpbmVOYW1lJywgbnVsbCwgYmluZGluZ3MpO1xyXG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIGlmIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0UHJvdmlzaW9uaW5nRW5naW5lTmFtZScsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHByb3Zpc2lvbmluZyBlbmdpbmUgbmFtZSBpZiBub3QgbnVsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGl0ZW0pO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRQcm92aXNpb25pbmdFbmdpbmVOYW1lKCkpLnRvRXF1YWwoaXRlbS5wcm92aXNpb25pbmdFbmdpbmUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBNYW51YWwgaWYgbmFtZSBpcyBudWxsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLnByb3Zpc2lvbmluZ0VuZ2luZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpdGVtKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0UHJvdmlzaW9uaW5nRW5naW5lTmFtZSgpKS50b0VxdWFsKFxyXG4gICAgICAgICAgICAgICAgJ3VpX2lkZW50aXR5X3JlcXVlc3RfcHJvdmlzaW9uaW5nX2VuZ2luZV9tYW51YWwnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
