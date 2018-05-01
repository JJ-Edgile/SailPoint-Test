System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PamGroupActionsDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    element = undefined,
                    ContainerGroup = undefined,
                    spModal = undefined;

                beforeEach(module(pamModule, testModule));
                beforeEach(inject(function (_$rootScope_, _$compile_, _spModal_, _ContainerGroup_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    spModal = _spModal_;
                    ContainerGroup = _ContainerGroup_;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function createElement() {
                    var definition = '<sp-pam-group-actions sp-model="group"></sp-pam-group-actions>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function createMockGroup() {
                    var group = new ContainerGroup({
                        id: 1,
                        displayName: 'Group'
                    });
                    return group;
                }

                it('should have details button', function () {
                    $scope.group = createMockGroup();
                    element = createElement();
                    var buttons = element.find('sp-details-button');
                    expect(buttons.length).toEqual(1);
                });

                it('should launch detail dialog when clicked detail button', function () {
                    $scope.group = createMockGroup();
                    element = createElement();
                    var detailButton = element.find('button')[0];
                    spyOn(spModal, 'open').and.callFake(angular.noop);
                    detailButton.click();
                    $scope.$apply();
                    expect(spModal.open).toHaveBeenCalled();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Hcm91cEFjdGlvbnNEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsaUJBQWlCLHVCQUF1QixVQUFVLFNBQVM7Ozs7SUFJbkc7O0lBRUEsSUFBSSxXQUFXO0lBQ2YsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsZUFBZTtZQUNyRSxZQUFZLGNBQWM7V0FDM0IsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyw0QkFBNEIsWUFBVztnQkFDNUMsSUFBSSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsVUFBTztvQkFBRSxpQkFBYztvQkFBRSxVQUFPOztnQkFFdEQsV0FBVyxPQUFPLFdBQVc7Z0JBQzdCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxXQUFXLGtCQUFrQjtvQkFDOUUsU0FBUztvQkFDVCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsaUJBQWlCOzs7Z0JBR3JCLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxnQkFBZ0I7b0JBQ3JCLElBQUksYUFBYTt3QkFDYixVQUFVLFNBQVMsWUFBWTtvQkFDbkMsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsU0FBUyxrQkFBa0I7b0JBQ3ZCLElBQUksUUFBUSxJQUFJLGVBQWU7d0JBQzNCLElBQUk7d0JBQ0osYUFBYTs7b0JBRWpCLE9BQU87OztnQkFHWCxHQUFHLDhCQUE4QixZQUFXO29CQUN4QyxPQUFPLFFBQVE7b0JBQ2YsVUFBVTtvQkFDVixJQUFJLFVBQVUsUUFBUSxLQUFLO29CQUMzQixPQUFPLFFBQVEsUUFBUSxRQUFROzs7Z0JBR25DLEdBQUcsMERBQTBELFlBQVc7b0JBQ3BFLE9BQU8sUUFBUTtvQkFDZixVQUFVO29CQUNWLElBQUksZUFBZSxRQUFRLEtBQUssVUFBVTtvQkFDMUMsTUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTLFFBQVE7b0JBQzVDLGFBQWE7b0JBQ2IsT0FBTztvQkFDUCxPQUFPLFFBQVEsTUFBTTs7Ozs7R0FpQjFCIiwiZmlsZSI6InBhbS9QYW1Hcm91cEFjdGlvbnNEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTcuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHBhbU1vZHVsZSBmcm9tICdwYW0vUGFtTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdQYW1Hcm91cEFjdGlvbnNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgZWxlbWVudCwgQ29udGFpbmVyR3JvdXAsIHNwTW9kYWw7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9zcE1vZGFsXywgX0NvbnRhaW5lckdyb3VwXykge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgc3BNb2RhbCA9IF9zcE1vZGFsXztcbiAgICAgICAgQ29udGFpbmVyR3JvdXAgPSBfQ29udGFpbmVyR3JvdXBfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9ICc8c3AtcGFtLWdyb3VwLWFjdGlvbnMgc3AtbW9kZWw9XCJncm91cFwiPjwvc3AtcGFtLWdyb3VwLWFjdGlvbnM+JyxcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkY29tcGlsZShkZWZpbml0aW9uKSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vY2tHcm91cCgpIHtcbiAgICAgICAgbGV0IGdyb3VwID0gbmV3IENvbnRhaW5lckdyb3VwKHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdHcm91cCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cDtcbiAgICB9XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZGV0YWlscyBidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLmdyb3VwID0gY3JlYXRlTW9ja0dyb3VwKCk7XG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGxldCBidXR0b25zID0gZWxlbWVudC5maW5kKCdzcC1kZXRhaWxzLWJ1dHRvbicpO1xuICAgICAgICBleHBlY3QoYnV0dG9ucy5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBkZXRhaWwgZGlhbG9nIHdoZW4gY2xpY2tlZCBkZXRhaWwgYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5ncm91cCA9IGNyZWF0ZU1vY2tHcm91cCgpO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBsZXQgZGV0YWlsQnV0dG9uID0gZWxlbWVudC5maW5kKCdidXR0b24nKVswXTtcbiAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKS5hbmQuY2FsbEZha2UoYW5ndWxhci5ub29wKTtcbiAgICAgICAgZGV0YWlsQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
