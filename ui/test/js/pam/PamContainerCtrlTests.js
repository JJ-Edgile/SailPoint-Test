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

            describe('PamContainerCtrl', function () {

                var $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    $stateParams = undefined,
                    containerId = undefined,
                    testService = undefined;

                beforeEach(module(pamModule, testModule));

                beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$stateParams_, _testService_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $stateParams = _$stateParams_;
                    containerId = 0;
                }));

                function createController(name) {
                    $scope = $rootScope.$new();
                    return $controller('PamContainerCtrl', {
                        $state: {
                            current: {
                                name: name
                            }
                        }
                    });
                }

                describe('isIdentities()', function () {
                    it('is true when $state.current.name is container.identities', function () {
                        var ctrl = createController('container.identities');
                        expect(ctrl.isIdentities).toBeTruthy();
                    });

                    it('is false when $state.current.name is not container.identities', function () {
                        var ctrl = createController('container.blah');

                        expect(ctrl.isIdentities()).toBeFalsy();
                    });
                });

                describe('isGroups()', function () {
                    it('is true when $state.current.name is container.groups', function () {
                        var ctrl = createController('container.groups');

                        expect(ctrl.isGroups()).toBeTruthy();
                    });

                    it('is false when $state.current.name is not container.groups', function () {
                        var ctrl = createController('container.blah');

                        expect(ctrl.isGroups()).toBeFalsy();
                    });
                });

                describe('isPrivilegedItems()', function () {
                    it('is true when $state.current.name is container.privilegedItems', function () {
                        var ctrl = createController('container.privilegedItems');

                        expect(ctrl.isPrivilegedItems()).toBeTruthy();
                    });

                    it('is false when $state.current.name is not container.privilegedItems', function () {
                        var ctrl = createController('container.blah');

                        expect(ctrl.isPrivilegedItems()).toBeFalsy();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLGlCQUFpQix1QkFBdUIsVUFBVSxTQUFTOzs7O0lBSW5HOztJQUVBLElBQUksV0FBVztJQUNmLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGVBQWU7WUFDckUsWUFBWSxjQUFjO1dBQzNCLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsb0JBQW9CLFlBQVc7O2dCQUVwQyxJQUFJLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxTQUFNO29CQUFFLGVBQVk7b0JBQUUsY0FBVztvQkFBRSxjQUFXOztnQkFFM0UsV0FBVyxPQUFPLFdBQVc7O2dCQUU3QixXQUFXLE9BQU8sVUFBUyxlQUFlLE1BQU0sY0FBYyxnQkFBZ0IsZUFBZTtvQkFDekYsY0FBYztvQkFDZCxhQUFhO29CQUNiLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixjQUFjOzs7Z0JBR2xCLFNBQVMsaUJBQWlCLE1BQU07b0JBQzVCLFNBQVMsV0FBVztvQkFDcEIsT0FBTyxZQUFZLG9CQUFvQjt3QkFDbkMsUUFBUTs0QkFDSixTQUFTO2dDQUNMLE1BQU07Ozs7OztnQkFNdEIsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsR0FBRyw0REFBNEQsWUFBVzt3QkFDdEUsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLGNBQWM7OztvQkFHOUIsR0FBRyxpRUFBaUUsWUFBVzt3QkFDM0UsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE9BQU8sS0FBSyxnQkFBZ0I7Ozs7Z0JBSXBDLFNBQVMsY0FBYyxZQUFXO29CQUM5QixHQUFHLHdEQUF3RCxZQUFXO3dCQUNsRSxJQUFJLE9BQU8saUJBQWlCOzt3QkFFNUIsT0FBTyxLQUFLLFlBQVk7OztvQkFHNUIsR0FBRyw2REFBNkQsWUFBVzt3QkFDdkUsSUFBSSxPQUFPLGlCQUFpQjs7d0JBRTVCLE9BQU8sS0FBSyxZQUFZOzs7O2dCQUloQyxTQUFTLHVCQUF1QixZQUFXO29CQUN2QyxHQUFHLGlFQUFpRSxZQUFXO3dCQUMzRSxJQUFJLE9BQU8saUJBQWlCOzt3QkFFNUIsT0FBTyxLQUFLLHFCQUFxQjs7O29CQUdyQyxHQUFHLHNFQUFzRSxZQUFXO3dCQUNoRixJQUFJLE9BQU8saUJBQWlCOzt3QkFFNUIsT0FBTyxLQUFLLHFCQUFxQjs7Ozs7O0dBbUIxQyIsImZpbGUiOiJwYW0vUGFtQ29udGFpbmVyQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ1BhbUNvbnRhaW5lckN0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgJHNjb3BlLCAkc3RhdGVQYXJhbXMsIGNvbnRhaW5lcklkLCB0ZXN0U2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHBhbU1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXywgXyRxXywgXyRyb290U2NvcGVfLCBfJHN0YXRlUGFyYW1zXywgX3Rlc3RTZXJ2aWNlXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XG4gICAgICAgIGNvbnRhaW5lcklkID0gMDtcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKG5hbWUpIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHJldHVybiAkY29udHJvbGxlcignUGFtQ29udGFpbmVyQ3RybCcsIHtcbiAgICAgICAgICAgICRzdGF0ZToge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2lzSWRlbnRpdGllcygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpcyB0cnVlIHdoZW4gJHN0YXRlLmN1cnJlbnQubmFtZSBpcyBjb250YWluZXIuaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdjb250YWluZXIuaWRlbnRpdGllcycpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNJZGVudGl0aWVzKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpcyBmYWxzZSB3aGVuICRzdGF0ZS5jdXJyZW50Lm5hbWUgaXMgbm90IGNvbnRhaW5lci5pZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoJ2NvbnRhaW5lci5ibGFoJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzSWRlbnRpdGllcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNHcm91cHMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnaXMgdHJ1ZSB3aGVuICRzdGF0ZS5jdXJyZW50Lm5hbWUgaXMgY29udGFpbmVyLmdyb3VwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdjb250YWluZXIuZ3JvdXBzJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzR3JvdXBzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gJHN0YXRlLmN1cnJlbnQubmFtZSBpcyBub3QgY29udGFpbmVyLmdyb3VwcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdjb250YWluZXIuYmxhaCcpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc0dyb3VwcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaXNQcml2aWxlZ2VkSXRlbXMoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnaXMgdHJ1ZSB3aGVuICRzdGF0ZS5jdXJyZW50Lm5hbWUgaXMgY29udGFpbmVyLnByaXZpbGVnZWRJdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdjb250YWluZXIucHJpdmlsZWdlZEl0ZW1zJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzUHJpdmlsZWdlZEl0ZW1zKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzIGZhbHNlIHdoZW4gJHN0YXRlLmN1cnJlbnQubmFtZSBpcyBub3QgY29udGFpbmVyLnByaXZpbGVnZWRJdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCdjb250YWluZXIuYmxhaCcpO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1ByaXZpbGVnZWRJdGVtcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
