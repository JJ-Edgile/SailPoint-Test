System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {

            describe('changePasswordService', function () {
                var http,
                    changePasswordService,
                    postData = function () {
                    return {
                        password: 'password',
                        auth: {
                            type: 'SMS',
                            token: 'token'
                        }
                    };
                },
                    authQuestData = function () {
                    return {
                        password: 'password',
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
                beforeEach(inject(function ($httpBackend, _changePasswordService_) {
                    http = $httpBackend;
                    changePasswordService = _changePasswordService_;
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('withSMS()', function () {
                    it('Should accept call with data and craft correct POST data', function () {
                        http.expectPOST('/identityiq/ui/rest/userReset/changePassword', postData()).respond(200, '');
                        changePasswordService.withSMS('token', 'password');
                        http.flush();
                    });
                });

                describe('withQuestions()', function () {
                    it('Should accept call with data and craft correct POST', function () {
                        http.expectPOST('/identityiq/ui/rest/userReset/changePassword', authQuestData()).respond(200, '');
                        var answers = [];
                        var answer = { id: '1', answer: 'Answer to 1' };
                        answers.push(answer);
                        answer = { id: '2', answer: 'Answer to 2' };
                        answers.push(answer);
                        changePasswordService.withQuestions(answers, 'password');
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L0NoYW5nZVBhc3N3b3JkU2VydmljZVRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlCQUF5QixVQUFVLFNBQVM7SUFDcEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNCQUFzQjtZQUM1RSxjQUFjLHFCQUFxQjs7UUFFdkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLHlCQUF5QixZQUFXO2dCQUN6QyxJQUFJO29CQUNBO29CQUNBLFdBQVcsWUFBVztvQkFDbEIsT0FBTzt3QkFDSCxVQUFVO3dCQUNWLE1BQU07NEJBQ0YsTUFBTTs0QkFDTixPQUFPOzs7O29CQUluQixnQkFBZ0IsWUFBVztvQkFDdkIsT0FBTzt3QkFDSCxVQUFVO3dCQUNWLE1BQU07NEJBQ0YsTUFBTTs0QkFDTixlQUFlLENBQ1g7Z0NBQ0ksSUFBSTtnQ0FDSixRQUFROytCQUVaO2dDQUNJLElBQUk7Z0NBQ0osUUFBUTs7Ozs7O2dCQU9oQyxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7O2dCQUV6QyxXQUFXLE9BQU8sVUFBUyxjQUFjLHlCQUF5QjtvQkFDOUQsT0FBTztvQkFDUCx3QkFBd0I7OztnQkFHNUIsVUFBVSxZQUFXO29CQUNqQixLQUFLO29CQUNMLEtBQUs7OztnQkFHVCxTQUFTLGFBQWEsWUFBVztvQkFDN0IsR0FBRyw0REFBNEQsWUFBVzt3QkFDdEUsS0FBSyxXQUFXLGdEQUFnRCxZQUM1RCxRQUFRLEtBQUs7d0JBQ2pCLHNCQUFzQixRQUFRLFNBQVM7d0JBQ3ZDLEtBQUs7Ozs7Z0JBSWIsU0FBUyxtQkFBbUIsWUFBVztvQkFDbkMsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsS0FBSyxXQUFXLGdEQUFnRCxpQkFDNUQsUUFBUSxLQUFLO3dCQUNqQixJQUFJLFVBQVU7d0JBQ2QsSUFBSSxTQUFTLEVBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQy9CLFFBQVEsS0FBSzt3QkFDYixTQUFTLEVBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQzNCLFFBQVEsS0FBSzt3QkFDYixzQkFBc0IsY0FBYyxTQUFTO3dCQUM3QyxLQUFLOzs7Ozs7R0FRZCIsImZpbGUiOiJyZXNldC9DaGFuZ2VQYXNzd29yZFNlcnZpY2VUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcmVzZXRNb2R1bGUgZnJvbSAncmVzZXQvUmVzZXRBcHBNb2R1bGUnO1xuXG5kZXNjcmliZSgnY2hhbmdlUGFzc3dvcmRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGh0dHAsXG4gICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZSxcbiAgICAgICAgcG9zdERhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU01TJyxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46ICd0b2tlbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhdXRoUXVlc3REYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgIGF1dGg6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1F1ZXN0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhRdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogJ0Fuc3dlciB0byAxJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogJ0Fuc3dlciB0byAyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgIH0pKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbigkaHR0cEJhY2tlbmQsIF9jaGFuZ2VQYXNzd29yZFNlcnZpY2VfKSB7XG4gICAgICAgIGh0dHAgPSAkaHR0cEJhY2tlbmQ7XG4gICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZSA9IF9jaGFuZ2VQYXNzd29yZFNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcbiAgICAgICAgaHR0cC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGhTTVMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnU2hvdWxkIGFjY2VwdCBjYWxsIHdpdGggZGF0YSBhbmQgY3JhZnQgY29ycmVjdCBQT1NUIGRhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0UE9TVCgnL2lkZW50aXR5aXEvdWkvcmVzdC91c2VyUmVzZXQvY2hhbmdlUGFzc3dvcmQnLCBwb3N0RGF0YSgpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgY2hhbmdlUGFzc3dvcmRTZXJ2aWNlLndpdGhTTVMoJ3Rva2VuJywgJ3Bhc3N3b3JkJyk7XG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGhRdWVzdGlvbnMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnU2hvdWxkIGFjY2VwdCBjYWxsIHdpdGggZGF0YSBhbmQgY3JhZnQgY29ycmVjdCBQT1NUJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdFBPU1QoJy9pZGVudGl0eWlxL3VpL3Jlc3QvdXNlclJlc2V0L2NoYW5nZVBhc3N3b3JkJywgYXV0aFF1ZXN0RGF0YSgpKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgJycpO1xuICAgICAgICAgICAgdmFyIGFuc3dlcnMgPSBbXTtcbiAgICAgICAgICAgIHZhciBhbnN3ZXIgPSB7aWQ6ICcxJywgYW5zd2VyOiAnQW5zd2VyIHRvIDEnfTtcbiAgICAgICAgICAgIGFuc3dlcnMucHVzaChhbnN3ZXIpO1xuICAgICAgICAgICAgYW5zd2VyID0ge2lkOiAnMicsIGFuc3dlcjogJ0Fuc3dlciB0byAyJ307XG4gICAgICAgICAgICBhbnN3ZXJzLnB1c2goYW5zd2VyKTtcbiAgICAgICAgICAgIGNoYW5nZVBhc3N3b3JkU2VydmljZS53aXRoUXVlc3Rpb25zKGFuc3dlcnMsICdwYXNzd29yZCcpO1xuICAgICAgICAgICAgaHR0cC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
