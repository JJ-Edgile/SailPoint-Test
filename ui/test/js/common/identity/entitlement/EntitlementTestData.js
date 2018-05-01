System.register(['common/identity/entitlement/IdentityEntitlementModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var entitlementModule;
    return {
        setters: [function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }],
        execute: function () {

            angular.module(entitlementModule).

            /**
             * This contains test data used by the entitlement tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('entitlementTestData', function () {
                var ENTITLEMENT1 = {
                    id: '1234',
                    application: 'Entitlement App',
                    instance: 'instance1',
                    nativeIdentity: 'eaccount',
                    accountName: 'Entitlement Account',
                    permission: true,
                    annotation: 'I like to annotate things...',
                    attribute: 'USER_DB',
                    value: 'DELETE',
                    displayValue: 'User Database',
                    description: 'Delete stuff on the user database',
                    name: 'Some name',
                    aggregationState: 'stateibe',
                    group: true,
                    endDate: 1475125200000,
                    startDate: 1475125200000,
                    managedAttributeId: 'managedattr1',
                    hasPendingRequest: true,
                    pendingRequestId: '000012389'
                };

                var ENTITLEMENT2 = {
                    id: '4567',
                    application: 'Entitlement App2',
                    instance: 'instance2',
                    nativeIdentity: 'eaccount2',
                    accountName: 'Entitlement Account2',
                    permission: false,
                    attribute: 'memberOf',
                    value: 'Party People ... YAS!!!',
                    displayValue: 'Partay!',
                    description: 'Get up with the get down'
                };

                var CERTIFICATIONITEM1 = {
                    attributes: null,
                    certificationFinishDate: 1474567646706,
                    certificationGranularity: 'Value',
                    certificationMitigationExpirationDate: 1474567646706,
                    certificationName: 'Manager Access Review for Mary Johnson',
                    certificationStartDate: 1474567646706,
                    certifier: 'Mary Johnson',
                    description: null,
                    displayName: 'Information Security Analyst',
                    id: null,
                    localizedActionStatus: 'Approved',
                    subType: 'AssignedRole',
                    type: 'Bundle'
                };

                var REQUESTITEM1 = {
                    attributes: null,
                    date: 1474568700402,
                    executionStatus: 'Executing',
                    id: null,
                    name: 'groupmbr',
                    operation: 'Add',
                    requester: 'James Smith',
                    source: 'LCM',
                    requestId: '000000001',
                    trimmedRequestId: '1'
                };

                return {
                    ENTITLEMENT1: ENTITLEMENT1,
                    ENTITLEMENT2: ENTITLEMENT2,
                    CERTIFICATIONITEM1: CERTIFICATIONITEM1,
                    REQUESTITEM1: REQUESTITEM1
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9FbnRpdGxlbWVudFRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDBEQUEwRCxVQUFVLFNBQVM7OztJQUcxRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHFEQUFxRDtZQUNyRSxvQkFBb0Isb0RBQW9EOztRQUU1RSxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7OztZQU9mLFFBQVEsdUJBQXVCLFlBQVc7Z0JBQ3RDLElBQU0sZUFBZTtvQkFDakIsSUFBSTtvQkFDSixhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixXQUFXO29CQUNYLE9BQU87b0JBQ1AsY0FBYztvQkFDZCxhQUFhO29CQUNiLE1BQU07b0JBQ04sa0JBQWtCO29CQUNsQixPQUFPO29CQUNQLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsa0JBQWtCOzs7Z0JBR3RCLElBQU0sZUFBZTtvQkFDakIsSUFBSTtvQkFDSixhQUFhO29CQUNiLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxPQUFPO29CQUNQLGNBQWM7b0JBQ2QsYUFBYTs7O2dCQUdqQixJQUFNLHFCQUFxQjtvQkFDdkIsWUFBWTtvQkFDWix5QkFBeUI7b0JBQ3pCLDBCQUEwQjtvQkFDMUIsdUNBQXVDO29CQUN2QyxtQkFBbUI7b0JBQ25CLHdCQUF3QjtvQkFDeEIsV0FBVztvQkFDWCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsSUFBSTtvQkFDSix1QkFBdUI7b0JBQ3ZCLFNBQVM7b0JBQ1QsTUFBTTs7O2dCQUdWLElBQU0sZUFBZTtvQkFDakIsWUFBWTtvQkFDWixNQUFNO29CQUNOLGlCQUFpQjtvQkFDakIsSUFBSTtvQkFDSixNQUFNO29CQUNOLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsa0JBQWtCOzs7Z0JBR3RCLE9BQU87b0JBQ0gsY0FBYztvQkFDZCxjQUFjO29CQUNkLG9CQUFvQjtvQkFDcEIsY0FBYzs7Ozs7R0FhbkIiLCJmaWxlIjoiY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0VudGl0bGVtZW50VGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IGVudGl0bGVtZW50TW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9JZGVudGl0eUVudGl0bGVtZW50TW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoZW50aXRsZW1lbnRNb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgdGhlIGVudGl0bGVtZW50IHRlc3RzLiAgRG9uJ3QgbW9kaWZ5IHRoaXMgZGF0YVxuICogZGlyZWN0bHkgZnJvbSB3aXRoaW4geW91ciB0ZXN0cy4gIElmIHlvdSBuZWVkIHRvIG1vZGlmeSBkYXRhLCB1c2UgYW5ndWxhci5jb3B5KCkgdG8gY3JlYXRlIHlvdXIgb3duXG4gKiBjb3B5IGJlZm9yZSBjaGFuZ2luZyBpdC5cbiAqL1xuZmFjdG9yeSgnZW50aXRsZW1lbnRUZXN0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IEVOVElUTEVNRU5UMSA9IHtcbiAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgYXBwbGljYXRpb246ICdFbnRpdGxlbWVudCBBcHAnLFxuICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlMScsXG4gICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnZWFjY291bnQnLFxuICAgICAgICBhY2NvdW50TmFtZTogJ0VudGl0bGVtZW50IEFjY291bnQnLFxuICAgICAgICBwZXJtaXNzaW9uOiB0cnVlLFxuICAgICAgICBhbm5vdGF0aW9uOiAnSSBsaWtlIHRvIGFubm90YXRlIHRoaW5ncy4uLicsXG4gICAgICAgIGF0dHJpYnV0ZTogJ1VTRVJfREInLFxuICAgICAgICB2YWx1ZTogJ0RFTEVURScsXG4gICAgICAgIGRpc3BsYXlWYWx1ZTogJ1VzZXIgRGF0YWJhc2UnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0RlbGV0ZSBzdHVmZiBvbiB0aGUgdXNlciBkYXRhYmFzZScsXG4gICAgICAgIG5hbWU6ICdTb21lIG5hbWUnLFxuICAgICAgICBhZ2dyZWdhdGlvblN0YXRlOiAnc3RhdGVpYmUnLFxuICAgICAgICBncm91cDogdHJ1ZSxcbiAgICAgICAgZW5kRGF0ZTogMTQ3NTEyNTIwMDAwMCxcbiAgICAgICAgc3RhcnREYXRlOiAxNDc1MTI1MjAwMDAwLFxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlSWQ6ICdtYW5hZ2VkYXR0cjEnLFxuICAgICAgICBoYXNQZW5kaW5nUmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgcGVuZGluZ1JlcXVlc3RJZDogJzAwMDAxMjM4OSdcbiAgICB9O1xuXG4gICAgY29uc3QgRU5USVRMRU1FTlQyID0ge1xuICAgICAgICBpZDogJzQ1NjcnLFxuICAgICAgICBhcHBsaWNhdGlvbjogJ0VudGl0bGVtZW50IEFwcDInLFxuICAgICAgICBpbnN0YW5jZTogJ2luc3RhbmNlMicsXG4gICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnZWFjY291bnQyJyxcbiAgICAgICAgYWNjb3VudE5hbWU6ICdFbnRpdGxlbWVudCBBY2NvdW50MicsXG4gICAgICAgIHBlcm1pc3Npb246IGZhbHNlLFxuICAgICAgICBhdHRyaWJ1dGU6ICdtZW1iZXJPZicsXG4gICAgICAgIHZhbHVlOiAnUGFydHkgUGVvcGxlIC4uLiBZQVMhISEnLFxuICAgICAgICBkaXNwbGF5VmFsdWU6ICdQYXJ0YXkhJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdHZXQgdXAgd2l0aCB0aGUgZ2V0IGRvd24nXG4gICAgfTtcblxuICAgIGNvbnN0IENFUlRJRklDQVRJT05JVEVNMSA9IHtcbiAgICAgICAgYXR0cmlidXRlczogbnVsbCxcbiAgICAgICAgY2VydGlmaWNhdGlvbkZpbmlzaERhdGU6IDE0NzQ1Njc2NDY3MDYsXG4gICAgICAgIGNlcnRpZmljYXRpb25HcmFudWxhcml0eTogJ1ZhbHVlJyxcbiAgICAgICAgY2VydGlmaWNhdGlvbk1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZTogMTQ3NDU2NzY0NjcwNixcbiAgICAgICAgY2VydGlmaWNhdGlvbk5hbWU6ICdNYW5hZ2VyIEFjY2VzcyBSZXZpZXcgZm9yIE1hcnkgSm9obnNvbicsXG4gICAgICAgIGNlcnRpZmljYXRpb25TdGFydERhdGU6IDE0NzQ1Njc2NDY3MDYsXG4gICAgICAgIGNlcnRpZmllcjogJ01hcnkgSm9obnNvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICBkaXNwbGF5TmFtZTogJ0luZm9ybWF0aW9uIFNlY3VyaXR5IEFuYWx5c3QnLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgbG9jYWxpemVkQWN0aW9uU3RhdHVzOiAnQXBwcm92ZWQnLFxuICAgICAgICBzdWJUeXBlOiAnQXNzaWduZWRSb2xlJyxcbiAgICAgICAgdHlwZTogJ0J1bmRsZSdcbiAgICB9O1xuXG4gICAgY29uc3QgUkVRVUVTVElURU0xID0ge1xuICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICBkYXRlOiAxNDc0NTY4NzAwNDAyLFxuICAgICAgICBleGVjdXRpb25TdGF0dXM6ICdFeGVjdXRpbmcnLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgbmFtZTogJ2dyb3VwbWJyJyxcbiAgICAgICAgb3BlcmF0aW9uOiAnQWRkJyxcbiAgICAgICAgcmVxdWVzdGVyOiAnSmFtZXMgU21pdGgnLFxuICAgICAgICBzb3VyY2U6ICdMQ00nLFxuICAgICAgICByZXF1ZXN0SWQ6ICcwMDAwMDAwMDEnLFxuICAgICAgICB0cmltbWVkUmVxdWVzdElkOiAnMSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgRU5USVRMRU1FTlQxOiBFTlRJVExFTUVOVDEsXG4gICAgICAgIEVOVElUTEVNRU5UMjogRU5USVRMRU1FTlQyLFxuICAgICAgICBDRVJUSUZJQ0FUSU9OSVRFTTE6IENFUlRJRklDQVRJT05JVEVNMSxcbiAgICAgICAgUkVRVUVTVElURU0xOiBSRVFVRVNUSVRFTTFcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
