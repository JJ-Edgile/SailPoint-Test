System.register(['test/js/TestInitializer', 'test/js/common/i18n/MockTranslateFilter', 'common/identity/role/IdentityRoleModule', 'test/js/common/identity/role/RoleDetailTestData'], function (_export) {
    'use strict';

    var roleModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsCommonI18nMockTranslateFilter) {}, function (_commonIdentityRoleIdentityRoleModule) {
            roleModule = _commonIdentityRoleIdentityRoleModule['default'];
        }, function (_testJsCommonIdentityRoleRoleDetailTestData) {}],
        execute: function () {

            describe('RoleDetailPanelDirective', function () {

                var eltDef = '<sp-role-detail-panel sp-role="role" sp-show-role-in-header="showRoleInHeader" />';

                var RoleDetail = undefined,
                    roleDetailTestData = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    role = undefined;

                beforeEach(module(roleModule));

                beforeEach(inject(function (_$compile_, $rootScope, _RoleDetail_, spTranslateFilter, _roleDetailTestData_) {
                    $compile = _$compile_;
                    RoleDetail = _RoleDetail_;
                    roleDetailTestData = _roleDetailTestData_;
                    $scope = $rootScope.$new();

                    spTranslateFilter.configureCatalog({
                        'ui_role_details_details_header': 'Role Details',
                        'ui_role_details_details_name': 'Name',
                        'ui_role_details_details_type': 'Type',
                        'ui_role_details_details_owner': 'Owner',
                        'ui_role_details_details_description': 'Description',
                        'ui_role_details_details_acquired': 'Acquired',
                        'ui_role_details_details_permitted_by': 'Permitted By',
                        'ui_role_details_details_assignment_note': 'Assignment Note',
                        'ui_role_assigned': 'Assigned'
                    });

                    role = new RoleDetail(roleDetailTestData.ROLE1);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(hideHeader, showRoleInHeader) {
                    var elt = arguments.length <= 2 || arguments[2] === undefined ? eltDef : arguments[2];

                    element = angular.element(elt);
                    $scope.role = role;
                    $scope.hideHeader = hideHeader;
                    $scope.showRoleInHeader = showRoleInHeader;
                    $compile(element)($scope);
                    $scope.$digest();
                    return element;
                }

                function testValue(labelText, expectedValue, showRoleInHeader) {
                    createElement(false, showRoleInHeader);
                    var label = element.find('b:contains(\'' + labelText + '\')');
                    expect(label.length).toEqual(1);
                    expect(label.parent().text().trim().endsWith(expectedValue)).toEqual(true);
                }

                function hasValue(labelText) {
                    var label = element.find('b:contains(\'' + labelText + '\')');
                    return label.length > 0;
                }

                describe('name', function () {
                    it('is displayed if not showing the role in the header', function () {
                        testValue('Name', role.displayName);
                    });

                    it('is not displayed if showing the role in the header', function () {
                        createElement(false, true);
                        expect(hasValue('Name')).toEqual(false);
                    });
                });

                it('displays the type', function () {
                    testValue('Type', role.type);
                });

                it('displays the owner display name', function () {
                    testValue('Owner', role.owner.name);
                });

                it('displays the description', function () {
                    testValue('Description', role.description);
                });

                it('displays how the role was acquired', function () {
                    testValue('Acquired', 'Assigned');
                });

                describe('permitted by', function () {
                    it('is displayed if available', function () {
                        testValue('Permitted By', role.permittedBy);
                    });

                    it('is hidden if not available', function () {
                        role.permittedBy = null;
                        createElement();
                        expect(hasValue('Permitted By')).toEqual(false);
                    });
                });

                describe('assignment note', function () {
                    it('is displayed if available', function () {
                        testValue('Assignment Note', role.assignmentNote);
                    });

                    it('is hidden if not available', function () {
                        role.assignmentNote = null;
                        createElement();
                        expect(hasValue('Assignment Note')).toEqual(false);
                    });
                });

                describe('header', function () {

                    var headerElt = '<sp-role-detail-panel sp-role="role"\n                                   sp-hide-header="hideHeader"\n                                   sp-show-role-in-header="showRoleInHeader" />';

                    function hasHeader() {
                        var header = element.find('h3.entitlement-panel-header');
                        return header.length > 0;
                    }

                    function getHeaderText() {
                        var header = element.find('h3.entitlement-panel-header');
                        return header.text().trim();
                    }

                    it('is shown if sp-hide-header is not specified', function () {
                        createElement();
                        expect(hasHeader()).toEqual(true);
                    });

                    it('is shown if sp-hide-header is false', function () {
                        createElement(false, false, headerElt);
                        expect(hasHeader()).toEqual(true);
                    });

                    it('is hidden if sp-hide-header is true', function () {
                        createElement(true, false, headerElt);
                        expect(hasHeader()).toEqual(false);
                    });

                    it('shows "Role Details" if sp-show-role-in-header is false', function () {
                        createElement(false, false, headerElt);
                        expect(getHeaderText()).toEqual('Role Details');
                    });

                    it('shows the role name if sp-show-role-in-header is true', function () {
                        createElement(false, true, headerElt);
                        expect(getHeaderText()).toEqual(role.displayName);
                    });
                });

                describe('contributing entitlements', function () {

                    it('are not shown if there are none', function () {
                        role.contributingEntitlements = null;
                        createElement(false, false);
                    });

                    function getEntitlementsTables() {
                        return element.find('.entitlements-table');
                    }

                    function setupContributingEntitlements(idx, app, acct, instance) {
                        expect(role.contributingEntitlements.length).toEqual(2);
                        role.contributingEntitlements[idx].application = app;
                        role.contributingEntitlements[idx].nativeIdentity = acct;
                        role.contributingEntitlements[idx].instance = instance;
                    }

                    it('have a table per account on the same app', function () {
                        setupContributingEntitlements(0, 'app', 'acct1', undefined);
                        setupContributingEntitlements(1, 'app', 'acct2', undefined);
                        createElement(false, false);
                        expect(getEntitlementsTables().length).toEqual(2);
                    });

                    it('have a table per instance on the same app', function () {
                        setupContributingEntitlements(0, 'app', 'acct1', 'instance1');
                        setupContributingEntitlements(1, 'app', 'acct1', 'instance2');
                        createElement(false, false);
                        expect(getEntitlementsTables().length).toEqual(2);
                    });

                    it('have a table per app', function () {
                        setupContributingEntitlements(0, 'app1', 'acct1', undefined);
                        setupContributingEntitlements(1, 'app2', 'acct1', undefined);
                        createElement(false, false);
                        expect(getEntitlementsTables().length).toEqual(2);
                    });

                    it('are re-rendered if role changes', function () {
                        // Check that we start with 2 contributing entitlements tables.
                        createElement(false, false);
                        expect(getEntitlementsTables().length).toEqual(2);

                        // Set a new role with only one contributing entitlement.
                        var newRole = new RoleDetail(roleDetailTestData.ROLE1);
                        newRole.contributingEntitlements.length = 1;
                        $scope.role = newRole;
                        $scope.$digest();

                        // Should only have a single table now.
                        expect(getEntitlementsTables().length).toEqual(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9yb2xlL1JvbGVEZXRhaWxQYW5lbERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMsMkNBQTJDLG9EQUFvRCxVQUFVLFNBQVM7SUFDck07O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNDQUFzQyxJQUFJLFVBQVUsdUNBQXVDO1lBQ2pKLGFBQWEsc0NBQXNDO1dBQ3BELFVBQVUsNkNBQTZDO1FBQzFELFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw0QkFBNEIsWUFBTTs7Z0JBRXZDLElBQUksU0FBUzs7Z0JBRWIsSUFBSSxhQUFVO29CQUFFLHFCQUFrQjtvQkFBRSxXQUFRO29CQUFFLFNBQU07b0JBQUUsVUFBTztvQkFBRSxPQUFJOztnQkFFbkUsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLGNBQWMsbUJBQW1CLHNCQUF5QjtvQkFDakcsV0FBVztvQkFDWCxhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsU0FBUyxXQUFXOztvQkFFcEIsa0JBQWtCLGlCQUFpQjt3QkFDL0Isa0NBQWtDO3dCQUNsQyxnQ0FBZ0M7d0JBQ2hDLGdDQUFnQzt3QkFDaEMsaUNBQWlDO3dCQUNqQyx1Q0FBdUM7d0JBQ3ZDLG9DQUFvQzt3QkFDcEMsd0NBQXdDO3dCQUN4QywyQ0FBMkM7d0JBQzNDLG9CQUFvQjs7O29CQUd4QixPQUFPLElBQUksV0FBVyxtQkFBbUI7OztnQkFHN0MsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLGNBQWMsWUFBWSxrQkFBZ0M7b0JBV25ELElBWHFDLE1BQUcsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsU0FBTSxVQUFBOztvQkFDN0QsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLE9BQU8sT0FBTztvQkFD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LFlBQU07d0JBQ2pELDhCQUE4QixHQUFHLE9BQU8sU0FBUzt3QkFDakQsOEJBQThCLEdBQUcsT0FBTyxTQUFTO3dCQUNqRCxjQUFjLE9BQU87d0JBQ3JCLE9BQU8sd0JBQXdCLFFBQVEsUUFBUTs7O29CQUduRCxHQUFHLDZDQUE2QyxZQUFNO3dCQUNsRCw4QkFBOEIsR0FBRyxPQUFPLFNBQVM7d0JBQ2pELDhCQUE4QixHQUFHLE9BQU8sU0FBUzt3QkFDakQsY0FBYyxPQUFPO3dCQUNyQixPQUFPLHdCQUF3QixRQUFRLFFBQVE7OztvQkFHbkQsR0FBRyx3QkFBd0IsWUFBTTt3QkFDN0IsOEJBQThCLEdBQUcsUUFBUSxTQUFTO3dCQUNsRCw4QkFBOEIsR0FBRyxRQUFRLFNBQVM7d0JBQ2xELGNBQWMsT0FBTzt3QkFDckIsT0FBTyx3QkFBd0IsUUFBUSxRQUFROzs7b0JBR25ELEdBQUcsbUNBQW1DLFlBQU07O3dCQUV4QyxjQUFjLE9BQU87d0JBQ3JCLE9BQU8sd0JBQXdCLFFBQVEsUUFBUTs7O3dCQUcvQyxJQUFJLFVBQVUsSUFBSSxXQUFXLG1CQUFtQjt3QkFDaEQsUUFBUSx5QkFBeUIsU0FBUzt3QkFDMUMsT0FBTyxPQUFPO3dCQUNkLE9BQU87Ozt3QkFHUCxPQUFPLHdCQUF3QixRQUFRLFFBQVE7Ozs7OztHQWV4RCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvcm9sZS9Sb2xlRGV0YWlsUGFuZWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XHJcbmltcG9ydCByb2xlTW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9yb2xlL0lkZW50aXR5Um9sZU1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaWRlbnRpdHkvcm9sZS9Sb2xlRGV0YWlsVGVzdERhdGEnO1xyXG5cclxuZGVzY3JpYmUoJ1JvbGVEZXRhaWxQYW5lbERpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgZWx0RGVmID0gJzxzcC1yb2xlLWRldGFpbC1wYW5lbCBzcC1yb2xlPVwicm9sZVwiIHNwLXNob3ctcm9sZS1pbi1oZWFkZXI9XCJzaG93Um9sZUluSGVhZGVyXCIgLz4nO1xyXG5cclxuICAgIGxldCBSb2xlRGV0YWlsLCByb2xlRGV0YWlsVGVzdERhdGEsICRjb21waWxlLCAkc2NvcGUsIGVsZW1lbnQsIHJvbGU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUocm9sZU1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbXBpbGVfLCAkcm9vdFNjb3BlLCBfUm9sZURldGFpbF8sIHNwVHJhbnNsYXRlRmlsdGVyLCBfcm9sZURldGFpbFRlc3REYXRhXykgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICBSb2xlRGV0YWlsID0gX1JvbGVEZXRhaWxfO1xyXG4gICAgICAgIHJvbGVEZXRhaWxUZXN0RGF0YSA9IF9yb2xlRGV0YWlsVGVzdERhdGFfO1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcclxuICAgICAgICAgICAgJ3VpX3JvbGVfZGV0YWlsc19kZXRhaWxzX2hlYWRlcic6ICdSb2xlIERldGFpbHMnLFxyXG4gICAgICAgICAgICAndWlfcm9sZV9kZXRhaWxzX2RldGFpbHNfbmFtZSc6ICdOYW1lJyxcclxuICAgICAgICAgICAgJ3VpX3JvbGVfZGV0YWlsc19kZXRhaWxzX3R5cGUnOiAnVHlwZScsXHJcbiAgICAgICAgICAgICd1aV9yb2xlX2RldGFpbHNfZGV0YWlsc19vd25lcic6ICdPd25lcicsXHJcbiAgICAgICAgICAgICd1aV9yb2xlX2RldGFpbHNfZGV0YWlsc19kZXNjcmlwdGlvbic6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICd1aV9yb2xlX2RldGFpbHNfZGV0YWlsc19hY3F1aXJlZCc6ICdBY3F1aXJlZCcsXHJcbiAgICAgICAgICAgICd1aV9yb2xlX2RldGFpbHNfZGV0YWlsc19wZXJtaXR0ZWRfYnknOiAnUGVybWl0dGVkIEJ5JyxcclxuICAgICAgICAgICAgJ3VpX3JvbGVfZGV0YWlsc19kZXRhaWxzX2Fzc2lnbm1lbnRfbm90ZSc6ICdBc3NpZ25tZW50IE5vdGUnLFxyXG4gICAgICAgICAgICAndWlfcm9sZV9hc3NpZ25lZCc6ICdBc3NpZ25lZCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm9sZSA9IG5ldyBSb2xlRGV0YWlsKHJvbGVEZXRhaWxUZXN0RGF0YS5ST0xFMSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaGlkZUhlYWRlciwgc2hvd1JvbGVJbkhlYWRlciwgZWx0ID0gZWx0RGVmKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHQpO1xyXG4gICAgICAgICRzY29wZS5yb2xlID0gcm9sZTtcclxuICAgICAgICAkc2NvcGUuaGlkZUhlYWRlciA9IGhpZGVIZWFkZXI7XHJcbiAgICAgICAgJHNjb3BlLnNob3dSb2xlSW5IZWFkZXIgPSBzaG93Um9sZUluSGVhZGVyO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0ZXN0VmFsdWUobGFiZWxUZXh0LCBleHBlY3RlZFZhbHVlLCBzaG93Um9sZUluSGVhZGVyKSB7XHJcbiAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgc2hvd1JvbGVJbkhlYWRlcik7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gZWxlbWVudC5maW5kKGBiOmNvbnRhaW5zKCcke2xhYmVsVGV4dH0nKWApO1xyXG4gICAgICAgIGV4cGVjdChsYWJlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgZXhwZWN0KGxhYmVsLnBhcmVudCgpLnRleHQoKS50cmltKCkuZW5kc1dpdGgoZXhwZWN0ZWRWYWx1ZSkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzVmFsdWUobGFiZWxUZXh0KSB7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gZWxlbWVudC5maW5kKGBiOmNvbnRhaW5zKCcke2xhYmVsVGV4dH0nKWApO1xyXG4gICAgICAgIHJldHVybiAobGFiZWwubGVuZ3RoID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzY3JpYmUoJ25hbWUnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2lzIGRpc3BsYXllZCBpZiBub3Qgc2hvd2luZyB0aGUgcm9sZSBpbiB0aGUgaGVhZGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0ZXN0VmFsdWUoJ05hbWUnLCByb2xlLmRpc3BsYXlOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIG5vdCBkaXNwbGF5ZWQgaWYgc2hvd2luZyB0aGUgcm9sZSBpbiB0aGUgaGVhZGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc1ZhbHVlKCdOYW1lJykpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Rpc3BsYXlzIHRoZSB0eXBlJywgKCkgPT4ge1xyXG4gICAgICAgIHRlc3RWYWx1ZSgnVHlwZScsIHJvbGUudHlwZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZGlzcGxheXMgdGhlIG93bmVyIGRpc3BsYXkgbmFtZScsICgpID0+IHtcclxuICAgICAgICB0ZXN0VmFsdWUoJ093bmVyJywgcm9sZS5vd25lci5uYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkaXNwbGF5cyB0aGUgZGVzY3JpcHRpb24nLCAoKSA9PiB7XHJcbiAgICAgICAgdGVzdFZhbHVlKCdEZXNjcmlwdGlvbicsIHJvbGUuZGVzY3JpcHRpb24pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2Rpc3BsYXlzIGhvdyB0aGUgcm9sZSB3YXMgYWNxdWlyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgdGVzdFZhbHVlKCdBY3F1aXJlZCcsICdBc3NpZ25lZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Blcm1pdHRlZCBieScsICgpID0+IHtcclxuICAgICAgICBpdCgnaXMgZGlzcGxheWVkIGlmIGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdFZhbHVlKCdQZXJtaXR0ZWQgQnknLCByb2xlLnBlcm1pdHRlZEJ5KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGhpZGRlbiBpZiBub3QgYXZhaWxhYmxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICByb2xlLnBlcm1pdHRlZEJ5ID0gbnVsbDtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFzVmFsdWUoJ1Blcm1pdHRlZCBCeScpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdhc3NpZ25tZW50IG5vdGUnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2lzIGRpc3BsYXllZCBpZiBhdmFpbGFibGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RWYWx1ZSgnQXNzaWdubWVudCBOb3RlJywgcm9sZS5hc3NpZ25tZW50Tm90ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBoaWRkZW4gaWYgbm90IGF2YWlsYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgcm9sZS5hc3NpZ25tZW50Tm90ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc1ZhbHVlKCdBc3NpZ25tZW50IE5vdGUnKSkudG9FcXVhbChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaGVhZGVyJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgaGVhZGVyRWx0ID1cclxuICAgICAgICAgICAgYDxzcC1yb2xlLWRldGFpbC1wYW5lbCBzcC1yb2xlPVwicm9sZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtaGlkZS1oZWFkZXI9XCJoaWRlSGVhZGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1zaG93LXJvbGUtaW4taGVhZGVyPVwic2hvd1JvbGVJbkhlYWRlclwiIC8+YDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFzSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gZWxlbWVudC5maW5kKCdoMy5lbnRpdGxlbWVudC1wYW5lbC1oZWFkZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIChoZWFkZXIubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRIZWFkZXJUZXh0KCkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGVyID0gZWxlbWVudC5maW5kKCdoMy5lbnRpdGxlbWVudC1wYW5lbC1oZWFkZXInKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlci50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lzIHNob3duIGlmIHNwLWhpZGUtaGVhZGVyIGlzIG5vdCBzcGVjaWZpZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0hlYWRlcigpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgc2hvd24gaWYgc3AtaGlkZS1oZWFkZXIgaXMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlLCBoZWFkZXJFbHQpO1xyXG4gICAgICAgICAgICBleHBlY3QoaGFzSGVhZGVyKCkpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBoaWRkZW4gaWYgc3AtaGlkZS1oZWFkZXIgaXMgdHJ1ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudCh0cnVlLCBmYWxzZSwgaGVhZGVyRWx0KTtcclxuICAgICAgICAgICAgZXhwZWN0KGhhc0hlYWRlcigpKS50b0VxdWFsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIFwiUm9sZSBEZXRhaWxzXCIgaWYgc3Atc2hvdy1yb2xlLWluLWhlYWRlciBpcyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgZmFsc2UsIGhlYWRlckVsdCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRIZWFkZXJUZXh0KCkpLnRvRXF1YWwoJ1JvbGUgRGV0YWlscycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnc2hvd3MgdGhlIHJvbGUgbmFtZSBpZiBzcC1zaG93LXJvbGUtaW4taGVhZGVyIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIHRydWUsIGhlYWRlckVsdCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChnZXRIZWFkZXJUZXh0KCkpLnRvRXF1YWwocm9sZS5kaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnY29udHJpYnV0aW5nIGVudGl0bGVtZW50cycsICgpID0+IHtcclxuXHJcbiAgICAgICAgaXQoJ2FyZSBub3Qgc2hvd24gaWYgdGhlcmUgYXJlIG5vbmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJvbGUuY29udHJpYnV0aW5nRW50aXRsZW1lbnRzID0gbnVsbDtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRFbnRpdGxlbWVudHNUYWJsZXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJy5lbnRpdGxlbWVudHMtdGFibGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwQ29udHJpYnV0aW5nRW50aXRsZW1lbnRzKGlkeCwgYXBwLCBhY2N0LCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBleHBlY3Qocm9sZS5jb250cmlidXRpbmdFbnRpdGxlbWVudHMubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICByb2xlLmNvbnRyaWJ1dGluZ0VudGl0bGVtZW50c1tpZHhdLmFwcGxpY2F0aW9uID0gYXBwO1xyXG4gICAgICAgICAgICByb2xlLmNvbnRyaWJ1dGluZ0VudGl0bGVtZW50c1tpZHhdLm5hdGl2ZUlkZW50aXR5ID0gYWNjdDtcclxuICAgICAgICAgICAgcm9sZS5jb250cmlidXRpbmdFbnRpdGxlbWVudHNbaWR4XS5pbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2hhdmUgYSB0YWJsZSBwZXIgYWNjb3VudCBvbiB0aGUgc2FtZSBhcHAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwQ29udHJpYnV0aW5nRW50aXRsZW1lbnRzKDAsICdhcHAnLCAnYWNjdDEnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBzZXR1cENvbnRyaWJ1dGluZ0VudGl0bGVtZW50cygxLCAnYXBwJywgJ2FjY3QyJywgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RW50aXRsZW1lbnRzVGFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaGF2ZSBhIHRhYmxlIHBlciBpbnN0YW5jZSBvbiB0aGUgc2FtZSBhcHAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldHVwQ29udHJpYnV0aW5nRW50aXRsZW1lbnRzKDAsICdhcHAnLCAnYWNjdDEnLCAnaW5zdGFuY2UxJyk7XHJcbiAgICAgICAgICAgIHNldHVwQ29udHJpYnV0aW5nRW50aXRsZW1lbnRzKDEsICdhcHAnLCAnYWNjdDEnLCAnaW5zdGFuY2UyJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldEVudGl0bGVtZW50c1RhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2hhdmUgYSB0YWJsZSBwZXIgYXBwJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXR1cENvbnRyaWJ1dGluZ0VudGl0bGVtZW50cygwLCAnYXBwMScsICdhY2N0MScsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIHNldHVwQ29udHJpYnV0aW5nRW50aXRsZW1lbnRzKDEsICdhcHAyJywgJ2FjY3QxJywgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RW50aXRsZW1lbnRzVGFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYXJlIHJlLXJlbmRlcmVkIGlmIHJvbGUgY2hhbmdlcycsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCB3ZSBzdGFydCB3aXRoIDIgY29udHJpYnV0aW5nIGVudGl0bGVtZW50cyB0YWJsZXMuXHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KGdldEVudGl0bGVtZW50c1RhYmxlcygpLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBhIG5ldyByb2xlIHdpdGggb25seSBvbmUgY29udHJpYnV0aW5nIGVudGl0bGVtZW50LlxyXG4gICAgICAgICAgICBsZXQgbmV3Um9sZSA9IG5ldyBSb2xlRGV0YWlsKHJvbGVEZXRhaWxUZXN0RGF0YS5ST0xFMSk7XHJcbiAgICAgICAgICAgIG5ld1JvbGUuY29udHJpYnV0aW5nRW50aXRsZW1lbnRzLmxlbmd0aCA9IDE7XHJcbiAgICAgICAgICAgICRzY29wZS5yb2xlID0gbmV3Um9sZTtcclxuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNob3VsZCBvbmx5IGhhdmUgYSBzaW5nbGUgdGFibGUgbm93LlxyXG4gICAgICAgICAgICBleHBlY3QoZ2V0RW50aXRsZW1lbnRzVGFibGVzKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
