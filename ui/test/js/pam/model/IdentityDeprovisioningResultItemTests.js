System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {

    /**
     * Tests for the IdentityDeprovisioningResultItem model object.
     */
    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {
            describe('IdentityDeprovisioningResultItem', function () {
                var resultItemData = undefined,
                    IdentityDeprovisioningResultItem = undefined,
                    resultItem = undefined;

                // Use the model module.
                beforeEach(module(pamModule));

                /**
                 * Setup the IdentityDeprovisioningResultItem class and create some data to test with.
                 */
                beforeEach(inject(function (_IdentityDeprovisioningResultItem_) {
                    IdentityDeprovisioningResultItem = _IdentityDeprovisioningResultItem_;
                    resultItemData = {
                        identityId: '1',
                        identityDisplayName: 'jeff',
                        identityRequestId: '1',
                        messages: [],
                        workflowStatus: 'completed',
                        workflowWorkItemId: '',
                        workflowWorkItemType: '',
                        groups: [],
                        hasEffectiveAccess: false
                    };
                    resultItem = new IdentityDeprovisioningResultItem(resultItemData);
                }));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new IdentityDeprovisioningResultItem(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new IdentityDeprovisioningResultItem('hi mom');
                    }).toThrow();
                    expect(function () {
                        new IdentityDeprovisioningResultItem(function () {
                            return 'what tha?';
                        });
                    }).toThrow();
                });

                it('returns an Identity ID read from data', function () {
                    expect(resultItem.getIdentityId()).toEqual(resultItemData.identityId);
                });

                it('returns an identityDisplayName read from data', function () {
                    expect(resultItem.getIdentityDisplayName()).toEqual(resultItemData.identityDisplayName);
                });

                it('returns an identityRequestId read from data', function () {
                    expect(resultItem.getIdentityRequestId()).toEqual(resultItemData.identityRequestId);
                });

                it('returns messages read from data', function () {
                    expect(resultItem.getMessages()).toEqual(resultItemData.messages);
                });

                it('returns workflowStatus read from data', function () {
                    expect(resultItem.getWorkflowStatus()).toEqual(resultItemData.workflowStatus);
                });

                it('returns workflowWorkItemId read from data', function () {
                    expect(resultItem.getWorkflowWorkItemId()).toEqual(resultItemData.workflowWorkItemId);
                });

                it('returns workflowWorkItemType read from data', function () {
                    expect(resultItem.getWorkflowWorkItemType()).toEqual(resultItemData.workflowWorkItemType);
                });

                it('returns groups read from data', function () {
                    expect(resultItem.getGroups()).toEqual(resultItemData.groups);
                });

                it('returns hasEffectiveAccess read from data', function () {
                    expect(resultItem.isHasEffectiveAccess()).toEqual(resultItemData.hasEffectiveAccess);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9tb2RlbC9JZGVudGl0eURlcHJvdmlzaW9uaW5nUmVzdWx0SXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7OztJQUs3RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7O1FBRTlCLFNBQVMsWUFBWTtZQU43QixTQUFTLG9DQUFvQyxZQUFXO2dCQUNwRCxJQUFJLGlCQUFjO29CQUFFLG1DQUFnQztvQkFBRSxhQUFVOzs7Z0JBR2hFLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLG9DQUFvQztvQkFDM0QsbUNBQW1DO29CQUNuQyxpQkFBaUI7d0JBQ2IsWUFBYTt3QkFDYixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixRQUFRO3dCQUNSLG9CQUFvQjs7b0JBRXhCLGFBQWEsSUFBSSxpQ0FBaUM7OztnQkFHdEQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxZQUFXO3dCQUFFLElBQUksaUNBQWlDO3VCQUFVOzs7Z0JBR3ZFLEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLGlDQUFpQzt1QkFBYztvQkFDdkUsT0FBTyxZQUFXO3dCQUFFLElBQUksaUNBQWlDLFlBQVc7NEJBQUUsT0FBTzs7dUJBQW9COzs7Z0JBR3JHLEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sV0FBVyxpQkFBaUIsUUFBUSxlQUFlOzs7Z0JBRzlELEdBQUcsaURBQWlELFlBQVc7b0JBQzNELE9BQU8sV0FBVywwQkFBMEIsUUFBUSxlQUFlOzs7Z0JBR3ZFLEdBQUcsK0NBQStDLFlBQVc7b0JBQ3pELE9BQU8sV0FBVyx3QkFBd0IsUUFBUSxlQUFlOzs7Z0JBR3JFLEdBQUcsbUNBQW1DLFlBQVc7b0JBQzdDLE9BQU8sV0FBVyxlQUFlLFFBQVEsZUFBZTs7O2dCQUc1RCxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxPQUFPLFdBQVcscUJBQXFCLFFBQVEsZUFBZTs7O2dCQUdsRSxHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFdBQVcseUJBQXlCLFFBQVEsZUFBZTs7O2dCQUd0RSxHQUFHLCtDQUErQyxZQUFXO29CQUN6RCxPQUFPLFdBQVcsMkJBQTJCLFFBQVEsZUFBZTs7O2dCQUd4RSxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxPQUFPLFdBQVcsYUFBYSxRQUFRLGVBQWU7OztnQkFHMUQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsT0FBTyxXQUFXLHdCQUF3QixRQUFRLGVBQWU7Ozs7O0dBc0J0RSIsImZpbGUiOiJwYW0vbW9kZWwvSWRlbnRpdHlEZXByb3Zpc2lvbmluZ1Jlc3VsdEl0ZW1UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtIG1vZGVsIG9iamVjdC5cbiAqL1xuZGVzY3JpYmUoJ0lkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHJlc3VsdEl0ZW1EYXRhLCBJZGVudGl0eURlcHJvdmlzaW9uaW5nUmVzdWx0SXRlbSwgcmVzdWx0SXRlbTtcblxuICAgIC8vIFVzZSB0aGUgbW9kZWwgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtIGNsYXNzIGFuZCBjcmVhdGUgc29tZSBkYXRhIHRvIHRlc3Qgd2l0aC5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfSWRlbnRpdHlEZXByb3Zpc2lvbmluZ1Jlc3VsdEl0ZW1fKSB7XG4gICAgICAgIElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtID0gX0lkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtXztcbiAgICAgICAgcmVzdWx0SXRlbURhdGEgPSB7XG4gICAgICAgICAgICBpZGVudGl0eUlkIDogJzEnLFxuICAgICAgICAgICAgaWRlbnRpdHlEaXNwbGF5TmFtZTogJ2plZmYnLFxuICAgICAgICAgICAgaWRlbnRpdHlSZXF1ZXN0SWQ6ICcxJyxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgIHdvcmtmbG93U3RhdHVzOiAnY29tcGxldGVkJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJycsXG4gICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJycsXG4gICAgICAgICAgICBncm91cHM6IFtdLFxuICAgICAgICAgICAgaGFzRWZmZWN0aXZlQWNjZXNzOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRJdGVtID0gbmV3IElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtKHJlc3VsdEl0ZW1EYXRhKTtcbiAgICB9KSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgSWRlbnRpdHlEZXByb3Zpc2lvbmluZ1Jlc3VsdEl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IElkZW50aXR5RGVwcm92aXNpb25pbmdSZXN1bHRJdGVtKCdoaSBtb20nKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBJZGVudGl0eURlcHJvdmlzaW9uaW5nUmVzdWx0SXRlbShmdW5jdGlvbigpIHsgcmV0dXJuICd3aGF0IHRoYT8nOyB9KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gSWRlbnRpdHkgSUQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdEl0ZW0uZ2V0SWRlbnRpdHlJZCgpKS50b0VxdWFsKHJlc3VsdEl0ZW1EYXRhLmlkZW50aXR5SWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYW4gaWRlbnRpdHlEaXNwbGF5TmFtZSByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocmVzdWx0SXRlbS5nZXRJZGVudGl0eURpc3BsYXlOYW1lKCkpLnRvRXF1YWwocmVzdWx0SXRlbURhdGEuaWRlbnRpdHlEaXNwbGF5TmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBpZGVudGl0eVJlcXVlc3RJZCByZWFkIGZyb20gZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QocmVzdWx0SXRlbS5nZXRJZGVudGl0eVJlcXVlc3RJZCgpKS50b0VxdWFsKHJlc3VsdEl0ZW1EYXRhLmlkZW50aXR5UmVxdWVzdElkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHRJdGVtLmdldE1lc3NhZ2VzKCkpLnRvRXF1YWwocmVzdWx0SXRlbURhdGEubWVzc2FnZXMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgd29ya2Zsb3dTdGF0dXMgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdEl0ZW0uZ2V0V29ya2Zsb3dTdGF0dXMoKSkudG9FcXVhbChyZXN1bHRJdGVtRGF0YS53b3JrZmxvd1N0YXR1cyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB3b3JrZmxvd1dvcmtJdGVtSWQgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdEl0ZW0uZ2V0V29ya2Zsb3dXb3JrSXRlbUlkKCkpLnRvRXF1YWwocmVzdWx0SXRlbURhdGEud29ya2Zsb3dXb3JrSXRlbUlkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHdvcmtmbG93V29ya0l0ZW1UeXBlIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHRJdGVtLmdldFdvcmtmbG93V29ya0l0ZW1UeXBlKCkpLnRvRXF1YWwocmVzdWx0SXRlbURhdGEud29ya2Zsb3dXb3JrSXRlbVR5cGUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZ3JvdXBzIHJlYWQgZnJvbSBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHRJdGVtLmdldEdyb3VwcygpKS50b0VxdWFsKHJlc3VsdEl0ZW1EYXRhLmdyb3Vwcyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBoYXNFZmZlY3RpdmVBY2Nlc3MgcmVhZCBmcm9tIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJlc3VsdEl0ZW0uaXNIYXNFZmZlY3RpdmVBY2Nlc3MoKSkudG9FcXVhbChyZXN1bHRJdGVtRGF0YS5oYXNFZmZlY3RpdmVBY2Nlc3MpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
