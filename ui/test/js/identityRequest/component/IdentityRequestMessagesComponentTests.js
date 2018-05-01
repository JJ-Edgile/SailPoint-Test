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

            describe('IdentityRequestMessagesComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    identityRequest = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestService_, _$componentController_, _identityRequestTestData_, IdentityRequest) {

                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                }));

                function createController(requestId) {
                    var bindings = {
                        requestId: requestId
                    };
                    var ctrl = $componentController('spIdentityRequestMessages', null, bindings);
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

                describe('getMessages', function () {
                    it('calls through identityRequestService to get messages', function () {

                        var ctrl = createController(identityRequest.id);
                        spyOn(identityRequestService, 'getMessages');
                        ctrl.getMessages(0, 5, undefined);

                        expect(identityRequestService.getMessages).toHaveBeenCalledWith(identityRequest.id, 0, 5, undefined);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0TWVzc2FnZXNDb21wb25lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7Ozs7SUFLckc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3Rix3QkFBd0Isc0NBQXNDOztRQUVsRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0NBQW9DLFlBQVc7O2dCQUVwRCxJQUFJLHlCQUFzQjtvQkFBRSwwQkFBdUI7b0JBQUUsdUJBQW9CO29CQUFFLGtCQUFlOztnQkFFMUYsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLHdCQUF3QiwyQkFDakUsaUJBQW9COztvQkFFcEIsdUJBQXVCO29CQUN2Qix5QkFBeUI7b0JBQ3pCLDBCQUEwQjtvQkFDMUIsa0JBQWtCLElBQUksZ0JBQWdCLHdCQUF3Qjs7O2dCQUdsRSxTQUFTLGlCQUFpQixXQUFXO29CQUNqQyxJQUFJLFdBQVc7d0JBQ1gsV0FBVzs7b0JBRWYsSUFBSSxPQUFPLHFCQUFxQiw2QkFBNkIsTUFBTTtvQkFDbkUsS0FBSztvQkFDTCxPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07O29CQUV6QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLFlBQUE7NEJBVVMsT0FWSCxpQkFBaUI7MkJBQU87Ozs7Z0JBSTdDLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHdEQUF3RCxZQUFNOzt3QkFFN0QsSUFBSSxPQUFPLGlCQUFpQixnQkFBZ0I7d0JBQzVDLE1BQU0sd0JBQXdCO3dCQUM5QixLQUFLLFlBQVksR0FBRyxHQUFHOzt3QkFFdkIsT0FBTyx1QkFBdUIsYUFDekIscUJBQXFCLGdCQUFnQixJQUFJLEdBQUcsR0FBRzs7Ozs7O0dBZ0I3RCIsImZpbGUiOiJpZGVudGl0eVJlcXVlc3QvY29tcG9uZW50L0lkZW50aXR5UmVxdWVzdE1lc3NhZ2VzQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0TWVzc2FnZXNDb21wb25lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsICRjb21wb25lbnRDb250cm9sbGVyLCBpZGVudGl0eVJlcXVlc3Q7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXywgXyRjb21wb25lbnRDb250cm9sbGVyXywgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXyxcclxuICAgICAgICBJZGVudGl0eVJlcXVlc3QpID0+IHtcclxuXHJcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEgPSBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHJlcXVlc3RJZCkge1xyXG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHtcclxuICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdHJsID0gJGNvbXBvbmVudENvbnRyb2xsZXIoJ3NwSWRlbnRpdHlSZXF1ZXN0TWVzc2FnZXMnLCBudWxsLCBiaW5kaW5ncyk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgbm90IGluaXRpYWxpemVkIGNvcnJlY3RseScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRNZXNzYWdlcycsICgpID0+IHtcclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlIHRvIGdldCBtZXNzYWdlcycsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3QuaWQpO1xyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnZ2V0TWVzc2FnZXMnKTtcclxuICAgICAgICAgICAgY3RybC5nZXRNZXNzYWdlcygwLCA1LCB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0TWVzc2FnZXMpXHJcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHlSZXF1ZXN0LmlkLCAwLCA1LCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
