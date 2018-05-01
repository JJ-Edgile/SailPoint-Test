System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationDecisionStore', function () {

                var CertificationDecision = undefined,
                    CertificationActionStatus = undefined,
                    SelectionModel = undefined,
                    CertificationItem = undefined,
                    CertificationTableScope = undefined,
                    store = undefined,
                    item1 = undefined,
                    item2 = undefined,
                    item3 = undefined,
                    tableScope = undefined;

                function getStatus(status) {
                    return new CertificationActionStatus({
                        status: status
                    });
                }

                beforeEach(module(certificationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (CertificationDecisionStore, _CertificationDecision_, _CertificationActionStatus_, _SelectionModel_, _CertificationItem_, certificationTestData, _CertificationTableScope_) {
                    CertificationDecision = _CertificationDecision_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    SelectionModel = _SelectionModel_;
                    CertificationItem = _CertificationItem_;
                    CertificationTableScope = _CertificationTableScope_;

                    store = new CertificationDecisionStore();

                    item1 = new CertificationItem(certificationTestData.CERT_ITEMS[0]);
                    item1.tableScope = new CertificationTableScope();
                    item2 = new CertificationItem(certificationTestData.CERT_ITEMS[1]);
                    item2.tableScope = new CertificationTableScope();
                    item3 = new CertificationItem(certificationTestData.CERT_ITEMS[2]);
                    item3.tableScope = new CertificationTableScope();

                    tableScope = new CertificationTableScope({
                        statuses: ['Open']
                    });
                }));

                describe('addDecision()', function () {

                    it('removes line item decisions from that match account if account decision', function () {
                        var itemWithSameAccountAs1 = new CertificationItem(angular.copy(item1));
                        itemWithSameAccountAs1.id = '9876';

                        var decision1 = CertificationDecision.createItemDecision(item1, getStatus('Approved')),
                            decision2 = CertificationDecision.createItemDecision(itemWithSameAccountAs1, getStatus('RevokeAccount'));

                        store.addDecision(decision1);
                        store.addDecision(decision2);

                        var decisions = store.getDecisions();
                        expect(decisions).toContain(decision2);
                        expect(decisions).not.toContain(decision1);
                    });

                    it('removes matching account items from bulk decisions if account decision', function () {
                        var itemWithSameAccountAs1 = new CertificationItem(angular.copy(item1));
                        itemWithSameAccountAs1.id = '9876';

                        var selectionModel = new SelectionModel(),
                            decision1 = CertificationDecision.createBulkDecision(selectionModel, {}, getStatus('Approved')),
                            decision2 = CertificationDecision.createItemDecision(itemWithSameAccountAs1, getStatus('RevokeAccount'));

                        selectionModel.add(item1);
                        selectionModel.add(item2);

                        store.addBulkDecision(decision1);
                        store.addDecision(decision2);

                        var decisions = store.getDecisions();
                        expect(decisions).toContain(decision2);
                        expect(decisions).toContain(decision1);
                        var items = decision1.selectionModel.getItems();
                        expect(items).not.toContain(item1);
                        expect(items).toContain(item2);
                    });
                });

                describe('clearDecision()', function () {

                    it('removes account level line item for same account', function () {
                        var item1 = new CertificationItem({
                            id: '1111',
                            application: 'app1',
                            nativeIdentity: 'account1'
                        }),
                            item2 = new CertificationItem({
                            id: '2222',
                            application: 'app1',
                            nativeIdentity: 'account1'
                        }),
                            item3 = new CertificationItem({
                            id: '3333',
                            application: 'app1',
                            nativeIdentity: 'account2'
                        });
                        store.addDecision(CertificationDecision.createItemDecision(item1, getStatus('RevokeAccount')));
                        store.addDecision(CertificationDecision.createItemDecision(item2, getStatus('RevokeAccount')));
                        store.addDecision(CertificationDecision.createItemDecision(item3, getStatus('RevokeAccount')));
                        store.clearDecision(item2);
                        var decisions = store.getDecisions();
                        expect(decisions.length).toEqual(1);
                        expect(decisions[0].getItem()).toEqual(item3);
                    });

                    it('excludes all items from bulk account level decision that match account', function () {
                        var item1 = new CertificationItem({
                            id: '1111',
                            application: 'app1',
                            nativeIdentity: 'account1'
                        }),
                            item2 = new CertificationItem({
                            id: '2222',
                            application: 'app1',
                            nativeIdentity: 'account1'
                        }),
                            item3 = new CertificationItem({
                            id: '3333',
                            application: 'app1',
                            nativeIdentity: 'account2'
                        }),
                            selectionModel = new SelectionModel();
                        selectionModel.add(item1);
                        selectionModel.add(item2);
                        selectionModel.add(item3);

                        store.addBulkDecision(CertificationDecision.createBulkDecision(selectionModel, tableScope, getStatus('RevokeAccount')));
                        store.clearDecision(item2);
                        var decisions = store.getDecisions();
                        expect(decisions.length).toEqual(1);
                        expect(decisions[0].selectionModel.size()).toEqual(1);
                        expect(decisions[0].selectionModel.getItems()[0]).toEqual(item3);
                    });
                });

                describe('addBulkDecision()', function () {
                    it('removes line item decisions from that match account if bulk account decision', function () {
                        var itemWithSameAccountAs1 = new CertificationItem(angular.copy(item1));
                        itemWithSameAccountAs1.id = '9876';

                        var selectionModel = new SelectionModel(),
                            decision1 = CertificationDecision.createItemDecision(itemWithSameAccountAs1, getStatus('Approved')),
                            decision2 = CertificationDecision.createBulkDecision(selectionModel, {}, getStatus('RevokeAccount'));

                        selectionModel.add(item1);
                        selectionModel.add(item2);

                        store.addDecision(decision1);
                        store.addBulkDecision(decision2);

                        var decisions = store.getDecisions();
                        expect(decisions).toContain(decision2);
                        expect(decisions).not.toContain(decision1);
                    });

                    it('removes matching account items from bulk decisions if bulk account decision', function () {
                        var itemWithSameAccountAs1 = new CertificationItem(angular.copy(item1));
                        itemWithSameAccountAs1.id = '9876';

                        var selectionModel1 = new SelectionModel(),
                            decision1 = CertificationDecision.createBulkDecision(selectionModel1, {}, getStatus('Approved')),
                            selectionModel2 = new SelectionModel(),
                            decision2 = CertificationDecision.createBulkDecision(selectionModel2, {}, getStatus('RevokeAccount'));

                        selectionModel1.add(item1);
                        selectionModel1.add(item2);
                        selectionModel2.add(itemWithSameAccountAs1);

                        store.addBulkDecision(decision1);
                        store.addBulkDecision(decision2);

                        var decisions = store.getDecisions();
                        expect(decisions).toContain(decision2);
                        expect(decisions).toContain(decision1);

                        var items = decision1.selectionModel.getItems();
                        expect(items).toContain(item2);
                        expect(items).not.toContain(item1);
                    });
                });

                describe('getCountsByDecision()', function () {
                    it('returns an empty map for no decisions', function () {
                        expect(store.getCountsByDecision().size).toEqual(0);
                    });

                    it('returns line item decision counts', function () {
                        store.addDecision(CertificationDecision.createItemDecision(new CertificationItem({ id: '11111' }), getStatus('Approved')));
                        store.addDecision(CertificationDecision.createItemDecision(new CertificationItem({ id: '22222' }), getStatus('Remediated')));
                        store.addDecision(CertificationDecision.createItemDecision(new CertificationItem({ id: '33333' }), getStatus('Approved')));

                        var map = store.getCountsByDecision();
                        expect(map.size).toEqual(2);
                        expect(map.get('Approved')).toEqual(2);
                        expect(map.get('Remediated')).toEqual(1);
                    });

                    it('returns bulk decision and item counts', function () {
                        var selectionModel = new SelectionModel();
                        selectionModel.add(item1);
                        selectionModel.add(item2);
                        var bulkDecision = new CertificationDecision.createBulkDecision(selectionModel, {}, getStatus('Approved'), selectionModel.size());
                        store.addBulkDecision(bulkDecision);

                        store.addDecision(CertificationDecision.createItemDecision(new CertificationItem({ id: '11111' }), getStatus('Remediated')));
                        store.addDecision(CertificationDecision.createItemDecision(new CertificationItem({ id: '22222' }), getStatus('Approved')));

                        var map = store.getCountsByDecision();
                        expect(map.size).toEqual(2);
                        expect(map.get('Approved')).toEqual(3);
                        expect(map.get('Remediated')).toEqual(1);
                    });
                });

                describe('getEffectiveDecisionByItem', function () {
                    var item = undefined;
                    beforeEach(function () {
                        spyOn(store, 'getEffectiveDecision').and.returnValue(undefined);
                        item = new CertificationItem({
                            id: 'abcd',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        });
                        tableScope = new CertificationTableScope({
                            statuses: ['Open']
                        });
                    });

                    it('find a line item account decision that matches the given item', function () {
                        var decisionItem = new CertificationItem({
                            id: 'gggg',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        }),
                            decision = CertificationDecision.createItemDecision(decisionItem, getStatus('RevokeAccount'));
                        store.addDecision(decision);
                        expect(store.getEffectiveDecisionByItem(item)).toEqual(decision);
                    });

                    it('finds a bulk account decision that matches the given item', function () {
                        var decisionItem = new CertificationItem({
                            id: 'gggg',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        }),
                            selectionModel = new SelectionModel(),
                            decision = CertificationDecision.createBulkDecision(selectionModel, tableScope, getStatus('RevokeAccount'), 1);
                        selectionModel.add(decisionItem);
                        store.addBulkDecision(decision);
                        expect(store.getEffectiveDecisionByItem(item)).toEqual(decision);
                    });

                    it('does not find a decision that matches account but is not an account level decision', function () {
                        var decisionItem = new CertificationItem({
                            id: 'gggg',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        }),
                            decision = CertificationDecision.createItemDecision(decisionItem, getStatus('Approved'));
                        store.addDecision(decision);
                        expect(store.getEffectiveDecisionByItem(item)).not.toEqual(decision);
                    });

                    it('does not find a account level decision on different account', function () {
                        var decisionItem = new CertificationItem({
                            id: 'gggg',
                            application: 'App1',
                            nativeIdentity: 'account2'
                        }),
                            decision = CertificationDecision.createItemDecision(decisionItem, getStatus('RevokeAccount'));
                        store.addDecision(decision);
                        expect(store.getEffectiveDecisionByItem(item)).not.toEqual(decision);
                    });

                    it('calls through to getEffectiveDecision if no account level decision is available', function () {
                        store.getEffectiveDecisionByItem(item, tableScope);
                        expect(store.getEffectiveDecision).toHaveBeenCalledWith(item.id, tableScope, item);
                    });

                    it('does not return a select all account decision with excluded item that matches account', function () {
                        var selectionModel = new SelectionModel(),
                            bulkDecision = CertificationDecision.createBulkDecision(selectionModel, tableScope, getStatus('RevokeAccount')),
                            excludedItem = new CertificationItem({
                            id: '1111',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        }),
                            item = new CertificationItem({
                            id: '2222',
                            application: 'App1',
                            nativeIdentity: 'account1'
                        });

                        selectionModel.selectAll();
                        store.addBulkDecision(bulkDecision);
                        store.clearDecision(excludedItem);

                        expect(store.getEffectiveDecisionByItem(item, tableScope)).not.toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkRlY2lzaW9uU3RvcmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUztJQUNqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw4QkFBOEIsWUFBTTs7Z0JBRXpDLElBQUksd0JBQXFCO29CQUFFLDRCQUF5QjtvQkFBRSxpQkFBYztvQkFBRSxvQkFBaUI7b0JBQUUsMEJBQXVCO29CQUM1RyxRQUFLO29CQUFFLFFBQUs7b0JBQUUsUUFBSztvQkFBRSxRQUFLO29CQUFFLGFBQVU7O2dCQUUxQyxTQUFTLFVBQVUsUUFBUTtvQkFDdkIsT0FBTyxJQUFJLDBCQUEwQjt3QkFDakMsUUFBUTs7OztnQkFJaEIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLDRCQUE0Qix5QkFBeUIsNkJBQ3JELGtCQUFrQixxQkFBcUIsdUJBQ3ZDLDJCQUEyQjtvQkFDbEQsd0JBQXdCO29CQUN4Qiw0QkFBNEI7b0JBQzVCLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQiwwQkFBMEI7O29CQUUxQixRQUFRLElBQUk7O29CQUVaLFFBQVEsSUFBSSxrQkFBa0Isc0JBQXNCLFdBQVc7b0JBQy9ELE1BQU0sYUFBYSxJQUFJO29CQUN2QixRQUFRLElBQUksa0JBQWtCLHNCQUFzQixXQUFXO29CQUMvRCxNQUFNLGFBQWEsSUFBSTtvQkFDdkIsUUFBUSxJQUFJLGtCQUFrQixzQkFBc0IsV0FBVztvQkFDL0QsTUFBTSxhQUFhLElBQUk7O29CQUV2QixhQUFhLElBQUksd0JBQXdCO3dCQUNyQyxVQUFVLENBQUM7Ozs7Z0JBSW5CLFNBQVMsaUJBQWlCLFlBQU07O29CQUU1QixH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QUN6QixJQUFJOzRCQUNKLGFBQWE7NEJBQ2IsZ0JBQWdCOzs7d0JBR3hCLGVBQWU7d0JBQ2YsTUFBTSxnQkFBZ0I7d0JBQ3RCLE1BQU0sY0FBYzs7d0JBRXBCLE9BQU8sTUFBTSwyQkFBMkIsTUFBTSxhQUFhLElBQUk7Ozs7OztHQWV4RSIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL21vZGVsL0NlcnRpZmljYXRpb25EZWNpc2lvblN0b3JlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdG9yZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLCBTZWxlY3Rpb25Nb2RlbCwgQ2VydGlmaWNhdGlvbkl0ZW0sIENlcnRpZmljYXRpb25UYWJsZVNjb3BlLFxyXG4gICAgICAgIHN0b3JlLCBpdGVtMSwgaXRlbTIsIGl0ZW0zLCB0YWJsZVNjb3BlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN0YXR1cyhzdGF0dXMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENlcnRpZmljYXRpb25BY3Rpb25TdGF0dXMoe1xyXG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdG9yZSwgX0NlcnRpZmljYXRpb25EZWNpc2lvbl8sIF9DZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9TZWxlY3Rpb25Nb2RlbF8sIF9DZXJ0aWZpY2F0aW9uSXRlbV8sIGNlcnRpZmljYXRpb25UZXN0RGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DZXJ0aWZpY2F0aW9uVGFibGVTY29wZV8pIHtcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb24gPSBfQ2VydGlmaWNhdGlvbkRlY2lzaW9uXztcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xyXG4gICAgICAgIFNlbGVjdGlvbk1vZGVsID0gX1NlbGVjdGlvbk1vZGVsXztcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XHJcbiAgICAgICAgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUgPSBfQ2VydGlmaWNhdGlvblRhYmxlU2NvcGVfO1xyXG5cclxuICAgICAgICBzdG9yZSA9IG5ldyBDZXJ0aWZpY2F0aW9uRGVjaXNpb25TdG9yZSgpO1xyXG5cclxuICAgICAgICBpdGVtMSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1swXSk7XHJcbiAgICAgICAgaXRlbTEudGFibGVTY29wZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZSgpO1xyXG4gICAgICAgIGl0ZW0yID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzFdKTtcclxuICAgICAgICBpdGVtMi50YWJsZVNjb3BlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKCk7XHJcbiAgICAgICAgaXRlbTMgPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRfSVRFTVNbMl0pO1xyXG4gICAgICAgIGl0ZW0zLnRhYmxlU2NvcGUgPSBuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoKTtcclxuXHJcbiAgICAgICAgdGFibGVTY29wZSA9IG5ldyBDZXJ0aWZpY2F0aW9uVGFibGVTY29wZSh7XHJcbiAgICAgICAgICAgIHN0YXR1c2VzOiBbJ09wZW4nXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhZGREZWNpc2lvbigpJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBpdCgncmVtb3ZlcyBsaW5lIGl0ZW0gZGVjaXNpb25zIGZyb20gdGhhdCBtYXRjaCBhY2NvdW50IGlmIGFjY291bnQgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtV2l0aFNhbWVBY2NvdW50QXMxID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGFuZ3VsYXIuY29weShpdGVtMSkpO1xyXG4gICAgICAgICAgICBpdGVtV2l0aFNhbWVBY2NvdW50QXMxLmlkID0gJzk4NzYnO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uMSA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oaXRlbTEsIGdldFN0YXR1cygnQXBwcm92ZWQnKSksXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjIgPVxyXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oaXRlbVdpdGhTYW1lQWNjb3VudEFzMSwgZ2V0U3RhdHVzKCdSZXZva2VBY2NvdW50JykpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24xKTtcclxuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24yKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbnMgPSBzdG9yZS5nZXREZWNpc2lvbnMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9ucykudG9Db250YWluKGRlY2lzaW9uMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMpLm5vdC50b0NvbnRhaW4oZGVjaXNpb24xKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgbWF0Y2hpbmcgYWNjb3VudCBpdGVtcyBmcm9tIGJ1bGsgZGVjaXNpb25zIGlmIGFjY291bnQgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtV2l0aFNhbWVBY2NvdW50QXMxID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGFuZ3VsYXIuY29weShpdGVtMSkpO1xyXG4gICAgICAgICAgICBpdGVtV2l0aFNhbWVBY2NvdW50QXMxLmlkID0gJzk4NzYnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjEgPSBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdGlvbk1vZGVsLCB7fSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSxcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uMiA9XHJcbiAgICAgICAgICAgICAgICAgICAgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihpdGVtV2l0aFNhbWVBY2NvdW50QXMxLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTEpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTIpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGRlY2lzaW9uMSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uMik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gc3RvcmUuZ2V0RGVjaXNpb25zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMpLnRvQ29udGFpbihkZWNpc2lvbjIpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zKS50b0NvbnRhaW4oZGVjaXNpb24xKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gZGVjaXNpb24xLnNlbGVjdGlvbk1vZGVsLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtcykubm90LnRvQ29udGFpbihpdGVtMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpdGVtcykudG9Db250YWluKGl0ZW0yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdjbGVhckRlY2lzaW9uKCknLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGl0KCdyZW1vdmVzIGFjY291bnQgbGV2ZWwgbGluZSBpdGVtIGZvciBzYW1lIGFjY291bnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtMSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogJzExMTEnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdhcHAxJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnYWNjb3VudDEnXHJcbiAgICAgICAgICAgIH0pLCBpdGVtMiA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogJzIyMjInLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdhcHAxJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnYWNjb3VudDEnXHJcbiAgICAgICAgICAgIH0pLCBpdGVtMyA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogJzMzMzMnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdhcHAxJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnYWNjb3VudDInXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0xLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSkpO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0yLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSkpO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKGl0ZW0zLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSkpO1xyXG4gICAgICAgICAgICBzdG9yZS5jbGVhckRlY2lzaW9uKGl0ZW0yKTtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IHN0b3JlLmdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uc1swXS5nZXRJdGVtKCkpLnRvRXF1YWwoaXRlbTMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZXhjbHVkZXMgYWxsIGl0ZW1zIGZyb20gYnVsayBhY2NvdW50IGxldmVsIGRlY2lzaW9uIHRoYXQgbWF0Y2ggYWNjb3VudCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0xID0gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMTExMScsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2FwcDEnLFxyXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MSdcclxuICAgICAgICAgICAgfSksIGl0ZW0yID0gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMjIyMicsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2FwcDEnLFxyXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MSdcclxuICAgICAgICAgICAgfSksIGl0ZW0zID0gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMzMzMycsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ2FwcDEnLFxyXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MidcclxuICAgICAgICAgICAgfSksIHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMSk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMik7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMyk7XHJcblxyXG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLCB0YWJsZVNjb3BlLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSkpO1xyXG4gICAgICAgICAgICBzdG9yZS5jbGVhckRlY2lzaW9uKGl0ZW0yKTtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IHN0b3JlLmdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uc1swXS5zZWxlY3Rpb25Nb2RlbC5zaXplKCkpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnNbMF0uc2VsZWN0aW9uTW9kZWwuZ2V0SXRlbXMoKVswXSkudG9FcXVhbChpdGVtMyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnYWRkQnVsa0RlY2lzaW9uKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3JlbW92ZXMgbGluZSBpdGVtIGRlY2lzaW9ucyBmcm9tIHRoYXQgbWF0Y2ggYWNjb3VudCBpZiBidWxrIGFjY291bnQgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtV2l0aFNhbWVBY2NvdW50QXMxID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGFuZ3VsYXIuY29weShpdGVtMSkpO1xyXG4gICAgICAgICAgICBpdGVtV2l0aFNhbWVBY2NvdW50QXMxLmlkID0gJzk4NzYnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbjEgPVxyXG4gICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oaXRlbVdpdGhTYW1lQWNjb3VudEFzMSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSxcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uMiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIHt9LCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTEpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoaXRlbTIpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oZGVjaXNpb24xKTtcclxuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGRlY2lzaW9uMik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb25zID0gc3RvcmUuZ2V0RGVjaXNpb25zKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbnMpLnRvQ29udGFpbihkZWNpc2lvbjIpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zKS5ub3QudG9Db250YWluKGRlY2lzaW9uMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZW1vdmVzIG1hdGNoaW5nIGFjY291bnQgaXRlbXMgZnJvbSBidWxrIGRlY2lzaW9ucyBpZiBidWxrIGFjY291bnQgZGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtV2l0aFNhbWVBY2NvdW50QXMxID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGFuZ3VsYXIuY29weShpdGVtMSkpO1xyXG4gICAgICAgICAgICBpdGVtV2l0aFNhbWVBY2NvdW50QXMxLmlkID0gJzk4NzYnO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsMSA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpLFxyXG4gICAgICAgICAgICAgICAgZGVjaXNpb24xID1cclxuICAgICAgICAgICAgICAgICAgICBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlQnVsa0RlY2lzaW9uKHNlbGVjdGlvbk1vZGVsMSwge30sIGdldFN0YXR1cygnQXBwcm92ZWQnKSksXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbDIgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKSxcclxuICAgICAgICAgICAgICAgIGRlY2lzaW9uMiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwyLCB7fSwgZ2V0U3RhdHVzKCdSZXZva2VBY2NvdW50JykpO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwxLmFkZChpdGVtMSk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsMS5hZGQoaXRlbTIpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbDIuYWRkKGl0ZW1XaXRoU2FtZUFjY291bnRBczEpO1xyXG5cclxuICAgICAgICAgICAgc3RvcmUuYWRkQnVsa0RlY2lzaW9uKGRlY2lzaW9uMSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihkZWNpc2lvbjIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9ucyA9IHN0b3JlLmdldERlY2lzaW9ucygpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb25zKS50b0NvbnRhaW4oZGVjaXNpb24yKTtcclxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9ucykudG9Db250YWluKGRlY2lzaW9uMSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBkZWNpc2lvbjEuc2VsZWN0aW9uTW9kZWwuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGl0ZW1zKS50b0NvbnRhaW4oaXRlbTIpO1xyXG4gICAgICAgICAgICBleHBlY3QoaXRlbXMpLm5vdC50b0NvbnRhaW4oaXRlbTEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldENvdW50c0J5RGVjaXNpb24oKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyBhbiBlbXB0eSBtYXAgZm9yIG5vIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldENvdW50c0J5RGVjaXNpb24oKS5zaXplKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBsaW5lIGl0ZW0gZGVjaXNpb24gY291bnRzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7IGlkOiAnMTExMTEnIH0pLFxyXG4gICAgICAgICAgICAgICAgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24obmV3IENlcnRpZmljYXRpb25JdGVtKHsgaWQ6ICcyMjIyMicgfSksXHJcbiAgICAgICAgICAgICAgICBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSkpO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7IGlkOiAnMzMzMzMnIH0pLFxyXG4gICAgICAgICAgICAgICAgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWFwID0gc3RvcmUuZ2V0Q291bnRzQnlEZWNpc2lvbigpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLnNpemUpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuZ2V0KCdBcHByb3ZlZCcpKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFwLmdldCgnUmVtZWRpYXRlZCcpKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBidWxrIGRlY2lzaW9uIGFuZCBpdGVtIGNvdW50cycsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMSk7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmFkZChpdGVtMik7XHJcbiAgICAgICAgICAgIGxldCBidWxrRGVjaXNpb24gPSBuZXcgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLCB7fSwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpLCBzZWxlY3Rpb25Nb2RlbC5zaXplKCkpO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGRCdWxrRGVjaXNpb24oYnVsa0RlY2lzaW9uKTtcclxuXHJcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oXHJcbiAgICAgICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oeyBpZDogJzExMTExJyB9KSwgZ2V0U3RhdHVzKCdSZW1lZGlhdGVkJykpKTtcclxuICAgICAgICAgICAgc3RvcmUuYWRkRGVjaXNpb24oQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihcclxuICAgICAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7IGlkOiAnMjIyMjInIH0pLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYXAgPSBzdG9yZS5nZXRDb3VudHNCeURlY2lzaW9uKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuc2l6ZSkudG9FcXVhbCgyKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hcC5nZXQoJ0FwcHJvdmVkJykpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtYXAuZ2V0KCdSZW1lZGlhdGVkJykpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGl0ZW07XHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKHN0b3JlLCAnZ2V0RWZmZWN0aXZlRGVjaXNpb24nKS5hbmQucmV0dXJuVmFsdWUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgaXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2FiY2QnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnYWNjb3VudDEnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0YWJsZVNjb3BlID0gbmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbJ09wZW4nXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2ZpbmQgYSBsaW5lIGl0ZW0gYWNjb3VudCBkZWNpc2lvbiB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuIGl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbkl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdnZ2dnJyxcclxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXHJcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2FjY291bnQxJ1xyXG4gICAgICAgICAgICB9KSwgZGVjaXNpb24gPSBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKGRlY2lzaW9uSXRlbSwgZ2V0U3RhdHVzKCdSZXZva2VBY2NvdW50JykpO1xyXG4gICAgICAgICAgICBzdG9yZS5hZGREZWNpc2lvbihkZWNpc2lvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbShpdGVtKSkudG9FcXVhbChkZWNpc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdmaW5kcyBhIGJ1bGsgYWNjb3VudCBkZWNpc2lvbiB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuIGl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbkl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnZ2dnZycsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2FjY291bnQxJ1xyXG4gICAgICAgICAgICAgICAgfSksIHNlbGVjdGlvbk1vZGVsID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXHJcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwsIHRhYmxlU2NvcGUsIGdldFN0YXR1cygnUmV2b2tlQWNjb3VudCcpLCAxKTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuYWRkKGRlY2lzaW9uSXRlbSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihkZWNpc2lvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdChzdG9yZS5nZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbShpdGVtKSkudG9FcXVhbChkZWNpc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBmaW5kIGEgZGVjaXNpb24gdGhhdCBtYXRjaGVzIGFjY291bnQgYnV0IGlzIG5vdCBhbiBhY2NvdW50IGxldmVsIGRlY2lzaW9uJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVjaXNpb25JdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgICAgIGlkOiAnZ2dnZycsXHJcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnLFxyXG4gICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MSdcclxuICAgICAgICAgICAgfSksIGRlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbihkZWNpc2lvbkl0ZW0sIGdldFN0YXR1cygnQXBwcm92ZWQnKSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldEVmZmVjdGl2ZURlY2lzaW9uQnlJdGVtKGl0ZW0pKS5ub3QudG9FcXVhbChkZWNpc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBmaW5kIGEgYWNjb3VudCBsZXZlbCBkZWNpc2lvbiBvbiBkaWZmZXJlbnQgYWNjb3VudCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRlY2lzaW9uSXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbSh7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2dnZ2cnLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnYWNjb3VudDInXHJcbiAgICAgICAgICAgIH0pLCBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oZGVjaXNpb25JdGVtLCBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZERlY2lzaW9uKGRlY2lzaW9uKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldEVmZmVjdGl2ZURlY2lzaW9uQnlJdGVtKGl0ZW0pKS5ub3QudG9FcXVhbChkZWNpc2lvbik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGdldEVmZmVjdGl2ZURlY2lzaW9uIGlmIG5vIGFjY291bnQgbGV2ZWwgZGVjaXNpb24gaXMgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yZS5nZXRFZmZlY3RpdmVEZWNpc2lvbkJ5SXRlbShpdGVtLCB0YWJsZVNjb3BlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHN0b3JlLmdldEVmZmVjdGl2ZURlY2lzaW9uKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChpdGVtLmlkLCB0YWJsZVNjb3BlLCBpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2RvZXMgbm90IHJldHVybiBhIHNlbGVjdCBhbGwgYWNjb3VudCBkZWNpc2lvbiB3aXRoIGV4Y2x1ZGVkIGl0ZW0gdGhhdCBtYXRjaGVzIGFjY291bnQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbCA9IG5ldyBTZWxlY3Rpb25Nb2RlbCgpLFxyXG4gICAgICAgICAgICAgICAgYnVsa0RlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgdGFibGVTY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRTdGF0dXMoJ1Jldm9rZUFjY291bnQnKSksXHJcbiAgICAgICAgICAgICAgICBleGNsdWRlZEl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTExMScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdBcHAxJyxcclxuICAgICAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ2FjY291bnQxJ1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJzIyMjInLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnQXBwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlSWRlbnRpdHk6ICdhY2NvdW50MSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZEJ1bGtEZWNpc2lvbihidWxrRGVjaXNpb24pO1xyXG4gICAgICAgICAgICBzdG9yZS5jbGVhckRlY2lzaW9uKGV4Y2x1ZGVkSXRlbSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3Qoc3RvcmUuZ2V0RWZmZWN0aXZlRGVjaXNpb25CeUl0ZW0oaXRlbSwgdGFibGVTY29wZSkpLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
