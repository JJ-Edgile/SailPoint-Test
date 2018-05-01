System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule'], function (_export) {
    'use strict';

    var accessRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }],
        execute: function () {

            describe('spAccessRequestSearchTypeButton', function () {
                var definition = '<sp-access-request-search-type-button sp-controller="testController" sp-button-id="searchTypeButton">' + '</sp-access-request-search-type-button>',
                    $compile,
                    $scope,
                    SEARCH_TYPE_KEYWORD,
                    SEARCH_TYPE_POPULATION,
                    identitySearchAllowed,
                    populationSearchAllowed;

                function createElement(definition) {
                    var element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function findDropdownMenu(element) {
                    return element.find('.dropdown-menu')[0];
                }

                function isDropdownRendered(element) {
                    return element.find('.dropdown-directive').length > 0;
                }

                beforeEach(module(accessRequestModule));

                beforeEach(inject(function ($rootScope, _$compile_, _SEARCH_TYPE_KEYWORD_, _SEARCH_TYPE_POPULATION_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    SEARCH_TYPE_POPULATION = _SEARCH_TYPE_POPULATION_;
                    identitySearchAllowed = true;
                    populationSearchAllowed = true;

                    $scope.testController = {
                        getSearchType: function () {
                            return SEARCH_TYPE_KEYWORD;
                        },

                        isIdentitySearchAllowed: jasmine.createSpy().and.callFake(function () {
                            return identitySearchAllowed;
                        }),

                        isPopulationSearchAllowed: jasmine.createSpy().and.callFake(function () {
                            return populationSearchAllowed;
                        }),

                        search: jasmine.createSpy(),

                        changeSearchType: jasmine.createSpy()
                    };
                }));

                it('should render dropdown with correct menu options', function () {
                    var element = createElement(definition),
                        menuElement = findDropdownMenu(element);
                    expect(menuElement.children.length).toEqual(3);
                    expect(menuElement.children[0].innerText.trim()).toEqual('ui_access_request_search_by_keyword');
                    expect(menuElement.children[1].innerText.trim()).toEqual('ui_access_request_search_by_identity');
                    expect(menuElement.children[2].innerText.trim()).toEqual('ui_access_request_search_by_population');
                });

                it('should not render identity search option if not allowed', function () {
                    var element, menuElement;
                    identitySearchAllowed = false;
                    element = createElement(definition);
                    expect(isDropdownRendered(element)).toEqual(true);
                    menuElement = findDropdownMenu(element);

                    expect(menuElement.children.length).toEqual(2);
                    expect(menuElement.children[0].innerText.trim()).toEqual('ui_access_request_search_by_keyword');
                    expect(menuElement.children[1].innerText.trim()).toEqual('ui_access_request_search_by_population');
                });

                it('should not render population search option if not allowed', function () {
                    var element, menuElement;
                    populationSearchAllowed = false;
                    element = createElement(definition);
                    expect(isDropdownRendered(element)).toEqual(true);
                    menuElement = findDropdownMenu(element);

                    expect(menuElement.children.length).toEqual(2);
                    expect(menuElement.children[0].innerText.trim()).toEqual('ui_access_request_search_by_keyword');
                    expect(menuElement.children[1].innerText.trim()).toEqual('ui_access_request_search_by_identity');
                });

                it('should not render dropdown if both identity and population searches are not allowed', function () {
                    var element;
                    identitySearchAllowed = false;
                    populationSearchAllowed = false;
                    element = createElement(definition);

                    expect(isDropdownRendered(element)).toEqual(false);
                });

                it('should call the controller changeSearchType and search method when selected', function () {
                    var element = createElement(definition),
                        menuElement = findDropdownMenu(element);
                    angular.element(menuElement.children[2].children[0]).click();
                    $scope.$apply();
                    expect($scope.testController.changeSearchType).toHaveBeenCalledWith(SEARCH_TYPE_POPULATION);
                    expect($scope.testController.search).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdFNlYXJjaFR5cGVCdXR0b25EaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUztJQUNqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7O1FBRTVELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxtQ0FBbUMsWUFBVztnQkFDbkQsSUFBSSxhQUNJLDBHQUNJO29CQUNSO29CQUFVO29CQUFRO29CQUFxQjtvQkFDdkM7b0JBQXVCOztnQkFHM0IsU0FBUyxjQUFjLFlBQVk7b0JBQy9CLElBQUksVUFBVSxRQUFRLFFBQVE7b0JBQzlCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsU0FBUyxpQkFBaUIsU0FBUztvQkFDL0IsT0FBTyxRQUFRLEtBQUssa0JBQWtCOzs7Z0JBRzFDLFNBQVMsbUJBQW1CLFNBQVM7b0JBQ2pDLE9BQU8sUUFBUSxLQUFLLHVCQUF1QixTQUFTOzs7Z0JBR3hELFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWSx1QkFBdUIsMEJBQTBCO29CQUNoRyxTQUFTLFdBQVc7b0JBQ3BCLFdBQVc7b0JBQ1gsc0JBQXNCO29CQUN0Qix5QkFBeUI7b0JBQ3pCLHdCQUF3QjtvQkFDeEIsMEJBQTBCOztvQkFFMUIsT0FBTyxpQkFBaUI7d0JBQ3BCLGVBQWUsWUFBVzs0QkFDdEIsT0FBTzs7O3dCQUdYLHlCQUEwQixRQUFRLFlBQVksSUFBSSxTQUFTLFlBQVc7NEJBQ2xFLE9BQU87Ozt3QkFHWCwyQkFBMkIsUUFBUSxZQUFZLElBQUksU0FBUyxZQUFXOzRCQUNuRSxPQUFPOzs7d0JBR1gsUUFBUSxRQUFROzt3QkFFaEIsa0JBQWtCLFFBQVE7Ozs7Z0JBSWxDLEdBQUksb0RBQW9ELFlBQVc7b0JBQy9ELElBQUksVUFBVSxjQUFjO3dCQUN4QixjQUFjLGlCQUFpQjtvQkFDbkMsT0FBTyxZQUFZLFNBQVMsUUFBUSxRQUFRO29CQUM1QyxPQUFPLFlBQVksU0FBUyxHQUFHLFVBQVUsUUFBUSxRQUFRO29CQUN6RCxPQUFPLFlBQVksU0FBUyxHQUFHLFVBQVUsUUFBUSxRQUFRO29CQUN6RCxPQUFPLFlBQVksU0FBUyxHQUFHLFVBQVUsUUFBUSxRQUFROzs7Z0JBRzdELEdBQUksMkRBQTJELFlBQVc7b0JBQ3RFLElBQUksU0FBUztvQkFDYix3QkFBd0I7b0JBQ3hCLFVBQVUsY0FBYztvQkFDeEIsT0FBTyxtQkFBbUIsVUFBVSxRQUFRO29CQUM1QyxjQUFjLGlCQUFpQjs7b0JBRS9CLE9BQU8sWUFBWSxTQUFTLFFBQVEsUUFBUTtvQkFDNUMsT0FBTyxZQUFZLFNBQVMsR0FBRyxVQUFVLFFBQVEsUUFBUTtvQkFDekQsT0FBTyxZQUFZLFNBQVMsR0FBRyxVQUFVLFFBQVEsUUFBUTs7O2dCQUc3RCxHQUFJLDZEQUE2RCxZQUFXO29CQUN4RSxJQUFJLFNBQVM7b0JBQ2IsMEJBQTBCO29CQUMxQixVQUFVLGNBQWM7b0JBQ3hCLE9BQU8sbUJBQW1CLFVBQVUsUUFBUTtvQkFDNUMsY0FBYyxpQkFBaUI7O29CQUUvQixPQUFPLFlBQVksU0FBUyxRQUFRLFFBQVE7b0JBQzVDLE9BQU8sWUFBWSxTQUFTLEdBQUcsVUFBVSxRQUFRLFFBQVE7b0JBQ3pELE9BQU8sWUFBWSxTQUFTLEdBQUcsVUFBVSxRQUFRLFFBQVE7OztnQkFHN0QsR0FBSSx1RkFBdUYsWUFBVztvQkFDbEcsSUFBSTtvQkFDSix3QkFBd0I7b0JBQ3hCLDBCQUEwQjtvQkFDMUIsVUFBVSxjQUFjOztvQkFFeEIsT0FBTyxtQkFBbUIsVUFBVSxRQUFROzs7Z0JBR2hELEdBQUksK0VBQStFLFlBQVc7b0JBQzFGLElBQUksVUFBVSxjQUFjO3dCQUN4QixjQUFjLGlCQUFpQjtvQkFDbkMsUUFBUSxRQUFRLFlBQVksU0FBUyxHQUFHLFNBQVMsSUFBSTtvQkFDckQsT0FBTztvQkFDUCxPQUFPLE9BQU8sZUFBZSxrQkFBa0IscUJBQXFCO29CQUNwRSxPQUFPLE9BQU8sZUFBZSxRQUFROzs7OztHQWExQyIsImZpbGUiOiJhY2Nlc3NSZXF1ZXN0L0FjY2Vzc1JlcXVlc3RTZWFyY2hUeXBlQnV0dG9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhY2Nlc3NSZXF1ZXN0TW9kdWxlIGZyb20gJ2FjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcEFjY2Vzc1JlcXVlc3RTZWFyY2hUeXBlQnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlZmluaXRpb24gPVxuICAgICAgICAgICAgJzxzcC1hY2Nlc3MtcmVxdWVzdC1zZWFyY2gtdHlwZS1idXR0b24gc3AtY29udHJvbGxlcj1cInRlc3RDb250cm9sbGVyXCIgc3AtYnV0dG9uLWlkPVwic2VhcmNoVHlwZUJ1dHRvblwiPicgK1xuICAgICAgICAgICAgICAgICc8L3NwLWFjY2Vzcy1yZXF1ZXN0LXNlYXJjaC10eXBlLWJ1dHRvbj4nLFxuICAgICAgICAkY29tcGlsZSwgJHNjb3BlLCBTRUFSQ0hfVFlQRV9LRVlXT1JELCBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OLFxuICAgICAgICBpZGVudGl0eVNlYXJjaEFsbG93ZWQsIHBvcHVsYXRpb25TZWFyY2hBbGxvd2VkO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZERyb3Bkb3duTWVudShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JylbMF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEcm9wZG93blJlbmRlcmVkKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLWRpcmVjdGl2ZScpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXywgX1NFQVJDSF9UWVBFX0tFWVdPUkRfLCBfU0VBUkNIX1RZUEVfUE9QVUxBVElPTl8pIHtcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgU0VBUkNIX1RZUEVfS0VZV09SRCA9IF9TRUFSQ0hfVFlQRV9LRVlXT1JEXztcbiAgICAgICAgU0VBUkNIX1RZUEVfUE9QVUxBVElPTiA9IF9TRUFSQ0hfVFlQRV9QT1BVTEFUSU9OXztcbiAgICAgICAgaWRlbnRpdHlTZWFyY2hBbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgcG9wdWxhdGlvblNlYXJjaEFsbG93ZWQgPSB0cnVlO1xuXG4gICAgICAgICRzY29wZS50ZXN0Q29udHJvbGxlciA9IHtcbiAgICAgICAgICAgIGdldFNlYXJjaFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTRUFSQ0hfVFlQRV9LRVlXT1JEO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaXNJZGVudGl0eVNlYXJjaEFsbG93ZWQgOiBqYXNtaW5lLmNyZWF0ZVNweSgpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWRlbnRpdHlTZWFyY2hBbGxvd2VkO1xuICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgIGlzUG9wdWxhdGlvblNlYXJjaEFsbG93ZWQ6IGphc21pbmUuY3JlYXRlU3B5KCkuYW5kLmNhbGxGYWtlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3B1bGF0aW9uU2VhcmNoQWxsb3dlZDtcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBzZWFyY2g6IGphc21pbmUuY3JlYXRlU3B5KCksXG5cbiAgICAgICAgICAgIGNoYW5nZVNlYXJjaFR5cGU6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBpdCAoJ3Nob3VsZCByZW5kZXIgZHJvcGRvd24gd2l0aCBjb3JyZWN0IG1lbnUgb3B0aW9ucycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbiksXG4gICAgICAgICAgICBtZW51RWxlbWVudCA9IGZpbmREcm9wZG93bk1lbnUoZWxlbWVudCk7XG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwoMyk7XG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlblswXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKCd1aV9hY2Nlc3NfcmVxdWVzdF9zZWFyY2hfYnlfa2V5d29yZCcpO1xuICAgICAgICBleHBlY3QobWVudUVsZW1lbnQuY2hpbGRyZW5bMV0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgndWlfYWNjZXNzX3JlcXVlc3Rfc2VhcmNoX2J5X2lkZW50aXR5Jyk7XG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlblsyXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKCd1aV9hY2Nlc3NfcmVxdWVzdF9zZWFyY2hfYnlfcG9wdWxhdGlvbicpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdzaG91bGQgbm90IHJlbmRlciBpZGVudGl0eSBzZWFyY2ggb3B0aW9uIGlmIG5vdCBhbGxvd2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50LCBtZW51RWxlbWVudDtcbiAgICAgICAgaWRlbnRpdHlTZWFyY2hBbGxvd2VkID0gZmFsc2U7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGRlZmluaXRpb24pO1xuICAgICAgICBleHBlY3QoaXNEcm9wZG93blJlbmRlcmVkKGVsZW1lbnQpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICBtZW51RWxlbWVudCA9IGZpbmREcm9wZG93bk1lbnUoZWxlbWVudCk7XG5cbiAgICAgICAgZXhwZWN0KG1lbnVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KG1lbnVFbGVtZW50LmNoaWxkcmVuWzBdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoJ3VpX2FjY2Vzc19yZXF1ZXN0X3NlYXJjaF9ieV9rZXl3b3JkJyk7XG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlblsxXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKCd1aV9hY2Nlc3NfcmVxdWVzdF9zZWFyY2hfYnlfcG9wdWxhdGlvbicpO1xuICAgIH0pO1xuXG4gICAgaXQgKCdzaG91bGQgbm90IHJlbmRlciBwb3B1bGF0aW9uIHNlYXJjaCBvcHRpb24gaWYgbm90IGFsbG93ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQsIG1lbnVFbGVtZW50O1xuICAgICAgICBwb3B1bGF0aW9uU2VhcmNoQWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgZXhwZWN0KGlzRHJvcGRvd25SZW5kZXJlZChlbGVtZW50KSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgbWVudUVsZW1lbnQgPSBmaW5kRHJvcGRvd25NZW51KGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChtZW51RWxlbWVudC5jaGlsZHJlblswXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKCd1aV9hY2Nlc3NfcmVxdWVzdF9zZWFyY2hfYnlfa2V5d29yZCcpO1xuICAgICAgICBleHBlY3QobWVudUVsZW1lbnQuY2hpbGRyZW5bMV0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgndWlfYWNjZXNzX3JlcXVlc3Rfc2VhcmNoX2J5X2lkZW50aXR5Jyk7XG4gICAgfSk7XG5cbiAgICBpdCAoJ3Nob3VsZCBub3QgcmVuZGVyIGRyb3Bkb3duIGlmIGJvdGggaWRlbnRpdHkgYW5kIHBvcHVsYXRpb24gc2VhcmNoZXMgYXJlIG5vdCBhbGxvd2VkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICBpZGVudGl0eVNlYXJjaEFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgcG9wdWxhdGlvblNlYXJjaEFsbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbik7XG5cbiAgICAgICAgZXhwZWN0KGlzRHJvcGRvd25SZW5kZXJlZChlbGVtZW50KSkudG9FcXVhbChmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCAoJ3Nob3VsZCBjYWxsIHRoZSBjb250cm9sbGVyIGNoYW5nZVNlYXJjaFR5cGUgYW5kIHNlYXJjaCBtZXRob2Qgd2hlbiBzZWxlY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVmaW5pdGlvbiksXG4gICAgICAgICAgICBtZW51RWxlbWVudCA9IGZpbmREcm9wZG93bk1lbnUoZWxlbWVudCk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChtZW51RWxlbWVudC5jaGlsZHJlblsyXS5jaGlsZHJlblswXSkuY2xpY2soKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnRlc3RDb250cm9sbGVyLmNoYW5nZVNlYXJjaFR5cGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnRlc3RDb250cm9sbGVyLnNlYXJjaCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
