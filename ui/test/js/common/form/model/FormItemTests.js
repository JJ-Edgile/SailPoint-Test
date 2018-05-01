System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Unit tests for the FormItem Model.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormItem', function () {
                var FormItem,
                    testItem,
                    testItemData = {
                    'title': 'Data Table',
                    'items': [{
                        'suggestClass': 'com.startalk.Radio',
                        'allowValueClick': false,
                        'sortable': false,
                        'itemId': 'field-1ba3102cb21d4f358fc349134b4d4f9e-single String Radio',
                        'fieldLabel': 'Single Valued String Radio',
                        'hidden': false,
                        'type': 'spradio',
                        'name': 'singleStringRadio',
                        'value': 'the third one',
                        'columnSpan': 0,
                        'allowedValues': [['One', 'One'], ['Two', 'Two']],
                        'required': false,
                        'disabled': false,
                        'filter': 'please do not show the boring ones',
                        'postBack': false,
                        'helpText': 'This is the help text',
                        'height': 100,
                        'previousValue': 'previous value',
                        'autoRecord': { id: '1', name: 'One' },
                        'dynamic': true,
                        'valueField': 'id'
                    }],
                    'type': 'fieldset',
                    'subtitle': 'Data Table Subtitle',
                    'columns': 0,
                    'dynamic': false
                };

                //use the form module
                beforeEach(module(formModule));

                /**
                 * Setup the Form class and create a test object
                 */
                beforeEach(inject(function (_FormItem_) {
                    FormItem = _FormItem_;
                    testItem = new FormItem(testItemData);
                }));

                function formatAllowedValues(values) {
                    if (values) {
                        return values.map(function (value) {
                            return {
                                displayName: value[1],
                                id: value[0]
                            };
                        });
                    }
                    return [];
                }

                function verifyItem(item, subItems, data) {
                    expect(item instanceof FormItem).toBeTruthy();
                    expect(item.getOptions()).toEqual(formatAllowedValues(data.allowedValues));
                    expect(item.isAllowValueClick()).toBe(!!data.allowValueClick);
                    expect(item.getBaseParams()).toEqual({});
                    expect(item.getColumnSpan()).toBe(data.columnSpan);
                    expect(item.getDatasourceUrl()).toBe(data.datasourceUrl);
                    expect(item.isDisabled()).toBe(!!data.disabled);
                    expect(item.getFieldLabel()).toBe(data.fieldLabel);
                    expect(item.getFilter()).toBe(data.filter);
                    expect(item.isHidden()).toBe(!!data.hidden);
                    expect(item.getItemId()).toBe(data.itemId);
                    expect(item.getHtmlSafeId()).toBe(data.itemId ? data.itemId.replace(/ /g, '') : undefined);
                    expect(item.getName()).toBe(data.name);
                    expect(item.isPostBack()).toBe(!!data.postBack);
                    expect(item.isRequired()).toBe(!!data.required);
                    expect(item.getValue()).toBe(data.value);
                    expect(item.isSortable()).toBe(!!data.sortable);
                    expect(item.getSubtitle()).toBe(data.subtitle);
                    expect(item.getTitle()).toBe(data.title);
                    expect(item.getType()).toBe(data.type);
                    expect(item.getHelpText()).toBe(data.helpText);
                    expect(item.getRows()).toEqual([]);
                    expect(item.getHeight()).toEqual(data.height);
                    expect(item.getPreviousValue()).toEqual(data.previousValue);
                    expect(item.getAutoRecord()).toEqual(data.autoRecord);
                    expect(item.isDynamic()).toEqual(data.dynamic);
                    expect(item.getValueField()).toEqual(data.valueField);

                    expect(item.getItems().length).toBe(subItems || 0);
                    item.items.map(function (subItem, index) {
                        verifyItem(subItem, subItem.items.length, data.items[index]);
                    });
                }

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new FormItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new FormItem('fibbonaci');
                    }).toThrow();
                    expect(function () {
                        new FormItem(function () {
                            return '1 1 2 3 5 8';
                        });
                    }).toThrow();
                });

                it('instantiates correctly with data', function () {
                    verifyItem(testItem, 1, testItemData);
                });

                it('passes on disabled', function () {
                    var disabledItem;
                    testItemData.disabled = true;
                    disabledItem = new FormItem(testItemData);
                    expect(testItemData.items[0].disabled).toBeFalsy();
                    testItemData.items[0].disabled = true;
                    verifyItem(disabledItem, 1, testItemData);
                    testItemData.items[0].disabled = false;
                    testItemData.disabled = false;
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL21vZGVsL0Zvcm1JdGVtVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBS3RGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQU43QixTQUFTLFlBQVksWUFBVztnQkFDNUIsSUFBSTtvQkFBVTtvQkFDVixlQUFlO29CQUNYLFNBQVM7b0JBQ1QsU0FBUyxDQUFDO3dCQUNOLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsY0FBYzt3QkFDZCxVQUFVO3dCQUNWLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixTQUFTO3dCQUNULGNBQWM7d0JBQ2QsaUJBQWlCLENBQ2IsQ0FDSSxPQUNBLFFBRUosQ0FDSSxPQUNBO3dCQUdSLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixVQUFVO3dCQUNWLGlCQUFpQjt3QkFDakIsY0FBYyxFQUFFLElBQUksS0FBSyxNQUFNO3dCQUMvQixXQUFZO3dCQUNaLGNBQWM7O29CQUVsQixRQUFRO29CQUNSLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxXQUFXOzs7O2dCQUluQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxZQUFZO29CQUNuQyxXQUFXO29CQUNYLFdBQVcsSUFBSSxTQUFTOzs7Z0JBRzVCLFNBQVMsb0JBQW9CLFFBQVE7b0JBQ2pDLElBQUksUUFBUTt3QkFDUixPQUFPLE9BQU8sSUFBSSxVQUFTLE9BQU87NEJBQzlCLE9BQU87Z0NBQ0gsYUFBYSxNQUFNO2dDQUNuQixJQUFJLE1BQU07Ozs7b0JBSXRCLE9BQU87OztnQkFHWCxTQUFTLFdBQVcsTUFBTSxVQUFVLE1BQU07b0JBQ3RDLE9BQU8sZ0JBQWdCLFVBQVU7b0JBQ2pDLE9BQU8sS0FBSyxjQUFjLFFBQVEsb0JBQW9CLEtBQUs7b0JBQzNELE9BQU8sS0FBSyxxQkFBcUIsS0FBSyxDQUFDLENBQUMsS0FBSztvQkFDN0MsT0FBTyxLQUFLLGlCQUFpQixRQUFRO29CQUNyQyxPQUFPLEtBQUssaUJBQWlCLEtBQUssS0FBSztvQkFDdkMsT0FBTyxLQUFLLG9CQUFvQixLQUFLLEtBQUs7b0JBQzFDLE9BQU8sS0FBSyxjQUFjLEtBQUssQ0FBQyxDQUFDLEtBQUs7b0JBQ3RDLE9BQU8sS0FBSyxpQkFBaUIsS0FBSyxLQUFLO29CQUN2QyxPQUFPLEtBQUssYUFBYSxLQUFLLEtBQUs7b0JBQ25DLE9BQU8sS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLEtBQUs7b0JBQ3BDLE9BQU8sS0FBSyxhQUFhLEtBQUssS0FBSztvQkFDbkMsT0FBTyxLQUFLLGlCQUFpQixLQUFLLEtBQUssU0FBUyxLQUFLLE9BQU8sUUFBUSxNQUFNLE1BQU07b0JBQ2hGLE9BQU8sS0FBSyxXQUFXLEtBQUssS0FBSztvQkFDakMsT0FBTyxLQUFLLGNBQWMsS0FBSyxDQUFDLENBQUMsS0FBSztvQkFDdEMsT0FBTyxLQUFLLGNBQWMsS0FBSyxDQUFDLENBQUMsS0FBSztvQkFDdEMsT0FBTyxLQUFLLFlBQVksS0FBSyxLQUFLO29CQUNsQyxPQUFPLEtBQUssY0FBYyxLQUFLLENBQUMsQ0FBQyxLQUFLO29CQUN0QyxPQUFPLEtBQUssZUFBZSxLQUFLLEtBQUs7b0JBQ3JDLE9BQU8sS0FBSyxZQUFZLEtBQUssS0FBSztvQkFDbEMsT0FBTyxLQUFLLFdBQVcsS0FBSyxLQUFLO29CQUNqQyxPQUFPLEtBQUssZUFBZSxLQUFLLEtBQUs7b0JBQ3JDLE9BQU8sS0FBSyxXQUFXLFFBQVE7b0JBQy9CLE9BQU8sS0FBSyxhQUFhLFFBQVEsS0FBSztvQkFDdEMsT0FBTyxLQUFLLG9CQUFvQixRQUFRLEtBQUs7b0JBQzdDLE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxLQUFLO29CQUMxQyxPQUFPLEtBQUssYUFBYSxRQUFRLEtBQUs7b0JBQ3RDLE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxLQUFLOztvQkFFMUMsT0FBTyxLQUFLLFdBQVcsUUFBUSxLQUFLLFlBQVk7b0JBQ2hELEtBQUssTUFBTSxJQUFJLFVBQVMsU0FBUyxPQUFPO3dCQUNwQyxXQUFXLFNBQVMsUUFBUSxNQUFNLFFBQVEsS0FBSyxNQUFNOzs7O2dCQUk3RCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxTQUFTO3VCQUFVOzs7Z0JBRy9DLEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLFNBQVM7dUJBQWlCO29CQUNsRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxTQUFTLFlBQVc7NEJBQUUsT0FBTzs7dUJBQXNCOzs7Z0JBRy9FLEdBQUcsb0NBQW9DLFlBQVc7b0JBQzlDLFdBQVcsVUFBVSxHQUFHOzs7Z0JBRzVCLEdBQUcsc0JBQXNCLFlBQVc7b0JBQ2hDLElBQUk7b0JBQ0osYUFBYSxXQUFXO29CQUN4QixlQUFlLElBQUksU0FBUztvQkFDNUIsT0FBTyxhQUFhLE1BQU0sR0FBRyxVQUFVO29CQUN2QyxhQUFhLE1BQU0sR0FBRyxXQUFXO29CQUNqQyxXQUFXLGNBQWMsR0FBRztvQkFDNUIsYUFBYSxNQUFNLEdBQUcsV0FBVztvQkFDakMsYUFBYSxXQUFXOzs7OztHQVk3QiIsImZpbGUiOiJjb21tb24vZm9ybS9tb2RlbC9Gb3JtSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBVbml0IHRlc3RzIGZvciB0aGUgRm9ybUl0ZW0gTW9kZWwuXG4gKi9cbmRlc2NyaWJlKCdGb3JtSXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBGb3JtSXRlbSwgdGVzdEl0ZW0sXG4gICAgICAgIHRlc3RJdGVtRGF0YSA9IHtcbiAgICAgICAgICAgICd0aXRsZSc6ICdEYXRhIFRhYmxlJyxcbiAgICAgICAgICAgICdpdGVtcyc6IFt7XG4gICAgICAgICAgICAgICAgJ3N1Z2dlc3RDbGFzcyc6ICdjb20uc3RhcnRhbGsuUmFkaW8nLFxuICAgICAgICAgICAgICAgICdhbGxvd1ZhbHVlQ2xpY2snOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnc29ydGFibGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnaXRlbUlkJzogJ2ZpZWxkLTFiYTMxMDJjYjIxZDRmMzU4ZmMzNDkxMzRiNGQ0ZjllLXNpbmdsZSBTdHJpbmcgUmFkaW8nLFxuICAgICAgICAgICAgICAgICdmaWVsZExhYmVsJzogJ1NpbmdsZSBWYWx1ZWQgU3RyaW5nIFJhZGlvJyxcbiAgICAgICAgICAgICAgICAnaGlkZGVuJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3ByYWRpbycsXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnc2luZ2xlU3RyaW5nUmFkaW8nLFxuICAgICAgICAgICAgICAgICd2YWx1ZSc6ICd0aGUgdGhpcmQgb25lJyxcbiAgICAgICAgICAgICAgICAnY29sdW1uU3Bhbic6IDAsXG4gICAgICAgICAgICAgICAgJ2FsbG93ZWRWYWx1ZXMnOiBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdPbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ09uZSdcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1R3bycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnVHdvJ1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAncmVxdWlyZWQnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZGlzYWJsZWQnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZmlsdGVyJzogJ3BsZWFzZSBkbyBub3Qgc2hvdyB0aGUgYm9yaW5nIG9uZXMnLFxuICAgICAgICAgICAgICAgICdwb3N0QmFjayc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdoZWxwVGV4dCc6ICdUaGlzIGlzIHRoZSBoZWxwIHRleHQnLFxuICAgICAgICAgICAgICAgICdoZWlnaHQnOiAxMDAsXG4gICAgICAgICAgICAgICAgJ3ByZXZpb3VzVmFsdWUnOiAncHJldmlvdXMgdmFsdWUnLFxuICAgICAgICAgICAgICAgICdhdXRvUmVjb3JkJzogeyBpZDogJzEnLCBuYW1lOiAnT25lJyB9LFxuICAgICAgICAgICAgICAgICdkeW5hbWljJyA6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3ZhbHVlRmllbGQnOiAnaWQnXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICd0eXBlJzogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgICdzdWJ0aXRsZSc6ICdEYXRhIFRhYmxlIFN1YnRpdGxlJyxcbiAgICAgICAgICAgICdjb2x1bW5zJzogMCxcbiAgICAgICAgICAgICdkeW5hbWljJzogZmFsc2VcbiAgICAgICAgfTtcblxuICAgIC8vdXNlIHRoZSBmb3JtIG1vZHVsZVxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBGb3JtIGNsYXNzIGFuZCBjcmVhdGUgYSB0ZXN0IG9iamVjdFxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Gb3JtSXRlbV8pIHtcbiAgICAgICAgRm9ybUl0ZW0gPSBfRm9ybUl0ZW1fO1xuICAgICAgICB0ZXN0SXRlbSA9IG5ldyBGb3JtSXRlbSh0ZXN0SXRlbURhdGEpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdEFsbG93ZWRWYWx1ZXModmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHZhbHVlWzFdLFxuICAgICAgICAgICAgICAgICAgICBpZDogdmFsdWVbMF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZlcmlmeUl0ZW0oaXRlbSwgc3ViSXRlbXMsIGRhdGEpIHtcbiAgICAgICAgZXhwZWN0KGl0ZW0gaW5zdGFuY2VvZiBGb3JtSXRlbSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRPcHRpb25zKCkpLnRvRXF1YWwoZm9ybWF0QWxsb3dlZFZhbHVlcyhkYXRhLmFsbG93ZWRWYWx1ZXMpKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uaXNBbGxvd1ZhbHVlQ2xpY2soKSkudG9CZSghIWRhdGEuYWxsb3dWYWx1ZUNsaWNrKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0QmFzZVBhcmFtcygpKS50b0VxdWFsKHt9KTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0Q29sdW1uU3BhbigpKS50b0JlKGRhdGEuY29sdW1uU3Bhbik7XG4gICAgICAgIGV4cGVjdChpdGVtLmdldERhdGFzb3VyY2VVcmwoKSkudG9CZShkYXRhLmRhdGFzb3VyY2VVcmwpO1xuICAgICAgICBleHBlY3QoaXRlbS5pc0Rpc2FibGVkKCkpLnRvQmUoISFkYXRhLmRpc2FibGVkKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0RmllbGRMYWJlbCgpKS50b0JlKGRhdGEuZmllbGRMYWJlbCk7XG4gICAgICAgIGV4cGVjdChpdGVtLmdldEZpbHRlcigpKS50b0JlKGRhdGEuZmlsdGVyKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uaXNIaWRkZW4oKSkudG9CZSghIWRhdGEuaGlkZGVuKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0SXRlbUlkKCkpLnRvQmUoZGF0YS5pdGVtSWQpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRIdG1sU2FmZUlkKCkpLnRvQmUoZGF0YS5pdGVtSWQgPyBkYXRhLml0ZW1JZC5yZXBsYWNlKC8gL2csICcnKSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIGV4cGVjdChpdGVtLmdldE5hbWUoKSkudG9CZShkYXRhLm5hbWUpO1xuICAgICAgICBleHBlY3QoaXRlbS5pc1Bvc3RCYWNrKCkpLnRvQmUoISFkYXRhLnBvc3RCYWNrKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uaXNSZXF1aXJlZCgpKS50b0JlKCEhZGF0YS5yZXF1aXJlZCk7XG4gICAgICAgIGV4cGVjdChpdGVtLmdldFZhbHVlKCkpLnRvQmUoZGF0YS52YWx1ZSk7XG4gICAgICAgIGV4cGVjdChpdGVtLmlzU29ydGFibGUoKSkudG9CZSghIWRhdGEuc29ydGFibGUpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRTdWJ0aXRsZSgpKS50b0JlKGRhdGEuc3VidGl0bGUpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRUaXRsZSgpKS50b0JlKGRhdGEudGl0bGUpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRUeXBlKCkpLnRvQmUoZGF0YS50eXBlKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0SGVscFRleHQoKSkudG9CZShkYXRhLmhlbHBUZXh0KTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0Um93cygpKS50b0VxdWFsKFtdKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0SGVpZ2h0KCkpLnRvRXF1YWwoZGF0YS5oZWlnaHQpO1xuICAgICAgICBleHBlY3QoaXRlbS5nZXRQcmV2aW91c1ZhbHVlKCkpLnRvRXF1YWwoZGF0YS5wcmV2aW91c1ZhbHVlKTtcbiAgICAgICAgZXhwZWN0KGl0ZW0uZ2V0QXV0b1JlY29yZCgpKS50b0VxdWFsKGRhdGEuYXV0b1JlY29yZCk7XG4gICAgICAgIGV4cGVjdChpdGVtLmlzRHluYW1pYygpKS50b0VxdWFsKGRhdGEuZHluYW1pYyk7XG4gICAgICAgIGV4cGVjdChpdGVtLmdldFZhbHVlRmllbGQoKSkudG9FcXVhbChkYXRhLnZhbHVlRmllbGQpO1xuXG4gICAgICAgIGV4cGVjdChpdGVtLmdldEl0ZW1zKCkubGVuZ3RoKS50b0JlKHN1Ykl0ZW1zIHx8IDApO1xuICAgICAgICBpdGVtLml0ZW1zLm1hcChmdW5jdGlvbihzdWJJdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmVyaWZ5SXRlbShzdWJJdGVtLCBzdWJJdGVtLml0ZW1zLmxlbmd0aCwgZGF0YS5pdGVtc1tpbmRleF0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgRm9ybUl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEZvcm1JdGVtKCdmaWJib25hY2knKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBGb3JtSXRlbShmdW5jdGlvbigpIHsgcmV0dXJuICcxIDEgMiAzIDUgOCc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5zdGFudGlhdGVzIGNvcnJlY3RseSB3aXRoIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmVyaWZ5SXRlbSh0ZXN0SXRlbSwgMSwgdGVzdEl0ZW1EYXRhKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXNzZXMgb24gZGlzYWJsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc2FibGVkSXRlbTtcbiAgICAgICAgdGVzdEl0ZW1EYXRhLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgZGlzYWJsZWRJdGVtID0gbmV3IEZvcm1JdGVtKHRlc3RJdGVtRGF0YSk7XG4gICAgICAgIGV4cGVjdCh0ZXN0SXRlbURhdGEuaXRlbXNbMF0uZGlzYWJsZWQpLnRvQmVGYWxzeSgpO1xuICAgICAgICB0ZXN0SXRlbURhdGEuaXRlbXNbMF0uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB2ZXJpZnlJdGVtKGRpc2FibGVkSXRlbSwgMSwgdGVzdEl0ZW1EYXRhKTtcbiAgICAgICAgdGVzdEl0ZW1EYXRhLml0ZW1zWzBdLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRlc3RJdGVtRGF0YS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
