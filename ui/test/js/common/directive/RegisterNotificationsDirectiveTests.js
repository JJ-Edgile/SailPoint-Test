System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('RegisterNotificationsDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    spNotificationService = undefined,
                    messages = undefined,
                    definition = '<sp-register-notifications sp-messages="messages"></sp-register-notifications>';

                beforeEach(module(directiveModule));

                function createElement(messages) {
                    var element = angular.element(definition);
                    $scope.messages = messages;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(inject(function (_$compile_, $rootScope, _spNotificationService_) {
                    spNotificationService = _spNotificationService_;
                    $compile = _$compile_;
                    $scope = $rootScope;
                    spyOn(spNotificationService, 'addMessages');
                }));

                it('should call notificationService to add the messages', function () {

                    messages = [{ messageOrKey: 'my message', status: 'SUCCESS' }];
                    var element = createElement(messages);
                    expect(element.length).toBe(1);

                    expect(spNotificationService.addMessages).toHaveBeenCalled();
                });

                it('should not call notificationService if no messages', function () {

                    createElement(null);
                    expect(spNotificationService.addMessages).not.toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvUmVnaXN0ZXJOb3RpZmljYXRpb25zRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFDaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsa0NBQWtDLFlBQVc7Z0JBQ2xELElBQUksU0FBTTtvQkFBRSxXQUFRO29CQUFFLHdCQUFxQjtvQkFBRSxXQUFRO29CQUNqRCxhQUFhOztnQkFFakIsV0FBVyxPQUFPOztnQkFFbEIsU0FBUyxjQUFjLFVBQVU7b0JBQzdCLElBQUksVUFBVSxRQUFRLFFBQVE7b0JBQzlCLE9BQU8sV0FBVztvQkFDbEIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVkseUJBQXlCO29CQUN4RSx3QkFBd0I7b0JBQ3hCLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxNQUFNLHVCQUF1Qjs7O2dCQUdqQyxHQUFHLHVEQUF1RCxZQUFXOztvQkFFakUsV0FBVyxDQUFDLEVBQUUsY0FBZSxjQUFjLFFBQVM7b0JBQ3BELElBQUksVUFBVSxjQUFjO29CQUM1QixPQUFPLFFBQVEsUUFBUSxLQUFLOztvQkFFNUIsT0FBTyxzQkFBc0IsYUFBYTs7O2dCQUc5QyxHQUFHLHNEQUFzRCxZQUFXOztvQkFFaEUsY0FBYztvQkFDZCxPQUFPLHNCQUFzQixhQUFhLElBQUk7Ozs7O0dBZW5EIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvUmVnaXN0ZXJOb3RpZmljYXRpb25zRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnUmVnaXN0ZXJOb3RpZmljYXRpb25zRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgc3BOb3RpZmljYXRpb25TZXJ2aWNlLCBtZXNzYWdlcyxcclxuICAgICAgICBkZWZpbml0aW9uID0gJzxzcC1yZWdpc3Rlci1ub3RpZmljYXRpb25zIHNwLW1lc3NhZ2VzPVwibWVzc2FnZXNcIj48L3NwLXJlZ2lzdGVyLW5vdGlmaWNhdGlvbnM+JztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KG1lc3NhZ2VzKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XHJcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gbWVzc2FnZXM7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgJHJvb3RTY29wZSwgX3NwTm90aWZpY2F0aW9uU2VydmljZV8pIHtcclxuICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UgPSBfc3BOb3RpZmljYXRpb25TZXJ2aWNlXztcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICBzcHlPbihzcE5vdGlmaWNhdGlvblNlcnZpY2UsICdhZGRNZXNzYWdlcycpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGl0KCdzaG91bGQgY2FsbCBub3RpZmljYXRpb25TZXJ2aWNlIHRvIGFkZCB0aGUgbWVzc2FnZXMnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgbWVzc2FnZXMgPSBbeyBtZXNzYWdlT3JLZXkgOiAnbXkgbWVzc2FnZScsIHN0YXR1cyA6ICdTVUNDRVNTJyB9XTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQobWVzc2FnZXMpO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50Lmxlbmd0aCkudG9CZSgxKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGRNZXNzYWdlcykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBub3RpZmljYXRpb25TZXJ2aWNlIGlmIG5vIG1lc3NhZ2VzJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGRNZXNzYWdlcykubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
