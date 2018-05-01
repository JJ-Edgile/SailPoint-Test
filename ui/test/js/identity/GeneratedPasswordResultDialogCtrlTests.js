System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule', './LinkTestData'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_LinkTestData) {}],
        execute: function () {

            /**
             * Tests for the GeneratePasswordResultDialogCtrl.
             */
            describe('GeneratedPasswordResultDialogCtrl', function () {

                var $controller = undefined,
                    testService = undefined,
                    ctrl = undefined,
                    $q = undefined,
                    PasswordChangeItem = undefined,
                    PasswordChangeError = undefined,
                    PasswordLink = undefined,
                    passwordChanges = undefined,
                    passwordChangeErrors = undefined,
                    links = undefined;

                // Load the test module to get the testService and identity module.
                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_testService_, _$controller_, _$q_, _PasswordChangeItem_, _PasswordChangeError_, _PasswordLink_) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    $q = _$q_;
                    PasswordChangeItem = _PasswordChangeItem_;
                    PasswordChangeError = _PasswordChangeError_;
                    PasswordLink = _PasswordLink_;

                    passwordChanges = [];
                    passwordChanges.push(new _PasswordChangeItem_({
                        linkId: '123',
                        password: 'asdf',
                        status: 'good'
                    }));
                    passwordChanges.push(new _PasswordChangeItem_({
                        linkId: '345',
                        password: 'asdf',
                        status: 'bad'
                    }));
                    passwordChanges.push(new _PasswordChangeItem_({
                        linkId: '567',
                        password: 'asdf',
                        status: 'eee'
                    }));

                    passwordChangeErrors = [];
                    passwordChangeErrors.push(new _PasswordChangeError_({
                        linkId: '999',
                        messages: ['asdf'],
                        constraintsViolation: false
                    }));

                    links = [];
                    links.push(new PasswordLink({
                        id: '123',
                        applicationName: 'brosDB',
                        accountName: 'teddy.brosevelt'
                    }));
                    links.push(new PasswordLink({
                        id: '999',
                        applicationName: 'brosDB',
                        accountName: 'brofessor.puddington.mcgee'
                    }));
                }));

                describe('hasSinglePassword', function () {
                    it('returns true for all links with same password', function () {
                        // Create the controller to test with.
                        ctrl = $controller('GeneratedPasswordResultDialogCtrl', {
                            passwordChanges: passwordChanges,
                            passwordChangeErrors: []
                        });
                        expect(ctrl.hasSinglePassword()).toBeTruthy();
                    });

                    it('returns false for links with one different password', function () {
                        // Create the controller to test with.
                        passwordChanges.push(new PasswordChangeItem({
                            linkId: '123',
                            password: 'erasdf',
                            status: 'good'
                        }));
                        ctrl = $controller('GeneratedPasswordResultDialogCtrl', {
                            passwordChanges: passwordChanges,
                            passwordChangeErrors: []
                        });
                        expect(ctrl.hasSinglePassword()).toBeFalsy();
                    });

                    it('returns false for any password errors', function () {
                        // Create the controller to test with.
                        ctrl = $controller('GeneratedPasswordResultDialogCtrl', {
                            passwordChanges: passwordChanges,
                            passwordChangeErrors: passwordChangeErrors
                        });
                        expect(ctrl.hasSinglePassword()).toBeFalsy();
                    });

                    it('returns false for single password change', function () {
                        var singlePasswordChanges = [];

                        singlePasswordChanges.push(new PasswordChangeItem({
                            linkId: '123',
                            password: 'erasdf',
                            status: 'good'
                        }));

                        // Create the controller to test with.
                        ctrl = $controller('GeneratedPasswordResultDialogCtrl', {
                            passwordChanges: singlePasswordChanges,
                            passwordChangeErrors: []
                        });
                        expect(ctrl.hasSinglePassword()).toBeFalsy();
                    });

                    it('returns false for empty password change', function () {
                        // Create the controller to test with.
                        ctrl = $controller('GeneratedPasswordResultDialogCtrl', {
                            passwordChanges: [],
                            passwordChangeErrors: []
                        });
                        expect(ctrl.hasSinglePassword()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0dlbmVyYXRlZFBhc3N3b3JkUmVzdWx0RGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsc0JBQXNCLG1CQUFtQixVQUFVLFNBQVM7OztJQUcvSDs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLGVBQWU7UUFDNUIsU0FBUyxZQUFZOzs7OztZQUY3QixTQUFTLHFDQUFxQyxZQUFXOztnQkFFckQsSUFBSSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsT0FBSTtvQkFBRSxLQUFFO29CQUFFLHFCQUFrQjtvQkFBRSxzQkFBbUI7b0JBQUUsZUFBWTtvQkFDekYsa0JBQWU7b0JBQUUsdUJBQW9CO29CQUFFLFFBQUs7OztnQkFHaEQsV0FBVyxPQUFPLFlBQVk7Ozs7O2dCQUs5QixXQUFXLE9BQU8sVUFBUyxlQUFlLGVBQWUsTUFBTSxzQkFDcEMsdUJBQXVCLGdCQUFnQjs7O29CQUc5RCxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsS0FBSztvQkFDTCxxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsZUFBZTs7b0JBRWYsa0JBQWtCO29CQUNsQixnQkFBZ0IsS0FBSyxJQUFJLHFCQUFxQjt3QkFDMUMsUUFBUTt3QkFDUixVQUFVO3dCQUNWLFFBQVE7O29CQUVaLGdCQUFnQixLQUFLLElBQUkscUJBQXFCO3dCQUMxQyxRQUFRO3dCQUNSLFVBQVU7d0JBQ1YsUUFBUTs7b0JBRVosZ0JBQWdCLEtBQUssSUFBSSxxQkFBcUI7d0JBQzFDLFFBQVE7d0JBQ1IsVUFBVTt3QkFDVixRQUFROzs7b0JBR1osdUJBQXVCO29CQUN2QixxQkFBcUIsS0FBSyxJQUFJLHNCQUFzQjt3QkFDaEQsUUFBUTt3QkFDUixVQUFVLENBQUM7d0JBQ1gsc0JBQXNCOzs7b0JBRzFCLFFBQVE7b0JBQ1IsTUFBTSxLQUFLLElBQUksYUFBYTt3QkFDeEIsSUFBSTt3QkFDSixpQkFBaUI7d0JBQ2pCLGFBQWE7O29CQUVqQixNQUFNLEtBQUssSUFBSSxhQUFhO3dCQUN4QixJQUFJO3dCQUNKLGlCQUFpQjt3QkFDakIsYUFBYTs7OztnQkFJckIsU0FBUyxxQkFBcUIsWUFBVztvQkFDckMsR0FBRyxpREFBaUQsWUFBVzs7d0JBRTNELE9BQU8sWUFBWSxxQ0FBcUM7NEJBQ3BELGlCQUFpQjs0QkFDakIsc0JBQXNCOzt3QkFFMUIsT0FBTyxLQUFLLHFCQUFxQjs7O29CQUdyQyxHQUFHLHVEQUF1RCxZQUFXOzt3QkFFakUsZ0JBQWdCLEtBQUssSUFBSSxtQkFBbUI7NEJBQ3hDLFFBQVE7NEJBQ1IsVUFBVTs0QkFDVixRQUFROzt3QkFFWixPQUFPLFlBQVkscUNBQXFDOzRCQUNwRCxpQkFBaUI7NEJBQ2pCLHNCQUFzQjs7d0JBRTFCLE9BQU8sS0FBSyxxQkFBcUI7OztvQkFHckMsR0FBRyx5Q0FBeUMsWUFBVzs7d0JBRW5ELE9BQU8sWUFBWSxxQ0FBcUM7NEJBQ3BELGlCQUFpQjs0QkFDakIsc0JBQXNCOzt3QkFFMUIsT0FBTyxLQUFLLHFCQUFxQjs7O29CQUdyQyxHQUFHLDRDQUE0QyxZQUFXO3dCQUN0RCxJQUFJLHdCQUF3Qjs7d0JBRTVCLHNCQUFzQixLQUFLLElBQUksbUJBQW1COzRCQUM5QyxRQUFROzRCQUNSLFVBQVU7NEJBQ1YsUUFBUTs7Ozt3QkFJWixPQUFPLFlBQVkscUNBQXFDOzRCQUNwRCxpQkFBaUI7NEJBQ2pCLHNCQUFzQjs7d0JBRTFCLE9BQU8sS0FBSyxxQkFBcUI7OztvQkFHckMsR0FBRywyQ0FBMkMsWUFBVzs7d0JBRXJELE9BQU8sWUFBWSxxQ0FBcUM7NEJBQ3BELGlCQUFpQjs0QkFDakIsc0JBQXNCOzt3QkFFMUIsT0FBTyxLQUFLLHFCQUFxQjs7Ozs7O0dBb0IxQyIsImZpbGUiOiJpZGVudGl0eS9HZW5lcmF0ZWRQYXNzd29yZFJlc3VsdERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuaW1wb3J0ICcuL0xpbmtUZXN0RGF0YSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBHZW5lcmF0ZVBhc3N3b3JkUmVzdWx0RGlhbG9nQ3RybC5cbiAqL1xuZGVzY3JpYmUoJ0dlbmVyYXRlZFBhc3N3b3JkUmVzdWx0RGlhbG9nQ3RybCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyLCB0ZXN0U2VydmljZSwgY3RybCwgJHEsIFBhc3N3b3JkQ2hhbmdlSXRlbSwgUGFzc3dvcmRDaGFuZ2VFcnJvciwgUGFzc3dvcmRMaW5rLFxuICAgICAgICBwYXNzd29yZENoYW5nZXMsIHBhc3N3b3JkQ2hhbmdlRXJyb3JzLCBsaW5rcztcblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UgYW5kIGlkZW50aXR5IG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBpZGVudGl0eU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcV8sIF9QYXNzd29yZENoYW5nZUl0ZW1fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9QYXNzd29yZENoYW5nZUVycm9yXywgX1Bhc3N3b3JkTGlua18pIHtcblxuICAgICAgICAvLyBTYXZlIHRoZSBzZXJ2aWNlcy5cbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xuICAgICAgICB0ZXN0U2VydmljZSA9IF90ZXN0U2VydmljZV87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgUGFzc3dvcmRDaGFuZ2VJdGVtID0gX1Bhc3N3b3JkQ2hhbmdlSXRlbV87XG4gICAgICAgIFBhc3N3b3JkQ2hhbmdlRXJyb3IgPSBfUGFzc3dvcmRDaGFuZ2VFcnJvcl87XG4gICAgICAgIFBhc3N3b3JkTGluayA9IF9QYXNzd29yZExpbmtfO1xuXG4gICAgICAgIHBhc3N3b3JkQ2hhbmdlcyA9IFtdO1xuICAgICAgICBwYXNzd29yZENoYW5nZXMucHVzaChuZXcgX1Bhc3N3b3JkQ2hhbmdlSXRlbV8oe1xuICAgICAgICAgICAgbGlua0lkOiAnMTIzJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnYXNkZicsXG4gICAgICAgICAgICBzdGF0dXM6ICdnb29kJ1xuICAgICAgICB9KSk7XG4gICAgICAgIHBhc3N3b3JkQ2hhbmdlcy5wdXNoKG5ldyBfUGFzc3dvcmRDaGFuZ2VJdGVtXyh7XG4gICAgICAgICAgICBsaW5rSWQ6ICczNDUnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICdhc2RmJyxcbiAgICAgICAgICAgIHN0YXR1czogJ2JhZCdcbiAgICAgICAgfSkpO1xuICAgICAgICBwYXNzd29yZENoYW5nZXMucHVzaChuZXcgX1Bhc3N3b3JkQ2hhbmdlSXRlbV8oe1xuICAgICAgICAgICAgbGlua0lkOiAnNTY3JyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnYXNkZicsXG4gICAgICAgICAgICBzdGF0dXM6ICdlZWUnXG4gICAgICAgIH0pKTtcblxuICAgICAgICBwYXNzd29yZENoYW5nZUVycm9ycyA9IFtdO1xuICAgICAgICBwYXNzd29yZENoYW5nZUVycm9ycy5wdXNoKG5ldyBfUGFzc3dvcmRDaGFuZ2VFcnJvcl8oe1xuICAgICAgICAgICAgbGlua0lkOiAnOTk5JyxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbJ2FzZGYnXSxcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzVmlvbGF0aW9uOiBmYWxzZVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbGlua3MgPSBbXTtcbiAgICAgICAgbGlua3MucHVzaChuZXcgUGFzc3dvcmRMaW5rKHtcbiAgICAgICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ2Jyb3NEQicsXG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJ3RlZGR5LmJyb3NldmVsdCdcbiAgICAgICAgfSkpO1xuICAgICAgICBsaW5rcy5wdXNoKG5ldyBQYXNzd29yZExpbmsoe1xuICAgICAgICAgICAgaWQ6ICc5OTknLFxuICAgICAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnYnJvc0RCJyxcbiAgICAgICAgICAgIGFjY291bnROYW1lOiAnYnJvZmVzc29yLnB1ZGRpbmd0b24ubWNnZWUnXG4gICAgICAgIH0pKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaGFzU2luZ2xlUGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYWxsIGxpbmtzIHdpdGggc2FtZSBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignR2VuZXJhdGVkUGFzc3dvcmRSZXN1bHREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlczogcGFzc3dvcmRDaGFuZ2VzLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlRXJyb3JzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNTaW5nbGVQYXNzd29yZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBsaW5rcyB3aXRoIG9uZSBkaWZmZXJlbnQgcGFzc3dvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBwYXNzd29yZENoYW5nZXMucHVzaChuZXcgUGFzc3dvcmRDaGFuZ2VJdGVtKHtcbiAgICAgICAgICAgICAgICBsaW5rSWQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnZXJhc2RmJyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdnb29kJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdHZW5lcmF0ZWRQYXNzd29yZFJlc3VsdERpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VzOiBwYXNzd29yZENoYW5nZXMsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VFcnJvcnM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1NpbmdsZVBhc3N3b3JkKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYW55IHBhc3N3b3JkIGVycm9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignR2VuZXJhdGVkUGFzc3dvcmRSZXN1bHREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlczogcGFzc3dvcmRDaGFuZ2VzLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlRXJyb3JzOiBwYXNzd29yZENoYW5nZUVycm9yc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNTaW5nbGVQYXNzd29yZCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHNpbmdsZSBwYXNzd29yZCBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzaW5nbGVQYXNzd29yZENoYW5nZXMgPSBbXTtcblxuICAgICAgICAgICAgc2luZ2xlUGFzc3dvcmRDaGFuZ2VzLnB1c2gobmV3IFBhc3N3b3JkQ2hhbmdlSXRlbSh7XG4gICAgICAgICAgICAgICAgbGlua0lkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJ2VyYXNkZicsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnZ29vZCdcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignR2VuZXJhdGVkUGFzc3dvcmRSZXN1bHREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlczogc2luZ2xlUGFzc3dvcmRDaGFuZ2VzLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlRXJyb3JzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5oYXNTaW5nbGVQYXNzd29yZCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGVtcHR5IHBhc3N3b3JkIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignR2VuZXJhdGVkUGFzc3dvcmRSZXN1bHREaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hhbmdlczogW10sXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDaGFuZ2VFcnJvcnM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc1NpbmdsZVBhc3N3b3JkKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
