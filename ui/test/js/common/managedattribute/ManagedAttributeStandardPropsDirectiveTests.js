System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeStandardPropsDirective', function () {

                var $scope = undefined,
                    $compile = undefined,
                    standardProperties = ['application', 'type', 'attribute', 'value', 'displayValue', 'description', 'requestable', 'owner'],
                    extendedAttributes = {
                    foo: 'bar',
                    lorem: 'ipsum'
                };

                function createElement(managedAttribute) {
                    var element = undefined,
                        elementDef = '<sp-managed-attribute-standard-props sp-managed-attribute="fakeCtrl.managedAttribute">' + '</sp-managed-attribute-standard-props>';
                    $scope.fakeCtrl.managedAttribute = managedAttribute;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                }));

                it('should throw with no managed attribute', function () {
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });

                it('should display standard managed attribute properties', function () {
                    var managedAttribute = {},
                        element = undefined,
                        lis = undefined;
                    standardProperties.forEach(function (property) {
                        return managedAttribute[property] = property;
                    });
                    element = createElement(managedAttribute);
                    lis = element.find('li').toArray();
                    expect(lis.length).toEqual(standardProperties.length);
                    standardProperties.forEach(function (property) {
                        return expect(lis.some(function (li) {
                            return li.innerText.indexOf(': ' + property) >= 0;
                        }));
                    });
                });

                it('should display extended attributes is the exist', function () {
                    var managedAttribute = { extendedAttributes: extendedAttributes },
                        extendedAttributeKeys = Object.keys(extendedAttributes),
                        element = undefined,
                        extendedUl = undefined,
                        lis = undefined;
                    standardProperties.forEach(function (property) {
                        return managedAttribute[property] = property;
                    });
                    element = createElement(managedAttribute);
                    extendedUl = angular.element(element.find('ul')[1]);
                    lis = extendedUl.find('li').toArray();
                    expect(lis.length).toEqual(extendedAttributeKeys.length);
                    extendedAttributeKeys.forEach(function (property) {
                        return expect(lis.some(function (li) {
                            return li.innerText.indexOf(property + ': ' + extendedAttributes[property]) >= 0;
                        }));
                    });
                });
            });

            describe('ManagedAttributeStandardPropsCtrl', function () {
                var ctrl = undefined;

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function ($controller) {
                    ctrl = $controller('ManagedAttributeStandardPropsCtrl');
                }));

                describe('hasValues()', function () {
                    it('should return false if undefined', function () {
                        expect(ctrl.hasValues()).toBeFalsy();
                    });

                    it('should return false if empty object', function () {
                        expect(ctrl.hasValues()).toBeFalsy();
                    });

                    it('should return true if has value', function () {
                        expect(ctrl.hasValues({ some: 'thing' })).toBeTruthy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVTdGFuZGFyZFByb3BzRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7SUFDOUc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLCtDQUErQztZQUNyRyx5QkFBeUIsOENBQThDOztRQUUzRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsMENBQTBDLFlBQVc7O2dCQUUxRCxJQUFJLFNBQU07b0JBQ04sV0FBUTtvQkFDUixxQkFBcUIsQ0FDakIsZUFDQSxRQUNBLGFBQ0EsU0FDQSxnQkFDQSxlQUNBLGVBQ0E7b0JBRUoscUJBQXFCO29CQUNqQixLQUFLO29CQUNMLE9BQU87OztnQkFLZixTQUFTLGNBQWMsa0JBQWtCO29CQUNyQyxJQUFJLFVBQU87d0JBQ1AsYUFBYSwyRkFDVDtvQkFDUixPQUFPLFNBQVMsbUJBQW1CO29CQUNuQyxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWTtvQkFDakQsU0FBUyxhQUFhO29CQUN0QixPQUFPLFdBQVc7b0JBQ2xCLFdBQVc7OztnQkFHZixHQUFHLDBDQUEwQyxZQUFNO29CQUMvQyxPQUFPLFlBQUE7d0JBSlMsT0FJSDt1QkFBaUI7OztnQkFHbEMsR0FBRyx3REFBd0QsWUFBTTtvQkFDN0QsSUFBSSxtQkFBbUI7d0JBQ25CLFVBQU87d0JBQ1AsTUFBRztvQkFDUCxtQkFBbUIsUUFBUSxVQUFBLFVBQVE7d0JBRm5CLE9BRXVCLGlCQUFpQixZQUFZOztvQkFDcEUsVUFBVSxjQUFjO29CQUN4QixNQUFNLFFBQVEsS0FBSyxNQUFNO29CQUN6QixPQUFPLElBQUksUUFBUSxRQUFRLG1CQUFtQjtvQkFDOUMsbUJBQW1CLFFBQ2YsVUFBQSxVQUFRO3dCQURJLE9BQ0EsT0FBTyxJQUFJLEtBQ25CLFVBQUEsSUFBRTs0QkFEVSxPQUNOLEdBQUcsVUFBVSxRQUFRLE9BQU8sYUFBYTs7Ozs7Z0JBRzNELEdBQUcsbURBQW1ELFlBQU07b0JBQ3hELElBQUksbUJBQW1CLEVBQUMsb0JBQW9CO3dCQUN4Qyx3QkFBd0IsT0FBTyxLQUFLO3dCQUNwQyxVQUFPO3dCQUFFLGFBQVU7d0JBQUUsTUFBRztvQkFDNUIsbUJBQW1CLFFBQVEsVUFBQSxVQUFRO3dCQUluQixPQUp1QixpQkFBaUIsWUFBWTs7b0JBQ3BFLFVBQVUsY0FBYztvQkFDeEIsYUFBYSxRQUFRLFFBQVEsUUFBUSxLQUFLLE1BQU07b0JBQ2hELE1BQU0sV0FBVyxLQUFLLE1BQU07b0JBQzVCLE9BQU8sSUFBSSxRQUFRLFFBQVEsc0JBQXNCO29CQUNqRCxzQkFBc0IsUUFDbEIsVUFBQSxVQUFRO3dCQUtJLE9BTEEsT0FBTyxJQUFJLEtBQ25CLFVBQUEsSUFBRTs0QkFLVSxPQUxOLEdBQUcsVUFBVSxRQUFRLFdBQVcsT0FBTyxtQkFBbUIsY0FBYzs7Ozs7O1lBSzlGLFNBQVMscUNBQXFDLFlBQU07Z0JBQ2hELElBQUksT0FBSTs7Z0JBRVIsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBQyxhQUFnQjtvQkFDL0IsT0FBTyxZQUFZOzs7Z0JBR3ZCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxPQUFPLEtBQUssYUFBYTs7O29CQUc3QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLEtBQUssYUFBYTs7O29CQUc3QixHQUFHLG1DQUFtQyxZQUFNO3dCQUN4QyxPQUFPLEtBQUssVUFBVSxFQUFDLE1BQU0sWUFBVzs7Ozs7O0dBWWpEIiwiZmlsZSI6ImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVTdGFuZGFyZFByb3BzRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtYW5hZ2VkQXR0cmlidXRlTW9kdWxlIGZyb20gJ2NvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNb2R1bGUnO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZVN0YW5kYXJkUHJvcHNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkc2NvcGUsXG4gICAgICAgICRjb21waWxlLFxuICAgICAgICBzdGFuZGFyZFByb3BlcnRpZXMgPSBbXG4gICAgICAgICAgICAnYXBwbGljYXRpb24nLFxuICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgJ2F0dHJpYnV0ZScsXG4gICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgJ3JlcXVlc3RhYmxlJyxcbiAgICAgICAgICAgICdvd25lcidcbiAgICAgICAgXSxcbiAgICAgICAgZXh0ZW5kZWRBdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgZm9vOiAnYmFyJyxcbiAgICAgICAgICAgIGxvcmVtOiAnaXBzdW0nXG4gICAgICAgIH07XG5cblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlKSB7XG4gICAgICAgIGxldCBlbGVtZW50LFxuICAgICAgICAgICAgZWxlbWVudERlZiA9ICc8c3AtbWFuYWdlZC1hdHRyaWJ1dGUtc3RhbmRhcmQtcHJvcHMgc3AtbWFuYWdlZC1hdHRyaWJ1dGU9XCJmYWtlQ3RybC5tYW5hZ2VkQXR0cmlidXRlXCI+JyArXG4gICAgICAgICAgICAgICAgJzwvc3AtbWFuYWdlZC1hdHRyaWJ1dGUtc3RhbmRhcmQtcHJvcHM+JztcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlO1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWYpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsID0ge307XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gbWFuYWdlZCBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KCkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzcGxheSBzdGFuZGFyZCBtYW5hZ2VkIGF0dHJpYnV0ZSBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZSA9IHt9LFxuICAgICAgICAgICAgZWxlbWVudCxcbiAgICAgICAgICAgIGxpcztcbiAgICAgICAgc3RhbmRhcmRQcm9wZXJ0aWVzLmZvckVhY2gocHJvcGVydHkgPT4gbWFuYWdlZEF0dHJpYnV0ZVtwcm9wZXJ0eV0gPSBwcm9wZXJ0eSk7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KG1hbmFnZWRBdHRyaWJ1dGUpO1xuICAgICAgICBsaXMgPSBlbGVtZW50LmZpbmQoJ2xpJykudG9BcnJheSgpO1xuICAgICAgICBleHBlY3QobGlzLmxlbmd0aCkudG9FcXVhbChzdGFuZGFyZFByb3BlcnRpZXMubGVuZ3RoKTtcbiAgICAgICAgc3RhbmRhcmRQcm9wZXJ0aWVzLmZvckVhY2goXG4gICAgICAgICAgICBwcm9wZXJ0eSA9PiBleHBlY3QobGlzLnNvbWUoXG4gICAgICAgICAgICAgICAgbGkgPT4gbGkuaW5uZXJUZXh0LmluZGV4T2YoJzogJyArIHByb3BlcnR5KSA+PSAwKSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkaXNwbGF5IGV4dGVuZGVkIGF0dHJpYnV0ZXMgaXMgdGhlIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZSA9IHtleHRlbmRlZEF0dHJpYnV0ZXM6IGV4dGVuZGVkQXR0cmlidXRlc30sXG4gICAgICAgICAgICBleHRlbmRlZEF0dHJpYnV0ZUtleXMgPSBPYmplY3Qua2V5cyhleHRlbmRlZEF0dHJpYnV0ZXMpLFxuICAgICAgICAgICAgZWxlbWVudCwgZXh0ZW5kZWRVbCwgbGlzO1xuICAgICAgICBzdGFuZGFyZFByb3BlcnRpZXMuZm9yRWFjaChwcm9wZXJ0eSA9PiBtYW5hZ2VkQXR0cmlidXRlW3Byb3BlcnR5XSA9IHByb3BlcnR5KTtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQobWFuYWdlZEF0dHJpYnV0ZSk7XG4gICAgICAgIGV4dGVuZGVkVWwgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCd1bCcpWzFdKTtcbiAgICAgICAgbGlzID0gZXh0ZW5kZWRVbC5maW5kKCdsaScpLnRvQXJyYXkoKTtcbiAgICAgICAgZXhwZWN0KGxpcy5sZW5ndGgpLnRvRXF1YWwoZXh0ZW5kZWRBdHRyaWJ1dGVLZXlzLmxlbmd0aCk7XG4gICAgICAgIGV4dGVuZGVkQXR0cmlidXRlS2V5cy5mb3JFYWNoKFxuICAgICAgICAgICAgcHJvcGVydHkgPT4gZXhwZWN0KGxpcy5zb21lKFxuICAgICAgICAgICAgICAgIGxpID0+IGxpLmlubmVyVGV4dC5pbmRleE9mKHByb3BlcnR5ICsgJzogJyArIGV4dGVuZGVkQXR0cmlidXRlc1twcm9wZXJ0eV0pID49IDApKSk7XG4gICAgfSk7XG5cbn0pO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZVN0YW5kYXJkUHJvcHNDdHJsJywgKCkgPT4ge1xuICAgIGxldCBjdHJsO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkY29udHJvbGxlcikgPT4ge1xuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ01hbmFnZWRBdHRyaWJ1dGVTdGFuZGFyZFByb3BzQ3RybCcpO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdoYXNWYWx1ZXMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzVmFsdWVzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBlbXB0eSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNWYWx1ZXMoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgaGFzIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzVmFsdWVzKHtzb21lOiAndGhpbmcnfSkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
