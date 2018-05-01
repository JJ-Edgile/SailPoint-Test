System.register(['test/js/TestInitializer', 'common/identity/entitlement/IdentityEntitlementModule', './EntitlementTestData'], function (_export) {
    'use strict';

    var entitlementModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonIdentityEntitlementIdentityEntitlementModule) {
            entitlementModule = _commonIdentityEntitlementIdentityEntitlementModule['default'];
        }, function (_EntitlementTestData) {}],
        execute: function () {

            describe('EntitlementsTableDirective', function () {

                var eltDef = '<sp-entitlements-table sp-entitlements="entitlements" sp-hide-header="hideHeader"' + ' sp-show-details-func="showDetailsFunc(entitlement)">' + '</sp-entitlements-table>';

                var $compile = undefined,
                    $scope = undefined,
                    entitlementService = undefined,
                    browserUtil = undefined,
                    element = undefined,
                    ent1 = undefined,
                    ent2 = undefined,
                    ent3 = undefined,
                    ent4 = undefined,
                    ent5 = undefined,
                    ent6 = undefined,
                    ent7 = undefined,
                    ent8 = undefined,
                    ent9 = undefined,
                    ent10 = undefined,
                    isXs = undefined;

                beforeEach(module(entitlementModule));

                beforeEach(inject(function (_$compile_, $rootScope, Entitlement, entitlementTestData, _entitlementService_, _browserUtil_) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    entitlementService = _entitlementService_;
                    browserUtil = _browserUtil_;

                    // Ent1 and ent2 are the same attribute.  Ent3 is not.
                    ent1 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent2 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent3 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent4 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent5 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent6 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent7 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent8 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent9 = new Entitlement(entitlementTestData.ENTITLEMENT1);
                    ent10 = new Entitlement(entitlementTestData.ENTITLEMENT1);

                    ent2.displayValue = 'something new';
                    ent3.attribute = 'a different attribute';
                    ent4.attribute = '4';
                    ent5.attribute = '5';
                    ent6.attribute = '6';
                    ent7.attribute = '7';
                    ent8.attribute = '7';
                    ent9.attribute = '9';
                    ent10.attribute = '10';

                    isXs = false;
                    spyOn(browserUtil, 'isXs').and.callFake(function () {
                        return isXs;
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile(entitlements, hideHeader, showDetailsFunc) {
                    var definition = arguments.length <= 3 || arguments[3] === undefined ? eltDef : arguments[3];

                    $scope.entitlements = entitlements;
                    $scope.hideHeader = !!hideHeader;
                    $scope.showDetailsFunc = showDetailsFunc;

                    element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('pukes with no entitlements', function () {
                    expect(function () {
                        return compile(null);
                    }).toThrow();
                });

                describe('header', function () {
                    function getTitle() {
                        return element.find('.panel-title').text().trim();
                    }

                    it('sets the title based on entitlementService getAccountLabel', function () {
                        var title = entitlementService.getAccountLabel(ent1.application, ent1.accountName, ent1.nativeIdentity, ent1.instance);
                        spyOn(entitlementService, 'getAccountLabel').and.callThrough();
                        compile([ent1]);
                        expect(entitlementService.getAccountLabel).toHaveBeenCalledWith(ent1.application, ent1.accountName, ent1.nativeIdentity, ent1.instance);
                        expect(getTitle()).toEqual(title);
                    });

                    it('hides the header if sp-hide-header is set', function () {
                        compile([ent1], true);
                        expect(element.find('.panel-title').length).toEqual(0);
                    });
                });

                function getAttributes() {
                    var attrs = [];
                    var rows = element.find('tbody > tr');
                    rows.each(function (idx, row) {
                        var attr = angular.element(angular.element(row).children()[0]).text().trim();
                        attrs.push(attr);
                    });
                    return attrs;
                }

                it('only renders the same attribute name once', function () {
                    compile([ent1, ent2]);
                    var attrs = getAttributes();
                    expect(attrs.length).toEqual(2);
                    expect(attrs[0]).toEqual(ent1.attribute);
                    expect(attrs[1]).toEqual('');
                });

                it('renders the new attribute name when attribute name changes', function () {
                    compile([ent1, ent2, ent3]);
                    var attrs = getAttributes();
                    expect(attrs.length).toEqual(3);
                    expect(attrs[2]).toEqual(ent3.attribute);
                });

                it('renders all attribute names if XS screen size', function () {
                    isXs = true;
                    compile([ent1, ent2]);
                    var attrs = getAttributes();
                    expect(attrs.length).toEqual(2);
                    expect(attrs[0]).toEqual(ent1.attribute);
                    expect(attrs[1]).toEqual(ent2.attribute);
                });

                it('adds a divider when the attribute name changes', function () {
                    compile([ent1, ent2, ent3]);
                    var rows = element.find('tbody > tr');
                    expect(rows.length).toEqual(3);
                    expect(angular.element(rows[2]).hasClass('first-of-attribute')).toEqual(true);
                });

                it('calls showDetailsFunc when a group entitlement name is clicked', function () {
                    var showDetailsFunc = function (entitlement) {
                        return entitlement;
                    };
                    ent2.group = false;
                    compile([ent1, ent2], true, showDetailsFunc);
                    spyOn($scope, 'showDetailsFunc');
                    var nameLink = element.find('tbody > tr > td a');
                    expect(nameLink.length).toEqual(1);
                    angular.element(nameLink[0]).click();
                    $scope.$apply();
                    expect($scope.showDetailsFunc).toHaveBeenCalledWith(ent1);
                });

                it('does not show link if no showDetailFunc is specified', function () {
                    var noDetailsFuncDef = '<sp-entitlements-table sp-entitlements="entitlements" sp-hide-header="hideHeader" />';
                    compile([ent1, ent2], true, undefined, noDetailsFuncDef);
                    var nameLink = element.find('tbody > tr > td a');
                    expect(nameLink.length).toEqual(0);
                });

                it('does not show link if entitlement is not a group', function () {
                    ent1.group = false;
                    compile([ent1], true, undefined);
                    var nameLink = element.find('tbody > tr > td a');
                    expect(nameLink.length).toEqual(0);
                });

                it('does not show link if entitlement has no managed attribute id', function () {
                    delete ent1.managedAttributeId;
                    compile([ent1], true, undefined);
                    var nameLink = element.find('tbody > tr > td a');
                    expect(nameLink.length).toEqual(0);
                });

                describe('pagination', function () {

                    it('is not displayed if there is only one page', function () {
                        compile([ent1, ent2], true, undefined);
                        var pagination = element.find('.pagination');
                        expect(pagination.length).toEqual(0);
                    });

                    it('is displayed if there is more than one page', function () {
                        compile([ent1, ent2, ent3, ent4, ent5, ent6, ent7], true, undefined);
                        var pagination = element.find('.pagination');
                        expect(pagination.length).toEqual(1);
                    });

                    it('shows the attribute name on the next page even if its the same for the previous entitlement\n            on the page before', function () {

                        // list of 8 entitlements
                        compile([ent3, ent4, ent5, ent6, ent7, ent8, ent9, ent10], true, undefined);
                        var pagination = element.find('.pagination');
                        expect(pagination.length).toEqual(1);
                        var attrs = getAttributes();
                        // 5 entitlements displayed on the first page
                        expect(attrs.length).toEqual(5);
                        var buttons = pagination.find('a');
                        var nextButton = angular.element(buttons[buttons.length - 1]);
                        // click for next page
                        nextButton.click();
                        attrs = getAttributes();
                        expect(attrs.length).toEqual(3);
                        // ent7 and ent8 have same attribute names
                        // attribute name will always be displayed for the first element
                        expect(attrs[0]).toEqual(ent8.attribute);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9FbnRpdGxlbWVudHNUYWJsZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQix5REFBeUQsMEJBQTBCLFVBQVUsU0FBUztJQUM5STs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUscURBQXFEO1lBQzNHLG9CQUFvQixvREFBb0Q7V0FDekUsVUFBVSxzQkFBc0I7UUFDbkMsU0FBUyxZQUFZOztZQUo3QixTQUFTLDhCQUE4QixZQUFNOztnQkFFekMsSUFBSSxTQUFTLHNGQUNULDBEQUNBOztnQkFFSixJQUFJLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxxQkFBa0I7b0JBQUUsY0FBVztvQkFBRSxVQUFPO29CQUFFLE9BQUk7b0JBQUUsT0FBSTtvQkFBRSxPQUFJO29CQUM1RSxPQUFJO29CQUFFLE9BQUk7b0JBQUUsT0FBSTtvQkFBRSxPQUFJO29CQUFFLE9BQUk7b0JBQUUsT0FBSTtvQkFBRSxRQUFLO29CQUFFLE9BQUk7O2dCQUVuRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVksYUFBYSxxQkFBcUIsc0JBQzFELGVBQWtCO29CQUNqQyxXQUFXO29CQUNYLFNBQVMsV0FBVztvQkFDcEIscUJBQXFCO29CQUNyQixjQUFjOzs7b0JBR2QsT0FBTyxJQUFJLFlBQVksb0JBQW9CO29CQUMzQyxPQUFPLElBQUksWUFBWSxvQkFBb0I7b0JBQzNDLE9BQU8sSUFBSSxZQUFZLG9CQUFvQjtvQkFDM0MsT0FBTyxJQUFJLFlBQVksb0JBQW9CO29CQUMzQyxPQUFPLElBQUksWUFBWSxvQkFBb0I7b0JBQzNDLE9BQU8sSUFBSSxZQUFZLG9CQUFvQjtvQkFDM0MsT0FBTyxJQUFJLFlBQVksb0JBQW9CO29CQUMzQyxPQUFPLElBQUksWUFBWSxvQkFBb0I7b0JBQzNDLE9BQU8sSUFBSSxZQUFZLG9CQUFvQjtvQkFDM0MsUUFBUSxJQUFJLFlBQVksb0JBQW9COztvQkFFNUMsS0FBSyxlQUFlO29CQUNwQixLQUFLLFlBQVk7b0JBQ2pCLEtBQUssWUFBWTtvQkFDakIsS0FBSyxZQUFZO29CQUNqQixLQUFLLFlBQVk7b0JBQ2pCLEtBQUssWUFBWTtvQkFDakIsS0FBSyxZQUFZO29CQUNqQixLQUFLLFlBQVk7b0JBQ2pCLE1BQU0sWUFBWTs7b0JBRWxCLE9BQU87b0JBQ1AsTUFBTSxhQUFhLFFBQVEsSUFBSSxTQUFTLFlBQUE7d0JBa0J4QixPQWxCOEI7Ozs7Z0JBR2xELFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxRQUFRLGNBQWMsWUFBWSxpQkFBc0M7b0JBb0JqRSxJQXBCNEMsYUFBVSxVQUFBLFVBQUEsS0FBQSxVQUFBLE9BQUEsWUFBRyxTQUFNLFVBQUE7O29CQUMzRSxPQUFPLGVBQWU7b0JBQ3RCLE9BQU8sYUFBYSxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sa0JBQWtCOztvQkFFekIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLEdBQUcsOEJBQThCLFlBQU07b0JBQ25DLE9BQU8sWUFBQTt3QkFzQlMsT0F0QkgsUUFBUTt1QkFBTzs7O2dCQUdoQyxTQUFTLFVBQVUsWUFBTTtvQkFDckIsU0FBUyxXQUFXO3dCQUNoQixPQUFPLFFBQVEsS0FBSyxnQkFBZ0IsT0FBTzs7O29CQUcvQyxHQUFHLDhEQUE4RCxZQUFNO3dCQUNuRSxJQUFJLFFBQVEsbUJBQW1CLGdCQUFnQixLQUFLLGFBQWEsS0FBSyxhQUNsRSxLQUFLLGdCQUFnQixLQUFLO3dCQUM5QixNQUFNLG9CQUFvQixtQkFBbUIsSUFBSTt3QkFDakQsUUFBUSxDQUFFO3dCQUNWLE9BQU8sbUJBQW1CLGlCQUFpQixxQkFBcUIsS0FBSyxhQUFhLEtBQUssYUFDbkYsS0FBSyxnQkFBZ0IsS0FBSzt3QkFDOUIsT0FBTyxZQUFZLFFBQVE7OztvQkFHL0IsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsUUFBUSxDQUFFLE9BQVE7d0JBQ2xCLE9BQU8sUUFBUSxLQUFLLGdCQUFnQixRQUFRLFFBQVE7Ozs7Z0JBSTVELFNBQVMsZ0JBQWdCO29CQUNyQixJQUFJLFFBQVE7b0JBQ1osSUFBSSxPQUFPLFFBQVEsS0FBSztvQkFDeEIsS0FBSyxLQUFLLFVBQUMsS0FBSyxLQUFRO3dCQUNwQixJQUFJLE9BQU8sUUFBUSxRQUFRLFFBQVEsUUFBUSxLQUFLLFdBQVcsSUFBSSxPQUFPO3dCQUN0RSxNQUFNLEtBQUs7O29CQUVmLE9BQU87OztnQkFHWCxHQUFHLDZDQUE2QyxZQUFNO29CQUNsRCxRQUFRLENBQUUsTUFBTTtvQkFDaEIsSUFBSSxRQUFRO29CQUNaLE9BQU8sTUFBTSxRQUFRLFFBQVE7b0JBQzdCLE9BQU8sTUFBTSxJQUFJLFFBQVEsS0FBSztvQkFDOUIsT0FBTyxNQUFNLElBQUksUUFBUTs7O2dCQUc3QixHQUFHLDhEQUE4RCxZQUFNO29CQUNuRSxRQUFRLENBQUUsTUFBTSxNQUFNO29CQUN0QixJQUFJLFFBQVE7b0JBQ1osT0FBTyxNQUFNLFFBQVEsUUFBUTtvQkFDN0IsT0FBTyxNQUFNLElBQUksUUFBUSxLQUFLOzs7Z0JBR2xDLEdBQUcsaURBQWlELFlBQU07b0JBQ3RELE9BQU87b0JBQ1AsUUFBUSxDQUFFLE1BQU07b0JBQ2hCLElBQUksUUFBUTtvQkFDWixPQUFPLE1BQU0sUUFBUSxRQUFRO29CQUM3QixPQUFPLE1BQU0sSUFBSSxRQUFRLEtBQUs7b0JBQzlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsS0FBSzs7O2dCQUdsQyxHQUFHLGtEQUFrRCxZQUFNO29CQUN2RCxRQUFRLENBQUUsTUFBTSxNQUFNO29CQUN0QixJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFRO29CQUM1QixPQUFPLFFBQVEsUUFBUSxLQUFLLElBQUksU0FBUyx1QkFBdUIsUUFBUTs7O2dCQUc1RSxHQUFHLGtFQUFrRSxZQUFNO29CQUN2RSxJQUFJLGtCQUFrQixVQUFDLGFBQVc7d0JBc0JsQixPQXRCdUI7O29CQUN2QyxLQUFLLFFBQVE7b0JBQ2IsUUFBUSxDQUFFLE1BQU0sT0FBUSxNQUFNO29CQUM5QixNQUFNLFFBQVE7b0JBQ2QsSUFBSSxXQUFXLFFBQVEsS0FBSztvQkFDNUIsT0FBTyxTQUFTLFFBQVEsUUFBUTtvQkFDaEMsUUFBUSxRQUFRLFNBQVMsSUFBSTtvQkFDN0IsT0FBTztvQkFDUCxPQUFPLE9BQU8saUJBQWlCLHFCQUFxQjs7O2dCQUd4RCxHQUFHLHdEQUF3RCxZQUFNO29CQUM3RCxJQUFJLG1CQUFtQjtvQkFDdkIsUUFBUSxDQUFFLE1BQU0sT0FBUSxNQUFNLFdBQVc7b0JBQ3pDLElBQUksV0FBVyxRQUFRLEtBQUs7b0JBQzVCLE9BQU8sU0FBUyxRQUFRLFFBQVE7OztnQkFHcEMsR0FBRyxvREFBb0QsWUFBTTtvQkFDekQsS0FBSyxRQUFRO29CQUNiLFFBQVEsQ0FBRSxPQUFPLE1BQU07b0JBQ3ZCLElBQUksV0FBVyxRQUFRLEtBQUs7b0JBQzVCLE9BQU8sU0FBUyxRQUFRLFFBQVE7OztnQkFHcEMsR0FBRyxpRUFBaUUsWUFBTTtvQkFDdEUsT0FBTyxLQUFLO29CQUNaLFFBQVEsQ0FBRSxPQUFRLE1BQU07b0JBQ3hCLElBQUksV0FBVyxRQUFRLEtBQUs7b0JBQzVCLE9BQU8sU0FBUyxRQUFRLFFBQVE7OztnQkFHcEMsU0FBUyxjQUFjLFlBQVc7O29CQUU5QixHQUFHLDhDQUE4QyxZQUFXO3dCQUN4RCxRQUFRLENBQUUsTUFBTSxPQUFRLE1BQU07d0JBQzlCLElBQUksYUFBYSxRQUFRLEtBQUs7d0JBQzlCLE9BQU8sV0FBVyxRQUFRLFFBQVE7OztvQkFHdEMsR0FBRywrQ0FBK0MsWUFBVzt3QkFDekQsUUFBUSxDQUFFLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE9BQVEsTUFBTTt3QkFDNUQsSUFBSSxhQUFhLFFBQVEsS0FBSzt3QkFDOUIsT0FBTyxXQUFXLFFBQVEsUUFBUTs7O29CQUd0QyxHQUFFLCtIQUN1QixZQUFXOzs7d0JBR2hDLFFBQVEsQ0FBRSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLFFBQVMsTUFBTTt3QkFDbkUsSUFBSSxhQUFhLFFBQVEsS0FBSzt3QkFDOUIsT0FBTyxXQUFXLFFBQVEsUUFBUTt3QkFDbEMsSUFBSSxRQUFROzt3QkFFWixPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixJQUFJLFVBQVUsV0FBVyxLQUFLO3dCQUM5QixJQUFJLGFBQWEsUUFBUSxRQUFRLFFBQVEsUUFBUSxTQUFTOzt3QkFFMUQsV0FBVzt3QkFDWCxRQUFRO3dCQUNSLE9BQU8sTUFBTSxRQUFRLFFBQVE7Ozt3QkFHN0IsT0FBTyxNQUFNLElBQUksUUFBUSxLQUFLOzs7Ozs7R0E0QnZDIiwiZmlsZSI6ImNvbW1vbi9pZGVudGl0eS9lbnRpdGxlbWVudC9FbnRpdGxlbWVudHNUYWJsZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBlbnRpdGxlbWVudE1vZHVsZSBmcm9tICdjb21tb24vaWRlbnRpdHkvZW50aXRsZW1lbnQvSWRlbnRpdHlFbnRpdGxlbWVudE1vZHVsZSc7XHJcbmltcG9ydCAnLi9FbnRpdGxlbWVudFRlc3REYXRhJztcclxuXHJcbmRlc2NyaWJlKCdFbnRpdGxlbWVudHNUYWJsZURpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgZWx0RGVmID0gJzxzcC1lbnRpdGxlbWVudHMtdGFibGUgc3AtZW50aXRsZW1lbnRzPVwiZW50aXRsZW1lbnRzXCIgc3AtaGlkZS1oZWFkZXI9XCJoaWRlSGVhZGVyXCInICtcclxuICAgICAgICAnIHNwLXNob3ctZGV0YWlscy1mdW5jPVwic2hvd0RldGFpbHNGdW5jKGVudGl0bGVtZW50KVwiPicgK1xyXG4gICAgICAgICc8L3NwLWVudGl0bGVtZW50cy10YWJsZT4nO1xyXG5cclxuICAgIGxldCAkY29tcGlsZSwgJHNjb3BlLCBlbnRpdGxlbWVudFNlcnZpY2UsIGJyb3dzZXJVdGlsLCBlbGVtZW50LCBlbnQxLCBlbnQyLCBlbnQzLFxyXG4gICAgICAgIGVudDQsIGVudDUsIGVudDYsIGVudDcsIGVudDgsIGVudDksIGVudDEwLCBpc1hzO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGVudGl0bGVtZW50TW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsIEVudGl0bGVtZW50LCBlbnRpdGxlbWVudFRlc3REYXRhLCBfZW50aXRsZW1lbnRTZXJ2aWNlXyxcclxuICAgICAgICAgICAgICAgICAgICAgICBfYnJvd3NlclV0aWxfKSA9PiB7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGVudGl0bGVtZW50U2VydmljZSA9IF9lbnRpdGxlbWVudFNlcnZpY2VfO1xyXG4gICAgICAgIGJyb3dzZXJVdGlsID0gX2Jyb3dzZXJVdGlsXztcclxuXHJcbiAgICAgICAgLy8gRW50MSBhbmQgZW50MiBhcmUgdGhlIHNhbWUgYXR0cmlidXRlLiAgRW50MyBpcyBub3QuXHJcbiAgICAgICAgZW50MSA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50MiA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50MyA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50NCA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50NSA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50NiA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50NyA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50OCA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50OSA9IG5ldyBFbnRpdGxlbWVudChlbnRpdGxlbWVudFRlc3REYXRhLkVOVElUTEVNRU5UMSk7XHJcbiAgICAgICAgZW50MTAgPSBuZXcgRW50aXRsZW1lbnQoZW50aXRsZW1lbnRUZXN0RGF0YS5FTlRJVExFTUVOVDEpO1xyXG5cclxuICAgICAgICBlbnQyLmRpc3BsYXlWYWx1ZSA9ICdzb21ldGhpbmcgbmV3JztcclxuICAgICAgICBlbnQzLmF0dHJpYnV0ZSA9ICdhIGRpZmZlcmVudCBhdHRyaWJ1dGUnO1xyXG4gICAgICAgIGVudDQuYXR0cmlidXRlID0gJzQnO1xyXG4gICAgICAgIGVudDUuYXR0cmlidXRlID0gJzUnO1xyXG4gICAgICAgIGVudDYuYXR0cmlidXRlID0gJzYnO1xyXG4gICAgICAgIGVudDcuYXR0cmlidXRlID0gJzcnO1xyXG4gICAgICAgIGVudDguYXR0cmlidXRlID0gJzcnO1xyXG4gICAgICAgIGVudDkuYXR0cmlidXRlID0gJzknO1xyXG4gICAgICAgIGVudDEwLmF0dHJpYnV0ZSA9ICcxMCc7XHJcblxyXG4gICAgICAgIGlzWHMgPSBmYWxzZTtcclxuICAgICAgICBzcHlPbihicm93c2VyVXRpbCwgJ2lzWHMnKS5hbmQuY2FsbEZha2UoKCkgPT4gaXNYcyk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoZW50aXRsZW1lbnRzLCBoaWRlSGVhZGVyLCBzaG93RGV0YWlsc0Z1bmMsIGRlZmluaXRpb24gPSBlbHREZWYpIHtcclxuICAgICAgICAkc2NvcGUuZW50aXRsZW1lbnRzID0gZW50aXRsZW1lbnRzO1xyXG4gICAgICAgICRzY29wZS5oaWRlSGVhZGVyID0gISFoaWRlSGVhZGVyO1xyXG4gICAgICAgICRzY29wZS5zaG93RGV0YWlsc0Z1bmMgPSBzaG93RGV0YWlsc0Z1bmM7XHJcblxyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdwdWtlcyB3aXRoIG5vIGVudGl0bGVtZW50cycsICgpID0+IHtcclxuICAgICAgICBleHBlY3QoKCkgPT4gY29tcGlsZShudWxsKSkudG9UaHJvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2hlYWRlcicsICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRUaXRsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnLnBhbmVsLXRpdGxlJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdzZXRzIHRoZSB0aXRsZSBiYXNlZCBvbiBlbnRpdGxlbWVudFNlcnZpY2UgZ2V0QWNjb3VudExhYmVsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBlbnRpdGxlbWVudFNlcnZpY2UuZ2V0QWNjb3VudExhYmVsKGVudDEuYXBwbGljYXRpb24sIGVudDEuYWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbnQxLm5hdGl2ZUlkZW50aXR5LCBlbnQxLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgc3B5T24oZW50aXRsZW1lbnRTZXJ2aWNlLCAnZ2V0QWNjb3VudExhYmVsJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGNvbXBpbGUoWyBlbnQxIF0pO1xyXG4gICAgICAgICAgICBleHBlY3QoZW50aXRsZW1lbnRTZXJ2aWNlLmdldEFjY291bnRMYWJlbCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoZW50MS5hcHBsaWNhdGlvbiwgZW50MS5hY2NvdW50TmFtZSxcclxuICAgICAgICAgICAgICAgIGVudDEubmF0aXZlSWRlbnRpdHksIGVudDEuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBleHBlY3QoZ2V0VGl0bGUoKSkudG9FcXVhbCh0aXRsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdoaWRlcyB0aGUgaGVhZGVyIGlmIHNwLWhpZGUtaGVhZGVyIGlzIHNldCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29tcGlsZShbIGVudDEgXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5wYW5lbC10aXRsZScpLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgICAgbGV0IGF0dHJzID0gW107XHJcbiAgICAgICAgbGV0IHJvd3MgPSBlbGVtZW50LmZpbmQoJ3Rib2R5ID4gdHInKTtcclxuICAgICAgICByb3dzLmVhY2goKGlkeCwgcm93KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhdHRyID0gYW5ndWxhci5lbGVtZW50KGFuZ3VsYXIuZWxlbWVudChyb3cpLmNoaWxkcmVuKClbMF0pLnRleHQoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGF0dHJzLnB1c2goYXR0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dHJzO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdvbmx5IHJlbmRlcnMgdGhlIHNhbWUgYXR0cmlidXRlIG5hbWUgb25jZScsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKFsgZW50MSwgZW50MiBdKTtcclxuICAgICAgICBsZXQgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgZXhwZWN0KGF0dHJzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QoYXR0cnNbMF0pLnRvRXF1YWwoZW50MS5hdHRyaWJ1dGUpO1xyXG4gICAgICAgIGV4cGVjdChhdHRyc1sxXSkudG9FcXVhbCgnJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgbmV3IGF0dHJpYnV0ZSBuYW1lIHdoZW4gYXR0cmlidXRlIG5hbWUgY2hhbmdlcycsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKFsgZW50MSwgZW50MiwgZW50MyBdKTtcclxuICAgICAgICBsZXQgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgZXhwZWN0KGF0dHJzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICBleHBlY3QoYXR0cnNbMl0pLnRvRXF1YWwoZW50My5hdHRyaWJ1dGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgYWxsIGF0dHJpYnV0ZSBuYW1lcyBpZiBYUyBzY3JlZW4gc2l6ZScsICgpID0+IHtcclxuICAgICAgICBpc1hzID0gdHJ1ZTtcclxuICAgICAgICBjb21waWxlKFsgZW50MSwgZW50MiBdKTtcclxuICAgICAgICBsZXQgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgZXhwZWN0KGF0dHJzLmxlbmd0aCkudG9FcXVhbCgyKTtcclxuICAgICAgICBleHBlY3QoYXR0cnNbMF0pLnRvRXF1YWwoZW50MS5hdHRyaWJ1dGUpO1xyXG4gICAgICAgIGV4cGVjdChhdHRyc1sxXSkudG9FcXVhbChlbnQyLmF0dHJpYnV0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnYWRkcyBhIGRpdmlkZXIgd2hlbiB0aGUgYXR0cmlidXRlIG5hbWUgY2hhbmdlcycsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKFsgZW50MSwgZW50MiwgZW50MyBdKTtcclxuICAgICAgICBsZXQgcm93cyA9IGVsZW1lbnQuZmluZCgndGJvZHkgPiB0cicpO1xyXG4gICAgICAgIGV4cGVjdChyb3dzLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KHJvd3NbMl0pLmhhc0NsYXNzKCdmaXJzdC1vZi1hdHRyaWJ1dGUnKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdjYWxscyBzaG93RGV0YWlsc0Z1bmMgd2hlbiBhIGdyb3VwIGVudGl0bGVtZW50IG5hbWUgaXMgY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgc2hvd0RldGFpbHNGdW5jID0gKGVudGl0bGVtZW50KSA9PiBlbnRpdGxlbWVudDtcclxuICAgICAgICBlbnQyLmdyb3VwID0gZmFsc2U7XHJcbiAgICAgICAgY29tcGlsZShbIGVudDEsIGVudDIgXSwgdHJ1ZSwgc2hvd0RldGFpbHNGdW5jKTtcclxuICAgICAgICBzcHlPbigkc2NvcGUsICdzaG93RGV0YWlsc0Z1bmMnKTtcclxuICAgICAgICBsZXQgbmFtZUxpbmsgPSBlbGVtZW50LmZpbmQoJ3Rib2R5ID4gdHIgPiB0ZCBhJyk7XHJcbiAgICAgICAgZXhwZWN0KG5hbWVMaW5rLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICBhbmd1bGFyLmVsZW1lbnQobmFtZUxpbmtbMF0pLmNsaWNrKCk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIGV4cGVjdCgkc2NvcGUuc2hvd0RldGFpbHNGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChlbnQxKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkb2VzIG5vdCBzaG93IGxpbmsgaWYgbm8gc2hvd0RldGFpbEZ1bmMgaXMgc3BlY2lmaWVkJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBub0RldGFpbHNGdW5jRGVmID0gJzxzcC1lbnRpdGxlbWVudHMtdGFibGUgc3AtZW50aXRsZW1lbnRzPVwiZW50aXRsZW1lbnRzXCIgc3AtaGlkZS1oZWFkZXI9XCJoaWRlSGVhZGVyXCIgLz4nO1xyXG4gICAgICAgIGNvbXBpbGUoWyBlbnQxLCBlbnQyIF0sIHRydWUsIHVuZGVmaW5lZCwgbm9EZXRhaWxzRnVuY0RlZik7XHJcbiAgICAgICAgbGV0IG5hbWVMaW5rID0gZWxlbWVudC5maW5kKCd0Ym9keSA+IHRyID4gdGQgYScpO1xyXG4gICAgICAgIGV4cGVjdChuYW1lTGluay5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3Qgc2hvdyBsaW5rIGlmIGVudGl0bGVtZW50IGlzIG5vdCBhIGdyb3VwJywgKCkgPT4ge1xyXG4gICAgICAgIGVudDEuZ3JvdXAgPSBmYWxzZTtcclxuICAgICAgICBjb21waWxlKFsgZW50MV0sIHRydWUsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgbGV0IG5hbWVMaW5rID0gZWxlbWVudC5maW5kKCd0Ym9keSA+IHRyID4gdGQgYScpO1xyXG4gICAgICAgIGV4cGVjdChuYW1lTGluay5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZG9lcyBub3Qgc2hvdyBsaW5rIGlmIGVudGl0bGVtZW50IGhhcyBubyBtYW5hZ2VkIGF0dHJpYnV0ZSBpZCcsICgpID0+IHtcclxuICAgICAgICBkZWxldGUgZW50MS5tYW5hZ2VkQXR0cmlidXRlSWQ7XHJcbiAgICAgICAgY29tcGlsZShbIGVudDEgXSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICBsZXQgbmFtZUxpbmsgPSBlbGVtZW50LmZpbmQoJ3Rib2R5ID4gdHIgPiB0ZCBhJyk7XHJcbiAgICAgICAgZXhwZWN0KG5hbWVMaW5rLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdwYWdpbmF0aW9uJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgZGlzcGxheWVkIGlmIHRoZXJlIGlzIG9ubHkgb25lIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29tcGlsZShbIGVudDEsIGVudDIgXSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBlbGVtZW50LmZpbmQoJy5wYWdpbmF0aW9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmF0aW9uLmxlbmd0aCkudG9FcXVhbCgwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGRpc3BsYXllZCBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHBhZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29tcGlsZShbIGVudDEsIGVudDIsIGVudDMsIGVudDQsIGVudDUsIGVudDYsIGVudDcgXSwgdHJ1ZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBlbGVtZW50LmZpbmQoJy5wYWdpbmF0aW9uJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChwYWdpbmF0aW9uLmxlbmd0aCkudG9FcXVhbCgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoYHNob3dzIHRoZSBhdHRyaWJ1dGUgbmFtZSBvbiB0aGUgbmV4dCBwYWdlIGV2ZW4gaWYgaXRzIHRoZSBzYW1lIGZvciB0aGUgcHJldmlvdXMgZW50aXRsZW1lbnRcclxuICAgICAgICAgICAgb24gdGhlIHBhZ2UgYmVmb3JlYCwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBsaXN0IG9mIDggZW50aXRsZW1lbnRzXHJcbiAgICAgICAgICAgIGNvbXBpbGUoWyBlbnQzLCBlbnQ0LCBlbnQ1LCBlbnQ2LCBlbnQ3LCBlbnQ4LCBlbnQ5LCBlbnQxMCBdLCB0cnVlLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGVsZW1lbnQuZmluZCgnLnBhZ2luYXRpb24nKTtcclxuICAgICAgICAgICAgZXhwZWN0KHBhZ2luYXRpb24ubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgICAgICBsZXQgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgIC8vIDUgZW50aXRsZW1lbnRzIGRpc3BsYXllZCBvbiB0aGUgZmlyc3QgcGFnZVxyXG4gICAgICAgICAgICBleHBlY3QoYXR0cnMubGVuZ3RoKS50b0VxdWFsKDUpO1xyXG4gICAgICAgICAgICBsZXQgYnV0dG9ucyA9IHBhZ2luYXRpb24uZmluZCgnYScpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dEJ1dHRvbiA9IGFuZ3VsYXIuZWxlbWVudChidXR0b25zW2J1dHRvbnMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAvLyBjbGljayBmb3IgbmV4dCBwYWdlXHJcbiAgICAgICAgICAgIG5leHRCdXR0b24uY2xpY2soKTtcclxuICAgICAgICAgICAgYXR0cnMgPSBnZXRBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRycy5sZW5ndGgpLnRvRXF1YWwoMyk7XHJcbiAgICAgICAgICAgIC8vIGVudDcgYW5kIGVudDggaGF2ZSBzYW1lIGF0dHJpYnV0ZSBuYW1lc1xyXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSB3aWxsIGFsd2F5cyBiZSBkaXNwbGF5ZWQgZm9yIHRoZSBmaXJzdCBlbGVtZW50XHJcbiAgICAgICAgICAgIGV4cGVjdChhdHRyc1swXSkudG9FcXVhbChlbnQ4LmF0dHJpYnV0ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
