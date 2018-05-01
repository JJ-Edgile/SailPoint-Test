System.register(['test/js/TestInitializer', 'common/http/HttpModule', 'common/util/UtilModule'], function (_export) {
    'use strict';

    var httpModule, utilModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonHttpHttpModule) {
            httpModule = _commonHttpHttpModule['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }],
        execute: function () {

            describe('SpHttpService', function () {

                var spHttpService;

                beforeEach(module(httpModule, utilModule));

                beforeEach(inject(function (_spHttpService_) {
                    spHttpService = _spHttpService_;
                }));

                describe('encodeComponent', function () {
                    it('should puke if component is null', function () {
                        expect(function () {
                            spHttpService.encodeComponent(null);
                        }).toThrow();
                    });

                    it('should return encoded value', function () {
                        var originalComponent = 'something+something',
                            encodedComponent = 'something%252Bsomething';

                        expect(spHttpService.encodeComponent(originalComponent)).toEqual(encodedComponent);
                    });

                    it('should double encode so that forward slash is safe', function () {
                        var originalComponent = 'rule/name',
                            encodedComponent = 'rule%252Fname';

                        expect(spHttpService.encodeComponent(originalComponent)).toEqual(encodedComponent);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9odHRwL1NwSHR0cFNlcnZpY2VUZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiwwQkFBMEIsMkJBQTJCLFVBQVUsU0FBUztJQUNoSDs7SUFFQSxJQUFJLFlBQVk7SUFDaEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUJBQXVCO1lBQzdFLGFBQWEsc0JBQXNCO1dBQ3BDLFVBQVUsdUJBQXVCO1lBQ2hDLGFBQWEsc0JBQXNCOztRQUV2QyxTQUFTLFlBQVk7O1lBTjdCLFNBQVMsaUJBQWlCLFlBQVc7O2dCQUVqQyxJQUFJOztnQkFFSixXQUFXLE9BQU8sWUFBWTs7Z0JBRTlCLFdBQVcsT0FBTyxVQUFTLGlCQUFpQjtvQkFDeEMsZ0JBQWdCOzs7Z0JBR3BCLFNBQVMsbUJBQW1CLFlBQVc7b0JBQ25DLEdBQUcsb0NBQW9DLFlBQVc7d0JBQzlDLE9BQU8sWUFBVzs0QkFBRSxjQUFjLGdCQUFnQjsyQkFBVTs7O29CQUdoRSxHQUFHLCtCQUErQixZQUFXO3dCQUN6QyxJQUFJLG9CQUFvQjs0QkFDcEIsbUJBQW1COzt3QkFFdkIsT0FBTyxjQUFjLGdCQUFnQixvQkFBb0IsUUFBUTs7O29CQUdyRSxHQUFHLHNEQUFzRCxZQUFZO3dCQUNqRSxJQUFJLG9CQUFvQjs0QkFDcEIsbUJBQW1COzt3QkFFdkIsT0FBTyxjQUFjLGdCQUFnQixvQkFBb0IsUUFBUTs7Ozs7O0dBZ0IxRSIsImZpbGUiOiJjb21tb24vaHR0cC9TcEh0dHBTZXJ2aWNlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGh0dHBNb2R1bGUgZnJvbSAnY29tbW9uL2h0dHAvSHR0cE1vZHVsZSc7XG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcblxuZGVzY3JpYmUoJ1NwSHR0cFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzcEh0dHBTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaHR0cE1vZHVsZSwgdXRpbE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX3NwSHR0cFNlcnZpY2VfKSB7XG4gICAgICAgIHNwSHR0cFNlcnZpY2UgPSBfc3BIdHRwU2VydmljZV87XG4gICAgfSkpO1xuXG4gICAgZGVzY3JpYmUoJ2VuY29kZUNvbXBvbmVudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHB1a2UgaWYgY29tcG9uZW50IGlzIG51bGwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHsgc3BIdHRwU2VydmljZS5lbmNvZGVDb21wb25lbnQobnVsbCk7IH0pLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZW5jb2RlZCB2YWx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsQ29tcG9uZW50ID0gJ3NvbWV0aGluZytzb21ldGhpbmcnLFxuICAgICAgICAgICAgICAgIGVuY29kZWRDb21wb25lbnQgPSAnc29tZXRoaW5nJTI1MkJzb21ldGhpbmcnO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BIdHRwU2VydmljZS5lbmNvZGVDb21wb25lbnQob3JpZ2luYWxDb21wb25lbnQpKS50b0VxdWFsKGVuY29kZWRDb21wb25lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGRvdWJsZSBlbmNvZGUgc28gdGhhdCBmb3J3YXJkIHNsYXNoIGlzIHNhZmUnLCBmdW5jdGlvbigpICB7XG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxDb21wb25lbnQgPSAncnVsZS9uYW1lJyxcbiAgICAgICAgICAgICAgICBlbmNvZGVkQ29tcG9uZW50ID0gJ3J1bGUlMjUyRm5hbWUnO1xuXG4gICAgICAgICAgICBleHBlY3Qoc3BIdHRwU2VydmljZS5lbmNvZGVDb21wb25lbnQob3JpZ2luYWxDb21wb25lbnQpKS50b0VxdWFsKGVuY29kZWRDb21wb25lbnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
