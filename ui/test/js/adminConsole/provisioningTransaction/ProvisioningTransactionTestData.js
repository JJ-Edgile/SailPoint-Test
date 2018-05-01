System.register(['adminConsole/provisioningTransaction/ProvisioningTransactionModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */
    'use strict';

    var provisioningTransactionModule;
    return {
        setters: [function (_adminConsoleProvisioningTransactionProvisioningTransactionModule) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModule['default'];
        }],
        execute: function () {

            angular.module(provisioningTransactionModule).

            /**
             * This contains test data used by the identity tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('provisioningTransactionTestData', function () {
                return {
                    PTO1: {
                        id: '1',
                        name: '1',
                        created: '2/12/16',
                        integration: 'IdentityIQ',
                        operation: 'Create',
                        source: 'LCM',
                        status: 'Success',
                        identityName: 'spadmin',
                        applicationName: 'testApp',
                        type: 'Auto',
                        accountDisplayName: 'Administrator',
                        nativeIdentity: 'spadmin'
                    },
                    PTO2: {
                        id: '2',
                        name: '2',
                        created: '2/10/16',
                        integration: 'IdentityIQ',
                        operation: 'Modify',
                        source: 'Rule',
                        status: 'Success',
                        identityName: 'spadmin',
                        applicationName: 'testApp',
                        type: 'Auto',
                        accountDisplayName: 'Administrator',
                        nativeIdentity: 'spadmin'
                    },
                    PTO3: {
                        id: '3',
                        name: '3',
                        created: '2/13/16',
                        integration: 'IdentityIQ',
                        operation: 'Delete',
                        source: 'Batch',
                        status: 'Success',
                        identityName: 'spadmin',
                        applicationName: 'testApp',
                        type: 'Auto',
                        accountDisplayName: 'Administrator',
                        nativeIdentity: 'spadmin'
                    },
                    PTO4: {
                        id: '4',
                        name: '4',
                        created: '1/12/16',
                        integration: 'IdentityIQ',
                        operation: 'Create',
                        source: 'LCM',
                        status: 'Success',
                        identityName: 'spadmin',
                        applicationName: 'testApp',
                        type: 'Auto',
                        accountDisplayName: 'Administrator',
                        nativeIdentity: 'spadmin'
                    },
                    STATUSCOUNTS: {
                        Total: 4,
                        Failed: 0,
                        Success: 4,
                        Pending: 0
                    },
                    TESTTASKRESULTID: '4028b88153529d51015353a1345b005c'
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHVFQUF1RSxVQUFVLFNBQVM7Ozs7SUFJdkc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtRUFBbUU7WUFDbkYsZ0NBQWdDLGtFQUFrRTs7UUFFdEcsU0FBUyxZQUFZOztZQU43QixRQUFRLE9BQU87Ozs7Ozs7WUFPWCxRQUFRLG1DQUFtQyxZQUFXO2dCQUNsRCxPQUFPO29CQUNILE1BQU07d0JBQ0YsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsTUFBTTt3QkFDTixvQkFBb0I7d0JBQ3BCLGdCQUFnQjs7b0JBRXBCLE1BQU07d0JBQ0YsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsTUFBTTt3QkFDTixvQkFBb0I7d0JBQ3BCLGdCQUFnQjs7b0JBRXBCLE1BQU07d0JBQ0YsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsTUFBTTt3QkFDTixvQkFBb0I7d0JBQ3BCLGdCQUFnQjs7b0JBRXBCLE1BQU07d0JBQ0YsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFNBQVM7d0JBQ1QsYUFBYTt3QkFDYixXQUFXO3dCQUNYLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsTUFBTTt3QkFDTixvQkFBb0I7d0JBQ3BCLGdCQUFnQjs7b0JBRXBCLGNBQWM7d0JBQ1YsT0FBTzt3QkFDUCxRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsU0FBUzs7b0JBRWIsa0JBQWtCOzs7OztHQWEzQiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25UZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuaW1wb3J0IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlKS5cblxuLyoqXG4gKiBUaGlzIGNvbnRhaW5zIHRlc3QgZGF0YSB1c2VkIGJ5IHRoZSBpZGVudGl0eSB0ZXN0cy4gIERvbid0IG1vZGlmeSB0aGlzIGRhdGFcbiAqIGRpcmVjdGx5IGZyb20gd2l0aGluIHlvdXIgdGVzdHMuICBJZiB5b3UgbmVlZCB0byBtb2RpZnkgZGF0YSwgdXNlIGFuZ3VsYXIuY29weSgpIHRvIGNyZWF0ZSB5b3VyIG93blxuICogY29weSBiZWZvcmUgY2hhbmdpbmcgaXQuXG4gKi9cbiAgICBmYWN0b3J5KCdwcm92aXNpb25pbmdUcmFuc2FjdGlvblRlc3REYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBQVE8xOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnMScsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogJzIvMTIvMTYnLFxuICAgICAgICAgICAgICAgIGludGVncmF0aW9uOiAnSWRlbnRpdHlJUScsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnQ3JlYXRlJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICdMQ00nLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIGlkZW50aXR5TmFtZTogJ3NwYWRtaW4nLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ3Rlc3RBcHAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdBdXRvJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50RGlzcGxheU5hbWU6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3NwYWRtaW4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUFRPMjoge1xuICAgICAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICAgICAgbmFtZTogJzInLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6ICcyLzEwLzE2JyxcbiAgICAgICAgICAgICAgICBpbnRlZ3JhdGlvbjogJ0lkZW50aXR5SVEnLFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ01vZGlmeScsXG4gICAgICAgICAgICAgICAgc291cmNlOiAnUnVsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlOYW1lOiAnc3BhZG1pbicsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAndGVzdEFwcCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0F1dG8nLFxuICAgICAgICAgICAgICAgIGFjY291bnREaXNwbGF5TmFtZTogJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnc3BhZG1pbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBQVE8zOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICczJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnMycsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogJzIvMTMvMTYnLFxuICAgICAgICAgICAgICAgIGludGVncmF0aW9uOiAnSWRlbnRpdHlJUScsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnRGVsZXRlJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICdCYXRjaCcsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgaWRlbnRpdHlOYW1lOiAnc3BhZG1pbicsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAndGVzdEFwcCcsXG4gICAgICAgICAgICAgICAgdHlwZTogJ0F1dG8nLFxuICAgICAgICAgICAgICAgIGFjY291bnREaXNwbGF5TmFtZTogJ0FkbWluaXN0cmF0b3InLFxuICAgICAgICAgICAgICAgIG5hdGl2ZUlkZW50aXR5OiAnc3BhZG1pbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBQVE80OiB7XG4gICAgICAgICAgICAgICAgaWQ6ICc0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnNCcsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogJzEvMTIvMTYnLFxuICAgICAgICAgICAgICAgIGludGVncmF0aW9uOiAnSWRlbnRpdHlJUScsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnQ3JlYXRlJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICdMQ00nLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIGlkZW50aXR5TmFtZTogJ3NwYWRtaW4nLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ3Rlc3RBcHAnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdBdXRvJyxcbiAgICAgICAgICAgICAgICBhY2NvdW50RGlzcGxheU5hbWU6ICdBZG1pbmlzdHJhdG9yJyxcbiAgICAgICAgICAgICAgICBuYXRpdmVJZGVudGl0eTogJ3NwYWRtaW4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgU1RBVFVTQ09VTlRTOiB7XG4gICAgICAgICAgICAgICAgVG90YWw6IDQsXG4gICAgICAgICAgICAgICAgRmFpbGVkOiAwLFxuICAgICAgICAgICAgICAgIFN1Y2Nlc3M6IDQsXG4gICAgICAgICAgICAgICAgUGVuZGluZzogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRFU1RUQVNLUkVTVUxUSUQ6ICc0MDI4Yjg4MTUzNTI5ZDUxMDE1MzUzYTEzNDViMDA1YydcbiAgICAgICAgfTtcbiAgICB9KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
