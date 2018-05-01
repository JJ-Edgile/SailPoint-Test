System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {

    /**
     * Tests for the SelectionCtrl.
     */
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {
            describe('SelectionCtrl', function () {

                var rootScope, scope, location, http, dataService;

                // Let the tests know we'll use the reset module.
                beforeEach(module(resetModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 * '$scope', '$rootScope', '$location', 'resetDataService', 'SMSMessagingService', 'routingService'
                 */
                beforeEach(inject(function ($rootScope, $location, $httpBackend, $controller, resetDataService) {

                    // Create a mock scope.
                    rootScope = $rootScope;
                    scope = $rootScope.$new();
                    location = $location;
                    http = $httpBackend;
                    dataService = resetDataService;

                    // create a test controller
                    $controller('SelectionCtrl', {
                        $scope: scope,
                        $location: location,
                        resetDataService: resetDataService
                    });
                }));

                /**
                 * Create the URL for the endpoint with the given query string.
                 */
                var getUrl = function () {
                    return '/ui/rest/userReset/sendSMS';
                };

                var smsSubmit = function () {
                    scope.selectionModel.authMethod = 'sms';
                    scope.submit();
                };

                describe('calls sendSMS', function () {
                    it('with success', function () {
                        http.expectPOST(getUrl()).respond(200, '');
                        smsSubmit();
                        rootScope.$apply(); // $apply() will force the digest to cycle (??)
                        http.flush();

                        expect(dataService.smsStatus.show).toBe(true);
                        expect(dataService.smsStatus.hasError).toBe(false);
                        expect(dataService.smsStatus.text).toEqual('ui_reset_sms_sent');
                        // only route to the SMS page if sending an SMS text was successful
                        expect(location.path()).toEqual('/sms');
                    });

                    it('with error', function () {
                        http.expectPOST(getUrl()).respond(503, { message: ['SMS Service Provider is unavailable at this time'] });
                        smsSubmit();
                        rootScope.$apply();
                        http.flush();

                        expect(dataService.smsStatus.show).toBe(true);
                        expect(dataService.smsStatus.hasError).toBe(true);
                        expect(dataService.smsStatus.text).toEqual('SMS Service Provider is unavailable at this time');
                        // do not leave the selection page if there is an error
                        expect(location.path()).toEqual('');
                    });
                });

                describe('act like a controller', function () {

                    it('should initialize authMethod to the auth questions page', function () {
                        scope.submit();
                        expect(location.path()).toEqual('/questions');
                    });

                    it('should navigate to the auth questions page', function () {
                        scope.selectionModel.authMethod = 'questions';
                        scope.submit();
                        expect(location.path()).toEqual('/questions');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1NlbGVjdGlvbkN0cmxUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5QkFBeUIsVUFBVSxTQUFTOzs7OztJQUtwRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0JBQXNCO1lBQzVFLGNBQWMscUJBQXFCOztRQUV2QyxTQUFTLFlBQVk7WUFON0IsU0FBUyxpQkFBaUIsWUFBVzs7Z0JBRWpDLElBQUksV0FBVyxPQUFPLFVBQVUsTUFBTTs7O2dCQUd0QyxXQUFXLE9BQU87Ozs7OztnQkFNbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxXQUFXLGNBQWMsYUFBYSxrQkFBa0I7OztvQkFHM0YsWUFBWTtvQkFDWixRQUFRLFdBQVc7b0JBQ25CLFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxjQUFjOzs7b0JBR2QsWUFBWSxpQkFBaUI7d0JBQ3pCLFFBQVE7d0JBQ1IsV0FBVzt3QkFDWCxrQkFBa0I7Ozs7Ozs7Z0JBTzFCLElBQUksU0FBUyxZQUFXO29CQUNwQixPQUFPOzs7Z0JBR1gsSUFBSSxZQUFZLFlBQVc7b0JBQ3ZCLE1BQU0sZUFBZSxhQUFhO29CQUNsQyxNQUFNOzs7Z0JBR1YsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsR0FBRyxnQkFBZ0IsWUFBVzt3QkFDMUIsS0FBSyxXQUFXLFVBQVUsUUFBUSxLQUFLO3dCQUN2Qzt3QkFDQSxVQUFVO3dCQUNWLEtBQUs7O3dCQUVMLE9BQU8sWUFBWSxVQUFVLE1BQU0sS0FBSzt3QkFDeEMsT0FBTyxZQUFZLFVBQVUsVUFBVSxLQUFLO3dCQUM1QyxPQUFPLFlBQVksVUFBVSxNQUFNLFFBQVE7O3dCQUUzQyxPQUFPLFNBQVMsUUFBUSxRQUFROzs7b0JBR3BDLEdBQUcsY0FBYyxZQUFXO3dCQUN4QixLQUFLLFdBQVcsVUFBVSxRQUFRLEtBQzlCLEVBQUMsU0FBUyxDQUFDO3dCQUNmO3dCQUNBLFVBQVU7d0JBQ1YsS0FBSzs7d0JBRUwsT0FBTyxZQUFZLFVBQVUsTUFBTSxLQUFLO3dCQUN4QyxPQUFPLFlBQVksVUFBVSxVQUFVLEtBQUs7d0JBQzVDLE9BQU8sWUFBWSxVQUFVLE1BQU0sUUFBUTs7d0JBRTNDLE9BQU8sU0FBUyxRQUFRLFFBQVE7Ozs7Z0JBSXhDLFNBQVMseUJBQXlCLFlBQVc7O29CQUV6QyxHQUFHLDJEQUEyRCxZQUFXO3dCQUNyRSxNQUFNO3dCQUNOLE9BQU8sU0FBUyxRQUFRLFFBQVE7OztvQkFHcEMsR0FBRyw4Q0FBOEMsWUFBVzt3QkFDeEQsTUFBTSxlQUFlLGFBQWE7d0JBQ2xDLE1BQU07d0JBQ04sT0FBTyxTQUFTLFFBQVEsUUFBUTs7Ozs7O0dBWXpDIiwiZmlsZSI6InJlc2V0L1NlbGVjdGlvbkN0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCByZXNldE1vZHVsZSBmcm9tICdyZXNldC9SZXNldEFwcE1vZHVsZSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBTZWxlY3Rpb25DdHJsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ1NlbGVjdGlvbkN0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgcm9vdFNjb3BlLCBzY29wZSwgbG9jYXRpb24sIGh0dHAsIGRhdGFTZXJ2aWNlO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIHJlc2V0IG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgbW9ja3MgZm9yIG91ciB0ZXN0cyAtIGEgc2NvcGUgYW5kIHRoZSBjb250cm9sbGVyLlxyXG4gICAgICogJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICdyZXNldERhdGFTZXJ2aWNlJywgJ1NNU01lc3NhZ2luZ1NlcnZpY2UnLCAncm91dGluZ1NlcnZpY2UnXHJcbiAgICAgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJGh0dHBCYWNrZW5kLCAkY29udHJvbGxlciwgcmVzZXREYXRhU2VydmljZSkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxyXG4gICAgICAgIHJvb3RTY29wZSA9ICRyb290U2NvcGU7XHJcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICBsb2NhdGlvbiA9ICRsb2NhdGlvbjtcclxuICAgICAgICBodHRwID0gJGh0dHBCYWNrZW5kO1xyXG4gICAgICAgIGRhdGFTZXJ2aWNlID0gcmVzZXREYXRhU2VydmljZTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGEgdGVzdCBjb250cm9sbGVyXHJcbiAgICAgICAgJGNvbnRyb2xsZXIoJ1NlbGVjdGlvbkN0cmwnLCB7XHJcbiAgICAgICAgICAgICRzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICRsb2NhdGlvbjogbG9jYXRpb24sXHJcbiAgICAgICAgICAgIHJlc2V0RGF0YVNlcnZpY2U6IHJlc2V0RGF0YVNlcnZpY2VcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgVVJMIGZvciB0aGUgZW5kcG9pbnQgd2l0aCB0aGUgZ2l2ZW4gcXVlcnkgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICcvdWkvcmVzdC91c2VyUmVzZXQvc2VuZFNNUyc7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzbXNTdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzY29wZS5zZWxlY3Rpb25Nb2RlbC5hdXRoTWV0aG9kID0gJ3Ntcyc7XHJcbiAgICAgICAgc2NvcGUuc3VibWl0KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlc2NyaWJlKCdjYWxscyBzZW5kU01TJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3dpdGggc3VjY2VzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoZ2V0VXJsKCkpLnJlc3BvbmQoMjAwLCAnJyk7XHJcbiAgICAgICAgICAgIHNtc1N1Ym1pdCgpO1xyXG4gICAgICAgICAgICByb290U2NvcGUuJGFwcGx5KCk7IC8vICRhcHBseSgpIHdpbGwgZm9yY2UgdGhlIGRpZ2VzdCB0byBjeWNsZSAoPz8pXHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChkYXRhU2VydmljZS5zbXNTdGF0dXMuc2hvdykudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRhdGFTZXJ2aWNlLnNtc1N0YXR1cy5oYXNFcnJvcikudG9CZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkYXRhU2VydmljZS5zbXNTdGF0dXMudGV4dCkudG9FcXVhbCgndWlfcmVzZXRfc21zX3NlbnQnKTtcclxuICAgICAgICAgICAgLy8gb25seSByb3V0ZSB0byB0aGUgU01TIHBhZ2UgaWYgc2VuZGluZyBhbiBTTVMgdGV4dCB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICBleHBlY3QobG9jYXRpb24ucGF0aCgpKS50b0VxdWFsKCcvc21zJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd3aXRoIGVycm9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoKSkucmVzcG9uZCg1MDMsXHJcbiAgICAgICAgICAgICAgICB7bWVzc2FnZTogWydTTVMgU2VydmljZSBQcm92aWRlciBpcyB1bmF2YWlsYWJsZSBhdCB0aGlzIHRpbWUnXX0pO1xyXG4gICAgICAgICAgICBzbXNTdWJtaXQoKTtcclxuICAgICAgICAgICAgcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoZGF0YVNlcnZpY2Uuc21zU3RhdHVzLnNob3cpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkYXRhU2VydmljZS5zbXNTdGF0dXMuaGFzRXJyb3IpLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkYXRhU2VydmljZS5zbXNTdGF0dXMudGV4dCkudG9FcXVhbCgnU01TIFNlcnZpY2UgUHJvdmlkZXIgaXMgdW5hdmFpbGFibGUgYXQgdGhpcyB0aW1lJyk7XHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBsZWF2ZSB0aGUgc2VsZWN0aW9uIHBhZ2UgaWYgdGhlcmUgaXMgYW4gZXJyb3JcclxuICAgICAgICAgICAgZXhwZWN0KGxvY2F0aW9uLnBhdGgoKSkudG9FcXVhbCgnJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYWN0IGxpa2UgYSBjb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSBhdXRoTWV0aG9kIHRvIHRoZSBhdXRoIHF1ZXN0aW9ucyBwYWdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobG9jYXRpb24ucGF0aCgpKS50b0VxdWFsKCcvcXVlc3Rpb25zJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgdG8gdGhlIGF1dGggcXVlc3Rpb25zIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2VsZWN0aW9uTW9kZWwuYXV0aE1ldGhvZCA9ICdxdWVzdGlvbnMnO1xyXG4gICAgICAgICAgICBzY29wZS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxvY2F0aW9uLnBhdGgoKSkudG9FcXVhbCgnL3F1ZXN0aW9ucycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
