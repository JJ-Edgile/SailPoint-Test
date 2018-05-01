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

            describe('RefreshLinkButtonDirectiveTest', function () {
                var $scope = undefined,
                    $compile = undefined,
                    $q = undefined,
                    manageAccountDataService = undefined,
                    manageAccountService = undefined,
                    AccountLink = undefined;
                beforeEach(module(identityModule));

                beforeEach(inject(function (_manageAccountDataService_, _$rootScope_, _$compile_, _manageAccountService_, _AccountLink_, _$q_) {
                    manageAccountDataService = _manageAccountDataService_;
                    manageAccountService = _manageAccountService_;
                    AccountLink = _AccountLink_;
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    $q = _$q_;
                }));

                function createElement() {
                    var definition = '<sp-refresh-link-button sp-model="accountLink"></sp-refresh-link-button>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockAccountLink(operations, supportsRefresh) {
                    return new AccountLink({
                        accountId: 'James.Smith',
                        applicationStatus: null,
                        applicationName: 'ADDirectDemodata',
                        attributes: null,
                        availableOperations: operations,
                        id: '1234',
                        identityId: '5678',
                        lastRefresh: 1464807168880,
                        status: 'ACTIVE',
                        supportsRefresh: supportsRefresh
                    });
                }

                it('should not be disabled when it is not refreshing and allows refresh', function () {
                    $scope.accountLink = createMockAccountLink(['DELETE'], true);
                    var element = createElement(),
                        button = element.find('.btn');
                    expect(button.hasClass('disabled')).toBe(false);
                });

                it('should be disabled when it does not allow refresh', function () {
                    $scope.accountLink = createMockAccountLink(['DELETE']);
                    var element = createElement(),
                        button = element.find('.btn');
                    expect(button.hasClass('disabled')).toBe(true);
                });

                it('should call manageAccountService.refreshLink() when clicked', function () {
                    $scope.accountLink = createMockAccountLink(['DELETE', 'REFRESH'], true);
                    var promise = $q.when(createMockAccountLink(['DELETE', 'REFRESH'], true));

                    spyOn(manageAccountService, 'refreshLink').and.returnValue(promise);
                    var element = createElement(),
                        button = element.find('.btn');
                    button.click();
                    expect(manageAccountService.refreshLink).toHaveBeenCalled();
                });

                it('should register account with AccountRefreshTracker when clicked', function () {
                    $scope.accountLink = createMockAccountLink(['DELETE', 'REFRESH'], true);

                    var promise = { fake: 'promise' };
                    spyOn(manageAccountService, 'refreshLink').and.returnValue(promise);

                    spyOn(manageAccountDataService.getAccountRefreshTracker(), 'accountBeingRefreshed');
                    var element = createElement(),
                        button = element.find('.btn');
                    button.click();

                    expect(manageAccountDataService.getAccountRefreshTracker().accountBeingRefreshed).toHaveBeenCalledWith($scope.accountLink, promise);
                });

                it('should not call manageAccountService.refreshLink() when clicked and doesn\'t support refresh', function () {
                    $scope.accountLink = createMockAccountLink(['DELETE']);

                    var promise = $q.when(createMockAccountLink(['DELETE']));

                    spyOn(manageAccountService, 'refreshLink').and.returnValue(promise);
                    var element = createElement(),
                        button = element.find('.btn');
                    button.click();
                    expect(manageAccountService.refreshLink).not.toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L1JlZnJlc2hMaW5rQnV0dG9uRGlyZWN0aXZlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUl2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxrQ0FBa0MsWUFBVztnQkFDbEQsSUFBSSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsS0FBRTtvQkFBRSwyQkFBd0I7b0JBQUUsdUJBQW9CO29CQUFFLGNBQVc7Z0JBQ3JGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLDRCQUE0QixjQUFjLFlBQVksd0JBQzdFLGVBQWUsTUFBTTtvQkFDckIsMkJBQTJCO29CQUMzQix1QkFBdUI7b0JBQ3ZCLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxXQUFXO29CQUNYLEtBQUs7OztnQkFHVCxTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxhQUFhO3dCQUNiLFVBQVUsU0FBUyxZQUFZO29CQUNuQyxPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLHNCQUFzQixZQUFZLGlCQUFpQjtvQkFDeEQsT0FBTyxJQUFJLFlBQWE7d0JBQ3BCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1oscUJBQXFCO3dCQUNyQixJQUFJO3dCQUNKLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixRQUFRO3dCQUNSLGlCQUFpQjs7OztnQkFJekIsR0FBRyx1RUFBdUUsWUFBVztvQkFDakYsT0FBTyxjQUFjLHNCQUFzQixDQUFDLFdBQVc7b0JBQ3ZELElBQUksVUFBVTt3QkFDVixTQUFTLFFBQVEsS0FBSztvQkFDMUIsT0FBTyxPQUFPLFNBQVMsYUFBYSxLQUFLOzs7Z0JBRzdDLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELE9BQU8sY0FBYyxzQkFBc0IsQ0FBQztvQkFDNUMsSUFBSSxVQUFVO3dCQUNWLFNBQVMsUUFBUSxLQUFLO29CQUMxQixPQUFPLE9BQU8sU0FBUyxhQUFhLEtBQUs7OztnQkFHN0MsR0FBRywrREFBK0QsWUFBVztvQkFDekUsT0FBTyxjQUFjLHNCQUFzQixDQUFDLFVBQVUsWUFBWTtvQkFDbEUsSUFBSSxVQUFVLEdBQUcsS0FDYixzQkFBc0IsQ0FBQyxVQUFVLFlBQVk7O29CQUdqRCxNQUFNLHNCQUFzQixlQUFlLElBQUksWUFBWTtvQkFDM0QsSUFBSSxVQUFVO3dCQUNWLFNBQVMsUUFBUSxLQUFLO29CQUMxQixPQUFPO29CQUNQLE9BQU8scUJBQXFCLGFBQWE7OztnQkFHN0MsR0FBRyxtRUFBbUUsWUFBVztvQkFDN0UsT0FBTyxjQUFjLHNCQUFzQixDQUFDLFVBQVUsWUFBWTs7b0JBRWxFLElBQUksVUFBVSxFQUFFLE1BQU07b0JBQ3RCLE1BQU0sc0JBQXNCLGVBQWUsSUFBSSxZQUFZOztvQkFFM0QsTUFBTSx5QkFBeUIsNEJBQTRCO29CQUMzRCxJQUFJLFVBQVU7d0JBQ1YsU0FBUyxRQUFRLEtBQUs7b0JBQzFCLE9BQU87O29CQUVQLE9BQU8seUJBQXlCLDJCQUEyQix1QkFDdkQscUJBQXFCLE9BQU8sYUFBYTs7O2dCQUdqRCxHQUFHLGdHQUFnRyxZQUFXO29CQUMxRyxPQUFPLGNBQWMsc0JBQXNCLENBQUM7O29CQUU1QyxJQUFJLFVBQVUsR0FBRyxLQUNiLHNCQUFzQixDQUFDOztvQkFHM0IsTUFBTSxzQkFBc0IsZUFBZSxJQUFJLFlBQVk7b0JBQzNELElBQUksVUFBVTt3QkFDVixTQUFTLFFBQVEsS0FBSztvQkFDMUIsT0FBTztvQkFDUCxPQUFPLHFCQUFxQixhQUFhLElBQUk7Ozs7O0dBV2xEIiwiZmlsZSI6ImlkZW50aXR5L1JlZnJlc2hMaW5rQnV0dG9uRGlyZWN0aXZlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ1JlZnJlc2hMaW5rQnV0dG9uRGlyZWN0aXZlVGVzdCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCAkc2NvcGUsICRjb21waWxlLCAkcSwgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLCBtYW5hZ2VBY2NvdW50U2VydmljZSwgQWNjb3VudExpbms7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9tYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2VfLCBfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9tYW5hZ2VBY2NvdW50U2VydmljZV8sXG4gICAgICAgIF9BY2NvdW50TGlua18sIF8kcV8pIHtcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlID0gX21hbmFnZUFjY291bnREYXRhU2VydmljZV87XG4gICAgICAgIG1hbmFnZUFjY291bnRTZXJ2aWNlID0gX21hbmFnZUFjY291bnRTZXJ2aWNlXztcbiAgICAgICAgQWNjb3VudExpbmsgPSBfQWNjb3VudExpbmtfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGxldCBkZWZpbml0aW9uID0gJzxzcC1yZWZyZXNoLWxpbmstYnV0dG9uIHNwLW1vZGVsPVwiYWNjb3VudExpbmtcIj48L3NwLXJlZnJlc2gtbGluay1idXR0b24+JyxcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShkZWZpbml0aW9uKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tBY2NvdW50TGluayhvcGVyYXRpb25zLCBzdXBwb3J0c1JlZnJlc2gpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBY2NvdW50TGluaygge1xuICAgICAgICAgICAgYWNjb3VudElkOiAnSmFtZXMuU21pdGgnLFxuICAgICAgICAgICAgYXBwbGljYXRpb25TdGF0dXM6IG51bGwsXG4gICAgICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdBRERpcmVjdERlbW9kYXRhJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IG51bGwsXG4gICAgICAgICAgICBhdmFpbGFibGVPcGVyYXRpb25zOiBvcGVyYXRpb25zLFxuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6ICc1Njc4JyxcbiAgICAgICAgICAgIGxhc3RSZWZyZXNoOiAxNDY0ODA3MTY4ODgwLFxuICAgICAgICAgICAgc3RhdHVzOiAnQUNUSVZFJyxcbiAgICAgICAgICAgIHN1cHBvcnRzUmVmcmVzaDogc3VwcG9ydHNSZWZyZXNoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgbm90IGJlIGRpc2FibGVkIHdoZW4gaXQgaXMgbm90IHJlZnJlc2hpbmcgYW5kIGFsbG93cyByZWZyZXNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5hY2NvdW50TGluayA9IGNyZWF0ZU1vY2tBY2NvdW50TGluayhbJ0RFTEVURSddLCB0cnVlKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICBidXR0b24gPSBlbGVtZW50LmZpbmQoJy5idG4nKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5oYXNDbGFzcygnZGlzYWJsZWQnKSkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJlIGRpc2FibGVkIHdoZW4gaXQgZG9lcyBub3QgYWxsb3cgcmVmcmVzaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuYWNjb3VudExpbmsgPSBjcmVhdGVNb2NrQWNjb3VudExpbmsoWydERUxFVEUnXSk7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgYnV0dG9uID0gZWxlbWVudC5maW5kKCcuYnRuJyk7XG4gICAgICAgIGV4cGVjdChidXR0b24uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgbWFuYWdlQWNjb3VudFNlcnZpY2UucmVmcmVzaExpbmsoKSB3aGVuIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmFjY291bnRMaW5rID0gY3JlYXRlTW9ja0FjY291bnRMaW5rKFsnREVMRVRFJywgJ1JFRlJFU0gnXSwgdHJ1ZSk7XG4gICAgICAgIGxldCBwcm9taXNlID0gJHEud2hlbihcbiAgICAgICAgICAgIGNyZWF0ZU1vY2tBY2NvdW50TGluayhbJ0RFTEVURScsICdSRUZSRVNIJ10sIHRydWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudFNlcnZpY2UsICdyZWZyZXNoTGluaycpLmFuZC5yZXR1cm5WYWx1ZShwcm9taXNlKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICBidXR0b24gPSBlbGVtZW50LmZpbmQoJy5idG4nKTtcbiAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50U2VydmljZS5yZWZyZXNoTGluaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWdpc3RlciBhY2NvdW50IHdpdGggQWNjb3VudFJlZnJlc2hUcmFja2VyIHdoZW4gY2xpY2tlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuYWNjb3VudExpbmsgPSBjcmVhdGVNb2NrQWNjb3VudExpbmsoWydERUxFVEUnLCAnUkVGUkVTSCddLCB0cnVlKTtcblxuICAgICAgICBsZXQgcHJvbWlzZSA9IHsgZmFrZTogJ3Byb21pc2UnIH07XG4gICAgICAgIHNweU9uKG1hbmFnZUFjY291bnRTZXJ2aWNlLCAncmVmcmVzaExpbmsnKS5hbmQucmV0dXJuVmFsdWUocHJvbWlzZSk7XG5cbiAgICAgICAgc3B5T24obWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmdldEFjY291bnRSZWZyZXNoVHJhY2tlcigpLCAnYWNjb3VudEJlaW5nUmVmcmVzaGVkJyk7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgYnV0dG9uID0gZWxlbWVudC5maW5kKCcuYnRuJyk7XG4gICAgICAgIGJ1dHRvbi5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuZ2V0QWNjb3VudFJlZnJlc2hUcmFja2VyKCkuYWNjb3VudEJlaW5nUmVmcmVzaGVkKS5cbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKCRzY29wZS5hY2NvdW50TGluaywgcHJvbWlzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIG1hbmFnZUFjY291bnRTZXJ2aWNlLnJlZnJlc2hMaW5rKCkgd2hlbiBjbGlja2VkIGFuZCBkb2VzblxcJ3Qgc3VwcG9ydCByZWZyZXNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5hY2NvdW50TGluayA9IGNyZWF0ZU1vY2tBY2NvdW50TGluayhbJ0RFTEVURSddKTtcblxuICAgICAgICBsZXQgcHJvbWlzZSA9ICRxLndoZW4oXG4gICAgICAgICAgICBjcmVhdGVNb2NrQWNjb3VudExpbmsoWydERUxFVEUnXSlcbiAgICAgICAgKTtcblxuICAgICAgICBzcHlPbihtYW5hZ2VBY2NvdW50U2VydmljZSwgJ3JlZnJlc2hMaW5rJykuYW5kLnJldHVyblZhbHVlKHByb21pc2UpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIGJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnLmJ0bicpO1xuICAgICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnRTZXJ2aWNlLnJlZnJlc2hMaW5rKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
