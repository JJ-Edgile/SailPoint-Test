System.register(['test/js/TestInitializer', 'common/directive/DirectiveModule'], function (_export) {
    'use strict';

    var directiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveDirectiveModule) {
            directiveModule = _commonDirectiveDirectiveModule['default'];
        }],
        execute: function () {

            describe('DueDateDirective', function () {

                var $scope = undefined,
                    $compile = undefined,
                    spDateService = undefined;

                beforeEach(module(directiveModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _spDateService_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    spDateService = _spDateService_;

                    spyOn(spDateService, 'getDueDateText').and.returnValue('DUE');
                }));

                /**
                 * Create the compiled directive element using the given dueDate and option maxDaysUntilDue.
                 */
                function createElement(dueDate, maxDaysUntilDue) {
                    var element = undefined;
                    $scope.dueDate = dueDate;
                    $scope.maxDaysUntilDue = maxDaysUntilDue;
                    element = angular.element('<sp-due-date sp-due-date="dueDate" sp-max-days-until-due="maxDaysUntilDue"/>');
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                function getDate(daysFromNow) {
                    var start = new Date(),
                        newTime = start.getTime() + daysFromNow * (1000 * 60 * 60 * 24);
                    return new Date(newTime);
                }

                it('should throw exception with null date', function () {
                    expect(function () {
                        createElement(null);
                    }).toThrow();
                });

                it('defaults to showing dates when due date is > 7 days away', function () {
                    var date = new Date();
                    createElement(date);
                    expect(spDateService.getDueDateText).toHaveBeenCalledWith(date, 7);
                });

                it('uses the maxDaysUntilDue parameter if provided', function () {
                    var date = new Date();
                    createElement(date, 16);
                    expect(spDateService.getDueDateText).toHaveBeenCalledWith(date, 16);
                });

                it('passes the days until due date to get the due date text', function () {
                    var date = getDate(2);
                    createElement(date);
                    expect(spDateService.getDueDateText).toHaveBeenCalledWith(date, 7);
                });

                describe('style class', function () {
                    function testClass(daysUntilDue, expectedClass) {
                        var element = createElement(getDate(daysUntilDue));
                        expect(element.find('span').attr('class')).toBe(expectedClass);
                    }

                    it('is danger when overdue', function () {
                        testClass(-2, 'text-danger');
                    });

                    it('is danger when due today', function () {
                        testClass(0, 'text-danger');
                    });

                    it('is warning when within a week', function () {
                        testClass(6, 'text-warning');
                    });

                    it('is undefined when more than a week', function () {
                        testClass(8, undefined);
                    });
                });

                describe('warning icon', function () {
                    function hasIcon(element) {
                        return element.find('i.fa-exclamation-triangle').length > 0;
                    }

                    function testIcon(daysUntilDue, expectIcon) {
                        var element = createElement(getDate(daysUntilDue));
                        expect(hasIcon(element)).toEqual(expectIcon);
                    }

                    it('is displayed when overdue', function () {
                        testIcon(-2, true);
                    });

                    it('is displayed when due today', function () {
                        testIcon(0, true);
                    });

                    it('is displayed when due in less than a week', function () {
                        testIcon(6, true);
                    });

                    it('is not displayed when due in more than a week', function () {
                        testIcon(8, false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvRHVlRGF0ZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsVUFBVSxTQUFTO0lBQ2hHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxpQ0FBaUM7WUFDdkYsa0JBQWtCLGdDQUFnQzs7UUFFdEQsU0FBUyxZQUFZOztZQUw3QixTQUFTLG9CQUFvQixZQUFXOztnQkFFcEMsSUFBSSxTQUFNO29CQUFFLFdBQVE7b0JBQUUsZ0JBQWE7O2dCQUVuQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksaUJBQWlCO29CQUNsRSxTQUFTO29CQUNULFdBQVc7b0JBQ1gsZ0JBQWdCOztvQkFFaEIsTUFBTSxlQUFlLGtCQUFrQixJQUFJLFlBQVk7Ozs7OztnQkFNM0QsU0FBUyxjQUFjLFNBQVMsaUJBQWlCO29CQUM3QyxJQUFJLFVBQU87b0JBQ1gsT0FBTyxVQUFVO29CQUNqQixPQUFPLGtCQUFrQjtvQkFDekIsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLFNBQVMsU0FBUztvQkFDbEIsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsU0FBUyxRQUFRLGFBQWE7b0JBQzFCLElBQUksUUFBUSxJQUFJO3dCQUNaLFVBQVUsTUFBTSxZQUFhLGVBQWUsT0FBTyxLQUFLLEtBQUs7b0JBQ2pFLE9BQU8sSUFBSSxLQUFLOzs7Z0JBR3BCLEdBQUcseUNBQXlDLFlBQVc7b0JBQ25ELE9BQU8sWUFBVzt3QkFDZCxjQUFjO3VCQUNmOzs7Z0JBR1AsR0FBRyw0REFBNEQsWUFBVztvQkFDdEUsSUFBSSxPQUFPLElBQUk7b0JBQ2YsY0FBYztvQkFDZCxPQUFPLGNBQWMsZ0JBQWdCLHFCQUFxQixNQUFNOzs7Z0JBR3BFLEdBQUcsa0RBQWtELFlBQVc7b0JBQzVELElBQUksT0FBTyxJQUFJO29CQUNmLGNBQWMsTUFBTTtvQkFDcEIsT0FBTyxjQUFjLGdCQUFnQixxQkFBcUIsTUFBTTs7O2dCQUdwRSxHQUFHLDJEQUEyRCxZQUFXO29CQUNyRSxJQUFJLE9BQU8sUUFBUTtvQkFDbkIsY0FBYztvQkFDZCxPQUFPLGNBQWMsZ0JBQWdCLHFCQUFxQixNQUFNOzs7Z0JBR3BFLFNBQVMsZUFBZSxZQUFXO29CQUMvQixTQUFTLFVBQVUsY0FBYyxlQUFlO3dCQUM1QyxJQUFJLFVBQVUsY0FBYyxRQUFRO3dCQUNwQyxPQUFPLFFBQVEsS0FBSyxRQUFRLEtBQUssVUFBVSxLQUFLOzs7b0JBR3BELEdBQUcsMEJBQTBCLFlBQVc7d0JBQ3BDLFVBQVUsQ0FBQyxHQUFHOzs7b0JBR2xCLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDLFVBQVUsR0FBRzs7O29CQUdqQixHQUFHLGlDQUFpQyxZQUFXO3dCQUMzQyxVQUFVLEdBQUc7OztvQkFHakIsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsVUFBVSxHQUFHOzs7O2dCQUlyQixTQUFTLGdCQUFnQixZQUFXO29CQUNoQyxTQUFTLFFBQVEsU0FBUzt3QkFDdEIsT0FBTyxRQUFRLEtBQUssNkJBQTZCLFNBQVM7OztvQkFHOUQsU0FBUyxTQUFTLGNBQWMsWUFBWTt3QkFDeEMsSUFBSSxVQUFVLGNBQWMsUUFBUTt3QkFDcEMsT0FBTyxRQUFRLFVBQVUsUUFBUTs7O29CQUdyQyxHQUFHLDZCQUE2QixZQUFXO3dCQUN2QyxTQUFTLENBQUMsR0FBRzs7O29CQUdqQixHQUFHLCtCQUErQixZQUFXO3dCQUN6QyxTQUFTLEdBQUc7OztvQkFHaEIsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsU0FBUyxHQUFHOzs7b0JBR2hCLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELFNBQVMsR0FBRzs7Ozs7O0dBZXJCIiwiZmlsZSI6ImNvbW1vbi9kaXJlY3RpdmUvRHVlRGF0ZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBkaXJlY3RpdmVNb2R1bGUgZnJvbSAnY29tbW9uL2RpcmVjdGl2ZS9EaXJlY3RpdmVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0R1ZURhdGVEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgJHNjb3BlLCAkY29tcGlsZSwgc3BEYXRlU2VydmljZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShkaXJlY3RpdmVNb2R1bGUpKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9zcERhdGVTZXJ2aWNlXykge1xyXG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXztcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgc3BEYXRlU2VydmljZSA9IF9zcERhdGVTZXJ2aWNlXztcclxuXHJcbiAgICAgICAgc3B5T24oc3BEYXRlU2VydmljZSwgJ2dldER1ZURhdGVUZXh0JykuYW5kLnJldHVyblZhbHVlKCdEVUUnKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgY29tcGlsZWQgZGlyZWN0aXZlIGVsZW1lbnQgdXNpbmcgdGhlIGdpdmVuIGR1ZURhdGUgYW5kIG9wdGlvbiBtYXhEYXlzVW50aWxEdWUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZHVlRGF0ZSwgbWF4RGF5c1VudGlsRHVlKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQ7XHJcbiAgICAgICAgJHNjb3BlLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgICAgICRzY29wZS5tYXhEYXlzVW50aWxEdWUgPSBtYXhEYXlzVW50aWxEdWU7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudCgnPHNwLWR1ZS1kYXRlIHNwLWR1ZS1kYXRlPVwiZHVlRGF0ZVwiIHNwLW1heC1kYXlzLXVudGlsLWR1ZT1cIm1heERheXNVbnRpbER1ZVwiLz4nKTtcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRlKGRheXNGcm9tTm93KSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgbmV3VGltZSA9IHN0YXJ0LmdldFRpbWUoKSArIChkYXlzRnJvbU5vdyAqICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKG5ld1RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXhjZXB0aW9uIHdpdGggbnVsbCBkYXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KG51bGwpO1xyXG4gICAgICAgIH0pLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkZWZhdWx0cyB0byBzaG93aW5nIGRhdGVzIHdoZW4gZHVlIGRhdGUgaXMgPiA3IGRheXMgYXdheScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KGRhdGUpO1xyXG4gICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlLmdldER1ZURhdGVUZXh0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChkYXRlLCA3KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd1c2VzIHRoZSBtYXhEYXlzVW50aWxEdWUgcGFyYW1ldGVyIGlmIHByb3ZpZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoZGF0ZSwgMTYpO1xyXG4gICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlLmdldER1ZURhdGVUZXh0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChkYXRlLCAxNik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncGFzc2VzIHRoZSBkYXlzIHVudGlsIGR1ZSBkYXRlIHRvIGdldCB0aGUgZHVlIGRhdGUgdGV4dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBkYXRlID0gZ2V0RGF0ZSgyKTtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KGRhdGUpO1xyXG4gICAgICAgIGV4cGVjdChzcERhdGVTZXJ2aWNlLmdldER1ZURhdGVUZXh0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChkYXRlLCA3KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdzdHlsZSBjbGFzcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RDbGFzcyhkYXlzVW50aWxEdWUsIGV4cGVjdGVkQ2xhc3MpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGdldERhdGUoZGF5c1VudGlsRHVlKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ3NwYW4nKS5hdHRyKCdjbGFzcycpKS50b0JlKGV4cGVjdGVkQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lzIGRhbmdlciB3aGVuIG92ZXJkdWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdENsYXNzKC0yLCAndGV4dC1kYW5nZXInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2lzIGRhbmdlciB3aGVuIGR1ZSB0b2RheScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0Q2xhc3MoMCwgJ3RleHQtZGFuZ2VyJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyB3YXJuaW5nIHdoZW4gd2l0aGluIGEgd2VlaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0Q2xhc3MoNiwgJ3RleHQtd2FybmluZycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgdW5kZWZpbmVkIHdoZW4gbW9yZSB0aGFuIGEgd2VlaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0ZXN0Q2xhc3MoOCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCd3YXJuaW5nIGljb24nLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBoYXNJY29uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgnaS5mYS1leGNsYW1hdGlvbi10cmlhbmdsZScpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0SWNvbihkYXlzVW50aWxEdWUsIGV4cGVjdEljb24pIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGdldERhdGUoZGF5c1VudGlsRHVlKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChoYXNJY29uKGVsZW1lbnQpKS50b0VxdWFsKGV4cGVjdEljb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ2lzIGRpc3BsYXllZCB3aGVuIG92ZXJkdWUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEljb24oLTIsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzcGxheWVkIHdoZW4gZHVlIHRvZGF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRlc3RJY29uKDAsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnaXMgZGlzcGxheWVkIHdoZW4gZHVlIGluIGxlc3MgdGhhbiBhIHdlZWsnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEljb24oNiwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdpcyBub3QgZGlzcGxheWVkIHdoZW4gZHVlIGluIG1vcmUgdGhhbiBhIHdlZWsnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGVzdEljb24oOCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
