System.register(['test/js/TestInitializer', 'common/form/FormModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var formModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spLinkAttributeValueSuggest', function () {
                var $scope = undefined,
                    $compile = undefined,
                    $timeout = undefined,
                    appAttributeSuggestService = undefined,
                    suggestTestService = undefined,
                    resultValues = [{
                    name: 'value1',
                    displayName: 'Value One'
                }, {
                    name: 'value2',
                    displayName: 'Value Two'
                }],
                    elementDefinition = '<sp-link-attribute-value-suggest ng-model="ngModel"\n                                  sp-link-attribute-value-suggest-application="{{application}}"\n                                  sp-link-attribute-value-suggest-attribute="{{attribute}}"\n                                  sp-link-attribute-value-suggest-is-permission="isPermission"\n                                  sp-link-attribute-value-suggest-limit="{{limit}}" />';

                beforeEach(module(testModule, formModule));

                beforeEach(inject(function ($rootScope, _$compile_, _$timeout_, $q, _appAttributeSuggestService_, _suggestTestService_) {
                    $compile = _$compile_;
                    $timeout = _$timeout_;
                    appAttributeSuggestService = _appAttributeSuggestService_;
                    suggestTestService = _suggestTestService_;

                    $scope = $rootScope.$new();
                    $scope.ngModel = {};
                    $scope.application = 'App1';
                    $scope.attribute = 'Attr1';
                    $scope.isPermission = false;
                    $scope.limit = '8';

                    spyOn(appAttributeSuggestService, 'getApplicationAttributeValues').and.callFake(function () {
                        return $q.when(resultValues);
                    });
                }));

                afterEach(function () {
                    angular.element('sp-link-attribute-value-suggest').remove();
                });

                function createElement(elementDefinition) {
                    var element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                    angular.element('body').append(element);
                    return element;
                }

                it('throws if no ngModel defined', function () {
                    expect(function () {
                        return createElement('<sp-link-attribute-value-suggest />');
                    }).toThrow();
                });

                it('calls through to appAttributeSuggestService to get suggest values', function () {
                    var element = createElement(elementDefinition);
                    suggestTestService.searchByTyping(element, 'val', $scope);
                    expect(appAttributeSuggestService.getApplicationAttributeValues).toHaveBeenCalledWith($scope.application, $scope.attribute, $scope.isPermission, undefined, $scope.limit, 'val');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0xpbmtBdHRyaWJ1dGVWYWx1ZVN1Z2dlc3REaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMEJBQTBCLHVCQUF1QixVQUFVLFNBQVM7OztJQUc1Rzs7SUFFQSxJQUFJLFlBQVk7SUFDaEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsK0JBQStCLFlBQU07Z0JBQzFDLElBQUksU0FBTTtvQkFBRSxXQUFRO29CQUFFLFdBQVE7b0JBQUUsNkJBQTBCO29CQUFFLHFCQUFrQjtvQkFDMUUsZUFBZSxDQUFDO29CQUNaLE1BQU07b0JBQ04sYUFBYTttQkFDZjtvQkFDRSxNQUFNO29CQUNOLGFBQWE7O29CQUNiLG9CQUFpQjs7Z0JBTXpCLFdBQVcsT0FBTyxZQUFZOztnQkFFOUIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLFlBQVksSUFDcEMsOEJBQThCLHNCQUFzQjtvQkFDM0UsV0FBVztvQkFDWCxXQUFXO29CQUNYLDZCQUE2QjtvQkFDN0IscUJBQXFCOztvQkFFckIsU0FBUyxXQUFXO29CQUNwQixPQUFPLFVBQVU7b0JBQ2pCLE9BQU8sY0FBYztvQkFDckIsT0FBTyxZQUFZO29CQUNuQixPQUFPLGVBQWU7b0JBQ3RCLE9BQU8sUUFBUTs7b0JBRWYsTUFBTSw0QkFBNEIsaUNBQWlDLElBQUksU0FBUyxZQUFNO3dCQUNsRixPQUFPLEdBQUcsS0FBSzs7OztnQkFJdkIsVUFBVSxZQUFXO29CQUNqQixRQUFRLFFBQVEsbUNBQW1DOzs7Z0JBR3ZELFNBQVMsY0FBYyxtQkFBbUI7b0JBQ3RDLElBQUksVUFBVSxTQUFTLFFBQVEsUUFBUSxvQkFBb0I7b0JBQzNELE9BQU87b0JBQ1AsUUFBUSxRQUFRLFFBQVEsT0FBTztvQkFDL0IsT0FBTzs7O2dCQUdYLEdBQUcsZ0NBQWdDLFlBQU07b0JBQ3JDLE9BQU8sWUFBQTt3QkFTUyxPQVRILGNBQWM7dUJBQXdDOzs7Z0JBR3ZFLEdBQUcscUVBQXFFLFlBQU07b0JBQzFFLElBQUksVUFBVSxjQUFjO29CQUM1QixtQkFBbUIsZUFBZSxTQUFTLE9BQU87b0JBQ2xELE9BQU8sMkJBQTJCLCtCQUM3QixxQkFBcUIsT0FBTyxhQUFhLE9BQU8sV0FBVyxPQUFPLGNBQ25FLFdBQVcsT0FBTyxPQUFPOzs7OztHQWFsQyIsImZpbGUiOiJjb21tb24vZm9ybS9MaW5rQXR0cmlidXRlVmFsdWVTdWdnZXN0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcExpbmtBdHRyaWJ1dGVWYWx1ZVN1Z2dlc3QnLCAoKSA9PiB7XG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsICR0aW1lb3V0LCBhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZSwgc3VnZ2VzdFRlc3RTZXJ2aWNlLFxuICAgICAgICByZXN1bHRWYWx1ZXMgPSBbe1xuICAgICAgICAgICAgbmFtZTogJ3ZhbHVlMScsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1ZhbHVlIE9uZSdcbiAgICAgICAgfSx7XG4gICAgICAgICAgICBuYW1lOiAndmFsdWUyJyxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVmFsdWUgVHdvJ1xuICAgICAgICB9XSwgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLWxpbmstYXR0cmlidXRlLXZhbHVlLXN1Z2dlc3QgbmctbW9kZWw9XCJuZ01vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1saW5rLWF0dHJpYnV0ZS12YWx1ZS1zdWdnZXN0LWFwcGxpY2F0aW9uPVwie3thcHBsaWNhdGlvbn19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1saW5rLWF0dHJpYnV0ZS12YWx1ZS1zdWdnZXN0LWF0dHJpYnV0ZT1cInt7YXR0cmlidXRlfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwLWxpbmstYXR0cmlidXRlLXZhbHVlLXN1Z2dlc3QtaXMtcGVybWlzc2lvbj1cImlzUGVybWlzc2lvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3AtbGluay1hdHRyaWJ1dGUtdmFsdWUtc3VnZ2VzdC1saW1pdD1cInt7bGltaXR9fVwiIC8+YDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRlc3RNb2R1bGUsIGZvcm1Nb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8sIF8kdGltZW91dF8sICRxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZV8sIF9zdWdnZXN0VGVzdFNlcnZpY2VfKSB7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHRpbWVvdXQgPSBfJHRpbWVvdXRfO1xuICAgICAgICBhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZSA9IF9hcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZV87XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZSA9IF9zdWdnZXN0VGVzdFNlcnZpY2VfO1xuXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAkc2NvcGUubmdNb2RlbCA9IHt9O1xuICAgICAgICAkc2NvcGUuYXBwbGljYXRpb24gPSAnQXBwMSc7XG4gICAgICAgICRzY29wZS5hdHRyaWJ1dGUgPSAnQXR0cjEnO1xuICAgICAgICAkc2NvcGUuaXNQZXJtaXNzaW9uID0gZmFsc2U7XG4gICAgICAgICRzY29wZS5saW1pdCA9ICc4JztcblxuICAgICAgICBzcHlPbihhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZSwgJ2dldEFwcGxpY2F0aW9uQXR0cmlidXRlVmFsdWVzJykuYW5kLmNhbGxGYWtlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkcS53aGVuKHJlc3VsdFZhbHVlcyk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCdzcC1saW5rLWF0dHJpYnV0ZS12YWx1ZS1zdWdnZXN0JykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gJGNvbXBpbGUoYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKSkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGl0KCd0aHJvd3MgaWYgbm8gbmdNb2RlbCBkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCgnPHNwLWxpbmstYXR0cmlidXRlLXZhbHVlLXN1Z2dlc3QgLz4nKSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHRocm91Z2ggdG8gYXBwQXR0cmlidXRlU3VnZ2VzdFNlcnZpY2UgdG8gZ2V0IHN1Z2dlc3QgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2Uuc2VhcmNoQnlUeXBpbmcoZWxlbWVudCwgJ3ZhbCcsICRzY29wZSk7XG4gICAgICAgIGV4cGVjdChhcHBBdHRyaWJ1dGVTdWdnZXN0U2VydmljZS5nZXRBcHBsaWNhdGlvbkF0dHJpYnV0ZVZhbHVlcylcbiAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCgkc2NvcGUuYXBwbGljYXRpb24sICRzY29wZS5hdHRyaWJ1dGUsICRzY29wZS5pc1Blcm1pc3Npb24sXG4gICAgICAgICAgICB1bmRlZmluZWQsICRzY29wZS5saW1pdCwgJ3ZhbCcpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
