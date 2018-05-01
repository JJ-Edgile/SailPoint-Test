System.register(['test/js/TestInitializer', 'common/config/ConfigModule'], function (_export) {
    'use strict';

    var configModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonConfigConfigModule) {
            configModule = _commonConfigConfigModule['default'];
        }],
        execute: function () {

            describe('spRegisterConfig directive', function () {
                var configService, $compile, $rootScope;

                beforeEach(module(configModule));

                // Register a mock config service to test with.
                beforeEach(module(function ($provide) {
                    configService = {
                        registerConfigValue: jasmine.createSpy('registerConfigValue'),
                        registerColumnConfig: jasmine.createSpy('registerColumnConfig')
                    };
                    $provide.value('configService', configService);
                }));

                beforeEach(inject(function (_$compile_, _$rootScope_) {
                    $compile = _$compile_;
                    $rootScope = _$rootScope_;
                }));

                function compile(elt) {
                    var element = angular.element(elt),
                        $scope = $rootScope.$new();
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('pukes without a key', function () {
                    var elt = '<sp-register-config sp-config-value="no key here" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('pukes without a config value or column config', function () {
                    var elt = '<sp-register-config sp-config-key="a key with nothing to do" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('pukes if the column configs are not an array', function () {
                    var elt = '<sp-register-config sp-config-key="nope" sp-column-configs="not an array" />';
                    expect(function () {
                        compile(elt);
                    }).toThrow();
                });

                it('registers a value', function () {
                    var elt = '<sp-register-config sp-config-key="valueKey" sp-config-value="true" />',
                        args;
                    compile(elt);
                    expect(configService.registerConfigValue).toHaveBeenCalled();
                    args = configService.registerConfigValue.calls.mostRecent().args;
                    expect(args[0]).toEqual('valueKey');
                    expect(args[1]).toEqual(true);
                });

                it('registers a column config', function () {
                    var elt = '<sp-register-config sp-config-key="colConfigKey" ' + '                    sp-column-configs="[ { dataIndex: &quot;1234&quot; } ]" />',
                        args;
                    compile(elt);
                    expect(configService.registerColumnConfig).toHaveBeenCalled();
                    args = configService.registerColumnConfig.calls.mostRecent().args;
                    expect(args[0]).toEqual('colConfigKey');
                    expect(args[1][0].dataIndex).toEqual('1234');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb25maWcvUmVnaXN0ZXJDb25maWdEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUztJQUE5Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsOEJBQThCLFlBQVc7Z0JBQzlDLElBQUksZUFBZSxVQUFVOztnQkFFN0IsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLGdCQUFnQjt3QkFDWixxQkFBcUIsUUFBUSxVQUFVO3dCQUN2QyxzQkFBc0IsUUFBUSxVQUFVOztvQkFFNUMsU0FBUyxNQUFNLGlCQUFpQjs7O2dCQUdwQyxXQUFXLE9BQU8sVUFBUyxZQUFZLGNBQWM7b0JBQ2pELFdBQVc7b0JBQ1gsYUFBYTs7O2dCQUdqQixTQUFTLFFBQVEsS0FBSztvQkFDbEIsSUFBSSxVQUFVLFFBQVEsUUFBUTt3QkFDMUIsU0FBUyxXQUFXO29CQUN4QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLEdBQUcsdUJBQXVCLFlBQVc7b0JBQ2pDLElBQUksTUFBTTtvQkFDVixPQUFPLFlBQVc7d0JBQUUsUUFBUTt1QkFBUzs7O2dCQUd6QyxHQUFHLGlEQUFpRCxZQUFXO29CQUMzRCxJQUFJLE1BQU07b0JBQ1YsT0FBTyxZQUFXO3dCQUFFLFFBQVE7dUJBQVM7OztnQkFHekMsR0FBRyxnREFBZ0QsWUFBVztvQkFDMUQsSUFBSSxNQUFNO29CQUNWLE9BQU8sWUFBVzt3QkFBRSxRQUFRO3VCQUFTOzs7Z0JBR3pDLEdBQUcscUJBQXFCLFlBQVc7b0JBQy9CLElBQUksTUFBTTt3QkFDTjtvQkFDSixRQUFRO29CQUNSLE9BQU8sY0FBYyxxQkFBcUI7b0JBQzFDLE9BQU8sY0FBYyxvQkFBb0IsTUFBTSxhQUFhO29CQUM1RCxPQUFPLEtBQUssSUFBSSxRQUFRO29CQUN4QixPQUFPLEtBQUssSUFBSSxRQUFROzs7Z0JBRzVCLEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLElBQUksTUFBTSxzREFDQTt3QkFDTjtvQkFDSixRQUFRO29CQUNSLE9BQU8sY0FBYyxzQkFBc0I7b0JBQzNDLE9BQU8sY0FBYyxxQkFBcUIsTUFBTSxhQUFhO29CQUM3RCxPQUFPLEtBQUssSUFBSSxRQUFRO29CQUN4QixPQUFPLEtBQUssR0FBRyxHQUFHLFdBQVcsUUFBUTs7Ozs7R0FlMUMiLCJmaWxlIjoiY29tbW9uL2NvbmZpZy9SZWdpc3RlckNvbmZpZ0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjb25maWdNb2R1bGUgZnJvbSAnY29tbW9uL2NvbmZpZy9Db25maWdNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ3NwUmVnaXN0ZXJDb25maWcgZGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY29uZmlnU2VydmljZSwgJGNvbXBpbGUsICRyb290U2NvcGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY29uZmlnTW9kdWxlKSk7XHJcblxyXG4gICAgLy8gUmVnaXN0ZXIgYSBtb2NrIGNvbmZpZyBzZXJ2aWNlIHRvIHRlc3Qgd2l0aC5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgY29uZmlnU2VydmljZSA9IHtcclxuICAgICAgICAgICAgcmVnaXN0ZXJDb25maWdWYWx1ZTogamFzbWluZS5jcmVhdGVTcHkoJ3JlZ2lzdGVyQ29uZmlnVmFsdWUnKSxcclxuICAgICAgICAgICAgcmVnaXN0ZXJDb2x1bW5Db25maWc6IGphc21pbmUuY3JlYXRlU3B5KCdyZWdpc3RlckNvbHVtbkNvbmZpZycpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAkcHJvdmlkZS52YWx1ZSgnY29uZmlnU2VydmljZScsIGNvbmZpZ1NlcnZpY2UpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXykge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoZWx0KSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0KSxcclxuICAgICAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3B1a2VzIHdpdGhvdXQgYSBrZXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0ID0gJzxzcC1yZWdpc3Rlci1jb25maWcgc3AtY29uZmlnLXZhbHVlPVwibm8ga2V5IGhlcmVcIiAvPic7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGVsdCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdwdWtlcyB3aXRob3V0IGEgY29uZmlnIHZhbHVlIG9yIGNvbHVtbiBjb25maWcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWx0ID0gJzxzcC1yZWdpc3Rlci1jb25maWcgc3AtY29uZmlnLWtleT1cImEga2V5IHdpdGggbm90aGluZyB0byBkb1wiIC8+JztcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IGNvbXBpbGUoZWx0KTsgfSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3B1a2VzIGlmIHRoZSBjb2x1bW4gY29uZmlncyBhcmUgbm90IGFuIGFycmF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsdCA9ICc8c3AtcmVnaXN0ZXItY29uZmlnIHNwLWNvbmZpZy1rZXk9XCJub3BlXCIgc3AtY29sdW1uLWNvbmZpZ3M9XCJub3QgYW4gYXJyYXlcIiAvPic7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjb21waWxlKGVsdCk7IH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZWdpc3RlcnMgYSB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbHQgPSAnPHNwLXJlZ2lzdGVyLWNvbmZpZyBzcC1jb25maWcta2V5PVwidmFsdWVLZXlcIiBzcC1jb25maWctdmFsdWU9XCJ0cnVlXCIgLz4nLFxyXG4gICAgICAgICAgICBhcmdzO1xyXG4gICAgICAgIGNvbXBpbGUoZWx0KTtcclxuICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5yZWdpc3RlckNvbmZpZ1ZhbHVlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgYXJncyA9IGNvbmZpZ1NlcnZpY2UucmVnaXN0ZXJDb25maWdWYWx1ZS5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbCgndmFsdWVLZXknKTtcclxuICAgICAgICBleHBlY3QoYXJnc1sxXSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZWdpc3RlcnMgYSBjb2x1bW4gY29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsdCA9ICc8c3AtcmVnaXN0ZXItY29uZmlnIHNwLWNvbmZpZy1rZXk9XCJjb2xDb25maWdLZXlcIiAnICtcclxuICAgICAgICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgICAgc3AtY29sdW1uLWNvbmZpZ3M9XCJbIHsgZGF0YUluZGV4OiAmcXVvdDsxMjM0JnF1b3Q7IH0gXVwiIC8+JyxcclxuICAgICAgICAgICAgYXJncztcclxuICAgICAgICBjb21waWxlKGVsdCk7XHJcbiAgICAgICAgZXhwZWN0KGNvbmZpZ1NlcnZpY2UucmVnaXN0ZXJDb2x1bW5Db25maWcpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICBhcmdzID0gY29uZmlnU2VydmljZS5yZWdpc3RlckNvbHVtbkNvbmZpZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICBleHBlY3QoYXJnc1swXSkudG9FcXVhbCgnY29sQ29uZmlnS2V5Jyk7XHJcbiAgICAgICAgZXhwZWN0KGFyZ3NbMV1bMF0uZGF0YUluZGV4KS50b0VxdWFsKCcxMjM0Jyk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
