System.register(['test/js/TestInitializer', 'certification/CertificationModule'], function (_export) {
    'use strict';

    var certificationModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }],
        execute: function () {

            describe('RoleSnapshotDetailColumnDirective', function () {

                var elementDefinition = '<sp-role-snapshot-detail-column sp-model="item" sp-column-config="columnConfig"/>',
                    element = undefined,
                    $compile = undefined,
                    $scope = undefined,
                    certificationEntityService = undefined,
                    certificationTestData = undefined,
                    item = undefined,
                    ColumnConfig = undefined,
                    columnConfig = undefined,
                    $q = undefined,
                    certificationDataService = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$compile_, $rootScope, _$q_, _certificationEntityService_, _certificationTestData_, _ColumnConfig_, _certificationDataService_) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    $q = _$q_;
                    certificationEntityService = _certificationEntityService_;
                    certificationTestData = _certificationTestData_;
                    certificationDataService = _certificationDataService_;
                    item = certificationTestData.CERT_ITEMS[1];
                    ColumnConfig = _ColumnConfig_;
                    columnConfig = new ColumnConfig({
                        dataIndex: 'dataInx1',
                        label: 'TestConfig'
                    });
                    spyOn(certificationEntityService, 'showRoleSnapshotDetailDialog').and.returnValue($q.when());
                    spyOn(certificationDataService, 'getCertification').and.callFake(function () {
                        return { id: '12' };
                    });
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                function click() {
                    var anchors = element.find('a');
                    angular.element(anchors).click();
                }

                function createElement(item, columnConfig) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $scope.columnConfig = columnConfig;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                describe('showRoleSnapshotDetailDialog', function () {
                    it('calls certificationEntityService showRoleSnapshotDetailDialog', function () {
                        createElement(item, columnConfig);
                        click();
                        expect(certificationEntityService.showRoleSnapshotDetailDialog).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vUm9sZVNuYXBzaG90RGV0YWlsQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHNDQUFzQyxVQUFVLFNBQVM7SUFDakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1DQUFtQztZQUN6RixzQkFBc0Isa0NBQWtDOztRQUU1RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMscUNBQXFDLFlBQU07O2dCQUVoRCxJQUFJLG9CQUFvQjtvQkFDcEIsVUFBTztvQkFBRSxXQUFRO29CQUFFLFNBQU07b0JBQUUsNkJBQTBCO29CQUFFLHdCQUFxQjtvQkFDNUUsT0FBSTtvQkFBRSxlQUFZO29CQUFFLGVBQVk7b0JBQUUsS0FBRTtvQkFBRSwyQkFBd0I7O2dCQUVsRSxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFZLE1BQU0sOEJBQ3pDLHlCQUF5QixnQkFBZ0IsNEJBQStCO29CQUM1RSxXQUFXO29CQUNYLFNBQVMsV0FBVztvQkFDcEIsS0FBSztvQkFDTCw2QkFBNkI7b0JBQzdCLHdCQUF3QjtvQkFDeEIsMkJBQTJCO29CQUMzQixPQUFPLHNCQUFzQixXQUFXO29CQUN4QyxlQUFlO29CQUNmLGVBQWUsSUFBSSxhQUNmO3dCQUNJLFdBQVc7d0JBQ1gsT0FBTzs7b0JBRWYsTUFBTSw0QkFBNEIsZ0NBQzdCLElBQUksWUFBWSxHQUFHO29CQUN4QixNQUFNLDBCQUEwQixvQkFBb0IsSUFBSSxTQUFTLFlBQU07d0JBQ25FLE9BQU8sRUFBQyxJQUFJOzs7O2dCQUlwQixVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMsUUFBUTtvQkFDYixJQUFJLFVBQVUsUUFBUSxLQUFLO29CQUMzQixRQUFRLFFBQVEsU0FBUzs7O2dCQUc3QixTQUFTLGNBQWMsTUFBTSxjQUFjO29CQUN2QyxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPO29CQUNkLE9BQU8sZUFBZTtvQkFDdEIsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7Z0JBR1gsU0FBUyxnQ0FBZ0MsWUFBVztvQkFDaEQsR0FBRyxpRUFBaUUsWUFBTTt3QkFDdEUsY0FBYyxNQUFNO3dCQUNwQjt3QkFDQSxPQUFPLDJCQUEyQiw4QkFBOEI7Ozs7OztHQWtCekUiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9Sb2xlU25hcHNob3REZXRhaWxDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5pbXBvcnQgY2VydGlmaWNhdGlvbk1vZHVsZSBmcm9tICdjZXJ0aWZpY2F0aW9uL0NlcnRpZmljYXRpb25Nb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ1JvbGVTbmFwc2hvdERldGFpbENvbHVtbkRpcmVjdGl2ZScsICgpID0+IHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSAnPHNwLXJvbGUtc25hcHNob3QtZGV0YWlsLWNvbHVtbiBzcC1tb2RlbD1cIml0ZW1cIiBzcC1jb2x1bW4tY29uZmlnPVwiY29sdW1uQ29uZmlnXCIvPicsXHJcbiAgICAgICAgZWxlbWVudCwgJGNvbXBpbGUsICRzY29wZSwgY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2UsIGNlcnRpZmljYXRpb25UZXN0RGF0YSxcclxuICAgICAgICBpdGVtLCBDb2x1bW5Db25maWcsIGNvbHVtbkNvbmZpZywgJHEsIGNlcnRpZmljYXRpb25EYXRhU2VydmljZTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShjZXJ0aWZpY2F0aW9uTW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUsIF8kcV8sIF9jZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZV8sXHJcbiAgICAgICAgICAgIF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfLCBfQ29sdW1uQ29uZmlnXywgX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV8pID0+IHtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgJHEgPSBfJHFfO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlXztcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uVGVzdERhdGEgPSBfY2VydGlmaWNhdGlvblRlc3REYXRhXztcclxuICAgICAgICBjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UgPSBfY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlXztcclxuICAgICAgICBpdGVtID0gY2VydGlmaWNhdGlvblRlc3REYXRhLkNFUlRfSVRFTVNbMV07XHJcbiAgICAgICAgQ29sdW1uQ29uZmlnID0gX0NvbHVtbkNvbmZpZ187XHJcbiAgICAgICAgY29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZGF0YUlueDEnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUZXN0Q29uZmlnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSwgJ3Nob3dSb2xlU25hcHNob3REZXRhaWxEaWFsb2cnKVxyXG4gICAgICAgICAgICAuYW5kLnJldHVyblZhbHVlKCRxLndoZW4oKSk7XHJcbiAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvbicpLmFuZC5jYWxsRmFrZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7aWQ6ICcxMid9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrKCkge1xyXG4gICAgICAgIGxldCBhbmNob3JzID0gZWxlbWVudC5maW5kKCdhJyk7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGFuY2hvcnMpLmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpdGVtLCBjb2x1bW5Db25maWcpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgJHNjb3BlLmNvbHVtbkNvbmZpZyA9IGNvbHVtbkNvbmZpZztcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnc2hvd1JvbGVTbmFwc2hvdERldGFpbERpYWxvZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0KCdjYWxscyBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSBzaG93Um9sZVNuYXBzaG90RGV0YWlsRGlhbG9nJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZyk7XHJcbiAgICAgICAgICAgIGNsaWNrKCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5zaG93Um9sZVNuYXBzaG90RGV0YWlsRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
