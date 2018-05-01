System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('FocusChangerDirective', function () {
                var $scope,
                    $compile,
                    element,
                    otherElement,
                    elementDefinition = '<input id="element" type="text" sp-focus-changer="#otherElement"/>',
                    elementClickDefinition = '<input id="element" type="text" sp-focus-changer="#otherElement" sp-focus-changer-click="true"/>',
                    otherElementDefinition = '<input id="otherElement" type="text"/>';

                beforeEach(module(directiveModule, function ($provide) {
                    /* This uses timeout... fake it in the test.  */
                    $provide.decorator('$timeout', function ($delegate) {
                        return function (func) {
                            func.call();
                        };
                    });
                }));

                describe('without sp-focus-click', function () {
                    beforeEach(inject(function (_$rootScope_, _$compile_) {
                        $scope = _$rootScope_.$new();
                        $compile = _$compile_;
                        createElements(false);
                    }));

                    it('should call focus on the specified element when enter is pressed', function () {
                        var event = createEvent(13);
                        element.trigger(event);
                        expect(otherElement.focus).toHaveBeenCalled();
                    });

                    it('should not call focus on the specified element when non-enter key is pressed', function () {
                        var event = createEvent(33);
                        element.trigger(event);
                        expect(otherElement.focus).not.toHaveBeenCalled();
                    });

                    it('should not call focus on the specified element when clicked without attr set', function () {
                        var event = createClickEvent();
                        element.trigger(event);
                        expect(otherElement.focus).not.toHaveBeenCalled();
                    });
                });

                describe('with sp-focus-click set to true', function () {
                    beforeEach(inject(function (_$rootScope_, _$compile_) {
                        $scope = _$rootScope_.$new();
                        $compile = _$compile_;
                        createElements(true);
                    }));
                    it('should call focus on the specified element when clicked with attr set', function () {
                        var event = createClickEvent();
                        element.trigger(event);
                        expect(otherElement.focus).toHaveBeenCalled();
                    });
                });

                afterEach(function () {
                    element.remove();
                    otherElement.remove();
                });

                function createElements(triggerOnClick) {
                    var oldElementFunc = angular.element,
                        body = angular.element('body');
                    /* Create and append the elements */
                    if (!triggerOnClick) {
                        element = angular.element(elementDefinition);
                    } else {
                        element = angular.element(elementClickDefinition);
                    }

                    otherElement = angular.element(otherElementDefinition);
                    body.append(element);
                    body.append(otherElement);
                    /* Doing things a bit differently than usual.  Need a reference to the
                     * otherElement element before compiling the directive so we can spy
                     * on angular.element and return the spied on reference */
                    spyOn(otherElement, 'focus');
                    spyOn(angular, 'element').and.callFake(function (selector) {
                        if (selector !== '#otherElement') {
                            return oldElementFunc.apply(angular, arguments);
                        }
                        return otherElement;
                    });
                    /* Compile the directive */
                    $compile(element)($scope);
                }

                function createEvent(keyCode) {
                    var event = $.Event('keyup', {
                        keyCode: keyCode
                    });
                    return event;
                }

                function createClickEvent() {
                    var event = $.Event('click');
                    return event;
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRm9jdXNDaGFuZ2VyRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxVQUFVLFNBQVM7SUFDaEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixrQkFBa0IsZ0NBQWdDOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMseUJBQXlCLFlBQVc7Z0JBQ3pDLElBQUk7b0JBQVE7b0JBQVU7b0JBQVM7b0JBQzNCLG9CQUFvQjtvQkFDcEIseUJBQ0k7b0JBQ0oseUJBQXlCOztnQkFFN0IsV0FBVyxPQUFPLGlCQUFpQixVQUFTLFVBQVU7O29CQUVsRCxTQUFTLFVBQVUsWUFBWSxVQUFTLFdBQVc7d0JBQy9DLE9BQU8sVUFBUyxNQUFNOzRCQUNsQixLQUFLOzs7OztnQkFLakIsU0FBUywwQkFBMEIsWUFBVztvQkFDMUMsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZO3dCQUNqRCxTQUFTLGFBQWE7d0JBQ3RCLFdBQVc7d0JBQ1gsZUFBZTs7O29CQUduQixHQUFHLG9FQUFvRSxZQUFXO3dCQUM5RSxJQUFJLFFBQVEsWUFBWTt3QkFDeEIsUUFBUSxRQUFRO3dCQUNoQixPQUFPLGFBQWEsT0FBTzs7O29CQUcvQixHQUFHLGdGQUFnRixZQUFXO3dCQUMxRixJQUFJLFFBQVEsWUFBWTt3QkFDeEIsUUFBUSxRQUFRO3dCQUNoQixPQUFPLGFBQWEsT0FBTyxJQUFJOzs7b0JBR25DLEdBQUcsZ0ZBQWdGLFlBQVc7d0JBQzFGLElBQUksUUFBUTt3QkFDWixRQUFRLFFBQVE7d0JBQ2hCLE9BQU8sYUFBYSxPQUFPLElBQUk7Ozs7Z0JBSXZDLFNBQVMsbUNBQW1DLFlBQVc7b0JBQ25ELFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWTt3QkFDakQsU0FBUyxhQUFhO3dCQUN0QixXQUFXO3dCQUNYLGVBQWU7O29CQUVuQixHQUFHLHlFQUF5RSxZQUFXO3dCQUNuRixJQUFJLFFBQVE7d0JBQ1osUUFBUSxRQUFRO3dCQUNoQixPQUFPLGFBQWEsT0FBTzs7OztnQkFJbkMsVUFBVSxZQUFXO29CQUNqQixRQUFRO29CQUNSLGFBQWE7OztnQkFHakIsU0FBUyxlQUFlLGdCQUFnQjtvQkFDcEMsSUFBSSxpQkFBaUIsUUFBUTt3QkFDekIsT0FBTyxRQUFRLFFBQVE7O29CQUUzQixJQUFJLENBQUMsZ0JBQWdCO3dCQUNqQixVQUFVLFFBQVEsUUFBUTsyQkFDdkI7d0JBQ0gsVUFBVSxRQUFRLFFBQVE7OztvQkFHOUIsZUFBZSxRQUFRLFFBQVE7b0JBQy9CLEtBQUssT0FBTztvQkFDWixLQUFLLE9BQU87Ozs7b0JBSVosTUFBTSxjQUFjO29CQUNwQixNQUFNLFNBQVMsV0FBVyxJQUFJLFNBQVMsVUFBUyxVQUFVO3dCQUN0RCxJQUFHLGFBQWEsaUJBQWlCOzRCQUM3QixPQUFPLGVBQWUsTUFBTSxTQUFTOzt3QkFFekMsT0FBTzs7O29CQUdYLFNBQVMsU0FBUzs7O2dCQUd0QixTQUFTLFlBQVksU0FBUztvQkFDMUIsSUFBSSxRQUFRLEVBQUUsTUFBTSxTQUFTO3dCQUN6QixTQUFTOztvQkFFYixPQUFPOzs7Z0JBR1gsU0FBUyxtQkFBbUI7b0JBQ3hCLElBQUksUUFBUSxFQUFFLE1BQU07b0JBQ3BCLE9BQU87Ozs7O0dBY1oiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS9Gb2N1c0NoYW5nZXJEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGRpcmVjdGl2ZU1vZHVsZSBmcm9tICdjb21tb24vZGlyZWN0aXZlL0RpcmVjdGl2ZU1vZHVsZSc7XG5cbmRlc2NyaWJlKCdGb2N1c0NoYW5nZXJEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHNjb3BlLCAkY29tcGlsZSwgZWxlbWVudCwgb3RoZXJFbGVtZW50LFxuICAgICAgICBlbGVtZW50RGVmaW5pdGlvbiA9ICc8aW5wdXQgaWQ9XCJlbGVtZW50XCIgdHlwZT1cInRleHRcIiBzcC1mb2N1cy1jaGFuZ2VyPVwiI290aGVyRWxlbWVudFwiLz4nLFxuICAgICAgICBlbGVtZW50Q2xpY2tEZWZpbml0aW9uID1cbiAgICAgICAgICAgICc8aW5wdXQgaWQ9XCJlbGVtZW50XCIgdHlwZT1cInRleHRcIiBzcC1mb2N1cy1jaGFuZ2VyPVwiI290aGVyRWxlbWVudFwiIHNwLWZvY3VzLWNoYW5nZXItY2xpY2s9XCJ0cnVlXCIvPicsXG4gICAgICAgIG90aGVyRWxlbWVudERlZmluaXRpb24gPSAnPGlucHV0IGlkPVwib3RoZXJFbGVtZW50XCIgdHlwZT1cInRleHRcIi8+JztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSwgZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgLyogVGhpcyB1c2VzIHRpbWVvdXQuLi4gZmFrZSBpdCBpbiB0aGUgdGVzdC4gICovXG4gICAgICAgICRwcm92aWRlLmRlY29yYXRvcignJHRpbWVvdXQnLCBmdW5jdGlvbigkZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgICAgICAgICAgZnVuYy5jYWxsKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aG91dCBzcC1mb2N1cy1jbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8pIHtcbiAgICAgICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50cyhmYWxzZSk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZm9jdXMgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IHdoZW4gZW50ZXIgaXMgcHJlc3NlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gY3JlYXRlRXZlbnQoMTMpO1xuICAgICAgICAgICAgZWxlbWVudC50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvdGhlckVsZW1lbnQuZm9jdXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBmb2N1cyBvbiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgd2hlbiBub24tZW50ZXIga2V5IGlzIHByZXNzZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGNyZWF0ZUV2ZW50KDMzKTtcbiAgICAgICAgICAgIGVsZW1lbnQudHJpZ2dlcihldmVudCk7XG4gICAgICAgICAgICBleHBlY3Qob3RoZXJFbGVtZW50LmZvY3VzKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIGZvY3VzIG9uIHRoZSBzcGVjaWZpZWQgZWxlbWVudCB3aGVuIGNsaWNrZWQgd2l0aG91dCBhdHRyIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gY3JlYXRlQ2xpY2tFdmVudCgpO1xuICAgICAgICAgICAgZWxlbWVudC50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvdGhlckVsZW1lbnQuZm9jdXMpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3dpdGggc3AtZm9jdXMtY2xpY2sgc2V0IHRvIHRydWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAgICAgY3JlYXRlRWxlbWVudHModHJ1ZSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGZvY3VzIG9uIHRoZSBzcGVjaWZpZWQgZWxlbWVudCB3aGVuIGNsaWNrZWQgd2l0aCBhdHRyIHNldCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gY3JlYXRlQ2xpY2tFdmVudCgpO1xuICAgICAgICAgICAgZWxlbWVudC50cmlnZ2VyKGV2ZW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvdGhlckVsZW1lbnQuZm9jdXMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIG90aGVyRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKHRyaWdnZXJPbkNsaWNrKSB7XG4gICAgICAgIHZhciBvbGRFbGVtZW50RnVuYyA9IGFuZ3VsYXIuZWxlbWVudCxcbiAgICAgICAgICAgIGJvZHkgPSBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKTtcbiAgICAgICAgLyogQ3JlYXRlIGFuZCBhcHBlbmQgdGhlIGVsZW1lbnRzICovXG4gICAgICAgIGlmICghdHJpZ2dlck9uQ2xpY2spIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudERlZmluaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50Q2xpY2tEZWZpbml0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG90aGVyRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChvdGhlckVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgYm9keS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIGJvZHkuYXBwZW5kKG90aGVyRWxlbWVudCk7XG4gICAgICAgIC8qIERvaW5nIHRoaW5ncyBhIGJpdCBkaWZmZXJlbnRseSB0aGFuIHVzdWFsLiAgTmVlZCBhIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgICogb3RoZXJFbGVtZW50IGVsZW1lbnQgYmVmb3JlIGNvbXBpbGluZyB0aGUgZGlyZWN0aXZlIHNvIHdlIGNhbiBzcHlcbiAgICAgICAgICogb24gYW5ndWxhci5lbGVtZW50IGFuZCByZXR1cm4gdGhlIHNwaWVkIG9uIHJlZmVyZW5jZSAqL1xuICAgICAgICBzcHlPbihvdGhlckVsZW1lbnQsICdmb2N1cycpO1xuICAgICAgICBzcHlPbihhbmd1bGFyLCAnZWxlbWVudCcpLmFuZC5jYWxsRmFrZShmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYoc2VsZWN0b3IgIT09ICcjb3RoZXJFbGVtZW50Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGRFbGVtZW50RnVuYy5hcHBseShhbmd1bGFyLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG90aGVyRWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8qIENvbXBpbGUgdGhlIGRpcmVjdGl2ZSAqL1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGtleUNvZGUpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gJC5FdmVudCgna2V5dXAnLCB7XG4gICAgICAgICAgICBrZXlDb2RlOiBrZXlDb2RlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpY2tFdmVudCgpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gJC5FdmVudCgnY2xpY2snKTtcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
