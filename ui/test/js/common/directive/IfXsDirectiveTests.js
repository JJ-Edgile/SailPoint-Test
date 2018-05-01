System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('IfXsDirective', function () {
                var $scope,
                    $compile,
                    element,
                    $window,
                    isMobile,
                    elementDefinitionFalse = '<div><span id="element" sp-if-xs="false"></span></div>',
                    elementDefinitionTrue = '<div><span id="element" sp-if-xs="true"></span></div>';

                beforeEach(module(directiveModule));

                function createElement(elementName) {
                    var body = angular.element('body');
                    element = angular.element(elementName);
                    $compile(element)($scope);
                    body.append(element);
                    $scope.$apply();
                }

                beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, browserUtil) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $window = _$window_;

                    // Start with a desktop browser.
                    isMobile = false;
                    spyOn(browserUtil, 'isXs').and.callFake(function () {
                        return isMobile;
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                    if ($scope) {
                        $scope.$destroy();
                    }
                });

                function resize(useMobileSize) {
                    isMobile = useMobileSize;
                    angular.element($window).resize();
                }

                function isDisplayed() {
                    return element.find('span').length > 0;
                }

                describe('desktop', function () {
                    it('should render sp-if-xs=false', function () {
                        createElement(elementDefinitionFalse);
                        expect(isDisplayed()).toEqual(true);
                    });

                    it('should not render sp-if-xs=true', function () {
                        createElement(elementDefinitionTrue);
                        expect(isDisplayed()).toEqual(false);
                    });

                    it('should render sp-if-xs="true" after resizing to mobile', function () {
                        createElement(elementDefinitionTrue);
                        resize(true);
                        expect(isDisplayed()).toEqual(true);
                    });

                    it('should not render sp-if-xs="false" after resizing to mobile', function () {
                        createElement(elementDefinitionFalse);
                        resize(true);
                        expect(isDisplayed()).toEqual(false);
                    });
                });

                describe('mobile', function () {
                    beforeEach(function () {
                        isMobile = true;
                    });

                    it('should not render sp-if-xs=false', function () {
                        createElement(elementDefinitionFalse);
                        expect(isDisplayed()).toEqual(false);
                    });

                    it('should render sp-if-xs=true', function () {
                        createElement(elementDefinitionTrue);
                        expect(isDisplayed()).toEqual(true);
                    });

                    it('should not render sp-if-xs="true" after resizing to desktop', function () {
                        createElement(elementDefinitionTrue);
                        resize(false);
                        expect(isDisplayed()).toEqual(false);
                    });

                    it('should render sp-if-xs="false" after resizing to desktop', function () {
                        createElement(elementDefinitionFalse);
                        resize(false);
                        expect(isDisplayed()).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvSWZYc0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLGlCQUFpQixZQUFXO2dCQUNqQyxJQUFJO29CQUFRO29CQUFVO29CQUFTO29CQUFTO29CQUNwQyx5QkFBeUI7b0JBQ3pCLHdCQUF3Qjs7Z0JBRTVCLFdBQVcsT0FBTzs7Z0JBRWxCLFNBQVMsY0FBYyxhQUFhO29CQUNoQyxJQUFJLE9BQU8sUUFBUSxRQUFRO29CQUMzQixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixLQUFLLE9BQU87b0JBQ1osT0FBTzs7O2dCQUdYLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxXQUFXLGFBQWE7b0JBQ3pFLFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCxVQUFVOzs7b0JBR1YsV0FBVztvQkFDWCxNQUFNLGFBQWEsUUFBUSxJQUFJLFNBQVMsWUFBQTt3QkFZeEIsT0FaOEI7Ozs7Z0JBR2xELFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7b0JBRVosSUFBSSxRQUFRO3dCQUNSLE9BQU87Ozs7Z0JBSWYsU0FBUyxPQUFPLGVBQWU7b0JBQzNCLFdBQVc7b0JBQ1gsUUFBUSxRQUFRLFNBQVM7OztnQkFHN0IsU0FBUyxjQUFjO29CQUNuQixPQUFRLFFBQVEsS0FBSyxRQUFRLFNBQVM7OztnQkFHMUMsU0FBUyxXQUFXLFlBQU07b0JBQ3RCLEdBQUcsZ0NBQWdDLFlBQVc7d0JBQzFDLGNBQWM7d0JBQ2QsT0FBTyxlQUFlLFFBQVE7OztvQkFHbEMsR0FBRyxtQ0FBbUMsWUFBVzt3QkFDN0MsY0FBYzt3QkFDZCxPQUFPLGVBQWUsUUFBUTs7O29CQUdsQyxHQUFHLDBEQUEwRCxZQUFNO3dCQUMvRCxjQUFjO3dCQUNkLE9BQU87d0JBQ1AsT0FBTyxlQUFlLFFBQVE7OztvQkFHbEMsR0FBRywrREFBK0QsWUFBTTt3QkFDcEUsY0FBYzt3QkFDZCxPQUFPO3dCQUNQLE9BQU8sZUFBZSxRQUFROzs7O2dCQUl0QyxTQUFTLFVBQVUsWUFBTTtvQkFDckIsV0FBVyxZQUFNO3dCQUNiLFdBQVc7OztvQkFHZixHQUFHLG9DQUFvQyxZQUFXO3dCQUM5QyxjQUFjO3dCQUNkLE9BQU8sZUFBZSxRQUFROzs7b0JBR2xDLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLGNBQWM7d0JBQ2QsT0FBTyxlQUFlLFFBQVE7OztvQkFHbEMsR0FBRywrREFBK0QsWUFBTTt3QkFDcEUsY0FBYzt3QkFDZCxPQUFPO3dCQUNQLE9BQU8sZUFBZSxRQUFROzs7b0JBR2xDLEdBQUcsNERBQTRELFlBQU07d0JBQ2pFLGNBQWM7d0JBQ2QsT0FBTzt3QkFDUCxPQUFPLGVBQWUsUUFBUTs7Ozs7O0dBbUJ2QyIsImZpbGUiOiJjb21tb24vZGlyZWN0aXZlL0lmWHNEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdJZlhzRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRzY29wZSwgJGNvbXBpbGUsIGVsZW1lbnQsICR3aW5kb3csIGlzTW9iaWxlLFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbkZhbHNlID0gJzxkaXY+PHNwYW4gaWQ9XCJlbGVtZW50XCIgc3AtaWYteHM9XCJmYWxzZVwiPjwvc3Bhbj48L2Rpdj4nLFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvblRydWUgPSAnPGRpdj48c3BhbiBpZD1cImVsZW1lbnRcIiBzcC1pZi14cz1cInRydWVcIj48L3NwYW4+PC9kaXY+JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSkge1xuICAgICAgICBsZXQgYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpO1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnROYW1lKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgYm9keS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF8kd2luZG93XywgYnJvd3NlclV0aWwpIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuXG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYSBkZXNrdG9wIGJyb3dzZXIuXG4gICAgICAgIGlzTW9iaWxlID0gZmFsc2U7XG4gICAgICAgIHNweU9uKGJyb3dzZXJVdGlsLCAnaXNYcycpLmFuZC5jYWxsRmFrZSgoKSA9PiBpc01vYmlsZSk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzY29wZSkge1xuICAgICAgICAgICAgJHNjb3BlLiRkZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSh1c2VNb2JpbGVTaXplKSB7XG4gICAgICAgIGlzTW9iaWxlID0gdXNlTW9iaWxlU2l6ZTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KCR3aW5kb3cpLnJlc2l6ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRGlzcGxheWVkKCkge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuZmluZCgnc3BhbicpLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdkZXNrdG9wJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBzcC1pZi14cz1mYWxzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbkZhbHNlKTtcbiAgICAgICAgICAgIGV4cGVjdChpc0Rpc3BsYXllZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgc3AtaWYteHM9dHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvblRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGlzRGlzcGxheWVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJlbmRlciBzcC1pZi14cz1cInRydWVcIiBhZnRlciByZXNpemluZyB0byBtb2JpbGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uVHJ1ZSk7XG4gICAgICAgICAgICByZXNpemUodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoaXNEaXNwbGF5ZWQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgcmVuZGVyIHNwLWlmLXhzPVwiZmFsc2VcIiBhZnRlciByZXNpemluZyB0byBtb2JpbGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGVsZW1lbnREZWZpbml0aW9uRmFsc2UpO1xuICAgICAgICAgICAgcmVzaXplKHRydWUpO1xuICAgICAgICAgICAgZXhwZWN0KGlzRGlzcGxheWVkKCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtb2JpbGUnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgc3AtaWYteHM9ZmFsc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb25GYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoaXNEaXNwbGF5ZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIHNwLWlmLXhzPXRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb25UcnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChpc0Rpc3BsYXllZCgpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgc3AtaWYteHM9XCJ0cnVlXCIgYWZ0ZXIgcmVzaXppbmcgdG8gZGVza3RvcCcsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoZWxlbWVudERlZmluaXRpb25UcnVlKTtcbiAgICAgICAgICAgIHJlc2l6ZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoaXNEaXNwbGF5ZWQoKSkudG9FcXVhbChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmVuZGVyIHNwLWlmLXhzPVwiZmFsc2VcIiBhZnRlciByZXNpemluZyB0byBkZXNrdG9wJywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChlbGVtZW50RGVmaW5pdGlvbkZhbHNlKTtcbiAgICAgICAgICAgIHJlc2l6ZShmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoaXNEaXNwbGF5ZWQoKSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
