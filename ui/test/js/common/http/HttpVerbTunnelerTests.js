System.register(['test/js/TestInitializer', 'common/http/HttpModule'], function (_export) {
    'use strict';

    var httpModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonHttpHttpModule) {
            httpModule = _commonHttpHttpModule['default'];
        }],
        execute: function () {

            describe('HttpVerbTunneler', function () {

                var url = '/doIt',
                    data = { goTeam: 'yay!' },
                    $http,
                    $httpBackend,
                    browserUtil;

                // Only need the http module.
                beforeEach(module(httpModule));

                /**
                 * Save all of the services that we need.
                 */
                beforeEach(inject(function (_$http_, _$httpBackend_, _browserUtil_) {
                    $http = _$http_;
                    $httpBackend = _$httpBackend_;
                    browserUtil = _browserUtil_;
                }));

                /**
                 * Verify the state after each test is run.
                 */
                afterEach(function () {
                    // Make sure that all of the expected HTTP traffic happened.
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                /**
                 * Return true if the given headers contain a method override for PATCH.
                 */
                function hasPatchOverrideHeader(headers) {
                    return headers && headers['X-HTTP-Method-Override'] === 'PATCH';
                }

                /**
                 * Return true if the given headers do not contain the X-HTTP-Method-Override
                 * header.
                 */
                function noHttpOverrideHeader(headers) {
                    return !headers || !headers['X-HTTP-Method-Override'];
                }

                /**
                 * Run a test with the given HTTP method and whether verb tunneling is
                 * expected.
                 *
                 * @param {String} method  The HTTP method to test.
                 * @param {boolean} expectTunneling  True if we expect the verb to be
                 *     tunnelled through an HTTP header.
                 */
                function runTest(method, expectTunneling) {
                    var hasData = method === 'POST' || method === 'PUT' || method === 'PATCH',
                        requestData = hasData ? data : null,
                        expectedMethod = expectTunneling ? 'POST' : method,
                        headerChecker = expectTunneling ? hasPatchOverrideHeader : noHttpOverrideHeader;

                    // Setup the backend, make the HTTP call, and flush it.  The assumptions
                    // get checked in afterEach().
                    $httpBackend.expect(expectedMethod, url, requestData, headerChecker).respond(200, {});
                    $http({ method: method, url: url, data: requestData });
                    $httpBackend.flush();

                    // The browserUtil only gets consulted on PATCH requests.
                    if ('PATCH' === method) {
                        expect(browserUtil.isBlackBerry).toHaveBeenCalled();
                    } else {
                        expect(browserUtil.isBlackBerry).not.toHaveBeenCalled();
                    }
                }

                describe('on BlackBerry', function () {
                    /**
                     * Setup the browserUtil to say that we're on a BlackBerry.
                     */
                    beforeEach(function () {
                        spyOn(browserUtil, 'isBlackBerry').and.returnValue(true);
                    });

                    it('transforms a PATCH request', function () {
                        runTest('PATCH', true);
                    });

                    it('passes through a POST request', function () {
                        runTest('POST', false);
                    });

                    it('passes through a PUT request', function () {
                        runTest('PUT', false);
                    });

                    it('passes through a DELETE request', function () {
                        runTest('DELETE', false);
                    });

                    it('passes through a GET request', function () {
                        runTest('GET', false);
                    });
                });

                describe('on non-BlackBerry', function () {
                    /**
                     * Setup the browserUtil to say that we're not on a BlackBerry.  This
                     * should be a given except on the off chance that someone is running
                     * the unit tests on a BlackBerry. ;)
                     */
                    beforeEach(function () {
                        spyOn(browserUtil, 'isBlackBerry').and.returnValue(false);
                    });

                    it('passes through a PATCH request', function () {
                        runTest('PATCH', false);
                    });

                    it('passes through a POST request', function () {
                        runTest('POST', false);
                    });

                    it('passes through a PUT request', function () {
                        runTest('PUT', false);
                    });

                    it('passes through a DELETE request', function () {
                        runTest('DELETE', false);
                    });

                    it('passes through a GET request', function () {
                        runTest('GET', false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9odHRwL0h0dHBWZXJiVHVubmVsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUN0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLE1BQU07b0JBQ04sT0FBTyxFQUFFLFFBQVE7b0JBQ2pCO29CQUFPO29CQUFjOzs7Z0JBR3pCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLFNBQVMsZ0JBQWdCLGVBQWU7b0JBQy9ELFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixjQUFjOzs7Ozs7Z0JBTWxCLFVBQVUsWUFBVzs7b0JBRWpCLGFBQWE7b0JBQ2IsYUFBYTs7Ozs7O2dCQU1qQixTQUFTLHVCQUF1QixTQUFTO29CQUNyQyxPQUFPLFdBQVksUUFBUSw4QkFBOEI7Ozs7Ozs7Z0JBTzdELFNBQVMscUJBQXFCLFNBQVM7b0JBQ25DLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUTs7Ozs7Ozs7Ozs7Z0JBV2hDLFNBQVMsUUFBUSxRQUFRLGlCQUFpQjtvQkFDdEMsSUFBSSxVQUFXLFdBQVcsVUFBVSxXQUFXLFNBQVMsV0FBVzt3QkFDL0QsY0FBZSxVQUFXLE9BQU87d0JBQ2pDLGlCQUFrQixrQkFBbUIsU0FBUzt3QkFDOUMsZ0JBQWdCLGtCQUFvQix5QkFBeUI7Ozs7b0JBSWpFLGFBQWEsT0FBTyxnQkFBZ0IsS0FBSyxhQUFhLGVBQ2xELFFBQVEsS0FBSztvQkFDakIsTUFBTSxFQUFFLFFBQVEsUUFBUSxLQUFLLEtBQUssTUFBTTtvQkFDeEMsYUFBYTs7O29CQUdiLElBQUksWUFBWSxRQUFRO3dCQUNwQixPQUFPLFlBQVksY0FBYzsyQkFFaEM7d0JBQ0QsT0FBTyxZQUFZLGNBQWMsSUFBSTs7OztnQkFLN0MsU0FBUyxpQkFBaUIsWUFBVzs7OztvQkFJakMsV0FBVyxZQUFXO3dCQUNsQixNQUFNLGFBQWEsZ0JBQWdCLElBQUksWUFBWTs7O29CQUd2RCxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxRQUFRLFNBQVM7OztvQkFHckIsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsUUFBUSxRQUFROzs7b0JBR3BCLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLFFBQVEsT0FBTzs7O29CQUduQixHQUFHLG1DQUFtQyxZQUFXO3dCQUM3QyxRQUFRLFVBQVU7OztvQkFHdEIsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsUUFBUSxPQUFPOzs7O2dCQUt2QixTQUFTLHFCQUFxQixZQUFXOzs7Ozs7b0JBTXJDLFdBQVcsWUFBVzt3QkFDbEIsTUFBTSxhQUFhLGdCQUFnQixJQUFJLFlBQVk7OztvQkFHdkQsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsUUFBUSxTQUFTOzs7b0JBR3JCLEdBQUcsaUNBQWlDLFlBQVc7d0JBQzNDLFFBQVEsUUFBUTs7O29CQUdwQixHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxRQUFRLE9BQU87OztvQkFHbkIsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsUUFBUSxVQUFVOzs7b0JBR3RCLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLFFBQVEsT0FBTzs7Ozs7O0dBV3hCIiwiZmlsZSI6ImNvbW1vbi9odHRwL0h0dHBWZXJiVHVubmVsZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaHR0cE1vZHVsZSBmcm9tICdjb21tb24vaHR0cC9IdHRwTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdIdHRwVmVyYlR1bm5lbGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHVybCA9ICcvZG9JdCcsXHJcbiAgICAgICAgZGF0YSA9IHsgZ29UZWFtOiAneWF5IScgfSxcclxuICAgICAgICAkaHR0cCwgJGh0dHBCYWNrZW5kLCBicm93c2VyVXRpbDtcclxuXHJcbiAgICAvLyBPbmx5IG5lZWQgdGhlIGh0dHAgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaHR0cE1vZHVsZSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSBhbGwgb2YgdGhlIHNlcnZpY2VzIHRoYXQgd2UgbmVlZC5cclxuICAgICAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRodHRwXywgXyRodHRwQmFja2VuZF8sIF9icm93c2VyVXRpbF8pIHtcclxuICAgICAgICAkaHR0cCA9IF8kaHR0cF87XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XHJcbiAgICAgICAgYnJvd3NlclV0aWwgPSBfYnJvd3NlclV0aWxfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmVyaWZ5IHRoZSBzdGF0ZSBhZnRlciBlYWNoIHRlc3QgaXMgcnVuLlxyXG4gICAgICovXHJcbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgYWxsIG9mIHRoZSBleHBlY3RlZCBIVFRQIHRyYWZmaWMgaGFwcGVuZWQuXHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gaGVhZGVycyBjb250YWluIGEgbWV0aG9kIG92ZXJyaWRlIGZvciBQQVRDSC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gaGFzUGF0Y2hPdmVycmlkZUhlYWRlcihoZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlYWRlcnMgJiYgKGhlYWRlcnNbJ1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnXSA9PT0gJ1BBVENIJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ2l2ZW4gaGVhZGVycyBkbyBub3QgY29udGFpbiB0aGUgWC1IVFRQLU1ldGhvZC1PdmVycmlkZVxyXG4gICAgICogaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBub0h0dHBPdmVycmlkZUhlYWRlcihoZWFkZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuICFoZWFkZXJzIHx8ICFoZWFkZXJzWydYLUhUVFAtTWV0aG9kLU92ZXJyaWRlJ107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW4gYSB0ZXN0IHdpdGggdGhlIGdpdmVuIEhUVFAgbWV0aG9kIGFuZCB3aGV0aGVyIHZlcmIgdHVubmVsaW5nIGlzXHJcbiAgICAgKiBleHBlY3RlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kICBUaGUgSFRUUCBtZXRob2QgdG8gdGVzdC5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwZWN0VHVubmVsaW5nICBUcnVlIGlmIHdlIGV4cGVjdCB0aGUgdmVyYiB0byBiZVxyXG4gICAgICogICAgIHR1bm5lbGxlZCB0aHJvdWdoIGFuIEhUVFAgaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBydW5UZXN0KG1ldGhvZCwgZXhwZWN0VHVubmVsaW5nKSB7XHJcbiAgICAgICAgdmFyIGhhc0RhdGEgPSAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJyB8fCBtZXRob2QgPT09ICdQQVRDSCcpLFxyXG4gICAgICAgICAgICByZXF1ZXN0RGF0YSA9IChoYXNEYXRhKSA/IGRhdGEgOiBudWxsLFxyXG4gICAgICAgICAgICBleHBlY3RlZE1ldGhvZCA9IChleHBlY3RUdW5uZWxpbmcpID8gJ1BPU1QnIDogbWV0aG9kLFxyXG4gICAgICAgICAgICBoZWFkZXJDaGVja2VyID0gKGV4cGVjdFR1bm5lbGluZykgPyBoYXNQYXRjaE92ZXJyaWRlSGVhZGVyIDogbm9IdHRwT3ZlcnJpZGVIZWFkZXI7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHRoZSBiYWNrZW5kLCBtYWtlIHRoZSBIVFRQIGNhbGwsIGFuZCBmbHVzaCBpdC4gIFRoZSBhc3N1bXB0aW9uc1xyXG4gICAgICAgIC8vIGdldCBjaGVja2VkIGluIGFmdGVyRWFjaCgpLlxyXG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3QoZXhwZWN0ZWRNZXRob2QsIHVybCwgcmVxdWVzdERhdGEsIGhlYWRlckNoZWNrZXIpLlxyXG4gICAgICAgICAgICByZXNwb25kKDIwMCwge30pO1xyXG4gICAgICAgICRodHRwKHsgbWV0aG9kOiBtZXRob2QsIHVybDogdXJsLCBkYXRhOiByZXF1ZXN0RGF0YSB9KTtcclxuICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGJyb3dzZXJVdGlsIG9ubHkgZ2V0cyBjb25zdWx0ZWQgb24gUEFUQ0ggcmVxdWVzdHMuXHJcbiAgICAgICAgaWYgKCdQQVRDSCcgPT09IG1ldGhvZCkge1xyXG4gICAgICAgICAgICBleHBlY3QoYnJvd3NlclV0aWwuaXNCbGFja0JlcnJ5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBleHBlY3QoYnJvd3NlclV0aWwuaXNCbGFja0JlcnJ5KS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ29uIEJsYWNrQmVycnknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXR1cCB0aGUgYnJvd3NlclV0aWwgdG8gc2F5IHRoYXQgd2UncmUgb24gYSBCbGFja0JlcnJ5LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGJyb3dzZXJVdGlsLCAnaXNCbGFja0JlcnJ5JykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgndHJhbnNmb3JtcyBhIFBBVENIIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcnVuVGVzdCgnUEFUQ0gnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Bhc3NlcyB0aHJvdWdoIGEgUE9TVCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJ1blRlc3QoJ1BPU1QnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwYXNzZXMgdGhyb3VnaCBhIFBVVCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJ1blRlc3QoJ1BVVCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Bhc3NlcyB0aHJvdWdoIGEgREVMRVRFIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcnVuVGVzdCgnREVMRVRFJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncGFzc2VzIHRocm91Z2ggYSBHRVQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBydW5UZXN0KCdHRVQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZGVzY3JpYmUoJ29uIG5vbi1CbGFja0JlcnJ5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0dXAgdGhlIGJyb3dzZXJVdGlsIHRvIHNheSB0aGF0IHdlJ3JlIG5vdCBvbiBhIEJsYWNrQmVycnkuICBUaGlzXHJcbiAgICAgICAgICogc2hvdWxkIGJlIGEgZ2l2ZW4gZXhjZXB0IG9uIHRoZSBvZmYgY2hhbmNlIHRoYXQgc29tZW9uZSBpcyBydW5uaW5nXHJcbiAgICAgICAgICogdGhlIHVuaXQgdGVzdHMgb24gYSBCbGFja0JlcnJ5LiA7KVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGJyb3dzZXJVdGlsLCAnaXNCbGFja0JlcnJ5JykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Bhc3NlcyB0aHJvdWdoIGEgUEFUQ0ggcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBydW5UZXN0KCdQQVRDSCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Bhc3NlcyB0aHJvdWdoIGEgUE9TVCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJ1blRlc3QoJ1BPU1QnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdwYXNzZXMgdGhyb3VnaCBhIFBVVCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJ1blRlc3QoJ1BVVCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Bhc3NlcyB0aHJvdWdoIGEgREVMRVRFIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcnVuVGVzdCgnREVMRVRFJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncGFzc2VzIHRocm91Z2ggYSBHRVQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBydW5UZXN0KCdHRVQnLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
