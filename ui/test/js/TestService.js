System.register([], function (_export) {
    'use strict';

    /**
     * The TestService provides common utilities to be used by unit tests.
     */
    function TestService($q) {

        var service = {};

        /**
         * This method is intended for encoding *key* or *value* parts of query component. We need a custom
         * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
         * encoded per http://tools.ietf.org/html/rfc3986:
         *    query       = *( pchar / "/" / "?" )
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         *
         *
         * NOTE: This was copied from angular.js.  Angular uses custom URI encoding when
         * issuing HTTP requests.  To test the mock $httpBackend, we need to check that
         * URLs are hit with certain query parameters.  This method can be used to
         * encode URI components included in query strings.
         */
        service.encodeUriQuery = function (val, pctEncodeSpaces) {
            return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
        };

        /**
         * Get the query parameter string value from the given FilterValue object
         * @param {FilterValue} filterValue The FilterValue object
         * @param {String} [prop] If defined, get this property off the FilterValue value
         * @returns {String} Query Parameter value of the FilterValue
         */
        service.getQueryParamString = function (filterValue, prop) {
            var paramValue = undefined;
            if (filterValue) {
                var newVal = angular.copy(filterValue);
                if (prop) {
                    if (angular.isArray(newVal.value)) {
                        newVal.value = newVal.value.map(function (val) {
                            return val[prop];
                        });
                    } else {
                        newVal.value = newVal.value[prop];
                    }
                }
                paramValue = service.encodeUriQuery(angular.toJson(newVal));
            }

            return paramValue;
        };

        /**
         * Create a promise that will be rejected if reject is true and resolved otherwise.
         *
         * @param {Boolean} reject  Whether to reject the promise or resolve it.
         * @param {Object} resolveData Object to resolve promise with if resolved
         * @param {Object} rejectData Object to reject with if rejected
         *
         * @return A promise that is rejected or resolved.
         */
        service.createPromise = function (reject, resolveData, rejectData) {
            var deferred = $q.defer();
            if (reject) {
                deferred.reject(rejectData);
            } else {
                deferred.resolve(resolveData);
            }
            return deferred.promise;
        };

        /**
         * Create a spy function that returns a promise that will be rejected if
         * reject is true and resolved otherwise.  The returned function also
         * has the following functions that can be called to change behavior:
         *
         *   o makeReject(boolean): Change whether the promise is rejected or resolved.
         *   o setResolveData(Object): Set the data to be returned if resolved.
         *   o setRejectData(Object): Set the data to be returne if rejected.
         *
         * @param {Boolean} reject  Whether to reject the promise or resolve it.
         * @param {Object} resolveData  The data to return when responding.
         * @param {Object} rejectData  The data to return when rejecting.
         *
         * @return A function that returns a promise that is rejected or resolved.
         */
        service.createPromiseSpy = function (reject, resolveData, rejectData) {
            var spy = jasmine.createSpy(),
                self = this;

            /**
             * Add a property that tells the spy whether to reject or not.
             */
            spy.reject = reject;

            /**
             * The data to be passed to the resolve() method if resolving.
             */
            spy.resolveData = resolveData;

            /**
             * The data to be passed to the reject() method if rejecting.
             */
            spy.rejectData = rejectData;

            spy.deferred = $q.defer();

            /**
             * Set whether the promise returned by this function rejects or resolves.
             *
             * @param {Boolean} reject  Whether to reject or resolve the promise.
             */
            spy.makeReject = function (reject) {
                spy.reject = reject;
            };

            /**
             * Set the data to be passed to the resolve() method if resolving.
             */
            spy.setResolveData = function (data) {
                spy.resolveData = data;
            };

            /**
             * Set the data to be passed to the reject() method if rejecting.
             */
            spy.setRejectData = function (data) {
                spy.rejectData = data;
            };

            return spy.and.callFake(function () {
                return self.createPromise(spy.reject, spy.resolveData, spy.rejectData);
            });
        };

        /**
         * A success response to return from createResponseXX() methods.  This
         * can be manipulated by the caller.
         */
        service.response = {
            status: 200,
            data: {}
        };

        /**
         * An error response to return from createResponseXX() methods.  This
         * can be manipulated by the caller.
         */
        service.errorResponse = {
            status: 500,
            data: {
                message: 'Shut her down Clancy ... she\'s pumping mud!'
            }
        };

        /**
         * Create a promise that either resolves or rejects a successful HTTP
         * response or error HTTP response.
         *
         * @param {Boolean} reject  Reject the promise if true.
         */
        service.createResponsePromise = function (reject) {
            var deferred = $q.defer();
            if (reject) {
                deferred.reject(service.errorResponse);
            } else {
                deferred.resolve(service.response);
            }
            return deferred.promise;
        };

        /**
         * Create a function that will return a promise that either resolves or
         * rejects a successful HTTP response or error HTTP response.
         *
         * @param {Boolean} reject  Reject the promise if true.
         */
        service.createResponseFunction = function (reject) {
            return function () {
                return service.createResponsePromise(reject);
            };
        };

        /**
         * Return a spy that gets called if the given promise succeeds.
         */
        service.spyOnSuccess = function (promise) {
            var spy = jasmine.createSpy();
            promise.then(spy);
            return spy;
        };

        /**
         * Return a spy that gets called if the given promise fails.
         */
        service.spyOnFailure = function (promise) {
            var spy = jasmine.createSpy();
            promise.then(null, spy);
            return spy;
        };

        return service;
    }

    return {
        setters: [],
        execute: function () {
            _export('default', TestService);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlc3RTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxJQUFJLFVBQVUsU0FBUztJQUF2Qzs7Ozs7SUFLQSxTQUFTLFlBQVksSUFBSTs7UUFFckIsSUFBSSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJkLFFBQVEsaUJBQWlCLFVBQVMsS0FBSyxpQkFBaUI7WUFDcEQsT0FBTyxtQkFBbUIsS0FDMUIsUUFBUSxTQUFTLEtBQ2pCLFFBQVEsU0FBUyxLQUNqQixRQUFRLFFBQVEsS0FDaEIsUUFBUSxTQUFTLEtBQ2pCLFFBQVEsUUFBUyxrQkFBa0IsUUFBUTs7Ozs7Ozs7O1FBUy9DLFFBQVEsc0JBQXNCLFVBQUMsYUFBYSxNQUFTO1lBQ2pELElBQUksYUFBVTtZQUNkLElBQUksYUFBYTtnQkFDYixJQUFJLFNBQVMsUUFBUSxLQUFLO2dCQUMxQixJQUFJLE1BQU07b0JBQ04sSUFBSSxRQUFRLFFBQVEsT0FBTyxRQUFRO3dCQUMvQixPQUFPLFFBQVEsT0FBTyxNQUFNLElBQUksVUFBQyxLQUFROzRCQUNyQyxPQUFPLElBQUk7OzJCQUVaO3dCQUNILE9BQU8sUUFBUSxPQUFPLE1BQU07OztnQkFHcEMsYUFBYSxRQUFRLGVBQWUsUUFBUSxPQUFPOzs7WUFHdkQsT0FBTzs7Ozs7Ozs7Ozs7O1FBWVgsUUFBUSxnQkFBZ0IsVUFBUyxRQUFRLGFBQWEsWUFBWTtZQUM5RCxJQUFJLFdBQVcsR0FBRztZQUNsQixJQUFJLFFBQVE7Z0JBQ1IsU0FBUyxPQUFPO21CQUVmO2dCQUNELFNBQVMsUUFBUTs7WUFFckIsT0FBTyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFrQnBCLFFBQVEsbUJBQW1CLFVBQVMsUUFBUSxhQUFhLFlBQVk7WUFDakUsSUFBSSxNQUFNLFFBQVE7Z0JBQ2QsT0FBTzs7Ozs7WUFLWCxJQUFJLFNBQVM7Ozs7O1lBS2IsSUFBSSxjQUFjOzs7OztZQUtsQixJQUFJLGFBQWE7O1lBRWpCLElBQUksV0FBVyxHQUFHOzs7Ozs7O1lBUWxCLElBQUksYUFBYSxVQUFTLFFBQVE7Z0JBQzlCLElBQUksU0FBUzs7Ozs7O1lBTWpCLElBQUksaUJBQWlCLFVBQVMsTUFBTTtnQkFDaEMsSUFBSSxjQUFjOzs7Ozs7WUFNdEIsSUFBSSxnQkFBZ0IsVUFBUyxNQUFNO2dCQUMvQixJQUFJLGFBQWE7OztZQUdyQixPQUFPLElBQUksSUFBSSxTQUFTLFlBQVc7Z0JBQy9CLE9BQU8sS0FBSyxjQUFjLElBQUksUUFBUSxJQUFJLGFBQWEsSUFBSTs7Ozs7Ozs7UUFRbkUsUUFBUSxXQUFXO1lBQ2YsUUFBUTtZQUNSLE1BQU07Ozs7Ozs7UUFPVixRQUFRLGdCQUFnQjtZQUNwQixRQUFRO1lBQ1IsTUFBTTtnQkFDRixTQUFTOzs7Ozs7Ozs7O1FBVWpCLFFBQVEsd0JBQXdCLFVBQVMsUUFBUTtZQUM3QyxJQUFJLFdBQVcsR0FBRztZQUNsQixJQUFJLFFBQVE7Z0JBQ1IsU0FBUyxPQUFPLFFBQVE7bUJBRXZCO2dCQUNELFNBQVMsUUFBUSxRQUFROztZQUU3QixPQUFPLFNBQVM7Ozs7Ozs7OztRQVNwQixRQUFRLHlCQUF5QixVQUFTLFFBQVE7WUFDOUMsT0FBTyxZQUFXO2dCQUNkLE9BQU8sUUFBUSxzQkFBc0I7Ozs7Ozs7UUFPN0MsUUFBUSxlQUFlLFVBQVMsU0FBUztZQUNyQyxJQUFJLE1BQU0sUUFBUTtZQUNsQixRQUFRLEtBQUs7WUFDYixPQUFPOzs7Ozs7UUFNWCxRQUFRLGVBQWUsVUFBUyxTQUFTO1lBQ3JDLElBQUksTUFBTSxRQUFRO1lBQ2xCLFFBQVEsS0FBSyxNQUFNO1lBQ25CLE9BQU87OztRQUdYLE9BQU87OztJQUpQLE9BQU87UUFDSCxTQUFTO1FBQ1QsU0FBUyxZQUFZO1lBQ2pCLFFBQVEsV0FJTDs7O0dBRFoiLCJmaWxlIjoiVGVzdFNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogVGhlIFRlc3RTZXJ2aWNlIHByb3ZpZGVzIGNvbW1vbiB1dGlsaXRpZXMgdG8gYmUgdXNlZCBieSB1bml0IHRlc3RzLlxyXG4gKi9cclxuZnVuY3Rpb24gVGVzdFNlcnZpY2UoJHEpIHtcclxuXHJcbiAgICB2YXIgc2VydmljZSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgaW50ZW5kZWQgZm9yIGVuY29kaW5nICprZXkqIG9yICp2YWx1ZSogcGFydHMgb2YgcXVlcnkgY29tcG9uZW50LiBXZSBuZWVkIGEgY3VzdG9tXHJcbiAgICAgKiBtZXRob2QgYmVjYXVzZSBlbmNvZGVVUklDb21wb25lbnQgaXMgdG9vIGFnZ3Jlc3NpdmUgYW5kIGVuY29kZXMgc3R1ZmYgdGhhdCBkb2Vzbid0IGhhdmUgdG8gYmVcclxuICAgICAqIGVuY29kZWQgcGVyIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODY6XHJcbiAgICAgKiAgICBxdWVyeSAgICAgICA9ICooIHBjaGFyIC8gXCIvXCIgLyBcIj9cIiApXHJcbiAgICAgKiAgICBwY2hhciAgICAgICAgID0gdW5yZXNlcnZlZCAvIHBjdC1lbmNvZGVkIC8gc3ViLWRlbGltcyAvIFwiOlwiIC8gXCJAXCJcclxuICAgICAqICAgIHVucmVzZXJ2ZWQgICAgPSBBTFBIQSAvIERJR0lUIC8gXCItXCIgLyBcIi5cIiAvIFwiX1wiIC8gXCJ+XCJcclxuICAgICAqICAgIHBjdC1lbmNvZGVkICAgPSBcIiVcIiBIRVhESUcgSEVYRElHXHJcbiAgICAgKiAgICBzdWItZGVsaW1zICAgID0gXCIhXCIgLyBcIiRcIiAvIFwiJlwiIC8gXCInXCIgLyBcIihcIiAvIFwiKVwiXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIC8gXCIqXCIgLyBcIitcIiAvIFwiLFwiIC8gXCI7XCIgLyBcIj1cIlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBOT1RFOiBUaGlzIHdhcyBjb3BpZWQgZnJvbSBhbmd1bGFyLmpzLiAgQW5ndWxhciB1c2VzIGN1c3RvbSBVUkkgZW5jb2Rpbmcgd2hlblxyXG4gICAgICogaXNzdWluZyBIVFRQIHJlcXVlc3RzLiAgVG8gdGVzdCB0aGUgbW9jayAkaHR0cEJhY2tlbmQsIHdlIG5lZWQgdG8gY2hlY2sgdGhhdFxyXG4gICAgICogVVJMcyBhcmUgaGl0IHdpdGggY2VydGFpbiBxdWVyeSBwYXJhbWV0ZXJzLiAgVGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgdG9cclxuICAgICAqIGVuY29kZSBVUkkgY29tcG9uZW50cyBpbmNsdWRlZCBpbiBxdWVyeSBzdHJpbmdzLlxyXG4gICAgICovXHJcbiAgICBzZXJ2aWNlLmVuY29kZVVyaVF1ZXJ5ID0gZnVuY3Rpb24odmFsLCBwY3RFbmNvZGVTcGFjZXMpIHtcclxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXHJcbiAgICAgICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cclxuICAgICAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cclxuICAgICAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXHJcbiAgICAgICAgcmVwbGFjZSgvJTIwL2csIChwY3RFbmNvZGVTcGFjZXMgPyAnJTIwJyA6ICcrJykpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgcXVlcnkgcGFyYW1ldGVyIHN0cmluZyB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBGaWx0ZXJWYWx1ZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7RmlsdGVyVmFsdWV9IGZpbHRlclZhbHVlIFRoZSBGaWx0ZXJWYWx1ZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbcHJvcF0gSWYgZGVmaW5lZCwgZ2V0IHRoaXMgcHJvcGVydHkgb2ZmIHRoZSBGaWx0ZXJWYWx1ZSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gUXVlcnkgUGFyYW1ldGVyIHZhbHVlIG9mIHRoZSBGaWx0ZXJWYWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcgPSAoZmlsdGVyVmFsdWUsIHByb3ApID0+IHtcclxuICAgICAgICBsZXQgcGFyYW1WYWx1ZTtcclxuICAgICAgICBpZiAoZmlsdGVyVmFsdWUpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IGFuZ3VsYXIuY29weShmaWx0ZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChwcm9wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG5ld1ZhbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdWYWwudmFsdWUgPSBuZXdWYWwudmFsdWUubWFwKCh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbFtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnZhbHVlID0gbmV3VmFsLnZhbHVlW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcmFtVmFsdWUgPSBzZXJ2aWNlLmVuY29kZVVyaVF1ZXJ5KGFuZ3VsYXIudG9Kc29uKG5ld1ZhbCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtVmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgcmVqZWN0ZWQgaWYgcmVqZWN0IGlzIHRydWUgYW5kIHJlc29sdmVkIG90aGVyd2lzZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlamVjdCAgV2hldGhlciB0byByZWplY3QgdGhlIHByb21pc2Ugb3IgcmVzb2x2ZSBpdC5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvbHZlRGF0YSBPYmplY3QgdG8gcmVzb2x2ZSBwcm9taXNlIHdpdGggaWYgcmVzb2x2ZWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWplY3REYXRhIE9iamVjdCB0byByZWplY3Qgd2l0aCBpZiByZWplY3RlZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gQSBwcm9taXNlIHRoYXQgaXMgcmVqZWN0ZWQgb3IgcmVzb2x2ZWQuXHJcbiAgICAgKi9cclxuICAgIHNlcnZpY2UuY3JlYXRlUHJvbWlzZSA9IGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZURhdGEsIHJlamVjdERhdGEpIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgIGlmIChyZWplY3QpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHJlamVjdERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHZlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHNweSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZWplY3RlZCBpZlxyXG4gICAgICogcmVqZWN0IGlzIHRydWUgYW5kIHJlc29sdmVkIG90aGVyd2lzZS4gIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBhbHNvXHJcbiAgICAgKiBoYXMgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgY2FsbGVkIHRvIGNoYW5nZSBiZWhhdmlvcjpcclxuICAgICAqXHJcbiAgICAgKiAgIG8gbWFrZVJlamVjdChib29sZWFuKTogQ2hhbmdlIHdoZXRoZXIgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgb3IgcmVzb2x2ZWQuXHJcbiAgICAgKiAgIG8gc2V0UmVzb2x2ZURhdGEoT2JqZWN0KTogU2V0IHRoZSBkYXRhIHRvIGJlIHJldHVybmVkIGlmIHJlc29sdmVkLlxyXG4gICAgICogICBvIHNldFJlamVjdERhdGEoT2JqZWN0KTogU2V0IHRoZSBkYXRhIHRvIGJlIHJldHVybmUgaWYgcmVqZWN0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWplY3QgIFdoZXRoZXIgdG8gcmVqZWN0IHRoZSBwcm9taXNlIG9yIHJlc29sdmUgaXQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzb2x2ZURhdGEgIFRoZSBkYXRhIHRvIHJldHVybiB3aGVuIHJlc3BvbmRpbmcuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVqZWN0RGF0YSAgVGhlIGRhdGEgdG8gcmV0dXJuIHdoZW4gcmVqZWN0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgcmVqZWN0ZWQgb3IgcmVzb2x2ZWQuXHJcbiAgICAgKi9cclxuICAgIHNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweSA9IGZ1bmN0aW9uKHJlamVjdCwgcmVzb2x2ZURhdGEsIHJlamVjdERhdGEpIHtcclxuICAgICAgICB2YXIgc3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKSxcclxuICAgICAgICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZCBhIHByb3BlcnR5IHRoYXQgdGVsbHMgdGhlIHNweSB3aGV0aGVyIHRvIHJlamVjdCBvciBub3QuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3B5LnJlamVjdCA9IHJlamVjdDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGRhdGEgdG8gYmUgcGFzc2VkIHRvIHRoZSByZXNvbHZlKCkgbWV0aG9kIGlmIHJlc29sdmluZy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzcHkucmVzb2x2ZURhdGEgPSByZXNvbHZlRGF0YTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGRhdGEgdG8gYmUgcGFzc2VkIHRvIHRoZSByZWplY3QoKSBtZXRob2QgaWYgcmVqZWN0aW5nLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNweS5yZWplY3REYXRhID0gcmVqZWN0RGF0YTtcclxuXHJcbiAgICAgICAgc3B5LmRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB3aGV0aGVyIHRoZSBwcm9taXNlIHJldHVybmVkIGJ5IHRoaXMgZnVuY3Rpb24gcmVqZWN0cyBvciByZXNvbHZlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVqZWN0ICBXaGV0aGVyIHRvIHJlamVjdCBvciByZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNweS5tYWtlUmVqZWN0ID0gZnVuY3Rpb24ocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHNweS5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0IHRoZSBkYXRhIHRvIGJlIHBhc3NlZCB0byB0aGUgcmVzb2x2ZSgpIG1ldGhvZCBpZiByZXNvbHZpbmcuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3B5LnNldFJlc29sdmVEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBzcHkucmVzb2x2ZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB0aGUgZGF0YSB0byBiZSBwYXNzZWQgdG8gdGhlIHJlamVjdCgpIG1ldGhvZCBpZiByZWplY3RpbmcuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3B5LnNldFJlamVjdERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHNweS5yZWplY3REYXRhID0gZGF0YTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc3B5LmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY3JlYXRlUHJvbWlzZShzcHkucmVqZWN0LCBzcHkucmVzb2x2ZURhdGEsIHNweS5yZWplY3REYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHN1Y2Nlc3MgcmVzcG9uc2UgdG8gcmV0dXJuIGZyb20gY3JlYXRlUmVzcG9uc2VYWCgpIG1ldGhvZHMuICBUaGlzXHJcbiAgICAgKiBjYW4gYmUgbWFuaXB1bGF0ZWQgYnkgdGhlIGNhbGxlci5cclxuICAgICAqL1xyXG4gICAgc2VydmljZS5yZXNwb25zZSA9IHtcclxuICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICBkYXRhOiB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGVycm9yIHJlc3BvbnNlIHRvIHJldHVybiBmcm9tIGNyZWF0ZVJlc3BvbnNlWFgoKSBtZXRob2RzLiAgVGhpc1xyXG4gICAgICogY2FuIGJlIG1hbmlwdWxhdGVkIGJ5IHRoZSBjYWxsZXIuXHJcbiAgICAgKi9cclxuICAgIHNlcnZpY2UuZXJyb3JSZXNwb25zZSA9IHtcclxuICAgICAgICBzdGF0dXM6IDUwMCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTaHV0IGhlciBkb3duIENsYW5jeSAuLi4gc2hlXFwncyBwdW1waW5nIG11ZCEnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb3IgcmVqZWN0cyBhIHN1Y2Nlc3NmdWwgSFRUUFxyXG4gICAgICogcmVzcG9uc2Ugb3IgZXJyb3IgSFRUUCByZXNwb25zZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlamVjdCAgUmVqZWN0IHRoZSBwcm9taXNlIGlmIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlcnZpY2UuY3JlYXRlUmVzcG9uc2VQcm9taXNlID0gZnVuY3Rpb24ocmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgICAgICBpZiAocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChzZXJ2aWNlLmVycm9yUmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzZXJ2aWNlLnJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIHJldHVybiBhIHByb21pc2UgdGhhdCBlaXRoZXIgcmVzb2x2ZXMgb3JcclxuICAgICAqIHJlamVjdHMgYSBzdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2Ugb3IgZXJyb3IgSFRUUCByZXNwb25zZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlamVjdCAgUmVqZWN0IHRoZSBwcm9taXNlIGlmIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlcnZpY2UuY3JlYXRlUmVzcG9uc2VGdW5jdGlvbiA9IGZ1bmN0aW9uKHJlamVjdCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2UuY3JlYXRlUmVzcG9uc2VQcm9taXNlKHJlamVjdCk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBzcHkgdGhhdCBnZXRzIGNhbGxlZCBpZiB0aGUgZ2l2ZW4gcHJvbWlzZSBzdWNjZWVkcy5cclxuICAgICAqL1xyXG4gICAgc2VydmljZS5zcHlPblN1Y2Nlc3MgPSBmdW5jdGlvbihwcm9taXNlKSB7XHJcbiAgICAgICAgdmFyIHNweSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHNweSk7XHJcbiAgICAgICAgcmV0dXJuIHNweTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBzcHkgdGhhdCBnZXRzIGNhbGxlZCBpZiB0aGUgZ2l2ZW4gcHJvbWlzZSBmYWlscy5cclxuICAgICAqL1xyXG4gICAgc2VydmljZS5zcHlPbkZhaWx1cmUgPSBmdW5jdGlvbihwcm9taXNlKSB7XHJcbiAgICAgICAgdmFyIHNweSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKG51bGwsIHNweSk7XHJcbiAgICAgICAgcmV0dXJuIHNweTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHNlcnZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRlc3RTZXJ2aWNlO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
