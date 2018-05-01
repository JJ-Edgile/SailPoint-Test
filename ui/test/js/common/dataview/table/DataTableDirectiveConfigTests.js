System.register(['test/js/TestInitializer', 'common/dataview/table/TableModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    /**
     * Tests for the DataTableDirectiveConfig model object
     */
    'use strict';

    var tableModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonDataviewTableTableModule) {
            tableModule = _commonDataviewTableTableModule['default'];
        }],
        execute: function () {
            describe('DataTableDirectiveConfig', function () {
                var DataTableDirectiveConfig = undefined,
                    PageState = undefined,
                    PagingData = undefined,
                    SortOrder = undefined,
                    config = undefined;

                beforeEach(module(tableModule));

                beforeEach(inject(function (_DataTableDirectiveConfig_, _PagingData_, _PageState_, _SortOrder_) {
                    DataTableDirectiveConfig = _DataTableDirectiveConfig_;
                    PagingData = _PagingData_;
                    PageState = _PageState_;
                    SortOrder = _SortOrder_;
                }));

                it('throws when columnConfigKey is not provided', function () {
                    function errorWrapper() {
                        config = new DataTableDirectiveConfig();
                    }

                    expect(errorWrapper).toThrow();
                });

                it('should create expected elements when constructed with only a columnConfigKey', function () {
                    var columnConfigKey = 'testColumnConfigKey';

                    config = new DataTableDirectiveConfig({
                        columnConfigKey: columnConfigKey
                    });

                    expect(config.getColumnConfigKey()).toEqual(columnConfigKey);
                    expect(config.refreshTrigger).toBeDefined();
                    expect(config.pageState).toBeDefined();
                    expect(config.pageState.pagingData.getItemsPerPage()).toBe(10);
                    // header options should default to false if not specified in constructor
                    expect(config.headerEnabled).toBe(false);
                    expect(config.columnsBtnEnabled).toBe(false);
                    expect(config.pagingInfoEnabled).toBe(false);
                    // filter title should only be defined when specified in constructor
                    expect(config.filterTitle).not.toBeDefined();
                    // checkbox is only defined when provided in constructor
                    expect(config.checkboxMultiSelect).not.toBeDefined();
                    expect(config.enableGroupBy).toBe(false);
                    expect(config.showSectionHeaderLabel).toBe(false);
                    expect(config.groupByColumn).not.toBeDefined();
                    expect(config.hideFooter).toBeFalsy();
                });

                it('should create expected elements when given all the constructor arguments', function () {
                    var columnConfigKey = 'testColumnConfigKey',
                        testCheckBox = {
                        attach: jasmine.createSpy('attach')
                    },
                        testTitle = 'testFilterPanelTitle',
                        testItemsPerPage = 200,
                        testGroupByColumn = 'groupByCol',
                        testFilters = [{ some: 'thing' }],
                        testSearchFunc = jasmine.createSpy('preSearchFunc'),
                        pageSizes = [1, 3, 5],
                        defaultSort = new SortOrder('column', SortOrder.ORDER_ASC);

                    config = new DataTableDirectiveConfig({
                        columnConfigKey: columnConfigKey,
                        checkboxMultiSelect: testCheckBox,
                        headerEnabled: true,
                        columnsBtnEnabled: true,
                        pagingInfoEnabled: true,
                        filterTitle: testTitle,
                        itemsPerPage: testItemsPerPage,
                        filters: testFilters,
                        enableGroupBy: true,
                        groupByColumn: testGroupByColumn,
                        hideFooter: true,
                        preSearchFunc: testSearchFunc,
                        pageState: new PageState(new PagingData(100)),
                        pageSizes: pageSizes,
                        defaultSort: defaultSort
                    });

                    expect(config.getColumnConfigKey()).toEqual(columnConfigKey);
                    expect(config.refreshTrigger).toBeDefined();
                    expect(config.pageState).toBeDefined();
                    // header options should be set to true from the constructor
                    expect(config.headerEnabled).toBe(true);
                    expect(config.columnsBtnEnabled).toBe(true);
                    expect(config.pagingInfoEnabled).toBe(true);
                    expect(config.filterTitle).toEqual(testTitle);
                    expect(config.checkboxMultiSelect).toBeDefined();
                    expect(config.filters).toEqual(testFilters);
                    expect(config.enableGroupBy).toBe(true);
                    expect(config.showSectionHeaderLabel).toBe(true);
                    expect(config.groupByColumn).toEqual(testGroupByColumn);
                    expect(config.hideFooter).toBeTruthy();
                    expect(config.preSearchFunc).toEqual(testSearchFunc);
                    expect(config.pageState.pagingData.itemsPerPage === 100);
                    expect(config.pageSizes).toEqual(pageSizes);
                    expect(config.pageState.sortOrder).toEqual(defaultSort);
                });

                it('should create expected pageState when passed in', function () {
                    var columnConfigKey = 'testColumnConfigKey';

                    var pageState = new PageState(new PagingData(100));
                    pageState.setSort('name', true);

                    config = new DataTableDirectiveConfig({
                        columnConfigKey: columnConfigKey,
                        pageState: pageState
                    });
                    expect(config.pageState.pagingData.itemsPerPage === 100);
                    expect(config.pageState.sortOrder.isSortAscending() === true);
                    expect(config.pageState.sortOrder.getSortProperty() === 'name');
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9kYXRhdmlldy90YWJsZS9EYXRhVGFibGVEaXJlY3RpdmVDb25maWdUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsc0NBQXNDLFVBQVUsU0FBUzs7Ozs7Ozs7SUFRakc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLGlDQUFpQztZQUN2RixjQUFjLGdDQUFnQzs7UUFFbEQsU0FBUyxZQUFZO1lBTjdCLFNBQVMsNEJBQTRCLFlBQVc7Z0JBQzVDLElBQUksMkJBQXdCO29CQUFFLFlBQVM7b0JBQUUsYUFBVTtvQkFBRSxZQUFTO29CQUFFLFNBQU07O2dCQUV0RSxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyw0QkFBNEIsY0FBYyxhQUFhLGFBQWE7b0JBQzNGLDJCQUEyQjtvQkFDM0IsYUFBYTtvQkFDYixZQUFZO29CQUNaLFlBQVk7OztnQkFHaEIsR0FBRywrQ0FBK0MsWUFBVztvQkFDekQsU0FBUyxlQUFlO3dCQUNwQixTQUFTLElBQUk7OztvQkFHakIsT0FBTyxjQUFjOzs7Z0JBR3pCLEdBQUcsZ0ZBQWdGLFlBQVc7b0JBQzFGLElBQUksa0JBQWtCOztvQkFFdEIsU0FBUyxJQUFJLHlCQUF5Qjt3QkFDbEMsaUJBQWlCOzs7b0JBR3JCLE9BQU8sT0FBTyxzQkFBc0IsUUFBUTtvQkFDNUMsT0FBTyxPQUFPLGdCQUFnQjtvQkFDOUIsT0FBTyxPQUFPLFdBQVc7b0JBQ3pCLE9BQU8sT0FBTyxVQUFVLFdBQVcsbUJBQW1CLEtBQUs7O29CQUUzRCxPQUFPLE9BQU8sZUFBZSxLQUFLO29CQUNsQyxPQUFPLE9BQU8sbUJBQW1CLEtBQUs7b0JBQ3RDLE9BQU8sT0FBTyxtQkFBbUIsS0FBSzs7b0JBRXRDLE9BQU8sT0FBTyxhQUFhLElBQUk7O29CQUUvQixPQUFPLE9BQU8scUJBQXFCLElBQUk7b0JBQ3ZDLE9BQU8sT0FBTyxlQUFlLEtBQUs7b0JBQ2xDLE9BQU8sT0FBTyx3QkFBd0IsS0FBSztvQkFDM0MsT0FBTyxPQUFPLGVBQWUsSUFBSTtvQkFDakMsT0FBTyxPQUFPLFlBQVk7OztnQkFHOUIsR0FBRyw0RUFBNEUsWUFBVztvQkFDdEYsSUFBSSxrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ1gsUUFBUSxRQUFRLFVBQVU7O3dCQUU5QixZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3dCQUNwQixjQUFjLENBQUMsRUFBRSxNQUFNO3dCQUN2QixpQkFBaUIsUUFBUSxVQUFVO3dCQUNuQyxZQUFZLENBQUMsR0FBRyxHQUFHO3dCQUNuQixjQUFjLElBQUksVUFBVSxVQUFVLFVBQVU7O29CQUVwRCxTQUFTLElBQUkseUJBQXlCO3dCQUNsQyxpQkFBaUI7d0JBQ2pCLHFCQUFxQjt3QkFDckIsZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYixjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsZUFBZTt3QkFDZixlQUFlO3dCQUNmLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixXQUFXLElBQUksVUFBVSxJQUFJLFdBQVc7d0JBQ3hDLFdBQVc7d0JBQ1gsYUFBYTs7O29CQUdqQixPQUFPLE9BQU8sc0JBQXNCLFFBQVE7b0JBQzVDLE9BQU8sT0FBTyxnQkFBZ0I7b0JBQzlCLE9BQU8sT0FBTyxXQUFXOztvQkFFekIsT0FBTyxPQUFPLGVBQWUsS0FBSztvQkFDbEMsT0FBTyxPQUFPLG1CQUFtQixLQUFLO29CQUN0QyxPQUFPLE9BQU8sbUJBQW1CLEtBQUs7b0JBQ3RDLE9BQU8sT0FBTyxhQUFhLFFBQVE7b0JBQ25DLE9BQU8sT0FBTyxxQkFBcUI7b0JBQ25DLE9BQU8sT0FBTyxTQUFTLFFBQVE7b0JBQy9CLE9BQU8sT0FBTyxlQUFlLEtBQUs7b0JBQ2xDLE9BQU8sT0FBTyx3QkFBd0IsS0FBSztvQkFDM0MsT0FBTyxPQUFPLGVBQWUsUUFBUTtvQkFDckMsT0FBTyxPQUFPLFlBQVk7b0JBQzFCLE9BQU8sT0FBTyxlQUFlLFFBQVE7b0JBQ3JDLE9BQU8sT0FBTyxVQUFVLFdBQVcsaUJBQWlCO29CQUNwRCxPQUFPLE9BQU8sV0FBVyxRQUFRO29CQUNqQyxPQUFPLE9BQU8sVUFBVSxXQUFXLFFBQVE7OztnQkFHL0MsR0FBRyxtREFBbUQsWUFBVztvQkFDN0QsSUFBSSxrQkFBa0I7O29CQUV0QixJQUFNLFlBQVksSUFBSSxVQUFVLElBQUksV0FBVztvQkFDL0MsVUFBVSxRQUFRLFFBQVE7O29CQUUxQixTQUFTLElBQUkseUJBQXlCO3dCQUNsQyxpQkFBaUI7d0JBQ2pCLFdBQVc7O29CQUVmLE9BQU8sT0FBTyxVQUFVLFdBQVcsaUJBQWlCO29CQUNwRCxPQUFPLE9BQU8sVUFBVSxVQUFVLHNCQUFzQjtvQkFDeEQsT0FBTyxPQUFPLFVBQVUsVUFBVSxzQkFBc0I7Ozs7O0dBZ0I3RCIsImZpbGUiOiJjb21tb24vZGF0YXZpZXcvdGFibGUvRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogKGMpIENvcHlyaWdodCAyMDE2LiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICovXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCB0YWJsZU1vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvdGFibGUvVGFibGVNb2R1bGUnO1xuXG4vKipcbiAqIFRlc3RzIGZvciB0aGUgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnIG1vZGVsIG9iamVjdFxuICovXG5kZXNjcmliZSgnRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IERhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZywgUGFnZVN0YXRlLCBQYWdpbmdEYXRhLCBTb3J0T3JkZXIsIGNvbmZpZztcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKHRhYmxlTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnXywgX1BhZ2luZ0RhdGFfLCBfUGFnZVN0YXRlXywgX1NvcnRPcmRlcl8pIHtcbiAgICAgICAgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnID0gX0RhdGFUYWJsZURpcmVjdGl2ZUNvbmZpZ187XG4gICAgICAgIFBhZ2luZ0RhdGEgPSBfUGFnaW5nRGF0YV87XG4gICAgICAgIFBhZ2VTdGF0ZSA9IF9QYWdlU3RhdGVfO1xuICAgICAgICBTb3J0T3JkZXIgPSBfU29ydE9yZGVyXztcbiAgICB9KSk7XG5cbiAgICBpdCgndGhyb3dzIHdoZW4gY29sdW1uQ29uZmlnS2V5IGlzIG5vdCBwcm92aWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBlcnJvcldyYXBwZXIoKSB7XG4gICAgICAgICAgICBjb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKCk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QoZXJyb3JXcmFwcGVyKS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGNyZWF0ZSBleHBlY3RlZCBlbGVtZW50cyB3aGVuIGNvbnN0cnVjdGVkIHdpdGggb25seSBhIGNvbHVtbkNvbmZpZ0tleScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY29sdW1uQ29uZmlnS2V5ID0gJ3Rlc3RDb2x1bW5Db25maWdLZXknO1xuXG4gICAgICAgIGNvbmZpZyA9IG5ldyBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcoe1xuICAgICAgICAgICAgY29sdW1uQ29uZmlnS2V5OiBjb2x1bW5Db25maWdLZXlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbmZpZy5nZXRDb2x1bW5Db25maWdLZXkoKSkudG9FcXVhbChjb2x1bW5Db25maWdLZXkpO1xuICAgICAgICBleHBlY3QoY29uZmlnLnJlZnJlc2hUcmlnZ2VyKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoY29uZmlnLnBhZ2VTdGF0ZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUucGFnaW5nRGF0YS5nZXRJdGVtc1BlclBhZ2UoKSkudG9CZSgxMCk7XG4gICAgICAgIC8vIGhlYWRlciBvcHRpb25zIHNob3VsZCBkZWZhdWx0IHRvIGZhbHNlIGlmIG5vdCBzcGVjaWZpZWQgaW4gY29uc3RydWN0b3JcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5oZWFkZXJFbmFibGVkKS50b0JlKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5jb2x1bW5zQnRuRW5hYmxlZCkudG9CZShmYWxzZSk7XG4gICAgICAgIGV4cGVjdChjb25maWcucGFnaW5nSW5mb0VuYWJsZWQpLnRvQmUoZmFsc2UpO1xuICAgICAgICAvLyBmaWx0ZXIgdGl0bGUgc2hvdWxkIG9ubHkgYmUgZGVmaW5lZCB3aGVuIHNwZWNpZmllZCBpbiBjb25zdHJ1Y3RvclxuICAgICAgICBleHBlY3QoY29uZmlnLmZpbHRlclRpdGxlKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgLy8gY2hlY2tib3ggaXMgb25seSBkZWZpbmVkIHdoZW4gcHJvdmlkZWQgaW4gY29uc3RydWN0b3JcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5jaGVja2JveE11bHRpU2VsZWN0KS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5lbmFibGVHcm91cEJ5KS50b0JlKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5zaG93U2VjdGlvbkhlYWRlckxhYmVsKS50b0JlKGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5ncm91cEJ5Q29sdW1uKS5ub3QudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5oaWRlRm9vdGVyKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY3JlYXRlIGV4cGVjdGVkIGVsZW1lbnRzIHdoZW4gZ2l2ZW4gYWxsIHRoZSBjb25zdHJ1Y3RvciBhcmd1bWVudHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbHVtbkNvbmZpZ0tleSA9ICd0ZXN0Q29sdW1uQ29uZmlnS2V5JyxcbiAgICAgICAgICAgIHRlc3RDaGVja0JveCA9IHtcbiAgICAgICAgICAgICAgICBhdHRhY2g6IGphc21pbmUuY3JlYXRlU3B5KCdhdHRhY2gnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlc3RUaXRsZSA9ICd0ZXN0RmlsdGVyUGFuZWxUaXRsZScsXG4gICAgICAgICAgICB0ZXN0SXRlbXNQZXJQYWdlID0gMjAwLFxuICAgICAgICAgICAgdGVzdEdyb3VwQnlDb2x1bW4gPSAnZ3JvdXBCeUNvbCcsXG4gICAgICAgICAgICB0ZXN0RmlsdGVycyA9IFt7IHNvbWU6ICd0aGluZycgfV0sXG4gICAgICAgICAgICB0ZXN0U2VhcmNoRnVuYyA9IGphc21pbmUuY3JlYXRlU3B5KCdwcmVTZWFyY2hGdW5jJyksXG4gICAgICAgICAgICBwYWdlU2l6ZXMgPSBbMSwgMywgNV0sXG4gICAgICAgICAgICBkZWZhdWx0U29ydCA9IG5ldyBTb3J0T3JkZXIoJ2NvbHVtbicsIFNvcnRPcmRlci5PUkRFUl9BU0MpO1xuXG4gICAgICAgIGNvbmZpZyA9IG5ldyBEYXRhVGFibGVEaXJlY3RpdmVDb25maWcoe1xuICAgICAgICAgICAgY29sdW1uQ29uZmlnS2V5OiBjb2x1bW5Db25maWdLZXksXG4gICAgICAgICAgICBjaGVja2JveE11bHRpU2VsZWN0OiB0ZXN0Q2hlY2tCb3gsXG4gICAgICAgICAgICBoZWFkZXJFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uc0J0bkVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmdJbmZvRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIGZpbHRlclRpdGxlOiB0ZXN0VGl0bGUsXG4gICAgICAgICAgICBpdGVtc1BlclBhZ2U6IHRlc3RJdGVtc1BlclBhZ2UsXG4gICAgICAgICAgICBmaWx0ZXJzOiB0ZXN0RmlsdGVycyxcbiAgICAgICAgICAgIGVuYWJsZUdyb3VwQnk6IHRydWUsXG4gICAgICAgICAgICBncm91cEJ5Q29sdW1uOiB0ZXN0R3JvdXBCeUNvbHVtbixcbiAgICAgICAgICAgIGhpZGVGb290ZXI6IHRydWUsXG4gICAgICAgICAgICBwcmVTZWFyY2hGdW5jOiB0ZXN0U2VhcmNoRnVuYyxcbiAgICAgICAgICAgIHBhZ2VTdGF0ZTogbmV3IFBhZ2VTdGF0ZShuZXcgUGFnaW5nRGF0YSgxMDApKSxcbiAgICAgICAgICAgIHBhZ2VTaXplczogcGFnZVNpemVzLFxuICAgICAgICAgICAgZGVmYXVsdFNvcnQ6IGRlZmF1bHRTb3J0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV4cGVjdChjb25maWcuZ2V0Q29sdW1uQ29uZmlnS2V5KCkpLnRvRXF1YWwoY29sdW1uQ29uZmlnS2V5KTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5yZWZyZXNoVHJpZ2dlcikudG9CZURlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5wYWdlU3RhdGUpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgIC8vIGhlYWRlciBvcHRpb25zIHNob3VsZCBiZSBzZXQgdG8gdHJ1ZSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICBleHBlY3QoY29uZmlnLmhlYWRlckVuYWJsZWQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChjb25maWcuY29sdW1uc0J0bkVuYWJsZWQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChjb25maWcucGFnaW5nSW5mb0VuYWJsZWQpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChjb25maWcuZmlsdGVyVGl0bGUpLnRvRXF1YWwodGVzdFRpdGxlKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5jaGVja2JveE11bHRpU2VsZWN0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICBleHBlY3QoY29uZmlnLmZpbHRlcnMpLnRvRXF1YWwodGVzdEZpbHRlcnMpO1xuICAgICAgICBleHBlY3QoY29uZmlnLmVuYWJsZUdyb3VwQnkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChjb25maWcuc2hvd1NlY3Rpb25IZWFkZXJMYWJlbCkudG9CZSh0cnVlKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5ncm91cEJ5Q29sdW1uKS50b0VxdWFsKHRlc3RHcm91cEJ5Q29sdW1uKTtcbiAgICAgICAgZXhwZWN0KGNvbmZpZy5oaWRlRm9vdGVyKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChjb25maWcucHJlU2VhcmNoRnVuYykudG9FcXVhbCh0ZXN0U2VhcmNoRnVuYyk7XG4gICAgICAgIGV4cGVjdChjb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEuaXRlbXNQZXJQYWdlID09PSAxMDApO1xuICAgICAgICBleHBlY3QoY29uZmlnLnBhZ2VTaXplcykudG9FcXVhbChwYWdlU2l6ZXMpO1xuICAgICAgICBleHBlY3QoY29uZmlnLnBhZ2VTdGF0ZS5zb3J0T3JkZXIpLnRvRXF1YWwoZGVmYXVsdFNvcnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjcmVhdGUgZXhwZWN0ZWQgcGFnZVN0YXRlIHdoZW4gcGFzc2VkIGluJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBjb2x1bW5Db25maWdLZXkgPSAndGVzdENvbHVtbkNvbmZpZ0tleSc7XG5cbiAgICAgICAgY29uc3QgcGFnZVN0YXRlID0gbmV3IFBhZ2VTdGF0ZShuZXcgUGFnaW5nRGF0YSgxMDApKTtcbiAgICAgICAgcGFnZVN0YXRlLnNldFNvcnQoJ25hbWUnLCB0cnVlKTtcblxuICAgICAgICBjb25maWcgPSBuZXcgRGF0YVRhYmxlRGlyZWN0aXZlQ29uZmlnKHtcbiAgICAgICAgICAgIGNvbHVtbkNvbmZpZ0tleTogY29sdW1uQ29uZmlnS2V5LFxuICAgICAgICAgICAgcGFnZVN0YXRlOiBwYWdlU3RhdGVcbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChjb25maWcucGFnZVN0YXRlLnBhZ2luZ0RhdGEuaXRlbXNQZXJQYWdlID09PSAxMDApO1xuICAgICAgICBleHBlY3QoY29uZmlnLnBhZ2VTdGF0ZS5zb3J0T3JkZXIuaXNTb3J0QXNjZW5kaW5nKCkgPT09IHRydWUpO1xuICAgICAgICBleHBlY3QoY29uZmlnLnBhZ2VTdGF0ZS5zb3J0T3JkZXIuZ2V0U29ydFByb3BlcnR5KCkgPT09ICduYW1lJyk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
