System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {

    /**
     * Unit tests for the typeaheadInputDirective directive.
     */
    /* jshint maxparams:7 */
    'use strict';

    var formModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('spTypaheadInputDirective', function () {

                var suggestId = 'suggestId',
                    modelName = 'model',
                    suggestItems = 'item.displayName for item in items | filter:{displayName:$viewValue}',
                    templateUrl = 'some/template.html',
                    $compile,
                    suggestTestService,
                    scope,
                    $timeout;

                beforeEach(module(testModule, formModule));

                /**
                 * Setup the tests.
                 */
                beforeEach(inject(function ($rootScope, _$compile_, _suggestTestService_, _$timeout_) {
                    // Save our dependencies for later use.
                    $compile = _$compile_;
                    suggestTestService = _suggestTestService_;
                    $timeout = _$timeout_;
                    scope = $rootScope;
                    scope.model = [];

                    scope.items = [{
                        displayName: 'thing one'
                    }, {
                        displayName: 'thing two'
                    }];
                    scope.suggestService = {
                        search: function () {
                            return suggestItems;
                        }
                    };
                }));

                var buildTypeaheadTemplate = function (id, model, items, editable, required, templateUrl, onSelectFunc) {
                    var template = '<form name="tidTestForm"><sp-typeahead-input ';
                    if (angular.isDefined(id)) {
                        template += 'sp-typeahead-input-id="' + id + '" ';
                    }
                    if (angular.isDefined(model)) {
                        template += 'ng-model="' + model + '" ';
                    }
                    if (angular.isDefined(items)) {
                        template += 'sp-typeahead-input-items="' + items + '" ';
                    }
                    if (angular.isDefined(editable)) {
                        template += 'sp-typeahead-input-editable="' + editable + '" ';
                    }
                    if (angular.isDefined(required)) {
                        template += 'sp-typeahead-input-required="' + required + '" ';
                    }
                    if (angular.isDefined(templateUrl)) {
                        template += 'sp-typeahead-input-template-url="' + templateUrl + '" ';
                    }
                    if (angular.isDefined(onSelectFunc)) {
                        template += 'sp-typeahead-input-on-select-func="' + onSelectFunc + '" ';
                    }

                    template += '/><form>';
                    return template;
                };

                /**
                 * Compile the given HTML and return the resulting element.
                 */
                var compile = function (inputTpl) {
                    var el = $compile(angular.element(inputTpl))(scope);
                    scope.$apply();
                    return el;
                };

                describe('ng-model', function () {
                    it('should throw when not defined', function () {
                        expect(function () {
                            compile(buildTypeaheadTemplate(suggestId, undefined, suggestItems));
                        }).toThrow();
                    });

                    it('should not throw when defined', function () {
                        expect(function () {
                            compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems));
                        }).not.toThrow();
                    });
                });

                describe('sp-typeahead-input-items', function () {
                    it('should throw when not defined', function () {
                        expect(function () {
                            compile(buildTypeaheadTemplate(suggestId, modelName, undefined));
                        }).toThrow();
                    });

                    it('should not throw when defined', function () {
                        expect(function () {
                            compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems));
                        }).not.toThrow();
                    });

                    describe('comprehension expression', function () {
                        it('should work with an array', function () {
                            var el = compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems));
                            suggestTestService.searchByTyping(el, 'one', scope);
                            expect(suggestTestService.getSuggestItems(el, scope).length).toBe(1);
                        });

                        it('should work with a function', function () {
                            var funcItems = 'item.displayName for item in doSearchThing($viewValue)';
                            scope.doSearchThing = function () {};
                            spyOn(scope, 'doSearchThing').and.callFake(function () {
                                return scope.items;
                            });
                            var el = compile(buildTypeaheadTemplate(suggestId, modelName, funcItems));
                            suggestTestService.searchByTyping(el, 'Thing', scope);
                            expect(suggestTestService.getSuggestItems(el, scope).length).toBe(2);
                            expect(scope.doSearchThing).toHaveBeenCalledWith('Thing');
                        });
                    });
                });

                describe('sp-typeahead-input-id', function () {
                    it('should be set to default value when not set', function () {
                        var el = compile(buildTypeaheadTemplate(undefined, modelName, suggestItems));
                        expect(el.find('input').first().attr('id')).toEqual('typeaheadInput');
                    });

                    it('should use passed value when set', function () {
                        var el = compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems));
                        expect(el.find('input').first().attr('id')).toEqual(suggestId);
                    });
                });

                describe('sp-typeahead-input-editable', function () {
                    it('should be false when not set', function () {
                        compile(buildTypeaheadTemplate(undefined, modelName, suggestItems));
                        expect(scope.spTypeaheadInputEditable).toBeFalsy();
                    });

                    it('should be falsy when false', function () {
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, false));
                        expect(scope.spTypeaheadInputEditable).toBeFalsy();
                    });

                    it('should be falsy when falsy', function () {
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, 0));
                        expect(scope.spTypeaheadInputEditable).toBeFalsy();
                    });

                    it('should be truthy when true', function () {
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, true));
                        expect(scope.spTypeaheadInputEditable).toBeTruthy();
                    });

                    it('should be truthy when truthy', function () {
                        scope.aTruthyProperty = 'notFalse';
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, 'aTruthyProperty'));
                        expect(scope.spTypeaheadInputEditable).toBeTruthy();
                    });
                });

                describe('sp-typeahead-input-required', function () {
                    var requiredProp = 'requiredProp',
                        requiredFunc = 'requiredFunc',
                        formId = 'tidTestForm';

                    it('should not invalidate form when not set', function () {
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, 0));
                        expect(scope[formId].$valid).toBeTruthy();
                    });

                    it('should invalidate form when false property', function () {
                        scope[requiredProp] = false;
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, requiredProp));
                        expect(scope[formId].$valid).toBeTruthy();
                    });

                    it('should not invalidate form when true property', function () {
                        scope[requiredProp] = true;
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, requiredProp));
                        expect(scope[formId].$valid).toBeFalsy();
                    });

                    it('should not invalidate form when false function', function () {
                        scope[requiredFunc] = function () {
                            return false;
                        };
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, requiredFunc + '()'));
                        expect(scope[formId].$valid).toBeTruthy();
                    });

                    it('should invalidate form  when true function', function () {
                        scope[requiredFunc] = function () {
                            return true;
                        };
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, requiredFunc + '()'));
                        expect(scope[formId].$valid).toBeFalsy();
                    });

                    it('should update validity as function returns new values', function () {
                        var required = true;
                        scope[requiredFunc] = function () {
                            return required;
                        };
                        compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, requiredFunc + '()'));
                        expect(scope[formId].$valid).toBeFalsy();
                        required = false;
                        scope.$digest();
                        expect(scope[formId].$valid).toBeTruthy();
                    });
                });

                describe('sp-typeahead-tempalate-url', function () {
                    it('should use the default value when not set', function () {
                        var el = compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, undefined));
                        expect(el.find('input').first().attr('typeahead-template-url')).toEqual('template/typeahead-input-item.html');
                    });

                    it('should be the specified url when set', function () {
                        var el = compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, false, templateUrl));
                        expect(el.find('input').first().attr('typeahead-template-url')).toEqual(templateUrl);
                    });
                });

                it('should restore previous value if no selection while dropdown open', function () {
                    var el,
                        escEvent = $.Event('keydown', {
                        which: 27
                    });
                    scope.itemSelected = jasmine.createSpy();
                    el = compile(buildTypeaheadTemplate(suggestId, modelName, suggestItems, undefined, undefined, undefined, 'itemSelected'));
                    suggestTestService.selectSuggestItem(el, 1, scope);
                    expect(scope.model).toEqual(scope.items[1].displayName);
                    suggestTestService.clickDropdownArrow(el, scope);
                    // Model will be nulled out from opening dropdown
                    expect(scope.model).toEqual(null);
                    // Escape key will close the menu
                    el.find('input').trigger(escEvent);
                    $timeout.flush();
                    // previous value should have been restored
                    expect(scope.model).toEqual(scope.items[1].displayName);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL1R5cGVhaGVhZElucHV0RGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7SUFNNUc7O0lBRUEsSUFBSSxZQUFZO0lBQ2hCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBUDdCLFNBQVMsNEJBQTRCLFlBQVc7O2dCQUU1QyxJQUFJLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixlQUFlO29CQUNmLGNBQWM7b0JBQ2Q7b0JBQVU7b0JBQW9CO29CQUFPOztnQkFHekMsV0FBVyxPQUFPLFlBQVk7Ozs7O2dCQUs5QixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksc0JBQXNCLFlBQVk7O29CQUVqRixXQUFXO29CQUNYLHFCQUFxQjtvQkFDckIsV0FBVztvQkFDWCxRQUFRO29CQUNSLE1BQU0sUUFBUTs7b0JBRWQsTUFBTSxRQUFRLENBQUM7d0JBQ1gsYUFBYTt1QkFDZDt3QkFDQyxhQUFhOztvQkFFakIsTUFBTSxpQkFBaUI7d0JBQ25CLFFBQVEsWUFBVzs0QkFDZixPQUFPOzs7OztnQkFLbkIsSUFBSSx5QkFBeUIsVUFBUyxJQUFJLE9BQU8sT0FBTyxVQUFVLFVBQVUsYUFBYSxjQUFjO29CQUNuRyxJQUFJLFdBQVc7b0JBQ2YsSUFBRyxRQUFRLFVBQVUsS0FBSzt3QkFDdEIsWUFBWSw0QkFBNEIsS0FBSzs7b0JBRWpELElBQUcsUUFBUSxVQUFVLFFBQVE7d0JBQ3pCLFlBQVksZUFBZSxRQUFROztvQkFFdkMsSUFBRyxRQUFRLFVBQVUsUUFBUTt3QkFDekIsWUFBWSwrQkFBK0IsUUFBUTs7b0JBRXZELElBQUcsUUFBUSxVQUFVLFdBQVc7d0JBQzVCLFlB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QUFRLHVCQUF1QixXQUFXLFdBQVcsY0FBYyxXQUFXO3dCQUN2RixPQUFPLEdBQUcsS0FBSyxTQUFTLFFBQVEsS0FBSywyQkFDakMsUUFBUTs7O29CQUdoQixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLEtBQUssUUFBUSx1QkFBdUIsV0FBVyxXQUFXLGNBQWMsV0FBVyxPQUFPO3dCQUM5RixPQUFPLEdBQUcsS0FBSyxTQUFTLFFBQVEsS0FBSywyQkFBMkIsUUFBUTs7OztnQkFLaEYsR0FBRyxxRUFBcUUsWUFBVztvQkFDL0UsSUFBSTt3QkFDQSxXQUFXLEVBQUUsTUFBTSxXQUFXO3dCQUMxQixPQUFPOztvQkFFZixNQUFNLGVBQWUsUUFBUTtvQkFDN0IsS0FBSyxRQUFRLHVCQUF1QixXQUFXLFdBQVcsY0FBYyxXQUNoRSxXQUFXLFdBQVc7b0JBQzlCLG1CQUFtQixrQkFBa0IsSUFBSSxHQUFHO29CQUM1QyxPQUFPLE1BQU0sT0FBTyxRQUFRLE1BQU0sTUFBTSxHQUFHO29CQUMzQyxtQkFBbUIsbUJBQW1CLElBQUk7O29CQUUxQyxPQUFPLE1BQU0sT0FBTyxRQUFROztvQkFFNUIsR0FBRyxLQUFLLFNBQVMsUUFBUTtvQkFDekIsU0FBUzs7b0JBRVQsT0FBTyxNQUFNLE9BQU8sUUFBUSxNQUFNLE1BQU0sR0FBRzs7Ozs7R0F3QmhEIiwiZmlsZSI6ImNvbW1vbi9mb3JtL1R5cGVhaGVhZElucHV0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4gKiBVbml0IHRlc3RzIGZvciB0aGUgdHlwZWFoZWFkSW5wdXREaXJlY3RpdmUgZGlyZWN0aXZlLlxuICovXG4vKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbmRlc2NyaWJlKCdzcFR5cGFoZWFkSW5wdXREaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdWdnZXN0SWQgPSAnc3VnZ2VzdElkJyxcbiAgICAgICAgbW9kZWxOYW1lID0gJ21vZGVsJyxcbiAgICAgICAgc3VnZ2VzdEl0ZW1zID0gJ2l0ZW0uZGlzcGxheU5hbWUgZm9yIGl0ZW0gaW4gaXRlbXMgfCBmaWx0ZXI6e2Rpc3BsYXlOYW1lOiR2aWV3VmFsdWV9JyxcbiAgICAgICAgdGVtcGxhdGVVcmwgPSAnc29tZS90ZW1wbGF0ZS5odG1sJyxcbiAgICAgICAgJGNvbXBpbGUsIHN1Z2dlc3RUZXN0U2VydmljZSwgc2NvcGUsICR0aW1lb3V0O1xuXG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBmb3JtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgdGVzdHMuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgX3N1Z2dlc3RUZXN0U2VydmljZV8sIF8kdGltZW91dF8pIHtcbiAgICAgICAgLy8gU2F2ZSBvdXIgZGVwZW5kZW5jaWVzIGZvciBsYXRlciB1c2UuXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlID0gX3N1Z2dlc3RUZXN0U2VydmljZV87XG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICBzY29wZS5tb2RlbCA9IFtdO1xuXG4gICAgICAgIHNjb3BlLml0ZW1zID0gW3tcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAndGhpbmcgb25lJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3RoaW5nIHR3bydcbiAgICAgICAgfV07XG4gICAgICAgIHNjb3BlLnN1Z2dlc3RTZXJ2aWNlID0ge1xuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VnZ2VzdEl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIHZhciBidWlsZFR5cGVhaGVhZFRlbXBsYXRlID0gZnVuY3Rpb24oaWQsIG1vZGVsLCBpdGVtcywgZWRpdGFibGUsIHJlcXVpcmVkLCB0ZW1wbGF0ZVVybCwgb25TZWxlY3RGdW5jKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICc8Zm9ybSBuYW1lPVwidGlkVGVzdEZvcm1cIj48c3AtdHlwZWFoZWFkLWlucHV0ICc7XG4gICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKGlkKSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgKz0gJ3NwLXR5cGVhaGVhZC1pbnB1dC1pZD1cIicgKyBpZCArICdcIiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKG1vZGVsKSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgKz0gJ25nLW1vZGVsPVwiJyArIG1vZGVsICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQoaXRlbXMpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtdHlwZWFoZWFkLWlucHV0LWl0ZW1zPVwiJyArIGl0ZW1zICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQoZWRpdGFibGUpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtdHlwZWFoZWFkLWlucHV0LWVkaXRhYmxlPVwiJyArIGVkaXRhYmxlICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQocmVxdWlyZWQpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtdHlwZWFoZWFkLWlucHV0LXJlcXVpcmVkPVwiJyArIHJlcXVpcmVkICsgJ1wiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYW5ndWxhci5pc0RlZmluZWQodGVtcGxhdGVVcmwpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnc3AtdHlwZWFoZWFkLWlucHV0LXRlbXBsYXRlLXVybD1cIicgKyB0ZW1wbGF0ZVVybCArICdcIiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKG9uU2VsZWN0RnVuYykpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICdzcC10eXBlYWhlYWQtaW5wdXQtb24tc2VsZWN0LWZ1bmM9XCInICsgb25TZWxlY3RGdW5jICsgJ1wiICc7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wbGF0ZSArPSAnLz48Zm9ybT4nO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXBpbGUgdGhlIGdpdmVuIEhUTUwgYW5kIHJldHVybiB0aGUgcmVzdWx0aW5nIGVsZW1lbnQuXG4gICAgICovXG4gICAgdmFyIGNvbXBpbGUgPSBmdW5jdGlvbihpbnB1dFRwbCkge1xuICAgICAgICB2YXIgZWwgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoaW5wdXRUcGwpKShzY29wZSk7XG4gICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgfTtcblxuICAgIGRlc2NyaWJlKCduZy1tb2RlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdoZW4gbm90IGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCB1bmRlZmluZWQsIHN1Z2dlc3RJdGVtcykpO30pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgd2hlbiBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7Y29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMpKTt9KS5ub3QudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcC10eXBlYWhlYWQtaW5wdXQtaXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIG5vdCBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7Y29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCB1bmRlZmluZWQpKTt9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHRocm93IHdoZW4gZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge2NvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgc3VnZ2VzdEl0ZW1zKSk7fSkubm90LnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2NvbXByZWhlbnNpb24gZXhwcmVzc2lvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggYW4gYXJyYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcykpO1xuICAgICAgICAgICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWFyY2hCeVR5cGluZyhlbCwgJ29uZScsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3VnZ2VzdFRlc3RTZXJ2aWNlLmdldFN1Z2dlc3RJdGVtcyhlbCwgc2NvcGUpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBhIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bmNJdGVtcyA9ICdpdGVtLmRpc3BsYXlOYW1lIGZvciBpdGVtIGluIGRvU2VhcmNoVGhpbmcoJHZpZXdWYWx1ZSknO1xuICAgICAgICAgICAgICAgIHNjb3BlLmRvU2VhcmNoVGhpbmcgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgICAgICAgICAgIHNweU9uKHNjb3BlLCAnZG9TZWFyY2hUaGluZycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLml0ZW1zO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgZnVuY0l0ZW1zKSk7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlYXJjaEJ5VHlwaW5nKGVsLCAnVGhpbmcnLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHN1Z2dlc3RUZXN0U2VydmljZS5nZXRTdWdnZXN0SXRlbXMoZWwsIHNjb3BlKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRvU2VhcmNoVGhpbmcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdUaGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3AtdHlwZWFoZWFkLWlucHV0LWlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgc2V0IHRvIGRlZmF1bHQgdmFsdWUgd2hlbiBub3Qgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUodW5kZWZpbmVkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcykpO1xuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2lucHV0JykuZmlyc3QoKS5hdHRyKCdpZCcpKS50b0VxdWFsKCd0eXBlYWhlYWRJbnB1dCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVzZSBwYXNzZWQgdmFsdWUgd2hlbiBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgc3VnZ2VzdEl0ZW1zKSk7XG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnaW5wdXQnKS5maXJzdCgpLmF0dHIoJ2lkJykpLnRvRXF1YWwoc3VnZ2VzdElkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3AtdHlwZWFoZWFkLWlucHV0LWVkaXRhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgYmUgZmFsc2Ugd2hlbiBub3Qgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUodW5kZWZpbmVkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcykpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNwVHlwZWFoZWFkSW5wdXRFZGl0YWJsZSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZmFsc3kgd2hlbiBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIGZhbHNlKSk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuc3BUeXBlYWhlYWRJbnB1dEVkaXRhYmxlKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSBmYWxzeSB3aGVuIGZhbHN5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcywgMCkpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNwVHlwZWFoZWFkSW5wdXRFZGl0YWJsZSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1dGh5IHdoZW4gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIHRydWUpKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5zcFR5cGVhaGVhZElucHV0RWRpdGFibGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnV0aHkgd2hlbiB0cnV0aHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlLmFUcnV0aHlQcm9wZXJ0eSA9ICdub3RGYWxzZSc7XG4gICAgICAgICAgICBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcywgJ2FUcnV0aHlQcm9wZXJ0eScpKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5zcFR5cGVhaGVhZElucHV0RWRpdGFibGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3AtdHlwZWFoZWFkLWlucHV0LXJlcXVpcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXF1aXJlZFByb3AgPSAncmVxdWlyZWRQcm9wJyxcbiAgICAgICAgICAgIHJlcXVpcmVkRnVuYyA9ICdyZXF1aXJlZEZ1bmMnLFxuICAgICAgICAgICAgZm9ybUlkID0gJ3RpZFRlc3RGb3JtJztcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBpbnZhbGlkYXRlIGZvcm0gd2hlbiBub3Qgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcywgMCkpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlW2Zvcm1JZF0uJHZhbGlkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaW52YWxpZGF0ZSBmb3JtIHdoZW4gZmFsc2UgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlW3JlcXVpcmVkUHJvcF0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgc3VnZ2VzdEl0ZW1zLCB1bmRlZmluZWQsIHJlcXVpcmVkUHJvcCkpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlW2Zvcm1JZF0uJHZhbGlkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGludmFsaWRhdGUgZm9ybSB3aGVuIHRydWUgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlW3JlcXVpcmVkUHJvcF0gPSB0cnVlO1xuICAgICAgICAgICAgY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIHVuZGVmaW5lZCwgcmVxdWlyZWRQcm9wKSk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGVbZm9ybUlkXS4kdmFsaWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBpbnZhbGlkYXRlIGZvcm0gd2hlbiBmYWxzZSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGVbcmVxdWlyZWRGdW5jXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgICAgICBjb21waWxlKGJ1aWxkVHlwZWFoZWFkVGVtcGxhdGUoc3VnZ2VzdElkLCBtb2RlbE5hbWUsIHN1Z2dlc3RJdGVtcywgdW5kZWZpbmVkLCBgJHtyZXF1aXJlZEZ1bmN9KClgKSk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGVbZm9ybUlkXS4kdmFsaWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbnZhbGlkYXRlIGZvcm0gIHdoZW4gdHJ1ZSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGVbcmVxdWlyZWRGdW5jXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICAgICAgICAgIGNvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgc3VnZ2VzdEl0ZW1zLCB1bmRlZmluZWQsIGAke3JlcXVpcmVkRnVuY30oKWApKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZVtmb3JtSWRdLiR2YWxpZCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIHZhbGlkaXR5IGFzIGZ1bmN0aW9uIHJldHVybnMgbmV3IHZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlW3JlcXVpcmVkRnVuY10gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHJlcXVpcmVkOyB9O1xuICAgICAgICAgICAgY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIHVuZGVmaW5lZCwgYCR7cmVxdWlyZWRGdW5jfSgpYCkpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlW2Zvcm1JZF0uJHZhbGlkKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIHJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGVbZm9ybUlkXS4kdmFsaWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcC10eXBlYWhlYWQtdGVtcGFsYXRlLXVybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIG5vdCBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRUeXBlYWhlYWRUZW1wbGF0ZShzdWdnZXN0SWQsIG1vZGVsTmFtZSwgc3VnZ2VzdEl0ZW1zLCB1bmRlZmluZWQsIHVuZGVmaW5lZCkpO1xuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2lucHV0JykuZmlyc3QoKS5hdHRyKCd0eXBlYWhlYWQtdGVtcGxhdGUtdXJsJykpLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwoJ3RlbXBsYXRlL3R5cGVhaGVhZC1pbnB1dC1pdGVtLmh0bWwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0aGUgc3BlY2lmaWVkIHVybCB3aGVuIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsID0gY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIHVuZGVmaW5lZCwgZmFsc2UsIHRlbXBsYXRlVXJsKSk7XG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnaW5wdXQnKS5maXJzdCgpLmF0dHIoJ3R5cGVhaGVhZC10ZW1wbGF0ZS11cmwnKSkudG9FcXVhbCh0ZW1wbGF0ZVVybCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgaWYgbm8gc2VsZWN0aW9uIHdoaWxlIGRyb3Bkb3duIG9wZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsLFxuICAgICAgICAgICAgZXNjRXZlbnQgPSAkLkV2ZW50KCdrZXlkb3duJywge1xuICAgICAgICAgICAgICAgIHdoaWNoOiAyN1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHNjb3BlLml0ZW1TZWxlY3RlZCA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgIGVsID0gY29tcGlsZShidWlsZFR5cGVhaGVhZFRlbXBsYXRlKHN1Z2dlc3RJZCwgbW9kZWxOYW1lLCBzdWdnZXN0SXRlbXMsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2l0ZW1TZWxlY3RlZCcpKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKGVsLCAxLCBzY29wZSk7XG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbCkudG9FcXVhbChzY29wZS5pdGVtc1sxXS5kaXNwbGF5TmFtZSk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5jbGlja0Ryb3Bkb3duQXJyb3coZWwsIHNjb3BlKTtcbiAgICAgICAgLy8gTW9kZWwgd2lsbCBiZSBudWxsZWQgb3V0IGZyb20gb3BlbmluZyBkcm9wZG93blxuICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwpLnRvRXF1YWwobnVsbCk7XG4gICAgICAgIC8vIEVzY2FwZSBrZXkgd2lsbCBjbG9zZSB0aGUgbWVudVxuICAgICAgICBlbC5maW5kKCdpbnB1dCcpLnRyaWdnZXIoZXNjRXZlbnQpO1xuICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAvLyBwcmV2aW91cyB2YWx1ZSBzaG91bGQgaGF2ZSBiZWVuIHJlc3RvcmVkXG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbCkudG9FcXVhbChzY29wZS5pdGVtc1sxXS5kaXNwbGF5TmFtZSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
