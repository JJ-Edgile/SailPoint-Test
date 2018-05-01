System.register(['test/js/TestInitializer', 'home/widget/WidgetModule'], function (_export) {
    'use strict';

    var homeWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWidgetModule) {
            homeWidgetModule = _homeWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('Widget', function () {
                var Widget;

                beforeEach(module(homeWidgetModule));

                beforeEach(inject(function (_Widget_) {
                    Widget = _Widget_;
                }));

                describe('constructor', function () {
                    it('explodes with no data', function () {
                        expect(function () {
                            new Widget(null);
                        }).toThrow();
                    });

                    it('reads data into widget', function () {
                        var id = '1234123423525',
                            name = 'aRealLiveWidget',
                            title = 'Look ma ... I\'m a real widget!',
                            widget = new Widget({
                            id: id,
                            name: name,
                            title: title
                        });

                        expect(widget.id).toEqual(id);
                        expect(widget.name).toEqual(name);
                        expect(widget.title).toEqual(title);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L1dpZGdldFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQTVGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsbUJBQW1CLHdCQUF3Qjs7UUFFL0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLFVBQVUsWUFBVztnQkFDMUIsSUFBSTs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsVUFBVTtvQkFDakMsU0FBUzs7O2dCQUdiLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLHlCQUF5QixZQUFXO3dCQUNuQyxPQUFPLFlBQVc7NEJBQUUsSUFBSSxPQUFPOzJCQUFVOzs7b0JBRzdDLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLElBQUksS0FBSzs0QkFDTCxPQUFPOzRCQUNQLFFBQVE7NEJBRVIsU0FBUyxJQUFJLE9BQU87NEJBQ2hCLElBQUk7NEJBQ0osTUFBTTs0QkFDTixPQUFPOzs7d0JBR2YsT0FBTyxPQUFPLElBQUksUUFBUTt3QkFDMUIsT0FBTyxPQUFPLE1BQU0sUUFBUTt3QkFDNUIsT0FBTyxPQUFPLE9BQU8sUUFBUTs7Ozs7O0dBWXRDIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L1dpZGdldFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBob21lV2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L1dpZGdldE1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnV2lkZ2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgV2lkZ2V0O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGhvbWVXaWRnZXRNb2R1bGUgKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1dpZGdldF8pIHtcclxuICAgICAgICBXaWRnZXQgPSBfV2lkZ2V0XztcclxuICAgIH0pKTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgnZXhwbG9kZXMgd2l0aCBubyBkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IFdpZGdldChudWxsKTsgfSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmVhZHMgZGF0YSBpbnRvIHdpZGdldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAnMTIzNDEyMzQyMzUyNScsXHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ2FSZWFsTGl2ZVdpZGdldCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICdMb29rIG1hIC4uLiBJXFwnbSBhIHJlYWwgd2lkZ2V0IScsXHJcblxyXG4gICAgICAgICAgICAgICAgd2lkZ2V0ID0gbmV3IFdpZGdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdCh3aWRnZXQuaWQpLnRvRXF1YWwoaWQpO1xyXG4gICAgICAgICAgICBleHBlY3Qod2lkZ2V0Lm5hbWUpLnRvRXF1YWwobmFtZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh3aWRnZXQudGl0bGUpLnRvRXF1YWwodGl0bGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
