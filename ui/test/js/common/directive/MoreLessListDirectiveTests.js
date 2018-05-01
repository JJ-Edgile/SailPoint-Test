System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule', 'test/js/common/i18n/MockTranslateFilter'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }, function (_testJsCommonI18nMockTranslateFilter) {}],
        execute: function () {

            describe('spMoreLessList', function () {
                var elementDefinition = '<sp-more-less-list sp-items="items" sp-additional-scope="additionalScope">\n              {{ moreLessItem }} - {{ otherThing }}\n            </sp-more-less-list>',
                    element = undefined,
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(directiveModule));

                beforeEach(inject(function ($rootScope, _$compile_, spTranslateFilter) {
                    $scope = $rootScope;
                    $compile = _$compile_;
                    spTranslateFilter.configureCatalog({
                        'ui_more_less_list_more_btn': '{0} more',
                        'ui_more_less_list_less_btn': 'Less'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement(items, additionalScope) {
                    $scope.items = items;
                    $scope.additionalScope = additionalScope;

                    element = $compile(angular.element(elementDefinition))($scope);
                    $scope.$apply();
                }

                it('works with no items', function () {
                    expect(function () {
                        return createElement(undefined);
                    }).not.toThrow();
                });

                it('shows list of items', function () {
                    var items = ['A', 'B'];
                    createElement(items);
                    expect(element.find('.more-less-list-item').length).toEqual(2);
                    expect(element.find('#moreLessListItem0').text().trim().indexOf('A')).toEqual(0);
                    expect(element.find('#moreLessListItem1').text().trim().indexOf('B')).toEqual(0);
                });

                it('adds additional scope to available scope for items', function () {
                    var items = ['A', 'B'],
                        additionalScope = {
                        otherThing: 'HELLO!'
                    };
                    createElement(items, additionalScope);
                    expect(element.find('#moreLessListItem0').text().trim().indexOf('A - HELLO!')).toEqual(0);
                    expect(element.find('#moreLessListItem1').text().trim().indexOf('B - HELLO!')).toEqual(0);
                });

                describe('toggle more/less', function () {
                    var items = ['A', 'B', 'C', 'D'];

                    beforeEach(function () {
                        createElement(items);
                    });

                    it('shows truncated list if more than two items', function () {
                        expect(element.find('.more-less-list-item').length).toEqual(2);
                        expect(element.find('#moreLessListItem0').text().trim().indexOf(items[0])).toEqual(0);
                        expect(element.find('#moreLessListItem1').text().trim().indexOf(items[1])).toEqual(0);
                    });

                    it('shows toggle button with remaining item count', function () {
                        var toggleButton = element.find('button.more-less-list-toggle-btn');
                        expect(toggleButton.length).toEqual(1);
                        expect(toggleButton.text().trim().indexOf('2 more')).toEqual(0);
                    });

                    it('shows all items when toggle button is clicked', function () {
                        var toggleButton = element.find('button.more-less-list-toggle-btn');
                        toggleButton.click();
                        $scope.$apply();
                        expect(element.find('.more-less-list-item').length).toEqual(4);
                        expect(element.find('#moreLessListItem2').text().trim().indexOf(items[2])).toEqual(0);
                        expect(element.find('#moreLessListItem3').text().trim().indexOf(items[3])).toEqual(0);
                        expect(toggleButton.text().trim().indexOf('Less')).toEqual(0);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTW9yZUxlc3NMaXN0RGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG9DQUFvQyw0Q0FBNEMsVUFBVSxTQUFTOzs7SUFHM0k7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDO1dBQ25ELFVBQVUsc0NBQXNDO1FBQ25ELFNBQVMsWUFBWTs7WUFKN0IsU0FBUyxrQkFBa0IsWUFBTTtnQkFDN0IsSUFBSSxvQkFBaUI7b0JBSWpCLFVBQU87b0JBQUUsU0FBTTtvQkFBRSxXQUFROztnQkFFN0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLG1CQUFzQjtvQkFDN0QsU0FBUztvQkFDVCxXQUFXO29CQUNYLGtCQUFrQixpQkFBaUI7d0JBQy9CLDhCQUE4Qjt3QkFDOUIsOEJBQStCOzs7O2dCQUl2QyxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsY0FBYyxPQUFPLGlCQUFpQjtvQkFDM0MsT0FBTyxRQUFRO29CQUNmLE9BQU8sa0JBQWtCOztvQkFFekIsVUFBVSxTQUFTLFFBQVEsUUFBUSxvQkFBb0I7b0JBQ3ZELE9BQU87OztnQkFHWCxHQUFHLHVCQUF1QixZQUFNO29CQUM1QixPQUFPLFlBQUE7d0JBTVMsT0FOSCxjQUFjO3VCQUFZLElBQUk7OztnQkFHL0MsR0FBRyx1QkFBdUIsWUFBTTtvQkFDNUIsSUFBSSxRQUFRLENBQUMsS0FBSztvQkFDbEIsY0FBYztvQkFDZCxPQUFPLFFBQVEsS0FBSyx3QkFBd0IsUUFBUSxRQUFRO29CQUM1RCxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxPQUFPLFFBQVEsTUFBTSxRQUFRO29CQUM5RSxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxPQUFPLFFBQVEsTUFBTSxRQUFROzs7Z0JBR2xGLEdBQUcsc0RBQXNELFlBQU07b0JBQzNELElBQUksUUFBUSxDQUFDLEtBQUs7d0JBQ2Qsa0JBQWtCO3dCQUNkLFlBQVk7O29CQUVwQixjQUFjLE9BQU87b0JBQ3JCLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixPQUFPLE9BQU8sUUFBUSxlQUFlLFFBQVE7b0JBQ3ZGLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixPQUFPLE9BQU8sUUFBUSxlQUFlLFFBQVE7OztnQkFHM0YsU0FBUyxvQkFBb0IsWUFBTTtvQkFDL0IsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEtBQUs7O29CQUU1QixXQUFXLFlBQU07d0JBQ2IsY0FBYzs7O29CQUdsQixHQUFHLCtDQUErQyxZQUFNO3dCQUNwRCxPQUFPLFFBQVEsS0FBSyx3QkFBd0IsUUFBUSxRQUFRO3dCQUM1RCxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxPQUFPLFFBQVEsTUFBTSxLQUFLLFFBQVE7d0JBQ25GLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixPQUFPLE9BQU8sUUFBUSxNQUFNLEtBQUssUUFBUTs7O29CQUd2RixHQUFHLGlEQUFpRCxZQUFNO3dCQUN0RCxJQUFJLGVBQWUsUUFBUSxLQUFLO3dCQUNoQyxPQUFPLGFBQWEsUUFBUSxRQUFRO3dCQUNwQyxPQUFPLGFBQWEsT0FBTyxPQUFPLFFBQVEsV0FBVyxRQUFROzs7b0JBR2pFLEdBQUcsaURBQWlELFlBQU07d0JBQ3RELElBQUksZUFBZSxRQUFRLEtBQUs7d0JBQ2hDLGFBQWE7d0JBQ2IsT0FBTzt3QkFDUCxPQUFPLFFBQVEsS0FBSyx3QkFBd0IsUUFBUSxRQUFRO3dCQUM1RCxPQUFPLFFBQVEsS0FBSyxzQkFBc0IsT0FBTyxPQUFPLFFBQVEsTUFBTSxLQUFLLFFBQVE7d0JBQ25GLE9BQU8sUUFBUSxLQUFLLHNCQUFzQixPQUFPLE9BQU8sUUFBUSxNQUFNLEtBQUssUUFBUTt3QkFDbkYsT0FBTyxhQUFhLE9BQU8sT0FBTyxRQUFRLFNBQVMsUUFBUTs7Ozs7O0dBYXBFIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvTW9yZUxlc3NMaXN0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTcgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9jb21tb24vaTE4bi9Nb2NrVHJhbnNsYXRlRmlsdGVyJztcblxuZGVzY3JpYmUoJ3NwTW9yZUxlc3NMaXN0JywgKCkgPT4ge1xuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9XG4gICAgICAgICAgICBgPHNwLW1vcmUtbGVzcy1saXN0IHNwLWl0ZW1zPVwiaXRlbXNcIiBzcC1hZGRpdGlvbmFsLXNjb3BlPVwiYWRkaXRpb25hbFNjb3BlXCI+XG4gICAgICAgICAgICAgIHt7IG1vcmVMZXNzSXRlbSB9fSAtIHt7IG90aGVyVGhpbmcgfX1cbiAgICAgICAgICAgIDwvc3AtbW9yZS1sZXNzLWxpc3Q+YCxcbiAgICAgICAgZWxlbWVudCwgJHNjb3BlLCAkY29tcGlsZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKCRyb290U2NvcGUsIF8kY29tcGlsZV8sIHNwVHJhbnNsYXRlRmlsdGVyKSA9PiB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgc3BUcmFuc2xhdGVGaWx0ZXIuY29uZmlndXJlQ2F0YWxvZyh7XG4gICAgICAgICAgICAndWlfbW9yZV9sZXNzX2xpc3RfbW9yZV9idG4nOiAnezB9IG1vcmUnLFxuICAgICAgICAgICAgJ3VpX21vcmVfbGVzc19saXN0X2xlc3NfYnRuJyA6ICdMZXNzJ1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtcywgYWRkaXRpb25hbFNjb3BlKSB7XG4gICAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICAkc2NvcGUuYWRkaXRpb25hbFNjb3BlID0gYWRkaXRpb25hbFNjb3BlO1xuXG4gICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgaXQoJ3dvcmtzIHdpdGggbm8gaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KHVuZGVmaW5lZCkpLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvd3MgbGlzdCBvZiBpdGVtcycsICgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW1zID0gWydBJywgJ0InXTtcbiAgICAgICAgY3JlYXRlRWxlbWVudChpdGVtcyk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5tb3JlLWxlc3MtbGlzdC1pdGVtJykubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjbW9yZUxlc3NMaXN0SXRlbTAnKS50ZXh0KCkudHJpbSgpLmluZGV4T2YoJ0EnKSkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI21vcmVMZXNzTGlzdEl0ZW0xJykudGV4dCgpLnRyaW0oKS5pbmRleE9mKCdCJykpLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhZGRpdGlvbmFsIHNjb3BlIHRvIGF2YWlsYWJsZSBzY29wZSBmb3IgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpdGVtcyA9IFsnQScsICdCJ10sXG4gICAgICAgICAgICBhZGRpdGlvbmFsU2NvcGUgPSB7XG4gICAgICAgICAgICAgICAgb3RoZXJUaGluZzogJ0hFTExPISdcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbXMsIGFkZGl0aW9uYWxTY29wZSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNtb3JlTGVzc0xpc3RJdGVtMCcpLnRleHQoKS50cmltKCkuaW5kZXhPZignQSAtIEhFTExPIScpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjbW9yZUxlc3NMaXN0SXRlbTEnKS50ZXh0KCkudHJpbSgpLmluZGV4T2YoJ0IgLSBIRUxMTyEnKSkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0b2dnbGUgbW9yZS9sZXNzJywgKCkgPT4ge1xuICAgICAgICBsZXQgaXRlbXMgPSBbJ0EnLCAnQicsICdDJywgJ0QnXTtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgdHJ1bmNhdGVkIGxpc3QgaWYgbW9yZSB0aGFuIHR3byBpdGVtcycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJy5tb3JlLWxlc3MtbGlzdC1pdGVtJykubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnI21vcmVMZXNzTGlzdEl0ZW0wJykudGV4dCgpLnRyaW0oKS5pbmRleE9mKGl0ZW1zWzBdKSkudG9FcXVhbCgwKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNtb3JlTGVzc0xpc3RJdGVtMScpLnRleHQoKS50cmltKCkuaW5kZXhPZihpdGVtc1sxXSkpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyB0b2dnbGUgYnV0dG9uIHdpdGggcmVtYWluaW5nIGl0ZW0gY291bnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24ubW9yZS1sZXNzLWxpc3QtdG9nZ2xlLWJ0bicpO1xuICAgICAgICAgICAgZXhwZWN0KHRvZ2dsZUJ1dHRvbi5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QodG9nZ2xlQnV0dG9uLnRleHQoKS50cmltKCkuaW5kZXhPZignMiBtb3JlJykpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyBhbGwgaXRlbXMgd2hlbiB0b2dnbGUgYnV0dG9uIGlzIGNsaWNrZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24ubW9yZS1sZXNzLWxpc3QtdG9nZ2xlLWJ0bicpO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcubW9yZS1sZXNzLWxpc3QtaXRlbScpLmxlbmd0aCkudG9FcXVhbCg0KTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJyNtb3JlTGVzc0xpc3RJdGVtMicpLnRleHQoKS50cmltKCkuaW5kZXhPZihpdGVtc1syXSkpLnRvRXF1YWwoMCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCcjbW9yZUxlc3NMaXN0SXRlbTMnKS50ZXh0KCkudHJpbSgpLmluZGV4T2YoaXRlbXNbM10pKS50b0VxdWFsKDApO1xuICAgICAgICAgICAgZXhwZWN0KHRvZ2dsZUJ1dHRvbi50ZXh0KCkudHJpbSgpLmluZGV4T2YoJ0xlc3MnKSkudG9FcXVhbCgwKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
