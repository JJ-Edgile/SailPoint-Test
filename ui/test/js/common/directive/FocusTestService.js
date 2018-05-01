System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            angular.module(directiveModule).

            /**
             * A service to help with testing focusing on the correct elements.
             *
             * NOTE: An element can only receive focus if it has been appended to the body!
             */
            factory('focusTestService', ["$document", function ($document) {

                var svc = {};

                /**
                 * @return {Boolean} True if the given element is focused, false otherwise.
                 */
                svc.isFocused = function (elt) {
                    /* Would like to us is(':focus') here, but phantomJS does not seem to like it */
                    return elt === $document[0].activeElement;
                };

                /**
                 * Fail the test if the given element is not focused.
                 */
                svc.assertFocused = function (elt) {
                    expect(this.isFocused(elt)).toEqual(true);
                };

                /**
                 * Fail the test if the given element is focused.
                 */
                svc.assertNotFocused = function (elt) {
                    expect(this.isFocused(elt)).toEqual(false);
                };

                return svc;
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRm9jdXNUZXN0U2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUFwRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFIN0IsUUFBUSxPQUFPOzs7Ozs7O1lBT2YsUUFBUSxrQ0FBb0IsVUFBUyxXQUFXOztnQkFFNUMsSUFBSSxNQUFNOzs7OztnQkFLVixJQUFJLFlBQVksVUFBUyxLQUFLOztvQkFFMUIsT0FBUSxRQUFRLFVBQVUsR0FBRzs7Ozs7O2dCQU1qQyxJQUFJLGdCQUFnQixVQUFTLEtBQUs7b0JBQzlCLE9BQU8sS0FBSyxVQUFVLE1BQU0sUUFBUTs7Ozs7O2dCQU14QyxJQUFJLG1CQUFtQixVQUFTLEtBQUs7b0JBQ2pDLE9BQU8sS0FBSyxVQUFVLE1BQU0sUUFBUTs7O2dCQUd4QyxPQUFPOzs7O0dBU1IiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Gb2N1c1Rlc3RTZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoZGlyZWN0aXZlTW9kdWxlKS5cclxuXHJcbi8qKlxyXG4gKiBBIHNlcnZpY2UgdG8gaGVscCB3aXRoIHRlc3RpbmcgZm9jdXNpbmcgb24gdGhlIGNvcnJlY3QgZWxlbWVudHMuXHJcbiAqXHJcbiAqIE5PVEU6IEFuIGVsZW1lbnQgY2FuIG9ubHkgcmVjZWl2ZSBmb2N1cyBpZiBpdCBoYXMgYmVlbiBhcHBlbmRlZCB0byB0aGUgYm9keSFcclxuICovXHJcbmZhY3RvcnkoJ2ZvY3VzVGVzdFNlcnZpY2UnLCBmdW5jdGlvbigkZG9jdW1lbnQpIHtcclxuXHJcbiAgICB2YXIgc3ZjID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGZvY3VzZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqL1xyXG4gICAgc3ZjLmlzRm9jdXNlZCA9IGZ1bmN0aW9uKGVsdCkge1xyXG4gICAgICAgIC8qIFdvdWxkIGxpa2UgdG8gdXMgaXMoJzpmb2N1cycpIGhlcmUsIGJ1dCBwaGFudG9tSlMgZG9lcyBub3Qgc2VlbSB0byBsaWtlIGl0ICovXHJcbiAgICAgICAgcmV0dXJuIChlbHQgPT09ICRkb2N1bWVudFswXS5hY3RpdmVFbGVtZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWlsIHRoZSB0ZXN0IGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIG5vdCBmb2N1c2VkLlxyXG4gICAgICovXHJcbiAgICBzdmMuYXNzZXJ0Rm9jdXNlZCA9IGZ1bmN0aW9uKGVsdCkge1xyXG4gICAgICAgIGV4cGVjdCh0aGlzLmlzRm9jdXNlZChlbHQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZhaWwgdGhlIHRlc3QgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZm9jdXNlZC5cclxuICAgICAqL1xyXG4gICAgc3ZjLmFzc2VydE5vdEZvY3VzZWQgPSBmdW5jdGlvbihlbHQpIHtcclxuICAgICAgICBleHBlY3QodGhpcy5pc0ZvY3VzZWQoZWx0KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBzdmM7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
