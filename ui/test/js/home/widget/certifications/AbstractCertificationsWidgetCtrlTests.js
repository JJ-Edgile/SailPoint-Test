System.register(['test/js/TestInitializer', 'home/widget/certifications/CertificationsWidgetModule', 'test/js/common/i18n/MockTranslateFilter', 'test/js/home/widget/certifications/TestCertificationsWidgetCtrl'], function (_export) {
    'use strict';

    var certWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetCertificationsCertificationsWidgetModule) {
            certWidgetModule = _homeWidgetCertificationsCertificationsWidgetModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}, function (_testJsHomeWidgetCertificationsTestCertificationsWidgetCtrl) {}],
        execute: function () {

            describe('AbstractCertificationsWidgetCtrl', function () {
                var $controller,
                    $rootScope,
                    $scope,
                    CertificationWidgetData,
                    slides,
                    slideOne508Text = 'slide1 Due Today 0% ui_gauge_completed',
                    slideTwo508Text = 'slide2 Due Today 20% ui_gauge_completed';

                function getStartDate() {
                    var date = new Date();
                    date.setHours(0);
                    return date;
                }

                beforeEach(module(certWidgetModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, spTranslateFilter, _CertificationWidgetData_) {
                    $controller = _$controller_;
                    $scope = _$rootScope_.$new();
                    $rootScope = _$rootScope_;
                    CertificationWidgetData = _CertificationWidgetData_;

                    spTranslateFilter.configureCatalog({
                        'ui_cert_widget_due_today': 'Due Today'
                    });

                    var start = getStartDate(),
                        testDate = new Date(start);
                    testDate.setHours(start.getHours() + 1);

                    slides = [new CertificationWidgetData({ name: 'slide1', completedItems: 0, totalItems: 10, dueDate: testDate.getTime() }), new CertificationWidgetData({ name: 'slide2', completedItems: 2, totalItems: 10, dueDate: testDate.getTime() }), new CertificationWidgetData({ name: 'slide3', completedItems: 3, totalItems: 10, dueDate: testDate.getTime() }), new CertificationWidgetData({ name: 'slide4', completedItems: 4, totalItems: 10, dueDate: testDate.getTime() }), new CertificationWidgetData({ name: 'slide5', completedItems: 5, totalItems: 10, dueDate: testDate.getTime() })];
                }));

                function createController() {
                    return $controller('TestCertificationWidgetCtrl', {
                        $scope: $scope
                    });
                }

                describe('active index change', function () {
                    it('should update carousel508Text with current slide data', function () {
                        var ctrl = createController();
                        ctrl.objects = slides;
                        ctrl.active = 1;
                        $scope.$digest();
                        expect(ctrl.carousel508Text).toEqual(slideTwo508Text);

                        ctrl.active = 0;
                        $scope.$digest();
                        expect(ctrl.carousel508Text).toEqual(slideOne508Text);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL0Fic3RyYWN0Q2VydGlmaWNhdGlvbnNXaWRnZXRDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlEQUF5RCwyQ0FBMkMsb0VBQW9FLFVBQVUsU0FBUztJQUF2Tzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscURBQXFEO1lBQzNHLG1CQUFtQixvREFBb0Q7V0FDeEUsVUFBVSxzQ0FBc0MsSUFBSSxVQUFVLDZEQUE2RDtRQUM5SCxTQUFTLFlBQVk7O1lBRDdCLFNBQVMsb0NBQW9DLFlBQVc7Z0JBQ3BELElBQUk7b0JBQWE7b0JBQVk7b0JBQVE7b0JBQXlCO29CQUMxRCxrQkFBa0I7b0JBQ2xCLGtCQUFrQjs7Z0JBRXRCLFNBQVMsZUFBZTtvQkFDcEIsSUFBSSxPQUFPLElBQUk7b0JBQ2YsS0FBSyxTQUFTO29CQUNkLE9BQU87OztnQkFHWCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxlQUFlLGNBQWMsbUJBQW1CLDJCQUEyQjtvQkFDbEcsY0FBYztvQkFDZCxTQUFTLGFBQWE7b0JBQ3RCLGFBQWE7b0JBQ2IsMEJBQTBCOztvQkFFMUIsa0JBQWtCLGlCQUFpQjt3QkFDL0IsNEJBQTRCOzs7b0JBR2hDLElBQUksUUFBUTt3QkFDUixXQUFXLElBQUksS0FBSztvQkFDeEIsU0FBUyxTQUFTLE1BQU0sYUFBYTs7b0JBRXJDLFNBQVMsQ0FDTCxJQUFJLHdCQUNBLEVBQUMsTUFBTSxVQUFVLGdCQUFnQixHQUFHLFlBQVksSUFBSSxTQUFTLFNBQVMsY0FDMUUsSUFBSSx3QkFDQSxFQUFDLE1BQU0sVUFBVSxnQkFBZ0IsR0FBRyxZQUFZLElBQUksU0FBUyxTQUFTLGNBQzFFLElBQUksd0JBQ0EsRUFBQyxNQUFNLFVBQVUsZ0JBQWdCLEdBQUcsWUFBWSxJQUFJLFNBQVMsU0FBUyxjQUMxRSxJQUFJLHdCQUNBLEVBQUMsTUFBTSxVQUFVLGdCQUFnQixHQUFHLFlBQVksSUFBSSxTQUFTLFNBQVMsY0FDMUUsSUFBSSx3QkFDQSxFQUFDLE1BQU0sVUFBVSxnQkFBZ0IsR0FBRyxZQUFZLElBQUksU0FBUyxTQUFTOzs7Z0JBSWxGLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksK0JBQStCO3dCQUM5QyxRQUFROzs7O2dCQUloQixTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxHQUFHLHlEQUF5RCxZQUFXO3dCQUNuRSxJQUFJLE9BQU87d0JBQ1gsS0FBSyxVQUFVO3dCQUNmLEtBQUssU0FBUzt3QkFDZCxPQUFPO3dCQUNQLE9BQU8sS0FBSyxpQkFBaUIsUUFBUTs7d0JBRXJDLEtBQUssU0FBUzt3QkFDZCxPQUFPO3dCQUNQLE9BQU8sS0FBSyxpQkFBaUIsUUFBUTs7Ozs7O0dBRTlDIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL0Fic3RyYWN0Q2VydGlmaWNhdGlvbnNXaWRnZXRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGNlcnRXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvY2VydGlmaWNhdGlvbnMvQ2VydGlmaWNhdGlvbnNXaWRnZXRNb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xuaW1wb3J0ICd0ZXN0L2pzL2hvbWUvd2lkZ2V0L2NlcnRpZmljYXRpb25zL1Rlc3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwnO1xuXG5kZXNjcmliZSgnQWJzdHJhY3RDZXJ0aWZpY2F0aW9uc1dpZGdldEN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzY29wZSwgQ2VydGlmaWNhdGlvbldpZGdldERhdGEsIHNsaWRlcyxcbiAgICAgICAgc2xpZGVPbmU1MDhUZXh0ID0gJ3NsaWRlMSBEdWUgVG9kYXkgMCUgdWlfZ2F1Z2VfY29tcGxldGVkJyxcbiAgICAgICAgc2xpZGVUd281MDhUZXh0ID0gJ3NsaWRlMiBEdWUgVG9kYXkgMjAlIHVpX2dhdWdlX2NvbXBsZXRlZCc7XG5cbiAgICBmdW5jdGlvbiBnZXRTdGFydERhdGUoKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXRIb3VycygwKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydFdpZGdldE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBzcFRyYW5zbGF0ZUZpbHRlciwgX0NlcnRpZmljYXRpb25XaWRnZXREYXRhXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIENlcnRpZmljYXRpb25XaWRnZXREYXRhID0gX0NlcnRpZmljYXRpb25XaWRnZXREYXRhXztcblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICd1aV9jZXJ0X3dpZGdldF9kdWVfdG9kYXknOiAnRHVlIFRvZGF5J1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBnZXRTdGFydERhdGUoKSxcbiAgICAgICAgICAgIHRlc3REYXRlID0gbmV3IERhdGUoc3RhcnQpO1xuICAgICAgICB0ZXN0RGF0ZS5zZXRIb3VycyhzdGFydC5nZXRIb3VycygpICsgMSk7XG5cbiAgICAgICAgc2xpZGVzID0gW1xuICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25XaWRnZXREYXRhKFxuICAgICAgICAgICAgICAgIHtuYW1lOiAnc2xpZGUxJywgY29tcGxldGVkSXRlbXM6IDAsIHRvdGFsSXRlbXM6IDEwLCBkdWVEYXRlOiB0ZXN0RGF0ZS5nZXRUaW1lKCl9KSxcbiAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YShcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3NsaWRlMicsIGNvbXBsZXRlZEl0ZW1zOiAyLCB0b3RhbEl0ZW1zOiAxMCwgZHVlRGF0ZTogdGVzdERhdGUuZ2V0VGltZSgpfSksXG4gICAgICAgICAgICBuZXcgQ2VydGlmaWNhdGlvbldpZGdldERhdGEoXG4gICAgICAgICAgICAgICAge25hbWU6ICdzbGlkZTMnLCBjb21wbGV0ZWRJdGVtczogMywgdG90YWxJdGVtczogMTAsIGR1ZURhdGU6IHRlc3REYXRlLmdldFRpbWUoKX0pLFxuICAgICAgICAgICAgbmV3IENlcnRpZmljYXRpb25XaWRnZXREYXRhKFxuICAgICAgICAgICAgICAgIHtuYW1lOiAnc2xpZGU0JywgY29tcGxldGVkSXRlbXM6IDQsIHRvdGFsSXRlbXM6IDEwLCBkdWVEYXRlOiB0ZXN0RGF0ZS5nZXRUaW1lKCl9KSxcbiAgICAgICAgICAgIG5ldyBDZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YShcbiAgICAgICAgICAgICAgICB7bmFtZTogJ3NsaWRlNScsIGNvbXBsZXRlZEl0ZW1zOiA1LCB0b3RhbEl0ZW1zOiAxMCwgZHVlRGF0ZTogdGVzdERhdGUuZ2V0VGltZSgpfSlcbiAgICAgICAgXTtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1Rlc3RDZXJ0aWZpY2F0aW9uV2lkZ2V0Q3RybCcsIHtcbiAgICAgICAgICAgICRzY29wZTogJHNjb3BlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdhY3RpdmUgaW5kZXggY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgdXBkYXRlIGNhcm91c2VsNTA4VGV4dCB3aXRoIGN1cnJlbnQgc2xpZGUgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLm9iamVjdHMgPSBzbGlkZXM7XG4gICAgICAgICAgICBjdHJsLmFjdGl2ZSA9IDE7XG4gICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY2Fyb3VzZWw1MDhUZXh0KS50b0VxdWFsKHNsaWRlVHdvNTA4VGV4dCk7XG5cbiAgICAgICAgICAgIGN0cmwuYWN0aXZlID0gMDtcbiAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5jYXJvdXNlbDUwOFRleHQpLnRvRXF1YWwoc2xpZGVPbmU1MDhUZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
