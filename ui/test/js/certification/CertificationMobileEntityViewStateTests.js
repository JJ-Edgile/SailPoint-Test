System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationMobileEntityViewState', function () {
                var CertificationMobileEntityViewState = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_CertificationMobileEntityViewState_) {
                    CertificationMobileEntityViewState = _CertificationMobileEntityViewState_;
                }));

                describe('constructor', function () {
                    it('sets activeConfig to remaining by default', function () {
                        var viewState = new CertificationMobileEntityViewState();
                        expect(viewState.activeConfig).toEqual(viewState.remainingEntityListConfig);
                    });
                });

                describe('reset()', function () {
                    it('sets activeConfig to complete if all entities are complete', function () {
                        var cert = {
                            incompleteEntities: 0
                        },
                            viewState = new CertificationMobileEntityViewState();
                        viewState.reset(cert);
                        expect(viewState.activeConfig).toEqual(viewState.completeEntityListConfig);
                    });

                    it('does not change activeConfig if all entities are not complete', function () {
                        var cert = {
                            incompleteEntities: 7
                        },
                            viewState = new CertificationMobileEntityViewState();
                        viewState.reset(cert);
                        expect(viewState.activeConfig).toEqual(viewState.remainingEntityListConfig);
                    });
                });

                describe('getActiveListState()', function () {
                    it('returns remaining list state if active tab is remaining', function () {
                        var viewState = new CertificationMobileEntityViewState();
                        expect(viewState.getActiveListState()).toEqual(viewState.remainingEntityListState);
                    });

                    it('returns complete list state if active tab is complete', function () {
                        var viewState = new CertificationMobileEntityViewState();
                        viewState.activeConfig = viewState.completeEntityListConfig;
                        expect(viewState.getActiveListState()).toEqual(viewState.completeEntityListState);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vYmlsZUVudGl0eVZpZXdTdGF0ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7SUFHakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsc0NBQXNDLFlBQU07Z0JBQ2pELElBQUkscUNBQWtDOztnQkFFdEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsc0NBQXlDO29CQUN4RCxxQ0FBcUM7OztnQkFHekMsU0FBUyxlQUFlLFlBQU07b0JBQzFCLEdBQUcsNkNBQTZDLFlBQU07d0JBQ2xELElBQUksWUFBWSxJQUFJO3dCQUNwQixPQUFPLFVBQVUsY0FBYyxRQUFRLFVBQVU7Ozs7Z0JBSXpELFNBQVMsV0FBVyxZQUFNO29CQUN0QixHQUFHLDhEQUE4RCxZQUFNO3dCQUNuRSxJQUFJLE9BQU87NEJBQ1Asb0JBQW9COzs0QkFDckIsWUFBWSxJQUFJO3dCQUNuQixVQUFVLE1BQU07d0JBQ2hCLE9BQU8sVUFBVSxjQUFjLFFBQVEsVUFBVTs7O29CQUdyRCxHQUFHLGlFQUFpRSxZQUFNO3dCQUN0RSxJQUFJLE9BQU87NEJBQ1Asb0JBQW9COzs0QkFDckIsWUFBWSxJQUFJO3dCQUNuQixVQUFVLE1BQU07d0JBQ2hCLE9BQU8sVUFBVSxjQUFjLFFBQVEsVUFBVTs7OztnQkFJekQsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRywyREFBMkQsWUFBTTt3QkFDaEUsSUFBSSxZQUFZLElBQUk7d0JBQ3BCLE9BQU8sVUFBVSxzQkFBc0IsUUFBUSxVQUFVOzs7b0JBRzdELEdBQUcseURBQXlELFlBQU07d0JBQzlELElBQUksWUFBWSxJQUFJO3dCQUNwQixVQUFVLGVBQWUsVUFBVTt3QkFDbkMsT0FBTyxVQUFVLHNCQUFzQixRQUFRLFVBQVU7Ozs7OztHQWVsRSIsImZpbGUiOiJjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2JpbGVFbnRpdHlWaWV3U3RhdGVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uTW9iaWxlRW50aXR5Vmlld1N0YXRlJywgKCkgPT4ge1xuICAgIGxldCBDZXJ0aWZpY2F0aW9uTW9iaWxlRW50aXR5Vmlld1N0YXRlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9DZXJ0aWZpY2F0aW9uTW9iaWxlRW50aXR5Vmlld1N0YXRlXykgPT4ge1xuICAgICAgICBDZXJ0aWZpY2F0aW9uTW9iaWxlRW50aXR5Vmlld1N0YXRlID0gX0NlcnRpZmljYXRpb25Nb2JpbGVFbnRpdHlWaWV3U3RhdGVfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgICAgaXQoJ3NldHMgYWN0aXZlQ29uZmlnIHRvIHJlbWFpbmluZyBieSBkZWZhdWx0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZpZXdTdGF0ZSA9IG5ldyBDZXJ0aWZpY2F0aW9uTW9iaWxlRW50aXR5Vmlld1N0YXRlKCk7XG4gICAgICAgICAgICBleHBlY3Qodmlld1N0YXRlLmFjdGl2ZUNvbmZpZykudG9FcXVhbCh2aWV3U3RhdGUucmVtYWluaW5nRW50aXR5TGlzdENvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc2V0KCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZXRzIGFjdGl2ZUNvbmZpZyB0byBjb21wbGV0ZSBpZiBhbGwgZW50aXRpZXMgYXJlIGNvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnQgPSB7XG4gICAgICAgICAgICAgICAgaW5jb21wbGV0ZUVudGl0aWVzOiAwXG4gICAgICAgICAgICB9LCB2aWV3U3RhdGUgPSBuZXcgQ2VydGlmaWNhdGlvbk1vYmlsZUVudGl0eVZpZXdTdGF0ZSgpO1xuICAgICAgICAgICAgdmlld1N0YXRlLnJlc2V0KGNlcnQpO1xuICAgICAgICAgICAgZXhwZWN0KHZpZXdTdGF0ZS5hY3RpdmVDb25maWcpLnRvRXF1YWwodmlld1N0YXRlLmNvbXBsZXRlRW50aXR5TGlzdENvbmZpZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBjaGFuZ2UgYWN0aXZlQ29uZmlnIGlmIGFsbCBlbnRpdGllcyBhcmUgbm90IGNvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNlcnQgPSB7XG4gICAgICAgICAgICAgICAgaW5jb21wbGV0ZUVudGl0aWVzOiA3XG4gICAgICAgICAgICB9LCB2aWV3U3RhdGUgPSBuZXcgQ2VydGlmaWNhdGlvbk1vYmlsZUVudGl0eVZpZXdTdGF0ZSgpO1xuICAgICAgICAgICAgdmlld1N0YXRlLnJlc2V0KGNlcnQpO1xuICAgICAgICAgICAgZXhwZWN0KHZpZXdTdGF0ZS5hY3RpdmVDb25maWcpLnRvRXF1YWwodmlld1N0YXRlLnJlbWFpbmluZ0VudGl0eUxpc3RDb25maWcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRBY3RpdmVMaXN0U3RhdGUoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ3JldHVybnMgcmVtYWluaW5nIGxpc3Qgc3RhdGUgaWYgYWN0aXZlIHRhYiBpcyByZW1haW5pbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdmlld1N0YXRlID0gbmV3IENlcnRpZmljYXRpb25Nb2JpbGVFbnRpdHlWaWV3U3RhdGUoKTtcbiAgICAgICAgICAgIGV4cGVjdCh2aWV3U3RhdGUuZ2V0QWN0aXZlTGlzdFN0YXRlKCkpLnRvRXF1YWwodmlld1N0YXRlLnJlbWFpbmluZ0VudGl0eUxpc3RTdGF0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGNvbXBsZXRlIGxpc3Qgc3RhdGUgaWYgYWN0aXZlIHRhYiBpcyBjb21wbGV0ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCB2aWV3U3RhdGUgPSBuZXcgQ2VydGlmaWNhdGlvbk1vYmlsZUVudGl0eVZpZXdTdGF0ZSgpO1xuICAgICAgICAgICAgdmlld1N0YXRlLmFjdGl2ZUNvbmZpZyA9IHZpZXdTdGF0ZS5jb21wbGV0ZUVudGl0eUxpc3RDb25maWc7XG4gICAgICAgICAgICBleHBlY3Qodmlld1N0YXRlLmdldEFjdGl2ZUxpc3RTdGF0ZSgpKS50b0VxdWFsKHZpZXdTdGF0ZS5jb21wbGV0ZUVudGl0eUxpc3RTdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
