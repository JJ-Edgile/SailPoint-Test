System.register(['test/js/TestInitializer', 'alert/AlertModule', 'common/dataview/DataViewModule', 'common/util/UtilModule', 'test/js/TestModule'], function (_export) {
    /*
     *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
     */

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

            describe('AlertDefinitionCtrl', function () {

                var alertDefinitionService = undefined,
                    AlertDefinition = undefined,
                    testService = undefined,
                    $controller = undefined,
                    $rootScope = undefined,
                    SortOrder = undefined,
                    PagingData = undefined,
                    $state = undefined;

                beforeEach(module(alertModule, dataViewModule, utilModule, testModule));

                /* jshint maxparams:8 */
                beforeEach(inject(function (_alertDefinitionService_, _AlertDefinition_, _testService_, _$controller_, _$rootScope_, _SortOrder_, _PagingData_, _$state_) {

                    alertDefinitionService = _alertDefinitionService_;
                    AlertDefinition = _AlertDefinition_;
                    testService = _testService_;
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    SortOrder = _SortOrder_;
                    PagingData = _PagingData_;
                    $state = _$state_;
                }));

                function createController() {
                    return $controller('AlertDefinitionCtrl', {
                        alertDefinitionService: alertDefinitionService,
                        AlertDefinition: AlertDefinition,
                        SortOrder: SortOrder,
                        PagingData: PagingData,
                        $state: $state
                    });
                }

                describe('getItems', function () {

                    beforeEach(function () {
                        // don't care what the results are for these tests just the parameters
                        // that the function was called with
                        spyOn(alertDefinitionService, 'getAlertDefinitions').and.returnValue(testService.createPromise(false, { count: 0, objects: [] }));
                    });

                    it('should set a default sort', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        sort.addSort('name', false);

                        ctrl.getItems(0, 10, null);

                        expect(alertDefinitionService.getAlertDefinitions).toHaveBeenCalledWith(0, 10, sort, undefined);
                    });

                    it('should set the query filter', function () {
                        var ctrl = createController(),
                            sort = new SortOrder();

                        ctrl.query = 'foo';
                        ctrl.getItems(0, 10, sort);

                        expect(alertDefinitionService.getAlertDefinitions).toHaveBeenCalledWith(0, 10, sort, 'foo');
                    });
                });

                describe('newDefinition', function () {
                    it('should change state', function () {
                        var ctrl = createController();
                        spyOn(ctrl.$state, 'go');
                        ctrl.newDefinition();
                        expect(ctrl.$state.go).toHaveBeenCalledWith('newDefinition');
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvbkN0cmxUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUJBQXFCLGtDQUFrQywwQkFBMEIsdUJBQXVCLFVBQVUsU0FBUzs7Ozs7Ozs7O0lBU25LOztJQUVBLElBQUksYUFBYSxnQkFBZ0IsWUFBWTtJQUM3QyxPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQkFBbUI7WUFDekUsY0FBYyxrQkFBa0I7V0FDakMsVUFBVSwrQkFBK0I7WUFDeEMsaUJBQWlCLDhCQUE4QjtXQUNoRCxVQUFVLHVCQUF1QjtZQUNoQyxhQUFhLHNCQUFzQjtXQUNwQyxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQVI3QixTQUFTLHVCQUF1QixZQUFNOztnQkFFbEMsSUFBSSx5QkFBc0I7b0JBQUUsa0JBQWU7b0JBQUUsY0FBVztvQkFBRSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsWUFBUztvQkFBRSxhQUFVO29CQUFFLFNBQU07O2dCQUVoSCxXQUFXLE9BQU8sYUFBYSxnQkFBZ0IsWUFBWTs7O2dCQUczRCxXQUFXLE9BQU8sVUFBQywwQkFBMEIsbUJBQW1CLGVBQWUsZUFBZSxjQUMxRixhQUFhLGNBQWMsVUFBYTs7b0JBRXhDLHlCQUF5QjtvQkFDekIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZO29CQUNaLGFBQWE7b0JBQ2IsU0FBUzs7O2dCQUdiLFNBQVMsbUJBQW1CO29CQUN4QixPQUFPLFlBQVksdUJBQXVCO3dCQUN0Qyx3QkFBd0I7d0JBQ3hCLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFFBQVE7Ozs7Z0JBS2hCLFNBQVMsWUFBWSxZQUFNOztvQkFFdkIsV0FBVyxZQUFNOzs7d0JBR2IsTUFBTSx3QkFBd0IsdUJBQXVCLElBQUksWUFDckQsWUFBWSxjQUFjLE9BQU8sRUFBRSxPQUFPLEdBQUcsU0FBUzs7O29CQUk5RCxHQUFHLDZCQUE2QixZQUFNO3dCQUNsQyxJQUFJLE9BQU87NEJBQ1gsT0FBTyxJQUFJOzt3QkFFWCxLQUFLLFFBQVEsUUFBUTs7d0JBRXJCLEtBQUssU0FBUyxHQUFHLElBQUk7O3dCQUVyQixPQUFPLHVCQUF1QixxQkFBcUIscUJBQy9DLEdBQUcsSUFBSSxNQUFNOzs7b0JBS3JCLEdBQUcsK0JBQStCLFlBQU07d0JBQ3BDLElBQUksT0FBTzs0QkFDWCxPQUFPLElBQUk7O3dCQUVYLEtBQUssUUFBUTt3QkFDYixLQUFLLFNBQVMsR0FBRyxJQUFJOzt3QkFFckIsT0FBTyx1QkFBdUIscUJBQXFCLHFCQUMvQyxHQUFHLElBQUksTUFBTTs7OztnQkFNekIsU0FBUyxpQkFBaUIsWUFBTTtvQkFDNUIsR0FBRyx1QkFBdUIsWUFBTTt3QkFDNUIsSUFBSSxPQUFPO3dCQUNYLE1BQU0sS0FBSyxRQUFRO3dCQUNuQixLQUFLO3dCQUNMLE9BQU8sS0FBSyxPQUFPLElBQUkscUJBQXFCOzs7Ozs7R0FhckQiLCJmaWxlIjoiYWxlcnQvQWxlcnREZWZpbml0aW9uQ3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAoYykgQ29weXJpZ2h0IDIwMDggU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWxlcnRNb2R1bGUgZnJvbSAnYWxlcnQvQWxlcnRNb2R1bGUnO1xuaW1wb3J0IGRhdGFWaWV3TW9kdWxlIGZyb20gJ2NvbW1vbi9kYXRhdmlldy9EYXRhVmlld01vZHVsZSc7XG5pbXBvcnQgdXRpbE1vZHVsZSBmcm9tICdjb21tb24vdXRpbC9VdGlsTW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5cbmRlc2NyaWJlKCdBbGVydERlZmluaXRpb25DdHJsJywgKCkgPT4ge1xuXG4gICAgbGV0IGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UsIEFsZXJ0RGVmaW5pdGlvbiwgdGVzdFNlcnZpY2UsICRjb250cm9sbGVyLCAkcm9vdFNjb3BlLCBTb3J0T3JkZXIsIFBhZ2luZ0RhdGEsICRzdGF0ZTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFsZXJ0TW9kdWxlLCBkYXRhVmlld01vZHVsZSwgdXRpbE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczo4ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF9hbGVydERlZmluaXRpb25TZXJ2aWNlXywgX0FsZXJ0RGVmaW5pdGlvbl8sIF90ZXN0U2VydmljZV8sIF8kY29udHJvbGxlcl8sIF8kcm9vdFNjb3BlXyxcbiAgICAgICAgX1NvcnRPcmRlcl8sIF9QYWdpbmdEYXRhXywgXyRzdGF0ZV8pID0+IHtcblxuICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlID0gX2FsZXJ0RGVmaW5pdGlvblNlcnZpY2VfO1xuICAgICAgICBBbGVydERlZmluaXRpb24gPSBfQWxlcnREZWZpbml0aW9uXztcbiAgICAgICAgdGVzdFNlcnZpY2UgPSBfdGVzdFNlcnZpY2VfO1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgICAgICBQYWdpbmdEYXRhID0gX1BhZ2luZ0RhdGFfO1xuICAgICAgICAkc3RhdGUgPSBfJHN0YXRlXztcbiAgICB9KSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKCkge1xuICAgICAgICByZXR1cm4gJGNvbnRyb2xsZXIoJ0FsZXJ0RGVmaW5pdGlvbkN0cmwnLCB7XG4gICAgICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlOiBhbGVydERlZmluaXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgQWxlcnREZWZpbml0aW9uOiBBbGVydERlZmluaXRpb24sXG4gICAgICAgICAgICBTb3J0T3JkZXI6IFNvcnRPcmRlcixcbiAgICAgICAgICAgIFBhZ2luZ0RhdGE6IFBhZ2luZ0RhdGEsXG4gICAgICAgICAgICAkc3RhdGU6ICRzdGF0ZVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGRlc2NyaWJlKCdnZXRJdGVtcycsICgpID0+IHtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGRvbid0IGNhcmUgd2hhdCB0aGUgcmVzdWx0cyBhcmUgZm9yIHRoZXNlIHRlc3RzIGp1c3QgdGhlIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIC8vIHRoYXQgdGhlIGZ1bmN0aW9uIHdhcyBjYWxsZWQgd2l0aFxuICAgICAgICAgICAgc3B5T24oYWxlcnREZWZpbml0aW9uU2VydmljZSwgJ2dldEFsZXJ0RGVmaW5pdGlvbnMnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgeyBjb3VudDogMCwgb2JqZWN0czogW10gfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IGEgZGVmYXVsdCBzb3J0JywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuXG4gICAgICAgICAgICBzb3J0LmFkZFNvcnQoJ25hbWUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGN0cmwuZ2V0SXRlbXMoMCwgMTAsIG51bGwpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWxlcnREZWZpbml0aW9uU2VydmljZS5nZXRBbGVydERlZmluaXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICAwLCAxMCwgc29ydCwgdW5kZWZpbmVkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHRoZSBxdWVyeSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgIHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XG5cbiAgICAgICAgICAgIGN0cmwucXVlcnkgPSAnZm9vJztcbiAgICAgICAgICAgIGN0cmwuZ2V0SXRlbXMoMCwgMTAsIHNvcnQpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWxlcnREZWZpbml0aW9uU2VydmljZS5nZXRBbGVydERlZmluaXRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgICAgICAwLCAxMCwgc29ydCwgJ2ZvbydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmV3RGVmaW5pdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjaGFuZ2Ugc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgICAgIHNweU9uKGN0cmwuJHN0YXRlLCAnZ28nKTtcbiAgICAgICAgICAgIGN0cmwubmV3RGVmaW5pdGlvbigpO1xuICAgICAgICAgICAgZXhwZWN0KGN0cmwuJHN0YXRlLmdvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnbmV3RGVmaW5pdGlvbicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
