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
             * This contains test data used by the identity tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('identityTestData', function () {
                return {
                    IDENTITY1: {
                        id: '1',
                        name: 'jbob',
                        displayName: 'Jay Bob',
                        managerName: 'Joe Bob',
                        location: 'Austin',
                        department: 'Agriculture'
                    },

                    IDENTITY2: {
                        id: '2',
                        name: 'kbob',
                        displayName: 'Kay Bob',
                        managerName: 'Jim Bob',
                        location: 'Austin',
                        department: 'Agriculture'
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5VGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUk1RDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHlCQUF5QjtZQUN6QyxpQkFBaUIsd0JBQXdCOztRQUU3QyxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTzs7Ozs7OztZQU9YLFFBQVEsb0JBQW9CLFlBQVc7Z0JBQ25DLE9BQU87b0JBQ0gsV0FBVzt3QkFDUCxJQUFJO3dCQUNKLE1BQU07d0JBQ04sYUFBYTt3QkFDYixhQUFhO3dCQUNiLFVBQVU7d0JBQ1YsWUFBWTs7O29CQUdoQixXQUFXO3dCQUNQLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLGFBQWE7d0JBQ2IsVUFBVTt3QkFDVixZQUFZOzs7Ozs7R0FjekIiLCJmaWxlIjoiaWRlbnRpdHkvSWRlbnRpdHlUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoaWRlbnRpdHlNb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgdGhlIGlkZW50aXR5IHRlc3RzLiAgRG9uJ3QgbW9kaWZ5IHRoaXMgZGF0YVxuICogZGlyZWN0bHkgZnJvbSB3aXRoaW4geW91ciB0ZXN0cy4gIElmIHlvdSBuZWVkIHRvIG1vZGlmeSBkYXRhLCB1c2UgYW5ndWxhci5jb3B5KCkgdG8gY3JlYXRlIHlvdXIgb3duXG4gKiBjb3B5IGJlZm9yZSBjaGFuZ2luZyBpdC5cbiAqL1xuICAgIGZhY3RvcnkoJ2lkZW50aXR5VGVzdERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIElERU5USVRZMToge1xuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2pib2InLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSmF5IEJvYicsXG4gICAgICAgICAgICAgICAgbWFuYWdlck5hbWU6ICdKb2UgQm9iJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0F1c3RpbicsXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudDogJ0FncmljdWx0dXJlJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgSURFTlRJVFkyOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcyJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAna2JvYicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdLYXkgQm9iJyxcbiAgICAgICAgICAgICAgICBtYW5hZ2VyTmFtZTogJ0ppbSBCb2InLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnQXVzdGluJyxcbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiAnQWdyaWN1bHR1cmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
