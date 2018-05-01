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

            describe('IdentityRequestInteractionsComponent', function () {

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
                    var ctrl = $componentController('spIdentityRequestInteractions', null, bindings);
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

                describe('getInteractions', function () {
                    it('calls through identityRequestService to get interactions', function () {

                        var ctrl = createController(identityRequest.id);
                        spyOn(identityRequestService, 'getInteractions');
                        ctrl.getInteractions(0, 5, undefined);

                        expect(identityRequestService.getInteractions).toHaveBeenCalledWith(identityRequest.id, 0, 5, undefined);
                    });
                });

                describe('getInteractionsDataTableConfig', function () {
                    it('gets the table config with default sortOrder set', function () {
                        var ctrl = createController(identityRequest.id);
                        var config = ctrl.getInteractionsDataTableConfig();
                        expect(config.pageState.sortOrder.sorts[0].property).toEqual('completeDate');
                        expect(config.pageState.sortOrder.sorts[0].direction).toEqual('ASC');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zQ29tcG9uZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7Ozs7O0lBS3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLHdDQUF3QyxZQUFXOztnQkFFeEQsSUFBSSx5QkFBc0I7b0JBQUUsMEJBQXVCO29CQUFFLHVCQUFvQjtvQkFBRSxrQkFBZTs7Z0JBRTFGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDBCQUEwQix3QkFBd0IsMkJBQ2pFLGlCQUFvQjs7b0JBRXBCLHVCQUF1QjtvQkFDdkIseUJBQXlCO29CQUN6QiwwQkFBMEI7b0JBQzFCLGtCQUFrQixJQUFJLGdCQUFnQix3QkFBd0I7OztnQkFHbEUsU0FBUyxpQkFBaUIsV0FBVztvQkFDakMsSUFBSSxXQUFXO3dCQUNYLFdBQVc7O29CQUVmLElBQUksT0FBTyxxQkFBcUIsaUNBQWlDLE1BQU07b0JBQ3ZFLEtBQUs7b0JBQ0wsT0FBTzs7O2dCQUdYLFNBQVMsY0FBYyxZQUFNOztvQkFFekIsR0FBRyx1Q0FBdUMsWUFBTTt3QkFDNUMsT0FBTyxZQUFBOzRCQVVTLE9BVkgsaUJBQWlCOzJCQUFPOzs7O2dCQUk3QyxTQUFTLG1CQUFtQixZQUFNO29CQUM5QixHQUFHLDREQUE0RCxZQUFNOzt3QkFFakUsSUFBSSxPQUFPLGlCQUFpQixnQkFBZ0I7d0JBQzVDLE1BQU0sd0JBQXdCO3dCQUM5QixLQUFLLGdCQUFnQixHQUFHLEdBQUc7O3dCQUUzQixPQUFPLHVCQUF1QixpQkFDekIscUJBQXFCLGdCQUFnQixJQUFJLEdBQUcsR0FBRzs7OztnQkFLNUQsU0FBUyxrQ0FBa0MsWUFBTTtvQkFDN0MsR0FBRyxvREFBb0QsWUFBTTt3QkFDekQsSUFBSSxPQUFPLGlCQUFpQixnQkFBZ0I7d0JBQzVDLElBQUksU0FBUyxLQUFLO3dCQUNsQixPQUFPLE9BQU8sVUFBVSxVQUFVLE1BQU0sR0FBRyxVQUFVLFFBQVE7d0JBQzdELE9BQU8sT0FBTyxVQUFVLFVBQVUsTUFBTSxHQUFHLFdBQVcsUUFBUTs7Ozs7O0dBZXZFIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0SW50ZXJhY3Rpb25zQ29tcG9uZW50JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLCAkY29tcG9uZW50Q29udHJvbGxlciwgaWRlbnRpdHlSZXF1ZXN0O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV8sIF8kY29tcG9uZW50Q29udHJvbGxlcl8sIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sXHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0KSA9PiB7XHJcblxyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihyZXF1ZXN0SWQpIHtcclxuICAgICAgICBsZXQgYmluZGluZ3MgPSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY3RybCA9ICRjb21wb25lbnRDb250cm9sbGVyKCdzcElkZW50aXR5UmVxdWVzdEludGVyYWN0aW9ucycsIG51bGwsIGJpbmRpbmdzKTtcclxuICAgICAgICBjdHJsLiRvbkluaXQoKTtcclxuICAgICAgICByZXR1cm4gY3RybDtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyBpZiBub3QgaW5pdGlhbGl6ZWQgY29ycmVjdGx5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldEludGVyYWN0aW9ucycsICgpID0+IHtcclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlIHRvIGdldCBpbnRlcmFjdGlvbnMnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoaWRlbnRpdHlSZXF1ZXN0LmlkKTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ2dldEludGVyYWN0aW9ucycpO1xyXG4gICAgICAgICAgICBjdHJsLmdldEludGVyYWN0aW9ucygwLCA1LCB1bmRlZmluZWQpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0SW50ZXJhY3Rpb25zKVxyXG4gICAgICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5UmVxdWVzdC5pZCwgMCwgNSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0SW50ZXJhY3Rpb25zRGF0YVRhYmxlQ29uZmlnJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdnZXRzIHRoZSB0YWJsZSBjb25maWcgd2l0aCBkZWZhdWx0IHNvcnRPcmRlciBzZXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3QuaWQpO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gY3RybC5nZXRJbnRlcmFjdGlvbnNEYXRhVGFibGVDb25maWcoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUuc29ydE9yZGVyLnNvcnRzWzBdLnByb3BlcnR5KS50b0VxdWFsKCdjb21wbGV0ZURhdGUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUuc29ydE9yZGVyLnNvcnRzWzBdLmRpcmVjdGlvbikudG9FcXVhbCgnQVNDJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
