System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('DropDownMenuButtonDirectiveTests', function () {
                var MenuItem = undefined;

                beforeEach(module(directiveModule));

                beforeEach(inject(function (_MenuItem_) {
                    MenuItem = _MenuItem_;
                }));

                describe('DropDownMenuItemDirective', function () {
                    var menuItems = undefined,
                        $scope = undefined,
                        element = undefined,
                        expanderBtn = undefined,
                        templateLeft = undefined,
                        templateRight = undefined,
                        $compile = undefined;

                    beforeEach(inject(function (_$rootScope_, _$compile_) {
                        var template = '<sp-drop-down-menu-button ng-disabled="isDisabled" menu-items="menuItems">' + '</sp-drop-down-menu-button>',
                            item1Toggled = false;

                        $scope = _$rootScope_.$new();
                        $compile = _$compile_;

                        templateLeft = '<sp-drop-down-menu-button ng-disabled="isDisabled" menu-items="menuItems" align="left">' + '</sp-drop-down-menu-button>';
                        templateRight = '<sp-drop-down-menu-button ng-disabled="isDisabled" menu-items="menuItems" align="right">' + '</sp-drop-down-menu-button>';

                        var isToggledSpy = jasmine.createSpy().and.callFake(function () {
                            return item1Toggled;
                        }),
                            actionSpy = jasmine.createSpy().and.callFake(function () {
                            item1Toggled = !item1Toggled;
                        });

                        menuItems = [new MenuItem('label one', actionSpy, isToggledSpy), new MenuItem('label two', jasmine.createSpy())];
                        $scope.menuItems = menuItems;
                        $scope.isDisabled = false;

                        element = angular.element(template);
                        $compile(element)($scope);
                        $scope.$digest();
                        expanderBtn = element.find('button');
                    }));

                    afterEach(function () {
                        $scope.$destroy();
                    });

                    function getMenuItem(index) {
                        return angular.element(element.find('li>a')[index]);
                    }

                    it('should be right aligned by default', function () {
                        var ul = angular.element(element.find('ul'));
                        expect(ul.hasClass('dropdown-menu-right'));
                    });

                    it('should be left aligned when align=right', function () {
                        var elementRight = angular.element(templateRight);
                        $compile(elementRight)($scope);
                        $scope.$digest();
                        var ul = angular.element(elementRight.find('ul'));
                        expect(ul.hasClass('dropdown-menu-right'));
                    });

                    it('should be left aligned when align=left', function () {
                        var elementLeft = angular.element(templateLeft);
                        $compile(elementLeft)($scope);
                        $scope.$digest();
                        var ul = angular.element(elementLeft.find('ul'));
                        expect(ul.hasClass('dropdown-menu-left'));
                    });

                    it('selecting an item should toggle it', function () {
                        var item = getMenuItem(0);
                        /* expand menu */
                        expanderBtn.click();
                        item.click();
                        expect(expanderBtn.hasClass('toggled')).toBeTruthy();
                    });

                    it('should unselect if toggled again', function () {
                        var item = getMenuItem(0);
                        /* expand menu */
                        expanderBtn.click();
                        item.click();
                        expect(expanderBtn.hasClass('toggled')).toBeTruthy();
                        item.click();
                        expect(expanderBtn.hasClass('toggled')).toBeFalsy();
                    });

                    it('selecting an item should execute its function', function () {
                        var item = getMenuItem(1);
                        expect(menuItems[1].actionFunc).not.toHaveBeenCalled();
                        /* expand menu */
                        expanderBtn.click();
                        item.click();
                        expect(menuItems[1].actionFunc).toHaveBeenCalled();
                        expanderBtn.click();
                        item.click();
                        expect(menuItems[1].actionFunc).toHaveBeenCalled();
                    });

                    it('should disable button when directive is disabled', function () {
                        var button = $(element.children('button')[0]);
                        expect(button.attr('disabled')).toBeFalsy();
                        $scope.isDisabled = true;
                        $scope.$apply();
                        expect(button.attr('disabled')).toBeTruthy();
                    });
                });

                describe('MenuItem', function () {
                    it('should have a label', function () {
                        var label = 'label text',
                            menuItem = new MenuItem(label);
                        expect(menuItem.getLabel()).toEqual(label);
                    });

                    it('should have a action function', function () {
                        var func = angular.noop,
                            menuItem = new MenuItem('foo', func);
                        /* actionFunc is not exposed in a getter */
                        expect(menuItem.actionFunc).toBe(func);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRHJvcERvd25NZW51QnV0dG9uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFBcEc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsb0NBQW9DLFlBQVc7Z0JBQ3BELElBQUksV0FBUTs7Z0JBRVosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWTtvQkFDbkMsV0FBVzs7O2dCQUdmLFNBQVMsNkJBQTZCLFlBQVc7b0JBQzdDLElBQUksWUFBUzt3QkFBRSxTQUFNO3dCQUFFLFVBQU87d0JBQUUsY0FBVzt3QkFBRSxlQUFZO3dCQUFFLGdCQUFhO3dCQUFFLFdBQVE7O29CQUVsRixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVk7d0JBQ2pELElBQUksV0FBVywrRUFDQTs0QkFDWCxlQUFlOzt3QkFFbkIsU0FBUyxhQUFhO3dCQUN0QixXQUFXOzt3QkFFWCxlQUFlLDRGQUNYO3dCQUNKLGdCQUFnQiw2RkFDWjs7d0JBSUosSUFBSSxlQUFlLFFBQVEsWUFBWSxJQUFJLFNBQVMsWUFBVzs0QkFDM0QsT0FBTzs7NEJBQ1AsWUFBWSxRQUFRLFlBQVksSUFBSSxTQUFTLFlBQVc7NEJBQ3hELGVBQWUsQ0FBQzs7O3dCQUdwQixZQUFZLENBQ1IsSUFBSSxTQUFTLGFBQVksV0FBVyxlQUNwQyxJQUFJLFNBQVMsYUFBYSxRQUFRO3dCQUV0QyxPQUFPLFlBQVk7d0JBQ25CLE9BQU8sYUFBYTs7d0JBRXBCLFVBQVUsUUFBUSxRQUFRO3dCQUMxQixTQUFTLFNBQVM7d0JBQ2xCLE9BQU87d0JBQ1AsY0FBYyxRQUFRLEtBQUs7OztvQkFHL0IsVUFBVSxZQUFXO3dCQUNqQixPQUFPOzs7b0JBR1gsU0FBUyxZQUFZLE9BQU87d0JBQ3hCLE9BQU8sUUFBUSxRQUFRLFFBQVEsS0FBSyxRQUFROzs7b0JBR2hELEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2pELElBQUksS0FBSyxRQUFRLFFBQVEsUUFBUSxLQUFLO3dCQUNyQyxPQUFPLEdBQUcsU0FBUzs7O29CQUd2QixHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxJQUFJLGVBQWUsUUFBUSxRQUFRO3dCQUNuQyxTQUFTLGNBQWM7d0JBQ3ZCLE9BQU87d0JBQ1AsSUFBSSxLQUFLLFFBQVEsUUFBUSxhQUFhLEtBQUs7d0JBQzNDLE9BQU8sR0FBRyxTQUFTOzs7b0JBR3ZCLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELElBQUksY0FBYyxRQUFRLFFBQVE7d0JBQ2xDLFNBQVMsYUFBYTt3QkFDdEIsT0FBTzt3QkFDUCxJQUFJLEtBQUssUUFBUSxRQUFRLFlBQVksS0FBSzt3QkFDMUMsT0FBTyxHQUFHLFNBQVM7OztvQkFHdkIsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsSUFBSSxPQUFPLFlBQVk7O3dCQUV2QixZQUFZO3dCQUNaLEtBQUs7d0JBQ0wsT0FBTyxZQUFZLFNBQVMsWUFBWTs7O29CQUc1QyxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxJQUFJLE9BQU8sWUFBWTs7d0JBRXZCLFlBQVk7d0JBQ1osS0FBSzt3QkFDTCxPQUFPLFlBQVksU0FBUyxZQUFZO3dCQUN4QyxLQUFLO3dCQUNMLE9BQU8sWUFBWSxTQUFTLFlBQVk7OztvQkFHNUMsR0FBRyxpREFBaUQsWUFBVzt3QkFDM0QsSUFBSSxPQUFPLFlBQVk7d0JBQ3ZCLE9BQU8sVUFBVSxHQUFHLFlBQVksSUFBSTs7d0JBRXBDLFlBQVk7d0JBQ1osS0FBSzt3QkFDTCxPQUFPLFVBQVUsR0FBRyxZQUFZO3dCQUNoQyxZQUFZO3dCQUNaLEtBQUs7d0JBQ0wsT0FBTyxVQUFVLEdBQUcsWUFBWTs7O29CQUdwQyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxJQUFJLFNBQVMsRUFBRSxRQUFRLFNBQVMsVUFBVTt3QkFDMUMsT0FBTyxPQUFPLEtBQUssYUFBYTt3QkFDaEMsT0FBTyxhQUFhO3dCQUNwQixPQUFPO3dCQUNQLE9BQU8sT0FBTyxLQUFLLGFBQWE7Ozs7Z0JBSXhDLFNBQVMsWUFBWSxZQUFXO29CQUM1QixHQUFHLHVCQUF1QixZQUFXO3dCQUNqQyxJQUFJLFFBQVE7NEJBQ1IsV0FBVyxJQUFJLFNBQVM7d0JBQzVCLE9BQU8sU0FBUyxZQUFZLFFBQVE7OztvQkFHeEMsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsSUFBSSxPQUFPLFFBQVE7NEJBQ2YsV0FBVyxJQUFJLFNBQVMsT0FBTzs7d0JBRW5DLE9BQU8sU0FBUyxZQUFZLEtBQUs7Ozs7OztHQVUxQyIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0Ryb3BEb3duTWVudUJ1dHRvbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0Ryb3BEb3duTWVudUJ1dHRvbkRpcmVjdGl2ZVRlc3RzJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgTWVudUl0ZW07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX01lbnVJdGVtXykge1xyXG4gICAgICAgIE1lbnVJdGVtID0gX01lbnVJdGVtXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnRHJvcERvd25NZW51SXRlbURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBtZW51SXRlbXMsICRzY29wZSwgZWxlbWVudCwgZXhwYW5kZXJCdG4sIHRlbXBsYXRlTGVmdCwgdGVtcGxhdGVSaWdodCwgJGNvbXBpbGU7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXykge1xyXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSAnPHNwLWRyb3AtZG93bi1tZW51LWJ1dHRvbiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIiBtZW51LWl0ZW1zPVwibWVudUl0ZW1zXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L3NwLWRyb3AtZG93bi1tZW51LWJ1dHRvbj4nLFxyXG4gICAgICAgICAgICAgICAgaXRlbTFUb2dnbGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xyXG4gICAgICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcblxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUxlZnQgPSAnPHNwLWRyb3AtZG93bi1tZW51LWJ1dHRvbiBuZy1kaXNhYmxlZD1cImlzRGlzYWJsZWRcIiBtZW51LWl0ZW1zPVwibWVudUl0ZW1zXCIgYWxpZ249XCJsZWZ0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zcC1kcm9wLWRvd24tbWVudS1idXR0b24+JztcclxuICAgICAgICAgICAgdGVtcGxhdGVSaWdodCA9ICc8c3AtZHJvcC1kb3duLW1lbnUtYnV0dG9uIG5nLWRpc2FibGVkPVwiaXNEaXNhYmxlZFwiIG1lbnUtaXRlbXM9XCJtZW51SXRlbXNcIiBhbGlnbj1cInJpZ2h0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9zcC1kcm9wLWRvd24tbWVudS1idXR0b24+JztcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGlzVG9nZ2xlZFNweSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0xVG9nZ2xlZDtcclxuICAgICAgICAgICAgfSksIGFjdGlvblNweSA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbTFUb2dnbGVkID0gIWl0ZW0xVG9nZ2xlZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMgPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgTWVudUl0ZW0oJ2xhYmVsIG9uZScsYWN0aW9uU3B5LCBpc1RvZ2dsZWRTcHkpLFxyXG4gICAgICAgICAgICAgICAgbmV3IE1lbnVJdGVtKCdsYWJlbCB0d28nLCBqYXNtaW5lLmNyZWF0ZVNweSgpKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAkc2NvcGUubWVudUl0ZW1zID0gbWVudUl0ZW1zO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGFuZGVyQnRuID0gZWxlbWVudC5maW5kKCdidXR0b24nKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1lbnVJdGVtKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdsaT5hJylbaW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgYmUgcmlnaHQgYWxpZ25lZCBieSBkZWZhdWx0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgbGV0IHVsID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuZmluZCgndWwnKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh1bC5oYXNDbGFzcygnZHJvcGRvd24tbWVudS1yaWdodCcpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBsZWZ0IGFsaWduZWQgd2hlbiBhbGlnbj1yaWdodCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudFJpZ2h0ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlUmlnaHQpO1xyXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50UmlnaHQpKCRzY29wZSk7XHJcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGxldCB1bCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50UmlnaHQuZmluZCgndWwnKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh1bC5oYXNDbGFzcygnZHJvcGRvd24tbWVudS1yaWdodCcpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBsZWZ0IGFsaWduZWQgd2hlbiBhbGlnbj1sZWZ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50TGVmdCA9IGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZUxlZnQpO1xyXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50TGVmdCkoJHNjb3BlKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgbGV0IHVsID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnRMZWZ0LmZpbmQoJ3VsJykpO1xyXG4gICAgICAgICAgICBleHBlY3QodWwuaGFzQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUtbGVmdCcpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NlbGVjdGluZyBhbiBpdGVtIHNob3VsZCB0b2dnbGUgaXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBnZXRNZW51SXRlbSgwKTtcclxuICAgICAgICAgICAgLyogZXhwYW5kIG1lbnUgKi9cclxuICAgICAgICAgICAgZXhwYW5kZXJCdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgaXRlbS5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoZXhwYW5kZXJCdG4uaGFzQ2xhc3MoJ3RvZ2dsZWQnKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHVuc2VsZWN0IGlmIHRvZ2dsZWQgYWdhaW4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBnZXRNZW51SXRlbSgwKTtcclxuICAgICAgICAgICAgLyogZXhwYW5kIG1lbnUgKi9cclxuICAgICAgICAgICAgZXhwYW5kZXJCdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgaXRlbS5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QoZXhwYW5kZXJCdG4uaGFzQ2xhc3MoJ3RvZ2dsZWQnKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBpdGVtLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChleHBhbmRlckJ0bi5oYXNDbGFzcygndG9nZ2xlZCcpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NlbGVjdGluZyBhbiBpdGVtIHNob3VsZCBleGVjdXRlIGl0cyBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGdldE1lbnVJdGVtKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QobWVudUl0ZW1zWzFdLmFjdGlvbkZ1bmMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIC8qIGV4cGFuZCBtZW51ICovXHJcbiAgICAgICAgICAgIGV4cGFuZGVyQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1sxXS5hY3Rpb25GdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgICAgIGV4cGFuZGVyQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1sxXS5hY3Rpb25GdW5jKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgZGlzYWJsZSBidXR0b24gd2hlbiBkaXJlY3RpdmUgaXMgZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9ICQoZWxlbWVudC5jaGlsZHJlbignYnV0dG9uJylbMF0pO1xyXG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uLmF0dHIoJ2Rpc2FibGVkJykpLnRvQmVGYWxzeSgpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnTWVudUl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYSBsYWJlbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSAnbGFiZWwgdGV4dCcsXHJcbiAgICAgICAgICAgICAgICBtZW51SXRlbSA9IG5ldyBNZW51SXRlbShsYWJlbCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtZW51SXRlbS5nZXRMYWJlbCgpKS50b0VxdWFsKGxhYmVsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGEgYWN0aW9uIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBmdW5jID0gYW5ndWxhci5ub29wLFxyXG4gICAgICAgICAgICAgICAgbWVudUl0ZW0gPSBuZXcgTWVudUl0ZW0oJ2ZvbycsIGZ1bmMpO1xyXG4gICAgICAgICAgICAvKiBhY3Rpb25GdW5jIGlzIG5vdCBleHBvc2VkIGluIGEgZ2V0dGVyICovXHJcbiAgICAgICAgICAgIGV4cGVjdChtZW51SXRlbS5hY3Rpb25GdW5jKS50b0JlKGZ1bmMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
