System.register(['test/js/TestInitializer', 'common/dataview/selection/SelectionModule'], function (_export) {
    'use strict';

    var selectionModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewSelectionSelectionModule) {
            selectionModule = _commonDataviewSelectionSelectionModule['default'];
        }],
        execute: function () {

            describe('SelectionModel', function () {
                function createItem(id) {
                    return { id: id };
                }

                var item1 = createItem('1'),
                    item2 = createItem('2'),
                    selModel = undefined,
                    SelectionModel = undefined;

                beforeEach(module(selectionModule));

                beforeEach(inject(function (_SelectionModel_) {
                    SelectionModel = _SelectionModel_;
                    selModel = new SelectionModel();
                }));

                it('clone() makes a deep copy of the SelectionModel', function () {
                    selModel.add(item1);
                    selModel.filterValues = [1, 2, 3];
                    var copy = selModel.clone();

                    // Clear the original model.
                    selModel.clear();

                    // Ensure that the clone didn't get modified.
                    expect(copy.size()).toEqual(1);
                    expect(copy.getItemIds()).toEqual(['1']);
                    expect(copy.getItems()).toEqual([item1]);
                    expect(copy.filterValues).toEqual(selModel.filterValues);
                });

                describe('clear()', function () {
                    it('clears the items and sets size to zero', function () {
                        selModel.add(item1);
                        selModel.clear();
                        expect(selModel.size()).toEqual(0);
                    });
                });

                describe('selectAll()', function () {
                    it('sets isInclude to false', function () {
                        selModel.isInclude = false;
                        selModel.add(item1);
                        selModel.add(item2);
                        selModel.selectAll();
                        expect(selModel.size()).toEqual(0);
                        expect(selModel.isInclude).toBeFalsy();
                    });
                });

                describe('isSelectAll()', function () {
                    it('returns true if isInclude is false', function () {
                        selModel.isInclude = false;
                        expect(selModel.isSelectAll()).toEqual(true);
                    });

                    it('returns false if isInclude is true', function () {
                        selModel.isInclude = true;
                        expect(selModel.isSelectAll()).toEqual(false);
                    });
                });

                describe('selectAll()', function () {
                    it('getNegativeSelections not empty with isInclude = false', function () {
                        selModel.isInclude = false;
                        selModel.add(item1);
                        selModel.add(item2);
                        expect(selModel.getNegativeSelections().length).toEqual(2);
                        expect(selModel.getSelections().length).toEqual(0);
                    });

                    it('getSelections not empty with isInclude = true', function () {
                        selModel.isInclude = true;
                        selModel.add(item1);
                        selModel.add(item2);
                        expect(selModel.getSelections().length).toEqual(2);
                        expect(selModel.getNegativeSelections().length).toEqual(0);
                    });
                });

                describe('size()', function () {
                    it('reports the correct size even if duplicate added', function () {
                        selModel.clear();
                        expect(selModel.size()).toEqual(0);
                        selModel.add(item1);
                        expect(selModel.size()).toEqual(1);
                        selModel.add(item1);
                        expect(selModel.size()).toEqual(1);
                    });
                });

                describe('hasSelections()', function () {
                    it('returns true if there are individual selections', function () {
                        selModel.clear();
                        selModel.add(item1);
                        expect(selModel.hasSelections()).toEqual(true);
                    });

                    it('returns true if there is a select all', function () {
                        selModel.clear();
                        selModel.selectAll();
                        expect(selModel.hasSelections()).toEqual(true);
                    });

                    it('returns false if there are no selections or select all', function () {
                        selModel.clear();
                        expect(selModel.hasSelections()).toEqual(false);
                    });
                });

                describe('isItemSelected()', function () {
                    it('returns true if is select all with item not in selection list', function () {
                        selModel.selectAll();
                        selModel.add({
                            id: '9999'
                        });
                        expect(selModel.isItemSelected({
                            id: '1234'
                        })).toEqual(true);
                    });

                    it('returns false if is select all with item in selection list', function () {
                        selModel.selectAll();
                        selModel.add({
                            id: '1234'
                        });
                        expect(selModel.isItemSelected({
                            id: '1234'
                        })).toEqual(false);
                    });

                    it('returns true if not select all with item in selection list', function () {
                        selModel.add({
                            id: '1234'
                        });
                        expect(selModel.isItemSelected({
                            id: '1234'
                        })).toEqual(true);
                    });

                    it('returns false if not select all with item not in selection list', function () {
                        selModel.add({
                            id: '9999'
                        });
                        expect(selModel.isItemSelected({
                            id: '1234'
                        })).toEqual(false);
                    });
                });

                describe('isItemIdSelected()', function () {
                    it('returns true if is select all with item id not in selection list', function () {
                        selModel.selectAll();
                        selModel.add({
                            id: '9999'
                        });
                        expect(selModel.isItemIdSelected('1234')).toEqual(true);
                    });

                    it('returns false if is select all with item id in selection list', function () {
                        selModel.selectAll();
                        selModel.add({
                            id: '1234'
                        });
                        expect(selModel.isItemIdSelected('1234')).toEqual(false);
                    });

                    it('returns true if not select all with item id in selection list', function () {
                        selModel.add({
                            id: '1234'
                        });
                        expect(selModel.isItemIdSelected('1234')).toEqual(true);
                    });

                    it('returns false if not select all with item id not in selection list', function () {
                        selModel.add({
                            id: '9999'
                        });
                        expect(selModel.isItemIdSelected('1234')).toEqual(false);
                    });
                });

                describe('filterSelections()', function () {
                    it('removes items that the passed function return true for', function () {
                        var items = [{
                            id: '1234'
                        }, {
                            id: '5678'
                        }];
                        selModel.add(items[0]);
                        selModel.add(items[1]);
                        selModel.filterSelections(function (item) {
                            return item.id === items[0].id;
                        });
                        expect(selModel.isItemSelected(items[0])).toEqual(false);
                        expect(selModel.isItemSelected(items[1])).toEqual(true);
                    });

                    it('does not remove anything if isInclude is false', function () {
                        var items = [{
                            id: '1234'
                        }, {
                            id: '5678'
                        }];
                        selModel.selectAll();
                        selModel.add(items[0]);
                        selModel.add(items[1]);
                        selModel.filterSelections(function (item) {
                            return item.id === items[0].id;
                        });
                        // These will be false since they are negative selections.
                        expect(selModel.isItemSelected(items[0])).toEqual(false);
                        expect(selModel.isItemSelected(items[1])).toEqual(false);
                    });

                    it('returns the selection model', function () {
                        var items = [{
                            id: '1234'
                        }, {
                            id: '5678'
                        }],
                            newSelModel = undefined;
                        selModel.selectAll();
                        selModel.add(items[0]);
                        selModel.add(items[1]);
                        newSelModel = selModel.filterSelections(function () {
                            return false;
                        });
                        expect(newSelModel).toEqual(selModel);
                    });
                });

                describe('groups', function () {
                    var goodGroup = undefined,
                        badGroup = undefined,
                        goodItem1 = undefined,
                        goodItem2 = undefined,
                        badItem = undefined,
                        ResultGroup = undefined;

                    beforeEach(inject(function (_ResultGroup_) {
                        ResultGroup = _ResultGroup_;
                        goodGroup = new ResultGroup({
                            properties: {
                                isGood: 'yes!'
                            },
                            count: 2
                        });
                        badGroup = new ResultGroup({
                            properties: {
                                isGood: 'NO?'
                            },
                            objectIds: ['1234', '5678']
                        });
                        goodItem1 = {
                            id: 'abcd',
                            isGood: 'yes!'
                        };
                        goodItem2 = {
                            id: 'hhhh',
                            isGood: 'yes!'
                        };
                        badItem = {
                            id: '1234',
                            isGood: 'NO?'
                        };
                    }));

                    describe('addGroup()', function () {
                        it('adds a new group if none exists', function () {
                            expect(selModel.addGroup(goodGroup)).toEqual(true);
                            expect(selModel.groups.length).toEqual(1);
                        });

                        it('does not add a group if already exists', function () {
                            expect(selModel.addGroup(goodGroup)).toEqual(true);
                            expect(selModel.addGroup(goodGroup)).toEqual(false);
                            expect(selModel.groups.length).toEqual(1);
                        });

                        it('removes overlapping items if they match the group', function () {
                            selModel.isInclude = false;
                            selModel.add(goodItem1);
                            selModel.add(goodItem2);
                            selModel.addGroup(goodGroup);
                            expect(selModel.getItems().length).toEqual(0);
                            expect(selModel.groups.length).toEqual(1);
                        });
                    });

                    describe('removeGroup()', function () {
                        it('removes the group if matching one exists', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.removeGroup(goodGroup)).toEqual(true);
                            expect(selModel.groups.length).toEqual(0);
                        });

                        it('does not remove anything if no group matches', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.removeGroup(badGroup)).toEqual(false);
                            expect(selModel.groups.length).toEqual(1);
                        });
                    });

                    describe('add()', function () {
                        it('removes item from a matching group selection model if one exists', function () {
                            selModel.addGroup(goodGroup);
                            selModel.getGroupSelectionModel(goodGroup).add(goodItem1);
                            selModel.add(goodItem1);
                            expect(selModel.getGroupSelectionModel(goodGroup).hasItem(goodItem1)).toEqual(false);
                        });
                    });

                    describe('remove()', function () {
                        it('adds item to a matching group selection model if one exists', function () {
                            selModel.addGroup(goodGroup);
                            selModel.remove(goodItem1);
                            expect(selModel.getGroupSelectionModel(goodGroup).hasItem(goodItem1)).toEqual(true);
                        });
                    });

                    describe('getGroupSelectionModel()', function () {
                        it('returns selectionModel if group matches an entry', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.getGroupSelectionModel(goodGroup)).toBeDefined();
                        });

                        it('returns undefined if no group matches', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.getGroupSelectionModel(badGroup)).not.toBeDefined();
                        });
                    });

                    describe('hasGroup()', function () {
                        it('returns true if a group exists that matches', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.hasGroup(goodGroup)).toEqual(true);
                        });

                        it('returns false if no group matches', function () {
                            selModel.addGroup(goodGroup);
                            expect(selModel.hasGroup(badGroup)).toEqual(false);
                        });
                    });

                    describe('getGroup()', function () {
                        it('returns the group that matches', function () {
                            selModel.addGroup(goodGroup);
                            var foundGroup = selModel.getGroup(goodGroup);
                            expect(foundGroup).toBeDefined();
                            expect(foundGroup.resultGroup).toEqual(goodGroup);
                        });

                        it('returns undefined if no group matches', function () {
                            selModel.addGroup(goodGroup);
                            var foundGroup = selModel.getGroup(badGroup);
                            expect(foundGroup).not.toBeDefined();
                        });
                    });

                    describe('getGroups()', function () {
                        it('returns the groups', function () {
                            selModel.addGroup(goodGroup);
                            selModel.addGroup(badGroup);
                            var groups = selModel.getGroups();
                            expect(groups.length).toEqual(2);
                            expect(groups[0].resultGroup).toEqual(goodGroup);
                            expect(groups[1].resultGroup).toEqual(badGroup);
                        });
                    });

                    describe('size()', function () {
                        it('includes the size of groups', function () {
                            selModel.addGroup(goodGroup);
                            selModel.add(badItem);
                            expect(selModel.size()).toEqual(3);
                        });

                        it('does not include items that are in the group selection model ', function () {
                            selModel.addGroup(goodGroup);
                            selModel.remove(goodItem2);
                            selModel.add(badItem);
                            expect(selModel.size()).toEqual(2);
                        });
                    });

                    describe('getCompleteGroupSelectionModels()', function () {
                        it('converts groups without object ids to select all selection model with filters', function () {
                            selModel.addGroup(goodGroup);
                            selModel.remove(goodItem1);
                            var selectionModels = selModel.getCompleteGroupSelectionModels();
                            expect(selectionModels.length).toEqual(1);
                            var selectionModel = selectionModels[0];
                            expect(selectionModel.filterValues).toEqual(goodGroup.filterValues);
                            expect(selectionModel.getItems()).toEqual([goodItem1]);
                            expect(selectionModel.isInclude).toEqual(false);
                        });

                        it('converts groups with object ids to non-select all selection model with included ids', function () {
                            selModel.addGroup(badGroup);
                            selModel.remove(badItem);
                            var selectionModels = selModel.getCompleteGroupSelectionModels();
                            expect(selectionModels.length).toEqual(1);
                            var selectionModel = selectionModels[0];
                            expect(selectionModel.filterValues).not.toBeDefined();
                            expect(selectionModel.itemIds).toEqual(['5678']);
                            expect(selectionModel.isInclude).toEqual(true);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9zZWxlY3Rpb24vU2VsZWN0aW9uTW9kZWxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsOENBQThDLFVBQVUsU0FBUztJQUN6Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUNBQXlDO1lBQy9GLGtCQUFrQix3Q0FBd0M7O1FBRTlELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxrQkFBa0IsWUFBTTtnQkFDN0IsU0FBUyxXQUFXLElBQUk7b0JBQ3BCLE9BQU8sRUFBRSxJQUFJOzs7Z0JBR2pCLElBQUksUUFBUSxXQUFXO29CQUNuQixRQUFRLFdBQVc7b0JBQ25CLFdBQVE7b0JBQ1IsaUJBQWM7O2dCQUVsQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxrQkFBa0I7b0JBQ3pDLGlCQUFpQjtvQkFDakIsV0FBVyxJQUFJOzs7Z0JBR25CLEdBQUcsbURBQW1ELFlBQU07b0JBQ3hELFNBQVMsSUFBSTtvQkFDYixTQUFTLGVBQWUsQ0FBQyxHQUFHLEdBQUc7b0JBQy9CLElBQUksT0FBTyxTQUFTOzs7b0JBR3BCLFNBQVM7OztvQkFHVCxPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixPQUFPLEtBQUssY0FBYyxRQUFRLENBQUM7b0JBQ25DLE9BQU8sS0FBSyxZQUFZLFFBQVEsQ0FBQztvQkFDakMsT0FBTyxLQUFLLGNBQWMsUUFBUSxTQUFTOzs7Z0JBRy9DLFNBQVMsV0FBVyxZQUFNO29CQUN0QixHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxTQUFTLElBQUk7d0JBQ2IsU0FBUzt3QkFDVCxPQUFPLFNBQVMsUUFBUSxRQUFROzs7O2dCQUl4QyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRywyQkFBMkIsWUFBTTt3QkFDaEMsU0FBUyxZQUFZO3dCQUNyQixTQUFTLElBQUk7d0JBQ2IsU0FBUyxJQUFJO3dC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UyxTQUFTOzRCQUN0QixPQUFPLE9BQU8sUUFBUSxRQUFROzRCQUM5QixPQUFPLE9BQU8sR0FBRyxhQUFhLFFBQVE7NEJBQ3RDLE9BQU8sT0FBTyxHQUFHLGFBQWEsUUFBUTs7OztvQkFJOUMsU0FBUyxVQUFVLFlBQU07d0JBQ3JCLEdBQUcsK0JBQStCLFlBQU07NEJBQ3BDLFNBQVMsU0FBUzs0QkFDbEIsU0FBUyxJQUFJOzRCQUNiLE9BQU8sU0FBUyxRQUFRLFFBQVE7Ozt3QkFHcEMsR0FBRyxpRUFBaUUsWUFBTTs0QkFDdEUsU0FBUyxTQUFTOzRCQUNsQixTQUFTLE9BQU87NEJBQ2hCLFNBQVMsSUFBSTs0QkFDYixPQUFPLFNBQVMsUUFBUSxRQUFROzs7O29CQUl4QyxTQUFTLHFDQUFxQyxZQUFNO3dCQUNoRCxHQUFHLGlGQUFpRixZQUFNOzRCQUN0RixTQUFTLFNBQVM7NEJBQ2xCLFNBQVMsT0FBTzs0QkFDaEIsSUFBSSxrQkFBa0IsU0FBUzs0QkFDL0IsT0FBTyxnQkFBZ0IsUUFBUSxRQUFROzRCQUN2QyxJQUFJLGlCQUFpQixnQkFBZ0I7NEJBQ3JDLE9BQU8sZUFBZSxjQUFjLFFBQVEsVUFBVTs0QkFDdEQsT0FBTyxlQUFlLFlBQVksUUFBUSxDQUFDOzRCQUMzQyxPQUFPLGVBQWUsV0FBVyxRQUFROzs7d0JBRzdDLEdBQUcsdUZBQXVGLFlBQU07NEJBQzVGLFNBQVMsU0FBUzs0QkFDbEIsU0FBUyxPQUFPOzRCQUNoQixJQUFJLGtCQUFrQixTQUFTOzRCQUMvQixPQUFPLGdCQUFnQixRQUFRLFFBQVE7NEJBQ3ZDLElBQUksaUJBQWlCLGdCQUFnQjs0QkFDckMsT0FBTyxlQUFlLGNBQWMsSUFBSTs0QkFDeEMsT0FBTyxlQUFlLFNBQVMsUUFBUSxDQUFDOzRCQUN4QyxPQUFPLGVBQWUsV0FBVyxRQUFROzs7Ozs7O0dBa0J0RCIsImZpbGUiOiJjb21tb24vZGF0YXZpZXcvc2VsZWN0aW9uL1NlbGVjdGlvbk1vZGVsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBzZWxlY3Rpb25Nb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L3NlbGVjdGlvbi9TZWxlY3Rpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnU2VsZWN0aW9uTW9kZWwnLCAoKSA9PiB7XG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbShpZCkge1xuICAgICAgICByZXR1cm4geyBpZDogaWQgfTtcbiAgICB9XG5cbiAgICBsZXQgaXRlbTEgPSBjcmVhdGVJdGVtKCcxJyksXG4gICAgICAgIGl0ZW0yID0gY3JlYXRlSXRlbSgnMicpLFxuICAgICAgICBzZWxNb2RlbCxcbiAgICAgICAgU2VsZWN0aW9uTW9kZWw7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShzZWxlY3Rpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9TZWxlY3Rpb25Nb2RlbF8pIHtcbiAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBfU2VsZWN0aW9uTW9kZWxfO1xuICAgICAgICBzZWxNb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpO1xuICAgIH0pKTtcblxuICAgIGl0KCdjbG9uZSgpIG1ha2VzIGEgZGVlcCBjb3B5IG9mIHRoZSBTZWxlY3Rpb25Nb2RlbCcsICgpID0+IHtcbiAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgc2VsTW9kZWwuZmlsdGVyVmFsdWVzID0gWzEsIDIsIDNdO1xuICAgICAgICBsZXQgY29weSA9IHNlbE1vZGVsLmNsb25lKCk7XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIG9yaWdpbmFsIG1vZGVsLlxuICAgICAgICBzZWxNb2RlbC5jbGVhcigpO1xuXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBjbG9uZSBkaWRuJ3QgZ2V0IG1vZGlmaWVkLlxuICAgICAgICBleHBlY3QoY29weS5zaXplKCkpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChjb3B5LmdldEl0ZW1JZHMoKSkudG9FcXVhbChbJzEnXSk7XG4gICAgICAgIGV4cGVjdChjb3B5LmdldEl0ZW1zKCkpLnRvRXF1YWwoW2l0ZW0xXSk7XG4gICAgICAgIGV4cGVjdChjb3B5LmZpbHRlclZhbHVlcykudG9FcXVhbChzZWxNb2RlbC5maWx0ZXJWYWx1ZXMpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NsZWFyKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjbGVhcnMgdGhlIGl0ZW1zIGFuZCBzZXRzIHNpemUgdG8gemVybycsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtMSk7XG4gICAgICAgICAgICBzZWxNb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLnNpemUoKSkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VsZWN0QWxsKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIGlzSW5jbHVkZSB0byBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmlzSW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtMik7XG4gICAgICAgICAgICBzZWxNb2RlbC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5zaXplKCkpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJbmNsdWRlKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNTZWxlY3RBbGwoKScsICgpID0+IHtcbiAgICAgICAgaXQgKCdyZXR1cm5zIHRydWUgaWYgaXNJbmNsdWRlIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsTW9kZWwuaXNJbmNsdWRlID0gZmFsc2U7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNTZWxlY3RBbGwoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgaXNJbmNsdWRlIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5pc0luY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmlzU2VsZWN0QWxsKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZWxlY3RBbGwoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2dldE5lZ2F0aXZlU2VsZWN0aW9ucyBub3QgZW1wdHkgd2l0aCBpc0luY2x1ZGUgPSBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmlzSW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtMik7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ2V0TmVnYXRpdmVTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmdldFNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdnZXRTZWxlY3Rpb25zIG5vdCBlbXB0eSB3aXRoIGlzSW5jbHVkZSA9IHRydWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5pc0luY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtMik7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnc2l6ZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVwb3J0cyB0aGUgY29ycmVjdCBzaXplIGV2ZW4gaWYgZHVwbGljYXRlIGFkZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5zaXplKCkpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoaXRlbTEpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLnNpemUoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtMSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuc2l6ZSgpKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNTZWxlY3Rpb25zKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIGluZGl2aWR1YWwgc2VsZWN0aW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmNsZWFyKCk7XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoaXRlbTEpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmhhc1NlbGVjdGlvbnMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhIHNlbGVjdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5jbGVhcigpO1xuICAgICAgICAgICAgc2VsTW9kZWwuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaGFzU2VsZWN0aW9ucygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gc2VsZWN0aW9ucyBvciBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgc2VsTW9kZWwuY2xlYXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5oYXNTZWxlY3Rpb25zKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0l0ZW1TZWxlY3RlZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGlzIHNlbGVjdCBhbGwgd2l0aCBpdGVtIG5vdCBpbiBzZWxlY3Rpb24gbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKHtcbiAgICAgICAgICAgICAgICBpZDogJzk5OTknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5pc0l0ZW1TZWxlY3RlZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSkpLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgaXMgc2VsZWN0IGFsbCB3aXRoIGl0ZW0gaW4gc2VsZWN0aW9uIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtU2VsZWN0ZWQoe1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBub3Qgc2VsZWN0IGFsbCB3aXRoIGl0ZW0gaW4gc2VsZWN0aW9uIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoe1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmlzSXRlbVNlbGVjdGVkKHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnXG4gICAgICAgICAgICB9KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IHNlbGVjdCBhbGwgd2l0aCBpdGVtIG5vdCBpbiBzZWxlY3Rpb24gbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICc5OTk5J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtU2VsZWN0ZWQoe1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcbiAgICAgICAgICAgIH0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNJdGVtSWRTZWxlY3RlZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGlzIHNlbGVjdCBhbGwgd2l0aCBpdGVtIGlkIG5vdCBpbiBzZWxlY3Rpb24gbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKHtcbiAgICAgICAgICAgICAgICBpZDogJzk5OTknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5pc0l0ZW1JZFNlbGVjdGVkKCcxMjM0JykpLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgaXMgc2VsZWN0IGFsbCB3aXRoIGl0ZW0gaWQgaW4gc2VsZWN0aW9uIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtSWRTZWxlY3RlZCgnMTIzNCcpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBub3Qgc2VsZWN0IGFsbCB3aXRoIGl0ZW0gaWQgaW4gc2VsZWN0aW9uIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoe1xuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmlzSXRlbUlkU2VsZWN0ZWQoJzEyMzQnKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm90IHNlbGVjdCBhbGwgd2l0aCBpdGVtIGlkIG5vdCBpbiBzZWxlY3Rpb24gbGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICc5OTk5J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtSWRTZWxlY3RlZCgnMTIzNCcpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZmlsdGVyU2VsZWN0aW9ucygpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVtb3ZlcyBpdGVtcyB0aGF0IHRoZSBwYXNzZWQgZnVuY3Rpb24gcmV0dXJuIHRydWUgZm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gW3tcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaWQ6ICc1Njc4J1xuICAgICAgICAgICAgfV07XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoaXRlbXNbMF0pO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW1zWzFdKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmZpbHRlclNlbGVjdGlvbnMoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGl0ZW0uaWQgPT09IGl0ZW1zWzBdLmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmlzSXRlbVNlbGVjdGVkKGl0ZW1zWzBdKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtU2VsZWN0ZWQoaXRlbXNbMV0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgcmVtb3ZlIGFueXRoaW5nIGlmIGlzSW5jbHVkZSBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IFt7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiAnNTY3OCdcbiAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgc2VsTW9kZWwuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICBzZWxNb2RlbC5hZGQoaXRlbXNbMF0pO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW1zWzFdKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmZpbHRlclNlbGVjdGlvbnMoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGl0ZW0uaWQgPT09IGl0ZW1zWzBdLmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gVGhlc2Ugd2lsbCBiZSBmYWxzZSBzaW5jZSB0aGV5IGFyZSBuZWdhdGl2ZSBzZWxlY3Rpb25zLlxuICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmlzSXRlbVNlbGVjdGVkKGl0ZW1zWzBdKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuaXNJdGVtU2VsZWN0ZWQoaXRlbXNbMV0pKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIHNlbGVjdGlvbiBtb2RlbCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IFt7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlkOiAnNTY3OCdcbiAgICAgICAgICAgIH1dLCBuZXdTZWxNb2RlbDtcbiAgICAgICAgICAgIHNlbE1vZGVsLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGl0ZW1zWzBdKTtcbiAgICAgICAgICAgIHNlbE1vZGVsLmFkZChpdGVtc1sxXSk7XG4gICAgICAgICAgICBuZXdTZWxNb2RlbCA9IHNlbE1vZGVsLmZpbHRlclNlbGVjdGlvbnMoKCkgPT4geyByZXR1cm4gZmFsc2U7IH0pO1xuICAgICAgICAgICAgZXhwZWN0KG5ld1NlbE1vZGVsKS50b0VxdWFsKHNlbE1vZGVsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ3JvdXBzJywgKCkgPT4ge1xuICAgICAgICBsZXQgZ29vZEdyb3VwLCBiYWRHcm91cCwgZ29vZEl0ZW0xLCBnb29kSXRlbTIsIGJhZEl0ZW0sXG4gICAgICAgICAgICBSZXN1bHRHcm91cDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Jlc3VsdEdyb3VwXykgPT4ge1xuICAgICAgICAgICAgUmVzdWx0R3JvdXAgPSBfUmVzdWx0R3JvdXBfO1xuICAgICAgICAgICAgZ29vZEdyb3VwID0gbmV3IFJlc3VsdEdyb3VwKHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlzR29vZDogJ3llcyEnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb3VudDogMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBiYWRHcm91cCA9IG5ldyBSZXN1bHRHcm91cCh7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICBpc0dvb2Q6ICdOTz8nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvYmplY3RJZHM6IFsnMTIzNCcsICc1Njc4J11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ29vZEl0ZW0xID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnYWJjZCcsXG4gICAgICAgICAgICAgICAgaXNHb29kOiAneWVzISdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnb29kSXRlbTIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICdoaGhoJyxcbiAgICAgICAgICAgICAgICBpc0dvb2Q6ICd5ZXMhJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJhZEl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBpc0dvb2Q6ICdOTz8nXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2FkZEdyb3VwKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgnYWRkcyBhIG5ldyBncm91cCBpZiBub25lIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuYWRkR3JvdXAoZ29vZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ3JvdXBzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgYWRkIGEgZ3JvdXAgaWYgYWxyZWFkeSBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5ncm91cHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZW1vdmVzIG92ZXJsYXBwaW5nIGl0ZW1zIGlmIHRoZXkgbWF0Y2ggdGhlIGdyb3VwJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmlzSW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZChnb29kSXRlbTEpO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZChnb29kSXRlbTIpO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmdldEl0ZW1zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5ncm91cHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdyZW1vdmVHcm91cCgpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgdGhlIGdyb3VwIGlmIG1hdGNoaW5nIG9uZSBleGlzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwuYWRkR3JvdXAoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwucmVtb3ZlR3JvdXAoZ29vZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ3JvdXBzLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnZG9lcyBub3QgcmVtb3ZlIGFueXRoaW5nIGlmIG5vIGdyb3VwIG1hdGNoZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwuYWRkR3JvdXAoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwucmVtb3ZlR3JvdXAoYmFkR3JvdXApKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ3JvdXBzLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnYWRkKCknLCAoKSA9PiB7XG4gICAgICAgICAgICBpdCgncmVtb3ZlcyBpdGVtIGZyb20gYSBtYXRjaGluZyBncm91cCBzZWxlY3Rpb24gbW9kZWwgaWYgb25lIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChnb29kR3JvdXApO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmdldEdyb3VwU2VsZWN0aW9uTW9kZWwoZ29vZEdyb3VwKS5hZGQoZ29vZEl0ZW0xKTtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGQoZ29vZEl0ZW0xKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ2V0R3JvdXBTZWxlY3Rpb25Nb2RlbChnb29kR3JvdXApLmhhc0l0ZW0oZ29vZEl0ZW0xKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3JlbW92ZSgpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ2FkZHMgaXRlbSB0byBhIG1hdGNoaW5nIGdyb3VwIHNlbGVjdGlvbiBtb2RlbCBpZiBvbmUgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwucmVtb3ZlKGdvb2RJdGVtMSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmdldEdyb3VwU2VsZWN0aW9uTW9kZWwoZ29vZEdyb3VwKS5oYXNJdGVtKGdvb2RJdGVtMSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2dldEdyb3VwU2VsZWN0aW9uTW9kZWwoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHNlbGVjdGlvbk1vZGVsIGlmIGdyb3VwIG1hdGNoZXMgYW4gZW50cnknLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwuYWRkR3JvdXAoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuZ2V0R3JvdXBTZWxlY3Rpb25Nb2RlbChnb29kR3JvdXApKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBncm91cCBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmdldEdyb3VwU2VsZWN0aW9uTW9kZWwoYmFkR3JvdXApKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaGFzR3JvdXAoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYSBncm91cCBleGlzdHMgdGhhdCBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbE1vZGVsLmhhc0dyb3VwKGdvb2RHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gZ3JvdXAgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChnb29kR3JvdXApO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5oYXNHcm91cChiYWRHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRHcm91cCgpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3JldHVybnMgdGhlIGdyb3VwIHRoYXQgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChnb29kR3JvdXApO1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZEdyb3VwID0gc2VsTW9kZWwuZ2V0R3JvdXAoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZm91bmRHcm91cCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZm91bmRHcm91cC5yZXN1bHRHcm91cCkudG9FcXVhbChnb29kR3JvdXApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiBubyBncm91cCBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kR3JvdXAgPSBzZWxNb2RlbC5nZXRHcm91cChiYWRHcm91cCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZvdW5kR3JvdXApLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdnZXRHcm91cHMoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRoZSBncm91cHMnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwuYWRkR3JvdXAoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChiYWRHcm91cCk7XG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwcyA9IHNlbE1vZGVsLmdldEdyb3VwcygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChncm91cHMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChncm91cHNbMF0ucmVzdWx0R3JvdXApLnRvRXF1YWwoZ29vZEdyb3VwKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZ3JvdXBzWzFdLnJlc3VsdEdyb3VwKS50b0VxdWFsKGJhZEdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnc2l6ZSgpJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ2luY2x1ZGVzIHRoZSBzaXplIG9mIGdyb3VwcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChnb29kR3JvdXApO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZChiYWRJdGVtKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsTW9kZWwuc2l6ZSgpKS50b0VxdWFsKDMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBpbmNsdWRlIGl0ZW1zIHRoYXQgYXJlIGluIHRoZSBncm91cCBzZWxlY3Rpb24gbW9kZWwgJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLmFkZEdyb3VwKGdvb2RHcm91cCk7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwucmVtb3ZlKGdvb2RJdGVtMik7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwuYWRkKGJhZEl0ZW0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxNb2RlbC5zaXplKCkpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2dldENvbXBsZXRlR3JvdXBTZWxlY3Rpb25Nb2RlbHMoKScsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdjb252ZXJ0cyBncm91cHMgd2l0aG91dCBvYmplY3QgaWRzIHRvIHNlbGVjdCBhbGwgc2VsZWN0aW9uIG1vZGVsIHdpdGggZmlsdGVycycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChnb29kR3JvdXApO1xuICAgICAgICAgICAgICAgIHNlbE1vZGVsLnJlbW92ZShnb29kSXRlbTEpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbHMgPSBzZWxNb2RlbC5nZXRDb21wbGV0ZUdyb3VwU2VsZWN0aW9uTW9kZWxzKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbk1vZGVscy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gc2VsZWN0aW9uTW9kZWxzWzBdO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25Nb2RlbC5maWx0ZXJWYWx1ZXMpLnRvRXF1YWwoZ29vZEdyb3VwLmZpbHRlclZhbHVlcyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbk1vZGVsLmdldEl0ZW1zKCkpLnRvRXF1YWwoW2dvb2RJdGVtMV0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25Nb2RlbC5pc0luY2x1ZGUpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdjb252ZXJ0cyBncm91cHMgd2l0aCBvYmplY3QgaWRzIHRvIG5vbi1zZWxlY3QgYWxsIHNlbGVjdGlvbiBtb2RlbCB3aXRoIGluY2x1ZGVkIGlkcycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxNb2RlbC5hZGRHcm91cChiYWRHcm91cCk7XG4gICAgICAgICAgICAgICAgc2VsTW9kZWwucmVtb3ZlKGJhZEl0ZW0pO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbHMgPSBzZWxNb2RlbC5nZXRDb21wbGV0ZUdyb3VwU2VsZWN0aW9uTW9kZWxzKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbk1vZGVscy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gc2VsZWN0aW9uTW9kZWxzWzBdO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25Nb2RlbC5maWx0ZXJWYWx1ZXMpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25Nb2RlbC5pdGVtSWRzKS50b0VxdWFsKFsnNTY3OCddKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2VsZWN0aW9uTW9kZWwuaXNJbmNsdWRlKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
