System.register(['test/js/TestInitializer', 'test/js/common/i18n/MockTranslateFilter', 'common/identity/entitlement/IdentityEntitlementModule', 'test/js/common/identity/entitlement/EntitlementTestData'], function (_export) {
    'use strict';

    var entitlementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsCommonI18nMockTranslateFilter) {}, function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }, function (_testJsCommonIdentityEntitlementEntitlementTestData) {}],
        execute: function () {

            describe('EntitlementCertItemDetailPanelDirective', function () {

                var eltDef = '<sp-identity-entitlement-cert-item-detail-panel sp-cert-item="certificationItem"/>';

                var IdentityEntitlementCertificationItemDTO = undefined,
                    entitlementTestData = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    certificationItem = undefined;

                beforeEach(module(entitlementModule));

                beforeEach(inject(function (_$compile_, $rootScope, _IdentityEntitlementCertificationItemDTO_, spTranslateFilter, _entitlementTestData_) {
                    $compile = _$compile_;
                    IdentityEntitlementCertificationItemDTO = _IdentityEntitlementCertificationItemDTO_;
                    entitlementTestData = _entitlementTestData_;
                    $scope = $rootScope.$new();

                    spTranslateFilter.configureCatalog({
                        'ui_entitlement_details_certification': 'Certification',
                        'ui_entitlement_cert_item_detail_certification': 'Certification',
                        'ui_entitlement_details_date': 'Date',
                        'ui_entitlement_cert_item_detail_decision_date': 'Decision Date',
                        'ui_entitlement_cert_item_detail_certifier': 'Certifier',
                        'ui_entitlement_cert_item_detail_decision': 'Decision',
                        'ui_entitlement_cert_item_detail_granularity': 'Granularity',
                        'ui_entitlement_cert_item_detail_mitigation_end_date': 'Mitigation End Date'
                    });

                    certificationItem = new IdentityEntitlementCertificationItemDTO(entitlementTestData.CERTIFICATIONITEM1);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement() {
                    var elt = arguments.length <= 0 || arguments[0] === undefined ? eltDef : arguments[0];

                    element = angular.element(elt);
                    $scope.certificationItem = certificationItem;
                    $compile(element)($scope);
                    $scope.$digest();
                    return element;
                }

                function testValue(labelText, expectedValue) {
                    createElement();
                    var label = element.find('b:contains(\'' + labelText + '\')');
                    expect(label.length).toEqual(1);
                    expect(label.parent().text().trim().endsWith(expectedValue)).toEqual(true);
                }

                function hasValue(labelText) {
                    createElement();
                    var label = element.find('b:contains(\'' + labelText + '\')');
                    return label.length > 0;
                }

                it('displays the name', function () {
                    testValue('Certification', certificationItem.certificationName);
                });

                it('displays the certifier', function () {
                    testValue('Certifier', certificationItem.certifier);
                });

                it('displays the action status', function () {
                    expect(hasValue('Decision')).toEqual(true);
                });

                it('displays the granularity', function () {
                    testValue('Granularity', certificationItem.certificationGranularity);
                });

                it('displays the certificationDate', function () {
                    expect(hasValue('Date')).toEqual(true);
                });

                it('displays the certificationFinishDate', function () {
                    expect(hasValue('Decision Date')).toEqual(true);
                });

                it('displays the certificationMitigationExpirationDate', function () {
                    expect(hasValue('Mitigation End Date')).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9JZGVudGl0eUVudGl0bGVtZW50Q2VydEl0ZW1EZXRhaWxQYW5lbERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMseURBQXlELDREQUE0RCxVQUFVLFNBQVM7SUFDM047O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNDQUFzQyxJQUFJLFVBQVUscURBQXFEO1lBQy9KLG9CQUFvQixvREFBb0Q7V0FDekUsVUFBVSxxREFBcUQ7UUFDbEUsU0FBUyxZQUFZOztZQUg3QixTQUFTLDJDQUEyQyxZQUFNOztnQkFFdEQsSUFBSSxTQUFTOztnQkFFYixJQUFJLDBDQUF1QztvQkFBRSxzQkFBbUI7b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsb0JBQWlCOztnQkFFOUcsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLDJDQUEyQyxtQkFDbkUsdUJBQTBCO29CQUN6QyxXQUFXO29CQUNYLDBDQUEwQztvQkFDMUMsc0JBQXNCO29CQUN0QixTQUFTLFdBQVc7O29CQUVwQixrQkFBa0IsaUJBQWlCO3dCQUMvQix3Q0FBd0M7d0JBQ3hDLGlEQUFpRDt3QkFDakQsK0JBQStCO3dCQUMvQixpREFBaUQ7d0JBQ2pELDZDQUE2Qzt3QkFDN0MsNENBQTRDO3dCQUM1QywrQ0FBK0M7d0JBQy9DLHVEQUF1RDs7O29CQUczRCxvQkFBb0IsSUFBSSx3Q0FBd0Msb0JBQW9COzs7Z0JBR3hGLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxnQkFBNEI7b0JBVXJCLElBVk8sTUFBRyxVQUFBLFVBQUEsS0FBQSxVQUFBLE9BQUEsWUFBRyxTQUFNLFVBQUE7O29CQUMvQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxvQkFBb0I7b0JBQzNCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsU0FBUyxVQUFVLFdBQVcsZUFBZTtvQkFDekM7b0JBQ0EsSUFBSSxRQUFRLFFBQVEsS0FBSSxrQkFBZ0IsWUFBUztvQkFDakQsT0FBTyxNQUFNLFFBQVEsUUFBUTtvQkFDN0IsT0FBTyxNQUFNLFNBQVMsT0FBTyxPQUFPLFNBQVMsZ0JBQWdCLFFBQVE7OztnQkFHekUsU0FBUyxTQUFTLFdBQVc7b0JBQ3pCO29CQUNBLElBQUksUUFBUSxRQUFRLEtBQUksa0JBQWdCLFlBQVM7b0JBQ2pELE9BQVEsTUFBTSxTQUFTOzs7Z0JBRzNCLEdBQUcscUJBQXFCLFlBQU07b0JBQzFCLFVBQVUsaUJBQWlCLGtCQUFrQjs7O2dCQUdqRCxHQUFHLDBCQUEwQixZQUFNO29CQUMvQixVQUFVLGFBQWEsa0JBQWtCOzs7Z0JBRzdDLEdBQUcsOEJBQThCLFlBQU07b0JBQ25DLE9BQU8sU0FBUyxhQUFhLFFBQVE7OztnQkFHekMsR0FBRyw0QkFBNEIsWUFBTTtvQkFDakMsVUFBVSxlQUFlLGtCQUFrQjs7O2dCQUcvQyxHQUFHLGtDQUFrQyxZQUFNO29CQUN2QyxPQUFPLFNBQVMsU0FBUyxRQUFROzs7Z0JBR3JDLEdBQUcsd0NBQXdDLFlBQU07b0JBQzdDLE9BQU8sU0FBUyxrQkFBa0IsUUFBUTs7O2dCQUc5QyxHQUFHLHNEQUFzRCxZQUFNO29CQUMzRCxPQUFPLFNBQVMsd0JBQXdCLFFBQVE7Ozs7O0dBZ0JyRCIsImZpbGUiOiJjb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvSWRlbnRpdHlFbnRpdGxlbWVudENlcnRJdGVtRGV0YWlsUGFuZWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0ICd0ZXN0L2pzL2NvbW1vbi9pMThuL01vY2tUcmFuc2xhdGVGaWx0ZXInO1xuaW1wb3J0IGVudGl0bGVtZW50TW9kdWxlIGZyb20gJ2NvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9JZGVudGl0eUVudGl0bGVtZW50TW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvRW50aXRsZW1lbnRUZXN0RGF0YSc7XG5cbmRlc2NyaWJlKCdFbnRpdGxlbWVudENlcnRJdGVtRGV0YWlsUGFuZWxEaXJlY3RpdmUnLCAoKSA9PiB7XG5cbiAgICBsZXQgZWx0RGVmID0gJzxzcC1pZGVudGl0eS1lbnRpdGxlbWVudC1jZXJ0LWl0ZW0tZGV0YWlsLXBhbmVsIHNwLWNlcnQtaXRlbT1cImNlcnRpZmljYXRpb25JdGVtXCIvPic7XG5cbiAgICBsZXQgSWRlbnRpdHlFbnRpdGxlbWVudENlcnRpZmljYXRpb25JdGVtRFRPLCBlbnRpdGxlbWVudFRlc3REYXRhLCAkY29tcGlsZSwgJHNjb3BlLCBlbGVtZW50LCBjZXJ0aWZpY2F0aW9uSXRlbTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVudGl0bGVtZW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSwgX0lkZW50aXR5RW50aXRsZW1lbnRDZXJ0aWZpY2F0aW9uSXRlbURUT18sIHNwVHJhbnNsYXRlRmlsdGVyLFxuICAgICAgICAgICAgICAgICAgICAgICBfZW50aXRsZW1lbnRUZXN0RGF0YV8pID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICBJZGVudGl0eUVudGl0bGVtZW50Q2VydGlmaWNhdGlvbkl0ZW1EVE8gPSBfSWRlbnRpdHlFbnRpdGxlbWVudENlcnRpZmljYXRpb25JdGVtRFRPXztcbiAgICAgICAgZW50aXRsZW1lbnRUZXN0RGF0YSA9IF9lbnRpdGxlbWVudFRlc3REYXRhXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG5cbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfZGV0YWlsc19jZXJ0aWZpY2F0aW9uJzogJ0NlcnRpZmljYXRpb24nLFxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X2NlcnRfaXRlbV9kZXRhaWxfY2VydGlmaWNhdGlvbic6ICdDZXJ0aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd1aV9lbnRpdGxlbWVudF9kZXRhaWxzX2RhdGUnOiAnRGF0ZScsXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfY2VydF9pdGVtX2RldGFpbF9kZWNpc2lvbl9kYXRlJzogJ0RlY2lzaW9uIERhdGUnLFxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X2NlcnRfaXRlbV9kZXRhaWxfY2VydGlmaWVyJzogJ0NlcnRpZmllcicsXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfY2VydF9pdGVtX2RldGFpbF9kZWNpc2lvbic6ICdEZWNpc2lvbicsXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfY2VydF9pdGVtX2RldGFpbF9ncmFudWxhcml0eSc6ICdHcmFudWxhcml0eScsXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfY2VydF9pdGVtX2RldGFpbF9taXRpZ2F0aW9uX2VuZF9kYXRlJzogJ01pdGlnYXRpb24gRW5kIERhdGUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlcnRpZmljYXRpb25JdGVtID0gbmV3IElkZW50aXR5RW50aXRsZW1lbnRDZXJ0aWZpY2F0aW9uSXRlbURUTyhlbnRpdGxlbWVudFRlc3REYXRhLkNFUlRJRklDQVRJT05JVEVNMSk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWx0ID0gZWx0RGVmKSB7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWx0KTtcbiAgICAgICAgJHNjb3BlLmNlcnRpZmljYXRpb25JdGVtID0gY2VydGlmaWNhdGlvbkl0ZW07XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRlc3RWYWx1ZShsYWJlbFRleHQsIGV4cGVjdGVkVmFsdWUpIHtcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBsZXQgbGFiZWwgPSBlbGVtZW50LmZpbmQoYGI6Y29udGFpbnMoJyR7bGFiZWxUZXh0fScpYCk7XG4gICAgICAgIGV4cGVjdChsYWJlbC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChsYWJlbC5wYXJlbnQoKS50ZXh0KCkudHJpbSgpLmVuZHNXaXRoKGV4cGVjdGVkVmFsdWUpKS50b0VxdWFsKHRydWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc1ZhbHVlKGxhYmVsVGV4dCkge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGxldCBsYWJlbCA9IGVsZW1lbnQuZmluZChgYjpjb250YWlucygnJHtsYWJlbFRleHR9JylgKTtcbiAgICAgICAgcmV0dXJuIChsYWJlbC5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBpdCgnZGlzcGxheXMgdGhlIG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIHRlc3RWYWx1ZSgnQ2VydGlmaWNhdGlvbicsIGNlcnRpZmljYXRpb25JdGVtLmNlcnRpZmljYXRpb25OYW1lKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgY2VydGlmaWVyJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VmFsdWUoJ0NlcnRpZmllcicsIGNlcnRpZmljYXRpb25JdGVtLmNlcnRpZmllcik7XG4gICAgfSk7XG5cbiAgICBpdCgnZGlzcGxheXMgdGhlIGFjdGlvbiBzdGF0dXMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChoYXNWYWx1ZSgnRGVjaXNpb24nKSkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgZ3JhbnVsYXJpdHknLCAoKSA9PiB7XG4gICAgICAgIHRlc3RWYWx1ZSgnR3JhbnVsYXJpdHknLCBjZXJ0aWZpY2F0aW9uSXRlbS5jZXJ0aWZpY2F0aW9uR3JhbnVsYXJpdHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rpc3BsYXlzIHRoZSBjZXJ0aWZpY2F0aW9uRGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGhhc1ZhbHVlKCdEYXRlJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGlzcGxheXMgdGhlIGNlcnRpZmljYXRpb25GaW5pc2hEYXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoaGFzVmFsdWUoJ0RlY2lzaW9uIERhdGUnKSkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgY2VydGlmaWNhdGlvbk1pdGlnYXRpb25FeHBpcmF0aW9uRGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGhhc1ZhbHVlKCdNaXRpZ2F0aW9uIEVuZCBEYXRlJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
