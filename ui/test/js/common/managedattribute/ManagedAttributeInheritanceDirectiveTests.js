System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeInheritanceDirective', function () {

                var $scope = undefined,
                    $compile = undefined;

                function createElement(managedAttribute, resourceUrl) {
                    var element = undefined,
                        elementDef = '<sp-managed-attribute-inheritance ' + 'sp-managed-attribute="fakeCtrl.managedAttribute"' + 'sp-managed-attribute-resouce-url="fakeCtrl.resourceUrl">' + '</sp-managed-attribute-inheritance>';
                    $scope.fakeCtrl.managedAttribute = managedAttribute;
                    $scope.fakeCtrl.resourceUrl = resourceUrl;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_$rootScope_, _$compile_) {
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                }));

                it('should throw with no managed attribute', function () {
                    expect(function () {
                        return createElement(null, 'someurl');
                    }).toThrow();
                });

                it('should throw with no resource url', function () {
                    expect(function () {
                        return createElement({});
                    }).toThrow();
                });
            });

            describe('ManagedAttributeInheritanceCtrl', function () {
                var managedAttributeService = undefined,
                    $controller = undefined;

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_managedAttributeService_, _$controller_) {
                    $controller = _$controller_;
                    managedAttributeService = _managedAttributeService_;
                }));

                function createController(detailResourceUrl) {
                    var bindings = {
                        managedAttribute: {},
                        detailResourceUrl: detailResourceUrl
                    };
                    return $controller('ManagedAttributeInheritanceCtrl', {}, bindings);
                }

                describe('inheritance parents', function () {
                    it('should call through to managedAttributeService with correct params', function () {
                        var start = 12,
                            itemsPer = 6,
                            order = 'desc',
                            baseUrl = 'baseUrl',
                            ctrl = createController(baseUrl);

                        spyOn(managedAttributeService, 'getEntitlementInheritanceParents').and.returnValue({});
                        ctrl.getInheritanceParents(start, itemsPer, order);
                        expect(managedAttributeService.getEntitlementInheritanceParents).toHaveBeenCalledWith(baseUrl, start, itemsPer, order);
                    });

                    it('should return a value from the table config\'s paging data', function () {
                        var actualValue = undefined,
                            expectedValue = 8921389128934,
                            ctrl = createController('');
                        spyOn(ctrl.inheritanceParentsTableConfig.getPagingData(), 'getTotal').and.returnValue(expectedValue);
                        actualValue = ctrl.getInheritanceParentsCount();
                        expect(actualValue).toEqual(expectedValue);
                    });
                });

                describe('inheritance children', function () {
                    it('should call through to managedAttributeService with correct params', function () {
                        var start = 12,
                            itemsPer = 6,
                            order = 'desc',
                            baseUrl = 'baseUrl',
                            ctrl = createController(baseUrl);

                        spyOn(managedAttributeService, 'getEntitlementInheritanceChildren').and.returnValue({});
                        ctrl.getInheritanceChildren(start, itemsPer, order);
                        expect(managedAttributeService.getEntitlementInheritanceChildren).toHaveBeenCalledWith(baseUrl, start, itemsPer, order);
                    });

                    it('should return a value from the table config\'s paging data', function () {
                        var actualValue = undefined,
                            expectedValue = 8921389128934,
                            ctrl = createController('');
                        spyOn(ctrl.inheritanceChildrenTableConfig.getPagingData(), 'getTotal').and.returnValue(expectedValue);
                        actualValue = ctrl.getInheritanceChildrenCount();
                        expect(actualValue).toEqual(expectedValue);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVJbmhlcml0YW5jZURpcmVjdGl2ZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixtREFBbUQsVUFBVSxTQUFTO0lBQzlHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSwrQ0FBK0M7WUFDckcseUJBQXlCLDhDQUE4Qzs7UUFFM0UsU0FBUyxZQUFZOztZQUw3QixTQUFTLHdDQUF3QyxZQUFNOztnQkFFbkQsSUFBSSxTQUFNO29CQUNOLFdBQVE7O2dCQUVaLFNBQVMsY0FBYyxrQkFBa0IsYUFBYTtvQkFDbEQsSUFBSSxVQUFPO3dCQUNQLGFBQWEsdUNBQ1QscURBQ0EsNkRBQ0E7b0JBQ1IsT0FBTyxTQUFTLG1CQUFtQjtvQkFDbkMsT0FBTyxTQUFTLGNBQWM7b0JBQzlCLFVBQVUsUUFBUSxRQUFRO29CQUMxQixTQUFTLFNBQVM7b0JBQ2xCLE9BQU87b0JBQ1AsT0FBTzs7O2dCQUdYLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZO29CQUNqRCxTQUFTLGFBQWE7b0JBQ3RCLE9BQU8sV0FBVztvQkFDbEIsV0FBVzs7O2dCQUdmLEdBQUcsMENBQTBDLFlBQU07b0JBQy9DLE9BQU8sWUFBQTt3QkFLUyxPQUxILGNBQWMsTUFBTTt1QkFBWTs7O2dCQUdqRCxHQUFHLHFDQUFxQyxZQUFNO29CQUMxQyxPQUFPLFlBQUE7d0JBT1MsT0FQSCxjQUFjO3VCQUFLOzs7O1lBSXhDLFNBQVMsbUNBQW1DLFlBQU07Z0JBQzlDLElBQUksMEJBQXVCO29CQUFFLGNBQVc7O2dCQUV4QyxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFDLDJCQUEyQixlQUFrQjtvQkFDNUQsY0FBYztvQkFDZCwwQkFBMEI7OztnQkFHOUIsU0FBUyxpQkFBaUIsbUJBQW1CO29CQUN6QyxJQUFJLFdBQVc7d0JBQ1gsa0JBQWtCO3dCQUNsQixtQkFBbUI7O29CQUV2QixPQUFPLFlBQVksbUNBQW1DLElBQUk7OztnQkFHOUQsU0FBUyx1QkFBdUIsWUFBTTtvQkFDbEMsR0FBRyxzRUFBc0UsWUFBTTt3QkFDM0UsSUFBSSxRQUFROzRCQUNSLFdBQVc7NEJBQ1gsUUFBUTs0QkFDUixVQUFVOzRCQUNWLE9BQU8saUJBQWlCOzt3QkFFNUIsTUFBTSx5QkFBeUIsb0NBQW9DLElBQUksWUFBWTt3QkFDbkYsS0FBSyxzQkFBc0IsT0FBTyxVQUFVO3dCQUM1QyxPQUFPLHdCQUF3QixrQ0FDMUIscUJBQXFCLFNBQVMsT0FBTyxVQUFVOzs7b0JBR3hELEdBQUcsOERBQThELFlBQU07d0JBQ25FLElBQUksY0FBVzs0QkFDWCxnQkFBZ0I7NEJBQ2hCLE9BQU8saUJBQWlCO3dCQUM1QixNQUFNLEtBQUssOEJBQThCLGlCQUFpQixZQUFZLElBQUksWUFBWTt3QkFDdEYsY0FBYyxLQUFLO3dCQUNuQixPQUFPLGFBQWEsUUFBUTs7OztnQkFJcEMsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRyxzRUFBc0UsWUFBTTt3QkFDM0UsSUFBSSxRQUFROzRCQUNSLFdBQVc7NEJBQ1gsUUFBUTs0QkFDUixVQUFVOzRCQUNWLE9BQU8saUJBQWlCOzt3QkFFNUIsTUFBTSx5QkFBeUIscUNBQXFDLElBQUksWUFBWTt3QkFDcEYsS0FBSyx1QkFBdUIsT0FBTyxVQUFVO3dCQUM3QyxPQUFPLHdCQUF3QixtQ0FDMUIscUJBQXFCLFNBQVMsT0FBTyxVQUFVOzs7b0JBR3hELEdBQUcsOERBQThELFlBQU07d0JBQ25FLElBQUksY0FBVzs0QkFDWCxnQkFBZ0I7NEJBQ2hCLE9BQU8saUJBQWlCO3dCQUM1QixNQUFNLEtBQUssK0JBQStCLGlCQUFpQixZQUFZLElBQUksWUFBWTt3QkFDdkYsY0FBYyxLQUFLO3dCQUNuQixPQUFPLGFBQWEsUUFBUTs7Ozs7O0dBYXJDIiwiZmlsZSI6ImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVJbmhlcml0YW5jZURpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgbWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSBmcm9tICdjb21tb24vbWFuYWdlZGF0dHJpYnV0ZS9NYW5hZ2VkQXR0cmlidXRlTW9kdWxlJztcblxuZGVzY3JpYmUoJ01hbmFnZWRBdHRyaWJ1dGVJbmhlcml0YW5jZURpcmVjdGl2ZScsICgpID0+IHtcblxuICAgIGxldCAkc2NvcGUsXG4gICAgICAgICRjb21waWxlO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlLCByZXNvdXJjZVVybCkge1xuICAgICAgICBsZXQgZWxlbWVudCxcbiAgICAgICAgICAgIGVsZW1lbnREZWYgPSAnPHNwLW1hbmFnZWQtYXR0cmlidXRlLWluaGVyaXRhbmNlICcgK1xuICAgICAgICAgICAgICAgICdzcC1tYW5hZ2VkLWF0dHJpYnV0ZT1cImZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGVcIicgK1xuICAgICAgICAgICAgICAgICdzcC1tYW5hZ2VkLWF0dHJpYnV0ZS1yZXNvdWNlLXVybD1cImZha2VDdHJsLnJlc291cmNlVXJsXCI+JyArXG4gICAgICAgICAgICAgICAgJzwvc3AtbWFuYWdlZC1hdHRyaWJ1dGUtaW5oZXJpdGFuY2U+JztcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlO1xuICAgICAgICAkc2NvcGUuZmFrZUN0cmwucmVzb3VyY2VVcmwgPSByZXNvdXJjZVVybDtcbiAgICAgICAgZWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50RGVmKTtcbiAgICAgICAgJGNvbXBpbGUoZWxlbWVudCkoJHNjb3BlKTtcbiAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oXyRyb290U2NvcGVfLCBfJGNvbXBpbGVfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRzY29wZS5mYWtlQ3RybCA9IHt9O1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgfSkpO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIG1hbmFnZWQgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudChudWxsLCAnc29tZXVybCcpKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gcmVzb3VyY2UgdXJsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY3JlYXRlRWxlbWVudCh7fSkpLnRvVGhyb3coKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZUluaGVyaXRhbmNlQ3RybCcsICgpID0+IHtcbiAgICBsZXQgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICRjb250cm9sbGVyO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfLCBfJGNvbnRyb2xsZXJfKSA9PiB7XG4gICAgICAgICRjb250cm9sbGVyID0gXyRjb250cm9sbGVyXztcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UgPSBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoZGV0YWlsUmVzb3VyY2VVcmwpIHtcbiAgICAgICAgbGV0IGJpbmRpbmdzID0ge1xuICAgICAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZToge30sXG4gICAgICAgICAgICBkZXRhaWxSZXNvdXJjZVVybDogZGV0YWlsUmVzb3VyY2VVcmxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuICRjb250cm9sbGVyKCdNYW5hZ2VkQXR0cmlidXRlSW5oZXJpdGFuY2VDdHJsJywge30sIGJpbmRpbmdzKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnaW5oZXJpdGFuY2UgcGFyZW50cycsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRocm91Z2ggdG8gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2Ugd2l0aCBjb3JyZWN0IHBhcmFtcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDEyLFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyID0gNixcbiAgICAgICAgICAgICAgICBvcmRlciA9ICdkZXNjJyxcbiAgICAgICAgICAgICAgICBiYXNlVXJsID0gJ2Jhc2VVcmwnLFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKGJhc2VVcmwpO1xuXG4gICAgICAgICAgICBzcHlPbihtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgJ2dldEVudGl0bGVtZW50SW5oZXJpdGFuY2VQYXJlbnRzJykuYW5kLnJldHVyblZhbHVlKHt9KTtcbiAgICAgICAgICAgIGN0cmwuZ2V0SW5oZXJpdGFuY2VQYXJlbnRzKHN0YXJ0LCBpdGVtc1Blciwgb3JkZXIpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50SW5oZXJpdGFuY2VQYXJlbnRzKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChiYXNlVXJsLCBzdGFydCwgaXRlbXNQZXIsIG9yZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gYSB2YWx1ZSBmcm9tIHRoZSB0YWJsZSBjb25maWdcXCdzIHBhZ2luZyBkYXRhJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFZhbHVlLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVmFsdWUgPSA4OTIxMzg5MTI4OTM0LFxuICAgICAgICAgICAgICAgIGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCcnKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwuaW5oZXJpdGFuY2VQYXJlbnRzVGFibGVDb25maWcuZ2V0UGFnaW5nRGF0YSgpLCAnZ2V0VG90YWwnKS5hbmQucmV0dXJuVmFsdWUoZXhwZWN0ZWRWYWx1ZSk7XG4gICAgICAgICAgICBhY3R1YWxWYWx1ZSA9IGN0cmwuZ2V0SW5oZXJpdGFuY2VQYXJlbnRzQ291bnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxWYWx1ZSkudG9FcXVhbChleHBlY3RlZFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnaW5oZXJpdGFuY2UgY2hpbGRyZW4nLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCB0aHJvdWdoIHRvIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlIHdpdGggY29ycmVjdCBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSAxMixcbiAgICAgICAgICAgICAgICBpdGVtc1BlciA9IDYsXG4gICAgICAgICAgICAgICAgb3JkZXIgPSAnZGVzYycsXG4gICAgICAgICAgICAgICAgYmFzZVVybCA9ICdiYXNlVXJsJyxcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcihiYXNlVXJsKTtcblxuICAgICAgICAgICAgc3B5T24obWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UsICdnZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlQ2hpbGRyZW4nKS5hbmQucmV0dXJuVmFsdWUoe30pO1xuICAgICAgICAgICAgY3RybC5nZXRJbmhlcml0YW5jZUNoaWxkcmVuKHN0YXJ0LCBpdGVtc1Blciwgb3JkZXIpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50SW5oZXJpdGFuY2VDaGlsZHJlbilcbiAgICAgICAgICAgICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoYmFzZVVybCwgc3RhcnQsIGl0ZW1zUGVyLCBvcmRlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgdmFsdWUgZnJvbSB0aGUgdGFibGUgY29uZmlnXFwncyBwYWdpbmcgZGF0YScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxWYWx1ZSxcbiAgICAgICAgICAgICAgICBleHBlY3RlZFZhbHVlID0gODkyMTM4OTEyODkzNCxcbiAgICAgICAgICAgICAgICBjdHJsID0gY3JlYXRlQ29udHJvbGxlcignJyk7XG4gICAgICAgICAgICBzcHlPbihjdHJsLmluaGVyaXRhbmNlQ2hpbGRyZW5UYWJsZUNvbmZpZy5nZXRQYWdpbmdEYXRhKCksICdnZXRUb3RhbCcpLmFuZC5yZXR1cm5WYWx1ZShleHBlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgIGFjdHVhbFZhbHVlID0gY3RybC5nZXRJbmhlcml0YW5jZUNoaWxkcmVuQ291bnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY3R1YWxWYWx1ZSkudG9FcXVhbChleHBlY3RlZFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
