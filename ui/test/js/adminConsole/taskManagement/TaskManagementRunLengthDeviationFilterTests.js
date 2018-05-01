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

            describe('Run Length Deviation Filter', function () {
                var runLengthDeviationFilter = undefined,
                    positiveText = undefined,
                    negativeText = undefined,
                    filteredValue = undefined;

                beforeEach(module(taskManagementModule));

                beforeEach(inject(function (_runLengthDeviationFilter_) {
                    runLengthDeviationFilter = _runLengthDeviationFilter_;

                    positiveText = '<i role="presentation" class="fa fa-arrow-up text-danger"></i> ';
                    negativeText = '<i role="presentation" class="fa fa-arrow-down text-success"></i> ';
                }));

                function getValueText(value) {
                    if (value > 0) {
                        return positiveText + value + '%';
                    } else if (value < 0) {
                        return negativeText + Math.abs(value) + '%';
                    } else {
                        return value;
                    }
                }

                it('should return positive text for positive number', function () {
                    filteredValue = runLengthDeviationFilter(2);
                    expect(filteredValue).toEqual(getValueText(2));
                });

                it('should return negative text for negative number', function () {
                    filteredValue = runLengthDeviationFilter(-50);
                    expect(filteredValue).toEqual(getValueText(-50));
                });

                it('should return value if not a number', function () {
                    filteredValue = runLengthDeviationFilter('NotANumber');
                    expect(filteredValue).toEqual('NotANumber');
                });

                it('should return 0 for 0', function () {
                    filteredValue = runLengthDeviationFilter(0);
                    expect(filteredValue).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFJ1bkxlbmd0aERldmlhdGlvbkZpbHRlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3REFBd0QsVUFBVSxTQUFTOzs7OztJQUtuSDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbURBQW1EO1lBQ3pHLHVCQUF1QixrREFBa0Q7O1FBRTdFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywrQkFBK0IsWUFBTTtnQkFDM0MsSUFBSSwyQkFBd0I7b0JBQUUsZUFBWTtvQkFBRSxlQUFZO29CQUFFLGdCQUFhOztnQkFFdkUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsNEJBQTRCO29CQUNuRCwyQkFBMkI7O29CQUUzQixlQUFlO29CQUNmLGVBQWU7OztnQkFHbkIsU0FBUyxhQUFhLE9BQU87b0JBQ3pCLElBQUksUUFBUSxHQUFHO3dCQUNYLE9BQU8sZUFBZSxRQUFROzJCQUMzQixJQUFJLFFBQVEsR0FBRzt3QkFDbEIsT0FBTyxlQUFlLEtBQUssSUFBSSxTQUFTOzJCQUNyQzt3QkFDSCxPQUFPOzs7O2dCQUlmLEdBQUcsbURBQW1ELFlBQU07b0JBQ3ZELGdCQUFnQix5QkFBeUI7b0JBQ3pDLE9BQU8sZUFBZSxRQUFRLGFBQWE7OztnQkFHaEQsR0FBRyxtREFBbUQsWUFBTTtvQkFDeEQsZ0JBQWdCLHlCQUF5QixDQUFDO29CQUMxQyxPQUFPLGVBQWUsUUFBUSxhQUFhLENBQUM7OztnQkFHaEQsR0FBRyx1Q0FBdUMsWUFBTTtvQkFDNUMsZ0JBQWdCLHlCQUF5QjtvQkFDekMsT0FBTyxlQUFlLFFBQVE7OztnQkFHbEMsR0FBRyx5QkFBeUIsWUFBTTtvQkFDOUIsZ0JBQWdCLHlCQUF5QjtvQkFDekMsT0FBTyxlQUFlLFFBQVE7Ozs7O0dBZWxDIiwiZmlsZSI6ImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFJ1bkxlbmd0aERldmlhdGlvbkZpbHRlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0YXNrTWFuYWdlbWVudE1vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvdGFza01hbmFnZW1lbnQvVGFza01hbmFnZW1lbnRNb2R1bGUuanMnO1xuXG5kZXNjcmliZSgnUnVuIExlbmd0aCBEZXZpYXRpb24gRmlsdGVyJywgKCkgPT4ge1xuICAgbGV0IHJ1bkxlbmd0aERldmlhdGlvbkZpbHRlciwgcG9zaXRpdmVUZXh0LCBuZWdhdGl2ZVRleHQsIGZpbHRlcmVkVmFsdWU7XG5cbiAgIGJlZm9yZUVhY2gobW9kdWxlKHRhc2tNYW5hZ2VtZW50TW9kdWxlKSk7XG5cbiAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9ydW5MZW5ndGhEZXZpYXRpb25GaWx0ZXJfKSB7XG4gICAgICAgcnVuTGVuZ3RoRGV2aWF0aW9uRmlsdGVyID0gX3J1bkxlbmd0aERldmlhdGlvbkZpbHRlcl87XG5cbiAgICAgICBwb3NpdGl2ZVRleHQgPSAnPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwiZmEgZmEtYXJyb3ctdXAgdGV4dC1kYW5nZXJcIj48L2k+ICc7XG4gICAgICAgbmVnYXRpdmVUZXh0ID0gJzxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cImZhIGZhLWFycm93LWRvd24gdGV4dC1zdWNjZXNzXCI+PC9pPiAnO1xuICAgfSkpO1xuXG4gICBmdW5jdGlvbiBnZXRWYWx1ZVRleHQodmFsdWUpIHtcbiAgICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgIHJldHVybiBwb3NpdGl2ZVRleHQgKyB2YWx1ZSArICclJztcbiAgICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAgICByZXR1cm4gbmVnYXRpdmVUZXh0ICsgTWF0aC5hYnModmFsdWUpICsgJyUnO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICB9XG4gICB9XG5cbiAgIGl0KCdzaG91bGQgcmV0dXJuIHBvc2l0aXZlIHRleHQgZm9yIHBvc2l0aXZlIG51bWJlcicsICgpID0+IHtcbiAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJ1bkxlbmd0aERldmlhdGlvbkZpbHRlcigyKTtcbiAgICAgICAgZXhwZWN0KGZpbHRlcmVkVmFsdWUpLnRvRXF1YWwoZ2V0VmFsdWVUZXh0KDIpKTtcbiAgIH0pO1xuXG4gICBpdCgnc2hvdWxkIHJldHVybiBuZWdhdGl2ZSB0ZXh0IGZvciBuZWdhdGl2ZSBudW1iZXInLCAoKSA9PiB7XG4gICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJ1bkxlbmd0aERldmlhdGlvbkZpbHRlcigtNTApO1xuICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKGdldFZhbHVlVGV4dCgtNTApKTtcbiAgIH0pO1xuXG4gICBpdCgnc2hvdWxkIHJldHVybiB2YWx1ZSBpZiBub3QgYSBudW1iZXInLCAoKSA9PiB7XG4gICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJ1bkxlbmd0aERldmlhdGlvbkZpbHRlcignTm90QU51bWJlcicpO1xuICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCdOb3RBTnVtYmVyJyk7XG4gICB9KTtcblxuICAgaXQoJ3Nob3VsZCByZXR1cm4gMCBmb3IgMCcsICgpID0+IHtcbiAgICAgICBmaWx0ZXJlZFZhbHVlID0gcnVuTGVuZ3RoRGV2aWF0aW9uRmlsdGVyKDApO1xuICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKDApO1xuICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
