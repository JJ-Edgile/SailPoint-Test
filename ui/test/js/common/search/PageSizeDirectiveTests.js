System.register(['test/js/TestInitializer', 'common/search/SearchModule'], function (_export) {
    'use strict';

    var searchModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonSearchSearchModule) {
            searchModule = _commonSearchSearchModule['default'];
        }],
        execute: function () {

            describe('spPageSize', function () {

                var elementDefinition = '<sp-page-size sp-paging-data="pagingData" sp-on-page-size-change="changePage()"/>',
                    $scope = undefined,
                    $compile = undefined;

                function createElement() {
                    var def = arguments.length <= 0 || arguments[0] === undefined ? elementDefinition : arguments[0];

                    var element = angular.element(def);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(searchModule));

                beforeEach(inject(function ($rootScope, _$compile_, PagingData) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;

                    $scope.pagingData = new PagingData(10);
                    $scope.changePage = jasmine.createSpy('changePage');
                }));

                function getPageSizeText(element) {
                    var pageToggle = element.find('#page-size-dropdown-toggle');
                    return pageToggle.text().trim();
                }

                function openMenu(element) {
                    element.find('#page-size-dropdown-toggle').click();
                }

                function getMenuItems(element) {
                    openMenu(element);
                    return element.find('.dropdown-menu li a');
                }

                function selectPageSize(element, idx) {
                    angular.element(getMenuItems(element)[idx]).click();
                }

                it('shows the current page size', function () {
                    var element = createElement(),
                        pageSize = getPageSizeText(element);
                    expect(pageSize).toContain('10');
                });

                it('shows the new page size after changing page size', function () {
                    var element = createElement();
                    selectPageSize(element, 1);
                    expect(getPageSizeText(element)).toContain('25');
                });

                describe('page selection', function () {
                    beforeEach(function () {
                        var element = createElement();
                        selectPageSize(element, 1);
                    });

                    it('sets the page size in the PagingData', function () {
                        expect($scope.pagingData.itemsPerPage).toEqual(25);
                    });

                    it('calls the onPageSizeChange() function', function () {
                        expect($scope.changePage).toHaveBeenCalledWith();
                    });
                });

                describe('page sizes', function () {
                    it('allows selecting 10, 25, 50 as page sizes by default', function () {
                        var element = createElement(),
                            menuItems = getMenuItems(element);
                        expect(menuItems.length).toEqual(3);
                        expect(menuItems[0].innerText).toContain('10');
                        expect(menuItems[1].innerText).toContain('25');
                        expect(menuItems[2].innerText).toContain('50');
                    });

                    it('uses configured page sizes if provided', function () {
                        var def = '<sp-page-size sp-paging-data="pagingData" ' + 'sp-on-page-size-change="changePage()" sp-page-sizes="pageSizes"/>',
                            pageSizes = [7, 15, 22, 99],
                            element = createElement(def),
                            menuItems = undefined;

                        $scope.pageSizes = pageSizes;
                        $scope.$apply();
                        menuItems = getMenuItems(element);
                        expect(menuItems.length).toEqual(4);
                        expect(menuItems[0].innerText).toContain(pageSizes[0]);
                        expect(menuItems[1].innerText).toContain(pageSizes[1]);
                        expect(menuItems[2].innerText).toContain(pageSizes[2]);
                        expect(menuItems[3].innerText).toContain(pageSizes[3]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zZWFyY2gvUGFnZVNpemVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUztJQUE5Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsY0FBYyxZQUFXOztnQkFFOUIsSUFBSSxvQkFDQTtvQkFDQSxTQUFNO29CQUFFLFdBQVE7O2dCQUVwQixTQUFTLGdCQUF1QztvQkFNaEMsSUFOTyxNQUFHLFVBQUEsVUFBQSxLQUFBLFVBQUEsT0FBQSxZQUFHLG9CQUFpQixVQUFBOztvQkFDMUMsSUFBSSxVQUFVLFFBQVEsUUFBUTtvQkFDOUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVksWUFBWTtvQkFDM0QsU0FBUyxXQUFXO29CQUNwQixXQUFXOztvQkFFWCxPQUFPLGFBQWEsSUFBSSxXQUFXO29CQUNuQyxPQUFPLGFBQWEsUUFBUSxVQUFVOzs7Z0JBRzFDLFNBQVMsZ0JBQWdCLFNBQVM7b0JBQzlCLElBQUksYUFBYSxRQUFRLEtBQUs7b0JBQzlCLE9BQU8sV0FBVyxPQUFPOzs7Z0JBRzdCLFNBQVMsU0FBUyxTQUFTO29CQUN2QixRQUFRLEtBQUssOEJBQThCOzs7Z0JBRy9DLFNBQVMsYUFBYSxTQUFTO29CQUMzQixTQUFTO29CQUNULE9BQU8sUUFBUSxLQUFLOzs7Z0JBR3hCLFNBQVMsZUFBZSxTQUFTLEtBQUs7b0JBQ2xDLFFBQVEsUUFBUSxhQUFhLFNBQVMsTUFBTTs7O2dCQUdoRCxHQUFHLCtCQUErQixZQUFXO29CQUN6QyxJQUFJLFVBQVU7d0JBQ1YsV0FBVyxnQkFBZ0I7b0JBQy9CLE9BQU8sVUFBVSxVQUFVOzs7Z0JBRy9CLEdBQUcsb0RBQW9ELFlBQVc7b0JBQzlELElBQUksVUFBVTtvQkFDZCxlQUFlLFNBQVM7b0JBQ3hCLE9BQU8sZ0JBQWdCLFVBQVUsVUFBVTs7O2dCQUcvQyxTQUFTLGtCQUFrQixZQUFXO29CQUNsQyxXQUFXLFlBQVc7d0JBQ2xCLElBQUksVUFBVTt3QkFDZCxlQUFlLFNBQVM7OztvQkFHNUIsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsT0FBTyxPQUFPLFdBQVcsY0FBYyxRQUFROzs7b0JBR25ELEdBQUcseUNBQXlDLFlBQVc7d0JBQ25ELE9BQU8sT0FBTyxZQUFZOzs7O2dCQUlsQyxTQUFTLGNBQWMsWUFBTTtvQkFDekIsR0FBRyx3REFBd0QsWUFBTTt3QkFDN0QsSUFBSSxVQUFVOzRCQUNWLFlBQVksYUFBYTt3QkFDN0IsT0FBTyxVQUFVLFFBQVEsUUFBUTt3QkFDakMsT0FBTyxVQUFVLEdBQUcsV0FBVyxVQUFVO3dCQUN6QyxPQUFPLFVBQVUsR0FBRyxXQUFXLFVBQVU7d0JBQ3pDLE9BQU8sVUFBVSxHQUFHLFdBQVcsVUFBVTs7O29CQUc3QyxHQUFHLDBDQUEwQyxZQUFNO3dCQUMvQyxJQUFJLE1BQU0sK0NBQ0Y7NEJBQ0osWUFBWSxDQUFFLEdBQUcsSUFBSSxJQUFJOzRCQUN6QixVQUFVLGNBQWM7NEJBQ3hCLFlBQVM7O3dCQUViLE9BQU8sWUFBWTt3QkFDbkIsT0FBTzt3QkFDUCxZQUFZLGFBQWE7d0JBQ3pCLE9BQU8sVUFBVSxRQUFRLFFBQVE7d0JBQ2pDLE9BQU8sVUFBVSxHQUFHLFdBQVcsVUFBVSxVQUFVO3dCQUNuRCxPQUFPLFVBQVUsR0FBRyxXQUFXLFVBQVUsVUFBVTt3QkFDbkQsT0FBTyxVQUFVLEdBQUcsV0FBVyxVQUFVLFVBQVU7d0JBQ25ELE9BQU8sVUFBVSxHQUFHLFdBQVcsVUFBVSxVQUFVOzs7Ozs7R0FZNUQiLCJmaWxlIjoiY29tbW9uL3NlYXJjaC9QYWdlU2l6ZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBzZWFyY2hNb2R1bGUgZnJvbSAnY29tbW9uL3NlYXJjaC9TZWFyY2hNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ3NwUGFnZVNpemUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPVxyXG4gICAgICAgICc8c3AtcGFnZS1zaXplIHNwLXBhZ2luZy1kYXRhPVwicGFnaW5nRGF0YVwiIHNwLW9uLXBhZ2Utc2l6ZS1jaGFuZ2U9XCJjaGFuZ2VQYWdlKClcIi8+JyxcclxuICAgICAgICAkc2NvcGUsICRjb21waWxlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZGVmID0gZWxlbWVudERlZmluaXRpb24pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWYpO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHNlYXJjaE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRyb290U2NvcGUsIF8kY29tcGlsZV8sIFBhZ2luZ0RhdGEpIHtcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcblxyXG4gICAgICAgICRzY29wZS5wYWdpbmdEYXRhID0gbmV3IFBhZ2luZ0RhdGEoMTApO1xyXG4gICAgICAgICRzY29wZS5jaGFuZ2VQYWdlID0gamFzbWluZS5jcmVhdGVTcHkoJ2NoYW5nZVBhZ2UnKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYWdlU2l6ZVRleHQoZWxlbWVudCkge1xyXG4gICAgICAgIGxldCBwYWdlVG9nZ2xlID0gZWxlbWVudC5maW5kKCcjcGFnZS1zaXplLWRyb3Bkb3duLXRvZ2dsZScpO1xyXG4gICAgICAgIHJldHVybiBwYWdlVG9nZ2xlLnRleHQoKS50cmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1lbnUoZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuZmluZCgnI3BhZ2Utc2l6ZS1kcm9wZG93bi10b2dnbGUnKS5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1lbnVJdGVtcyhlbGVtZW50KSB7XHJcbiAgICAgICAgb3Blbk1lbnUoZWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUgbGkgYScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFBhZ2VTaXplKGVsZW1lbnQsIGlkeCkge1xyXG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChnZXRNZW51SXRlbXMoZWxlbWVudClbaWR4XSkuY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc2hvd3MgdGhlIGN1cnJlbnQgcGFnZSBzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gZ2V0UGFnZVNpemVUZXh0KGVsZW1lbnQpO1xyXG4gICAgICAgIGV4cGVjdChwYWdlU2l6ZSkudG9Db250YWluKCcxMCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHRoZSBuZXcgcGFnZSBzaXplIGFmdGVyIGNoYW5naW5nIHBhZ2Ugc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgIHNlbGVjdFBhZ2VTaXplKGVsZW1lbnQsIDEpO1xyXG4gICAgICAgIGV4cGVjdChnZXRQYWdlU2l6ZVRleHQoZWxlbWVudCkpLnRvQ29udGFpbignMjUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdwYWdlIHNlbGVjdGlvbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBzZWxlY3RQYWdlU2l6ZShlbGVtZW50LCAxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3NldHMgdGhlIHBhZ2Ugc2l6ZSBpbiB0aGUgUGFnaW5nRGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLnBhZ2luZ0RhdGEuaXRlbXNQZXJQYWdlKS50b0VxdWFsKDI1KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbGxzIHRoZSBvblBhZ2VTaXplQ2hhbmdlKCkgZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5jaGFuZ2VQYWdlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BhZ2Ugc2l6ZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgaXQoJ2FsbG93cyBzZWxlY3RpbmcgMTAsIDI1LCA1MCBhcyBwYWdlIHNpemVzIGJ5IGRlZmF1bHQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1zID0gZ2V0TWVudUl0ZW1zKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCgzKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1swXS5pbm5lclRleHQpLnRvQ29udGFpbignMTAnKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1sxXS5pbm5lclRleHQpLnRvQ29udGFpbignMjUnKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1syXS5pbm5lclRleHQpLnRvQ29udGFpbignNTAnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3VzZXMgY29uZmlndXJlZCBwYWdlIHNpemVzIGlmIHByb3ZpZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJzxzcC1wYWdlLXNpemUgc3AtcGFnaW5nLWRhdGE9XCJwYWdpbmdEYXRhXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NwLW9uLXBhZ2Utc2l6ZS1jaGFuZ2U9XCJjaGFuZ2VQYWdlKClcIiBzcC1wYWdlLXNpemVzPVwicGFnZVNpemVzXCIvPicsXHJcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZXMgPSBbIDcsIDE1LCAyMiwgOTldLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoZGVmKSxcclxuICAgICAgICAgICAgICAgIG1lbnVJdGVtcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5wYWdlU2l6ZXMgPSBwYWdlU2l6ZXM7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zID0gZ2V0TWVudUl0ZW1zKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBleHBlY3QobWVudUl0ZW1zLmxlbmd0aCkudG9FcXVhbCg0KTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1swXS5pbm5lclRleHQpLnRvQ29udGFpbihwYWdlU2l6ZXNbMF0pO1xyXG4gICAgICAgICAgICBleHBlY3QobWVudUl0ZW1zWzFdLmlubmVyVGV4dCkudG9Db250YWluKHBhZ2VTaXplc1sxXSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChtZW51SXRlbXNbMl0uaW5uZXJUZXh0KS50b0NvbnRhaW4ocGFnZVNpemVzWzJdKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lbnVJdGVtc1szXS5pbm5lclRleHQpLnRvQ29udGFpbihwYWdlU2l6ZXNbM10pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
