System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationPolicyTreeNode', function () {

                var CertificationPolicyTreeNode = undefined,
                    PolicyTreeNode = undefined,
                    PolicyTreeNodeState = undefined,
                    data = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationPolicyTreeNode_, _PolicyTreeNode_, _PolicyTreeNodeState_, certificationTestData) {
                    CertificationPolicyTreeNode = _CertificationPolicyTreeNode_;
                    PolicyTreeNode = _PolicyTreeNode_;
                    PolicyTreeNodeState = _PolicyTreeNodeState_;
                    data = certificationTestData.POLICY_TREE_NODE;
                }));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new CertificationPolicyTreeNode(null);
                        }).toThrow();
                    });

                    function checkLeaf(actual, expected) {
                        expect(actual instanceof CertificationPolicyTreeNode).toBe(true);
                        expect(actual.application).toEqual(expected.application);
                        expect(actual.applicationId).toEqual(expected.applicationId);
                        expect(actual.name).toEqual(expected.name);
                        expect(actual.value).toEqual(expected.value);
                        expect(actual.displayValue).toEqual(expected.displayValue);
                        expect(actual.description).toEqual(expected.description);
                        expect(actual.permission).toEqual(expected.permission);
                        expect(actual.selected).toEqual(expected.selected);
                        expect(actual.children).toBeUndefined();

                        if (expected.status) {
                            var _status = actual.status[0];
                            var expectedStatus = expected.status[0];
                            expect(_status instanceof PolicyTreeNodeState).toBe(true);
                            expect(_status.associatedItemId).toEqual(expectedStatus.associatedItemId);
                            expect(_status.associatedEntityId).toEqual(expectedStatus.associatedEntityId);
                            expect(_status.action).toEqual(expectedStatus.action);
                        }
                    }

                    it('sets values', function () {
                        var node = new CertificationPolicyTreeNode(data);

                        expect(node.operator).toEqual(data.operator);
                        expect(node.children.length).toEqual(2);
                        checkLeaf(node.children[0], data.children[0]);
                        checkLeaf(node.children[1], data.children[1]);
                    });
                });

                function getLeafData() {
                    return angular.copy(data.children[0]);
                }

                describe('hasLineItemDecision()', function () {
                    it('returns false if there is no status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status = undefined;
                        expect(node.hasLineItemDecision()).toEqual(false);
                    });

                    it('returns false if there is no action on the status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status[0].action = undefined;
                        expect(node.hasLineItemDecision()).toEqual(false);
                    });

                    it('returns false if there is a clear action on the status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status[0].action = 'Cleared';
                        expect(node.hasLineItemDecision()).toEqual(false);
                    });

                    it('returns true if there is an action on the status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        expect(node.hasLineItemDecision()).toEqual(true);
                    });
                });

                describe('getLineItemDecision()', function () {
                    it('returns null if there is no status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status = undefined;
                        expect(node.getLineItemDecision()).toBeNull();
                    });

                    it('returns the action on the status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        expect(node.getLineItemDecision()).toEqual('Approved');
                    });
                });

                describe('hasStatus()', function () {
                    it('returns false is status is null', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status = undefined;
                        expect(node.hasStatus()).toEqual(false);
                    });

                    it('returns false is status is empty', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status = [];
                        expect(node.hasStatus()).toEqual(false);
                    });

                    it('returns true if there is a status', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        expect(node.hasStatus()).toEqual(true);
                    });
                });

                function createLeaf(selected) {
                    return new CertificationPolicyTreeNode({
                        selected: selected
                    });
                }

                function createNonLeaf(isAnd, selected) {
                    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        children[_key - 2] = arguments[_key];
                    }

                    return new CertificationPolicyTreeNode({
                        operator: isAnd ? PolicyTreeNode.Operator.AND : PolicyTreeNode.Operator.OR,
                        selected: selected,
                        children: children
                    });
                }

                describe('getSelectedNodes()', function () {
                    it('returns all selected nodes in a tree', function () {
                        var selected1 = createLeaf(true);
                        var selected2 = createLeaf(true);
                        // Make node not manually selected, but Remediated outside of the violation
                        var selected3 = createLeaf(false);
                        selected3.status = [new PolicyTreeNodeState({
                            action: 'Remediated'
                        })];

                        var node = createNonLeaf(true, false, selected1, createNonLeaf(false, false, createLeaf(), selected2, createNonLeaf(true, false, createLeaf(), createLeaf(), selected3)));
                        var selectedNodes = node.getSelectedNodes();
                        expect(selectedNodes.length).toEqual(3);
                        expect(selectedNodes).toContain(selected1);
                        expect(selectedNodes).toContain(selected2);
                        expect(selectedNodes).toContain(selected3);
                    });
                });

                describe('isPolicyNodeSelected()', function () {
                    function testNodeSelectionWithDecision(decision, expectSelected) {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        node.status[0].action = decision;
                        node.selected = false;
                        expect(node.isPolicyNodeSelected()).toEqual(expectSelected);
                    }

                    it('returns true if selected is false but there is a Remediated decision', function () {
                        testNodeSelectionWithDecision('Remediated', true);
                    });

                    it('returns false if selected is false and there is a non-Remediated decision', function () {
                        testNodeSelectionWithDecision('Approved', false);
                    });
                });

                describe('isPolicyNodeDisabled()', function () {
                    describe('OR node', function () {
                        it('return true if ALL children are disabled', function () {
                            var orNode = createNonLeaf(false, false, createLeaf(false), createLeaf(false));
                            spyOn(orNode.children[0], 'isPolicyNodeDisabled').and.returnValue(true);
                            spyOn(orNode.children[1], 'isPolicyNodeDisabled').and.returnValue(true);
                            expect(orNode.isPolicyNodeDisabled()).toEqual(true);
                        });

                        it('returns false if ANY child is not disabled', function () {
                            var orNode = createNonLeaf(false, false, createLeaf(false), createLeaf(false));
                            spyOn(orNode.children[0], 'isPolicyNodeDisabled').and.returnValue(true);
                            spyOn(orNode.children[1], 'isPolicyNodeDisabled').and.returnValue(false);
                            expect(orNode.isPolicyNodeDisabled()).toEqual(false);
                        });
                    });

                    describe('AND node', function () {
                        it('returns true if ANY child leaf has Remediated line item decision', function () {
                            var andNode = createNonLeaf(true, false, createLeaf(false), createLeaf(false));
                            andNode.children[1].status = [new PolicyTreeNodeState({
                                action: 'Approved'
                            })];
                            expect(andNode.isPolicyNodeDisabled()).toEqual(true);
                        });

                        it('returns true if ALL children leaves are Remediated line item decisions', function () {
                            var andNode = createNonLeaf(true, false, createLeaf(false), createLeaf(false));
                            andNode.children[0].status = [new PolicyTreeNodeState({
                                action: 'Remediated'
                            })];
                            andNode.children[1].status = [new PolicyTreeNodeState({
                                action: 'Remediated'
                            })];
                            expect(andNode.isPolicyNodeDisabled()).toEqual(true);
                        });

                        it('returns false if ANY child does not have decision when all other decisions are Remediated', function () {
                            var andNode = createNonLeaf(true, false, createLeaf(false), createLeaf(false));
                            andNode.children[1].status = [new PolicyTreeNodeState({
                                action: 'Remediated'
                            })];
                            expect(andNode.isPolicyNodeDisabled()).toEqual(false);
                        });

                        it('returns true on multi level if all immediate children are disabled', function () {
                            var andNode = createNonLeaf(true, false, createNonLeaf(true, false, createLeaf(false)), createNonLeaf(false, false, createLeaf(false)));
                            spyOn(andNode.children[0], 'isPolicyNodeDisabled').and.returnValue(true);
                            spyOn(andNode.children[1], 'isPolicyNodeDisabled').and.returnValue(true);
                            expect(andNode.isPolicyNodeDisabled()).toEqual(true);
                        });

                        it('returns false on multi level if any immediate children is not disabled', function () {
                            var andNode = createNonLeaf(true, false, createNonLeaf(true, false, createLeaf(false)), createNonLeaf(false, false, createLeaf(false)));
                            spyOn(andNode.children[0], 'isPolicyNodeDisabled').and.returnValue(true);
                            spyOn(andNode.children[1], 'isPolicyNodeDisabled').and.returnValue(false);
                            expect(andNode.isPolicyNodeDisabled()).toEqual(false);
                        });
                    });

                    describe('leaf', function () {
                        it('returns true if line item decision', function () {
                            var leaf = createLeaf(false);
                            spyOn(leaf, 'hasLineItemDecision').and.returnValue(true);
                            expect(leaf.isPolicyNodeDisabled()).toEqual(true);
                        });
                    });
                });

                describe('hasDetails()', function () {
                    it('returns true if has description', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        spyOn(node, 'hasLineItemDecision').and.returnValue(false);
                        node.description = 'something';
                        expect(node.hasDetails()).toEqual(true);
                    });

                    it('returns true if has line item descision', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        spyOn(node, 'hasLineItemDecision').and.returnValue(true);
                        delete node.description;
                        expect(node.hasDetails()).toEqual(true);
                    });

                    it('returns false if no description or line item decision', function () {
                        var node = new CertificationPolicyTreeNode(getLeafData());
                        spyOn(node, 'hasLineItemDecision').and.returnValue(false);
                        delete node.description;
                        expect(node.hasDetails()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTO0lBQzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsK0JBQStCLFlBQU07O2dCQUUxQyxJQUFJLDhCQUEyQjtvQkFBRSxpQkFBYztvQkFBRSxzQkFBbUI7b0JBQUUsT0FBSTs7Z0JBRTFFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLCtCQUErQixrQkFBa0IsdUJBQ2pELHVCQUEwQjtvQkFDekMsOEJBQThCO29CQUM5QixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsT0FBTyxzQkFBc0I7OztnQkFHakMsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsdUJBQXVCLFlBQU07d0JBQzVCLE9BQU8sWUFBQTs0QkFTUyxPQVRILElBQUksNEJBQTRCOzJCQUFPOzs7b0JBR3hELFNBQVMsVUFBVSxRQUFRLFVBQVU7d0JBQ2pDLE9BQU8sa0JBQWtCLDZCQUE2QixLQUFLO3dCQUMzRCxPQUFPLE9BQU8sYUFBYSxRQUFRLFNBQVM7d0JBQzVDLE9BQU8sT0FBTyxlQUFlLFFBQVEsU0FBUzt3QkFDOUMsT0FBTyxPQUFPLE1BQU0sUUFBUSxTQUFTO3dCQUNyQyxPQUFPLE9BQU8sT0FBTyxRQUFRLFNBQVM7d0JBQ3RDLE9BQU8sT0FBTyxjQUFjLFFBQVEsU0FBUzt3QkFDN0MsT0FBTyxPQUFPLGFBQWEsUUFBUSxTQUFTO3dCQUM1QyxPQUFPLE9BQU8sWUFBWSxRQUFRLFNBQVM7d0JBQzNDLE9BQU8sT0FBTyxVQUFVLFFB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QU0sT0FDaEIsY0FBYyxNQUFNLE9BQU8sV0FBVyxTQUN0QyxjQUFjLE9BQU8sT0FBTyxXQUFXOzRCQUUvQyxNQUFNLFFBQVEsU0FBUyxJQUFJLHdCQUF3QixJQUFJLFlBQVk7NEJBQ25FLE1BQU0sUUFBUSxTQUFTLElBQUksd0JBQXdCLElBQUksWUFBWTs0QkFDbkUsT0FBTyxRQUFRLHdCQUF3QixRQUFROzs7O29CQUl2RCxTQUFTLFFBQVEsWUFBTTt3QkFDbkIsR0FBRyxzQ0FBc0MsWUFBTTs0QkFDM0MsSUFBSSxPQUFPLFdBQVc7NEJBQ3RCLE1BQU0sTUFBTSx1QkFBdUIsSUFBSSxZQUFZOzRCQUNuRCxPQUFPLEtBQUssd0JBQXdCLFFBQVE7Ozs7O2dCQUt4RCxTQUFTLGdCQUFnQixZQUFNO29CQUMzQixHQUFHLG1DQUFtQyxZQUFNO3dCQUN4QyxJQUFJLE9BQU8sSUFBSSw0QkFBNEI7d0JBQzNDLE1BQU0sTUFBTSx1QkFBdUIsSUFBSSxZQUFZO3dCQUNuRCxLQUFLLGNBQWM7d0JBQ25CLE9BQU8sS0FBSyxjQUFjLFFBQVE7OztvQkFHdEMsR0FBRywyQ0FBMkMsWUFBTTt3QkFDaEQsSUFBSSxPQUFPLElBQUksNEJBQTRCO3dCQUMzQyxNQUFNLE1BQU0sdUJBQXVCLElBQUksWUFBWTt3QkFDbkQsT0FBTyxLQUFLO3dCQUNaLE9BQU8sS0FBSyxjQUFjLFFBQVE7OztvQkFHdEMsR0FBRyx5REFBeUQsWUFBTTt3QkFDOUQsSUFBSSxPQUFPLElBQUksNEJBQTRCO3dCQUMzQyxNQUFNLE1BQU0sdUJBQXVCLElBQUksWUFBWTt3QkFDbkQsT0FBTyxLQUFLO3dCQUNaLE9BQU8sS0FBSyxjQUFjLFFBQVE7Ozs7OztHQWxCM0MiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9yZW1lZGlhdGlvbi9DZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XHJcblxyXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUsIFBvbGljeVRyZWVOb2RlLCBQb2xpY3lUcmVlTm9kZVN0YXRlLCBkYXRhO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0NlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZV8sIF9Qb2xpY3lUcmVlTm9kZV8sIF9Qb2xpY3lUcmVlTm9kZVN0YXRlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEpID0+IHtcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUgPSBfQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlXztcclxuICAgICAgICBQb2xpY3lUcmVlTm9kZSA9IF9Qb2xpY3lUcmVlTm9kZV87XHJcbiAgICAgICAgUG9saWN5VHJlZU5vZGVTdGF0ZSA9IF9Qb2xpY3lUcmVlTm9kZVN0YXRlXztcclxuICAgICAgICBkYXRhID0gY2VydGlmaWNhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX05PREU7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZShudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0xlYWYoYWN0dWFsLCBleHBlY3RlZCkge1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsIGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKS50b0JlKHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLmFwcGxpY2F0aW9uKS50b0VxdWFsKGV4cGVjdGVkLmFwcGxpY2F0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5hcHBsaWNhdGlvbklkKS50b0VxdWFsKGV4cGVjdGVkLmFwcGxpY2F0aW9uSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLm5hbWUpLnRvRXF1YWwoZXhwZWN0ZWQubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWwudmFsdWUpLnRvRXF1YWwoZXhwZWN0ZWQudmFsdWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLmRpc3BsYXlWYWx1ZSkudG9FcXVhbChleHBlY3RlZC5kaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLmRlc2NyaXB0aW9uKS50b0VxdWFsKGV4cGVjdGVkLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5wZXJtaXNzaW9uKS50b0VxdWFsKGV4cGVjdGVkLnBlcm1pc3Npb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLnNlbGVjdGVkKS50b0VxdWFsKGV4cGVjdGVkLnNlbGVjdGVkKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5jaGlsZHJlbikudG9CZVVuZGVmaW5lZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXR1cyA9IGFjdHVhbC5zdGF0dXNbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwZWN0ZWRTdGF0dXMgPSBleHBlY3RlZC5zdGF0dXNbMF07XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdHVzIGluc3RhbmNlb2YgUG9saWN5VHJlZU5vZGVTdGF0ZSkudG9CZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0dXMuYXNzb2NpYXRlZEl0ZW1JZCkudG9FcXVhbChleHBlY3RlZFN0YXR1cy5hc3NvY2lhdGVkSXRlbUlkKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChzdGF0dXMuYXNzb2NpYXRlZEVudGl0eUlkKS50b0VxdWFsKGV4cGVjdGVkU3RhdHVzLmFzc29jaWF0ZWRFbnRpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RhdHVzLmFjdGlvbikudG9FcXVhbChleHBlY3RlZFN0YXR1cy5hY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnc2V0cyB2YWx1ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChub2RlLm9wZXJhdG9yKS50b0VxdWFsKGRhdGEub3BlcmF0b3IpO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5jaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGNoZWNrTGVhZihub2RlLmNoaWxkcmVuWzBdLCBkYXRhLmNoaWxkcmVuWzBdKTtcclxuICAgICAgICAgICAgY2hlY2tMZWFmKG5vZGUuY2hpbGRyZW5bMV0sIGRhdGEuY2hpbGRyZW5bMV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TGVhZkRhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShkYXRhLmNoaWxkcmVuWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnaGFzTGluZUl0ZW1EZWNpc2lvbigpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZXJlIGlzIG5vIHN0YXR1cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xyXG4gICAgICAgICAgICBub2RlLnN0YXR1cyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaGFzTGluZUl0ZW1EZWNpc2lvbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gYWN0aW9uIG9uIHRoZSBzdGF0dXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZShnZXRMZWFmRGF0YSgpKTtcclxuICAgICAgICAgICAgbm9kZS5zdGF0dXNbMF0uYWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNMaW5lSXRlbURlY2lzaW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBpcyBhIGNsZWFyIGFjdGlvbiBvbiB0aGUgc3RhdHVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoZ2V0TGVhZkRhdGEoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuc3RhdHVzWzBdLmFjdGlvbiA9ICdDbGVhcmVkJztcclxuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaGFzTGluZUl0ZW1EZWNpc2lvbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhbiBhY3Rpb24gb24gdGhlIHN0YXR1cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNMaW5lSXRlbURlY2lzaW9uKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0TGluZUl0ZW1EZWNpc2lvbigpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlcmUgaXMgbm8gc3RhdHVzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoZ2V0TGVhZkRhdGEoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuc3RhdHVzID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5nZXRMaW5lSXRlbURlY2lzaW9uKCkpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBhY3Rpb24gb24gdGhlIHN0YXR1cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5nZXRMaW5lSXRlbURlY2lzaW9uKCkpLnRvRXF1YWwoJ0FwcHJvdmVkJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzU3RhdHVzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaXMgc3RhdHVzIGlzIG51bGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZShnZXRMZWFmRGF0YSgpKTtcclxuICAgICAgICAgICAgbm9kZS5zdGF0dXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmhhc1N0YXR1cygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaXMgc3RhdHVzIGlzIGVtcHR5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoZ2V0TGVhZkRhdGEoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuc3RhdHVzID0gW107XHJcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmhhc1N0YXR1cygpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhIHN0YXR1cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNTdGF0dXMoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxlYWYoc2VsZWN0ZWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZSh7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vbkxlYWYoaXNBbmQsIHNlbGVjdGVkLCAuLi5jaGlsZHJlbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKHtcclxuICAgICAgICAgICAgb3BlcmF0b3I6IChpc0FuZCkgPyBQb2xpY3lUcmVlTm9kZS5PcGVyYXRvci5BTkQgOiBQb2xpY3lUcmVlTm9kZS5PcGVyYXRvci5PUixcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0U2VsZWN0ZWROb2RlcygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFsbCBzZWxlY3RlZCBub2RlcyBpbiBhIHRyZWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDEgPSBjcmVhdGVMZWFmKHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQyID0gY3JlYXRlTGVhZih0cnVlKTtcclxuICAgICAgICAgICAgLy8gTWFrZSBub2RlIG5vdCBtYW51YWxseSBzZWxlY3RlZCwgYnV0IFJlbWVkaWF0ZWQgb3V0c2lkZSBvZiB0aGUgdmlvbGF0aW9uXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZDMgPSBjcmVhdGVMZWFmKGZhbHNlKTtcclxuICAgICAgICAgICAgc2VsZWN0ZWQzLnN0YXR1cyA9IFtuZXcgUG9saWN5VHJlZU5vZGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdSZW1lZGlhdGVkJ1xyXG4gICAgICAgICAgICB9KV07XHJcblxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMSxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKGZhbHNlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDMpKSk7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE5vZGVzID0gbm9kZS5nZXRTZWxlY3RlZE5vZGVzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGVkTm9kZXMpLnRvQ29udGFpbihzZWxlY3RlZDEpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VsZWN0ZWROb2RlcykudG9Db250YWluKHNlbGVjdGVkMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzKS50b0NvbnRhaW4oc2VsZWN0ZWQzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1BvbGljeU5vZGVTZWxlY3RlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3ROb2RlU2VsZWN0aW9uV2l0aERlY2lzaW9uKGRlY2lzaW9uLCBleHBlY3RTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoZ2V0TGVhZkRhdGEoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuc3RhdHVzWzBdLmFjdGlvbiA9IGRlY2lzaW9uO1xyXG4gICAgICAgICAgICBub2RlLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmlzUG9saWN5Tm9kZVNlbGVjdGVkKCkpLnRvRXF1YWwoZXhwZWN0U2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzZWxlY3RlZCBpcyBmYWxzZSBidXQgdGhlcmUgaXMgYSBSZW1lZGlhdGVkIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0Tm9kZVNlbGVjdGlvbldpdGhEZWNpc2lvbignUmVtZWRpYXRlZCcsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzZWxlY3RlZCBpcyBmYWxzZSBhbmQgdGhlcmUgaXMgYSBub24tUmVtZWRpYXRlZCBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdE5vZGVTZWxlY3Rpb25XaXRoRGVjaXNpb24oJ0FwcHJvdmVkJywgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzUG9saWN5Tm9kZURpc2FibGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgZGVzY3JpYmUoJ09SIG5vZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm4gdHJ1ZSBpZiBBTEwgY2hpbGRyZW4gYXJlIGRpc2FibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihvck5vZGUuY2hpbGRyZW5bMF0sICdpc1BvbGljeU5vZGVEaXNhYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKG9yTm9kZS5jaGlsZHJlblsxXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9yTm9kZS5pc1BvbGljeU5vZGVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIEFOWSBjaGlsZCBpcyBub3QgZGlzYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JOb2RlID1cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKGZhbHNlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKG9yTm9kZS5jaGlsZHJlblswXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24ob3JOb2RlLmNoaWxkcmVuWzFdLCAnaXNQb2xpY3lOb2RlRGlzYWJsZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9yTm9kZS5pc1BvbGljeU5vZGVEaXNhYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnQU5EIG5vZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgQU5ZIGNoaWxkIGxlYWYgaGFzIFJlbWVkaWF0ZWQgbGluZSBpdGVtIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuZE5vZGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBhbmROb2RlLmNoaWxkcmVuWzFdLnN0YXR1cyA9IFtuZXcgUG9saWN5VHJlZU5vZGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnQXBwcm92ZWQnXHJcbiAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5kTm9kZS5pc1BvbGljeU5vZGVEaXNhYmxlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgQUxMIGNoaWxkcmVuIGxlYXZlcyBhcmUgUmVtZWRpYXRlZCBsaW5lIGl0ZW0gZGVjaXNpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuZE5vZGUgPVxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBhbmROb2RlLmNoaWxkcmVuWzBdLnN0YXR1cyA9IFtuZXcgUG9saWN5VHJlZU5vZGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnUmVtZWRpYXRlZCdcclxuICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIGFuZE5vZGUuY2hpbGRyZW5bMV0uc3RhdHVzID0gW25ldyBQb2xpY3lUcmVlTm9kZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdSZW1lZGlhdGVkJ1xyXG4gICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZE5vZGUuaXNQb2xpY3lOb2RlRGlzYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBBTlkgY2hpbGQgZG9lcyBub3QgaGF2ZSBkZWNpc2lvbiB3aGVuIGFsbCBvdGhlciBkZWNpc2lvbnMgYXJlIFJlbWVkaWF0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYW5kTm9kZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZih0cnVlLCBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGFuZE5vZGUuY2hpbGRyZW5bMV0uc3RhdHVzID0gW25ldyBQb2xpY3lUcmVlTm9kZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdSZW1lZGlhdGVkJ1xyXG4gICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZE5vZGUuaXNQb2xpY3lOb2RlRGlzYWJsZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBvbiBtdWx0aSBsZXZlbCBpZiBhbGwgaW1tZWRpYXRlIGNoaWxkcmVuIGFyZSBkaXNhYmxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmROb2RlID1cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLCBjcmVhdGVMZWFmKGZhbHNlKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYoZmFsc2UsIGZhbHNlLCBjcmVhdGVMZWFmKGZhbHNlKSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYW5kTm9kZS5jaGlsZHJlblswXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYW5kTm9kZS5jaGlsZHJlblsxXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZE5vZGUuaXNQb2xpY3lOb2RlRGlzYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBvbiBtdWx0aSBsZXZlbCBpZiBhbnkgaW1tZWRpYXRlIGNoaWxkcmVuIGlzIG5vdCBkaXNhYmxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmROb2RlID1cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLCBjcmVhdGVMZWFmKGZhbHNlKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYoZmFsc2UsIGZhbHNlLCBjcmVhdGVMZWFmKGZhbHNlKSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYW5kTm9kZS5jaGlsZHJlblswXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgc3B5T24oYW5kTm9kZS5jaGlsZHJlblsxXSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChhbmROb2RlLmlzUG9saWN5Tm9kZURpc2FibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2xlYWYnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgbGluZSBpdGVtIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlYWYgPSBjcmVhdGVMZWFmKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKGxlYWYsICdoYXNMaW5lSXRlbURlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGxlYWYuaXNQb2xpY3lOb2RlRGlzYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzRGV0YWlscygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgaGFzIGRlc2NyaXB0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUoZ2V0TGVhZkRhdGEoKSk7XHJcbiAgICAgICAgICAgIHNweU9uKG5vZGUsICdoYXNMaW5lSXRlbURlY2lzaW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9ICdzb21ldGhpbmcnO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNEZXRhaWxzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgaGFzIGxpbmUgaXRlbSBkZXNjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZShnZXRMZWFmRGF0YSgpKTtcclxuICAgICAgICAgICAgc3B5T24obm9kZSwgJ2hhc0xpbmVJdGVtRGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNEZXRhaWxzKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIGRlc2NyaXB0aW9uIG9yIGxpbmUgaXRlbSBkZWNpc2lvbicsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xyXG4gICAgICAgICAgICBzcHlPbihub2RlLCAnaGFzTGluZUl0ZW1EZWNpc2lvbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5oYXNEZXRhaWxzKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
