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

            describe('IdentityRequestItemComponent', function () {

                var identityRequestService = undefined,
                    identityRequestTestData = undefined,
                    $componentController = undefined,
                    identityRequest = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    identityRequestItem = undefined,
                    element = undefined,
                    IdentityRequestItem = undefined,
                    IdentityRequest = undefined;

                beforeEach(module(identityRequestModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_identityRequestService_, _$componentController_, _$compile_, _identityRequestTestData_, $rootScope, _IdentityRequestItem_, _IdentityRequest_) {

                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestService = _identityRequestService_;
                    identityRequestTestData = _identityRequestTestData_;
                    IdentityRequestItem = _IdentityRequestItem_;
                    IdentityRequest = _IdentityRequest_;
                    identityRequest = new IdentityRequest(identityRequestTestData.IDENTITY_REQUEST_1);
                    identityRequestItem = new IdentityRequestItem(identityRequestTestData.IDENTITY_REQUEST_1.items[0]);
                    $scope = $rootScope.$new();
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile(requestItem, request) {
                    var eltDef = '<sp-identity-request-item sp-item="item" sp-request="request"/>';
                    element = angular.element(eltDef);

                    $scope.item = requestItem;
                    $scope.request = request;

                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                function createController(item, request) {
                    var bindings = {
                        item: item,
                        request: request
                    };
                    var ctrl = $componentController('spIdentityRequestItem', null, bindings);
                    ctrl.$onInit();
                    return ctrl;
                }

                describe('controller', function () {

                    it('throws if not initialized correctly', function () {
                        expect(function () {
                            return createController(null, identityRequest);
                        }).toThrow();
                        expect(function () {
                            return createController(identityRequestItem, null);
                        }).toThrow();
                    });
                });

                it('shows the identityRequestItem details', function () {
                    compile(identityRequestItem, identityRequest);
                    expect(element.children().length).toEqual(1);
                    expect(element[0].innerText.trim()).not.toContain(identityRequestItem.name);
                    expect(element[0].innerText.trim()).toContain(identityRequestItem.displayableValue);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbUNvbXBvbmVudFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQ0FBMEMsVUFBVSxTQUFTOzs7OztJQUtyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxnQ0FBZ0MsWUFBVzs7Z0JBRWhELElBQUkseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSx1QkFBb0I7b0JBQUUsa0JBQWU7b0JBQ3RGLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxzQkFBbUI7b0JBQUUsVUFBTztvQkFBRSxzQkFBbUI7b0JBQUUsa0JBQWU7O2dCQUV4RixXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQUMsMEJBQTBCLHdCQUF3QixZQUNqRSwyQkFBMkIsWUFBWSx1QkFBdUIsbUJBQXNCOztvQkFFcEYsV0FBVztvQkFDWCx1QkFBdUI7b0JBQ3ZCLHlCQUF5QjtvQkFDekIsMEJBQTBCO29CQUMxQixzQkFBc0I7b0JBQ3RCLGtCQUFrQjtvQkFDbEIsa0JBQWtCLElBQUksZ0JBQWdCLHdCQUF3QjtvQkFDOUQsc0JBQXNCLElBQUksb0JBQW9CLHdCQUF3QixtQkFBbUIsTUFBTTtvQkFDL0YsU0FBUyxXQUFXOzs7Z0JBR3hCLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7b0JBRVosSUFBSSxRQUFRO3dCQUNSLE9BQU87Ozs7Z0JBSWYsU0FBUyxRQUFRLGFBQWEsU0FBUztvQkFDbkMsSUFBSSxTQUFNO29CQUNWLFVBQVUsUUFBUSxRQUFROztvQkFFMUIsT0FBTyxPQUFPO29CQUNkLE9BQU8sVUFBVTs7b0JBRWpCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7b0JBRVAsT0FBTzs7O2dCQUdYLFNBQVMsaUJBQWlCLE1BQU0sU0FBUztvQkFDckMsSUFBSSxXQUFXO3dCQUNYLE1BQU07d0JBQ04sU0FBUzs7b0JBRWIsSUFBSSxPQUFPLHFCQUFxQix5QkFBeUIsTUFBTTtvQkFDL0QsS0FBSztvQkFDTCxPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07O29CQUV6QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLFlBQUE7NEJBZVMsT0FmSCxpQkFBaUIsTUFBTTsyQkFBa0I7d0JBQ3RELE9BQU8sWUFBQTs0QkFpQlMsT0FqQkgsaUJBQWlCLHFCQUFxQjsyQkFBTzs7OztnQkFJbEUsR0FBRyx5Q0FBeUMsWUFBTTtvQkFDOUMsUUFBUSxxQkFBcUI7b0JBQzdCLE9BQU8sUUFBUSxXQUFXLFFBQVEsUUFBUTtvQkFDMUMsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLElBQUksVUFBVSxvQkFBb0I7b0JBQ3RFLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxVQUFVLG9CQUFvQjs7Ozs7R0F1QnZFIiwiZmlsZSI6ImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbUNvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlSZXF1ZXN0TW9kdWxlIGZyb20gJ2lkZW50aXR5UmVxdWVzdC9JZGVudGl0eVJlcXVlc3RNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5UmVxdWVzdEl0ZW1Db21wb25lbnQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgaWRlbnRpdHlSZXF1ZXN0U2VydmljZSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsICRjb21wb25lbnRDb250cm9sbGVyLCBpZGVudGl0eVJlcXVlc3QsXHJcbiAgICAgICAgJGNvbXBpbGUsICRzY29wZSwgaWRlbnRpdHlSZXF1ZXN0SXRlbSwgZWxlbWVudCwgSWRlbnRpdHlSZXF1ZXN0SXRlbSwgSWRlbnRpdHlSZXF1ZXN0O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5UmVxdWVzdE1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV8sIF8kY29tcG9uZW50Q29udHJvbGxlcl8sIF8kY29tcGlsZV8sXHJcbiAgICAgICAgX2lkZW50aXR5UmVxdWVzdFRlc3REYXRhXywgJHJvb3RTY29wZSwgX0lkZW50aXR5UmVxdWVzdEl0ZW1fLCBfSWRlbnRpdHlSZXF1ZXN0XykgPT4ge1xyXG5cclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0U2VydmljZV87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEgPSBfaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgIElkZW50aXR5UmVxdWVzdEl0ZW0gPSBfSWRlbnRpdHlSZXF1ZXN0SXRlbV87XHJcbiAgICAgICAgSWRlbnRpdHlSZXF1ZXN0ID0gX0lkZW50aXR5UmVxdWVzdF87XHJcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0ID0gbmV3IElkZW50aXR5UmVxdWVzdChpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzEpO1xyXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdEl0ZW0gPSBuZXcgSWRlbnRpdHlSZXF1ZXN0SXRlbShpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUXzEuaXRlbXNbMF0pO1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCRzY29wZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlKHJlcXVlc3RJdGVtLCByZXF1ZXN0KSB7XHJcbiAgICAgICAgbGV0IGVsdERlZiA9IGA8c3AtaWRlbnRpdHktcmVxdWVzdC1pdGVtIHNwLWl0ZW09XCJpdGVtXCIgc3AtcmVxdWVzdD1cInJlcXVlc3RcIi8+YDtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XHJcblxyXG4gICAgICAgICRzY29wZS5pdGVtID0gcmVxdWVzdEl0ZW07XHJcbiAgICAgICAgJHNjb3BlLnJlcXVlc3QgPSByZXF1ZXN0O1xyXG5cclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoaXRlbSwgcmVxdWVzdCkge1xyXG4gICAgICAgIGxldCBiaW5kaW5ncyA9IHtcclxuICAgICAgICAgICAgaXRlbTogaXRlbSxcclxuICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGN0cmwgPSAkY29tcG9uZW50Q29udHJvbGxlcignc3BJZGVudGl0eVJlcXVlc3RJdGVtJywgbnVsbCwgYmluZGluZ3MpO1xyXG4gICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgndGhyb3dzIGlmIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKG51bGwsIGlkZW50aXR5UmVxdWVzdCkpLnRvVGhyb3coKTtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgbnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyB0aGUgaWRlbnRpdHlSZXF1ZXN0SXRlbSBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbXBpbGUoaWRlbnRpdHlSZXF1ZXN0SXRlbSwgaWRlbnRpdHlSZXF1ZXN0KTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lclRleHQudHJpbSgpKS5ub3QudG9Db250YWluKGlkZW50aXR5UmVxdWVzdEl0ZW0ubmFtZSk7XHJcbiAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKGlkZW50aXR5UmVxdWVzdEl0ZW0uZGlzcGxheWFibGVWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
