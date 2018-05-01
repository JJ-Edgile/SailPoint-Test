System.register(['certification/CertificationModule', 'test/js/TestInitializer'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}],
        execute: function () {

            describe('CertificationActionDirective', function () {

                var elementDefinition = '<sp-certification-action sp-action="{{ action }}" />',
                    $scope = undefined,
                    $compile = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function ($rootScope, _$compile_) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                }));

                function createElement(action) {
                    var element = angular.element(elementDefinition);
                    $scope.action = action;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('is hidden if there is no action', function () {
                    var element = createElement(null);
                    expect(element.children().hasClass('ng-hide')).toEqual(true);
                });

                it('uses the action for the CSS class', function () {
                    var element = createElement('Jackson');
                    expect(element.children().hasClass('cert-action-Jackson')).toEqual(true);
                });

                it('uses the action to construct the message to display', function () {
                    var element = createElement('NotWords');
                    expect(element.text().trim()).toEqual('cert_action_not_words');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjdGlvbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHFDQUFxQyw0QkFBNEIsVUFBVSxTQUFTO0lBQ2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsbUNBQW1DO1lBQ25ELHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSx3QkFBd0I7UUFDckMsU0FBUyxZQUFZOztZQUw3QixTQUFTLGdDQUFnQyxZQUFXOztnQkFFaEQsSUFBSSxvQkFBb0I7b0JBQ3BCLFNBQU07b0JBQUUsV0FBUTs7Z0JBRXBCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFlBQVksWUFBWTtvQkFDL0MsU0FBUyxXQUFXO29CQUNwQixXQUFXOzs7Z0JBR2YsU0FBUyxjQUFjLFFBQVE7b0JBQzNCLElBQUksVUFBVSxRQUFRLFFBQVE7b0JBQzlCLE9BQU8sU0FBUztvQkFDaEIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxHQUFHLG1DQUFtQyxZQUFNO29CQUN4QyxJQUFJLFVBQVUsY0FBYztvQkFDNUIsT0FBTyxRQUFRLFdBQVcsU0FBUyxZQUFZLFFBQVE7OztnQkFHM0QsR0FBRyxxQ0FBcUMsWUFBTTtvQkFDMUMsSUFBSSxVQUFVLGNBQWM7b0JBQzVCLE9BQU8sUUFBUSxXQUFXLFNBQVMsd0JBQXdCLFFBQVE7OztnQkFHdkUsR0FBRyx1REFBdUQsWUFBTTtvQkFDNUQsSUFBSSxVQUFVLGNBQWM7b0JBQzVCLE9BQU8sUUFBUSxPQUFPLFFBQVEsUUFBUTs7Ozs7R0FhM0MiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uQWN0aW9uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uQWN0aW9uRGlyZWN0aXZlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0IGVsZW1lbnREZWZpbml0aW9uID0gJzxzcC1jZXJ0aWZpY2F0aW9uLWFjdGlvbiBzcC1hY3Rpb249XCJ7eyBhY3Rpb24gfX1cIiAvPicsXHJcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJHJvb3RTY29wZSwgXyRjb21waWxlXykge1xyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGFjdGlvbikge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkc2NvcGUuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdpcyBoaWRkZW4gaWYgdGhlcmUgaXMgbm8gYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChudWxsKTtcclxuICAgICAgICBleHBlY3QoZWxlbWVudC5jaGlsZHJlbigpLmhhc0NsYXNzKCduZy1oaWRlJykpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgndXNlcyB0aGUgYWN0aW9uIGZvciB0aGUgQ1NTIGNsYXNzJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnSmFja3NvbicpO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50LmNoaWxkcmVuKCkuaGFzQ2xhc3MoJ2NlcnQtYWN0aW9uLUphY2tzb24nKSkudG9FcXVhbCh0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCd1c2VzIHRoZSBhY3Rpb24gdG8gY29uc3RydWN0IHRoZSBtZXNzYWdlIHRvIGRpc3BsYXknLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdOb3RXb3JkcycpO1xyXG4gICAgICAgIGV4cGVjdChlbGVtZW50LnRleHQoKS50cmltKCkpLnRvRXF1YWwoJ2NlcnRfYWN0aW9uX25vdF93b3JkcycpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
