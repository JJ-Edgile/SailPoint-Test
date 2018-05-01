System.register(['test/js/TestInitializer', 'certification/CertificationModule', '../CertificationTestData'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_CertificationTestData) {}],
        execute: function () {

            describe('CertificationRemediationAdvice', function () {
                var CertificationRemediationAdvice = undefined,
                    CertificationPolicyTreeNode = undefined,
                    CertificationSoDRole = undefined,
                    advice = undefined,
                    policyTree = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationRemediationAdvice_, _CertificationPolicyTreeNode_, _CertificationSoDRole_, certificationTestData) {
                    advice = angular.copy(certificationTestData.REMEDIATION_ADVICE_RESULT.advice);
                    policyTree = angular.copy(certificationTestData.POLICY_TREE_AND_NODE);
                    CertificationPolicyTreeNode = _CertificationPolicyTreeNode_;
                    CertificationSoDRole = _CertificationSoDRole_;
                    CertificationRemediationAdvice = _CertificationRemediationAdvice_;
                }));

                it('re-initializes SoD roles to cert specific versions', function () {
                    var certAdvice = new CertificationRemediationAdvice(advice);
                    expect(certAdvice.rightRoles[0] instanceof CertificationSoDRole).toEqual(true);
                    expect(certAdvice.leftRoles[0] instanceof CertificationSoDRole).toEqual(true);
                });

                it('reinitializes policy tree to cert specific versions', function () {
                    advice.entitlementsToRemediate = policyTree;
                    var certAdvice = new CertificationRemediationAdvice(advice);
                    expect(certAdvice.entitlementsToRemediate instanceof CertificationPolicyTreeNode).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vcmVtZWRpYXRpb24vQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uQWR2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw2QkFBNkIsVUFBVSxTQUFTOzs7SUFHN0g7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxrQ0FBa0MsWUFBTTtnQkFDN0MsSUFBSSxpQ0FBOEI7b0JBQUUsOEJBQTJCO29CQUFFLHVCQUFvQjtvQkFBRSxTQUFNO29CQUFFLGFBQVU7O2dCQUV6RyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxrQ0FBa0MsK0JBQStCLHdCQUNqRSx1QkFBMEI7b0JBQ3pDLFNBQVMsUUFBUSxLQUFLLHNCQUFzQiwwQkFBMEI7b0JBQ3RFLGFBQWEsUUFBUSxLQUFLLHNCQUFzQjtvQkFDaEQsOEJBQThCO29CQUM5Qix1QkFBdUI7b0JBQ3ZCLGlDQUFpQzs7O2dCQUdyQyxHQUFHLHNEQUFzRCxZQUFNO29CQUMzRCxJQUFJLGFBQWEsSUFBSSwrQkFBK0I7b0JBQ3BELE9BQU8sV0FBVyxXQUFXLGNBQWMsc0JBQXNCLFFBQVE7b0JBQ3pFLE9BQU8sV0FBVyxVQUFVLGNBQWMsc0JBQXNCLFFBQVE7OztnQkFHNUUsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsT0FBTywwQkFBMEI7b0JBQ2pDLElBQUksYUFBYSxJQUFJLCtCQUErQjtvQkFDcEQsT0FBTyxXQUFXLG1DQUFtQyw2QkFBNkIsUUFBUTs7Ozs7R0FjL0YiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9yZW1lZGlhdGlvbi9DZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5pbXBvcnQgJy4uL0NlcnRpZmljYXRpb25UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkFkdmljZSwgQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlLCBDZXJ0aWZpY2F0aW9uU29EUm9sZSwgYWR2aWNlLCBwb2xpY3lUcmVlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9DZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2VfLCBfQ2VydGlmaWNhdGlvblBvbGljeVRyZWVOb2RlXywgX0NlcnRpZmljYXRpb25Tb0RSb2xlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgY2VydGlmaWNhdGlvblRlc3REYXRhKSA9PiB7XG4gICAgICAgIGFkdmljZSA9IGFuZ3VsYXIuY29weShjZXJ0aWZpY2F0aW9uVGVzdERhdGEuUkVNRURJQVRJT05fQURWSUNFX1JFU1VMVC5hZHZpY2UpO1xuICAgICAgICBwb2xpY3lUcmVlID0gYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5QT0xJQ1lfVFJFRV9BTkRfTk9ERSk7XG4gICAgICAgIENlcnRpZmljYXRpb25Qb2xpY3lUcmVlTm9kZSA9IF9DZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGVfO1xuICAgICAgICBDZXJ0aWZpY2F0aW9uU29EUm9sZSA9IF9DZXJ0aWZpY2F0aW9uU29EUm9sZV87XG4gICAgICAgIENlcnRpZmljYXRpb25SZW1lZGlhdGlvbkFkdmljZSA9IF9DZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2VfO1xuICAgIH0pKTtcblxuICAgIGl0KCdyZS1pbml0aWFsaXplcyBTb0Qgcm9sZXMgdG8gY2VydCBzcGVjaWZpYyB2ZXJzaW9ucycsICgpID0+IHtcbiAgICAgICAgbGV0IGNlcnRBZHZpY2UgPSBuZXcgQ2VydGlmaWNhdGlvblJlbWVkaWF0aW9uQWR2aWNlKGFkdmljZSk7XG4gICAgICAgIGV4cGVjdChjZXJ0QWR2aWNlLnJpZ2h0Um9sZXNbMF0gaW5zdGFuY2VvZiBDZXJ0aWZpY2F0aW9uU29EUm9sZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNlcnRBZHZpY2UubGVmdFJvbGVzWzBdIGluc3RhbmNlb2YgQ2VydGlmaWNhdGlvblNvRFJvbGUpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVpbml0aWFsaXplcyBwb2xpY3kgdHJlZSB0byBjZXJ0IHNwZWNpZmljIHZlcnNpb25zJywgKCkgPT4ge1xuICAgICAgICBhZHZpY2UuZW50aXRsZW1lbnRzVG9SZW1lZGlhdGUgPSBwb2xpY3lUcmVlO1xuICAgICAgICBsZXQgY2VydEFkdmljZSA9IG5ldyBDZXJ0aWZpY2F0aW9uUmVtZWRpYXRpb25BZHZpY2UoYWR2aWNlKTtcbiAgICAgICAgZXhwZWN0KGNlcnRBZHZpY2UuZW50aXRsZW1lbnRzVG9SZW1lZGlhdGUgaW5zdGFuY2VvZiBDZXJ0aWZpY2F0aW9uUG9saWN5VHJlZU5vZGUpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
