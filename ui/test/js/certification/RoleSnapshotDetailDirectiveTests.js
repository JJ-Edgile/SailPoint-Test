System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('RoleSnapshotDetailDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    RoleSnapshot = undefined,
                    element = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 10 */
                beforeEach(inject(function (_$compile_, _$rootScope_, _RoleSnapshot_) {
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                    RoleSnapshot = _RoleSnapshot_;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function compile(roleSnapshot) {
                    var eltDef = '<sp-role-snapshot-detail sp-role-snapshot="roleSnapshot"></sp-role-snapshot-detail>';
                    $scope.roleSnapshot = roleSnapshot;

                    element = angular.element(eltDef);
                    $compile(element)($scope);
                    $scope.$digest();

                    return element;
                }

                /**
                 * Returns true if any element in elements contains text in its inner text
                 * @param text The search text
                 * @param elements The elements to search
                 */
                function containsText(text, elements) {
                    return elements.toArray().map(function (element) {
                        return element.innerText;
                    }).some(function (elementText) {
                        return elementText.indexOf(text) >= 0;
                    });
                }

                it('shows the right values', function () {
                    var displayName = 'roleName',
                        targetDisplayName = 'targetName',
                        ownerDisplayName = 'owner',
                        scopeDisplayName = 'scope one',
                        attributes = { foo: 'bar' },
                        roleSnapshot = new RoleSnapshot({
                        id: 'does not matter, but is needed',
                        displayName: displayName,
                        targetDisplayName: targetDisplayName,
                        ownerDisplayName: ownerDisplayName,
                        scopeDisplayName: scopeDisplayName,
                        attributes: attributes
                    }),
                        element = compile(roleSnapshot);
                    expect(containsText(displayName, element)).toBeTruthy();
                    expect(containsText(ownerDisplayName, element)).toBeTruthy();
                    expect(containsText(scopeDisplayName, element)).toBeTruthy();
                    expect(containsText(attributes.foo, element)).toBeTruthy();
                });

                describe('controller', function () {
                    var ctrl = undefined,
                        roleSnapshot = undefined;

                    beforeEach(inject(function ($controller) {
                        roleSnapshot = new RoleSnapshot({ id: 'blah' });
                        ctrl = $controller('RoleSnapshotDetailDirectiveCtrl', {}, { roleSnapshot: roleSnapshot });
                    }));
                    describe('hasAttributes', function () {
                        it('should return false when roleSnapshot.attributes is falsy', function () {
                            expect(ctrl.hasAttributes()).toBeFalsy();
                        });
                        it('should return false when roleSnapshot.attributes is empty', function () {
                            roleSnapshot.attributes = {};
                            expect(ctrl.hasAttributes()).toBeFalsy();
                        });
                        it('should return true when roleSnapshot.attributes is not emtpy', function () {
                            roleSnapshot.attributes = { some: 'value' };
                            expect(ctrl.hasAttributes()).toBeTruthy();
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vUm9sZVNuYXBzaG90RGV0YWlsRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7O0lBRWpHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLCtCQUErQixZQUFNOztnQkFFMUMsSUFBSSxXQUFRO29CQUFFLFNBQU07b0JBQUUsZUFBWTtvQkFBRSxVQUFPOztnQkFFM0MsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFDLFlBQVksY0FBYyxnQkFBbUI7b0JBQzVELFdBQVc7b0JBQ1gsU0FBUyxhQUFhO29CQUN0QixlQUFlOzs7Z0JBR25CLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7b0JBRVosSUFBSSxRQUFRO3dCQUNSLE9BQU87Ozs7Z0JBSWYsU0FBUyxRQUFRLGNBQWM7b0JBQzNCLElBQUksU0FBTTtvQkFDVixPQUFPLGVBQWU7O29CQUV0QixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPOztvQkFFUCxPQUFPOzs7Ozs7OztnQkFRWCxTQUFTLGFBQWEsTUFBTSxVQUFVO29CQUNsQyxPQUFPLFNBQVMsVUFDWCxJQUFJLFVBQUEsU0FBTzt3QkFVQSxPQVZJLFFBQVE7dUJBQ3ZCLEtBQUssVUFBQSxhQUFXO3dCQVdMLE9BWFMsWUFBWSxRQUFRLFNBQVM7Ozs7Z0JBRzFELEdBQUcsMEJBQTBCLFlBQU07b0JBQy9CLElBQUksY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixhQUFhLEVBQUMsS0FBSzt3QkFDbkIsZUFBZSxJQUFJLGFBQWE7d0JBQzVCLElBQUk7d0JBQ0osYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixZQUFZOzt3QkFFaEIsVUFBVSxRQUFRO29CQUN0QixPQUFPLGFBQWEsYUFBYSxVQUFVO29CQUMzQyxPQUFPLGFBQWEsa0JBQWtCLFVBQVU7b0JBQ2hELE9BQU8sYUFBYSxrQkFBa0IsVUFBVTtvQkFDaEQsT0FBTyxhQUFhLFdBQVcsS0FBSyxVQUFVOzs7Z0JBR2xELFNBQVMsY0FBYyxZQUFNO29CQUN6QixJQUFJLE9BQUk7d0JBQUUsZUFBWTs7b0JBRXRCLFdBQVcsT0FBTyxVQUFDLGFBQWdCO3dCQUMvQixlQUFlLElBQUksYUFBYSxFQUFDLElBQUk7d0JBQ3JDLE9BQU8sWUFBWSxtQ0FBbUMsSUFBSSxFQUFDLGNBQWM7O29CQUU3RSxTQUFTLGlCQUFpQixZQUFNO3dCQUM1QixHQUFHLDZEQUE2RCxZQUFNOzRCQUNsRSxPQUFPLEtBQUssaUJBQWlCOzt3QkFFakMsR0FBRyw2REFBNkQsWUFBTTs0QkFDbEUsYUFBYSxhQUFhOzRCQUMxQixPQUFPLEtBQUssaUJBQWlCOzt3QkFFakMsR0FBRyxnRUFBZ0UsWUFBTTs0QkFDckUsYUFBYSxhQUFhLEVBQUMsTUFBTTs0QkFDakMsT0FBTyxLQUFLLGlCQUFpQjs7Ozs7OztHQW9CMUMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9Sb2xlU25hcHNob3REZXRhaWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNyBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xuXG5kZXNjcmliZSgnUm9sZVNuYXBzaG90RGV0YWlsRGlyZWN0aXZlJywgKCkgPT4ge1xuXG4gICAgbGV0ICRjb21waWxlLCAkc2NvcGUsIFJvbGVTbmFwc2hvdCwgZWxlbWVudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDEwICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sIF8kcm9vdFNjb3BlXywgX1JvbGVTbmFwc2hvdF8pID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICBSb2xlU25hcHNob3QgPSBfUm9sZVNuYXBzaG90XztcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJHNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUuJGRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZShyb2xlU25hcHNob3QpIHtcbiAgICAgICAgbGV0IGVsdERlZiA9IGA8c3Atcm9sZS1zbmFwc2hvdC1kZXRhaWwgc3Atcm9sZS1zbmFwc2hvdD1cInJvbGVTbmFwc2hvdFwiPjwvc3Atcm9sZS1zbmFwc2hvdC1kZXRhaWw+YDtcbiAgICAgICAgJHNjb3BlLnJvbGVTbmFwc2hvdCA9IHJvbGVTbmFwc2hvdDtcblxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsdERlZik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFueSBlbGVtZW50IGluIGVsZW1lbnRzIGNvbnRhaW5zIHRleHQgaW4gaXRzIGlubmVyIHRleHRcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgc2VhcmNoIHRleHRcbiAgICAgKiBAcGFyYW0gZWxlbWVudHMgVGhlIGVsZW1lbnRzIHRvIHNlYXJjaFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zVGV4dCh0ZXh0LCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gZWxlbWVudHMudG9BcnJheSgpXG4gICAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudC5pbm5lclRleHQpXG4gICAgICAgICAgICAuc29tZShlbGVtZW50VGV4dCA9PiBlbGVtZW50VGV4dC5pbmRleE9mKHRleHQpID49IDApO1xuICAgIH1cblxuICAgIGl0KCdzaG93cyB0aGUgcmlnaHQgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGlzcGxheU5hbWUgPSAncm9sZU5hbWUnLFxuICAgICAgICAgICAgdGFyZ2V0RGlzcGxheU5hbWUgPSAndGFyZ2V0TmFtZScsXG4gICAgICAgICAgICBvd25lckRpc3BsYXlOYW1lID0gJ293bmVyJyxcbiAgICAgICAgICAgIHNjb3BlRGlzcGxheU5hbWUgPSAnc2NvcGUgb25lJyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB7Zm9vOiAnYmFyJ30sXG4gICAgICAgICAgICByb2xlU25hcHNob3QgPSBuZXcgUm9sZVNuYXBzaG90KHtcbiAgICAgICAgICAgICAgICBpZDogJ2RvZXMgbm90IG1hdHRlciwgYnV0IGlzIG5lZWRlZCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHRhcmdldERpc3BsYXlOYW1lOiB0YXJnZXREaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICBvd25lckRpc3BsYXlOYW1lOiBvd25lckRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgIHNjb3BlRGlzcGxheU5hbWU6IHNjb3BlRGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogYXR0cmlidXRlc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBlbGVtZW50ID0gY29tcGlsZShyb2xlU25hcHNob3QpO1xuICAgICAgICBleHBlY3QoY29udGFpbnNUZXh0KGRpc3BsYXlOYW1lLCBlbGVtZW50KSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoY29udGFpbnNUZXh0KG93bmVyRGlzcGxheU5hbWUsIGVsZW1lbnQpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChjb250YWluc1RleHQoc2NvcGVEaXNwbGF5TmFtZSwgZWxlbWVudCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGNvbnRhaW5zVGV4dChhdHRyaWJ1dGVzLmZvbywgZWxlbWVudCkpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb250cm9sbGVyJywgKCkgPT4ge1xuICAgICAgICBsZXQgY3RybCwgcm9sZVNuYXBzaG90O1xuXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkY29udHJvbGxlcikgPT4ge1xuICAgICAgICAgICAgcm9sZVNuYXBzaG90ID0gbmV3IFJvbGVTbmFwc2hvdCh7aWQ6ICdibGFoJ30pO1xuICAgICAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdSb2xlU25hcHNob3REZXRhaWxEaXJlY3RpdmVDdHJsJywge30sIHtyb2xlU25hcHNob3Q6IHJvbGVTbmFwc2hvdH0pO1xuICAgICAgICB9KSk7XG4gICAgICAgIGRlc2NyaWJlKCdoYXNBdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiByb2xlU25hcHNob3QuYXR0cmlidXRlcyBpcyBmYWxzeScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNBdHRyaWJ1dGVzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIHJvbGVTbmFwc2hvdC5hdHRyaWJ1dGVzIGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJvbGVTbmFwc2hvdC5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICAgICAgZXhwZWN0KGN0cmwuaGFzQXR0cmlidXRlcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHJvbGVTbmFwc2hvdC5hdHRyaWJ1dGVzIGlzIG5vdCBlbXRweScsICgpID0+IHtcbiAgICAgICAgICAgICAgICByb2xlU25hcHNob3QuYXR0cmlidXRlcyA9IHtzb21lOiAndmFsdWUnfTtcbiAgICAgICAgICAgICAgICBleHBlY3QoY3RybC5oYXNBdHRyaWJ1dGVzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
