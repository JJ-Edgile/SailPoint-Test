System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('NotificationDirective', function () {
                var $scope,
                    $compile,
                    spNotificationService,
                    SpMessage,
                    NOTIFICATION_MESSAGE = 'Access Request Submitted',
                    simpleElementDefinition = '<sp-notification />',
                    triggerableElementDefinition = '<sp-notification sp-triggerable="true" sp-dismissable="dismissable" />',
                    element;

                function createElement(definition) {
                    var newElement = angular.element(definition);
                    $compile(newElement)($scope);
                    $scope.$apply();
                    return angular.element(newElement);
                }

                beforeEach(module(directiveModule));

                beforeEach(inject(function (_$compile_, $rootScope, _spNotificationService_, _SpMessage_) {
                    spNotificationService = _spNotificationService_;
                    SpMessage = _SpMessage_;
                    $compile = _$compile_;
                    $scope = $rootScope;
                    $scope.dismissable = true;
                }));

                /**
                 * Make sure DOM looks ok when status is success
                 */
                it('should have the right classes when status is success', function () {
                    spNotificationService.addNotification(NOTIFICATION_MESSAGE, SpMessage.SUCCESS);

                    element = createElement(simpleElementDefinition).find('.alert-box');

                    expect(element.length).toBe(1);

                    expect(element.find('h5')[0].innerText.trim()).toBe(NOTIFICATION_MESSAGE);

                    element = angular.element(element.children()[0]);
                    expect(angular.element(element.children()[0]).hasClass('alert-success')).toBeTruthy();
                    expect(angular.element(element.children()[0]).hasClass('text-success')).toBeTruthy();
                    expect(angular.element(element.children()[0]).hasClass('alert-danger')).not.toBeTruthy();
                });

                /**
                 * Make sure DOM looks ok when status is not success
                 */
                it('should have the right classes when status is NOT success', function () {
                    spNotificationService.addNotification(NOTIFICATION_MESSAGE, SpMessage.ERROR);
                    element = createElement(simpleElementDefinition).find('.alert-box');

                    expect(element.length).toBe(1);
                    expect(element.find('h5')[0].innerText.trim()).toBe(NOTIFICATION_MESSAGE);

                    element = angular.element(element.children()[0]);
                    expect(angular.element(element.children()[0]).hasClass('alert-success')).not.toBeTruthy();
                    expect(angular.element(element.children()[0]).hasClass('text-success')).not.toBeTruthy();
                    expect(angular.element(element.children()[0]).hasClass('alert-danger')).toBeTruthy();
                });

                describe('sp-triggerable', function () {
                    it('updates messages when triggered', function () {
                        spNotificationService.addNotification(NOTIFICATION_MESSAGE, SpMessage.ERROR);
                        element = createElement(triggerableElementDefinition);

                        expect(spNotificationService.getNotifications()).toEqual(undefined);

                        spNotificationService.addNotification('message 1', SpMessage.SUCCESS);
                        spNotificationService.addNotification('message 2', SpMessage.SUCCESS);
                        spNotificationService.triggerDirective();

                        $scope.$apply();
                        expect(element.find('.alert').length).toBe(2);
                        expect(spNotificationService.getNotifications()).toEqual(undefined);
                        expect(spNotificationService.directiveTrigger).toEqual(undefined);
                    });

                    it('does not update if not marked as triggerable', function () {
                        element = createElement(simpleElementDefinition);
                        spNotificationService.addNotification('message 1', SpMessage.SUCCESS);
                        spNotificationService.addNotification('message 2', SpMessage.SUCCESS);
                        spNotificationService.triggerDirective();

                        $scope.$apply();
                        expect(element.find('.alert').length).toBe(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTm90aWZpY2F0aW9uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFDaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMseUJBQXlCLFlBQVc7Z0JBQ3pDLElBQUk7b0JBQVE7b0JBQVU7b0JBQXVCO29CQUN6Qyx1QkFBdUI7b0JBQ3ZCLDBCQUEwQjtvQkFDMUIsK0JBQStCO29CQUMvQjs7Z0JBRUosU0FBUyxjQUFjLFlBQVk7b0JBQy9CLElBQUksYUFBYSxRQUFRLFFBQVE7b0JBQ2pDLFNBQVMsWUFBWTtvQkFDckIsT0FBTztvQkFDUCxPQUFPLFFBQVEsUUFBUTs7O2dCQUczQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVkseUJBQXlCLGFBQWE7b0JBQ3JGLHdCQUF3QjtvQkFDeEIsWUFBWTtvQkFDWixXQUFXO29CQUNYLFNBQVM7b0JBQ1QsT0FBTyxjQUFjOzs7Ozs7Z0JBTXpCLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLHNCQUFzQixnQkFBZ0Isc0JBQXNCLFVBQVU7O29CQUV0RSxVQUFVLGNBQWMseUJBQXlCLEtBQUs7O29CQUV0RCxPQUFPLFFBQVEsUUFBUSxLQUFLOztvQkFFNUIsT0FBTyxRQUFRLEtBQUssTUFBTSxHQUFHLFVBQVUsUUFBUSxLQUFLOztvQkFFcEQsVUFBVSxRQUFRLFFBQVEsUUFBUSxXQUFXO29CQUM3QyxPQUFPLFFBQVEsUUFBUSxRQUFRLFdBQVcsSUFBSSxTQUFTLGtCQUFrQjtvQkFDekUsT0FBTyxRQUFRLFFBQVEsUUFBUSxXQUFXLElBQUksU0FBUyxpQkFBaUI7b0JBQ3hFLE9BQU8sUUFBUSxRQUFRLFFBQVEsV0FBVyxJQUFJLFNBQVMsaUJBQWlCLElBQUk7Ozs7OztnQkFNaEYsR0FBRyw0REFBNEQsWUFBVztvQkFDdEUsc0JBQXNCLGdCQUFnQixzQkFBc0IsVUFBVTtvQkFDdEUsVUFBVSxjQUFjLHlCQUF5QixLQUFLOztvQkFFdEQsT0FBTyxRQUFRLFFBQVEsS0FBSztvQkFDNUIsT0FBTyxRQUFRLEtBQUssTUFBTSxHQUFHLFVBQVUsUUFBUSxLQUFLOztvQkFFcEQsVUFBVSxRQUFRLFFBQVEsUUFBUSxXQUFXO29CQUM3QyxPQUFPLFFBQVEsUUFBUSxRQUFRLFdBQVcsSUFBSSxTQUFTLGtCQUFrQixJQUFJO29CQUM3RSxPQUFPLFFBQVEsUUFBUSxRQUFRLFdBQVcsSUFBSSxTQUFTLGlCQUFpQixJQUFJO29CQUM1RSxPQUFPLFFBQVEsUUFBUSxRQUFRLFdBQVcsSUFBSSxTQUFTLGlCQUFpQjs7O2dCQUc1RSxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxHQUFJLG1DQUFtQyxZQUFXO3dCQUM5QyxzQkFBc0IsZ0JBQWdCLHNCQUFzQixVQUFVO3dCQUN0RSxVQUFVLGNBQWM7O3dCQUV4QixPQUFPLHNCQUFzQixvQkFBb0IsUUFBUTs7d0JBRXpELHNCQUFzQixnQkFBZ0IsYUFBYSxVQUFVO3dCQUM3RCxzQkFBc0IsZ0JBQWdCLGFBQWEsVUFBVTt3QkFDN0Qsc0JBQXNCOzt3QkFFdEIsT0FBTzt3QkFDUCxPQUFPLFFBQVEsS0FBSyxVQUFVLFFBQVEsS0FBSzt3QkFDM0MsT0FBTyxzQkFBc0Isb0JBQW9CLFFBQVE7d0JBQ3pELE9BQU8sc0JBQXNCLGtCQUFrQixRQUFROzs7b0JBRzNELEdBQUksZ0RBQWdELFlBQVc7d0JBQzNELFVBQVUsY0FBYzt3QkFDeEIsc0JBQXNCLGdCQUFnQixhQUFhLFVBQVU7d0JBQzdELHNCQUFzQixnQkFBZ0IsYUFBYSxVQUFVO3dCQUM3RCxzQkFBc0I7O3dCQUV0QixPQUFPO3dCQUNQLE9BQU8sUUFBUSxLQUFLLFVBQVUsUUFBUSxLQUFLOzs7Ozs7R0FnQnBEIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvTm90aWZpY2F0aW9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xuXG5kZXNjcmliZSgnTm90aWZpY2F0aW9uRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGNvbXBpbGUsIHNwTm90aWZpY2F0aW9uU2VydmljZSwgU3BNZXNzYWdlLFxuICAgICAgICBOT1RJRklDQVRJT05fTUVTU0FHRSA9ICdBY2Nlc3MgUmVxdWVzdCBTdWJtaXR0ZWQnLFxuICAgICAgICBzaW1wbGVFbGVtZW50RGVmaW5pdGlvbiA9ICc8c3Atbm90aWZpY2F0aW9uIC8+JyxcbiAgICAgICAgdHJpZ2dlcmFibGVFbGVtZW50RGVmaW5pdGlvbiA9ICc8c3Atbm90aWZpY2F0aW9uIHNwLXRyaWdnZXJhYmxlPVwidHJ1ZVwiIHNwLWRpc21pc3NhYmxlPVwiZGlzbWlzc2FibGVcIiAvPicsXG4gICAgICAgIGVsZW1lbnQ7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIG5ld0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKG5ld0VsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChuZXdFbGVtZW50KTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sICRyb290U2NvcGUsIF9zcE5vdGlmaWNhdGlvblNlcnZpY2VfLCBfU3BNZXNzYWdlXykge1xuICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UgPSBfc3BOb3RpZmljYXRpb25TZXJ2aWNlXztcbiAgICAgICAgU3BNZXNzYWdlID0gX1NwTWVzc2FnZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgJHNjb3BlLmRpc21pc3NhYmxlID0gdHJ1ZTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgRE9NIGxvb2tzIG9rIHdoZW4gc3RhdHVzIGlzIHN1Y2Nlc3NcbiAgICAgKi9cbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIHJpZ2h0IGNsYXNzZXMgd2hlbiBzdGF0dXMgaXMgc3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKE5PVElGSUNBVElPTl9NRVNTQUdFLCBTcE1lc3NhZ2UuU1VDQ0VTUyk7XG5cbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoc2ltcGxlRWxlbWVudERlZmluaXRpb24pLmZpbmQoJy5hbGVydC1ib3gnKTtcblxuICAgICAgICBleHBlY3QoZWxlbWVudC5sZW5ndGgpLnRvQmUoMSk7XG5cbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnaDUnKVswXS5pbm5lclRleHQudHJpbSgpKS50b0JlKE5PVElGSUNBVElPTl9NRVNTQUdFKTtcblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4oKVswXSk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5jaGlsZHJlbigpWzBdKS5oYXNDbGFzcygnYWxlcnQtc3VjY2VzcycpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5jaGlsZHJlbigpWzBdKS5oYXNDbGFzcygndGV4dC1zdWNjZXNzJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmNoaWxkcmVuKClbMF0pLmhhc0NsYXNzKCdhbGVydC1kYW5nZXInKSkubm90LnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSBET00gbG9va3Mgb2sgd2hlbiBzdGF0dXMgaXMgbm90IHN1Y2Nlc3NcbiAgICAgKi9cbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIHJpZ2h0IGNsYXNzZXMgd2hlbiBzdGF0dXMgaXMgTk9UIHN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihOT1RJRklDQVRJT05fTUVTU0FHRSwgU3BNZXNzYWdlLkVSUk9SKTtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoc2ltcGxlRWxlbWVudERlZmluaXRpb24pLmZpbmQoJy5hbGVydC1ib3gnKTtcblxuICAgICAgICBleHBlY3QoZWxlbWVudC5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2g1JylbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9CZShOT1RJRklDQVRJT05fTUVTU0FHRSk7XG5cbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmNoaWxkcmVuKClbMF0pO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4oKVswXSkuaGFzQ2xhc3MoJ2FsZXJ0LXN1Y2Nlc3MnKSkubm90LnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmNoaWxkcmVuKClbMF0pLmhhc0NsYXNzKCd0ZXh0LXN1Y2Nlc3MnKSkubm90LnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmNoaWxkcmVuKClbMF0pLmhhc0NsYXNzKCdhbGVydC1kYW5nZXInKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NwLXRyaWdnZXJhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ICgndXBkYXRlcyBtZXNzYWdlcyB3aGVuIHRyaWdnZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3BOb3RpZmljYXRpb25TZXJ2aWNlLmFkZE5vdGlmaWNhdGlvbihOT1RJRklDQVRJT05fTUVTU0FHRSwgU3BNZXNzYWdlLkVSUk9SKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRyaWdnZXJhYmxlRWxlbWVudERlZmluaXRpb24pO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbnMoKSkudG9FcXVhbCh1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKCdtZXNzYWdlIDEnLCBTcE1lc3NhZ2UuU1VDQ0VTUyk7XG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UuYWRkTm90aWZpY2F0aW9uKCdtZXNzYWdlIDInLCBTcE1lc3NhZ2UuU1VDQ0VTUyk7XG4gICAgICAgICAgICBzcE5vdGlmaWNhdGlvblNlcnZpY2UudHJpZ2dlckRpcmVjdGl2ZSgpO1xuXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcuYWxlcnQnKS5sZW5ndGgpLnRvQmUoMik7XG4gICAgICAgICAgICBleHBlY3Qoc3BOb3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvbnMoKSkudG9FcXVhbCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTm90aWZpY2F0aW9uU2VydmljZS5kaXJlY3RpdmVUcmlnZ2VyKS50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0ICgnZG9lcyBub3QgdXBkYXRlIGlmIG5vdCBtYXJrZWQgYXMgdHJpZ2dlcmFibGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHNpbXBsZUVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24oJ21lc3NhZ2UgMScsIFNwTWVzc2FnZS5TVUNDRVNTKTtcbiAgICAgICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZS5hZGROb3RpZmljYXRpb24oJ21lc3NhZ2UgMicsIFNwTWVzc2FnZS5TVUNDRVNTKTtcbiAgICAgICAgICAgIHNwTm90aWZpY2F0aW9uU2VydmljZS50cmlnZ2VyRGlyZWN0aXZlKCk7XG5cbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5hbGVydCcpLmxlbmd0aCkudG9CZSgwKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
