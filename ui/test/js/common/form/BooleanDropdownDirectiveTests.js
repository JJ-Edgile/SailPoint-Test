System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /*
    This is just a specialized version of spDropdown, so look at DropdownDirectiveTests for functional tests
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('spBooleanDropdown', function () {
                var attributeDefinition = '<div sp-boolean-dropdown="" sp-show-blank="showBlank" ng-model="selectedValue" />',
                    elementDefinition = '<sp-boolean-dropdown sp-show-blank="showBlank" ng-model="selectedValue" />',
                    $scope,
                    $compile;

                function createElement(definition) {
                    var element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function findDropdownMenu(element) {
                    return element.find('.dropdown-menu')[0];
                }

                beforeEach(module(formModule));

                beforeEach(inject(function ($rootScope, _$compile_, spTranslateFilter) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;

                    // Setup the test catalog.
                    spTranslateFilter.configureCatalog({
                        'ui_true': 'True',
                        'ui_false': 'False'
                    });

                    $scope.selectedValue = null;
                    $scope.showBlank = true;
                }));

                it('creates dropdown with True/False options', function () {
                    var element = createElement(attributeDefinition),
                        dropdownMenu = findDropdownMenu(element);

                    expect(dropdownMenu).toBeDefined();

                    expect(dropdownMenu.children.length).toEqual(3);
                    /* Should have a sr-only element reading no selection*/
                    expect(angular.element(dropdownMenu).find('span').attr('class')).toContain('sr-only');
                    expect(dropdownMenu.children[0].innerText.trim()).toEqual('ui_dropdown_no_selection');
                    expect(dropdownMenu.children[1].innerText.trim()).toEqual('True');
                    expect(dropdownMenu.children[2].innerText.trim()).toEqual('False');

                    $scope.showBlank = false;
                    element = createElement(attributeDefinition);
                    dropdownMenu = findDropdownMenu(element);
                    expect(dropdownMenu.children.length).toEqual(2);
                    expect(dropdownMenu.children[0].innerText.trim()).toEqual('True');
                    expect(dropdownMenu.children[1].innerText.trim()).toEqual('False');
                });

                it('sets value when selected', function () {
                    var element = createElement(elementDefinition),
                        dropdownMenu = findDropdownMenu(element);

                    expect(dropdownMenu).toBeDefined();
                    angular.element(dropdownMenu.children[1].children[0]).click();
                    expect($scope.selectedValue).toEqual(true);
                    angular.element(dropdownMenu.children[0].children[0]).click();
                    expect($scope.selectedValue).toBeUndefined();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Jvb2xlYW5Ecm9wZG93bkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTOzs7OztJQUt0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxxQkFBcUIsWUFBVztnQkFDckMsSUFBSSxzQkFBc0I7b0JBQ3RCLG9CQUFvQjtvQkFDcEI7b0JBQU87O2dCQUVYLFNBQVMsY0FBYyxZQUFZO29CQUMvQixJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsaUJBQWlCLFNBQVM7b0JBQy9CLE9BQU8sUUFBUSxLQUFLLGtCQUFrQjs7O2dCQUcxQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksbUJBQW1CO29CQUNsRSxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7OztvQkFHWCxrQkFBa0IsaUJBQWlCO3dCQUMvQixXQUFXO3dCQUNYLFlBQVk7OztvQkFHaEIsT0FBTyxnQkFBZ0I7b0JBQ3ZCLE9BQU8sWUFBWTs7O2dCQUd2QixHQUFHLDRDQUE0QyxZQUFXO29CQUN0RCxJQUFJLFVBQVUsY0FBYzt3QkFDeEIsZUFBZSxpQkFBaUI7O29CQUVwQyxPQUFPLGNBQWM7O29CQUVyQixPQUFPLGFBQWEsU0FBUyxRQUFRLFFBQVE7O29CQUU3QyxPQUFPLFFBQVEsUUFBUSxjQUFjLEtBQUssUUFBUSxLQUFLLFVBQVUsVUFBVTtvQkFDM0UsT0FBTyxhQUFhLFNBQVMsR0FBRyxVQUFVLFFBQVEsUUFBUTtvQkFDMUQsT0FBTyxhQUFhLFNBQVMsR0FBRyxVQUFVLFFBQVEsUUFBUTtvQkFDMUQsT0FBTyxhQUFhLFNBQVMsR0FBRyxVQUFVLFFBQVEsUUFBUTs7b0JBRTFELE9BQU8sWUFBWTtvQkFDbkIsVUFBVSxjQUFjO29CQUN4QixlQUFlLGlCQUFpQjtvQkFDaEMsT0FBTyxhQUFhLFNBQVMsUUFBUSxRQUFRO29CQUM3QyxPQUFPLGFBQWEsU0FBUyxHQUFHLFVBQVUsUUFBUSxRQUFRO29CQUMxRCxPQUFPLGFBQWEsU0FBUyxHQUFHLFVBQVUsUUFBUSxRQUFROzs7Z0JBRzlELEdBQUcsNEJBQTRCLFlBQVc7b0JBQ3RDLElBQUksVUFBVSxjQUFjO3dCQUN4QixlQUFlLGlCQUFpQjs7b0JBRXBDLE9BQU8sY0FBYztvQkFDckIsUUFBUSxRQUFRLGFBQWEsU0FBUyxHQUFHLFNBQVMsSUFBSTtvQkFDdEQsT0FBTyxPQUFPLGVBQWUsUUFBUTtvQkFDckMsUUFBUSxRQUFRLGFBQWEsU0FBUyxHQUFHLFNBQVMsSUFBSTtvQkFDdEQsT0FBTyxPQUFPLGVBQWU7Ozs7O0dBYWxDIiwiZmlsZSI6ImNvbW1vbi9mb3JtL0Jvb2xlYW5Ecm9wZG93bkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLypcblRoaXMgaXMganVzdCBhIHNwZWNpYWxpemVkIHZlcnNpb24gb2Ygc3BEcm9wZG93biwgc28gbG9vayBhdCBEcm9wZG93bkRpcmVjdGl2ZVRlc3RzIGZvciBmdW5jdGlvbmFsIHRlc3RzXG4gKi9cbmRlc2NyaWJlKCdzcEJvb2xlYW5Ecm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRyaWJ1dGVEZWZpbml0aW9uID0gJzxkaXYgc3AtYm9vbGVhbi1kcm9wZG93bj1cIlwiIHNwLXNob3ctYmxhbms9XCJzaG93QmxhbmtcIiBuZy1tb2RlbD1cInNlbGVjdGVkVmFsdWVcIiAvPicsXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1ib29sZWFuLWRyb3Bkb3duIHNwLXNob3ctYmxhbms9XCJzaG93QmxhbmtcIiBuZy1tb2RlbD1cInNlbGVjdGVkVmFsdWVcIiAvPicsXG4gICAgICAgICRzY29wZSwkY29tcGlsZTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRHJvcGRvd25NZW51KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUnKVswXTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSB0ZXN0IGNhdGFsb2cuXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ3VpX3RydWUnOiAnVHJ1ZScsXG4gICAgICAgICAgICAndWlfZmFsc2UnOiAnRmFsc2UnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLnNob3dCbGFuayA9IHRydWU7XG4gICAgfSkpO1xuXG4gICAgaXQoJ2NyZWF0ZXMgZHJvcGRvd24gd2l0aCBUcnVlL0ZhbHNlIG9wdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGF0dHJpYnV0ZURlZmluaXRpb24pLFxuICAgICAgICAgICAgZHJvcGRvd25NZW51ID0gZmluZERyb3Bkb3duTWVudShlbGVtZW50KTtcblxuICAgICAgICBleHBlY3QoZHJvcGRvd25NZW51KS50b0JlRGVmaW5lZCgpO1xuXG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUuY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICAvKiBTaG91bGQgaGF2ZSBhIHNyLW9ubHkgZWxlbWVudCByZWFkaW5nIG5vIHNlbGVjdGlvbiovXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZHJvcGRvd25NZW51KS5maW5kKCdzcGFuJykuYXR0cignY2xhc3MnKSkudG9Db250YWluKCdzci1vbmx5Jyk7XG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgndWlfZHJvcGRvd25fbm9fc2VsZWN0aW9uJyk7XG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUuY2hpbGRyZW5bMV0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgnVHJ1ZScpO1xuICAgICAgICBleHBlY3QoZHJvcGRvd25NZW51LmNoaWxkcmVuWzJdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ0ZhbHNlJyk7XG5cbiAgICAgICAgJHNjb3BlLnNob3dCbGFuayA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChhdHRyaWJ1dGVEZWZpbml0aW9uKTtcbiAgICAgICAgZHJvcGRvd25NZW51ID0gZmluZERyb3Bkb3duTWVudShlbGVtZW50KTtcbiAgICAgICAgZXhwZWN0KGRyb3Bkb3duTWVudS5jaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgnVHJ1ZScpO1xuICAgICAgICBleHBlY3QoZHJvcGRvd25NZW51LmNoaWxkcmVuWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ0ZhbHNlJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyB2YWx1ZSB3aGVuIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbiksXG4gICAgICAgICAgICBkcm9wZG93bk1lbnUgPSBmaW5kRHJvcGRvd25NZW51KGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChkcm9wZG93bk1lbnUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChkcm9wZG93bk1lbnUuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0pLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuc2VsZWN0ZWRWYWx1ZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRyb3Bkb3duTWVudS5jaGlsZHJlblswXS5jaGlsZHJlblswXSkuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS5zZWxlY3RlZFZhbHVlKS50b0JlVW5kZWZpbmVkKCk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
