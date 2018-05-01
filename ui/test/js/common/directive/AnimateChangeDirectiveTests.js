System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('AnimateChangeDirective', function () {
                var elementDefinition = '<span sp-animate-change="getValue()" sp-animate-change-class="{{getClass()}}">whatever</span>',
                    scopeValue,
                    scopeClass,
                    $scope,
                    $compile,
                    $animate;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$animate_, _$compile_) {
                    $scope = $rootScope.$new();
                    $scope.getValue = function () {
                        return scopeValue;
                    };
                    $scope.getClass = function () {
                        return scopeClass;
                    };

                    $animate = _$animate_;
                    spyOn($animate, 'addClass').and.callThrough();
                    $compile = _$compile_;
                }));

                function createElement() {
                    var element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('adds "animated" class to the element', function () {
                    var element = createElement();
                    expect(element.hasClass('animated')).toBeTruthy();
                });

                it('calls $animate service when the value changes', function () {
                    var element;
                    scopeValue = 0;
                    scopeClass = 'fadeInDown';
                    element = createElement();
                    scopeValue = 1;
                    expect($animate.addClass).toHaveBeenCalled();
                    expect($animate.addClass.calls.mostRecent().args[1]).toEqual('fadeInDown');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvQW5pbWF0ZUNoYW5nZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDBCQUEwQixZQUFXO2dCQUMxQyxJQUFJLG9CQUNJO29CQUNKO29CQUFZO29CQUFZO29CQUFRO29CQUFVOztnQkFFOUMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLFlBQVk7b0JBQzNELFNBQVMsV0FBVztvQkFDcEIsT0FBTyxXQUFXLFlBQVc7d0JBQ3pCLE9BQU87O29CQUVYLE9BQU8sV0FBVyxZQUFXO3dCQUN6QixPQUFPOzs7b0JBR1gsV0FBVztvQkFDWCxNQUFNLFVBQVUsWUFBWSxJQUFJO29CQUNoQyxXQUFXOzs7Z0JBR2YsU0FBUyxnQkFBZ0I7b0JBQ3JCLElBQUksVUFBVSxRQUFRLFFBQVE7b0JBQzlCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsR0FBSSx3Q0FBd0MsWUFBVztvQkFDbkQsSUFBSSxVQUFVO29CQUNkLE9BQU8sUUFBUSxTQUFTLGFBQWE7OztnQkFHekMsR0FBSSxpREFBaUQsWUFBVztvQkFDNUQsSUFBSTtvQkFDSixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixhQUFhO29CQUNiLE9BQU8sU0FBUyxVQUFVO29CQUMxQixPQUFPLFNBQVMsU0FBUyxNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7Ozs7O0dBZWxFIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvQW5pbWF0ZUNoYW5nZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0FuaW1hdGVDaGFuZ2VEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudERlZmluaXRpb24gPVxuICAgICAgICAgICAgJzxzcGFuIHNwLWFuaW1hdGUtY2hhbmdlPVwiZ2V0VmFsdWUoKVwiIHNwLWFuaW1hdGUtY2hhbmdlLWNsYXNzPVwie3tnZXRDbGFzcygpfX1cIj53aGF0ZXZlcjwvc3Bhbj4nLFxuICAgICAgICBzY29wZVZhbHVlLCBzY29wZUNsYXNzLCAkc2NvcGUsICRjb21waWxlLCAkYW5pbWF0ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRhbmltYXRlXywgXyRjb21waWxlXykge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJHNjb3BlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGVWYWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLmdldENsYXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NvcGVDbGFzcztcbiAgICAgICAgfTtcblxuICAgICAgICAkYW5pbWF0ZSA9IF8kYW5pbWF0ZV87XG4gICAgICAgIHNweU9uKCRhbmltYXRlLCAnYWRkQ2xhc3MnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBpdCAoJ2FkZHMgXCJhbmltYXRlZFwiIGNsYXNzIHRvIHRoZSBlbGVtZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygnYW5pbWF0ZWQnKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdjYWxscyAkYW5pbWF0ZSBzZXJ2aWNlIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIHNjb3BlVmFsdWUgPSAwO1xuICAgICAgICBzY29wZUNsYXNzID0gJ2ZhZGVJbkRvd24nO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBzY29wZVZhbHVlID0gMTtcbiAgICAgICAgZXhwZWN0KCRhbmltYXRlLmFkZENsYXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCgkYW5pbWF0ZS5hZGRDbGFzcy5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1sxXSkudG9FcXVhbCgnZmFkZUluRG93bicpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
