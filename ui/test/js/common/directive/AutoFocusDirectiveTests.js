System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule', 'test/js/common/directive/FocusTestService'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }, function (_testJsCommonDirectiveFocusTestService) {}],
        execute: function () {

            describe('AutoFocusDirective', function () {
                var $scope,
                    $compile,
                    element,
                    $timeout,
                    focusTestService,
                    elementDefinition = '<input id="element" type="text" sp-auto-focus/>';

                beforeEach(module(directiveModule));

                function createElement() {
                    var body = angular.element('body');
                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    body.append(element);
                    $scope.$apply();
                }

                beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _focusTestService_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    focusTestService = _focusTestService_;
                }));

                it('should call focus on element after its compiled', function () {
                    createElement();
                    $timeout.flush();
                    expect(focusTestService.isFocused(element[0])).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvQXV0b0ZvY3VzRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9DQUFvQyw4Q0FBOEMsVUFBVSxTQUFTO0lBQzdJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQztXQUNuRCxVQUFVLHdDQUF3QztRQUNyRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsc0JBQXNCLFlBQVc7Z0JBQ3RDLElBQUk7b0JBQVE7b0JBQVU7b0JBQVM7b0JBQVU7b0JBQ3JDLG9CQUFvQjs7Z0JBRXhCLFdBQVcsT0FBTzs7Z0JBRWxCLFNBQVMsZ0JBQWdCO29CQUNyQixJQUFJLE9BQU8sUUFBUSxRQUFRO29CQUMzQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixLQUFLLE9BQU87b0JBQ1osT0FBTzs7O2dCQUdYLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxZQUFZLG9CQUFvQjtvQkFDakYsU0FBUyxhQUFhO29CQUN0QixXQUFXO29CQUNYLFdBQVc7b0JBQ1gsbUJBQW1COzs7Z0JBR3ZCLEdBQUcsbURBQW1ELFlBQVc7b0JBQzdEO29CQUNBLFNBQVM7b0JBQ1QsT0FBTyxpQkFBaUIsVUFBVSxRQUFRLEtBQUssUUFBUTs7Ozs7R0FlNUQiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9BdXRvRm9jdXNEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2RpcmVjdGl2ZS9Gb2N1c1Rlc3RTZXJ2aWNlJztcblxuZGVzY3JpYmUoJ0F1dG9Gb2N1c0RpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsICRjb21waWxlLCBlbGVtZW50LCAkdGltZW91dCwgZm9jdXNUZXN0U2VydmljZSxcbiAgICAgICAgZWxlbWVudERlZmluaXRpb24gPSAnPGlucHV0IGlkPVwiZWxlbWVudFwiIHR5cGU9XCJ0ZXh0XCIgc3AtYXV0by1mb2N1cy8+JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKTtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgIGJvZHkuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfJHRpbWVvdXRfLCBfZm9jdXNUZXN0U2VydmljZV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkdGltZW91dCA9IF8kdGltZW91dF87XG4gICAgICAgIGZvY3VzVGVzdFNlcnZpY2UgPSBfZm9jdXNUZXN0U2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGZvY3VzIG9uIGVsZW1lbnQgYWZ0ZXIgaXRzIGNvbXBpbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgZXhwZWN0KGZvY3VzVGVzdFNlcnZpY2UuaXNGb2N1c2VkKGVsZW1lbnRbMF0pKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
