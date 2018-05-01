System.register(['test/js/TestInitializer', 'common/warning/WarningModule'], function (_export) {
    'use strict';

    var warningModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWarningWarningModule) {
            warningModule = _commonWarningWarningModule['default'];
        }],
        execute: function () {

            describe('RefreshWarningController', function () {
                var ctrl, service;

                beforeEach(module(warningModule));
                beforeEach(inject(function ($controller, _refreshWarningOverrideService_) {
                    ctrl = $controller('RefreshWarningController');
                    service = _refreshWarningOverrideService_;
                    spyOn(service, 'enableOverride');
                    spyOn(service, 'disableOverride');
                }));

                it('should call through when enableOverride is called', function () {
                    ctrl.enableOverride();
                    expect(service.enableOverride).toHaveBeenCalled();
                });

                it('should call through when disableOverride is called', function () {
                    ctrl.disableOverride();
                    expect(service.disableOverride).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93YXJuaW5nL1JlZnJlc2hXYXJuaW5nQ29udHJvbGxlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpQ0FBaUMsVUFBVSxTQUFTO0lBQWhHOztJQUdJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSw2QkFBNkI7WUFDbkYsZ0JBQWdCLDRCQUE0Qjs7UUFFaEQsU0FBUyxZQUFZOztZQUg3QixTQUFTLDRCQUE0QixZQUFXO2dCQUM1QyxJQUFJLE1BQU07O2dCQUVWLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsYUFBYSxpQ0FBaUM7b0JBQ3JFLE9BQU8sWUFBWTtvQkFDbkIsVUFBVTtvQkFDVixNQUFNLFNBQVM7b0JBQ2YsTUFBTSxTQUFTOzs7Z0JBR25CLEdBQUcscURBQXFELFlBQVc7b0JBQy9ELEtBQUs7b0JBQ0wsT0FBTyxRQUFRLGdCQUFnQjs7O2dCQUduQyxHQUFHLHNEQUFzRCxZQUFXO29CQUNoRSxLQUFLO29CQUNMLE9BQU8sUUFBUSxpQkFBaUI7Ozs7O0dBVXJDIiwiZmlsZSI6ImNvbW1vbi93YXJuaW5nL1JlZnJlc2hXYXJuaW5nQ29udHJvbGxlclRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3YXJuaW5nTW9kdWxlIGZyb20gJ2NvbW1vbi93YXJuaW5nL1dhcm5pbmdNb2R1bGUnO1xuXG5kZXNjcmliZSgnUmVmcmVzaFdhcm5pbmdDb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN0cmwsIHNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3YXJuaW5nTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbnRyb2xsZXIsIF9yZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZV8pIHtcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdSZWZyZXNoV2FybmluZ0NvbnRyb2xsZXInKTtcbiAgICAgICAgc2VydmljZSA9IF9yZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZV87XG4gICAgICAgIHNweU9uKHNlcnZpY2UsICdlbmFibGVPdmVycmlkZScpO1xuICAgICAgICBzcHlPbihzZXJ2aWNlLCAnZGlzYWJsZU92ZXJyaWRlJyk7XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggd2hlbiBlbmFibGVPdmVycmlkZSBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3RybC5lbmFibGVPdmVycmlkZSgpO1xuICAgICAgICBleHBlY3Qoc2VydmljZS5lbmFibGVPdmVycmlkZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggd2hlbiBkaXNhYmxlT3ZlcnJpZGUgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0cmwuZGlzYWJsZU92ZXJyaWRlKCk7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlLmRpc2FibGVPdmVycmlkZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
