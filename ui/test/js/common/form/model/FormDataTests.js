System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {

    /**
     * Unit tests for the FormData Model.
     */
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {
            describe('FormData', function () {
                var FormData,
                    form,
                    now = new Date(),
                    formConfig = {
                    items: [{
                        type: 'fieldset',
                        name: 'section',
                        items: [{
                            type: 'textfield',
                            name: 'foo',
                            value: 'bar'
                        }, {
                            type: 'textfield',
                            name: 'baz',
                            value: null,
                            postBack: true
                        }, {
                            type: 'suggest',
                            name: 'biz',
                            value: 'bizval',
                            valueField: 'name',
                            autoRecord: {
                                id: '1',
                                name: 'biz',
                                displayName: 'biz'
                            }
                        }, {
                            type: 'rebel',
                            name: 'buzz',
                            required: true,
                            value: []
                        }, {
                            type: 'without a cause',
                            name: 'bee',
                            disabled: true,
                            required: true,
                            value: ''
                        }, {
                            type: 'suggest',
                            name: 'badValueField',
                            value: null,
                            valueField: 'oops',
                            autoRecord: {
                                id: '2',
                                name: 'bad',
                                displayName: 'bad'
                            }
                        }, {
                            type: 'suggest',
                            name: 'noValueField',
                            value: null,
                            autoRecord: {
                                id: '3',
                                name: 'none',
                                displayName: 'none'
                            }
                        }, {
                            type: 'multisuggest',
                            name: 'arrayValue',
                            value: [{ id: '1', name: 'foo' }, { id: '2', name: 'bar' }]
                        }, {
                            type: 'multisuggest',
                            name: 'arrayValueField',
                            valueField: 'name',
                            value: [{ id: '1', name: 'foo' }, { id: '2', name: 'bar' }]
                        }, {
                            type: 'date',
                            name: 'dateField',
                            value: now
                        }]
                    }]
                };

                //use the form module
                beforeEach(module(formModule));

                /**
                 * Setup the Form class and create a test object
                 */
                beforeEach(inject(function (_FormData_, _Form_) {
                    FormData = _FormData_;
                    form = new _Form_(formConfig);
                }));

                it('instantiates correctly without form config', function () {
                    var data = new FormData();

                    expect(typeof data.getValues()).toBe('object');
                    expect(typeof data.getPostBackFields()).toBe('object');
                });

                it('instantiates correctly with form config', function () {
                    var data = new FormData(form);

                    expect(data.values['foo']).toEqual(formConfig.items[0].items[0].value);
                    expect(data.values['baz']).toEqual(formConfig.items[0].items[1].value);
                    expect(data.values['biz']).toEqual(formConfig.items[0].items[2].autoRecord);
                    expect(data.values['section']).toBeUndefined();

                    expect(data.postBackFields.length).toEqual(1);
                });

                it('adds needed items to list', function () {
                    var data = new FormData(form);
                    expect(data.getRequiredItems().length).toBe(1);
                });

                it('should process items with a valueField correctly', function () {
                    var data = new FormData(form),
                        values;

                    values = data.getValuesForSubmission();

                    expect(values['foo']).toEqual('bar');
                    expect(values['baz']).toEqual(null);
                    expect(values['biz']).toEqual('biz');
                    expect(values['buzz']).toEqual([]);
                    expect(values['bee']).toEqual('');

                    // should fall back to id if bad valueField is configured
                    expect(values['badValueField']).toEqual('2');

                    // should use id if no valueField configured
                    expect(values['noValueField']).toEqual('3');

                    // should transform an array of objects into array of values
                    expect(values['arrayValue']).toEqual(['1', '2']);
                    expect(values['arrayValueField']).toEqual(['foo', 'bar']);

                    // calls getTime on Date value
                    expect(values['dateField']).toEqual(now.getTime());
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL21vZGVsL0Zvcm1EYXRhVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7Ozs7O0lBS3RGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1QkFBdUI7WUFDN0UsYUFBYSxzQkFBc0I7O1FBRXZDLFNBQVMsWUFBWTtZQU43QixTQUFTLFlBQVksWUFBVztnQkFDNUIsSUFBSTtvQkFBVTtvQkFDVixNQUFNLElBQUk7b0JBQ1YsYUFBYTtvQkFDVCxPQUFPLENBQUM7d0JBQ0osTUFBTTt3QkFDTixNQUFNO3dCQUNOLE9BQU8sQ0FBQzs0QkFDSixNQUFNOzRCQUNOLE1BQU07NEJBQ04sT0FBTzsyQkFDUjs0QkFDQyxNQUFNOzRCQUNOLE1BQU07NEJBQ04sT0FBTzs0QkFDUCxVQUFVOzJCQUNYOzRCQUNDLE1BQU07NEJBQ04sTUFBTTs0QkFDTixPQUFPOzRCQUNQLFlBQVk7NEJBQ1osWUFBWTtnQ0FDUixJQUFJO2dDQUNKLE1BQU07Z0NBQ04sYUFBYTs7MkJBRWxCOzRCQUNDLE1BQU07NEJBQ04sTUFBTTs0QkFDTixVQUFVOzRCQUNWLE9BQU87MkJBQ1I7NEJBQ0MsTUFBTTs0QkFDTixNQUFNOzRCQUNOLFVBQVU7NEJBQ1YsVUFBVTs0QkFDVixPQUFPOzJCQUNSOzRCQUNDLE1BQU07NEJBQ04sTUFBTTs0QkFDTixPQUFPOzRCQUNQLFlBQVk7NEJBQ1osWUFBWTtnQ0FDUixJQUFJO2dDQUNKLE1BQU07Z0NBQ04sYUFBYTs7MkJBRWxCOzRCQUNDLE1BQU07NEJBQ04sTUFBTTs0QkFDTixPQUFPOzRCQUNQLFlBQVk7Z0NBQ1IsSUFBSTtnQ0FDSixNQUFNO2dDQUNOLGFBQWE7OzJCQUVsQjs0QkFDQyxNQUFNOzRCQUNOLE1BQU07NEJBQ04sT0FBTyxDQUFDLEVBQUMsSUFBSSxLQUFLLE1BQU0sU0FBUSxFQUFDLElBQUksS0FBSyxNQUFNOzJCQUNqRDs0QkFDQyxNQUFNOzRCQUNOLE1BQU07NEJBQ04sWUFBWTs0QkFDWixPQUFPLENBQUMsRUFBQyxJQUFJLEtBQUssTUFBTSxTQUFRLEVBQUMsSUFBSSxLQUFLLE1BQU07MkJBQ2pEOzRCQUNDLE1BQU07NEJBQ04sTUFBTTs0QkFDTixPQUFPOzs7Ozs7Z0JBTXZCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksUUFBUTtvQkFDM0MsV0FBVztvQkFDWCxPQUFPLElBQUksT0FBTzs7O2dCQUd0QixHQUFHLDhDQUE4QyxZQUFXO29CQUN4RCxJQUFJLE9BQU8sSUFBSTs7b0JBRWYsT0FBTyxPQUFPLEtBQUssYUFBYSxLQUFLO29CQUNyQyxPQUFPLE9BQU8sS0FBSyxxQkFBcUIsS0FBSzs7O2dCQUdqRCxHQUFHLDJDQUEyQyxZQUFXO29CQUNyRCxJQUFJLE9BQU8sSUFBSSxTQUFTOztvQkFFeEIsT0FBTyxLQUFLLE9BQU8sUUFBUSxRQUFRLFdBQVcsTUFBTSxHQUFHLE1BQU0sR0FBRztvQkFDaEUsT0FBTyxLQUFLLE9BQU8sUUFBUSxRQUFRLFdBQVcsTUFBTSxHQUFHLE1BQU0sR0FBRztvQkFDaEUsT0FBTyxLQUFLLE9BQU8sUUFBUSxRQUFRLFdBQVcsTUFBTSxHQUFHLE1BQU0sR0FBRztvQkFDaEUsT0FBTyxLQUFLLE9BQU8sWUFBWTs7b0JBRS9CLE9BQU8sS0FBSyxlQUFlLFFBQVEsUUFBUTs7O2dCQUcvQyxHQUFHLDZCQUE2QixZQUFXO29CQUN2QyxJQUFJLE9BQU8sSUFBSSxTQUFTO29CQUN4QixPQUFPLEtBQUssbUJBQW1CLFFBQVEsS0FBSzs7O2dCQUdoRCxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxJQUFJLE9BQU8sSUFBSSxTQUFTO3dCQUNwQjs7b0JBRUosU0FBUyxLQUFLOztvQkFFZCxPQUFPLE9BQU8sUUFBUSxRQUFRO29CQUM5QixPQUFPLE9BQU8sUUFBUSxRQUFRO29CQUM5QixPQUFPLE9BQU8sUUFBUSxRQUFRO29CQUM5QixPQUFPLE9BQU8sU0FBUyxRQUFRO29CQUMvQixPQUFPLE9BQU8sUUFBUSxRQUFROzs7b0JBRzlCLE9BQU8sT0FBTyxrQkFBa0IsUUFBUTs7O29CQUd4QyxPQUFPLE9BQU8saUJBQWlCLFFBQVE7OztvQkFHdkMsT0FBTyxPQUFPLGVBQWUsUUFBUSxDQUFDLEtBQUk7b0JBQzFDLE9BQU8sT0FBTyxvQkFBb0IsUUFBUSxDQUFDLE9BQU07OztvQkFHakQsT0FBTyxPQUFPLGNBQWMsUUFBUSxJQUFJOzs7OztHQWE3QyIsImZpbGUiOiJjb21tb24vZm9ybS9tb2RlbC9Gb3JtRGF0YVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuLyoqXG4gKiBVbml0IHRlc3RzIGZvciB0aGUgRm9ybURhdGEgTW9kZWwuXG4gKi9cbmRlc2NyaWJlKCdGb3JtRGF0YScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBGb3JtRGF0YSwgZm9ybSxcbiAgICAgICAgbm93ID0gbmV3IERhdGUoKSxcbiAgICAgICAgZm9ybUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdmaWVsZHNldCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NlY3Rpb24nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGV4dGZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZvbycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHRmaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdiYXonLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcG9zdEJhY2s6IHRydWVcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWdnZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2JpeicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnYml6dmFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVGaWVsZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUmVjb3JkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2JpeicsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2JpeidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlYmVsJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2J1enonLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFtdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2l0aG91dCBhIGNhdXNlJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2JlZScsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VnZ2VzdCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdiYWRWYWx1ZUZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRmllbGQ6ICdvb3BzJyxcbiAgICAgICAgICAgICAgICAgICAgYXV0b1JlY29yZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdiYWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdiYWQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdWdnZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vVmFsdWVGaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhdXRvUmVjb3JkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbXVsdGlzdWdnZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FycmF5VmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW3tpZDogJzEnLCBuYW1lOiAnZm9vJ30sIHtpZDogJzInLCBuYW1lOiAnYmFyJ31dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbXVsdGlzdWdnZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FycmF5VmFsdWVGaWVsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlRmllbGQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFt7aWQ6ICcxJywgbmFtZTogJ2Zvbyd9LCB7aWQ6ICcyJywgbmFtZTogJ2Jhcid9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZGF0ZUZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5vd1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuXG4gICAgLy91c2UgdGhlIGZvcm0gbW9kdWxlXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZm9ybU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIEZvcm0gY2xhc3MgYW5kIGNyZWF0ZSBhIHRlc3Qgb2JqZWN0XG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0Zvcm1EYXRhXywgX0Zvcm1fKSB7XG4gICAgICAgIEZvcm1EYXRhID0gX0Zvcm1EYXRhXztcbiAgICAgICAgZm9ybSA9IG5ldyBfRm9ybV8oZm9ybUNvbmZpZyk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ2luc3RhbnRpYXRlcyBjb3JyZWN0bHkgd2l0aG91dCBmb3JtIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgIGV4cGVjdCh0eXBlb2YgZGF0YS5nZXRWYWx1ZXMoKSkudG9CZSgnb2JqZWN0Jyk7XG4gICAgICAgIGV4cGVjdCh0eXBlb2YgZGF0YS5nZXRQb3N0QmFja0ZpZWxkcygpKS50b0JlKCdvYmplY3QnKTtcbiAgICB9KTtcblxuICAgIGl0KCdpbnN0YW50aWF0ZXMgY29ycmVjdGx5IHdpdGggZm9ybSBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAgICAgZXhwZWN0KGRhdGEudmFsdWVzWydmb28nXSkudG9FcXVhbChmb3JtQ29uZmlnLml0ZW1zWzBdLml0ZW1zWzBdLnZhbHVlKTtcbiAgICAgICAgZXhwZWN0KGRhdGEudmFsdWVzWydiYXonXSkudG9FcXVhbChmb3JtQ29uZmlnLml0ZW1zWzBdLml0ZW1zWzFdLnZhbHVlKTtcbiAgICAgICAgZXhwZWN0KGRhdGEudmFsdWVzWydiaXonXSkudG9FcXVhbChmb3JtQ29uZmlnLml0ZW1zWzBdLml0ZW1zWzJdLmF1dG9SZWNvcmQpO1xuICAgICAgICBleHBlY3QoZGF0YS52YWx1ZXNbJ3NlY3Rpb24nXSkudG9CZVVuZGVmaW5lZCgpO1xuXG4gICAgICAgIGV4cGVjdChkYXRhLnBvc3RCYWNrRmllbGRzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIG5lZWRlZCBpdGVtcyB0byBsaXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgICAgICBleHBlY3QoZGF0YS5nZXRSZXF1aXJlZEl0ZW1zKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBwcm9jZXNzIGl0ZW1zIHdpdGggYSB2YWx1ZUZpZWxkIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKSxcbiAgICAgICAgICAgIHZhbHVlcztcblxuICAgICAgICB2YWx1ZXMgPSBkYXRhLmdldFZhbHVlc0ZvclN1Ym1pc3Npb24oKTtcblxuICAgICAgICBleHBlY3QodmFsdWVzWydmb28nXSkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdCh2YWx1ZXNbJ2JheiddKS50b0VxdWFsKG51bGwpO1xuICAgICAgICBleHBlY3QodmFsdWVzWydiaXonXSkudG9FcXVhbCgnYml6Jyk7XG4gICAgICAgIGV4cGVjdCh2YWx1ZXNbJ2J1enonXSkudG9FcXVhbChbXSk7XG4gICAgICAgIGV4cGVjdCh2YWx1ZXNbJ2JlZSddKS50b0VxdWFsKCcnKTtcblxuICAgICAgICAvLyBzaG91bGQgZmFsbCBiYWNrIHRvIGlkIGlmIGJhZCB2YWx1ZUZpZWxkIGlzIGNvbmZpZ3VyZWRcbiAgICAgICAgZXhwZWN0KHZhbHVlc1snYmFkVmFsdWVGaWVsZCddKS50b0VxdWFsKCcyJyk7XG5cbiAgICAgICAgLy8gc2hvdWxkIHVzZSBpZCBpZiBubyB2YWx1ZUZpZWxkIGNvbmZpZ3VyZWRcbiAgICAgICAgZXhwZWN0KHZhbHVlc1snbm9WYWx1ZUZpZWxkJ10pLnRvRXF1YWwoJzMnKTtcblxuICAgICAgICAvLyBzaG91bGQgdHJhbnNmb3JtIGFuIGFycmF5IG9mIG9iamVjdHMgaW50byBhcnJheSBvZiB2YWx1ZXNcbiAgICAgICAgZXhwZWN0KHZhbHVlc1snYXJyYXlWYWx1ZSddKS50b0VxdWFsKFsnMScsJzInXSk7XG4gICAgICAgIGV4cGVjdCh2YWx1ZXNbJ2FycmF5VmFsdWVGaWVsZCddKS50b0VxdWFsKFsnZm9vJywnYmFyJ10pO1xuXG4gICAgICAgIC8vIGNhbGxzIGdldFRpbWUgb24gRGF0ZSB2YWx1ZVxuICAgICAgICBleHBlY3QodmFsdWVzWydkYXRlRmllbGQnXSkudG9FcXVhbChub3cuZ2V0VGltZSgpKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
