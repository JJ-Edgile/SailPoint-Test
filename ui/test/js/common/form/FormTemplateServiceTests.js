System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Tests for the FormTemplateService.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormTemplateService', function () {
                var formTemplateService, Form, FormItem;

                beforeEach(module(formModule));

                beforeEach(inject(function (_formTemplateService_, _FormItem_, _Form_) {
                    formTemplateService = _formTemplateService_;
                    FormItem = _FormItem_;
                    Form = _Form_;
                }));

                describe('getFilterTemplate', function () {

                    function testTemplate(formItem, tokens) {
                        var template = formTemplateService.getFormItemTemplate(formItem);

                        expect(template).toBeTruthy();

                        tokens.forEach(function (token) {
                            expect(template.indexOf(token)).toBeGreaterThan(-1);
                        });
                    }

                    it('should render a section with title and subittle', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_SECTION,
                            title: 'My Section',
                            subtitle: 'My section subtitle'
                        });

                        testTemplate(formItem, ['<h4', '<p']);
                    });

                    it('should render a text field', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_TEXT
                        });

                        testTemplate(formItem, ['type="text"']);
                    });

                    it('should render a textarea field', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_TEXTAREA
                        });

                        testTemplate(formItem, ['<textarea']);
                    });

                    it('should render a number field', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_NUMBER
                        });

                        testTemplate(formItem, ['<input type="number"']);
                    });

                    it('should render a checkbox', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_CHECKBOX
                        });

                        testTemplate(formItem, ['<input type="checkbox"']);
                    });

                    it('should render a date', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_DATE
                        });

                        testTemplate(formItem, ['<input sp-datepicker']);
                    });

                    it('should render a secret field', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_SECRET
                        });

                        testTemplate(formItem, ['<input type="password"']);
                    });

                    it('should render a radio group', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_RADIO
                        });

                        testTemplate(formItem, ['<input type="radio"']);
                    });

                    it('should render a dropdown', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_SELECT
                        });

                        testTemplate(formItem, ['<select']);
                    });

                    it('should render a data table section item', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_DATATABLEITEM
                        });

                        testTemplate(formItem, ['<p ng-bind-html="spFormItem.value">']);
                    });

                    it('should render a label item', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_LABEL,
                            fieldLabel: 'label'
                        });

                        testTemplate(formItem, ['<div class="form-group">  {{ spFormItem.fieldLabel }}</div>']);
                    });

                    it('should render a multi text item', function () {
                        var formItem = new FormItem({
                            type: FormItem.MULTI_TEXT,
                            fieldLabel: 'label'
                        });

                        testTemplate(formItem, ['<sp-multi-text']);
                    });

                    it('should return an empty template if the field is hidden', function () {
                        var formItem = new FormItem({
                            hidden: true
                        });

                        expect(formTemplateService.getFormItemTemplate(formItem)).toEqual('');
                    });

                    it('should throw when form item has unknown type', function () {
                        var formItem = new FormItem({
                            type: 'unknowntype'
                        });

                        expect(function () {
                            formTemplateService.getFormItemTemplate(formItem);
                        }).toThrow();
                    });

                    it('should use correct column classes for one column layout', function () {
                        var formItem,
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                columns: 1,
                                items: [{
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 1
                                }]
                            }]
                        });

                        formItem = form.items[0].rows[0][0];

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should use correct column classes for two column layout', function () {
                        var formItem,
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                columns: 2,
                                items: [{
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 1
                                }, {
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 2
                                }]
                            }]
                        });

                        formItem = form.items[0].rows[0][0];

                        testTemplate(formItem, ['col-md-6']);

                        formItem = form.items[0].rows[1][0];

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should use correct column classes for three column layout', function () {
                        var formItem,
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                columns: 3,
                                items: [{
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 1
                                }, {
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 2
                                }, {
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 3
                                }]
                            }]
                        });

                        formItem = form.items[0].rows[0][0];

                        testTemplate(formItem, ['col-md-4']);

                        formItem = form.items[0].rows[0][1];

                        testTemplate(formItem, ['col-md-8']);

                        formItem = form.items[0].rows[1][0];

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should use correct column classes for four column layout', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_TEXT,
                            columnSpan: 1
                        });

                        testTemplate(formItem, ['col-md-3']);

                        formItem = new FormItem({
                            type: FormItem.TYPE_TEXT,
                            columnSpan: 2
                        });

                        testTemplate(formItem, ['col-md-6']);

                        formItem = new FormItem({
                            type: FormItem.TYPE_TEXT,
                            columnSpan: 3
                        });

                        testTemplate(formItem, ['col-md-9']);

                        formItem = new FormItem({
                            type: FormItem.TYPE_TEXT,
                            columnSpan: 4
                        });

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should attempt to fix an incorrect column configuration', function () {
                        var formItem,
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                columns: 5,
                                items: [{
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 4
                                }]
                            }]
                        });

                        formItem = form.items[0].rows[0][0];

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should attempt to fix an incorrect columnSpan configuration', function () {
                        var formItem,
                            form = new Form({
                            items: [{
                                type: FormItem.TYPE_SECTION,
                                columns: 4,
                                items: [{
                                    type: FormItem.TYPE_TEXT,
                                    columnSpan: 5
                                }]
                            }]
                        });

                        formItem = form.items[0].rows[0][0];

                        testTemplate(formItem, ['col-md-12']);
                    });

                    it('should pass the suggest service if suggest is dynamic', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_SUGGEST,
                            dynamic: true
                        });

                        testTemplate(formItem, ['sp-object-suggest-search-service']);
                    });

                    it('should pass the suggest service if the multisuggest is dynamic', function () {
                        var formItem = new FormItem({
                            type: FormItem.TYPE_MULTI_SUGGEST,
                            dynamic: true
                        });

                        testTemplate(formItem, ['sp-object-multi-suggest-search-service']);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1UZW1wbGF0ZVNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFBMUY7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZO1lBSjdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQUkscUJBQ0EsTUFDQTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsdUJBQXVCLFlBQVksUUFBUTtvQkFDbEUsc0JBQXNCO29CQUN0QixXQUFXO29CQUNYLE9BQU87OztnQkFHWCxTQUFTLHFCQUFxQixZQUFXOztvQkFFckMsU0FBUyxhQUFhLFVBQVUsUUFBUTt3QkFDcEMsSUFBSSxXQUFXLG9CQUFvQixvQkFBb0I7O3dCQUV2RCxPQUFPLFVBQVU7O3dCQUVqQixPQUFPLFFBQVEsVUFBUyxPQUFPOzRCQUMzQixPQUFPLFNBQVMsUUFBUSxRQUFRLGdCQUFnQixDQUFDOzs7O29CQUl6RCxHQUFHLG1EQUFtRCxZQUFXO3dCQUM3RCxJQUFJLFdBQVcsSUFBSSxTQUFTOzRCQUN4QixNQUFNLFNBQVM7NEJBQ2YsT0FBTzs0QkFDUCxVQUFVOzs7d0JBR2QsYUFBYSxVQUFVLENBQUMsT0FBTzs7O29CQUduQyxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJLFdBQVcsSUFBSSxTQUFTOzRCQUN4QixNQUFNLFNBQVM7Ozt3QkFHbkIsYUFBYSxVQUFVLENBQUM7OztvQkFHNUIsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsSUFBSSxXQUFXLElBQUksU0FBUzs0QkFDeEIsTUFBTSxTQUFTOzs7d0JBR25CLGFBQWEsVUFBVSxDQUFDOzs7b0JBRzVCLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLElBQUks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Ozs7b0JBRzVCLEdBQUcseURBQXlELFlBQVc7d0JBQ25FLElBQUksV0FBVyxJQUFJLFNBQVM7NEJBQ3hCLE1BQU0sU0FBUzs0QkFDZixTQUFTOzs7d0JBR2IsYUFBYSxVQUFVLENBQUM7OztvQkFHNUIsR0FBRyxrRUFBa0UsWUFBVzt3QkFDNUUsSUFBSSxXQUFXLElBQUksU0FBUzs0QkFDeEIsTUFBTSxTQUFTOzRCQUNmLFNBQVM7Ozt3QkFHYixhQUFhLFVBQVUsQ0FBQzs7Ozs7O0dBV2pDIiwiZmlsZSI6ImNvbW1vbi9mb3JtL0Zvcm1UZW1wbGF0ZVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEZvcm1UZW1wbGF0ZVNlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdGb3JtVGVtcGxhdGVTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZvcm1UZW1wbGF0ZVNlcnZpY2UsXG4gICAgICAgIEZvcm0sXG4gICAgICAgIEZvcm1JdGVtO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZm9ybU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2Zvcm1UZW1wbGF0ZVNlcnZpY2VfLCBfRm9ybUl0ZW1fLCBfRm9ybV8pIHtcbiAgICAgICAgZm9ybVRlbXBsYXRlU2VydmljZSA9IF9mb3JtVGVtcGxhdGVTZXJ2aWNlXztcbiAgICAgICAgRm9ybUl0ZW0gPSBfRm9ybUl0ZW1fO1xuICAgICAgICBGb3JtID0gX0Zvcm1fO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdnZXRGaWx0ZXJUZW1wbGF0ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgdG9rZW5zKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBmb3JtVGVtcGxhdGVTZXJ2aWNlLmdldEZvcm1JdGVtVGVtcGxhdGUoZm9ybUl0ZW0pO1xuXG4gICAgICAgICAgICBleHBlY3QodGVtcGxhdGUpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICAgICAgdG9rZW5zLmZvckVhY2goZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICBleHBlY3QodGVtcGxhdGUuaW5kZXhPZih0b2tlbikpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGEgc2VjdGlvbiB3aXRoIHRpdGxlIGFuZCBzdWJpdHRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NFQ1RJT04sXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNeSBTZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogJ015IHNlY3Rpb24gc3VidGl0bGUnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJzxoNCcsICc8cCddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgYSB0ZXh0IGZpZWxkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWyd0eXBlPVwidGV4dFwiJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIHRleHRhcmVhIGZpZWxkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVEFSRUFcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnPHRleHRhcmVhJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIG51bWJlciBmaWVsZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX05VTUJFUlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWyc8aW5wdXQgdHlwZT1cIm51bWJlclwiJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIGNoZWNrYm94JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfQ0hFQ0tCT1hcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9EQVRFXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJzxpbnB1dCBzcC1kYXRlcGlja2VyJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIHNlY3JldCBmaWVsZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NFQ1JFVFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWyc8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCInXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGEgcmFkaW8gZ3JvdXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9SQURJT1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWyc8aW5wdXQgdHlwZT1cInJhZGlvXCInXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIGEgZHJvcGRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9TRUxFQ1RcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnPHNlbGVjdCddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgYSBkYXRhIHRhYmxlIHNlY3Rpb24gaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX0RBVEFUQUJMRUlURU1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnPHAgbmctYmluZC1odG1sPVwic3BGb3JtSXRlbS52YWx1ZVwiPiddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgYSBsYWJlbCBpdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfTEFCRUwsXG4gICAgICAgICAgICAgICAgZmllbGRMYWJlbDogJ2xhYmVsJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWyc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPiAge3sgc3BGb3JtSXRlbS5maWVsZExhYmVsIH19PC9kaXY+J10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBhIG11bHRpIHRleHQgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5NVUxUSV9URVhULFxuICAgICAgICAgICAgICAgIGZpZWxkTGFiZWw6ICdsYWJlbCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnPHNwLW11bHRpLXRleHQnXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGVtcHR5IHRlbXBsYXRlIGlmIHRoZSBmaWVsZCBpcyBoaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGZvcm1UZW1wbGF0ZVNlcnZpY2UuZ2V0Rm9ybUl0ZW1UZW1wbGF0ZShmb3JtSXRlbSkpLnRvRXF1YWwoJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdoZW4gZm9ybSBpdGVtIGhhcyB1bmtub3duIHR5cGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Vua25vd250eXBlJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZm9ybVRlbXBsYXRlU2VydmljZS5nZXRGb3JtSXRlbVRlbXBsYXRlKGZvcm1JdGVtKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVzZSBjb3JyZWN0IGNvbHVtbiBjbGFzc2VzIGZvciBvbmUgY29sdW1uIGxheW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtLFxuICAgICAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfU0VDVElPTixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogMSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5TcGFuOiAxXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JtSXRlbSA9IGZvcm0uaXRlbXNbMF0ucm93c1swXVswXTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJ2NvbC1tZC0xMiddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1c2UgY29ycmVjdCBjb2x1bW4gY2xhc3NlcyBmb3IgdHdvIGNvbHVtbiBsYXlvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSxcbiAgICAgICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NFQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IDIsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9URVhULFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uU3BhbjogMVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5TcGFuOiAyXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JtSXRlbSA9IGZvcm0uaXRlbXNbMF0ucm93c1swXVswXTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJ2NvbC1tZC02J10pO1xuXG4gICAgICAgICAgICBmb3JtSXRlbSA9IGZvcm0uaXRlbXNbMF0ucm93c1sxXVswXTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJ2NvbC1tZC0xMiddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1c2UgY29ycmVjdCBjb2x1bW4gY2xhc3NlcyBmb3IgdGhyZWUgY29sdW1uIGxheW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtLFxuICAgICAgICAgICAgICAgIGZvcm0gPSBuZXcgRm9ybSh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfU0VDVElPTixcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogMyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5TcGFuOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtblNwYW46IDJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9URVhULFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uU3BhbjogM1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9ybUl0ZW0gPSBmb3JtLml0ZW1zWzBdLnJvd3NbMF1bMF07XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtNCddKTtcblxuICAgICAgICAgICAgZm9ybUl0ZW0gPSBmb3JtLml0ZW1zWzBdLnJvd3NbMF1bMV07XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtOCddKTtcblxuICAgICAgICAgICAgZm9ybUl0ZW0gPSBmb3JtLml0ZW1zWzBdLnJvd3NbMV1bMF07XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtMTInXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdXNlIGNvcnJlY3QgY29sdW1uIGNsYXNzZXMgZm9yIGZvdXIgY29sdW1uIGxheW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgY29sdW1uU3BhbjogMVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtMyddKTtcblxuICAgICAgICAgICAgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfVEVYVCxcbiAgICAgICAgICAgICAgICBjb2x1bW5TcGFuOiAyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJ2NvbC1tZC02J10pO1xuXG4gICAgICAgICAgICBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbSh7XG4gICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9URVhULFxuICAgICAgICAgICAgICAgIGNvbHVtblNwYW46IDNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnY29sLW1kLTknXSk7XG5cbiAgICAgICAgICAgIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgY29sdW1uU3BhbjogNFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtMTInXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYXR0ZW1wdCB0byBmaXggYW4gaW5jb3JyZWN0IGNvbHVtbiBjb25maWd1cmF0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0sXG4gICAgICAgICAgICAgICAgZm9ybSA9IG5ldyBGb3JtKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NFQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRm9ybUl0ZW0uVFlQRV9URVhULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtblNwYW46IDRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvcm1JdGVtID0gZm9ybS5pdGVtc1swXS5yb3dzWzBdWzBdO1xuXG4gICAgICAgICAgICB0ZXN0VGVtcGxhdGUoZm9ybUl0ZW0sIFsnY29sLW1kLTEyJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGF0dGVtcHQgdG8gZml4IGFuIGluY29ycmVjdCBjb2x1bW5TcGFuIGNvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBmb3JtSXRlbSxcbiAgICAgICAgICAgICAgICBmb3JtID0gbmV3IEZvcm0oe1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfU0VDVElPTixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uU3BhbjogNVxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9ybUl0ZW0gPSBmb3JtLml0ZW1zWzBdLnJvd3NbMF1bMF07XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydjb2wtbWQtMTInXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcGFzcyB0aGUgc3VnZ2VzdCBzZXJ2aWNlIGlmIHN1Z2dlc3QgaXMgZHluYW1pYycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gbmV3IEZvcm1JdGVtKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBGb3JtSXRlbS5UWVBFX1NVR0dFU1QsXG4gICAgICAgICAgICAgICAgZHluYW1pYzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRlc3RUZW1wbGF0ZShmb3JtSXRlbSwgWydzcC1vYmplY3Qtc3VnZ2VzdC1zZWFyY2gtc2VydmljZSddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBwYXNzIHRoZSBzdWdnZXN0IHNlcnZpY2UgaWYgdGhlIG11bHRpc3VnZ2VzdCBpcyBkeW5hbWljJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUl0ZW0gPSBuZXcgRm9ybUl0ZW0oe1xuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1JdGVtLlRZUEVfTVVMVElfU1VHR0VTVCxcbiAgICAgICAgICAgICAgICBkeW5hbWljOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGVzdFRlbXBsYXRlKGZvcm1JdGVtLCBbJ3NwLW9iamVjdC1tdWx0aS1zdWdnZXN0LXNlYXJjaC1zZXJ2aWNlJ10pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
