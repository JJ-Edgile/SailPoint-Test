System.register(['angular', 'common/search/SearchModule'], function (_export) {
    'use strict';

    var angular, searchModule;
    return {
        setters: [function (_angular) {
            angular = _angular['default'];
        }, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {

            angular.module(searchModule).

            /**
             * A service to help with unit tests that use ListResultDTOs.
             */
            factory('listResultTestService', ["ListResultDTO", function (ListResultDTO) {

                var svc = {};

                /**
                 * Create a ListResultDTO with the given items.
                 *
                 * @param {Number} start  The zero-based start index.
                 * @param {Number} num  The number of results to include in the ListResultDTO.
                 * @param {Number} total  The total number of results.
                 */
                svc.createResult = function (start, num, total) {
                    var objects = [],
                        i;

                    for (i = start; i < start + num; i++) {
                        objects.push(i);
                    }

                    return new ListResultDTO({
                        count: total,
                        objects: objects
                    });
                };

                return svc;
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvTGlzdFJlc3VsdFRlc3RTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLFdBQVcsK0JBQStCLFVBQVUsU0FBUztJQUE5RTs7SUFHSSxJQUFJLFNBQVM7SUFDYixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsVUFBVTtZQUMxQixVQUFVLFNBQVM7V0FDcEIsVUFBVSwyQkFBMkI7WUFDcEMsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsUUFBUSxPQUFPOzs7OztZQUtmLFFBQVEsMkNBQXlCLFVBQVMsZUFBZTs7Z0JBRXJELElBQUksTUFBTTs7Ozs7Ozs7O2dCQVNWLElBQUksZUFBZSxVQUFTLE9BQU8sS0FBSyxPQUFPO29CQUMzQyxJQUFJLFVBQVU7d0JBQ1Y7O29CQUVKLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxLQUFLLEtBQUs7d0JBQ2xDLFFBQVEsS0FBSzs7O29CQUdqQixPQUFPLElBQUksY0FBYzt3QkFDckIsT0FBTzt3QkFDUCxTQUFTOzs7O2dCQUlqQixPQUFPOzs7O0dBV1IiLCJmaWxlIjoiY29tbW9uL3NlYXJjaC9MaXN0UmVzdWx0VGVzdFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJztcclxuaW1wb3J0IHNlYXJjaE1vZHVsZSBmcm9tICdjb21tb24vc2VhcmNoL1NlYXJjaE1vZHVsZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShzZWFyY2hNb2R1bGUpLlxyXG5cclxuLyoqXHJcbiAqIEEgc2VydmljZSB0byBoZWxwIHdpdGggdW5pdCB0ZXN0cyB0aGF0IHVzZSBMaXN0UmVzdWx0RFRPcy5cclxuICovXHJcbmZhY3RvcnkoJ2xpc3RSZXN1bHRUZXN0U2VydmljZScsIGZ1bmN0aW9uKExpc3RSZXN1bHREVE8pIHtcclxuXHJcbiAgICB2YXIgc3ZjID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBMaXN0UmVzdWx0RFRPIHdpdGggdGhlIGdpdmVuIGl0ZW1zLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAgVGhlIHplcm8tYmFzZWQgc3RhcnQgaW5kZXguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtICBUaGUgbnVtYmVyIG9mIHJlc3VsdHMgdG8gaW5jbHVkZSBpbiB0aGUgTGlzdFJlc3VsdERUTy5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbCAgVGhlIHRvdGFsIG51bWJlciBvZiByZXN1bHRzLlxyXG4gICAgICovXHJcbiAgICBzdmMuY3JlYXRlUmVzdWx0ID0gZnVuY3Rpb24oc3RhcnQsIG51bSwgdG90YWwpIHtcclxuICAgICAgICB2YXIgb2JqZWN0cyA9IFtdLFxyXG4gICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IHN0YXJ0ICsgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgb2JqZWN0cy5wdXNoKGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0UmVzdWx0RFRPKHtcclxuICAgICAgICAgICAgY291bnQ6IHRvdGFsLFxyXG4gICAgICAgICAgICBvYmplY3RzOiBvYmplY3RzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBzdmM7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
