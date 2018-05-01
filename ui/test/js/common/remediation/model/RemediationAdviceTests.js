System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RemediationAdvice', function () {

                beforeEach(module(remediationModule));

                var data = undefined,
                    policyTreeNodeData = undefined,
                    RemediationAdvice = undefined,
                    SoDRole = undefined,
                    PolicyTreeNode = undefined;

                beforeEach(inject(function (_RemediationAdvice_, _SoDRole_, _PolicyTreeNode_, remediationTestData) {
                    RemediationAdvice = _RemediationAdvice_;
                    SoDRole = _SoDRole_;
                    PolicyTreeNode = _PolicyTreeNode_;
                    data = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.advice);
                    policyTreeNodeData = angular.copy(remediationTestData.POLICY_TREE_NODE);
                }));

                describe('constructor', function () {
                    it('should initialize with provided data', function () {
                        data.entitlementsToRemediate = policyTreeNodeData;

                        var advice = new RemediationAdvice(data);
                        expect(advice.violationConstraint).toEqual(data.violationConstraint);
                        expect(advice.violationSummary).toEqual(data.violationSummary);
                        expect(advice.remediationAdvice).toEqual(data.remediationAdvice);
                        expect(advice.leftRoles.length).toEqual(data.leftRoles.length);
                        advice.leftRoles.forEach(function (role) {
                            expect(role instanceof SoDRole).toEqual(true);
                        });
                        expect(advice.rightRoles.length).toEqual(data.rightRoles.length);
                        advice.rightRoles.forEach(function (role) {
                            expect(role instanceof SoDRole).toEqual(true);
                        });
                        expect(advice.entitlementsToRemediate instanceof PolicyTreeNode).toEqual(true);
                    });

                    it('should throw with no data', function () {
                        expect(function () {
                            new RemediationAdvice();
                        }).toThrow();
                    });
                });

                describe('isRoleSoDViolation()', function () {
                    it('returns false if no left or right roles', function () {
                        var advice = new RemediationAdvice(data);
                        delete advice.leftRoles;
                        delete advice.rightRoles;
                        expect(advice.isRoleSoDViolation()).toEqual(false);
                    });

                    it('returns true if left roles exist', function () {
                        var advice = new RemediationAdvice(data);
                        delete advice.rightRoles;
                        expect(advice.isRoleSoDViolation()).toEqual(true);
                    });

                    it('returns true if right roles exist', function () {
                        var advice = new RemediationAdvice(data);
                        delete advice.leftRoles;
                        expect(advice.isRoleSoDViolation()).toEqual(true);
                    });
                });

                describe('isEntitlementSoDViolation', function () {
                    it('returns true if there are entitlements to remediate', function () {
                        data.entitlementsToRemediate = policyTreeNodeData;
                        var advice = new RemediationAdvice(data);
                        expect(advice.isEntitlementSoDViolation()).toEqual(true);
                    });

                    it('returns false if there are no entitlements to remediate', function () {
                        var advice = new RemediationAdvice(data);
                        expect(advice.isEntitlementSoDViolation()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkFkdmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsMkJBQTJCLFVBQVUsU0FBUzs7O0lBRzlIOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxQ0FBcUM7WUFDM0Ysb0JBQW9CLG9DQUFvQztXQUN6RCxVQUFVLHNCQUFzQjtRQUNuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMscUJBQXFCLFlBQVc7O2dCQUVyQyxXQUFXLE9BQU87O2dCQUVsQixJQUFJLE9BQUk7b0JBQUUscUJBQWtCO29CQUFFLG9CQUFpQjtvQkFBRSxVQUFPO29CQUFFLGlCQUFjOztnQkFFeEUsV0FBVyxPQUFPLFVBQUMscUJBQXFCLFdBQVcsa0JBQWtCLHFCQUF3QjtvQkFDekYsb0JBQW9CO29CQUNwQixVQUFVO29CQUNWLGlCQUFpQjtvQkFDakIsT0FBTyxRQUFRLEtBQUssb0JBQW9CLDBCQUEwQjtvQkFDbEUscUJBQXFCLFFBQVEsS0FBSyxvQkFBb0I7OztnQkFHMUQsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLEtBQUssMEJBQTBCOzt3QkFFL0IsSUFBSSxTQUFTLElBQUksa0JBQWtCO3dCQUNuQyxPQUFPLE9BQU8scUJBQXFCLFFBQVEsS0FBSzt3QkFDaEQsT0FBTyxPQUFPLGtCQUFrQixRQUFRLEtBQUs7d0JBQzdDLE9BQU8sT0FBTyxtQkFBbUIsUUFBUSxLQUFLO3dCQUM5QyxPQUFPLE9BQU8sVUFBVSxRQUFRLFFBQVEsS0FBSyxVQUFVO3dCQUN2RCxPQUFPLFVBQVUsUUFBUSxVQUFDLE1BQVM7NEJBQy9CLE9BQU8sZ0JBQWdCLFNBQVMsUUFBUTs7d0JBRTVDLE9BQU8sT0FBTyxXQUFXLFFBQVEsUUFBUSxLQUFLLFdBQVc7d0JBQ3pELE9BQU8sV0FBVyxRQUFRLFVBQUMsTUFBUzs0QkFDaEMsT0FBTyxnQkFBZ0IsU0FBUyxRQUFROzt3QkFFNUMsT0FBTyxPQUFPLG1DQUFtQyxnQkFBZ0IsUUFBUTs7O29CQUc3RSxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxPQUFPLFlBQU07NEJBQUUsSUFBSTsyQkFBd0I7Ozs7Z0JBSW5ELFNBQVMsd0JBQXdCLFlBQU07b0JBQ25DLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksU0FBUyxJQUFJLGtCQUFrQjt3QkFDbkMsT0FBTyxPQUFPO3dCQUNkLE9BQU8sT0FBTzt3QkFDZCxPQUFPLE9BQU8sc0JBQXNCLFFBQVE7OztvQkFHaEQsR0FBRyxvQ0FBb0MsWUFBTTt3QkFDekMsSUFBSSxTQUFTLElBQUksa0JBQWtCO3dCQUNuQyxPQUFPLE9BQU87d0JBQ2QsT0FBTyxPQUFPLHNCQUFzQixRQUFROzs7b0JBR2hELEdBQUcscUNBQXFDLFlBQU07d0JBQzFDLElBQUksU0FBUyxJQUFJLGtCQUFrQjt3QkFDbkMsT0FBTyxPQUFPO3dCQUNkLE9BQU8sT0FBTyxzQkFBc0IsUUFBUTs7OztnQkFJcEQsU0FBUyw2QkFBNkIsWUFBTTtvQkFDeEMsR0FBRyx1REFBdUQsWUFBTTt3QkFDNUQsS0FBSywwQkFBMEI7d0JBQy9CLElBQUksU0FBUyxJQUFJLGtCQUFrQjt3QkFDbkMsT0FBTyxPQUFPLDZCQUE2QixRQUFROzs7b0JBR3ZELEdBQUcsMkRBQTJELFlBQU07d0JBQ2hFLElBQUksU0FBUyxJQUFJLGtCQUFrQjt3QkFDbkMsT0FBTyxPQUFPLDZCQUE2QixRQUFROzs7Ozs7R0FrQjVEIiwiZmlsZSI6ImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkFkdmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlbWVkaWF0aW9uTW9kdWxlIGZyb20gJ2NvbW1vbi9yZW1lZGlhdGlvbi9SZW1lZGlhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL1JlbWVkaWF0aW9uVGVzdERhdGEnO1xuXG5kZXNjcmliZSgnUmVtZWRpYXRpb25BZHZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlbWVkaWF0aW9uTW9kdWxlKSk7XG5cbiAgICBsZXQgZGF0YSwgcG9saWN5VHJlZU5vZGVEYXRhLCBSZW1lZGlhdGlvbkFkdmljZSwgU29EUm9sZSwgUG9saWN5VHJlZU5vZGU7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JlbWVkaWF0aW9uQWR2aWNlXywgX1NvRFJvbGVfLCBfUG9saWN5VHJlZU5vZGVfLCByZW1lZGlhdGlvblRlc3REYXRhKSA9PiB7XG4gICAgICAgIFJlbWVkaWF0aW9uQWR2aWNlID0gX1JlbWVkaWF0aW9uQWR2aWNlXztcbiAgICAgICAgU29EUm9sZSA9IF9Tb0RSb2xlXztcbiAgICAgICAgUG9saWN5VHJlZU5vZGUgPSBfUG9saWN5VHJlZU5vZGVfO1xuICAgICAgICBkYXRhID0gYW5ndWxhci5jb3B5KHJlbWVkaWF0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVC5hZHZpY2UpO1xuICAgICAgICBwb2xpY3lUcmVlTm9kZURhdGEgPSBhbmd1bGFyLmNvcHkocmVtZWRpYXRpb25UZXN0RGF0YS5QT0xJQ1lfVFJFRV9OT0RFKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBkYXRhLmVudGl0bGVtZW50c1RvUmVtZWRpYXRlID0gcG9saWN5VHJlZU5vZGVEYXRhO1xuXG4gICAgICAgICAgICBsZXQgYWR2aWNlID0gbmV3IFJlbWVkaWF0aW9uQWR2aWNlKGRhdGEpO1xuICAgICAgICAgICAgZXhwZWN0KGFkdmljZS52aW9sYXRpb25Db25zdHJhaW50KS50b0VxdWFsKGRhdGEudmlvbGF0aW9uQ29uc3RyYWludCk7XG4gICAgICAgICAgICBleHBlY3QoYWR2aWNlLnZpb2xhdGlvblN1bW1hcnkpLnRvRXF1YWwoZGF0YS52aW9sYXRpb25TdW1tYXJ5KTtcbiAgICAgICAgICAgIGV4cGVjdChhZHZpY2UucmVtZWRpYXRpb25BZHZpY2UpLnRvRXF1YWwoZGF0YS5yZW1lZGlhdGlvbkFkdmljZSk7XG4gICAgICAgICAgICBleHBlY3QoYWR2aWNlLmxlZnRSb2xlcy5sZW5ndGgpLnRvRXF1YWwoZGF0YS5sZWZ0Um9sZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGFkdmljZS5sZWZ0Um9sZXMuZm9yRWFjaCgocm9sZSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyb2xlIGluc3RhbmNlb2YgU29EUm9sZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXhwZWN0KGFkdmljZS5yaWdodFJvbGVzLmxlbmd0aCkudG9FcXVhbChkYXRhLnJpZ2h0Um9sZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGFkdmljZS5yaWdodFJvbGVzLmZvckVhY2goKHJvbGUpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3Qocm9sZSBpbnN0YW5jZW9mIFNvRFJvbGUpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChhZHZpY2UuZW50aXRsZW1lbnRzVG9SZW1lZGlhdGUgaW5zdGFuY2VvZiBQb2xpY3lUcmVlTm9kZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgUmVtZWRpYXRpb25BZHZpY2UoKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JvbGVTb0RWaW9sYXRpb24oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbm8gbGVmdCBvciByaWdodCByb2xlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZHZpY2UgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2UoZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgYWR2aWNlLmxlZnRSb2xlcztcbiAgICAgICAgICAgIGRlbGV0ZSBhZHZpY2UucmlnaHRSb2xlcztcbiAgICAgICAgICAgIGV4cGVjdChhZHZpY2UuaXNSb2xlU29EVmlvbGF0aW9uKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGxlZnQgcm9sZXMgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWR2aWNlID0gbmV3IFJlbWVkaWF0aW9uQWR2aWNlKGRhdGEpO1xuICAgICAgICAgICAgZGVsZXRlIGFkdmljZS5yaWdodFJvbGVzO1xuICAgICAgICAgICAgZXhwZWN0KGFkdmljZS5pc1JvbGVTb0RWaW9sYXRpb24oKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiByaWdodCByb2xlcyBleGlzdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZHZpY2UgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2UoZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgYWR2aWNlLmxlZnRSb2xlcztcbiAgICAgICAgICAgIGV4cGVjdChhZHZpY2UuaXNSb2xlU29EVmlvbGF0aW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzRW50aXRsZW1lbnRTb0RWaW9sYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIGVudGl0bGVtZW50cyB0byByZW1lZGlhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBkYXRhLmVudGl0bGVtZW50c1RvUmVtZWRpYXRlID0gcG9saWN5VHJlZU5vZGVEYXRhO1xuICAgICAgICAgICAgbGV0IGFkdmljZSA9IG5ldyBSZW1lZGlhdGlvbkFkdmljZShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChhZHZpY2UuaXNFbnRpdGxlbWVudFNvRFZpb2xhdGlvbigpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gZW50aXRsZW1lbnRzIHRvIHJlbWVkaWF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhZHZpY2UgPSBuZXcgUmVtZWRpYXRpb25BZHZpY2UoZGF0YSk7XG4gICAgICAgICAgICBleHBlY3QoYWR2aWNlLmlzRW50aXRsZW1lbnRTb0RWaW9sYXRpb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
