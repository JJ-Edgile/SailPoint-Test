System.register(['test/js/TestInitializer', 'mfa/MFAAppModule'], function (_export) {
    'use strict';

    var mfaAppModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_mfaMFAAppModule) {
            mfaAppModule = _mfaMFAAppModule['default'];
        }],
        execute: function () {

            describe('MFASelectionCtrl', function () {
                var $controller = undefined,
                    $q = undefined,
                    navigationService = undefined,
                    $rootScope = undefined,
                    mfaService = undefined,
                    ctrl = undefined;

                beforeEach(function () {
                    module(mfaAppModule);
                    module(function ($provide) {
                        $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    });
                    inject(function (_$controller_, _$q_, _$rootScope_) {
                        $controller = _$controller_;
                        $q = _$q_;
                        $rootScope = _$rootScope_;
                    });

                    mfaService = {
                        postSelectedMFAWorkflow: jasmine.createSpy().and.returnValue($q.resolve({})),
                        getMFAWorkflowNames: jasmine.createSpy().and.returnValue($q.when())
                    };

                    navigationService = {
                        go: jasmine.createSpy()
                    };
                });

                function createController(mfaService) {
                    ctrl = $controller('MFASelectionCtrl', {
                        MFAService: mfaService,
                        navigationService: navigationService
                    });

                    ctrl.selectionModel = {
                        mfaWorkflow: 'testWorkflow'
                    };
                }

                describe('constructor', function () {
                    it('should load mfa workflow names when constructed', function () {
                        createController(mfaService);

                        expect(mfaService.getMFAWorkflowNames).toHaveBeenCalled();
                    });

                    it('should update error if loading mfa workflow names fails', function () {
                        mfaService.getMFAWorkflowNames = jasmine.createSpy().and.returnValue($q.reject('test_error_message'));
                        createController(mfaService);

                        $rootScope.$apply();
                        expect(mfaService.getMFAWorkflowNames).toHaveBeenCalled();
                        expect(ctrl.errorMessages).toEqual('test_error_message');
                    });
                });

                describe('submit', function () {
                    it('should post workflowname and navigate to next page', function () {
                        createController(mfaService);

                        ctrl.submit();
                        $rootScope.$apply();
                        expect(mfaService.postSelectedMFAWorkflow).toHaveBeenCalled();
                        expect(navigationService.go).toHaveBeenCalledWith({
                            url: '/identityiq/external/mfa/mfa.jsf'
                        });
                    });

                    it('should update errors if it fails', function () {
                        mfaService.postSelectedMFAWorkflow = jasmine.createSpy().and.returnValue($q.reject('test_error_message'));
                        createController(mfaService);
                        ctrl.submit();
                        $rootScope.$apply();
                        expect(mfaService.postSelectedMFAWorkflow).toHaveBeenCalled();
                        expect(ctrl.errorMessages).toEqual('test_error_message');
                    });
                });

                describe('cancel', function () {
                    it('should navigate back to login page', function () {
                        createController(mfaService);

                        ctrl.cancel();
                        expect(navigationService.go).toHaveBeenCalledWith({
                            url: '/identityiq/external/mfa/mfa-cancel.jsf',
                            stateParams: { location: 'replace' }
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1mYS9NRkFTZWxlY3Rpb25DdHJsVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUJBQXFCLFVBQVUsU0FBUztJQUNoRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsa0JBQWtCO1lBQ3hFLGVBQWUsaUJBQWlCOztRQUVwQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0JBQW9CLFlBQVc7Z0JBQ3BDLElBQUksY0FBVztvQkFBRSxLQUFFO29CQUFFLG9CQUFpQjtvQkFBRSxhQUFVO29CQUFFLGFBQVU7b0JBQUUsT0FBSTs7Z0JBRXBFLFdBQVksWUFBVztvQkFDbkIsT0FBTztvQkFDUCxPQUFRLFVBQVMsVUFBVTt3QkFDdkIsU0FBUyxTQUFTLG1CQUFtQjs7b0JBRXpDLE9BQVEsVUFBUyxlQUFlLE1BQU0sY0FBYzt3QkFDaEQsY0FBYzt3QkFDZCxLQUFLO3dCQUNMLGFBQWE7OztvQkFHakIsYUFBYTt3QkFDVCx5QkFBeUIsUUFBUSxZQUFZLElBQUksWUFBWSxHQUFHLFFBQVE7d0JBQ3hFLHFCQUFxQixRQUFRLFlBQVksSUFBSSxZQUFZLEdBQUc7OztvQkFHaEUsb0JBQW9CO3dCQUNoQixJQUFJLFFBQVE7Ozs7Z0JBSXBCLFNBQVMsaUJBQWlCLFlBQVk7b0JBQ2xDLE9BQU8sWUFBWSxvQkFBb0I7d0JBQ25DLFlBQVk7d0JBQ1osbUJBQW1COzs7b0JBR3ZCLEtBQUssaUJBQWlCO3dCQUNsQixhQUFhOzs7O2dCQUlyQixTQUFTLGVBQWUsWUFBVztvQkFDL0IsR0FBRyxtREFBbUQsWUFBVzt3QkFDNUQsaUJBQWlCOzt3QkFFakIsT0FBTyxXQUFXLHFCQUFxQjs7O29CQUc1QyxHQUFHLDJEQUEyRCxZQUFXO3dCQUNwRSxXQUFXLHNCQUFzQixRQUFRLFlBQVksSUFBSSxZQUFZLEdBQUcsT0FBTzt3QkFDL0UsaUJBQWlCOzt3QkFFakIsV0FBVzt3QkFDWCxPQUFPLFdBQVcscUJBQXFCO3dCQUN2QyxPQUFPLEtBQUssZUFBZSxRQUFROzs7O2dCQUk1QyxTQUFTLFVBQVUsWUFBVztvQkFDMUIsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsaUJBQWlCOzt3QkFFakIsS0FBSzt3QkFDTCxXQUFXO3dCQUNYLE9BQU8sV0FBVyx5QkFBeUI7d0JBQzNDLE9BQU8sa0JBQWtCLElBQUkscUJBQXFCOzRCQUM5QyxLQUFLOzs7O29CQUliLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLFdBQVcsMEJBQTBCLFFBQVEsWUFBWSxJQUFJLFlBQVksR0FBRyxPQUFPO3dCQUNuRixpQkFBaUI7d0JBQ2pCLEtBQUs7d0JBQ0wsV0FBVzt3QkFDWCxPQUFPLFdBQVcseUJBQXlCO3dCQUMzQyxPQUFPLEtBQUssZUFBZSxRQUFROzs7O2dCQUk1QyxTQUFTLFVBQVUsWUFBVztvQkFDekIsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsaUJBQWlCOzt3QkFFakIsS0FBSzt3QkFDTCxPQUFPLGtCQUFrQixJQUFJLHFCQUFxQjs0QkFDOUMsS0FBSzs0QkFDTCxhQUFhLEVBQUUsVUFBVTs7Ozs7OztHQW1CdEMiLCJmaWxlIjoibWZhL01GQVNlbGVjdGlvbkN0cmxUZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbWZhQXBwTW9kdWxlIGZyb20gJ21mYS9NRkFBcHBNb2R1bGUnO1xuXG5kZXNjcmliZSgnTUZBU2VsZWN0aW9uQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCAkY29udHJvbGxlciwgJHEsIG5hdmlnYXRpb25TZXJ2aWNlLCAkcm9vdFNjb3BlLCBtZmFTZXJ2aWNlLCBjdHJsO1xuXG4gICAgYmVmb3JlRWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vZHVsZShtZmFBcHBNb2R1bGUpO1xuICAgICAgICBtb2R1bGUoIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbmplY3QoIGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sIF8kcV8sIF8kcm9vdFNjb3BlXykge1xuICAgICAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWZhU2VydmljZSA9IHtcbiAgICAgICAgICAgIHBvc3RTZWxlY3RlZE1GQVdvcmtmbG93OiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZXNvbHZlKHt9KSksXG4gICAgICAgICAgICBnZXRNRkFXb3JrZmxvd05hbWVzOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpXG4gICAgICAgIH07XG5cbiAgICAgICAgbmF2aWdhdGlvblNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnbzogamFzbWluZS5jcmVhdGVTcHkoKVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihtZmFTZXJ2aWNlKSB7XG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignTUZBU2VsZWN0aW9uQ3RybCcsIHtcbiAgICAgICAgICAgIE1GQVNlcnZpY2U6IG1mYVNlcnZpY2UsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTogbmF2aWdhdGlvblNlcnZpY2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY3RybC5zZWxlY3Rpb25Nb2RlbCA9IHtcbiAgICAgICAgICAgIG1mYVdvcmtmbG93OiAndGVzdFdvcmtmbG93J1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGxvYWQgbWZhIHdvcmtmbG93IG5hbWVzIHdoZW4gY29uc3RydWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKG1mYVNlcnZpY2UpO1xuXG4gICAgICAgICAgICAgZXhwZWN0KG1mYVNlcnZpY2UuZ2V0TUZBV29ya2Zsb3dOYW1lcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSBlcnJvciBpZiBsb2FkaW5nIG1mYSB3b3JrZmxvdyBuYW1lcyBmYWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgIG1mYVNlcnZpY2UuZ2V0TUZBV29ya2Zsb3dOYW1lcyA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKCRxLnJlamVjdCgndGVzdF9lcnJvcl9tZXNzYWdlJykpO1xuICAgICAgICAgICAgIGNyZWF0ZUNvbnRyb2xsZXIobWZhU2VydmljZSk7XG5cbiAgICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgIGV4cGVjdChtZmFTZXJ2aWNlLmdldE1GQVdvcmtmbG93TmFtZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICBleHBlY3QoY3RybC5lcnJvck1lc3NhZ2VzKS50b0VxdWFsKCd0ZXN0X2Vycm9yX21lc3NhZ2UnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3VibWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgcG9zdCB3b3JrZmxvd25hbWUgYW5kIG5hdmlnYXRlIHRvIG5leHQgcGFnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcihtZmFTZXJ2aWNlKTtcblxuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QobWZhU2VydmljZS5wb3N0U2VsZWN0ZWRNRkFXb3JrZmxvdykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2lkZW50aXR5aXEvZXh0ZXJuYWwvbWZhL21mYS5qc2YnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB1cGRhdGUgZXJyb3JzIGlmIGl0IGZhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZmFTZXJ2aWNlLnBvc3RTZWxlY3RlZE1GQVdvcmtmbG93ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoJHEucmVqZWN0KCd0ZXN0X2Vycm9yX21lc3NhZ2UnKSk7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKG1mYVNlcnZpY2UpO1xuICAgICAgICAgICAgY3RybC5zdWJtaXQoKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QobWZhU2VydmljZS5wb3N0U2VsZWN0ZWRNRkFXb3JrZmxvdykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuZXJyb3JNZXNzYWdlcykudG9FcXVhbCgndGVzdF9lcnJvcl9tZXNzYWdlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICBkZXNjcmliZSgnY2FuY2VsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbmF2aWdhdGUgYmFjayB0byBsb2dpbiBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKG1mYVNlcnZpY2UpO1xuXG4gICAgICAgICAgICBjdHJsLmNhbmNlbCgpO1xuICAgICAgICAgICAgZXhwZWN0KG5hdmlnYXRpb25TZXJ2aWNlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2lkZW50aXR5aXEvZXh0ZXJuYWwvbWZhL21mYS1jYW5jZWwuanNmJyxcbiAgICAgICAgICAgICAgICBzdGF0ZVBhcmFtczogeyBsb2NhdGlvbjogJ3JlcGxhY2UnIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
