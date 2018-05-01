System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', './AccessRequestTestData', 'test/js/common/util/SpDateServiceMocker', 'test/js/TestModule'], function (_export) {
    /*
     * Copyright (C) 2015 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the AccessRequestIdentityService.
     */
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_AccessRequestTestData) {}, function (_testJsCommonUtilSpDateServiceMocker) {}, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }],
        execute: function () {
            describe('AccessRequestIdentityService', function () {

                var baseURL = '/identityiq/ui/rest/requestAccess/',
                    DATE = 1410276888648,
                    START_DATE = 1410238800000,
                    END_DATE = 1410325199999,
                    DATE_QUERY_PARAM_VALUE = '%7B%22value%22:%22' + START_DATE + '%7C' + END_DATE + '%22%7D',
                    Identity,
                    accessRequestIdentityService,
                    accessRequestTestData,
                    $httpBackend,
                    testService;

                // Use the access request module.
                beforeEach(module(accessRequestModule, testModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                }));

                beforeEach(inject(function (_Identity_, _accessRequestIdentityService_, _$httpBackend_, _accessRequestTestData_, _testService_) {
                    Identity = _Identity_;
                    accessRequestIdentityService = _accessRequestIdentityService_;
                    accessRequestTestData = _accessRequestTestData_;
                    $httpBackend = _$httpBackend_;
                    testService = _testService_;
                }));

                beforeEach(inject(function (spDateService, spDateServiceMocker) {
                    // Mock the spDateService to return what we expect even though the
                    // timezone may vary depending on the machine that runs the test.
                    spyOn(spDateService, 'setDateComponents').and.callFake(spDateServiceMocker.mockSetDateComponents([{
                        date: DATE,
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                        millis: 0,
                        returnValue: new Date(START_DATE)
                    }, {
                        date: DATE,
                        hours: 23,
                        minutes: 59,
                        seconds: 59,
                        millis: 999,
                        returnValue: new Date(END_DATE)
                    }]));
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                /**
                 * Verify that the given result promise contains the expected data.
                 * You must call $httpBackend.flush() after this to get the promise to
                 * be resolved.
                 *
                 * @param {Number} expectedCount  The expected number of identities in
                 *   the response.  If not specified, default to 2.
                 */
                function verifyResult(promise, expectedCount) {
                    if (angular.isUndefined(expectedCount)) {
                        expectedCount = 2;
                    }
                    expect(promise).toBeTruthy();
                    promise.then(function (response) {
                        expect(response.data.count).toEqual(expectedCount);
                        expect(response.data.objects.length).toEqual(expectedCount);
                    });
                }

                describe('get requestable identities', function () {
                    var identitiesURL = baseURL + 'identities',
                        response,
                        identity1,
                        identity2,
                        promise;

                    beforeEach(function () {
                        identity1 = accessRequestTestData.IDENTITY1;
                        identity2 = accessRequestTestData.IDENTITY2;

                        response = {
                            count: 2,
                            objects: [identity1, identity2]
                        };
                    });

                    it('accepts a request without a name filter', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getIdentities(null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without filters', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getIdentities(null, null, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with filters', function () {
                        var filters = {
                            qBool: {
                                value: true
                            },
                            qInt: {
                                value: 43
                            },
                            qString: {
                                value: 'hey'
                            },
                            qMulti: {
                                value: ['joe', 'whereYouGoing']
                            },
                            qDate: {
                                value: new Date(DATE)
                            }
                        },
                            url = identitiesURL + ('?qBool=' + testService.getQueryParamString(filters.qBool)) + ('&qDate=' + DATE_QUERY_PARAM_VALUE + '&qInt=' + testService.getQueryParamString(filters.qInt)) + ('&qMulti=' + testService.getQueryParamString(filters.qMulti)) + ('&qString=' + testService.getQueryParamString(filters.qString));

                        $httpBackend.expectGET(url).respond(200, response);
                        promise = accessRequestIdentityService.getIdentities(null, filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a name filter', function () {
                        $httpBackend.expectGET(identitiesURL + '?nameSearch=bob').respond(200, response);
                        promise = accessRequestIdentityService.getIdentities('bob');
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with pagination parameters', function () {
                        $httpBackend.expectGET(identitiesURL + '?limit=40&start=30').respond(200, response);
                        promise = accessRequestIdentityService.getIdentities(null, null, 30, 40);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without pagination parameters', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getIdentities();
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('can return an empty result', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, {
                            count: 0,
                            objects: []
                        });
                        promise = accessRequestIdentityService.getIdentities(null, null, null, null);
                        verifyResult(promise, 0);
                        $httpBackend.flush();
                    });

                    it('converts objects to AccessRequestIdentities', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getIdentities(null, null, null, null);
                        promise.then(function (response) {
                            var objects = response.data.objects;
                            expect(objects[0] instanceof Identity).toBeTruthy();
                            expect(objects[1] instanceof Identity).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('get deep link identity', function () {
                    var response, promise, identity1;

                    beforeEach(function () {
                        identity1 = accessRequestTestData.IDENTITY1;
                        response = {
                            count: 1,
                            objects: [identity1]
                        };
                    });

                    it('accepts a request with identityName', function () {
                        var identitiesURL = baseURL + 'identities?name=jbob';
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getDeepLinkIdentity('jbob', null, null, null);
                        verifyResult(promise, 1);
                        $httpBackend.flush();
                    });

                    it('accepts a request with IN', function () {
                        var identitiesURL = baseURL + 'identities?in=jbob64';
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getDeepLinkIdentity(null, 'jbob64', null, null);
                        verifyResult(promise, 1);
                        $httpBackend.flush();
                    });

                    it('accepts a request with native identity and app', function () {
                        var identitiesURL = baseURL + 'identities?requesteeApp=myApp&requesteeNativeIdentity=jbob64';
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getDeepLinkIdentity(null, null, 'jbob64', 'myApp');
                        verifyResult(promise, 1);
                        $httpBackend.flush();
                    });
                });

                describe('get requestable identity ids', function () {
                    var identityIdsURL = baseURL + 'identityIdNames',
                        response,
                        identity1,
                        identity2,
                        promise;

                    beforeEach(function () {
                        identity1 = accessRequestTestData.IDENTITY1;
                        identity2 = accessRequestTestData.IDENTITY2;

                        response = {
                            count: 2,
                            objects: [{ 'id': identity1.id, 'name': identity1.name }, { 'id': identity2.id, 'name': identity2.name }]
                        };
                    });

                    /**
                     * Verify that the given result promise contains the expected data.
                     * You must call $httpBackend.flush() after this to get the promise to
                     * be resolved.
                     *
                     * @param {Number} expectedCount  The expected number of identities in
                     *   the response.  If not specified, default to 2.
                     */
                    function verifyResult(promise, expectedCount) {
                        if (angular.isUndefined(expectedCount)) {
                            expectedCount = 2;
                        }
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response.data.count).toEqual(expectedCount);
                            expect(response.data.objects.length).toEqual(expectedCount);

                            /* Should just be ids */
                            if (expectedCount > 0) {
                                expect(parseInt(response.data.objects[0].id, 10)).toEqual(1);
                                expect(response.data.objects[0].name).toEqual('jbob');
                            }
                            if (expectedCount > 1) {
                                expect(parseInt(response.data.objects[1].id, 10)).toEqual(2);
                                expect(response.data.objects[1].name).toEqual('kbob');
                            }
                        });
                    }

                    it('accepts a request without a name filter', function () {
                        $httpBackend.expectGET(identityIdsURL).respond(200, response);
                        promise = accessRequestIdentityService.getAllIdentities();
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without filters', function () {
                        $httpBackend.expectGET(identityIdsURL).respond(200, response);
                        promise = accessRequestIdentityService.getAllIdentities();
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with filters', function () {
                        var filters = {
                            qBool: {
                                value: true
                            },
                            qInt: {
                                value: 43
                            },
                            qString: {
                                value: 'hey'
                            },
                            qMulti: {
                                value: ['joe', 'whereYouGoing']
                            },
                            qDate: {
                                value: new Date(DATE)
                            }
                        },
                            url = identityIdsURL + ('?qBool=' + testService.getQueryParamString(filters.qBool)) + ('&qDate=' + DATE_QUERY_PARAM_VALUE + '&qInt=' + testService.getQueryParamString(filters.qInt)) + ('&qMulti=' + testService.getQueryParamString(filters.qMulti)) + ('&qString=' + testService.getQueryParamString(filters.qString));
                        $httpBackend.expectGET(url).respond(200, response);
                        promise = accessRequestIdentityService.getAllIdentities(null, filters, null, null);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request with a name filter', function () {
                        $httpBackend.expectGET(identityIdsURL + '?nameSearch=bob').respond(200, response);
                        promise = accessRequestIdentityService.getAllIdentities('bob');
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('accepts a request without pagination parameters', function () {
                        $httpBackend.expectGET(identityIdsURL).respond(200, response);
                        promise = accessRequestIdentityService.getAllIdentities();
                        verifyResult(promise);
                        $httpBackend.flush();
                    });

                    it('can return an empty result', function () {
                        $httpBackend.expectGET(identityIdsURL).respond(200, {
                            count: 0,
                            objects: []
                        });
                        promise = accessRequestIdentityService.getAllIdentities();
                        verifyResult(promise, 0);
                        $httpBackend.flush();
                    });
                });

                describe('get identity details', function () {
                    var identitiesURL, response, identity, promise;

                    beforeEach(function () {
                        identity = accessRequestTestData.IDENTITY1;
                        identitiesURL = baseURL + 'identities/' + identity.id;

                        response = [{
                            id: identity.id
                        }, {
                            name: identity.name
                        }, {
                            managerName: identity.managerName
                        }, {
                            location: identity.location
                        }, {
                            department: identity.department
                        }];
                    });

                    /**
                     * Verify that the given result promise contains the expected data.
                     * You must call $httpBackend.flush() after this to get the promise to
                     * be resolved.
                     *
                     * @param {Number} expectedCount  The expected number of identities in
                     *   the response.  If not specified, default to 2.
                     */
                    function verifyResult(promise, expectedCount) {
                        if (angular.isUndefined(expectedCount)) {
                            expectedCount = 5;
                        }
                        expect(promise).toBeTruthy();
                        promise.then(function (response) {
                            expect(response.data.length).toEqual(expectedCount);
                        });
                    }

                    it('get identity details basic', function () {
                        $httpBackend.expectGET(identitiesURL).respond(200, response);
                        promise = accessRequestIdentityService.getIdentityDetails(identity.id);
                        verifyResult(promise);
                        $httpBackend.flush();
                    });
                });

                describe('get selected identities', function () {
                    var selectedIdentitiesURL = baseURL + 'selectedIdentities',
                        data = { 'id': ['1', '2'] },
                        allIdentities,
                        response,
                        identity1,
                        identity2,
                        promise;

                    beforeEach(inject(function (accessRequestTestData) {
                        identity1 = accessRequestTestData.IDENTITY1;
                        identity2 = accessRequestTestData.IDENTITY2;

                        response = {
                            count: 2,
                            objects: [identity1, identity2]
                        };

                        allIdentities = [{
                            id: identity1.id,
                            name: identity1.name
                        }, {
                            id: identity2.id,
                            name: identity2.name
                        }];
                    }));

                    it('returns identity objects for specified ids', function () {
                        $httpBackend.expectPOST(selectedIdentitiesURL + '?limit=10&start=0', data).respond(200, response);
                        promise = accessRequestIdentityService.getSelectedIdentities(allIdentities, 0, 10);
                        verifyResult(promise);
                        promise.then(function (response) {
                            expect(response.data.objects[0].id).toEqual(allIdentities[0].id);
                            expect(response.data.objects[1].id).toEqual(allIdentities[1].id);
                        });
                        $httpBackend.flush();
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQixxQ0FBcUMsMkJBQTJCLDJDQUEyQyx1QkFBdUIsVUFBVSxTQUFTOzs7Ozs7OztJQVE3TDs7SUFFQSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLHdCQUF3QixJQUFJLFVBQVUsc0NBQXNDLElBQUksVUFBVSxtQkFBbUI7WUFDdEgsYUFBYSxrQkFBa0I7O1FBRW5DLFNBQVMsWUFBWTtZQUw3QixTQUFTLGdDQUFnQyxZQUFXOztnQkFFaEQsSUFBSSxVQUFVO29CQUNWLE9BQU87b0JBQ1AsYUFBYTtvQkFDYixXQUFXO29CQUNYLHlCQUFzQix1QkFBd0IsYUFBVSxRQUFNLFdBQVE7b0JBQ3RFO29CQUFVO29CQUE4QjtvQkFBdUI7b0JBQWM7OztnQkFHakYsV0FBVyxPQUFPLHFCQUFxQjs7Z0JBRXZDLFdBQVcsT0FBTyxVQUFTLFVBQVU7b0JBQ2pDLFNBQVMsU0FBUyxtQkFBbUI7OztnQkFHekMsV0FBVyxPQUFPLFVBQVMsWUFBWSxnQ0FBZ0MsZ0JBQzVDLHlCQUF5QixlQUFlO29CQUMvRCxXQUFXO29CQUNYLCtCQUErQjtvQkFDL0Isd0JBQXdCO29CQUN4QixlQUFlO29CQUNmLGNBQWM7OztnQkFHbEIsV0FBVyxPQUFPLFVBQVMsZUFBZSxxQkFBcUI7OztvQkFHM0QsTUFBTSxlQUFlLHFCQUFxQixJQUFJLFNBQzFDLG9CQUFvQixzQkFBc0IsQ0FBQzt3QkFDdkMsTUFBTTt3QkFDTixPQUFPO3dCQUNQLFNBQVM7d0JBQ1QsU0FBUzt3QkFDVCxRQUFRO3dCQUNSLGFBQWEsSUFBSSxLQUFLO3VCQUN2Qjt3QkFDQyxNQUFNO3dCQUNOLE9BQU87d0JBQ1As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Szt3QkFDakIsVUFBVSw2QkFBNkIsbUJBQW1CLFNBQVM7d0JBQ25FLGFBQWE7d0JBQ2IsYUFBYTs7OztnQkFLckIsU0FBUywyQkFBMkIsWUFBVztvQkFDM0MsSUFBSSx3QkFBd0IsVUFBVTt3QkFDbEMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxLQUFLO3dCQUNwQjt3QkFBZTt3QkFBVTt3QkFBVzt3QkFBVzs7b0JBRW5ELFdBQVcsT0FBTyxVQUFTLHVCQUF1Qjt3QkFDOUMsWUFBWSxzQkFBc0I7d0JBQ2xDLFlBQVksc0JBQXNCOzt3QkFFbEMsV0FBVzs0QkFDUCxPQUFPOzRCQUNQLFNBQVMsQ0FBRSxXQUFXOzs7d0JBRzFCLGdCQUFnQixDQUNaOzRCQUNJLElBQUksVUFBVTs0QkFDZCxNQUFNLFVBQVU7MkJBRXBCOzRCQUNJLElBQUksVUFBVTs0QkFDZCxNQUFNLFVBQVU7Ozs7b0JBSzVCLEdBQUcsOENBQThDLFlBQVc7d0JBQ3hELGFBQWEsV0FBVyx3QkFBd0IscUJBQXFCLE1BQU0sUUFBUSxLQUFLO3dCQUN4RixVQUFVLDZCQUE2QixzQkFBc0IsZUFBZSxHQUFHO3dCQUMvRSxhQUFhO3dCQUNiLFFBQVEsS0FBSyxVQUFTLFVBQVU7NEJBQzVCLE9BQU8sU0FBUyxLQUFLLFFBQVEsR0FBRyxJQUFJLFFBQVEsY0FBYyxHQUFHOzRCQUM3RCxPQUFPLFNBQVMsS0FBSyxRQUFRLEdBQUcsSUFBSSxRQUFRLGNBQWMsR0FBRzs7d0JBR2pFLGFBQWE7Ozs7OztHQWhCdEIiLCJmaWxlIjoiYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICovXHJcblxyXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcclxuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcclxuaW1wb3J0ICcuL0FjY2Vzc1JlcXVlc3RUZXN0RGF0YSc7XHJcbmltcG9ydCAndGVzdC9qcy9jb21tb24vdXRpbC9TcERhdGVTZXJ2aWNlTW9ja2VyJztcclxuaW1wb3J0IHRlc3RNb2R1bGUgZnJvbSAndGVzdC9qcy9UZXN0TW9kdWxlJztcclxuLyoqXHJcbiAqIFRlc3RzIGZvciB0aGUgQWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5cclxuICovXHJcbmRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJhc2VVUkwgPSAnL2lkZW50aXR5aXEvdWkvcmVzdC9yZXF1ZXN0QWNjZXNzLycsXHJcbiAgICAgICAgREFURSA9IDE0MTAyNzY4ODg2NDgsXHJcbiAgICAgICAgU1RBUlRfREFURSA9IDE0MTAyMzg4MDAwMDAsXHJcbiAgICAgICAgRU5EX0RBVEUgPSAxNDEwMzI1MTk5OTk5LFxyXG4gICAgICAgIERBVEVfUVVFUllfUEFSQU1fVkFMVUUgPSBgJTdCJTIydmFsdWUlMjI6JTIyJHtTVEFSVF9EQVRFfSU3QyR7RU5EX0RBVEV9JTIyJTdEYCxcclxuICAgICAgICBJZGVudGl0eSwgYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZSwgYWNjZXNzUmVxdWVzdFRlc3REYXRhLCAkaHR0cEJhY2tlbmQsIHRlc3RTZXJ2aWNlO1xyXG5cclxuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxyXG4gICAgYmVmb3JlRWFjaChtb2R1bGUoYWNjZXNzUmVxdWVzdE1vZHVsZSwgdGVzdE1vZHVsZSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKCRwcm92aWRlKSB7XHJcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NPTlRFWFRfUEFUSCcsICcvaWRlbnRpdHlpcScpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9JZGVudGl0eV8sIF9hY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlXywgXyRodHRwQmFja2VuZF8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWNjZXNzUmVxdWVzdFRlc3REYXRhXywgX3Rlc3RTZXJ2aWNlXykge1xyXG4gICAgICAgIElkZW50aXR5ID0gX0lkZW50aXR5XztcclxuICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfO1xyXG4gICAgICAgIGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSA9IF9hY2Nlc3NSZXF1ZXN0VGVzdERhdGFfO1xyXG4gICAgICAgICRodHRwQmFja2VuZCA9IF8kaHR0cEJhY2tlbmRfO1xyXG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihzcERhdGVTZXJ2aWNlLCBzcERhdGVTZXJ2aWNlTW9ja2VyKSB7XHJcbiAgICAgICAgLy8gTW9jayB0aGUgc3BEYXRlU2VydmljZSB0byByZXR1cm4gd2hhdCB3ZSBleHBlY3QgZXZlbiB0aG91Z2ggdGhlXHJcbiAgICAgICAgLy8gdGltZXpvbmUgbWF5IHZhcnkgZGVwZW5kaW5nIG9uIHRoZSBtYWNoaW5lIHRoYXQgcnVucyB0aGUgdGVzdC5cclxuICAgICAgICBzcHlPbihzcERhdGVTZXJ2aWNlLCAnc2V0RGF0ZUNvbXBvbmVudHMnKS5hbmQuY2FsbEZha2UoXHJcbiAgICAgICAgICAgIHNwRGF0ZVNlcnZpY2VNb2NrZXIubW9ja1NldERhdGVDb21wb25lbnRzKFt7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiBEQVRFLFxyXG4gICAgICAgICAgICAgICAgaG91cnM6IDAsXHJcbiAgICAgICAgICAgICAgICBtaW51dGVzOiAwLFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kczogMCxcclxuICAgICAgICAgICAgICAgIG1pbGxpczogMCxcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiBuZXcgRGF0ZShTVEFSVF9EQVRFKVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiBEQVRFLFxyXG4gICAgICAgICAgICAgICAgaG91cnM6IDIzLFxyXG4gICAgICAgICAgICAgICAgbWludXRlczogNTksXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRzOiA1OSxcclxuICAgICAgICAgICAgICAgIG1pbGxpczogOTk5LFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IG5ldyBEYXRlKEVORF9EQVRFKVxyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICAgKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbigpO1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJpZnkgdGhhdCB0aGUgZ2l2ZW4gcmVzdWx0IHByb21pc2UgY29udGFpbnMgdGhlIGV4cGVjdGVkIGRhdGEuXHJcbiAgICAgKiBZb3UgbXVzdCBjYWxsICRodHRwQmFja2VuZC5mbHVzaCgpIGFmdGVyIHRoaXMgdG8gZ2V0IHRoZSBwcm9taXNlIHRvXHJcbiAgICAgKiBiZSByZXNvbHZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRDb3VudCAgVGhlIGV4cGVjdGVkIG51bWJlciBvZiBpZGVudGl0aWVzIGluXHJcbiAgICAgKiAgIHRoZSByZXNwb25zZS4gIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHQgdG8gMi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdmVyaWZ5UmVzdWx0KHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChleHBlY3RlZENvdW50KSkge1xyXG4gICAgICAgICAgICBleHBlY3RlZENvdW50ID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwZWN0KHByb21pc2UpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEuY291bnQpLnRvRXF1YWwoZXhwZWN0ZWRDb3VudCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHMubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc2NyaWJlKCdnZXQgcmVxdWVzdGFibGUgaWRlbnRpdGllcycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpZGVudGl0aWVzVVJMID0gYmFzZVVSTCArICdpZGVudGl0aWVzJyxcclxuICAgICAgICAgICAgcmVzcG9uc2UsIGlkZW50aXR5MSwgaWRlbnRpdHkyLCBwcm9taXNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZGVudGl0eTEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxO1xyXG4gICAgICAgICAgICBpZGVudGl0eTIgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkyO1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaWRlbnRpdHkxLCBpZGVudGl0eTIgXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aG91dCBhIG5hbWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaWRlbnRpdGllc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzKG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aG91dCBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaWRlbnRpdGllc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzKG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgcUJvb2w6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHFJbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNDNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBxU3RyaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdoZXknXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcU11bHRpOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFsnam9lJywgJ3doZXJlWW91R29pbmcnXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHFEYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG5ldyBEYXRlKERBVEUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVybCA9IGlkZW50aXRpZXNVUkwgK1xyXG4gICAgICAgICAgICAgICAgYD9xQm9vbD0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5xQm9vbCl9YCArXHJcbiAgICAgICAgICAgICAgICBgJnFEYXRlPSR7REFURV9RVUVSWV9QQVJBTV9WQUxVRX0mcUludD0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5xSW50KX1gICtcclxuICAgICAgICAgICAgICAgIGAmcU11bHRpPSR7dGVzdFNlcnZpY2UuZ2V0UXVlcnlQYXJhbVN0cmluZyhmaWx0ZXJzLnFNdWx0aSl9YCArXHJcbiAgICAgICAgICAgICAgICBgJnFTdHJpbmc9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMucVN0cmluZyl9YDtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRJZGVudGl0aWVzKG51bGwsIGZpbHRlcnMsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBhIG5hbWUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaWRlbnRpdGllc1VSTCArICc/bmFtZVNlYXJjaD1ib2InKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldElkZW50aXRpZXMoJ2JvYicpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBwYWdpbmF0aW9uIHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0aWVzVVJMICsgJz9saW1pdD00MCZzdGFydD0zMCcpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdGllcyhudWxsLCBudWxsLCAzMCwgNDApO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aG91dCBwYWdpbmF0aW9uIHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0aWVzVVJMKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldElkZW50aXRpZXMoKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NhbiByZXR1cm4gYW4gZW1wdHkgcmVzdWx0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoaWRlbnRpdGllc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFtdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdGllcyhudWxsLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UsIDApO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ2NvbnZlcnRzIG9iamVjdHMgdG8gQWNjZXNzUmVxdWVzdElkZW50aXRpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0aWVzVVJMKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldElkZW50aXRpZXMobnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdHMgPSByZXNwb25zZS5kYXRhLm9iamVjdHM7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0c1swXSBpbnN0YW5jZW9mIElkZW50aXR5KS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3Qob2JqZWN0c1sxXSBpbnN0YW5jZW9mIElkZW50aXR5KS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXQgZGVlcCBsaW5rIGlkZW50aXR5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlLCBwcm9taXNlLCBpZGVudGl0eTE7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlkZW50aXR5MSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTE7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbIGlkZW50aXR5MSBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGlkZW50aXR5TmFtZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaWRlbnRpdGllc1VSTCA9IGJhc2VVUkwgKyAnaWRlbnRpdGllcz9uYW1lPWpib2InO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGlkZW50aXRpZXNVUkwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0RGVlcExpbmtJZGVudGl0eSgnamJvYicsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgMSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aCBJTicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaWRlbnRpdGllc1VSTCA9IGJhc2VVUkwgKyAnaWRlbnRpdGllcz9pbj1qYm9iNjQnO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGlkZW50aXRpZXNVUkwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0RGVlcExpbmtJZGVudGl0eShudWxsLCAnamJvYjY0JywgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlLCAxKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIG5hdGl2ZSBpZGVudGl0eSBhbmQgYXBwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpZGVudGl0aWVzVVJMID1cclxuICAgICAgICAgICAgICAgIGJhc2VVUkwgKyAnaWRlbnRpdGllcz9yZXF1ZXN0ZWVBcHA9bXlBcHAmcmVxdWVzdGVlTmF0aXZlSWRlbnRpdHk9amJvYjY0JztcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0aWVzVVJMKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldERlZXBMaW5rSWRlbnRpdHkobnVsbCwgbnVsbCwgJ2pib2I2NCcsICdteUFwcCcpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSwgMSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVzY3JpYmUoJ2dldCByZXF1ZXN0YWJsZSBpZGVudGl0eSBpZHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaWRlbnRpdHlJZHNVUkwgPSBiYXNlVVJMICsgJ2lkZW50aXR5SWROYW1lcycsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLCBpZGVudGl0eTEsIGlkZW50aXR5MiwgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHkxID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMTtcclxuICAgICAgICAgICAgaWRlbnRpdHkyID0gYWNjZXNzUmVxdWVzdFRlc3REYXRhLklERU5USVRZMjtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeydpZCcgOiBpZGVudGl0eTEuaWQsICduYW1lJzogaWRlbnRpdHkxLm5hbWV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnaWQnIDogaWRlbnRpdHkyLmlkLCAnbmFtZSc6IGlkZW50aXR5Mi5uYW1lfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWZXJpZnkgdGhhdCB0aGUgZ2l2ZW4gcmVzdWx0IHByb21pc2UgY29udGFpbnMgdGhlIGV4cGVjdGVkIGRhdGEuXHJcbiAgICAgICAgICogWW91IG11c3QgY2FsbCAkaHR0cEJhY2tlbmQuZmx1c2goKSBhZnRlciB0aGlzIHRvIGdldCB0aGUgcHJvbWlzZSB0b1xyXG4gICAgICAgICAqIGJlIHJlc29sdmVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGV4cGVjdGVkQ291bnQgIFRoZSBleHBlY3RlZCBudW1iZXIgb2YgaWRlbnRpdGllcyBpblxyXG4gICAgICAgICAqICAgdGhlIHJlc3BvbnNlLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdCB0byAyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHZlcmlmeVJlc3VsdChwcm9taXNlLCBleHBlY3RlZENvdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKGV4cGVjdGVkQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3RlZENvdW50ID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHBlY3QocHJvbWlzZSkudG9CZVRydXRoeSgpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmNvdW50KS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0cy5sZW5ndGgpLnRvRXF1YWwoZXhwZWN0ZWRDb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyogU2hvdWxkIGp1c3QgYmUgaWRzICovXHJcbiAgICAgICAgICAgICAgICBpZihleHBlY3RlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChwYXJzZUludChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uaWQsIDEwKSkudG9FcXVhbCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdLm5hbWUpLnRvRXF1YWwoJ2pib2InKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGV4cGVjdGVkQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KHBhcnNlSW50KHJlc3BvbnNlLmRhdGEub2JqZWN0c1sxXS5pZCwgMTApKS50b0VxdWFsKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMV0ubmFtZSkudG9FcXVhbCgna2JvYicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRob3V0IGEgbmFtZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0eUlkc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRob3V0IGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0eUlkc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGZpbHRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcUJvb2w6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHFJbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBxU3RyaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnaGV5J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcU11bHRpOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBbJ2pvZScsICd3aGVyZVlvdUdvaW5nJ11cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHFEYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShEQVRFKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBpZGVudGl0eUlkc1VSTCArXHJcbiAgICAgICAgICAgICAgICAgICAgYD9xQm9vbD0ke3Rlc3RTZXJ2aWNlLmdldFF1ZXJ5UGFyYW1TdHJpbmcoZmlsdGVycy5xQm9vbCl9YCArXHJcbiAgICAgICAgICAgICAgICAgICAgYCZxRGF0ZT0ke0RBVEVfUVVFUllfUEFSQU1fVkFMVUV9JnFJbnQ9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMucUludCl9YCArXHJcbiAgICAgICAgICAgICAgICAgICAgYCZxTXVsdGk9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMucU11bHRpKX1gICtcclxuICAgICAgICAgICAgICAgICAgICBgJnFTdHJpbmc9JHt0ZXN0U2VydmljZS5nZXRRdWVyeVBhcmFtU3RyaW5nKGZpbHRlcnMucVN0cmluZyl9YDtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVCh1cmwpLnJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldEFsbElkZW50aXRpZXMobnVsbCwgZmlsdGVycywgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdhY2NlcHRzIGEgcmVxdWVzdCB3aXRoIGEgbmFtZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0eUlkc1VSTCArICc/bmFtZVNlYXJjaD1ib2InKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldEFsbElkZW50aXRpZXMoJ2JvYicpO1xyXG4gICAgICAgICAgICB2ZXJpZnlSZXN1bHQocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgnYWNjZXB0cyBhIHJlcXVlc3Qgd2l0aG91dCBwYWdpbmF0aW9uIHBhcmFtZXRlcnMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChpZGVudGl0eUlkc1VSTCkuXHJcbiAgICAgICAgICAgICAgICByZXNwb25kKDIwMCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdjYW4gcmV0dXJuIGFuIGVtcHR5IHJlc3VsdCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGlkZW50aXR5SWRzVVJMKS5cclxuICAgICAgICAgICAgICAgIHJlc3BvbmQoMjAwLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXRBbGxJZGVudGl0aWVzKCk7XHJcbiAgICAgICAgICAgIHZlcmlmeVJlc3VsdChwcm9taXNlLCAwKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0IGlkZW50aXR5IGRldGFpbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaWRlbnRpdGllc1VSTCwgcmVzcG9uc2UsIGlkZW50aXR5LCBwcm9taXNlO1xyXG5cclxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZGVudGl0eSA9IGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTE7XHJcbiAgICAgICAgICAgIGlkZW50aXRpZXNVUkwgPSBiYXNlVVJMICsgJ2lkZW50aXRpZXMvJyArIGlkZW50aXR5LmlkO1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkZW50aXR5LmlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlkZW50aXR5Lm5hbWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlck5hbWU6IGlkZW50aXR5Lm1hbmFnZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBpZGVudGl0eS5sb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50OiBpZGVudGl0eS5kZXBhcnRtZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZlcmlmeSB0aGF0IHRoZSBnaXZlbiByZXN1bHQgcHJvbWlzZSBjb250YWlucyB0aGUgZXhwZWN0ZWQgZGF0YS5cclxuICAgICAgICAgKiBZb3UgbXVzdCBjYWxsICRodHRwQmFja2VuZC5mbHVzaCgpIGFmdGVyIHRoaXMgdG8gZ2V0IHRoZSBwcm9taXNlIHRvXHJcbiAgICAgICAgICogYmUgcmVzb2x2ZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRDb3VudCAgVGhlIGV4cGVjdGVkIG51bWJlciBvZiBpZGVudGl0aWVzIGluXHJcbiAgICAgICAgICogICB0aGUgcmVzcG9uc2UuICBJZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0IHRvIDIuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gdmVyaWZ5UmVzdWx0KHByb21pc2UsIGV4cGVjdGVkQ291bnQpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoZXhwZWN0ZWRDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkQ291bnQgPSA1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4cGVjdChwcm9taXNlKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEubGVuZ3RoKS50b0VxdWFsKGV4cGVjdGVkQ291bnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGl0KCdnZXQgaWRlbnRpdHkgZGV0YWlscyBiYXNpYycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGlkZW50aXRpZXNVUkwpLlxyXG4gICAgICAgICAgICAgICAgcmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0SWRlbnRpdHlEZXRhaWxzKGlkZW50aXR5LmlkKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0IHNlbGVjdGVkIGlkZW50aXRpZXMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRJZGVudGl0aWVzVVJMID0gYmFzZVVSTCArICdzZWxlY3RlZElkZW50aXRpZXMnLFxyXG4gICAgICAgICAgICBkYXRhID0geydpZCc6IFsnMScsICcyJ119LFxyXG4gICAgICAgICAgICBhbGxJZGVudGl0aWVzLCByZXNwb25zZSwgaWRlbnRpdHkxLCBpZGVudGl0eTIsIHByb21pc2U7XHJcblxyXG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKGFjY2Vzc1JlcXVlc3RUZXN0RGF0YSkge1xyXG4gICAgICAgICAgICBpZGVudGl0eTEgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkxO1xyXG4gICAgICAgICAgICBpZGVudGl0eTIgPSBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEuSURFTlRJVFkyO1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMixcclxuICAgICAgICAgICAgICAgIG9iamVjdHM6IFsgaWRlbnRpdHkxLCBpZGVudGl0eTIgXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYWxsSWRlbnRpdGllcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaWRlbnRpdHkxLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlkZW50aXR5MS5uYW1lXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZGVudGl0eTIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaWRlbnRpdHkyLm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGlkZW50aXR5IG9iamVjdHMgZm9yIHNwZWNpZmllZCBpZHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdFBPU1Qoc2VsZWN0ZWRJZGVudGl0aWVzVVJMICsgJz9saW1pdD0xMCZzdGFydD0wJywgZGF0YSkucmVzcG9uZCgyMDAsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0U2VsZWN0ZWRJZGVudGl0aWVzKGFsbElkZW50aXRpZXMsIDAsIDEwKTtcclxuICAgICAgICAgICAgdmVyaWZ5UmVzdWx0KHByb21pc2UpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLm9iamVjdHNbMF0uaWQpLnRvRXF1YWwoYWxsSWRlbnRpdGllc1swXS5pZCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzFdLmlkKS50b0VxdWFsKGFsbElkZW50aXRpZXNbMV0uaWQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
