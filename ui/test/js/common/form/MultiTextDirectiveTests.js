System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
    * Unit tests for the multi-text directive.
    */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('spMultiText', function () {

                var modelName = 'model',
                    messages = {
                    'ui_form_previous_value': 'Previous Value'
                },
                    formItem,
                    $compile,
                    scope,
                    controller;

                beforeEach(module(formModule));

                /**
                 * Setup the tests.
                 */
                beforeEach(inject(function ($rootScope, _$compile_, spTranslateFilter) {
                    // Save our dependencies for later use.
                    $compile = _$compile_;
                    scope = $rootScope;
                    scope.model = [];
                    scope.showPreviousValue = false;

                    spTranslateFilter.configureCatalog(messages);

                    formItem = {
                        itemId: 'formItemId',
                        disabled: false,
                        fieldLabel: 'This is a multi-text input.'
                    };
                }));

                var buildMultiTextTemplate = function (model, item) {
                    var template = '<sp-multi-text ';
                    if (angular.isDefined(model)) {
                        template += 'ng-model="' + model + '" ';
                    }
                    if (angular.isDefined(item.itemId)) {
                        template += 'sp-multi-text-item-id="' + item.itemId + '" ';
                    }
                    if (angular.isDefined(item.disabled)) {
                        template += 'ng-disabled="' + item.disabled + '" ';
                    }
                    if (angular.isDefined(item.fieldLabel)) {
                        template += 'sp-multi-text-label="' + item.fieldLabel + '" ';
                    }
                    if (angular.isDefined(item.helpText)) {
                        template += 'sp-multi-text-help-text="' + item.helpText + '" ';
                    }
                    if (angular.isDefined(item.previousValue)) {
                        template += 'sp-multi-text-previous-value="' + item.previousValue + '" ';
                    }
                    if (angular.isDefined(item.required)) {
                        template += 'ng-required="' + item.required + '" ';
                    }
                    template += 'sp-multi-text-show-previous-value="showPreviousValue" />';
                    return template;
                };

                /**
                 * Compile the given HTML and return the resulting element.
                 */
                var compile = function (inputTpl) {
                    var el = angular.element(inputTpl);
                    $compile(el)(scope);
                    scope.$apply();
                    controller = el.controller('spMultiText');
                    return el;
                };

                it('should throw if no model is passed', function () {
                    expect(function () {
                        compile(buildMultiTextTemplate());
                    }).toThrow();
                });

                it('should add text to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(1);
                    expect(scope.model[0]).toEqual('higgs');
                });

                it('should not add whitespace to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = '  \t \n';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(0);
                });

                it('should trim before adding text to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = '\t   higgs   \n';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(1);
                    expect(scope.model[0]).toEqual('higgs');
                });

                it('should add text to the model with an enter keypress', function () {
                    var event = {};
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(0);
                    // test non-enter key
                    event.keyCode = 113;
                    controller.handleKeyPress(event);
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    event.keyCode = 13;
                    controller.handleKeyPress(event);
                    expect(scope.model.length).toEqual(1);
                    expect(scope.model[0]).toEqual('higgs');
                });

                it('should add two values to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(1);
                    // add text again
                    controller.value = 'boson';
                    expect(scope.model.length).toEqual(1);
                    // trigger adding again
                    controller.addItem();
                    expect(scope.model.length).toEqual(2);
                    expect(scope.model[0]).toEqual('higgs');
                    expect(scope.model[1]).toEqual('boson');
                });

                it('should not add duplicate values to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(1);
                    // add text again
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(1);
                    // trigger adding again
                    controller.addItem();
                    // length should be the same since the duplicate wasn't added
                    expect(scope.model.length).toEqual(1);
                });

                it('should not add different case duplicate values to the model', function () {
                    compile(buildMultiTextTemplate(modelName, formItem));
                    expect(scope.model.length).toEqual(0);
                    // add text
                    controller.value = 'higgs';
                    expect(scope.model.length).toEqual(0);
                    // trigger adding
                    controller.addItem();
                    expect(scope.model.length).toEqual(1);
                    // add text again
                    controller.value = 'hiGgs';
                    expect(scope.model.length).toEqual(1);
                    // trigger adding again
                    controller.addItem();
                    // length should be the same since the duplicate wasn't added
                    expect(scope.model.length).toEqual(1);
                });

                it('should display a help text block if configured', function () {
                    var el, helpBlock;

                    formItem.helpText = 'Some help text';
                    el = compile(buildMultiTextTemplate(modelName, formItem));
                    helpBlock = el.find('#' + formItem.itemId + '-help');

                    expect(helpBlock.text().trim()).toEqual(formItem.helpText);
                });

                it('should display a previous value if configured', function () {
                    var el, previousBlock;

                    formItem.previousValue = 'previous';
                    scope.showPreviousValue = true;
                    el = compile(buildMultiTextTemplate(modelName, formItem));
                    previousBlock = el.find('#' + formItem.itemId + '-previous');
                    expect(previousBlock.length).toEqual(1);
                    expect(previousBlock.text().trim()).toEqual(messages['ui_form_previous_value'] + ': ' + formItem.previousValue);
                });

                it('should not display a previous value if not configured on the form', function () {
                    var el, previousBlock;

                    formItem.previousValue = 'previous';
                    el = compile(buildMultiTextTemplate(modelName, formItem));
                    previousBlock = el.find('#' + formItem.itemId + '-previous');
                    expect(previousBlock.length).toEqual(0);
                });

                it('should add required attribute if required', function () {
                    var el;

                    formItem.required = true;
                    el = compile(buildMultiTextTemplate(modelName, formItem));

                    expect(el.find('input[required=required]').length).toEqual(1);
                });

                it('should not add required attribute if required but has at least one item', function () {
                    var el;

                    formItem.required = true;
                    scope.model = ['foo'];
                    el = compile(buildMultiTextTemplate(modelName, formItem));

                    expect(el.find('input[required=required]').length).toEqual(0);
                });

                afterEach(function () {
                    angular.element('sp-multi-text').remove();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL011bHRpVGV4dERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTOzs7OztJQUt0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxlQUFlLFlBQVc7O2dCQUUvQixJQUFJLFlBQVk7b0JBQ1osV0FBVztvQkFDUCwwQkFBMEI7O29CQUU5QjtvQkFBVTtvQkFBVTtvQkFBTzs7Z0JBRy9CLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSxtQkFBbUI7O29CQUVsRSxXQUFXO29CQUNYLFFBQVE7b0JBQ1IsTUFBTSxRQUFRO29CQUNkLE1BQU0sb0JBQW9COztvQkFFMUIsa0JBQWtCLGlCQUFpQjs7b0JBRW5DLFdBQVc7d0JBQ1AsUUFBUTt3QkFDUixVQUFVO3dCQUNWLFlBQVk7Ozs7Z0JBSXBCLElBQUkseUJBQXlCLFVBQVMsT0FBTyxNQUFNO29CQUMvQyxJQUFJLFdBQVc7b0JBQ2YsSUFBRyxRQUFRLFVBQVUsUUFBUTt3QkFDekIsWUFBWSxlQUFlLFFBQVE7O29CQUV2QyxJQUFHLFFBQVEsVUFBVSxLQUFLLFNBQVM7d0JBQy9CLFlBQVksNEJBQTRCLEtBQUssU0FBUzs7b0JBRTFELElBQUcsUUFBUSxVQUFVLEtBQUssV0FBVzt3QkFDakMsWUFBWSxrQkFBa0IsS0FBSyxXQUFXOztvQkFFbEQsSUFBRyxRQUFRLFVBQVUsS0FBSyxhQUFhO3dCQUNuQyxZQUFZLDBCQUEwQixLQUFLLGFBQWE7O29CQUU1RCxJQUFJLFFBQVEsVUFBVSxLQUFLLFdBQVc7d0JBQ2xDLFlBQVksOEJBQThCLEtBQUssV0FBVzs7b0JBRTlELElBQUksUUFBUSxVQUFVLEtBQUssZ0JB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LFFBQVEsdUJBQXVCLFdBQVc7O29CQUUvQyxPQUFPLEdBQUcsS0FBSyw0QkFBNEIsUUFBUSxRQUFROzs7Z0JBRy9ELEdBQUcsMkVBQTJFLFlBQVc7b0JBQ3JGLElBQUk7O29CQUVKLFNBQVMsV0FBVztvQkFDcEIsTUFBTSxRQUFRLENBQUM7b0JBQ2YsS0FBSyxRQUFRLHVCQUF1QixXQUFXOztvQkFFL0MsT0FBTyxHQUFHLEtBQUssNEJBQTRCLFFBQVEsUUFBUTs7O2dCQUcvRCxVQUFVLFlBQVc7b0JBQ2pCLFFBQVEsUUFBUSxpQkFBaUI7Ozs7O0dBY3RDIiwiZmlsZSI6ImNvbW1vbi9mb3JtL011bHRpVGV4dERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4qIFVuaXQgdGVzdHMgZm9yIHRoZSBtdWx0aS10ZXh0IGRpcmVjdGl2ZS5cbiovXG5kZXNjcmliZSgnc3BNdWx0aVRleHQnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBtb2RlbE5hbWUgPSAnbW9kZWwnLFxuICAgICAgICBtZXNzYWdlcyA9IHtcbiAgICAgICAgICAgICd1aV9mb3JtX3ByZXZpb3VzX3ZhbHVlJzogJ1ByZXZpb3VzIFZhbHVlJ1xuICAgICAgICB9LFxuICAgICAgICBmb3JtSXRlbSwgJGNvbXBpbGUsIHNjb3BlLCBjb250cm9sbGVyO1xuXG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgdGVzdHMuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcbiAgICAgICAgLy8gU2F2ZSBvdXIgZGVwZW5kZW5jaWVzIGZvciBsYXRlciB1c2UuXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICBzY29wZS5tb2RlbCA9IFtdO1xuICAgICAgICBzY29wZS5zaG93UHJldmlvdXNWYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2cobWVzc2FnZXMpO1xuXG4gICAgICAgIGZvcm1JdGVtID0ge1xuICAgICAgICAgICAgaXRlbUlkOiAnZm9ybUl0ZW1JZCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBmaWVsZExhYmVsOiAnVGhpcyBpcyBhIG11bHRpLXRleHQgaW5wdXQuJ1xuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIHZhciBidWlsZE11bHRpVGV4dFRlbXBsYXRlID0gZnVuY3Rpb24obW9kZWwsIGl0ZW0pIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJzxzcC1tdWx0aS10ZXh0ICc7XG4gICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKG1vZGVsKSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgKz0gJ25nLW1vZGVsPVwiJyArIG1vZGVsICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQoaXRlbS5pdGVtSWQpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtbXVsdGktdGV4dC1pdGVtLWlkPVwiJyArIGl0ZW0uaXRlbUlkICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQoaXRlbS5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICduZy1kaXNhYmxlZD1cIicgKyBpdGVtLmRpc2FibGVkICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQoaXRlbS5maWVsZExhYmVsKSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgKz0gJ3NwLW11bHRpLXRleHQtbGFiZWw9XCInICsgaXRlbS5maWVsZExhYmVsICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGl0ZW0uaGVscFRleHQpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtbXVsdGktdGV4dC1oZWxwLXRleHQ9XCInICsgaXRlbS5oZWxwVGV4dCArICdcIiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChpdGVtLnByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtbXVsdGktdGV4dC1wcmV2aW91cy12YWx1ZT1cIicgKyBpdGVtLnByZXZpb3VzVmFsdWUgKyAnXCIgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoaXRlbS5yZXF1aXJlZCkpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICduZy1yZXF1aXJlZD1cIicgKyBpdGVtLnJlcXVpcmVkICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUgKz0gJ3NwLW11bHRpLXRleHQtc2hvdy1wcmV2aW91cy12YWx1ZT1cInNob3dQcmV2aW91c1ZhbHVlXCIgLz4nO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXBpbGUgdGhlIGdpdmVuIEhUTUwgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIGVsZW1lbnQuXG4gICAgICovXG4gICAgdmFyIGNvbXBpbGUgPSBmdW5jdGlvbihpbnB1dFRwbCkge1xuICAgICAgICB2YXIgZWwgPSBhbmd1bGFyLmVsZW1lbnQoaW5wdXRUcGwpO1xuICAgICAgICAkY29tcGlsZShlbCkoc2NvcGUpO1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgY29udHJvbGxlciA9IGVsLmNvbnRyb2xsZXIoJ3NwTXVsdGlUZXh0Jyk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBtb2RlbCBpcyBwYXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGJ1aWxkTXVsdGlUZXh0VGVtcGxhdGUoKSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIHRleHQgdG8gdGhlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnaGlnZ3MnO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyB0cmlnZ2VyIGFkZGluZ1xuICAgICAgICBjb250cm9sbGVyLmFkZEl0ZW0oKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsWzBdKS50b0VxdWFsKCdoaWdncycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYWRkIHdoaXRlc3BhY2UgdG8gdGhlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnICBcXHQgXFxuJztcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgLy8gdHJpZ2dlciBhZGRpbmdcbiAgICAgICAgY29udHJvbGxlci5hZGRJdGVtKCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRyaW0gYmVmb3JlIGFkZGluZyB0ZXh0IHRvIHRoZSBtb2RlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlKGJ1aWxkTXVsdGlUZXh0VGVtcGxhdGUobW9kZWxOYW1lLCBmb3JtSXRlbSkpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyBhZGQgdGV4dFxuICAgICAgICBjb250cm9sbGVyLnZhbHVlID0gJ1xcdCAgIGhpZ2dzICAgXFxuJztcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgLy8gdHJpZ2dlciBhZGRpbmdcbiAgICAgICAgY29udHJvbGxlci5hZGRJdGVtKCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbFswXSkudG9FcXVhbCgnaGlnZ3MnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIHRleHQgdG8gdGhlIG1vZGVsIHdpdGggYW4gZW50ZXIga2V5cHJlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0ge307XG4gICAgICAgIGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnaGlnZ3MnO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyB0ZXN0IG5vbi1lbnRlciBrZXlcbiAgICAgICAgZXZlbnQua2V5Q29kZSA9IDExMztcbiAgICAgICAgY29udHJvbGxlci5oYW5kbGVLZXlQcmVzcyhldmVudCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIHRyaWdnZXIgYWRkaW5nXG4gICAgICAgIGV2ZW50LmtleUNvZGUgPSAxMztcbiAgICAgICAgY29udHJvbGxlci5oYW5kbGVLZXlQcmVzcyhldmVudCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbFswXSkudG9FcXVhbCgnaGlnZ3MnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIHR3byB2YWx1ZXMgdG8gdGhlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnaGlnZ3MnO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyB0cmlnZ2VyIGFkZGluZ1xuICAgICAgICBjb250cm9sbGVyLmFkZEl0ZW0oKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgLy8gYWRkIHRleHQgYWdhaW5cbiAgICAgICAgY29udHJvbGxlci52YWx1ZSA9ICdib3Nvbic7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIC8vIHRyaWdnZXIgYWRkaW5nIGFnYWluXG4gICAgICAgIGNvbnRyb2xsZXIuYWRkSXRlbSgpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWxbMF0pLnRvRXF1YWwoJ2hpZ2dzJyk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbFsxXSkudG9FcXVhbCgnYm9zb24nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGFkZCBkdXBsaWNhdGUgdmFsdWVzIHRvIHRoZSBtb2RlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb21waWxlKGJ1aWxkTXVsdGlUZXh0VGVtcGxhdGUobW9kZWxOYW1lLCBmb3JtSXRlbSkpO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyBhZGQgdGV4dFxuICAgICAgICBjb250cm9sbGVyLnZhbHVlID0gJ2hpZ2dzJztcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgLy8gdHJpZ2dlciBhZGRpbmdcbiAgICAgICAgY29udHJvbGxlci5hZGRJdGVtKCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIC8vIGFkZCB0ZXh0IGFnYWluXG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnaGlnZ3MnO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAvLyB0cmlnZ2VyIGFkZGluZyBhZ2FpblxuICAgICAgICBjb250cm9sbGVyLmFkZEl0ZW0oKTtcbiAgICAgICAgLy8gbGVuZ3RoIHNob3VsZCBiZSB0aGUgc2FtZSBzaW5jZSB0aGUgZHVwbGljYXRlIHdhc24ndCBhZGRlZFxuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgYWRkIGRpZmZlcmVudCBjYXNlIGR1cGxpY2F0ZSB2YWx1ZXMgdG8gdGhlIG1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIC8vIGFkZCB0ZXh0XG4gICAgICAgIGNvbnRyb2xsZXIudmFsdWUgPSAnaGlnZ3MnO1xuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAvLyB0cmlnZ2VyIGFkZGluZ1xuICAgICAgICBjb250cm9sbGVyLmFkZEl0ZW0oKTtcbiAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgLy8gYWRkIHRleHQgYWdhaW5cbiAgICAgICAgY29udHJvbGxlci52YWx1ZSA9ICdoaUdncyc7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIC8vIHRyaWdnZXIgYWRkaW5nIGFnYWluXG4gICAgICAgIGNvbnRyb2xsZXIuYWRkSXRlbSgpO1xuICAgICAgICAvLyBsZW5ndGggc2hvdWxkIGJlIHRoZSBzYW1lIHNpbmNlIHRoZSBkdXBsaWNhdGUgd2Fzbid0IGFkZGVkXG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRpc3BsYXkgYSBoZWxwIHRleHQgYmxvY2sgaWYgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwsIGhlbHBCbG9jaztcblxuICAgICAgICBmb3JtSXRlbS5oZWxwVGV4dCA9ICdTb21lIGhlbHAgdGV4dCc7XG4gICAgICAgIGVsID0gY29tcGlsZShidWlsZE11bHRpVGV4dFRlbXBsYXRlKG1vZGVsTmFtZSwgZm9ybUl0ZW0pKTtcbiAgICAgICAgaGVscEJsb2NrID0gZWwuZmluZCgnIycgKyBmb3JtSXRlbS5pdGVtSWQgKyAnLWhlbHAnKTtcblxuICAgICAgICBleHBlY3QoaGVscEJsb2NrLnRleHQoKS50cmltKCkpLnRvRXF1YWwoZm9ybUl0ZW0uaGVscFRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkaXNwbGF5IGEgcHJldmlvdXMgdmFsdWUgaWYgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwsIHByZXZpb3VzQmxvY2s7XG5cbiAgICAgICAgZm9ybUl0ZW0ucHJldmlvdXNWYWx1ZSA9ICdwcmV2aW91cyc7XG4gICAgICAgIHNjb3BlLnNob3dQcmV2aW91c1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGlUZXh0VGVtcGxhdGUobW9kZWxOYW1lLCBmb3JtSXRlbSkpO1xuICAgICAgICBwcmV2aW91c0Jsb2NrID0gZWwuZmluZCgnIycgKyBmb3JtSXRlbS5pdGVtSWQgKyAnLXByZXZpb3VzJyk7XG4gICAgICAgIGV4cGVjdChwcmV2aW91c0Jsb2NrLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHByZXZpb3VzQmxvY2sudGV4dCgpLnRyaW0oKSkudG9FcXVhbChcbiAgICAgICAgICAgIG1lc3NhZ2VzWyd1aV9mb3JtX3ByZXZpb3VzX3ZhbHVlJ10gKyAnOiAnICsgZm9ybUl0ZW0ucHJldmlvdXNWYWx1ZVxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgZGlzcGxheSBhIHByZXZpb3VzIHZhbHVlIGlmIG5vdCBjb25maWd1cmVkIG9uIHRoZSBmb3JtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCwgcHJldmlvdXNCbG9jaztcblxuICAgICAgICBmb3JtSXRlbS5wcmV2aW91c1ZhbHVlID0gJ3ByZXZpb3VzJztcbiAgICAgICAgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGlUZXh0VGVtcGxhdGUobW9kZWxOYW1lLCBmb3JtSXRlbSkpO1xuICAgICAgICBwcmV2aW91c0Jsb2NrID0gZWwuZmluZCgnIycgKyBmb3JtSXRlbS5pdGVtSWQgKyAnLXByZXZpb3VzJyk7XG4gICAgICAgIGV4cGVjdChwcmV2aW91c0Jsb2NrLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWRkIHJlcXVpcmVkIGF0dHJpYnV0ZSBpZiByZXF1aXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgZm9ybUl0ZW0ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBlbCA9IGNvbXBpbGUoYnVpbGRNdWx0aVRleHRUZW1wbGF0ZShtb2RlbE5hbWUsIGZvcm1JdGVtKSk7XG5cbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2lucHV0W3JlcXVpcmVkPXJlcXVpcmVkXScpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGFkZCByZXF1aXJlZCBhdHRyaWJ1dGUgaWYgcmVxdWlyZWQgYnV0IGhhcyBhdCBsZWFzdCBvbmUgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgZm9ybUl0ZW0ucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBzY29wZS5tb2RlbCA9IFsnZm9vJ107XG4gICAgICAgIGVsID0gY29tcGlsZShidWlsZE11bHRpVGV4dFRlbXBsYXRlKG1vZGVsTmFtZSwgZm9ybUl0ZW0pKTtcblxuICAgICAgICBleHBlY3QoZWwuZmluZCgnaW5wdXRbcmVxdWlyZWQ9cmVxdWlyZWRdJykubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ3NwLW11bHRpLXRleHQnKS5yZW1vdmUoKTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
