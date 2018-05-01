System.register(['alert/AlertModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var alertModule;
    return {
        setters: [function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }],
        execute: function () {

            angular.module(alertModule).factory('alertDefinitionTestData', function () {
                return {
                    ALERTDEF1: {
                        id: '1',
                        name: 'Name1',
                        displayName: 'Display Name 1',
                        owner: {
                            name: 'Jason Witten',
                            displayName: 'Jason Witten',
                            id: '82'
                        },
                        actionType: 'CERTIFICATION',
                        created: '1471019636453',
                        matchConfig: {
                            rule: {
                                name: 'MatchRule',
                                displayName: 'MatchRule',
                                id: '1'
                            },
                            matchExpression: {
                                and: true,
                                matchTerms: [{
                                    source: 'Source1',
                                    name: 'Name1',
                                    value: 'Value1'
                                }, {
                                    source: 'Source2',
                                    name: 'Name2',
                                    value: 'Value2'
                                }]
                            }
                        },
                        actionConfig: {
                            actionType: {
                                name: 'WORKFLOW',
                                displayName: 'Workflow'
                            },
                            workflow: {
                                name: 'SelectedWorkflow',
                                displayName: 'Pickens Me',
                                id: '1'
                            },
                            emailTemplate: {
                                name: 'IAmEmail',
                                displayName: 'I am the Email'
                            },
                            emailRecipients: [{
                                name: 'Recip1',
                                displayName: 'Recipient One',
                                id: '1'
                            }, {
                                name: 'Recip2',
                                displayName: 'Recipient Two',
                                id: '2'
                            }]
                        }
                    },
                    ALERTDEF2: {
                        id: '2',
                        name: 'Name2',
                        displayName: 'Display Name 2',
                        owner: {
                            name: 'Dez Bryant',
                            displayName: 'Dez Bryant',
                            id: '88'
                        },
                        actionType: 'WORKFLOW',
                        created: '1471019636454'
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvblRlc3REYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHNCQUFzQixVQUFVLFNBQVM7Ozs7O0lBS3REOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsbUJBQW1CO1lBQ25DLGNBQWMsa0JBQWtCOztRQUVwQyxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTyxhQUFhLFFBQVEsMkJBQTJCLFlBQVc7Z0JBQ3RFLE9BQU87b0JBQ0gsV0FBWTt3QkFDUixJQUFJO3dCQUNKLE1BQU07d0JBQ04sYUFBYTt3QkFDYixPQUFPOzRCQUNILE1BQU07NEJBQ04sYUFBYTs0QkFDYixJQUFJOzt3QkFFUixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsYUFBYTs0QkFDVCxNQUFNO2dDQUNGLE1BQU07Z0NBQ04sYUFBYTtnQ0FDYixJQUFJOzs0QkFFUixpQkFBaUI7Z0NBQ2IsS0FBSztnQ0FDTCxZQUFZLENBQ1I7b0NBQ0ksUUFBUTtvQ0FDUixNQUFNO29DQUNOLE9BQU87bUNBRVg7b0NBQ0ksUUFBUTtvQ0FDUixNQUFNO29DQUNOLE9BQU87Ozs7d0JBS3ZCLGNBQWM7NEJBQ1YsWUFBWTtnQ0FDUixNQUFNO2dDQUNOLGFBQWE7OzRCQUVqQixVQUFVO2dDQUNOLE1BQU07Z0NBQ04sYUFBYTtnQ0FDYixJQUFJOzs0QkFFUixlQUFlO2dDQUNYLE1BQU07Z0NBQ04sYUFBYTs7NEJBRWpCLGlCQUFpQixDQUNiO2dDQUNJLE1BQU07Z0NBQ04sYUFBYTtnQ0FDYixJQUFJOytCQUVSO2dDQUNJLE1BQU07Z0NBQ04sYUFBYTtnQ0FDYixJQUFJOzs7O29CQUtwQixXQUFZO3dCQUNSLElBQUk7d0JBQ0osTUFBTTt3QkFDTixhQUFhO3dCQUNiLE9BQU87NEJBQ0gsTUFBTTs0QkFDTixhQUFhOzRCQUNiLElBQUk7O3dCQUVSLFlBQVk7d0JBQ1osU0FBUzs7Ozs7O0dBUWxCIiwiZmlsZSI6ImFsZXJ0L0FsZXJ0RGVmaW5pdGlvblRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgYWxlcnRNb2R1bGUgZnJvbSAnYWxlcnQvQWxlcnRNb2R1bGUnO1xuXG5hbmd1bGFyLm1vZHVsZShhbGVydE1vZHVsZSkuZmFjdG9yeSgnYWxlcnREZWZpbml0aW9uVGVzdERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBBTEVSVERFRjEgOiB7XG4gICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgbmFtZTogJ05hbWUxJyxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGlzcGxheSBOYW1lIDEnLFxuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnSmFzb24gV2l0dGVuJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0phc29uIFdpdHRlbicsXG4gICAgICAgICAgICAgICAgaWQ6ICc4MidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3Rpb25UeXBlOiAnQ0VSVElGSUNBVElPTicsXG4gICAgICAgICAgICBjcmVhdGVkOiAnMTQ3MTAxOTYzNjQ1MycsXG4gICAgICAgICAgICBtYXRjaENvbmZpZzoge1xuICAgICAgICAgICAgICAgIHJ1bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ01hdGNoUnVsZScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTWF0Y2hSdWxlJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWF0Y2hFeHByZXNzaW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGFuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hUZXJtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogJ1NvdXJjZTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdWYWx1ZTEnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogJ1NvdXJjZTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdWYWx1ZTInXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aW9uQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uVHlwZToge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnV09SS0ZMT1cnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1dvcmtmbG93J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd29ya2Zsb3c6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NlbGVjdGVkV29ya2Zsb3cnLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1BpY2tlbnMgTWUnLFxuICAgICAgICAgICAgICAgICAgICBpZDogJzEnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbWFpbFRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdJQW1FbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSSBhbSB0aGUgRW1haWwnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbWFpbFJlY2lwaWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1JlY2lwMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1JlY2lwaWVudCBPbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUmVjaXAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnUmVjaXBpZW50IFR3bycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIEFMRVJUREVGMiA6IHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBuYW1lOiAnTmFtZTInLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEaXNwbGF5IE5hbWUgMicsXG4gICAgICAgICAgICBvd25lcjoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdEZXogQnJ5YW50JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0RleiBCcnlhbnQnLFxuICAgICAgICAgICAgICAgIGlkOiAnODgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aW9uVHlwZTogJ1dPUktGTE9XJyxcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcxNDcxMDE5NjM2NDU0J1xuICAgICAgICB9XG4gICAgfTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
