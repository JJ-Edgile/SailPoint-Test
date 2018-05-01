System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('TranscludeInnerScopeDirective', function () {

                var $compile = undefined,
                    element = undefined,
                    $scope = undefined;

                beforeEach(module(directiveModule));

                // Register a couple of directives to test with.
                beforeEach(module(function ($compileProvider) {
                    function createDirective(doTransclude, slotName) {
                        var template = !slotName ? '<div ng-repeat="item in parentCtrl.items" sp-transclude-inner-scope></div>' : '<div ng-repeat="item in parentCtrl.items" sp-transclude-inner-scope="' + slotName + '"></div>';
                        return function () {
                            return {
                                restrict: 'E',
                                scope: true,
                                transclude: doTransclude,
                                controller: function () {
                                    this.items = [1, 2, 3];
                                },
                                controllerAs: 'parentCtrl',
                                template: template
                            };
                        };
                    }

                    $compileProvider.directive('parentNoTransclude', createDirective(false));
                    $compileProvider.directive('parent', createDirective(true));
                    $compileProvider.directive('parentSlot', createDirective({ slotName: 'slotName' }, 'slotName'));
                }));

                beforeEach(inject(function (_$compile_, $rootScope) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(eltDef) {
                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();
                    return element;
                }

                it('vomits when not included in a transclude directive', function () {
                    var elt = '<parent-no-transclude>{{ item }}</parent-no-transclude>';
                    expect(function () {
                        return compile(elt);
                    }).toThrow();
                });

                function testInnerScope(elt, selector) {
                    compile(elt);

                    var items = element.find(selector);
                    expect(items.length).toEqual(3);
                    expect(angular.element(items[0]).text().trim()).toEqual('1');
                    expect(angular.element(items[1]).text().trim()).toEqual('2');
                    expect(angular.element(items[2]).text().trim()).toEqual('3');
                }

                it('uses the inner scope when rendering transcluded content', function () {
                    var elt = '<parent>{{ item }}</parent>';
                    testInnerScope(elt, 'div');
                });

                it('uses slotName if provided', function () {
                    var elt = '<parent-slot><slot-name>{{ item }}</slot-name></parent-slot>';
                    testInnerScope(elt, 'div slot-name');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvVHJhbnNjbHVkZUlubmVyU2NvcGVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUNoRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxpQ0FBaUMsWUFBTTs7Z0JBRTVDLElBQUksV0FBUTtvQkFBRSxVQUFPO29CQUFFLFNBQU07O2dCQUU3QixXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQUMsa0JBQXFCO29CQUNwQyxTQUFTLGdCQUFnQixjQUFjLFVBQVU7d0JBQzdDLElBQUksV0FBVyxDQUFFLFdBQVEsK0VBQUEsMEVBQ21ELFdBQVE7d0JBQ3BGLE9BQU8sWUFBVzs0QkFDZCxPQUFPO2dDQUNILFVBQVU7Z0NBQ1YsT0FBTztnQ0FDUCxZQUFZO2dDQUNaLFlBQVksWUFBVztvQ0FDbkIsS0FBSyxRQUFRLENBQUUsR0FBRyxHQUFHOztnQ0FFekIsY0FBYztnQ0FDZCxVQUFVOzs7OztvQkFLdEIsaUJBQWlCLFVBQVUsc0JBQXNCLGdCQUFnQjtvQkFDakUsaUJBQWlCLFVBQVUsVUFBVSxnQkFBZ0I7b0JBQ3JELGlCQUFpQixVQUFVLGNBQWMsZ0JBQWdCLEVBQUUsVUFBVSxjQUFhOzs7Z0JBR3RGLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBZTtvQkFDMUMsV0FBVztvQkFDWCxTQUFTOzs7Z0JBR2IsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFFBQVEsUUFBUTtvQkFDckIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsR0FBRyxzREFBc0QsWUFBTTtvQkFDM0QsSUFBSSxNQUFHO29CQUNQLE9BQU8sWUFBQTt3QkFTUyxPQVRILFFBQVE7dUJBQU07OztnQkFHL0IsU0FBUyxlQUFlLEtBQUssVUFBVTtvQkFDbkMsUUFBUTs7b0JBRVIsSUFBSSxRQUFRLFFBQVEsS0FBSztvQkFDekIsT0FBTyxNQUFNLFFBQVEsUUFBUTtvQkFDN0IsT0FBTyxRQUFRLFFBQVEsTUFBTSxJQUFJLE9BQU8sUUFBUSxRQUFRO29CQUN4RCxPQUFPLFFBQVEsUUFBUSxNQUFNLElBQUksT0FBTyxRQUFRLFFBQVE7b0JBQ3hELE9BQU8sUUFBUSxRQUFRLE1BQU0sSUFBSSxPQUFPLFFBQVEsUUFBUTs7O2dCQUc1RCxHQUFHLDJEQUEyRCxZQUFNO29CQUNoRSxJQUFJLE1BQUc7b0JBQ1AsZUFBZSxLQUFLOzs7Z0JBR3hCLEdBQUcsNkJBQTZCLFlBQU07b0JBQ2xDLElBQUksTUFBRztvQkFDUCxlQUFlLEtBQUs7Ozs7O0dBZXpCIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvVHJhbnNjbHVkZUlubmVyU2NvcGVEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdUcmFuc2NsdWRlSW5uZXJTY29wZURpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgJGNvbXBpbGUsIGVsZW1lbnQsICRzY29wZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcclxuXHJcbiAgICAvLyBSZWdpc3RlciBhIGNvdXBsZSBvZiBkaXJlY3RpdmVzIHRvIHRlc3Qgd2l0aC5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKCgkY29tcGlsZVByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlRGlyZWN0aXZlKGRvVHJhbnNjbHVkZSwgc2xvdE5hbWUpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gKCFzbG90TmFtZSkgPyBgPGRpdiBuZy1yZXBlYXQ9XCJpdGVtIGluIHBhcmVudEN0cmwuaXRlbXNcIiBzcC10cmFuc2NsdWRlLWlubmVyLXNjb3BlPjwvZGl2PmAgOlxyXG4gICAgICAgICAgICAgICAgYDxkaXYgbmctcmVwZWF0PVwiaXRlbSBpbiBwYXJlbnRDdHJsLml0ZW1zXCIgc3AtdHJhbnNjbHVkZS1pbm5lci1zY29wZT1cIiR7c2xvdE5hbWV9XCI+PC9kaXY+YDtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY2x1ZGU6IGRvVHJhbnNjbHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFsgMSwgMiwgMyBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAncGFyZW50Q3RybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGNvbXBpbGVQcm92aWRlci5kaXJlY3RpdmUoJ3BhcmVudE5vVHJhbnNjbHVkZScsIGNyZWF0ZURpcmVjdGl2ZShmYWxzZSkpO1xyXG4gICAgICAgICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlKCdwYXJlbnQnLCBjcmVhdGVEaXJlY3RpdmUodHJ1ZSkpO1xyXG4gICAgICAgICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlKCdwYXJlbnRTbG90JywgY3JlYXRlRGlyZWN0aXZlKHsgc2xvdE5hbWU6ICdzbG90TmFtZSd9LCAnc2xvdE5hbWUnKSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcGlsZShlbHREZWYpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCd2b21pdHMgd2hlbiBub3QgaW5jbHVkZWQgaW4gYSB0cmFuc2NsdWRlIGRpcmVjdGl2ZScsICgpID0+IHtcclxuICAgICAgICBsZXQgZWx0ID0gYDxwYXJlbnQtbm8tdHJhbnNjbHVkZT57eyBpdGVtIH19PC9wYXJlbnQtbm8tdHJhbnNjbHVkZT5gO1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKGVsdCkpLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RJbm5lclNjb3BlKGVsdCwgc2VsZWN0b3IpIHtcclxuICAgICAgICBjb21waWxlKGVsdCk7XHJcblxyXG4gICAgICAgIGxldCBpdGVtcyA9IGVsZW1lbnQuZmluZChzZWxlY3Rvcik7XHJcbiAgICAgICAgZXhwZWN0KGl0ZW1zLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGl0ZW1zWzBdKS50ZXh0KCkudHJpbSgpKS50b0VxdWFsKCcxJyk7XHJcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChpdGVtc1sxXSkudGV4dCgpLnRyaW0oKSkudG9FcXVhbCgnMicpO1xyXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoaXRlbXNbMl0pLnRleHQoKS50cmltKCkpLnRvRXF1YWwoJzMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgndXNlcyB0aGUgaW5uZXIgc2NvcGUgd2hlbiByZW5kZXJpbmcgdHJhbnNjbHVkZWQgY29udGVudCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZWx0ID0gYDxwYXJlbnQ+e3sgaXRlbSB9fTwvcGFyZW50PmA7XHJcbiAgICAgICAgdGVzdElubmVyU2NvcGUoZWx0LCAnZGl2Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndXNlcyBzbG90TmFtZSBpZiBwcm92aWRlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZWx0ID0gYDxwYXJlbnQtc2xvdD48c2xvdC1uYW1lPnt7IGl0ZW0gfX08L3Nsb3QtbmFtZT48L3BhcmVudC1zbG90PmA7XHJcbiAgICAgICAgdGVzdElubmVyU2NvcGUoZWx0LCAnZGl2IHNsb3QtbmFtZScpO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
