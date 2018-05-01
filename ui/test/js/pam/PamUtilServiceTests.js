System.register(['test/js/TestInitializer', 'pam/PamModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var pamModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }],
        execute: function () {

            describe('PamUtilService', function () {

                var pamUtilService = undefined,
                    provisioningEnabled = undefined;

                beforeEach(module(pamModule));

                beforeEach(inject(function (_pamUtilService_, configService) {
                    pamUtilService = _pamUtilService_;

                    provisioningEnabled = true;
                    spyOn(configService, 'getConfigValue').and.callFake(function () {
                        return provisioningEnabled;
                    });
                }));

                describe('isProvisioningEnabled()', function () {
                    it('returns true if no configuration is given', function () {
                        provisioningEnabled = null;
                        expect(pamUtilService.isProvisioningEnabled()).toEqual(true);
                    });

                    it('returns true if configuration is set to true', function () {
                        provisioningEnabled = true;
                        expect(pamUtilService.isProvisioningEnabled()).toEqual(true);
                    });

                    it('returns false if configuration is set to false', function () {
                        provisioningEnabled = false;
                        expect(pamUtilService.isProvisioningEnabled()).toEqual(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1VdGlsU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixrQkFBa0IsVUFBVSxTQUFTOzs7SUFHN0U7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjOztRQUU5QixTQUFTLFlBQVk7O1lBTDdCLFNBQVMsa0JBQWtCLFlBQU07O2dCQUU3QixJQUFJLGlCQUFjO29CQUFFLHNCQUFtQjs7Z0JBRXZDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGtCQUFrQixlQUFrQjtvQkFDbkQsaUJBQWlCOztvQkFFakIsc0JBQXNCO29CQUN0QixNQUFNLGVBQWUsa0JBQWtCLElBQUksU0FBUyxZQUFBO3dCQVNwQyxPQVQwQzs7OztnQkFHOUQsU0FBUywyQkFBMkIsWUFBTTtvQkFDdEMsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsc0JBQXNCO3dCQUN0QixPQUFPLGVBQWUseUJBQXlCLFFBQVE7OztvQkFHM0QsR0FBRyxnREFBZ0QsWUFBTTt3QkFDckQsc0JBQXNCO3dCQUN0QixPQUFPLGVBQWUseUJBQXlCLFFBQVE7OztvQkFHM0QsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsc0JBQXNCO3dCQUN0QixPQUFPLGVBQWUseUJBQXlCLFFBQVE7Ozs7OztHQWdCaEUiLCJmaWxlIjoicGFtL1BhbVV0aWxTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ1BhbVV0aWxTZXJ2aWNlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBwYW1VdGlsU2VydmljZSwgcHJvdmlzaW9uaW5nRW5hYmxlZDtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoX3BhbVV0aWxTZXJ2aWNlXywgY29uZmlnU2VydmljZSkgPT4ge1xyXG4gICAgICAgIHBhbVV0aWxTZXJ2aWNlID0gX3BhbVV0aWxTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgcHJvdmlzaW9uaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc3B5T24oY29uZmlnU2VydmljZSwgJ2dldENvbmZpZ1ZhbHVlJykuYW5kLmNhbGxGYWtlKCgpID0+IHByb3Zpc2lvbmluZ0VuYWJsZWQpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpc1Byb3Zpc2lvbmluZ0VuYWJsZWQoKScsICgpID0+IHtcclxuICAgICAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5vIGNvbmZpZ3VyYXRpb24gaXMgZ2l2ZW4nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ0VuYWJsZWQgPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QocGFtVXRpbFNlcnZpY2UuaXNQcm92aXNpb25pbmdFbmFibGVkKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgY29uZmlndXJhdGlvbiBpcyBzZXQgdG8gdHJ1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgcHJvdmlzaW9uaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYW1VdGlsU2VydmljZS5pc1Byb3Zpc2lvbmluZ0VuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgY29uZmlndXJhdGlvbiBpcyBzZXQgdG8gZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByb3Zpc2lvbmluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhbVV0aWxTZXJ2aWNlLmlzUHJvdmlzaW9uaW5nRW5hYmxlZCgpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
