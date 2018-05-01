System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    'use strict';

    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('PolicyConstraintDirective', function () {
                var $scope,
                    $compile,
                    CONSTRAINT_ONE = 'Have letters',
                    CONSTRAINT_TWO = 'Have numbers';
                beforeEach(module(identityModule));
                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $scope.policy = [CONSTRAINT_ONE, CONSTRAINT_TWO];
                    $scope.appName = 'App123';
                }));

                function createElement() {
                    var definition = '<sp-policy-constraint sp-policy="policy" sp-app-name="appName"></sp-policy-constraint>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                it('should not show the policy constraints initially', function () {
                    var element = createElement();
                    expect(element.find('ul').length).toEqual(0);
                });

                it('should have an element with the app name in the id', function () {
                    var element = createElement();
                    expect(element.find('#' + $scope.appName + '-policy-constraint').length).toEqual(0);
                });

                describe('toggle button', function () {
                    function clickToggleButton(element) {
                        var button = element.find('button');
                        button.click();
                        $scope.$apply();
                    }

                    it('should exist', function () {
                        var element = createElement();
                        expect(element.find('button').length).toEqual(1);
                    });

                    it('should expand the policy constraints when collapsed', function () {
                        var element = createElement(),
                            ul = undefined,
                            lis = undefined;
                        clickToggleButton(element);
                        ul = element.find('ul');
                        expect(ul.length).toEqual(1);
                        lis = ul.find('li');
                        expect(lis.length).toEqual(2);
                        expect(lis[0].innerText.trim()).toEqual(CONSTRAINT_ONE);
                        expect(lis[1].innerText.trim()).toEqual(CONSTRAINT_TWO);
                    });

                    it('should collapse the policy constraints when expanded', function () {
                        var element = createElement(),
                            ul = undefined;
                        clickToggleButton(element);
                        ul = element.find('ul');
                        expect(ul.length).toEqual(1);
                        clickToggleButton(element);
                        ul = element.find('ul');
                        expect(ul.length).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L1BvbGljeUNvbnN0cmFpbnREaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsNEJBQTRCLFVBQVUsU0FBUztJQUEzRjs7Ozs7SUFNSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTs7WUFIN0IsU0FBUyw2QkFBNkIsWUFBVztnQkFDN0MsSUFBSTtvQkFBUTtvQkFDUixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtnQkFDckIsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVk7b0JBQ2pELFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCxPQUFPLFNBQVMsQ0FBQyxnQkFBZ0I7b0JBQ2pDLE9BQU8sVUFBVTs7O2dCQUdyQixTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxhQUFhO3dCQUNiLFVBQVUsU0FBUyxZQUFZO29CQUNuQyxPQUFPO29CQUNQLE9BQU87OztnQkFHWCxHQUFHLG9EQUFvRCxZQUFXO29CQUM5RCxJQUFJLFVBQVU7b0JBQ2QsT0FBTyxRQUFRLEtBQUssTUFBTSxRQUFRLFFBQVE7OztnQkFHOUMsR0FBRyxzREFBc0QsWUFBVztvQkFDaEUsSUFBSSxVQUFVO29CQUNkLE9BQU8sUUFBUSxLQUFLLE1BQU0sT0FBTyxVQUFVLHNCQUFzQixRQUFRLFFBQVE7OztnQkFHckYsU0FBUyxpQkFBaUIsWUFBVztvQkFDakMsU0FBUyxrQkFBa0IsU0FBUzt3QkFDaEMsSUFBSSxTQUFTLFFBQVEsS0FBSzt3QkFDMUIsT0FBTzt3QkFDUCxPQUFPOzs7b0JBR1gsR0FBRyxnQkFBZ0IsWUFBVzt3QkFDMUIsSUFBSSxVQUFVO3dCQUNkLE9BQU8sUUFBUSxLQUFLLFVBQVUsUUFBUSxRQUFROzs7b0JBR2xELEdBQUcsdURBQXVELFlBQVc7d0JBQ2pFLElBQUksVUFBVTs0QkFDVixLQUFFOzRCQUFFLE1BQUc7d0JBQ1gsa0JBQWtCO3dCQUNsQixLQUFLLFFBQVEsS0FBSzt3QkFDbEIsT0FBTyxHQUFHLFFBQVEsUUFBUTt3QkFDMUIsTUFBTSxHQUFHLEtBQUs7d0JBQ2QsT0FBTyxJQUFJLFFBQVEsUUFBUTt3QkFDM0IsT0FBTyxJQUFJLEdBQUcsVUFBVSxRQUFRLFFBQVE7d0JBQ3hDLE9BQU8sSUFBSSxHQUFHLFVBQVUsUUFBUSxRQUFROzs7b0JBRzVDLEdBQUcsd0RBQXdELFlBQVc7d0JBQ2xFLElBQUksVUFBVTs0QkFDVixLQUFFO3dCQUNOLGtCQUFrQjt3QkFDbEIsS0FBSyxRQUFRLEtBQUs7d0JBQ2xCLE9BQU8sR0FBRyxRQUFRLFFBQVE7d0JBQzFCLGtCQUFrQjt3QkFDbEIsS0FBSyxRQUFRLEtBQUs7d0JBQ2xCLE9BQU8sR0FBRyxRQUFRLFFBQVE7Ozs7OztHQWFuQyIsImZpbGUiOiJpZGVudGl0eS9Qb2xpY3lDb25zdHJhaW50RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5TW9kdWxlIGZyb20gJ2lkZW50aXR5L0lkZW50aXR5TW9kdWxlJztcblxuZGVzY3JpYmUoJ1BvbGljeUNvbnN0cmFpbnREaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHNjb3BlLCAkY29tcGlsZSxcbiAgICAgICAgQ09OU1RSQUlOVF9PTkUgPSAnSGF2ZSBsZXR0ZXJzJyxcbiAgICAgICAgQ09OU1RSQUlOVF9UV08gPSAnSGF2ZSBudW1iZXJzJztcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShpZGVudGl0eU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRzY29wZS5wb2xpY3kgPSBbQ09OU1RSQUlOVF9PTkUsIENPTlNUUkFJTlRfVFdPXTtcbiAgICAgICAgJHNjb3BlLmFwcE5hbWUgPSAnQXBwMTIzJztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9ICc8c3AtcG9saWN5LWNvbnN0cmFpbnQgc3AtcG9saWN5PVwicG9saWN5XCIgc3AtYXBwLW5hbWU9XCJhcHBOYW1lXCI+PC9zcC1wb2xpY3ktY29uc3RyYWludD4nLFxuICAgICAgICAgICAgZWxlbWVudCA9ICRjb21waWxlKGRlZmluaXRpb24pKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaXQoJ3Nob3VsZCBub3Qgc2hvdyB0aGUgcG9saWN5IGNvbnN0cmFpbnRzIGluaXRpYWxseScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgndWwnKS5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgYW4gZWxlbWVudCB3aXRoIHRoZSBhcHAgbmFtZSBpbiB0aGUgaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyMnICsgJHNjb3BlLmFwcE5hbWUgKyAnLXBvbGljeS1jb25zdHJhaW50JykubGVuZ3RoKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZSBidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gY2xpY2tUb2dnbGVCdXR0b24oZWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGVsZW1lbnQuZmluZCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnYnV0dG9uJykubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGV4cGFuZCB0aGUgcG9saWN5IGNvbnN0cmFpbnRzIHdoZW4gY29sbGFwc2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcbiAgICAgICAgICAgICAgICB1bCwgbGlzO1xuICAgICAgICAgICAgY2xpY2tUb2dnbGVCdXR0b24oZWxlbWVudCk7XG4gICAgICAgICAgICB1bCA9IGVsZW1lbnQuZmluZCgndWwnKTtcbiAgICAgICAgICAgIGV4cGVjdCh1bC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBsaXMgPSB1bC5maW5kKCdsaScpO1xuICAgICAgICAgICAgZXhwZWN0KGxpcy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QobGlzWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoQ09OU1RSQUlOVF9PTkUpO1xuICAgICAgICAgICAgZXhwZWN0KGxpc1sxXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKENPTlNUUkFJTlRfVFdPKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjb2xsYXBzZSB0aGUgcG9saWN5IGNvbnN0cmFpbnRzIHdoZW4gZXhwYW5kZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxuICAgICAgICAgICAgICAgIHVsO1xuICAgICAgICAgICAgY2xpY2tUb2dnbGVCdXR0b24oZWxlbWVudCk7XG4gICAgICAgICAgICB1bCA9IGVsZW1lbnQuZmluZCgndWwnKTtcbiAgICAgICAgICAgIGV4cGVjdCh1bC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBjbGlja1RvZ2dsZUJ1dHRvbihlbGVtZW50KTtcbiAgICAgICAgICAgIHVsID0gZWxlbWVudC5maW5kKCd1bCcpO1xuICAgICAgICAgICAgZXhwZWN0KHVsLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
