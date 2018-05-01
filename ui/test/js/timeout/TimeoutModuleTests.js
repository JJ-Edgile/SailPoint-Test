System.register(['test/js/TestInitializer', 'timeout/TimeoutModule', 'common/util/UtilModule'], function (_export) {

    /**
     * Tests for the Timeout Module.
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
            describe('Timeout Module', function () {

                // The ngMock $timeout service.
                var $timeout;

                // The TimeoutService that will be tested.
                var timeoutService;

                // A jasmine spy that can be called on timeout.
                var resetTimeoutSpy;

                // Let the tests know we'll use the sailpoint module.
                beforeEach(module(timeoutModule, utilModule));

                /**
                 * Setup the global variables before each spec is run.  Note that the
                 * _$timeout_ that is being injected here is the ngMock.$timeout
                 * service ... not our TimeoutService.
                 */
                beforeEach(inject(function (_$timeout_, _timeoutService_) {
                    $timeout = _$timeout_;
                    timeoutService = _timeoutService_;
                    resetTimeoutSpy = spyOn(timeoutService, 'resetTimeout').and.callThrough();
                }));

                it('starts timeout when initialized', inject(function ($uibModal, SESSION_TIMEOUT, $q) {
                    /* The call to resetTimeout in the run block initializes the timeout to
                     * the real showTimeoutDialog function before we can wedge our spy in.
                     * So here I am spying on $uibModal.open */
                    var modalSpy = spyOn($uibModal, 'open').and.returnValue({ result: $q.defer().promise });
                    expect(modalSpy).not.toHaveBeenCalled();
                    $timeout.flush(SESSION_TIMEOUT + 30000);
                    expect(modalSpy).toHaveBeenCalled();
                    $timeout.verifyNoPendingTasks();
                }));

                it('resets timeout on AJAX requests', inject(function ($http, $httpBackend) {
                    var initialCallCount = resetTimeoutSpy.calls.count();
                    $httpBackend.whenGET('/fakeURL').respond('yay!');
                    $http.get('/fakeURL');
                    $httpBackend.flush();
                    expect(resetTimeoutSpy.calls.count() - initialCallCount).toBe(1);
                }));

                it('does not reset timeout on AJAX for modal template', inject(function ($http, $httpBackend) {
                    var initialCallCount = resetTimeoutSpy.calls.count(),
                        modalTemplateUrl = 'uib/template/modal';
                    $httpBackend.whenGET(modalTemplateUrl).respond('yay!');
                    $http.get(modalTemplateUrl);
                    $httpBackend.flush();
                    expect(resetTimeoutSpy.calls.count() - initialCallCount).toBe(0);
                }));
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWVvdXQvVGltZW91dE1vZHVsZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5QkFBeUIsMkJBQTJCLFVBQVUsU0FBUzs7Ozs7SUFLL0c7O0lBRUEsSUFBSSxlQUFlO0lBQ25CLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxnQkFBZ0Isc0JBQXNCO1dBQ3ZDLFVBQVUsdUJBQXVCO1lBQ2hDLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxrQkFBa0IsWUFBVzs7O2dCQUdsQyxJQUFJOzs7Z0JBR0osSUFBSTs7O2dCQUdKLElBQUk7OztnQkFHSixXQUFXLE9BQU8sZUFBZTs7Ozs7OztnQkFPakMsV0FBVyxPQUFPLFVBQVMsWUFBWSxrQkFBa0I7b0JBQ3JELFdBQVc7b0JBQ1gsaUJBQWlCO29CQUNqQixrQkFBa0IsTUFBTSxnQkFBZ0IsZ0JBQWdCLElBQUk7OztnQkFHaEUsR0FBRyxtQ0FBbUMsT0FBTyxVQUFTLFdBQVcsaUJBQWlCLElBQUk7Ozs7b0JBSWxGLElBQUksV0FBVyxNQUFNLFdBQVcsUUFBUSxJQUFJLFlBQVksRUFBRSxRQUFRLEdBQUcsUUFBUTtvQkFDN0UsT0FBTyxVQUFVLElBQUk7b0JBQ3JCLFNBQVMsTUFBTSxrQkFBa0I7b0JBQ2pDLE9BQU8sVUFBVTtvQkFDakIsU0FBUzs7O2dCQUdiLEdBQUcsbUNBQW1DLE9BQU8sVUFBUyxPQUFPLGNBQWM7b0JBQ3ZFLElBQUksbUJBQW1CLGdCQUFnQixNQUFNO29CQUM3QyxhQUFhLFFBQVEsWUFBWSxRQUFRO29CQUN6QyxNQUFNLElBQUk7b0JBQ1YsYUFBYTtvQkFDYixPQUFPLGdCQUFnQixNQUFNLFVBQVUsa0JBQWtCLEtBQUs7OztnQkFHbEUsR0FBRyxxREFBcUQsT0FBTyxVQUFTLE9BQU8sY0FBYztvQkFDekYsSUFBSSxtQkFBbUIsZ0JBQWdCLE1BQU07d0JBQ3pDLG1CQUFtQjtvQkFDdkIsYUFBYSxRQUFRLGtCQUFrQixRQUFRO29CQUMvQyxNQUFNLElBQUk7b0JBQ1YsYUFBYTtvQkFDYixPQUFPLGdCQUFnQixNQUFNLFVBQVUsa0JBQWtCLEtBQUs7Ozs7O0dBWW5FIiwiZmlsZSI6InRpbWVvdXQvVGltZW91dE1vZHVsZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5cbmltcG9ydCB0aW1lb3V0TW9kdWxlIGZyb20gJ3RpbWVvdXQvVGltZW91dE1vZHVsZSc7XG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFRpbWVvdXQgTW9kdWxlLlxuICovXG5kZXNjcmliZSgnVGltZW91dCBNb2R1bGUnLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIFRoZSBuZ01vY2sgJHRpbWVvdXQgc2VydmljZS5cbiAgICB2YXIgJHRpbWVvdXQ7XG5cbiAgICAvLyBUaGUgVGltZW91dFNlcnZpY2UgdGhhdCB3aWxsIGJlIHRlc3RlZC5cbiAgICB2YXIgdGltZW91dFNlcnZpY2U7XG5cbiAgICAvLyBBIGphc21pbmUgc3B5IHRoYXQgY2FuIGJlIGNhbGxlZCBvbiB0aW1lb3V0LlxuICAgIHZhciByZXNldFRpbWVvdXRTcHk7XG5cbiAgICAvLyBMZXQgdGhlIHRlc3RzIGtub3cgd2UnbGwgdXNlIHRoZSBzYWlscG9pbnQgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRpbWVvdXRNb2R1bGUsIHV0aWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBnbG9iYWwgdmFyaWFibGVzIGJlZm9yZSBlYWNoIHNwZWMgaXMgcnVuLiAgTm90ZSB0aGF0IHRoZVxuICAgICAqIF8kdGltZW91dF8gdGhhdCBpcyBiZWluZyBpbmplY3RlZCBoZXJlIGlzIHRoZSBuZ01vY2suJHRpbWVvdXRcbiAgICAgKiBzZXJ2aWNlIC4uLiBub3Qgb3VyIFRpbWVvdXRTZXJ2aWNlLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kdGltZW91dF8sIF90aW1lb3V0U2VydmljZV8pIHtcbiAgICAgICAgJHRpbWVvdXQgPSBfJHRpbWVvdXRfO1xuICAgICAgICB0aW1lb3V0U2VydmljZSA9IF90aW1lb3V0U2VydmljZV87XG4gICAgICAgIHJlc2V0VGltZW91dFNweSA9IHNweU9uKHRpbWVvdXRTZXJ2aWNlLCAncmVzZXRUaW1lb3V0JykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3N0YXJ0cyB0aW1lb3V0IHdoZW4gaW5pdGlhbGl6ZWQnLCBpbmplY3QoZnVuY3Rpb24oJHVpYk1vZGFsLCBTRVNTSU9OX1RJTUVPVVQsICRxKSB7XG4gICAgICAgIC8qIFRoZSBjYWxsIHRvIHJlc2V0VGltZW91dCBpbiB0aGUgcnVuIGJsb2NrIGluaXRpYWxpemVzIHRoZSB0aW1lb3V0IHRvXG4gICAgICAgICAqIHRoZSByZWFsIHNob3dUaW1lb3V0RGlhbG9nIGZ1bmN0aW9uIGJlZm9yZSB3ZSBjYW4gd2VkZ2Ugb3VyIHNweSBpbi5cbiAgICAgICAgICogU28gaGVyZSBJIGFtIHNweWluZyBvbiAkdWliTW9kYWwub3BlbiAqL1xuICAgICAgICB2YXIgbW9kYWxTcHkgPSBzcHlPbigkdWliTW9kYWwsICdvcGVuJykuYW5kLnJldHVyblZhbHVlKHsgcmVzdWx0OiAkcS5kZWZlcigpLnByb21pc2UgfSk7XG4gICAgICAgIGV4cGVjdChtb2RhbFNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goU0VTU0lPTl9USU1FT1VUICsgMzAwMDApO1xuICAgICAgICBleHBlY3QobW9kYWxTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgJHRpbWVvdXQudmVyaWZ5Tm9QZW5kaW5nVGFza3MoKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVzZXRzIHRpbWVvdXQgb24gQUpBWCByZXF1ZXN0cycsIGluamVjdChmdW5jdGlvbigkaHR0cCwgJGh0dHBCYWNrZW5kKSB7XG4gICAgICAgIHZhciBpbml0aWFsQ2FsbENvdW50ID0gcmVzZXRUaW1lb3V0U3B5LmNhbGxzLmNvdW50KCk7XG4gICAgICAgICRodHRwQmFja2VuZC53aGVuR0VUKCcvZmFrZVVSTCcpLnJlc3BvbmQoJ3lheSEnKTtcbiAgICAgICAgJGh0dHAuZ2V0KCcvZmFrZVVSTCcpO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgZXhwZWN0KHJlc2V0VGltZW91dFNweS5jYWxscy5jb3VudCgpIC0gaW5pdGlhbENhbGxDb3VudCkudG9CZSgxKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnZG9lcyBub3QgcmVzZXQgdGltZW91dCBvbiBBSkFYIGZvciBtb2RhbCB0ZW1wbGF0ZScsIGluamVjdChmdW5jdGlvbigkaHR0cCwgJGh0dHBCYWNrZW5kKSB7XG4gICAgICAgIHZhciBpbml0aWFsQ2FsbENvdW50ID0gcmVzZXRUaW1lb3V0U3B5LmNhbGxzLmNvdW50KCksXG4gICAgICAgICAgICBtb2RhbFRlbXBsYXRlVXJsID0gJ3VpYi90ZW1wbGF0ZS9tb2RhbCc7XG4gICAgICAgICRodHRwQmFja2VuZC53aGVuR0VUKG1vZGFsVGVtcGxhdGVVcmwpLnJlc3BvbmQoJ3lheSEnKTtcbiAgICAgICAgJGh0dHAuZ2V0KG1vZGFsVGVtcGxhdGVVcmwpO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgZXhwZWN0KHJlc2V0VGltZW91dFNweS5jYWxscy5jb3VudCgpIC0gaW5pdGlhbENhbGxDb3VudCkudG9CZSgwKTtcbiAgICB9KSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
