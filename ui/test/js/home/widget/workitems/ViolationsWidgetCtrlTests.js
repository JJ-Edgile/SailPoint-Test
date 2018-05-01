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

            describe('ViolationsWidgetCtrl', function () {
                var ctrl,
                    configService,
                    VIOLATIONS_WIDGET_COLUMNS,
                    workItemService,
                    columns = [{
                    dataIndex: 'col1',
                    label: 'yadda'
                }];

                beforeEach(module(workItemsWidgetModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_workItemService_, $controller, navigationService, _configService_, SortOrder, _VIOLATIONS_WIDGET_COLUMNS_, testService) {
                    VIOLATIONS_WIDGET_COLUMNS = _VIOLATIONS_WIDGET_COLUMNS_;
                    configService = _configService_;
                    spyOn(configService, 'getColumnConfig').and.returnValue(columns);

                    workItemService = _workItemService_;
                    spyOn(workItemService, 'getWorkItemsByType').and.returnValue(testService.createPromise(false, []));

                    ctrl = $controller('ViolationsWidgetCtrl', {
                        workItemService: workItemService,
                        navigationService: navigationService,
                        configService: configService,
                        SortOrder: SortOrder,
                        VIOLATIONS_WIDGET_COLUMNS: VIOLATIONS_WIDGET_COLUMNS
                    });
                }));

                it('initializes and loads work items', function () {
                    expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                });

                it('gets the columns with the correct key', function () {
                    expect(configService.getColumnConfig).toHaveBeenCalledWith(VIOLATIONS_WIDGET_COLUMNS);
                    expect(ctrl.columns).toEqual(columns);
                    expect(ctrl.getColumns()).toEqual(ctrl.columns);
                });

                describe('types', function () {
                    it('returns ViolationReview and PolicyViolation type by default', function () {
                        expect(ctrl.getTypes()).toEqual(['ViolationReview', 'PolicyViolation']);
                    });

                    it('returns PolicyViolation only if selected', function () {
                        workItemService.getWorkItemsByType.calls.reset();
                        ctrl.selectType({ type: 'PolicyViolation' });
                        expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                        expect(workItemService.getWorkItemsByType.calls.mostRecent().args[0]).toEqual(['PolicyViolation']);
                        expect(ctrl.getTypes()).toEqual(['PolicyViolation']);
                    });

                    it('returns ViolationReview only if selected', function () {
                        workItemService.getWorkItemsByType.calls.reset();
                        ctrl.selectType({ type: 'ViolationReview' });
                        expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                        expect(workItemService.getWorkItemsByType.calls.mostRecent().args[0]).toEqual(['ViolationReview']);
                        expect(ctrl.getTypes()).toEqual(['ViolationReview']);
                    });

                    it('matches selected type', function () {
                        var selectedType = { type: 'ViolationReview' },
                            notSelectedType = { type: 'PolicyViolation' };
                        ctrl.selectType(selectedType);
                        expect(ctrl.isSelectedType(selectedType)).toEqual(true);
                        expect(ctrl.isSelectedType(notSelectedType)).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9WaW9sYXRpb25zV2lkZ2V0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQ0FBK0MsdUJBQXVCLFVBQVUsU0FBUztJQUNqSTs7SUFFQSxJQUFJLHVCQUF1QjtJQUMzQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQ0FBMkM7WUFDakcsd0JBQXdCLDBDQUEwQztXQUNuRSxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHdCQUF3QixZQUFXO2dCQUN4QyxJQUFJO29CQUFNO29CQUFlO29CQUEyQjtvQkFDaEQsVUFBVSxDQUFDO29CQUNQLFdBQVc7b0JBQ1gsT0FBTzs7O2dCQUdmLFdBQVcsT0FBTyx1QkFBdUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQVMsbUJBQW1CLGFBQWEsbUJBQW1CLGlCQUNuRCxXQUFXLDZCQUE2QixhQUFhO29CQUM1RSw0QkFBNEI7b0JBQzVCLGdCQUFnQjtvQkFDaEIsTUFBTSxlQUFlLG1CQUFtQixJQUFJLFlBQVk7O29CQUV4RCxrQkFBa0I7b0JBQ2xCLE1BQU0saUJBQWlCLHNCQUFzQixJQUFJLFlBQVksWUFBWSxjQUFjLE9BQU87O29CQUU5RixPQUFPLFlBQVksd0JBQXdCO3dCQUN2QyxpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixXQUFXO3dCQUNYLDJCQUEyQjs7OztnQkFJbkMsR0FBSSxvQ0FBb0MsWUFBVztvQkFDL0MsT0FBTyxnQkFBZ0Isb0JBQW9COzs7Z0JBRy9DLEdBQUkseUNBQXlDLFlBQVc7b0JBQ3BELE9BQU8sY0FBYyxpQkFBaUIscUJBQXFCO29CQUMzRCxPQUFPLEtBQUssU0FBUyxRQUFRO29CQUM3QixPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUs7OztnQkFHM0MsU0FBUyxTQUFTLFlBQVc7b0JBQ3pCLEdBQUksK0RBQStELFlBQVc7d0JBQzFFLE9BQU8sS0FBSyxZQUFZLFFBQVEsQ0FBQyxtQkFBbUI7OztvQkFHeEQsR0FBSSw0Q0FBNEMsWUFBVzt3QkFDdkQsZ0JBQWdCLG1CQUFtQixNQUFNO3dCQUN6QyxLQUFLLFdBQVcsRUFBRSxNQUFNO3dCQUN4QixPQUFPLGdCQUFnQixvQkFBb0I7d0JBQzNDLE9BQU8sZ0JBQWdCLG1CQUFtQixNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVEsQ0FBQzt3QkFDL0UsT0FBTyxLQUFLLFlBQVksUUFBUSxDQUFDOzs7b0JBR3JDLEdBQUksNENBQTRDLFlBQVc7d0JBQ3ZELGdCQUFnQixtQkFBbUIsTUFBTTt3QkFDekMsS0FBSyxXQUFXLEVBQUUsTUFBTTt3QkFDeEIsT0FBTyxnQkFBZ0Isb0JBQW9CO3dCQUMzQyxPQUFPLGdCQUFnQixtQkFBbUIsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRLENBQUM7d0JBQy9FLE9BQU8sS0FBSyxZQUFZLFFBQVEsQ0FBQzs7O29CQUdyQyxHQUFJLHlCQUF5QixZQUFXO3dCQUNwQyxJQUFJLGVBQWUsRUFBRSxNQUFNOzRCQUN2QixrQkFBa0IsRUFBRSxNQUFNO3dCQUM5QixLQUFLLFdBQVc7d0JBQ2hCLE9BQU8sS0FBSyxlQUFlLGVBQWUsUUFBUTt3QkFDbEQsT0FBTyxLQUFLLGVBQWUsa0JBQWtCLFFBQVE7Ozs7OztHQWdCOUQiLCJmaWxlIjoiaG9tZS93aWRnZXQvd29ya2l0ZW1zL1Zpb2xhdGlvbnNXaWRnZXRDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbXNXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvd29ya2l0ZW1zL1dvcmtJdGVtc1dpZGdldE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnVmlvbGF0aW9uc1dpZGdldEN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3RybCwgY29uZmlnU2VydmljZSwgVklPTEFUSU9OU19XSURHRVRfQ09MVU1OUywgd29ya0l0ZW1TZXJ2aWNlLFxuICAgICAgICBjb2x1bW5zID0gW3tcbiAgICAgICAgICAgIGRhdGFJbmRleDogJ2NvbDEnLFxuICAgICAgICAgICAgbGFiZWw6ICd5YWRkYSdcbiAgICAgICAgfV07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3b3JrSXRlbXNXaWRnZXRNb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfd29ya0l0ZW1TZXJ2aWNlXywgJGNvbnRyb2xsZXIsIG5hdmlnYXRpb25TZXJ2aWNlLCBfY29uZmlnU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydE9yZGVyLCBfVklPTEFUSU9OU19XSURHRVRfQ09MVU1OU18sIHRlc3RTZXJ2aWNlKSB7XG4gICAgICAgIFZJT0xBVElPTlNfV0lER0VUX0NPTFVNTlMgPSBfVklPTEFUSU9OU19XSURHRVRfQ09MVU1OU187XG4gICAgICAgIGNvbmZpZ1NlcnZpY2UgPSBfY29uZmlnU2VydmljZV87XG4gICAgICAgIHNweU9uKGNvbmZpZ1NlcnZpY2UsICdnZXRDb2x1bW5Db25maWcnKS5hbmQucmV0dXJuVmFsdWUoY29sdW1ucyk7XG5cbiAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgIHNweU9uKHdvcmtJdGVtU2VydmljZSwgJ2dldFdvcmtJdGVtc0J5VHlwZScpLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBbXSkpO1xuXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignVmlvbGF0aW9uc1dpZGdldEN0cmwnLCB7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2U6IHdvcmtJdGVtU2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IGNvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgIFZJT0xBVElPTlNfV0lER0VUX0NPTFVNTlM6IFZJT0xBVElPTlNfV0lER0VUX0NPTFVNTlNcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgaXQgKCdpbml0aWFsaXplcyBhbmQgbG9hZHMgd29yayBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtc0J5VHlwZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdnZXRzIHRoZSBjb2x1bW5zIHdpdGggdGhlIGNvcnJlY3Qga2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChjb25maWdTZXJ2aWNlLmdldENvbHVtbkNvbmZpZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoVklPTEFUSU9OU19XSURHRVRfQ09MVU1OUyk7XG4gICAgICAgIGV4cGVjdChjdHJsLmNvbHVtbnMpLnRvRXF1YWwoY29sdW1ucyk7XG4gICAgICAgIGV4cGVjdChjdHJsLmdldENvbHVtbnMoKSkudG9FcXVhbChjdHJsLmNvbHVtbnMpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3R5cGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ICgncmV0dXJucyBWaW9sYXRpb25SZXZpZXcgYW5kIFBvbGljeVZpb2xhdGlvbiB0eXBlIGJ5IGRlZmF1bHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFR5cGVzKCkpLnRvRXF1YWwoWydWaW9sYXRpb25SZXZpZXcnLCAnUG9saWN5VmlvbGF0aW9uJ10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ3JldHVybnMgUG9saWN5VmlvbGF0aW9uIG9ubHkgaWYgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXNCeVR5cGUuY2FsbHMucmVzZXQoKTtcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0VHlwZSh7IHR5cGU6ICdQb2xpY3lWaW9sYXRpb24nIH0pO1xuICAgICAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXNCeVR5cGUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0VxdWFsKFsnUG9saWN5VmlvbGF0aW9uJ10pO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZ2V0VHlwZXMoKSkudG9FcXVhbChbJ1BvbGljeVZpb2xhdGlvbiddKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQgKCdyZXR1cm5zIFZpb2xhdGlvblJldmlldyBvbmx5IGlmIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBjdHJsLnNlbGVjdFR5cGUoeyB0eXBlOiAnVmlvbGF0aW9uUmV2aWV3JyB9KTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qod29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtc0J5VHlwZS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9FcXVhbChbJ1Zpb2xhdGlvblJldmlldyddKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmdldFR5cGVzKCkpLnRvRXF1YWwoWydWaW9sYXRpb25SZXZpZXcnXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0ICgnbWF0Y2hlcyBzZWxlY3RlZCB0eXBlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUeXBlID0geyB0eXBlOiAnVmlvbGF0aW9uUmV2aWV3JyB9LFxuICAgICAgICAgICAgICAgIG5vdFNlbGVjdGVkVHlwZSA9IHsgdHlwZTogJ1BvbGljeVZpb2xhdGlvbicgfTtcbiAgICAgICAgICAgIGN0cmwuc2VsZWN0VHlwZShzZWxlY3RlZFR5cGUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNTZWxlY3RlZFR5cGUoc2VsZWN0ZWRUeXBlKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzU2VsZWN0ZWRUeXBlKG5vdFNlbGVjdGVkVHlwZSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
