System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {

    /**
     * Tests for the DesktopHomeCtrl
     */
    'use strict';

    var IdentityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            IdentityModule = _identityIdentityModule['default'];
        }],
        execute: function () {
            describe('IdentityCtrl', function () {
                var identityService = undefined,
                    navigationService = undefined,
                    spModal = undefined,
                    $stateParams = undefined,
                    $q = undefined,
                    $controller = undefined,
                    $scope = undefined,
                    quickLink = undefined,
                    QuickLink = undefined,
                    availableActions = undefined,
                    identityId = '12345';

                beforeEach(module(IdentityModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$controller_, $rootScope, _identityService_, _navigationService_, _spModal_, _$q_, _QuickLink_) {
                    $scope = $rootScope.$new();
                    identityService = _identityService_;
                    navigationService = _navigationService_;
                    $stateParams = {
                        identityId: identityId
                    };
                    $q = _$q_;
                    $controller = _$controller_;
                    spModal = _spModal_;
                    QuickLink = _QuickLink_;
                    availableActions = [];
                }));

                function createController(isAllowSetPassword) {
                    return $controller('IdentityCtrl', {
                        identityService: identityService,
                        navigationService: navigationService,
                        spModal: spModal,
                        $stateParams: $stateParams,
                        availableActions: availableActions,
                        SET_IDENTITY_PASSWORD: isAllowSetPassword
                    });
                }

                it('should throw if there is no identityId on $stateParams', function () {
                    $stateParams.identityId = undefined;
                    expect(function () {
                        return createController();
                    }).toThrow();
                });

                it('should call getIdentity with the identity id and quicklink from $stateparams', function () {
                    spyOn(identityService, 'getIdentity').and.returnValue($q.when());
                    createController();
                    expect(identityService.getIdentity).toHaveBeenCalledWith(identityId);
                });

                it('should set identity on the controller', function () {
                    var identity = {
                        foo: 'bar'
                    },
                        ctrl = undefined;
                    spyOn(identityService, 'getIdentity').and.returnValue($q.when(identity));
                    spyOn(identityService, 'getAvailableActions').and.returnValue($q.when([]));
                    ctrl = createController();
                    $scope.$apply();
                    expect(ctrl.getIdentity()).toBe(identity);
                });

                it('should show an alert modal when getIdentity is rejected', function () {
                    var fakeModal = {
                        result: $q.when()
                    };
                    spyOn(identityService, 'getIdentity').and.returnValue($q.reject());
                    spyOn(identityService, 'getAvailableActions').and.returnValue($q.when([]));
                    spyOn(spModal, 'open').and.returnValue(fakeModal);
                    spyOn(identityService, 'goBack');
                    createController();
                    $scope.$apply();
                    expect(spModal.open).toHaveBeenCalled();
                    expect(identityService.goBack).toHaveBeenCalled();
                });

                it('should set is isAttributesTabAllowed to be false on empty allowed actions', function () {
                    var ctrl = createController();
                    expect(ctrl.isAttributesTabAllowed()).toBeFalsy();
                });

                it('should set is isAccessTabAllowed to be false on empty allowed actions', function () {
                    var ctrl = createController();
                    expect(ctrl.isAccessTabAllowed()).toBeFalsy();
                });

                it('should set is isAccountsTabAllowed to be false on empty allowed actions', function () {
                    var ctrl = createController();
                    expect(ctrl.isAccountsTabAllowed()).toBeFalsy();
                });

                it('should set is isPasswordsTabAllowed to be false on empty allowed actions', function () {
                    var ctrl = createController();
                    expect(ctrl.isPasswordsTabAllowed()).toBeFalsy();
                });

                it('should set is isEditButtonAllowed to be false on empty allowed actions', function () {
                    var ctrl = createController();
                    expect(ctrl.isEditButtonAllowed()).toBeFalsy();
                });

                it('should allow change password if has a view identity quicklink and correct right', function () {
                    var ctrl = createController(true),
                        quickLinks = new QuickLink({
                        action: QuickLink.Actions.VIEW_IDENTITY
                    });
                    ctrl.availableActions = [quickLinks];
                    expect(ctrl.isChangePasswordAllowed()).toBeTruthy();
                });

                it('should disallow change password if does not have view identity quicklink', function () {
                    var ctrl = createController(true);
                    expect(ctrl.isChangePasswordAllowed()).toBeFalsy();
                });

                it('should disallow change password if does not have right', function () {
                    var ctrl = createController(),
                        quickLinks = new QuickLink({
                        action: QuickLink.Actions.VIEW_IDENTITY
                    });
                    ctrl.availableActions = [quickLinks];
                    expect(ctrl.isChangePasswordAllowed()).toBeFalsy();
                });

                it('should set is isAttributesTabAllowed to be true on allowed actions', function () {
                    var ctrl = createController();
                    quickLink = new QuickLink({
                        action: QuickLink.Actions.VIEW_IDENTITY
                    });
                    ctrl.availableActions = [quickLink];
                    expect(ctrl.isAttributesTabAllowed()).toBeTruthy();
                });

                it('should set is isAccessTabAllowed to be true on allowed actions', function () {
                    var ctrl = createController();
                    quickLink = new QuickLink({
                        action: QuickLink.Actions.VIEW_IDENTITY
                    });
                    ctrl.availableActions = [quickLink];
                    expect(ctrl.isAccessTabAllowed()).toBeTruthy();
                });

                it('should set is isAccountsTabAllowed to be true on allowed actions', function () {
                    var ctrl = createController();
                    quickLink = new QuickLink({
                        action: QuickLink.Actions.MANAGE_ACCOUNTS
                    });
                    ctrl.availableActions = [quickLink];
                    expect(ctrl.isAccountsTabAllowed()).toBeTruthy();
                });

                it('should set is isPasswordsTabAllowed to be true on allowed actions', function () {
                    var ctrl = createController();
                    quickLink = new QuickLink({
                        action: QuickLink.Actions.MANAGE_PASSWORDS
                    });
                    ctrl.availableActions = [quickLink];
                    expect(ctrl.isPasswordsTabAllowed()).toBeTruthy();
                });

                it('should set is isEditButtonAllowed to be true on allowed actions', function () {
                    var ctrl = createController();
                    quickLink = new QuickLink({
                        action: QuickLink.Actions.MANAGE_ATTRIBUTES
                    });
                    ctrl.availableActions = [quickLink];
                    expect(ctrl.isEditButtonAllowed()).toBeTruthy();
                });

                describe('unlockIdentity', function () {
                    it('should call through to identityService', function () {
                        var ctrl = createController();
                        spyOn(identityService, 'unlockIdentity').and.returnValue($q.defer().promise);
                        ctrl.unlockIdentity();
                        expect(identityService.unlockIdentity).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7OztJQUEzRjs7SUFPSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTtZQUo3QixTQUFTLGdCQUFnQixZQUFXO2dCQUNoQyxJQUFJLGtCQUFlO29CQUFFLG9CQUFpQjtvQkFBRSxVQUFPO29CQUFFLGVBQVk7b0JBQUUsS0FBRTtvQkFBRSxjQUFXO29CQUFFLFNBQU07b0JBQUUsWUFBUztvQkFBRSxZQUFTO29CQUN4RyxtQkFBZ0I7b0JBQUUsYUFBYTs7Z0JBRW5DLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBUyxlQUFlLFlBQVksbUJBQW1CLHFCQUFxQixXQUNuRSxNQUFNLGFBQWE7b0JBQzFDLFNBQVMsV0FBVztvQkFDcEIsa0JBQWtCO29CQUNsQixvQkFBb0I7b0JBQ3BCLGVBQWU7d0JBQ1gsWUFBWTs7b0JBRWhCLEtBQUs7b0JBQ0wsY0FBYztvQkFDZCxVQUFVO29CQUNWLFlBQVk7b0JBQ1osbUJBQW1COzs7Z0JBR3ZCLFNBQVMsaUJBQWlCLG9CQUFvQjtvQkFDMUMsT0FBTyxZQUFZLGdCQUFnQjt3QkFDL0IsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLFNBQVM7d0JBQ1QsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLHVCQUF1Qjs7OztnQkFJL0IsR0FBRywwREFBMEQsWUFBVztvQkFDcEUsYUFBYSxhQUFhO29CQUMxQixPQUFPLFlBQUE7d0JBY1MsT0FkSDt1QkFBb0I7OztnQkFHckMsR0FBRyxnRkFBZ0YsWUFBVztvQkFDMUYsTUFBTSxpQkFBaUIsZUFBZSxJQUFJLFlBQVksR0FBRztvQkFDekQ7b0JBQ0EsT0FBTyxnQkFBZ0Is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bUIsQ0FBQztvQkFDekIsT0FBTyxLQUFLLHVCQUF1Qjs7O2dCQUd2QyxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxJQUFJLE9BQU87d0JBQ1gsTUFBTSxpQkFBaUIsa0JBQWtCLElBQUksWUFBWSxHQUFHLFFBQVE7d0JBQ3BFLEtBQUs7d0JBQ0wsT0FBTyxnQkFBZ0IsZ0JBQWdCOzs7Ozs7R0FzQmhEIiwiZmlsZSI6ImlkZW50aXR5L0lkZW50aXR5Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBJZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBEZXNrdG9wSG9tZUN0cmxcbiAqL1xuZGVzY3JpYmUoJ0lkZW50aXR5Q3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZGVudGl0eVNlcnZpY2UsIG5hdmlnYXRpb25TZXJ2aWNlLCBzcE1vZGFsLCAkc3RhdGVQYXJhbXMsICRxLCAkY29udHJvbGxlciwgJHNjb3BlLCBxdWlja0xpbmssIFF1aWNrTGluayxcbiAgICAgICAgYXZhaWxhYmxlQWN0aW9ucywgaWRlbnRpdHlJZCA9ICcxMjM0NSc7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShJZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29udHJvbGxlcl8sICRyb290U2NvcGUsIF9pZGVudGl0eVNlcnZpY2VfLCBfbmF2aWdhdGlvblNlcnZpY2VfLCBfc3BNb2RhbF8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXyRxXywgX1F1aWNrTGlua18pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIGlkZW50aXR5U2VydmljZSA9IF9pZGVudGl0eVNlcnZpY2VfO1xuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZSA9IF9uYXZpZ2F0aW9uU2VydmljZV87XG4gICAgICAgICRzdGF0ZVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6IGlkZW50aXR5SWRcbiAgICAgICAgfTtcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIFF1aWNrTGluayA9IF9RdWlja0xpbmtfO1xuICAgICAgICBhdmFpbGFibGVBY3Rpb25zID0gW107XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihpc0FsbG93U2V0UGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdJZGVudGl0eUN0cmwnLCB7XG4gICAgICAgICAgICBpZGVudGl0eVNlcnZpY2U6IGlkZW50aXR5U2VydmljZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlOiBuYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgIHNwTW9kYWw6IHNwTW9kYWwsXG4gICAgICAgICAgICAkc3RhdGVQYXJhbXM6ICRzdGF0ZVBhcmFtcyxcbiAgICAgICAgICAgIGF2YWlsYWJsZUFjdGlvbnM6IGF2YWlsYWJsZUFjdGlvbnMsXG4gICAgICAgICAgICBTRVRfSURFTlRJVFlfUEFTU1dPUkQ6IGlzQWxsb3dTZXRQYXNzd29yZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGlmIHRoZXJlIGlzIG5vIGlkZW50aXR5SWQgb24gJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkID0gdW5kZWZpbmVkO1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcigpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0SWRlbnRpdHkgd2l0aCB0aGUgaWRlbnRpdHkgaWQgYW5kIHF1aWNrbGluayBmcm9tICRzdGF0ZXBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5SWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgaWRlbnRpdHkgb24gdGhlIGNvbnRyb2xsZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGlkZW50aXR5ID0ge1xuICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICB9LCBjdHJsO1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKGlkZW50aXR5KSk7XG4gICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ2dldEF2YWlsYWJsZUFjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihbXSkpO1xuICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmdldElkZW50aXR5KCkpLnRvQmUoaWRlbnRpdHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGFuIGFsZXJ0IG1vZGFsIHdoZW4gZ2V0SWRlbnRpdHkgaXMgcmVqZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGZha2VNb2RhbCA9IHtcbiAgICAgICAgICAgIHJlc3VsdDogICRxLndoZW4oKVxuICAgICAgICB9O1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3QoKSk7XG4gICAgICAgIHNweU9uKGlkZW50aXR5U2VydmljZSwgJ2dldEF2YWlsYWJsZUFjdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihbXSkpO1xuICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5yZXR1cm5WYWx1ZShmYWtlTW9kYWwpO1xuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnb0JhY2snKTtcbiAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5U2VydmljZS5nb0JhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGlzIGlzQXR0cmlidXRlc1RhYkFsbG93ZWQgdG8gYmUgZmFsc2Ugb24gZW1wdHkgYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBleHBlY3QoY3RybC5pc0F0dHJpYnV0ZXNUYWJBbGxvd2VkKCkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgaXMgaXNBY2Nlc3NUYWJBbGxvd2VkIHRvIGJlIGZhbHNlIG9uIGVtcHR5IGFsbG93ZWQgYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNBY2Nlc3NUYWJBbGxvd2VkKCkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgaXMgaXNBY2NvdW50c1RhYkFsbG93ZWQgdG8gYmUgZmFsc2Ugb24gZW1wdHkgYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBleHBlY3QoY3RybC5pc0FjY291bnRzVGFiQWxsb3dlZCgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGlzIGlzUGFzc3dvcmRzVGFiQWxsb3dlZCB0byBiZSBmYWxzZSBvbiBlbXB0eSBhbGxvd2VkIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIGV4cGVjdChjdHJsLmlzUGFzc3dvcmRzVGFiQWxsb3dlZCgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGlzIGlzRWRpdEJ1dHRvbkFsbG93ZWQgdG8gYmUgZmFsc2Ugb24gZW1wdHkgYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBleHBlY3QoY3RybC5pc0VkaXRCdXR0b25BbGxvd2VkKCkpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBjaGFuZ2UgcGFzc3dvcmQgaWYgaGFzIGEgdmlldyBpZGVudGl0eSBxdWlja2xpbmsgYW5kIGNvcnJlY3QgcmlnaHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUpLFxuICAgICAgICAgICAgcXVpY2tMaW5rcyA9IG5ldyBRdWlja0xpbmsoe1xuICAgICAgICAgICAgYWN0aW9uOiBRdWlja0xpbmsuQWN0aW9ucy5WSUVXX0lERU5USVRZXG4gICAgICAgIH0pO1xuICAgICAgICBjdHJsLmF2YWlsYWJsZUFjdGlvbnMgPSBbcXVpY2tMaW5rc107XG4gICAgICAgIGV4cGVjdChjdHJsLmlzQ2hhbmdlUGFzc3dvcmRBbGxvd2VkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzYWxsb3cgY2hhbmdlIHBhc3N3b3JkIGlmIGRvZXMgbm90IGhhdmUgdmlldyBpZGVudGl0eSBxdWlja2xpbmsnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHRydWUpO1xuICAgICAgICBleHBlY3QoY3RybC5pc0NoYW5nZVBhc3N3b3JkQWxsb3dlZCgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzYWxsb3cgY2hhbmdlIHBhc3N3b3JkIGlmIGRvZXMgbm90IGhhdmUgcmlnaHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICBxdWlja0xpbmtzID0gbmV3IFF1aWNrTGluayh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBRdWlja0xpbmsuQWN0aW9ucy5WSUVXX0lERU5USVRZXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY3RybC5hdmFpbGFibGVBY3Rpb25zID0gW3F1aWNrTGlua3NdO1xuICAgICAgICBleHBlY3QoY3RybC5pc0NoYW5nZVBhc3N3b3JkQWxsb3dlZCgpKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGlzIGlzQXR0cmlidXRlc1RhYkFsbG93ZWQgdG8gYmUgdHJ1ZSBvbiBhbGxvd2VkIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIHF1aWNrTGluayA9IG5ldyBRdWlja0xpbmsoe1xuICAgICAgICAgICAgYWN0aW9uOiBRdWlja0xpbmsuQWN0aW9ucy5WSUVXX0lERU5USVRZXG4gICAgICAgIH0pO1xuICAgICAgICBjdHJsLmF2YWlsYWJsZUFjdGlvbnMgPSBbcXVpY2tMaW5rXTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNBdHRyaWJ1dGVzVGFiQWxsb3dlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBpcyBpc0FjY2Vzc1RhYkFsbG93ZWQgdG8gYmUgdHJ1ZSBvbiBhbGxvd2VkIGFjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgIHF1aWNrTGluayA9IG5ldyBRdWlja0xpbmsoe1xuICAgICAgICAgICAgYWN0aW9uOiBRdWlja0xpbmsuQWN0aW9ucy5WSUVXX0lERU5USVRZXG4gICAgICAgIH0pO1xuICAgICAgICBjdHJsLmF2YWlsYWJsZUFjdGlvbnMgPSBbcXVpY2tMaW5rXTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNBY2Nlc3NUYWJBbGxvd2VkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2V0IGlzIGlzQWNjb3VudHNUYWJBbGxvd2VkIHRvIGJlIHRydWUgb24gYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBxdWlja0xpbmsgPSBuZXcgUXVpY2tMaW5rKHtcbiAgICAgICAgICAgIGFjdGlvbjogUXVpY2tMaW5rLkFjdGlvbnMuTUFOQUdFX0FDQ09VTlRTXG4gICAgICAgIH0pO1xuICAgICAgICBjdHJsLmF2YWlsYWJsZUFjdGlvbnMgPSBbcXVpY2tMaW5rXTtcbiAgICAgICAgZXhwZWN0KGN0cmwuaXNBY2NvdW50c1RhYkFsbG93ZWQoKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZXQgaXMgaXNQYXNzd29yZHNUYWJBbGxvd2VkIHRvIGJlIHRydWUgb24gYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBxdWlja0xpbmsgPSBuZXcgUXVpY2tMaW5rKHtcbiAgICAgICAgICAgIGFjdGlvbjogUXVpY2tMaW5rLkFjdGlvbnMuTUFOQUdFX1BBU1NXT1JEU1xuICAgICAgICB9KTtcbiAgICAgICAgY3RybC5hdmFpbGFibGVBY3Rpb25zID0gW3F1aWNrTGlua107XG4gICAgICAgIGV4cGVjdChjdHJsLmlzUGFzc3dvcmRzVGFiQWxsb3dlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBpcyBpc0VkaXRCdXR0b25BbGxvd2VkIHRvIGJlIHRydWUgb24gYWxsb3dlZCBhY3Rpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICBxdWlja0xpbmsgPSBuZXcgUXVpY2tMaW5rKHtcbiAgICAgICAgICAgIGFjdGlvbjogUXVpY2tMaW5rLkFjdGlvbnMuTUFOQUdFX0FUVFJJQlVURVNcbiAgICAgICAgfSk7XG4gICAgICAgIGN0cmwuYXZhaWxhYmxlQWN0aW9ucyA9IFtxdWlja0xpbmtdO1xuICAgICAgICBleHBlY3QoY3RybC5pc0VkaXRCdXR0b25BbGxvd2VkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1bmxvY2tJZGVudGl0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBpZGVudGl0eVNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAndW5sb2NrSWRlbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoJHEuZGVmZXIoKS5wcm9taXNlKTtcbiAgICAgICAgICAgIGN0cmwudW5sb2NrSWRlbnRpdHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eVNlcnZpY2UudW5sb2NrSWRlbnRpdHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
