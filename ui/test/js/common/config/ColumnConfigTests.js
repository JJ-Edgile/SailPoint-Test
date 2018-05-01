System.register(['test/js/TestInitializer', 'common/config/ConfigModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * @author: michael.hide
     * Created: 8/28/14 2:32 PM
     */
    'use strict';

    var configModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonConfigConfigModule) {
            configModule = _commonConfigConfigModule['default'];
        }],
        execute: function () {
            describe('ColumnConfig', function () {

                var ColumnConfig,
                    tmpColumnConfig,
                    minimumConfig = {
                    dataIndex: 'foo'
                },
                    fullConfig = {
                    dataIndex: 'foo',
                    label: 'FOO BAR',
                    fieldOnly: true,
                    renderer: 'risk',
                    dateStyle: 'long',
                    sortable: true,
                    hidden: true,
                    width: 100,
                    percentWidth: 25,
                    fixed: 'Left'
                };

                beforeEach(module(configModule));

                beforeEach(inject(function (_ColumnConfig_) {
                    ColumnConfig = _ColumnConfig_;
                }));

                function checkFullConfig(columnConfig) {
                    expect(columnConfig).toBeDefined();
                    expect(columnConfig.getDataIndex()).toBe('foo');
                    expect(columnConfig.getLabel()).toBe('FOO BAR');
                    expect(columnConfig.isFieldOnly()).toBe(true);
                    expect(columnConfig.getRenderer()).toBe('risk');
                    expect(columnConfig.getDateStyle()).toBe('long');
                    expect(columnConfig.isSortable()).toBe(true);
                    expect(columnConfig.isHidden()).toBe(true);
                    expect(columnConfig.getWidth()).toEqual(100);
                    expect(columnConfig.getPercentWidth()).toEqual(25);
                    expect(columnConfig.getFixed()).toEqual(fullConfig.fixed);
                }

                it('should instantiate with a well formed config', function () {
                    tmpColumnConfig = new ColumnConfig(fullConfig);
                    checkFullConfig(tmpColumnConfig);
                });

                it('clones all properties of the column config', function () {
                    tmpColumnConfig = new ColumnConfig(fullConfig);
                    var cloned = tmpColumnConfig.clone();
                    checkFullConfig(cloned);
                });

                it('should instantiate with fieldOnly set to false if not in config', function () {
                    tmpColumnConfig = new ColumnConfig(minimumConfig);

                    expect(tmpColumnConfig).toBeDefined();
                    expect(tmpColumnConfig.isFieldOnly()).toBe(false);
                });

                it('should instantiate with label set to dataIndex if not in config', function () {
                    tmpColumnConfig = new ColumnConfig(minimumConfig);

                    expect(tmpColumnConfig).toBeDefined();
                    expect(tmpColumnConfig.getLabel()).toBe(tmpColumnConfig.getDataIndex());
                });

                it('should throw an error with no constructor object', function () {
                    // Wrap instantiation in a function to test if it throws
                    function errorFunctionWrapper() {
                        tmpColumnConfig = new ColumnConfig();
                    }

                    expect(errorFunctionWrapper).toThrow();
                });

                it('should throw an error with no dataIndex in config', function () {
                    // Wrap instantiation in a function to test if it throws
                    function errorFunctionWrapper() {
                        tmpColumnConfig = new ColumnConfig({});
                    }

                    expect(errorFunctionWrapper).toThrow();
                });

                it('should instantiate with sortable set to false if not in config', function () {
                    tmpColumnConfig = new ColumnConfig(minimumConfig);

                    expect(tmpColumnConfig).toBeDefined();
                    expect(tmpColumnConfig.isSortable()).toBe(false);
                });

                it('should instantiate with hidden set to false if not in config', function () {
                    tmpColumnConfig = new ColumnConfig(minimumConfig);
                    expect(tmpColumnConfig.isHidden()).toEqual(false);
                });

                function createConfig(fieldOnly, hidden) {
                    var data = angular.copy(fullConfig);
                    data.fieldOnly = fieldOnly;
                    data.hidden = hidden;
                    return new ColumnConfig(data);
                }

                describe('displayed', function () {
                    it('is true when not field only and not hidden', function () {
                        tmpColumnConfig = createConfig(false, false);
                        expect(tmpColumnConfig.isDisplayed()).toEqual(true);
                    });

                    it('is false when field only', function () {
                        tmpColumnConfig = createConfig(true, false);
                        expect(tmpColumnConfig.isDisplayed()).toEqual(false);
                    });

                    it('is false when hidden', function () {
                        tmpColumnConfig = createConfig(false, true);
                        expect(tmpColumnConfig.isDisplayed()).toEqual(false);
                    });
                });

                function createWidthConfig(width, percentWidth) {
                    var data = {
                        dataIndex: '1'
                    };
                    if (width) {
                        data.width = width;
                    }
                    if (percentWidth) {
                        data.percentWidth = percentWidth;
                    }
                    return new ColumnConfig(data);
                }

                describe('width style', function () {
                    it('is null when no width is specified', function () {
                        var cfg = createWidthConfig(null, null);
                        expect(cfg.getWidthStyle()).toBeNull();
                    });

                    it('uses pixels when width is specified', function () {
                        var cfg = createWidthConfig(150, null);
                        expect(cfg.getWidthStyle()).toEqual('150px');
                    });

                    it('uses percentage when percent width is specified', function () {
                        var cfg = createWidthConfig(null, 50);
                        expect(cfg.getWidthStyle()).toEqual('50%');
                    });

                    it('uses pixels when width and percent width are specified', function () {
                        var cfg = createWidthConfig(299, 50);
                        expect(cfg.getWidthStyle()).toEqual('299px');
                    });
                });

                describe('getObjectValue', function () {
                    var objectUtilService = undefined;

                    beforeEach(inject(function (_objectUtilService_) {
                        objectUtilService = _objectUtilService_;
                        spyOn(objectUtilService, 'getObjectValue').and.callThrough();
                    }));

                    it('calls through to objectUtilService', function () {
                        var dataObject = {
                            getFoo: function () {
                                return 'bar';
                            }
                        },
                            columnConfig = new ColumnConfig(minimumConfig);
                        var objectValue = columnConfig.getObjectValue(dataObject);
                        expect(objectValue).toBe('bar');
                        expect(objectUtilService.getObjectValue).toHaveBeenCalledWith(dataObject, columnConfig.getDataIndex());
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb25maWcvQ29sdW1uQ29uZmlnVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtCQUErQixVQUFVLFNBQVM7Ozs7Ozs7SUFDOUY7O0lBUUksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZO1lBSjdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJO29CQUFjO29CQUNkLGdCQUFnQjtvQkFDWixXQUFXOztvQkFFZixhQUFhO29CQUNULFdBQVc7b0JBQ1gsT0FBTztvQkFDUCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsV0FBVztvQkFDWCxVQUFVO29CQUNWLFFBQVE7b0JBQ1IsT0FBTztvQkFDUCxjQUFjO29CQUNkLE9BQU87OztnQkFHZixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxnQkFBZ0I7b0JBQ3ZDLGVBQWU7OztnQkFJbkIsU0FBUyxnQkFBZ0IsY0FBYztvQkFDbkMsT0FBTyxjQUFjO29CQUNyQixPQUFPLGFBQWEsZ0JBQWdCLEtBQUs7b0JBQ3pDLE9BQU8sYUFBYSxZQUFZLEtBQUs7b0JBQ3JDLE9BQU8sYUFBYSxlQUFlLEtBQUs7b0JBQ3hDLE9BQU8sYUFBYSxlQUFlLEtBQUs7b0JBQ3hDLE9BQU8sYUFBYSxnQkFBZ0IsS0FBSztvQkFDekMsT0FBTyxhQUFhLGNBQWMsS0FBSztvQkFDdkMsT0FBTyxhQUFhLFlBQVksS0FBSztvQkFDckMsT0FBTyxhQUFhLFlBQVksUUFBUTtvQkFDeEMsT0FBTyxhQUFhLG1CQUFtQixRQUFRO29CQUMvQyxPQUFPLGFBQWEsWUFBWSxRQUFRLFdBQVc7OztnQkFHdkQsR0FBRyxnREFBZ0QsWUFBVztvQkFDMUQsa0JBQWtCLElBQUksYUFBYTtvQkFDbkMsZ0JBQWdCOzs7Z0JBR3BCLEdBQUcsOENBQThDLFlBQVc7b0JBQ3hELGtCQUFrQixJQUFJLGFBQWE7b0JBQ25DLElBQUksU0FBUyxnQkFBZ0I7b0JBQzdCLGdCQUFnQjs7O2dCQUdwQixHQUFHLG1FQUFtRSxZQUFXO29CQUM3RSxrQkFBa0IsSUFBSSxhQUFhOztvQkFFbkMsT0FBTyxpQkFBaUI7b0JBQ3hCLE9BQU8sZ0JBQWdCLGVBQWUsS0FBSzs7O2dCQUcvQyxHQUFHLG1FQUFtRSxZQUFXO29CQUM3RSxrQkFBa0IsSUFBSSxhQUFhOztvQkFFbkMsT0FBTyxpQkFBaUI7b0JBQ3hCLE9BQU8sZ0JBQWdCLFlBQVksS0FBSyxnQkFBZ0I7OztnQkFHNUQsR0FBRyxvREFBb0QsWUFBVzs7b0JBRTlELFNBQVMsdUJBQXVCO3dCQUM1QixrQkFBa0IsSUFBSTs7O29CQUcxQixPQUFPLHNCQUFzQjs7O2dCQUdqQyxHQUFHLHFEQUFxRCxZQUFXOztvQkFFL0QsU0FBUyx1QkFBdUI7d0JBQzVCLGtCQUFrQixJQUFJLGFBQWE7OztvQkFHdkMsT0FBTyxzQkFBc0I7OztnQkFHakMsR0FBRyxrRUFBa0UsWUFBVztvQkFDNUUsa0JBQWtCLElBQUksYUFBYTs7b0JBRW5DLE9BQU8saUJBQWlCO29CQUN4QixPQUFPLGdCQUFnQixjQUFjLEtBQUs7OztnQkFHOUMsR0FBRyxnRUFBZ0UsWUFBVztvQkFDMUUsa0JBQWtCLElBQUksYUFBYTtvQkFDbkMsT0FBTyxnQkFBZ0IsWUFBWSxRQUFROzs7Z0JBRy9DLFNBQVMsYUFBYSxXQUFXLFFBQVE7b0JBQ3JDLElBQUksT0FBTyxRQUFRLEtBQUs7b0JBQ3hCLEtBQUssWUFBWTtvQkFDakIsS0FBSyxTQUFTO29CQUNkLE9BQU8sSUFBSSxhQUFhOzs7Z0JBRzVCLFNBQVMsYUFBYSxZQUFXO29CQUM3QixHQUFHLDhDQUE4QyxZQUFXO3dCQUN4RCxrQkFBa0IsYUFBYSxPQUFPO3dCQUN0QyxPQUFPLGdCQUFnQixlQUFlLFFBQVE7OztvQkFHbEQsR0FBRyw0QkFBNEIsWUFBVzt3QkFDdEMsa0JBQWtCLGFBQWEsTUFBTTt3QkFDckMsT0FBTyxnQkFBZ0IsZUFBZSxRQUFROzs7b0JBR2xELEdBQUcsd0JBQXdCLFlBQVc7d0JBQ2xDLGtCQUFrQixhQUFhLE9BQU87d0JBQ3RDLE9BQU8sZ0JBQWdCLGVBQWUsUUFBUTs7OztnQkFJdEQsU0FBUyxrQkFBa0IsT0FBTyxjQUFjO29CQUM1QyxJQUFJLE9BQU87d0JBQ1AsV0FBVzs7b0JBRWYsSUFBSSxPQUFPO3dCQUNQLEtBQUssUUFBUTs7b0JBRWpCLElBQUksY0FBYzt3QkFDZCxLQUFLLGVBQWU7O29CQUV4QixPQUFPLElBQUksYUFBYTs7O2dCQUc1QixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsSUFBSSxNQUFNLGtCQUFrQixNQUFNO3dCQUNsQyxPQUFPLElBQUksaUJBQWlCOzs7b0JBR2hDLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELElBQUksTUFBTSxrQkFBa0IsS0FBSzt3QkFDakMsT0FBTyxJQUFJLGlCQUFpQixRQUFROzs7b0JBR3hDLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELElBQUksTUFBTSxrQkFBa0IsTUFBTTt3QkFDbEMsT0FBTyxJQUFJLGlCQUFpQixRQUFROzs7b0JBR3hDLEdBQUcsMERBQTBELFlBQVc7d0JBQ3BFLElBQUksTUFBTSxrQkFBa0IsS0FBSzt3QkFDakMsT0FBTyxJQUFJLGlCQUFpQixRQUFROzs7O2dCQUk1QyxTQUFTLGtCQUFrQixZQUFNO29CQUM3QixJQUFJLG9CQUFpQjs7b0JBRXJCLFdBQVcsT0FBTyxVQUFDLHFCQUF3Qjt3QkFDdkMsb0JBQW9CO3dCQUNwQixNQUFNLG1CQUFtQixrQkFBa0IsSUFBSTs7O29CQUduRCxHQUFHLHNDQUFzQyxZQUFNO3dCQUMzQyxJQUFJLGFBQWE7NEJBQ1QsUUFBUSxZQUFXO2dDQUNmLE9BQU87Ozs0QkFHZixlQUFlLElBQUksYUFBYTt3QkFDcEMsSUFBSSxjQUFjLGFBQWEsZUFBZTt3QkFDOUMsT0FBTyxhQUFhLEtBQUs7d0JBQ3pCLE9BQU8sa0JBQWtCLGdCQUFnQixxQkFBcUIsWUFBWSxhQUFhOzs7Ozs7R0FXaEciLCJmaWxlIjoiY29tbW9uL2NvbmZpZy9Db2x1bW5Db25maWdUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjb25maWdNb2R1bGUgZnJvbSAnY29tbW9uL2NvbmZpZy9Db25maWdNb2R1bGUnO1xuXG4vKipcbiAqIEBhdXRob3I6IG1pY2hhZWwuaGlkZVxuICogQ3JlYXRlZDogOC8yOC8xNCAyOjMyIFBNXG4gKi9cbmRlc2NyaWJlKCdDb2x1bW5Db25maWcnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBDb2x1bW5Db25maWcsIHRtcENvbHVtbkNvbmZpZyxcbiAgICAgICAgbWluaW11bUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2ZvbydcbiAgICAgICAgfSxcbiAgICAgICAgZnVsbENvbmZpZyA9IHtcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2ZvbycsXG4gICAgICAgICAgICBsYWJlbDogJ0ZPTyBCQVInLFxuICAgICAgICAgICAgZmllbGRPbmx5OiB0cnVlLFxuICAgICAgICAgICAgcmVuZGVyZXI6ICdyaXNrJyxcbiAgICAgICAgICAgIGRhdGVTdHlsZTogJ2xvbmcnLFxuICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgcGVyY2VudFdpZHRoOiAyNSxcbiAgICAgICAgICAgIGZpeGVkOiAnTGVmdCdcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNvbmZpZ01vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NvbHVtbkNvbmZpZ18pIHtcbiAgICAgICAgQ29sdW1uQ29uZmlnID0gX0NvbHVtbkNvbmZpZ187XG4gICAgfSkpO1xuXG5cbiAgICBmdW5jdGlvbiBjaGVja0Z1bGxDb25maWcoY29sdW1uQ29uZmlnKSB7XG4gICAgICAgIGV4cGVjdChjb2x1bW5Db25maWcpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChjb2x1bW5Db25maWcuZ2V0RGF0YUluZGV4KCkpLnRvQmUoJ2ZvbycpO1xuICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnLmdldExhYmVsKCkpLnRvQmUoJ0ZPTyBCQVInKTtcbiAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZy5pc0ZpZWxkT25seSgpKS50b0JlKHRydWUpO1xuICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnLmdldFJlbmRlcmVyKCkpLnRvQmUoJ3Jpc2snKTtcbiAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZy5nZXREYXRlU3R5bGUoKSkudG9CZSgnbG9uZycpO1xuICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnLmlzU29ydGFibGUoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZy5pc0hpZGRlbigpKS50b0JlKHRydWUpO1xuICAgICAgICBleHBlY3QoY29sdW1uQ29uZmlnLmdldFdpZHRoKCkpLnRvRXF1YWwoMTAwKTtcbiAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZy5nZXRQZXJjZW50V2lkdGgoKSkudG9FcXVhbCgyNSk7XG4gICAgICAgIGV4cGVjdChjb2x1bW5Db25maWcuZ2V0Rml4ZWQoKSkudG9FcXVhbChmdWxsQ29uZmlnLmZpeGVkKTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIGluc3RhbnRpYXRlIHdpdGggYSB3ZWxsIGZvcm1lZCBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdG1wQ29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhmdWxsQ29uZmlnKTtcbiAgICAgICAgY2hlY2tGdWxsQ29uZmlnKHRtcENvbHVtbkNvbmZpZyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xvbmVzIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBjb2x1bW4gY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRtcENvbHVtbkNvbmZpZyA9IG5ldyBDb2x1bW5Db25maWcoZnVsbENvbmZpZyk7XG4gICAgICAgIGxldCBjbG9uZWQgPSB0bXBDb2x1bW5Db25maWcuY2xvbmUoKTtcbiAgICAgICAgY2hlY2tGdWxsQ29uZmlnKGNsb25lZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGluc3RhbnRpYXRlIHdpdGggZmllbGRPbmx5IHNldCB0byBmYWxzZSBpZiBub3QgaW4gY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRtcENvbHVtbkNvbmZpZyA9IG5ldyBDb2x1bW5Db25maWcobWluaW11bUNvbmZpZyk7XG5cbiAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZykudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZy5pc0ZpZWxkT25seSgpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW5zdGFudGlhdGUgd2l0aCBsYWJlbCBzZXQgdG8gZGF0YUluZGV4IGlmIG5vdCBpbiBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdG1wQ29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhtaW5pbXVtQ29uZmlnKTtcblxuICAgICAgICBleHBlY3QodG1wQ29sdW1uQ29uZmlnKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QodG1wQ29sdW1uQ29uZmlnLmdldExhYmVsKCkpLnRvQmUodG1wQ29sdW1uQ29uZmlnLmdldERhdGFJbmRleCgpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2l0aCBubyBjb25zdHJ1Y3RvciBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV3JhcCBpbnN0YW50aWF0aW9uIGluIGEgZnVuY3Rpb24gdG8gdGVzdCBpZiBpdCB0aHJvd3NcbiAgICAgICAgZnVuY3Rpb24gZXJyb3JGdW5jdGlvbldyYXBwZXIoKSB7XG4gICAgICAgICAgICB0bXBDb2x1bW5Db25maWcgPSBuZXcgQ29sdW1uQ29uZmlnKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QoZXJyb3JGdW5jdGlvbldyYXBwZXIpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2l0aCBubyBkYXRhSW5kZXggaW4gY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdyYXAgaW5zdGFudGlhdGlvbiBpbiBhIGZ1bmN0aW9uIHRvIHRlc3QgaWYgaXQgdGhyb3dzXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yRnVuY3Rpb25XcmFwcGVyKCkge1xuICAgICAgICAgICAgdG1wQ29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QoZXJyb3JGdW5jdGlvbldyYXBwZXIpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW5zdGFudGlhdGUgd2l0aCBzb3J0YWJsZSBzZXQgdG8gZmFsc2UgaWYgbm90IGluIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0bXBDb2x1bW5Db25maWcgPSBuZXcgQ29sdW1uQ29uZmlnKG1pbmltdW1Db25maWcpO1xuXG4gICAgICAgIGV4cGVjdCh0bXBDb2x1bW5Db25maWcpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdCh0bXBDb2x1bW5Db25maWcuaXNTb3J0YWJsZSgpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaW5zdGFudGlhdGUgd2l0aCBoaWRkZW4gc2V0IHRvIGZhbHNlIGlmIG5vdCBpbiBjb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdG1wQ29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhtaW5pbXVtQ29uZmlnKTtcbiAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZy5pc0hpZGRlbigpKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbmZpZyhmaWVsZE9ubHksIGhpZGRlbikge1xuICAgICAgICBsZXQgZGF0YSA9IGFuZ3VsYXIuY29weShmdWxsQ29uZmlnKTtcbiAgICAgICAgZGF0YS5maWVsZE9ubHkgPSBmaWVsZE9ubHk7XG4gICAgICAgIGRhdGEuaGlkZGVuID0gaGlkZGVuO1xuICAgICAgICByZXR1cm4gbmV3IENvbHVtbkNvbmZpZyhkYXRhKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZGlzcGxheWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpcyB0cnVlIHdoZW4gbm90IGZpZWxkIG9ubHkgYW5kIG5vdCBoaWRkZW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRtcENvbHVtbkNvbmZpZyA9IGNyZWF0ZUNvbmZpZyhmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZy5pc0Rpc3BsYXllZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXMgZmFsc2Ugd2hlbiBmaWVsZCBvbmx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0bXBDb2x1bW5Db25maWcgPSBjcmVhdGVDb25maWcodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZy5pc0Rpc3BsYXllZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gaGlkZGVuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0bXBDb2x1bW5Db25maWcgPSBjcmVhdGVDb25maWcoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KHRtcENvbHVtbkNvbmZpZy5pc0Rpc3BsYXllZCgpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXaWR0aENvbmZpZyh3aWR0aCwgcGVyY2VudFdpZHRoKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgZGF0YUluZGV4OiAnMSdcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgICBkYXRhLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcmNlbnRXaWR0aCkge1xuICAgICAgICAgICAgZGF0YS5wZXJjZW50V2lkdGggPSBwZXJjZW50V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb2x1bW5Db25maWcoZGF0YSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3dpZHRoIHN0eWxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpcyBudWxsIHdoZW4gbm8gd2lkdGggaXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY2ZnID0gY3JlYXRlV2lkdGhDb25maWcobnVsbCwgbnVsbCk7XG4gICAgICAgICAgICBleHBlY3QoY2ZnLmdldFdpZHRoU3R5bGUoKSkudG9CZU51bGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3VzZXMgcGl4ZWxzIHdoZW4gd2lkdGggaXMgc3BlY2lmaWVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY2ZnID0gY3JlYXRlV2lkdGhDb25maWcoMTUwLCBudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChjZmcuZ2V0V2lkdGhTdHlsZSgpKS50b0VxdWFsKCcxNTBweCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndXNlcyBwZXJjZW50YWdlIHdoZW4gcGVyY2VudCB3aWR0aCBpcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBjcmVhdGVXaWR0aENvbmZpZyhudWxsLCA1MCk7XG4gICAgICAgICAgICBleHBlY3QoY2ZnLmdldFdpZHRoU3R5bGUoKSkudG9FcXVhbCgnNTAlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIHBpeGVscyB3aGVuIHdpZHRoIGFuZCBwZXJjZW50IHdpZHRoIGFyZSBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjZmcgPSBjcmVhdGVXaWR0aENvbmZpZygyOTksIDUwKTtcbiAgICAgICAgICAgIGV4cGVjdChjZmcuZ2V0V2lkdGhTdHlsZSgpKS50b0VxdWFsKCcyOTlweCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRPYmplY3RWYWx1ZScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iamVjdFV0aWxTZXJ2aWNlO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChfb2JqZWN0VXRpbFNlcnZpY2VfKSA9PiB7XG4gICAgICAgICAgICBvYmplY3RVdGlsU2VydmljZSA9IF9vYmplY3RVdGlsU2VydmljZV87XG4gICAgICAgICAgICBzcHlPbihvYmplY3RVdGlsU2VydmljZSwgJ2dldE9iamVjdFZhbHVlJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBvYmplY3RVdGlsU2VydmljZScsICgpID0+IHtcbiAgICAgICAgICAgIHZhciBkYXRhT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBnZXRGb286IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdiYXInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWcgPSBuZXcgQ29sdW1uQ29uZmlnKG1pbmltdW1Db25maWcpO1xuICAgICAgICAgICAgbGV0IG9iamVjdFZhbHVlID0gY29sdW1uQ29uZmlnLmdldE9iamVjdFZhbHVlKGRhdGFPYmplY3QpO1xuICAgICAgICAgICAgZXhwZWN0KG9iamVjdFZhbHVlKS50b0JlKCdiYXInKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RVdGlsU2VydmljZS5nZXRPYmplY3RWYWx1ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZGF0YU9iamVjdCwgY29sdW1uQ29uZmlnLmdldERhdGFJbmRleCgpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
