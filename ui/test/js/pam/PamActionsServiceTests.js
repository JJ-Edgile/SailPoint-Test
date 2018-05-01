System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * Copyright (C) 2017 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the PamActionsService.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('PamActionsService', function () {
                var pamActionsService = undefined,
                    spModal = undefined,
                    identities = undefined,
                    ContainerIdentity = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    pamContainerService = undefined,
                    $q = undefined,
                    pamDataService = undefined,
                    Container = undefined,
                    testService = undefined;

                // Use the identity module.
                beforeEach(module(pamModule, testModule));

                /* jshint maxparams: 11 */
                beforeEach(inject(function (_pamActionsService_, _spModal_, _ContainerIdentity_, _Container_, _$rootScope_, _pamContainerService_, _$q_, _pamDataService_, _testService_) {
                    pamActionsService = _pamActionsService_;
                    pamContainerService = _pamContainerService_;
                    pamDataService = _pamDataService_;
                    ContainerIdentity = _ContainerIdentity_;
                    Container = _Container_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $q = _$q_;
                    $scope = $rootScope.$new();
                    identities = [new ContainerIdentity({
                        id: '1',
                        displayName: 'ted'
                    }), new ContainerIdentity({
                        id: '2',
                        displayName: 'sally'
                    })];

                    spyOn(pamDataService, 'getContainer').and.returnValue(new Container({
                        id: 'abcd'
                    }));
                }));

                describe('promptIdentityDeprovision', function () {
                    it('should launch confirm dialog', function () {
                        spyOn(spModal, 'open').and.callFake(angular.noop);
                        pamActionsService.promptIdentityDeprovision(identities);
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });

                    it('should call pamContainerService.removeIdentities()', function () {

                        spyOn(spModal, 'confirm').and.returnValue($q.when());

                        spyOn(pamContainerService, 'removeIdentities').and.callFake(function () {
                            return testService.createPromise(false, {
                                data: []
                            }, {});
                        });

                        pamActionsService.promptIdentityDeprovision(identities);
                        $scope.$apply();
                        expect(pamContainerService.removeIdentities).toHaveBeenCalled();
                    });
                });

                describe('provisionIdentities', function () {
                    it('should call pamContainerService.addIdentities()', function () {

                        spyOn(pamContainerService, 'addIdentities').and.callFake(function () {
                            return testService.createPromise(false, {
                                data: []
                            }, {});
                        });

                        pamActionsService.provisionIdentities({}, []);
                        $scope.$apply();
                        expect(pamContainerService.addIdentities).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1BY3Rpb25zU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpQkFBaUIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7Ozs7SUFRbkc7O0lBRUEsSUFBSSxXQUFXO0lBQ2YsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7V0FDM0IsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQU43QixTQUFTLHFCQUFxQixZQUFXO2dCQUNyQyxJQUFJLG9CQUFpQjtvQkFBRSxVQUFPO29CQUFFLGFBQVU7b0JBQUUsb0JBQWlCO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxzQkFBbUI7b0JBQUUsS0FBRTtvQkFDdEcsaUJBQWM7b0JBQUUsWUFBUztvQkFBRSxjQUFXOzs7Z0JBRzFDLFdBQVcsT0FBTyxXQUFXOzs7Z0JBRzdCLFdBQVcsT0FBTyxVQUFTLHFCQUFxQixXQUFXLHFCQUFxQixhQUFhLGNBQ2xFLHVCQUF1QixNQUFNLGtCQUFrQixlQUFlO29CQUNyRixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsS0FBSztvQkFDTCxTQUFTLFdBQVc7b0JBQ3BCLGFBQWEsQ0FBQyxJQUFJLGtCQUFrQjt3QkFDaEMsSUFBSTt3QkFDSixhQUFhO3dCQUNiLElBQUksa0JBQWtCO3dCQUN0QixJQUFJO3dCQUNKLGFBQWE7OztvQkFHakIsTUFBTSxnQkFBZ0IsZ0JBQWdCLElBQUksWUFBWSxJQUFJLFVBQVU7d0JBQ2hFLElBQUk7Ozs7Z0JBSVosU0FBUyw2QkFBNkIsWUFBVztvQkFDN0MsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsTUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTLFFBQVE7d0JBQzVDLGtCQUFrQiwwQkFBMEI7d0JBQzVDLE9BQU87d0JBQ1AsT0FBTyxRQUFRLE1BQU07OztvQkFHekIsR0FBRyxzREFBc0QsWUFBVzs7d0JBRWhFLE1BQU0sU0FBUyxXQUFXLElBQUksWUFBWSxHQUFHOzt3QkFFN0MsTUFBTSxxQkFBcUIsb0JBQW9CLElBQUksU0FBUyxZQUFXOzRCQUNuRSxPQUFPLFlBQVksY0FBYyxPQUFPO2dDQUNwQyxNQUFNOytCQUNQOzs7d0JBR1Asa0JBQWtCLDBCQUEwQjt3QkFDNUMsT0FBTzt3QkFDUCxPQUFPLG9CQUFvQixrQkFBa0I7Ozs7Z0JBSXJELFNBQVMsdUJBQXVCLFlBQVc7b0JBQ3ZDLEdBQUcsbURBQW1ELFlBQVc7O3dCQUU3RCxNQUFNLHFCQUFxQixpQkFBaUIsSUFBSSxTQUFTLFlBQVc7NEJBQ2hFLE9BQU8sWUFBWSxjQUFjLE9BQU87Z0NBQ3BDLE1BQU07K0JBQ1A7Ozt3QkFHUCxrQkFBa0Isb0JBQW9CLElBQUk7d0JBQzFDLE9BQU87d0JBQ1AsT0FBTyxvQkFBb0IsZUFBZTs7Ozs7O0dBcUJuRCIsImZpbGUiOiJwYW0vUGFtQWN0aW9uc1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBwYW1Nb2R1bGUgZnJvbSAncGFtL1BhbU1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgUGFtQWN0aW9uc1NlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdQYW1BY3Rpb25zU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBwYW1BY3Rpb25zU2VydmljZSwgc3BNb2RhbCwgaWRlbnRpdGllcywgQ29udGFpbmVySWRlbnRpdHksICRyb290U2NvcGUsICRzY29wZSwgcGFtQ29udGFpbmVyU2VydmljZSwgJHEsXG4gICAgICAgIHBhbURhdGFTZXJ2aWNlLCBDb250YWluZXIsIHRlc3RTZXJ2aWNlO1xuXG4gICAgLy8gVXNlIHRoZSBpZGVudGl0eSBtb2R1bGUuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9wYW1BY3Rpb25zU2VydmljZV8sIF9zcE1vZGFsXywgX0NvbnRhaW5lcklkZW50aXR5XywgX0NvbnRhaW5lcl8sIF8kcm9vdFNjb3BlXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGFtQ29udGFpbmVyU2VydmljZV8sIF8kcV8sIF9wYW1EYXRhU2VydmljZV8sIF90ZXN0U2VydmljZV8pIHtcbiAgICAgICAgcGFtQWN0aW9uc1NlcnZpY2UgPSBfcGFtQWN0aW9uc1NlcnZpY2VfO1xuICAgICAgICBwYW1Db250YWluZXJTZXJ2aWNlID0gX3BhbUNvbnRhaW5lclNlcnZpY2VfO1xuICAgICAgICBwYW1EYXRhU2VydmljZSA9IF9wYW1EYXRhU2VydmljZV87XG4gICAgICAgIENvbnRhaW5lcklkZW50aXR5ID0gX0NvbnRhaW5lcklkZW50aXR5XztcbiAgICAgICAgQ29udGFpbmVyID0gX0NvbnRhaW5lcl87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgaWRlbnRpdGllcyA9IFtuZXcgQ29udGFpbmVySWRlbnRpdHkoe1xuICAgICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAndGVkJ1xuICAgICAgICB9KSwgbmV3IENvbnRhaW5lcklkZW50aXR5KHtcbiAgICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3NhbGx5J1xuICAgICAgICB9KV07XG5cbiAgICAgICAgc3B5T24ocGFtRGF0YVNlcnZpY2UsICdnZXRDb250YWluZXInKS5hbmQucmV0dXJuVmFsdWUobmV3IENvbnRhaW5lcih7XG4gICAgICAgICAgICBpZDogJ2FiY2QnXG4gICAgICAgIH0pKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgncHJvbXB0SWRlbnRpdHlEZXByb3Zpc2lvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGxhdW5jaCBjb25maXJtIGRpYWxvZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIHBhbUFjdGlvbnNTZXJ2aWNlLnByb21wdElkZW50aXR5RGVwcm92aXNpb24oaWRlbnRpdGllcyk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBwYW1Db250YWluZXJTZXJ2aWNlLnJlbW92ZUlkZW50aXRpZXMoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnY29uZmlybScpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKCkpO1xuXG4gICAgICAgICAgICBzcHlPbihwYW1Db250YWluZXJTZXJ2aWNlLCAncmVtb3ZlSWRlbnRpdGllcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYW1BY3Rpb25zU2VydmljZS5wcm9tcHRJZGVudGl0eURlcHJvdmlzaW9uKGlkZW50aXRpZXMpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lclNlcnZpY2UucmVtb3ZlSWRlbnRpdGllcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwcm92aXNpb25JZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBwYW1Db250YWluZXJTZXJ2aWNlLmFkZElkZW50aXRpZXMoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBzcHlPbihwYW1Db250YWluZXJTZXJ2aWNlLCAnYWRkSWRlbnRpdGllcycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwYW1BY3Rpb25zU2VydmljZS5wcm92aXNpb25JZGVudGl0aWVzKHt9LCBbXSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QocGFtQ29udGFpbmVyU2VydmljZS5hZGRJZGVudGl0aWVzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
