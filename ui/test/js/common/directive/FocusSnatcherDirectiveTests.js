System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule', 'test/js/common/directive/FocusTestService'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }, function (_testJsCommonDirectiveFocusTestService) {}],
        execute: function () {

            describe('FocusSnatcherDirective', function () {
                var $scope,
                    $compile,
                    $timeout,
                    element,
                    focusTestService,
                    simpleElDef = '<input id="element" type="text" sp-focus-snatcher="watchedValue"/>',
                    focusElDef = '<span sp-focus-snatcher="watchedValue" sp-focus-snatcher-element=".focuser">' + '  <input class="focuser" type="text"/>' + '</span>',
                    waitElDef = '<input type="text" sp-focus-snatcher="watchedValue" sp-focus-snatcher-wait="500"/>';

                beforeEach(module(directiveModule));

                beforeEach(inject(function (_focusTestService_, _$rootScope_, _$compile_, _$timeout_) {
                    focusTestService = _focusTestService_;
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    $scope.watchedValue = false;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function triggerChange(timeout) {
                    timeout = angular.isDefined(timeout) ? timeout : 0;
                    $scope.watchedValue = true;
                    $scope.$apply();
                    $timeout.flush(timeout);
                }

                function verifyFocused(elt, expectFocused) {
                    expect(focusTestService.isFocused(elt)).toEqual(expectFocused);
                    expect($scope.watchedValue).toEqual(!expectFocused);
                }

                it('focuses on directive element when watched value changes from false to true', function () {
                    createElements(simpleElDef);
                    triggerChange();
                    verifyFocused(element.get(0), true);
                });

                it('focuses on sp-focus-snatcher-element when specified', function () {
                    createElements(focusElDef);
                    triggerChange();
                    verifyFocused(element.find('.focuser').get(0), true);
                });

                it('waits to focus when sp-focus-snatcher-wait is specified', function () {
                    createElements(waitElDef);
                    triggerChange(400);
                    verifyFocused(element.get(0), false);
                    $timeout.flush(100);
                    verifyFocused(element.get(0), true);
                });

                function createElements(eltDef) {
                    var body = angular.element('body');
                    element = angular.element(eltDef);
                    /* Setup Spies */
                    $compile(element)($scope);
                    body.append(element);
                    $scope.$apply();
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRm9jdXNTbmF0Y2hlckRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixvQ0FBb0MsOENBQThDLFVBQVUsU0FBUztJQUM3STs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7V0FDbkQsVUFBVSx3Q0FBd0M7UUFDckQsU0FBUyxZQUFZOztZQUo3QixTQUFTLDBCQUEwQixZQUFXO2dCQUMxQyxJQUFJO29CQUFRO29CQUFVO29CQUFVO29CQUFTO29CQUNyQyxjQUNJO29CQUNKLGFBQ0ksaUZBQ0EsMkNBQ0E7b0JBQ0osWUFDSTs7Z0JBR1IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsb0JBQW9CLGNBQWMsWUFBWSxZQUFZO29CQUNqRixtQkFBbUI7b0JBQ25CLFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCxXQUFXO29CQUNYLE9BQU8sZUFBZTs7O2dCQUcxQixVQUFVLFlBQVc7b0JBQ2pCLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLGNBQWMsU0FBUztvQkFDNUIsVUFBVSxRQUFRLFVBQVUsV0FBVyxVQUFVO29CQUNqRCxPQUFPLGVBQWU7b0JBQ3RCLE9BQU87b0JBQ1AsU0FBUyxNQUFNOzs7Z0JBR25CLFNBQVMsY0FBYyxLQUFLLGVBQWU7b0JBQ3ZDLE9BQU8saUJBQWlCLFVBQVUsTUFBTSxRQUFRO29CQUNoRCxPQUFPLE9BQU8sY0FBYyxRQUFRLENBQUM7OztnQkFHekMsR0FBRyw4RUFBOEUsWUFBVztvQkFDeEYsZUFBZTtvQkFDZjtvQkFDQSxjQUFjLFFBQVEsSUFBSSxJQUFJOzs7Z0JBR2xDLEdBQUcsdURBQXVELFlBQVc7b0JBQ2pFLGVBQWU7b0JBQ2Y7b0JBQ0EsY0FBYyxRQUFRLEtBQUssWUFBWSxJQUFJLElBQUk7OztnQkFHbkQsR0FBRywyREFBMkQsWUFBVztvQkFDckUsZUFBZTtvQkFDZixjQUFjO29CQUNkLGNBQWMsUUFBUSxJQUFJLElBQUk7b0JBQzlCLFNBQVMsTUFBTTtvQkFDZixjQUFjLFFBQVEsSUFBSSxJQUFJOzs7Z0JBR2xDLFNBQVMsZUFBZSxRQUFRO29CQUM1QixJQUFJLE9BQU8sUUFBUSxRQUFRO29CQUMzQixVQUFVLFFBQVEsUUFBUTs7b0JBRTFCLFNBQVMsU0FBUztvQkFDbEIsS0FBSyxPQUFPO29CQUNaLE9BQU87Ozs7O0dBU1oiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Gb2N1c1NuYXRjaGVyRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9kaXJlY3RpdmUvRm9jdXNUZXN0U2VydmljZSc7XG5cbmRlc2NyaWJlKCdGb2N1c1NuYXRjaGVyRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGNvbXBpbGUsICR0aW1lb3V0LCBlbGVtZW50LCBmb2N1c1Rlc3RTZXJ2aWNlLFxuICAgICAgICBzaW1wbGVFbERlZiA9XG4gICAgICAgICAgICAnPGlucHV0IGlkPVwiZWxlbWVudFwiIHR5cGU9XCJ0ZXh0XCIgc3AtZm9jdXMtc25hdGNoZXI9XCJ3YXRjaGVkVmFsdWVcIi8+JyxcbiAgICAgICAgZm9jdXNFbERlZiA9XG4gICAgICAgICAgICAnPHNwYW4gc3AtZm9jdXMtc25hdGNoZXI9XCJ3YXRjaGVkVmFsdWVcIiBzcC1mb2N1cy1zbmF0Y2hlci1lbGVtZW50PVwiLmZvY3VzZXJcIj4nICtcbiAgICAgICAgICAgICcgIDxpbnB1dCBjbGFzcz1cImZvY3VzZXJcIiB0eXBlPVwidGV4dFwiLz4nICtcbiAgICAgICAgICAgICc8L3NwYW4+JyxcbiAgICAgICAgd2FpdEVsRGVmID1cbiAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBzcC1mb2N1cy1zbmF0Y2hlcj1cIndhdGNoZWRWYWx1ZVwiIHNwLWZvY3VzLXNuYXRjaGVyLXdhaXQ9XCI1MDBcIi8+JztcblxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfZm9jdXNUZXN0U2VydmljZV8sIF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgXyR0aW1lb3V0Xykge1xuICAgICAgICBmb2N1c1Rlc3RTZXJ2aWNlID0gX2ZvY3VzVGVzdFNlcnZpY2VfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgJHNjb3BlLndhdGNoZWRWYWx1ZSA9IGZhbHNlO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRyaWdnZXJDaGFuZ2UodGltZW91dCkge1xuICAgICAgICB0aW1lb3V0ID0gYW5ndWxhci5pc0RlZmluZWQodGltZW91dCkgPyB0aW1lb3V0IDogMDtcbiAgICAgICAgJHNjb3BlLndhdGNoZWRWYWx1ZSA9IHRydWU7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgJHRpbWVvdXQuZmx1c2godGltZW91dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Rm9jdXNlZChlbHQsIGV4cGVjdEZvY3VzZWQpIHtcbiAgICAgICAgZXhwZWN0KGZvY3VzVGVzdFNlcnZpY2UuaXNGb2N1c2VkKGVsdCkpLnRvRXF1YWwoZXhwZWN0Rm9jdXNlZCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUud2F0Y2hlZFZhbHVlKS50b0VxdWFsKCFleHBlY3RGb2N1c2VkKTtcbiAgICB9XG5cbiAgICBpdCgnZm9jdXNlcyBvbiBkaXJlY3RpdmUgZWxlbWVudCB3aGVuIHdhdGNoZWQgdmFsdWUgY2hhbmdlcyBmcm9tIGZhbHNlIHRvIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudHMoc2ltcGxlRWxEZWYpO1xuICAgICAgICB0cmlnZ2VyQ2hhbmdlKCk7XG4gICAgICAgIHZlcmlmeUZvY3VzZWQoZWxlbWVudC5nZXQoMCksIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZvY3VzZXMgb24gc3AtZm9jdXMtc25hdGNoZXItZWxlbWVudCB3aGVuIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVFbGVtZW50cyhmb2N1c0VsRGVmKTtcbiAgICAgICAgdHJpZ2dlckNoYW5nZSgpO1xuICAgICAgICB2ZXJpZnlGb2N1c2VkKGVsZW1lbnQuZmluZCgnLmZvY3VzZXInKS5nZXQoMCksIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dhaXRzIHRvIGZvY3VzIHdoZW4gc3AtZm9jdXMtc25hdGNoZXItd2FpdCBpcyBzcGVjaWZpZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudHMod2FpdEVsRGVmKTtcbiAgICAgICAgdHJpZ2dlckNoYW5nZSg0MDApO1xuICAgICAgICB2ZXJpZnlGb2N1c2VkKGVsZW1lbnQuZ2V0KDApLCBmYWxzZSk7XG4gICAgICAgICR0aW1lb3V0LmZsdXNoKDEwMCk7XG4gICAgICAgIHZlcmlmeUZvY3VzZWQoZWxlbWVudC5nZXQoMCksIHRydWUpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudHMoZWx0RGVmKSB7XG4gICAgICAgIHZhciBib2R5ID0gYW5ndWxhci5lbGVtZW50KCdib2R5Jyk7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0RGVmKTtcbiAgICAgICAgLyogU2V0dXAgU3BpZXMgKi9cbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgYm9keS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
