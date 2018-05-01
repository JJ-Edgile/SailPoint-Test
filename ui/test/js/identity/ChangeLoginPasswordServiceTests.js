System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('ChangeLoginPasswordService', function () {
                var changeLoginPasswordService = undefined,
                    $httpBackend = undefined,
                    baseUrl = undefined,
                    urlRoot = '/identityiq',
                    identityId = '123',
                    quickLink = 'viewidentity';

                beforeEach(module(identityModule, testModule, function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', urlRoot);
                }));

                beforeEach(inject(function (_changeLoginPasswordService_, _$httpBackend_) {
                    changeLoginPasswordService = _changeLoginPasswordService_;
                    $httpBackend = _$httpBackend_;
                    baseUrl = urlRoot + '/ui/rest/quickLinks/' + quickLink + '/identities/' + identityId;
                }));

                describe('getLoginPasswordPolicy', function () {
                    function assertExpectedRequest(expected) {
                        var constraintsUrl = baseUrl + '/loginConstraints',
                            actual = undefined;
                        $httpBackend.expectGET(constraintsUrl).respond(200, expected);
                        changeLoginPasswordService.getLoginPasswordPolicy(identityId, quickLink).then(function (response) {
                            actual = response;
                        });
                        $httpBackend.flush();
                        expect(actual).toEqual(expected);
                    }

                    it('should pass through the empty policy', function () {
                        assertExpectedRequest([]);
                    });

                    it('should pass through a policy', function () {
                        assertExpectedRequest(['first constraint', 'second constraint']);
                    });
                });

                describe('submitPasswordChange', function () {
                    var PasswordChangeError = undefined,
                        WorkflowResultItem = undefined;

                    beforeEach(inject(function (_PasswordChangeError_, _WorkflowResultItem_) {
                        PasswordChangeError = _PasswordChangeError_;
                        WorkflowResultItem = _WorkflowResultItem_;
                    }));

                    function assertExpectedRequest(reject, response, expected) {
                        var constraintsUrl = baseUrl + '/loginPassword',
                            actual = undefined,
                            promise = undefined;
                        $httpBackend.expectPUT(constraintsUrl).respond(reject ? 400 : 200, response);
                        promise = changeLoginPasswordService.submitPasswordChange(identityId, quickLink);
                        if (reject) {
                            promise['catch'](function (error) {
                                actual = error;
                            });
                        } else {
                            promise.then(function (response) {
                                actual = response;
                            });
                        }
                        $httpBackend.flush();
                        expect(actual).toEqual(expected);
                    }

                    it('should marshall WorkItemResult from resolve', function () {
                        var response = {
                            workflowStatus: 'Completed',
                            identityRequestId: '123'
                        };

                        assertExpectedRequest(false, response, new WorkflowResultItem(response));
                    });

                    it('should marshall PasswordChangeError from 400 reject', function () {
                        var response = {
                            messages: ['error 1', 'error 2'],
                            constraintsViolation: true
                        };

                        assertExpectedRequest(true, response, new PasswordChangeError(response));
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0NoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSTdHOztJQUVBLElBQUksZ0JBQWdCO0lBQ3BCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsOEJBQThCLFlBQVc7Z0JBQzlDLElBQUksNkJBQTBCO29CQUFFLGVBQVk7b0JBQUUsVUFBTztvQkFDakQsVUFBVTtvQkFDVixhQUFhO29CQUNiLFlBQVk7O2dCQUVoQixXQUFXLE9BQU8sZ0JBQWdCLFlBQVksVUFBUyxVQUFVO29CQUM3RCxTQUFTLFNBQVMsbUJBQW1COzs7Z0JBR3pDLFdBQVcsT0FBTyxVQUFTLDhCQUE4QixnQkFBZ0I7b0JBQ3JFLDZCQUE2QjtvQkFDN0IsZUFBZTtvQkFDZixVQUFhLFVBQU8seUJBQXVCLFlBQVMsaUJBQWU7OztnQkFHdkUsU0FBUywwQkFBMEIsWUFBVztvQkFDMUMsU0FBUyxzQkFBc0IsVUFBVTt3QkFDckMsSUFBSSxpQkFBaUIsVUFBVTs0QkFBcUIsU0FBTTt3QkFDMUQsYUFBYSxVQUFVLGdCQUFnQixRQUFRLEtBQUs7d0JBQ3BELDJCQUEyQix1QkFBdUIsWUFBWSxXQUFXLEtBQUssVUFBQSxVQUFZOzRCQUN0RixTQUFTOzt3QkFFYixhQUFhO3dCQUNiLE9BQU8sUUFBUSxRQUFROzs7b0JBRzNCLEdBQUcsd0NBQXdDLFlBQVc7d0JBQ2xELHNCQUFzQjs7O29CQUcxQixHQUFHLGdDQUFnQyxZQUFXO3dCQUMxQyxzQkFBc0IsQ0FBQyxvQkFBb0I7Ozs7Z0JBSW5ELFNBQVMsd0JBQXdCLFlBQVc7b0JBQ3hDLElBQUksc0JBQW1CO3dCQUFFLHFCQUFrQjs7b0JBRTNDLFdBQVcsT0FBTyxVQUFTLHVCQUF1QixzQkFBc0I7d0JBQ3BFLHNCQUFzQjt3QkFDdEIscUJBQXFCOzs7b0JBR3pCLFNBQVMsc0JBQXNCLFFBQVEsVUFBVSxVQUFVO3dCQUN2RCxJQUFJLGlCQUFpQixVQUFVOzRCQUFrQixTQUFNOzRCQUFFLFVBQU87d0JBQ2hFLGFBQWEsVUFBVSxnQkFBZ0IsUUFBUSxTQUFTLE1BQU0sS0FBSzt3QkFDbkUsVUFBVSwyQkFBMkIscUJBQXFCLFlBQVk7d0JBQ3RFLElBQUcsUUFBUTs0QkFDUCxRQUFPLFNBQU8sVUFBQSxPQUFTO2dDQUNuQixTQUFTOzsrQkFFVjs0QkFDSCxRQUFRLEtBQUssVUFBQSxVQUFZO2dDQUNyQixTQUFTOzs7d0JBR2pCLGFBQWE7d0JBQ2IsT0FBTyxRQUFRLFFBQVE7OztvQkFHM0IsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsSUFBSSxXQUFXOzRCQUNYLGdCQUFnQjs0QkFDaEIsbUJBQW1COzs7d0JBR3ZCLHNCQUFzQixPQUFPLFVBQVUsSUFBSSxtQkFBbUI7OztvQkFHbEUsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsSUFBSSxXQUFXOzRCQUNYLFVBQVUsQ0FBQyxXQUFXOzRCQUN0QixzQkFBc0I7Ozt3QkFHMUIsc0JBQXNCLE1BQU0sVUFBVSxJQUFJLG9CQUFvQjs7Ozs7O0dBb0J2RSIsImZpbGUiOiJpZGVudGl0eS9DaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ0NoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsIGJhc2VVcmwsXG4gICAgICAgIHVybFJvb3QgPSAnL2lkZW50aXR5aXEnLFxuICAgICAgICBpZGVudGl0eUlkID0gJzEyMycsXG4gICAgICAgIHF1aWNrTGluayA9ICd2aWV3aWRlbnRpdHknO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUsIHRlc3RNb2R1bGUsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DT05URVhUX1BBVEgnLCB1cmxSb290KTtcbiAgICB9KSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfY2hhbmdlTG9naW5QYXNzd29yZFNlcnZpY2VfLCBfJGh0dHBCYWNrZW5kXykge1xuICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZSA9IF9jaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZV87XG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xuICAgICAgICBiYXNlVXJsID0gYCR7dXJsUm9vdH0vdWkvcmVzdC9xdWlja0xpbmtzLyR7cXVpY2tMaW5rfS9pZGVudGl0aWVzLyR7aWRlbnRpdHlJZH1gO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdnZXRMb2dpblBhc3N3b3JkUG9saWN5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIGFzc2VydEV4cGVjdGVkUmVxdWVzdChleHBlY3RlZCkge1xuICAgICAgICAgICAgbGV0IGNvbnN0cmFpbnRzVXJsID0gYmFzZVVybCArICcvbG9naW5Db25zdHJhaW50cycsIGFjdHVhbDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY29uc3RyYWludHNVcmwpLnJlc3BvbmQoMjAwLCBleHBlY3RlZCk7XG4gICAgICAgICAgICBjaGFuZ2VMb2dpblBhc3N3b3JkU2VydmljZS5nZXRMb2dpblBhc3N3b3JkUG9saWN5KGlkZW50aXR5SWQsIHF1aWNrTGluaykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0dWFsID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjdHVhbCkudG9FcXVhbChleHBlY3RlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpdCgnc2hvdWxkIHBhc3MgdGhyb3VnaCB0aGUgZW1wdHkgcG9saWN5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhc3NlcnRFeHBlY3RlZFJlcXVlc3QoW10pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHBhc3MgdGhyb3VnaCBhIHBvbGljeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXNzZXJ0RXhwZWN0ZWRSZXF1ZXN0KFsnZmlyc3QgY29uc3RyYWludCcsICdzZWNvbmQgY29uc3RyYWludCddKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0UGFzc3dvcmRDaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IFBhc3N3b3JkQ2hhbmdlRXJyb3IsIFdvcmtmbG93UmVzdWx0SXRlbTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfUGFzc3dvcmRDaGFuZ2VFcnJvcl8sIF9Xb3JrZmxvd1Jlc3VsdEl0ZW1fKSB7XG4gICAgICAgICAgICBQYXNzd29yZENoYW5nZUVycm9yID0gX1Bhc3N3b3JkQ2hhbmdlRXJyb3JfO1xuICAgICAgICAgICAgV29ya2Zsb3dSZXN1bHRJdGVtID0gX1dvcmtmbG93UmVzdWx0SXRlbV87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBmdW5jdGlvbiBhc3NlcnRFeHBlY3RlZFJlcXVlc3QocmVqZWN0LCByZXNwb25zZSwgZXhwZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBjb25zdHJhaW50c1VybCA9IGJhc2VVcmwgKyAnL2xvZ2luUGFzc3dvcmQnLCBhY3R1YWwsIHByb21pc2U7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0UFVUKGNvbnN0cmFpbnRzVXJsKS5yZXNwb25kKHJlamVjdCA/IDQwMCA6IDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGNoYW5nZUxvZ2luUGFzc3dvcmRTZXJ2aWNlLnN1Ym1pdFBhc3N3b3JkQ2hhbmdlKGlkZW50aXR5SWQsIHF1aWNrTGluayk7XG4gICAgICAgICAgICBpZihyZWplY3QpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0dWFsID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdHVhbCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgICAgICBleHBlY3QoYWN0dWFsKS50b0VxdWFsKGV4cGVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgbWFyc2hhbGwgV29ya0l0ZW1SZXN1bHQgZnJvbSByZXNvbHZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgd29ya2Zsb3dTdGF0dXM6ICdDb21wbGV0ZWQnLFxuICAgICAgICAgICAgICAgIGlkZW50aXR5UmVxdWVzdElkOiAnMTIzJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgYXNzZXJ0RXhwZWN0ZWRSZXF1ZXN0KGZhbHNlLCByZXNwb25zZSwgbmV3IFdvcmtmbG93UmVzdWx0SXRlbShyZXNwb25zZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG1hcnNoYWxsIFBhc3N3b3JkQ2hhbmdlRXJyb3IgZnJvbSA0MDAgcmVqZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFsnZXJyb3IgMScsICdlcnJvciAyJ10sXG4gICAgICAgICAgICAgICAgY29uc3RyYWludHNWaW9sYXRpb246IHRydWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGFzc2VydEV4cGVjdGVkUmVxdWVzdCh0cnVlLCByZXNwb25zZSwgbmV3IFBhc3N3b3JkQ2hhbmdlRXJyb3IocmVzcG9uc2UpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
