System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the BulkPasswordChangeResult model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('BulkPasswordChangeResult', function () {
                var bulkPasswordChangeResultData = undefined,
                    BulkPasswordChangeResult = undefined,
                    bulkPasswordChangeResult = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the BulkPasswordChangeResult class and create some data to test with.
                 */
                beforeEach(inject(function (_BulkPasswordChangeResult_, _PasswordLink_) {
                    BulkPasswordChangeResult = _BulkPasswordChangeResult_;
                    bulkPasswordChangeResultData = {
                        identityRequestId: '90',
                        messages: ['workflow message', 'other workflow'],
                        successes: [{
                            linkId: 'link1',
                            link: new _PasswordLink_({
                                id: 'link1',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            }),
                            password: '1234'
                        }, {
                            linkId: 'link3',
                            link: new _PasswordLink_({
                                id: 'link3',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            }),
                            password: 'xyzzy'
                        }],
                        failures: [{
                            linkId: 'link2',
                            link: new _PasswordLink_({
                                id: 'link2',
                                accountId: 'teddy.brosevelt',
                                applicationName: 'brosDB'
                            }),
                            messages: ['failure message'],
                            constraintsViolation: true
                        }],
                        workflowStatus: 'approving',
                        workflowWorkItemId: 'workflow1',
                        workflowWorkItemType: 'Password Change'
                    };
                    bulkPasswordChangeResult = new BulkPasswordChangeResult(bulkPasswordChangeResultData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new BulkPasswordChangeResult(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new BulkPasswordChangeResult('this test seems dumb');
                    }).toThrow();
                    expect(function () {
                        new BulkPasswordChangeResult(function () {
                            return 'why would this happen';
                        });
                    }).toThrow();
                });

                it('returns an identityRequestId read from data', function () {
                    expect(bulkPasswordChangeResult.getIdentityRequestId()).toEqual(bulkPasswordChangeResultData.identityRequestId);
                });

                it('returns messages read from data', function () {
                    expect(bulkPasswordChangeResult.getMessages().join()).toEqual(bulkPasswordChangeResultData.messages.join());
                });

                it('returns a workflowStatus read from data', function () {
                    expect(bulkPasswordChangeResult.getWorkflowStatus()).toEqual(bulkPasswordChangeResultData.workflowStatus);
                });

                it('returns a workflowWorkItemId name read from data', function () {
                    expect(bulkPasswordChangeResult.getWorkflowWorkItemId()).toEqual(bulkPasswordChangeResultData.workflowWorkItemId);
                });

                it('returns a workflowWorkItemType read from data', function () {
                    expect(bulkPasswordChangeResult.getWorkflowWorkItemType()).toEqual(bulkPasswordChangeResultData.workflowWorkItemType);
                });

                it('returns passwordChanges read from data', function () {
                    var i = undefined,
                        passwordChanges = bulkPasswordChangeResult.getPasswordChanges();
                    for (i = 0; i < passwordChanges.length; i++) {
                        expect(passwordChanges[i].getLinkId()).toEqual(bulkPasswordChangeResultData.successes[i].linkId);
                        expect(passwordChanges[i].getPassword()).toEqual(bulkPasswordChangeResultData.successes[i].password);
                    }
                });

                it('returns passwordChangeErrors read from data', function () {
                    var i = undefined,
                        passwordChangeErrors = bulkPasswordChangeResult.getPasswordChangeErrors();
                    for (i = 0; i < passwordChangeErrors.length; i++) {
                        expect(passwordChangeErrors[i].getLinkId()).toEqual(bulkPasswordChangeResultData.failures[i].linkId);
                        expect(passwordChangeErrors[i].getMessages().join()).toEqual(bulkPasswordChangeResultData.failures[i].messages.join());
                        expect(passwordChangeErrors[i].isConstraintsViolation()).toEqual(bulkPasswordChangeResultData.failures[i].constraintsViolation);
                    }
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9CdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksK0JBQTRCO29CQUM1QiwyQkFBd0I7b0JBQ3hCLDJCQUF3Qjs7O2dCQUc1QixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsZ0JBQWdCO29CQUNuRSwyQkFBMkI7b0JBQzNCLCtCQUErQjt3QkFDM0IsbUJBQW1CO3dCQUNuQixVQUFVLENBQUMsb0JBQW9CO3dCQUMvQixXQUFXLENBQUM7NEJBQ1IsUUFBUTs0QkFDUixNQUFNLElBQUksZUFBZTtnQ0FDckIsSUFBSTtnQ0FDSixXQUFXO2dDQUNYLGlCQUFpQjs7NEJBRXJCLFVBQVU7MkJBQ1g7NEJBQ0MsUUFBUTs0QkFDUixNQUFNLElBQUksZUFBZTtnQ0FDckIsSUFBSTtnQ0FDSixXQUFXO2dDQUNYLGlCQUFpQjs7NEJBRXJCLFVBQVU7O3dCQUVkLFVBQVUsQ0FBQzs0QkFDUCxRQUFROzRCQUNSLE1BQU0sSUFBSSxlQUFlO2dDQUNyQixJQUFJO2dDQUNKLFdBQVc7Z0NBQ1gsaUJBQWlCOzs0QkFFckIsVUFBVSxDQUFDOzRCQUNYLHNCQUFzQjs7d0JBRTFCLGdCQUFnQjt3QkFDaEIsb0JBQW9CO3dCQUNwQixzQkFBc0I7O29CQUUxQiwyQkFBMkIsSUFBSSx5QkFBeUI7OztnQkFHNUQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUkseUJBQXlCO3VCQUFVOzs7Z0JBRy9ELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5Qjt1QkFBNEI7b0JBQzdFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLHlCQUF5QixZQUFXOzRCQUFFLE9BQU87O3VCQUFnQzs7O2dCQUd6RyxHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxPQUFPLHlCQUF5Qix3QkFBd0IsUUFBUSw2QkFBNkI7OztnQkFHakcsR0FBRyxtQ0FBbUMsWUFBVztvQkFDN0MsT0FBTyx5QkFBeUIsY0FBYyxRQUFRLFFBQVEsNkJBQTZCLFNBQVM7OztnQkFHeEcsR0FBRywyQ0FBMkMsWUFBVztvQkFDckQsT0FBTyx5QkFBeUIscUJBQXFCLFFBQVEsNkJBQTZCOzs7Z0JBRzlGLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELE9BQU8seUJBQXlCLHlCQUM1QixRQUFRLDZCQUE2Qjs7O2dCQUc3QyxHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxPQUFPLHlCQUF5QiwyQkFDNUIsUUFBUSw2QkFBNkI7OztnQkFHN0MsR0FBRywwQ0FBMEMsWUFBVztvQkFDcEQsSUFBSSxJQUFDO3dCQUNELGtCQUFrQix5QkFBeUI7b0JBQy9DLEtBQUksSUFBSSxHQUFHLElBQUksZ0JBQWdCLFFBQVEsS0FBTTt3QkFDekMsT0FBTyxnQkFBZ0IsR0FBRyxhQUN0QixRQUFRLDZCQUE2QixVQUFVLEdBQUc7d0JBQ3RELE9BQU8sZ0JBQWdCLEdBQUcsZUFDdEIsUUFBUSw2QkFBNkIsVUFBVSxHQUFHOzs7O2dCQUk5RCxHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxJQUFJLElBQUM7d0JBQ0QsdUJBQXVCLHlCQUF5QjtvQkFDcEQsS0FBSSxJQUFJLEdBQUcsSUFBSSxxQkFBcUIsUUFBUSxLQUFNO3dCQUM5QyxPQUFPLHFCQUFxQixHQUFHLGFBQzNCLFFBQVEsNkJBQTZCLFNBQVMsR0FBRzt3QkFDckQsT0FBTyxxQkFBcUIsR0FBRyxjQUFjLFFBQ3pDLFFBQVEsNkJBQTZCLFNBQVMsR0FBRyxTQUFTO3dCQUM5RCxPQUFPLHFCQUFxQixHQUFHLDBCQUMzQixRQUFRLDZCQUE2QixTQUFTLEdBQUc7Ozs7OztHQWM5RCIsImZpbGUiOiJjb21tb24vbW9kZWwvQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0IG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLFxuICAgICAgICBCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQsXG4gICAgICAgIGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdDtcblxuICAgIC8vIFVzZSB0aGUgbW9kZWwgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0IGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0XywgX1Bhc3N3b3JkTGlua18pIHtcbiAgICAgICAgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0ID0gX0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdF87XG4gICAgICAgIGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEgPSB7XG4gICAgICAgICAgICBpZGVudGl0eVJlcXVlc3RJZDogJzkwJyxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ3dvcmtmbG93IG1lc3NhZ2UnLCAnb3RoZXIgd29ya2Zsb3cnXSxcbiAgICAgICAgICAgIHN1Y2Nlc3NlczogW3tcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICdsaW5rMScsXG4gICAgICAgICAgICAgICAgbGluazogbmV3IF9QYXNzd29yZExpbmtfKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsaW5rMScsXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRJZDogJ3RlZGR5LmJyb3NldmVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ2Jyb3NEQidcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJzEyMzQnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnbGluazMnLFxuICAgICAgICAgICAgICAgIGxpbms6IG5ldyBfUGFzc3dvcmRMaW5rXyh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbGluazMnLFxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50SWQ6ICd0ZWRkeS5icm9zZXZlbHQnLFxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdicm9zREInXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICd4eXp6eSdcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZmFpbHVyZXM6IFt7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnbGluazInLFxuICAgICAgICAgICAgICAgIGxpbms6IG5ldyBfUGFzc3dvcmRMaW5rXyh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbGluazInLFxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50SWQ6ICd0ZWRkeS5icm9zZXZlbHQnLFxuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdicm9zREInXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFsnZmFpbHVyZSBtZXNzYWdlJ10sXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IHRydWVcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdhcHByb3ZpbmcnLFxuICAgICAgICAgICAgd29ya2Zsb3dXb3JrSXRlbUlkOiAnd29ya2Zsb3cxJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnUGFzc3dvcmQgQ2hhbmdlJ1xuICAgICAgICB9O1xuICAgICAgICBidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQgPSBuZXcgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IEJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdCgndGhpcyB0ZXN0IHNlZW1zIGR1bWInKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQoZnVuY3Rpb24oKSB7IHJldHVybiAnd2h5IHdvdWxkIHRoaXMgaGFwcGVuJzsgfSk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGlkZW50aXR5UmVxdWVzdElkIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQuZ2V0SWRlbnRpdHlSZXF1ZXN0SWQoKSkudG9FcXVhbChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLmlkZW50aXR5UmVxdWVzdElkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQuZ2V0TWVzc2FnZXMoKS5qb2luKCkpLnRvRXF1YWwoYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0RGF0YS5tZXNzYWdlcy5qb2luKCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSB3b3JrZmxvd1N0YXR1cyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0LmdldFdvcmtmbG93U3RhdHVzKCkpLnRvRXF1YWwoYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0RGF0YS53b3JrZmxvd1N0YXR1cyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHdvcmtmbG93V29ya0l0ZW1JZCBuYW1lIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQuZ2V0V29ya2Zsb3dXb3JrSXRlbUlkKCkpLlxuICAgICAgICAgICAgdG9FcXVhbChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLndvcmtmbG93V29ya0l0ZW1JZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHdvcmtmbG93V29ya0l0ZW1UeXBlIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQuZ2V0V29ya2Zsb3dXb3JrSXRlbVR5cGUoKSkuXG4gICAgICAgICAgICB0b0VxdWFsKGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEud29ya2Zsb3dXb3JrSXRlbVR5cGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgcGFzc3dvcmRDaGFuZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBpLFxuICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VzID0gYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0LmdldFBhc3N3b3JkQ2hhbmdlcygpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwYXNzd29yZENoYW5nZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VzW2ldLmdldExpbmtJZCgpKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEuc3VjY2Vzc2VzW2ldLmxpbmtJZCk7XG4gICAgICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VzW2ldLmdldFBhc3N3b3JkKCkpLlxuICAgICAgICAgICAgICAgIHRvRXF1YWwoYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0RGF0YS5zdWNjZXNzZXNbaV0ucGFzc3dvcmQpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBwYXNzd29yZENoYW5nZUVycm9ycyByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgaSxcbiAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlRXJyb3JzID0gYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0LmdldFBhc3N3b3JkQ2hhbmdlRXJyb3JzKCk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHBhc3N3b3JkQ2hhbmdlRXJyb3JzLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgZXhwZWN0KHBhc3N3b3JkQ2hhbmdlRXJyb3JzW2ldLmdldExpbmtJZCgpKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEuZmFpbHVyZXNbaV0ubGlua0lkKTtcbiAgICAgICAgICAgIGV4cGVjdChwYXNzd29yZENoYW5nZUVycm9yc1tpXS5nZXRNZXNzYWdlcygpLmpvaW4oKSkuXG4gICAgICAgICAgICAgICAgdG9FcXVhbChidWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHREYXRhLmZhaWx1cmVzW2ldLm1lc3NhZ2VzLmpvaW4oKSk7XG4gICAgICAgICAgICBleHBlY3QocGFzc3dvcmRDaGFuZ2VFcnJvcnNbaV0uaXNDb25zdHJhaW50c1Zpb2xhdGlvbigpKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKGJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdERhdGEuZmFpbHVyZXNbaV0uY29uc3RyYWludHNWaW9sYXRpb24pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
