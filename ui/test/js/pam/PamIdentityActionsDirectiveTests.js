System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
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

            describe('PamIdentityActionsDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    element = undefined,
                    ContainerIdentity = undefined,
                    spModal = undefined,
                    pamUtilService = undefined;

                beforeEach(module(pamModule, testModule));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _spModal_, _ContainerIdentity_, _pamUtilService_, pamDataService, Container) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    spModal = _spModal_;
                    ContainerIdentity = _ContainerIdentity_;
                    pamUtilService = _pamUtilService_;

                    spyOn(pamDataService, 'getContainer').and.returnValue(new Container({ id: '1234', name: 'Floyd' }));
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement() {
                    var definition = '<sp-pam-identity-actions sp-model="identity"></sp-pam-identity-actions>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockIdentity(isDirect) {
                    var identity = new ContainerIdentity({
                        id: 1,
                        displayName: 'JoeBob',
                        direct: isDirect
                    });
                    return identity;
                }

                it('should have details button', function () {
                    $scope.identity = createMockIdentity(true);
                    element = createElement();
                    var buttons = element.find('sp-details-button');
                    expect(buttons.length).toEqual(1);
                });

                it('should launch detail dialog when clicked detail button', function () {
                    $scope.identity = createMockIdentity(true);
                    element = createElement();
                    var detailButton = element.find('button')[0];
                    spyOn(spModal, 'open').and.callFake(angular.noop);
                    detailButton.click();
                    $scope.$apply();
                    expect(spModal.open).toHaveBeenCalled();
                });

                describe('remove()', function () {
                    it('should have remove button when direct is true', function () {
                        $scope.identity = createMockIdentity(true);
                        element = createElement();
                        var buttons = element.find('button');
                        expect(buttons.length).toEqual(2);
                    });

                    it('should not have remove button when direct is false', function () {
                        $scope.identity = createMockIdentity(false);
                        element = createElement();
                        var buttons = element.find('button');
                        expect(buttons.length).toEqual(1);
                    });

                    it('should not have remove button provisioning is disabled', function () {
                        spyOn(pamUtilService, 'isProvisioningEnabled').and.returnValue(false);
                        $scope.identity = createMockIdentity(true);
                        element = createElement();
                        var buttons = element.find('button');
                        expect(buttons.length).toEqual(1);
                    });

                    it('should launch confirm dialog when clicked remove button', function () {
                        $scope.identity = createMockIdentity(true);
                        element = createElement();
                        var removeButton = element.find('button')[1];
                        spyOn(spModal, 'open').and.callFake(angular.noop);
                        removeButton.click();
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1JZGVudGl0eUFjdGlvbnNEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7SUFJbkc7O0lBRUEsSUFBSSxXQUFXO0lBQ2YsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7V0FDM0IsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUywrQkFBK0IsWUFBVztnQkFDL0MsSUFBSSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFBRSxvQkFBaUI7b0JBQUUsVUFBTztvQkFBRSxpQkFBYzs7Z0JBRXpFLFdBQVcsT0FBTyxXQUFXOzs7Z0JBRzdCLFdBQVcsT0FBTyxVQUFDLGNBQWMsWUFBWSxXQUFXLHFCQUFxQixrQkFDMUQsZ0JBQWdCLFdBQWM7b0JBQzdDLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxVQUFVO29CQUNWLG9CQUFvQjtvQkFDcEIsaUJBQWlCOztvQkFFakIsTUFBTSxnQkFBZ0IsZ0JBQWdCLElBQUksWUFBWSxJQUFJLFVBQVUsRUFBRSxJQUFJLFFBQVEsTUFBTTs7O2dCQUc1RixVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsZ0JBQWdCO29CQUNyQixJQUFJLGFBQWE7d0JBQ2IsVUFBVSxTQUFTLFlBQVk7b0JBQ25DLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CLFVBQVU7b0JBQ2xDLElBQUksV0FBVyxJQUFJLGtCQUFrQjt3QkFDakMsSUFBSTt3QkFDSixhQUFhO3dCQUNiLFFBQVE7O29CQUVaLE9BQU87OztnQkFHWCxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLFdBQVcsbUJBQW1CO29CQUNyQyxVQUFVO29CQUNWLElBQUksVUFBVSxRQUFRLEtBQUs7b0JBQzNCLE9BQU8sUUFBUSxRQUFRLFFBQVE7OztnQkFHbkMsR0FBRywwREFBMEQsWUFBVztvQkFDcEUsT0FBTyxXQUFXLG1CQUFtQjtvQkFDckMsVUFBVTtvQkFDVixJQUFJLGVBQWUsUUFBUSxLQUFLLFVBQVU7b0JBQzFDLE1BQU0sU0FBUyxRQUFRLElBQUksU0FBUyxRQUFRO29CQUM1QyxhQUFhO29CQUNiLE9BQU87b0JBQ1AsT0FBTyxRQUFRLE1BQU07OztnQkFHekIsU0FBUyxZQUFZLFlBQVc7b0JBQzVCLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELE9BQU8sV0FBVyxtQkFBbUI7d0JBQ3JDLFVBQVU7d0JBQ1YsSUFBSSxVQUFVLFFBQVEsS0FBSzt3QkFDM0IsT0FBTyxRQUFRLFFBQVEsUUFBUTs7O29CQUduQyxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxPQUFPLFdBQVcsbUJBQW1CO3dCQUNyQyxVQUFVO3dCQUNWLElBQUksVUFBVSxRQUFRLEtBQUs7d0JBQzNCLE9BQU8sUUFBUSxRQUFRLFFBQVE7OztvQkFHbkMsR0FBRywwREFBMEQsWUFBTTt3QkFDaEUsTUFBTSxnQkFBZ0IseUJBQXlCLElBQUksWUFBWTt3QkFDOUQsT0FBTyxXQUFXLG1CQUFtQjt3QkFDckMsVUFBVTt3QkFDVixJQUFJLFVBQVUsUUFBUSxLQUFLO3dCQUMzQixPQUFPLFFBQVEsUUFBUSxRQUFROzs7b0JBR25DLEdBQUcsMkRBQTJELFlBQVc7d0JBQ3JFLE9BQU8sV0FBVyxtQkFBbUI7d0JBQ3JDLFVBQVU7d0JBQ1YsSUFBSSxlQUFlLFFBQVEsS0FBSyxVQUFVO3dCQUMxQyxNQUFNLFNBQVMsUUFBUSxJQUFJLFNBQVMsUUFBUTt3QkFDNUMsYUFBYTt3QkFDYixPQUFPO3dCQUNQLE9BQU8sUUFBUSxNQUFNOzs7Ozs7R0FrQjlCIiwiZmlsZSI6InBhbS9QYW1JZGVudGl0eUFjdGlvbnNEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1JZGVudGl0eUFjdGlvbnNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgZWxlbWVudCwgQ29udGFpbmVySWRlbnRpdHksIHNwTW9kYWwsIHBhbVV0aWxTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocGFtTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOjcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfc3BNb2RhbF8sIF9Db250YWluZXJJZGVudGl0eV8sIF9wYW1VdGlsU2VydmljZV8sXG4gICAgICAgICAgICAgICAgICAgICAgIHBhbURhdGFTZXJ2aWNlLCBDb250YWluZXIpID0+IHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgIENvbnRhaW5lcklkZW50aXR5ID0gX0NvbnRhaW5lcklkZW50aXR5XztcbiAgICAgICAgcGFtVXRpbFNlcnZpY2UgPSBfcGFtVXRpbFNlcnZpY2VfO1xuXG4gICAgICAgIHNweU9uKHBhbURhdGFTZXJ2aWNlLCAnZ2V0Q29udGFpbmVyJykuYW5kLnJldHVyblZhbHVlKG5ldyBDb250YWluZXIoeyBpZDogJzEyMzQnLCBuYW1lOiAnRmxveWQnIH0pKTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLXBhbS1pZGVudGl0eS1hY3Rpb25zIHNwLW1vZGVsPVwiaWRlbnRpdHlcIj48L3NwLXBhbS1pZGVudGl0eS1hY3Rpb25zPicsXG4gICAgICAgICAgICBlbGVtZW50ID0gJGNvbXBpbGUoZGVmaW5pdGlvbikoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVNb2NrSWRlbnRpdHkoaXNEaXJlY3QpIHtcbiAgICAgICAgbGV0IGlkZW50aXR5ID0gbmV3IENvbnRhaW5lcklkZW50aXR5KHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdKb2VCb2InLFxuICAgICAgICAgICAgZGlyZWN0OiBpc0RpcmVjdFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cblxuICAgIGl0KCdzaG91bGQgaGF2ZSBkZXRhaWxzIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaWRlbnRpdHkgPSBjcmVhdGVNb2NrSWRlbnRpdHkodHJ1ZSk7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGxldCBidXR0b25zID0gZWxlbWVudC5maW5kKCdzcC1kZXRhaWxzLWJ1dHRvbicpO1xuICAgICAgICBleHBlY3QoYnV0dG9ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBkZXRhaWwgZGlhbG9nIHdoZW4gY2xpY2tlZCBkZXRhaWwgYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pZGVudGl0eSA9IGNyZWF0ZU1vY2tJZGVudGl0eSh0cnVlKTtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgbGV0IGRldGFpbEJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJylbMF07XG4gICAgICAgIHNweU9uKHNwTW9kYWwsICdvcGVuJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgIGRldGFpbEJ1dHRvbi5jbGljaygpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdmUoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgcmVtb3ZlIGJ1dHRvbiB3aGVuIGRpcmVjdCBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuaWRlbnRpdHkgPSBjcmVhdGVNb2NrSWRlbnRpdHkodHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIHJlbW92ZSBidXR0b24gd2hlbiBkaXJlY3QgaXMgZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5pZGVudGl0eSA9IGNyZWF0ZU1vY2tJZGVudGl0eShmYWxzZSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIHJlbW92ZSBidXR0b24gcHJvdmlzaW9uaW5nIGlzIGRpc2FibGVkJywgKCkgPT4ge1xuICAgICAgICAgICBzcHlPbihwYW1VdGlsU2VydmljZSwgJ2lzUHJvdmlzaW9uaW5nRW5hYmxlZCcpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAkc2NvcGUuaWRlbnRpdHkgPSBjcmVhdGVNb2NrSWRlbnRpdHkodHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbnMgPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZXhwZWN0KGJ1dHRvbnMubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGxhdW5jaCBjb25maXJtIGRpYWxvZyB3aGVuIGNsaWNrZWQgcmVtb3ZlIGJ1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLmlkZW50aXR5ID0gY3JlYXRlTW9ja0lkZW50aXR5KHRydWUpO1xuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGxldCByZW1vdmVCdXR0b24gPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpWzFdO1xuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
