System.register(['test/js/TestInitializer', 'workitem/WorkItemModule'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var workItemModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemWorkItemModule) {
            workItemModule = _workitemWorkItemModule['default'];
        }],
        execute: function () {

            describe('WorkItemHeaderDirective', function () {
                var element,
                    $scope,
                    $compile,
                    defaultOnClickMock,
                    STATES = {
                    full: 'full',
                    collapsible: 'collapsible',
                    summary: 'summary'
                };

                beforeEach(module(workItemModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    defaultOnClickMock = jasmine.createSpy();
                }));

                var compileElement = function (style, onClick, isCollapsed) {
                    $scope.onClick = onClick;
                    $scope.isCollapsed = isCollapsed;
                    var markup = '<sp-work-item-header sp-template-style="' + style + '" sp-on-click="onClick()"' + ' sp-is-collapsed="isCollapsed"></sp-work-item-header>',
                        el = $compile(markup)($scope);
                    $scope.$digest();
                    return el;
                };

                it('should throw when the template style does not match the internal list', function () {
                    expect(function () {
                        element = compileElement('bogus', defaultOnClickMock, true);
                    }).toThrow();
                });

                it('should display correct elements with template style collapsible, collapsed true, default onclick', function () {
                    element = angular.element(compileElement(STATES.collapsible, defaultOnClickMock, true));
                    var header = element.find('header');
                    expect(header.attr('class').indexOf('clickable')).toBeGreaterThan(-1);
                    expect(header.attr('class').indexOf('panel-collapse-toggle')).toBeGreaterThan(-1);
                    header.click();
                    expect(defaultOnClickMock).toHaveBeenCalled();
                    expect(element.find('.sr-only')[0].innerText.trim()).toEqual('ui_508_workitem_click_show');
                });

                it('should display correct elements with template style collapsible, collapsed false, default onclick', function () {
                    element = angular.element(compileElement(STATES.collapsible, defaultOnClickMock, false));
                    var header = element.find('header');
                    expect(header.attr('class').indexOf('clickable')).toBeGreaterThan(-1);
                    expect(header.attr('class').indexOf('panel-collapse-toggle')).toBe(-1);
                    header.click();
                    expect(defaultOnClickMock).toHaveBeenCalled();
                    expect(element.find('.sr-only')[0].innerText.trim()).toEqual('ui_508_workitem_click_hide');
                });

                it('should display correct elements with template style full, collapsed false, default onclick', function () {
                    element = angular.element(compileElement(STATES.full, defaultOnClickMock, false));
                    var header = element.find('header');

                    expect(header.attr('class').indexOf('clickable')).toBe(-1);
                    expect(header.attr('class').indexOf('panel-collapse-toggle')).toBe(-1);
                    header.click();
                    expect(defaultOnClickMock).not.toHaveBeenCalled();
                    expect(element.find('.sr-only').length).toBe(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7O0lBQzNGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLDJCQUEyQixZQUFXO2dCQUMzQyxJQUFJO29CQUFTO29CQUFRO29CQUFVO29CQUMzQixTQUFTO29CQUNELE1BQU07b0JBQ04sYUFBYTtvQkFDYixTQUFTOzs7Z0JBR3JCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWTtvQkFDL0MsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLHFCQUFxQixRQUFROzs7Z0JBR2pDLElBQUksaUJBQWlCLFVBQVMsT0FBTyxTQUFTLGFBQWE7b0JBQ3ZELE9BQU8sVUFBVTtvQkFDakIsT0FBTyxjQUFjO29CQUNyQixJQUFJLFNBQVMsNkNBQTZDLFFBQVEsOEJBQzlEO3dCQUNBLEtBQUssU0FBUyxRQUFRO29CQUMxQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxHQUFHLHlFQUF5RSxZQUFXO29CQUNuRixPQUFPLFlBQVc7d0JBQ2QsVUFBVSxlQUFlLFNBQVMsb0JBQW9CO3VCQUN2RDs7O2dCQUlQLEdBQUcsb0dBQW9HLFlBQVc7b0JBQzlHLFVBQVUsUUFBUSxRQUFRLGVBQWUsT0FBTyxhQUFhLG9CQUFvQjtvQkFDakYsSUFBSSxTQUFTLFFBQVEsS0FBSztvQkFDMUIsT0FBTyxPQUFPLEtBQUssU0FBUyxRQUFRLGNBQWMsZ0JBQWdCLENBQUM7b0JBQ25FLE9BQU8sT0FBTyxLQUFLLFNBQVMsUUFBUSwwQkFBMEIsZ0JBQWdCLENBQUM7b0JBQy9FLE9BQU87b0JBQ1AsT0FBTyxvQkFBb0I7b0JBQzNCLE9BQU8sUUFBUSxLQUFLLFlBQVksR0FBRyxVQUFVLFFBQVEsUUFBUTs7O2dCQUdqRSxHQUFHLHFHQUFxRyxZQUFXO29CQUMvRyxVQUFVLFFBQVEsUUFBUSxlQUFlLE9BQU8sYUFBYSxvQkFBb0I7b0JBQ2pGLElBQUksU0FBUyxRQUFRLEtBQUs7b0JBQzFCLE9BQU8sT0FBTyxLQUFLLFNBQVMsUUFBUSxjQUFjLGdCQUFnQixDQUFDO29CQUNuRSxPQUFPLE9BQU8sS0FBSyxTQUFTLFFBQVEsMEJBQTBCLEtBQUssQ0FBQztvQkFDcEUsT0FBTztvQkFDUCxPQUFPLG9CQUFvQjtvQkFDM0IsT0FBTyxRQUFRLEtBQUssWUFBWSxHQUFHLFVBQVUsUUFBUSxRQUFROzs7Z0JBR2pFLEdBQUcsOEZBQThGLFlBQVc7b0JBQ3hHLFVBQVUsUUFBUSxRQUFRLGVBQWUsT0FBTyxNQUFNLG9CQUFvQjtvQkFDMUUsSUFBSSxTQUFTLFFBQVEsS0FBSzs7b0JBRTFCLE9BQU8sT0FBTyxLQUFLLFNBQVMsUUFBUSxjQUFjLEtBQUssQ0FBQztvQkFDeEQsT0FBTyxPQUFPLEtBQUssU0FBUyxRQUFRLDBCQUEwQixLQUFLLENBQUM7b0JBQ3BFLE9BQU87b0JBQ1AsT0FBTyxvQkFBb0IsSUFBSTtvQkFDL0IsT0FBTyxRQUFRLEtBQUssWUFBWSxRQUFRLEtBQUs7Ozs7O0dBV2xEIiwiZmlsZSI6IndvcmtpdGVtL1dvcmtJdGVtSGVhZGVyRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgd29ya0l0ZW1Nb2R1bGUgZnJvbSAnd29ya2l0ZW0vV29ya0l0ZW1Nb2R1bGUnO1xuXG5kZXNjcmliZSgnV29ya0l0ZW1IZWFkZXJEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWxlbWVudCwgJHNjb3BlLCAkY29tcGlsZSwgZGVmYXVsdE9uQ2xpY2tNb2NrLFxuICAgICAgICBTVEFURVMgPSB7XG4gICAgICAgICAgICAgICAgZnVsbDogJ2Z1bGwnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNpYmxlOiAnY29sbGFwc2libGUnLFxuICAgICAgICAgICAgICAgIHN1bW1hcnk6ICdzdW1tYXJ5J1xuICAgICAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHdvcmtJdGVtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkcm9vdFNjb3BlLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIGRlZmF1bHRPbkNsaWNrTW9jayA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgfSkpO1xuXG4gICAgdmFyIGNvbXBpbGVFbGVtZW50ID0gZnVuY3Rpb24oc3R5bGUsIG9uQ2xpY2ssIGlzQ29sbGFwc2VkKSB7XG4gICAgICAgICRzY29wZS5vbkNsaWNrID0gb25DbGljaztcbiAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gaXNDb2xsYXBzZWQ7XG4gICAgICAgIHZhciBtYXJrdXAgPSAnPHNwLXdvcmstaXRlbS1oZWFkZXIgc3AtdGVtcGxhdGUtc3R5bGU9XCInICsgc3R5bGUgKyAnXCIgc3Atb24tY2xpY2s9XCJvbkNsaWNrKClcIicgK1xuICAgICAgICAgICAgJyBzcC1pcy1jb2xsYXBzZWQ9XCJpc0NvbGxhcHNlZFwiPjwvc3Atd29yay1pdGVtLWhlYWRlcj4nLFxuICAgICAgICAgICAgZWwgPSAkY29tcGlsZShtYXJrdXApKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aGVuIHRoZSB0ZW1wbGF0ZSBzdHlsZSBkb2VzIG5vdCBtYXRjaCB0aGUgaW50ZXJuYWwgbGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gY29tcGlsZUVsZW1lbnQoJ2JvZ3VzJywgZGVmYXVsdE9uQ2xpY2tNb2NrLCB0cnVlKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGRpc3BsYXkgY29ycmVjdCBlbGVtZW50cyB3aXRoIHRlbXBsYXRlIHN0eWxlIGNvbGxhcHNpYmxlLCBjb2xsYXBzZWQgdHJ1ZSwgZGVmYXVsdCBvbmNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZUVsZW1lbnQoU1RBVEVTLmNvbGxhcHNpYmxlLCBkZWZhdWx0T25DbGlja01vY2ssIHRydWUpKTtcbiAgICAgICAgdmFyIGhlYWRlciA9IGVsZW1lbnQuZmluZCgnaGVhZGVyJyk7XG4gICAgICAgIGV4cGVjdChoZWFkZXIuYXR0cignY2xhc3MnKS5pbmRleE9mKCdjbGlja2FibGUnKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcbiAgICAgICAgZXhwZWN0KGhlYWRlci5hdHRyKCdjbGFzcycpLmluZGV4T2YoJ3BhbmVsLWNvbGxhcHNlLXRvZ2dsZScpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xuICAgICAgICBoZWFkZXIuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGRlZmF1bHRPbkNsaWNrTW9jaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuc3Itb25seScpWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpXzUwOF93b3JraXRlbV9jbGlja19zaG93Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRpc3BsYXkgY29ycmVjdCBlbGVtZW50cyB3aXRoIHRlbXBsYXRlIHN0eWxlIGNvbGxhcHNpYmxlLCBjb2xsYXBzZWQgZmFsc2UsIGRlZmF1bHQgb25jbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGNvbXBpbGVFbGVtZW50KFNUQVRFUy5jb2xsYXBzaWJsZSwgZGVmYXVsdE9uQ2xpY2tNb2NrLCBmYWxzZSkpO1xuICAgICAgICB2YXIgaGVhZGVyID0gZWxlbWVudC5maW5kKCdoZWFkZXInKTtcbiAgICAgICAgZXhwZWN0KGhlYWRlci5hdHRyKCdjbGFzcycpLmluZGV4T2YoJ2NsaWNrYWJsZScpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xuICAgICAgICBleHBlY3QoaGVhZGVyLmF0dHIoJ2NsYXNzJykuaW5kZXhPZigncGFuZWwtY29sbGFwc2UtdG9nZ2xlJykpLnRvQmUoLTEpO1xuICAgICAgICBoZWFkZXIuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KGRlZmF1bHRPbkNsaWNrTW9jaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuc3Itb25seScpWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpXzUwOF93b3JraXRlbV9jbGlja19oaWRlJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRpc3BsYXkgY29ycmVjdCBlbGVtZW50cyB3aXRoIHRlbXBsYXRlIHN0eWxlIGZ1bGwsIGNvbGxhcHNlZCBmYWxzZSwgZGVmYXVsdCBvbmNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoY29tcGlsZUVsZW1lbnQoU1RBVEVTLmZ1bGwsIGRlZmF1bHRPbkNsaWNrTW9jaywgZmFsc2UpKTtcbiAgICAgICAgdmFyIGhlYWRlciA9IGVsZW1lbnQuZmluZCgnaGVhZGVyJyk7XG5cbiAgICAgICAgZXhwZWN0KGhlYWRlci5hdHRyKCdjbGFzcycpLmluZGV4T2YoJ2NsaWNrYWJsZScpKS50b0JlKC0xKTtcbiAgICAgICAgZXhwZWN0KGhlYWRlci5hdHRyKCdjbGFzcycpLmluZGV4T2YoJ3BhbmVsLWNvbGxhcHNlLXRvZ2dsZScpKS50b0JlKC0xKTtcbiAgICAgICAgaGVhZGVyLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChkZWZhdWx0T25DbGlja01vY2spLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5zci1vbmx5JykubGVuZ3RoKS50b0JlKDApO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
