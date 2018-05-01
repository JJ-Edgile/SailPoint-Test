System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('DescribableValueDirective', function () {
                var scope, element;

                beforeEach(module(widgetModule));

                beforeEach(inject(function ($rootScope, $compile) {

                    scope = $rootScope.$new();
                    scope.value = 'something';
                    scope.hasDescription = jasmine.createSpy().and.returnValue(true);
                    scope.showDescription = jasmine.createSpy();

                    element = getElement();
                    $compile(element)(scope);
                    scope.$digest();
                }));

                var getElement = function () {
                    return angular.element('<sp-describable-value sp-click="showDescription()" ' + 'sp-has-description="hasDescription()" ' + 'sp-value="value"/>');
                };

                it('should not show anchor tag with no description', function () {
                    scope.hasDescription = jasmine.createSpy().and.returnValue(false);
                    scope.$apply();
                    expect(scope.hasDescription).toHaveBeenCalled();
                    expect(element.find('a').hasClass('ng-hide')).toBe(true);
                });

                it('should show anchor tag and icon with description', function () {
                    scope.hasDescription = jasmine.createSpy().and.returnValue(true);
                    scope.$apply();
                    expect(scope.hasDescription).toHaveBeenCalled();
                    expect(element.find('a').hasClass('ng-hide')).toBe(false);
                    expect(element.find('a i').length).toBe(1);
                });

                it('should call method on anchor click', function () {
                    var anchor = element.find('a');
                    expect(anchor.length).toBe(1);
                    anchor.trigger('click');
                    expect(scope.showDescription).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvRGVzY3JpYmFibGVWYWx1ZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTO0lBQTlGOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSSxPQUNBOztnQkFFSixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFVBQVU7O29CQUU3QyxRQUFRLFdBQVc7b0JBQ25CLE1BQU0sUUFBUTtvQkFDZCxNQUFNLGlCQUFpQixRQUFRLFlBQVksSUFBSSxZQUFZO29CQUMzRCxNQUFNLGtCQUFrQixRQUFROztvQkFFaEMsVUFBVTtvQkFDVixTQUFTLFNBQVM7b0JBQ2xCLE1BQU07OztnQkFJVixJQUFJLGFBQWEsWUFBVztvQkFDeEIsT0FBTyxRQUFRLFFBQVEsd0RBQ25CLDJDQUNEOzs7Z0JBR1AsR0FBRyxrREFBa0QsWUFBVztvQkFDNUQsTUFBTSxpQkFBaUIsUUFBUSxZQUFZLElBQUksWUFBWTtvQkFDM0QsTUFBTTtvQkFDTixPQUFPLE1BQU0sZ0JBQWdCO29CQUM3QixPQUFPLFFBQVEsS0FBSyxLQUFLLFNBQVMsWUFBWSxLQUFLOzs7Z0JBR3ZELEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELE1BQU0saUJBQWlCLFFBQVEsWUFBWSxJQUFJLFlBQVk7b0JBQzNELE1BQU07b0JBQ04sT0FBTyxNQUFNLGdCQUFnQjtvQkFDN0IsT0FBTyxRQUFRLEtBQUssS0FBSyxTQUFTLFlBQVksS0FBSztvQkFDbkQsT0FBTyxRQUFRLEtBQUssT0FBTyxRQUFRLEtBQUs7OztnQkFHNUMsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsSUFBSSxTQUFTLFFBQVEsS0FBSztvQkFDMUIsT0FBTyxPQUFPLFFBQVEsS0FBSztvQkFDM0IsT0FBTyxRQUFRO29CQUNmLE9BQU8sTUFBTSxpQkFBaUI7Ozs7O0dBTW5DIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvRGVzY3JpYmFibGVWYWx1ZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2R1bGUgZnJvbSAnY29tbW9uL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG5kZXNjcmliZSgnRGVzY3JpYmFibGVWYWx1ZURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY29wZSxcbiAgICAgICAgZWxlbWVudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHdpZGdldE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgJGNvbXBpbGUpIHtcblxuICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICBzY29wZS52YWx1ZSA9ICdzb21ldGhpbmcnO1xuICAgICAgICBzY29wZS5oYXNEZXNjcmlwdGlvbiA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICBzY29wZS5zaG93RGVzY3JpcHRpb24gPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuXG4gICAgICAgIGVsZW1lbnQgPSBnZXRFbGVtZW50KCk7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xuXG4gICAgfSkpO1xuXG4gICAgdmFyIGdldEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudCgnPHNwLWRlc2NyaWJhYmxlLXZhbHVlIHNwLWNsaWNrPVwic2hvd0Rlc2NyaXB0aW9uKClcIiAnICtcbiAgICAgICAgICAgICdzcC1oYXMtZGVzY3JpcHRpb249XCJoYXNEZXNjcmlwdGlvbigpXCIgJyArXG4gICAgICAgICAgICdzcC12YWx1ZT1cInZhbHVlXCIvPicpO1xuICAgIH07XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBzaG93IGFuY2hvciB0YWcgd2l0aCBubyBkZXNjcmlwdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzY29wZS5oYXNEZXNjcmlwdGlvbiA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5oYXNEZXNjcmlwdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdhJykuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBhbmNob3IgdGFnIGFuZCBpY29uIHdpdGggZGVzY3JpcHRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2NvcGUuaGFzRGVzY3JpcHRpb24gPSBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5oYXNEZXNjcmlwdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdhJykuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZShmYWxzZSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2EgaScpLmxlbmd0aCkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBtZXRob2Qgb24gYW5jaG9yIGNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhbmNob3IgPSBlbGVtZW50LmZpbmQoJ2EnKTtcbiAgICAgICAgZXhwZWN0KGFuY2hvci5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGFuY2hvci50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICBleHBlY3Qoc2NvcGUuc2hvd0Rlc2NyaXB0aW9uKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
