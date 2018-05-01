System.register(['test/js/TestInitializer', 'home/widget/WidgetModule'], function (_export) {
    'use strict';

    var homeWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWidgetModule) {
            homeWidgetModule = _homeWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('WidgetDirective', function () {
                var definition = '<sp-widget sp-widget="widget" />',
                    $scope,
                    $compile;

                beforeEach(module(homeWidgetModule));

                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                }));

                function createElement(widget) {
                    $scope.widget = widget;

                    var newElement = angular.element(definition);
                    $compile(newElement)($scope);
                    $scope.$apply();
                    return angular.element(newElement);
                }

                it('blows up with undefined widget', function () {
                    expect(function () {
                        createElement();
                    }).toThrow();
                });

                it('uses dash-cased widget name for child directive', function () {
                    var widget = {
                        title: 'Widget!',
                        name: 'someDumbThing'
                    };
                    var element = createElement(widget);
                    expect(element.find('sp-some-dumb-thing-widget').length).toEqual(1);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L1dpZGdldERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQTVGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsbUJBQW1CLHdCQUF3Qjs7UUFFL0MsU0FBUyxZQUFZOztZQUg3QixTQUFTLG1CQUFtQixZQUFXO2dCQUNuQyxJQUFJLGFBQWE7b0JBQ2I7b0JBQVE7O2dCQUVaLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWTtvQkFDakQsU0FBUyxhQUFhO29CQUN0QixXQUFXOzs7Z0JBR2YsU0FBUyxjQUFjLFFBQVE7b0JBQzNCLE9BQU8sU0FBUzs7b0JBRWhCLElBQUksYUFBYSxRQUFRLFFBQVE7b0JBQ2pDLFNBQVMsWUFBWTtvQkFDckIsT0FBTztvQkFDUCxPQUFPLFFBQVEsUUFBUTs7O2dCQUczQixHQUFHLGtDQUFrQyxZQUFXO29CQUM1QyxPQUFPLFlBQVc7d0JBQUM7dUJBQW1COzs7Z0JBRzFDLEdBQUcsbURBQW1ELFlBQVc7b0JBQzdELElBQUksU0FBUzt3QkFDVCxPQUFPO3dCQUNQLE1BQU07O29CQUVWLElBQUksVUFBVSxjQUFjO29CQUM1QixPQUFPLFFBQVEsS0FBSyw2QkFBNkIsUUFBUSxRQUFROzs7OztHQWF0RSIsImZpbGUiOiJob21lL3dpZGdldC9XaWRnZXREaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaG9tZVdpZGdldE1vZHVsZSBmcm9tICdob21lL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG5kZXNjcmliZSgnV2lkZ2V0RGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlZmluaXRpb24gPSAnPHNwLXdpZGdldCBzcC13aWRnZXQ9XCJ3aWRnZXRcIiAvPicsXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShob21lV2lkZ2V0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8pIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQod2lkZ2V0KSB7XG4gICAgICAgICRzY29wZS53aWRnZXQgPSB3aWRnZXQ7XG5cbiAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKG5ld0VsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChuZXdFbGVtZW50KTtcbiAgICB9XG5cbiAgICBpdCgnYmxvd3MgdXAgd2l0aCB1bmRlZmluZWQgd2lkZ2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtjcmVhdGVFbGVtZW50KCk7fSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgZGFzaC1jYXNlZCB3aWRnZXQgbmFtZSBmb3IgY2hpbGQgZGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aWRnZXQgPSB7XG4gICAgICAgICAgICB0aXRsZTogJ1dpZGdldCEnLFxuICAgICAgICAgICAgbmFtZTogJ3NvbWVEdW1iVGhpbmcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh3aWRnZXQpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdzcC1zb21lLWR1bWItdGhpbmctd2lkZ2V0JykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
