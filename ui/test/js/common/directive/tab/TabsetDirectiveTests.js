System.register(['test/js/TestInitializer', 'common/directive/tab/TabModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var tabDirectiveModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDirectiveTabTabModule) {
            tabDirectiveModule = _commonDirectiveTabTabModule['default'];
        }],
        execute: function () {

            describe('spTabset', function () {
                var element = undefined,
                    $compile = undefined,
                    $scope = undefined;

                beforeEach(module(tabDirectiveModule));

                beforeEach(inject(function (_$compile_, $rootScope) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                }));

                afterEach(function () {
                    if (element) {
                        element.remove();
                    }
                });

                describe('spActiveTabConfig', function () {
                    var definition = '<sp-tabset sp-active-tab-config="activeTabConfig">\n              <sp-tab sp-config="tabConfigs[0]">\n                <uib-tab-heading>{{tabConfigs[0].heading}}</uib-tab-heading>\n              </sp-tab>\n              <sp-tab sp-config="tabConfigs[1]">\n                <uib-tab-heading>{{tabConfigs[0].heading}}</uib-tab-heading>\n              </sp-tab>',
                        tabConfigs = undefined;

                    beforeEach(function () {
                        tabConfigs = [{
                            heading: 'ONE'
                        }, {
                            heading: 'TWO'
                        }];
                    });

                    function createElement(activeTabConfig) {
                        element = angular.element(definition);
                        $scope.activeTabConfig = activeTabConfig;
                        $scope.tabConfigs = tabConfigs;
                        $compile(element)($scope);
                        $scope.$apply();
                        return element;
                    }

                    function findTab(idx) {
                        var tabs = element.find('.sp-tabset .btn-group a.btn');
                        expect(tabs.length).toEqual(2);
                        return angular.element(tabs[idx]);
                    }

                    function testTabActive(idx, isActive) {
                        expect(findTab(idx).hasClass('active')).toEqual(isActive);
                    }

                    function clickTab(idx) {
                        findTab(idx).click();
                        $scope.$apply();
                    }

                    it('sets the active tab to value if defined', function () {
                        createElement(tabConfigs[1]);
                        testTabActive(0, false);
                        testTabActive(1, true);
                    });

                    it('defaults to first tab if value is not defined', function () {
                        createElement(undefined);
                        testTabActive(0, true);
                        testTabActive(1, false);
                        expect($scope.activeTabConfig).toEqual(tabConfigs[0]);
                    });

                    it('updates the active tab if value changes', function () {
                        createElement(tabConfigs[1]);
                        $scope.activeTabConfig = tabConfigs[0];
                        $scope.$apply();
                        testTabActive(0, true);
                        testTabActive(1, false);
                    });

                    it('updates the value if different tab is selected', function () {
                        createElement(tabConfigs[1]);
                        clickTab(0);
                        expect($scope.activeTabConfig).toEqual(tabConfigs[0]);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kaXJlY3RpdmUvdGFiL1RhYnNldERpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixtQ0FBbUMsVUFBVSxTQUFTOzs7SUFHOUY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDhCQUE4QjtZQUNwRixxQkFBcUIsNkJBQTZCOztRQUV0RCxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsWUFBWSxZQUFNO2dCQUN2QixJQUFJLFVBQU87b0JBQUUsV0FBUTtvQkFBRSxTQUFNOztnQkFFN0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQUMsWUFBWSxZQUFlO29CQUMxQyxXQUFXO29CQUNYLFNBQVMsV0FBVzs7O2dCQUd4QixVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVE7Ozs7Z0JBSWhCLFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLElBQUksYUFBVTt3QkFRVixhQUFVOztvQkFFZCxXQUFXLFlBQU07d0JBQ2IsYUFBYSxDQUFDOzRCQUNWLFNBQVM7MkJBQ1g7NEJBQ0UsU0FBUzs7OztvQkFJakIsU0FBUyxjQUFjLGlCQUFpQjt3QkFDcEMsVUFBVSxRQUFRLFFBQVE7d0JBQzFCLE9BQU8sa0JBQWtCO3dCQUN6QixPQUFPLGFBQWE7d0JBQ3BCLFNBQVMsU0FBUzt3QkFDbEIsT0FBTzt3QkFDUCxPQUFPOzs7b0JBR1gsU0FBUyxRQUFRLEtBQU07d0JBQ25CLElBQUksT0FBTyxRQUFRLEtBQUs7d0JBQ3hCLE9BQU8sS0FBSyxRQUFRLFFBQVE7d0JBQzVCLE9BQU8sUUFBUSxRQUFRLEtBQUs7OztvQkFHaEMsU0FBUyxjQUFjLEtBQUssVUFBVTt3QkFDbEMsT0FBTyxRQUFTLEtBQU0sU0FBUyxXQUFXLFFBQVE7OztvQkFHdEQsU0FBUyxTQUFTLEtBQUs7d0JBQ25CLFFBQVEsS0FBSzt3QkFDYixPQUFPOzs7b0JBR1gsR0FBRywyQ0FBMkMsWUFBTTt3QkFDaEQsY0FBYyxXQUFXO3dCQUN6QixjQUFjLEdBQUc7d0JBQ2pCLGNBQWMsR0FBRzs7O29CQUdyQixHQUFHLGlEQUFpRCxZQUFNO3dCQUN0RCxjQUFjO3dCQUNkLGNBQWMsR0FBRzt3QkFDakIsY0FBYyxHQUFHO3dCQUNqQixPQUFPLE9BQU8saUJBQWlCLFFBQVEsV0FBVzs7O29CQUd0RCxHQUFHLDJDQUEyQyxZQUFNO3dCQUNoRCxjQUFjLFdBQVc7d0JBQ3pCLE9BQU8sa0JBQWtCLFdBQVc7d0JBQ3BDLE9BQU87d0JBQ1AsY0FBYyxHQUFHO3dCQUNqQixjQUFjLEdBQUc7OztvQkFHckIsR0FBRyxrREFBa0QsWUFBTTt3QkFDdkQsY0FBYyxXQUFXO3dCQUN6QixTQUFTO3dCQUNULE9BQU8sT0FBTyxpQkFBaUIsUUFBUSxXQUFXOzs7Ozs7R0FRM0QiLCJmaWxlIjoiY29tbW9uL2RpcmVjdGl2ZS90YWIvVGFic2V0RGlyZWN0aXZlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAoYykgQ29weXJpZ2h0IDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgdGFiRGlyZWN0aXZlTW9kdWxlIGZyb20gJ2NvbW1vbi9kaXJlY3RpdmUvdGFiL1RhYk1vZHVsZSc7XG5cbmRlc2NyaWJlKCdzcFRhYnNldCcsICgpID0+IHtcbiAgICBsZXQgZWxlbWVudCwgJGNvbXBpbGUsICRzY29wZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhYkRpcmVjdGl2ZU1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kY29tcGlsZV8sICRyb290U2NvcGUpID0+IHtcbiAgICAgICAgJGNvbXBpbGUgPSBfJGNvbXBpbGVfO1xuICAgICAgICAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NwQWN0aXZlVGFiQ29uZmlnJywgKCkgPT4ge1xuICAgICAgICBsZXQgZGVmaW5pdGlvbiA9XG4gICAgICAgICAgICAgICAgYDxzcC10YWJzZXQgc3AtYWN0aXZlLXRhYi1jb25maWc9XCJhY3RpdmVUYWJDb25maWdcIj5cbiAgICAgICAgICAgICAgPHNwLXRhYiBzcC1jb25maWc9XCJ0YWJDb25maWdzWzBdXCI+XG4gICAgICAgICAgICAgICAgPHVpYi10YWItaGVhZGluZz57e3RhYkNvbmZpZ3NbMF0uaGVhZGluZ319PC91aWItdGFiLWhlYWRpbmc+XG4gICAgICAgICAgICAgIDwvc3AtdGFiPlxuICAgICAgICAgICAgICA8c3AtdGFiIHNwLWNvbmZpZz1cInRhYkNvbmZpZ3NbMV1cIj5cbiAgICAgICAgICAgICAgICA8dWliLXRhYi1oZWFkaW5nPnt7dGFiQ29uZmlnc1swXS5oZWFkaW5nfX08L3VpYi10YWItaGVhZGluZz5cbiAgICAgICAgICAgICAgPC9zcC10YWI+YCxcbiAgICAgICAgICAgIHRhYkNvbmZpZ3M7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICB0YWJDb25maWdzID0gW3tcbiAgICAgICAgICAgICAgICBoZWFkaW5nOiAnT05FJ1xuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgaGVhZGluZzogJ1RXTydcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGFjdGl2ZVRhYkNvbmZpZykge1xuICAgICAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICRzY29wZS5hY3RpdmVUYWJDb25maWcgPSBhY3RpdmVUYWJDb25maWc7XG4gICAgICAgICAgICAkc2NvcGUudGFiQ29uZmlncyA9IHRhYkNvbmZpZ3M7XG4gICAgICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kVGFiKGlkeCkgIHtcbiAgICAgICAgICAgIGxldCB0YWJzID0gZWxlbWVudC5maW5kKCcuc3AtdGFic2V0IC5idG4tZ3JvdXAgYS5idG4nKTtcbiAgICAgICAgICAgIGV4cGVjdCh0YWJzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmVsZW1lbnQodGFic1tpZHhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RUYWJBY3RpdmUoaWR4LCBpc0FjdGl2ZSkge1xuICAgICAgICAgICAgZXhwZWN0KChmaW5kVGFiKGlkeCkpLmhhc0NsYXNzKCdhY3RpdmUnKSkudG9FcXVhbChpc0FjdGl2ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGlja1RhYihpZHgpIHtcbiAgICAgICAgICAgIGZpbmRUYWIoaWR4KS5jbGljaygpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGFjdGl2ZSB0YWIgdG8gdmFsdWUgaWYgZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQodGFiQ29uZmlnc1sxXSk7XG4gICAgICAgICAgICB0ZXN0VGFiQWN0aXZlKDAsIGZhbHNlKTtcbiAgICAgICAgICAgIHRlc3RUYWJBY3RpdmUoMSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkZWZhdWx0cyB0byBmaXJzdCB0YWIgaWYgdmFsdWUgaXMgbm90IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0ZXN0VGFiQWN0aXZlKDAsIHRydWUpO1xuICAgICAgICAgICAgdGVzdFRhYkFjdGl2ZSgxLCBmYWxzZSk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmFjdGl2ZVRhYkNvbmZpZykudG9FcXVhbCh0YWJDb25maWdzWzBdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3VwZGF0ZXMgdGhlIGFjdGl2ZSB0YWIgaWYgdmFsdWUgY2hhbmdlcycsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQodGFiQ29uZmlnc1sxXSk7XG4gICAgICAgICAgICAkc2NvcGUuYWN0aXZlVGFiQ29uZmlnID0gdGFiQ29uZmlnc1swXTtcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIHRlc3RUYWJBY3RpdmUoMCwgdHJ1ZSk7XG4gICAgICAgICAgICB0ZXN0VGFiQWN0aXZlKDEsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3VwZGF0ZXMgdGhlIHZhbHVlIGlmIGRpZmZlcmVudCB0YWIgaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KHRhYkNvbmZpZ3NbMV0pO1xuICAgICAgICAgICAgY2xpY2tUYWIoMCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmFjdGl2ZVRhYkNvbmZpZykudG9FcXVhbCh0YWJDb25maWdzWzBdKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
