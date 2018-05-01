System.register(['test/js/TestInitializer', 'common/identity/role/IdentityRoleModule'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }],
        execute: function () {

            describe('TargetAccount', function () {

                var targetData = {
                    application: 'Target App',
                    instance: 'instance1',
                    nativeIdentity: 'taccount',
                    account: 'Target Account',
                    sourceRole: 'Da Rolez'
                };

                var TargetAccount = undefined;

                beforeEach(module(roleModule));

                beforeEach(inject(function (_TargetAccount_) {
                    TargetAccount = _TargetAccount_;
                }));

                describe('constructor', function () {
                    it('explodes with no data', function () {
                        expect(function () {
                            return new TargetAccount(null);
                        }).toThrow();
                    });

                    it('sets properties correctly', function () {
                        var acct = new TargetAccount(targetData);
                        expect(acct.application).toEqual(targetData.application);
                        expect(acct.instance).toEqual(targetData.instance);
                        expect(acct.nativeIdentity).toEqual(targetData.nativeIdentity);
                        expect(acct.account).toEqual(targetData.account);
                        expect(acct.sourceRole).toEqual(targetData.sourceRole);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1RhcmdldEFjY291bnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNENBQTRDLFVBQVUsU0FBUztJQUN2Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLGFBQWEsc0NBQXNDOztRQUV2RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsaUJBQWlCLFlBQU07O2dCQUU1QixJQUFJLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixVQUFVO29CQUNWLGdCQUFnQjtvQkFDaEIsU0FBUztvQkFDVCxZQUFZOzs7Z0JBR2hCLElBQUksZ0JBQWE7O2dCQUVqQixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxpQkFBb0I7b0JBQ25DLGdCQUFnQjs7O2dCQUlwQixTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx5QkFBeUIsWUFBTTt3QkFDOUIsT0FBTyxZQUFBOzRCQU9TLE9BUEgsSUFBSSxjQUFjOzJCQUFPOzs7b0JBRzFDLEdBQUcsNkJBQTZCLFlBQU07d0JBQ2xDLElBQUksT0FBTyxJQUFJLGNBQWM7d0JBQzdCLE9BQU8sS0FBSyxhQUFhLFFBQVEsV0FBVzt3QkFDNUMsT0FBTyxLQUFLLFVBQVUsUUFBUSxXQUFXO3dCQUN6QyxPQUFPLEtBQUssZ0JBQWdCLFFBQVEsV0FBVzt3QkFDL0MsT0FBTyxLQUFLLFNBQVMsUUFBUSxXQUFXO3dCQUN4QyxPQUFPLEtBQUssWUFBWSxRQUFRLFdBQVc7Ozs7OztHQWNwRCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvcm9sZS9UYXJnZXRBY2NvdW50VGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IHJvbGVNb2R1bGUgZnJvbSAnY29tbW9uL2lkZW50aXR5L3JvbGUvSWRlbnRpdHlSb2xlTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdUYXJnZXRBY2NvdW50JywgKCkgPT4ge1xyXG5cclxuICAgIGxldCB0YXJnZXREYXRhID0ge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uOiAnVGFyZ2V0IEFwcCcsXHJcbiAgICAgICAgaW5zdGFuY2U6ICdpbnN0YW5jZTEnLFxyXG4gICAgICAgIG5hdGl2ZUlkZW50aXR5OiAndGFjY291bnQnLFxyXG4gICAgICAgIGFjY291bnQ6ICdUYXJnZXQgQWNjb3VudCcsXHJcbiAgICAgICAgc291cmNlUm9sZTogJ0RhIFJvbGV6J1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgVGFyZ2V0QWNjb3VudDtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyb2xlTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9UYXJnZXRBY2NvdW50XykgPT4ge1xyXG4gICAgICAgIFRhcmdldEFjY291bnQgPSBfVGFyZ2V0QWNjb3VudF87XHJcbiAgICB9KSk7XHJcblxyXG5cclxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcclxuICAgICAgICBpdCgnZXhwbG9kZXMgd2l0aCBubyBkYXRhJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbmV3IFRhcmdldEFjY291bnQobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgcHJvcGVydGllcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY2N0ID0gbmV3IFRhcmdldEFjY291bnQodGFyZ2V0RGF0YSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2N0LmFwcGxpY2F0aW9uKS50b0VxdWFsKHRhcmdldERhdGEuYXBwbGljYXRpb24pO1xyXG4gICAgICAgICAgICBleHBlY3QoYWNjdC5pbnN0YW5jZSkudG9FcXVhbCh0YXJnZXREYXRhLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY3QubmF0aXZlSWRlbnRpdHkpLnRvRXF1YWwodGFyZ2V0RGF0YS5uYXRpdmVJZGVudGl0eSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhY2N0LmFjY291bnQpLnRvRXF1YWwodGFyZ2V0RGF0YS5hY2NvdW50KTtcclxuICAgICAgICAgICAgZXhwZWN0KGFjY3Quc291cmNlUm9sZSkudG9FcXVhbCh0YXJnZXREYXRhLnNvdXJjZVJvbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
