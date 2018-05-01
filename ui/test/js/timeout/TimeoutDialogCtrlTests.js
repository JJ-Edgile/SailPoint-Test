System.register(['test/js/TestInitializer', 'timeout/TimeoutModule'], function (_export) {
    'use strict';

    var timeoutModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_timeoutTimeoutModule) {
            timeoutModule = _timeoutTimeoutModule['default'];
        }],
        execute: function () {

            describe('TimeoutDialogCtrl', function () {
                var ctrl, scope, mockModalInstance, refreshWarningOverrideService;

                beforeEach(module(timeoutModule));

                beforeEach(inject(function ($controller, $rootScope, $window, _refreshWarningOverrideService_) {
                    scope = $rootScope.$new();
                    mockModalInstance = {
                        dismiss: angular.noop
                    };
                    refreshWarningOverrideService = _refreshWarningOverrideService_;
                    ctrl = $controller('TimeoutDialogCtrl', {
                        $scope: scope,
                        $uibModalInstance: mockModalInstance,
                        $window: $window,
                        refreshWarningOverrideService: refreshWarningOverrideService
                    });

                    spyOn(mockModalInstance, 'dismiss');
                    spyOn(refreshWarningOverrideService, 'enableOverride');
                }));

                describe('login', function () {
                    it('should call dismiss on the modal instance', function () {
                        scope.login();
                        expect(mockModalInstance.dismiss).toHaveBeenCalled();
                    });

                    it('should call enableOverride', function () {
                        scope.login();
                        expect(refreshWarningOverrideService.enableOverride).toHaveBeenCalled();
                    });
                });

                describe('close', function () {
                    it('should call dismiss on the modal instance', function () {
                        scope.close();
                        expect(mockModalInstance.dismiss).toHaveBeenCalled();
                    });
                });

                describe('ping', function () {
                    var $httpBackend = undefined;

                    beforeEach(inject(function (_$httpBackend_) {
                        $httpBackend = _$httpBackend_;
                    }));

                    it('should ping the server', function () {
                        $httpBackend.expectGET('/rest/ping').respond(200);
                        scope.ping();
                        $httpBackend.flush();
                        expect(mockModalInstance.dismiss).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWVvdXQvVGltZW91dERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLFVBQVUsU0FBUztJQUNyRjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGdCQUFnQixzQkFBc0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxxQkFBcUIsWUFBVztnQkFDckMsSUFBSSxNQUFNLE9BQU8sbUJBQW1COztnQkFFcEMsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsYUFBYSxZQUFZLFNBQVMsaUNBQWlDO29CQUMxRixRQUFRLFdBQVc7b0JBQ25CLG9CQUFvQjt3QkFDaEIsU0FBUyxRQUFROztvQkFFckIsZ0NBQWdDO29CQUNoQyxPQUFPLFlBQVkscUJBQ2Y7d0JBQ0ksUUFBUTt3QkFDUixtQkFBbUI7d0JBQ25CLFNBQVM7d0JBQ1QsK0JBQStCOzs7b0JBR3ZDLE1BQU0sbUJBQW1CO29CQUN6QixNQUFNLCtCQUErQjs7O2dCQUd6QyxTQUFTLFNBQVMsWUFBVztvQkFDekIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsTUFBTTt3QkFDTixPQUFPLGtCQUFrQixTQUFTOzs7b0JBR3RDLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLE1BQU07d0JBQ04sT0FBTyw4QkFBOEIsZ0JBQWdCOzs7O2dCQUk3RCxTQUFTLFNBQVMsWUFBVztvQkFDekIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsTUFBTTt3QkFDTixPQUFPLGtCQUFrQixTQUFTOzs7O2dCQUkxQyxTQUFTLFFBQVEsWUFBVztvQkFDeEIsSUFBSSxlQUFZOztvQkFFaEIsV0FBVyxPQUFPLFVBQVMsZ0JBQWdCO3dCQUN2QyxlQUFlOzs7b0JBR25CLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLGFBQWEsVUFBVSxjQUFjLFFBQVE7d0JBQzdDLE1BQU07d0JBQ04sYUFBYTt3QkFDYixPQUFPLGtCQUFrQixTQUFTOzs7Ozs7R0FXM0MiLCJmaWxlIjoidGltZW91dC9UaW1lb3V0RGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5cbmltcG9ydCB0aW1lb3V0TW9kdWxlIGZyb20gJ3RpbWVvdXQvVGltZW91dE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdUaW1lb3V0RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdHJsLCBzY29wZSwgbW9ja01vZGFsSW5zdGFuY2UsIHJlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGltZW91dE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICR3aW5kb3csIF9yZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZV8pIHtcbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgbW9ja01vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBkaXNtaXNzOiBhbmd1bGFyLm5vb3BcbiAgICAgICAgfTtcbiAgICAgICAgcmVmcmVzaFdhcm5pbmdPdmVycmlkZVNlcnZpY2UgPSBfcmVmcmVzaFdhcm5pbmdPdmVycmlkZVNlcnZpY2VfO1xuICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ1RpbWVvdXREaWFsb2dDdHJsJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkc2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlOiBtb2NrTW9kYWxJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAkd2luZG93OiAkd2luZG93LFxuICAgICAgICAgICAgICAgIHJlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlOiByZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc3B5T24obW9ja01vZGFsSW5zdGFuY2UsICdkaXNtaXNzJyk7XG4gICAgICAgIHNweU9uKHJlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlLCAnZW5hYmxlT3ZlcnJpZGUnKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnbG9naW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGRpc21pc3Mgb24gdGhlIG1vZGFsIGluc3RhbmNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZS5sb2dpbigpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tNb2RhbEluc3RhbmNlLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGVuYWJsZU92ZXJyaWRlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzY29wZS5sb2dpbigpO1xuICAgICAgICAgICAgZXhwZWN0KHJlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlLmVuYWJsZU92ZXJyaWRlKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBkaXNtaXNzIG9uIHRoZSBtb2RhbCBpbnN0YW5jZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2NvcGUuY2xvc2UoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2NrTW9kYWxJbnN0YW5jZS5kaXNtaXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3BpbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0ICRodHRwQmFja2VuZDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGh0dHBCYWNrZW5kXykge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIHBpbmcgdGhlIHNlcnZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCgnL3Jlc3QvcGluZycpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHNjb3BlLnBpbmcoKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KG1vY2tNb2RhbEluc3RhbmNlLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
