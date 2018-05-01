System.register(['test/js/TestInitializer', 'common/requestItem/RequestItemModule', 'test/js/TestModule'], function (_export) {

    /**
     * Tests for the AddAccessItemDetailDialogCtrl.
     */
    'use strict';

    var requestItemModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonRequestItemRequestItemModule) {
            requestItemModule = _commonRequestItemRequestItemModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('AddAccessItemDetailDialogCtrl', function () {

                var $rootScope, $controller, testService, role, entitlement, ctrl, accessRequestDetailServiceMock;

                // Load the test module to get the testService.
                beforeEach(module(testModule));
                beforeEach(module(requestItemModule));

                /**
                 * Inject the dependencies and setup mocks.
                 */
                beforeEach(inject(function (_testService_, _$controller_, _$rootScope_) {

                    // Save the services.
                    $controller = _$controller_;
                    testService = _testService_;
                    $rootScope = _$rootScope_;
                    function RequestItem(id, isRole) {
                        this.isRole = function () {
                            return isRole;
                        };

                        this.getId = function () {
                            return id;
                        };
                    }
                    // Create items to test with.
                    role = new RequestItem('1234', true);
                    entitlement = new RequestItem('5678', false);

                    accessRequestDetailServiceMock = {
                        getRoleEntitlements: testService.createPromiseSpy(false, {
                            status: 200,
                            data: {
                                count: 1,
                                objects: [{}]
                            }
                        }, {})
                    };
                }));

                describe('correctly handle roles/entitlements', function () {
                    it('isRole() should be true when item is role', function () {
                        // Create the controller to test with.
                        ctrl = $controller('AddAccessItemDetailDialogCtrl', {
                            item: role
                        });

                        expect(ctrl.isRole()).toBeTruthy();
                    });

                    it('isRole() should be false when item is entitlement', function () {
                        // Create the controller to test with.
                        ctrl = $controller('AddAccessItemDetailDialogCtrl', {
                            item: entitlement
                        });

                        expect(ctrl.isRole()).toBeFalsy();
                    });
                });

                describe('loadRoleEntitlements()', function () {
                    it('should load role entitlement details', function () {
                        // Create the controller to test with.
                        ctrl = $controller('AddAccessItemDetailDialogCtrl', {
                            item: role,
                            accessRequestDetailService: accessRequestDetailServiceMock
                        });

                        expect(ctrl.roleEntitlements).toBeFalsy();
                        ctrl.loadRoleEntitlements();
                        expect(accessRequestDetailServiceMock.getRoleEntitlements).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZXF1ZXN0aXRlbS9BZGRBY2Nlc3NJdGVtRGV0YWlsRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix3Q0FBd0MsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7SUFBOUg7O0lBT0ksSUFBSSxtQkFBbUI7SUFDdkIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscUNBQXFDO1lBQzNGLG9CQUFvQixvQ0FBb0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQUw3QixTQUFTLGlDQUFpQyxZQUFXOztnQkFFakQsSUFBSSxZQUFZLGFBQWEsYUFDekIsTUFBTSxhQUFhLE1BQU07OztnQkFHN0IsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxlQUFlLGVBQWUsY0FBYzs7O29CQUduRSxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixTQUFTLFlBQVksSUFBSSxRQUFRO3dCQUM3QixLQUFLLFNBQVMsWUFBVzs0QkFDckIsT0FBTzs7O3dCQUdYLEtBQUssUUFBUSxZQUFXOzRCQUNwQixPQUFPOzs7O29CQUlmLE9BQU8sSUFBSSxZQUFZLFFBQVE7b0JBQy9CLGNBQWMsSUFBSSxZQUFZLFFBQVE7O29CQUV0QyxpQ0FBaUM7d0JBQzdCLHFCQUFxQixZQUFZLGlCQUFpQixPQUFPOzRCQUNyRCxRQUFROzRCQUNSLE1BQU07Z0NBQ0YsT0FBTztnQ0FDUCxTQUFTLENBQUU7OzJCQUVoQjs7OztnQkFLWCxTQUFTLHVDQUF1QyxZQUFXO29CQUN2RCxHQUFHLDZDQUE2QyxZQUFXOzt3QkFFdkQsT0FBTyxZQUFZLGlDQUFpQzs0QkFDaEQsTUFBTTs7O3dCQUdWLE9BQU8sS0FBSyxVQUFVOzs7b0JBRzFCLEdBQUcscURBQXFELFlBQVc7O3dCQUUvRCxPQUFPLFlBQVksaUNBQWlDOzRCQUNoRCxNQUFNOzs7d0JBR1YsT0FBTyxLQUFLLFVBQVU7Ozs7Z0JBSTlCLFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLEdBQUcsd0NBQXdDLFlBQVc7O3dCQUVsRCxPQUFPLFlBQVksaUNBQWlDOzRCQUNoRCxNQUFNOzRCQUNOLDRCQUE0Qjs7O3dCQUdoQyxPQUFPLEtBQUssa0JBQWtCO3dCQUM5QixLQUFLO3dCQUNMLE9BQU8sK0JBQStCLHFCQUFxQjs7Ozs7O0dBVXBFIiwiZmlsZSI6ImNvbW1vbi9yZXF1ZXN0aXRlbS9BZGRBY2Nlc3NJdGVtRGV0YWlsRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCByZXF1ZXN0SXRlbU1vZHVsZSBmcm9tICdjb21tb24vcmVxdWVzdEl0ZW0vUmVxdWVzdEl0ZW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFkZEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsLlxuICovXG5kZXNjcmliZSgnQWRkQWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsXG4gICAgICAgIHJvbGUsIGVudGl0bGVtZW50LCBjdHJsLCBhY2Nlc3NSZXF1ZXN0RGV0YWlsU2VydmljZU1vY2s7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZXF1ZXN0SXRlbU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcbiAgICAgICAgZnVuY3Rpb24gUmVxdWVzdEl0ZW0oaWQsIGlzUm9sZSkge1xuICAgICAgICAgICAgdGhpcy5pc1JvbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNSb2xlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nZXRJZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIGl0ZW1zIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgcm9sZSA9IG5ldyBSZXF1ZXN0SXRlbSgnMTIzNCcsIHRydWUpO1xuICAgICAgICBlbnRpdGxlbWVudCA9IG5ldyBSZXF1ZXN0SXRlbSgnNTY3OCcsIGZhbHNlKTtcblxuICAgICAgICBhY2Nlc3NSZXF1ZXN0RGV0YWlsU2VydmljZU1vY2sgPSB7XG4gICAgICAgICAgICBnZXRSb2xlRW50aXRsZW1lbnRzOiB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogWyB7fSBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge30pXG4gICAgICAgIH07XG5cbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnY29ycmVjdGx5IGhhbmRsZSByb2xlcy9lbnRpdGxlbWVudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2lzUm9sZSgpIHNob3VsZCBiZSB0cnVlIHdoZW4gaXRlbSBpcyByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxuICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdBZGRBY2Nlc3NJdGVtRGV0YWlsRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgICAgICBpdGVtOiByb2xlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSb2xlKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2lzUm9sZSgpIHNob3VsZCBiZSBmYWxzZSB3aGVuIGl0ZW0gaXMgZW50aXRsZW1lbnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0FkZEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGl0ZW06IGVudGl0bGVtZW50XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNSb2xlKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkUm9sZUVudGl0bGVtZW50cygpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgbG9hZCByb2xlIGVudGl0bGVtZW50IGRldGFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udHJvbGxlciB0byB0ZXN0IHdpdGguXG4gICAgICAgICAgICBjdHJsID0gJGNvbnRyb2xsZXIoJ0FkZEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGl0ZW06IHJvbGUsXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERldGFpbFNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlTW9ja1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnJvbGVFbnRpdGxlbWVudHMpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgY3RybC5sb2FkUm9sZUVudGl0bGVtZW50cygpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlTW9jay5nZXRSb2xlRW50aXRsZW1lbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
