System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('AttributeListDirective', function () {

                var $scope, $compile;

                function createElement(object) {
                    var element,
                        elementDef = '<sp-attribute-list sp-attributes="fakeCtrl.attributes"></sp-attribute-list>';
                    $scope.fakeCtrl.attributes = object;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function validateSimpleValues(element, keys, obj) {
                    var lis = element.find('li');
                    expect(lis.length).toEqual(keys.length);
                    keys.forEach(function (key) {
                        expect(lis.toArray().some(function (li) {
                            var innerText = li.innerText.trim();
                            return innerText === key + ': ' + obj[key];
                        })).toBeTruthy();
                    });
                }

                beforeEach(module(directiveModule));
                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                }));

                describe('with empty object', function () {
                    it('should render as an empty ul', function () {
                        var element = undefined;
                        element = createElement({});
                        expect(element.children().length).toEqual(0);
                    });

                    it('should render as an empty ul with undefined also', function () {
                        var element = undefined;
                        element = createElement();
                        expect(element.children().length).toEqual(0);
                    });
                });

                describe('with simple values', function () {
                    it('should render an li for each item', function () {
                        var obj = { a: 'foo', b: 'bar', c: 123 },
                            keys = Object.keys(obj);
                        validateSimpleValues(createElement(obj), keys, obj);
                    });
                });

                describe('with array values', function () {
                    it('should show single values normally', function () {
                        var obj = { a: [123], foo: 'bar' },
                            keys = Object.keys(obj);
                        validateSimpleValues(createElement(obj), keys, obj);
                    });

                    it('should show multiple values as a table thing', function () {
                        var element = undefined,
                            lis = undefined,
                            values = [123, 'foo', 'bar'],
                            obj = { a: values };

                        element = createElement(obj);
                        // Arrays are rendered as nested uls
                        lis = element.find('ul ul li');
                        expect(lis.length).toEqual(values.length);
                        values.forEach(function (value) {
                            expect(lis.toArray().some(function (li) {
                                var innerText = li.innerText.trim();
                                return innerText === value.toString();
                            })).toBeTruthy();
                        });
                    });
                });
            });

            describe('AttributeListCtrl', function () {
                var ctrl = undefined;

                beforeEach(module(directiveModule));
                beforeEach(inject(function ($controller) {
                    ctrl = $controller('AttributeListCtrl');
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

                describe('hasMultipleValues()', function () {
                    it('should return false if not an array', function () {
                        expect(ctrl.hasMultipleValues('simple')).toBeFalsy();
                    });

                    it('should return false if an empty array', function () {
                        expect(ctrl.hasMultipleValues([])).toBeFalsy();
                    });

                    it('should return false if an array with one item', function () {
                        expect(ctrl.hasMultipleValues(['just one'])).toBeFalsy();
                    });

                    it('should return true if an array with multiple values', function () {
                        expect(ctrl.hasMultipleValues(['more', 'than', 'one'])).toBeTruthy();
                    });
                });

                describe('getSingleValue()', function () {
                    it('should return value if not array', function () {
                        var value = 'notarray';
                        expect(ctrl.getSingleValue(value)).toBe(value);
                    });

                    it('should return first value in array if is array', function () {
                        var value = ['array'];
                        expect(ctrl.getSingleValue(value)).toBe(value[0]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvQXR0cmlidXRlTGlzdERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLDBCQUEwQixZQUFXOztnQkFFMUMsSUFBSSxRQUNBOztnQkFFSixTQUFTLGNBQWMsUUFBUTtvQkFDdkIsSUFBSTt3QkFDQSxhQUFhO29CQUNqQixPQUFPLFNBQVMsYUFBYTtvQkFDN0IsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR2YsU0FBUyxxQkFBcUIsU0FBUyxNQUFNLEtBQUs7b0JBQzlDLElBQUksTUFBTSxRQUFRLEtBQUs7b0JBQ3ZCLE9BQU8sSUFBSSxRQUFRLFFBQVEsS0FBSztvQkFDaEMsS0FBSyxRQUFRLFVBQUEsS0FBTzt3QkFDaEIsT0FBTyxJQUFJLFVBQVUsS0FBSyxVQUFBLElBQU07NEJBQzVCLElBQUksWUFBWSxHQUFHLFVBQVU7NEJBQzdCLE9BQU8sY0FBYyxNQUFNLE9BQU8sSUFBSTs0QkFDdEM7Ozs7Z0JBSVosV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVk7b0JBQ2pELFNBQVMsYUFBYTtvQkFDdEIsT0FBTyxXQUFXO29CQUNsQixXQUFXOzs7Z0JBR2YsU0FBUyxxQkFBcUIsWUFBTTtvQkFDaEMsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsSUFBSSxVQUFPO3dCQUNYLFVBQVUsY0FBYzt3QkFDeEIsT0FBTyxRQUFRLFdBQVcsUUFBUSxRQUFROzs7b0JBRzlDLEdBQUcsb0RBQW9ELFlBQU07d0JBQ3pELElBQUksVUFBTzt3QkFDWCxVQUFVO3dCQUNWLE9BQU8sUUFBUSxXQUFXLFFBQVEsUUFBUTs7OztnQkFJbEQsU0FBUyxzQkFBc0IsWUFBTTtvQkFDakMsR0FBRyxxQ0FBcUMsWUFBTTt3QkFDMUMsSUFBSSxNQUFNLEVBQUMsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHOzRCQUM5QixPQUFPLE9BQU8sS0FBSzt3QkFDdkIscUJBQXFCLGNBQWMsTUFBTSxNQUFNOzs7O2dCQUl2RCxTQUFTLHFCQUFxQixZQUFNO29CQUNoQyxHQUFHLHNDQUFzQyxZQUFNO3dCQUMzQyxJQUFJLE1BQU0sRUFBQyxHQUFHLENBQUMsTUFBTSxLQUFLOzRCQUN0QixPQUFPLE9BQU8sS0FBSzt3QkFDdkIscUJBQXFCLGNBQWMsTUFBTSxNQUFNOzs7b0JBR25ELEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELElBQUksVUFBTzs0QkFBRSxNQUFHOzRCQUNaLFNBQVMsQ0FBQyxLQUFLLE9BQU87NEJBQ3RCLE1BQU0sRUFBQyxHQUFHOzt3QkFFZCxVQUFVLGNBQWM7O3dCQUV4QixNQUFNLFFBQVEsS0FBSzt3QkFDbkIsT0FBTyxJQUFJLFFBQVEsUUFBUSxPQUFPO3dCQUNsQyxPQUFPLFFBQVEsVUFBQSxPQUFTOzRCQUNwQixPQUFPLElBQUksVUFBVSxLQUFLLFVBQUEsSUFBTTtnQ0FDNUIsSUFBSSxZQUFZLEdBQUcsVUFBVTtnQ0FDN0IsT0FBTyxjQUFjLE1BQU07Z0NBQzNCOzs7Ozs7WUFNcEIsU0FBUyxxQkFBcUIsWUFBTTtnQkFDaEMsSUFBSSxPQUFJOztnQkFFUixXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFDLGFBQWdCO29CQUMvQixPQUFPLFlBQVk7OztnQkFHdkIsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLE9BQU8sS0FBSyxhQUFhOzs7b0JBRzdCLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLE9BQU8sS0FBSyxhQUFhOzs7b0JBRzdCLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLE9BQU8sS0FBSyxVQUFVLEVBQUMsTUFBTSxZQUFXOzs7O2dCQUloRCxTQUFTLHVCQUF1QixZQUFNO29CQUNsQyxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLEtBQUssa0JBQWtCLFdBQVc7OztvQkFHN0MsR0FBRyx5Q0FBeUMsWUFBTTt3QkFDOUMsT0FBTyxLQUFLLGtCQUFrQixLQUFLOzs7b0JBR3ZDLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELE9BQU8sS0FBSyxrQkFBa0IsQ0FBQyxjQUFjOzs7b0JBR2pELEdBQUcsdURBQXVELFlBQU07d0JBQzVELE9BQU8sS0FBSyxrQkFBa0IsQ0FBQyxRQUFRLFFBQVEsU0FBUzs7OztnQkFJaEUsU0FBUyxvQkFBb0IsWUFBTTtvQkFDL0IsR0FBRyxvQ0FBb0MsWUFBTTt3QkFDekMsSUFBSSxRQUFRO3dCQUNaLE9BQU8sS0FBSyxlQUFlLFFBQVEsS0FBSzs7O29CQUc1QyxHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCxJQUFJLFFBQVEsQ0FBQzt3QkFDYixPQUFPLEtBQUssZUFBZSxRQUFRLEtBQUssTUFBTTs7Ozs7O0dBYXZEIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvQXR0cmlidXRlTGlzdERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0F0dHJpYnV0ZUxpc3REaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkc2NvcGUsXG4gICAgICAgICRjb21waWxlO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChvYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50LFxuICAgICAgICAgICAgICAgIGVsZW1lbnREZWYgPSAnPHNwLWF0dHJpYnV0ZS1saXN0IHNwLWF0dHJpYnV0ZXM9XCJmYWtlQ3RybC5hdHRyaWJ1dGVzXCI+PC9zcC1hdHRyaWJ1dGUtbGlzdD4nO1xuICAgICAgICAgICAgJHNjb3BlLmZha2VDdHJsLmF0dHJpYnV0ZXMgPSBvYmplY3Q7XG4gICAgICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWYpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlU2ltcGxlVmFsdWVzKGVsZW1lbnQsIGtleXMsIG9iaikge1xuICAgICAgICBsZXQgbGlzID0gZWxlbWVudC5maW5kKCdsaScpO1xuICAgICAgICBleHBlY3QobGlzLmxlbmd0aCkudG9FcXVhbChrZXlzLmxlbmd0aCk7XG4gICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGxpcy50b0FycmF5KCkuc29tZShsaSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlubmVyVGV4dCA9IGxpLmlubmVyVGV4dC50cmltKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlubmVyVGV4dCA9PT0ga2V5ICsgJzogJyArIG9ialtrZXldO1xuICAgICAgICAgICAgfSkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRzY29wZS5mYWtlQ3RybCA9IHt9O1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggZW1wdHkgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhcyBhbiBlbXB0eSB1bCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50O1xuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoe30pO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGFzIGFuIGVtcHR5IHVsIHdpdGggdW5kZWZpbmVkIGFsc28nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aCBzaW1wbGUgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhbiBsaSBmb3IgZWFjaCBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG9iaiA9IHthOiAnZm9vJywgYjogJ2JhcicsIGM6IDEyM30sXG4gICAgICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgICAgICB2YWxpZGF0ZVNpbXBsZVZhbHVlcyhjcmVhdGVFbGVtZW50KG9iaiksIGtleXMsIG9iaik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggYXJyYXkgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHNob3cgc2luZ2xlIHZhbHVlcyBub3JtYWxseScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSB7YTogWzEyM10sIGZvbzogJ2Jhcid9LFxuICAgICAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICAgICAgdmFsaWRhdGVTaW1wbGVWYWx1ZXMoY3JlYXRlRWxlbWVudChvYmopLCBrZXlzLCBvYmopO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNob3cgbXVsdGlwbGUgdmFsdWVzIGFzIGEgdGFibGUgdGhpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCwgbGlzLFxuICAgICAgICAgICAgICAgIHZhbHVlcyA9IFsxMjMsICdmb28nLCAnYmFyJ10sXG4gICAgICAgICAgICAgICAgb2JqID0ge2E6IHZhbHVlc307XG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KG9iaik7XG4gICAgICAgICAgICAvLyBBcnJheXMgYXJlIHJlbmRlcmVkIGFzIG5lc3RlZCB1bHNcbiAgICAgICAgICAgIGxpcyA9IGVsZW1lbnQuZmluZCgndWwgdWwgbGknKTtcbiAgICAgICAgICAgIGV4cGVjdChsaXMubGVuZ3RoKS50b0VxdWFsKHZhbHVlcy5sZW5ndGgpO1xuICAgICAgICAgICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChsaXMudG9BcnJheSgpLnNvbWUobGkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJUZXh0ID0gbGkuaW5uZXJUZXh0LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlubmVyVGV4dCA9PT0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9KSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdBdHRyaWJ1dGVMaXN0Q3RybCcsICgpID0+IHtcbiAgICBsZXQgY3RybDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkY29udHJvbGxlcikgPT4ge1xuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0F0dHJpYnV0ZUxpc3RDdHJsJyk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2hhc1ZhbHVlcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNWYWx1ZXMoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGVtcHR5IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1ZhbHVlcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBoYXMgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNWYWx1ZXMoe3NvbWU6ICd0aGluZyd9KSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNNdWx0aXBsZVZhbHVlcygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBub3QgYW4gYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNNdWx0aXBsZVZhbHVlcygnc2ltcGxlJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBhbiBlbXB0eSBhcnJheScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc011bHRpcGxlVmFsdWVzKFtdKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGFuIGFycmF5IHdpdGggb25lIGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNNdWx0aXBsZVZhbHVlcyhbJ2p1c3Qgb25lJ10pKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBhbiBhcnJheSB3aXRoIG11bHRpcGxlIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc011bHRpcGxlVmFsdWVzKFsnbW9yZScsICd0aGFuJywgJ29uZSddKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRTaW5nbGVWYWx1ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB2YWx1ZSBpZiBub3QgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAnbm90YXJyYXknO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U2luZ2xlVmFsdWUodmFsdWUpKS50b0JlKHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmlyc3QgdmFsdWUgaW4gYXJyYXkgaWYgaXMgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBbJ2FycmF5J107XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTaW5nbGVWYWx1ZSh2YWx1ZSkpLnRvQmUodmFsdWVbMF0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
