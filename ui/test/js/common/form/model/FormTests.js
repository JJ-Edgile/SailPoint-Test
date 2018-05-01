System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Unit tests for the Form Model.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('Form', function () {
                var Form,
                    FormButton,
                    FormItem,
                    testForm,
                    fieldName = 'cantTouchThis',
                    testFormData = {
                    'buttons': [{
                        'action': 'next',
                        'actionParameter': null,
                        'actionParameterValue': null,
                        'skipValidation': false,
                        'text': 'Submit'
                    }, {
                        'action': 'cancel',
                        'actionParameter': null,
                        'actionParameterValue': null,
                        'skipValidation': false,
                        'text': 'Cancel'
                    }],
                    'id': '1ba3102cb21d4f358fc349134b4d4f9e',
                    'items': [{
                        'title': 'Data Table',
                        'items': [{
                            type: 'textfield',
                            name: fieldName
                        }],
                        'type': 'fieldset',
                        'subtitle': 'Data Table Subtitle',
                        'columns': 0
                    }],
                    'name': 'Kitchen Sink Form',
                    'readOnly': false,
                    'subtitle': 'Kitchen Sink Subtitle',
                    'title': 'Kitchen Sink Form',
                    'wizard': false,
                    'formBeanClass': 'classname',
                    'formBeanState': null,
                    'currentFieldName': fieldName
                };

                //use the form module
                beforeEach(module(formModule));

                /**
                 * Setup the Form class and create a test object
                 */
                beforeEach(inject(function (_Form_, _FormButton_, _FormItem_) {
                    Form = _Form_;
                    FormButton = _FormButton_;
                    FormItem = _FormItem_;
                    testForm = new Form(testFormData);
                }));

                function verifyForm(form) {
                    expect(form.getId()).toBe(testFormData.id);
                    expect(form.isReadOnly()).toBe(testFormData.readOnly);
                    expect(form.getSubtitle()).toBe(testFormData.subtitle);
                    expect(form.getTitle()).toBe(testFormData.title);
                    expect(form.getWorkItemId()).toBe(testFormData.workItemId);
                    expect(form.isWizard()).toBe(testFormData.wizard);

                    // make sure arrays have correct type
                    expect(form.getButtons()[0] instanceof FormButton).toBeTruthy();
                    expect(form.getButtons().length).toBe(2);
                    expect(form.getItems()[0] instanceof FormItem).toBeTruthy();
                    expect(form.getItems().length).toBe(1);
                    expect(form.getItems()[0].getRows().length).toBe(1);
                    expect(form.getFormBeanClass()).toEqual(testFormData.formBeanClass);
                    expect(form.getFormBeanState()).toEqual(testFormData.formBeanState);
                }

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new Form(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new Form('fibbonaci');
                    }).toThrow();
                    expect(function () {
                        new Form(function () {
                            return '1 1 2 3 5 8';
                        });
                    }).toThrow();
                });

                it('instantiates correctly with data', function () {
                    verifyForm(testForm);
                });

                it('instantiates correctly with data that is read only', function () {
                    var readOnlyTestForm;
                    testFormData.readOnly = true;
                    readOnlyTestForm = new Form(testFormData);
                    verifyForm(readOnlyTestForm);
                    expect(readOnlyTestForm.getItems()[0].isDisabled()).toBeTruthy();
                    //data should be unaltered
                    expect(testFormData.items[0].disabled).toBeFalsy();
                    // return state
                    testFormData.readOnly = false;
                });

                it('updates the current field correctly', function () {
                    var testForm = new Form(testFormData);
                    //should allow server to push default field
                    expect(testForm.getCurrentFieldName()).toBe(fieldName);
                    testForm.setCurrentFieldName(undefined);
                    //shouldn't change data
                    expect(testFormData.currentFieldName).toBe(fieldName);
                    expect(testForm.getCurrentFieldName()).toBeUndefined();
                    testForm.setCurrentFieldName(fieldName);
                    expect(testForm.getCurrentFieldName()).toBe(fieldName);
                });
                describe('getFlattenedItems', function () {
                    it('returns only non-section items', function () {
                        var testForm = new Form(testFormData),
                            flatItems = testForm.getFlattenedItems();
                        expect(flatItems.length).toBe(1);
                        expect(flatItems[0].name).toBe(fieldName);
                    });
                });

                it('should correctly calculate the column span for fields', function () {
                    var testForm = new Form({
                        id: '1',
                        items: [{
                            columns: 0,
                            type: 'fieldset',
                            items: [{
                                name: 'section1field',
                                type: 'textfield',
                                columnSpan: 1
                            }]
                        }, {
                            columns: 4,
                            type: 'fieldset',
                            items: [{
                                name: 'section2field',
                                type: 'textfield'
                            }, {
                                name: 'section2field2',
                                type: 'textfield',
                                columnSpan: 2
                            }]
                        }, {
                            type: 'fieldset',
                            items: [{
                                name: 'section3field',
                                type: 'textfield'

                            }]
                        }]
                    });

                    // first section
                    expect(testForm.getItems()[0].getItems()[0].columnSpan).toEqual(4);

                    // second section
                    expect(testForm.getItems()[1].getItems()[0].columnSpan).toEqual(1);
                    expect(testForm.getItems()[1].getItems()[1].columnSpan).toEqual(2);

                    // third section
                    expect(testForm.getItems()[2].getItems()[0].columnSpan).toEqual(4);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL21vZGVsL0Zvcm1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFLdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsUUFBUSxZQUFXO2dCQUN4QixJQUFJO29CQUFNO29CQUFZO29CQUFVO29CQUM1QixZQUFZO29CQUNaLGVBQWU7b0JBQ1gsV0FBVyxDQUFDO3dCQUNSLFVBQVU7d0JBQ1YsbUJBQW1CO3dCQUNuQix3QkFBd0I7d0JBQ3hCLGtCQUFrQjt3QkFDbEIsUUFBUTt1QkFDVjt3QkFDRSxVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QixrQkFBa0I7d0JBQ2xCLFFBQVE7O29CQUVaLE1BQU07b0JBQ04sU0FBUyxDQUFDO3dCQUNOLFNBQVM7d0JBQ1QsU0FBUyxDQUFDOzRCQUNOLE1BQU07NEJBQ04sTUFBTTs7d0JBRVYsUUFBUTt3QkFDUixZQUFZO3dCQUNaLFdBQVc7O29CQUVmLFFBQVE7b0JBQ1IsWUFBWTtvQkFDWixZQUFZO29CQUNaLFNBQVM7b0JBQ1QsVUFBVTtvQkFDVixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsb0JBQW9COzs7O2dCQUk1QixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxRQUFRLGNBQWMsWUFBWTtvQkFDekQsT0FBTztvQkFDUCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsV0FBVyxJQUFJLEtBQUs7OztnQkFHeEIsU0FBUyxXQUFXLE1BQU07b0JBQ3RCLE9BQU8sS0FBSyxTQUFTLEtBQUssYUFBYTtvQkFDdkMsT0FBTyxLQUFLLGNBQWMsS0FBSyxhQUFhO29CQUM1QyxPQUFPLEtBQUssZUFBZSxLQUFLLGFBQWE7b0JBQzdDLE9BQU8sS0FBSyxZQUFZLEtBQUssYUFBYTtvQkFDMUMsT0FBTyxLQUFLLGlCQUFpQixLQUFLLGFBQWE7b0JBQy9DLE9BQU8sS0FBSyxZQUFZLEtBQUssYUFBYTs7O29CQUcxQyxPQUFPLEtBQUssYUFBYSxjQUFjLFlBQVk7b0JBQ25ELE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSztvQkFDdEMsT0FBTyxLQUFLLFdBQVcsY0FBYyxVQUFVO29CQUMvQyxPQUFPLEtBQUssV0FBVyxRQUFRLEtBQUs7b0JBQ3BDLE9BQU8sS0FBSyxXQUFXLEdBQUcsVUFBVSxRQUFRLEtBQUs7b0JBQ2pELE9BQU8sS0FBSyxvQkFBb0IsUUFBUSxhQUFhO29CQUNyRCxPQUFPLEtBQUssb0JBQW9CLFFBQVEsYUFBYTs7O2dCQUd6RCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxLQUFLO3VCQUFVOzs7Z0JBRzNDLEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLEtBQUs7dUJBQWlCO29CQUM5QyxPQUFPLFlBQVc7d0JBQUUsSUFBSSxLQUFLLFlBQVc7NEJBQUUsT0FBTzs7dUJBQXNCOzs7Z0JBRzNFLEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLFdBQVc7OztnQkFHZixHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxJQUFJO29CQUNKLGFBQWEsV0FBVztvQkFDeEIsbUJBQW1CLElBQUksS0FBSztvQkFDNUIsV0FBVztvQkFDWCxPQUFPLGlCQUFpQixXQUFXLEdBQUcsY0FBYzs7b0JBRXBELE9BQU8sYUFBYSxNQUFNLEdBQUcsVUFBVTs7b0JBRXZDLGFBQWEsV0FBVzs7O2dCQUc1QixHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxJQUFJLFdBQVcsSUFBSSxLQUFLOztvQkFFeEIsT0FBTyxTQUFTLHVCQUF1QixLQUFLO29CQUM1QyxTQUFTLG9CQUFvQjs7b0JBRTdCLE9BQU8sYUFBYSxrQkFBa0IsS0FBSztvQkFDM0MsT0FBTyxTQUFTLHVCQUF1QjtvQkFDdkMsU0FBUyxvQkFBb0I7b0JBQzdCLE9BQU8sU0FBUyx1QkFBdUIsS0FBSzs7Z0JBRWhELFNBQVMscUJBQXFCLFlBQVc7b0JBQ3JDLEdBQUcsa0NBQWtDLFlBQVc7d0JBQzVDLElBQUksV0FBVyxJQUFJLEtBQUs7NEJBQ3BCLFlBQVksU0FBUzt3QkFDekIsT0FBTyxVQUFVLFFBQVEsS0FBSzt3QkFDOUIsT0FBTyxVQUFVLEdBQUcsTUFBTSxLQUFLOzs7O2dCQUl2QyxHQUFHLHlEQUF5RCxZQUFXO29CQUNuRSxJQUFJLFdBQVcsSUFBSSxLQUFLO3dCQUNwQixJQUFJO3dCQUNKLE9BQU8sQ0FBQzs0QkFDSixTQUFTOzRCQUNULE1BQU07NEJBQ04sT0FBTyxDQUFDO2dDQUNKLE1BQU07Z0NBQ04sTUFBTTtnQ0FDTixZQUFZOzsyQkFFakI7NEJBQ0MsU0FBUzs0QkFDVCxNQUFNOzRCQUNOLE9BQU8sQ0FBQztnQ0FDSixNQUFNO2dDQUNOLE1BQU07K0JBQ1A7Z0NBQ0MsTUFBTTtnQ0FDTixNQUFNO2dDQUNOLFlBQVk7OzJCQUVqQjs0QkFDQyxNQUFNOzRCQUNOLE9BQU8sQ0FBQztnQ0FDSixNQUFNO2dDQUNOLE1BQU07Ozs7Ozs7b0JBT2xCLE9BQU8sU0FBUyxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVksUUFBUTs7O29CQUdoRSxPQUFPLFNBQVMsV0FBVyxHQUFHLFdBQVcsR0FBRyxZQUFZLFFBQVE7b0JBQ2hFLE9BQU8sU0FBUyxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVksUUFBUTs7O29CQUdoRSxPQUFPLFNBQVMsV0FBVyxHQUFHLFdBQVcsR0FBRyxZQUFZLFFBQVE7Ozs7O0dBdUJyRSIsImZpbGUiOiJjb21tb24vZm9ybS9tb2RlbC9Gb3JtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBmb3JtTW9kdWxlIGZyb20gJ2NvbW1vbi9mb3JtL0Zvcm1Nb2R1bGUnO1xuXG4vKipcbiAqIFVuaXQgdGVzdHMgZm9yIHRoZSBGb3JtIE1vZGVsLlxuICovXG5kZXNjcmliZSgnRm9ybScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBGb3JtLCBGb3JtQnV0dG9uLCBGb3JtSXRlbSwgdGVzdEZvcm0sXG4gICAgICAgIGZpZWxkTmFtZSA9ICdjYW50VG91Y2hUaGlzJyxcbiAgICAgICAgdGVzdEZvcm1EYXRhID0ge1xuICAgICAgICAgICAgJ2J1dHRvbnMnOiBbe1xuICAgICAgICAgICAgICAgICdhY3Rpb24nOiAnbmV4dCcsXG4gICAgICAgICAgICAgICAgJ2FjdGlvblBhcmFtZXRlcic6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2FjdGlvblBhcmFtZXRlclZhbHVlJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnc2tpcFZhbGlkYXRpb24nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGV4dCc6ICdTdWJtaXQnXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgJ2FjdGlvblBhcmFtZXRlcic6IG51bGwsXG4gICAgICAgICAgICAgICAgJ2FjdGlvblBhcmFtZXRlclZhbHVlJzogbnVsbCxcbiAgICAgICAgICAgICAgICAnc2tpcFZhbGlkYXRpb24nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAndGV4dCc6ICdDYW5jZWwnXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICdpZCc6ICcxYmEzMTAyY2IyMWQ0ZjM1OGZjMzQ5MTM0YjRkNGY5ZScsXG4gICAgICAgICAgICAnaXRlbXMnOiBbe1xuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdEYXRhIFRhYmxlJyxcbiAgICAgICAgICAgICAgICAnaXRlbXMnOiBbe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dGZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmllbGROYW1lXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICd0eXBlJzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICAnc3VidGl0bGUnOiAnRGF0YSBUYWJsZSBTdWJ0aXRsZScsXG4gICAgICAgICAgICAgICAgJ2NvbHVtbnMnOiAwXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICduYW1lJzogJ0tpdGNoZW4gU2luayBGb3JtJyxcbiAgICAgICAgICAgICdyZWFkT25seSc6IGZhbHNlLFxuICAgICAgICAgICAgJ3N1YnRpdGxlJzogJ0tpdGNoZW4gU2luayBTdWJ0aXRsZScsXG4gICAgICAgICAgICAndGl0bGUnOiAnS2l0Y2hlbiBTaW5rIEZvcm0nLFxuICAgICAgICAgICAgJ3dpemFyZCc6IGZhbHNlLFxuICAgICAgICAgICAgJ2Zvcm1CZWFuQ2xhc3MnOiAnY2xhc3NuYW1lJyxcbiAgICAgICAgICAgICdmb3JtQmVhblN0YXRlJzogbnVsbCxcbiAgICAgICAgICAgICdjdXJyZW50RmllbGROYW1lJzogZmllbGROYW1lXG4gICAgICAgIH07XG5cbiAgICAvL3VzZSB0aGUgZm9ybSBtb2R1bGVcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgRm9ybSBjbGFzcyBhbmQgY3JlYXRlIGEgdGVzdCBvYmplY3RcbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfRm9ybV8sIF9Gb3JtQnV0dG9uXywgX0Zvcm1JdGVtXykge1xuICAgICAgICBGb3JtID0gX0Zvcm1fO1xuICAgICAgICBGb3JtQnV0dG9uID0gX0Zvcm1CdXR0b25fO1xuICAgICAgICBGb3JtSXRlbSA9IF9Gb3JtSXRlbV87XG4gICAgICAgIHRlc3RGb3JtID0gbmV3IEZvcm0odGVzdEZvcm1EYXRhKTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlGb3JtKGZvcm0pIHtcbiAgICAgICAgZXhwZWN0KGZvcm0uZ2V0SWQoKSkudG9CZSh0ZXN0Rm9ybURhdGEuaWQpO1xuICAgICAgICBleHBlY3QoZm9ybS5pc1JlYWRPbmx5KCkpLnRvQmUodGVzdEZvcm1EYXRhLnJlYWRPbmx5KTtcbiAgICAgICAgZXhwZWN0KGZvcm0uZ2V0U3VidGl0bGUoKSkudG9CZSh0ZXN0Rm9ybURhdGEuc3VidGl0bGUpO1xuICAgICAgICBleHBlY3QoZm9ybS5nZXRUaXRsZSgpKS50b0JlKHRlc3RGb3JtRGF0YS50aXRsZSk7XG4gICAgICAgIGV4cGVjdChmb3JtLmdldFdvcmtJdGVtSWQoKSkudG9CZSh0ZXN0Rm9ybURhdGEud29ya0l0ZW1JZCk7XG4gICAgICAgIGV4cGVjdChmb3JtLmlzV2l6YXJkKCkpLnRvQmUodGVzdEZvcm1EYXRhLndpemFyZCk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIGFycmF5cyBoYXZlIGNvcnJlY3QgdHlwZVxuICAgICAgICBleHBlY3QoZm9ybS5nZXRCdXR0b25zKClbMF0gaW5zdGFuY2VvZiBGb3JtQnV0dG9uKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChmb3JtLmdldEJ1dHRvbnMoKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgIGV4cGVjdChmb3JtLmdldEl0ZW1zKClbMF0gaW5zdGFuY2VvZiBGb3JtSXRlbSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoZm9ybS5nZXRJdGVtcygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KGZvcm0uZ2V0SXRlbXMoKVswXS5nZXRSb3dzKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoZm9ybS5nZXRGb3JtQmVhbkNsYXNzKCkpLnRvRXF1YWwodGVzdEZvcm1EYXRhLmZvcm1CZWFuQ2xhc3MpO1xuICAgICAgICBleHBlY3QoZm9ybS5nZXRGb3JtQmVhblN0YXRlKCkpLnRvRXF1YWwodGVzdEZvcm1EYXRhLmZvcm1CZWFuU3RhdGUpO1xuICAgIH1cblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtKCdmaWJib25hY2knKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtKGZ1bmN0aW9uKCkgeyByZXR1cm4gJzEgMSAyIDMgNSA4JzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbnN0YW50aWF0ZXMgY29ycmVjdGx5IHdpdGggZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2ZXJpZnlGb3JtKHRlc3RGb3JtKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbnN0YW50aWF0ZXMgY29ycmVjdGx5IHdpdGggZGF0YSB0aGF0IGlzIHJlYWQgb25seScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVhZE9ubHlUZXN0Rm9ybTtcbiAgICAgICAgdGVzdEZvcm1EYXRhLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgcmVhZE9ubHlUZXN0Rm9ybSA9IG5ldyBGb3JtKHRlc3RGb3JtRGF0YSk7XG4gICAgICAgIHZlcmlmeUZvcm0ocmVhZE9ubHlUZXN0Rm9ybSk7XG4gICAgICAgIGV4cGVjdChyZWFkT25seVRlc3RGb3JtLmdldEl0ZW1zKClbMF0uaXNEaXNhYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIC8vZGF0YSBzaG91bGQgYmUgdW5hbHRlcmVkXG4gICAgICAgIGV4cGVjdCh0ZXN0Rm9ybURhdGEuaXRlbXNbMF0uZGlzYWJsZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICAvLyByZXR1cm4gc3RhdGVcbiAgICAgICAgdGVzdEZvcm1EYXRhLnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpdCgndXBkYXRlcyB0aGUgY3VycmVudCBmaWVsZCBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRlc3RGb3JtID0gbmV3IEZvcm0odGVzdEZvcm1EYXRhKTtcbiAgICAgICAgLy9zaG91bGQgYWxsb3cgc2VydmVyIHRvIHB1c2ggZGVmYXVsdCBmaWVsZFxuICAgICAgICBleHBlY3QodGVzdEZvcm0uZ2V0Q3VycmVudEZpZWxkTmFtZSgpKS50b0JlKGZpZWxkTmFtZSk7XG4gICAgICAgIHRlc3RGb3JtLnNldEN1cnJlbnRGaWVsZE5hbWUodW5kZWZpbmVkKTtcbiAgICAgICAgLy9zaG91bGRuJ3QgY2hhbmdlIGRhdGFcbiAgICAgICAgZXhwZWN0KHRlc3RGb3JtRGF0YS5jdXJyZW50RmllbGROYW1lKS50b0JlKGZpZWxkTmFtZSk7XG4gICAgICAgIGV4cGVjdCh0ZXN0Rm9ybS5nZXRDdXJyZW50RmllbGROYW1lKCkpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgdGVzdEZvcm0uc2V0Q3VycmVudEZpZWxkTmFtZShmaWVsZE5hbWUpO1xuICAgICAgICBleHBlY3QodGVzdEZvcm0uZ2V0Q3VycmVudEZpZWxkTmFtZSgpKS50b0JlKGZpZWxkTmFtZSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ2dldEZsYXR0ZW5lZEl0ZW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm5zIG9ubHkgbm9uLXNlY3Rpb24gaXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXN0Rm9ybSA9IG5ldyBGb3JtKHRlc3RGb3JtRGF0YSksXG4gICAgICAgICAgICAgICAgZmxhdEl0ZW1zID0gdGVzdEZvcm0uZ2V0RmxhdHRlbmVkSXRlbXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChmbGF0SXRlbXMubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGZsYXRJdGVtc1swXS5uYW1lKS50b0JlKGZpZWxkTmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgY2FsY3VsYXRlIHRoZSBjb2x1bW4gc3BhbiBmb3IgZmllbGRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXN0Rm9ybSA9IG5ldyBGb3JtKHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzZWN0aW9uMWZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHRmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtblNwYW46IDFcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IDQsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlY3Rpb24yZmllbGQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dGZpZWxkJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NlY3Rpb24yZmllbGQyJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHRmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtblNwYW46IDJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzZWN0aW9uM2ZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHRmaWVsZCdcblxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmaXJzdCBzZWN0aW9uXG4gICAgICAgIGV4cGVjdCh0ZXN0Rm9ybS5nZXRJdGVtcygpWzBdLmdldEl0ZW1zKClbMF0uY29sdW1uU3BhbikudG9FcXVhbCg0KTtcblxuICAgICAgICAvLyBzZWNvbmQgc2VjdGlvblxuICAgICAgICBleHBlY3QodGVzdEZvcm0uZ2V0SXRlbXMoKVsxXS5nZXRJdGVtcygpWzBdLmNvbHVtblNwYW4pLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdCh0ZXN0Rm9ybS5nZXRJdGVtcygpWzFdLmdldEl0ZW1zKClbMV0uY29sdW1uU3BhbikudG9FcXVhbCgyKTtcblxuICAgICAgICAvLyB0aGlyZCBzZWN0aW9uXG4gICAgICAgIGV4cGVjdCh0ZXN0Rm9ybS5nZXRJdGVtcygpWzJdLmdldEl0ZW1zKClbMF0uY29sdW1uU3BhbikudG9FcXVhbCg0KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
