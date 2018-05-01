System.register(['certification/CertificationModule'], function (_export) {
    'use strict';

    mockViewStateFactory.$inject = ["CertificationViewState"];
    var certificationModule;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function mockViewStateFactory(CertificationViewState) {

        /**
         * A mock version of a CertificationViewState that will either use TAB_CONFIGS as its tabs, or the
         * tabs that are passed into the constructor.
         */

        var MockViewState = (function (_CertificationViewState) {
            _inherits(MockViewState, _CertificationViewState);

            /**
             * Constructor.
             *
             * @param {Array<CertificationTab>} [tabs]  The tab configs to use, if null the defaults are used.
             * @param {Object} [defaultTableData] The default table data.
             */

            function MockViewState(tabs, defaultTableData) {
                _classCallCheck(this, MockViewState);

                _get(Object.getPrototypeOf(MockViewState.prototype), 'constructor', this).call(this, defaultTableData);

                // If tabs were passed in, override the tabConfigs that were set in super.
                if (tabs) {
                    this.tabConfigs = tabs;
                }

                this.itemStatusCount = {};
            }

            // Mock tables.

            /**
             * @return {Array<CertificationTab>} The tabs available for this view.  This is called once when
             *     the view is constructed.
             */

            _createClass(MockViewState, [{
                key: 'initializeTabConfigs',
                value: function initializeTabConfigs() {
                    return MockViewState.TAB_CONFIGS;
                }

                /**
                 * @return {CertificationItemStatusCount} The CertificationItemStatusCount that can provide count
                 *     information for the view.
                 */
            }, {
                key: 'getItemStatusCount',
                value: function getItemStatusCount() {
                    return this.itemStatusCount;
                }

                /**
                 * Create a mock CertificationTab with the given name, tables, and optional count.
                 */
            }], [{
                key: 'createTab',
                value: function createTab(name, tables, count) {
                    count = angular.isDefined(count) ? count : 5;
                    return {
                        name: name,
                        count: count,
                        tables: tables,
                        getCount: jasmine.createSpy('getCount').and.returnValue(count)
                    };
                }

                /**
                 * Create a mock CertificationTable with the options and optional count.
                 */
            }, {
                key: 'createTable',
                value: function createTable(allowBulk, count) {
                    var dataTableConfig = MockViewState.createDataTableConfig(allowBulk);
                    return {
                        getDataTableConfig: function () {
                            return dataTableConfig;
                        },
                        getCount: function () {
                            return angular.isDefined(count) ? count : 0;
                        },
                        initializeFilters: jasmine.createSpy('initializeFilters'),
                        setupCheckboxModel: jasmine.createSpy('setupCheckboxModel'),
                        clearCheckboxSelections: jasmine.createSpy('clearCheckboxSelections'),
                        refresh: jasmine.createSpy('refresh'),
                        isDisplayed: jasmine.createSpy('isDisplayed').and.returnValue(true)
                    };
                }

                /**
                 * Create a mock DataTableDirectiveConfig with the given options.
                 */
            }, {
                key: 'createDataTableConfig',
                value: function createDataTableConfig(allowBulk) {
                    var checkbox = undefined;

                    if (allowBulk) {
                        (function () {
                            var selectionModel = {
                                clear: jasmine.createSpy('clear')
                            };

                            checkbox = {
                                getSelectionModel: function () {
                                    return selectionModel;
                                }
                            };
                        })();
                    }

                    var pagingData = {
                        setTotal: jasmine.createSpy('total')
                    };

                    return {
                        checkboxMultiSelect: checkbox,
                        getPagingData: function () {
                            return pagingData;
                        }
                    };
                }
            }]);

            return MockViewState;
        })(CertificationViewState);

        MockViewState.TABLE1A = MockViewState.createTable(false, 5);
        MockViewState.TABLE1B = MockViewState.createTable(true, 7);
        MockViewState.TABLE2 = MockViewState.createTable(true, 1);

        // All tables.
        MockViewState.ALL_TABLES = [MockViewState.TABLE1A, MockViewState.TABLE1B, MockViewState.TABLE2];

        // Mock tabs.
        MockViewState.TAB1 = MockViewState.createTab('TAB1', [MockViewState.TABLE1A, MockViewState.TABLE1B]);
        MockViewState.TAB2 = MockViewState.createTab('TAB2', [MockViewState.TABLE2]);

        // All tabs.
        MockViewState.TAB_CONFIGS = [MockViewState.TAB1, MockViewState.TAB2];

        return MockViewState;
    }

    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {
            angular.module(certificationModule).factory('MockViewState', mockViewStateFactory);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvTW9ja1ZpZXdTdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxzQ0FBc0MsVUFBVSxTQUFTO0lBQ3RFOzs7SUFFQSxJQUFJOztJQUVKLElBQUksZUFBZSxDQUFDLFlBQVksRUFBRSxTQUFTLGlCQUFpQixRQUFRLE9BQU8sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssRUFBRSxJQUFJLGFBQWEsTUFBTSxJQUFJLFdBQVcsYUFBYSxXQUFXLGNBQWMsT0FBTyxXQUFXLGVBQWUsTUFBTSxJQUFJLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLGVBQWUsUUFBUSxXQUFXLEtBQUssaUJBQWlCLE9BQU8sVUFBVSxhQUFhLFlBQVksYUFBYSxFQUFFLElBQUksWUFBWSxpQkFBaUIsWUFBWSxXQUFXLGFBQWEsSUFBSSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsT0FBTzs7SUFFamlCLElBQUksT0FBTyxTQUFTLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLFNBQVMsTUFBTSxXQUFXLE9BQU8sUUFBUSxFQUFFLElBQUksU0FBUyxJQUFJLFdBQVcsS0FBSyxXQUFXLEtBQUssU0FBUyxPQUFPLElBQUksV0FBVyxNQUFNLFNBQVMsU0FBUyxXQUFXLElBQUksT0FBTyxPQUFPLHlCQUF5QixRQUFRLFdBQVcsSUFBSSxTQUFTLFdBQVcsRUFBRSxJQUFJLFNBQVMsT0FBTyxlQUFlLFNBQVMsSUFBSSxXQUFXLE1BQU0sRUFBRSxPQUFPLGtCQUFrQixFQUFFLEtBQUssUUFBUSxNQUFNLFVBQVUsTUFBTSxVQUFVLFNBQVMsTUFBTSxPQUFPLFNBQVMsV0FBVyxTQUFTLG9CQUFvQixJQUFJLFdBQVcsTUFBTSxFQUFFLE9BQU8sS0FBSyxjQUFjLEVBQUUsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFdBQVcsV0FBVyxFQUFFLE9BQU8sYUFBYSxPQUFPLE9BQU8sS0FBSzs7SUFFam9CLFNBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOztJQUVoSCxTQUFTLFVBQVUsVUFBVSxZQUFZLEVBQUUsSUFBSSxPQUFPLGVBQWUsY0FBYyxlQUFlLE1BQU0sRUFBRSxNQUFNLElBQUksVUFBVSw2REFBNkQsT0FBTyxlQUFlLFNBQVMsWUFBWSxPQUFPLE9BQU8sY0FBYyxXQUFXLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxVQUFVLFlBQVksT0FBTyxVQUFVLE1BQU0sY0FBYyxXQUFXLElBQUksWUFBWSxPQUFPLGlCQUFpQixPQUFPLGVBQWUsVUFBVSxjQUFjLFNBQVMsWUFBWTs7SUFUcmUsU0FBUyxxQkFBcUIsd0JBQXdCOzs7Ozs7O1FBa0I5QyxJQVpFLGdCQUFhLENBQUEsVUFBQSx5QkFBQTtZQWFYLFVBYkYsZUFBYTs7Ozs7Ozs7O1lBUUosU0FSVCxjQVFVLE1BQU0sa0JBQWtCO2dCQWU1QixnQkFBZ0IsTUF2QnRCOztnQkFTRSxLQUFBLE9BQUEsZUFURixjQUFhLFlBQUEsZUFBQSxNQUFBLEtBQUEsTUFTTDs7O2dCQUdOLElBQUksTUFBTTtvQkFDTixLQUFLLGFBQWE7OztnQkFHdEIsS0FBSyxrQkFBa0I7Ozs7Ozs7Ozs7WUEwQnZCLGFBMUNGLGVBQWEsQ0FBQTtnQkEyQ1AsS0FBSztnQkFDTCxPQXJCWSxTQUFBLHVCQUFHO29CQUNuQixPQUFPLGNBQWM7Ozs7Ozs7ZUE0QmxCO2dCQUNDLEtBQUs7Z0JBQ0wsT0F2QlUsU0FBQSxxQkFBRztvQkFDakIsT0FBTyxLQUFLOzs7Ozs7Z0JBNkJSLENBQUM7Z0JBQ0QsS0FBSztnQkFDTCxPQXpCUSxTQUFBLFVBQUMsTUFBTSxRQUFRLE9BQU87b0JBQ2xDLFFBQVMsUUFBUSxVQUFVLFNBQVUsUUFBUTtvQkFDN0MsT0FBTzt3QkFDSCxNQUFNO3dCQUNOLE9BQU87d0JBQ1AsUUFBUTt3QkFDUixVQUFVLFFBQVEsVUFBVSxZQUFZLElBQUksWUFBWTs7Ozs7OztlQWdDekQ7Z0JBQ0MsS0FBSztnQkFDTCxPQTNCVSxTQUFBLFlBQUMsV0FBVyxPQUFPO29CQUNqQyxJQUFJLGtCQUFrQixjQUFjLHNCQUFzQjtvQkFDMUQsT0FBTzt3QkFDSCxvQkFBb0IsWUFBQTs0QkE0QlIsT0E1QmM7O3dCQUMxQixVQUFVLFlBQUE7NEJBOEJFLE9BOUJJLFFBQVEsVUFBVSxTQUFTLFFBQVE7O3dCQUNuRCxtQkFBbUIsUUFBUSxVQUFVO3dCQUNyQyxvQkFBb0IsUUFBUSxVQUFVO3dCQUN0Qyx5QkFBeUIsUUFBUSxVQUFVO3dCQUMzQyxTQUFTLFFBQVEsVUFBVTt3QkFDM0IsYUFBYSxRQUFRLFVBQVUsZUFBZSxJQUFJLFlBQVk7Ozs7Ozs7ZUFzQy9EO2dCQUNDLEtBQUs7Z0JBQ0wsT0FqQ29CLFNBQUEsc0JBQUMsV0FBVztvQkFDcEMsSUFBSSxXQUFROztvQkFFWixJQUFJLFdBQVc7d0JBa0NILENBQUMsWUFBWTs0QkFqQ3JCLElBQUksaUJBQWlCO2dDQUNqQixPQUFPLFFBQVEsVUFBVTs7OzRCQUc3QixXQUFXO2dDQUNQLG1CQUFtQixZQUFBO29DQW1DSCxPQW5DUzs7Ozs7O29CQUlqQyxJQUFJLGFBQWE7d0JBQ2IsVUFBVSxRQUFRLFVBQVU7OztvQkFHaEMsT0FBTzt3QkFDSCxxQkFBcUI7d0JBQ3JCLGVBQWUsWUFBQTs0QkFzQ0gsT0F0Q1M7Ozs7OztZQTRDekIsT0FsSUY7V0FBc0I7O1FBNEY1QixjQUFjLFVBQVUsY0FBYyxZQUFZLE9BQU87UUFDekQsY0FBYyxVQUFVLGNBQWMsWUFBWSxNQUFNO1FBQ3hELGNBQWMsU0FBUyxjQUFjLFlBQVksTUFBTTs7O1FBR3ZELGNBQWMsYUFBYSxDQUFFLGNBQWMsU0FBUyxjQUFjLFNBQVMsY0FBYzs7O1FBR3pGLGNBQWMsT0FBTyxjQUFjLFVBQVUsUUFBUSxDQUFFLGNBQWMsU0FBUyxjQUFjO1FBQzVGLGNBQWMsT0FBTyxjQUFjLFVBQVUsUUFBUSxDQUFFLGNBQWM7OztRQUdyRSxjQUFjLGNBQWMsQ0FBRSxjQUFjLE1BQU0sY0FBYzs7UUFHaEUsT0FBTzs7O0lBMkNQLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQ0FBbUM7WUFDbkQsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZO1lBNUM3QixRQUFRLE9BQU8scUJBQXFCLFFBQVEsaUJBQWlCOzs7R0FnRDFEIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvTW9ja1ZpZXdTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcblxyXG5mdW5jdGlvbiBtb2NrVmlld1N0YXRlRmFjdG9yeShDZXJ0aWZpY2F0aW9uVmlld1N0YXRlKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIG1vY2sgdmVyc2lvbiBvZiBhIENlcnRpZmljYXRpb25WaWV3U3RhdGUgdGhhdCB3aWxsIGVpdGhlciB1c2UgVEFCX0NPTkZJR1MgYXMgaXRzIHRhYnMsIG9yIHRoZVxyXG4gICAgICogdGFicyB0aGF0IGFyZSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNsYXNzIE1vY2tWaWV3U3RhdGUgZXh0ZW5kcyBDZXJ0aWZpY2F0aW9uVmlld1N0YXRlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uc3RydWN0b3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5PENlcnRpZmljYXRpb25UYWI+fSBbdGFic10gIFRoZSB0YWIgY29uZmlncyB0byB1c2UsIGlmIG51bGwgdGhlIGRlZmF1bHRzIGFyZSB1c2VkLlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbZGVmYXVsdFRhYmxlRGF0YV0gVGhlIGRlZmF1bHQgdGFibGUgZGF0YS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0YWJzLCBkZWZhdWx0VGFibGVEYXRhKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGRlZmF1bHRUYWJsZURhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGFicyB3ZXJlIHBhc3NlZCBpbiwgb3ZlcnJpZGUgdGhlIHRhYkNvbmZpZ3MgdGhhdCB3ZXJlIHNldCBpbiBzdXBlci5cclxuICAgICAgICAgICAgaWYgKHRhYnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFiQ29uZmlncyA9IHRhYnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVN0YXR1c0NvdW50ID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxDZXJ0aWZpY2F0aW9uVGFiPn0gVGhlIHRhYnMgYXZhaWxhYmxlIGZvciB0aGlzIHZpZXcuICBUaGlzIGlzIGNhbGxlZCBvbmNlIHdoZW5cclxuICAgICAgICAgKiAgICAgdGhlIHZpZXcgaXMgY29uc3RydWN0ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZVRhYkNvbmZpZ3MoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrVmlld1N0YXRlLlRBQl9DT05GSUdTO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybiB7Q2VydGlmaWNhdGlvbkl0ZW1TdGF0dXNDb3VudH0gVGhlIENlcnRpZmljYXRpb25JdGVtU3RhdHVzQ291bnQgdGhhdCBjYW4gcHJvdmlkZSBjb3VudFxyXG4gICAgICAgICAqICAgICBpbmZvcm1hdGlvbiBmb3IgdGhlIHZpZXcuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0SXRlbVN0YXR1c0NvdW50KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtU3RhdHVzQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBtb2NrIENlcnRpZmljYXRpb25UYWIgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgdGFibGVzLCBhbmQgb3B0aW9uYWwgY291bnQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZVRhYihuYW1lLCB0YWJsZXMsIGNvdW50KSB7XHJcbiAgICAgICAgICAgIGNvdW50ID0gKGFuZ3VsYXIuaXNEZWZpbmVkKGNvdW50KSkgPyBjb3VudCA6IDU7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgdGFibGVzOiB0YWJsZXMsXHJcbiAgICAgICAgICAgICAgICBnZXRDb3VudDogamFzbWluZS5jcmVhdGVTcHkoJ2dldENvdW50JykuYW5kLnJldHVyblZhbHVlKGNvdW50KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlIGEgbW9jayBDZXJ0aWZpY2F0aW9uVGFibGUgd2l0aCB0aGUgb3B0aW9ucyBhbmQgb3B0aW9uYWwgY291bnQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZVRhYmxlKGFsbG93QnVsaywgY291bnQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFUYWJsZUNvbmZpZyA9IE1vY2tWaWV3U3RhdGUuY3JlYXRlRGF0YVRhYmxlQ29uZmlnKGFsbG93QnVsayk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhVGFibGVDb25maWc6ICgpID0+IGRhdGFUYWJsZUNvbmZpZyxcclxuICAgICAgICAgICAgICAgIGdldENvdW50OiAoKSA9PiBhbmd1bGFyLmlzRGVmaW5lZChjb3VudCkgPyBjb3VudCA6IDAsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplRmlsdGVyczogamFzbWluZS5jcmVhdGVTcHkoJ2luaXRpYWxpemVGaWx0ZXJzJyksXHJcbiAgICAgICAgICAgICAgICBzZXR1cENoZWNrYm94TW9kZWw6IGphc21pbmUuY3JlYXRlU3B5KCdzZXR1cENoZWNrYm94TW9kZWwnKSxcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2hlY2tib3hTZWxlY3Rpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgnY2xlYXJDaGVja2JveFNlbGVjdGlvbnMnKSxcclxuICAgICAgICAgICAgICAgIHJlZnJlc2g6IGphc21pbmUuY3JlYXRlU3B5KCdyZWZyZXNoJyksXHJcbiAgICAgICAgICAgICAgICBpc0Rpc3BsYXllZDogamFzbWluZS5jcmVhdGVTcHkoJ2lzRGlzcGxheWVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBtb2NrIERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZyB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBjcmVhdGVEYXRhVGFibGVDb25maWcoYWxsb3dCdWxrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2JveDtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxvd0J1bGspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhcjogamFzbWluZS5jcmVhdGVTcHkoJ2NsZWFyJylcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2tib3ggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2VsZWN0aW9uTW9kZWw6ICgpID0+IHNlbGVjdGlvbk1vZGVsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFnaW5nRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHNldFRvdGFsOiBqYXNtaW5lLmNyZWF0ZVNweSgndG90YWwnKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrYm94TXVsdGlTZWxlY3Q6IGNoZWNrYm94LFxyXG4gICAgICAgICAgICAgICAgZ2V0UGFnaW5nRGF0YTogKCkgPT4gcGFnaW5nRGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2NrIHRhYmxlcy5cclxuICAgIE1vY2tWaWV3U3RhdGUuVEFCTEUxQSA9IE1vY2tWaWV3U3RhdGUuY3JlYXRlVGFibGUoZmFsc2UsIDUpO1xyXG4gICAgTW9ja1ZpZXdTdGF0ZS5UQUJMRTFCID0gTW9ja1ZpZXdTdGF0ZS5jcmVhdGVUYWJsZSh0cnVlLCA3KTtcclxuICAgIE1vY2tWaWV3U3RhdGUuVEFCTEUyID0gTW9ja1ZpZXdTdGF0ZS5jcmVhdGVUYWJsZSh0cnVlLCAxKTtcclxuXHJcbiAgICAvLyBBbGwgdGFibGVzLlxyXG4gICAgTW9ja1ZpZXdTdGF0ZS5BTExfVEFCTEVTID0gWyBNb2NrVmlld1N0YXRlLlRBQkxFMUEsIE1vY2tWaWV3U3RhdGUuVEFCTEUxQiwgTW9ja1ZpZXdTdGF0ZS5UQUJMRTIgXTtcclxuXHJcbiAgICAvLyBNb2NrIHRhYnMuXHJcbiAgICBNb2NrVmlld1N0YXRlLlRBQjEgPSBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYignVEFCMScsIFsgTW9ja1ZpZXdTdGF0ZS5UQUJMRTFBLCBNb2NrVmlld1N0YXRlLlRBQkxFMUIgXSk7XHJcbiAgICBNb2NrVmlld1N0YXRlLlRBQjIgPSBNb2NrVmlld1N0YXRlLmNyZWF0ZVRhYignVEFCMicsIFsgTW9ja1ZpZXdTdGF0ZS5UQUJMRTIgXSk7XHJcblxyXG4gICAgLy8gQWxsIHRhYnMuXHJcbiAgICBNb2NrVmlld1N0YXRlLlRBQl9DT05GSUdTID0gWyBNb2NrVmlld1N0YXRlLlRBQjEsIE1vY2tWaWV3U3RhdGUuVEFCMiBdO1xyXG5cclxuXHJcbiAgICByZXR1cm4gTW9ja1ZpZXdTdGF0ZTtcclxufVxyXG5cclxuYW5ndWxhci5tb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkuZmFjdG9yeSgnTW9ja1ZpZXdTdGF0ZScsIG1vY2tWaWV3U3RhdGVGYWN0b3J5KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
