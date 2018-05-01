System.register(['test/js/TestInitializer', 'workitem/list/WorkItemListModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var workItemListModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemListWorkItemListModule) {
            workItemListModule = _workitemListWorkItemListModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('FormListCtrl', function () {

                var ctrl, workItemService;

                beforeEach(module(workItemListModule, testModule));

                beforeEach(inject(function ($controller, $rootScope, testService) {
                    workItemService = {
                        getWorkItemsByType: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 2,
                                objects: [{
                                    id: '1'
                                }, {
                                    id: '2'
                                }]
                            }
                        })
                    };

                    ctrl = $controller('FormListCtrl', {
                        workItemService: workItemService
                    });

                    $rootScope.$apply();
                }));

                describe('doSearch', function () {

                    it('should pass through to workItemService.getWorkItemsByType', function () {
                        ctrl.doSearch();

                        expect(workItemService.getWorkItemsByType).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL2xpc3QvRm9ybUxpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9DQUFvQyx1QkFBdUIsVUFBVSxTQUFTO0lBQTFIOztJQUdJLElBQUksb0JBQW9CO0lBQ3hCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixxQkFBcUIsZ0NBQWdDO1dBQ3RELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJLE1BQU07O2dCQUVWLFdBQVcsT0FBTyxvQkFBb0I7O2dCQUV0QyxXQUFXLE9BQU8sVUFBUyxhQUFhLFlBQVksYUFBYTtvQkFDN0Qsa0JBQWtCO3dCQUNkLG9CQUFvQixZQUFZLGlCQUFpQixPQUFPOzRCQUNwRCxRQUFROzRCQUNSLE1BQU07Z0NBQ0YsT0FBTztnQ0FDUCxTQUFTLENBQUM7b0NBQ04sSUFBSTttQ0FDTDtvQ0FDQyxJQUFJOzs7Ozs7b0JBTXBCLE9BQU8sWUFBWSxnQkFBZ0I7d0JBQy9CLGlCQUFpQjs7O29CQUdyQixXQUFXOzs7Z0JBR2YsU0FBUyxZQUFZLFlBQVc7O29CQUU1QixHQUFHLDZEQUE2RCxZQUFXO3dCQUN2RSxLQUFLOzt3QkFFTCxPQUFPLGdCQUFnQixvQkFBb0I7Ozs7OztHQVlwRCIsImZpbGUiOiJ3b3JraXRlbS9saXN0L0Zvcm1MaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3b3JrSXRlbUxpc3RNb2R1bGUgZnJvbSAnd29ya2l0ZW0vbGlzdC9Xb3JrSXRlbUxpc3RNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0Zvcm1MaXN0Q3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGN0cmwsIHdvcmtJdGVtU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHdvcmtJdGVtTGlzdE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbnRyb2xsZXIsICRyb290U2NvcGUsIHRlc3RTZXJ2aWNlKSB7XG4gICAgICAgIHdvcmtJdGVtU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldFdvcmtJdGVtc0J5VHlwZTogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMidcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignRm9ybUxpc3RDdHJsJywge1xuICAgICAgICAgICAgd29ya0l0ZW1TZXJ2aWNlOiB3b3JrSXRlbVNlcnZpY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZG9TZWFyY2gnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIHBhc3MgdGhyb3VnaCB0byB3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmRvU2VhcmNoKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh3b3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zQnlUeXBlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
