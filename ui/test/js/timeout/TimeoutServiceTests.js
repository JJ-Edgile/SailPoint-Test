System.register(['test/js/TestInitializer', 'timeout/TimeoutModule', 'common/util/UtilModule'], function (_export) {
    /**
     * Tests for the TimeoutService.
     */
    'use strict';

    var timeoutModule, utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_timeoutTimeoutModule) {
            timeoutModule = _timeoutTimeoutModule['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {
            describe('TimeoutService', function () {

                // The ngMock $timeout service.
                var $timeout;

                // The TimeoutService that will be tested.
                var timeoutService;

                // Spies for showTimeoutDialog and resetTimeout on timeoutService.
                var showTimeoutSpy;
                var resetTimeoutSpy;
                var modalOpenSpy;

                // Session Timeout plus the magic 30 second delay
                var defaultTimeoutOut;

                // Let the tests know we'll use the sailpoint module.
                beforeEach(module(timeoutModule, utilModule));

                /**
                 * Setup the global variables before each spec is run.  Note that the
                 * _timeoutService_ that is being injected here is the ngMock.$timeout
                 * service ... not our TimeoutService.
                 */
                beforeEach(inject(function (_$timeout_, _$uibModal_, _timeoutService_, _SESSION_TIMEOUT_, $q) {
                    $timeout = _$timeout_;
                    timeoutService = _timeoutService_;
                    /* It looks like modalOpenSpy is only used by one test, but it is really removing
                     * a bunch of timeout/httpbackend headaches from all the tests that show the
                     * timeout dialog */
                    modalOpenSpy = spyOn(_$uibModal_, 'open').and.returnValue({ result: $q.defer().promise });
                    showTimeoutSpy = spyOn(timeoutService, 'showTimeoutDialog').and.callThrough();
                    resetTimeoutSpy = spyOn(timeoutService, 'resetTimeout').and.callThrough();
                    defaultTimeoutOut = _SESSION_TIMEOUT_ + 30000;
                }));

                it('calls the showTimeoutDialog function when the timeout expires', function () {
                    // Reset the timeout with our spy object.
                    timeoutService.resetTimeout();

                    // Fast-forward half way through the timeout
                    $timeout.flush(defaultTimeoutOut / 2);
                    expect(showTimeoutSpy).not.toHaveBeenCalled();

                    // Fast-forward the rest of the way through the timeout
                    $timeout.flush(defaultTimeoutOut / 2);
                    expect(showTimeoutSpy).toHaveBeenCalled();

                    // Make sure that there is nothing in the timeout queue.
                    $timeout.verifyNoPendingTasks();
                });

                it('extends the timeout when the timeout is reset', function () {
                    var RESET_WAIT = 5000;

                    // Reset the timeout with our spy object (time = 0).
                    timeoutService.resetTimeout();

                    // Go forward a few seconds.  Then reset the timeout again (time = 5).
                    $timeout.flush(RESET_WAIT);
                    timeoutService.resetTimeout();

                    // Go just past the original timeout and ensure that the original
                    // timeout does not get called.
                    $timeout.flush(defaultTimeoutOut + 10 - RESET_WAIT);
                    expect(showTimeoutSpy).not.toHaveBeenCalled();

                    // Go past the second reset's timeout to verify that the first callback
                    // does not get called and the new callback does (time = timeout + 5 + 30)
                    $timeout.flush(RESET_WAIT);
                    expect(showTimeoutSpy).toHaveBeenCalled();
                    $timeout.verifyNoPendingTasks();
                });

                it('shows the timeout dialog when requested', function () {
                    timeoutService.showTimeoutDialog();
                    expect(modalOpenSpy).toHaveBeenCalled();
                });

                it('shows the pre-expire warning', function () {
                    var warningDelay = 30000 + 1000,
                        // five minutes + a little wiggle room
                    showWarningSpy = spyOn(timeoutService, 'showWarningDialog').and.callFake(angular.noop);
                    // Reset the timeout with our spy object (time = 0).
                    timeoutService.resetTimeout();

                    // Go forward a few seconds.  Then reset the timeout again (time = 5).
                    $timeout.flush(defaultTimeoutOut - warningDelay);
                    expect(showWarningSpy).toHaveBeenCalled();
                    // flush the expired dialog too
                    $timeout.flush(warningDelay);
                    $timeout.verifyNoPendingTasks();
                });

                it('shows the warning dialog when requested', function () {
                    timeoutService.showWarningDialog();
                    expect(modalOpenSpy).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWVvdXQvVGltZW91dFNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUJBQXlCLDJCQUEyQixVQUFVLFNBQVM7Ozs7SUFJL0c7O0lBRUEsSUFBSSxlQUFlO0lBQ25CLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxnQkFBZ0Isc0JBQXNCO1dBQ3ZDLFVBQVUsdUJBQXVCO1lBQ2hDLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxrQkFBa0IsWUFBVzs7O2dCQUdsQyxJQUFJOzs7Z0JBR0osSUFBSTs7O2dCQUdKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJOzs7Z0JBR0osSUFBSTs7O2dCQUlKLFdBQVcsT0FBTyxlQUFlOzs7Ozs7O2dCQU9qQyxXQUFXLE9BQU8sVUFBUyxZQUFZLGFBQWEsa0JBQWtCLG1CQUFtQixJQUFJO29CQUN6RixXQUFXO29CQUNYLGlCQUFpQjs7OztvQkFJakIsZUFBZSxNQUFNLGFBQWEsUUFBUSxJQUFJLFlBQVksRUFBRSxRQUFRLEdBQUcsUUFBUTtvQkFDL0UsaUJBQWlCLE1BQU0sZ0JBQWdCLHFCQUFxQixJQUFJO29CQUNoRSxrQkFBa0IsTUFBTSxnQkFBZ0IsZ0JBQWdCLElBQUk7b0JBQzVELG9CQUFvQixvQkFBb0I7OztnQkFHNUMsR0FBRyxpRUFBaUUsWUFBVzs7b0JBRTNFLGVBQWU7OztvQkFHZixTQUFTLE1BQU0sb0JBQW9CO29CQUNuQyxPQUFPLGdCQUFnQixJQUFJOzs7b0JBRzNCLFNBQVMsTUFBTyxvQkFBb0I7b0JBQ3BDLE9BQU8sZ0JBQWdCOzs7b0JBR3ZCLFNBQVM7OztnQkFHYixHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxJQUFJLGFBQWE7OztvQkFHakIsZUFBZTs7O29CQUdmLFNBQVMsTUFBTTtvQkFDZixlQUFlOzs7O29CQUlmLFNBQVMsTUFBTSxvQkFBb0IsS0FBSztvQkFDeEMsT0FBTyxnQkFBZ0IsSUFBSTs7OztvQkFJM0IsU0FBUyxNQUFNO29CQUNmLE9BQU8sZ0JBQWdCO29CQUN2QixTQUFTOzs7Z0JBR2IsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsZUFBZTtvQkFDZixPQUFPLGNBQWM7OztnQkFHekIsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsSUFBSSxlQUFlLFFBQVE7O29CQUN2QixpQkFBaUIsTUFBTSxnQkFBZ0IscUJBQXFCLElBQUksU0FBUyxRQUFROztvQkFFckYsZUFBZTs7O29CQUdmLFNBQVMsTUFBTSxvQkFBb0I7b0JBQ25DLE9BQU8sZ0JBQWdCOztvQkFFdkIsU0FBUyxNQUFNO29CQUNmLFNBQVM7OztnQkFHYixHQUFHLDJDQUEyQyxZQUFXO29CQUNyRCxlQUFlO29CQUNmLE9BQU8sY0FBYzs7Ozs7R0FZMUIiLCJmaWxlIjoidGltZW91dC9UaW1lb3V0U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcblxyXG5pbXBvcnQgdGltZW91dE1vZHVsZSBmcm9tICd0aW1lb3V0L1RpbWVvdXRNb2R1bGUnO1xyXG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgVGltZW91dFNlcnZpY2UuXHJcbiAqL1xyXG5kZXNjcmliZSgnVGltZW91dFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAvLyBUaGUgbmdNb2NrICR0aW1lb3V0IHNlcnZpY2UuXHJcbiAgICB2YXIgJHRpbWVvdXQ7XHJcblxyXG4gICAgLy8gVGhlIFRpbWVvdXRTZXJ2aWNlIHRoYXQgd2lsbCBiZSB0ZXN0ZWQuXHJcbiAgICB2YXIgdGltZW91dFNlcnZpY2U7XHJcblxyXG4gICAgLy8gU3BpZXMgZm9yIHNob3dUaW1lb3V0RGlhbG9nIGFuZCByZXNldFRpbWVvdXQgb24gdGltZW91dFNlcnZpY2UuXHJcbiAgICB2YXIgc2hvd1RpbWVvdXRTcHk7XHJcbiAgICB2YXIgcmVzZXRUaW1lb3V0U3B5O1xyXG4gICAgdmFyIG1vZGFsT3BlblNweTtcclxuXHJcbiAgICAvLyBTZXNzaW9uIFRpbWVvdXQgcGx1cyB0aGUgbWFnaWMgMzAgc2Vjb25kIGRlbGF5XHJcbiAgICB2YXIgZGVmYXVsdFRpbWVvdXRPdXQ7XHJcblxyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHNhaWxwb2ludCBtb2R1bGUuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0aW1lb3V0TW9kdWxlLCB1dGlsTW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgZ2xvYmFsIHZhcmlhYmxlcyBiZWZvcmUgZWFjaCBzcGVjIGlzIHJ1bi4gIE5vdGUgdGhhdCB0aGVcclxuICAgICAqIF90aW1lb3V0U2VydmljZV8gdGhhdCBpcyBiZWluZyBpbmplY3RlZCBoZXJlIGlzIHRoZSBuZ01vY2suJHRpbWVvdXRcclxuICAgICAqIHNlcnZpY2UgLi4uIG5vdCBvdXIgVGltZW91dFNlcnZpY2UuXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kdGltZW91dF8sIF8kdWliTW9kYWxfLCBfdGltZW91dFNlcnZpY2VfLCBfU0VTU0lPTl9USU1FT1VUXywgJHEpIHtcclxuICAgICAgICAkdGltZW91dCA9IF8kdGltZW91dF87XHJcbiAgICAgICAgdGltZW91dFNlcnZpY2UgPSBfdGltZW91dFNlcnZpY2VfO1xyXG4gICAgICAgIC8qIEl0IGxvb2tzIGxpa2UgbW9kYWxPcGVuU3B5IGlzIG9ubHkgdXNlZCBieSBvbmUgdGVzdCwgYnV0IGl0IGlzIHJlYWxseSByZW1vdmluZ1xyXG4gICAgICAgICAqIGEgYnVuY2ggb2YgdGltZW91dC9odHRwYmFja2VuZCBoZWFkYWNoZXMgZnJvbSBhbGwgdGhlIHRlc3RzIHRoYXQgc2hvdyB0aGVcclxuICAgICAgICAgKiB0aW1lb3V0IGRpYWxvZyAqL1xyXG4gICAgICAgIG1vZGFsT3BlblNweSA9IHNweU9uKF8kdWliTW9kYWxfLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZSh7IHJlc3VsdDogJHEuZGVmZXIoKS5wcm9taXNlIH0pO1xyXG4gICAgICAgIHNob3dUaW1lb3V0U3B5ID0gc3B5T24odGltZW91dFNlcnZpY2UsICdzaG93VGltZW91dERpYWxvZycpLmFuZC5jYWxsVGhyb3VnaCgpO1xyXG4gICAgICAgIHJlc2V0VGltZW91dFNweSA9IHNweU9uKHRpbWVvdXRTZXJ2aWNlLCAncmVzZXRUaW1lb3V0JykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgZGVmYXVsdFRpbWVvdXRPdXQgPSBfU0VTU0lPTl9USU1FT1VUXyArIDMwMDAwO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdjYWxscyB0aGUgc2hvd1RpbWVvdXREaWFsb2cgZnVuY3Rpb24gd2hlbiB0aGUgdGltZW91dCBleHBpcmVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgdGhlIHRpbWVvdXQgd2l0aCBvdXIgc3B5IG9iamVjdC5cclxuICAgICAgICB0aW1lb3V0U2VydmljZS5yZXNldFRpbWVvdXQoKTtcclxuXHJcbiAgICAgICAgLy8gRmFzdC1mb3J3YXJkIGhhbGYgd2F5IHRocm91Z2ggdGhlIHRpbWVvdXRcclxuICAgICAgICAkdGltZW91dC5mbHVzaChkZWZhdWx0VGltZW91dE91dCAvIDIpO1xyXG4gICAgICAgIGV4cGVjdChzaG93VGltZW91dFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgLy8gRmFzdC1mb3J3YXJkIHRoZSByZXN0IG9mIHRoZSB3YXkgdGhyb3VnaCB0aGUgdGltZW91dFxyXG4gICAgICAgICR0aW1lb3V0LmZsdXNoKChkZWZhdWx0VGltZW91dE91dCAvIDIpKTtcclxuICAgICAgICBleHBlY3Qoc2hvd1RpbWVvdXRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgbm90aGluZyBpbiB0aGUgdGltZW91dCBxdWV1ZS5cclxuICAgICAgICAkdGltZW91dC52ZXJpZnlOb1BlbmRpbmdUYXNrcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2V4dGVuZHMgdGhlIHRpbWVvdXQgd2hlbiB0aGUgdGltZW91dCBpcyByZXNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBSRVNFVF9XQUlUID0gNTAwMDtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgdGhlIHRpbWVvdXQgd2l0aCBvdXIgc3B5IG9iamVjdCAodGltZSA9IDApLlxyXG4gICAgICAgIHRpbWVvdXRTZXJ2aWNlLnJlc2V0VGltZW91dCgpO1xyXG5cclxuICAgICAgICAvLyBHbyBmb3J3YXJkIGEgZmV3IHNlY29uZHMuICBUaGVuIHJlc2V0IHRoZSB0aW1lb3V0IGFnYWluICh0aW1lID0gNSkuXHJcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goUkVTRVRfV0FJVCk7XHJcbiAgICAgICAgdGltZW91dFNlcnZpY2UucmVzZXRUaW1lb3V0KCk7XHJcblxyXG4gICAgICAgIC8vIEdvIGp1c3QgcGFzdCB0aGUgb3JpZ2luYWwgdGltZW91dCBhbmQgZW5zdXJlIHRoYXQgdGhlIG9yaWdpbmFsXHJcbiAgICAgICAgLy8gdGltZW91dCBkb2VzIG5vdCBnZXQgY2FsbGVkLlxyXG4gICAgICAgICR0aW1lb3V0LmZsdXNoKGRlZmF1bHRUaW1lb3V0T3V0ICsgMTAgLSBSRVNFVF9XQUlUKTtcclxuICAgICAgICBleHBlY3Qoc2hvd1RpbWVvdXRTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgIC8vIEdvIHBhc3QgdGhlIHNlY29uZCByZXNldCdzIHRpbWVvdXQgdG8gdmVyaWZ5IHRoYXQgdGhlIGZpcnN0IGNhbGxiYWNrXHJcbiAgICAgICAgLy8gZG9lcyBub3QgZ2V0IGNhbGxlZCBhbmQgdGhlIG5ldyBjYWxsYmFjayBkb2VzICh0aW1lID0gdGltZW91dCArIDUgKyAzMClcclxuICAgICAgICAkdGltZW91dC5mbHVzaChSRVNFVF9XQUlUKTtcclxuICAgICAgICBleHBlY3Qoc2hvd1RpbWVvdXRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAkdGltZW91dC52ZXJpZnlOb1BlbmRpbmdUYXNrcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSB0aW1lb3V0IGRpYWxvZyB3aGVuIHJlcXVlc3RlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRpbWVvdXRTZXJ2aWNlLnNob3dUaW1lb3V0RGlhbG9nKCk7XHJcbiAgICAgICAgZXhwZWN0KG1vZGFsT3BlblNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSBwcmUtZXhwaXJlIHdhcm5pbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgd2FybmluZ0RlbGF5ID0gMzAwMDAgKyAxMDAwLCAvLyBmaXZlIG1pbnV0ZXMgKyBhIGxpdHRsZSB3aWdnbGUgcm9vbVxyXG4gICAgICAgICAgICBzaG93V2FybmluZ1NweSA9IHNweU9uKHRpbWVvdXRTZXJ2aWNlLCAnc2hvd1dhcm5pbmdEaWFsb2cnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcclxuICAgICAgICAvLyBSZXNldCB0aGUgdGltZW91dCB3aXRoIG91ciBzcHkgb2JqZWN0ICh0aW1lID0gMCkuXHJcbiAgICAgICAgdGltZW91dFNlcnZpY2UucmVzZXRUaW1lb3V0KCk7XHJcblxyXG4gICAgICAgIC8vIEdvIGZvcndhcmQgYSBmZXcgc2Vjb25kcy4gIFRoZW4gcmVzZXQgdGhlIHRpbWVvdXQgYWdhaW4gKHRpbWUgPSA1KS5cclxuICAgICAgICAkdGltZW91dC5mbHVzaChkZWZhdWx0VGltZW91dE91dCAtIHdhcm5pbmdEZWxheSk7XHJcbiAgICAgICAgZXhwZWN0KHNob3dXYXJuaW5nU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgLy8gZmx1c2ggdGhlIGV4cGlyZWQgZGlhbG9nIHRvb1xyXG4gICAgICAgICR0aW1lb3V0LmZsdXNoKHdhcm5pbmdEZWxheSk7XHJcbiAgICAgICAgJHRpbWVvdXQudmVyaWZ5Tm9QZW5kaW5nVGFza3MoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG93cyB0aGUgd2FybmluZyBkaWFsb2cgd2hlbiByZXF1ZXN0ZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aW1lb3V0U2VydmljZS5zaG93V2FybmluZ0RpYWxvZygpO1xyXG4gICAgICAgIGV4cGVjdChtb2RhbE9wZW5TcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
