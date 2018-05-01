System.register(['test/js/TestInitializer', 'common/dataview/selection/SelectionModule'], function (_export) {
    'use strict';

    var selectionModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewSelectionSelectionModule) {
            selectionModule = _commonDataviewSelectionSelectionModule['default'];
        }],
        execute: function () {

            describe('CheckboxMultiSelect', function () {
                function createItem(id) {
                    return { id: id };
                }

                var item1 = createItem('1'),
                    item2 = createItem('2'),
                    item3 = createItem('3'),
                    item4 = createItem('4'),
                    item5 = createItem('5'),
                    CheckboxMultiSelect = undefined,
                    check = undefined,
                    context = undefined,
                    total = undefined,
                    items = undefined;

                beforeEach(module(selectionModule));

                beforeEach(inject(function (_CheckboxMultiSelect_) {
                    CheckboxMultiSelect = _CheckboxMultiSelect_;

                    // Have 5 total items with only 3 on the page.
                    total = 5;
                    items = [item1, item2, item3];

                    // Create a mock SelectionContext to attach to.
                    context = {
                        getPageState: function () {
                            return {
                                pagingData: {
                                    getTotal: function () {
                                        return total;
                                    }
                                }
                            };
                        },

                        items: items
                    };

                    check = new CheckboxMultiSelect();
                    check.attach(context);
                }));

                describe('starts with', function () {
                    it('select all unchecked', function () {
                        expect(check.isSelectAll()).toEqual(false);
                    });

                    it('no selections', function () {
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
                    });

                    it('no negative selections', function () {
                        expect(check.getSelectionModel().getNegativeSelections().length).toEqual(0);
                    });
                });

                describe('select all', function () {
                    it('sets select all', function () {
                        check.selectAll();
                        expect(check.isSelectAll()).toEqual(true);
                    });

                    it('clears existing selections', function () {
                        check.selectItem(item1);
                        check.selectAll();
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
                    });
                });

                describe('select page', function () {
                    it('yonks if not attached', function () {
                        var unattached = new CheckboxMultiSelect();
                        expect(function () {
                            unattached.selectPage();
                        }).toThrow();
                    });

                    describe('when all selected', function () {
                        it('retains select all', function () {
                            check.selectAll();
                            check.selectPage();
                            expect(check.isSelectAll()).toEqual(true);
                        });

                        it('adds negative selections on current page', function () {
                            check.selectAll();
                            check.deselectItem(item1);
                            check.selectPage();
                            expect(check.getSelectionModel().getNegativeSelections().length).toEqual(0);
                            expect(check.isSelected(item1)).toEqual(true);
                        });
                    });

                    describe('when all not selected', function () {
                        it('adds all items on fully unselected page', function () {
                            check.selectPage();
                            expect(check.isSelected(item1)).toEqual(true);
                            expect(check.isSelected(item2)).toEqual(true);
                            expect(check.isSelected(item3)).toEqual(true);
                            expect(check.isSelected(item4)).toEqual(false);
                            expect(check.isSelected(item5)).toEqual(false);
                        });

                        it('adds all unselected items on the page if some are selected', function () {
                            check.selectItem(item1);
                            check.selectItem(item2);
                            check.selectPage();
                            expect(check.isSelected(item1)).toEqual(true);
                            expect(check.isSelected(item2)).toEqual(true);
                            expect(check.isSelected(item3)).toEqual(true);
                            expect(check.isSelected(item4)).toEqual(false);
                            expect(check.isSelected(item5)).toEqual(false);
                        });
                    });
                });

                describe('deselect page', function () {
                    it('yonks if not attached', function () {
                        var unattached = new CheckboxMultiSelect();
                        expect(function () {
                            unattached.deselectPage();
                        }).toThrow();
                    });

                    describe('when all selected', function () {
                        it('retains select all', function () {
                            check.selectAll();
                            check.deselectPage();
                            expect(check.isSelectAll()).toEqual(true);
                        });
                    });

                    describe('when all not selected', function () {
                        it('does nothing if nothing is selected', function () {
                            check.deselectPage();
                            expect(check.getSelectionModel().getSelections().length).toEqual(0);
                        });

                        it('removes all selected items on the page', function () {
                            check.selectItem(item1);
                            check.deselectPage();
                            expect(check.isSelected(item1)).toEqual(false);
                            expect(check.isSelected(item2)).toEqual(false);
                            expect(check.isSelected(item3)).toEqual(false);
                        });

                        it('does not deselect items on another page', function () {
                            check.selectItem(item4);
                            check.deselectPage();
                            expect(check.isSelected(item4)).toEqual(true);
                        });
                    });
                });

                describe('is page fully selected', function () {
                    it('yonks if not attached', function () {
                        var unattached = new CheckboxMultiSelect();
                        expect(function () {
                            unattached.isCurrentPageFullySelected();
                        }).toThrow();
                    });

                    it('returns false on an empty page', function () {
                        // Fake up an empty page.
                        context.items = [];
                        expect(check.isCurrentPageFullySelected()).toEqual(false);
                    });

                    it('returns false if not all items are selected', function () {
                        expect(check.isCurrentPageFullySelected()).toEqual(false);
                    });

                    it('returns true if all items individually selected', function () {
                        check.selectItem(item1);
                        check.selectItem(item2);
                        check.selectItem(item3);
                        expect(check.isCurrentPageFullySelected()).toEqual(true);
                    });

                    it('returns true if select all', function () {
                        check.selectAll();
                        expect(check.isCurrentPageFullySelected()).toEqual(true);
                    });

                    it('returns false if all selected but negative selections exist on the page', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        expect(check.isCurrentPageFullySelected()).toEqual(false);
                    });

                    it('returns true after selecting page', function () {
                        check.selectPage();
                        expect(check.isCurrentPageFullySelected()).toEqual(true);
                    });
                });

                describe('select item', function () {
                    it('yaks if no id is given', function () {
                        expect(function () {
                            check.selectItem(null);
                        }).toThrow();
                    });

                    it('removes a negative selection if select all', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        expect(check.getSelectionModel().getNegativeSelections().length).toEqual(1);
                        check.selectItem(item1);
                        expect(check.getSelectionModel().getNegativeSelections().length).toEqual(0);
                    });

                    it('adds a selection', function () {
                        check.selectItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(1);
                    });

                    it('does nothing if the item is already selected', function () {
                        check.selectItem(item1);
                        check.selectItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(1);
                    });
                });

                describe('deselect item', function () {
                    it('yaks if no id is given', function () {
                        expect(function () {
                            check.deselectItem(null);
                        }).toThrow();
                    });

                    it('adds a negative selection if select all', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        expect(check.getSelectionModel().getNegativeSelections().length).toEqual(1);
                    });

                    it('removes a selection', function () {
                        check.selectItem(item1);
                        check.deselectItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
                    });

                    it('does nothing if the item is not selected', function () {
                        check.deselectItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
                    });
                });

                describe('toggle item', function () {
                    it('yaks if no id is given', function () {
                        expect(function () {
                            check.toggleItem(null);
                        }).toThrow();
                    });

                    it('adds a selection if not selected', function () {
                        check.toggleItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(1);
                    });

                    it('removes a selection if selected', function () {
                        check.selectItem(item1);
                        check.toggleItem(item1);
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
                    });

                    describe('when all selected', function () {
                        it('removes a negative selection if unselected', function () {
                            check.selectAll();
                            check.deselectItem(item1);
                            expect(check.getSelectionModel().getNegativeSelections().length).toEqual(1);
                            check.toggleItem(item1);
                            expect(check.getSelectionModel().getNegativeSelections().length).toEqual(0);
                        });

                        it('adds a negative selection if selected', function () {
                            check.selectAll();
                            check.toggleItem(item1);
                            expect(check.getSelectionModel().getNegativeSelections().length).toEqual(1);
                        });
                    });
                });

                describe('is selected', function () {
                    it('barfs if no id is given', function () {
                        expect(function () {
                            check.isSelected(null);
                        }).toThrow();
                    });

                    it('returns true if all selected', function () {
                        check.selectAll();
                        expect(check.isSelected(item1)).toEqual(true);
                        expect(check.isSelected(item5)).toEqual(true);
                    });

                    it('returns false if all selected and the item has a negative selection', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        expect(check.isSelected(item1)).toEqual(false);
                    });

                    it('returns false if the item is not selected', function () {
                        expect(check.isSelected(item1)).toEqual(false);
                    });

                    it('returns true if the item is selected', function () {
                        check.selectItem(item1);
                        expect(check.isSelected(item1)).toEqual(true);
                    });
                });

                describe('get selections', function () {
                    it('returns an empty array if nothing is selected', function () {
                        expect(check.getSelectionModel().getSelections()).toEqual([]);
                    });

                    it('returns an empty array if all selected', function () {
                        check.selectAll();
                        expect(check.getSelectionModel().getSelections()).toEqual([]);
                    });

                    it('returns the selections', function () {
                        check.selectItem(item1);
                        check.selectItem(item2);
                        var selections = check.getSelectionModel().getSelections();
                        expect(selections.length).toEqual(2);
                        expect(selections).toContain(item1);
                        expect(selections).toContain(item2);
                    });
                });

                describe('get negative selections', function () {
                    it('returns an empty array if all not selected', function () {
                        expect(check.getSelectionModel().getNegativeSelections()).toEqual([]);
                    });

                    it('returns an empty array if all selected and no negative selections', function () {
                        check.selectAll();
                        expect(check.getSelectionModel().getNegativeSelections()).toEqual([]);
                    });

                    it('returns the negative selections if all selected', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        check.deselectItem(item2);
                        var selections = check.getSelectionModel().getNegativeSelections();
                        expect(selections.length).toEqual(2);
                        expect(selections).toContain(item1);
                        expect(selections).toContain(item2);
                    });
                });

                describe('selection count', function () {
                    it('lurches if not attached and all selected', function () {
                        var unattached = new CheckboxMultiSelect();
                        unattached.selectAll();
                        expect(function () {
                            unattached.getSelectionCount();
                        }).toThrow();
                    });

                    describe('when all selected', function () {
                        it('returns total if no negative selections', function () {
                            check.selectAll();
                            expect(check.getSelectionCount()).toEqual(5);
                        });

                        it('returns correct count if there are negative selections', function () {
                            check.selectAll();
                            check.deselectItem(item1);
                            expect(check.getSelectionCount()).toEqual(4);
                        });
                    });

                    it('returns zero if nothing selected', function () {
                        expect(check.getSelectionCount()).toEqual(0);
                    });

                    it('returns number of selections', function () {
                        check.selectItem(item1);
                        check.selectItem(item2);
                        expect(check.getSelectionCount()).toEqual(2);
                    });
                });

                describe('clear selections', function () {
                    it('sets select all to false if all selected', function () {
                        check.selectAll();
                        check.getSelectionModel().clear();
                        expect(check.isSelectAll()).toEqual(false);
                    });

                    it('clears negative selections if all selected', function () {
                        check.selectAll();
                        check.deselectItem(item1);
                        check.getSelectionModel().clear();
                        expect(check.getSelectionModel().getNegativeSelections().length).toEqual(0);
                    });

                    it('clears selections', function () {
                        check.selectItem(item1);
                        check.selectItem(item2);
                        check.getSelectionModel().clear();
                        expect(check.getSelectionModel().getSelections().length).toEqual(0);
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
                            objectIds: ['1234'],
                            count: 1
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

                    describe('isGroupSelected()', function () {
                        it('returns true if group is added to non-select all', function () {
                            check.toggleGroup(goodGroup);
                            expect(check.isGroupSelected(goodGroup)).toEqual(true);
                        });

                        it('returns false if group is not added ', function () {
                            check.toggleGroup(goodGroup);
                            expect(check.isGroupSelected(badGroup)).toEqual(false);
                        });

                        it('returns true if all group items are selected and non-select all', function () {
                            check.toggleItem(goodItem1);
                            check.toggleItem(goodItem2);
                            expect(check.isGroupSelected(goodGroup)).toEqual(true);
                        });

                        it('returns false if group is selected with a negative selection in the group', function () {
                            check.toggleGroup(goodGroup);
                            check.toggleItem(goodItem1);
                            expect(check.isGroupSelected(goodGroup)).toEqual(false);
                        });

                        it('returns false if only some items in the group are selected', function () {
                            check.toggleItem(goodItem1);
                            expect(check.isGroupSelected(goodGroup)).toEqual(false);
                        });

                        it('returns true if select all with no groups', function () {
                            check.selectAll();
                            expect(check.isGroupSelected(goodGroup)).toEqual(true);
                        });

                        it('returns false if select all with group unselected', function () {
                            check.selectAll();
                            check.toggleGroup(goodGroup);
                            expect(check.isGroupSelected(goodGroup)).toEqual(false);
                        });

                        it('returns false if select all with one item in group unselected', function () {
                            check.selectAll();
                            check.toggleItem(goodItem1);
                            expect(check.isGroupSelected(goodGroup)).toEqual(false);
                        });
                    });

                    describe('toggleGroup()', function () {
                        it('adds group if not selected', function () {
                            check.toggleGroup(goodGroup);
                            expect(check.selectionModel.hasGroup(goodGroup)).toEqual(true);
                        });

                        it('removes group if selected', function () {
                            check.toggleGroup(goodGroup);
                            check.toggleGroup(goodGroup);
                            expect(check.selectionModel.hasGroup(goodGroup)).toEqual(false);
                        });

                        it('clears old group and adds group if partially selected and not select all', function () {
                            check.toggleGroup(goodGroup);
                            check.toggleItem(goodItem1);
                            check.toggleGroup(goodGroup);
                            expect(check.selectionModel.hasGroup(goodGroup)).toEqual(true);
                        });

                        it('clears old group and does not add group if partially selected and select all', function () {
                            check.selectAll();
                            check.toggleGroup(goodGroup);
                            check.toggleItem(goodItem1);
                            check.toggleGroup(goodGroup);
                            expect(check.selectionModel.hasGroup(goodGroup)).toEqual(false);
                        });

                        it('clears all items from the group if selected without group in the model', function () {
                            check.toggleItem(goodItem1);
                            check.toggleItem(goodItem2);
                            expect(check.isGroupSelected(goodGroup)).toEqual(true);
                            check.toggleGroup(goodGroup);
                            expect(check.isGroupSelected(goodGroup)).toEqual(false);
                            expect(check.selectionModel.size()).toEqual(0);
                        });

                        it('selects group if group is selected after all items were unselected individually and this is a select ' + 'all', function () {
                            check.selectAll();
                            check.toggleItem(badItem);
                            expect(check.isGroupSelected(badGroup)).toEqual(false);
                            check.toggleGroup(badGroup);
                            expect(check.isGroupSelected(badGroup)).toEqual(true);
                        });

                        it('unselects group if group was excluded then all individual items were included individually, then' + ' group is toggled again, and this is a select all (phew)', function () {
                            check.selectAll();
                            check.toggleGroup(badGroup);
                            check.toggleItem(badItem);
                            expect(check.isGroupSelected(badGroup)).toEqual(true);
                            check.toggleGroup(badGroup);
                            expect(check.isGroupSelected(badGroup)).toEqual(false);
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9zZWxlY3Rpb24vQ2hlY2tib3hNdWx0aVNlbGVjdFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw4Q0FBOEMsVUFBVSxTQUFTO0lBQ3pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5Q0FBeUM7WUFDL0Ysa0JBQWtCLHdDQUF3Qzs7UUFFOUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLHVCQUF1QixZQUFNO2dCQUNsQyxTQUFTLFdBQVcsSUFBSTtvQkFDcEIsT0FBTyxFQUFFLElBQUk7OztnQkFHakIsSUFBSSxRQUFRLFdBQVc7b0JBQ25CLFFBQVEsV0FBVztvQkFDbkIsUUFBUSxXQUFXO29CQUNuQixRQUFRLFdBQVc7b0JBQ25CLFFBQVEsV0FBVztvQkFDbkIsc0JBQW1CO29CQUFFLFFBQUs7b0JBQUUsVUFBTztvQkFBRSxRQUFLO29CQUFFLFFBQUs7O2dCQUVyRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyx1QkFBdUI7b0JBQzlDLHNCQUFzQjs7O29CQUd0QixRQUFRO29CQUNSLFFBQVEsQ0FDSixPQUNBLE9BQ0E7OztvQkFJSixVQUFVO3dCQUNOLGNBQWMsWUFBVzs0QkFDckIsT0FBTztnQ0FDSCxZQUFZO29DQUNSLFVBQVUsWUFBTTt3Q0FBRSxPQUFPOzs7Ozs7d0JBS3JDLE9BQU87OztvQkFHWCxRQUFRLElBQUk7b0JBQ1osTUFBTSxPQUFPOzs7Z0JBR2pCLFNBQVMsZUFBZSxZQUFNO29CQUMxQixHQUFHLHdCQUF3QixZQUFNO3dCQUM3QixPQUFPLE1BQU0sZUFBZSxRQUFROzs7b0JBR3hDLEdBQUcsaUJBQWlCLFlBQU07d0JBQ3RCLE9BQU8sTUFBTSxvQkFBb0IsZ0JBQWdCLFFBQVEsUUFBUTs7O29CQUdyRSxHQUFHLDBCQUEwQixZQUFNO3dCQUMvQixPQUFPLE1BQU0sb0JBQW9CLHdC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QUFXLFFBQVE7NEJBQ2hELE1BQU0sWUFBWTs0QkFDbEIsT0FBTyxNQUFNLGdCQUFnQixXQUFXLFFBQVE7Ozs7Ozs7R0FrQzdEIiwiZmlsZSI6ImNvbW1vbi9kYXRhdmlldy9zZWxlY3Rpb24vQ2hlY2tib3hNdWx0aVNlbGVjdFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBzZWxlY3Rpb25Nb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L3NlbGVjdGlvbi9TZWxlY3Rpb25Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0NoZWNrYm94TXVsdGlTZWxlY3QnLCAoKSA9PiB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgaWQ6IGlkIH07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGl0ZW0xID0gY3JlYXRlSXRlbSgnMScpLFxyXG4gICAgICAgIGl0ZW0yID0gY3JlYXRlSXRlbSgnMicpLFxyXG4gICAgICAgIGl0ZW0zID0gY3JlYXRlSXRlbSgnMycpLFxyXG4gICAgICAgIGl0ZW00ID0gY3JlYXRlSXRlbSgnNCcpLFxyXG4gICAgICAgIGl0ZW01ID0gY3JlYXRlSXRlbSgnNScpLFxyXG4gICAgICAgIENoZWNrYm94TXVsdGlTZWxlY3QsIGNoZWNrLCBjb250ZXh0LCB0b3RhbCwgaXRlbXM7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoc2VsZWN0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NoZWNrYm94TXVsdGlTZWxlY3RfKSB7XHJcbiAgICAgICAgQ2hlY2tib3hNdWx0aVNlbGVjdCA9IF9DaGVja2JveE11bHRpU2VsZWN0XztcclxuXHJcbiAgICAgICAgLy8gSGF2ZSA1IHRvdGFsIGl0ZW1zIHdpdGggb25seSAzIG9uIHRoZSBwYWdlLlxyXG4gICAgICAgIHRvdGFsID0gNTtcclxuICAgICAgICBpdGVtcyA9IFtcclxuICAgICAgICAgICAgaXRlbTEsXHJcbiAgICAgICAgICAgIGl0ZW0yLFxyXG4gICAgICAgICAgICBpdGVtM1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG1vY2sgU2VsZWN0aW9uQ29udGV4dCB0byBhdHRhY2ggdG8uXHJcbiAgICAgICAgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgZ2V0UGFnZVN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5nRGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRUb3RhbDogKCkgPT4geyByZXR1cm4gdG90YWw7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaXRlbXM6IGl0ZW1zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2hlY2sgPSBuZXcgQ2hlY2tib3hNdWx0aVNlbGVjdCgpO1xyXG4gICAgICAgIGNoZWNrLmF0dGFjaChjb250ZXh0KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnc3RhcnRzIHdpdGgnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3NlbGVjdCBhbGwgdW5jaGVja2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdubyBzZWxlY3Rpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnbm8gbmVnYXRpdmUgc2VsZWN0aW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0TmVnYXRpdmVTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3NlbGVjdCBhbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3NldHMgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdEFsbCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2xlYXJzIGV4aXN0aW5nIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzZWxlY3QgcGFnZScsICgpID0+IHtcclxuICAgICAgICBpdCgneW9ua3MgaWYgbm90IGF0dGFjaGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdW5hdHRhY2hlZCA9IG5ldyBDaGVja2JveE11bHRpU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IHVuYXR0YWNoZWQuc2VsZWN0UGFnZSgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3JldGFpbnMgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0QWxsKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FkZHMgbmVnYXRpdmUgc2VsZWN0aW9ucyBvbiBjdXJyZW50IHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNTZWxlY3RlZChpdGVtMSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2hlbiBhbGwgbm90IHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdCgnYWRkcyBhbGwgaXRlbXMgb24gZnVsbHkgdW5zZWxlY3RlZCBwYWdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTEpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTIpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTMpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW01KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ2FkZHMgYWxsIHVuc2VsZWN0ZWQgaXRlbXMgb24gdGhlIHBhZ2UgaWYgc29tZSBhcmUgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTIpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTEpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTIpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTMpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTQpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW01KSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2Rlc2VsZWN0IHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3lvbmtzIGlmIG5vdCBhdHRhY2hlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVuYXR0YWNoZWQgPSBuZXcgQ2hlY2tib3hNdWx0aVNlbGVjdCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyB1bmF0dGFjaGVkLmRlc2VsZWN0UGFnZSgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3JldGFpbnMgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2suZGVzZWxlY3RQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNTZWxlY3RBbGwoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIGFsbCBub3Qgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgbm90aGluZyBpcyBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVtb3ZlcyBhbGwgc2VsZWN0ZWQgaXRlbXMgb24gdGhlIHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTEpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW0yKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNTZWxlY3RlZChpdGVtMykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBkZXNlbGVjdCBpdGVtcyBvbiBhbm90aGVyIHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW00KTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0UGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpcyBwYWdlIGZ1bGx5IHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd5b25rcyBpZiBub3QgYXR0YWNoZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1bmF0dGFjaGVkID0gbmV3IENoZWNrYm94TXVsdGlTZWxlY3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgdW5hdHRhY2hlZC5pc0N1cnJlbnRQYWdlRnVsbHlTZWxlY3RlZCgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIG9uIGFuIGVtcHR5IHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEZha2UgdXAgYW4gZW1wdHkgcGFnZS5cclxuICAgICAgICAgICAgY29udGV4dC5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suaXNDdXJyZW50UGFnZUZ1bGx5U2VsZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBhbGwgaXRlbXMgYXJlIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suaXNDdXJyZW50UGFnZUZ1bGx5U2VsZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWxsIGl0ZW1zIGluZGl2aWR1YWxseSBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTIpO1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0zKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzQ3VycmVudFBhZ2VGdWxseVNlbGVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc0N1cnJlbnRQYWdlRnVsbHlTZWxlY3RlZCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhbGwgc2VsZWN0ZWQgYnV0IG5lZ2F0aXZlIHNlbGVjdGlvbnMgZXhpc3Qgb24gdGhlIHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBjaGVjay5kZXNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suaXNDdXJyZW50UGFnZUZ1bGx5U2VsZWN0ZWQoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgYWZ0ZXIgc2VsZWN0aW5nIHBhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdFBhZ2UoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzQ3VycmVudFBhZ2VGdWxseVNlbGVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VsZWN0IGl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3lha3MgaWYgbm8gaWQgaXMgZ2l2ZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IGNoZWNrLnNlbGVjdEl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgYSBuZWdhdGl2ZSBzZWxlY3Rpb24gaWYgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldE5lZ2F0aXZlU2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldE5lZ2F0aXZlU2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FkZHMgYSBzZWxlY3Rpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBpdGVtIGlzIGFscmVhZHkgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdkZXNlbGVjdCBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd5YWtzIGlmIG5vIGlkIGlzIGdpdmVuJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBjaGVjay5kZXNlbGVjdEl0ZW0obnVsbCk7IH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2FkZHMgYSBuZWdhdGl2ZSBzZWxlY3Rpb24gaWYgc2VsZWN0IGFsbCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldE5lZ2F0aXZlU2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgYSBzZWxlY3Rpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBjaGVjay5kZXNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBpdGVtIGlzIG5vdCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suZGVzZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0U2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCd0b2dnbGUgaXRlbScsICgpID0+IHtcclxuICAgICAgICBpdCgneWFrcyBpZiBubyBpZCBpcyBnaXZlbicsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgY2hlY2sudG9nZ2xlSXRlbShudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWRkcyBhIHNlbGVjdGlvbiBpZiBub3Qgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVtb3ZlcyBhIHNlbGVjdGlvbiBpZiBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2hlbiBhbGwgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZW1vdmVzIGEgbmVnYXRpdmUgc2VsZWN0aW9uIGlmIHVuc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldE5lZ2F0aXZlU2VsZWN0aW9ucygpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnYWRkcyBhIG5lZ2F0aXZlIHNlbGVjdGlvbiBpZiBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlSXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2lzIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdiYXJmcyBpZiBubyBpZCBpcyBnaXZlbicsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHsgY2hlY2suaXNTZWxlY3RlZChudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW0xKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTUpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhbGwgc2VsZWN0ZWQgYW5kIHRoZSBpdGVtIGhhcyBhIG5lZ2F0aXZlIHNlbGVjdGlvbicsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW0xKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBpdGVtIGlzIG5vdCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzU2VsZWN0ZWQoaXRlbTEpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgaXRlbSBpcyBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdGVkKGl0ZW0xKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXQgc2VsZWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldFNlbGVjdGlvbnMoKSkudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmdldFNlbGVjdGlvbnMoKSkudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBzZWxlY3Rpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMik7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25zID0gY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbnMpLnRvQ29udGFpbihpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3Rpb25zKS50b0NvbnRhaW4oaXRlbTIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldCBuZWdhdGl2ZSBzZWxlY3Rpb25zJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgYWxsIG5vdCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0TmVnYXRpdmVTZWxlY3Rpb25zKCkpLnRvRXF1YWwoW10pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBhbGwgc2VsZWN0ZWQgYW5kIG5vIG5lZ2F0aXZlIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKSkudG9FcXVhbChbXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBuZWdhdGl2ZSBzZWxlY3Rpb25zIGlmIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMik7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25zID0gY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXROZWdhdGl2ZVNlbGVjdGlvbnMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc2VsZWN0aW9ucykudG9Db250YWluKGl0ZW0xKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdGlvbnMpLnRvQ29udGFpbihpdGVtMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2VsZWN0aW9uIGNvdW50JywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdsdXJjaGVzIGlmIG5vdCBhdHRhY2hlZCBhbmQgYWxsIHNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdW5hdHRhY2hlZCA9IG5ldyBDaGVja2JveE11bHRpU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHVuYXR0YWNoZWQuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7IHVuYXR0YWNoZWQuZ2V0U2VsZWN0aW9uQ291bnQoKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnd2hlbiBhbGwgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRvdGFsIGlmIG5vIG5lZ2F0aXZlIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Db3VudCgpKS50b0VxdWFsKDUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGNvcnJlY3QgY291bnQgaWYgdGhlcmUgYXJlIG5lZ2F0aXZlIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uQ291bnQoKSkudG9FcXVhbCg0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHplcm8gaWYgbm90aGluZyBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbkNvdW50KCkpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bWJlciBvZiBzZWxlY3Rpb25zJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0xKTtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0SXRlbShpdGVtMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5nZXRTZWxlY3Rpb25Db3VudCgpKS50b0VxdWFsKDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NsZWFyIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3NldHMgc2VsZWN0IGFsbCB0byBmYWxzZSBpZiBhbGwgc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEFsbCgpO1xyXG4gICAgICAgICAgICBjaGVjay5nZXRTZWxlY3Rpb25Nb2RlbCgpLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc1NlbGVjdEFsbCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NsZWFycyBuZWdhdGl2ZSBzZWxlY3Rpb25zIGlmIGFsbCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIGNoZWNrLmRlc2VsZWN0SXRlbShpdGVtMSk7XHJcbiAgICAgICAgICAgIGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuY2xlYXIoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmdldFNlbGVjdGlvbk1vZGVsKCkuZ2V0TmVnYXRpdmVTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2xlYXJzIHNlbGVjdGlvbnMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrLnNlbGVjdEl0ZW0oaXRlbTEpO1xyXG4gICAgICAgICAgICBjaGVjay5zZWxlY3RJdGVtKGl0ZW0yKTtcclxuICAgICAgICAgICAgY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5jbGVhcigpO1xyXG4gICAgICAgICAgICBleHBlY3QoY2hlY2suZ2V0U2VsZWN0aW9uTW9kZWwoKS5nZXRTZWxlY3Rpb25zKCkubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dyb3VwcycsICgpID0+IHtcclxuICAgICAgICBsZXQgZ29vZEdyb3VwLCBiYWRHcm91cCwgZ29vZEl0ZW0xLCBnb29kSXRlbTIsIGJhZEl0ZW0sXHJcbiAgICAgICAgICAgIFJlc3VsdEdyb3VwO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX1Jlc3VsdEdyb3VwXykgPT4ge1xyXG4gICAgICAgICAgICBSZXN1bHRHcm91cCA9IF9SZXN1bHRHcm91cF87XHJcbiAgICAgICAgICAgIGdvb2RHcm91cCA9IG5ldyBSZXN1bHRHcm91cCh7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNHb29kOiAneWVzISdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYmFkR3JvdXAgPSBuZXcgUmVzdWx0R3JvdXAoe1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzR29vZDogJ05PPydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJZHM6IFsnMTIzNCddLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdvb2RJdGVtMSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnYWJjZCcsXHJcbiAgICAgICAgICAgICAgICBpc0dvb2Q6ICd5ZXMhJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBnb29kSXRlbTIgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2hoaGgnLFxyXG4gICAgICAgICAgICAgICAgaXNHb29kOiAneWVzISdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYmFkSXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCcsXHJcbiAgICAgICAgICAgICAgICBpc0dvb2Q6ICdOTz8nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnaXNHcm91cFNlbGVjdGVkKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZ3JvdXAgaXMgYWRkZWQgdG8gbm9uLXNlbGVjdCBhbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzR3JvdXBTZWxlY3RlZChnb29kR3JvdXApKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGdyb3VwIGlzIG5vdCBhZGRlZCAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzR3JvdXBTZWxlY3RlZChiYWRHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYWxsIGdyb3VwIGl0ZW1zIGFyZSBzZWxlY3RlZCBhbmQgbm9uLXNlbGVjdCBhbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVJdGVtKGdvb2RJdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVJdGVtKGdvb2RJdGVtMik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGdvb2RHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgZ3JvdXAgaXMgc2VsZWN0ZWQgd2l0aCBhIG5lZ2F0aXZlIHNlbGVjdGlvbiBpbiB0aGUgZ3JvdXAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlSXRlbShnb29kSXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLmlzR3JvdXBTZWxlY3RlZChnb29kR3JvdXApKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBvbmx5IHNvbWUgaXRlbXMgaW4gdGhlIGdyb3VwIGFyZSBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oZ29vZEl0ZW0xKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc0dyb3VwU2VsZWN0ZWQoZ29vZEdyb3VwKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBzZWxlY3QgYWxsIHdpdGggbm8gZ3JvdXBzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGdvb2RHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgc2VsZWN0IGFsbCB3aXRoIGdyb3VwIHVuc2VsZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGdvb2RHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGdvb2RHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHNlbGVjdCBhbGwgd2l0aCBvbmUgaXRlbSBpbiBncm91cCB1bnNlbGVjdGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVJdGVtKGdvb2RJdGVtMSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGdvb2RHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ3RvZ2dsZUdyb3VwKCknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdhZGRzIGdyb3VwIGlmIG5vdCBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGdvb2RHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suc2VsZWN0aW9uTW9kZWwuaGFzR3JvdXAoZ29vZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVtb3ZlcyBncm91cCBpZiBzZWxlY3RlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGdvb2RHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLnNlbGVjdGlvbk1vZGVsLmhhc0dyb3VwKGdvb2RHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjbGVhcnMgb2xkIGdyb3VwIGFuZCBhZGRzIGdyb3VwIGlmIHBhcnRpYWxseSBzZWxlY3RlZCBhbmQgbm90IHNlbGVjdCBhbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlSXRlbShnb29kSXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlR3JvdXAoZ29vZEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5zZWxlY3Rpb25Nb2RlbC5oYXNHcm91cChnb29kR3JvdXApKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0KCdjbGVhcnMgb2xkIGdyb3VwIGFuZCBkb2VzIG5vdCBhZGQgZ3JvdXAgaWYgcGFydGlhbGx5IHNlbGVjdGVkIGFuZCBzZWxlY3QgYWxsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hlY2suc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChnb29kR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlSXRlbShnb29kSXRlbTEpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2sudG9nZ2xlR3JvdXAoZ29vZEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5zZWxlY3Rpb25Nb2RlbC5oYXNHcm91cChnb29kR3JvdXApKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnY2xlYXJzIGFsbCBpdGVtcyBmcm9tIHRoZSBncm91cCBpZiBzZWxlY3RlZCB3aXRob3V0IGdyb3VwIGluIHRoZSBtb2RlbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oZ29vZEl0ZW0xKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oZ29vZEl0ZW0yKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc0dyb3VwU2VsZWN0ZWQoZ29vZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGdvb2RHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGdvb2RHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGNoZWNrLnNlbGVjdGlvbk1vZGVsLnNpemUoKSkudG9FcXVhbCgwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgnc2VsZWN0cyBncm91cCBpZiBncm91cCBpcyBzZWxlY3RlZCBhZnRlciBhbGwgaXRlbXMgd2VyZSB1bnNlbGVjdGVkIGluZGl2aWR1YWxseSBhbmQgdGhpcyBpcyBhIHNlbGVjdCAnICtcclxuICAgICAgICAgICAgICAgICdhbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oYmFkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGJhZEdyb3VwKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjaGVjay50b2dnbGVHcm91cChiYWRHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGJhZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgndW5zZWxlY3RzIGdyb3VwIGlmIGdyb3VwIHdhcyBleGNsdWRlZCB0aGVuIGFsbCBpbmRpdmlkdWFsIGl0ZW1zIHdlcmUgaW5jbHVkZWQgaW5kaXZpZHVhbGx5LCB0aGVuJyArXHJcbiAgICAgICAgICAgICAgICAnIGdyb3VwIGlzIHRvZ2dsZWQgYWdhaW4sIGFuZCB0aGlzIGlzIGEgc2VsZWN0IGFsbCAocGhldyknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGVjay5zZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGJhZEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUl0ZW0oYmFkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoY2hlY2suaXNHcm91cFNlbGVjdGVkKGJhZEdyb3VwKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrLnRvZ2dsZUdyb3VwKGJhZEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChjaGVjay5pc0dyb3VwU2VsZWN0ZWQoYmFkR3JvdXApKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
