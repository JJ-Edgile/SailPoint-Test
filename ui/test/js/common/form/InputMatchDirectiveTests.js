System.register(['test/js/TestInitializer', 'common/form/FormModule'], function (_export) {
    'use strict';

    var formModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonFormFormModule) {
            formModule = _commonFormFormModule['default'];
        }],
        execute: function () {

            describe('InputMatchDirective', function () {
                var VALUE_ONE = '123',
                    VALUE_TWO = 'Something else';
                var form, element1, element2, keyup, $scope;

                beforeEach(module(formModule));

                beforeEach(inject(function (_$compile_, $rootScope) {
                    $scope = $rootScope.$new();
                    form = _$compile_('<form name="testForm">' + '<input id="testInput1" name="testInput1" ng-model="oneValue">' + '<input id="testInput2" name="testInput2" ng-model="twoValue" sp-input-match="testInput1"></form>')($scope);
                    element1 = angular.element(form.find('#testInput1')[0]);
                    element2 = angular.element(form.find('#testInput2')[0]);
                    keyup = angular.element.Event('keyup');
                    angular.element('body').append(form);
                }));

                afterEach(function () {
                    form.remove();
                });

                it('should have error when model and matched value differ', function () {
                    element1.val(VALUE_ONE).trigger('input');
                    element2.val(VALUE_TWO).trigger(keyup);
                    expect($scope.testForm.$error.spInputMatch).toBeTruthy();
                });

                it('should not have an error when model and matched value are the same', function () {
                    element1.val(VALUE_ONE).trigger('input');
                    element2.val(VALUE_ONE).trigger(keyup);
                    expect($scope.testForm.$error.spInputMatch).toBeFalsy();
                });

                it('should not have an error when matched value is undefined', function () {
                    element1.val('').trigger('input');
                    element2.val(VALUE_TWO).trigger(keyup);
                    expect($scope.testForm.$error.spInputMatch).toBeFalsy();
                });

                it('should not have an error when model value is undefined', function () {
                    element1.val(VALUE_ONE).trigger('input');
                    element2.val('').trigger(keyup);
                    expect($scope.testForm.$error.spInputMatch).toBeFalsy();
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9mb3JtL0lucHV0TWF0Y2hEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkJBQTJCLFVBQVUsU0FBUztJQUN0Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsdUJBQXVCLFlBQVc7Z0JBQ3ZDLElBQU0sWUFBWTtvQkFDWixZQUFZO2dCQUNsQixJQUFJLE1BQU0sVUFBVSxVQUFVLE9BQU87O2dCQUVyQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxZQUFZLFlBQVk7b0JBQy9DLFNBQVMsV0FBVztvQkFDcEIsT0FBTyxXQUFXLDJCQUNkLGtFQUNBLG9HQUFvRztvQkFDeEcsV0FBVyxRQUFRLFFBQVEsS0FBSyxLQUFLLGVBQWU7b0JBQ3BELFdBQVcsUUFBUSxRQUFRLEtBQUssS0FBSyxlQUFlO29CQUNwRCxRQUFRLFFBQVEsUUFBUSxNQUFNO29CQUM5QixRQUFRLFFBQVEsUUFBUSxPQUFPOzs7Z0JBR25DLFVBQVUsWUFBVztvQkFDakIsS0FBSzs7O2dCQUdULEdBQUcseURBQXlELFlBQVc7b0JBQ25FLFNBQVMsSUFBSSxXQUFXLFFBQVE7b0JBQ2hDLFNBQVMsSUFBSSxXQUFXLFFBQVE7b0JBQ2hDLE9BQU8sT0FBTyxTQUFTLE9BQU8sY0FBYzs7O2dCQUdoRCxHQUFHLHNFQUFzRSxZQUFXO29CQUNoRixTQUFTLElBQUksV0FBVyxRQUFRO29CQUNoQyxTQUFTLElBQUksV0FBVyxRQUFRO29CQUNoQyxPQUFPLE9BQU8sU0FBUyxPQUFPLGNBQWM7OztnQkFHaEQsR0FBRyw0REFBNEQsWUFBVztvQkFDdEUsU0FBUyxJQUFJLElBQUksUUFBUTtvQkFDekIsU0FBUyxJQUFJLFdBQVcsUUFBUTtvQkFDaEMsT0FBTyxPQUFPLFNBQVMsT0FBTyxjQUFjOzs7Z0JBR2hELEdBQUcsMERBQTBELFlBQVc7b0JBQ3BFLFNBQVMsSUFBSSxXQUFXLFFBQVE7b0JBQ2hDLFNBQVMsSUFBSSxJQUFJLFFBQVE7b0JBQ3pCLE9BQU8sT0FBTyxTQUFTLE9BQU8sY0FBYzs7Ozs7R0FVakQiLCJmaWxlIjoiY29tbW9uL2Zvcm0vSW5wdXRNYXRjaERpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZm9ybU1vZHVsZSBmcm9tICdjb21tb24vZm9ybS9Gb3JtTW9kdWxlJztcblxuZGVzY3JpYmUoJ0lucHV0TWF0Y2hEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBWQUxVRV9PTkUgPSAnMTIzJyxcbiAgICAgICAgICBWQUxVRV9UV08gPSAnU29tZXRoaW5nIGVsc2UnO1xuICAgIHZhciBmb3JtLCBlbGVtZW50MSwgZWxlbWVudDIsIGtleXVwLCAkc2NvcGU7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmb3JtTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbXBpbGVfLCAkcm9vdFNjb3BlKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICBmb3JtID0gXyRjb21waWxlXygnPGZvcm0gbmFtZT1cInRlc3RGb3JtXCI+JyArXG4gICAgICAgICAgICAnPGlucHV0IGlkPVwidGVzdElucHV0MVwiIG5hbWU9XCJ0ZXN0SW5wdXQxXCIgbmctbW9kZWw9XCJvbmVWYWx1ZVwiPicgK1xuICAgICAgICAgICAgJzxpbnB1dCBpZD1cInRlc3RJbnB1dDJcIiBuYW1lPVwidGVzdElucHV0MlwiIG5nLW1vZGVsPVwidHdvVmFsdWVcIiBzcC1pbnB1dC1tYXRjaD1cInRlc3RJbnB1dDFcIj48L2Zvcm0+JykoJHNjb3BlKTtcbiAgICAgICAgZWxlbWVudDEgPSBhbmd1bGFyLmVsZW1lbnQoZm9ybS5maW5kKCcjdGVzdElucHV0MScpWzBdKTtcbiAgICAgICAgZWxlbWVudDIgPSBhbmd1bGFyLmVsZW1lbnQoZm9ybS5maW5kKCcjdGVzdElucHV0MicpWzBdKTtcbiAgICAgICAga2V5dXAgPSBhbmd1bGFyLmVsZW1lbnQuRXZlbnQoJ2tleXVwJyk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLmFwcGVuZChmb3JtKTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvcm0ucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhdmUgZXJyb3Igd2hlbiBtb2RlbCBhbmQgbWF0Y2hlZCB2YWx1ZSBkaWZmZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWxlbWVudDEudmFsKFZBTFVFX09ORSkudHJpZ2dlcignaW5wdXQnKTtcbiAgICAgICAgZWxlbWVudDIudmFsKFZBTFVFX1RXTykudHJpZ2dlcihrZXl1cCk7XG4gICAgICAgIGV4cGVjdCgkc2NvcGUudGVzdEZvcm0uJGVycm9yLnNwSW5wdXRNYXRjaCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSBhbiBlcnJvciB3aGVuIG1vZGVsIGFuZCBtYXRjaGVkIHZhbHVlIGFyZSB0aGUgc2FtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlbGVtZW50MS52YWwoVkFMVUVfT05FKS50cmlnZ2VyKCdpbnB1dCcpO1xuICAgICAgICBlbGVtZW50Mi52YWwoVkFMVUVfT05FKS50cmlnZ2VyKGtleXVwKTtcbiAgICAgICAgZXhwZWN0KCRzY29wZS50ZXN0Rm9ybS4kZXJyb3Iuc3BJbnB1dE1hdGNoKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IGhhdmUgYW4gZXJyb3Igd2hlbiBtYXRjaGVkIHZhbHVlIGlzIHVuZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlbGVtZW50MS52YWwoJycpLnRyaWdnZXIoJ2lucHV0Jyk7XG4gICAgICAgIGVsZW1lbnQyLnZhbChWQUxVRV9UV08pLnRyaWdnZXIoa2V5dXApO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnRlc3RGb3JtLiRlcnJvci5zcElucHV0TWF0Y2gpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSBhbiBlcnJvciB3aGVuIG1vZGVsIHZhbHVlIGlzIHVuZGVmaW5lZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlbGVtZW50MS52YWwoVkFMVUVfT05FKS50cmlnZ2VyKCdpbnB1dCcpO1xuICAgICAgICBlbGVtZW50Mi52YWwoJycpLnRyaWdnZXIoa2V5dXApO1xuICAgICAgICBleHBlY3QoJHNjb3BlLnRlc3RGb3JtLiRlcnJvci5zcElucHV0TWF0Y2gpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
