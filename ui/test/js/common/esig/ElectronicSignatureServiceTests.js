System.register(['test/js/TestInitializer', 'common/esig/ElectronicSignatureModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var esigModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonEsigElectronicSignatureModule) {
            esigModule = _commonEsigElectronicSignatureModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('electronicSignatureService', function () {

                var $httpBackend = undefined,
                    electronicSignatureService = undefined,
                    testService = undefined,
                    baseURL = '/identityiq/ui/rest/electronicSignature';

                beforeEach(module(esigModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_$httpBackend_, _testService_, _electronicSignatureService_) {
                    $httpBackend = _$httpBackend_;
                    testService = _testService_;
                    electronicSignatureService = _electronicSignatureService_;
                }));

                describe('checkSignature()', function () {
                    var username = 'brubble',
                        password = 'xyzzy',
                        userPasswordData = {
                        signatureAccountId: username,
                        signaturePassword: password
                    },
                        passwordData = {
                        signaturePassword: password
                    },
                        url = baseURL + '/check';

                    it('checks signatures with username and password', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(url, userPasswordData).respond(200, '');
                        promise = electronicSignatureService.checkSignature(password, username);
                        spy = testService.spyOnSuccess(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('checks signatures with only password', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(url, passwordData).respond(200, '');
                        promise = electronicSignatureService.checkSignature(password);
                        spy = testService.spyOnSuccess(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('fails on REST error', function () {
                        var promise, spy;
                        $httpBackend.expectPOST(url, passwordData).respond(500, '');
                        promise = electronicSignatureService.checkSignature(password);
                        spy = testService.spyOnFailure(promise);
                        $httpBackend.flush();
                        expect(spy).toHaveBeenCalled();
                    });

                    it('pukes with no password', function () {
                        expect(function () {
                            electronicSignatureService.checkSignature(null, username);
                        }).toThrow();
                        $httpBackend.verifyNoOutstandingRequest();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lc2lnL0VsZWN0cm9uaWNTaWduYXR1cmVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlDQUF5Qyx1QkFBdUIsVUFBVSxTQUFTO0lBQS9IOztJQUdJLElBQUksWUFBWTtJQUNoQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxzQ0FBc0M7WUFDNUYsYUFBYSxxQ0FBcUM7V0FDbkQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw4QkFBOEIsWUFBVzs7Z0JBRTlDLElBQUksZUFBWTtvQkFBRSw2QkFBMEI7b0JBQUUsY0FBVztvQkFDckQsVUFBVTs7Z0JBRWQsV0FBVyxPQUFPLFlBQVk7O2dCQUU5QixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLGdCQUFnQixlQUFlLDhCQUE4QjtvQkFDcEYsZUFBZTtvQkFDZixjQUFjO29CQUNkLDZCQUE2Qjs7O2dCQUdqQyxTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxJQUFJLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ2Ysb0JBQW9CO3dCQUNwQixtQkFBbUI7O3dCQUV2QixlQUFlO3dCQUNYLG1CQUFtQjs7d0JBRXZCLE1BQVMsVUFBTzs7b0JBRXBCLEdBQUcsZ0RBQWdELFlBQVc7d0JBQzFELElBQUksU0FBUzt3QkFDYixhQUFhLFdBQVcsS0FBSyxrQkFBa0IsUUFBUSxLQUFLO3dCQUM1RCxVQUFVLDJCQUEyQixlQUFlLFVBQVU7d0JBQzlELE1BQU0sWUFBWSxhQUFhO3dCQUMvQixhQUFhO3dCQUNiLE9BQU8sS0FBSzs7O29CQUdoQixHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxJQUFJLFNBQVM7d0JBQ2IsYUFBYSxXQUFXLEtBQUssY0FBYyxRQUFRLEtBQUs7d0JBQ3hELFVBQVUsMkJBQTJCLGVBQWU7d0JBQ3BELE1BQU0sWUFBWSxhQUFhO3dCQUMvQixhQUFhO3dCQUNiLE9BQU8sS0FBSzs7O29CQUdoQixHQUFHLHVCQUF1QixZQUFXO3dCQUNqQyxJQUFJLFNBQVM7d0JBQ2IsYUFBYSxXQUFXLEtBQUssY0FBYyxRQUFRLEtBQUs7d0JBQ3hELFVBQVUsMkJBQTJCLGVBQWU7d0JBQ3BELE1BQU0sWUFBWSxhQUFhO3dCQUMvQixhQUFhO3dCQUNiLE9BQU8sS0FBSzs7O29CQUdoQixHQUFHLDBCQUEwQixZQUFXO3dCQUNwQyxPQUFPLFlBQVc7NEJBQUUsMkJBQTJCLGVBQWUsTUFBTTsyQkFBYzt3QkFDbEYsYUFBYTs7Ozs7O0dBZXRCIiwiZmlsZSI6ImNvbW1vbi9lc2lnL0VsZWN0cm9uaWNTaWduYXR1cmVTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGVzaWdNb2R1bGUgZnJvbSAnY29tbW9uL2VzaWcvRWxlY3Ryb25pY1NpZ25hdHVyZU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5cbmRlc2NyaWJlKCdlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRodHRwQmFja2VuZCwgZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2UsIHRlc3RTZXJ2aWNlLFxuICAgICAgICBiYXNlVVJMID0gJy9pZGVudGl0eWlxL3VpL3Jlc3QvZWxlY3Ryb25pY1NpZ25hdHVyZSc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShlc2lnTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRodHRwQmFja2VuZF8sIF90ZXN0U2VydmljZV8sIF9lbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZV8pIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2UgPSBfZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjaGVja1NpZ25hdHVyZSgpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1c2VybmFtZSA9ICdicnViYmxlJyxcbiAgICAgICAgICAgIHBhc3N3b3JkID0gJ3h5enp5JyxcbiAgICAgICAgICAgIHVzZXJQYXNzd29yZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlQWNjb3VudElkOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBzaWduYXR1cmVQYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXNzd29yZERhdGEgPSB7XG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlUGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXJsID0gYCR7YmFzZVVSTH0vY2hlY2tgO1xuXG4gICAgICAgIGl0KCdjaGVja3Mgc2lnbmF0dXJlcyB3aXRoIHVzZXJuYW1lIGFuZCBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UsIHNweTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKHVybCwgdXNlclBhc3N3b3JkRGF0YSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZS5jaGVja1NpZ25hdHVyZShwYXNzd29yZCwgdXNlcm5hbWUpO1xuICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25TdWNjZXNzKHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjaGVja3Mgc2lnbmF0dXJlcyB3aXRoIG9ubHkgcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVCh1cmwsIHBhc3N3b3JkRGF0YSkucmVzcG9uZCgyMDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZS5jaGVja1NpZ25hdHVyZShwYXNzd29yZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPblN1Y2Nlc3MocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZhaWxzIG9uIFJFU1QgZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlLCBzcHk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UE9TVCh1cmwsIHBhc3N3b3JkRGF0YSkucmVzcG9uZCg1MDAsICcnKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBlbGVjdHJvbmljU2lnbmF0dXJlU2VydmljZS5jaGVja1NpZ25hdHVyZShwYXNzd29yZCk7XG4gICAgICAgICAgICBzcHkgPSB0ZXN0U2VydmljZS5zcHlPbkZhaWx1cmUocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgICAgIGV4cGVjdChzcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1a2VzIHdpdGggbm8gcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgZWxlY3Ryb25pY1NpZ25hdHVyZVNlcnZpY2UuY2hlY2tTaWduYXR1cmUobnVsbCwgdXNlcm5hbWUpOyB9KS50b1Rocm93KCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
