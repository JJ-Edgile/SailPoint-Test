System.register(['systemSetup/oAuth/OAuthClientConfigModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */
    'use strict';

    var oAuthClientConfigModule;
    return {
        setters: [function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }],
        execute: function () {

            angular.module(oAuthClientConfigModule).

            /**
             * This contains test data used by the oauth tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('oAuthClientTestData', function () {
                var client1 = {
                    createDate: 1461857707681,
                    name: 'Client1',
                    proxyUser: {
                        displayName: 'spadmin',
                        id: '123456',
                        name: 'spadmin'
                    },
                    clientId: '12345678901234567890123456789012',
                    secret: '123456789012'
                },
                    client2 = {
                    createDate: 1461857707681,
                    name: 'Client2',
                    proxyUser: {
                        displayName: 'spadmin',
                        id: '123456',
                        name: 'spadmin'
                    },
                    clientId: '98765432101234567890123456789012',
                    secret: '987654321012'
                };
                return {
                    CLIENT1: client1,
                    CLIENT2: client2,
                    RESPONSE: {
                        data: {
                            objects: [client1, client2],
                            count: 2
                        }
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50VGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsOENBQThDLFVBQVUsU0FBUzs7OztJQUk5RTs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLDBDQUEwQztZQUMxRCwwQkFBMEIseUNBQXlDOztRQUV2RSxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7OztZQU9YLFFBQVEsdUJBQXVCLFlBQVc7Z0JBQ3RDLElBQUksVUFBVTtvQkFDTixZQUFZO29CQUNaLE1BQU07b0JBQ04sV0FBVzt3QkFDUCxhQUFhO3dCQUNiLElBQUk7d0JBQ0osTUFBTTs7b0JBRVYsVUFBVTtvQkFDVixRQUFROztvQkFFWixVQUFVO29CQUNOLFlBQVk7b0JBQ1osTUFBTTtvQkFDTixXQUFXO3dCQUNQLGFBQWE7d0JBQ2IsSUFBSTt3QkFDSixNQUFNOztvQkFFVixVQUFVO29CQUNWLFFBQVE7O2dCQUVoQixPQUFPO29CQUNILFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxVQUFVO3dCQUNOLE1BQU07NEJBQ0YsU0FBUyxDQUFDLFNBQVM7NEJBQ25CLE9BQU87Ozs7Ozs7R0FleEIiLCJmaWxlIjoic3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDbGllbnRUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuaW1wb3J0IG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlIGZyb20gJ3N5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnTW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUob0F1dGhDbGllbnRDb25maWdNb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgdGhlIG9hdXRoIHRlc3RzLiAgRG9uJ3QgbW9kaWZ5IHRoaXMgZGF0YVxuICogZGlyZWN0bHkgZnJvbSB3aXRoaW4geW91ciB0ZXN0cy4gIElmIHlvdSBuZWVkIHRvIG1vZGlmeSBkYXRhLCB1c2UgYW5ndWxhci5jb3B5KCkgdG8gY3JlYXRlIHlvdXIgb3duXG4gKiBjb3B5IGJlZm9yZSBjaGFuZ2luZyBpdC5cbiAqL1xuICAgIGZhY3RvcnkoJ29BdXRoQ2xpZW50VGVzdERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNsaWVudDEgPSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRGF0ZTogMTQ2MTg1NzcwNzY4MSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnQ2xpZW50MScsXG4gICAgICAgICAgICAgICAgcHJveHlVc2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnc3BhZG1pbicsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzNDU2JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NwYWRtaW4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGllbnRJZDogJzEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyJyxcbiAgICAgICAgICAgICAgICBzZWNyZXQ6ICcxMjM0NTY3ODkwMTInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xpZW50MiA9IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVEYXRlOiAxNDYxODU3NzA3NjgxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdDbGllbnQyJyxcbiAgICAgICAgICAgICAgICBwcm94eVVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdzcGFkbWluJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjM0NTYnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc3BhZG1pbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsaWVudElkOiAnOTg3NjU0MzIxMDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTInLFxuICAgICAgICAgICAgICAgIHNlY3JldDogJzk4NzY1NDMyMTAxMidcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBDTElFTlQxOiBjbGllbnQxLFxuICAgICAgICAgICAgQ0xJRU5UMjogY2xpZW50MixcbiAgICAgICAgICAgIFJFU1BPTlNFOiB7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiBbY2xpZW50MSwgY2xpZW50Ml0sXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
