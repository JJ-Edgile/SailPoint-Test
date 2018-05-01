System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('PolicyTreeNodeState', function () {

                var PolicyTreeNodeState = undefined,
                    data = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_PolicyTreeNodeState_, certificationTestData) {
                    PolicyTreeNodeState = _PolicyTreeNodeState_;
                    data = certificationTestData.POLICY_TREE_NODE.children[0].status[0];
                }));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new PolicyTreeNodeState(null);
                        }).toThrow();
                    });

                    it('sets values', function () {
                        var node = new PolicyTreeNodeState(data);

                        expect(node.associatedItemId).toEqual(data.associatedItemId);
                        expect(node.associatedEntityId).toEqual(data.associatedEntityId);
                        expect(node.action).toEqual(data.action);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vUG9saWN5VHJlZU5vZGVTdGF0ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsNkJBQTZCLFVBQVUsU0FBUztJQUM3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHVCQUF1QixZQUFNOztnQkFFbEMsSUFBSSxzQkFBbUI7b0JBQUUsT0FBSTs7Z0JBRTdCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLHVCQUF1Qix1QkFBMEI7b0JBQ2hFLHNCQUFzQjtvQkFDdEIsT0FBTyxzQkFBc0IsaUJBQWlCLFNBQVMsR0FBRyxPQUFPOzs7Z0JBR3JFLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHVCQUF1QixZQUFNO3dCQUM1QixPQUFPLFlBQUE7NEJBUVMsT0FSSCxJQUFJLG9CQUFvQjsyQkFBTzs7O29CQUdoRCxHQUFHLGVBQWUsWUFBTTt3QkFDcEIsSUFBSSxPQUFPLElBQUksb0JBQW9COzt3QkFFbkMsT0FBTyxLQUFLLGtCQUFrQixRQUFRLEtBQUs7d0JBQzNDLE9BQU8sS0FBSyxvQkFBb0IsUUFBUSxLQUFLO3dCQUM3QyxPQUFPLEtBQUssUUFBUSxRQUFRLEtBQUs7Ozs7OztHQWUxQyIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL3JlbWVkaWF0aW9uL1BvbGljeVRyZWVOb2RlU3RhdGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnUG9saWN5VHJlZU5vZGVTdGF0ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgUG9saWN5VHJlZU5vZGVTdGF0ZSwgZGF0YTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Qb2xpY3lUcmVlTm9kZVN0YXRlXywgY2VydGlmaWNhdGlvblRlc3REYXRhKSA9PiB7XHJcbiAgICAgICAgUG9saWN5VHJlZU5vZGVTdGF0ZSA9IF9Qb2xpY3lUcmVlTm9kZVN0YXRlXztcclxuICAgICAgICBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX05PREUuY2hpbGRyZW5bMF0uc3RhdHVzWzBdO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IG5ldyBQb2xpY3lUcmVlTm9kZVN0YXRlKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgUG9saWN5VHJlZU5vZGVTdGF0ZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmFzc29jaWF0ZWRJdGVtSWQpLnRvRXF1YWwoZGF0YS5hc3NvY2lhdGVkSXRlbUlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5vZGUuYXNzb2NpYXRlZEVudGl0eUlkKS50b0VxdWFsKGRhdGEuYXNzb2NpYXRlZEVudGl0eUlkKTtcclxuICAgICAgICAgICAgZXhwZWN0KG5vZGUuYWN0aW9uKS50b0VxdWFsKGRhdGEuYWN0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
