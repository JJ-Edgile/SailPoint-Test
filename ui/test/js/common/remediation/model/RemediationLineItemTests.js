System.register(['test/js/TestInitializer', 'common/remediation/RemediationModule', '../RemediationTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var remediationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRemediationRemediationModule) {
            remediationModule = _commonRemediationRemediationModule['default'];
        }, function (_RemediationTestData) {}],
        execute: function () {

            describe('RemediationLineItem', function () {

                beforeEach(module(remediationModule));

                var data = undefined,
                    RemediationLineItem = undefined;

                beforeEach(inject(function (_RemediationLineItem_, remediationTestData) {
                    RemediationLineItem = _RemediationLineItem_;
                    data = angular.copy(remediationTestData.REMEDIATION_ADVICE_RESULT.summary.remediationDetails[0]);
                }));

                describe('constructor', function () {
                    it('should initialize with data', function () {
                        var lineItem = new RemediationLineItem(data);
                        expect(lineItem.application).toEqual(data.application);
                        expect(lineItem.applicationId).toEqual(data.applicationId);
                        expect(lineItem.account).toEqual(data.account);
                        expect(lineItem.nativeIdentity).toEqual(data.nativeIdentity);
                        expect(lineItem.attribute).toEqual(data.attribute);
                        expect(lineItem.attributeValue).toEqual(data.attributeValue);
                        expect(lineItem.inputType).toEqual(data.inputType);
                        expect(lineItem.editable).toEqual(data.editable);
                        expect(lineItem.existingRemediation).toEqual(data.existingRemediation);
                        lineItem.allowedOperations.forEach(function (option, idx) {
                            expect(option.value).toEqual(data.selectOptions[idx][0]);
                            expect(option.label).toEqual(data.selectOptions[idx][1]);
                        });
                        expect(lineItem.newOperation).toEqual(data.operation[0]);
                        expect(lineItem.newValue).toEqual(lineItem.attributeValue);
                    });
                });

                describe('isPermission()', function () {
                    it('returns false if not permission', function () {
                        var lineItem = new RemediationLineItem({
                            permissionTarget: undefined,
                            attribute: 'attr1'
                        });
                        expect(lineItem.isPermission()).toEqual(false);
                    });

                    it('returns true if permissionTarget is set', function () {
                        var lineItem = new RemediationLineItem({
                            permissionTarget: 'perm1',
                            attribute: undefined
                        });
                        expect(lineItem.isPermission()).toEqual(true);
                    });
                });

                describe('isAttribute()', function () {
                    it('returns false if not attribute', function () {
                        var lineItem = new RemediationLineItem({
                            permissionTarget: 'perm1',
                            attribute: undefined
                        });
                        expect(lineItem.isAttribute()).toEqual(false);
                    });

                    it('returns true if attribute is set', function () {
                        var lineItem = new RemediationLineItem({
                            permissionTarget: undefined,
                            attribute: 'attr1'
                        });
                        expect(lineItem.isAttribute()).toEqual(true);
                    });
                });

                describe('isFreeText()', function () {
                    it('returns false if input type is not free text', function () {
                        var lineItem = new RemediationLineItem({
                            inputType: 'select'
                        });
                        expect(lineItem.isFreeText()).toEqual(false);
                    });

                    it('returns true if input type is free text', function () {
                        var lineItem = new RemediationLineItem({
                            inputType: 'text'
                        });
                        expect(lineItem.isFreeText()).toEqual(true);
                    });
                });

                describe('isSelect()', function () {
                    it('returns false if input type is not select', function () {
                        var lineItem = new RemediationLineItem({
                            inputType: 'text'
                        });
                        expect(lineItem.isSelect()).toEqual(false);
                    });

                    it('returns true if input type is select', function () {
                        var lineItem = new RemediationLineItem({
                            inputType: 'select'
                        });
                        expect(lineItem.isSelect()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZW1lZGlhdGlvbi9tb2RlbC9SZW1lZGlhdGlvbkxpbmVJdGVtVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHdDQUF3QywyQkFBMkIsVUFBVSxTQUFTOztJQUU5SDs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLHVCQUF1QixZQUFNOztnQkFFbEMsV0FBVyxPQUFPOztnQkFFbEIsSUFBSSxPQUFJO29CQUFFLHNCQUFtQjs7Z0JBRTdCLFdBQVcsT0FBTyxVQUFDLHVCQUF1QixxQkFBd0I7b0JBQzlELHNCQUFzQjtvQkFDdEIsT0FBTyxRQUFRLEtBQUssb0JBQW9CLDBCQUEwQixRQUFRLG1CQUFtQjs7O2dCQUdqRyxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRywrQkFBK0IsWUFBTTt3QkFDcEMsSUFBSSxXQUFXLElBQUksb0JBQW9CO3dCQUN2QyxPQUFPLFNBQVMsYUFBYSxRQUFRLEtBQUs7d0JBQzFDLE9BQU8sU0FBUyxlQUFlLFFBQVEsS0FBSzt3QkFDNUMsT0FBTyxTQUFTLFNBQVMsUUFBUSxLQUFLO3dCQUN0QyxPQUFPLFNBQVMsZ0JBQWdCLFFBQVEsS0FBSzt3QkFDN0MsT0FBTyxTQUFTLFdBQVcsUUFBUSxLQUFLO3dCQUN4QyxPQUFPLFNBQVMsZ0JBQWdCLFFBQVEsS0FBSzt3QkFDN0MsT0FBTyxTQUFTLFdBQVcsUUFBUSxLQUFLO3dCQUN4QyxPQUFPLFNBQVMsVUFBVSxRQUFRLEtBQUs7d0JBQ3ZDLE9BQU8sU0FBUyxxQkFBcUIsUUFBUSxLQUFLO3dCQUNsRCxTQUFTLGtCQUFrQixRQUFRLFVBQUMsUUFBUSxLQUFROzRCQUNoRCxPQUFPLE9BQU8sT0FBTyxRQUFRLEtBQUssY0FBYyxLQUFLOzRCQUNyRCxPQUFPLE9BQU8sT0FBTyxRQUFRLEtBQUssY0FBYyxLQUFLOzt3QkFFekQsT0FBTyxTQUFTLGNBQWMsUUFBUSxLQUFLLFVBQVU7d0JBQ3JELE9BQU8sU0FBUyxVQUFVLFFBQVEsU0FBUzs7OztnQkFJbkQsU0FBUyxrQkFBa0IsWUFBTTtvQkFDN0IsR0FBRyxtQ0FBbUMsWUFBTTt3QkFDeEMsSUFBSSxXQUFXLElBQUksb0JBQW9COzRCQUNuQyxrQkFBa0I7NEJBQ2xCLFdBQVc7O3dCQUVmLE9BQU8sU0FBUyxnQkFBZ0IsUUFBUTs7O29CQUc1QyxHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxJQUFJLFdBQVcsSUFBSSxvQkFBb0I7NEJBQ25DLGtCQUFrQjs0QkFDbEIsV0FBVzs7d0JBRWYsT0FBTyxTQUFTLGdCQUFnQixRQUFROzs7O2dCQUloRCxTQUFTLGlCQUFpQixZQUFNO29CQUM1QixHQUFHLGtDQUFrQyxZQUFNO3dCQUN2QyxJQUFJLFdBQVcsSUFBSSxvQkFBb0I7NEJBQ25DLGtCQUFrQjs0QkFDbEIsV0FBVzs7d0JBRWYsT0FBTyxTQUFTLGVBQWUsUUFBUTs7O29CQUczQyxHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxJQUFJLFdBQVcsSUFBSSxvQkFBb0I7NEJBQ25DLGtCQUFrQjs0QkFDbEIsV0FBVzs7d0JBRWYsT0FBTyxTQUFTLGVBQWUsUUFBUTs7OztnQkFJL0MsU0FBUyxnQkFBZ0IsWUFBTTtvQkFDM0IsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsSUFBSSxXQUFXLElBQUksb0JBQW9COzRCQUNuQyxXQUFXOzt3QkFFZixPQUFPLFNBQVMsY0FBYyxRQUFROzs7b0JBRzFDLEdBQUcsMkNBQTJDLFlBQU07d0JBQ2hELElBQUksV0FBVyxJQUFJLG9CQUFvQjs0QkFDbkMsV0FBVzs7d0JBRWYsT0FBTyxTQUFTLGNBQWMsUUFBUTs7OztnQkFJOUMsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLEdBQUcsNkNBQTZDLFlBQU07d0JBQ2xELElBQUksV0FBVyxJQUFJLG9CQUFvQjs0QkFDbkMsV0FBVzs7d0JBRWYsT0FBTyxTQUFTLFlBQVksUUFBUTs7O29CQUd4QyxHQUFHLHdDQUF3QyxZQUFNO3dCQUM3QyxJQUFJLFdBQVcsSUFBSSxvQkFBb0I7NEJBQ25DLFdBQVc7O3dCQUVmLE9BQU8sU0FBUyxZQUFZLFFBQVE7Ozs7OztHQWE3QyIsImZpbGUiOiJjb21tb24vcmVtZWRpYXRpb24vbW9kZWwvUmVtZWRpYXRpb25MaW5lSXRlbVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZW1lZGlhdGlvbk1vZHVsZSBmcm9tICdjb21tb24vcmVtZWRpYXRpb24vUmVtZWRpYXRpb25Nb2R1bGUnO1xuaW1wb3J0ICcuLi9SZW1lZGlhdGlvblRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1JlbWVkaWF0aW9uTGluZUl0ZW0nLCAoKSA9PiB7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZW1lZGlhdGlvbk1vZHVsZSkpO1xuXG4gICAgbGV0IGRhdGEsIFJlbWVkaWF0aW9uTGluZUl0ZW07XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX1JlbWVkaWF0aW9uTGluZUl0ZW1fLCByZW1lZGlhdGlvblRlc3REYXRhKSA9PiB7XG4gICAgICAgIFJlbWVkaWF0aW9uTGluZUl0ZW0gPSBfUmVtZWRpYXRpb25MaW5lSXRlbV87XG4gICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkocmVtZWRpYXRpb25UZXN0RGF0YS5SRU1FRElBVElPTl9BRFZJQ0VfUkVTVUxULnN1bW1hcnkucmVtZWRpYXRpb25EZXRhaWxzWzBdKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29uc3RydWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGRhdGEnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluZUl0ZW0gPSBuZXcgUmVtZWRpYXRpb25MaW5lSXRlbShkYXRhKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5hcHBsaWNhdGlvbikudG9FcXVhbChkYXRhLmFwcGxpY2F0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5hcHBsaWNhdGlvbklkKS50b0VxdWFsKGRhdGEuYXBwbGljYXRpb25JZCk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uYWNjb3VudCkudG9FcXVhbChkYXRhLmFjY291bnQpO1xuICAgICAgICAgICAgZXhwZWN0KGxpbmVJdGVtLm5hdGl2ZUlkZW50aXR5KS50b0VxdWFsKGRhdGEubmF0aXZlSWRlbnRpdHkpO1xuICAgICAgICAgICAgZXhwZWN0KGxpbmVJdGVtLmF0dHJpYnV0ZSkudG9FcXVhbChkYXRhLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uYXR0cmlidXRlVmFsdWUpLnRvRXF1YWwoZGF0YS5hdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uaW5wdXRUeXBlKS50b0VxdWFsKGRhdGEuaW5wdXRUeXBlKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5lZGl0YWJsZSkudG9FcXVhbChkYXRhLmVkaXRhYmxlKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5leGlzdGluZ1JlbWVkaWF0aW9uKS50b0VxdWFsKGRhdGEuZXhpc3RpbmdSZW1lZGlhdGlvbik7XG4gICAgICAgICAgICBsaW5lSXRlbS5hbGxvd2VkT3BlcmF0aW9ucy5mb3JFYWNoKChvcHRpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb24udmFsdWUpLnRvRXF1YWwoZGF0YS5zZWxlY3RPcHRpb25zW2lkeF1bMF0pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb24ubGFiZWwpLnRvRXF1YWwoZGF0YS5zZWxlY3RPcHRpb25zW2lkeF1bMV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0ubmV3T3BlcmF0aW9uKS50b0VxdWFsKGRhdGEub3BlcmF0aW9uWzBdKTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5uZXdWYWx1ZSkudG9FcXVhbChsaW5lSXRlbS5hdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzUGVybWlzc2lvbigpJywgKCkgPT4ge1xuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBub3QgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lSXRlbSA9IG5ldyBSZW1lZGlhdGlvbkxpbmVJdGVtKHtcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uVGFyZ2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnYXR0cjEnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5pc1Blcm1pc3Npb24oKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgcGVybWlzc2lvblRhcmdldCBpcyBzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluZUl0ZW0gPSBuZXcgUmVtZWRpYXRpb25MaW5lSXRlbSh7XG4gICAgICAgICAgICAgICAgcGVybWlzc2lvblRhcmdldDogJ3Blcm0xJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uaXNQZXJtaXNzaW9uKCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQXR0cmlidXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vdCBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluZUl0ZW0gPSBuZXcgUmVtZWRpYXRpb25MaW5lSXRlbSh7XG4gICAgICAgICAgICAgICAgcGVybWlzc2lvblRhcmdldDogJ3Blcm0xJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uaXNBdHRyaWJ1dGUoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgYXR0cmlidXRlIGlzIHNldCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lSXRlbSA9IG5ldyBSZW1lZGlhdGlvbkxpbmVJdGVtKHtcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uVGFyZ2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnYXR0cjEnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5pc0F0dHJpYnV0ZSgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc0ZyZWVUZXh0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGlucHV0IHR5cGUgaXMgbm90IGZyZWUgdGV4dCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lSXRlbSA9IG5ldyBSZW1lZGlhdGlvbkxpbmVJdGVtKHtcbiAgICAgICAgICAgICAgICBpbnB1dFR5cGU6ICdzZWxlY3QnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5pc0ZyZWVUZXh0KCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIGlucHV0IHR5cGUgaXMgZnJlZSB0ZXh0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpbmVJdGVtID0gbmV3IFJlbWVkaWF0aW9uTGluZUl0ZW0oe1xuICAgICAgICAgICAgICAgIGlucHV0VHlwZTogJ3RleHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChsaW5lSXRlbS5pc0ZyZWVUZXh0KCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzU2VsZWN0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGlucHV0IHR5cGUgaXMgbm90IHNlbGVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lSXRlbSA9IG5ldyBSZW1lZGlhdGlvbkxpbmVJdGVtKHtcbiAgICAgICAgICAgICAgICBpbnB1dFR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uaXNTZWxlY3QoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgaW5wdXQgdHlwZSBpcyBzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluZUl0ZW0gPSBuZXcgUmVtZWRpYXRpb25MaW5lSXRlbSh7XG4gICAgICAgICAgICAgICAgaW5wdXRUeXBlOiAnc2VsZWN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QobGluZUl0ZW0uaXNTZWxlY3QoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
