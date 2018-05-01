System.register(['test/js/TestInitializer', 'home/widget/workitems/WorkItemsWidgetModule', './AbstractWorkItemsWidgetDirectiveTestCtrl', 'test/js/TestModule'], function (_export) {
    'use strict';

    var workItemsWidgetModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetWorkitemsWorkItemsWidgetModule) {
            workItemsWidgetModule = _homeWidgetWorkitemsWorkItemsWidgetModule['default'];
        }, function (_AbstractWorkItemsWidgetDirectiveTestCtrl) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('AbstractWorkItemsWidgetDirectiveCtrl', function () {

                var ctrl, getTypesSpy, getColumnsSpy, columnConfigs, types, workItems, workItemService, navigationService, $scope, testService;

                beforeEach(module(workItemsWidgetModule, testModule));

                beforeEach(inject(function (_$rootScope_, _workItemService_, _navigationService_, _testService_, $controller, SortOrder) {
                    $scope = _$rootScope_.$new();
                    testService = _testService_;

                    getTypesSpy = jasmine.createSpy().and.callFake(function () {
                        return types;
                    });
                    getColumnsSpy = jasmine.createSpy().and.callFake(function () {
                        return columnConfigs;
                    });

                    workItemService = _workItemService_;
                    navigationService = _navigationService_;
                    workItems = [];
                    spyOn(workItemService, 'getWorkItemsByType').and.callFake(function () {
                        return testService.createPromise(false, {
                            data: {
                                objects: workItems
                            }
                        });
                    });

                    // Create the controller to test with.
                    ctrl = $controller('AbstractWorkItemsWidgetDirectiveTestCtrl', {
                        workItemService: workItemService,
                        navigationService: navigationService,
                        SortOrder: SortOrder,
                        getTypesSpy: getTypesSpy,
                        getColumnsSpy: getColumnsSpy
                    });
                }));

                it('calls navigationService with correct outcome to view all work items', function () {
                    types = ['one', 'thing'];
                    spyOn(navigationService, 'go');
                    ctrl.viewAll();
                    expect(getTypesSpy).toHaveBeenCalled();
                    expect(navigationService.go).toHaveBeenCalled();
                    expect(navigationService.go.calls.mostRecent().args.length).toBe(1);
                    expect(navigationService.go.calls.mostRecent().args[0]).toEqual({
                        outcome: 'manageWorkItems?workItemType=one&workItemType=thing'
                    });
                });

                it('calls navigationService to view single work item', function () {
                    var workItem = {
                        id: '1111'
                    };

                    spyOn(workItemService, 'navigateToWorkItemPage');
                    ctrl.viewItem(workItem);
                    expect(workItemService.navigateToWorkItemPage).toHaveBeenCalledWith('1111', true);
                });

                it('loads the items when initialized', function () {
                    spyOn(ctrl, 'loadWorkItems');
                    ctrl.initialize();
                    expect(ctrl.loadWorkItems).toHaveBeenCalled();
                });

                describe('loadWorkItems', function () {
                    it('calls workItemService to get items of correct type', function () {
                        workItems = [{ id: '1234' }, { id: 'werqwer' }];
                        types = ['SomeType', 'AnotherType'];

                        workItemService.getWorkItemsByType.calls.reset();
                        ctrl.loadWorkItems();
                        expect(ctrl.workItems).toEqual(null);
                        expect(getTypesSpy).toHaveBeenCalled();
                        expect(workItemService.getWorkItemsByType).toHaveBeenCalledWith(types, 0, 5, ctrl.SORT_ORDER);
                        $scope.$apply();
                        expect(ctrl.workItems).toEqual(workItems);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9BYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZUN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0NBQStDLDhDQUE4Qyx1QkFBdUIsVUFBVSxTQUFTO0lBQW5MOztJQUdJLElBQUksdUJBQXVCO0lBQzNCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJDQUEyQztZQUNqRyx3QkFBd0IsMENBQTBDO1dBQ25FLFVBQVUsMkNBQTJDLElBQUksVUFBVSxtQkFBbUI7WUFDckYsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyx3Q0FBd0MsWUFBVzs7Z0JBRXhELElBQUksTUFBTSxhQUFhLGVBQWUsZUFBZSxPQUFPLFdBQ3hELGlCQUFpQixtQkFBbUIsUUFBUTs7Z0JBRWhELFdBQVcsT0FBTyx1QkFBdUI7O2dCQUV6QyxXQUFXLE9BQU8sVUFBUyxjQUFjLG1CQUFtQixxQkFBcUIsZUFDdEQsYUFBYSxXQUFXO29CQUMvQyxTQUFTLGFBQWE7b0JBQ3RCLGNBQWM7O29CQUVkLGNBQWMsUUFBUSxZQUFZLElBQUksU0FBUyxZQUFXO3dCQUN0RCxPQUFPOztvQkFFWCxnQkFBZ0IsUUFBUSxZQUFZLElBQUksU0FBUyxZQUFXO3dCQUN4RCxPQUFPOzs7b0JBR1gsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osTUFBTSxpQkFBaUIsc0JBQXNCLElBQUksU0FBUyxZQUFXO3dCQUNqRSxPQUFPLFlBQVksY0FBYyxPQUFPOzRCQUNwQyxNQUFNO2dDQUNGLFNBQVM7Ozs7OztvQkFNckIsT0FBTyxZQUFZLDRDQUE0Qzt3QkFDM0QsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixlQUFlOzs7O2dCQUt2QixHQUFHLHVFQUF1RSxZQUFXO29CQUNqRixRQUFRLENBQUMsT0FBTztvQkFDaEIsTUFBTSxtQkFBbUI7b0JBQ3pCLEtBQUs7b0JBQ0wsT0FBTyxhQUFhO29CQUNwQixPQUFPLGtCQUFrQixJQUFJO29CQUM3QixPQUFPLGtCQUFrQixHQUFHLE1BQU0sYUFBYSxLQUFLLFFBQVEsS0FBSztvQkFDakUsT0FBTyxrQkFBa0IsR0FBRyxNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7d0JBQzVELFNBQVM7Ozs7Z0JBSWpCLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELElBQUksV0FBVzt3QkFDWCxJQUFJOzs7b0JBR1IsTUFBTSxpQkFBaUI7b0JBQ3ZCLEtBQUssU0FBUztvQkFDZCxPQUFPLGdCQUFnQix3QkFBd0IscUJBQXFCLFFBQVE7OztnQkFHaEYsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsTUFBTSxNQUFNO29CQUNaLEtBQUs7b0JBQ0wsT0FBTyxLQUFLLGVBQWU7OztnQkFHL0IsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsWUFBWSxDQUFDLEVBQUUsSUFBSSxVQUFTLEVBQUMsSUFBSTt3QkFDakMsUUFBUSxDQUFDLFlBQVc7O3dCQUVwQixnQkFBZ0IsbUJBQW1CLE1BQU07d0JBQ3pDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFdBQVcsUUFBUTt3QkFDL0IsT0FBTyxhQUFhO3dCQUNwQixPQUFPLGdCQUFnQixvQkFDbkIscUJBQXFCLE9BQU8sR0FBRyxHQUFHLEtBQUs7d0JBQzNDLE9BQU87d0JBQ1AsT0FBTyxLQUFLLFdBQVcsUUFBUTs7Ozs7O0dBT3hDIiwiZmlsZSI6ImhvbWUvd2lkZ2V0L3dvcmtpdGVtcy9BYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZUN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgd29ya0l0ZW1zV2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L3dvcmtpdGVtcy9Xb3JrSXRlbXNXaWRnZXRNb2R1bGUnO1xuaW1wb3J0ICcuL0Fic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlVGVzdEN0cmwnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0Fic3RyYWN0V29ya0l0ZW1zV2lkZ2V0RGlyZWN0aXZlQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGN0cmwsIGdldFR5cGVzU3B5LCBnZXRDb2x1bW5zU3B5LCBjb2x1bW5Db25maWdzLCB0eXBlcywgd29ya0l0ZW1zLFxuICAgICAgICB3b3JrSXRlbVNlcnZpY2UsIG5hdmlnYXRpb25TZXJ2aWNlLCAkc2NvcGUsIHRlc3RTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod29ya0l0ZW1zV2lkZ2V0TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF93b3JrSXRlbVNlcnZpY2VfLCBfbmF2aWdhdGlvblNlcnZpY2VfLCBfdGVzdFNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLCBTb3J0T3JkZXIpIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuXG4gICAgICAgIGdldFR5cGVzU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZXM7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRDb2x1bW5zU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uQ29uZmlncztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya0l0ZW1TZXJ2aWNlID0gX3dvcmtJdGVtU2VydmljZV87XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcbiAgICAgICAgd29ya0l0ZW1zID0gW107XG4gICAgICAgIHNweU9uKHdvcmtJdGVtU2VydmljZSwgJ2dldFdvcmtJdGVtc0J5VHlwZScpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB3b3JrSXRlbXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBYnN0cmFjdFdvcmtJdGVtc1dpZGdldERpcmVjdGl2ZVRlc3RDdHJsJywge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlOiB3b3JrSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgIGdldFR5cGVzU3B5OiBnZXRUeXBlc1NweSxcbiAgICAgICAgICAgIGdldENvbHVtbnNTcHk6IGdldENvbHVtbnNTcHlcbiAgICAgICAgfSk7XG5cbiAgICB9KSk7XG5cbiAgICBpdCgnY2FsbHMgbmF2aWdhdGlvblNlcnZpY2Ugd2l0aCBjb3JyZWN0IG91dGNvbWUgdG8gdmlldyBhbGwgd29yayBpdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0eXBlcyA9IFsnb25lJywgJ3RoaW5nJ107XG4gICAgICAgIHNweU9uKG5hdmlnYXRpb25TZXJ2aWNlLCAnZ28nKTtcbiAgICAgICAgY3RybC52aWV3QWxsKCk7XG4gICAgICAgIGV4cGVjdChnZXRUeXBlc1NweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0VxdWFsKHtcbiAgICAgICAgICAgIG91dGNvbWU6ICdtYW5hZ2VXb3JrSXRlbXM/d29ya0l0ZW1UeXBlPW9uZSZ3b3JrSXRlbVR5cGU9dGhpbmcnXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIG5hdmlnYXRpb25TZXJ2aWNlIHRvIHZpZXcgc2luZ2xlIHdvcmsgaXRlbScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd29ya0l0ZW0gPSB7XG4gICAgICAgICAgICBpZDogJzExMTEnXG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24od29ya0l0ZW1TZXJ2aWNlLCAnbmF2aWdhdGVUb1dvcmtJdGVtUGFnZScpO1xuICAgICAgICBjdHJsLnZpZXdJdGVtKHdvcmtJdGVtKTtcbiAgICAgICAgZXhwZWN0KHdvcmtJdGVtU2VydmljZS5uYXZpZ2F0ZVRvV29ya0l0ZW1QYWdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnMTExMScsIHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2xvYWRzIHRoZSBpdGVtcyB3aGVuIGluaXRpYWxpemVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNweU9uKGN0cmwsICdsb2FkV29ya0l0ZW1zJyk7XG4gICAgICAgIGN0cmwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICBleHBlY3QoY3RybC5sb2FkV29ya0l0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZFdvcmtJdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnY2FsbHMgd29ya0l0ZW1TZXJ2aWNlIHRvIGdldCBpdGVtcyBvZiBjb3JyZWN0IHR5cGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdvcmtJdGVtcyA9IFt7IGlkOiAnMTIzNCd9LCB7aWQ6ICd3ZXJxd2VyJ31dO1xuICAgICAgICAgICAgdHlwZXMgPSBbJ1NvbWVUeXBlJywnQW5vdGhlclR5cGUnXTtcblxuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlLmdldFdvcmtJdGVtc0J5VHlwZS5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgY3RybC5sb2FkV29ya0l0ZW1zKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC53b3JrSXRlbXMpLnRvRXF1YWwobnVsbCk7XG4gICAgICAgICAgICBleHBlY3QoZ2V0VHlwZXNTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlKS5cbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aCh0eXBlcywgMCwgNSwgY3RybC5TT1JUX09SREVSKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLndvcmtJdGVtcykudG9FcXVhbCh3b3JrSXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
