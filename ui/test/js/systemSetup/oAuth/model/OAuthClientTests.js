System.register(['test/js/TestInitializer', 'systemSetup/oAuth/OAuthClientConfigModule'], function (_export) {

    /**
     * Performs basic testing of the model object
     */
    'use strict';

    var oAuthClientConfigModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_systemSetupOAuthOAuthClientConfigModule) {
            oAuthClientConfigModule = _systemSetupOAuthOAuthClientConfigModule['default'];
        }],
        execute: function () {
            describe('OAuthClient', function () {
                var OAuthClient = undefined,
                    anOAuthClient = undefined,
                    badDateClient = undefined;

                beforeEach(module(oAuthClientConfigModule));

                it('requires non-null data in the constructor', function () {
                    expect(function () {
                        new OAuthClient(null);
                    }).toThrow();
                });

                it('throws if the data passed to the constructor is not an object', function () {
                    expect(function () {
                        new OAuthClient('go hokies');
                    }).toThrow();
                    expect(function () {
                        new OAuthClient(function () {
                            return 'acc football';
                        });
                    }).toThrow();
                });

                describe('should construct an instance', function () {
                    beforeEach(inject(function (OAuthClient, oAuthClientTestData) {
                        OAuthClient = OAuthClient;
                        anOAuthClient = new OAuthClient(oAuthClientTestData.CLIENT1);
                        badDateClient = new OAuthClient({ createDate: null });
                    }));

                    it('with null createDate if createDate is null', function () {
                        expect(badDateClient.createDate).toBe(null);
                    });

                    it('with valid types', function () {
                        expect(anOAuthClient.createDate instanceof Date).toBeTruthy();
                        expect(anOAuthClient.name).toBeDefined();
                        expect(anOAuthClient.proxyUser).toBeDefined();
                        expect(anOAuthClient.clientId).toBeDefined();
                        expect(anOAuthClient.secret).toBeDefined();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbVNldHVwL29BdXRoL21vZGVsL09BdXRoQ2xpZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDhDQUE4QyxVQUFVLFNBQVM7Ozs7O0lBS3pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwwQ0FBMEM7WUFDaEcsMEJBQTBCLHlDQUF5Qzs7UUFFdkUsU0FBUyxZQUFZO1lBTjdCLFNBQVMsZUFBZSxZQUFNO2dCQUMxQixJQUFJLGNBQVc7b0JBQUUsZ0JBQWE7b0JBQUUsZ0JBQWE7O2dCQUU3QyxXQUFXLE9BQU87O2dCQUVsQixHQUFHLDZDQUE2QyxZQUFXO29CQUN2RCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZO3VCQUFVOzs7Z0JBR2xELEdBQUcsaUVBQWlFLFlBQVc7b0JBQzNFLE9BQU8sWUFBVzt3QkFBRSxJQUFJLFlBQVk7dUJBQWlCO29CQUNyRCxPQUFPLFlBQVc7d0JBQUUsSUFBSSxZQUFZLFlBQVc7NEJBQUUsT0FBTzs7dUJBQXVCOzs7Z0JBR25GLFNBQVMsZ0NBQWdDLFlBQU07b0JBQzNDLFdBQVcsT0FBTyxVQUFDLGFBQWEscUJBQXdCO3dCQUNwRCxjQUFjO3dCQUNkLGdCQUFnQixJQUFJLFlBQVksb0JBQW9CO3dCQUNwRCxnQkFBZ0IsSUFBSSxZQUFZLEVBQUUsWUFBWTs7O29CQUdsRCxHQUFHLDhDQUE4QyxZQUFNO3dCQUNuRCxPQUFPLGNBQWMsWUFBWSxLQUFLOzs7b0JBRzFDLEdBQUcsb0JBQW9CLFlBQU07d0JBQ3pCLE9BQU8sY0FBYyxzQkFBc0IsTUFBTTt3QkFDakQsT0FBTyxjQUFjLE1BQU07d0JBQzNCLE9BQU8sY0FBYyxXQUFXO3dCQUNoQyxPQUFPLGNBQWMsVUFBVTt3QkFDL0IsT0FBTyxjQUFjLFFBQVE7Ozs7OztHQXVCdEMiLCJmaWxlIjoic3lzdGVtU2V0dXAvb0F1dGgvbW9kZWwvT0F1dGhDbGllbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlIGZyb20gJ3N5c3RlbVNldHVwL29BdXRoL09BdXRoQ2xpZW50Q29uZmlnTW9kdWxlJztcblxuLyoqXG4gKiBQZXJmb3JtcyBiYXNpYyB0ZXN0aW5nIG9mIHRoZSBtb2RlbCBvYmplY3RcbiAqL1xuZGVzY3JpYmUoJ09BdXRoQ2xpZW50JywgKCkgPT4ge1xuICAgIGxldCBPQXV0aENsaWVudCwgYW5PQXV0aENsaWVudCwgYmFkRGF0ZUNsaWVudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG9BdXRoQ2xpZW50Q29uZmlnTW9kdWxlKSk7XG5cbiAgICBpdCgncmVxdWlyZXMgbm9uLW51bGwgZGF0YSBpbiB0aGUgY29uc3RydWN0b3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBuZXcgT0F1dGhDbGllbnQobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCd0aHJvd3MgaWYgdGhlIGRhdGEgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3RvciBpcyBub3QgYW4gb2JqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgbmV3IE9BdXRoQ2xpZW50KCdnbyBob2tpZXMnKTsgfSkudG9UaHJvdygpO1xuICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IG5ldyBPQXV0aENsaWVudChmdW5jdGlvbigpIHsgcmV0dXJuICdhY2MgZm9vdGJhbGwnOyB9KTsgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZCBjb25zdHJ1Y3QgYW4gaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KChPQXV0aENsaWVudCwgb0F1dGhDbGllbnRUZXN0RGF0YSkgPT4ge1xuICAgICAgICAgICAgT0F1dGhDbGllbnQgPSBPQXV0aENsaWVudDtcbiAgICAgICAgICAgIGFuT0F1dGhDbGllbnQgPSBuZXcgT0F1dGhDbGllbnQob0F1dGhDbGllbnRUZXN0RGF0YS5DTElFTlQxKTtcbiAgICAgICAgICAgIGJhZERhdGVDbGllbnQgPSBuZXcgT0F1dGhDbGllbnQoeyBjcmVhdGVEYXRlOiBudWxsIH0pO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3dpdGggbnVsbCBjcmVhdGVEYXRlIGlmIGNyZWF0ZURhdGUgaXMgbnVsbCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChiYWREYXRlQ2xpZW50LmNyZWF0ZURhdGUpLnRvQmUobnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aXRoIHZhbGlkIHR5cGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGFuT0F1dGhDbGllbnQuY3JlYXRlRGF0ZSBpbnN0YW5jZW9mIERhdGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbk9BdXRoQ2xpZW50Lm5hbWUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYW5PQXV0aENsaWVudC5wcm94eVVzZXIpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3QoYW5PQXV0aENsaWVudC5jbGllbnRJZCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbk9BdXRoQ2xpZW50LnNlY3JldCkudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
