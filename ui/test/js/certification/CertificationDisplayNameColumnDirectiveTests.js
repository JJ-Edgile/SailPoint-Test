System.register(['certification/CertificationModule', 'test/js/TestInitializer'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}],
        execute: function () {

            describe('spCertificationDisplayNameColumn', function () {

                var elementDefinition = '<sp-certification-display-name-column sp-model="item" sp-column-config="columnConfig"\n        sp-text-only="textOnly" />',
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    element = undefined,
                    item = undefined,
                    certificationTestData = undefined,
                    ColumnConfig = undefined,
                    columnConfig = undefined,
                    textOnly = undefined,
                    Certification = undefined,
                    certificationDataService = undefined;

                beforeEach(module(certificationModule));

                /* jshint maxparams: 8 */
                beforeEach(inject(function (_$rootScope_, _$compile_, _certificationTestData_, _$controller_, _ColumnConfig_, CertificationItem, _Certification_, _certificationDataService_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    certificationTestData = _certificationTestData_;
                    item = new CertificationItem(angular.copy(certificationTestData.CERT_ITEMS[4]));
                    textOnly = true;
                    ColumnConfig = _ColumnConfig_;
                    Certification = _Certification_;
                    certificationDataService = _certificationDataService_;
                    columnConfig = new ColumnConfig({
                        dataIndex: '1',
                        label: 'My Name'
                    });
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createElement(item, columnConfig, textOnly) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $scope.columnConfig = columnConfig;
                    $scope.textOnly = textOnly;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                describe('controller', function () {
                    function createController() {
                        var ctrl = $controller('CertificationDisplayNameColumnDirectiveCtrl', null, {
                            item: item,
                            columnConfig: columnConfig,
                            textOnly: textOnly
                        });
                        ctrl.$onInit();
                        return ctrl;
                    }

                    it('throws without an item', function () {
                        item = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });

                    it('throws without column config', function () {
                        columnConfig = null;
                        expect(function () {
                            return createController();
                        }).toThrow();
                    });
                });

                describe('html previous decision messages', function () {

                    beforeEach(function () {
                        spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                    });

                    it('throws without an item', function () {
                        item = null;
                        expect(function () {
                            return createElement();
                        }).toThrow();
                    });

                    it('displays unremoved remediation message', function () {
                        createElement(item, columnConfig, false);
                        expect(element[0].innerText.trim()).toContain('ui_unremoved_remediation_decision');
                    });

                    it('does not display unremoved remediation message if textOnlyFlag is true', function () {
                        createElement(item, columnConfig, true);
                        expect(element[0].innerText.trim()).not.toContain('ui_unremoved_remediation_decision');
                    });

                    it('calls ColumnConfig.getObjectValue() to get the display value', function () {
                        spyOn(columnConfig, 'getObjectValue').and.callThrough();
                        createElement(item, columnConfig, false);
                        expect(columnConfig.getObjectValue).toHaveBeenCalledWith(item);
                    });
                });

                describe('policy violations', function () {

                    beforeEach(function () {
                        spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                    });

                    function testPolicyViolationMessages(textOnlyFlag) {
                        var newItem = angular.copy(item);
                        newItem.policyViolations = ['Violation 1', 'Violation 2'];
                        createElement(newItem, columnConfig, textOnlyFlag);
                        var listItems = angular.element(element).find('ul.list-unstyled > li');
                        if (textOnlyFlag) {
                            expect(listItems.length).toEqual(0);
                        } else {
                            expect(listItems.length).toEqual(2);
                            expect(listItems[0].innerText.trim()).toContain('Violation 1');
                            expect(listItems[1].innerText.trim()).toContain('Violation 2');
                        }
                    }

                    it('shows policy violations in a list if they are defined on the item', function () {
                        testPolicyViolationMessages(false);
                    });

                    it('does not show policy violations in a list if textOnly flag is true', function () {
                        testPolicyViolationMessages(true);
                    });
                });

                describe('managed attribute details dialog', function () {
                    var cert = {
                        id: '1234'
                    },
                        certificationItemDetailService = undefined,
                        certificationEntityService = undefined;

                    beforeEach(inject(function (_certificationItemDetailService_, _certificationEntityService_) {
                        certificationItemDetailService = _certificationItemDetailService_;
                        certificationEntityService = _certificationEntityService_;

                        spyOn(certificationDataService, 'getCertification').and.returnValue(cert);
                    }));

                    it('shows link if item is managed attribute', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        createElement(item, columnConfig, false);
                        expect(element.find('a').length).toEqual(1);
                    });

                    it('shows link if item is managed attribute', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(false);
                        spyOn(item, 'isDataOwnerGroupAttribute').and.returnValue(true);
                        createElement(item, columnConfig, false);
                        expect(element.find('a').length).toEqual(1);
                    });

                    it('does not show link if text only', function () {
                        spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                        createElement(item, columnConfig, true);
                        expect(element.find('a').length).toEqual(0);
                    });

                    it('calls through to certificationItemDetailService.showDetailDialog when link is clicked', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.DataOwner);
                        spyOn(certificationItemDetailService, 'showManagedAttributeDetailDialog');
                        createElement(item, columnConfig, false);
                        angular.element(element.find('a')[0]).click();
                        $scope.$apply();
                        expect(certificationItemDetailService.showManagedAttributeDetailDialog).toHaveBeenCalledWith(cert.id, item);
                    });

                    it('calls through to certificationEntityService.showDetailDialog when link is clicked', function () {
                        spyOn(item, 'isGroupAttributeException').and.returnValue(true);
                        spyOn(certificationDataService, 'getCertificationType').and.returnValue(Certification.Type.AccountGroupPermissions);
                        spyOn(certificationEntityService, 'showManagedAttributeDetailDialog');
                        createElement(item, columnConfig, false);
                        angular.element(element.find('a')[0]).click();
                        $scope.$apply();
                        expect(certificationEntityService.showManagedAttributeDetailDialog).toHaveBeenCalledWith(cert.id, Certification.Type.AccountGroupPermissions, item.entityId);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkRpc3BsYXlOYW1lQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMscUNBQXFDLDRCQUE0QixVQUFVLFNBQVM7OztJQUdqRzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLG1DQUFtQztZQUNuRCxzQkFBc0Isa0NBQWtDO1dBQ3pELFVBQVUsd0JBQXdCO1FBQ3JDLFNBQVMsWUFBWTs7WUFMN0IsU0FBUyxvQ0FBb0MsWUFBVzs7Z0JBRXBELElBQUksb0JBQWlCO29CQUVqQixTQUFNO29CQUFFLFdBQVE7b0JBQUUsY0FBVztvQkFBRSxVQUFPO29CQUFFLE9BQUk7b0JBQUUsd0JBQXFCO29CQUFFLGVBQVk7b0JBQUUsZUFBWTtvQkFBRSxXQUFRO29CQUN6RyxnQkFBYTtvQkFBRSwyQkFBd0I7O2dCQUUzQyxXQUFXLE9BQU87OztnQkFHbEIsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLHlCQUF5QixlQUFlLGdCQUNsRSxtQkFBbUIsaUJBQWlCLDRCQUE0QjtvQkFDdkYsU0FBUyxhQUFhO29CQUN0QixXQUFXO29CQUNYLGNBQWM7b0JBQ2Qsd0JBQXdCO29CQUN4QixPQUFPLElBQUksa0JBQWtCLFFBQVEsS0FBSyxzQkFBc0IsV0FBVztvQkFDM0UsV0FBVztvQkFDWCxlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsMkJBQTJCO29CQUMzQixlQUFlLElBQUksYUFDZjt3QkFDSSxXQUFXO3dCQUNYLE9BQU87Ozs7Z0JBS25CLFVBQVUsWUFBTTtvQkFDWixJQUFJLFNBQVM7d0JBQ1QsUUFBUSxRQUFRLFNBQVM7Ozs7Z0JBSWpDLFNBQVMsY0FBYyxNQUFNLGNBQWMsVUFBVTtvQkFDakQsVUFBVSxRQUFRLFFBQVE7b0JBQzFCLE9BQU8sT0FBTztvQkFDZCxPQUFPLGVBQWU7b0JBQ3RCLE9BQU8sV0FBVztvQkFDbEIsU0FBUyxT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LHlGQUF5RixZQUFNO3dCQUM5RixNQUFNLE1BQU0sNkJBQTZCLElBQUksWUFBWTt3QkFDekQsTUFBTSwwQkFBMEIsd0JBQXdCLElBQUksWUFBWSxjQUFjLEtBQUs7d0JBQzNGLE1BQU0sZ0NBQWdDO3dCQUN0QyxjQUFjLE1BQU0sY0FBYzt3QkFDbEMsUUFBUSxRQUFRLFFBQVEsS0FBSyxLQUFLLElBQUk7d0JBQ3RDLE9BQU87d0JBQ1AsT0FBTywrQkFBK0Isa0NBQWtDLHFCQUFxQixLQUFLLElBQUk7OztvQkFHMUcsR0FBRyxxRkFBcUYsWUFBTTt3QkFDMUYsTUFBTSxNQUFNLDZCQUE2QixJQUFJLFlBQVk7d0JBQ3pELE1BQU0sMEJBQTBCLHdCQUMzQixJQUFJLFlBQVksY0FBYyxLQUFLO3dCQUN4QyxNQUFNLDRCQUE0Qjt3QkFDbEMsY0FBYyxNQUFNLGNBQWM7d0JBQ2xDLFFBQVEsUUFBUSxRQUFRLEtBQUssS0FBSyxJQUFJO3dCQUN0QyxPQUFPO3dCQUNQLE9BQU8sMkJBQTJCLGtDQUFrQyxxQkFBcUIsS0FBSyxJQUMxRixjQUFjLEtBQUsseUJBQXlCLEtBQUs7Ozs7OztHQXNCOUQiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uRGlzcGxheU5hbWVDb2x1bW5EaXJlY3RpdmVUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0IGNlcnRpZmljYXRpb25Nb2R1bGUgZnJvbSAnY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uTW9kdWxlJztcclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcblxyXG5kZXNjcmliZSgnc3BDZXJ0aWZpY2F0aW9uRGlzcGxheU5hbWVDb2x1bW4nLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgZWxlbWVudERlZmluaXRpb24gPSBgPHNwLWNlcnRpZmljYXRpb24tZGlzcGxheS1uYW1lLWNvbHVtbiBzcC1tb2RlbD1cIml0ZW1cIiBzcC1jb2x1bW4tY29uZmlnPVwiY29sdW1uQ29uZmlnXCJcclxuICAgICAgICBzcC10ZXh0LW9ubHk9XCJ0ZXh0T25seVwiIC8+YCxcclxuICAgICAgICAkc2NvcGUsICRjb21waWxlLCAkY29udHJvbGxlciwgZWxlbWVudCwgaXRlbSwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDb2x1bW5Db25maWcsIGNvbHVtbkNvbmZpZywgdGV4dE9ubHksXHJcbiAgICAgICAgQ2VydGlmaWNhdGlvbiwgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGNlcnRpZmljYXRpb25Nb2R1bGUpKTtcclxuXHJcbiAgICAvKiBqc2hpbnQgbWF4cGFyYW1zOiA4ICovXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfLCBfJGNvbnRyb2xsZXJfLCBfQ29sdW1uQ29uZmlnXyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb25JdGVtLCBfQ2VydGlmaWNhdGlvbl8sIF9jZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2VfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xyXG4gICAgICAgIGl0ZW0gPSBuZXcgQ2VydGlmaWNhdGlvbkl0ZW0oYW5ndWxhci5jb3B5KGNlcnRpZmljYXRpb25UZXN0RGF0YS5DRVJUX0lURU1TWzRdKSk7XHJcbiAgICAgICAgdGV4dE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIENvbHVtbkNvbmZpZyA9IF9Db2x1bW5Db25maWdfO1xyXG4gICAgICAgIENlcnRpZmljYXRpb24gPSBfQ2VydGlmaWNhdGlvbl87XHJcbiAgICAgICAgY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlID0gX2NlcnRpZmljYXRpb25EYXRhU2VydmljZV87XHJcbiAgICAgICAgY29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnMScsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ015IE5hbWUnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZywgdGV4dE9ubHkpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgJHNjb3BlLmNvbHVtbkNvbmZpZyA9IGNvbHVtbkNvbmZpZztcclxuICAgICAgICAkc2NvcGUudGV4dE9ubHkgPSB0ZXh0T25seTtcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9ICRjb250cm9sbGVyKCdDZXJ0aWZpY2F0aW9uRGlzcGxheU5hbWVDb2x1bW5EaXJlY3RpdmVDdHJsJywgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvbmZpZzogY29sdW1uQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgdGV4dE9ubHk6IHRleHRPbmx5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdHJsLiRvbkluaXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN0cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgndGhyb3dzIHdpdGhvdXQgYW4gaXRlbScsICgpID0+IHtcclxuICAgICAgICAgICAgaXRlbSA9IG51bGw7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNvbHVtbiBjb25maWcnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbHVtbkNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdodG1sIHByZXZpb3VzIGRlY2lzaW9uIG1lc3NhZ2VzJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBhbiBpdGVtJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQoKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnZGlzcGxheXMgdW5yZW1vdmVkIHJlbWVkaWF0aW9uIG1lc3NhZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgY29sdW1uQ29uZmlnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbigndWlfdW5yZW1vdmVkX3JlbWVkaWF0aW9uX2RlY2lzaW9uJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBkaXNwbGF5IHVucmVtb3ZlZCByZW1lZGlhdGlvbiBtZXNzYWdlIGlmIHRleHRPbmx5RmxhZyBpcyB0cnVlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50WzBdLmlubmVyVGV4dC50cmltKCkpLm5vdC50b0NvbnRhaW4oJ3VpX3VucmVtb3ZlZF9yZW1lZGlhdGlvbl9kZWNpc2lvbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgQ29sdW1uQ29uZmlnLmdldE9iamVjdFZhbHVlKCkgdG8gZ2V0IHRoZSBkaXNwbGF5IHZhbHVlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNweU9uKGNvbHVtbkNvbmZpZywgJ2dldE9iamVjdFZhbHVlJykuYW5kLmNhbGxUaHJvdWdoKCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgY29sdW1uQ29uZmlnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjb2x1bW5Db25maWcuZ2V0T2JqZWN0VmFsdWUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ3BvbGljeSB2aW9sYXRpb25zJywgKCkgPT4ge1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oY2VydGlmaWNhdGlvbkRhdGFTZXJ2aWNlLCAnZ2V0Q2VydGlmaWNhdGlvblR5cGUnKS5hbmQucmV0dXJuVmFsdWUoQ2VydGlmaWNhdGlvbi5UeXBlLkRhdGFPd25lcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RQb2xpY3lWaW9sYXRpb25NZXNzYWdlcyh0ZXh0T25seUZsYWcpIHtcclxuICAgICAgICAgICAgbGV0IG5ld0l0ZW0gPSBhbmd1bGFyLmNvcHkoaXRlbSk7XHJcbiAgICAgICAgICAgIG5ld0l0ZW0ucG9saWN5VmlvbGF0aW9ucyA9IFsnVmlvbGF0aW9uIDEnLCAnVmlvbGF0aW9uIDInXTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChuZXdJdGVtLCBjb2x1bW5Db25maWcsIHRleHRPbmx5RmxhZyk7XHJcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbXMgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudCkuZmluZCgndWwubGlzdC11bnN0eWxlZCA+IGxpJyk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0T25seUZsYWcpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChsaXN0SXRlbXMubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KGxpc3RJdGVtcy5sZW5ndGgpLnRvRXF1YWwoMik7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QobGlzdEl0ZW1zWzBdLmlubmVyVGV4dC50cmltKCkpLnRvQ29udGFpbignVmlvbGF0aW9uIDEnKTtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChsaXN0SXRlbXNbMV0uaW5uZXJUZXh0LnRyaW0oKSkudG9Db250YWluKCdWaW9sYXRpb24gMicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnc2hvd3MgcG9saWN5IHZpb2xhdGlvbnMgaW4gYSBsaXN0IGlmIHRoZXkgYXJlIGRlZmluZWQgb24gdGhlIGl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RQb2xpY3lWaW9sYXRpb25NZXNzYWdlcyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IHBvbGljeSB2aW9sYXRpb25zIGluIGEgbGlzdCBpZiB0ZXh0T25seSBmbGFnIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RQb2xpY3lWaW9sYXRpb25NZXNzYWdlcyh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdtYW5hZ2VkIGF0dHJpYnV0ZSBkZXRhaWxzIGRpYWxvZycsICgpID0+IHtcclxuICAgICAgICBsZXQgY2VydCA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnMTIzNCdcclxuICAgICAgICAgICAgfSwgY2VydGlmaWNhdGlvbkl0ZW1EZXRhaWxTZXJ2aWNlLCBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoKF9jZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2VfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBfY2VydGlmaWNhdGlvbkVudGl0eVNlcnZpY2VfKSA9PiB7XHJcbiAgICAgICAgICAgIGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2VfO1xyXG4gICAgICAgICAgICBjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZSA9IF9jZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZV87XHJcblxyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uJykuYW5kLnJldHVyblZhbHVlKGNlcnQpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgaXQoJ3Nob3dzIGxpbmsgaWYgaXRlbSBpcyBtYW5hZ2VkIGF0dHJpYnV0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgY29sdW1uQ29uZmlnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2EnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdzaG93cyBsaW5rIGlmIGl0ZW0gaXMgbWFuYWdlZCBhdHRyaWJ1dGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0dyb3VwQXR0cmlidXRlRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKGZhbHNlKTtcclxuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzRGF0YU93bmVyR3JvdXBBdHRyaWJ1dGUnKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgY29sdW1uQ29uZmlnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdChlbGVtZW50LmZpbmQoJ2EnKS5sZW5ndGgpLnRvRXF1YWwoMSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IGxpbmsgaWYgdGV4dCBvbmx5JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpLmFuZC5yZXR1cm5WYWx1ZShDZXJ0aWZpY2F0aW9uLlR5cGUuRGF0YU93bmVyKTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChpdGVtLCBjb2x1bW5Db25maWcsIHRydWUpO1xyXG4gICAgICAgICAgICBleHBlY3QoZWxlbWVudC5maW5kKCdhJykubGVuZ3RoKS50b0VxdWFsKDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnY2FsbHMgdGhyb3VnaCB0byBjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2Uuc2hvd0RldGFpbERpYWxvZyB3aGVuIGxpbmsgaXMgY2xpY2tlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgc3B5T24oaXRlbSwgJ2lzR3JvdXBBdHRyaWJ1dGVFeGNlcHRpb24nKS5hbmQucmV0dXJuVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25EYXRhU2VydmljZSwgJ2dldENlcnRpZmljYXRpb25UeXBlJykuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5EYXRhT3duZXIpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uSXRlbURldGFpbFNlcnZpY2UsICdzaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbERpYWxvZycpO1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZywgZmFsc2UpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudC5maW5kKCdhJylbMF0pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNlcnRpZmljYXRpb25JdGVtRGV0YWlsU2VydmljZS5zaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbERpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCwgaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYWxscyB0aHJvdWdoIHRvIGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLnNob3dEZXRhaWxEaWFsb2cgd2hlbiBsaW5rIGlzIGNsaWNrZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNweU9uKGl0ZW0sICdpc0dyb3VwQXR0cmlidXRlRXhjZXB0aW9uJykuYW5kLnJldHVyblZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICBzcHlPbihjZXJ0aWZpY2F0aW9uRGF0YVNlcnZpY2UsICdnZXRDZXJ0aWZpY2F0aW9uVHlwZScpXHJcbiAgICAgICAgICAgICAgICAuYW5kLnJldHVyblZhbHVlKENlcnRpZmljYXRpb24uVHlwZS5BY2NvdW50R3JvdXBQZXJtaXNzaW9ucyk7XHJcbiAgICAgICAgICAgIHNweU9uKGNlcnRpZmljYXRpb25FbnRpdHlTZXJ2aWNlLCAnc2hvd01hbmFnZWRBdHRyaWJ1dGVEZXRhaWxEaWFsb2cnKTtcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChpdGVtLCBjb2x1bW5Db25maWcsIGZhbHNlKTtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQuZmluZCgnYScpWzBdKS5jbGljaygpO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjZXJ0aWZpY2F0aW9uRW50aXR5U2VydmljZS5zaG93TWFuYWdlZEF0dHJpYnV0ZURldGFpbERpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoY2VydC5pZCxcclxuICAgICAgICAgICAgICAgIENlcnRpZmljYXRpb24uVHlwZS5BY2NvdW50R3JvdXBQZXJtaXNzaW9ucywgaXRlbS5lbnRpdHlJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
