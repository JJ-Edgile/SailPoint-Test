System.register(['test/js/TestInitializer', 'home/widget/model/WidgetModelModule'], function (_export) {
    'use strict';

    var widgetModelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetModelWidgetModelModule) {
            widgetModelModule = _homeWidgetModelWidgetModelModule['default'];
        }],
        execute: function () {

            describe('CertificationWidgetData', function () {
                var dueDate = new Date(),
                    data = {
                    id: '1',
                    name: 'foo',
                    completedItems: 10,
                    totalItems: 20,
                    dueDate: dueDate.getTime()
                },
                    CertificationWidgetData;

                beforeEach(module(widgetModelModule));

                beforeEach(inject(function (_CertificationWidgetData_) {
                    CertificationWidgetData = _CertificationWidgetData_;
                }));

                it('should initialize correctly with data', function () {
                    var widgetData = new CertificationWidgetData(data);

                    expect(widgetData.id).toEqual(data.id);
                    expect(widgetData.name).toEqual(data.name);
                    expect(widgetData.completedItems).toEqual(data.completedItems);
                    expect(widgetData.totalItems).toEqual(data.totalItems);
                    expect(widgetData.dueDate).toEqual(dueDate);
                });

                describe('getDueDate', function () {
                    it('should return the due date', function () {
                        var widgetData = new CertificationWidgetData(data);

                        expect(widgetData.getDueDate()).toEqual(dueDate);
                    });

                    it('should return null with no due date', function () {
                        var dataCopy = angular.copy(data),
                            widgetData = undefined;

                        delete dataCopy.dueDate;
                        widgetData = new CertificationWidgetData(dataCopy);

                        expect(widgetData.getDueDate()).toBeNull();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L21vZGVsL0NlcnRpZmljYXRpb25XaWRnZXREYXRhVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHdDQUF3QyxVQUFVLFNBQVM7SUFBdkc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixvQkFBb0Isa0NBQWtDOztRQUUxRCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsMkJBQTJCLFlBQVc7Z0JBQzNDLElBQUksVUFBVSxJQUFJO29CQUNkLE9BQU87b0JBQ0gsSUFBSTtvQkFDSixNQUFNO29CQUNOLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixTQUFTLFFBQVE7O29CQUVyQjs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsMkJBQTJCO29CQUNsRCwwQkFBMEI7OztnQkFHOUIsR0FBRyx5Q0FBeUMsWUFBVztvQkFDbkQsSUFBSSxhQUFhLElBQUksd0JBQXdCOztvQkFFN0MsT0FBTyxXQUFXLElBQUksUUFBUSxLQUFLO29CQUNuQyxPQUFPLFdBQVcsTUFBTSxRQUFRLEtBQUs7b0JBQ3JDLE9BQU8sV0FBVyxnQkFBZ0IsUUFBUSxLQUFLO29CQUMvQyxPQUFPLFdBQVcsWUFBWSxRQUFRLEtBQUs7b0JBQzNDLE9BQU8sV0FBVyxTQUFTLFFBQVE7OztnQkFHdkMsU0FBUyxjQUFjLFlBQVc7b0JBQzlCLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLElBQUksYUFBYSxJQUFJLHdCQUF3Qjs7d0JBRTdDLE9BQU8sV0FBVyxjQUFjLFFBQVE7OztvQkFHNUMsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsSUFBSSxXQUFXLFFBQVEsS0FBSzs0QkFDeEIsYUFBVTs7d0JBRWQsT0FBTyxTQUFTO3dCQUNoQixhQUFhLElBQUksd0JBQXdCOzt3QkFFekMsT0FBTyxXQUFXLGNBQWM7Ozs7OztHQVd6QyIsImZpbGUiOiJob21lL3dpZGdldC9tb2RlbC9DZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2RlbE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9tb2RlbC9XaWRnZXRNb2RlbE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkdWVEYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBuYW1lOiAnZm9vJyxcbiAgICAgICAgICAgIGNvbXBsZXRlZEl0ZW1zOiAxMCxcbiAgICAgICAgICAgIHRvdGFsSXRlbXM6IDIwLFxuICAgICAgICAgICAgZHVlRGF0ZTogZHVlRGF0ZS5nZXRUaW1lKClcbiAgICAgICAgfSxcbiAgICAgICAgQ2VydGlmaWNhdGlvbldpZGdldERhdGE7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2RlbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0NlcnRpZmljYXRpb25XaWRnZXREYXRhXykge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YSA9IF9DZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIGNvcnJlY3RseSB3aXRoIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpZGdldERhdGEgPSBuZXcgQ2VydGlmaWNhdGlvbldpZGdldERhdGEoZGF0YSk7XG5cbiAgICAgICAgZXhwZWN0KHdpZGdldERhdGEuaWQpLnRvRXF1YWwoZGF0YS5pZCk7XG4gICAgICAgIGV4cGVjdCh3aWRnZXREYXRhLm5hbWUpLnRvRXF1YWwoZGF0YS5uYW1lKTtcbiAgICAgICAgZXhwZWN0KHdpZGdldERhdGEuY29tcGxldGVkSXRlbXMpLnRvRXF1YWwoZGF0YS5jb21wbGV0ZWRJdGVtcyk7XG4gICAgICAgIGV4cGVjdCh3aWRnZXREYXRhLnRvdGFsSXRlbXMpLnRvRXF1YWwoZGF0YS50b3RhbEl0ZW1zKTtcbiAgICAgICAgZXhwZWN0KHdpZGdldERhdGEuZHVlRGF0ZSkudG9FcXVhbChkdWVEYXRlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXREdWVEYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBkdWUgZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHdpZGdldERhdGEgPSBuZXcgQ2VydGlmaWNhdGlvbldpZGdldERhdGEoZGF0YSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh3aWRnZXREYXRhLmdldER1ZURhdGUoKSkudG9FcXVhbChkdWVEYXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCB3aXRoIG5vIGR1ZSBkYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUNvcHkgPSBhbmd1bGFyLmNvcHkoZGF0YSksXG4gICAgICAgICAgICAgICAgd2lkZ2V0RGF0YTtcblxuICAgICAgICAgICAgZGVsZXRlIGRhdGFDb3B5LmR1ZURhdGU7XG4gICAgICAgICAgICB3aWRnZXREYXRhID0gbmV3IENlcnRpZmljYXRpb25XaWRnZXREYXRhKGRhdGFDb3B5KTtcblxuICAgICAgICAgICAgZXhwZWN0KHdpZGdldERhdGEuZ2V0RHVlRGF0ZSgpKS50b0JlTnVsbCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
