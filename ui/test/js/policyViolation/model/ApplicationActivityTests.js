System.register(['test/js/TestInitializer', 'policyViolation/PolicyViolationModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var policyViolationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_policyViolationPolicyViolationModule) {
            policyViolationModule = _policyViolationPolicyViolationModule['default'];
        }],
        execute: function () {

            describe('ApplicationActivity', function () {

                var ApplicationActivity = undefined,
                    testActivityData = undefined,
                    testApplicationActivity = undefined;

                beforeEach(module(policyViolationModule));

                beforeEach(inject(function (_ApplicationActivity_) {
                    ApplicationActivity = _ApplicationActivity_;
                    testActivityData = {
                        id: '1234',
                        user: '100',
                        action: 'Login',
                        target: 'Target Name',
                        timeStamp: '1208536200000',
                        sourceApplication: 'app'
                    };
                    testApplicationActivity = new ApplicationActivity(testActivityData);
                }));

                describe('init', function () {

                    it('should throw if no data is provided', function () {
                        expect(function () {
                            new ApplicationActivity();
                        }).toThrow();
                    });

                    it('should initialize with activity data', function () {
                        expect(testApplicationActivity.user).toEqual(testActivityData.user);
                        expect(testApplicationActivity.action).toEqual(testActivityData.action);
                        expect(testApplicationActivity.target).toEqual(testActivityData.target);
                        expect(testApplicationActivity.timeStamp).toEqual(testActivityData.timeStamp);
                        expect(testApplicationActivity.sourceApplication).toEqual(testActivityData.sourceApplication);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbGljeVZpb2xhdGlvbi9tb2RlbC9BcHBsaWNhdGlvbkFjdGl2aXR5VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7Ozs7O0lBS3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLHVCQUF1QixZQUFXOztnQkFFdkMsSUFBSSxzQkFBbUI7b0JBQUUsbUJBQWdCO29CQUFFLDBCQUF1Qjs7Z0JBRWxFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLHVCQUF1QjtvQkFDOUMsc0JBQXNCO29CQUN0QixtQkFBbUI7d0JBQ2YsSUFBSTt3QkFDSixNQUFNO3dCQUNOLFFBQVE7d0JBQ1IsUUFBUTt3QkFDUixXQUFXO3dCQUNYLG1CQUFtQjs7b0JBRXZCLDBCQUEwQixJQUFJLG9CQUFvQjs7O2dCQUd0RCxTQUFTLFFBQVEsWUFBVzs7b0JBRXhCLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELE9BQU8sWUFBTTs0QkFBRSxJQUFJOzJCQUEwQjs7O29CQUdqRCxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxPQUFPLHdCQUF3QixNQUFNLFFBQVEsaUJBQWlCO3dCQUM5RCxPQUFPLHdCQUF3QixRQUFRLFFBQVEsaUJBQWlCO3dCQUNoRSxPQUFPLHdCQUF3QixRQUFRLFFBQVEsaUJBQWlCO3dCQUNoRSxPQUFPLHdCQUF3QixXQUFXLFFBQVEsaUJBQWlCO3dCQUNuRSxPQUFPLHdCQUF3QixtQkFBbUIsUUFBUSxpQkFBaUI7Ozs7OztHQWlCcEYiLCJmaWxlIjoicG9saWN5VmlvbGF0aW9uL21vZGVsL0FwcGxpY2F0aW9uQWN0aXZpdHlUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHBvbGljeVZpb2xhdGlvbk1vZHVsZSBmcm9tICdwb2xpY3lWaW9sYXRpb24vUG9saWN5VmlvbGF0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdBcHBsaWNhdGlvbkFjdGl2aXR5JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IEFwcGxpY2F0aW9uQWN0aXZpdHksIHRlc3RBY3Rpdml0eURhdGEsIHRlc3RBcHBsaWNhdGlvbkFjdGl2aXR5O1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBvbGljeVZpb2xhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BcHBsaWNhdGlvbkFjdGl2aXR5Xykge1xyXG4gICAgICAgIEFwcGxpY2F0aW9uQWN0aXZpdHkgPSBfQXBwbGljYXRpb25BY3Rpdml0eV87XHJcbiAgICAgICAgdGVzdEFjdGl2aXR5RGF0YSA9IHtcclxuICAgICAgICAgICAgaWQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgdXNlcjogJzEwMCcsXHJcbiAgICAgICAgICAgIGFjdGlvbjogJ0xvZ2luJyxcclxuICAgICAgICAgICAgdGFyZ2V0OiAnVGFyZ2V0IE5hbWUnLFxyXG4gICAgICAgICAgICB0aW1lU3RhbXA6ICcxMjA4NTM2MjAwMDAwJyxcclxuICAgICAgICAgICAgc291cmNlQXBwbGljYXRpb246ICdhcHAnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0ZXN0QXBwbGljYXRpb25BY3Rpdml0eSA9IG5ldyBBcHBsaWNhdGlvbkFjdGl2aXR5KHRlc3RBY3Rpdml0eURhdGEpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgdGhyb3cgaWYgbm8gZGF0YSBpcyBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4geyBuZXcgQXBwbGljYXRpb25BY3Rpdml0eSgpOyB9KS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSB3aXRoIGFjdGl2aXR5IGRhdGEnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3RBcHBsaWNhdGlvbkFjdGl2aXR5LnVzZXIpLnRvRXF1YWwodGVzdEFjdGl2aXR5RGF0YS51c2VyKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3RBcHBsaWNhdGlvbkFjdGl2aXR5LmFjdGlvbikudG9FcXVhbCh0ZXN0QWN0aXZpdHlEYXRhLmFjdGlvbik7XHJcbiAgICAgICAgICAgIGV4cGVjdCh0ZXN0QXBwbGljYXRpb25BY3Rpdml0eS50YXJnZXQpLnRvRXF1YWwodGVzdEFjdGl2aXR5RGF0YS50YXJnZXQpO1xyXG4gICAgICAgICAgICBleHBlY3QodGVzdEFwcGxpY2F0aW9uQWN0aXZpdHkudGltZVN0YW1wKS50b0VxdWFsKHRlc3RBY3Rpdml0eURhdGEudGltZVN0YW1wKTtcclxuICAgICAgICAgICAgZXhwZWN0KHRlc3RBcHBsaWNhdGlvbkFjdGl2aXR5LnNvdXJjZUFwcGxpY2F0aW9uKS50b0VxdWFsKHRlc3RBY3Rpdml0eURhdGEuc291cmNlQXBwbGljYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
