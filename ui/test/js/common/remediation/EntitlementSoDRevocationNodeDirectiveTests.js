System.register(['common/remediation/RemediationModule', 'test/js/TestInitializer', './RemediationTestData'], function (_export) {
    'use strict';

    var remediationModule;
    return {
        setters: [function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_testJsTestInitializer) {}, function (_RemediationTestData) {}],
        execute: function () {

            describe('EntitlementSoDRevocationNodeDirective', function () {

                var elementDefinition = '<sp-entitlement-sod-revocation-node policy-tree="policyTree"\n                in-and-node="inAndNode"\n                parent-selected="parentSelected"\n                root="root" />',
                    PolicyTreeNode = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    remediationTestData = undefined,
                    policyTree = undefined,
                    inAndNode = undefined,
                    parentSelected = undefined,
                    isRoot = undefined,
                    readOnly = undefined;

                beforeEach(module(remediationModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$controller_, _PolicyTreeNode_, _remediationTestData_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    remediationTestData = _remediationTestData_;
                    PolicyTreeNode = _PolicyTreeNode_;

                    policyTree = new PolicyTreeNode(remediationTestData.POLICY_TREE_NODE);
                    inAndNode = false;
                    parentSelected = false;
                    isRoot = true;
                    readOnly = false;
                }));

                function useLeaf() {
                    policyTree = policyTree.children[0];
                }

                describe('controller', function () {
                    function createController() {
                        var ctrl = $controller('EntitlementSoDRevocationNodeDirectiveCtrl', null, {
                            policyTree: policyTree,
                            inAndNode: inAndNode,
                            parentSelected: parentSelected,
                            root: isRoot,
                            readOnly: readOnly
                        });
                        ctrl.$onInit();
                        return ctrl;
                    }

                    it('throws without a policy tree', function () {
                        policyTree = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });

                    describe('isSubtreeDecisionRequired()', function () {
                        beforeEach(function () {
                            // Setup the policy tree to be such that it requires a subtree decision.
                            inAndNode = true;
                            parentSelected = true;
                        });

                        it('returns false when not an OR node', function () {
                            policyTree.operator = PolicyTreeNode.Operator.AND;
                            var ctrl = createController();
                            expect(ctrl.isSubtreeDecisionRequired()).toEqual(false);
                        });

                        it('returns false when not inside of a AND node', function () {
                            inAndNode = false;
                            var ctrl = createController();
                            expect(ctrl.isSubtreeDecisionRequired()).toEqual(false);
                        });

                        it('returns false when parent AND node is not selected', function () {
                            parentSelected = false;
                            var ctrl = createController();
                            expect(ctrl.isSubtreeDecisionRequired()).toEqual(false);
                        });

                        it('returns false when parent AND node is selected and a child is selected', function () {
                            policyTree.children[0].selected = true;
                            var ctrl = createController();
                            expect(ctrl.isSubtreeDecisionRequired()).toEqual(false);
                        });

                        it('returns true when parent AND node is selected and no children are selectced', function () {
                            policyTree.children[0].selected = false;
                            var ctrl = createController();
                            expect(ctrl.isSubtreeDecisionRequired()).toEqual(true);
                        });
                    });

                    describe('isNodeSelected()', function () {
                        it('returns true if selected is true', function () {
                            useLeaf();
                            var ctrl = createController();
                            expect(ctrl.isNodeSelected()).toEqual(true);
                        });

                        it('returns false if selected is false', function () {
                            policyTree = policyTree.children[1];
                            var ctrl = createController();
                            expect(ctrl.isNodeSelected()).toEqual(false);
                        });
                    });

                    describe('selectNode()', function () {
                        it('selects the node', function () {
                            policyTree = policyTree.children[1];
                            var ctrl = createController();
                            ctrl.selectNode();
                            expect(policyTree.selected).toEqual(true);
                        });

                        it('selects all children of an AND node', function () {
                            policyTree.operator = PolicyTreeNode.Operator.AND;
                            var ctrl = createController();
                            ctrl.selectNode();
                            expect(policyTree.selected).toEqual(true);
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = policyTree.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var child = _step.value;

                                    expect(child.selected).toEqual(true);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator['return']) {
                                        _iterator['return']();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        });

                        it('does not select children of an OR node', function () {
                            policyTree.children[0].selected = false;
                            var ctrl = createController();
                            ctrl.selectNode();
                            expect(policyTree.selected).toEqual(true);
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = policyTree.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var child = _step2.value;

                                    expect(child.selected).toEqual(false);
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                        _iterator2['return']();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        });
                    });

                    describe('deselectNode()', function () {
                        it('deselects the node', function () {
                            useLeaf();
                            var ctrl = createController();
                            ctrl.deselectNode();
                            expect(policyTree.selected).toEqual(false);
                        });

                        it('deselects all children of an AND node', function () {
                            policyTree.operator = PolicyTreeNode.Operator.AND;
                            var ctrl = createController();
                            ctrl.deselectNode();
                            expect(policyTree.selected).toEqual(false);
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = policyTree.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var child = _step3.value;

                                    expect(child.selected).toEqual(false);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                        _iterator3['return']();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        });

                        it('does not deselect children of an OR node', function () {
                            var ctrl = createController();
                            ctrl.deselectNode();
                            expect(policyTree.selected).toEqual(false);
                            expect(policyTree.children[0].selected).toEqual(true);
                            expect(policyTree.children[1].selected).toEqual(false);
                        });
                    });

                    describe('isDisabled()', function () {
                        function testDisabled(expectDisabled) {
                            var ctrl = createController();
                            $scope.$apply();
                            expect(ctrl.isDisabled()).toEqual(expectDisabled);
                        }

                        it('returns true node is disabled', function () {
                            policyTree = new PolicyTreeNode(remediationTestData.POLICY_TREE_AND_NODE);
                            spyOn(policyTree, 'isPolicyNodeDisabled').and.returnValue(true);
                            testDisabled(true);
                        });

                        it('returns true if readOnly is true', function () {
                            readOnly = true;
                            testDisabled(true);
                        });

                        it('returns false if node is not disabled', function () {
                            policyTree = new PolicyTreeNode(remediationTestData.POLICY_TREE_NODE);
                            spyOn(policyTree, 'isPolicyNodeDisabled').and.returnValue(false);
                            testDisabled(false);
                        });
                    });
                });

                describe('html', function () {
                    function createElement() {
                        var element = angular.element(elementDefinition);
                        $scope.policyTree = policyTree;
                        $scope.inAndNode = inAndNode;
                        $scope.parentSelected = parentSelected;
                        $scope.root = isRoot;
                        $compile(element)($scope);
                        $scope.$apply();
                        return element;
                    }

                    it('throws without a policy tree', function () {
                        policyTree = null;
                        expect(function () {
                            return createElement();
                        }).toThrow();
                    });

                    function getButton(element, isAndNode) {
                        var parentClass = isAndNode ? '.policy-and-button' : '.header-cell';
                        return element.find(parentClass + ' button');
                    }

                    function isButtonSelected(element, isAndNode) {
                        var button = getButton(element, isAndNode);
                        return button.attr('aria-checked') === 'true';
                    }

                    describe('leaf node', function () {
                        beforeEach(function () {
                            useLeaf();
                        });

                        describe('button', function () {
                            function hasButton(element) {
                                return getButton(element).length === 1;
                            }

                            function isButtonDisabled(element) {
                                var button = getButton(element);
                                return button.hasClass('disabled');
                            }

                            it('is displayed if in not in an AND node', function () {
                                var element = createElement();
                                expect(hasButton(element)).toEqual(true);
                            });

                            it('is not displayed if in an AND node', function () {
                                inAndNode = true;
                                var element = createElement();
                                expect(hasButton(element)).toEqual(false);
                            });

                            it('is selected if node is selected', function () {
                                var element = createElement();
                                expect(isButtonSelected(element)).toEqual(true);
                            });

                            it('is not selected if node is unselected', function () {
                                policyTree.selected = false;
                                var element = createElement();
                                expect(isButtonSelected(element)).toEqual(false);
                            });

                            it('is disabled if the node is disabled', function () {
                                var element = createElement();
                                spyOn($scope.policyTree, 'isPolicyNodeDisabled').and.returnValue(true);
                                $scope.$apply();
                                expect(isButtonDisabled(element)).toEqual(true);
                            });

                            it('is enabled if the node is enabled', function () {
                                var element = createElement();
                                spyOn($scope.policyTree, 'isPolicyNodeDisabled').and.returnValue(false);
                                $scope.$apply();
                                expect(isButtonDisabled(element)).toEqual(false);
                            });

                            describe('click', function () {
                                function testClick(startSelected) {
                                    policyTree.selected = startSelected;
                                    var element = createElement();
                                    expect(isButtonSelected(element)).toEqual(startSelected);

                                    var button = getButton(element);
                                    button.click();
                                    $scope.$digest();

                                    expect(isButtonSelected(element)).toEqual(!startSelected);
                                }

                                it('selects the node', function () {
                                    testClick(false);
                                });

                                it('deselects the node', function () {
                                    testClick(true);
                                });
                            });
                        });

                        describe('details directive', function () {
                            it('is displayed if node has details available', function () {
                                spyOn(policyTree, 'hasDetails').and.returnValue(true);
                                var element = createElement();
                                expect(element.find('div[sp-policy-tree-node-details]').length).toEqual(1);
                            });

                            it('is displayed if node is selected and is disabled', function () {
                                spyOn(policyTree, 'isPolicyNodeSelected').and.returnValue(true);
                                spyOn(policyTree, 'isPolicyNodeDisabled').and.returnValue(true);
                                var element = createElement();
                                expect(element.find('div[sp-policy-tree-node-details]').length).toEqual(1);
                            });

                            it('is not displayed if node has no details available and no node selected', function () {
                                spyOn(policyTree, 'hasDetails').and.returnValue(false);
                                spyOn(policyTree, 'isPolicyNodeSelected').and.returnValue(false);
                                var element = createElement();
                                expect(element.find('div[sp-policy-tree-node-details]').length).toEqual(0);
                            });
                        });

                        it('shows the display value in the header', function () {
                            var element = createElement();
                            var displayValue = element.find('.header-cell-text').text().trim();
                            expect(displayValue).toEqual(policyTree.getDisplayableValue());
                        });

                        it('shows the application and attribute in the footer', function () {
                            var element = createElement();
                            var values = element.find('.panel-footer .attribute-pair').text();
                            expect(values).toMatch(policyTree.application);
                            expect(values).toMatch(policyTree.name);
                        });
                    });

                    describe('or nodes', function () {
                        function hasPanel(element) {
                            // Element is the sp-entitlement-sod-revocation-node, so the guts are in the first child.
                            var realElement = angular.element(element.children()[0]);
                            var panel = realElement.children('div.panel');
                            return panel.length === 1;
                        }

                        it('render a panel around a non-root', function () {
                            isRoot = false;
                            var element = createElement();
                            expect(hasPanel(element)).toEqual(true);
                        });

                        it('do not render a panel around the root', function () {
                            var element = createElement();
                            expect(hasPanel(element)).toEqual(false);
                        });

                        function checkHighlighted(element, expectHighlighted) {
                            var expectedCount = expectHighlighted ? 1 : 0;
                            expect(element.find('.subtree-decision-required').length).toEqual(expectedCount);
                            expect(element.find('.alert-danger').length).toEqual(expectedCount);
                        }

                        function testHighlight(expectHighlight) {
                            isRoot = false;
                            inAndNode = true;
                            parentSelected = true;

                            if (expectHighlight) {
                                policyTree.children[0].selected = false;
                            }

                            var element = createElement();
                            checkHighlighted(element, expectHighlight);
                        }

                        it('are highlighted if a subtree decision is required', function () {
                            testHighlight(true);
                        });

                        it('are not highlighted if a subtree decision is not required', function () {
                            testHighlight(false);
                        });
                    });

                    describe('and nodes', function () {
                        function selectChildren(select) {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = policyTree.children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var child = _step4.value;

                                    child.selected = select;
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                        _iterator4['return']();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                        }

                        beforeEach(function () {
                            policyTree = new PolicyTreeNode(remediationTestData.POLICY_TREE_AND_NODE_NO_LINE_ITEM_DECISIONS);
                        });

                        function testButtonClick(startSelected) {
                            // Start with everything in a clean state.
                            policyTree.selected = startSelected;
                            selectChildren(startSelected);
                            var element = createElement();

                            var button = getButton(element, true);
                            button.click();
                            $scope.$digest();

                            expect(isButtonSelected(element, true)).toEqual(!startSelected);
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = policyTree.children[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var child = _step5.value;

                                    expect(child.selected).toEqual(!startSelected);
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                                        _iterator5['return']();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }
                        }

                        it('clicking button selects all children', function () {
                            testButtonClick(false);
                        });

                        it('clicking button deselects all children', function () {
                            testButtonClick(true);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9FbnRpdGxlbWVudFNvRFJldm9jYXRpb25Ob2RlRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsd0NBQXdDLDJCQUEyQiwwQkFBMEIsVUFBVSxTQUFTO0lBQzdIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUscUNBQXFDO1lBQ3JELG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNCQUFzQjtRQUN6RSxTQUFTLFlBQVk7O1lBSjdCLFNBQVMseUNBQXlDLFlBQVc7O2dCQUV6RCxJQUFJLG9CQUFpQjtvQkFLakIsaUJBQWM7b0JBQUUsU0FBTTtvQkFBRSxXQUFRO29CQUFFLGNBQVc7b0JBQUUsc0JBQW1CO29CQUNsRSxhQUFVO29CQUFFLFlBQVM7b0JBQUUsaUJBQWM7b0JBQUUsU0FBTTtvQkFBRSxXQUFROztnQkFFM0QsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLGVBQWUsa0JBQWtCLHVCQUF1QjtvQkFDdkcsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLGNBQWM7b0JBQ2Qsc0JBQXNCO29CQUN0QixpQkFBaUI7O29CQUVqQixhQUFhLElBQUksZUFBZSxvQkFBb0I7b0JBQ3BELFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixTQUFTO29CQUNULFdBQVc7OztnQkFHZixTQUFTLFVBQVU7b0JBQ2YsYUFBYSxXQUFXLFNBQVM7OztnQkFHckMsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLFNBQVMsbUJBQW1CO3dCQUN4QixJQUFJLE9BQU8sWUFBWSw2Q0FBNkMsTUFBTTs0QkFDdEUsWUFBWTs0QkFDWixXQUFXOzRCQUNYLGdCQUFnQjs0QkFDaEIsTUFBTTs0QkFDTixVQUFVOzt3QkFFZCxLQUFLO3dCQUNMLE9BQU87OztvQkFHWCxHQUFHLGdDQUFnQyxZQUFNO3dCQUNwQyxhQUFh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LDZCQUE2Qjs0QkFDakMsSUFBSSxxQkFBcUI7NEJBQ3pCLElBQUksa0JBQWtCOzs0QkFFdEIsSUFBSTtnQ0F0R2hCLEtBQUEsSUFBQSxhQUFrQixXQUFXLFNBQVEsT0FBQSxhQUFBLFFBQUEsRUFBQSw2QkFBQSxDQUFBLFNBQUEsV0FBQSxRQUFBLE9BQUEsNkJBQUEsTUFBRTtvQ0F3R25CLElBeEdYLFFBQUssT0FBQTs7b0NBQ1YsT0FBTyxNQUFNLFVBQVUsUUFBUSxDQUFDOzs4QkEyR3RCLE9BQU8sS0FBSztnQ0FDVixxQkFBcUI7Z0NBQ3JCLGtCQUFrQjtzQ0FDWjtnQ0FDTixJQUFJO29DQUNBLElBQUksQ0FBQyw4QkFBOEIsV0FBVyxXQUFXO3dDQUNyRCxXQUFXOzswQ0FFVDtvQ0FDTixJQUFJLG9CQUFvQjt3Q0FDcEIsTUFBTTs7Ozs7O3dCQWpIbEMsR0FBRyx3Q0FBd0MsWUFBTTs0QkFDN0MsZ0JBQWdCOzs7d0JBR3BCLEdBQUcsMENBQTBDLFlBQU07NEJBQy9DLGdCQUFnQjs7Ozs7OztHQThIN0IiLCJmaWxlIjoiY29tbW9uL3JlbWVkaWF0aW9uL0VudGl0bGVtZW50U29EUmV2b2NhdGlvbk5vZGVEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0ICcuL1JlbWVkaWF0aW9uVGVzdERhdGEnO1xyXG5cclxuZGVzY3JpYmUoJ0VudGl0bGVtZW50U29EUmV2b2NhdGlvbk5vZGVEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPVxyXG4gICAgICAgICAgICBgPHNwLWVudGl0bGVtZW50LXNvZC1yZXZvY2F0aW9uLW5vZGUgcG9saWN5LXRyZWU9XCJwb2xpY3lUcmVlXCJcclxuICAgICAgICAgICAgICAgIGluLWFuZC1ub2RlPVwiaW5BbmROb2RlXCJcclxuICAgICAgICAgICAgICAgIHBhcmVudC1zZWxlY3RlZD1cInBhcmVudFNlbGVjdGVkXCJcclxuICAgICAgICAgICAgICAgIHJvb3Q9XCJyb290XCIgLz5gLFxyXG4gICAgICAgIFBvbGljeVRyZWVOb2RlLCAkc2NvcGUsICRjb21waWxlLCAkY29udHJvbGxlciwgcmVtZWRpYXRpb25UZXN0RGF0YSxcclxuICAgICAgICBwb2xpY3lUcmVlLCBpbkFuZE5vZGUsIHBhcmVudFNlbGVjdGVkLCBpc1Jvb3QsIHJlYWRPbmx5O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgXyRjb250cm9sbGVyXywgX1BvbGljeVRyZWVOb2RlXywgX3JlbWVkaWF0aW9uVGVzdERhdGFfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICByZW1lZGlhdGlvblRlc3REYXRhID0gX3JlbWVkaWF0aW9uVGVzdERhdGFfO1xyXG4gICAgICAgIFBvbGljeVRyZWVOb2RlID0gX1BvbGljeVRyZWVOb2RlXztcclxuXHJcbiAgICAgICAgcG9saWN5VHJlZSA9IG5ldyBQb2xpY3lUcmVlTm9kZShyZW1lZGlhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX05PREUpO1xyXG4gICAgICAgIGluQW5kTm9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHBhcmVudFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgaXNSb290ID0gdHJ1ZTtcclxuICAgICAgICByZWFkT25seSA9IGZhbHNlO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVzZUxlYWYoKSB7XHJcbiAgICAgICAgcG9saWN5VHJlZSA9IHBvbGljeVRyZWUuY2hpbGRyZW5bMF07XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSAkY29udHJvbGxlcignRW50aXRsZW1lbnRTb0RSZXZvY2F0aW9uTm9kZURpcmVjdGl2ZUN0cmwnLCBudWxsLCB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlOiBwb2xpY3lUcmVlLFxyXG4gICAgICAgICAgICAgICAgaW5BbmROb2RlOiBpbkFuZE5vZGUsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRTZWxlY3RlZDogcGFyZW50U2VsZWN0ZWQsXHJcbiAgICAgICAgICAgICAgICByb290OiBpc1Jvb3QsXHJcbiAgICAgICAgICAgICAgICByZWFkT25seTogcmVhZE9ubHlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3RybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBhIHBvbGljeSB0cmVlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgcG9saWN5VHJlZSA9IG51bGw7XHJcbiAgICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcigpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc1N1YnRyZWVEZWNpc2lvblJlcXVpcmVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgdGhlIHBvbGljeSB0cmVlIHRvIGJlIHN1Y2ggdGhhdCBpdCByZXF1aXJlcyBhIHN1YnRyZWUgZGVjaXNpb24uXHJcbiAgICAgICAgICAgICAgICBpbkFuZE5vZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gbm90IGFuIE9SIG5vZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlLm9wZXJhdG9yID0gUG9saWN5VHJlZU5vZGUuT3BlcmF0b3IuQU5EO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1YnRyZWVEZWNpc2lvblJlcXVpcmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdoZW4gbm90IGluc2lkZSBvZiBhIEFORCBub2RlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5BbmROb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3VidHJlZURlY2lzaW9uUmVxdWlyZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2Ugd2hlbiBwYXJlbnQgQU5EIG5vZGUgaXMgbm90IHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50U2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdWJ0cmVlRGVjaXNpb25SZXF1aXJlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSB3aGVuIHBhcmVudCBBTkQgbm9kZSBpcyBzZWxlY3RlZCBhbmQgYSBjaGlsZCBpcyBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvbGljeVRyZWUuY2hpbGRyZW5bMF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1YnRyZWVEZWNpc2lvblJlcXVpcmVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiBwYXJlbnQgQU5EIG5vZGUgaXMgc2VsZWN0ZWQgYW5kIG5vIGNoaWxkcmVuIGFyZSBzZWxlY3RjZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlLmNoaWxkcmVuWzBdLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU3VidHJlZURlY2lzaW9uUmVxdWlyZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdpc05vZGVTZWxlY3RlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHNlbGVjdGVkIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1c2VMZWFmKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzTm9kZVNlbGVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgc2VsZWN0ZWQgaXMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlID0gcG9saWN5VHJlZS5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNOb2RlU2VsZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnc2VsZWN0Tm9kZSgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnc2VsZWN0cyB0aGUgbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvbGljeVRyZWUgPSBwb2xpY3lUcmVlLmNoaWxkcmVuWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLnNlbGVjdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lUcmVlLnNlbGVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzZWxlY3RzIGFsbCBjaGlsZHJlbiBvZiBhbiBBTkQgbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvbGljeVRyZWUub3BlcmF0b3IgPSBQb2xpY3lUcmVlTm9kZS5PcGVyYXRvci5BTkQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuc2VsZWN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVRyZWUuc2VsZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBwb2xpY3lUcmVlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGNoaWxkLnNlbGVjdGVkKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBzZWxlY3QgY2hpbGRyZW4gb2YgYW4gT1Igbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvbGljeVRyZWUuY2hpbGRyZW5bMF0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5zZWxlY3ROb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocG9saWN5VHJlZS5zZWxlY3RlZCkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHBvbGljeVRyZWUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY2hpbGQuc2VsZWN0ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2Rlc2VsZWN0Tm9kZSgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnZGVzZWxlY3RzIHRoZSBub2RlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXNlTGVhZigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmRlc2VsZWN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVRyZWUuc2VsZWN0ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkZXNlbGVjdHMgYWxsIGNoaWxkcmVuIG9mIGFuIEFORCBub2RlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5VHJlZS5vcGVyYXRvciA9IFBvbGljeVRyZWVOb2RlLk9wZXJhdG9yLkFORDtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgY3RybC5kZXNlbGVjdE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChwb2xpY3lUcmVlLnNlbGVjdGVkKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHBvbGljeVRyZWUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY2hpbGQuc2VsZWN0ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBkZXNlbGVjdCBjaGlsZHJlbiBvZiBhbiBPUiBub2RlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XHJcbiAgICAgICAgICAgICAgICBjdHJsLmRlc2VsZWN0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVRyZWUuc2VsZWN0ZWQpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHBvbGljeVRyZWUuY2hpbGRyZW5bMF0uc2VsZWN0ZWQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocG9saWN5VHJlZS5jaGlsZHJlblsxXS5zZWxlY3RlZCkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaXNEaXNhYmxlZCgpJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiB0ZXN0RGlzYWJsZWQoZXhwZWN0RGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXNhYmxlZCgpKS50b0VxdWFsKGV4cGVjdERpc2FibGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBub2RlIGlzIGRpc2FibGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5VHJlZSA9IG5ldyBQb2xpY3lUcmVlTm9kZShyZW1lZGlhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX0FORF9OT0RFKTtcclxuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVRyZWUsICdpc1BvbGljeU5vZGVEaXNhYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRlc3REaXNhYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHJlYWRPbmx5IGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0ZXN0RGlzYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm9kZSBpcyBub3QgZGlzYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lUcmVlID0gbmV3IFBvbGljeVRyZWVOb2RlKHJlbWVkaWF0aW9uVGVzdERhdGEuUE9MSUNZX1RSRUVfTk9ERSk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lUcmVlLCAnaXNQb2xpY3lOb2RlRGlzYWJsZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGVzdERpc2FibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaHRtbCcsICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgICRzY29wZS5wb2xpY3lUcmVlID0gcG9saWN5VHJlZTtcclxuICAgICAgICAgICAgJHNjb3BlLmluQW5kTm9kZSA9IGluQW5kTm9kZTtcclxuICAgICAgICAgICAgJHNjb3BlLnBhcmVudFNlbGVjdGVkID0gcGFyZW50U2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5yb290ID0gaXNSb290O1xyXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGEgcG9saWN5IHRyZWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvbGljeVRyZWUgPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCgpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEJ1dHRvbihlbGVtZW50LCBpc0FuZE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmVudENsYXNzID0gKGlzQW5kTm9kZSkgPyAnLnBvbGljeS1hbmQtYnV0dG9uJyA6ICcuaGVhZGVyLWNlbGwnO1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKGAke3BhcmVudENsYXNzfSBidXR0b25gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQnV0dG9uU2VsZWN0ZWQoZWxlbWVudCwgaXNBbmROb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBnZXRCdXR0b24oZWxlbWVudCwgaXNBbmROb2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIChidXR0b24uYXR0cignYXJpYS1jaGVja2VkJykgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNjcmliZSgnbGVhZiBub2RlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZUxlYWYoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkZXNjcmliZSgnYnV0dG9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFzQnV0dG9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGdldEJ1dHRvbihlbGVtZW50KS5sZW5ndGggPT09IDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzQnV0dG9uRGlzYWJsZWQoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSBnZXRCdXR0b24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbi5oYXNDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpdCgnaXMgZGlzcGxheWVkIGlmIGluIG5vdCBpbiBhbiBBTkQgbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoaGFzQnV0dG9uKGVsZW1lbnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaXQoJ2lzIG5vdCBkaXNwbGF5ZWQgaWYgaW4gYW4gQU5EIG5vZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5BbmROb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoaGFzQnV0dG9uKGVsZW1lbnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0KCdpcyBzZWxlY3RlZCBpZiBub2RlIGlzIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChpc0J1dHRvblNlbGVjdGVkKGVsZW1lbnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaXQoJ2lzIG5vdCBzZWxlY3RlZCBpZiBub2RlIGlzIHVuc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VHJlZS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChpc0J1dHRvblNlbGVjdGVkKGVsZW1lbnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0KCdpcyBkaXNhYmxlZCBpZiB0aGUgbm9kZSBpcyBkaXNhYmxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzcHlPbigkc2NvcGUucG9saWN5VHJlZSwgJ2lzUG9saWN5Tm9kZURpc2FibGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoaXNCdXR0b25EaXNhYmxlZChlbGVtZW50KSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0KCdpcyBlbmFibGVkIGlmIHRoZSBub2RlIGlzIGVuYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3B5T24oJHNjb3BlLnBvbGljeVRyZWUsICdpc1BvbGljeU5vZGVEaXNhYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChpc0J1dHRvbkRpc2FibGVkKGVsZW1lbnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlc2NyaWJlKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Q2xpY2soc3RhcnRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3lUcmVlLnNlbGVjdGVkID0gc3RhcnRTZWxlY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdChpc0J1dHRvblNlbGVjdGVkKGVsZW1lbnQpKS50b0VxdWFsKHN0YXJ0U2VsZWN0ZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGdldEJ1dHRvbihlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3QoaXNCdXR0b25TZWxlY3RlZChlbGVtZW50KSkudG9FcXVhbCghc3RhcnRTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpdCgnc2VsZWN0cyB0aGUgbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdENsaWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXQoJ2Rlc2VsZWN0cyB0aGUgbm9kZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdENsaWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZGVzY3JpYmUoJ2RldGFpbHMgZGlyZWN0aXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXQoJ2lzIGRpc3BsYXllZCBpZiBub2RlIGhhcyBkZXRhaWxzIGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lUcmVlLCAnaGFzRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdkaXZbc3AtcG9saWN5LXRyZWUtbm9kZS1kZXRhaWxzXScpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0KCdpcyBkaXNwbGF5ZWQgaWYgbm9kZSBpcyBzZWxlY3RlZCBhbmQgaXMgZGlzYWJsZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3B5T24ocG9saWN5VHJlZSwgJ2lzUG9saWN5Tm9kZVNlbGVjdGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVRyZWUsICdpc1BvbGljeU5vZGVEaXNhYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdkaXZbc3AtcG9saWN5LXRyZWUtbm9kZS1kZXRhaWxzXScpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0KCdpcyBub3QgZGlzcGxheWVkIGlmIG5vZGUgaGFzIG5vIGRldGFpbHMgYXZhaWxhYmxlIGFuZCBubyBub2RlIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVRyZWUsICdoYXNEZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lUcmVlLCAnaXNQb2xpY3lOb2RlU2VsZWN0ZWQnKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2RpdltzcC1wb2xpY3ktdHJlZS1ub2RlLWRldGFpbHNdJykubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3Nob3dzIHRoZSBkaXNwbGF5IHZhbHVlIGluIHRoZSBoZWFkZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5VmFsdWUgPSBlbGVtZW50LmZpbmQoJy5oZWFkZXItY2VsbC10ZXh0JykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChkaXNwbGF5VmFsdWUpLnRvRXF1YWwocG9saWN5VHJlZS5nZXREaXNwbGF5YWJsZVZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdzaG93cyB0aGUgYXBwbGljYXRpb24gYW5kIGF0dHJpYnV0ZSBpbiB0aGUgZm9vdGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVzID0gZWxlbWVudC5maW5kKCcucGFuZWwtZm9vdGVyIC5hdHRyaWJ1dGUtcGFpcicpLnRleHQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdCh2YWx1ZXMpLnRvTWF0Y2gocG9saWN5VHJlZS5hcHBsaWNhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QodmFsdWVzKS50b01hdGNoKHBvbGljeVRyZWUubmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnb3Igbm9kZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhc1BhbmVsKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgaXMgdGhlIHNwLWVudGl0bGVtZW50LXNvZC1yZXZvY2F0aW9uLW5vZGUsIHNvIHRoZSBndXRzIGFyZSBpbiB0aGUgZmlyc3QgY2hpbGQuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVhbEVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5jaGlsZHJlbigpWzBdKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYW5lbCA9IHJlYWxFbGVtZW50LmNoaWxkcmVuKCdkaXYucGFuZWwnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocGFuZWwubGVuZ3RoID09PSAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXQoJ3JlbmRlciBhIHBhbmVsIGFyb3VuZCBhIG5vbi1yb290JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXNSb290ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChoYXNQYW5lbChlbGVtZW50KSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnZG8gbm90IHJlbmRlciBhIHBhbmVsIGFyb3VuZCB0aGUgcm9vdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGhhc1BhbmVsKGVsZW1lbnQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0hpZ2hsaWdodGVkKGVsZW1lbnQsIGV4cGVjdEhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwZWN0ZWRDb3VudCA9IChleHBlY3RIaWdobGlnaHRlZCkgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5zdWJ0cmVlLWRlY2lzaW9uLXJlcXVpcmVkJykubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmFsZXJ0LWRhbmdlcicpLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEhpZ2hsaWdodChleHBlY3RIaWdobGlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGlzUm9vdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5BbmROb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBhcmVudFNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXhwZWN0SGlnaGxpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5VHJlZS5jaGlsZHJlblswXS5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tIaWdobGlnaHRlZChlbGVtZW50LCBleHBlY3RIaWdobGlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdCgnYXJlIGhpZ2hsaWdodGVkIGlmIGEgc3VidHJlZSBkZWNpc2lvbiBpcyByZXF1aXJlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3RIaWdobGlnaHQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FyZSBub3QgaGlnaGxpZ2h0ZWQgaWYgYSBzdWJ0cmVlIGRlY2lzaW9uIGlzIG5vdCByZXF1aXJlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRlc3RIaWdobGlnaHQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ2FuZCBub2RlcycsICgpID0+IHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q2hpbGRyZW4oc2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBwb2xpY3lUcmVlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2VsZWN0ZWQgPSBzZWxlY3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5VHJlZSA9IG5ldyBQb2xpY3lUcmVlTm9kZShyZW1lZGlhdGlvblRlc3REYXRhLlBPTElDWV9UUkVFX0FORF9OT0RFX05PX0xJTkVfSVRFTV9ERUNJU0lPTlMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RCdXR0b25DbGljayhzdGFydFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdGFydCB3aXRoIGV2ZXJ5dGhpbmcgaW4gYSBjbGVhbiBzdGF0ZS5cclxuICAgICAgICAgICAgICAgIHBvbGljeVRyZWUuc2VsZWN0ZWQgPSBzdGFydFNlbGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0Q2hpbGRyZW4oc3RhcnRTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZ2V0QnV0dG9uKGVsZW1lbnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGV4cGVjdChpc0J1dHRvblNlbGVjdGVkKGVsZW1lbnQsIHRydWUpKS50b0VxdWFsKCFzdGFydFNlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHBvbGljeVRyZWUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoY2hpbGQuc2VsZWN0ZWQpLnRvRXF1YWwoIXN0YXJ0U2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpdCgnY2xpY2tpbmcgYnV0dG9uIHNlbGVjdHMgYWxsIGNoaWxkcmVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGVzdEJ1dHRvbkNsaWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnY2xpY2tpbmcgYnV0dG9uIGRlc2VsZWN0cyBhbGwgY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0QnV0dG9uQ2xpY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
