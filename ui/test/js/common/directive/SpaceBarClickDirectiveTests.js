System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('SpaceBarClickDirective', function () {
                var definition = '<a href="" ng-click="clickHandler()" sp-space-bar-click="" />',
                    $scope,
                    $compile;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;

                    $scope.clickHandler = jasmine.createSpy();
                }));

                function createElement() {
                    var element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function createKeypressEvent(keyCode) {
                    return $.Event('keypress', {
                        keyCode: keyCode
                    });
                }

                it('does click when space bar is pressed', function () {
                    var element = createElement(),
                        event = createKeypressEvent(32);

                    element.trigger(event);
                    $scope.$apply();
                    expect($scope.clickHandler).toHaveBeenCalled();
                });

                it('does not click when a non-space bar key is pressed', function () {
                    var element = createElement(),
                        event = createKeypressEvent(33);

                    element.trigger(event);
                    $scope.$apply();
                    expect($scope.clickHandler).not.toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvU3BhY2VCYXJDbGlja0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDBCQUEwQixZQUFXO2dCQUMxQyxJQUFJLGFBQWE7b0JBQ2I7b0JBQVE7O2dCQUVaLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWTtvQkFDL0MsU0FBUyxXQUFXO29CQUNwQixXQUFXOztvQkFFWCxPQUFPLGVBQWUsUUFBUTs7O2dCQUdsQyxTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLG9CQUFvQixTQUFTO29CQUNsQyxPQUFPLEVBQUUsTUFBTSxZQUFZO3dCQUN2QixTQUFTOzs7O2dCQUlqQixHQUFJLHdDQUF3QyxZQUFXO29CQUNuRCxJQUFJLFVBQVU7d0JBQ1YsUUFBUSxvQkFBb0I7O29CQUVoQyxRQUFRLFFBQVE7b0JBQ2hCLE9BQU87b0JBQ1AsT0FBTyxPQUFPLGNBQWM7OztnQkFHaEMsR0FBSSxzREFBc0QsWUFBVztvQkFDakUsSUFBSSxVQUFVO3dCQUNWLFFBQVEsb0JBQW9COztvQkFFaEMsUUFBUSxRQUFRO29CQUNoQixPQUFPO29CQUNQLE9BQU8sT0FBTyxjQUFjLElBQUk7Ozs7O0dBYXJDIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvU3BhY2VCYXJDbGlja0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ1NwYWNlQmFyQ2xpY2tEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVmaW5pdGlvbiA9ICc8YSBocmVmPVwiXCIgbmctY2xpY2s9XCJjbGlja0hhbmRsZXIoKVwiIHNwLXNwYWNlLWJhci1jbGljaz1cIlwiIC8+JyxcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXykge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuXG4gICAgICAgICRzY29wZS5jbGlja0hhbmRsZXIgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUtleXByZXNzRXZlbnQoa2V5Q29kZSkge1xuICAgICAgICByZXR1cm4gJC5FdmVudCgna2V5cHJlc3MnLCB7XG4gICAgICAgICAgICBrZXlDb2RlOiBrZXlDb2RlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0ICgnZG9lcyBjbGljayB3aGVuIHNwYWNlIGJhciBpcyBwcmVzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgZXZlbnQgPSBjcmVhdGVLZXlwcmVzc0V2ZW50KDMyKTtcblxuICAgICAgICBlbGVtZW50LnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuY2xpY2tIYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCAoJ2RvZXMgbm90IGNsaWNrIHdoZW4gYSBub24tc3BhY2UgYmFyIGtleSBpcyBwcmVzc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgZXZlbnQgPSBjcmVhdGVLZXlwcmVzc0V2ZW50KDMzKTtcblxuICAgICAgICBlbGVtZW50LnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuY2xpY2tIYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
