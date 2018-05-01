System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the AccessRequestSelectedIdentitiesCtrl.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('AccessRequestSelectedIdentitiesCtrl', function () {

                var accessRequestDataService, ctrl, $state;

                // Let the tests know we'll use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Inject the dependencies and setup spy.
                 */
                beforeEach(inject(function (_accessRequestDataService_, $controller, _$state_) {

                    $state = _$state_;

                    // Save the services.
                    accessRequestDataService = _accessRequestDataService_;
                    spyOn(accessRequestDataService.getAccessRequest(), 'getIdentities');

                    // Create the controller to test with.
                    ctrl = $controller('AccessRequestSelectedIdentitiesCtrl', {
                        accessRequestDataService: accessRequestDataService
                    });
                }));

                it('calls through to service', function () {
                    ctrl.getIdentities();
                    expect(accessRequestDataService.getAccessRequest().getIdentities).toHaveBeenCalled();
                });

                it('showSelectedIdentities should call state go', function () {
                    spyOn($state, 'go');

                    ctrl.showSelectedIdentities();

                    expect($state.go).toHaveBeenCalledWith('accessRequest.selectUser', { selectedView: true });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdFNlbGVjdGVkSWRlbnRpdGllc0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7Ozs7SUFBckc7O0lBT0ksSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7WUFKN0IsU0FBUyx1Q0FBdUMsWUFBVzs7Z0JBRXZELElBQUksMEJBQTBCLE1BQU07OztnQkFHcEMsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsNEJBQTRCLGFBQWEsVUFBVTs7b0JBRTFFLFNBQVM7OztvQkFHVCwyQkFBMkI7b0JBQzNCLE1BQU0seUJBQXlCLG9CQUFvQjs7O29CQUduRCxPQUFPLFlBQVksdUNBQXVDO3dCQUN0RCwwQkFBMEI7Ozs7Z0JBS2xDLEdBQUcsNEJBQTRCLFlBQVc7b0JBQ3RDLEtBQUs7b0JBQ0wsT0FBTyx5QkFBeUIsbUJBQW1CLGVBQWU7OztnQkFHdEUsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsTUFBTSxRQUFROztvQkFFZCxLQUFLOztvQkFFTCxPQUFPLE9BQU8sSUFBSSxxQkFBcUIsNEJBQTRCLEVBQUUsY0FBYzs7Ozs7R0FTeEYiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0U2VsZWN0ZWRJZGVudGl0aWVzQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBBY2Nlc3NSZXF1ZXN0U2VsZWN0ZWRJZGVudGl0aWVzQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ0FjY2Vzc1JlcXVlc3RTZWxlY3RlZElkZW50aXRpZXNDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlLCBjdHJsLCAkc3RhdGU7XG5cbiAgICAvLyBMZXQgdGhlIHRlc3RzIGtub3cgd2UnbGwgdXNlIHRoZSBhY2Nlc3MgcmVxdWVzdCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIHNweS5cbiAgICAgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfYWNjZXNzUmVxdWVzdERhdGFTZXJ2aWNlXywgJGNvbnRyb2xsZXIsIF8kc3RhdGVfKSB7XG5cbiAgICAgICAgJHN0YXRlID0gXyRzdGF0ZV87XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgc2VydmljZXMuXG4gICAgICAgIGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2VfO1xuICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLCAnZ2V0SWRlbnRpdGllcycpO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQWNjZXNzUmVxdWVzdFNlbGVjdGVkSWRlbnRpdGllc0N0cmwnLCB7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REYXRhU2VydmljZVxuICAgICAgICB9KTtcbiAgICB9KSk7XG5cblxuICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIHNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3RybC5nZXRJZGVudGl0aWVzKCk7XG4gICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGF0YVNlcnZpY2UuZ2V0QWNjZXNzUmVxdWVzdCgpLmdldElkZW50aXRpZXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93U2VsZWN0ZWRJZGVudGl0aWVzIHNob3VsZCBjYWxsIHN0YXRlIGdvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNweU9uKCRzdGF0ZSwgJ2dvJyk7XG5cbiAgICAgICAgY3RybC5zaG93U2VsZWN0ZWRJZGVudGl0aWVzKCk7XG5cbiAgICAgICAgZXhwZWN0KCRzdGF0ZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2FjY2Vzc1JlcXVlc3Quc2VsZWN0VXNlcicsIHsgc2VsZWN0ZWRWaWV3OiB0cnVlIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
