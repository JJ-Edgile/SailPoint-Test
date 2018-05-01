System.register(['test/js/TestInitializer', 'alert/AlertModule', './AlertDefinitionTestData'], function (_export) {
    /*
    *  (c) Copyright 2008 SailPoint Technologies, Inc., All Rights Reserved.
    */

    /*
    * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
    */

    'use strict';

    var alertModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_AlertDefinitionTestData) {}],
        execute: function () {

            /**
            Tests for AlertDefinitionService
            */
            describe('AlertDefinitionService', function () {
                var baseURLAlertDefinitions = '/identityiq/rest/alertDefinitions';
                var AlertDefinition = undefined,
                    alertDefinitionService = undefined,
                    alertDefinitionTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                beforeEach(module(alertModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_NAME', 'spadmin');
                }));

                beforeEach(inject(function (_AlertDefinition_, _alertDefinitionService_, _alertDefinitionTestData_, _$httpBackend_, _SortOrder_) {
                    AlertDefinition = _AlertDefinition_;
                    alertDefinitionService = _alertDefinitionService_;
                    alertDefinitionTestData = _alertDefinitionTestData_;
                    $httpBackend = _$httpBackend_;
                    SortOrder = _SortOrder_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('get alert definitions', function () {

                    var response = undefined,
                        alertdef1 = undefined,
                        alertdef2 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        alertdef1 = alertDefinitionTestData.ALERTDEF1;
                        alertdef2 = alertDefinitionTestData.ALERTDEF2;
                        response = {
                            count: 2,
                            objects: [alertdef1, alertdef2]
                        };
                    });

                    function verifyResult(promise, expectedCount) {
                        if (angular.isUndefined(expectedCount)) {
                            expectedCount = 2;
                        }
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                            expect(response.data).not.toBe(null);
                            expect(response.data.objects).not.toBe(null);
                            var objects = response.data.objects;
                            expect(response.data.count).toEqual(expectedCount);
                            expect(objects.length).toEqual(expectedCount);
                            objects.forEach(function (obj) {
                                expect(obj instanceof AlertDefinition).toBeTruthy();
                            });
                        });
                    }

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLAlertDefinitions).respond(200, response);
                        promise = alertDefinitionService.getAlertDefinitions(null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination options', function () {
                        $httpBackend.expectGET(baseURLAlertDefinitions + '?limit=1&start=2').respond(200, response);
                        promise = alertDefinitionService.getAlertDefinitions(2, 1, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with sorting info', function () {
                        var sort = new SortOrder();
                        sort.addSort('name', true);

                        $httpBackend.expectGET(baseURLAlertDefinitions + '?limit=10&sort=%5B%7B%22property%22:%22name%22,%22direction%22:%22ASC%22%7D%5D&start=10').respond(200, response);

                        promise = alertDefinitionService.getAlertDefinitions(10, 10, sort);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                describe('get alert definition details', function () {
                    var promise = undefined;
                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLAlertDefinitions + '/1').respond(200, alertDefinitionTestData.ALERTDEF1);
                        promise = alertDefinitionService.getAlertDefinitionDetails(1);
                        promise.then(function (response) {
                            expect(response).toEqual(new AlertDefinition(alertDefinitionTestData.ALERTDEF1));
                        });
                        $httpBackend.flush();
                    });
                });

                describe('create Alert Definition', function () {
                    it('accepts a request', function () {
                        $httpBackend.expectPOST(baseURLAlertDefinitions, alertDefinitionTestData.ALERTDEF1).respond(201, undefined);
                        alertDefinitionService.create(alertDefinitionTestData.ALERTDEF1);
                        $httpBackend.flush();
                    });
                });

                describe('update Alert Definition', function () {
                    it('accepts a request', function () {
                        $httpBackend.expectPUT(baseURLAlertDefinitions + '/1', alertDefinitionTestData.ALERTDEF1).respond(200, undefined);
                        alertDefinitionService.update(alertDefinitionTestData.ALERTDEF1);
                        $httpBackend.flush();
                    });
                });

                describe('delete Alert Definition', function () {
                    it('accepts a request', function () {
                        $httpBackend.expectDELETE(baseURLAlertDefinitions + '/1').respond(200, undefined);
                        alertDefinitionService.remove('1');
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0RGVmaW5pdGlvblNlcnZpY2VUZXN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsQ0FBQywyQkFBMkIscUJBQXFCLDhCQUE4QixVQUFVLFNBQVM7Ozs7Ozs7OztJQVM5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsbUJBQW1CO1lBQ3pFLGNBQWMsa0JBQWtCO1dBQ2pDLFVBQVUsMEJBQTBCO1FBQ3ZDLFNBQVMsWUFBWTs7Ozs7WUFEN0IsU0FBUywwQkFBMEIsWUFBVztnQkFDMUMsSUFBTSwwQkFBMEI7Z0JBQ2hDLElBQUksa0JBQWU7b0JBQUUseUJBQXNCO29CQUFFLDBCQUF1QjtvQkFBRSxlQUFZO29CQUFFLFlBQVM7O2dCQUU3RixXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1CO29CQUNyQyxTQUFTLFNBQVMscUJBQXFCOzs7Z0JBRzNDLFdBQVcsT0FBTyxVQUFTLG1CQUFtQiwwQkFBMEIsMkJBQTJCLGdCQUN4RSxhQUFhO29CQUNwQyxrQkFBa0I7b0JBQ2xCLHlCQUF5QjtvQkFDekIsMEJBQTBCO29CQUMxQixlQUFlO29CQUNmLFlBQVk7OztnQkFHaEIsVUFBVSxZQUFXO29CQUNqQixhQUFhO29CQUNiLGFBQWE7OztnQkFLakIsU0FBUyx5QkFBeUIsWUFBVzs7b0JBRXpDLElBQUksV0FBUTt3QkFBRSxZQUFTO3dCQUFFLFlBQVM7d0JBQUUsVUFBTzs7b0JBRTNDLFdBQVcsWUFBVzt3QkFDbEIsWUFBWSx3QkFBd0I7d0JBQ3BDLFlBQVksd0JBQXdCO3dCQUNwQyxXQUFXOzRCQUNQLE9BQU87NEJBQ1AsU0FBUyxDQUFFLFdBQVc7Ozs7b0JBSTlCLFNBQVMsYUFBYSxTQUFTLGVBQWU7d0JBQzFDLElBQUksUUFBUSxZQUFZLGdCQUFnQjs0QkFDcEMsZ0JBQWdCOzt3QkFFcEIsT0FBTyxTQUFTO3dCQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFVBQVUsSUFBSSxLQUFLOzRCQUMxQixPQUFPLFNBQVMsTUFBTSxJQUFJLEtBQUs7NEJBQy9CLE9BQU8sU0FBUyxLQUFLLFNBQVMsSUFBSSxLQUFLOzRCQUN2QyxJQUFJLFVBQVUsU0FBUyxLQUFLOzRCQUM1QixPQUFPLFNBQVMsS0FBSyxPQUFPLFFBQVE7NEJBQ3BDLE9BQU8sUUFBUSxRQUFRLFFBQVE7NEJBQy9CLFFBQVEsUUFBUSxVQUFBLEtBQU87Z0NBQ25CLE9BQU8sZUFBZSxpQkFBaUI7Ozs7O29CQUtuRCxHQUFHLHFCQUFxQixZQUFXO3dCQUMvQixhQUFhLFVBQVUseUJBQ25CLFFBQVEsS0FBSzt3QkFDakIsVUFBVSx1QkFBdUIsb0JBQW9CLE1BQU0sTUFBTTt3QkFDakUsYUFBYTt3QkFDYixhQUFhOzs7b0JBR2pCLEdBQUcsNkNBQTZDLFlBQVc7d0JBQ3ZELGFBQWEsVUFBVSwwQkFBMEIsb0JBQzdDLFFBQVEsS0FBSzt3QkFDakIsVUFBVSx1QkFBdUIsb0JBQW9CLEdBQUcsR0FBRzt3QkFDM0QsYUFBYTt3QkFDYixhQUFhOzs7b0JBR2pCLEdBQUcsdUNBQXVDLFlBQVc7d0JBQ2pELElBQUksT0FBTyxJQUFJO3dCQUNmLEtBQUssUUFBUSxRQUFROzt3QkFFckIsYUFBYSxVQUNULDBCQUNJLDJGQUNOLFFBQVEsS0FBSzs7d0JBRWYsVUFBVSx1QkFBdUIsb0JBQW9CLElBQUksSUFBSTt3QkFDN0QsYUFBYTt3QkFDYixhQUFhOzs7O2dCQU1yQixTQUFTLGdDQUFnQyxZQUFNO29CQUMzQyxJQUFJLFVBQU87b0JBQ1gsR0FBSSxxQkFBcUIsWUFBTTt3QkFDM0IsYUFBYSxVQUFVLDBCQUEwQixNQUM3QyxRQUFRLEtBQUssd0JBQXdCO3dCQUN6QyxVQUFVLHVCQUF1QiwwQkFBMEI7d0JBQzNELFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sVUFBVSxRQUFRLElBQUksZ0JBQWdCLHdCQUF3Qjs7d0JBRXpFLGFBQWE7Ozs7Z0JBSXJCLFNBQVMsMkJBQTJCLFlBQU07b0JBQ3RDLEdBQUkscUJBQXFCLFlBQU07d0JBQzNCLGFBQWEsV0FBVyx5QkFBeUIsd0JBQXdCLFdBQ3JFLFFBQVEsS0FBSzt3QkFDakIsdUJBQXVCLE9BQU8sd0JBQXdCO3dCQUN0RCxhQUFhOzs7O2dCQUlyQixTQUFTLDJCQUEyQixZQUFNO29CQUN0QyxHQUFJLHFCQUFxQixZQUFNO3dCQUMzQixhQUFhLFVBQVUsMEJBQTBCLE1BQU0sd0JBQXdCLFdBQy9FLFFBQVEsS0FBSzt3QkFDYix1QkFBdUIsT0FBTyx3QkFBd0I7d0JBQ3RELGFBQWE7Ozs7Z0JBSXJCLFNBQVMsMkJBQTJCLFlBQU07b0JBQ3RDLEdBQUkscUJBQXFCLFlBQU07d0JBQzNCLGFBQWEsYUFBYSwwQkFBMEIsTUFDcEQsUUFBUSxLQUFLO3dCQUNiLHVCQUF1QixPQUFPO3dCQUM5QixhQUFhOzs7Ozs7R0FLdEIiLCJmaWxlIjoiYWxlcnQvQWxlcnREZWZpbml0aW9uU2VydmljZVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogIChjKSBDb3B5cmlnaHQgMjAwOCBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLlxuKi9cblxuLypcbiogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBhbGVydE1vZHVsZSBmcm9tICdhbGVydC9BbGVydE1vZHVsZSc7XG5pbXBvcnQgJy4vQWxlcnREZWZpbml0aW9uVGVzdERhdGEnO1xuXG4vKipcblRlc3RzIGZvciBBbGVydERlZmluaXRpb25TZXJ2aWNlXG4qL1xuZGVzY3JpYmUoJ0FsZXJ0RGVmaW5pdGlvblNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBiYXNlVVJMQWxlcnREZWZpbml0aW9ucyA9ICcvaWRlbnRpdHlpcS9yZXN0L2FsZXJ0RGVmaW5pdGlvbnMnO1xuICAgIGxldCBBbGVydERlZmluaXRpb24sIGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UsIGFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLCAkaHR0cEJhY2tlbmQsIFNvcnRPcmRlcjtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFsZXJ0TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfTkFNRScsICdzcGFkbWluJyk7XG4gICAgfSkpO1xuXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX0FsZXJ0RGVmaW5pdGlvbl8sIF9hbGVydERlZmluaXRpb25TZXJ2aWNlXywgX2FsZXJ0RGVmaW5pdGlvblRlc3REYXRhXywgXyRodHRwQmFja2VuZF8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1NvcnRPcmRlcl8pIHtcbiAgICAgICAgQWxlcnREZWZpbml0aW9uID0gX0FsZXJ0RGVmaW5pdGlvbl87XG4gICAgICAgIGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UgPSBfYWxlcnREZWZpbml0aW9uU2VydmljZV87XG4gICAgICAgIGFsZXJ0RGVmaW5pdGlvblRlc3REYXRhID0gX2FsZXJ0RGVmaW5pdGlvblRlc3REYXRhXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIFNvcnRPcmRlciA9IF9Tb3J0T3JkZXJfO1xuICAgIH0pKTtcblxuICAgIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcbiAgICB9KTtcblxuXG5cbiAgICBkZXNjcmliZSgnZ2V0IGFsZXJ0IGRlZmluaXRpb25zJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlLCBhbGVydGRlZjEsIGFsZXJ0ZGVmMiwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnRkZWYxID0gYWxlcnREZWZpbml0aW9uVGVzdERhdGEuQUxFUlRERUYxO1xuICAgICAgICAgICAgYWxlcnRkZWYyID0gYWxlcnREZWZpbml0aW9uVGVzdERhdGEuQUxFUlRERUYyO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgb2JqZWN0czogWyBhbGVydGRlZjEsIGFsZXJ0ZGVmMiBdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgZXhwZWN0ZWRDb3VudCkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZENvdW50ID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqZWN0cyA9IHJlc3BvbnNlLmRhdGEub2JqZWN0cztcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb3VudCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0cy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRDb3VudCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0cy5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChvYmogaW5zdGFuY2VvZiBBbGVydERlZmluaXRpb24pLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxBbGVydERlZmluaXRpb25zKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0RGVmaW5pdGlvblNlcnZpY2UuZ2V0QWxlcnREZWZpbml0aW9ucyhudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBwYWdpbmF0aW9uIG9wdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0RGVmaW5pdGlvbnMgKyAnP2xpbWl0PTEmc3RhcnQ9MicpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnREZWZpbml0aW9uU2VydmljZS5nZXRBbGVydERlZmluaXRpb25zKDIsIDEsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHNvcnRpbmcgaW5mbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNvcnQgPSBuZXcgU29ydE9yZGVyKCk7XG4gICAgICAgICAgICBzb3J0LmFkZFNvcnQoJ25hbWUnLCB0cnVlKTtcblxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChcbiAgICAgICAgICAgICAgICBiYXNlVVJMQWxlcnREZWZpbml0aW9ucyArXG4gICAgICAgICAgICAgICAgICAgICc/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJuYW1lJTIyLCUyMmRpcmVjdGlvbiUyMjolMjJBU0MlMjIlN0QlNUQmc3RhcnQ9MTAnXG4gICAgICAgICAgICApLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydERlZmluaXRpb25TZXJ2aWNlLmdldEFsZXJ0RGVmaW5pdGlvbnMoMTAsIDEwLCBzb3J0KTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGFsZXJ0IGRlZmluaXRpb24gZGV0YWlscycsICgpID0+IHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIGl0ICgnYWNjZXB0cyBhIHJlcXVlc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxBbGVydERlZmluaXRpb25zICsgJy8xJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIGFsZXJ0RGVmaW5pdGlvblRlc3REYXRhLkFMRVJUREVGMSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnREZWZpbml0aW9uU2VydmljZS5nZXRBbGVydERlZmluaXRpb25EZXRhaWxzKDEpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS50b0VxdWFsKG5ldyBBbGVydERlZmluaXRpb24oYWxlcnREZWZpbml0aW9uVGVzdERhdGEuQUxFUlRERUYxKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjcmVhdGUgQWxlcnQgRGVmaW5pdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQgKCdhY2NlcHRzIGEgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQT1NUKGJhc2VVUkxBbGVydERlZmluaXRpb25zLCBhbGVydERlZmluaXRpb25UZXN0RGF0YS5BTEVSVERFRjEpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAxLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgYWxlcnREZWZpbml0aW9uU2VydmljZS5jcmVhdGUoYWxlcnREZWZpbml0aW9uVGVzdERhdGEuQUxFUlRERUYxKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd1cGRhdGUgQWxlcnQgRGVmaW5pdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQgKCdhY2NlcHRzIGEgcmVxdWVzdCcsICgpID0+IHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RQVVQoYmFzZVVSTEFsZXJ0RGVmaW5pdGlvbnMgKyAnLzEnLCBhbGVydERlZmluaXRpb25UZXN0RGF0YS5BTEVSVERFRjEpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlLnVwZGF0ZShhbGVydERlZmluaXRpb25UZXN0RGF0YS5BTEVSVERFRjEpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2RlbGV0ZSBBbGVydCBEZWZpbml0aW9uJywgKCkgPT4ge1xuICAgICAgICBpdCAoJ2FjY2VwdHMgYSByZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdERFTEVURShiYXNlVVJMQWxlcnREZWZpbml0aW9ucyArICcvMScpLlxuICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhbGVydERlZmluaXRpb25TZXJ2aWNlLnJlbW92ZSgnMScpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
