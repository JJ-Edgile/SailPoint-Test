System.register(['test/js/TestInitializer', 'certification/CertificationModule', 'test/js/certification/IdentityDifferenceTestData'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsCertificationIdentityDifferenceTestData) {}],
        execute: function () {

            describe('CertificationDifferenceCategoryDirective', function () {

                var title = 'Fuggettaboutit!',
                    appHeader = 'Mafioso',
                    attrHeader = 'Wise Guys',
                    valueHeader = 'Da Guy',
                    eltDef = '<sp-certification-difference-category\n               sp-differences="diffs"\n               sp-title="' + title + '"\n               sp-application-header="' + appHeader + '"\n               sp-attribute-header="' + attrHeader + '"\n               sp-value-header="' + valueHeader + '">\n             </sp-certification-difference-category>',
                    noAppEltDef = '<sp-certification-difference-category\n               sp-differences="diffs"\n               sp-title="' + title + '"\n               sp-attribute-header="' + attrHeader + '"\n               sp-value-header="' + valueHeader + '">\n             </sp-certification-difference-category>',
                    noAttrEltDef = '<sp-certification-difference-category\n               sp-differences="diffs"\n               sp-title="' + title + '"\n               sp-application-header="' + appHeader + '"\n               sp-value-header="' + valueHeader + '">\n             </sp-certification-difference-category>',
                    noValueEltDef = '<sp-certification-difference-category\n               sp-differences="diffs"\n               sp-title="' + title + '"\n               sp-application-header="' + appHeader + '"\n               sp-attribute-header="' + attrHeader + '">\n             </sp-certification-difference-category>';

                var element = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    identityDiff = undefined,
                    diffs = undefined,
                    IdentityDifference = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_$compile_, $rootScope, _IdentityDifference_, identityDifferenceTestData) {
                    $compile = _$compile_;
                    IdentityDifference = _IdentityDifference_;

                    $scope = $rootScope.$new();

                    identityDiff = new IdentityDifference(identityDifferenceTestData.DIFFERENCE);
                    diffs = identityDiff.assignedRoleDifferences;
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function compile() {
                    var def = arguments.length <= 0 || arguments[0] === undefined ? eltDef : arguments[0];

                    element = angular.element(def);

                    $scope.title = title;
                    $scope.diffs = diffs;

                    $compile(element)($scope);
                    $scope.$digest();
                }

                it('renders the correct title', function () {
                    compile();
                    var titleEl = element.find('p.h4');
                    expect(titleEl.text().trim()).toEqual(title);
                });

                function getHeaders() {
                    return element.find('th');
                }

                function findHeader(name) {
                    var headers = element.find('th:contains(\'' + name + '\')');
                    return headers.length > 0 ? headers : null;
                }

                it('hides the application column if not configured', function () {
                    compile(noAppEltDef);
                    expect(getHeaders().length).toEqual(3);
                    expect(findHeader(appHeader)).toBeNull();
                    expect(findHeader(attrHeader)).not.toBeNull();
                    expect(findHeader(valueHeader)).not.toBeNull();
                });

                it('hides the attribute column if not configured', function () {
                    compile(noAttrEltDef);
                    expect(getHeaders().length).toEqual(3);
                    expect(findHeader(appHeader)).not.toBeNull();
                    expect(findHeader(attrHeader)).toBeNull();
                    expect(findHeader(valueHeader)).not.toBeNull();
                });

                it('renders the configured application and attribute column headers', function () {
                    compile();
                    expect(getHeaders().length).toEqual(4);
                    expect(findHeader(appHeader)).not.toBeNull();
                    expect(findHeader(attrHeader)).not.toBeNull();
                });

                it('renders the value column header correctly if configured', function () {
                    compile();
                    expect(getHeaders().length).toEqual(4);
                    expect(findHeader(valueHeader)).not.toBeNull();
                });

                it('defaults the value column header correctly if not configured', function () {
                    compile(noValueEltDef);
                    expect(getHeaders().length).toEqual(4);
                    expect(findHeader('ui_difference_value_header')).not.toBeNull();
                });

                function getRows() {
                    return element.find('table > tbody > tr');
                }

                function getColumnValue(colIdx) {
                    var rows = angular.element(getRows()[0]);
                    var cols = rows.find('td');
                    return angular.element(cols[colIdx]).text().trim();
                }

                it('renders one row per difference', function () {
                    diffs = identityDiff.linkDifferences;
                    compile();
                    expect(getRows().length).toEqual(2);
                });

                it('renders the correct application and attribute', function () {
                    compile();
                    expect(getColumnValue(0)).toEqual(diffs[0].application);
                    expect(getColumnValue(1)).toEqual(diffs[0].attribute);
                });

                it('renders the old value if value was removed', function () {
                    compile();
                    expect(getColumnValue(2)).toEqual(diffs[0].oldValue);
                });

                it('renders the new value if value was added', function () {
                    diffs = identityDiff.detectedRoleDifferences;
                    compile();
                    expect(getColumnValue(2)).toEqual(diffs[0].newValue);
                });

                it('renders both the old and new values if value was modified', function () {
                    diffs = identityDiff.attributeDifferences;
                    // The CertificationDifferenceDirective fills in the changeType usually ... we'll fill it in manually.
                    diffs[0].changeType = IdentityDifference.ChangeType.Modified;
                    compile();
                    expect(getColumnValue(2)).toEqual('baller@example.com -> shotcaller@example.com');
                });

                it('displays the correct change type', function () {
                    diffs[0].changeType = IdentityDifference.ChangeType.Removed;
                    compile();
                    expect(getColumnValue(3)).toEqual('ui_difference_removed');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRpZmZlcmVuY2VDYXRlZ29yeURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMscURBQXFELFVBQVUsU0FBUztJQUNySjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUNBQW1DO1lBQ3pGLHNCQUFzQixrQ0FBa0M7V0FDekQsVUFBVSxnREFBZ0Q7UUFDN0QsU0FBUyxZQUFZOztZQUo3QixTQUFTLDRDQUE0QyxZQUFNOztnQkFFdkQsSUFBSSxRQUFRO29CQUNSLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixjQUFjO29CQUNkLFNBQU0sNEdBR2EsUUFBSyw4Q0FDUSxZQUFTLDRDQUNYLGFBQVUsd0NBQ2QsY0FBVztvQkFFckMsY0FBVyw0R0FHUSxRQUFLLDRDQUNNLGFBQVUsd0NBQ2QsY0FBVztvQkFFckMsZUFBWSw0R0FHTyxRQUFLLDhDQUNRLFlBQVMsd0NBQ2YsY0FBVztvQkFFckMsZ0JBQWEsNEdBR00sUUFBSyw4Q0FDUSxZQUFTLDRDQUNYLGFBQVU7O2dCQUc1QyxJQUFJLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxTQUFNO29CQUFFLGVBQVk7b0JBQUUsUUFBSztvQkFBRSxxQkFBa0I7O2dCQUV0RSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVksc0JBQXNCLDRCQUErQjtvQkFDNUYsV0FBVztvQkFDWCxxQkFBcUI7O29CQUVyQixTQUFTLFdBQVc7O29CQUVwQixlQUFlLElBQUksbUJBQW1CLDJCQUEyQjtvQkFDakUsUUFBUSxhQUFhOzs7Z0JBR3pCLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUTs7OztnQkFJaEIsU0FBUyxVQUFzQjtvQkFiZixJQWFDLE1BQUcsVUFBQSxVQUFBLEtBQUEsVUFBQSxPQUFBLFlBQUcsU0FBTSxVQUFBOztvQkFDekIsVUFBVSxRQUFRLFFBQVE7O29CQUUxQixPQUFPLFFBQVE7b0JBQ2YsT0FBTyxRQUFROztvQkFFZixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxHQUFHLDZCQUE2QixZQUFNO29CQUNsQztvQkFDQSxJQUFJLFVBQVUsUUFBUSxLQUFLO29CQUMzQixPQUFPLFFBQVEsT0FBTyxRQUFRLFFBQVE7OztnQkFHMUMsU0FBUyxhQUFhO29CQUNsQixPQUFPLFFBQVEsS0FBSzs7O2dCQUd4QixTQUFTLFdBQVcsTUFBTTtvQkFDdEIsSUFBSSxVQUFVLFFBQVEsS0FBSSxtQkFBaUIsT0FBSTtvQkFDL0MsT0FBTyxRQUFTLFNBQVMsSUFBSyxVQUFVOzs7Z0JBRzVDLEdBQUcsa0RBQWtELFlBQU07b0JBQ3ZELFFBQVE7b0JBQ1IsT0FBTyxhQUFhLFFBQVEsUUFBUTtvQkFDcEMsT0FBTyxXQUFXLFlBQVk7b0JBQzlCLE9BQU8sV0FBVyxhQUFhLElBQUk7b0JBQ25DLE9BQU8sV0FBVyxjQUFjLElBQUk7OztnQkFHeEMsR0FBRyxnREFBZ0QsWUFBTTtvQkFDckQsUUFBUTtvQkFDUixPQUFPLGFBQWEsUUFBUSxRQUFRO29CQUNwQyxPQUFPLFdBQVcsWUFBWSxJQUFJO29CQUNsQyxPQUFPLFdBQVcsYUFBYTtvQkFDL0IsT0FBTyxXQUFXLGNBQWMsSUFBSTs7O2dCQUd4QyxHQUFHLG1FQUFtRSxZQUFNO29CQUN4RTtvQkFDQSxPQUFPLGFBQWEsUUFBUSxRQUFRO29CQUNwQyxPQUFPLFdBQVcsWUFBWSxJQUFJO29CQUNsQyxPQUFPLFdBQVcsYUFBYSxJQUFJOzs7Z0JBR3ZDLEdBQUcsMkRBQTJELFlBQU07b0JBQ2hFO29CQUNBLE9BQU8sYUFBYSxRQUFRLFFBQVE7b0JBQ3BDLE9BQU8sV0FBVyxjQUFjLElBQUk7OztnQkFHeEMsR0FBRyxnRUFBZ0UsWUFBTTtvQkFDckUsUUFBUTtvQkFDUixPQUFPLGFBQWEsUUFBUSxRQUFRO29CQUNwQyxPQUFPLFdBQVcsK0JBQStCLElBQUk7OztnQkFHekQsU0FBUyxVQUFVO29CQUNmLE9BQU8sUUFBUSxLQUFLOzs7Z0JBR3hCLFNBQVMsZUFBZSxRQUFRO29CQUM1QixJQUFJLE9BQU8sUUFBUSxRQUFRLFVBQVU7b0JBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUs7b0JBQ3JCLE9BQU8sUUFBUSxRQUFRLEtBQUssU0FBUyxPQUFPOzs7Z0JBR2hELEdBQUcsa0NBQWtDLFlBQU07b0JBQ3ZDLFFBQVEsYUFBYTtvQkFDckI7b0JBQ0EsT0FBTyxVQUFVLFFBQVEsUUFBUTs7O2dCQUdyQyxHQUFHLGlEQUFpRCxZQUFNO29CQUN0RDtvQkFDQSxPQUFPLGVBQWUsSUFBSSxRQUFRLE1BQU0sR0FBRztvQkFDM0MsT0FBTyxlQUFlLElBQUksUUFBUSxNQUFNLEdBQUc7OztnQkFHL0MsR0FBRyw4Q0FBOEMsWUFBTTtvQkFDbkQ7b0JBQ0EsT0FBTyxlQUFlLElBQUksUUFBUSxNQUFNLEdBQUc7OztnQkFHL0MsR0FBRyw0Q0FBNEMsWUFBTTtvQkFDakQsUUFBUSxhQUFhO29CQUNyQjtvQkFDQSxPQUFPLGVBQWUsSUFBSSxRQUFRLE1BQU0sR0FBRzs7O2dCQUcvQyxHQUFHLDZEQUE2RCxZQUFNO29CQUNsRSxRQUFRLGFBQWE7O29CQUVyQixNQUFNLEdBQUcsYUFBYSxtQkFBbUIsV0FBVztvQkFDcEQ7b0JBQ0EsT0FBTyxlQUFlLElBQUksUUFBUTs7O2dCQUd0QyxHQUFHLG9DQUFvQyxZQUFNO29CQUN6QyxNQUFNLEdBQUcsYUFBYSxtQkFBbUIsV0FBVztvQkFDcEQ7b0JBQ0EsT0FBTyxlQUFlLElBQUksUUFBUTs7Ozs7R0FQdkMiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRGlmZmVyZW5jZUNhdGVnb3J5RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL2NlcnRpZmljYXRpb24vSWRlbnRpdHlEaWZmZXJlbmNlVGVzdERhdGEnO1xyXG5cclxuZGVzY3JpYmUoJ0NlcnRpZmljYXRpb25EaWZmZXJlbmNlQ2F0ZWdvcnlEaXJlY3RpdmUnLCAoKSA9PiB7XHJcblxyXG4gICAgbGV0IHRpdGxlID0gJ0Z1Z2dldHRhYm91dGl0IScsXHJcbiAgICAgICAgYXBwSGVhZGVyID0gJ01hZmlvc28nLFxyXG4gICAgICAgIGF0dHJIZWFkZXIgPSAnV2lzZSBHdXlzJyxcclxuICAgICAgICB2YWx1ZUhlYWRlciA9ICdEYSBHdXknLFxyXG4gICAgICAgIGVsdERlZiA9XHJcbiAgICAgICAgICAgIGA8c3AtY2VydGlmaWNhdGlvbi1kaWZmZXJlbmNlLWNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgIHNwLWRpZmZlcmVuY2VzPVwiZGlmZnNcIlxyXG4gICAgICAgICAgICAgICBzcC10aXRsZT1cIiR7dGl0bGV9XCJcclxuICAgICAgICAgICAgICAgc3AtYXBwbGljYXRpb24taGVhZGVyPVwiJHthcHBIZWFkZXJ9XCJcclxuICAgICAgICAgICAgICAgc3AtYXR0cmlidXRlLWhlYWRlcj1cIiR7YXR0ckhlYWRlcn1cIlxyXG4gICAgICAgICAgICAgICBzcC12YWx1ZS1oZWFkZXI9XCIke3ZhbHVlSGVhZGVyfVwiPlxyXG4gICAgICAgICAgICAgPC9zcC1jZXJ0aWZpY2F0aW9uLWRpZmZlcmVuY2UtY2F0ZWdvcnk+YCxcclxuICAgICAgICBub0FwcEVsdERlZiA9XHJcbiAgICAgICAgICAgIGA8c3AtY2VydGlmaWNhdGlvbi1kaWZmZXJlbmNlLWNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgIHNwLWRpZmZlcmVuY2VzPVwiZGlmZnNcIlxyXG4gICAgICAgICAgICAgICBzcC10aXRsZT1cIiR7dGl0bGV9XCJcclxuICAgICAgICAgICAgICAgc3AtYXR0cmlidXRlLWhlYWRlcj1cIiR7YXR0ckhlYWRlcn1cIlxyXG4gICAgICAgICAgICAgICBzcC12YWx1ZS1oZWFkZXI9XCIke3ZhbHVlSGVhZGVyfVwiPlxyXG4gICAgICAgICAgICAgPC9zcC1jZXJ0aWZpY2F0aW9uLWRpZmZlcmVuY2UtY2F0ZWdvcnk+YCxcclxuICAgICAgICBub0F0dHJFbHREZWYgPVxyXG4gICAgICAgICAgICBgPHNwLWNlcnRpZmljYXRpb24tZGlmZmVyZW5jZS1jYXRlZ29yeVxyXG4gICAgICAgICAgICAgICBzcC1kaWZmZXJlbmNlcz1cImRpZmZzXCJcclxuICAgICAgICAgICAgICAgc3AtdGl0bGU9XCIke3RpdGxlfVwiXHJcbiAgICAgICAgICAgICAgIHNwLWFwcGxpY2F0aW9uLWhlYWRlcj1cIiR7YXBwSGVhZGVyfVwiXHJcbiAgICAgICAgICAgICAgIHNwLXZhbHVlLWhlYWRlcj1cIiR7dmFsdWVIZWFkZXJ9XCI+XHJcbiAgICAgICAgICAgICA8L3NwLWNlcnRpZmljYXRpb24tZGlmZmVyZW5jZS1jYXRlZ29yeT5gLFxyXG4gICAgICAgIG5vVmFsdWVFbHREZWYgPVxyXG4gICAgICAgICAgICBgPHNwLWNlcnRpZmljYXRpb24tZGlmZmVyZW5jZS1jYXRlZ29yeVxyXG4gICAgICAgICAgICAgICBzcC1kaWZmZXJlbmNlcz1cImRpZmZzXCJcclxuICAgICAgICAgICAgICAgc3AtdGl0bGU9XCIke3RpdGxlfVwiXHJcbiAgICAgICAgICAgICAgIHNwLWFwcGxpY2F0aW9uLWhlYWRlcj1cIiR7YXBwSGVhZGVyfVwiXHJcbiAgICAgICAgICAgICAgIHNwLWF0dHJpYnV0ZS1oZWFkZXI9XCIke2F0dHJIZWFkZXJ9XCI+XHJcbiAgICAgICAgICAgICA8L3NwLWNlcnRpZmljYXRpb24tZGlmZmVyZW5jZS1jYXRlZ29yeT5gO1xyXG5cclxuICAgIGxldCBlbGVtZW50LCAkY29tcGlsZSwgJHNjb3BlLCBpZGVudGl0eURpZmYsIGRpZmZzLCBJZGVudGl0eURpZmZlcmVuY2U7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfJGNvbXBpbGVfLCAkcm9vdFNjb3BlLCBfSWRlbnRpdHlEaWZmZXJlbmNlXywgaWRlbnRpdHlEaWZmZXJlbmNlVGVzdERhdGEpID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgSWRlbnRpdHlEaWZmZXJlbmNlID0gX0lkZW50aXR5RGlmZmVyZW5jZV87XHJcblxyXG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBpZGVudGl0eURpZmYgPSBuZXcgSWRlbnRpdHlEaWZmZXJlbmNlKGlkZW50aXR5RGlmZmVyZW5jZVRlc3REYXRhLkRJRkZFUkVOQ0UpO1xyXG4gICAgICAgIGRpZmZzID0gaWRlbnRpdHlEaWZmLmFzc2lnbmVkUm9sZURpZmZlcmVuY2VzO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlKGRlZiA9IGVsdERlZikge1xyXG4gICAgICAgIGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoZGVmKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgJHNjb3BlLmRpZmZzID0gZGlmZnM7XHJcblxyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgY29ycmVjdCB0aXRsZScsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgbGV0IHRpdGxlRWwgPSBlbGVtZW50LmZpbmQoJ3AuaDQnKTtcclxuICAgICAgICBleHBlY3QodGl0bGVFbC50ZXh0KCkudHJpbSgpKS50b0VxdWFsKHRpdGxlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEhlYWRlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZmluZCgndGgnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kSGVhZGVyKG5hbWUpIHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IGVsZW1lbnQuZmluZChgdGg6Y29udGFpbnMoJyR7bmFtZX0nKWApO1xyXG4gICAgICAgIHJldHVybiAoaGVhZGVycy5sZW5ndGggPiAwKSA/IGhlYWRlcnMgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCdoaWRlcyB0aGUgYXBwbGljYXRpb24gY29sdW1uIGlmIG5vdCBjb25maWd1cmVkJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbXBpbGUobm9BcHBFbHREZWYpO1xyXG4gICAgICAgIGV4cGVjdChnZXRIZWFkZXJzKCkubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgIGV4cGVjdChmaW5kSGVhZGVyKGFwcEhlYWRlcikpLnRvQmVOdWxsKCk7XHJcbiAgICAgICAgZXhwZWN0KGZpbmRIZWFkZXIoYXR0ckhlYWRlcikpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIGV4cGVjdChmaW5kSGVhZGVyKHZhbHVlSGVhZGVyKSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnaGlkZXMgdGhlIGF0dHJpYnV0ZSBjb2x1bW4gaWYgbm90IGNvbmZpZ3VyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZShub0F0dHJFbHREZWYpO1xyXG4gICAgICAgIGV4cGVjdChnZXRIZWFkZXJzKCkubGVuZ3RoKS50b0VxdWFsKDMpO1xyXG4gICAgICAgIGV4cGVjdChmaW5kSGVhZGVyKGFwcEhlYWRlcikpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIGV4cGVjdChmaW5kSGVhZGVyKGF0dHJIZWFkZXIpKS50b0JlTnVsbCgpO1xyXG4gICAgICAgIGV4cGVjdChmaW5kSGVhZGVyKHZhbHVlSGVhZGVyKSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgY29uZmlndXJlZCBhcHBsaWNhdGlvbiBhbmQgYXR0cmlidXRlIGNvbHVtbiBoZWFkZXJzJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBleHBlY3QoZ2V0SGVhZGVycygpLmxlbmd0aCkudG9FcXVhbCg0KTtcclxuICAgICAgICBleHBlY3QoZmluZEhlYWRlcihhcHBIZWFkZXIpKS5ub3QudG9CZU51bGwoKTtcclxuICAgICAgICBleHBlY3QoZmluZEhlYWRlcihhdHRySGVhZGVyKSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgdmFsdWUgY29sdW1uIGhlYWRlciBjb3JyZWN0bHkgaWYgY29uZmlndXJlZCcsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgZXhwZWN0KGdldEhlYWRlcnMoKS5sZW5ndGgpLnRvRXF1YWwoNCk7XHJcbiAgICAgICAgZXhwZWN0KGZpbmRIZWFkZXIodmFsdWVIZWFkZXIpKS5ub3QudG9CZU51bGwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdkZWZhdWx0cyB0aGUgdmFsdWUgY29sdW1uIGhlYWRlciBjb3JyZWN0bHkgaWYgbm90IGNvbmZpZ3VyZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZShub1ZhbHVlRWx0RGVmKTtcclxuICAgICAgICBleHBlY3QoZ2V0SGVhZGVycygpLmxlbmd0aCkudG9FcXVhbCg0KTtcclxuICAgICAgICBleHBlY3QoZmluZEhlYWRlcigndWlfZGlmZmVyZW5jZV92YWx1ZV9oZWFkZXInKSkubm90LnRvQmVOdWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRSb3dzKCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJ3RhYmxlID4gdGJvZHkgPiB0cicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbHVtblZhbHVlKGNvbElkeCkge1xyXG4gICAgICAgIGxldCByb3dzID0gYW5ndWxhci5lbGVtZW50KGdldFJvd3MoKVswXSk7XHJcbiAgICAgICAgbGV0IGNvbHMgPSByb3dzLmZpbmQoJ3RkJyk7XHJcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudChjb2xzW2NvbElkeF0pLnRleHQoKS50cmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgb25lIHJvdyBwZXIgZGlmZmVyZW5jZScsICgpID0+IHtcclxuICAgICAgICBkaWZmcyA9IGlkZW50aXR5RGlmZi5saW5rRGlmZmVyZW5jZXM7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChnZXRSb3dzKCkubGVuZ3RoKS50b0VxdWFsKDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3JlbmRlcnMgdGhlIGNvcnJlY3QgYXBwbGljYXRpb24gYW5kIGF0dHJpYnV0ZScsICgpID0+IHtcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgZXhwZWN0KGdldENvbHVtblZhbHVlKDApKS50b0VxdWFsKGRpZmZzWzBdLmFwcGxpY2F0aW9uKTtcclxuICAgICAgICBleHBlY3QoZ2V0Q29sdW1uVmFsdWUoMSkpLnRvRXF1YWwoZGlmZnNbMF0uYXR0cmlidXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW5kZXJzIHRoZSBvbGQgdmFsdWUgaWYgdmFsdWUgd2FzIHJlbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChnZXRDb2x1bW5WYWx1ZSgyKSkudG9FcXVhbChkaWZmc1swXS5vbGRWYWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgncmVuZGVycyB0aGUgbmV3IHZhbHVlIGlmIHZhbHVlIHdhcyBhZGRlZCcsICgpID0+IHtcclxuICAgICAgICBkaWZmcyA9IGlkZW50aXR5RGlmZi5kZXRlY3RlZFJvbGVEaWZmZXJlbmNlcztcclxuICAgICAgICBjb21waWxlKCk7XHJcbiAgICAgICAgZXhwZWN0KGdldENvbHVtblZhbHVlKDIpKS50b0VxdWFsKGRpZmZzWzBdLm5ld1ZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdyZW5kZXJzIGJvdGggdGhlIG9sZCBhbmQgbmV3IHZhbHVlcyBpZiB2YWx1ZSB3YXMgbW9kaWZpZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgZGlmZnMgPSBpZGVudGl0eURpZmYuYXR0cmlidXRlRGlmZmVyZW5jZXM7XHJcbiAgICAgICAgLy8gVGhlIENlcnRpZmljYXRpb25EaWZmZXJlbmNlRGlyZWN0aXZlIGZpbGxzIGluIHRoZSBjaGFuZ2VUeXBlIHVzdWFsbHkgLi4uIHdlJ2xsIGZpbGwgaXQgaW4gbWFudWFsbHkuXHJcbiAgICAgICAgZGlmZnNbMF0uY2hhbmdlVHlwZSA9IElkZW50aXR5RGlmZmVyZW5jZS5DaGFuZ2VUeXBlLk1vZGlmaWVkO1xyXG4gICAgICAgIGNvbXBpbGUoKTtcclxuICAgICAgICBleHBlY3QoZ2V0Q29sdW1uVmFsdWUoMikpLnRvRXF1YWwoJ2JhbGxlckBleGFtcGxlLmNvbSAtPiBzaG90Y2FsbGVyQGV4YW1wbGUuY29tJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnZGlzcGxheXMgdGhlIGNvcnJlY3QgY2hhbmdlIHR5cGUnLCAoKSA9PiB7XHJcbiAgICAgICAgZGlmZnNbMF0uY2hhbmdlVHlwZSA9IElkZW50aXR5RGlmZmVyZW5jZS5DaGFuZ2VUeXBlLlJlbW92ZWQ7XHJcbiAgICAgICAgY29tcGlsZSgpO1xyXG4gICAgICAgIGV4cGVjdChnZXRDb2x1bW5WYWx1ZSgzKSkudG9FcXVhbCgndWlfZGlmZmVyZW5jZV9yZW1vdmVkJyk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
