System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Tests for the NewPasswordStepHandler.
     */
    'use strict';

    var identityModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('NewPasswordStepHandler', function () {

                var NewPasswordStepHandler = undefined,
                    testService = undefined,
                    $q = undefined,
                    handler = undefined,
                    managePasswordService = undefined,
                    promiseTrackerService = undefined,
                    policies = [],
                    selectionModel = {},
                    linkPasswordMap = [],
                    identityId = 'id1',
                    $rootScope = undefined,
                    linkId = 'link1',
                    managePasswordDataService = undefined;

                beforeEach(module(testModule, identityModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                /* jshint maxparams: 8 */
                beforeEach(inject(function (_NewPasswordStepHandler_, _testService_, _$q_, linkTestData, _managePasswordService_, _managePasswordDataService_, _promiseTrackerService_, _$rootScope_) {
                    NewPasswordStepHandler = _NewPasswordStepHandler_;
                    testService = _testService_;
                    $q = _$q_;
                    managePasswordService = _managePasswordService_;
                    managePasswordDataService = _managePasswordDataService_;
                    promiseTrackerService = _promiseTrackerService_;
                    linkPasswordMap[linkId] = 'somepassword';
                    $rootScope = _$rootScope_;

                    spyOn(promiseTrackerService, 'track');

                    // Create the StepHandler to test with.
                    handler = new NewPasswordStepHandler(selectionModel, linkPasswordMap, identityId, policies, managePasswordService, managePasswordDataService, promiseTrackerService, $q);
                }));

                describe('constructor', function () {
                    it('initializes values correctly', function () {
                        expect(handler.identityId).toEqual(identityId);
                        expect(handler.selectionModel).toEqual(selectionModel);
                        expect(handler.linkPasswordMap[linkId]).toEqual(linkPasswordMap[linkId]);
                        expect(handler.policies).toEqual(policies);
                        expect(handler.newPassword).toEqual('');
                        expect(handler.confirmPassword).toEqual('');
                        expect(handler.showPassword).toBeFalsy();
                    });
                });

                describe('getInputType', function () {
                    it('return input type password when show password is set to false', function () {
                        expect(handler.getInputType()).toEqual('password');
                    });

                    it('return input type text when show password is set to true', function () {
                        handler.showPassword = true;
                        expect(handler.getInputType()).toEqual('text');
                    });
                });

                it('returns the get save button label', function () {
                    expect(handler.getSaveButtonLabel(true)).toEqual('ui_submit');
                });

                it('returns the step id', function () {
                    expect(handler.getStepId()).toEqual('newPasswordInput');
                });

                it('returns the title', function () {
                    expect(handler.getTitle()).toEqual('ui_manage_passwords_sync_submit');
                });

                describe('isSaveDisabled', function () {
                    it('disable save button when new password is missing', function () {
                        expect(handler.isSaveDisabled()).toBeTruthy();
                    });

                    it('disable save button when confirm password is missing', function () {
                        handler.newPassword = '123';
                        expect(handler.isSaveDisabled()).toBeTruthy();
                    });

                    it('disable save button when new password does not match with confirm password', function () {
                        handler.confirmPassword = 'abc';
                        expect(handler.isSaveDisabled()).toBeTruthy();
                    });

                    it('enable save button when new passowrd and confirm password matches', function () {
                        handler.confirmPassword = '123';
                        handler.newPassword = '123';
                        expect(handler.isSaveDisabled()).toBeFalsy();
                    });
                });

                it('calls synchronize password when click on save button', function () {
                    spyOn(managePasswordService, 'synchronizePassword').and.returnValue($q.when());
                    handler.submit();
                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                    expect(managePasswordService.synchronizePassword).toHaveBeenCalled();
                });

                it('should dedup password constraint error messages', function () {
                    var errorMessage = 'error message',
                        catchSpy = jasmine.createSpy();
                    spyOn(managePasswordService, 'synchronizePassword').and.returnValue($q.reject({
                        isConstraintsViolation: function () {
                            return true;
                        },
                        messages: [errorMessage, errorMessage]
                    }));
                    handler.submit()['catch'](catchSpy);
                    // Run a digest cycle to resolve the promise.
                    $rootScope.$apply();
                    expect(handler.getPasswordPolicyErrors().length).toBe(1);
                    expect(handler.getPasswordPolicyErrors()[0]).toBe(errorMessage);
                    expect(catchSpy).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L05ld1Bhc3N3b3JkU3RlcEhhbmRsZXJUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLHVCQUF1QixVQUFVLFNBQVM7Ozs7OztJQU03Rzs7SUFFQSxJQUFJLGdCQUFnQjtJQUNwQixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3QjtXQUMxQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZO1lBTjdCLFNBQVMsMEJBQTBCLFlBQVc7O2dCQUUxQyxJQUFJLHlCQUFzQjtvQkFBRSxjQUFXO29CQUFFLEtBQUU7b0JBQUUsVUFBTztvQkFBRSx3QkFBcUI7b0JBQUUsd0JBQXFCO29CQUM5RixXQUFXO29CQUFJLGlCQUFpQjtvQkFBSSxrQkFBa0I7b0JBQUksYUFBYTtvQkFBTyxhQUFVO29CQUN4RixTQUFTO29CQUFTLDRCQUF5Qjs7Z0JBRS9DLFdBQVcsT0FBTyxZQUFZOzs7Ozs7Z0JBTTlCLFdBQVcsT0FBTyxVQUFTLDBCQUEwQixlQUFlLE1BQU0sY0FBYyx5QkFDaEYsNkJBQTZCLHlCQUF5QixjQUFjO29CQUN4RSx5QkFBeUI7b0JBQ3pCLGNBQWM7b0JBQ2QsS0FBSztvQkFDTCx3QkFBd0I7b0JBQ3hCLDRCQUE0QjtvQkFDNUIsd0JBQXdCO29CQUN4QixnQkFBZ0IsVUFBVTtvQkFDMUIsYUFBYTs7b0JBRWIsTUFBTSx1QkFBdUI7OztvQkFHN0IsVUFBVSxJQUFJLHVCQUF1QixnQkFBZ0IsaUJBQWlCLFlBQVksVUFDMUUsdUJBQXVCLDJCQUEyQix1QkFBdUI7OztnQkFHckYsU0FBUyxlQUFlLFlBQVc7b0JBQy9CLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLE9BQU8sUUFBUSxZQUFZLFFBQVE7d0JBQ25DLE9BQU8sUUFBUSxnQkFBZ0IsUUFBUTt3QkFDdkMsT0FBTyxRQUFRLGdCQUFnQixTQUFTLFFBQVEsZ0JBQWdCO3dCQUNoRSxPQUFPLFFBQVEsVUFBVSxRQUFRO3dCQUNqQyxPQUFPLFFBQVEsYUFBYSxRQUFRO3dCQUNwQyxPQUFPLFFBQVEsaUJBQWlCLFFBQVE7d0JBQ3hDLE9BQU8sUUFBUSxjQUFjOzs7O2dCQUlyQyxTQUFTLGdCQUFnQixZQUFXO29CQUNoQyxHQUFHLGlFQUFpRSxZQUFXO3dCQUMzRSxPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7OztvQkFHM0MsR0FBRyw0REFBNEQsWUFBVzt3QkFDdEUsUUFBUSxlQUFlO3dCQUN2QixPQUFPLFFBQVEsZ0JBQWdCLFFBQVE7Ozs7Z0JBSS9DLEdBQUcscUNBQXFDLFlBQVc7b0JBQy9DLE9BQU8sUUFBUSxtQkFBbUIsT0FBTyxRQUFROzs7Z0JBR3JELEdBQUcsdUJBQXVCLFlBQVc7b0JBQ2pDLE9BQU8sUUFBUSxhQUFhLFFBQVE7OztnQkFHeEMsR0FBRyxxQkFBcUIsWUFBVztvQkFDL0IsT0FBTyxRQUFRLFlBQVksUUFBUTs7O2dCQUd2QyxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxPQUFPLFFBQVEsa0JBQWtCOzs7b0JBR3JDLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLFFBQVEsY0FBYzt3QkFDdEIsT0FBTyxRQUFRLGtCQUFrQjs7O29CQUdyQyxHQUFHLDhFQUE4RSxZQUFXO3dCQUN4RixRQUFRLGtCQUFrQjt3QkFDMUIsT0FBTyxRQUFRLGtCQUFrQjs7O29CQUdyQyxHQUFHLHFFQUFxRSxZQUFXO3dCQUMvRSxRQUFRLGtCQUFrQjt3QkFDMUIsUUFBUSxjQUFjO3dCQUN0QixPQUFPLFFBQVEsa0JBQWtCOzs7O2dCQUl6QyxHQUFHLHdEQUF3RCxZQUFXO29CQUNsRSxNQUFNLHVCQUF1Qix1QkFBdUIsSUFBSSxZQUFZLEdBQUc7b0JBQ3ZFLFFBQVE7O29CQUVSLFdBQVc7b0JBQ1gsT0FBTyxzQkFBc0IscUJBQXFCOzs7Z0JBR3RELEdBQUcsbURBQW1ELFlBQVc7b0JBQzdELElBQUksZUFBZTt3QkFDZixXQUFXLFFBQVE7b0JBQ3ZCLE1BQU0sdUJBQXVCLHVCQUF1QixJQUFJLFlBQVksR0FBRyxPQUFPO3dCQUMxRSx3QkFBd0IsWUFBQTs0QkFnQlIsT0FoQmM7O3dCQUM5QixVQUFVLENBQUMsY0FBYzs7b0JBRTdCLFFBQVEsU0FBUSxTQUFPOztvQkFFdkIsV0FBVztvQkFDWCxPQUFPLFFBQVEsMEJBQTBCLFFBQVEsS0FBSztvQkFDdEQsT0FBTyxRQUFRLDBCQUEwQixJQUFJLEtBQUs7b0JBQ2xELE9BQU8sVUFBVTs7Ozs7R0FzQnRCIiwiZmlsZSI6ImlkZW50aXR5L05ld1Bhc3N3b3JkU3RlcEhhbmRsZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgTmV3UGFzc3dvcmRTdGVwSGFuZGxlci5cbiAqL1xuZGVzY3JpYmUoJ05ld1Bhc3N3b3JkU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBOZXdQYXNzd29yZFN0ZXBIYW5kbGVyLCB0ZXN0U2VydmljZSwgJHEsIGhhbmRsZXIsIG1hbmFnZVBhc3N3b3JkU2VydmljZSwgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlLFxuICAgICAgICBwb2xpY2llcyA9IFtdLCBzZWxlY3Rpb25Nb2RlbCA9IHt9LCBsaW5rUGFzc3dvcmRNYXAgPSBbXSwgaWRlbnRpdHlJZCA9ICdpZDEnLCAkcm9vdFNjb3BlLFxuICAgICAgICBsaW5rSWQgPSAnbGluazEnLCBtYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIC8qKlxuICAgICAqIEluamVjdCB0aGUgZGVwZW5kZW5jaWVzIGFuZCBzZXR1cCBtb2Nrcy5cbiAgICAgKi9cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX05ld1Bhc3N3b3JkU3RlcEhhbmRsZXJfLCBfdGVzdFNlcnZpY2VfLCBfJHFfLCBsaW5rVGVzdERhdGEsIF9tYW5hZ2VQYXNzd29yZFNlcnZpY2VfLFxuICAgICAgICAgICAgX21hbmFnZVBhc3N3b3JkRGF0YVNlcnZpY2VfLCBfcHJvbWlzZVRyYWNrZXJTZXJ2aWNlXywgXyRyb290U2NvcGVfKSB7XG4gICAgICAgIE5ld1Bhc3N3b3JkU3RlcEhhbmRsZXIgPSBfTmV3UGFzc3dvcmRTdGVwSGFuZGxlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICBtYW5hZ2VQYXNzd29yZFNlcnZpY2UgPSBfbWFuYWdlUGFzc3dvcmRTZXJ2aWNlXztcbiAgICAgICAgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSA9IF9tYW5hZ2VQYXNzd29yZERhdGFTZXJ2aWNlXztcbiAgICAgICAgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlID0gX3Byb21pc2VUcmFja2VyU2VydmljZV87XG4gICAgICAgIGxpbmtQYXNzd29yZE1hcFtsaW5rSWRdID0gJ3NvbWVwYXNzd29yZCc7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cbiAgICAgICAgc3B5T24ocHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAndHJhY2snKTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIFN0ZXBIYW5kbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgaGFuZGxlciA9IG5ldyBOZXdQYXNzd29yZFN0ZXBIYW5kbGVyKHNlbGVjdGlvbk1vZGVsLCBsaW5rUGFzc3dvcmRNYXAsIGlkZW50aXR5SWQsIHBvbGljaWVzLFxuICAgICAgICAgICAgICAgIG1hbmFnZVBhc3N3b3JkU2VydmljZSwgbWFuYWdlUGFzc3dvcmREYXRhU2VydmljZSwgcHJvbWlzZVRyYWNrZXJTZXJ2aWNlLCAkcSk7XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpbml0aWFsaXplcyB2YWx1ZXMgY29ycmVjdGx5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pZGVudGl0eUlkKS50b0VxdWFsKGlkZW50aXR5SWQpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuc2VsZWN0aW9uTW9kZWwpLnRvRXF1YWwoc2VsZWN0aW9uTW9kZWwpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIubGlua1Bhc3N3b3JkTWFwW2xpbmtJZF0pLnRvRXF1YWwobGlua1Bhc3N3b3JkTWFwW2xpbmtJZF0pO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIucG9saWNpZXMpLnRvRXF1YWwocG9saWNpZXMpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIubmV3UGFzc3dvcmQpLnRvRXF1YWwoJycpO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuY29uZmlybVBhc3N3b3JkKS50b0VxdWFsKCcnKTtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLnNob3dQYXNzd29yZCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldElucHV0VHlwZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmV0dXJuIGlucHV0IHR5cGUgcGFzc3dvcmQgd2hlbiBzaG93IHBhc3N3b3JkIGlzIHNldCB0byBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0SW5wdXRUeXBlKCkpLnRvRXF1YWwoJ3Bhc3N3b3JkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm4gaW5wdXQgdHlwZSB0ZXh0IHdoZW4gc2hvdyBwYXNzd29yZCBpcyBzZXQgdG8gdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaGFuZGxlci5zaG93UGFzc3dvcmQgPSB0cnVlO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0SW5wdXRUeXBlKCkpLnRvRXF1YWwoJ3RleHQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZ2V0IHNhdmUgYnV0dG9uIGxhYmVsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyLmdldFNhdmVCdXR0b25MYWJlbCh0cnVlKSkudG9FcXVhbCgndWlfc3VibWl0Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgc3RlcCBpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRTdGVwSWQoKSkudG9FcXVhbCgnbmV3UGFzc3dvcmRJbnB1dCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHRpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyLmdldFRpdGxlKCkpLnRvRXF1YWwoJ3VpX21hbmFnZV9wYXNzd29yZHNfc3luY19zdWJtaXQnKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpc1NhdmVEaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZGlzYWJsZSBzYXZlIGJ1dHRvbiB3aGVuIG5ldyBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNhYmxlIHNhdmUgYnV0dG9uIHdoZW4gY29uZmlybSBwYXNzd29yZCBpcyBtaXNzaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5kbGVyLm5ld1Bhc3N3b3JkID0gJzEyMyc7XG4gICAgICAgICAgICBleHBlY3QoaGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNhYmxlIHNhdmUgYnV0dG9uIHdoZW4gbmV3IHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoIHdpdGggY29uZmlybSBwYXNzd29yZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaGFuZGxlci5jb25maXJtUGFzc3dvcmQgPSAnYWJjJztcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2VuYWJsZSBzYXZlIGJ1dHRvbiB3aGVuIG5ldyBwYXNzb3dyZCBhbmQgY29uZmlybSBwYXNzd29yZCBtYXRjaGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmNvbmZpcm1QYXNzd29yZCA9ICcxMjMnO1xuICAgICAgICAgICAgaGFuZGxlci5uZXdQYXNzd29yZCA9ICcxMjMnO1xuICAgICAgICAgICAgZXhwZWN0KGhhbmRsZXIuaXNTYXZlRGlzYWJsZWQoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHN5bmNocm9uaXplIHBhc3N3b3JkIHdoZW4gY2xpY2sgb24gc2F2ZSBidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnc3luY2hyb25pemVQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuICAgICAgICBoYW5kbGVyLnN1Ym1pdCgpO1xuICAgICAgICAvLyBSdW4gYSBkaWdlc3QgY3ljbGUgdG8gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KG1hbmFnZVBhc3N3b3JkU2VydmljZS5zeW5jaHJvbml6ZVBhc3N3b3JkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlZHVwIHBhc3N3b3JkIGNvbnN0cmFpbnQgZXJyb3IgbWVzc2FnZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZSA9ICdlcnJvciBtZXNzYWdlJyxcbiAgICAgICAgICAgIGNhdGNoU3B5ID0gamFzbWluZS5jcmVhdGVTcHkoKTtcbiAgICAgICAgc3B5T24obWFuYWdlUGFzc3dvcmRTZXJ2aWNlLCAnc3luY2hyb25pemVQYXNzd29yZCcpLmFuZC5yZXR1cm5WYWx1ZSgkcS5yZWplY3Qoe1xuICAgICAgICAgICAgaXNDb25zdHJhaW50c1Zpb2xhdGlvbjogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzOiBbZXJyb3JNZXNzYWdlLCBlcnJvck1lc3NhZ2VdXG4gICAgICAgIH0pKTtcbiAgICAgICAgaGFuZGxlci5zdWJtaXQoKS5jYXRjaChjYXRjaFNweSk7XG4gICAgICAgIC8vIFJ1biBhIGRpZ2VzdCBjeWNsZSB0byByZXNvbHZlIHRoZSBwcm9taXNlLlxuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaGFuZGxlci5nZXRQYXNzd29yZFBvbGljeUVycm9ycygpLmxlbmd0aCkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIuZ2V0UGFzc3dvcmRQb2xpY3lFcnJvcnMoKVswXSkudG9CZShlcnJvck1lc3NhZ2UpO1xuICAgICAgICBleHBlY3QoY2F0Y2hTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
