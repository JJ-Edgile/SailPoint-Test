System.register(['test/js/TestInitializer', 'common/dataview/decision/DecisionModule', 'common/dataview/decision/AbstractDecidableItem', 'common/dataview/decision/AbstractDecisionScope'], function (_export) {
    /**
     * Created by matt.tucker on 2/13/17.
     */
    'use strict';

    var decisionModule, AbstractDecidableItem, AbstractDecisionScope, DecisionScope, DecidableItem;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewDecisionDecisionModule) {
            decisionModule = _commonDataviewDecisionDecisionModule['default'];
        }, function (_commonDataviewDecisionAbstractDecidableItem) {
            AbstractDecidableItem = _commonDataviewDecisionAbstractDecidableItem['default'];
        }, function (_commonDataviewDecisionAbstractDecisionScope) {
            AbstractDecisionScope = _commonDataviewDecisionAbstractDecisionScope['default'];
        }],
        execute: function () {
            DecisionScope = (function (_AbstractDecisionScope) {
                _inherits(DecisionScope, _AbstractDecisionScope);

                function DecisionScope(testValue) {
                    _classCallCheck(this, DecisionScope);

                    _get(Object.getPrototypeOf(DecisionScope.prototype), 'constructor', this).call(this);
                    this.testValue = testValue;
                }

                _createClass(DecisionScope, [{
                    key: 'matches',
                    value: function matches(scope) {
                        return !!scope && this.testValue === scope.testValue;
                    }
                }, {
                    key: 'getFilterValues',
                    value: function getFilterValues() {
                        return undefined;
                    }
                }, {
                    key: 'addQueryParameters',
                    value: function addQueryParameters(params) {
                        return undefined;
                    }
                }]);

                return DecisionScope;
            })(AbstractDecisionScope);

            DecidableItem = (function (_AbstractDecidableItem) {
                _inherits(DecidableItem, _AbstractDecidableItem);

                function DecidableItem(id, scope) {
                    _classCallCheck(this, DecidableItem);

                    _get(Object.getPrototypeOf(DecidableItem.prototype), 'constructor', this).call(this);
                    this.id = id;
                    this.decisionScope = scope || new DecisionScope();
                }

                _createClass(DecidableItem, [{
                    key: 'getId',
                    value: function getId() {
                        return this.id;
                    }
                }, {
                    key: 'getScope',
                    value: function getScope() {
                        return this.decisionScope;
                    }
                }]);

                return DecidableItem;
            })(AbstractDecidableItem);

            describe('DecisionStore', function () {

                var Decision = undefined,
                    SelectionModel = undefined,
                    store = undefined,
                    item1 = undefined,
                    item2 = undefined,
                    item3 = undefined,
                    tableScope = undefined;

                beforeEach(module(decisionModule));

                beforeEach(inject(function (DecisionStore, _Decision_, _SelectionModel_) {
                    Decision = _Decision_;
                    SelectionModel = _SelectionModel_;

                    store = new DecisionStore();

                    item1 = new DecidableItem('a');
                    item2 = new DecidableItem('b');
                    item3 = new DecidableItem('c');

                    tableScope = new DecisionScope('Open');
                }));

                function createItemDecision(item) {
                    var decision = new Decision();
                    decision.initializeItemDecision(item, item.getScope());
                    return decision;
                }

                function createBulkDecision(selectionModel, scope, count) {
                    var decision = new Decision();
                    decision.initializeBulkDecision(selectionModel, count, scope);
                    return decision;
                }

                function testLineItemActionWithBulkSelectSome(isAdd) {
                    // Add a bulk decision with a couple of items.
                    var selectSome = new SelectionModel();
                    selectSome.add(item1);
                    selectSome.add(item2);
                    var bulkDecision = createBulkDecision(selectSome, new DecisionScope(), selectSome.size());
                    store.addBulkDecision(bulkDecision);

                    // Add/clear a line-item decision and check that it gets removed from the bulk decision.
                    if (isAdd) {
                        var itemDecision = createItemDecision(item1);
                        store.addDecision(itemDecision);
                    } else {
                        store.clearDecision(item1);
                    }
                    expect(selectSome.size()).toEqual(1);
                    expect(selectSome.getItems()).not.toContain(item1);
                    expect(selectSome.getItems()).toContain(item2);
                }

                function testLineItemActionWithBulkSelectAll(isAdd) {
                    // Add a select all bulk decision.
                    var selectAll = new SelectionModel();
                    selectAll.isInclude = false;
                    var bulkDecision = createBulkDecision(selectAll, new DecisionScope(), 1);
                    store.addBulkDecision(bulkDecision);

                    // Add/clear a line-item decision and check that it gets excluded from the bulk decision.
                    if (isAdd) {
                        var itemDecision = createItemDecision(item1);
                        store.addDecision(itemDecision);
                    } else {
                        store.clearDecision(item1);
                    }
                    expect(selectAll.size()).toEqual(1);
                    expect(selectAll.getItems()).toContain(item1);
                }

                function setupSelectionModelForBulk(selectAllModel, itemSelected) {
                    selectAllModel.isInclude = false;
                    var bulkDecision = createBulkDecision(selectAllModel, tableScope, 5);
                    store.addBulkDecision(bulkDecision);
                    expect(store.getDecisionCount()).toEqual(5);
                    spyOn(selectAllModel, 'isItemSelected').and.returnValue(itemSelected);
                }

                describe('addDecision()', function () {
                    it('adds a new decision', function () {
                        var item = new DecidableItem('45454'),
                            decision = createItemDecision(item),
                            foundDecision = undefined;

                        store.addDecision(decision);
                        foundDecision = store.getDecision(item.id);
                        expect(decision).toBe(foundDecision);
                    });

                    it('replaces existing decision', function () {
                        var item = new DecidableItem('45454'),
                            decision1 = createItemDecision(item),
                            decision2 = createItemDecision(item),
                            foundDecision = undefined;
                        store.addDecision(decision1);
                        store.addDecision(decision2);
                        foundDecision = store.getDecision(item.id);
                        expect(foundDecision).toBe(decision2);
                    });

                    it('removes the item from a non-select all decision', function () {
                        testLineItemActionWithBulkSelectSome(true);
                    });

                    it('excludes the item from a select all decision', function () {
                        testLineItemActionWithBulkSelectAll(true);
                    });

                    it('throws with no decision', function () {
                        expect(function () {
                            return store.addDecision(undefined);
                        }).toThrow();
                    });

                    it('pukes with a bulk decision', function () {
                        var decision = createBulkDecision(new SelectionModel(), new DecisionScope(), 5);
                        expect(function () {
                            return store.addDecision(decision);
                        }).toThrow();
                    });

                    it('adds the item to exclusion list for same table scope', function () {
                        var selectAllModel = new SelectionModel(),
                            newItem = new DecidableItem('a', tableScope);
                        setupSelectionModelForBulk(selectAllModel, true);
                        store.addDecision(createItemDecision(newItem));
                        expect(selectAllModel.size()).toEqual(1);
                        expect(store.getDecisionCount()).toEqual(5);
                        expect(selectAllModel.getItems()).toContain(newItem);
                    });

                    it('does not add the item to exclusion list for different table scope', function () {
                        var selectAllModel = new SelectionModel();
                        setupSelectionModelForBulk(selectAllModel, false);
                        // No tableScope on the item
                        store.addDecision(createItemDecision(item1));
                        expect(selectAllModel.size()).toEqual(0);
                        expect(store.getDecisionCount()).toEqual(6);
                        expect(selectAllModel.getItems()).not.toContain(item1);
                    });
                });

                describe('clearDecision()', function () {
                    it('removes the decision', function () {
                        var item = new DecidableItem('fgdagdfsg');
                        store.addDecision(createItemDecision(item));
                        store.clearDecision(item);
                        expect(store.getDecision(item.id)).not.toBeDefined();
                    });

                    it('does not remove decision if none exists', function () {
                        store.addDecision(createItemDecision(item1));
                        store.clearDecision(item2);
                        expect(store.getDecision(item1.id)).toBeDefined();
                    });

                    it('removes the item from a non-select all decision', function () {
                        testLineItemActionWithBulkSelectSome(false);
                    });

                    it('excludes the item from a select all decision', function () {
                        testLineItemActionWithBulkSelectAll(false);
                    });

                    it('throws with no certificationItemId', function () {
                        expect(function () {
                            return store.clearDecision(undefined);
                        }).toThrow();
                    });

                    it('adds the item to exclusion list for same table scope', function () {
                        var selectAllModel = new SelectionModel(),
                            newItem = new DecidableItem('a', tableScope);
                        setupSelectionModelForBulk(selectAllModel, true);
                        store.clearDecision(newItem);
                        expect(selectAllModel.size()).toEqual(1);
                        expect(store.getDecisionCount()).toEqual(4);
                        expect(selectAllModel.getItems()).toContain(newItem);
                    });

                    it('doesnot add the item to exclusion list for different selectionModelScope', function () {
                        var selectAllModel = new SelectionModel();
                        setupSelectionModelForBulk(selectAllModel, false);
                        store.clearDecision(item1);
                        expect(store.getDecisionCount()).toEqual(5);
                        expect(selectAllModel.getItems()).not.toContain(item1);
                    });
                });

                describe('getDecision()', function () {
                    it('returns the CertificationDecision if it exists', function () {
                        var item = new DecidableItem('xyzzy'),
                            decision = createItemDecision(item, status),
                            foundDecision = undefined;
                        store.addDecision(decision);
                        foundDecision = store.getDecision(item.id);
                        expect(foundDecision).toBe(decision);
                    });

                    it('returns undefined if no decision exists', function () {
                        expect(store.getDecision('hghghg')).not.toBeDefined();
                    });

                    it('throws with no certificationItemId', function () {
                        expect(function () {
                            return store.getDecision(undefined);
                        }).toThrow();
                    });
                });

                describe('addBulkDecision()', function () {
                    var selectAll = undefined,
                        selectSome = undefined;

                    beforeEach(inject(function () {
                        selectAll = new SelectionModel();
                        selectAll.isInclude = false;

                        selectSome = new SelectionModel();
                    }));

                    it('throws if no decision is given', function () {
                        expect(function () {
                            return store.addBulkDecision(null);
                        }).toThrow();
                    });

                    it('barfs if the decision is not bulk', function () {
                        var itemDecision = createItemDecision(item1);
                        expect(function () {
                            return store.addBulkDecision(itemDecision);
                        }).toThrow();
                    });

                    it('adds a decision', function () {
                        var bulkDecision = createBulkDecision(selectAll, new DecisionScope(), 1);
                        store.addBulkDecision(bulkDecision);
                        expect(store.getDecisions()).toContain(bulkDecision);
                        expect(store.getDecisionCount()).toEqual(1);
                    });

                    it('removes all existing bulk decisions if new decision is select all', function () {
                        var bulk1 = createBulkDecision(selectAll.clone(), new DecisionScope(), 1);
                        var bulk2 = createBulkDecision(selectSome.clone(), new DecisionScope(), selectSome.size());

                        bulk2.selectionModel.add(item2);

                        // Add some bulk decisions.
                        store.addBulkDecision(bulk1);
                        store.addBulkDecision(bulk2);

                        // Add a select all decision and make sure that the other decisions were removed.
                        var bulkDecision = createBulkDecision(selectAll.clone(), new DecisionScope(), 1);
                        store.addBulkDecision(bulkDecision);

                        expect(store.getDecisions()).not.toContain(bulk1);
                        expect(store.getDecisions()).not.toContain(bulk2);
                        expect(store.getDecisions()).toContain(bulkDecision);
                        expect(store.getDecisionCount()).toEqual(1);
                    });

                    it('removes all existing bulk decisions for same table scope if new decision is select all', function () {
                        var bulk1 = createBulkDecision(selectAll, tableScope, 5);

                        selectSome.add(item2);

                        var bulk2 = createBulkDecision(selectSome, new DecisionScope(), selectSome.size());

                        // Add some bulk decisions.
                        store.addBulkDecision(bulk1);
                        store.addBulkDecision(bulk2);

                        // Add a select all decision and make sure that the other decisions were removed.
                        var bulkDecision = createBulkDecision(selectAll, tableScope, 6);
                        store.addBulkDecision(bulkDecision);

                        expect(store.getDecisions()).not.toContain(bulk1);
                        expect(store.getDecisions()).toContain(bulk2);
                        expect(store.getDecisions()).toContain(bulkDecision);
                        expect(store.getDecisionCount()).toEqual(6 + selectSome.size());
                    });

                    it('changes existing bulk select all decision to include exclusion from new select all', function () {
                        var bulk1 = createBulkDecision(selectAll.clone(), new DecisionScope(), 4),
                            newDecision = createBulkDecision(selectAll.clone(), new DecisionScope(), 2);

                        store.addBulkDecision(bulk1);
                        // Exclude 2 items
                        newDecision.selectionModel.add(item1);
                        newDecision.selectionModel.add(item2);

                        store.addBulkDecision(newDecision);

                        expect(store.getDecisions().length).toEqual(2);
                        expect(bulk1.selectionModel.isSelectAll()).toEqual(false);
                        expect(bulk1.bulkCount).toEqual(2);
                        expect(bulk1.selectionModel.getItems()).toContain(item1);
                        expect(bulk1.selectionModel.getItems()).toContain(item2);
                    });

                    it('adds exclusions to existing bulk select all decisions if new decision is not select all', function () {
                        // Add a select all bulk action with a single exclusion.
                        selectAll.add(item1);
                        var selectAllDecision = createBulkDecision(selectAll, new DecisionScope(), 2);
                        store.addBulkDecision(selectAllDecision);

                        // Add a select some decision with an item selected.
                        selectSome.add(item2);
                        var selectSomeDecision = createBulkDecision(selectSome, new DecisionScope(), selectSome.size());
                        store.addBulkDecision(selectSomeDecision);

                        // Make sure that there are two bulk decisions and that the selectAll has the selectSome item excluded.
                        expect(store.getDecisionCount()).toEqual(2);
                        expect(selectAllDecision.selectionModel.getItems().length).toEqual(2);
                        expect(selectAllDecision.selectionModel.getItems()).toContain(item1);
                        expect(selectAllDecision.selectionModel.getItems()).toContain(item2);
                    });

                    it('removes items from existing bulk non-select all decisions if new decision is not select all', function () {
                        // Add a bulk decision with a couple of items selected.
                        var selectSomeInitial = new SelectionModel();
                        selectSomeInitial.add(item1);
                        selectSomeInitial.add(item2);
                        var selectSomeInitialDecision = createBulkDecision(selectSomeInitial, new DecisionScope(), selectSomeInitial.size());
                        store.addBulkDecision(selectSomeInitialDecision);

                        // Add another select some decision that will override one of the items.
                        selectSome.add(item2);
                        var selectSomeNewDecision = createBulkDecision(selectSome, new DecisionScope(), selectSome.size());
                        store.addBulkDecision(selectSomeNewDecision);

                        // Check that the first decision has one item removed.
                        expect(store.getDecisionCount()).toEqual(2);
                        expect(selectSomeInitialDecision.selectionModel.getItems().length).toEqual(1);
                        expect(selectSomeInitialDecision.selectionModel.getItems()).toContain(item1);
                        expect(selectSomeNewDecision.selectionModel.getItems().length).toEqual(1);
                        expect(selectSomeNewDecision.selectionModel.getItems()).toContain(item2);
                    });

                    it('completely removes existing bulk non-select all decision if new decision includes the same items', function () {
                        // Add a bulk decision with a couple of items selected.
                        var selectSomeInitial = new SelectionModel();
                        selectSomeInitial.add(item1);
                        selectSomeInitial.add(item2);
                        var selectSomeInitialDecision = createBulkDecision(selectSomeInitial, new DecisionScope(), selectSomeInitial.size());
                        store.addBulkDecision(selectSomeInitialDecision);

                        // Add another select some decision that will override all the items.
                        selectSome.add(item1);
                        selectSome.add(item2);
                        var selectSomeNewDecision = createBulkDecision(selectSome, new DecisionScope(), selectSome.size());
                        store.addBulkDecision(selectSomeNewDecision);

                        // Check that only the second decision exists.
                        expect(store.getDecisionCount()).toEqual(2);
                        expect(store.getDecisions()).not.toContain(selectSomeInitialDecision);
                        expect(store.getDecisions()).toContain(selectSomeNewDecision);
                    });

                    it('clears all line item decisions for same scope if new decision is select all', function () {
                        // Add a couple item decisions.
                        var itemDecision1 = createItemDecision(item1);
                        // Set a different scope on an item
                        var newItem = new DecidableItem(item2.id, tableScope);
                        var itemDecision2 = createItemDecision(newItem);
                        store.addDecision(itemDecision1);
                        store.addDecision(itemDecision2);

                        // Add a bulk select all.
                        var selectAllDecision = createBulkDecision(selectAll, new DecisionScope(), 5);
                        spyOn(selectAll, 'isItemSelected').and.returnValue(true);

                        store.addBulkDecision(selectAllDecision);

                        // Check that the line item decisions are cleared.
                        expect(store.getDecisionCount()).toEqual(6);
                        expect(store.getDecisions()).not.toContain(itemDecision1);
                        expect(store.getDecisions()).toContain(itemDecision2);
                        expect(store.getDecisions()).toContain(selectAllDecision);
                    });

                    it('removes matching existing line item decisions if new decision is non-select all', function () {
                        // Add a couple item decisions.
                        var itemDecision1 = createItemDecision(item1);
                        var itemDecision2 = createItemDecision(item2);
                        store.addDecision(itemDecision1);
                        store.addDecision(itemDecision2);

                        // Add a bulk select some with one of the items.
                        selectSome.add(item1);
                        var selectSomeDecision = createBulkDecision(selectSome, {}, selectSome.size());
                        store.addBulkDecision(selectSomeDecision);

                        // Check that item1's decision is no longer stored since it was overridden by the bulk decision.
                        expect(store.getDecisionCount()).toEqual(2);
                        expect(store.getDecisions()).not.toContain(itemDecision1);
                        expect(store.getDecisions()).toContain(itemDecision2);
                        expect(store.getDecisions()).toContain(selectSomeDecision);
                    });

                    describe('with groups', function () {
                        var exceptionGroup = undefined,
                            bundleGroup = undefined;

                        beforeEach(inject(function (ResultGroup) {
                            exceptionGroup = new ResultGroup({
                                properties: {
                                    type: 'Exception'
                                },
                                count: 5
                            });

                            bundleGroup = new ResultGroup({
                                properties: {
                                    type: 'Bundle'
                                },
                                count: 2
                            });

                            // Set the property on the item objects to line up with the groups
                            item1.type = 'Exception';
                            item2.type = 'Bundle';
                            item3.type = 'Bundle';
                        }));

                        it('removes line item decisions for items that fall into a group decision', function () {
                            var itemDecision1 = createItemDecision(item1),
                                itemDecision2 = createItemDecision(item2),
                                newBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), selectSome.size());

                            newBulk.selectionModel.addGroup(exceptionGroup);

                            store.addDecision(itemDecision1);
                            store.addDecision(itemDecision2);
                            store.addBulkDecision(newBulk);

                            expect(store.getDecisions().length).toEqual(2);
                            expect(store.getDecisions()).not.toContain(itemDecision1);
                            expect(store.getDecisions()).toContain(itemDecision2);
                            expect(store.getDecisions()).toContain(newBulk);
                        });

                        it('includes group exclusions from new bulk select all in existing bulk select all', function () {
                            var existingBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(exceptionGroup);
                            newBulk.selectionModel.remove(item1);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.isSelectAll()).toEqual(false);
                            expect(existingBulk.selectionModel.hasGroup(exceptionGroup)).toEqual(true);
                            expect(existingBulk.selectionModel.getGroup(exceptionGroup).selectionModel.hasItem(item1)).toEqual(true);
                        });

                        it('does not include group exclusions from new bulk select all if existing select all excluded them', function () {
                            var existingBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(exceptionGroup);
                            newBulk.selectionModel.remove(item1);

                            existingBulk.selectionModel.addGroup(exceptionGroup);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.isSelectAll()).toEqual(false);
                            expect(existingBulk.selectionModel.hasGroup(exceptionGroup)).toEqual(false);
                            expect(existingBulk.selectionModel.hasItem(item1)).toEqual(false);
                        });

                        it('does not remove group exclusions from new bulk select all in existing non-select all decision', function () {
                            var existingBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 3);

                            existingBulk.selectionModel.add(item1);
                            newBulk.selectionModel.addGroup(exceptionGroup);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasItem(item1)).toEqual(true);
                        });

                        it('removes groups from existing non-select all decision if not excluded from new select all', function () {
                            var existingBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 3);

                            existingBulk.selectionModel.addGroup(exceptionGroup);
                            existingBulk.selectionModel.addGroup(bundleGroup);

                            newBulk.selectionModel.addGroup(bundleGroup);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasGroup(exceptionGroup)).toEqual(false);
                            expect(existingBulk.selectionModel.hasGroup(bundleGroup)).toEqual(true);
                        });

                        it('excludes group inclusions from existing bulk select all decision', function () {
                            var existingBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(bundleGroup);
                            newBulk.selectionModel.remove(item2);
                            // Add an exclusion to the existing bulk select all to test that count remains accurate
                            existingBulk.selectionModel.add(item3);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasGroup(bundleGroup)).toEqual(true);
                            expect(existingBulk.selectionModel.getGroup(bundleGroup).selectionModel.hasItem(item2)).toEqual(true);
                            expect(existingBulk.bulkCount).toEqual(4);
                        });

                        it('ignores inclusion from group exclusion in new decision if already excluded from existing select all', function () {
                            var existingBulk = createBulkDecision(selectAll.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(bundleGroup);
                            newBulk.selectionModel.remove(item2);

                            existingBulk.selectionModel.add(item2);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasGroup(bundleGroup)).toEqual(true);
                            expect(existingBulk.selectionModel.getGroup(bundleGroup).selectionModel.hasItem(item2)).toEqual(false);
                        });

                        it('removes group inclusions from existing bulk non-select all decision', function () {
                            var existingBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(bundleGroup);
                            newBulk.selectionModel.remove(item2);

                            existingBulk.selectionModel.addGroup(bundleGroup);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasGroup(bundleGroup)).toEqual(false);
                            expect(existingBulk.selectionModel.hasItem(item2)).toEqual(true);
                        });

                        it('removes items from existing non-select all decision that are in a group of new decision', function () {
                            var existingBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 4),
                                newBulk = createBulkDecision(selectSome.clone(), new DecisionScope(), 3);

                            newBulk.selectionModel.addGroup(bundleGroup);

                            existingBulk.selectionModel.add(item2);
                            existingBulk.selectionModel.add(item1);

                            store.addBulkDecision(existingBulk);
                            store.addBulkDecision(newBulk);

                            expect(existingBulk.selectionModel.hasItem(item1)).toEqual(true);
                            expect(existingBulk.selectionModel.hasItem(item2)).toEqual(false);
                        });
                    });
                });

                describe('hasBulkDecisions()', function () {
                    it('returns true if there are bulk decisions', function () {
                        var bulkDecision = createBulkDecision(new SelectionModel(), new DecisionScope(), 1);
                        store.addBulkDecision(bulkDecision);
                        expect(store.hasBulkDecisions()).toEqual(true);
                    });

                    it('returns false if there are no bulk decisions', function () {
                        var itemDecision1 = createItemDecision(item1);
                        store.addDecision(itemDecision1);
                        expect(store.hasBulkDecisions()).toEqual(false);
                    });
                });

                describe('getDecisions()', function () {
                    it('returns an empty array if no decisions have been made', function () {
                        var decisions = store.getDecisions();
                        expect(decisions.length).toEqual(0);
                    });

                    it('returns the decisions that were made', function () {
                        var item1 = new DecidableItem('11111'),
                            item2 = new DecidableItem('2222');
                        store.addDecision(createItemDecision(item1));
                        store.addDecision(createItemDecision(item2));
                        var decisions = store.getDecisions();
                        expect(decisions.length).toEqual(2);
                        var found1 = false,
                            found2 = false;
                        decisions.forEach(function (decision) {
                            if (item1.id === decision.getItemId()) {
                                found1 = true;
                            }
                            if (item2.id === decision.getItemId()) {
                                found2 = true;
                            }
                        });

                        expect(found1).toEqual(true);
                        expect(found2).toEqual(true);
                    });

                    it('sorts the decisions by created date', function () {
                        var item1 = new DecidableItem('11111'),
                            item2 = new DecidableItem('2222'),
                            selectionModel = new SelectionModel(),
                            decision1 = createBulkDecision(selectionModel, new DecisionScope(), 2),
                            decision2 = createItemDecision(item1);
                        selectionModel.add(item2);
                        decision1.created.setHours(1);
                        decision2.created.setHours(2);
                        store.addDecision(decision2);
                        store.addBulkDecision(decision1);
                        var decisions = store.getDecisions();
                        expect(decisions.length).toEqual(2);
                        expect(decisions[0]).toEqual(decision1);
                        expect(decisions[1]).toEqual(decision2);
                    });
                });

                describe('getDecisionCount()', function () {
                    it('returns zero for no decisions', function () {
                        expect(store.getDecisionCount()).toEqual(0);
                    });

                    it('returns the count of decisions', function () {
                        store.addDecision(createItemDecision(new DecidableItem('11111')));
                        store.addDecision(createItemDecision(new DecidableItem('22222')));
                        store.addDecision(createItemDecision(new DecidableItem('33333')));
                        expect(store.getDecisionCount()).toEqual(3);
                    });

                    it('returns the count of line item and bulk decisions', function () {
                        var selectionModel = new SelectionModel();
                        selectionModel.add(item1);
                        selectionModel.add(item2);
                        var bulkDecision = createBulkDecision(selectionModel, new DecisionScope(), selectionModel.size());
                        store.addBulkDecision(bulkDecision);
                        store.addDecision(createItemDecision(new DecidableItem('11111')));
                        store.addDecision(createItemDecision(new DecidableItem('22222')));
                        expect(store.getDecisionCount()).toEqual(4);
                    });
                });

                describe('clearDecisions()', function () {
                    it('removes all decisions', function () {
                        store.addDecision(createItemDecision(new DecidableItem('11111')));
                        store.addDecision(createItemDecision(new DecidableItem('22222')));
                        store.addDecision(createItemDecision(new DecidableItem('33333')));
                        store.clearDecisions();
                        expect(store.getDecisionCount()).toEqual(0);
                    });
                });

                describe('getEffectiveDecision()', function () {
                    var item = new DecidableItem('11111');
                    it('returns item decision if one exists', function () {
                        var decision = createItemDecision(item);
                        store.addDecision(decision);
                        expect(store.getEffectiveDecision(item.id)).toEqual(decision);
                    });

                    it('returns bulk decision if no item decision and item is part of bulk selection', function () {
                        var selectionModel = new SelectionModel(),
                            tableScope = new DecisionScope('Open'),
                            decision = createBulkDecision(selectionModel, tableScope, 1);
                        selectionModel.selectAll();
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecision(item.id, tableScope)).toEqual(decision);
                    });

                    it('returns undefined if no item decision or applicable bulk decision', function () {
                        var selectionModel = new SelectionModel(),
                            tableScope = new DecisionScope('Open'),
                            decision = createBulkDecision(selectionModel, tableScope, 1);
                        selectionModel.selectAll();
                        // Adding item marks it as negative selection
                        selectionModel.add(item);
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecision(item.id, tableScope)).not.toBeDefined();
                    });

                    it('returns undefined if decision scope does not match', function () {
                        var selectionModel = new SelectionModel(),
                            tableScope = new DecisionScope('Open'),
                            decision = createBulkDecision(selectionModel, new DecisionScope(), 1);
                        selectionModel.selectAll();
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecision(item.id, tableScope)).not.toBeDefined();
                    });

                    it('returns undefined if tableScope is undefined and decision is select all', function () {
                        var selectionModel = new SelectionModel(),
                            tableScope = new DecisionScope('Open'),
                            decision = createBulkDecision(selectionModel, tableScope, 1);
                        selectionModel.selectAll();
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecision(item.id, undefined)).not.toBeDefined();
                    });

                    it('returns bulk decision if tableScope is undefined and decision is not select all', function () {
                        var selectionModel = new SelectionModel(),
                            tableScope = new DecisionScope('Open'),
                            decision = createBulkDecision(selectionModel, tableScope, 1);
                        selectionModel.add(item);
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecision(item.id, undefined)).toEqual(decision);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9kZWNpc2lvbi9EZWNpc2lvblN0b3JlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJDQUEyQyxrREFBa0QsbURBQW1ELFVBQVUsU0FBUzs7OztJQUkzTTs7SUFFQSxJQUFJLGdCQUFnQix1QkFBdUIsdUJBSXpDLGVBb0JBOztJQXRCRixJQUFJLGVBQWUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0lBRWppQixJQUFJLE9BQU8sU0FBUyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxTQUFTLE1BQU0sV0FBVyxPQUFPLFFBQVEsRUFBRSxJQUFJLFNBQVMsSUFBSSxXQUFXLEtBQUssV0FBVyxLQUFLLFNBQVMsT0FBTyxJQUFJLFdBQVcsTUFBTSxTQUFTLFNBQVMsV0FBVyxJQUFJLE9BQU8sT0FBTyx5QkFBeUIsUUFBUSxXQUFXLElBQUksU0FBUyxXQUFXLEVBQUUsSUFBSSxTQUFTLE9BQU8sZUFBZSxTQUFTLElBQUksV0FBVyxNQUFNLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxLQUFLLFFBQVEsTUFBTSxVQUFVLE1BQU0sVUFBVSxTQUFTLE1BQU0sT0FBTyxTQUFTLFdBQVcsU0FBUyxvQkFBb0IsSUFBSSxXQUFXLE1BQU0sRUFBRSxPQUFPLEtBQUssY0FBYyxFQUFFLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxXQUFXLFdBQVcsRUFBRSxPQUFPLGFBQWEsT0FBTyxPQUFPLEtBQUs7O0lBRWpvQixTQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7SUFFaEgsU0FBUyxVQUFVLFVBQVUsWUFBWSxFQUFFLElBQUksT0FBTyxlQUFlLGNBQWMsZUFBZSxNQUFNLEVBQUUsTUFBTSxJQUFJLFVBQVUsNkRBQTZELE9BQU8sZUFBZSxTQUFTLFlBQVksT0FBTyxPQUFPLGNBQWMsV0FBVyxXQUFXLEVBQUUsYUFBYSxFQUFFLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxNQUFNLGNBQWMsV0FBVyxJQUFJLFlBQVksT0FBTyxpQkFBaUIsT0FBTyxlQUFlLFVBQVUsY0FBYyxTQUFTLFlBQVk7O0lBRWplLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3RixpQkFBaUIsc0NBQXNDO1dBQ3hELFVBQVUsOENBQThDO1lBQ3ZELHdCQUF3Qiw2Q0FBNkM7V0FDdEUsVUFBVSw4Q0FBOEM7WUFDdkQsd0JBQXdCLDZDQUE2Qzs7UUFFekUsU0FBUyxZQUFZO1lBZHZCLGdCQUFhLENBQUEsVUFBQSx3QkFBQTtnQkFnQkgsVUFoQlYsZUFBYTs7Z0JBRUosU0FGVCxjQUVVLFdBQVc7b0JBaUJQLGdCQUFnQixNQW5COUI7O29CQUdFLEtBQUEsT0FBQSxlQUhGLGNBQWEsWUFBQSxlQUFBLE1BQUEsS0FBQTtvQkFJWCxLQUFLLFlBQVk7OztnQkFxQlQsYUF6QlYsZUFBYSxDQUFBO29CQTBCQyxLQUFLO29CQUNMLE9BcEJULFNBQUEsUUFBQyxPQUFPO3dCQUNYLE9BQVEsQ0FBQyxDQUFDLFNBQVUsS0FBSyxjQUFjLE1BQU07O21CQXNCbEM7b0JBQ0MsS0FBSztvQkFDTCxPQXJCRCxTQUFBLGtCQUFHO3dCQUNkLE9BQU87O21CQXVCSTtvQkFDQyxLQUFLO29CQUNMLE9BdEJFLFNBQUEsbUJBQUMsUUFBUTt3QkFDdkIsT0FBTzs7OztnQkEwQkMsT0ExQ1Y7ZUFBc0I7O1lBb0J0QixnQkFBYSxDQUFBLFVBQUEsd0JBQUE7Z0JBMEJILFVBMUJWLGVBQWE7O2dCQUNKLFNBRFQsY0FDVSxJQUFJLE9BQU87b0JBNEJQLGdCQUFnQixNQTdCOUI7O29CQUVFLEtBQUEsT0FBQSxlQUZGLGNBQWEsWUFBQSxlQUFBLE1BQUEsS0FBQTtvQkFHWCxLQUFLLEtBQUs7b0JBQ1YsS0FBSyxnQkFBZ0IsU0FBUyxJQUFJOzs7Z0JBZ0MxQixhQXBDVixlQUFhLENBQUE7b0JBcUNDLEtBQUs7b0JBQ0wsT0EvQlgsU0FBQSxRQUFHO3dCQUNKLE9BQU8sS0FBSzs7bUJBaUNEO29CQUNDLEtBQUs7b0JBQ0wsT0FoQ1IsU0FBQSxXQUFHO3dCQUNQLE9BQU8sS0FBSzs7OztnQkFvQ0osT0FoRFY7ZUFBc0I7O1lBZ0I1QixTQUFTLGlCQUFpQixZQUFNOztnQkFFNUIsSUFBSSxXQUFRO29CQUFFLGlCQUFjO29CQUFFLFFBQUs7b0JBQUUsUUFBSztvQkFBRSxRQUFLO29CQUFFLFFBQUs7b0JBQUUsYUFBVTs7Z0JBRXBFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGVBQWUsWUFBWSxrQkFBa0I7b0JBQ3BFLFdBQVc7b0JBQ1gsaUJBQWlCOztvQkFFakIsUUFBUSxJQUFJOztvQkFFWixRQUFRLElBQUksY0FBYztvQkFDMUIsUUFBUSxJQUFJLGNBQWM7b0JBQzFCLFFBQVEsSUFBSSxjQUFjOztvQkFFMUIsYUFBYSxJQUFJLGNBQWM7OztnQkFHbkMsU0FBUyxtQkFBbUIsTUFBTTtvQkFDOUIsSUFBSSxXQUFXLElBQUk7b0JBQ25CLFNBQVMsdUJBQXVCLE1BQU0sS0FBSztvQkFDM0MsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CLGdCQUFnQixPQUFPLE9BQU87b0JBQ3RELElBQUksV0FBVyxJQUFJO29CQUNuQixTQUFTLHVCQUF1QixnQkFBZ0IsT0FBTztvQkFDdkQsT0FBTzs7O2dCQUdYLFNBQVMscUNBQXFDLE9BQU87O29CQUVqRCxJQUFJLGFBQWEsSUFBSTtvQkFDckIsV0FBVyxJQUFJO29CQUNmLFdBQVcsSUFBSTtvQkFDZixJQUFJLGVBQWUsbUJBQW1CLFlBQVksSUFBSSxpQkFBaUIsV0FBVztvQkFDbEYsTUFBTSxnQkFBZ0I7OztvQkFHdEIsSUFBSSxPQUFPO3dCQUNQLElBQUksZUFBZSxtQkFBbUI7d0JBQ3RDLE1BQU0sWUFBWTsyQkFFakI7d0JBQ0QsTUFBTSxjQUFjOztvQkFFeEIsT0FBTyxXQUFXLFFBQVEsUUFBUTtvQkFDbEMsT0FBTyxXQUFXLFlBQVksSUFBSSxVQUFVO29CQUM1QyxPQUFPLFdBQVcsWUFBWSxVQUFVOzs7Z0JBRzVDLFNBQVMsb0NBQW9DLE9BQU87O29CQUVoRCxJQUFJLFlBQVksSUFBSTtvQkFDcEIsVUFBVSxZQUFZO29CQUN0QixJQUFJLGVBQWUsbUJBQW1CLFdBQVcsSUFBSSxpQkFBaUI7b0JBQ3RFLE1BQU0sZ0JBQWdCOzs7b0JBR3RCLElBQUksT0FBTzt3QkFDUCxJQUFJLGVBQWUsbUJBQW1CO3dCQUN0QyxNQUFNLFlBQVk7MkJBRWpCO3dCQUNELE1BQU0sY0FBYzs7b0JBRXhCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxZQUFZLFVBQVU7OztnQkFHM0MsU0FBUywyQkFBMkIsZ0JBQWdCLGNBQWM7b0JBQzlELGVBQWUsWUFBWTtvQkFDM0IsSUFBSSxlQUFlLG1CQUFtQixnQkFBZ0IsWUFBWTtvQkFDbEUsTUFBTSxnQkFBZ0I7b0JBQ3RCLE9BQU8sTUFBTSxvQkFBb0IsUUFBUTtvQkFDekMsTUFBTSxnQkFBZ0Isa0JBQWtCLElBQUksWUFBWTs7O2dCQUc1RCxTQUFTLGlCQUFpQixZQUFNO29CQUM1QixHQUFHLHVCQUF1QixZQUFNO3dCQUM1QixJQUFJLE9BQU8sSUFBSSxjQUFjOzRCQUN6QixXQUFXLG1CQUFtQjs0QkFDOUIsZ0JBQWE7O3dCQUVqQixNQUFNLFlBQVk7d0JBQ2xCLGdCQUFnQixNQUFNLFlBQVksS0FBSzt3QkFDdkMsT0FBTyxVQUFVLEtBQUs7OztvQkFHMUIsR0FBRyw4QkFBOEIsWUFBTTt3QkFDbkMsSUFBSSxPQUFPLElBQUksY0FBYzs0QkFDekIsWUFBWSxtQkFBbUI7NEJBQy9CLFlBQVksbUJBQW1COzRCQUMvQixnQkFBYTt3QkFDakIsTUFBTSxZQUFZO3dCQUNsQixNQUFNLFlBQVk7d0JBQ2xCLGdCQUFnQixNQUFNLFlBQVksS0FBSzt3QkFDdkMsT0FBTyxlQUFlLEtBQUs7OztvQkFHL0IsR0FBRyxtREFBbUQsWUFBTTt3QkFDeEQscUNBQXFDOzs7b0JBR3pDLEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELG9DQUFvQzs7O29CQUd4QyxHQUFHLDJCQUEyQixZQUFNO3dCQUNoQyxPQUFPLFlBQUE7NEJBd0NTLE9BeENILE1BQU0sWUFBWTsyQkFBWTs7O29CQUcvQyxHQUFHLDhCQUE4QixZQUFNO3dCQUNuQyxJQUFJLFdBQVcsbUJBQW1CLElBQUksa0JBQWtCLElBQUksaUJBQWlCO3dCQUM3RSxPQUFPLFlBQUE7NEJBMENTLE9BMUNILE1BQU0sWUFBWTsyQkFBVzs7O29CQUc5QyxHQUFHLHdEQUF3RCxZQUFNO3dCQUM3RCxJQUFJLGlCQUFpQixJQUFJOzRCQUNyQixVQUFVLElBQUksY0FBYyxLQUFLO3dCQUNyQywyQkFBMkIsZ0JBQWdCO3dCQUMzQyxNQUFNLFlBQVksbUJBQW1CO3dCQUNyQyxPQUFPLGVBQWUsUUFBUSxRQUFRO3dCQUN0QyxPQUFPLE1BQU0sb0JBQW9CLFFBQVE7d0JBQ3pDLE9BQU8sZUFBZSxZQUFZLFVBQVU7OztvQkFHaEQsR0FBRyxxRUFBcUUsWUFBTTt3QkFDMUUsSUFBSSxpQkFBaUIsSUFBSTt3QkFDekIsMkJBQTJCLGdCQUFnQjs7d0JBRTNDLE1BQU0sWUFBWSxtQkFBbUI7d0JBQ3JDLE9BQU8sZUFBZSxRQUFRLFFBQVE7d0JBQ3RDLE9BQU8sTUFBTSxvQkFBb0IsUUFBUTt3QkFDekMsT0FBTyxlQUFlLFlBQVksSUFBSSxVQUFVOzs7O2dCQUl4RCxTQUFTLG1CQUFtQixZQUFNO29CQUM5QixHQUFHLHdCQUF3QixZQUFNO3dCQUM3QixJQUFJLE9BQU8sSUFBSSxjQUFjO3dCQUM3QixNQUFNLFlBQVksbUJBQW1CO3dCQUNyQyxNQUFNLGNBQWM7d0JBQ3BCLE9BQU8sTUFBTSxZQUFZLEtBQUssS0FBSyxJQUFJOzs7b0JBRzNDLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELE1BQU0sWUFBWSxtQkFBbUI7d0JBQ3JDLE1BQU0sY0FBYzt3QkFDcEIsT0FBTyxNQUFNLFlBQVksTUFBTSxLQUFLOzs7b0JBR3hDLEdBQUcsbURBQW1ELFlBQU07d0JBQ3hELHFDQUFxQzs7O29CQUd6QyxHQUFHLGdEQUFnRCxZQUFNO3dCQUNyRCxvQ0FBb0M7OztvQkFHeEMsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsT0FBTyxZQUFBOzRCQTRDUyxPQTVDSCxNQUFNLGNBQWM7MkJBQVk7OztvQkFHakQsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsSUFBSSxpQkFBaUIsSUFBSTs0QkFDckIsVUFBVSxJQUFJLGNBQWMsS0FBSzt3QkFDckMsMkJBQTJCLGdCQUFnQjt3QkFDM0MsTUFBTSxjQUFjO3dCQUNwQixPQUFPLGVBQWUsUUFBUSxRQUFRO3dCQUN0QyxPQUFPLE1BQU0sb0JBQW9CLFFBQVE7d0JBQ3pDLE9BQU8sZUFBZSxZQUFZLFVBQVU7OztvQkFHaEQsR0FBRyw0RUFBNEUsWUFBTTt3QkFDakYsSUFBSSxpQkFBaUIsSUFBSTt3QkFDekIsMkJBQTJCLGdCQUFnQjt3QkFDM0MsTUFBTSxjQUFjO3dCQUNwQixPQUFPLE1BQU0sb0JBQW9CLFFBQVE7d0JBQ3pDLE9BQU8sZUFBZSxZQUFZLElBQUksVUFBVTs7OztnQkFJeEQsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsSUFBSSxPQUFPLElBQUksY0FBYzs0QkFDekIsV0FBVyxtQkFBbUIsTUFBTTs0QkFDcEMsZ0JBQWE7d0JBQ2pCLE1BQU0sWUFBWTt3QkFDbEIsZ0JBQWdCLE1BQU0sWUFBWSxLQUFLO3dCQUN2QyxPQUFPLGVBQWUsS0FBSzs7O29CQUcvQixHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxPQUFPLE1BQU0sWUFBWSxXQUFXLElBQUk7OztvQkFHNUMsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsT0FBTyxZQUFBOzRCQThDUyxPQTlDSCxNQUFNLFlBQVk7MkJBQVk7Ozs7Z0JBSW5ELFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLElBQUksWUFBUzt3QkFBRSxhQUFVOztvQkFFekIsV0FBVyxPQUFPLFlBQU07d0JBQ3BCLFlBQVksSUFBSTt3QkFDaEIsVUFBVSxZQUFZOzt3QkFFdEIsYUFBYSxJQUFJOzs7b0JBR3JCLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLE9BQU8sWUFBQTs0QkFpRFMsT0FqREgsTUFBTSxnQkFBZ0I7MkJBQU87OztvQkFHOUMsR0FBRyxxQ0FBcUMsWUFBTTt3QkFDMUMsSUFBSSxlQUFlLG1CQUFtQjt3QkFDdEMsT0FBTyxZQUFBOzRCQW1EUyxPQW5ESCxNQUFNLGdCQUFnQjsyQkFBZTs7O29CQUd0RCxHQUFHLG1CQUFtQixZQUFNO3dCQUN4QixJQUFJLGVBQWUsbUJBQW1CLFdBQVcsSUFBSSxpQkFBaUI7d0JBQ3RFLE1BQU0sZ0JBQWdCO3dCQUN0QixPQUFPLE1BQU0sZ0JBQWdCLFVBQVU7d0JBQ3ZDLE9BQU8sTUFBTSxvQkFBb0IsUUFBUTs7O29CQUc3QyxHQUFHLHFFQUFxRSxZQUFNO3dCQUMxRSxJQUFJLFFBQVEsbUJBQW1CLFVBQVUsU0FBUyxJQUFJLGlCQUFpQjt3QkFDdkUsSUFBSSxRQUFRLG1CQUFtQixXQUFXLFNBQVMsSUFBSSxpQkFBaUIsV0FBVzs7d0JBRW5GLE1BQU0sZUFBZSxJQUFJOzs7d0JBR3pCLE1BQU0sZ0JBQWdCO3dCQUN0QixNQUFNLGdCQUFnQjs7O3dCQUd0QixJQUFJLGVBQWUsbUJBQW1CLFVBQVUsU0FBUyxJQUFJLGlCQUFpQjt3QkFDOUUsTUFBTSxnQkFBZ0I7O3dCQUV0QixPQUFPLE1BQU0sZ0JBQWdCLElBQUksVUFBVTt3QkFDM0MsT0FBTyxNQUFNLGdCQUFnQixJQUFJLFVBQVU7d0JBQzNDLE9BQU8sTUFBTSxnQkFBZ0IsVUFBVTt3QkFDdkMsT0FBTyxNQUFNLG9CQUFvQixRQUFROzs7b0JBRzdDLEdBQUcsMEZBQTBGLFlBQU07d0JBQy9GLElBQUksUUFBUSxtQkFBbUIsV0FBVyxZQUFZOzt3QkFFdEQsV0FBVyxJQUFJOzt3QkFFZixJQUFJLFFBQVEsbUJBQW1CLFlBQVksSUFBSSxpQkFBaUIsV0FBVzs7O3dCQUczRSxNQUFNLGdCQUFnQjt3QkFDdEIsTUFBTSxnQkFBZ0I7Ozt3QkFHdEIsSUFBSSxlQUFlLG1CQUFtQixXQUFXLFlBQVk7d0JBQzdELE1BQU0sZ0JBQWdCOzt3QkFFdEIsT0FBTyxNQUFNLGdCQUFnQixJQUFJLFVBQVU7d0JBQzNDLE9BQU8sTUFBTSxnQkFBZ0IsVUFBVTt3QkFDdkMsT0FBTyxNQUFNLGdCQUFnQixVQUFVO3dCQUN2QyxPQUFPLE1BQU0sb0JBQW9CLFFBQVEsSUFBSSxXQUFXOzs7b0JBRzVELEdBQUcsc0ZBQXNGLFlBQU07d0JBQzNGLElBQUksUUFBUSxtQkFBbUIsVUFBVSxTQUFTLElBQUksaUJBQWlCOzRCQUNuRSxjQUFjLG1CQUFtQixVQUFVLFNBQVMsSUFBSSxpQkFBaUI7O3dCQUU3RSxNQUFNLGdCQUFnQjs7d0JBRXRCLFlBQVksZUFBZSxJQUFJO3dCQUMvQixZQUFZLGVBQWUsSUFBSTs7d0JBRS9CLE1BQU0sZ0JBQWdCOzt3QkFFdEIsT0FBTyxNQUFNLGVBQWUsUUFBUSxRQUFRO3dCQUM1QyxPQUFPLE1BQU0sZUFBZSxlQUFlLFFBQVE7d0JBQ25ELE9BQU8sTUFBTSxXQUFXLFFBQVE7d0JBQ2hDLE9BQU8sTUFBTSxlQUFlLFlBQVksVUFBVTt3QkFDbEQsT0FBTyxNQUFNLGVBQWUsWUFBWSxVQUFVOzs7b0JBR3RELEdBQUcsMkZBQTJGLFlBQU07O3dCQUVoRyxVQUFVLElBQUk7d0JBQ2QsSUFBSSxvQkFBb0IsbUJBQW1CLFdBQVcsSUFBSSxpQkFBaUI7d0JBQzNFLE1BQU0sZ0JBQWdCOzs7d0JBR3RCLFdBQVcsSUFBSTt3QkFDZixJQUFJLHFCQUFxQixtQkFBbUIsWUFBWSxJQUFJLGlCQUFpQixXQUFXO3dCQUN4RixNQUFNLGdCQUFnQjs7O3dCQUd0QixPQUFPLE1BQU0sb0JBQW9CLFFBQVE7d0JBQ3pDLE9BQU8sa0JBQWtCLGVBQWUsV0FBVyxRQUFRLFFBQVE7d0JBQ25FLE9BQU8sa0JBQWtCLGVBQWUsWUFBWSxVQUFVO3dCQUM5RCxPQUFPLGtCQUFrQixlQUFlLFlBQVksVUFBVTs7O29CQUdsRSxHQUFHLCtGQUErRixZQUFNOzt3QkFFcEcsSUFBSSxvQkFBb0IsSUFBSTt3QkFDNUIsa0JBQWtCLElBQUk7d0JBQ3RCLGtCQUFrQixJQUFJO3dCQUN0QixJQUFJLDRCQUNBLG1CQUFtQixtQkFBbUIsSUFBSSxpQkFBaUIsa0JBQWtCO3dCQUNqRixNQUFNLGdCQUFnQjs7O3dCQUd0QixXQUFXLElBQUk7d0JBQ2YsSUFBSSx3QkFBd0IsbUJBQW1CLFlBQVksSUFBSSxpQkFBaUIsV0FBVzt3QkFDM0YsTUFBTSxnQkFBZ0I7Ozt3QkFHdEIsT0FBTyxNQUFNLG9CQUFvQixRQUFRO3dCQUN6QyxPQUFPLDBCQUEwQixlQUFlLFdBQVcsUUFBUSxRQUFRO3dCQUMzRSxPQUFPLDBCQUEwQixlQUFlLFlBQVksVUFBVTt3QkFDdEUsT0FBTyxzQkFBc0IsZUFBZSxXQUFXLFFBQVEsUUFBUTt3QkFDdkUsT0FBTyxzQkFBc0IsZUFBZSxZQUFZLFVBQVU7OztvQkFHdEUsR0FBRyxvR0FBb0csWUFBTTs7d0JBRXpHLElBQUksb0JBQW9CLElBQUk7d0JBQzVCLGtCQUFrQixJQUFJO3dCQUN0QixrQkFBa0IsSUFBSTt3QkFDdEIsSUFBSSw0QkFDQSxtQkFBbUIsbUJBQW1CLElBQUksaUJBQWlCLGtCQUFrQjt3QkFDakYsTUFBTSxnQkFBZ0I7Ozt3QkFHdEIsV0FBVyxJQUFJO3dCQUNmLFdBQVcsSUFBSTt3QkFDZixJQUFJLHdCQUF3QixtQkFBbUIsWUFBWSxJQUFJLGlCQUFpQixXQUFXO3dCQUMzRixNQUFNLGdCQUFnQjs7O3dCQUd0QixPQUFPLE1BQU0sb0JBQW9CLFFBQVE7d0JBQ3pDLE9BQU8sTUFBTSxnQkFBZ0IsSUFBSSxVQUFVO3dCQUMzQyxPQUFPLE1BQU0sZ0JBQWdCLFVBQVU7OztvQkFHM0MsR0FBRywrRUFBK0UsWUFBTTs7d0JBRXBGLElBQUksZ0JBQWdCLG1CQUFtQjs7d0JBRXZDLElBQUksVUFBVSxJQUFJLGNBQWMsTUFBTSxJQUFJO3dCQUMxQyxJQUFJLGdCQUFnQixtQkFBbUI7d0JBQ3ZDLE1BQU0sWUFBWTt3QkFDbEIsTUFBTSxZQUFZOzs7d0JBR2xCLElBQUksb0JBQW9CLG1CQUFtQixXQUFXLElBQUksaUJBQWlCO3dCQUMzRSxNQUFNLFdBQVcsa0JBQWtCLElBQUksWUFBWTs7d0JBRW5ELE1BQU0sZ0JBQWdCOzs7d0JBR3RCLE9BQU8sTUFBTSxvQkFBb0IsUUFBUTt3QkFDekMsT0FBTyxNQUFNLGdCQUFnQixJQUFJLFVBQVU7d0JBQzNDLE9BQU8sTUFBTSxnQkFBZ0IsVUFBVTt3QkFDdkMsT0FBTyxNQUFNLGdCQUFnQixVQUFVOzs7b0JBSTNDLEdBQUcsbUZBQW1GLFlBQU07O3dCQUV4RixJQUFJLGdCQUFnQixtQkFBbUI7d0JBQ3ZDLElBQUksZ0JBQWdCLG1CQUFtQjt3QkFDdkMsTUFBTSxZQUFZO3dCQUNsQixNQUFNLFlBQVk7Ozt3QkFHbEIsV0FBVyxJQUFJO3dCQUNmLElBQUkscUJBQXFCLG1CQUFtQixZQUFZLElBQUksV0FBVzt3QkFDdkUsTUFBTSxnQkFBZ0I7Ozt3QkFHdEIsT0FBTyxNQUFNLG9CQUFvQixRQUFRO3dCQUN6QyxPQUFPLE1BQU0sZ0JBQWdCLElBQUksVUFBVTt3QkFDM0MsT0FBTyxNQUFNLGdCQUFnQixVQUFVO3dCQUN2QyxPQUFPLE1BQU0sZ0JBQWdCLFVBQVU7OztvQkFHM0MsU0FBUyxlQUFlLFlBQU07d0JBQzFCLElBQUksaUJBQWM7NEJBQUUsY0FBVzs7d0JBRS9CLFdBQVcsT0FBTyxVQUFDLGFBQWdCOzRCQUMvQixpQkFBaUIsSUFBSSxZQUFZO2dDQUM3QixZQUFZO29DQUNSLE1BQU07O2dDQUVWLE9BQU87Ozs0QkFHWCxjQUFjLElBQUksWUFBWTtnQ0FDMUIsWUFBWTtvQ0FDUixNQUFNOztnQ0FFVixPQUFPOzs7OzRCQUlYLE1BQU0sT0FBTzs0QkFDYixNQUFNLE9BQU87NEJBQ2IsTUFBTSxPQUFPOzs7d0JBR2pCLEdBQUcseUVBQXlFLFlBQU07NEJBQzlFLElBQUksZ0JBQWdCLG1CQUFtQjtnQ0FDbkMsZ0JBQWdCLG1CQUFtQjtnQ0FDbkMsVUFBVSxtQkFBbUIsV0FBVyxTQUFTLElBQUksaUJBQWlCLFdBQVc7OzRCQUVyRixRQUFRLGVBQWUsU0FBUzs7NEJBRWhDLE1BQU0sWUFBWTs0QkFDbEIsTUFBTSxZQUFZOzRCQUNsQixNQUFNLGdCQUFnQjs7NEJBRXRCLE9BQU8sTUFBTSxlQUFlLFFBQVEsUUFBUTs0QkFDNUMsT0FBTyxNQUFNLGdCQUFnQixJQUFJLFVBQVU7NEJBQzNDLE9BQU8sTUFBTSxnQkFBZ0IsVUFBVTs0QkFDdkMsT0FBTyxNQUFNLGdCQUFnQixVQUFVOzs7d0JBRzNDLEdBQUcsa0ZBQWtGLFlBQU07NEJBQ3ZGLElBQUksZUFBZSxtQkFBbUIsVUFBVSxTQUFTLElBQUksaUJBQWlCO2dDQUMxRSxVQUFVLG1CQUFtQixVQUFVLFNBQVMsSUFBSSxpQkFBaUI7OzRCQUV6RSxRQUFRLGVBQWUsU0FBUzs0QkFDaEMsUUFBUSxlQUFlLE9BQU87OzRCQUU5QixNQUFNLGdCQUFnQjs0QkFDdEIsTUFBTSxnQkFBZ0I7OzRCQUV0QixPQUFPLGFBQWEsZUFBZSxlQUFlLFFBQVE7NEJBQzFELE9BQU8sYUFBYSxlQUFlLFNBQVMsaUJBQWlCLFFBQVE7NEJBQ3JFLE9BQU8sYUFBYSxlQUFlLFNBQVMsZ0JBQWdCLGVBQWUsUUFBUSxRQUM5RSxRQUFROzs7d0JBR2pCLEdBQUcsbUdBQ0MsWUFBTTs0QkFDRixJQUFJLGVBQWUsbUJBQW1CLFVBQVUsU0FBUyxJQUFJLGlCQUFpQjtnQ0FDMUUsVUFBVSxtQkFBbUIsVUFBVSxTQUFTLElBQUksaUJBQWlCOzs0QkFFekUsUUFBUSxlQUFlLFNBQVM7NEJBQ2hDLFFBQVEsZUFBZSxPQUFPOzs0QkFFOUIsYUFBYSxlQUFlLFNBQVM7OzRCQUVyQyxNQUFNLGdCQUFnQjs0QkFDdEIsTUFBTSxnQkFBZ0I7OzRCQUV0QixPQUFPLGFBQWEsZUFBZSxlQUFlLFFBQVE7NEJBQzFELE9BQU8sYUFBYSxlQUFlLFNBQVMsaUJBQWlCLFFBQVE7NEJBQ3JFLE9BQU8sYUFBYSxlQUFlLFFBQVEsUUFBUSxRQUFROzs7d0JBR25FLEdBQUcsaUdBQWlHLFlBQU07NEJBQ3RHLElBQUksZUFBZSxtQkFBbUIsV0FBVyxTQUFTLElBQUksaUJBQWlCO2dDQUMzRSxVQUFVLG1CQUFtQixVQUFVLFNBQVMsSUFBSSxpQkFBaUI7OzRCQUV6RSxhQUFhLGVBQWUsSUFBSTs0QkFDaEMsUUFBUSxlQUFlLFNBQVM7OzRCQUVoQyxNQUFNLGdCQUFnQjs0QkFDdEIsTUFBTSxnQkFBZ0I7OzRCQUV0QixPQUFPLGFBQWEsZUFBZSxRQUFRLFFBQVEsUUFBUTs7O3dCQUcvRCxHQUFHLDRGQUE0RixZQUFNOzRCQUNqRyxJQUFJLGVBQWUsbUJBQW1CLFdBQVcsU0FBUyxJQUFJLGlCQUFpQjtnQ0FDM0UsVUFBVSxtQkFBbUIsVUFBVSxTQUFTLElBQUksaUJBQWlCOzs0QkFFekUsYUFBYSxlQUFlLFNBQVM7NEJBQ3JDLGFBQWEsZUFBZSxTQUFTOzs0QkFFckMsUUFBUSxlQUFlLFNBQVM7OzRCQUVoQyxNQUFNLGdCQUFnQjs0QkFDdEIsTUFBTSxnQkFBZ0I7OzRCQUV0QixPQUFPLGFBQWEsZUFBZSxTQUFTLGlCQUFpQixRQUFROzRCQUNyRSxPQUFPLGFBQWEsZUFBZSxTQUFTLGNBQWMsUUFBUTs7O3dCQUd0RSxHQUFHLG9FQUFvRSxZQUFNOzRCQUN6RSxJQUFJLGVBQWUsbUJBQW1CLFVBQVUsU0FBUyxJQUFJLGlCQUFpQjtnQ0FDMUUsVUFBVSxtQkFBbUIsV0FBVyxTQUFTLElBQUksaUJBQWlCOzs0QkFFMUUsUUFBUSxlQUFlLFNBQVM7NEJBQ2hDLFFBQVEsZUFBZSxPQUFPOzs0QkFFOUIsYUFBYSxlQUFlLElBQUk7OzRCQUVoQyxNQUFNLGdCQUFnQjs0QkFDdEIsTUFBTSxnQkFBZ0I7OzRCQUV0QixPQUFPLGFBQWEsZUFBZSxTQUFTLGNBQWMsUUFBUTs0QkFDbEUsT0FBTyxhQUFhLGVBQWUsU0FBUyxhQUFhLGVBQWUsUUFBUSxRQUFRLFFBQVE7NEJBQ2hHLE9BQU8sYUFBYSxXQUFXLFFBQVE7Ozt3QkFHM0MsR0FBRyx1R0FDQyxZQUFNOzRCQUNGLElBQUksZUFBZSxtQkFBbUIsVUFBVSxTQUFTLElBQUksaUJBQWlCO2dDQUMxRSxVQUFVLG1CQUFtQixXQUFXLFNBQVMsSUFBSSxpQkFBaUI7OzRCQUUxRSxRQUFRLGVBQWUsU0FBUzs0QkFDaEMsUUFBUSxlQUFlLE9BQU87OzRCQUU5QixhQUFhLGVBQWUsSUFBSTs7NEJBRWhDLE1BQU0sZ0JBQWdCOzRCQUN0QixNQUFNLGdCQUFnQjs7NEJBRXRCLE9BQU8sYUFBYSxlQUFlLFNBQVMsY0FBYyxRQUFROzRCQUNsRSxPQUFPLGFBQWEsZUFBZSxTQUFTLGFBQWEsZUFBZSxRQUFRLFFBQzNFLFFBQVE7Ozt3QkFHckIsR0FBRyx1RUFBdUUsWUFBTTs0QkFDNUUsSUFBSSxlQUFlLG1CQUFtQixXQUFXLFNBQVMsSUFBSSxpQkFBaUI7Z0NBQzNFLFVBQVUsbUJBQW1CLFdBQVcsU0FBUyxJQUFJLGlCQUFpQjs7NEJBRTFFLFFBQVEsZUFBZSxTQUFTOzRCQUNoQyxRQUFRLGVBQWUsT0FBTzs7NEJBRTlCLGFBQWEsZUFBZSxTQUFTOzs0QkFFckMsTUFBTSxnQkFBZ0I7NEJBQ3RCLE1BQU0sZ0JBQWdCOzs0QkFFdEIsT0FBTyxhQUFhLGVBQWUsU0FBUyxjQUFjLFFBQVE7NEJBQ2xFLE9BQU8sYUFBYSxlQUFlLFFBQVEsUUFBUSxRQUFROzs7d0JBRy9ELEdBQUcsMkZBQTJGLFlBQU07NEJBQ2hHLElBQUksZUFBZSxtQkFBbUIsV0FBVyxTQUFTLElBQUksaUJBQWlCO2dDQUMzRSxVQUFVLG1CQUFtQixXQUFXLFNBQVMsSUFBSSxpQkFBaUI7OzRCQUUxRSxRQUFRLGVBQWUsU0FBUzs7NEJBRWhDLGFBQWEsZUFBZSxJQUFJOzRCQUNoQyxhQUFhLGVBQWUsSUFBSTs7NEJBRWhDLE1BQU0sZ0JBQWdCOzRCQUN0QixNQUFNLGdCQUFnQjs7NEJBRXRCLE9BQU8sYUFBYSxlQUFlLFFBQVEsUUFBUSxRQUFROzRCQUMzRCxPQUFPLGFBQWEsZUFBZSxRQUFRLFFBQVEsUUFBUTs7Ozs7Z0JBS3ZFLFNBQVMsc0JBQXNCLFlBQU07b0JBQ2pDLEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELElBQUksZUFBZSxtQkFBbUIsSUFBSSxrQkFBa0IsSUFBSSxpQkFBaUI7d0JBQ2pGLE1BQU0sZ0JBQWdCO3dCQUN0QixPQUFPLE1BQU0sb0JBQW9CLFFBQVE7OztvQkFHN0MsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsSUFBSSxnQkFBZ0IsbUJBQW1CO3dCQUN2QyxNQUFNLFlBQVk7d0JBQ2xCLE9BQU8sTUFBTSxvQkFBb0IsUUFBUTs7OztnQkFJakQsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsR0FBRyx5REFBeUQsWUFBTTt3QkFDOUQsSUFBSSxZQUFZLE1BQU07d0JBQ3RCLE9BQU8sVUFBVSxRQUFRLFFBQVE7OztvQkFHckMsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsSUFBSSxRQUFRLElBQUksY0FBYzs0QkFDMUIsUUFBUSxJQUFJLGNBQWM7d0JBQzlCLE1BQU0sWUFBWSxtQkFBbUI7d0JBQ3JDLE1BQU0sWUFBWSxtQkFBbUI7d0JBQ3JDLElBQUksWUFBWSxNQUFNO3dCQUN0QixPQUFPLFVBQVUsUUFBUSxRQUFRO3dCQUNqQyxJQUFJLFNBQVM7NEJBQ1QsU0FBUzt3QkFDYixVQUFVLFFBQVEsVUFBQyxVQUFhOzRCQUM1QixJQUFJLE1BQU0sT0FBTyxTQUFTLGFBQWE7Z0NBQ25DLFNBQVM7OzRCQUViLElBQUksTUFBTSxPQUFPLFNBQVMsYUFBYTtnQ0FDbkMsU0FBUzs7Ozt3QkFJakIsT0FBTyxRQUFRLFFBQVE7d0JBQ3ZCLE9BQU8sUUFBUSxRQUFROzs7b0JBRzNCLEdBQUcsdUNBQXVDLFlBQU07d0JBQzVDLElBQUksUUFBUSxJQUFJLGNBQWM7NEJBQzFCLFFBQVEsSUFBSSxjQUFjOzRCQUMxQixpQkFBaUIsSUFBSTs0QkFDckIsWUFBWSxtQkFBbUIsZ0JBQWdCLElBQUksaUJBQWlCOzRCQUNwRSxZQUFZLG1CQUFtQjt3QkFDbkMsZUFBZSxJQUFJO3dCQUNuQixVQUFVLFFBQVEsU0FBUzt3QkFDM0IsVUFBVSxRQUFRLFNBQVM7d0JBQzNCLE1BQU0sWUFBWTt3QkFDbEIsTUFBTSxnQkFBZ0I7d0JBQ3RCLElBQUksWUFBWSxNQUFNO3dCQUN0QixPQUFPLFVBQVUsUUFBUSxRQUFRO3dCQUNqQyxPQUFPLFVBQVUsSUFBSSxRQUFRO3dCQUM3QixPQUFPLFVBQVUsSUFBSSxRQUFROzs7O2dCQUlyQyxTQUFTLHNCQUFzQixZQUFNO29CQUNqQyxHQUFHLGlDQUFpQyxZQUFNO3dCQUN0QyxPQUFPLE1BQU0sb0JBQW9CLFFBQVE7OztvQkFHN0MsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsTUFBTSxZQUFZLG1CQUFtQixJQUFJLGNBQWM7d0JBQ3ZELE1BQU0sWUFBWSxtQkFBbUIsSUFBSSxjQUFjO3dCQUN2RCxNQUFNLFlBQVksbUJBQW1CLElBQUksY0FBYzt3QkFDdkQsT0FBTyxNQUFNLG9CQUFvQixRQUFROzs7b0JBRzdDLEdBQUcscURBQXFELFlBQU07d0JBQzFELElBQUksaUJBQWlCLElBQUk7d0JBQ3pCLGVBQWUsSUFBSTt3QkFDbkIsZUFBZSxJQUFJO3dCQUNuQixJQUFJLGVBQ0EsbUJBQW1CLGdCQUFnQixJQUFJLGlCQUFpQixlQUFlO3dCQUMzRSxNQUFNLGdCQUFnQjt3QkFDdEIsTUFBTSxZQUFZLG1CQUFtQixJQUFJLGNBQWM7d0JBQ3ZELE1BQU0sWUFBWSxtQkFBbUIsSUFBSSxjQUFjO3dCQUN2RCxPQUFPLE1BQU0sb0JBQW9CLFFBQVE7Ozs7Z0JBSWpELFNBQVMsb0JBQW9CLFlBQU07b0JBQy9CLEdBQUcseUJBQXlCLFlBQU07d0JBQzlCLE1BQU0sWUFBWSxtQkFBbUIsSUFBSSxjQUFjO3dCQUN2RCxNQUFNLFlBQVksbUJBQW1CLElBQUksY0FBYzt3QkFDdkQsTUFBTSxZQUFZLG1CQUFtQixJQUFJLGNBQWM7d0JBQ3ZELE1BQU07d0JBQ04sT0FBTyxNQUFNLG9CQUFvQixRQUFROzs7O2dCQUlqRCxTQUFTLDBCQUEwQixZQUFNO29CQUNyQyxJQUFJLE9BQU8sSUFBSSxjQUFjO29CQUM3QixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxJQUFJLFdBQVcsbUJBQW1CO3dCQUNsQyxNQUFNLFlBQVk7d0JBQ2xCLE9BQU8sTUFBTSxxQkFBcUIsS0FBSyxLQUFLLFFBQVE7OztvQkFHeEQsR0FBRyxnRkFBZ0YsWUFBTTt3QkFDckYsSUFBSSxpQkFBaUIsSUFBSTs0QkFDckIsYUFBYSxJQUFJLGNBQWM7NEJBQy9CLFdBQVcsbUJBQW1CLGdCQUFnQixZQUFZO3dCQUM5RCxlQUFlO3dCQUNmLE1BQU0sZ0JBQWdCO3dCQUN0QixPQUFPLE1BQU0scUJBQXFCLEtBQUssSUFBSSxhQUFhLFFBQVE7OztvQkFHcEUsR0FBRyxxRUFBcUUsWUFBTTt3QkFDMUUsSUFBSSxpQkFBaUIsSUFBSTs0QkFDckIsYUFBYSxJQUFJLGNBQWM7NEJBQy9CLFdBQVcsbUJBQW1CLGdCQUFnQixZQUFZO3dCQUM5RCxlQUFlOzt3QkFFZixlQUFlLElBQUk7d0JBQ25CLE1BQU0sZ0JBQWdCO3dCQUN0QixPQUFPLE1BQU0scUJBQXFCLEtBQUssSUFBSSxhQUFhLElBQUk7OztvQkFHaEUsR0FBRyxzREFBc0QsWUFBTTt3QkFDM0QsSUFBSSxpQkFBaUIsSUFBSTs0QkFDckIsYUFBYSxJQUFJLGNBQWM7NEJBQy9CLFdBQVcsbUJBQW1CLGdCQUFnQixJQUFJLGlCQUFpQjt3QkFDdkUsZUFBZTt3QkFDZixNQUFNLGdCQUFnQjt3QkFDdEIsT0FBTyxNQUFNLHFCQUFxQixLQUFLLElBQUksYUFBYSxJQUFJOzs7b0JBR2hFLEdBQUcsMkVBQTJFLFlBQU07d0JBQ2hGLElBQUksaUJBQWlCLElBQUk7NEJBQ3JCLGFBQWEsSUFBSSxjQUFjOzRCQUMvQixXQUFXLG1CQUFtQixnQkFBZ0IsWUFBWTt3QkFDOUQsZUFBZTt3QkFDZixNQUFNLGdCQUFnQjt3QkFDdEIsT0FBTyxNQUFNLHFCQUFxQixLQUFLLElBQUksWUFBWSxJQUFJOzs7b0JBRy9ELEdBQUcsbUZBQW1GLFlBQU07d0JBQ3hGLElBQUksaUJBQWlCLElBQUk7NEJBQ3JCLGFBQWEsSUFBSSxjQUFjOzRCQUMvQixXQUFXLG1CQUFtQixnQkFBZ0IsWUFBWTt3QkFDOUQsZUFBZSxJQUFJO3dCQUNuQixNQUFNLGdCQUFnQjt3QkFDdEIsT0FBTyxNQUFNLHFCQUFxQixLQUFLLElBQUksWUFBWSxRQUFROzs7Ozs7R0FtRHhFIiwiZmlsZSI6ImNvbW1vbi9kYXRhdmlldy9kZWNpc2lvbi9EZWNpc2lvblN0b3JlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dC50dWNrZXIgb24gMi8xMy8xNy5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGVjaXNpb25Nb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L2RlY2lzaW9uL0RlY2lzaW9uTW9kdWxlJztcblxuaW1wb3J0IEFic3RyYWN0RGVjaWRhYmxlSXRlbSBmcm9tICdjb21tb24vZGF0YXZpZXcvZGVjaXNpb24vQWJzdHJhY3REZWNpZGFibGVJdGVtJztcbmltcG9ydCBBYnN0cmFjdERlY2lzaW9uU2NvcGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L2RlY2lzaW9uL0Fic3RyYWN0RGVjaXNpb25TY29wZSc7XG5cblxuY2xhc3MgRGVjaXNpb25TY29wZSBleHRlbmRzIEFic3RyYWN0RGVjaXNpb25TY29wZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXN0VmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50ZXN0VmFsdWUgPSB0ZXN0VmFsdWU7XG4gICAgfVxuXG4gICAgbWF0Y2hlcyhzY29wZSkge1xuICAgICAgICByZXR1cm4gKCEhc2NvcGUgJiYgKHRoaXMudGVzdFZhbHVlID09PSBzY29wZS50ZXN0VmFsdWUpKTtcbiAgICB9XG5cbiAgICBnZXRGaWx0ZXJWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYWRkUXVlcnlQYXJhbWV0ZXJzKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuY2xhc3MgRGVjaWRhYmxlSXRlbSBleHRlbmRzIEFic3RyYWN0RGVjaWRhYmxlSXRlbSB7XG4gICAgY29uc3RydWN0b3IoaWQsIHNjb3BlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5kZWNpc2lvblNjb3BlID0gc2NvcGUgfHwgbmV3IERlY2lzaW9uU2NvcGUoKTtcbiAgICB9XG5cbiAgICBnZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxuXG4gICAgZ2V0U2NvcGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlY2lzaW9uU2NvcGU7XG4gICAgfVxufVxuXG5kZXNjcmliZSgnRGVjaXNpb25TdG9yZScsICgpID0+IHtcblxuICAgIGxldCBEZWNpc2lvbiwgU2VsZWN0aW9uTW9kZWwsIHN0b3JlLCBpdGVtMSwgaXRlbTIsIGl0ZW0zLCB0YWJsZVNjb3BlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGVjaXNpb25Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKERlY2lzaW9uU3RvcmUsIF9EZWNpc2lvbl8sIF9TZWxlY3Rpb25Nb2RlbF8pIHtcbiAgICAgICAgRGVjaXNpb24gPSBfRGVjaXNpb25fO1xuICAgICAgICBTZWxlY3Rpb25Nb2RlbCA9IF9TZWxlY3Rpb25Nb2RlbF87XG5cbiAgICAgICAgc3RvcmUgPSBuZXcgRGVjaXNpb25TdG9yZSgpO1xuXG4gICAgICAgIGl0ZW0xID0gbmV3IERlY2lkYWJsZUl0ZW0oJ2EnKTtcbiAgICAgICAgaXRlbTIgPSBuZXcgRGVjaWRhYmxlSXRlbSgnYicpO1xuICAgICAgICBpdGVtMyA9IG5ldyBEZWNpZGFibGVJdGVtKCdjJyk7XG5cbiAgICAgICAgdGFibGVTY29wZSA9IG5ldyBEZWNpc2lvblNjb3BlKCdPcGVuJyk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0pIHtcbiAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCk7XG4gICAgICAgIGRlY2lzaW9uLmluaXRpYWxpemVJdGVtRGVjaXNpb24oaXRlbSwgaXRlbS5nZXRTY29wZSgpKTtcbiAgICAgICAgcmV0dXJuIGRlY2lzaW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgc2NvcGUsIGNvdW50KSB7XG4gICAgICAgIGxldCBkZWNpc2lvbiA9IG5ldyBEZWNpc2lvbigpO1xuICAgICAgICBkZWNpc2lvbi5pbml0aWFsaXplQnVsa0RlY2lzaW9uKHNlbGVjdGlvbk1vZGVsLCBjb3VudCwgc2NvcGUpO1xuICAgICAgICByZXR1cm4gZGVjaXNpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdExpbmVJdGVtQWN0aW9uV2l0aEJ1bGtTZWxlY3RTb21lKGlzQWRkKSB7XG4gICAgICAgIC8vIEFkZCBhIGJ1bGsgZGVjaXNpb24gd2l0aCBhIGNvdXBsZSBvZiBpdGVtcy5cbiAgICAgICAgbGV0IHNlbGVjdFNvbWUgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgc2VsZWN0U29tZS5hZGQoaXRlbTEpO1xuICAgICAgICBzZWxlY3RTb21lLmFkZChpdGVtMik7XG4gICAgICAgIGxldCBidWxrRGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgc2VsZWN0U29tZS5zaXplKCkpO1xuICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oYnVsa0RlY2lzaW9uKTtcblxuICAgICAgICAvLyBBZGQvY2xlYXIgYSBsaW5lLWl0ZW0gZGVjaXNpb24gYW5kIGNoZWNrIHRoYXQgaXQgZ2V0cyByZW1vdmVkIGZyb20gdGhlIGJ1bGsgZGVjaXNpb24uXG4gICAgICAgIGlmIChpc0FkZCkge1xuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbiA9IGNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtMSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RvcmUuY2xlYXJEZWNpc2lvbihpdGVtMSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwZWN0KHNlbGVjdFNvbWUuc2l6ZSgpKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3Qoc2VsZWN0U29tZS5nZXRJdGVtcygpKS5ub3QudG9Db250YWluKGl0ZW0xKTtcbiAgICAgICAgZXhwZWN0KHNlbGVjdFNvbWUuZ2V0SXRlbXMoKSkudG9Db250YWluKGl0ZW0yKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0TGluZUl0ZW1BY3Rpb25XaXRoQnVsa1NlbGVjdEFsbChpc0FkZCkge1xuICAgICAgICAvLyBBZGQgYSBzZWxlY3QgYWxsIGJ1bGsgZGVjaXNpb24uXG4gICAgICAgIGxldCBzZWxlY3RBbGwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgc2VsZWN0QWxsLmlzSW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbCwgbmV3IERlY2lzaW9uU2NvcGUoKSwgMSk7XG4gICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrRGVjaXNpb24pO1xuXG4gICAgICAgIC8vIEFkZC9jbGVhciBhIGxpbmUtaXRlbSBkZWNpc2lvbiBhbmQgY2hlY2sgdGhhdCBpdCBnZXRzIGV4Y2x1ZGVkIGZyb20gdGhlIGJ1bGsgZGVjaXNpb24uXG4gICAgICAgIGlmIChpc0FkZCkge1xuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbiA9IGNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtMSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RvcmUuY2xlYXJEZWNpc2lvbihpdGVtMSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwZWN0KHNlbGVjdEFsbC5zaXplKCkpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChzZWxlY3RBbGwuZ2V0SXRlbXMoKSkudG9Db250YWluKGl0ZW0xKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNlbGVjdGlvbk1vZGVsRm9yQnVsayhzZWxlY3RBbGxNb2RlbCwgaXRlbVNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdEFsbE1vZGVsLmlzSW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbE1vZGVsLCB0YWJsZVNjb3BlLCA1KTtcbiAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGJ1bGtEZWNpc2lvbik7XG4gICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoNSk7XG4gICAgICAgIHNweU9uKHNlbGVjdEFsbE1vZGVsLCAnaXNJdGVtU2VsZWN0ZWQnKS5hbmQucmV0dXJuVmFsdWUoaXRlbVNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnYWRkRGVjaXNpb24oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2FkZHMgYSBuZXcgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBEZWNpZGFibGVJdGVtKCc0NTQ1NCcpLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uID0gY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0pLFxuICAgICAgICAgICAgICAgIGZvdW5kRGVjaXNpb247XG5cbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uKTtcbiAgICAgICAgICAgIGZvdW5kRGVjaXNpb24gPSBzdG9yZS5nZXREZWNpc2lvbihpdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbikudG9CZShmb3VuZERlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlcGxhY2VzIGV4aXN0aW5nIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgRGVjaWRhYmxlSXRlbSgnNDU0NTQnKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjEgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbSksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24yID0gY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0pLFxuICAgICAgICAgICAgICAgIGZvdW5kRGVjaXNpb247XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihkZWNpc2lvbjEpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24yKTtcbiAgICAgICAgICAgIGZvdW5kRGVjaXNpb24gPSBzdG9yZS5nZXREZWNpc2lvbihpdGVtLmlkKTtcbiAgICAgICAgICAgIGV4cGVjdChmb3VuZERlY2lzaW9uKS50b0JlKGRlY2lzaW9uMik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIHRoZSBpdGVtIGZyb20gYSBub24tc2VsZWN0IGFsbCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RMaW5lSXRlbUFjdGlvbldpdGhCdWxrU2VsZWN0U29tZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2V4Y2x1ZGVzIHRoZSBpdGVtIGZyb20gYSBzZWxlY3QgYWxsIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgdGVzdExpbmVJdGVtQWN0aW9uV2l0aEJ1bGtTZWxlY3RBbGwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBzdG9yZS5hZGREZWNpc2lvbih1bmRlZmluZWQpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdWtlcyB3aXRoIGEgYnVsayBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihuZXcgU2VsZWN0aW9uTW9kZWwoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgNSk7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24pKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHRoZSBpdGVtIHRvIGV4Y2x1c2lvbiBsaXN0IGZvciBzYW1lIHRhYmxlIHNjb3BlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdEFsbE1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IG5ldyBEZWNpZGFibGVJdGVtKCdhJywgdGFibGVTY29wZSk7XG4gICAgICAgICAgICBzZXR1cFNlbGVjdGlvbk1vZGVsRm9yQnVsayhzZWxlY3RBbGxNb2RlbCwgdHJ1ZSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihjcmVhdGVJdGVtRGVjaXNpb24obmV3SXRlbSkpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdEFsbE1vZGVsLnNpemUoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoNSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsZWN0QWxsTW9kZWwuZ2V0SXRlbXMoKSkudG9Db250YWluKG5ld0l0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgYWRkIHRoZSBpdGVtIHRvIGV4Y2x1c2lvbiBsaXN0IGZvciBkaWZmZXJlbnQgdGFibGUgc2NvcGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0QWxsTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgICAgIHNldHVwU2VsZWN0aW9uTW9kZWxGb3JCdWxrKHNlbGVjdEFsbE1vZGVsLCBmYWxzZSk7XG4gICAgICAgICAgICAvLyBObyB0YWJsZVNjb3BlIG9uIHRoZSBpdGVtXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTEpKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RBbGxNb2RlbC5zaXplKCkpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDYpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdEFsbE1vZGVsLmdldEl0ZW1zKCkpLm5vdC50b0NvbnRhaW4oaXRlbTEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjbGVhckRlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZW1vdmVzIHRoZSBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IERlY2lkYWJsZUl0ZW0oJ2ZnZGFnZGZzZycpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0pKTtcbiAgICAgICAgICAgIHN0b3JlLmNsZWFyRGVjaXNpb24oaXRlbSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb24oaXRlbS5pZCkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgcmVtb3ZlIGRlY2lzaW9uIGlmIG5vbmUgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0xKSk7XG4gICAgICAgICAgICBzdG9yZS5jbGVhckRlY2lzaW9uKGl0ZW0yKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbihpdGVtMS5pZCkpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIHRoZSBpdGVtIGZyb20gYSBub24tc2VsZWN0IGFsbCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RMaW5lSXRlbUFjdGlvbldpdGhCdWxrU2VsZWN0U29tZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdleGNsdWRlcyB0aGUgaXRlbSBmcm9tIGEgc2VsZWN0IGFsbCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIHRlc3RMaW5lSXRlbUFjdGlvbldpdGhCdWxrU2VsZWN0QWxsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIGNlcnRpZmljYXRpb25JdGVtSWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gc3RvcmUuY2xlYXJEZWNpc2lvbih1bmRlZmluZWQpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhZGRzIHRoZSBpdGVtIHRvIGV4Y2x1c2lvbiBsaXN0IGZvciBzYW1lIHRhYmxlIHNjb3BlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdEFsbE1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgbmV3SXRlbSA9IG5ldyBEZWNpZGFibGVJdGVtKCdhJywgdGFibGVTY29wZSk7XG4gICAgICAgICAgICBzZXR1cFNlbGVjdGlvbk1vZGVsRm9yQnVsayhzZWxlY3RBbGxNb2RlbCwgdHJ1ZSk7XG4gICAgICAgICAgICBzdG9yZS5jbGVhckRlY2lzaW9uKG5ld0l0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdEFsbE1vZGVsLnNpemUoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoNCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsZWN0QWxsTW9kZWwuZ2V0SXRlbXMoKSkudG9Db250YWluKG5ld0l0ZW0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lc25vdCBhZGQgdGhlIGl0ZW0gdG8gZXhjbHVzaW9uIGxpc3QgZm9yIGRpZmZlcmVudCBzZWxlY3Rpb25Nb2RlbFNjb3BlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdEFsbE1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XG4gICAgICAgICAgICBzZXR1cFNlbGVjdGlvbk1vZGVsRm9yQnVsayhzZWxlY3RBbGxNb2RlbCwgZmFsc2UpO1xuICAgICAgICAgICAgc3RvcmUuY2xlYXJEZWNpc2lvbihpdGVtMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDUpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdEFsbE1vZGVsLmdldEl0ZW1zKCkpLm5vdC50b0NvbnRhaW4oaXRlbTEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREZWNpc2lvbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0aGUgQ2VydGlmaWNhdGlvbkRlY2lzaW9uIGlmIGl0IGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IERlY2lkYWJsZUl0ZW0oJ3h5enp5JyksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbSwgc3RhdHVzKSxcbiAgICAgICAgICAgICAgICBmb3VuZERlY2lzaW9uO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24pO1xuICAgICAgICAgICAgZm91bmREZWNpc2lvbiA9IHN0b3JlLmdldERlY2lzaW9uKGl0ZW0uaWQpO1xuICAgICAgICAgICAgZXhwZWN0KGZvdW5kRGVjaXNpb24pLnRvQmUoZGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbm8gZGVjaXNpb24gZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9uKCdoZ2hnaGcnKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjZXJ0aWZpY2F0aW9uSXRlbUlkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHN0b3JlLmdldERlY2lzaW9uKHVuZGVmaW5lZCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQnVsa0RlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBzZWxlY3RBbGwsIHNlbGVjdFNvbWU7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZWN0QWxsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XG4gICAgICAgICAgICBzZWxlY3RBbGwuaXNJbmNsdWRlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHNlbGVjdFNvbWUgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgaWYgbm8gZGVjaXNpb24gaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gc3RvcmUuYWRkQnVsa0RlY2lzaW9uKG51bGwpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdiYXJmcyBpZiB0aGUgZGVjaXNpb24gaXMgbm90IGJ1bGsnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbURlY2lzaW9uID0gY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0xKTtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBzdG9yZS5hZGRCdWxrRGVjaXNpb24oaXRlbURlY2lzaW9uKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWRkcyBhIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RBbGwsIG5ldyBEZWNpc2lvblNjb3BlKCksIDEpO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGJ1bGtEZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLnRvQ29udGFpbihidWxrRGVjaXNpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9uQ291bnQoKSkudG9FcXVhbCgxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlbW92ZXMgYWxsIGV4aXN0aW5nIGJ1bGsgZGVjaXNpb25zIGlmIG5ldyBkZWNpc2lvbiBpcyBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1bGsxID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAxKTtcbiAgICAgICAgICAgIGxldCBidWxrMiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RTb21lLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIHNlbGVjdFNvbWUuc2l6ZSgpKTtcblxuICAgICAgICAgICAgYnVsazIuc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0yKTtcblxuICAgICAgICAgICAgLy8gQWRkIHNvbWUgYnVsayBkZWNpc2lvbnMuXG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oYnVsazEpO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGJ1bGsyKTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgc2VsZWN0IGFsbCBkZWNpc2lvbiBhbmQgbWFrZSBzdXJlIHRoYXQgdGhlIG90aGVyIGRlY2lzaW9ucyB3ZXJlIHJlbW92ZWQuXG4gICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAxKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrRGVjaXNpb24pO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLm5vdC50b0NvbnRhaW4oYnVsazEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS5ub3QudG9Db250YWluKGJ1bGsyKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbnMoKSkudG9Db250YWluKGJ1bGtEZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmVtb3ZlcyBhbGwgZXhpc3RpbmcgYnVsayBkZWNpc2lvbnMgZm9yIHNhbWUgdGFibGUgc2NvcGUgaWYgbmV3IGRlY2lzaW9uIGlzIHNlbGVjdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVsazEgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLCB0YWJsZVNjb3BlLCA1KTtcblxuICAgICAgICAgICAgc2VsZWN0U29tZS5hZGQoaXRlbTIpO1xuXG4gICAgICAgICAgICBsZXQgYnVsazIgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgc2VsZWN0U29tZS5zaXplKCkpO1xuXG4gICAgICAgICAgICAvLyBBZGQgc29tZSBidWxrIGRlY2lzaW9ucy5cbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrMSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oYnVsazIpO1xuXG4gICAgICAgICAgICAvLyBBZGQgYSBzZWxlY3QgYWxsIGRlY2lzaW9uIGFuZCBtYWtlIHN1cmUgdGhhdCB0aGUgb3RoZXIgZGVjaXNpb25zIHdlcmUgcmVtb3ZlZC5cbiAgICAgICAgICAgIGxldCBidWxrRGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLCB0YWJsZVNjb3BlLCA2KTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrRGVjaXNpb24pO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLm5vdC50b0NvbnRhaW4oYnVsazEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS50b0NvbnRhaW4oYnVsazIpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS50b0NvbnRhaW4oYnVsa0RlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoNiArIHNlbGVjdFNvbWUuc2l6ZSgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NoYW5nZXMgZXhpc3RpbmcgYnVsayBzZWxlY3QgYWxsIGRlY2lzaW9uIHRvIGluY2x1ZGUgZXhjbHVzaW9uIGZyb20gbmV3IHNlbGVjdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVsazEgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDQpLFxuICAgICAgICAgICAgICAgIG5ld0RlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAyKTtcblxuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGJ1bGsxKTtcbiAgICAgICAgICAgIC8vIEV4Y2x1ZGUgMiBpdGVtc1xuICAgICAgICAgICAgbmV3RGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIG5ld0RlY2lzaW9uLnNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMik7XG5cbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihuZXdEZWNpc2lvbik7XG5cbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbnMoKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoYnVsazEuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoYnVsazEuYnVsa0NvdW50KS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1bGsxLnNlbGVjdGlvbk1vZGVsLmdldEl0ZW1zKCkpLnRvQ29udGFpbihpdGVtMSk7XG4gICAgICAgICAgICBleHBlY3QoYnVsazEuc2VsZWN0aW9uTW9kZWwuZ2V0SXRlbXMoKSkudG9Db250YWluKGl0ZW0yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FkZHMgZXhjbHVzaW9ucyB0byBleGlzdGluZyBidWxrIHNlbGVjdCBhbGwgZGVjaXNpb25zIGlmIG5ldyBkZWNpc2lvbiBpcyBub3Qgc2VsZWN0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBhIHNlbGVjdCBhbGwgYnVsayBhY3Rpb24gd2l0aCBhIHNpbmdsZSBleGNsdXNpb24uXG4gICAgICAgICAgICBzZWxlY3RBbGwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RBbGxEZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RBbGwsIG5ldyBEZWNpc2lvblNjb3BlKCksIDIpO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKHNlbGVjdEFsbERlY2lzaW9uKTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgc2VsZWN0IHNvbWUgZGVjaXNpb24gd2l0aCBhbiBpdGVtIHNlbGVjdGVkLlxuICAgICAgICAgICAgc2VsZWN0U29tZS5hZGQoaXRlbTIpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdFNvbWVEZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RTb21lLCBuZXcgRGVjaXNpb25TY29wZSgpLCBzZWxlY3RTb21lLnNpemUoKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oc2VsZWN0U29tZURlY2lzaW9uKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgYXJlIHR3byBidWxrIGRlY2lzaW9ucyBhbmQgdGhhdCB0aGUgc2VsZWN0QWxsIGhhcyB0aGUgc2VsZWN0U29tZSBpdGVtIGV4Y2x1ZGVkLlxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9uQ291bnQoKSkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RBbGxEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5nZXRJdGVtcygpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RBbGxEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5nZXRJdGVtcygpKS50b0NvbnRhaW4oaXRlbTEpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdEFsbERlY2lzaW9uLnNlbGVjdGlvbk1vZGVsLmdldEl0ZW1zKCkpLnRvQ29udGFpbihpdGVtMik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZW1vdmVzIGl0ZW1zIGZyb20gZXhpc3RpbmcgYnVsayBub24tc2VsZWN0IGFsbCBkZWNpc2lvbnMgaWYgbmV3IGRlY2lzaW9uIGlzIG5vdCBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIGEgYnVsayBkZWNpc2lvbiB3aXRoIGEgY291cGxlIG9mIGl0ZW1zIHNlbGVjdGVkLlxuICAgICAgICAgICAgbGV0IHNlbGVjdFNvbWVJbml0aWFsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XG4gICAgICAgICAgICBzZWxlY3RTb21lSW5pdGlhbC5hZGQoaXRlbTEpO1xuICAgICAgICAgICAgc2VsZWN0U29tZUluaXRpYWwuYWRkKGl0ZW0yKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RTb21lSW5pdGlhbERlY2lzaW9uID1cbiAgICAgICAgICAgICAgICBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZUluaXRpYWwsIG5ldyBEZWNpc2lvblNjb3BlKCksIHNlbGVjdFNvbWVJbml0aWFsLnNpemUoKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oc2VsZWN0U29tZUluaXRpYWxEZWNpc2lvbik7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhbm90aGVyIHNlbGVjdCBzb21lIGRlY2lzaW9uIHRoYXQgd2lsbCBvdmVycmlkZSBvbmUgb2YgdGhlIGl0ZW1zLlxuICAgICAgICAgICAgc2VsZWN0U29tZS5hZGQoaXRlbTIpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdFNvbWVOZXdEZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RTb21lLCBuZXcgRGVjaXNpb25TY29wZSgpLCBzZWxlY3RTb21lLnNpemUoKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oc2VsZWN0U29tZU5ld0RlY2lzaW9uKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgZmlyc3QgZGVjaXNpb24gaGFzIG9uZSBpdGVtIHJlbW92ZWQuXG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdFNvbWVJbml0aWFsRGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuZ2V0SXRlbXMoKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3Qoc2VsZWN0U29tZUluaXRpYWxEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5nZXRJdGVtcygpKS50b0NvbnRhaW4oaXRlbTEpO1xuICAgICAgICAgICAgZXhwZWN0KHNlbGVjdFNvbWVOZXdEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5nZXRJdGVtcygpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWxlY3RTb21lTmV3RGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuZ2V0SXRlbXMoKSkudG9Db250YWluKGl0ZW0yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NvbXBsZXRlbHkgcmVtb3ZlcyBleGlzdGluZyBidWxrIG5vbi1zZWxlY3QgYWxsIGRlY2lzaW9uIGlmIG5ldyBkZWNpc2lvbiBpbmNsdWRlcyB0aGUgc2FtZSBpdGVtcycsICgpID0+IHtcbiAgICAgICAgICAgIC8vIEFkZCBhIGJ1bGsgZGVjaXNpb24gd2l0aCBhIGNvdXBsZSBvZiBpdGVtcyBzZWxlY3RlZC5cbiAgICAgICAgICAgIGxldCBzZWxlY3RTb21lSW5pdGlhbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpO1xuICAgICAgICAgICAgc2VsZWN0U29tZUluaXRpYWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbGVjdFNvbWVJbml0aWFsLmFkZChpdGVtMik7XG4gICAgICAgICAgICBsZXQgc2VsZWN0U29tZUluaXRpYWxEZWNpc2lvbiA9XG4gICAgICAgICAgICAgICAgY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWVJbml0aWFsLCBuZXcgRGVjaXNpb25TY29wZSgpLCBzZWxlY3RTb21lSW5pdGlhbC5zaXplKCkpO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWVJbml0aWFsRGVjaXNpb24pO1xuXG4gICAgICAgICAgICAvLyBBZGQgYW5vdGhlciBzZWxlY3Qgc29tZSBkZWNpc2lvbiB0aGF0IHdpbGwgb3ZlcnJpZGUgYWxsIHRoZSBpdGVtcy5cbiAgICAgICAgICAgIHNlbGVjdFNvbWUuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbGVjdFNvbWUuYWRkKGl0ZW0yKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RTb21lTmV3RGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgc2VsZWN0U29tZS5zaXplKCkpO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWVOZXdEZWNpc2lvbik7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgb25seSB0aGUgc2Vjb25kIGRlY2lzaW9uIGV4aXN0cy5cbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLm5vdC50b0NvbnRhaW4oc2VsZWN0U29tZUluaXRpYWxEZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLnRvQ29udGFpbihzZWxlY3RTb21lTmV3RGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2xlYXJzIGFsbCBsaW5lIGl0ZW0gZGVjaXNpb25zIGZvciBzYW1lIHNjb3BlIGlmIG5ldyBkZWNpc2lvbiBpcyBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIGEgY291cGxlIGl0ZW0gZGVjaXNpb25zLlxuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbjEgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTEpO1xuICAgICAgICAgICAgLy8gU2V0IGEgZGlmZmVyZW50IHNjb3BlIG9uIGFuIGl0ZW1cbiAgICAgICAgICAgIGxldCBuZXdJdGVtID0gbmV3IERlY2lkYWJsZUl0ZW0oaXRlbTIuaWQsIHRhYmxlU2NvcGUpO1xuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbjIgPSBjcmVhdGVJdGVtRGVjaXNpb24obmV3SXRlbSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24xKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGl0ZW1EZWNpc2lvbjIpO1xuXG4gICAgICAgICAgICAvLyBBZGQgYSBidWxrIHNlbGVjdCBhbGwuXG4gICAgICAgICAgICBsZXQgc2VsZWN0QWxsRGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLCBuZXcgRGVjaXNpb25TY29wZSgpLCA1KTtcbiAgICAgICAgICAgIHNweU9uKHNlbGVjdEFsbCwgJ2lzSXRlbVNlbGVjdGVkJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuXG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oc2VsZWN0QWxsRGVjaXNpb24pO1xuXG4gICAgICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSBsaW5lIGl0ZW0gZGVjaXNpb25zIGFyZSBjbGVhcmVkLlxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9uQ291bnQoKSkudG9FcXVhbCg2KTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbnMoKSkubm90LnRvQ29udGFpbihpdGVtRGVjaXNpb24xKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbnMoKSkudG9Db250YWluKGl0ZW1EZWNpc2lvbjIpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS50b0NvbnRhaW4oc2VsZWN0QWxsRGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGl0KCdyZW1vdmVzIG1hdGNoaW5nIGV4aXN0aW5nIGxpbmUgaXRlbSBkZWNpc2lvbnMgaWYgbmV3IGRlY2lzaW9uIGlzIG5vbi1zZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gQWRkIGEgY291cGxlIGl0ZW0gZGVjaXNpb25zLlxuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbjEgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTEpO1xuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbjIgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTIpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oaXRlbURlY2lzaW9uMSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24yKTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgYnVsayBzZWxlY3Qgc29tZSB3aXRoIG9uZSBvZiB0aGUgaXRlbXMuXG4gICAgICAgICAgICBzZWxlY3RTb21lLmFkZChpdGVtMSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0U29tZURlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUsIHt9LCBzZWxlY3RTb21lLnNpemUoKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oc2VsZWN0U29tZURlY2lzaW9uKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBpdGVtMSdzIGRlY2lzaW9uIGlzIG5vIGxvbmdlciBzdG9yZWQgc2luY2UgaXQgd2FzIG92ZXJyaWRkZW4gYnkgdGhlIGJ1bGsgZGVjaXNpb24uXG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS5ub3QudG9Db250YWluKGl0ZW1EZWNpc2lvbjEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldERlY2lzaW9ucygpKS50b0NvbnRhaW4oaXRlbURlY2lzaW9uMik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLnRvQ29udGFpbihzZWxlY3RTb21lRGVjaXNpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnd2l0aCBncm91cHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXhjZXB0aW9uR3JvdXAsIGJ1bmRsZUdyb3VwO1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoUmVzdWx0R3JvdXApID0+IHtcbiAgICAgICAgICAgICAgICBleGNlcHRpb25Hcm91cCA9IG5ldyBSZXN1bHRHcm91cCh7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdFeGNlcHRpb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiA1XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBidW5kbGVHcm91cCA9IG5ldyBSZXN1bHRHcm91cCh7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdCdW5kbGUnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAyXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHByb3BlcnR5IG9uIHRoZSBpdGVtIG9iamVjdHMgdG8gbGluZSB1cCB3aXRoIHRoZSBncm91cHNcbiAgICAgICAgICAgICAgICBpdGVtMS50eXBlID0gJ0V4Y2VwdGlvbic7XG4gICAgICAgICAgICAgICAgaXRlbTIudHlwZSA9ICdCdW5kbGUnO1xuICAgICAgICAgICAgICAgIGl0ZW0zLnR5cGUgPSAnQnVuZGxlJztcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgbGluZSBpdGVtIGRlY2lzaW9ucyBmb3IgaXRlbXMgdGhhdCBmYWxsIGludG8gYSBncm91cCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURlY2lzaW9uMSA9IGNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtMSksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EZWNpc2lvbjIgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTIpLFxuICAgICAgICAgICAgICAgICAgICBuZXdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgc2VsZWN0U29tZS5zaXplKCkpO1xuXG4gICAgICAgICAgICAgICAgbmV3QnVsay5zZWxlY3Rpb25Nb2RlbC5hZGRHcm91cChleGNlcHRpb25Hcm91cCk7XG5cbiAgICAgICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24xKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihpdGVtRGVjaXNpb24yKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24obmV3QnVsayk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbnMoKSkubm90LnRvQ29udGFpbihpdGVtRGVjaXNpb24xKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLnRvQ29udGFpbihpdGVtRGVjaXNpb24yKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25zKCkpLnRvQ29udGFpbihuZXdCdWxrKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnaW5jbHVkZXMgZ3JvdXAgZXhjbHVzaW9ucyBmcm9tIG5ldyBidWxrIHNlbGVjdCBhbGwgaW4gZXhpc3RpbmcgYnVsayBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ0J1bGsgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDQpLFxuICAgICAgICAgICAgICAgICAgICBuZXdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAzKTtcblxuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoZXhjZXB0aW9uR3JvdXApO1xuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwucmVtb3ZlKGl0ZW0xKTtcblxuICAgICAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihleGlzdGluZ0J1bGspO1xuICAgICAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihuZXdCdWxrKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5oYXNHcm91cChleGNlcHRpb25Hcm91cCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5nZXRHcm91cChleGNlcHRpb25Hcm91cCkuc2VsZWN0aW9uTW9kZWwuaGFzSXRlbShpdGVtMSkpXG4gICAgICAgICAgICAgICAgICAgIC50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBpbmNsdWRlIGdyb3VwIGV4Y2x1c2lvbnMgZnJvbSBuZXcgYnVsayBzZWxlY3QgYWxsIGlmIGV4aXN0aW5nIHNlbGVjdCBhbGwgZXhjbHVkZWQgdGhlbScsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCA0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0J1bGsgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDMpO1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoZXhjZXB0aW9uR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBuZXdCdWxrLnNlbGVjdGlvbk1vZGVsLnJlbW92ZShpdGVtMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmFkZEdyb3VwKGV4Y2VwdGlvbkdyb3VwKTtcblxuICAgICAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZXhpc3RpbmdCdWxrKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKG5ld0J1bGspO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaGFzR3JvdXAoZXhjZXB0aW9uR3JvdXApKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5oYXNJdGVtKGl0ZW0xKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCByZW1vdmUgZ3JvdXAgZXhjbHVzaW9ucyBmcm9tIG5ldyBidWxrIHNlbGVjdCBhbGwgaW4gZXhpc3Rpbmcgbm9uLXNlbGVjdCBhbGwgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nQnVsayA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RTb21lLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDQpLFxuICAgICAgICAgICAgICAgICAgICBuZXdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdEFsbC5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAzKTtcblxuICAgICAgICAgICAgICAgIGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTEpO1xuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoZXhjZXB0aW9uR3JvdXApO1xuXG4gICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGV4aXN0aW5nQnVsayk7XG4gICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKG5ld0J1bGspO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5oYXNJdGVtKGl0ZW0xKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgncmVtb3ZlcyBncm91cHMgZnJvbSBleGlzdGluZyBub24tc2VsZWN0IGFsbCBkZWNpc2lvbiBpZiBub3QgZXhjbHVkZWQgZnJvbSBuZXcgc2VsZWN0IGFsbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgNCksXG4gICAgICAgICAgICAgICAgICAgIG5ld0J1bGsgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0QWxsLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDMpO1xuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmFkZEdyb3VwKGV4Y2VwdGlvbkdyb3VwKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoYnVuZGxlR3JvdXApO1xuXG4gICAgICAgICAgICAgICAgbmV3QnVsay5zZWxlY3Rpb25Nb2RlbC5hZGRHcm91cChidW5kbGVHcm91cCk7XG5cbiAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZXhpc3RpbmdCdWxrKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24obmV3QnVsayk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmhhc0dyb3VwKGV4Y2VwdGlvbkdyb3VwKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5oYXNHcm91cChidW5kbGVHcm91cCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ2V4Y2x1ZGVzIGdyb3VwIGluY2x1c2lvbnMgZnJvbSBleGlzdGluZyBidWxrIHNlbGVjdCBhbGwgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nQnVsayA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RBbGwuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgNCksXG4gICAgICAgICAgICAgICAgICAgIG5ld0J1bGsgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZS5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAzKTtcblxuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoYnVuZGxlR3JvdXApO1xuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwucmVtb3ZlKGl0ZW0yKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW4gZXhjbHVzaW9uIHRvIHRoZSBleGlzdGluZyBidWxrIHNlbGVjdCBhbGwgdG8gdGVzdCB0aGF0IGNvdW50IHJlbWFpbnMgYWNjdXJhdGVcbiAgICAgICAgICAgICAgICBleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0zKTtcblxuICAgICAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihleGlzdGluZ0J1bGspO1xuICAgICAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihuZXdCdWxrKTtcblxuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaGFzR3JvdXAoYnVuZGxlR3JvdXApKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuZ2V0R3JvdXAoYnVuZGxlR3JvdXApLnNlbGVjdGlvbk1vZGVsLmhhc0l0ZW0oaXRlbTIpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuYnVsa0NvdW50KS50b0VxdWFsKDQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdpZ25vcmVzIGluY2x1c2lvbiBmcm9tIGdyb3VwIGV4Y2x1c2lvbiBpbiBuZXcgZGVjaXNpb24gaWYgYWxyZWFkeSBleGNsdWRlZCBmcm9tIGV4aXN0aW5nIHNlbGVjdCBhbGwnLFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nQnVsayA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RBbGwuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgNCksXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgMyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3QnVsay5zZWxlY3Rpb25Nb2RlbC5hZGRHcm91cChidW5kbGVHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwucmVtb3ZlKGl0ZW0yKTtcblxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0yKTtcblxuICAgICAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZXhpc3RpbmdCdWxrKTtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKG5ld0J1bGspO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaGFzR3JvdXAoYnVuZGxlR3JvdXApKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QoZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmdldEdyb3VwKGJ1bmRsZUdyb3VwKS5zZWxlY3Rpb25Nb2RlbC5oYXNJdGVtKGl0ZW0yKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgZ3JvdXAgaW5jbHVzaW9ucyBmcm9tIGV4aXN0aW5nIGJ1bGsgbm9uLXNlbGVjdCBhbGwgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nQnVsayA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3RTb21lLmNsb25lKCksIG5ldyBEZWNpc2lvblNjb3BlKCksIDQpLFxuICAgICAgICAgICAgICAgICAgICBuZXdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgMyk7XG5cbiAgICAgICAgICAgICAgICBuZXdCdWxrLnNlbGVjdGlvbk1vZGVsLmFkZEdyb3VwKGJ1bmRsZUdyb3VwKTtcbiAgICAgICAgICAgICAgICBuZXdCdWxrLnNlbGVjdGlvbk1vZGVsLnJlbW92ZShpdGVtMik7XG5cbiAgICAgICAgICAgICAgICBleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoYnVuZGxlR3JvdXApO1xuXG4gICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGV4aXN0aW5nQnVsayk7XG4gICAgICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKG5ld0J1bGspO1xuXG4gICAgICAgICAgICAgICAgZXhwZWN0KGV4aXN0aW5nQnVsay5zZWxlY3Rpb25Nb2RlbC5oYXNHcm91cChidW5kbGVHcm91cCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaGFzSXRlbShpdGVtMikpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3JlbW92ZXMgaXRlbXMgZnJvbSBleGlzdGluZyBub24tc2VsZWN0IGFsbCBkZWNpc2lvbiB0aGF0IGFyZSBpbiBhIGdyb3VwIG9mIG5ldyBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdCdWxrID0gY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdFNvbWUuY2xvbmUoKSwgbmV3IERlY2lzaW9uU2NvcGUoKSwgNCksXG4gICAgICAgICAgICAgICAgICAgIG5ld0J1bGsgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0U29tZS5jbG9uZSgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAzKTtcblxuICAgICAgICAgICAgICAgIG5ld0J1bGsuc2VsZWN0aW9uTW9kZWwuYWRkR3JvdXAoYnVuZGxlR3JvdXApO1xuXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMik7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMSk7XG5cbiAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZXhpc3RpbmdCdWxrKTtcbiAgICAgICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24obmV3QnVsayk7XG5cbiAgICAgICAgICAgICAgICBleHBlY3QoZXhpc3RpbmdCdWxrLnNlbGVjdGlvbk1vZGVsLmhhc0l0ZW0oaXRlbTEpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChleGlzdGluZ0J1bGsuc2VsZWN0aW9uTW9kZWwuaGFzSXRlbShpdGVtMikpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0J1bGtEZWNpc2lvbnMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgYnVsayBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gY3JlYXRlQnVsa0RlY2lzaW9uKG5ldyBTZWxlY3Rpb25Nb2RlbCgpLCBuZXcgRGVjaXNpb25TY29wZSgpLCAxKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrRGVjaXNpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmhhc0J1bGtEZWNpc2lvbnMoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG5vIGJ1bGsgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW1EZWNpc2lvbjEgPSBjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTEpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oaXRlbURlY2lzaW9uMSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuaGFzQnVsa0RlY2lzaW9ucygpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RGVjaXNpb25zKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGFycmF5IGlmIG5vIGRlY2lzaW9ucyBoYXZlIGJlZW4gbWFkZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBzdG9yZS5nZXREZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0aGUgZGVjaXNpb25zIHRoYXQgd2VyZSBtYWRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0xID0gbmV3IERlY2lkYWJsZUl0ZW0oJzExMTExJyksXG4gICAgICAgICAgICAgICAgaXRlbTIgPSBuZXcgRGVjaWRhYmxlSXRlbSgnMjIyMicpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0xKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihjcmVhdGVJdGVtRGVjaXNpb24oaXRlbTIpKTtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBzdG9yZS5nZXREZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgbGV0IGZvdW5kMSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvdW5kMiA9IGZhbHNlO1xuICAgICAgICAgICAgZGVjaXNpb25zLmZvckVhY2goKGRlY2lzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0xLmlkID09PSBkZWNpc2lvbi5nZXRJdGVtSWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZDEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXRlbTIuaWQgPT09IGRlY2lzaW9uLmdldEl0ZW1JZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmb3VuZDEpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoZm91bmQyKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc29ydHMgdGhlIGRlY2lzaW9ucyBieSBjcmVhdGVkIGRhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbTEgPSBuZXcgRGVjaWRhYmxlSXRlbSgnMTExMTEnKSxcbiAgICAgICAgICAgICAgICBpdGVtMiA9IG5ldyBEZWNpZGFibGVJdGVtKCcyMjIyJyksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjEgPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIG5ldyBEZWNpc2lvblNjb3BlKCksIDIpLFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uMiA9IGNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtMSk7XG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTIpO1xuICAgICAgICAgICAgZGVjaXNpb24xLmNyZWF0ZWQuc2V0SG91cnMoMSk7XG4gICAgICAgICAgICBkZWNpc2lvbjIuY3JlYXRlZC5zZXRIb3VycygyKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uMik7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZGVjaXNpb24xKTtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBzdG9yZS5nZXREZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uc1swXSkudG9FcXVhbChkZWNpc2lvbjEpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uc1sxXSkudG9FcXVhbChkZWNpc2lvbjIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREZWNpc2lvbkNvdW50KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHplcm8gZm9yIG5vIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb3VudCBvZiBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihjcmVhdGVJdGVtRGVjaXNpb24obmV3IERlY2lkYWJsZUl0ZW0oJzExMTExJykpKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGNyZWF0ZUl0ZW1EZWNpc2lvbihuZXcgRGVjaWRhYmxlSXRlbSgnMjIyMjInKSkpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKG5ldyBEZWNpZGFibGVJdGVtKCczMzMzMycpKSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0aGUgY291bnQgb2YgbGluZSBpdGVtIGFuZCBidWxrIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpO1xuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0xKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMik7XG4gICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID1cbiAgICAgICAgICAgICAgICBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIG5ldyBEZWNpc2lvblNjb3BlKCksIHNlbGVjdGlvbk1vZGVsLnNpemUoKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oYnVsa0RlY2lzaW9uKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGNyZWF0ZUl0ZW1EZWNpc2lvbihuZXcgRGVjaWRhYmxlSXRlbSgnMTExMTEnKSkpO1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKG5ldyBEZWNpZGFibGVJdGVtKCcyMjIyMicpKSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RGVjaXNpb25Db3VudCgpKS50b0VxdWFsKDQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjbGVhckRlY2lzaW9ucygpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmVtb3ZlcyBhbGwgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oY3JlYXRlSXRlbURlY2lzaW9uKG5ldyBEZWNpZGFibGVJdGVtKCcxMTExMScpKSk7XG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihjcmVhdGVJdGVtRGVjaXNpb24obmV3IERlY2lkYWJsZUl0ZW0oJzIyMjIyJykpKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGNyZWF0ZUl0ZW1EZWNpc2lvbihuZXcgRGVjaWRhYmxlSXRlbSgnMzMzMzMnKSkpO1xuICAgICAgICAgICAgc3RvcmUuY2xlYXJEZWNpc2lvbnMoKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXREZWNpc2lvbkNvdW50KCkpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEVmZmVjdGl2ZURlY2lzaW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtID0gbmV3IERlY2lkYWJsZUl0ZW0oJzExMTExJyk7XG4gICAgICAgIGl0KCdyZXR1cm5zIGl0ZW0gZGVjaXNpb24gaWYgb25lIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IGNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXRFZmZlY3RpdmVEZWNpc2lvbihpdGVtLmlkKSkudG9FcXVhbChkZWNpc2lvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGJ1bGsgZGVjaXNpb24gaWYgbm8gaXRlbSBkZWNpc2lvbiBhbmQgaXRlbSBpcyBwYXJ0IG9mIGJ1bGsgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgdGFibGVTY29wZSA9IG5ldyBEZWNpc2lvblNjb3BlKCdPcGVuJyksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIHRhYmxlU2NvcGUsIDEpO1xuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oZGVjaXNpb24pO1xuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldEVmZmVjdGl2ZURlY2lzaW9uKGl0ZW0uaWQsIHRhYmxlU2NvcGUpKS50b0VxdWFsKGRlY2lzaW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIG5vIGl0ZW0gZGVjaXNpb24gb3IgYXBwbGljYWJsZSBidWxrIGRlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgdGFibGVTY29wZSA9IG5ldyBEZWNpc2lvblNjb3BlKCdPcGVuJyksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIHRhYmxlU2NvcGUsIDEpO1xuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuc2VsZWN0QWxsKCk7XG4gICAgICAgICAgICAvLyBBZGRpbmcgaXRlbSBtYXJrcyBpdCBhcyBuZWdhdGl2ZSBzZWxlY3Rpb25cbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihkZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RWZmZWN0aXZlRGVjaXNpb24oaXRlbS5pZCwgdGFibGVTY29wZSkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgZGVjaXNpb24gc2NvcGUgZG9lcyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKSxcbiAgICAgICAgICAgICAgICB0YWJsZVNjb3BlID0gbmV3IERlY2lzaW9uU2NvcGUoJ09wZW4nKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgbmV3IERlY2lzaW9uU2NvcGUoKSwgMSk7XG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihkZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RWZmZWN0aXZlRGVjaXNpb24oaXRlbS5pZCwgdGFibGVTY29wZSkpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgdGFibGVTY29wZSBpcyB1bmRlZmluZWQgYW5kIGRlY2lzaW9uIGlzIHNlbGVjdCBhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKSxcbiAgICAgICAgICAgICAgICB0YWJsZVNjb3BlID0gbmV3IERlY2lzaW9uU2NvcGUoJ09wZW4nKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IGNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgdGFibGVTY29wZSwgMSk7XG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihkZWNpc2lvbik7XG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RWZmZWN0aXZlRGVjaXNpb24oaXRlbS5pZCwgdW5kZWZpbmVkKSkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGJ1bGsgZGVjaXNpb24gaWYgdGFibGVTY29wZSBpcyB1bmRlZmluZWQgYW5kIGRlY2lzaW9uIGlzIG5vdCBzZWxlY3QgYWxsJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgdGFibGVTY29wZSA9IG5ldyBEZWNpc2lvblNjb3BlKCdPcGVuJyksXG4gICAgICAgICAgICAgICAgZGVjaXNpb24gPSBjcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIHRhYmxlU2NvcGUsIDEpO1xuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGRlY2lzaW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXRFZmZlY3RpdmVEZWNpc2lvbihpdGVtLmlkLCB1bmRlZmluZWQpKS50b0VxdWFsKGRlY2lzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
