System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/approval/ApprovalTestDataService'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var approvalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_approvalApprovalModule) {
            approvalModule = _approvalApprovalModule['default'];
        }, function (_testJsApprovalApprovalTestDataService) {}],
        execute: function () {

            describe('WorkgroupAssignmentService', function () {

                var spModal = undefined,
                    $q = undefined,
                    $rootScope = undefined,
                    Approval = undefined,
                    workgroupAssignmentService = undefined,
                    completionCallback = undefined,
                    approvalTestDataService = undefined;

                beforeEach(module(approvalModule));

                beforeEach(inject(function (_spModal_, _$q_, _$rootScope_, _workgroupAssignmentService_, _Approval_, _approvalTestDataService_) {
                    spModal = _spModal_;
                    $q = _$q_;
                    $rootScope = _$rootScope_;
                    workgroupAssignmentService = _workgroupAssignmentService_;
                    Approval = _Approval_;
                    approvalTestDataService = _approvalTestDataService_;

                    completionCallback = jasmine.createSpy('completionCallback');

                    spyOn(spModal, 'open').and.returnValue({
                        result: $q.defer().promise
                    });
                }));

                describe('show workgroup assignment dialog', function () {

                    function createApproval(isWorkgroup) {
                        var approval = angular.copy(approvalTestDataService.createApproval());

                        var overrides = {};
                        if (isWorkgroup) {
                            overrides = {
                                owner: {
                                    displayName: 'Some Workgroup',
                                    workgroup: true
                                },
                                assignee: null
                            };
                        }

                        angular.extend(approval, overrides);

                        return new Approval(approval);
                    }

                    it('opens the modal', function () {
                        var approval = createApproval(true);
                        workgroupAssignmentService.showWorkgroupAssignmentDialog(approval, completionCallback);
                        expect(spModal.open).toHaveBeenCalled();
                        expect(spModal.open.calls.mostRecent().args[0].controller).toEqual('WorkgroupAssignmentDialogCtrl');
                    });

                    it('sets the assignee upon completion', function () {
                        var assignee = {
                            name: 'Harry.Dixon',
                            displayName: 'Harry Dixon'
                        };

                        // Make the modal return a result that resolves to an identity Harry.Dixon'.  This
                        // simulates the assignApproval() function.
                        spModal.open.and.returnValue({
                            result: $q.when(assignee)
                        });

                        var approval = createApproval(true);
                        workgroupAssignmentService.showWorkgroupAssignmentDialog(approval, completionCallback);

                        // Run a digest cycle to resolve the promise.
                        $rootScope.$apply();

                        // Check that the approval has the new assignee.
                        expect(approval.assignee).toEqual(assignee);
                    });

                    it('throws trying to open dialog if owner is not a workgroup', function () {
                        var approval = createApproval(false);
                        expect(function () {
                            return workgroupAssignmentService.showWorkgroupAssignmentDialog(approval, completionCallback);
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL1dvcmtncm91cEFzc2lnbm1lbnRTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQiw2Q0FBNkMsVUFBVSxTQUFTOzs7SUFHbkk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsd0NBQXdDO1FBQ3JELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyw4QkFBOEIsWUFBTTs7Z0JBRXpDLElBQUksVUFBTztvQkFBRSxLQUFFO29CQUFFLGFBQVU7b0JBQUUsV0FBUTtvQkFBRSw2QkFBMEI7b0JBQUUscUJBQWtCO29CQUFFLDBCQUF1Qjs7Z0JBRTlHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFdBQVcsTUFBTSxjQUFjLDhCQUE4QixZQUM3RCwyQkFBOEI7b0JBQzdDLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxhQUFhO29CQUNiLDZCQUE2QjtvQkFDN0IsV0FBVztvQkFDWCwwQkFBMEI7O29CQUUxQixxQkFBcUIsUUFBUSxVQUFVOztvQkFFdkMsTUFBTSxTQUFTLFFBQVEsSUFBSSxZQUFZO3dCQUNuQyxRQUFRLEdBQUcsUUFBUTs7OztnQkFJM0IsU0FBUyxvQ0FBb0MsWUFBTTs7b0JBRS9DLFNBQVMsZUFBZSxhQUFhO3dCQUNqQyxJQUFJLFdBQVcsUUFBUSxLQUFLLHdCQUF3Qjs7d0JBRXBELElBQUksWUFBWTt3QkFDaEIsSUFBSSxhQUFhOzRCQUNiLFlBQVk7Z0NBQ1IsT0FBTztvQ0FDSCxhQUFhO29DQUNiLFdBQVc7O2dDQUVmLFVBQVU7Ozs7d0JBSWxCLFFBQVEsT0FBTyxVQUFVOzt3QkFFekIsT0FBTyxJQUFJLFNBQVM7OztvQkFHeEIsR0FBRyxtQkFBbUIsWUFBTTt3QkFDeEIsSUFBSSxXQUFXLGVBQWU7d0JBQzlCLDJCQUEyQiw4QkFBOEIsVUFBVTt3QkFDbkUsT0FBTyxRQUFRLE1BQU07d0JBQ3JCLE9BQU8sUUFBUSxLQUFLLE1BQU0sYUFBYSxLQUFLLEdBQUcsWUFBWSxRQUFROzs7b0JBR3ZFLEdBQUcscUNBQXFDLFlBQU07d0JBQzFDLElBQUksV0FBVzs0QkFDWCxNQUFNOzRCQUNOLGFBQWE7Ozs7O3dCQUtqQixRQUFRLEtBQUssSUFBSSxZQUFZOzRCQUN6QixRQUFRLEdBQUcsS0FBSzs7O3dCQUdwQixJQUFJLFdBQVcsZUFBZTt3QkFDOUIsMkJBQTJCLDhCQUE4QixVQUFVOzs7d0JBR25FLFdBQVc7Ozt3QkFHWCxPQUFPLFNBQVMsVUFBVSxRQUFROzs7b0JBR3RDLEdBQUcsNERBQTRELFlBQU07d0JBQ2pFLElBQUksV0FBVyxlQUFlO3dCQUM5QixPQUFPLFlBQUE7NEJBWVMsT0FaSCwyQkFBMkIsOEJBQThCLFVBQVU7MkJBQzVFOzs7Ozs7R0FrQmIiLCJmaWxlIjoiYXBwcm92YWwvV29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBhcHByb3ZhbE1vZHVsZSBmcm9tICdhcHByb3ZhbC9BcHByb3ZhbE1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9hcHByb3ZhbC9BcHByb3ZhbFRlc3REYXRhU2VydmljZSc7XHJcblxyXG5kZXNjcmliZSgnV29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2UnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IHNwTW9kYWwsICRxLCAkcm9vdFNjb3BlLCBBcHByb3ZhbCwgd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2UsIGNvbXBsZXRpb25DYWxsYmFjaywgYXBwcm92YWxUZXN0RGF0YVNlcnZpY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYXBwcm92YWxNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX3NwTW9kYWxfLCBfJHFfLCBfJHJvb3RTY29wZV8sIF93b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZV8sIF9BcHByb3ZhbF8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX2FwcHJvdmFsVGVzdERhdGFTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2UgPSBfd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2VfO1xyXG4gICAgICAgIEFwcHJvdmFsID0gX0FwcHJvdmFsXztcclxuICAgICAgICBhcHByb3ZhbFRlc3REYXRhU2VydmljZSA9IF9hcHByb3ZhbFRlc3REYXRhU2VydmljZV87XHJcblxyXG4gICAgICAgIGNvbXBsZXRpb25DYWxsYmFjayA9IGphc21pbmUuY3JlYXRlU3B5KCdjb21wbGV0aW9uQ2FsbGJhY2snKTtcclxuXHJcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICByZXN1bHQ6ICRxLmRlZmVyKCkucHJvbWlzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93IHdvcmtncm91cCBhc3NpZ25tZW50IGRpYWxvZycsICgpID0+IHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQXBwcm92YWwoaXNXb3JrZ3JvdXApIHtcclxuICAgICAgICAgICAgbGV0IGFwcHJvdmFsID0gYW5ndWxhci5jb3B5KGFwcHJvdmFsVGVzdERhdGFTZXJ2aWNlLmNyZWF0ZUFwcHJvdmFsKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG92ZXJyaWRlcyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoaXNXb3JrZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIG92ZXJyaWRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBvd25lcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWUgV29ya2dyb3VwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2dyb3VwOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoYXBwcm92YWwsIG92ZXJyaWRlcyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFwcHJvdmFsKGFwcHJvdmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdvcGVucyB0aGUgbW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbCA9IGNyZWF0ZUFwcHJvdmFsKHRydWUpO1xyXG4gICAgICAgICAgICB3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZS5zaG93V29ya2dyb3VwQXNzaWdubWVudERpYWxvZyhhcHByb3ZhbCwgY29tcGxldGlvbkNhbGxiYWNrKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmNvbnRyb2xsZXIpLnRvRXF1YWwoJ1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2dDdHJsJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSBhc3NpZ25lZSB1cG9uIGNvbXBsZXRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhc3NpZ25lZSA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdIYXJyeS5EaXhvbicsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hhcnJ5IERpeG9uJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgbW9kYWwgcmV0dXJuIGEgcmVzdWx0IHRoYXQgcmVzb2x2ZXMgdG8gYW4gaWRlbnRpdHkgSGFycnkuRGl4b24nLiAgVGhpc1xyXG4gICAgICAgICAgICAvLyBzaW11bGF0ZXMgdGhlIGFzc2lnbkFwcHJvdmFsKCkgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgIHNwTW9kYWwub3Blbi5hbmQucmV0dXJuVmFsdWUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0OiAkcS53aGVuKGFzc2lnbmVlKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcHByb3ZhbCA9IGNyZWF0ZUFwcHJvdmFsKHRydWUpO1xyXG4gICAgICAgICAgICB3b3JrZ3JvdXBBc3NpZ25tZW50U2VydmljZS5zaG93V29ya2dyb3VwQXNzaWdubWVudERpYWxvZyhhcHByb3ZhbCwgY29tcGxldGlvbkNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgYXBwcm92YWwgaGFzIHRoZSBuZXcgYXNzaWduZWUuXHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbC5hc3NpZ25lZSkudG9FcXVhbChhc3NpZ25lZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3MgdHJ5aW5nIHRvIG9wZW4gZGlhbG9nIGlmIG93bmVyIGlzIG5vdCBhIHdvcmtncm91cCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFwcHJvdmFsID0gY3JlYXRlQXBwcm92YWwoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gd29ya2dyb3VwQXNzaWdubWVudFNlcnZpY2Uuc2hvd1dvcmtncm91cEFzc2lnbm1lbnREaWFsb2coYXBwcm92YWwsIGNvbXBsZXRpb25DYWxsYmFjaykpLlxyXG4gICAgICAgICAgICAgICAgdG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
