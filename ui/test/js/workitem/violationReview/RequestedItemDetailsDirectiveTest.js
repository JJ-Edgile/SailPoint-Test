System.register(['test/js/TestInitializer', 'workitem/violationReview/ViolationReviewModule', 'test/js/TestModule', 'test/js/workitem/WorkItemTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var violationReviewModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemViolationReviewViolationReviewModule) {
            violationReviewModule = _workitemViolationReviewViolationReviewModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}],
        execute: function () {

            describe('RequestedItemDetailsDirective', function () {

                var elementWithViolation = '<sp-requested-item-details sp-requested-item="request"' + '  sp-col-configs="columnConfigs" sp-violation-badge="true"></sp-requested-item-details>',
                    elementWithoutViolation = '<sp-requested-item-details sp-requested-item="request"' + '  sp-col-configs="columnConfigs" sp-violation-badge="false"></sp-requested-item-details>',
                    $scope,
                    $compile,
                    entitlementColumnConfigs,
                    requestedItem,
                    ViolationReviewRequestedItem,
                    element,
                    workItemTestData;

                var createElement = function (elemDef, item, colConfigs, compile, scope) {
                    scope.request = item;
                    scope.columnConfigs = colConfigs;
                    var element = angular.element(elemDef);
                    compile(element)($scope);
                    scope.$apply();
                    return element;
                };

                beforeEach(module(testModule, violationReviewModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, ColumnConfig, _ViolationReviewRequestedItem_, _workItemTestData_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    ViolationReviewRequestedItem = _ViolationReviewRequestedItem_;
                    workItemTestData = _workItemTestData_;

                    entitlementColumnConfigs = [new ColumnConfig({ 'label': 'Account', 'dataIndex': 'accountName' }), new ColumnConfig({ 'label': 'Name', 'dataIndex': 'entitlementName' }), new ColumnConfig({ 'label': 'Value', 'dataIndex': 'entitlementValue' }), new ColumnConfig({ 'label': 'State', 'dataIndex': 'state' }), new ColumnConfig({ 'label': 'Operation', 'dataIndex': 'operation' })];

                    requestedItem = new ViolationReviewRequestedItem(workItemTestData.workItemTestData1.requestedItems[1]);
                }));

                it('should render title correctly', function () {
                    element = createElement(elementWithViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    var title = angular.element(element).find('div.panel-heading')[0].innerText.trim(),
                        dataTitle = workItemTestData.workItemTestData1.requestedItems[1].operation + ': ' + workItemTestData.workItemTestData1.requestedItems[1].roleName;
                    title = title.substring(0, title.indexOf('  '));
                    expect(title.trim()).toEqual(dataTitle);
                });

                it('should render column configs', function () {
                    element = createElement(elementWithViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    var columns = angular.element(element).find('div.spCardData span.sp-card-data-item');
                    expect(columns[0].innerText.substring(0, columns[0].innerText.indexOf('ui_label_separator')).trim()).toEqual(entitlementColumnConfigs[0].label);
                });

                it('should render the role detail button when item is a role', function () {
                    element = createElement(elementWithViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    var button = angular.element(element).find('div.header-cell-button');
                    expect(button.length).toBe(1);

                    requestedItem.roleName = undefined;
                    element = createElement(elementWithViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    button = angular.element(element).find('div.header-cell-button');
                    expect(button.length).toBe(0);
                });

                it('should render the violation badge per element parameter', function () {
                    element = createElement(elementWithViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    var badge = angular.element(element).find('p.text-danger');
                    expect(badge.length).toBe(1);
                    expect(badge[0].innerText.trim()).toEqual('ui_access_violation_detected');

                    element = createElement(elementWithoutViolation, requestedItem, entitlementColumnConfigs, $compile, $scope);
                    badge = angular.element(element).find('p.text-danger');
                    expect(badge.length).toBe(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9SZXF1ZXN0ZWRJdGVtRGV0YWlsc0RpcmVjdGl2ZVRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCxzQkFBc0Isc0NBQXNDLFVBQVUsU0FBUzs7SUFDN0s7O0lBR0ksSUFBSSx1QkFBdUI7SUFDM0IsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHdCQUF3Qiw4Q0FBOEM7V0FDdkUsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSxpQ0FBaUM7UUFDOUMsU0FBUyxZQUFZOztZQUg3QixTQUFTLGlDQUFpQyxZQUFXOztnQkFFakQsSUFBSSx1QkFBdUIsMkRBQ25CO29CQUNKLDBCQUEwQiwyREFDdEI7b0JBQ0o7b0JBQVE7b0JBQVU7b0JBQTBCO29CQUFlO29CQUE4QjtvQkFDekY7O2dCQUVKLElBQUksZ0JBQWdCLFVBQVMsU0FBUyxNQUFNLFlBQVksU0FBUyxPQUFPO29CQUNwRSxNQUFNLFVBQVU7b0JBQ2hCLE1BQU0sZ0JBQWdCO29CQUN0QixJQUFJLFVBQVUsUUFBUSxRQUFRO29CQUM5QixRQUFRLFNBQVM7b0JBQ2pCLE1BQU07b0JBQ04sT0FBTzs7O2dCQUdYLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLGNBQWMsZ0NBQ3hDLG9CQUFvQjtvQkFDM0MsU0FBUztvQkFDVCxXQUFXO29CQUNYLCtCQUErQjtvQkFDL0IsbUJBQW1COztvQkFFbkIsMkJBQTJCLENBQ3ZCLElBQUksYUFBYSxFQUFDLFNBQVMsV0FBVyxhQUFhLGtCQUNuRCxJQUFJLGFBQWEsRUFBQyxTQUFTLFFBQVEsYUFBYSxzQkFDaEQsSUFBSSxhQUFhLEVBQUMsU0FBUyxTQUFTLGFBQWEsdUJBQ2pELElBQUksYUFBYSxFQUFDLFNBQVMsU0FBUyxhQUFhLFlBQ2pELElBQUksYUFBYSxFQUFDLFNBQVMsYUFBYSxhQUFhOztvQkFFekQsZ0JBQWdCLElBQUksNkJBQ2hCLGlCQUFpQixrQkFBa0IsZUFBZTs7O2dCQUcxRCxHQUFHLGlDQUFpQyxZQUFXO29CQUMzQyxVQUFVLGNBQWMsc0JBQXNCLGVBQWUsMEJBQTBCLFVBQVU7b0JBQ2pHLElBQUksUUFBUSxRQUFRLFFBQVEsU0FBUyxLQUFLLHFCQUFxQixHQUFHLFVBQVU7d0JBQ3hFLFlBQVksaUJBQWlCLGtCQUFrQixlQUFlLEdBQUcsWUFBWSxPQUM3RSxpQkFBaUIsa0JBQWtCLGVBQWUsR0FBRztvQkFDekQsUUFBUSxNQUFNLFVBQVUsR0FBRyxNQUFNLFFBQVE7b0JBQ3pDLE9BQU8sTUFBTSxRQUFRLFFBQVE7OztnQkFHakMsR0FBRyxnQ0FBZ0MsWUFBVztvQkFDMUMsVUFBVSxjQUFjLHNCQUFzQixlQUFlLDBCQUEwQixVQUFVO29CQUNqRyxJQUFJLFVBQVUsUUFBUSxRQUFRLFNBQVMsS0FBSztvQkFDNUMsT0FBTyxRQUFRLEdBQUcsVUFBVSxVQUFVLEdBQUcsUUFBUSxHQUFHLFVBQVUsUUFBUSx1QkFBdUIsUUFDeEYsUUFBUSx5QkFBeUIsR0FBRzs7O2dCQUc3QyxHQUFHLDREQUE0RCxZQUFXO29CQUN0RSxVQUFVLGNBQWMsc0JBQXNCLGVBQWUsMEJBQTBCLFVBQVU7b0JBQ2pHLElBQUksU0FBUyxRQUFRLFFBQVEsU0FBUyxLQUFLO29CQUMzQyxPQUFPLE9BQU8sUUFBUSxLQUFLOztvQkFFM0IsY0FBYyxXQUFXO29CQUN6QixVQUFVLGNBQWMsc0JBQXNCLGVBQWUsMEJBQTBCLFVBQVU7b0JBQ2pHLFNBQVMsUUFBUSxRQUFRLFNBQVMsS0FBSztvQkFDdkMsT0FBTyxPQUFPLFFBQVEsS0FBSzs7O2dCQUcvQixHQUFHLDJEQUEyRCxZQUFXO29CQUNyRSxVQUFVLGNBQWMsc0JBQXNCLGVBQWUsMEJBQTBCLFVBQVU7b0JBQ2pHLElBQUksUUFBUSxRQUFRLFFBQVEsU0FBUyxLQUFLO29CQUMxQyxPQUFPLE1BQU0sUUFBUSxLQUFLO29CQUMxQixPQUFPLE1BQU0sR0FBRyxVQUFVLFFBQVEsUUFBUTs7b0JBRTFDLFVBQVUsY0FBYyx5QkFBeUIsZUFBZSwwQkFBMEIsVUFBVTtvQkFDcEcsUUFBUSxRQUFRLFFBQVEsU0FBUyxLQUFLO29CQUN0QyxPQUFPLE1BQU0sUUFBUSxLQUFLOzs7OztHQUkvQiIsImZpbGUiOiJ3b3JraXRlbS92aW9sYXRpb25SZXZpZXcvUmVxdWVzdGVkSXRlbURldGFpbHNEaXJlY3RpdmVUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE1IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHZpb2xhdGlvblJldmlld01vZHVsZSBmcm9tICd3b3JraXRlbS92aW9sYXRpb25SZXZpZXcvVmlvbGF0aW9uUmV2aWV3TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvd29ya2l0ZW0vV29ya0l0ZW1UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdSZXF1ZXN0ZWRJdGVtRGV0YWlsc0RpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGVsZW1lbnRXaXRoVmlvbGF0aW9uID0gJzxzcC1yZXF1ZXN0ZWQtaXRlbS1kZXRhaWxzIHNwLXJlcXVlc3RlZC1pdGVtPVwicmVxdWVzdFwiJyArXG4gICAgICAgICAgICAnICBzcC1jb2wtY29uZmlncz1cImNvbHVtbkNvbmZpZ3NcIiBzcC12aW9sYXRpb24tYmFkZ2U9XCJ0cnVlXCI+PC9zcC1yZXF1ZXN0ZWQtaXRlbS1kZXRhaWxzPicsXG4gICAgICAgIGVsZW1lbnRXaXRob3V0VmlvbGF0aW9uID0gJzxzcC1yZXF1ZXN0ZWQtaXRlbS1kZXRhaWxzIHNwLXJlcXVlc3RlZC1pdGVtPVwicmVxdWVzdFwiJyArXG4gICAgICAgICAgICAnICBzcC1jb2wtY29uZmlncz1cImNvbHVtbkNvbmZpZ3NcIiBzcC12aW9sYXRpb24tYmFkZ2U9XCJmYWxzZVwiPjwvc3AtcmVxdWVzdGVkLWl0ZW0tZGV0YWlscz4nLFxuICAgICAgICAkc2NvcGUsICRjb21waWxlLCBlbnRpdGxlbWVudENvbHVtbkNvbmZpZ3MsIHJlcXVlc3RlZEl0ZW0sIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0sIGVsZW1lbnQsXG4gICAgICAgIHdvcmtJdGVtVGVzdERhdGE7XG5cbiAgICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1EZWYsIGl0ZW0sIGNvbENvbmZpZ3MsIGNvbXBpbGUsIHNjb3BlKSB7XG4gICAgICAgIHNjb3BlLnJlcXVlc3QgPSBpdGVtO1xuICAgICAgICBzY29wZS5jb2x1bW5Db25maWdzID0gY29sQ29uZmlncztcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbURlZik7XG4gICAgICAgIGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCB2aW9sYXRpb25SZXZpZXdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgQ29sdW1uQ29uZmlnLCBfVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3dvcmtJdGVtVGVzdERhdGFfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtID0gX1Zpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW1fO1xuICAgICAgICB3b3JrSXRlbVRlc3REYXRhID0gX3dvcmtJdGVtVGVzdERhdGFfO1xuXG4gICAgICAgIGVudGl0bGVtZW50Q29sdW1uQ29uZmlncyA9IFtcbiAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoeydsYWJlbCc6ICdBY2NvdW50JywgJ2RhdGFJbmRleCc6ICdhY2NvdW50TmFtZSd9KSxcbiAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoeydsYWJlbCc6ICdOYW1lJywgJ2RhdGFJbmRleCc6ICdlbnRpdGxlbWVudE5hbWUnfSksXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHsnbGFiZWwnOiAnVmFsdWUnLCAnZGF0YUluZGV4JzogJ2VudGl0bGVtZW50VmFsdWUnfSksXG4gICAgICAgICAgICBuZXcgQ29sdW1uQ29uZmlnKHsnbGFiZWwnOiAnU3RhdGUnLCAnZGF0YUluZGV4JzogJ3N0YXRlJ30pLFxuICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7J2xhYmVsJzogJ09wZXJhdGlvbicsICdkYXRhSW5kZXgnOiAnb3BlcmF0aW9uJ30pXTtcblxuICAgICAgICByZXF1ZXN0ZWRJdGVtID0gbmV3IFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0oXG4gICAgICAgICAgICB3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExLnJlcXVlc3RlZEl0ZW1zWzFdKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciB0aXRsZSBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhWaW9sYXRpb24sIHJlcXVlc3RlZEl0ZW0sIGVudGl0bGVtZW50Q29sdW1uQ29uZmlncywgJGNvbXBpbGUsICRzY29wZSk7XG4gICAgICAgIHZhciB0aXRsZSA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdkaXYucGFuZWwtaGVhZGluZycpWzBdLmlubmVyVGV4dC50cmltKCksXG4gICAgICAgICAgICBkYXRhVGl0bGUgPSB3b3JrSXRlbVRlc3REYXRhLndvcmtJdGVtVGVzdERhdGExLnJlcXVlc3RlZEl0ZW1zWzFdLm9wZXJhdGlvbiArICc6ICcgK1xuICAgICAgICAgICAgd29ya0l0ZW1UZXN0RGF0YS53b3JrSXRlbVRlc3REYXRhMS5yZXF1ZXN0ZWRJdGVtc1sxXS5yb2xlTmFtZTtcbiAgICAgICAgdGl0bGUgPSB0aXRsZS5zdWJzdHJpbmcoMCwgdGl0bGUuaW5kZXhPZignICAnKSk7XG4gICAgICAgIGV4cGVjdCh0aXRsZS50cmltKCkpLnRvRXF1YWwoZGF0YVRpdGxlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIGNvbHVtbiBjb25maWdzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGVsZW1lbnRXaXRoVmlvbGF0aW9uLCByZXF1ZXN0ZWRJdGVtLCBlbnRpdGxlbWVudENvbHVtbkNvbmZpZ3MsICRjb21waWxlLCAkc2NvcGUpO1xuICAgICAgICB2YXIgY29sdW1ucyA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdkaXYuc3BDYXJkRGF0YSBzcGFuLnNwLWNhcmQtZGF0YS1pdGVtJyk7XG4gICAgICAgIGV4cGVjdChjb2x1bW5zWzBdLmlubmVyVGV4dC5zdWJzdHJpbmcoMCwgY29sdW1uc1swXS5pbm5lclRleHQuaW5kZXhPZigndWlfbGFiZWxfc2VwYXJhdG9yJykpLnRyaW0oKSlcbiAgICAgICAgICAgIC50b0VxdWFsKGVudGl0bGVtZW50Q29sdW1uQ29uZmlnc1swXS5sYWJlbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgcm9sZSBkZXRhaWwgYnV0dG9uIHdoZW4gaXRlbSBpcyBhIHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudFdpdGhWaW9sYXRpb24sIHJlcXVlc3RlZEl0ZW0sIGVudGl0bGVtZW50Q29sdW1uQ29uZmlncywgJGNvbXBpbGUsICRzY29wZSk7XG4gICAgICAgIHZhciBidXR0b24gPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgnZGl2LmhlYWRlci1jZWxsLWJ1dHRvbicpO1xuICAgICAgICBleHBlY3QoYnV0dG9uLmxlbmd0aCkudG9CZSgxKTtcblxuICAgICAgICByZXF1ZXN0ZWRJdGVtLnJvbGVOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aFZpb2xhdGlvbiwgcmVxdWVzdGVkSXRlbSwgZW50aXRsZW1lbnRDb2x1bW5Db25maWdzLCAkY29tcGlsZSwgJHNjb3BlKTtcbiAgICAgICAgYnV0dG9uID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoJ2Rpdi5oZWFkZXItY2VsbC1idXR0b24nKTtcbiAgICAgICAgZXhwZWN0KGJ1dHRvbi5sZW5ndGgpLnRvQmUoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgdmlvbGF0aW9uIGJhZGdlIHBlciBlbGVtZW50IHBhcmFtZXRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aFZpb2xhdGlvbiwgcmVxdWVzdGVkSXRlbSwgZW50aXRsZW1lbnRDb2x1bW5Db25maWdzLCAkY29tcGlsZSwgJHNjb3BlKTtcbiAgICAgICAgdmFyIGJhZGdlID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLmZpbmQoJ3AudGV4dC1kYW5nZXInKTtcbiAgICAgICAgZXhwZWN0KGJhZGdlLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KGJhZGdlWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX2FjY2Vzc192aW9sYXRpb25fZGV0ZWN0ZWQnKTtcblxuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChlbGVtZW50V2l0aG91dFZpb2xhdGlvbiwgcmVxdWVzdGVkSXRlbSwgZW50aXRsZW1lbnRDb2x1bW5Db25maWdzLCAkY29tcGlsZSwgJHNjb3BlKTtcbiAgICAgICAgYmFkZ2UgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgncC50ZXh0LWRhbmdlcicpO1xuICAgICAgICBleHBlY3QoYmFkZ2UubGVuZ3RoKS50b0JlKDApO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
