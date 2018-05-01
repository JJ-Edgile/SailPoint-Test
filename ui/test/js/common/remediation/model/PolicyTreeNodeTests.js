System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('PolicyTreeNode', function () {

                var PolicyTreeNode = undefined,
                    data = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function (_PolicyTreeNode_, remediationTestData) {
                    PolicyTreeNode = _PolicyTreeNode_;
                    data = remediationTestData.POLICY_TREE_NODE;
                }));

                describe('constructor', function () {
                    it('throws with no data', function () {
                        expect(function () {
                            return new PolicyTreeNode(null);
                        }).toThrow();
                    });

                    function checkLeaf(actual, expected) {
                        expect(actual instanceof PolicyTreeNode).toBe(true);
                        expect(actual.application).toEqual(expected.application);
                        expect(actual.applicationId).toEqual(expected.applicationId);
                        expect(actual.name).toEqual(expected.name);
                        expect(actual.value).toEqual(expected.value);
                        expect(actual.displayValue).toEqual(expected.displayValue);
                        expect(actual.description).toEqual(expected.description);
                        expect(actual.permission).toEqual(expected.permission);
                        expect(actual.selected).toEqual(expected.selected);
                        expect(actual.children).toBeUndefined();
                    }

                    it('sets values', function () {
                        var node = new PolicyTreeNode(data);

                        expect(node.operator).toEqual(data.operator);
                        expect(node.children.length).toEqual(2);
                        checkLeaf(node.children[0], data.children[0]);
                        checkLeaf(node.children[1], data.children[1]);
                    });
                });

                function getLeafData() {
                    return angular.copy(data.children[0]);
                }

                describe('getDisplayableValue()', function () {
                    it('returns display value if available', function () {
                        var leafData = getLeafData();
                        var node = new PolicyTreeNode(leafData);
                        expect(node.getDisplayableValue()).toEqual(leafData.displayValue);
                    });

                    it('returns value when display value is not available', function () {
                        var leafData = getLeafData();
                        leafData.displayValue = undefined;
                        var node = new PolicyTreeNode(leafData);
                        expect(node.getDisplayableValue()).toEqual(leafData.value);
                    });
                });

                describe('isLeaf()', function () {
                    it('returns false for a non-leaf', function () {
                        var node = new PolicyTreeNode(data);
                        expect(node.isLeaf()).toEqual(false);
                    });

                    it('returns true for a leaf', function () {
                        var node = new PolicyTreeNode(getLeafData());
                        expect(node.isLeaf()).toEqual(true);
                    });
                });

                function createAndNode() {
                    var andData = angular.copy(data);
                    andData.operator = PolicyTreeNode.Operator.AND;
                    return new PolicyTreeNode(andData);
                }

                describe('isAnd()', function () {
                    it('returns true for an AND node', function () {
                        var node = createAndNode();
                        expect(node.isAnd()).toEqual(true);
                    });

                    it('returns false for an OR node', function () {
                        var node = new PolicyTreeNode(data);
                        expect(node.isAnd()).toEqual(false);
                    });

                    it('returns false for a leaf node', function () {
                        var node = new PolicyTreeNode(getLeafData());
                        expect(node.isAnd()).toEqual(false);
                    });
                });

                describe('isOr()', function () {
                    it('returns false for an AND node', function () {
                        var node = createAndNode();
                        expect(node.isOr()).toEqual(false);
                    });

                    it('returns true for an OR node', function () {
                        var node = new PolicyTreeNode(data);
                        expect(node.isOr()).toEqual(true);
                    });

                    it('returns false for a leaf node', function () {
                        var node = new PolicyTreeNode(getLeafData());
                        expect(node.isOr()).toEqual(false);
                    });
                });

                function createLeaf(selected) {
                    return new PolicyTreeNode({
                        selected: selected
                    });
                }

                function createNonLeaf(isAnd, selected) {
                    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        children[_key - 2] = arguments[_key];
                    }

                    return new PolicyTreeNode({
                        operator: isAnd ? PolicyTreeNode.Operator.AND : PolicyTreeNode.Operator.OR,
                        selected: selected,
                        children: children
                    });
                }

                describe('isResolved()', function () {
                    it('returns true for a selected leaf', function () {
                        var leaf = createLeaf(true);
                        expect(leaf.isResolved()).toEqual(true);
                    });

                    it('returns false for an un-selected leaf', function () {
                        var leaf = createLeaf(false);
                        expect(leaf.isResolved()).toEqual(false);
                    });

                    it('returns true for an AND with all children selected', function () {
                        var node = createNonLeaf(true, true, createLeaf(true), createLeaf(true));
                        expect(node.isResolved()).toEqual(true);
                    });

                    it('returns false for an AND with one child not selected', function () {
                        var node = createNonLeaf(true, true, createLeaf(true), createLeaf(false));
                        expect(node.isResolved()).toEqual(false);
                    });

                    it('returns true for an OR with one child selected', function () {
                        var node = createNonLeaf(false, false, createLeaf(true), createLeaf(false));
                        expect(node.isResolved()).toEqual(true);
                    });

                    it('returns false for an OR with no children selected', function () {
                        var node = createNonLeaf(false, false, createLeaf(false), createLeaf(false));
                        expect(node.isResolved()).toEqual(false);
                    });

                    it('returns appropriate values for a multi-level violation', function () {
                        // AND
                        //   OR
                        //     selected, unselected
                        //   AND
                        //     selected, selected
                        var node = createNonLeaf(true, false, createNonLeaf(false, false, createLeaf(true), createLeaf(false)), createNonLeaf(true, false, createLeaf(true), createLeaf(true)));
                        expect(node.isResolved()).toEqual(true);

                        // AND
                        //   OR
                        //     selected, unselected
                        //   AND
                        //     selected
                        //     OR
                        //       selected, unselected
                        node = createNonLeaf(true, false, createNonLeaf(false, false, createLeaf(true), createLeaf(false)), createNonLeaf(true, false, createLeaf(true), createNonLeaf(false, false, createLeaf(true), createLeaf(false))));
                        expect(node.isResolved()).toEqual(true);

                        // OR
                        //   AND
                        //     selected
                        //     OR
                        //       unselected, unselected
                        //   AND
                        //     selected
                        //     AND
                        //       selected, unselected
                        node = createNonLeaf(false, false, createNonLeaf(true, false, createLeaf(true), createNonLeaf(false, false, createLeaf(false), createLeaf(false))), createNonLeaf(true, false, createLeaf(true), createNonLeaf(true, false, createLeaf(true), createLeaf(false))));
                        expect(node.isResolved()).toEqual(false);
                    });
                });

                describe('getSelectedNodes()', function () {
                    it('returns an empty array when a leaf is not selected', function () {
                        var leaf = createLeaf(false);
                        expect(leaf.getSelectedNodes().length).toEqual(0);
                    });

                    it('returns a leaf when it is selected', function () {
                        var leaf = createLeaf(true);
                        expect(leaf.getSelectedNodes()).toContain(leaf);
                    });

                    it('returns all selected nodes in a tree', function () {
                        var selected1 = createLeaf(true),
                            selected2 = createLeaf(true),
                            selected3 = createLeaf(false);

                        var node = createNonLeaf(true, false, selected1, createNonLeaf(false, false, createLeaf(), selected2, createNonLeaf(true, false, createLeaf(), createLeaf(), selected3)));
                        var selectedNodes = node.getSelectedNodes();
                        expect(selectedNodes.length).toEqual(2);
                        expect(selectedNodes).toContain(selected1);
                        expect(selectedNodes).toContain(selected2);
                        expect(selectedNodes).not.toContain(selected3);
                    });
                });

                describe('hasDetails()', function () {
                    it('returns false if node has no description', function () {
                        var node = createLeaf(false);
                        node.description = 'something';
                        expect(node.hasDetails()).toEqual(true);
                    });

                    it('returns true if node has a desciption', function () {
                        var node = createLeaf(false);
                        delete node.description;
                        expect(node.hasDetails()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9Qb2xpY3lUcmVlTm9kZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsMkJBQTJCLFVBQVUsU0FBUzs7O0lBRzlIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsa0JBQWtCLFlBQU07O2dCQUU3QixJQUFJLGlCQUFjO29CQUFFLE9BQUk7O2dCQUV4QixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxrQkFBa0IscUJBQXdCO29CQUN6RCxpQkFBaUI7b0JBQ2pCLE9BQU8sb0JBQW9COzs7Z0JBRy9CLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHVCQUF1QixZQUFNO3dCQUM1QixPQUFPLFlBQUE7NEJBUVMsT0FSSCxJQUFJLGVBQWU7MkJBQU87OztvQkFHM0MsU0FBUyxVQUFVLFFBQVEsVUFBVTt3QkFDakMsT0FBTyxrQkFBa0IsZ0JBQWdCLEtBQUs7d0JBQzlDLE9BQU8sT0FBTyxhQUFhLFFBQVEsU0FBUzt3QkFDNUMsT0FBTyxPQUFPLGVBQWUsUUFBUSxTQUFTO3dCQUM5QyxPQUFPLE9BQU8sTUFBTSxRQUFRLFNBQVM7d0JBQ3JDLE9BQU8sT0FBTyxPQUFPLFFBQVEsU0FBUzt3QkFDdEMsT0FBTyxPQUFPLGNBQWMsUUFBUSxTQUFTO3dCQUM3QyxPQUFPLE9BQU8sYUFBYSxRQUFRLFNBQVM7d0JBQzVDLE9BQU8sT0FBTyxZQUFZLFFBQVEsU0FBUzt3QkFDM0MsT0FBTyxPQUFPLFVBQVUsUUFBUSxTQUFTO3dCQUN6QyxPQUFPLE9BQU8sVUFBVTs7O29CQUc1QixHQUFHLGVBQWUsWUFBTTt3QkFDcEIsSUFBSSxPQUFPLElBQUksZUFBZTs7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O29CQUduRCxHQUFHLHNDQUFzQyxZQUFNO3dCQUMzQyxJQUFJLE9BQU8sV0FBVzt3QkFDdEIsT0FBTyxLQUFLLG9CQUFvQixVQUFVOzs7b0JBRzlDLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLElBQUksWUFBWSxXQUFXOzRCQUN2QixZQUFZLFdBQVc7NEJBQ3ZCLFlBQVksV0FBVzs7d0JBRTNCLElBQUksT0FDQSxjQUFjLE1BQU0sT0FDaEIsV0FDQSxjQUFjLE9BQU8sT0FDakIsY0FDQSxXQUNBLGNBQWMsTUFBTSxPQUNoQixjQUNBLGNBQ0E7d0JBQ2hCLElBQUksZ0JBQWdCLEtBQUs7d0JBQ3pCLE9BQU8sY0FBYyxRQUFRLFFBQVE7d0JBQ3JDLE9BQU8sZUFBZSxVQUFVO3dCQUNoQyxPQUFPLGVBQWUsVUFBVTt3QkFDaEMsT0FBTyxlQUFlLElBQUksVUFBVTs7OztnQkFJNUMsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsSUFBSSxPQUFPLFdBQVc7d0JBQ3RCLEtBQUssY0FBYzt3QkFDbkIsT0FBTyxLQUFLLGNBQWMsUUFBUTs7O29CQUd0QyxHQUFHLHlDQUF5QyxZQUFNO3dCQUM5QyxJQUFJLE9BQU8sV0FBVzt3QkFDdEIsT0FBTyxLQUFLO3dCQUNaLE9BQU8sS0FBSyxjQUFjLFFBQVE7Ozs7OztHQWpCM0MiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL21vZGVsL1BvbGljeVRyZWVOb2RlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcmVtZWRpYXRpb25Nb2R1bGUgZnJvbSAnY29tbW9uL3JlbWVkaWF0aW9uL1JlbWVkaWF0aW9uTW9kdWxlJztcbmltcG9ydCAnLi4vUmVtZWRpYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdQb2xpY3lUcmVlTm9kZScsICgpID0+IHtcblxuICAgIGxldCBQb2xpY3lUcmVlTm9kZSwgZGF0YTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1BvbGljeVRyZWVOb2RlXywgcmVtZWRpYXRpb25UZXN0RGF0YSkgPT4ge1xuICAgICAgICBQb2xpY3lUcmVlTm9kZSA9IF9Qb2xpY3lUcmVlTm9kZV87XG4gICAgICAgIGRhdGEgPSByZW1lZGlhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX05PREU7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBuZXcgUG9saWN5VHJlZU5vZGUobnVsbCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMZWFmKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWwgaW5zdGFuY2VvZiBQb2xpY3lUcmVlTm9kZSkudG9CZSh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWwuYXBwbGljYXRpb24pLnRvRXF1YWwoZXhwZWN0ZWQuYXBwbGljYXRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5hcHBsaWNhdGlvbklkKS50b0VxdWFsKGV4cGVjdGVkLmFwcGxpY2F0aW9uSWQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5uYW1lKS50b0VxdWFsKGV4cGVjdGVkLm5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC52YWx1ZSkudG9FcXVhbChleHBlY3RlZC52YWx1ZSk7XG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLmRpc3BsYXlWYWx1ZSkudG9FcXVhbChleHBlY3RlZC5kaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbC5kZXNjcmlwdGlvbikudG9FcXVhbChleHBlY3RlZC5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLnBlcm1pc3Npb24pLnRvRXF1YWwoZXhwZWN0ZWQucGVybWlzc2lvbik7XG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsLnNlbGVjdGVkKS50b0VxdWFsKGV4cGVjdGVkLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWwuY2hpbGRyZW4pLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzZXRzIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IFBvbGljeVRyZWVOb2RlKGRhdGEpO1xuXG4gICAgICAgICAgICBleHBlY3Qobm9kZS5vcGVyYXRvcikudG9FcXVhbChkYXRhLm9wZXJhdG9yKTtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGNoZWNrTGVhZihub2RlLmNoaWxkcmVuWzBdLCBkYXRhLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgIGNoZWNrTGVhZihub2RlLmNoaWxkcmVuWzFdLCBkYXRhLmNoaWxkcmVuWzFdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRMZWFmRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShkYXRhLmNoaWxkcmVuWzBdKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0RGlzcGxheWFibGVWYWx1ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBkaXNwbGF5IHZhbHVlIGlmIGF2YWlsYWJsZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsZWFmRGF0YSA9IGdldExlYWZEYXRhKCk7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBQb2xpY3lUcmVlTm9kZShsZWFmRGF0YSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5nZXREaXNwbGF5YWJsZVZhbHVlKCkpLnRvRXF1YWwobGVhZkRhdGEuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdmFsdWUgd2hlbiBkaXNwbGF5IHZhbHVlIGlzIG5vdCBhdmFpbGFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGVhZkRhdGEgPSBnZXRMZWFmRGF0YSgpO1xuICAgICAgICAgICAgbGVhZkRhdGEuZGlzcGxheVZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgUG9saWN5VHJlZU5vZGUobGVhZkRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuZ2V0RGlzcGxheWFibGVWYWx1ZSgpKS50b0VxdWFsKGxlYWZEYXRhLnZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNMZWFmKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIG5vbi1sZWFmJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgUG9saWN5VHJlZU5vZGUoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc0xlYWYoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGEgbGVhZicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IFBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNMZWFmKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQW5kTm9kZSgpIHtcbiAgICAgICAgbGV0IGFuZERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XG4gICAgICAgIGFuZERhdGEub3BlcmF0b3IgPSBQb2xpY3lUcmVlTm9kZS5PcGVyYXRvci5BTkQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9saWN5VHJlZU5vZGUoYW5kRGF0YSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2lzQW5kKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIEFORCBub2RlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjcmVhdGVBbmROb2RlKCk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc0FuZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYW4gT1Igbm9kZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IFBvbGljeVRyZWVOb2RlKGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNBbmQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIGxlYWYgbm9kZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IFBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNBbmQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzT3IoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGFuIEFORCBub2RlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjcmVhdGVBbmROb2RlKCk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc09yKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhbiBPUiBub2RlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgUG9saWN5VHJlZU5vZGUoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc09yKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIGxlYWYgbm9kZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IFBvbGljeVRyZWVOb2RlKGdldExlYWZEYXRhKCkpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNPcigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMZWFmKHNlbGVjdGVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9saWN5VHJlZU5vZGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vbkxlYWYoaXNBbmQsIHNlbGVjdGVkLCAuLi5jaGlsZHJlbikge1xuICAgICAgICByZXR1cm4gbmV3IFBvbGljeVRyZWVOb2RlKHtcbiAgICAgICAgICAgIG9wZXJhdG9yOiAoaXNBbmQpID8gUG9saWN5VHJlZU5vZGUuT3BlcmF0b3IuQU5EIDogUG9saWN5VHJlZU5vZGUuT3BlcmF0b3IuT1IsXG4gICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2lzUmVzb2x2ZWQoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYSBzZWxlY3RlZCBsZWFmJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxlYWYgPSBjcmVhdGVMZWFmKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGxlYWYuaXNSZXNvbHZlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYW4gdW4tc2VsZWN0ZWQgbGVhZicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsZWFmID0gY3JlYXRlTGVhZihmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QobGVhZi5pc1Jlc29sdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGZvciBhbiBBTkQgd2l0aCBhbGwgY2hpbGRyZW4gc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNyZWF0ZU5vbkxlYWYodHJ1ZSwgdHJ1ZSwgY3JlYXRlTGVhZih0cnVlKSwgY3JlYXRlTGVhZih0cnVlKSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc1Jlc29sdmVkKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhbiBBTkQgd2l0aCBvbmUgY2hpbGQgbm90IHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjcmVhdGVOb25MZWFmKHRydWUsIHRydWUsIGNyZWF0ZUxlYWYodHJ1ZSksIGNyZWF0ZUxlYWYoZmFsc2UpKTtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmlzUmVzb2x2ZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFuIE9SIHdpdGggb25lIGNoaWxkIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjcmVhdGVOb25MZWFmKGZhbHNlLCBmYWxzZSwgY3JlYXRlTGVhZih0cnVlKSwgY3JlYXRlTGVhZihmYWxzZSkpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNSZXNvbHZlZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYW4gT1Igd2l0aCBubyBjaGlsZHJlbiBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsIGNyZWF0ZUxlYWYoZmFsc2UpLCBjcmVhdGVMZWFmKGZhbHNlKSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc1Jlc29sdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhcHByb3ByaWF0ZSB2YWx1ZXMgZm9yIGEgbXVsdGktbGV2ZWwgdmlvbGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQU5EXG4gICAgICAgICAgICAvLyAgIE9SXG4gICAgICAgICAgICAvLyAgICAgc2VsZWN0ZWQsIHVuc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vICAgQU5EXG4gICAgICAgICAgICAvLyAgICAgc2VsZWN0ZWQsIHNlbGVjdGVkXG4gICAgICAgICAgICBsZXQgbm9kZSA9XG4gICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZih0cnVlLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSkpLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZih0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYodHJ1ZSkpKTtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmlzUmVzb2x2ZWQoKSkudG9FcXVhbCh0cnVlKTtcblxuICAgICAgICAgICAgLy8gQU5EXG4gICAgICAgICAgICAvLyAgIE9SXG4gICAgICAgICAgICAvLyAgICAgc2VsZWN0ZWQsIHVuc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vICAgQU5EXG4gICAgICAgICAgICAvLyAgICAgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vICAgICBPUlxuICAgICAgICAgICAgLy8gICAgICAgc2VsZWN0ZWQsIHVuc2VsZWN0ZWRcbiAgICAgICAgICAgIG5vZGUgPVxuICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYoZmFsc2UsIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZih0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZih0cnVlLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKGZhbHNlLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoZmFsc2UpKSkpO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaXNSZXNvbHZlZCgpKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBPUlxuICAgICAgICAgICAgLy8gICBBTkRcbiAgICAgICAgICAgIC8vICAgICBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gICAgIE9SXG4gICAgICAgICAgICAvLyAgICAgICB1bnNlbGVjdGVkLCB1bnNlbGVjdGVkXG4gICAgICAgICAgICAvLyAgIEFORFxuICAgICAgICAgICAgLy8gICAgIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyAgICAgQU5EXG4gICAgICAgICAgICAvLyAgICAgICBzZWxlY3RlZCwgdW5zZWxlY3RlZFxuICAgICAgICAgICAgbm9kZSA9XG4gICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKHRydWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZih0cnVlLCBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTGVhZihmYWxzZSkpKSk7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS5pc1Jlc29sdmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRTZWxlY3RlZE5vZGVzKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IHdoZW4gYSBsZWFmIGlzIG5vdCBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsZWFmID0gY3JlYXRlTGVhZihmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QobGVhZi5nZXRTZWxlY3RlZE5vZGVzKCkubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhIGxlYWYgd2hlbiBpdCBpcyBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsZWFmID0gY3JlYXRlTGVhZih0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChsZWFmLmdldFNlbGVjdGVkTm9kZXMoKSkudG9Db250YWluKGxlYWYpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBhbGwgc2VsZWN0ZWQgbm9kZXMgaW4gYSB0cmVlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkMSA9IGNyZWF0ZUxlYWYodHJ1ZSksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQyID0gY3JlYXRlTGVhZih0cnVlKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDMgPSBjcmVhdGVMZWFmKGZhbHNlKTtcblxuICAgICAgICAgICAgbGV0IG5vZGUgPVxuICAgICAgICAgICAgICAgIGNyZWF0ZU5vbkxlYWYodHJ1ZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkMSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTm9uTGVhZihmYWxzZSwgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVOb25MZWFmKHRydWUsIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUxlYWYoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVMZWFmKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQzKSkpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZXMgPSBub2RlLmdldFNlbGVjdGVkTm9kZXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzKS50b0NvbnRhaW4oc2VsZWN0ZWQxKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzKS50b0NvbnRhaW4oc2VsZWN0ZWQyKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RlZE5vZGVzKS5ub3QudG9Db250YWluKHNlbGVjdGVkMyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0RldGFpbHMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm9kZSBoYXMgbm8gZGVzY3JpcHRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNyZWF0ZUxlYWYoZmFsc2UpO1xuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9ICdzb21ldGhpbmcnO1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUuaGFzRGV0YWlscygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5vZGUgaGFzIGEgZGVzY2lwdGlvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY3JlYXRlTGVhZihmYWxzZSk7XG4gICAgICAgICAgICBkZWxldGUgbm9kZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLmhhc0RldGFpbHMoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
