System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the PasswordChangeError model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('PasswordChangeError', function () {
                var passwordChangeErrorData = undefined,
                    PasswordChangeError = undefined,
                    passwordChangeError = undefined,
                    spTranslateFilter = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordChangeError class and create some data to test with.
                 */
                beforeEach(inject(function (_PasswordChangeError_, _spTranslateFilter_, _PasswordLink_) {
                    PasswordChangeError = _PasswordChangeError_;
                    spTranslateFilter = _spTranslateFilter_;
                    passwordChangeErrorData = {
                        linkId: 'link1',
                        messages: ['message1', 'message2'],
                        link: new _PasswordLink_({
                            id: 'link1',
                            accountId: 'teddy.brosevelt',
                            applicationName: 'brosDB'
                        }),
                        constraintsViolation: true
                    };
                    passwordChangeError = new PasswordChangeError(passwordChangeErrorData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new PasswordChangeError(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new PasswordChangeError('hi mom');
                    }).toThrow();
                    expect(function () {
                        new PasswordChangeError(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns a linkId read from data', function () {
                    expect(passwordChangeError.getLinkId()).toEqual(passwordChangeErrorData.linkId);
                });

                it('returns a friendly message read from the link', function () {
                    var friendlyMessage = spTranslateFilter('ui_identity_password_change_error', passwordChangeErrorData.link.applicationName, passwordChangeErrorData.link.accoundId, passwordChangeError.messages[0]);
                    expect(passwordChangeError.getFriendlyMessage()).toEqual(friendlyMessage);
                });

                it('returns message read the message list when there is no link', function () {
                    delete passwordChangeError.link;
                    expect(passwordChangeError.getFriendlyMessage()).toEqual(passwordChangeError.messages[0]);
                });

                it('returns messages read from data', function () {
                    expect(passwordChangeError.getMessages().join()).toEqual(passwordChangeErrorData.messages.join());
                });

                it('returns true to constraints violation read from data', function () {
                    expect(passwordChangeError.isConstraintsViolation()).toBeTruthy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9QYXNzd29yZENoYW5nZUVycm9yVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDZCQUE2QixVQUFVLFNBQVM7Ozs7O0lBS3hGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTtZQU43QixTQUFTLHVCQUF1QixZQUFXO2dCQUN2QyxJQUFJLDBCQUF1QjtvQkFDdkIsc0JBQW1CO29CQUNuQixzQkFBbUI7b0JBQ25CLG9CQUFpQjs7O2dCQUdyQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyx1QkFBdUIscUJBQXFCLGdCQUFnQjtvQkFDbkYsc0JBQXNCO29CQUN0QixvQkFBb0I7b0JBQ3BCLDBCQUEwQjt3QkFDdEIsUUFBUTt3QkFDUixVQUFVLENBQUMsWUFBWTt3QkFDdkIsTUFBTSxJQUFJLGVBQWU7NEJBQ3JCLElBQUk7NEJBQ0osV0FBVzs0QkFDWCxpQkFBaUI7O3dCQUVyQixzQkFBc0I7O29CQUUxQixzQkFBc0IsSUFBSSxvQkFBb0I7OztnQkFHbEQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksb0JBQW9CO3VCQUFVOzs7Z0JBRzFELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLG9CQUFvQjt1QkFBYztvQkFDMUQsT0FBTyxZQUFXO3dCQUFFLElBQUksb0JBQW9CLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR3hGLEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sb0JBQW9CLGFBQWEsUUFBUSx3QkFBd0I7OztnQkFHNUUsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsSUFBSSxrQkFBa0Isa0JBQWtCLHFDQUNwQyx3QkFBd0IsS0FBSyxpQkFBaUIsd0JBQXdCLEtBQUssV0FDM0Usb0JBQW9CLFNBQVM7b0JBQ2pDLE9BQU8sb0JBQW9CLHNCQUFzQixRQUFROzs7Z0JBRzdELEdBQUcsK0RBQStELFlBQVc7b0JBQ3pFLE9BQU8sb0JBQW9CO29CQUMzQixPQUFPLG9CQUFvQixzQkFBc0IsUUFBUSxvQkFBb0IsU0FBUzs7O2dCQUcxRixHQUFHLG1DQUFtQyxZQUFXO29CQUM3QyxPQUFPLG9CQUFvQixjQUFjLFFBQVEsUUFBUSx3QkFBd0IsU0FBUzs7O2dCQUc5RixHQUFHLHdEQUF3RCxZQUFXO29CQUNsRSxPQUFPLG9CQUFvQiwwQkFBMEI7Ozs7O0dBa0IxRCIsImZpbGUiOiJjb21tb24vbW9kZWwvUGFzc3dvcmRDaGFuZ2VFcnJvclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFBhc3N3b3JkQ2hhbmdlRXJyb3IgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnUGFzc3dvcmRDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBwYXNzd29yZENoYW5nZUVycm9yRGF0YSxcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VFcnJvcixcbiAgICAgICAgcGFzc3dvcmRDaGFuZ2VFcnJvcixcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXI7XG5cbiAgICAvLyBVc2UgdGhlIG1vZGVsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIFBhc3N3b3JkQ2hhbmdlRXJyb3IgY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9QYXNzd29yZENoYW5nZUVycm9yXywgX3NwVHJhbnNsYXRlRmlsdGVyXywgX1Bhc3N3b3JkTGlua18pIHtcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VFcnJvciA9IF9QYXNzd29yZENoYW5nZUVycm9yXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICBwYXNzd29yZENoYW5nZUVycm9yRGF0YSA9IHtcbiAgICAgICAgICAgIGxpbmtJZDogJ2xpbmsxJyxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ21lc3NhZ2UxJywgJ21lc3NhZ2UyJ10sXG4gICAgICAgICAgICBsaW5rOiBuZXcgX1Bhc3N3b3JkTGlua18oe1xuICAgICAgICAgICAgICAgIGlkOiAnbGluazEnLFxuICAgICAgICAgICAgICAgIGFjY291bnRJZDogJ3RlZGR5LmJyb3NldmVsdCcsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjb25zdHJhaW50c1Zpb2xhdGlvbjogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBwYXNzd29yZENoYW5nZUVycm9yID0gbmV3IFBhc3N3b3JkQ2hhbmdlRXJyb3IocGFzc3dvcmRDaGFuZ2VFcnJvckRhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZENoYW5nZUVycm9yKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZENoYW5nZUVycm9yKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZENoYW5nZUVycm9yKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGxpbmtJZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VFcnJvci5nZXRMaW5rSWQoKSkudG9FcXVhbChwYXNzd29yZENoYW5nZUVycm9yRGF0YS5saW5rSWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBmcmllbmRseSBtZXNzYWdlIHJlYWQgZnJvbSB0aGUgbGluaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZnJpZW5kbHlNZXNzYWdlID0gc3BUcmFuc2xhdGVGaWx0ZXIoJ3VpX2lkZW50aXR5X3Bhc3N3b3JkX2NoYW5nZV9lcnJvcicsXG4gICAgICAgICAgICBwYXNzd29yZENoYW5nZUVycm9yRGF0YS5saW5rLmFwcGxpY2F0aW9uTmFtZSwgcGFzc3dvcmRDaGFuZ2VFcnJvckRhdGEubGluay5hY2NvdW5kSWQsXG4gICAgICAgICAgICBwYXNzd29yZENoYW5nZUVycm9yLm1lc3NhZ2VzWzBdKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlRXJyb3IuZ2V0RnJpZW5kbHlNZXNzYWdlKCkpLnRvRXF1YWwoZnJpZW5kbHlNZXNzYWdlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2UgcmVhZCB0aGUgbWVzc2FnZSBsaXN0IHdoZW4gdGhlcmUgaXMgbm8gbGluaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWxldGUgcGFzc3dvcmRDaGFuZ2VFcnJvci5saW5rO1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VFcnJvci5nZXRGcmllbmRseU1lc3NhZ2UoKSkudG9FcXVhbChwYXNzd29yZENoYW5nZUVycm9yLm1lc3NhZ2VzWzBdKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZUVycm9yLmdldE1lc3NhZ2VzKCkuam9pbigpKS50b0VxdWFsKHBhc3N3b3JkQ2hhbmdlRXJyb3JEYXRhLm1lc3NhZ2VzLmpvaW4oKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIHRvIGNvbnN0cmFpbnRzIHZpb2xhdGlvbiByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VFcnJvci5pc0NvbnN0cmFpbnRzVmlvbGF0aW9uKCkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
