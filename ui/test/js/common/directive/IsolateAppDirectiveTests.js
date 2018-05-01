System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('IsolateAppDirective', function () {
                var elementDefinition = '<div sp-isolate-app="myTestApp">' + '<span id="myTestSnippetCtrlEl" ng-controller="myTestSnippetCtrl as ctrl">' + '</span></div>',
                    failElement = '<div sp-isolate-app=""></div>',
                    $scope = undefined,
                    $compile = undefined,

                // fake dummy module with fake controller
                myTestAppModule = angular.module('myTestApp', []).controller('myTestSnippetCtrl', ["$scope", function ($scope) {
                    $scope.name = 'My Test';
                }]);

                beforeEach(module(directiveModule, myTestAppModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();

                    $compile = _$compile_;
                }));

                function createElement(definition) {
                    var element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('created the directive correctly', function (done) {
                    var element = createElement(elementDefinition);

                    // this directive does something asynchronously, so we must
                    // test asynchronously as well
                    setTimeout(function () {
                        // the parent of the directive should be the created wrapped div
                        expect(element.is('div')).toBeTruthy();
                        // the span should now have a scope attached from it being bootstrapped
                        expect(element.find('#myTestSnippetCtrlEl').hasClass('ng-scope')).toBeTruthy();
                        // signal to jasmine that this test has finished
                        done();
                    });
                });

                it('should throw when the module does not exist', function () {
                    expect(function () {
                        return createElement(failElement);
                    }).toThrow();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvSXNvbGF0ZUFwcERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLHVCQUF1QixZQUFNO2dCQUNsQyxJQUFJLG9CQUNJLHFDQUNBLDhFQUNBO29CQUNKLGNBQWM7b0JBQ2QsU0FBTTtvQkFBRSxXQUFROzs7Z0JBRWhCLGtCQUFrQixRQUFRLE9BQU8sYUFBYSxJQUFJLFdBQVcsZ0NBQXFCLFVBQVMsUUFBUTtvQkFDL0YsT0FBTyxPQUFPOzs7Z0JBR3RCLFdBQVcsT0FBTyxpQkFBaUI7O2dCQUVuQyxXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVk7b0JBQy9DLFNBQVMsV0FBVzs7b0JBRXBCLFdBQVc7OztnQkFJZixTQUFTLGNBQWMsWUFBWTtvQkFDL0IsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxHQUFJLG1DQUFtQyxVQUFDLE1BQVM7b0JBQzdDLElBQUksVUFBVSxjQUFjOzs7O29CQUk1QixXQUFXLFlBQU07O3dCQUViLE9BQU8sUUFBUSxHQUFHLFFBQVE7O3dCQUUxQixPQUFPLFFBQVEsS0FBSyx3QkFBd0IsU0FBUyxhQUFhOzt3QkFFbEU7Ozs7Z0JBS1IsR0FBRywrQ0FBK0MsWUFBTTtvQkFDcEQsT0FBTyxZQUFBO3dCQUtTLE9BTEgsY0FBYzt1QkFBYzs7Ozs7R0FXOUMiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Jc29sYXRlQXBwRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG5kZXNjcmliZSgnSXNvbGF0ZUFwcERpcmVjdGl2ZScsICgpID0+IHtcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPVxuICAgICAgICAgICAgJzxkaXYgc3AtaXNvbGF0ZS1hcHA9XCJteVRlc3RBcHBcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBpZD1cIm15VGVzdFNuaXBwZXRDdHJsRWxcIiBuZy1jb250cm9sbGVyPVwibXlUZXN0U25pcHBldEN0cmwgYXMgY3RybFwiPicgK1xuICAgICAgICAgICAgJzwvc3Bhbj48L2Rpdj4nLFxuICAgICAgICBmYWlsRWxlbWVudCA9ICc8ZGl2IHNwLWlzb2xhdGUtYXBwPVwiXCI+PC9kaXY+JyxcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZSxcbiAgICAgICAgLy8gZmFrZSBkdW1teSBtb2R1bGUgd2l0aCBmYWtlIGNvbnRyb2xsZXJcbiAgICAgICAgbXlUZXN0QXBwTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ215VGVzdEFwcCcsIFtdKS5jb250cm9sbGVyKCdteVRlc3RTbmlwcGV0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSAnTXkgVGVzdCc7XG4gICAgICAgIH0pO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZGlyZWN0aXZlTW9kdWxlLCBteVRlc3RBcHBNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG5cbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuXG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGl0ICgnY3JlYXRlZCB0aGUgZGlyZWN0aXZlIGNvcnJlY3RseScsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG5cbiAgICAgICAgLy8gdGhpcyBkaXJlY3RpdmUgZG9lcyBzb21ldGhpbmcgYXN5bmNocm9ub3VzbHksIHNvIHdlIG11c3RcbiAgICAgICAgLy8gdGVzdCBhc3luY2hyb25vdXNseSBhcyB3ZWxsXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhlIHBhcmVudCBvZiB0aGUgZGlyZWN0aXZlIHNob3VsZCBiZSB0aGUgY3JlYXRlZCB3cmFwcGVkIGRpdlxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuaXMoJ2RpdicpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAvLyB0aGUgc3BhbiBzaG91bGQgbm93IGhhdmUgYSBzY29wZSBhdHRhY2hlZCBmcm9tIGl0IGJlaW5nIGJvb3RzdHJhcHBlZFxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI215VGVzdFNuaXBwZXRDdHJsRWwnKS5oYXNDbGFzcygnbmctc2NvcGUnKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgLy8gc2lnbmFsIHRvIGphc21pbmUgdGhhdCB0aGlzIHRlc3QgaGFzIGZpbmlzaGVkXG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdoZW4gdGhlIG1vZHVsZSBkb2VzIG5vdCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQoZmFpbEVsZW1lbnQpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
