System.register(['test/js/TestInitializer', 'reset/ResetAppModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * Project: identityiq
     * Author: michael.hide
     * Created: 2/27/14 4:03 PM
     */
    'use strict';

    var resetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_resetResetAppModule) {
            resetModule = _resetResetAppModule['default'];
        }],
        execute: function () {
            describe('PasswordConfirmDirective', function () {
                var element, scope;

                beforeEach(module(resetModule));

                beforeEach(inject(function ($compile, $rootScope) {
                    scope = $rootScope.$new();
                    scope.passwordModel = {
                        password: undefined,
                        confirm: undefined
                    };
                    element = angular.element('<sp-password-confirm ng-model="passwordModel"/>');
                    element = $compile(element)(scope);
                }));

                it('should have three children.', function () {
                    scope.$digest();
                    expect(element.children().length).toBe(3);
                });

                it('should not show an error message when the fields are the same.', function () {
                    scope.passwordModel.password = 'abc123';
                    scope.passwordModel.confirm = 'abc123';
                    scope.$digest();

                    expect(element.find('#passConfErrDiv').hasClass('ng-show')).toBe(false);
                });

                it('should show an error message when the fields do not match.', function () {
                    scope.passwordModel.password = 'abc123';
                    scope.passwordModel.confirm = '123abc';
                    scope.$digest();

                    expect(element.find('#passConfErrDiv').hasClass('ng-hide')).toBe(false);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0L1Bhc3N3b3JkQ29uZmlybURpcmVjdGl2ZVRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHlCQUF5QixVQUFVLFNBQVM7Ozs7Ozs7O0lBQ3hGOztJQVNJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxzQkFBc0I7WUFDNUUsY0FBYyxxQkFBcUI7O1FBRXZDLFNBQVMsWUFBWTtZQUo3QixTQUFTLDRCQUE0QixZQUFXO2dCQUM1QyxJQUFJLFNBQ0E7O2dCQUVKLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVUsWUFBWTtvQkFDN0MsUUFBUSxXQUFXO29CQUNuQixNQUFNLGdCQUFnQjt3QkFDbEIsVUFBVTt3QkFDVixTQUFTOztvQkFFYixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsVUFBVSxTQUFTLFNBQVM7OztnQkFHaEMsR0FBRywrQkFBK0IsWUFBVztvQkFDekMsTUFBTTtvQkFDTixPQUFPLFFBQVEsV0FBVyxRQUFRLEtBQUs7OztnQkFHM0MsR0FBRyxrRUFBa0UsWUFBVztvQkFDNUUsTUFBTSxjQUFjLFdBQVc7b0JBQy9CLE1BQU0sY0FBYyxVQUFVO29CQUM5QixNQUFNOztvQkFFTixPQUFPLFFBQVEsS0FBSyxtQkFBbUIsU0FBUyxZQUFZLEtBQUs7OztnQkFHckUsR0FBRyw4REFBOEQsWUFBVztvQkFDeEUsTUFBTSxjQUFjLFdBQVc7b0JBQy9CLE1BQU0sY0FBYyxVQUFVO29CQUM5QixNQUFNOztvQkFFTixPQUFPLFFBQVEsS0FBSyxtQkFBbUIsU0FBUyxZQUFZLEtBQUs7Ozs7O0dBU3RFIiwiZmlsZSI6InJlc2V0L1Bhc3N3b3JkQ29uZmlybURpcmVjdGl2ZVRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTQgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCByZXNldE1vZHVsZSBmcm9tICdyZXNldC9SZXNldEFwcE1vZHVsZSc7XHJcblxyXG4vKipcclxuICogUHJvamVjdDogaWRlbnRpdHlpcVxyXG4gKiBBdXRob3I6IG1pY2hhZWwuaGlkZVxyXG4gKiBDcmVhdGVkOiAyLzI3LzE0IDQ6MDMgUE1cclxuICovXHJcbmRlc2NyaWJlKCdQYXNzd29yZENvbmZpcm1EaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBlbGVtZW50LFxyXG4gICAgICAgIHNjb3BlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJlc2V0TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbXBpbGUsICRyb290U2NvcGUpIHtcclxuICAgICAgICBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnBhc3N3b3JkTW9kZWwgPSB7XHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGNvbmZpcm06IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwLXBhc3N3b3JkLWNvbmZpcm0gbmctbW9kZWw9XCJwYXNzd29yZE1vZGVsXCIvPicpO1xyXG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShlbGVtZW50KShzY29wZSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIHRocmVlIGNoaWxkcmVuLicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9CZSgzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgbm90IHNob3cgYW4gZXJyb3IgbWVzc2FnZSB3aGVuIHRoZSBmaWVsZHMgYXJlIHRoZSBzYW1lLicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjb3BlLnBhc3N3b3JkTW9kZWwucGFzc3dvcmQgPSAnYWJjMTIzJztcclxuICAgICAgICBzY29wZS5wYXNzd29yZE1vZGVsLmNvbmZpcm0gPSAnYWJjMTIzJztcclxuICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcblxyXG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNwYXNzQ29uZkVyckRpdicpLmhhc0NsYXNzKCduZy1zaG93JykpLnRvQmUoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBzaG93IGFuIGVycm9yIG1lc3NhZ2Ugd2hlbiB0aGUgZmllbGRzIGRvIG5vdCBtYXRjaC4nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzY29wZS5wYXNzd29yZE1vZGVsLnBhc3N3b3JkID0gJ2FiYzEyMyc7XHJcbiAgICAgICAgc2NvcGUucGFzc3dvcmRNb2RlbC5jb25maXJtID0gJzEyM2FiYyc7XHJcbiAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjcGFzc0NvbmZFcnJEaXYnKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0JlKGZhbHNlKTtcclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
