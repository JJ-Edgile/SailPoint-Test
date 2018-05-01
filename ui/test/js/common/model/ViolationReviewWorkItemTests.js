System.register(['test/js/TestInitializer', 'common/model/ModelModule'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }],
        execute: function () {

            describe('ViolationReviewWorkItems', function () {
                var ViolationReviewWorkItem, policyViolationSpy, violationReviewRequestedItemSpy;

                // Use the access request module.
                beforeEach(module(modelModule));

                // Return spies rather than the real constructors so we can make sure they were called with the correct value
                beforeEach(module(function ($provide) {
                    violationReviewRequestedItemSpy = jasmine.createSpy();
                    policyViolationSpy = jasmine.createSpy();
                    $provide.value('RequestPolicyViolation', policyViolationSpy);
                    $provide.value('ViolationReviewRequestedItem', violationReviewRequestedItemSpy);
                }));

                beforeEach(inject(function (_ViolationReviewWorkItem_) {
                    ViolationReviewWorkItem = _ViolationReviewWorkItem_;
                }));

                it('should throw if constructed without data', function () {
                    expect(function () {
                        new ViolationReviewWorkItem();
                    }).toThrow();
                });

                it('should populate values correctly', function () {
                    var data = {
                        id: 'id',
                        target: {
                            id: 'targetId',
                            name: 'name',
                            displayName: 'displayName',
                            workgroup: false
                        },
                        requester: {
                            id: 'requesterId',
                            name: 'targetName',
                            displayName: 'targetDisplayName',
                            workgroup: false
                        },
                        created: 1423077394799,
                        violations: [{ violation: 'details' }],
                        requestedItems: [{ entitlementValue: 'value' }],
                        allowRequestsWithViolations: true,
                        requireViolationComment: true
                    },
                        workItem = new ViolationReviewWorkItem(data);

                    expect(workItem.getId()).toEqual(data.id);
                    expect(workItem.getTarget().name).toEqual(data.target.name);
                    expect(workItem.getRequester().name).toEqual(data.requester.name);
                    expect(workItem.getCreated()).toEqual(new Date(data.created));

                    expect(policyViolationSpy).toHaveBeenCalledWith(data.violations[0]);
                    expect(workItem.getViolations().length).toBe(1);
                    expect(violationReviewRequestedItemSpy).toHaveBeenCalledWith(data.requestedItems[0]);
                    expect(workItem.getRequestedItems().length).toBe(1);
                    expect(workItem.hasViolations()).toBeTruthy();
                    expect(workItem.getViolationCount()).toBe(1);
                    expect(workItem.isAllowRequestsWithViolations()).toBeTruthy();
                    expect(workItem.isRequireViolationComment()).toBeTruthy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQTVGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw0QkFBNEIsWUFBVztnQkFDNUMsSUFBSSx5QkFDQSxvQkFDQTs7O2dCQUdKLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxrQ0FBa0MsUUFBUTtvQkFDMUMscUJBQXFCLFFBQVE7b0JBQzdCLFNBQVMsTUFBTSwwQkFBMEI7b0JBQ3pDLFNBQVMsTUFBTSxnQ0FBZ0M7OztnQkFHbkQsV0FBVyxPQUFPLFVBQVMsMkJBQTJCO29CQUNsRCwwQkFBMEI7OztnQkFHOUIsR0FBRyw0Q0FBNEMsWUFBVztvQkFDdEQsT0FBTyxZQUFXO3dCQUNkLElBQUk7dUJBQ0w7OztnQkFHUCxHQUFHLG9DQUFvQyxZQUFXO29CQUM5QyxJQUFJLE9BQU87d0JBQ0gsSUFBSTt3QkFDSixRQUFROzRCQUNKLElBQUk7NEJBQ0osTUFBTTs0QkFDTixhQUFhOzRCQUNiLFdBQVc7O3dCQUVmLFdBQVc7NEJBQ1AsSUFBSTs0QkFDSixNQUFNOzRCQUNOLGFBQWE7NEJBQ2IsV0FBVzs7d0JBRWYsU0FBUzt3QkFDVCxZQUFZLENBQUMsRUFBQyxXQUFXO3dCQUN6QixnQkFBZ0IsQ0FBQyxFQUFDLGtCQUFrQjt3QkFDcEMsNkJBQTZCO3dCQUM3Qix5QkFBeUI7O3dCQUU3QixXQUFXLElBQUksd0JBQXdCOztvQkFFM0MsT0FBTyxTQUFTLFNBQVMsUUFBUSxLQUFLO29CQUN0QyxPQUFPLFNBQVMsWUFBWSxNQUFNLFFBQVEsS0FBSyxPQUFPO29CQUN0RCxPQUFPLFNBQVMsZUFBZSxNQUFNLFFBQVEsS0FBSyxVQUFVO29CQUM1RCxPQUFPLFNBQVMsY0FBYyxRQUFRLElBQUksS0FBSyxLQUFLOztvQkFFcEQsT0FBTyxvQkFBb0IscUJBQXFCLEtBQUssV0FBVztvQkFDaEUsT0FBTyxTQUFTLGdCQUFnQixRQUFRLEtBQUs7b0JBQzdDLE9BQU8saUNBQWlDLHFCQUFxQixLQUFLLGVBQWU7b0JBQ2pGLE9BQU8sU0FBUyxvQkFBb0IsUUFBUSxLQUFLO29CQUNqRCxPQUFPLFNBQVMsaUJBQWlCO29CQUNqQyxPQUFPLFNBQVMscUJBQXFCLEtBQUs7b0JBQzFDLE9BQU8sU0FBUyxpQ0FBaUM7b0JBQ2pELE9BQU8sU0FBUyw2QkFBNkI7Ozs7O0dBUWxEIiwiZmlsZSI6ImNvbW1vbi9tb2RlbC9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnVmlvbGF0aW9uUmV2aWV3V29ya0l0ZW1zJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIFZpb2xhdGlvblJldmlld1dvcmtJdGVtLFxuICAgICAgICBwb2xpY3lWaW9sYXRpb25TcHksXG4gICAgICAgIHZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW1TcHk7XG5cbiAgICAvLyBVc2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RlbE1vZHVsZSkpO1xuXG4gICAgLy8gUmV0dXJuIHNwaWVzIHJhdGhlciB0aGFuIHRoZSByZWFsIGNvbnN0cnVjdG9ycyBzbyB3ZSBjYW4gbWFrZSBzdXJlIHRoZXkgd2VyZSBjYWxsZWQgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZVxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgIHZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW1TcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICBwb2xpY3lWaW9sYXRpb25TcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICAkcHJvdmlkZS52YWx1ZSgnUmVxdWVzdFBvbGljeVZpb2xhdGlvbicsIHBvbGljeVZpb2xhdGlvblNweSk7XG4gICAgICAgICRwcm92aWRlLnZhbHVlKCdWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtJywgdmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbVNweSk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1Zpb2xhdGlvblJldmlld1dvcmtJdGVtXykge1xuICAgICAgICBWaW9sYXRpb25SZXZpZXdXb3JrSXRlbSA9IF9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBjb25zdHJ1Y3RlZCB3aXRob3V0IGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV3IFZpb2xhdGlvblJldmlld1dvcmtJdGVtKCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcG9wdWxhdGUgdmFsdWVzIGNvcnJlY3RseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd0YXJnZXRJZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdkaXNwbGF5TmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHdvcmtncm91cDogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlcXVlc3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3JlcXVlc3RlcklkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3RhcmdldE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3RhcmdldERpc3BsYXlOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgd29ya2dyb3VwOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogMTQyMzA3NzM5NDc5OSxcbiAgICAgICAgICAgICAgICB2aW9sYXRpb25zOiBbe3Zpb2xhdGlvbjogJ2RldGFpbHMnfV0sXG4gICAgICAgICAgICAgICAgcmVxdWVzdGVkSXRlbXM6IFt7ZW50aXRsZW1lbnRWYWx1ZTogJ3ZhbHVlJ31dLFxuICAgICAgICAgICAgICAgIGFsbG93UmVxdWVzdHNXaXRoVmlvbGF0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXF1aXJlVmlvbGF0aW9uQ29tbWVudDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdvcmtJdGVtID0gbmV3IFZpb2xhdGlvblJldmlld1dvcmtJdGVtKGRhdGEpO1xuXG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRJZCgpKS50b0VxdWFsKGRhdGEuaWQpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uZ2V0VGFyZ2V0KCkubmFtZSkudG9FcXVhbChkYXRhLnRhcmdldC5uYW1lKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldFJlcXVlc3RlcigpLm5hbWUpLnRvRXF1YWwoZGF0YS5yZXF1ZXN0ZXIubmFtZSk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRDcmVhdGVkKCkpLnRvRXF1YWwobmV3IERhdGUoZGF0YS5jcmVhdGVkKSk7XG5cbiAgICAgICAgZXhwZWN0KHBvbGljeVZpb2xhdGlvblNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZGF0YS52aW9sYXRpb25zWzBdKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldFZpb2xhdGlvbnMoKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdCh2aW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChkYXRhLnJlcXVlc3RlZEl0ZW1zWzBdKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtLmdldFJlcXVlc3RlZEl0ZW1zKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaGFzVmlvbGF0aW9ucygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdCh3b3JrSXRlbS5nZXRWaW9sYXRpb25Db3VudCgpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNBbGxvd1JlcXVlc3RzV2l0aFZpb2xhdGlvbnMoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3Qod29ya0l0ZW0uaXNSZXF1aXJlVmlvbGF0aW9uQ29tbWVudCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
