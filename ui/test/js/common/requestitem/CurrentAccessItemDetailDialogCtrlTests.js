System.register(['test/js/TestInitializer', 'common/requestItem/RequestItemModule', 'test/js/TestModule'], function (_export) {

    /**
     * Tests for the CurrentAccessItemDetailDialogCtrl.
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
            describe('CurrentAccessItemDetailDialogCtrl', function () {

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
                        ctrl = $controller('CurrentAccessItemDetailDialogCtrl', {
                            item: role
                        });

                        expect(ctrl.isRole()).toBeTruthy();
                    });

                    it('isRole() should be false when item is role', function () {
                        // Create the controller to test with.
                        ctrl = $controller('CurrentAccessItemDetailDialogCtrl', {
                            item: entitlement
                        });

                        expect(ctrl.isRole()).toBeFalsy();
                    });
                });

                describe('loadRoleEntitlements()', function () {
                    it('should load role entitlement details', function () {
                        // Create the controller to test with.
                        ctrl = $controller('CurrentAccessItemDetailDialogCtrl', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9yZXF1ZXN0aXRlbS9DdXJyZW50QWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsd0NBQXdDLHVCQUF1QixVQUFVLFNBQVM7Ozs7O0lBQTlIOztJQU9JLElBQUksbUJBQW1CO0lBQ3ZCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHFDQUFxQztZQUMzRixvQkFBb0Isb0NBQW9DO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7WUFMN0IsU0FBUyxxQ0FBcUMsWUFBVzs7Z0JBRXJELElBQUksWUFBWSxhQUFhLGFBQ3pCLE1BQU0sYUFBYSxNQUFNOzs7Z0JBRzdCLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPOzs7OztnQkFLbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxlQUFlLGNBQWM7OztvQkFHbkUsY0FBYztvQkFDZCxjQUFjO29CQUNkLGFBQWE7O29CQUViLFNBQVMsWUFBWSxJQUFJLFFBQVE7d0JBQzdCLEtBQUssU0FBUyxZQUFXOzRCQUNyQixPQUFPOzs7d0JBR1gsS0FBSyxRQUFRLFlBQVc7NEJBQ3BCLE9BQU87Ozs7O29CQUtmLE9BQU8sSUFBSSxZQUFZLFFBQVE7b0JBQy9CLGNBQWMsSUFBSSxZQUFZLFFBQVE7O29CQUV0QyxpQ0FBaUM7d0JBQzdCLHFCQUFxQixZQUFZLGlCQUFpQixPQUFPOzRCQUNyRCxRQUFROzRCQUNSLE1BQU07Z0NBQ0YsT0FBTztnQ0FDUCxTQUFTLENBQUU7OzJCQUVoQjs7OztnQkFLWCxTQUFTLHVDQUF1QyxZQUFXO29CQUN2RCxHQUFHLDZDQUE2QyxZQUFXOzt3QkFFdkQsT0FBTyxZQUFZLHFDQUFxQzs0QkFDcEQsTUFBTTs7O3dCQUdWLE9BQU8sS0FBSyxVQUFVOzs7b0JBRzFCLEdBQUcsOENBQThDLFlBQVc7O3dCQUV4RCxPQUFPLFlBQVkscUNBQXFDOzRCQUNwRCxNQUFNOzs7d0JBR1YsT0FBTyxLQUFLLFVBQVU7Ozs7Z0JBSTlCLFNBQVMsMEJBQTBCLFlBQVc7b0JBQzFDLEdBQUcsd0NBQXdDLFlBQVc7O3dCQUVsRCxPQUFPLFlBQVkscUNBQXFDOzRCQUNwRCxNQUFNOzRCQUNOLDRCQUE0Qjs7O3dCQUdoQyxPQUFPLEtBQUssa0JBQWtCO3dCQUM5QixLQUFLO3dCQUNMLE9BQU8sK0JBQStCLHFCQUFxQjs7Ozs7O0dBVXBFIiwiZmlsZSI6ImNvbW1vbi9yZXF1ZXN0aXRlbS9DdXJyZW50QWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcmVxdWVzdEl0ZW1Nb2R1bGUgZnJvbSAnY29tbW9uL3JlcXVlc3RJdGVtL1JlcXVlc3RJdGVtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBDdXJyZW50QWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmwuXG4gKi9cbmRlc2NyaWJlKCdDdXJyZW50QWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmwnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkcm9vdFNjb3BlLCAkY29udHJvbGxlciwgdGVzdFNlcnZpY2UsXG4gICAgICAgIHJvbGUsIGVudGl0bGVtZW50LCBjdHJsLCBhY2Nlc3NSZXF1ZXN0RGV0YWlsU2VydmljZU1vY2s7XG5cbiAgICAvLyBMb2FkIHRoZSB0ZXN0IG1vZHVsZSB0byBnZXQgdGhlIHRlc3RTZXJ2aWNlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShyZXF1ZXN0SXRlbU1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogSW5qZWN0IHRoZSBkZXBlbmRlbmNpZXMgYW5kIHNldHVwIG1vY2tzLlxuICAgICAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXykge1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIHNlcnZpY2VzLlxuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJHJvb3RTY29wZSA9IF8kcm9vdFNjb3BlXztcblxuICAgICAgICBmdW5jdGlvbiBSZXF1ZXN0SXRlbShpZCwgaXNSb2xlKSB7XG4gICAgICAgICAgICB0aGlzLmlzUm9sZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1JvbGU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdldElkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBpdGVtcyB0byB0ZXN0IHdpdGguXG4gICAgICAgIHJvbGUgPSBuZXcgUmVxdWVzdEl0ZW0oJzEyMzQnLCB0cnVlKTtcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgUmVxdWVzdEl0ZW0oJzU2NzgnLCBmYWxzZSk7XG5cbiAgICAgICAgYWNjZXNzUmVxdWVzdERldGFpbFNlcnZpY2VNb2NrID0ge1xuICAgICAgICAgICAgZ2V0Um9sZUVudGl0bGVtZW50czogdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZVNweShmYWxzZSwge1xuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFsge30gXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHt9KVxuICAgICAgICB9O1xuXG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2NvcnJlY3RseSBoYW5kbGUgcm9sZXMvZW50aXRsZW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdpc1JvbGUoKSBzaG91bGQgYmUgdHJ1ZSB3aGVuIGl0ZW0gaXMgcm9sZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQ3VycmVudEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGl0ZW06IHJvbGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JvbGUoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnaXNSb2xlKCkgc2hvdWxkIGJlIGZhbHNlIHdoZW4gaXRlbSBpcyByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRyb2xsZXIgdG8gdGVzdCB3aXRoLlxuICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdDdXJyZW50QWNjZXNzSXRlbURldGFpbERpYWxvZ0N0cmwnLCB7XG4gICAgICAgICAgICAgICAgaXRlbTogZW50aXRsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBleHBlY3QoY3RybC5pc1JvbGUoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWRSb2xlRW50aXRsZW1lbnRzKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBsb2FkIHJvbGUgZW50aXRsZW1lbnQgZGV0YWlscycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb250cm9sbGVyIHRvIHRlc3Qgd2l0aC5cbiAgICAgICAgICAgIGN0cmwgPSAkY29udHJvbGxlcignQ3VycmVudEFjY2Vzc0l0ZW1EZXRhaWxEaWFsb2dDdHJsJywge1xuICAgICAgICAgICAgICAgIGl0ZW06IHJvbGUsXG4gICAgICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERldGFpbFNlcnZpY2U6IGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlTW9ja1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnJvbGVFbnRpdGxlbWVudHMpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgY3RybC5sb2FkUm9sZUVudGl0bGVtZW50cygpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZXRhaWxTZXJ2aWNlTW9jay5nZXRSb2xlRW50aXRsZW1lbnRzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
