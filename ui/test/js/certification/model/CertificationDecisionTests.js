System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationDecision', function () {

                beforeEach(module(certificationModule));

                var CertificationDecision = undefined,
                    CertificationItem = undefined,
                    certificationTestData = undefined,
                    CertificationActionStatus = undefined,
                    SelectionModel = undefined,
                    CertificationTableScope = undefined;

                function getStatus(status) {
                    return new CertificationActionStatus({
                        status: status
                    });
                }

                beforeEach(inject(function (_CertificationDecision_, _CertificationItem_, _certificationTestData_, _CertificationActionStatus_, _SelectionModel_, _CertificationTableScope_) {
                    CertificationDecision = _CertificationDecision_;
                    CertificationItem = _CertificationItem_;
                    certificationTestData = _certificationTestData_;
                    CertificationActionStatus = _CertificationActionStatus_;
                    SelectionModel = _SelectionModel_;
                    CertificationTableScope = _CertificationTableScope_;
                }));

                describe('createItemDecision', function () {
                    it('should initialize with provided data', function () {
                        var certificationItem = {
                            getId: function () {
                                return '1234';
                            },
                            tableScope: {
                                statuses: ['A']
                            }
                        },
                            status = 'Approved',
                            comments = 'something something',
                            test = CertificationDecision.createItemDecision(certificationItem, getStatus(status), comments);

                        expect(test.getItem()).toEqual(certificationItem);
                        expect(test.getItemId()).toEqual(certificationItem.getId());
                        expect(test.status).toEqual(status);
                        expect(test.comments).toEqual(comments);
                        expect(test.getScope()).toEqual(new CertificationTableScope(certificationItem.tableScope));
                    });

                    it('should throw with no certificationItem', function () {
                        expect(function () {
                            return CertificationDecision.createItemDecision(undefined, getStatus('Approved'));
                        }).toThrow();
                    });

                    it('should throw with no status', function () {
                        expect(function () {
                            return CertificationDecision.createItemDecision({ id: '1234' }, undefined);
                        }).toThrow();
                    });
                });

                describe('createBulkDecision', function () {
                    it('should initialize with provided data', function () {
                        var selectionModel = { some: 'fakeObject' },
                            status = 'Approved',
                            comments = 'something something',
                            bulkCount = 1,
                            tableScope = {
                            statuses: ['A', 'B']
                        },
                            test = CertificationDecision.createBulkDecision(selectionModel, tableScope, getStatus(status), bulkCount, comments);

                        expect(test.selectionModel).toEqual(selectionModel);
                        expect(test.status).toEqual(status);
                        expect(test.comments).toEqual(comments);
                        expect(test.getScope()).toEqual(new CertificationTableScope(tableScope));
                    });

                    it('should throw with no selectionModel', function () {
                        expect(function () {
                            return CertificationDecision.createBulkDecision(undefined, {}, getStatus('Approved'));
                        }).toThrow();
                    });

                    it('should throw with no status', function () {
                        expect(function () {
                            return CertificationDecision.createBulkDecision({}, {}, undefined);
                        }).toThrow();
                    });
                });

                describe('isDependent()', function () {
                    it('should return true if item matches the revoked role', function () {
                        var roleDecision = CertificationDecision.createItemDecision({
                            id: '1234',
                            entityId: certificationTestData.CERT_ITEMS[3].entityId
                        }, getStatus('Remediated'));
                        roleDecision.revokedRoles = ['role1'];
                        roleDecision.selectedViolationEntitlements = undefined;

                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[3]);
                        expect(roleDecision.isDependent(certItem)).toEqual(true);
                    });

                    it('should return true if item matches the revoked violation entitlement', function () {
                        var entitlementDecision = CertificationDecision.createItemDecision({
                            id: '1234',
                            entityId: certificationTestData.CERT_ITEMS[2].entityId
                        }, getStatus('Remediated'));
                        entitlementDecision.revokedRoles = undefined;
                        entitlementDecision.selectedViolationEntitlements = [{
                            application: 'app',
                            name: 'name',
                            value: 'value',
                            permission: false }];

                        var certificationItem = new CertificationItem(certificationTestData.CERT_ITEMS[2]);
                        expect(entitlementDecision.isDependent(certificationItem)).toEqual(true);
                    });

                    it('should return false if item entityIds do not match', function () {
                        var roleDecision = CertificationDecision.createItemDecision({
                            id: '1234',
                            entityId: 'someotherperson'
                        }, getStatus('Remediated'));
                        roleDecision.revokedRoles = ['role1'];
                        roleDecision.selectedViolationEntitlements = undefined;

                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[3]);
                        expect(roleDecision.isDependent(certItem)).toEqual(false);
                    });

                    it('should return false if bulk decision', function () {
                        var selectionModel = new SelectionModel(),
                            decision = CertificationDecision.createBulkDecision(selectionModel, {}, getStatus('Remediated'));

                        selectionModel.selectAll();
                        decision.revokedRoles = ['role1'];
                        var certItem = new CertificationItem(certificationTestData.CERT_ITEMS[3]);
                        expect(decision.isDependent(certItem)).toEqual(false);
                    });
                });

                describe('clone()', function () {
                    it('returns new deep copied object with selection model intact', function () {
                        var selections = new SelectionModel(),
                            tableScope = {
                            statues: ['A']
                        },
                            decision = CertificationDecision.createBulkDecision(selections, tableScope, getStatus('Approved')),
                            clonedDecision = undefined;

                        selections.add({
                            id: '1234'
                        });

                        // Just set some values so we can check if they are copied, do not worry about type.
                        decision.comments = 'comments';
                        decision.recipient = 'recipient';
                        decision.revokedRoles = 'revokedRoles';
                        decision.selectedViolationEntitlements = 'selectedViolationEntitlements';
                        decision.delegationReviewAction = 'Accept';
                        decision.challengeAction = 'Reject';
                        decision.oneStepChallenge = true;
                        decision.description = 'delegation description';
                        decision.mitigationExpirationDate = new Date();
                        decision.remediationDetails = [{ some: 'thing' }];

                        clonedDecision = decision.clone();
                        selections.clear();

                        expect(clonedDecision.selectionModel.size()).toEqual(1);
                        expect(clonedDecision.selectionModel.getSelectionIds()).toContain('1234');
                        expect(clonedDecision.status).toEqual(decision.status);
                        expect(clonedDecision.getScope()).toEqual(new CertificationTableScope(tableScope));

                        expect(clonedDecision.comments).toEqual(decision.comments);
                        expect(clonedDecision.recipient).toEqual(decision.recipient);
                        expect(clonedDecision.revokedRoles).toEqual(decision.revokedRoles);
                        expect(clonedDecision.selectedViolationEntitlements).toEqual(decision.selectedViolationEntitlements);
                        expect(clonedDecision.delegationReviewAction).toEqual(decision.delegationReviewAction);
                        expect(clonedDecision.challengeAction).toEqual(decision.challengeAction);
                        expect(clonedDecision.oneStepChallenge).toEqual(decision.oneStepChallenge);
                        expect(clonedDecision.description).toEqual(decision.description);
                        expect(clonedDecision.mitigationExpirationDate).toEqual(decision.mitigationExpirationDate);
                        expect(clonedDecision.created).toEqual(decision.created);
                        expect(clonedDecision.remediationDetails).toEqual(decision.remediationDetails);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkRlY2lzaW9uVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7OztJQUdqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5QkFBeUIsWUFBVzs7Z0JBRXpDLFdBQVcsT0FBTzs7Z0JBRWxCLElBQUksd0JBQXFCO29CQUFFLG9CQUFpQjtvQkFBRSx3QkFBcUI7b0JBQUUsNEJBQXlCO29CQUFFLGlCQUFjO29CQUMxRywwQkFBdUI7O2dCQUUzQixTQUFTLFVBQVUsUUFBUTtvQkFDdkIsT0FBTyxJQUFJLDBCQUEwQjt3QkFDakMsUUFBUTs7OztnQkFJaEIsV0FBVyxPQUFPLFVBQVMseUJBQXlCLHFCQUFxQix5QkFDOUMsNkJBQTZCLGtCQUFrQiwyQkFBMkI7b0JBQ2pHLHdCQUF3QjtvQkFDeEIsb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBQ3hCLDRCQUE0QjtvQkFDNUIsaUJBQWlCO29CQUNqQiwwQkFBMEI7OztnQkFHOUIsU0FBUyxzQkFBc0IsWUFBVztvQkFDdEMsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsSUFBSSxvQkFBb0I7NEJBQ2hCLE9BQU8sWUFBQTtnQ0FXSyxPQVhDOzs0QkFDYixZQUFZO2dDQUNSLFVBQVUsQ0FBQzs7OzRCQUduQixTQUFTOzRCQUNULFdBQVc7NEJBQ1gsT0FBTyxzQkFBc0IsbUJBQW1CLG1CQUFtQixVQUFVLFNBQVM7O3dCQUUxRixPQUFPLEtBQUssV0FBVyxRQUFRO3dCQUMvQixPQUFPLEtBQUssYUFBYSxRQUFRLGtCQUFrQjt3QkFDbkQsT0FBTyxLQUFLLFFBQVEsUUFBUTt3QkFDNUIsT0FBTyxLQUFLLFVBQVUsUUFBUTt3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QkFBYzs7d0JBRWxCLFdBQVcsSUFBSTs0QkFDWCxJQUFJOzs7O3dCQUlSLFNBQVMsV0FBVzt3QkFDcEIsU0FBUyxZQUFZO3dCQUNyQixTQUFTLGVBQWU7d0JBQ3hCLFNBQVMsZ0NBQWdDO3dCQUN6QyxTQUFTLHlCQUF5Qjt3QkFDbEMsU0FBUyxrQkFBa0I7d0JBQzNCLFNBQVMsbUJBQW1CO3dCQUM1QixTQUFTLGNBQWM7d0JBQ3ZCLFNBQVMsMkJBQTJCLElBQUk7d0JBQ3hDLFNBQVMscUJBQXFCLENBQUUsRUFBRSxNQUFNOzt3QkFFeEMsaUJBQWlCLFNBQVM7d0JBQzFCLFdBQVc7O3dCQUVYLE9BQU8sZUFBZSxlQUFlLFFBQVEsUUFBUTt3QkFDckQsT0FBTyxlQUFlLGVBQWUsbUJBQW1CLFVBQVU7d0JBQ2xFLE9BQU8sZUFBZSxRQUFRLFFBQVEsU0FBUzt3QkFDL0MsT0FBTyxlQUFlLFlBQVksUUFBUSxJQUFJLHdCQUF3Qjs7d0JBRXRFLE9BQU8sZUFBZSxVQUFVLFFBQVEsU0FBUzt3QkFDakQsT0FBTyxlQUFlLFdBQVcsUUFBUSxTQUFTO3dCQUNsRCxPQUFPLGVBQWUsY0FBYyxRQUFRLFNBQVM7d0JBQ3JELE9BQU8sZUFBZSwrQkFBK0IsUUFBUSxTQUFTO3dCQUN0RSxPQUFPLGVBQWUsd0JBQXdCLFFBQVEsU0FBUzt3QkFDL0QsT0FBTyxlQUFlLGlCQUFpQixRQUFRLFNBQVM7d0JBQ3hELE9BQU8sZUFBZSxrQkFBa0IsUUFBUSxTQUFTO3dCQUN6RCxPQUFPLGVBQWUsYUFBYSxRQUFRLFNBQVM7d0JBQ3BELE9BQU8sZUFBZSwwQkFBMEIsUUFBUSxTQUFTO3dCQUNqRSxPQUFPLGVBQWUsU0FBUyxRQUFRLFNBQVM7d0JBQ2hELE9BQU8sZUFBZSxvQkFBb0IsUUFBUSxTQUFTOzs7Ozs7R0F3QnBFIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvbkRlY2lzaW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvbkRlY2lzaW9uJywgZnVuY3Rpb24oKSB7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XG5cbiAgICBsZXQgQ2VydGlmaWNhdGlvbkRlY2lzaW9uLCBDZXJ0aWZpY2F0aW9uSXRlbSwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzLCBTZWxlY3Rpb25Nb2RlbCxcbiAgICAgICAgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGU7XG5cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2VydGlmaWNhdGlvbkFjdGlvblN0YXR1cyh7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQ2VydGlmaWNhdGlvbkRlY2lzaW9uXywgX0NlcnRpZmljYXRpb25JdGVtXywgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfLCBfU2VsZWN0aW9uTW9kZWxfLCBfQ2VydGlmaWNhdGlvblRhYmxlU2NvcGVfKSB7XG4gICAgICAgIENlcnRpZmljYXRpb25EZWNpc2lvbiA9IF9DZXJ0aWZpY2F0aW9uRGVjaXNpb25fO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uSXRlbSA9IF9DZXJ0aWZpY2F0aW9uSXRlbV87XG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uQWN0aW9uU3RhdHVzID0gX0NlcnRpZmljYXRpb25BY3Rpb25TdGF0dXNfO1xuICAgICAgICBTZWxlY3Rpb25Nb2RlbCA9IF9TZWxlY3Rpb25Nb2RlbF87XG4gICAgICAgIENlcnRpZmljYXRpb25UYWJsZVNjb3BlID0gX0NlcnRpZmljYXRpb25UYWJsZVNjb3BlXztcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlSXRlbURlY2lzaW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjZXJ0aWZpY2F0aW9uSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0SWQ6ICgpID0+ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgdGFibGVTY29wZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzZXM6IFsnQSddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0YXR1cyA9ICdBcHByb3ZlZCcsXG4gICAgICAgICAgICAgICAgY29tbWVudHMgPSAnc29tZXRoaW5nIHNvbWV0aGluZycsXG4gICAgICAgICAgICAgICAgdGVzdCA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVJdGVtRGVjaXNpb24oY2VydGlmaWNhdGlvbkl0ZW0sIGdldFN0YXR1cyhzdGF0dXMpLCBjb21tZW50cyk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmdldEl0ZW0oKSkudG9FcXVhbChjZXJ0aWZpY2F0aW9uSXRlbSk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5nZXRJdGVtSWQoKSkudG9FcXVhbChjZXJ0aWZpY2F0aW9uSXRlbS5nZXRJZCgpKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LnN0YXR1cykudG9FcXVhbChzdGF0dXMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuY29tbWVudHMpLnRvRXF1YWwoY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KHRlc3QuZ2V0U2NvcGUoKSkudG9FcXVhbChuZXcgQ2VydGlmaWNhdGlvblRhYmxlU2NvcGUoY2VydGlmaWNhdGlvbkl0ZW0udGFibGVTY29wZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gY2VydGlmaWNhdGlvbkl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKHVuZGVmaW5lZCwgZ2V0U3RhdHVzKCdBcHByb3ZlZCcpKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gc3RhdHVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbih7aWQ6ICcxMjM0J30sIHVuZGVmaW5lZCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY3JlYXRlQnVsa0RlY2lzaW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIHByb3ZpZGVkIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25Nb2RlbCA9IHsgc29tZTogJ2Zha2VPYmplY3QnIH0sXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gJ0FwcHJvdmVkJyxcbiAgICAgICAgICAgICAgICBjb21tZW50cyA9ICdzb21ldGhpbmcgc29tZXRoaW5nJyxcbiAgICAgICAgICAgICAgICBidWxrQ291bnQgPSAxLFxuICAgICAgICAgICAgICAgIHRhYmxlU2NvcGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbJ0EnLCAnQiddXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXN0ID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25Nb2RlbCwgdGFibGVTY29wZSwgZ2V0U3RhdHVzKHN0YXR1cyksXG4gICAgICAgICAgICAgICAgICAgIGJ1bGtDb3VudCwgY29tbWVudHMpO1xuXG4gICAgICAgICAgICBleHBlY3QodGVzdC5zZWxlY3Rpb25Nb2RlbCkudG9FcXVhbChzZWxlY3Rpb25Nb2RlbCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdC5zdGF0dXMpLnRvRXF1YWwoc3RhdHVzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmNvbW1lbnRzKS50b0VxdWFsKGNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0LmdldFNjb3BlKCkpLnRvRXF1YWwobmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKHRhYmxlU2NvcGUpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIHNlbGVjdGlvbk1vZGVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbih1bmRlZmluZWQsIHt9LCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpKVxuICAgICAgICAgICAgICAgIC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgd2l0aCBubyBzdGF0dXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlQnVsa0RlY2lzaW9uKHt9LCB7fSwgdW5kZWZpbmVkKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0RlcGVuZGVudCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgaXRlbSBtYXRjaGVzIHRoZSByZXZva2VkIHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCByb2xlRGVjaXNpb24gPSBDZXJ0aWZpY2F0aW9uRGVjaXNpb24uY3JlYXRlSXRlbURlY2lzaW9uKHtcbiAgICAgICAgICAgICAgICBpZDogJzEyMzQnLFxuICAgICAgICAgICAgICAgIGVudGl0eUlkOiBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1szXS5lbnRpdHlJZFxuICAgICAgICAgICAgfSwgZ2V0U3RhdHVzKCdSZW1lZGlhdGVkJykpO1xuICAgICAgICAgICAgcm9sZURlY2lzaW9uLnJldm9rZWRSb2xlcyA9IFsncm9sZTEnXTtcbiAgICAgICAgICAgIHJvbGVEZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzNdKTtcbiAgICAgICAgICAgIGV4cGVjdChyb2xlRGVjaXNpb24uaXNEZXBlbmRlbnQoY2VydEl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGl0ZW0gbWF0Y2hlcyB0aGUgcmV2b2tlZCB2aW9sYXRpb24gZW50aXRsZW1lbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdGxlbWVudERlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBlbnRpdHlJZDogY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRfSVRFTVNbMl0uZW50aXR5SWRcbiAgICAgICAgICAgIH0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpKTtcbiAgICAgICAgICAgIGVudGl0bGVtZW50RGVjaXNpb24ucmV2b2tlZFJvbGVzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZW50aXRsZW1lbnREZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyA9IFt7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246ICdhcHAnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiBmYWxzZX1dO1xuXG4gICAgICAgICAgICBsZXQgY2VydGlmaWNhdGlvbkl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRfSVRFTVNbMl0pO1xuICAgICAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50RGVjaXNpb24uaXNEZXBlbmRlbnQoY2VydGlmaWNhdGlvbkl0ZW0pKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBpdGVtIGVudGl0eUlkcyBkbyBub3QgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcm9sZURlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUl0ZW1EZWNpc2lvbih7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICBlbnRpdHlJZDogJ3NvbWVvdGhlcnBlcnNvbidcbiAgICAgICAgICAgIH0sIGdldFN0YXR1cygnUmVtZWRpYXRlZCcpKTtcbiAgICAgICAgICAgIHJvbGVEZWNpc2lvbi5yZXZva2VkUm9sZXMgPSBbJ3JvbGUxJ107XG4gICAgICAgICAgICByb2xlRGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGxldCBjZXJ0SXRlbSA9IG5ldyBDZXJ0aWZpY2F0aW9uSXRlbShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1szXSk7XG4gICAgICAgICAgICBleHBlY3Qocm9sZURlY2lzaW9uLmlzRGVwZW5kZW50KGNlcnRJdGVtKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGJ1bGsgZGVjaXNpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwoKSxcbiAgICAgICAgICAgICAgICBkZWNpc2lvbiA9IENlcnRpZmljYXRpb25EZWNpc2lvbi5jcmVhdGVCdWxrRGVjaXNpb24oc2VsZWN0aW9uTW9kZWwsIHt9LCBnZXRTdGF0dXMoJ1JlbWVkaWF0ZWQnKSk7XG5cbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgZGVjaXNpb24ucmV2b2tlZFJvbGVzID0gWydyb2xlMSddO1xuICAgICAgICAgICAgbGV0IGNlcnRJdGVtID0gbmV3IENlcnRpZmljYXRpb25JdGVtKGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzNdKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5pc0RlcGVuZGVudChjZXJ0SXRlbSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjbG9uZSgpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBuZXcgZGVlcCBjb3BpZWQgb2JqZWN0IHdpdGggc2VsZWN0aW9uIG1vZGVsIGludGFjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25zID0gbmV3IFNlbGVjdGlvbk1vZGVsKCksXG4gICAgICAgICAgICAgICAgdGFibGVTY29wZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVlczogWydBJ11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRlY2lzaW9uID0gQ2VydGlmaWNhdGlvbkRlY2lzaW9uLmNyZWF0ZUJ1bGtEZWNpc2lvbihzZWxlY3Rpb25zLCB0YWJsZVNjb3BlLCBnZXRTdGF0dXMoJ0FwcHJvdmVkJykpLFxuICAgICAgICAgICAgICAgIGNsb25lZERlY2lzaW9uO1xuXG4gICAgICAgICAgICBzZWxlY3Rpb25zLmFkZCh7XG4gICAgICAgICAgICAgICAgaWQ6ICcxMjM0J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEp1c3Qgc2V0IHNvbWUgdmFsdWVzIHNvIHdlIGNhbiBjaGVjayBpZiB0aGV5IGFyZSBjb3BpZWQsIGRvIG5vdCB3b3JyeSBhYm91dCB0eXBlLlxuICAgICAgICAgICAgZGVjaXNpb24uY29tbWVudHMgPSAnY29tbWVudHMnO1xuICAgICAgICAgICAgZGVjaXNpb24ucmVjaXBpZW50ID0gJ3JlY2lwaWVudCc7XG4gICAgICAgICAgICBkZWNpc2lvbi5yZXZva2VkUm9sZXMgPSAncmV2b2tlZFJvbGVzJztcbiAgICAgICAgICAgIGRlY2lzaW9uLnNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzID0gJ3NlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzJztcbiAgICAgICAgICAgIGRlY2lzaW9uLmRlbGVnYXRpb25SZXZpZXdBY3Rpb24gPSAnQWNjZXB0JztcbiAgICAgICAgICAgIGRlY2lzaW9uLmNoYWxsZW5nZUFjdGlvbiA9ICdSZWplY3QnO1xuICAgICAgICAgICAgZGVjaXNpb24ub25lU3RlcENoYWxsZW5nZSA9IHRydWU7XG4gICAgICAgICAgICBkZWNpc2lvbi5kZXNjcmlwdGlvbiA9ICdkZWxlZ2F0aW9uIGRlc2NyaXB0aW9uJztcbiAgICAgICAgICAgIGRlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkZWNpc2lvbi5yZW1lZGlhdGlvbkRldGFpbHMgPSBbIHsgc29tZTogJ3RoaW5nJ31dO1xuXG4gICAgICAgICAgICBjbG9uZWREZWNpc2lvbiA9IGRlY2lzaW9uLmNsb25lKCk7XG4gICAgICAgICAgICBzZWxlY3Rpb25zLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5zZWxlY3Rpb25Nb2RlbC5zaXplKCkpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24uc2VsZWN0aW9uTW9kZWwuZ2V0U2VsZWN0aW9uSWRzKCkpLnRvQ29udGFpbignMTIzNCcpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLnN0YXR1cykudG9FcXVhbChkZWNpc2lvbi5zdGF0dXMpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLmdldFNjb3BlKCkpLnRvRXF1YWwobmV3IENlcnRpZmljYXRpb25UYWJsZVNjb3BlKHRhYmxlU2NvcGUpKTtcblxuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLmNvbW1lbnRzKS50b0VxdWFsKGRlY2lzaW9uLmNvbW1lbnRzKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5yZWNpcGllbnQpLnRvRXF1YWwoZGVjaXNpb24ucmVjaXBpZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5yZXZva2VkUm9sZXMpLnRvRXF1YWwoZGVjaXNpb24ucmV2b2tlZFJvbGVzKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cykudG9FcXVhbChkZWNpc2lvbi5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cyk7XG4gICAgICAgICAgICBleHBlY3QoY2xvbmVkRGVjaXNpb24uZGVsZWdhdGlvblJldmlld0FjdGlvbikudG9FcXVhbChkZWNpc2lvbi5kZWxlZ2F0aW9uUmV2aWV3QWN0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5jaGFsbGVuZ2VBY3Rpb24pLnRvRXF1YWwoZGVjaXNpb24uY2hhbGxlbmdlQWN0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5vbmVTdGVwQ2hhbGxlbmdlKS50b0VxdWFsKGRlY2lzaW9uLm9uZVN0ZXBDaGFsbGVuZ2UpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGRlY2lzaW9uLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5taXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGUpLnRvRXF1YWwoZGVjaXNpb24ubWl0aWdhdGlvbkV4cGlyYXRpb25EYXRlKTtcbiAgICAgICAgICAgIGV4cGVjdChjbG9uZWREZWNpc2lvbi5jcmVhdGVkKS50b0VxdWFsKGRlY2lzaW9uLmNyZWF0ZWQpO1xuICAgICAgICAgICAgZXhwZWN0KGNsb25lZERlY2lzaW9uLnJlbWVkaWF0aW9uRGV0YWlscykudG9FcXVhbChkZWNpc2lvbi5yZW1lZGlhdGlvbkRldGFpbHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
