System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeMembersDirective', function () {

                var $scope = undefined,
                    $compile = undefined,
                    $httpBackend = undefined,
                    managedAttribute = undefined,
                    managedAttributeResourceUrl = undefined,
                    configKey = 'uiAccountGroupMemberTableColumns',
                    baseUrl = '/ui/rest/configuration/uiconfig/entries?key=';

                function createElement(managedAttribute, managedAttributeResourceUrl) {
                    var element = undefined,
                        elementDef = '<sp-managed-attribute-members sp-managed-attribute="fakeCtrl.managedAttribute"' + 'sp-managed-attribute-resource-url="fakeCtrl.managedAttributeResourceUrl">' + '</sp-managed-attribute-memebers>';
                    $scope.fakeCtrl.managedAttribute = managedAttribute;
                    $scope.fakeCtrl.managedAttributeResourceUrl = managedAttributeResourceUrl;
                    element = angular.element(elementDef);
                    $compile(element)($scope);
                    $scope.$apply();
                    return element;
                }

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function (_$rootScope_, _$compile_, _$httpBackend_, DataTableDirectiveConfig) {
                    $scope = _$rootScope_.$new();
                    $scope.fakeCtrl = {};
                    $compile = _$compile_;
                    $httpBackend = _$httpBackend_;
                    managedAttribute = {};
                    managedAttributeResourceUrl = baseUrl + configKey;
                }));

                it('should throw with no managed attribute', function () {
                    expect(function () {
                        return createElement(null, managedAttributeResourceUrl);
                    }).toThrow('managedAttribute is required for ManagedAttributeMembersCtrl constructor');
                });

                it('should throw with no detail resource url', function () {
                    expect(function () {
                        return createElement(managedAttribute, null);
                    }).toThrow('managedAttributeResourceUrl is required for ManagedAttributeMembersCtrl constructor');
                });

                it('should display managed attribute data table', function () {
                    var element = undefined,
                        table = undefined;
                    $httpBackend.expectGET(managedAttributeResourceUrl).respond(200, {});
                    element = createElement(managedAttribute, managedAttributeResourceUrl);
                    table = element.find('sp-data-table');
                    expect(table.length).toEqual(1);
                });
            });

            describe('ManagedAttributeMembersCtrl', function () {
                var ctrl = undefined,
                    managedAttributeService = undefined,
                    managedAttributeResourceUrl = undefined,
                    configKey = 'uiAccountGroupMemberTableColumns',
                    baseUrl = '/ui/rest/configuration/uiconfig/entries?key=';

                beforeEach(module(managedAttributeModule));
                beforeEach(inject(function ($controller, _managedAttributeService_, DataTableDirectiveConfig) {
                    managedAttributeService = _managedAttributeService_;
                    ctrl = $controller('ManagedAttributeMembersCtrl');
                    managedAttributeResourceUrl = baseUrl + configKey;
                }));

                describe('getMembersDataTableConfig()', function () {
                    it('should get the member table config', function () {
                        var config = ctrl.getMembersDataTableConfig(),
                            configKey = 'uiAccountGroupMemberTableColumns';
                        expect(config.getColumnConfigKey()).toEqual(configKey);
                    });
                });

                describe('getMembers()', function () {
                    it('calls managedAttributeService.getEntitlementGroupMembers with correct params', function () {
                        var startIdx = 5,
                            itemsPerPage = 10,
                            sortOrder = 'whatever';
                        ctrl.managedAttributeResourceUrl = managedAttributeResourceUrl;
                        spyOn(managedAttributeService, 'getEntitlementGroupMembers');
                        ctrl.getMembers(startIdx, itemsPerPage, sortOrder);
                        expect(managedAttributeService.getEntitlementGroupMembers).toHaveBeenCalledWith(managedAttributeResourceUrl, startIdx, itemsPerPage, sortOrder);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNZW1iZXJzVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7SUFDOUc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLCtDQUErQztZQUNyRyx5QkFBeUIsOENBQThDOztRQUUzRSxTQUFTLFlBQVk7O1lBTDdCLFNBQVMsb0NBQW9DLFlBQVc7O2dCQUVwRCxJQUFJLFNBQU07b0JBQ04sV0FBUTtvQkFDUixlQUFZO29CQUNaLG1CQUFnQjtvQkFDaEIsOEJBQTJCO29CQUMzQixZQUFZO29CQUNaLFVBQVU7O2dCQUVkLFNBQVMsY0FBYyxrQkFBa0IsNkJBQTZCO29CQUNsRSxJQUFJLFVBQU87d0JBQ1AsYUFBYSxtRkFDVCw4RUFDQTtvQkFDUixPQUFPLFNBQVMsbUJBQW1CO29CQUNuQyxPQUFPLFNBQVMsOEJBQThCO29CQUM5QyxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsU0FBUyxTQUFTO29CQUNsQixPQUFPO29CQUNQLE9BQU87OztnQkFHWCxXQUFXLE9BQU87Z0JBQ2xCLFdBQVcsT0FBTyxVQUFTLGNBQWMsWUFBWSxnQkFBZ0IsMEJBQTBCO29CQUMzRixTQUFTLGFBQWE7b0JBQ3RCLE9BQU8sV0FBVztvQkFDbEIsV0FBVztvQkFDWCxlQUFlO29CQUNmLG1CQUFtQjtvQkFDbkIsOEJBQThCLFVBQVU7OztnQkFHNUMsR0FBRywwQ0FBMEMsWUFBTTtvQkFDL0MsT0FBTyxZQUFBO3dCQU1TLE9BTkgsY0FBYyxNQUFNO3VCQUM1QixRQUFROzs7Z0JBR2pCLEdBQUcsNENBQTRDLFlBQU07b0JBQ2pELE9BQU8sWUFBQTt3QkFPUyxPQVBILGNBQWMsa0JBQWtCO3VCQUN4QyxRQUFROzs7Z0JBR2pCLEdBQUcsK0NBQStDLFlBQU07b0JBQ3BELElBQUksVUFBTzt3QkFBRSxRQUFLO29CQUNsQixhQUFhLFVBQVUsNkJBQTZCLFFBQVEsS0FBSztvQkFDakUsVUFBVSxjQUFjLGtCQUFrQjtvQkFDMUMsUUFBUSxRQUFRLEtBQUs7b0JBQ3JCLE9BQU8sTUFBTSxRQUFRLFFBQVE7Ozs7WUFJckMsU0FBUywrQkFBK0IsWUFBTTtnQkFDMUMsSUFBSSxPQUFJO29CQUFFLDBCQUF1QjtvQkFDN0IsOEJBQTJCO29CQUMzQixZQUFZO29CQUNaLFVBQVU7O2dCQUVkLFdBQVcsT0FBTztnQkFDbEIsV0FBVyxPQUFPLFVBQUMsYUFBYSwyQkFBMkIsMEJBQTZCO29CQUNwRiwwQkFBMEI7b0JBQzFCLE9BQU8sWUFBWTtvQkFDbkIsOEJBQThCLFVBQVU7OztnQkFHNUMsU0FBUywrQkFBK0IsWUFBTTtvQkFDMUMsR0FBRyxzQ0FBc0MsWUFBVzt3QkFDaEQsSUFBSSxTQUFTLEtBQUs7NEJBQ2QsWUFBWTt3QkFDaEIsT0FBTyxPQUFPLHNCQUFzQixRQUFROzs7O2dCQUlwRCxTQUFTLGdCQUFnQixZQUFNO29CQUMzQixHQUFHLGdGQUFnRixZQUFNO3dCQUNyRixJQUFJLFdBQVc7NEJBQ1gsZUFBZTs0QkFDZixZQUFZO3dCQUNoQixLQUFLLDhCQUE4Qjt3QkFDbkMsTUFBTSx5QkFBeUI7d0JBQy9CLEtBQUssV0FBVyxVQUFVLGNBQWM7d0JBQ3hDLE9BQU8sd0JBQXdCLDRCQUMxQixxQkFBcUIsNkJBQTZCLFVBQVUsY0FBYzs7Ozs7O0dBY3hGIiwiZmlsZSI6ImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNZW1iZXJzVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBtYW5hZ2VkQXR0cmlidXRlTW9kdWxlIGZyb20gJ2NvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNb2R1bGUnO1xuXG5kZXNjcmliZSgnTWFuYWdlZEF0dHJpYnV0ZU1lbWJlcnNEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCAkc2NvcGUsXG4gICAgICAgICRjb21waWxlLFxuICAgICAgICAkaHR0cEJhY2tlbmQsXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGUsXG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVSZXNvdXJjZVVybCxcbiAgICAgICAgY29uZmlnS2V5ID0gJ3VpQWNjb3VudEdyb3VwTWVtYmVyVGFibGVDb2x1bW5zJyxcbiAgICAgICAgYmFzZVVybCA9ICcvdWkvcmVzdC9jb25maWd1cmF0aW9uL3VpY29uZmlnL2VudHJpZXM/a2V5PSc7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KG1hbmFnZWRBdHRyaWJ1dGUsIG1hbmFnZWRBdHRyaWJ1dGVSZXNvdXJjZVVybCkge1xuICAgICAgICBsZXQgZWxlbWVudCxcbiAgICAgICAgICAgIGVsZW1lbnREZWYgPSAnPHNwLW1hbmFnZWQtYXR0cmlidXRlLW1lbWJlcnMgc3AtbWFuYWdlZC1hdHRyaWJ1dGU9XCJmYWtlQ3RybC5tYW5hZ2VkQXR0cmlidXRlXCInICtcbiAgICAgICAgICAgICAgICAnc3AtbWFuYWdlZC1hdHRyaWJ1dGUtcmVzb3VyY2UtdXJsPVwiZmFrZUN0cmwubWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsXCI+JyArXG4gICAgICAgICAgICAgICAgJzwvc3AtbWFuYWdlZC1hdHRyaWJ1dGUtbWVtZWJlcnM+JztcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsLm1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlO1xuICAgICAgICAkc2NvcGUuZmFrZUN0cmwubWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsID0gbWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsO1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWYpO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKG1hbmFnZWRBdHRyaWJ1dGVNb2R1bGUpKTtcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF8kaHR0cEJhY2tlbmRfLCBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcpIHtcbiAgICAgICAgJHNjb3BlID0gXyRyb290U2NvcGVfLiRuZXcoKTtcbiAgICAgICAgJHNjb3BlLmZha2VDdHJsID0ge307XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGUgPSB7fTtcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsID0gYmFzZVVybCArIGNvbmZpZ0tleTtcbiAgICB9KSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gbWFuYWdlZCBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KG51bGwsIG1hbmFnZWRBdHRyaWJ1dGVSZXNvdXJjZVVybCkpXG4gICAgICAgICAgICAudG9UaHJvdygnbWFuYWdlZEF0dHJpYnV0ZSBpcyByZXF1aXJlZCBmb3IgTWFuYWdlZEF0dHJpYnV0ZU1lbWJlcnNDdHJsIGNvbnN0cnVjdG9yJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gZGV0YWlsIHJlc291cmNlIHVybCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUVsZW1lbnQobWFuYWdlZEF0dHJpYnV0ZSwgbnVsbCkpXG4gICAgICAgICAgICAudG9UaHJvdygnbWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsIGlzIHJlcXVpcmVkIGZvciBNYW5hZ2VkQXR0cmlidXRlTWVtYmVyc0N0cmwgY29uc3RydWN0b3InKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGlzcGxheSBtYW5hZ2VkIGF0dHJpYnV0ZSBkYXRhIHRhYmxlJywgKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCwgdGFibGU7XG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQobWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudChtYW5hZ2VkQXR0cmlidXRlLCBtYW5hZ2VkQXR0cmlidXRlUmVzb3VyY2VVcmwpO1xuICAgICAgICB0YWJsZSA9IGVsZW1lbnQuZmluZCgnc3AtZGF0YS10YWJsZScpO1xuICAgICAgICBleHBlY3QodGFibGUubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdNYW5hZ2VkQXR0cmlidXRlTWVtYmVyc0N0cmwnLCAoKSA9PiB7XG4gICAgbGV0IGN0cmwsIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLFxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlUmVzb3VyY2VVcmwsXG4gICAgICAgIGNvbmZpZ0tleSA9ICd1aUFjY291bnRHcm91cE1lbWJlclRhYmxlQ29sdW1ucycsXG4gICAgICAgIGJhc2VVcmwgPSAnL3VpL3Jlc3QvY29uZmlndXJhdGlvbi91aWNvbmZpZy9lbnRyaWVzP2tleT0nO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUobWFuYWdlZEF0dHJpYnV0ZU1vZHVsZSkpO1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KCgkY29udHJvbGxlciwgX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXywgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKSA9PiB7XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcbiAgICAgICAgY3RybCA9ICRjb250cm9sbGVyKCdNYW5hZ2VkQXR0cmlidXRlTWVtYmVyc0N0cmwnKTtcbiAgICAgICAgbWFuYWdlZEF0dHJpYnV0ZVJlc291cmNlVXJsID0gYmFzZVVybCArIGNvbmZpZ0tleTtcbiAgICB9KSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0TWVtYmVyc0RhdGFUYWJsZUNvbmZpZygpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIGdldCB0aGUgbWVtYmVyIHRhYmxlIGNvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGN0cmwuZ2V0TWVtYmVyc0RhdGFUYWJsZUNvbmZpZygpLFxuICAgICAgICAgICAgICAgIGNvbmZpZ0tleSA9ICd1aUFjY291bnRHcm91cE1lbWJlclRhYmxlQ29sdW1ucyc7XG4gICAgICAgICAgICBleHBlY3QoY29uZmlnLmdldENvbHVtbkNvbmZpZ0tleSgpKS50b0VxdWFsKGNvbmZpZ0tleSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldE1lbWJlcnMoKScsICgpID0+IHtcbiAgICAgICAgaXQoJ2NhbGxzIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50R3JvdXBNZW1iZXJzIHdpdGggY29ycmVjdCBwYXJhbXMnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhcnRJZHggPSA1LFxuICAgICAgICAgICAgICAgIGl0ZW1zUGVyUGFnZSA9IDEwLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9ICd3aGF0ZXZlcic7XG4gICAgICAgICAgICBjdHJsLm1hbmFnZWRBdHRyaWJ1dGVSZXNvdXJjZVVybCA9IG1hbmFnZWRBdHRyaWJ1dGVSZXNvdXJjZVVybDtcbiAgICAgICAgICAgIHNweU9uKG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLCAnZ2V0RW50aXRsZW1lbnRHcm91cE1lbWJlcnMnKTtcbiAgICAgICAgICAgIGN0cmwuZ2V0TWVtYmVycyhzdGFydElkeCwgaXRlbXNQZXJQYWdlLCBzb3J0T3JkZXIpO1xuICAgICAgICAgICAgZXhwZWN0KG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50R3JvdXBNZW1iZXJzKVxuICAgICAgICAgICAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aChtYW5hZ2VkQXR0cmlidXRlUmVzb3VyY2VVcmwsIHN0YXJ0SWR4LCBpdGVtc1BlclBhZ2UsIHNvcnRPcmRlcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
