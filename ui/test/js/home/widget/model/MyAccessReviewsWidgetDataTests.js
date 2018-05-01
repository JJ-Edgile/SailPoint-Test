System.register(['test/js/TestInitializer', 'home/widget/model/WidgetModelModule'], function (_export) {
    'use strict';

    var widgetModelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetModelWidgetModelModule) {
            widgetModelModule = _homeWidgetModelWidgetModelModule['default'];
        }],
        execute: function () {

            describe('MyAccessReviewsWidgetData', function () {
                var dueDate = new Date(),
                    data = {
                    id: '1',
                    name: 'foo',
                    completedItems: 10,
                    totalItems: 20,
                    dueDate: dueDate.getTime(),
                    defaultView: 'view'
                },
                    MyAccessReviewsWidgetData;

                beforeEach(module(widgetModelModule));

                beforeEach(inject(function (_MyAccessReviewsWidgetData_) {
                    MyAccessReviewsWidgetData = _MyAccessReviewsWidgetData_;
                }));

                it('should initialize correctly with data', function () {
                    var widgetData = new MyAccessReviewsWidgetData(data);

                    expect(widgetData.id).toEqual(data.id);
                    expect(widgetData.name).toEqual(data.name);
                    expect(widgetData.completedItems).toEqual(data.completedItems);
                    expect(widgetData.totalItems).toEqual(data.totalItems);
                    expect(widgetData.dueDate).toEqual(dueDate);
                    expect(widgetData.defaultView).toEqual(data.defaultView);
                });

                describe('getDueDate', function () {
                    it('should', function () {
                        var widgetData = new MyAccessReviewsWidgetData(data);

                        expect(widgetData.getDueDate()).toEqual(dueDate);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L21vZGVsL015QWNjZXNzUmV2aWV3c1dpZGdldERhdGFUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLFVBQVUsU0FBUztJQUF2Rzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLG9CQUFvQixrQ0FBa0M7O1FBRTFELFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSSxVQUFVLElBQUk7b0JBQ2QsT0FBTztvQkFDSCxJQUFJO29CQUNKLE1BQU07b0JBQ04sZ0JBQWdCO29CQUNoQixZQUFZO29CQUNaLFNBQVMsUUFBUTtvQkFDakIsYUFBYTs7b0JBRWpCOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyw2QkFBNkI7b0JBQ3BELDRCQUE0Qjs7O2dCQUdoQyxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCxJQUFJLGFBQWEsSUFBSSwwQkFBMEI7O29CQUUvQyxPQUFPLFdBQVcsSUFBSSxRQUFRLEtBQUs7b0JBQ25DLE9BQU8sV0FBVyxNQUFNLFFBQVEsS0FBSztvQkFDckMsT0FBTyxXQUFXLGdCQUFnQixRQUFRLEtBQUs7b0JBQy9DLE9BQU8sV0FBVyxZQUFZLFFBQVEsS0FBSztvQkFDM0MsT0FBTyxXQUFXLFNBQVMsUUFBUTtvQkFDbkMsT0FBTyxXQUFXLGFBQWEsUUFBUSxLQUFLOzs7Z0JBR2hELFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLFVBQVUsWUFBVzt3QkFDcEIsSUFBSSxhQUFhLElBQUksMEJBQTBCOzt3QkFFL0MsT0FBTyxXQUFXLGNBQWMsUUFBUTs7Ozs7O0dBV2pEIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L21vZGVsL015QWNjZXNzUmV2aWV3c1dpZGdldERhdGFUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgd2lkZ2V0TW9kZWxNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvbW9kZWwvV2lkZ2V0TW9kZWxNb2R1bGUnO1xuXG5kZXNjcmliZSgnTXlBY2Nlc3NSZXZpZXdzV2lkZ2V0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkdWVEYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBuYW1lOiAnZm9vJyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEl0ZW1zOiAxMCxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IDIwLFxuICAgICAgICAgICAgZHVlRGF0ZTogZHVlRGF0ZS5nZXRUaW1lKCksXG4gICAgICAgICAgICBkZWZhdWx0VmlldzogJ3ZpZXcnXG4gICAgICAgIH0sXG4gICAgICAgIE15QWNjZXNzUmV2aWV3c1dpZGdldERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2RlbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX015QWNjZXNzUmV2aWV3c1dpZGdldERhdGFfKSB7XG4gICAgICAgIE15QWNjZXNzUmV2aWV3c1dpZGdldERhdGEgPSBfTXlBY2Nlc3NSZXZpZXdzV2lkZ2V0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIGNvcnJlY3RseSB3aXRoIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpZGdldERhdGEgPSBuZXcgTXlBY2Nlc3NSZXZpZXdzV2lkZ2V0RGF0YShkYXRhKTtcblxuICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YS5pZCkudG9FcXVhbChkYXRhLmlkKTtcbiAgICAgICAgZXhwZWN0KHdpZGdldERhdGEubmFtZSkudG9FcXVhbChkYXRhLm5hbWUpO1xuICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YS5jb21wbGV0ZWRJdGVtcykudG9FcXVhbChkYXRhLmNvbXBsZXRlZEl0ZW1zKTtcbiAgICAgICAgZXhwZWN0KHdpZGdldERhdGEudG90YWxJdGVtcykudG9FcXVhbChkYXRhLnRvdGFsSXRlbXMpO1xuICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YS5kdWVEYXRlKS50b0VxdWFsKGR1ZURhdGUpO1xuICAgICAgICBleHBlY3Qod2lkZ2V0RGF0YS5kZWZhdWx0VmlldykudG9FcXVhbChkYXRhLmRlZmF1bHRWaWV3KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREdWVEYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3aWRnZXREYXRhID0gbmV3IE15QWNjZXNzUmV2aWV3c1dpZGdldERhdGEoZGF0YSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh3aWRnZXREYXRhLmdldER1ZURhdGUoKSkudG9FcXVhbChkdWVEYXRlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
