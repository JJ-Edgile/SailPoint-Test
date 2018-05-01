System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityAccessEntitlementColumnDirective', function () {

                var $compile = undefined,
                    element = undefined,
                    $scope = undefined,
                    quickLinkName = undefined,
                    $stateParams = undefined,
                    identityAccessService = undefined,
                    managedAttributeDialogService = undefined,
                    managedAttributeService = undefined,
                    entitlement = undefined,
                    colConfig = undefined,
                    entitlementValue = undefined;

                beforeEach(module(identityModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$compile_, _$stateParams_, $rootScope, identityService, _identityAccessService_, _managedAttributeDialogService_, _managedAttributeService_) {
                    $compile = _$compile_;
                    $stateParams = _$stateParams_;
                    $scope = $rootScope;
                    identityAccessService = _identityAccessService_;
                    managedAttributeDialogService = _managedAttributeDialogService_;
                    managedAttributeService = _managedAttributeService_;

                    // Mock the identity service to return our configured quick link name.
                    quickLinkName = 'view dat identity!';
                    spyOn(identityService, 'getQuickLinkNameByAction').and.callFake(function () {
                        return quickLinkName;
                    });

                    // Setup an identity ID in the state params.
                    $stateParams.identityId = '1234';

                    // Setup some fake data for our renderer.
                    entitlementValue = 'view dat entitlement!';
                    entitlement = {
                        id: 'entitleMan',
                        group: true
                    };
                    colConfig = {
                        getObjectValue: jasmine.createSpy('getObjectValue').and.returnValue(entitlementValue)
                    };
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    var eltDef = '<sp-identity-access-entitlement-column sp-model="ent" sp-column-config="colConfig" />';

                    $scope.ent = entitlement;
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

                it('renders the entitlement value in a hyperlink', function () {
                    compile();
                    var link = getLink();
                    expect(link.text().trim().startsWith(entitlementValue)).toEqual(true);
                });

                it('only renders the value when entitlement is not a group', function () {
                    entitlement.group = false;
                    compile();
                    var link = element.find('a');
                    expect(link.length).toEqual(0);
                    var span = element.find('span');
                    expect(span.length).toEqual(1);
                    expect(span.text().trim()).toEqual(entitlementValue);
                });

                it('loads the entitlement and calls the managedAttributeDialogService when the entitlement is clicked', function () {
                    // Mock out the call to the load the entitlement, and spy on the entitlement detail dialog.
                    var fakePromise = { i: 'am a promise' },
                        url = 'some/url';
                    spyOn(identityAccessService, 'getEntitlementDetailsUrl').and.returnValue(url);
                    spyOn(managedAttributeService, 'getEntitlementDetails').and.returnValue(fakePromise);
                    spyOn(managedAttributeDialogService, 'showDialog');

                    // Compile the element and click the link.
                    compile();
                    var link = getLink();
                    link.click();

                    // Verify that the entitlement was loaded and the dialog service was called.
                    expect(identityAccessService.getEntitlementDetailsUrl).toHaveBeenCalledWith(quickLinkName, $stateParams.identityId, entitlement.id);
                    expect(managedAttributeDialogService.showDialog).toHaveBeenCalledWith(fakePromise, url);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzRW50aXRsZW1lbnRDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUztJQUN2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyw0Q0FBNEMsWUFBTTs7Z0JBRXZELElBQUksV0FBUTtvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsZ0JBQWE7b0JBQUUsZUFBWTtvQkFBRSx3QkFBcUI7b0JBQUUsZ0NBQTZCO29CQUM1RywwQkFBdUI7b0JBQUUsY0FBVztvQkFBRSxZQUFTO29CQUFFLG1CQUFnQjs7Z0JBRXJFLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxZQUFZLGdCQUFnQixZQUFZLGlCQUFpQix5QkFDekQsaUNBQWlDLDJCQUE4QjtvQkFDOUUsV0FBVztvQkFDWCxlQUFlO29CQUNmLFNBQVM7b0JBQ1Qsd0JBQXdCO29CQUN4QixnQ0FBZ0M7b0JBQ2hDLDBCQUEwQjs7O29CQUcxQixnQkFBZ0I7b0JBQ2hCLE1BQU0saUJBQWlCLDRCQUE0QixJQUFJLFNBQVMsWUFBQTt3QkFnQmhELE9BaEJzRDs7OztvQkFHdEUsYUFBYSxhQUFhOzs7b0JBRzFCLG1CQUFtQjtvQkFDbkIsY0FBYzt3QkFDVixJQUFJO3dCQUNKLE9BQU87O29CQUVYLFlBQVk7d0JBQ1IsZ0JBQWdCLFFBQVEsVUFBVSxrQkFBa0IsSUFBSSxZQUFZOzs7O2dCQUk1RSxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsVUFBVTtvQkFDZixJQUFJLFNBQU07O29CQUVWLE9BQU8sTUFBTTtvQkFDYixPQUFPLFlBQVk7O29CQUVuQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Z0JBR1gsR0FBRyxtRUFBbUUsWUFBTTtvQkFDeEUsYUFBYSxhQUFhO29CQUMxQixPQUFPLFlBQUE7d0JBa0JTLE9BbEJIO3VCQUFXOzs7Z0JBRzVCLEdBQUcscUNBQXFDLFlBQU07b0JBQzFDLGdCQUFnQjtvQkFDaEIsT0FBTyxZQUFBO3dCQW9CUyxPQXBCSDt1QkFBVzs7O2dCQUc1QixTQUFTLFVBQVU7b0JBQ2YsSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsT0FBTyxLQUFLLFFBQVEsUUFBUTtvQkFDNUIsT0FBTzs7O2dCQUdYLEdBQUcsZ0RBQWdELFlBQU07b0JBQ3JEO29CQUNBLElBQUksT0FBTztvQkFDWCxPQUFPLEtBQUssT0FBTyxPQUFPLFdBQVcsbUJBQW1CLFFBQVE7OztnQkFHcEUsR0FBRywwREFBMEQsWUFBTTtvQkFDL0QsWUFBWSxRQUFRO29CQUNwQjtvQkFDQSxJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixPQUFPLEtBQUssT0FBTyxRQUFRLFFBQVE7OztnQkFHdkMsR0FBRyxxR0FBcUcsWUFBTTs7b0JBRTFHLElBQUksY0FBYyxFQUFFLEdBQUc7d0JBQ25CLE1BQU07b0JBQ1YsTUFBTSx1QkFBdUIsNEJBQTRCLElBQUksWUFBWTtvQkFDekUsTUFBTSx5QkFBeUIseUJBQXlCLElBQUksWUFBWTtvQkFDeEUsTUFBTSwrQkFBK0I7OztvQkFHckM7b0JBQ0EsSUFBSSxPQUFPO29CQUNYLEtBQUs7OztvQkFHTCxPQUFPLHNCQUFzQiwwQkFDekIscUJBQXFCLGVBQWUsYUFBYSxZQUFZLFlBQVk7b0JBQzdFLE9BQU8sOEJBQThCLFlBQVkscUJBQXFCLGFBQWE7Ozs7O0dBeUJ4RiIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUFjY2Vzc0VudGl0bGVtZW50Q29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdJZGVudGl0eUFjY2Vzc0VudGl0bGVtZW50Q29sdW1uRGlyZWN0aXZlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCAkY29tcGlsZSwgZWxlbWVudCwgJHNjb3BlLCBxdWlja0xpbmtOYW1lLCAkc3RhdGVQYXJhbXMsIGlkZW50aXR5QWNjZXNzU2VydmljZSwgbWFuYWdlZEF0dHJpYnV0ZURpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsIGVudGl0bGVtZW50LCBjb2xDb25maWcsIGVudGl0bGVtZW50VmFsdWU7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgXyRzdGF0ZVBhcmFtc18sICRyb290U2NvcGUsIGlkZW50aXR5U2VydmljZSwgX2lkZW50aXR5QWNjZXNzU2VydmljZV8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgX21hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlXywgX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXykgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkc3RhdGVQYXJhbXMgPSBfJHN0YXRlUGFyYW1zXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xyXG4gICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZSA9IF9pZGVudGl0eUFjY2Vzc1NlcnZpY2VfO1xyXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlXztcclxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSA9IF9tYW5hZ2VkQXR0cmlidXRlU2VydmljZV87XHJcblxyXG4gICAgICAgIC8vIE1vY2sgdGhlIGlkZW50aXR5IHNlcnZpY2UgdG8gcmV0dXJuIG91ciBjb25maWd1cmVkIHF1aWNrIGxpbmsgbmFtZS5cclxuICAgICAgICBxdWlja0xpbmtOYW1lID0gJ3ZpZXcgZGF0IGlkZW50aXR5ISc7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAnZ2V0UXVpY2tMaW5rTmFtZUJ5QWN0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IHF1aWNrTGlua05hbWUpO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCBhbiBpZGVudGl0eSBJRCBpbiB0aGUgc3RhdGUgcGFyYW1zLlxyXG4gICAgICAgICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkID0gJzEyMzQnO1xyXG5cclxuICAgICAgICAvLyBTZXR1cCBzb21lIGZha2UgZGF0YSBmb3Igb3VyIHJlbmRlcmVyLlxyXG4gICAgICAgIGVudGl0bGVtZW50VmFsdWUgPSAndmlldyBkYXQgZW50aXRsZW1lbnQhJztcclxuICAgICAgICBlbnRpdGxlbWVudCA9IHtcclxuICAgICAgICAgICAgaWQ6ICdlbnRpdGxlTWFuJyxcclxuICAgICAgICAgICAgZ3JvdXA6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbENvbmZpZyA9IHtcclxuICAgICAgICAgICAgZ2V0T2JqZWN0VmFsdWU6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRPYmplY3RWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZShlbnRpdGxlbWVudFZhbHVlKVxyXG4gICAgICAgIH07XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoKSB7XHJcbiAgICAgICAgbGV0IGVsdERlZiA9IGA8c3AtaWRlbnRpdHktYWNjZXNzLWVudGl0bGVtZW50LWNvbHVtbiBzcC1tb2RlbD1cImVudFwiIHNwLWNvbHVtbi1jb25maWc9XCJjb2xDb25maWdcIiAvPmA7XHJcblxyXG4gICAgICAgICRzY29wZS5lbnQgPSBlbnRpdGxlbWVudDtcclxuICAgICAgICAkc2NvcGUuY29sQ29uZmlnID0gY29sQ29uZmlnO1xyXG5cclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc29icyB3aXRoIHRoZSBjcnVzaGluZyBibG93IG9mIG5vIGlkZW50aXR5SWQgaW4gdGhlIHN0YXRlUGFyYW1zJywgKCkgPT4ge1xyXG4gICAgICAgICRzdGF0ZVBhcmFtcy5pZGVudGl0eUlkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjb21waWxlKCkpLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd3YWlscyB3aGVuIG1ldCB3aXRoIG5vIHF1aWNrIGxpbmsnLCAoKSA9PiB7XHJcbiAgICAgICAgcXVpY2tMaW5rTmFtZSA9IG51bGw7XHJcbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBpbGUoKSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TGluaygpIHtcclxuICAgICAgICBsZXQgbGluayA9IGVsZW1lbnQuZmluZCgnYScpO1xyXG4gICAgICAgIGV4cGVjdChsaW5rLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICByZXR1cm4gbGluaztcclxuICAgIH1cclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgZW50aXRsZW1lbnQgdmFsdWUgaW4gYSBoeXBlcmxpbmsnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGxldCBsaW5rID0gZ2V0TGluaygpO1xyXG4gICAgICAgIGV4cGVjdChsaW5rLnRleHQoKS50cmltKCkuc3RhcnRzV2l0aChlbnRpdGxlbWVudFZhbHVlKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdvbmx5IHJlbmRlcnMgdGhlIHZhbHVlIHdoZW4gZW50aXRsZW1lbnQgaXMgbm90IGEgZ3JvdXAnLCAoKSA9PiB7XHJcbiAgICAgICAgZW50aXRsZW1lbnQuZ3JvdXAgPSBmYWxzZTtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IGxpbmsgPSBlbGVtZW50LmZpbmQoJ2EnKTtcclxuICAgICAgICBleHBlY3QobGluay5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgbGV0IHNwYW4gPSBlbGVtZW50LmZpbmQoJ3NwYW4nKTtcclxuICAgICAgICBleHBlY3Qoc3Bhbi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgZXhwZWN0KHNwYW4udGV4dCgpLnRyaW0oKSkudG9FcXVhbChlbnRpdGxlbWVudFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdsb2FkcyB0aGUgZW50aXRsZW1lbnQgYW5kIGNhbGxzIHRoZSBtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZSB3aGVuIHRoZSBlbnRpdGxlbWVudCBpcyBjbGlja2VkJywgKCkgPT4ge1xyXG4gICAgICAgIC8vIE1vY2sgb3V0IHRoZSBjYWxsIHRvIHRoZSBsb2FkIHRoZSBlbnRpdGxlbWVudCwgYW5kIHNweSBvbiB0aGUgZW50aXRsZW1lbnQgZGV0YWlsIGRpYWxvZy5cclxuICAgICAgICBsZXQgZmFrZVByb21pc2UgPSB7IGk6ICdhbSBhIHByb21pc2UnIH0sXHJcbiAgICAgICAgICAgIHVybCA9ICdzb21lL3VybCc7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnREZXRhaWxzVXJsJykuYW5kLnJldHVyblZhbHVlKHVybCk7XHJcbiAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudERldGFpbHMnKS5hbmQucmV0dXJuVmFsdWUoZmFrZVByb21pc2UpO1xyXG4gICAgICAgIHNweU9uKG1hbmFnZWRBdHRyaWJ1dGVEaWFsb2dTZXJ2aWNlLCAnc2hvd0RpYWxvZycpO1xyXG5cclxuICAgICAgICAvLyBDb21waWxlIHRoZSBlbGVtZW50IGFuZCBjbGljayB0aGUgbGluay5cclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IGxpbmsgPSBnZXRMaW5rKCk7XHJcbiAgICAgICAgbGluay5jbGljaygpO1xyXG5cclxuICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgZW50aXRsZW1lbnQgd2FzIGxvYWRlZCBhbmQgdGhlIGRpYWxvZyBzZXJ2aWNlIHdhcyBjYWxsZWQuXHJcbiAgICAgICAgZXhwZWN0KGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHNVcmwpLlxyXG4gICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChxdWlja0xpbmtOYW1lLCAkc3RhdGVQYXJhbXMuaWRlbnRpdHlJZCwgZW50aXRsZW1lbnQuaWQpO1xyXG4gICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlRGlhbG9nU2VydmljZS5zaG93RGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmYWtlUHJvbWlzZSwgdXJsKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
