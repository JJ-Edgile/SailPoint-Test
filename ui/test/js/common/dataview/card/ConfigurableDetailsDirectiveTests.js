System.register(['test/js/TestInitializer', 'common/dataview/card/CardModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var cardModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewCardCardModule) {
            cardModule = _commonDataviewCardCardModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('ConfigurableDetailsDirective', function () {

                var $scope,
                    $compile,
                    roleData = {
                    id: '1',
                    name: 'They see me role-in',
                    displayableName: 'with my homies',
                    owner: 'Chamillionaire',
                    description: 'just ridin dirty',
                    riskScoreWeight: 800,
                    accessType: 'Role'
                },
                    entitlementData = {
                    id: '2',
                    displayableName: 'Poppin dat cris',
                    owner: 'J Mon$y',
                    description: 'go to work',
                    application: 'Bar',
                    accessType: 'Entitlement'
                },
                    bandConfig = {
                    colorBands: [{
                        color: 'low',
                        lower: '0',
                        upper: '250'
                    }, {
                        color: 'medium_low',
                        lower: '251',
                        upper: '500'
                    }, {
                        color: 'medium_high',
                        lower: '501',
                        upper: '750'
                    }, {
                        color: 'high',
                        lower: '751',
                        upper: '1000'
                    }]
                },
                    role,
                    entitlement,
                    ColumnConfig,
                    columnConfigs,
                    elementDefinition = '<sp-configurable-details ng-model="testModel" ' + 'sp-col-configs="columnConfigs[\'{0}\']"/>',
                    createElement = function (model, elDef) {
                    var element;
                    elDef = elDef || elementDefinition;
                    $scope.testModel = model;
                    $scope.columnConfigs = columnConfigs;
                    element = angular.element(elDef.replace('{0}', model.getAccessType()));
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                },
                    setupSpies = function (model) {
                    spyOn(model, 'getDescription').and.callThrough();
                    spyOn(model, 'getApplication').and.callThrough();
                    spyOn(model, 'getRiskScoreWeight').and.callThrough();
                    spyOn(model, 'getOwner').and.callThrough();
                };

                function MockModel(data) {
                    this.description = data.description;
                    this.application = data.application;
                    this.riskScoreWeight = data.riskScoreWeight;
                    this.owner = data.owner;
                    this.accessType = data.accessType;
                    this.displayableName = data.displayableName;

                    this.getDescription = function () {
                        return this.description;
                    };

                    this.getApplication = function () {
                        return this.application;
                    };

                    this.getRiskScoreWeight = function () {
                        return this.riskScoreWeight;
                    };

                    this.getOwner = function () {
                        return this.owner;
                    };

                    this.getAccessType = function () {
                        return this.accessType;
                    };
                }

                beforeEach(module(cardModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_BAND_CONFIG', bandConfig);
                }));

                beforeEach(inject(function (_$rootScope_, _$compile_, _ColumnConfig_, spTranslateFilter) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;

                    // Mock spTranslate to test localization
                    spTranslateFilter.configureCatalog({
                        'ui_read_more': 'READ MORE',
                        'ui_read_less': 'READ LESS',
                        'ui_access_type': 'ACCESS TYPE',
                        'ui_access_application': 'APPLICATION',
                        'ui_access_owner': 'OWNER',
                        'ui_access_risk': 'RISK SCORE'
                    });

                    role = new MockModel(roleData);
                    entitlement = new MockModel(entitlementData);
                    ColumnConfig = _ColumnConfig_;

                    columnConfigs = {
                        'Entitlement': [new ColumnConfig({ dataIndex: 'displayableName' }), new ColumnConfig({ dataIndex: 'owner' }), new ColumnConfig({ dataIndex: 'application' })],
                        'Role': [new ColumnConfig({ dataIndex: 'displayableName' }), new ColumnConfig({ dataIndex: 'owner' }), new ColumnConfig({ dataIndex: 'riskScoreWeight', renderer: 'risk' })]
                    };
                }));

                it('should show entitlement details', function () {
                    setupSpies(entitlement);
                    var element = createElement(entitlement);

                    expect(entitlement.getApplication).toHaveBeenCalled();
                    expect(entitlement.getDescription).toHaveBeenCalled();
                    expect(entitlement.getOwner).toHaveBeenCalled();

                    //Entitlement has no risk score info
                    expect(entitlement.getRiskScoreWeight).not.toHaveBeenCalled();

                    var cardDataItems = element.find('span.sp-card-data-item-value');
                    expect(cardDataItems.length).toEqual(3);
                    var descriptionElement = element.find('go to work');
                    expect(descriptionElement).not.toBeNull();
                });

                it('should show entitlement details without getDescription method', function () {
                    setupSpies(entitlement);
                    entitlement.getDescription = undefined;
                    var element = createElement(entitlement);

                    expect(entitlement.getApplication).toHaveBeenCalled();
                    expect(entitlement.getOwner).toHaveBeenCalled();

                    //Entitlement has no risk score info
                    expect(entitlement.getRiskScoreWeight).not.toHaveBeenCalled();

                    var cardDataItems = element.find('span.sp-card-data-item-value');
                    expect(cardDataItems.length).toEqual(3);
                    var descriptionElement = element.find('go to work');
                    expect(descriptionElement).not.toBeNull();
                });

                it('should show role details', function () {
                    setupSpies(role);
                    var element = createElement(role);

                    expect(role.getDescription).toHaveBeenCalled();

                    //Role has no application
                    expect(role.getApplication).not.toHaveBeenCalled();
                    expect(role.getOwner).toHaveBeenCalled();

                    //Role with risk score info
                    expect(role.getRiskScoreWeight).toHaveBeenCalled();

                    var cardDataItems = element.find('span.sp-card-data-item-value');
                    expect(cardDataItems.length).toEqual(3);

                    // Risk filter should apply risk score class
                    expect(angular.element(cardDataItems[2]).find('.riskIndicator.ri_high').length).toEqual(1);
                });

                it('includes any elements at top of card', function () {
                    var elDef = '<sp-configurable-details ng-model="testModel" ' + '                                sp-col-configs="columnConfigs[\'{0}\']">' + ' <span id="himom">HI MOM!</span>' + '</sp-configurable-details>',
                        element = createElement(role, elDef),
                        hiMom = element.find('#himom');

                    expect(hiMom).toBeTruthy();
                    expect(hiMom.text()).toEqual('HI MOM!');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9jYXJkL0NvbmZpZ3VyYWJsZURldGFpbHNEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsbUNBQW1DLDRDQUE0QyxVQUFVLFNBQVM7SUFDMUk7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLCtCQUErQjtZQUNyRixhQUFhLDhCQUE4QjtXQUM1QyxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsZ0NBQWdDLFlBQVc7O2dCQUVoRCxJQUFJO29CQUNBO29CQUNBLFdBQVc7b0JBQ1AsSUFBSTtvQkFDSixNQUFNO29CQUNOLGlCQUFpQjtvQkFDakIsT0FBTztvQkFDUCxhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsWUFBWTs7b0JBRWhCLGtCQUFrQjtvQkFDZCxJQUFJO29CQUNKLGlCQUFpQjtvQkFDakIsT0FBTztvQkFDUCxhQUFhO29CQUNiLGFBQWE7b0JBQ2IsWUFBWTs7b0JBRWhCLGFBQWE7b0JBQ0wsWUFBYSxDQUNUO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPO3VCQUVYO3dCQUNJLE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxPQUFPOzs7b0JBR3ZCO29CQUNBO29CQUNBO29CQUNBO29CQUNBLG9CQUFvQixtREFDaEI7b0JBQ0osZ0JBQWdCLFVBQVMsT0FBTyxPQUFPO29CQUNuQyxJQUFJO29CQUNKLFFBQVEsU0FBUztvQkFDakIsT0FBTyxZQUFZO29CQUNuQixPQUFPLGdCQUFnQjtvQkFDdkIsVUFBVSxRQUFRLFFBQVEsTUFBTSxRQUFRLE9BQU8sTUFBTTtvQkFDckQsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9B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LFFBQVEsUUFBUSxjQUFjLElBQUksS0FBSywwQkFBMEIsUUFBUSxRQUFROzs7Z0JBRzVGLEdBQUcsd0NBQXdDLFlBQVc7b0JBQ2xELElBQUksUUFDQSxtREFDQSw2RUFDQSxxQ0FDQTt3QkFFQSxVQUFVLGNBQWMsTUFBTTt3QkFDOUIsUUFBUSxRQUFRLEtBQUs7O29CQUV6QixPQUFPLE9BQU87b0JBQ2QsT0FBTyxNQUFNLFFBQVEsUUFBUTs7Ozs7R0FSbEMiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L2NhcmQvQ29uZmlndXJhYmxlRGV0YWlsc0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2FyZE1vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvY2FyZC9DYXJkTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ0NvbmZpZ3VyYWJsZURldGFpbHNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciAkc2NvcGUsXG4gICAgICAgICRjb21waWxlLFxuICAgICAgICByb2xlRGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAnMScsXG4gICAgICAgICAgICBuYW1lOiAnVGhleSBzZWUgbWUgcm9sZS1pbicsXG4gICAgICAgICAgICBkaXNwbGF5YWJsZU5hbWU6ICd3aXRoIG15IGhvbWllcycsXG4gICAgICAgICAgICBvd25lcjogJ0NoYW1pbGxpb25haXJlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnanVzdCByaWRpbiBkaXJ0eScsXG4gICAgICAgICAgICByaXNrU2NvcmVXZWlnaHQ6IDgwMCxcbiAgICAgICAgICAgIGFjY2Vzc1R5cGU6ICdSb2xlJ1xuICAgICAgICB9LFxuICAgICAgICBlbnRpdGxlbWVudERhdGEgPSB7XG4gICAgICAgICAgICBpZDogJzInLFxuICAgICAgICAgICAgZGlzcGxheWFibGVOYW1lOiAnUG9wcGluIGRhdCBjcmlzJyxcbiAgICAgICAgICAgIG93bmVyOiAnSiBNb24keScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2dvIHRvIHdvcmsnLFxuICAgICAgICAgICAgYXBwbGljYXRpb246ICdCYXInLFxuICAgICAgICAgICAgYWNjZXNzVHlwZTogJ0VudGl0bGVtZW50J1xuICAgICAgICB9LFxuICAgICAgICBiYW5kQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGNvbG9yQmFuZHMgOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHBlcjogJzI1MCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdtZWRpdW1fbG93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnMjUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnNTAwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ21lZGl1bV9oaWdoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VyOiAnNTAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwcGVyOiAnNzUwJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ2hpZ2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXI6ICc3NTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBwZXI6ICcxMDAwJ1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICByb2xlLFxuICAgICAgICBlbnRpdGxlbWVudCxcbiAgICAgICAgQ29sdW1uQ29uZmlnLFxuICAgICAgICBjb2x1bW5Db25maWdzLFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbiA9ICc8c3AtY29uZmlndXJhYmxlLWRldGFpbHMgbmctbW9kZWw9XCJ0ZXN0TW9kZWxcIiAnICtcbiAgICAgICAgICAgICdzcC1jb2wtY29uZmlncz1cImNvbHVtbkNvbmZpZ3NbXFwnezB9XFwnXVwiLz4nLFxuICAgICAgICBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24obW9kZWwsIGVsRGVmKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgIGVsRGVmID0gZWxEZWYgfHwgZWxlbWVudERlZmluaXRpb247XG4gICAgICAgICAgICAkc2NvcGUudGVzdE1vZGVsID0gbW9kZWw7XG4gICAgICAgICAgICAkc2NvcGUuY29sdW1uQ29uZmlncyA9IGNvbHVtbkNvbmZpZ3M7XG4gICAgICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsRGVmLnJlcGxhY2UoJ3swfScsIG1vZGVsLmdldEFjY2Vzc1R5cGUoKSkpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXR1cFNwaWVzID0gZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgICAgICAgIHNweU9uKG1vZGVsLCAnZ2V0RGVzY3JpcHRpb24nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHNweU9uKG1vZGVsLCAnZ2V0QXBwbGljYXRpb24nKS5hbmQuY2FsbFRocm91Z2goKTtcbiAgICAgICAgICAgIHNweU9uKG1vZGVsLCAnZ2V0Umlza1Njb3JlV2VpZ2h0JykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgICAgICBzcHlPbihtb2RlbCwgJ2dldE93bmVyJykuYW5kLmNhbGxUaHJvdWdoKCk7XG4gICAgICAgIH07XG5cbiAgICBmdW5jdGlvbiBNb2NrTW9kZWwoZGF0YSkge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9IGRhdGEuYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMucmlza1Njb3JlV2VpZ2h0ID0gZGF0YS5yaXNrU2NvcmVXZWlnaHQ7XG4gICAgICAgIHRoaXMub3duZXIgPSBkYXRhLm93bmVyO1xuICAgICAgICB0aGlzLmFjY2Vzc1R5cGUgPSBkYXRhLmFjY2Vzc1R5cGU7XG4gICAgICAgIHRoaXMuZGlzcGxheWFibGVOYW1lID0gZGF0YS5kaXNwbGF5YWJsZU5hbWU7XG5cbiAgICAgICAgdGhpcy5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb247XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRSaXNrU2NvcmVXZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJpc2tTY29yZVdlaWdodDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldE93bmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vd25lcjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldEFjY2Vzc1R5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjY2Vzc1R5cGU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2FyZE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0JBTkRfQ09ORklHJywgYmFuZENvbmZpZyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBfQ29sdW1uQ29uZmlnXyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlcikge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG5cbiAgICAgICAgLy8gTW9jayBzcFRyYW5zbGF0ZSB0byB0ZXN0IGxvY2FsaXphdGlvblxuICAgICAgICBzcFRyYW5zbGF0ZUZpbHRlci5jb25maWd1cmVDYXRhbG9nKHtcbiAgICAgICAgICAgICd1aV9yZWFkX21vcmUnOiAnUkVBRCBNT1JFJyxcbiAgICAgICAgICAgICd1aV9yZWFkX2xlc3MnOiAnUkVBRCBMRVNTJyxcbiAgICAgICAgICAgICd1aV9hY2Nlc3NfdHlwZSc6ICdBQ0NFU1MgVFlQRScsXG4gICAgICAgICAgICAndWlfYWNjZXNzX2FwcGxpY2F0aW9uJzogJ0FQUExJQ0FUSU9OJyxcbiAgICAgICAgICAgICd1aV9hY2Nlc3Nfb3duZXInOiAnT1dORVInLFxuICAgICAgICAgICAgJ3VpX2FjY2Vzc19yaXNrJzogJ1JJU0sgU0NPUkUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvbGUgPSBuZXcgTW9ja01vZGVsKHJvbGVEYXRhKTtcbiAgICAgICAgZW50aXRsZW1lbnQgPSBuZXcgTW9ja01vZGVsKGVudGl0bGVtZW50RGF0YSk7XG4gICAgICAgIENvbHVtbkNvbmZpZyA9IF9Db2x1bW5Db25maWdfO1xuXG4gICAgICAgIGNvbHVtbkNvbmZpZ3MgPSB7XG4gICAgICAgICAgICAnRW50aXRsZW1lbnQnOiBbXG4gICAgICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7ZGF0YUluZGV4OiAnZGlzcGxheWFibGVOYW1lJ30pLFxuICAgICAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe2RhdGFJbmRleDogJ293bmVyJ30pLFxuICAgICAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe2RhdGFJbmRleDogJ2FwcGxpY2F0aW9uJ30pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgJ1JvbGUnOiBbXG4gICAgICAgICAgICAgICAgbmV3IENvbHVtbkNvbmZpZyh7ZGF0YUluZGV4OiAnZGlzcGxheWFibGVOYW1lJ30pLFxuICAgICAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe2RhdGFJbmRleDogJ293bmVyJ30pLFxuICAgICAgICAgICAgICAgIG5ldyBDb2x1bW5Db25maWcoe2RhdGFJbmRleDogJ3Jpc2tTY29yZVdlaWdodCcsIHJlbmRlcmVyOiAncmlzayd9KVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBlbnRpdGxlbWVudCBkZXRhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldHVwU3BpZXMoZW50aXRsZW1lbnQpO1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZW50aXRsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRBcHBsaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0RGVzY3JpcHRpb24pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldE93bmVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgLy9FbnRpdGxlbWVudCBoYXMgbm8gcmlzayBzY29yZSBpbmZvXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRSaXNrU2NvcmVXZWlnaHQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgdmFyIGNhcmREYXRhSXRlbXMgPSBlbGVtZW50LmZpbmQoJ3NwYW4uc3AtY2FyZC1kYXRhLWl0ZW0tdmFsdWUnKTtcbiAgICAgICAgZXhwZWN0KGNhcmREYXRhSXRlbXMubGVuZ3RoKS50b0VxdWFsKDMpO1xuICAgICAgICB2YXIgZGVzY3JpcHRpb25FbGVtZW50ID0gZWxlbWVudC5maW5kKCdnbyB0byB3b3JrJyk7XG4gICAgICAgIGV4cGVjdChkZXNjcmlwdGlvbkVsZW1lbnQpLm5vdC50b0JlTnVsbCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGVudGl0bGVtZW50IGRldGFpbHMgd2l0aG91dCBnZXREZXNjcmlwdGlvbiBtZXRob2QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0dXBTcGllcyhlbnRpdGxlbWVudCk7XG4gICAgICAgIGVudGl0bGVtZW50LmdldERlc2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZW50aXRsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChlbnRpdGxlbWVudC5nZXRBcHBsaWNhdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoZW50aXRsZW1lbnQuZ2V0T3duZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICAvL0VudGl0bGVtZW50IGhhcyBubyByaXNrIHNjb3JlIGluZm9cbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50LmdldFJpc2tTY29yZVdlaWdodCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICB2YXIgY2FyZERhdGFJdGVtcyA9IGVsZW1lbnQuZmluZCgnc3Bhbi5zcC1jYXJkLWRhdGEtaXRlbS12YWx1ZScpO1xuICAgICAgICBleHBlY3QoY2FyZERhdGFJdGVtcy5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbkVsZW1lbnQgPSBlbGVtZW50LmZpbmQoJ2dvIHRvIHdvcmsnKTtcbiAgICAgICAgZXhwZWN0KGRlc2NyaXB0aW9uRWxlbWVudCkubm90LnRvQmVOdWxsKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNob3cgcm9sZSBkZXRhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldHVwU3BpZXMocm9sZSk7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChyb2xlKTtcblxuICAgICAgICBleHBlY3Qocm9sZS5nZXREZXNjcmlwdGlvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIC8vUm9sZSBoYXMgbm8gYXBwbGljYXRpb25cbiAgICAgICAgZXhwZWN0KHJvbGUuZ2V0QXBwbGljYXRpb24pLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdChyb2xlLmdldE93bmVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICAgICAgLy9Sb2xlIHdpdGggcmlzayBzY29yZSBpbmZvXG4gICAgICAgIGV4cGVjdChyb2xlLmdldFJpc2tTY29yZVdlaWdodCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIHZhciBjYXJkRGF0YUl0ZW1zID0gZWxlbWVudC5maW5kKCdzcGFuLnNwLWNhcmQtZGF0YS1pdGVtLXZhbHVlJyk7XG4gICAgICAgIGV4cGVjdChjYXJkRGF0YUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgzKTtcblxuICAgICAgICAvLyBSaXNrIGZpbHRlciBzaG91bGQgYXBwbHkgcmlzayBzY29yZSBjbGFzc1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGNhcmREYXRhSXRlbXNbMl0pLmZpbmQoJy5yaXNrSW5kaWNhdG9yLnJpX2hpZ2gnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW5jbHVkZXMgYW55IGVsZW1lbnRzIGF0IHRvcCBvZiBjYXJkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbERlZiA9XG4gICAgICAgICAgICAnPHNwLWNvbmZpZ3VyYWJsZS1kZXRhaWxzIG5nLW1vZGVsPVwidGVzdE1vZGVsXCIgJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcC1jb2wtY29uZmlncz1cImNvbHVtbkNvbmZpZ3NbXFwnezB9XFwnXVwiPicgK1xuICAgICAgICAgICAgJyA8c3BhbiBpZD1cImhpbW9tXCI+SEkgTU9NITwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L3NwLWNvbmZpZ3VyYWJsZS1kZXRhaWxzPicsXG5cbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHJvbGUsIGVsRGVmKSxcbiAgICAgICAgICAgIGhpTW9tID0gZWxlbWVudC5maW5kKCcjaGltb20nKTtcblxuICAgICAgICBleHBlY3QoaGlNb20pLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGhpTW9tLnRleHQoKSkudG9FcXVhbCgnSEkgTU9NIScpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
