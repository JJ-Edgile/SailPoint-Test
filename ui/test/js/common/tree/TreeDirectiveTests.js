System.register(['test/js/TestInitializer', 'common/tree/TreeModule'], function (_export) {
    'use strict';

    var treeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonTreeTreeModule) {
            treeModule = _commonTreeTreeModule['default'];
        }],
        execute: function () {

            describe('TreeDirective', function () {

                var eltDef = '<sp-tree sp-nodes="nodes"><span>{{ node.name }}</span></sp-tree>';

                var $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    nodes = undefined,
                    loadFunc = undefined,
                    gramps = undefined,
                    granny = undefined,
                    parents = undefined;

                beforeEach(module(treeModule));

                beforeEach(inject(function (_$compile_, $rootScope, $q) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();

                    // Make some tree nodes to test with.
                    parents = [{
                        name: 'Dad',
                        hasChildren: true,
                        children: [{
                            name: 'Me',
                            hasChildren: false
                        }, {
                            name: 'Bro',
                            hasChildren: false
                        }, {
                            name: 'Sis',
                            hasChildren: false
                        }]
                    }];

                    gramps = {
                        name: 'Granddaddy',
                        hasChildren: true,
                        children: parents
                    };

                    granny = {
                        name: 'Granny',
                        hasChildren: false
                    };

                    nodes = [gramps, granny];

                    // Mock out a load function that always returns the "parents" nodes.
                    loadFunc = jasmine.createSpy('loaderFunc').and.callFake(function (node) {
                        return $q.when(parents);
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    var elt = arguments.length <= 0 || arguments[0] === undefined ? eltDef : arguments[0];

                    $scope.nodes = nodes;
                    $scope.loadFunc = loadFunc;
                    element = angular.element(elt);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                /**
                 * Get the node <li> for the node with the given name.
                 */
                function getNode(nodeName) {
                    var label = element.find('span:contains(\'' + nodeName + '\')');
                    expect(label.length).toEqual(1);
                    var nodes = label.parents('.angular-ui-tree-node');
                    expect(nodes.length).toBeGreaterThan(0);

                    // Return the closest parent (these are returned first from the parents() call).
                    return angular.element(nodes[0]);
                }

                function getNodeContent(node) {
                    // Node has two pieces - content and subtree.
                    return angular.element(node.children()[0]);
                }

                function getSubtree(node) {
                    // Node has two pieces - content and subtree.
                    return angular.element(node.children()[1]);
                }

                function getExpander(node) {
                    var expanders = getNodeContent(node).find('.angular-ui-tree-node-toggle');
                    return expanders.length ? angular.element(expanders[0]) : null;
                }

                function hasExpander(node) {
                    return getExpander(node) !== null;
                }

                function hasSubTree(node) {
                    return getSubtree(node).find('li').length > 0;
                }

                /**
                 * Recursively rename the property in the given names from oldName to newName.
                 */
                function renameNodeProperty(nodes, oldName, newName) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var node = _step.value;

                            // Save the children first in case we rename this.
                            var children = node.children;

                            // Rename and delete the old one.
                            node[newName] = node[oldName];
                            delete node[oldName];

                            // Recurse.
                            if (children && angular.isArray(children) && children.length > 0) {
                                renameNodeProperty(children, oldName, newName);
                            }
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
                }

                function testSubtreeAndExpander() {
                    var grampsNode = getNode(gramps.name);
                    var grannyNode = getNode(granny.name);

                    expect(hasExpander(grampsNode)).toEqual(true);
                    expect(hasSubTree(grampsNode)).toEqual(true);
                    expect(hasExpander(grannyNode)).toEqual(false);
                    expect(hasSubTree(grannyNode)).toEqual(false);
                }

                it('uses "hasChildren" and "children" to find node children when not specified', function () {
                    compile();
                    testSubtreeAndExpander();
                });

                it('uses "hasChildrenProperty" when specified', function () {
                    renameNodeProperty(nodes, 'hasChildren', 'zanzibar');
                    compile('<sp-tree sp-nodes="nodes" sp-has-children-property="zanzibar"><span>{{ node.name }}</span></sp-tree>');
                    testSubtreeAndExpander();
                });

                it('uses "childrenProperty" when specified', function () {
                    renameNodeProperty(nodes, 'children', 'zanzibar');
                    compile('<sp-tree sp-nodes="nodes" sp-children-property="zanzibar"><span>{{ node.name }}</span></sp-tree>');
                    testSubtreeAndExpander();
                });

                describe('load children function', function () {
                    var loaderElt = '<sp-tree sp-nodes="nodes" sp-load-children-function="loadFunc"' + 'sp-auto-expand-root="false"><span>{{ node.name }}</span></sp-tree>';

                    it('renders pre-loaded children if load function is null', function () {
                        compile();
                        var allNodes = element.find('.angular-ui-tree-node');
                        expect(allNodes.length).toEqual(6);
                    });

                    function expandGramps() {
                        compile(loaderElt);
                        var grampsNode = getNode(gramps.name);
                        var expander = getExpander(grampsNode);
                        return expander;
                    }

                    it('is not called when expanding pre-loaded children', function () {
                        var toggle = expandGramps();
                        toggle.click();
                        expect(loadFunc).not.toHaveBeenCalled();
                    });

                    it('is called if node is expanding', function () {
                        nodes = [gramps, granny];
                        var toggle = expandGramps();
                        toggle.click();
                        gramps.children = null;
                        toggle.click();
                        toggle.click();
                        expect(gramps.children).toEqual(parents);
                        expect(loadFunc).toHaveBeenCalledWith(gramps);
                    });

                    it('is not called if node is collapsing', function () {
                        gramps.children = null;
                        nodes = [gramps, granny];
                        var toggle = expandGramps();
                        toggle.click();
                        loadFunc.calls.reset();
                        toggle.click();
                        expect(loadFunc).not.toHaveBeenCalled();
                    });

                    it('is not called again if node has already been expanded', function () {
                        var toggle = expandGramps();
                        gramps.children = null;
                        toggle.click();
                        loadFunc.calls.reset();
                        toggle.click();
                        expect(loadFunc).not.toHaveBeenCalled();
                    });

                    it('is not called again if node is auto expanded', function () {
                        loaderElt = '<sp-tree sp-nodes="nodes" sp-load-children-function="loadFunc"' + 'sp-auto-expand-root="true"><span>{{ node.name }}</span></sp-tree>';
                        var toggle = expandGramps();
                        toggle.click();
                        gramps.children = null;
                        toggle.click();
                        loadFunc.calls.reset();
                        toggle.click();
                        expect(loadFunc).not.toHaveBeenCalled();
                    });

                    it('is not called for if node is auto expanded', function () {
                        loaderElt = '<sp-tree sp-nodes="nodes" sp-load-children-function="loadFunc"' + 'sp-auto-expand-root="true"><span>{{ node.name }}</span></sp-tree>';
                        expandGramps();
                        expect(loadFunc).not.toHaveBeenCalled();
                    });
                });

                describe('selection', function () {
                    var selectionElt = '<sp-tree sp-nodes="nodes" sp-selected-node="selected" sp-auto-expand-root="false">' + '<span>{{ node.name }}</span></sp-tree>';

                    function clickGramps() {
                        compile(selectionElt);
                        var grampsNode = getNode(gramps.name);
                        var content = getNodeContent(grampsNode);
                        var clicker = content.find('a.angular-ui-tree-node-content');
                        expect(clicker.length).toEqual(1);
                        clicker.click();
                        return clicker;
                    }

                    it('updates the bound selectedNode', function () {
                        clickGramps();
                        expect($scope.selected).toEqual(gramps);
                    });

                    it('marks the node as selected', function () {
                        var clicker = clickGramps();
                        expect(clicker.hasClass('angular-ui-tree-node-selected')).toEqual(true);
                    });
                });

                describe('expander', function () {
                    it('is rendered for a node with children', function () {
                        compile();
                        var grampsNode = getNode(gramps.name);
                        expect(hasExpander(grampsNode)).toEqual(true);
                    });

                    it('is not rendered for a node without children', function () {
                        compile();
                        var grannyNode = getNode(granny.name);
                        expect(hasExpander(grannyNode)).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi90cmVlL1RyZWVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUN0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsaUJBQWlCLFlBQU07O2dCQUU1QixJQUFJLFNBQU07O2dCQUVWLElBQUksV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsUUFBSztvQkFBRSxXQUFRO29CQUFFLFNBQU07b0JBQUUsU0FBTTtvQkFBRSxVQUFPOztnQkFFdkUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLElBQU87b0JBQzlDLFdBQVc7b0JBQ1gsU0FBUyxXQUFXOzs7b0JBR3BCLFVBQVUsQ0FBQzt3QkFDUCxNQUFNO3dCQUNOLGFBQWE7d0JBQ2IsVUFBVSxDQUFDOzRCQUNQLE1BQU07NEJBQ04sYUFBYTsyQkFDZDs0QkFDQyxNQUFNOzRCQUNOLGFBQWE7MkJBQ2Q7NEJBQ0MsTUFBTTs0QkFDTixhQUFhOzs7O29CQUlyQixTQUFTO3dCQUNMLE1BQU07d0JBQ04sYUFBYTt3QkFDYixVQUFVOzs7b0JBR2QsU0FBUzt3QkFDTCxNQUFNO3dCQUNOLGFBQWE7OztvQkFHakIsUUFBUSxDQUFFLFFBQVE7OztvQkFHbEIsV0FBVyxRQUFRLFVBQVUsY0FBYyxJQUFJLFNBQVMsVUFBQyxNQUFTO3dCQUM5RCxPQUFPLEdBQUcsS0FBSzs7OztnQkFJdkIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFVBQXNCO29CQWVmLElBZkMsTUFBRyxVQUFBLFVBQUEsS0FBQSxVQUFBLE9BQUEsWUFBRyxTQUFNLFVBQUE7O29CQUN6QixP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QVMsa0NBQWtDLFFBQVE7Ozs7Z0JBSTFFLFNBQVMsWUFBWSxZQUFNO29CQUN2QixHQUFHLHdDQUF3QyxZQUFNO3dCQUM3Qzt3QkFDQSxJQUFJLGFBQWEsUUFBUSxPQUFPO3dCQUNoQyxPQUFPLFlBQVksYUFBYSxRQUFROzs7b0JBRzVDLEdBQUcsK0NBQStDLFlBQU07d0JBQ3BEO3dCQUNBLElBQUksYUFBYSxRQUFRLE9BQU87d0JBQ2hDLE9BQU8sWUFBWSxhQUFhLFFBQVE7Ozs7OztHQXNDakQiLCJmaWxlIjoiY29tbW9uL3RyZWUvVHJlZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCB0cmVlTW9kdWxlIGZyb20gJ2NvbW1vbi90cmVlL1RyZWVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ1RyZWVEaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IGVsdERlZiA9IGA8c3AtdHJlZSBzcC1ub2Rlcz1cIm5vZGVzXCI+PHNwYW4+e3sgbm9kZS5uYW1lIH19PC9zcGFuPjwvc3AtdHJlZT5gO1xyXG5cclxuICAgIGxldCAkY29tcGlsZSwgJHNjb3BlLCBlbGVtZW50LCBub2RlcywgbG9hZEZ1bmMsIGdyYW1wcywgZ3Jhbm55LCBwYXJlbnRzO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRyZWVNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSwgJHEpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc29tZSB0cmVlIG5vZGVzIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICBwYXJlbnRzID0gW3tcclxuICAgICAgICAgICAgbmFtZTogJ0RhZCcsXHJcbiAgICAgICAgICAgIGhhc0NoaWxkcmVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdNZScsXHJcbiAgICAgICAgICAgICAgICBoYXNDaGlsZHJlbjogZmFsc2VcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0JybycsXHJcbiAgICAgICAgICAgICAgICBoYXNDaGlsZHJlbjogZmFsc2VcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ1NpcycsXHJcbiAgICAgICAgICAgICAgICBoYXNDaGlsZHJlbjogZmFsc2VcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgZ3JhbXBzID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnR3JhbmRkYWRkeScsXHJcbiAgICAgICAgICAgIGhhc0NoaWxkcmVuOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogcGFyZW50c1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdyYW5ueSA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ0dyYW5ueScsXHJcbiAgICAgICAgICAgIGhhc0NoaWxkcmVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG5vZGVzID0gWyBncmFtcHMsIGdyYW5ueSBdO1xyXG5cclxuICAgICAgICAvLyBNb2NrIG91dCBhIGxvYWQgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyB0aGUgXCJwYXJlbnRzXCIgbm9kZXMuXHJcbiAgICAgICAgbG9hZEZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnbG9hZGVyRnVuYycpLmFuZC5jYWxsRmFrZSgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEud2hlbihwYXJlbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGlsZShlbHQgPSBlbHREZWYpIHtcclxuICAgICAgICAkc2NvcGUubm9kZXMgPSBub2RlcztcclxuICAgICAgICAkc2NvcGUubG9hZEZ1bmMgPSBsb2FkRnVuYztcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdCk7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBub2RlIDxsaT4gZm9yIHRoZSBub2RlIHdpdGggdGhlIGdpdmVuIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldE5vZGUobm9kZU5hbWUpIHtcclxuICAgICAgICBsZXQgbGFiZWwgPSBlbGVtZW50LmZpbmQoYHNwYW46Y29udGFpbnMoJyR7bm9kZU5hbWV9JylgKTtcclxuICAgICAgICBleHBlY3QobGFiZWwubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIGxldCBub2RlcyA9IGxhYmVsLnBhcmVudHMoJy5hbmd1bGFyLXVpLXRyZWUtbm9kZScpO1xyXG4gICAgICAgIGV4cGVjdChub2Rlcy5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjbG9zZXN0IHBhcmVudCAodGhlc2UgYXJlIHJldHVybmVkIGZpcnN0IGZyb20gdGhlIHBhcmVudHMoKSBjYWxsKS5cclxuICAgICAgICByZXR1cm4gYW5ndWxhci5lbGVtZW50KG5vZGVzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXROb2RlQ29udGVudChub2RlKSB7XHJcbiAgICAgICAgLy8gTm9kZSBoYXMgdHdvIHBpZWNlcyAtIGNvbnRlbnQgYW5kIHN1YnRyZWUuXHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChub2RlLmNoaWxkcmVuKClbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN1YnRyZWUobm9kZSkge1xyXG4gICAgICAgIC8vIE5vZGUgaGFzIHR3byBwaWVjZXMgLSBjb250ZW50IGFuZCBzdWJ0cmVlLlxyXG4gICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQobm9kZS5jaGlsZHJlbigpWzFdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFeHBhbmRlcihub2RlKSB7XHJcbiAgICAgICAgbGV0IGV4cGFuZGVycyA9IGdldE5vZGVDb250ZW50KG5vZGUpLmZpbmQoJy5hbmd1bGFyLXVpLXRyZWUtbm9kZS10b2dnbGUnKTtcclxuICAgICAgICByZXR1cm4gKGV4cGFuZGVycy5sZW5ndGgpID8gYW5ndWxhci5lbGVtZW50KGV4cGFuZGVyc1swXSkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc0V4cGFuZGVyKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gKGdldEV4cGFuZGVyKG5vZGUpICE9PSBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYXNTdWJUcmVlKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gKGdldFN1YnRyZWUobm9kZSkuZmluZCgnbGknKS5sZW5ndGggPiAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY3Vyc2l2ZWx5IHJlbmFtZSB0aGUgcHJvcGVydHkgaW4gdGhlIGdpdmVuIG5hbWVzIGZyb20gb2xkTmFtZSB0byBuZXdOYW1lLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZW5hbWVOb2RlUHJvcGVydHkobm9kZXMsIG9sZE5hbWUsIG5ld05hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhlIGNoaWxkcmVuIGZpcnN0IGluIGNhc2Ugd2UgcmVuYW1lIHRoaXMuXHJcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgICAgICAgICAvLyBSZW5hbWUgYW5kIGRlbGV0ZSB0aGUgb2xkIG9uZS5cclxuICAgICAgICAgICAgbm9kZVtuZXdOYW1lXSA9IG5vZGVbb2xkTmFtZV07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlW29sZE5hbWVdO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVjdXJzZS5cclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuICYmIGFuZ3VsYXIuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVuYW1lTm9kZVByb3BlcnR5KGNoaWxkcmVuLCBvbGROYW1lLCBuZXdOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0U3VidHJlZUFuZEV4cGFuZGVyKCkge1xyXG4gICAgICAgIGxldCBncmFtcHNOb2RlID0gZ2V0Tm9kZShncmFtcHMubmFtZSk7XHJcbiAgICAgICAgbGV0IGdyYW5ueU5vZGUgPSBnZXROb2RlKGdyYW5ueS5uYW1lKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGhhc0V4cGFuZGVyKGdyYW1wc05vZGUpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChoYXNTdWJUcmVlKGdyYW1wc05vZGUpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChoYXNFeHBhbmRlcihncmFubnlOb2RlKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgZXhwZWN0KGhhc1N1YlRyZWUoZ3Jhbm55Tm9kZSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCd1c2VzIFwiaGFzQ2hpbGRyZW5cIiBhbmQgXCJjaGlsZHJlblwiIHRvIGZpbmQgbm9kZSBjaGlsZHJlbiB3aGVuIG5vdCBzcGVjaWZpZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIHRlc3RTdWJ0cmVlQW5kRXhwYW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd1c2VzIFwiaGFzQ2hpbGRyZW5Qcm9wZXJ0eVwiIHdoZW4gc3BlY2lmaWVkJywgKCkgPT4ge1xyXG4gICAgICAgIHJlbmFtZU5vZGVQcm9wZXJ0eShub2RlcywgJ2hhc0NoaWxkcmVuJywgJ3phbnppYmFyJyk7XHJcbiAgICAgICAgY29tcGlsZSgnPHNwLXRyZWUgc3Atbm9kZXM9XCJub2Rlc1wiIHNwLWhhcy1jaGlsZHJlbi1wcm9wZXJ0eT1cInphbnppYmFyXCI+PHNwYW4+e3sgbm9kZS5uYW1lIH19PC9zcGFuPjwvc3AtdHJlZT4nKTtcclxuICAgICAgICB0ZXN0U3VidHJlZUFuZEV4cGFuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndXNlcyBcImNoaWxkcmVuUHJvcGVydHlcIiB3aGVuIHNwZWNpZmllZCcsICgpID0+IHtcclxuICAgICAgICByZW5hbWVOb2RlUHJvcGVydHkobm9kZXMsICdjaGlsZHJlbicsICd6YW56aWJhcicpO1xyXG4gICAgICAgIGNvbXBpbGUoJzxzcC10cmVlIHNwLW5vZGVzPVwibm9kZXNcIiBzcC1jaGlsZHJlbi1wcm9wZXJ0eT1cInphbnppYmFyXCI+PHNwYW4+e3sgbm9kZS5uYW1lIH19PC9zcGFuPjwvc3AtdHJlZT4nKTtcclxuICAgICAgICB0ZXN0U3VidHJlZUFuZEV4cGFuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnbG9hZCBjaGlsZHJlbiBmdW5jdGlvbicsICgpID0+IHtcclxuICAgICAgICBsZXQgbG9hZGVyRWx0ID0gJzxzcC10cmVlIHNwLW5vZGVzPVwibm9kZXNcIiBzcC1sb2FkLWNoaWxkcmVuLWZ1bmN0aW9uPVwibG9hZEZ1bmNcIicgK1xyXG4gICAgICAgICAgICAnc3AtYXV0by1leHBhbmQtcm9vdD1cImZhbHNlXCI+PHNwYW4+e3sgbm9kZS5uYW1lIH19PC9zcGFuPjwvc3AtdHJlZT4nO1xyXG5cclxuICAgICAgICBpdCgncmVuZGVycyBwcmUtbG9hZGVkIGNoaWxkcmVuIGlmIGxvYWQgZnVuY3Rpb24gaXMgbnVsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBsZXQgYWxsTm9kZXMgPSBlbGVtZW50LmZpbmQoJy5hbmd1bGFyLXVpLXRyZWUtbm9kZScpO1xyXG4gICAgICAgICAgICBleHBlY3QoYWxsTm9kZXMubGVuZ3RoKS50b0VxdWFsKDYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBleHBhbmRHcmFtcHMoKSB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUobG9hZGVyRWx0KTtcclxuICAgICAgICAgICAgbGV0IGdyYW1wc05vZGUgPSBnZXROb2RlKGdyYW1wcy5uYW1lKTtcclxuICAgICAgICAgICAgbGV0IGV4cGFuZGVyID0gZ2V0RXhwYW5kZXIoZ3JhbXBzTm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBleHBhbmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgY2FsbGVkIHdoZW4gZXhwYW5kaW5nIHByZS1sb2FkZWQgY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2dnbGUgPSBleHBhbmRHcmFtcHMoKTtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsb2FkRnVuYykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGNhbGxlZCBpZiBub2RlIGlzIGV4cGFuZGluZycsICgpID0+IHtcclxuICAgICAgICAgICAgbm9kZXMgPSBbIGdyYW1wcywgZ3Jhbm55IF07XHJcbiAgICAgICAgICAgIGxldCB0b2dnbGUgPSBleHBhbmRHcmFtcHMoKTtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGdyYW1wcy5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5jbGljaygpO1xyXG4gICAgICAgICAgICB0b2dnbGUuY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdyYW1wcy5jaGlsZHJlbikudG9FcXVhbChwYXJlbnRzKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxvYWRGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChncmFtcHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IGNhbGxlZCBpZiBub2RlIGlzIGNvbGxhcHNpbmcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdyYW1wcy5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGVzID0gWyBncmFtcHMsIGdyYW5ueSBdO1xyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlID0gZXhwYW5kR3JhbXBzKCk7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5jbGljaygpO1xyXG4gICAgICAgICAgICBsb2FkRnVuYy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICB0b2dnbGUuY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxvYWRGdW5jKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IGNhbGxlZCBhZ2FpbiBpZiBub2RlIGhhcyBhbHJlYWR5IGJlZW4gZXhwYW5kZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2dnbGUgPSBleHBhbmRHcmFtcHMoKTtcclxuICAgICAgICAgICAgZ3JhbXBzLmNoaWxkcmVuID0gbnVsbDtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGxvYWRGdW5jLmNhbGxzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5jbGljaygpO1xyXG4gICAgICAgICAgICBleHBlY3QobG9hZEZ1bmMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgY2FsbGVkIGFnYWluIGlmIG5vZGUgaXMgYXV0byBleHBhbmRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZGVyRWx0ID0gJzxzcC10cmVlIHNwLW5vZGVzPVwibm9kZXNcIiBzcC1sb2FkLWNoaWxkcmVuLWZ1bmN0aW9uPVwibG9hZEZ1bmNcIicgK1xyXG4gICAgICAgICAgICAnc3AtYXV0by1leHBhbmQtcm9vdD1cInRydWVcIj48c3Bhbj57eyBub2RlLm5hbWUgfX08L3NwYW4+PC9zcC10cmVlPic7XHJcbiAgICAgICAgICAgIGxldCB0b2dnbGUgPSBleHBhbmRHcmFtcHMoKTtcclxuICAgICAgICAgICAgdG9nZ2xlLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIGdyYW1wcy5jaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5jbGljaygpO1xyXG4gICAgICAgICAgICBsb2FkRnVuYy5jYWxscy5yZXNldCgpO1xyXG4gICAgICAgICAgICB0b2dnbGUuY2xpY2soKTtcclxuICAgICAgICAgICAgZXhwZWN0KGxvYWRGdW5jKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IGNhbGxlZCBmb3IgaWYgbm9kZSBpcyBhdXRvIGV4cGFuZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkZXJFbHQgPSAnPHNwLXRyZWUgc3Atbm9kZXM9XCJub2Rlc1wiIHNwLWxvYWQtY2hpbGRyZW4tZnVuY3Rpb249XCJsb2FkRnVuY1wiJyArXHJcbiAgICAgICAgICAgICdzcC1hdXRvLWV4cGFuZC1yb290PVwidHJ1ZVwiPjxzcGFuPnt7IG5vZGUubmFtZSB9fTwvc3Bhbj48L3NwLXRyZWU+JztcclxuICAgICAgICAgICAgZXhwYW5kR3JhbXBzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChsb2FkRnVuYykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VsZWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWxlY3Rpb25FbHQgPSAnPHNwLXRyZWUgc3Atbm9kZXM9XCJub2Rlc1wiIHNwLXNlbGVjdGVkLW5vZGU9XCJzZWxlY3RlZFwiIHNwLWF1dG8tZXhwYW5kLXJvb3Q9XCJmYWxzZVwiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4+e3sgbm9kZS5uYW1lIH19PC9zcGFuPjwvc3AtdHJlZT4nO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGlja0dyYW1wcygpIHtcclxuICAgICAgICAgICAgY29tcGlsZShzZWxlY3Rpb25FbHQpO1xyXG4gICAgICAgICAgICBsZXQgZ3JhbXBzTm9kZSA9IGdldE5vZGUoZ3JhbXBzLm5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IGdldE5vZGVDb250ZW50KGdyYW1wc05vZGUpO1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tlciA9IGNvbnRlbnQuZmluZCgnYS5hbmd1bGFyLXVpLXRyZWUtbm9kZS1jb250ZW50Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjbGlja2VyLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgY2xpY2tlci5jbGljaygpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xpY2tlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCd1cGRhdGVzIHRoZSBib3VuZCBzZWxlY3RlZE5vZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsaWNrR3JhbXBzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgkc2NvcGUuc2VsZWN0ZWQpLnRvRXF1YWwoZ3JhbXBzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ21hcmtzIHRoZSBub2RlIGFzIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tlciA9IGNsaWNrR3JhbXBzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjbGlja2VyLmhhc0NsYXNzKCdhbmd1bGFyLXVpLXRyZWUtbm9kZS1zZWxlY3RlZCcpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2V4cGFuZGVyJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdpcyByZW5kZXJlZCBmb3IgYSBub2RlIHdpdGggY2hpbGRyZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICAgICAgbGV0IGdyYW1wc05vZGUgPSBnZXROb2RlKGdyYW1wcy5uYW1lKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0V4cGFuZGVyKGdyYW1wc05vZGUpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgbm90IHJlbmRlcmVkIGZvciBhIG5vZGUgd2l0aG91dCBjaGlsZHJlbicsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgICAgICBsZXQgZ3Jhbm55Tm9kZSA9IGdldE5vZGUoZ3Jhbm55Lm5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFzRXhwYW5kZXIoZ3Jhbm55Tm9kZSkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
