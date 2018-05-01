System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('DropDownFitDirective', function () {
                var element = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $window = undefined,
                    elementDefWithoutSelector = '<div sp-drop-down-fit=""></div>',
                    elementDefinition = '<div class="testdiv" width="100px" height="100px">some content</div>' + '<div sp-drop-down-fit="div.testdiv">' + '<ul class="dropdown-menu">' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '<li>a menu item</li>' + '</ul>' + '</div>';

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$window_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $window = _$window_;
                    $window.innerWidth = 800;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(definition) {
                    var body = angular.element('body'),
                        element = angular.element(definition);
                    $compile(element)($scope);
                    body.append(element);
                    $scope.$apply();
                    return element;
                }

                it('does not do anything if xs', function () {
                    $window.innerWidth = 600;
                    element = createElement(elementDefinition);
                    var dropdownMenuBefore = $('ul.dropdown-menu', element),
                        widthBefore = dropdownMenuBefore[0].style.width,
                        leftBefore = dropdownMenuBefore[0].style.left;

                    element.trigger('shown.bs.dropdown');
                    var dropdownMenuAfter = $('ul.dropdown-menu', element),
                        widthAfter = dropdownMenuAfter[0].style.width,
                        leftAfter = dropdownMenuAfter[0].style.left,
                        heightAfter = dropdownMenuAfter[0].style.height,
                        overflowAfter = dropdownMenuAfter[0].style.overflow;
                    expect(widthBefore).toEqual(widthAfter);
                    expect(leftBefore).toEqual(leftAfter);
                    expect(heightAfter).toEqual('');
                    expect(overflowAfter).toEqual('');
                });

                it('should throw if selector is not provided', function () {
                    var elementWithoutSelector = createElement(elementDefWithoutSelector);
                    expect(function () {
                        elementWithoutSelector.trigger('shown.bs.dropdown');
                    }).toThrow();
                });

                it('should set correct css', function () {
                    element = createElement(elementDefinition);
                    element.trigger('shown.bs.dropdown');

                    var dropdownMenu = $('ul.dropdown-menu', element);
                    expect(dropdownMenu[0].style.width).toEqual('auto');
                    expect(dropdownMenu[0].style.left).toEqual('auto');
                    expect(dropdownMenu[0].style.overflow).toEqual('auto');
                    expect(dropdownMenu.height()).toEqual($('div.testdiv').height());
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRHJvcERvd25GaXREaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUzs7Ozs7SUFLaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsd0JBQXdCLFlBQU07Z0JBQ25DLElBQUksVUFBTztvQkFBRSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFDbEMsNEJBQTRCO29CQUM1QixvQkFBb0IseUVBQ2hCLHlDQUNBLCtCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLHlCQUNBLFVBQ0E7O2dCQUVSLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxXQUFXO29CQUMxRCxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixRQUFRLGFBQWE7OztnQkFHekIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLGNBQWMsWUFBWTtvQkFDL0IsSUFBSSxPQUFPLFFBQVEsUUFBUTt3QkFDdkIsVUFBVSxRQUFRLFFBQVE7b0JBQzlCLFNBQVMsU0FBUztvQkFDbEIsS0FBSyxPQUFPO29CQUNaLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLEdBQUcsOEJBQThCLFlBQU07b0JBQ25DLFFBQVEsYUFBYTtvQkFDckIsVUFBVSxjQUFjO29CQUN4QixJQUFJLHFCQUFxQixFQUFFLG9CQUFvQjt3QkFDM0MsY0FBYyxtQkFBbUIsR0FBRyxNQUFNO3dCQUMxQyxhQUFhLG1CQUFtQixHQUFHLE1BQU07O29CQUU3QyxRQUFRLFFBQVE7b0JBQ2hCLElBQUksb0JBQW9CLEVBQUUsb0JBQW9CO3dCQUMxQyxhQUFhLGtCQUFrQixHQUFHLE1BQU07d0JBQ3hDLFlBQVksa0JBQWtCLEdBQUcsTUFBTTt3QkFDdkMsY0FBYyxrQkFBa0IsR0FBRyxNQUFNO3dCQUN6QyxnQkFBZ0Isa0JBQWtCLEdBQUcsTUFBTTtvQkFDL0MsT0FBTyxhQUFhLFFBQVE7b0JBQzVCLE9BQU8sWUFBWSxRQUFRO29CQUMzQixPQUFPLGFBQWEsUUFBUTtvQkFDNUIsT0FBTyxlQUFlLFFBQVE7OztnQkFHbEMsR0FBRyw0Q0FBNEMsWUFBTTtvQkFDakQsSUFBSSx5QkFBeUIsY0FBYztvQkFDM0MsT0FBTyxZQUFNO3dCQUNULHVCQUF1QixRQUFRO3VCQUNoQzs7O2dCQUdQLEdBQUcsMEJBQTBCLFlBQU07b0JBQy9CLFVBQVUsY0FBYztvQkFDeEIsUUFBUSxRQUFROztvQkFFaEIsSUFBSSxlQUFlLEVBQUUsb0JBQW9CO29CQUN6QyxPQUFPLGFBQWEsR0FBRyxNQUFNLE9BQU8sUUFBUTtvQkFDNUMsT0FBTyxhQUFhLEdBQUcsTUFBTSxNQUFNLFFBQVE7b0JBQzNDLE9BQU8sYUFBYSxHQUFHLE1BQU0sVUFBVSxRQUFRO29CQUMvQyxPQUFPLGFBQWEsVUFBVSxRQUFRLEVBQUUsZUFBZTs7Ozs7R0FFNUQiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Ecm9wRG93bkZpdERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG5kZXNjcmliZSgnRHJvcERvd25GaXREaXJlY3RpdmUnLCAoKSA9PiB7XG4gICAgbGV0IGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGUsICR3aW5kb3csXG4gICAgICAgIGVsZW1lbnREZWZXaXRob3V0U2VsZWN0b3IgPSAnPGRpdiBzcC1kcm9wLWRvd24tZml0PVwiXCI+PC9kaXY+JyxcbiAgICAgICAgZWxlbWVudERlZmluaXRpb24gPSAnPGRpdiBjbGFzcz1cInRlc3RkaXZcIiB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMTAwcHhcIj5zb21lIGNvbnRlbnQ8L2Rpdj4nICtcbiAgICAgICAgICAgICc8ZGl2IHNwLWRyb3AtZG93bi1maXQ9XCJkaXYudGVzdGRpdlwiPicgK1xuICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj4nICtcbiAgICAgICAgICAgICc8bGk+YSBtZW51IGl0ZW08L2xpPicgK1xuICAgICAgICAgICAgJzxsaT5hIG1lbnUgaXRlbTwvbGk+JyArXG4gICAgICAgICAgICAnPGxpPmEgbWVudSBpdGVtPC9saT4nICtcbiAgICAgICAgICAgICc8bGk+YSBtZW51IGl0ZW08L2xpPicgK1xuICAgICAgICAgICAgJzxsaT5hIG1lbnUgaXRlbTwvbGk+JyArXG4gICAgICAgICAgICAnPGxpPmEgbWVudSBpdGVtPC9saT4nICtcbiAgICAgICAgICAgICc8bGk+YSBtZW51IGl0ZW08L2xpPicgK1xuICAgICAgICAgICAgJzxsaT5hIG1lbnUgaXRlbTwvbGk+JyArXG4gICAgICAgICAgICAnPGxpPmEgbWVudSBpdGVtPC9saT4nICtcbiAgICAgICAgICAgICc8L3VsPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8sIF8kd2luZG93Xykge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuICAgICAgICAkd2luZG93LmlubmVyV2lkdGggPSA4MDA7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbikge1xuICAgICAgICBsZXQgYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLFxuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgYm9keS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaXQoJ2RvZXMgbm90IGRvIGFueXRoaW5nIGlmIHhzJywgKCkgPT4ge1xuICAgICAgICAkd2luZG93LmlubmVyV2lkdGggPSA2MDA7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgbGV0IGRyb3Bkb3duTWVudUJlZm9yZSA9ICQoJ3VsLmRyb3Bkb3duLW1lbnUnLCBlbGVtZW50KSxcbiAgICAgICAgICAgIHdpZHRoQmVmb3JlID0gZHJvcGRvd25NZW51QmVmb3JlWzBdLnN0eWxlLndpZHRoLFxuICAgICAgICAgICAgbGVmdEJlZm9yZSA9IGRyb3Bkb3duTWVudUJlZm9yZVswXS5zdHlsZS5sZWZ0O1xuXG4gICAgICAgIGVsZW1lbnQudHJpZ2dlcignc2hvd24uYnMuZHJvcGRvd24nKTtcbiAgICAgICAgbGV0IGRyb3Bkb3duTWVudUFmdGVyID0gJCgndWwuZHJvcGRvd24tbWVudScsIGVsZW1lbnQpLFxuICAgICAgICAgICAgd2lkdGhBZnRlciA9IGRyb3Bkb3duTWVudUFmdGVyWzBdLnN0eWxlLndpZHRoLFxuICAgICAgICAgICAgbGVmdEFmdGVyID0gZHJvcGRvd25NZW51QWZ0ZXJbMF0uc3R5bGUubGVmdCxcbiAgICAgICAgICAgIGhlaWdodEFmdGVyID0gZHJvcGRvd25NZW51QWZ0ZXJbMF0uc3R5bGUuaGVpZ2h0LFxuICAgICAgICAgICAgb3ZlcmZsb3dBZnRlciA9IGRyb3Bkb3duTWVudUFmdGVyWzBdLnN0eWxlLm92ZXJmbG93O1xuICAgICAgICBleHBlY3Qod2lkdGhCZWZvcmUpLnRvRXF1YWwod2lkdGhBZnRlcik7XG4gICAgICAgIGV4cGVjdChsZWZ0QmVmb3JlKS50b0VxdWFsKGxlZnRBZnRlcik7XG4gICAgICAgIGV4cGVjdChoZWlnaHRBZnRlcikudG9FcXVhbCgnJyk7XG4gICAgICAgIGV4cGVjdChvdmVyZmxvd0FmdGVyKS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgc2VsZWN0b3IgaXMgbm90IHByb3ZpZGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudFdpdGhvdXRTZWxlY3RvciA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZldpdGhvdXRTZWxlY3Rvcik7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50V2l0aG91dFNlbGVjdG9yLnRyaWdnZXIoJ3Nob3duLmJzLmRyb3Bkb3duJyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGNvcnJlY3QgY3NzJywgKCkgPT4ge1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgIGVsZW1lbnQudHJpZ2dlcignc2hvd24uYnMuZHJvcGRvd24nKTtcblxuICAgICAgICBsZXQgZHJvcGRvd25NZW51ID0gJCgndWwuZHJvcGRvd24tbWVudScsIGVsZW1lbnQpO1xuICAgICAgICBleHBlY3QoZHJvcGRvd25NZW51WzBdLnN0eWxlLndpZHRoKS50b0VxdWFsKCdhdXRvJyk7XG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnVbMF0uc3R5bGUubGVmdCkudG9FcXVhbCgnYXV0bycpO1xuICAgICAgICBleHBlY3QoZHJvcGRvd25NZW51WzBdLnN0eWxlLm92ZXJmbG93KS50b0VxdWFsKCdhdXRvJyk7XG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUuaGVpZ2h0KCkpLnRvRXF1YWwoJCgnZGl2LnRlc3RkaXYnKS5oZWlnaHQoKSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
