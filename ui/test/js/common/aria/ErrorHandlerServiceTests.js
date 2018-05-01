System.register(['test/js/TestInitializer', 'common/aria/AriaModule'], function (_export) {
    'use strict';

    var ariaModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonAriaAriaModule) {
            ariaModule = _commonAriaAriaModule['default'];
        }],
        execute: function () {

            describe('ErrorHandlerService', function () {

                var $document, $timeout, alertDiv;

                beforeEach(module(function ($provide) {
                    // Create a mock $document service so that we can add spies before the service is initialized.
                    var doc = angular.element(document);
                    $provide.value('$document', doc);

                    // Getting some unit test timing errors when waiting for ready, so we'll just execute the
                    // functions immediately.
                    spyOn(doc, 'ready').and.callFake(function (fn) {
                        if (fn) {
                            fn();
                        }
                    });

                    // Mock querySelectorAll() to return some fake errors.
                    spyOn(doc[0], 'querySelectorAll').and.returnValue([angular.element('<div class="reader-error">Error 1</div>')[0], angular.element('<div class="reader-error">Error 2</div>')[0]]);

                    // Mock getElementById() to return a fake alert div to add the errors to.
                    alertDiv = angular.element('<div id="alertDiv" />')[0];
                    spyOn(alertDiv, 'appendChild').and.callThrough();
                    spyOn(doc[0], 'getElementById').and.returnValue(alertDiv);
                }));

                beforeEach(module(ariaModule));

                beforeEach(inject(function (_$document_, _$timeout_) {
                    $document = _$document_;
                    $timeout = _$timeout_;
                }));

                it('initializes when document is ready', function () {
                    expect($document.ready).toHaveBeenCalled();
                });

                it('reads errors off of page after a short wait', function () {
                    expect($document[0].querySelectorAll).not.toHaveBeenCalled();
                    $timeout.flush();
                    expect($document[0].querySelectorAll).toHaveBeenCalled();
                });

                it('copies errors into alert div', function () {
                    $timeout.flush();
                    expect(alertDiv.appendChild.calls.count()).toEqual(2);
                    expect(alertDiv.appendChild.calls.argsFor(0)[0].textContent).toEqual('Error 1');
                    expect(alertDiv.appendChild.calls.argsFor(1)[0].textContent).toEqual('Error 2');
                });

                describe('setErrorMessages', function () {
                    var scope, errorHandlerService;

                    beforeEach(inject(function (_errorHandlerService_) {
                        errorHandlerService = _errorHandlerService_;
                        scope = {};
                    }));

                    function testNoMessage(scope, expectedMsg) {
                        var error = null;

                        errorHandlerService.setErrorMessages(scope, error);
                        expect(scope.errorMessages).toEqual(expectedMsg);

                        error = {
                            data: {}
                        };
                        errorHandlerService.setErrorMessages(scope, error);
                        expect(scope.errorMessages).toEqual(expectedMsg);
                    }

                    it('sets the default unexpected error message with no message', function () {
                        testNoMessage(scope, '#{msgs.js_error_unexpected}');
                    });

                    it('sets the scope\'s unexpected error message with no message', function () {
                        scope.unexpectedError = 'look out below!';
                        testNoMessage(scope, scope.unexpectedError);
                    });

                    it('adds a single message', function () {
                        var msg = 'hi mom!',
                            error = {
                            data: {
                                message: msg
                            }
                        };

                        errorHandlerService.setErrorMessages(scope, error);
                        expect(scope.errorMessages).toEqual(msg);
                    });

                    it('adds multiple messages', function () {
                        var msg1 = 'hi mom!',
                            msg2 = 'i can see my house from here!',
                            error = {
                            data: {
                                message: [msg1, msg2]
                            }
                        };

                        errorHandlerService.setErrorMessages(scope, error);
                        expect(scope.errorMessages).toEqual(msg1 + '<br/>' + msg2);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9hcmlhL0Vycm9ySGFuZGxlclNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUExRjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsdUJBQXVCLFlBQVc7O2dCQUV2QyxJQUFJLFdBQVcsVUFBVTs7Z0JBRXpCLFdBQVcsT0FBTyxVQUFTLFVBQVU7O29CQUVqQyxJQUFJLE1BQU0sUUFBUSxRQUFRO29CQUMxQixTQUFTLE1BQU0sYUFBYTs7OztvQkFJNUIsTUFBTSxLQUFLLFNBQVMsSUFBSSxTQUFTLFVBQVMsSUFBSTt3QkFDMUMsSUFBSSxJQUFJOzRCQUNKOzs7OztvQkFLUixNQUFNLElBQUksSUFBSSxvQkFBb0IsSUFBSSxZQUFZLENBQzlDLFFBQVEsUUFBUSwyQ0FBMkMsSUFDM0QsUUFBUSxRQUFRLDJDQUEyQzs7O29CQUkvRCxXQUFXLFFBQVEsUUFBUSx5QkFBeUI7b0JBQ3BELE1BQU0sVUFBVSxlQUFlLElBQUk7b0JBQ25DLE1BQU0sSUFBSSxJQUFJLGtCQUFrQixJQUFJLFlBQVk7OztnQkFHcEQsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsYUFBYSxZQUFZO29CQUNoRCxZQUFZO29CQUNaLFdBQVc7OztnQkFHZixHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLFVBQVUsT0FBTzs7O2dCQUc1QixHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxPQUFPLFVBQVUsR0FBRyxrQkFBa0IsSUFBSTtvQkFDMUMsU0FBUztvQkFDVCxPQUFPLFVBQVUsR0FBRyxrQkFBa0I7OztnQkFHMUMsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsU0FBUztvQkFDVCxPQUFPLFNBQVMsWUFBWSxNQUFNLFNBQVMsUUFBUTtvQkFDbkQsT0FBTyxTQUFTLFlBQVksTUFBTSxRQUFRLEdBQUcsR0FBRyxhQUFhLFFBQVE7b0JBQ3JFLE9BQU8sU0FBUyxZQUFZLE1BQU0sUUFBUSxHQUFHLEdBQUcsYUFBYSxRQUFROzs7Z0JBR3pFLFNBQVMsb0JBQW9CLFlBQVc7b0JBQ3BDLElBQUksT0FBTzs7b0JBRVgsV0FBVyxPQUFPLFVBQVMsdUJBQXVCO3dCQUM5QyxzQkFBc0I7d0JBQ3RCLFFBQVE7OztvQkFHWixTQUFTLGNBQWMsT0FBTyxhQUFhO3dCQUN2QyxJQUFJLFFBQVE7O3dCQUVaLG9CQUFvQixpQkFBaUIsT0FBTzt3QkFDNUMsT0FBTyxNQUFNLGVBQWUsUUFBUTs7d0JBRXBDLFFBQVE7NEJBQ0osTUFBTTs7d0JBRVYsb0JBQW9CLGlCQUFpQixPQUFPO3dCQUM1QyxPQUFPLE1BQU0sZUFBZSxRQUFROzs7b0JBR3hDLEdBQUcsNkRBQTZELFlBQVc7d0JBQ3ZFLGNBQWMsT0FBTzs7O29CQUd6QixHQUFHLDhEQUE4RCxZQUFXO3dCQUN4RSxNQUFNLGtCQUFrQjt3QkFDeEIsY0FBYyxPQUFPLE1BQU07OztvQkFHL0IsR0FBRyx5QkFBeUIsWUFBVzt3QkFDbkMsSUFBSSxNQUFNOzRCQUNOLFFBQVE7NEJBQ0osTUFBTTtnQ0FDRixTQUFTOzs7O3dCQUlyQixvQkFBb0IsaUJBQWlCLE9BQU87d0JBQzVDLE9BQU8sTUFBTSxlQUFlLFFBQVE7OztvQkFHeEMsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsSUFBSSxPQUFPOzRCQUNQLE9BQU87NEJBQ1AsUUFBUTs0QkFDSixNQUFNO2dDQUNGLFNBQVMsQ0FBRSxNQUFNOzs7O3dCQUk3QixvQkFBb0IsaUJBQWlCLE9BQU87d0JBQzVDLE9BQU8sTUFBTSxlQUFlLFFBQVEsT0FBTyxVQUFVOzs7Ozs7R0FROUQiLCJmaWxlIjoiY29tbW9uL2FyaWEvRXJyb3JIYW5kbGVyU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhcmlhTW9kdWxlIGZyb20gJ2NvbW1vbi9hcmlhL0FyaWFNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0Vycm9ySGFuZGxlclNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgJGRvY3VtZW50LCAkdGltZW91dCwgYWxlcnREaXY7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrICRkb2N1bWVudCBzZXJ2aWNlIHNvIHRoYXQgd2UgY2FuIGFkZCBzcGllcyBiZWZvcmUgdGhlIHNlcnZpY2UgaXMgaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgdmFyIGRvYyA9IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCk7XHJcbiAgICAgICAgJHByb3ZpZGUudmFsdWUoJyRkb2N1bWVudCcsIGRvYyk7XHJcblxyXG4gICAgICAgIC8vIEdldHRpbmcgc29tZSB1bml0IHRlc3QgdGltaW5nIGVycm9ycyB3aGVuIHdhaXRpbmcgZm9yIHJlYWR5LCBzbyB3ZSdsbCBqdXN0IGV4ZWN1dGUgdGhlXHJcbiAgICAgICAgLy8gZnVuY3Rpb25zIGltbWVkaWF0ZWx5LlxyXG4gICAgICAgIHNweU9uKGRvYywgJ3JlYWR5JykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgICAgIGlmIChmbikge1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNb2NrIHF1ZXJ5U2VsZWN0b3JBbGwoKSB0byByZXR1cm4gc29tZSBmYWtlIGVycm9ycy5cclxuICAgICAgICBzcHlPbihkb2NbMF0sICdxdWVyeVNlbGVjdG9yQWxsJykuYW5kLnJldHVyblZhbHVlKFtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCc8ZGl2IGNsYXNzPVwicmVhZGVyLWVycm9yXCI+RXJyb3IgMTwvZGl2PicpWzBdLFxyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJyZWFkZXItZXJyb3JcIj5FcnJvciAyPC9kaXY+JylbMF1cclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayBnZXRFbGVtZW50QnlJZCgpIHRvIHJldHVybiBhIGZha2UgYWxlcnQgZGl2IHRvIGFkZCB0aGUgZXJyb3JzIHRvLlxyXG4gICAgICAgIGFsZXJ0RGl2ID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2IGlkPVwiYWxlcnREaXZcIiAvPicpWzBdO1xyXG4gICAgICAgIHNweU9uKGFsZXJ0RGl2LCAnYXBwZW5kQ2hpbGQnKS5hbmQuY2FsbFRocm91Z2goKTtcclxuICAgICAgICBzcHlPbihkb2NbMF0sICdnZXRFbGVtZW50QnlJZCcpLmFuZC5yZXR1cm5WYWx1ZShhbGVydERpdik7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXJpYU1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kZG9jdW1lbnRfLCBfJHRpbWVvdXRfKSB7XHJcbiAgICAgICAgJGRvY3VtZW50ID0gXyRkb2N1bWVudF87XHJcbiAgICAgICAgJHRpbWVvdXQgPSBfJHRpbWVvdXRfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdpbml0aWFsaXplcyB3aGVuIGRvY3VtZW50IGlzIHJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KCRkb2N1bWVudC5yZWFkeSkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlYWRzIGVycm9ycyBvZmYgb2YgcGFnZSBhZnRlciBhIHNob3J0IHdhaXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICBleHBlY3QoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjb3BpZXMgZXJyb3JzIGludG8gYWxlcnQgZGl2JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcclxuICAgICAgICBleHBlY3QoYWxlcnREaXYuYXBwZW5kQ2hpbGQuY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QoYWxlcnREaXYuYXBwZW5kQ2hpbGQuY2FsbHMuYXJnc0ZvcigwKVswXS50ZXh0Q29udGVudCkudG9FcXVhbCgnRXJyb3IgMScpO1xyXG4gICAgICAgIGV4cGVjdChhbGVydERpdi5hcHBlbmRDaGlsZC5jYWxscy5hcmdzRm9yKDEpWzBdLnRleHRDb250ZW50KS50b0VxdWFsKCdFcnJvciAyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2V0RXJyb3JNZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzY29wZSwgZXJyb3JIYW5kbGVyU2VydmljZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2Vycm9ySGFuZGxlclNlcnZpY2VfKSB7XHJcbiAgICAgICAgICAgIGVycm9ySGFuZGxlclNlcnZpY2UgPSBfZXJyb3JIYW5kbGVyU2VydmljZV87XHJcbiAgICAgICAgICAgIHNjb3BlID0ge307XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0Tm9NZXNzYWdlKHNjb3BlLCBleHBlY3RlZE1zZykge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgZXJyb3JIYW5kbGVyU2VydmljZS5zZXRFcnJvck1lc3NhZ2VzKHNjb3BlLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5lcnJvck1lc3NhZ2VzKS50b0VxdWFsKGV4cGVjdGVkTXNnKTtcclxuXHJcbiAgICAgICAgICAgIGVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgZGF0YToge31cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZXJyb3JIYW5kbGVyU2VydmljZS5zZXRFcnJvck1lc3NhZ2VzKHNjb3BlLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5lcnJvck1lc3NhZ2VzKS50b0VxdWFsKGV4cGVjdGVkTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSBkZWZhdWx0IHVuZXhwZWN0ZWQgZXJyb3IgbWVzc2FnZSB3aXRoIG5vIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdE5vTWVzc2FnZShzY29wZSwgJyN7bXNncy5qc19lcnJvcl91bmV4cGVjdGVkfScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgc2NvcGVcXCdzIHVuZXhwZWN0ZWQgZXJyb3IgbWVzc2FnZSB3aXRoIG5vIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2NvcGUudW5leHBlY3RlZEVycm9yID0gJ2xvb2sgb3V0IGJlbG93ISc7XHJcbiAgICAgICAgICAgIHRlc3ROb01lc3NhZ2Uoc2NvcGUsIHNjb3BlLnVuZXhwZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhZGRzIGEgc2luZ2xlIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9ICdoaSBtb20hJyxcclxuICAgICAgICAgICAgICAgIGVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGVycm9ySGFuZGxlclNlcnZpY2Uuc2V0RXJyb3JNZXNzYWdlcyhzY29wZSwgZXJyb3IpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuZXJyb3JNZXNzYWdlcykudG9FcXVhbChtc2cpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWRkcyBtdWx0aXBsZSBtZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbXNnMSA9ICdoaSBtb20hJyxcclxuICAgICAgICAgICAgICAgIG1zZzIgPSAnaSBjYW4gc2VlIG15IGhvdXNlIGZyb20gaGVyZSEnLFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBbIG1zZzEsIG1zZzIgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBlcnJvckhhbmRsZXJTZXJ2aWNlLnNldEVycm9yTWVzc2FnZXMoc2NvcGUsIGVycm9yKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmVycm9yTWVzc2FnZXMpLnRvRXF1YWwobXNnMSArICc8YnIvPicgKyBtc2cyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
