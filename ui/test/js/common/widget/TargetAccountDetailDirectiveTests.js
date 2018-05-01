System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    /* (c) Copyright 2014 SailPoint Technologies, Inc., All Rights Reserved. */

    /**
     * @author: michael.hide
     * Created: 12/8/14 1:42 PM
     */
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {
            describe('TargetAccountDetailDirective', function () {
                var element, $scope;

                describe('directive', function () {
                    var $compile,
                        targetAccounts = [{ role: 'my role', application: 'appy', account: 'accountey' }, { role: 'my role 2', application: 'appy 2', account: 'accountey 2' }];

                    beforeEach(module(widgetModule));

                    beforeEach(inject(function (_$compile_, $rootScope) {
                        $scope = $rootScope;
                        $scope.targetAccounts = targetAccounts;
                        $compile = _$compile_;
                        element = angular.element('<sp-target-accounts accounts="targetAccounts" />');
                        $compile(element)($scope);
                        $scope.$apply();
                    }));

                    it('should replace the element', function () {
                        expect(element.nodeName).not.toBe('sp-target-accounts');
                    });

                    it('should have same number of rows as target accounts', function () {
                        expect(element.find('tr[class*=ng-scope]').length).toBe(targetAccounts.length);
                    });

                    it('should set correct data in rows', function () {
                        var rows = element.find('tr[class*=ng-scope]'),
                            tds = $(rows[0]).find('td');

                        expect($(tds[0]).text().trim()).toBe(targetAccounts[0].role);
                        expect($(tds[1]).text().trim()).toBe(targetAccounts[0].application);
                        expect($(tds[2]).text().trim()).toBe(targetAccounts[0].account);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvVGFyZ2V0QWNjb3VudERldGFpbERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwrQkFBK0IsVUFBVSxTQUFTOzs7Ozs7O0lBQzlGOztJQVFJLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwyQkFBMkI7WUFDakYsZUFBZSwwQkFBMEI7O1FBRTdDLFNBQVMsWUFBWTtZQUo3QixTQUFTLGdDQUFnQyxZQUFXO2dCQUNoRCxJQUFJLFNBQVM7O2dCQUViLFNBQVMsYUFBYSxZQUFXO29CQUM3QixJQUFJO3dCQUNKLGlCQUFpQixDQUNiLEVBQUUsTUFBTSxXQUFXLGFBQWEsUUFBUSxTQUFTLGVBQ2pELEVBQUUsTUFBTSxhQUFhLGFBQWEsVUFBVSxTQUFTOztvQkFHekQsV0FBVyxPQUFPOztvQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWSxZQUFZO3dCQUMvQyxTQUFTO3dCQUNULE9BQU8saUJBQWlCO3dCQUN4QixXQUFXO3dCQUNYLFVBQVUsUUFBUSxRQUFRO3dCQUMxQixTQUFTLFNBQVM7d0JBQ2xCLE9BQU87OztvQkFHWCxHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxPQUFPLFFBQVEsVUFBVSxJQUFJLEtBQUs7OztvQkFHdEMsR0FBRyxzREFBc0QsWUFBVzt3QkFDaEUsT0FBTyxRQUFRLEtBQUssdUJBQXVCLFFBQVEsS0FBSyxlQUFlOzs7b0JBRzNFLEdBQUcsbUNBQW1DLFlBQVc7d0JBQzdDLElBQUksT0FBTyxRQUFRLEtBQUs7NEJBQ3BCLE1BQU0sRUFBRSxLQUFLLElBQUksS0FBSzs7d0JBRTFCLE9BQU8sRUFBRSxJQUFJLElBQUksT0FBTyxRQUFRLEtBQUssZUFBZSxHQUFHO3dCQUN2RCxPQUFPLEVBQUUsSUFBSSxJQUFJLE9BQU8sUUFBUSxLQUFLLGVBQWUsR0FBRzt3QkFDdkQsT0FBTyxFQUFFLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxlQUFlLEdBQUc7Ozs7OztHQVFoRSIsImZpbGUiOiJjb21tb24vd2lkZ2V0L1RhcmdldEFjY291bnREZXRhaWxEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB3aWRnZXRNb2R1bGUgZnJvbSAnY29tbW9uL3dpZGdldC9XaWRnZXRNb2R1bGUnO1xuXG4vKipcbiAqIEBhdXRob3I6IG1pY2hhZWwuaGlkZVxuICogQ3JlYXRlZDogMTIvOC8xNCAxOjQyIFBNXG4gKi9cbmRlc2NyaWJlKCdUYXJnZXRBY2NvdW50RGV0YWlsRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQsICRzY29wZTtcblxuICAgIGRlc2NyaWJlKCdkaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRjb21waWxlLFxuICAgICAgICB0YXJnZXRBY2NvdW50cyA9IFtcbiAgICAgICAgICAgIHsgcm9sZTogJ215IHJvbGUnLCBhcHBsaWNhdGlvbjogJ2FwcHknLCBhY2NvdW50OiAnYWNjb3VudGV5JyB9LFxuICAgICAgICAgICAgeyByb2xlOiAnbXkgcm9sZSAyJywgYXBwbGljYXRpb246ICdhcHB5IDInLCBhY2NvdW50OiAnYWNjb3VudGV5IDInIH1cbiAgICAgICAgXTtcblxuICAgICAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2R1bGUpKTtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbXBpbGVfLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAgICAgJHNjb3BlLnRhcmdldEFjY291bnRzID0gdGFyZ2V0QWNjb3VudHM7XG4gICAgICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCc8c3AtdGFyZ2V0LWFjY291bnRzIGFjY291bnRzPVwidGFyZ2V0QWNjb3VudHNcIiAvPicpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVwbGFjZSB0aGUgZWxlbWVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQubm9kZU5hbWUpLm5vdC50b0JlKCdzcC10YXJnZXQtYWNjb3VudHMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHNhbWUgbnVtYmVyIG9mIHJvd3MgYXMgdGFyZ2V0IGFjY291bnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCd0cltjbGFzcyo9bmctc2NvcGVdJykubGVuZ3RoKS50b0JlKHRhcmdldEFjY291bnRzLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGNvcnJlY3QgZGF0YSBpbiByb3dzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcm93cyA9IGVsZW1lbnQuZmluZCgndHJbY2xhc3MqPW5nLXNjb3BlXScpLFxuICAgICAgICAgICAgICAgIHRkcyA9ICQocm93c1swXSkuZmluZCgndGQnKTtcblxuICAgICAgICAgICAgZXhwZWN0KCQodGRzWzBdKS50ZXh0KCkudHJpbSgpKS50b0JlKHRhcmdldEFjY291bnRzWzBdLnJvbGUpO1xuICAgICAgICAgICAgZXhwZWN0KCQodGRzWzFdKS50ZXh0KCkudHJpbSgpKS50b0JlKHRhcmdldEFjY291bnRzWzBdLmFwcGxpY2F0aW9uKTtcbiAgICAgICAgICAgIGV4cGVjdCgkKHRkc1syXSkudGV4dCgpLnRyaW0oKSkudG9CZSh0YXJnZXRBY2NvdW50c1swXS5hY2NvdW50KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
