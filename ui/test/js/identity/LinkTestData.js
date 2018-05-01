System.register(['identity/IdentityModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            angular.module(identityModule).

            /**
             * This contains test data used by the link tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('linkTestData', function () {
                return {
                    LINK1: {
                        id: '1',
                        identityId: '2',
                        applicationName: 'Active Directory of Doom',
                        accountName: 'Slash',
                        status: 'Active',
                        lastRefresh: new Date(),
                        previousAction: 'Delete'
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0xpbmtUZXN0RGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSTVEOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUseUJBQXlCO1lBQ3pDLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFON0IsUUFBUSxPQUFPOzs7Ozs7O1lBT2YsUUFBUSxnQkFBZ0IsWUFBVztnQkFDL0IsT0FBTztvQkFDSCxPQUFPO3dCQUNILElBQUk7d0JBQ0osWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLGFBQWE7d0JBQ2IsUUFBUTt3QkFDUixhQUFhLElBQUk7d0JBQ2pCLGdCQUFnQjs7Ozs7O0dBY3pCIiwiZmlsZSI6ImlkZW50aXR5L0xpbmtUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoaWRlbnRpdHlNb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgdGhlIGxpbmsgdGVzdHMuICBEb24ndCBtb2RpZnkgdGhpcyBkYXRhXG4gKiBkaXJlY3RseSBmcm9tIHdpdGhpbiB5b3VyIHRlc3RzLiAgSWYgeW91IG5lZWQgdG8gbW9kaWZ5IGRhdGEsIHVzZSBhbmd1bGFyLmNvcHkoKSB0byBjcmVhdGUgeW91ciBvd25cbiAqIGNvcHkgYmVmb3JlIGNoYW5naW5nIGl0LlxuICovXG5mYWN0b3J5KCdsaW5rVGVzdERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBMSU5LMToge1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6ICcyJyxcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ0FjdGl2ZSBEaXJlY3Rvcnkgb2YgRG9vbScsXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ1NsYXNoJyxcbiAgICAgICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICAgICAgICBsYXN0UmVmcmVzaDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzQWN0aW9uOiAnRGVsZXRlJ1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
