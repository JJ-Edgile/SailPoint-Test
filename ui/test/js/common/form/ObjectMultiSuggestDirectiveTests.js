System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {

    /**
    * Unit tests for the spObjectMultiSuggest directive.
    */
    'use strict';

    var formModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('spObjectMultiSuggest', function () {

                var objects = [{
                    id: '1',
                    displayName: 'App 1'
                }, {
                    id: '2',
                    displayName: 'App 2'
                }, {
                    id: '3',
                    displayName: 'Object 3'
                }],
                    $compile,
                    scope,
                    objectSuggestService,
                    suggestTestService;

                beforeEach(module(testModule, formModule));

                beforeEach(inject(function ($q, $rootScope, _objectSuggestService_, _suggestTestService_, _$compile_) {
                    $compile = _$compile_;
                    objectSuggestService = _objectSuggestService_;
                    suggestTestService = _suggestTestService_;

                    scope = $rootScope.$new();
                    scope.objects = [];

                    spyOn(objectSuggestService, 'getObjects').and.callFake(function () {
                        return objects;
                    });
                }));

                /**
                 * Compile the given HTML and return the resulting element.
                 */
                var compile = function (inputTpl) {
                    var el = $compile(angular.element(inputTpl))(scope);
                    scope.$apply();
                    return el;
                };

                it('should require model', function () {
                    expect(function () {
                        compile('<sp-object-multi-suggest/>');
                    }).toThrow();
                });

                it('should have the specified id', function () {
                    var el,
                        id = 'someId';
                    el = compile('<sp-object-multi-suggest sp-object-multi-suggest-id="' + id + '" ' + 'ng-model="objects" sp-object-multi-suggest-class="sailpoint.object.Application"/>');
                    expect(el.find('#' + id).length).toBe(1);
                });

                it('should have the default id if none specified', function () {
                    var el;
                    el = compile('<sp-object-multi-suggest ng-model="objects" ' + 'sp-object-multi-suggest-class="sailpoint.object.Application"/>');
                    expect(el.find('#objectSuggestField').length).toBe(1);
                });

                it('should call objectSuggestService.getObjects when searching', function () {
                    var el;
                    el = compile('<sp-object-multi-suggest ng-model="objects" ' + 'sp-object-multi-suggest-class="sailpoint.object.Application"/>');
                    suggestTestService.searchByTyping(el, 'foo', scope);
                    expect(objectSuggestService.getObjects).toHaveBeenCalledWith('sailpoint.object.Application', 'foo', '5', undefined, {}, '');
                });

                it('should call objectSuggestService.getObjects with filter when configured', function () {
                    var el;

                    el = compile('<sp-object-multi-suggest ng-model="objects" ' + 'sp-object-multi-suggest-class="sailpoint.object.Application" ' + 'sp-object-multi-suggest-filter="foo"/>');

                    suggestTestService.searchByTyping(el, 'foo', scope);

                    expect(objectSuggestService.getObjects).toHaveBeenCalledWith('sailpoint.object.Application', 'foo', '5', undefined, {}, 'foo');
                });

                it('should update model when item selected', function () {
                    var el, addButton, selectedItems;
                    el = compile('<sp-object-multi-suggest sp-object-multi-suggest-class="sailpoint.object.Application" ' + 'ng-model="objects"/>');
                    addButton = el.find('.multi-suggest-add-btn');
                    suggestTestService.selectSuggestItem(el, 0, scope);
                    addButton.click();
                    expect(scope.objects.length).toBe(1);
                    expect(scope.objects[0]).toBe(objects[0]);
                    selectedItems = el.find('.selected-items input');
                    expect(selectedItems.length).toBe(1);
                    expect(selectedItems.first().val()).toEqual(objects[0].displayName);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL09iamVjdE11bHRpU3VnZ2VzdERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFLNUc7O0lBRUEsSUFBSSxZQUFZO0lBQ2hCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBUDdCLFNBQVMsd0JBQXdCLFlBQVc7O2dCQUV4QyxJQUFJLFVBQVUsQ0FBQztvQkFDUCxJQUFJO29CQUNKLGFBQWE7bUJBQ2Q7b0JBQ0MsSUFBSTtvQkFDSixhQUFhO21CQUNkO29CQUNDLElBQUk7b0JBQ0osYUFBYTs7b0JBRWpCO29CQUFVO29CQUFPO29CQUFzQjs7Z0JBRTNDLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsSUFBSSxZQUFZLHdCQUF3QixzQkFBc0IsWUFBWTtvQkFDakcsV0FBVztvQkFDWCx1QkFBdUI7b0JBQ3ZCLHFCQUFxQjs7b0JBRXJCLFFBQVEsV0FBVztvQkFDbkIsTUFBTSxVQUFVOztvQkFFaEIsTUFBTSxzQkFBc0IsY0FBYyxJQUFJLFNBQVMsWUFBVzt3QkFDOUQsT0FBTzs7Ozs7OztnQkFPZixJQUFJLFVBQVUsVUFBUyxVQUFVO29CQUM3QixJQUFJLEtBQUssU0FBUyxRQUFRLFFBQVEsV0FBVztvQkFDN0MsTUFBTTtvQkFDTixPQUFPOzs7Z0JBSVgsR0FBRyx3QkFBd0IsWUFBVztvQkFDbEMsT0FBTyxZQUFXO3dCQUNkLFFBQVE7dUJBQ1Q7OztnQkFHUCxHQUFHLGdDQUFnQyxZQUFXO29CQUMxQyxJQUFJO3dCQUFJLEtBQUs7b0JBQ2IsS0FBSyxRQUFRLDBEQUEwRCxLQUFLLE9BQzNEO29CQUNqQixPQUFPLEdBQUcsS0FBSyxNQUFNLElBQUksUUFBUSxLQUFLOzs7Z0JBRzFDLEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELElBQUk7b0JBQ0osS0FBSyxRQUFRLGlEQUNUO29CQUNKLE9BQU8sR0FBRyxLQUFLLHVCQUF1QixRQUFRLEtBQUs7OztnQkFHdkQsR0FBRyw4REFBOEQsWUFBVztvQkFDeEUsSUFBSTtvQkFDSixLQUFLLFFBQVEsaURBQ1Q7b0JBQ0osbUJBQW1CLGVBQWUsSUFBSSxPQUFPO29CQUM3QyxPQUFPLHFCQUFxQixZQUN2QixxQkFBcUIsZ0NBQWdDLE9BQU8sS0FBSyxXQUFXLElBQUk7OztnQkFHekYsR0FBRywyRUFBMkUsWUFBVztvQkFDckYsSUFBSTs7b0JBRUosS0FBSyxRQUFRLGlEQUNULGtFQUNBOztvQkFFSixtQkFBbUIsZUFBZSxJQUFJLE9BQU87O29CQUU3QyxPQUFPLHFCQUFxQixZQUN2QixxQkFBcUIsZ0NBQWdDLE9BQU8sS0FBSyxXQUFXLElBQUk7OztnQkFHekYsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsSUFBSSxJQUFJLFdBQVc7b0JBQ25CLEtBQUssUUFBUSwyRkFDVDtvQkFDSixZQUFZLEdBQUcsS0FBSztvQkFDcEIsbUJBQW1CLGtCQUFrQixJQUFJLEdBQUc7b0JBQzVDLFVBQVU7b0JBQ1YsT0FBTyxNQUFNLFFBQVEsUUFBUSxLQUFLO29CQUNsQyxPQUFPLE1BQU0sUUFBUSxJQUFJLEtBQUssUUFBUTtvQkFDdEMsZ0JBQWdCLEdBQUcsS0FBSztvQkFDeEIsT0FBTyxjQUFjLFFBQVEsS0FBSztvQkFDbEMsT0FBTyxjQUFjLFFBQVEsT0FBTyxRQUFRLFFBQVEsR0FBRzs7Ozs7R0FRNUQiLCJmaWxlIjoiY29tbW9uL2Zvcm0vT2JqZWN0TXVsdGlTdWdnZXN0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4qIFVuaXQgdGVzdHMgZm9yIHRoZSBzcE9iamVjdE11bHRpU3VnZ2VzdCBkaXJlY3RpdmUuXG4qL1xuZGVzY3JpYmUoJ3NwT2JqZWN0TXVsdGlTdWdnZXN0JywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgb2JqZWN0cyA9IFt7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdBcHAgMSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQXBwIDInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ09iamVjdCAzJ1xuICAgICAgICB9XSxcbiAgICAgICAgJGNvbXBpbGUsIHNjb3BlLCBvYmplY3RTdWdnZXN0U2VydmljZSwgc3VnZ2VzdFRlc3RTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgZm9ybU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHEsICRyb290U2NvcGUsIF9vYmplY3RTdWdnZXN0U2VydmljZV8sIF9zdWdnZXN0VGVzdFNlcnZpY2VfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgb2JqZWN0U3VnZ2VzdFNlcnZpY2UgPSBfb2JqZWN0U3VnZ2VzdFNlcnZpY2VfO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2UgPSBfc3VnZ2VzdFRlc3RTZXJ2aWNlXztcblxuICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICBzY29wZS5vYmplY3RzID0gW107XG5cbiAgICAgICAgc3B5T24ob2JqZWN0U3VnZ2VzdFNlcnZpY2UsICdnZXRPYmplY3RzJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdHM7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIENvbXBpbGUgdGhlIGdpdmVuIEhUTUwgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIGVsZW1lbnQuXG4gICAgICovXG4gICAgdmFyIGNvbXBpbGUgPSBmdW5jdGlvbihpbnB1dFRwbCkge1xuICAgICAgICB2YXIgZWwgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoaW5wdXRUcGwpKShzY29wZSk7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuXG4gICAgaXQoJ3Nob3VsZCByZXF1aXJlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbXBpbGUoJzxzcC1vYmplY3QtbXVsdGktc3VnZ2VzdC8+Jyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSB0aGUgc3BlY2lmaWVkIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCwgaWQgPSAnc29tZUlkJztcbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3Atb2JqZWN0LW11bHRpLXN1Z2dlc3Qgc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtaWQ9XCInICsgaWQgKyAnXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ25nLW1vZGVsPVwib2JqZWN0c1wiIHNwLW9iamVjdC1tdWx0aS1zdWdnZXN0LWNsYXNzPVwic2FpbHBvaW50Lm9iamVjdC5BcHBsaWNhdGlvblwiLz4nKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJyMnICsgaWQpLmxlbmd0aCkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSB0aGUgZGVmYXVsdCBpZCBpZiBub25lIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG4gICAgICAgIGVsID0gY29tcGlsZSgnPHNwLW9iamVjdC1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwib2JqZWN0c1wiICcgK1xuICAgICAgICAgICAgJ3NwLW9iamVjdC1tdWx0aS1zdWdnZXN0LWNsYXNzPVwic2FpbHBvaW50Lm9iamVjdC5BcHBsaWNhdGlvblwiLz4nKTtcbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJyNvYmplY3RTdWdnZXN0RmllbGQnKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgb2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cyB3aGVuIHNlYXJjaGluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG4gICAgICAgIGVsID0gY29tcGlsZSgnPHNwLW9iamVjdC1tdWx0aS1zdWdnZXN0IG5nLW1vZGVsPVwib2JqZWN0c1wiICcgK1xuICAgICAgICAgICAgJ3NwLW9iamVjdC1tdWx0aS1zdWdnZXN0LWNsYXNzPVwic2FpbHBvaW50Lm9iamVjdC5BcHBsaWNhdGlvblwiLz4nKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlYXJjaEJ5VHlwaW5nKGVsLCAnZm9vJywgc2NvcGUpO1xuICAgICAgICBleHBlY3Qob2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cylcbiAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc2FpbHBvaW50Lm9iamVjdC5BcHBsaWNhdGlvbicsICdmb28nLCAnNScsIHVuZGVmaW5lZCwge30sICcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBvYmplY3RTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzIHdpdGggZmlsdGVyIHdoZW4gY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QgbmctbW9kZWw9XCJvYmplY3RzXCIgJyArXG4gICAgICAgICAgICAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LkFwcGxpY2F0aW9uXCIgJyArXG4gICAgICAgICAgICAnc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtZmlsdGVyPVwiZm9vXCIvPicpO1xuXG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ2ZvbycsIHNjb3BlKTtcblxuICAgICAgICBleHBlY3Qob2JqZWN0U3VnZ2VzdFNlcnZpY2UuZ2V0T2JqZWN0cylcbiAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc2FpbHBvaW50Lm9iamVjdC5BcHBsaWNhdGlvbicsICdmb28nLCAnNScsIHVuZGVmaW5lZCwge30sICdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdXBkYXRlIG1vZGVsIHdoZW4gaXRlbSBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwsIGFkZEJ1dHRvbiwgc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgZWwgPSBjb21waWxlKCc8c3Atb2JqZWN0LW11bHRpLXN1Z2dlc3Qgc3Atb2JqZWN0LW11bHRpLXN1Z2dlc3QtY2xhc3M9XCJzYWlscG9pbnQub2JqZWN0LkFwcGxpY2F0aW9uXCIgJyArXG4gICAgICAgICAgICAnbmctbW9kZWw9XCJvYmplY3RzXCIvPicpO1xuICAgICAgICBhZGRCdXR0b24gPSBlbC5maW5kKCcubXVsdGktc3VnZ2VzdC1hZGQtYnRuJyk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWxlY3RTdWdnZXN0SXRlbShlbCwgMCwgc2NvcGUpO1xuICAgICAgICBhZGRCdXR0b24uY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm9iamVjdHMubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3Qoc2NvcGUub2JqZWN0c1swXSkudG9CZShvYmplY3RzWzBdKTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IGVsLmZpbmQoJy5zZWxlY3RlZC1pdGVtcyBpbnB1dCcpO1xuICAgICAgICBleHBlY3Qoc2VsZWN0ZWRJdGVtcy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChzZWxlY3RlZEl0ZW1zLmZpcnN0KCkudmFsKCkpLnRvRXF1YWwob2JqZWN0c1swXS5kaXNwbGF5TmFtZSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
