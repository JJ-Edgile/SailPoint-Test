System.register(['test/js/TestInitializer', 'common/esig/ElectronicSignatureModule'], function (_export) {
    'use strict';

    var esigModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonEsigElectronicSignatureModule) {
            esigModule = _commonEsigElectronicSignatureModule['default'];
        }],
        execute: function () {

            describe('AuthnInfoService', function () {

                var authId = 'bob',
                    nativeId = 'jbob',
                    authnInfoService;

                beforeEach(module(esigModule));

                describe('no original authn ID', function () {
                    /**
                     * Set the constants to have no original auth id but a native id
                     */
                    beforeEach(module(function ($provide) {
                        $provide.constant('SP_ORIGINAL_AUTH_ID', null);
                        $provide.constant('SP_ORIGINAL_NATIVE_ID', nativeId);
                    }));

                    /**
                     * Inject the service to test.
                     */
                    beforeEach(inject(function (_authnInfoService_) {
                        authnInfoService = _authnInfoService_;
                    }));

                    it('returns null for original auth ID', function () {
                        expect(authnInfoService.getOriginalAuthId()).toEqual(null);
                    });

                    it('returns nativeAuthId for auth ID', function () {
                        expect(authnInfoService.getAuthId()).toEqual(nativeId);
                    });

                    it('sets original auth ID', function () {
                        var newId = 'jim';
                        authnInfoService.setOriginalAuthId(newId);
                        expect(authnInfoService.getOriginalAuthId()).toEqual(newId);
                    });
                });

                describe('with original authn ID', function () {

                    /**
                     * Set the constants to have no original auth id but a native id
                     */
                    beforeEach(module(function ($provide) {
                        $provide.constant('SP_ORIGINAL_AUTH_ID', authId);
                        $provide.constant('SP_ORIGINAL_NATIVE_ID', nativeId);
                    }));

                    /**
                     * Inject the service to test.
                     */
                    beforeEach(inject(function (_authnInfoService_) {
                        authnInfoService = _authnInfoService_;
                    }));

                    it('returns value for original auth ID', function () {
                        expect(authnInfoService.getOriginalAuthId()).toEqual(authId);
                    });

                    it('returns original auth ID for auth ID', function () {
                        expect(authnInfoService.getAuthId()).toEqual(authId);
                    });

                    it('sets original auth ID', function () {
                        var newId = 'jim';
                        authnInfoService.setOriginalAuthId(newId);
                        expect(authnInfoService.getOriginalAuthId()).toEqual(newId);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9lc2lnL0F1dGhuSW5mb1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUztJQUNyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0NBQXNDO1lBQzVGLGFBQWEscUNBQXFDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLFNBQVM7b0JBQ1QsV0FBVztvQkFDWDs7Z0JBRUosV0FBVyxPQUFPOztnQkFFbEIsU0FBUyx3QkFBd0IsWUFBVzs7OztvQkFJeEMsV0FBVyxPQUFPLFVBQVMsVUFBVTt3QkFDakMsU0FBUyxTQUFTLHVCQUF1Qjt3QkFDekMsU0FBUyxTQUFTLHlCQUF5Qjs7Ozs7O29CQU0vQyxXQUFXLE9BQU8sVUFBUyxvQkFBb0I7d0JBQzNDLG1CQUFtQjs7O29CQUd2QixHQUFHLHFDQUFxQyxZQUFXO3dCQUMvQyxPQUFPLGlCQUFpQixxQkFBcUIsUUFBUTs7O29CQUd6RCxHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxPQUFPLGlCQUFpQixhQUFhLFFBQVE7OztvQkFHakQsR0FBRyx5QkFBeUIsWUFBVzt3QkFDbkMsSUFBSSxRQUFRO3dCQUNaLGlCQUFpQixrQkFBa0I7d0JBQ25DLE9BQU8saUJBQWlCLHFCQUFxQixRQUFROzs7O2dCQUk3RCxTQUFTLDBCQUEwQixZQUFXOzs7OztvQkFLMUMsV0FBVyxPQUFPLFVBQVMsVUFBVTt3QkFDakMsU0FBUyxTQUFTLHVCQUF1Qjt3QkFDekMsU0FBUyxTQUFTLHlCQUF5Qjs7Ozs7O29CQU0vQyxXQUFXLE9BQU8sVUFBUyxvQkFBb0I7d0JBQzNDLG1CQUFtQjs7O29CQUd2QixHQUFHLHNDQUFzQyxZQUFXO3dCQUNoRCxPQUFPLGlCQUFpQixxQkFBcUIsUUFBUTs7O29CQUd6RCxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxPQUFPLGlCQUFpQixhQUFhLFFBQVE7OztvQkFHakQsR0FBRyx5QkFBeUIsWUFBVzt3QkFDbkMsSUFBSSxRQUFRO3dCQUNaLGlCQUFpQixrQkFBa0I7d0JBQ25DLE9BQU8saUJBQWlCLHFCQUFxQixRQUFROzs7Ozs7R0FhOUQiLCJmaWxlIjoiY29tbW9uL2VzaWcvQXV0aG5JbmZvU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBlc2lnTW9kdWxlIGZyb20gJ2NvbW1vbi9lc2lnL0VsZWN0cm9uaWNTaWduYXR1cmVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0F1dGhuSW5mb1NlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYXV0aElkID0gJ2JvYicsXHJcbiAgICAgICAgbmF0aXZlSWQgPSAnamJvYicsXHJcbiAgICAgICAgYXV0aG5JbmZvU2VydmljZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShlc2lnTW9kdWxlKSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ25vIG9yaWdpbmFsIGF1dGhuIElEJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0IHRoZSBjb25zdGFudHMgdG8gaGF2ZSBubyBvcmlnaW5hbCBhdXRoIGlkIGJ1dCBhIG5hdGl2ZSBpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9PUklHSU5BTF9BVVRIX0lEJywgbnVsbCk7XHJcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9PUklHSU5BTF9OQVRJVkVfSUQnLCBuYXRpdmVJZCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmplY3QgdGhlIHNlcnZpY2UgdG8gdGVzdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfYXV0aG5JbmZvU2VydmljZV8pIHtcclxuICAgICAgICAgICAgYXV0aG5JbmZvU2VydmljZSA9IF9hdXRobkluZm9TZXJ2aWNlXztcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgZm9yIG9yaWdpbmFsIGF1dGggSUQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGF1dGhuSW5mb1NlcnZpY2UuZ2V0T3JpZ2luYWxBdXRoSWQoKSkudG9FcXVhbChudWxsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgbmF0aXZlQXV0aElkIGZvciBhdXRoIElEJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdXRobkluZm9TZXJ2aWNlLmdldEF1dGhJZCgpKS50b0VxdWFsKG5hdGl2ZUlkKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgb3JpZ2luYWwgYXV0aCBJRCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3SWQgPSAnamltJztcclxuICAgICAgICAgICAgYXV0aG5JbmZvU2VydmljZS5zZXRPcmlnaW5hbEF1dGhJZChuZXdJZCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdXRobkluZm9TZXJ2aWNlLmdldE9yaWdpbmFsQXV0aElkKCkpLnRvRXF1YWwobmV3SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3dpdGggb3JpZ2luYWwgYXV0aG4gSUQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0IHRoZSBjb25zdGFudHMgdG8gaGF2ZSBubyBvcmlnaW5hbCBhdXRoIGlkIGJ1dCBhIG5hdGl2ZSBpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9PUklHSU5BTF9BVVRIX0lEJywgYXV0aElkKTtcclxuICAgICAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX09SSUdJTkFMX05BVElWRV9JRCcsIG5hdGl2ZUlkKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluamVjdCB0aGUgc2VydmljZSB0byB0ZXN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9hdXRobkluZm9TZXJ2aWNlXykge1xyXG4gICAgICAgICAgICBhdXRobkluZm9TZXJ2aWNlID0gX2F1dGhuSW5mb1NlcnZpY2VfO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdmFsdWUgZm9yIG9yaWdpbmFsIGF1dGggSUQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KGF1dGhuSW5mb1NlcnZpY2UuZ2V0T3JpZ2luYWxBdXRoSWQoKSkudG9FcXVhbChhdXRoSWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBvcmlnaW5hbCBhdXRoIElEIGZvciBhdXRoIElEJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdXRobkluZm9TZXJ2aWNlLmdldEF1dGhJZCgpKS50b0VxdWFsKGF1dGhJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIG9yaWdpbmFsIGF1dGggSUQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0lkID0gJ2ppbSc7XHJcbiAgICAgICAgICAgIGF1dGhuSW5mb1NlcnZpY2Uuc2V0T3JpZ2luYWxBdXRoSWQobmV3SWQpO1xyXG4gICAgICAgICAgICBleHBlY3QoYXV0aG5JbmZvU2VydmljZS5nZXRPcmlnaW5hbEF1dGhJZCgpKS50b0VxdWFsKG5ld0lkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
