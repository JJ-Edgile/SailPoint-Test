System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityAccessCtrl', function () {
                var identityAccessService = undefined,
                    identityService = undefined,
                    spModal = undefined,
                    $controller = undefined,
                    $q = undefined,
                    $scope = undefined,
                    identityId = 'someId',
                    quickLink = 'viewIdentityQuickLinkName';

                beforeEach(module(identityModule));

                beforeEach(inject(function (_identityAccessService_, _identityService_, _spModal_, _$controller_, _$q_, _$rootScope_) {
                    identityAccessService = _identityAccessService_;
                    identityService = _identityService_;
                    spModal = _spModal_;
                    $controller = _$controller_;
                    $q = _$q_;
                    $scope = _$rootScope_.$new();
                }));

                function createController() {
                    var stateParams = {
                        identityId: identityId,
                        quickLink: quickLink
                    };
                    return $controller('IdentityAccessCtrl', {
                        $scope: $scope,
                        $stateParams: stateParams,
                        identityAccessService: identityAccessService,
                        identityService: identityService
                    });
                }

                describe('hasEffectiveAccess', function () {
                    it('should be false if identityAccessService returns no effective access', function () {
                        var fakeResult = {
                            data: {
                                objects: []
                            }
                        },
                            ctrl = undefined;
                        spyOn(identityAccessService, 'getEffectiveAccess').and.returnValue($q.when(fakeResult));
                        ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        // Digest promise
                        $scope.$apply();
                        expect(ctrl.hasEffectiveAccess()).toBeFalsy();
                    });

                    it('should be true if identityAccessService returns no effective access', function () {
                        var fakeResult = {
                            data: {
                                objects: ['a thing that does not matter for this particular situation']
                            }
                        },
                            ctrl = undefined;
                        spyOn(identityAccessService, 'getEffectiveAccess').and.returnValue($q.when(fakeResult));
                        ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        // Digest promise
                        $scope.$apply();
                        expect(ctrl.hasEffectiveAccess()).toBeTruthy();
                    });
                });

                describe('showDirect property', function () {
                    it('should be true once showDirectTable is called', function () {
                        var ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        ctrl.showDirectTable();
                        expect(ctrl.showDirect).toBeTruthy();
                    });

                    it('should be true regardless of how many times showDirectTable is called', function () {
                        var ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        ctrl.showDirectTable();
                        expect(ctrl.showDirect).toBeTruthy();
                        ctrl.showDirectTable();
                        expect(ctrl.showDirect).toBeTruthy();
                        ctrl.showDirectTable();
                        expect(ctrl.showDirect).toBeTruthy();
                    });

                    it('should be false once showEffectiveTable is called', function () {
                        var ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        ctrl.showEffectiveTable();
                        expect(ctrl.showDirect).toBeFalsy();
                    });

                    it('should be false regardless of how many times  showEffectiveTable is called', function () {
                        var ctrl = createController();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        ctrl.showEffectiveTable();
                        expect(ctrl.showDirect).toBeFalsy();
                        ctrl.showEffectiveTable();
                        expect(ctrl.showDirect).toBeFalsy();
                    });
                });

                describe('role stuff', function () {
                    it('should call through to IdentityAccessService.getRoleEntitlements to get roles', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getRoleEntitlements').and.callFake(angular.noop);
                        ctrl.getRoleEntitlements(0, 1, sort);
                        expect(identityAccessService.getRoleEntitlements).toHaveBeenCalledWith(quickLink, identityId, 0, 1, sort, '');
                    });

                    it('should call through to IdentityAccessService.getRoleEntitlements to get roles', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getRoleEntitlements').and.callFake(angular.noop);
                        ctrl.roleQuery = 'asdf';
                        ctrl.getRoleEntitlements(0, 1, sort);
                        expect(identityAccessService.getRoleEntitlements).toHaveBeenCalledWith(quickLink, identityId, 0, 1, sort, 'asdf');
                    });

                    it('should get a table config with the right values', function () {
                        var expectedColConfigKey = 'uiIdentityEntitlementRoleGridColumns',
                            ctrl = createController(),
                            config = ctrl.getRoleEntitlementConfig();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        expect(config.getColumnConfigKey()).toEqual(expectedColConfigKey);
                    });
                });

                describe('entitlement stuff', function () {
                    it('should call through to IdentityAccessService.getEntitlements to get entitlements', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getEntitlements').and.callFake(angular.noop);
                        ctrl.getEntitlements(5, 100, sort);
                        expect(identityAccessService.getEntitlements).toHaveBeenCalledWith(quickLink, identityId, 5, 100, sort, '', false);
                    });

                    it('should call through to IdentityAccessService.getEntitlements to get entitlements with query', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getEntitlements').and.callFake(angular.noop);
                        ctrl.entitlementQuery = 'asdf';
                        ctrl.getEntitlements(5, 100, sort);
                        expect(identityAccessService.getEntitlements).toHaveBeenCalledWith(quickLink, identityId, 5, 100, sort, 'asdf', false);
                    });

                    it('should call through to IdentityAccessService.getEntitlements to get entitlements with show additional', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getEntitlements').and.callFake(angular.noop);
                        ctrl.additionalOnly = true;
                        ctrl.getEntitlements(5, 100, sort);
                        expect(identityAccessService.getEntitlements).toHaveBeenCalledWith(quickLink, identityId, 5, 100, sort, '', true);
                    });

                    it('should get a table config with the right values', function () {
                        var expectedColConfigKey = 'uiIdentityEntitlementGridColumns',
                            ctrl = createController(),
                            config = ctrl.getEntitlementConfig();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        expect(config.getColumnConfigKey()).toEqual(expectedColConfigKey);
                    });

                    it('should go to the first page when toggleAdditionalEntitlements is called', function () {
                        var ctrl = createController(),
                            config = ctrl.getEntitlementConfig();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        expect(config.pageState.pagingData.currentPage).toEqual(1);
                        config.pageState.pagingData.currentPage = 3;
                        expect(config.pageState.pagingData.currentPage).toEqual(3);
                        ctrl.toggleAdditionalEntitlements();
                        expect(config.pageState.pagingData.currentPage).toEqual(1);
                    });
                });

                describe('effective access stuff', function () {
                    it('should call through to IdentityAccessService.getEffectiveAccess to get effective access', function () {
                        var ctrl = createController(),
                            sort = 'column1';
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        spyOn(identityAccessService, 'getEffectiveAccess').and.callFake(angular.noop);
                        ctrl.getEffectiveAccess(42, 123, sort);
                        expect(identityAccessService.getEffectiveAccess).toHaveBeenCalledWith(quickLink, identityId, 42, 123, sort);
                    });

                    it('should get a table config with the right values', function () {
                        var expectedColConfigKey = 'uiIdentityEntitlementIndirectGridColumns',
                            ctrl = createController(),
                            config = ctrl.getEffectiveConfig();
                        ctrl.quickLink = 'viewIdentityQuickLinkName';
                        expect(config.getColumnConfigKey()).toEqual(expectedColConfigKey);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSXZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLHNCQUFzQixZQUFXO2dCQUN0QyxJQUFJLHdCQUFxQjtvQkFBRSxrQkFBZTtvQkFBRSxVQUFPO29CQUMvQyxjQUFXO29CQUFFLEtBQUU7b0JBQUUsU0FBTTtvQkFDdkIsYUFBYTtvQkFDYixZQUFZOztnQkFFaEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMseUJBQXlCLG1CQUFtQixXQUFXLGVBQWUsTUFDdEUsY0FBYztvQkFDckMsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxLQUFLO29CQUNMLFNBQVMsYUFBYTs7O2dCQUcxQixTQUFTLG1CQUFtQjtvQkFDeEIsSUFBSSxjQUFjO3dCQUNkLFlBQVk7d0JBQ1osV0FBVzs7b0JBRWYsT0FBTyxZQUFZLHNCQUFzQjt3QkFDckMsUUFBUTt3QkFDUixjQUFjO3dCQUNkLHVCQUF1Qjt3QkFDdkIsaUJBQWlCOzs7O2dCQUl6QixTQUFTLHNCQUFzQixZQUFXO29CQUN0QyxHQUFHLHdFQUF3RSxZQUFXO3dCQUNsRixJQUFJLGFBQWE7NEJBQ2IsTUFBTTtnQ0FDRixTQUFTOzs7NEJBRWQsT0FBSTt3QkFDUCxNQUFNLHVCQUF1QixzQkFBc0IsSUFBSSxZQUFZLEdBQUcsS0FBSzt3QkFDM0UsT0FBTzt3QkFDUCxLQUFLLFlBQVk7O3dCQUVqQixPQUFPO3dCQUNQLE9BQU8sS0FBSyxzQkFBc0I7OztvQkFHdEMsR0FBRyx1RUFBdUUsWUFBVzt3QkFDakYsSUFB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LEdBQUcsS0FBSzt3QkFDN0IsT0FBTyxzQkFBc0IsaUJBQWlCLHFCQUFxQixXQUFXLFlBQVksR0FBRyxLQUFLLE1BQzlGLElBQUk7OztvQkFHaEIsR0FBRyxtREFBbUQsWUFBVzt3QkFDN0QsSUFBSSx1QkFBdUI7NEJBQ3ZCLE9BQU87NEJBQ1AsU0FBUyxLQUFLO3dCQUNsQixLQUFLLFlBQVk7d0JBQ2pCLE9BQU8sT0FBTyxzQkFBc0IsUUFBUTs7O29CQUdoRCxHQUFHLDJFQUEyRSxZQUFXO3dCQUNyRixJQUFJLE9BQU87NEJBQ1AsU0FBUyxLQUFLO3dCQUNsQixLQUFLLFlBQVk7d0JBQ2pCLE9BQU8sT0FBTyxVQUFVLFdBQVcsYUFBYSxRQUFRO3dCQUN4RCxPQUFPLFVBQVUsV0FBVyxjQUFjO3dCQUMxQyxPQUFPLE9BQU8sVUFBVSxXQUFXLGFBQWEsUUFBUTt3QkFDeEQsS0FBSzt3QkFDTCxPQUFPLE9BQU8sVUFBVSxXQUFXLGFBQWEsUUFBUTs7OztnQkFLaEUsU0FBUywwQkFBMEIsWUFBVztvQkFDMUMsR0FBRywyRkFBMkYsWUFBVzt3QkFDckcsSUFBSSxPQUFPOzRCQUNQLE9BQU87d0JBQ1gsS0FBSyxZQUFZO3dCQUNqQixNQUFNLHVCQUF1QixzQkFBc0IsSUFBSSxTQUFTLFFBQVE7d0JBQ3hFLEtBQUssbUJBQW1CLElBQUksS0FBSzt3QkFDakMsT0FBTyxzQkFBc0Isb0JBQW9CLHFCQUFxQixXQUFXLFlBQVksSUFBSSxLQUFLOzs7b0JBRzFHLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELElBQUksdUJBQXVCOzRCQUN2QixPQUFPOzRCQUNQLFNBQVMsS0FBSzt3QkFDbEIsS0FBSyxZQUFZO3dCQUNqQixPQUFPLE9BQU8sc0JBQXNCLFFBQVE7Ozs7OztHQVdyRCIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUFjY2Vzc0N0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ0lkZW50aXR5QWNjZXNzQ3RybCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBpZGVudGl0eUFjY2Vzc1NlcnZpY2UsIGlkZW50aXR5U2VydmljZSwgc3BNb2RhbCxcbiAgICAgICAgJGNvbnRyb2xsZXIsICRxLCAkc2NvcGUsXG4gICAgICAgIGlkZW50aXR5SWQgPSAnc29tZUlkJyxcbiAgICAgICAgcXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9pZGVudGl0eUFjY2Vzc1NlcnZpY2VfLCBfaWRlbnRpdHlTZXJ2aWNlXywgX3NwTW9kYWxfLCBfJGNvbnRyb2xsZXJfLCBfJHFfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8kcm9vdFNjb3BlXykge1xuICAgICAgICBpZGVudGl0eUFjY2Vzc1NlcnZpY2UgPSBfaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlXztcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgJHEgPSBfJHFfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGxldCBzdGF0ZVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGlkZW50aXR5SWQ6IGlkZW50aXR5SWQsXG4gICAgICAgICAgICBxdWlja0xpbms6IHF1aWNrTGlua1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0lkZW50aXR5QWNjZXNzQ3RybCcsIHtcbiAgICAgICAgICAgICRzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgJHN0YXRlUGFyYW1zOiBzdGF0ZVBhcmFtcyxcbiAgICAgICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZTogaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLFxuICAgICAgICAgICAgaWRlbnRpdHlTZXJ2aWNlOiBpZGVudGl0eVNlcnZpY2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2hhc0VmZmVjdGl2ZUFjY2VzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIGJlIGZhbHNlIGlmIGlkZW50aXR5QWNjZXNzU2VydmljZSByZXR1cm5zIG5vIGVmZmVjdGl2ZSBhY2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmYWtlUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjdHJsO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0RWZmZWN0aXZlQWNjZXNzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZmFrZVJlc3VsdCkpO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgLy8gRGlnZXN0IHByb21pc2VcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0VmZmVjdGl2ZUFjY2VzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGlmIGlkZW50aXR5QWNjZXNzU2VydmljZSByZXR1cm5zIG5vIGVmZmVjdGl2ZSBhY2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmYWtlUmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogWydhIHRoaW5nIHRoYXQgZG9lcyBub3QgbWF0dGVyIGZvciB0aGlzIHBhcnRpY3VsYXIgc2l0dWF0aW9uJ11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjdHJsO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0RWZmZWN0aXZlQWNjZXNzJykuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oZmFrZVJlc3VsdCkpO1xuICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgLy8gRGlnZXN0IHByb21pc2VcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmhhc0VmZmVjdGl2ZUFjY2VzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3dEaXJlY3QgcHJvcGVydHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIG9uY2Ugc2hvd0RpcmVjdFRhYmxlIGlzIGNhbGxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBjdHJsLnF1aWNrTGluayA9ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJztcbiAgICAgICAgICAgIGN0cmwuc2hvd0RpcmVjdFRhYmxlKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RGlyZWN0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSByZWdhcmRsZXNzIG9mIGhvdyBtYW55IHRpbWVzIHNob3dEaXJlY3RUYWJsZSBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBjdHJsLnNob3dEaXJlY3RUYWJsZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RpcmVjdCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgY3RybC5zaG93RGlyZWN0VGFibGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEaXJlY3QpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGN0cmwuc2hvd0RpcmVjdFRhYmxlKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zaG93RGlyZWN0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZmFsc2Ugb25jZSBzaG93RWZmZWN0aXZlVGFibGUgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgY3RybC5zaG93RWZmZWN0aXZlVGFibGUoKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnNob3dEaXJlY3QpLnRvQmVGYWxzeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGZhbHNlIHJlZ2FyZGxlc3Mgb2YgaG93IG1hbnkgdGltZXMgIHNob3dFZmZlY3RpdmVUYWJsZSBpcyBjYWxsZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBjdHJsLnNob3dFZmZlY3RpdmVUYWJsZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RpcmVjdCkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBjdHJsLnNob3dFZmZlY3RpdmVUYWJsZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuc2hvd0RpcmVjdCkudG9CZUZhbHN5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JvbGUgc3R1ZmYnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gSWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMgdG8gZ2V0IHJvbGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0ID0gJ2NvbHVtbjEnO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eUFjY2Vzc1NlcnZpY2UsICdnZXRSb2xlRW50aXRsZW1lbnRzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICBjdHJsLmdldFJvbGVFbnRpdGxlbWVudHMoMCwgMSwgc29ydCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgMCwgMSwgc29ydCxcbiAgICAgICAgICAgICAgICAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5QWNjZXNzU2VydmljZS5nZXRSb2xlRW50aXRsZW1lbnRzIHRvIGdldCByb2xlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9ICdjb2x1bW4xJztcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0Um9sZUVudGl0bGVtZW50cycpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgY3RybC5yb2xlUXVlcnkgPSAnYXNkZic7XG4gICAgICAgICAgICBjdHJsLmdldFJvbGVFbnRpdGxlbWVudHMoMCwgMSwgc29ydCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgMCwgMSwgc29ydCxcbiAgICAgICAgICAgICAgICAnYXNkZicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGdldCBhIHRhYmxlIGNvbmZpZyB3aXRoIHRoZSByaWdodCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBleHBlY3RlZENvbENvbmZpZ0tleSA9ICd1aUlkZW50aXR5RW50aXRsZW1lbnRSb2xlR3JpZENvbHVtbnMnLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgY29uZmlnID0gY3RybC5nZXRSb2xlRW50aXRsZW1lbnRDb25maWcoKTtcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5nZXRDb2x1bW5Db25maWdLZXkoKSkudG9FcXVhbChleHBlY3RlZENvbENvbmZpZ0tleSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VudGl0bGVtZW50IHN0dWZmJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMgdG8gZ2V0IGVudGl0bGVtZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc29ydCA9ICdjb2x1bW4xJztcbiAgICAgICAgICAgIGN0cmwucXVpY2tMaW5rID0gJ3ZpZXdJZGVudGl0eVF1aWNrTGlua05hbWUnO1xuICAgICAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnRzJykuYW5kLmNhbGxGYWtlKGFuZ3VsYXIubm9vcCk7XG4gICAgICAgICAgICBjdHJsLmdldEVudGl0bGVtZW50cyg1LCAxMDAsIHNvcnQpO1xuICAgICAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgNSwgMTAwLCBzb3J0LFxuICAgICAgICAgICAgICAgICcnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMgdG8gZ2V0IGVudGl0bGVtZW50cyB3aXRoIHF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzb3J0ID0gJ2NvbHVtbjEnO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBzcHlPbihpZGVudGl0eUFjY2Vzc1NlcnZpY2UsICdnZXRFbnRpdGxlbWVudHMnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgIGN0cmwuZW50aXRsZW1lbnRRdWVyeSA9ICdhc2RmJztcbiAgICAgICAgICAgIGN0cmwuZ2V0RW50aXRsZW1lbnRzKDUsIDEwMCwgc29ydCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldEVudGl0bGVtZW50cykudG9IYXZlQmVlbkNhbGxlZFdpdGgocXVpY2tMaW5rLCBpZGVudGl0eUlkLCA1LCAxMDAsIHNvcnQsXG4gICAgICAgICAgICAgICAgJ2FzZGYnLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMgdG8gZ2V0IGVudGl0bGVtZW50cyB3aXRoIHNob3cgYWRkaXRpb25hbCcsXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgc29ydCA9ICdjb2x1bW4xJztcbiAgICAgICAgICAgICAgICBjdHJsLnF1aWNrTGluayA9ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJztcbiAgICAgICAgICAgICAgICBzcHlPbihpZGVudGl0eUFjY2Vzc1NlcnZpY2UsICdnZXRFbnRpdGxlbWVudHMnKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgICAgICAgICBjdHJsLmFkZGl0aW9uYWxPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjdHJsLmdldEVudGl0bGVtZW50cyg1LCAxMDAsIHNvcnQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0RW50aXRsZW1lbnRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChxdWlja0xpbmssIGlkZW50aXR5SWQsIDUsIDEwMCwgc29ydCxcbiAgICAgICAgICAgICAgICAgICAgJycsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgYSB0YWJsZSBjb25maWcgd2l0aCB0aGUgcmlnaHQgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRDb2xDb25maWdLZXkgPSAndWlJZGVudGl0eUVudGl0bGVtZW50R3JpZENvbHVtbnMnLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgY29uZmlnID0gY3RybC5nZXRFbnRpdGxlbWVudENvbmZpZygpO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmdldENvbHVtbkNvbmZpZ0tleSgpKS50b0VxdWFsKGV4cGVjdGVkQ29sQ29uZmlnS2V5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBnbyB0byB0aGUgZmlyc3QgcGFnZSB3aGVuIHRvZ2dsZUFkZGl0aW9uYWxFbnRpdGxlbWVudHMgaXMgY2FsbGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjdHJsLmdldEVudGl0bGVtZW50Q29uZmlnKCk7XG4gICAgICAgICAgICBjdHJsLnF1aWNrTGluayA9ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJztcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBjb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSAzO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgzKTtcbiAgICAgICAgICAgIGN0cmwudG9nZ2xlQWRkaXRpb25hbEVudGl0bGVtZW50cygpO1xuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YS5jdXJyZW50UGFnZSkudG9FcXVhbCgxKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZmZlY3RpdmUgYWNjZXNzIHN0dWZmJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIElkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFZmZlY3RpdmVBY2Nlc3MgdG8gZ2V0IGVmZmVjdGl2ZSBhY2Nlc3MnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgICAgIHNvcnQgPSAnY29sdW1uMSc7XG4gICAgICAgICAgICBjdHJsLnF1aWNrTGluayA9ICd2aWV3SWRlbnRpdHlRdWlja0xpbmtOYW1lJztcbiAgICAgICAgICAgIHNweU9uKGlkZW50aXR5QWNjZXNzU2VydmljZSwgJ2dldEVmZmVjdGl2ZUFjY2VzcycpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgY3RybC5nZXRFZmZlY3RpdmVBY2Nlc3MoNDIsIDEyMywgc29ydCk7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldEVmZmVjdGl2ZUFjY2VzcykudG9IYXZlQmVlbkNhbGxlZFdpdGgocXVpY2tMaW5rLCBpZGVudGl0eUlkLCA0MiwgMTIzLCBzb3J0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBnZXQgYSB0YWJsZSBjb25maWcgd2l0aCB0aGUgcmlnaHQgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRDb2xDb25maWdLZXkgPSAndWlJZGVudGl0eUVudGl0bGVtZW50SW5kaXJlY3RHcmlkQ29sdW1ucycsXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjdHJsLmdldEVmZmVjdGl2ZUNvbmZpZygpO1xuICAgICAgICAgICAgY3RybC5xdWlja0xpbmsgPSAndmlld0lkZW50aXR5UXVpY2tMaW5rTmFtZSc7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmdldENvbHVtbkNvbmZpZ0tleSgpKS50b0VxdWFsKGV4cGVjdGVkQ29sQ29uZmlnS2V5KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
