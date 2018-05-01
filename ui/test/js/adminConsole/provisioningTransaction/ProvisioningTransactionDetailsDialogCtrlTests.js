System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the ProvisioningTransactionDetailsDialogCtrl.
     */
    'use strict';

    var provTransModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModule) {
            provTransModule = _adminConsoleProvisioningTransactionProvisioningTransactionModule['default'];
        }],
        execute: function () {
            describe('ProvisioningTransactionDetailsDialogCtrl', function () {
                var ID = '1';

                var provisioningTransactionService = undefined,
                    ProvisioningTransaction = undefined,
                    $controller = undefined,
                    $q = undefined;

                beforeEach(module(provTransModule));

                beforeEach(inject(function (_provisioningTransactionService_, _ProvisioningTransaction_, _$controller_, _$q_) {
                    provisioningTransactionService = _provisioningTransactionService_;
                    ProvisioningTransaction = _ProvisioningTransaction_;
                    $controller = _$controller_;
                    $q = _$q_;
                }));

                function createController() {
                    spyOn(provisioningTransactionService, 'getTransactionDetails').and.returnValue($q.when({}));

                    return $controller('ProvisioningTransactionDetailsDialogCtrl', {
                        provisioningTransactionService: provisioningTransactionService,
                        ProvisioningTransaction: ProvisioningTransaction,
                        transactionId: ID
                    });
                }

                it('should fetch the details when constructed', function () {
                    createController();

                    expect(provisioningTransactionService.getTransactionDetails).toHaveBeenCalledWith(ID);
                });

                describe('isSuccess', function () {

                    it('should return true if success', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.SUCCESS;

                        expect(ctrl.isSuccess()).toBe(true);
                    });

                    it('should return false if not success', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.PENDING;
                        expect(ctrl.isSuccess()).toBe(false);

                        ctrl.transaction.status = ProvisioningTransaction.Status.FAILED;
                        expect(ctrl.isSuccess()).toBe(false);
                    });
                });

                describe('isPending', function () {

                    it('should return true if pending', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.PENDING;

                        expect(ctrl.isPending()).toBe(true);
                    });

                    it('should return false if not pending', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.SUCCESS;
                        expect(ctrl.isPending()).toBe(false);

                        ctrl.transaction.status = ProvisioningTransaction.Status.SUCCESS;
                        expect(ctrl.isPending()).toBe(false);
                    });
                });

                describe('isFailed', function () {

                    it('should return true if failed', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.FAILED;

                        expect(ctrl.isFailed()).toBe(true);
                    });

                    it('should return false if not failed', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.status = ProvisioningTransaction.Status.PENDING;
                        expect(ctrl.isFailed()).toBe(false);

                        ctrl.transaction.status = ProvisioningTransaction.Status.SUCCESS;
                        expect(ctrl.isFailed()).toBe(false);
                    });
                });

                describe('hasRequests', function () {

                    it('should return true if has requests', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.attributeRequests = [{}];
                        ctrl.transaction.permissionRequests = [{}];
                        expect(ctrl.hasRequests()).toBe(true);

                        ctrl.transaction.attributeRequests = [{}];
                        ctrl.transaction.permissionRequests = [];
                        expect(ctrl.hasRequests()).toBe(true);

                        ctrl.transaction.attributeRequests = [];
                        ctrl.transaction.permissionRequests = [{}];
                        expect(ctrl.hasRequests()).toBe(true);
                    });

                    it('should return false if has no requests', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.attributeRequests = [];
                        ctrl.transaction.permissionRequests = [];
                        expect(ctrl.hasRequests()).toBe(false);
                    });
                });

                describe('hasFilteredRequests', function () {

                    it('should return true if has requests', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.filteredRequests = [{}];
                        expect(ctrl.hasFilteredRequests()).toBe(true);
                    });

                    it('should return false if has no requests', function () {
                        var ctrl = createController();
                        ctrl.transaction = new ProvisioningTransaction({});

                        ctrl.transaction.filteredRequests = [];
                        expect(ctrl.hasFilteredRequests()).toBe(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbkRldGFpbHNEaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHVFQUF1RSxVQUFVLFNBQVM7Ozs7Ozs7O0lBUWxJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtRUFBbUU7WUFDekgsa0JBQWtCLGtFQUFrRTs7UUFFeEYsU0FBUyxZQUFZO1lBTDdCLFNBQVMsNENBQTRDLFlBQU07Z0JBQ3ZELElBQU0sS0FBSzs7Z0JBRVgsSUFBSSxpQ0FBOEI7b0JBQUUsMEJBQXVCO29CQUFFLGNBQVc7b0JBQUUsS0FBRTs7Z0JBRTVFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGtDQUFrQywyQkFBMkIsZUFBZSxNQUFTO29CQUNwRyxpQ0FBaUM7b0JBQ2pDLDBCQUEwQjtvQkFDMUIsY0FBYztvQkFDZCxLQUFLOzs7Z0JBR1QsU0FBUyxtQkFBbUI7b0JBQ3hCLE1BQU0sZ0NBQWdDLHlCQUF5QixJQUFJLFlBQVksR0FBRyxLQUFLOztvQkFFdkYsT0FBTyxZQUFZLDRDQUE0Qzt3QkFDM0QsZ0NBQWdDO3dCQUNoQyx5QkFBeUI7d0JBQ3pCLGVBQWU7Ozs7Z0JBSXZCLEdBQUksNkNBQTZDLFlBQU07b0JBQ25EOztvQkFFQSxPQUFPLCtCQUErQix1QkFBdUIscUJBQXFCOzs7Z0JBR3RGLFNBQVMsYUFBYSxZQUFNOztvQkFFeEIsR0FBRyxpQ0FBaUMsWUFBTTt3QkFDdEMsSUFBSSxPQUFPO3dCQUNYLEtBQUssY0FBYyxJQUFJLHdCQUF3Qjs7d0JBRS9DLEtBQUssWUFBWSxTQUFTLHdCQUF3QixPQUFPOzt3QkFFekQsT0FBTyxLQUFLLGFBQWEsS0FBSzs7O29CQUdsQyxHQUFHLHNDQUFzQyxZQUFNO3dCQUMzQyxJQUFJLE9BQU87d0JBQ1gsS0FBSyxjQUFjLElBQUksd0JBQXdCOzt3QkFFL0MsS0FBSyxZQUFZLFNBQVMsd0JBQXdCLE9BQU87d0JBQ3pELE9BQU8sS0FBSyxhQUFhLEtBQUs7O3dCQUU5QixLQUFLLFlBQVksU0FBUyx3QkFBd0IsT0FBTzt3QkFDekQsT0FBTyxLQUFLLGFBQWEsS0FBSzs7OztnQkFLdEMsU0FBUyxhQUFhLFlBQU07O29CQUV4QixHQUFHLGlDQUFpQyxZQUFNO3dCQUN0QyxJQUFJLE9BQU87d0JBQ1gsS0FBSyxjQUFjLElBQUksd0JBQXdCOzt3QkFFL0MsS0FBSyxZQUFZLFNBQVMsd0JBQXdCLE9BQU87O3dCQUV6RCxPQUFPLEtBQUssYUFBYSxLQUFLOzs7b0JBR2xDLEdBQUcsc0NBQXNDLFlBQU07d0JBQzNDLElBQUksT0FBTzt3QkFDWCxLQUFLLGNBQWMsSUFBSSx3QkFBd0I7O3dCQUUvQyxLQUFLLFlBQVksU0FBUyx3QkFBd0IsT0FBTzt3QkFDekQsT0FBTyxLQUFLLGFBQWEsS0FBSzs7d0JBRTlCLEtBQUssWUFBWSxTQUFTLHdCQUF3QixPQUFPO3dCQUN6RCxPQUFPLEtBQUssYUFBYSxLQUFLOzs7O2dCQUt0QyxTQUFTLFlBQVksWUFBTTs7b0JBRXZCLEdBQUcsZ0NBQWdDLFlBQU07d0JBQ3JDLElBQUksT0FBTzt3QkFDWCxLQUFLLGNBQWMsSUFBSSx3QkFBd0I7O3dCQUUvQyxLQUFLLFlBQVksU0FBUyx3QkFBd0IsT0FBTzs7d0JBRXpELE9BQU8sS0FBSyxZQUFZLEtBQUs7OztvQkFHakMsR0FBRyxxQ0FBcUMsWUFBTTt3QkFDMUMsSUFBSSxPQUFPO3dCQUNYLEtBQUssY0FBYyxJQUFJLHdCQUF3Qjs7d0JBRS9DLEtBQUssWUFBWSxTQUFTLHdCQUF3QixPQUFPO3dCQUN6RCxPQUFPLEtBQUssWUFBWSxLQUFLOzt3QkFFN0IsS0FBSyxZQUFZLFNBQVMsd0JBQXdCLE9BQU87d0JBQ3pELE9BQU8sS0FBSyxZQUFZLEtBQUs7Ozs7Z0JBS3JDLFNBQVMsZUFBZSxZQUFNOztvQkFFMUIsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsSUFBSSxPQUFPO3dCQUNYLEtBQUssY0FBYyxJQUFJLHdCQUF3Qjs7d0JBRS9DLEtBQUssWUFBWSxvQkFBb0IsQ0FBQzt3QkFDdEMsS0FBSyxZQUFZLHFCQUFxQixDQUFDO3dCQUN2QyxPQUFPLEtBQUssZUFBZSxLQUFLOzt3QkFFaEMsS0FBSyxZQUFZLG9CQUFvQixDQUFDO3dCQUN0QyxLQUFLLFlBQVkscUJBQXFCO3dCQUN0QyxPQUFPLEtBQUssZUFBZSxLQUFLOzt3QkFFaEMsS0FBSyxZQUFZLG9CQUFvQjt3QkFDckMsS0FBSyxZQUFZLHFCQUFxQixDQUFDO3dCQUN2QyxPQUFPLEtBQUssZUFBZSxLQUFLOzs7b0JBR3BDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLElBQUksT0FBTzt3QkFDWCxLQUFLLGNBQWMsSUFBSSx3QkFBd0I7O3dCQUUvQyxLQUFLLFlBQVksb0JBQW9CO3dCQUNyQyxLQUFLLFlBQVkscUJBQXFCO3dCQUN0QyxPQUFPLEtBQUssZUFBZSxLQUFLOzs7O2dCQUt4QyxTQUFTLHVCQUF1QixZQUFNOztvQkFFbEMsR0FBRyxzQ0FBc0MsWUFBTTt3QkFDM0MsSUFBSSxPQUFPO3dCQUNYLEtBQUssY0FBYyxJQUFJLHdCQUF3Qjs7d0JBRS9DLEtBQUssWUFBWSxtQkFBbUIsQ0FBQzt3QkFDckMsT0FBTyxLQUFLLHVCQUF1QixLQUFLOzs7b0JBRzVDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLElBQUksT0FBTzt3QkFDWCxLQUFLLGNBQWMsSUFBSSx3QkFBd0I7O3dCQUUvQyxLQUFLLFlBQVksbUJBQW1CO3dCQUNwQyxPQUFPLEtBQUssdUJBQXVCLEtBQUs7Ozs7OztHQVdqRCIsImZpbGUiOiJhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25EZXRhaWxzRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHByb3ZUcmFuc01vZHVsZSBmcm9tICdhZG1pbkNvbnNvbGUvcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24vUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25EZXRhaWxzRGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uRGV0YWlsc0RpYWxvZ0N0cmwnLCAoKSA9PiB7XG4gICAgY29uc3QgSUQgPSAnMSc7XG5cbiAgICBsZXQgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLCBQcm92aXNpb25pbmdUcmFuc2FjdGlvbiwgJGNvbnRyb2xsZXIsICRxO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocHJvdlRyYW5zTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZV8sIF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl8sIF8kY29udHJvbGxlcl8sIF8kcV8pID0+IHtcbiAgICAgICAgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlID0gX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZV87XG4gICAgICAgIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uID0gX1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uXztcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgc3B5T24ocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLCAnZ2V0VHJhbnNhY3Rpb25EZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcblxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uRGV0YWlsc0RpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICBwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2U6IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSxcbiAgICAgICAgICAgIFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uOiBQcm92aXNpb25pbmdUcmFuc2FjdGlvbixcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ6IElEXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGl0ICgnc2hvdWxkIGZldGNoIHRoZSBkZXRhaWxzIHdoZW4gY29uc3RydWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9uRGV0YWlscykudG9IYXZlQmVlbkNhbGxlZFdpdGgoSUQpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU3VjY2VzcycsICgpID0+IHtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnN0YXR1cyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5TVUNDRVNTO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Y2Nlc3MoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgbm90IHN1Y2Nlc3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnN0YXR1cyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5QRU5ESU5HO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTdWNjZXNzKCkpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnN0YXR1cyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5GQUlMRUQ7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1N1Y2Nlc3MoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNQZW5kaW5nJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgcGVuZGluZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbiA9IG5ldyBQcm92aXNpb25pbmdUcmFuc2FjdGlvbih7fSk7XG5cbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24uc3RhdHVzID0gUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLlBFTkRJTkc7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUGVuZGluZygpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBub3QgcGVuZGluZycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbiA9IG5ldyBQcm92aXNpb25pbmdUcmFuc2FjdGlvbih7fSk7XG5cbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24uc3RhdHVzID0gUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLlNVQ0NFU1M7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1BlbmRpbmcoKSkudG9CZShmYWxzZSk7XG5cbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24uc3RhdHVzID0gUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLlNVQ0NFU1M7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1BlbmRpbmcoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNGYWlsZWQnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBmYWlsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnN0YXR1cyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5GQUlMRUQ7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRmFpbGVkKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG5vdCBmYWlsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnN0YXR1cyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5QRU5ESU5HO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNGYWlsZWQoKSkudG9CZShmYWxzZSk7XG5cbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24uc3RhdHVzID0gUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLlNVQ0NFU1M7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0ZhaWxlZCgpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdoYXNSZXF1ZXN0cycsICgpID0+IHtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGhhcyByZXF1ZXN0cycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbiA9IG5ldyBQcm92aXNpb25pbmdUcmFuc2FjdGlvbih7fSk7XG5cbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24uYXR0cmlidXRlUmVxdWVzdHMgPSBbe31dO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5wZXJtaXNzaW9uUmVxdWVzdHMgPSBbe31dO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUmVxdWVzdHMoKSkudG9CZSh0cnVlKTtcblxuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5hdHRyaWJ1dGVSZXF1ZXN0cyA9IFt7fV07XG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLnBlcm1pc3Npb25SZXF1ZXN0cyA9IFtdO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUmVxdWVzdHMoKSkudG9CZSh0cnVlKTtcblxuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5hdHRyaWJ1dGVSZXF1ZXN0cyA9IFtdO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5wZXJtaXNzaW9uUmVxdWVzdHMgPSBbe31dO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzUmVxdWVzdHMoKSkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaGFzIG5vIHJlcXVlc3RzJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uID0gbmV3IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uKHt9KTtcblxuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5hdHRyaWJ1dGVSZXF1ZXN0cyA9IFtdO1xuICAgICAgICAgICAgY3RybC50cmFuc2FjdGlvbi5wZXJtaXNzaW9uUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1JlcXVlc3RzKCkpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0ZpbHRlcmVkUmVxdWVzdHMnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBoYXMgcmVxdWVzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLmZpbHRlcmVkUmVxdWVzdHMgPSBbe31dO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRmlsdGVyZWRSZXF1ZXN0cygpKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBoYXMgbm8gcmVxdWVzdHMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwudHJhbnNhY3Rpb24gPSBuZXcgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24oe30pO1xuXG4gICAgICAgICAgICBjdHJsLnRyYW5zYWN0aW9uLmZpbHRlcmVkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0ZpbHRlcmVkUmVxdWVzdHMoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
