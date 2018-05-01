System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the PasswordLink model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('PasswordLink', function () {
                var passwordLinkData, PasswordLink, PasswordChangeError, passwordLink;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordLink class and create some data to test with.
                 */
                beforeEach(inject(function (_PasswordLink_, _PasswordChangeError_) {
                    PasswordLink = _PasswordLink_;
                    PasswordChangeError = _PasswordChangeError_;
                    passwordLinkData = {
                        passwordPolicy: ['min length 10', 'min alpha 5'],
                        requiresCurrentPassword: true,
                        passwordChangeErrors: [{
                            linkId: '123',
                            messages: ['message1', 'message2'],
                            isConstraintsViolation: true,
                            link: new _PasswordLink_({
                                id: '123',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            })
                        }]
                    };
                    passwordLink = new PasswordLink(passwordLinkData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new PasswordLink(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new PasswordLink('hi mom');
                    }).toThrow();
                    expect(function () {
                        new PasswordLink(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('throws if the data passed to the constructor for password policy is not an array', function () {
                    expect(function () {
                        new PasswordLink({ passwordPolicy: 'broken' });
                    }).toThrow();
                    expect(function () {
                        new PasswordLink({ passwordPolicy: {} });
                    }).toThrow();
                });

                it('returns a password read from data', function () {
                    expect(passwordLink.getPasswordPolicy()).toEqual(passwordLinkData.passwordPolicy);
                });

                it('returns a requires current status read from data', function () {
                    expect(passwordLink.isRequiresCurrentPassword()).toEqual(passwordLinkData.requiresCurrentPassword);
                });

                it('returns password change request errors read from data', function () {
                    var passwordChangeErrors = passwordLink.getPasswordChangeErrors();
                    expect(passwordChangeErrors[0].getLinkId()).toEqual(passwordLinkData.passwordChangeErrors[0].linkId);
                    expect(passwordChangeErrors[0].getMessages().join()).toEqual(passwordLinkData.passwordChangeErrors[0].messages.join());
                    expect(passwordChangeErrors[0].isConstraintsViolation()).toEqual(passwordLinkData.passwordChangeErrors[0].constraintsViolation);
                });

                it('should clear password errors when clear function is called', function () {
                    passwordLink.clearPasswordChangeErrors();
                    expect(passwordLink.getPasswordChangeErrors().length).toEqual(0);
                });

                it('should update the password errors when setPasswordErrors is called', function () {
                    var passwordChangeErrors = [new PasswordChangeError({
                        constraintsViolation: false,
                        linkId: '123',
                        messages: ['message one']
                    })];
                    passwordLink.setPasswordChangeErrors(passwordChangeErrors);
                    expect(passwordLink.getPasswordChangeErrors()).toBe(passwordChangeErrors);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9QYXNzd29yZExpbmtUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsZ0JBQWdCLFlBQVc7Z0JBQ2hDLElBQUksa0JBQ0EsY0FDQSxxQkFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGdCQUFnQix1QkFBdUI7b0JBQzlELGVBQWU7b0JBQ2Ysc0JBQXNCO29CQUN0QixtQkFBbUI7d0JBQ2YsZ0JBQWdCLENBQ1osaUJBQ0E7d0JBRUoseUJBQXlCO3dCQUN6QixzQkFBc0IsQ0FBQzs0QkFDbkIsUUFBUTs0QkFDUixVQUFVLENBQUMsWUFBWTs0QkFDdkIsd0JBQXdCOzRCQUN4QixNQUFNLElBQUksZUFBZTtnQ0FDckIsSUFBSTtnQ0FDSixXQUFXO2dDQUNYLGlCQUFpQjs7OztvQkFJN0IsZUFBZSxJQUFJLGFBQWE7OztnQkFHcEMsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksYUFBYTt1QkFBVTs7O2dCQUduRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSxhQUFhO3VCQUFjO29CQUNuRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxhQUFhLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR2pGLEdBQUcsb0ZBQW9GLFlBQVc7b0JBQzlGLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGFBQWEsRUFBQyxnQkFBZ0I7dUJBQWU7b0JBQ3JFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGFBQWEsRUFBQyxnQkFBZ0I7dUJBQVM7OztnQkFHbkUsR0FBRyxxQ0FBcUMsWUFBVztvQkFDL0MsT0FBTyxhQUFhLHFCQUFxQixRQUFRLGlCQUFpQjs7O2dCQUd0RSxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxPQUFPLGFBQWEsNkJBQTZCLFFBQVEsaUJBQWlCOzs7Z0JBRzlFLEdBQUcseURBQXlELFlBQVc7b0JBQ25FLElBQUksdUJBQXVCLGFBQWE7b0JBQ3hDLE9BQU8scUJBQXFCLEdBQUcsYUFDL0IsUUFBUSxpQkFBaUIscUJBQXFCLEdBQUc7b0JBQ2pELE9BQU8scUJBQXFCLEdBQUcsY0FBYyxRQUM3QyxRQUFRLGlCQUFpQixxQkFBcUIsR0FBRyxTQUFTO29CQUMxRCxPQUFPLHFCQUFxQixHQUFHLDBCQUMvQixRQUFRLGlCQUFpQixxQkFBcUIsR0FBRzs7O2dCQUdyRCxHQUFHLDhEQUE4RCxZQUFXO29CQUN4RSxhQUFhO29CQUNiLE9BQU8sYUFBYSwwQkFBMEIsUUFBUSxRQUFROzs7Z0JBR2xFLEdBQUcsc0VBQXNFLFlBQVc7b0JBQ2hGLElBQUksdUJBQXVCLENBQUMsSUFBSSxvQkFBb0I7d0JBQ2hELHNCQUFzQjt3QkFDdEIsUUFBUTt3QkFDUixVQUFVLENBQUM7O29CQUVmLGFBQWEsd0JBQXdCO29CQUNyQyxPQUFPLGFBQWEsMkJBQTJCLEtBQUs7Ozs7O0dBZXpEIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9QYXNzd29yZExpbmtUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBQYXNzd29yZExpbmsgbW9kZWwgb2JqZWN0LlxuICovXG5kZXNjcmliZSgnUGFzc3dvcmRMaW5rJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhc3N3b3JkTGlua0RhdGEsXG4gICAgICAgIFBhc3N3b3JkTGluayxcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VFcnJvcixcbiAgICAgICAgcGFzc3dvcmRMaW5rO1xuXG4gICAgLy8gVXNlIHRoZSBtb2RlbCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBQYXNzd29yZExpbmsgY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9QYXNzd29yZExpbmtfLCBfUGFzc3dvcmRDaGFuZ2VFcnJvcl8pIHtcbiAgICAgICAgUGFzc3dvcmRMaW5rID0gX1Bhc3N3b3JkTGlua187XG4gICAgICAgIFBhc3N3b3JkQ2hhbmdlRXJyb3IgPSBfUGFzc3dvcmRDaGFuZ2VFcnJvcl87XG4gICAgICAgIHBhc3N3b3JkTGlua0RhdGEgPSB7XG4gICAgICAgICAgICBwYXNzd29yZFBvbGljeTogW1xuICAgICAgICAgICAgICAgICdtaW4gbGVuZ3RoIDEwJyxcbiAgICAgICAgICAgICAgICAnbWluIGFscGhhIDUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVxdWlyZXNDdXJyZW50UGFzc3dvcmQ6IHRydWUsXG4gICAgICAgICAgICBwYXNzd29yZENoYW5nZUVycm9yczogW3tcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ21lc3NhZ2UxJywgJ21lc3NhZ2UyJ10sXG4gICAgICAgICAgICAgICAgaXNDb25zdHJhaW50c1Zpb2xhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW5rOiBuZXcgX1Bhc3N3b3JkTGlua18oe1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMycsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRJZDogJ3RlZGR5LmJyb3NldmVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ2Jyb3NEQidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgcGFzc3dvcmRMaW5rID0gbmV3IFBhc3N3b3JkTGluayhwYXNzd29yZExpbmtEYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUGFzc3dvcmRMaW5rKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgndGhyb3dzIGlmIHRoZSBkYXRhIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgaXMgbm90IGFuIG9iamVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZExpbmsoJ2hpIG1vbScpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFBhc3N3b3JkTGluayhmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiB0aGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yIGZvciBwYXNzd29yZCBwb2xpY3kgaXMgbm90IGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFBhc3N3b3JkTGluayh7cGFzc3dvcmRQb2xpY3k6ICdicm9rZW4nfSk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUGFzc3dvcmRMaW5rKHtwYXNzd29yZFBvbGljeToge319KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBwYXNzd29yZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRMaW5rLmdldFBhc3N3b3JkUG9saWN5KCkpLnRvRXF1YWwocGFzc3dvcmRMaW5rRGF0YS5wYXNzd29yZFBvbGljeSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHJlcXVpcmVzIGN1cnJlbnQgc3RhdHVzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZExpbmsuaXNSZXF1aXJlc0N1cnJlbnRQYXNzd29yZCgpKS50b0VxdWFsKHBhc3N3b3JkTGlua0RhdGEucmVxdWlyZXNDdXJyZW50UGFzc3dvcmQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgcGFzc3dvcmQgY2hhbmdlIHJlcXVlc3QgZXJyb3JzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBwYXNzd29yZENoYW5nZUVycm9ycyA9IHBhc3N3b3JkTGluay5nZXRQYXNzd29yZENoYW5nZUVycm9ycygpO1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VFcnJvcnNbMF0uZ2V0TGlua0lkKCkpLlxuICAgICAgICB0b0VxdWFsKHBhc3N3b3JkTGlua0RhdGEucGFzc3dvcmRDaGFuZ2VFcnJvcnNbMF0ubGlua0lkKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlRXJyb3JzWzBdLmdldE1lc3NhZ2VzKCkuam9pbigpKS5cbiAgICAgICAgdG9FcXVhbChwYXNzd29yZExpbmtEYXRhLnBhc3N3b3JkQ2hhbmdlRXJyb3JzWzBdLm1lc3NhZ2VzLmpvaW4oKSk7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZUVycm9yc1swXS5pc0NvbnN0cmFpbnRzVmlvbGF0aW9uKCkpLlxuICAgICAgICB0b0VxdWFsKHBhc3N3b3JkTGlua0RhdGEucGFzc3dvcmRDaGFuZ2VFcnJvcnNbMF0uY29uc3RyYWludHNWaW9sYXRpb24pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjbGVhciBwYXNzd29yZCBlcnJvcnMgd2hlbiBjbGVhciBmdW5jdGlvbiBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcGFzc3dvcmRMaW5rLmNsZWFyUGFzc3dvcmRDaGFuZ2VFcnJvcnMoKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkTGluay5nZXRQYXNzd29yZENoYW5nZUVycm9ycygpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdXBkYXRlIHRoZSBwYXNzd29yZCBlcnJvcnMgd2hlbiBzZXRQYXNzd29yZEVycm9ycyBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHBhc3N3b3JkQ2hhbmdlRXJyb3JzID0gW25ldyBQYXNzd29yZENoYW5nZUVycm9yKHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzVmlvbGF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGxpbmtJZDogJzEyMycsXG4gICAgICAgICAgICBtZXNzYWdlczogWydtZXNzYWdlIG9uZSddXG4gICAgICAgIH0pXTtcbiAgICAgICAgcGFzc3dvcmRMaW5rLnNldFBhc3N3b3JkQ2hhbmdlRXJyb3JzKHBhc3N3b3JkQ2hhbmdlRXJyb3JzKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkTGluay5nZXRQYXNzd29yZENoYW5nZUVycm9ycygpKS50b0JlKHBhc3N3b3JkQ2hhbmdlRXJyb3JzKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
