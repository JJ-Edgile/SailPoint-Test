System.register(['adminConsole/taskManagement/TaskManagementModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var taskManagementModule;
    return {
        setters: [function (_adminConsoleTaskManagementTaskManagementModule) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModule['default'];
        }],
        execute: function () {

            angular.module(taskManagementModule).factory('taskScheduleTestData', function () {
                return {
                    TASKSCHED1: {
                        attributes: null,
                        host: null,
                        id: null,
                        lastExecution: 1500499599637,
                        name: 'Schedule Numero Uno',
                        nextExecution: 1500526800000,
                        resumeDate: null,
                        runLengthAverage: 0
                    },
                    TASKSCHED2: {
                        attributes: null,
                        host: null,
                        id: null,
                        lastExecution: 1500499800000,
                        name: 'Schedule Numero Dos',
                        nextExecution: 1500500100000,
                        resumeDate: null,
                        runLengthAverage: 0
                    },
                    TASKSCHED3: {
                        attributes: null,
                        host: 'ryanHost.sailpoint.com',
                        id: null,
                        lastExecution: 1499726100000,
                        name: 'Schedule Numero Tres',
                        nextExecution: 1502404500000,
                        resumeDate: null,
                        runLengthAverage: 0
                    }
                };
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrU2NoZWR1bGVUZXN0RGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxxREFBcUQsVUFBVSxTQUFTOzs7OztJQUtyRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLGlEQUFpRDtZQUNqRSx1QkFBdUIsZ0RBQWdEOztRQUUzRSxTQUFTLFlBQVk7O1lBTjdCLFFBQVEsT0FBTyxzQkFDWCxRQUFRLHdCQUF3QixZQUFXO2dCQUN2QyxPQUFPO29CQUNILFlBQWE7d0JBQ1QsWUFBWTt3QkFDWixNQUFNO3dCQUNOLElBQUk7d0JBQ0osZUFBZTt3QkFDZixNQUFNO3dCQUNOLGVBQWU7d0JBQ2YsWUFBWTt3QkFDWixrQkFBa0I7O29CQUV0QixZQUFhO3dCQUNULFlBQVk7d0JBQ1osTUFBTTt3QkFDTixJQUFJO3dCQUNKLGVBQWU7d0JBQ2YsTUFBTTt3QkFDTixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osa0JBQWtCOztvQkFFdEIsWUFBYTt3QkFDVCxZQUFZO3dCQUNaLE1BQU07d0JBQ04sSUFBSTt3QkFDSixlQUFlO3dCQUNmLE1BQU07d0JBQ04sZUFBZTt3QkFDZixZQUFZO3dCQUNaLGtCQUFrQjs7Ozs7O0dBYS9CIiwiZmlsZSI6ImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrU2NoZWR1bGVUZXN0RGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0IHRhc2tNYW5hZ2VtZW50TW9kdWxlIGZyb20gJ2FkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudE1vZHVsZSc7XG5cbmFuZ3VsYXIubW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlKS5cbiAgICBmYWN0b3J5KCd0YXNrU2NoZWR1bGVUZXN0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgVEFTS1NDSEVEMSA6IHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIGhvc3Q6IG51bGwsXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGlvbjogMTUwMDQ5OTU5OTYzNyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnU2NoZWR1bGUgTnVtZXJvIFVubycsXG4gICAgICAgICAgICAgICAgbmV4dEV4ZWN1dGlvbjogMTUwMDUyNjgwMDAwMCxcbiAgICAgICAgICAgICAgICByZXN1bWVEYXRlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJ1bkxlbmd0aEF2ZXJhZ2U6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBUQVNLU0NIRUQyIDoge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IG51bGwsXG4gICAgICAgICAgICAgICAgaG9zdDogbnVsbCxcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXN0RXhlY3V0aW9uOiAxNTAwNDk5ODAwMDAwLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdTY2hlZHVsZSBOdW1lcm8gRG9zJyxcbiAgICAgICAgICAgICAgICBuZXh0RXhlY3V0aW9uOiAxNTAwNTAwMTAwMDAwLFxuICAgICAgICAgICAgICAgIHJlc3VtZURhdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgcnVuTGVuZ3RoQXZlcmFnZTogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFRBU0tTQ0hFRDMgOiB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogbnVsbCxcbiAgICAgICAgICAgICAgICBob3N0OiAncnlhbkhvc3Quc2FpbHBvaW50LmNvbScsXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGFzdEV4ZWN1dGlvbjogMTQ5OTcyNjEwMDAwMCxcbiAgICAgICAgICAgICAgICBuYW1lOiAnU2NoZWR1bGUgTnVtZXJvIFRyZXMnLFxuICAgICAgICAgICAgICAgIG5leHRFeGVjdXRpb246IDE1MDI0MDQ1MDAwMDAsXG4gICAgICAgICAgICAgICAgcmVzdW1lRGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBydW5MZW5ndGhBdmVyYWdlOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
