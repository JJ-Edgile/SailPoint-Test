System.register(['test/js/TestInitializer', 'alert/AlertModule', 'common/dataview/DataViewModule', 'common/util/UtilModule', 'test/js/TestModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var alertModule, dataViewModule, utilModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_commonDataviewDataViewModule) {
            dataViewModule = _commonDataviewDataViewModule['default'];
        }, function (_commonUtilUtilModule) {
            utilModule = _commonUtilUtilModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('AlertCtrl', function () {

                var alertService = undefined,
                    Alert = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined,
                    PagingData = undefined;

                beforeEach(module(alertModule, dataViewModule, utilModule, testModule));

                /* jshint maxparams:7 */
                beforeEach(inject(function (_alertService_, _Alert_, _testService_, _$controller_, _$rootScope_, _SortOrder_, _PagingData_) {

                    alertService = _alertService_;
                    Alert = _Alert_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                    PagingData = _PagingData_;
                }));

                beforeEach(function () {
                    spyOn(alertService, 'getAlertFilters').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                });

                function createController() {
                    return $controller('AlertCtrl', {
                        alertService: alertService,
                        Alert: Alert,
                        SortOrder: SortOrder,
                        PagingData: PagingData
                    });
                }

                describe('constructor', function () {

                    it('should call getAlertFilters', function () {
                        createController();
                        expect(alertService.getAlertFilters).toHaveBeenCalled();
                    });

                    it('should have initialized actions filter', function () {
                        var ctrl = createController();
                        var searchData = ctrl.tableConfig.getSearchData();
                        expect(searchData.filterValues.actions).toBeDefined();
                        expect(searchData.filterValues.actions.value).toEqual(true);
                    });
                });

                describe('getItems', function () {

                    beforeEach(function () {
                        // don't care what the results are for these tests just the parameters
                        // that the function was called with
                        spyOn(alertService, 'getAlerts').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                    });

                    it('should handle a null filterValues', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.getItems(0, 10, null, sort);

                        // query and status values are alwyas spliced in but the http framework
                        // will strip out undefined values before they are sent to the server
                        expect(alertService.getAlerts).toHaveBeenCalledWith({}, 0, 10, sort, undefined);
                    });

                    it('should set a default sort', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        sort.addSort('name', false);

                        ctrl.getItems(0, 10, null, null);

                        expect(alertService.getAlerts).toHaveBeenCalledWith({}, 0, 10, sort, undefined);
                    });

                    it('should set the query filter', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.query = 'foo';
                        ctrl.getItems(0, 10, null, sort);

                        expect(alertService.getAlerts).toHaveBeenCalledWith({}, 0, 10, sort, 'foo');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQkFBcUIsa0NBQWtDLDBCQUEwQix1QkFBdUIsVUFBVSxTQUFTOzs7OztJQUtuSzs7SUFFQSxJQUFJLGFBQWEsZ0JBQWdCLFlBQVk7SUFDN0MsT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGNBQWMsa0JBQWtCO1dBQ2pDLFVBQVUsK0JBQStCO1lBQ3hDLGlCQUFpQiw4QkFBOEI7V0FDaEQsVUFBVSx1QkFBdUI7WUFDaEMsYUFBYSxzQkFBc0I7V0FDcEMsVUFBVSxtQkFBbUI7WUFDNUIsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTs7WUFSN0IsU0FBUyxhQUFhLFlBQU07O2dCQUV4QixJQUFJLGVBQVk7b0JBQUUsUUFBSztvQkFBRSxjQUFXO29CQUFFLGNBQVc7b0JBQUUsYUFBVTtvQkFBRSxZQUFTO29CQUFFLGFBQVU7O2dCQUVwRixXQUFXLE9BQU8sYUFBYSxnQkFBZ0IsWUFBWTs7O2dCQUczRCxXQUFXLE9BQU8sVUFBQyxnQkFBZ0IsU0FBUyxlQUFlLGVBQWUsY0FBYyxhQUNwRixjQUFpQjs7b0JBRWpCLGVBQWU7b0JBQ2YsUUFBUTtvQkFDUixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZO29CQUNaLGFBQWE7OztnQkFHakIsV0FBVyxZQUFNO29CQUNiLE1BQU0sY0FBYyxtQkFBbUIsSUFBSSxZQUFZLFlBQVksY0FBYyxPQUM3RSxFQUFFLE9BQU8sR0FBRyxTQUFTOzs7Z0JBSTdCLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksYUFBYTt3QkFDNUIsY0FBYzt3QkFDZCxPQUFPO3dCQUNQLFdBQVc7d0JBQ1gsWUFBWTs7OztnQkFJcEIsU0FBUyxlQUFlLFlBQU07O29CQUUxQixHQUFHLCtCQUErQixZQUFNO3dCQUNwQzt3QkFDQSxPQUFPLGFBQWEsaUJBQWlCOzs7b0JBR3pDLEdBQUcsMENBQTBDLFlBQU07d0JBQy9DLElBQUksT0FBTzt3QkFDWCxJQUFJLGFBQWEsS0FBSyxZQUFZO3dCQUNsQyxPQUFPLFdBQVcsYUFBYSxTQUFTO3dCQUN4QyxPQUFPLFdBQVcsYUFBYSxRQUFRLE9BQU8sUUFBUTs7OztnQkFPOUQsU0FBUyxZQUFZLFlBQU07O29CQUV2QixXQUFXLFlBQU07Ozt3QkFHYixNQUFNLGNBQWMsYUFBYSxJQUFJLFlBQ2pDLFlBQVksY0FBYyxPQUFPLEVBQUUsT0FBTyxHQUFHLFNBQVM7OztvQkFJOUQsR0FBRyxxQ0FBcUMsWUFBTTt3QkFDMUMsSUFBSSxPQUFPOzRCQUNYLE9BQU8sSUFBSTs7d0JBRVgsS0FBSyxTQUFTLEdBQUcsSUFBSSxNQUFNOzs7O3dCQUkzQixPQUFPLGFBQWEsV0FBVyxxQkFDM0IsSUFBSSxHQUFHLElBQUksTUFBTTs7O29CQUt6QixHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxJQUFJLE9BQU87NEJBQ1gsT0FBTyxJQUFJOzt3QkFFWCxLQUFLLFFBQVEsUUFBUTs7d0JBRXJCLEtBQUssU0FBUyxHQUFHLElBQUksTUFBTTs7d0JBRTNCLE9BQU8sYUFBYSxXQUFXLHFCQUMzQixJQUFJLEdBQUcsSUFBSSxNQUFNOzs7b0JBS3pCLEdBQUcsK0JBQStCLFlBQU07d0JBQ3BDLElBQUksT0FBTzs0QkFDWCxPQUFPLElBQUk7O3dCQUVYLEtBQUssUUFBUTt3QkFDYixLQUFLLFNBQVMsR0FBRyxJQUFJLE1BQU07O3dCQUUzQixPQUFPLGFBQWEsV0FBVyxxQkFDM0IsSUFBSSxHQUFHLElBQUksTUFBTTs7Ozs7O0dBTzlCIiwiZmlsZSI6ImFsZXJ0L0FsZXJ0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFsZXJ0TW9kdWxlIGZyb20gJ2FsZXJ0L0FsZXJ0TW9kdWxlJztcbmltcG9ydCBkYXRhVmlld01vZHVsZSBmcm9tICdjb21tb24vZGF0YXZpZXcvRGF0YVZpZXdNb2R1bGUnO1xuaW1wb3J0IHV0aWxNb2R1bGUgZnJvbSAnY29tbW9uL3V0aWwvVXRpbE1vZHVsZSc7XG5pbXBvcnQgdGVzdE1vZHVsZSBmcm9tICd0ZXN0L2pzL1Rlc3RNb2R1bGUnO1xuXG5kZXNjcmliZSgnQWxlcnRDdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IGFsZXJ0U2VydmljZSwgQWxlcnQsIHRlc3RTZXJ2aWNlLCAkY29udHJvbGxlciwgJHJvb3RTY29wZSwgU29ydE9yZGVyLCBQYWdpbmdEYXRhO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWxlcnRNb2R1bGUsIGRhdGFWaWV3TW9kdWxlLCB1dGlsTW9kdWxlLCB0ZXN0TW9kdWxlKSk7XG5cbi8qIGpzaGludCBtYXhwYXJhbXM6NyAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KChfYWxlcnRTZXJ2aWNlXywgX0FsZXJ0XywgX3Rlc3RTZXJ2aWNlXywgXyRjb250cm9sbGVyXywgXyRyb290U2NvcGVfLCBfU29ydE9yZGVyXyxcbiAgICAgICAgX1BhZ2luZ0RhdGFfKSA9PiB7XG5cbiAgICAgICAgYWxlcnRTZXJ2aWNlID0gX2FsZXJ0U2VydmljZV87XG4gICAgICAgIEFsZXJ0ID0gX0FsZXJ0XztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgICAgICBQYWdpbmdEYXRhID0gX1BhZ2luZ0RhdGFfO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBzcHlPbihhbGVydFNlcnZpY2UsICdnZXRBbGVydEZpbHRlcnMnKS5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSxcbiAgICAgICAgICAgIHsgY291bnQ6IDAsIG9iamVjdHM6IFtdIH0pXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0FsZXJ0Q3RybCcsIHtcbiAgICAgICAgICAgIGFsZXJ0U2VydmljZTogYWxlcnRTZXJ2aWNlLFxuICAgICAgICAgICAgQWxlcnQ6IEFsZXJ0LFxuICAgICAgICAgICAgU29ydE9yZGVyOiBTb3J0T3JkZXIsXG4gICAgICAgICAgICBQYWdpbmdEYXRhOiBQYWdpbmdEYXRhXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0QWxlcnRGaWx0ZXJzJywgKCkgPT4ge1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgZXhwZWN0KGFsZXJ0U2VydmljZS5nZXRBbGVydEZpbHRlcnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYXZlIGluaXRpYWxpemVkIGFjdGlvbnMgZmlsdGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCk7XG4gICAgICAgICAgICBsZXQgc2VhcmNoRGF0YSA9IGN0cmwudGFibGVDb25maWcuZ2V0U2VhcmNoRGF0YSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuZmlsdGVyVmFsdWVzLmFjdGlvbnMpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgICBleHBlY3Qoc2VhcmNoRGF0YS5maWx0ZXJWYWx1ZXMuYWN0aW9ucy52YWx1ZSkudG9FcXVhbCh0cnVlKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbXMnLCAoKSA9PiB7XG5cbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBkb24ndCBjYXJlIHdoYXQgdGhlIHJlc3VsdHMgYXJlIGZvciB0aGVzZSB0ZXN0cyBqdXN0IHRoZSBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAvLyB0aGF0IHRoZSBmdW5jdGlvbiB3YXMgY2FsbGVkIHdpdGhcbiAgICAgICAgICAgIHNweU9uKGFsZXJ0U2VydmljZSwgJ2dldEFsZXJ0cycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCB7IGNvdW50OiAwLCBvYmplY3RzOiBbXSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgYSBudWxsIGZpbHRlclZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgY3RybC5nZXRJdGVtcygwLCAxMCwgbnVsbCwgc29ydCk7XG5cbiAgICAgICAgICAgIC8vIHF1ZXJ5IGFuZCBzdGF0dXMgdmFsdWVzIGFyZSBhbHd5YXMgc3BsaWNlZCBpbiBidXQgdGhlIGh0dHAgZnJhbWV3b3JrXG4gICAgICAgICAgICAvLyB3aWxsIHN0cmlwIG91dCB1bmRlZmluZWQgdmFsdWVzIGJlZm9yZSB0aGV5IGFyZSBzZW50IHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIGV4cGVjdChhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICB7fSwgMCwgMTAsIHNvcnQsIHVuZGVmaW5lZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBhIGRlZmF1bHQgc29ydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjdHJsID0gY3JlYXRlQ29udHJvbGxlcigpLFxuICAgICAgICAgICAgc29ydCA9IG5ldyBTb3J0T3JkZXIoKTtcblxuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCduYW1lJywgZmFsc2UpO1xuXG4gICAgICAgICAgICBjdHJsLmdldEl0ZW1zKDAsIDEwLCBudWxsLCBudWxsKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFsZXJ0U2VydmljZS5nZXRBbGVydHMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgICAgIHt9LCAwLCAxMCwgc29ydCwgdW5kZWZpbmVkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBxdWVyeSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XG5cbiAgICAgICAgICAgIGN0cmwucXVlcnkgPSAnZm9vJztcbiAgICAgICAgICAgIGN0cmwuZ2V0SXRlbXMoMCwgMTAsIG51bGwsIHNvcnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWxlcnRTZXJ2aWNlLmdldEFsZXJ0cykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICAgICAge30sIDAsIDEwLCBzb3J0LCAnZm9vJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
