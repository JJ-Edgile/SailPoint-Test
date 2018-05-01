System.register(['test/js/TestInitializer', 'common/aria/AriaModule'], function (_export) {
    'use strict';

    var ariaModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonAriaAriaModule) {
            ariaModule = _commonAriaAriaModule['default'];
        }],
        execute: function () {

            describe('AriaErrorsDirective', function () {

                var errorMsg1 = 'HERE IS AN ERROR',
                    errorMsg2 = 'messed up again!',
                    template = '<div id="ariaErrorsTestDiv">' + '  <sp-aria-errors></sp-aria-errors>' + '  <div id="someError" class="reader-error" ng-show="showSomeError">' + errorMsg1 + '  </div>' + '  <div id="anotherError" class="reader-error" ng-show="showAnotherError">' + '    {{ scopeText }} ' + '  </div>' + '</div>',
                    templateWithSelector = '<div id="ariaErrorsTestDiv">' + '  <sp-aria-errors sp-selector="#someError"></sp-aria-errors>' + '  <div id="someError" ng-show="showAnotherError">' + errorMsg1 + '  </div>' + '</div>',
                    alertElementSelector = 'div.sr-only',
                    scope,
                    compile,
                    timeoutService;

                beforeEach(module(ariaModule));

                beforeEach(inject(function ($rootScope, $compile, $timeout) {
                    compile = $compile;
                    scope = $rootScope.$new();
                    timeoutService = $timeout;
                    scope.showSomeError = false;
                    scope.showAnotherError = false;
                    scope.scopeText = errorMsg2;
                }));

                afterEach(function () {
                    // Remove anything we added to document
                    angular.element('#ariaErrorsTestDiv').remove();
                });

                var compileElement = function (template) {
                    var element = angular.element(template);

                    // Have to append it to the document before calling compile
                    // so angular.element calls in the directive will find the right stuff
                    angular.element(document.body).append(element);

                    compile(element)(scope);
                    scope.$apply();
                    timeoutService.flush();
                    return element;
                };

                it('should not contain the error divs with .reader-error initially', function () {
                    var element = compileElement(template);
                    expect(element.find(alertElementSelector).length).toBe(1);
                    expect(element.find(alertElementSelector).children('span').length).toBe(0);
                });

                it('should find error div if selector is defined', function () {
                    var element = compileElement(templateWithSelector);
                    scope.showAnotherError = true;
                    scope.$apply();
                    scope.$apply();
                    expect(element.find(alertElementSelector).children('span').length).toBe(1);
                });

                it('should not contain error if hidden', function () {
                    var element = compileElement(template);
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg1)).toBe(-1);
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg2)).toBe(-1);
                });

                it('should contain error if shown', function () {
                    var element = compileElement(template);
                    scope.showSomeError = true;
                    // Need two cycles, one to update ng-show and one to trigger the $watch
                    scope.$apply();
                    scope.$apply();
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg1)).not.toBe(-1);
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg2)).toBe(-1);
                });

                it('should update error if text is changed', function () {
                    var element = compileElement(template),
                        errorMsg2Updated = 'whatever sucka';
                    scope.showAnotherError = true;
                    // Need two cycles, one to update ng-show and one to trigger the $watch
                    scope.$apply();
                    scope.$apply();
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg2)).not.toBe(-1);
                    scope.scopeText = errorMsg2Updated;
                    // Need two cycles, one to update ng-show and one to trigger the $watch
                    scope.$apply();
                    scope.$apply();
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg2)).toBe(-1);
                    expect(element.find(alertElementSelector).text().indexOf(errorMsg2Updated)).not.toBe(-1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9hcmlhL0FyaWFFcnJvcnNEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUExRjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsdUJBQXVCLFlBQVc7O2dCQUV2QyxJQUFJLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixXQUNJLGlDQUNBLHdDQUNBLHdFQUNLLFlBQ0wsYUFDQSw4RUFDQSx5QkFDQSxhQUNBO29CQUVKLHVCQUNJLGlDQUNBLGlFQUNBLHNEQUNJLFlBQ0osYUFDQTtvQkFFSix1QkFBdUI7b0JBQ3ZCO29CQUFPO29CQUFTOztnQkFFcEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxVQUFVLFVBQVU7b0JBQ3ZELFVBQVU7b0JBQ1YsUUFBUSxXQUFXO29CQUNuQixpQkFBaUI7b0JBQ2pCLE1BQU0sZ0JBQWdCO29CQUN0QixNQUFNLG1CQUFtQjtvQkFDekIsTUFBTSxZQUFZOzs7Z0JBR3RCLFVBQVUsWUFBVzs7b0JBRWpCLFFBQVEsUUFBUSxzQkFBc0I7OztnQkFHMUMsSUFBSSxpQkFBaUIsVUFBUyxVQUFVO29CQUNwQyxJQUFJLFVBQVUsUUFBUSxRQUFROzs7O29CQUk5QixRQUFRLFFBQVEsU0FBUyxNQUFNLE9BQU87O29CQUV0QyxRQUFRLFNBQVM7b0JBQ2pCLE1BQU07b0JBQ04sZUFBZTtvQkFDZixPQUFPOzs7Z0JBR1gsR0FBRyxrRUFBa0UsWUFBVztvQkFDNUUsSUFBSSxVQUFVLGVBQWU7b0JBQzdCLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixRQUFRLEtBQUs7b0JBQ3ZELE9BQU8sUUFBUSxLQUFLLHNCQUFzQixTQUFTLFFBQVEsUUFBUSxLQUFLOzs7Z0JBRzVFLEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELElBQUksVUFBVSxlQUFlO29CQUM3QixNQUFNLG1CQUFtQjtvQkFDekIsTUFBTTtvQkFDTixNQUFNO29CQUNOLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixTQUFTLFFBQVEsUUFBUSxLQUFLOzs7Z0JBRzVFLEdBQUcsc0NBQXNDLFlBQVc7b0JBQ2hELElBQUksVUFBVSxlQUFlO29CQUM3QixPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxRQUFRLFlBQVksS0FBSyxDQUFDO29CQUMzRSxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxRQUFRLFlBQVksS0FBSyxDQUFDOzs7Z0JBRy9FLEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLElBQUksVUFBVSxlQUFlO29CQUM3QixNQUFNLGdCQUFnQjs7b0JBRXRCLE1BQU07b0JBQ04sTUFBTTtvQkFDTixPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxRQUFRLFlBQVksSUFBSSxLQUFLLENBQUM7b0JBQy9FLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixPQUFPLFFBQVEsWUFBWSxLQUFLLENBQUM7OztnQkFHL0UsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsSUFBSSxVQUFVLGVBQWU7d0JBQ3pCLG1CQUFtQjtvQkFDdkIsTUFBTSxtQkFBbUI7O29CQUV6QixNQUFNO29CQUNOLE1BQU07b0JBQ04sT0FBTyxRQUFRLEtBQUssc0JBQXNCLE9BQU8sUUFBUSxZQUFZLElBQUksS0FBSyxDQUFDO29CQUMvRSxNQUFNLFlBQVk7O29CQUVsQixNQUFNO29CQUNOLE1BQU07b0JBQ04sT0FBTyxRQUFRLEtBQUssc0JBQXNCLE9BQU8sUUFBUSxZQUFZLEtBQUssQ0FBQztvQkFDM0UsT0FBTyxRQUFRLEtBQUssc0JBQXNCLE9BQU8sUUFBUSxtQkFBbUIsSUFBSSxLQUFLLENBQUM7Ozs7O0dBTDNGIiwiZmlsZSI6ImNvbW1vbi9hcmlhL0FyaWFFcnJvcnNEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYXJpYU1vZHVsZSBmcm9tICdjb21tb24vYXJpYS9BcmlhTW9kdWxlJztcblxuZGVzY3JpYmUoJ0FyaWFFcnJvcnNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBlcnJvck1zZzEgPSAnSEVSRSBJUyBBTiBFUlJPUicsXG4gICAgICAgIGVycm9yTXNnMiA9ICdtZXNzZWQgdXAgYWdhaW4hJyxcbiAgICAgICAgdGVtcGxhdGUgPVxuICAgICAgICAgICAgJzxkaXYgaWQ9XCJhcmlhRXJyb3JzVGVzdERpdlwiPicgK1xuICAgICAgICAgICAgJyAgPHNwLWFyaWEtZXJyb3JzPjwvc3AtYXJpYS1lcnJvcnM+JyArXG4gICAgICAgICAgICAnICA8ZGl2IGlkPVwic29tZUVycm9yXCIgY2xhc3M9XCJyZWFkZXItZXJyb3JcIiBuZy1zaG93PVwic2hvd1NvbWVFcnJvclwiPicgK1xuICAgICAgICAgICAgICAgICBlcnJvck1zZzEgK1xuICAgICAgICAgICAgJyAgPC9kaXY+JyArXG4gICAgICAgICAgICAnICA8ZGl2IGlkPVwiYW5vdGhlckVycm9yXCIgY2xhc3M9XCJyZWFkZXItZXJyb3JcIiBuZy1zaG93PVwic2hvd0Fub3RoZXJFcnJvclwiPicgK1xuICAgICAgICAgICAgJyAgICB7eyBzY29wZVRleHQgfX0gJyArXG4gICAgICAgICAgICAnICA8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuXG4gICAgICAgIHRlbXBsYXRlV2l0aFNlbGVjdG9yID1cbiAgICAgICAgICAgICc8ZGl2IGlkPVwiYXJpYUVycm9yc1Rlc3REaXZcIj4nICtcbiAgICAgICAgICAgICcgIDxzcC1hcmlhLWVycm9ycyBzcC1zZWxlY3Rvcj1cIiNzb21lRXJyb3JcIj48L3NwLWFyaWEtZXJyb3JzPicgK1xuICAgICAgICAgICAgJyAgPGRpdiBpZD1cInNvbWVFcnJvclwiIG5nLXNob3c9XCJzaG93QW5vdGhlckVycm9yXCI+JyArXG4gICAgICAgICAgICAgICAgZXJyb3JNc2cxICtcbiAgICAgICAgICAgICcgIDwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicsXG5cbiAgICAgICAgYWxlcnRFbGVtZW50U2VsZWN0b3IgPSAnZGl2LnNyLW9ubHknLFxuICAgICAgICBzY29wZSwgY29tcGlsZSwgdGltZW91dFNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhcmlhTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCAkY29tcGlsZSwgJHRpbWVvdXQpIHtcbiAgICAgICAgY29tcGlsZSA9ICRjb21waWxlO1xuICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICB0aW1lb3V0U2VydmljZSA9ICR0aW1lb3V0O1xuICAgICAgICBzY29wZS5zaG93U29tZUVycm9yID0gZmFsc2U7XG4gICAgICAgIHNjb3BlLnNob3dBbm90aGVyRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgc2NvcGUuc2NvcGVUZXh0ID0gZXJyb3JNc2cyO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFueXRoaW5nIHdlIGFkZGVkIHRvIGRvY3VtZW50XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2FyaWFFcnJvcnNUZXN0RGl2JykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgY29tcGlsZUVsZW1lbnQgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgLy8gSGF2ZSB0byBhcHBlbmQgaXQgdG8gdGhlIGRvY3VtZW50IGJlZm9yZSBjYWxsaW5nIGNvbXBpbGVcbiAgICAgICAgLy8gc28gYW5ndWxhci5lbGVtZW50IGNhbGxzIGluIHRoZSBkaXJlY3RpdmUgd2lsbCBmaW5kIHRoZSByaWdodCBzdHVmZlxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKGVsZW1lbnQpO1xuXG4gICAgICAgIGNvbXBpbGUoZWxlbWVudCkoc2NvcGUpO1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgdGltZW91dFNlcnZpY2UuZmx1c2goKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIGl0KCdzaG91bGQgbm90IGNvbnRhaW4gdGhlIGVycm9yIGRpdnMgd2l0aCAucmVhZGVyLWVycm9yIGluaXRpYWxseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNvbXBpbGVFbGVtZW50KHRlbXBsYXRlKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZChhbGVydEVsZW1lbnRTZWxlY3RvcikubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKGFsZXJ0RWxlbWVudFNlbGVjdG9yKS5jaGlsZHJlbignc3BhbicpLmxlbmd0aCkudG9CZSgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZmluZCBlcnJvciBkaXYgaWYgc2VsZWN0b3IgaXMgZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNvbXBpbGVFbGVtZW50KHRlbXBsYXRlV2l0aFNlbGVjdG9yKTtcbiAgICAgICAgc2NvcGUuc2hvd0Fub3RoZXJFcnJvciA9IHRydWU7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZChhbGVydEVsZW1lbnRTZWxlY3RvcikuY2hpbGRyZW4oJ3NwYW4nKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBjb250YWluIGVycm9yIGlmIGhpZGRlbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNvbXBpbGVFbGVtZW50KHRlbXBsYXRlKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZChhbGVydEVsZW1lbnRTZWxlY3RvcikudGV4dCgpLmluZGV4T2YoZXJyb3JNc2cxKSkudG9CZSgtMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoYWxlcnRFbGVtZW50U2VsZWN0b3IpLnRleHQoKS5pbmRleE9mKGVycm9yTXNnMikpLnRvQmUoLTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjb250YWluIGVycm9yIGlmIHNob3duJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY29tcGlsZUVsZW1lbnQodGVtcGxhdGUpO1xuICAgICAgICBzY29wZS5zaG93U29tZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgLy8gTmVlZCB0d28gY3ljbGVzLCBvbmUgdG8gdXBkYXRlIG5nLXNob3cgYW5kIG9uZSB0byB0cmlnZ2VyIHRoZSAkd2F0Y2hcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKGFsZXJ0RWxlbWVudFNlbGVjdG9yKS50ZXh0KCkuaW5kZXhPZihlcnJvck1zZzEpKS5ub3QudG9CZSgtMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoYWxlcnRFbGVtZW50U2VsZWN0b3IpLnRleHQoKS5pbmRleE9mKGVycm9yTXNnMikpLnRvQmUoLTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1cGRhdGUgZXJyb3IgaWYgdGV4dCBpcyBjaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY29tcGlsZUVsZW1lbnQodGVtcGxhdGUpLFxuICAgICAgICAgICAgZXJyb3JNc2cyVXBkYXRlZCA9ICd3aGF0ZXZlciBzdWNrYSc7XG4gICAgICAgIHNjb3BlLnNob3dBbm90aGVyRXJyb3IgPSB0cnVlO1xuICAgICAgICAvLyBOZWVkIHR3byBjeWNsZXMsIG9uZSB0byB1cGRhdGUgbmctc2hvdyBhbmQgb25lIHRvIHRyaWdnZXIgdGhlICR3YXRjaFxuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoYWxlcnRFbGVtZW50U2VsZWN0b3IpLnRleHQoKS5pbmRleE9mKGVycm9yTXNnMikpLm5vdC50b0JlKC0xKTtcbiAgICAgICAgc2NvcGUuc2NvcGVUZXh0ID0gZXJyb3JNc2cyVXBkYXRlZDtcbiAgICAgICAgLy8gTmVlZCB0d28gY3ljbGVzLCBvbmUgdG8gdXBkYXRlIG5nLXNob3cgYW5kIG9uZSB0byB0cmlnZ2VyIHRoZSAkd2F0Y2hcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKGFsZXJ0RWxlbWVudFNlbGVjdG9yKS50ZXh0KCkuaW5kZXhPZihlcnJvck1zZzIpKS50b0JlKC0xKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZChhbGVydEVsZW1lbnRTZWxlY3RvcikudGV4dCgpLmluZGV4T2YoZXJyb3JNc2cyVXBkYXRlZCkpLm5vdC50b0JlKC0xKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
