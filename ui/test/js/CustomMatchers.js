System.register([], function (_export) {
    /**
     * The SailPoint.CustomMatchers object contains custom jasmine matchers that can
     * be used by many tests.  To use these in a test, add them in a beforeEach()
     * function.  Example:
     *
     *   beforeEach(function() {
     *       jasmine.addMatchers(SailPoint.CustomMatchers);
     *   });
     */
    'use strict';

    var CustomMatchers;
    return {
        setters: [],
        execute: function () {
            CustomMatchers = {

                /**
                 * Matcher to compare that an $http GET response equals an expected response.
                 *
                 * usage:
                 * expect(actual).toEqualResponse(expected);
                 *
                 * actual- the response returned from $http GET
                 * expected- the response that should have been returned to pass the test
                 */
                toEqualResponse: function () {
                    return {
                        compare: function (actual, expected) {
                            var result = {};
                            // Use angular.equals() since this ignores properties that
                            // start with $ (ie - $promise and $resolved).
                            result.pass = angular.equals(actual, expected);
                            return result;
                        }
                    };
                },
                /**
                 * Matcher to see if an item is in an array.
                 *
                 * expect(actual).toEqualResponse(inputs);
                 *
                 * actual- the Array to check, will fail if not an array
                 * inputs- an object with two keys, expectedItem- the item that should be in the array (required)
                 *         and comparator- the function to compare the items in the array with the expected item
                 *         defaults to object equality, ===
                 */
                arrayToContainItem: function () {
                    return {
                        compare: function (actual, inputs) {
                            var result = {},
                                length,
                                i,
                                actualItem,
                                expectedItem,
                                comparator;
                            // fail if actual is not array
                            if (!angular.isArray(actual)) {
                                result.pass = false;
                                result.message = 'Expected ' + actual + ' to be an array.';
                                return result;
                            }
                            // fail if inputs don't match expected format
                            if (!angular.isObject(inputs) || !angular.isDefined(inputs.expectedItem)) {
                                result.pass = false;
                                result.message = 'Expected ' + inputs + ' to have expectedItem property.';
                                return result;
                            }
                            result.message = 'Expected ' + actual + ' to contain item ' + inputs.expectedItem;
                            if (typeof inputs.comparator !== 'function') {
                                comparator = function (actual, expected) {
                                    return actual === expected;
                                };
                            } else {
                                comparator = inputs.comparator;
                            }
                            length = actual.length;
                            expectedItem = inputs.expectedItem;
                            result.pass = false;
                            for (i = 0; i < length; i++) {
                                actualItem = actual[i];
                                if (comparator(actualItem, expectedItem)) {
                                    result.pass = true;
                                    return result;
                                }
                            }
                            return result;
                        }
                    };
                }
            };

            _export('default', CustomMatchers);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkN1c3RvbU1hdGNoZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxJQUFJLFVBQVUsU0FBUzs7Ozs7Ozs7OztJQVVuQzs7SUFFQSxJQUhFO0lBSUYsT0FBTztRQUNILFNBQVM7UUFDVCxTQUFTLFlBQVk7WUFOdkIsaUJBQWlCOzs7Ozs7Ozs7OztnQkFXbkIsaUJBQWlCLFlBQVc7b0JBQ3hCLE9BQU87d0JBQ0gsU0FBUyxVQUFTLFFBQVEsVUFBVTs0QkFDaEMsSUFBSSxTQUFTOzs7NEJBR2IsT0FBTyxPQUFPLFFBQVEsT0FBTyxRQUFROzRCQUNyQyxPQUFPOzs7Ozs7Ozs7Ozs7OztnQkFjbkIsb0JBQW9CLFlBQVc7b0JBQzNCLE9BQU87d0JBQ0gsU0FBUyxVQUFTLFFBQVEsUUFBUTs0QkFDOUIsSUFBSSxTQUFTO2dDQUNUO2dDQUNBO2dDQUFHO2dDQUNIO2dDQUNBOzs0QkFFSixJQUFJLENBQUMsUUFBUSxRQUFRLFNBQVM7Z0NBQzFCLE9BQU8sT0FBTztnQ0FDZCxPQUFPLFVBQVUsY0FBYyxTQUFTO2dDQUN4QyxPQUFPOzs7NEJBR1gsSUFBSSxDQUFDLFFBQVEsU0FBUyxXQUFXLENBQUMsUUFBUSxVQUFVLE9BQU8sZUFBZTtnQ0FDdEUsT0FBTyxPQUFPO2dDQUNkLE9BQU8sVUFBVSxjQUFjLFNBQVM7Z0NBQ3hDLE9BQU87OzRCQUVYLE9BQU8sVUFBVSxjQUFjLFNBQVMsc0JBQXNCLE9BQU87NEJBQ3JFLElBQUksT0FBTyxPQUFPLGVBQWUsWUFBWTtnQ0FDekMsYUFBYSxVQUFTLFFBQVEsVUFBVTtvQ0FDcEMsT0FBTyxXQUFXOzttQ0FFbkI7Z0NBQ0gsYUFBYSxPQUFPOzs0QkFFeEIsU0FBUyxPQUFPOzRCQUNoQixlQUFlLE9BQU87NEJBQ3RCLE9BQU8sT0FBTzs0QkFDZCxLQUFLLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSztnQ0FDekIsYUFBYSxPQUFPO2dDQUNwQixJQUFJLFdBQVcsWUFBWSxlQUFlO29DQUN0QyxPQUFPLE9BQU87b0NBQ2QsT0FBTzs7OzRCQUdmLE9BQU87Ozs7OztZQWNYLFFBQVEsV0FSTDs7O0dBV1oiLCJmaWxlIjoiQ3VzdG9tTWF0Y2hlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhlIFNhaWxQb2ludC5DdXN0b21NYXRjaGVycyBvYmplY3QgY29udGFpbnMgY3VzdG9tIGphc21pbmUgbWF0Y2hlcnMgdGhhdCBjYW5cclxuICogYmUgdXNlZCBieSBtYW55IHRlc3RzLiAgVG8gdXNlIHRoZXNlIGluIGEgdGVzdCwgYWRkIHRoZW0gaW4gYSBiZWZvcmVFYWNoKClcclxuICogZnVuY3Rpb24uICBFeGFtcGxlOlxyXG4gKlxyXG4gKiAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAqICAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMoU2FpbFBvaW50LkN1c3RvbU1hdGNoZXJzKTtcclxuICogICB9KTtcclxuICovXHJcbmNvbnN0IEN1c3RvbU1hdGNoZXJzID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWF0Y2hlciB0byBjb21wYXJlIHRoYXQgYW4gJGh0dHAgR0VUIHJlc3BvbnNlIGVxdWFscyBhbiBleHBlY3RlZCByZXNwb25zZS5cclxuICAgICAqXHJcbiAgICAgKiB1c2FnZTpcclxuICAgICAqIGV4cGVjdChhY3R1YWwpLnRvRXF1YWxSZXNwb25zZShleHBlY3RlZCk7XHJcbiAgICAgKlxyXG4gICAgICogYWN0dWFsLSB0aGUgcmVzcG9uc2UgcmV0dXJuZWQgZnJvbSAkaHR0cCBHRVRcclxuICAgICAqIGV4cGVjdGVkLSB0aGUgcmVzcG9uc2UgdGhhdCBzaG91bGQgaGF2ZSBiZWVuIHJldHVybmVkIHRvIHBhc3MgdGhlIHRlc3RcclxuICAgICAqL1xyXG4gICAgdG9FcXVhbFJlc3BvbnNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgYW5ndWxhci5lcXVhbHMoKSBzaW5jZSB0aGlzIGlnbm9yZXMgcHJvcGVydGllcyB0aGF0XHJcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB3aXRoICQgKGllIC0gJHByb21pc2UgYW5kICRyZXNvbHZlZCkuXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucGFzcyA9IGFuZ3VsYXIuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXRjaGVyIHRvIHNlZSBpZiBhbiBpdGVtIGlzIGluIGFuIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIGV4cGVjdChhY3R1YWwpLnRvRXF1YWxSZXNwb25zZShpbnB1dHMpO1xyXG4gICAgICpcclxuICAgICAqIGFjdHVhbC0gdGhlIEFycmF5IHRvIGNoZWNrLCB3aWxsIGZhaWwgaWYgbm90IGFuIGFycmF5XHJcbiAgICAgKiBpbnB1dHMtIGFuIG9iamVjdCB3aXRoIHR3byBrZXlzLCBleHBlY3RlZEl0ZW0tIHRoZSBpdGVtIHRoYXQgc2hvdWxkIGJlIGluIHRoZSBhcnJheSAocmVxdWlyZWQpXHJcbiAgICAgKiAgICAgICAgIGFuZCBjb21wYXJhdG9yLSB0aGUgZnVuY3Rpb24gdG8gY29tcGFyZSB0aGUgaXRlbXMgaW4gdGhlIGFycmF5IHdpdGggdGhlIGV4cGVjdGVkIGl0ZW1cclxuICAgICAqICAgICAgICAgZGVmYXVsdHMgdG8gb2JqZWN0IGVxdWFsaXR5LCA9PT1cclxuICAgICAqL1xyXG4gICAgYXJyYXlUb0NvbnRhaW5JdGVtOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWwsIGlucHV0cykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICBpLCBhY3R1YWxJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkSXRlbSxcclxuICAgICAgICAgICAgICAgICAgICBjb21wYXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgLy8gZmFpbCBpZiBhY3R1YWwgaXMgbm90IGFycmF5XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheShhY3R1YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnBhc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVzc2FnZSA9ICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhbiBhcnJheS4nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBmYWlsIGlmIGlucHV0cyBkb24ndCBtYXRjaCBleHBlY3RlZCBmb3JtYXRcclxuICAgICAgICAgICAgICAgIGlmICghYW5ndWxhci5pc09iamVjdChpbnB1dHMpIHx8ICFhbmd1bGFyLmlzRGVmaW5lZChpbnB1dHMuZXhwZWN0ZWRJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wYXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSAnRXhwZWN0ZWQgJyArIGlucHV0cyArICcgdG8gaGF2ZSBleHBlY3RlZEl0ZW0gcHJvcGVydHkuJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gY29udGFpbiBpdGVtICcgKyBpbnB1dHMuZXhwZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dHMuY29tcGFyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmF0b3IgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3R1YWwgPT09IGV4cGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmF0b3IgPSBpbnB1dHMuY29tcGFyYXRvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IGFjdHVhbC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZEl0ZW0gPSBpbnB1dHMuZXhwZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnBhc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdHVhbEl0ZW0gPSBhY3R1YWxbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmF0b3IoYWN0dWFsSXRlbSwgZXhwZWN0ZWRJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucGFzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21NYXRjaGVycztcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
