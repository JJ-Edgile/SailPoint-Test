System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {

            describe('IdentityAccessButtonExpirationDirective', function () {
                var $scope = undefined,
                    $compile = undefined,
                    $filter = undefined;

                beforeEach(module(identityModule));
                beforeEach(inject(function (_$rootScope_, _$compile_, _$filter_) {
                    $scope = _$rootScope_;
                    $compile = _$compile_;
                    $filter = _$filter_;
                }));

                function createElement() {
                    var definition = '<sp-identity-access-expiration-button ' + 'sp-button-id="12345" ' + 'sp-sunrise-date="sunrise" ' + 'sp-sunset-date="sunset"><sp-identity-access-expiration-button>',
                        element = $compile(definition)($scope);
                    $scope.$apply();
                    return element;
                }

                function getButton(element) {
                    var btn = element.find('#12345');
                    expect(btn.length).toEqual(1);
                    return angular.element(btn[0]);
                }

                it('should have sunrise in the element', function () {
                    $scope.sunrise = new Date(1475125200000);
                    var element = createElement(),
                        btn = getButton(element),
                        expectedSunrise = $filter('date')($scope.sunrise);
                    btn.click();
                    $scope.$apply();
                    var sunriseDate = element.find('#accessSunriseDate'),
                        content = sunriseDate.find('span').text();
                    expect(content).toEqual(expectedSunrise);
                });

                it('should have sunset in the element', function () {
                    $scope.sunset = new Date(1475125200000);
                    var element = createElement(),
                        btn = getButton(element),
                        expectedSunset = $filter('date')($scope.sunset);
                    btn.click();
                    $scope.$apply();
                    var sunsetDate = element.find('#accessSunsetDate'),
                        content = sunsetDate.find('span').text();
                    expect(content).toEqual(expectedSunset);
                });

                it('should not have sunset/sunrise date', function () {
                    $scope.sunset = null;
                    $scope.sunrise = null;
                    var element = createElement(),
                        btn = getButton(element);
                    btn.click();
                    $scope.$apply();
                    var sunriseDate = element.find('#accessSunriseDate'),
                        sunsetDate = element.find('#accessSunsetDate');
                    expect(sunriseDate.length).toEqual(0);
                    expect(sunsetDate.length).toEqual(0);
                });

                describe('showDivider', function () {
                    function getDividers(sunriseDate, sunsetDate) {
                        $scope.sunrise = sunriseDate;
                        $scope.sunset = sunsetDate;
                        var element = createElement(),
                            btn = getButton(element);
                        btn.click();
                        $scope.$apply();
                        return element.find('.line');
                    }

                    it('should be true if both sunrise and sunset dates are set', function () {
                        var dividers = getDividers(new Date(321), new Date(123));
                        expect(dividers.length).toEqual(2);
                    });

                    it('should be false if only sunrise is set', function () {
                        var dividers = getDividers(new Date(2392890349));
                        expect(dividers.length).toEqual(1);
                    });

                    it('should be false if only sunset is set', function () {
                        var dividers = getDividers(null, new Date(890234782));
                        expect(dividers.length).toEqual(1);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzRXhwaXJhdGlvbkJ1dHRvbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7O0lBSXZGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsaUJBQWlCLHdCQUF3Qjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJDQUEyQyxZQUFXO2dCQUMzRCxJQUFJLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxVQUFPOztnQkFFN0IsV0FBVyxPQUFPO2dCQUNsQixXQUFXLE9BQU8sVUFBUyxjQUFjLFlBQVksV0FBVztvQkFDNUQsU0FBUztvQkFDVCxXQUFXO29CQUNYLFVBQVU7OztnQkFHZCxTQUFTLGdCQUFnQjtvQkFDckIsSUFBSSxhQUFhLDJDQUNiLDBCQUNBLCtCQUNBO3dCQUNBLFVBQVUsU0FBUyxZQUFZO29CQUNuQyxPQUFPO29CQUNQLE9BQU87OztnQkFHWCxTQUFTLFVBQVUsU0FBUztvQkFDeEIsSUFBSSxNQUFNLFFBQVEsS0FBSztvQkFDdkIsT0FBTyxJQUFJLFFBQVEsUUFBUTtvQkFDM0IsT0FBTyxRQUFRLFFBQVEsSUFBSTs7O2dCQUcvQixHQUFHLHNDQUFzQyxZQUFXO29CQUNoRCxPQUFPLFVBQVUsSUFBSSxLQUFLO29CQUMxQixJQUFJLFVBQVU7d0JBQ2QsTUFBTSxVQUFVO3dCQUNoQixrQkFBa0IsUUFBUSxRQUFRLE9BQU87b0JBQ3pDLElBQUk7b0JBQ0osT0FBTztvQkFDUCxJQUFJLGNBQWMsUUFBUSxLQUFLO3dCQUMzQixVQUFVLFlBQVksS0FBSyxRQUFRO29CQUN2QyxPQUFPLFNBQVMsUUFBUTs7O2dCQUc1QixHQUFHLHFDQUFxQyxZQUFXO29CQUMvQyxPQUFPLFNBQVMsSUFBSSxLQUFLO29CQUN6QixJQUFJLFVBQVU7d0JBQ2QsTUFBTSxVQUFVO3dCQUNoQixpQkFBaUIsUUFBUSxRQUFRLE9BQU87b0JBQ3hDLElBQUk7b0JBQ0osT0FBTztvQkFDUCxJQUFJLGFBQWEsUUFBUSxLQUFLO3dCQUMxQixVQUFVLFdBQVcsS0FBSyxRQUFRO29CQUN0QyxPQUFPLFNBQVMsUUFBUTs7O2dCQUc1QixHQUFHLHVDQUF1QyxZQUFXO29CQUNqRCxPQUFPLFNBQVM7b0JBQ2hCLE9BQU8sVUFBVTtvQkFDakIsSUFBSSxVQUFVO3dCQUNkLE1BQU0sVUFBVTtvQkFDaEIsSUFBSTtvQkFDSixPQUFPO29CQUNQLElBQUksY0FBYyxRQUFRLEtBQUs7d0JBQzNCLGFBQWEsUUFBUSxLQUFLO29CQUM5QixPQUFPLFlBQVksUUFBUSxRQUFRO29CQUNuQyxPQUFPLFdBQVcsUUFBUSxRQUFROzs7Z0JBR3RDLFNBQVMsZUFBZSxZQUFXO29CQUMvQixTQUFTLFlBQVksYUFBYSxZQUFZO3dCQUMxQyxPQUFPLFVBQVU7d0JBQ2pCLE9BQU8sU0FBUzt3QkFDaEIsSUFBSSxVQUFVOzRCQUNWLE1BQU0sVUFBVTt3QkFDcEIsSUFBSTt3QkFDSixPQUFPO3dCQUNQLE9BQU8sUUFBUSxLQUFLOzs7b0JBR3hCLEdBQUcsMkRBQTJELFlBQVc7d0JBQ3JFLElBQUksV0FBVyxZQUFZLElBQUksS0FBSyxNQUFNLElBQUksS0FBSzt3QkFDbkQsT0FBTyxTQUFTLFFBQVEsUUFBUTs7O29CQUdwQyxHQUFHLDBDQUEwQyxZQUFXO3dCQUNwRCxJQUFJLFdBQVcsWUFBWSxJQUFJLEtBQUs7d0JBQ3BDLE9BQU8sU0FBUyxRQUFRLFFBQVE7OztvQkFHcEMsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsSUFBSSxXQUFXLFlBQVksTUFBTSxJQUFJLEtBQUs7d0JBQzFDLE9BQU8sU0FBUyxRQUFRLFFBQVE7Ozs7OztHQVl6QyIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUFjY2Vzc0V4cGlyYXRpb25CdXR0b25EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICovXHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgaWRlbnRpdHlNb2R1bGUgZnJvbSAnaWRlbnRpdHkvSWRlbnRpdHlNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ0lkZW50aXR5QWNjZXNzQnV0dG9uRXhwaXJhdGlvbkRpcmVjdGl2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0ICRzY29wZSwgJGNvbXBpbGUsICRmaWx0ZXI7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlNb2R1bGUpKTtcclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgXyRmaWx0ZXJfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfO1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgICAgICAkZmlsdGVyID0gXyRmaWx0ZXJfO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGRlZmluaXRpb24gPSAnPHNwLWlkZW50aXR5LWFjY2Vzcy1leHBpcmF0aW9uLWJ1dHRvbiAnICtcclxuICAgICAgICAgICAgJ3NwLWJ1dHRvbi1pZD1cIjEyMzQ1XCIgJyArXHJcbiAgICAgICAgICAgICdzcC1zdW5yaXNlLWRhdGU9XCJzdW5yaXNlXCIgJyArXHJcbiAgICAgICAgICAgICdzcC1zdW5zZXQtZGF0ZT1cInN1bnNldFwiPjxzcC1pZGVudGl0eS1hY2Nlc3MtZXhwaXJhdGlvbi1idXR0b24+JyxcclxuICAgICAgICAgICAgZWxlbWVudCA9ICRjb21waWxlKGRlZmluaXRpb24pKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEJ1dHRvbihlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IGVsZW1lbnQuZmluZCgnIzEyMzQ1Jyk7XHJcbiAgICAgICAgZXhwZWN0KGJ0bi5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChidG5bMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdzaG91bGQgaGF2ZSBzdW5yaXNlIGluIHRoZSBlbGVtZW50JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnN1bnJpc2UgPSBuZXcgRGF0ZSgxNDc1MTI1MjAwMDAwKTtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoKSxcclxuICAgICAgICBidG4gPSBnZXRCdXR0b24oZWxlbWVudCksXHJcbiAgICAgICAgZXhwZWN0ZWRTdW5yaXNlID0gJGZpbHRlcignZGF0ZScpKCRzY29wZS5zdW5yaXNlKTtcclxuICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgbGV0IHN1bnJpc2VEYXRlID0gZWxlbWVudC5maW5kKCcjYWNjZXNzU3VucmlzZURhdGUnKSxcclxuICAgICAgICAgICAgY29udGVudCA9IHN1bnJpc2VEYXRlLmZpbmQoJ3NwYW4nKS50ZXh0KCk7XHJcbiAgICAgICAgZXhwZWN0KGNvbnRlbnQpLnRvRXF1YWwoZXhwZWN0ZWRTdW5yaXNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgaGF2ZSBzdW5zZXQgaW4gdGhlIGVsZW1lbnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc3Vuc2V0ID0gbmV3IERhdGUoMTQ3NTEyNTIwMDAwMCk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXHJcbiAgICAgICAgYnRuID0gZ2V0QnV0dG9uKGVsZW1lbnQpLFxyXG4gICAgICAgIGV4cGVjdGVkU3Vuc2V0ID0gJGZpbHRlcignZGF0ZScpKCRzY29wZS5zdW5zZXQpO1xyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBsZXQgc3Vuc2V0RGF0ZSA9IGVsZW1lbnQuZmluZCgnI2FjY2Vzc1N1bnNldERhdGUnKSxcclxuICAgICAgICAgICAgY29udGVudCA9IHN1bnNldERhdGUuZmluZCgnc3BhbicpLnRleHQoKTtcclxuICAgICAgICBleHBlY3QoY29udGVudCkudG9FcXVhbChleHBlY3RlZFN1bnNldCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIG5vdCBoYXZlIHN1bnNldC9zdW5yaXNlIGRhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc3Vuc2V0ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc3VucmlzZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCksXHJcbiAgICAgICAgYnRuID0gZ2V0QnV0dG9uKGVsZW1lbnQpO1xyXG4gICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICBsZXQgc3VucmlzZURhdGUgPSBlbGVtZW50LmZpbmQoJyNhY2Nlc3NTdW5yaXNlRGF0ZScpLFxyXG4gICAgICAgICAgICBzdW5zZXREYXRlID0gZWxlbWVudC5maW5kKCcjYWNjZXNzU3Vuc2V0RGF0ZScpO1xyXG4gICAgICAgIGV4cGVjdChzdW5yaXNlRGF0ZS5sZW5ndGgpLnRvRXF1YWwoMCk7XHJcbiAgICAgICAgZXhwZWN0KHN1bnNldERhdGUubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3Nob3dEaXZpZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGl2aWRlcnMoc3VucmlzZURhdGUsIHN1bnNldERhdGUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN1bnJpc2UgPSBzdW5yaXNlRGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLnN1bnNldCA9IHN1bnNldERhdGU7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpLFxyXG4gICAgICAgICAgICAgICAgYnRuID0gZ2V0QnV0dG9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBidG4uY2xpY2soKTtcclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5maW5kKCcubGluZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGlmIGJvdGggc3VucmlzZSBhbmQgc3Vuc2V0IGRhdGVzIGFyZSBzZXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGRpdmlkZXJzID0gZ2V0RGl2aWRlcnMobmV3IERhdGUoMzIxKSwgbmV3IERhdGUoMTIzKSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaXZpZGVycy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZmFsc2UgaWYgb25seSBzdW5yaXNlIGlzIHNldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZGl2aWRlcnMgPSBnZXREaXZpZGVycyhuZXcgRGF0ZSgyMzkyODkwMzQ5KSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChkaXZpZGVycy5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG91bGQgYmUgZmFsc2UgaWYgb25seSBzdW5zZXQgaXMgc2V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXZpZGVycyA9IGdldERpdmlkZXJzKG51bGwsIG5ldyBEYXRlKDg5MDIzNDc4MikpO1xyXG4gICAgICAgICAgICBleHBlY3QoZGl2aWRlcnMubGVuZ3RoKS50b0VxdWFsKDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
