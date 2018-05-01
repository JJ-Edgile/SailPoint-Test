System.register(['test/js/TestInitializer', 'common/dataview/column/ColumnModule'], function (_export) {
    'use strict';

    var columnModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewColumnColumnModule) {
            columnModule = _commonDataviewColumnColumnModule['default'];
        }],
        execute: function () {

            describe('ColumnDataDirectiveCtrl', function () {
                var model = {
                    git: 'jiggy'
                },
                    $controller = undefined,
                    configData = undefined,
                    config = undefined,
                    filter1 = undefined,
                    filter2 = undefined,
                    columnConfigService = undefined;

                beforeEach(module(columnModule));

                beforeEach(inject(function (_$controller_, _columnConfigService_, ColumnConfig) {
                    $controller = _$controller_;
                    columnConfigService = _columnConfigService_;

                    // Setup a column config to test with.
                    configData = {
                        dataIndex: 'git'
                    };
                    config = new ColumnConfig(configData);

                    // Create a couple of fake filters to test with.
                    var module = angular.module(columnModule);
                    filter1 = jasmine.createSpy('filter1').and.callFake(function (value) {
                        return 'filter1Value';
                    });
                    filter2 = jasmine.createSpy('filter2').and.callFake(function (value) {
                        return 'filter2Value';
                    });
                    module.filter('filter1', function () {
                        return filter1;
                    });
                    module.filter('filter2', function () {
                        return filter2;
                    });
                }));

                function getController(colConfig, model) {
                    return $controller('ColumnDataDirectiveCtrl', {
                        columnConfigService: columnConfigService
                    }, {
                        spColumnConfig: colConfig,
                        spModel: model
                    });
                }

                describe('initialization', function () {
                    it('throws with no column config', function () {
                        expect(function () {
                            var ctrl = getController(null, model);
                            ctrl.$onInit();
                        }).toThrow();
                    });

                    it('throws with no model', function () {
                        expect(function () {
                            var ctrl = getController(config, null);
                            ctrl.$onInit();
                        }).toThrow();
                    });
                });

                it('getFilteredValue() calls a chain of filters with the object value', function () {
                    // Setup the renderer and spy to return these as filters.
                    config.renderer = 'filter1, filter2';
                    spyOn(columnConfigService, 'getFilteredValue').and.returnValue('filter2Value');

                    var ctrl = getController(config, model),
                        filtered = ctrl.getFilteredValue();
                    expect(columnConfigService.getFilteredValue).toHaveBeenCalledWith(model, config, undefined);
                    expect(filtered).toEqual('filter2Value');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9jb2x1bW4vQ29sdW1uRGF0YURpcmVjdGl2ZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLFVBQVUsU0FBUztJQUF2Rzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLGVBQWUsa0NBQWtDOztRQUVyRCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsMkJBQTJCLFlBQVc7Z0JBQzNDLElBQUksUUFBUTtvQkFDSixLQUFLOztvQkFFVCxjQUFXO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxVQUFPO29CQUFFLFVBQU87b0JBQUUsc0JBQW1COztnQkFFMUUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSx1QkFBdUIsY0FBYztvQkFDM0UsY0FBYztvQkFDZCxzQkFBc0I7OztvQkFHdEIsYUFBYTt3QkFDVCxXQUFXOztvQkFFZixTQUFTLElBQUksYUFBYTs7O29CQUcxQixJQUFNLFNBQVMsUUFBUSxPQUFPO29CQUM5QixVQUFVLFFBQVEsVUFBVSxXQUFXLElBQUksU0FBUyxVQUFDLE9BQUs7d0JBVzFDLE9BWCtDOztvQkFDL0QsVUFBVSxRQUFRLFVBQVUsV0FBVyxJQUFJLFNBQVMsVUFBQyxPQUFLO3dCQWExQyxPQWIrQzs7b0JBQy9ELE9BQU8sT0FBTyxXQUFXLFlBQUE7d0JBZVQsT0FmZTs7b0JBQy9CLE9BQU8sT0FBTyxXQUFXLFlBQUE7d0JBaUJULE9BakJlOzs7O2dCQUduQyxTQUFTLGNBQWMsV0FBVyxPQUFPO29CQUNyQyxPQUFPLFlBQVksMkJBQTJCO3dCQUN0QyxxQkFBcUI7dUJBQ3RCO3dCQUNDLGdCQUFnQjt3QkFDaEIsU0FBUzs7OztnQkFJckIsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxZQUFNOzRCQUNULElBQUksT0FBTyxjQUFjLE1BQU07NEJBQy9CLEtBQUs7MkJBQ047OztvQkFHUCxHQUFHLHdCQUF3QixZQUFXO3dCQUNsQyxPQUFPLFlBQU07NEJBQ1QsSUFBSSxPQUFPLGNBQWMsUUFBUTs0QkFDakMsS0FBSzsyQkFDTjs7OztnQkFJWCxHQUFHLHFFQUFxRSxZQUFXOztvQkFFL0UsT0FBTyxXQUFXO29CQUNsQixNQUFNLHFCQUFxQixvQkFBb0IsSUFBSSxZQUFZOztvQkFFL0QsSUFBSSxPQUFPLGNBQWMsUUFBUTt3QkFDN0IsV0FBVyxLQUFLO29CQUNwQixPQUFPLG9CQUFvQixrQkFBa0IscUJBQXFCLE9BQU8sUUFBUTtvQkFDakYsT0FBTyxVQUFVLFFBQVE7Ozs7O0dBdUI5QiIsImZpbGUiOiJjb21tb24vZGF0YXZpZXcvY29sdW1uL0NvbHVtbkRhdGFEaXJlY3RpdmVDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNvbHVtbk1vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvY29sdW1uL0NvbHVtbk1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQ29sdW1uRGF0YURpcmVjdGl2ZUN0cmwnLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBtb2RlbCA9IHtcclxuICAgICAgICAgICAgZ2l0OiAnamlnZ3knXHJcbiAgICAgICAgfSxcclxuICAgICAgICAkY29udHJvbGxlciwgY29uZmlnRGF0YSwgY29uZmlnLCBmaWx0ZXIxLCBmaWx0ZXIyLCBjb2x1bW5Db25maWdTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNvbHVtbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF9jb2x1bW5Db25maWdTZXJ2aWNlXywgQ29sdW1uQ29uZmlnKSB7XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIGNvbHVtbkNvbmZpZ1NlcnZpY2UgPSBfY29sdW1uQ29uZmlnU2VydmljZV87XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGEgY29sdW1uIGNvbmZpZyB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY29uZmlnRGF0YSA9IHtcclxuICAgICAgICAgICAgZGF0YUluZGV4OiAnZ2l0J1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhjb25maWdEYXRhKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgY291cGxlIG9mIGZha2UgZmlsdGVycyB0byB0ZXN0IHdpdGguXHJcbiAgICAgICAgY29uc3QgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoY29sdW1uTW9kdWxlKTtcclxuICAgICAgICBmaWx0ZXIxID0gamFzbWluZS5jcmVhdGVTcHkoJ2ZpbHRlcjEnKS5hbmQuY2FsbEZha2UoKHZhbHVlKSA9PiAnZmlsdGVyMVZhbHVlJyk7XHJcbiAgICAgICAgZmlsdGVyMiA9IGphc21pbmUuY3JlYXRlU3B5KCdmaWx0ZXIyJykuYW5kLmNhbGxGYWtlKCh2YWx1ZSkgPT4gJ2ZpbHRlcjJWYWx1ZScpO1xyXG4gICAgICAgIG1vZHVsZS5maWx0ZXIoJ2ZpbHRlcjEnLCAoKSA9PiBmaWx0ZXIxKTtcclxuICAgICAgICBtb2R1bGUuZmlsdGVyKCdmaWx0ZXIyJywgKCkgPT4gZmlsdGVyMik7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29udHJvbGxlcihjb2xDb25maWcsIG1vZGVsKSB7XHJcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdDb2x1bW5EYXRhRGlyZWN0aXZlQ3RybCcsIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZ1NlcnZpY2U6IGNvbHVtbkNvbmZpZ1NlcnZpY2VcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgc3BDb2x1bW5Db25maWc6IGNvbENvbmZpZyxcclxuICAgICAgICAgICAgICAgIHNwTW9kZWw6IG1vZGVsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdpbml0aWFsaXphdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjb2x1bW4gY29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGdldENvbnRyb2xsZXIobnVsbCwgbW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIG1vZGVsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGdldENvbnRyb2xsZXIoY29uZmlnLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGN0cmwuJG9uSW5pdCgpO1xyXG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZ2V0RmlsdGVyZWRWYWx1ZSgpIGNhbGxzIGEgY2hhaW4gb2YgZmlsdGVycyB3aXRoIHRoZSBvYmplY3QgdmFsdWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBTZXR1cCB0aGUgcmVuZGVyZXIgYW5kIHNweSB0byByZXR1cm4gdGhlc2UgYXMgZmlsdGVycy5cclxuICAgICAgICBjb25maWcucmVuZGVyZXIgPSAnZmlsdGVyMSwgZmlsdGVyMic7XHJcbiAgICAgICAgc3B5T24oY29sdW1uQ29uZmlnU2VydmljZSwgJ2dldEZpbHRlcmVkVmFsdWUnKS5hbmQucmV0dXJuVmFsdWUoJ2ZpbHRlcjJWYWx1ZScpO1xyXG5cclxuICAgICAgICBsZXQgY3RybCA9IGdldENvbnRyb2xsZXIoY29uZmlnLCBtb2RlbCksXHJcbiAgICAgICAgICAgIGZpbHRlcmVkID0gY3RybC5nZXRGaWx0ZXJlZFZhbHVlKCk7XHJcbiAgICAgICAgZXhwZWN0KGNvbHVtbkNvbmZpZ1NlcnZpY2UuZ2V0RmlsdGVyZWRWYWx1ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9kZWwsIGNvbmZpZywgdW5kZWZpbmVkKTtcclxuICAgICAgICBleHBlY3QoZmlsdGVyZWQpLnRvRXF1YWwoJ2ZpbHRlcjJWYWx1ZScpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
