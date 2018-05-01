System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Project: identityiq
     * Author: michael.hide
     * Created: 2/19/14 5:00 PM
     */

    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {
            describe('SMSMessagingService', function () {
                var http, scope, dataService, messagingService;

                beforeEach(module(resetModule));
                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function ($rootScope, $httpBackend, _resetDataService_, _SMSMessagingService_) {
                    dataService = _resetDataService_;
                    scope = $rootScope.$new();
                    scope.smsStatus = dataService.smsStatus;
                    http = $httpBackend;
                    messagingService = _SMSMessagingService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('sendSMS()', function () {

                    var getUrl = function () {
                        return '/identityiq/ui/rest/userReset/sendSMS';
                    };

                    it('should return success with no message.', function () {
                        http.expectPOST(getUrl()).respond(200, {});

                        messagingService.sendSMS().then(function (tmp) {
                            expect(scope.smsStatus.hasError).toBe(false);
                            expect(scope.smsStatus.text).toEqual('ui_reset_sms_sent');
                        }, function (tmp) {
                            // Error function, do nothing.
                        });
                        http.flush();
                    });

                    it('should return failure with error message.', function () {
                        http.expectPOST(getUrl()).respond(503, { message: ['SMS Service Provider is unavailable at this time'] });

                        messagingService.sendSMS().then(function (tmp) {
                            // Success function, do nothing.
                        }, function (tmp) {
                            expect(scope.smsStatus.hasError).toBe(true);
                            expect(scope.smsStatus.text).toEqual('SMS Service Provider is unavailable at this time');
                        });
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1NNU01lc3NhZ2luZ1NlcnZpY2VUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5QkFBeUIsVUFBVSxTQUFTOzs7Ozs7Ozs7SUFDeEY7O0lBVUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNCQUFzQjtZQUM1RSxjQUFjLHFCQUFxQjs7UUFFdkMsU0FBUyxZQUFZO1lBSjdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQUksTUFBTSxPQUFPLGFBQ2I7O2dCQUVKLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUyxTQUFTLG1CQUFtQjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxZQUFZLGNBQWMsb0JBQW9CLHVCQUF1QjtvQkFDNUYsY0FBYztvQkFDZCxRQUFRLFdBQVc7b0JBQ25CLE1BQU0sWUFBWSxZQUFZO29CQUM5QixPQUFPO29CQUNQLG1CQUFtQjs7O2dCQUd2QixVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUdULFNBQVMsYUFBYSxZQUFXOztvQkFFN0IsSUFBSSxTQUFTLFlBQVc7d0JBQ3BCLE9BQU87OztvQkFHWCxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxLQUFLLFdBQVcsVUFBVSxRQUFRLEtBQUs7O3dCQUV2QyxpQkFBaUIsVUFBVSxLQUFLLFVBQVMsS0FBSzs0QkFDMUMsT0FBTyxNQUFNLFVBQVUsVUFBVSxLQUFLOzRCQUN0QyxPQUFPLE1BQU0sVUFBVSxNQUFNLFFBQVE7MkJBQ3RDLFVBQVMsS0FBSzs7O3dCQUdqQixLQUFLOzs7b0JBR1QsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsS0FBSyxXQUFXLFVBQVUsUUFBUSxLQUM5QixFQUFDLFNBQVMsQ0FBQzs7d0JBRWYsaUJBQWlCLFVBQVUsS0FBSyxVQUFTLEtBQUs7OzJCQUUzQyxVQUFTLEtBQUs7NEJBQ2IsT0FBTyxNQUFNLFVBQVUsVUFBVSxLQUFLOzRCQUN0QyxPQUFPLE1BQU0sVUFBVSxNQUFNLFFBQVE7O3dCQUV6QyxLQUFLOzs7Ozs7R0FTZCIsImZpbGUiOiJyZXNldC9TTVNNZXNzYWdpbmdTZXJ2aWNlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHJlc2V0TW9kdWxlIGZyb20gJ3Jlc2V0L1Jlc2V0QXBwTW9kdWxlJztcclxuXHJcbi8qKlxyXG4gKiBQcm9qZWN0OiBpZGVudGl0eWlxXHJcbiAqIEF1dGhvcjogbWljaGFlbC5oaWRlXHJcbiAqIENyZWF0ZWQ6IDIvMTkvMTQgNTowMCBQTVxyXG4gKi9cclxuXHJcbmRlc2NyaWJlKCdTTVNNZXNzYWdpbmdTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaHR0cCwgc2NvcGUsIGRhdGFTZXJ2aWNlLFxyXG4gICAgICAgIG1lc3NhZ2luZ1NlcnZpY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVzZXRNb2R1bGUpKTtcclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsICRodHRwQmFja2VuZCwgX3Jlc2V0RGF0YVNlcnZpY2VfLCBfU01TTWVzc2FnaW5nU2VydmljZV8pIHtcclxuICAgICAgICBkYXRhU2VydmljZSA9IF9yZXNldERhdGFTZXJ2aWNlXztcclxuICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNtc1N0YXR1cyA9IGRhdGFTZXJ2aWNlLnNtc1N0YXR1cztcclxuICAgICAgICBodHRwID0gJGh0dHBCYWNrZW5kO1xyXG4gICAgICAgIG1lc3NhZ2luZ1NlcnZpY2UgPSBfU01TTWVzc2FnaW5nU2VydmljZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XHJcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NlbmRTTVMoKScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnL2lkZW50aXR5aXEvdWkvcmVzdC91c2VyUmVzZXQvc2VuZFNNUyc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc3VjY2VzcyB3aXRoIG5vIG1lc3NhZ2UuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoKSkucmVzcG9uZCgyMDAsIHt9KTtcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlcnZpY2Uuc2VuZFNNUygpLnRoZW4oZnVuY3Rpb24odG1wKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuc21zU3RhdHVzLmhhc0Vycm9yKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5zbXNTdGF0dXMudGV4dCkudG9FcXVhbCgndWlfcmVzZXRfc21zX3NlbnQnKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24odG1wKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFcnJvciBmdW5jdGlvbiwgZG8gbm90aGluZy5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFpbHVyZSB3aXRoIGVycm9yIG1lc3NhZ2UuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVChnZXRVcmwoKSkucmVzcG9uZCg1MDMsXHJcbiAgICAgICAgICAgICAgICB7bWVzc2FnZTogWydTTVMgU2VydmljZSBQcm92aWRlciBpcyB1bmF2YWlsYWJsZSBhdCB0aGlzIHRpbWUnXX0pO1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnaW5nU2VydmljZS5zZW5kU01TKCkudGhlbihmdW5jdGlvbih0bXApIHtcclxuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MgZnVuY3Rpb24sIGRvIG5vdGhpbmcuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHRtcCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnNtc1N0YXR1cy5oYXNFcnJvcikudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5zbXNTdGF0dXMudGV4dCkudG9FcXVhbCgnU01TIFNlcnZpY2UgUHJvdmlkZXIgaXMgdW5hdmFpbGFibGUgYXQgdGhpcyB0aW1lJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
