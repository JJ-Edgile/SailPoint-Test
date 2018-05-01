System.register(['test/js/TestInitializer', 'common/model/ModelModule', './ModelTestData'], function (_export) {
    'use strict';

    var modelModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModelModelModule) {
            modelModule = _commonModelModelModule['default'];
        }, function (_ModelTestData) {}],
        execute: function () {

            /**
             * Tests for the ApprovalItem model.
             */
            describe('ApprovalItem', function () {

                var approvalItem, ApprovalItem, approvalData;

                beforeEach(module(modelModule));

                beforeEach(inject(function (_ApprovalItem_, modelTestData) {
                    ApprovalItem = _ApprovalItem_;
                    approvalData = angular.copy(modelTestData.APPROVAL);
                    approvalItem = createApprovalItem(0, null);
                }));

                /**
                 * Create an ApprovalItem with some optional overrides.
                 *
                 * @param {int} idx  The index of the item - 0 for a role request, 1 for an
                 *    entitlement request, and 2 for an account request.
                 * @param {Object} [itemOverrides]  Optional object containing properties
                 *    that will override the given item.
                 *
                 * @return {ApprovalItem} The Approval item.
                 */
                function createApprovalItem(idx, itemOverrides) {
                    var approval = angular.copy(approvalData),
                        item = approval.approvalItems[idx];

                    // If overrides were specified, apply them.
                    if (itemOverrides) {
                        angular.extend(item, itemOverrides);
                    }

                    return new ApprovalItem(item);
                }

                it('returns true for isEntitlementRequest() for an entitlement request', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.isEntitlementRequest()).toEqual(true);
                });

                it('returns false for isEntitlementRequest() for a role request', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.isEntitlementRequest()).toEqual(false);
                });

                it('returns true for isRoleRequest() for a role request', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.isRoleRequest()).toEqual(true);
                });

                it('returns false for isRoleRequest() for an entitlement request', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.isRoleRequest()).toEqual(false);
                });

                it('returns true for isAccountRequest() for an account request', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.isAccountRequest()).toEqual(true);
                });

                it('returns false for isAccountRequest() for an entitlement request', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.isAccountRequest()).toEqual(false);
                });

                it('returns the operation', function () {
                    expect(approvalItem.operation).toEqual('Add');
                });

                it('returns true if it is a new account', function () {
                    expect(approvalItem.newAccount).toEqual(true);
                });

                it('returns false if it is not a new account', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.newAccount).toEqual(false);
                });

                it('returns the attribute', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.attribute).toEqual('groupmbr');
                });

                it('returns the display value', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.displayValue).toEqual('Benefits Display');
                });

                it('returns the description', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.description).toContain('a group of');
                });

                it('returns true if request has a description', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.hasDescription()).toEqual(true);
                });

                it('returns false if request does not has a description', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.hasDescription()).toEqual(false);
                });

                it('returns account display name', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.getAccountDisplayName()).toEqual('hdixon');
                });

                it('returns application', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.application).toEqual('Active_Directory');
                });

                it('returns sunrise', function () {
                    expect(approvalItem.sunrise).toEqual(1391618385380);
                });

                it('returns sunset', function () {
                    expect(approvalItem.sunset).toEqual(1392223185380);
                });

                it('returns true for hasSunrise() if the item has a sunrise', function () {
                    expect(approvalItem.hasSunrise()).toEqual(true);
                });

                it('returns false for hasSunrise() if the item does not have a sunrise', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.hasSunrise()).toEqual(false);
                });

                it('returns true for hasSunset() if the item has a sunset', function () {
                    expect(approvalItem.hasSunset()).toEqual(true);
                });

                it('returns false for hasSunset() if the item does not have a sunset', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.hasSunset()).toEqual(false);
                });

                it('returns hadSunriseSunset', function () {
                    approvalItem = createApprovalItem(3);
                    expect(approvalItem.hadSunriseSunset).toEqual(true);
                });

                it('returns true for isApproved() on an approved item', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.isApproved()).toEqual(true);
                });

                it('returns false for isApproved() on a rejected item', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.isApproved()).toEqual(false);
                });

                it('returns false for isApproved() an item with no decision', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.isApproved()).toEqual(false);
                });

                it('returns true for isRejected() on a rejected item', function () {
                    approvalItem = createApprovalItem(0);
                    expect(approvalItem.isRejected()).toEqual(true);
                });

                it('returns false for isRejected() on an approved item', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.isRejected()).toEqual(false);
                });

                it('returns false for isRejected() an item with no decision', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.isRejected()).toEqual(false);
                });

                it('returns correct value for itemCommentCount', function () {
                    approvalItem = createApprovalItem(2);
                    expect(approvalItem.commentCount).toEqual(2);
                });

                it('returns assignment note for getAssignmentNote if exists', function () {
                    expect(approvalItem.assignmentNote).toEqual('some assignment note');
                });

                it('returns null for getAssignmentNote if does not exist', function () {
                    approvalItem = createApprovalItem(1);
                    expect(approvalItem.assignmentNote).toEqual(null);
                });

                describe('getOwnerName()', function () {
                    it('returns owner name if exists', function () {
                        expect(approvalItem.getOwnerName()).toEqual('Bob Jones');
                    });

                    it('returns null if no owner exists', function () {
                        approvalItem = createApprovalItem(1);
                        expect(approvalItem.getOwnerName()).toEqual(null);
                    });
                });

                describe('hasOwner()', function () {
                    it('returns true if there is an owner', function () {
                        expect(approvalItem.hasOwner()).toEqual(true);
                    });

                    it('returns false if there is no owner', function () {
                        approvalItem = createApprovalItem(1);
                        expect(approvalItem.hasOwner()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RlbC9BcHByb3ZhbEl0ZW1UZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLG9CQUFvQixVQUFVLFNBQVM7SUFDM0c7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxjQUFjLHdCQUF3QjtXQUN2QyxVQUFVLGdCQUFnQjtRQUM3QixTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMsZ0JBQWdCLFlBQVc7O2dCQUVoQyxJQUFJLGNBQWMsY0FBYzs7Z0JBRWhDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGdCQUFnQixlQUFlO29CQUN0RCxlQUFlO29CQUNmLGVBQWUsUUFBUSxLQUFLLGNBQWM7b0JBQzFDLGVBQWUsbUJBQW1CLEdBQUc7Ozs7Ozs7Ozs7Ozs7Z0JBYXpDLFNBQVMsbUJBQW1CLEtBQUssZUFBZTtvQkFDNUMsSUFBSSxXQUFXLFFBQVEsS0FBSzt3QkFDeEIsT0FBTyxTQUFTLGNBQWM7OztvQkFHbEMsSUFBSSxlQUFlO3dCQUNmLFFBQVEsT0FBTyxNQUFNOzs7b0JBR3pCLE9BQU8sSUFBSSxhQUFhOzs7Z0JBRzVCLEdBQUcsc0VBQXNFLFlBQVc7b0JBQ2hGLGVBQWUsbUJBQW1CO29CQUNsQyxPQUFPLGFBQWEsd0JBQXdCLFFBQVE7OztnQkFHeEQsR0FBRywrREFBK0QsWUFBVztvQkFDekUsZUFBZSxtQkFBbUI7b0JBQ2xDLE9BQU8sYUFBYSx3QkFBd0IsUUFBUTs7O2dCQUd4RCxHQUFHLHVEQUF1RCxZQUFXO29CQUNqRSxlQUFlLG1CQUFtQjtvQkFDbEMsT0FBTyxhQUFhLGlCQUFpQixRQUFROzs7Z0JBR2pELEdBQUcsZ0VBQWdFLFlBQVc7b0JBQzFFLGVBQWUsbUJBQW1CO29CQUNsQyxPQUFPLGFBQWEsaUJBQWlCLFFBQVE7OztnQkFHakQsR0FBRyw4REFBOEQsWUFBVztv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Z0JBR2hELEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLGVBQWUsbUJBQW1CO29CQUNsQyxPQUFPLGFBQWEsZ0JBQWdCLFFBQVE7OztnQkFHaEQsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxhQUFhLGdCQUFnQixRQUFROzs7b0JBR2hELEdBQUcsbUNBQW1DLFlBQVc7d0JBQzdDLGVBQWUsbUJBQW1CO3dCQUNsQyxPQUFPLGFBQWEsZ0JBQWdCLFFBQVE7Ozs7Z0JBSXBELFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxPQUFPLGFBQWEsWUFBWSxRQUFROzs7b0JBRzVDLEdBQUcsc0NBQXNDLFlBQVc7d0JBQ2hELGVBQWUsbUJBQW1CO3dCQUNsQyxPQUFPLGFBQWEsWUFBWSxRQUFROzs7Ozs7R0FZakQiLCJmaWxlIjoiY29tbW9uL21vZGVsL0FwcHJvdmFsSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBtb2RlbE1vZHVsZSBmcm9tICdjb21tb24vbW9kZWwvTW9kZWxNb2R1bGUnO1xyXG5pbXBvcnQgJy4vTW9kZWxUZXN0RGF0YSc7XHJcblxyXG4vKipcclxuICogVGVzdHMgZm9yIHRoZSBBcHByb3ZhbEl0ZW0gbW9kZWwuXHJcbiAqL1xyXG5kZXNjcmliZSgnQXBwcm92YWxJdGVtJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGFwcHJvdmFsSXRlbSwgQXBwcm92YWxJdGVtLCBhcHByb3ZhbERhdGE7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kZWxNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfQXBwcm92YWxJdGVtXywgbW9kZWxUZXN0RGF0YSkge1xyXG4gICAgICAgIEFwcHJvdmFsSXRlbSA9IF9BcHByb3ZhbEl0ZW1fO1xyXG4gICAgICAgIGFwcHJvdmFsRGF0YSA9IGFuZ3VsYXIuY29weShtb2RlbFRlc3REYXRhLkFQUFJPVkFMKTtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMCwgbnVsbCk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gQXBwcm92YWxJdGVtIHdpdGggc29tZSBvcHRpb25hbCBvdmVycmlkZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtpbnR9IGlkeCAgVGhlIGluZGV4IG9mIHRoZSBpdGVtIC0gMCBmb3IgYSByb2xlIHJlcXVlc3QsIDEgZm9yIGFuXHJcbiAgICAgKiAgICBlbnRpdGxlbWVudCByZXF1ZXN0LCBhbmQgMiBmb3IgYW4gYWNjb3VudCByZXF1ZXN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtpdGVtT3ZlcnJpZGVzXSAgT3B0aW9uYWwgb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllc1xyXG4gICAgICogICAgdGhhdCB3aWxsIG92ZXJyaWRlIHRoZSBnaXZlbiBpdGVtLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0FwcHJvdmFsSXRlbX0gVGhlIEFwcHJvdmFsIGl0ZW0uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFwcHJvdmFsSXRlbShpZHgsIGl0ZW1PdmVycmlkZXMpIHtcclxuICAgICAgICB2YXIgYXBwcm92YWwgPSBhbmd1bGFyLmNvcHkoYXBwcm92YWxEYXRhKSxcclxuICAgICAgICAgICAgaXRlbSA9IGFwcHJvdmFsLmFwcHJvdmFsSXRlbXNbaWR4XTtcclxuXHJcbiAgICAgICAgLy8gSWYgb3ZlcnJpZGVzIHdlcmUgc3BlY2lmaWVkLCBhcHBseSB0aGVtLlxyXG4gICAgICAgIGlmIChpdGVtT3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGl0ZW0sIGl0ZW1PdmVycmlkZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcHByb3ZhbEl0ZW0oaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaXNFbnRpdGxlbWVudFJlcXVlc3QoKSBmb3IgYW4gZW50aXRsZW1lbnQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgxKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmlzRW50aXRsZW1lbnRSZXF1ZXN0KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaXNFbnRpdGxlbWVudFJlcXVlc3QoKSBmb3IgYSByb2xlIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5pc0VudGl0bGVtZW50UmVxdWVzdCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGlzUm9sZVJlcXVlc3QoKSBmb3IgYSByb2xlIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5pc1JvbGVSZXF1ZXN0KCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaXNSb2xlUmVxdWVzdCgpIGZvciBhbiBlbnRpdGxlbWVudCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaXNSb2xlUmVxdWVzdCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGlzQWNjb3VudFJlcXVlc3QoKSBmb3IgYW4gYWNjb3VudCByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDIpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaXNBY2NvdW50UmVxdWVzdCgpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGlzQWNjb3VudFJlcXVlc3QoKSBmb3IgYW4gZW50aXRsZW1lbnQgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgxKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmlzQWNjb3VudFJlcXVlc3QoKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgb3BlcmF0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5vcGVyYXRpb24pLnRvRXF1YWwoJ0FkZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBpdCBpcyBhIG5ldyBhY2NvdW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5uZXdBY2NvdW50KS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgaXQgaXMgbm90IGEgbmV3IGFjY291bnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMSk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5uZXdBY2NvdW50KS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRoZSBhdHRyaWJ1dGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMSk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5hdHRyaWJ1dGUpLnRvRXF1YWwoJ2dyb3VwbWJyJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgwKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmRpc3BsYXlWYWx1ZSkudG9FcXVhbCgnQmVuZWZpdHMgRGlzcGxheScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdGhlIGRlc2NyaXB0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uZGVzY3JpcHRpb24pLnRvQ29udGFpbignYSBncm91cCBvZicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiByZXF1ZXN0IGhhcyBhIGRlc2NyaXB0aW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaGFzRGVzY3JpcHRpb24oKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHJlcXVlc3QgZG9lcyBub3QgaGFzIGEgZGVzY3JpcHRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5oYXNEZXNjcmlwdGlvbigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFjY291bnQgZGlzcGxheSBuYW1lJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uZ2V0QWNjb3VudERpc3BsYXlOYW1lKCkpLnRvRXF1YWwoJ2hkaXhvbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgYXBwbGljYXRpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMSk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5hcHBsaWNhdGlvbikudG9FcXVhbCgnQWN0aXZlX0RpcmVjdG9yeScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgc3VucmlzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uc3VucmlzZSkudG9FcXVhbCgxMzkxNjE4Mzg1MzgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHN1bnNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uc3Vuc2V0KS50b0VxdWFsKDEzOTIyMjMxODUzODApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaGFzU3VucmlzZSgpIGlmIHRoZSBpdGVtIGhhcyBhIHN1bnJpc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmhhc1N1bnJpc2UoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBoYXNTdW5yaXNlKCkgaWYgdGhlIGl0ZW0gZG9lcyBub3QgaGF2ZSBhIHN1bnJpc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMik7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5oYXNTdW5yaXNlKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaGFzU3Vuc2V0KCkgaWYgdGhlIGl0ZW0gaGFzIGEgc3Vuc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5oYXNTdW5zZXQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBoYXNTdW5zZXQoKSBpZiB0aGUgaXRlbSBkb2VzIG5vdCBoYXZlIGEgc3Vuc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDIpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaGFzU3Vuc2V0KCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgaGFkU3VucmlzZVN1bnNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgzKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmhhZFN1bnJpc2VTdW5zZXQpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBpc0FwcHJvdmVkKCkgb24gYW4gYXBwcm92ZWQgaXRlbScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgxKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmlzQXBwcm92ZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpc0FwcHJvdmVkKCkgb24gYSByZWplY3RlZCBpdGVtJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDApO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaXNBcHByb3ZlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpc0FwcHJvdmVkKCkgYW4gaXRlbSB3aXRoIG5vIGRlY2lzaW9uJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDIpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaXNBcHByb3ZlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGlzUmVqZWN0ZWQoKSBvbiBhIHJlamVjdGVkIGl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMCk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgaXNSZWplY3RlZCgpIG9uIGFuIGFwcHJvdmVkIGl0ZW0nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMSk7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGlzUmVqZWN0ZWQoKSBhbiBpdGVtIHdpdGggbm8gZGVjaXNpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBhcHByb3ZhbEl0ZW0gPSBjcmVhdGVBcHByb3ZhbEl0ZW0oMik7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5pc1JlamVjdGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JldHVybnMgY29ycmVjdCB2YWx1ZSBmb3IgaXRlbUNvbW1lbnRDb3VudCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFwcHJvdmFsSXRlbSA9IGNyZWF0ZUFwcHJvdmFsSXRlbSgyKTtcclxuICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmNvbW1lbnRDb3VudCkudG9FcXVhbCgyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIGFzc2lnbm1lbnQgbm90ZSBmb3IgZ2V0QXNzaWdubWVudE5vdGUgaWYgZXhpc3RzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGFwcHJvdmFsSXRlbS5hc3NpZ25tZW50Tm90ZSkudG9FcXVhbCgnc29tZSBhc3NpZ25tZW50IG5vdGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZXR1cm5zIG51bGwgZm9yIGdldEFzc2lnbm1lbnROb3RlIGlmIGRvZXMgbm90IGV4aXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uYXNzaWdubWVudE5vdGUpLnRvRXF1YWwobnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0T3duZXJOYW1lKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyBvd25lciBuYW1lIGlmIGV4aXN0cycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmdldE93bmVyTmFtZSgpKS50b0VxdWFsKCdCb2IgSm9uZXMnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiBubyBvd25lciBleGlzdHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmdldE93bmVyTmFtZSgpKS50b0VxdWFsKG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hhc093bmVyKCknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGFuIG93bmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhcHByb3ZhbEl0ZW0uaGFzT3duZXIoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgaXMgbm8gb3duZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXBwcm92YWxJdGVtID0gY3JlYXRlQXBwcm92YWxJdGVtKDEpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXBwcm92YWxJdGVtLmhhc093bmVyKCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
