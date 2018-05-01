System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var directiveModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PriorityButton', function () {
                var $scope,
                    $compile,
                    testService,
                    elementDefinition = '<sp-priority-button sp-id="priorityBtn"' + 'sp-priority="priority" sp-disabled="false"/>',
                    createElement = function (elementDefinition, priority) {
                    var element;
                    $scope.priority = priority;
                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                },
                    setDisabledButton = function (elementDefinition) {
                    var element = angular.element(elementDefinition.replace('sp-disabled="false"', 'sp-disabled="true"'));
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                };

                beforeEach(module(testModule, directiveModule));

                beforeEach(inject(function (_$compile_, $rootScope, _testService_) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    testService = _testService_;
                }));

                it('should be green/normal when no priority', function () {
                    var element = createElement(elementDefinition, '');

                    var button = angular.element(angular.element(element[0]).children()[0]);
                    var span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-white')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_normal');
                    expect(span.text().trim()).toBe('ui_priority_normal_xs');
                });

                it('should be red when high priority', function () {
                    var element = createElement(elementDefinition, 'High');

                    var button = angular.element(angular.element(element[0]).children()[0]);
                    var span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-danger')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_high');
                    expect(span.text().trim()).toBe('ui_priority_high_xs');
                });

                it('should be blue when low priority', function () {
                    var element = createElement(elementDefinition, 'Low');

                    var button = angular.element(angular.element(element[0]).children()[0]);
                    var span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-info')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_low');
                    expect(span.text().trim()).toBe('ui_priority_low_xs');
                });

                it('should change to correct priority when clicked', function () {
                    var element = createElement(elementDefinition, '');

                    var button = angular.element(angular.element(element[0]).children()[0]);
                    var span = angular.element(button.children()[0]);

                    // Click the High Priority button
                    var ul = angular.element(angular.element(element[0]).children()[2]);
                    var liHigh = angular.element(ul.find('a')[0]);
                    var liNormal = angular.element(ul.find('a')[1]);
                    var liLow = angular.element(ul.find('a')[2]);

                    liHigh.click();
                    span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-danger')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_high');
                    expect(span.text().trim()).toBe('ui_priority_high_xs');

                    // Click the Normal Priority button
                    liNormal.click();
                    span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-white')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_normal');
                    expect(span.text().trim()).toBe('ui_priority_normal_xs');

                    // Click the Low Priority button
                    liLow.click();
                    span = angular.element(button.children()[0]);
                    expect(button.hasClass('btn-info')).toBeTruthy();
                    expect(button.attr('aria-label').trim()).toBe('ui_priority_low');
                    expect(span.text().trim()).toBe('ui_priority_low_xs');
                });

                it('should not be disabled when sp-disabled is undefined', function () {
                    var element = createElement(elementDefinition, '');
                    var button = angular.element(angular.element(element[0]).children()[0]);
                    expect(button.attr('disabled')).toBeUndefined();
                });

                it('should be disabled when sp-disabled is set to true', function () {
                    var element = setDisabledButton(elementDefinition);
                    var button = angular.element(angular.element(element[0]).children()[0]);
                    expect(button.attr('disabled')).toEqual('disabled');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvUHJpb3JpdHlCdXR0b25EaXJlY3RpdmVUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixvQ0FBb0MsdUJBQXVCLFVBQVUsU0FBUztJQUN0SDs7SUFFQSxJQUFJLGlCQUFpQjtJQUNyQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQztXQUNuRCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLGtCQUFrQixZQUFXO2dCQUNsQyxJQUFJO29CQUFRO29CQUFVO29CQUNsQixvQkFBb0IsNENBQ1I7b0JBQ1osZ0JBQWdCLFVBQVMsbUJBQW1CLFVBQVU7b0JBQ2xELElBQUk7b0JBQ0osT0FBTyxXQUFXO29CQUNsQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87O29CQUVYLG9CQUFvQixVQUFTLG1CQUFtQjtvQkFDNUMsSUFBSSxVQUFVLFFBQVEsUUFBUSxrQkFBa0IsUUFBUSx1QkFBdUI7b0JBQy9FLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR2YsV0FBVyxPQUFPLFlBQVk7O2dCQUU5QixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksZUFBZTtvQkFDOUQsU0FBUztvQkFDVCxXQUFXO29CQUNYLGNBQWM7OztnQkFHbEIsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsSUFBSSxVQUFVLGNBQWMsbUJBQW1COztvQkFFL0MsSUFBSSxTQUFTLFFBQVEsUUFBUSxRQUFRLFFBQVEsUUFBUSxJQUFJLFdBQVc7b0JBQ3BFLElBQUksT0FBTyxRQUFRLFFBQVEsT0FBTyxXQUFXO29CQUM3QyxPQUFPLE9BQU8sU0FBUyxjQUFjO29CQUNyQyxPQUFPLE9BQU8sS0FBSyxjQUFjLFFBQVEsS0FBSztvQkFDOUMsT0FBTyxLQUFLLE9BQU8sUUFBUSxLQUFLOzs7Z0JBR3BDLEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLElBQUksVUFBVSxjQUFjLG1CQUFtQjs7b0JBRS9DLElBQUksU0FBUyxRQUFRLFFBQVEsUUFBUSxRQUFRLFFBQVEsSUFBSSxXQUFXO29CQUNwRSxJQUFJLE9BQU8sUUFBUSxRQUFRLE9BQU8sV0FBVztvQkFDN0MsT0FBTyxPQUFPLFNBQVMsZUFBZTtvQkFDdEMsT0FBTyxPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7b0JBQzlDLE9BQU8sS0FBSyxPQUFPLFFBQVEsS0FBSzs7O2dCQUdwQyxHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxJQUFJLFVBQVUsY0FBYyxtQkFBbUI7O29CQUUvQyxJQUFJLFNBQVMsUUFBUSxRQUFRLFFBQVEsUUFBUSxRQUFRLElBQUksV0FBVztvQkFDcEUsSUFBSSxPQUFPLFFBQVEsUUFBUSxPQUFPLFdBQVc7b0JBQzdDLE9BQU8sT0FBTyxTQUFTLGFBQWE7b0JBQ3BDLE9BQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO29CQUM5QyxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7OztnQkFHcEMsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsSUFBSSxVQUFVLGNBQWMsbUJBQW1COztvQkFFL0MsSUFBSSxTQUFTLFFBQVEsUUFBUSxRQUFRLFFBQVEsUUFBUSxJQUFJLFdBQVc7b0JBQ3BFLElBQUksT0FBTyxRQUFRLFFBQVEsT0FBTyxXQUFXOzs7b0JBRzdDLElBQUksS0FBSyxRQUFRLFFBQVEsUUFBUSxRQUFRLFFBQVEsSUFBSSxXQUFXO29CQUNoRSxJQUFJLFNBQVMsUUFBUSxRQUFRLEdBQUcsS0FBSyxLQUFLO29CQUMxQyxJQUFJLFdBQVcsUUFBUSxRQUFRLEdBQUcsS0FBSyxLQUFLO29CQUM1QyxJQUFJLFFBQVEsUUFBUSxRQUFRLEdBQUcsS0FBSyxLQUFLOztvQkFFekMsT0FBTztvQkFDUCxPQUFPLFFBQVEsUUFBUSxPQUFPLFdBQVc7b0JBQ3pDLE9BQU8sT0FBTyxTQUFTLGVBQWU7b0JBQ3RDLE9BQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO29CQUM5QyxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7OztvQkFHaEMsU0FBUztvQkFDVCxPQUFPLFFBQVEsUUFBUSxPQUFPLFdBQVc7b0JBQ3pDLE9BQU8sT0FBTyxTQUFTLGNBQWM7b0JBQ3JDLE9BQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO29CQUM5QyxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7OztvQkFHaEMsTUFBTTtvQkFDTixPQUFPLFFBQVEsUUFBUSxPQUFPLFdBQVc7b0JBQ3pDLE9BQU8sT0FBTyxTQUFTLGFBQWE7b0JBQ3BDLE9BQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxLQUFLO29CQUM5QyxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7OztnQkFJcEMsR0FBRyx3REFBd0QsWUFBVztvQkFDbEUsSUFBSSxVQUFVLGNBQWMsbUJBQW1CO29CQUMvQyxJQUFJLFNBQVMsUUFBUSxRQUFRLFFBQVEsUUFBUSxRQUFRLElBQUksV0FBVztvQkFDcEUsT0FBTyxPQUFPLEtBQUssYUFBYTs7O2dCQUdwQyxHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxJQUFJLFVBQVUsa0JBQWtCO29CQUNoQyxJQUFJLFNBQVMsUUFBUSxRQUFRLFFBQVEsUUFBUSxRQUFRLElBQUksV0FBVztvQkFDcEUsT0FBTyxPQUFPLEtBQUssYUFBYSxRQUFROzs7OztHQWE3QyIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL1ByaW9yaXR5QnV0dG9uRGlyZWN0aXZlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnUHJpb3JpdHlCdXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHNjb3BlLCAkY29tcGlsZSwgdGVzdFNlcnZpY2UsXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1wcmlvcml0eS1idXR0b24gc3AtaWQ9XCJwcmlvcml0eUJ0blwiJyArXG4gICAgICAgICAgICAgICAgICAgICdzcC1wcmlvcml0eT1cInByaW9yaXR5XCIgc3AtZGlzYWJsZWQ9XCJmYWxzZVwiLz4nLFxuICAgICAgICBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudERlZmluaXRpb24sIHByaW9yaXR5KSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgICRzY29wZS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldERpc2FibGVkQnV0dG9uID0gZnVuY3Rpb24oZWxlbWVudERlZmluaXRpb24pIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uLnJlcGxhY2UoJ3NwLWRpc2FibGVkPVwiZmFsc2VcIicsICdzcC1kaXNhYmxlZD1cInRydWVcIicpKTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgJHJvb3RTY29wZSwgX3Rlc3RTZXJ2aWNlXykge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIGdyZWVuL25vcm1hbCB3aGVuIG5vIHByaW9yaXR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbiwgJycpO1xuXG4gICAgICAgIHZhciBidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmNoaWxkcmVuKClbMF0pO1xuICAgICAgICB2YXIgc3BhbiA9IGFuZ3VsYXIuZWxlbWVudChidXR0b24uY2hpbGRyZW4oKVswXSk7XG4gICAgICAgIGV4cGVjdChidXR0b24uaGFzQ2xhc3MoJ2J0bi13aGl0ZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChidXR0b24uYXR0cignYXJpYS1sYWJlbCcpLnRyaW0oKSkudG9CZSgndWlfcHJpb3JpdHlfbm9ybWFsJyk7XG4gICAgICAgIGV4cGVjdChzcGFuLnRleHQoKS50cmltKCkpLnRvQmUoJ3VpX3ByaW9yaXR5X25vcm1hbF94cycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSByZWQgd2hlbiBoaWdoIHByaW9yaXR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbiwgJ0hpZ2gnKTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgdmFyIHNwYW4gPSBhbmd1bGFyLmVsZW1lbnQoYnV0dG9uLmNoaWxkcmVuKClbMF0pO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmhhc0NsYXNzKCdidG4tZGFuZ2VyJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdhcmlhLWxhYmVsJykudHJpbSgpKS50b0JlKCd1aV9wcmlvcml0eV9oaWdoJyk7XG4gICAgICAgIGV4cGVjdChzcGFuLnRleHQoKS50cmltKCkpLnRvQmUoJ3VpX3ByaW9yaXR5X2hpZ2hfeHMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgYmx1ZSB3aGVuIGxvdyBwcmlvcml0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24sICdMb3cnKTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgdmFyIHNwYW4gPSBhbmd1bGFyLmVsZW1lbnQoYnV0dG9uLmNoaWxkcmVuKClbMF0pO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmhhc0NsYXNzKCdidG4taW5mbycpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChidXR0b24uYXR0cignYXJpYS1sYWJlbCcpLnRyaW0oKSkudG9CZSgndWlfcHJpb3JpdHlfbG93Jyk7XG4gICAgICAgIGV4cGVjdChzcGFuLnRleHQoKS50cmltKCkpLnRvQmUoJ3VpX3ByaW9yaXR5X2xvd194cycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjaGFuZ2UgdG8gY29ycmVjdCBwcmlvcml0eSB3aGVuIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uLCAnJyk7XG5cbiAgICAgICAgdmFyIGJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuY2hpbGRyZW4oKVswXSk7XG4gICAgICAgIHZhciBzcGFuID0gYW5ndWxhci5lbGVtZW50KGJ1dHRvbi5jaGlsZHJlbigpWzBdKTtcblxuICAgICAgICAvLyBDbGljayB0aGUgSGlnaCBQcmlvcml0eSBidXR0b25cbiAgICAgICAgdmFyIHVsID0gYW5ndWxhci5lbGVtZW50KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5jaGlsZHJlbigpWzJdKTtcbiAgICAgICAgdmFyIGxpSGlnaCA9IGFuZ3VsYXIuZWxlbWVudCh1bC5maW5kKCdhJylbMF0pO1xuICAgICAgICB2YXIgbGlOb3JtYWwgPSBhbmd1bGFyLmVsZW1lbnQodWwuZmluZCgnYScpWzFdKTtcbiAgICAgICAgdmFyIGxpTG93ID0gYW5ndWxhci5lbGVtZW50KHVsLmZpbmQoJ2EnKVsyXSk7XG5cbiAgICAgICAgbGlIaWdoLmNsaWNrKCk7XG4gICAgICAgIHNwYW4gPSBhbmd1bGFyLmVsZW1lbnQoYnV0dG9uLmNoaWxkcmVuKClbMF0pO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmhhc0NsYXNzKCdidG4tZGFuZ2VyJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdhcmlhLWxhYmVsJykudHJpbSgpKS50b0JlKCd1aV9wcmlvcml0eV9oaWdoJyk7XG4gICAgICAgIGV4cGVjdChzcGFuLnRleHQoKS50cmltKCkpLnRvQmUoJ3VpX3ByaW9yaXR5X2hpZ2hfeHMnKTtcblxuICAgICAgICAvLyBDbGljayB0aGUgTm9ybWFsIFByaW9yaXR5IGJ1dHRvblxuICAgICAgICBsaU5vcm1hbC5jbGljaygpO1xuICAgICAgICBzcGFuID0gYW5ndWxhci5lbGVtZW50KGJ1dHRvbi5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5oYXNDbGFzcygnYnRuLXdoaXRlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdhcmlhLWxhYmVsJykudHJpbSgpKS50b0JlKCd1aV9wcmlvcml0eV9ub3JtYWwnKTtcbiAgICAgICAgZXhwZWN0KHNwYW4udGV4dCgpLnRyaW0oKSkudG9CZSgndWlfcHJpb3JpdHlfbm9ybWFsX3hzJyk7XG5cbiAgICAgICAgLy8gQ2xpY2sgdGhlIExvdyBQcmlvcml0eSBidXR0b25cbiAgICAgICAgbGlMb3cuY2xpY2soKTtcbiAgICAgICAgc3BhbiA9IGFuZ3VsYXIuZWxlbWVudChidXR0b24uY2hpbGRyZW4oKVswXSk7XG4gICAgICAgIGV4cGVjdChidXR0b24uaGFzQ2xhc3MoJ2J0bi1pbmZvJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdhcmlhLWxhYmVsJykudHJpbSgpKS50b0JlKCd1aV9wcmlvcml0eV9sb3cnKTtcbiAgICAgICAgZXhwZWN0KHNwYW4udGV4dCgpLnRyaW0oKSkudG9CZSgndWlfcHJpb3JpdHlfbG93X3hzJyk7XG5cbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGJlIGRpc2FibGVkIHdoZW4gc3AtZGlzYWJsZWQgaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbiwgJycpO1xuICAgICAgICB2YXIgYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5jaGlsZHJlbigpWzBdKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcpKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIGRpc2FibGVkIHdoZW4gc3AtZGlzYWJsZWQgaXMgc2V0IHRvIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzZXREaXNhYmxlZEJ1dHRvbihlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgIHZhciBidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmNoaWxkcmVuKClbMF0pO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmF0dHIoJ2Rpc2FibGVkJykpLnRvRXF1YWwoJ2Rpc2FibGVkJyk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
