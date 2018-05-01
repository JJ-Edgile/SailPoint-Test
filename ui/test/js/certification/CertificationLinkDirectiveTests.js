System.register(['certification/CertificationModule', 'test/js/TestInitializer'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}],
        execute: function () {

            describe('spCertificationLink', function () {

                var elementDefinition = '<sp-certification-link sp-model="certification" />',
                    $scope = undefined,
                    $compile = undefined,
                    element = undefined;

                beforeEach(module(certificationModule));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                beforeEach(module(function ($locationProvider) {
                    $locationProvider.hashPrefix('');
                }));

                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                }));

                function createElement(certification) {
                    element = angular.element(elementDefinition);
                    $scope.certification = certification;
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                it('throws if no certification object is provided', function () {
                    expect(function () {
                        createElement();
                    }).toThrow();
                });

                it('creates correct anchor element with certification name and id', function () {
                    var certification = {
                        id: 'thecertid',
                        name: 'thecertname'
                    };

                    element = createElement(certification);
                    expect(element[0].innerText.trim()).toEqual(certification.name);

                    var anchorEl = element.find('a');
                    expect(anchorEl.attr('href')).toEqual('#/certification/' + certification.id);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkxpbmtEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQyxxQ0FBcUMsNEJBQTRCLFVBQVUsU0FBUzs7Ozs7SUFLakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQ0FBbUM7WUFDbkQsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsdUJBQXVCLFlBQU07O2dCQUVsQyxJQUFJLG9CQUFvQjtvQkFDcEIsU0FBTTtvQkFBRSxXQUFRO29CQUFFLFVBQU87O2dCQUU3QixXQUFXLE9BQU87O2dCQUVsQixVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFdBQVcsT0FBTyxVQUFDLG1CQUFzQjtvQkFDckMsa0JBQWtCLFdBQVc7OztnQkFHakMsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZO29CQUNqRCxTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7OztnQkFJZixTQUFTLGNBQWMsZUFBZTtvQkFDbEMsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLE9BQU8sZ0JBQWdCO29CQUN2QixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLEdBQUcsaURBQWlELFlBQU07b0JBQ3RELE9BQU8sWUFBTTt3QkFDVDt1QkFDRDs7O2dCQUdQLEdBQUcsaUVBQWlFLFlBQU07b0JBQ3RFLElBQUksZ0JBQWdCO3dCQUNqQixJQUFJO3dCQUNILE1BQU07OztvQkFHVixVQUFVLGNBQWM7b0JBQ3hCLE9BQU8sUUFBUSxHQUFHLFVBQVUsUUFBUSxRQUFRLGNBQWM7O29CQUUxRCxJQUFJLFdBQVcsUUFBUSxLQUFLO29CQUM1QixPQUFPLFNBQVMsS0FBSyxTQUFTLFFBQU8scUJBQW9CLGNBQWM7Ozs7O0dBYTVFIiwiZmlsZSI6ImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkxpbmtEaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuXG5kZXNjcmliZSgnc3BDZXJ0aWZpY2F0aW9uTGluaycsICgpID0+IHtcblxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9ICc8c3AtY2VydGlmaWNhdGlvbi1saW5rIHNwLW1vZGVsPVwiY2VydGlmaWNhdGlvblwiIC8+JyxcbiAgICAgICAgJHNjb3BlLCAkY29tcGlsZSwgZWxlbWVudDtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZSgoJGxvY2F0aW9uUHJvdmlkZXIpID0+IHtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcblxuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoY2VydGlmaWNhdGlvbikge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJHNjb3BlLmNlcnRpZmljYXRpb24gPSBjZXJ0aWZpY2F0aW9uO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGl0KCd0aHJvd3MgaWYgbm8gY2VydGlmaWNhdGlvbiBvYmplY3QgaXMgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdjcmVhdGVzIGNvcnJlY3QgYW5jaG9yIGVsZW1lbnQgd2l0aCBjZXJ0aWZpY2F0aW9uIG5hbWUgYW5kIGlkJywgKCkgPT4ge1xuICAgICAgICBsZXQgY2VydGlmaWNhdGlvbiA9IHtcbiAgICAgICAgICAgaWQ6ICd0aGVjZXJ0aWQnLFxuICAgICAgICAgICAgbmFtZTogJ3RoZWNlcnRuYW1lJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KGNlcnRpZmljYXRpb24pO1xuICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKGNlcnRpZmljYXRpb24ubmFtZSk7XG5cbiAgICAgICAgbGV0IGFuY2hvckVsID0gZWxlbWVudC5maW5kKCdhJyk7XG4gICAgICAgIGV4cGVjdChhbmNob3JFbC5hdHRyKCdocmVmJykpLnRvRXF1YWwoYCMvY2VydGlmaWNhdGlvbi8ke2NlcnRpZmljYXRpb24uaWR9YCk7XG4gICAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
