System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityAccessRoleNameColumnDirective', function () {

                var $compile = undefined,
                    element = undefined,
                    $scope = undefined,
                    quickLinkName = undefined,
                    $stateParams = undefined,
                    identityAccessService = undefined,
                    roleDetailDialogService = undefined,
                    role = undefined,
                    colConfig = undefined,
                    roleName = undefined;

                beforeEach(module(identityModule));

                beforeEach(inject(function (_$compile_, _$stateParams_, $rootScope, identityService, _identityAccessService_, _roleDetailDialogService_) {
                    $compile = _$compile_;
                    $stateParams = _$stateParams_;
                    $scope = $rootScope;
                    identityAccessService = _identityAccessService_;
                    roleDetailDialogService = _roleDetailDialogService_;

                    // Mock the identity service to return our configured quick link name.
                    quickLinkName = 'view dat identity!';
                    spyOn(identityService, 'getQuickLinkNameByAction').and.callFake(function () {
                        return quickLinkName;
                    });

                    // Setup an identity ID in the state params.
                    $stateParams.identityId = '1234';

                    // Setup some fake data for our renderer.
                    roleName = 'view dat role!';
                    role = { id: 'i am role ... hear me roar!' };
                    colConfig = {
                        getObjectValue: jasmine.createSpy('getObjectValue').and.returnValue(roleName)
                    };
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    var eltDef = '<sp-identity-access-role-name-column sp-model="role" sp-column-config="colConfig" />';

                    $scope.role = role;
                    $scope.colConfig = colConfig;

                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                it('sobs with the crushing blow of no identityId in the stateParams', function () {
                    $stateParams.identityId = undefined;
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                it('wails when met with no quick link', function () {
                    quickLinkName = null;
                    expect(function () {
                        return compile();
                    }).toThrow();
                });

                function getLink() {
                    var link = element.find('a');
                    expect(link.length).toEqual(1);
                    return link;
                }

                it('renders the role display name in a hyperlink', function () {
                    var roleNameWithSR = 'view dat role!  ui_identity_role_details_sr';
                    compile();
                    var link = getLink();
                    expect(link.text().trim().replace(/(\r\n|\n|\r)/gm, '')).toEqual(roleNameWithSR);
                });

                it('loads the role and calls the roleDetailDialogService when the role name is clicked', function () {
                    // Mock out the call to the load the role, and spy on the role detail dialog.
                    var fakePromise = { i: 'am a promise' };
                    spyOn(identityAccessService, 'getRoleDetails').and.returnValue(fakePromise);
                    spyOn(roleDetailDialogService, 'showDialog');
                    spyOn(identityAccessService, 'getRoleEntitlementDetailsUrl');

                    // Compile the element and click the link.
                    compile();
                    var link = getLink();
                    link.click();

                    // Verify that the role was loaded and the dialog service was called.
                    expect(identityAccessService.getRoleDetails).toHaveBeenCalledWith(quickLinkName, $stateParams.identityId, role.id);
                    expect(roleDetailDialogService.showDialog).toHaveBeenCalled();
                    var args = roleDetailDialogService.showDialog.calls.mostRecent().args;
                    expect(args.length).toEqual(3);
                    expect(args[0]).toEqual(fakePromise);
                    var urlFunc = args[2];
                    expect(angular.isFunction(urlFunc)).toEqual(true);
                    urlFunc('ma1');
                    expect(identityAccessService.getRoleEntitlementDetailsUrl).toHaveBeenCalledWith(quickLinkName, $stateParams.identityId, role.id, 'ma1');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzUm9sZU5hbWVDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUztJQUN2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5Q0FBeUMsWUFBTTs7Z0JBRXBELElBQUksV0FBUTtvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsZ0JBQWE7b0JBQUUsZUFBWTtvQkFBRSx3QkFBcUI7b0JBQUUsMEJBQXVCO29CQUN0RyxPQUFJO29CQUFFLFlBQVM7b0JBQUUsV0FBUTs7Z0JBRTdCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFlBQVksZ0JBQWdCLFlBQVksaUJBQWlCLHlCQUN6RCwyQkFBOEI7b0JBQzdDLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixTQUFTO29CQUNULHdCQUF3QjtvQkFDeEIsMEJBQTBCOzs7b0JBRzFCLGdCQUFnQjtvQkFDaEIsTUFBTSxpQkFBaUIsNEJBQTRCLElBQUksU0FBUyxZQUFBO3dCQWVoRCxPQWZzRDs7OztvQkFHdEUsYUFBYSxhQUFhOzs7b0JBRzFCLFdBQVc7b0JBQ1gsT0FBTyxFQUFFLElBQUk7b0JBQ2IsWUFBWTt3QkFDUixnQkFBZ0IsUUFBUSxVQUFVLGtCQUFrQixJQUFJLFlBQVk7Ozs7Z0JBSTVFLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxVQUFVO29CQUNmLElBQUksU0FBTTs7b0JBRVYsT0FBTyxPQUFPO29CQUNkLE9BQU8sWUFBWTs7b0JBRW5CLFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87O29CQUVQLE9BQU87OztnQkFHWCxHQUFHLG1FQUFtRSxZQUFNO29CQUN4RSxhQUFhLGFBQWE7b0JBQzFCLE9BQU8sWUFBQTt3QkFpQlMsT0FqQkg7dUJBQVc7OztnQkFHNUIsR0FBRyxxQ0FBcUMsWUFBTTtvQkFDMUMsZ0JBQWdCO29CQUNoQixPQUFPLFlBQUE7d0JBbUJTLE9BbkJIO3VCQUFXOzs7Z0JBRzVCLFNBQVMsVUFBVTtvQkFDZixJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixPQUFPOzs7Z0JBR1gsR0FBRyxnREFBZ0QsWUFBTTtvQkFDckQsSUFBSSxpQkFBaUI7b0JBQ3JCO29CQUNBLElBQUksT0FBTztvQkFDWCxPQUFPLEtBQUssT0FBTyxPQUFPLFFBQVEsa0JBQWtCLEtBQUssUUFBUTs7O2dCQUdyRSxHQUFHLHNGQUFzRixZQUFNOztvQkFFM0YsSUFBSSxjQUFjLEVBQUUsR0FBRztvQkFDdkIsTUFBTSx1QkFBdUIsa0JBQWtCLElBQUksWUFBWTtvQkFDL0QsTUFBTSx5QkFBeUI7b0JBQy9CLE1BQU0sdUJBQXVCOzs7b0JBSTdCO29CQUNBLElBQUksT0FBTztvQkFDWCxLQUFLOzs7b0JBR0wsT0FBTyxzQkFBc0IsZ0JBQ3pCLHFCQUFxQixlQUFlLGFBQWEsWUFBWSxLQUFLO29CQUN0RSxPQUFPLHdCQUF3QixZQUFZO29CQUMzQyxJQUFJLE9BQU8sd0JBQXdCLFdBQVcsTUFBTSxhQUFhO29CQUNqRSxPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixPQUFPLEtBQUssSUFBSSxRQUFRO29CQUN4QixJQUFJLFVBQVUsS0FBSztvQkFDbkIsT0FBTyxRQUFRLFdBQVcsVUFBVSxRQUFRO29CQUM1QyxRQUFRO29CQUNSLE9BQU8sc0JBQXNCLDhCQUN4QixxQkFBcUIsZUFBZSxhQUFhLFlBQVksS0FBSyxJQUFJOzs7OztHQXNCaEYiLCJmaWxlIjoiaWRlbnRpdHkvSWRlbnRpdHlBY2Nlc3NSb2xlTmFtZUNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlBY2Nlc3NSb2xlTmFtZUNvbHVtbkRpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgJGNvbXBpbGUsIGVsZW1lbnQsICRzY29wZSwgcXVpY2tMaW5rTmFtZSwgJHN0YXRlUGFyYW1zLCBpZGVudGl0eUFjY2Vzc1NlcnZpY2UsIHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHJvbGUsIGNvbENvbmZpZywgcm9sZU5hbWU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgXyRzdGF0ZVBhcmFtc18sICRyb290U2NvcGUsIGlkZW50aXR5U2VydmljZSwgX2lkZW50aXR5QWNjZXNzU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX3JvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkc3RhdGVQYXJhbXMgPSBfJHN0YXRlUGFyYW1zXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZSA9IF9pZGVudGl0eUFjY2Vzc1NlcnZpY2VfO1xyXG4gICAgICAgIHJvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlID0gX3JvbGVEZXRhaWxEaWFsb2dTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgLy8gTW9jayB0aGUgaWRlbnRpdHkgc2VydmljZSB0byByZXR1cm4gb3VyIGNvbmZpZ3VyZWQgcXVpY2sgbGluayBuYW1lLlxyXG4gICAgICAgIHF1aWNrTGlua05hbWUgPSAndmlldyBkYXQgaWRlbnRpdHkhJztcclxuICAgICAgICBzcHlPbihpZGVudGl0eVNlcnZpY2UsICdnZXRRdWlja0xpbmtOYW1lQnlBY3Rpb24nKS5hbmQuY2FsbEZha2UoKCkgPT4gcXVpY2tMaW5rTmFtZSk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGFuIGlkZW50aXR5IElEIGluIHRoZSBzdGF0ZSBwYXJhbXMuXHJcbiAgICAgICAgJHN0YXRlUGFyYW1zLmlkZW50aXR5SWQgPSAnMTIzNCc7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIHNvbWUgZmFrZSBkYXRhIGZvciBvdXIgcmVuZGVyZXIuXHJcbiAgICAgICAgcm9sZU5hbWUgPSAndmlldyBkYXQgcm9sZSEnO1xyXG4gICAgICAgIHJvbGUgPSB7IGlkOiAnaSBhbSByb2xlIC4uLiBoZWFyIG1lIHJvYXIhJyB9O1xyXG4gICAgICAgIGNvbENvbmZpZyA9IHtcclxuICAgICAgICAgICAgZ2V0T2JqZWN0VmFsdWU6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRPYmplY3RWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZShyb2xlTmFtZSlcclxuICAgICAgICB9O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xyXG4gICAgICAgIGxldCBlbHREZWYgPSBgPHNwLWlkZW50aXR5LWFjY2Vzcy1yb2xlLW5hbWUtY29sdW1uIHNwLW1vZGVsPVwicm9sZVwiIHNwLWNvbHVtbi1jb25maWc9XCJjb2xDb25maWdcIiAvPmA7XHJcblxyXG4gICAgICAgICRzY29wZS5yb2xlID0gcm9sZTtcclxuICAgICAgICAkc2NvcGUuY29sQ29uZmlnID0gY29sQ29uZmlnO1xyXG5cclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc29icyB3aXRoIHRoZSBjcnVzaGluZyBibG93IG9mIG5vIGlkZW50aXR5SWQgaW4gdGhlIHN0YXRlUGFyYW1zJywgKCkgPT4ge1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKCkpLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd3YWlscyB3aGVuIG1ldCB3aXRoIG5vIHF1aWNrIGxpbmsnLCAoKSA9PiB7XHJcbiAgICAgICAgcXVpY2tMaW5rTmFtZSA9IG51bGw7XHJcbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBpbGUoKSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TGluaygpIHtcclxuICAgICAgICBsZXQgbGluayA9IGVsZW1lbnQuZmluZCgnYScpO1xyXG4gICAgICAgIGV4cGVjdChsaW5rLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICByZXR1cm4gbGluaztcclxuICAgIH1cclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgcm9sZSBkaXNwbGF5IG5hbWUgaW4gYSBoeXBlcmxpbmsnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHJvbGVOYW1lV2l0aFNSID0gJ3ZpZXcgZGF0IHJvbGUhICB1aV9pZGVudGl0eV9yb2xlX2RldGFpbHNfc3InO1xyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBsZXQgbGluayA9IGdldExpbmsoKTtcclxuICAgICAgICBleHBlY3QobGluay50ZXh0KCkudHJpbSgpLnJlcGxhY2UoLyhcXHJcXG58XFxufFxccikvZ20sICcnKSkudG9FcXVhbChyb2xlTmFtZVdpdGhTUik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnbG9hZHMgdGhlIHJvbGUgYW5kIGNhbGxzIHRoZSByb2xlRGV0YWlsRGlhbG9nU2VydmljZSB3aGVuIHRoZSByb2xlIG5hbWUgaXMgY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICAvLyBNb2NrIG91dCB0aGUgY2FsbCB0byB0aGUgbG9hZCB0aGUgcm9sZSwgYW5kIHNweSBvbiB0aGUgcm9sZSBkZXRhaWwgZGlhbG9nLlxyXG4gICAgICAgIGxldCBmYWtlUHJvbWlzZSA9IHsgaTogJ2FtIGEgcHJvbWlzZScgfTtcclxuICAgICAgICBzcHlPbihpZGVudGl0eUFjY2Vzc1NlcnZpY2UsICdnZXRSb2xlRGV0YWlscycpLmFuZC5yZXR1cm5WYWx1ZShmYWtlUHJvbWlzZSk7XHJcbiAgICAgICAgc3B5T24ocm9sZURldGFpbERpYWxvZ1NlcnZpY2UsICdzaG93RGlhbG9nJyk7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0Um9sZUVudGl0bGVtZW50RGV0YWlsc1VybCcpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gQ29tcGlsZSB0aGUgZWxlbWVudCBhbmQgY2xpY2sgdGhlIGxpbmsuXHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGxldCBsaW5rID0gZ2V0TGluaygpO1xyXG4gICAgICAgIGxpbmsuY2xpY2soKTtcclxuXHJcbiAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlIHJvbGUgd2FzIGxvYWRlZCBhbmQgdGhlIGRpYWxvZyBzZXJ2aWNlIHdhcyBjYWxsZWQuXHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRSb2xlRGV0YWlscykuXHJcbiAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGlua05hbWUsICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkLCByb2xlLmlkKTtcclxuICAgICAgICBleHBlY3Qocm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGxldCBhcmdzID0gcm9sZURldGFpbERpYWxvZ1NlcnZpY2Uuc2hvd0RpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJncztcclxuICAgICAgICBleHBlY3QoYXJncy5sZW5ndGgpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgZXhwZWN0KGFyZ3NbMF0pLnRvRXF1YWwoZmFrZVByb21pc2UpO1xyXG4gICAgICAgIGxldCB1cmxGdW5jID0gYXJnc1syXTtcclxuICAgICAgICBleHBlY3QoYW5ndWxhci5pc0Z1bmN0aW9uKHVybEZ1bmMpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIHVybEZ1bmMoJ21hMScpO1xyXG4gICAgICAgIGV4cGVjdChpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0Um9sZUVudGl0bGVtZW50RGV0YWlsc1VybClcclxuICAgICAgICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHF1aWNrTGlua05hbWUsICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkLCByb2xlLmlkLCAnbWExJyk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
