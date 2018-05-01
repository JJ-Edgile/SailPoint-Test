System.register(['test/js/TestInitializer', 'common/identity/account/IdentityAccountModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var accountModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityAccountIdentityAccountModule) {
            accountModule = _commonIdentityAccountIdentityAccountModule['default'];
        }],
        execute: function () {

            describe('AccountDetailDialogService', function () {

                var accountDetailDialogService = undefined,
                    entitlementService = undefined,
                    spModal = undefined,
                    $rootScope = undefined,
                    account = undefined,
                    managedAttributeUrlFunc = undefined,
                    managedAttributeUrl = undefined,
                    entitlement = undefined,
                    managedAttributeService = undefined,
                    managedAttributeDialogService = undefined,
                    managedAttribute = undefined;

                beforeEach(module(accountModule));

                beforeEach(inject(function (_accountDetailDialogService_, _spModal_, _$rootScope_, _entitlementService_, _managedAttributeService_, _managedAttributeDialogService_) {
                    accountDetailDialogService = _accountDetailDialogService_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;
                    entitlementService = _entitlementService_;
                    managedAttributeDialogService = _managedAttributeDialogService_;
                    managedAttributeService = _managedAttributeService_;

                    var modal = {
                        setTitle: jasmine.createSpy('setTitle')
                    };
                    spyOn(spModal, 'open').and.returnValue(modal);

                    // Create a fake role to test with.
                    account = {
                        application: {
                            name: 'App'
                        },
                        linkAttributes: [{
                            name: 'hello',
                            values: ['robin']
                        }],
                        accountName: 'acct',
                        instance: 'inst'
                    };

                    managedAttributeUrl = 'some/url';
                    managedAttributeUrlFunc = jasmine.createSpy('managedAttributeUrlFunc').and.callFake(function () {
                        return managedAttributeUrl;
                    });
                    entitlement = { managedAttributeId: 'abcd' };
                    managedAttribute = { some: 'thing' };
                    spyOn(managedAttributeDialogService, 'showDialog');
                    spyOn(managedAttributeService, 'getEntitlementDetails').and.returnValue(managedAttribute);
                }));

                describe('show dialog', function () {
                    it('blows up without account', function () {
                        expect(function () {
                            return accountDetailDialogService.showDialog(null, managedAttributeUrlFunc);
                        }).toThrow();
                    });

                    it('blows up without managedAttributeUrlFunc', function () {
                        expect(function () {
                            return accountDetailDialogService.showDialog(account, null);
                        }).toThrow();
                    });

                    it('opens a dialog for the account', function () {
                        accountDetailDialogService.showDialog(account, managedAttributeUrlFunc);
                        expect(spModal.open).toHaveBeenCalled();

                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.resolve).toBeDefined();
                        expect(config.resolve.account()).toEqual(account);
                        var testFunc = config.resolve.showEntitlementDetailsFunc();
                        expect(testFunc).toBeDefined();
                    });

                    it('sets the dialog title with the account', function () {
                        var label = entitlementService.getAccountLabel(account.application.name, account.accountName, account.nativeIdentity, account.instance);
                        spyOn(entitlementService, 'getAccountLabel').and.callThrough();
                        var modal = accountDetailDialogService.showDialog(account, managedAttributeUrlFunc);
                        $rootScope.$digest();
                        expect(entitlementService.getAccountLabel).toHaveBeenCalled();
                        expect(modal.setTitle).toHaveBeenCalledWith(label);
                    });
                });

                describe('showEntitlementDetailDialog', function () {
                    it('fetches the managed attribute and opens dialog', function () {
                        accountDetailDialogService.showEntitlementDetailDialog(managedAttributeUrlFunc, entitlement);
                        $rootScope.$apply();
                        expect(managedAttributeUrlFunc).toHaveBeenCalledWith(entitlement.managedAttributeId);
                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(managedAttributeUrl);
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(managedAttribute, managedAttributeUrl);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxVQUFVLFNBQVM7OztJQUc3Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsNkNBQTZDO1lBQ25HLGdCQUFnQiw0Q0FBNEM7O1FBRWhFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw4QkFBOEIsWUFBTTs7Z0JBRXpDLElBQUksNkJBQTBCO29CQUFFLHFCQUFrQjtvQkFBRSxVQUFPO29CQUFFLGFBQVU7b0JBQUUsVUFBTztvQkFBRSwwQkFBdUI7b0JBQ3JHLHNCQUFtQjtvQkFBRSxjQUFXO29CQUFFLDBCQUF1QjtvQkFBRSxnQ0FBNkI7b0JBQUUsbUJBQWdCOztnQkFFOUcsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsOEJBQThCLFdBQVcsY0FBYyxzQkFDdkQsMkJBQTJCLGlDQUFvQztvQkFDOUUsNkJBQTZCO29CQUM3QixVQUFVO29CQUNWLGFBQWE7b0JBQ2IscUJBQXFCO29CQUNyQixnQ0FBZ0M7b0JBQ2hDLDBCQUEwQjs7b0JBRTFCLElBQUksUUFBUTt3QkFDUixVQUFVLFFBQVEsVUFBVTs7b0JBRWhDLE1BQU0sU0FBUyxRQUFRLElBQUksWUFBWTs7O29CQUd2QyxVQUFVO3dCQUNOLGFBQWE7NEJBQ1QsTUFBTTs7d0JBRVYsZ0JBQWdCLENBQUM7NEJBQ2IsTUFBTTs0QkFDTixRQUFRLENBQUM7O3dCQUViLGFBQWE7d0JBQ2IsVUFBVTs7O29CQUdkLHNCQUFzQjtvQkFDdEIsMEJBQTBCLFFBQVEsVUFBVSwyQkFBMkIsSUFBSSxTQUFTLFlBQUE7d0JBZ0JwRSxPQWhCMEU7O29CQUMxRixjQUFjLEVBQUUsb0JBQW9CO29CQUNwQyxtQkFBbUIsRUFBRSxNQUFNO29CQUMzQixNQUFNLCtCQUErQjtvQkFDckMsTUFBTSx5QkFBeUIseUJBQXlCLElBQUksWUFBWTs7O2dCQUc1RSxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyw0QkFBNEIsWUFBTTt3QkFDakMsT0FBTyxZQUFBOzRCQWtCUyxPQWxCSCwyQkFBMkIsV0FBVyxNQUFNOzJCQUEwQjs7O29CQUd2RixHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRCxPQUFPLFlBQUE7NEJBb0JTLE9BcEJILDJCQUEyQixXQUFXLFNBQVM7MkJBQU87OztvQkFHdkUsR0FBRyxrQ0FBa0MsWUFBTTt3QkFDdkMsMkJBQTJCLFdBQVcsU0FBUzt3QkFDL0MsT0FBTyxRQUFRLE1BQU07O3dCQUVyQixJQUFJLFNBQVMsUUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFLO3dCQUNsRCxPQUFPLE9BQU8sU0FBUzt3QkFDdkIsT0FBTyxPQUFPLFFBQVEsV0FBVyxRQUFRO3dCQUN6QyxJQUFJLFdBQVcsT0FBTyxRQUFRO3dCQUM5QixPQUFPLFVBQVU7OztvQkFHckIsR0FBRywwQ0FBMEMsWUFBTTt3QkFDL0MsSUFBSSxRQUFRLG1CQUFtQixnQkFBZ0IsUUFBUSxZQUFZLE1BQU0sUUFBUSxhQUM3RSxRQUFRLGdCQUFnQixRQUFRO3dCQUNwQyxNQUFNLG9CQUFvQixtQkFBbUIsSUFBSTt3QkFDakQsSUFBSSxRQUFRLDJCQUEyQixXQUFXLFNBQVM7d0JBQzNELFdBQVc7d0JBQ1gsT0FBTyxtQkFBbUIsaUJBQWlCO3dCQUMzQyxPQUFPLE1BQU0sVUFBVSxxQkFBcUI7Ozs7Z0JBSXBELFNBQVMsK0JBQStCLFlBQU07b0JBQzFDLEdBQUcsa0RBQWtELFlBQU07d0JBQ3ZELDJCQUEyQiw0QkFBNEIseUJBQXlCO3dCQUNoRixXQUFXO3dCQUNYLE9BQU8seUJBQXlCLHFCQUFxQixZQUFZO3dCQUNqRSxPQUFPLHdCQUF3Qix1QkFBdUIscUJBQXFCO3dCQUMzRSxPQUFPLDhCQUE4QixZQUNoQyxxQkFBcUIsa0JBQWtCOzs7Ozs7R0F5QnJEIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9hY2NvdW50L0FjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjb3VudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvYWNjb3VudC9JZGVudGl0eUFjY291bnRNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWNjb3VudERldGFpbERpYWxvZ1NlcnZpY2UnLCAoKSA9PiB7XG5cbiAgICBsZXQgYWNjb3VudERldGFpbERpYWxvZ1NlcnZpY2UsIGVudGl0bGVtZW50U2VydmljZSwgc3BNb2RhbCwgJHJvb3RTY29wZSwgYWNjb3VudCwgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMsXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVVcmwsIGVudGl0bGVtZW50LCBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsIG1hbmFnZWRBdHRyaWJ1dGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2NvdW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX2FjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlXywgX3NwTW9kYWxfLCBfJHJvb3RTY29wZV8sIF9lbnRpdGxlbWVudFNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfLCBfbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VfKSA9PiB7XG4gICAgICAgIGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlID0gX2FjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgZW50aXRsZW1lbnRTZXJ2aWNlID0gX2VudGl0bGVtZW50U2VydmljZV87XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfO1xuXG4gICAgICAgIGxldCBtb2RhbCA9IHtcbiAgICAgICAgICAgIHNldFRpdGxlOiBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0VGl0bGUnKVxuICAgICAgICB9O1xuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZShtb2RhbCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZmFrZSByb2xlIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgYWNjb3VudCA9IHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0FwcCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rQXR0cmlidXRlczogW3tcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGVsbG8nLFxuICAgICAgICAgICAgICAgIHZhbHVlczogWydyb2JpbiddXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGFjY291bnROYW1lOiAnYWNjdCcsXG4gICAgICAgICAgICBpbnN0YW5jZTogJ2luc3QnXG4gICAgICAgIH07XG5cbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVVybCA9ICdzb21lL3VybCc7XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jID0gamFzbWluZS5jcmVhdGVTcHkoJ21hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jJykuYW5kLmNhbGxGYWtlKCgpID0+IG1hbmFnZWRBdHRyaWJ1dGVVcmwpO1xuICAgICAgICBlbnRpdGxlbWVudCA9IHsgbWFuYWdlZEF0dHJpYnV0ZUlkOiAnYWJjZCcgfTtcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZSA9IHsgc29tZTogJ3RoaW5nJyB9O1xuICAgICAgICBzcHlPbihtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSwgJ3Nob3dEaWFsb2cnKTtcbiAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudERldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUobWFuYWdlZEF0dHJpYnV0ZSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3cgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBpdCgnYmxvd3MgdXAgd2l0aG91dCBhY2NvdW50JywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cobnVsbCwgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdibG93cyB1cCB3aXRob3V0IG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2coYWNjb3VudCwgbnVsbCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIGEgZGlhbG9nIGZvciB0aGUgYWNjb3VudCcsICgpID0+IHtcbiAgICAgICAgICAgIGFjY291bnREZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2coYWNjb3VudCwgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlLmFjY291bnQoKSkudG9FcXVhbChhY2NvdW50KTtcbiAgICAgICAgICAgIGxldCB0ZXN0RnVuYyA9IGNvbmZpZy5yZXNvbHZlLnNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jKCk7XG4gICAgICAgICAgICBleHBlY3QodGVzdEZ1bmMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSBkaWFsb2cgdGl0bGUgd2l0aCB0aGUgYWNjb3VudCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGVudGl0bGVtZW50U2VydmljZS5nZXRBY2NvdW50TGFiZWwoYWNjb3VudC5hcHBsaWNhdGlvbi5uYW1lLCBhY2NvdW50LmFjY291bnROYW1lLFxuICAgICAgICAgICAgICAgIGFjY291bnQubmF0aXZlSWRlbnRpdHksIGFjY291bnQuaW5zdGFuY2UpO1xuICAgICAgICAgICAgc3B5T24oZW50aXRsZW1lbnRTZXJ2aWNlLCAnZ2V0QWNjb3VudExhYmVsJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBsZXQgbW9kYWwgPSBhY2NvdW50RGV0YWlsRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKGFjY291bnQsIG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50U2VydmljZS5nZXRBY2NvdW50TGFiZWwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbC5zZXRUaXRsZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobGFiZWwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RW50aXRsZW1lbnREZXRhaWxEaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdmZXRjaGVzIHRoZSBtYW5hZ2VkIGF0dHJpYnV0ZSBhbmQgb3BlbnMgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgICAgYWNjb3VudERldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0VudGl0bGVtZW50RGV0YWlsRGlhbG9nKG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jLCBlbnRpdGxlbWVudCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnRpdGxlbWVudC5tYW5hZ2VkQXR0cmlidXRlSWQpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlscykudG9IYXZlQmVlbkNhbGxlZFdpdGgobWFuYWdlZEF0dHJpYnV0ZVVybCk7XG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZylcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgobWFuYWdlZEF0dHJpYnV0ZSwgbWFuYWdlZEF0dHJpYnV0ZVVybCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
