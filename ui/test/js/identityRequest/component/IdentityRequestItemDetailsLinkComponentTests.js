System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('spIdentityRequestItemDetailsLink', function () {
                var elementDefinition = '<sp-identity-request-item-details-link sp-model="item" sp-column-config="columnConfig" />',
                    $scope = undefined,
                    $compile = undefined,
                    identityRequestDataService = undefined,
                    identityRequestService = undefined,
                    identityRequest = undefined,
                    item = undefined,
                    columnConfig = undefined,
                    element = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function ($rootScope, _$compile_, _identityRequestDataService_, _identityRequestService_) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    identityRequestDataService = _identityRequestDataService_;
                    identityRequestService = _identityRequestService_;

                    identityRequest = {
                        id: 'request1'
                    };

                    item = {
                        id: 'item1',
                        columnValue: 'some value'
                    };

                    columnConfig = {
                        getObjectValue: jasmine.createSpy('getObjectValue').and.callFake(function () {
                            return item.columnValue;
                        })
                    };

                    spyOn(identityRequestService, 'showRoleDetailsDialog');
                    spyOn(identityRequestService, 'showManagedAttributeDetailsDialog');

                    spyOn(identityRequestDataService, 'getIdentityRequest').and.returnValue(identityRequest);
                }));

                function createElement(isRole, isEntitlement) {
                    item.role = isRole;
                    item.entitlement = isEntitlement;

                    $scope.item = item;
                    $scope.columnConfig = columnConfig;

                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                it('shows link for role details if item is a role', function () {
                    createElement(true, false);
                    var link = element.find('a');
                    expect(link.length).toEqual(1);
                    expect(link.text()).toContain(item.columnValue);
                    link.click();
                    $scope.$apply();
                    expect(identityRequestService.showRoleDetailsDialog).toHaveBeenCalledWith(identityRequest.id, item.id);
                });

                it('shows link for managed attribute details if entitlement', function () {
                    createElement(false, true);
                    var link = element.find('a');
                    expect(link.length).toEqual(1);
                    expect(link.text()).toContain(item.columnValue);
                    link.click();
                    $scope.$apply();
                    expect(identityRequestService.showManagedAttributeDetailsDialog).toHaveBeenCalledWith(identityRequest.id, item.id);
                });

                it('shows normal text if not role or entitlement', function () {
                    createElement(false, false);
                    var link = element.find('a');
                    expect(link.length).toEqual(0);
                    expect(element.text()).toContain(item.columnValue);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SXRlbURldGFpbHNMaW5rQ29tcG9uZW50VGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDBDQUEwQyxVQUFVLFNBQVM7OztJQUdyRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLHdCQUF3QixzQ0FBc0M7O1FBRWxFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQ0FBb0MsWUFBTTtnQkFDL0MsSUFBSSxvQkFBaUI7b0JBQ2pCLFNBQU07b0JBQUUsV0FBUTtvQkFBRSw2QkFBMEI7b0JBQUUseUJBQXNCO29CQUNwRSxrQkFBZTtvQkFBRSxPQUFJO29CQUFFLGVBQVk7b0JBQUUsVUFBTzs7Z0JBRWhELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBWSw4QkFBOEIsMEJBQTZCO29CQUNsRyxTQUFTO29CQUNULFdBQVc7b0JBQ1gsNkJBQTZCO29CQUM3Qix5QkFBeUI7O29CQUV6QixrQkFBa0I7d0JBQ2QsSUFBSTs7O29CQUdSLE9BQU87d0JBQ0gsSUFBSTt3QkFDSixhQUFhOzs7b0JBR2pCLGVBQWU7d0JBQ1gsZ0JBQWdCLFFBQVEsVUFBVSxrQkFBa0IsSUFBSSxTQUFTLFlBQUE7NEJBY2pELE9BZHVELEtBQUs7Ozs7b0JBR2hGLE1BQU0sd0JBQXdCO29CQUM5QixNQUFNLHdCQUF3Qjs7b0JBRTlCLE1BQU0sNEJBQTRCLHNCQUFzQixJQUFJLFlBQVk7OztnQkFHNUUsU0FBUyxjQUFjLFFBQVEsZUFBZTtvQkFDMUMsS0FBSyxPQUFPO29CQUNaLEtBQUssY0FBYzs7b0JBRW5CLE9BQU8sT0FBTztvQkFDZCxPQUFPLGVBQWU7O29CQUV0QixVQUFVLFNBQVMsUUFBUSxRQUFRLG9CQUFvQjtvQkFDdkQsT0FBTzs7O2dCQUdYLEdBQUcsaURBQWlELFlBQU07b0JBQ3RELGNBQWMsTUFBTTtvQkFDcEIsSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTtvQkFDNUIsT0FBTyxLQUFLLFFBQVEsVUFBVSxLQUFLO29CQUNuQyxLQUFLO29CQUNMLE9BQU87b0JBQ1AsT0FBTyx1QkFBdUIsdUJBQXVCLHFCQUFxQixnQkFBZ0IsSUFBSSxLQUFLOzs7Z0JBR3ZHLEdBQUcsMkRBQTJELFlBQU07b0JBQ2hFLGNBQWMsT0FBTztvQkFDckIsSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTtvQkFDNUIsT0FBTyxLQUFLLFFBQVEsVUFBVSxLQUFLO29CQUNuQyxLQUFLO29CQUNMLE9BQU87b0JBQ1AsT0FBTyx1QkFBdUIsbUNBQ3pCLHFCQUFxQixnQkFBZ0IsSUFBSSxLQUFLOzs7Z0JBR3ZELEdBQUcsZ0RBQWlELFlBQU07b0JBQ3RELGNBQWMsT0FBTztvQkFDckIsSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTtvQkFDNUIsT0FBTyxRQUFRLFFBQVEsVUFBVSxLQUFLOzs7OztHQW1CM0MiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RJdGVtRGV0YWlsc0xpbmtDb21wb25lbnRUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eVJlcXVlc3RNb2R1bGUgZnJvbSAnaWRlbnRpdHlSZXF1ZXN0L0lkZW50aXR5UmVxdWVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcElkZW50aXR5UmVxdWVzdEl0ZW1EZXRhaWxzTGluaycsICgpID0+IHtcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLWlkZW50aXR5LXJlcXVlc3QtaXRlbS1kZXRhaWxzLWxpbmsgc3AtbW9kZWw9XCJpdGVtXCIgc3AtY29sdW1uLWNvbmZpZz1cImNvbHVtbkNvbmZpZ1wiIC8+YCxcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZSwgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UsIGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCwgaXRlbSwgY29sdW1uQ29uZmlnLCBlbGVtZW50O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoJHJvb3RTY29wZSwgXyRjb21waWxlXywgX2lkZW50aXR5UmVxdWVzdERhdGFTZXJ2aWNlXywgX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfKSA9PiB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2UgPSBfaWRlbnRpdHlSZXF1ZXN0RGF0YVNlcnZpY2VfO1xuICAgICAgICBpZGVudGl0eVJlcXVlc3RTZXJ2aWNlID0gX2lkZW50aXR5UmVxdWVzdFNlcnZpY2VfO1xuXG4gICAgICAgIGlkZW50aXR5UmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGlkOiAncmVxdWVzdDEnXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgIGlkOiAnaXRlbTEnLFxuICAgICAgICAgICAgY29sdW1uVmFsdWU6ICdzb21lIHZhbHVlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbHVtbkNvbmZpZyA9IHtcbiAgICAgICAgICAgIGdldE9iamVjdFZhbHVlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0T2JqZWN0VmFsdWUnKS5hbmQuY2FsbEZha2UoKCkgPT4gaXRlbS5jb2x1bW5WYWx1ZSlcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3RTZXJ2aWNlLCAnc2hvd1JvbGVEZXRhaWxzRGlhbG9nJyk7XG4gICAgICAgIHNweU9uKGlkZW50aXR5UmVxdWVzdFNlcnZpY2UsICdzaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbHNEaWFsb2cnKTtcblxuICAgICAgICBzcHlPbihpZGVudGl0eVJlcXVlc3REYXRhU2VydmljZSwgJ2dldElkZW50aXR5UmVxdWVzdCcpLmFuZC5yZXR1cm5WYWx1ZShpZGVudGl0eVJlcXVlc3QpO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaXNSb2xlLCBpc0VudGl0bGVtZW50KSB7XG4gICAgICAgIGl0ZW0ucm9sZSA9IGlzUm9sZTtcbiAgICAgICAgaXRlbS5lbnRpdGxlbWVudCA9IGlzRW50aXRsZW1lbnQ7XG5cbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xuICAgICAgICAkc2NvcGUuY29sdW1uQ29uZmlnID0gY29sdW1uQ29uZmlnO1xuXG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3dzIGxpbmsgZm9yIHJvbGUgZGV0YWlscyBpZiBpdGVtIGlzIGEgcm9sZScsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCh0cnVlLCBmYWxzZSk7XG4gICAgICAgIGxldCBsaW5rID0gZWxlbWVudC5maW5kKCdhJyk7XG4gICAgICAgIGV4cGVjdChsaW5rLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGxpbmsudGV4dCgpKS50b0NvbnRhaW4oaXRlbS5jb2x1bW5WYWx1ZSk7XG4gICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5zaG93Um9sZURldGFpbHNEaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlkZW50aXR5UmVxdWVzdC5pZCwgaXRlbS5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgbGluayBmb3IgbWFuYWdlZCBhdHRyaWJ1dGUgZGV0YWlscyBpZiBlbnRpdGxlbWVudCcsICgpID0+IHtcbiAgICAgICAgY3JlYXRlRWxlbWVudChmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIGxldCBsaW5rID0gZWxlbWVudC5maW5kKCdhJyk7XG4gICAgICAgIGV4cGVjdChsaW5rLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGxpbmsudGV4dCgpKS50b0NvbnRhaW4oaXRlbS5jb2x1bW5WYWx1ZSk7XG4gICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoaWRlbnRpdHlSZXF1ZXN0U2VydmljZS5zaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbHNEaWFsb2cpXG4gICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoaWRlbnRpdHlSZXF1ZXN0LmlkLCBpdGVtLmlkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG93cyBub3JtYWwgdGV4dCBpZiBub3Qgcm9sZSBvciBlbnRpdGxlbWVudCcsICAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgbGV0IGxpbmsgPSBlbGVtZW50LmZpbmQoJ2EnKTtcbiAgICAgICAgZXhwZWN0KGxpbmsubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QoZWxlbWVudC50ZXh0KCkpLnRvQ29udGFpbihpdGVtLmNvbHVtblZhbHVlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
