System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule'], function (_export) {

    /**
     * Tests for the ApprovalPriorityDialogCtrl.
     */
    'use strict';

    var approvalModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('ApprovalPriorityDialogCtrl', function () {

                var scope, $controller, $rootScope, approvalService, approvalTestDataService;

                // Let the tests know we'll use the approval module.
                beforeEach(module(approvalModule));
                beforeEach(module(testModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 */
                beforeEach(inject(function (_$controller_, _$rootScope_, _approvalService_, testService, _approvalTestDataService_) {

                    // Save the services.
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    approvalService = _approvalService_;
                    approvalTestDataService = _approvalTestDataService_;

                    // Create a mock scope.
                    scope = {};

                    // Save the approval service so we can override the methods.
                    spyOn(approvalService, 'setPriority').and.returnValue(testService.createResponsePromise(false));
                }));

                /**
                 * Create an ApprovalPriorityCtrl with some optional overrides.
                 */
                var createController = function (approvalOverrides) {
                    var approval = angular.copy(approvalTestDataService.createApproval());

                    // If overrides were specified, apply them.
                    if (approvalOverrides) {
                        angular.extend(approval, approvalOverrides);
                    }

                    createControllerWithApproval(approval);
                };

                /**
                 * Create an ApprovalDirectiveCtrl with the given approval and position in the list.
                 */
                var createControllerWithApproval = function (approval) {
                    scope.approval = approval;

                    // Create the controller to test with.
                    $controller('ApprovalPriorityDialogCtrl', {
                        $scope: scope,
                        approvalService: approvalService
                    });
                };

                it('explodes with no approval', function () {
                    expect(function () {
                        createControllerWithApproval(null);
                    }).toThrow();
                });

                it('initializes the priority to that of the approval', function () {
                    createController();
                    expect(scope.model.priority).toEqual('High');
                });

                it('saves the priority', function () {
                    var savePromise;

                    createController();
                    scope.model.priority = 'Low';
                    savePromise = scope.savePriority();
                    expect(approvalService.setPriority).toHaveBeenCalled();
                    expect(approvalService.setPriority.calls.mostRecent().args[0]).toEqual('1234');
                    expect(approvalService.setPriority.calls.mostRecent().args[1]).toEqual('Low');

                    // Make sure that savePriority() returns a promise that resolves to the
                    // new priority.
                    savePromise.then(function (result) {
                        expect(result).toEqual('Low');
                    });
                    $rootScope.$apply();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsUHJpb3JpdHlEaWFsb2dDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUs3Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBUDdCLFNBQVMsOEJBQThCLFlBQVc7O2dCQUU5QyxJQUFJLE9BQU8sYUFBYSxZQUFZLGlCQUFpQjs7O2dCQUdyRCxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTzs7Ozs7Z0JBS2xCLFdBQVcsT0FBTyxVQUFTLGVBQWUsY0FBYyxtQkFBbUIsYUFDaEQsMkJBQTJCOzs7b0JBR2xELGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLDBCQUEwQjs7O29CQUcxQixRQUFROzs7b0JBR1IsTUFBTSxpQkFBaUIsZUFBZSxJQUFJLFlBQVksWUFBWSxzQkFBc0I7Ozs7OztnQkFNNUYsSUFBSSxtQkFBbUIsVUFBUyxtQkFBbUI7b0JBQy9DLElBQUksV0FBVyxRQUFRLEtBQUssd0JBQXdCOzs7b0JBR3BELElBQUksbUJBQW1CO3dCQUNuQixRQUFRLE9BQU8sVUFBVTs7O29CQUc3Qiw2QkFBNkI7Ozs7OztnQkFNakMsSUFBSSwrQkFBK0IsVUFBUyxVQUFVO29CQUNsRCxNQUFNLFdBQVc7OztvQkFHakIsWUFBWSw4QkFBOEI7d0JBQ3RDLFFBQVE7d0JBQ1IsaUJBQWlCOzs7O2dCQUl6QixHQUFHLDZCQUE2QixZQUFXO29CQUN2QyxPQUFPLFlBQVc7d0JBQUUsNkJBQTZCO3VCQUFVOzs7Z0JBRy9ELEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlEO29CQUNBLE9BQU8sTUFBTSxNQUFNLFVBQVUsUUFBUTs7O2dCQUd6QyxHQUFHLHNCQUFzQixZQUFXO29CQUNoQyxJQUFJOztvQkFFSjtvQkFDQSxNQUFNLE1BQU0sV0FBVztvQkFDdkIsY0FBYyxNQUFNO29CQUNwQixPQUFPLGdCQUFnQixhQUFhO29CQUNwQyxPQUFPLGdCQUFnQixZQUFZLE1BQU0sYUFBYSxLQUFLLElBQUksUUFBUTtvQkFDdkUsT0FBTyxnQkFBZ0IsWUFBWSxNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7Ozs7b0JBSXZFLFlBQVksS0FBSyxVQUFTLFFBQVE7d0JBQzlCLE9BQU8sUUFBUSxRQUFROztvQkFFM0IsV0FBVzs7Ozs7R0FjaEIiLCJmaWxlIjoiYXBwcm92YWwvQXBwcm92YWxQcmlvcml0eURpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgYXBwcm92YWxNb2R1bGUgZnJvbSAnYXBwcm92YWwvQXBwcm92YWxNb2R1bGUnO1xyXG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQXBwcm92YWxQcmlvcml0eURpYWxvZ0N0cmwuXHJcbiAqL1xyXG5kZXNjcmliZSgnQXBwcm92YWxQcmlvcml0eURpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgc2NvcGUsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBhcHByb3ZhbFNlcnZpY2UsIGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlO1xyXG5cclxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFwcHJvdmFsIG1vZHVsZS5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFwcHJvdmFsTW9kdWxlKSk7XHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXR1cCB0aGUgbW9ja3MgZm9yIG91ciB0ZXN0cyAtIGEgc2NvcGUgYW5kIHRoZSBjb250cm9sbGVyLlxyXG4gICAgICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBfJHJvb3RTY29wZV8sIF9hcHByb3ZhbFNlcnZpY2VfLCB0ZXN0U2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV8pIHtcclxuXHJcbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgYXBwcm92YWxTZXJ2aWNlID0gX2FwcHJvdmFsU2VydmljZV87XHJcbiAgICAgICAgYXBwcm92YWxUZXN0RGF0YVNlcnZpY2UgPSBfYXBwcm92YWxUZXN0RGF0YVNlcnZpY2VfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxyXG4gICAgICAgIHNjb3BlID0ge307XHJcblxyXG4gICAgICAgIC8vIFNhdmUgdGhlIGFwcHJvdmFsIHNlcnZpY2Ugc28gd2UgY2FuIG92ZXJyaWRlIHRoZSBtZXRob2RzLlxyXG4gICAgICAgIHNweU9uKGFwcHJvdmFsU2VydmljZSwgJ3NldFByaW9yaXR5JykuYW5kLnJldHVyblZhbHVlKHRlc3RTZXJ2aWNlLmNyZWF0ZVJlc3BvbnNlUHJvbWlzZShmYWxzZSkpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIEFwcHJvdmFsUHJpb3JpdHlDdHJsIHdpdGggc29tZSBvcHRpb25hbCBvdmVycmlkZXMuXHJcbiAgICAgKi9cclxuICAgIHZhciBjcmVhdGVDb250cm9sbGVyID0gZnVuY3Rpb24oYXBwcm92YWxPdmVycmlkZXMpIHtcclxuICAgICAgICB2YXIgYXBwcm92YWwgPSBhbmd1bGFyLmNvcHkoYXBwcm92YWxUZXN0RGF0YVNlcnZpY2UuY3JlYXRlQXBwcm92YWwoKSk7XHJcblxyXG4gICAgICAgIC8vIElmIG92ZXJyaWRlcyB3ZXJlIHNwZWNpZmllZCwgYXBwbHkgdGhlbS5cclxuICAgICAgICBpZiAoYXBwcm92YWxPdmVycmlkZXMpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoYXBwcm92YWwsIGFwcHJvdmFsT3ZlcnJpZGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXJXaXRoQXBwcm92YWwoYXBwcm92YWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbiBBcHByb3ZhbERpcmVjdGl2ZUN0cmwgd2l0aCB0aGUgZ2l2ZW4gYXBwcm92YWwgYW5kIHBvc2l0aW9uIGluIHRoZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICB2YXIgY3JlYXRlQ29udHJvbGxlcldpdGhBcHByb3ZhbCA9IGZ1bmN0aW9uKGFwcHJvdmFsKSB7XHJcbiAgICAgICAgc2NvcGUuYXBwcm92YWwgPSBhcHByb3ZhbDtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cclxuICAgICAgICAkY29udHJvbGxlcignQXBwcm92YWxQcmlvcml0eURpYWxvZ0N0cmwnLCB7XHJcbiAgICAgICAgICAgICRzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFwcHJvdmFsU2VydmljZTogYXBwcm92YWxTZXJ2aWNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGl0KCdleHBsb2RlcyB3aXRoIG5vIGFwcHJvdmFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjcmVhdGVDb250cm9sbGVyV2l0aEFwcHJvdmFsKG51bGwpOyB9KS50b1Rocm93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnaW5pdGlhbGl6ZXMgdGhlIHByaW9yaXR5IHRvIHRoYXQgb2YgdGhlIGFwcHJvdmFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgIGV4cGVjdChzY29wZS5tb2RlbC5wcmlvcml0eSkudG9FcXVhbCgnSGlnaCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3NhdmVzIHRoZSBwcmlvcml0eScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzYXZlUHJvbWlzZTtcclxuXHJcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xyXG4gICAgICAgIHNjb3BlLm1vZGVsLnByaW9yaXR5ID0gJ0xvdyc7XHJcbiAgICAgICAgc2F2ZVByb21pc2UgPSBzY29wZS5zYXZlUHJpb3JpdHkoKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLnNldFByaW9yaXR5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5zZXRQcmlvcml0eS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9FcXVhbCgnMTIzNCcpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2Uuc2V0UHJpb3JpdHkuY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMV0pLnRvRXF1YWwoJ0xvdycpO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCBzYXZlUHJpb3JpdHkoKSByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZVxyXG4gICAgICAgIC8vIG5ldyBwcmlvcml0eS5cclxuICAgICAgICBzYXZlUHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKCdMb3cnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
