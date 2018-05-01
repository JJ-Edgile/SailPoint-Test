System.register(['test/js/TestInitializer', 'common/dataview/decision/DecisionModule'], function (_export) {
    /**
     * Created by matt.tucker on 2/13/17.
     */

    'use strict';

    var decisionModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewDecisionDecisionModule) {
            decisionModule = _commonDataviewDecisionDecisionModule['default'];
        }],
        execute: function () {

            describe('Decision', function () {

                var Decision = undefined;

                beforeEach(module(decisionModule));

                beforeEach(inject(function (_Decision_) {
                    Decision = _Decision_;
                }));

                function createDecidableItem(id) {
                    return {
                        getId: function () {
                            return id;
                        }
                    };
                }

                function createSelectionModel(isSelectAll) {
                    return {
                        isSelectAll: function () {
                            return !!isSelectAll;
                        }
                    };
                }

                describe('constructor', function () {
                    it('sets only comments and status', function () {
                        var data = {
                            item: {},
                            selectionModel: {},
                            bulkCount: 40,
                            scope: {},
                            edited: true
                        },
                            decision = new Decision(data);

                        expect(decision.item).not.toBeDefined();
                        expect(decision.selectionModel).not.toBeDefined();
                        expect(decision.bulkCount).not.toBeDefined();
                        expect(decision.decisionScope).not.toBeDefined();
                        expect(decision.edited).toEqual(false);
                    });
                });

                describe('initializeItemDecision', function () {
                    it('sets the item and the scope', function () {
                        var decision = new Decision(),
                            scope = {},
                            item = createDecidableItem('213');
                        decision.initializeItemDecision(item, scope);
                        expect(decision.getItem()).toEqual(item);
                        expect(decision.getScope()).toEqual(scope);
                    });
                });

                describe('initializeBulkDecision', function () {
                    it('sets the selection model, bulk count and scope', function () {
                        var decision = new Decision(),
                            scope = {},
                            selectionModel = createSelectionModel(true),
                            bulkCount = 20;
                        decision.initializeBulkDecision(selectionModel, bulkCount, scope);
                        expect(decision.getSelectionModel()).toEqual(selectionModel);
                        expect(decision.getScope()).toEqual(scope);
                        expect(decision.getBulkCount()).toEqual(bulkCount);
                    });
                });

                describe('getItemId()', function () {
                    it('returns the item id if defined', function () {
                        var decision = new Decision();
                        decision.item = createDecidableItem('123');
                        expect(decision.getItemId()).toEqual('123');
                    });

                    it('returns undefined if item is not set', function () {
                        var decision = new Decision();
                        expect(decision.getItemId()).toEqual(undefined);
                    });
                });

                describe('getUniqueId()', function () {
                    it('should return the item id', function () {
                        var decision = new Decision();
                        decision.initializeItemDecision(createDecidableItem('1234'));
                        expect(decision.getUniqueId()).toEqual(decision.getItemId());
                    });

                    it('should throw for a bulk decision', function () {
                        var decision = new Decision(),
                            selectionModel = createSelectionModel(true);
                        decision.initializeBulkDecision(selectionModel, 10, undefined);
                        expect(decision.isBulk()).toEqual(true);
                        expect(function () {
                            return decision.getUniqueId();
                        }).toThrow();
                    });
                });

                describe('isBulk()', function () {
                    it('returns true for bulk decisions', function () {
                        var decision = new Decision(),
                            selectionModel = createSelectionModel(true);
                        decision.initializeBulkDecision(selectionModel, 10, undefined);
                        expect(decision.isBulk()).toEqual(true);
                    });

                    it('returns false for item decisions', function () {
                        var decision = new Decision(),
                            item = createDecidableItem('123');
                        decision.initializeItemDecision(item, undefined);
                        expect(decision.isBulk()).toEqual(false);
                    });
                });

                describe('isSelectAll()', function () {
                    it('returns false for item decisions', function () {
                        var decision = new Decision(),
                            item = createDecidableItem('123');
                        decision.initializeItemDecision(item, undefined);
                        expect(decision.isSelectAll()).toEqual(false);
                    });

                    it('returns false for non-select all bulk decisions', function () {
                        var decision = new Decision(),
                            selectionModel = createSelectionModel(false);
                        decision.initializeBulkDecision(selectionModel, 10, undefined);
                        expect(decision.isSelectAll()).toEqual(false);
                    });

                    it('returns true for select all bulk decisions', function () {
                        var decision = new Decision(),
                            selectionModel = createSelectionModel(true);
                        decision.initializeBulkDecision(selectionModel, 10, undefined);
                        expect(decision.isSelectAll()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9kZWNpc2lvbi9EZWNpc2lvblRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0Q0FBNEMsVUFBVSxTQUFTOzs7OztJQUt2Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLGlCQUFpQixzQ0FBc0M7O1FBRTNELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxZQUFZLFlBQU07O2dCQUV2QixJQUFJLFdBQVE7O2dCQUVaLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFlBQWU7b0JBQzlCLFdBQVc7OztnQkFHZixTQUFTLG9CQUFvQixJQUFJO29CQUM3QixPQUFPO3dCQUNILE9BQU8sWUFBQTs0QkFRUyxPQVJIOzs7OztnQkFJckIsU0FBUyxxQkFBcUIsYUFBYTtvQkFDdkMsT0FBTzt3QkFDSCxhQUFhLFlBQUE7NEJBVUcsT0FWRyxDQUFDLENBQUM7Ozs7O2dCQUk3QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBSSxpQ0FBaUMsWUFBTTt3QkFDdkMsSUFBSSxPQUFPOzRCQUNQLE1BQU07NEJBQ04sZ0JBQWdCOzRCQUNoQixXQUFXOzRCQUNYLE9BQU87NEJBQ1AsUUFBUTs7NEJBQ1QsV0FBVyxJQUFJLFNBQVM7O3dCQUUzQixPQUFPLFNBQVMsTUFBTSxJQUFJO3dCQUMxQixPQUFPLFNBQVMsZ0JBQWdCLElBQUk7d0JBQ3BDLE9BQU8sU0FBUyxXQUFXLElBQUk7d0JBQy9CLE9BQU8sU0FBUyxlQUFlLElBQUk7d0JBQ25DLE9BQU8sU0FBUyxRQUFRLFFBQVE7Ozs7Z0JBSXhDLFNBQVMsMEJBQTBCLFlBQU07b0JBQ3JDLEdBQUksK0JBQStCLFlBQU07d0JBQ3JDLElBQUksV0FBVyxJQUFJOzRCQUNmLFFBQVE7NEJBQ1IsT0FBTyxvQkFBb0I7d0JBQy9CLFNBQVMsdUJBQXVCLE1BQU07d0JBQ3RDLE9BQU8sU0FBUyxXQUFXLFFBQVE7d0JBQ25DLE9BQU8sU0FBUyxZQUFZLFFBQVE7Ozs7Z0JBSTVDLFNBQVMsMEJBQTBCLFlBQU07b0JBQ3JDLEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELElBQUksV0FBVyxJQUFJOzRCQUNmLFFBQVE7NEJBQ1IsaUJBQWlCLHFCQUFxQjs0QkFDdEMsWUFBWTt3QkFDaEIsU0FBUyx1QkFBdUIsZ0JBQWdCLFdBQVc7d0JBQzNELE9BQU8sU0FBUyxxQkFBcUIsUUFBUTt3QkFDN0MsT0FBTyxTQUFTLFlBQVksUUFBUTt3QkFDcEMsT0FBTyxTQUFTLGdCQUFnQixRQUFROzs7O2dCQUloRCxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsSUFBSSxXQUFXLElBQUk7d0JBQ25CLFNBQVMsT0FBTyxvQkFBb0I7d0JBQ3BDLE9BQU8sU0FBUyxhQUFhLFFBQVE7OztvQkFHekMsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsSUFBSSxXQUFXLElBQUk7d0JBQ25CLE9BQU8sU0FBUyxhQUFhLFFBQVE7Ozs7Z0JBSTdDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLElBQUksV0FBVyxJQUFJO3dCQUNuQixTQUFTLHVCQUF1QixvQkFBb0I7d0JBQ3BELE9BQU8sU0FBUyxlQUFlLFFBQVEsU0FBUzs7O29CQUdwRCxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxJQUFJLFdBQVcsSUFBSTs0QkFDZixpQkFBaUIscUJBQXFCO3dCQUMxQyxTQUFTLHVCQUF1QixnQkFBZ0IsSUFBSTt3QkFDcEQsT0FBTyxTQUFTLFVBQVUsUUFBUTt3QkFDbEMsT0FBTyxZQUFBOzRCQWFTLE9BYkgsU0FBUzsyQkFBZTs7OztnQkFJN0MsU0FBUyxZQUFZLFlBQU07b0JBQ3ZCLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLElBQUksV0FBVyxJQUFJOzRCQUNmLGlCQUFpQixxQkFBcUI7d0JBQzFDLFNBQVMsdUJBQXVCLGdCQUFnQixJQUFJO3dCQUNwRCxPQUFPLFNBQVMsVUFBVSxRQUFROzs7b0JBR3RDLEdBQUcsb0NBQW9DLFlBQU07d0JBQ3pDLElBQUksV0FBVyxJQUFJOzRCQUNmLE9BQU8sb0JBQW9CO3dCQUMvQixTQUFTLHVCQUF1QixNQUFNO3dCQUN0QyxPQUFPLFNBQVMsVUFBVSxRQUFROzs7O2dCQUkxQyxTQUFTLGlCQUFpQixZQUFNO29CQUM1QixHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxJQUFJLFdBQVcsSUFBSTs0QkFDZixPQUFPLG9CQUFvQjt3QkFDL0IsU0FBUyx1QkFBdUIsTUFBTTt3QkFDdEMsT0FBTyxTQUFTLGVBQWUsUUFBUTs7O29CQUczQyxHQUFHLG1EQUFtRCxZQUFNO3dCQUN4RCxJQUFJLFdBQVcsSUFBSTs0QkFDZixpQkFBaUIscUJBQXFCO3dCQUMxQyxTQUFTLHVCQUF1QixnQkFBZ0IsSUFBSTt3QkFDcEQsT0FBTyxTQUFTLGVBQWUsUUFBUTs7O29CQUczQyxHQUFHLDhDQUE4QyxZQUFNO3dCQUNuRCxJQUFJLFdBQVcsSUFBSTs0QkFDZixpQkFBaUIscUJBQXFCO3dCQUMxQyxTQUFTLHVCQUF1QixnQkFBZ0IsSUFBSTt3QkFDcEQsT0FBTyxTQUFTLGVBQWUsUUFBUTs7Ozs7O0dBb0JoRCIsImZpbGUiOiJjb21tb24vZGF0YXZpZXcvZGVjaXNpb24vRGVjaXNpb25UZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0LnR1Y2tlciBvbiAyLzEzLzE3LlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRlY2lzaW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9kYXRhdmlldy9kZWNpc2lvbi9EZWNpc2lvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdEZWNpc2lvbicsICgpID0+IHtcblxuICAgIGxldCBEZWNpc2lvbjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRlY2lzaW9uTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX0RlY2lzaW9uXykgPT4ge1xuICAgICAgICBEZWNpc2lvbiA9IF9EZWNpc2lvbl87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRGVjaWRhYmxlSXRlbShpZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0SWQ6ICgpID0+IGlkXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VsZWN0aW9uTW9kZWwoaXNTZWxlY3RBbGwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzU2VsZWN0QWxsOiAoKSA9PiAhIWlzU2VsZWN0QWxsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgICBpdCAoJ3NldHMgb25seSBjb21tZW50cyBhbmQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaXRlbToge30sXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWw6IHt9LFxuICAgICAgICAgICAgICAgIGJ1bGtDb3VudDogNDAsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICAgICAgICAgIGVkaXRlZDogdHJ1ZVxuICAgICAgICAgICAgfSwgZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oZGF0YSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5pdGVtKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbCkubm90LnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uYnVsa0NvdW50KS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5kZWNpc2lvblNjb3BlKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5lZGl0ZWQpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbml0aWFsaXplSXRlbURlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBpdCAoJ3NldHMgdGhlIGl0ZW0gYW5kIHRoZSBzY29wZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IG5ldyBEZWNpc2lvbigpLFxuICAgICAgICAgICAgICAgIHNjb3BlID0ge30sXG4gICAgICAgICAgICAgICAgaXRlbSA9IGNyZWF0ZURlY2lkYWJsZUl0ZW0oJzIxMycpO1xuICAgICAgICAgICAgZGVjaXNpb24uaW5pdGlhbGl6ZUl0ZW1EZWNpc2lvbihpdGVtLCBzY29wZSk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0SXRlbSgpKS50b0VxdWFsKGl0ZW0pO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmdldFNjb3BlKCkpLnRvRXF1YWwoc2NvcGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbml0aWFsaXplQnVsa0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2V0cyB0aGUgc2VsZWN0aW9uIG1vZGVsLCBidWxrIGNvdW50IGFuZCBzY29wZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IG5ldyBEZWNpc2lvbigpLFxuICAgICAgICAgICAgICAgIHNjb3BlID0ge30sXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBjcmVhdGVTZWxlY3Rpb25Nb2RlbCh0cnVlKSxcbiAgICAgICAgICAgICAgICBidWxrQ291bnQgPSAyMDtcbiAgICAgICAgICAgIGRlY2lzaW9uLmluaXRpYWxpemVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIGJ1bGtDb3VudCwgc2NvcGUpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmdldFNlbGVjdGlvbk1vZGVsKCkpLnRvRXF1YWwoc2VsZWN0aW9uTW9kZWwpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmdldFNjb3BlKCkpLnRvRXF1YWwoc2NvcGUpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmdldEJ1bGtDb3VudCgpKS50b0VxdWFsKGJ1bGtDb3VudCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEl0ZW1JZCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyB0aGUgaXRlbSBpZCBpZiBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCk7XG4gICAgICAgICAgICBkZWNpc2lvbi5pdGVtID0gY3JlYXRlRGVjaWRhYmxlSXRlbSgnMTIzJyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0SXRlbUlkKCkpLnRvRXF1YWwoJzEyMycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgaXRlbSBpcyBub3Qgc2V0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0SXRlbUlkKCkpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0VW5pcXVlSWQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgaXRlbSBpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCk7XG4gICAgICAgICAgICBkZWNpc2lvbi5pbml0aWFsaXplSXRlbURlY2lzaW9uKGNyZWF0ZURlY2lkYWJsZUl0ZW0oJzEyMzQnKSk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uZ2V0VW5pcXVlSWQoKSkudG9FcXVhbChkZWNpc2lvbi5nZXRJdGVtSWQoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgZm9yIGEgYnVsayBkZWNpc2lvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBjcmVhdGVTZWxlY3Rpb25Nb2RlbCh0cnVlKTtcbiAgICAgICAgICAgIGRlY2lzaW9uLmluaXRpYWxpemVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIDEwLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmlzQnVsaygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGRlY2lzaW9uLmdldFVuaXF1ZUlkKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNCdWxrKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGJ1bGsgZGVjaXNpb25zJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY2lzaW9uID0gbmV3IERlY2lzaW9uKCksXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBjcmVhdGVTZWxlY3Rpb25Nb2RlbCh0cnVlKTtcbiAgICAgICAgICAgIGRlY2lzaW9uLmluaXRpYWxpemVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIDEwLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmlzQnVsaygpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaXRlbSBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oKSxcbiAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlRGVjaWRhYmxlSXRlbSgnMTIzJyk7XG4gICAgICAgICAgICBkZWNpc2lvbi5pbml0aWFsaXplSXRlbURlY2lzaW9uKGl0ZW0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uaXNCdWxrKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1NlbGVjdEFsbCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaXRlbSBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oKSxcbiAgICAgICAgICAgICAgICBpdGVtID0gY3JlYXRlRGVjaWRhYmxlSXRlbSgnMTIzJyk7XG4gICAgICAgICAgICBkZWNpc2lvbi5pbml0aWFsaXplSXRlbURlY2lzaW9uKGl0ZW0sIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tc2VsZWN0IGFsbCBidWxrIGRlY2lzaW9ucycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IG5ldyBEZWNpc2lvbigpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsID0gY3JlYXRlU2VsZWN0aW9uTW9kZWwoZmFsc2UpO1xuICAgICAgICAgICAgZGVjaXNpb24uaW5pdGlhbGl6ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgMTAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uaXNTZWxlY3RBbGwoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHNlbGVjdCBhbGwgYnVsayBkZWNpc2lvbnMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBuZXcgRGVjaXNpb24oKSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbCA9IGNyZWF0ZVNlbGVjdGlvbk1vZGVsKHRydWUpO1xuICAgICAgICAgICAgZGVjaXNpb24uaW5pdGlhbGl6ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgMTAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uaXNTZWxlY3RBbGwoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
