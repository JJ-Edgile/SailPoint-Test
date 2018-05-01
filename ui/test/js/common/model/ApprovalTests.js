System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the Approval model.
             */
            describe('Approval', function () {

                var approvalData, Approval, approval;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_Approval_, modelTestData) {
                    Approval = _Approval_;
                    approvalData = modelTestData.APPROVAL;
                    approval = createApproval(null);
                }));

                function createApproval(overrides) {
                    // If overrides were specified, apply them.
                    if (overrides) {
                        angular.extend(approvalData, overrides);
                    }

                    return new Approval(approvalData);
                }

                it('returns the approval items', function () {
                    var items = approval.approvalItems;
                    expect(items).toBeDefined();
                    expect(items.length).toEqual(4);
                });

                it('returns the remaining count', function () {
                    expect(approval.getRemainingCount()).toEqual(2);
                });

                it('returns the total count', function () {
                    expect(approval.getTotalCount()).toEqual(4);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BcHByb3ZhbFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsb0JBQW9CLFVBQVUsU0FBUztJQUMzRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCO1dBQ3ZDLFVBQVUsZ0JBQWdCO1FBQzdCLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUyxZQUFZLFlBQVc7O2dCQUU1QixJQUFJLGNBQWMsVUFBVTs7Z0JBRTVCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksZUFBZTtvQkFDbEQsV0FBVztvQkFDWCxlQUFlLGNBQWM7b0JBQzdCLFdBQVcsZUFBZTs7O2dCQUc5QixTQUFTLGVBQWUsV0FBVzs7b0JBRS9CLElBQUksV0FBVzt3QkFDWCxRQUFRLE9BQU8sY0FBYzs7O29CQUdqQyxPQUFPLElBQUksU0FBUzs7O2dCQUl4QixHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxJQUFJLFFBQVEsU0FBUztvQkFDckIsT0FBTyxPQUFPO29CQUNkLE9BQU8sTUFBTSxRQUFRLFFBQVE7OztnQkFHakMsR0FBRywrQkFBK0IsWUFBVztvQkFDekMsT0FBTyxTQUFTLHFCQUFxQixRQUFROzs7Z0JBR2pELEdBQUcsMkJBQTJCLFlBQVc7b0JBQ3JDLE9BQU8sU0FBUyxpQkFBaUIsUUFBUTs7Ozs7R0FVOUMiLCJmaWxlIjoiY29tbW9uL21vZGVsL0FwcHJvdmFsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IG1vZGVsTW9kdWxlIGZyb20gJ2NvbW1vbi9tb2RlbC9Nb2RlbE1vZHVsZSc7XHJcbmltcG9ydCAnLi9Nb2RlbFRlc3REYXRhJztcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBmb3IgdGhlIEFwcHJvdmFsIG1vZGVsLlxyXG4gKi9cclxuZGVzY3JpYmUoJ0FwcHJvdmFsJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGFwcHJvdmFsRGF0YSwgQXBwcm92YWwsIGFwcHJvdmFsO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1vZGVsTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0FwcHJvdmFsXywgbW9kZWxUZXN0RGF0YSkge1xyXG4gICAgICAgIEFwcHJvdmFsID0gX0FwcHJvdmFsXztcclxuICAgICAgICBhcHByb3ZhbERhdGEgPSBtb2RlbFRlc3REYXRhLkFQUFJPVkFMO1xyXG4gICAgICAgIGFwcHJvdmFsID0gY3JlYXRlQXBwcm92YWwobnVsbCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQXBwcm92YWwob3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgLy8gSWYgb3ZlcnJpZGVzIHdlcmUgc3BlY2lmaWVkLCBhcHBseSB0aGVtLlxyXG4gICAgICAgIGlmIChvdmVycmlkZXMpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoYXBwcm92YWxEYXRhLCBvdmVycmlkZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcHByb3ZhbChhcHByb3ZhbERhdGEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgYXBwcm92YWwgaXRlbXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBhcHByb3ZhbC5hcHByb3ZhbEl0ZW1zO1xyXG4gICAgICAgIGV4cGVjdChpdGVtcykudG9CZURlZmluZWQoKTtcclxuICAgICAgICBleHBlY3QoaXRlbXMubGVuZ3RoKS50b0VxdWFsKDQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIHJlbWFpbmluZyBjb3VudCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbC5nZXRSZW1haW5pbmdDb3VudCgpKS50b0VxdWFsKDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIHRvdGFsIGNvdW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsLmdldFRvdGFsQ291bnQoKSkudG9FcXVhbCg0KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
