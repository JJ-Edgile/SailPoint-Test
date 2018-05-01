System.register(['test/js/TestInitializer', 'identity/IdentityModule', 'test/js/common/identity/entitlement/EntitlementTestData', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }, function (_testJsCommonIdentityEntitlementEntitlementTestData) {}, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('IdentityAccessDetailsColumnDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    $stateParams = undefined,
                    quickLinkName = undefined,
                    identityService = undefined,
                    Entitlement = undefined,
                    RoleDetail = undefined,
                    entitlementData1 = undefined,
                    entitlementData2 = undefined;

                beforeEach(module(identityModule));
                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _$stateParams_, _identityService_, _Entitlement_, entitlementTestData, _RoleDetail_, spTranslateFilter) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    $stateParams = _$stateParams_;
                    Entitlement = _Entitlement_;
                    RoleDetail = _RoleDetail_;
                    identityService = _identityService_;

                    // Setup an identity ID in the state params.
                    $stateParams.identityId = '1234';

                    spTranslateFilter.configureCatalog({
                        'ui_entitlement_detail_role_dialog_title': 'Role Details',
                        'ui_entitlement_detail_instance_dialog_title_jaws': 'Entitlement Details'
                    });

                    // Mock the identity service to return our configured quick link name.
                    quickLinkName = 'view dat identity!';
                    spyOn(identityService, 'getQuickLinkNameByAction').and.callFake(function () {
                        return quickLinkName;
                    });

                    entitlementData1 = entitlementTestData.ENTITLEMENT1;
                    entitlementData2 = entitlementTestData.ENTITLEMENT2;
                }));

                function createElement() {
                    var definition = '<sp-identity-access-details-column sp-model="access"></sp-identity-access-details-column>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockAccess(data) {
                    var access = new Entitlement(data);
                    return access;
                }

                function createMockAccessRole(data) {
                    var access = new RoleDetail(data);
                    return access;
                }

                it('should have expiration button when date is not null', function () {
                    $scope.access = createMockAccess(entitlementData1);
                    var element = createElement(),
                        menuItems = element.find('sp-identity-access-expiration-button');
                    expect(menuItems.length).toEqual(1);
                });

                it('should not have expiration button when date is null', function () {
                    $scope.access = createMockAccess(entitlementData2);
                    var element = createElement(),
                        menuItems = element.find('sp-identity-access-expiration-button');
                    expect(menuItems.length).toEqual(0);
                });

                it('should use correct label when entitlement type is used for access', function () {
                    $scope.access = createMockAccess(entitlementData2);
                    var element = createElement(),
                        button = $(element.find('.btn')[0]);
                    expect(button.attr('aria-label')).toEqual('Entitlement Details');
                });

                it('should use correct label when entitlement type is used for access', function () {
                    $scope.access = createMockAccessRole(entitlementData2);
                    var element = createElement(),
                        button = $(element.find('.btn')[0]);
                    expect(button.attr('aria-label')).toEqual('Role Details');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzRGV0YWlsc0NvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQkFBMkIsMkRBQTJELDRDQUE0QyxVQUFVLFNBQVM7Ozs7SUFJN0w7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCO1dBQzFDLFVBQVUscURBQXFELElBQUksVUFBVSxzQ0FBc0M7UUFDdEgsU0FBUyxZQUFZOztZQUg3QixTQUFTLHdDQUF3QyxZQUFXO2dCQUN4RCxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxlQUFZO29CQUFFLGdCQUFhO29CQUFFLGtCQUFlO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxtQkFBZ0I7b0JBQ3pHLG1CQUFnQjs7Z0JBRXBCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxnQkFBZ0IsbUJBQW1CLGVBQzdELHFCQUFxQixjQUFjLG1CQUFtQjtvQkFDN0UsU0FBUztvQkFDVCxXQUFXO29CQUNYLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxhQUFhO29CQUNiLGtCQUFrQjs7O29CQUdsQixhQUFhLGFBQWE7O29CQUcxQixrQkFBa0IsaUJBQWlCO3dCQUMvQiwyQ0FBMkM7d0JBQzNDLG9EQUFvRDs7OztvQkFJeEQsZ0JBQWdCO29CQUNoQixNQUFNLGlCQUFpQiw0QkFBNEIsSUFBSSxTQUFTLFlBQUE7d0JBV2hELE9BWHNEOzs7b0JBRXRFLG1CQUFtQixvQkFBb0I7b0JBQ3ZDLG1CQUFtQixvQkFBb0I7OztnQkFHM0MsU0FBUyxnQkFBZ0I7b0JBQ3JCLElBQUksYUFBYTt3QkFDYixVQUFVLFNBQVMsWUFBWTtvQkFDbkMsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsU0FBUyxpQkFBaUIsTUFBTTtvQkFDNUIsSUFBSSxTQUFTLElBQUksWUFBWTtvQkFDN0IsT0FBTzs7O2dCQUdYLFNBQVMscUJBQXFCLE1BQU07b0JBQ2hDLElBQUksU0FBUyxJQUFJLFdBQVc7b0JBQzVCLE9BQU87OztnQkFHWCxHQUFHLHVEQUF1RCxZQUFXO29CQUNqRSxPQUFPLFNBQVMsaUJBQWlCO29CQUNqQyxJQUFJLFVBQVU7d0JBQ1YsWUFBWSxRQUFRLEtBQUs7b0JBQzdCLE9BQU8sVUFBVSxRQUFRLFFBQVE7OztnQkFHckMsR0FBRyx1REFBdUQsWUFBVztvQkFDakUsT0FBTyxTQUFTLGlCQUFpQjtvQkFDakMsSUFBSSxVQUFVO3dCQUNWLFlBQVksUUFBUSxLQUFLO29CQUM3QixPQUFPLFVBQVUsUUFBUSxRQUFROzs7Z0JBR3JDLEdBQUcscUVBQXFFLFlBQVc7b0JBQy9FLE9BQU8sU0FBUyxpQkFBaUI7b0JBQ2pDLElBQUksVUFBVTt3QkFDVixTQUFTLEVBQUUsUUFBUSxLQUFLLFFBQVE7b0JBQ3BDLE9BQU8sT0FBTyxLQUFLLGVBQWUsUUFBUTs7O2dCQUc5QyxHQUFHLHFFQUFxRSxZQUFXO29CQUMvRSxPQUFPLFNBQVMscUJBQXFCO29CQUNyQyxJQUFJLFVBQVU7d0JBQ1YsU0FBUyxFQUFFLFFBQVEsS0FBSyxRQUFRO29CQUNwQyxPQUFPLE9BQU8sS0FBSyxlQUFlLFFBQVE7Ozs7O0dBaUIvQyIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUFjY2Vzc0RldGFpbHNDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0VudGl0bGVtZW50VGVzdERhdGEnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2kxOG4vTW9ja1RyYW5zbGF0ZUZpbHRlcic7XHJcblxyXG5kZXNjcmliZSgnSWRlbnRpdHlBY2Nlc3NEZXRhaWxzQ29sdW1uRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgJHN0YXRlUGFyYW1zLCBxdWlja0xpbmtOYW1lLCBpZGVudGl0eVNlcnZpY2UsIEVudGl0bGVtZW50LCBSb2xlRGV0YWlsLCBlbnRpdGxlbWVudERhdGExLFxyXG4gICAgICAgIGVudGl0bGVtZW50RGF0YTI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcclxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDggKi9cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgXyRzdGF0ZVBhcmFtc18sIF9pZGVudGl0eVNlcnZpY2VfLCBfRW50aXRsZW1lbnRfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXRsZW1lbnRUZXN0RGF0YSwgX1JvbGVEZXRhaWxfLCBzcFRyYW5zbGF0ZUZpbHRlcikge1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XHJcbiAgICAgICAgRW50aXRsZW1lbnQgPSBfRW50aXRsZW1lbnRfO1xyXG4gICAgICAgIFJvbGVEZXRhaWwgPSBfUm9sZURldGFpbF87XHJcbiAgICAgICAgaWRlbnRpdHlTZXJ2aWNlID0gX2lkZW50aXR5U2VydmljZV87XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGFuIGlkZW50aXR5IElEIGluIHRoZSBzdGF0ZSBwYXJhbXMuXHJcbiAgICAgICAgJHN0YXRlUGFyYW1zLmlkZW50aXR5SWQgPSAnMTIzNCc7XHJcblxyXG5cclxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcclxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X2RldGFpbF9yb2xlX2RpYWxvZ190aXRsZSc6ICdSb2xlIERldGFpbHMnLFxyXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfZGV0YWlsX2luc3RhbmNlX2RpYWxvZ190aXRsZV9qYXdzJzogJ0VudGl0bGVtZW50IERldGFpbHMnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1vY2sgdGhlIGlkZW50aXR5IHNlcnZpY2UgdG8gcmV0dXJuIG91ciBjb25maWd1cmVkIHF1aWNrIGxpbmsgbmFtZS5cclxuICAgICAgICBxdWlja0xpbmtOYW1lID0gJ3ZpZXcgZGF0IGlkZW50aXR5ISc7XHJcbiAgICAgICAgc3B5T24oaWRlbnRpdHlTZXJ2aWNlLCAnZ2V0UXVpY2tMaW5rTmFtZUJ5QWN0aW9uJykuYW5kLmNhbGxGYWtlKCgpID0+IHF1aWNrTGlua05hbWUpO1xyXG5cclxuICAgICAgICBlbnRpdGxlbWVudERhdGExID0gZW50aXRsZW1lbnRUZXN0RGF0YS5FTlRJVExFTUVOVDE7XHJcbiAgICAgICAgZW50aXRsZW1lbnREYXRhMiA9IGVudGl0bGVtZW50VGVzdERhdGEuRU5USVRMRU1FTlQyO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLWlkZW50aXR5LWFjY2Vzcy1kZXRhaWxzLWNvbHVtbiBzcC1tb2RlbD1cImFjY2Vzc1wiPjwvc3AtaWRlbnRpdHktYWNjZXNzLWRldGFpbHMtY29sdW1uPicsXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShkZWZpbml0aW9uKSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNb2NrQWNjZXNzKGRhdGEpIHtcclxuICAgICAgICBsZXQgYWNjZXNzID0gbmV3IEVudGl0bGVtZW50KGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBhY2Nlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTW9ja0FjY2Vzc1JvbGUoZGF0YSkge1xyXG4gICAgICAgIGxldCBhY2Nlc3MgPSBuZXcgUm9sZURldGFpbChkYXRhKTtcclxuICAgICAgICByZXR1cm4gYWNjZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgaGF2ZSBleHBpcmF0aW9uIGJ1dHRvbiB3aGVuIGRhdGUgaXMgbm90IG51bGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuYWNjZXNzID0gY3JlYXRlTW9ja0FjY2VzcyhlbnRpdGxlbWVudERhdGExKTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcclxuICAgICAgICAgICAgbWVudUl0ZW1zID0gZWxlbWVudC5maW5kKCdzcC1pZGVudGl0eS1hY2Nlc3MtZXhwaXJhdGlvbi1idXR0b24nKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgbm90IGhhdmUgZXhwaXJhdGlvbiBidXR0b24gd2hlbiBkYXRlIGlzIG51bGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuYWNjZXNzID0gY3JlYXRlTW9ja0FjY2VzcyhlbnRpdGxlbWVudERhdGEyKTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcclxuICAgICAgICAgICAgbWVudUl0ZW1zID0gZWxlbWVudC5maW5kKCdzcC1pZGVudGl0eS1hY2Nlc3MtZXhwaXJhdGlvbi1idXR0b24nKTtcclxuICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdXNlIGNvcnJlY3QgbGFiZWwgd2hlbiBlbnRpdGxlbWVudCB0eXBlIGlzIHVzZWQgZm9yIGFjY2VzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5hY2Nlc3MgPSBjcmVhdGVNb2NrQWNjZXNzKGVudGl0bGVtZW50RGF0YTIpO1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICBidXR0b24gPSAkKGVsZW1lbnQuZmluZCgnLmJ0bicpWzBdKTtcclxuICAgICAgICBleHBlY3QoYnV0dG9uLmF0dHIoJ2FyaWEtbGFiZWwnKSkudG9FcXVhbCgnRW50aXRsZW1lbnQgRGV0YWlscycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCB1c2UgY29ycmVjdCBsYWJlbCB3aGVuIGVudGl0bGVtZW50IHR5cGUgaXMgdXNlZCBmb3IgYWNjZXNzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLmFjY2VzcyA9IGNyZWF0ZU1vY2tBY2Nlc3NSb2xlKGVudGl0bGVtZW50RGF0YTIpO1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICBidXR0b24gPSAkKGVsZW1lbnQuZmluZCgnLmJ0bicpWzBdKTtcclxuICAgICAgICBleHBlY3QoYnV0dG9uLmF0dHIoJ2FyaWEtbGFiZWwnKSkudG9FcXVhbCgnUm9sZSBEZXRhaWxzJyk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
