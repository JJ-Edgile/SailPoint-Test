System.register(['test/js/TestInitializer', 'common/config/ConfigModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var configModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonConfigConfigModule) {
            configModule = _commonConfigConfigModule['default'];
        }],
        execute: function () {

            describe('GaugeConfig', function () {

                var GaugeConfig = undefined,
                    barColor = '#004d1a',
                    trackColor = '#eee',
                    scaleColor = '#d8dde5',
                    lineWidth = 30,
                    lineCap = 'butt',
                    size = 188,
                    animate = 700,
                    loop = false;

                // Use the module.
                beforeEach(module(configModule));

                beforeEach(inject(function (_GaugeConfig_) {
                    GaugeConfig = _GaugeConfig_;
                }));

                describe('constructor', function () {

                    it('should initialize with default data', function () {

                        var newGaugeConfig = new GaugeConfig();
                        expect(newGaugeConfig).toBeDefined();
                        expect(newGaugeConfig.barColor).toBe(barColor);
                        expect(newGaugeConfig.trackColor).toBe(trackColor);
                        expect(newGaugeConfig.scaleColor).toBe(scaleColor);
                        expect(newGaugeConfig.lineWidth).toBe(lineWidth);
                        expect(newGaugeConfig.lineCap).toBe(lineCap);
                        expect(newGaugeConfig.size).toBe(size);
                        expect(newGaugeConfig.animate).toBe(animate);
                        expect(newGaugeConfig.loop).toBe(loop);
                    });

                    it('should initialize with provided data', function () {

                        var newGaugeConfig = new GaugeConfig({
                            lineWidth: 55,
                            size: 100,
                            barColor: '#FFFFFF',
                            trackColor: '#efg777',
                            scaleColor: '#FFFFFF',
                            lineCap: 'round',
                            animate: 800,
                            loop: true
                        });
                        expect(newGaugeConfig).toBeDefined();
                        expect(newGaugeConfig.lineWidth).toBe(55);
                        expect(newGaugeConfig.size).toBe(100);
                        expect(newGaugeConfig.barColor).toBe('#FFFFFF');
                        expect(newGaugeConfig.trackColor).toBe('#efg777');
                        expect(newGaugeConfig.scaleColor).toBe('#FFFFFF');
                        expect(newGaugeConfig.lineCap).toBe('round');
                        expect(newGaugeConfig.animate).toBe(800);
                        expect(newGaugeConfig.loop).toBe(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb25maWcvR2F1Z2VDb25maWdUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUzs7O0lBRzFGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxlQUFlLFlBQVc7O2dCQUUvQixJQUFJLGNBQVc7b0JBQ1gsV0FBVztvQkFDWCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixVQUFVO29CQUNWLE9BQU87b0JBQ1AsVUFBVTtvQkFDVixPQUFPOzs7Z0JBR1gsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsZUFBZTtvQkFDdEMsY0FBYzs7O2dCQUdsQixTQUFTLGVBQWUsWUFBVzs7b0JBRS9CLEdBQUcsdUNBQXVDLFlBQVc7O3dCQUVqRCxJQUFJLGlCQUFpQixJQUFJO3dCQUN6QixPQUFRLGdCQUFnQjt3QkFDeEIsT0FBUSxlQUFlLFVBQVUsS0FBSzt3QkFDdEMsT0FBUSxlQUFlLFlBQVksS0FBSzt3QkFDeEMsT0FBUSxlQUFlLFlBQVksS0FBSzt3QkFDeEMsT0FBUSxlQUFlLFdBQVcsS0FBSzt3QkFDdkMsT0FBUSxlQUFlLFNBQVMsS0FBSzt3QkFDckMsT0FBUSxlQUFlLE1BQU0sS0FBSzt3QkFDbEMsT0FBUSxlQUFlLFNBQVMsS0FBSzt3QkFDckMsT0FBUSxlQUFlLE1BQU0sS0FBSzs7O29CQUd0QyxHQUFHLHdDQUF3QyxZQUFXOzt3QkFFbEQsSUFBSSxpQkFBaUIsSUFBSSxZQUFZOzRCQUNqQyxXQUFXOzRCQUNYLE1BQU07NEJBQ04sVUFBVTs0QkFDVixZQUFZOzRCQUNaLFlBQVk7NEJBQ1osU0FBUzs0QkFDVCxTQUFTOzRCQUNULE1BQU07O3dCQUVWLE9BQVEsZ0JBQWdCO3dCQUN4QixPQUFRLGVBQWUsV0FBVyxLQUFLO3dCQUN2QyxPQUFRLGVBQWUsTUFBTSxLQUFLO3dCQUNsQyxPQUFRLGVBQWUsVUFBVSxLQUFLO3dCQUN0QyxPQUFRLGVBQWUsWUFBWSxLQUFLO3dCQUN4QyxPQUFRLGVBQWUsWUFBWSxLQUFLO3dCQUN4QyxPQUFRLGVBQWUsU0FBUyxLQUFLO3dCQUNyQyxPQUFRLGVBQWUsU0FBUyxLQUFLO3dCQUNyQyxPQUFRLGVBQWUsTUFBTSxLQUFLOzs7Ozs7R0FhM0MiLCJmaWxlIjoiY29tbW9uL2NvbmZpZy9HYXVnZUNvbmZpZ1Rlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNvbmZpZ01vZHVsZSBmcm9tICdjb21tb24vY29uZmlnL0NvbmZpZ01vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnR2F1Z2VDb25maWcnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgR2F1Z2VDb25maWcsXHJcbiAgICAgICAgYmFyQ29sb3IgPSAnIzAwNGQxYScsXHJcbiAgICAgICAgdHJhY2tDb2xvciA9ICcjZWVlJyxcclxuICAgICAgICBzY2FsZUNvbG9yID0gJyNkOGRkZTUnLFxyXG4gICAgICAgIGxpbmVXaWR0aCA9IDMwLFxyXG4gICAgICAgIGxpbmVDYXAgPSAnYnV0dCcsXHJcbiAgICAgICAgc2l6ZSA9IDE4OCxcclxuICAgICAgICBhbmltYXRlID0gNzAwLFxyXG4gICAgICAgIGxvb3AgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBVc2UgdGhlIG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNvbmZpZ01vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9HYXVnZUNvbmZpZ18pIHtcclxuICAgICAgICBHYXVnZUNvbmZpZyA9IF9HYXVnZUNvbmZpZ187XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGRlZmF1bHQgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0dhdWdlQ29uZmlnID0gbmV3IEdhdWdlQ29uZmlnKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuYmFyQ29sb3IpLnRvQmUoYmFyQ29sb3IpO1xyXG4gICAgICAgICAgICBleHBlY3QgKG5ld0dhdWdlQ29uZmlnLnRyYWNrQ29sb3IpLnRvQmUodHJhY2tDb2xvcik7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuc2NhbGVDb2xvcikudG9CZShzY2FsZUNvbG9yKTtcclxuICAgICAgICAgICAgZXhwZWN0IChuZXdHYXVnZUNvbmZpZy5saW5lV2lkdGgpLnRvQmUobGluZVdpZHRoKTtcclxuICAgICAgICAgICAgZXhwZWN0IChuZXdHYXVnZUNvbmZpZy5saW5lQ2FwKS50b0JlKGxpbmVDYXApO1xyXG4gICAgICAgICAgICBleHBlY3QgKG5ld0dhdWdlQ29uZmlnLnNpemUpLnRvQmUoc2l6ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuYW5pbWF0ZSkudG9CZShhbmltYXRlKTtcclxuICAgICAgICAgICAgZXhwZWN0IChuZXdHYXVnZUNvbmZpZy5sb29wKS50b0JlKGxvb3ApO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHdpdGggcHJvdmlkZWQgZGF0YScsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld0dhdWdlQ29uZmlnID0gbmV3IEdhdWdlQ29uZmlnKHtcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogNTUsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBiYXJDb2xvcjogJyNGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tDb2xvcjogJyNlZmc3NzcnLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVDb2xvcjogJyNGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgbGluZUNhcDogJ3JvdW5kJyxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGU6IDgwMCxcclxuICAgICAgICAgICAgICAgIGxvb3A6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcubGluZVdpZHRoKS50b0JlKDU1KTtcclxuICAgICAgICAgICAgZXhwZWN0IChuZXdHYXVnZUNvbmZpZy5zaXplKS50b0JlKDEwMCk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuYmFyQ29sb3IpLnRvQmUoJyNGRkZGRkYnKTtcclxuICAgICAgICAgICAgZXhwZWN0IChuZXdHYXVnZUNvbmZpZy50cmFja0NvbG9yKS50b0JlKCcjZWZnNzc3Jyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuc2NhbGVDb2xvcikudG9CZSgnI0ZGRkZGRicpO1xyXG4gICAgICAgICAgICBleHBlY3QgKG5ld0dhdWdlQ29uZmlnLmxpbmVDYXApLnRvQmUoJ3JvdW5kJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdCAobmV3R2F1Z2VDb25maWcuYW5pbWF0ZSkudG9CZSg4MDApO1xyXG4gICAgICAgICAgICBleHBlY3QgKG5ld0dhdWdlQ29uZmlnLmxvb3ApLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
