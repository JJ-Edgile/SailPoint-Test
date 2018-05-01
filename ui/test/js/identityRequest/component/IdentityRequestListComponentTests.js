System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var identityRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('IdentityRequestListComponent', function () {

                var identityRequestService = undefined,
                    ctrl = undefined,
                    SortOrder = undefined,
                    testService = undefined,
                    $scope = undefined,
                    identityRequestTestData = undefined;

                beforeEach(module(identityRequestModule, testModule));

                beforeEach(inject(function (_identityRequestService_, $componentController, _SortOrder_, _testService_, _$rootScope_, _identityRequestTestData_) {
                    identityRequestService = _identityRequestService_;
                    SortOrder = _SortOrder_;
                    testService = _testService_;
                    ctrl = $componentController('spIdentityRequestList', null, null);
                    identityRequestTestData = _identityRequestTestData_;
                    $scope = _$rootScope_;
                }));

                describe('getIdentityRequests', function () {

                    var identityRequestListResult = undefined,
                        start = undefined,
                        limit = undefined;
                    beforeEach(function () {
                        start = 0;
                        limit = 10;
                        identityRequestListResult = {
                            count: 1,
                            objects: [identityRequestTestData.IDENTITY_REQUEST_1]
                        };
                        spyOn(identityRequestService, 'getIdentityRequests').and.returnValue(testService.createPromise(false, identityRequestListResult, null));
                    });

                    it('calls through to identityRequestService', function () {
                        ctrl.getIdentityRequests(start, limit);
                        expect(identityRequestService.getIdentityRequests).toHaveBeenCalledWith(start, limit, undefined, undefined, undefined);
                    });

                    it('calls through to identityRequestService with sort order and filters', function () {
                        var start = 0,
                            limit = 10,
                            sortOrder = new SortOrder('type', true),
                            filters = { filter: 'this' },
                            searchTerm = 'what';
                        ctrl.getIdentityRequests(start, limit, filters, sortOrder, searchTerm);
                        expect(identityRequestService.getIdentityRequests).toHaveBeenCalledWith(start, limit, filters, sortOrder, searchTerm);
                    });
                });

                describe('getTotal', function () {
                    it('returns count from paging data', function () {
                        var total = 8;
                        ctrl.pagingData.setTotal(total);
                        expect(ctrl.getTotal()).toEqual(total);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0TGlzdENvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLM0g7O0lBRUEsSUFBSSx1QkFBdUI7SUFDM0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxnQ0FBZ0MsWUFBVzs7Z0JBRWhELElBQUkseUJBQXNCO29CQUFFLE9BQUk7b0JBQUUsWUFBUztvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQUUsMEJBQXVCOztnQkFFekYsV0FBVyxPQUFPLHVCQUF1Qjs7Z0JBRXpDLFdBQVcsT0FBTyxVQUFDLDBCQUEwQixzQkFBc0IsYUFBYSxlQUFlLGNBQzNGLDJCQUE4QjtvQkFDOUIseUJBQXlCO29CQUN6QixZQUFZO29CQUNaLGNBQWM7b0JBQ2QsT0FBTyxxQkFBcUIseUJBQXlCLE1BQU07b0JBQzNELDBCQUEwQjtvQkFDMUIsU0FBUzs7O2dCQUdiLFNBQVMsdUJBQXVCLFlBQU07O29CQUVsQyxJQUFJLDRCQUF5Qjt3QkFBRSxRQUFLO3dCQUFFLFFBQUs7b0JBQzNDLFdBQVcsWUFBVzt3QkFDbEIsUUFBUTt3QkFDUixRQUFRO3dCQUNSLDRCQUE0Qjs0QkFDeEIsT0FBTzs0QkFDUCxTQUFTLENBQUMsd0JBQXdCOzt3QkFFdEMsTUFBTSx3QkFBd0IsdUJBQXVCLElBQUksWUFDckQsWUFBWSxjQUFjLE9BQU8sMkJBQTJCOzs7b0JBR3BFLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELEtBQUssb0JBQW9CLE9BQU87d0JBQ2hDLE9BQU8sdUJBQXVCLHFCQUFxQixxQkFBcUIsT0FBTyxPQUMzRSxXQUFXLFdBQVc7OztvQkFHOUIsR0FBRyx1RUFBdUUsWUFBTTt3QkFDNUUsSUFBSSxRQUFROzRCQUFHLFFBQVE7NEJBQ25CLFlBQVksSUFBSSxVQUFVLFFBQVE7NEJBQ2xDLFVBQVUsRUFBRSxRQUFROzRCQUNwQixhQUFhO3dCQUNqQixLQUFLLG9CQUFvQixPQUFPLE9BQU8sU0FBUyxXQUFXO3dCQUMzRCxPQUFPLHVCQUF1QixxQkFBcUIscUJBQXFCLE9BQU8sT0FBTyxTQUNsRixXQUFXOzs7O2dCQUl2QixTQUFTLFlBQVksWUFBTTtvQkFDdkIsR0FBSSxrQ0FBa0MsWUFBTTt3QkFDeEMsSUFBSSxRQUFRO3dCQUNaLEtBQUssV0FBVyxTQUFTO3dCQUN6QixPQUFPLEtBQUssWUFBWSxRQUFROzs7Ozs7R0FrQnpDIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0TGlzdENvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5UmVxdWVzdExpc3RDb21wb25lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgY3RybCwgU29ydE9yZGVyLCB0ZXN0U2VydmljZSwgJHNjb3BlLCBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eVJlcXVlc3RNb2R1bGUsIHRlc3RNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfLCAkY29tcG9uZW50Q29udHJvbGxlciwgX1NvcnRPcmRlcl8sIF90ZXN0U2VydmljZV8sIF8kcm9vdFNjb3BlXyxcclxuICAgICAgICBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfKSA9PiB7XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSA9IF9pZGVudGl0eVJlcXVlc3RTZXJ2aWNlXztcclxuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcclxuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XHJcbiAgICAgICAgY3RybCA9ICRjb21wb25lbnRDb250cm9sbGVyKCdzcElkZW50aXR5UmVxdWVzdExpc3QnLCBudWxsLCBudWxsKTtcclxuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRJZGVudGl0eVJlcXVlc3RzJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0TGlzdFJlc3VsdCwgc3RhcnQsIGxpbWl0O1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgbGltaXQgPSAxMDtcclxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0TGlzdFJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0czogW2lkZW50aXR5UmVxdWVzdFRlc3REYXRhLklERU5USVRZX1JFUVVFU1RfMV1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgJ2dldElkZW50aXR5UmVxdWVzdHMnKS5hbmQucmV0dXJuVmFsdWUoXHJcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBpZGVudGl0eVJlcXVlc3RMaXN0UmVzdWx0LCBudWxsKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN0cmwuZ2V0SWRlbnRpdHlSZXF1ZXN0cyhzdGFydCwgbGltaXQpO1xyXG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5nZXRJZGVudGl0eVJlcXVlc3RzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChzdGFydCwgbGltaXQsXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gaWRlbnRpdHlSZXF1ZXN0U2VydmljZSB3aXRoIHNvcnQgb3JkZXIgYW5kIGZpbHRlcnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDAsIGxpbWl0ID0gMTAsXHJcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSBuZXcgU29ydE9yZGVyKCd0eXBlJywgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzID0geyBmaWx0ZXI6ICd0aGlzJyB9LFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSA9ICd3aGF0JztcclxuICAgICAgICAgICAgY3RybC5nZXRJZGVudGl0eVJlcXVlc3RzKHN0YXJ0LCBsaW1pdCwgZmlsdGVycywgc29ydE9yZGVyLCBzZWFyY2hUZXJtKTtcclxuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5UmVxdWVzdFNlcnZpY2UuZ2V0SWRlbnRpdHlSZXF1ZXN0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoc3RhcnQsIGxpbWl0LCBmaWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgc29ydE9yZGVyLCBzZWFyY2hUZXJtKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRUb3RhbCcsICgpID0+IHtcclxuICAgICAgICBpdCAoJ3JldHVybnMgY291bnQgZnJvbSBwYWdpbmcgZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsID0gODtcclxuICAgICAgICAgICAgY3RybC5wYWdpbmdEYXRhLnNldFRvdGFsKHRvdGFsKTtcclxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VG90YWwoKSkudG9FcXVhbCh0b3RhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
