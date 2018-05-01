System.register(['test/js/TestInitializer', 'common/modal/ModalModule'], function (_export) {

    /**
     * Tests for the spModalService.
     */
    'use strict';

    var modalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModalModalModule) {
            modalModule = _commonModalModalModule['default'];
        }],
        execute: function () {
            describe('spModalService', function () {

                var $q,
                    $rootScope,
                    $uibModal,
                    $templateCache,
                    scope,
                    spModalService,
                    config,
                    $window,
                    $document,
                    $timeout,
                    modalInstance,
                    preflush,
                    title = 'My Title',
                    content = '<h1>Hi mom!</h1>',
                    id = 'modal-123456',
                    cancelBtnCSS = 'btn-cancel';

                // Let the tests know we'll use the component module.
                beforeEach(module(modalModule, 'ngAnimateMock', function ($qProvider) {
                    // we want to test rejections here, allow them through!
                    $qProvider.errorOnUnhandledRejections(false);
                }));

                /**
                 * Setup the mocks for our tests.
                 */
                /*jshint maxparams:10*/
                beforeEach(inject(function (_$q_, _$rootScope_, _$uibModal_, _spModal_, _$window_, _$document_, _$timeout_, _$templateCache_) {
                    var rootScopeInitialized;
                    $q = _$q_;
                    $rootScope = _$rootScope_;
                    $uibModal = _$uibModal_;
                    spModalService = _spModal_;
                    $document = _$document_;
                    $window = _$window_;
                    // focus twiddling is done asynchronously so we will have to flush the timeout service
                    $timeout = _$timeout_;
                    $templateCache = _$templateCache_;
                    modalInstance = undefined;
                    preflush = false;

                    // Create a new scope that will be returned when $new is called.
                    scope = $rootScope.$new();
                    $rootScope._$new = $rootScope.$new;
                    spyOn($rootScope, '$new').and.callFake(function () {
                        if (!rootScopeInitialized) {
                            rootScopeInitialized = true;
                            return scope;
                        }
                        return this._$new();
                    });

                    // Spy on the open function of modal.
                    spyOn($uibModal, 'open').and.callThrough();

                    // Spy on the closeAll service function
                    spyOn(spModalService, 'closeAll').and.callThrough();

                    // Create the default config
                    config = {
                        title: title,
                        content: content,
                        id: id
                    };
                }));

                // After each test remove the modal dialog
                afterEach(inject(function ($animate) {
                    /* Digest any remaining events */
                    scope.$apply();

                    // Close the modal and flush the animation so it actually closes
                    if (modalInstance) {
                        modalInstance.close();
                        $animate.flush();
                    }

                    /* Destroy the scope created in beforeEach */
                    scope.$destroy();
                }));

                describe('open', function () {

                    it('allows a null id', function () {
                        config.id = undefined;
                        modalInstance = spModalService.open(config);
                        expect(scope.dialogId).toEqual('infoModal');
                    });

                    it('throws with no title', function () {
                        config.title = undefined;
                        expect(function () {
                            spModalService.open(config);
                        }).toThrow();
                    });

                    it('throws with no content', function () {
                        config.content = undefined;
                        expect(function () {
                            spModalService.open(config);
                        }).toThrow();
                    });

                    it('creates a new scope', function () {
                        modalInstance = spModalService.open(config);
                        expect($rootScope.$new).toHaveBeenCalled();
                    });

                    it('populates the new scope', function () {
                        modalInstance = spModalService.open(config);
                        scope.$apply();
                        expect(scope.title).toEqual(title);
                        expect(scope.content).toEqual(content);
                        expect(scope.dialogId).toEqual(id);
                    });

                    it('allows title to change', function () {
                        var newTitle = 'newTitle';

                        modalInstance = spModalService.open(config);
                        scope.$apply();
                        expect(scope.title).toEqual(title);
                        modalInstance.setTitle(newTitle);
                        expect(scope.title).toEqual(newTitle);
                    });

                    it('opens a modal', function () {
                        var args;
                        modalInstance = spModalService.open(config);
                        expect($uibModal.open).toHaveBeenCalled();
                        args = $uibModal.open.calls.mostRecent().args[0];
                        expect(args.templateUrl).toEqual('util/modal-dialog.html');
                        expect(args.scope).toEqual(scope);
                    });

                    it('opens an alert modal', function () {
                        var args;
                        config.type = 'alert';
                        modalInstance = spModalService.open(config);
                        expect($uibModal.open).toHaveBeenCalled();
                        args = $uibModal.open.calls.mostRecent().args[0];
                        expect(args.templateUrl).toEqual('util/modal-alert.html');
                        expect(args.scope).toEqual(scope);
                    });

                    describe('warning levels', function () {
                        it('should have the warning class when warning level set warning', function () {
                            config.warningLevel = 'warning';
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            expect(angular.element('.warning-modal').length).toEqual(1);
                            expect(angular.element('.danger-modal').length).toEqual(0);
                        });
                        it('should have the danger class when warning level set to danger', function () {
                            config.warningLevel = 'danger';
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            expect(angular.element('.danger-modal').length).toEqual(1);
                            expect(angular.element('.alert-warning').length).toEqual(0);
                        });

                        it('should have the modal-danger class when set to error', function () {
                            config.type = 'alert';
                            config.warningLevel = 'error';
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            expect(angular.element('.modal-danger').length).toEqual(1);
                        });

                        it('should have the modal-warn class when set to warning', function () {
                            config.type = 'alert';
                            config.warningLevel = 'warning';
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            expect(angular.element('.modal-warn').length).toEqual(1);
                        });
                    });

                    describe('button actions', function () {
                        function closeActionFunction() {
                            return CLOSE_RESULT_PROMISE;
                        }

                        function dismissActionFunction() {
                            return DISMISS_RESULT_PROMISE;
                        }

                        var CLOSE_BTN_INDEX = 0,
                            DISMISS_BTN_INDEX = 1,
                            EXTRA_BTN_INDEX = 2,
                            CANCEL_BTN_INDEX = 3,
                            CLOSE_RESULT_PROMISE,
                            DISMISS_RESULT_PROMISE,
                            CLOSE_RESULT = 'closed by modal button',
                            DISMISS_RESULT = 'dismissed by modal button',
                            modalButtons,
                            dom,
                            visibleActiveElement,
                            button1 = {
                            displayValue: 'foo',
                            action: closeActionFunction,
                            close: true
                        },
                            button2 = {
                            displayValue: 'bar',
                            action: dismissActionFunction
                        },
                            button3 = {
                            displayValue: 'extra',
                            extraClass: 'some-class',
                            disabled: 'testDisabled()'
                        },
                            button4 = {
                            displayValue: 'cancel',
                            cancel: true
                        };

                        beforeEach(function () {
                            var tmp = $q.defer();
                            tmp.resolve(DISMISS_RESULT);
                            DISMISS_RESULT_PROMISE = tmp.promise;
                            tmp = $q.defer();
                            tmp.resolve(CLOSE_RESULT);
                            CLOSE_RESULT_PROMISE = tmp.promise;
                            spyOn($window, 'focus').and.callThrough();
                            dom = $document[0];
                            // Create a focusable element to be out active element
                            visibleActiveElement = dom.createElement('input');
                            dom.body.appendChild(visibleActiveElement);
                            visibleActiveElement.focus();
                        });

                        afterEach(function () {
                            // If we did not remove the element during the test remove it now
                            if (dom.body.contains(visibleActiveElement)) {
                                dom.body.removeChild(visibleActiveElement);
                            }
                        });

                        function setupDialogWithButtons() {
                            config.buttons = [button1, button2, button3, button4];
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            modalButtons = getModalButtons();
                        }

                        function getModalButtons() {
                            var modalButtons = angular.element('button');
                            // [x] + sr-only close buttons plus passed button
                            expect(modalButtons.length).toEqual(6);
                            modalButtons = modalButtons.slice(2);
                            return modalButtons;
                        }

                        it('should have buttons for each button in the config', function () {
                            setupDialogWithButtons();
                            // Catch all test to make sure everything looks sane
                            expect(scope.buttons).toBeDefined();
                            expect(scope.buttons.length).toEqual(4);
                            expect(scope.buttons[CLOSE_BTN_INDEX].displayValue).toEqual(button1.displayValue);
                            expect(scope.buttons[CLOSE_BTN_INDEX].action).toEqual(closeActionFunction);
                            expect(scope.buttons[CLOSE_BTN_INDEX].close).toBeTruthy();
                            expect(scope.buttons[DISMISS_BTN_INDEX].displayValue).toEqual(button2.displayValue);
                            expect(scope.buttons[DISMISS_BTN_INDEX].action).toEqual(dismissActionFunction);
                            expect(scope.buttons[DISMISS_BTN_INDEX].close).toBeFalsy();
                            expect(modalButtons[CLOSE_BTN_INDEX].firstChild.nodeValue).toEqual(button1.displayValue);
                            expect(modalButtons[DISMISS_BTN_INDEX].firstChild.nodeValue).toEqual(button2.displayValue);
                            expect(scope.content).toBeDefined();
                        });

                        it('should execute the the assigned function and dismiss the dialog if ' + 'a non-close button is clicked', function () {
                            var dismissSpy = jasmine.createSpy();
                            setupDialogWithButtons();
                            modalInstance.result['catch'](dismissSpy);
                            modalButtons[DISMISS_BTN_INDEX].click();
                            expect(dismissSpy).toHaveBeenCalledWith(DISMISS_RESULT);
                        });

                        it('should execute the the assigned function and close the dialog if ' + 'a close button is clicked', function () {
                            var closeSpy = jasmine.createSpy();
                            setupDialogWithButtons();
                            modalInstance.result.then(closeSpy);
                            modalButtons[CLOSE_BTN_INDEX].click();
                            expect(closeSpy).toHaveBeenCalledWith(CLOSE_RESULT);
                        });

                        it('should return focus to active element after non-close button clicked', function () {
                            visibleActiveElement.focus = jasmine.createSpy('focus');
                            // Spy on the contains function of document.
                            setupDialogWithButtons();
                            modalButtons[DISMISS_BTN_INDEX].click();
                            $timeout.flush();
                            preflush = true;
                            expect(visibleActiveElement.focus).toHaveBeenCalled();
                        });

                        it('should focus on window after non-close button clicked when ' + 'active element is removed from the dom', function () {
                            // Spy on the contains function of document.
                            setupDialogWithButtons();
                            // remove the active element we opened the dialog with
                            dom.body.removeChild(visibleActiveElement);
                            modalButtons[DISMISS_BTN_INDEX].click();
                            $timeout.flush();
                            preflush = true;
                            expect($window.focus).toHaveBeenCalled();
                        });

                        it('should return focus to active element after close button clicked', function () {
                            visibleActiveElement.focus = jasmine.createSpy('focus');
                            // Spy on the contains function of document.
                            setupDialogWithButtons();
                            modalButtons[CLOSE_BTN_INDEX].click();
                            $timeout.flush();
                            preflush = true;
                            expect(visibleActiveElement.focus).toHaveBeenCalled();
                        });

                        it('should return focus after close button clicked when ' + 'active element is removed from the dom', function () {
                            setupDialogWithButtons();
                            // remove the active element we opened the dialog with
                            dom.body.removeChild(visibleActiveElement);
                            modalButtons[CLOSE_BTN_INDEX].click();
                            $timeout.flush();
                            preflush = true;
                            expect($window.focus).toHaveBeenCalled();
                        });

                        it('should disable button if disabled value evaluates to true', function () {
                            scope.testDisabled = jasmine.createSpy().and.returnValue(true);
                            setupDialogWithButtons();
                            expect(modalButtons[EXTRA_BTN_INDEX].hasAttribute('disabled')).toBeTruthy();
                        });

                        it('should not disable button if disabled value evaluates to false', function () {
                            scope.testDisabled = jasmine.createSpy().and.returnValue(false);
                            setupDialogWithButtons();
                            expect(modalButtons[EXTRA_BTN_INDEX].hasAttribute('disabled')).toBeFalsy();
                        });

                        it('should call function if disabled is a function', function () {
                            var disabledValue = false,
                                disabledSpy = jasmine.createSpy().and.callFake(function () {
                                return disabledValue;
                            });
                            button3.disabled = disabledSpy;
                            setupDialogWithButtons();
                            expect(disabledSpy).toHaveBeenCalled();
                            expect(modalButtons[EXTRA_BTN_INDEX].hasAttribute('disabled')).toBeFalsy();
                            disabledSpy.calls.reset();
                            disabledValue = true;
                            scope.$apply();
                            expect(disabledSpy).toHaveBeenCalled();
                            expect(modalButtons[EXTRA_BTN_INDEX].hasAttribute('disabled')).toBeTruthy();
                        });

                        it('should add extraClass to button if defined', function () {
                            setupDialogWithButtons();
                            expect(angular.element(modalButtons[EXTRA_BTN_INDEX]).hasClass('some-class')).toBeTruthy();
                        });

                        it('should use cancel button css style if defined', function () {
                            setupDialogWithButtons();
                            expect(angular.element(modalButtons[CANCEL_BTN_INDEX]).hasClass(cancelBtnCSS)).toBeTruthy();
                        });
                    });

                    describe('dismiss using modal controls', function () {
                        it('should run the dismiss function if the x is clicked', function () {
                            var dismissSpy = jasmine.createSpy(),
                                xButton;
                            modalInstance = spModalService.open(config);
                            modalInstance.result['catch'](dismissSpy);
                            scope.$apply();
                            xButton = angular.element('button')[0];
                            xButton.click();
                            expect(dismissSpy).toHaveBeenCalled();
                        });

                        it('should dismiss if the sr-only close button is clicked', function () {
                            var dismissSpy = jasmine.createSpy(),
                                xButton;
                            modalInstance = spModalService.open(config);
                            modalInstance.result['catch'](dismissSpy);
                            scope.$apply();
                            xButton = angular.element('button')[1];
                            xButton.click();
                            expect(dismissSpy).toHaveBeenCalled();
                        });

                        it('should dismiss if the esc key is pressed', function () {
                            var dismissSpy = jasmine.createSpy(),
                                keyPressEvent = jQuery.Event('keydown', { which: 27 });
                            modalInstance = spModalService.open(config);
                            modalInstance.result['catch'](dismissSpy);
                            scope.$apply();
                            jQuery.event.trigger(keyPressEvent);
                            expect(dismissSpy).toHaveBeenCalled();
                        });
                    });

                    describe('auto focus', function () {
                        var browserUtil, focusedEl;

                        beforeEach(inject(function (_browserUtil_) {
                            browserUtil = _browserUtil_;
                        }));

                        function openAutoFocusElModal(id) {
                            var templateUrl = 'spmodal/test-auto-focus';
                            $templateCache.put(templateUrl, '<button id="' + id + '">Click Me</button>');
                            config.autoFocus = '#' + id;
                            config.templateUrl = templateUrl;
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            $timeout.flush();
                        }

                        function openAutoFocusModal() {
                            config.autoFocus = true;
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            $timeout.flush();
                        }

                        function expectActiveElementId(id) {
                            focusedEl = $document[0].activeElement;
                            expect(focusedEl.id).toEqual(id);
                        }

                        it('focuses on the specified element when a query selector string is passed', function () {
                            spyOn(browserUtil, 'isIOS').and.callFake(function () {
                                return false;
                            });

                            var btnId = 'click-me-btn';
                            openAutoFocusElModal(btnId);
                            expectActiveElementId(btnId);
                        });

                        it('focuses on the close button when enabled', function () {
                            spyOn(browserUtil, 'isIOS').and.callFake(function () {
                                return false;
                            });

                            openAutoFocusModal();
                            expectActiveElementId('closeModalDialogBtn');
                        });

                        it('does not focus on the close button when ios', function () {
                            spyOn(browserUtil, 'isIOS').and.callFake(function () {
                                return true;
                            });

                            openAutoFocusModal();
                            expectActiveElementId('');
                        });
                    });

                    describe('isContextual config', function () {

                        function setupContextualTest(isContextual, warningLevel) {
                            config.isContextual = isContextual;
                            config.warningLevel = warningLevel;
                            modalInstance = spModalService.open(config);
                            scope.$apply();
                            $timeout.flush();
                        }

                        function expectHasIconChild() {
                            var title = angular.element('.modal-title')[0];
                            expect(title.children.length).toEqual(1);
                        }

                        function expectHasNoIconChild() {
                            var title = angular.element('.modal-title')[0];
                            expect(title.children.length).toEqual(0);
                        }

                        it('should render the icon when warning is not defined and isContextual is true', function () {
                            setupContextualTest(true, undefined);
                            expectHasIconChild();
                        });

                        it('should render the icon when warningLevel is info and isContextual is true', function () {
                            setupContextualTest(true, 'info');
                            expectHasIconChild();
                        });

                        it('should not render the icon when warningLevel is info and isContextual is falsy', function () {
                            setupContextualTest(undefined, 'info');
                            expectHasNoIconChild();
                        });

                        it('should not render the icon when warningLevel is not defined and isContextual is falsy', function () {
                            setupContextualTest(false, undefined);
                            expectHasNoIconChild();
                        });

                        it('should render the icon when warningLevel is any valid value that ' + 'is not info and usContextual is falsey', function () {
                            setupContextualTest(false, 'warning');
                            expectHasIconChild();
                        });

                        it('should render the icon when warningLevel is any valid value that ' + 'is not info and usContextual is true', function () {
                            setupContextualTest(true, 'danger');
                            expectHasIconChild();
                        });
                    });
                });

                describe('confirm', function () {

                    beforeEach(function () {
                        spyOn(spModalService, 'open');
                    });

                    it('throws with no content and no templateUrl', function () {
                        var config = {};
                        expect(function () {
                            spModalService.confirm(config);
                        }).toThrow();
                    });

                    it('throws with templateUrl but no controller', function () {
                        var config = {
                            templateUrl: 'foo'
                        };
                        expect(function () {
                            spModalService.confirm(config);
                        }).toThrow();
                    });

                    it('does not throw with templateUrl and controller but no content', function () {
                        var config = {
                            templateUrl: 'foo',
                            controller: 'fooCtrl as foo'
                        };
                        expect(function () {
                            spModalService.confirm(config);
                        }).not.toThrow();
                    });

                    it('does not throw with content but no templateUrl', function () {
                        var config = {
                            content: 'foo'
                        };
                        expect(function () {
                            spModalService.confirm(config);
                        }).not.toThrow();
                    });

                    it('calls open() with default configs', function () {
                        var config = {
                            content: 'foo bar'
                        };
                        spModalService.confirm(config);
                        expect(spModalService.open.calls.mostRecent().args[0].content).toBe(config.content);
                        expect(spModalService.open.calls.mostRecent().args[0].title).toBe('ui_modal_title_confirm');
                        expect(spModalService.open.calls.mostRecent().args[0].dialogId).toBe('confirmModal');
                        expect(spModalService.open.calls.mostRecent().args[0].warningLevel).toBeUndefined();
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[0].displayValue).toBe('ui_button_cancel');
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[1].displayValue).toBe('ui_button_ok');
                    });

                    it('calls open() with defined configs with content', function () {
                        var config = {
                            content: 'foo bar',
                            title: 'my title',
                            ok: 'my ok',
                            cancel: 'my cancel',
                            warningLevel: 'danger',
                            dialogId: 'specialConfirm'
                        };
                        spModalService.confirm(config);
                        expect(spModalService.open.calls.mostRecent().args[0].content).toBe(config.content);
                        expect(spModalService.open.calls.mostRecent().args[0].title).toBe(config.title);
                        expect(spModalService.open.calls.mostRecent().args[0].dialogId).toBe(config.dialogId);
                        expect(spModalService.open.calls.mostRecent().args[0].warningLevel).toBe(config.warningLevel);
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[0].displayValue).toBe(config.cancel);
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[1].displayValue).toBe(config.ok);
                    });

                    it('calls open() with defined configs with templateUrl', function () {
                        var config = {
                            templateUrl: 'foo',
                            controller: 'fooCtrl as foo',
                            resolve: {
                                foo: function () {
                                    return 'bar';
                                }
                            },
                            title: 'my title',
                            ok: 'my ok',
                            cancel: 'my cancel',
                            warningLevel: 'danger',
                            dialogId: 'specialConfirm'
                        };
                        spModalService.confirm(config);
                        expect(spModalService.open.calls.mostRecent().args[0].templateUrl).toBe(config.templateUrl);
                        expect(spModalService.open.calls.mostRecent().args[0].controller).toBe(config.controller);
                        expect(spModalService.open.calls.mostRecent().args[0].resolve).toBe(config.resolve);
                        expect(spModalService.open.calls.mostRecent().args[0].title).toBe(config.title);
                        expect(spModalService.open.calls.mostRecent().args[0].dialogId).toBe(config.dialogId);
                        expect(spModalService.open.calls.mostRecent().args[0].warningLevel).toBe(config.warningLevel);
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[0].displayValue).toBe(config.cancel);
                        expect(spModalService.open.calls.mostRecent().args[0].buttons[1].displayValue).toBe(config.ok);
                    });
                });

                describe('closeAll', function () {
                    var config = {
                        id: '1',
                        content: 'hi mom',
                        title: 'close test',
                        handleCancelPromise: true
                    },
                        config2 = {
                        id: '2',
                        content: 'hi dad',
                        title: 'close test',
                        handleCancelPromise: true
                    },
                        config3 = {
                        id: '3',
                        content: 'yo bro',
                        title: 'close test',
                        handleCancelPromise: true
                    };

                    it('should close multiple modals', function () {
                        var modals = [],
                            i;
                        modals.push(spModalService.open(config));
                        modals.push(spModalService.open(config2));
                        modals.push(spModalService.open(config3));

                        /* closeAll calls dismiss on each modal */
                        for (i = 0; i < modals.length; i++) {
                            spyOn(modals[i], 'dismiss').and.callThrough();
                        }
                        /* Manually cycle digest so dom is updated */
                        scope.$apply();

                        spModalService.closeAll();
                        /* Flush due to animation weirdness */
                        $timeout.flush();

                        for (i = 0; i < modals.length; i++) {
                            expect(modals[i].dismiss).toHaveBeenCalled();
                        }
                        expect(spModalService.modals.length).toBe(0);
                    });

                    it('should keep track of the number of open modals', function () {
                        var modals = [],
                            i;
                        modals.push(spModalService.open(config));
                        modals.push(spModalService.open(config2));
                        modals.push(spModalService.open(config3));

                        /* This test uses close and closeAll close closes but closeAll dismisses */
                        for (i = 0; i < modals.length; i++) {
                            spyOn(modals[i], 'close').and.callThrough();
                            spyOn(modals[i], 'dismiss').and.callThrough();
                        }
                        /* Manually cycle digest so dom is updated */
                        scope.$apply();

                        expect(spModalService.modals.length).toBe(3);
                        modals[1].close('get outta here');
                        scope.$apply();

                        expect(spModalService.modals.length).toBe(2);

                        spModalService.closeAll();
                        /* Flush due to animation weirdness */
                        $timeout.flush();

                        expect(modals[0].dismiss).toHaveBeenCalled();
                        expect(modals[1].close).toHaveBeenCalled();
                        expect(modals[2].dismiss).toHaveBeenCalled();

                        expect(spModalService.modals.length).toBe(0);
                    });

                    it('should close all modals on page change', function () {
                        var m1, m2, m3, $location;

                        inject(function (_$location_) {
                            $location = _$location_;
                        });

                        //set up dialogs just so we can make sure they close
                        m1 = spModalService.open(config);
                        m2 = spModalService.open(config2);
                        m3 = spModalService.open(config3);
                        scope.$apply();

                        expect(spModalService.modals.length).toBe(3);

                        //set our scope variable to an arbitrary location
                        $rootScope.actualLocation = '/testLocation';
                        //this setter will automatically add a slash so no slash is needed
                        $location.path('testLocation');
                        //now that the actual location and location.path are equal trigger digest cycle so that the watch method
                        //calls the closeAll method of spModalService
                        scope.$apply();
                        $timeout.flush();

                        //the SpModalService listener should have triggered and called closeAll
                        expect(spModalService.closeAll).toHaveBeenCalled();
                        expect(spModalService.modals.length).toBe(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RhbC9TcE1vZGFsU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTOzs7OztJQUt4Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGNBQWMsd0JBQXdCOztRQUUxQyxTQUFTLFlBQVk7WUFON0IsU0FBUyxrQkFBa0IsWUFBVzs7Z0JBRWxDLElBQUk7b0JBQUk7b0JBQVk7b0JBQVc7b0JBQWdCO29CQUFPO29CQUFnQjtvQkFBUTtvQkFBUztvQkFBVztvQkFDOUY7b0JBQWU7b0JBQ2YsUUFBUTtvQkFDUixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsZUFBZTs7O2dCQUduQixXQUFXLE9BQU8sYUFBYSxpQkFBaUIsVUFBUyxZQUFZOztvQkFFakUsV0FBVywyQkFBMkI7Ozs7Ozs7Z0JBTzFDLFdBQVcsT0FBTyxVQUFTLE1BQU0sY0FBYyxhQUFhLFdBQVcsV0FBVyxhQUFhLFlBQ3BFLGtCQUFrQjtvQkFDekMsSUFBSTtvQkFDSixLQUFLO29CQUNMLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixpQkFBaUI7b0JBQ2pCLFlBQVk7b0JBQ1osVUFBVTs7b0JBRVYsV0FBVztvQkFDWCxpQkFBaUI7b0JBQ2pCLGdCQUFnQjtvQkFDaEIsV0FBVzs7O29CQUdYLFFBQVEsV0FBVztvQkFDbkIsV0FBVyxRQUFRLFdBQVc7b0JBQzlCLE1BQU0sWUFBWSxRQUFRLElBQUksU0FBUyxZQUFXO3dCQUM5QyxJQUFHLENBQUMsc0JBQXNCOzRCQUN0Qix1QkFBdUI7NEJBQ3ZCLE9BQU87O3dCQUVYLE9BQU8sS0FBSzs7OztvQkFJaEIsTUFBTSxXQUFXLFFBQVEsSUFBSTs7O29CQUc3QixNQUFNLGdCQUFnQixZQUFZLElBQUk7OztvQkFHdEMsU0FBUzt3QkFDTCxPQUFPO3dCQUNQLFNBQVM7d0JBQ1Qs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LE1BQU0sT0FBTyxJQUFJLFNBQVMsSUFBSTs0QkFDOUIsTUFBTSxPQUFPLElBQUksV0FBVyxJQUFJOzs7d0JBR3BDLE1BQU07O3dCQUVOLE9BQU8sZUFBZSxPQUFPLFFBQVEsS0FBSzt3QkFDMUMsT0FBTyxHQUFHLE1BQU07d0JBQ2hCLE1BQU07O3dCQUVOLE9BQU8sZUFBZSxPQUFPLFFBQVEsS0FBSzs7d0JBRTFDLGVBQWU7O3dCQUVmLFNBQVM7O3dCQUVULE9BQU8sT0FBTyxHQUFHLFNBQVM7d0JBQzFCLE9BQU8sT0FBTyxHQUFHLE9BQU87d0JBQ3hCLE9BQU8sT0FBTyxHQUFHLFNBQVM7O3dCQUUxQixPQUFPLGVBQWUsT0FBTyxRQUFRLEtBQUs7OztvQkFHOUMsR0FBRywwQ0FBMEMsWUFBVzt3QkFDcEQsSUFBSSxJQUFJLElBQUksSUFBSTs7d0JBRWhCLE9BQU8sVUFBUyxhQUFhOzRCQUN6QixZQUFZOzs7O3dCQUloQixLQUFLLGVBQWUsS0FBSzt3QkFDekIsS0FBSyxlQUFlLEtBQUs7d0JBQ3pCLEtBQUssZUFBZSxLQUFLO3dCQUN6QixNQUFNOzt3QkFFTixPQUFPLGVBQWUsT0FBTyxRQUFRLEtBQUs7Ozt3QkFHMUMsV0FBVyxpQkFBaUI7O3dCQUU1QixVQUFVLEtBQUs7Ozt3QkFHZixNQUFNO3dCQUNOLFNBQVM7Ozt3QkFHVCxPQUFPLGVBQWUsVUFBVTt3QkFDaEMsT0FBTyxlQUFlLE9BQU8sUUFBUSxLQUFLOzs7Ozs7R0FvQ25EIiwiZmlsZSI6ImNvbW1vbi9tb2RhbC9TcE1vZGFsU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kYWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGFsL01vZGFsTW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIHNwTW9kYWxTZXJ2aWNlLlxuICovXG5kZXNjcmliZSgnc3BNb2RhbFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkcSwgJHJvb3RTY29wZSwgJHVpYk1vZGFsLCAkdGVtcGxhdGVDYWNoZSwgc2NvcGUsIHNwTW9kYWxTZXJ2aWNlLCBjb25maWcsICR3aW5kb3csICRkb2N1bWVudCwgJHRpbWVvdXQsXG4gICAgICAgIG1vZGFsSW5zdGFuY2UsIHByZWZsdXNoLFxuICAgICAgICB0aXRsZSA9ICdNeSBUaXRsZScsXG4gICAgICAgIGNvbnRlbnQgPSAnPGgxPkhpIG1vbSE8L2gxPicsXG4gICAgICAgIGlkID0gJ21vZGFsLTEyMzQ1NicsXG4gICAgICAgIGNhbmNlbEJ0bkNTUyA9ICdidG4tY2FuY2VsJztcblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIGNvbXBvbmVudCBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobW9kYWxNb2R1bGUsICduZ0FuaW1hdGVNb2NrJywgZnVuY3Rpb24oJHFQcm92aWRlcikge1xuICAgICAgICAvLyB3ZSB3YW50IHRvIHRlc3QgcmVqZWN0aW9ucyBoZXJlLCBhbGxvdyB0aGVtIHRocm91Z2ghXG4gICAgICAgICRxUHJvdmlkZXIuZXJyb3JPblVuaGFuZGxlZFJlamVjdGlvbnMoZmFsc2UpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBtb2NrcyBmb3Igb3VyIHRlc3RzLlxuICAgICAqL1xuICAgIC8qanNoaW50IG1heHBhcmFtczoxMCovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRxXywgXyRyb290U2NvcGVfLCBfJHVpYk1vZGFsXywgX3NwTW9kYWxfLCBfJHdpbmRvd18sIF8kZG9jdW1lbnRfLCBfJHRpbWVvdXRfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kdGVtcGxhdGVDYWNoZV8pIHtcbiAgICAgICAgdmFyIHJvb3RTY29wZUluaXRpYWxpemVkO1xuICAgICAgICAkcSA9IF8kcV87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICR1aWJNb2RhbCA9IF8kdWliTW9kYWxfO1xuICAgICAgICBzcE1vZGFsU2VydmljZSA9IF9zcE1vZGFsXztcbiAgICAgICAgJGRvY3VtZW50ID0gXyRkb2N1bWVudF87XG4gICAgICAgICR3aW5kb3cgPSBfJHdpbmRvd187XG4gICAgICAgIC8vIGZvY3VzIHR3aWRkbGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5IHNvIHdlIHdpbGwgaGF2ZSB0byBmbHVzaCB0aGUgdGltZW91dCBzZXJ2aWNlXG4gICAgICAgICR0aW1lb3V0ID0gXyR0aW1lb3V0XztcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUgPSBfJHRlbXBsYXRlQ2FjaGVfO1xuICAgICAgICBtb2RhbEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICAgICAgICBwcmVmbHVzaCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzY29wZSB0aGF0IHdpbGwgYmUgcmV0dXJuZWQgd2hlbiAkbmV3IGlzIGNhbGxlZC5cbiAgICAgICAgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgJHJvb3RTY29wZS5fJG5ldyA9ICRyb290U2NvcGUuJG5ldztcbiAgICAgICAgc3B5T24oJHJvb3RTY29wZSwgJyRuZXcnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZighcm9vdFNjb3BlSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICByb290U2NvcGVJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuXyRuZXcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3B5IG9uIHRoZSBvcGVuIGZ1bmN0aW9uIG9mIG1vZGFsLlxuICAgICAgICBzcHlPbigkdWliTW9kYWwsICdvcGVuJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgLy8gU3B5IG9uIHRoZSBjbG9zZUFsbCBzZXJ2aWNlIGZ1bmN0aW9uXG4gICAgICAgIHNweU9uKHNwTW9kYWxTZXJ2aWNlLCAnY2xvc2VBbGwnKS5hbmQuY2FsbFRocm91Z2goKTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBpZDogaWRcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICAvLyBBZnRlciBlYWNoIHRlc3QgcmVtb3ZlIHRoZSBtb2RhbCBkaWFsb2dcbiAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCRhbmltYXRlKSB7XG4gICAgICAgIC8qIERpZ2VzdCBhbnkgcmVtYWluaW5nIGV2ZW50cyAqL1xuICAgICAgICBzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICAvLyBDbG9zZSB0aGUgbW9kYWwgYW5kIGZsdXNoIHRoZSBhbmltYXRpb24gc28gaXQgYWN0dWFsbHkgY2xvc2VzXG4gICAgICAgIGlmKG1vZGFsSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgICAgICAgICRhbmltYXRlLmZsdXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZXN0cm95IHRoZSBzY29wZSBjcmVhdGVkIGluIGJlZm9yZUVhY2ggKi9cbiAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnb3BlbicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdhbGxvd3MgYSBudWxsIGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25maWcuaWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmRpYWxvZ0lkKS50b0VxdWFsKCdpbmZvTW9kYWwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIG5vIHRpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25maWcudGl0bGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gY29udGVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uZmlnLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTsgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY3JlYXRlcyBhIG5ldyBzY29wZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgIGV4cGVjdCgkcm9vdFNjb3BlLiRuZXcpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3BvcHVsYXRlcyB0aGUgbmV3IHNjb3BlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUudGl0bGUpLnRvRXF1YWwodGl0bGUpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmNvbnRlbnQpLnRvRXF1YWwoY29udGVudCk7XG4gICAgICAgICAgICBleHBlY3Qoc2NvcGUuZGlhbG9nSWQpLnRvRXF1YWwoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWxsb3dzIHRpdGxlIHRvIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5ld1RpdGxlID0gJ25ld1RpdGxlJztcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnRpdGxlKS50b0VxdWFsKHRpdGxlKTtcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2Uuc2V0VGl0bGUobmV3VGl0bGUpO1xuICAgICAgICAgICAgZXhwZWN0KHNjb3BlLnRpdGxlKS50b0VxdWFsKG5ld1RpdGxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIGEgbW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzO1xuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgIGV4cGVjdCgkdWliTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgYXJncyA9ICR1aWJNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xuICAgICAgICAgICAgZXhwZWN0KGFyZ3MudGVtcGxhdGVVcmwpLnRvRXF1YWwoJ3V0aWwvbW9kYWwtZGlhbG9nLmh0bWwnKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLnNjb3BlKS50b0VxdWFsKHNjb3BlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ29wZW5zIGFuIGFsZXJ0IG1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXJncztcbiAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ2FsZXJ0JztcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UgPSBzcE1vZGFsU2VydmljZS5vcGVuKGNvbmZpZyk7XG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGFyZ3MgPSAkdWliTW9kYWwub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLnRlbXBsYXRlVXJsKS50b0VxdWFsKCd1dGlsL21vZGFsLWFsZXJ0Lmh0bWwnKTtcbiAgICAgICAgICAgIGV4cGVjdChhcmdzLnNjb3BlKS50b0VxdWFsKHNjb3BlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ3dhcm5pbmcgbGV2ZWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIHdhcm5pbmcgY2xhc3Mgd2hlbiB3YXJuaW5nIGxldmVsIHNldCB3YXJuaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLndhcm5pbmdMZXZlbCA9ICd3YXJuaW5nJztcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoJy53YXJuaW5nLW1vZGFsJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoJy5kYW5nZXItbW9kYWwnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgaGF2ZSB0aGUgZGFuZ2VyIGNsYXNzIHdoZW4gd2FybmluZyBsZXZlbCBzZXQgdG8gZGFuZ2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLndhcm5pbmdMZXZlbCA9ICdkYW5nZXInO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UgPSBzcE1vZGFsU2VydmljZS5vcGVuKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudCgnLmRhbmdlci1tb2RhbCcpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KCcuYWxlcnQtd2FybmluZycpLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdGhlIG1vZGFsLWRhbmdlciBjbGFzcyB3aGVuIHNldCB0byBlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ2FsZXJ0JztcbiAgICAgICAgICAgICAgICBjb25maWcud2FybmluZ0xldmVsID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoJy5tb2RhbC1kYW5nZXInKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHRoZSBtb2RhbC13YXJuIGNsYXNzIHdoZW4gc2V0IHRvIHdhcm5pbmcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25maWcudHlwZSA9ICdhbGVydCc7XG4gICAgICAgICAgICAgICAgY29uZmlnLndhcm5pbmdMZXZlbCA9ICd3YXJuaW5nJztcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoJy5tb2RhbC13YXJuJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRlc2NyaWJlKCdidXR0b24gYWN0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2VBY3Rpb25GdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ0xPU0VfUkVTVUxUX1BST01JU0U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpc21pc3NBY3Rpb25GdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRElTTUlTU19SRVNVTFRfUFJPTUlTRTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIENMT1NFX0JUTl9JTkRFWCA9IDAsXG4gICAgICAgICAgICAgICAgRElTTUlTU19CVE5fSU5ERVggPSAxLFxuICAgICAgICAgICAgICAgIEVYVFJBX0JUTl9JTkRFWCA9IDIsXG4gICAgICAgICAgICAgICAgQ0FOQ0VMX0JUTl9JTkRFWCA9IDMsXG4gICAgICAgICAgICAgICAgQ0xPU0VfUkVTVUxUX1BST01JU0UsXG4gICAgICAgICAgICAgICAgRElTTUlTU19SRVNVTFRfUFJPTUlTRSxcbiAgICAgICAgICAgICAgICBDTE9TRV9SRVNVTFQgPSAnY2xvc2VkIGJ5IG1vZGFsIGJ1dHRvbicsXG4gICAgICAgICAgICAgICAgRElTTUlTU19SRVNVTFQgPSAnZGlzbWlzc2VkIGJ5IG1vZGFsIGJ1dHRvbicsXG4gICAgICAgICAgICAgICAgbW9kYWxCdXR0b25zLFxuICAgICAgICAgICAgICAgIGRvbSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlQWN0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICBidXR0b24xID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdmb28nLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGNsb3NlQWN0aW9uRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSwgYnV0dG9uMiA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkaXNtaXNzQWN0aW9uRnVuY3Rpb25cbiAgICAgICAgICAgICAgICB9LCBidXR0b24zID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdleHRyYScsXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhQ2xhc3M6ICdzb21lLWNsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICd0ZXN0RGlzYWJsZWQoKSdcbiAgICAgICAgICAgICAgICB9LCBidXR0b240ID0ge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICAgIHRtcC5yZXNvbHZlKERJU01JU1NfUkVTVUxUKTtcbiAgICAgICAgICAgICAgICBESVNNSVNTX1JFU1VMVF9QUk9NSVNFID0gdG1wLnByb21pc2U7XG4gICAgICAgICAgICAgICAgdG1wID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgICB0bXAucmVzb2x2ZShDTE9TRV9SRVNVTFQpO1xuICAgICAgICAgICAgICAgIENMT1NFX1JFU1VMVF9QUk9NSVNFID0gdG1wLnByb21pc2U7XG4gICAgICAgICAgICAgICAgc3B5T24oJHdpbmRvdywgJ2ZvY3VzJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICAgICAgZG9tID0gJGRvY3VtZW50WzBdO1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIGZvY3VzYWJsZSBlbGVtZW50IHRvIGJlIG91dCBhY3RpdmUgZWxlbWVudFxuICAgICAgICAgICAgICAgIHZpc2libGVBY3RpdmVFbGVtZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgZG9tLmJvZHkuYXBwZW5kQ2hpbGQodmlzaWJsZUFjdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZpc2libGVBY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGRpZCBub3QgcmVtb3ZlIHRoZSBlbGVtZW50IGR1cmluZyB0aGUgdGVzdCByZW1vdmUgaXQgbm93XG4gICAgICAgICAgICAgICAgaWYoZG9tLmJvZHkuY29udGFpbnModmlzaWJsZUFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5ib2R5LnJlbW92ZUNoaWxkKHZpc2libGVBY3RpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0dXBEaWFsb2dXaXRoQnV0dG9ucygpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYnV0dG9ucyA9IFtidXR0b24xLCBidXR0b24yLCBidXR0b24zLCBidXR0b240XTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9IGdldE1vZGFsQnV0dG9ucygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRNb2RhbEJ1dHRvbnMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGFsQnV0dG9ucyA9IGFuZ3VsYXIuZWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgLy8gW3hdICsgc3Itb25seSBjbG9zZSBidXR0b25zIHBsdXMgcGFzc2VkIGJ1dHRvblxuICAgICAgICAgICAgICAgIGV4cGVjdChtb2RhbEJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDYpO1xuICAgICAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9IG1vZGFsQnV0dG9ucy5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWxCdXR0b25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGhhdmUgYnV0dG9ucyBmb3IgZWFjaCBidXR0b24gaW4gdGhlIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICAvLyBDYXRjaCBhbGwgdGVzdCB0byBtYWtlIHN1cmUgZXZlcnl0aGluZyBsb29rcyBzYW5lXG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmJ1dHRvbnMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5idXR0b25zW0NMT1NFX0JUTl9JTkRFWF0uZGlzcGxheVZhbHVlKS50b0VxdWFsKGJ1dHRvbjEuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuYnV0dG9uc1tDTE9TRV9CVE5fSU5ERVhdLmFjdGlvbikudG9FcXVhbChjbG9zZUFjdGlvbkZ1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NvcGUuYnV0dG9uc1tDTE9TRV9CVE5fSU5ERVhdLmNsb3NlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmJ1dHRvbnNbRElTTUlTU19CVE5fSU5ERVhdLmRpc3BsYXlWYWx1ZSkudG9FcXVhbChidXR0b24yLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmJ1dHRvbnNbRElTTUlTU19CVE5fSU5ERVhdLmFjdGlvbikudG9FcXVhbChkaXNtaXNzQWN0aW9uRnVuY3Rpb24pO1xuICAgICAgICAgICAgICAgIGV4cGVjdChzY29wZS5idXR0b25zW0RJU01JU1NfQlROX0lOREVYXS5jbG9zZSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1vZGFsQnV0dG9uc1tDTE9TRV9CVE5fSU5ERVhdLmZpcnN0Q2hpbGQubm9kZVZhbHVlKS50b0VxdWFsKGJ1dHRvbjEuZGlzcGxheVZhbHVlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobW9kYWxCdXR0b25zW0RJU01JU1NfQlROX0lOREVYXS5maXJzdENoaWxkLm5vZGVWYWx1ZSkudG9FcXVhbChidXR0b24yLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHNjb3BlLmNvbnRlbnQpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBleGVjdXRlIHRoZSB0aGUgYXNzaWduZWQgZnVuY3Rpb24gYW5kIGRpc21pc3MgdGhlIGRpYWxvZyBpZiAnICtcbiAgICAgICAgICAgICAgICAnYSBub24tY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzbWlzc1NweSA9IGphc21pbmUuY3JlYXRlU3B5KCk7XG4gICAgICAgICAgICAgICAgc2V0dXBEaWFsb2dXaXRoQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LmNhdGNoKGRpc21pc3NTcHkpO1xuICAgICAgICAgICAgICAgIG1vZGFsQnV0dG9uc1tESVNNSVNTX0JUTl9JTkRFWF0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGlzbWlzc1NweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoRElTTUlTU19SRVNVTFQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgZXhlY3V0ZSB0aGUgdGhlIGFzc2lnbmVkIGZ1bmN0aW9uIGFuZCBjbG9zZSB0aGUgZGlhbG9nIGlmICcgK1xuICAgICAgICAgICAgICAgICdhIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsb3NlU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgICAgICAgICBzZXR1cERpYWxvZ1dpdGhCdXR0b25zKCk7XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihjbG9zZVNweSk7XG4gICAgICAgICAgICAgICAgbW9kYWxCdXR0b25zW0NMT1NFX0JUTl9JTkRFWF0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY2xvc2VTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKENMT1NFX1JFU1VMVCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZm9jdXMgdG8gYWN0aXZlIGVsZW1lbnQgYWZ0ZXIgbm9uLWNsb3NlIGJ1dHRvbiBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUFjdGl2ZUVsZW1lbnQuZm9jdXMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZm9jdXMnKTtcbiAgICAgICAgICAgICAgICAvLyBTcHkgb24gdGhlIGNvbnRhaW5zIGZ1bmN0aW9uIG9mIGRvY3VtZW50LlxuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbnNbRElTTUlTU19CVE5fSU5ERVhdLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgICAgICBwcmVmbHVzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHZpc2libGVBY3RpdmVFbGVtZW50LmZvY3VzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBmb2N1cyBvbiB3aW5kb3cgYWZ0ZXIgbm9uLWNsb3NlIGJ1dHRvbiBjbGlja2VkIHdoZW4gJyArXG4gICAgICAgICAgICAgICAgJ2FjdGl2ZSBlbGVtZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgZG9tJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gU3B5IG9uIHRoZSBjb250YWlucyBmdW5jdGlvbiBvZiBkb2N1bWVudC5cbiAgICAgICAgICAgICAgICBzZXR1cERpYWxvZ1dpdGhCdXR0b25zKCk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBhY3RpdmUgZWxlbWVudCB3ZSBvcGVuZWQgdGhlIGRpYWxvZyB3aXRoXG4gICAgICAgICAgICAgICAgZG9tLmJvZHkucmVtb3ZlQ2hpbGQodmlzaWJsZUFjdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIG1vZGFsQnV0dG9uc1tESVNNSVNTX0JUTl9JTkRFWF0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIHByZWZsdXNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBleHBlY3QoJHdpbmRvdy5mb2N1cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZvY3VzIHRvIGFjdGl2ZSBlbGVtZW50IGFmdGVyIGNsb3NlIGJ1dHRvbiBjbGlja2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZUFjdGl2ZUVsZW1lbnQuZm9jdXMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnZm9jdXMnKTtcbiAgICAgICAgICAgICAgICAvLyBTcHkgb24gdGhlIGNvbnRhaW5zIGZ1bmN0aW9uIG9mIGRvY3VtZW50LlxuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbnNbQ0xPU0VfQlROX0lOREVYXS5jbGljaygpO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgcHJlZmx1c2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIGV4cGVjdCh2aXNpYmxlQWN0aXZlRWxlbWVudC5mb2N1cykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZvY3VzIGFmdGVyIGNsb3NlIGJ1dHRvbiBjbGlja2VkIHdoZW4gJyArXG4gICAgICAgICAgICAgICAgJ2FjdGl2ZSBlbGVtZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgZG9tJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0dXBEaWFsb2dXaXRoQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgYWN0aXZlIGVsZW1lbnQgd2Ugb3BlbmVkIHRoZSBkaWFsb2cgd2l0aFxuICAgICAgICAgICAgICAgIGRvbS5ib2R5LnJlbW92ZUNoaWxkKHZpc2libGVBY3RpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBtb2RhbEJ1dHRvbnNbQ0xPU0VfQlROX0lOREVYXS5jbGljaygpO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgcHJlZmx1c2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIGV4cGVjdCgkd2luZG93LmZvY3VzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBkaXNhYmxlIGJ1dHRvbiBpZiBkaXNhYmxlZCB2YWx1ZSBldmFsdWF0ZXMgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRlc3REaXNhYmxlZCA9IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLnJldHVyblZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobW9kYWxCdXR0b25zW0VYVFJBX0JUTl9JTkRFWF0uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgZGlzYWJsZSBidXR0b24gaWYgZGlzYWJsZWQgdmFsdWUgZXZhbHVhdGVzIHRvIGZhbHNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudGVzdERpc2FibGVkID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQucmV0dXJuVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobW9kYWxCdXR0b25zW0VYVFJBX0JUTl9JTkRFWF0uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZnVuY3Rpb24gaWYgZGlzYWJsZWQgaXMgYSBmdW5jdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXNhYmxlZFZhbHVlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGlzYWJsZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnV0dG9uMy5kaXNhYmxlZCA9IGRpc2FibGVkU3B5O1xuICAgICAgICAgICAgICAgIHNldHVwRGlhbG9nV2l0aEJ1dHRvbnMoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZGlzYWJsZWRTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgICAgICBleHBlY3QobW9kYWxCdXR0b25zW0VYVFJBX0JUTl9JTkRFWF0uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZFNweS5jYWxscy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGRpc2FibGVkVmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkaXNhYmxlZFNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChtb2RhbEJ1dHRvbnNbRVhUUkFfQlROX0lOREVYXS5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGFkZCBleHRyYUNsYXNzIHRvIGJ1dHRvbiBpZiBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0dXBEaWFsb2dXaXRoQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQobW9kYWxCdXR0b25zW0VYVFJBX0JUTl9JTkRFWF0pLmhhc0NsYXNzKCdzb21lLWNsYXNzJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHVzZSBjYW5jZWwgYnV0dG9uIGNzcyBzdHlsZSBpZiBkZWZpbmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0dXBEaWFsb2dXaXRoQnV0dG9ucygpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQobW9kYWxCdXR0b25zW0NBTkNFTF9CVE5fSU5ERVhdKS5oYXNDbGFzcyhjYW5jZWxCdG5DU1MpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzY3JpYmUoJ2Rpc21pc3MgdXNpbmcgbW9kYWwgY29udHJvbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgcnVuIHRoZSBkaXNtaXNzIGZ1bmN0aW9uIGlmIHRoZSB4IGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzbWlzc1NweSA9IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICAgICAgICAgIHhCdXR0b247XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC5jYXRjaChkaXNtaXNzU3B5KTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB4QnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCdidXR0b24nKVswXTtcbiAgICAgICAgICAgICAgICB4QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRpc21pc3NTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGRpc21pc3MgaWYgdGhlIHNyLW9ubHkgY2xvc2UgYnV0dG9uIGlzIGNsaWNrZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzbWlzc1NweSA9IGphc21pbmUuY3JlYXRlU3B5KCksXG4gICAgICAgICAgICAgICAgICAgIHhCdXR0b247XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC5jYXRjaChkaXNtaXNzU3B5KTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB4QnV0dG9uID0gYW5ndWxhci5lbGVtZW50KCdidXR0b24nKVsxXTtcbiAgICAgICAgICAgICAgICB4QnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRpc21pc3NTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIGRpc21pc3MgaWYgdGhlIGVzYyBrZXkgaXMgcHJlc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXNtaXNzU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKSxcbiAgICAgICAgICAgICAgICAgICAga2V5UHJlc3NFdmVudCA9IGpRdWVyeS5FdmVudCgna2V5ZG93bicsIHt3aGljaDogMjd9KTtcbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LmNhdGNoKGRpc21pc3NTcHkpO1xuICAgICAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIGpRdWVyeS5ldmVudC50cmlnZ2VyKGtleVByZXNzRXZlbnQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChkaXNtaXNzU3B5KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnYXV0byBmb2N1cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJyb3dzZXJVdGlsLCBmb2N1c2VkRWw7XG5cbiAgICAgICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9icm93c2VyVXRpbF8pIHtcbiAgICAgICAgICAgICAgICBicm93c2VyVXRpbCA9IF9icm93c2VyVXRpbF87XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9wZW5BdXRvRm9jdXNFbE1vZGFsKGlkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVVcmwgPSAnc3Btb2RhbC90ZXN0LWF1dG8tZm9jdXMnO1xuICAgICAgICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCh0ZW1wbGF0ZVVybCwgJzxidXR0b24gaWQ9XCInICsgaWQgKyAnXCI+Q2xpY2sgTWU8L2J1dHRvbj4nKTtcbiAgICAgICAgICAgICAgICBjb25maWcuYXV0b0ZvY3VzID0gJyMnICsgaWQ7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmw7XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvcGVuQXV0b0ZvY3VzTW9kYWwoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbW9kYWxJbnN0YW5jZSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgICAgICBzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBleHBlY3RBY3RpdmVFbGVtZW50SWQoaWQpICB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEVsID0gJGRvY3VtZW50WzBdLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGZvY3VzZWRFbC5pZCkudG9FcXVhbChpZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0KCdmb2N1c2VzIG9uIHRoZSBzcGVjaWZpZWQgZWxlbWVudCB3aGVuIGEgcXVlcnkgc2VsZWN0b3Igc3RyaW5nIGlzIHBhc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNweU9uKGJyb3dzZXJVdGlsLCAnaXNJT1MnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBidG5JZCA9ICdjbGljay1tZS1idG4nO1xuICAgICAgICAgICAgICAgIG9wZW5BdXRvRm9jdXNFbE1vZGFsKGJ0bklkKTtcbiAgICAgICAgICAgICAgICBleHBlY3RBY3RpdmVFbGVtZW50SWQoYnRuSWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdmb2N1c2VzIG9uIHRoZSBjbG9zZSBidXR0b24gd2hlbiBlbmFibGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5T24oYnJvd3NlclV0aWwsICdpc0lPUycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9KTtcblxuICAgICAgICAgICAgICAgIG9wZW5BdXRvRm9jdXNNb2RhbCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdEFjdGl2ZUVsZW1lbnRJZCgnY2xvc2VNb2RhbERpYWxvZ0J0bicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdkb2VzIG5vdCBmb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uIHdoZW4gaW9zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc3B5T24oYnJvd3NlclV0aWwsICdpc0lPUycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0pO1xuXG4gICAgICAgICAgICAgICAgb3BlbkF1dG9Gb2N1c01vZGFsKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0QWN0aXZlRWxlbWVudElkKCcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaXNDb250ZXh0dWFsIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXR1cENvbnRleHR1YWxUZXN0KGlzQ29udGV4dHVhbCwgd2FybmluZ0xldmVsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmlzQ29udGV4dHVhbCA9IGlzQ29udGV4dHVhbDtcbiAgICAgICAgICAgICAgICBjb25maWcud2FybmluZ0xldmVsID0gd2FybmluZ0xldmVsO1xuICAgICAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UgPSBzcE1vZGFsU2VydmljZS5vcGVuKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZXhwZWN0SGFzSWNvbkNoaWxkKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGFuZ3VsYXIuZWxlbWVudCgnLm1vZGFsLXRpdGxlJylbMF07XG4gICAgICAgICAgICAgICAgZXhwZWN0KHRpdGxlLmNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZXhwZWN0SGFzTm9JY29uQ2hpbGQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gYW5ndWxhci5lbGVtZW50KCcubW9kYWwtdGl0bGUnKVswXTtcbiAgICAgICAgICAgICAgICBleHBlY3QodGl0bGUuY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIHRoZSBpY29uIHdoZW4gd2FybmluZyBpcyBub3QgZGVmaW5lZCBhbmQgaXNDb250ZXh0dWFsIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXR1cENvbnRleHR1YWxUZXN0KHRydWUsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0SGFzSWNvbkNoaWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIGljb24gd2hlbiB3YXJuaW5nTGV2ZWwgaXMgaW5mbyBhbmQgaXNDb250ZXh0dWFsIGlzIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXR1cENvbnRleHR1YWxUZXN0KHRydWUsICdpbmZvJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0SGFzSWNvbkNoaWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVuZGVyIHRoZSBpY29uIHdoZW4gd2FybmluZ0xldmVsIGlzIGluZm8gYW5kIGlzQ29udGV4dHVhbCBpcyBmYWxzeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldHVwQ29udGV4dHVhbFRlc3QodW5kZWZpbmVkLCAnaW5mbycpO1xuICAgICAgICAgICAgICAgIGV4cGVjdEhhc05vSWNvbkNoaWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVuZGVyIHRoZSBpY29uIHdoZW4gd2FybmluZ0xldmVsIGlzIG5vdCBkZWZpbmVkIGFuZCBpc0NvbnRleHR1YWwgaXMgZmFsc3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZXR1cENvbnRleHR1YWxUZXN0KGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdEhhc05vSWNvbkNoaWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIGljb24gd2hlbiB3YXJuaW5nTGV2ZWwgaXMgYW55IHZhbGlkIHZhbHVlIHRoYXQgJyArXG4gICAgICAgICAgICAgICAgJ2lzIG5vdCBpbmZvIGFuZCB1c0NvbnRleHR1YWwgaXMgZmFsc2V5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0dXBDb250ZXh0dWFsVGVzdChmYWxzZSwgJ3dhcm5pbmcnKTtcbiAgICAgICAgICAgICAgICBleHBlY3RIYXNJY29uQ2hpbGQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgaWNvbiB3aGVuIHdhcm5pbmdMZXZlbCBpcyBhbnkgdmFsaWQgdmFsdWUgdGhhdCAnICtcbiAgICAgICAgICAgICAgICAnaXMgbm90IGluZm8gYW5kIHVzQ29udGV4dHVhbCBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2V0dXBDb250ZXh0dWFsVGVzdCh0cnVlLCAnZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0SGFzSWNvbkNoaWxkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb25maXJtJywgKCkgPT4ge1xuXG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbFNlcnZpY2UsICdvcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyBjb250ZW50IGFuZCBubyB0ZW1wbGF0ZVVybCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcE1vZGFsU2VydmljZS5jb25maXJtKGNvbmZpZyk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIHRlbXBsYXRlVXJsIGJ1dCBubyBjb250cm9sbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZm9vJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3BNb2RhbFNlcnZpY2UuY29uZmlybShjb25maWcpOyB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCB0aHJvdyB3aXRoIHRlbXBsYXRlVXJsIGFuZCBjb250cm9sbGVyIGJ1dCBubyBjb250ZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZm9vJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZm9vQ3RybCBhcyBmb28nXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcE1vZGFsU2VydmljZS5jb25maXJtKGNvbmZpZyk7IH0pLm5vdC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCB0aHJvdyB3aXRoIGNvbnRlbnQgYnV0IG5vIHRlbXBsYXRlVXJsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdmb28nXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkgeyBzcE1vZGFsU2VydmljZS5jb25maXJtKGNvbmZpZyk7IH0pLm5vdC50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyBvcGVuKCkgd2l0aCBkZWZhdWx0IGNvbmZpZ3MnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdmb28gYmFyJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNwTW9kYWxTZXJ2aWNlLmNvbmZpcm0oY29uZmlnKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmNvbnRlbnQpLnRvQmUoY29uZmlnLmNvbnRlbnQpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0udGl0bGUpLnRvQmUoJ3VpX21vZGFsX3RpdGxlX2NvbmZpcm0nKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmRpYWxvZ0lkKS50b0JlKCdjb25maXJtTW9kYWwnKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLndhcm5pbmdMZXZlbCkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uYnV0dG9uc1swXS5kaXNwbGF5VmFsdWUpLnRvQmUoJ3VpX2J1dHRvbl9jYW5jZWwnKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmJ1dHRvbnNbMV0uZGlzcGxheVZhbHVlKS50b0JlKCd1aV9idXR0b25fb2snKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NhbGxzIG9wZW4oKSB3aXRoIGRlZmluZWQgY29uZmlncyB3aXRoIGNvbnRlbnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdmb28gYmFyJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJ215IHRpdGxlJyxcbiAgICAgICAgICAgICAgICBvazogJ215IG9rJyxcbiAgICAgICAgICAgICAgICBjYW5jZWw6ICdteSBjYW5jZWwnLFxuICAgICAgICAgICAgICAgIHdhcm5pbmdMZXZlbDogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgZGlhbG9nSWQ6ICdzcGVjaWFsQ29uZmlybSdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzcE1vZGFsU2VydmljZS5jb25maXJtKGNvbmZpZyk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2Uub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5jb250ZW50KS50b0JlKGNvbmZpZy5jb250ZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLnRpdGxlKS50b0JlKGNvbmZpZy50aXRsZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2Uub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5kaWFsb2dJZCkudG9CZShjb25maWcuZGlhbG9nSWQpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ud2FybmluZ0xldmVsKS50b0JlKGNvbmZpZy53YXJuaW5nTGV2ZWwpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uYnV0dG9uc1swXS5kaXNwbGF5VmFsdWUpLnRvQmUoY29uZmlnLmNhbmNlbCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2Uub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5idXR0b25zWzFdLmRpc3BsYXlWYWx1ZSkudG9CZShjb25maWcub2spO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgb3BlbigpIHdpdGggZGVmaW5lZCBjb25maWdzIHdpdGggdGVtcGxhdGVVcmwnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZm9vJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZm9vQ3RybCBhcyBmb28nLFxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAoKSA9PiB7IHJldHVybiAnYmFyJzsgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdteSB0aXRsZScsXG4gICAgICAgICAgICAgICAgb2s6ICdteSBvaycsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiAnbXkgY2FuY2VsJyxcbiAgICAgICAgICAgICAgICB3YXJuaW5nTGV2ZWw6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgIGRpYWxvZ0lkOiAnc3BlY2lhbENvbmZpcm0nXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3BNb2RhbFNlcnZpY2UuY29uZmlybShjb25maWcpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0udGVtcGxhdGVVcmwpLnRvQmUoY29uZmlnLnRlbXBsYXRlVXJsKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmNvbnRyb2xsZXIpLnRvQmUoY29uZmlnLmNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0ucmVzb2x2ZSkudG9CZShjb25maWcucmVzb2x2ZSk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2Uub3Blbi5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS50aXRsZSkudG9CZShjb25maWcudGl0bGUpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uZGlhbG9nSWQpLnRvQmUoY29uZmlnLmRpYWxvZ0lkKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLndhcm5pbmdMZXZlbCkudG9CZShjb25maWcud2FybmluZ0xldmVsKTtcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsU2VydmljZS5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdLmJ1dHRvbnNbMF0uZGlzcGxheVZhbHVlKS50b0JlKGNvbmZpZy5jYW5jZWwpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF0uYnV0dG9uc1sxXS5kaXNwbGF5VmFsdWUpLnRvQmUoY29uZmlnLm9rKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2xvc2VBbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBpZCA6ICcxJyxcbiAgICAgICAgICAgICAgICBjb250ZW50IDogJ2hpIG1vbScsXG4gICAgICAgICAgICAgICAgdGl0bGUgOiAnY2xvc2UgdGVzdCcsXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsUHJvbWlzZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZzIgPSB7XG4gICAgICAgICAgICAgICAgaWQgOiAnMicsXG4gICAgICAgICAgICAgICAgY29udGVudCA6ICdoaSBkYWQnLFxuICAgICAgICAgICAgICAgIHRpdGxlIDogJ2Nsb3NlIHRlc3QnLFxuICAgICAgICAgICAgICAgIGhhbmRsZUNhbmNlbFByb21pc2U6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWczID0ge1xuICAgICAgICAgICAgICAgIGlkIDogJzMnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiAneW8gYnJvJyxcbiAgICAgICAgICAgICAgICB0aXRsZSA6ICdjbG9zZSB0ZXN0JyxcbiAgICAgICAgICAgICAgICBoYW5kbGVDYW5jZWxQcm9taXNlOiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2xvc2UgbXVsdGlwbGUgbW9kYWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbW9kYWxzID0gW10sXG4gICAgICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIG1vZGFscy5wdXNoKHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKSk7XG4gICAgICAgICAgICBtb2RhbHMucHVzaChzcE1vZGFsU2VydmljZS5vcGVuKGNvbmZpZzIpKTtcbiAgICAgICAgICAgIG1vZGFscy5wdXNoKHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnMykpO1xuXG4gICAgICAgICAgICAvKiBjbG9zZUFsbCBjYWxscyBkaXNtaXNzIG9uIGVhY2ggbW9kYWwgKi9cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG1vZGFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNweU9uKG1vZGFsc1tpXSwgJ2Rpc21pc3MnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIE1hbnVhbGx5IGN5Y2xlIGRpZ2VzdCBzbyBkb20gaXMgdXBkYXRlZCAqL1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIHNwTW9kYWxTZXJ2aWNlLmNsb3NlQWxsKCk7XG4gICAgICAgICAgICAvKiBGbHVzaCBkdWUgdG8gYW5pbWF0aW9uIHdlaXJkbmVzcyAqL1xuICAgICAgICAgICAgJHRpbWVvdXQuZmx1c2goKTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbW9kYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG1vZGFsc1tpXS5kaXNtaXNzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBrZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygb3BlbiBtb2RhbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgICAgICAgICAgICBpO1xuICAgICAgICAgICAgbW9kYWxzLnB1c2goc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcpKTtcbiAgICAgICAgICAgIG1vZGFscy5wdXNoKHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnMikpO1xuICAgICAgICAgICAgbW9kYWxzLnB1c2goc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWczKSk7XG5cbiAgICAgICAgICAgIC8qIFRoaXMgdGVzdCB1c2VzIGNsb3NlIGFuZCBjbG9zZUFsbCBjbG9zZSBjbG9zZXMgYnV0IGNsb3NlQWxsIGRpc21pc3NlcyAqL1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbW9kYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3B5T24obW9kYWxzW2ldLCAnY2xvc2UnKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgICAgICBzcHlPbihtb2RhbHNbaV0sICdkaXNtaXNzJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBNYW51YWxseSBjeWNsZSBkaWdlc3Qgc28gZG9tIGlzIHVwZGF0ZWQgKi9cbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgzKTtcbiAgICAgICAgICAgIG1vZGFsc1sxXS5jbG9zZSgnZ2V0IG91dHRhIGhlcmUnKTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgyKTtcblxuICAgICAgICAgICAgc3BNb2RhbFNlcnZpY2UuY2xvc2VBbGwoKTtcbiAgICAgICAgICAgIC8qIEZsdXNoIGR1ZSB0byBhbmltYXRpb24gd2VpcmRuZXNzICovXG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuXG4gICAgICAgICAgICBleHBlY3QobW9kYWxzWzBdLmRpc21pc3MpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbHNbMV0uY2xvc2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbHNbMl0uZGlzbWlzcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjbG9zZSBhbGwgbW9kYWxzIG9uIHBhZ2UgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbTEsIG0yLCBtMywgJGxvY2F0aW9uO1xuXG4gICAgICAgICAgICBpbmplY3QoZnVuY3Rpb24oXyRsb2NhdGlvbl8pIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24gPSBfJGxvY2F0aW9uXztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3NldCB1cCBkaWFsb2dzIGp1c3Qgc28gd2UgY2FuIG1ha2Ugc3VyZSB0aGV5IGNsb3NlXG4gICAgICAgICAgICBtMSA9IHNwTW9kYWxTZXJ2aWNlLm9wZW4oY29uZmlnKTtcbiAgICAgICAgICAgIG0yID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWcyKTtcbiAgICAgICAgICAgIG0zID0gc3BNb2RhbFNlcnZpY2Uub3Blbihjb25maWczKTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgzKTtcblxuICAgICAgICAgICAgLy9zZXQgb3VyIHNjb3BlIHZhcmlhYmxlIHRvIGFuIGFyYml0cmFyeSBsb2NhdGlvblxuICAgICAgICAgICAgJHJvb3RTY29wZS5hY3R1YWxMb2NhdGlvbiA9ICcvdGVzdExvY2F0aW9uJztcbiAgICAgICAgICAgIC8vdGhpcyBzZXR0ZXIgd2lsbCBhdXRvbWF0aWNhbGx5IGFkZCBhIHNsYXNoIHNvIG5vIHNsYXNoIGlzIG5lZWRlZFxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJ3Rlc3RMb2NhdGlvbicpO1xuICAgICAgICAgICAgLy9ub3cgdGhhdCB0aGUgYWN0dWFsIGxvY2F0aW9uIGFuZCBsb2NhdGlvbi5wYXRoIGFyZSBlcXVhbCB0cmlnZ2VyIGRpZ2VzdCBjeWNsZSBzbyB0aGF0IHRoZSB3YXRjaCBtZXRob2RcbiAgICAgICAgICAgIC8vY2FsbHMgdGhlIGNsb3NlQWxsIG1ldGhvZCBvZiBzcE1vZGFsU2VydmljZVxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICAkdGltZW91dC5mbHVzaCgpO1xuXG4gICAgICAgICAgICAvL3RoZSBTcE1vZGFsU2VydmljZSBsaXN0ZW5lciBzaG91bGQgaGF2ZSB0cmlnZ2VyZWQgYW5kIGNhbGxlZCBjbG9zZUFsbFxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWxTZXJ2aWNlLmNsb3NlQWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbFNlcnZpY2UubW9kYWxzLmxlbmd0aCkudG9CZSgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
