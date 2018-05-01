System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('CertificationItemWarningsDirective', function () {

                var elementDefinition = '<sp-certification-item-warnings sp-item="item" />',
                    $scope = undefined,
                    $compile = undefined,
                    element = undefined,
                    item = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function ($rootScope, _$compile_, certificationTestData, CertificationItem) {
                    $scope = $rootScope.$new();
                    $compile = _$compile_;
                    item = new CertificationItem(angular.copy(certificationTestData.CERT_ITEMS[4]));
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createElement(item) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                it('throws without an item', function () {
                    item = null;
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });

                describe('previous decision messages', function () {
                    it('displays unremoved remediation message', function () {
                        createElement(item);
                        expect(element[0].innerText.trim()).toContain('ui_unremoved_remediation_decision');
                    });

                    it('displays approved not provisioned message', function () {
                        var approvedItem = angular.copy(item);
                        approvedItem.unremovedRemediation = false;
                        approvedItem.provisionAddsRequest = true;
                        createElement(approvedItem);

                        expect(element[0].innerText.trim()).toContain('ui_approved_not_provisioned_decision');
                    });

                    it('displays expired mitigation message', function () {
                        var mitigatedItem = angular.copy(item);
                        mitigatedItem.unremovedRemediation = false;
                        mitigatedItem.expiredMitigation = true;
                        createElement(mitigatedItem);

                        expect(element[0].innerText.trim()).toContain('ui_expired_mitigation_decision');
                    });
                });

                it('shows policy violations in a list if they are defined on the item', function () {
                    var newItem = angular.copy(item);
                    newItem.policyViolations = ['Violation 1', 'Violation 2'];
                    createElement(newItem);
                    var listItems = angular.element(element).find('ul.list-unstyled > li');
                    expect(listItems.length).toEqual(2);
                    expect(listItems[0].innerText.trim()).toContain('Violation 1');
                    expect(listItems[1].innerText.trim()).toContain('Violation 2');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkl0ZW1XYXJuaW5nc0RpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixzQ0FBc0MsVUFBVSxTQUFTO0lBQ2pHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQzs7UUFFNUQsU0FBUyxZQUFZOztZQUw3QixTQUFTLHNDQUFzQyxZQUFNOztnQkFFakQsSUFBSSxvQkFBaUI7b0JBQ2pCLFNBQU07b0JBQUUsV0FBUTtvQkFBRSxVQUFPO29CQUFFLE9BQUk7O2dCQUVuQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBQyxZQUFZLFlBQVksdUJBQXVCLG1CQUFzQjtvQkFDcEYsU0FBUyxXQUFXO29CQUNwQixXQUFXO29CQUNYLE9BQU8sSUFBSSxrQkFBa0IsUUFBUSxLQUFLLHNCQUFzQixXQUFXOzs7Z0JBRy9FLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUSxRQUFRLFNBQVM7Ozs7Z0JBSWpDLFNBQVMsY0FBYyxNQUFNO29CQUN6QixVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPO29CQUNkLFNBQVMsU0FBUztvQkFDbEIsT0FBTzs7O2dCQUdYLEdBQUcsMEJBQTBCLFlBQU07b0JBQy9CLE9BQU87b0JBQ1AsT0FBTyxZQUFBO3dCQVdTLE9BWEg7dUJBQWlCOzs7Z0JBR2xDLFNBQVMsOEJBQThCLFlBQU07b0JBQ3pDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLGNBQWM7d0JBQ2QsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFVBQVU7OztvQkFHbEQsR0FBRyw2Q0FBNkMsWUFBTTt3QkFDbEQsSUFBSSxlQUFlLFFBQVEsS0FBSzt3QkFDaEMsYUFBYSx1QkFBdUI7d0JBQ3BDLGFBQWEsdUJBQXVCO3dCQUNwQyxjQUFjOzt3QkFFZCxPQUFPLFFBQVEsR0FBRyxVQUFVLFFBQVEsVUFBVTs7O29CQUdsRCxHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxJQUFJLGdCQUFnQixRQUFRLEtBQUs7d0JBQ2pDLGNBQWMsdUJBQXVCO3dCQUNyQyxjQUFjLG9CQUFvQjt3QkFDbEMsY0FBYzs7d0JBRWQsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFVBQVU7Ozs7Z0JBSXRELEdBQUcscUVBQXFFLFlBQU07b0JBQzFFLElBQUksVUFBVSxRQUFRLEtBQUs7b0JBQzNCLFFBQVEsbUJBQW1CLENBQUMsZUFBZTtvQkFDM0MsY0FBYztvQkFDZCxJQUFJLFlBQVksUUFBUSxRQUFRLFNBQVMsS0FBSztvQkFDOUMsT0FBTyxVQUFVLFFBQVEsUUFBUTtvQkFDakMsT0FBTyxVQUFVLEdBQUcsVUFBVSxRQUFRLFVBQVU7b0JBQ2hELE9BQU8sVUFBVSxHQUFHLFVBQVUsUUFBUSxVQUFVOzs7OztHQWlCckQiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uSXRlbVdhcm5pbmdzRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuXHJcbmRlc2NyaWJlKCdDZXJ0aWZpY2F0aW9uSXRlbVdhcm5pbmdzRGlyZWN0aXZlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9IGA8c3AtY2VydGlmaWNhdGlvbi1pdGVtLXdhcm5pbmdzIHNwLWl0ZW09XCJpdGVtXCIgLz5gLFxyXG4gICAgICAgICRzY29wZSwgJGNvbXBpbGUsIGVsZW1lbnQsIGl0ZW07XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkcm9vdFNjb3BlLCBfJGNvbXBpbGVfLCBjZXJ0aWZpY2F0aW9uVGVzdERhdGEsIENlcnRpZmljYXRpb25JdGVtKSA9PiB7XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xyXG4gICAgICAgIGl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzRdKSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmaW5pdGlvbik7XHJcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgICRjb21waWxlKGVsZW1lbnQpKCRzY29wZSk7XHJcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBhbiBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgIGl0ZW0gPSBudWxsO1xyXG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KCkpLnRvVGhyb3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdwcmV2aW91cyBkZWNpc2lvbiBtZXNzYWdlcycsICgpID0+IHtcclxuICAgICAgICBpdCgnZGlzcGxheXMgdW5yZW1vdmVkIHJlbWVkaWF0aW9uIG1lc3NhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbigndWlfdW5yZW1vdmVkX3JlbWVkaWF0aW9uX2RlY2lzaW9uJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkaXNwbGF5cyBhcHByb3ZlZCBub3QgcHJvdmlzaW9uZWQgbWVzc2FnZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFwcHJvdmVkSXRlbSA9IGFuZ3VsYXIuY29weShpdGVtKTtcclxuICAgICAgICAgICAgYXBwcm92ZWRJdGVtLnVucmVtb3ZlZFJlbWVkaWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFwcHJvdmVkSXRlbS5wcm92aXNpb25BZGRzUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoYXBwcm92ZWRJdGVtKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbigndWlfYXBwcm92ZWRfbm90X3Byb3Zpc2lvbmVkX2RlY2lzaW9uJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkaXNwbGF5cyBleHBpcmVkIG1pdGlnYXRpb24gbWVzc2FnZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1pdGlnYXRlZEl0ZW0gPSBhbmd1bGFyLmNvcHkoaXRlbSk7XHJcbiAgICAgICAgICAgIG1pdGlnYXRlZEl0ZW0udW5yZW1vdmVkUmVtZWRpYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgbWl0aWdhdGVkSXRlbS5leHBpcmVkTWl0aWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQobWl0aWdhdGVkSXRlbSk7XHJcblxyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudFswXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ3VpX2V4cGlyZWRfbWl0aWdhdGlvbl9kZWNpc2lvbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3dzIHBvbGljeSB2aW9sYXRpb25zIGluIGEgbGlzdCBpZiB0aGV5IGFyZSBkZWZpbmVkIG9uIHRoZSBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBuZXdJdGVtID0gYW5ndWxhci5jb3B5KGl0ZW0pO1xyXG4gICAgICAgIG5ld0l0ZW0ucG9saWN5VmlvbGF0aW9ucyA9IFsnVmlvbGF0aW9uIDEnLCAnVmlvbGF0aW9uIDInXTtcclxuICAgICAgICBjcmVhdGVFbGVtZW50KG5ld0l0ZW0pO1xyXG4gICAgICAgIGxldCBsaXN0SXRlbXMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgndWwubGlzdC11bnN0eWxlZCA+IGxpJyk7XHJcbiAgICAgICAgZXhwZWN0KGxpc3RJdGVtcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgZXhwZWN0KGxpc3RJdGVtc1swXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ1Zpb2xhdGlvbiAxJyk7XHJcbiAgICAgICAgZXhwZWN0KGxpc3RJdGVtc1sxXS5pbm5lclRleHQudHJpbSgpKS50b0NvbnRhaW4oJ1Zpb2xhdGlvbiAyJyk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
