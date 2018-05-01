System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('GaugeDirective', function () {
                var elementDefinition = '<sp-gauge sp-gauge-completed-items="4"' + '    sp-gauge-total-items="8"' + '    sp-gauge-completion-display-style="{{style}}"/>',
                    defaultGaugeConfig = {
                    barColor: '#004d1a',
                    trackColor: '#eee',
                    scaleColor: '#d8dde5',
                    lineWidth: 30,
                    lineCap: 'butt',
                    size: 188,
                    animate: 700,
                    loop: false
                },
                    customGaugeConfig = {
                    barColor: '#49C822',
                    trackColor: '#eee',
                    scaleColor: '#d8dde5',
                    lineWidth: 50,
                    lineCap: 'round',
                    size: 100,
                    animate: 500,
                    loop: false
                },
                    scope,
                    $compile,
                    GaugeConfig;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, _GaugeConfig_) {
                    scope = $rootScope.$new();
                    $compile = _$compile_;
                    scope.style = 'percentage';
                    GaugeConfig = _GaugeConfig_;
                }));

                function createElement() {
                    var element = angular.element(elementDefinition);
                    $compile(element)(scope);
                    scope.$apply();
                    return element;
                }

                it('adds getPercent to scope', function () {
                    var element = createElement();
                    expect(typeof element.isolateScope().getPercent === 'function').toBeTruthy();
                    expect(element.isolateScope().getPercent()).toBe(50);
                });

                it('adds isPercent to scope', function () {
                    var element = createElement();
                    expect(typeof element.isolateScope().isPercent === 'function').toBeTruthy();
                    expect(element.isolateScope().isPercent()).toBe(true);
                });

                it('hides full numbers if percent', function () {
                    var element = createElement();
                    expect(element.find('.gauge-percent').length).toEqual(1);
                    expect(element.find('.gauge-stats').length).toEqual(0);
                });

                it('hides percent if full numbers', function () {
                    scope.style = 'full';
                    var element = createElement();
                    expect(element.find('.gauge-percent').length).toEqual(0);
                    expect(element.find('.gauge-stats').length).toEqual(1);
                });

                it('creates the default gauge config', function () {
                    var element = createElement();

                    expect(element.isolateScope().config instanceof GaugeConfig).toEqual(true);
                    expect(element.isolateScope().config).toEqual(new GaugeConfig(defaultGaugeConfig));
                });

                it('creates the gauge config with the values provided', function () {
                    elementDefinition = '<sp-gauge sp-gauge-config="customConfig" sp-gauge-completed-items="4"' + '    sp-gauge-total-items="8"' + '    sp-gauge-completion-display-style="{{style}}"/>';

                    scope.customConfig = new GaugeConfig(customGaugeConfig);
                    var element = createElement();
                    expect(element.isolateScope().config instanceof GaugeConfig).toEqual(true);
                    expect(element.isolateScope().config).toEqual(new GaugeConfig(customGaugeConfig));
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvR2F1Z2VEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUzs7SUFDcEc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsa0JBQWtCLFlBQVc7Z0JBQ2xDLElBQUksb0JBQW9CLDJDQUNoQixpQ0FDQTtvQkFDSixxQkFBcUI7b0JBQ2pCLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxNQUFNO29CQUNOLFNBQVM7b0JBQ1QsTUFBTTs7b0JBRVYsb0JBQW9CO29CQUNoQixVQUFVO29CQUNWLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixXQUFXO29CQUNYLFNBQVM7b0JBQ1QsTUFBTTtvQkFDTixTQUFTO29CQUNULE1BQU07O29CQUVWO29CQUFPO29CQUFVOztnQkFFckIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLGVBQWU7b0JBQzlELFFBQVEsV0FBVztvQkFDbkIsV0FBVztvQkFDWCxNQUFNLFFBQVE7b0JBQ2QsY0FBYzs7O2dCQUdsQixTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixNQUFNO29CQUNOLE9BQU87OztnQkFHWCxHQUFHLDRCQUE0QixZQUFXO29CQUN0QyxJQUFJLFVBQVU7b0JBQ2QsT0FBTyxPQUFPLFFBQVEsZUFBZSxlQUFlLFlBQVk7b0JBQ2hFLE9BQU8sUUFBUSxlQUFlLGNBQWMsS0FBSzs7O2dCQUdyRCxHQUFHLDJCQUEyQixZQUFXO29CQUNyQyxJQUFJLFVBQVU7b0JBQ2QsT0FBTyxPQUFPLFFBQVEsZUFBZSxjQUFjLFlBQVk7b0JBQy9ELE9BQU8sUUFBUSxlQUFlLGFBQWEsS0FBSzs7O2dCQUdwRCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxJQUFJLFVBQVU7b0JBQ2QsT0FBTyxRQUFRLEtBQUssa0JBQWtCLFFBQVEsUUFBUTtvQkFDdEQsT0FBTyxRQUFRLEtBQUssZ0JBQWdCLFFBQVEsUUFBUTs7O2dCQUd4RCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxNQUFNLFFBQVE7b0JBQ2QsSUFBSSxVQUFVO29CQUNkLE9BQU8sUUFBUSxLQUFLLGtCQUFrQixRQUFRLFFBQVE7b0JBQ3RELE9BQU8sUUFBUSxLQUFLLGdCQUFnQixRQUFRLFFBQVE7OztnQkFHeEQsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsSUFBSSxVQUFVOztvQkFFZCxPQUFPLFFBQVEsZUFBZSxrQkFBa0IsYUFBYSxRQUFRO29CQUNyRSxPQUFPLFFBQVEsZUFBZSxRQUFRLFFBQVEsSUFBSSxZQUFZOzs7Z0JBR2xFLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELG9CQUFvQiwwRUFDaEIsaUNBQ0E7O29CQUVKLE1BQU0sZUFBZSxJQUFJLFlBQVk7b0JBQ3JDLElBQUksVUFBVTtvQkFDZCxPQUFPLFFBQVEsZUFBZSxrQkFBa0IsYUFBYSxRQUFRO29CQUNyRSxPQUFPLFFBQVEsZUFBZSxRQUFRLFFBQVEsSUFBSSxZQUFZOzs7OztHQVFuRSIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0dhdWdlRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0dhdWdlRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1nYXVnZSBzcC1nYXVnZS1jb21wbGV0ZWQtaXRlbXM9XCI0XCInICtcbiAgICAgICAgICAgICcgICAgc3AtZ2F1Z2UtdG90YWwtaXRlbXM9XCI4XCInICtcbiAgICAgICAgICAgICcgICAgc3AtZ2F1Z2UtY29tcGxldGlvbi1kaXNwbGF5LXN0eWxlPVwie3tzdHlsZX19XCIvPicsXG4gICAgICAgIGRlZmF1bHRHYXVnZUNvbmZpZyA9IHtcbiAgICAgICAgICAgIGJhckNvbG9yOiAnIzAwNGQxYScsXG4gICAgICAgICAgICB0cmFja0NvbG9yOiAnI2VlZScsXG4gICAgICAgICAgICBzY2FsZUNvbG9yOiAnI2Q4ZGRlNScsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDMwLFxuICAgICAgICAgICAgbGluZUNhcDogJ2J1dHQnLFxuICAgICAgICAgICAgc2l6ZTogMTg4LFxuICAgICAgICAgICAgYW5pbWF0ZTogNzAwLFxuICAgICAgICAgICAgbG9vcDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgY3VzdG9tR2F1Z2VDb25maWcgPSB7XG4gICAgICAgICAgICBiYXJDb2xvcjogJyM0OUM4MjInLFxuICAgICAgICAgICAgdHJhY2tDb2xvcjogJyNlZWUnLFxuICAgICAgICAgICAgc2NhbGVDb2xvcjogJyNkOGRkZTUnLFxuICAgICAgICAgICAgbGluZVdpZHRoOiA1MCxcbiAgICAgICAgICAgIGxpbmVDYXA6ICdyb3VuZCcsXG4gICAgICAgICAgICBzaXplOiAxMDAsXG4gICAgICAgICAgICBhbmltYXRlOiA1MDAsXG4gICAgICAgICAgICBsb29wOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBzY29wZSwgJGNvbXBpbGUsIEdhdWdlQ29uZmlnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBfR2F1Z2VDb25maWdfKSB7XG4gICAgICAgIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgc2NvcGUuc3R5bGUgPSAncGVyY2VudGFnZSc7XG4gICAgICAgIEdhdWdlQ29uZmlnID0gX0dhdWdlQ29uZmlnXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGl0KCdhZGRzIGdldFBlcmNlbnQgdG8gc2NvcGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdCh0eXBlb2YgZWxlbWVudC5pc29sYXRlU2NvcGUoKS5nZXRQZXJjZW50ID09PSAnZnVuY3Rpb24nKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50Lmlzb2xhdGVTY29wZSgpLmdldFBlcmNlbnQoKSkudG9CZSg1MCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBpc1BlcmNlbnQgdG8gc2NvcGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdCh0eXBlb2YgZWxlbWVudC5pc29sYXRlU2NvcGUoKS5pc1BlcmNlbnQgPT09ICdmdW5jdGlvbicpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuaXNvbGF0ZVNjb3BlKCkuaXNQZXJjZW50KCkpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGlkZXMgZnVsbCBudW1iZXJzIGlmIHBlcmNlbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5nYXVnZS1wZXJjZW50JykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuZ2F1Z2Utc3RhdHMnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGlkZXMgcGVyY2VudCBpZiBmdWxsIG51bWJlcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2NvcGUuc3R5bGUgPSAnZnVsbCc7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuZ2F1Z2UtcGVyY2VudCcpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnLmdhdWdlLXN0YXRzJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NyZWF0ZXMgdGhlIGRlZmF1bHQgZ2F1Z2UgY29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuXG4gICAgICAgIGV4cGVjdChlbGVtZW50Lmlzb2xhdGVTY29wZSgpLmNvbmZpZyBpbnN0YW5jZW9mIEdhdWdlQ29uZmlnKS50b0VxdWFsKHRydWUpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5pc29sYXRlU2NvcGUoKS5jb25maWcpLnRvRXF1YWwobmV3IEdhdWdlQ29uZmlnKGRlZmF1bHRHYXVnZUNvbmZpZykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NyZWF0ZXMgdGhlIGdhdWdlIGNvbmZpZyB3aXRoIHRoZSB2YWx1ZXMgcHJvdmlkZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudERlZmluaXRpb24gPSAnPHNwLWdhdWdlIHNwLWdhdWdlLWNvbmZpZz1cImN1c3RvbUNvbmZpZ1wiIHNwLWdhdWdlLWNvbXBsZXRlZC1pdGVtcz1cIjRcIicgK1xuICAgICAgICAgICAgJyAgICBzcC1nYXVnZS10b3RhbC1pdGVtcz1cIjhcIicgK1xuICAgICAgICAgICAgJyAgICBzcC1nYXVnZS1jb21wbGV0aW9uLWRpc3BsYXktc3R5bGU9XCJ7e3N0eWxlfX1cIi8+JztcblxuICAgICAgICBzY29wZS5jdXN0b21Db25maWcgPSBuZXcgR2F1Z2VDb25maWcoY3VzdG9tR2F1Z2VDb25maWcpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuaXNvbGF0ZVNjb3BlKCkuY29uZmlnIGluc3RhbmNlb2YgR2F1Z2VDb25maWcpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50Lmlzb2xhdGVTY29wZSgpLmNvbmZpZykudG9FcXVhbChuZXcgR2F1Z2VDb25maWcoY3VzdG9tR2F1Z2VDb25maWcpKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
