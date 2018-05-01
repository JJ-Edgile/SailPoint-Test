System.register(['certification/CertificationModule', 'test/js/TestInitializer'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var certificationModule;
    return {
        setters: [function (_certificationCertificationModule) {
            certificationModule = _certificationCertificationModule['default'];
        }, function (_testJsTestInitializer) {}],
        execute: function () {

            describe('spCertificationAccountDisplayNameColumn', function () {

                var elementDefinition = '<sp-certification-account-display-name-column sp-model="item" sp-column-config="columnConfig"\n            sp-text-only="textOnly"/>',
                    $scope = undefined,
                    $compile = undefined,
                    $controller = undefined,
                    element = undefined,
                    item = undefined,
                    certificationTestData = undefined,
                    ColumnConfig = undefined,
                    columnConfig = undefined,
                    textOnly = undefined;

                beforeEach(module(certificationModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _certificationTestData_, _$controller_, _ColumnConfig_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $controller = _$controller_;
                    certificationTestData = _certificationTestData_;
                    item = certificationTestData.CERT_ITEMS[1];
                    textOnly = true;
                    ColumnConfig = _ColumnConfig_;
                    columnConfig = new ColumnConfig({
                        dataIndex: '1',
                        label: 'My Icon'
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
                        var ctrl = $controller('CertificationAccountDisplayNameColumnDirectiveCtrl', null, {
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

                describe('html account status icons', function () {

                    function testIcons(textOnlyFlag) {
                        createElement(item, columnConfig, textOnlyFlag);
                        var iconsToBeDisplayed = angular.element(element).find('span > img');
                        expect(iconsToBeDisplayed.length).toEqual(textOnlyFlag ? 0 : 1);
                    }
                    function testLabel(textOnlyFlag) {
                        var testColumnConfig = new ColumnConfig({
                            dataIndex: '1',
                            label: undefined
                        });
                        createElement(item, testColumnConfig, textOnlyFlag);
                        expect(element[0].innerText.trim()).toEqual(textOnlyFlag ? 'ui_not_applicable' : '');
                    }

                    it('displays account status icon when textOnly flag is false', function () {
                        testIcons(false);
                    });

                    it('does not display account status icon when textOnly flag is true', function () {
                        testIcons(true);
                    });

                    it('displays N/A when label is empty and textOnly flag is true', function () {
                        testLabel(true);
                    });

                    it('displays no text when label is empty and textOnly flag is false', function () {
                        testLabel(false);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbkFjY291bnREaXNwbGF5TmFtZUNvbHVtbkRpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLHFDQUFxQyw0QkFBNEIsVUFBVSxTQUFTOzs7SUFHakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSxtQ0FBbUM7WUFDbkQsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsMkNBQTJDLFlBQVc7O2dCQUUzRCxJQUFJLG9CQUFpQjtvQkFHakIsU0FBTTtvQkFBRSxXQUFRO29CQUFFLGNBQVc7b0JBQUUsVUFBTztvQkFBRSxPQUFJO29CQUFFLHdCQUFxQjtvQkFBRSxlQUFZO29CQUFFLGVBQVk7b0JBQUUsV0FBUTs7Z0JBRTdHLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSx5QkFBeUIsZUFBZSxnQkFBZ0I7b0JBQ3pHLFNBQVMsYUFBYTtvQkFDdEIsV0FBVztvQkFDWCxjQUFjO29CQUNkLHdCQUF3QjtvQkFDeEIsT0FBTyxzQkFBc0IsV0FBVztvQkFDeEMsV0FBVztvQkFDWCxlQUFlO29CQUNmLGVBQWUsSUFBSSxhQUNmO3dCQUNJLFdBQVc7d0JBQ1gsT0FBTzs7OztnQkFLbkIsVUFBVSxZQUFNO29CQUNaLElBQUksU0FBUzt3QkFDVCxRQUFRLFFBQVEsU0FBUzs7OztnQkFJakMsU0FBUyxjQUFjLE1BQU0sY0FBYyxVQUFVO29CQUNqRCxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPO29CQUNkLE9BQU8sZUFBZTtvQkFDdEIsT0FBTyxXQUFXO29CQUNsQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87OztnQkFHWCxTQUFTLGNBQWMsWUFBTTtvQkFDekIsU0FBUyxtQkFBbUI7d0JBQ3hCLElBQUksT0FBTyxZQUFZLHNEQUFzRCxNQUFNOzRCQUMvRSxNQUFNOzRCQUNOLGNBQWM7NEJBQ2QsVUFBVTs7d0JBRWQsS0FBSzt3QkFDTCxPQUFPOzs7b0JBR1gsR0FBRywwQkFBMEIsWUFBTTt3QkFDL0IsT0FBTzt3QkFDUCxPQUFPLFlBQUE7NEJBWVMsT0FaSDsyQkFBb0I7OztvQkFHckMsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsZUFBZTt3QkFDZixPQUFPLFlBQUE7NEJBY1MsT0FkSDsyQkFBb0I7Ozs7Z0JBSXpDLFNBQVMsNkJBQTZCLFlBQU07O29CQUV4QyxTQUFTLFVBQVUsY0FBYzt3QkFDN0IsY0FBYyxNQUFNLGNBQWM7d0JBQ2xDLElBQUkscUJBQXFCLFFBQVEsUUFBUSxTQUFTLEtBQUs7d0JBQ3ZELE9BQU8sbUJBQW1CLFFBQVEsUUFBUSxlQUFpQixJQUFJOztvQkFFbkUsU0FBUyxVQUFVLGNBQWM7d0JBQzdCLElBQUksbUJBQW1CLElBQUksYUFDbkI7NEJBQ0ksV0FBVzs0QkFDWCxPQUFPOzt3QkFFbkIsY0FBYyxNQUFNLGtCQUFrQjt3QkFDdEMsT0FBTyxRQUFRLEdBQUcsVUFBVSxRQUFRLFFBQVEsZUFBaUIsc0JBQXNCOzs7b0JBR3ZGLEdBQUcsNERBQTRELFlBQU07d0JBQ2pFLFVBQVU7OztvQkFHZCxHQUFHLG1FQUFtRSxZQUFNO3dCQUN4RSxVQUFVOzs7b0JBR2QsR0FBRyw4REFBOEQsWUFBTTt3QkFDbkUsVUFBVTs7O29CQUdkLEdBQUcsbUVBQW1FLFlBQU07d0JBQ3hFLFVBQVU7Ozs7OztHQW9CbkIiLCJmaWxlIjoiY2VydGlmaWNhdGlvbi9DZXJ0aWZpY2F0aW9uQWNjb3VudERpc3BsYXlOYW1lQ29sdW1uRGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cclxuXHJcbmltcG9ydCBjZXJ0aWZpY2F0aW9uTW9kdWxlIGZyb20gJ2NlcnRpZmljYXRpb24vQ2VydGlmaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xyXG5cclxuZGVzY3JpYmUoJ3NwQ2VydGlmaWNhdGlvbkFjY291bnREaXNwbGF5TmFtZUNvbHVtbicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9XHJcbiAgICAgICAgYDxzcC1jZXJ0aWZpY2F0aW9uLWFjY291bnQtZGlzcGxheS1uYW1lLWNvbHVtbiBzcC1tb2RlbD1cIml0ZW1cIiBzcC1jb2x1bW4tY29uZmlnPVwiY29sdW1uQ29uZmlnXCJcclxuICAgICAgICAgICAgc3AtdGV4dC1vbmx5PVwidGV4dE9ubHlcIi8+YCxcclxuICAgICAgICAkc2NvcGUsICRjb21waWxlLCAkY29udHJvbGxlciwgZWxlbWVudCwgaXRlbSwgY2VydGlmaWNhdGlvblRlc3REYXRhLCBDb2x1bW5Db25maWcsIGNvbHVtbkNvbmZpZywgdGV4dE9ubHk7XHJcblxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY2VydGlmaWNhdGlvbk1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kcm9vdFNjb3BlXywgXyRjb21waWxlXywgX2NlcnRpZmljYXRpb25UZXN0RGF0YV8sIF8kY29udHJvbGxlcl8sIF9Db2x1bW5Db25maWdfKSB7XHJcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcclxuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XHJcbiAgICAgICAgJGNvbnRyb2xsZXIgPSBfJGNvbnRyb2xsZXJfO1xyXG4gICAgICAgIGNlcnRpZmljYXRpb25UZXN0RGF0YSA9IF9jZXJ0aWZpY2F0aW9uVGVzdERhdGFfO1xyXG4gICAgICAgIGl0ZW0gPSBjZXJ0aWZpY2F0aW9uVGVzdERhdGEuQ0VSVF9JVEVNU1sxXTtcclxuICAgICAgICB0ZXh0T25seSA9IHRydWU7XHJcbiAgICAgICAgQ29sdW1uQ29uZmlnID0gX0NvbHVtbkNvbmZpZ187XHJcbiAgICAgICAgY29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnMScsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ015IEljb24nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZywgdGV4dE9ubHkpIHtcclxuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcclxuICAgICAgICAkc2NvcGUuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgJHNjb3BlLmNvbHVtbkNvbmZpZyA9IGNvbHVtbkNvbmZpZztcclxuICAgICAgICAkc2NvcGUudGV4dE9ubHkgPSB0ZXh0T25seTtcclxuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xyXG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXNjcmliZSgnY29udHJvbGxlcicsICgpID0+IHtcclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgY3RybCA9ICRjb250cm9sbGVyKCdDZXJ0aWZpY2F0aW9uQWNjb3VudERpc3BsYXlOYW1lQ29sdW1uRGlyZWN0aXZlQ3RybCcsIG51bGwsIHtcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWc6IGNvbHVtbkNvbmZpZyxcclxuICAgICAgICAgICAgICAgIHRleHRPbmx5OiB0ZXh0T25seVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY3RybC4kb25Jbml0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjdHJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGFuIGl0ZW0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcigpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aG91dCBjb2x1bW4gY29uZmlnJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb2x1bW5Db25maWcgPSBudWxsO1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlQ29udHJvbGxlcigpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnaHRtbCBhY2NvdW50IHN0YXR1cyBpY29ucycsICgpID0+IHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdGVzdEljb25zKHRleHRPbmx5RmxhZykge1xyXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZywgdGV4dE9ubHlGbGFnKTtcclxuICAgICAgICAgICAgbGV0IGljb25zVG9CZURpc3BsYXllZCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5maW5kKCdzcGFuID4gaW1nJyk7XHJcbiAgICAgICAgICAgIGV4cGVjdChpY29uc1RvQmVEaXNwbGF5ZWQubGVuZ3RoKS50b0VxdWFsKCh0ZXh0T25seUZsYWcpID8gMCA6IDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiB0ZXN0TGFiZWwodGV4dE9ubHlGbGFnKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXN0Q29sdW1uQ29uZmlnID0gbmV3IENvbHVtbkNvbmZpZyhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgdGVzdENvbHVtbkNvbmZpZywgdGV4dE9ubHlGbGFnKTtcclxuICAgICAgICAgICAgZXhwZWN0KGVsZW1lbnRbMF0uaW5uZXJUZXh0LnRyaW0oKSkudG9FcXVhbCgodGV4dE9ubHlGbGFnKSA/ICd1aV9ub3RfYXBwbGljYWJsZScgOiAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdCgnZGlzcGxheXMgYWNjb3VudCBzdGF0dXMgaWNvbiB3aGVuIHRleHRPbmx5IGZsYWcgaXMgZmFsc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RJY29ucyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdkb2VzIG5vdCBkaXNwbGF5IGFjY291bnQgc3RhdHVzIGljb24gd2hlbiB0ZXh0T25seSBmbGFnIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RJY29ucyh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Rpc3BsYXlzIE4vQSB3aGVuIGxhYmVsIGlzIGVtcHR5IGFuZCB0ZXh0T25seSBmbGFnIGlzIHRydWUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRlc3RMYWJlbCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2Rpc3BsYXlzIG5vIHRleHQgd2hlbiBsYWJlbCBpcyBlbXB0eSBhbmQgdGV4dE9ubHkgZmxhZyBpcyBmYWxzZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGVzdExhYmVsKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
