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

            describe('Runtime Filter', function () {

                var runtimeFilter = undefined,
                    spTranslateFilter = undefined,
                    filteredValue = undefined;

                beforeEach(module(taskManagementModule));

                beforeEach(inject(function (_runtimeFilter_, _spTranslateFilter_) {
                    runtimeFilter = _runtimeFilter_;
                    spTranslateFilter = _spTranslateFilter_;

                    spTranslateFilter.configureCatalog({
                        'ui_task_management_seconds': '{0} seconds',
                        'ui_task_management_minutes': '{0} minutes {1} seconds',
                        'ui_task_management_hours': '{0} hours {1} minutes'
                    });
                }));

                it('should return empty string if value undefined', function () {
                    filteredValue = runtimeFilter(undefined);
                    expect(filteredValue).toEqual('');
                });

                it('should return empty string if value is not a number', function () {
                    filteredValue = runtimeFilter('NotANumber');
                    expect(filteredValue).toEqual('');
                });

                it('should return empty string if value is 0', function () {
                    filteredValue = runtimeFilter(0);
                    expect(filteredValue).toEqual('');
                });

                it('should return calculated seconds if < 60', function () {
                    filteredValue = runtimeFilter(59);
                    expect(filteredValue).toEqual('59 seconds');
                });

                it('should return calculated minutes/seconds if 60 < x < 3600', function () {
                    filteredValue = runtimeFilter(100);
                    expect(filteredValue).toEqual('1 minutes 40 seconds');
                });

                it('should return calculated hours/minutes if 3600 < x', function () {
                    filteredValue = runtimeFilter(3660);
                    expect(filteredValue).toEqual('1 hours 1 minutes');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFJ1bnRpbWVGaWx0ZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0RBQXdELFVBQVUsU0FBUzs7Ozs7SUFLbkg7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1EQUFtRDtZQUN6Ryx1QkFBdUIsa0RBQWtEOztRQUU3RSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsa0JBQWtCLFlBQU07O2dCQUU3QixJQUFJLGdCQUFhO29CQUFFLG9CQUFpQjtvQkFBRSxnQkFBYTs7Z0JBRW5ELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGlCQUFpQixxQkFBcUI7b0JBQzdELGdCQUFnQjtvQkFDaEIsb0JBQW9COztvQkFFcEIsa0JBQWtCLGlCQUFpQjt3QkFDL0IsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLDRCQUE0Qjs7OztnQkFJcEMsR0FBRyxpREFBaUQsWUFBTTtvQkFDdEQsZ0JBQWdCLGNBQWM7b0JBQzlCLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsdURBQXVELFlBQU07b0JBQzVELGdCQUFnQixjQUFjO29CQUM5QixPQUFPLGVBQWUsUUFBUTs7O2dCQUdsQyxHQUFHLDRDQUE0QyxZQUFNO29CQUNqRCxnQkFBZ0IsY0FBYztvQkFDOUIsT0FBTyxlQUFlLFFBQVE7OztnQkFHbEMsR0FBRyw0Q0FBNEMsWUFBTTtvQkFDakQsZ0JBQWdCLGNBQWM7b0JBQzlCLE9BQU8sZUFBZSxRQUFROzs7Z0JBR2xDLEdBQUcsNkRBQTZELFlBQU07b0JBQ2xFLGdCQUFnQixjQUFjO29CQUM5QixPQUFPLGVBQWUsUUFBUTs7O2dCQUdsQyxHQUFHLHNEQUFzRCxZQUFNO29CQUMzRCxnQkFBZ0IsY0FBYztvQkFDOUIsT0FBTyxlQUFlLFFBQVE7Ozs7O0dBY25DIiwiZmlsZSI6ImFkbWluQ29uc29sZS90YXNrTWFuYWdlbWVudC9UYXNrTWFuYWdlbWVudFJ1bnRpbWVGaWx0ZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgKGMpIENvcHlyaWdodCAyMDA4IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFza01hbmFnZW1lbnRNb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Rhc2tNYW5hZ2VtZW50L1Rhc2tNYW5hZ2VtZW50TW9kdWxlLmpzJztcblxuZGVzY3JpYmUoJ1J1bnRpbWUgRmlsdGVyJywgKCkgPT4ge1xuXG4gICAgbGV0IHJ1bnRpbWVGaWx0ZXIsIHNwVHJhbnNsYXRlRmlsdGVyLCBmaWx0ZXJlZFZhbHVlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGFza01hbmFnZW1lbnRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9ydW50aW1lRmlsdGVyXywgX3NwVHJhbnNsYXRlRmlsdGVyXykge1xuICAgICAgICBydW50aW1lRmlsdGVyID0gX3J1bnRpbWVGaWx0ZXJfO1xuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlciA9IF9zcFRyYW5zbGF0ZUZpbHRlcl87XG5cbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfdGFza19tYW5hZ2VtZW50X3NlY29uZHMnOiAnezB9IHNlY29uZHMnLFxuICAgICAgICAgICAgJ3VpX3Rhc2tfbWFuYWdlbWVudF9taW51dGVzJzogJ3swfSBtaW51dGVzIHsxfSBzZWNvbmRzJyxcbiAgICAgICAgICAgICd1aV90YXNrX21hbmFnZW1lbnRfaG91cnMnOiAnezB9IGhvdXJzIHsxfSBtaW51dGVzJ1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdmFsdWUgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gcnVudGltZUZpbHRlcih1bmRlZmluZWQpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdmFsdWUgaXMgbm90IGEgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gcnVudGltZUZpbHRlcignTm90QU51bWJlcicpO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgdmFsdWUgaXMgMCcsICgpID0+IHtcbiAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJ1bnRpbWVGaWx0ZXIoMCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNhbGN1bGF0ZWQgc2Vjb25kcyBpZiA8IDYwJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gcnVudGltZUZpbHRlcig1OSk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCc1OSBzZWNvbmRzJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBjYWxjdWxhdGVkIG1pbnV0ZXMvc2Vjb25kcyBpZiA2MCA8IHggPCAzNjAwJywgKCkgPT4ge1xuICAgICAgICBmaWx0ZXJlZFZhbHVlID0gcnVudGltZUZpbHRlcigxMDApO1xuICAgICAgICBleHBlY3QoZmlsdGVyZWRWYWx1ZSkudG9FcXVhbCgnMSBtaW51dGVzIDQwIHNlY29uZHMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNhbGN1bGF0ZWQgaG91cnMvbWludXRlcyBpZiAzNjAwIDwgeCcsICgpID0+IHtcbiAgICAgICAgZmlsdGVyZWRWYWx1ZSA9IHJ1bnRpbWVGaWx0ZXIoMzY2MCk7XG4gICAgICAgIGV4cGVjdChmaWx0ZXJlZFZhbHVlKS50b0VxdWFsKCcxIGhvdXJzIDEgbWludXRlcycpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
