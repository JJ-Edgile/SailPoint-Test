System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', './RemediationTestData'], function (_export) {
    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('EntitlementSoDRevocationStepHandler', function () {

                var EntitlementSoDRevocationStepHandler = undefined,
                    advice = undefined,
                    policyTree = undefined,
                    $rootScope = undefined,
                    PolicyTreeNode = undefined,
                    dialogContext = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_EntitlementSoDRevocationStepHandler_, RemediationAdvice, _PolicyTreeNode_, remediationTestData, _$rootScope_, RemediationDialogContext) {
                    EntitlementSoDRevocationStepHandler = _EntitlementSoDRevocationStepHandler_;
                    PolicyTreeNode = _PolicyTreeNode_;
                    $rootScope = _$rootScope_;

                    var adviceData = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.advice);
                    adviceData.entitlementsToRemediate = remediationTestData.POLICY_TREE_NODE;
                    advice = new RemediationAdvice(adviceData);
                    policyTree = advice.entitlementsToRemediate;
                    dialogContext = new RemediationDialogContext({});
                }));

                describe('constructor', function () {
                    it('throws without advice', function () {
                        expect(function () {
                            new EntitlementSoDRevocationStepHandler(dialogContext, undefined);
                        }).toThrow();
                    });

                    it('throws without dialog context', function () {
                        expect(function () {
                            new EntitlementSoDRevocationStepHandler(undefined, advice);
                        }).toThrow();
                    });

                    it('sets the correct data', function () {
                        var stepHandler = new EntitlementSoDRevocationStepHandler(dialogContext, advice);
                        expect(stepHandler.policyTree).toEqual(policyTree);
                        expect(stepHandler.violationConstraint).toEqual(advice.violationConstraint);
                        expect(stepHandler.violationSummary).toEqual(advice.violationSummary);
                    });

                    it('calls through to dialogContext.setupPolicyTreeLeaf for all leaf nodes', function () {
                        spyOn(dialogContext, 'setupPolicyTreeLeaf');

                        // Create the step handler.
                        new EntitlementSoDRevocationStepHandler(dialogContext, advice);
                        policyTree.children.forEach(function (node) {
                            expect(dialogContext.setupPolicyTreeLeaf).toHaveBeenCalledWith(node);
                        });
                    });

                    it('pre-selects nodes that are passed in to the constructor as selected', function () {
                        var selectedViolationEntitlements = [new PolicyTreeNode(advice.entitlementsToRemediate.children[0])],
                            stepHandler = new EntitlementSoDRevocationStepHandler(dialogContext, advice, selectedViolationEntitlements);

                        expect(stepHandler.policyTree.children[0].selected).toEqual(true);
                        expect(stepHandler.policyTree.children[1].selected).toEqual(false);
                    });
                });

                describe('isSaveDisabled()', function () {
                    it('returns true if the violation is not resolved', function () {
                        spyOn(policyTree, 'isResolved').and.returnValue(false);
                        var stepHandler = new EntitlementSoDRevocationStepHandler(dialogContext, advice);
                        expect(stepHandler.isSaveDisabled()).toEqual(true);
                    });

                    it('returns false if the violation is resolved', function () {
                        spyOn(policyTree, 'isResolved').and.returnValue(true);
                        var stepHandler = new EntitlementSoDRevocationStepHandler(dialogContext, advice);
                        expect(stepHandler.isSaveDisabled()).toEqual(false);
                    });
                });

                it('save resolves with the selected nodes', function () {
                    var selected = ['some', 'selected', 'nodes'];
                    spyOn(policyTree, 'getSelectedNodes').and.returnValue(selected);
                    var stepHandler = new EntitlementSoDRevocationStepHandler(dialogContext, advice);
                    var result = undefined;

                    stepHandler.save().then(function (stepResult) {
                        result = stepResult;
                    });
                    $rootScope.$apply();
                    expect(result).toBeDefined();
                    expect(result.selectedViolationEntitlements).toEqual(selected);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9FbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsMEJBQTBCLFVBQVUsU0FBUztJQUM3SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHVDQUF1QyxZQUFNOztnQkFFbEQsSUFBSSxzQ0FBbUM7b0JBQUUsU0FBTTtvQkFBRSxhQUFVO29CQUFFLGFBQVU7b0JBQUUsaUJBQWM7b0JBQUUsZ0JBQWE7O2dCQUV0RyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyx1Q0FBdUMsbUJBQ3ZDLGtCQUFrQixxQkFBcUIsY0FDdkMsMEJBQTZCO29CQUM1QyxzQ0FBc0M7b0JBQ3RDLGlCQUFpQjtvQkFDakIsYUFBYTs7b0JBRWIsSUFBSSxhQUFhLFFBQVEsS0FBSyxvQkFBb0IsMEJBQTBCO29CQUM1RSxXQUFXLDBCQUEwQixvQkFBb0I7b0JBQ3pELFNBQVMsSUFBSSxrQkFBa0I7b0JBQy9CLGFBQWEsT0FBTztvQkFDcEIsZ0JBQWdCLElBQUkseUJBQXlCOzs7Z0JBR2pELFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixPQUFPLFlBQU07NEJBQUUsSUFBSSxvQ0FBb0MsZUFBZTsyQkFBZTs7O29CQUd6RixHQUFHLGlDQUFpQyxZQUFNO3dCQUN0QyxPQUFPLFlBQU07NEJBQUUsSUFBSSxvQ0FBb0MsV0FBVzsyQkFBWTs7O29CQUdsRixHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixJQUFJLGNBQWMsSUFBSSxvQ0FBb0MsZUFBZTt3QkFDekUsT0FBTyxZQUFZLFlBQVksUUFBUTt3QkFDdkMsT0FBTyxZQUFZLHFCQUFxQixRQUFRLE9BQU87d0JBQ3ZELE9BQU8sWUFBWSxrQkFBa0IsUUFBUSxPQUFPOzs7b0JBR3hELEdBQUcseUVBQXlFLFlBQU07d0JBQzlFLE1BQU0sZUFBZTs7O3dCQUdyQixJQUFJLG9DQUFvQyxlQUFlO3dCQUN2RCxXQUFXLFNBQVMsUUFBUSxVQUFDLE1BQVM7NEJBQ2xDLE9BQU8sY0FBYyxxQkFBcUIscUJBQXFCOzs7O29CQUl2RSxHQUFHLHVFQUF1RSxZQUFNO3dCQUM1RSxJQUFJLGdDQUFnQyxDQUFDLElBQUksZUFBZSxPQUFPLHdCQUF3QixTQUFTOzRCQUM1RixjQUNJLElBQUksb0NBQW9DLGVBQWUsUUFBUTs7d0JBRXZFLE9BQU8sWUFBWSxXQUFXLFNBQVMsR0FBRyxVQUFVLFFBQVE7d0JBQzVELE9BQU8sWUFBWSxXQUFXLFNBQVMsR0FBRyxVQUFVLFFBQVE7Ozs7Z0JBSXBFLFNBQVMsb0JBQW9CLFlBQU07b0JBQy9CLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELE1BQU0sWUFBWSxjQUFjLElBQUksWUFBWTt3QkFDaEQsSUFBSSxjQUFjLElBQUksb0NBQW9DLGVBQWU7d0JBQ3pFLE9BQU8sWUFBWSxrQkFBa0IsUUFBUTs7O29CQUdqRCxHQUFHLDhDQUE4QyxZQUFNO3dCQUNuRCxNQUFNLFlBQVksY0FBYyxJQUFJLFlBQVk7d0JBQ2hELElBQUksY0FBYyxJQUFJLG9DQUFvQyxlQUFlO3dCQUN6RSxPQUFPLFlBQVksa0JBQWtCLFFBQVE7Ozs7Z0JBSXJELEdBQUcseUNBQXlDLFlBQU07b0JBQzlDLElBQUksV0FBVyxDQUFFLFFBQVEsWUFBWTtvQkFDckMsTUFBTSxZQUFZLG9CQUFvQixJQUFJLFlBQVk7b0JBQ3RELElBQUksY0FBYyxJQUFJLG9DQUFvQyxlQUFlO29CQUN6RSxJQUFJLFNBQU07O29CQUVWLFlBQVksT0FBTyxLQUFLLFVBQUMsWUFBZTt3QkFDcEMsU0FBUzs7b0JBRWIsV0FBVztvQkFDWCxPQUFPLFFBQVE7b0JBQ2YsT0FBTyxPQUFPLCtCQUErQixRQUFROzs7OztHQWlCMUQiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL0VudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAnLi9SZW1lZGlhdGlvblRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlcicsICgpID0+IHtcclxuXHJcbiAgICBsZXQgRW50aXRsZW1lbnRTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIsIGFkdmljZSwgcG9saWN5VHJlZSwgJHJvb3RTY29wZSwgUG9saWN5VHJlZU5vZGUsIGRpYWxvZ0NvbnRleHQ7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocmVtZWRpYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0VudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXywgUmVtZWRpYXRpb25BZHZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX1BvbGljeVRyZWVOb2RlXywgcmVtZWRpYXRpb25UZXN0RGF0YSwgXyRyb290U2NvcGVfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCkgPT4ge1xyXG4gICAgICAgIEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyID0gX0VudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyXztcclxuICAgICAgICBQb2xpY3lUcmVlTm9kZSA9IF9Qb2xpY3lUcmVlTm9kZV87XHJcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcclxuXHJcbiAgICAgICAgbGV0IGFkdmljZURhdGEgPSBhbmd1bGFyLmNvcHkocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULmFkdmljZSk7XHJcbiAgICAgICAgYWR2aWNlRGF0YS5lbnRpdGxlbWVudHNUb1JlbWVkaWF0ZSA9IHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERTtcclxuICAgICAgICBhZHZpY2UgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2UoYWR2aWNlRGF0YSk7XHJcbiAgICAgICAgcG9saWN5VHJlZSA9IGFkdmljZS5lbnRpdGxlbWVudHNUb1JlbWVkaWF0ZTtcclxuICAgICAgICBkaWFsb2dDb250ZXh0ID0gbmV3IFJlbWVkaWF0aW9uRGlhbG9nQ29udGV4dCh7fSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBhZHZpY2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IG5ldyBFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCB1bmRlZmluZWQpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBkaWFsb2cgY29udGV4dCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgbmV3IEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKHVuZGVmaW5lZCwgYWR2aWNlKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0aGUgY29ycmVjdCBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RlcEhhbmRsZXIgPSBuZXcgRW50aXRsZW1lbnRTb0RSZXZvY2F0aW9uU3RlcEhhbmRsZXIoZGlhbG9nQ29udGV4dCwgYWR2aWNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLnBvbGljeVRyZWUpLnRvRXF1YWwocG9saWN5VHJlZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci52aW9sYXRpb25Db25zdHJhaW50KS50b0VxdWFsKGFkdmljZS52aW9sYXRpb25Db25zdHJhaW50KTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLnZpb2xhdGlvblN1bW1hcnkpLnRvRXF1YWwoYWR2aWNlLnZpb2xhdGlvblN1bW1hcnkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBkaWFsb2dDb250ZXh0LnNldHVwUG9saWN5VHJlZUxlYWYgZm9yIGFsbCBsZWFmIG5vZGVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihkaWFsb2dDb250ZXh0LCAnc2V0dXBQb2xpY3lUcmVlTGVhZicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBzdGVwIGhhbmRsZXIuXHJcbiAgICAgICAgICAgIG5ldyBFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UpO1xyXG4gICAgICAgICAgICBwb2xpY3lUcmVlLmNoaWxkcmVuLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChkaWFsb2dDb250ZXh0LnNldHVwUG9saWN5VHJlZUxlYWYpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3ByZS1zZWxlY3RzIG5vZGVzIHRoYXQgYXJlIHBhc3NlZCBpbiB0byB0aGUgY29uc3RydWN0b3IgYXMgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyA9IFtuZXcgUG9saWN5VHJlZU5vZGUoYWR2aWNlLmVudGl0bGVtZW50c1RvUmVtZWRpYXRlLmNoaWxkcmVuWzBdKV0sXHJcbiAgICAgICAgICAgICAgICBzdGVwSGFuZGxlciA9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKGRpYWxvZ0NvbnRleHQsIGFkdmljZSwgc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLnBvbGljeVRyZWUuY2hpbGRyZW5bMF0uc2VsZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5wb2xpY3lUcmVlLmNoaWxkcmVuWzFdLnNlbGVjdGVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1NhdmVEaXNhYmxlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIHZpb2xhdGlvbiBpcyBub3QgcmVzb2x2ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKHBvbGljeVRyZWUsICdpc1Jlc29sdmVkJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKGRpYWxvZ0NvbnRleHQsIGFkdmljZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGUgdmlvbGF0aW9uIGlzIHJlc29sdmVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihwb2xpY3lUcmVlLCAnaXNSZXNvbHZlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgbGV0IHN0ZXBIYW5kbGVyID0gbmV3IEVudGl0bGVtZW50U29EUmV2b2NhdGlvblN0ZXBIYW5kbGVyKGRpYWxvZ0NvbnRleHQsIGFkdmljZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzYXZlIHJlc29sdmVzIHdpdGggdGhlIHNlbGVjdGVkIG5vZGVzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IFsgJ3NvbWUnLCAnc2VsZWN0ZWQnLCAnbm9kZXMnIF07XHJcbiAgICAgICAgc3B5T24ocG9saWN5VHJlZSwgJ2dldFNlbGVjdGVkTm9kZXMnKS5hbmQucmV0dXJuVmFsdWUoc2VsZWN0ZWQpO1xyXG4gICAgICAgIGxldCBzdGVwSGFuZGxlciA9IG5ldyBFbnRpdGxlbWVudFNvRFJldm9jYXRpb25TdGVwSGFuZGxlcihkaWFsb2dDb250ZXh0LCBhZHZpY2UpO1xyXG4gICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgIHN0ZXBIYW5kbGVyLnNhdmUoKS50aGVuKChzdGVwUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHN0ZXBSZXN1bHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIGV4cGVjdChyZXN1bHQuc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpLnRvRXF1YWwoc2VsZWN0ZWQpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
