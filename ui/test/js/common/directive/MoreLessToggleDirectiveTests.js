System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('MoreLessToggleDirective', function () {

                var $scope,
                    $compile,
                    readMoreText = 'ui_read_more',
                    readLessText = 'ui_read_less',
                    isMobile,
                    shortMaxText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam orci mattis ' + 'viverra tincidunt. Integer elit sapien, scelerisque et elementum id, porta eu sapien. ' + 'Morbi lorem lectus orci aliquam.',
                    longMaxText = shortMaxText + shortMaxText,
                    createElement = function (text, smallMaxLength, largeMaxLength) {
                    var element,
                        elementDef = '<sp-more-less-toggle text="' + text + '" ' + getSmallLengthDefinition(smallMaxLength) + ' ' + getLargeLengthDefinition(largeMaxLength) + '></sp-more-less-toggle>';
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                };

                function getSmallLengthDefinition(smallMaxLength) {
                    return getSizeLengthDefinition('small', smallMaxLength);
                }

                function getLargeLengthDefinition(largeMaxLength) {
                    return getSizeLengthDefinition('large', largeMaxLength);
                }

                function getSizeLengthDefinition(size, maxLength) {
                    var definition = '';
                    if (maxLength) {
                        definition = size + '-max-length=';
                        definition += maxLength;
                    }
                    return definition;
                }

                // Use the access request module.
                beforeEach(module(directiveModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, browserUtil) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;

                    isMobile = false;
                    spyOn(browserUtil, 'isXs').and.callFake(function () {
                        return isMobile;
                    });
                }));

                describe('directive with default values', function () {
                    describe('in a large window', function () {
                        it('should not truncate text that is shorter than maximum', function () {
                            var text = 'some shortish text',
                                element = createElement(text);
                            expect(element.children().length).toEqual(1);
                            expect(element.children()[0].innerText).toEqual(text);
                        });

                        it('should not truncate text that is equal in length to the maximum', function () {
                            var element = createElement(longMaxText);
                            expect(element.children().length).toEqual(1);
                            expect(element.children()[0].innerText).toEqual(longMaxText);
                        });

                        it('should truncate text that is larger than maximum', function () {
                            var element = createElement(longMaxText + ' something');
                            expect(element.children().length).toEqual(2);
                            expect(element.children()[0].innerText).toEqual(longMaxText + '...');
                            expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                        });
                    });

                    describe('in a small window', function () {
                        beforeEach(function () {
                            isMobile = true;
                        });

                        it('should not truncate text that is shorter than maximum', function () {
                            var text = 'some shortish text',
                                element = createElement(text);
                            expect(element.children().length).toEqual(1);
                            expect(element.children()[0].innerText).toEqual(text);
                        });

                        it('should not truncate text that is equal in length to the maximum', function () {
                            var element = createElement(shortMaxText);
                            expect(element.children().length).toEqual(1);
                            expect(element.children()[0].innerText).toEqual(shortMaxText);
                        });

                        it('should truncate text that is larger than maximum', function () {
                            var element = createElement(shortMaxText + ' something');
                            expect(element.children().length).toEqual(2);
                            expect(element.children()[0].innerText).toEqual(shortMaxText + '...');
                            expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                        });
                    });
                });

                describe('with overridden small max length', function () {
                    beforeEach(function () {
                        isMobile = true;
                    });

                    it('should not truncate text that is shorter than specified value', function () {
                        var text = '12',
                            element = createElement(text, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(text);
                    });

                    it('should not truncate text that is shorter than specified value', function () {
                        var text = '1234',
                            element = createElement(text, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(text);
                    });

                    it('should truncate text that is longer than specified value', function () {
                        var text = '12345',
                            element = createElement(text, 4);
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual('1234' + '...');
                        expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                    });

                    it('should still have default large size behavior', function () {
                        var element;
                        isMobile = false;
                        element = createElement(longMaxText, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(longMaxText);
                        element = createElement(longMaxText + 'extra text', 4);
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual(longMaxText + '...');
                        expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                    });
                });

                describe('with overridden large max length', function () {
                    it('should not truncate text that is shorter than specified value', function () {
                        var text = '12',
                            element = createElement(text, undefined, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(text);
                    });

                    it('should not truncate text that is shorter than specified value', function () {
                        var text = '1234',
                            element = createElement(text, undefined, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(text);
                    });

                    it('should truncate text that is longer than specified value', function () {
                        var text = '12345',
                            element = createElement(text, undefined, 4);
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual('1234' + '...');
                        expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                    });

                    it('should still have default small size behavior', function () {
                        var element;
                        isMobile = true;
                        element = createElement(shortMaxText, undefined, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(shortMaxText);
                        element = createElement(longMaxText + 'extra text', undefined, 4);
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual(shortMaxText + '...');
                        expect(element.children()[1].children[0].innerText).toEqual(readMoreText);
                    });
                });

                describe('more and less elements', function () {
                    beforeEach(function () {
                        isMobile = true;
                    });

                    it('should toggle between truncated and not values', function () {
                        var text = '12345',
                            element = createElement(text, 4),
                            readMoreLink = angular.element(element.children()[1].children[0]),
                            readLessLink;
                        expect(element.children()[0].innerText).toEqual('1234...');
                        readMoreLink.click();
                        expect(element.children()[0].innerText).toEqual(text);
                        expect(element.children()[1].children[0].innerText).toEqual(readLessText);
                        readLessLink = angular.element(element.children()[1].children[0]);
                        readLessLink.click();
                        expect(element.children()[0].innerText).toEqual('1234...');
                    });
                });

                describe('resize listener', function () {
                    var $window;

                    beforeEach(inject(function (_$window_) {
                        $window = _$window_;
                    }));

                    it('should toggle between small and large limits on resize', function () {
                        var text = '12345',
                            element = createElement(text, 4);
                        expect(element.children().length).toEqual(1);
                        expect(element.children()[0].innerText).toEqual(text);

                        isMobile = true;
                        angular.element($window).resize();
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual('1234...');
                    });
                });

                describe('text change', function () {
                    it('should recalculate truncated text if text changes', function () {
                        var newText = 'CHANGED',
                            somethingText = ' something',
                            myText = angular.copy(longMaxText),
                            element = undefined;
                        $scope.myText = myText + somethingText;
                        element = createElement('{{ myText }}');
                        expect(element.children().length).toEqual(2);
                        expect(element.children()[0].innerText).toEqual(myText + '...');

                        // change the front of the text and trim the back, so the length is the same character count
                        myText = newText + myText.substring(0, myText.length - newText.length);
                        $scope.myText = myText + somethingText;
                        // Trigger digest which will trigger watch.
                        $scope.$apply();
                        expect(element.children()[0].innerText).toEqual(myText + '...');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvTW9yZUxlc3NUb2dnbGVEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUNBQXFDLFVBQVUsU0FBUztJQUNoRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsaUNBQWlDO1lBQ3ZGLGtCQUFrQixnQ0FBZ0M7O1FBRXRELFNBQVMsWUFBWTs7WUFMN0IsU0FBUywyQkFBMkIsWUFBVzs7Z0JBRTNDLElBQUk7b0JBQ0E7b0JBQ0EsZUFBZTtvQkFDZixlQUFlO29CQUNmO29CQUNBLGVBQWUsdUZBQ0EsMkZBQ0E7b0JBQ2YsY0FBYyxlQUFlO29CQUM3QixnQkFBZ0IsVUFBUyxNQUFNLGdCQUFnQixnQkFBZ0I7b0JBQzNELElBQUk7d0JBQ0EsYUFBYSxnQ0FBZ0MsT0FBTyxPQUNwQyx5QkFBeUIsa0JBQWtCLE1BQzNDLHlCQUF5QixrQkFBa0I7b0JBQy9ELFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdmLFNBQVMseUJBQXlCLGdCQUFnQjtvQkFDOUMsT0FBTyx3QkFBd0IsU0FBUzs7O2dCQUc1QyxTQUFTLHlCQUF5QixnQkFBZ0I7b0JBQzlDLE9BQU8sd0JBQXdCLFNBQVM7OztnQkFHNUMsU0FBUyx3QkFBd0IsTUFBTSxXQUFXO29CQUM5QyxJQUFJLGFBQWE7b0JBQ2pCLElBQUcsV0FBVzt3QkFDVixhQUFhLE9BQU87d0JBQ3BCLGNBQWM7O29CQUVsQixPQUFPOzs7O2dCQUtYLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxhQUFhO29CQUM5RCxTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7O29CQUVYLFdBQVc7b0JBQ1gsTUFBTSxhQUFhLFFBQVEsSUFBSSxTQUFTLFlBQUE7d0JBR3hCLE9BSDhCOzs7O2dCQUds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dGl2ZS9Nb3JlTGVzc1RvZ2dsZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvRGlyZWN0aXZlTW9kdWxlJztcblxuZGVzY3JpYmUoJ01vcmVMZXNzVG9nZ2xlRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgJHNjb3BlLFxuICAgICAgICAkY29tcGlsZSxcbiAgICAgICAgcmVhZE1vcmVUZXh0ID0gJ3VpX3JlYWRfbW9yZScsXG4gICAgICAgIHJlYWRMZXNzVGV4dCA9ICd1aV9yZWFkX2xlc3MnLFxuICAgICAgICBpc01vYmlsZSxcbiAgICAgICAgc2hvcnRNYXhUZXh0ID0gJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIENyYXMgYWxpcXVhbSBvcmNpIG1hdHRpcyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3ZpdmVycmEgdGluY2lkdW50LiBJbnRlZ2VyIGVsaXQgc2FwaWVuLCBzY2VsZXJpc3F1ZSBldCBlbGVtZW50dW0gaWQsIHBvcnRhIGV1IHNhcGllbi4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICdNb3JiaSBsb3JlbSBsZWN0dXMgb3JjaSBhbGlxdWFtLicsXG4gICAgICAgIGxvbmdNYXhUZXh0ID0gc2hvcnRNYXhUZXh0ICsgc2hvcnRNYXhUZXh0LFxuICAgICAgICBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24odGV4dCwgc21hbGxNYXhMZW5ndGgsIGxhcmdlTWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCxcbiAgICAgICAgICAgICAgICBlbGVtZW50RGVmID0gJzxzcC1tb3JlLWxlc3MtdG9nZ2xlIHRleHQ9XCInICsgdGV4dCArICdcIiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0U21hbGxMZW5ndGhEZWZpbml0aW9uKHNtYWxsTWF4TGVuZ3RoKSArICcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldExhcmdlTGVuZ3RoRGVmaW5pdGlvbihsYXJnZU1heExlbmd0aCkgKyAnPjwvc3AtbW9yZS1sZXNzLXRvZ2dsZT4nO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmKTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFNtYWxsTGVuZ3RoRGVmaW5pdGlvbihzbWFsbE1heExlbmd0aCkge1xuICAgICAgICByZXR1cm4gZ2V0U2l6ZUxlbmd0aERlZmluaXRpb24oJ3NtYWxsJywgc21hbGxNYXhMZW5ndGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExhcmdlTGVuZ3RoRGVmaW5pdGlvbihsYXJnZU1heExlbmd0aCkge1xuICAgICAgICByZXR1cm4gZ2V0U2l6ZUxlbmd0aERlZmluaXRpb24oJ2xhcmdlJywgbGFyZ2VNYXhMZW5ndGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNpemVMZW5ndGhEZWZpbml0aW9uKHNpemUsIG1heExlbmd0aCkge1xuICAgICAgICB2YXIgZGVmaW5pdGlvbiA9ICcnO1xuICAgICAgICBpZihtYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIGRlZmluaXRpb24gPSBzaXplICsgJy1tYXgtbGVuZ3RoPSc7XG4gICAgICAgICAgICBkZWZpbml0aW9uICs9IG1heExlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcblxuICAgIH1cblxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfLCBicm93c2VyVXRpbCkge1xuICAgICAgICAkc2NvcGUgPSBfJHJvb3RTY29wZV8uJG5ldygpO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG5cbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgc3B5T24oYnJvd3NlclV0aWwsICdpc1hzJykuYW5kLmNhbGxGYWtlKCgpID0+IGlzTW9iaWxlKTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZGlyZWN0aXZlIHdpdGggZGVmYXVsdCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVzY3JpYmUoJ2luIGEgbGFyZ2Ugd2luZG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSB0ZXh0IHRoYXQgaXMgc2hvcnRlciB0aGFuIG1heGltdW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICdzb21lIHNob3J0aXNoIHRleHQnLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0ZXh0KTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCh0ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSB0ZXh0IHRoYXQgaXMgZXF1YWwgaW4gbGVuZ3RoIHRvIHRoZSBtYXhpbXVtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGxvbmdNYXhUZXh0KTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChsb25nTWF4VGV4dCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ3Nob3VsZCB0cnVuY2F0ZSB0ZXh0IHRoYXQgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChsb25nTWF4VGV4dCArICcgc29tZXRoaW5nJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwobG9uZ01heFRleHQgKyAnLi4uJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVsxXS5jaGlsZHJlblswXS5pbm5lclRleHQpLnRvRXF1YWwocmVhZE1vcmVUZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnaW4gYSBzbWFsbCB3aW5kb3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IHRydW5jYXRlIHRleHQgdGhhdCBpcyBzaG9ydGVyIHRoYW4gbWF4aW11bScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gJ3NvbWUgc2hvcnRpc2ggdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRleHQpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMF0uaW5uZXJUZXh0KS50b0VxdWFsKHRleHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgbm90IHRydW5jYXRlIHRleHQgdGhhdCBpcyBlcXVhbCBpbiBsZW5ndGggdG8gdGhlIG1heGltdW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoc2hvcnRNYXhUZXh0KTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChzaG9ydE1heFRleHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0KCdzaG91bGQgdHJ1bmNhdGUgdGV4dCB0aGF0IGlzIGxhcmdlciB0aGFuIG1heGltdW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoc2hvcnRNYXhUZXh0ICsgJyBzb21ldGhpbmcnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChzaG9ydE1heFRleHQgKyAnLi4uJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVsxXS5jaGlsZHJlblswXS5pbm5lclRleHQpLnRvRXF1YWwocmVhZE1vcmVUZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aXRoIG92ZXJyaWRkZW4gc21hbGwgbWF4IGxlbmd0aCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCB0cnVuY2F0ZSB0ZXh0IHRoYXQgaXMgc2hvcnRlciB0aGFuIHNwZWNpZmllZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSAnMTInLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRleHQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCh0ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgdGV4dCB0aGF0IGlzIHNob3J0ZXIgdGhhbiBzcGVjaWZpZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRleHQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCh0ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0cnVuY2F0ZSB0ZXh0IHRoYXQgaXMgbG9uZ2VyIHRoYW4gc3BlY2lmaWVkIHZhbHVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9ICcxMjM0NScsXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodGV4dCwgNCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMF0uaW5uZXJUZXh0KS50b0VxdWFsKCcxMjM0JyArICcuLi4nKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMV0uY2hpbGRyZW5bMF0uaW5uZXJUZXh0KS50b0VxdWFsKHJlYWRNb3JlVGV4dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc3RpbGwgaGF2ZSBkZWZhdWx0IGxhcmdlIHNpemUgYmVoYXZpb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICAgICAgaXNNb2JpbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGxvbmdNYXhUZXh0LCA0KTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwobG9uZ01heFRleHQpO1xuICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQobG9uZ01heFRleHQgKyAnZXh0cmEgdGV4dCcsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChsb25nTWF4VGV4dCArICcuLi4nKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMV0uY2hpbGRyZW5bMF0uaW5uZXJUZXh0KS50b0VxdWFsKHJlYWRNb3JlVGV4dCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2l0aCBvdmVycmlkZGVuIGxhcmdlIG1heCBsZW5ndGgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgdGV4dCB0aGF0IGlzIHNob3J0ZXIgdGhhbiBzcGVjaWZpZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJzEyJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0ZXh0LCB1bmRlZmluZWQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCh0ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgdHJ1bmNhdGUgdGV4dCB0aGF0IGlzIHNob3J0ZXIgdGhhbiBzcGVjaWZpZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJzEyMzQnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRleHQsIHVuZGVmaW5lZCwgNCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMF0uaW5uZXJUZXh0KS50b0VxdWFsKHRleHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHRydW5jYXRlIHRleHQgdGhhdCBpcyBsb25nZXIgdGhhbiBzcGVjaWZpZWQgdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0ZXh0LCB1bmRlZmluZWQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCgnMTIzNCcgKyAnLi4uJyk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzFdLmNoaWxkcmVuWzBdLmlubmVyVGV4dCkudG9FcXVhbChyZWFkTW9yZVRleHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHN0aWxsIGhhdmUgZGVmYXVsdCBzbWFsbCBzaXplIGJlaGF2aW9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgICAgIGlzTW9iaWxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHNob3J0TWF4VGV4dCwgdW5kZWZpbmVkLCA0KTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwoc2hvcnRNYXhUZXh0KTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGxvbmdNYXhUZXh0ICsgJ2V4dHJhIHRleHQnLCB1bmRlZmluZWQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChzaG9ydE1heFRleHQgKyAnLi4uJyk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzFdLmNoaWxkcmVuWzBdLmlubmVyVGV4dCkudG9FcXVhbChyZWFkTW9yZVRleHQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdtb3JlIGFuZCBsZXNzIGVsZW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpc01vYmlsZSA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIGJldHdlZW4gdHJ1bmNhdGVkIGFuZCBub3QgdmFsdWVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9ICcxMjM0NScsXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodGV4dCwgNCksXG4gICAgICAgICAgICAgICAgcmVhZE1vcmVMaW5rID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4oKVsxXS5jaGlsZHJlblswXSksXG4gICAgICAgICAgICAgICAgcmVhZExlc3NMaW5rO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwoJzEyMzQuLi4nKTtcbiAgICAgICAgICAgIHJlYWRNb3JlTGluay5jbGljaygpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwodGV4dCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzFdLmNoaWxkcmVuWzBdLmlubmVyVGV4dCkudG9FcXVhbChyZWFkTGVzc1RleHQpO1xuICAgICAgICAgICAgcmVhZExlc3NMaW5rID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuY2hpbGRyZW4oKVsxXS5jaGlsZHJlblswXSk7XG4gICAgICAgICAgICByZWFkTGVzc0xpbmsuY2xpY2soKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKClbMF0uaW5uZXJUZXh0KS50b0VxdWFsKCcxMjM0Li4uJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc2l6ZSBsaXN0ZW5lcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHdpbmRvdztcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoXyR3aW5kb3dfKSA9PiB7XG4gICAgICAgICAgICAkd2luZG93ID0gXyR3aW5kb3dfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgYmV0d2VlbiBzbWFsbCBhbmQgbGFyZ2UgbGltaXRzIG9uIHJlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSAnMTIzNDUnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRleHQsIDQpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCh0ZXh0KTtcblxuICAgICAgICAgICAgaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCR3aW5kb3cpLnJlc2l6ZSgpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKS5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbCgnMTIzNC4uLicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0ZXh0IGNoYW5nZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZWNhbGN1bGF0ZSB0cnVuY2F0ZWQgdGV4dCBpZiB0ZXh0IGNoYW5nZXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3VGV4dCA9ICdDSEFOR0VEJywgc29tZXRoaW5nVGV4dCA9ICcgc29tZXRoaW5nJyxcbiAgICAgICAgICAgICAgICBteVRleHQgPSBhbmd1bGFyLmNvcHkobG9uZ01heFRleHQpLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ7XG4gICAgICAgICAgICAkc2NvcGUubXlUZXh0ID0gbXlUZXh0ICsgc29tZXRoaW5nVGV4dDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCd7eyBteVRleHQgfX0nKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQuY2hpbGRyZW4oKVswXS5pbm5lclRleHQpLnRvRXF1YWwobXlUZXh0ICsgJy4uLicpO1xuXG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIGZyb250IG9mIHRoZSB0ZXh0IGFuZCB0cmltIHRoZSBiYWNrLCBzbyB0aGUgbGVuZ3RoIGlzIHRoZSBzYW1lIGNoYXJhY3RlciBjb3VudFxuICAgICAgICAgICAgbXlUZXh0ID0gbmV3VGV4dCArXG4gICAgICAgICAgICAgICAgbXlUZXh0LnN1YnN0cmluZygwLCBteVRleHQubGVuZ3RoIC0gbmV3VGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgJHNjb3BlLm15VGV4dCA9IG15VGV4dCArIHNvbWV0aGluZ1RleHQ7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGRpZ2VzdCB3aGljaCB3aWxsIHRyaWdnZXIgd2F0Y2guXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpWzBdLmlubmVyVGV4dCkudG9FcXVhbChteVRleHQgKyAnLi4uJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
