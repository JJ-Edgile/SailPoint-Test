System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('BulkPasswordChangeResultStatusDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    managePasswordDataService = undefined,
                    BulkPasswordChangeResult = undefined;
                beforeEach(module(identityModule));

                beforeEach(inject(function (_managePasswordDataService_, _$rootScope_, _$compile_, _BulkPasswordChangeResult_) {
                    managePasswordDataService = _managePasswordDataService_;
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    BulkPasswordChangeResult = _BulkPasswordChangeResult_;
                }));

                function createElement() {
                    var definition = '<sp-bulk-password-change-result-status sp-model="bulkPasswordChangeResult">' + '</sp-bulk-password-change-result-status>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockBulkPasswordChangeResult(messages, successes, errors) {
                    return new BulkPasswordChangeResult({
                        workflowStatus: errors && errors.length > 0 ? 'failed' : 'succeeded',
                        identityRequestId: '123',
                        workflowWorkItemType: '',
                        workflowWorkItemId: '',
                        messages: messages,
                        successes: successes,
                        failures: errors
                    });
                }

                it('should not have any messages when there are no password errors or changes', function () {
                    $scope.bulkPasswordChangeResult = createMockBulkPasswordChangeResult([], [], []);
                    var element = createElement(),
                        success = element.find('.alert-success'),
                        danger = element.find('.alert-danger');
                    expect(success.hasClass('ng-hide')).toBe(true);
                    expect(danger.hasClass('ng-hide')).toBe(true);
                });

                it('should have error message when there are password errors', function () {
                    $scope.bulkPasswordChangeResult = createMockBulkPasswordChangeResult(['Unknown Host tibor.test.sailpoint.com'], [{
                        linkId: '321',
                        status: 'Success',
                        password: 'xyzzy'
                    }], [{
                        linkId: '123',
                        constraintsViolation: false,
                        messages: ['Unknown Host tibor.test.sailpoint.com']
                    }]);
                    var element = createElement(),
                        success = element.find('.alert-success'),
                        danger = element.find('.alert-danger');
                    expect(success.hasClass('ng-hide')).toBe(true);
                    expect(danger.hasClass('ng-hide')).toBe(false);
                });

                it('should not have error message when there are no password errors', function () {
                    $scope.bulkPasswordChangeResult = createMockBulkPasswordChangeResult([], [{
                        linkId: '321',
                        status: 'Success',
                        password: 'xyzzy'
                    }], []);
                    var element = createElement(),
                        success = element.find('.alert-success'),
                        danger = element.find('.alert-danger');
                    expect(success.hasClass('ng-hide')).toBe(false);
                    expect(danger.hasClass('ng-hide')).toBe(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdFN0YXR1c0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSXZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJDQUEyQyxZQUFXO2dCQUMzRCxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSw0QkFBeUI7b0JBQUUsMkJBQXdCO2dCQUN6RSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyw2QkFBNkIsY0FBYyxZQUFZLDRCQUE0QjtvQkFDMUcsNEJBQTRCO29CQUM1QixTQUFTO29CQUNULFdBQVc7b0JBQ1gsMkJBQTJCOzs7Z0JBRy9CLFNBQVMsZ0JBQWdCO29CQUNyQixJQUFJLGFBQWEsZ0ZBQ1Q7d0JBQ0osVUFBVSxTQUFTLFlBQVk7b0JBQ25DLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsbUNBQW1DLFVBQVUsV0FBVyxRQUFRO29CQUNyRSxPQUFPLElBQUkseUJBQTBCO3dCQUNqQyxnQkFBZ0IsVUFBVSxPQUFPLFNBQVMsSUFBSSxXQUFXO3dCQUN6RCxtQkFBbUI7d0JBQ25CLHNCQUFzQjt3QkFDdEIsb0JBQW9CO3dCQUNwQixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsVUFBVTs7OztnQkFJbEIsR0FBRyw2RUFBNkUsWUFBVztvQkFDdkYsT0FBTywyQkFBMkIsbUNBQzlCLElBQ0EsSUFDQTtvQkFFSixJQUFJLFVBQVU7d0JBQ1YsVUFBVSxRQUFRLEtBQUs7d0JBQ3ZCLFNBQVMsUUFBUSxLQUFLO29CQUMxQixPQUFPLFFBQVEsU0FBUyxZQUFZLEtBQUs7b0JBQ3pDLE9BQU8sT0FBTyxTQUFTLFlBQVksS0FBSzs7O2dCQUc1QyxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSxPQUFPLDJCQUEyQixtQ0FDOUIsQ0FBQywwQ0FDRCxDQUFDO3dCQUNHLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixVQUFVO3dCQUVkLENBQUM7d0JBQ0csUUFBUTt3QkFDUixzQkFBc0I7d0JBQ3RCLFVBQVUsQ0FBQzs7b0JBR25CLElBQUksVUFBVTt3QkFDVixVQUFVLFFBQVEsS0FBSzt3QkFDdkIsU0FBUyxRQUFRLEtBQUs7b0JBQzFCLE9BQU8sUUFBUSxTQUFTLFlBQVksS0FBSztvQkFDekMsT0FBTyxPQUFPLFNBQVMsWUFBWSxLQUFLOzs7Z0JBRzVDLEdBQUcsbUVBQW1FLFlBQVc7b0JBQzdFLE9BQU8sMkJBQTJCLG1DQUM5QixJQUNBLENBQUM7d0JBQ0csUUFBUTt3QkFDUixRQUFRO3dCQUNSLFVBQVU7d0JBRWQ7b0JBRUosSUFBSSxVQUFVO3dCQUNWLFVBQVUsUUFBUSxLQUFLO3dCQUN2QixTQUFTLFFBQVEsS0FBSztvQkFDMUIsT0FBTyxRQUFRLFNBQVMsWUFBWSxLQUFLO29CQUN6QyxPQUFPLE9BQU8sU0FBUyxZQUFZLEtBQUs7Ozs7O0dBRTdDIiwiZmlsZSI6ImlkZW50aXR5L0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdFN0YXR1c0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuXG5kZXNjcmliZSgnQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0U3RhdHVzRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UsIEJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdDtcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9CdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHRfKSB7XG4gICAgICAgIG1hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICBCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQgPSBfQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0XztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9ICc8c3AtYnVsay1wYXNzd29yZC1jaGFuZ2UtcmVzdWx0LXN0YXR1cyBzcC1tb2RlbD1cImJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdFwiPicgK1xuICAgICAgICAgICAgICAgICc8L3NwLWJ1bGstcGFzc3dvcmQtY2hhbmdlLXJlc3VsdC1zdGF0dXM+JyxcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShkZWZpbml0aW9uKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQobWVzc2FnZXMsIHN1Y2Nlc3NlcywgZXJyb3JzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0KCB7XG4gICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogZXJyb3JzICYmIGVycm9ycy5sZW5ndGggPiAwID8gJ2ZhaWxlZCcgOiAnc3VjY2VlZGVkJyxcbiAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdElkOiAnMTIzJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1UeXBlOiAnJyxcbiAgICAgICAgICAgIHdvcmtmbG93V29ya0l0ZW1JZDogJycsXG4gICAgICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMsXG4gICAgICAgICAgICBzdWNjZXNzZXM6IHN1Y2Nlc3NlcyxcbiAgICAgICAgICAgIGZhaWx1cmVzOiBlcnJvcnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSBhbnkgbWVzc2FnZXMgd2hlbiB0aGVyZSBhcmUgbm8gcGFzc3dvcmQgZXJyb3JzIG9yIGNoYW5nZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdCA9IGNyZWF0ZU1vY2tCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQoXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW11cbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICBzdWNjZXNzID0gZWxlbWVudC5maW5kKCcuYWxlcnQtc3VjY2VzcycpLFxuICAgICAgICAgICAgZGFuZ2VyID0gZWxlbWVudC5maW5kKCcuYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIGV4cGVjdChzdWNjZXNzLmhhc0NsYXNzKCduZy1oaWRlJykpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChkYW5nZXIuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBlcnJvciBtZXNzYWdlIHdoZW4gdGhlcmUgYXJlIHBhc3N3b3JkIGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuYnVsa1Bhc3N3b3JkQ2hhbmdlUmVzdWx0ID0gY3JlYXRlTW9ja0J1bGtQYXNzd29yZENoYW5nZVJlc3VsdChcbiAgICAgICAgICAgIFsnVW5rbm93biBIb3N0IHRpYm9yLnRlc3Quc2FpbHBvaW50LmNvbSddLFxuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICczMjEnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAneHl6enknXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICBjb25zdHJhaW50c1Zpb2xhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFsnVW5rbm93biBIb3N0IHRpYm9yLnRlc3Quc2FpbHBvaW50LmNvbSddXG4gICAgICAgICAgICB9XVxuICAgICAgICApO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBlbGVtZW50LmZpbmQoJy5hbGVydC1zdWNjZXNzJyksXG4gICAgICAgICAgICBkYW5nZXIgPSBlbGVtZW50LmZpbmQoJy5hbGVydC1kYW5nZXInKTtcbiAgICAgICAgZXhwZWN0KHN1Y2Nlc3MuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGRhbmdlci5oYXNDbGFzcygnbmctaGlkZScpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGhhdmUgZXJyb3IgbWVzc2FnZSB3aGVuIHRoZXJlIGFyZSBubyBwYXNzd29yZCBlcnJvcnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmJ1bGtQYXNzd29yZENoYW5nZVJlc3VsdCA9IGNyZWF0ZU1vY2tCdWxrUGFzc3dvcmRDaGFuZ2VSZXN1bHQoXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnMzIxJyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ3h5enp5J1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbXVxuICAgICAgICApO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSBlbGVtZW50LmZpbmQoJy5hbGVydC1zdWNjZXNzJyksXG4gICAgICAgICAgICBkYW5nZXIgPSBlbGVtZW50LmZpbmQoJy5hbGVydC1kYW5nZXInKTtcbiAgICAgICAgZXhwZWN0KHN1Y2Nlc3MuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZShmYWxzZSk7XG4gICAgICAgIGV4cGVjdChkYW5nZXIuaGFzQ2xhc3MoJ25nLWhpZGUnKSkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
