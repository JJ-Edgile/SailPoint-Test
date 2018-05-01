System.register(['test/js/TestInitializer', 'home/widget/workitems/WorkItemsWidgetModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var workItemsWidgetModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWorkitemsWorkItemsWidgetModule) {
            workItemsWidgetModule = _homeWidgetWorkitemsWorkItemsWidgetModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('FormsWidgetCtrl', function () {
                var ctrl,
                    configService,
                    FORMS_WIDGET_COLUMNS,
                    workItemService,
                    columns = [{
                    dataIndex: 'col1',
                    label: 'yadda'
                }];

                beforeEach(module(workItemsWidgetModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_workItemService_, $controller, navigationService, _configService_, SortOrder, _FORMS_WIDGET_COLUMNS_, testService) {
                    FORMS_WIDGET_COLUMNS = _FORMS_WIDGET_COLUMNS_;
                    configService = _configService_;
                    spyOn(configService, 'getColumnConfig').and.returnValue(columns);

                    workItemService = _workItemService_;
                    spyOn(workItemService, 'getWorkItemsByType').and.returnValue(testService.createPromise(false, []));

                    ctrl = $controller('FormsWidgetCtrl', {
                        workItemService: workItemService,
                        navigationService: navigationService,
                        configService: configService,
                        SortOrder: SortOrder,
                        FORMS_WIDGET_COLUMNS: FORMS_WIDGET_COLUMNS
                    });
                }));

                it('initializes and loads work items', function () {
                    expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                });

                it('returns Form type', function () {
                    expect(ctrl.getTypes()).toEqual(['Form']);
                });

                it('gets the columns with the correct key', function () {
                    expect(configService.getColumnConfig).toHaveBeenCalledWith(FORMS_WIDGET_COLUMNS);
                    expect(ctrl.columns).toEqual(columns);
                    expect(ctrl.getColumns()).toEqual(ctrl.columns);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9Gb3Jtc1dpZGdldEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0NBQStDLHVCQUF1QixVQUFVLFNBQVM7SUFDakk7O0lBRUEsSUFBSSx1QkFBdUI7SUFDM0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkNBQTJDO1lBQ2pHLHdCQUF3QiwwQ0FBMEM7V0FDbkUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxtQkFBbUIsWUFBVztnQkFDbkMsSUFBSTtvQkFBTTtvQkFBZTtvQkFBc0I7b0JBQzNDLFVBQVUsQ0FBQztvQkFDUCxXQUFXO29CQUNYLE9BQU87OztnQkFHZixXQUFXLE9BQU8sdUJBQXVCOzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLG1CQUFtQixhQUFhLG1CQUFtQixpQkFDbkQsV0FBVyx3QkFBd0IsYUFBYTtvQkFDdkUsdUJBQXVCO29CQUN2QixnQkFBZ0I7b0JBQ2hCLE1BQU0sZUFBZSxtQkFBbUIsSUFBSSxZQUFZOztvQkFFeEQsa0JBQWtCO29CQUNsQixNQUFNLGlCQUFpQixzQkFBc0IsSUFBSSxZQUFZLFlBQVksY0FBYyxPQUFPOztvQkFFOUYsT0FBTyxZQUFZLG1CQUFtQjt3QkFDbEMsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxzQkFBc0I7Ozs7Z0JBSTlCLEdBQUksb0NBQW9DLFlBQVc7b0JBQy9DLE9BQU8sZ0JBQWdCLG9CQUFvQjs7O2dCQUcvQyxHQUFJLHFCQUFxQixZQUFXO29CQUNoQyxPQUFPLEtBQUssWUFBWSxRQUFRLENBQUM7OztnQkFHckMsR0FBSSx5Q0FBeUMsWUFBVztvQkFDcEQsT0FBTyxjQUFjLGlCQUFpQixxQkFBcUI7b0JBQzNELE9BQU8sS0FBSyxTQUFTLFFBQVE7b0JBQzdCLE9BQU8sS0FBSyxjQUFjLFFBQVEsS0FBSzs7Ozs7R0FlNUMiLCJmaWxlIjoiaG9tZS93aWRnZXQvd29ya2l0ZW1zL0Zvcm1zV2lkZ2V0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgd29ya0l0ZW1zV2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L3dvcmtpdGVtcy9Xb3JrSXRlbXNXaWRnZXRNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0Zvcm1zV2lkZ2V0Q3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdHJsLCBjb25maWdTZXJ2aWNlLCBGT1JNU19XSURHRVRfQ09MVU1OUywgd29ya0l0ZW1TZXJ2aWNlLFxuICAgICAgICBjb2x1bW5zID0gW3tcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2NvbDEnLFxuICAgICAgICAgICAgbGFiZWw6ICd5YWRkYSdcbiAgICAgICAgfV07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbXNXaWRnZXRNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfd29ya0l0ZW1TZXJ2aWNlXywgJGNvbnRyb2xsZXIsIG5hdmlnYXRpb25TZXJ2aWNlLCBfY29uZmlnU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydE9yZGVyLCBfRk9STVNfV0lER0VUX0NPTFVNTlNfLCB0ZXN0U2VydmljZSkge1xuICAgICAgICBGT1JNU19XSURHRVRfQ09MVU1OUyA9IF9GT1JNU19XSURHRVRfQ09MVU1OU187XG4gICAgICAgIGNvbmZpZ1NlcnZpY2UgPSBfY29uZmlnU2VydmljZV87XG4gICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb2x1bW5Db25maWcnKS5hbmQucmV0dXJuVmFsdWUoY29sdW1ucyk7XG5cbiAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgIHNweU9uKHdvcmtJdGVtU2VydmljZSwgJ2dldFdvcmtJdGVtc0J5VHlwZScpLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBbXSkpO1xuXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignRm9ybXNXaWRnZXRDdHJsJywge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlOiB3b3JrSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBjb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgU29ydE9yZGVyOiBTb3J0T3JkZXIsXG4gICAgICAgICAgICBGT1JNU19XSURHRVRfQ09MVU1OUzogRk9STVNfV0lER0VUX0NPTFVNTlNcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQgKCdpbml0aWFsaXplcyBhbmQgbG9hZHMgd29yayBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtc0J5VHlwZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdyZXR1cm5zIEZvcm0gdHlwZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY3RybC5nZXRUeXBlcygpKS50b0VxdWFsKFsnRm9ybSddKTtcbiAgICB9KTtcblxuICAgIGl0ICgnZ2V0cyB0aGUgY29sdW1ucyB3aXRoIHRoZSBjb3JyZWN0IGtleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKEZPUk1TX1dJREdFVF9DT0xVTU5TKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuY29sdW1ucykudG9FcXVhbChjb2x1bW5zKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuZ2V0Q29sdW1ucygpKS50b0VxdWFsKGN0cmwuY29sdW1ucyk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
