System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityForwardingCtrl', function () {
                var identityService = undefined,
                    spModal = undefined,
                    WorkflowResultItem = undefined,
                    ForwardingInfo = undefined,
                    $controller = undefined,
                    $q = undefined,
                    $scope = undefined,
                    $rootScope = undefined,
                    identityId = 'someId',
                    quickLink = 'viewIdentityQuickLinkName',
                    today = new Date(),
                    nextMonth = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 31),
                    forwardingUser = {
                    id: '1234',
                    name: 'chuck.testa'
                },
                    fakeForwardingInfo = {
                    data: {
                        forwardUser: forwardingUser,
                        startDate: today.getTime(),
                        endDate: nextMonth.getTime()
                    }
                };

                beforeEach(module(identityModule));

                /* jshint maxparams : 7 */
                beforeEach(inject(function (_identityService_, _spModal_, _$controller_, _$q_, _ForwardingInfo_, _$rootScope_, _WorkflowResultItem_) {
                    identityService = _identityService_;
                    spModal = _spModal_;
                    $controller = _$controller_;
                    $q = _$q_;
                    $scope = _$rootScope_.$new();
                    $rootScope = _$rootScope_;
                    WorkflowResultItem = _WorkflowResultItem_;
                    ForwardingInfo = _ForwardingInfo_;
                    spyOn(identityService, 'getForwardInfo').and.returnValue($q.when(new ForwardingInfo(fakeForwardingInfo)));
                }));

                function createController() {
                    var stateParams = {
                        identityId: identityId,
                        quickLink: quickLink
                    };
                    var ctrl = $controller('IdentityForwardingCtrl', {
                        $scope: $scope,
                        $stateParams: stateParams,
                        identityService: identityService
                    });

                    // Mock the form
                    ctrl.identityForwardingCtrlForm = {
                        '$valid': true
                    };

                    return ctrl;
                }

                describe('calcEndMin', function () {
                    it('be today if no start date', function () {
                        var ctrl = createController();
                        // Digest promise
                        $scope.$apply();
                        ctrl.minDate = today;
                        expect(ctrl.calcEndMin()).toEqual(today);
                    });

                    it('be start date if start date is set', function () {
                        var ctrl = createController(),
                            future = new Date(33030362996);
                        // Digest promise
                        $scope.$apply();
                        ctrl.minDate = today;
                        ctrl.forwardingInfo.startDate = future;
                        expect(ctrl.calcEndMin()).toEqual(future);
                    });
                });

                describe('isForwardingInfoValid', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                        $scope.$apply();
                    });

                    it('should be valid if all fields are empty', function () {
                        expect(ctrl.isForwardingInfoValid()).toBeTruthy();
                    });

                    it('should be invalid is a date is set and no forwarding user is set', function () {
                        ctrl.forwardingInfo.endDate = new Date();
                        expect(ctrl.isForwardingInfoValid()).toBeFalsy();
                    });

                    it('should be valid if a forwarding identity and start date is entered', function () {
                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        ctrl.forwardingInfo.startDate = new Date();
                        expect(ctrl.isForwardingInfoValid()).toBeTruthy();
                    });

                    it('should be valid if a forwarding identity and end date is entered', function () {
                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        ctrl.forwardingInfo.endDate = new Date();
                        expect(ctrl.isForwardingInfoValid()).toBeTruthy();
                    });

                    it('should be valid if a forwarding identity both start and end date are entered', function () {
                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        ctrl.forwardingInfo.startDate = new Date();
                        ctrl.forwardingInfo.endDate = new Date();
                        expect(ctrl.isForwardingInfoValid()).toBeTruthy();
                    });
                });

                describe('hasDate', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                        $scope.$apply();
                    });

                    it('should return false if no date is set', function () {
                        expect(ctrl.hasDate()).toBeFalsy();
                    });

                    it('should return false if only identiy is set', function () {
                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        expect(ctrl.hasDate()).toBeFalsy();
                    });

                    it('should return true if start date is set', function () {
                        ctrl.forwardingInfo.startDate = new Date();
                        expect(ctrl.hasDate()).toBeTruthy();
                    });

                    it('should return true if end date is set', function () {
                        ctrl.forwardingInfo.endDate = new Date();
                        expect(ctrl.hasDate()).toBeTruthy();
                    });

                    it('should return true if both start and end dates are set', function () {
                        ctrl.forwardingInfo.startDate = new Date();
                        ctrl.forwardingInfo.endDate = new Date();
                        expect(ctrl.hasDate()).toBeTruthy();
                    });
                });

                describe('areDatesEqual', function () {
                    var ctrl = undefined;

                    beforeEach(function () {
                        ctrl = createController();
                        $scope.$apply();
                    });

                    it('should return true if dates are both falsy', function () {
                        expect(ctrl.areDatesEqual(undefined, null)).toBeTruthy();
                    });

                    it('should return false if one date is falsy', function () {
                        expect(ctrl.areDatesEqual(new Date(), null)).toBeFalsy();
                        expect(ctrl.areDatesEqual(undefined, new Date())).toBeFalsy();
                    });

                    it('should return true if both dates are for the same time', function () {
                        var time = 12368463513;
                        expect(ctrl.areDatesEqual(new Date(time), new Date(time))).toBeTruthy();
                    });
                });

                describe('reset and isDirty', function () {
                    it('be dirty if formInfo changed', function () {
                        var ctrl = createController();
                        // Digest promise
                        $scope.$apply();
                        expect(ctrl.isDirty()).toBeFalsy();
                        expect(ctrl.enableSubmit()).toBeFalsy();

                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        expect(ctrl.isDirty()).toBeTruthy();
                        expect(ctrl.enableSubmit()).toBeTruthy();
                    });

                    it('be clean if reset', function () {
                        var ctrl = createController();
                        // Digest promise
                        $scope.$apply();
                        expect(ctrl.isDirty()).toBeFalsy();
                        expect(ctrl.enableSubmit()).toBeFalsy();

                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        expect(ctrl.isDirty()).toBeTruthy();
                        expect(ctrl.enableSubmit()).toBeTruthy();

                        ctrl.reset();
                        expect(ctrl.isDirty()).toBeFalsy();
                        expect(ctrl.enableSubmit()).toBeFalsy();
                    });

                    it('be clean after submit', function () {
                        var fakeWorkItemResult = new WorkflowResultItem({
                            workflowStatus: 'committed'
                        }),
                            ctrl = createController();
                        spyOn(identityService, 'updateForwardInfo').and.returnValue($q.when(fakeWorkItemResult));
                        // Digest promise
                        $scope.$apply();
                        expect(ctrl.isDirty()).toBeFalsy();
                        expect(ctrl.enableSubmit()).toBeFalsy();

                        ctrl.forwardingInfo.forwardUser = forwardingUser;
                        expect(ctrl.isDirty()).toBeTruthy();
                        expect(ctrl.enableSubmit()).toBeTruthy();

                        ctrl.forwardingInfo = new ForwardingInfo(fakeForwardingInfo.data);
                        ctrl.submit();
                        $rootScope.$digest();
                        expect(ctrl.isDirty()).toBeFalsy();
                        expect(ctrl.enableSubmit()).toBeFalsy();
                    });
                });

                describe('submit', function () {
                    it('should not call through to IdentityService.updateForwardInfo if form is invalid', function () {

                        var ctrl = createController(),
                            result = new WorkflowResultItem({});

                        spyOn(identityService, 'updateForwardInfo').and.returnValue($q.when(result));
                        ctrl.forwardingInfo = new ForwardingInfo(fakeForwardingInfo.data);

                        // Set the form to be invalid
                        ctrl.identityForwardingCtrlForm.$valid = false;
                        ctrl.submit();
                        expect(identityService.updateForwardInfo).not.toHaveBeenCalledWith(quickLink, identityId, ctrl.forwardingInfo);
                    });

                    it('should call through to IdentityService.updateForwardInfo', function () {

                        var ctrl = createController(),
                            result = new WorkflowResultItem({});

                        spyOn(identityService, 'updateForwardInfo').and.returnValue($q.when(result));
                        ctrl.forwardingInfo = new ForwardingInfo(fakeForwardingInfo.data);
                        ctrl.submit();
                        expect(identityService.updateForwardInfo).toHaveBeenCalledWith(quickLink, identityId, ctrl.forwardingInfo);
                    });

                    it('should call the open work item modal function if workflow result has a workitem', function () {
                        var ctrl = createController(),
                            result = new WorkflowResultItem({
                            workflowWorkItemType: 'Form',
                            workflowWorkItemId: 'workitemId'
                        });
                        spyOn(identityService, 'updateForwardInfo').and.returnValue($q.when(result));
                        spyOn(identityService, 'promptWorkItemDialog').and.returnValue($q.when({}));
                        ctrl.forwardingInfo = new ForwardingInfo(fakeForwardingInfo.data);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(identityService.promptWorkItemDialog).toHaveBeenCalled();
                    });

                    it('should call spmodal open on error', function () {
                        spyOn(spModal, 'open');
                        spModal.open.and.returnValue({ result: $q.when() });

                        var ctrl = createController();
                        spyOn(identityService, 'updateForwardInfo').and.returnValue($q.reject(['this is an error']));
                        ctrl.forwardingInfo = new ForwardingInfo(fakeForwardingInfo.data);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5Rm9yd2FyZGluZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUzs7OztJQUl2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywwQkFBMEIsWUFBVztnQkFDMUMsSUFBSSxrQkFBZTtvQkFBRSxVQUFPO29CQUFFLHFCQUFrQjtvQkFBRSxpQkFBYztvQkFDNUQsY0FBVztvQkFBRSxLQUFFO29CQUFFLFNBQU07b0JBQUUsYUFBVTtvQkFDbkMsYUFBYTtvQkFDYixZQUFZO29CQUNaLFFBQVEsSUFBSTtvQkFDWixZQUFZLElBQUksS0FBSyxJQUFJLE9BQU8sWUFBYSxLQUFLLEtBQUssS0FBSyxPQUFPO29CQUNuRSxpQkFBaUI7b0JBQ2IsSUFBSTtvQkFDSixNQUFNOztvQkFFVixxQkFBcUI7b0JBQ2pCLE1BQU07d0JBQ0YsYUFBYTt3QkFDYixXQUFXLE1BQU07d0JBQ2pCLFNBQVMsVUFBVTs7OztnQkFJL0IsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLG1CQUFtQixXQUFXLGVBQWUsTUFBTSxrQkFDbkQsY0FBYyxzQkFBc0I7b0JBQzNELGtCQUFrQjtvQkFDbEIsVUFBVTtvQkFDVixjQUFjO29CQUNkLEtBQUs7b0JBQ0wsU0FBUyxhQUFhO29CQUN0QixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQixNQUFNLGlCQUFpQixrQkFBa0IsSUFBSSxZQUFZLEdBQUcsS0FBSyxJQUFJLGVBQWU7OztnQkFHeEYsU0FBUyxtQkFBbUI7b0JBQ3hCLElBQUksY0FBYzt3QkFDZCxZQUFZO3dCQUNaLFdBQVc7O29CQUVmLElBQUksT0FBTyxZQUFZLDBCQUEw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QUMxRSxLQUFLOzs7b0JBR2IsR0FBRyw0REFBNEQsWUFBVzs7d0JBRXRFLElBQUksT0FBTzs0QkFDUCxTQUFTLElBQUksbUJBQW1COzt3QkFFcEMsTUFBTSxpQkFBaUIscUJBQXFCLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3BFLEtBQUssaUJBQWlCLElBQUksZUFBZSxtQkFBbUI7d0JBQzVELEtBQUs7d0JBQ0wsT0FBTyxnQkFBZ0IsbUJBQW1CLHFCQUFxQixXQUFXLFlBQVksS0FBSzs7O29CQUcvRixHQUFHLG1GQUFtRixZQUFXO3dCQUM3RixJQUFJLE9BQU87NEJBQ1AsU0FBUyxJQUFJLG1CQUFtQjs0QkFDNUIsc0JBQXNCOzRCQUN0QixvQkFBb0I7O3dCQUU1QixNQUFNLGlCQUFpQixxQkFBcUIsSUFBSSxZQUFZLEdBQUcsS0FBSzt3QkFDcEUsTUFBTSxpQkFBaUIsd0JBQXdCLElBQUksWUFBWSxHQUFHLEtBQUs7d0JBQ3ZFLEtBQUssaUJBQWlCLElBQUksZUFBZSxtQkFBbUI7d0JBQzVELEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLGdCQUFnQixzQkFBc0I7OztvQkFHakQsR0FBRyxxQ0FBcUMsWUFBVzt3QkFDL0MsTUFBTSxTQUFTO3dCQUNmLFFBQVEsS0FBSyxJQUFJLFlBQVksRUFBQyxRQUFRLEdBQUc7O3dCQUV6QyxJQUFJLE9BQU87d0JBQ1gsTUFBTSxpQkFBaUIscUJBQXFCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQzt3QkFDdkUsS0FBSyxpQkFBaUIsSUFBSSxlQUFlLG1CQUFtQjt3QkFDNUQsS0FBSzt3QkFDTCxXQUFXO3dCQUNYLE9BQU8sUUFBUSxNQUFNOzs7Ozs7R0FnQjlCIiwiZmlsZSI6ImlkZW50aXR5L0lkZW50aXR5Rm9yd2FyZGluZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ0lkZW50aXR5Rm9yd2FyZGluZ0N0cmwnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgaWRlbnRpdHlTZXJ2aWNlLCBzcE1vZGFsLCBXb3JrZmxvd1Jlc3VsdEl0ZW0sIEZvcndhcmRpbmdJbmZvLFxuICAgICAgICAkY29udHJvbGxlciwgJHEsICRzY29wZSwgJHJvb3RTY29wZSxcbiAgICAgICAgaWRlbnRpdHlJZCA9ICdzb21lSWQnLFxuICAgICAgICBxdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZScsXG4gICAgICAgIHRvZGF5ID0gbmV3IERhdGUoKSxcbiAgICAgICAgbmV4dE1vbnRoID0gbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMjQgKiA2MCAqIDYwICogMTAwMCAqIDMxKSksXG4gICAgICAgIGZvcndhcmRpbmdVc2VyID0ge1xuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcbiAgICAgICAgICAgIG5hbWU6ICdjaHVjay50ZXN0YSdcbiAgICAgICAgfSxcbiAgICAgICAgZmFrZUZvcndhcmRpbmdJbmZvID0ge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZvcndhcmRVc2VyOiBmb3J3YXJkaW5nVXNlcixcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHRvZGF5LmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICBlbmREYXRlOiBuZXh0TW9udGguZ2V0VGltZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtcyA6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfaWRlbnRpdHlTZXJ2aWNlXywgX3NwTW9kYWxfLCBfJGNvbnRyb2xsZXJfLCBfJHFfLCBfRm9yd2FyZGluZ0luZm9fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXywgX1dvcmtmbG93UmVzdWx0SXRlbV8pIHtcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBXb3JrZmxvd1Jlc3VsdEl0ZW0gPSBfV29ya2Zsb3dSZXN1bHRJdGVtXztcbiAgICAgICAgRm9yd2FyZGluZ0luZm8gPSBfRm9yd2FyZGluZ0luZm9fO1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRGb3J3YXJkSW5mbycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKG5ldyBGb3J3YXJkaW5nSW5mbyhmYWtlRm9yd2FyZGluZ0luZm8pKSk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgbGV0IHN0YXRlUGFyYW1zID0ge1xuICAgICAgICAgICAgaWRlbnRpdHlJZDogaWRlbnRpdHlJZCxcbiAgICAgICAgICAgIHF1aWNrTGluazogcXVpY2tMaW5rXG4gICAgICAgIH07XG4gICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0lkZW50aXR5Rm9yd2FyZGluZ0N0cmwnLCB7XG4gICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICAgICRzdGF0ZVBhcmFtczogc3RhdGVQYXJhbXMsXG4gICAgICAgICAgICBpZGVudGl0eVNlcnZpY2U6IGlkZW50aXR5U2VydmljZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNb2NrIHRoZSBmb3JtXG4gICAgICAgIGN0cmwuaWRlbnRpdHlGb3J3YXJkaW5nQ3RybEZvcm0gPSB7XG4gICAgICAgICAgICAnJHZhbGlkJzogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdjYWxjRW5kTWluJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdiZSB0b2RheSBpZiBubyBzdGFydCBkYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIC8vIERpZ2VzdCBwcm9taXNlXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBjdHJsLm1pbkRhdGUgPSB0b2RheTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhbGNFbmRNaW4oKSkudG9FcXVhbCh0b2RheSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdiZSBzdGFydCBkYXRlIGlmIHN0YXJ0IGRhdGUgaXMgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBmdXR1cmUgPSBuZXcgRGF0ZSgzMzAzMDM2Mjk5Nik7XG4gICAgICAgICAgICAvLyBEaWdlc3QgcHJvbWlzZVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgY3RybC5taW5EYXRlID0gdG9kYXk7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLnN0YXJ0RGF0ZSA9IGZ1dHVyZTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmNhbGNFbmRNaW4oKSkudG9FcXVhbChmdXR1cmUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0ZvcndhcmRpbmdJbmZvVmFsaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdmFsaWQgaWYgYWxsIGZpZWxkcyBhcmUgZW1wdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRm9yd2FyZGluZ0luZm9WYWxpZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgaW52YWxpZCBpcyBhIGRhdGUgaXMgc2V0IGFuZCBubyBmb3J3YXJkaW5nIHVzZXIgaXMgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNGb3J3YXJkaW5nSW5mb1ZhbGlkKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIGlmIGEgZm9yd2FyZGluZyBpZGVudGl0eSBhbmQgc3RhcnQgZGF0ZSBpcyBlbnRlcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmZvcndhcmRVc2VyID0gZm9yd2FyZGluZ1VzZXI7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0ZvcndhcmRpbmdJbmZvVmFsaWQoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHZhbGlkIGlmIGEgZm9yd2FyZGluZyBpZGVudGl0eSBhbmQgZW5kIGRhdGUgaXMgZW50ZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mby5mb3J3YXJkVXNlciA9IGZvcndhcmRpbmdVc2VyO1xuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mby5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzRm9yd2FyZGluZ0luZm9WYWxpZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdmFsaWQgaWYgYSBmb3J3YXJkaW5nIGlkZW50aXR5IGJvdGggc3RhcnQgYW5kIGVuZCBkYXRlIGFyZSBlbnRlcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmZvcndhcmRVc2VyID0gZm9yd2FyZGluZ1VzZXI7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNGb3J3YXJkaW5nSW5mb1ZhbGlkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaGFzRGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY3RybDtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgbm8gZGF0ZSBpcyBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0RhdGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG9ubHkgaWRlbnRpeSBpcyBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuZm9yd2FyZGluZ0luZm8uZm9yd2FyZFVzZXIgPSBmb3J3YXJkaW5nVXNlcjtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0RhdGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgc3RhcnQgZGF0ZSBpcyBzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuZm9yd2FyZGluZ0luZm8uc3RhcnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0RhdGUoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGVuZCBkYXRlIGlzIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mby5lbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0RhdGUoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGJvdGggc3RhcnQgYW5kIGVuZCBkYXRlcyBhcmUgc2V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLnN0YXJ0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzRGF0ZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FyZURhdGVzRXF1YWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmw7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZGF0ZXMgYXJlIGJvdGggZmFsc3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFyZURhdGVzRXF1YWwodW5kZWZpbmVkLCBudWxsKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBvbmUgZGF0ZSBpcyBmYWxzeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYXJlRGF0ZXNFcXVhbChuZXcgRGF0ZSgpLCBudWxsKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5hcmVEYXRlc0VxdWFsKHVuZGVmaW5lZCwgbmV3IERhdGUoKSkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGJvdGggZGF0ZXMgYXJlIGZvciB0aGUgc2FtZSB0aW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgdGltZSA9IDEyMzY4NDYzNTEzO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuYXJlRGF0ZXNFcXVhbChuZXcgRGF0ZSh0aW1lKSwgbmV3IERhdGUodGltZSkpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc2V0IGFuZCBpc0RpcnR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdiZSBkaXJ0eSBpZiBmb3JtSW5mbyBjaGFuZ2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIC8vIERpZ2VzdCBwcm9taXNlXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW5hYmxlU3VibWl0KCkpLnRvQmVGYWxzeSgpO1xuXG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmZvcndhcmRVc2VyID0gZm9yd2FyZGluZ1VzZXI7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmVuYWJsZVN1Ym1pdCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdiZSBjbGVhbiBpZiByZXNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICAvLyBEaWdlc3QgcHJvbWlzZVxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmVuYWJsZVN1Ym1pdCgpKS50b0JlRmFsc3koKTtcblxuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mby5mb3J3YXJkVXNlciA9IGZvcndhcmRpbmdVc2VyO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5lbmFibGVTdWJtaXQoKSkudG9CZVRydXRoeSgpO1xuXG4gICAgICAgICAgICBjdHJsLnJlc2V0KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW5hYmxlU3VibWl0KCkpLnRvQmVGYWxzeSgpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdiZSBjbGVhbiBhZnRlciBzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmYWtlV29ya0l0ZW1SZXN1bHQgPSBuZXcgV29ya2Zsb3dSZXN1bHRJdGVtKHtcbiAgICAgICAgICAgICAgICB3b3JrZmxvd1N0YXR1czogJ2NvbW1pdHRlZCdcbiAgICAgICAgICAgIH0pLCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAndXBkYXRlRm9yd2FyZEluZm8nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihmYWtlV29ya0l0ZW1SZXN1bHQpKTtcbiAgICAgICAgICAgIC8vIERpZ2VzdCBwcm9taXNlXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZW5hYmxlU3VibWl0KCkpLnRvQmVGYWxzeSgpO1xuXG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvLmZvcndhcmRVc2VyID0gZm9yd2FyZGluZ1VzZXI7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0RpcnR5KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmVuYWJsZVN1Ym1pdCgpKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgICAgIGN0cmwuZm9yd2FyZGluZ0luZm8gPSBuZXcgRm9yd2FyZGluZ0luZm8oZmFrZUZvcndhcmRpbmdJbmZvLmRhdGEpO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNEaXJ0eSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmVuYWJsZVN1Ym1pdCgpKS50b0JlRmFsc3koKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdWJtaXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5U2VydmljZS51cGRhdGVGb3J3YXJkSW5mbyBpZiBmb3JtIGlzIGludmFsaWQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFdvcmtmbG93UmVzdWx0SXRlbSh7fSk7XG5cbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3VwZGF0ZUZvcndhcmRJbmZvJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4ocmVzdWx0KSk7XG4gICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvID0gbmV3IEZvcndhcmRpbmdJbmZvKGZha2VGb3J3YXJkaW5nSW5mby5kYXRhKTtcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb3JtIHRvIGJlIGludmFsaWRcbiAgICAgICAgICAgIGN0cmwuaWRlbnRpdHlGb3J3YXJkaW5nQ3RybEZvcm0uJHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS51cGRhdGVGb3J3YXJkSW5mbykubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGluaywgaWRlbnRpdHlJZCxcbiAgICAgICAgICAgICAgICBjdHJsLmZvcndhcmRpbmdJbmZvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gSWRlbnRpdHlTZXJ2aWNlLnVwZGF0ZUZvcndhcmRJbmZvJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe30pO1xuXG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICd1cGRhdGVGb3J3YXJkSW5mbycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHJlc3VsdCkpO1xuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mbyA9IG5ldyBGb3J3YXJkaW5nSW5mbyhmYWtlRm9yd2FyZGluZ0luZm8uZGF0YSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS51cGRhdGVGb3J3YXJkSW5mbykudG9IYXZlQmVlbkNhbGxlZFdpdGgocXVpY2tMaW5rLCBpZGVudGl0eUlkLCBjdHJsLmZvcndhcmRpbmdJbmZvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBvcGVuIHdvcmsgaXRlbSBtb2RhbCBmdW5jdGlvbiBpZiB3b3JrZmxvdyByZXN1bHQgaGFzIGEgd29ya2l0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBXb3JrZmxvd1Jlc3VsdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtVHlwZTogJ0Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICB3b3JrZmxvd1dvcmtJdGVtSWQ6ICd3b3JraXRlbUlkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAndXBkYXRlRm9yd2FyZEluZm8nKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihyZXN1bHQpKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3Byb21wdFdvcmtJdGVtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oe30pKTtcbiAgICAgICAgICAgIGN0cmwuZm9yd2FyZGluZ0luZm8gPSBuZXcgRm9yd2FyZGluZ0luZm8oZmFrZUZvcndhcmRpbmdJbmZvLmRhdGEpO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlTZXJ2aWNlLnByb21wdFdvcmtJdGVtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBzcG1vZGFsIG9wZW4gb24gZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJyk7XG4gICAgICAgICAgICBzcE1vZGFsLm9wZW4uYW5kLnJldHVyblZhbHVlKHtyZXN1bHQ6ICRxLndoZW4oKX0pO1xuXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ3VwZGF0ZUZvcndhcmRJbmZvJykuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdChbJ3RoaXMgaXMgYW4gZXJyb3InXSkpO1xuICAgICAgICAgICAgY3RybC5mb3J3YXJkaW5nSW5mbyA9IG5ldyBGb3J3YXJkaW5nSW5mbyhmYWtlRm9yd2FyZGluZ0luZm8uZGF0YSk7XG4gICAgICAgICAgICBjdHJsLnN1Ym1pdCgpO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
