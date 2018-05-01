System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {

            describe('authQuestionService', function () {
                var http, authQuestionService;

                beforeEach(module(resetModule));
                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));
                beforeEach(inject(function ($httpBackend, _authQuestionService_) {
                    http = $httpBackend;
                    authQuestionService = _authQuestionService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getAuthQuestions()', function () {
                    it('Should fetch Array of questions and numberRequired', function () {
                        http.expectPOST('/identityiq/ui/rest/userReset/authQuestions').respond(200, {
                            numRequired: 3,
                            questions: [{
                                id: 'questId1',
                                text: 'Question1'
                            }, {
                                id: 'questId2',
                                text: 'Question2'
                            }, {
                                id: 'questId3',
                                text: 'Question3'
                            }]
                        });
                        var prom = authQuestionService.getAuthQuestions();
                        //Ensure that getAuthQuestions returns a promise
                        expect(prom && prom.then).toBeTruthy();
                        //Ensure the promise contains a data Object
                        prom.then(function (data) {
                            expect(data instanceof Object).toBeTruthy();
                        });

                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L0F1dGhRdWVzdGlvblNlcnZpY2VUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5QkFBeUIsVUFBVSxTQUFTO0lBQ3BGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxzQkFBc0I7WUFDNUUsY0FBYyxxQkFBcUI7O1FBRXZDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx1QkFBdUIsWUFBVztnQkFDdkMsSUFBSSxNQUFNOztnQkFFVixXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7O2dCQUV6QyxXQUFXLE9BQU8sVUFBUyxjQUFjLHVCQUF1QjtvQkFDNUQsT0FBTztvQkFDUCxzQkFBc0I7OztnQkFHMUIsVUFBVSxZQUFXO29CQUNqQixLQUFLO29CQUNMLEtBQUs7OztnQkFHVCxTQUFTLHNCQUFzQixZQUFXO29CQUN0QyxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxLQUFLLFdBQVcsK0NBQ1AsUUFBUSxLQUFLOzRCQUNsQixhQUFjOzRCQUNkLFdBQVksQ0FBRTtnQ0FDVixJQUFLO2dDQUNMLE1BQU87K0JBQ1I7Z0NBQ0MsSUFBSztnQ0FDTCxNQUFPOytCQUNSO2dDQUNDLElBQUs7Z0NBQ0wsTUFBTzs7O3dCQUdmLElBQUksT0FBTyxvQkFBb0I7O3dCQUUvQixPQUFPLFFBQVEsS0FBSyxNQUFNOzt3QkFFMUIsS0FBSyxLQUFLLFVBQVMsTUFBTTs0QkFDckIsT0FBTyxnQkFBZ0IsUUFBUTs7O3dCQUduQyxLQUFLOzs7Ozs7R0FZZCIsImZpbGUiOiJyZXNldC9BdXRoUXVlc3Rpb25TZXJ2aWNlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHJlc2V0TW9kdWxlIGZyb20gJ3Jlc2V0L1Jlc2V0QXBwTW9kdWxlJztcblxuZGVzY3JpYmUoJ2F1dGhRdWVzdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgaHR0cCwgYXV0aFF1ZXN0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF9hdXRoUXVlc3Rpb25TZXJ2aWNlXykge1xuICAgICAgICBodHRwID0gJGh0dHBCYWNrZW5kO1xuICAgICAgICBhdXRoUXVlc3Rpb25TZXJ2aWNlID0gX2F1dGhRdWVzdGlvblNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEF1dGhRdWVzdGlvbnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnU2hvdWxkIGZldGNoIEFycmF5IG9mIHF1ZXN0aW9ucyBhbmQgbnVtYmVyUmVxdWlyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVCgnL2lkZW50aXR5aXEvdWkvcmVzdC91c2VyUmVzZXQvYXV0aFF1ZXN0aW9ucycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXNwb25kKDIwMCwge1xuICAgICAgICAgICAgICAgIG51bVJlcXVpcmVkIDogMyxcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMgOiBbIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgOiAncXVlc3RJZDEnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogJ1F1ZXN0aW9uMSdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkIDogJ3F1ZXN0SWQyJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA6ICdRdWVzdGlvbjInXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpZCA6ICdxdWVzdElkMycsXG4gICAgICAgICAgICAgICAgICAgIHRleHQgOiAnUXVlc3Rpb24zJ1xuICAgICAgICAgICAgICAgIH0gXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgcHJvbSA9IGF1dGhRdWVzdGlvblNlcnZpY2UuZ2V0QXV0aFF1ZXN0aW9ucygpO1xuICAgICAgICAgICAgLy9FbnN1cmUgdGhhdCBnZXRBdXRoUXVlc3Rpb25zIHJldHVybnMgYSBwcm9taXNlXG4gICAgICAgICAgICBleHBlY3QocHJvbSAmJiBwcm9tLnRoZW4pLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIC8vRW5zdXJlIHRoZSBwcm9taXNlIGNvbnRhaW5zIGEgZGF0YSBPYmplY3RcbiAgICAgICAgICAgIHByb20udGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
