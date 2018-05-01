System.register(['test/js/TestInitializer', 'workitem/violationReview/ViolationReviewModule', 'test/js/TestModule'], function (_export) {

    /**
     * Violation Review Work Item List Controller tests
     */
    'use strict';

    var violationReviewModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemViolationReviewViolationReviewModule) {
            violationReviewModule = _workitemViolationReviewViolationReviewModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('ViolationReviewWorkItemListCtrl', function () {
                var $rootScope = undefined,
                    $controller = undefined,
                    testService = undefined,
                    ctrl = undefined,
                    timeout = undefined,
                    mockVRWorkItemService = undefined;

                // Load the test module to get the testService and violation review module.
                beforeEach(module(testModule, violationReviewModule));

                beforeEach(inject(function (_testService_, _$controller_, _$rootScope_, $q, $timeout) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    timeout = $timeout;

                    mockVRWorkItemService = {
                        getWorkItems: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {}
                        }, {})
                    };

                    // Create the controller to test with.
                    ctrl = _$controller_('ViolationReviewWorkItemListCtrl', {
                        violationReviewWorkItemService: mockVRWorkItemService
                    });

                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                }));

                describe('doSearch', function () {
                    it('should call ViolationReviewWorkItemService.getWorkItems', function () {
                        ctrl.doSearch();
                        expect(mockVRWorkItemService.getWorkItems).toHaveBeenCalled();
                    });
                });

                describe('doLoadFilter', function () {
                    it('should return empty list', function () {
                        var filters = undefined;
                        ctrl.doLoadFilters().then(function (result) {
                            filters = result;
                        });
                        $rootScope.$apply();
                        expect(filters).toEqual([]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9WaW9sYXRpb25SZXZpZXdXb3JrSXRlbUxpc3RDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGtEQUFrRCx1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUF4STs7SUFPSSxJQUFJLHVCQUF1QjtJQUMzQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcsd0JBQXdCLDhDQUE4QztXQUN2RSxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTDdCLFNBQVMsbUNBQW1DLFlBQVc7Z0JBQ25ELElBQUksYUFBVTtvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsT0FBSTtvQkFDOUMsVUFBTztvQkFBRSx3QkFBcUI7OztnQkFHOUIsV0FBVyxPQUFPLFlBQVk7O2dCQUU5QixXQUFXLE9BQU8sVUFBUyxlQUFlLGVBQWUsY0FBYyxJQUFJLFVBQVU7OztvQkFHakYsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7b0JBQ2IsVUFBVTs7b0JBRVYsd0JBQXdCO3dCQUNwQixjQUFjLFlBQVksaUJBQWlCLE9BQU87NEJBQzlDLFFBQVE7NEJBQ1IsTUFBTTsyQkFDUDs7OztvQkFJUCxPQUFPLGNBQWMsbUNBQW1DO3dCQUNwRCxnQ0FBZ0M7Ozs7b0JBSXBDLFdBQVc7OztnQkFHZixTQUFTLFlBQVksWUFBVztvQkFDNUIsR0FBRywyREFBMkQsWUFBVzt3QkFDckUsS0FBSzt3QkFDTCxPQUFPLHNCQUFzQixjQUFjOzs7O2dCQUluRCxTQUFTLGdCQUFnQixZQUFXO29CQUNoQyxHQUFHLDRCQUE0QixZQUFXO3dCQUN0QyxJQUFJLFVBQU87d0JBQ1gsS0FBSyxnQkFBZ0IsS0FBSyxVQUFDLFFBQVc7NEJBQ2xDLFVBQVU7O3dCQUVkLFdBQVc7d0JBQ1gsT0FBTyxTQUFTLFFBQVE7Ozs7OztHQWdCakMiLCJmaWxlIjoid29ya2l0ZW0vdmlvbGF0aW9uUmV2aWV3L1Zpb2xhdGlvblJldmlld1dvcmtJdGVtTGlzdEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdmlvbGF0aW9uUmV2aWV3TW9kdWxlIGZyb20gJ3dvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9WaW9sYXRpb25SZXZpZXdNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4gKiBWaW9sYXRpb24gUmV2aWV3IFdvcmsgSXRlbSBMaXN0IENvbnRyb2xsZXIgdGVzdHNcbiAqL1xuZGVzY3JpYmUoJ1Zpb2xhdGlvblJldmlld1dvcmtJdGVtTGlzdEN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgJHJvb3RTY29wZSwgJGNvbnRyb2xsZXIsIHRlc3RTZXJ2aWNlLCBjdHJsLFxuICAgIHRpbWVvdXQsIG1vY2tWUldvcmtJdGVtU2VydmljZTtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIHZpb2xhdGlvbiByZXZpZXcgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIHZpb2xhdGlvblJldmlld01vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCAkcSwgJHRpbWVvdXQpIHtcblxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRpbWVvdXQgPSAkdGltZW91dDtcblxuICAgICAgICBtb2NrVlJXb3JrSXRlbVNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXRXb3JrSXRlbXM6IHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2VTcHkoZmFsc2UsIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7fVxuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgY3RybCA9IF8kY29udHJvbGxlcl8oJ1Zpb2xhdGlvblJldmlld1dvcmtJdGVtTGlzdEN0cmwnLCB7XG4gICAgICAgICAgICB2aW9sYXRpb25SZXZpZXdXb3JrSXRlbVNlcnZpY2U6IG1vY2tWUldvcmtJdGVtU2VydmljZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZG9TZWFyY2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIFZpb2xhdGlvblJldmlld1dvcmtJdGVtU2VydmljZS5nZXRXb3JrSXRlbXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuZG9TZWFyY2goKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrVlJXb3JrSXRlbVNlcnZpY2UuZ2V0V29ya0l0ZW1zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2RvTG9hZEZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBlbXB0eSBsaXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycztcbiAgICAgICAgICAgIGN0cmwuZG9Mb2FkRmlsdGVycygpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZmlsdGVycykudG9FcXVhbChbXSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
