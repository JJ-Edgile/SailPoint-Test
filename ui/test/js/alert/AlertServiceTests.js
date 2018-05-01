System.register(['test/js/TestInitializer', 'alert/AlertModule', './AlertTestData'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    'use strict';

    var alertModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_alertAlertModule) {
            alertModule = _alertAlertModule['default'];
        }, function (_AlertTestData) {}],
        execute: function () {

            /**
             Tests for AlertService
             */
            describe('AlertService', function () {
                var baseURLAlerts = '/identityiq/rest/alerts';
                var Alert = undefined,
                    alertService = undefined,
                    alertTestData = undefined,
                    $httpBackend = undefined,
                    SortOrder = undefined;

                beforeEach(module(alertModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_NAME', 'spadmin');
                }));

                beforeEach(inject(function (_Alert_, _alertService_, _alertTestData_, _$httpBackend_, _SortOrder_) {
                    Alert = _Alert_;
                    alertService = _alertService_;
                    alertTestData = _alertTestData_;
                    $httpBackend = _$httpBackend_;
                    SortOrder = _SortOrder_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                function verifyResult(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 3;
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
                            expect(obj instanceof Alert).toBeTruthy();
                        });
                    });
                }

                describe('get alerts', function () {
                    var response = undefined,
                        alert1 = undefined,
                        alert2 = undefined,
                        alert3 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        alert1 = alertTestData.ALERT1;
                        alert2 = alertTestData.ALERT2;
                        alert3 = alertTestData.ALERT3;
                        response = {
                            count: 3,
                            objects: [alert1, alert2, alert3]
                        };
                    });

                    it('accepts a request', function () {
                        $httpBackend.expectGET(baseURLAlerts).respond(200, response);
                        promise = alertService.getAlerts(null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination options', function () {
                        $httpBackend.expectGET(baseURLAlerts + '?limit=1&start=2').respond(200, response);
                        promise = alertService.getAlerts(null, 2, 1);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with sorting info', function () {
                        var sort = new SortOrder();
                        sort.addSort('name', true);

                        $httpBackend.expectGET(baseURLAlerts + '?limit=10&sort=%5B%7B%22property%22:%22name%22,%22direction%22:%22ASC%22%7D%5D&start=10').respond(200, response);

                        promise = alertService.getAlerts(null, 10, 10, sort);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with name filter', function () {
                        var filters = {
                            name: {
                                value: 'name1'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?name=name1').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with source filter', function () {
                        var filters = {
                            source: {
                                value: 'source1'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?source=source1').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with nativeId filter', function () {
                        var filters = {
                            nativeId: {
                                value: 'nativeIdentity'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?nativeId=nativeIdentity').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with type filter', function () {
                        var filters = {
                            type: {
                                value: 'type1'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?type=type1').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with targetType filter', function () {
                        var filters = {
                            targetType: {
                                value: 'TargetType1'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?targetType=TargetType1').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with targetDisplayName filter', function () {
                        var filters = {
                            targetDisplayName: {
                                value: 'TargetDisplay'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?targetDisplayName=TargetDisplay').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with alertDateStart filter', function () {
                        var filters = {
                            alertDateStart: {
                                value: '1500000000100'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?alertDateStart=1500000000100').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with alertDateEnd filter', function () {
                        var filters = {
                            alertDateEnd: {
                                value: '1500000000101'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?alertDateEnd=1500000000101').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with lastProcessedStart filter', function () {
                        var filters = {
                            lastProcessedStart: {
                                value: '1500000000102'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?lastProcessedStart=1500000000102').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with lastProcessedEnd filter', function () {
                        var filters = {
                            lastProcessedEnd: {
                                value: '1500000000103'
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?lastProcessedEnd=1500000000103').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with actions filter', function () {
                        var filters = {
                            actions: {
                                value: true
                            }
                        };
                        $httpBackend.expectGET(baseURLAlerts + '?actions=true').respond(200, response);
                        promise = alertService.getAlerts(filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                describe('get alert details', function () {
                    var alert1 = undefined,
                        promise = undefined;

                    beforeEach(function () {
                        alert1 = alertTestData.ALERT1;
                    });

                    it('accepts Alert detailed request', function () {
                        $httpBackend.expectGET(baseURLAlerts + '/1').respond(200, alert1);
                        promise = alertService.getAlertDetails(1);
                        promise.then(function (response) {
                            expect(response).not.toBe(null);
                            expect(response['id']).toEqual('1');
                            expect(response['alertDate']).toEqual('01/01/2011');
                            expect(response['created']).toEqual('01/01/2016');
                            expect(response['displayName']).toEqual('Alert1');
                            expect(response['lastProcessed']).toEqual('02/26/2016');
                            expect(response['name']).toEqual('Name1');
                            expect(response['source']).toEqual('Source1');
                            expect(response['targetDisplayName']).toEqual('Mickey Mouse');
                            expect(response['targetId']).toEqual('1111');
                            expect(response['targetType']).toEqual('Identity');
                            expect(response['type']).toEqual('alert');
                            expect(response['alertAttributes']).not.toBe(null);
                            expect(response['alertAttributes'].length).toEqual(1);
                            expect(response['alertAttributes'][0]['displayName']).toEqual('Not Shown');
                            expect(response['alertAttributes'][0]['name']).toEqual('notshown');
                            expect(response['alertAttributes'][0]['value']).toEqual('value');
                            expect(response['alertAttributes'][0]['extendedAttribute']).toEqual(false);
                            expect(response['alertAttributes'][0]['foundInSchema']).toEqual(false);
                            expect(response['extendedAtts']).not.toBe(null);
                            expect(response['extendedAtts'].length).toEqual(1);
                            expect(response['extendedAtts'][0]['displayName']).toEqual('app');
                            expect(response['extendedAtts'][0]['name']).toEqual('app');
                            expect(response['extendedAtts'][0]['value']).toEqual('Active_Directory');
                            expect(response['extendedAtts'][0]['extendedAttribute']).toEqual(true);
                            expect(response['extendedAtts'][0]['foundInSchema']).toEqual(true);
                            expect(response['schemaAtts']).not.toBe(null);
                            expect(response['schemaAtts'].length).toEqual(1);
                            expect(response['schemaAtts'][0]['displayName']).toEqual('severity');
                            expect(response['schemaAtts'][0]['name']).toEqual('severity');
                            expect(response['schemaAtts'][0]['value']).toEqual('low');
                            expect(response['schemaAtts'][0]['extendedAttribute']).toEqual(false);
                            expect(response['schemaAtts'][0]['foundInSchema']).toEqual(true);
                        });
                        $httpBackend.flush();
                    });

                    it('reject if Alert does not exist', function () {
                        var promiseRejected = false;
                        $httpBackend.expectGET(baseURLAlerts + '/doesnotexist').respond(200, undefined);
                        alertService.getAlertDetails('doesnotexist')['catch'](function () {
                            return promiseRejected = true;
                        });
                        $httpBackend.flush();
                        expect(promiseRejected).toBeTruthy();
                    });
                });

                describe('openDetailsDialog', function () {
                    var spModal = undefined;

                    beforeEach(inject(function (_spModal_) {
                        spModal = _spModal_;
                    }));

                    it('should call the modal service', function () {
                        var alert = new Alert({ id: '1' });

                        spyOn(spModal, 'open');

                        alertService.openDetailsDialog(alert);

                        expect(spModal.open).toHaveBeenCalled();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0L0FsZXJ0U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQkFBcUIsb0JBQW9CLFVBQVUsU0FBUzs7Ozs7SUFLcEc7O0lBRUEsSUFBSTtJQUNKLE9BQU87UUFDSCxTQUFTLENBQUMsVUFBVSx3QkFBd0IsSUFBSSxVQUFVLG1CQUFtQjtZQUN6RSxjQUFjLGtCQUFrQjtXQUNqQyxVQUFVLGdCQUFnQjtRQUM3QixTQUFTLFlBQVk7Ozs7O1lBRDdCLFNBQVMsZ0JBQWdCLFlBQVc7Z0JBQ2hDLElBQU0sZ0JBQWdCO2dCQUN0QixJQUFJLFFBQUs7b0JBQUUsZUFBWTtvQkFBRSxnQkFBYTtvQkFBRSxlQUFZO29CQUFFLFlBQVM7O2dCQUUvRCxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1CO29CQUNyQyxTQUFTLFNBQVMscUJBQXFCOzs7Z0JBRzNDLFdBQVcsT0FBTyxVQUFTLFNBQVMsZ0JBQWdCLGlCQUFpQixnQkFBZ0IsYUFBYTtvQkFDOUYsUUFBUTtvQkFDUixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZixZQUFZOzs7Z0JBR2hCLFVBQVUsWUFBVztvQkFDakIsYUFBYTtvQkFDYixhQUFhOzs7Z0JBR2pCLFNBQVMsYUFBYSxTQUFTLGVBQWU7b0JBQzFDLElBQUksUUFBUSxZQUFZLGdCQUFnQjt3QkFDcEMsZ0JBQWdCOztvQkFFcEIsT0FBTyxTQUFTO29CQUNoQixRQUFRLEtBQUssVUFBUyxVQUFVO3dCQUM1QixPQUFPLFVBQVUsSUFBSSxLQUFLO3dCQUMxQixPQUFPLFNBQVMsTUFBTSxJQUFJLEtBQUs7d0JBQy9CLE9BQU8sU0FBUyxLQUFLLFNBQVMsSUFBSSxLQUFLO3dCQUN2QyxJQUFJLFVBQVUsU0FBUyxLQUFLO3dCQUM1QixPQUFPLFNBQVMsS0FBSyxPQUFPLFFBQVE7d0JBQ3BDLE9BQU8sUUFB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NEJBQzlDLE9BQU8sU0FBUyxjQUFjLEdBQUcsZ0JBQWdCLFFBQVE7NEJBQ3pELE9BQU8sU0FBUyxjQUFjLEdBQUcsU0FBUyxRQUFROzRCQUNsRCxPQUFPLFNBQVMsY0FBYyxHQUFHLFVBQVUsUUFBUTs0QkFDbkQsT0FBTyxTQUFTLGNBQWMsR0FBRyxzQkFBc0IsUUFBUTs0QkFDL0QsT0FBTyxTQUFTLGNBQWMsR0FBRyxrQkFBa0IsUUFBUTs7d0JBRy9ELGFBQWE7OztvQkFHakIsR0FBRyxrQ0FBa0MsWUFBVzt3QkFDNUMsSUFBSSxrQkFBa0I7d0JBQ3RCLGFBQWEsVUFBVSxnQkFBZ0IsaUJBQ25DLFFBQVEsS0FBSzt3QkFDakIsYUFBYSxnQkFBZ0IsZ0JBQWUsU0FDeEMsWUFBQTs0QkFMWSxPQUtOLGtCQUFrQjs7d0JBQzVCLGFBQWE7d0JBQ2IsT0FBTyxpQkFBaUI7Ozs7Z0JBS2hDLFNBQVMscUJBQXFCLFlBQU07b0JBQ2hDLElBQUksVUFBTzs7b0JBRVgsV0FBVyxPQUFPLFVBQUMsV0FBYzt3QkFDN0IsVUFBVTs7O29CQUdkLEdBQUcsaUNBQWlDLFlBQU07d0JBQ3RDLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRSxJQUFJOzt3QkFFNUIsTUFBTSxTQUFTOzt3QkFFZixhQUFhLGtCQUFrQjs7d0JBRS9CLE9BQU8sUUFBUSxNQUFNOzs7Ozs7R0FDOUIiLCJmaWxlIjoiYWxlcnQvQWxlcnRTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IFNhaWxQb2ludCBUZWNobm9sb2dpZXMsIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XG5pbXBvcnQgYWxlcnRNb2R1bGUgZnJvbSAnYWxlcnQvQWxlcnRNb2R1bGUnO1xuaW1wb3J0ICcuL0FsZXJ0VGVzdERhdGEnO1xuXG4vKipcbiBUZXN0cyBmb3IgQWxlcnRTZXJ2aWNlXG4gKi9cbmRlc2NyaWJlKCdBbGVydFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBiYXNlVVJMQWxlcnRzID0gJy9pZGVudGl0eWlxL3Jlc3QvYWxlcnRzJztcbiAgICBsZXQgQWxlcnQsIGFsZXJ0U2VydmljZSwgYWxlcnRUZXN0RGF0YSwgJGh0dHBCYWNrZW5kLCBTb3J0T3JkZXI7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShhbGVydE1vZHVsZSkpO1xuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoZnVuY3Rpb24oJHByb3ZpZGUpIHtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX05BTUUnLCAnc3BhZG1pbicpO1xuICAgIH0pKTtcblxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9BbGVydF8sIF9hbGVydFNlcnZpY2VfLCBfYWxlcnRUZXN0RGF0YV8sIF8kaHR0cEJhY2tlbmRfLCBfU29ydE9yZGVyXykge1xuICAgICAgICBBbGVydCA9IF9BbGVydF87XG4gICAgICAgIGFsZXJ0U2VydmljZSA9IF9hbGVydFNlcnZpY2VfO1xuICAgICAgICBhbGVydFRlc3REYXRhID0gX2FsZXJ0VGVzdERhdGFfO1xuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdmVyaWZ5UmVzdWx0KHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcbiAgICAgICAgICAgIGV4cGVjdGVkQ291bnQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHMpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XG4gICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5jb3VudCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIGV4cGVjdChvYmplY3RzLmxlbmd0aCkudG9FcXVhbChleHBlY3RlZENvdW50KTtcbiAgICAgICAgICAgIG9iamVjdHMuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvYmogaW5zdGFuY2VvZiBBbGVydCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdnZXQgYWxlcnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCByZXNwb25zZSwgYWxlcnQxLCBhbGVydDIsIGFsZXJ0MywgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQxID0gYWxlcnRUZXN0RGF0YS5BTEVSVDE7XG4gICAgICAgICAgICBhbGVydDIgPSBhbGVydFRlc3REYXRhLkFMRVJUMjtcbiAgICAgICAgICAgIGFsZXJ0MyA9IGFsZXJ0VGVzdERhdGEuQUxFUlQzO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgY291bnQ6IDMsXG4gICAgICAgICAgICAgICAgb2JqZWN0czogWyBhbGVydDEsIGFsZXJ0MiwgYWxlcnQzIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMQWxlcnRzKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0U2VydmljZS5nZXRBbGVydHMobnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggcGFnaW5hdGlvbiBvcHRpb25zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxBbGVydHMgKyAnP2xpbWl0PTEmc3RhcnQ9MicpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnRTZXJ2aWNlLmdldEFsZXJ0cyhudWxsLCAyLCAxKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBzb3J0aW5nIGluZm8nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuICAgICAgICAgICAgc29ydC5hZGRTb3J0KCduYW1lJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoXG4gICAgICAgICAgICAgICAgYmFzZVVSTEFsZXJ0cyArXG4gICAgICAgICAgICAgICAgICAgICc/bGltaXQ9MTAmc29ydD0lNUIlN0IlMjJwcm9wZXJ0eSUyMjolMjJuYW1lJTIyLCUyMmRpcmVjdGlvbiUyMjolMjJBU0MlMjIlN0QlNUQmc3RhcnQ9MTAnXG4gICAgICAgICAgICApLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKG51bGwsIDEwLCAxMCwgc29ydCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggbmFtZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICduYW1lMSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMQWxlcnRzICsgJz9uYW1lPW5hbWUxJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHNvdXJjZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIHNvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3NvdXJjZTEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/c291cmNlPXNvdXJjZTEnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0U2VydmljZS5nZXRBbGVydHMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggbmF0aXZlSWQgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBuYXRpdmVJZDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ25hdGl2ZUlkZW50aXR5J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxBbGVydHMgKyAnP25hdGl2ZUlkPW5hdGl2ZUlkZW50aXR5JykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIHR5cGUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndHlwZTEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/dHlwZT10eXBlMScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnRTZXJ2aWNlLmdldEFsZXJ0cyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCB0YXJnZXRUeXBlIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0VHlwZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1RhcmdldFR5cGUxJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGJhc2VVUkxBbGVydHMgKyAnP3RhcmdldFR5cGU9VGFyZ2V0VHlwZTEnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0U2VydmljZS5nZXRBbGVydHMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggdGFyZ2V0RGlzcGxheU5hbWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICB0YXJnZXREaXNwbGF5TmFtZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1RhcmdldERpc3BsYXknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/dGFyZ2V0RGlzcGxheU5hbWU9VGFyZ2V0RGlzcGxheScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnRTZXJ2aWNlLmdldEFsZXJ0cyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBhbGVydERhdGVTdGFydCBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGFsZXJ0RGF0ZVN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMTUwMDAwMDAwMDEwMCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMQWxlcnRzICsgJz9hbGVydERhdGVTdGFydD0xNTAwMDAwMDAwMTAwJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGFsZXJ0RGF0ZUVuZCBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGFsZXJ0RGF0ZUVuZDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzE1MDAwMDAwMDAxMDEnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/YWxlcnREYXRlRW5kPTE1MDAwMDAwMDAxMDEnKS5cbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0U2VydmljZS5nZXRBbGVydHMoZmlsdGVycywgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2FjY2VwdHMgYSByZXF1ZXN0IHdpdGggbGFzdFByb2Nlc3NlZFN0YXJ0IGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZFN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnMTUwMDAwMDAwMDEwMidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChiYXNlVVJMQWxlcnRzICsgJz9sYXN0UHJvY2Vzc2VkU3RhcnQ9MTUwMDAwMDAwMDEwMicpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XG4gICAgICAgICAgICBwcm9taXNlID0gYWxlcnRTZXJ2aWNlLmdldEFsZXJ0cyhmaWx0ZXJzLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBsYXN0UHJvY2Vzc2VkRW5kIGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7XG4gICAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZEVuZDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJzE1MDAwMDAwMDAxMDMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/bGFzdFByb2Nlc3NlZEVuZD0xNTAwMDAwMDAwMTAzJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGFjdGlvbnMgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICc/YWN0aW9ucz10cnVlJykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBhbGVydFNlcnZpY2UuZ2V0QWxlcnRzKGZpbHRlcnMsIG51bGwsIG51bGwpO1xuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IGFsZXJ0IGRldGFpbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGFsZXJ0MSwgcHJvbWlzZTtcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQxID0gYWxlcnRUZXN0RGF0YS5BTEVSVDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdhY2NlcHRzIEFsZXJ0IGRldGFpbGVkIHJlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICcvMScpLlxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCBhbGVydDEpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IGFsZXJ0U2VydmljZS5nZXRBbGVydERldGFpbHMoMSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnaWQnXSkudG9FcXVhbCgnMScpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnYWxlcnREYXRlJ10pLnRvRXF1YWwoJzAxLzAxLzIwMTEnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2NyZWF0ZWQnXSkudG9FcXVhbCgnMDEvMDEvMjAxNicpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZGlzcGxheU5hbWUnXSkudG9FcXVhbCgnQWxlcnQxJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydsYXN0UHJvY2Vzc2VkJ10pLnRvRXF1YWwoJzAyLzI2LzIwMTYnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ25hbWUnXSkudG9FcXVhbCgnTmFtZTEnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3NvdXJjZSddKS50b0VxdWFsKCdTb3VyY2UxJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWyd0YXJnZXREaXNwbGF5TmFtZSddKS50b0VxdWFsKCdNaWNrZXkgTW91c2UnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3RhcmdldElkJ10pLnRvRXF1YWwoJzExMTEnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3RhcmdldFR5cGUnXSkudG9FcXVhbCgnSWRlbnRpdHknKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3R5cGUnXSkudG9FcXVhbCgnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddLmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddWzBdWydkaXNwbGF5TmFtZSddKS50b0VxdWFsKCdOb3QgU2hvd24nKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddWzBdWyduYW1lJ10pLnRvRXF1YWwoJ25vdHNob3duJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydhbGVydEF0dHJpYnV0ZXMnXVswXVsndmFsdWUnXSkudG9FcXVhbCgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddWzBdWydleHRlbmRlZEF0dHJpYnV0ZSddKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ2FsZXJ0QXR0cmlidXRlcyddWzBdWydmb3VuZEluU2NoZW1hJ10pLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXh0ZW5kZWRBdHRzJ10pLm5vdC50b0JlKG51bGwpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXh0ZW5kZWRBdHRzJ10ubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXh0ZW5kZWRBdHRzJ11bMF1bJ2Rpc3BsYXlOYW1lJ10pLnRvRXF1YWwoJ2FwcCcpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXh0ZW5kZWRBdHRzJ11bMF1bJ25hbWUnXSkudG9FcXVhbCgnYXBwJyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydleHRlbmRlZEF0dHMnXVswXVsndmFsdWUnXSkudG9FcXVhbCgnQWN0aXZlX0RpcmVjdG9yeScpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnZXh0ZW5kZWRBdHRzJ11bMF1bJ2V4dGVuZGVkQXR0cmlidXRlJ10pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydleHRlbmRlZEF0dHMnXVswXVsnZm91bmRJblNjaGVtYSddKS50b0VxdWFsKHRydWUpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnc2NoZW1hQXR0cyddKS5ub3QudG9CZShudWxsKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3NjaGVtYUF0dHMnXS5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydzY2hlbWFBdHRzJ11bMF1bJ2Rpc3BsYXlOYW1lJ10pLnRvRXF1YWwoJ3NldmVyaXR5Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydzY2hlbWFBdHRzJ11bMF1bJ25hbWUnXSkudG9FcXVhbCgnc2V2ZXJpdHknKTtcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2VbJ3NjaGVtYUF0dHMnXVswXVsndmFsdWUnXSkudG9FcXVhbCgnbG93Jyk7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlWydzY2hlbWFBdHRzJ11bMF1bJ2V4dGVuZGVkQXR0cmlidXRlJ10pLnRvRXF1YWwoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZVsnc2NoZW1hQXR0cyddWzBdWydmb3VuZEluU2NoZW1hJ10pLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZWplY3QgaWYgQWxlcnQgZG9lcyBub3QgZXhpc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBwcm9taXNlUmVqZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoYmFzZVVSTEFsZXJ0cyArICcvZG9lc25vdGV4aXN0JykuXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBhbGVydFNlcnZpY2UuZ2V0QWxlcnREZXRhaWxzKCdkb2Vzbm90ZXhpc3QnKS5jYXRjaChcbiAgICAgICAgICAgICAgICAoKSA9PiBwcm9taXNlUmVqZWN0ZWQgPSB0cnVlKTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICAgICAgZXhwZWN0KHByb21pc2VSZWplY3RlZCkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29wZW5EZXRhaWxzRGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBsZXQgc3BNb2RhbDtcblxuICAgICAgICBiZWZvcmVFYWNoKGluamVjdCgoX3NwTW9kYWxfKSA9PiB7XG4gICAgICAgICAgICBzcE1vZGFsID0gX3NwTW9kYWxfO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIHRoZSBtb2RhbCBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFsZXJ0ID0gbmV3IEFsZXJ0KHsgaWQ6ICcxJyB9KTtcblxuICAgICAgICAgICAgc3B5T24oc3BNb2RhbCwgJ29wZW4nKTtcblxuICAgICAgICAgICAgYWxlcnRTZXJ2aWNlLm9wZW5EZXRhaWxzRGlhbG9nKGFsZXJ0KTtcblxuICAgICAgICAgICAgZXhwZWN0KHNwTW9kYWwub3BlbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG5cbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
