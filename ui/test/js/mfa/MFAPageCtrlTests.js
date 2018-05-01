System.register(['test/js/TestInitializer', 'mfa/MFAAppModule'], function (_export) {
    'use strict';

    var mfaAppModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_mfaMFAAppModule) {
            mfaAppModule = _mfaMFAAppModule['default'];
        }],
        execute: function () {

            describe('MFAPageCtrl', function () {
                var ctrl = undefined,
                    formService = undefined,
                    navigationService = undefined,
                    $controller = undefined,
                    $q = undefined,
                    contextPath = undefined;

                beforeEach(module(mfaAppModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_$controller_, _$q_, SP_CONTEXT_PATH) {
                    $controller = _$controller_;
                    $q = _$q_;
                    contextPath = SP_CONTEXT_PATH;

                    formService = {
                        getSessionForm: jasmine.createSpy().and.returnValue($q.when({}))
                    };

                    navigationService = {
                        go: jasmine.createSpy()
                    };
                }));

                function createController() {
                    ctrl = $controller('MFAPageCtrl', {
                        formService: formService,
                        navigationService: navigationService
                    });
                }

                describe('load', function () {

                    it('should load the form when initialized', function () {
                        createController();

                        expect(formService.getSessionForm).toHaveBeenCalled();
                    });
                });

                describe('onSuccess', function () {

                    it('should reload the form when not complete', function () {
                        var result = {
                            nextWorkItemType: 'Form'
                        };

                        createController();

                        ctrl.onSuccess(result);

                        expect(formService.getSessionForm.calls.count()).toEqual(2);
                    });

                    it('should navigate to configured login url upon cancellation', function () {
                        var result = {
                            nextWorkItemType: undefined,
                            cancelled: true
                        };

                        createController();

                        ctrl.onSuccess(result);

                        expect(navigationService.go).toHaveBeenCalledWith({ url: contextPath + '/external/mfa/mfa-cancel.jsf' });
                    });

                    it('should navigate to success upon completion', function () {
                        var result = {
                            nextWorkItemType: undefined
                        };

                        createController();

                        ctrl.onSuccess(result);

                        expect(navigationService.go).toHaveBeenCalledWith({ url: contextPath + '/external/mfa/mfa.jsf' });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1mYS9NRkFQYWdlQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQkFBcUIsVUFBVSxTQUFTO0lBQ3BGOztJQUVJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxrQkFBa0I7WUFDeEUsZUFBZSxpQkFBaUI7O1FBRXBDLFNBQVMsWUFBWTs7WUFGN0IsU0FBUyxlQUFlLFlBQVc7Z0JBQy9CLElBQUksT0FBSTtvQkFDSixjQUFXO29CQUNYLG9CQUFpQjtvQkFDakIsY0FBVztvQkFDWCxLQUFFO29CQUNGLGNBQVc7O2dCQUVmLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQVMsZUFBZSxNQUFNLGlCQUFpQjtvQkFDN0QsY0FBYztvQkFDZCxLQUFLO29CQUNMLGNBQWM7O29CQUVkLGNBQWM7d0JBQ1YsZ0JBQWdCLFFBQVEsWUFBWSxJQUFJLFlBQVksR0FBRyxLQUFLOzs7b0JBR2hFLG9CQUFvQjt3QkFDaEIsSUFBSSxRQUFROzs7O2dCQUlwQixTQUFTLG1CQUFtQjtvQkFDeEIsT0FBTyxZQUFZLGVBQWU7d0JBQzlCLGFBQWE7d0JBQ2IsbUJBQW1COzs7O2dCQUkzQixTQUFTLFFBQVEsWUFBVzs7b0JBRXhCLEdBQUcseUNBQXlDLFlBQVc7d0JBQ25EOzt3QkFFQSxPQUFPLFlBQVksZ0JBQWdCOzs7O2dCQUszQyxTQUFTLGFBQWEsWUFBVzs7b0JBRTdCLEdBQUcsNENBQTRDLFlBQVc7d0JBQ3RELElBQUksU0FBUzs0QkFDVCxrQkFBa0I7Ozt3QkFHdEI7O3dCQUVBLEtBQUssVUFBVTs7d0JBRWYsT0FBTyxZQUFZLGVBQWUsTUFBTSxTQUFTLFFBQVE7OztvQkFHN0QsR0FBRyw2REFBNkQsWUFBVzt3QkFDdkUsSUFBSSxTQUFTOzRCQUNMLGtCQUFrQjs0QkFDbEIsV0FBVzs7O3dCQUduQjs7d0JBRUEsS0FBSyxVQUFVOzt3QkFFZixPQUFPLGtCQUFrQixJQUFJLHFCQUFxQixFQUFFLEtBQUssY0FBYzs7O29CQUczRSxHQUFHLDhDQUE4QyxZQUFXO3dCQUN4RCxJQUFJLFNBQVM7NEJBQ1Qsa0JBQWtCOzs7d0JBR3RCOzt3QkFFQSxLQUFLLFVBQVU7O3dCQUVmLE9BQU8sa0JBQWtCLElBQUkscUJBQXFCLEVBQUUsS0FBSyxjQUFjOzs7Ozs7R0FTaEYiLCJmaWxlIjoibWZhL01GQVBhZ2VDdHJsVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbWZhQXBwTW9kdWxlIGZyb20gJ21mYS9NRkFBcHBNb2R1bGUnO1xuXG5kZXNjcmliZSgnTUZBUGFnZUN0cmwnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgY3RybCxcbiAgICAgICAgZm9ybVNlcnZpY2UsXG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICAkY29udHJvbGxlcixcbiAgICAgICAgJHEsXG4gICAgICAgIGNvbnRleHRQYXRoO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobWZhQXBwTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRxXywgU1BfQ09OVEVYVF9QQVRIKSB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBjb250ZXh0UGF0aCA9IFNQX0NPTlRFWFRfUEFUSDtcblxuICAgICAgICBmb3JtU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdldFNlc3Npb25Gb3JtOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKHt9KSlcbiAgICAgICAgfTtcblxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IHtcbiAgICAgICAgICAgIGdvOiBqYXNtaW5lLmNyZWF0ZVNweSgpXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdNRkFQYWdlQ3RybCcsIHtcbiAgICAgICAgICAgIGZvcm1TZXJ2aWNlOiBmb3JtU2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnbG9hZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgbG9hZCB0aGUgZm9ybSB3aGVuIGluaXRpYWxpemVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmb3JtU2VydmljZS5nZXRTZXNzaW9uRm9ybSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVsb2FkIHRoZSBmb3JtIHdoZW4gbm90IGNvbXBsZXRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6ICdGb3JtJ1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLm9uU3VjY2VzcyhyZXN1bHQpO1xuXG4gICAgICAgICAgICBleHBlY3QoZm9ybVNlcnZpY2UuZ2V0U2Vzc2lvbkZvcm0uY2FsbHMuY291bnQoKSkudG9FcXVhbCgyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSB0byBjb25maWd1cmVkIGxvZ2luIHVybCB1cG9uIGNhbmNlbGxhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFdvcmtJdGVtVHlwZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG5cbiAgICAgICAgICAgIGN0cmwub25TdWNjZXNzKHJlc3VsdCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyB1cmw6IGNvbnRleHRQYXRoICsgJy9leHRlcm5hbC9tZmEvbWZhLWNhbmNlbC5qc2YnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIHN1Y2Nlc3MgdXBvbiBjb21wbGV0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIG5leHRXb3JrSXRlbVR5cGU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuXG4gICAgICAgICAgICBjdHJsLm9uU3VjY2VzcyhyZXN1bHQpO1xuXG4gICAgICAgICAgICBleHBlY3QobmF2aWdhdGlvblNlcnZpY2UuZ28pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdXJsOiBjb250ZXh0UGF0aCArICcvZXh0ZXJuYWwvbWZhL21mYS5qc2YnIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
