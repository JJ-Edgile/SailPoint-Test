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

            describe('IdentityRequestUnfilteredItemsComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    $scope = undefined,
                    element = undefined,
                    identityRequest = undefined,
                    identityRequestDataService = undefined,
                    spModal = undefined,
                    columnKey = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_identityRequestService_, _$componentController_, _identityRequestTestData_, $rootScope, IdentityRequest, _spModal_, _identityRequestDataService_) {

                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    spModal = _spModal_;
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
                    var ctrl = $componentController('spIdentityRequestUnfilteredItems', null, bindings);
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

                describe('getUnfilteredItems', function () {
                    it('calls through identityRequestService to get unfiltered items', function () {
                        var ctrl = createController(identityRequest.id);
                        spyOn(identityRequestService, 'getUnFilteredItems');
                        ctrl.getUnfilteredItems(0, 5, undefined);

                        expect(identityRequestService.getUnFilteredItems).toHaveBeenCalledWith(identityRequest.id, 0, 5, undefined, columnKey);
                    });
                });

                describe('showPolicyViolationsDialog()', function () {

                    it('opens the policy violations dialog', function () {
                        var ctrl = createController(identityRequest.id);
                        spyOn(spModal, 'open');
                        spyOn(ctrl, 'getPolicyViolations').and.returnValue(identityRequest.policyViolations);
                        ctrl.showPolicyViolationsDialog();
                        expect(spModal.open).toHaveBeenCalled();
                        var spModalArgs = spModal.open.calls.mostRecent().args;
                        expect(spModalArgs[0].resolve.policyViolations).toBeDefined();
                        expect(spModalArgs[0].resolve.policyViolations()).toEqual(identityRequest.policyViolations);
                        expect(spModalArgs[0].controller).toEqual('IdentityRequestPolicyViolationsDialogCtrl');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0VW5maWx0ZXJlZEl0ZW1zQ29tcG9uZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7Ozs7O0lBS3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJDQUEyQyxZQUFXOztnQkFFM0QsSUFBSSx5QkFBc0I7b0JBQUUsMEJBQXVCO29CQUFFLHVCQUFvQjtvQkFBRSxTQUFNO29CQUM3RSxVQUFPO29CQUFFLGtCQUFlO29CQUFFLDZCQUEwQjtvQkFBRSxVQUFPO29CQUFFLFlBQVM7O2dCQUU1RSxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLHdCQUF3QiwyQkFDakUsWUFBWSxpQkFBaUIsV0FBVyw4QkFBaUM7O29CQUV6RSx1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsMEJBQTBCO29CQUMxQixrQkFBa0IsSUFBSSxnQkFBZ0Isd0JBQXdCO29CQUM5RCxVQUFVO29CQUNWLFNBQVM7b0JBQ1QsNkJBQTZCO29CQUM3QixZQUFZO29CQUNaLE1BQU0sNEJBQTRCLGtDQUFrQyxJQUFJLFlBQVk7OztnQkFHeEYsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROztvQkFFWixJQUFJLFFBQVE7d0JBQ1IsT0FBTzs7OztnQkFJZixTQUFTLGlCQUFpQixXQUFXO29CQUNqQyxJQUFJLFdBQVc7d0JBQ1gsV0FBVzs7b0JBRWYsSUFBSSxPQUFPLHFCQUFxQixvQ0FBb0MsTUFBTTtvQkFDMUUsS0FBSztvQkFDTCxPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07O29CQUV6QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLFlBQUE7NEJBY1MsT0FkSCxpQkFBaUI7MkJBQU87Ozs7Z0JBSTdDLFNBQVMsc0JBQXNCLFlBQU07b0JBQ2pDLEdBQUcsZ0VBQWdFLFlBQU07d0JBQ3JFLElBQUksT0FBTyxpQkFBaUIsZ0JBQWdCO3dCQUM1QyxNQUFNLHdCQUF3Qjt3QkFDOUIsS0FBSyxtQkFBbUIsR0FBRyxHQUFHOzt3QkFFOUIsT0FBTyx1QkFBdUIsb0JBQ3pCLHFCQUFxQixnQkFBZ0IsSUFBSSxHQUFHLEdBQUcsV0FBVzs7OztnQkFJdkUsU0FBUyxnQ0FBZ0MsWUFBTTs7b0JBRTNDLEdBQUcsc0NBQXNDLFlBQU07d0JBQzNDLElBQUksT0FBTyxpQkFBaUIsZ0JBQWdCO3dCQUM1QyxNQUFNLFNBQVM7d0JBQ2YsTUFBTSxNQUFNLHVCQUF1QixJQUFJLFlBQVksZ0JBQWdCO3dCQUNuRSxLQUFLO3dCQUNMLE9BQU8sUUFBUSxNQUFNO3dCQUNyQixJQUFJLGNBQWMsUUFBUSxLQUFLLE1BQU0sYUFBYTt3QkFDbEQsT0FBTyxZQUFZLEdBQUcsUUFBUSxrQkFBa0I7d0JBQ2hELE9BQU8sWUFBWSxHQUFHLFFBQVEsb0JBQW9CLFFBQVEsZ0JBQWdCO3dCQUMxRSxPQUFPLFlBQVksR0FBRyxZQUFZLFFBQVE7Ozs7OztHQW9CbkQiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RVbmZpbHRlcmVkSXRlbXNDb21wb25lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXR5UmVxdWVzdE1vZHVsZSBmcm9tICdpZGVudGl0eVJlcXVlc3QvSWRlbnRpdHlSZXF1ZXN0TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVJlcXVlc3RVbmZpbHRlcmVkSXRlbXNDb21wb25lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsICRjb21wb25lbnRDb250cm9sbGVyLCAkc2NvcGUsXG4gICAgICAgIGVsZW1lbnQsIGlkZW50aXR5UmVxdWVzdCwgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UsIHNwTW9kYWwsIGNvbHVtbktleTtcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXywgXyRjb21wb25lbnRDb250cm9sbGVyXywgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXyxcbiAgICAgICAgJHJvb3RTY29wZSwgSWRlbnRpdHlSZXF1ZXN0LCBfc3BNb2RhbF8sIF9pZGVudGl0eVJlcXVlc3REYXRhU2VydmljZV8pID0+IHtcblxyXG4gICAgICAgICRjb21wb25lbnRDb250cm9sbGVyID0gXyRjb21wb25lbnRDb250cm9sbGVyXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFRlc3REYXRhID0gX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXztcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3QgPSBuZXcgSWRlbnRpdHlSZXF1ZXN0KGlkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMSk7XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2VfO1xyXG4gICAgICAgIGNvbHVtbktleSA9ICdzb21lQ29sdW1ucyc7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UsICdnZXRSZXF1ZXN0SXRlbXNDb2x1bW5Db25maWdLZXknKS5hbmQucmV0dXJuVmFsdWUoY29sdW1uS2V5KTtcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIocmVxdWVzdElkKSB7XHJcbiAgICAgICAgbGV0IGJpbmRpbmdzID0ge1xyXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RVbmZpbHRlcmVkSXRlbXMnLCBudWxsLCBiaW5kaW5ncyk7XHJcbiAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgbm90IGluaXRpYWxpemVkIGNvcnJlY3RseScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRVbmZpbHRlcmVkSXRlbXMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggaWRlbnRpdHlSZXF1ZXN0U2VydmljZSB0byBnZXQgdW5maWx0ZXJlZCBpdGVtcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGlkZW50aXR5UmVxdWVzdC5pZCk7XHJcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdnZXRVbkZpbHRlcmVkSXRlbXMnKTtcclxuICAgICAgICAgICAgY3RybC5nZXRVbmZpbHRlcmVkSXRlbXMoMCwgNSwgdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLmdldFVuRmlsdGVyZWRJdGVtcylcclxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChpZGVudGl0eVJlcXVlc3QuaWQsIDAsIDUsIHVuZGVmaW5lZCwgY29sdW1uS2V5KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93UG9saWN5VmlvbGF0aW9uc0RpYWxvZygpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgdGhlIHBvbGljeSB2aW9sYXRpb25zIGRpYWxvZycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGlkZW50aXR5UmVxdWVzdC5pZCk7XHJcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XHJcbiAgICAgICAgICAgIHNweU9uKGN0cmwsICdnZXRQb2xpY3lWaW9sYXRpb25zJykuYW5kLnJldHVyblZhbHVlKGlkZW50aXR5UmVxdWVzdC5wb2xpY3lWaW9sYXRpb25zKTtcclxuICAgICAgICAgICAgY3RybC5zaG93UG9saWN5VmlvbGF0aW9uc0RpYWxvZygpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGxldCBzcE1vZGFsQXJncyA9IHNwTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxBcmdzWzBdLnJlc29sdmUucG9saWN5VmlvbGF0aW9ucykudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxBcmdzWzBdLnJlc29sdmUucG9saWN5VmlvbGF0aW9ucygpKS50b0VxdWFsKGlkZW50aXR5UmVxdWVzdC5wb2xpY3lWaW9sYXRpb25zKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxBcmdzWzBdLmNvbnRyb2xsZXIpLnRvRXF1YWwoJ0lkZW50aXR5UmVxdWVzdFBvbGljeVZpb2xhdGlvbnNEaWFsb2dDdHJsJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
