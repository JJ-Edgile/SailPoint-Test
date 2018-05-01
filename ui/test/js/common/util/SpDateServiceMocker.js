System.register(['test/js/TestInitializer', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            angular.module(utilModule).

            /**
             * A test utility that can help in mocking calls to the DateService.  These can
             * be tricky to test due to the fact that the timezone cannot be mocked by the
             * caller (ie - many Date functions just assume the local timezone).  These
             * utilities can help get around that.
             */
            factory('spDateServiceMocker', function () {
                return {

                    /**
                     * Return a mock implementation of setDateComponents() that will return
                     * pre-defined values for certain input.
                     *
                     * @param {Array} An array of objects that provide the inputs and return
                     *    values that should be responded to.  Any calls to the mock that
                     *    don't have these values will throw.  Each object in the array must
                     *    have the following properties:
                     *
                     *    date {Date | Number}  The expected input date - either a Date object
                     *       or the Date.getTime() value.
                     *    hours {Number}  The expected hours input.
                     *    minutes {Number}  The expected minutes input.
                     *    seconds {Number}  The expected seconds input.
                     *    millis {Number}  The expected millis input.
                     *    returnValue {Date}  The value to return for the given input.
                     *
                     * @return A mock function implementations of setDateComponents().
                     */
                    mockSetDateComponents: function (mockData) {
                        if (!mockData) {
                            throw 'Need some mockData!';
                        }

                        return function (date, hours, minutes, seconds, millis) {
                            var i, inputDate;

                            for (i = 0; i < mockData.length; i++) {
                                inputDate = mockData[i].date;

                                // Convert the input date into a long if it is a date.
                                if (angular.isDate(inputDate)) {
                                    inputDate = inputDate.getTime();
                                }

                                if (date.getTime() === inputDate && hours === mockData[i].hours && minutes === mockData[i].minutes && seconds === mockData[i].seconds && millis === mockData[i].millis) {
                                    return mockData[i].returnValue;
                                }
                            }

                            // If we got here, the input values didn't match anything that
                            // we expected in the mockData.  Throw!!!!!
                            throw 'Easy tiger!  Give me some values I can handle.';
                        };
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi91dGlsL1NwRGF0ZVNlcnZpY2VNb2NrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFBMUY7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUg3QixRQUFRLE9BQU87Ozs7Ozs7O1lBUWYsUUFBUSx1QkFBdUIsWUFBVztnQkFDdEMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQXFCSCx1QkFBdUIsVUFBUyxVQUFVO3dCQUN0QyxJQUFJLENBQUMsVUFBVTs0QkFDWCxNQUFNOzs7d0JBR1YsT0FBTyxVQUFTLE1BQU0sT0FBTyxTQUFTLFNBQVMsUUFBUTs0QkFDbkQsSUFBSSxHQUFHOzs0QkFFUCxLQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLO2dDQUNsQyxZQUFZLFNBQVMsR0FBRzs7O2dDQUd4QixJQUFJLFFBQVEsT0FBTyxZQUFZO29DQUMzQixZQUFZLFVBQVU7OztnQ0FHMUIsSUFBSSxLQUFNLGNBQWMsYUFDbkIsVUFBVSxTQUFTLEdBQUcsU0FDdEIsWUFBWSxTQUFTLEdBQUcsV0FDeEIsWUFBWSxTQUFTLEdBQUcsV0FDeEIsV0FBVyxTQUFTLEdBQUcsUUFBUztvQ0FDakMsT0FBTyxTQUFTLEdBQUc7Ozs7Ozs0QkFNM0IsTUFBTTs7Ozs7OztHQVFuQiIsImZpbGUiOiJjb21tb24vdXRpbC9TcERhdGVTZXJ2aWNlTW9ja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCB1dGlsTW9kdWxlIGZyb20gJ2NvbW1vbi91dGlsL1V0aWxNb2R1bGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUodXRpbE1vZHVsZSkuXHJcblxyXG4vKipcclxuICogQSB0ZXN0IHV0aWxpdHkgdGhhdCBjYW4gaGVscCBpbiBtb2NraW5nIGNhbGxzIHRvIHRoZSBEYXRlU2VydmljZS4gIFRoZXNlIGNhblxyXG4gKiBiZSB0cmlja3kgdG8gdGVzdCBkdWUgdG8gdGhlIGZhY3QgdGhhdCB0aGUgdGltZXpvbmUgY2Fubm90IGJlIG1vY2tlZCBieSB0aGVcclxuICogY2FsbGVyIChpZSAtIG1hbnkgRGF0ZSBmdW5jdGlvbnMganVzdCBhc3N1bWUgdGhlIGxvY2FsIHRpbWV6b25lKS4gIFRoZXNlXHJcbiAqIHV0aWxpdGllcyBjYW4gaGVscCBnZXQgYXJvdW5kIHRoYXQuXHJcbiAqL1xyXG5mYWN0b3J5KCdzcERhdGVTZXJ2aWNlTW9ja2VyJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYSBtb2NrIGltcGxlbWVudGF0aW9uIG9mIHNldERhdGVDb21wb25lbnRzKCkgdGhhdCB3aWxsIHJldHVyblxyXG4gICAgICAgICAqIHByZS1kZWZpbmVkIHZhbHVlcyBmb3IgY2VydGFpbiBpbnB1dC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IEFuIGFycmF5IG9mIG9iamVjdHMgdGhhdCBwcm92aWRlIHRoZSBpbnB1dHMgYW5kIHJldHVyblxyXG4gICAgICAgICAqICAgIHZhbHVlcyB0aGF0IHNob3VsZCBiZSByZXNwb25kZWQgdG8uICBBbnkgY2FsbHMgdG8gdGhlIG1vY2sgdGhhdFxyXG4gICAgICAgICAqICAgIGRvbid0IGhhdmUgdGhlc2UgdmFsdWVzIHdpbGwgdGhyb3cuICBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkgbXVzdFxyXG4gICAgICAgICAqICAgIGhhdmUgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgZGF0ZSB7RGF0ZSB8IE51bWJlcn0gIFRoZSBleHBlY3RlZCBpbnB1dCBkYXRlIC0gZWl0aGVyIGEgRGF0ZSBvYmplY3RcclxuICAgICAgICAgKiAgICAgICBvciB0aGUgRGF0ZS5nZXRUaW1lKCkgdmFsdWUuXHJcbiAgICAgICAgICogICAgaG91cnMge051bWJlcn0gIFRoZSBleHBlY3RlZCBob3VycyBpbnB1dC5cclxuICAgICAgICAgKiAgICBtaW51dGVzIHtOdW1iZXJ9ICBUaGUgZXhwZWN0ZWQgbWludXRlcyBpbnB1dC5cclxuICAgICAgICAgKiAgICBzZWNvbmRzIHtOdW1iZXJ9ICBUaGUgZXhwZWN0ZWQgc2Vjb25kcyBpbnB1dC5cclxuICAgICAgICAgKiAgICBtaWxsaXMge051bWJlcn0gIFRoZSBleHBlY3RlZCBtaWxsaXMgaW5wdXQuXHJcbiAgICAgICAgICogICAgcmV0dXJuVmFsdWUge0RhdGV9ICBUaGUgdmFsdWUgdG8gcmV0dXJuIGZvciB0aGUgZ2l2ZW4gaW5wdXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIEEgbW9jayBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgb2Ygc2V0RGF0ZUNvbXBvbmVudHMoKS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBtb2NrU2V0RGF0ZUNvbXBvbmVudHM6IGZ1bmN0aW9uKG1vY2tEYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9ja0RhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93ICdOZWVkIHNvbWUgbW9ja0RhdGEhJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLCBpbnB1dERhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG1vY2tEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRlID0gbW9ja0RhdGFbaV0uZGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgaW5wdXQgZGF0ZSBpbnRvIGEgbG9uZyBpZiBpdCBpcyBhIGRhdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEYXRlKGlucHV0RGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRlID0gaW5wdXREYXRlLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZGF0ZS5nZXRUaW1lKCkgPT09IGlucHV0RGF0ZSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGhvdXJzID09PSBtb2NrRGF0YVtpXS5ob3VycykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG1pbnV0ZXMgPT09IG1vY2tEYXRhW2ldLm1pbnV0ZXMpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZWNvbmRzID09PSBtb2NrRGF0YVtpXS5zZWNvbmRzKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobWlsbGlzID09PSBtb2NrRGF0YVtpXS5taWxsaXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2NrRGF0YVtpXS5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZ290IGhlcmUsIHRoZSBpbnB1dCB2YWx1ZXMgZGlkbid0IG1hdGNoIGFueXRoaW5nIHRoYXRcclxuICAgICAgICAgICAgICAgIC8vIHdlIGV4cGVjdGVkIGluIHRoZSBtb2NrRGF0YS4gIFRocm93ISEhISFcclxuICAgICAgICAgICAgICAgIHRocm93ICdFYXN5IHRpZ2VyISAgR2l2ZSBtZSBzb21lIHZhbHVlcyBJIGNhbiBoYW5kbGUuJztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
