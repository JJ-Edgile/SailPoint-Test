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

         angular.module(taskManagementModule).factory('taskResultTestData', function () {
            return {
               TASKRES1: {
                  attributes: {
                     pendingSignoffs: 0
                  },
                  completed: 1479411642636,
                  completionStatus: 'Success',
                  host: null,
                  id: '2c9091cb5873c744015873ce30cb0090',
                  launched: '1479411642568',
                  modified: 1479411642636,
                  name: 'Completed',
                  owner: null,
                  pendingSignoffs: 0,
                  runLength: 0,
                  runLengthAverage: 60,
                  runLengthDeviation: 0,
                  stack: null,
                  targetClass: null,
                  targetId: null,
                  targetName: null,
                  terminated: null
               },
               TASKRES2: {
                  attributes: {
                     pendingSignoffs: 0
                  },
                  completed: null,
                  completionStatus: null,
                  host: null,
                  id: null,
                  launched: '1500305059635',
                  modified: null,
                  name: 'Active',
                  owner: null,
                  pendingSignoffs: 0,
                  runLength: 0,
                  runLengthAverage: 0,
                  runLengthDeviation: 0,
                  stack: null,
                  targetClass: null,
                  targetId: null,
                  targetName: null,
                  terminated: null
               },
               TASKRES3: {
                  attributes: {
                     pendingSignoffs: 0
                  },
                  completed: 1499884807376,
                  completionStatus: 'Error',
                  host: 'testServ.sailpoint.com',
                  id: '2c908cb75d380805015d3819e068000e',
                  launched: '1499884806245',
                  modified: null,
                  name: 'Errored',
                  owner: null,
                  pendingSignoffs: 0,
                  runLength: 1,
                  runLengthAverage: 0,
                  runLengthDeviation: 0,
                  stack: null,
                  targetClass: null,
                  targetId: null,
                  targetName: null,
                  terminated: null
               }
            };
         });
      }
   };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrUmVzdWx0VGVzdERhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMscURBQXFELFVBQVUsU0FBUzs7Ozs7R0FLdEY7O0dBRUEsSUFBSTtHQUNKLE9BQU87TUFDSixTQUFTLENBQUMsVUFBVSxpREFBaUQ7U0FDbEUsdUJBQXVCLGdEQUFnRDs7TUFFMUUsU0FBUyxZQUFZOztTQU4zQixRQUFRLE9BQU8sc0JBQ1gsUUFBUSxzQkFBc0IsWUFBVztZQUNyQyxPQUFPO2VBQ0gsVUFBVztrQkFDUixZQUFZO3FCQUNSLGlCQUFpQjs7a0JBRXJCLFdBQVc7a0JBQ1gsa0JBQWtCO2tCQUNsQixNQUFNO2tCQUNOLElBQUk7a0JBQ0osVUFBVTtrQkFDVixVQUFVO2tCQUNWLE1BQU07a0JBQ04sT0FBTztrQkFDUCxpQkFBaUI7a0JBQ2pCLFdBQVc7a0JBQ1gsa0JBQWtCO2tCQUNsQixvQkFBb0I7a0JBQ3BCLE9BQU87a0JBQ1AsYUFBYTtrQkFDYixVQUFVO2tCQUNWLFlBQVk7a0JBQ1osWUFBWTs7ZUFFZixVQUFXO2tCQUNSLFlBQVk7cUJBQ1IsaUJBQWlCOztrQkFFckIsV0FBVztrQkFDWCxrQkFBa0I7a0JBQ2xCLE1BQU07a0JBQ04sSUFBSTtrQkFDSixVQUFVO2tCQUNWLFVBQVU7a0JBQ1YsTUFBTTtrQkFDTixPQUFPO2tCQUNQLGlCQUFpQjtrQkFDakIsV0FBVztrQkFDWCxrQkFBa0I7a0JBQ2xCLG9CQUFvQjtrQkFDcEIsT0FBTztrQkFDUCxhQUFhO2tCQUNiLFVBQVU7a0JBQ1YsWUFBWTtrQkFDWixZQUFZOztlQUVmLFVBQVc7a0JBQ1IsWUFBWTtxQkFDUixpQkFBaUI7O2tCQUVyQixXQUFXO2tCQUNYLGtCQUFrQjtrQkFDbEIsTUFBTTtrQkFDTixJQUFJO2tCQUNKLFVBQVU7a0JBQ1YsVUFBVTtrQkFDVixNQUFNO2tCQUNOLE9BQU87a0JBQ1AsaUJBQWlCO2tCQUNqQixXQUFXO2tCQUNYLGtCQUFrQjtrQkFDbEIsb0JBQW9CO2tCQUNwQixPQUFPO2tCQUNQLGFBQWE7a0JBQ2IsVUFBVTtrQkFDVixZQUFZO2tCQUNaLFlBQVk7Ozs7OztHQWF4QiIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza1Jlc3VsdFRlc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlJztcblxuYW5ndWxhci5tb2R1bGUodGFza01hbmFnZW1lbnRNb2R1bGUpLlxuICAgIGZhY3RvcnkoJ3Rhc2tSZXN1bHRUZXN0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgVEFTS1JFUzEgOiB7XG4gICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgcGVuZGluZ1NpZ25vZmZzOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGNvbXBsZXRlZDogMTQ3OTQxMTY0MjYzNixcbiAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgIGhvc3Q6IG51bGwsXG4gICAgICAgICAgICAgICBpZDogJzJjOTA5MWNiNTg3M2M3NDQwMTU4NzNjZTMwY2IwMDkwJyxcbiAgICAgICAgICAgICAgIGxhdW5jaGVkOiAnMTQ3OTQxMTY0MjU2OCcsXG4gICAgICAgICAgICAgICBtb2RpZmllZDogMTQ3OTQxMTY0MjYzNixcbiAgICAgICAgICAgICAgIG5hbWU6ICdDb21wbGV0ZWQnLFxuICAgICAgICAgICAgICAgb3duZXI6IG51bGwsXG4gICAgICAgICAgICAgICBwZW5kaW5nU2lnbm9mZnM6IDAsXG4gICAgICAgICAgICAgICBydW5MZW5ndGg6IDAsXG4gICAgICAgICAgICAgICBydW5MZW5ndGhBdmVyYWdlOiA2MCxcbiAgICAgICAgICAgICAgIHJ1bkxlbmd0aERldmlhdGlvbjogMCxcbiAgICAgICAgICAgICAgIHN0YWNrOiBudWxsLFxuICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IG51bGwsXG4gICAgICAgICAgICAgICB0YXJnZXRJZDogbnVsbCxcbiAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICB0ZXJtaW5hdGVkOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVEFTS1JFUzIgOiB7XG4gICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgcGVuZGluZ1NpZ25vZmZzOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGNvbXBsZXRlZDogbnVsbCxcbiAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM6IG51bGwsXG4gICAgICAgICAgICAgICBob3N0OiBudWxsLFxuICAgICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICAgICBsYXVuY2hlZDogJzE1MDAzMDUwNTk2MzUnLFxuICAgICAgICAgICAgICAgbW9kaWZpZWQ6IG51bGwsXG4gICAgICAgICAgICAgICBuYW1lOiAnQWN0aXZlJyxcbiAgICAgICAgICAgICAgIG93bmVyOiBudWxsLFxuICAgICAgICAgICAgICAgcGVuZGluZ1NpZ25vZmZzOiAwLFxuICAgICAgICAgICAgICAgcnVuTGVuZ3RoOiAwLFxuICAgICAgICAgICAgICAgcnVuTGVuZ3RoQXZlcmFnZTogMCxcbiAgICAgICAgICAgICAgIHJ1bkxlbmd0aERldmlhdGlvbjogMCxcbiAgICAgICAgICAgICAgIHN0YWNrOiBudWxsLFxuICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IG51bGwsXG4gICAgICAgICAgICAgICB0YXJnZXRJZDogbnVsbCxcbiAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICB0ZXJtaW5hdGVkOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVEFTS1JFUzMgOiB7XG4gICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgcGVuZGluZ1NpZ25vZmZzOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIGNvbXBsZXRlZDogMTQ5OTg4NDgwNzM3NixcbiAgICAgICAgICAgICAgIGNvbXBsZXRpb25TdGF0dXM6ICdFcnJvcicsXG4gICAgICAgICAgICAgICBob3N0OiAndGVzdFNlcnYuc2FpbHBvaW50LmNvbScsXG4gICAgICAgICAgICAgICBpZDogJzJjOTA4Y2I3NWQzODA4MDUwMTVkMzgxOWUwNjgwMDBlJyxcbiAgICAgICAgICAgICAgIGxhdW5jaGVkOiAnMTQ5OTg4NDgwNjI0NScsXG4gICAgICAgICAgICAgICBtb2RpZmllZDogbnVsbCxcbiAgICAgICAgICAgICAgIG5hbWU6ICdFcnJvcmVkJyxcbiAgICAgICAgICAgICAgIG93bmVyOiBudWxsLFxuICAgICAgICAgICAgICAgcGVuZGluZ1NpZ25vZmZzOiAwLFxuICAgICAgICAgICAgICAgcnVuTGVuZ3RoOiAxLFxuICAgICAgICAgICAgICAgcnVuTGVuZ3RoQXZlcmFnZTogMCxcbiAgICAgICAgICAgICAgIHJ1bkxlbmd0aERldmlhdGlvbjogMCxcbiAgICAgICAgICAgICAgIHN0YWNrOiBudWxsLFxuICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IG51bGwsXG4gICAgICAgICAgICAgICB0YXJnZXRJZDogbnVsbCxcbiAgICAgICAgICAgICAgIHRhcmdldE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICB0ZXJtaW5hdGVkOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
