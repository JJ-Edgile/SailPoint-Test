System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('SelectOnClick', function () {
                var input, $scope, $compile, $window;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$window_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    $window = _$window_;
                }));

                var compileInput = function (markup) {
                    var body = angular.element('body');
                    var element = angular.element(markup);
                    $compile(element)($scope);
                    body.append(element);
                    $scope.$apply();
                    return element;
                };

                it('should select all when clicked', function () {
                    input = compileInput('<input sp-select-on-click value="123"/>');
                    input.click();
                    expect($window.getSelection().toString()).toBe('123');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvU2VsZWN0T25DbGlja0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGlCQUFpQixZQUFXO2dCQUNqQyxJQUFJLE9BQU8sUUFBUSxVQUFVOztnQkFFN0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLFdBQVc7b0JBQzFELFNBQVMsV0FBVztvQkFDcEIsV0FBVztvQkFDWCxVQUFVOzs7Z0JBR2QsSUFBSSxlQUFlLFVBQVMsUUFBUTtvQkFDaEMsSUFBSSxPQUFPLFFBQVEsUUFBUTtvQkFDM0IsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixLQUFLLE9BQU87b0JBQ1osT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsUUFBUSxhQUFhO29CQUNyQixNQUFNO29CQUNOLE9BQU8sUUFBUSxlQUFlLFlBQVksS0FBSzs7Ozs7R0FZcEQiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9TZWxlY3RPbkNsaWNrRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG5kZXNjcmliZSgnU2VsZWN0T25DbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbnB1dCwgJHNjb3BlLCAkY29tcGlsZSwgJHdpbmRvdztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgXyR3aW5kb3dfKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgfSkpO1xuXG4gICAgdmFyIGNvbXBpbGVJbnB1dCA9IGZ1bmN0aW9uKG1hcmt1cCkge1xuICAgICAgICBsZXQgYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChtYXJrdXApO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICBib2R5LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuXG4gICAgaXQoJ3Nob3VsZCBzZWxlY3QgYWxsIHdoZW4gY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpbnB1dCA9IGNvbXBpbGVJbnB1dCgnPGlucHV0IHNwLXNlbGVjdC1vbi1jbGljayB2YWx1ZT1cIjEyM1wiLz4nKTtcbiAgICAgICAgaW5wdXQuY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KCR3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSkudG9CZSgnMTIzJyk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
