System.register(['systemSetup/oAuth/OAuthConfigurationModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */
    'use strict';

    var oAuthConfigurationModule;
    return {
        setters: [function (_systemSetupOAuthOAuthConfigurationModule) {
            oAuthConfigurationModule = _systemSetupOAuthOAuthConfigurationModule['default'];
        }],
        execute: function () {

            angular.module(oAuthConfigurationModule).

            /**
             * This contains test data used by the oauth tests.  Don't modify this data
             * directly from within your tests.  If you need to modify data, use angular.copy() to create your own
             * copy before changing it.
             */
            factory('oAuthConfigurationTestData', function () {
                return {
                    accessTokenExpiresInSeconds: 12000
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL09BdXRoQ29uZmlndXJhdGlvblRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLCtDQUErQyxVQUFVLFNBQVM7Ozs7SUFJL0U7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSwyQ0FBMkM7WUFDM0QsMkJBQTJCLDBDQUEwQzs7UUFFekUsU0FBUyxZQUFZOztZQU43QixRQUFRLE9BQU87Ozs7Ozs7WUFPWCxRQUFRLDhCQUE4QixZQUFXO2dCQUM3QyxPQUFPO29CQUNILDZCQUE2Qjs7Ozs7R0FhdEMiLCJmaWxlIjoic3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDb25maWd1cmF0aW9uVGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCBvQXV0aENvbmZpZ3VyYXRpb25Nb2R1bGUgZnJvbSAnc3lzdGVtU2V0dXAvb0F1dGgvT0F1dGhDb25maWd1cmF0aW9uTW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUob0F1dGhDb25maWd1cmF0aW9uTW9kdWxlKS5cblxuLyoqXG4gKiBUaGlzIGNvbnRhaW5zIHRlc3QgZGF0YSB1c2VkIGJ5IHRoZSBvYXV0aCB0ZXN0cy4gIERvbid0IG1vZGlmeSB0aGlzIGRhdGFcbiAqIGRpcmVjdGx5IGZyb20gd2l0aGluIHlvdXIgdGVzdHMuICBJZiB5b3UgbmVlZCB0byBtb2RpZnkgZGF0YSwgdXNlIGFuZ3VsYXIuY29weSgpIHRvIGNyZWF0ZSB5b3VyIG93blxuICogY29weSBiZWZvcmUgY2hhbmdpbmcgaXQuXG4gKi9cbiAgICBmYWN0b3J5KCdvQXV0aENvbmZpZ3VyYXRpb25UZXN0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzVG9rZW5FeHBpcmVzSW5TZWNvbmRzOiAxMjAwMFxuICAgICAgICB9O1xuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
