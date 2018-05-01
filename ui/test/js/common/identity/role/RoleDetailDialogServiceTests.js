System.register(['test/js/TestInitializer', 'common/identity/role/IdentityRoleModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('RoleDetailDialogService', function () {

                var roleDetailDialogService = undefined,
                    spModal = undefined,
                    role = undefined,
                    $rootScope = undefined,
                    managedAttributeUrlFunc = undefined,
                    managedAttributeUrl = undefined,
                    entitlement = undefined,
                    managedAttributeService = undefined,
                    managedAttributeDialogService = undefined,
                    managedAttribute = undefined;

                beforeEach(module(roleModule));

                beforeEach(inject(function (_roleDetailDialogService_, _spModal_, spTranslateFilter, _$rootScope_, _managedAttributeService_, _managedAttributeDialogService_) {
                    roleDetailDialogService = _roleDetailDialogService_;
                    spModal = _spModal_;
                    $rootScope = _$rootScope_;
                    managedAttributeDialogService = _managedAttributeDialogService_;
                    managedAttributeService = _managedAttributeService_;

                    // Mock the modal so that we can see if the title gets set.
                    var modal = {
                        setTitle: jasmine.createSpy('setTitle')
                    };
                    spyOn(spModal, 'open').and.returnValue(modal);

                    // Configure the message catalog so we can check the title message.
                    spTranslateFilter.configureCatalog({
                        'ui_role_detail_dialog_title': 'ROLE: {0}'
                    });

                    // Create a fake role to test with.
                    role = {
                        displayName: 'fubar'
                    };

                    managedAttributeUrl = 'some/url';
                    managedAttributeUrlFunc = jasmine.createSpy('managedAttributeUrlFunc').and.callFake(function () {
                        return managedAttributeUrl;
                    });
                    entitlement = { managedAttributeId: 'abcd' };
                    managedAttribute = { some: 'thing' };
                    spyOn(managedAttributeDialogService, 'showDialog');
                    spyOn(managedAttributeService, 'getEntitlementDetails').and.returnValue(managedAttribute);
                }));

                describe('show dialog', function () {
                    it('cries for mommy if no role is passed', function () {
                        expect(function () {
                            return roleDetailDialogService.showDialog(null);
                        }).toThrow();
                    });

                    it('opens a dialog for the role', function () {
                        var loadFunc = function () {
                            return 'i love cake';
                        };
                        roleDetailDialogService.showDialog(role, loadFunc, managedAttributeUrlFunc);
                        expect(spModal.open).toHaveBeenCalled();

                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.resolve).toBeDefined();
                        expect(config.resolve.role()).toEqual(role);
                        expect(config.resolve.loadHierarchyFunction()).toEqual(loadFunc);
                    });

                    it('sets the dialog title with the role name', function () {
                        var modal = roleDetailDialogService.showDialog(role, null, managedAttributeUrlFunc);
                        $rootScope.$digest();
                        expect(modal.setTitle).toHaveBeenCalledWith('ROLE: fubar');
                    });
                });

                describe('show hierarchy dialog', function () {
                    it('cries for mommy if no role is passed', function () {
                        expect(function () {
                            return roleDetailDialogService.showHeirarchy(null);
                        }).toThrow();
                    });

                    it('opens a dialog for the role', function () {
                        var loadFunc = function () {
                            return 'i love cake';
                        };
                        roleDetailDialogService.showHeirarchy(role, loadFunc, managedAttributeUrlFunc);
                        expect(spModal.open).toHaveBeenCalled();

                        var config = spModal.open.calls.mostRecent().args[0];
                        expect(config.resolve).toBeDefined();
                        expect(config.resolve.role()).toEqual(role);
                        expect(config.resolve.loadHierarchyFunction()).toEqual(loadFunc);
                    });

                    it('sets the dialog title with the role name', function () {
                        var modal = roleDetailDialogService.showHeirarchy(role, null, managedAttributeUrlFunc);
                        $rootScope.$digest();
                        expect(modal.setTitle).toHaveBeenCalledWith('ROLE: fubar');
                    });
                });

                describe('showEntitlementDetailDialog', function () {
                    it('fetches the managed attribute and opens dialog', function () {
                        roleDetailDialogService.showEntitlementDetailDialog(managedAttributeUrlFunc, entitlement);
                        $rootScope.$apply();
                        expect(managedAttributeUrlFunc).toHaveBeenCalledWith(entitlement.managedAttributeId);
                        expect(managedAttributeService.getEntitlementDetails).toHaveBeenCalledWith(managedAttributeUrl);
                        expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(managedAttribute, managedAttributeUrl);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJDQUEyQyw0Q0FBNEMsVUFBVSxTQUFTO0lBQ2xKOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0YsYUFBYSxzQ0FBc0M7V0FDcEQsVUFBVSxzQ0FBc0M7UUFDbkQsU0FBUyxZQUFZOztZQUo3QixTQUFTLDJCQUEyQixZQUFNOztnQkFFdEMsSUFBSSwwQkFBdUI7b0JBQUUsVUFBTztvQkFBRSxPQUFJO29CQUFFLGFBQVU7b0JBQUUsMEJBQXVCO29CQUFFLHNCQUFtQjtvQkFDaEcsY0FBVztvQkFBRSwwQkFBdUI7b0JBQUUsZ0NBQTZCO29CQUFFLG1CQUFnQjs7Z0JBRXpGLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLDJCQUEyQixXQUFXLG1CQUFtQixjQUN6RCwyQkFBMkIsaUNBQW9DO29CQUM5RSwwQkFBMEI7b0JBQzFCLFVBQVU7b0JBQ1YsYUFBYTtvQkFDYixnQ0FBZ0M7b0JBQ2hDLDBCQUEwQjs7O29CQUcxQixJQUFJLFFBQVE7d0JBQ1IsVUFBVSxRQUFRLFVBQVU7O29CQUVoQyxNQUFNLFNBQVMsUUFBUSxJQUFJLFlBQVk7OztvQkFHdkMsa0JBQWtCLGlCQUFpQjt3QkFDL0IsK0JBQStCOzs7O29CQUluQyxPQUFPO3dCQUNILGFBQWE7OztvQkFHakIsc0JBQXNCO29CQUN0QiwwQkFBMEIsUUFBUSxVQUFVLDJCQUEyQixJQUFJLFNBQVMsWUFBQTt3QkFjcEUsT0FkMEU7O29CQUMxRixjQUFjLEVBQUUsb0JBQW9CO29CQUNwQyxtQkFBbUIsRUFBRSxNQUFNO29CQUMzQixNQUFNLCtCQUErQjtvQkFDckMsTUFBTSx5QkFBeUIseUJBQXlCLElBQUksWUFBWTs7O2dCQUc1RSxTQUFTLGVBQWUsWUFBTTtvQkFDMUIsR0FBRyx3Q0FBd0MsWUFBTTt3QkFDN0MsT0FBTyxZQUFBOzRCQWdCUyxPQWhCSCx3QkFBd0IsV0FBVzsyQkFBTzs7O29CQUczRCxHQUFHLCtCQUErQixZQUFNO3dCQUNwQyxJQUFJLFdBQVcsWUFBQTs0QkFrQkMsT0FsQks7O3dCQUNyQix3QkFBd0IsV0FBVyxNQUFNLFVBQVU7d0JBQ25ELE9BQU8sUUFBUSxNQUFNOzt3QkFFckIsSUFBSSxTQUFTLFFBQVEsS0FBSyxNQUFNLGFBQWEsS0FBSzt3QkFDbEQsT0FBTyxPQUFPLFNBQVM7d0JBQ3ZCLE9BQU8sT0FBTyxRQUFRLFFBQVEsUUFBUTt3QkFDdEMsT0FBTyxPQUFPLFFBQVEseUJBQXlCLFFBQVE7OztvQkFHM0QsR0FBRyw0Q0FBNEMsWUFBTTt3QkFDakQsSUFBSSxRQUFRLHdCQUF3QixXQUFXLE1BQU0sTUFBTTt3QkFDM0QsV0FBVzt3QkFDWCxPQUFPLE1BQU0sVUFBVSxxQkFBcUI7Ozs7Z0JBSXBELFNBQVMseUJBQXlCLFlBQU07b0JBQ3BDLEdBQUcsd0NBQXdDLFlBQU07d0JBQzdDLE9BQU8sWUFBQTs0QkFvQlMsT0FwQkgsd0JBQXdCLGNBQWM7MkJBQU87OztvQkFHOUQsR0FBRywrQkFBK0IsWUFBTTt3QkFDcEMsSUFBSSxXQUFXLFlBQUE7NEJBc0JDLE9BdEJLOzt3QkFDckIsd0JBQXdCLGNBQWMsTUFBTSxVQUFVO3dCQUN0RCxPQUFPLFFBQVEsTUFBTTs7d0JBRXJCLElBQUksU0FBUyxRQUFRLEtBQUssTUFBTSxhQUFhLEtBQUs7d0JBQ2xELE9BQU8sT0FBTyxTQUFTO3dCQUN2QixPQUFPLE9BQU8sUUFBUSxRQUFRLFFBQVE7d0JBQ3RDLE9BQU8sT0FBTyxRQUFRLHlCQUF5QixRQUFROzs7b0JBRzNELEdBQUcsNENBQTRDLFlBQU07d0JBQ2pELElBQUksUUFBUSx3QkFBd0IsY0FBYyxNQUFNLE1BQU07d0JBQzlELFdBQVc7d0JBQ1gsT0FBTyxNQUFNLFVBQVUscUJBQXFCOzs7O2dCQUlwRCxTQUFTLCtCQUErQixZQUFNO29CQUMxQyxHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RCx3QkFBd0IsNEJBQTRCLHlCQUF5Qjt3QkFDN0UsV0FBVzt3QkFDWCxPQUFPLHlCQUF5QixxQkFBcUIsWUFBWTt3QkFDakUsT0FBTyx3QkFBd0IsdUJBQXVCLHFCQUFxQjt3QkFDM0UsT0FBTyw4QkFBOEIsWUFDaEMscUJBQXFCLGtCQUFrQjs7Ozs7O0dBNEJyRCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvcm9sZS9Sb2xlRGV0YWlsRGlhbG9nU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCByb2xlTW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9yb2xlL0lkZW50aXR5Um9sZU1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcclxuXHJcbmRlc2NyaWJlKCdSb2xlRGV0YWlsRGlhbG9nU2VydmljZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgcm9sZURldGFpbERpYWxvZ1NlcnZpY2UsIHNwTW9kYWwsIHJvbGUsICRyb290U2NvcGUsIG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jLCBtYW5hZ2VkQXR0cmlidXRlVXJsLFxyXG4gICAgICAgIGVudGl0bGVtZW50LCBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsIG1hbmFnZWRBdHRyaWJ1dGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocm9sZU1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfcm9sZURldGFpbERpYWxvZ1NlcnZpY2VfLCBfc3BNb2RhbF8sIHNwVHJhbnNsYXRlRmlsdGVyLCBfJHJvb3RTY29wZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXywgX21hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgIHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlID0gX3JvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xyXG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2VfO1xyXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gTW9jayB0aGUgbW9kYWwgc28gdGhhdCB3ZSBjYW4gc2VlIGlmIHRoZSB0aXRsZSBnZXRzIHNldC5cclxuICAgICAgICBsZXQgbW9kYWwgPSB7XHJcbiAgICAgICAgICAgIHNldFRpdGxlOiBqYXNtaW5lLmNyZWF0ZVNweSgnc2V0VGl0bGUnKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQucmV0dXJuVmFsdWUobW9kYWwpO1xyXG5cclxuICAgICAgICAvLyBDb25maWd1cmUgdGhlIG1lc3NhZ2UgY2F0YWxvZyBzbyB3ZSBjYW4gY2hlY2sgdGhlIHRpdGxlIG1lc3NhZ2UuXHJcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XHJcbiAgICAgICAgICAgICd1aV9yb2xlX2RldGFpbF9kaWFsb2dfdGl0bGUnOiAnUk9MRTogezB9J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBmYWtlIHJvbGUgdG8gdGVzdCB3aXRoLlxyXG4gICAgICAgIHJvbGUgPSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnZnViYXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVVybCA9ICdzb21lL3VybCc7XHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMgPSBqYXNtaW5lLmNyZWF0ZVNweSgnbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMnKS5hbmQuY2FsbEZha2UoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZVVybCk7XHJcbiAgICAgICAgZW50aXRsZW1lbnQgPSB7IG1hbmFnZWRBdHRyaWJ1dGVJZDogJ2FiY2QnIH07XHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZSA9IHsgc29tZTogJ3RoaW5nJyB9O1xyXG4gICAgICAgIHNweU9uKG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLCAnc2hvd0RpYWxvZycpO1xyXG4gICAgICAgIHNweU9uKG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnREZXRhaWxzJykuYW5kLnJldHVyblZhbHVlKG1hbmFnZWRBdHRyaWJ1dGUpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93IGRpYWxvZycsICgpID0+IHtcclxuICAgICAgICBpdCgnY3JpZXMgZm9yIG1vbW15IGlmIG5vIHJvbGUgaXMgcGFzc2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gcm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZyhudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnb3BlbnMgYSBkaWFsb2cgZm9yIHRoZSByb2xlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9hZEZ1bmMgPSAoKSA9PiAnaSBsb3ZlIGNha2UnO1xyXG4gICAgICAgICAgICByb2xlRGV0YWlsRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKHJvbGUsIGxvYWRGdW5jLCBtYW5hZ2VkQXR0cmlidXRlVXJsRnVuYyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChzcE1vZGFsLm9wZW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjb25maWcgPSBzcE1vZGFsLm9wZW4uY2FsbHMubW9zdFJlY2VudCgpLmFyZ3NbMF07XHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucmVzb2x2ZSkudG9CZURlZmluZWQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlLnJvbGUoKSkudG9FcXVhbChyb2xlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNvbmZpZy5yZXNvbHZlLmxvYWRIaWVyYXJjaHlGdW5jdGlvbigpKS50b0VxdWFsKGxvYWRGdW5jKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIGRpYWxvZyB0aXRsZSB3aXRoIHRoZSByb2xlIG5hbWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtb2RhbCA9IHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cocm9sZSwgbnVsbCwgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMpO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1vZGFsLnNldFRpdGxlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnUk9MRTogZnViYXInKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzaG93IGhpZXJhcmNoeSBkaWFsb2cnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2NyaWVzIGZvciBtb21teSBpZiBubyByb2xlIGlzIHBhc3NlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLnNob3dIZWlyYXJjaHkobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ29wZW5zIGEgZGlhbG9nIGZvciB0aGUgcm9sZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGxvYWRGdW5jID0gKCkgPT4gJ2kgbG92ZSBjYWtlJztcclxuICAgICAgICAgICAgcm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0hlaXJhcmNoeShyb2xlLCBsb2FkRnVuYywgbWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMpO1xyXG4gICAgICAgICAgICBleHBlY3Qoc3BNb2RhbC5vcGVuKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gc3BNb2RhbC5vcGVuLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzBdO1xyXG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLnJlc29sdmUpLnRvQmVEZWZpbmVkKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucmVzb2x2ZS5yb2xlKCkpLnRvRXF1YWwocm9sZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb25maWcucmVzb2x2ZS5sb2FkSGllcmFyY2h5RnVuY3Rpb24oKSkudG9FcXVhbChsb2FkRnVuYyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSBkaWFsb2cgdGl0bGUgd2l0aCB0aGUgcm9sZSBuYW1lJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9kYWwgPSByb2xlRGV0YWlsRGlhbG9nU2VydmljZS5zaG93SGVpcmFyY2h5KHJvbGUsIG51bGwsIG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jKTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtb2RhbC5zZXRUaXRsZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ1JPTEU6IGZ1YmFyJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd0VudGl0bGVtZW50RGV0YWlsRGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCdmZXRjaGVzIHRoZSBtYW5hZ2VkIGF0dHJpYnV0ZSBhbmQgb3BlbnMgZGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICByb2xlRGV0YWlsRGlhbG9nU2VydmljZS5zaG93RW50aXRsZW1lbnREZXRhaWxEaWFsb2cobWFuYWdlZEF0dHJpYnV0ZVVybEZ1bmMsIGVudGl0bGVtZW50KTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVVcmxGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnRpdGxlbWVudC5tYW5hZ2VkQXR0cmlidXRlSWQpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtYW5hZ2VkQXR0cmlidXRlVXJsKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLnNob3dEaWFsb2cpXHJcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgobWFuYWdlZEF0dHJpYnV0ZSwgbWFuYWdlZEF0dHJpYnV0ZVVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
