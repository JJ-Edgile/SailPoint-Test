System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/TestModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('spCertificationItemEntitlementFilter', function () {

                var template = '<sp-certification-item-entitlement-filter ng-model="filterValue" ' + 'sp-filter="filter" sp-id="{{ filterId }}" />',
                    namesResult = [{
                    id: 'perm1',
                    isPermission: true,
                    displayName: 'perm1'
                }, {
                    id: 'attr1',
                    displayName: 'attr1'
                }],
                    valuesResult = [{
                    id: 'value1',
                    displayName: 'value1'
                }],
                    certId = 'cert1234',
                    certificationItemSuggestService = undefined,
                    $scope = undefined,
                    $compile = undefined,
                    suggestTestService = undefined,
                    Certification = undefined,
                    $controller = undefined;

                beforeEach(module(certificationModule, testModule));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_certificationItemSuggestService_, $rootScope, _$compile_, Filter, $q, ListResultDTO, certificationDataService, _suggestTestService_, _Certification_, _$controller_) {
                    certificationItemSuggestService = _certificationItemSuggestService_;
                    $controller = _$controller_;
                    Certification = _Certification_;
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    suggestTestService = _suggestTestService_;

                    $scope.filter = new Filter({
                        attributes: {
                            application: 'App1'
                        },
                        property: 'App1'
                    });

                    $scope.filterValue = {};
                    $scope.filterId = 'filterId';

                    spyOn(certificationItemSuggestService, 'getEntitlementNames').and.returnValue($q.when(new ListResultDTO({
                        count: 2,
                        objects: namesResult
                    })));

                    spyOn(certificationItemSuggestService, 'getEntitlementValues').and.returnValue($q.when(new ListResultDTO({
                        count: 1,
                        objects: valuesResult
                    })));

                    spyOn(certificationItemSuggestService, 'getObjects').and.callThrough();

                    certificationDataService.initialize({
                        id: certId,
                        type: Certification.Type.Manager
                    });
                }));

                function createElement() {
                    var element = angular.element(template);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('renders two suggests', function () {
                    var element = createElement();
                    expect(element.find('sp-object-suggest').length).toEqual(2);
                });

                it('calls through to certificationItemSuggestService for name suggest', function () {
                    var element = createElement(),
                        nameSuggest = angular.element(element.find('sp-object-suggest')[0]);
                    suggestTestService.clickDropdownArrow(nameSuggest, $scope);
                    expect(certificationItemSuggestService.getObjects).toHaveBeenCalled();
                    var args = certificationItemSuggestService.getObjects.calls.mostRecent().args;
                    expect(args.length >= 4).toEqual(true);
                    expect(args[3].suggestFunc).toEqual('getEntitlementNames');
                    expect(args[3].certId).toEqual(certId);
                    expect(args[3].application).toEqual($scope.filter.attributes.application);
                });

                it('calls through to certificationItemSuggestService for value suggest with updated params', function () {
                    var element = createElement(),
                        nameSuggest = angular.element(element.find('sp-object-suggest')[0]),
                        valueSuggest = angular.element(element.find('sp-object-suggest')[1]);
                    suggestTestService.selectSuggestItem(nameSuggest, 0, $scope);
                    $scope.$apply();
                    certificationItemSuggestService.getObjects.calls.reset();
                    suggestTestService.clickDropdownArrow(valueSuggest, $scope);
                    expect(certificationItemSuggestService.getObjects).toHaveBeenCalled();
                    var args = certificationItemSuggestService.getObjects.calls.mostRecent().args;
                    expect(args.length >= 4).toEqual(true);
                    expect(args[3].suggestFunc).toEqual('getEntitlementValues');
                    expect(args[3].certId).toEqual(certId);
                    expect(args[3].application).toEqual($scope.filter.attributes.application);
                    expect(args[3].name).toEqual(namesResult[0].id);
                    expect(args[3].isPermission).toEqual(namesResult[0].isPermission);
                });

                it('sets application and additionalEntitlement flag on ngModel when created', function () {
                    createElement();
                    expect($scope.filterValue).toBeDefined();
                    expect($scope.filterValue.application).toEqual($scope.filter.attributes.application);
                    expect($scope.filterValue.additionalEntitlement).toEqual(true);
                });

                it('sets name, value and isPermission on the ngModel', function () {
                    var element = createElement(),
                        nameSuggest = angular.element(element.find('sp-object-suggest')[0]),
                        valueSuggest = angular.element(element.find('sp-object-suggest')[1]);
                    suggestTestService.selectSuggestItem(nameSuggest, 0, $scope);
                    $scope.$apply();
                    suggestTestService.selectSuggestItem(valueSuggest, 0, $scope);
                    $scope.$apply();
                    expect($scope.filterValue).toBeDefined();
                    expect($scope.filterValue.name).toEqual(namesResult[0].id);
                    expect($scope.filterValue.isPermission).toEqual(namesResult[0].isPermission);
                    expect($scope.filterValue.value).toEqual(valuesResult[0].id);
                });

                it('clears value from ngModel and value suggest if name selection changes', function () {
                    var element = createElement(),
                        nameSuggest = angular.element(element.find('sp-object-suggest')[0]),
                        valueSuggest = angular.element(element.find('sp-object-suggest')[1]);
                    suggestTestService.selectSuggestItem(nameSuggest, 0, $scope);
                    $scope.$apply();
                    suggestTestService.selectSuggestItem(valueSuggest, 0, $scope);
                    $scope.$apply();
                    suggestTestService.selectSuggestItem(nameSuggest, 1, $scope);
                    $scope.$apply();
                    expect($scope.filterValue.value).not.toBeDefined();
                });

                it('disables value suggest if no name is selected', function () {
                    var element = createElement(),
                        valueSuggest = angular.element(element.find('sp-object-suggest')[1]);
                    expect(angular.element(valueSuggest.find('sp-typeahead-input')[0]).attr('disabled')).toEqual('disabled');
                });

                describe('controller', function () {
                    function createController() {
                        var ctrl = $controller('CertificationItemEntitlementFilterCtrl', {}, { spFilter: $scope.filter });
                        ctrl.$onInit();
                        return ctrl;
                    }

                    it('isValueEnabled', function () {
                        var ctrl = createController();
                        ctrl.ngModel = undefined;
                        expect(ctrl.isValueEnabled()).toEqual(false);

                        ctrl.ngModel = { foo: 'bar' };
                        expect(ctrl.isValueEnabled()).toEqual(false);

                        ctrl.ngModel = { name: 'a name' };
                        expect(ctrl.isValueEnabled()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1FbnRpdGxlbWVudEZpbHRlckRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsdUJBQXVCLFVBQVUsU0FBUzs7O0lBR3ZIOztJQUVBLElBQUkscUJBQXFCO0lBQ3pCLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsbUJBQW1CO1lBQzVCLGFBQWEsa0JBQWtCOztRQUVuQyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsd0NBQXdDLFlBQU07O2dCQUVuRCxJQUFJLFdBQVcsc0VBQ1A7b0JBQ0osY0FBYyxDQUFDO29CQUNYLElBQUk7b0JBQ0osY0FBYztvQkFDZCxhQUFhO21CQUNmO29CQUNFLElBQUk7b0JBQ0osYUFBYTs7b0JBQ2IsZUFBZSxDQUFDO29CQUNoQixJQUFJO29CQUNKLGFBQWE7O29CQUVqQixTQUFTO29CQUNULGtDQUErQjtvQkFBRSxTQUFNO29CQUFFLFdBQVE7b0JBQUUscUJBQWtCO29CQUFFLGdCQUFhO29CQUFFLGNBQVc7O2dCQUVyRyxXQUFXLE9BQU8scUJBQXFCOzs7Z0JBR3ZDLFdBQVcsT0FBTyxVQUFDLG1DQUFtQyxZQUFZLFlBQVksUUFBUSxJQUFJLGVBQ3ZFLDBCQUEwQixzQkFBc0IsaUJBQWlCLGVBQWtCO29CQUNsRyxrQ0FBa0M7b0JBQ2xDLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLFNBQVMsV0FBVztvQkFDcEIscUJBQXFCOztvQkFFckIsT0FBTyxTQUFTLElBQUksT0FBTzt3QkFDdkIsWUFBWTs0QkFDUixhQUFhOzt3QkFFakIsVUFBVTs7O29CQUdkLE9BQU8sY0FBYztvQkFDckIsT0FBTyxXQUFXOztvQkFFbEIsTUFBTSxpQ0FBaUMsdUJBQXVCLElBQUksWUFBWSxHQUFH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bUJBQW1CLGtCQUFrQixhQUFhLEdBQUc7b0JBQ3JELE9BQU87b0JBQ1AsbUJBQW1CLGtCQUFrQixjQUFjLEdBQUc7b0JBQ3RELE9BQU87b0JBQ1AsbUJBQW1CLGtCQUFrQixhQUFhLEdBQUc7b0JBQ3JELE9BQU87b0JBQ1AsT0FBTyxPQUFPLFlBQVksT0FBTyxJQUFJOzs7Z0JBR3pDLEdBQUcsaURBQWlELFlBQU07b0JBQ3RELElBQUksVUFBVTt3QkFDVixlQUFlLFFBQVEsUUFBUSxRQUFRLEtBQUsscUJBQXFCO29CQUNyRSxPQUFPLFFBQVEsUUFBUSxhQUFhLEtBQUssc0JBQXNCLElBQUksS0FBSyxhQUFhLFFBQVE7OztnQkFHakcsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLFNBQVMsbUJBQW1CO3dCQUN4QixJQUFJLE9BQU8sWUFBWSwwQ0FBMEMsSUFBSSxFQUFDLFVBQVUsT0FBTzt3QkFDdkYsS0FBSzt3QkFDTCxPQUFPOzs7b0JBR1gsR0FBRyxrQkFBa0IsWUFBTTt3QkFDdkIsSUFBSSxPQUFPO3dCQUNYLEtBQUssVUFBVTt3QkFDZixPQUFPLEtBQUssa0JBQWtCLFFBQVE7O3dCQUV0QyxLQUFLLFVBQVUsRUFBQyxLQUFLO3dCQUNyQixPQUFPLEtBQUssa0JBQWtCLFFBQVE7O3dCQUV0QyxLQUFLLFVBQVUsRUFBQyxNQUFNO3dCQUN0QixPQUFPLEtBQUssa0JBQWtCLFFBQVE7Ozs7OztHQWtCL0MiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uSXRlbUVudGl0bGVtZW50RmlsdGVyRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ3NwQ2VydGlmaWNhdGlvbkl0ZW1FbnRpdGxlbWVudEZpbHRlcicsICgpID0+IHtcblxuICAgIGxldCB0ZW1wbGF0ZSA9ICc8c3AtY2VydGlmaWNhdGlvbi1pdGVtLWVudGl0bGVtZW50LWZpbHRlciBuZy1tb2RlbD1cImZpbHRlclZhbHVlXCIgJyArXG4gICAgICAgICAgICAnc3AtZmlsdGVyPVwiZmlsdGVyXCIgc3AtaWQ9XCJ7eyBmaWx0ZXJJZCB9fVwiIC8+JyxcbiAgICAgICAgbmFtZXNSZXN1bHQgPSBbe1xuICAgICAgICAgICAgaWQ6ICdwZXJtMScsXG4gICAgICAgICAgICBpc1Blcm1pc3Npb246IHRydWUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3Blcm0xJ1xuICAgICAgICB9LHtcbiAgICAgICAgICAgIGlkOiAnYXR0cjEnLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdhdHRyMSdcbiAgICAgICAgfV0sIHZhbHVlc1Jlc3VsdCA9IFt7XG4gICAgICAgICAgICBpZDogJ3ZhbHVlMScsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ3ZhbHVlMSdcbiAgICAgICAgfV0sXG4gICAgICAgIGNlcnRJZCA9ICdjZXJ0MTIzNCcsXG4gICAgICAgIGNlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UsICRzY29wZSwgJGNvbXBpbGUsIHN1Z2dlc3RUZXN0U2VydmljZSwgQ2VydGlmaWNhdGlvbiwgJGNvbnRyb2xsZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiAxMCAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZV8sICRyb290U2NvcGUsIF8kY29tcGlsZV8sIEZpbHRlciwgJHEsIExpc3RSZXN1bHREVE8sXG4gICAgICAgICAgICAgICAgICAgICAgIGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgX3N1Z2dlc3RUZXN0U2VydmljZV8sIF9DZXJ0aWZpY2F0aW9uXywgXyRjb250cm9sbGVyXykgPT4ge1xuICAgICAgICBjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZSA9IF9zdWdnZXN0VGVzdFNlcnZpY2VfO1xuXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBuZXcgRmlsdGVyKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogJ0FwcDEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcGVydHk6ICdBcHAxJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkc2NvcGUuZmlsdGVyVmFsdWUgPSB7fTtcbiAgICAgICAgJHNjb3BlLmZpbHRlcklkID0gJ2ZpbHRlcklkJztcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnROYW1lcycpLmFuZC5yZXR1cm5WYWx1ZSgkcS53aGVuKG5ldyBMaXN0UmVzdWx0RFRPKHtcbiAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgb2JqZWN0czogbmFtZXNSZXN1bHRcbiAgICAgICAgfSkpKTtcblxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnRWYWx1ZXMnKS5hbmQucmV0dXJuVmFsdWUoJHEud2hlbihuZXcgTGlzdFJlc3VsdERUTyh7XG4gICAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAgIG9iamVjdHM6IHZhbHVlc1Jlc3VsdFxuICAgICAgICB9KSkpO1xuXG4gICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UsICdnZXRPYmplY3RzJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLmluaXRpYWxpemUoe1xuICAgICAgICAgICAgaWQ6IGNlcnRJZCxcbiAgICAgICAgICAgIHR5cGU6IENlcnRpZmljYXRpb24uVHlwZS5NYW5hZ2VyXG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBpdCgncmVuZGVycyB0d28gc3VnZ2VzdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdzcC1vYmplY3Qtc3VnZ2VzdCcpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGNlcnRpZmljYXRpb25JdGVtU3VnZ2VzdFNlcnZpY2UgZm9yIG5hbWUgc3VnZ2VzdCcsICgpID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICBuYW1lU3VnZ2VzdCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoJ3NwLW9iamVjdC1zdWdnZXN0JylbMF0pO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2UuY2xpY2tEcm9wZG93bkFycm93KG5hbWVTdWdnZXN0LCAkc2NvcGUpO1xuICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGxldCBhcmdzID0gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICBleHBlY3QoYXJncy5sZW5ndGggPj0gNCkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGFyZ3NbM10uc3VnZ2VzdEZ1bmMpLnRvRXF1YWwoJ2dldEVudGl0bGVtZW50TmFtZXMnKTtcbiAgICAgICAgZXhwZWN0KGFyZ3NbM10uY2VydElkKS50b0VxdWFsKGNlcnRJZCk7XG4gICAgICAgIGV4cGVjdChhcmdzWzNdLmFwcGxpY2F0aW9uKS50b0VxdWFsKCRzY29wZS5maWx0ZXIuYXR0cmlidXRlcy5hcHBsaWNhdGlvbik7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uSXRlbVN1Z2dlc3RTZXJ2aWNlIGZvciB2YWx1ZSBzdWdnZXN0IHdpdGggdXBkYXRlZCBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgbmFtZVN1Z2dlc3QgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdzcC1vYmplY3Qtc3VnZ2VzdCcpWzBdKSxcbiAgICAgICAgICAgIHZhbHVlU3VnZ2VzdCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoJ3NwLW9iamVjdC1zdWdnZXN0JylbMV0pO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2Uuc2VsZWN0U3VnZ2VzdEl0ZW0obmFtZVN1Z2dlc3QsIDAsICRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzLmNhbGxzLnJlc2V0KCk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5jbGlja0Ryb3Bkb3duQXJyb3codmFsdWVTdWdnZXN0LCAkc2NvcGUpO1xuICAgICAgICBleHBlY3QoY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGxldCBhcmdzID0gY2VydGlmaWNhdGlvbkl0ZW1TdWdnZXN0U2VydmljZS5nZXRPYmplY3RzLmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzO1xuICAgICAgICBleHBlY3QoYXJncy5sZW5ndGggPj0gNCkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGFyZ3NbM10uc3VnZ2VzdEZ1bmMpLnRvRXF1YWwoJ2dldEVudGl0bGVtZW50VmFsdWVzJyk7XG4gICAgICAgIGV4cGVjdChhcmdzWzNdLmNlcnRJZCkudG9FcXVhbChjZXJ0SWQpO1xuICAgICAgICBleHBlY3QoYXJnc1szXS5hcHBsaWNhdGlvbikudG9FcXVhbCgkc2NvcGUuZmlsdGVyLmF0dHJpYnV0ZXMuYXBwbGljYXRpb24pO1xuICAgICAgICBleHBlY3QoYXJnc1szXS5uYW1lKS50b0VxdWFsKG5hbWVzUmVzdWx0WzBdLmlkKTtcbiAgICAgICAgZXhwZWN0KGFyZ3NbM10uaXNQZXJtaXNzaW9uKS50b0VxdWFsKG5hbWVzUmVzdWx0WzBdLmlzUGVybWlzc2lvbik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2V0cyBhcHBsaWNhdGlvbiBhbmQgYWRkaXRpb25hbEVudGl0bGVtZW50IGZsYWcgb24gbmdNb2RlbCB3aGVuIGNyZWF0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS5maWx0ZXJWYWx1ZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS5maWx0ZXJWYWx1ZS5hcHBsaWNhdGlvbikudG9FcXVhbCgkc2NvcGUuZmlsdGVyLmF0dHJpYnV0ZXMuYXBwbGljYXRpb24pO1xuICAgICAgICBleHBlY3QoJHNjb3BlLmZpbHRlclZhbHVlLmFkZGl0aW9uYWxFbnRpdGxlbWVudCkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXRzIG5hbWUsIHZhbHVlIGFuZCBpc1Blcm1pc3Npb24gb24gdGhlIG5nTW9kZWwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgbmFtZVN1Z2dlc3QgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdzcC1vYmplY3Qtc3VnZ2VzdCcpWzBdKSxcbiAgICAgICAgICAgIHZhbHVlU3VnZ2VzdCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50LmZpbmQoJ3NwLW9iamVjdC1zdWdnZXN0JylbMV0pO1xuICAgICAgICBzdWdnZXN0VGVzdFNlcnZpY2Uuc2VsZWN0U3VnZ2VzdEl0ZW0obmFtZVN1Z2dlc3QsIDAsICRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKHZhbHVlU3VnZ2VzdCwgMCwgJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLmZpbHRlclZhbHVlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLmZpbHRlclZhbHVlLm5hbWUpLnRvRXF1YWwobmFtZXNSZXN1bHRbMF0uaWQpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLmZpbHRlclZhbHVlLmlzUGVybWlzc2lvbikudG9FcXVhbChuYW1lc1Jlc3VsdFswXS5pc1Blcm1pc3Npb24pO1xuICAgICAgICBleHBlY3QoJHNjb3BlLmZpbHRlclZhbHVlLnZhbHVlKS50b0VxdWFsKHZhbHVlc1Jlc3VsdFswXS5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2xlYXJzIHZhbHVlIGZyb20gbmdNb2RlbCBhbmQgdmFsdWUgc3VnZ2VzdCBpZiBuYW1lIHNlbGVjdGlvbiBjaGFuZ2VzJywgKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgIG5hbWVTdWdnZXN0ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuZmluZCgnc3Atb2JqZWN0LXN1Z2dlc3QnKVswXSksXG4gICAgICAgICAgICB2YWx1ZVN1Z2dlc3QgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdzcC1vYmplY3Qtc3VnZ2VzdCcpWzFdKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKG5hbWVTdWdnZXN0LCAwLCAkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHN1Z2dlc3RUZXN0U2VydmljZS5zZWxlY3RTdWdnZXN0SXRlbSh2YWx1ZVN1Z2dlc3QsIDAsICRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgc3VnZ2VzdFRlc3RTZXJ2aWNlLnNlbGVjdFN1Z2dlc3RJdGVtKG5hbWVTdWdnZXN0LCAxLCAkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUuZmlsdGVyVmFsdWUudmFsdWUpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rpc2FibGVzIHZhbHVlIHN1Z2dlc3QgaWYgbm8gbmFtZSBpcyBzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXG4gICAgICAgICAgICB2YWx1ZVN1Z2dlc3QgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdzcC1vYmplY3Qtc3VnZ2VzdCcpWzFdKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudCh2YWx1ZVN1Z2dlc3QuZmluZCgnc3AtdHlwZWFoZWFkLWlucHV0JylbMF0pLmF0dHIoJ2Rpc2FibGVkJykpLnRvRXF1YWwoJ2Rpc2FibGVkJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcigpIHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gJGNvbnRyb2xsZXIoJ0NlcnRpZmljYXRpb25JdGVtRW50aXRsZW1lbnRGaWx0ZXJDdHJsJywge30sIHtzcEZpbHRlcjogJHNjb3BlLmZpbHRlcn0pO1xuICAgICAgICAgICAgY3RybC4kb25Jbml0KCk7XG4gICAgICAgICAgICByZXR1cm4gY3RybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdpc1ZhbHVlRW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgY3RybC5uZ01vZGVsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNWYWx1ZUVuYWJsZWQoKSkudG9FcXVhbChmYWxzZSk7XG5cbiAgICAgICAgICAgIGN0cmwubmdNb2RlbCA9IHtmb286ICdiYXInfTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLmlzVmFsdWVFbmFibGVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuXG4gICAgICAgICAgICBjdHJsLm5nTW9kZWwgPSB7bmFtZTogJ2EgbmFtZSd9O1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuaXNWYWx1ZUVuYWJsZWQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
