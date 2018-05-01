System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule', 'test/js/policyViolation/PolicyTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }, function (_testJsPolicyViolationPolicyTestData) {}],
        execute: function () {

            describe('PolicyViolationDecision', function () {

                var PolicyViolationDecision = undefined,
                    PolicyViolationAction = undefined,
                    policyViolation = undefined,
                    selectionModel = undefined,
                    decisionScope = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_PolicyViolationDecision_, policyTestData, PolicyViolation, PolicyViolationDecisionScope, SelectionModel, _PolicyViolationAction_) {
                    PolicyViolationDecision = _PolicyViolationDecision_;
                    PolicyViolationAction = _PolicyViolationAction_;
                    policyViolation = new PolicyViolation(policyTestData.POLICY_VIOLATION_DATA_1);
                    selectionModel = new SelectionModel();
                    decisionScope = new PolicyViolationDecisionScope();
                }));

                describe('createDecision', function () {
                    it('throws with no policyViolation', function () {
                        expect(function () {
                            return PolicyViolationDecision.createDecision(undefined, PolicyViolationAction.Status.Mitigated);
                        }).toThrow();
                    });

                    it('throws with no status', function () {
                        expect(function () {
                            return PolicyViolationDecision.createDecision(policyViolation);
                        }).toThrow();
                    });

                    it('creates initialized decision', function () {
                        var status = PolicyViolationAction.Status.Mitigated,
                            comments = 'something to say',
                            decision = PolicyViolationDecision.createDecision(policyViolation, status, comments);

                        expect(decision.status).toEqual(status);
                        expect(decision.getItem()).toBe(policyViolation);
                        expect(decision.getScope()).toEqual(policyViolation.getScope());
                        expect(decision.comments).toEqual(comments);
                        expect(decision.created).toBeDefined();
                    });
                });

                describe('createBulkDecision', function () {
                    it('throws with no selectionModel', function () {
                        expect(function () {
                            return PolicyViolationDecision.createBulkDecision(undefined, decisionScope, 12, PolicyViolationAction.Status.Mitigated);
                        }).toThrow();
                    });

                    it('throws with no decisionScope', function () {
                        expect(function () {
                            return PolicyViolationDecision.createBulkDecision(selectionModel, undefined, 12, PolicyViolationAction.Status.Mitigated);
                        }).toThrow();
                    });

                    it('throws with no status', function () {
                        expect(function () {
                            return PolicyViolationDecision.createBulkDecision(selectionModel, decisionScope, 12);
                        }).toThrow();
                    });

                    it('creates initialized decision', function () {
                        var status = PolicyViolationAction.Status.Mitigated,
                            comments = 'something to say',
                            bulkCount = 12,
                            decision = PolicyViolationDecision.createBulkDecision(selectionModel, decisionScope, bulkCount, status, comments);

                        expect(decision.status).toEqual(status);
                        expect(decision.getSelectionModel()).toBe(selectionModel);
                        expect(decision.getScope()).toBe(decisionScope);
                        expect(decision.getBulkCount()).toEqual(bulkCount);
                        expect(decision.comments).toEqual(comments);
                    });
                });

                describe('clone()', function () {
                    it('returns new deep copied object with selection model intact', function () {
                        var decision = PolicyViolationDecision.createBulkDecision(selectionModel, decisionScope, 10, 'Mitigated'),
                            clonedDecision = undefined;

                        selectionModel.add({
                            id: '1234'
                        });

                        // Just set some values so we can check if they are copied, do not worry about type.
                        decision.comments = 'comments';
                        decision.revokedRoles = 'revokedRoles';
                        decision.mitigationExpirationDate = new Date();

                        clonedDecision = decision.clone();
                        selectionModel.clear();

                        expect(clonedDecision.selectionModel.size()).toEqual(1);
                        expect(clonedDecision.selectionModel.getSelectionIds()).toContain('1234');
                        expect(clonedDecision.status).toEqual(decision.status);
                        expect(clonedDecision.getScope()).toEqual(decisionScope);

                        expect(clonedDecision.comments).toEqual(decision.comments);
                        expect(clonedDecision.mitigationExpirationDate).toEqual(decision.mitigationExpirationDate);
                        expect(clonedDecision.revokedRoles).toEqual(decision.revokedRoles);
                        expect(clonedDecision.selectedViolationEntitlements).toEqual(decision.selectedViolationEntitlements);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5Q0FBeUMsMkNBQTJDLFVBQVUsU0FBUzs7O0lBRy9JOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQztXQUMvRCxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsMkJBQTJCLFlBQU07O2dCQUV0QyxJQUFJLDBCQUF1QjtvQkFBRSx3QkFBcUI7b0JBQUUsa0JBQWU7b0JBQUUsaUJBQWM7b0JBQUUsZ0JBQWE7O2dCQUVsRyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQywyQkFBMkIsZ0JBQWdCLGlCQUFpQiw4QkFDNUQsZ0JBQWdCLHlCQUE0QjtvQkFDM0QsMEJBQTBCO29CQUMxQix3QkFBd0I7b0JBQ3hCLGtCQUFrQixJQUFJLGdCQUFnQixlQUFlO29CQUNyRCxpQkFBaUIsSUFBSTtvQkFDckIsZ0JBQWdCLElBQUk7OztnQkFHeEIsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsT0FBTyxZQUFBOzRCQVVTLE9BVkgsd0JBQXdCLGVBQWUsV0FBVyxzQkFBc0IsT0FBTzsyQkFDdkY7OztvQkFHVCxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixPQUFPLFlBQUE7NEJBV1MsT0FYSCx3QkFBd0IsZUFBZTsyQkFDL0M7OztvQkFHVCxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxJQUFJLFNBQVMsc0JBQXNCLE9BQU87NEJBQ3RDLFdBQVc7NEJBQ1gsV0FBVyx3QkFBd0IsZUFBZSxpQkFBaUIsUUFBUTs7d0JBRS9FLE9BQU8sU0FBUyxRQUFRLFFBQVE7d0JBQ2hDLE9BQU8sU0FBUyxXQUFXLEtBQUs7d0JBQ2hDLE9BQU8sU0FBUyxZQUFZLFFBQVEsZ0JBQWdCO3dCQUNwRCxPQUFPLFNBQVMsVUFBVSxRQUFRO3dCQUNsQyxPQUFPLFNBQVMsU0FBUzs7OztnQkFJakMsU0FBUyxzQkFBc0IsWUFBTTtvQkFDakMsR0FBRyxpQ0FBaUMsWUFBTTt3QkFDdEMsT0FBTyxZQUFBOzRCQVlTLE9BWkgsd0JBQXdCLG1CQUFtQixXQUFXLGVBQWUsSUFDOUUsc0JBQXNCLE9BQU87MkJBQVk7OztvQkFHakQsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsT0FBTyxZQUFBOzRCQWFTLE9BYkgsd0JBQXdCLG1CQUFtQixnQkFBZ0IsV0FBVyxJQUMvRSxzQkFBc0IsT0FBTzsyQkFBWTs7O29CQUdqRCxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixPQUFPLFlBQUE7NEJBY1MsT0FkSCx3QkFBd0IsbUJBQW1CLGdCQUFnQixlQUFlOzJCQUFLOzs7b0JBR2hHLEdBQUcsZ0NBQWdDLFlBQU07d0JBQ3JDLElBQUksU0FBUyxzQkFBc0IsT0FBTzs0QkFDdEMsV0FBVzs0QkFDWCxZQUFZOzRCQUNaLFdBQVcsd0JBQ04sbUJBQW1CLGdCQUFnQixlQUFlLFdBQVcsUUFBUTs7d0JBRTlFLE9BQU8sU0FBUyxRQUFRLFFBQVE7d0JBQ2hDLE9BQU8sU0FBUyxxQkFBcUIsS0FBSzt3QkFDMUMsT0FBTyxTQUFTLFlBQVksS0FBSzt3QkFDakMsT0FBTyxTQUFTLGdCQUFnQixRQUFRO3dCQUN4QyxPQUFPLFNBQVMsVUFBVSxRQUFROzs7O2dCQUkxQyxTQUFTLFdBQVcsWUFBTTtvQkFDdEIsR0FBRyw4REFBOEQsWUFBTTt3QkFDbkUsSUFBSSxXQUFXLHdCQUF3QixtQkFBbUIsZ0JBQWdCLGVBQWUsSUFBSTs0QkFDekYsaUJBQWM7O3dCQUVsQixlQUFlLElBQUk7NEJBQ2YsSUFBSTs7Ozt3QkFJUixTQUFTLFdBQVc7d0JBQ3BCLFNBQVMsZUFBZTt3QkFDeEIsU0FBUywyQkFBMkIsSUFBSTs7d0JBRXhDLGlCQUFpQixTQUFTO3dCQUMxQixlQUFlOzt3QkFFZixPQUFPLGVBQWUsZUFBZSxRQUFRLFFBQVE7d0JBQ3JELE9BQU8sZUFBZSxlQUFlLG1CQUFtQixVQUFVO3dCQUNsRSxPQUFPLGVBQWUsUUFBUSxRQUFRLFNBQVM7d0JBQy9DLE9BQU8sZUFBZSxZQUFZLFFBQVE7O3dCQUUxQyxPQUFPLGVBQWUsVUFBVSxRQUFRLFNBQVM7d0JBQ2pELE9BQU8sZUFBZSwwQkFBMEIsUUFBUSxTQUFTO3dCQUNqRSxPQUFPLGVBQWUsY0FBYyxRQUFRLFNBQVM7d0JBQ3JELE9BQU8sZUFBZSwrQkFBK0IsUUFBUSxTQUFTOzs7Ozs7R0FvQi9FIiwiZmlsZSI6InBvbGljeVZpb2xhdGlvbi9tb2RlbC9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvblRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9wb2xpY3lWaW9sYXRpb24vUG9saWN5VGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUG9saWN5VmlvbGF0aW9uRGVjaXNpb24nLCAoKSA9PiB7XG5cbiAgICBsZXQgUG9saWN5VmlvbGF0aW9uRGVjaXNpb24sIFBvbGljeVZpb2xhdGlvbkFjdGlvbiwgcG9saWN5VmlvbGF0aW9uLCBzZWxlY3Rpb25Nb2RlbCwgZGVjaXNpb25TY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvbl8sIHBvbGljeVRlc3REYXRhLCBQb2xpY3lWaW9sYXRpb24sIFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uU2NvcGUsXG4gICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdGlvbk1vZGVsLCBfUG9saWN5VmlvbGF0aW9uQWN0aW9uXykgPT4ge1xuICAgICAgICBQb2xpY3lWaW9sYXRpb25EZWNpc2lvbiA9IF9Qb2xpY3lWaW9sYXRpb25EZWNpc2lvbl87XG4gICAgICAgIFBvbGljeVZpb2xhdGlvbkFjdGlvbiA9IF9Qb2xpY3lWaW9sYXRpb25BY3Rpb25fO1xuICAgICAgICBwb2xpY3lWaW9sYXRpb24gPSBuZXcgUG9saWN5VmlvbGF0aW9uKHBvbGljeVRlc3REYXRhLlBPTElDWV9WSU9MQVRJT05fREFUQV8xKTtcbiAgICAgICAgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKTtcbiAgICAgICAgZGVjaXNpb25TY29wZSA9IG5ldyBQb2xpY3lWaW9sYXRpb25EZWNpc2lvblNjb3BlKCk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZURlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gcG9saWN5VmlvbGF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLmNyZWF0ZURlY2lzaW9uKHVuZGVmaW5lZCwgUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpKVxuICAgICAgICAgICAgICAgIC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gUG9saWN5VmlvbGF0aW9uRGVjaXNpb24uY3JlYXRlRGVjaXNpb24ocG9saWN5VmlvbGF0aW9uKSlcbiAgICAgICAgICAgICAgICAudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY3JlYXRlcyBpbml0aWFsaXplZCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICBjb21tZW50cyA9ICdzb21ldGhpbmcgdG8gc2F5JyxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLmNyZWF0ZURlY2lzaW9uKHBvbGljeVZpb2xhdGlvbiwgc3RhdHVzLCBjb21tZW50cyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoc3RhdHVzKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5nZXRJdGVtKCkpLnRvQmUocG9saWN5VmlvbGF0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5nZXRTY29wZSgpKS50b0VxdWFsKHBvbGljeVZpb2xhdGlvbi5nZXRTY29wZSgpKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5jb21tZW50cykudG9FcXVhbChjb21tZW50cyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uY3JlYXRlZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlQnVsa0RlY2lzaW9uJywgKCkgPT4ge1xuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gc2VsZWN0aW9uTW9kZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gUG9saWN5VmlvbGF0aW9uRGVjaXNpb24uY3JlYXRlQnVsa0RlY2lzaW9uKHVuZGVmaW5lZCwgZGVjaXNpb25TY29wZSwgMTIsXG4gICAgICAgICAgICAgICAgUG9saWN5VmlvbGF0aW9uQWN0aW9uLlN0YXR1cy5NaXRpZ2F0ZWQpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBkZWNpc2lvblNjb3BlJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgdW5kZWZpbmVkLCAxMixcbiAgICAgICAgICAgICAgICBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBQb2xpY3lWaW9sYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIGRlY2lzaW9uU2NvcGUsIDEyKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY3JlYXRlcyBpbml0aWFsaXplZCBkZWNpc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSBQb2xpY3lWaW9sYXRpb25BY3Rpb24uU3RhdHVzLk1pdGlnYXRlZCxcbiAgICAgICAgICAgICAgICBjb21tZW50cyA9ICdzb21ldGhpbmcgdG8gc2F5JyxcbiAgICAgICAgICAgICAgICBidWxrQ291bnQgPSAxMixcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIGRlY2lzaW9uU2NvcGUsIGJ1bGtDb3VudCwgc3RhdHVzLCBjb21tZW50cyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5zdGF0dXMpLnRvRXF1YWwoc3RhdHVzKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5nZXRTZWxlY3Rpb25Nb2RlbCgpKS50b0JlKHNlbGVjdGlvbk1vZGVsKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5nZXRTY29wZSgpKS50b0JlKGRlY2lzaW9uU2NvcGUpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmdldEJ1bGtDb3VudCgpKS50b0VxdWFsKGJ1bGtDb3VudCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uY29tbWVudHMpLnRvRXF1YWwoY29tbWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjbG9uZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBuZXcgZGVlcCBjb3BpZWQgb2JqZWN0IHdpdGggc2VsZWN0aW9uIG1vZGVsIGludGFjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNpc2lvbiA9IFBvbGljeVZpb2xhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgZGVjaXNpb25TY29wZSwgMTAsICdNaXRpZ2F0ZWQnKSxcbiAgICAgICAgICAgICAgICBjbG9uZWREZWNpc2lvbjtcblxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWwuYWRkKHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSnVzdCBzZXQgc29tZSB2YWx1ZXMgc28gd2UgY2FuIGNoZWNrIGlmIHRoZXkgYXJlIGNvcGllZCwgZG8gbm90IHdvcnJ5IGFib3V0IHR5cGUuXG4gICAgICAgICAgICBkZWNpc2lvbi5jb21tZW50cyA9ICdjb21tZW50cyc7XG4gICAgICAgICAgICBkZWNpc2lvbi5yZXZva2VkUm9sZXMgPSAncmV2b2tlZFJvbGVzJztcbiAgICAgICAgICAgIGRlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgIGNsb25lZERlY2lzaW9uID0gZGVjaXNpb24uY2xvbmUoKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5zaXplKCkpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuZ2V0U2VsZWN0aW9uSWRzKCkpLnRvQ29udGFpbignMTIzNCcpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLnN0YXR1cykudG9FcXVhbChkZWNpc2lvbi5zdGF0dXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLmdldFNjb3BlKCkpLnRvRXF1YWwoZGVjaXNpb25TY29wZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5jb21tZW50cykudG9FcXVhbChkZWNpc2lvbi5jb21tZW50cyk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24ubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKS50b0VxdWFsKGRlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24ucmV2b2tlZFJvbGVzKS50b0VxdWFsKGRlY2lzaW9uLnJldm9rZWRSb2xlcyk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpLnRvRXF1YWwoZGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
