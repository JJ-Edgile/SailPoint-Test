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

            describe('ManageAccountActionsDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    AccountLink = undefined;

                beforeEach(module(identityModule));
                beforeEach(inject(function (_$rootScope_, _$compile_, _AccountLink_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    AccountLink = _AccountLink_;
                }));

                function createElement() {
                    var definition = '<sp-manage-account-actions sp-model="link"></sp-manage-account-actions>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockLink(actions) {
                    var account = new AccountLink({
                        availableOperations: actions
                    });
                    account.displayName = '';
                    return account;
                }

                it('should have correct menu items', function () {
                    $scope.link = createMockLink(['Delete', 'Enable']);
                    var element = createElement(),
                        menuItems = element.find('li>a');
                    expect(menuItems.length).toEqual(2);
                    expect(menuItems[0].innerText.trim()).toEqual('ui_manage_accounts_op_delete');
                    expect(menuItems[1].innerText.trim()).toEqual('ui_manage_accounts_op_enable');
                });

                it('should have correct menu items when link changes', function () {
                    $scope.link = createMockLink(['Delete', 'Enable']);
                    var element = createElement(),
                        menuItems = undefined;
                    $scope.link = createMockLink(['Disable']);
                    $scope.$apply();
                    menuItems = element.find('li>a');
                    expect(menuItems.length).toEqual(1);
                    expect(menuItems[0].innerText.trim()).toEqual('ui_manage_accounts_op_disable');
                });

                it('should update links appropriately when the link changes but operations count remains same size', function () {
                    $scope.link = createMockLink(['Delete', 'Enable']);
                    var element = createElement(),
                        menuItems = undefined;
                    $scope.link = createMockLink(['Delete', 'Disable']);
                    $scope.$apply();
                    menuItems = element.find('li>a');
                    expect(menuItems.length).toEqual(2);
                    expect(menuItems[1].innerText.trim()).toEqual('ui_manage_accounts_op_disable');
                });

                describe('hasAvailableOperations', function () {
                    it('should disable button if no actions', function () {
                        $scope.link = createMockLink([]);
                        var element = createElement(),
                            dropDownButton = $(element.find('.dropdown-toggle')[0]);
                        expect(dropDownButton.attr('disabled')).toBeTruthy();
                    });

                    it('should enable button if actions', function () {
                        $scope.link = createMockLink(['Delete']);
                        var element = createElement(),
                            dropDownButton = $(element.find('.dropdown-toggle')[0]);
                        expect(dropDownButton.attr('disabled')).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnRBY3Rpb25zRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7Ozs7SUFJdkY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCOztRQUU3QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsaUNBQWlDLFlBQVc7Z0JBQ2pELElBQUksU0FBTTtvQkFBRSxXQUFRO29CQUFFLGNBQVc7O2dCQUVqQyxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxlQUFlO29CQUNoRSxTQUFTO29CQUNULFdBQVc7b0JBQ1gsY0FBYzs7O2dCQUdsQixTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxhQUFhO3dCQUNiLFVBQVUsU0FBUyxZQUFZO29CQUNuQyxPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLGVBQWUsU0FBUztvQkFDN0IsSUFBSSxVQUFVLElBQUksWUFBWTt3QkFDMUIscUJBQXFCOztvQkFFekIsUUFBUSxjQUFjO29CQUN0QixPQUFPOzs7Z0JBR1gsR0FBRyxrQ0FBa0MsWUFBVztvQkFDNUMsT0FBTyxPQUFPLGVBQWUsQ0FBQyxVQUFVO29CQUN4QyxJQUFJLFVBQVU7d0JBQ1YsWUFBWSxRQUFRLEtBQUs7b0JBQzdCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxHQUFHLFVBQVUsUUFBUSxRQUFRO29CQUM5QyxPQUFPLFVBQVUsR0FBRyxVQUFVLFFBQVEsUUFBUTs7O2dCQUdsRCxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxPQUFPLE9BQU8sZUFBZSxDQUFDLFVBQVU7b0JBQ3hDLElBQUksVUFBVTt3QkFDVixZQUFTO29CQUNiLE9BQU8sT0FBTyxlQUFlLENBQUM7b0JBQzlCLE9BQU87b0JBQ1AsWUFBWSxRQUFRLEtBQUs7b0JBQ3pCLE9BQU8sVUFBVSxRQUFRLFFBQVE7b0JBQ2pDLE9BQU8sVUFBVSxHQUFHLFVBQVUsUUFBUSxRQUFROzs7Z0JBR2xELEdBQUcsa0dBQWtHLFlBQVc7b0JBQzVHLE9BQU8sT0FBTyxlQUFlLENBQUMsVUFBVTtvQkFDeEMsSUFBSSxVQUFVO3dCQUNWLFlBQVM7b0JBQ2IsT0FBTyxPQUFPLGVBQWUsQ0FBQyxVQUFVO29CQUN4QyxPQUFPO29CQUNQLFlBQVksUUFBUSxLQUFLO29CQUN6QixPQUFPLFVBQVUsUUFBUSxRQUFRO29CQUNqQyxPQUFPLFVBQVUsR0FBRyxVQUFVLFFBQVEsUUFBUTs7O2dCQUdsRCxTQUFTLDBCQUEwQixZQUFXO29CQUMxQyxHQUFHLHVDQUF1QyxZQUFXO3dCQUNqRCxPQUFPLE9BQU8sZUFBZTt3QkFDN0IsSUFBSSxVQUFVOzRCQUNWLGlCQUFpQixFQUFFLFFBQVEsS0FBSyxvQkFBb0I7d0JBQ3hELE9BQU8sZUFBZSxLQUFLLGFBQWE7OztvQkFHNUMsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsT0FBTyxPQUFPLGVBQWUsQ0FBQzt3QkFDOUIsSUFBSSxVQUFVOzRCQUNWLGlCQUFpQixFQUFFLFFBQVEsS0FBSyxvQkFBb0I7d0JBQ3hELE9BQU8sZUFBZSxLQUFLLGFBQWE7Ozs7OztHQWVqRCIsImZpbGUiOiJpZGVudGl0eS9NYW5hZ2VBY2NvdW50QWN0aW9uc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKi9cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnTWFuYWdlQWNjb3VudEFjdGlvbnNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCAkc2NvcGUsICRjb21waWxlLCBBY2NvdW50TGluaztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfQWNjb3VudExpbmtfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICBBY2NvdW50TGluayA9IF9BY2NvdW50TGlua187XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcclxuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9ICc8c3AtbWFuYWdlLWFjY291bnQtYWN0aW9ucyBzcC1tb2RlbD1cImxpbmtcIj48L3NwLW1hbmFnZS1hY2NvdW50LWFjdGlvbnM+JyxcclxuICAgICAgICAgICAgZWxlbWVudCA9ICRjb21waWxlKGRlZmluaXRpb24pKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tMaW5rKGFjdGlvbnMpIHtcclxuICAgICAgICBsZXQgYWNjb3VudCA9IG5ldyBBY2NvdW50TGluayh7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZU9wZXJhdGlvbnM6IGFjdGlvbnNcclxuICAgICAgICB9KTtcclxuICAgICAgICBhY2NvdW50LmRpc3BsYXlOYW1lID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIGFjY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGNvcnJlY3QgbWVudSBpdGVtcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoWydEZWxldGUnLCAnRW5hYmxlJ10pO1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICBtZW51SXRlbXMgPSBlbGVtZW50LmZpbmQoJ2xpPmEnKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX21hbmFnZV9hY2NvdW50c19vcF9kZWxldGUnKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX21hbmFnZV9hY2NvdW50c19vcF9lbmFibGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgaGF2ZSBjb3JyZWN0IG1lbnUgaXRlbXMgd2hlbiBsaW5rIGNoYW5nZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKFsnRGVsZXRlJywgJ0VuYWJsZSddKTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcclxuICAgICAgICAgICAgbWVudUl0ZW1zO1xyXG4gICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoWydEaXNhYmxlJ10pO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBtZW51SXRlbXMgPSBlbGVtZW50LmZpbmQoJ2xpPmEnKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX21hbmFnZV9hY2NvdW50c19vcF9kaXNhYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHVwZGF0ZSBsaW5rcyBhcHByb3ByaWF0ZWx5IHdoZW4gdGhlIGxpbmsgY2hhbmdlcyBidXQgb3BlcmF0aW9ucyBjb3VudCByZW1haW5zIHNhbWUgc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5saW5rID0gY3JlYXRlTW9ja0xpbmsoWydEZWxldGUnLCAnRW5hYmxlJ10pO1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICBtZW51SXRlbXM7XHJcbiAgICAgICAgJHNjb3BlLmxpbmsgPSBjcmVhdGVNb2NrTGluayhbJ0RlbGV0ZScsICdEaXNhYmxlJ10pO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBtZW51SXRlbXMgPSBlbGVtZW50LmZpbmQoJ2xpPmEnKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX21hbmFnZV9hY2NvdW50c19vcF9kaXNhYmxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGFzQXZhaWxhYmxlT3BlcmF0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdzaG91bGQgZGlzYWJsZSBidXR0b24gaWYgbm8gYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKFtdKTtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXHJcbiAgICAgICAgICAgICAgICBkcm9wRG93bkJ1dHRvbiA9ICQoZWxlbWVudC5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJylbMF0pO1xyXG4gICAgICAgICAgICBleHBlY3QoZHJvcERvd25CdXR0b24uYXR0cignZGlzYWJsZWQnKSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvdWxkIGVuYWJsZSBidXR0b24gaWYgYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubGluayA9IGNyZWF0ZU1vY2tMaW5rKFsnRGVsZXRlJ10pO1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcclxuICAgICAgICAgICAgICAgIGRyb3BEb3duQnV0dG9uID0gJChlbGVtZW50LmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKVswXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkcm9wRG93bkJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcpKS50b0JlRmFsc3koKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
