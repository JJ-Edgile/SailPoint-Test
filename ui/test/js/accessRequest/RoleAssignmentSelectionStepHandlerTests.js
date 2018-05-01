System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            describe('RoleAssignmentSelectionStepHandler', function () {

                var accessRequestItemData, ambiguousRole1Data, ambiguousRole2Data, accessRequestItem, ambiguousRole1, ambiguousRole2, stepHandler, $rootScope, testService, RoleAssignmentSelectionStepHandler;

                beforeEach(module(testModule, accessRequestModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_RoleAssignmentSelectionStepHandler_, _$rootScope_, _testService_, $controller, AssignedRole, AccessRequestItem, accessRequestTestData) {
                    RoleAssignmentSelectionStepHandler = _RoleAssignmentSelectionStepHandler_;

                    accessRequestItemData = accessRequestTestData.PERMITTED_ROLE;
                    ambiguousRole1Data = accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE1;
                    ambiguousRole2Data = accessRequestTestData.AMBIGUOUS_ASSIGNED_ROLE2;

                    accessRequestItem = new AccessRequestItem(accessRequestItemData);
                    ambiguousRole1 = new AssignedRole(ambiguousRole1Data);
                    ambiguousRole2 = new AssignedRole(ambiguousRole2Data);
                    $rootScope = _$rootScope_;
                    stepHandler = new RoleAssignmentSelectionStepHandler(accessRequestItem, [ambiguousRole1, ambiguousRole2]);
                    testService = _testService_;
                }));

                describe('constructor', function () {
                    it('requires an accessRequestItem', function () {
                        expect(function () {
                            new RoleAssignmentSelectionStepHandler(null, [ambiguousRole1]);
                        }).toThrow();
                    });

                    it('requires a ambiguousAssignedRoles', function () {
                        expect(function () {
                            new RoleAssignmentSelectionStepHandler(accessRequestItem, null);
                        }).toThrow();
                    });

                    it('initializes values correctly', function () {
                        expect(stepHandler.accessRequestItem).toEqual(accessRequestItem);
                        expect(stepHandler.ambiguousAssignedRoles).toEqual([ambiguousRole1, ambiguousRole2]);
                        expect(stepHandler.selectedRole).toEqual(undefined);
                    });
                });

                describe('selecting a role', function () {
                    it('starts with no role selected', function () {
                        expect(stepHandler.selectedRole).not.toBeDefined();
                    });

                    it('sets selected role when selected', function () {
                        stepHandler.selectRole(ambiguousRole1);
                        expect(stepHandler.selectedRole).toBeDefined();
                        expect(stepHandler.isRoleSelected(ambiguousRole1)).toBeTruthy();
                    });

                    it('changes selection', function () {
                        stepHandler.selectRole(ambiguousRole1);
                        expect(stepHandler.isRoleSelected(ambiguousRole1)).toBeTruthy();
                        stepHandler.selectRole(ambiguousRole2);
                        expect(stepHandler.isRoleSelected(ambiguousRole1)).toBeFalsy();
                        expect(stepHandler.isRoleSelected(ambiguousRole2)).toBeTruthy();
                    });

                    it('deselects role', function () {
                        stepHandler.selectRole(ambiguousRole1);
                        expect(stepHandler.isRoleSelected(ambiguousRole1)).toBeTruthy();
                        stepHandler.deselectRole();
                        expect(stepHandler.isRoleSelected(ambiguousRole1)).toBeFalsy();
                        expect(stepHandler.selectedRole).not.toBeDefined();
                    });
                });

                describe('StepHandler interface', function () {
                    it('returns a dialog title', function () {
                        expect(stepHandler.getTitle()).toEqual('ui_role_assignment_select_title');
                    });

                    it('disables save button if not role selected', function () {
                        expect(stepHandler.isSaveDisabled()).toBeTruthy();
                        stepHandler.selectRole(ambiguousRole2);
                        expect(stepHandler.isSaveDisabled()).toBeFalsy();
                        stepHandler.deselectRole();
                        expect(stepHandler.isSaveDisabled()).toBeTruthy();
                    });

                    it('returns a save button label', function () {
                        expect(stepHandler.getSaveButtonLabel()).toEqual('ui_button_continue');
                    });

                    it('returns a unique step id', function () {
                        expect(stepHandler.getStepId()).toEqual('roleAssignmentSelect_' + accessRequestItemData.id);
                    });

                    it('returns resolved promise with assignmentId when saving with selection', function () {
                        var promise;
                        stepHandler.selectRole(ambiguousRole1);
                        promise = stepHandler.save();
                        expect(promise).toBeDefined();
                        promise.then(function (response) {
                            expect(response).toEqual(ambiguousRole1Data.assignmentId);
                        });
                        $rootScope.$apply();
                    });

                    it('returns rejected promise when saving with no selection', function () {
                        var promise = stepHandler.save(),
                            spy = testService.spyOnFailure(promise);

                        $rootScope.$apply();
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlclRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsc0JBQXNCLDRCQUE0QixVQUFVLFNBQVM7SUFDbEo7O0lBRUEsSUFBSSxxQkFBcUI7SUFDekIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7V0FDaEMsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUw3QixTQUFTLHNDQUFzQyxZQUFXOztnQkFFdEQsSUFBSSx1QkFBdUIsb0JBQW9CLG9CQUMzQyxtQkFBbUIsZ0JBQWdCLGdCQUFnQixhQUFhLFlBQVksYUFDNUU7O2dCQUVKLFdBQVcsT0FBTyxZQUFZOzs7Z0JBRzlCLFdBQVcsT0FBTyxVQUFTLHNDQUFzQyxjQUFjLGVBQWUsYUFDbkUsY0FBYyxtQkFBbUIsdUJBQXVCO29CQUMvRSxxQ0FBcUM7O29CQUVyQyx3QkFBd0Isc0JBQXNCO29CQUM5QyxxQkFBcUIsc0JBQXNCO29CQUMzQyxxQkFBcUIsc0JBQXNCOztvQkFFM0Msb0JBQW9CLElBQUksa0JBQWtCO29CQUMxQyxpQkFBaUIsSUFBSSxhQUFhO29CQUNsQyxpQkFBaUIsSUFBSSxhQUFhO29CQUNsQyxhQUFhO29CQUNiLGNBQWMsSUFBSSxtQ0FBbUMsbUJBQW1CLENBQUMsZ0JBQWdCO29CQUN6RixjQUFjOzs7Z0JBR2xCLFNBQVMsZUFBZSxZQUFXO29CQUMvQixHQUFHLGlDQUFpQyxZQUFXO3dCQUMzQyxPQUFPLFlBQVc7NEJBQ2QsSUFBSSxtQ0FBbUMsTUFBTSxDQUFDOzJCQUMvQzs7O29CQUdQLEdBQUcscUNBQXFDLFlBQVc7d0JBQy9DLE9BQU8sWUFBVzs0QkFDZCxJQUFJLG1DQUFtQyxtQkFBbUI7MkJBQzNEOzs7b0JBR1AsR0FBRyxnQ0FBZ0MsWUFBVzt3QkFDMUMsT0FBTyxZQUFZLG1CQUFtQixRQUFRO3dCQUM5QyxPQUFPLFlBQVksd0JBQXdCLFFBQVEsQ0FBQyxnQkFBZTt3QkFDbkUsT0FBTyxZQUFZLGNBQWMsUUFBUTs7OztnQkFJakQsU0FBUyxvQkFBb0IsWUFBVztvQkFDcEMsR0FBSSxnQ0FBZ0MsWUFBVzt3QkFDM0MsT0FBTyxZQUFZLGNBQWMsSUFBSTs7O29CQUd6QyxHQUFJLG9DQUFvQyxZQUFXO3dCQUMvQyxZQUFZLFdBQVc7d0JBQ3ZCLE9BQU8sWUFBWSxjQUFjO3dCQUNqQyxPQUFPLFlBQVksZUFBZSxpQkFBaUI7OztvQkFHdkQsR0FBSSxxQkFBcUIsWUFBVzt3QkFDaEMsWUFBWSxXQUFXO3dCQUN2QixPQUFPLFlBQVksZUFBZSxpQkFBaUI7d0JBQ25ELFlBQVksV0FBVzt3QkFDdkIsT0FBTyxZQUFZLGVBQWUsaUJBQWlCO3dCQUNuRCxPQUFPLFlBQVksZUFBZSxpQkFBaUI7OztvQkFHdkQsR0FBRyxrQkFBa0IsWUFBVzt3QkFDNUIsWUFBWSxXQUFXO3dCQUN2QixPQUFPLFlBQVksZUFBZSxpQkFBaUI7d0JBQ25ELFlBQVk7d0JBQ1osT0FBTyxZQUFZLGVBQWUsaUJBQWlCO3dCQUNuRCxPQUFPLFlBQVksY0FBYyxJQUFJOzs7O2dCQUk3QyxTQUFTLHlCQUF5QixZQUFXO29CQUN6QyxHQUFHLDBCQUEwQixZQUFXO3dCQUNwQyxPQUFPLFlBQVksWUFBWSxRQUFROzs7b0JBRzNDLEdBQUcsNkNBQTZDLFlBQVc7d0JBQ3ZELE9BQU8sWUFBWSxrQkFBa0I7d0JBQ3JDLFlBQVksV0FBVzt3QkFDdkIsT0FBTyxZQUFZLGtCQUFrQjt3QkFDckMsWUFBWTt3QkFDWixPQUFPLFlBQVksa0JBQWtCOzs7b0JBR3pDLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLE9BQU8sWUFBWSxzQkFBc0IsUUFBUTs7O29CQUdyRCxHQUFHLDRCQUE0QixZQUFXO3dCQUN0QyxPQUFPLFlBQVksYUFBYSxRQUFRLDBCQUEwQixzQkFBc0I7OztvQkFHNUYsR0FBRyx5RUFBeUUsWUFBVzt3QkFDbkYsSUFBSTt3QkFDSixZQUFZLFdBQVc7d0JBQ3ZCLFVBQVUsWUFBWTt3QkFDdEIsT0FBTyxTQUFTO3dCQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFVBQVUsUUFBUSxtQkFBbUI7O3dCQUVoRCxXQUFXOzs7b0JBR2YsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsSUFBSSxVQUFVLFlBQVk7NEJBQ3RCLE1BQU0sWUFBWSxhQUFhOzt3QkFFbkMsV0FBVzt3QkFDWCxPQUFPLEtBQUs7Ozs7OztHQVVyQiIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXJUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vQWNjZXNzUmVxdWVzdFRlc3REYXRhJztcblxuZGVzY3JpYmUoJ1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXInLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBhY2Nlc3NSZXF1ZXN0SXRlbURhdGEsIGFtYmlndW91c1JvbGUxRGF0YSwgYW1iaWd1b3VzUm9sZTJEYXRhLFxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbSwgYW1iaWd1b3VzUm9sZTEsIGFtYmlndW91c1JvbGUyLCBzdGVwSGFuZGxlciwgJHJvb3RTY29wZSwgdGVzdFNlcnZpY2UsXG4gICAgICAgIFJvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh0ZXN0TW9kdWxlLCBhY2Nlc3NSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXJfLCBfJHJvb3RTY29wZV8sIF90ZXN0U2VydmljZV8sICRjb250cm9sbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2lnbmVkUm9sZSwgQWNjZXNzUmVxdWVzdEl0ZW0sIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xuICAgICAgICBSb2xlQXNzaWdubWVudFNlbGVjdGlvblN0ZXBIYW5kbGVyID0gX1JvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXJfO1xuXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtRGF0YSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5QRVJNSVRURURfUk9MRTtcbiAgICAgICAgYW1iaWd1b3VzUm9sZTFEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkFNQklHVU9VU19BU1NJR05FRF9ST0xFMTtcbiAgICAgICAgYW1iaWd1b3VzUm9sZTJEYXRhID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLkFNQklHVU9VU19BU1NJR05FRF9ST0xFMjtcblxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SXRlbSA9IG5ldyBBY2Nlc3NSZXF1ZXN0SXRlbShhY2Nlc3NSZXF1ZXN0SXRlbURhdGEpO1xuICAgICAgICBhbWJpZ3VvdXNSb2xlMSA9IG5ldyBBc3NpZ25lZFJvbGUoYW1iaWd1b3VzUm9sZTFEYXRhKTtcbiAgICAgICAgYW1iaWd1b3VzUm9sZTIgPSBuZXcgQXNzaWduZWRSb2xlKGFtYmlndW91c1JvbGUyRGF0YSk7XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHN0ZXBIYW5kbGVyID0gbmV3IFJvbGVBc3NpZ25tZW50U2VsZWN0aW9uU3RlcEhhbmRsZXIoYWNjZXNzUmVxdWVzdEl0ZW0sIFthbWJpZ3VvdXNSb2xlMSwgYW1iaWd1b3VzUm9sZTJdKTtcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgncmVxdWlyZXMgYW4gYWNjZXNzUmVxdWVzdEl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBuZXcgUm9sZUFzc2lnbm1lbnRTZWxlY3Rpb25TdGVwSGFuZGxlcihudWxsLCBbYW1iaWd1b3VzUm9sZTFdKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlcXVpcmVzIGEgYW1iaWd1b3VzQXNzaWduZWRSb2xlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG5ldyBSb2xlQXNzaWdubWVudFNlbGVjdGlvblN0ZXBIYW5kbGVyKGFjY2Vzc1JlcXVlc3RJdGVtLCBudWxsKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luaXRpYWxpemVzIHZhbHVlcyBjb3JyZWN0bHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5hY2Nlc3NSZXF1ZXN0SXRlbSkudG9FcXVhbChhY2Nlc3NSZXF1ZXN0SXRlbSk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuYW1iaWd1b3VzQXNzaWduZWRSb2xlcykudG9FcXVhbChbYW1iaWd1b3VzUm9sZTEsYW1iaWd1b3VzUm9sZTJdKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5zZWxlY3RlZFJvbGUpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2VsZWN0aW5nIGEgcm9sZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCAoJ3N0YXJ0cyB3aXRoIG5vIHJvbGUgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5zZWxlY3RlZFJvbGUpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCAoJ3NldHMgc2VsZWN0ZWQgcm9sZSB3aGVuIHNlbGVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zZWxlY3RSb2xlKGFtYmlndW91c1JvbGUxKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5zZWxlY3RlZFJvbGUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNSb2xlU2VsZWN0ZWQoYW1iaWd1b3VzUm9sZTEpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0ICgnY2hhbmdlcyBzZWxlY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLnNlbGVjdFJvbGUoYW1iaWd1b3VzUm9sZTEpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzUm9sZVNlbGVjdGVkKGFtYmlndW91c1JvbGUxKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgc3RlcEhhbmRsZXIuc2VsZWN0Um9sZShhbWJpZ3VvdXNSb2xlMik7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuaXNSb2xlU2VsZWN0ZWQoYW1iaWd1b3VzUm9sZTEpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1JvbGVTZWxlY3RlZChhbWJpZ3VvdXNSb2xlMikpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Rlc2VsZWN0cyByb2xlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zZWxlY3RSb2xlKGFtYmlndW91c1JvbGUxKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1JvbGVTZWxlY3RlZChhbWJpZ3VvdXNSb2xlMSkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLmRlc2VsZWN0Um9sZSgpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzUm9sZVNlbGVjdGVkKGFtYmlndW91c1JvbGUxKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuc2VsZWN0ZWRSb2xlKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU3RlcEhhbmRsZXIgaW50ZXJmYWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdyZXR1cm5zIGEgZGlhbG9nIHRpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3Qoc3RlcEhhbmRsZXIuZ2V0VGl0bGUoKSkudG9FcXVhbCgndWlfcm9sZV9hc3NpZ25tZW50X3NlbGVjdF90aXRsZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZGlzYWJsZXMgc2F2ZSBidXR0b24gaWYgbm90IHJvbGUgc2VsZWN0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zZWxlY3RSb2xlKGFtYmlndW91c1JvbGUyKTtcbiAgICAgICAgICAgIGV4cGVjdChzdGVwSGFuZGxlci5pc1NhdmVEaXNhYmxlZCgpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIHN0ZXBIYW5kbGVyLmRlc2VsZWN0Um9sZSgpO1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmlzU2F2ZURpc2FibGVkKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYSBzYXZlIGJ1dHRvbiBsYWJlbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmdldFNhdmVCdXR0b25MYWJlbCgpKS50b0VxdWFsKCd1aV9idXR0b25fY29udGludWUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgYSB1bmlxdWUgc3RlcCBpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHN0ZXBIYW5kbGVyLmdldFN0ZXBJZCgpKS50b0VxdWFsKCdyb2xlQXNzaWdubWVudFNlbGVjdF8nICsgYWNjZXNzUmVxdWVzdEl0ZW1EYXRhLmlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcmVzb2x2ZWQgcHJvbWlzZSB3aXRoIGFzc2lnbm1lbnRJZCB3aGVuIHNhdmluZyB3aXRoIHNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2U7XG4gICAgICAgICAgICBzdGVwSGFuZGxlci5zZWxlY3RSb2xlKGFtYmlndW91c1JvbGUxKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBzdGVwSGFuZGxlci5zYXZlKCk7XG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZSkudG9FcXVhbChhbWJpZ3VvdXNSb2xlMURhdGEuYXNzaWdubWVudElkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JldHVybnMgcmVqZWN0ZWQgcHJvbWlzZSB3aGVuIHNhdmluZyB3aXRoIG5vIHNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBzdGVwSGFuZGxlci5zYXZlKCksXG4gICAgICAgICAgICAgICAgc3B5ID0gdGVzdFNlcnZpY2Uuc3B5T25GYWlsdXJlKHByb21pc2UpO1xuXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
