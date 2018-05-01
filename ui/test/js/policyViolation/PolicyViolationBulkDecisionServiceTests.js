System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', 'SailPointHelpers'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule, expectReject;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_SailPointHelpers) {
            expectReject = _SailPointHelpers.expectReject;
        }],
        execute: function () {

            describe('PolicyViolationBulkDecisionService', function () {

                var PolicyViolationAction = undefined,
                    policyViolationBulkDecisionService = undefined,
                    policyViolationDataService = undefined,
                    $rootScope = undefined,
                    $q = undefined,
                    selectionModel = undefined,
                    filters = undefined,
                    spModal = undefined,
                    PolicyViolationDecisionScope = undefined,
                    scopeConfig = undefined,
                    policyViolationDialogService = undefined,
                    PolicyViolationDecision = undefined,
                    decisionScope = undefined,
                    decisionConfig = undefined,
                    delegationDialogService = undefined;

                beforeEach(module(policyViolationModule));

                /* jshint maxparams:11 */
                beforeEach(inject(function (_PolicyViolationAction_, _policyViolationBulkDecisionService_, _$rootScope_, _$q_, _spModal_, _policyViolationDataService_, SelectionModel, _PolicyViolationDecisionScope_, _policyViolationDialogService_, _PolicyViolationDecision_, _delegationDialogService_) {

                    policyViolationBulkDecisionService = _policyViolationBulkDecisionService_;
                    policyViolationDataService = _policyViolationDataService_;
                    PolicyViolationAction = _PolicyViolationAction_;
                    PolicyViolationDecision = _PolicyViolationDecision_;
                    policyViolationDialogService = _policyViolationDialogService_;
                    PolicyViolationDecisionScope = _PolicyViolationDecisionScope_;
                    delegationDialogService = _delegationDialogService_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    spModal = _spModal_;

                    // Create a selection model and filters.
                    selectionModel = new SelectionModel();
                    selectionModel.add({ id: '1' }, { id: '2' });
                    filters = {
                        test: {
                            value: 'some'
                        }
                    };
                    scopeConfig = { statuses: ['Delegated', 'Open'] };
                    decisionScope = new PolicyViolationDecisionScope(scopeConfig);
                    // set the decisionConfig for allow
                    decisionConfig = {
                        allowMitigationExpirationEditing: false,
                        requireMitigationComments: true,
                        defaultMitigationExpirationDate: new Date(),
                        availableBulkDecisions: ['Mitigated', 'Delegated']
                    };
                    policyViolationDataService.decisionConfig = decisionConfig;
                }));

                function bulkDecide(status) {
                    var bulkDecision = undefined;

                    policyViolationBulkDecisionService.bulkDecide(status, selectionModel, filters, 2, decisionScope).then(function (decision) {
                        bulkDecision = decision;
                    })['catch'](expectReject);

                    $rootScope.$digest();

                    return bulkDecision;
                }

                describe('bulkDecide', function () {
                    it('should throw with invalid status', function () {
                        expect(function () {
                            return bulkDecide('New');
                        }).toThrow();
                    });

                    it('should throw if no selectionModel', function () {
                        expect(function () {
                            return policyViolationBulkDecisionService.bulkDecide(status, undefined, filters, 2, decisionScope);
                        }).toThrow();
                    });

                    it('should throw if no decisionScope', function () {
                        expect(function () {
                            return policyViolationBulkDecisionService.bulkDecide(status, selectionModel, filters, 2, undefined);
                        }).toThrow();
                    });

                    describe('Mitigated', function () {
                        it('resolves with bulkDecision of Mitigated', function () {
                            var comments = 'commenting...',
                                date = new Date(),
                                dialogResult = {
                                comments: comments,
                                mitigationExpirationDate: date
                            };
                            spyOn(policyViolationDialogService, 'showAllowExceptionDialog').and.returnValue($q.when(dialogResult));
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Mitigated);
                            expect(bulkDecision).toBeDefined();
                            expect(bulkDecision.status).toEqual(PolicyViolationAction.Status.Mitigated);
                            expect(bulkDecision.selectionModel.size()).toEqual(selectionModel.size());
                            expect(bulkDecision.comments).toEqual(comments);
                            expect(bulkDecision.mitigationExpirationDate).toEqual(date);
                        });

                        it('rejects if dialog is cancelled', function () {
                            spyOn(policyViolationDialogService, 'showAllowExceptionDialog').and.returnValue($q.reject());
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Mitigated);
                            expect(bulkDecision).toBeUndefined();
                        });
                    });

                    describe('Delegated', function () {
                        it('resolves with bulkDecision of Delegated', function () {
                            var dialogResult = {
                                recipient: {
                                    id: '100'
                                },
                                comments: 'delegating this',
                                description: 'delegation description'
                            };

                            spyOn(delegationDialogService, 'showDelegationDialog').and.returnValue($q.when(dialogResult));
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Delegated);
                            expect(bulkDecision).toBeDefined();
                            expect(bulkDecision.status).toEqual(PolicyViolationAction.Status.Delegated);
                            expect(bulkDecision.selectionModel.size()).toEqual(selectionModel.size());
                            expect(bulkDecision.comments).toEqual(dialogResult.comments);
                            expect(bulkDecision.description).toEqual(dialogResult.description);
                            expect(bulkDecision.recipient).toEqual(dialogResult.recipient.id);
                        });

                        it('rejects if dialog is cancelled', function () {
                            spyOn(delegationDialogService, 'showDelegationDialog').and.returnValue($q.reject());
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Delegated);
                            expect(bulkDecision).toBeUndefined();
                        });
                    });

                    describe('certify bulkDecision', function () {
                        it('resolves with bulkDecision if no unsaved decisions', function () {
                            spyOn(policyViolationDataService.decisions, 'getDecisionCount').and.returnValue(0);
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Certified);
                            expect(bulkDecision).toBeDefined();
                            expect(bulkDecision.status).toEqual(PolicyViolationAction.Status.Certified);
                            expect(bulkDecision.selectionModel.size()).toEqual(selectionModel.size());
                        });

                        it('resolves with bulkDecision if unsaved decisions but user is OK with it', function () {
                            spyOn(policyViolationDataService.decisions, 'getDecisionCount').and.returnValue(7);
                            spyOn(spModal, 'confirm').and.returnValue($q.when());
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Certified);
                            expect(bulkDecision).toBeDefined();
                            expect(bulkDecision.status).toEqual(PolicyViolationAction.Status.Certified);
                            expect(bulkDecision.selectionModel.size()).toEqual(selectionModel.size());
                        });

                        it('rejects if user cancels', function () {
                            spyOn(policyViolationDataService.decisions, 'getDecisionCount').and.returnValue(7);
                            spyOn(spModal, 'confirm').and.returnValue($q.reject());
                            var bulkDecision = bulkDecide(PolicyViolationAction.Status.Certified);
                            expect(bulkDecision).not.toBeDefined();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9Qb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5QyxxQkFBcUIsVUFBVSxTQUFTOzs7SUFHekg7O0lBRUEsSUFBSSx1QkFBdUI7SUFDM0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7V0FDL0QsVUFBVSxtQkFBbUI7WUFDNUIsZUFBZSxrQkFObkI7O1FBUUEsU0FBUyxZQUFZOztZQU43QixTQUFTLHNDQUFzQyxZQUFNOztnQkFFakQsSUFBSSx3QkFBcUI7b0JBQUUscUNBQWtDO29CQUFFLDZCQUEwQjtvQkFDckYsYUFBVTtvQkFBRSxLQUFFO29CQUFFLGlCQUFjO29CQUFFLFVBQU87b0JBQUUsVUFBTztvQkFBRSwrQkFBNEI7b0JBQUUsY0FBVztvQkFDM0YsK0JBQTRCO29CQUFFLDBCQUF1QjtvQkFDckQsZ0JBQWE7b0JBQUUsaUJBQWM7b0JBQUUsMEJBQXVCOztnQkFFMUQsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLHlCQUF5QixzQ0FBc0MsY0FBYyxNQUFNLFdBQ25GLDhCQUE4QixnQkFBZ0IsZ0NBQzlDLGdDQUFnQywyQkFBMkIsMkJBQThCOztvQkFFeEcscUNBQXFDO29CQUNyQyw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUMxQiwrQkFBK0I7b0JBQy9CLCtCQUErQjtvQkFDL0IsMEJBQTBCO29CQUMxQixhQUFhO29CQUNiLEtBQUs7b0JBQ0wsVUFBVTs7O29CQUdWLGlCQUFpQixJQUFJO29CQUNyQixlQUFlLElBQUksRUFBRSxJQUFJLE9BQU8sRUFBRSxJQUFJO29CQUN0QyxVQUFVO3dCQUNOLE1BQU07NEJBQ0YsT0FBTzs7O29CQUdmLGNBQWMsRUFBQyxVQUFVLENBQUMs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QTJCLFdBQVcsb0JBQW9CLElBQUksWUFBWTs0QkFDaEYsTUFBTSxTQUFTLFdBQVcsSUFBSSxZQUFZLEdBQUc7NEJBQzdDLElBQUksZUFBZSxXQUFXLHNCQUFzQixPQUFPOzRCQUMzRCxPQUFPLGNBQWM7NEJBQ3JCLE9BQU8sYUFBYSxRQUFRLFFBQVEsc0JBQXNCLE9BQU87NEJBQ2pFLE9BQU8sYUFBYSxlQUFlLFFBQVEsUUFBUSxlQUFlOzs7d0JBR3RFLEdBQUcsMkJBQTJCLFlBQU07NEJBQ2hDLE1BQU0sMkJBQTJCLFdBQVcsb0JBQW9CLElBQUksWUFBWTs0QkFDaEYsTUFBTSxTQUFTLFdBQVcsSUFBSSxZQUFZLEdBQUc7NEJBQzdDLElBQUksZUFBZSxXQUFXLHNCQUFzQixPQUFPOzRCQUMzRCxPQUFPLGNBQWMsSUFBSTs7Ozs7OztHQTJCdEMiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBwb2xpY3lWaW9sYXRpb25Nb2R1bGUgZnJvbSAncG9saWN5VmlvbGF0aW9uL1BvbGljeVZpb2xhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCB7ZXhwZWN0UmVqZWN0fSBmcm9tICdTYWlsUG9pbnRIZWxwZXJzJztcclxuXHJcbmRlc2NyaWJlKCdQb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBQb2xpY3lWaW9sYXRpb25BY3Rpb24sIHBvbGljeVZpb2xhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2UsIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLFxyXG4gICAgICAgICRyb290U2NvcGUsICRxLCBzZWxlY3Rpb25Nb2RlbCwgZmlsdGVycywgc3BNb2RhbCwgUG9saWN5VmlvbGF0aW9uRGVjaXNpb25TY29wZSwgc2NvcGVDb25maWcsXHJcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSwgUG9saWN5VmlvbGF0aW9uRGVjaXNpb24sXHJcbiAgICAgICAgZGVjaXNpb25TY29wZSwgZGVjaXNpb25Db25maWcsIGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6MTEgKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfUG9saWN5VmlvbGF0aW9uQWN0aW9uXywgX3BvbGljeVZpb2xhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kcV8sIF9zcE1vZGFsXyxcclxuICAgICAgICAgICAgICAgICAgICAgICBfcG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2VfLCBTZWxlY3Rpb25Nb2RlbCwgX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGVfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIF9wb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlXywgX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uXywgX2RlbGVnYXRpb25EaWFsb2dTZXJ2aWNlXykgPT4ge1xyXG5cclxuICAgICAgICBwb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkJ1bGtEZWNpc2lvblNlcnZpY2VfO1xyXG4gICAgICAgIHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlID0gX3BvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlXztcclxuICAgICAgICBQb2xpY3lWaW9sYXRpb25BY3Rpb24gPSBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXztcclxuICAgICAgICBQb2xpY3lWaW9sYXRpb25EZWNpc2lvbiA9IF9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvbl87XHJcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uRGlhbG9nU2VydmljZSA9IF9wb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICBQb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlID0gX1BvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGVfO1xyXG4gICAgICAgIGRlbGVnYXRpb25EaWFsb2dTZXJ2aWNlID0gX2RlbGVnYXRpb25EaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRxID0gXyRxXztcclxuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBzZWxlY3Rpb24gbW9kZWwgYW5kIGZpbHRlcnMuXHJcbiAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcclxuICAgICAgICBzZWxlY3Rpb25Nb2RlbC5hZGQoeyBpZDogJzEnIH0sIHsgaWQ6ICcyJ30pO1xyXG4gICAgICAgIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgIHRlc3Q6IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc29tZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NvcGVDb25maWcgPSB7c3RhdHVzZXM6IFsnRGVsZWdhdGVkJywgJ09wZW4nXX07XHJcbiAgICAgICAgZGVjaXNpb25TY29wZSA9IG5ldyBQb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlKHNjb3BlQ29uZmlnKTtcclxuICAgICAgICAvLyBzZXQgdGhlIGRlY2lzaW9uQ29uZmlnIGZvciBhbGxvd1xyXG4gICAgICAgIGRlY2lzaW9uQ29uZmlnID0ge1xyXG4gICAgICAgICAgICBhbGxvd01pdGlnYXRpb25FeHBpcmF0aW9uRWRpdGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlcXVpcmVNaXRpZ2F0aW9uQ29tbWVudHM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmF1bHRNaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ1bGtEZWNpc2lvbnM6IFsnTWl0aWdhdGVkJywgJ0RlbGVnYXRlZCddXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwb2xpY3lWaW9sYXRpb25EYXRhU2VydmljZS5kZWNpc2lvbkNvbmZpZyA9IGRlY2lzaW9uQ29uZmlnO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGJ1bGtEZWNpZGUoc3RhdHVzKSB7XHJcbiAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbjtcclxuXHJcbiAgICAgICAgcG9saWN5VmlvbGF0aW9uQnVsa0RlY2lzaW9uU2VydmljZS5idWxrRGVjaWRlKFxyXG4gICAgICAgICAgICBzdGF0dXMsIHNlbGVjdGlvbk1vZGVsLCBmaWx0ZXJzLCAyLCBkZWNpc2lvblNjb3BlKS50aGVuKChkZWNpc2lvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnVsa0RlY2lzaW9uID0gZGVjaXNpb247XHJcbiAgICAgICAgfSkuY2F0Y2goZXhwZWN0UmVqZWN0KTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBidWxrRGVjaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ2J1bGtEZWNpZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIGludmFsaWQgc3RhdHVzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBidWxrRGVjaWRlKCdOZXcnKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGlmIG5vIHNlbGVjdGlvbk1vZGVsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLmJ1bGtEZWNpZGUoXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMsIHVuZGVmaW5lZCwgZmlsdGVycywgMiwgZGVjaXNpb25TY29wZSkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBpZiBubyBkZWNpc2lvblNjb3BlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBwb2xpY3lWaW9sYXRpb25CdWxrRGVjaXNpb25TZXJ2aWNlLmJ1bGtEZWNpZGUoXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMsIHNlbGVjdGlvbk1vZGVsLCBmaWx0ZXJzLCAyLCB1bmRlZmluZWQpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlc2NyaWJlKCdNaXRpZ2F0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXNvbHZlcyB3aXRoIGJ1bGtEZWNpc2lvbiBvZiBNaXRpZ2F0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tbWVudHMgPSAnY29tbWVudGluZy4uLicsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nUmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tZW50czogY29tbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZTogZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzcHlPbihwb2xpY3lWaW9sYXRpb25EaWFsb2dTZXJ2aWNlLCAnc2hvd0FsbG93RXhjZXB0aW9uRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZGlhbG9nUmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gYnVsa0RlY2lkZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5zaXplKCkpLnRvRXF1YWwoc2VsZWN0aW9uTW9kZWwuc2l6ZSgpKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24uY29tbWVudHMpLnRvRXF1YWwoY29tbWVudHMpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbi5taXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGUpLnRvRXF1YWwoZGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JlamVjdHMgaWYgZGlhbG9nIGlzIGNhbmNlbGxlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93QWxsb3dFeGNlcHRpb25EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoJHEucmVqZWN0KCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbiA9IGJ1bGtEZWNpZGUoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbikudG9CZVVuZGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVzY3JpYmUoJ0RlbGVnYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaXQoJ3Jlc29sdmVzIHdpdGggYnVsa0RlY2lzaW9uIG9mIERlbGVnYXRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkaWFsb2dSZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMTAwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudHM6ICdkZWxlZ2F0aW5nIHRoaXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnZGVsZWdhdGlvbiBkZXNjcmlwdGlvbidcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgc3B5T24oZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93RGVsZWdhdGlvbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGRpYWxvZ1Jlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbiA9IGJ1bGtEZWNpZGUoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5EZWxlZ2F0ZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbikudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24uc3RhdHVzKS50b0VxdWFsKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuRGVsZWdhdGVkKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuc2l6ZSgpKS50b0VxdWFsKHNlbGVjdGlvbk1vZGVsLnNpemUoKSk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uLmNvbW1lbnRzKS50b0VxdWFsKGRpYWxvZ1Jlc3VsdC5jb21tZW50cyk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGRpYWxvZ1Jlc3VsdC5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uLnJlY2lwaWVudCkudG9FcXVhbChkaWFsb2dSZXN1bHQucmVjaXBpZW50LmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVqZWN0cyBpZiBkaWFsb2cgaXMgY2FuY2VsbGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24oZGVsZWdhdGlvbkRpYWxvZ1NlcnZpY2UsICdzaG93RGVsZWdhdGlvbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3QoKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gYnVsa0RlY2lkZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkRlbGVnYXRlZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uKS50b0JlVW5kZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZXNjcmliZSgnY2VydGlmeSBidWxrRGVjaXNpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0KCdyZXNvbHZlcyB3aXRoIGJ1bGtEZWNpc2lvbiBpZiBubyB1bnNhdmVkIGRlY2lzaW9ucycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldERlY2lzaW9uQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsa0RlY2lzaW9uID0gYnVsa0RlY2lkZShQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLkNlcnRpZmllZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QoYnVsa0RlY2lzaW9uKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5DZXJ0aWZpZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5zaXplKCkpLnRvRXF1YWwoc2VsZWN0aW9uTW9kZWwuc2l6ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpdCgncmVzb2x2ZXMgd2l0aCBidWxrRGVjaXNpb24gaWYgdW5zYXZlZCBkZWNpc2lvbnMgYnV0IHVzZXIgaXMgT0sgd2l0aCBpdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNweU9uKHBvbGljeVZpb2xhdGlvbkRhdGFTZXJ2aWNlLmRlY2lzaW9ucywgJ2dldERlY2lzaW9uQ291bnQnKS5hbmQucmV0dXJuVmFsdWUoNyk7XHJcbiAgICAgICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGtEZWNpc2lvbiA9IGJ1bGtEZWNpZGUoUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5DZXJ0aWZpZWQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGJ1bGtEZWNpc2lvbikudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24uc3RhdHVzKS50b0VxdWFsKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuQ2VydGlmaWVkKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuc2l6ZSgpKS50b0VxdWFsKHNlbGVjdGlvbk1vZGVsLnNpemUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXQoJ3JlamVjdHMgaWYgdXNlciBjYW5jZWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3B5T24ocG9saWN5VmlvbGF0aW9uRGF0YVNlcnZpY2UuZGVjaXNpb25zLCAnZ2V0RGVjaXNpb25Db3VudCcpLmFuZC5yZXR1cm5WYWx1ZSg3KTtcclxuICAgICAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdjb25maXJtJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgpKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWxrRGVjaXNpb24gPSBidWxrRGVjaWRlKFBvbGljeVZpb2xhdGlvbkFjdGlvbi5TdGF0dXMuQ2VydGlmaWVkKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChidWxrRGVjaXNpb24pLm5vdC50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
