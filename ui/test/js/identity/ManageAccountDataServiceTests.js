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

            describe('ManageAccountDataService', function () {
                var manageAccountDataService = undefined,
                    link = undefined,
                    identityId = '1234',
                    someAction = 'someAction',
                    AccountLink = undefined;

                beforeEach(module(identityModule));
                beforeEach(inject(function (_manageAccountDataService_, _AccountLink_) {
                    manageAccountDataService = _manageAccountDataService_;
                    AccountLink = _AccountLink_;
                    link = new AccountLink({ id: 'foobar' });
                    someAction = 'someAction';
                }));

                it('should have a accountActionsMap', function () {
                    expect(manageAccountDataService.accountActionMap).toBeDefined();
                });

                it('should allow accounts to have actions set on them', function () {
                    var action = undefined;
                    manageAccountDataService.selectAction(link, someAction);
                    action = manageAccountDataService.accountActionMap.get(link.getId());
                    expect(action.getAction()).toEqual(someAction);
                    expect(action.getLink()).toEqual(link);
                });

                it('should allow accounts to have actions updated on them', function () {
                    var someOtherAction = 'adifferentaction',
                        action = undefined;
                    manageAccountDataService.selectAction(link, someAction);
                    manageAccountDataService.selectAction(link, someOtherAction);
                    action = manageAccountDataService.accountActionMap.get(link.getId());
                    expect(action.getAction()).toEqual(someOtherAction);
                    expect(action.getLink()).toEqual(link);
                });

                it('should allow selections to be cleared', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    expect(manageAccountDataService.accountActionMap.get(link.getId())).toBeDefined();
                    manageAccountDataService.removeAction(link);
                    expect(manageAccountDataService.accountActionMap.get(link.getId())).not.toBeDefined();
                });

                it('reset() clears all data', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    manageAccountDataService.addCreateAccountAction(identityId, 'app', null);

                    manageAccountDataService.reset();
                    expect(manageAccountDataService.accountActionMap.size).toEqual(0);
                    expect(manageAccountDataService.createAccountActionMap.size).toEqual(0);
                });

                it('should return a list result dto for the selected actions', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    expect(manageAccountDataService.accountActionMap.get(link.getId())).toBeDefined();
                    expect(manageAccountDataService.getSelectedAccountsListResult().count).toEqual(1);

                    var actionLink = manageAccountDataService.getSelectedAccountsListResult().objects[0];
                    expect(actionLink.id).toEqual(link.getId());
                    expect(actionLink.action).toEqual(someAction);
                });

                it('should be dirty if there are selected actions', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    expect(manageAccountDataService.isDirty()).toBeTruthy();
                });

                it('should be dirty if there are account creations', function () {
                    manageAccountDataService.addCreateAccountAction(identityId, link, 'blah blah blah');
                    expect(manageAccountDataService.isDirty()).toBeTruthy();
                });

                it('should not be dirty if there are no selected actions', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    manageAccountDataService.removeAction(link);
                    expect(manageAccountDataService.isDirty()).toBeFalsy();
                });

                it('should toggle items between expanded and not', function () {
                    var errorLink = new AccountLink({ id: 123, errors: ['123'] });
                    expect(manageAccountDataService.isExpanded(errorLink)).toBeFalsy();
                    manageAccountDataService.toggleExpanded(errorLink);
                    expect(manageAccountDataService.isExpanded(errorLink)).toBeTruthy();
                    manageAccountDataService.toggleExpanded(errorLink);
                    expect(manageAccountDataService.isExpanded(errorLink)).toBeFalsy();
                });

                it('should not toggle accounts with undefined errors', function () {
                    manageAccountDataService.toggleExpanded(link);
                    expect(manageAccountDataService.isExpanded(link)).toBeFalsy();
                });

                it('should not toggle accounts with no errors', function () {
                    var errorLink = new AccountLink({ id: 123, errors: [] });
                    manageAccountDataService.toggleExpanded(link);
                    expect(manageAccountDataService.isExpanded(errorLink)).toBeFalsy();
                });

                it('should tell if an action is selected for an account', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    expect(manageAccountDataService.isActionSelected(link, someAction)).toBeTruthy();
                });

                it('should tell if an action is not selected for an account', function () {
                    manageAccountDataService.selectAction(link, someAction);
                    expect(manageAccountDataService.isActionSelected(link, 'adifferentaction')).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L01hbmFnZUFjY291bnREYXRhU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSXZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLDRCQUE0QixZQUFXO2dCQUM1QyxJQUFJLDJCQUF3QjtvQkFDeEIsT0FBSTtvQkFDSixhQUFhO29CQUNiLGFBQWE7b0JBQ2IsY0FBVzs7Z0JBRWYsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsZUFBZTtvQkFDbEUsMkJBQTJCO29CQUMzQixjQUFjO29CQUNkLE9BQU8sSUFBSSxZQUFZLEVBQUMsSUFBSTtvQkFDNUIsYUFBYTs7O2dCQUdqQixHQUFHLG1DQUFtQyxZQUFXO29CQUM3QyxPQUFPLHlCQUF5QixrQkFBa0I7OztnQkFHdEQsR0FBRyxxREFBcUQsWUFBVztvQkFDL0QsSUFBSSxTQUFNO29CQUNWLHlCQUF5QixhQUFhLE1BQU07b0JBQzVDLFNBQVMseUJBQXlCLGlCQUFpQixJQUFJLEtBQUs7b0JBQzVELE9BQU8sT0FBTyxhQUFhLFFBQVE7b0JBQ25DLE9BQU8sT0FBTyxXQUFXLFFBQVE7OztnQkFHckMsR0FBRyx5REFBeUQsWUFBVztvQkFDbkUsSUFBSSxrQkFBa0I7d0JBQ2xCLFNBQU07b0JBQ1YseUJBQXlCLGFBQWEsTUFBTTtvQkFDNUMseUJBQXlCLGFBQWEsTUFBTTtvQkFDNUMsU0FBUyx5QkFBeUIsaUJBQWlCLElBQUksS0FBSztvQkFDNUQsT0FBTyxPQUFPLGFBQWEsUUFBUTtvQkFDbkMsT0FBTyxPQUFPLFdBQVcsUUFBUTs7O2dCQUdyQyxHQUFHLHlDQUF5QyxZQUFXO29CQUNuRCx5QkFBeUIsYUFBYSxNQUFNO29CQUM1QyxPQUFPLHlCQUF5QixpQkFBaUIsSUFBSSxLQUFLLFVBQVU7b0JBQ3BFLHlCQUF5QixhQUFhO29CQUN0QyxPQUFPLHlCQUF5QixpQkFBaUIsSUFBSSxLQUFLLFVBQVUsSUFBSTs7O2dCQUc1RSxHQUFHLDJCQUEyQixZQUFXO29CQUNyQyx5QkFBeUIsYUFBYSxNQUFNO29CQUM1Qyx5QkFBeUIsdUJBQXVCLFlBQVksT0FBTzs7b0JBRW5FLHlCQUF5QjtvQkFDekIsT0FBTyx5QkFBeUIsaUJBQWlCLE1BQU0sUUFBUTtvQkFDL0QsT0FBTyx5QkFBeUIsdUJBQXVCLE1BQU0sUUFBUTs7O2dCQUd6RSxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSx5QkFBeUIsYUFBYSxNQUFNO29CQUM1QyxPQUFPLHlCQUF5QixpQkFBaUIsSUFBSSxLQUFLLFVBQVU7b0JBQ3BFLE9BQU8seUJBQXlCLGdDQUFnQyxPQUFPLFFBQVE7O29CQUUvRSxJQUFJLGFBQWEseUJBQXlCLGdDQUFnQyxRQUFRO29CQUNsRixPQUFPLFdBQVcsSUFBSSxRQUFRLEtBQUs7b0JBQ25DLE9BQU8sV0FBVyxRQUFRLFFBQVE7OztnQkFHdEMsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QseUJBQXlCLGFBQWEsTUFBTTtvQkFDNUMsT0FBTyx5QkFBeUIsV0FBVzs7O2dCQUcvQyxHQUFHLGtEQUFrRCxZQUFXO29CQUM1RCx5QkFBeUIsdUJBQXVCLFlBQVksTUFBTTtvQkFDbEUsT0FBTyx5QkFBeUIsV0FBVzs7O2dCQUcvQyxHQUFHLHdEQUF3RCxZQUFXO29CQUNsRSx5QkFBeUIsYUFBYSxNQUFNO29CQUM1Qyx5QkFBeUIsYUFBYTtvQkFDdEMsT0FBTyx5QkFBeUIsV0FBVzs7O2dCQUcvQyxHQUFHLGdEQUFnRCxZQUFXO29CQUMxRCxJQUFJLFlBQVksSUFBSSxZQUFZLEVBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztvQkFDbkQsT0FBTyx5QkFBeUIsV0FBVyxZQUFZO29CQUN2RCx5QkFBeUIsZUFBZTtvQkFDeEMsT0FBTyx5QkFBeUIsV0FBVyxZQUFZO29CQUN2RCx5QkFBeUIsZUFBZTtvQkFDeEMsT0FBTyx5QkFBeUIsV0FBVyxZQUFZOzs7Z0JBRzNELEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELHlCQUF5QixlQUFlO29CQUN4QyxPQUFPLHlCQUF5QixXQUFXLE9BQU87OztnQkFHdEQsR0FBRyw2Q0FBNkMsWUFBVztvQkFDdkQsSUFBSSxZQUFZLElBQUksWUFBWSxFQUFDLElBQUksS0FBSyxRQUFRO29CQUNsRCx5QkFBeUIsZUFBZTtvQkFDeEMsT0FBTyx5QkFBeUIsV0FBVyxZQUFZOzs7Z0JBRzNELEdBQUcsdURBQXVELFlBQVc7b0JBQ2pFLHlCQUF5QixhQUFhLE1BQU07b0JBQzVDLE9BQU8seUJBQXlCLGlCQUFpQixNQUFNLGFBQWE7OztnQkFHeEUsR0FBRywyREFBMkQsWUFBVztvQkFDckUseUJBQXlCLGFBQWEsTUFBTTtvQkFDNUMsT0FBTyx5QkFBeUIsaUJBQWlCLE1BQU0scUJBQXFCOzs7OztHQVlqRiIsImZpbGUiOiJpZGVudGl0eS9NYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ01hbmFnZUFjY291bnREYXRhU2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG1hbmFnZUFjY291bnREYXRhU2VydmljZSxcclxuICAgICAgICBsaW5rLFxyXG4gICAgICAgIGlkZW50aXR5SWQgPSAnMTIzNCcsXHJcbiAgICAgICAgc29tZUFjdGlvbiA9ICdzb21lQWN0aW9uJyxcclxuICAgICAgICBBY2NvdW50TGluaztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX21hbmFnZUFjY291bnREYXRhU2VydmljZV8sIF9BY2NvdW50TGlua18pIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UgPSBfbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlXztcclxuICAgICAgICBBY2NvdW50TGluayA9IF9BY2NvdW50TGlua187XHJcbiAgICAgICAgbGluayA9IG5ldyBBY2NvdW50TGluayh7aWQ6ICdmb29iYXInfSk7XHJcbiAgICAgICAgc29tZUFjdGlvbiA9ICdzb21lQWN0aW9uJztcclxuICAgIH0pKTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGhhdmUgYSBhY2NvdW50QWN0aW9uc01hcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuYWNjb3VudEFjdGlvbk1hcCkudG9CZURlZmluZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYWxsb3cgYWNjb3VudHMgdG8gaGF2ZSBhY3Rpb25zIHNldCBvbiB0aGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbjtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbiA9IG1hbmFnZUFjY291bnREYXRhU2VydmljZS5hY2NvdW50QWN0aW9uTWFwLmdldChsaW5rLmdldElkKCkpO1xyXG4gICAgICAgIGV4cGVjdChhY3Rpb24uZ2V0QWN0aW9uKCkpLnRvRXF1YWwoc29tZUFjdGlvbik7XHJcbiAgICAgICAgZXhwZWN0KGFjdGlvbi5nZXRMaW5rKCkpLnRvRXF1YWwobGluayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGFsbG93IGFjY291bnRzIHRvIGhhdmUgYWN0aW9ucyB1cGRhdGVkIG9uIHRoZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgc29tZU90aGVyQWN0aW9uID0gJ2FkaWZmZXJlbnRhY3Rpb24nLFxyXG4gICAgICAgICAgICBhY3Rpb247XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnNlbGVjdEFjdGlvbihsaW5rLCBzb21lQWN0aW9uKTtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVPdGhlckFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uID0gbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmFjY291bnRBY3Rpb25NYXAuZ2V0KGxpbmsuZ2V0SWQoKSk7XHJcbiAgICAgICAgZXhwZWN0KGFjdGlvbi5nZXRBY3Rpb24oKSkudG9FcXVhbChzb21lT3RoZXJBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChhY3Rpb24uZ2V0TGluaygpKS50b0VxdWFsKGxpbmspO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBzZWxlY3Rpb25zIHRvIGJlIGNsZWFyZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuYWNjb3VudEFjdGlvbk1hcC5nZXQobGluay5nZXRJZCgpKSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UucmVtb3ZlQWN0aW9uKGxpbmspO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuYWNjb3VudEFjdGlvbk1hcC5nZXQobGluay5nZXRJZCgpKSkubm90LnRvQmVEZWZpbmVkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVzZXQoKSBjbGVhcnMgYWxsIGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZS5hZGRDcmVhdGVBY2NvdW50QWN0aW9uKGlkZW50aXR5SWQsICdhcHAnLCBudWxsKTtcclxuXHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5hY2NvdW50QWN0aW9uTWFwLnNpemUpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5jcmVhdGVBY2NvdW50QWN0aW9uTWFwLnNpemUpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhIGxpc3QgcmVzdWx0IGR0byBmb3IgdGhlIHNlbGVjdGVkIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuYWNjb3VudEFjdGlvbk1hcC5nZXQobGluay5nZXRJZCgpKSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmdldFNlbGVjdGVkQWNjb3VudHNMaXN0UmVzdWx0KCkuY291bnQpLnRvRXF1YWwoMSk7XHJcblxyXG4gICAgICAgIGxldCBhY3Rpb25MaW5rID0gbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmdldFNlbGVjdGVkQWNjb3VudHNMaXN0UmVzdWx0KCkub2JqZWN0c1swXTtcclxuICAgICAgICBleHBlY3QoYWN0aW9uTGluay5pZCkudG9FcXVhbChsaW5rLmdldElkKCkpO1xyXG4gICAgICAgIGV4cGVjdChhY3Rpb25MaW5rLmFjdGlvbikudG9FcXVhbChzb21lQWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYmUgZGlydHkgaWYgdGhlcmUgYXJlIHNlbGVjdGVkIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGJlIGRpcnR5IGlmIHRoZXJlIGFyZSBhY2NvdW50IGNyZWF0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZS5hZGRDcmVhdGVBY2NvdW50QWN0aW9uKGlkZW50aXR5SWQsIGxpbmssICdibGFoIGJsYWggYmxhaCcpO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIG5vdCBiZSBkaXJ0eSBpZiB0aGVyZSBhcmUgbm8gc2VsZWN0ZWQgYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIG1hbmFnZUFjY291bnREYXRhU2VydmljZS5zZWxlY3RBY3Rpb24obGluaywgc29tZUFjdGlvbik7XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnJlbW92ZUFjdGlvbihsaW5rKTtcclxuICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHRvZ2dsZSBpdGVtcyBiZXR3ZWVuIGV4cGFuZGVkIGFuZCBub3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZXJyb3JMaW5rID0gbmV3IEFjY291bnRMaW5rKHtpZDogMTIzLCBlcnJvcnM6IFsnMTIzJ119KTtcclxuICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmlzRXhwYW5kZWQoZXJyb3JMaW5rKSkudG9CZUZhbHN5KCk7XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnRvZ2dsZUV4cGFuZGVkKGVycm9yTGluayk7XHJcbiAgICAgICAgZXhwZWN0KG1hbmFnZUFjY291bnREYXRhU2VydmljZS5pc0V4cGFuZGVkKGVycm9yTGluaykpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UudG9nZ2xlRXhwYW5kZWQoZXJyb3JMaW5rKTtcclxuICAgICAgICBleHBlY3QobWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLmlzRXhwYW5kZWQoZXJyb3JMaW5rKSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIG5vdCB0b2dnbGUgYWNjb3VudHMgd2l0aCB1bmRlZmluZWQgZXJyb3JzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnRvZ2dsZUV4cGFuZGVkKGxpbmspO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNFeHBhbmRlZChsaW5rKSkudG9CZUZhbHN5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIG5vdCB0b2dnbGUgYWNjb3VudHMgd2l0aCBubyBlcnJvcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZXJyb3JMaW5rID0gbmV3IEFjY291bnRMaW5rKHtpZDogMTIzLCBlcnJvcnM6IFtdfSk7XHJcbiAgICAgICAgbWFuYWdlQWNjb3VudERhdGFTZXJ2aWNlLnRvZ2dsZUV4cGFuZGVkKGxpbmspO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNFeHBhbmRlZChlcnJvckxpbmspKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdGVsbCBpZiBhbiBhY3Rpb24gaXMgc2VsZWN0ZWQgZm9yIGFuIGFjY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNBY3Rpb25TZWxlY3RlZChsaW5rLCBzb21lQWN0aW9uKSkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCB0ZWxsIGlmIGFuIGFjdGlvbiBpcyBub3Qgc2VsZWN0ZWQgZm9yIGFuIGFjY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2Uuc2VsZWN0QWN0aW9uKGxpbmssIHNvbWVBY3Rpb24pO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VBY2NvdW50RGF0YVNlcnZpY2UuaXNBY3Rpb25TZWxlY3RlZChsaW5rLCAnYWRpZmZlcmVudGFjdGlvbicpKS50b0JlRmFsc3koKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
