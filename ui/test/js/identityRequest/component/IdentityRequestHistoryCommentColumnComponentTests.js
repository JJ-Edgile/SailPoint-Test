System.register(['test/js/TestInitializer', 'identityRequest/IdentityRequestModule'], function (_export) {
    /* (c) Copyright 2017 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var identityRequestModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityRequestIdentityRequestModule) {
            identityRequestModule = _identityRequestIdentityRequestModule['default'];
        }],
        execute: function () {

            describe('spIdentityRequestHistoryCommentColumn', function () {

                var elementDefinition = '<sp-identity-request-history-comment-column sp-model="item"\n            sp-column-config="columnConfig" />',
                    $scope = undefined,
                    $compile = undefined,
                    $componentController = undefined,
                    element = undefined,
                    item = undefined,
                    identityRequestTestData = undefined,
                    ColumnConfig = undefined,
                    columnConfig = undefined;

                beforeEach(module(identityRequestModule));

                beforeEach(inject(function (_$rootScope_, _$compile_, _identityRequestTestData_, _$componentController_, _ColumnConfig_) {
                    $scope = _$rootScope_.$new();
                    $compile = _$compile_;
                    $componentController = _$componentController_;
                    identityRequestTestData = _identityRequestTestData_;
                    item = identityRequestTestData.IDENTITY_REQUEST_APPROVAL_SUMMARY_1;
                    ColumnConfig = _ColumnConfig_;
                    columnConfig = new ColumnConfig({ dataIndex: '1' });
                }));

                afterEach(function () {
                    if (element) {
                        angular.element(element).remove();
                    }
                });

                function createElement(item, columnConfig) {
                    element = angular.element(elementDefinition);
                    $scope.item = item;
                    $scope.columnConfig = columnConfig;
                    $compile(element)($scope);
                    $scope.$apply();
                }

                describe('controller', function () {
                    function createController() {
                        var bindings = {
                            item: item,
                            columnConfig: columnConfig
                        };
                        var ctrl = $componentController('spIdentityRequestHistoryCommentColumn', null, bindings);
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

                describe('comment details', function () {

                    it('displays comment details', function () {
                        createElement(item, columnConfig);
                        var commentElement = angular.element(element);
                        var icons = commentElement.find('i');
                        expect(icons.length).toEqual(2);
                        expect(icons[0].classList.contains('fa-user')).toEqual(true);
                        expect(icons[1].classList.contains('fa-clock-o')).toEqual(true);
                        var spanElements = commentElement.find('span');
                        expect(spanElements[0].innerText.trim()).toEqual(item.comments[0].comment);
                        expect(spanElements[1].innerText.trim()).toEqual(item.comments[0].author);
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5UmVxdWVzdC9jb21wb25lbnQvSWRlbnRpdHlSZXF1ZXN0SGlzdG9yeUNvbW1lbnRDb2x1bW5Db21wb25lbnRUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMENBQTBDLFVBQVUsU0FBUzs7O0lBR3JHOztJQUVBLElBQUk7SUFDSixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSx1Q0FBdUM7WUFDN0Ysd0JBQXdCLHNDQUFzQzs7UUFFbEUsU0FBUyxZQUFZOztZQUw3QixTQUFTLHlDQUF5QyxZQUFXOztnQkFFekQsSUFBSSxvQkFBaUI7b0JBR2pCLFNBQU07b0JBQUUsV0FBUTtvQkFBRSx1QkFBb0I7b0JBQUUsVUFBTztvQkFBRSxPQUFJO29CQUFFLDBCQUF1QjtvQkFDOUUsZUFBWTtvQkFBRSxlQUFZOztnQkFFOUIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsY0FBYyxZQUFZLDJCQUNqRCx3QkFBd0IsZ0JBQWdCO29CQUN4QyxTQUFTLGFBQWE7b0JBQ3RCLFdBQVc7b0JBQ1gsdUJBQXVCO29CQUN2QiwwQkFBMEI7b0JBQzFCLE9BQU8sd0JBQXdCO29CQUMvQixlQUFlO29CQUNmLGVBQWUsSUFBSSxhQUFhLEVBQUMsV0FBVzs7O2dCQUloRCxVQUFVLFlBQU07b0JBQ1osSUFBSSxTQUFTO3dCQUNULFFBQVEsUUFBUSxTQUFTOzs7O2dCQUlqQyxTQUFTLGNBQWMsTUFBTSxjQUFjO29CQUN2QyxVQUFVLFFBQVEsUUFBUTtvQkFDMUIsT0FBTyxPQUFPO29CQUNkLE9BQU8sZUFBZTtvQkFDdEIsU0FBUyxTQUFTO29CQUNsQixPQUFPOzs7Z0JBR1gsU0FBUyxjQUFjLFlBQU07b0JBQ3pCLFNBQVMsbUJBQW1CO3dCQUN4QixJQUFJLFdBQVc7NEJBQ1gsTUFBTTs0QkFDTixjQUFjOzt3QkFFbEIsSUFBSSxPQUFPLHFCQUNQLHlDQUF5QyxNQUFNO3dCQUNuRCxLQUFLO3dCQUNMLE9BQU87OztvQkFHWCxHQUFHLDBCQUEwQixZQUFNO3dCQUMvQixPQUFPO3dCQUNQLE9BQU8sWUFBQTs0QkFTUyxPQVRIOzJCQUFvQjs7O29CQUdyQyxHQUFHLGdDQUFnQyxZQUFNO3dCQUNyQyxlQUFlO3dCQUNmLE9BQU8sWUFBQTs0QkFXUyxPQVhIOzJCQUFvQjs7OztnQkFJekMsU0FBUyxtQkFBbUIsWUFBTTs7b0JBRTlCLEdBQUcsNEJBQTRCLFlBQU07d0JBQ2pDLGNBQWMsTUFBTTt3QkFDcEIsSUFBSSxpQkFBaUIsUUFBUSxRQUFRO3dCQUNyQyxJQUFJLFFBQVEsZUFBZSxLQUFLO3dCQUNoQyxPQUFPLE1BQU0sUUFBUSxRQUFRO3dCQUM3QixPQUFPLE1BQU0sR0FBRyxVQUFVLFNBQVMsWUFBWSxRQUFRO3dCQUN2RCxPQUFPLE1BQU0sR0FBRyxVQUFVLFNBQVMsZUFBZSxRQUFRO3dCQUMxRCxJQUFJLGVBQWUsZUFBZSxLQUFLO3dCQUN2QyxPQUFPLGFBQWEsR0FBRyxVQUFVLFFBQVEsUUFBUSxLQUFLLFNBQVMsR0FBRzt3QkFDbEUsT0FBTyxhQUFhLEdBQUcsVUFBVSxRQUFRLFFBQVEsS0FBSyxTQUFTLEdBQUc7Ozs7OztHQWtCM0UiLCJmaWxlIjoiaWRlbnRpdHlSZXF1ZXN0L2NvbXBvbmVudC9JZGVudGl0eVJlcXVlc3RIaXN0b3J5Q29tbWVudENvbHVtbkNvbXBvbmVudFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogKGMpIENvcHlyaWdodCAyMDE3IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGlkZW50aXR5UmVxdWVzdE1vZHVsZSBmcm9tICdpZGVudGl0eVJlcXVlc3QvSWRlbnRpdHlSZXF1ZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ3NwSWRlbnRpdHlSZXF1ZXN0SGlzdG9yeUNvbW1lbnRDb2x1bW4nLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBlbGVtZW50RGVmaW5pdGlvbiA9XG4gICAgICAgIGA8c3AtaWRlbnRpdHktcmVxdWVzdC1oaXN0b3J5LWNvbW1lbnQtY29sdW1uIHNwLW1vZGVsPVwiaXRlbVwiXG4gICAgICAgICAgICBzcC1jb2x1bW4tY29uZmlnPVwiY29sdW1uQ29uZmlnXCIgLz5gLFxuICAgICAgICAkc2NvcGUsICRjb21waWxlLCAkY29tcG9uZW50Q29udHJvbGxlciwgZWxlbWVudCwgaXRlbSwgaWRlbnRpdHlSZXF1ZXN0VGVzdERhdGEsXG4gICAgICAgIENvbHVtbkNvbmZpZywgY29sdW1uQ29uZmlnO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoaWRlbnRpdHlSZXF1ZXN0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHJvb3RTY29wZV8sIF8kY29tcGlsZV8sIF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV8sXG4gICAgICAgIF8kY29tcG9uZW50Q29udHJvbGxlcl8sIF9Db2x1bW5Db25maWdfKSB7XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRjb21waWxlID0gXyRjb21waWxlXztcbiAgICAgICAgJGNvbXBvbmVudENvbnRyb2xsZXIgPSBfJGNvbXBvbmVudENvbnRyb2xsZXJfO1xuICAgICAgICBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YSA9IF9pZGVudGl0eVJlcXVlc3RUZXN0RGF0YV87XG4gICAgICAgIGl0ZW0gPSBpZGVudGl0eVJlcXVlc3RUZXN0RGF0YS5JREVOVElUWV9SRVFVRVNUX0FQUFJPVkFMX1NVTU1BUllfMTtcbiAgICAgICAgQ29sdW1uQ29uZmlnID0gX0NvbHVtbkNvbmZpZ187XG4gICAgICAgIGNvbHVtbkNvbmZpZyA9IG5ldyBDb2x1bW5Db25maWcoe2RhdGFJbmRleDogJzEnfSk7XG5cbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGl0ZW0sIGNvbHVtbkNvbmZpZykge1xuICAgICAgICBlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KGVsZW1lbnREZWZpbml0aW9uKTtcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBpdGVtO1xuICAgICAgICAkc2NvcGUuY29sdW1uQ29uZmlnID0gY29sdW1uQ29uZmlnO1xuICAgICAgICAkY29tcGlsZShlbGVtZW50KSgkc2NvcGUpO1xuICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2NvbnRyb2xsZXInLCAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICAgICBsZXQgYmluZGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgICBjb2x1bW5Db25maWc6IGNvbHVtbkNvbmZpZ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBjdHJsID0gJGNvbXBvbmVudENvbnRyb2xsZXIoXG4gICAgICAgICAgICAgICAgJ3NwSWRlbnRpdHlSZXF1ZXN0SGlzdG9yeUNvbW1lbnRDb2x1bW4nLCBudWxsLCBiaW5kaW5ncyk7XG4gICAgICAgICAgICBjdHJsLiRvbkluaXQoKTtcbiAgICAgICAgICAgIHJldHVybiBjdHJsO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGFuIGl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtID0gbnVsbDtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVDb250cm9sbGVyKCkpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRob3V0IGNvbHVtbiBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb2x1bW5Db25maWcgPSBudWxsO1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGNyZWF0ZUNvbnRyb2xsZXIoKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb21tZW50IGRldGFpbHMnLCAoKSA9PiB7XG5cbiAgICAgICAgaXQoJ2Rpc3BsYXlzIGNvbW1lbnQgZGV0YWlscycsICgpID0+IHtcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoaXRlbSwgY29sdW1uQ29uZmlnKTtcbiAgICAgICAgICAgIGxldCBjb21tZW50RWxlbWVudCA9IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBpY29ucyA9IGNvbW1lbnRFbGVtZW50LmZpbmQoJ2knKTtcbiAgICAgICAgICAgIGV4cGVjdChpY29ucy5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgICAgICBleHBlY3QoaWNvbnNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS11c2VyJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBleHBlY3QoaWNvbnNbMV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYS1jbG9jay1vJykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICBsZXQgc3BhbkVsZW1lbnRzID0gY29tbWVudEVsZW1lbnQuZmluZCgnc3BhbicpO1xuICAgICAgICAgICAgZXhwZWN0KHNwYW5FbGVtZW50c1swXS5pbm5lclRleHQudHJpbSgpKS50b0VxdWFsKGl0ZW0uY29tbWVudHNbMF0uY29tbWVudCk7XG4gICAgICAgICAgICBleHBlY3Qoc3BhbkVsZW1lbnRzWzFdLmlubmVyVGV4dC50cmltKCkpLnRvRXF1YWwoaXRlbS5jb21tZW50c1swXS5hdXRob3IpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
