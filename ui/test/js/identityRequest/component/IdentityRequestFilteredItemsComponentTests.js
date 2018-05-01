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

            describe('IdentityRequestFilteredItemsComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    $scope = undefined,
                    element = undefined,
                    identityRequest = undefined,
                    identityRequestDataService = undefined,
                    columnKey = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_identityRequestService_, _$componentController_, _identityRequestTestData_, $rootScope, IdentityRequest, _identityRequestDataService_) {

                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    $scope = $rootScope;
                    identityRequestDataService = _identityRequestDataService_;
                    columnKey = 'someColumns';
                    spyOn(identityRequestDataService, 'getRequestItemsColumnConfigKey').and.returnValue(columnKey);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function createController(requestId) {
                    var bindings = {
                        requestId: requestId
                    };
                    var ctrl = $componentController('spIdentityRequestFilteredItems', null, bindings);
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

                describe('getFilteredItems', function () {
                    it('calls through identityRequestService to get filtered items', function () {

                        var ctrl = createController(identityRequest.id);
                        spyOn(identityRequestService, 'getFilteredItems');
                        ctrl.getFilteredItems(0, 5, undefined);

                        expect(identityRequestService.getFilteredItems).toHaveBeenCalledWith(identityRequest.id, 0, 5, undefined, columnKey);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0RmlsdGVyZWRJdGVtc0NvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUtyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5Q0FBeUMsWUFBVzs7Z0JBRXpELElBQUkseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSx1QkFBb0I7b0JBQUUsU0FBTTtvQkFDN0UsVUFBTztvQkFBRSxrQkFBZTtvQkFBRSw2QkFBMEI7b0JBQUUsWUFBUzs7Z0JBRW5FLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDBCQUEwQix3QkFBd0IsMkJBQ2pFLFlBQVksaUJBQWlCLDhCQUFpQzs7b0JBRTlELHVCQUF1QjtvQkFDdkIseUJBQXlCO29CQUN6QiwwQkFBMEI7b0JBQzFCLGtCQUFrQixJQUFJLGdCQUFnQix3QkFBd0I7b0JBQzlELFNBQVM7b0JBQ1QsNkJBQTZCO29CQUM3QixZQUFZO29CQUNaLE1BQU0sNEJBQTRCLGtDQUFrQyxJQUFJLFlBQVk7OztnQkFHeEYsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROztvQkFFWixJQUFJLFFBQVE7d0JBQ1IsT0FBTzs7OztnQkFJZixTQUFTLGlCQUFpQixXQUFXO29CQUNqQyxJQUFJLFdBQVc7d0JBQ1gsV0FBVzs7b0JBRWYsSUFBSSxPQUFPLHFCQUFxQixrQ0FBa0MsTUFBTTtvQkFDeEUsS0FBSztvQkFDTCxPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07O29CQUV6QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLFlBQUE7NEJBYVMsT0FiSCxpQkFBaUI7MkJBQU87Ozs7Z0JBSTdDLFNBQVMsb0JBQW9CLFlBQU07b0JBQy9CLEdBQUcsOERBQThELFlBQU07O3dCQUVuRSxJQUFJLE9BQU8saUJBQWlCLGdCQUFnQjt3QkFDNUMsTUFBTSx3QkFBd0I7d0JBQzlCLEtBQUssaUJBQWlCLEdBQUcsR0FBRzs7d0JBRTVCLE9BQU8sdUJBQXVCLGtCQUN6QixxQkFBcUIsZ0JBQWdCLElBQUksR0FBRyxHQUFHLFdBQVc7Ozs7OztHQW1CeEUiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RGaWx0ZXJlZEl0ZW1zQ29tcG9uZW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlSZXF1ZXN0RmlsdGVyZWRJdGVtc0NvbXBvbmVudCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSwgJGNvbXBvbmVudENvbnRyb2xsZXIsICRzY29wZSxcclxuICAgICAgICBlbGVtZW50LCBpZGVudGl0eVJlcXVlc3QsIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLCBjb2x1bW5LZXk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXywgXyRjb21wb25lbnRDb250cm9sbGVyXywgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXyxcclxuICAgICAgICAkcm9vdFNjb3BlLCBJZGVudGl0eVJlcXVlc3QsIF9pZGVudGl0eVJlcXVlc3REYXRhU2VydmljZV8pID0+IHtcclxuXHJcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEgPSBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IG5ldyBJZGVudGl0eVJlcXVlc3QoaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFlfUkVRVUVTVF8xKTtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlXztcclxuICAgICAgICBjb2x1bW5LZXkgPSAnc29tZUNvbHVtbnMnO1xyXG4gICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlLCAnZ2V0UmVxdWVzdEl0ZW1zQ29sdW1uQ29uZmlnS2V5JykuYW5kLnJldHVyblZhbHVlKGNvbHVtbktleSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIocmVxdWVzdElkKSB7XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0ge1xyXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RGaWx0ZXJlZEl0ZW1zJywgbnVsbCwgYmluZGluZ3MpO1xyXG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIGlmIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RmlsdGVyZWRJdGVtcycsICgpID0+IHtcclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlIHRvIGdldCBmaWx0ZXJlZCBpdGVtcycsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihpZGVudGl0eVJlcXVlc3QuaWQpO1xyXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnZ2V0RmlsdGVyZWRJdGVtcycpO1xyXG4gICAgICAgICAgICBjdHJsLmdldEZpbHRlcmVkSXRlbXMoMCwgNSwgdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldEZpbHRlcmVkSXRlbXMpXHJcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHlSZXF1ZXN0LmlkLCAwLCA1LCB1bmRlZmluZWQsIGNvbHVtbktleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
