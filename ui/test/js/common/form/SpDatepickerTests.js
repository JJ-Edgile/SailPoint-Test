System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('SpDatepickerDirective', function () {
                var element,
                    $scope,
                    $compile,
                    $locale,
                    spDatepickerId = 'spDatepickerId',
                    modelName = 'someValue';

                function zeroDate(dateString) {
                    var date = new Date(dateString);
                    date.setHours(0, 0, 0, 0);
                    return date;
                }

                function updateElement(element, value) {
                    element.val(value);
                    element.trigger('change');
                }

                beforeEach(module(formModule));

                beforeEach(inject(function (_$compile_, _$locale_, $rootScope, spTranslateFilter) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    $scope[modelName] = new Date();
                    $locale = _$locale_;

                    // Mock spTranslate to test localization
                    spTranslateFilter.configureCatalog({
                        'ui_datepicker_format_letter_day': 'd',
                        'ui_datepicker_format_letter_month': 'm',
                        'ui_datepicker_format_letter_year': 'y'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                describe('spDatepicker', function () {
                    var defaultConfigs = [{
                        attribute: 'sp-datepicker',
                        value: modelName
                    }, {
                        attribute: 'sp-datepicker-id',
                        value: spDatepickerId
                    }, {
                        attribute: 'alt',
                        value: 'some text'
                    }];

                    function getElementDefintion(configs) {
                        var elementDefintion = '<input ';
                        angular.forEach(defaultConfigs, function (config) {
                            elementDefintion += config.attribute + '="' + config.value + '" ';
                        });
                        angular.forEach(configs, function (config) {
                            elementDefintion += config.attribute + '="' + config.value + '" ';
                        });
                        elementDefintion += '/>';
                        return elementDefintion;
                    }

                    function createElement(configs) {
                        element = angular.element(getElementDefintion(configs));
                        $compile(element)($scope);
                        $scope.$apply();
                    }

                    it('should have an internal input with the passed id', function () {
                        createElement();
                        expect(element.find('#' + spDatepickerId).length).toEqual(1);
                    });

                    it('should update the bound value a value is entered by keyboard', function () {
                        var inputField,
                            date = zeroDate('11/26/2013');
                        createElement([{
                            attribute: 'format',
                            value: 'MM/dd/yyyy'
                        }]);
                        inputField = element.find('#' + spDatepickerId);
                        updateElement(inputField, '11/26/2013');
                        expect($scope[modelName]).toEqual(date);
                    });

                    it('should only update on blur if post back is enabled', function () {
                        var inputField,
                            date = zeroDate('11/26/2013'),
                            starting = $scope[modelName];

                        createElement([{
                            attribute: 'format',
                            value: 'MM/dd/yyyy',
                            'sp-datepicker-post-back': '{{ true }}'
                        }]);

                        inputField = element.find('#' + spDatepickerId);

                        expect($scope[modelName]).toEqual(starting);

                        inputField.focus();
                        updateElement(inputField, '11/26/2013');
                        inputField.blur();

                        expect($scope[modelName]).toEqual(date);
                    });

                    it('should open the date picker when the button is clicked', function () {
                        var toggleButton, calendarElement;
                        createElement();
                        element.appendTo(document.body);
                        toggleButton = element.find('.input-group-btn button');
                        toggleButton.click();
                        calendarElement = element.find('.dropdown-menu:visible');
                        expect(calendarElement.length).toEqual(1);
                    });

                    it('should have a normalized localized place holder', function () {
                        var inputField,
                            localFormat = 'M/d/yy',
                            normalFormat = 'mm/dd/yyyy';

                        $locale.DATETIME_FORMATS.shortDate = localFormat;
                        createElement();
                        inputField = element.find('#' + spDatepickerId);
                        expect(inputField.attr('placeholder')).toEqual(normalFormat);
                    });
                });

                describe('spDateMin', function () {
                    var form, input;

                    function getElementDefintion() {
                        return '<form name="form"><input name="minDateField" sp-date-min="minValue" ng-model="test"/></form>';
                    }

                    function createElement() {
                        form = angular.element(getElementDefintion());
                        $compile(form)($scope);
                        $scope.$apply();
                        input = form.children().eq(0);
                    }

                    it('should be invalid when input is less than minimum', function () {
                        var minDate = '11/26/2013',
                            inputDate = '11/1/2013';
                        createElement();
                        $scope.minValue = minDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$invalid).toBeTruthy();
                        expect($scope.form.minDateField).toBeDefined();
                        expect($scope.form.minDateField.$error.spDateMin).toBeTruthy();
                    });

                    it('should be valid when input equals the minimum', function () {
                        var minDate = '11/26/2013',
                            inputDate = '11/26/2013';
                        createElement();
                        $scope.minValue = minDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.minDateField).toBeDefined();
                        expect($scope.form.minDateField.$error.spDateMin).toBeFalsy();
                    });

                    it('should be valid when input greater than minimum', function () {
                        var minDate = '11/26/2013',
                            inputDate = '12/1/2013';
                        createElement();
                        $scope.minValue = minDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.minDateField).toBeDefined();
                        expect($scope.form.minDateField.$error.spDateMin).toBeFalsy();
                    });

                    it('should be valid when minimum is undefined', function () {
                        var inputDate = '12/1/2013';
                        createElement();
                        $scope.minValue = undefined;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.minDateField).toBeDefined();
                        expect($scope.form.minDateField.$error.spDateMin).toBeFalsy();
                    });

                    afterEach(function () {
                        if (form) {
                            form.remove();
                        }
                    });
                });

                describe('spDateMax', function () {
                    var form, input;

                    function getElementDefintion() {
                        return '<form name="form"><input name="maxDateField" sp-date-max="maxValue" ng-model="test"/></form>';
                    }

                    function createElement() {
                        form = angular.element(getElementDefintion());
                        $compile(form)($scope);
                        $scope.$apply();
                        input = form.children().eq(0);
                    }

                    it('should be invalid when input is greater than maximum', function () {
                        var maxDate = '11/26/2013',
                            inputDate = '12/1/2013';
                        createElement();
                        $scope.maxValue = maxDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$invalid).toBeTruthy();
                        expect($scope.form.maxDateField).toBeDefined();
                        expect($scope.form.maxDateField.$error.spDateMax).toBeTruthy();
                    });

                    it('should be valid when input equals the maximum', function () {
                        var maxDate = '11/26/2013',
                            inputDate = '11/26/2013';
                        createElement();
                        $scope.maxValue = maxDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.maxDateField).toBeDefined();
                        expect($scope.form.maxDateField.$error.spDateMax).toBeFalsy();
                    });

                    it('should be valid when input less than maximum', function () {
                        var maxDate = '11/26/2013',
                            inputDate = '11/1/2013';
                        createElement();
                        $scope.maxValue = maxDate;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.maxDateField).toBeDefined();
                        expect($scope.form.maxDateField.$error.spDateMax).toBeFalsy();
                    });

                    it('should be valid when maximum is undefined', function () {
                        var inputDate = '12/1/2013';
                        createElement();
                        $scope.maxValue = undefined;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.maxDateField).toBeDefined();
                        expect($scope.form.maxDateField.$error.spDateMax).toBeFalsy();
                    });

                    afterEach(function () {
                        if (form) {
                            form.remove();
                        }
                    });
                });

                describe('spPopupOverride', function () {

                    function createElement(elm) {
                        element = angular.element(elm);
                        $compile(element)($scope);
                        $scope.$apply();
                    }

                    function createKeydownEvent(keyCode) {
                        return $.Event('keydown', {
                            keyCode: keyCode,
                            which: keyCode
                        });
                    }

                    // NOTE: I couldn't find a way to test the opposite of this.  Since sp-popup-override is included
                    // in sp-datepicker, I can't test the positive case without modifying the sp-datepicker directive.
                    // I DID test it that way just to verify this was working as expected, but I don't want to include that
                    // test here since it will fail and we don't want a bunch of commented out tests hanging around anyway.
                    it('should NOT open datepicker with down arrow.', function () {
                        var calendarElement;

                        createElement('<input sp-datepicker />');
                        element.appendTo(document.body);
                        element.find('input').trigger(createKeydownEvent(40));
                        $scope.$apply();

                        calendarElement = element.find('.dropdown-menu:visible');
                        expect(calendarElement.length).toEqual(0);
                    });
                });

                describe('spDateFormat', function () {
                    var form, input, spDateServiceSpy;

                    beforeEach(inject(function (_spDateService_) {
                        spDateServiceSpy = spyOn(_spDateService_, 'parseDate').and.callThrough();
                    }));

                    function getElementDefintion() {
                        return '<form name="form">' + '  <input name="dateFormatField" sp-date-format="innerFormat" ng-model="test"/>' + '</form>';
                    }

                    function createElement() {
                        form = angular.element(getElementDefintion());
                        $compile(form)($scope);
                        $scope.$apply();
                        input = form.children().eq(0);
                    }

                    it('should be invalid when format is wrong', function () {
                        var format = 'dd/MM/yyyy',
                            inputDate = '1-13-2013';
                        createElement();
                        $scope.innerFormat = format;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$invalid).toBeTruthy();
                        expect($scope.form.dateFormatField).toBeDefined();
                        expect($scope.form.dateFormatField.$error.spDateFormat).toBeTruthy();
                        expect(spDateServiceSpy).toHaveBeenCalled();
                        expect(spDateServiceSpy.calls.mostRecent().args[0]).toEqual(inputDate);
                        expect(spDateServiceSpy.calls.mostRecent().args[1]).toEqual(format);
                    });

                    it('should be valid when matches format', function () {
                        var format = 'dd/MM/yyyy',
                            inputDate = '25/12/2013';
                        createElement();
                        $scope.innerFormat = format;
                        updateElement(input, inputDate);
                        expect($scope.form).toBeDefined();
                        expect($scope.form.$valid).toBeTruthy();
                        expect($scope.form.dateFormatField).toBeDefined();
                        expect($scope.form.dateFormatField.$error.spDateFormat).toBeFalsy();
                        expect(spDateServiceSpy).toHaveBeenCalled();
                        expect(spDateServiceSpy.calls.mostRecent().args[0]).toEqual(inputDate);
                        expect(spDateServiceSpy.calls.mostRecent().args[1]).toEqual(format);
                    });

                    afterEach(function () {
                        if (form) {
                            form.remove();
                        }
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL1NwRGF0ZXBpY2tlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsNENBQTRDLFVBQVUsU0FBUztJQUNqSTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyx5QkFBeUIsWUFBVztnQkFDekMsSUFBSTtvQkFBUztvQkFBUTtvQkFBVTtvQkFDM0IsaUJBQWlCO29CQUNqQixZQUFZOztnQkFFaEIsU0FBUyxTQUFTLFlBQVk7b0JBQzFCLElBQUksT0FBTyxJQUFJLEtBQUs7b0JBQ3BCLEtBQUssU0FBUyxHQUFHLEdBQUcsR0FBRztvQkFDdkIsT0FBTzs7O2dCQUdYLFNBQVMsY0FBYyxTQUFTLE9BQU87b0JBQ25DLFFBQVEsSUFBSTtvQkFDWixRQUFRLFFBQVE7OztnQkFHcEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxXQUFXLFlBQVksbUJBQW1CO29CQUM3RSxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsT0FBTyxhQUFhLElBQUk7b0JBQ3hCLFVBQVU7OztvQkFHVixrQkFBa0IsaUJBQWlCO3dCQUMvQixtQ0FBbUM7d0JBQ25DLHFDQUFxQzt3QkFDckMsb0NBQW9DOzs7O2dCQUk1QyxVQUFVLFlBQVc7b0JBQ2pCLElBQUcsU0FBUzt3QkFDUixRQUFROzs7O2dCQUloQixTQUFTLGdCQUFnQixZQUFXO29CQUNoQyxJQUFJLGlCQUFpQixDQUFDO3dCQUNsQixXQUFXO3dCQUNYLE9BQU87dUJBQ1I7d0JBQ0MsV0FBVzt3QkFDWCxPQUFPO3VCQUNSO3dCQUNDLFdBQVc7d0JBQ1gsT0FBTzs7O29CQUdYLFNBQVMsb0JBQW9CLFNBQVM7d0JBQ2xDLElBQUksbUJBQW1CO3dC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d0JBQzNCLE9BQU8sdUJBQ0ksbUZBQ0E7OztvQkFHZixTQUFTLGdCQUFnQjt3QkFDckIsT0FBTyxRQUFRLFFBQVE7d0JBQ3ZCLFNBQVMsTUFBTTt3QkFDZixPQUFPO3dCQUNQLFFBQVEsS0FBSyxXQUFXLEdBQUc7OztvQkFHL0IsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxTQUFTOzRCQUNULFlBQVk7d0JBQ2hCO3dCQUNBLE9BQU8sY0FBYzt3QkFDckIsY0FBYyxPQUFPO3dCQUNyQixPQUFPLE9BQU8sTUFBTTt3QkFDcEIsT0FBTyxPQUFPLEtBQUssVUFBVTt3QkFDN0IsT0FBTyxPQUFPLEtBQUssaUJBQWlCO3dCQUNwQyxPQUFPLE9BQU8sS0FBSyxnQkFBZ0IsT0FBTyxjQUFjO3dCQUN4RCxPQUFPLGtCQUFrQjt3QkFDekIsT0FBTyxpQkFBaUIsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRO3dCQUM1RCxPQUFPLGlCQUFpQixNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7OztvQkFHaEUsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsSUFBSSxTQUFTOzRCQUNULFlBQVk7d0JBQ2hCO3dCQUNBLE9BQU8sY0FBYzt3QkFDckIsY0FBYyxPQUFPO3dCQUNyQixPQUFPLE9BQU8sTUFBTTt3QkFDcEIsT0FBTyxPQUFPLEtBQUssUUFBUTt3QkFDM0IsT0FBTyxPQUFPLEtBQUssaUJBQWlCO3dCQUNwQyxPQUFPLE9BQU8sS0FBSyxnQkFBZ0IsT0FBTyxjQUFjO3dCQUN4RCxPQUFPLGtCQUFrQjt3QkFDekIsT0FBTyxpQkFBaUIsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRO3dCQUM1RCxPQUFPLGlCQUFpQixNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7OztvQkFHaEUsVUFBVSxZQUFXO3dCQUNqQixJQUFHLE1BQU07NEJBQ0wsS0FBSzs7Ozs7OztHQVFsQiIsImZpbGUiOiJjb21tb24vZm9ybS9TcERhdGVwaWNrZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGZvcm1Nb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybU1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XG5cbmRlc2NyaWJlKCdTcERhdGVwaWNrZXJEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCwgJHNjb3BlLCAkY29tcGlsZSwgJGxvY2FsZSxcbiAgICAgICAgc3BEYXRlcGlja2VySWQgPSAnc3BEYXRlcGlja2VySWQnLFxuICAgICAgICBtb2RlbE5hbWUgPSAnc29tZVZhbHVlJztcblxuICAgIGZ1bmN0aW9uIHplcm9EYXRlKGRhdGVTdHJpbmcpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRWxlbWVudChlbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnZhbCh2YWx1ZSk7XG4gICAgICAgIGVsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZm9ybU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgXyRsb2NhbGVfLCAkcm9vdFNjb3BlLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRzY29wZVttb2RlbE5hbWVdID0gbmV3IERhdGUoKTtcbiAgICAgICAgJGxvY2FsZSA9IF8kbG9jYWxlXztcblxuICAgICAgICAvLyBNb2NrIHNwVHJhbnNsYXRlIHRvIHRlc3QgbG9jYWxpemF0aW9uXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ3VpX2RhdGVwaWNrZXJfZm9ybWF0X2xldHRlcl9kYXknOiAnZCcsXG4gICAgICAgICAgICAndWlfZGF0ZXBpY2tlcl9mb3JtYXRfbGV0dGVyX21vbnRoJzogJ20nLFxuICAgICAgICAgICAgJ3VpX2RhdGVwaWNrZXJfZm9ybWF0X2xldHRlcl95ZWFyJzogJ3knXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NwRGF0ZXBpY2tlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGVmYXVsdENvbmZpZ3MgPSBbe1xuICAgICAgICAgICAgYXR0cmlidXRlOiAnc3AtZGF0ZXBpY2tlcicsXG4gICAgICAgICAgICB2YWx1ZTogbW9kZWxOYW1lXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ3NwLWRhdGVwaWNrZXItaWQnLFxuICAgICAgICAgICAgdmFsdWU6IHNwRGF0ZXBpY2tlcklkXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2FsdCcsXG4gICAgICAgICAgICB2YWx1ZTogJ3NvbWUgdGV4dCdcbiAgICAgICAgfV07XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0RWxlbWVudERlZmludGlvbihjb25maWdzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudERlZmludGlvbiA9ICc8aW5wdXQgJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkZWZhdWx0Q29uZmlncywgZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudERlZmludGlvbiArPSBjb25maWcuYXR0cmlidXRlICsgJz1cIicgKyBjb25maWcudmFsdWUgKyAnXCIgJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbmZpZ3MsIGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnREZWZpbnRpb24gKz0gY29uZmlnLmF0dHJpYnV0ZSArICc9XCInICsgY29uZmlnLnZhbHVlICsgJ1wiICc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnREZWZpbnRpb24gKz0gJy8+JztcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RGVmaW50aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChjb25maWdzKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oY29uZmlncykpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhbiBpbnRlcm5hbCBpbnB1dCB3aXRoIHRoZSBwYXNzZWQgaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyMnICsgc3BEYXRlcGlja2VySWQpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgdGhlIGJvdW5kIHZhbHVlIGEgdmFsdWUgaXMgZW50ZXJlZCBieSBrZXlib2FyZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlucHV0RmllbGQsXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHplcm9EYXRlKCcxMS8yNi8yMDEzJyk7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KFt7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZm9ybWF0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ01NL2RkL3l5eXknXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkID0gZWxlbWVudC5maW5kKCcjJyArIHNwRGF0ZXBpY2tlcklkKTtcbiAgICAgICAgICAgIHVwZGF0ZUVsZW1lbnQoaW5wdXRGaWVsZCwgJzExLzI2LzIwMTMnKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGVbbW9kZWxOYW1lXSkudG9FcXVhbChkYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvbmx5IHVwZGF0ZSBvbiBibHVyIGlmIHBvc3QgYmFjayBpcyBlbmFibGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRGaWVsZCxcbiAgICAgICAgICAgICAgICBkYXRlID0gemVyb0RhdGUoJzExLzI2LzIwMTMnKSxcbiAgICAgICAgICAgICAgICBzdGFydGluZyA9ICRzY29wZVttb2RlbE5hbWVdO1xuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KFt7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZm9ybWF0JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ01NL2RkL3l5eXknLFxuICAgICAgICAgICAgICAgICdzcC1kYXRlcGlja2VyLXBvc3QtYmFjayc6ICd7eyB0cnVlIH19J1xuICAgICAgICAgICAgfV0pO1xuXG4gICAgICAgICAgICBpbnB1dEZpZWxkID0gZWxlbWVudC5maW5kKCcjJyArIHNwRGF0ZXBpY2tlcklkKTtcblxuICAgICAgICAgICAgZXhwZWN0KCRzY29wZVttb2RlbE5hbWVdKS50b0VxdWFsKHN0YXJ0aW5nKTtcblxuICAgICAgICAgICAgaW5wdXRGaWVsZC5mb2N1cygpO1xuICAgICAgICAgICAgdXBkYXRlRWxlbWVudChpbnB1dEZpZWxkLCAnMTEvMjYvMjAxMycpO1xuICAgICAgICAgICAgaW5wdXRGaWVsZC5ibHVyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGVbbW9kZWxOYW1lXSkudG9FcXVhbChkYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBkYXRlIHBpY2tlciB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRvZ2dsZUJ1dHRvbixcbiAgICAgICAgICAgICAgICBjYWxlbmRhckVsZW1lbnQ7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uID0gZWxlbWVudC5maW5kKCcuaW5wdXQtZ3JvdXAtYnRuIGJ1dHRvbicpO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICBjYWxlbmRhckVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51OnZpc2libGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxlbmRhckVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYSBub3JtYWxpemVkIGxvY2FsaXplZCBwbGFjZSBob2xkZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dEZpZWxkLFxuICAgICAgICAgICAgICAgIGxvY2FsRm9ybWF0ID0gJ00vZC95eScsXG4gICAgICAgICAgICAgICAgbm9ybWFsRm9ybWF0ID0gJ21tL2RkL3l5eXknO1xuXG4gICAgICAgICAgICAkbG9jYWxlLkRBVEVUSU1FX0ZPUk1BVFMuc2hvcnREYXRlID0gbG9jYWxGb3JtYXQ7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBpbnB1dEZpZWxkID0gZWxlbWVudC5maW5kKCcjJyArIHNwRGF0ZXBpY2tlcklkKTtcbiAgICAgICAgICAgIGV4cGVjdChpbnB1dEZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJykpLnRvRXF1YWwobm9ybWFsRm9ybWF0KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcERhdGVNaW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZvcm0sXG4gICAgICAgICAgICBpbnB1dDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRFbGVtZW50RGVmaW50aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICc8Zm9ybSBuYW1lPVwiZm9ybVwiPjxpbnB1dCBuYW1lPVwibWluRGF0ZUZpZWxkXCIgc3AtZGF0ZS1taW49XCJtaW5WYWx1ZVwiIG5nLW1vZGVsPVwidGVzdFwiLz48L2Zvcm0+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgICAgICBmb3JtID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgICAgICAkY29tcGlsZShmb3JtKSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgaW5wdXQgPSBmb3JtLmNoaWxkcmVuKCkuZXEoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGludmFsaWQgd2hlbiBpbnB1dCBpcyBsZXNzIHRoYW4gbWluaW11bScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1pbkRhdGUgPSAnMTEvMjYvMjAxMycsXG4gICAgICAgICAgICAgICAgaW5wdXREYXRlID0gJzExLzEvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWluVmFsdWUgPSBtaW5EYXRlO1xuICAgICAgICAgICAgdXBkYXRlRWxlbWVudChpbnB1dCwgaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS4kaW52YWxpZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1pbkRhdGVGaWVsZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5taW5EYXRlRmllbGQuJGVycm9yLnNwRGF0ZU1pbikudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIHdoZW4gaW5wdXQgZXF1YWxzIHRoZSBtaW5pbXVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWluRGF0ZSA9ICcxMS8yNi8yMDEzJyxcbiAgICAgICAgICAgICAgICBpbnB1dERhdGUgPSAnMTEvMjYvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWluVmFsdWUgPSBtaW5EYXRlO1xuICAgICAgICAgICAgdXBkYXRlRWxlbWVudChpbnB1dCwgaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS4kdmFsaWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5taW5EYXRlRmllbGQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0ubWluRGF0ZUZpZWxkLiRlcnJvci5zcERhdGVNaW4pLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIHdoZW4gaW5wdXQgZ3JlYXRlciB0aGFuIG1pbmltdW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtaW5EYXRlID0gJzExLzI2LzIwMTMnLFxuICAgICAgICAgICAgICAgIGlucHV0RGF0ZSA9ICcxMi8xLzIwMTMnO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgJHNjb3BlLm1pblZhbHVlID0gbWluRGF0ZTtcbiAgICAgICAgICAgIHVwZGF0ZUVsZW1lbnQoaW5wdXQsIGlucHV0RGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0uJHZhbGlkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0ubWluRGF0ZUZpZWxkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1pbkRhdGVGaWVsZC4kZXJyb3Iuc3BEYXRlTWluKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB2YWxpZCB3aGVuIG1pbmltdW0gaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXREYXRlID0gJzEyLzEvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWluVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB1cGRhdGVFbGVtZW50KGlucHV0LCBpbnB1dERhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLiR2YWxpZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1pbkRhdGVGaWVsZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5taW5EYXRlRmllbGQuJGVycm9yLnNwRGF0ZU1pbikudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGZvcm0pIHtcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcERhdGVNYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZvcm0sXG4gICAgICAgICAgICBpbnB1dDtcblxuICAgICAgICBmdW5jdGlvbiBnZXRFbGVtZW50RGVmaW50aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICc8Zm9ybSBuYW1lPVwiZm9ybVwiPjxpbnB1dCBuYW1lPVwibWF4RGF0ZUZpZWxkXCIgc3AtZGF0ZS1tYXg9XCJtYXhWYWx1ZVwiIG5nLW1vZGVsPVwidGVzdFwiLz48L2Zvcm0+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgICAgICBmb3JtID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgICAgICAkY29tcGlsZShmb3JtKSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgaW5wdXQgPSBmb3JtLmNoaWxkcmVuKCkuZXEoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGludmFsaWQgd2hlbiBpbnB1dCBpcyBncmVhdGVyIHRoYW4gbWF4aW11bScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG1heERhdGUgPSAnMTEvMjYvMjAxMycsXG4gICAgICAgICAgICAgICAgaW5wdXREYXRlID0gJzEyLzEvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWF4VmFsdWUgPSBtYXhEYXRlO1xuICAgICAgICAgICAgdXBkYXRlRWxlbWVudChpbnB1dCwgaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS4kaW52YWxpZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1heERhdGVGaWVsZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5tYXhEYXRlRmllbGQuJGVycm9yLnNwRGF0ZU1heCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIHdoZW4gaW5wdXQgZXF1YWxzIHRoZSBtYXhpbXVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbWF4RGF0ZSA9ICcxMS8yNi8yMDEzJyxcbiAgICAgICAgICAgICAgICBpbnB1dERhdGUgPSAnMTEvMjYvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWF4VmFsdWUgPSBtYXhEYXRlO1xuICAgICAgICAgICAgdXBkYXRlRWxlbWVudChpbnB1dCwgaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS4kdmFsaWQpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5tYXhEYXRlRmllbGQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0ubWF4RGF0ZUZpZWxkLiRlcnJvci5zcERhdGVNYXgpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIHdoZW4gaW5wdXQgbGVzcyB0aGFuIG1heGltdW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtYXhEYXRlID0gJzExLzI2LzIwMTMnLFxuICAgICAgICAgICAgICAgIGlucHV0RGF0ZSA9ICcxMS8xLzIwMTMnO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgJHNjb3BlLm1heFZhbHVlID0gbWF4RGF0ZTtcbiAgICAgICAgICAgIHVwZGF0ZUVsZW1lbnQoaW5wdXQsIGlucHV0RGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0pLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0uJHZhbGlkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0ubWF4RGF0ZUZpZWxkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1heERhdGVGaWVsZC4kZXJyb3Iuc3BEYXRlTWF4KS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB2YWxpZCB3aGVuIG1heGltdW0gaXMgdW5kZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXREYXRlID0gJzEyLzEvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUubWF4VmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB1cGRhdGVFbGVtZW50KGlucHV0LCBpbnB1dERhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLiR2YWxpZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLm1heERhdGVGaWVsZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5tYXhEYXRlRmllbGQuJGVycm9yLnNwRGF0ZU1heCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGZvcm0pIHtcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcFBvcHVwT3ZlcnJpZGUnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsbSkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbG0pO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUtleWRvd25FdmVudChrZXlDb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5FdmVudCgna2V5ZG93bicsIHtcbiAgICAgICAgICAgICAgICBrZXlDb2RlOiBrZXlDb2RlLFxuICAgICAgICAgICAgICAgIHdoaWNoOiBrZXlDb2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5PVEU6IEkgY291bGRuJ3QgZmluZCBhIHdheSB0byB0ZXN0IHRoZSBvcHBvc2l0ZSBvZiB0aGlzLiAgU2luY2Ugc3AtcG9wdXAtb3ZlcnJpZGUgaXMgaW5jbHVkZWRcbiAgICAgICAgLy8gaW4gc3AtZGF0ZXBpY2tlciwgSSBjYW4ndCB0ZXN0IHRoZSBwb3NpdGl2ZSBjYXNlIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBzcC1kYXRlcGlja2VyIGRpcmVjdGl2ZS5cbiAgICAgICAgLy8gSSBESUQgdGVzdCBpdCB0aGF0IHdheSBqdXN0IHRvIHZlcmlmeSB0aGlzIHdhcyB3b3JraW5nIGFzIGV4cGVjdGVkLCBidXQgSSBkb24ndCB3YW50IHRvIGluY2x1ZGUgdGhhdFxuICAgICAgICAvLyB0ZXN0IGhlcmUgc2luY2UgaXQgd2lsbCBmYWlsIGFuZCB3ZSBkb24ndCB3YW50IGEgYnVuY2ggb2YgY29tbWVudGVkIG91dCB0ZXN0cyBoYW5naW5nIGFyb3VuZCBhbnl3YXkuXG4gICAgICAgIGl0KCdzaG91bGQgTk9UIG9wZW4gZGF0ZXBpY2tlciB3aXRoIGRvd24gYXJyb3cuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY2FsZW5kYXJFbGVtZW50O1xuXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCc8aW5wdXQgc3AtZGF0ZXBpY2tlciAvPicpO1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnaW5wdXQnKS50cmlnZ2VyKGNyZWF0ZUtleWRvd25FdmVudCg0MCkpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBjYWxlbmRhckVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51OnZpc2libGUnKTtcbiAgICAgICAgICAgIGV4cGVjdChjYWxlbmRhckVsZW1lbnQubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzcERhdGVGb3JtYXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZvcm0sXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIHNwRGF0ZVNlcnZpY2VTcHk7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwRGF0ZVNlcnZpY2VfKSB7XG4gICAgICAgICAgICBzcERhdGVTZXJ2aWNlU3B5ID0gc3B5T24oX3NwRGF0ZVNlcnZpY2VfLCAncGFyc2VEYXRlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRFbGVtZW50RGVmaW50aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICc8Zm9ybSBuYW1lPVwiZm9ybVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICA8aW5wdXQgbmFtZT1cImRhdGVGb3JtYXRGaWVsZFwiIHNwLWRhdGUtZm9ybWF0PVwiaW5uZXJGb3JtYXRcIiBuZy1tb2RlbD1cInRlc3RcIi8+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgICAgICBmb3JtID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgICAgICAkY29tcGlsZShmb3JtKSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgaW5wdXQgPSBmb3JtLmNoaWxkcmVuKCkuZXEoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGludmFsaWQgd2hlbiBmb3JtYXQgaXMgd3JvbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSAnZGQvTU0veXl5eScsXG4gICAgICAgICAgICAgICAgaW5wdXREYXRlID0gJzEtMTMtMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5uZXJGb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgICAgICB1cGRhdGVFbGVtZW50KGlucHV0LCBpbnB1dERhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLiRpbnZhbGlkKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmZvcm0uZGF0ZUZvcm1hdEZpZWxkKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLmRhdGVGb3JtYXRGaWVsZC4kZXJyb3Iuc3BEYXRlRm9ybWF0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BEYXRlU2VydmljZVNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwRGF0ZVNlcnZpY2VTcHkuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlU3B5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdKS50b0VxdWFsKGZvcm1hdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdmFsaWQgd2hlbiBtYXRjaGVzIGZvcm1hdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdCA9ICdkZC9NTS95eXl5JyxcbiAgICAgICAgICAgICAgICBpbnB1dERhdGUgPSAnMjUvMTIvMjAxMyc7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICAkc2NvcGUuaW5uZXJGb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgICAgICB1cGRhdGVFbGVtZW50KGlucHV0LCBpbnB1dERhdGUpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLiR2YWxpZCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5mb3JtLmRhdGVGb3JtYXRGaWVsZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuZm9ybS5kYXRlRm9ybWF0RmllbGQuJGVycm9yLnNwRGF0ZUZvcm1hdCkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BEYXRlU2VydmljZVNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwRGF0ZVNlcnZpY2VTcHkuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoaW5wdXREYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlU3B5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzFdKS50b0VxdWFsKGZvcm1hdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKGZvcm0pIHtcbiAgICAgICAgICAgICAgICBmb3JtLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
