System.register(['test/js/TestInitializer', 'common/widget/WidgetModule'], function (_export) {
    'use strict';

    var widgetModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonWidgetWidgetModule) {
            widgetModule = _commonWidgetWidgetModule['default'];
        }],
        execute: function () {

            describe('ChatMessageDirective', function () {
                var element, $scope;

                beforeEach(module(widgetModule));

                function getElementDefintion(message, srtext, emptytext) {
                    var spMessage = '<sp-chat-message ' + 'text="' + message + '" ' + srtext + 'sender="From Joe" ' + 'right="true" ' + 'timestamp="4/1" ' + 'emptytext="' + (emptytext ? emptytext : '') + '" />';
                    return spMessage;
                }

                describe('chat message without sr text', function () {
                    var message = 'I don\'t want to do this approval',
                        emptytext = 'This thing is empty',
                        spanParentDiv = 'div.panel-body',
                        $compile;
                    beforeEach(inject(function (_$compile_, $rootScope) {
                        $scope = $rootScope;
                        $compile = _$compile_;
                        $scope.test = false;
                        element = angular.element(getElementDefintion(message, '', emptytext));
                        $compile(element)($rootScope);
                        $scope.$apply();
                    }));

                    it('should not be sp-chat-message', function () {
                        expect(element.nodeName).not.toBe('sp-chat-message');
                    });

                    it('should be article', function () {
                        expect(element.nodeName).not.toBe('article');
                    });

                    it('should have message', function () {
                        expect(element[0].innerHTML.indexOf(message)).toBeGreaterThan(-1);
                    });

                    it('should have message twice', function () {
                        var indexOfFirst = -1;
                        expect(indexOfFirst = element[0].innerHTML.indexOf(message)).toBeGreaterThan(-1);
                        expect(element[0].innerHTML.indexOf(message, indexOfFirst + 2)).toBeGreaterThan(indexOfFirst);
                    });

                    it('should have sender', function () {
                        expect(element[0].innerHTML.indexOf('From Joe')).toBeGreaterThan(-1);
                    });

                    it('should have timestamp', function () {
                        expect(element[0].innerHTML.indexOf('4/1')).toBeGreaterThan(-1);
                    });

                    it('should have pull right', function () {
                        expect(element[0].innerHTML.indexOf('pull-right')).toBeGreaterThan(-1);
                    });

                    it('should show empty text span if text is empty', function () {
                        element = angular.element(getElementDefintion('', '', emptytext));
                        $compile(element)($scope);
                        $scope.$apply();

                        var aElement = angular.element(element);
                        var textSpans = aElement.find(spanParentDiv).children('span');
                        expect(textSpans.length).toEqual(2);
                        expect(textSpans[0].innerText).toEqual('');
                        expect(textSpans[1].innerText).toEqual(emptytext);
                        expect(angular.element(textSpans[0]).hasClass('ng-hide')).toBeTruthy();
                        expect(angular.element(textSpans[1]).hasClass('ng-hide')).toBeFalsy();
                    });

                    it('should not show empty text span if text is defined', function () {
                        var aElement = angular.element(element);
                        var textSpans = aElement.find(spanParentDiv).children('span');
                        expect(textSpans.length).toEqual(2);
                        expect(textSpans[0].innerText).toEqual(message);
                        expect(textSpans[1].innerText).toEqual(emptytext);
                        expect(angular.element(textSpans[0]).hasClass('ng-hide')).toBeFalsy();
                        expect(angular.element(textSpans[1]).hasClass('ng-hide')).toBeTruthy();
                    });
                });

                describe('special screen reader chat message', function () {
                    var message = 'I don\'t want to do this approval',
                        srtext = 'srtext="this is for screen readers only" ';

                    beforeEach(inject(function ($compile, $rootScope) {
                        $scope = $rootScope;
                        $scope.test = false;
                        element = angular.element(getElementDefintion(message, srtext));
                        $compile(element)($rootScope);
                        $scope.$apply();
                    }));

                    it('should not be sp-chat-message', function () {
                        expect(element.nodeName).not.toBe('sp-chat-message');
                    });

                    it('should be article', function () {
                        expect(element.nodeName).not.toBe('article');
                    });

                    it('should have message', function () {
                        expect(element[0].innerHTML.indexOf(message)).toBeGreaterThan(-1);
                    });

                    it('should have sender', function () {
                        expect(element[0].innerHTML.indexOf('From Joe')).toBeGreaterThan(-1);
                    });

                    it('should have timestamp', function () {
                        expect(element[0].innerHTML.indexOf('4/1')).toBeGreaterThan(-1);
                    });

                    it('should have sr message', function () {
                        expect(element[0].innerHTML.indexOf('this is for screen readers only')).toBeGreaterThan(-1);
                    });

                    it('should have pull right', function () {
                        expect(element[0].innerHTML.indexOf('pull-right')).toBeGreaterThan(-1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi93aWRnZXQvQ2hhdE1lc3NhZ2VEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUztJQUE5Rjs7SUFHSSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsMkJBQTJCO1lBQ2pGLGVBQWUsMEJBQTBCOztRQUU3QyxTQUFTLFlBQVk7O1lBSDdCLFNBQVMsd0JBQXdCLFlBQVc7Z0JBQ3hDLElBQUksU0FBUzs7Z0JBRWIsV0FBVyxPQUFPOztnQkFFbEIsU0FBUyxvQkFBb0IsU0FBUyxRQUFRLFdBQVc7b0JBQ3JELElBQUksWUFBWSxzQkFDaEIsV0FBVyxVQUFVLE9BQ3JCLFNBQ0EsdUJBQ0Esa0JBQ0EscUJBQ0EsaUJBQWlCLFlBQWMsWUFBWSxNQUFNO29CQUNqRCxPQUFPOzs7Z0JBR1gsU0FBUyxnQ0FBZ0MsWUFBVztvQkFDaEQsSUFBSSxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQjtvQkFDSixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVk7d0JBQy9DLFNBQVM7d0JBQ1QsV0FBVzt3QkFDWCxPQUFPLE9BQU87d0JBQ2QsVUFBVSxRQUFRLFFBQVEsb0JBQW9CLFNBQVMsSUFBSTt3QkFDM0QsU0FBUyxTQUFTO3dCQUNsQixPQUFPOzs7b0JBR1gsR0FBRyxpQ0FBaUMsWUFBVzt3QkFDM0MsT0FBTyxRQUFRLFVBQVUsSUFBSSxLQUFLOzs7b0JBR3RDLEdBQUcscUJBQXFCLFlBQVc7d0JBQy9CLE9BQU8sUUFBUSxVQUFVLElBQUksS0FBSzs7O29CQUd0QyxHQUFHLHVCQUF1QixZQUFXO3dCQUNqQyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsVUFBVSxnQkFBZ0IsQ0FBQzs7O29CQUduRSxHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxJQUFJLGVBQWUsQ0FBQzt3QkFDcEIsT0FBTyxlQUFlLFFBQVEsR0FBRyxVQUFVLFFBQVEsVUFBVSxnQkFBZ0IsQ0FBQzt3QkFDOUUsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFNBQVMsZUFBZSxJQUFJLGdCQUFnQjs7O29CQUdwRixHQUFHLHNCQUFzQixZQUFXO3dCQUNoQyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsYUFBYSxnQkFBZ0IsQ0FBQzs7O29CQUd0RSxHQUFHLHlCQUF5QixZQUFXO3dCQUNuQyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsUUFBUSxnQkFBZ0IsQ0FBQzs7O29CQUdqRSxHQUFHLDBCQUEwQixZQUFXO3dCQUNwQyxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsZUFBZSxnQkFBZ0IsQ0FBQzs7O29CQUd4RSxHQUFHLGdEQUFnRCxZQUFXO3dCQUMxRCxVQUFVLFFBQVEsUUFBUSxvQkFBb0IsSUFBSSxJQUFJO3dCQUN0RCxTQUFTLFNBQVM7d0JBQ2xCLE9BQU87O3dCQUVQLElBQUksV0FBVyxRQUFRLFFBQVE7d0JBQy9CLElBQUksWUFBWSxTQUFTLEtBQUssZUFBZSxTQUFTO3dCQUN0RCxPQUFPLFVBQVUsUUFBUSxRQUFRO3dCQUNqQyxPQUFPLFVBQVUsR0FBRyxXQUFXLFFBQVE7d0JBQ3ZDLE9BQU8sVUFBVSxHQUFHLFdBQVcsUUFBUTt3QkFDdkMsT0FBTyxRQUFRLFFBQVEsVUFBVSxJQUFJLFNBQVMsWUFBWTt3QkFDMUQsT0FBTyxRQUFRLFFBQVEsVUFBVSxJQUFJLFNBQVMsWUFBWTs7O29CQUk5RCxHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxJQUFJLFdBQVcsUUFBUSxRQUFRO3dCQUMvQixJQUFJLFlBQVksU0FBUyxLQUFLLGVBQWUsU0FBUzt3QkFDdEQsT0FBTyxVQUFVLFFBQVEsUUFBUTt3QkFDakMsT0FBTyxVQUFVLEdBQUcsV0FBVyxRQUFRO3dCQUN2QyxPQUFPLFVBQVUsR0FBRyxXQUFXLFFBQVE7d0JBQ3ZDLE9BQU8sUUFBUSxRQUFRLFVBQVUsSUFBSSxTQUFTLFlBQVk7d0JBQzFELE9BQU8sUUFBUSxRQUFRLFVBQVUsSUFBSSxTQUFTLFlBQVk7Ozs7Z0JBSWxFLFNBQVMsc0NBQXNDLFlBQVc7b0JBQ3RELElBQUksVUFBVTt3QkFDVixTQUFTOztvQkFFYixXQUFXLE9BQU8sVUFBUyxVQUFVLFlBQVk7d0JBQzdDLFNBQVM7d0JBQ1QsT0FBTyxPQUFPO3dCQUNkLFVBQVUsUUFBUSxRQUFRLG9CQUFvQixTQUFTO3dCQUN2RCxTQUFTLFNBQVM7d0JBQ2xCLE9BQU87OztvQkFHWCxHQUFHLGlDQUFpQyxZQUFXO3dCQUMzQyxPQUFPLFFBQVEsVUFBVSxJQUFJLEtBQUs7OztvQkFHdEMsR0FBRyxxQkFBcUIsWUFBVzt3QkFDL0IsT0FBTyxRQUFRLFVBQVUsSUFBSSxLQUFLOzs7b0JBR3RDLEdBQUcsdUJBQXVCLFlBQVc7d0JBQ2pDLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxVQUFVLGdCQUFnQixDQUFDOzs7b0JBR25FLEdBQUcsc0JBQXNCLFlBQVc7d0JBQ2hDLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxhQUFhLGdCQUFnQixDQUFDOzs7b0JBR3RFLEdBQUcseUJBQXlCLFlBQVc7d0JBQ25DLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxRQUFRLGdCQUFnQixDQUFDOzs7b0JBR2pFLEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxvQ0FBb0MsZ0JBQWdCLENBQUM7OztvQkFHN0YsR0FBRywwQkFBMEIsWUFBVzt3QkFDcEMsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLGVBQWUsZ0JBQWdCLENBQUM7Ozs7OztHQUk3RSIsImZpbGUiOiJjb21tb24vd2lkZ2V0L0NoYXRNZXNzYWdlRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IHdpZGdldE1vZHVsZSBmcm9tICdjb21tb24vd2lkZ2V0L1dpZGdldE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdDaGF0TWVzc2FnZURpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbGVtZW50LCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSh3aWRnZXRNb2R1bGUpKTtcblxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnREZWZpbnRpb24obWVzc2FnZSwgc3J0ZXh0LCBlbXB0eXRleHQpIHtcbiAgICAgICAgdmFyIHNwTWVzc2FnZSA9ICc8c3AtY2hhdC1tZXNzYWdlICcgK1xuICAgICAgICAndGV4dD1cIicgKyBtZXNzYWdlICsgJ1wiICcgK1xuICAgICAgICBzcnRleHQgK1xuICAgICAgICAnc2VuZGVyPVwiRnJvbSBKb2VcIiAnICtcbiAgICAgICAgJ3JpZ2h0PVwidHJ1ZVwiICcgK1xuICAgICAgICAndGltZXN0YW1wPVwiNC8xXCIgJyArXG4gICAgICAgICdlbXB0eXRleHQ9XCInICsgKChlbXB0eXRleHQpID8gZW1wdHl0ZXh0IDogJycpICsgJ1wiIC8+JztcbiAgICAgICAgcmV0dXJuIHNwTWVzc2FnZTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnY2hhdCBtZXNzYWdlIHdpdGhvdXQgc3IgdGV4dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICdJIGRvblxcJ3Qgd2FudCB0byBkbyB0aGlzIGFwcHJvdmFsJyxcbiAgICAgICAgICAgIGVtcHR5dGV4dCA9ICdUaGlzIHRoaW5nIGlzIGVtcHR5JyxcbiAgICAgICAgICAgIHNwYW5QYXJlbnREaXYgPSAnZGl2LnBhbmVsLWJvZHknLFxuICAgICAgICAgICAgJGNvbXBpbGU7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sICRyb290U2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICAgICAkc2NvcGUudGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50RGVmaW50aW9uKG1lc3NhZ2UsICcnLCBlbXB0eXRleHQpKTtcbiAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRyb290U2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBub3QgYmUgc3AtY2hhdC1tZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5ub2RlTmFtZSkubm90LnRvQmUoJ3NwLWNoYXQtbWVzc2FnZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIGFydGljbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50Lm5vZGVOYW1lKS5ub3QudG9CZSgnYXJ0aWNsZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJIVE1MLmluZGV4T2YobWVzc2FnZSkpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBtZXNzYWdlIHR3aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXhPZkZpcnN0ID0gLTE7XG4gICAgICAgICAgICBleHBlY3QoaW5kZXhPZkZpcnN0ID0gZWxlbWVudFswXS5pbm5lckhUTUwuaW5kZXhPZihtZXNzYWdlKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKG1lc3NhZ2UsIGluZGV4T2ZGaXJzdCArIDIpKS50b0JlR3JlYXRlclRoYW4oaW5kZXhPZkZpcnN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHNlbmRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJIVE1MLmluZGV4T2YoJ0Zyb20gSm9lJykpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB0aW1lc3RhbXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKCc0LzEnKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHB1bGwgcmlnaHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKCdwdWxsLXJpZ2h0JykpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2hvdyBlbXB0eSB0ZXh0IHNwYW4gaWYgdGV4dCBpcyBlbXB0eScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50RGVmaW50aW9uKCcnLCAnJywgZW1wdHl0ZXh0KSk7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICB2YXIgYUVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB2YXIgdGV4dFNwYW5zID0gYUVsZW1lbnQuZmluZChzcGFuUGFyZW50RGl2KS5jaGlsZHJlbignc3BhbicpO1xuICAgICAgICAgICAgZXhwZWN0KHRleHRTcGFucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QodGV4dFNwYW5zWzBdLmlubmVyVGV4dCkudG9FcXVhbCgnJyk7XG4gICAgICAgICAgICBleHBlY3QodGV4dFNwYW5zWzFdLmlubmVyVGV4dCkudG9FcXVhbChlbXB0eXRleHQpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudCh0ZXh0U3BhbnNbMF0pLmhhc0NsYXNzKCduZy1oaWRlJykpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQodGV4dFNwYW5zWzFdKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0JlRmFsc3koKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBzaG93IGVtcHR5IHRleHQgc3BhbiBpZiB0ZXh0IGlzIGRlZmluZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhRWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIHZhciB0ZXh0U3BhbnMgPSBhRWxlbWVudC5maW5kKHNwYW5QYXJlbnREaXYpLmNoaWxkcmVuKCdzcGFuJyk7XG4gICAgICAgICAgICBleHBlY3QodGV4dFNwYW5zLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIGV4cGVjdCh0ZXh0U3BhbnNbMF0uaW5uZXJUZXh0KS50b0VxdWFsKG1lc3NhZ2UpO1xuICAgICAgICAgICAgZXhwZWN0KHRleHRTcGFuc1sxXS5pbm5lclRleHQpLnRvRXF1YWwoZW1wdHl0ZXh0KTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQodGV4dFNwYW5zWzBdKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQodGV4dFNwYW5zWzFdKS5oYXNDbGFzcygnbmctaGlkZScpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NwZWNpYWwgc2NyZWVuIHJlYWRlciBjaGF0IG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnSSBkb25cXCd0IHdhbnQgdG8gZG8gdGhpcyBhcHByb3ZhbCcsXG4gICAgICAgICAgICBzcnRleHQgPSAnc3J0ZXh0PVwidGhpcyBpcyBmb3Igc2NyZWVuIHJlYWRlcnMgb25seVwiICc7XG5cbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbXBpbGUsICRyb290U2NvcGUpIHtcbiAgICAgICAgICAgICRzY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICAgICAkc2NvcGUudGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChnZXRFbGVtZW50RGVmaW50aW9uKG1lc3NhZ2UsIHNydGV4dCkpO1xuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHJvb3RTY29wZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIG5vdCBiZSBzcC1jaGF0LW1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50Lm5vZGVOYW1lKS5ub3QudG9CZSgnc3AtY2hhdC1tZXNzYWdlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgYXJ0aWNsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnQubm9kZU5hbWUpLm5vdC50b0JlKCdhcnRpY2xlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBtZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lckhUTUwuaW5kZXhPZihtZXNzYWdlKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHNlbmRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJIVE1MLmluZGV4T2YoJ0Zyb20gSm9lJykpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSB0aW1lc3RhbXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKCc0LzEnKSkudG9CZUdyZWF0ZXJUaGFuKC0xKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIHNyIG1lc3NhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVySFRNTC5pbmRleE9mKCd0aGlzIGlzIGZvciBzY3JlZW4gcmVhZGVycyBvbmx5JykpLnRvQmVHcmVhdGVyVGhhbigtMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgaGF2ZSBwdWxsIHJpZ2h0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lckhUTUwuaW5kZXhPZigncHVsbC1yaWdodCcpKS50b0JlR3JlYXRlclRoYW4oLTEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
