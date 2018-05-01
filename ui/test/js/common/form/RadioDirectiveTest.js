System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /*
     * Within PhantomJS whatever representation they are using for the DOM
     * does not allow you to call click() on a label. i.e. it is undefined.
     * Dispatching a click event does, however, so yeah PhantomJS... whatever <sarcasm>
     */
    'use strict';

    var formModule, clickElement;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            clickElement = function (el) {
                var ev = document.createEvent('MouseEvent');
                ev.initMouseEvent('click', true, /* bubble */true, /* cancelable */
                window, null, 0, 0, 0, 0, /* coordinates */
                false, false, false, false, /* modifier keys */
                0, /*left*/null);
                el.dispatchEvent(ev);
            };

            /**
             * Tests for the RadioDirective.
             */
            describe('RadioDirective', function () {

                var scope, compile;

                // Let the tests know we'll use the form module.
                beforeEach(module(formModule));

                /**
                 * Setup the mocks for our tests
                 */
                beforeEach(inject(function ($rootScope, $compile) {
                    // Create a mock scope.
                    scope = $rootScope.$new();
                    compile = $compile;
                    scope.testModel = {
                        testAttr: 'testValue'
                    };
                }));

                var expectValidRadioGroup = function (template) {
                    var directiveScope = template.scope();

                    expect(directiveScope.name).toEqual('testModel.testAttr');
                    expect(directiveScope.childModel).toBeDefined();
                };

                describe('RadioGroup', function () {
                    it('should initialize with defaults', function () {
                        var template = compile('<div sp-radio-group="" ng-model="testModel.testAttr"/>')(scope);

                        expectValidRadioGroup(template);
                    });
                });

                describe('Radio', function () {
                    it('should fail to compile if not a valid parent ngModel', function () {
                        var failFunction = function () {
                            compile('<div sp-radio-group="">' + '<input sp-radio="value1" radio-id="radio1" radio-label="label1"/>' + '</div>')(scope);
                        };

                        expect(failFunction).toThrow();
                    });

                    it('should initialize then select a radio', function () {
                        var radioGroupElement = compile('<div sp-radio-group="" ng-model="testModel.testAttr">' + '<input sp-radio="value1" radio-id="radio1" radio-label="label1"/>' + '<input sp-radio="value2" radio-id="radio2" radio-label="label2"/>' + '</div>')(scope),
                            directiveScope = radioGroupElement.scope(),
                            label;

                        expectValidRadioGroup(radioGroupElement);

                        // call apply (triggering a digest) so values of models get persisted to the html and watches are triggered
                        scope.$apply();

                        // now test values
                        expect(scope.testModel.testAttr).toEqual('testValue');
                        expect(directiveScope.childModel.childValue).toEqual('testValue');

                        // cool, now let's click the second label
                        label = radioGroupElement.find('label')[1];
                        clickElement(label);

                        // and validate parent scope test attribute contains the value of the second radio
                        expect(scope.testModel.testAttr).toEqual('value2');
                        return;
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL1JhZGlvRGlyZWN0aXZlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7OztJQU90Rjs7SUFFQSxJQUFJLFlBREo7SUFFQSxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQU56QixlQUFlLFVBQVMsSUFBSTtnQkFDNUIsSUFBSSxLQUFLLFNBQVMsWUFBWTtnQkFDOUIsR0FBRyxlQUNELFNBQ0Esa0JBQW1CO2dCQUNuQixRQUFRLE1BQ1IsR0FBRyxHQUFHLEdBQUc7Z0JBQ1QsT0FBTyxPQUFPLE9BQU87Z0JBQ3JCLFdBQVk7Z0JBRWQsR0FBRyxjQUFjOzs7Ozs7WUFNckIsU0FBUyxrQkFBa0IsWUFBVzs7Z0JBRWxDLElBQUksT0FBTzs7O2dCQUlYLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksVUFBVTs7b0JBRTdDLFFBQVEsV0FBVztvQkFDbkIsVUFBVTtvQkFDVixNQUFNLFlBQVk7d0JBQ2QsVUFBVTs7OztnQkFLbEIsSUFBSSx3QkFBd0IsVUFBUyxVQUFVO29CQUMzQyxJQUFJLGlCQUFpQixTQUFTOztvQkFFOUIsT0FBTyxlQUFlLE1BQU0sUUFBUTtvQkFDcEMsT0FBTyxlQUFlLFlBQVk7OztnQkFHdEMsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsbUNBQW1DLFlBQVc7d0JBQzdDLElBQUksV0FBVyxRQUFRLDBEQUEwRDs7d0JBRWpGLHNCQUFzQjs7OztnQkFLOUIsU0FBUyxTQUFTLFlBQVc7b0JBQ3pCLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLElBQUksZUFBZSxZQUFXOzRCQUMxQixRQUFRLDRCQUNJLHNFQUNKLFVBQVU7Ozt3QkFHdEIsT0FBTyxjQUFjOzs7b0JBSXpCLEdBQUcseUNBQXlDLFlBQVc7d0JBQ25ELElBQUksb0JBQW9CLFFBQVEsMERBQ0osc0VBQ0Esc0VBQ0wsVUFBVTs0QkFDN0IsaUJBQWlCLGtCQUFrQjs0QkFDbkM7O3dCQUVKLHNCQUFzQjs7O3dCQUd0QixNQUFNOzs7d0JBR04sT0FBTyxNQUFNLFVBQVUsVUFBVSxRQUFRO3dCQUN6QyxPQUFPLGVBQWUsV0FBVyxZQUFZLFFBQVE7Ozt3QkFHckQsUUFBUSxrQkFBa0IsS0FBSyxTQUFTO3dCQUN4QyxhQUFhOzs7d0JBR2IsT0FBTyxNQUFNLFVBQVUsVUFBVSxRQUFRO3dCQUN6Qzs7Ozs7O0dBQVQiLCJmaWxlIjoiY29tbW9uL2Zvcm0vUmFkaW9EaXJlY3RpdmVUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xyXG5cclxuLypcclxuICogV2l0aGluIFBoYW50b21KUyB3aGF0ZXZlciByZXByZXNlbnRhdGlvbiB0aGV5IGFyZSB1c2luZyBmb3IgdGhlIERPTVxyXG4gKiBkb2VzIG5vdCBhbGxvdyB5b3UgdG8gY2FsbCBjbGljaygpIG9uIGEgbGFiZWwuIGkuZS4gaXQgaXMgdW5kZWZpbmVkLlxyXG4gKiBEaXNwYXRjaGluZyBhIGNsaWNrIGV2ZW50IGRvZXMsIGhvd2V2ZXIsIHNvIHllYWggUGhhbnRvbUpTLi4uIHdoYXRldmVyIDxzYXJjYXNtPlxyXG4gKi9cclxudmFyIGNsaWNrRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICB2YXIgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xyXG4gICAgZXYuaW5pdE1vdXNlRXZlbnQoXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRydWUgLyogYnViYmxlICovLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8sXHJcbiAgICAgIHdpbmRvdywgbnVsbCxcclxuICAgICAgMCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cclxuICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cclxuICAgICAgMCAvKmxlZnQqLywgbnVsbFxyXG4gICAgKTtcclxuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgUmFkaW9EaXJlY3RpdmUuXHJcbiAqL1xyXG5kZXNjcmliZSgnUmFkaW9EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgc2NvcGUsIGNvbXBpbGU7XHJcblxyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGZvcm0gbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZm9ybU1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0dXAgdGhlIG1vY2tzIGZvciBvdXIgdGVzdHNcclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgJGNvbXBpbGUpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxyXG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgY29tcGlsZSA9ICRjb21waWxlO1xyXG4gICAgICAgIHNjb3BlLnRlc3RNb2RlbCA9IHtcclxuICAgICAgICAgICAgdGVzdEF0dHI6ICd0ZXN0VmFsdWUnXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KSk7XHJcblxyXG4gICAgdmFyIGV4cGVjdFZhbGlkUmFkaW9Hcm91cCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZVNjb3BlID0gdGVtcGxhdGUuc2NvcGUoKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGRpcmVjdGl2ZVNjb3BlLm5hbWUpLnRvRXF1YWwoJ3Rlc3RNb2RlbC50ZXN0QXR0cicpO1xyXG4gICAgICAgIGV4cGVjdChkaXJlY3RpdmVTY29wZS5jaGlsZE1vZGVsKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZXNjcmliZSgnUmFkaW9Hcm91cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGRlZmF1bHRzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGNvbXBpbGUoJzxkaXYgc3AtcmFkaW8tZ3JvdXA9XCJcIiBuZy1tb2RlbD1cInRlc3RNb2RlbC50ZXN0QXR0clwiLz4nKShzY29wZSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3RWYWxpZFJhZGlvR3JvdXAodGVtcGxhdGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdSYWRpbycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCB0byBjb21waWxlIGlmIG5vdCBhIHZhbGlkIHBhcmVudCBuZ01vZGVsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmYWlsRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGUoJzxkaXYgc3AtcmFkaW8tZ3JvdXA9XCJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgc3AtcmFkaW89XCJ2YWx1ZTFcIiByYWRpby1pZD1cInJhZGlvMVwiIHJhZGlvLWxhYmVsPVwibGFiZWwxXCIvPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jykoc2NvcGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGZhaWxGdW5jdGlvbikudG9UaHJvdygpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHRoZW4gc2VsZWN0IGEgcmFkaW8nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJhZGlvR3JvdXBFbGVtZW50ID0gY29tcGlsZSgnPGRpdiBzcC1yYWRpby1ncm91cD1cIlwiIG5nLW1vZGVsPVwidGVzdE1vZGVsLnRlc3RBdHRyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHNwLXJhZGlvPVwidmFsdWUxXCIgcmFkaW8taWQ9XCJyYWRpbzFcIiByYWRpby1sYWJlbD1cImxhYmVsMVwiLz4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgc3AtcmFkaW89XCJ2YWx1ZTJcIiByYWRpby1pZD1cInJhZGlvMlwiIHJhZGlvLWxhYmVsPVwibGFiZWwyXCIvPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nKShzY29wZSksXHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVTY29wZSA9IHJhZGlvR3JvdXBFbGVtZW50LnNjb3BlKCksXHJcbiAgICAgICAgICAgICAgICBsYWJlbDtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdFZhbGlkUmFkaW9Hcm91cChyYWRpb0dyb3VwRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjYWxsIGFwcGx5ICh0cmlnZ2VyaW5nIGEgZGlnZXN0KSBzbyB2YWx1ZXMgb2YgbW9kZWxzIGdldCBwZXJzaXN0ZWQgdG8gdGhlIGh0bWwgYW5kIHdhdGNoZXMgYXJlIHRyaWdnZXJlZFxyXG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5vdyB0ZXN0IHZhbHVlc1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUudGVzdE1vZGVsLnRlc3RBdHRyKS50b0VxdWFsKCd0ZXN0VmFsdWUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRpcmVjdGl2ZVNjb3BlLmNoaWxkTW9kZWwuY2hpbGRWYWx1ZSkudG9FcXVhbCgndGVzdFZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb29sLCBub3cgbGV0J3MgY2xpY2sgdGhlIHNlY29uZCBsYWJlbFxyXG4gICAgICAgICAgICBsYWJlbCA9IHJhZGlvR3JvdXBFbGVtZW50LmZpbmQoJ2xhYmVsJylbMV07XHJcbiAgICAgICAgICAgIGNsaWNrRWxlbWVudChsYWJlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbmQgdmFsaWRhdGUgcGFyZW50IHNjb3BlIHRlc3QgYXR0cmlidXRlIGNvbnRhaW5zIHRoZSB2YWx1ZSBvZiB0aGUgc2Vjb25kIHJhZGlvXHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS50ZXN0TW9kZWwudGVzdEF0dHIpLnRvRXF1YWwoJ3ZhbHVlMicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
