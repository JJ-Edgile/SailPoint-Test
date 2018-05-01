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

            angular.module(alertModule).factory('alertTestData', function () {
                return {
                    ALERT1: {
                        id: '1',
                        name: 'Name1',
                        source: 'Source1',
                        alertDate: '01/01/2011',
                        targetId: '1111',
                        targetType: 'Identity',
                        targetDisplayName: 'Mickey Mouse',
                        lastProcessed: '02/26/2016',
                        displayName: 'Alert1',
                        type: 'alert',
                        created: '01/01/2016',
                        alertAttributes: [{
                            description: null,
                            displayName: 'app',
                            extendedAttribute: true,
                            foundInSchema: true,
                            name: 'app',
                            value: 'Active_Directory'
                        }, {
                            description: null,
                            displayName: 'severity',
                            extendedAttribute: false,
                            foundInSchema: true,
                            name: 'severity',
                            value: 'low'
                        }, {
                            description: null,
                            displayName: 'Not Shown',
                            extendedAttribute: false,
                            foundInSchema: false,
                            name: 'notshown',
                            value: 'value'
                        }],
                        actions: [{
                            id: '1',
                            created: '04/01/2016',
                            actionType: 'WORKFLOW',
                            actionTypeDisplay: 'Workflow',
                            canViewTaskResult: true,
                            definitionName: 'Alert Def',
                            result: {
                                resultId: '1234',
                                resultName: 'I am the Result',
                                workflowName: 'I am the Workflow',
                                notification: [{
                                    displayName: 'I was Notified',
                                    name: 'notifiedPerson',
                                    emails: ['email1@ex.com', 'email2@ex.com']
                                }]
                            }
                        }]
                    },
                    ALERT2: {
                        id: '2',
                        name: 'Name2',
                        source: 'Source2',
                        alertDate: '02/02/2000',
                        targetId: '2222',
                        targetType: 'Identity',
                        targetDisplayName: 'Minnie Mouse',
                        lastProcessed: '02/26/2016',
                        displayName: 'Alert2',
                        type: 'alert',
                        created: '1471019636453'
                    },
                    ALERT3: {
                        id: '3',
                        name: 'Name3',
                        source: 'Source3',
                        alertDate: '03/03/2003',
                        targetId: '3333',
                        targetType: 'Identity',
                        targetDisplayName: 'Donald Duck',
                        lastProcessed: '02/26/2016',
                        displayName: 'Alert3',
                        type: 'alert',
                        created: '1471019636453'
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0VGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsc0JBQXNCLFVBQVUsU0FBUzs7Ozs7SUFLdEQ7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQkFBbUI7WUFDbkMsY0FBYyxrQkFBa0I7O1FBRXBDLFNBQVMsWUFBWTs7WUFON0IsUUFBUSxPQUFPLGFBRVgsUUFBUSxpQkFBaUIsWUFBVztnQkFDaEMsT0FBTztvQkFDSCxRQUFTO3dCQUNMLElBQUk7d0JBQ0osTUFBTTt3QkFDTixRQUFRO3dCQUNSLFdBQVc7d0JBQ1gsVUFBVTt3QkFDVixZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixhQUFhO3dCQUNiLE1BQU07d0JBQ04sU0FBUzt3QkFDVCxpQkFBaUIsQ0FDYjs0QkFDSSxhQUFhOzRCQUNiLGFBQWE7NEJBQ2IsbUJBQW1COzRCQUNuQixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzsyQkFFWDs0QkFDSSxhQUFhOzRCQUNiLGFBQWE7NEJBQ2IsbUJBQW1COzRCQUNuQixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzsyQkFFWDs0QkFDSSxhQUFhOzRCQUNiLGFBQWE7NEJBQ2IsbUJBQW1COzRCQUNuQixlQUFlOzRCQUNmLE1BQU07NEJBQ04sT0FBTzs7d0JBR2YsU0FBUyxDQUNMOzRCQUNJLElBQUk7NEJBQ0osU0FBUzs0QkFDVCxZQUFZOzRCQUNaLG1CQUFtQjs0QkFDbkIsbUJBQW1COzRCQUNuQixnQkFBZ0I7NEJBQ2hCLFFBQVE7Z0NBQ0osVUFBVTtnQ0FDVixZQUFZO2dDQUNaLGNBQWM7Z0NBQ2QsY0FBYyxDQUNWO29DQUNJLGFBQWE7b0NBQ2IsTUFBTTtvQ0FDTixRQUFRLENBQUMsaUJBQWlCOzs7OztvQkFPbEQsUUFBUzt3QkFDTCxJQUFJO3dCQUNKLE1BQU07d0JBQ04sUUFBUTt3QkFDUixXQUFXO3dCQUNYLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixNQUFNO3dCQUNOLFNBQVM7O29CQUViLFFBQVM7d0JBQ0wsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFFBQVE7d0JBQ1IsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsTUFBTTt3QkFDTixTQUFTOzs7Ozs7R0FJdEIiLCJmaWxlIjoiYWxlcnQvQWxlcnRUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0IGFsZXJ0TW9kdWxlIGZyb20gJ2FsZXJ0L0FsZXJ0TW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUoYWxlcnRNb2R1bGUpLlxuXG4gICAgZmFjdG9yeSgnYWxlcnRUZXN0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgQUxFUlQxIDoge1xuICAgICAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUxJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICdTb3VyY2UxJyxcbiAgICAgICAgICAgICAgICBhbGVydERhdGU6ICcwMS8wMS8yMDExJyxcbiAgICAgICAgICAgICAgICB0YXJnZXRJZDogJzExMTEnLFxuICAgICAgICAgICAgICAgIHRhcmdldFR5cGU6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWU6ICdNaWNrZXkgTW91c2UnLFxuICAgICAgICAgICAgICAgIGxhc3RQcm9jZXNzZWQ6ICcwMi8yNi8yMDE2JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FsZXJ0MScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2FsZXJ0JyxcbiAgICAgICAgICAgICAgICBjcmVhdGVkOiAnMDEvMDEvMjAxNicsXG4gICAgICAgICAgICAgICAgYWxlcnRBdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdhcHAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWRBdHRyaWJ1dGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEluU2NoZW1hOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FjdGl2ZV9EaXJlY3RvcnknXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdzZXZlcml0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmRlZEF0dHJpYnV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEluU2NoZW1hOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NldmVyaXR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbG93J1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTm90IFNob3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkQXR0cmlidXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSW5TY2hlbWE6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vdHNob3duJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndmFsdWUnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6ICcwNC8wMS8yMDE2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblR5cGU6ICdXT1JLRkxPVycsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25UeXBlRGlzcGxheTogJ1dvcmtmbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblZpZXdUYXNrUmVzdWx0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbk5hbWU6ICdBbGVydCBEZWYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0SWQ6ICcxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHROYW1lOiAnSSBhbSB0aGUgUmVzdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd05hbWU6ICdJIGFtIHRoZSBXb3JrZmxvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnSSB3YXMgTm90aWZpZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ25vdGlmaWVkUGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsczogWydlbWFpbDFAZXguY29tJywgJ2VtYWlsMkBleC5jb20nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEFMRVJUMiA6IHtcbiAgICAgICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdOYW1lMicsXG4gICAgICAgICAgICAgICAgc291cmNlOiAnU291cmNlMicsXG4gICAgICAgICAgICAgICAgYWxlcnREYXRlOiAnMDIvMDIvMjAwMCcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQ6ICcyMjIyJyxcbiAgICAgICAgICAgICAgICB0YXJnZXRUeXBlOiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiAnTWlubmllIE1vdXNlJyxcbiAgICAgICAgICAgICAgICBsYXN0UHJvY2Vzc2VkOiAnMDIvMjYvMjAxNicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdBbGVydDInLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdhbGVydCcsXG4gICAgICAgICAgICAgICAgY3JlYXRlZDogJzE0NzEwMTk2MzY0NTMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQUxFUlQzIDoge1xuICAgICAgICAgICAgICAgIGlkOiAnMycsXG4gICAgICAgICAgICAgICAgbmFtZTogJ05hbWUzJyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICdTb3VyY2UzJyxcbiAgICAgICAgICAgICAgICBhbGVydERhdGU6ICcwMy8wMy8yMDAzJyxcbiAgICAgICAgICAgICAgICB0YXJnZXRJZDogJzMzMzMnLFxuICAgICAgICAgICAgICAgIHRhcmdldFR5cGU6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWU6ICdEb25hbGQgRHVjaycsXG4gICAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZDogJzAyLzI2LzIwMTYnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQWxlcnQzJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYWxlcnQnLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWQ6ICcxNDcxMDE5NjM2NDUzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
