System.register(['test/js/TestInitializer', 'common/config/ConfigModule'], function (_export) {
    /*
     * (c) Copyright 2016. SailPoint Technologies, Inc., All Rights Reserved.
     */

    'use strict';

    var configModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonConfigConfigModule) {
            configModule = _commonConfigConfigModule['default'];
        }],
        execute: function () {

            describe('TablePreferencesService', function () {
                var http = undefined,
                    tablePreferencesService = undefined,
                    contextPath = undefined,
                    $rootScope = undefined,
                    url = undefined,
                    testTablePreferences = undefined,
                    testTablePreferencesWithGrouping = undefined,
                    testTableId = 'testTableId',
                    testColumns = ['col1', 'col2'],
                    testGrouping = testColumns[0],
                    testTablePreferencesData = { columns: testColumns },
                    testTablePreferencesWithGroupingData = {
                    columns: testColumns,
                    grouping: testGrouping
                };

                beforeEach(module(configModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function ($httpBackend, _tablePreferencesService_, _$rootScope_, SP_CONTEXT_PATH, TablePreferences) {
                    http = $httpBackend;
                    tablePreferencesService = _tablePreferencesService_;
                    $rootScope = _$rootScope_;
                    contextPath = SP_CONTEXT_PATH;
                    url = SP_CONTEXT_PATH + '/ui/rest/me/tableColumnPreferences/' + testTableId;
                    testTablePreferences = new TablePreferences(testTablePreferencesData);
                    testTablePreferencesWithGrouping = new TablePreferences(testTablePreferencesWithGroupingData);
                }));

                afterEach(function () {
                    http.verifyNoOutstandingExpectation();
                    http.verifyNoOutstandingRequest();
                });

                describe('getTablePreferences', function () {
                    it('should throw with no params', function () {
                        expect(function () {
                            tablePreferencesService.getTablePreferences();
                        }).toThrow();
                    });

                    it('should get table preferences', function () {
                        http.expectGET(url).respond(200, testTablePreferencesData);

                        tablePreferencesService.getTablePreferences(testTableId).then(function (response) {
                            expect(response).toEqual(testTablePreferences);
                        });

                        http.flush();
                        $rootScope.$apply();
                    });

                    it('should get table preferences with grouping', function () {
                        http.expectGET(url).respond(200, testTablePreferencesWithGroupingData);

                        tablePreferencesService.getTablePreferences(testTableId).then(function (response) {
                            expect(response).toEqual(testTablePreferencesWithGrouping);
                        });

                        http.flush();
                        $rootScope.$apply();
                    });
                });

                describe('saveTablePreferences', function () {
                    it('should throw with no params', function () {
                        expect(function () {
                            tablePreferencesService.saveTablePreferences();
                        }).toThrow();
                    });

                    it('puts the new table preferences', function () {
                        http.expect('PUT', url, testTablePreferencesData).respond(200);
                        tablePreferencesService.saveTablePreferences(testTableId, testColumns);
                        http.flush();
                    });

                    it('puts the new table preferences with grouping', function () {
                        http.expect('PUT', url, testTablePreferencesWithGroupingData).respond(200);
                        tablePreferencesService.saveTablePreferences(testTableId, testColumns, testGrouping);
                        http.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9jb25maWcvVGFibGVQcmVmZXJlbmNlc1NlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIsK0JBQStCLFVBQVUsU0FBUzs7Ozs7SUFLMUY7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLDJCQUEyQjtZQUNqRixlQUFlLDBCQUEwQjs7UUFFN0MsU0FBUyxZQUFZOztZQUw3QixTQUFTLDJCQUEyQixZQUFNO2dCQUN0QyxJQUFJLE9BQUk7b0JBQUUsMEJBQXVCO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxNQUFHO29CQUMzRCx1QkFBb0I7b0JBQUUsbUNBQWdDO29CQUN0RCxjQUFjO29CQUNkLGNBQWMsQ0FBQyxRQUFRO29CQUN2QixlQUFlLFlBQVk7b0JBQzNCLDJCQUEyQixFQUFDLFNBQVM7b0JBQ3JDLHVDQUF1QztvQkFDbkMsU0FBUztvQkFDVCxVQUFVOzs7Z0JBR2xCLFdBQVcsT0FBTzs7Z0JBRWxCLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQUMsY0FBYywyQkFBMkIsY0FBYyxpQkFBaUIsa0JBQXFCO29CQUM1RyxPQUFPO29CQUNQLDBCQUEwQjtvQkFDMUIsYUFBYTtvQkFDYixjQUFjO29CQUNkLE1BQVMsa0JBQWUsd0NBQXNDO29CQUM5RCx1QkFBdUIsSUFBSSxpQkFBaUI7b0JBQzVDLG1DQUFtQyxJQUFJLGlCQUFpQjs7O2dCQUc1RCxVQUFVLFlBQVc7b0JBQ2pCLEtBQUs7b0JBQ0wsS0FBSzs7O2dCQUdULFNBQVMsdUJBQXVCLFlBQU07b0JBQ2xDLEdBQUcsK0JBQStCLFlBQVc7d0JBQ3pDLE9BQU8sWUFBVzs0QkFDZCx3QkFBd0I7MkJBQ3pCOzs7b0JBR1AsR0FBRyxnQ0FBZ0MsWUFBTTt3QkFDckMsS0FBSyxVQUFVLEtBQUssUUFBUSxLQUFLOzt3QkFFakMsd0JBQXdCLG9CQUFvQixhQUFhLEtBQUssVUFBUyxVQUFVOzRCQUM3RSxPQUFPLFVBQVUsUUFBUTs7O3dCQUc3QixLQUFLO3dCQUNMLFdBQVc7OztvQkFHZixHQUFHLDhDQUE4QyxZQUFNO3dCQUNuRCxLQUFLLFVBQVUsS0FBSyxRQUFRLEtBQUs7O3dCQUVqQyx3QkFBd0Isb0JBQW9CLGFBQWEsS0FBSyxVQUFTLFVBQVU7NEJBQzdFLE9BQU8sVUFBVSxRQUFROzs7d0JBRzdCLEtBQUs7d0JBQ0wsV0FBVzs7OztnQkFJbkIsU0FBUyx3QkFBd0IsWUFBTTtvQkFDbkMsR0FBRywrQkFBK0IsWUFBVzt3QkFDekMsT0FBTyxZQUFXOzRCQUNkLHdCQUF3QjsyQkFDekI7OztvQkFHUCxHQUFHLGtDQUFrQyxZQUFXO3dCQUM1QyxLQUFLLE9BQU8sT0FBTyxLQUFLLDBCQUEwQixRQUFRO3dCQUMxRCx3QkFBd0IscUJBQXFCLGFBQWE7d0JBQzFELEtBQUs7OztvQkFHVCxHQUFHLGdEQUFnRCxZQUFXO3dCQUMxRCxLQUFLLE9BQU8sT0FBTyxLQUFLLHNDQUFzQyxRQUFRO3dCQUN0RSx3QkFBd0IscUJBQXFCLGFBQWEsYUFBYTt3QkFDdkUsS0FBSzs7Ozs7O0dBa0JkIiwiZmlsZSI6ImNvbW1vbi9jb25maWcvVGFibGVQcmVmZXJlbmNlc1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAoYykgQ29weXJpZ2h0IDIwMTYuIFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4sIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgY29uZmlnTW9kdWxlIGZyb20gJ2NvbW1vbi9jb25maWcvQ29uZmlnTW9kdWxlJztcblxuZGVzY3JpYmUoJ1RhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBodHRwLCB0YWJsZVByZWZlcmVuY2VzU2VydmljZSwgY29udGV4dFBhdGgsICRyb290U2NvcGUsIHVybCxcbiAgICAgICAgdGVzdFRhYmxlUHJlZmVyZW5jZXMsIHRlc3RUYWJsZVByZWZlcmVuY2VzV2l0aEdyb3VwaW5nLFxuICAgICAgICB0ZXN0VGFibGVJZCA9ICd0ZXN0VGFibGVJZCcsXG4gICAgICAgIHRlc3RDb2x1bW5zID0gWydjb2wxJywgJ2NvbDInXSxcbiAgICAgICAgdGVzdEdyb3VwaW5nID0gdGVzdENvbHVtbnNbMF0sXG4gICAgICAgIHRlc3RUYWJsZVByZWZlcmVuY2VzRGF0YSA9IHtjb2x1bW5zOiB0ZXN0Q29sdW1uc30sXG4gICAgICAgIHRlc3RUYWJsZVByZWZlcmVuY2VzV2l0aEdyb3VwaW5nRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbHVtbnM6IHRlc3RDb2x1bW5zLFxuICAgICAgICAgICAgZ3JvdXBpbmc6IHRlc3RHcm91cGluZ1xuICAgICAgICB9O1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoY29uZmlnTW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKCRodHRwQmFja2VuZCwgX3RhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlXywgXyRyb290U2NvcGVfLCBTUF9DT05URVhUX1BBVEgsIFRhYmxlUHJlZmVyZW5jZXMpID0+IHtcbiAgICAgICAgaHR0cCA9ICRodHRwQmFja2VuZDtcbiAgICAgICAgdGFibGVQcmVmZXJlbmNlc1NlcnZpY2UgPSBfdGFibGVQcmVmZXJlbmNlc1NlcnZpY2VfO1xuICAgICAgICAkcm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuICAgICAgICBjb250ZXh0UGF0aCA9IFNQX0NPTlRFWFRfUEFUSDtcbiAgICAgICAgdXJsID0gYCR7U1BfQ09OVEVYVF9QQVRIfS91aS9yZXN0L21lL3RhYmxlQ29sdW1uUHJlZmVyZW5jZXMvJHt0ZXN0VGFibGVJZH1gO1xuICAgICAgICB0ZXN0VGFibGVQcmVmZXJlbmNlcyA9IG5ldyBUYWJsZVByZWZlcmVuY2VzKHRlc3RUYWJsZVByZWZlcmVuY2VzRGF0YSk7XG4gICAgICAgIHRlc3RUYWJsZVByZWZlcmVuY2VzV2l0aEdyb3VwaW5nID0gbmV3IFRhYmxlUHJlZmVyZW5jZXModGVzdFRhYmxlUHJlZmVyZW5jZXNXaXRoR3JvdXBpbmdEYXRhKTtcbiAgICB9KSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgIGh0dHAudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRUYWJsZVByZWZlcmVuY2VzJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IHdpdGggbm8gcGFyYW1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGFibGVQcmVmZXJlbmNlc1NlcnZpY2UuZ2V0VGFibGVQcmVmZXJlbmNlcygpO1xuICAgICAgICAgICAgfSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGdldCB0YWJsZSBwcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIHRlc3RUYWJsZVByZWZlcmVuY2VzRGF0YSk7XG5cbiAgICAgICAgICAgIHRhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlLmdldFRhYmxlUHJlZmVyZW5jZXModGVzdFRhYmxlSWQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLnRvRXF1YWwodGVzdFRhYmxlUHJlZmVyZW5jZXMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZ2V0IHRhYmxlIHByZWZlcmVuY2VzIHdpdGggZ3JvdXBpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCB0ZXN0VGFibGVQcmVmZXJlbmNlc1dpdGhHcm91cGluZ0RhdGEpO1xuXG4gICAgICAgICAgICB0YWJsZVByZWZlcmVuY2VzU2VydmljZS5nZXRUYWJsZVByZWZlcmVuY2VzKHRlc3RUYWJsZUlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKHRlc3RUYWJsZVByZWZlcmVuY2VzV2l0aEdyb3VwaW5nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBodHRwLmZsdXNoKCk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzYXZlVGFibGVQcmVmZXJlbmNlcycsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCB0aHJvdyB3aXRoIG5vIHBhcmFtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlLnNhdmVUYWJsZVByZWZlcmVuY2VzKCk7XG4gICAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdwdXRzIHRoZSBuZXcgdGFibGUgcHJlZmVyZW5jZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGh0dHAuZXhwZWN0KCdQVVQnLCB1cmwsIHRlc3RUYWJsZVByZWZlcmVuY2VzRGF0YSkucmVzcG9uZCgyMDApO1xuICAgICAgICAgICAgdGFibGVQcmVmZXJlbmNlc1NlcnZpY2Uuc2F2ZVRhYmxlUHJlZmVyZW5jZXModGVzdFRhYmxlSWQsIHRlc3RDb2x1bW5zKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3B1dHMgdGhlIG5ldyB0YWJsZSBwcmVmZXJlbmNlcyB3aXRoIGdyb3VwaW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBodHRwLmV4cGVjdCgnUFVUJywgdXJsLCB0ZXN0VGFibGVQcmVmZXJlbmNlc1dpdGhHcm91cGluZ0RhdGEpLnJlc3BvbmQoMjAwKTtcbiAgICAgICAgICAgIHRhYmxlUHJlZmVyZW5jZXNTZXJ2aWNlLnNhdmVUYWJsZVByZWZlcmVuY2VzKHRlc3RUYWJsZUlkLCB0ZXN0Q29sdW1ucywgdGVzdEdyb3VwaW5nKTtcbiAgICAgICAgICAgIGh0dHAuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
