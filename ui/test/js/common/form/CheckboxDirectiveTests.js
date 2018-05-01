System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {

            describe('CheckboxDirective', function () {

                var $compile = undefined,
                    $scope = undefined,
                    isChecked = undefined;

                beforeEach(module(formModule));

                beforeEach(inject(function (_$compile_, $rootScope) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();

                    // Mock out the functions on our scope.
                    isChecked = false;
                    $scope.isChecked = jasmine.createSpy('isChecked').and.callFake(function () {
                        return isChecked;
                    });
                    $scope.onClick = jasmine.createSpy('onClick');
                }));

                function createElement(readText) {
                    var definition = '<sp-checkbox sp-is-checked="isChecked()" sp-on-click="onClick($event)"' + 'sp-display-name="{{readText}}" />',
                        element = undefined;

                    $scope.readText = readText;
                    element = angular.element(definition);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function getCheckboxElement(element) {
                    var check = element.find('button');
                    expect(check.length).toEqual(1);
                    return angular.element(check[0]);
                }

                function isElementChecked(element) {
                    return getCheckboxElement(element).hasClass('fa-check-square-o');
                }

                it('shows as checked when spIsChecked() returns true', function () {
                    isChecked = true;
                    var element = createElement('');
                    expect($scope.isChecked).toHaveBeenCalled();
                    expect(isElementChecked(element)).toEqual(true);
                });

                it('shows as unchecked when spIsChecked() returns false', function () {
                    isChecked = false;
                    var element = createElement('');
                    expect($scope.isChecked).toHaveBeenCalled();
                    expect(isElementChecked(element)).toEqual(false);
                });

                it('calls spOnClick() when clicked', function () {
                    var element = createElement('');
                    getCheckboxElement(element).click();
                    expect($scope.onClick).toHaveBeenCalled();
                });

                it('should have a span with sr-only when readText is set', function () {
                    var element = createElement('someName');
                    var span = element.find('span');
                    expect(span.hasClass('sr-only')).toEqual(true);
                    expect(span.text().trim()).toBe($scope.readText);
                });

                it('should not have a span when readText is not set', function () {
                    var element = createElement('');
                    expect(element.find('span').length).toBe(0);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0NoZWNrYm94RGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLDJCQUEyQixVQUFVLFNBQVM7SUFDdEY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLHVCQUF1QjtZQUM3RSxhQUFhLHNCQUFzQjs7UUFFdkMsU0FBUyxZQUFZOztZQUw3QixTQUFTLHFCQUFxQixZQUFNOztnQkFFaEMsSUFBSSxXQUFRO29CQUFFLFNBQU07b0JBQUUsWUFBUzs7Z0JBRS9CLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFDLFlBQVksWUFBZTtvQkFDMUMsV0FBVztvQkFDWCxTQUFTLFdBQVc7OztvQkFHcEIsWUFBWTtvQkFDWixPQUFPLFlBQVksUUFBUSxVQUFVLGFBQWEsSUFBSSxTQUFTLFlBQU07d0JBQ2pFLE9BQU87O29CQUVYLE9BQU8sVUFBVSxRQUFRLFVBQVU7OztnQkFHdkMsU0FBUyxjQUFjLFVBQVU7b0JBQzdCLElBQUksYUFBYSwyRUFDQTt3QkFDYixVQUFPOztvQkFFWCxPQUFPLFdBQVc7b0JBQ2xCLFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFNBQVMsbUJBQW1CLFNBQVM7b0JBQ2pDLElBQUksUUFBUSxRQUFRLEtBQUs7b0JBQ3pCLE9BQU8sTUFBTSxRQUFRLFFBQVE7b0JBQzdCLE9BQU8sUUFBUSxRQUFRLE1BQU07OztnQkFHakMsU0FBUyxpQkFBaUIsU0FBUztvQkFDL0IsT0FBTyxtQkFBbUIsU0FBUyxTQUFTOzs7Z0JBR2hELEdBQUcsb0RBQW9ELFlBQU07b0JBQ3pELFlBQVk7b0JBQ1osSUFBSSxVQUFVLGNBQWM7b0JBQzVCLE9BQU8sT0FBTyxXQUFXO29CQUN6QixPQUFPLGlCQUFpQixVQUFVLFFBQVE7OztnQkFHOUMsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsWUFBWTtvQkFDWixJQUFJLFVBQVUsY0FBYztvQkFDNUIsT0FBTyxPQUFPLFdBQVc7b0JBQ3pCLE9BQU8saUJBQWlCLFVBQVUsUUFBUTs7O2dCQUc5QyxHQUFHLGtDQUFrQyxZQUFNO29CQUN2QyxJQUFJLFVBQVUsY0FBYztvQkFDNUIsbUJBQW1CLFNBQVM7b0JBQzVCLE9BQU8sT0FBTyxTQUFTOzs7Z0JBRzNCLEdBQUcsd0RBQXdELFlBQVc7b0JBQ2xFLElBQUksVUFBVSxjQUFjO29CQUM1QixJQUFJLE9BQU8sUUFBUSxLQUFLO29CQUN4QixPQUFPLEtBQUssU0FBUyxZQUFZLFFBQVE7b0JBQ3pDLE9BQU8sS0FBSyxPQUFPLFFBQVEsS0FBSyxPQUFPOzs7Z0JBRzNDLEdBQUcsbURBQW1ELFlBQVc7b0JBQzdELElBQUksVUFBVSxjQUFjO29CQUM1QixPQUFPLFFBQVEsS0FBSyxRQUFRLFFBQVEsS0FBSzs7Ozs7R0FhOUMiLCJmaWxlIjoiY29tbW9uL2Zvcm0vQ2hlY2tib3hEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDaGVja2JveERpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgJGNvbXBpbGUsICRzY29wZSwgaXNDaGVja2VkO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZvcm1Nb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdCgoXyRjb21waWxlXywgJHJvb3RTY29wZSkgPT4ge1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgLy8gTW9jayBvdXQgdGhlIGZ1bmN0aW9ucyBvbiBvdXIgc2NvcGUuXHJcbiAgICAgICAgaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzQ2hlY2tlZCA9IGphc21pbmUuY3JlYXRlU3B5KCdpc0NoZWNrZWQnKS5hbmQuY2FsbEZha2UoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNDaGVja2VkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS5vbkNsaWNrID0gamFzbWluZS5jcmVhdGVTcHkoJ29uQ2xpY2snKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHJlYWRUZXh0KSB7XHJcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLWNoZWNrYm94IHNwLWlzLWNoZWNrZWQ9XCJpc0NoZWNrZWQoKVwiIHNwLW9uLWNsaWNrPVwib25DbGljaygkZXZlbnQpXCInICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICdzcC1kaXNwbGF5LW5hbWU9XCJ7e3JlYWRUZXh0fX1cIiAvPicsXHJcbiAgICAgICAgICAgIGVsZW1lbnQ7XHJcblxyXG4gICAgICAgICRzY29wZS5yZWFkVGV4dCA9IHJlYWRUZXh0O1xyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmaW5pdGlvbik7XHJcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hlY2tib3hFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgY2hlY2sgPSBlbGVtZW50LmZpbmQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGV4cGVjdChjaGVjay5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChjaGVja1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNFbGVtZW50Q2hlY2tlZChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGdldENoZWNrYm94RWxlbWVudChlbGVtZW50KS5oYXNDbGFzcygnZmEtY2hlY2stc3F1YXJlLW8nKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgnc2hvd3MgYXMgY2hlY2tlZCB3aGVuIHNwSXNDaGVja2VkKCkgcmV0dXJucyB0cnVlJywgKCkgPT4ge1xyXG4gICAgICAgIGlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCcnKTtcclxuICAgICAgICBleHBlY3QoJHNjb3BlLmlzQ2hlY2tlZCkudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgICAgIGV4cGVjdChpc0VsZW1lbnRDaGVja2VkKGVsZW1lbnQpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIGFzIHVuY2hlY2tlZCB3aGVuIHNwSXNDaGVja2VkKCkgcmV0dXJucyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICBpc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJycpO1xyXG4gICAgICAgIGV4cGVjdCgkc2NvcGUuaXNDaGVja2VkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgZXhwZWN0KGlzRWxlbWVudENoZWNrZWQoZWxlbWVudCkpLnRvRXF1YWwoZmFsc2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ2NhbGxzIHNwT25DbGljaygpIHdoZW4gY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJycpO1xyXG4gICAgICAgIGdldENoZWNrYm94RWxlbWVudChlbGVtZW50KS5jbGljaygpO1xyXG4gICAgICAgIGV4cGVjdCgkc2NvcGUub25DbGljaykudG9IYXZlQmVlbkNhbGxlZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGEgc3BhbiB3aXRoIHNyLW9ubHkgd2hlbiByZWFkVGV4dCBpcyBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ3NvbWVOYW1lJyk7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBlbGVtZW50LmZpbmQoJ3NwYW4nKTtcclxuICAgICAgICBleHBlY3Qoc3Bhbi5oYXNDbGFzcygnc3Itb25seScpKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgIGV4cGVjdChzcGFuLnRleHQoKS50cmltKCkpLnRvQmUoJHNjb3BlLnJlYWRUZXh0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgbm90IGhhdmUgYSBzcGFuIHdoZW4gcmVhZFRleHQgaXMgbm90IHNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnJyk7XHJcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnc3BhbicpLmxlbmd0aCkudG9CZSgwKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
