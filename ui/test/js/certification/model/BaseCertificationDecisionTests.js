System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('BaseCertificationDecision', function () {

                beforeEach(module(certificationModule));

                var BaseCertificationDecision = undefined,
                    IdentitySummary = undefined,
                    PolicyTreeNode = undefined;

                beforeEach(inject(function (_BaseCertificationDecision_, _IdentitySummary_, _PolicyTreeNode_) {
                    BaseCertificationDecision = _BaseCertificationDecision_;
                    IdentitySummary = _IdentitySummary_;
                    PolicyTreeNode = _PolicyTreeNode_;
                }));

                describe('BaseCertificationDecision', function () {
                    it('should initialize with provided data', function () {
                        var data = {
                            comments: 'the comments',
                            description: 'the description',
                            mitigationExpirationDate: 1234567,
                            recipient: 'recipientid',
                            recipientSummary: {
                                id: 'recipientId'
                            },
                            revokedRoles: ['role 1', 'role 2'],
                            status: 'Approved',
                            selectedViolationEntitlements: angular.toJson([{
                                applicationId: '1234',
                                name: 'whosit',
                                value: 'whatsit'
                            }])
                        };

                        var decision = new BaseCertificationDecision(data);

                        expect(decision.comments).toEqual(data.comments);
                        expect(decision.description).toEqual(data.description);
                        expect(decision.mitigationExpirationDate).toEqual(data.mitigationExpirationDate);
                        expect(decision.recipient).toEqual(data.recipient);
                        expect(decision.recipientSummary instanceof IdentitySummary).toEqual(true);
                        expect(decision.recipientSummary).toEqual(new IdentitySummary(data.recipientSummary));
                        expect(decision.revokedRoles).toEqual(data.revokedRoles);
                        expect(decision.status).toEqual(data.status);
                        expect(decision.selectedViolationEntitlements).toBeDefined();
                        expect(decision.selectedViolationEntitlements.length).toEqual(1);
                        expect(decision.selectedViolationEntitlements[0] instanceof PolicyTreeNode).toEqual(true);
                        expect(decision.selectedViolationEntitlements[0]).toEqual(new PolicyTreeNode(angular.fromJson(data.selectedViolationEntitlements)[0]));
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQmFzZUNlcnRpZmljYXRpb25EZWNpc2lvblRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7SUFHakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNkJBQTZCLFlBQVc7O2dCQUU3QyxXQUFXLE9BQU87O2dCQUVsQixJQUFJLDRCQUF5QjtvQkFBRSxrQkFBZTtvQkFBRSxpQkFBYzs7Z0JBRTlELFdBQVcsT0FBTyxVQUFTLDZCQUE2QixtQkFBbUIsa0JBQWtCO29CQUN6Riw0QkFBNEI7b0JBQzVCLGtCQUFrQjtvQkFDbEIsaUJBQWlCOzs7Z0JBR3JCLFNBQVMsNkJBQTZCLFlBQVc7b0JBQzdDLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELElBQUksT0FBTzs0QkFDUCxVQUFVOzRCQUNWLGFBQWE7NEJBQ2IsMEJBQTBCOzRCQUMxQixXQUFXOzRCQUNYLGtCQUFrQjtnQ0FDZCxJQUFJOzs0QkFFUixjQUFjLENBQUMsVUFBVTs0QkFDekIsUUFBUTs0QkFDUiwrQkFBK0IsUUFBUSxPQUFPLENBQUM7Z0NBQzNDLGVBQWU7Z0NBQ2YsTUFBTTtnQ0FDTixPQUFPOzs7O3dCQUlmLElBQUksV0FBVyxJQUFJLDBCQUEwQjs7d0JBRTdDLE9BQU8sU0FBUyxVQUFVLFFBQVEsS0FBSzt3QkFDdkMsT0FBTyxTQUFTLGFBQWEsUUFBUSxLQUFLO3dCQUMxQyxPQUFPLFNBQVMsMEJBQTBCLFFBQVEsS0FBSzt3QkFDdkQsT0FBTyxTQUFTLFdBQVcsUUFBUSxLQUFLO3dCQUN4QyxPQUFPLFNBQVMsNEJBQTRCLGlCQUFpQixRQUFRO3dCQUNyRSxPQUFPLFNBQVMsa0JBQWtCLFFBQVEsSUFBSSxnQkFBZ0IsS0FBSzt3QkFDbkUsT0FBTyxTQUFTLGNBQWMsUUFBUSxLQUFLO3dCQUMzQyxPQUFPLFNBQVMsUUFBUSxRQUFRLEtBQUs7d0JBQ3JDLE9BQU8sU0FBUywrQkFBK0I7d0JBQy9DLE9BQU8sU0FBUyw4QkFBOEIsUUFBUSxRQUFRO3dCQUM5RCxPQUFPLFNBQVMsOEJBQThCLGNBQWMsZ0JBQWdCLFFBQVE7d0JBQ3BGLE9BQU8sU0FBUyw4QkFBOEIsSUFDekMsUUFBUSxJQUFJLGVBQWUsUUFBUSxTQUFTLEtBQUssK0JBQStCOzs7Ozs7R0FjOUYiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9tb2RlbC9CYXNlQ2VydGlmaWNhdGlvbkRlY2lzaW9uVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnQmFzZUNlcnRpZmljYXRpb25EZWNpc2lvbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgbGV0IEJhc2VDZXJ0aWZpY2F0aW9uRGVjaXNpb24sIElkZW50aXR5U3VtbWFyeSwgUG9saWN5VHJlZU5vZGU7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQmFzZUNlcnRpZmljYXRpb25EZWNpc2lvbl8sIF9JZGVudGl0eVN1bW1hcnlfLCBfUG9saWN5VHJlZU5vZGVfKSB7XG4gICAgICAgIEJhc2VDZXJ0aWZpY2F0aW9uRGVjaXNpb24gPSBfQmFzZUNlcnRpZmljYXRpb25EZWNpc2lvbl87XG4gICAgICAgIElkZW50aXR5U3VtbWFyeSA9IF9JZGVudGl0eVN1bW1hcnlfO1xuICAgICAgICBQb2xpY3lUcmVlTm9kZSA9IF9Qb2xpY3lUcmVlTm9kZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ0Jhc2VDZXJ0aWZpY2F0aW9uRGVjaXNpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29tbWVudHM6ICd0aGUgY29tbWVudHMnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAndGhlIGRlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBtaXRpZ2F0aW9uRXhwaXJhdGlvbkRhdGU6IDEyMzQ1NjcsXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50OiAncmVjaXBpZW50aWQnLFxuICAgICAgICAgICAgICAgIHJlY2lwaWVudFN1bW1hcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZWNpcGllbnRJZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJldm9rZWRSb2xlczogWydyb2xlIDEnLCAncm9sZSAyJ10sXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnQXBwcm92ZWQnLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzOiBhbmd1bGFyLnRvSnNvbihbe1xuICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbklkOiAnMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd3aG9zaXQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3doYXRzaXQnXG4gICAgICAgICAgICAgICAgfV0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgZGVjaXNpb24gPSBuZXcgQmFzZUNlcnRpZmljYXRpb25EZWNpc2lvbihkYXRhKTtcblxuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmNvbW1lbnRzKS50b0VxdWFsKGRhdGEuY29tbWVudHMpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLmRlc2NyaXB0aW9uKS50b0VxdWFsKGRhdGEuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSkudG9FcXVhbChkYXRhLm1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZSk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24ucmVjaXBpZW50KS50b0VxdWFsKGRhdGEucmVjaXBpZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZWNpcGllbnRTdW1tYXJ5IGluc3RhbmNlb2YgSWRlbnRpdHlTdW1tYXJ5KS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnJlY2lwaWVudFN1bW1hcnkpLnRvRXF1YWwobmV3IElkZW50aXR5U3VtbWFyeShkYXRhLnJlY2lwaWVudFN1bW1hcnkpKTtcbiAgICAgICAgICAgIGV4cGVjdChkZWNpc2lvbi5yZXZva2VkUm9sZXMpLnRvRXF1YWwoZGF0YS5yZXZva2VkUm9sZXMpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnN0YXR1cykudG9FcXVhbChkYXRhLnN0YXR1cyk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGRlY2lzaW9uLnNlbGVjdGVkVmlvbGF0aW9uRW50aXRsZW1lbnRzWzBdIGluc3RhbmNlb2YgUG9saWN5VHJlZU5vZGUpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoZGVjaXNpb24uc2VsZWN0ZWRWaW9sYXRpb25FbnRpdGxlbWVudHNbMF0pXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwobmV3IFBvbGljeVRyZWVOb2RlKGFuZ3VsYXIuZnJvbUpzb24oZGF0YS5zZWxlY3RlZFZpb2xhdGlvbkVudGl0bGVtZW50cylbMF0pKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
