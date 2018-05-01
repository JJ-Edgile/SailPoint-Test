System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the spFormItem directive.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormItemDirective', function () {
                var formTemplateService,
                    $scope,
                    $compile,
                    FormItem,
                    types,
                    elementHtml = '<sp-form-item sp-form-item="formItem" ' + ' sp-form-item-show-previous-value="showPreviousValue" ' + ' ng-model="val" />',
                    messages = {
                    'ui_form_previous_value': 'Previous Value'
                };

                function compileElement(html) {
                    var element = angular.element(html);

                    $compile(element)($scope);
                    $scope.$apply();

                    return element;
                }

                beforeEach(module(formModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _formTemplateService_, _FormItem_, spTranslateFilter) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    FormItem = _FormItem_;
                    formTemplateService = _formTemplateService_;

                    spTranslateFilter.configureCatalog(messages);

                    types = [FormItem.TYPE_MULTI_SUGGEST, FormItem.TYPE_TEXT, FormItem.TYPE_TEXTAREA, FormItem.TYPE_NUMBER, FormItem.TYPE_CHECKBOX, FormItem.TYPE_SECRET, FormItem.TYPE_RADIO, FormItem.TYPE_SUGGEST, FormItem.TYPE_SELECT, FormItem.TYPE_DATE, FormItem.MULTI_TEXT];
                }));

                it('should call out to formTemplateService to get the template html', function () {
                    $scope.formItem = new FormItem({
                        type: FormItem.TYPE_TEXT
                    });

                    spyOn(formTemplateService, 'getFormItemTemplate');

                    compileElement(elementHtml);

                    expect(formTemplateService.getFormItemTemplate).toHaveBeenCalled();
                });

                it('should not render help text if none configured', function () {
                    var el;

                    $scope.formItem = new FormItem({
                        type: FormItem.TYPE_TEXT
                    });

                    el = compileElement(elementHtml);

                    expect(el.find('.help-block').length).toEqual(0);
                });

                it('should not render a span on required checkbox if configured', function () {
                    var el, notRequiredSpan;

                    $scope.formItem = new FormItem({
                        type: FormItem.TYPE_CHECKBOX,
                        required: true
                    });

                    el = compileElement(elementHtml);
                    notRequiredSpan = el.find('label').find('.text-danger');

                    expect(notRequiredSpan.length).toEqual(0);
                    expect(notRequiredSpan.text().trim()).toEqual('');
                });

                it('should render help text if configured', function () {
                    var el, helpBlock;

                    $scope.formItem = new FormItem({
                        type: FormItem.TYPE_TEXT,
                        helpText: 'Some help text'
                    });

                    el = compileElement(elementHtml);
                    helpBlock = el.find('.help-block');

                    expect(helpBlock.length).toEqual(1);
                    expect(helpBlock.text().trim()).toEqual($scope.formItem.helpText);
                });

                it('should set a height on a textarea if configured', function () {
                    var el;

                    $scope.formItem = new FormItem({
                        type: FormItem.TYPE_TEXTAREA,
                        height: 300
                    });

                    el = compileElement(elementHtml);

                    expect(el.find('textarea').css('height')).toEqual('300px');
                });

                it('should not render a previous value if form not configured', function () {
                    var el,
                        previous,
                        itemId = 'formItemId',
                        previousValue = 'some value';

                    $scope.showPreviousValue = false;

                    types.forEach(function (type) {
                        // ngModel expects a number here
                        if (type === FormItem.TYPE_NUMBER) {
                            $scope.val = 0;
                        } else {
                            $scope.val = undefined;
                        }

                        $scope.formItem = new FormItem({
                            itemId: itemId,
                            type: type,
                            previousValue: previousValue,
                            allowedValues: [['one', 'one']]
                        });

                        el = compileElement(elementHtml);
                        previous = el.find('#' + itemId + '-previous');

                        expect(previous.length).toEqual(0);
                    });
                });

                it('should render a previous value if form configured', function () {
                    var el,
                        previous,
                        itemId = 'formItemId',
                        previousValue = 'some value';

                    $scope.showPreviousValue = true;

                    types.forEach(function (type) {
                        // ngModel expects a number here
                        if (type === FormItem.TYPE_NUMBER) {
                            $scope.val = 0;
                        } else {
                            $scope.val = undefined;
                        }

                        $scope.formItem = new FormItem({
                            itemId: itemId,
                            type: type,
                            previousValue: previousValue,
                            allowedValues: [['one', 'one']]
                        });

                        el = compileElement(elementHtml);
                        previous = el.find('#' + itemId + '-previous');

                        expect(previous.length).toEqual(1);
                        expect(previous.text().trim()).toEqual(messages['ui_form_previous_value'] + ': ' + previousValue);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1JdGVtRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBQTFGOztJQU9JLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLHFCQUFxQixZQUFXO2dCQUNyQyxJQUFJO29CQUNBO29CQUNBO29CQUNBO29CQUNBO29CQUNBLGNBQWMsMkNBQ0EsMkRBQ0E7b0JBQ2QsV0FBVztvQkFDUCwwQkFBMEI7OztnQkFHbEMsU0FBUyxlQUFlLE1BQU07b0JBQzFCLElBQUksVUFBVSxRQUFRLFFBQVE7O29CQUU5QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87O29CQUVQLE9BQU87OztnQkFHWCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksdUJBQXVCLFlBQVksbUJBQW1CO29CQUN2RyxTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxzQkFBc0I7O29CQUV0QixrQkFBa0IsaUJBQWlCOztvQkFFbkMsUUFBUSxDQUFDLFNBQVMsb0JBQW9CLFNBQVMsV0FBVyxTQUFTLGVBQzFELFNBQVMsYUFBYSxTQUFTLGVBQWUsU0FBUyxhQUFhLFNBQVMsWUFDN0UsU0FBUyxjQUFjLFNBQVMsYUFBYSxTQUFTLFdBQVcsU0FBUzs7O2dCQUd2RixHQUFHLG1FQUFtRSxZQUFXO29CQUM3RSxPQUFPLFdBQVcsSUFBSSxTQUFTO3dCQUMzQixNQUFNLFNBQVM7OztvQkFHbkIsTUFBTSxxQkFBcUI7O29CQUUzQixlQUFlOztvQkFFZixPQUFPLG9CQUFvQixxQkFBcUI7OztnQkFHcEQsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsSUFBSTs7b0JBRUosT0FBTyxXQUFXLElBQUksU0FBUzt3QkFDM0IsTUFBTSxTQUFTOzs7b0JBR25CLEtBQUssZUFBZTs7b0JBRXBCLE9BQU8sR0FBRyxLQUFLLGVBQWUsUUFBUSxRQUFROzs7Z0JBR2xELEdBQUcsK0RBQStELFlBQVc7b0JBQ3pFLElBQUksSUFBSTs7b0JBRVIsT0FBTyxXQUFXLElBQUksU0FBUzt3QkFDM0IsTUFBTSxTQUFTO3dCQUNmLFVBQVU7OztvQkFHZCxLQUFLLGVBQWU7b0JBQ3BCLGtCQUFrQixHQUFHLEtBQUssU0FBUyxLQUFLOztvQkFFeEMsT0FBTyxnQkFBZ0IsUUFBUSxRQUFRO29CQUN2QyxPQUFPLGdCQUFnQixPQUFPLFFBQVEsUUFBUTs7O2dCQUdsRCxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxJQUFJLElBQUk7O29CQUVSLE9BQU8sV0FBVyxJQUFJLFNBQVM7d0JBQzNCLE1BQU0sU0FBUzt3QkFDZixVQUFVOzs7b0JBR2QsS0FBSyxlQUFlO29CQUNwQixZQUFZLEdBQUcsS0FBSzs7b0JBRXBCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxPQUFPLFFBQVEsUUFBUSxPQUFPLFNBQVM7OztnQkFHNUQsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsSUFBSTs7b0JBRUosT0FBTyxXQUFXLElBQUksU0FBUzt3QkFDM0IsTUFBTSxTQUFTO3dCQUNmLFFBQVE7OztvQkFHWixLQUFLLGVBQWU7O29CQUVwQixPQUFPLEdBQUcsS0FBSyxZQUFZLElBQUksV0FBVyxRQUFROzs7Z0JBR3RELEdBQUcsNkRBQTZELFlBQVc7b0JBQ3ZFLElBQUk7d0JBQUk7d0JBQ0osU0FBUzt3QkFDVCxnQkFBZ0I7O29CQUVwQixPQUFPLG9CQUFvQjs7b0JBRTNCLE1BQU0sUUFBUSxVQUFTLE1BQU07O3dCQUV6QixJQUFJLFNBQVMsU0FBUyxhQUFhOzRCQUMvQixPQUFPLE1BQU07K0JBQ1Y7NEJBQ0gsT0FBTyxNQUFNOzs7d0JBR2pCLE9BQU8sV0FBVyxJQUFJLFNBQVM7NEJBQzNCLFFBQVE7NEJBQ1IsTUFBTTs0QkFDTixlQUFlOzRCQUNmLGVBQWUsQ0FDWCxDQUFDLE9BQU87Ozt3QkFJaEIsS0FBSyxlQUFlO3dCQUNwQixXQUFXLEdBQUcsS0FBSyxNQUFNLFNBQVM7O3dCQUVsQyxPQUFPLFNBQVMsUUFBUSxRQUFROzs7O2dCQUl4QyxHQUFHLHFEQUFxRCxZQUFXO29CQUMvRCxJQUFJO3dCQUFJO3dCQUNKLFNBQVM7d0JBQ1QsZ0JBQWdCOztvQkFFcEIsT0FBTyxvQkFBb0I7O29CQUUzQixNQUFNLFFBQVEsVUFBUyxNQUFNOzt3QkFFekIsSUFBSSxTQUFTLFNBQVMsYUFBYTs0QkFDL0IsT0FBTyxNQUFNOytCQUNWOzRCQUNILE9BQU8sTUFBTTs7O3dCQUdqQixPQUFPLFdBQVcsSUFBSSxTQUFTOzRCQUMzQixRQUFROzRCQUNSLE1BQU07NEJBQ04sZUFBZTs0QkFDZixlQUFlLENBQ1gsQ0FBQyxPQUFPOzs7d0JBSWhCLEtBQUssZUFBZTt3QkFDcEIsV0FBVyxHQUFHLEtBQUssTUFBTSxTQUFTOzt3QkFFbEMsT0FBTyxTQUFTLFFBQVEsUUFBUTt3QkFDaEMsT0FBTyxTQUFTLE9BQU8sUUFBUSxRQUMzQixTQUFTLDRCQUE0QixPQUFPOzs7Ozs7R0FJekQiLCJmaWxlIjoiY29tbW9uL2Zvcm0vRm9ybUl0ZW1EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIHNwRm9ybUl0ZW0gZGlyZWN0aXZlLlxuICovXG5kZXNjcmliZSgnRm9ybUl0ZW1EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9ybVRlbXBsYXRlU2VydmljZSxcbiAgICAgICAgJHNjb3BlLFxuICAgICAgICAkY29tcGlsZSxcbiAgICAgICAgRm9ybUl0ZW0sXG4gICAgICAgIHR5cGVzLFxuICAgICAgICBlbGVtZW50SHRtbCA9ICc8c3AtZm9ybS1pdGVtIHNwLWZvcm0taXRlbT1cImZvcm1JdGVtXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgJyBzcC1mb3JtLWl0ZW0tc2hvdy1wcmV2aW91cy12YWx1ZT1cInNob3dQcmV2aW91c1ZhbHVlXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgJyBuZy1tb2RlbD1cInZhbFwiIC8+JyxcbiAgICAgICAgbWVzc2FnZXMgPSB7XG4gICAgICAgICAgICAndWlfZm9ybV9wcmV2aW91c192YWx1ZSc6ICdQcmV2aW91cyBWYWx1ZSdcbiAgICAgICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVFbGVtZW50KGh0bWwpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoaHRtbCk7XG5cbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgX2Zvcm1UZW1wbGF0ZVNlcnZpY2VfLCBfRm9ybUl0ZW1fLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIEZvcm1JdGVtID0gX0Zvcm1JdGVtXztcbiAgICAgICAgZm9ybVRlbXBsYXRlU2VydmljZSA9IF9mb3JtVGVtcGxhdGVTZXJ2aWNlXztcblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKG1lc3NhZ2VzKTtcblxuICAgICAgICB0eXBlcyA9IFtGb3JtSXRlbS5UWVBFX01VTFRJX1NVR0dFU1QsIEZvcm1JdGVtLlRZUEVfVEVYVCwgRm9ybUl0ZW0uVFlQRV9URVhUQVJFQSxcbiAgICAgICAgICAgICAgICAgRm9ybUl0ZW0uVFlQRV9OVU1CRVIsIEZvcm1JdGVtLlRZUEVfQ0hFQ0tCT1gsIEZvcm1JdGVtLlRZUEVfU0VDUkVULCBGb3JtSXRlbS5UWVBFX1JBRElPLFxuICAgICAgICAgICAgICAgICBGb3JtSXRlbS5UWVBFX1NVR0dFU1QsIEZvcm1JdGVtLlRZUEVfU0VMRUNULCBGb3JtSXRlbS5UWVBFX0RBVEUsIEZvcm1JdGVtLk1VTFRJX1RFWFRdO1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBvdXQgdG8gZm9ybVRlbXBsYXRlU2VydmljZSB0byBnZXQgdGhlIHRlbXBsYXRlIGh0bWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVFxuICAgICAgICB9KTtcblxuICAgICAgICBzcHlPbihmb3JtVGVtcGxhdGVTZXJ2aWNlLCAnZ2V0Rm9ybUl0ZW1UZW1wbGF0ZScpO1xuXG4gICAgICAgIGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcblxuICAgICAgICBleHBlY3QoZm9ybVRlbXBsYXRlU2VydmljZS5nZXRGb3JtSXRlbVRlbXBsYXRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgaGVscCB0ZXh0IGlmIG5vbmUgY29uZmlndXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgJHNjb3BlLmZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVFxuICAgICAgICB9KTtcblxuICAgICAgICBlbCA9IGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcblxuICAgICAgICBleHBlY3QoZWwuZmluZCgnLmhlbHAtYmxvY2snKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgYSBzcGFuIG9uIHJlcXVpcmVkIGNoZWNrYm94IGlmIGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsLCBub3RSZXF1aXJlZFNwYW47XG5cbiAgICAgICAgJHNjb3BlLmZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfQ0hFQ0tCT1gsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBlbCA9IGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcbiAgICAgICAgbm90UmVxdWlyZWRTcGFuID0gZWwuZmluZCgnbGFiZWwnKS5maW5kKCcudGV4dC1kYW5nZXInKTtcblxuICAgICAgICBleHBlY3Qobm90UmVxdWlyZWRTcGFuLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KG5vdFJlcXVpcmVkU3Bhbi50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIGhlbHAgdGV4dCBpZiBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCwgaGVscEJsb2NrO1xuXG4gICAgICAgICRzY29wZS5mb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICBoZWxwVGV4dDogJ1NvbWUgaGVscCB0ZXh0J1xuICAgICAgICB9KTtcblxuICAgICAgICBlbCA9IGNvbXBpbGVFbGVtZW50KGVsZW1lbnRIdG1sKTtcbiAgICAgICAgaGVscEJsb2NrID0gZWwuZmluZCgnLmhlbHAtYmxvY2snKTtcblxuICAgICAgICBleHBlY3QoaGVscEJsb2NrLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGhlbHBCbG9jay50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCRzY29wZS5mb3JtSXRlbS5oZWxwVGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBhIGhlaWdodCBvbiBhIHRleHRhcmVhIGlmIGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsO1xuXG4gICAgICAgICRzY29wZS5mb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFRBUkVBLFxuICAgICAgICAgICAgaGVpZ2h0OiAzMDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWwgPSBjb21waWxlRWxlbWVudChlbGVtZW50SHRtbCk7XG5cbiAgICAgICAgZXhwZWN0KGVsLmZpbmQoJ3RleHRhcmVhJykuY3NzKCdoZWlnaHQnKSkudG9FcXVhbCgnMzAwcHgnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHJlbmRlciBhIHByZXZpb3VzIHZhbHVlIGlmIGZvcm0gbm90IGNvbmZpZ3VyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsLCBwcmV2aW91cyxcbiAgICAgICAgICAgIGl0ZW1JZCA9ICdmb3JtSXRlbUlkJyxcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUgPSAnc29tZSB2YWx1ZSc7XG5cbiAgICAgICAgJHNjb3BlLnNob3dQcmV2aW91c1ZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAvLyBuZ01vZGVsIGV4cGVjdHMgYSBudW1iZXIgaGVyZVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IEZvcm1JdGVtLlRZUEVfTlVNQkVSKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS52YWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5mb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgaXRlbUlkOiBpdGVtSWQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgICAgICAgIGFsbG93ZWRWYWx1ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydvbmUnLCAnb25lJ11cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZWwgPSBjb21waWxlRWxlbWVudChlbGVtZW50SHRtbCk7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGVsLmZpbmQoJyMnICsgaXRlbUlkICsgJy1wcmV2aW91cycpO1xuXG4gICAgICAgICAgICBleHBlY3QocHJldmlvdXMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIGEgcHJldmlvdXMgdmFsdWUgaWYgZm9ybSBjb25maWd1cmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCwgcHJldmlvdXMsXG4gICAgICAgICAgICBpdGVtSWQgPSAnZm9ybUl0ZW1JZCcsXG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlID0gJ3NvbWUgdmFsdWUnO1xuXG4gICAgICAgICRzY29wZS5zaG93UHJldmlvdXNWYWx1ZSA9IHRydWU7XG5cbiAgICAgICAgdHlwZXMuZm9yRWFjaChmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAvLyBuZ01vZGVsIGV4cGVjdHMgYSBudW1iZXIgaGVyZVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IEZvcm1JdGVtLlRZUEVfTlVNQkVSKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS52YWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS5mb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgaXRlbUlkOiBpdGVtSWQsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgICAgICAgIGFsbG93ZWRWYWx1ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydvbmUnLCAnb25lJ11cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZWwgPSBjb21waWxlRWxlbWVudChlbGVtZW50SHRtbCk7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGVsLmZpbmQoJyMnICsgaXRlbUlkICsgJy1wcmV2aW91cycpO1xuXG4gICAgICAgICAgICBleHBlY3QocHJldmlvdXMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHByZXZpb3VzLnRleHQoKS50cmltKCkpLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNbJ3VpX2Zvcm1fcHJldmlvdXNfdmFsdWUnXSArICc6ICcgKyBwcmV2aW91c1ZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
