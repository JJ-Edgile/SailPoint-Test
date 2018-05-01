System.register(['test/js/TestInitializer', 'common/dataview/grouping/GroupingModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var groupingModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewGroupingGroupingModule) {
            groupingModule = _commonDataviewGroupingGroupingModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('GroupBySelectorDirective', function () {
                var eltDef = '<sp-group-by-selector sp-column-configs="colConfigs" ' + 'sp-group-by-change-func="changeFunc(colConfig)" ' + 'sp-group-by="groupValue" />',
                    $compile = undefined,
                    $scope = undefined,
                    groupByElement = undefined,
                    groupByButton = undefined,
                    groupByLinks = undefined,
                    testService = undefined,
                    $q = undefined,
                    changeFuncReturn = undefined;

                beforeEach(module(testModule, groupingModule));

                beforeEach(inject(function (_$compile_, _ColumnConfig_, _$rootScope_, _testService_, _$q_) {
                    testService = _testService_;
                    $compile = _$compile_;
                    $scope = _$rootScope_.$new();
                    $q = _$q_;

                    $scope.groupValue = undefined;
                    $scope.changeFunc = testService.createPromiseSpy(false, {}, {}).and.callFake(function () {
                        return changeFuncReturn;
                    });
                    changeFuncReturn = $q.when();

                    $scope.colConfigs = [{
                        isSortable: function () {
                            return true;
                        },
                        dataIndex: 'groupByCol-A',
                        label: 'Col-A'
                    }, {
                        isSortable: function () {
                            return true;
                        },
                        dataIndex: 'groupByCol-B',
                        label: 'Col-B'
                    }, {
                        isSortable: function () {
                            return false;
                        },
                        dataIndex: 'groupByCol-C',
                        label: 'Col-C'
                    }];
                }));

                function createElement() {
                    var elt = angular.element(eltDef);
                    $compile(elt)($scope);
                    $scope.$apply();
                    return elt;
                }

                it('requires spColumnConfigs to be passed in', function () {
                    $scope.colConfigs = undefined;
                    expect(function () {
                        return createElement();
                    }).toThrow();
                });

                it('only sortable columns should be available for group by', function () {
                    groupByElement = createElement();
                    groupByLinks = groupByElement.find('a');
                    //one extra link for ungroup option
                    expect(groupByLinks.length).toBe(3);
                });

                it('has ungroup option', function () {
                    groupByElement = createElement();
                    groupByLinks = groupByElement.find('a');
                    expect(groupByLinks.last().text().indexOf('ui_data_table_ungroup')).not.toBeLessThan(0);
                });

                describe('when group by is toggled', function () {

                    function clickGroupBy() {
                        groupByButton = groupByElement.find('button');
                        groupByLinks = groupByElement.find('a');

                        // toggle a group by link
                        angular.element(groupByLinks[0]).click();
                    }

                    beforeEach(function () {
                        groupByElement = createElement();
                    });

                    it('should call callback func with correct column data and set value if resolves', function () {
                        clickGroupBy();
                        var newValue = $scope.colConfigs[0].dataIndex;
                        expect($scope.changeFunc).toHaveBeenCalledWith(newValue);
                        $scope.$apply();
                        expect($scope.groupValue).toEqual(newValue);
                    });

                    it('should have column label in button label', function () {
                        clickGroupBy();
                        if (groupByButton) {
                            expect(groupByButton.text().indexOf('ui_data_table_group_by_label')).not.toBeLessThan(0);
                        }
                        expect($scope.$$childHead.groupByCtrl.getGroupByLabel()).toEqual($scope.colConfigs[0].label);
                    });

                    it('should not set value if callback func returns rejected promise', function () {
                        changeFuncReturn = $q.reject();
                        clickGroupBy();
                        $scope.$apply();
                        expect($scope.groupValue).toEqual(undefined);
                    });

                    it('groupByBtn should have btn-success class', function () {
                        clickGroupBy();
                        if (groupByButton) {
                            expect(groupByButton.hasClass('btn-success')).toBe(true);
                            // one more toggle should remove the btn-success class
                            angular.element(groupByLinks[0]).click();
                            expect(groupByButton.hasClass('btn-success')).toBe(false);
                        }
                    });

                    it('groupByLink should have current-group-by class', function () {
                        clickGroupBy();
                        expect(angular.element(groupByLinks[0]).hasClass('current-group-by')).toBe(true);
                        clickGroupBy();
                        expect(angular.element(groupByLinks[0]).hasClass('current-group-by')).toBe(false);
                    });

                    it('click ungroup link should remove group by column selection', function () {
                        clickGroupBy();
                        // click ungroup link
                        angular.element(groupByLinks.last()).click();
                        $scope.$apply();
                        expect($scope.groupValue).toEqual(undefined);
                        if (groupByButton) {
                            expect(groupByButton.text().indexOf('ui_data_table_group_by')).not.toBeLessThan(0);
                        }
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy9ncm91cGluZy9Hcm91cEJ5U2VsZWN0b3JEaXJlY3RpdmVUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsMkNBQTJDLHVCQUF1QixVQUFVLFNBQVM7Ozs7SUFJN0g7O0lBRUEsSUFBSSxnQkFBZ0I7SUFDcEIsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsdUNBQXVDO1lBQzdGLGlCQUFpQixzQ0FBc0M7V0FDeEQsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFON0IsU0FBUyw0QkFBNEIsWUFBVztnQkFDNUMsSUFBSSxTQUFTLDBEQUNMLHFEQUNBO29CQUNKLFdBQVE7b0JBQUUsU0FBTTtvQkFBRSxpQkFBYztvQkFBRSxnQkFBYTtvQkFBRSxlQUFZO29CQUFFLGNBQVc7b0JBQUUsS0FBRTtvQkFBRSxtQkFBZ0I7O2dCQUVwRyxXQUFXLE9BQU8sWUFBWTs7Z0JBRTlCLFdBQVcsT0FBTyxVQUFTLFlBQVksZ0JBQWdCLGNBQWMsZUFBZSxNQUFNO29CQUN0RixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsU0FBUyxhQUFhO29CQUN0QixLQUFLOztvQkFFTCxPQUFPLGFBQWE7b0JBQ3BCLE9BQU8sYUFBYSxZQUFZLGlCQUFpQixPQUFPLElBQUksSUFDdkQsSUFBSSxTQUFTLFlBQUE7d0JBYUYsT0FiUTs7b0JBQ3hCLG1CQUFtQixHQUFHOztvQkFFdEIsT0FBTyxhQUFhLENBQ2hCO3dCQUNJLFlBQVksWUFBQTs0QkFjQSxPQWRNOzt3QkFDbEIsV0FBVzt3QkFDWCxPQUFPO3VCQUVYO3dCQUNJLFlBQVksWUFBQTs0QkFlQSxPQWZNOzt3QkFDbEIsV0FBVzt3QkFDWCxPQUFPO3VCQUVYO3dCQUNJLFlBQVksWUFBQTs0QkFnQkEsT0FoQk07O3dCQUNsQixXQUFXO3dCQUNYLE9BQU87Ozs7Z0JBTW5CLFNBQVMsZ0JBQWdCO29CQUNyQixJQUFJLE1BQU0sUUFBUSxRQUFRO29CQUMxQixTQUFTLEtBQUs7b0JBQ2QsT0FBTztvQkFDUCxPQUFPOzs7Z0JBR1gsR0FBRyw0Q0FBNEMsWUFBTTtvQkFDakQsT0FBTyxhQUFhO29CQUNwQixPQUFPLFlBQUE7d0JBZ0JTLE9BaEJIO3VCQUFpQjs7O2dCQUdsQyxHQUFHLDBEQUEwRCxZQUFNO29CQUMvRCxpQkFBaUI7b0JBQ2pCLGVBQWUsZUFBZSxLQUFLOztvQkFFbkMsT0FBTyxhQUFhLFFBQVEsS0FBSzs7O2dCQUdyQyxHQUFHLHNCQUFzQixZQUFNO29CQUMzQixpQkFBaUI7b0JBQ2pCLGVBQWUsZUFBZSxLQUFLO29CQUNuQyxPQUFPLGFBQWEsT0FBTyxPQUFPLFFBQVEsMEJBQTBCLElBQUksYUFBYTs7O2dCQUd6RixTQUFTLDRCQUE0QixZQUFNOztvQkFFdkMsU0FBUyxlQUFlO3dCQUNwQixnQkFBZ0IsZUFBZSxLQUFLO3dCQUNwQyxlQUFlLGVBQWUsS0FBSzs7O3dCQUduQyxRQUFRLFFBQVEsYUFBYSxJQUFJOzs7b0JBR3JDLFdBQVcsWUFBTTt3QkFDYixpQkFBaUI7OztvQkFHckIsR0FBRyxnRkFBZ0YsWUFBTTt3QkFDckY7d0JBQ0EsSUFBSSxXQUFXLE9BQU8sV0FBVyxHQUFHO3dCQUNwQyxPQUFPLE9BQU8sWUFBWSxxQkFBcUI7d0JBQy9DLE9BQU87d0JBQ1AsT0FBTyxPQUFPLFlBQVksUUFBUTs7O29CQUd0QyxHQUFHLDRDQUE0QyxZQUFNO3dCQUNqRDt3QkFDQSxJQUFJLGVBQWU7NEJBQ2YsT0FBTyxjQUFjLE9BQU8sUUFBUSxpQ0FBaUMsSUFBSSxhQUFhOzt3QkFFMUYsT0FBTyxPQUFPLFlBQVksWUFBWSxtQkFBbUIsUUFBUSxPQUFPLFdBQVcsR0FBRzs7O29CQUcxRixHQUFHLGtFQUFrRSxZQUFNO3dCQUN2RSxtQkFBbUIsR0FBRzt3QkFDdEI7d0JBQ0EsT0FBTzt3QkFDUCxPQUFPLE9BQU8sWUFBWSxRQUFROzs7b0JBR3RDLEdBQUcsNENBQTRDLFlBQU07d0JBQ2pEO3dCQUNBLElBQUksZUFBZTs0QkFDZixPQUFPLGNBQWMsU0FBUyxnQkFBZ0IsS0FBSzs7NEJBRW5ELFFBQVEsUUFBUSxhQUFhLElBQUk7NEJBQ2pDLE9BQU8sY0FBYyxTQUFTLGdCQUFnQixLQUFLOzs7O29CQUkzRCxHQUFHLGtEQUFrRCxZQUFNO3dCQUN2RDt3QkFDQSxPQUFPLFFBQVEsUUFBUSxhQUFhLElBQUksU0FBUyxxQkFBcUIsS0FBSzt3QkFDM0U7d0JBQ0EsT0FBTyxRQUFRLFFBQVEsYUFBYSxJQUFJLFNBQVMscUJBQXFCLEtBQUs7OztvQkFHL0UsR0FBRyw4REFBOEQsWUFBTTt3QkFDbkU7O3dCQUVBLFFBQVEsUUFBUSxhQUFhLFFBQVE7d0JBQ3JDLE9BQU87d0JBQ1AsT0FBTyxPQUFPLFlBQVksUUFBUTt3QkFDbEMsSUFBSSxlQUFlOzRCQUNmLE9BQU8sY0FBYyxPQUFPLFFBQVEsMkJBQTJCLElBQUksYUFBYTs7Ozs7OztHQXdCN0YiLCJmaWxlIjoiY29tbW9uL2RhdGF2aWV3L2dyb3VwaW5nL0dyb3VwQnlTZWxlY3RvckRpcmVjdGl2ZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNi4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgZ3JvdXBpbmdNb2R1bGUgZnJvbSAnY29tbW9uL2RhdGF2aWV3L2dyb3VwaW5nL0dyb3VwaW5nTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdHcm91cEJ5U2VsZWN0b3JEaXJlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgZWx0RGVmID0gJzxzcC1ncm91cC1ieS1zZWxlY3RvciBzcC1jb2x1bW4tY29uZmlncz1cImNvbENvbmZpZ3NcIiAnICtcbiAgICAgICAgICAgICdzcC1ncm91cC1ieS1jaGFuZ2UtZnVuYz1cImNoYW5nZUZ1bmMoY29sQ29uZmlnKVwiICcgK1xuICAgICAgICAgICAgJ3NwLWdyb3VwLWJ5PVwiZ3JvdXBWYWx1ZVwiIC8+JyxcbiAgICAgICAgJGNvbXBpbGUsICRzY29wZSwgZ3JvdXBCeUVsZW1lbnQsIGdyb3VwQnlCdXR0b24sIGdyb3VwQnlMaW5rcywgdGVzdFNlcnZpY2UsICRxLCBjaGFuZ2VGdW5jUmV0dXJuO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSwgZ3JvdXBpbmdNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kY29tcGlsZV8sIF9Db2x1bW5Db25maWdfLCBfJHJvb3RTY29wZV8sIF90ZXN0U2VydmljZV8sIF8kcV8pIHtcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29tcGlsZSA9IF8kY29tcGlsZV87XG4gICAgICAgICRzY29wZSA9IF8kcm9vdFNjb3BlXy4kbmV3KCk7XG4gICAgICAgICRxID0gXyRxXztcblxuICAgICAgICAkc2NvcGUuZ3JvdXBWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgJHNjb3BlLmNoYW5nZUZ1bmMgPSB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlU3B5KGZhbHNlLCB7fSwge30pXG4gICAgICAgICAgICAuYW5kLmNhbGxGYWtlKCgpID0+IGNoYW5nZUZ1bmNSZXR1cm4pO1xuICAgICAgICBjaGFuZ2VGdW5jUmV0dXJuID0gJHEud2hlbigpO1xuXG4gICAgICAgICRzY29wZS5jb2xDb25maWdzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzU29ydGFibGU6ICgpID0+IHRydWUsXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZ3JvdXBCeUNvbC1BJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvbC1BJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc1NvcnRhYmxlOiAoKSA9PiB0cnVlLFxuICAgICAgICAgICAgICAgIGRhdGFJbmRleDogJ2dyb3VwQnlDb2wtQicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdDb2wtQidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNTb3J0YWJsZTogKCkgPT4gZmFsc2UsXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiAnZ3JvdXBCeUNvbC1DJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0NvbC1DJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgbGV0IGVsdCA9IGFuZ3VsYXIuZWxlbWVudChlbHREZWYpO1xuICAgICAgICAkY29tcGlsZShlbHQpKCRzY29wZSk7XG4gICAgICAgICRzY29wZS4kYXBwbHkoKTtcbiAgICAgICAgcmV0dXJuIGVsdDtcbiAgICB9XG5cbiAgICBpdCgncmVxdWlyZXMgc3BDb2x1bW5Db25maWdzIHRvIGJlIHBhc3NlZCBpbicsICgpID0+IHtcbiAgICAgICAgJHNjb3BlLmNvbENvbmZpZ3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIGV4cGVjdCgoKSA9PiBjcmVhdGVFbGVtZW50KCkpLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdvbmx5IHNvcnRhYmxlIGNvbHVtbnMgc2hvdWxkIGJlIGF2YWlsYWJsZSBmb3IgZ3JvdXAgYnknLCAoKSA9PiB7XG4gICAgICAgIGdyb3VwQnlFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICBncm91cEJ5TGlua3MgPSBncm91cEJ5RWxlbWVudC5maW5kKCdhJyk7XG4gICAgICAgIC8vb25lIGV4dHJhIGxpbmsgZm9yIHVuZ3JvdXAgb3B0aW9uXG4gICAgICAgIGV4cGVjdChncm91cEJ5TGlua3MubGVuZ3RoKS50b0JlKDMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhcyB1bmdyb3VwIG9wdGlvbicsICgpID0+IHtcbiAgICAgICAgZ3JvdXBCeUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCk7XG4gICAgICAgIGdyb3VwQnlMaW5rcyA9IGdyb3VwQnlFbGVtZW50LmZpbmQoJ2EnKTtcbiAgICAgICAgZXhwZWN0KGdyb3VwQnlMaW5rcy5sYXN0KCkudGV4dCgpLmluZGV4T2YoJ3VpX2RhdGFfdGFibGVfdW5ncm91cCcpKS5ub3QudG9CZUxlc3NUaGFuKDApO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3doZW4gZ3JvdXAgYnkgaXMgdG9nZ2xlZCcsICgpID0+IHtcblxuICAgICAgICBmdW5jdGlvbiBjbGlja0dyb3VwQnkoKSB7XG4gICAgICAgICAgICBncm91cEJ5QnV0dG9uID0gZ3JvdXBCeUVsZW1lbnQuZmluZCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBncm91cEJ5TGlua3MgPSBncm91cEJ5RWxlbWVudC5maW5kKCdhJyk7XG5cbiAgICAgICAgICAgIC8vIHRvZ2dsZSBhIGdyb3VwIGJ5IGxpbmtcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChncm91cEJ5TGlua3NbMF0pLmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGdyb3VwQnlFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgY2FsbGJhY2sgZnVuYyB3aXRoIGNvcnJlY3QgY29sdW1uIGRhdGEgYW5kIHNldCB2YWx1ZSBpZiByZXNvbHZlcycsICgpID0+IHtcbiAgICAgICAgICAgIGNsaWNrR3JvdXBCeSgpO1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gJHNjb3BlLmNvbENvbmZpZ3NbMF0uZGF0YUluZGV4O1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5jaGFuZ2VGdW5jKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChuZXdWYWx1ZSk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmdyb3VwVmFsdWUpLnRvRXF1YWwobmV3VmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGhhdmUgY29sdW1uIGxhYmVsIGluIGJ1dHRvbiBsYWJlbCcsICgpID0+IHtcbiAgICAgICAgICAgIGNsaWNrR3JvdXBCeSgpO1xuICAgICAgICAgICAgaWYgKGdyb3VwQnlCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoZ3JvdXBCeUJ1dHRvbi50ZXh0KCkuaW5kZXhPZigndWlfZGF0YV90YWJsZV9ncm91cF9ieV9sYWJlbCcpKS5ub3QudG9CZUxlc3NUaGFuKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS4kJGNoaWxkSGVhZC5ncm91cEJ5Q3RybC5nZXRHcm91cEJ5TGFiZWwoKSkudG9FcXVhbCgkc2NvcGUuY29sQ29uZmlnc1swXS5sYWJlbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHNldCB2YWx1ZSBpZiBjYWxsYmFjayBmdW5jIHJldHVybnMgcmVqZWN0ZWQgcHJvbWlzZScsICgpID0+IHtcbiAgICAgICAgICAgIGNoYW5nZUZ1bmNSZXR1cm4gPSAkcS5yZWplY3QoKTtcbiAgICAgICAgICAgIGNsaWNrR3JvdXBCeSgpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KCRzY29wZS5ncm91cFZhbHVlKS50b0VxdWFsKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdncm91cEJ5QnRuIHNob3VsZCBoYXZlIGJ0bi1zdWNjZXNzIGNsYXNzJywgKCkgPT4ge1xuICAgICAgICAgICAgY2xpY2tHcm91cEJ5KCk7XG4gICAgICAgICAgICBpZiAoZ3JvdXBCeUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGV4cGVjdChncm91cEJ5QnV0dG9uLmhhc0NsYXNzKCdidG4tc3VjY2VzcycpKS50b0JlKHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIG9uZSBtb3JlIHRvZ2dsZSBzaG91bGQgcmVtb3ZlIHRoZSBidG4tc3VjY2VzcyBjbGFzc1xuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudChncm91cEJ5TGlua3NbMF0pLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGdyb3VwQnlCdXR0b24uaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzJykpLnRvQmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZ3JvdXBCeUxpbmsgc2hvdWxkIGhhdmUgY3VycmVudC1ncm91cC1ieSBjbGFzcycsICgpID0+IHtcbiAgICAgICAgICAgIGNsaWNrR3JvdXBCeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFuZ3VsYXIuZWxlbWVudChncm91cEJ5TGlua3NbMF0pLmhhc0NsYXNzKCdjdXJyZW50LWdyb3VwLWJ5JykpLnRvQmUodHJ1ZSk7XG4gICAgICAgICAgICBjbGlja0dyb3VwQnkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhbmd1bGFyLmVsZW1lbnQoZ3JvdXBCeUxpbmtzWzBdKS5oYXNDbGFzcygnY3VycmVudC1ncm91cC1ieScpKS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2NsaWNrIHVuZ3JvdXAgbGluayBzaG91bGQgcmVtb3ZlIGdyb3VwIGJ5IGNvbHVtbiBzZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBjbGlja0dyb3VwQnkoKTtcbiAgICAgICAgICAgIC8vIGNsaWNrIHVuZ3JvdXAgbGlua1xuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGdyb3VwQnlMaW5rcy5sYXN0KCkpLmNsaWNrKCk7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoJHNjb3BlLmdyb3VwVmFsdWUpLnRvRXF1YWwodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIGlmIChncm91cEJ5QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGdyb3VwQnlCdXR0b24udGV4dCgpLmluZGV4T2YoJ3VpX2RhdGFfdGFibGVfZ3JvdXBfYnknKSkubm90LnRvQmVMZXNzVGhhbigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
