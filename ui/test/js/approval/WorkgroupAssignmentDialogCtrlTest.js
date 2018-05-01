System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var approvalModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('WorkgroupAssignmentDialogCtrl', function () {
                var scope, $controller, $rootScope, $q, approvalService, testService, violationService, Approval, approval, callback, approvalTestDataService;

                // Let the tests know we'll use the approval module.
                beforeEach(module(approvalModule));
                beforeEach(module(testModule));

                /**
                 * Setup the mocks for our tests - a scope and the controller.
                 */
                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _approvalService_, _testService_, _violationService_, _Approval_, _approvalTestDataService_) {

                    // Save the services.
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    approvalService = _approvalService_;
                    testService = _testService_;
                    violationService = _violationService_;
                    Approval = _Approval_;
                    approvalTestDataService = _approvalTestDataService_;

                    // Create a mock scope.
                    scope = {};
                    callback = jasmine.createSpy('callback');
                }));

                /**
                 * Create a WorkgroupAssignmentDialogCtrl with some optional overrides.
                 */
                var createController = function (approvalOverrides) {
                    var approvalData = angular.copy(approvalTestDataService.createApproval());

                    // If overrides were specified, apply them.
                    if (approvalOverrides) {
                        angular.extend(approvalData, approvalOverrides);
                    }

                    createControllerWithApproval(approvalData);
                };

                /**
                 * Create controller with given approval.
                 */
                var createControllerWithApproval = function (approvalData) {
                    approval = approvalData ? new Approval(approvalData) : null;

                    scope.templateStyle = 'full';
                    $controller('ApprovalDirectiveCtrl', {
                        $scope: scope,
                        approvalService: approvalService,
                        violationService: violationService
                    });

                    // Create the controller to test with.
                    $controller('WorkgroupAssignmentDialogCtrl', {
                        $scope: scope,
                        approval: approval,
                        errorCallback: callback
                    });
                };

                it('explodes with no approval', function () {
                    expect(function () {
                        createControllerWithApproval(null);
                    }).toThrow();
                });

                it('initializes assignment model to empty object', function () {
                    createController();
                    expect(scope.assignmentModel).toEqual({});
                });

                it('initializes suggest params with owner id', function () {
                    createController({
                        owner: {
                            id: 'workgroupId',
                            workgroup: true
                        }
                    });

                    expect(scope.suggestParams).toEqual({ workgroup: 'workgroupId' });
                });

                it('gets the approval assignee name as current assignee', function () {
                    createController();
                    expect(scope.getCurrentAssignee()).toEqual(approval.getAssigneeName());
                });

                describe('getAssignment()', function () {
                    it('returns null if no selectedIdentity', function () {
                        createController();
                        expect(scope.getAssignment()).toBeFalsy();
                    });

                    it('returns selectedIdentity if set', function () {
                        createController();
                        scope.assignmentModel.selectedIdentity = {
                            id: 'someIdentity'
                        };
                        expect(scope.getAssignment()).toEqual({
                            id: 'someIdentity'
                        });
                    });
                });

                describe('saveAssignment()', function () {
                    it('returns rejected promise if no assignment selected', function () {
                        var defer = $q.defer();
                        createController();
                        spyOn(scope, 'getAssignment').and.returnValue(null);
                        spyOn(approvalService, 'assign').and.returnValue(defer.promise);
                        var assignmentPromise = scope.saveAssignment(),
                            spy = testService.spyOnFailure(assignmentPromise);
                        defer.resolve();
                        $rootScope.$apply();
                        expect(spy).toHaveBeenCalled();
                        expect(approvalService.assign).not.toHaveBeenCalled();
                        expect(scope.missingAssignment).toEqual(true);
                    });

                    it('calls assign method if assignment is selected', function () {
                        var defer = $q.defer();
                        spyOn(approvalService, 'assign').and.returnValue(defer.promise);
                        createController();
                        scope.assignmentModel.selectedIdentity = {
                            id: 'someIdentity'
                        };
                        var assignmentPromise = scope.saveAssignment(),
                            spy = testService.spyOnSuccess(assignmentPromise);
                        defer.resolve();
                        $rootScope.$apply();
                        expect(spy).toHaveBeenCalled();
                        expect(approvalService.assign).toHaveBeenCalled();
                        expect(approvalService.assign.calls.mostRecent().args[0]).toEqual('1234');
                        expect(approvalService.assign.calls.mostRecent().args[1]).toEqual('someIdentity');
                        expect(scope.missingAssignment).toEqual(false);
                    });
                });

                describe('removeAssignment()', function () {
                    it('calls assign method with null value', function () {
                        var defer = $q.defer();
                        spyOn(approvalService, 'assign').and.returnValue(defer.promise);
                        createController();
                        var assignmentPromise = scope.removeAssignment(),
                            spy = testService.spyOnSuccess(assignmentPromise);
                        defer.resolve();
                        $rootScope.$apply();
                        expect(spy).toHaveBeenCalled();
                        expect(approvalService.assign).toHaveBeenCalled();
                        expect(approvalService.assign.calls.mostRecent().args[0]).toEqual('1234');
                        expect(approvalService.assign.calls.mostRecent().args[1]).toEqual(null);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2dDdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7SUFDN0c7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7V0FDMUMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyxpQ0FBaUMsWUFBVztnQkFDakQsSUFBSSxPQUFPLGFBQWEsWUFBWSxJQUFJLGlCQUFpQixhQUFhLGtCQUNsRSxVQUFVLFVBQVUsVUFBVTs7O2dCQUdsQyxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTzs7Ozs7O2dCQU1sQixXQUFXLE9BQU8sVUFBUyxlQUFlLGNBQWMsTUFBTSxtQkFBbUIsZUFDdEQsb0JBQW9CLFlBQVksMkJBQTJCOzs7b0JBR2xGLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixLQUFLO29CQUNMLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxtQkFBbUI7b0JBQ25CLFdBQVc7b0JBQ1gsMEJBQTBCOzs7b0JBRzFCLFFBQVE7b0JBQ1IsV0FBVyxRQUFRLFVBQVU7Ozs7OztnQkFNakMsSUFBSSxtQkFBbUIsVUFBUyxtQkFBbUI7b0JBQy9DLElBQUksZUFBZSxRQUFRLEtBQUssd0JBQXdCOzs7b0JBR3hELElBQUksbUJBQW1CO3dCQUNuQixRQUFRLE9BQU8sY0FBYzs7O29CQUdqQyw2QkFBNkI7Ozs7OztnQkFNakMsSUFBSSwrQkFBK0IsVUFBUyxjQUFjO29CQUN0RCxXQUFXLGVBQWlCLElBQUksU0FBUyxnQkFBZ0I7O29CQUV6RCxNQUFNLGdCQUFnQjtvQkFDdEIsWUFBWSx5QkFBeUI7d0JBQ2pDLFFBQVE7d0JBQ1IsaUJBQWlCO3dCQUNqQixrQkFBa0I7Ozs7b0JBSXRCLFlBQVksaUNBQWlDO3dCQUN6QyxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsZUFBZTs7OztnQkFJdkIsR0FBRyw2QkFBNkIsWUFBVztvQkFDdkMsT0FBTyxZQUFXO3dCQUFFLDZCQUE2Qjt1QkFBVTs7O2dCQUcvRCxHQUFHLGdEQUFnRCxZQUFXO29CQUMxRDtvQkFDQSxPQUFPLE1BQU0saUJBQWlCLFFBQVE7OztnQkFHMUMsR0FBRyw0Q0FBNEMsWUFBVztvQkFDdEQsaUJBQWlCO3dCQUNiLE9BQU87NEJBQ0gsSUFBSTs0QkFDSixXQUFXOzs7O29CQUluQixPQUFPLE1BQU0sZUFBZSxRQUFRLEVBQUMsV0FBVzs7O2dCQUdwRCxHQUFHLHVEQUF1RCxZQUFXO29CQUNqRTtvQkFDQSxPQUFPLE1BQU0sc0JBQXNCLFFBQVEsU0FBUzs7O2dCQUd4RCxTQUFTLG1CQUFtQixZQUFXO29CQUNuQyxHQUFJLHVDQUF1QyxZQUFXO3dCQUNsRDt3QkFDQSxPQUFPLE1BQU0saUJBQWlCOzs7b0JBR2xDLEdBQUksbUNBQW1DLFlBQVc7d0JBQzlDO3dCQUNBLE1BQU0sZ0JBQWdCLG1CQUFtQjs0QkFDckMsSUFBSTs7d0JBRVIsT0FBTyxNQUFNLGlCQUFpQixRQUFROzRCQUNsQyxJQUFJOzs7OztnQkFLaEIsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsSUFBSSxRQUFRLEdBQUc7d0JBQ2Y7d0JBQ0EsTUFBTSxPQUFPLGlCQUFpQixJQUFJLFlBQVk7d0JBQzlDLE1BQU0saUJBQWlCLFVBQVUsSUFBSSxZQUFZLE1BQU07d0JBQ3ZELElBQUksb0JBQW9CLE1BQU07NEJBQzFCLE1BQU0sWUFBWSxhQUFhO3dCQUNuQyxNQUFNO3dCQUNOLFdBQVc7d0JBQ1gsT0FBTyxLQUFLO3dCQUNaLE9BQU8sZ0JBQWdCLFFBQVEsSUFBSTt3QkFDbkMsT0FBTyxNQUFNLG1CQUFtQixRQUFROzs7b0JBRzVDLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELElBQUksUUFBUSxHQUFHO3dCQUNmLE1BQU0saUJBQWlCLFVBQVUsSUFBSSxZQUFZLE1BQU07d0JBQ3ZEO3dCQUNBLE1BQU0sZ0JBQWdCLG1CQUFtQjs0QkFDckMsSUFBSTs7d0JBRVIsSUFBSSxvQkFBb0IsTUFBTTs0QkFDMUIsTUFBTSxZQUFZLGFBQWE7d0JBQ25DLE1BQU07d0JBQ04sV0FBVzt3QkFDWCxPQUFPLEtBQUs7d0JBQ1osT0FBTyxnQkFBZ0IsUUFBUTt3QkFDL0IsT0FBTyxnQkFBZ0IsT0FBTyxNQUFNLGFBQWEsS0FBSyxJQUFJLFFBQVE7d0JBQ2xFLE9BQU8sZ0JBQWdCLE9BQU8sTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRO3dCQUNsRSxPQUFPLE1BQU0sbUJBQW1CLFFBQVE7Ozs7Z0JBSWhELFNBQVMsc0JBQXNCLFlBQVc7b0JBQ3RDLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELElBQUksUUFBUSxHQUFHO3dCQUNmLE1BQU0saUJBQWlCLFVBQVUsSUFBSSxZQUFZLE1BQU07d0JBQ3ZEO3dCQUNBLElBQUksb0JBQW9CLE1BQU07NEJBQzFCLE1BQU0sWUFBWSxhQUFhO3dCQUNuQyxNQUFNO3dCQUNOLFdBQVc7d0JBQ1gsT0FBTyxLQUFLO3dCQUNaLE9BQU8sZ0JBQWdCLFFBQVE7d0JBQy9CLE9BQU8sZ0JBQWdCLE9BQU8sTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFRO3dCQUNsRSxPQUFPLGdCQUFnQixPQUFPLE1BQU0sYUFBYSxLQUFLLElBQUksUUFBUTs7Ozs7O0dBYzNFIiwiZmlsZSI6ImFwcHJvdmFsL1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2dDdHJsVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFwcHJvdmFsTW9kdWxlIGZyb20gJ2FwcHJvdmFsL0FwcHJvdmFsTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdXb3JrZ3JvdXBBc3NpZ25tZW50RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY29wZSwgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRxLCBhcHByb3ZhbFNlcnZpY2UsIHRlc3RTZXJ2aWNlLCB2aW9sYXRpb25TZXJ2aWNlLFxuICAgICAgICBBcHByb3ZhbCwgYXBwcm92YWwsIGNhbGxiYWNrLCBhcHByb3ZhbFRlc3REYXRhU2VydmljZTtcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFwcHJvdmFsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhcHByb3ZhbE1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBtb2NrcyBmb3Igb3VyIHRlc3RzIC0gYSBzY29wZSBhbmQgdGhlIGNvbnRyb2xsZXIuXG4gICAgICovXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXywgXyRxXywgX2FwcHJvdmFsU2VydmljZV8sIF90ZXN0U2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Zpb2xhdGlvblNlcnZpY2VfLCBfQXBwcm92YWxfLCBfYXBwcm92YWxUZXN0RGF0YVNlcnZpY2VfKSB7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBhcHByb3ZhbFNlcnZpY2UgPSBfYXBwcm92YWxTZXJ2aWNlXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICB2aW9sYXRpb25TZXJ2aWNlID0gX3Zpb2xhdGlvblNlcnZpY2VfO1xuICAgICAgICBBcHByb3ZhbCA9IF9BcHByb3ZhbF87XG4gICAgICAgIGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlID0gX2FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlXztcblxuICAgICAgICAvLyBDcmVhdGUgYSBtb2NrIHNjb3BlLlxuICAgICAgICBzY29wZSA9IHt9O1xuICAgICAgICBjYWxsYmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCdjYWxsYmFjaycpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFdvcmtncm91cEFzc2lnbm1lbnREaWFsb2dDdHJsIHdpdGggc29tZSBvcHRpb25hbCBvdmVycmlkZXMuXG4gICAgICovXG4gICAgdmFyIGNyZWF0ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbihhcHByb3ZhbE92ZXJyaWRlcykge1xuICAgICAgICB2YXIgYXBwcm92YWxEYXRhID0gYW5ndWxhci5jb3B5KGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlLmNyZWF0ZUFwcHJvdmFsKCkpO1xuXG4gICAgICAgIC8vIElmIG92ZXJyaWRlcyB3ZXJlIHNwZWNpZmllZCwgYXBwbHkgdGhlbS5cbiAgICAgICAgaWYgKGFwcHJvdmFsT3ZlcnJpZGVzKSB7XG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChhcHByb3ZhbERhdGEsIGFwcHJvdmFsT3ZlcnJpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXJXaXRoQXBwcm92YWwoYXBwcm92YWxEYXRhKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGNvbnRyb2xsZXIgd2l0aCBnaXZlbiBhcHByb3ZhbC5cbiAgICAgKi9cbiAgICB2YXIgY3JlYXRlQ29udHJvbGxlcldpdGhBcHByb3ZhbCA9IGZ1bmN0aW9uKGFwcHJvdmFsRGF0YSkge1xuICAgICAgICBhcHByb3ZhbCA9IChhcHByb3ZhbERhdGEpID8gbmV3IEFwcHJvdmFsKGFwcHJvdmFsRGF0YSkgOiBudWxsO1xuXG4gICAgICAgIHNjb3BlLnRlbXBsYXRlU3R5bGUgPSAnZnVsbCc7XG4gICAgICAgICRjb250cm9sbGVyKCdBcHByb3ZhbERpcmVjdGl2ZUN0cmwnLCB7XG4gICAgICAgICAgICAkc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlOiBhcHByb3ZhbFNlcnZpY2UsXG4gICAgICAgICAgICB2aW9sYXRpb25TZXJ2aWNlOiB2aW9sYXRpb25TZXJ2aWNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICRjb250cm9sbGVyKCdXb3JrZ3JvdXBBc3NpZ25tZW50RGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICRzY29wZTogc2NvcGUsXG4gICAgICAgICAgICBhcHByb3ZhbDogYXBwcm92YWwsXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaXQoJ2V4cGxvZGVzIHdpdGggbm8gYXBwcm92YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBjcmVhdGVDb250cm9sbGVyV2l0aEFwcHJvdmFsKG51bGwpOyB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5pdGlhbGl6ZXMgYXNzaWdubWVudCBtb2RlbCB0byBlbXB0eSBvYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBleHBlY3Qoc2NvcGUuYXNzaWdubWVudE1vZGVsKS50b0VxdWFsKHt9KTtcbiAgICB9KTtcblxuICAgIGl0KCdpbml0aWFsaXplcyBzdWdnZXN0IHBhcmFtcyB3aXRoIG93bmVyIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoe1xuICAgICAgICAgICAgb3duZXI6IHtcbiAgICAgICAgICAgICAgICBpZDogJ3dvcmtncm91cElkJyxcbiAgICAgICAgICAgICAgICB3b3JrZ3JvdXA6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KHNjb3BlLnN1Z2dlc3RQYXJhbXMpLnRvRXF1YWwoe3dvcmtncm91cDogJ3dvcmtncm91cElkJ30pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldHMgdGhlIGFwcHJvdmFsIGFzc2lnbmVlIG5hbWUgYXMgY3VycmVudCBhc3NpZ25lZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIGV4cGVjdChzY29wZS5nZXRDdXJyZW50QXNzaWduZWUoKSkudG9FcXVhbChhcHByb3ZhbC5nZXRBc3NpZ25lZU5hbWUoKSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0QXNzaWdubWVudCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ICgncmV0dXJucyBudWxsIGlmIG5vIHNlbGVjdGVkSWRlbnRpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5nZXRBc3NpZ25tZW50KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ3JldHVybnMgc2VsZWN0ZWRJZGVudGl0eSBpZiBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNjb3BlLmFzc2lnbm1lbnRNb2RlbC5zZWxlY3RlZElkZW50aXR5ID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnc29tZUlkZW50aXR5J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChzY29wZS5nZXRBc3NpZ25tZW50KCkpLnRvRXF1YWwoe1xuICAgICAgICAgICAgICAgIGlkOiAnc29tZUlkZW50aXR5J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NhdmVBc3NpZ25tZW50KCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgcmVqZWN0ZWQgcHJvbWlzZSBpZiBubyBhc3NpZ25tZW50IHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oc2NvcGUsICdnZXRBc3NpZ25tZW50JykuYW5kLnJldHVyblZhbHVlKG51bGwpO1xuICAgICAgICAgICAgc3B5T24oYXBwcm92YWxTZXJ2aWNlLCAnYXNzaWduJykuYW5kLnJldHVyblZhbHVlKGRlZmVyLnByb21pc2UpO1xuICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRQcm9taXNlID0gc2NvcGUuc2F2ZUFzc2lnbm1lbnQoKSxcbiAgICAgICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUoYXNzaWdubWVudFByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuYXNzaWduKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1pc3NpbmdBc3NpZ25tZW50KS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgYXNzaWduIG1ldGhvZCBpZiBhc3NpZ25tZW50IGlzIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgc3B5T24oYXBwcm92YWxTZXJ2aWNlLCAnYXNzaWduJykuYW5kLnJldHVyblZhbHVlKGRlZmVyLnByb21pc2UpO1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc2NvcGUuYXNzaWdubWVudE1vZGVsLnNlbGVjdGVkSWRlbnRpdHkgPSB7XG4gICAgICAgICAgICAgICAgaWQ6ICdzb21lSWRlbnRpdHknXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRQcm9taXNlID0gc2NvcGUuc2F2ZUFzc2lnbm1lbnQoKSxcbiAgICAgICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MoYXNzaWdubWVudFByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuYXNzaWduKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLmFzc2lnbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9FcXVhbCgnMTIzNCcpO1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5hc3NpZ24uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMV0pLnRvRXF1YWwoJ3NvbWVJZGVudGl0eScpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLm1pc3NpbmdBc3NpZ25tZW50KS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVtb3ZlQXNzaWdubWVudCgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdjYWxscyBhc3NpZ24gbWV0aG9kIHdpdGggbnVsbCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIHNweU9uKGFwcHJvdmFsU2VydmljZSwgJ2Fzc2lnbicpLmFuZC5yZXR1cm5WYWx1ZShkZWZlci5wcm9taXNlKTtcbiAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHZhciBhc3NpZ25tZW50UHJvbWlzZSA9IHNjb3BlLnJlbW92ZUFzc2lnbm1lbnQoKSxcbiAgICAgICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MoYXNzaWdubWVudFByb21pc2UpO1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuYXNzaWduKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxTZXJ2aWNlLmFzc2lnbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXSkudG9FcXVhbCgnMTIzNCcpO1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5hc3NpZ24uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMV0pLnRvRXF1YWwobnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
