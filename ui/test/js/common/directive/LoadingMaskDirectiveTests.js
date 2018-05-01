System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('LoadingMaskDirective', function () {
                var element, $scope, $compile;

                function getElementDefintion(message) {
                    var firstPart = '<div sp-loading-mask="test" ',
                        lastPart = '><div id="elementsToTransclude">Some transcluded stuff</div></div>';
                    return firstPart + (message ? ' sp-loading-message="' + message + '" ' : '') + lastPart;
                }

                function testMaskHidden(testElement) {
                    var transcluded, mask;
                    transcluded = testElement.children('[ng-transclude]');
                    mask = testElement.children('.alert');

                    expect(mask).not.toEqual(transcluded);
                    expect(transcluded.length).toBe(1);
                    expect(mask.length).toBe(0);
                }

                beforeEach(module(directiveModule));

                describe('Standard Message', function () {
                    beforeEach(module('sailpoint.directive'));
                    beforeEach(inject(function (_$compile_, $rootScope) {
                        $compile = _$compile_;
                        $scope = $rootScope;
                        $scope.test = false;
                        element = angular.element(getElementDefintion());
                        $compile(element)($rootScope);
                        $scope.$apply();
                    }));

                    it('should have one child when tested value is false', function () {
                        expect(element.children().length).toBe(1);
                    });

                    it('should have one child when tested value is true', function () {
                        $scope.test = true;
                        $scope.$digest();
                        expect(element.children().length).toBe(1);
                    });

                    it('should have transcluded element in DOM when value is true', function () {
                        $scope.test = true;
                        $scope.$apply();
                        testMaskHidden(element);
                    });

                    it('should not show mask if value is set and true initially', function () {
                        $scope.test = true;
                        var newElement = angular.element(getElementDefintion());
                        $compile(newElement)($scope);
                        $scope.$apply();
                        testMaskHidden(newElement);
                    });
                });

                describe('Custom Message', function () {
                    var customMessage = 'This is a different loading message';

                    beforeEach(module('sailpoint.directive'));
                    beforeEach(inject(function ($compile, $rootScope) {
                        $scope = $rootScope;
                        $scope.test = false;
                        element = angular.element(getElementDefintion(customMessage));
                        $compile(element)($rootScope);
                        $scope.$apply();
                    }));

                    it('should allow the loading message to be specified', function () {
                        expect(element.find('h5')[0].innerHTML).toEqual(customMessage);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTG9hZGluZ01hc2tEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUNoRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx3QkFBd0IsWUFBVztnQkFDeEMsSUFBSSxTQUFTLFFBQVE7O2dCQUVyQixTQUFTLG9CQUFvQixTQUFTO29CQUNsQyxJQUFJLFlBQVk7d0JBQ1osV0FBVztvQkFDZixPQUFPLGFBQWEsVUFBVSwwQkFBMEIsVUFBVSxPQUFPLE1BQU07OztnQkFHbkYsU0FBUyxlQUFlLGFBQWE7b0JBQ2pDLElBQUksYUFBYTtvQkFDakIsY0FBYyxZQUFZLFNBQVM7b0JBQ25DLE9BQU8sWUFBWSxTQUFTOztvQkFFNUIsT0FBTyxNQUFNLElBQUksUUFBUTtvQkFDekIsT0FBTyxZQUFZLFFBQVEsS0FBSztvQkFDaEMsT0FBTyxLQUFLLFFBQVEsS0FBSzs7O2dCQUc3QixXQUFXLE9BQU87O2dCQUVsQixTQUFTLG9CQUFvQixZQUFXO29CQUNwQyxXQUFXLE9BQU87b0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWTt3QkFDL0MsV0FBVzt3QkFDWCxTQUFTO3dCQUNULE9BQU8sT0FBTzt3QkFDZCxVQUFVLFFBQVEsUUFBUTt3QkFDMUIsU0FBUyxTQUFTO3dCQUNsQixPQUFPOzs7b0JBR1gsR0FBRyxvREFBb0QsWUFBVzt3QkFDOUQsT0FBTyxRQUFRLFdBQVcsUUFBUSxLQUFLOzs7b0JBRzNDLEdBQUcsbURBQW1ELFlBQVc7d0JBQzdELE9BQU8sT0FBTzt3QkFDZCxPQUFPO3dCQUNQLE9BQU8sUUFBUSxXQUFXLFFBQVEsS0FBSzs7O29CQUczQyxHQUFHLDZEQUE2RCxZQUFXO3dCQUN2RSxPQUFPLE9BQU87d0JBQ2QsT0FBTzt3QkFDUCxlQUFlOzs7b0JBR25CLEdBQUcsMkRBQTJELFlBQVc7d0JBQ3JFLE9BQU8sT0FBTzt3QkFDZCxJQUFJLGFBQWEsUUFBUSxRQUFRO3dCQUNqQyxTQUFTLFlBQVk7d0JBQ3JCLE9BQU87d0JBQ1AsZUFBZTs7OztnQkFJdkIsU0FBUyxrQkFBa0IsWUFBVztvQkFDbEMsSUFBSSxnQkFBZ0I7O29CQUVwQixXQUFXLE9BQU87b0JBQ2xCLFdBQVcsT0FBTyxVQUFTLFVBQVUsWUFBWTt3QkFDN0MsU0FBUzt3QkFDVCxPQUFPLE9BQU87d0JBQ2QsVUFBVSxRQUFRLFFBQVEsb0JBQW9CO3dCQUM5QyxTQUFTLFNBQVM7d0JBQ2xCLE9BQU87OztvQkFHWCxHQUFHLG9EQUFvRCxZQUFXO3dCQUM5RCxPQUFPLFFBQVEsS0FBSyxNQUFNLEdBQUcsV0FBVyxRQUFROzs7Ozs7R0FhekQiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Mb2FkaW5nTWFza0RpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ0xvYWRpbmdNYXNrRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQsICRzY29wZSwgJGNvbXBpbGU7XG5cbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50RGVmaW50aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGZpcnN0UGFydCA9ICc8ZGl2IHNwLWxvYWRpbmctbWFzaz1cInRlc3RcIiAnLFxuICAgICAgICAgICAgbGFzdFBhcnQgPSAnPjxkaXYgaWQ9XCJlbGVtZW50c1RvVHJhbnNjbHVkZVwiPlNvbWUgdHJhbnNjbHVkZWQgc3R1ZmY8L2Rpdj48L2Rpdj4nO1xuICAgICAgICByZXR1cm4gZmlyc3RQYXJ0ICsgKG1lc3NhZ2UgPyAnIHNwLWxvYWRpbmctbWVzc2FnZT1cIicgKyBtZXNzYWdlICsgJ1wiICcgOiAnJykgKyBsYXN0UGFydDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZXN0TWFza0hpZGRlbih0ZXN0RWxlbWVudCkge1xuICAgICAgICB2YXIgdHJhbnNjbHVkZWQsIG1hc2s7XG4gICAgICAgIHRyYW5zY2x1ZGVkID0gdGVzdEVsZW1lbnQuY2hpbGRyZW4oJ1tuZy10cmFuc2NsdWRlXScpO1xuICAgICAgICBtYXNrID0gdGVzdEVsZW1lbnQuY2hpbGRyZW4oJy5hbGVydCcpO1xuXG4gICAgICAgIGV4cGVjdChtYXNrKS5ub3QudG9FcXVhbCh0cmFuc2NsdWRlZCk7XG4gICAgICAgIGV4cGVjdCh0cmFuc2NsdWRlZC5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChtYXNrLmxlbmd0aCkudG9CZSgwKTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcblxuICAgIGRlc2NyaWJlKCdTdGFuZGFyZCBNZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2gobW9kdWxlKCdzYWlscG9pbnQuZGlyZWN0aXZlJykpO1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbXBpbGVfLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAgICAgJHNjb3BlLnRlc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZ2V0RWxlbWVudERlZmludGlvbigpKTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRyb290U2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIG9uZSBjaGlsZCB3aGVuIHRlc3RlZCB2YWx1ZSBpcyBmYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvQmUoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBvbmUgY2hpbGQgd2hlbiB0ZXN0ZWQgdmFsdWUgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLnRlc3QgPSB0cnVlO1xuICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoKS50b0JlKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgdHJhbnNjbHVkZWQgZWxlbWVudCBpbiBET00gd2hlbiB2YWx1ZSBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUudGVzdCA9IHRydWU7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICB0ZXN0TWFza0hpZGRlbihlbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3Qgc2hvdyBtYXNrIGlmIHZhbHVlIGlzIHNldCBhbmQgdHJ1ZSBpbml0aWFsbHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS50ZXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBuZXdFbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGdldEVsZW1lbnREZWZpbnRpb24oKSk7XG4gICAgICAgICAgICAkY29tcGlsZShuZXdFbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgdGVzdE1hc2tIaWRkZW4obmV3RWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0N1c3RvbSBNZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXN0b21NZXNzYWdlID0gJ1RoaXMgaXMgYSBkaWZmZXJlbnQgbG9hZGluZyBtZXNzYWdlJztcblxuICAgICAgICBiZWZvcmVFYWNoKG1vZHVsZSgnc2FpbHBvaW50LmRpcmVjdGl2ZScpKTtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbXBpbGUsICRyb290U2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICAgICAkc2NvcGUudGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50RGVmaW50aW9uKGN1c3RvbU1lc3NhZ2UpKTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRyb290U2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBhbGxvdyB0aGUgbG9hZGluZyBtZXNzYWdlIHRvIGJlIHNwZWNpZmllZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuZmluZCgnaDUnKVswXS5pbm5lckhUTUwpLnRvRXF1YWwoY3VzdG9tTWVzc2FnZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
