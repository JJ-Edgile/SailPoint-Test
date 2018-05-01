System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationTab', function () {

                var CertificationTab = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationTab_) {
                    CertificationTab = _CertificationTab_;
                }));

                describe('constructor', function () {
                    it('sets properties', function () {
                        var config = {
                            name: 'name',
                            title: 'title',
                            tables: [],
                            isHiddenFunc: function () {
                                return 'hi mom';
                            },
                            sticky: false,
                            showCount: false
                        };

                        var tab = new CertificationTab(config);
                        expect(tab.name).toEqual(config.name);
                        expect(tab.title).toEqual(config.title);
                        expect(tab.tables).toEqual(config.tables);
                        expect(tab.isHiddenFunc).toEqual(config.isHiddenFunc);
                        expect(tab.sticky).toEqual(config.sticky);
                        expect(tab.showCount).toEqual(config.showCount);
                    });

                    it('sets table name to tab name if not specified', function () {
                        var table1 = {},
                            table2 = {},
                            config = {
                            name: name,
                            tables: [table1, table2]
                        };
                        var tab = new CertificationTab(config);
                        expect(tab.tables.length).toEqual(2);
                        expect(table1.name).toEqual(config.name);
                        expect(table2.name).toEqual(config.name);
                    });
                });

                describe('isHidden()', function () {
                    var isHidden = undefined,
                        isHiddenFunc = undefined;

                    beforeEach(function () {
                        isHidden = false;
                        isHiddenFunc = jasmine.createSpy().and.callFake(function () {
                            return isHidden;
                        });
                    });

                    it('returns false if there is no hidden func', function () {
                        var tab = new CertificationTab({});
                        expect(tab.isHidden()).toEqual(false);
                    });

                    it('returns result of hidden func when tab is not sticky', function () {
                        var tab = new CertificationTab({
                            isHiddenFunc: isHiddenFunc
                        });
                        expect(tab.isHidden()).toEqual(false);
                        isHidden = true;
                        expect(tab.isHidden()).toEqual(true);
                    });

                    it('returns false if a sticky tab is now hidden according to the func', function () {
                        var tab = new CertificationTab({
                            isHiddenFunc: isHiddenFunc,
                            sticky: true
                        });
                        expect(tab.isHidden()).toEqual(false);
                        isHidden = true;
                        expect(tab.isHidden()).toEqual(false);
                    });
                });

                it('getCount() adds counts from all tables', function () {
                    var table = {
                        getCount: jasmine.createSpy().and.returnValue(2)
                    };
                    var tab = new CertificationTab({
                        tables: [table, table, table, table]
                    });
                    var count = tab.getCount({});
                    expect(table.getCount.calls.count()).toEqual(4);
                    expect(count).toEqual(8);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRhYlRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTO0lBQ2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLG9CQUFvQixZQUFNOztnQkFFL0IsSUFBSSxtQkFBZ0I7O2dCQUVwQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxvQkFBdUI7b0JBQ3RDLG1CQUFtQjs7O2dCQUd2QixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyxtQkFBbUIsWUFBTTt3QkFDeEIsSUFBSSxTQUFTOzRCQUNULE1BQU07NEJBQ04sT0FBTzs0QkFDUCxRQUFROzRCQUNSLGNBQWMsWUFBQTtnQ0FRRSxPQVJJOzs0QkFDcEIsUUFBUTs0QkFDUixXQUFXOzs7d0JBR2YsSUFBSSxNQUFNLElBQUksaUJBQWlCO3dCQUMvQixPQUFPLElBQUksTUFBTSxRQUFRLE9BQU87d0JBQ2hDLE9BQU8sSUFBSSxPQUFPLFFBQVEsT0FBTzt3QkFDakMsT0FBTyxJQUFJLFFBQVEsUUFBUSxPQUFPO3dCQUNsQyxPQUFPLElBQUksY0FBYyxRQUFRLE9BQU87d0JBQ3hDLE9BQU8sSUFBSSxRQUFRLFFBQVEsT0FBTzt3QkFDbEMsT0FBTyxJQUFJLFdBQVcsUUFBUSxPQUFPOzs7b0JBR3pDLEdBQUcsZ0RBQWdELFlBQU07d0JBQ3JELElBQUksU0FBUzs0QkFDVCxTQUFTOzRCQUNULFNBQVM7NEJBQ0wsTUFBTTs0QkFDTixRQUFRLENBQUUsUUFBUTs7d0JBRTFCLElBQUksTUFBTSxJQUFJLGlCQUFpQjt3QkFDL0IsT0FBTyxJQUFJLE9BQU8sUUFBUSxRQUFRO3dCQUNsQyxPQUFPLE9BQU8sTUFBTSxRQUFRLE9BQU87d0JBQ25DLE9BQU8sT0FBTyxNQUFNLFFBQVEsT0FBTzs7OztnQkFJM0MsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLElBQUksV0FBUTt3QkFBRSxlQUFZOztvQkFFMUIsV0FBVyxZQUFNO3dCQUNiLFdBQVc7d0JBQ1gsZUFBZSxRQUFRLFlBQVksSUFBSSxTQUFTLFlBQUE7NEJBV2hDLE9BWHNDOzs7O29CQUcxRCxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxJQUFJLE1BQU0sSUFBSSxpQkFBaUI7d0JBQy9CLE9BQU8sSUFBSSxZQUFZLFFBQVE7OztvQkFHbkMsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsSUFBSSxNQUFNLElBQUksaUJBQWlCOzRCQUMzQixjQUFjOzt3QkFFbEIsT0FBTyxJQUFJLFlBQVksUUFBUTt3QkFDL0IsV0FBVzt3QkFDWCxPQUFPLElBQUksWUFBWSxRQUFROzs7b0JBR25DLEdBQUcscUVBQXFFLFlBQU07d0JBQzFFLElBQUksTUFBTSxJQUFJLGlCQUFpQjs0QkFDM0IsY0FBYzs0QkFDZCxRQUFROzt3QkFFWixPQUFPLElBQUksWUFBWSxRQUFRO3dCQUMvQixXQUFXO3dCQUNYLE9BQU8sSUFBSSxZQUFZLFFBQVE7Ozs7Z0JBSXZDLEdBQUcsMENBQTBDLFlBQU07b0JBQy9DLElBQUksUUFBUTt3QkFDUixVQUFVLFFBQVEsWUFBWSxJQUFJLFlBQVk7O29CQUVsRCxJQUFJLE1BQU0sSUFBSSxpQkFBaUI7d0JBQzNCLFFBQVEsQ0FBQyxPQUFPLE9BQU8sT0FBTzs7b0JBRWxDLElBQUksUUFBUSxJQUFJLFNBQVM7b0JBQ3pCLE9BQU8sTUFBTSxTQUFTLE1BQU0sU0FBUyxRQUFRO29CQUM3QyxPQUFPLE9BQU8sUUFBUTs7Ozs7R0FpQjNCIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vbW9kZWwvQ2VydGlmaWNhdGlvblRhYlRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnQ2VydGlmaWNhdGlvblRhYicsICgpID0+IHtcclxuXHJcbiAgICBsZXQgQ2VydGlmaWNhdGlvblRhYjtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9DZXJ0aWZpY2F0aW9uVGFiXykgPT4ge1xyXG4gICAgICAgIENlcnRpZmljYXRpb25UYWIgPSBfQ2VydGlmaWNhdGlvblRhYl87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdzZXRzIHByb3BlcnRpZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgIHRhYmxlczogW10sXHJcbiAgICAgICAgICAgICAgICBpc0hpZGRlbkZ1bmM6ICgpID0+ICdoaSBtb20nLFxyXG4gICAgICAgICAgICAgICAgc3RpY2t5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNob3dDb3VudDogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0YWIgPSBuZXcgQ2VydGlmaWNhdGlvblRhYihjb25maWcpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFiLm5hbWUpLnRvRXF1YWwoY29uZmlnLm5hbWUpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFiLnRpdGxlKS50b0VxdWFsKGNvbmZpZy50aXRsZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWIudGFibGVzKS50b0VxdWFsKGNvbmZpZy50YWJsZXMpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFiLmlzSGlkZGVuRnVuYykudG9FcXVhbChjb25maWcuaXNIaWRkZW5GdW5jKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYi5zdGlja3kpLnRvRXF1YWwoY29uZmlnLnN0aWNreSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuc2hvd0NvdW50KS50b0VxdWFsKGNvbmZpZy5zaG93Q291bnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2V0cyB0YWJsZSBuYW1lIHRvIHRhYiBuYW1lIGlmIG5vdCBzcGVjaWZpZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZTEgPSB7fSxcclxuICAgICAgICAgICAgICAgIHRhYmxlMiA9IHt9LFxyXG4gICAgICAgICAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzOiBbIHRhYmxlMSwgdGFibGUyIF1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCB0YWIgPSBuZXcgQ2VydGlmaWNhdGlvblRhYihjb25maWcpO1xyXG4gICAgICAgICAgICBleHBlY3QodGFiLnRhYmxlcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZTEubmFtZSkudG9FcXVhbChjb25maWcubmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWJsZTIubmFtZSkudG9FcXVhbChjb25maWcubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaXNIaWRkZW4oKScsICgpID0+IHtcclxuICAgICAgICBsZXQgaXNIaWRkZW4sIGlzSGlkZGVuRnVuYztcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzSGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlzSGlkZGVuRnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKCgpID0+IGlzSGlkZGVuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gaGlkZGVuIGZ1bmMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWIgPSBuZXcgQ2VydGlmaWNhdGlvblRhYih7fSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuaXNIaWRkZW4oKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHJlc3VsdCBvZiBoaWRkZW4gZnVuYyB3aGVuIHRhYiBpcyBub3Qgc3RpY2t5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGFiID0gbmV3IENlcnRpZmljYXRpb25UYWIoe1xyXG4gICAgICAgICAgICAgICAgaXNIaWRkZW5GdW5jOiBpc0hpZGRlbkZ1bmNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0YWIuaXNIaWRkZW4oKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgICAgIGlzSGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYi5pc0hpZGRlbigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBhIHN0aWNreSB0YWIgaXMgbm93IGhpZGRlbiBhY2NvcmRpbmcgdG8gdGhlIGZ1bmMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWIgPSBuZXcgQ2VydGlmaWNhdGlvblRhYih7XHJcbiAgICAgICAgICAgICAgICBpc0hpZGRlbkZ1bmM6IGlzSGlkZGVuRnVuYyxcclxuICAgICAgICAgICAgICAgIHN0aWNreTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXhwZWN0KHRhYi5pc0hpZGRlbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICAgICAgaXNIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBleHBlY3QodGFiLmlzSGlkZGVuKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2dldENvdW50KCkgYWRkcyBjb3VudHMgZnJvbSBhbGwgdGFibGVzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCB0YWJsZSA9IHtcclxuICAgICAgICAgICAgZ2V0Q291bnQ6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKDIpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgdGFiID0gbmV3IENlcnRpZmljYXRpb25UYWIoe1xyXG4gICAgICAgICAgICB0YWJsZXM6IFt0YWJsZSwgdGFibGUsIHRhYmxlLCB0YWJsZV1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgY291bnQgPSB0YWIuZ2V0Q291bnQoe30pO1xyXG4gICAgICAgIGV4cGVjdCh0YWJsZS5nZXRDb3VudC5jYWxscy5jb3VudCgpKS50b0VxdWFsKDQpO1xyXG4gICAgICAgIGV4cGVjdChjb3VudCkudG9FcXVhbCg4KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
