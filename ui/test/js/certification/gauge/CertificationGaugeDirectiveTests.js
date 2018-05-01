System.register(['test/js/TestInitializer', 'home/widget/certifications/CertificationsWidgetModule', 'common/directive/DirectiveModule', 'certification/gauge/CertificationGaugeModule'], function (_export) {
    'use strict';

    var certWidgetModule, directiveModule, certificationGaugeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetCertificationsCertificationsWidgetModule) {
            certWidgetModule = _homeWidgetCertificationsCertificationsWidgetModule['default'];
        }, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }, function (_certificationGaugeCertificationGaugeModule) {
            certificationGaugeModule = _certificationGaugeCertificationGaugeModule['default'];
        }],
        execute: function () {

            describe('CertificationGaugeDirective', function () {

                var $scope = undefined,
                    $compile = undefined,
                    CertificationWidgetData = undefined,
                    certWidget = undefined,
                    element = undefined,
                    GaugeConfig = undefined,
                    elementDefinition = '<sp-certification-gauge sp-certification="certWidget" ' + 'sp-display-style="percentage"/>',
                    elementDefinitionWithGaugeConfig = '<sp-certification-gauge sp-certification="certWidget" ' + 'sp-gauge-config="gaugeConfig" sp-display-style="percentage"/>',
                    customGaugeConfig = {
                    barColor: '#CC0000',
                    trackColor: '#eee',
                    scaleColor: '#d8dde5',
                    lineWidth: 50,
                    lineCap: 'round',
                    size: 100,
                    animate: 500,
                    loop: false
                },
                    certWidgetData = {
                    id: '1',
                    name: 'test',
                    completedItems: 0,
                    totalItems: 10,
                    dueDate: new Date().getTime()
                };

                beforeEach(module(directiveModule, certWidgetModule, certificationGaugeModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _CertificationWidgetData_, _GaugeConfig_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    CertificationWidgetData = _CertificationWidgetData_;
                    GaugeConfig = _GaugeConfig_;
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                // Create the compiled directive element with the given certification.
                function createElement(certWidget, definition) {
                    $scope.certWidget = certWidget;
                    element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('should throw exception if no certification', function () {
                    expect(function () {
                        createElement(null, elementDefinition);
                    }).toThrow();
                });

                it('should construct the element with the spGaugeDirective', function () {
                    certWidget = new CertificationWidgetData(certWidgetData);
                    var element = createElement(certWidget, elementDefinition);
                    expect(element[0].innerHTML.indexOf('sp-gauge')).toBeGreaterThan(-1);
                });

                it('should pass in the gaugeConfig to spGauge directive', function () {
                    certWidget = new CertificationWidgetData(certWidgetData);
                    $scope.gaugeConfig = new GaugeConfig(customGaugeConfig);
                    var element = createElement(certWidget, elementDefinitionWithGaugeConfig);
                    expect(element[0].innerHTML.indexOf('sp-gauge')).toBeGreaterThan(-1);
                    expect(element.isolateScope().certGaugeCtrl.gaugeConfig).toEqual(new GaugeConfig(customGaugeConfig));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vZ2F1Z2UvQ2VydGlmaWNhdGlvbkdhdWdlRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlEQUF5RCxvQ0FBb0MsaURBQWlELFVBQVUsU0FBUztJQUN6TTs7SUFFQSxJQUFJLGtCQUFrQixpQkFBaUI7SUFDdkMsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscURBQXFEO1lBQzNHLG1CQUFtQixvREFBb0Q7V0FDeEUsVUFBVSxpQ0FBaUM7WUFDMUMsa0JBQWtCLGdDQUFnQztXQUNuRCxVQUFVLDZDQUE2QztZQUN0RCwyQkFBMkIsNENBQTRDOztRQUUzRSxTQUFTLFlBQVk7O1lBUDdCLFNBQVMsK0JBQStCLFlBQVc7O2dCQUUvQyxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSwwQkFBdUI7b0JBQUUsYUFBVTtvQkFBRSxVQUFPO29CQUFFLGNBQVc7b0JBQzNFLG9CQUFvQiwyREFDaEI7b0JBQ0osbUNBQW1DLDJEQUMvQjtvQkFDSixvQkFBb0I7b0JBQ2hCLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxNQUFNO29CQUNOLFNBQVM7b0JBQ1QsTUFBTTs7b0JBRVYsaUJBQWlCO29CQUNiLElBQUk7b0JBQ0osTUFBTTtvQkFDTixnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osU0FBUyxJQUFJLE9BQU87OztnQkFHNUIsV0FBVyxPQUFPLGlCQUFpQixrQkFBa0I7O2dCQUVyRCxXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksMkJBQTJCLGVBQWU7b0JBQzNGLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCwwQkFBMEI7b0JBQzFCLGNBQWM7OztnQkFHbEIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFRLFFBQVEsU0FBUzs7Ozs7Z0JBS2pDLFNBQVMsY0FBYyxZQUFZLFlBQVk7b0JBQzNDLE9BQU8sYUFBYTtvQkFDcEIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsR0FBRyw4Q0FBOEMsWUFBVztvQkFDeEQsT0FBTyxZQUFXO3dCQUNkLGNBQWMsTUFBTTt1QkFDckI7OztnQkFHUCxHQUFHLDBEQUEwRCxZQUFXO29CQUNwRSxhQUFhLElBQUksd0JBQXdCO29CQUN6QyxJQUFJLFVBQVUsY0FBYyxZQUFZO29CQUN4QyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsYUFBYSxnQkFBZ0IsQ0FBQzs7O2dCQUd0RSxHQUFHLHVEQUF1RCxZQUFXO29CQUNqRSxhQUFhLElBQUksd0JBQXdCO29CQUN6QyxPQUFPLGNBQWMsSUFBSSxZQUFZO29CQUNyQyxJQUFJLFVBQVUsY0FBYyxZQUFZO29CQUN4QyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsYUFBYSxnQkFBZ0IsQ0FBQztvQkFDbEUsT0FBTyxRQUFRLGVBQWUsY0FBYyxhQUFhLFFBQVEsSUFBSSxZQUFZOzs7OztHQWlCdEYiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9nYXVnZS9DZXJ0aWZpY2F0aW9uR2F1Z2VEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydFdpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9jZXJ0aWZpY2F0aW9ucy9DZXJ0aWZpY2F0aW9uc1dpZGdldE1vZHVsZSc7XHJcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbkdhdWdlTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vZ2F1Z2UvQ2VydGlmaWNhdGlvbkdhdWdlTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uR2F1Z2VEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgQ2VydGlmaWNhdGlvbldpZGdldERhdGEsIGNlcnRXaWRnZXQsIGVsZW1lbnQsIEdhdWdlQ29uZmlnLFxyXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1jZXJ0aWZpY2F0aW9uLWdhdWdlIHNwLWNlcnRpZmljYXRpb249XCJjZXJ0V2lkZ2V0XCIgJyArXHJcbiAgICAgICAgICAgICdzcC1kaXNwbGF5LXN0eWxlPVwicGVyY2VudGFnZVwiLz4nLFxyXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uV2l0aEdhdWdlQ29uZmlnID0gJzxzcC1jZXJ0aWZpY2F0aW9uLWdhdWdlIHNwLWNlcnRpZmljYXRpb249XCJjZXJ0V2lkZ2V0XCIgJyArXHJcbiAgICAgICAgICAgICdzcC1nYXVnZS1jb25maWc9XCJnYXVnZUNvbmZpZ1wiIHNwLWRpc3BsYXktc3R5bGU9XCJwZXJjZW50YWdlXCIvPicsXHJcbiAgICAgICAgY3VzdG9tR2F1Z2VDb25maWcgPSB7XHJcbiAgICAgICAgICAgIGJhckNvbG9yOiAnI0NDMDAwMCcsXHJcbiAgICAgICAgICAgIHRyYWNrQ29sb3I6ICcjZWVlJyxcclxuICAgICAgICAgICAgc2NhbGVDb2xvcjogJyNkOGRkZTUnLFxyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDUwLFxyXG4gICAgICAgICAgICBsaW5lQ2FwOiAncm91bmQnLFxyXG4gICAgICAgICAgICBzaXplOiAxMDAsXHJcbiAgICAgICAgICAgIGFuaW1hdGU6IDUwMCxcclxuICAgICAgICAgICAgbG9vcDogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlcnRXaWRnZXREYXRhID0ge1xyXG4gICAgICAgICAgICBpZDogJzEnLFxyXG4gICAgICAgICAgICBuYW1lOiAndGVzdCcsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZEl0ZW1zOiAwLFxyXG4gICAgICAgICAgICB0b3RhbEl0ZW1zOiAxMCxcclxuICAgICAgICAgICAgZHVlRGF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSwgY2VydFdpZGdldE1vZHVsZSwgY2VydGlmaWNhdGlvbkdhdWdlTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfQ2VydGlmaWNhdGlvbldpZGdldERhdGFfLCBfR2F1Z2VDb25maWdfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICBDZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YSA9IF9DZXJ0aWZpY2F0aW9uV2lkZ2V0RGF0YV87XHJcbiAgICAgICAgR2F1Z2VDb25maWcgPSBfR2F1Z2VDb25maWdfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgY29tcGlsZWQgZGlyZWN0aXZlIGVsZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gY2VydGlmaWNhdGlvbi5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoY2VydFdpZGdldCwgZGVmaW5pdGlvbikge1xyXG4gICAgICAgICRzY29wZS5jZXJ0V2lkZ2V0ID0gY2VydFdpZGdldDtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZmluaXRpb24pO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXhjZXB0aW9uIGlmIG5vIGNlcnRpZmljYXRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQobnVsbCwgZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgY29uc3RydWN0IHRoZSBlbGVtZW50IHdpdGggdGhlIHNwR2F1Z2VEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjZXJ0V2lkZ2V0ID0gbmV3IENlcnRpZmljYXRpb25XaWRnZXREYXRhKGNlcnRXaWRnZXREYXRhKTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoY2VydFdpZGdldCwgZWxlbWVudERlZmluaXRpb24pO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKCdzcC1nYXVnZScpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBwYXNzIGluIHRoZSBnYXVnZUNvbmZpZyB0byBzcEdhdWdlIGRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNlcnRXaWRnZXQgPSBuZXcgQ2VydGlmaWNhdGlvbldpZGdldERhdGEoY2VydFdpZGdldERhdGEpO1xyXG4gICAgICAgICRzY29wZS5nYXVnZUNvbmZpZyA9IG5ldyBHYXVnZUNvbmZpZyhjdXN0b21HYXVnZUNvbmZpZyk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGNlcnRXaWRnZXQsIGVsZW1lbnREZWZpbml0aW9uV2l0aEdhdWdlQ29uZmlnKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lckhUTUwuaW5kZXhPZignc3AtZ2F1Z2UnKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudC5pc29sYXRlU2NvcGUoKS5jZXJ0R2F1Z2VDdHJsLmdhdWdlQ29uZmlnKS50b0VxdWFsKG5ldyBHYXVnZUNvbmZpZyhjdXN0b21HYXVnZUNvbmZpZykpO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
