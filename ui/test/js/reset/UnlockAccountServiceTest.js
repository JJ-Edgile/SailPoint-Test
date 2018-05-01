System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {

            describe('unlockAccountService', function () {
                var http,
                    unlockAccountService,
                    postData = function () {
                    return {
                        auth: {
                            type: 'SMS',
                            token: 'token'
                        }
                    };
                },
                    authQuestData = function () {
                    return {
                        auth: {
                            type: 'Questions',
                            authQuestions: [{
                                id: '1',
                                answer: 'Answer to 1'
                            }, {
                                id: '2',
                                answer: 'Answer to 2'
                            }]
                        }
                    };
                };

                beforeEach(module(resetModule));
                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));
                beforeEach(inject(function ($httpBackend, _unlockAccountService_) {
                    http = $httpBackend;
                    unlockAccountService = _unlockAccountService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('withSMS()', function () {
                    it('Should accept call with data and craft correct POST data', function () {
                        http.expectPOST('/identityiq/ui/rest/userReset/unlockAccount', postData()).respond(200, '');
                        unlockAccountService.withSMS('token');
                        http.flush();
                    });
                });

                describe('withQuestions()', function () {
                    it('Should accept call with data and craft correct POST', function () {
                        http.expectPOST('/identityiq/ui/rest/userReset/unlockAccount', authQuestData()).respond(200, '');
                        var answers = [];
                        var answer = { id: '1', answer: 'Answer to 1' };
                        answers.push(answer);
                        answer = { id: '2', answer: 'Answer to 2' };
                        answers.push(answer);
                        unlockAccountService.withQuestions(answers);
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1VubG9ja0FjY291bnRTZXJ2aWNlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIseUJBQXlCLFVBQVUsU0FBUztJQUNwRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0JBQXNCO1lBQzVFLGNBQWMscUJBQXFCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsd0JBQXdCLFlBQVc7Z0JBQ3hDLElBQUk7b0JBQ0E7b0JBQ0EsV0FBVyxZQUFXO29CQUNsQixPQUFPO3dCQUNILE1BQU07NEJBQ0YsTUFBTTs0QkFDTixPQUFPOzs7O29CQUluQixnQkFBZ0IsWUFBVztvQkFDdkIsT0FBTzt3QkFDSCxNQUFNOzRCQUNGLE1BQU07NEJBQ04sZUFBZSxDQUNYO2dDQUNJLElBQUk7Z0NBQ0osUUFBUTsrQkFFWjtnQ0FDSSxJQUFJO2dDQUNKLFFBQVE7Ozs7OztnQkFPaEMsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1COztnQkFFekMsV0FBVyxPQUFPLFVBQVMsY0FBYyx3QkFBd0I7b0JBQzdELE9BQU87b0JBQ1AsdUJBQXVCOzs7Z0JBRzNCLFVBQVUsWUFBVztvQkFDakIsS0FBSztvQkFDTCxLQUFLOzs7Z0JBR1QsU0FBUyxhQUFhLFlBQVc7b0JBQzdCLEdBQUcsNERBQTRELFlBQVc7d0JBQ3RFLEtBQUssV0FBVywrQ0FBK0MsWUFDM0QsUUFBUSxLQUFLO3dCQUNqQixxQkFBcUIsUUFBUTt3QkFDN0IsS0FBSzs7OztnQkFJYixTQUFTLG1CQUFtQixZQUFXO29CQUNuQyxHQUFHLHVEQUF1RCxZQUFXO3dCQUNqRSxLQUFLLFdBQVcsK0NBQStDLGlCQUMzRCxRQUFRLEtBQUs7d0JBQ2pCLElBQUksVUFBVTt3QkFDZCxJQUFJLFNBQVMsRUFBQyxJQUFJLEtBQUssUUFBUTt3QkFDL0IsUUFBUSxLQUFLO3dCQUNiLFNBQVMsRUFBQyxJQUFJLEtBQUssUUFBUTt3QkFDM0IsUUFBUSxLQUFLO3dCQUNiLHFCQUFxQixjQUFjO3dCQUNuQyxLQUFLOzs7Ozs7R0FRZCIsImZpbGUiOiJyZXNldC9VbmxvY2tBY2NvdW50U2VydmljZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZXNldE1vZHVsZSBmcm9tICdyZXNldC9SZXNldEFwcE1vZHVsZSc7XG5cbmRlc2NyaWJlKCd1bmxvY2tBY2NvdW50U2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBodHRwLFxuICAgICAgICB1bmxvY2tBY2NvdW50U2VydmljZSxcbiAgICAgICAgcG9zdERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU01TJyxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46ICd0b2tlbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhdXRoUXVlc3REYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1F1ZXN0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhRdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogJ0Fuc3dlciB0byAxJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogJ0Fuc3dlciB0byAyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF91bmxvY2tBY2NvdW50U2VydmljZV8pIHtcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgdW5sb2NrQWNjb3VudFNlcnZpY2UgPSBfdW5sb2NrQWNjb3VudFNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGhTTVMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnU2hvdWxkIGFjY2VwdCBjYWxsIHdpdGggZGF0YSBhbmQgY3JhZnQgY29ycmVjdCBQT1NUIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVCgnL2lkZW50aXR5aXEvdWkvcmVzdC91c2VyUmVzZXQvdW5sb2NrQWNjb3VudCcsIHBvc3REYXRhKCkpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCAnJyk7XG4gICAgICAgICAgICB1bmxvY2tBY2NvdW50U2VydmljZS53aXRoU01TKCd0b2tlbicpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aXRoUXVlc3Rpb25zKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ1Nob3VsZCBhY2NlcHQgY2FsbCB3aXRoIGRhdGEgYW5kIGNyYWZ0IGNvcnJlY3QgUE9TVCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaHR0cC5leHBlY3RQT1NUKCcvaWRlbnRpdHlpcS91aS9yZXN0L3VzZXJSZXNldC91bmxvY2tBY2NvdW50JywgYXV0aFF1ZXN0RGF0YSgpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgdmFyIGFuc3dlcnMgPSBbXTtcbiAgICAgICAgICAgIHZhciBhbnN3ZXIgPSB7aWQ6ICcxJywgYW5zd2VyOiAnQW5zd2VyIHRvIDEnfTtcbiAgICAgICAgICAgIGFuc3dlcnMucHVzaChhbnN3ZXIpO1xuICAgICAgICAgICAgYW5zd2VyID0ge2lkOiAnMicsIGFuc3dlcjogJ0Fuc3dlciB0byAyJ307XG4gICAgICAgICAgICBhbnN3ZXJzLnB1c2goYW5zd2VyKTtcbiAgICAgICAgICAgIHVubG9ja0FjY291bnRTZXJ2aWNlLndpdGhRdWVzdGlvbnMoYW5zd2Vycyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
