System.register(['test/js/TestInitializer', 'home/widget/risk/RiskWidgetModule', 'test/js/TestModule'], function (_export) {
    'use strict';

    var riskWidgetModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetRiskRiskWidgetModule) {
            riskWidgetModule = _homeWidgetRiskRiskWidgetModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('TopFiveRisksWidgetDirectiveCtrl', function () {
                var ctrl,
                    navigationServiceMock,
                    riskServiceMock,
                    RISK_TYPE_APP,
                    RISK_TYPE_IDENTITY,
                    riskyThingsData = {
                    'riskTypeApplication': [{
                        'displayableName': 'RiskyApp1',
                        'score': 456
                    }, {
                        'displayableName': 'RiskyApp2',
                        'score': 345
                    }, {
                        'displayableName': 'RiskyApp3',
                        'score': 234
                    }, {
                        'displayableName': 'RiskyApp4',
                        'score': 123
                    }, {
                        'displayableName': 'RiskyApp5',
                        'score': 1
                    }],
                    'riskTypeIdentity': [{
                        'displayableName': 'RiskyIdentity1',
                        'score': 456
                    }, {
                        'displayableName': 'RiskyIdentity2',
                        'score': 345
                    }, {
                        'displayableName': 'RiskyIdentity3',
                        'score': 234
                    }, {
                        'displayableName': 'RiskyIdentity4',
                        'score': 123
                    }, {
                        'displayableName': 'RiskyIdentity5',
                        'score': 1
                    }]
                };

                beforeEach(module(riskWidgetModule, testModule));

                beforeEach(inject(function ($controller, $rootScope, testService, _RISK_TYPE_APP_, _RISK_TYPE_IDENTITY_) {

                    RISK_TYPE_APP = _RISK_TYPE_APP_;
                    RISK_TYPE_IDENTITY = _RISK_TYPE_IDENTITY_;

                    riskServiceMock = {
                        getTopFive: testService.createPromiseSpy(false, riskyThingsData)
                    };

                    navigationServiceMock = {
                        go: jasmine.createSpy()
                    };

                    ctrl = $controller('TopFiveRisksWidgetDirectiveCtrl', {
                        $scope: $rootScope.$new(),
                        riskService: riskServiceMock,
                        navigationService: navigationServiceMock
                    });

                    ctrl.$onInit();
                    $rootScope.$apply();
                }));

                function verifyRiskyWidgetData(riskyWidgetData) {
                    expect(riskyWidgetData.active).toBeDefined();
                    // active should be initialized to false
                    expect(riskyWidgetData.active).toBe(false);
                    expect(riskyWidgetData.type).toBeDefined();
                    expect(riskyWidgetData.typeLabel).toBeDefined();
                    expect(riskyWidgetData.data).toBeDefined();
                    // should match mock data elements length
                    expect(riskyWidgetData.data.length).toBe(5);
                }

                it('should initialize with risk data', function () {
                    expect(riskServiceMock.getTopFive).toHaveBeenCalled();
                    expect(ctrl.riskyThings).toBeDefined();
                    expect(ctrl.riskyThings.length).toBe(2);

                    verifyRiskyWidgetData(ctrl.riskyThings[0]);
                    verifyRiskyWidgetData(ctrl.riskyThings[1]);
                });

                describe('goToRiskPage', function () {
                    var appRiskNav = {
                        outcome: 'viewApplicationRiskScore'
                    },
                        identityRiskNav = {
                        outcome: 'viewIdentityRiskScore'
                    };

                    it('should go to the application risk page when type is application', function () {
                        ctrl.currentRiskType = RISK_TYPE_APP;
                        ctrl.goToRiskPage();
                        expect(navigationServiceMock.go.calls.mostRecent().args[0]).toEqual(appRiskNav);
                    });

                    it('should go to the application risk page when type is identity', function () {
                        ctrl.currentRiskType = RISK_TYPE_IDENTITY;
                        ctrl.goToRiskPage();
                        expect(navigationServiceMock.go.calls.mostRecent().args[0]).toEqual(identityRiskNav);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3Jpc2svVG9wRml2ZVJpc2tzV2lkZ2V0RGlyZWN0aXZlQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsdUJBQXVCLFVBQVUsU0FBUztJQUEzSDs7SUFHSSxJQUFJLGtCQUFrQjtJQUN0QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsbUJBQW1CLGdDQUFnQztXQUNwRCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLG1DQUFtQyxZQUFXO2dCQUNuRCxJQUFJO29CQUFNO29CQUF1QjtvQkFBaUI7b0JBQWU7b0JBQzdELGtCQUFrQjtvQkFDZCx1QkFDSSxDQUNJO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7dUJBRWI7d0JBQ0ksbUJBQW1CO3dCQUNuQixTQUFTO3VCQUViO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7O29CQUdyQixvQkFDSSxDQUNJO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7dUJBRWI7d0JBQ0ksbUJBQW1CO3dCQUNuQixTQUFTO3VCQUViO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7Ozs7Z0JBSzdCLFdBQVcsT0FBTyxrQkFBa0I7O2dCQUVwQyxXQUFXLE9BQU8sVUFBUyxhQUFhLFlBQVksYUFBYSxpQkFBaUIsc0JBQXNCOztvQkFFcEcsZ0JBQWdCO29CQUNoQixxQkFBcUI7O29CQUVyQixrQkFBa0I7d0JBQ2QsWUFBWSxZQUFZLGlCQUFpQixPQUFPOzs7b0JBR3BELHdCQUF3Qjt3QkFDcEIsSUFBSSxRQUFROzs7b0JBR2hCLE9BQU8sWUFBWSxtQ0FBbUM7d0JBQ2xELFFBQVEsV0FBVzt3QkFDbkIsYUFBYTt3QkFDYixtQkFBbUI7OztvQkFHdkIsS0FBSztvQkFDTCxXQUFXOzs7Z0JBR2YsU0FBUyxzQkFBc0IsaUJBQWlCO29CQUM1QyxPQUFPLGdCQUFnQixRQUFROztvQkFFL0IsT0FBTyxnQkFBZ0IsUUFBUSxLQUFLO29CQUNwQyxPQUFPLGdCQUFnQixNQUFNO29CQUM3QixPQUFPLGdCQUFnQixXQUFXO29CQUNsQyxPQUFPLGdCQUFnQixNQUFNOztvQkFFN0IsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLEtBQUs7OztnQkFHN0MsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsT0FBTyxnQkFBZ0IsWUFBWTtvQkFDbkMsT0FBTyxLQUFLLGFBQWE7b0JBQ3pCLE9BQU8sS0FBSyxZQUFZLFFBQVEsS0FBSzs7b0JBRXJDLHNCQUFzQixLQUFLLFlBQVk7b0JBQ3ZDLHNCQUFzQixLQUFLLFlBQVk7OztnQkFHM0MsU0FBUyxnQkFBZ0IsWUFBVztvQkFDaEMsSUFBSSxhQUFhO3dCQUNULFNBQVM7O3dCQUViLGtCQUFrQjt3QkFDZCxTQUFTOzs7b0JBR2pCLEdBQUcsbUVBQW1FLFlBQVc7d0JBQzdFLEtBQUssa0JBQWtCO3dCQUN2QixLQUFLO3dCQUNMLE9BQU8sc0JBQXNCLEdBQUcsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFROzs7b0JBSXhFLEdBQUcsZ0VBQWdFLFlBQVc7d0JBQzFFLEtBQUssa0JBQWtCO3dCQUN2QixLQUFLO3dCQUNMLE9BQU8sc0JBQXNCLEdBQUcsTUFBTSxhQUFhLEtBQUssSUFBSSxRQUFROzs7Ozs7R0FDN0UiLCJmaWxlIjoiaG9tZS93aWRnZXQvcmlzay9Ub3BGaXZlUmlza3NXaWRnZXREaXJlY3RpdmVDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJpc2tXaWRnZXRNb2R1bGUgZnJvbSAnaG9tZS93aWRnZXQvcmlzay9SaXNrV2lkZ2V0TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdUb3BGaXZlUmlza3NXaWRnZXREaXJlY3RpdmVDdHJsJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN0cmwsIG5hdmlnYXRpb25TZXJ2aWNlTW9jaywgcmlza1NlcnZpY2VNb2NrLCBSSVNLX1RZUEVfQVBQLCBSSVNLX1RZUEVfSURFTlRJVFksXG4gICAgICAgIHJpc2t5VGhpbmdzRGF0YSA9IHtcbiAgICAgICAgICAgICdyaXNrVHlwZUFwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lBcHAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzY29yZSc6IDQ1NlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheWFibGVOYW1lJzogJ1Jpc2t5QXBwMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAzNDVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUFwcDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Njb3JlJzogMjM0XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lBcHA0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzY29yZSc6IDEyM1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheWFibGVOYW1lJzogJ1Jpc2t5QXBwNScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ3Jpc2tUeXBlSWRlbnRpdHknOlxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5MScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiA0NTZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5MicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAzNDVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5MycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAyMzRcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAxMjNcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyaXNrV2lkZ2V0TW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkY29udHJvbGxlciwgJHJvb3RTY29wZSwgdGVzdFNlcnZpY2UsIF9SSVNLX1RZUEVfQVBQXywgX1JJU0tfVFlQRV9JREVOVElUWV8pIHtcblxuICAgICAgICBSSVNLX1RZUEVfQVBQID0gX1JJU0tfVFlQRV9BUFBfO1xuICAgICAgICBSSVNLX1RZUEVfSURFTlRJVFkgPSBfUklTS19UWVBFX0lERU5USVRZXztcblxuICAgICAgICByaXNrU2VydmljZU1vY2sgPSB7XG4gICAgICAgICAgICBnZXRUb3BGaXZlOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCByaXNreVRoaW5nc0RhdGEpXG4gICAgICAgIH07XG5cbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2VNb2NrID0ge1xuICAgICAgICAgICAgZ286IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcblxuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1RvcEZpdmVSaXNrc1dpZGdldERpcmVjdGl2ZUN0cmwnLCB7XG4gICAgICAgICAgICAkc2NvcGU6ICRyb290U2NvcGUuJG5ldygpLFxuICAgICAgICAgICAgcmlza1NlcnZpY2U6IHJpc2tTZXJ2aWNlTW9jayxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZU1vY2tcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3RybC4kb25Jbml0KCk7XG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Umlza3lXaWRnZXREYXRhKHJpc2t5V2lkZ2V0RGF0YSkge1xuICAgICAgICBleHBlY3Qocmlza3lXaWRnZXREYXRhLmFjdGl2ZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgLy8gYWN0aXZlIHNob3VsZCBiZSBpbml0aWFsaXplZCB0byBmYWxzZVxuICAgICAgICBleHBlY3Qocmlza3lXaWRnZXREYXRhLmFjdGl2ZSkudG9CZShmYWxzZSk7XG4gICAgICAgIGV4cGVjdChyaXNreVdpZGdldERhdGEudHlwZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHJpc2t5V2lkZ2V0RGF0YS50eXBlTGFiZWwpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChyaXNreVdpZGdldERhdGEuZGF0YSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgLy8gc2hvdWxkIG1hdGNoIG1vY2sgZGF0YSBlbGVtZW50cyBsZW5ndGhcbiAgICAgICAgZXhwZWN0KHJpc2t5V2lkZ2V0RGF0YS5kYXRhLmxlbmd0aCkudG9CZSg1KTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIGluaXRpYWxpemUgd2l0aCByaXNrIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHJpc2tTZXJ2aWNlTW9jay5nZXRUb3BGaXZlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLnJpc2t5VGhpbmdzKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoY3RybC5yaXNreVRoaW5ncy5sZW5ndGgpLnRvQmUoMik7XG5cbiAgICAgICAgdmVyaWZ5Umlza3lXaWRnZXREYXRhKGN0cmwucmlza3lUaGluZ3NbMF0pO1xuICAgICAgICB2ZXJpZnlSaXNreVdpZGdldERhdGEoY3RybC5yaXNreVRoaW5nc1sxXSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ29Ub1Jpc2tQYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcHBSaXNrTmF2ID0ge1xuICAgICAgICAgICAgICAgIG91dGNvbWU6ICd2aWV3QXBwbGljYXRpb25SaXNrU2NvcmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWRlbnRpdHlSaXNrTmF2ID0ge1xuICAgICAgICAgICAgICAgIG91dGNvbWU6ICd2aWV3SWRlbnRpdHlSaXNrU2NvcmUnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzaG91bGQgZ28gdG8gdGhlIGFwcGxpY2F0aW9uIHJpc2sgcGFnZSB3aGVuIHR5cGUgaXMgYXBwbGljYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY3VycmVudFJpc2tUeXBlID0gUklTS19UWVBFX0FQUDtcbiAgICAgICAgICAgIGN0cmwuZ29Ub1Jpc2tQYWdlKCk7XG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2VNb2NrLmdvLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdKS50b0VxdWFsKGFwcFJpc2tOYXYpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZ28gdG8gdGhlIGFwcGxpY2F0aW9uIHJpc2sgcGFnZSB3aGVuIHR5cGUgaXMgaWRlbnRpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN0cmwuY3VycmVudFJpc2tUeXBlID0gUklTS19UWVBFX0lERU5USVRZO1xuICAgICAgICAgICAgY3RybC5nb1RvUmlza1BhZ2UoKTtcbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZU1vY2suZ28uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0pLnRvRXF1YWwoaWRlbnRpdHlSaXNrTmF2KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
