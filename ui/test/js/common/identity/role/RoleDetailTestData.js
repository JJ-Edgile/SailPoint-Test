System.register(['common/identity/role/IdentityRoleModule', 'test/js/common/identity/entitlement/EntitlementTestData'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }, function (_testJsCommonIdentityEntitlementEntitlementTestData) {}],
        execute: function () {

            angular.module(roleModule).

            /**
             * This contains test data used by the role detail tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('roleDetailTestData', ["entitlementTestData", function (entitlementTestData) {

                var ENTITLEMENT1 = angular.copy(entitlementTestData.ENTITLEMENT1);
                var ENTITLEMENT2 = angular.copy(entitlementTestData.ENTITLEMENT2);

                var ROLE1 = {
                    id: 'roleId',
                    assigned: true,
                    detected: false,
                    displayName: 'Rollin',
                    type: 'Business',
                    owner: {
                        id: 'identityId',
                        name: 'Some Dude'
                    },
                    description: 'This role likes long walks on the beach',
                    permittedBy: 'The Permit-inator',
                    assignmentNote: 'I hereby grant thee access to thine role!',
                    identityHasRole: true,
                    requiredRoles: [{
                        id: 'req1Id'
                    }, {
                        id: 'req2Id'
                    }],
                    permittedRoles: [{
                        id: 'perm1'
                    }],
                    hierarchy: [{
                        id: 'super1'
                    }],
                    hasHierarchy: true,
                    accountDetails: [{
                        application: 'Target app 1'
                    }],
                    contributingEntitlements: [ENTITLEMENT1, ENTITLEMENT2]
                };

                return {
                    ENTITLEMENT1: ENTITLEMENT1,
                    ENTITLEMENT2: ENTITLEMENT2,
                    ROLE1: ROLE1
                };
            }]);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxUZXN0RGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQ0FBMkMsNERBQTRELFVBQVUsU0FBUztJQUN2STs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHVDQUF1QztZQUN2RCxhQUFhLHNDQUFzQztXQUNwRCxVQUFVLHFEQUFxRDtRQUNsRSxTQUFTLFlBQVk7O1lBTDdCLFFBQVEsT0FBTzs7Ozs7OztZQU9mLFFBQVEsOENBQXNCLFVBQVMscUJBQXFCOztnQkFFeEQsSUFBTSxlQUFlLFFBQVEsS0FBSyxvQkFBb0I7Z0JBQ3RELElBQU0sZUFBZSxRQUFRLEtBQUssb0JBQW9COztnQkFFdEQsSUFBTSxRQUFRO29CQUNWLElBQUk7b0JBQ0osVUFBVTtvQkFDVixVQUFVO29CQUNWLGFBQWE7b0JBQ2IsTUFBTTtvQkFDTixPQUFPO3dCQUNILElBQUk7d0JBQ0osTUFBTTs7b0JBRVYsYUFBYTtvQkFDYixhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixlQUFlLENBQUM7d0JBQ1IsSUFBSTt1QkFDTDt3QkFDQyxJQUFJOztvQkFHWixnQkFBZ0IsQ0FBQzt3QkFDYixJQUFJOztvQkFFUixXQUFXLENBQUM7d0JBQ1IsSUFBSTs7b0JBRVIsY0FBYztvQkFDZCxnQkFBZ0IsQ0FBQzt3QkFDYixhQUFhOztvQkFFakIsMEJBQTBCLENBQUUsY0FBYzs7O2dCQUc5QyxPQUFPO29CQUNILGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxPQUFPOzs7OztHQVdaIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByb2xlTW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9yb2xlL0lkZW50aXR5Um9sZU1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvRW50aXRsZW1lbnRUZXN0RGF0YSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZShyb2xlTW9kdWxlKS5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbnRhaW5zIHRlc3QgZGF0YSB1c2VkIGJ5IHRoZSByb2xlIGRldGFpbCB0ZXN0cy4gIERvbid0IG1vZGlmeSB0aGlzIGRhdGFcclxuICogZGlyZWN0bHkgZnJvbSB3aXRoaW4geW91ciB0ZXN0cy4gIElmIHlvdSBuZWVkIHRvIG1vZGlmeSBkYXRhLCB1c2UgYW5ndWxhci5jb3B5KCkgdG8gY3JlYXRlIHlvdXIgb3duXHJcbiAqIGNvcHkgYmVmb3JlIGNoYW5naW5nIGl0LlxyXG4gKi9cclxuZmFjdG9yeSgncm9sZURldGFpbFRlc3REYXRhJywgZnVuY3Rpb24oZW50aXRsZW1lbnRUZXN0RGF0YSkge1xyXG5cclxuICAgIGNvbnN0IEVOVElUTEVNRU5UMSA9IGFuZ3VsYXIuY29weShlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICBjb25zdCBFTlRJVExFTUVOVDIgPSBhbmd1bGFyLmNvcHkoZW50aXRsZW1lbnRUZXN0RGF0YS5FTlRJVExFTUVOVDIpO1xyXG5cclxuICAgIGNvbnN0IFJPTEUxID0ge1xyXG4gICAgICAgIGlkOiAncm9sZUlkJyxcclxuICAgICAgICBhc3NpZ25lZDogdHJ1ZSxcclxuICAgICAgICBkZXRlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgZGlzcGxheU5hbWU6ICdSb2xsaW4nLFxyXG4gICAgICAgIHR5cGU6ICdCdXNpbmVzcycsXHJcbiAgICAgICAgb3duZXI6IHtcclxuICAgICAgICAgICAgaWQ6ICdpZGVudGl0eUlkJyxcclxuICAgICAgICAgICAgbmFtZTogJ1NvbWUgRHVkZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyByb2xlIGxpa2VzIGxvbmcgd2Fsa3Mgb24gdGhlIGJlYWNoJyxcclxuICAgICAgICBwZXJtaXR0ZWRCeTogJ1RoZSBQZXJtaXQtaW5hdG9yJyxcclxuICAgICAgICBhc3NpZ25tZW50Tm90ZTogJ0kgaGVyZWJ5IGdyYW50IHRoZWUgYWNjZXNzIHRvIHRoaW5lIHJvbGUhJyxcclxuICAgICAgICBpZGVudGl0eUhhc1JvbGU6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZWRSb2xlczogW3tcclxuICAgICAgICAgICAgICAgIGlkOiAncmVxMUlkJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3JlcTJJZCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcGVybWl0dGVkUm9sZXM6IFt7XHJcbiAgICAgICAgICAgIGlkOiAncGVybTEnXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgaGllcmFyY2h5OiBbe1xyXG4gICAgICAgICAgICBpZDogJ3N1cGVyMSdcclxuICAgICAgICB9XSxcclxuICAgICAgICBoYXNIaWVyYXJjaHk6IHRydWUsXHJcbiAgICAgICAgYWNjb3VudERldGFpbHM6IFt7XHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiAnVGFyZ2V0IGFwcCAxJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIGNvbnRyaWJ1dGluZ0VudGl0bGVtZW50czogWyBFTlRJVExFTUVOVDEsIEVOVElUTEVNRU5UMiBdXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgRU5USVRMRU1FTlQxOiBFTlRJVExFTUVOVDEsXHJcbiAgICAgICAgRU5USVRMRU1FTlQyOiBFTlRJVExFTUVOVDIsXHJcbiAgICAgICAgUk9MRTE6IFJPTEUxXHJcbiAgICB9O1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
