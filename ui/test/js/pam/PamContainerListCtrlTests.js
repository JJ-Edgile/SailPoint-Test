System.register(['test/js/TestInitializer', 'pam/PamModule', 'test/js/TestModule'], function (_export) {
    /*
     * (c) Copyright 2017. SailPoint Technologies, Inc., All Rights Reserved.
     */
    'use strict';

    var pamModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_pamPamModule) {
            pamModule = _pamPamModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {

            describe('PamContainerListCtrl', function () {

                var $controller = undefined,
                    $rootScope = undefined,
                    $scope = undefined,
                    spModal = undefined,
                    pamContainerListService = undefined,
                    testService = undefined,
                    $httpBackend = undefined,
                    $q = undefined,
                    configUrl = undefined;

                beforeEach(module(pamModule, testModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$httpBackend_, _pamContainerListService_, _testService_, _spModal_) {
                    $controller = _$controller_;
                    $rootScope = _$rootScope_;
                    testService = _testService_;
                    $httpBackend = _$httpBackend_;
                    spModal = _spModal_;
                    $q = _$q_;
                    pamContainerListService = _pamContainerListService_;
                    configUrl = '/ui/rest/configuration/uiconfig/entries?key=pamUiContainerList';
                }));

                function createController() {
                    $scope = $rootScope.$new();
                    var ctrl = $controller('PamContainerListCtrl', {
                        $scope: $scope,
                        pamContainerListService: pamContainerListService
                    });
                    $rootScope.$digest();
                    $httpBackend.flush();
                    return ctrl;
                }

                describe('search', function () {
                    it('doSearch() calls service with searchTerm', function () {
                        spyOn(pamContainerListService, 'getContainers').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var ctrl = createController(),
                            searchTerm = 'test',
                            filters = [],
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        expect(pamContainerListService.getContainers).toHaveBeenCalled();
                        pamContainerListService.getContainers.calls.reset();

                        ctrl.doSearch(searchTerm, filters, start, limit, sortOrder);

                        expect(pamContainerListService.getContainers).toHaveBeenCalledWith(searchTerm, filters, start, limit, sortOrder);
                    });
                });

                describe('doSearch', function () {
                    it('doSearch() calls service', function () {
                        spyOn(pamContainerListService, 'getContainers').and.callFake(function () {
                            return testService.createPromise(false, {}, {});
                        });
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        var ctrl = createController(),
                            searchTerm = null,
                            filters = [],
                            start = 0,
                            limit = 10,
                            sortOrder = { blah: 'test' };
                        expect(pamContainerListService.getContainers).toHaveBeenCalled();
                        pamContainerListService.getContainers.calls.reset();

                        ctrl.doSearch(searchTerm, filters, start, limit, sortOrder);

                        expect(pamContainerListService.getContainers).toHaveBeenCalledWith(searchTerm, filters, start, limit, sortOrder);
                    });

                    it('doSearch() shows error modal when fails', function () {
                        spyOn(pamContainerListService, 'getContainers').and.callFake(function () {
                            var deferred = $q.defer();
                            deferred.reject({
                                data: {
                                    message: ['ui_pam_application_error.']
                                },
                                status: 500
                            });
                            return deferred.promise;
                        });
                        $httpBackend.expectGET(configUrl).respond(200, {});
                        spyOn(spModal, 'open').and.callFake(angular.noop);
                        createController();
                        $scope.$apply();
                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbS9QYW1Db250YWluZXJMaXN0Q3RybFRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixpQkFBaUIsdUJBQXVCLFVBQVUsU0FBUzs7OztJQUluRzs7SUFFQSxJQUFJLFdBQVc7SUFDZixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxlQUFlO1lBQ3JFLFlBQVksY0FBYztXQUMzQixVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjs7UUFFbkMsU0FBUyxZQUFZOztZQU43QixTQUFTLHdCQUF3QixZQUFXOztnQkFFeEMsSUFBSSxjQUFXO29CQUFFLGFBQVU7b0JBQUUsU0FBTTtvQkFBRSxVQUFPO29CQUFFLDBCQUF1QjtvQkFBRSxjQUFXO29CQUFFLGVBQVk7b0JBQUUsS0FBRTtvQkFBRSxZQUFTOztnQkFFL0csV0FBVyxPQUFPLFdBQVc7OztnQkFHN0IsV0FBVyxPQUFPLFVBQVMsZUFBZSxNQUFNLGNBQWMsZ0JBQWdCLDJCQUNuRCxlQUFlLFdBQVc7b0JBQ2pELGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsVUFBVTtvQkFDVixLQUFLO29CQUNMLDBCQUEwQjtvQkFDMUIsWUFBWTs7O2dCQUdoQixTQUFTLG1CQUFtQjtvQkFDeEIsU0FBUyxXQUFXO29CQUNwQixJQUFJLE9BQU8sWUFBWSx3QkFBd0I7d0JBQ3ZDLFFBQVE7d0JBQ1IseUJBQXlCOztvQkFFakMsV0FBVztvQkFDWCxhQUFhO29CQUNiLE9BQU87OztnQkFHWCxTQUFTLFVBQVUsWUFBVztvQkFDMUIsR0FBRyw0Q0FBNEMsWUFBVzt3QkFDdEQsTUFBTSx5QkFBeUIsaUJBQWlCLElBQUksU0FBUyxZQUFXOzRCQUNwRSxPQUFPLFlBQVksY0FBYyxPQUFPLElBQUk7O3dCQUVoRCxhQUFhLFVBQVUsV0FBVyxRQUFRLEtBQUs7d0JBQy9DLElBQUksT0FBTzs0QkFDUCxhQUFhOzRCQUNiLFVBQVU7NEJBQ1YsUUFBUTs0QkFDUixRQUFROzRCQUNSLFlBQVksRUFBQyxNQUFNO3dCQUN2QixPQUFPLHdCQUF3QixlQUFlO3dCQUM5Qyx3QkFBd0IsY0FBYyxNQUFNOzt3QkFFNUMsS0FBSyxTQUFTLFlBQVksU0FBUyxPQUFPLE9BQU87O3dCQUVqRCxPQUFPLHdCQUF3QixlQUMzQixxQkFBcUIsWUFBWSxTQUFTLE9BQU8sT0FBTzs7OztnQkFJcEUsU0FBUyxZQUFZLFlBQVc7b0JBQzVCLEdBQUcsNEJBQTRCLFlBQVc7d0JBQ3RDLE1BQU0seUJBQXlCLGlCQUFpQixJQUFJLFNBQVMsWUFBVzs0QkFDcEUsT0FBTyxZQUFZLGNBQWMsT0FBTyxJQUFJOzt3QkFFaEQsYUFBYSxVQUFVLFdBQVcsUUFBUSxLQUFLO3dCQUMvQyxJQUFJLE9BQU87NEJBQ1AsYUFBYTs0QkFDYixVQUFVOzRCQUNWLFFBQVE7NEJBQ1IsUUFBUTs0QkFDUixZQUFZLEVBQUMsTUFBTTt3QkFDdkIsT0FBTyx3QkFBd0IsZUFBZTt3QkFDOUMsd0JBQXdCLGNBQWMsTUFBTTs7d0JBRTVDLEtBQUssU0FBUyxZQUFZLFNBQVMsT0FBTyxPQUFPOzt3QkFFakQsT0FBTyx3QkFBd0IsZUFDM0IscUJBQXFCLFlBQVksU0FBUyxPQUFPLE9BQU87OztvQkFHaEUsR0FBRywyQ0FBMkMsWUFBVzt3QkFDckQsTUFBTSx5QkFBeUIsaUJBQWlCLElBQUksU0FBUyxZQUFXOzRCQUNwRSxJQUFJLFdBQVcsR0FBRzs0QkFDbEIsU0FBUyxPQUFPO2dDQUNaLE1BQU07b0NBQ0YsU0FBUyxDQUFFOztnQ0FFZixRQUFROzs0QkFFWixPQUFPLFNBQVM7O3dCQUVwQixhQUFhLFVBQVUsV0FBVyxRQUFRLEtBQUs7d0JBQy9DLE1BQU0sU0FBUyxRQUFRLElBQUksU0FBUyxRQUFRO3dCQUM1Qzt3QkFDQSxPQUFPO3dCQUNQLE9BQU8sUUFBUSxNQUFNOzs7Ozs7R0FtQjlCIiwiZmlsZSI6InBhbS9QYW1Db250YWluZXJMaXN0Q3RybFRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIChjKSBDb3B5cmlnaHQgMjAxNy4gU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiwgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqL1xuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgcGFtTW9kdWxlIGZyb20gJ3BhbS9QYW1Nb2R1bGUnO1xuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcblxuZGVzY3JpYmUoJ1BhbUNvbnRhaW5lckxpc3RDdHJsJywgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIsICRyb290U2NvcGUsICRzY29wZSwgc3BNb2RhbCwgcGFtQ29udGFpbmVyTGlzdFNlcnZpY2UsIHRlc3RTZXJ2aWNlLCAkaHR0cEJhY2tlbmQsICRxLCBjb25maWdVcmw7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShwYW1Nb2R1bGUsIHRlc3RNb2R1bGUpKTtcblxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDcgKi9cbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJGNvbnRyb2xsZXJfLCBfJHFfLCBfJHJvb3RTY29wZV8sIF8kaHR0cEJhY2tlbmRfLCBfcGFtQ29udGFpbmVyTGlzdFNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90ZXN0U2VydmljZV8sIF9zcE1vZGFsXykge1xuICAgICAgICAkY29udHJvbGxlciA9IF8kY29udHJvbGxlcl87XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIHNwTW9kYWwgPSBfc3BNb2RhbF87XG4gICAgICAgICRxID0gXyRxXztcbiAgICAgICAgcGFtQ29udGFpbmVyTGlzdFNlcnZpY2UgPSBfcGFtQ29udGFpbmVyTGlzdFNlcnZpY2VfO1xuICAgICAgICBjb25maWdVcmwgPSAnL3VpL3Jlc3QvY29uZmlndXJhdGlvbi91aWNvbmZpZy9lbnRyaWVzP2tleT1wYW1VaUNvbnRhaW5lckxpc3QnO1xuICAgIH0pKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoKSB7XG4gICAgICAgICRzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICBsZXQgY3RybCA9ICRjb250cm9sbGVyKCdQYW1Db250YWluZXJMaXN0Q3RybCcsIHtcbiAgICAgICAgICAgICAgICAkc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICAgICAgICBwYW1Db250YWluZXJMaXN0U2VydmljZTogcGFtQ29udGFpbmVyTGlzdFNlcnZpY2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAkcm9vdFNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIHJldHVybiBjdHJsO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzZWFyY2gnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ2RvU2VhcmNoKCkgY2FsbHMgc2VydmljZSB3aXRoIHNlYXJjaFRlcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHBhbUNvbnRhaW5lckxpc3RTZXJ2aWNlLCAnZ2V0Q29udGFpbmVycycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwge30sIHt9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICBsZXQgY3RybCA9IGNyZWF0ZUNvbnRyb2xsZXIoKSxcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtID0gJ3Rlc3QnLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMgPSBbXSxcbiAgICAgICAgICAgICAgICBzdGFydCA9IDAsXG4gICAgICAgICAgICAgICAgbGltaXQgPSAxMCxcbiAgICAgICAgICAgICAgICBzb3J0T3JkZXIgPSB7YmxhaDogJ3Rlc3QnfTtcbiAgICAgICAgICAgIGV4cGVjdChwYW1Db250YWluZXJMaXN0U2VydmljZS5nZXRDb250YWluZXJzKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBwYW1Db250YWluZXJMaXN0U2VydmljZS5nZXRDb250YWluZXJzLmNhbGxzLnJlc2V0KCk7XG5cbiAgICAgICAgICAgIGN0cmwuZG9TZWFyY2goc2VhcmNoVGVybSwgZmlsdGVycywgc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuXG4gICAgICAgICAgICBleHBlY3QocGFtQ29udGFpbmVyTGlzdFNlcnZpY2UuZ2V0Q29udGFpbmVycykuXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgoc2VhcmNoVGVybSwgZmlsdGVycywgc3RhcnQsIGxpbWl0LCBzb3J0T3JkZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdkb1NlYXJjaCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnZG9TZWFyY2goKSBjYWxscyBzZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihwYW1Db250YWluZXJMaXN0U2VydmljZSwgJ2dldENvbnRhaW5lcnMnKS5hbmQuY2FsbEZha2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHt9LCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoY29uZmlnVXJsKS5yZXNwb25kKDIwMCwge30pO1xuICAgICAgICAgICAgbGV0IGN0cmwgPSBjcmVhdGVDb250cm9sbGVyKCksXG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSA9IG51bGwsXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IFtdLFxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDEwLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlciA9IHtibGFoOiAndGVzdCd9O1xuICAgICAgICAgICAgZXhwZWN0KHBhbUNvbnRhaW5lckxpc3RTZXJ2aWNlLmdldENvbnRhaW5lcnMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIHBhbUNvbnRhaW5lckxpc3RTZXJ2aWNlLmdldENvbnRhaW5lcnMuY2FsbHMucmVzZXQoKTtcblxuICAgICAgICAgICAgY3RybC5kb1NlYXJjaChzZWFyY2hUZXJtLCBmaWx0ZXJzLCBzdGFydCwgbGltaXQsIHNvcnRPcmRlcik7XG5cbiAgICAgICAgICAgIGV4cGVjdChwYW1Db250YWluZXJMaXN0U2VydmljZS5nZXRDb250YWluZXJzKS5cbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aChzZWFyY2hUZXJtLCBmaWx0ZXJzLCBzdGFydCwgbGltaXQsIHNvcnRPcmRlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb1NlYXJjaCgpIHNob3dzIGVycm9yIG1vZGFsIHdoZW4gZmFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKHBhbUNvbnRhaW5lckxpc3RTZXJ2aWNlLCAnZ2V0Q29udGFpbmVycycpLmFuZC5jYWxsRmFrZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFsgJ3VpX3BhbV9hcHBsaWNhdGlvbl9lcnJvci4nIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA1MDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChjb25maWdVcmwpLnJlc3BvbmQoMjAwLCB7fSk7XG4gICAgICAgICAgICBzcHlPbihzcE1vZGFsLCAnb3BlbicpLmFuZC5jYWxsRmFrZShhbmd1bGFyLm5vb3ApO1xuICAgICAgICAgICAgY3JlYXRlQ29udHJvbGxlcigpO1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
