System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeObjectPropsDirective', function () {

                var Entitlement = undefined,
                    $scope = undefined,
                    $compile = undefined;

                function createElement(managedAttribute) {
                    var element = undefined,
                        elementDef = '<sp-managed-attribute-object-props sp-managed-attribute="fakeCtrl.managedAttribute">' + '</sp-managed-attribute-object-props>';
                    $scope.fakeCtrl.managedAttribute = managedAttribute;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_Entitlement_, _$rootScope_, _$compile_) {
                    Entitlement = _Entitlement_;
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                }));

                it('should throw with no managed attribute', function () {
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });

                it('should display group attributes', function () {
                    var managedAttribute = {
                        groupAttributes: {
                            foo: 'bar',
                            what: 'evs'
                        }
                    },
                        groupKeys = Object.keys(managedAttribute.groupAttributes),
                        element = undefined,
                        lis = undefined;
                    element = createElement(managedAttribute);
                    lis = element.find('li').toArray();
                    expect(lis.length).toEqual(groupKeys.length);
                    groupKeys.forEach(function (key) {
                        return expect(lis.some(function (li) {
                            return li.innerText.indexOf(key + ': ' + managedAttribute.groupAttributes[key]) >= 0;
                        }));
                    });
                });

                it('should show group entitlements', function () {
                    var managedAttribute = {
                        groupEntitlements: [new Entitlement({
                            id: 123,
                            value: 'some value',
                            attribute: 'attr',
                            description: 'words'
                        })]
                    },
                        element = undefined,
                        cells = undefined;
                    element = createElement(managedAttribute);
                    /* Check the entitlement table for the expected values */
                    cells = element.find('tr.first-of-attribute td');
                    expect(cells.length).toEqual(3);
                    expect(cells[0].innerText.trim()).toEqual('attr');
                    expect(cells[1].innerText.trim()).toEqual('some value');
                    expect(cells[2].innerText.trim()).toEqual('words');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVPYmplY3RQcm9wc1Rlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixtREFBbUQsVUFBVSxTQUFTO0lBQzlHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcseUJBQXlCLDhDQUE4Qzs7UUFFM0UsU0FBUyxZQUFZOztZQUw3QixTQUFTLHdDQUF3QyxZQUFXOztnQkFFeEQsSUFBSSxjQUFXO29CQUNYLFNBQU07b0JBQ04sV0FBUTs7Z0JBRVosU0FBUyxjQUFjLGtCQUFrQjtvQkFDckMsSUFBSSxVQUFPO3dCQUNQLGFBQWEseUZBQ1Q7b0JBQ1IsT0FBTyxTQUFTLG1CQUFtQjtvQkFDbkMsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxlQUFlLGNBQWMsWUFBWTtvQkFDaEUsY0FBYztvQkFDZCxTQUFTLGFBQWE7b0JBQ3RCLE9BQU8sV0FBVztvQkFDbEIsV0FBVzs7O2dCQUdmLEdBQUcsMENBQTBDLFlBQU07b0JBQy9DLE9BQU8sWUFBQTt3QkFPUyxPQVBIO3VCQUFpQjs7O2dCQUdsQyxHQUFHLG1DQUFtQyxZQUFNO29CQUN4QyxJQUFJLG1CQUFtQjt3QkFDZixpQkFBaUI7NEJBQ2IsS0FBSzs0QkFDTCxNQUFNOzs7d0JBR2QsWUFBWSxPQUFPLEtBQUssaUJBQWlCO3dCQUN6QyxVQUFPO3dCQUNQLE1BQUc7b0JBQ1AsVUFBVSxjQUFjO29CQUN4QixNQUFNLFFBQVEsS0FBSyxNQUFNO29CQUN6QixPQUFPLElBQUksUUFBUSxRQUFRLFVBQVU7b0JBQ3JDLFVBQVUsUUFDTixVQUFBLEtBQUc7d0JBUVMsT0FSTCxPQUFPLElBQUksS0FDZCxVQUFBLElBQUU7NEJBUVUsT0FSTixHQUFHLFVBQVUsUUFBUSxNQUFNLE9BQU8saUJBQWlCLGdCQUFnQixTQUFTOzs7OztnQkFHOUYsR0FBRyxrQ0FBa0MsWUFBTTtvQkFDdkMsSUFBSSxtQkFBbUI7d0JBQ2YsbUJBQW1CLENBQ2YsSUFBSSxZQUFZOzRCQUNaLElBQUk7NEJBQ0osT0FBTzs0QkFDUCxXQUFXOzRCQUNYLGFBQWE7Ozt3QkFJekIsVUFBTzt3QkFDUCxRQUFLO29CQUNULFVBQVUsY0FBYzs7b0JBRXhCLFFBQVEsUUFBUSxLQUFLO29CQUNyQixPQUFPLE1BQU0sUUFBUSxRQUFRO29CQUM3QixPQUFPLE1BQU0sR0FBRyxVQUFVLFFBQVEsUUFBUTtvQkFDMUMsT0FBTyxNQUFNLEdBQUcsVUFBVSxRQUFRLFFBQVE7b0JBQzFDLE9BQU8sTUFBTSxHQUFHLFVBQVUsUUFBUSxRQUFROzs7OztHQWEvQyIsImZpbGUiOiJjb21tb24vbWFuYWdlZGF0dHJpYnV0ZS9NYW5hZ2VkQXR0cmlidXRlT2JqZWN0UHJvcHNUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUgZnJvbSAnY29tbW9uL21hbmFnZWRhdHRyaWJ1dGUvTWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdNYW5hZ2VkQXR0cmlidXRlT2JqZWN0UHJvcHNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBFbnRpdGxlbWVudCxcbiAgICAgICAgJHNjb3BlLFxuICAgICAgICAkY29tcGlsZTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQobWFuYWdlZEF0dHJpYnV0ZSkge1xuICAgICAgICBsZXQgZWxlbWVudCxcbiAgICAgICAgICAgIGVsZW1lbnREZWYgPSAnPHNwLW1hbmFnZWQtYXR0cmlidXRlLW9iamVjdC1wcm9wcyBzcC1tYW5hZ2VkLWF0dHJpYnV0ZT1cImZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGVcIj4nICtcbiAgICAgICAgICAgICAgICAnPC9zcC1tYW5hZ2VkLWF0dHJpYnV0ZS1vYmplY3QtcHJvcHM+JztcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlO1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWYpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfRW50aXRsZW1lbnRfLCBfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8pIHtcbiAgICAgICAgRW50aXRsZW1lbnQgPSBfRW50aXRsZW1lbnRfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkc2NvcGUuZmFrZUN0cmwgPSB7fTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBtYW5hZ2VkIGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQoKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkaXNwbGF5IGdyb3VwIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtYW5hZ2VkQXR0cmlidXRlID0ge1xuICAgICAgICAgICAgICAgIGdyb3VwQXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInLFxuICAgICAgICAgICAgICAgICAgICB3aGF0OiAnZXZzJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncm91cEtleXMgPSBPYmplY3Qua2V5cyhtYW5hZ2VkQXR0cmlidXRlLmdyb3VwQXR0cmlidXRlcyksXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgbGlzO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlKTtcbiAgICAgICAgbGlzID0gZWxlbWVudC5maW5kKCdsaScpLnRvQXJyYXkoKTtcbiAgICAgICAgZXhwZWN0KGxpcy5sZW5ndGgpLnRvRXF1YWwoZ3JvdXBLZXlzLmxlbmd0aCk7XG4gICAgICAgIGdyb3VwS2V5cy5mb3JFYWNoKFxuICAgICAgICAgICAga2V5ID0+IGV4cGVjdChsaXMuc29tZShcbiAgICAgICAgICAgICAgICBsaSA9PiBsaS5pbm5lclRleHQuaW5kZXhPZihrZXkgKyAnOiAnICsgbWFuYWdlZEF0dHJpYnV0ZS5ncm91cEF0dHJpYnV0ZXNba2V5XSkgPj0gMCkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBncm91cCBlbnRpdGxlbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtYW5hZ2VkQXR0cmlidXRlID0ge1xuICAgICAgICAgICAgICAgIGdyb3VwRW50aXRsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyBFbnRpdGxlbWVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMTIzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdzb21lIHZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2F0dHInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICd3b3JkcydcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIGNlbGxzO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlKTtcbiAgICAgICAgLyogQ2hlY2sgdGhlIGVudGl0bGVtZW50IHRhYmxlIGZvciB0aGUgZXhwZWN0ZWQgdmFsdWVzICovXG4gICAgICAgIGNlbGxzID0gZWxlbWVudC5maW5kKCd0ci5maXJzdC1vZi1hdHRyaWJ1dGUgdGQnKTtcbiAgICAgICAgZXhwZWN0KGNlbGxzLmxlbmd0aCkudG9FcXVhbCgzKTtcbiAgICAgICAgZXhwZWN0KGNlbGxzWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ2F0dHInKTtcbiAgICAgICAgZXhwZWN0KGNlbGxzWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3NvbWUgdmFsdWUnKTtcbiAgICAgICAgZXhwZWN0KGNlbGxzWzJdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3dvcmRzJyk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
