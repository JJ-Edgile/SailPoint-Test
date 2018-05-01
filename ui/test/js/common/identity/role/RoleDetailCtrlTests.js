System.register(['test/js/TestInitializer', 'common/identity/role/IdentityRoleModule'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }],
        execute: function () {

            describe('RoleDetailCtrl', function () {

                var $controller = undefined,
                    showEntitlementDetailsFunc = undefined,
                    $uibModalInstance = undefined,
                    $rootScope = undefined;

                beforeEach(module(roleModule));

                beforeEach(inject(function (_$controller_, _$rootScope_, $q) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;

                    showEntitlementDetailsFunc = jasmine.createSpy('showDetails').and.callFake(function (entitlement) {
                        return entitlement;
                    });
                    var modalResultDeferred = $q.defer();
                    $uibModalInstance = {
                        close: jasmine.createSpy().and.callFake(function () {
                            return modalResultDeferred.resolve();
                        }),
                        result: modalResultDeferred.promise
                    };
                }));

                function createController(role, func) {
                    return $controller('RoleDetailCtrl', {
                        role: role,
                        loadHierarchyFunction: func,
                        showEntitlementDetailsFunc: showEntitlementDetailsFunc,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                it('blows up with no role', function () {
                    expect(function () {
                        return createController(null);
                    }).toThrow();
                });

                it('stores the role', function () {
                    var role = { i: 'am a role' };
                    var ctrl = createController(role);
                    expect(ctrl.role).toEqual(role);
                });

                describe('allowed roles', function () {
                    it('initializes the selected role to the first required role', function () {
                        var required = { you: 'need me' };
                        var role = {
                            rock: 'roll',
                            requiredRoles: [required]
                        };
                        var ctrl = createController(role);
                        expect(ctrl.allowedSelectedRole).toEqual(required);
                    });

                    it('initializes the selected role to null if there are no required roles', function () {
                        var permitted = { you: 'can live without me' };
                        var role = {
                            rock: 'roll',
                            permittedRoles: [permitted]
                        };
                        var ctrl = createController(role);
                        expect(ctrl.allowedSelectedRole).toEqual(null);
                    });
                });

                it('initializes the hierarchy selected role to the role being viewed', function () {
                    var role = { rolling: 'stone' };
                    var ctrl = createController(role);
                    expect(ctrl.hierarchySelectedRole).toEqual(role);
                });

                it('creates a hierarchy with the selected role at the root', function () {
                    var child = { baby: 'waaaahhhh!!' };
                    var parent = {
                        be: 'quiet',
                        hierarchy: [child]
                    };
                    var ctrl = createController(parent);
                    expect(ctrl.hierarchy).toEqual([parent]);
                });

                it('stores the load hiearchy function', function () {
                    var role = { boom: 'goes the dynamite' };
                    var loadFunc = function () {
                        return 'passes the ball to the man...';
                    };
                    var ctrl = createController(role, loadFunc);
                    expect(ctrl.loadHierarchyFunction).toEqual(loadFunc);
                });

                describe('showEntitlementDetails()', function () {
                    it('closes modal instance and calls showEntitlementDetailsFunc with entitlement', function () {
                        var role = { some: 'thing' },
                            entitlement = { managedAttributeId: '1234' },
                            ctrl = createController(role, null);

                        ctrl.showEntitlementDetails(entitlement);
                        $rootScope.$apply();
                        expect($uibModalInstance.close).toHaveBeenCalled();
                        expect(showEntitlementDetailsFunc).toHaveBeenCalledWith(entitlement);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxDdHJsVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRDQUE0QyxVQUFVLFNBQVM7SUFDdkc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVDQUF1QztZQUM3RixhQUFhLHNDQUFzQzs7UUFFdkQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGtCQUFrQixZQUFNOztnQkFFN0IsSUFBSSxjQUFXO29CQUFFLDZCQUEwQjtvQkFBRSxvQkFBaUI7b0JBQUUsYUFBVTs7Z0JBRTFFLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLGVBQWUsY0FBYyxJQUFPO29CQUNuRCxjQUFjO29CQUNkLGFBQWE7O29CQUViLDZCQUE2QixRQUFRLFVBQVUsZUFBZSxJQUFJLFNBQVMsVUFBQyxhQUFXO3dCQVd2RSxPQVg0RTs7b0JBQzVGLElBQUksc0JBQXNCLEdBQUc7b0JBQzdCLG9CQUFvQjt3QkFDaEIsT0FBTyxRQUFRLFlBQVksSUFBSSxTQUFTLFlBQUE7NEJBYXhCLE9BYjhCLG9CQUFvQjs7d0JBQ2xFLFFBQVEsb0JBQW9COzs7O2dCQUlwQyxTQUFTLGlCQUFpQixNQUFNLE1BQU07b0JBQ2xDLE9BQU8sWUFBWSxrQkFBa0I7d0JBQ2pDLE1BQU07d0JBQ04sdUJBQXVCO3dCQUN2Qiw0QkFBNEI7d0JBQzVCLG1CQUFtQjs7OztnQkFJM0IsR0FBRyx5QkFBeUIsWUFBTTtvQkFDOUIsT0FBTyxZQUFBO3dCQWVTLE9BZkgsaUJBQWlCO3VCQUFPOzs7Z0JBR3pDLEdBQUcsbUJBQW1CLFlBQU07b0JBQ3hCLElBQUksT0FBTyxFQUFFLEdBQUc7b0JBQ2hCLElBQUksT0FBTyxpQkFBaUI7b0JBQzVCLE9BQU8sS0FBSyxNQUFNLFFBQVE7OztnQkFHOUIsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyw0REFBNEQsWUFBTTt3QkFDakUsSUFBSSxXQUFXLEVBQUUsS0FBSzt3QkFDdEIsSUFBSSxPQUFPOzRCQUNQLE1BQU07NEJBQ04sZUFBZSxDQUFFOzt3QkFFckIsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLHFCQUFxQixRQUFROzs7b0JBRzdDLEdBQUcsd0VBQXdFLFlBQU07d0JBQzdFLElBQUksWUFBWSxFQUFFLEtBQUs7d0JBQ3ZCLElBQUksT0FBTzs0QkFDUCxNQUFNOzRCQUNOLGdCQUFnQixDQUFFOzt3QkFFdEIsSUFBSSxPQUFPLGlCQUFpQjt3QkFDNUIsT0FBTyxLQUFLLHFCQUFxQixRQUFROzs7O2dCQUlqRCxHQUFHLG9FQUFvRSxZQUFNO29CQUN6RSxJQUFJLE9BQU8sRUFBRSxTQUFTO29CQUN0QixJQUFJLE9BQU8saUJBQWlCO29CQUM1QixPQUFPLEtBQUssdUJBQXVCLFFBQVE7OztnQkFHL0MsR0FBRywwREFBMEQsWUFBTTtvQkFDL0QsSUFBSSxRQUFRLEVBQUUsTUFBTTtvQkFDcEIsSUFBSSxTQUFTO3dCQUNULElBQUk7d0JBQ0osV0FBVyxDQUFFOztvQkFFakIsSUFBSSxPQUFPLGlCQUFpQjtvQkFDNUIsT0FBTyxLQUFLLFdBQVcsUUFBUSxDQUFFOzs7Z0JBR3JDLEdBQUcscUNBQXFDLFlBQU07b0JBQzFDLElBQUksT0FBTyxFQUFFLE1BQU07b0JBQ25CLElBQUksV0FBVyxZQUFNO3dCQUFFLE9BQU87O29CQUM5QixJQUFJLE9BQU8saUJBQWlCLE1BQU07b0JBQ2xDLE9BQU8sS0FBSyx1QkFBdUIsUUFBUTs7O2dCQUcvQyxTQUFTLDRCQUE0QixZQUFNO29CQUN2QyxHQUFHLCtFQUErRSxZQUFNO3dCQUNwRixJQUFJLE9BQU8sRUFBRSxNQUFNOzRCQUNmLGNBQWMsRUFBRSxvQkFBb0I7NEJBQ3BDLE9BQU8saUJBQWlCLE1BQU07O3dCQUVsQyxLQUFLLHVCQUF1Qjt3QkFDNUIsV0FBVzt3QkFDWCxPQUFPLGtCQUFrQixPQUFPO3dCQUNoQyxPQUFPLDRCQUE0QixxQkFBcUI7Ozs7OztHQXdCakUiLCJmaWxlIjoiY29tbW9uL2lkZW50aXR5L3JvbGUvUm9sZURldGFpbEN0cmxUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgcm9sZU1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvcm9sZS9JZGVudGl0eVJvbGVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ1JvbGVEZXRhaWxDdHJsJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCAkY29udHJvbGxlciwgc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmMsICR1aWJNb2RhbEluc3RhbmNlLCAkcm9vdFNjb3BlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHJvbGVNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCAkcSkgPT4ge1xyXG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcclxuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xyXG5cclxuICAgICAgICBzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCdzaG93RGV0YWlscycpLmFuZC5jYWxsRmFrZSgoZW50aXRsZW1lbnQpID0+IGVudGl0bGVtZW50KTtcclxuICAgICAgICBsZXQgbW9kYWxSZXN1bHREZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XHJcbiAgICAgICAgICAgIGNsb3NlOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZSgoKSA9PiBtb2RhbFJlc3VsdERlZmVycmVkLnJlc29sdmUoKSksXHJcbiAgICAgICAgICAgIHJlc3VsdDogbW9kYWxSZXN1bHREZWZlcnJlZC5wcm9taXNlXHJcbiAgICAgICAgfTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHJvbGUsIGZ1bmMpIHtcclxuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ1JvbGVEZXRhaWxDdHJsJywge1xyXG4gICAgICAgICAgICByb2xlOiByb2xlLFxyXG4gICAgICAgICAgICBsb2FkSGllcmFyY2h5RnVuY3Rpb246IGZ1bmMsXHJcbiAgICAgICAgICAgIHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jOiBzaG93RW50aXRsZW1lbnREZXRhaWxzRnVuYyxcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ2Jsb3dzIHVwIHdpdGggbm8gcm9sZScsICgpID0+IHtcclxuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcihudWxsKSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3N0b3JlcyB0aGUgcm9sZScsICgpID0+IHtcclxuICAgICAgICBsZXQgcm9sZSA9IHsgaTogJ2FtIGEgcm9sZScgfTtcclxuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocm9sZSk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwucm9sZSkudG9FcXVhbChyb2xlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhbGxvd2VkIHJvbGVzJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdpbml0aWFsaXplcyB0aGUgc2VsZWN0ZWQgcm9sZSB0byB0aGUgZmlyc3QgcmVxdWlyZWQgcm9sZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlcXVpcmVkID0geyB5b3U6ICduZWVkIG1lJyB9O1xyXG4gICAgICAgICAgICBsZXQgcm9sZSA9IHtcclxuICAgICAgICAgICAgICAgIHJvY2s6ICdyb2xsJyxcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkUm9sZXM6IFsgcmVxdWlyZWQgXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocm9sZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmFsbG93ZWRTZWxlY3RlZFJvbGUpLnRvRXF1YWwocmVxdWlyZWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaW5pdGlhbGl6ZXMgdGhlIHNlbGVjdGVkIHJvbGUgdG8gbnVsbCBpZiB0aGVyZSBhcmUgbm8gcmVxdWlyZWQgcm9sZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwZXJtaXR0ZWQgPSB7IHlvdTogJ2NhbiBsaXZlIHdpdGhvdXQgbWUnIH07XHJcbiAgICAgICAgICAgIGxldCByb2xlID0ge1xyXG4gICAgICAgICAgICAgICAgcm9jazogJ3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgcGVybWl0dGVkUm9sZXM6IFsgcGVybWl0dGVkIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHJvbGUpO1xyXG4gICAgICAgICAgICBleHBlY3QoY3RybC5hbGxvd2VkU2VsZWN0ZWRSb2xlKS50b0VxdWFsKG51bGwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2luaXRpYWxpemVzIHRoZSBoaWVyYXJjaHkgc2VsZWN0ZWQgcm9sZSB0byB0aGUgcm9sZSBiZWluZyB2aWV3ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJvbGUgPSB7IHJvbGxpbmc6ICdzdG9uZScgfTtcclxuICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocm9sZSk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwuaGllcmFyY2h5U2VsZWN0ZWRSb2xlKS50b0VxdWFsKHJvbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2NyZWF0ZXMgYSBoaWVyYXJjaHkgd2l0aCB0aGUgc2VsZWN0ZWQgcm9sZSBhdCB0aGUgcm9vdCcsICgpID0+IHtcclxuICAgICAgICBsZXQgY2hpbGQgPSB7IGJhYnk6ICd3YWFhYWhoaGghIScgfTtcclxuICAgICAgICBsZXQgcGFyZW50ID0ge1xyXG4gICAgICAgICAgICBiZTogJ3F1aWV0JyxcclxuICAgICAgICAgICAgaGllcmFyY2h5OiBbIGNoaWxkIF1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihwYXJlbnQpO1xyXG4gICAgICAgIGV4cGVjdChjdHJsLmhpZXJhcmNoeSkudG9FcXVhbChbIHBhcmVudCBdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzdG9yZXMgdGhlIGxvYWQgaGllYXJjaHkgZnVuY3Rpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJvbGUgPSB7IGJvb206ICdnb2VzIHRoZSBkeW5hbWl0ZScgfTtcclxuICAgICAgICBsZXQgbG9hZEZ1bmMgPSAoKSA9PiB7IHJldHVybiAncGFzc2VzIHRoZSBiYWxsIHRvIHRoZSBtYW4uLi4nOyB9O1xyXG4gICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihyb2xlLCBsb2FkRnVuYyk7XHJcbiAgICAgICAgZXhwZWN0KGN0cmwubG9hZEhpZXJhcmNoeUZ1bmN0aW9uKS50b0VxdWFsKGxvYWRGdW5jKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93RW50aXRsZW1lbnREZXRhaWxzKCknLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2Nsb3NlcyBtb2RhbCBpbnN0YW5jZSBhbmQgY2FsbHMgc2hvd0VudGl0bGVtZW50RGV0YWlsc0Z1bmMgd2l0aCBlbnRpdGxlbWVudCcsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvbGUgPSB7IHNvbWU6ICd0aGluZycgfSxcclxuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50ID0geyBtYW5hZ2VkQXR0cmlidXRlSWQ6ICcxMjM0JyB9LFxyXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIocm9sZSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBjdHJsLnNob3dFbnRpdGxlbWVudERldGFpbHMoZW50aXRsZW1lbnQpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICBleHBlY3QoJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KHNob3dFbnRpdGxlbWVudERldGFpbHNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnRpdGxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
