System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('CurrentPageInfoDirective', function () {
                var $scope,
                    $compile,
                    translateSpy,
                    elementDefinition = '<sp-current-page-info ng-model="pagingData"/>',
                    eltHideFalse = '<sp-current-page-info ng-model="pagingData" sp-hide-total="false" />',
                    eltHideTrue = '<sp-current-page-info ng-model="pagingData" sp-hide-total="true" />';

                beforeEach(module(directiveModule));

                /* Mock spTranslate so we can observe the arguments */
                beforeEach(module(function (_$provide_) {
                    translateSpy = jasmine.createSpy();
                    _$provide_.value('spTranslateFilter', translateSpy);
                }));

                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                }));

                it('should render show the first page of details', function () {
                    var results;
                    updatePagingData(1, 10, 50);
                    createElement();
                    results = getResults();
                    expect(results.start).toEqual(1);
                    expect(results.end).toEqual(10);
                    expect(results.getTotal()).toEqual(50);
                });

                it('should show the right number on the last page', function () {
                    var results;
                    updatePagingData(2, 10, 13);
                    createElement();
                    results = getResults();
                    expect(results.start).toEqual(11);
                    expect(results.getTotal()).toEqual(13);
                    expect(results.end).toEqual(13);
                });

                it('should show the right page information when currentPage is changed', function () {
                    var results;
                    updatePagingData(1, 5, 20);
                    createElement();
                    results = getResults();
                    expect(results.start).toEqual(1);
                    expect(results.end).toEqual(5);
                    expect(results.getTotal()).toEqual(20);
                    /* Change the page */
                    $scope.pagingData.currentPage = 2;
                    $scope.$digest();
                    results = getResults();
                    expect(results.start).toEqual(6);
                    expect(results.end).toEqual(10);
                    expect(results.getTotal()).toEqual(20);
                });

                describe('sp-hide-total', function () {
                    beforeEach(function () {
                        updatePagingData(1, 5, 20);
                    });

                    it('shows the total when false', function () {
                        var results;
                        createElement(eltHideFalse);
                        results = getResults();
                        expect(results.start).toEqual(1);
                        expect(results.end).toEqual(5);
                        expect(results.total).toEqual(20);
                    });

                    it('hides the total when true', function () {
                        var results;
                        createElement(eltHideTrue);
                        results = getResults();
                        expect(results.start).toEqual(1);
                        expect(results.end).toEqual(5);
                        expect(results.total).toBeUndefined();
                    });
                });

                function createElement(def) {
                    var element;
                    def = def || elementDefinition;
                    element = angular.element(def);
                    $compile(element)($scope);
                    $scope.$apply();
                }

                function getResults() {
                    return {
                        start: translateSpy.calls.mostRecent().args[1],
                        end: translateSpy.calls.mostRecent().args[2],
                        total: translateSpy.calls.mostRecent().args[3],
                        getTotal: function () {
                            return this.total;
                        }
                    };
                }

                function updatePagingData(currentPage, itemsPerPage, total) {
                    $scope.pagingData = {
                        currentPage: currentPage,
                        total: total,
                        getTotal: function () {
                            return this.total;
                        },
                        itemsPerPage: itemsPerPage
                    };
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvQ3VycmVudFBhZ2VJbmZvRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFDaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUk7b0JBQVE7b0JBQVU7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZixjQUFjOztnQkFFbEIsV0FBVyxPQUFPOzs7Z0JBR2xCLFdBQVcsT0FBTyxVQUFTLFlBQVk7b0JBQ25DLGVBQWUsUUFBUTtvQkFDdkIsV0FBVyxNQUFNLHFCQUFxQjs7O2dCQUcxQyxXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVk7b0JBQ2pELFNBQVMsYUFBYTtvQkFDdEIsV0FBVzs7O2dCQUdmLEdBQUcsZ0RBQWdELFlBQVc7b0JBQzFELElBQUk7b0JBQ0osaUJBQWlCLEdBQUcsSUFBSTtvQkFDeEI7b0JBQ0EsVUFBVTtvQkFDVixPQUFPLFFBQVEsT0FBTyxRQUFRO29CQUM5QixPQUFPLFFBQVEsS0FBSyxRQUFRO29CQUM1QixPQUFPLFFBQVEsWUFBWSxRQUFROzs7Z0JBR3ZDLEdBQUcsaURBQWlELFlBQVc7b0JBQzNELElBQUk7b0JBQ0osaUJBQWlCLEdBQUcsSUFBSTtvQkFDeEI7b0JBQ0EsVUFBVTtvQkFDVixPQUFPLFFBQVEsT0FBTyxRQUFRO29CQUM5QixPQUFPLFFBQVEsWUFBWSxRQUFRO29CQUNuQyxPQUFPLFFBQVEsS0FBSyxRQUFROzs7Z0JBR2hDLEdBQUcsc0VBQXNFLFlBQVc7b0JBQ2hGLElBQUk7b0JBQ0osaUJBQWlCLEdBQUcsR0FBRztvQkFDdkI7b0JBQ0EsVUFBVTtvQkFDVixPQUFPLFFBQVEsT0FBTyxRQUFRO29CQUM5QixPQUFPLFFBQVEsS0FBSyxRQUFRO29CQUM1QixPQUFPLFFBQVEsWUFBWSxRQUFROztvQkFFbkMsT0FBTyxXQUFXLGNBQWM7b0JBQ2hDLE9BQU87b0JBQ1AsVUFBVTtvQkFDVixPQUFPLFFBQVEsT0FBTyxRQUFRO29CQUM5QixPQUFPLFFBQVEsS0FBSyxRQUFRO29CQUM1QixPQUFPLFFBQVEsWUFBWSxRQUFROzs7Z0JBR3ZDLFNBQVMsaUJBQWlCLFlBQVc7b0JBQ2pDLFdBQVcsWUFBVzt3QkFDbEIsaUJBQWlCLEdBQUcsR0FBRzs7O29CQUczQixHQUFHLDhCQUE4QixZQUFXO3dCQUN4QyxJQUFJO3dCQUNKLGNBQWM7d0JBQ2QsVUFBVTt3QkFDVixPQUFPLFFBQVEsT0FBTyxRQUFRO3dCQUM5QixPQUFPLFFBQVEsS0FBSyxRQUFRO3dCQUM1QixPQUFPLFFBQVEsT0FBTyxRQUFROzs7b0JBR2xDLEdBQUcsNkJBQTZCLFlBQVc7d0JBQ3ZDLElBQUk7d0JBQ0osY0FBYzt3QkFDZCxVQUFVO3dCQUNWLE9BQU8sUUFBUSxPQUFPLFFBQVE7d0JBQzlCLE9BQU8sUUFBUSxLQUFLLFFBQVE7d0JBQzVCLE9BQU8sUUFBUSxPQUFPOzs7O2dCQUk5QixTQUFTLGNBQWMsS0FBSztvQkFDeEIsSUFBSTtvQkFDSixNQUFNLE9BQU87b0JBQ2IsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLFNBQVMsYUFBYTtvQkFDbEIsT0FBTzt3QkFDSCxPQUFPLGFBQWEsTUFBTSxhQUFhLEtBQUs7d0JBQzVDLEtBQUssYUFBYSxNQUFNLGFBQWEsS0FBSzt3QkFDMUMsT0FBTyxhQUFhLE1BQU0sYUFBYSxLQUFLO3dCQUM1QyxVQUFVLFlBQVc7NEJBQ2pCLE9BQU8sS0FBSzs7Ozs7Z0JBS3hCLFNBQVMsaUJBQWlCLGFBQWEsY0FBYyxPQUFPO29CQUN4RCxPQUFPLGFBQWE7d0JBQ2hCLGFBQWE7d0JBQ2IsT0FBTzt3QkFDUCxVQUFVLFlBQVc7NEJBQ2pCLE9BQU8sS0FBSzs7d0JBRWhCLGNBQWM7Ozs7OztHQWV2QiIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0N1cnJlbnRQYWdlSW5mb0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0N1cnJlbnRQYWdlSW5mb0RpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2NvcGUsICRjb21waWxlLCB0cmFuc2xhdGVTcHksXG4gICAgICAgIGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1jdXJyZW50LXBhZ2UtaW5mbyBuZy1tb2RlbD1cInBhZ2luZ0RhdGFcIi8+JyxcbiAgICAgICAgZWx0SGlkZUZhbHNlID0gJzxzcC1jdXJyZW50LXBhZ2UtaW5mbyBuZy1tb2RlbD1cInBhZ2luZ0RhdGFcIiBzcC1oaWRlLXRvdGFsPVwiZmFsc2VcIiAvPicsXG4gICAgICAgIGVsdEhpZGVUcnVlID0gJzxzcC1jdXJyZW50LXBhZ2UtaW5mbyBuZy1tb2RlbD1cInBhZ2luZ0RhdGFcIiBzcC1oaWRlLXRvdGFsPVwidHJ1ZVwiIC8+JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgLyogTW9jayBzcFRyYW5zbGF0ZSBzbyB3ZSBjYW4gb2JzZXJ2ZSB0aGUgYXJndW1lbnRzICovXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oXyRwcm92aWRlXykge1xuICAgICAgICB0cmFuc2xhdGVTcHkgPSBqYXNtaW5lLmNyZWF0ZVNweSgpO1xuICAgICAgICBfJHByb3ZpZGVfLnZhbHVlKCdzcFRyYW5zbGF0ZUZpbHRlcicsIHRyYW5zbGF0ZVNweSk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbmRlciBzaG93IHRoZSBmaXJzdCBwYWdlIG9mIGRldGFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgIHVwZGF0ZVBhZ2luZ0RhdGEoMSwgMTAsIDUwKTtcbiAgICAgICAgY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICByZXN1bHRzID0gZ2V0UmVzdWx0cygpO1xuICAgICAgICBleHBlY3QocmVzdWx0cy5zdGFydCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuZW5kKS50b0VxdWFsKDEwKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuZ2V0VG90YWwoKSkudG9FcXVhbCg1MCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNob3cgdGhlIHJpZ2h0IG51bWJlciBvbiB0aGUgbGFzdCBwYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHRzO1xuICAgICAgICB1cGRhdGVQYWdpbmdEYXRhKDIsIDEwLCAxMyk7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgcmVzdWx0cyA9IGdldFJlc3VsdHMoKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuc3RhcnQpLnRvRXF1YWwoMTEpO1xuICAgICAgICBleHBlY3QocmVzdWx0cy5nZXRUb3RhbCgpKS50b0VxdWFsKDEzKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuZW5kKS50b0VxdWFsKDEzKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2hvdyB0aGUgcmlnaHQgcGFnZSBpbmZvcm1hdGlvbiB3aGVuIGN1cnJlbnRQYWdlIGlzIGNoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgIHVwZGF0ZVBhZ2luZ0RhdGEoMSwgNSwgMjApO1xuICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIHJlc3VsdHMgPSBnZXRSZXN1bHRzKCk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRzLnN0YXJ0KS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0cy5lbmQpLnRvRXF1YWwoNSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRzLmdldFRvdGFsKCkpLnRvRXF1YWwoMjApO1xuICAgICAgICAvKiBDaGFuZ2UgdGhlIHBhZ2UgKi9cbiAgICAgICAgJHNjb3BlLnBhZ2luZ0RhdGEuY3VycmVudFBhZ2UgPSAyO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICByZXN1bHRzID0gZ2V0UmVzdWx0cygpO1xuICAgICAgICBleHBlY3QocmVzdWx0cy5zdGFydCkudG9FcXVhbCg2KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuZW5kKS50b0VxdWFsKDEwKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdHMuZ2V0VG90YWwoKSkudG9FcXVhbCgyMCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3AtaGlkZS10b3RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdXBkYXRlUGFnaW5nRGF0YSgxLCA1LCAyMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG93cyB0aGUgdG90YWwgd2hlbiBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGVsdEhpZGVGYWxzZSk7XG4gICAgICAgICAgICByZXN1bHRzID0gZ2V0UmVzdWx0cygpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdHMuc3RhcnQpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0cy5lbmQpLnRvRXF1YWwoNSk7XG4gICAgICAgICAgICBleHBlY3QocmVzdWx0cy50b3RhbCkudG9FcXVhbCgyMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdoaWRlcyB0aGUgdG90YWwgd2hlbiB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0cztcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWx0SGlkZVRydWUpO1xuICAgICAgICAgICAgcmVzdWx0cyA9IGdldFJlc3VsdHMoKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXN1bHRzLnN0YXJ0KS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdHMuZW5kKS50b0VxdWFsKDUpO1xuICAgICAgICAgICAgZXhwZWN0KHJlc3VsdHMudG90YWwpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGRlZikge1xuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgZGVmID0gZGVmIHx8IGVsZW1lbnREZWZpbml0aW9uO1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGRlZik7XG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRSZXN1bHRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHRyYW5zbGF0ZVNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1sxXSxcbiAgICAgICAgICAgIGVuZDogdHJhbnNsYXRlU3B5LmNhbGxzLm1vc3RSZWNlbnQoKS5hcmdzWzJdLFxuICAgICAgICAgICAgdG90YWw6IHRyYW5zbGF0ZVNweS5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1szXSxcbiAgICAgICAgICAgIGdldFRvdGFsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQYWdpbmdEYXRhKGN1cnJlbnRQYWdlLCBpdGVtc1BlclBhZ2UsIHRvdGFsKSB7XG4gICAgICAgICRzY29wZS5wYWdpbmdEYXRhID0ge1xuICAgICAgICAgICAgY3VycmVudFBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgICAgZ2V0VG90YWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGl0ZW1zUGVyUGFnZTogaXRlbXNQZXJQYWdlXG4gICAgICAgIH07XG4gICAgfVxuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
