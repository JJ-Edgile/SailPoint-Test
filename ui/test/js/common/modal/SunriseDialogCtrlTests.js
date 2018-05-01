System.register(['test/js/TestInitializer', 'common/modal/ModalModule'], function (_export) {
    'use strict';

    var modalModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonModalModalModule) {
            modalModule = _commonModalModalModule['default'];
        }],
        execute: function () {

            describe('SunriseDialogCtrlTest', function () {

                var $controller,
                    $uibModalInstance,
                    today = new Date(new Date().setHours(0, 0, 0, 0)),
                    twoDays = 172800000;

                function createController(sunriseDate, sunsetDate, sunsetOnly) {
                    return $controller('SunriseDialogCtrl', {
                        sunriseDate: sunriseDate,
                        sunsetDate: sunsetDate,
                        sunsetOnly: sunsetOnly,
                        $uibModalInstance: $uibModalInstance
                    });
                }

                // Let the tests know we'll use the modal module.
                beforeEach(module(modalModule));

                /**
                 * Setup the mocks for our tests.
                 */
                beforeEach(inject(function (_$controller_) {
                    $controller = _$controller_;

                    $uibModalInstance = {
                        close: jasmine.createSpy(),
                        dismiss: jasmine.createSpy()
                    };
                }));

                describe('initialize minimums', function () {

                    it('should setup the min sunrise date to be today', function () {
                        var ctrl = createController(undefined, undefined);
                        expect(ctrl.sunriseMin).toEqual(today);
                    });

                    it('should setup the min sunset date to be today if no sunrise date', function () {
                        var ctrl = createController(undefined, undefined);
                        expect(ctrl.sunsetMin).toEqual(today);
                    });

                    it('should setup the min sunset date to the sunrise date if the sunrise date is set and it is after today', function () {
                        var sunrise = new Date(today.getTime() + twoDays),
                            ctrl = createController(sunrise, undefined);

                        ctrl.calcSunsetMin();
                        expect(ctrl.sunsetMin).toEqual(sunrise);
                    });

                    it('should setup the min sunset date to today if the sunrise date is set and it is before today', function () {
                        var sunrise = new Date(today.getTime() - twoDays),
                            ctrl = createController(sunrise, undefined);
                        expect(ctrl.sunsetMin).toEqual(today);
                    });

                    it('should update the sunset min when the sunrise is altered', function () {
                        var sunriseDate = new Date(today.getTime() - twoDays),
                            ctrl = createController(sunriseDate, undefined);

                        ctrl.calcSunsetMin();
                        expect(ctrl.sunsetMin).toEqual(today);
                        expect(ctrl.sunriseDate.getTime()).toEqual(sunriseDate.getTime());

                        ctrl.sunriseDate = new Date(today.getTime() + twoDays);

                        ctrl.calcSunsetMin();
                        expect(ctrl.sunsetMin.getTime()).toEqual(ctrl.sunriseDate.getTime());
                    });

                    it('should set sunsetOnly', function () {
                        var ctrl = createController(undefined, undefined, true);
                        expect(ctrl.sunsetOnly).toEqual(true);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tb2RhbC9TdW5yaXNlRGlhbG9nQ3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw2QkFBNkIsVUFBVSxTQUFTO0lBQ3hGOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx5QkFBeUI7WUFDL0UsY0FBYyx3QkFBd0I7O1FBRTFDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyx5QkFBeUIsWUFBVzs7Z0JBRXpDLElBQUk7b0JBQWE7b0JBQ2IsUUFBUSxJQUFJLEtBQUssSUFBSSxPQUFPLFNBQVMsR0FBRyxHQUFHLEdBQUc7b0JBQzlDLFVBQVU7O2dCQUVkLFNBQVMsaUJBQWlCLGFBQWEsWUFBWSxZQUFZO29CQUMzRCxPQUFPLFlBQVkscUJBQXFCO3dCQUNwQyxhQUFhO3dCQUNiLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixtQkFBbUI7Ozs7O2dCQUszQixXQUFXLE9BQU87Ozs7O2dCQUtsQixXQUFXLE9BQU8sVUFBUyxlQUFlO29CQUN0QyxjQUFjOztvQkFFZCxvQkFBb0I7d0JBQ2hCLE9BQU8sUUFBUTt3QkFDZixTQUFTLFFBQVE7Ozs7Z0JBSXpCLFNBQVMsdUJBQXVCLFlBQVc7O29CQUV2QyxHQUFHLGlEQUFpRCxZQUFXO3dCQUMzRCxJQUFJLE9BQU8saUJBQWlCLFdBQVc7d0JBQ3ZDLE9BQU8sS0FBSyxZQUFZLFFBQVE7OztvQkFHcEMsR0FBRyxtRUFBbUUsWUFBVzt3QkFDN0UsSUFBSSxPQUFPLGlCQUFpQixXQUFXO3dCQUN2QyxPQUFPLEtBQUssV0FBVyxRQUFROzs7b0JBR25DLEdBQUcseUdBQ0MsWUFBVzt3QkFDWCxJQUFJLFVBQVUsSUFBSSxLQUFLLE1BQU0sWUFBWTs0QkFDckMsT0FBTyxpQkFBaUIsU0FBUzs7d0JBRXJDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFdBQVcsUUFBUTs7O29CQUduQyxHQUFHLCtGQUErRixZQUFXO3dCQUN6RyxJQUFJLFVBQVUsSUFBSSxLQUFLLE1BQU0sWUFBWTs0QkFDckMsT0FBTyxpQkFBaUIsU0FBUzt3QkFDckMsT0FBTyxLQUFLLFdBQVcsUUFBUTs7O29CQUduQyxHQUFHLDREQUE0RCxZQUFXO3dCQUN0RSxJQUFJLGNBQWMsSUFBSSxLQUFLLE1BQU0sWUFBWTs0QkFDekMsT0FBTyxpQkFBaUIsYUFBYTs7d0JBRXpDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFdBQVcsUUFBUTt3QkFDL0IsT0FBTyxLQUFLLFlBQVksV0FBVyxRQUFRLFlBQVk7O3dCQUV2RCxLQUFLLGNBQWMsSUFBSSxLQUFLLE1BQU0sWUFBWTs7d0JBRTlDLEtBQUs7d0JBQ0wsT0FBTyxLQUFLLFVBQVUsV0FBVyxRQUFRLEtBQUssWUFBWTs7O29CQUc5RCxHQUFHLHlCQUF5QixZQUFNO3dCQUM5QixJQUFJLE9BQU8saUJBQWlCLFdBQVcsV0FBVzt3QkFDbEQsT0FBTyxLQUFLLFlBQVksUUFBUTs7Ozs7O0dBYXpDIiwiZmlsZSI6ImNvbW1vbi9tb2RhbC9TdW5yaXNlRGlhbG9nQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbW9kYWxNb2R1bGUgZnJvbSAnY29tbW9uL21vZGFsL01vZGFsTW9kdWxlJztcblxuZGVzY3JpYmUoJ1N1bnJpc2VEaWFsb2dDdHJsVGVzdCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyICRjb250cm9sbGVyLCAkdWliTW9kYWxJbnN0YW5jZSxcbiAgICAgICAgdG9kYXkgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldEhvdXJzKDAsIDAsIDAsIDApKSxcbiAgICAgICAgdHdvRGF5cyA9IDE3MjgwMDAwMDtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoc3VucmlzZURhdGUsIHN1bnNldERhdGUsIHN1bnNldE9ubHkpIHtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdTdW5yaXNlRGlhbG9nQ3RybCcsIHtcbiAgICAgICAgICAgIHN1bnJpc2VEYXRlOiBzdW5yaXNlRGF0ZSxcbiAgICAgICAgICAgIHN1bnNldERhdGU6IHN1bnNldERhdGUsXG4gICAgICAgICAgICBzdW5zZXRPbmx5OiBzdW5zZXRPbmx5LFxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2U6ICR1aWJNb2RhbEluc3RhbmNlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIExldCB0aGUgdGVzdHMga25vdyB3ZSdsbCB1c2UgdGhlIG1vZGFsIG1vZHVsZS5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtb2RhbE1vZHVsZSkpO1xuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIG1vY2tzIGZvciBvdXIgdGVzdHMuXG4gICAgICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRjb250cm9sbGVyXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG5cbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoKSxcbiAgICAgICAgICAgIGRpc21pc3M6IGphc21pbmUuY3JlYXRlU3B5KClcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnaW5pdGlhbGl6ZSBtaW5pbXVtcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0dXAgdGhlIG1pbiBzdW5yaXNlIGRhdGUgdG8gYmUgdG9kYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjdHJsID0gY3JlYXRlQ29udHJvbGxlcih1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdW5yaXNlTWluKS50b0VxdWFsKHRvZGF5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXR1cCB0aGUgbWluIHN1bnNldCBkYXRlIHRvIGJlIHRvZGF5IGlmIG5vIHN1bnJpc2UgZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN1bnNldE1pbikudG9FcXVhbCh0b2RheSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0dXAgdGhlIG1pbiBzdW5zZXQgZGF0ZSB0byB0aGUgc3VucmlzZSBkYXRlIGlmIHRoZSBzdW5yaXNlIGRhdGUgaXMgc2V0IGFuZCBpdCBpcyBhZnRlciB0b2RheScsXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdW5yaXNlID0gbmV3IERhdGUodG9kYXkuZ2V0VGltZSgpICsgdHdvRGF5cyksXG4gICAgICAgICAgICAgICAgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoc3VucmlzZSwgdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgY3RybC5jYWxjU3Vuc2V0TWluKCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdW5zZXRNaW4pLnRvRXF1YWwoc3VucmlzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0dXAgdGhlIG1pbiBzdW5zZXQgZGF0ZSB0byB0b2RheSBpZiB0aGUgc3VucmlzZSBkYXRlIGlzIHNldCBhbmQgaXQgaXMgYmVmb3JlIHRvZGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc3VucmlzZSA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSAtIHR3b0RheXMpLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHN1bnJpc2UsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdW5zZXRNaW4pLnRvRXF1YWwodG9kYXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHVwZGF0ZSB0aGUgc3Vuc2V0IG1pbiB3aGVuIHRoZSBzdW5yaXNlIGlzIGFsdGVyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdW5yaXNlRGF0ZSA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSAtIHR3b0RheXMpLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHN1bnJpc2VEYXRlLCB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICBjdHJsLmNhbGNTdW5zZXRNaW4oKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN1bnNldE1pbikudG9FcXVhbCh0b2RheSk7XG4gICAgICAgICAgICBleHBlY3QoY3RybC5zdW5yaXNlRGF0ZS5nZXRUaW1lKCkpLnRvRXF1YWwoc3VucmlzZURhdGUuZ2V0VGltZSgpKTtcblxuICAgICAgICAgICAgY3RybC5zdW5yaXNlRGF0ZSA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSArIHR3b0RheXMpO1xuXG4gICAgICAgICAgICBjdHJsLmNhbGNTdW5zZXRNaW4oKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN1bnNldE1pbi5nZXRUaW1lKCkpLnRvRXF1YWwoY3RybC5zdW5yaXNlRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBzdW5zZXRPbmx5JywgKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgICAgIGV4cGVjdChjdHJsLnN1bnNldE9ubHkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
