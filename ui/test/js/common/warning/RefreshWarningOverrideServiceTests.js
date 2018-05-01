System.register(['test/js/TestInitializer', 'common/warning/WarningModule'], function (_export) {
    'use strict';

    var warningModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWarningWarningModule) {
            warningModule = _commonWarningWarningModule['default'];
        }],
        execute: function () {

            describe('RefreshWarningService', function () {
                var service;

                beforeEach(module(warningModule));
                beforeEach(inject(function (_refreshWarningOverrideService_) {
                    service = _refreshWarningOverrideService_;
                }));

                it('should default to not overriding', function () {
                    expect(service.isOverride()).toBeFalsy();
                });

                it('should override when enableOverride is called', function () {
                    expect(service.isOverride()).toBeFalsy();
                    service.enableOverride();
                    expect(service.isOverride()).toBeTruthy();
                });

                it('should not override when disableOverride is called', function () {
                    expect(service.isOverride()).toBeFalsy();
                    service.enableOverride();
                    expect(service.isOverride()).toBeTruthy();
                    service.disableOverride();
                    expect(service.isOverride()).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93YXJuaW5nL1JlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlDQUFpQyxVQUFVLFNBQVM7SUFBaEc7O0lBR0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDZCQUE2QjtZQUNuRixnQkFBZ0IsNEJBQTRCOztRQUVoRCxTQUFTLFlBQVk7O1lBRjdCLFNBQVMseUJBQXlCLFlBQVc7Z0JBQ3pDLElBQUk7O2dCQUVKLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsaUNBQWlDO29CQUN4RCxVQUFVOzs7Z0JBR2QsR0FBRyxvQ0FBb0MsWUFBVztvQkFDOUMsT0FBTyxRQUFRLGNBQWM7OztnQkFHakMsR0FBRyxpREFBaUQsWUFBVztvQkFDM0QsT0FBTyxRQUFRLGNBQWM7b0JBQzdCLFFBQVE7b0JBQ1IsT0FBTyxRQUFRLGNBQWM7OztnQkFHakMsR0FBRyxzREFBc0QsWUFBVztvQkFDaEUsT0FBTyxRQUFRLGNBQWM7b0JBQzdCLFFBQVE7b0JBQ1IsT0FBTyxRQUFRLGNBQWM7b0JBQzdCLFFBQVE7b0JBQ1IsT0FBTyxRQUFRLGNBQWM7Ozs7O0dBU2xDIiwiZmlsZSI6ImNvbW1vbi93YXJuaW5nL1JlZnJlc2hXYXJuaW5nT3ZlcnJpZGVTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdhcm5pbmdNb2R1bGUgZnJvbSAnY29tbW9uL3dhcm5pbmcvV2FybmluZ01vZHVsZSc7XG5cblxuZGVzY3JpYmUoJ1JlZnJlc2hXYXJuaW5nU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUod2FybmluZ01vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9yZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZV8pIHtcbiAgICAgICAgc2VydmljZSA9IF9yZWZyZXNoV2FybmluZ092ZXJyaWRlU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCBkZWZhdWx0IHRvIG5vdCBvdmVycmlkaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlLmlzT3ZlcnJpZGUoKSkudG9CZUZhbHN5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG92ZXJyaWRlIHdoZW4gZW5hYmxlT3ZlcnJpZGUgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChzZXJ2aWNlLmlzT3ZlcnJpZGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIHNlcnZpY2UuZW5hYmxlT3ZlcnJpZGUoKTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2UuaXNPdmVycmlkZSgpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCBvdmVycmlkZSB3aGVuIGRpc2FibGVPdmVycmlkZSBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2UuaXNPdmVycmlkZSgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgc2VydmljZS5lbmFibGVPdmVycmlkZSgpO1xuICAgICAgICBleHBlY3Qoc2VydmljZS5pc092ZXJyaWRlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgc2VydmljZS5kaXNhYmxlT3ZlcnJpZGUoKTtcbiAgICAgICAgZXhwZWN0KHNlcnZpY2UuaXNPdmVycmlkZSgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
