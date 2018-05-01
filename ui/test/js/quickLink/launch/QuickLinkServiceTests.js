System.register(['test/js/TestInitializer', 'quickLink/launch/QuickLinkLaunchModule'], function (_export) {

    /**
     * Tests for the QuickLinkService
     */
    'use strict';

    var quickLinkLaunchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_quickLinkLaunchQuickLinkLaunchModule) {
            quickLinkLaunchModule = _quickLinkLaunchQuickLinkLaunchModule['default'];
        }],
        execute: function () {
            describe('QuickLinkService', function () {
                var baseURLQuickLinks = '/ui/rest/quickLinks/';
                var $rootScope,
                    $httpBackend,
                    quickLink,
                    quickLinkService,
                    QuickLinkLaunchResult,
                    QuickLinkCard,
                    QuickLink,
                    launchResponse = {
                    'action': 'quicklinkaction'
                },
                    quickLinkName = 'testQuickLink',
                    quickLinkCardData = {
                    name: quickLinkName,
                    allowOthers: true,
                    allowSelf: false
                };

                beforeEach(module(quickLinkLaunchModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_quickLinkService_, $q, _$rootScope_, _$httpBackend_, _QuickLinkLaunchResult_, _QuickLinkCard_, _QuickLink_) {
                    $rootScope = _$rootScope_;
                    quickLinkService = _quickLinkService_;
                    $httpBackend = _$httpBackend_;
                    QuickLinkLaunchResult = _QuickLinkLaunchResult_;
                    QuickLinkCard = _QuickLinkCard_;
                    QuickLink = _QuickLink_;
                }));

                function createLaunchUrl(quickLinkName) {
                    return '/ui/rest/quickLinks/' + quickLinkName + '/launch';
                }

                function verifyResult(result) {
                    expect(result.action).toEqual(launchResponse.action);
                }

                it('returns appropriate launch result', function () {
                    var result;

                    $httpBackend.expectPOST(createLaunchUrl(quickLinkName)).respond(200, launchResponse);

                    quickLinkService.launchQuickLink(new QuickLinkCard(quickLinkCardData)).then(function (launchResult) {
                        result = launchResult;
                    });

                    $httpBackend.flush();

                    verifyResult(result);
                });

                it('throws if response data is missing', function () {
                    $httpBackend.expectPOST(createLaunchUrl(quickLinkName)).respond(200, null);

                    expect(function () {
                        quickLinkService.launchQuickLink(new QuickLinkCard(quickLinkCardData));
                        $httpBackend.flush();
                    }).toThrow();
                });

                describe('get quick link', function () {
                    var response = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        quickLink = {
                            id: 'managePasswords',
                            name: 'Manage Passwords',
                            action: 'managePasswords',
                            selfService: true,
                            forOthers: true
                        };
                        response = new QuickLink(quickLink);
                    });

                    it('accepts a request with a quicklink name', function () {
                        var quickLinkName = 'Manage%20Passwords';
                        $httpBackend.expectGET('' + baseURLQuickLinks + quickLinkName).respond(200, quickLink);
                        promise = quickLinkService.getQuickLink(quickLinkName);
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).toEqual(new QuickLink(quickLink));
                        });
                        $httpBackend.flush();
                    });

                    it('throw with a null quicklink', function () {
                        expect(function () {
                            quickLinkService.getQuickLink(null);
                        }).toThrow();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMsVUFBVSxTQUFTOzs7OztJQUExRzs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTtZQUo3QixTQUFTLG9CQUFvQixZQUFXO2dCQUNwQyxJQUFNLG9CQUFvQjtnQkFDMUIsSUFBSTtvQkFBWTtvQkFBYztvQkFBVztvQkFBa0I7b0JBQXVCO29CQUFlO29CQUM3RixpQkFBaUI7b0JBQ2IsVUFBVTs7b0JBRWQsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ2hCLE1BQU07b0JBQ04sYUFBYTtvQkFDYixXQUFXOzs7Z0JBR25CLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxvQkFBb0IsSUFBSSxjQUFjLGdCQUFnQix5QkFDckQsaUJBQWlCLGFBQWE7b0JBQ3RELGFBQWE7b0JBQ2IsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLHdCQUF3QjtvQkFDeEIsZ0JBQWdCO29CQUNoQixZQUFZOzs7Z0JBR2hCLFNBQVMsZ0JBQWdCLGVBQWU7b0JBQ3BDLE9BQU8seUJBQXlCLGdCQUFnQjs7O2dCQUdwRCxTQUFTLGFBQWEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPLFFBQVEsUUFBUSxlQUFlOzs7Z0JBR2pELEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLElBQUk7O29CQUVKLGFBQWEsV0FBVyxnQkFBZ0IsZ0JBQWdCLFFBQVEsS0FBSzs7b0JBRXJFLGlCQUFpQixnQkFBZ0IsSUFBSSxjQUFjLG9CQUFvQixLQUFLLFVBQVMsY0FBYzt3QkFDL0YsU0FBUzs7O29CQUdiLGFBQWE7O29CQUViLGFBQWE7OztnQkFHakIsR0FBRyxzQ0FBc0MsWUFBVztvQkFDaEQsYUFBYSxXQUFXLGdCQUFnQixnQkFBZ0IsUUFBUSxLQUFLOztvQkFFckUsT0FBTyxZQUFXO3dCQUNkLGlCQUFpQixnQkFBZ0IsSUFBSSxjQUFjO3dCQUNuRCxhQUFhO3VCQUNkOzs7Z0JBSVAsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsSUFBSSxXQUFRO3dCQUFFLFVBQU87O29CQUVyQixXQUFXLFlBQVc7d0JBQ2xCLFlBQVk7NEJBQ1IsSUFBSTs0QkFDSixNQUFNOzRCQUNOLFFBQVE7NEJBQ1IsYUFBYTs0QkFDYixXQUFXOzt3QkFFZixXQUFXLElBQUksVUFBVTs7O29CQUc3QixHQUFHLDJDQUEyQyxZQUFXO3dCQUNyRCxJQUFJLGdCQUFnQjt3QkFDcEIsYUFBYSxVQUFTLEtBQUksb0JBQW9CLGVBQWlCLFFBQVEsS0FBSzt3QkFDNUUsVUFBVSxpQkFBaUIsYUFBYTt3QkFDeEMsT0FBTyxTQUFTO3dCQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFVBQVUsUUFBUSxJQUFJLFVBQVU7O3dCQUUzQyxhQUFhOzs7b0JBR2pCLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLE9BQU8sWUFBVzs0QkFBRSxpQkFBaUIsYUFBYTsyQkFBVTs7Ozs7O0dBa0JyRSIsImZpbGUiOiJxdWlja0xpbmsvbGF1bmNoL1F1aWNrTGlua1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcXVpY2tMaW5rTGF1bmNoTW9kdWxlIGZyb20gJ3F1aWNrTGluay9sYXVuY2gvUXVpY2tMaW5rTGF1bmNoTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIFF1aWNrTGlua1NlcnZpY2VcbiAqL1xuZGVzY3JpYmUoJ1F1aWNrTGlua1NlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBiYXNlVVJMUXVpY2tMaW5rcyA9ICcvdWkvcmVzdC9xdWlja0xpbmtzLyc7XG4gICAgdmFyICRyb290U2NvcGUsICRodHRwQmFja2VuZCwgcXVpY2tMaW5rLCBxdWlja0xpbmtTZXJ2aWNlLCBRdWlja0xpbmtMYXVuY2hSZXN1bHQsIFF1aWNrTGlua0NhcmQsIFF1aWNrTGluayxcbiAgICAgICAgbGF1bmNoUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAnYWN0aW9uJzogJ3F1aWNrbGlua2FjdGlvbidcbiAgICAgICAgfSxcbiAgICAgICAgcXVpY2tMaW5rTmFtZSA9ICd0ZXN0UXVpY2tMaW5rJyxcbiAgICAgICAgcXVpY2tMaW5rQ2FyZERhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBxdWlja0xpbmtOYW1lLFxuICAgICAgICAgICAgYWxsb3dPdGhlcnM6IHRydWUsXG4gICAgICAgICAgICBhbGxvd1NlbGY6IGZhbHNlXG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShxdWlja0xpbmtMYXVuY2hNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfcXVpY2tMaW5rU2VydmljZV8sICRxLCBfJHJvb3RTY29wZV8sIF8kaHR0cEJhY2tlbmRfLCBfUXVpY2tMaW5rTGF1bmNoUmVzdWx0XyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1F1aWNrTGlua0NhcmRfLCBfUXVpY2tMaW5rXykge1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBxdWlja0xpbmtTZXJ2aWNlID0gX3F1aWNrTGlua1NlcnZpY2VfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgUXVpY2tMaW5rTGF1bmNoUmVzdWx0ID0gX1F1aWNrTGlua0xhdW5jaFJlc3VsdF87XG4gICAgICAgIFF1aWNrTGlua0NhcmQgPSBfUXVpY2tMaW5rQ2FyZF87XG4gICAgICAgIFF1aWNrTGluayA9IF9RdWlja0xpbmtfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxhdW5jaFVybChxdWlja0xpbmtOYW1lKSB7XG4gICAgICAgIHJldHVybiAnL3VpL3Jlc3QvcXVpY2tMaW5rcy8nICsgcXVpY2tMaW5rTmFtZSArICcvbGF1bmNoJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSZXN1bHQocmVzdWx0KSB7XG4gICAgICAgIGV4cGVjdChyZXN1bHQuYWN0aW9uKS50b0VxdWFsKGxhdW5jaFJlc3BvbnNlLmFjdGlvbik7XG4gICAgfVxuXG4gICAgaXQoJ3JldHVybnMgYXBwcm9wcmlhdGUgbGF1bmNoIHJlc3VsdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGNyZWF0ZUxhdW5jaFVybChxdWlja0xpbmtOYW1lKSkucmVzcG9uZCgyMDAsIGxhdW5jaFJlc3BvbnNlKTtcblxuICAgICAgICBxdWlja0xpbmtTZXJ2aWNlLmxhdW5jaFF1aWNrTGluayhuZXcgUXVpY2tMaW5rQ2FyZChxdWlja0xpbmtDYXJkRGF0YSkpLnRoZW4oZnVuY3Rpb24obGF1bmNoUmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsYXVuY2hSZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgIHZlcmlmeVJlc3VsdChyZXN1bHQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiByZXNwb25zZSBkYXRhIGlzIG1pc3NpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1QoY3JlYXRlTGF1bmNoVXJsKHF1aWNrTGlua05hbWUpKS5yZXNwb25kKDIwMCwgbnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcXVpY2tMaW5rU2VydmljZS5sYXVuY2hRdWlja0xpbmsobmV3IFF1aWNrTGlua0NhcmQocXVpY2tMaW5rQ2FyZERhdGEpKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgcXVpY2sgbGluaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UsIHByb21pc2U7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHF1aWNrTGluayA9IHtcbiAgICAgICAgICAgICAgICBpZDogJ21hbmFnZVBhc3N3b3JkcycsXG4gICAgICAgICAgICAgICAgbmFtZTogJ01hbmFnZSBQYXNzd29yZHMnLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ21hbmFnZVBhc3N3b3JkcycsXG4gICAgICAgICAgICAgICAgc2VsZlNlcnZpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9yT3RoZXJzOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBuZXcgUXVpY2tMaW5rKHF1aWNrTGluayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGEgcXVpY2tsaW5rIG5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBxdWlja0xpbmtOYW1lID0gJ01hbmFnZSUyMFBhc3N3b3Jkcyc7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGAke2Jhc2VVUkxRdWlja0xpbmtzfSR7cXVpY2tMaW5rTmFtZX1gKS5yZXNwb25kKDIwMCwgcXVpY2tMaW5rKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBxdWlja0xpbmtTZXJ2aWNlLmdldFF1aWNrTGluayhxdWlja0xpbmtOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvRXF1YWwobmV3IFF1aWNrTGluayhxdWlja0xpbmspKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvdyB3aXRoIGEgbnVsbCBxdWlja2xpbmsnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgcXVpY2tMaW5rU2VydmljZS5nZXRRdWlja0xpbmsobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
