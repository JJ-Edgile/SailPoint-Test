System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('RoleEntitlementsDirective', function () {
                var element, $scope;

                describe('directive', function () {
                    var $compile,
                        entitlements = [{
                        'description': '<strong><em>This committee is in charge of organizing benefits' + ' for the company</em></strong>',
                        'applicationName': 'ADDirectDemodata',
                        'value': 'CN=BenefitCommittee_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                        'roleName': 'direct',
                        'property': 'memberOf',
                        'displayValue': 'BenefitCommittee_AD'
                    }, {
                        'description': '<strong><em>Group assigned to workers in the Benefits department' + ' of HR</em></strong>',
                        'applicationName': 'ADDirectDemodata',
                        'value': 'CN=Benefits_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                        'property': 'memberOf',
                        'roleName': 'ADDirect-Benefits Clerk-IT',
                        'displayValue': 'Benefits_AD'
                    }, {
                        'description': '<strong><em>Assigned to all domain users</em></strong>',
                        'applicationName': 'ADDirectDemodata',
                        'value': 'CN=Users_AD,OU=demoGroups,OU=DemoData,DC=test,DC=sailpoint,DC=com',
                        'property': 'memberOf',
                        'roleName': 'ADDirect-User-IT',
                        'displayValue': 'Users_AD'
                    }];

                    beforeEach(module(widgetModule));

                    beforeEach(inject(function (_$compile_, $rootScope) {
                        $scope = $rootScope;
                        $scope.entitlements = entitlements;
                        $compile = _$compile_;
                        element = angular.element('<sp-role-entitlements entitlements="entitlements" />');
                        $compile(element)($scope);
                        $scope.$apply();
                    }));

                    it('should replace the element', function () {
                        expect(element.nodeName).not.toBe('sp-role-entitlements');
                    });

                    it('should have same number of rows as target accounts', function () {
                        expect(element.find('tr[class=ng-scope]').length).toBe(entitlements.length);
                    });

                    it('should set correct data in rows', function () {
                        var rows = element.find('tr[class=ng-scope]'),
                            tds = $(rows[0]).find('td');

                        expect($(tds[0]).text().trim()).toBe(entitlements[0].applicationName);
                        expect($(tds[1]).text().trim()).toBe(entitlements[0].property);
                        expect($(tds[2]).find('.text-description').text().trim()).toBe(entitlements[0].displayValue);
                        expect($(tds[3]).text().trim()).toBe(entitlements[0].roleName);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvUm9sZUVudGl0bGVtZW50c0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOztJQUM5Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsNkJBQTZCLFlBQVc7Z0JBQzdDLElBQUksU0FBUzs7Z0JBRWIsU0FBUyxhQUFhLFlBQVc7b0JBQzdCLElBQUk7d0JBQ0EsZUFBZSxDQUNYO3dCQUNJLGVBQWUsbUVBQ1g7d0JBQ0osbUJBQW1CO3dCQUNuQixTQUFTO3dCQUNULFlBQVk7d0JBQ1osWUFBWTt3QkFDWixnQkFBZ0I7dUJBRXBCO3dCQUNJLGVBQWUscUVBQ1g7d0JBQ0osbUJBQW1CO3dCQUNuQixTQUFTO3dCQUNULFlBQVk7d0JBQ1osWUFBWTt3QkFDWixnQkFBZ0I7dUJBRXBCO3dCQUNJLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixTQUFTO3dCQUNULFlBQVk7d0JBQ1osWUFBWTt3QkFDWixnQkFBZ0I7OztvQkFJNUIsV0FBVyxPQUFPOztvQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZO3dCQUMvQyxTQUFTO3dCQUNULE9BQU8sZUFBZTt3QkFDdEIsV0FBVzt3QkFDWCxVQUFVLFFBQVEsUUFBUTt3QkFDMUIsU0FBUyxTQUFTO3dCQUNsQixPQUFPOzs7b0JBR1gsR0FBRyw4QkFBOEIsWUFBVzt3QkFDeEMsT0FBTyxRQUFRLFVBQVUsSUFBSSxLQUFLOzs7b0JBR3RDLEdBQUcsc0RBQXNELFlBQVc7d0JBQ2hFLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixRQUFRLEtBQUssYUFBYTs7O29CQUd4RSxHQUFHLG1DQUFtQyxZQUFXO3dCQUM3QyxJQUFJLE9BQU8sUUFBUSxLQUFLOzRCQUNwQixNQUFNLEVBQUUsS0FBSyxJQUFJLEtBQUs7O3dCQUUxQixPQUFPLEVBQUUsSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLGFBQWEsR0FBRzt3QkFDckQsT0FBTyxFQUFFLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxhQUFhLEdBQUc7d0JBQ3JELE9BQU8sRUFBRSxJQUFJLElBQUksS0FBSyxxQkFBcUIsT0FBTyxRQUFRLEtBQUssYUFBYSxHQUFHO3dCQUMvRSxPQUFPLEVBQUUsSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLGFBQWEsR0FBRzs7Ozs7O0dBSzlEIiwiZmlsZSI6ImNvbW1vbi93aWRnZXQvUm9sZUVudGl0bGVtZW50c0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE0IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdpZGdldE1vZHVsZSBmcm9tICdjb21tb24vd2lkZ2V0L1dpZGdldE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdSb2xlRW50aXRsZW1lbnRzRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQsICRzY29wZTtcblxuICAgIGRlc2NyaWJlKCdkaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRjb21waWxlLFxuICAgICAgICAgICAgZW50aXRsZW1lbnRzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJzxzdHJvbmc+PGVtPlRoaXMgY29tbWl0dGVlIGlzIGluIGNoYXJnZSBvZiBvcmdhbml6aW5nIGJlbmVmaXRzJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGZvciB0aGUgY29tcGFueTwvZW0+PC9zdHJvbmc+JyxcbiAgICAgICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uTmFtZSc6ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ0NOPUJlbmVmaXRDb21taXR0ZWVfQUQsT1U9ZGVtb0dyb3VwcyxPVT1EZW1vRGF0YSxEQz10ZXN0LERDPXNhaWxwb2ludCxEQz1jb20nLFxuICAgICAgICAgICAgICAgICAgICAncm9sZU5hbWUnOiAnZGlyZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnR5JzogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZSc6ICdCZW5lZml0Q29tbWl0dGVlX0FEJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnPHN0cm9uZz48ZW0+R3JvdXAgYXNzaWduZWQgdG8gd29ya2VycyBpbiB0aGUgQmVuZWZpdHMgZGVwYXJ0bWVudCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBvZiBIUjwvZW0+PC9zdHJvbmc+JyxcbiAgICAgICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uTmFtZSc6ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogJ0NOPUJlbmVmaXRzX0FELE9VPWRlbW9Hcm91cHMsT1U9RGVtb0RhdGEsREM9dGVzdCxEQz1zYWlscG9pbnQsREM9Y29tJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnR5JzogJ21lbWJlck9mJyxcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGVOYW1lJzogJ0FERGlyZWN0LUJlbmVmaXRzIENsZXJrLUlUJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZSc6ICdCZW5lZml0c19BRCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJzxzdHJvbmc+PGVtPkFzc2lnbmVkIHRvIGFsbCBkb21haW4gdXNlcnM8L2VtPjwvc3Ryb25nPicsXG4gICAgICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbk5hbWUnOiAnQUREaXJlY3REZW1vZGF0YScsXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6ICdDTj1Vc2Vyc19BRCxPVT1kZW1vR3JvdXBzLE9VPURlbW9EYXRhLERDPXRlc3QsREM9c2FpbHBvaW50LERDPWNvbScsXG4gICAgICAgICAgICAgICAgICAgICdwcm9wZXJ0eSc6ICdtZW1iZXJPZicsXG4gICAgICAgICAgICAgICAgICAgICdyb2xlTmFtZSc6ICdBRERpcmVjdC1Vc2VyLUlUJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlWYWx1ZSc6ICdVc2Vyc19BRCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgIGJlZm9yZUVhY2gobW9kdWxlKHdpZGdldE1vZHVsZSkpO1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sICRyb290U2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICAgICAkc2NvcGUuZW50aXRsZW1lbnRzID0gZW50aXRsZW1lbnRzO1xuICAgICAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwLXJvbGUtZW50aXRsZW1lbnRzIGVudGl0bGVtZW50cz1cImVudGl0bGVtZW50c1wiIC8+Jyk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXBsYWNlIHRoZSBlbGVtZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5ub2RlTmFtZSkubm90LnRvQmUoJ3NwLXJvbGUtZW50aXRsZW1lbnRzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBzYW1lIG51bWJlciBvZiByb3dzIGFzIHRhcmdldCBhY2NvdW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgndHJbY2xhc3M9bmctc2NvcGVdJykubGVuZ3RoKS50b0JlKGVudGl0bGVtZW50cy5sZW5ndGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBjb3JyZWN0IGRhdGEgaW4gcm93cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJvd3MgPSBlbGVtZW50LmZpbmQoJ3RyW2NsYXNzPW5nLXNjb3BlXScpLFxuICAgICAgICAgICAgICAgIHRkcyA9ICQocm93c1swXSkuZmluZCgndGQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KCQodGRzWzBdKS50ZXh0KCkudHJpbSgpKS50b0JlKGVudGl0bGVtZW50c1swXS5hcHBsaWNhdGlvbk5hbWUpO1xuICAgICAgICAgICAgZXhwZWN0KCQodGRzWzFdKS50ZXh0KCkudHJpbSgpKS50b0JlKGVudGl0bGVtZW50c1swXS5wcm9wZXJ0eSk7XG4gICAgICAgICAgICBleHBlY3QoJCh0ZHNbMl0pLmZpbmQoJy50ZXh0LWRlc2NyaXB0aW9uJykudGV4dCgpLnRyaW0oKSkudG9CZShlbnRpdGxlbWVudHNbMF0uZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgIGV4cGVjdCgkKHRkc1szXSkudGV4dCgpLnRyaW0oKSkudG9CZShlbnRpdGxlbWVudHNbMF0ucm9sZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
