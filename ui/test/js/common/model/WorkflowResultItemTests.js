System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {

    /**
     * Tests for the WorkflowResultItem model object.
     */
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {
            describe('WorkflowResultItem', function () {
                var workflowResultData = undefined,
                    WorkflowResultItem = undefined,
                    workflowResultItem = undefined;

                // Use the model module.
                beforeEach(module(modelModule));

                /**
                 * Setup the WorkflowResultItem class and create some data to test with.
                 */
                beforeEach(inject(function (_WorkflowResultItem_, _PasswordLink_) {
                    WorkflowResultItem = _WorkflowResultItem_;
                    workflowResultData = {
                        identityRequestId: '90',
                        messages: ['message1', 'message2'],
                        workflowStatus: 'approving',
                        workflowWorkItemId: 'workflow1',
                        workflowWorkItemType: 'Password Change'
                    };
                    workflowResultItem = new WorkflowResultItem(workflowResultData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new WorkflowResultItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new WorkflowResultItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new WorkflowResultItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an identityRequestId read from data', function () {
                    expect(workflowResultItem.getIdentityRequestId()).toEqual(workflowResultData.identityRequestId);
                });

                it('returns messages read from data', function () {
                    expect(workflowResultItem.getMessages().join()).toEqual(workflowResultData.messages.join());
                });

                it('returns a workflowStatus read from data', function () {
                    expect(workflowResultItem.getWorkflowStatus()).toEqual(workflowResultData.workflowStatus);
                });

                it('returns a workflowWorkItemId name read from data', function () {
                    expect(workflowResultItem.getWorkflowWorkItemId()).toEqual(workflowResultData.workflowWorkItemId);
                });

                it('returns a workflowWorkItemType read from data', function () {
                    expect(workflowResultItem.getWorkflowWorkItemType()).toEqual(workflowResultData.workflowWorkItemType);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9Xb3JrZmxvd1Jlc3VsdEl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNkJBQTZCLFVBQVUsU0FBUzs7Ozs7SUFLeEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3Qjs7UUFFMUMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsc0JBQXNCLFlBQVc7Z0JBQ3RDLElBQUkscUJBQWtCO29CQUNsQixxQkFBa0I7b0JBQ2xCLHFCQUFrQjs7O2dCQUd0QixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxzQkFBc0IsZ0JBQWdCO29CQUM3RCxxQkFBcUI7b0JBQ3JCLHFCQUFxQjt3QkFDakIsbUJBQW1CO3dCQUNuQixVQUFVLENBQUMsWUFBWTt3QkFDdkIsZ0JBQWdCO3dCQUNoQixvQkFBb0I7d0JBQ3BCLHNCQUFzQjs7b0JBRTFCLHFCQUFxQixJQUFJLG1CQUFtQjs7O2dCQUdoRCxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxtQkFBbUI7dUJBQVU7OztnQkFHekQsR0FBRyxpRUFBaUUsWUFBVztvQkFDM0UsT0FBTyxZQUFXO3dCQUFFLElBQUksbUJBQW1CO3VCQUFjO29CQUN6RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxtQkFBbUIsWUFBVzs0QkFBRSxPQUFPOzt1QkFBb0I7OztnQkFHdkYsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsT0FBTyxtQkFBbUIsd0JBQXdCLFFBQVEsbUJBQW1COzs7Z0JBR2pGLEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sbUJBQW1CLGNBQWMsUUFBUSxRQUFRLG1CQUFtQixTQUFTOzs7Z0JBR3hGLEdBQUcsMkNBQTJDLFlBQVc7b0JBQ3JELE9BQU8sbUJBQW1CLHFCQUFxQixRQUFRLG1CQUFtQjs7O2dCQUc5RSxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxPQUFPLG1CQUFtQix5QkFBeUIsUUFBUSxtQkFBbUI7OztnQkFHbEYsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsT0FBTyxtQkFBbUIsMkJBQzFCLFFBQVEsbUJBQW1COzs7OztHQW1CaEMiLCJmaWxlIjoiY29tbW9uL21vZGVsL1dvcmtmbG93UmVzdWx0SXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kZWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGVsL01vZGVsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFdvcmtmbG93UmVzdWx0SXRlbSBtb2RlbCBvYmplY3QuXG4gKi9cbmRlc2NyaWJlKCdXb3JrZmxvd1Jlc3VsdEl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgd29ya2Zsb3dSZXN1bHREYXRhLFxuICAgICAgICBXb3JrZmxvd1Jlc3VsdEl0ZW0sXG4gICAgICAgIHdvcmtmbG93UmVzdWx0SXRlbTtcblxuICAgIC8vIFVzZSB0aGUgbW9kZWwgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgV29ya2Zsb3dSZXN1bHRJdGVtIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfV29ya2Zsb3dSZXN1bHRJdGVtXywgX1Bhc3N3b3JkTGlua18pIHtcbiAgICAgICAgV29ya2Zsb3dSZXN1bHRJdGVtID0gX1dvcmtmbG93UmVzdWx0SXRlbV87XG4gICAgICAgIHdvcmtmbG93UmVzdWx0RGF0YSA9IHtcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdElkOiAnOTAnLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFsnbWVzc2FnZTEnLCAnbWVzc2FnZTInXSxcbiAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnYXBwcm92aW5nJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJ3dvcmtmbG93MScsXG4gICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ1Bhc3N3b3JkIENoYW5nZSdcbiAgICAgICAgfTtcbiAgICAgICAgd29ya2Zsb3dSZXN1bHRJdGVtID0gbmV3IFdvcmtmbG93UmVzdWx0SXRlbSh3b3JrZmxvd1Jlc3VsdERhdGEpO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZXF1aXJlcyBub24tbnVsbCBkYXRhIGluIHRoZSBjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFdvcmtmbG93UmVzdWx0SXRlbSgnaGkgbW9tJyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgV29ya2Zsb3dSZXN1bHRJdGVtKGZ1bmN0aW9uKCkgeyByZXR1cm4gJ3doYXQgdGhhPyc7IH0pOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBpZGVudGl0eVJlcXVlc3RJZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya2Zsb3dSZXN1bHRJdGVtLmdldElkZW50aXR5UmVxdWVzdElkKCkpLnRvRXF1YWwod29ya2Zsb3dSZXN1bHREYXRhLmlkZW50aXR5UmVxdWVzdElkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrZmxvd1Jlc3VsdEl0ZW0uZ2V0TWVzc2FnZXMoKS5qb2luKCkpLnRvRXF1YWwod29ya2Zsb3dSZXN1bHREYXRhLm1lc3NhZ2VzLmpvaW4oKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHdvcmtmbG93U3RhdHVzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdCh3b3JrZmxvd1Jlc3VsdEl0ZW0uZ2V0V29ya2Zsb3dTdGF0dXMoKSkudG9FcXVhbCh3b3JrZmxvd1Jlc3VsdERhdGEud29ya2Zsb3dTdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSB3b3JrZmxvd1dvcmtJdGVtSWQgbmFtZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya2Zsb3dSZXN1bHRJdGVtLmdldFdvcmtmbG93V29ya0l0ZW1JZCgpKS50b0VxdWFsKHdvcmtmbG93UmVzdWx0RGF0YS53b3JrZmxvd1dvcmtJdGVtSWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSB3b3JrZmxvd1dvcmtJdGVtVHlwZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya2Zsb3dSZXN1bHRJdGVtLmdldFdvcmtmbG93V29ya0l0ZW1UeXBlKCkpLlxuICAgICAgICB0b0VxdWFsKHdvcmtmbG93UmVzdWx0RGF0YS53b3JrZmxvd1dvcmtJdGVtVHlwZSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
