System.register(['common/form/FormAppModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var formAppModule;
    return {
        setters: [function (_commonFormFormAppModule) {
            formAppModule = _commonFormFormAppModule['default'];
        }],
        execute: function () {

            angular.module(formAppModule).

            /**
             * This contains test data used by form preview directive test cases.
             */

            factory('formPreviewTestData', function () {
                'ngInject';
                return {
                    PREVIEW_FORM_JSON: {
                        name: 'Workflow Form',
                        description: 'Description about form',
                        sections: [{
                            name: 'Identity details',
                            fields: [{
                                type: 'string',
                                name: 'Identity name'
                            }]
                        }],
                        buttons: [{
                            name: 'next',
                            action: 'next',
                            type: 'button'
                        }]
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0Zvcm1QcmV2aWV3VGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsOEJBQThCLFVBQVUsU0FBUzs7O0lBRzlEOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsMEJBQTBCO1lBQzFDLGdCQUFnQix5QkFBeUI7O1FBRTdDLFNBQVMsWUFBWTs7WUFON0IsUUFBUSxPQUFPOzs7Ozs7WUFNZixRQUFRLHVCQUF1QixZQUFXO2dCQUN0QztnQkFDQSxPQUFPO29CQUNILG1CQUFvQjt3QkFDaEIsTUFBTTt3QkFDTixhQUFhO3dCQUNiLFVBQVUsQ0FBQzs0QkFDSCxNQUFNOzRCQUNOLFFBQVEsQ0FBQztnQ0FDRCxNQUFNO2dDQUNOLE1BQU07Ozt3QkFLdEIsU0FBUyxDQUFDOzRCQUNGLE1BQU07NEJBQ04sUUFBUTs0QkFDUixNQUFNOzs7Ozs7O0dBYXZCIiwiZmlsZSI6ImNvbW1vbi9mb3JtL0Zvcm1QcmV2aWV3VGVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IGZvcm1BcHBNb2R1bGUgZnJvbSAnY29tbW9uL2Zvcm0vRm9ybUFwcE1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKGZvcm1BcHBNb2R1bGUpLlxuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgdGVzdCBkYXRhIHVzZWQgYnkgZm9ybSBwcmV2aWV3IGRpcmVjdGl2ZSB0ZXN0IGNhc2VzLlxuICovXG5cbmZhY3RvcnkoJ2Zvcm1QcmV2aWV3VGVzdERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAnbmdJbmplY3QnO1xuICAgIHJldHVybiB7XG4gICAgICAgIFBSRVZJRVdfRk9STV9KU09OIDoge1xuICAgICAgICAgICAgbmFtZTogJ1dvcmtmbG93IEZvcm0nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXNjcmlwdGlvbiBhYm91dCBmb3JtJyxcbiAgICAgICAgICAgIHNlY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnSWRlbnRpdHkgZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnSWRlbnRpdHkgbmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBidXR0b25zOiBbe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnbmV4dCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ25leHQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH07XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
