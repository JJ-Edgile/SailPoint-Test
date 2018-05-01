System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the PasswordChangeResultItem model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('PasswordChangeResultItem', function () {
                var passwordChangeResultData = undefined,
                    PasswordChangeResultItem = undefined,
                    passwordChangeResultItem = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the PasswordChangeResultItem class and create some data to test with.
                 */
                beforeEach(inject(function (_PasswordChangeResultItem_, _PasswordLink_) {
                    PasswordChangeResultItem = _PasswordChangeResultItem_;
                    passwordChangeResultData = {
                        identityRequestId: '90',
                        messages: ['message1', 'message2'],
                        passwordChanges: [{
                            linkId: 'link1',
                            password: '1234',
                            link: new _PasswordLink_({
                                id: 'link1',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            })

                        }],
                        workflowStatus: 'approving',
                        workflowWorkItemId: 'workflow1',
                        workflowWorkItemType: 'Password Change'
                    };
                    passwordChangeResultItem = new PasswordChangeResultItem(passwordChangeResultData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new PasswordChangeResultItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new PasswordChangeResultItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new PasswordChangeResultItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an identityRequestId read from data', function () {
                    expect(passwordChangeResultItem.getIdentityRequestId()).toEqual(passwordChangeResultData.identityRequestId);
                });

                it('returns messages read from data', function () {
                    expect(passwordChangeResultItem.getMessages().join()).toEqual(passwordChangeResultData.messages.join());
                });

                it('returns a workflowStatus read from data', function () {
                    expect(passwordChangeResultItem.getWorkflowStatus()).toEqual(passwordChangeResultData.workflowStatus);
                });

                it('returns a workflowWorkItemId name read from data', function () {
                    expect(passwordChangeResultItem.getWorkflowWorkItemId()).toEqual(passwordChangeResultData.workflowWorkItemId);
                });

                it('returns a workflowWorkItemType read from data', function () {
                    expect(passwordChangeResultItem.getWorkflowWorkItemType()).toEqual(passwordChangeResultData.workflowWorkItemType);
                });

                it('returns passwordChanges read from data', function () {
                    var passwordChanges = passwordChangeResultItem.getPasswordChanges();
                    expect(passwordChanges[0].getLinkId()).toEqual(passwordChangeResultData.passwordChanges[0].link.id);
                    expect(passwordChanges[0].getPassword()).toEqual(passwordChangeResultData.passwordChanges[0].password);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9QYXNzd29yZENoYW5nZVJlc3VsdEl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksMkJBQXdCO29CQUN4QiwyQkFBd0I7b0JBQ3hCLDJCQUF3Qjs7O2dCQUc1QixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsZ0JBQWdCO29CQUNuRSwyQkFBMkI7b0JBQzNCLDJCQUEyQjt3QkFDdkIsbUJBQW1CO3dCQUNuQixVQUFVLENBQUMsWUFBWTt3QkFDdkIsaUJBQWlCLENBQUU7NEJBQ2YsUUFBUTs0QkFDUixVQUFVOzRCQUNWLE1BQU0sSUFBSSxlQUFlO2dDQUNyQixJQUFJO2dDQUNKLFdBQVc7Z0NBQ1gsaUJBQWlCOzs7O3dCQUl6QixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsc0JBQXNCOztvQkFFMUIsMkJBQTJCLElBQUkseUJBQXlCOzs7Z0JBRzVELEdBQUcsNkNBQTZDLFlBQVc7b0JBQ3ZELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5Qjt1QkFBVTs7O2dCQUcvRCxHQUFHLGlFQUFpRSxZQUFXO29CQUMzRSxPQUFPLFlBQVc7d0JBQUUsSUFBSSx5QkFBeUI7dUJBQWM7b0JBQy9ELE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5QixZQUFXOzRCQUFFLE9BQU87O3VCQUFvQjs7O2dCQUc3RixHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxPQUFPLHlCQUF5Qix3QkFBd0IsUUFBUSx5QkFBeUI7OztnQkFHN0YsR0FBRyxtQ0FBbUMsWUFBVztvQkFDN0MsT0FBTyx5QkFBeUIsY0FBYyxRQUFRLFFBQVEseUJBQXlCLFNBQVM7OztnQkFHcEcsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsT0FBTyx5QkFBeUIscUJBQXFCLFFBQVEseUJBQXlCOzs7Z0JBRzFGLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELE9BQU8seUJBQXlCLHlCQUF5QixRQUFRLHlCQUF5Qjs7O2dCQUc5RixHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxPQUFPLHlCQUF5QiwyQkFDaEMsUUFBUSx5QkFBeUI7OztnQkFHckMsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsSUFBSSxrQkFBa0IseUJBQXlCO29CQUMvQyxPQUFPLGdCQUFnQixHQUFHLGFBQzFCLFFBQVEseUJBQXlCLGdCQUFnQixHQUFHLEtBQUs7b0JBQ3pELE9BQU8sZ0JBQWdCLEdBQUcsZUFDMUIsUUFBUSx5QkFBeUIsZ0JBQWdCLEdBQUc7Ozs7O0dBaUJ6RCIsImZpbGUiOiJjb21tb24vbW9kZWwvUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ1Bhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBwYXNzd29yZENoYW5nZVJlc3VsdERhdGEsXG4gICAgICAgIFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSxcbiAgICAgICAgcGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtO1xuXG4gICAgLy8gVXNlIHRoZSBtb2RlbCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBQYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0gY2xhc3MgYW5kIGNyZWF0ZSBzb21lIGRhdGEgdG8gdGVzdCB3aXRoLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9QYXNzd29yZENoYW5nZVJlc3VsdEl0ZW1fLCBfUGFzc3dvcmRMaW5rXykge1xuICAgICAgICBQYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0gPSBfUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtXztcbiAgICAgICAgcGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhID0ge1xuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICc5MCcsXG4gICAgICAgICAgICBtZXNzYWdlczogWydtZXNzYWdlMScsICdtZXNzYWdlMiddLFxuICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VzOiBbIHtcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICdsaW5rMScsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBsaW5rOiBuZXcgX1Bhc3N3b3JkTGlua18oe1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2xpbmsxJyxcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudElkOiAndGVkZHkuYnJvc2V2ZWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJ1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0gXSxcbiAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnYXBwcm92aW5nJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJ3dvcmtmbG93MScsXG4gICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ1Bhc3N3b3JkIENoYW5nZSdcbiAgICAgICAgfTtcbiAgICAgICAgcGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtID0gbmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbShwYXNzd29yZENoYW5nZVJlc3VsdERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBQYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbSgnaGkgbW9tJyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgUGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBpZGVudGl0eVJlcXVlc3RJZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtLmdldElkZW50aXR5UmVxdWVzdElkKCkpLnRvRXF1YWwocGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLmlkZW50aXR5UmVxdWVzdElkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0uZ2V0TWVzc2FnZXMoKS5qb2luKCkpLnRvRXF1YWwocGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLm1lc3NhZ2VzLmpvaW4oKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHdvcmtmbG93U3RhdHVzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZVJlc3VsdEl0ZW0uZ2V0V29ya2Zsb3dTdGF0dXMoKSkudG9FcXVhbChwYXNzd29yZENoYW5nZVJlc3VsdERhdGEud29ya2Zsb3dTdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSB3b3JrZmxvd1dvcmtJdGVtSWQgbmFtZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtLmdldFdvcmtmbG93V29ya0l0ZW1JZCgpKS50b0VxdWFsKHBhc3N3b3JkQ2hhbmdlUmVzdWx0RGF0YS53b3JrZmxvd1dvcmtJdGVtSWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSB3b3JrZmxvd1dvcmtJdGVtVHlwZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VSZXN1bHRJdGVtLmdldFdvcmtmbG93V29ya0l0ZW1UeXBlKCkpLlxuICAgICAgICB0b0VxdWFsKHBhc3N3b3JkQ2hhbmdlUmVzdWx0RGF0YS53b3JrZmxvd1dvcmtJdGVtVHlwZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBwYXNzd29yZENoYW5nZXMgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHBhc3N3b3JkQ2hhbmdlcyA9IHBhc3N3b3JkQ2hhbmdlUmVzdWx0SXRlbS5nZXRQYXNzd29yZENoYW5nZXMoKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlc1swXS5nZXRMaW5rSWQoKSkuXG4gICAgICAgIHRvRXF1YWwocGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLnBhc3N3b3JkQ2hhbmdlc1swXS5saW5rLmlkKTtcbiAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlc1swXS5nZXRQYXNzd29yZCgpKS5cbiAgICAgICAgdG9FcXVhbChwYXNzd29yZENoYW5nZVJlc3VsdERhdGEucGFzc3dvcmRDaGFuZ2VzWzBdLnBhc3N3b3JkKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
