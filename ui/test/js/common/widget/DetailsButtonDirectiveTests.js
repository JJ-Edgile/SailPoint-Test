System.register(['test/js/TestInitializer', 'common/widget/WidgetModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('DetailsButtonDirective', function () {
                var id = 'uniqueId',
                    description = 'srName',
                    func = jasmine.createSpy(),
                    template = '<sp-details-button details-id="{{id}}" ' + '  details-description="{{\'ui_508_details_button\' | spTranslate: description}}" ' + '  details-func="func()">' + '</sp-details-button>',
                    $scope,
                    element;

                beforeEach(module(widgetModule));

                beforeEach(inject(function (_$rootScope_, $compile, spTranslateFilter) {
                    $scope = _$rootScope_.$new();
                    $scope.id = id;
                    $scope.description = description;
                    $scope.func = func;

                    spTranslateFilter.configureCatalog({
                        'ui_508_details_button': 'DETAILS {0}'
                    });

                    element = angular.element(template);
                    $compile(element)($scope);
                    $scope.$digest();
                }));

                afterEach(function () {
                    $scope.$destroy();
                });

                describe('button', function () {
                    var button;

                    beforeEach(function () {
                        button = element.find('button')[0];
                    });

                    it('should have a button with the correct id', function () {
                        expect(button.id).toBe('detailsButton-' + id);
                    });

                    it('should have a button that invokes the function when clicked', function () {
                        var event;

                        event = document.createEvent('MouseEvent');
                        event.initEvent('click', true, false);
                        button.dispatchEvent(event);
                        expect(func).toHaveBeenCalled();
                    });
                });

                it('should have a span with the screen reader label', function () {
                    // Screen reader span is the second span
                    var srSpan = element.find('span')[1];
                    expect(srSpan.classList.contains('sr-only')).toBeTruthy();
                    expect(srSpan.innerText).toContain(description);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvRGV0YWlsc0J1dHRvbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw4QkFBOEIsNENBQTRDLFVBQVUsU0FBUztJQUF6STs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCO1dBQzFDLFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFGN0IsU0FBUywwQkFBMEIsWUFBVztnQkFDMUMsSUFBSSxLQUFLO29CQUNMLGNBQWM7b0JBQ2QsT0FBTyxRQUFRO29CQUNmLFdBQVcsNENBQ1Asc0ZBQ0EsNkJBQ0E7b0JBQ0o7b0JBQVE7O2dCQUVaLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsVUFBVSxtQkFBbUI7b0JBQ2xFLFNBQVMsYUFBYTtvQkFDdEIsT0FBTyxLQUFLO29CQUNaLE9BQU8sY0FBYztvQkFDckIsT0FBTyxPQUFPOztvQkFFZCxrQkFBa0IsaUJBQWlCO3dCQUMvQix5QkFBeUI7OztvQkFHN0IsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLFVBQVUsWUFBVztvQkFDakIsT0FBTzs7O2dCQUdYLFNBQVMsVUFBVSxZQUFXO29CQUMxQixJQUFJOztvQkFFSixXQUFXLFlBQVc7d0JBQ2xCLFNBQVMsUUFBUSxLQUFLLFVBQVU7OztvQkFHcEMsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsT0FBTyxPQUFPLElBQUksS0FBSyxtQkFBbUI7OztvQkFHOUMsR0FBRywrREFBK0QsWUFBVzt3QkFDekUsSUFBSTs7d0JBRUosUUFBUSxTQUFTLFlBQVk7d0JBQzdCLE1BQU0sVUFBVSxTQUFTLE1BQU07d0JBQy9CLE9BQU8sY0FBYzt3QkFDckIsT0FBTyxNQUFNOzs7O2dCQUlyQixHQUFHLG1EQUFtRCxZQUFXOztvQkFFN0QsSUFBSSxTQUFTLFFBQVEsS0FBSyxRQUFRO29CQUNsQyxPQUFPLE9BQU8sVUFBVSxTQUFTLFlBQVk7b0JBQzdDLE9BQU8sT0FBTyxXQUFXLFVBQVU7Ozs7O0dBT3hDIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvRGV0YWlsc0J1dHRvbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2R1bGUgZnJvbSAnY29tbW9uL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xuXG5kZXNjcmliZSgnRGV0YWlsc0J1dHRvbkRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZCA9ICd1bmlxdWVJZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gJ3NyTmFtZScsXG4gICAgICAgIGZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgpLFxuICAgICAgICB0ZW1wbGF0ZSA9ICc8c3AtZGV0YWlscy1idXR0b24gZGV0YWlscy1pZD1cInt7aWR9fVwiICcgK1xuICAgICAgICAgICAgJyAgZGV0YWlscy1kZXNjcmlwdGlvbj1cInt7XFwndWlfNTA4X2RldGFpbHNfYnV0dG9uXFwnIHwgc3BUcmFuc2xhdGU6IGRlc2NyaXB0aW9ufX1cIiAnICtcbiAgICAgICAgICAgICcgIGRldGFpbHMtZnVuYz1cImZ1bmMoKVwiPicgK1xuICAgICAgICAgICAgJzwvc3AtZGV0YWlscy1idXR0b24+JyxcbiAgICAgICAgJHNjb3BlLCBlbGVtZW50O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod2lkZ2V0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sICRjb21waWxlLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkc2NvcGUuaWQgPSBpZDtcbiAgICAgICAgJHNjb3BlLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgICRzY29wZS5mdW5jID0gZnVuYztcblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICd1aV81MDhfZGV0YWlsc19idXR0b24nOiAnREVUQUlMUyB7MH0nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBidXR0b247XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhIGJ1dHRvbiB3aXRoIHRoZSBjb3JyZWN0IGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoYnV0dG9uLmlkKS50b0JlKCdkZXRhaWxzQnV0dG9uLScgKyBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhIGJ1dHRvbiB0aGF0IGludm9rZXMgdGhlIGZ1bmN0aW9uIHdoZW4gY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50O1xuXG4gICAgICAgICAgICBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgYnV0dG9uLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYSBzcGFuIHdpdGggdGhlIHNjcmVlbiByZWFkZXIgbGFiZWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gU2NyZWVuIHJlYWRlciBzcGFuIGlzIHRoZSBzZWNvbmQgc3BhblxuICAgICAgICB2YXIgc3JTcGFuID0gZWxlbWVudC5maW5kKCdzcGFuJylbMV07XG4gICAgICAgIGV4cGVjdChzclNwYW4uY2xhc3NMaXN0LmNvbnRhaW5zKCdzci1vbmx5JykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KHNyU3Bhbi5pbm5lclRleHQpLnRvQ29udGFpbihkZXNjcmlwdGlvbik7XG4gICAgfSk7XG5cbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
