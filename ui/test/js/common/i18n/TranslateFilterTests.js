System.register(['test/js/TestInitializer', 'common/i18n/i18nModule'], function (_export) {

    /**
     * Tests for the TranslateFilter.
     */
    'use strict';

    var i18nModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonI18nI18nModule) {
            i18nModule = _commonI18nI18nModule['default'];
        }],
        execute: function () {
            describe('TranslateFilter', function () {

                // The filter to test.
                var translateFilter;

                // Mock $translate service.
                var $translate;

                // Let the tests know we'll use the i18n module.
                beforeEach(module(i18nModule));

                /**
                 * Create a mock $translate service that will be used by the filter.
                 */
                beforeEach(module(function ($provide) {
                    // Create a mock translate.
                    $translate = {
                        instant: jasmine.createSpy(),

                        // These are required to make translate happy.
                        storageKey: function () {
                            return 'hi mom';
                        },
                        storage: function () {
                            return null;
                        },
                        preferredLanguage: function () {
                            return null;
                        }
                    };

                    // Provide the mock as the $translate service, so the filter will use it.
                    $provide.factory('$translate', function () {
                        return $translate;
                    });
                }));

                /**
                 * Get an instance of the filter to test with.
                 */
                beforeEach(inject(function (spTranslateFilter) {
                    translateFilter = spTranslateFilter;
                }));

                /**
                 * Verify that the $translate service was called to translate the given
                 * message key and parameters.
                 *
                 * @param {String} key       The expected message key.
                 * @param {Object} [params]  An optional object containing the expected
                 *    variables that are passed to the translate call.
                 */
                var checkTranslate = function (key, params) {
                    var args = $translate.instant.calls.mostRecent().args,
                        actualKey = args[0],
                        actualParams = args[1],
                        actualValue;

                    expect($translate.instant).toHaveBeenCalled();
                    expect(key).toEqual(actualKey);

                    if (params) {
                        expect(actualParams).toBeDefined();

                        angular.forEach(params, function (paramVal, paramKey) {
                            actualValue = actualParams[paramKey];
                            expect(actualValue).toBeDefined();
                            expect(actualValue).toEqual(paramVal);
                        });
                    } else {
                        expect(actualParams).not.toBeDefined();
                    }
                };

                it('translates messages without params', function () {
                    var MSG = 'test_msg';
                    translateFilter(MSG);
                    checkTranslate(MSG);
                });

                it('translates messages with params', function () {
                    var MSG = 'test_msg {0} foo {1}';
                    translateFilter(MSG, 'hi', 'mom');
                    checkTranslate(MSG, {
                        var0: 'hi',
                        var1: 'mom'
                    });
                });

                it('does not translate a dangerous expression', function () {
                    var message = 'i am bad {{ alert() }}';
                    translateFilter(message);
                    expect($translate.instant).not.toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pMThuL1RyYW5zbGF0ZUZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsVUFBVSxTQUFTOzs7OztJQUt0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxtQkFBbUIsWUFBVzs7O2dCQUduQyxJQUFJOzs7Z0JBR0osSUFBSTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLFVBQVU7O29CQUVqQyxhQUFhO3dCQUNULFNBQVMsUUFBUTs7O3dCQUdqQixZQUFZLFlBQVc7NEJBQUUsT0FBTzs7d0JBQ2hDLFNBQVMsWUFBVzs0QkFBRSxPQUFPOzt3QkFDN0IsbUJBQW1CLFlBQVc7NEJBQUUsT0FBTzs7Ozs7b0JBSTNDLFNBQVMsUUFBUSxjQUFjLFlBQVc7d0JBQ3RDLE9BQU87Ozs7Ozs7Z0JBT2YsV0FBVyxPQUFPLFVBQVMsbUJBQW1CO29CQUMxQyxrQkFBa0I7Ozs7Ozs7Ozs7O2dCQVl0QixJQUFJLGlCQUFpQixVQUFTLEtBQUssUUFBUTtvQkFDdkMsSUFBSSxPQUFPLFdBQVcsUUFBUSxNQUFNLGFBQWE7d0JBQzdDLFlBQVksS0FBSzt3QkFDakIsZUFBZSxLQUFLO3dCQUNwQjs7b0JBRUosT0FBTyxXQUFXLFNBQVM7b0JBQzNCLE9BQU8sS0FBSyxRQUFROztvQkFFcEIsSUFBSSxRQUFRO3dCQUNSLE9BQU8sY0FBYzs7d0JBRXJCLFFBQVEsUUFBUSxRQUFRLFVBQVMsVUFBVSxVQUFVOzRCQUNqRCxjQUFjLGFBQWE7NEJBQzNCLE9BQU8sYUFBYTs0QkFDcEIsT0FBTyxhQUFhLFFBQVE7OzJCQUcvQjt3QkFDRCxPQUFPLGNBQWMsSUFBSTs7OztnQkFLakMsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsSUFBSSxNQUFNO29CQUNWLGdCQUFnQjtvQkFDaEIsZUFBZTs7O2dCQUduQixHQUFHLG1DQUFtQyxZQUFXO29CQUM3QyxJQUFJLE1BQU07b0JBQ1YsZ0JBQWdCLEtBQUssTUFBTTtvQkFDM0IsZUFBZSxLQUFLO3dCQUNoQixNQUFNO3dCQUNOLE1BQU07Ozs7Z0JBSWQsR0FBRyw2Q0FBNkMsWUFBTTtvQkFDbEQsSUFBSSxVQUFVO29CQUNkLGdCQUFnQjtvQkFDaEIsT0FBTyxXQUFXLFNBQVMsSUFBSTs7Ozs7R0FlcEMiLCJmaWxlIjoiY29tbW9uL2kxOG4vVHJhbnNsYXRlRmlsdGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGkxOG5Nb2R1bGUgZnJvbSAnY29tbW9uL2kxOG4vaTE4bk1vZHVsZSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBUcmFuc2xhdGVGaWx0ZXIuXHJcbiAqL1xyXG5kZXNjcmliZSgnVHJhbnNsYXRlRmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy8gVGhlIGZpbHRlciB0byB0ZXN0LlxyXG4gICAgdmFyIHRyYW5zbGF0ZUZpbHRlcjtcclxuXHJcbiAgICAvLyBNb2NrICR0cmFuc2xhdGUgc2VydmljZS5cclxuICAgIHZhciAkdHJhbnNsYXRlO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGkxOG4gbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaTE4bk1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbW9jayAkdHJhbnNsYXRlIHNlcnZpY2UgdGhhdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGZpbHRlci5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHRyYW5zbGF0ZS5cclxuICAgICAgICAkdHJhbnNsYXRlID0ge1xyXG4gICAgICAgICAgICBpbnN0YW50OiBqYXNtaW5lLmNyZWF0ZVNweSgpLFxyXG5cclxuICAgICAgICAgICAgLy8gVGhlc2UgYXJlIHJlcXVpcmVkIHRvIG1ha2UgdHJhbnNsYXRlIGhhcHB5LlxyXG4gICAgICAgICAgICBzdG9yYWdlS2V5OiBmdW5jdGlvbigpIHsgcmV0dXJuICdoaSBtb20nOyB9LFxyXG4gICAgICAgICAgICBzdG9yYWdlOiBmdW5jdGlvbigpIHsgcmV0dXJuIG51bGw7IH0sXHJcbiAgICAgICAgICAgIHByZWZlcnJlZExhbmd1YWdlOiBmdW5jdGlvbigpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBQcm92aWRlIHRoZSBtb2NrIGFzIHRoZSAkdHJhbnNsYXRlIHNlcnZpY2UsIHNvIHRoZSBmaWx0ZXIgd2lsbCB1c2UgaXQuXHJcbiAgICAgICAgJHByb3ZpZGUuZmFjdG9yeSgnJHRyYW5zbGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHRyYW5zbGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbiBpbnN0YW5jZSBvZiB0aGUgZmlsdGVyIHRvIHRlc3Qgd2l0aC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oc3BUcmFuc2xhdGVGaWx0ZXIpIHtcclxuICAgICAgICB0cmFuc2xhdGVGaWx0ZXIgPSBzcFRyYW5zbGF0ZUZpbHRlcjtcclxuICAgIH0pKTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZnkgdGhhdCB0aGUgJHRyYW5zbGF0ZSBzZXJ2aWNlIHdhcyBjYWxsZWQgdG8gdHJhbnNsYXRlIHRoZSBnaXZlblxyXG4gICAgICogbWVzc2FnZSBrZXkgYW5kIHBhcmFtZXRlcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAgICAgICBUaGUgZXhwZWN0ZWQgbWVzc2FnZSBrZXkuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gIEFuIG9wdGlvbmFsIG9iamVjdCBjb250YWluaW5nIHRoZSBleHBlY3RlZFxyXG4gICAgICogICAgdmFyaWFibGVzIHRoYXQgYXJlIHBhc3NlZCB0byB0aGUgdHJhbnNsYXRlIGNhbGwuXHJcbiAgICAgKi9cclxuICAgIHZhciBjaGVja1RyYW5zbGF0ZSA9IGZ1bmN0aW9uKGtleSwgcGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSAkdHJhbnNsYXRlLmluc3RhbnQuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3MsXHJcbiAgICAgICAgICAgIGFjdHVhbEtleSA9IGFyZ3NbMF0sXHJcbiAgICAgICAgICAgIGFjdHVhbFBhcmFtcyA9IGFyZ3NbMV0sXHJcbiAgICAgICAgICAgIGFjdHVhbFZhbHVlO1xyXG5cclxuICAgICAgICBleHBlY3QoJHRyYW5zbGF0ZS5pbnN0YW50KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGtleSkudG9FcXVhbChhY3R1YWxLZXkpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxQYXJhbXMpLnRvQmVEZWZpbmVkKCk7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbihwYXJhbVZhbCwgcGFyYW1LZXkpIHtcclxuICAgICAgICAgICAgICAgIGFjdHVhbFZhbHVlID0gYWN0dWFsUGFyYW1zW3BhcmFtS2V5XTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY3R1YWxWYWx1ZSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhY3R1YWxWYWx1ZSkudG9FcXVhbChwYXJhbVZhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbFBhcmFtcykubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgaXQoJ3RyYW5zbGF0ZXMgbWVzc2FnZXMgd2l0aG91dCBwYXJhbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgTVNHID0gJ3Rlc3RfbXNnJztcclxuICAgICAgICB0cmFuc2xhdGVGaWx0ZXIoTVNHKTtcclxuICAgICAgICBjaGVja1RyYW5zbGF0ZShNU0cpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3RyYW5zbGF0ZXMgbWVzc2FnZXMgd2l0aCBwYXJhbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgTVNHID0gJ3Rlc3RfbXNnIHswfSBmb28gezF9JztcclxuICAgICAgICB0cmFuc2xhdGVGaWx0ZXIoTVNHLCAnaGknLCAnbW9tJyk7XHJcbiAgICAgICAgY2hlY2tUcmFuc2xhdGUoTVNHLCB7XHJcbiAgICAgICAgICAgIHZhcjA6ICdoaScsXHJcbiAgICAgICAgICAgIHZhcjE6ICdtb20nXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3QgdHJhbnNsYXRlIGEgZGFuZ2Vyb3VzIGV4cHJlc3Npb24nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSAnaSBhbSBiYWQge3sgYWxlcnQoKSB9fSc7XHJcbiAgICAgICAgdHJhbnNsYXRlRmlsdGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIGV4cGVjdCgkdHJhbnNsYXRlLmluc3RhbnQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
