System.register(['test/js/TestInitializer', 'workitem/violationReview/ViolationReviewModule', 'test/js/workitem/WorkItemTestData'], function (_export) {
    /* (c) Copyright 2015 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var violationReviewModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_workitemViolationReviewViolationReviewModule) {
            violationReviewModule = _workitemViolationReviewViolationReviewModule['default'];
        }, function (_testJsWorkitemWorkItemTestData) {}],
        execute: function () {

            describe('RequestedItemDetailsCtrl', function () {

                var spModal, ViolationReviewRequestedItem, $controller, ctrl, workItemTestData, configData;

                // Load the test module to get the testService.
                beforeEach(module('sailpoint.test'));

                // Work item module is required for workItemTestData.
                beforeEach(module(violationReviewModule));

                // Setup the dependencies.
                beforeEach(inject(function (_spModal_, _ViolationReviewRequestedItem_, _$controller_, _workItemTestData_) {
                    spModal = _spModal_;
                    ViolationReviewRequestedItem = _ViolationReviewRequestedItem_;
                    $controller = _$controller_;
                    workItemTestData = _workItemTestData_;

                    configData = workItemTestData.workItemTestData1.requestedItems[2];

                    // Create the controller using the bindings param to pass in expected data.
                    // See https://code.angularjs.org/1.3.16/docs/api/ngMock/service/$controller
                    ctrl = $controller('RequestedItemDetailsCtrl', {}, {
                        requestedItem: new ViolationReviewRequestedItem(configData)
                    });
                }));

                describe('getDescription()', function () {
                    it('should return the description', function () {
                        ctrl.requestedItem.description = workItemTestData.workItemTestData1.requestedItems[1].description;
                        expect(ctrl.getDescription()).toBe(workItemTestData.workItemTestData1.requestedItems[1].description);
                    });
                });

                describe('showItemDetails()', function () {
                    it('should open spModal', function () {
                        spyOn(spModal, 'open').and.returnValue({});
                        ctrl.showItemDetails();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });

                describe('isRole()', function () {
                    it('should return true if the item is a role', function () {
                        expect(ctrl.isRole()).toBeTruthy();
                    });

                    it('should return false if the item is not a role', function () {
                        ctrl.requestedItem.roleName = '';
                        expect(ctrl.isRole()).toBeFalsy();
                    });
                });

                describe('isRejected()', function () {
                    it('should return true if the item state is set to "Rejected"', function () {
                        ctrl.requestedItem.setState('Rejected');
                        expect(ctrl.isRejected()).toBeTruthy();
                    });

                    it('should return false if the item state is not set to "Rejected"', function () {
                        ctrl.requestedItem.setState('Finished');
                        expect(ctrl.isRejected()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtpdGVtL3Zpb2xhdGlvblJldmlldy9SZXF1ZXN0ZWRJdGVtRGV0YWlsc0N0cmxUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrREFBa0Qsc0NBQXNDLFVBQVUsU0FBUzs7SUFDdko7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLCtDQUErQztZQUNyRyx3QkFBd0IsOENBQThDO1dBQ3ZFLFVBQVUsaUNBQWlDO1FBQzlDLFNBQVMsWUFBWTs7WUFGN0IsU0FBUyw0QkFBNEIsWUFBVzs7Z0JBRTVDLElBQUksU0FBUyw4QkFBOEIsYUFBYSxNQUFNLGtCQUFrQjs7O2dCQUdoRixXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPOzs7Z0JBSWxCLFdBQVcsT0FBTyxVQUFTLFdBQVcsZ0NBQWdDLGVBQWUsb0JBQW9CO29CQUNyRyxVQUFVO29CQUNWLCtCQUErQjtvQkFDL0IsY0FBYztvQkFDZCxtQkFBbUI7O29CQUVuQixhQUFhLGlCQUFpQixrQkFBa0IsZUFBZTs7OztvQkFJL0QsT0FBTyxZQUFZLDRCQUE0QixJQUFJO3dCQUMvQyxlQUFlLElBQUksNkJBQTZCOzs7O2dCQUl4RCxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxHQUFHLGlDQUFpQyxZQUFXO3dCQUMzQyxLQUFLLGNBQWMsY0FBYyxpQkFBaUIsa0JBQWtCLGVBQWUsR0FBRzt3QkFDdEYsT0FBTyxLQUFLLGtCQUFrQixLQUFLLGlCQUFpQixrQkFBa0IsZUFBZSxHQUFHOzs7O2dCQUloRyxTQUFTLHFCQUFxQixZQUFXO29CQUNyQyxHQUFHLHVCQUF1QixZQUFXO3dCQUNqQyxNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVk7d0JBQ3ZDLEtBQUs7d0JBQ0wsT0FBTyxRQUFRLE1BQU07Ozs7Z0JBSTdCLFNBQVMsWUFBWSxZQUFXO29CQUM1QixHQUFHLDRDQUE0QyxZQUFXO3dCQUN0RCxPQUFPLEtBQUssVUFBVTs7O29CQUcxQixHQUFHLGlEQUFpRCxZQUFXO3dCQUMzRCxLQUFLLGNBQWMsV0FBVzt3QkFDOUIsT0FBTyxLQUFLLFVBQVU7Ozs7Z0JBSTlCLFNBQVMsZ0JBQWdCLFlBQVc7b0JBQ2hDLEdBQUcsNkRBQTZELFlBQVc7d0JBQ3ZFLEtBQUssY0FBYyxTQUFTO3dCQUM1QixPQUFPLEtBQUssY0FBYzs7O29CQUc5QixHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxLQUFLLGNBQWMsU0FBUzt3QkFDNUIsT0FBTyxLQUFLLGNBQWM7Ozs7OztHQVNuQyIsImZpbGUiOiJ3b3JraXRlbS92aW9sYXRpb25SZXZpZXcvUmVxdWVzdGVkSXRlbURldGFpbHNDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNSBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB2aW9sYXRpb25SZXZpZXdNb2R1bGUgZnJvbSAnd29ya2l0ZW0vdmlvbGF0aW9uUmV2aWV3L1Zpb2xhdGlvblJldmlld01vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvd29ya2l0ZW0vV29ya0l0ZW1UZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdSZXF1ZXN0ZWRJdGVtRGV0YWlsc0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzcE1vZGFsLCBWaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtLCAkY29udHJvbGxlciwgY3RybCwgd29ya0l0ZW1UZXN0RGF0YSwgY29uZmlnRGF0YTtcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoJ3NhaWxwb2ludC50ZXN0JykpO1xuXG4gICAgLy8gV29yayBpdGVtIG1vZHVsZSBpcyByZXF1aXJlZCBmb3Igd29ya0l0ZW1UZXN0RGF0YS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh2aW9sYXRpb25SZXZpZXdNb2R1bGUpKTtcblxuXG4gICAgLy8gU2V0dXAgdGhlIGRlcGVuZGVuY2llcy5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfc3BNb2RhbF8sIF9WaW9sYXRpb25SZXZpZXdSZXF1ZXN0ZWRJdGVtXywgXyRjb250cm9sbGVyXywgX3dvcmtJdGVtVGVzdERhdGFfKSB7XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIFZpb2xhdGlvblJldmlld1JlcXVlc3RlZEl0ZW0gPSBfVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbV87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgd29ya0l0ZW1UZXN0RGF0YSA9IF93b3JrSXRlbVRlc3REYXRhXztcblxuICAgICAgICBjb25maWdEYXRhID0gd29ya0l0ZW1UZXN0RGF0YS53b3JrSXRlbVRlc3REYXRhMS5yZXF1ZXN0ZWRJdGVtc1syXTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdXNpbmcgdGhlIGJpbmRpbmdzIHBhcmFtIHRvIHBhc3MgaW4gZXhwZWN0ZWQgZGF0YS5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vY29kZS5hbmd1bGFyanMub3JnLzEuMy4xNi9kb2NzL2FwaS9uZ01vY2svc2VydmljZS8kY29udHJvbGxlclxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1JlcXVlc3RlZEl0ZW1EZXRhaWxzQ3RybCcsIHt9LCB7XG4gICAgICAgICAgICByZXF1ZXN0ZWRJdGVtOiBuZXcgVmlvbGF0aW9uUmV2aWV3UmVxdWVzdGVkSXRlbShjb25maWdEYXRhKVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0RGVzY3JpcHRpb24oKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZGVzY3JpcHRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwucmVxdWVzdGVkSXRlbS5kZXNjcmlwdGlvbiA9IHdvcmtJdGVtVGVzdERhdGEud29ya0l0ZW1UZXN0RGF0YTEucmVxdWVzdGVkSXRlbXNbMV0uZGVzY3JpcHRpb247XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXREZXNjcmlwdGlvbigpKS50b0JlKHdvcmtJdGVtVGVzdERhdGEud29ya0l0ZW1UZXN0RGF0YTEucmVxdWVzdGVkSXRlbXNbMV0uZGVzY3JpcHRpb24pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93SXRlbURldGFpbHMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gc3BNb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe30pO1xuICAgICAgICAgICAgY3RybC5zaG93SXRlbURldGFpbHMoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNSb2xlKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgaXRlbSBpcyBhIHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUm9sZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSBpdGVtIGlzIG5vdCBhIHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwucmVxdWVzdGVkSXRlbS5yb2xlTmFtZSA9ICcnO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSb2xlKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1JlamVjdGVkKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgaXRlbSBzdGF0ZSBpcyBzZXQgdG8gXCJSZWplY3RlZFwiJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLnJlcXVlc3RlZEl0ZW0uc2V0U3RhdGUoJ1JlamVjdGVkJyk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JlamVjdGVkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGl0ZW0gc3RhdGUgaXMgbm90IHNldCB0byBcIlJlamVjdGVkXCInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwucmVxdWVzdGVkSXRlbS5zZXRTdGF0ZSgnRmluaXNoZWQnKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUmVqZWN0ZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
