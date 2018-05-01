System.register(['test/js/TestInitializer', 'test/js/common/i18n/MockTranslateFilter', 'common/identity/entitlement/IdentityEntitlementModule', 'test/js/common/identity/entitlement/EntitlementTestData'], function (_export) {
    'use strict';

    var entitlementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_testJsCommonI18nMockTranslateFilter) {}, function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }, function (_testJsCommonIdentityEntitlementEntitlementTestData) {}],
        execute: function () {

            describe('IdentityEntitlementRequestItemDetailPanelDirective', function () {

                var eltDef = '<sp-identity-entitlement-request-item-detail-panel sp-request-item="requestItem"/>';

                var IdentityEntitlementIdentityRequestItemDTO = undefined,
                    entitlementTestData = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    element = undefined,
                    requestItem = undefined,
                    navigationService = undefined;

                beforeEach(module(entitlementModule));

                beforeEach(inject(function (_$compile_, $rootScope, _IdentityEntitlementIdentityRequestItemDTO_, spTranslateFilter, _entitlementTestData_, _navigationService_) {
                    $compile = _$compile_;
                    IdentityEntitlementIdentityRequestItemDTO = _IdentityEntitlementIdentityRequestItemDTO_;
                    entitlementTestData = _entitlementTestData_;
                    $scope = $rootScope.$new();
                    navigationService = _navigationService_;

                    spTranslateFilter.configureCatalog({
                        'ui_entitlement_details_request_details': 'Access Request',
                        'ui_entitlement_details_date': 'Date',
                        'ui_entitlement_request_item_details_status': 'Execution Status',
                        'ui_entitlement_request_item_details_request_id': 'Request ID',
                        'ui_entitlement_request_item_details_operation': 'Operation',
                        'ui_entitlement_request_item_details_requester': 'Requester'
                    });

                    requestItem = new IdentityEntitlementIdentityRequestItemDTO(entitlementTestData.REQUESTITEM1);
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement() {
                    var elt = arguments.length <= 0 || arguments[0] === undefined ? eltDef : arguments[0];

                    element = angular.element(elt);
                    $scope.requestItem = requestItem;
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

                it('displays the date', function () {
                    expect(hasValue('Date')).toEqual(true);
                });

                it('displays the executionStatus', function () {
                    testValue('Execution Status', requestItem.executionStatus);
                });

                it('displays the action trimmedRequestId', function () {
                    testValue('Request ID', requestItem.trimmedRequestId);
                });

                it('displays the operation', function () {
                    testValue('Operation', requestItem.operation);
                });

                it('displays the requester', function () {
                    testValue('Requester', requestItem.requester);
                });

                it('should call through to navigationService.go on link click', function () {
                    createElement();
                    var link = element.find('a');
                    spyOn(navigationService, 'go');
                    link.click();
                    expect(navigationService.go).toHaveBeenCalledWith({
                        outcome: 'viewAccessRequestDetail#/request/' + requestItem.requestId
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9JZGVudGl0eUVudGl0bGVtZW50UmVxdWVzdEl0ZW1EZXRhaWxQYW5lbERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwyQ0FBMkMseURBQXlELDREQUE0RCxVQUFVLFNBQVM7SUFDM047O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHNDQUFzQyxJQUFJLFVBQVUscURBQXFEO1lBQy9KLG9CQUFvQixvREFBb0Q7V0FDekUsVUFBVSxxREFBcUQ7UUFDbEUsU0FBUyxZQUFZOztZQUg3QixTQUFTLHNEQUFzRCxZQUFNOztnQkFFakUsSUFBSSxTQUFTOztnQkFFYixJQUFJLDRDQUF5QztvQkFBRSxzQkFBbUI7b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLFVBQU87b0JBQUUsY0FBVztvQkFDdEcsb0JBQWlCOztnQkFFckIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLDZDQUE2QyxtQkFDckUsdUJBQXVCLHFCQUF3QjtvQkFDOUQsV0FBVztvQkFDWCw0Q0FBNEM7b0JBQzVDLHNCQUFzQjtvQkFDdEIsU0FBUyxXQUFXO29CQUNwQixvQkFBb0I7O29CQUVwQixrQkFBa0IsaUJBQWlCO3dCQUMvQiwwQ0FBMEM7d0JBQzFDLCtCQUErQjt3QkFDL0IsOENBQThDO3dCQUM5QyxrREFBa0Q7d0JBQ2xELGlEQUFpRDt3QkFDakQsaURBQWlEOzs7b0JBR3JELGNBQWMsSUFBSSwwQ0FBMEMsb0JBQW9COzs7Z0JBR3BGLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxnQkFBNEI7b0JBVXJCLElBVk8sTUFBRyxVQUFBLFVBQUEsS0FBQSxVQUFBLE9BQUEsWUFBRyxTQUFNLFVBQUE7O29CQUMvQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxjQUFjO29CQUNyQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsVUFBVSxXQUFXLGVBQWU7b0JBQ3pDO29CQUNBLElBQUksUUFBUSxRQUFRLEtBQUksa0JBQWdCLFlBQVM7b0JBQ2pELE9BQU8sTUFBTSxRQUFRLFFBQVE7b0JBQzdCLE9BQU8sTUFBTSxTQUFTLE9BQU8sT0FBTyxTQUFTLGdCQUFnQixRQUFROzs7Z0JBR3pFLFNBQVMsU0FBUyxXQUFXO29CQUN6QjtvQkFDQSxJQUFJLFFBQVEsUUFBUSxLQUFJLGtCQUFnQixZQUFTO29CQUNqRCxPQUFRLE1BQU0sU0FBUzs7O2dCQUczQixHQUFHLHFCQUFxQixZQUFNO29CQUMxQixPQUFPLFNBQVMsU0FBUyxRQUFROzs7Z0JBR3JDLEdBQUcsZ0NBQWdDLFlBQU07b0JBQ3JDLFVBQVUsb0JBQW9CLFlBQVk7OztnQkFHOUMsR0FBRyx3Q0FBd0MsWUFBTTtvQkFDN0MsVUFBVSxjQUFjLFlBQVk7OztnQkFHeEMsR0FBRywwQkFBMEIsWUFBTTtvQkFDL0IsVUFBVSxhQUFhLFlBQVk7OztnQkFHdkMsR0FBRywwQkFBMEIsWUFBTTtvQkFDL0IsVUFBVSxhQUFhLFlBQVk7OztnQkFHdkMsR0FBRyw2REFBNkQsWUFBVztvQkFDdkU7b0JBQ0EsSUFBSSxPQUFPLFFBQVEsS0FBSTtvQkFDdkIsTUFBTSxtQkFBbUI7b0JBQ3pCLEtBQUs7b0JBQ0wsT0FBTyxrQkFBa0IsSUFBSSxxQkFBcUI7d0JBQzlDLFNBQU8sc0NBQXNDLFlBQVk7Ozs7OztHQWlCbEUiLCJmaWxlIjoiY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0lkZW50aXR5RW50aXRsZW1lbnRSZXF1ZXN0SXRlbURldGFpbFBhbmVsRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcbmltcG9ydCBlbnRpdGxlbWVudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvSWRlbnRpdHlFbnRpdGxlbWVudE1vZHVsZSc7XG5pbXBvcnQgJ3Rlc3QvanMvY29tbW9uL2lkZW50aXR5L2VudGl0bGVtZW50L0VudGl0bGVtZW50VGVzdERhdGEnO1xuXG5kZXNjcmliZSgnSWRlbnRpdHlFbnRpdGxlbWVudFJlcXVlc3RJdGVtRGV0YWlsUGFuZWxEaXJlY3RpdmUnLCAoKSA9PiB7XG5cbiAgICBsZXQgZWx0RGVmID0gJzxzcC1pZGVudGl0eS1lbnRpdGxlbWVudC1yZXF1ZXN0LWl0ZW0tZGV0YWlsLXBhbmVsIHNwLXJlcXVlc3QtaXRlbT1cInJlcXVlc3RJdGVtXCIvPic7XG5cbiAgICBsZXQgSWRlbnRpdHlFbnRpdGxlbWVudElkZW50aXR5UmVxdWVzdEl0ZW1EVE8sIGVudGl0bGVtZW50VGVzdERhdGEsICRjb21waWxlLCAkc2NvcGUsIGVsZW1lbnQsIHJlcXVlc3RJdGVtLFxuICAgICAgICBuYXZpZ2F0aW9uU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVudGl0bGVtZW50TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSwgX0lkZW50aXR5RW50aXRsZW1lbnRJZGVudGl0eVJlcXVlc3RJdGVtRFRPXywgc3BUcmFuc2xhdGVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIF9lbnRpdGxlbWVudFRlc3REYXRhXywgX25hdmlnYXRpb25TZXJ2aWNlXykgPT4ge1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgIElkZW50aXR5RW50aXRsZW1lbnRJZGVudGl0eVJlcXVlc3RJdGVtRFRPID0gX0lkZW50aXR5RW50aXRsZW1lbnRJZGVudGl0eVJlcXVlc3RJdGVtRFRPXztcbiAgICAgICAgZW50aXRsZW1lbnRUZXN0RGF0YSA9IF9lbnRpdGxlbWVudFRlc3REYXRhXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIG5hdmlnYXRpb25TZXJ2aWNlID0gX25hdmlnYXRpb25TZXJ2aWNlXztcblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICd1aV9lbnRpdGxlbWVudF9kZXRhaWxzX3JlcXVlc3RfZGV0YWlscyc6ICdBY2Nlc3MgUmVxdWVzdCcsXG4gICAgICAgICAgICAndWlfZW50aXRsZW1lbnRfZGV0YWlsc19kYXRlJzogJ0RhdGUnLFxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X3JlcXVlc3RfaXRlbV9kZXRhaWxzX3N0YXR1cyc6ICdFeGVjdXRpb24gU3RhdHVzJyxcbiAgICAgICAgICAgICd1aV9lbnRpdGxlbWVudF9yZXF1ZXN0X2l0ZW1fZGV0YWlsc19yZXF1ZXN0X2lkJzogJ1JlcXVlc3QgSUQnLFxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X3JlcXVlc3RfaXRlbV9kZXRhaWxzX29wZXJhdGlvbic6ICdPcGVyYXRpb24nLFxuICAgICAgICAgICAgJ3VpX2VudGl0bGVtZW50X3JlcXVlc3RfaXRlbV9kZXRhaWxzX3JlcXVlc3Rlcic6ICdSZXF1ZXN0ZXInXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RJdGVtID0gbmV3IElkZW50aXR5RW50aXRsZW1lbnRJZGVudGl0eVJlcXVlc3RJdGVtRFRPKGVudGl0bGVtZW50VGVzdERhdGEuUkVRVUVTVElURU0xKTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbHQgPSBlbHREZWYpIHtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbHQpO1xuICAgICAgICAkc2NvcGUucmVxdWVzdEl0ZW0gPSByZXF1ZXN0SXRlbTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVzdFZhbHVlKGxhYmVsVGV4dCwgZXhwZWN0ZWRWYWx1ZSkge1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGxldCBsYWJlbCA9IGVsZW1lbnQuZmluZChgYjpjb250YWlucygnJHtsYWJlbFRleHR9JylgKTtcbiAgICAgICAgZXhwZWN0KGxhYmVsLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGxhYmVsLnBhcmVudCgpLnRleHQoKS50cmltKCkuZW5kc1dpdGgoZXhwZWN0ZWRWYWx1ZSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzVmFsdWUobGFiZWxUZXh0KSB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgbGV0IGxhYmVsID0gZWxlbWVudC5maW5kKGBiOmNvbnRhaW5zKCcke2xhYmVsVGV4dH0nKWApO1xuICAgICAgICByZXR1cm4gKGxhYmVsLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgZGF0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGhhc1ZhbHVlKCdEYXRlJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZGlzcGxheXMgdGhlIGV4ZWN1dGlvblN0YXR1cycsICgpID0+IHtcbiAgICAgICAgdGVzdFZhbHVlKCdFeGVjdXRpb24gU3RhdHVzJywgcmVxdWVzdEl0ZW0uZXhlY3V0aW9uU3RhdHVzKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgYWN0aW9uIHRyaW1tZWRSZXF1ZXN0SWQnLCAoKSA9PiB7XG4gICAgICAgIHRlc3RWYWx1ZSgnUmVxdWVzdCBJRCcsIHJlcXVlc3RJdGVtLnRyaW1tZWRSZXF1ZXN0SWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rpc3BsYXlzIHRoZSBvcGVyYXRpb24nLCAoKSA9PiB7XG4gICAgICAgIHRlc3RWYWx1ZSgnT3BlcmF0aW9uJywgcmVxdWVzdEl0ZW0ub3BlcmF0aW9uKTtcbiAgICB9KTtcblxuICAgIGl0KCdkaXNwbGF5cyB0aGUgcmVxdWVzdGVyJywgKCkgPT4ge1xuICAgICAgICB0ZXN0VmFsdWUoJ1JlcXVlc3RlcicsIHJlcXVlc3RJdGVtLnJlcXVlc3Rlcik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNhbGwgdGhyb3VnaCB0byBuYXZpZ2F0aW9uU2VydmljZS5nbyBvbiBsaW5rIGNsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgbGV0IGxpbmsgPSBlbGVtZW50LmZpbmQoYGFgKTtcbiAgICAgICAgc3B5T24obmF2aWdhdGlvblNlcnZpY2UsICdnbycpO1xuICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgIGV4cGVjdChuYXZpZ2F0aW9uU2VydmljZS5nbykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgb3V0Y29tZTogYHZpZXdBY2Nlc3NSZXF1ZXN0RGV0YWlsIy9yZXF1ZXN0LyR7cmVxdWVzdEl0ZW0ucmVxdWVzdElkfWBcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
