System.register(['test/js/TestInitializer', 'adminConsole/provisioningTransaction/ProvisioningTransactionModule.js', 'common/dataview/DataViewModule', 'common/util/UtilModule', 'common/search/SearchModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var provisioningTransactionModule, dataViewModule, utilModule, searchModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_adminConsoleProvisioningTransactionProvisioningTransactionModuleJs) {
            provisioningTransactionModule = _adminConsoleProvisioningTransactionProvisioningTransactionModuleJs['default'];
        }, function (_commonDataviewDataViewModule) {
            dataViewModule = _commonDataviewDataViewModule['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ProvisioningTransactionPageCtrl', function () {

                var provisioningTransactionService = undefined,
                    ProvisioningTransaction = undefined,
                    DataRefreshTrigger = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined,
                    PagingData = undefined,
                    spModal = undefined,
                    counts = {
                    total: 10,
                    success: 6,
                    failed: 3,
                    pending: 1
                };

                beforeEach(module(provisioningTransactionModule, dataViewModule, utilModule, searchModule, testModule));

                /* jshint maxparams:9 */
                beforeEach(inject(function (_provisioningTransactionService_, _ProvisioningTransaction_, _DataRefreshTrigger_, _testService_, _$controller_, _$rootScope_, _SortOrder_, _PagingData_, _spModal_) {

                    provisioningTransactionService = _provisioningTransactionService_;
                    ProvisioningTransaction = _ProvisioningTransaction_;
                    DataRefreshTrigger = _DataRefreshTrigger_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                    spModal = _spModal_;
                    PagingData = _PagingData_;
                }));

                beforeEach(function () {
                    spyOn(provisioningTransactionService, 'getStatusCounts').and.returnValue(testService.createPromise(false, counts));
                });

                function createController() {
                    return $controller('ProvisioningTransactionPageCtrl', {
                        provisioningTransactionService: provisioningTransactionService,
                        ProvisioningTransaction: ProvisioningTransaction,
                        DataRefreshTrigger: DataRefreshTrigger,
                        SortOrder: SortOrder,
                        PagingData: PagingData
                    });
                }

                describe('populateStatusCounts', function () {

                    it('should default all status counts to 0', function () {
                        var ctrl = createController();

                        expect(ctrl.getStatusData().getTotal()).toEqual(0);
                        expect(ctrl.getStatusData().getSuccessCount()).toEqual(0);
                        expect(ctrl.getStatusData().getPendingCount()).toEqual(0);
                        expect(ctrl.getStatusData().getFailedCount()).toEqual(0);
                    });

                    it('should correctly populate counts when fetched', function () {
                        var ctrl = createController();
                        ctrl.populateStatusCounts();

                        $rootScope.$apply();

                        expect(provisioningTransactionService.getStatusCounts).toHaveBeenCalled();
                        expect(ctrl.getStatusData().getTotal()).toEqual(counts.total);
                        expect(ctrl.getStatusData().getSuccessCount()).toEqual(counts.success);
                        expect(ctrl.getStatusData().getPendingCount()).toEqual(counts.pending);
                        expect(ctrl.getStatusData().getFailedCount()).toEqual(counts.failed);
                    });
                });

                describe('getItems', function () {

                    beforeEach(function () {
                        // don't care what the results are for these tests just the parameters
                        // that the function was called with
                        spyOn(provisioningTransactionService, 'getTransactions').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                    });

                    it('should handle a null filterValues', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.getItems(0, 10, null, sort);

                        expect(provisioningTransactionService.getStatusCounts).toHaveBeenCalled();

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(provisioningTransactionService.getTransactions).toHaveBeenCalledWith({}, 0, 10, sort, undefined, undefined);
                    });

                    it('should set the query filter', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.query = 'foo';
                        ctrl.getItems(0, 10, null, sort);

                        expect(provisioningTransactionService.getStatusCounts).toHaveBeenCalled();
                        expect(provisioningTransactionService.getTransactions).toHaveBeenCalledWith({}, 0, 10, sort, undefined, 'foo');
                    });

                    it('should set the status filter', function () {
                        var FAILED = ProvisioningTransaction.Status.Failed;
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.currentStatus = FAILED;
                        ctrl.getItems(0, 10, null, sort);

                        expect(provisioningTransactionService.getStatusCounts).toHaveBeenCalled();
                        expect(provisioningTransactionService.getTransactions).toHaveBeenCalledWith({}, 0, 10, sort, FAILED, undefined);
                    });

                    it('should set a default sort', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        sort.addSort('created', false);

                        ctrl.getItems(0, 10, null, null);

                        expect(provisioningTransactionService.getStatusCounts).toHaveBeenCalled();
                        expect(provisioningTransactionService.getTransactions).toHaveBeenCalledWith({}, 0, 10, sort, undefined, undefined);
                    });
                });

                describe('showStatus', function () {

                    it('should set the current status', function () {
                        var FAILED = ProvisioningTransaction.Status.FAILED;
                        var ctrl = createController();

                        ctrl.showStatus(FAILED);

                        expect(ctrl.currentStatus).toEqual(FAILED);
                    });

                    it('should set the current state to undefined when no param', function () {
                        var ctrl = createController();

                        ctrl.showStatus();

                        expect(ctrl.currentStatus).not.toBeDefined();
                    });

                    it('should trigger a data table refresh', function () {
                        var PENDING = ProvisioningTransaction.Status.PENDING;
                        var ctrl = createController();

                        spyOn(ctrl.tableConfig.refreshTrigger, 'refresh');

                        ctrl.showStatus(PENDING);

                        expect(ctrl.currentStatus).toEqual(PENDING);
                        expect(ctrl.tableConfig.refreshTrigger.refresh).toHaveBeenCalled();
                    });

                    it('should reset the current page', function () {
                        var PENDING = ProvisioningTransaction.Status.PENDING;
                        var ctrl = createController();

                        spyOn(ctrl.tableConfig.pageState.pagingData, 'resetCurrentPage');

                        ctrl.showStatus(PENDING);

                        expect(ctrl.currentStatus).toEqual(PENDING);
                        expect(ctrl.tableConfig.pageState.pagingData.resetCurrentPage).toHaveBeenCalled();
                    });
                });

                describe('refresh', function () {

                    it('should trigger a table refresh', function () {
                        var ctrl = createController();

                        spyOn(ctrl.tableConfig.refreshTrigger, 'refresh');

                        ctrl.refresh();

                        expect(ctrl.tableConfig.refreshTrigger.refresh).toHaveBeenCalled();
                    });
                });

                describe('onQueryKeyPress', function () {

                    var ENTER_KEY = 13,
                        A_KEY = 65;

                    it('should refresh the table when enter is pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: ENTER_KEY
                        };

                        spyOn(ctrl, 'refresh');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.refresh).toHaveBeenCalled();
                    });

                    it('should not refresh the table when enter is not pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: A_KEY
                        };

                        spyOn(ctrl, 'refresh');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.refresh).not.toHaveBeenCalled();
                    });

                    it('should reset current page when enter is pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: ENTER_KEY
                        };

                        spyOn(ctrl.getDataTableConfig().getPagingData(), 'resetCurrentPage');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.getDataTableConfig().getPagingData().resetCurrentPage).toHaveBeenCalled();
                    });

                    it('should not reset current page when enter is not pressed', function () {
                        var ctrl = createController(),
                            event = {
                            keyCode: A_KEY
                        };

                        spyOn(ctrl.getDataTableConfig().getPagingData(), 'resetCurrentPage');

                        ctrl.onQueryKeyPress(event);

                        expect(ctrl.getDataTableConfig().getPagingData().resetCurrentPage).not.toHaveBeenCalled();
                    });
                });

                describe('report button tests', function () {
                    it('should press the report button', function () {
                        var ctrl = createController();
                        spyOn(spModal, 'open');
                        spyOn(ctrl, 'showReportModal');

                        ctrl.showReportModal();
                        expect(ctrl.showReportModal).toHaveBeenCalled();
                        expect(spModal.open).not.toHaveBeenCalled();
                    });

                    it('should open the modal', function () {
                        var id = '123';
                        spyOn(spModal, 'open').and.callFake(function () {
                            return {
                                result: testService.createPromise()
                            };
                        });
                        var ctrl = createController();
                        spyOn(ctrl, 'showReportModal').and.callThrough();

                        ctrl.showReportModal(id);
                        expect(ctrl.showReportModal).toHaveBeenCalledWith(id);
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblBhZ2VDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlFQUF5RSxrQ0FBa0MsMEJBQTBCLDhCQUE4Qix1QkFBdUIsVUFBVSxTQUFTOzs7SUFHclA7O0lBRUEsSUFBSSwrQkFBK0IsZ0JBQWdCLFlBQVksY0FBYztJQUM3RSxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxxRUFBcUU7WUFDM0gsZ0NBQWdDLG9FQUFvRTtXQUNyRyxVQUFVLCtCQUErQjtZQUN4QyxpQkFBaUIsOEJBQThCO1dBQ2hELFVBQVUsdUJBQXVCO1lBQ2hDLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsMkJBQTJCO1lBQ3BDLGVBQWUsMEJBQTBCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBVDdCLFNBQVMsbUNBQW1DLFlBQU07O2dCQUU5QyxJQUFJLGlDQUE4QjtvQkFBRSwwQkFBdUI7b0JBQUUscUJBQWtCO29CQUMzRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxZQUFTO29CQUFFLGFBQVU7b0JBQUUsVUFBTztvQkFDcEUsU0FBUztvQkFDTCxPQUFPO29CQUNQLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixTQUFTOzs7Z0JBR2pCLFdBQVcsT0FBTywrQkFBK0IsZ0JBQWdCLFlBQy9DLGNBQWM7OztnQkFHaEMsV0FBVyxPQUFPLFVBQUMsa0NBQWtDLDJCQUEyQixzQkFDN0QsZUFBZSxlQUFlLGNBQWMsYUFBYSxjQUFjLFdBQWM7O29CQUVwRyxpQ0FBaUM7b0JBQ2pDLDBCQUEwQjtvQkFDMUIscUJBQXFCO29CQUNyQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZO29CQUNaLFVBQVU7b0JBQ1YsYUFB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QkFFakQsS0FBSyxnQkFBZ0I7O3dCQUVyQixPQUFPLEtBQUsscUJBQXFCLGdCQUFnQixrQkFBa0I7OztvQkFHdkUsR0FBRywyREFBMkQsWUFBTTt3QkFDaEUsSUFBSSxPQUFPOzRCQUNQLFFBQVE7NEJBQ0osU0FBUzs7O3dCQUdqQixNQUFNLEtBQUsscUJBQXFCLGlCQUFpQjs7d0JBRWpELEtBQUssZ0JBQWdCOzt3QkFFckIsT0FBTyxLQUFLLHFCQUFxQixnQkFBZ0Isa0JBQWtCLElBQUk7Ozs7Z0JBSy9FLFNBQVMsdUJBQXVCLFlBQU07b0JBQ2xDLEdBQUcsa0NBQWtDLFlBQU07d0JBQ3ZDLElBQUksT0FBTzt3QkFDWCxNQUFNLFNBQVM7d0JBQ2YsTUFBTSxNQUFNOzt3QkFFWixLQUFLO3dCQUNMLE9BQU8sS0FBSyxpQkFBaUI7d0JBQzdCLE9BQU8sUUFBUSxNQUFNLElBQUk7OztvQkFHN0IsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsSUFBSSxLQUFLO3dCQUNULE1BQU0sU0FBUyxRQUFRLElBQUksU0FBUyxZQUFXOzRCQUMzQyxPQUFPO2dDQUNILFFBQVEsWUFBWTs7O3dCQUc1QixJQUFJLE9BQU87d0JBQ1gsTUFBTSxNQUFNLG1CQUFtQixJQUFJOzt3QkFFbkMsS0FBSyxnQkFBZ0I7d0JBQ3JCLE9BQU8sS0FBSyxpQkFBaUIscUJBQXFCO3dCQUNsRCxPQUFPLFFBQVEsTUFBTTs7Ozs7O0dBQzlCIiwiZmlsZSI6ImFkbWluQ29uc29sZS9wcm92aXNpb25pbmdUcmFuc2FjdGlvbi9Qcm92aXNpb25pbmdUcmFuc2FjdGlvblBhZ2VDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25Nb2R1bGUgZnJvbSAnYWRtaW5Db25zb2xlL3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uL1Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uTW9kdWxlLmpzJztcbmltcG9ydCBkYXRhVmlld01vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvRGF0YVZpZXdNb2R1bGUnO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgc2VhcmNoTW9kdWxlIGZyb20gJ2NvbW1vbi9zZWFyY2gvU2VhcmNoTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQcm92aXNpb25pbmdUcmFuc2FjdGlvblBhZ2VDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSwgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24sIERhdGFSZWZyZXNoVHJpZ2dlcixcbiAgICAgICAgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBTb3J0T3JkZXIsIFBhZ2luZ0RhdGEsIHNwTW9kYWwsXG4gICAgICAgIGNvdW50cyA9IHtcbiAgICAgICAgICAgIHRvdGFsOiAxMCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IDYsXG4gICAgICAgICAgICBmYWlsZWQ6IDMsXG4gICAgICAgICAgICBwZW5kaW5nOiAxXG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwcm92aXNpb25pbmdUcmFuc2FjdGlvbk1vZHVsZSwgZGF0YVZpZXdNb2R1bGUsIHV0aWxNb2R1bGUsXG4gICAgICAgICAgICAgICAgICAgICAgc2VhcmNoTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjkgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX3Byb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZV8sIF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl8sIF9EYXRhUmVmcmVzaFRyaWdnZXJfLFxuICAgICAgICAgICAgICAgICAgICAgICBfdGVzdFNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9Tb3J0T3JkZXJfLCBfUGFnaW5nRGF0YV8sIF9zcE1vZGFsXykgPT4ge1xuXG4gICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSA9IF9wcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2VfO1xuICAgICAgICBQcm92aXNpb25pbmdUcmFuc2FjdGlvbiA9IF9Qcm92aXNpb25pbmdUcmFuc2FjdGlvbl87XG4gICAgICAgIERhdGFSZWZyZXNoVHJpZ2dlciA9IF9EYXRhUmVmcmVzaFRyaWdnZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIFBhZ2luZ0RhdGEgPSBfUGFnaW5nRGF0YV87XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHNweU9uKHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZSwgJ2dldFN0YXR1c0NvdW50cycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGNvdW50cylcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25QYWdlQ3RybCcsIHtcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZTogcHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLFxuICAgICAgICAgICAgUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb246IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLFxuICAgICAgICAgICAgRGF0YVJlZnJlc2hUcmlnZ2VyOiBEYXRhUmVmcmVzaFRyaWdnZXIsXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgIFBhZ2luZ0RhdGE6IFBhZ2luZ0RhdGFcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ3BvcHVsYXRlU3RhdHVzQ291bnRzJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGVmYXVsdCBhbGwgc3RhdHVzIGNvdW50cyB0byAwJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFN0YXR1c0RhdGEoKS5nZXRUb3RhbCgpKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3RhdHVzRGF0YSgpLmdldFN1Y2Nlc3NDb3VudCgpKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3RhdHVzRGF0YSgpLmdldFBlbmRpbmdDb3VudCgpKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3RhdHVzRGF0YSgpLmdldEZhaWxlZENvdW50KCkpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHBvcHVsYXRlIGNvdW50cyB3aGVuIGZldGNoZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwucG9wdWxhdGVTdGF0dXNDb3VudHMoKTtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRTdGF0dXNDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFN0YXR1c0RhdGEoKS5nZXRUb3RhbCgpKS50b0VxdWFsKGNvdW50cy50b3RhbCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRTdGF0dXNEYXRhKCkuZ2V0U3VjY2Vzc0NvdW50KCkpLnRvRXF1YWwoY291bnRzLnN1Y2Nlc3MpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0U3RhdHVzRGF0YSgpLmdldFBlbmRpbmdDb3VudCgpKS50b0VxdWFsKGNvdW50cy5wZW5kaW5nKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFN0YXR1c0RhdGEoKS5nZXRGYWlsZWRDb3VudCgpKS50b0VxdWFsKGNvdW50cy5mYWlsZWQpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEl0ZW1zJywgKCkgPT4ge1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gZG9uJ3QgY2FyZSB3aGF0IHRoZSByZXN1bHRzIGFyZSBmb3IgdGhlc2UgdGVzdHMganVzdCB0aGUgcGFyYW1ldGVyc1xuICAgICAgICAgICAgLy8gdGhhdCB0aGUgZnVuY3Rpb24gd2FzIGNhbGxlZCB3aXRoXG4gICAgICAgICAgICBzcHlPbihwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UsICdnZXRUcmFuc2FjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgeyBjb3VudDogMCwgb2JqZWN0czogW10gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIGEgbnVsbCBmaWx0ZXJWYWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuXG4gICAgICAgICAgICBjdHJsLmdldEl0ZW1zKDAsIDEwLCBudWxsLCBzb3J0KTtcblxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRTdGF0dXNDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAgICAgLy8gcXVlcnkgYW5kIHN0YXR1cyB2YWx1ZXMgYXJlIGFsd3lhcyBzcGxpY2VkIGluIGJ1dCB0aGUgaHR0cCBmcmFtZXdvcmtcbiAgICAgICAgICAgIC8vIHdpbGwgc3RyaXAgb3V0IHVuZGVmaW5lZCB2YWx1ZXMgYmVmb3JlIHRoZXkgYXJlIHNlbnQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRUcmFuc2FjdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAwLCAxMCwgc29ydCwgdW5kZWZpbmVkLCB1bmRlZmluZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBxdWVyeSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuXG4gICAgICAgICAgICBjdHJsLnF1ZXJ5ID0gJ2Zvbyc7XG4gICAgICAgICAgICBjdHJsLmdldEl0ZW1zKDAsIDEwLCBudWxsLCBzb3J0KTtcblxuICAgICAgICAgICAgZXhwZWN0KHByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uU2VydmljZS5nZXRTdGF0dXNDb3VudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0VHJhbnNhY3Rpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB7fSwgMCwgMTAsIHNvcnQsIHVuZGVmaW5lZCwgJ2ZvbydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHN0YXR1cyBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBGQUlMRUQgPSBQcm92aXNpb25pbmdUcmFuc2FjdGlvbi5TdGF0dXMuRmFpbGVkO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgY3RybC5jdXJyZW50U3RhdHVzID0gRkFJTEVEO1xuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwLCAxMCwgbnVsbCwgc29ydCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0U3RhdHVzQ291bnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCBGQUlMRUQsIHVuZGVmaW5lZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBhIGRlZmF1bHQgc29ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XG5cbiAgICAgICAgICAgIHNvcnQuYWRkU29ydCgnY3JlYXRlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwLCAxMCwgbnVsbCwgbnVsbCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChwcm92aXNpb25pbmdUcmFuc2FjdGlvblNlcnZpY2UuZ2V0U3RhdHVzQ291bnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QocHJvdmlzaW9uaW5nVHJhbnNhY3Rpb25TZXJ2aWNlLmdldFRyYW5zYWN0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCB1bmRlZmluZWQsIHVuZGVmaW5lZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dTdGF0dXMnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGN1cnJlbnQgc3RhdHVzJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgRkFJTEVEID0gUHJvdmlzaW9uaW5nVHJhbnNhY3Rpb24uU3RhdHVzLkZBSUxFRDtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLnNob3dTdGF0dXMoRkFJTEVEKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY3VycmVudFN0YXR1cykudG9FcXVhbChGQUlMRUQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCB0aGUgY3VycmVudCBzdGF0ZSB0byB1bmRlZmluZWQgd2hlbiBubyBwYXJhbScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLnNob3dTdGF0dXMoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY3VycmVudFN0YXR1cykubm90LnRvQmVEZWZpbmVkKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGEgZGF0YSB0YWJsZSByZWZyZXNoJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgUEVORElORyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5QRU5ESU5HO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwudGFibGVDb25maWcucmVmcmVzaFRyaWdnZXIsICdyZWZyZXNoJyk7XG5cbiAgICAgICAgICAgIGN0cmwuc2hvd1N0YXR1cyhQRU5ESU5HKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY3VycmVudFN0YXR1cykudG9FcXVhbChQRU5ESU5HKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXNldCB0aGUgY3VycmVudCBwYWdlJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgUEVORElORyA9IFByb3Zpc2lvbmluZ1RyYW5zYWN0aW9uLlN0YXR1cy5QRU5ESU5HO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwudGFibGVDb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEsICdyZXNldEN1cnJlbnRQYWdlJyk7XG5cbiAgICAgICAgICAgIGN0cmwuc2hvd1N0YXR1cyhQRU5ESU5HKTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuY3VycmVudFN0YXR1cykudG9FcXVhbChQRU5ESU5HKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnBhZ2VTdGF0ZS5wYWdpbmdEYXRhLnJlc2V0Q3VycmVudFBhZ2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZWZyZXNoJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdzaG91bGQgdHJpZ2dlciBhIHRhYmxlIHJlZnJlc2gnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcblxuICAgICAgICAgICAgc3B5T24oY3RybC50YWJsZUNvbmZpZy5yZWZyZXNoVHJpZ2dlciwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5yZWZyZXNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnRhYmxlQ29uZmlnLnJlZnJlc2hUcmlnZ2VyLnJlZnJlc2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblF1ZXJ5S2V5UHJlc3MnLCAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgRU5URVJfS0VZID0gMTMsXG4gICAgICAgICAgICAgIEFfS0VZID0gNjU7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZWZyZXNoIHRoZSB0YWJsZSB3aGVuIGVudGVyIGlzIHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogRU5URVJfS0VZXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3B5T24oY3RybCwgJ3JlZnJlc2gnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5yZWZyZXNoKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHJlZnJlc2ggdGhlIHRhYmxlIHdoZW4gZW50ZXIgaXMgbm90IHByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAga2V5Q29kZTogQV9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLCAncmVmcmVzaCcpO1xuXG4gICAgICAgICAgICBjdHJsLm9uUXVlcnlLZXlQcmVzcyhldmVudCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnJlZnJlc2gpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gZW50ZXIgaXMgcHJlc3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlOiBFTlRFUl9LRVlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzcHlPbihjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKSwgJ3Jlc2V0Q3VycmVudFBhZ2UnKTtcblxuICAgICAgICAgICAgY3RybC5vblF1ZXJ5S2V5UHJlc3MoZXZlbnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXREYXRhVGFibGVDb25maWcoKS5nZXRQYWdpbmdEYXRhKCkucmVzZXRDdXJyZW50UGFnZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZXNldCBjdXJyZW50IHBhZ2Ugd2hlbiBlbnRlciBpcyBub3QgcHJlc3NlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlDb2RlOiBBX0tFWVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNweU9uKGN0cmwuZ2V0RGF0YVRhYmxlQ29uZmlnKCkuZ2V0UGFnaW5nRGF0YSgpLCAncmVzZXRDdXJyZW50UGFnZScpO1xuXG4gICAgICAgICAgICBjdHJsLm9uUXVlcnlLZXlQcmVzcyhldmVudCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldERhdGFUYWJsZUNvbmZpZygpLmdldFBhZ2luZ0RhdGEoKS5yZXNldEN1cnJlbnRQYWdlKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlcG9ydCBidXR0b24gdGVzdHMnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcHJlc3MgdGhlIHJlcG9ydCBidXR0b24nLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnc2hvd1JlcG9ydE1vZGFsJyk7XG5cbiAgICAgICAgICAgIGN0cmwuc2hvd1JlcG9ydE1vZGFsKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93UmVwb3J0TW9kYWwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiB0aGUgbW9kYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWQgPSAnMTIzJztcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLCAnc2hvd1JlcG9ydE1vZGFsJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgICAgIGN0cmwuc2hvd1JlcG9ydE1vZGFsKGlkKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dSZXBvcnRNb2RhbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWQpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
