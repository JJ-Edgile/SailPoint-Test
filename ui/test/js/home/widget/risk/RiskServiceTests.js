System.register(['test/js/TestInitializer', 'home/widget/risk/RiskWidgetModule'], function (_export) {
    'use strict';

    var riskWidgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_homeWidgetRiskRiskWidgetModule) {
            riskWidgetModule = _homeWidgetRiskRiskWidgetModule['default'];
        }],
        execute: function () {

            describe('RiskService', function () {
                var $scope,
                    $httpBackend,
                    riskService,
                    RiskyThing,
                    url = '/ui/rest/risk/widgets/topFive',
                    response = {
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

                beforeEach(module(riskWidgetModule));

                beforeEach(inject(function (_riskService_, _$rootScope_, _$httpBackend_, _RiskyThing_) {
                    $scope = _$rootScope_.$new();
                    riskService = _riskService_;
                    $httpBackend = _$httpBackend_;
                    RiskyThing = _RiskyThing_;
                }));

                function verifyRiskThings(riskyThingsData) {
                    var i;

                    expect(riskyThingsData.riskTypeApplication).toBeDefined();
                    expect(riskyThingsData.riskTypeIdentity).toBeDefined();

                    expect(angular.isArray(riskyThingsData.riskTypeApplication)).toBe(true);
                    expect(angular.isArray(riskyThingsData.riskTypeIdentity)).toBe(true);

                    expect(riskyThingsData.riskTypeApplication.length).toEqual(5);
                    expect(riskyThingsData.riskTypeIdentity.length).toEqual(5);

                    for (i = 0; i < riskyThingsData.riskTypeApplication; ++i) {
                        expect(riskyThingsData.riskTypeApplication[i].constructor).toEqual(RiskyThing);
                        expect(riskyThingsData.riskTypeApplication[i].displayableName).toEqual(response.riskTypeApplication[i].displayableName);
                        expect(riskyThingsData.riskTypeApplication[i].score).toEqual(response.riskTypeApplication[i].score);
                    }

                    for (i = 0; i < riskyThingsData.riskTypeIdentity; ++i) {
                        expect(riskyThingsData.riskTypeIdentity[i].constructor).toEqual(RiskyThing);
                        expect(riskyThingsData.riskTypeIdentity[i].displayableName).toEqual(response.riskTypeIdentity[i].displayableName);
                        expect(riskyThingsData.riskTypeIdentity[i].score).toEqual(response.riskTypeIdentity[i].score);
                    }
                }

                describe('getTopFive', function () {
                    it('returns top five risky applications and identities', function () {
                        var riskyThings = {};

                        $httpBackend.expectGET(url).respond(200, response);

                        riskService.getTopFive().then(function (returnedRiskyThings) {
                            riskyThings = returnedRiskyThings;
                        });

                        $httpBackend.flush();

                        verifyRiskThings(riskyThings);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvd2lkZ2V0L3Jpc2svUmlza1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUztJQUFyRzs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLG1CQUFtQixnQ0FBZ0M7O1FBRXZELFNBQVMsWUFBWTs7WUFIN0IsU0FBUyxlQUFlLFlBQVc7Z0JBQy9CLElBQUk7b0JBQVE7b0JBQWM7b0JBQWE7b0JBQ25DLE1BQU07b0JBQ04sV0FDSTtvQkFDSSx1QkFDSSxDQUNJO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7dUJBRWI7d0JBQ0ksbUJBQW1CO3dCQUNuQixTQUFTO3VCQUViO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7O29CQUdyQixvQkFDSSxDQUNJO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7dUJBRWI7d0JBQ0ksbUJBQW1CO3dCQUNuQixTQUFTO3VCQUViO3dCQUNJLG1CQUFtQjt3QkFDbkIsU0FBUzt1QkFFYjt3QkFDSSxtQkFBbUI7d0JBQ25CLFNBQVM7Ozs7Z0JBS2pDLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGVBQWUsY0FBYyxnQkFBZ0IsY0FBYztvQkFDbEYsU0FBUyxhQUFhO29CQUN0QixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsYUFBYTs7O2dCQUdqQixTQUFTLGlCQUFpQixpQkFBaUI7b0JBQ3ZDLElBQUk7O29CQUVKLE9BQU8sZ0JBQWdCLHFCQUFxQjtvQkFDNUMsT0FBTyxnQkFBZ0Isa0JBQWtCOztvQkFFekMsT0FBTyxRQUFRLFFBQVEsZ0JBQWdCLHNCQUFzQixLQUFLO29CQUNsRSxPQUFPLFFBQVEsUUFBUSxnQkFBZ0IsbUJBQW1CLEtBQUs7O29CQUUvRCxPQUFPLGdCQUFnQixvQkFBb0IsUUFBUSxRQUFRO29CQUMzRCxPQUFPLGdCQUFnQixpQkFBaUIsUUFBUSxRQUFROztvQkFFeEQsS0FBSyxJQUFJLEdBQUcsSUFBSSxnQkFBZ0IscUJBQXFCLEVBQUUsR0FBRzt3QkFDdEQsT0FBTyxnQkFBZ0Isb0JBQW9CLEdBQUcsYUFBYSxRQUFRO3dCQUNuRSxPQUFPLGdCQUFnQixvQkFBb0IsR0FBRyxpQkFDMUMsUUFBUSxTQUFTLG9CQUFvQixHQUFHO3dCQUM1QyxPQUFPLGdCQUFnQixvQkFBb0IsR0FBRyxPQUFPLFFBQVEsU0FBUyxvQkFBb0IsR0FBRzs7O29CQUdqRyxLQUFLLElBQUksR0FBRyxJQUFJLGdCQUFnQixrQkFBa0IsRUFBRSxHQUFHO3dCQUNuRCxPQUFPLGdCQUFnQixpQkFBaUIsR0FBRyxhQUFhLFFBQVE7d0JBQ2hFLE9BQU8sZ0JBQWdCLGlCQUFpQixHQUFHLGlCQUN2QyxRQUFRLFNBQVMsaUJBQWlCLEdBQUc7d0JBQ3pDLE9BQU8sZ0JBQWdCLGlCQUFpQixHQUFHLE9BQU8sUUFBUSxTQUFTLGlCQUFpQixHQUFHOzs7O2dCQUkvRixTQUFTLGNBQWMsWUFBVztvQkFDOUIsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsSUFBSSxjQUFjOzt3QkFFbEIsYUFBYSxVQUFVLEtBQUssUUFBUSxLQUFLOzt3QkFFekMsWUFBWSxhQUFhLEtBQUssVUFBUyxxQkFBcUI7NEJBQ3hELGNBQWM7Ozt3QkFHbEIsYUFBYTs7d0JBRWIsaUJBQWlCOzs7Ozs7R0FIMUIiLCJmaWxlIjoiaG9tZS93aWRnZXQvcmlzay9SaXNrU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByaXNrV2lkZ2V0TW9kdWxlIGZyb20gJ2hvbWUvd2lkZ2V0L3Jpc2svUmlza1dpZGdldE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdSaXNrU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsICRodHRwQmFja2VuZCwgcmlza1NlcnZpY2UsIFJpc2t5VGhpbmcsXG4gICAgICAgIHVybCA9ICcvdWkvcmVzdC9yaXNrL3dpZGdldHMvdG9wRml2ZScsXG4gICAgICAgIHJlc3BvbnNlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAncmlza1R5cGVBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheWFibGVOYW1lJzogJ1Jpc2t5QXBwMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Njb3JlJzogNDU2XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lBcHAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAzNDVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUFwcDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzY29yZSc6IDIzNFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheWFibGVOYW1lJzogJ1Jpc2t5QXBwNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Njb3JlJzogMTIzXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lBcHA1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJ3Jpc2tUeXBlSWRlbnRpdHknOlxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5MScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Njb3JlJzogNDU2XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lJZGVudGl0eTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzY29yZSc6IDM0NVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGlzcGxheWFibGVOYW1lJzogJ1Jpc2t5SWRlbnRpdHkzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2NvcmUnOiAyMzRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXlhYmxlTmFtZSc6ICdSaXNreUlkZW50aXR5NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Njb3JlJzogMTIzXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkaXNwbGF5YWJsZU5hbWUnOiAnUmlza3lJZGVudGl0eTUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzY29yZSc6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJpc2tXaWRnZXRNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9yaXNrU2VydmljZV8sIF8kcm9vdFNjb3BlXywgXyRodHRwQmFja2VuZF8sIF9SaXNreVRoaW5nXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICByaXNrU2VydmljZSA9IF9yaXNrU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBSaXNreVRoaW5nID0gX1Jpc2t5VGhpbmdfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIHZlcmlmeVJpc2tUaGluZ3Mocmlza3lUaGluZ3NEYXRhKSB7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGV4cGVjdChyaXNreVRoaW5nc0RhdGEucmlza1R5cGVBcHBsaWNhdGlvbikudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KHJpc2t5VGhpbmdzRGF0YS5yaXNrVHlwZUlkZW50aXR5KS50b0JlRGVmaW5lZCgpO1xuXG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmlzQXJyYXkocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlQXBwbGljYXRpb24pKS50b0JlKHRydWUpO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5pc0FycmF5KHJpc2t5VGhpbmdzRGF0YS5yaXNrVHlwZUlkZW50aXR5KSkudG9CZSh0cnVlKTtcblxuICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlQXBwbGljYXRpb24ubGVuZ3RoKS50b0VxdWFsKDUpO1xuICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlSWRlbnRpdHkubGVuZ3RoKS50b0VxdWFsKDUpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByaXNreVRoaW5nc0RhdGEucmlza1R5cGVBcHBsaWNhdGlvbjsgKytpKSB7XG4gICAgICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlQXBwbGljYXRpb25baV0uY29uc3RydWN0b3IpLnRvRXF1YWwoUmlza3lUaGluZyk7XG4gICAgICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlQXBwbGljYXRpb25baV0uZGlzcGxheWFibGVOYW1lKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKHJlc3BvbnNlLnJpc2tUeXBlQXBwbGljYXRpb25baV0uZGlzcGxheWFibGVOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChyaXNreVRoaW5nc0RhdGEucmlza1R5cGVBcHBsaWNhdGlvbltpXS5zY29yZSkudG9FcXVhbChyZXNwb25zZS5yaXNrVHlwZUFwcGxpY2F0aW9uW2ldLnNjb3JlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByaXNreVRoaW5nc0RhdGEucmlza1R5cGVJZGVudGl0eTsgKytpKSB7XG4gICAgICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlSWRlbnRpdHlbaV0uY29uc3RydWN0b3IpLnRvRXF1YWwoUmlza3lUaGluZyk7XG4gICAgICAgICAgICBleHBlY3Qocmlza3lUaGluZ3NEYXRhLnJpc2tUeXBlSWRlbnRpdHlbaV0uZGlzcGxheWFibGVOYW1lKS5cbiAgICAgICAgICAgICAgICB0b0VxdWFsKHJlc3BvbnNlLnJpc2tUeXBlSWRlbnRpdHlbaV0uZGlzcGxheWFibGVOYW1lKTtcbiAgICAgICAgICAgIGV4cGVjdChyaXNreVRoaW5nc0RhdGEucmlza1R5cGVJZGVudGl0eVtpXS5zY29yZSkudG9FcXVhbChyZXNwb25zZS5yaXNrVHlwZUlkZW50aXR5W2ldLnNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2NyaWJlKCdnZXRUb3BGaXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm5zIHRvcCBmaXZlIHJpc2t5IGFwcGxpY2F0aW9ucyBhbmQgaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJpc2t5VGhpbmdzID0ge307XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICByaXNrU2VydmljZS5nZXRUb3BGaXZlKCkudGhlbihmdW5jdGlvbihyZXR1cm5lZFJpc2t5VGhpbmdzKSB7XG4gICAgICAgICAgICAgICAgcmlza3lUaGluZ3MgPSByZXR1cm5lZFJpc2t5VGhpbmdzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuXG4gICAgICAgICAgICB2ZXJpZnlSaXNrVGhpbmdzKHJpc2t5VGhpbmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
