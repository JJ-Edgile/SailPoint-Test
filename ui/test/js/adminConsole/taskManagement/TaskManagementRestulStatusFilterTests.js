System.register(['test/js/TestInitializer', 'adminConsole/taskManagement/TaskManagementModule.js'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var taskManagementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleTaskManagementTaskManagementModuleJs) {
            taskManagementModule = _adminConsoleTaskManagementTaskManagementModuleJs['default'];
        }],
        execute: function () {

            describe('Restult Status Filter', function () {

                var completionStatusFilter = undefined,
                    spTranslateFilter = undefined,
                    successText = undefined,
                    warningText = undefined,
                    terminatedText = undefined,
                    errorText = undefined,
                    TaskResult = undefined,
                    filteredValue = undefined;

                var MSG_KEY_SUCCESS = 'ui_task_management_status_success';
                var MSG_KEY_WARNING = 'ui_task_management_status_warning';
                var MSG_KEY_CANCELLED = 'ui_task_management_status_terminated';
                var MSG_KEY_FAIL = 'ui_task_management_status_error';

                beforeEach(module(taskManagementModule));

                beforeEach(inject(function (_completionStatusFilter_, _spTranslateFilter_, _TaskResult_) {
                    completionStatusFilter = _completionStatusFilter_;
                    spTranslateFilter = _spTranslateFilter_;
                    TaskResult = _TaskResult_;

                    successText = '<i role="presentation" class="fa fa-check-circle text-success"></i> ' + spTranslateFilter(MSG_KEY_SUCCESS);
                    warningText = '<i role="presentation" class="fa fa-exclamation-triangle text-warning"></i> ' + spTranslateFilter(MSG_KEY_WARNING);
                    terminatedText = '<i role="presentation" class="fa fa-exclamation-triangle text-warning"></i> ' + spTranslateFilter(MSG_KEY_CANCELLED);
                    errorText = '<i role="presentation" class="fa fa-exclamation-triangle text-danger"></i> ' + spTranslateFilter(MSG_KEY_FAIL);
                }));

                it('should return success text for success status', function () {
                    filteredValue = completionStatusFilter(TaskResult.Status.SUCCESS);
                    expect(filteredValue).toEqual(successText);
                });

                it('should return warning text for warning status', function () {
                    filteredValue = completionStatusFilter(TaskResult.Status.WARNING);
                    expect(filteredValue).toEqual(warningText);
                });

                it('should return terminated text for terminated status', function () {
                    filteredValue = completionStatusFilter(TaskResult.Status.TERMINATED);
                    expect(filteredValue).toEqual(terminatedText);
                });

                it('should return error text for error status', function () {
                    filteredValue = completionStatusFilter(TaskResult.Status.ERROR);
                    expect(filteredValue).toEqual(errorText);
                });

                it('should return input if no status match', function () {
                    filteredValue = completionStatusFilter('IDontBelongHere');
                    expect(filteredValue).toEqual('IDontBelongHere');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFJlc3R1bFN0YXR1c0ZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3REFBd0QsVUFBVSxTQUFTOzs7OztJQUtuSDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbURBQW1EO1lBQ3pHLHVCQUF1QixrREFBa0Q7O1FBRTdFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5QkFBeUIsWUFBTTs7Z0JBRXBDLElBQUkseUJBQXNCO29CQUFFLG9CQUFpQjtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsaUJBQWM7b0JBQ25GLFlBQVM7b0JBQUUsYUFBVTtvQkFBRSxnQkFBYTs7Z0JBRXhDLElBQU0sa0JBQWtCO2dCQUN4QixJQUFNLGtCQUFrQjtnQkFDeEIsSUFBTSxvQkFBb0I7Z0JBQzFCLElBQU0sZUFBZTs7Z0JBRXJCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLDBCQUEwQixxQkFBcUIsY0FBYztvQkFDcEYseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLGFBQWE7O29CQUViLGNBQWMseUVBQ1Ysa0JBQWtCO29CQUN0QixjQUFjLGlGQUNWLGtCQUFrQjtvQkFDdEIsaUJBQWlCLGlGQUNiLGtCQUFrQjtvQkFDdEIsWUFBWSxnRkFDUixrQkFBa0I7OztnQkFJMUIsR0FBRyxpREFBaUQsWUFBTTtvQkFDdEQsZ0JBQWdCLHVCQUF1QixXQUFXLE9BQU87b0JBQ3pELE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsaURBQWlELFlBQU07b0JBQ3RELGdCQUFnQix1QkFBdUIsV0FBVyxPQUFPO29CQUN6RCxPQUFPLGVBQWUsUUFBUTs7O2dCQUdsQyxHQUFHLHVEQUF1RCxZQUFNO29CQUM1RCxnQkFBZ0IsdUJBQXVCLFdBQVcsT0FBTztvQkFDekQsT0FBTyxlQUFlLFFBQVE7OztnQkFHbEMsR0FBRyw2Q0FBNkMsWUFBTTtvQkFDbEQsZ0JBQWdCLHVCQUF1QixXQUFXLE9BQU87b0JBQ3pELE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsMENBQTBDLFlBQU07b0JBQy9DLGdCQUFnQix1QkFBdUI7b0JBQ3ZDLE9BQU8sZUFBZSxRQUFROzs7OztHQWFuQyIsImZpbGUiOiJhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRSZXN0dWxTdGF0dXNGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlLmpzJztcblxuZGVzY3JpYmUoJ1Jlc3R1bHQgU3RhdHVzIEZpbHRlcicsICgpID0+IHtcblxuICAgIGxldCBjb21wbGV0aW9uU3RhdHVzRmlsdGVyLCBzcFRyYW5zbGF0ZUZpbHRlciwgc3VjY2Vzc1RleHQsIHdhcm5pbmdUZXh0LCB0ZXJtaW5hdGVkVGV4dCxcbiAgICAgICAgZXJyb3JUZXh0LCBUYXNrUmVzdWx0LCBmaWx0ZXJlZFZhbHVlO1xuXG4gICAgY29uc3QgTVNHX0tFWV9TVUNDRVNTID0gJ3VpX3Rhc2tfbWFuYWdlbWVudF9zdGF0dXNfc3VjY2Vzcyc7XG4gICAgY29uc3QgTVNHX0tFWV9XQVJOSU5HID0gJ3VpX3Rhc2tfbWFuYWdlbWVudF9zdGF0dXNfd2FybmluZyc7XG4gICAgY29uc3QgTVNHX0tFWV9DQU5DRUxMRUQgPSAndWlfdGFza19tYW5hZ2VtZW50X3N0YXR1c190ZXJtaW5hdGVkJztcbiAgICBjb25zdCBNU0dfS0VZX0ZBSUwgPSAndWlfdGFza19tYW5hZ2VtZW50X3N0YXR1c19lcnJvcic7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0YXNrTWFuYWdlbWVudE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2NvbXBsZXRpb25TdGF0dXNGaWx0ZXJfLCBfc3BUcmFuc2xhdGVGaWx0ZXJfLCBfVGFza1Jlc3VsdF8pIHtcbiAgICAgICAgY29tcGxldGlvblN0YXR1c0ZpbHRlciA9IF9jb21wbGV0aW9uU3RhdHVzRmlsdGVyXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIgPSBfc3BUcmFuc2xhdGVGaWx0ZXJfO1xuICAgICAgICBUYXNrUmVzdWx0ID0gX1Rhc2tSZXN1bHRfO1xuXG4gICAgICAgIHN1Y2Nlc3NUZXh0ID0gJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZSB0ZXh0LXN1Y2Nlc3NcIj48L2k+ICcgK1xuICAgICAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIoTVNHX0tFWV9TVUNDRVNTKTtcbiAgICAgICAgd2FybmluZ1RleHQgPSAnPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZmEgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgdGV4dC13YXJuaW5nXCI+PC9pPiAnICtcbiAgICAgICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyKE1TR19LRVlfV0FSTklORyk7XG4gICAgICAgIHRlcm1pbmF0ZWRUZXh0ID0gJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIHRleHQtd2FybmluZ1wiPjwvaT4gJyArXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcihNU0dfS0VZX0NBTkNFTExFRCk7XG4gICAgICAgIGVycm9yVGV4dCA9ICc8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZSB0ZXh0LWRhbmdlclwiPjwvaT4gJyArXG4gICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcihNU0dfS0VZX0ZBSUwpO1xuXG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gc3VjY2VzcyB0ZXh0IGZvciBzdWNjZXNzIHN0YXR1cycsICgpID0+IHtcbiAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IGNvbXBsZXRpb25TdGF0dXNGaWx0ZXIoVGFza1Jlc3VsdC5TdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKHN1Y2Nlc3NUZXh0KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdhcm5pbmcgdGV4dCBmb3Igd2FybmluZyBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgIGZpbHRlcmVkVmFsdWUgPSBjb21wbGV0aW9uU3RhdHVzRmlsdGVyKFRhc2tSZXN1bHQuU3RhdHVzLldBUk5JTkcpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWx1ZSkudG9FcXVhbCh3YXJuaW5nVGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0ZXJtaW5hdGVkIHRleHQgZm9yIHRlcm1pbmF0ZWQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gY29tcGxldGlvblN0YXR1c0ZpbHRlcihUYXNrUmVzdWx0LlN0YXR1cy5URVJNSU5BVEVEKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsdWUpLnRvRXF1YWwodGVybWluYXRlZFRleHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXJyb3IgdGV4dCBmb3IgZXJyb3Igc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gY29tcGxldGlvblN0YXR1c0ZpbHRlcihUYXNrUmVzdWx0LlN0YXR1cy5FUlJPUik7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKGVycm9yVGV4dCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBpbnB1dCBpZiBubyBzdGF0dXMgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICAgIGZpbHRlcmVkVmFsdWUgPSBjb21wbGV0aW9uU3RhdHVzRmlsdGVyKCdJRG9udEJlbG9uZ0hlcmUnKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsdWUpLnRvRXF1YWwoJ0lEb250QmVsb25nSGVyZScpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
