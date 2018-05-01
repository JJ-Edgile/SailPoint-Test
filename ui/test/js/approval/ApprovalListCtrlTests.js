System.register(['test/js/TestInitializer', 'approval/ApprovalModule', 'test/js/TestModule'], function (_export) {

    /**
     * Tests for ApprovalListCtrl
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
            describe('ApprovalListCtrl', function () {

                var ctrl, approvalService, ApprovalResult;

                beforeEach(module(testModule, approvalModule));

                beforeEach(inject(function (testService, $controller, $rootScope, _ApprovalResult_) {
                    ApprovalResult = _ApprovalResult_;

                    approvalService = {
                        getApprovals: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 2,
                                objects: [{
                                    id: '1234'
                                }, {
                                    id: '5678'
                                }]
                            }
                        })
                    };

                    ctrl = $controller('ApprovalListCtrl', {
                        approvalService: approvalService
                    });

                    $rootScope.$apply();
                }));

                describe('doSearch', function () {
                    it('should call ApprovalService.getApprovals', function () {
                        ctrl.doSearch();
                        expect(approvalService.getApprovals).toHaveBeenCalled();
                    });
                });

                describe('getColumnConfigKey', function () {
                    it('should return null', function () {
                        expect(ctrl.getColumnConfigKey()).toEqual(null);
                    });
                });

                describe('notifyCompleted', function () {
                    var $timeout, $rootScope;

                    function createApprovalResult(approvalId, isDialog) {
                        var result = new ApprovalResult({}, approvalId);
                        result.isDialog = isDialog;
                        return result;
                    }

                    beforeEach(inject(function (_$timeout_, _$rootScope_) {
                        $timeout = _$timeout_;
                        $rootScope = _$rootScope_;
                    }));

                    it('sets the completed flag', function () {
                        expect(ctrl.items[0].completed).not.toEqual(true);
                        expect(ctrl.items[1].completed).not.toEqual(true);
                        ctrl.notifyCompleted(createApprovalResult('1234', false));
                        expect(ctrl.items[0].completed).toEqual(true);
                        expect(ctrl.items[1].completed).not.toEqual(true);
                    });

                    it('uses extra timeout for dialog', function () {
                        approvalService.getApprovals.calls.reset();
                        ctrl.notifyCompleted(createApprovalResult('1234', true));
                        // First timeout, still waiting on second timeout added for isDialog
                        $timeout.flush();
                        expect(approvalService.getApprovals).not.toHaveBeenCalled();
                        // Second timeout, should be done.
                        $timeout.flush();
                        expect(approvalService.getApprovals).toHaveBeenCalled();
                    });

                    it('does not use extra timoeut for non-dialog', function () {
                        approvalService.getApprovals.calls.reset();
                        ctrl.notifyCompleted(createApprovalResult('1234', false));
                        // First timeout, still waiting on second timeout added for isDialog
                        $timeout.flush();
                        expect(approvalService.getApprovals).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcHJvdmFsL0FwcHJvdmFsTGlzdEN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBSzdHOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFQN0IsU0FBUyxvQkFBb0IsWUFBVzs7Z0JBRXBDLElBQUksTUFBTSxpQkFBaUI7O2dCQUUzQixXQUFXLE9BQU8sWUFBWTs7Z0JBRTlCLFdBQVcsT0FBTyxVQUFTLGFBQWEsYUFBYSxZQUFZLGtCQUFrQjtvQkFDL0UsaUJBQWlCOztvQkFFakIsa0JBQWtCO3dCQUNkLGNBQWMsWUFBWSxpQkFBaUIsT0FBTzs0QkFDOUMsUUFBUTs0QkFDUixNQUFNO2dDQUNGLE9BQU87Z0NBQ1AsU0FBUyxDQUFDO29DQUNOLElBQUk7bUNBQ047b0NBQ0UsSUFBSTs7Ozs7O29CQU1wQixPQUFPLFlBQVksb0JBQW9CO3dCQUNuQyxpQkFBaUI7OztvQkFHckIsV0FBVzs7O2dCQUdmLFNBQVMsWUFBWSxZQUFXO29CQUM1QixHQUFHLDRDQUE0QyxZQUFXO3dCQUN0RCxLQUFLO3dCQUNMLE9BQU8sZ0JBQWdCLGNBQWM7Ozs7Z0JBSTdDLFNBQVMsc0JBQXNCLFlBQVc7b0JBQ3RDLEdBQUcsc0JBQXNCLFlBQVc7d0JBQ2hDLE9BQU8sS0FBSyxzQkFBc0IsUUFBUTs7OztnQkFJbEQsU0FBUyxtQkFBbUIsWUFBVztvQkFDbkMsSUFBSSxVQUFVOztvQkFFZCxTQUFTLHFCQUFxQixZQUFZLFVBQVU7d0JBQ2hELElBQUksU0FBUyxJQUFJLGVBQWUsSUFBSTt3QkFDcEMsT0FBTyxXQUFXO3dCQUNsQixPQUFPOzs7b0JBR1gsV0FBVyxPQUFPLFVBQVMsWUFBWSxjQUFjO3dCQUNqRCxXQUFXO3dCQUNYLGFBQWE7OztvQkFHakIsR0FBRywyQkFBMkIsWUFBVzt3QkFDckMsT0FBTyxLQUFLLE1BQU0sR0FBRyxXQUFXLElBQUksUUFBUTt3QkFDNUMsT0FBTyxLQUFLLE1BQU0sR0FBRyxXQUFXLElBQUksUUFBUTt3QkFDNUMsS0FBSyxnQkFBZ0IscUJBQXFCLFFBQVE7d0JBQ2xELE9BQU8sS0FBSyxNQUFNLEdBQUcsV0FBVyxRQUFRO3dCQUN4QyxPQUFPLEtBQUssTUFBTSxHQUFHLFdBQVcsSUFBSSxRQUFROzs7b0JBR2hELEdBQUcsaUNBQWlDLFlBQVc7d0JBQzNDLGdCQUFnQixhQUFhLE1BQU07d0JBQ25DLEtBQUssZ0JBQWdCLHFCQUFxQixRQUFROzt3QkFFbEQsU0FBUzt3QkFDVCxPQUFPLGdCQUFnQixjQUFjLElBQUk7O3dCQUV6QyxTQUFTO3dCQUNULE9BQU8sZ0JBQWdCLGNBQWM7OztvQkFHekMsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsZ0JBQWdCLGFBQWEsTUFBTTt3QkFDbkMsS0FBSyxnQkFBZ0IscUJBQXFCLFFBQVE7O3dCQUVsRCxTQUFTO3dCQUNULE9BQU8sZ0JBQWdCLGNBQWM7Ozs7OztHQWM5QyIsImZpbGUiOiJhcHByb3ZhbC9BcHByb3ZhbExpc3RDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhcHByb3ZhbE1vZHVsZSBmcm9tICdhcHByb3ZhbC9BcHByb3ZhbE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciBBcHByb3ZhbExpc3RDdHJsXG4gKi9cbmRlc2NyaWJlKCdBcHByb3ZhbExpc3RDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY3RybCwgYXBwcm92YWxTZXJ2aWNlLCBBcHByb3ZhbFJlc3VsdDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGFwcHJvdmFsTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbih0ZXN0U2VydmljZSwgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsIF9BcHByb3ZhbFJlc3VsdF8pIHtcbiAgICAgICAgQXBwcm92YWxSZXN1bHQgPSBfQXBwcm92YWxSZXN1bHRfO1xuXG4gICAgICAgIGFwcHJvdmFsU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldEFwcHJvdmFsczogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEyMzQnXG4gICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICc1Njc4J1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBcHByb3ZhbExpc3RDdHJsJywge1xuICAgICAgICAgICAgYXBwcm92YWxTZXJ2aWNlOiBhcHByb3ZhbFNlcnZpY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZG9TZWFyY2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIEFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuZG9TZWFyY2goKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldENvbHVtbkNvbmZpZ0tleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5nZXRDb2x1bW5Db25maWdLZXkoKSkudG9FcXVhbChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbm90aWZ5Q29tcGxldGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGltZW91dCwgJHJvb3RTY29wZTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVBcHByb3ZhbFJlc3VsdChhcHByb3ZhbElkLCBpc0RpYWxvZykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcHByb3ZhbFJlc3VsdCh7fSwgYXBwcm92YWxJZCk7XG4gICAgICAgICAgICByZXN1bHQuaXNEaWFsb2cgPSBpc0RpYWxvZztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHRpbWVvdXRfLCBfJHJvb3RTY29wZV8pIHtcbiAgICAgICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2V0cyB0aGUgY29tcGxldGVkIGZsYWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLml0ZW1zWzBdLmNvbXBsZXRlZCkubm90LnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pdGVtc1sxXS5jb21wbGV0ZWQpLm5vdC50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgY3RybC5ub3RpZnlDb21wbGV0ZWQoY3JlYXRlQXBwcm92YWxSZXN1bHQoJzEyMzQnLCBmYWxzZSkpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXNbMF0uY29tcGxldGVkKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXRlbXNbMV0uY29tcGxldGVkKS5ub3QudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3VzZXMgZXh0cmEgdGltZW91dCBmb3IgZGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxzLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBjdHJsLm5vdGlmeUNvbXBsZXRlZChjcmVhdGVBcHByb3ZhbFJlc3VsdCgnMTIzNCcsIHRydWUpKTtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRpbWVvdXQsIHN0aWxsIHdhaXRpbmcgb24gc2Vjb25kIHRpbWVvdXQgYWRkZWQgZm9yIGlzRGlhbG9nXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICAvLyBTZWNvbmQgdGltZW91dCwgc2hvdWxkIGJlIGRvbmUuXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFwcHJvdmFsU2VydmljZS5nZXRBcHByb3ZhbHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IHVzZSBleHRyYSB0aW1vZXV0IGZvciBub24tZGlhbG9nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxzLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgICAgICBjdHJsLm5vdGlmeUNvbXBsZXRlZChjcmVhdGVBcHByb3ZhbFJlc3VsdCgnMTIzNCcsIGZhbHNlKSk7XG4gICAgICAgICAgICAvLyBGaXJzdCB0aW1lb3V0LCBzdGlsbCB3YWl0aW5nIG9uIHNlY29uZCB0aW1lb3V0IGFkZGVkIGZvciBpc0RpYWxvZ1xuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbFNlcnZpY2UuZ2V0QXBwcm92YWxzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
