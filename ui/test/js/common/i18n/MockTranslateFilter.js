System.register(['test/js/TestInitializer', 'common/i18n/i18nModule'], function (_export) {
    'use strict';

    var i18nModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonI18nI18nModule) {
            i18nModule = _commonI18nI18nModule['default'];
        }],
        execute: function () {

            angular.module(i18nModule).

            /**
             * Decorate the spTranslateFilter to allow mocking out a message catalog.  This is done by calling
             * spTranslateFilter.configureCatalog() in your test code.
             */
            config(["$provide", function ($provide) {
                $provide.decorator('spTranslateFilter', ["$delegate", function ($delegate) {

                    /**
                     * @private
                     * @property {Object}  The catalog with the mocked messages.  See configureCatalog() for
                     *     more information.
                     */
                    var catalog;

                    /**
                     * A decorator function that allows mocking out behavior of the translate filter.  If a
                     * mocked catalog is not present or the requested key is not in the mocked catalog, this
                     * just delegates to the normal spTranslateFilter.  Otherwise, the value is returned from
                     * the mocked catalog.  See configureCatalog() for information on how to set up the mock
                     * catalog.
                     *
                     * @param {String} key  The message key to translate.
                     */
                    function newFilter(key) {
                        var val, args;

                        if (!key) {
                            return '';
                        }

                        // If the catalog is not configured or the key isn't in there, just delegate to the real filter.
                        if (!catalog || !catalog[key]) {
                            args = getArgs(key, arguments);
                            return $delegate.apply(null, args);
                        }

                        val = catalog[key];

                        // If the value is a function, invoke it.
                        if (angular.isFunction(val)) {
                            return val(arguments);
                        }

                        // If this is a string and there are arguments, format it.
                        if (angular.isString(val) && arguments.length > 1) {
                            // Grab all of the arguments minus the key and add the string as the first arg.
                            args = getArgs(val, arguments);
                            return format.apply(null, args);
                        }

                        // Not a string with arguments or function, just return the value from the catalog.
                        return val;
                    }

                    /**
                     * Return an array of arguments that begin with the given firstArg and has the second and
                     * beyond arguments from the args param.
                     *
                     * @param {Object} firstArg  The first argument to include in the array.
                     * @param {Arguments} args   The arguments from which to retrieve the additional args.
                     *
                     * @return {Array} An array of arguments.
                     */
                    function getArgs(firstArg, args) {
                        var fullArguments = args.length > 1 ? Array.prototype.slice.call(args, 1) : [];
                        fullArguments.splice(0, 0, firstArg);
                        return fullArguments;
                    }

                    /**
                     * Format the given string using the remaining arguments as replacement variables.
                     * This expects the string to use a sprintf format (eg - 'hello {0}').
                     *
                     * @param {String} str  The string to replace.
                     * @param {Object} arg1...argN  The arguments to replace.
                     *
                     * @return {String} A string with values replaced.
                     */
                    function format(str) {
                        var args = arguments;
                        return str.replace(/{(\d+)}/g, function (match, number) {
                            // The first arg is the string, so add 1 to the arg number.
                            var idx = parseInt(number) + 1;
                            return typeof args[idx] !== 'undefined' ? args[idx] : match;
                        });
                    }

                    /**
                     * Configure the spTranslateFilter to return the given messages for the
                     * given keys.
                     *
                     * @param {Object} cat  An object with key/values of the message key and
                     *    message text to be displayed for the key.  The value may also be a function
                     *    that will be invoked with the arguments passed to the translate filter.
                     */
                    newFilter.configureCatalog = function (cat) {
                        catalog = cat;
                    };

                    /**
                     * Configure the spTranslateFilter to return the given message for the
                     * given keys
                     *
                     * @param {String} key  The key of the message.
                     * @param {String | Function} value  The message key text or a function that will
                     *    be invoked with the arguments passed to the translate filter.
                     */
                    newFilter.addMessage = function (key, value) {
                        if (!catalog) {
                            catalog = {};
                        }

                        catalog[key] = value;
                    };

                    return newFilter;
                }]);
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFDdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUw3QixRQUFRLE9BQU87Ozs7OztZQU1mLG9CQUFPLFVBQVMsVUFBVTtnQkFDdEIsU0FBUyxVQUFVLG1DQUFxQixVQUFTLFdBQVc7Ozs7Ozs7b0JBT3hELElBQUk7Ozs7Ozs7Ozs7O29CQVlKLFNBQVMsVUFBVSxLQUFLO3dCQUNwQixJQUFJLEtBQUs7O3dCQUVULElBQUksQ0FBQyxLQUFLOzRCQUNOLE9BQU87Ozs7d0JBSVgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLE1BQU07NEJBQzNCLE9BQU8sUUFBUSxLQUFLOzRCQUNwQixPQUFPLFVBQVUsTUFBTSxNQUFNOzs7d0JBR2pDLE1BQU0sUUFBUTs7O3dCQUdkLElBQUksUUFBUSxXQUFXLE1BQU07NEJBQ3pCLE9BQU8sSUFBSTs7Ozt3QkFJZixJQUFJLFFBQVEsU0FBUyxRQUFTLFVBQVUsU0FBUyxHQUFJOzs0QkFFakQsT0FBTyxRQUFRLEtBQUs7NEJBQ3BCLE9BQU8sT0FBTyxNQUFNLE1BQU07Ozs7d0JBSTlCLE9BQU87Ozs7Ozs7Ozs7OztvQkFZWCxTQUFTLFFBQVEsVUFBVSxNQUFNO3dCQUM3QixJQUFJLGdCQUFpQixLQUFLLFNBQVMsSUFBSyxNQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSzt3QkFDOUUsY0FBYyxPQUFPLEdBQUcsR0FBRzt3QkFDM0IsT0FBTzs7Ozs7Ozs7Ozs7O29CQVlYLFNBQVMsT0FBTyxLQUFLO3dCQUNqQixJQUFJLE9BQU87d0JBQ1gsT0FBTyxJQUFJLFFBQVEsWUFBWSxVQUFTLE9BQU8sUUFBUTs7NEJBRW5ELElBQUksTUFBTSxTQUFTLFVBQVU7NEJBQzdCLE9BQU8sT0FBTyxLQUFLLFNBQVMsY0FBYyxLQUFLLE9BQU87Ozs7Ozs7Ozs7OztvQkFZOUQsVUFBVSxtQkFBbUIsVUFBUyxLQUFLO3dCQUN2QyxVQUFVOzs7Ozs7Ozs7OztvQkFXZCxVQUFVLGFBQWEsVUFBUyxLQUFLLE9BQU87d0JBQ3hDLElBQUksQ0FBQyxTQUFTOzRCQUNWLFVBQVU7Ozt3QkFHZCxRQUFRLE9BQU87OztvQkFHbkIsT0FBTzs7Ozs7R0FXWiIsImZpbGUiOiJjb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpMThuTW9kdWxlIGZyb20gJ2NvbW1vbi9pMThuL2kxOG5Nb2R1bGUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoaTE4bk1vZHVsZSkuXHJcblxyXG4vKipcclxuICogRGVjb3JhdGUgdGhlIHNwVHJhbnNsYXRlRmlsdGVyIHRvIGFsbG93IG1vY2tpbmcgb3V0IGEgbWVzc2FnZSBjYXRhbG9nLiAgVGhpcyBpcyBkb25lIGJ5IGNhbGxpbmdcclxuICogc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZygpIGluIHlvdXIgdGVzdCBjb2RlLlxyXG4gKi9cclxuY29uZmlnKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJ3NwVHJhbnNsYXRlRmlsdGVyJywgZnVuY3Rpb24oJGRlbGVnYXRlKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtPYmplY3R9ICBUaGUgY2F0YWxvZyB3aXRoIHRoZSBtb2NrZWQgbWVzc2FnZXMuICBTZWUgY29uZmlndXJlQ2F0YWxvZygpIGZvclxyXG4gICAgICAgICAqICAgICBtb3JlIGluZm9ybWF0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBjYXRhbG9nO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBkZWNvcmF0b3IgZnVuY3Rpb24gdGhhdCBhbGxvd3MgbW9ja2luZyBvdXQgYmVoYXZpb3Igb2YgdGhlIHRyYW5zbGF0ZSBmaWx0ZXIuICBJZiBhXHJcbiAgICAgICAgICogbW9ja2VkIGNhdGFsb2cgaXMgbm90IHByZXNlbnQgb3IgdGhlIHJlcXVlc3RlZCBrZXkgaXMgbm90IGluIHRoZSBtb2NrZWQgY2F0YWxvZywgdGhpc1xyXG4gICAgICAgICAqIGp1c3QgZGVsZWdhdGVzIHRvIHRoZSBub3JtYWwgc3BUcmFuc2xhdGVGaWx0ZXIuICBPdGhlcndpc2UsIHRoZSB2YWx1ZSBpcyByZXR1cm5lZCBmcm9tXHJcbiAgICAgICAgICogdGhlIG1vY2tlZCBjYXRhbG9nLiAgU2VlIGNvbmZpZ3VyZUNhdGFsb2coKSBmb3IgaW5mb3JtYXRpb24gb24gaG93IHRvIHNldCB1cCB0aGUgbW9ja1xyXG4gICAgICAgICAqIGNhdGFsb2cuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5ICBUaGUgbWVzc2FnZSBrZXkgdG8gdHJhbnNsYXRlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIG5ld0ZpbHRlcihrZXkpIHtcclxuICAgICAgICAgICAgdmFyIHZhbCwgYXJncztcclxuXHJcbiAgICAgICAgICAgIGlmICgha2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjYXRhbG9nIGlzIG5vdCBjb25maWd1cmVkIG9yIHRoZSBrZXkgaXNuJ3QgaW4gdGhlcmUsIGp1c3QgZGVsZWdhdGUgdG8gdGhlIHJlYWwgZmlsdGVyLlxyXG4gICAgICAgICAgICBpZiAoIWNhdGFsb2cgfHwgIWNhdGFsb2dba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgYXJncyA9IGdldEFyZ3Moa2V5LCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZS5hcHBseShudWxsLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsID0gY2F0YWxvZ1trZXldO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdC5cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBzdHJpbmcgYW5kIHRoZXJlIGFyZSBhcmd1bWVudHMsIGZvcm1hdCBpdC5cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsKSAmJiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHcmFiIGFsbCBvZiB0aGUgYXJndW1lbnRzIG1pbnVzIHRoZSBrZXkgYW5kIGFkZCB0aGUgc3RyaW5nIGFzIHRoZSBmaXJzdCBhcmcuXHJcbiAgICAgICAgICAgICAgICBhcmdzID0gZ2V0QXJncyh2YWwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOb3QgYSBzdHJpbmcgd2l0aCBhcmd1bWVudHMgb3IgZnVuY3Rpb24sIGp1c3QgcmV0dXJuIHRoZSB2YWx1ZSBmcm9tIHRoZSBjYXRhbG9nLlxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJuIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0aGF0IGJlZ2luIHdpdGggdGhlIGdpdmVuIGZpcnN0QXJnIGFuZCBoYXMgdGhlIHNlY29uZCBhbmRcclxuICAgICAgICAgKiBiZXlvbmQgYXJndW1lbnRzIGZyb20gdGhlIGFyZ3MgcGFyYW0uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZmlyc3RBcmcgIFRoZSBmaXJzdCBhcmd1bWVudCB0byBpbmNsdWRlIGluIHRoZSBhcnJheS5cclxuICAgICAgICAgKiBAcGFyYW0ge0FyZ3VtZW50c30gYXJncyAgIFRoZSBhcmd1bWVudHMgZnJvbSB3aGljaCB0byByZXRyaWV2ZSB0aGUgYWRkaXRpb25hbCBhcmdzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGFyZ3VtZW50cy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRBcmdzKGZpcnN0QXJnLCBhcmdzKSB7XHJcbiAgICAgICAgICAgIHZhciBmdWxsQXJndW1lbnRzID0gKGFyZ3MubGVuZ3RoID4gMSkgPyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAxKSA6IFtdO1xyXG4gICAgICAgICAgICBmdWxsQXJndW1lbnRzLnNwbGljZSgwLCAwLCBmaXJzdEFyZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdWxsQXJndW1lbnRzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybWF0IHRoZSBnaXZlbiBzdHJpbmcgdXNpbmcgdGhlIHJlbWFpbmluZyBhcmd1bWVudHMgYXMgcmVwbGFjZW1lbnQgdmFyaWFibGVzLlxyXG4gICAgICAgICAqIFRoaXMgZXhwZWN0cyB0aGUgc3RyaW5nIHRvIHVzZSBhIHNwcmludGYgZm9ybWF0IChlZyAtICdoZWxsbyB7MH0nKS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgIFRoZSBzdHJpbmcgdG8gcmVwbGFjZS5cclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJnMS4uLmFyZ04gIFRoZSBhcmd1bWVudHMgdG8gcmVwbGFjZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gQSBzdHJpbmcgd2l0aCB2YWx1ZXMgcmVwbGFjZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0KHN0cikge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC97KFxcZCspfS9nLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZmlyc3QgYXJnIGlzIHRoZSBzdHJpbmcsIHNvIGFkZCAxIHRvIHRoZSBhcmcgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IHBhcnNlSW50KG51bWJlcikgKyAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW2lkeF0gIT09ICd1bmRlZmluZWQnID8gYXJnc1tpZHhdIDogbWF0Y2g7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29uZmlndXJlIHRoZSBzcFRyYW5zbGF0ZUZpbHRlciB0byByZXR1cm4gdGhlIGdpdmVuIG1lc3NhZ2VzIGZvciB0aGVcclxuICAgICAgICAgKiBnaXZlbiBrZXlzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNhdCAgQW4gb2JqZWN0IHdpdGgga2V5L3ZhbHVlcyBvZiB0aGUgbWVzc2FnZSBrZXkgYW5kXHJcbiAgICAgICAgICogICAgbWVzc2FnZSB0ZXh0IHRvIGJlIGRpc3BsYXllZCBmb3IgdGhlIGtleS4gIFRoZSB2YWx1ZSBtYXkgYWxzbyBiZSBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICogICAgdGhhdCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgdHJhbnNsYXRlIGZpbHRlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBuZXdGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyA9IGZ1bmN0aW9uKGNhdCkge1xyXG4gICAgICAgICAgICBjYXRhbG9nID0gY2F0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbmZpZ3VyZSB0aGUgc3BUcmFuc2xhdGVGaWx0ZXIgdG8gcmV0dXJuIHRoZSBnaXZlbiBtZXNzYWdlIGZvciB0aGVcclxuICAgICAgICAgKiBnaXZlbiBrZXlzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5ICBUaGUga2V5IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nIHwgRnVuY3Rpb259IHZhbHVlICBUaGUgbWVzc2FnZSBrZXkgdGV4dCBvciBhIGZ1bmN0aW9uIHRoYXQgd2lsbFxyXG4gICAgICAgICAqICAgIGJlIGludm9rZWQgd2l0aCB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgdHJhbnNsYXRlIGZpbHRlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBuZXdGaWx0ZXIuYWRkTWVzc2FnZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCFjYXRhbG9nKSB7XHJcbiAgICAgICAgICAgICAgICBjYXRhbG9nID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhdGFsb2dba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdGaWx0ZXI7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
