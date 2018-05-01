System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the PamIdentitySuggestService.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('PamIdentitySuggestService', function () {

                var pamIdentitySuggestService = undefined,
                    $httpBackend = undefined;
                var baseUrl = '/ui/rest/pam/identities/suggest';

                // Load the test module to get the testService and access request module.
                beforeEach(module(testModule, pamModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 11 */
                beforeEach(inject(function (_pamIdentitySuggestService_, _$httpBackend_) {
                    $httpBackend = _$httpBackend_;
                    pamIdentitySuggestService = _pamIdentitySuggestService_;
                }));

                describe('getObjects', function () {
                    it('should call getObjects', function () {
                        var q = 'a',
                            s = 0,
                            l = 5;

                        var url = baseUrl + '?limit=' + l + '&query=' + q + '&start=' + s;
                        $httpBackend.expectGET(url).respond(200, { id: 1 });
                        pamIdentitySuggestService.getObjects(q, s, l);
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7OztJQVFuRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNkJBQTZCLFlBQVc7O2dCQUU3QyxJQUFJLDRCQUF5QjtvQkFBRSxlQUFZO2dCQUMzQyxJQUFNLFVBQU87OztnQkFHYixXQUFXLE9BQU8sWUFBWTs7Ozs7O2dCQU05QixXQUFXLE9BQU8sVUFBUyw2QkFBNkIsZ0JBQWdCO29CQUNwRSxlQUFlO29CQUNmLDRCQUE0Qjs7O2dCQUdoQyxTQUFTLGNBQWMsWUFBTTtvQkFDekIsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsSUFBSSxJQUFJOzRCQUNKLElBQUk7NEJBQ0osSUFBSTs7d0JBRVIsSUFBTSxNQUNDLFVBQU8sWUFBVSxJQUFDLFlBQVUsSUFBQyxZQUFVO3dCQUM5QyxhQUFhLFVBQVUsS0FBSyxRQUFRLEtBQUssRUFBQyxJQUFJO3dCQUM5QywwQkFBMEIsV0FBVyxHQUFHLEdBQUc7d0JBQzNDLGFBQWE7Ozs7OztHQWF0QiIsImZpbGUiOiJwYW0vUGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ1BhbUlkZW50aXR5U3VnZ2VzdFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlLCAkaHR0cEJhY2tlbmQ7XG4gICAgY29uc3QgYmFzZVVybCA9IGAvdWkvcmVzdC9wYW0vaWRlbnRpdGllcy9zdWdnZXN0YDtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBwYW1Nb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1JZGVudGl0eVN1Z2dlc3RTZXJ2aWNlXywgXyRodHRwQmFja2VuZF8pIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHBhbUlkZW50aXR5U3VnZ2VzdFNlcnZpY2UgPSBfcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2dldE9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRPYmplY3RzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcSA9ICdhJyxcbiAgICAgICAgICAgICAgICBzID0gMCxcbiAgICAgICAgICAgICAgICBsID0gNTtcblxuICAgICAgICAgICAgY29uc3QgdXJsID1cbiAgICAgICAgICAgICAgICBgJHtiYXNlVXJsfT9saW1pdD0ke2x9JnF1ZXJ5PSR7cX0mc3RhcnQ9JHtzfWA7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIHtpZDogMX0pO1xuICAgICAgICAgICAgcGFtSWRlbnRpdHlTdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKHEsIHMsIGwpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
