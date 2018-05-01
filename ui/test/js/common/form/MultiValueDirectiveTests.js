System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
    * Unit tests for the multivalue directive.
    */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('spMultiValue', function () {

                var modelName = 'model',
                    altLabelFuncName = 'altLabelFunc',
                    $compile,
                    scope;

                beforeEach(module(formModule));

                /**
                 * Setup the tests.
                 */
                beforeEach(inject(function ($rootScope, _$compile_) {
                    // Save our dependencies for later use.
                    $compile = _$compile_;
                    scope = $rootScope;
                    scope.model = [];
                    scope.altLabelFunc = function (item) {
                        return item.name;
                    };
                }));

                var buildMultivalueTemplate = function (model, labelFunc, isLarge, isDisabled, isRequired) {
                    var template = '<sp-multi-value ';
                    if (angular.isDefined(model)) {
                        template += 'ng-model="' + model + '" ';
                    }
                    if (angular.isDefined(labelFunc)) {
                        template += 'sp-multi-value-label-function="' + labelFunc + '" ';
                    }
                    if (angular.isDefined(isLarge)) {
                        template += 'sp-multi-value-large="true" ';
                    }
                    if (angular.isDefined(isLarge)) {
                        template += 'ng-disabled="ngDisabled" ';
                    }
                    if (angular.isDefined(isRequired)) {
                        template += 'ng-required="ngRequired" ';
                    }
                    template += '>test transclude</sp-multi-value>';
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

                it('should throw if no model is passed', function () {
                    expect(function () {
                        compile(buildMultivalueTemplate());
                    }).toThrow();
                });

                it('should transclude', function () {
                    var el = compile(buildMultivalueTemplate(modelName));
                    //find div twice since it is two levels down
                    expect(angular.element(el).find('div').find('div').text().trim()).toEqual('test transclude');
                });

                it('$isEmpty should return true for empty list', function () {
                    var el = compile(buildMultivalueTemplate(modelName));
                    expect(angular.element(el).data().$ngModelController.$isEmpty([])).toBeTruthy();
                });

                describe('with a selected item', function () {
                    var testItem = {
                        name: 'alternate',
                        displayName: 'main'
                    };
                    beforeEach(function () {
                        scope.model = [testItem];
                    });

                    it('should display item', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(angular.element(el).find('input').attr('value')).toEqual(testItem.displayName);
                    });

                    it('should display item differently with label function', function () {
                        var el = compile(buildMultivalueTemplate(modelName, altLabelFuncName));
                        expect(angular.element(el).find('input').attr('value')).toEqual(testItem.name);
                    });

                    it('should remove item when remove is clicked', function () {
                        var el = compile(buildMultivalueTemplate(modelName, altLabelFuncName));
                        expect(scope.model.length).toEqual(1);
                        angular.element(el).find('button').click();
                        expect(scope.model.length).toEqual(0);
                    });

                    it('should call validate when item is removed', function () {
                        var el = compile(buildMultivalueTemplate(modelName, altLabelFuncName, undefined, undefined, true));
                        scope.ngRequired = true;
                        spyOn(angular.element(el).data().$ngModelController, '$validate').and.callThrough();
                        expect(scope.model.length).toEqual(1);
                        expect(angular.element(el).data().$ngModelController.$valid).toBeTruthy();
                        angular.element(el).find('button').click();
                        expect(angular.element(el).data().$ngModelController.$validate).toHaveBeenCalled();
                        expect(angular.element(el).data().$ngModelController.$valid).toBeFalsy();
                    });

                    it('should not allow removal if disabled', function () {
                        var el = compile(buildMultivalueTemplate(modelName, altLabelFuncName, undefined, true));
                        scope.ngDisabled = true;
                        expect(scope.model.length).toEqual(1);
                        angular.element(el).find('button').click();
                        expect(scope.model.length).toEqual(0);
                    });

                    it('should not have a link', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(el.find('a').length).toEqual(0);
                    });
                });

                describe('with more than 5 selected items', function () {
                    var testItems = [{
                        name: '1'
                    }, {
                        name: '2'
                    }, {
                        name: '3'
                    }, {
                        name: '4'
                    }, {
                        name: '5'
                    }, {
                        name: '6'
                    }];
                    beforeEach(function () {
                        scope.model = testItems;
                    });

                    it('should have show more link', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(el.find('a').text().trim()).toEqual('ui_form_multi_show_x_more');
                    });

                    it('should display 5 items', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(el.find('div').hasClass('show-first-five')).toBeTruthy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                    });

                    it('should display all after show more button is clicked', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(el.find('div').hasClass('show-first-five')).toBeTruthy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                        el.find('a').click();
                        expect(el.find('div').hasClass('show-first-five')).toBeFalsy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                        //make sure link switched
                        expect(el.find('a').text().trim()).toEqual('ui_form_multi_hide_more');
                    });

                    it('should display 5 again after hiding', function () {
                        var el = compile(buildMultivalueTemplate(modelName));
                        expect(el.find('div').hasClass('show-first-five')).toBeTruthy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                        el.find('a').click();
                        expect(el.find('div').hasClass('show-first-five')).toBeFalsy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                        //make sure link switched
                        expect(el.find('a').text().trim()).toEqual('ui_form_multi_hide_more');
                        el.find('a').click();
                        expect(el.find('div').hasClass('show-first-five')).toBeTruthy();
                        expect(el[0].querySelectorAll('.input-group').length).toEqual(6);
                        //make sure link switched back
                        expect(el.find('a').text().trim()).toEqual('ui_form_multi_show_x_more');
                    });
                });

                afterEach(function () {
                    angular.element('sp-multi-value').remove();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL011bHRpVmFsdWVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFLdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQjtvQkFBVTs7Z0JBR2QsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZOztvQkFFL0MsV0FBVztvQkFDWCxRQUFRO29CQUNSLE1BQU0sUUFBUTtvQkFDZCxNQUFNLGVBQWUsVUFBUyxNQUFNO3dCQUFFLE9BQU8sS0FBSzs7OztnQkFHdEQsSUFBSSwwQkFBMEIsVUFBUyxPQUFPLFdBQVcsU0FBUyxZQUFZLFlBQVk7b0JBQ3RGLElBQUksV0FBVztvQkFDZixJQUFHLFFBQVEsVUFBVSxRQUFRO3dCQUN6QixZQUFZLGVBQWUsUUFBUTs7b0JBRXZDLElBQUcsUUFBUSxVQUFVLFlBQVk7d0JBQzdCLFlBQVksb0NBQW9DLFlBQVk7O29CQUVoRSxJQUFJLFFBQVEsVUFBVSxVQUFVO3dCQUM1QixZQUFZOztvQkFFaEIsSUFBSSxRQUFRLFVBQVUsVUFBVTt3QkFDNUIsWUFBWTs7b0JBRWhCLElBQUksUUFBUSxVQUFVLGFBQWE7d0JBQy9CLFlBQVk7O29CQUVoQixZQUFZO29CQUNaLE9BQU87Ozs7OztnQkFNWCxJQUFJLFVBQVUsVUFBUyxVQUFVO29CQUM3QixJQUFJLEtBQUssU0FBUyxRQUFRLFFBQVEsV0FBVztvQkFDN0MsTUFBTTtvQkFDTixPQUFPOzs7Z0JBR1gsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsT0FBTyxZQUFXO3dCQUFFLFFB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USx3QkFBd0I7d0JBQ3pDLE9BQU8sR0FBRyxLQUFLLE9BQU8sU0FBUyxvQkFBb0I7d0JBQ25ELE9BQU8sR0FBRyxHQUFHLGlCQUFpQixnQkFBZ0IsUUFBUSxRQUFRO3dCQUM5RCxHQUFHLEtBQUssS0FBSzt3QkFDYixPQUFPLEdBQUcsS0FBSyxPQUFPLFNBQVMsb0JBQW9CO3dCQUNuRCxPQUFPLEdBQUcsR0FBRyxpQkFBaUIsZ0JBQWdCLFFBQVEsUUFBUTs7d0JBRTlELE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxRQUFRLFFBQVE7OztvQkFHL0MsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsSUFBSSxLQUFLLFFBQVEsd0JBQXdCO3dCQUN6QyxPQUFPLEdBQUcsS0FBSyxPQUFPLFNBQVMsb0JBQW9CO3dCQUNuRCxPQUFPLEdBQUcsR0FBRyxpQkFBaUIsZ0JBQWdCLFFBQVEsUUFBUTt3QkFDOUQsR0FBRyxLQUFLLEtBQUs7d0JBQ2IsT0FBTyxHQUFHLEtBQUssT0FBTyxTQUFTLG9CQUFvQjt3QkFDbkQsT0FBTyxHQUFHLEdBQUcsaUJBQWlCLGdCQUFnQixRQUFRLFFBQVE7O3dCQUU5RCxPQUFPLEdBQUcsS0FBSyxLQUFLLE9BQU8sUUFBUSxRQUFRO3dCQUMzQyxHQUFHLEtBQUssS0FBSzt3QkFDYixPQUFPLEdBQUcsS0FBSyxPQUFPLFNBQVMsb0JBQW9CO3dCQUNuRCxPQUFPLEdBQUcsR0FBRyxpQkFBaUIsZ0JBQWdCLFFBQVEsUUFBUTs7d0JBRTlELE9BQU8sR0FBRyxLQUFLLEtBQUssT0FBTyxRQUFRLFFBQVE7Ozs7Z0JBSW5ELFVBQVUsWUFBVztvQkFDakIsUUFBUSxRQUFRLGtCQUFrQjs7Ozs7R0FldkMiLCJmaWxlIjoiY29tbW9uL2Zvcm0vTXVsdGlWYWx1ZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4qIFVuaXQgdGVzdHMgZm9yIHRoZSBtdWx0aXZhbHVlIGRpcmVjdGl2ZS5cbiovXG5kZXNjcmliZSgnc3BNdWx0aVZhbHVlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbW9kZWxOYW1lID0gJ21vZGVsJyxcbiAgICAgICAgYWx0TGFiZWxGdW5jTmFtZSA9ICdhbHRMYWJlbEZ1bmMnLFxuICAgICAgICAkY29tcGlsZSwgc2NvcGU7XG5cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSB0ZXN0cy5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgIC8vIFNhdmUgb3VyIGRlcGVuZGVuY2llcyBmb3IgbGF0ZXIgdXNlLlxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgc2NvcGUubW9kZWwgPSBbXTtcbiAgICAgICAgc2NvcGUuYWx0TGFiZWxGdW5jID0gZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gaXRlbS5uYW1lOyB9O1xuICAgIH0pKTtcblxuICAgIHZhciBidWlsZE11bHRpdmFsdWVUZW1wbGF0ZSA9IGZ1bmN0aW9uKG1vZGVsLCBsYWJlbEZ1bmMsIGlzTGFyZ2UsIGlzRGlzYWJsZWQsIGlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJzxzcC1tdWx0aS12YWx1ZSAnO1xuICAgICAgICBpZihhbmd1bGFyLmlzRGVmaW5lZChtb2RlbCkpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICduZy1tb2RlbD1cIicgKyBtb2RlbCArICdcIiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFuZ3VsYXIuaXNEZWZpbmVkKGxhYmVsRnVuYykpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICdzcC1tdWx0aS12YWx1ZS1sYWJlbC1mdW5jdGlvbj1cIicgKyBsYWJlbEZ1bmMgKyAnXCIgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoaXNMYXJnZSkpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlICs9ICdzcC1tdWx0aS12YWx1ZS1sYXJnZT1cInRydWVcIiAnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChpc0xhcmdlKSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgKz0gJ25nLWRpc2FibGVkPVwibmdEaXNhYmxlZFwiICc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGlzUmVxdWlyZWQpKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZSArPSAnbmctcmVxdWlyZWQ9XCJuZ1JlcXVpcmVkXCIgJztcbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZSArPSAnPnRlc3QgdHJhbnNjbHVkZTwvc3AtbXVsdGktdmFsdWU+JztcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb21waWxlIHRoZSBnaXZlbiBIVE1MIGFuZCByZXR1cm4gdGhlIHJlc3VsdGluZyBlbGVtZW50LlxuICAgICAqL1xuICAgIHZhciBjb21waWxlID0gZnVuY3Rpb24oaW5wdXRUcGwpIHtcbiAgICAgICAgdmFyIGVsID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGlucHV0VHBsKSkoc2NvcGUpO1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH07XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIG1vZGVsIGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbXBpbGUoYnVpbGRNdWx0aXZhbHVlVGVtcGxhdGUoKSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdHJhbnNjbHVkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGl2YWx1ZVRlbXBsYXRlKG1vZGVsTmFtZSkpO1xuICAgICAgICAvL2ZpbmQgZGl2IHR3aWNlIHNpbmNlIGl0IGlzIHR3byBsZXZlbHMgZG93blxuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsKS5maW5kKCdkaXYnKS5maW5kKCdkaXYnKS50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCd0ZXN0IHRyYW5zY2x1ZGUnKTtcbiAgICB9KTtcblxuICAgIGl0KCckaXNFbXB0eSBzaG91bGQgcmV0dXJuIHRydWUgZm9yIGVtcHR5IGxpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsID0gY29tcGlsZShidWlsZE11bHRpdmFsdWVUZW1wbGF0ZShtb2RlbE5hbWUpKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbCkuZGF0YSgpLiRuZ01vZGVsQ29udHJvbGxlci4kaXNFbXB0eShbXSkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aXRoIGEgc2VsZWN0ZWQgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdEl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FsdGVybmF0ZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdtYWluJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjb3BlLm1vZGVsID0gW3Rlc3RJdGVtXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwbGF5IGl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRNdWx0aXZhbHVlVGVtcGxhdGUobW9kZWxOYW1lKSk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsKS5maW5kKCdpbnB1dCcpLmF0dHIoJ3ZhbHVlJykpLnRvRXF1YWwodGVzdEl0ZW0uZGlzcGxheU5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRpc3BsYXkgaXRlbSBkaWZmZXJlbnRseSB3aXRoIGxhYmVsIGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGl2YWx1ZVRlbXBsYXRlKG1vZGVsTmFtZSwgYWx0TGFiZWxGdW5jTmFtZSkpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbCkuZmluZCgnaW5wdXQnKS5hdHRyKCd2YWx1ZScpKS50b0VxdWFsKHRlc3RJdGVtLm5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbW92ZSBpdGVtIHdoZW4gcmVtb3ZlIGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRNdWx0aXZhbHVlVGVtcGxhdGUobW9kZWxOYW1lLCBhbHRMYWJlbEZ1bmNOYW1lKSk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsKS5maW5kKCdidXR0b24nKS5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHZhbGlkYXRlIHdoZW4gaXRlbSBpcyByZW1vdmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGl2YWx1ZVRlbXBsYXRlKG1vZGVsTmFtZSwgYWx0TGFiZWxGdW5jTmFtZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpKTtcbiAgICAgICAgICAgIHNjb3BlLm5nUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgc3B5T24oYW5ndWxhci5lbGVtZW50KGVsKS5kYXRhKCkuJG5nTW9kZWxDb250cm9sbGVyLCAnJHZhbGlkYXRlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUubW9kZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbCkuZGF0YSgpLiRuZ01vZGVsQ29udHJvbGxlci4kdmFsaWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbCkuZmluZCgnYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWwpLmRhdGEoKS4kbmdNb2RlbENvbnRyb2xsZXIuJHZhbGlkYXRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsKS5kYXRhKCkuJG5nTW9kZWxDb250cm9sbGVyLiR2YWxpZCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGFsbG93IHJlbW92YWwgaWYgZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRNdWx0aXZhbHVlVGVtcGxhdGUobW9kZWxOYW1lLCBhbHRMYWJlbEZ1bmNOYW1lLCB1bmRlZmluZWQsIHRydWUpKTtcbiAgICAgICAgICAgIHNjb3BlLm5nRGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1vZGVsLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbCkuZmluZCgnYnV0dG9uJykuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IGhhdmUgYSBsaW5rJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGl2YWx1ZVRlbXBsYXRlKG1vZGVsTmFtZSkpO1xuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2EnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aCBtb3JlIHRoYW4gNSBzZWxlY3RlZCBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGVzdEl0ZW1zID0gW3tcbiAgICAgICAgICAgICAgICBuYW1lOiAnMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnMidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnMydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnNCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnNSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnNidcbiAgICAgICAgICAgIH1dO1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUubW9kZWwgPSB0ZXN0SXRlbXM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBzaG93IG1vcmUgbGluaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsID0gY29tcGlsZShidWlsZE11bHRpdmFsdWVUZW1wbGF0ZShtb2RlbE5hbWUpKTtcbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCdhJykudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgndWlfZm9ybV9tdWx0aV9zaG93X3hfbW9yZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRpc3BsYXkgNSBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGVsID0gY29tcGlsZShidWlsZE11bHRpdmFsdWVUZW1wbGF0ZShtb2RlbE5hbWUpKTtcbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCdkaXYnKS5oYXNDbGFzcygnc2hvdy1maXJzdC1maXZlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbFswXS5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXQtZ3JvdXAnKS5sZW5ndGgpLnRvRXF1YWwoNik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGxheSBhbGwgYWZ0ZXIgc2hvdyBtb3JlIGJ1dHRvbiBpcyBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBjb21waWxlKGJ1aWxkTXVsdGl2YWx1ZVRlbXBsYXRlKG1vZGVsTmFtZSkpO1xuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2RpdicpLmhhc0NsYXNzKCdzaG93LWZpcnN0LWZpdmUnKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGVsWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dC1ncm91cCcpLmxlbmd0aCkudG9FcXVhbCg2KTtcbiAgICAgICAgICAgIGVsLmZpbmQoJ2EnKS5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2RpdicpLmhhc0NsYXNzKCdzaG93LWZpcnN0LWZpdmUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxbMF0ucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWdyb3VwJykubGVuZ3RoKS50b0VxdWFsKDYpO1xuICAgICAgICAgICAgLy9tYWtlIHN1cmUgbGluayBzd2l0Y2hlZFxuICAgICAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ2EnKS50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCd1aV9mb3JtX211bHRpX2hpZGVfbW9yZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRpc3BsYXkgNSBhZ2FpbiBhZnRlciBoaWRpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGNvbXBpbGUoYnVpbGRNdWx0aXZhbHVlVGVtcGxhdGUobW9kZWxOYW1lKSk7XG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnZGl2JykuaGFzQ2xhc3MoJ3Nob3ctZmlyc3QtZml2ZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxbMF0ucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWdyb3VwJykubGVuZ3RoKS50b0VxdWFsKDYpO1xuICAgICAgICAgICAgZWwuZmluZCgnYScpLmNsaWNrKCk7XG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnZGl2JykuaGFzQ2xhc3MoJ3Nob3ctZmlyc3QtZml2ZScpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChlbFswXS5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXQtZ3JvdXAnKS5sZW5ndGgpLnRvRXF1YWwoNik7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBsaW5rIHN3aXRjaGVkXG4gICAgICAgICAgICBleHBlY3QoZWwuZmluZCgnYScpLnRleHQoKS50cmltKCkpLnRvRXF1YWwoJ3VpX2Zvcm1fbXVsdGlfaGlkZV9tb3JlJyk7XG4gICAgICAgICAgICBlbC5maW5kKCdhJykuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCdkaXYnKS5oYXNDbGFzcygnc2hvdy1maXJzdC1maXZlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbFswXS5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXQtZ3JvdXAnKS5sZW5ndGgpLnRvRXF1YWwoNik7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBsaW5rIHN3aXRjaGVkIGJhY2tcbiAgICAgICAgICAgIGV4cGVjdChlbC5maW5kKCdhJykudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgndWlfZm9ybV9tdWx0aV9zaG93X3hfbW9yZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCdzcC1tdWx0aS12YWx1ZScpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
