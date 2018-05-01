System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityAccessEntitlementNameColumnDirective', function () {
                var AGGREGATION_STATE_DISCONNECTED = 'Disconnected';
                var AGGREGATION_STATE_CONNECTED = 'Connected';

                var $compile = undefined,
                    element = undefined,
                    $scope = undefined,
                    $stateParams = undefined,
                    entitlement = undefined,
                    colConfig = undefined,
                    entitlementValue = undefined;

                beforeEach(module(identityModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$compile_, _$stateParams_, $rootScope) {
                    $compile = _$compile_;
                    $stateParams = _$stateParams_;
                    $scope = $rootScope;
                    entitlement = {
                        id: 'entitleMan',
                        name: 'An Entitlement'
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
                    var eltDef = '<sp-identity-access-entitlement-name-column sp-model="ent" sp-column-config="colConfig" />';

                    $scope.ent = entitlement;
                    $scope.colConfig = colConfig;

                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                it('renders the exclamation mark when entitlement aggregation state is disconnected', function () {
                    entitlement.aggregationState = AGGREGATION_STATE_DISCONNECTED;
                    compile();
                    var icon = element.find('i');
                    expect(icon.length).toEqual(1);
                });

                it('does not render the exclamation mark when entitlement aggregation state is not disconnected', function () {
                    entitlement.aggregationState = AGGREGATION_STATE_CONNECTED;
                    compile();
                    var icon = element.find('i');
                    expect(icon.length).toEqual(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzRW50aXRsZW1lbnROYW1lQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDRCQUE0QixVQUFVLFNBQVM7SUFDdkY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHlCQUF5QjtZQUMvRSxpQkFBaUIsd0JBQXdCOztRQUU3QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsZ0RBQWdELFlBQU07Z0JBQzNELElBQU0saUNBQWlDO2dCQUN2QyxJQUFNLDhCQUE4Qjs7Z0JBRXBDLElBQUksV0FBUTtvQkFBRSxVQUFPO29CQUFFLFNBQU07b0JBQUUsZUFBWTtvQkFBRSxjQUFXO29CQUFFLFlBQVM7b0JBQUUsbUJBQWdCOztnQkFFckYsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLFlBQVksZ0JBQWdCLFlBQWU7b0JBQzFELFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixTQUFTO29CQUNULGNBQWM7d0JBQ1YsSUFBSTt3QkFDSixNQUFNOztvQkFFVixZQUFZO3dCQUNSLGdCQUFnQixRQUFRLFVBQVUsa0JBQWtCLElBQUksWUFBWTs7OztnQkFJNUUsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFROzs7O2dCQUloQixTQUFTLFVBQVU7b0JBQ2YsSUFBSSxTQUFNOztvQkFFVixPQUFPLE1BQU07b0JBQ2IsT0FBTyxZQUFZOztvQkFFbkIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7b0JBRVAsT0FBTzs7O2dCQUdYLEdBQUcsbUZBQW1GLFlBQU07b0JBQ3hGLFlBQVksbUJBQW1CO29CQUMvQjtvQkFDQSxJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFROzs7Z0JBR2hDLEdBQUcsK0ZBQStGLFlBQU07b0JBQ3BHLFlBQVksbUJBQW1CO29CQUMvQjtvQkFDQSxJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssUUFBUSxRQUFROzs7OztHQWtCakMiLCJmaWxlIjoiaWRlbnRpdHkvSWRlbnRpdHlBY2Nlc3NFbnRpdGxlbWVudE5hbWVDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ0lkZW50aXR5QWNjZXNzRW50aXRsZW1lbnROYW1lQ29sdW1uRGlyZWN0aXZlJywgKCkgPT4ge1xuICAgIGNvbnN0IEFHR1JFR0FUSU9OX1NUQVRFX0RJU0NPTk5FQ1RFRCA9ICdEaXNjb25uZWN0ZWQnO1xuICAgIGNvbnN0IEFHR1JFR0FUSU9OX1NUQVRFX0NPTk5FQ1RFRCA9ICdDb25uZWN0ZWQnO1xuXG4gICAgbGV0ICRjb21waWxlLCBlbGVtZW50LCAkc2NvcGUsICRzdGF0ZVBhcmFtcywgZW50aXRsZW1lbnQsIGNvbENvbmZpZywgZW50aXRsZW1lbnRWYWx1ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA3ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sIF8kc3RhdGVQYXJhbXNfLCAkcm9vdFNjb3BlKSA9PiB7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJHN0YXRlUGFyYW1zID0gXyRzdGF0ZVBhcmFtc187XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgIGVudGl0bGVtZW50ID0ge1xuICAgICAgICAgICAgaWQ6ICdlbnRpdGxlTWFuJyxcbiAgICAgICAgICAgIG5hbWU6ICdBbiBFbnRpdGxlbWVudCdcbiAgICAgICAgfTtcbiAgICAgICAgY29sQ29uZmlnID0ge1xuICAgICAgICAgICAgZ2V0T2JqZWN0VmFsdWU6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRPYmplY3RWYWx1ZScpLmFuZC5yZXR1cm5WYWx1ZShlbnRpdGxlbWVudFZhbHVlKVxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICBsZXQgZWx0RGVmID0gYDxzcC1pZGVudGl0eS1hY2Nlc3MtZW50aXRsZW1lbnQtbmFtZS1jb2x1bW4gc3AtbW9kZWw9XCJlbnRcIiBzcC1jb2x1bW4tY29uZmlnPVwiY29sQ29uZmlnXCIgLz5gO1xuXG4gICAgICAgICRzY29wZS5lbnQgPSBlbnRpdGxlbWVudDtcbiAgICAgICAgJHNjb3BlLmNvbENvbmZpZyA9IGNvbENvbmZpZztcblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGV4Y2xhbWF0aW9uIG1hcmsgd2hlbiBlbnRpdGxlbWVudCBhZ2dyZWdhdGlvbiBzdGF0ZSBpcyBkaXNjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGVudGl0bGVtZW50LmFnZ3JlZ2F0aW9uU3RhdGUgPSBBR0dSRUdBVElPTl9TVEFURV9ESVNDT05ORUNURUQ7XG4gICAgICAgIGNvbXBpbGUoKTtcbiAgICAgICAgbGV0IGljb24gPSBlbGVtZW50LmZpbmQoJ2knKTtcbiAgICAgICAgZXhwZWN0KGljb24ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IHJlbmRlciB0aGUgZXhjbGFtYXRpb24gbWFyayB3aGVuIGVudGl0bGVtZW50IGFnZ3JlZ2F0aW9uIHN0YXRlIGlzIG5vdCBkaXNjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGVudGl0bGVtZW50LmFnZ3JlZ2F0aW9uU3RhdGUgPSBBR0dSRUdBVElPTl9TVEFURV9DT05ORUNURUQ7XG4gICAgICAgIGNvbXBpbGUoKTtcbiAgICAgICAgbGV0IGljb24gPSBlbGVtZW50LmZpbmQoJ2knKTtcbiAgICAgICAgZXhwZWN0KGljb24ubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
