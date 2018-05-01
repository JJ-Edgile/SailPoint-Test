System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', '../PolicyTestData'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_PolicyTestData) {}],
        execute: function () {

            describe('PolicyViolation', function () {
                var PolicyViolation = undefined,
                    policyTestData = undefined,
                    Policy = undefined,
                    testData = undefined,
                    testViolation = undefined,
                    IdentitySummary = undefined,
                    PolicyViolationAction = undefined,
                    testActivityViolation = undefined,
                    testActivityData = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolation_, _policyTestData_, _Policy_, _IdentitySummary_, _PolicyViolationAction_) {
                    PolicyViolation = _PolicyViolation_;
                    PolicyViolationAction = _PolicyViolationAction_;
                    IdentitySummary = _IdentitySummary_;
                    policyTestData = _policyTestData_;
                    Policy = _Policy_;
                    testData = policyTestData.POLICY_VIOLATION_DATA_1;
                    testViolation = new PolicyViolation(testData);
                    testActivityData = policyTestData.POLICY_VIOLATION_DATA_3;
                    testActivityViolation = new PolicyViolation(testActivityData);
                }));

                describe('init', function () {
                    it('should initialize with provided data', function () {
                        expect(testViolation.id).toEqual(testData.id);
                        expect(testViolation.name).toEqual(testData.name);
                        expect(testViolation.owner).toEqual(IdentitySummary.create(testData.owner));
                        expect(testViolation.policy).toEqual(new Policy(testData.policy));
                        expect(testViolation.ruleDescription).toEqual(testData.ruleDescription);
                        expect(testViolation.compensatingControl).toEqual(testData.compensatingControl);
                        expect(testViolation.remediationAdvice).toEqual(testData.remediationAdvice);
                        expect(testViolation.applicationName).toEqual(testData.applicationName);
                        expect(testViolation.accountName).toEqual(testData.accountName);
                        expect(testViolation.scoreWeight).toEqual(testData.scoreWeight);

                        expect(testViolation.allowedActions).toBeDefined();
                        expect(testViolation.allowedActions.length).toEqual(testData.allowedActions.length);
                        testViolation.allowedActions.forEach(function (allowedAction, idx) {
                            expect(allowedAction).toEqual(new PolicyViolationAction(testData.allowedActions[idx]));
                        });
                        expect(testViolation.activity).not.toBeDefined();

                        expect(testViolation.displayName).toEqual(testData.displayName);
                    });

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new PolicyViolation();
                        }).toThrow();
                    });

                    it('should initialize with activity data for policy of Activity type', function () {
                        expect(testActivityViolation.activity).toBeDefined();
                        expect(testActivityViolation.activity.user).toEqual(testActivityData.activity.user);
                        expect(testActivityViolation.activity.action).toEqual(testActivityData.activity.action);
                        expect(testActivityViolation.activity.target).toEqual(testActivityData.activity.target);
                        expect(testActivityViolation.activity.timeStamp).toEqual(testActivityData.activity.timeStamp);
                        expect(testActivityViolation.activity.sourceApplication).toEqual(testActivityData.activity.sourceApplication);
                    });
                });

                it('getIdentityFirstName should return target identity first name', function () {
                    expect(testViolation.getIdentityFirstName()).toEqual(testData.identity.firstName);
                });

                it('getIdentityLastName should return target identity last name', function () {
                    expect(testViolation.getIdentityLastName()).toEqual(testData.identity.lastName);
                });

                it('getPolicyName should return policy name', function () {
                    expect(testViolation.getPolicyName()).toEqual(testData.policy.name);
                });

                it('getOwnerDisplayName should return owner identity displayName', function () {
                    expect(testViolation.getOwnerDisplayName()).toEqual(testData.owner.displayName);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUNBQXlDLHNCQUFzQixVQUFVLFNBQVM7Ozs7O0lBSzFIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLGlCQUFpQjtRQUM5QixTQUFTLFlBQVk7O1lBSjdCLFNBQVMsbUJBQW1CLFlBQVc7Z0JBQ25DLElBQUksa0JBQWU7b0JBQUUsaUJBQWM7b0JBQUUsU0FBTTtvQkFBRSxXQUFRO29CQUFFLGdCQUFhO29CQUFFLGtCQUFlO29CQUFFLHdCQUFxQjtvQkFDeEcsd0JBQXFCO29CQUFFLG1CQUFnQjs7Z0JBRTNDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLG1CQUFtQixrQkFBa0IsVUFBVSxtQkFDL0MseUJBQXlCO29CQUNoRCxrQkFBa0I7b0JBQ2xCLHdCQUF3QjtvQkFDeEIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLFNBQVM7b0JBQ1QsV0FBVyxlQUFlO29CQUMxQixnQkFBZ0IsSUFBSSxnQkFBZ0I7b0JBQ3BDLG1CQUFtQixlQUFlO29CQUNsQyx3QkFBd0IsSUFBSSxnQkFBZ0I7OztnQkFHaEQsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELE9BQU8sY0FBYyxJQUFJLFFBQVEsU0FBUzt3QkFDMUMsT0FBTyxjQUFjLE1BQU0sUUFBUSxTQUFTO3dCQUM1QyxPQUFPLGNBQWMsT0FBTyxRQUFRLGdCQUFnQixPQUFPLFNBQVM7d0JBQ3BFLE9BQU8sY0FBYyxRQUFRLFFBQVEsSUFBSSxPQUFPLFNBQVM7d0JBQ3pELE9BQU8sY0FBYyxpQkFBaUIsUUFBUSxTQUFTO3dCQUN2RCxPQUFPLGNBQWMscUJBQXFCLFFBQVEsU0FBUzt3QkFDM0QsT0FBTyxjQUFjLG1CQUFtQixRQUFRLFNBQVM7d0JBQ3pELE9BQU8sY0FBYyxpQkFBaUIsUUFBUSxTQUFTO3dCQUN2RCxPQUFPLGNBQWMsYUFBYSxRQUFRLFNBQVM7d0JBQ25ELE9BQU8sY0FBYyxhQUFhLFFBQVEsU0FBUzs7d0JBRW5ELE9BQU8sY0FBYyxnQkFBZ0I7d0JBQ3JDLE9BQU8sY0FBYyxlQUFlLFFBQVEsUUFBUSxTQUFTLGVBQWU7d0JBQzVFLGNBQWMsZUFBZSxRQUFRLFVBQUMsZUFBZSxLQUFROzRCQUN6RCxPQUFPLGVBQWUsUUFBUSxJQUFJLHNCQUFzQixTQUFTLGVBQWU7O3dCQUVwRixPQUFPLGNBQWMsVUFBVSxJQUFJOzt3QkFFbkMsT0FBTyxjQUFjLGFBQWEsUUFBUSxTQUFTOzs7b0JBR3ZELEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELE9BQU8sWUFBTTs0QkFBRSxJQUFJOzJCQUFzQjs7O29CQUc3QyxHQUFHLG9FQUFvRSxZQUFXO3dCQUM5RSxPQUFPLHNCQUFzQixVQUFVO3dCQUN2QyxPQUFPLHNCQUFzQixTQUFTLE1BQU0sUUFBUSxpQkFBaUIsU0FBUzt3QkFDOUUsT0FBTyxzQkFBc0IsU0FBUyxRQUFRLFFBQVEsaUJBQWlCLFNBQVM7d0JBQ2hGLE9BQU8sc0JBQXNCLFNBQVMsUUFBUSxRQUFRLGlCQUFpQixTQUFTO3dCQUNoRixPQUFPLHNCQUFzQixTQUFTLFdBQVcsUUFBUSxpQkFBaUIsU0FBUzt3QkFDbkYsT0FBTyxzQkFBc0IsU0FBUyxtQkFBbUIsUUFDckQsaUJBQWlCLFNBQVM7Ozs7Z0JBSXRDLEdBQUcsaUVBQWlFLFlBQU07b0JBQ3RFLE9BQU8sY0FBYyx3QkFBd0IsUUFBUSxTQUFTLFNBQVM7OztnQkFHM0UsR0FBRywrREFBK0QsWUFBTTtvQkFDcEUsT0FBTyxjQUFjLHVCQUF1QixRQUFRLFNBQVMsU0FBUzs7O2dCQUcxRSxHQUFHLDJDQUEyQyxZQUFNO29CQUNoRCxPQUFPLGNBQWMsaUJBQWlCLFFBQVEsU0FBUyxPQUFPOzs7Z0JBR2xFLEdBQUcsZ0VBQWdFLFlBQU07b0JBQ3JFLE9BQU8sY0FBYyx1QkFBdUIsUUFBUSxTQUFTLE1BQU07Ozs7O0dBa0J4RSIsImZpbGUiOiJwb2xpY3lWaW9sYXRpb24vbW9kZWwvUG9saWN5VmlvbGF0aW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE3LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vUG9saWN5VGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IFBvbGljeVZpb2xhdGlvbiwgcG9saWN5VGVzdERhdGEsIFBvbGljeSwgdGVzdERhdGEsIHRlc3RWaW9sYXRpb24sIElkZW50aXR5U3VtbWFyeSwgUG9saWN5VmlvbGF0aW9uQWN0aW9uLFxuICAgICAgICB0ZXN0QWN0aXZpdHlWaW9sYXRpb24sIHRlc3RBY3Rpdml0eURhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwb2xpY3lWaW9sYXRpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9Qb2xpY3lWaW9sYXRpb25fLCBfcG9saWN5VGVzdERhdGFfLCBfUG9saWN5XywgX0lkZW50aXR5U3VtbWFyeV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1BvbGljeVZpb2xhdGlvbkFjdGlvbl8pIHtcbiAgICAgICAgUG9saWN5VmlvbGF0aW9uID0gX1BvbGljeVZpb2xhdGlvbl87XG4gICAgICAgIFBvbGljeVZpb2xhdGlvbkFjdGlvbiA9IF9Qb2xpY3lWaW9sYXRpb25BY3Rpb25fO1xuICAgICAgICBJZGVudGl0eVN1bW1hcnkgPSBfSWRlbnRpdHlTdW1tYXJ5XztcbiAgICAgICAgcG9saWN5VGVzdERhdGEgPSBfcG9saWN5VGVzdERhdGFfO1xuICAgICAgICBQb2xpY3kgPSBfUG9saWN5XztcbiAgICAgICAgdGVzdERhdGEgPSBwb2xpY3lUZXN0RGF0YS5QT0xJQ1lfVklPTEFUSU9OX0RBVEFfMTtcbiAgICAgICAgdGVzdFZpb2xhdGlvbiA9IG5ldyBQb2xpY3lWaW9sYXRpb24odGVzdERhdGEpO1xuICAgICAgICB0ZXN0QWN0aXZpdHlEYXRhID0gcG9saWN5VGVzdERhdGEuUE9MSUNZX1ZJT0xBVElPTl9EQVRBXzM7XG4gICAgICAgIHRlc3RBY3Rpdml0eVZpb2xhdGlvbiA9IG5ldyBQb2xpY3lWaW9sYXRpb24odGVzdEFjdGl2aXR5RGF0YSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2luaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24uaWQpLnRvRXF1YWwodGVzdERhdGEuaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24ubmFtZSkudG9FcXVhbCh0ZXN0RGF0YS5uYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLm93bmVyKS50b0VxdWFsKElkZW50aXR5U3VtbWFyeS5jcmVhdGUodGVzdERhdGEub3duZXIpKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLnBvbGljeSkudG9FcXVhbChuZXcgUG9saWN5KHRlc3REYXRhLnBvbGljeSkpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24ucnVsZURlc2NyaXB0aW9uKS50b0VxdWFsKHRlc3REYXRhLnJ1bGVEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBleHBlY3QodGVzdFZpb2xhdGlvbi5jb21wZW5zYXRpbmdDb250cm9sKS50b0VxdWFsKHRlc3REYXRhLmNvbXBlbnNhdGluZ0NvbnRyb2wpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24ucmVtZWRpYXRpb25BZHZpY2UpLnRvRXF1YWwodGVzdERhdGEucmVtZWRpYXRpb25BZHZpY2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24uYXBwbGljYXRpb25OYW1lKS50b0VxdWFsKHRlc3REYXRhLmFwcGxpY2F0aW9uTmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFZpb2xhdGlvbi5hY2NvdW50TmFtZSkudG9FcXVhbCh0ZXN0RGF0YS5hY2NvdW50TmFtZSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFZpb2xhdGlvbi5zY29yZVdlaWdodCkudG9FcXVhbCh0ZXN0RGF0YS5zY29yZVdlaWdodCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLmFsbG93ZWRBY3Rpb25zKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24uYWxsb3dlZEFjdGlvbnMubGVuZ3RoKS50b0VxdWFsKHRlc3REYXRhLmFsbG93ZWRBY3Rpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICB0ZXN0VmlvbGF0aW9uLmFsbG93ZWRBY3Rpb25zLmZvckVhY2goKGFsbG93ZWRBY3Rpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbGxvd2VkQWN0aW9uKS50b0VxdWFsKG5ldyBQb2xpY3lWaW9sYXRpb25BY3Rpb24odGVzdERhdGEuYWxsb3dlZEFjdGlvbnNbaWR4XSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdFZpb2xhdGlvbi5hY3Rpdml0eSkubm90LnRvQmVEZWZpbmVkKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLmRpc3BsYXlOYW1lKS50b0VxdWFsKHRlc3REYXRhLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBkYXRhIGlzIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUG9saWN5VmlvbGF0aW9uKCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggYWN0aXZpdHkgZGF0YSBmb3IgcG9saWN5IG9mIEFjdGl2aXR5IHR5cGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QWN0aXZpdHlWaW9sYXRpb24uYWN0aXZpdHkpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdEFjdGl2aXR5VmlvbGF0aW9uLmFjdGl2aXR5LnVzZXIpLnRvRXF1YWwodGVzdEFjdGl2aXR5RGF0YS5hY3Rpdml0eS51c2VyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QWN0aXZpdHlWaW9sYXRpb24uYWN0aXZpdHkuYWN0aW9uKS50b0VxdWFsKHRlc3RBY3Rpdml0eURhdGEuYWN0aXZpdHkuYWN0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QWN0aXZpdHlWaW9sYXRpb24uYWN0aXZpdHkudGFyZ2V0KS50b0VxdWFsKHRlc3RBY3Rpdml0eURhdGEuYWN0aXZpdHkudGFyZ2V0KTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QWN0aXZpdHlWaW9sYXRpb24uYWN0aXZpdHkudGltZVN0YW1wKS50b0VxdWFsKHRlc3RBY3Rpdml0eURhdGEuYWN0aXZpdHkudGltZVN0YW1wKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QWN0aXZpdHlWaW9sYXRpb24uYWN0aXZpdHkuc291cmNlQXBwbGljYXRpb24pLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgdGVzdEFjdGl2aXR5RGF0YS5hY3Rpdml0eS5zb3VyY2VBcHBsaWNhdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldElkZW50aXR5Rmlyc3ROYW1lIHNob3VsZCByZXR1cm4gdGFyZ2V0IGlkZW50aXR5IGZpcnN0IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLmdldElkZW50aXR5Rmlyc3ROYW1lKCkpLnRvRXF1YWwodGVzdERhdGEuaWRlbnRpdHkuZmlyc3ROYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRJZGVudGl0eUxhc3ROYW1lIHNob3VsZCByZXR1cm4gdGFyZ2V0IGlkZW50aXR5IGxhc3QgbmFtZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHRlc3RWaW9sYXRpb24uZ2V0SWRlbnRpdHlMYXN0TmFtZSgpKS50b0VxdWFsKHRlc3REYXRhLmlkZW50aXR5Lmxhc3ROYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRQb2xpY3lOYW1lIHNob3VsZCByZXR1cm4gcG9saWN5IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCh0ZXN0VmlvbGF0aW9uLmdldFBvbGljeU5hbWUoKSkudG9FcXVhbCh0ZXN0RGF0YS5wb2xpY3kubmFtZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0T3duZXJEaXNwbGF5TmFtZSBzaG91bGQgcmV0dXJuIG93bmVyIGlkZW50aXR5IGRpc3BsYXlOYW1lJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QodGVzdFZpb2xhdGlvbi5nZXRPd25lckRpc3BsYXlOYW1lKCkpLnRvRXF1YWwodGVzdERhdGEub3duZXIuZGlzcGxheU5hbWUpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
