System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {

    /**
     * Tests for the InvalidRequesteesDialogCtrl.
     */
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {
            describe('InvalidRequesteesDialogCtrl', function () {

                var $controller,
                    identities = ['Samwise Gamgee', 'Bilbo Baggins', 'Perigrin Took', 'Gandalf the Grey', 'Boromir Somethingorother'];

                // Let the tests know we'll use the access request module.
                beforeEach(module(accessRequestModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_$controller_) {
                    // Save the services.
                    $controller = _$controller_;
                }));

                describe('with higher limit than total identities', function () {
                    var limit = 10,
                        ctrl;

                    beforeEach(function () {
                        ctrl = $controller('InvalidRequesteesDialogCtrl', {
                            invalidRequestees: identities,
                            renderLimit: limit,
                            messageKey: 'ui_access_request_invalid_requestees_header'
                        });
                    });

                    it('should show all identities', function () {
                        var requestees = ctrl.renderedInvalidRequestees();
                        expect(requestees).toEqual(identities);
                    });

                    it('should have an overflow of zero', function () {
                        var count = ctrl.requesteeOverflowCount();
                        expect(count).toBe(0);
                    });
                });

                describe('with higher lower than total identities', function () {
                    var limit = 4,
                        ctrl;
                    beforeEach(function () {
                        ctrl = $controller('InvalidRequesteesDialogCtrl', {
                            invalidRequestees: identities,
                            renderLimit: limit,
                            messageKey: 'ui_access_request_invalid_requestees_header'
                        });
                    });

                    it('should show limited identities', function () {
                        var requestees = ctrl.renderedInvalidRequestees();
                        expect(requestees.length).toBe(limit);
                    });

                    it('should have an overflow greater than zero', function () {
                        var count = ctrl.requesteeOverflowCount();
                        expect(count).toBe(identities.length - limit);
                    });
                });

                it('should save message', function () {
                    var message = 'ui_access_request_invalid_requestees_header',
                        ctrl = $controller('InvalidRequesteesDialogCtrl', {
                        invalidRequestees: identities,
                        renderLimit: 5,
                        messageKey: message
                    });

                    expect(ctrl.getMessageKey()).toBe(message);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvSW52YWxpZFJlcXVlc3RlZXNEaWFsb2dDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTOzs7OztJQUFyRzs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTtZQUo3QixTQUFTLCtCQUErQixZQUFXOztnQkFFL0MsSUFBSTtvQkFDQSxhQUFhLENBQUMsa0JBQ1YsaUJBQ0EsaUJBQ0Esb0JBQ0E7OztnQkFHUixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxlQUFlOztvQkFFdEMsY0FBYzs7O2dCQUdsQixTQUFTLDJDQUEyQyxZQUFXO29CQUMzRCxJQUFJLFFBQVE7d0JBQ1I7O29CQUVKLFdBQVcsWUFBVzt3QkFDbEIsT0FBTyxZQUFZLCtCQUErQjs0QkFDOUMsbUJBQW1COzRCQUNuQixhQUFhOzRCQUNiLFlBQVk7Ozs7b0JBSXBCLEdBQUcsOEJBQThCLFlBQVc7d0JBQ3hDLElBQUksYUFBYSxLQUFLO3dCQUN0QixPQUFPLFlBQVksUUFBUTs7O29CQUcvQixHQUFHLG1DQUFtQyxZQUFXO3dCQUM3QyxJQUFJLFFBQVEsS0FBSzt3QkFDakIsT0FBTyxPQUFPLEtBQUs7Ozs7Z0JBSzNCLFNBQVMsMkNBQTJDLFlBQVc7b0JBQzNELElBQUksUUFBUTt3QkFDUjtvQkFDSixXQUFXLFlBQVc7d0JBQ2xCLE9BQU8sWUFBWSwrQkFBK0I7NEJBQzlDLG1CQUFtQjs0QkFDbkIsYUFBYTs0QkFDYixZQUFZOzs7O29CQUlwQixHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxJQUFJLGFBQWEsS0FBSzt3QkFDdEIsT0FBTyxXQUFXLFFBQVEsS0FBSzs7O29CQUduQyxHQUFHLDZDQUE2QyxZQUFXO3dCQUN2RCxJQUFJLFFBQVEsS0FBSzt3QkFDakIsT0FBTyxPQUFPLEtBQUssV0FBVyxTQUFTOzs7O2dCQUsvQyxHQUFHLHVCQUF1QixZQUFXO29CQUNqQyxJQUFJLFVBQVU7d0JBQ1YsT0FBTyxZQUFZLCtCQUErQjt3QkFDbEQsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLFlBQVk7OztvQkFHaEIsT0FBTyxLQUFLLGlCQUFpQixLQUFLOzs7OztHQUl2QyIsImZpbGUiOiJjb21tb24vd2lkZ2V0L0ludmFsaWRSZXF1ZXN0ZWVzRGlhbG9nQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWNjZXNzUmVxdWVzdE1vZHVsZSBmcm9tICdhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgSW52YWxpZFJlcXVlc3RlZXNEaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnSW52YWxpZFJlcXVlc3RlZXNEaWFsb2dDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgJGNvbnRyb2xsZXIsXG4gICAgICAgIGlkZW50aXRpZXMgPSBbJ1NhbXdpc2UgR2FtZ2VlJyxcbiAgICAgICAgICAgICdCaWxibyBCYWdnaW5zJyxcbiAgICAgICAgICAgICdQZXJpZ3JpbiBUb29rJyxcbiAgICAgICAgICAgICdHYW5kYWxmIHRoZSBHcmV5JyxcbiAgICAgICAgICAgICdCb3JvbWlyIFNvbWV0aGluZ29yb3RoZXInXTtcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGFjY2VzcyByZXF1ZXN0IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhY2Nlc3NSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgdGhlIGRlcGVuZGVuY2llcyBhbmQgc2V0dXAgbW9ja3MuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXykge1xuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCd3aXRoIGhpZ2hlciBsaW1pdCB0aGFuIHRvdGFsIGlkZW50aXRpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpbWl0ID0gMTAsXG4gICAgICAgICAgICBjdHJsO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0ludmFsaWRSZXF1ZXN0ZWVzRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkUmVxdWVzdGVlczogaWRlbnRpdGllcyxcbiAgICAgICAgICAgICAgICByZW5kZXJMaW1pdDogbGltaXQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZUtleTogJ3VpX2FjY2Vzc19yZXF1ZXN0X2ludmFsaWRfcmVxdWVzdGVlc19oZWFkZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IGFsbCBpZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdGVlcyA9IGN0cmwucmVuZGVyZWRJbnZhbGlkUmVxdWVzdGVlcygpO1xuICAgICAgICAgICAgZXhwZWN0KHJlcXVlc3RlZXMpLnRvRXF1YWwoaWRlbnRpdGllcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhbiBvdmVyZmxvdyBvZiB6ZXJvJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSBjdHJsLnJlcXVlc3RlZU92ZXJmbG93Q291bnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChjb3VudCkudG9CZSgwKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aXRoIGhpZ2hlciBsb3dlciB0aGFuIHRvdGFsIGlkZW50aXRpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpbWl0ID0gNCxcbiAgICAgICAgICAgIGN0cmw7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0ludmFsaWRSZXF1ZXN0ZWVzRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkUmVxdWVzdGVlczogaWRlbnRpdGllcyxcbiAgICAgICAgICAgICAgICByZW5kZXJMaW1pdDogbGltaXQsXG4gICAgICAgICAgICAgICAgbWVzc2FnZUtleTogJ3VpX2FjY2Vzc19yZXF1ZXN0X2ludmFsaWRfcmVxdWVzdGVlc19oZWFkZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzaG93IGxpbWl0ZWQgaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RlZXMgPSBjdHJsLnJlbmRlcmVkSW52YWxpZFJlcXVlc3RlZXMoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXF1ZXN0ZWVzLmxlbmd0aCkudG9CZShsaW1pdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBhbiBvdmVyZmxvdyBncmVhdGVyIHRoYW4gemVybycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gY3RybC5yZXF1ZXN0ZWVPdmVyZmxvd0NvdW50KCk7XG4gICAgICAgICAgICBleHBlY3QoY291bnQpLnRvQmUoaWRlbnRpdGllcy5sZW5ndGggLSBsaW1pdCk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNhdmUgbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICd1aV9hY2Nlc3NfcmVxdWVzdF9pbnZhbGlkX3JlcXVlc3RlZXNfaGVhZGVyJyxcbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignSW52YWxpZFJlcXVlc3RlZXNEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgaW52YWxpZFJlcXVlc3RlZXM6IGlkZW50aXRpZXMsXG4gICAgICAgICAgICByZW5kZXJMaW1pdDogNSxcbiAgICAgICAgICAgIG1lc3NhZ2VLZXk6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KGN0cmwuZ2V0TWVzc2FnZUtleSgpKS50b0JlKG1lc3NhZ2UpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
