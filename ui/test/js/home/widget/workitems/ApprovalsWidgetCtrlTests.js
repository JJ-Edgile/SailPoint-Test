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

            describe('ApprovalsWidgetCtrl', function () {
                var ctrl,
                    configService,
                    APPROVALS_WIDGET_COLUMNS,
                    workItemService,
                    columns = [{
                    dataIndex: 'col1',
                    label: 'yadda'
                }];

                beforeEach(module(workItemsWidgetModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_workItemService_, $controller, navigationService, _configService_, SortOrder, _APPROVALS_WIDGET_COLUMNS_, testService) {
                    APPROVALS_WIDGET_COLUMNS = _APPROVALS_WIDGET_COLUMNS_;
                    configService = _configService_;
                    spyOn(configService, 'getColumnConfig').and.returnValue(columns);

                    workItemService = _workItemService_;
                    spyOn(workItemService, 'getWorkItemsByType').and.returnValue(testService.createPromise(false, []));

                    ctrl = $controller('ApprovalsWidgetCtrl', {
                        workItemService: workItemService,
                        navigationService: navigationService,
                        configService: configService,
                        SortOrder: SortOrder,
                        APPROVALS_WIDGET_COLUMNS: APPROVALS_WIDGET_COLUMNS
                    });
                }));

                it('initializes and loads work items', function () {
                    expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                });

                it('returns Approval type', function () {
                    expect(ctrl.getTypes()).toEqual(['Approval']);
                });

                it('gets the columns with the correct key', function () {
                    expect(configService.getColumnConfig).toHaveBeenCalledWith(APPROVALS_WIDGET_COLUMNS);
                    expect(ctrl.columns).toEqual(columns);
                    expect(ctrl.getColumns()).toEqual(ctrl.columns);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9BcHByb3ZhbHNXaWRnZXRDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLCtDQUErQyx1QkFBdUIsVUFBVSxTQUFTO0lBQ2pJOztJQUVBLElBQUksdUJBQXVCO0lBQzNCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJDQUEyQztZQUNqRyx3QkFBd0IsMENBQTBDO1dBQ25FLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQUk7b0JBQU07b0JBQWU7b0JBQTBCO29CQUMvQyxVQUFVLENBQUM7b0JBQ1AsV0FBVztvQkFDWCxPQUFPOzs7Z0JBR2YsV0FBVyxPQUFPLHVCQUF1Qjs7O2dCQUd6QyxXQUFXLE9BQU8sVUFBUyxtQkFBbUIsYUFBYSxtQkFBbUIsaUJBQ25ELFdBQVcsNEJBQTRCLGFBQWE7b0JBQzNFLDJCQUEyQjtvQkFDM0IsZ0JBQWdCO29CQUNoQixNQUFNLGVBQWUsbUJBQW1CLElBQUksWUFBWTs7b0JBRXhELGtCQUFrQjtvQkFDbEIsTUFBTSxpQkFBaUIsc0JBQXNCLElBQUksWUFBWSxZQUFZLGNBQWMsT0FBTzs7b0JBRTlGLE9BQU8sWUFBWSx1QkFBdUI7d0JBQ3RDLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsMEJBQTBCOzs7O2dCQUlsQyxHQUFJLG9DQUFvQyxZQUFXO29CQUMvQyxPQUFPLGdCQUFnQixvQkFBb0I7OztnQkFHL0MsR0FBSSx5QkFBeUIsWUFBVztvQkFDcEMsT0FBTyxLQUFLLFlBQVksUUFBUSxDQUFDOzs7Z0JBR3JDLEdBQUkseUNBQXlDLFlBQVc7b0JBQ3BELE9BQU8sY0FBYyxpQkFBaUIscUJBQXFCO29CQUMzRCxPQUFPLEtBQUssU0FBUyxRQUFRO29CQUM3QixPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7Ozs7O0dBZTVDIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9BcHByb3ZhbHNXaWRnZXRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbXNXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvd29ya2l0ZW1zL1dvcmtJdGVtc1dpZGdldE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQXBwcm92YWxzV2lkZ2V0Q3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdHJsLCBjb25maWdTZXJ2aWNlLCBBUFBST1ZBTFNfV0lER0VUX0NPTFVNTlMsIHdvcmtJdGVtU2VydmljZSxcbiAgICAgICAgY29sdW1ucyA9IFt7XG4gICAgICAgICAgICBkYXRhSW5kZXg6ICdjb2wxJyxcbiAgICAgICAgICAgIGxhYmVsOiAneWFkZGEnXG4gICAgICAgIH1dO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1zV2lkZ2V0TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3dvcmtJdGVtU2VydmljZV8sICRjb250cm9sbGVyLCBuYXZpZ2F0aW9uU2VydmljZSwgX2NvbmZpZ1NlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvcnRPcmRlciwgX0FQUFJPVkFMU19XSURHRVRfQ09MVU1OU18sIHRlc3RTZXJ2aWNlKSB7XG4gICAgICAgIEFQUFJPVkFMU19XSURHRVRfQ09MVU1OUyA9IF9BUFBST1ZBTFNfV0lER0VUX0NPTFVNTlNfO1xuICAgICAgICBjb25maWdTZXJ2aWNlID0gX2NvbmZpZ1NlcnZpY2VfO1xuICAgICAgICBzcHlPbihjb25maWdTZXJ2aWNlLCAnZ2V0Q29sdW1uQ29uZmlnJykuYW5kLnJldHVyblZhbHVlKGNvbHVtbnMpO1xuXG4gICAgICAgIHdvcmtJdGVtU2VydmljZSA9IF93b3JrSXRlbVNlcnZpY2VfO1xuICAgICAgICBzcHlPbih3b3JrSXRlbVNlcnZpY2UsICdnZXRXb3JrSXRlbXNCeVR5cGUnKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgW10pKTtcblxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0FwcHJvdmFsc1dpZGdldEN0cmwnLCB7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2U6IHdvcmtJdGVtU2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgIEFQUFJPVkFMU19XSURHRVRfQ09MVU1OUzogQVBQUk9WQUxTX1dJREdFVF9DT0xVTU5TXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGl0ICgnaW5pdGlhbGl6ZXMgYW5kIGxvYWRzIHdvcmsgaXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXNCeVR5cGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0ICgncmV0dXJucyBBcHByb3ZhbCB0eXBlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChjdHJsLmdldFR5cGVzKCkpLnRvRXF1YWwoWydBcHByb3ZhbCddKTtcbiAgICB9KTtcblxuICAgIGl0ICgnZ2V0cyB0aGUgY29sdW1ucyB3aXRoIHRoZSBjb3JyZWN0IGtleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoY29uZmlnU2VydmljZS5nZXRDb2x1bW5Db25maWcpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKEFQUFJPVkFMU19XSURHRVRfQ09MVU1OUyk7XG4gICAgICAgIGV4cGVjdChjdHJsLmNvbHVtbnMpLnRvRXF1YWwoY29sdW1ucyk7XG4gICAgICAgIGV4cGVjdChjdHJsLmdldENvbHVtbnMoKSkudG9FcXVhbChjdHJsLmNvbHVtbnMpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
