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

            describe('IdentityProvisioningFormService', function () {
                var identityProvisioningFormDataService = undefined,
                    formData = {
                    formId: 'form001',
                    quickLinkName: 'Edit Identity',
                    getValues: function () {
                        return {
                            manager: 'test manager',
                            location: 'US'
                        };
                    }
                },
                    formConfig = { id: 'form001' },
                    priority = 'Normal';

                beforeEach(module(identityModule));
                beforeEach(inject(function (_identityProvisioningFormDataService_) {
                    identityProvisioningFormDataService = _identityProvisioningFormDataService_;
                }));

                it('should have a null formData', function () {
                    expect(identityProvisioningFormDataService.getFormData()).toBeNull();
                });

                it('should allow set formData', function () {
                    var fmData = undefined;
                    identityProvisioningFormDataService.setFormData(formData);
                    fmData = identityProvisioningFormDataService.getFormData();
                    expect(fmData).toEqual(formData);
                });

                it('should have a null formConfig', function () {
                    expect(identityProvisioningFormDataService.getFormConfig()).toBeNull();
                });

                it('should allow set formConfig', function () {
                    var fmConfig = undefined;
                    identityProvisioningFormDataService.setFormConfig(formConfig);
                    fmConfig = identityProvisioningFormDataService.getFormConfig();
                    expect(fmConfig).toEqual(formConfig);
                });

                it('should have a null priority', function () {
                    expect(identityProvisioningFormDataService.priority).toBeNull();
                });

                it('should allow set priority', function () {
                    var pty = undefined;
                    identityProvisioningFormDataService.setPriority(priority);
                    pty = identityProvisioningFormDataService.getPriority();
                    expect(pty).toEqual(priority);
                });

                it('should reset data when call clear', function () {
                    identityProvisioningFormDataService.setFormData(formData);
                    identityProvisioningFormDataService.setFormConfig(formConfig);
                    identityProvisioningFormDataService.setPriority(priority);
                    identityProvisioningFormDataService.reset();
                    expect(identityProvisioningFormDataService.getFormData()).not.toBe(formData);
                    expect(identityProvisioningFormDataService.getFormConfig()).not.toBe(formConfig);
                    expect(identityProvisioningFormDataService.getPriority()).toBeNull();
                });

                it('should return isDirty to true if formData has changed', function () {
                    var newFormData = undefined;
                    identityProvisioningFormDataService.setFormData(formData);
                    newFormData = identityProvisioningFormDataService.getFormData();
                    spyOn(newFormData, 'getValues').and.returnValue({
                        manager: 'new manager',
                        location: 'US'
                    });
                    expect(identityProvisioningFormDataService.isDirty()).toBeTruthy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7Ozs7SUFJdkY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCOztRQUU3QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsbUNBQW1DLFlBQVc7Z0JBQ25ELElBQUksc0NBQW1DO29CQUNuQyxXQUFXO29CQUNQLFFBQVE7b0JBQ1IsZUFBZTtvQkFDZixXQUFXLFlBQVc7d0JBQ2xCLE9BQU87NEJBQ0gsU0FBUzs0QkFDVCxVQUFVOzs7O29CQUl0QixhQUFhLEVBQUMsSUFBSTtvQkFDbEIsV0FBVzs7Z0JBRWYsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyx1Q0FBdUM7b0JBQzlELHNDQUFzQzs7O2dCQUcxQyxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLG9DQUFvQyxlQUFlOzs7Z0JBRzlELEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLElBQUksU0FBTTtvQkFDVixvQ0FBb0MsWUFBWTtvQkFDaEQsU0FBUyxvQ0FBb0M7b0JBQzdDLE9BQU8sUUFBUSxRQUFROzs7Z0JBRzNCLEdBQUcsaUNBQWlDLFlBQVc7b0JBQzNDLE9BQU8sb0NBQW9DLGlCQUFpQjs7O2dCQUdoRSxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxJQUFJLFdBQVE7b0JBQ1osb0NBQW9DLGNBQWM7b0JBQ2xELFdBQVcsb0NBQW9DO29CQUMvQyxPQUFPLFVBQVUsUUFBUTs7O2dCQUc3QixHQUFHLCtCQUErQixZQUFXO29CQUN6QyxPQUFPLG9DQUFvQyxVQUFVOzs7Z0JBR3pELEdBQUcsNkJBQTZCLFlBQVc7b0JBQ3ZDLElBQUksTUFBRztvQkFDUCxvQ0FBb0MsWUFBWTtvQkFDaEQsTUFBTSxvQ0FBb0M7b0JBQzFDLE9BQU8sS0FBSyxRQUFROzs7Z0JBR3hCLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLG9DQUFvQyxZQUFZO29CQUNoRCxvQ0FBb0MsY0FBYztvQkFDbEQsb0NBQW9DLFlBQVk7b0JBQ2hELG9DQUFvQztvQkFDcEMsT0FBTyxvQ0FBb0MsZUFBZSxJQUFJLEtBQUs7b0JBQ25FLE9BQU8sb0NBQW9DLGlCQUFpQixJQUFJLEtBQUs7b0JBQ3JFLE9BQU8sb0NBQW9DLGVBQWU7OztnQkFHOUQsR0FBRyx5REFBeUQsWUFBVztvQkFDbkUsSUFBSSxjQUFXO29CQUNmLG9DQUFvQyxZQUFZO29CQUNoRCxjQUFjLG9DQUFvQztvQkFDbEQsTUFBTSxhQUFhLGFBQWEsSUFBSSxZQUFZO3dCQUM1QyxTQUFTO3dCQUNULFVBQVU7O29CQUVkLE9BQU8sb0NBQW9DLFdBQVc7Ozs7O0dBWTNEIiwiZmlsZSI6ImlkZW50aXR5L0lkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqL1xyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1TZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UsXHJcbiAgICAgICAgZm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGZvcm1JZDogJ2Zvcm0wMDEnLFxyXG4gICAgICAgICAgICBxdWlja0xpbmtOYW1lOiAnRWRpdCBJZGVudGl0eScsXHJcbiAgICAgICAgICAgIGdldFZhbHVlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hbmFnZXI6ICd0ZXN0IG1hbmFnZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtQ29uZmlnID0ge2lkOiAnZm9ybTAwMSd9LFxyXG4gICAgICAgIHByaW9yaXR5ID0gJ05vcm1hbCc7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZV8pIHtcclxuICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZSA9IF9pZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZV87XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgbnVsbCBmb3JtRGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRGb3JtRGF0YSgpKS50b0JlTnVsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBzZXQgZm9ybURhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZm1EYXRhO1xyXG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLnNldEZvcm1EYXRhKGZvcm1EYXRhKTtcclxuICAgICAgICBmbURhdGEgPSBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRGb3JtRGF0YSgpO1xyXG4gICAgICAgIGV4cGVjdChmbURhdGEpLnRvRXF1YWwoZm9ybURhdGEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgbnVsbCBmb3JtQ29uZmlnJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmdldEZvcm1Db25maWcoKSkudG9CZU51bGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgYWxsb3cgc2V0IGZvcm1Db25maWcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZm1Db25maWc7XHJcbiAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2Uuc2V0Rm9ybUNvbmZpZyhmb3JtQ29uZmlnKTtcclxuICAgICAgICBmbUNvbmZpZyA9IGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmdldEZvcm1Db25maWcoKTtcclxuICAgICAgICBleHBlY3QoZm1Db25maWcpLnRvRXF1YWwoZm9ybUNvbmZpZyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGhhdmUgYSBudWxsIHByaW9yaXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLnByaW9yaXR5KS50b0JlTnVsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBzZXQgcHJpb3JpdHknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgcHR5O1xyXG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLnNldFByaW9yaXR5KHByaW9yaXR5KTtcclxuICAgICAgICBwdHkgPSBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRQcmlvcml0eSgpO1xyXG4gICAgICAgIGV4cGVjdChwdHkpLnRvRXF1YWwocHJpb3JpdHkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCByZXNldCBkYXRhIHdoZW4gY2FsbCBjbGVhcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLnNldEZvcm1EYXRhKGZvcm1EYXRhKTtcclxuICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5zZXRGb3JtQ29uZmlnKGZvcm1Db25maWcpO1xyXG4gICAgICAgIGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLnNldFByaW9yaXR5KHByaW9yaXR5KTtcclxuICAgICAgICBpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5yZXNldCgpO1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eVByb3Zpc2lvbmluZ0Zvcm1EYXRhU2VydmljZS5nZXRGb3JtRGF0YSgpKS5ub3QudG9CZShmb3JtRGF0YSk7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmdldEZvcm1Db25maWcoKSkubm90LnRvQmUoZm9ybUNvbmZpZyk7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmdldFByaW9yaXR5KCkpLnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpc0RpcnR5IHRvIHRydWUgaWYgZm9ybURhdGEgaGFzIGNoYW5nZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgbmV3Rm9ybURhdGE7XHJcbiAgICAgICAgaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2Uuc2V0Rm9ybURhdGEoZm9ybURhdGEpO1xyXG4gICAgICAgIG5ld0Zvcm1EYXRhID0gaWRlbnRpdHlQcm92aXNpb25pbmdGb3JtRGF0YVNlcnZpY2UuZ2V0Rm9ybURhdGEoKTtcclxuICAgICAgICBzcHlPbihuZXdGb3JtRGF0YSwgJ2dldFZhbHVlcycpLmFuZC5yZXR1cm5WYWx1ZSh7XHJcbiAgICAgICAgICAgIG1hbmFnZXI6ICduZXcgbWFuYWdlcicsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiAnVVMnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5UHJvdmlzaW9uaW5nRm9ybURhdGFTZXJ2aWNlLmlzRGlydHkoKSkudG9CZVRydXRoeSgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
