System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('ExpanderDirective', function () {
                var $scope, $compile;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                }));

                function createElement(definition) {
                    var element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                describe('with no selector', function () {
                    var definition = '<a sp-expander="" class=""/>';

                    it('should toggle between unrotate and rotate classes on click', function () {
                        var element = createElement(definition);
                        expect(element.hasClass('unrotate')).toBeTruthy();
                        expect(element.hasClass('rotate')).toBeFalsy();
                        element.click();
                        expect(element.hasClass('unrotate')).toBeFalsy();
                        expect(element.hasClass('rotate')).toBeTruthy();
                        element.click();
                        expect(element.hasClass('unrotate')).toBeTruthy();
                        expect(element.hasClass('rotate')).toBeFalsy();
                    });
                });

                describe('with selector', function () {
                    var targetElement = '<span class="target"></span>',
                        directiveElement = '<a sp-expander=".target"/>';

                    it('should toggle between unrotate and rotate classes on click', function () {
                        var element = angular.element(directiveElement),
                            target = angular.element(targetElement);
                        element.append(target);
                        $compile(element)($scope);

                        expect(target.hasClass('unrotate')).toBeTruthy();
                        expect(target.hasClass('rotate')).toBeFalsy();
                        element.click();
                        expect(target.hasClass('unrotate')).toBeFalsy();
                        expect(target.hasClass('rotate')).toBeTruthy();
                        element.click();
                        expect(target.hasClass('unrotate')).toBeTruthy();
                        expect(target.hasClass('rotate')).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRXhwYW5kZXJEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUFwRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxxQkFBcUIsWUFBVztnQkFDckMsSUFBSSxRQUFROztnQkFFWixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVk7b0JBQy9DLFNBQVMsV0FBVztvQkFDcEIsV0FBVzs7O2dCQUdmLFNBQVMsY0FBYyxZQUFZO29CQUMvQixJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsb0JBQW9CLFlBQVc7b0JBQ3BDLElBQUksYUFBYTs7b0JBRWpCLEdBQUcsOERBQThELFlBQVc7d0JBQ3hFLElBQUksVUFBVSxjQUFjO3dCQUM1QixPQUFPLFFBQVEsU0FBUyxhQUFhO3dCQUNyQyxPQUFPLFFBQVEsU0FBUyxXQUFXO3dCQUNuQyxRQUFRO3dCQUNSLE9BQU8sUUFBUSxTQUFTLGFBQWE7d0JBQ3JDLE9BQU8sUUFBUSxTQUFTLFdBQVc7d0JBQ25DLFFBQVE7d0JBQ1IsT0FBTyxRQUFRLFNBQVMsYUFBYTt3QkFDckMsT0FBTyxRQUFRLFNBQVMsV0FBVzs7OztnQkFJM0MsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsSUFBSSxnQkFBZ0I7d0JBQ2hCLG1CQUFtQjs7b0JBRXZCLEdBQUcsOERBQThELFlBQVc7d0JBQ3hFLElBQUksVUFBVSxRQUFRLFFBQVE7NEJBQzFCLFNBQVMsUUFBUSxRQUFRO3dCQUM3QixRQUFRLE9BQU87d0JBQ2YsU0FBUyxTQUFTOzt3QkFFbEIsT0FBTyxPQUFPLFNBQVMsYUFBYTt3QkFDcEMsT0FBTyxPQUFPLFNBQVMsV0FBVzt3QkFDbEMsUUFBUTt3QkFDUixPQUFPLE9BQU8sU0FBUyxhQUFhO3dCQUNwQyxPQUFPLE9BQU8sU0FBUyxXQUFXO3dCQUNsQyxRQUFRO3dCQUNSLE9BQU8sT0FBTyxTQUFTLGFBQWE7d0JBQ3BDLE9BQU8sT0FBTyxTQUFTLFdBQVc7Ozs7OztHQVczQyIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0V4cGFuZGVyRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdFeHBhbmRlckRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsICRjb21waWxlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCd3aXRoIG5vIHNlbGVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZpbml0aW9uID0gJzxhIHNwLWV4cGFuZGVyPVwiXCIgY2xhc3M9XCJcIi8+JztcblxuICAgICAgICBpdCgnc2hvdWxkIHRvZ2dsZSBiZXR3ZWVuIHVucm90YXRlIGFuZCByb3RhdGUgY2xhc3NlcyBvbiBjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuaGFzQ2xhc3MoJ3Vucm90YXRlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50Lmhhc0NsYXNzKCdyb3RhdGUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBlbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygndW5yb3RhdGUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygncm90YXRlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50Lmhhc0NsYXNzKCd1bnJvdGF0ZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5oYXNDbGFzcygncm90YXRlJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aXRoIHNlbGVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0YXJnZXRFbGVtZW50ID0gJzxzcGFuIGNsYXNzPVwidGFyZ2V0XCI+PC9zcGFuPicsXG4gICAgICAgICAgICBkaXJlY3RpdmVFbGVtZW50ID0gJzxhIHNwLWV4cGFuZGVyPVwiLnRhcmdldFwiLz4nO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIGJldHdlZW4gdW5yb3RhdGUgYW5kIHJvdGF0ZSBjbGFzc2VzIG9uIGNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkaXJlY3RpdmVFbGVtZW50KSxcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBhbmd1bGFyLmVsZW1lbnQodGFyZ2V0RWxlbWVudCk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZCh0YXJnZXQpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcblxuICAgICAgICAgICAgZXhwZWN0KHRhcmdldC5oYXNDbGFzcygndW5yb3RhdGUnKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRhcmdldC5oYXNDbGFzcygncm90YXRlJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KHRhcmdldC5oYXNDbGFzcygndW5yb3RhdGUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0Lmhhc0NsYXNzKCdyb3RhdGUnKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KHRhcmdldC5oYXNDbGFzcygndW5yb3RhdGUnKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KHRhcmdldC5oYXNDbGFzcygncm90YXRlJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
