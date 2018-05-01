System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spSelectedIdentitiesButtonDirective', function () {
                var element,
                    $scope,
                    $compile,
                    prevInnerWidth,
                    elementDefinition = '<sp-selected-identities-button sp-id="someId" sp-on-click="mockOnClick()" ' + 'sp-identities="identities" sp-selected-displayed="selectedDisplayed" sp-disabled="false"/>',
                    createIdentityMock = function (displayableName) {
                    return {
                        getDisplayableName: function () {
                            return displayableName;
                        }
                    };
                };

                beforeEach(module(accessRequestModule));

                beforeEach(inject(function (_$compile_, $rootScope, $window, spTranslateFilter) {
                    $compile = _$compile_;
                    $scope = $rootScope;
                    $scope.identities = [];
                    $scope.selectedDisplayed = false;
                    $scope.mockOnClick = function () {
                        $scope.selectedDisplayed = !$scope.selectedDisplayed;
                    };

                    // Setup the test catalog.
                    spTranslateFilter.configureCatalog({
                        'ui_access_no_users_selected': 'No users selected',
                        'ui_access_one_user_selected': function (name) {
                            return (name[1] || 'Some.Guy') + ' selected';
                        },
                        'ui_access_x_users_selected': '4 users selected',
                        'ui_access_show_all': 'Show All'
                    });

                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();

                    //set window innerWidth so truncate has the expected result
                    prevInnerWidth = $window.innerWidth;
                    $window.innerWidth = 640;
                }));

                afterEach(inject(function ($window) {
                    $window.innerWidth = prevInnerWidth;
                }));

                /**
                 * Return the button text for the select identities button.
                 */
                function getButtonText(elNumber) {
                    return angular.element(element[0]).children()[elNumber].innerText.trim();
                }

                /**
                 * Return the screen reader text for the select identities button.
                 */
                function getScreenReaderText() {
                    return element[0].getAttribute('aria-label');
                }

                it('should show 0 and be white with no identities', function () {
                    expect(getButtonText(1)).toEqual('0');
                    expect(getButtonText(2)).toEqual('0');
                    expect(getScreenReaderText()).toEqual('No users selected');
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeTruthy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeFalsy();
                });

                it('should show identity name and be green with 1 identity', function () {
                    $scope.identities.push(createIdentityMock('Some.Guy'));
                    $scope.$apply();
                    expect(getButtonText(1)).toEqual('Some.Guy');
                    expect(getButtonText(2)).toEqual('1');
                    expect(getScreenReaderText()).toEqual('Some.Guy selected');
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeFalsy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeTruthy();
                });

                it('should show truncated identity name and be green with 1 identity', function () {
                    $scope.identities.push(createIdentityMock('Someguywithareallyreallyreallyreallylongname'));
                    $scope.$apply();
                    expect(getButtonText(1)).toEqual('Someguywithareallyreallyreallyreall...');
                    expect(getButtonText(2)).toEqual('1');
                    expect(getScreenReaderText()).toEqual('Someguywithareallyreallyreallyreallylongname selected');
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeFalsy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeTruthy();
                });

                it('should show identity count and be green with many identities', function () {
                    $scope.identities.push(createIdentityMock('Some.Guy1'));
                    $scope.identities.push(createIdentityMock('Some.Guy2'));
                    $scope.identities.push(createIdentityMock('Some.Guy3'));
                    $scope.identities.push(createIdentityMock('Some.Guy4'));
                    $scope.$apply();

                    expect(getButtonText(1)).toEqual('4');
                    expect(getButtonText(2)).toEqual('4');
                    expect(getScreenReaderText()).toEqual('4 users selected');
                    expect(angular.element(element[0]).hasClass('btn-white')).toBeFalsy();
                    expect(angular.element(element[0]).hasClass('btn-success')).toBeTruthy();
                });

                it('should have id', function () {
                    expect(element[0].id).toEqual('someId');
                });

                it('button should say show all when in bucket view', function () {
                    $scope.selectedDisplayed = true;

                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();

                    expect(getButtonText(1)).toEqual('Show All');
                    expect(getButtonText(2)).toEqual('Show All');
                    expect(getScreenReaderText()).toEqual('Show All');
                });

                it('button click should make call to on click handler', function () {
                    var selectedDisplayed = $scope.selectedDisplayed;

                    $scope.identities.push(createIdentityMock('Some.Guy4'));

                    spyOn($scope, 'mockOnClick').and.callThrough();

                    // trigger button click
                    angular.element(element[0]).click();

                    expect($scope.mockOnClick).toHaveBeenCalled();

                    expect($scope.selectedDisplayed).toEqual(!selectedDisplayed);
                });

                it('passed sp-disabled false should not set button disabled', function () {
                    $scope.identities.push(createIdentityMock('Some.Guy'));
                    element = angular.element(elementDefinition);
                    $compile(element)($scope);
                    $scope.$apply();

                    expect(angular.element(element[0]).attr('disabled')).toBeUndefined();
                });

                it('passed sp-disabled true should set button disabled', function () {
                    $scope.identities.push(createIdentityMock('Some.Guy'));
                    element = angular.element(elementDefinition.replace('sp-disabled="false"', 'sp-disabled="true"'));
                    $compile(element)($scope);
                    $scope.$apply();

                    expect(angular.element(element[0]).attr('disabled')).toEqual('disabled');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvU2VsZWN0ZWRJZGVudGl0aWVzQnV0dG9uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyw0Q0FBNEMsVUFBVSxTQUFTO0lBQzVJOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHNDQUFzQztRQUNuRCxTQUFTLFlBQVk7O1lBSjdCLFNBQVMsdUNBQXVDLFlBQVc7Z0JBQ3ZELElBQUk7b0JBQVM7b0JBQVE7b0JBQVU7b0JBQzNCLG9CQUFvQiwrRUFDaEI7b0JBQ0oscUJBQXFCLFVBQVMsaUJBQWlCO29CQUMzQyxPQUFPO3dCQUNILG9CQUFvQixZQUFXOzRCQUMzQixPQUFPOzs7OztnQkFLdkIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZLFNBQVMsbUJBQW1CO29CQUMzRSxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsT0FBTyxhQUFhO29CQUNwQixPQUFPLG9CQUFvQjtvQkFDM0IsT0FBTyxjQUFjLFlBQVc7d0JBQzVCLE9BQU8sb0JBQW9CLENBQUMsT0FBTzs7OztvQkFJdkMsa0JBQWtCLGlCQUFpQjt3QkFDL0IsK0JBQStCO3dCQUMvQiwrQkFBK0IsVUFBUyxNQUFNOzRCQUMxQyxPQUFPLENBQUMsS0FBSyxNQUFNLGNBQWM7O3dCQUVyQyw4QkFBOEI7d0JBQzlCLHNCQUFzQjs7O29CQUcxQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7b0JBR1AsaUJBQWlCLFFBQVE7b0JBQ3pCLFFBQVEsYUFBYTs7O2dCQUd6QixVQUFVLE9BQU8sVUFBUyxTQUFTO29CQUMvQixRQUFRLGFBQWE7Ozs7OztnQkFNekIsU0FBUyxjQUFjLFVBQVU7b0JBQzdCLE9BQU8sUUFB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Ozs7R0FhbEUiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9TZWxlY3RlZElkZW50aXRpZXNCdXR0b25EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ3NwU2VsZWN0ZWRJZGVudGl0aWVzQnV0dG9uRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGUsIHByZXZJbm5lcldpZHRoLFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbiA9ICc8c3Atc2VsZWN0ZWQtaWRlbnRpdGllcy1idXR0b24gc3AtaWQ9XCJzb21lSWRcIiBzcC1vbi1jbGljaz1cIm1vY2tPbkNsaWNrKClcIiAnICtcbiAgICAgICAgICAgICdzcC1pZGVudGl0aWVzPVwiaWRlbnRpdGllc1wiIHNwLXNlbGVjdGVkLWRpc3BsYXllZD1cInNlbGVjdGVkRGlzcGxheWVkXCIgc3AtZGlzYWJsZWQ9XCJmYWxzZVwiLz4nLFxuICAgICAgICBjcmVhdGVJZGVudGl0eU1vY2sgPSBmdW5jdGlvbihkaXNwbGF5YWJsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0RGlzcGxheWFibGVOYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRpc3BsYXlhYmxlTmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb21waWxlXywgJHJvb3RTY29wZSwgJHdpbmRvdywgc3BUcmFuc2xhdGVGaWx0ZXIpIHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAkc2NvcGUuaWRlbnRpdGllcyA9IFtdO1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWREaXNwbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgJHNjb3BlLm1vY2tPbkNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWREaXNwbGF5ZWQgPSAhJHNjb3BlLnNlbGVjdGVkRGlzcGxheWVkO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSB0ZXN0IGNhdGFsb2cuXG4gICAgICAgIHNwVHJhbnNsYXRlRmlsdGVyLmNvbmZpZ3VyZUNhdGFsb2coe1xuICAgICAgICAgICAgJ3VpX2FjY2Vzc19ub191c2Vyc19zZWxlY3RlZCc6ICdObyB1c2VycyBzZWxlY3RlZCcsXG4gICAgICAgICAgICAndWlfYWNjZXNzX29uZV91c2VyX3NlbGVjdGVkJzogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmFtZVsxXSB8fCAnU29tZS5HdXknKSArICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICd1aV9hY2Nlc3NfeF91c2Vyc19zZWxlY3RlZCc6ICc0IHVzZXJzIHNlbGVjdGVkJyxcbiAgICAgICAgICAgICd1aV9hY2Nlc3Nfc2hvd19hbGwnOiAnU2hvdyBBbGwnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgLy9zZXQgd2luZG93IGlubmVyV2lkdGggc28gdHJ1bmNhdGUgaGFzIHRoZSBleHBlY3RlZCByZXN1bHRcbiAgICAgICAgcHJldklubmVyV2lkdGggPSAkd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICR3aW5kb3cuaW5uZXJXaWR0aCA9IDY0MDtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goaW5qZWN0KGZ1bmN0aW9uKCR3aW5kb3cpIHtcbiAgICAgICAgJHdpbmRvdy5pbm5lcldpZHRoID0gcHJldklubmVyV2lkdGg7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBidXR0b24gdGV4dCBmb3IgdGhlIHNlbGVjdCBpZGVudGl0aWVzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRCdXR0b25UZXh0KGVsTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuY2hpbGRyZW4oKVtlbE51bWJlcl0uaW5uZXJUZXh0LnRyaW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHNjcmVlbiByZWFkZXIgdGV4dCBmb3IgdGhlIHNlbGVjdCBpZGVudGl0aWVzIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTY3JlZW5SZWFkZXJUZXh0KCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudFswXS5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIHNob3cgMCBhbmQgYmUgd2hpdGUgd2l0aCBubyBpZGVudGl0aWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDEpKS50b0VxdWFsKCcwJyk7XG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDIpKS50b0VxdWFsKCcwJyk7XG4gICAgICAgIGV4cGVjdChnZXRTY3JlZW5SZWFkZXJUZXh0KCkpLnRvRXF1YWwoJ05vIHVzZXJzIHNlbGVjdGVkJyk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi13aGl0ZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IGlkZW50aXR5IG5hbWUgYW5kIGJlIGdyZWVuIHdpdGggMSBpZGVudGl0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaWRlbnRpdGllcy5wdXNoKGNyZWF0ZUlkZW50aXR5TW9jaygnU29tZS5HdXknKSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KGdldEJ1dHRvblRleHQoMSkpLnRvRXF1YWwoJ1NvbWUuR3V5Jyk7XG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDIpKS50b0VxdWFsKCcxJyk7XG4gICAgICAgIGV4cGVjdChnZXRTY3JlZW5SZWFkZXJUZXh0KCkpLnRvRXF1YWwoJ1NvbWUuR3V5IHNlbGVjdGVkJyk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi13aGl0ZScpKS50b0JlRmFsc3koKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5oYXNDbGFzcygnYnRuLXN1Y2Nlc3MnKSkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzaG93IHRydW5jYXRlZCBpZGVudGl0eSBuYW1lIGFuZCBiZSBncmVlbiB3aXRoIDEgaWRlbnRpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlkZW50aXRpZXMucHVzaChjcmVhdGVJZGVudGl0eU1vY2soJ1NvbWVndXl3aXRoYXJlYWxseXJlYWxseXJlYWxseXJlYWxseWxvbmduYW1lJykpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDEpKS50b0VxdWFsKCdTb21lZ3V5d2l0aGFyZWFsbHlyZWFsbHlyZWFsbHlyZWFsbC4uLicpO1xuICAgICAgICBleHBlY3QoZ2V0QnV0dG9uVGV4dCgyKSkudG9FcXVhbCgnMScpO1xuICAgICAgICBleHBlY3QoZ2V0U2NyZWVuUmVhZGVyVGV4dCgpKS50b0VxdWFsKCdTb21lZ3V5d2l0aGFyZWFsbHlyZWFsbHlyZWFsbHlyZWFsbHlsb25nbmFtZSBzZWxlY3RlZCcpO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmhhc0NsYXNzKCdidG4td2hpdGUnKSkudG9CZUZhbHN5KCk7XG4gICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXSkuaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyBpZGVudGl0eSBjb3VudCBhbmQgYmUgZ3JlZW4gd2l0aCBtYW55IGlkZW50aXRpZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmlkZW50aXRpZXMucHVzaChjcmVhdGVJZGVudGl0eU1vY2soJ1NvbWUuR3V5MScpKTtcbiAgICAgICAgJHNjb3BlLmlkZW50aXRpZXMucHVzaChjcmVhdGVJZGVudGl0eU1vY2soJ1NvbWUuR3V5MicpKTtcbiAgICAgICAgJHNjb3BlLmlkZW50aXRpZXMucHVzaChjcmVhdGVJZGVudGl0eU1vY2soJ1NvbWUuR3V5MycpKTtcbiAgICAgICAgJHNjb3BlLmlkZW50aXRpZXMucHVzaChjcmVhdGVJZGVudGl0eU1vY2soJ1NvbWUuR3V5NCcpKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDEpKS50b0VxdWFsKCc0Jyk7XG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDIpKS50b0VxdWFsKCc0Jyk7XG4gICAgICAgIGV4cGVjdChnZXRTY3JlZW5SZWFkZXJUZXh0KCkpLnRvRXF1YWwoJzQgdXNlcnMgc2VsZWN0ZWQnKTtcbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5oYXNDbGFzcygnYnRuLXdoaXRlJykpLnRvQmVGYWxzeSgpO1xuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmhhc0NsYXNzKCdidG4tc3VjY2VzcycpKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaWQpLnRvRXF1YWwoJ3NvbWVJZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2J1dHRvbiBzaG91bGQgc2F5IHNob3cgYWxsIHdoZW4gaW4gYnVja2V0IHZpZXcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkRGlzcGxheWVkID0gdHJ1ZTtcblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgIGV4cGVjdChnZXRCdXR0b25UZXh0KDEpKS50b0VxdWFsKCdTaG93IEFsbCcpO1xuICAgICAgICBleHBlY3QoZ2V0QnV0dG9uVGV4dCgyKSkudG9FcXVhbCgnU2hvdyBBbGwnKTtcbiAgICAgICAgZXhwZWN0KGdldFNjcmVlblJlYWRlclRleHQoKSkudG9FcXVhbCgnU2hvdyBBbGwnKTtcbiAgICB9KTtcblxuICAgIGl0KCdidXR0b24gY2xpY2sgc2hvdWxkIG1ha2UgY2FsbCB0byBvbiBjbGljayBoYW5kbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZERpc3BsYXllZCA9ICRzY29wZS5zZWxlY3RlZERpc3BsYXllZDtcblxuICAgICAgICAkc2NvcGUuaWRlbnRpdGllcy5wdXNoKGNyZWF0ZUlkZW50aXR5TW9jaygnU29tZS5HdXk0JykpO1xuXG4gICAgICAgIHNweU9uKCRzY29wZSwgJ21vY2tPbkNsaWNrJykuYW5kLmNhbGxUaHJvdWdoKCk7XG5cbiAgICAgICAgLy8gdHJpZ2dlciBidXR0b24gY2xpY2tcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KCRzY29wZS5tb2NrT25DbGljaykudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIGV4cGVjdCgkc2NvcGUuc2VsZWN0ZWREaXNwbGF5ZWQpLnRvRXF1YWwoIXNlbGVjdGVkRGlzcGxheWVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXNzZWQgc3AtZGlzYWJsZWQgZmFsc2Ugc2hvdWxkIG5vdCBzZXQgYnV0dG9uIGRpc2FibGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5pZGVudGl0aWVzLnB1c2goY3JlYXRlSWRlbnRpdHlNb2NrKCdTb21lLkd1eScpKTtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcblxuICAgICAgICBleHBlY3QoYW5ndWxhci5lbGVtZW50KGVsZW1lbnRbMF0pLmF0dHIoJ2Rpc2FibGVkJykpLnRvQmVVbmRlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXNzZWQgc3AtZGlzYWJsZWQgdHJ1ZSBzaG91bGQgc2V0IGJ1dHRvbiBkaXNhYmxlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuaWRlbnRpdGllcy5wdXNoKGNyZWF0ZUlkZW50aXR5TW9jaygnU29tZS5HdXknKSk7XG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24ucmVwbGFjZSgnc3AtZGlzYWJsZWQ9XCJmYWxzZVwiJywgJ3NwLWRpc2FibGVkPVwidHJ1ZVwiJykpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG5cbiAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChlbGVtZW50WzBdKS5hdHRyKCdkaXNhYmxlZCcpKS50b0VxdWFsKCdkaXNhYmxlZCcpO1xuICAgIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
