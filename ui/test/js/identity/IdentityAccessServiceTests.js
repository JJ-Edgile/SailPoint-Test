System.register(['test/js/TestInitializer', 'identity/IdentityModule'], function (_export) {
    /*
     * Copyright (C) 2016 SailPoint Technologies, Inc.  All rights reserved.
     */

    /**
     * Tests for the IdentityAccessService.
     */
    'use strict';

    var identityModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_identityIdentityModule) {
            identityModule = _identityIdentityModule['default'];
        }],
        execute: function () {
            describe('identityAccessService', function () {
                var quickLink = 'View%20Identity';
                var identityId = 'someIdentity';
                var entitlementId = '1234';
                var baseUrl = '/identityiq/ui/rest/quickLinks/';

                var identityAccessService = undefined,
                    EffectiveAccess = undefined,
                    Entitlement = undefined,
                    RoleDetail = undefined,
                    IdentityEntitlementDTO = undefined,
                    $httpBackend = undefined,
                    managedAttributeService = undefined,
                    sort = undefined;

                // Use the identity module.
                beforeEach(module(identityModule));

                beforeEach(module(function ($provide) {
                    $provide.constant('SP_CONTEXT_PATH', '/identityiq');
                    $provide.constant('SP_CURR_USER_ID', '123');
                }));

                /* jshint maxparams: 9 */
                beforeEach(inject(function (_identityAccessService_, _EffectiveAccess_, _Entitlement_, _RoleDetail_, _IdentityEntitlementDTO_, _$httpBackend_, _managedAttributeService_, SortOrder) {
                    identityAccessService = _identityAccessService_;
                    EffectiveAccess = _EffectiveAccess_;
                    Entitlement = _Entitlement_;
                    RoleDetail = _RoleDetail_;
                    IdentityEntitlementDTO = _IdentityEntitlementDTO_;
                    $httpBackend = _$httpBackend_;
                    managedAttributeService = _managedAttributeService_;
                    /* Mock the toJson sortOrder's toJson method so we do not have to deal with url encoding */
                    sort = new SortOrder();
                    spyOn(sort, 'toJson').and.returnValue('someColumn');
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                function buildUrl(quickLinkName, identityId, access, start, limit) {
                    var url = '' + baseUrl + quickLinkName + '/identities/' + identityId + '/access/' + access;

                    if (angular.isDefined(start) && angular.isDefined(limit)) {
                        url += '?limit=' + limit + '&start=' + start;
                    }

                    return url;
                }

                describe('getEntitlements', function () {
                    it('should call correct end point and return Entitlements', function () {
                        var start = 1,
                            limit = 13,
                            expectedUrl = buildUrl(quickLink, identityId, 'identityEntitlements', start, limit);
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getEntitlements(quickLink, identityId, start, limit).then(function (result) {
                            var isEntitlement = result.data.objects[0] instanceof Entitlement;
                            expect(isEntitlement).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });

                    it('should call correct end point and return Entitlements with additionalOnly', function () {
                        var start = 1,
                            limit = 13,
                            expectedUrl = '' + baseUrl + quickLink + '/identities/' + identityId + '/access/identityEntitlements?' + ('additionalOnly=true&limit=' + limit + '&sort=' + sort.toJson() + '&start=' + start);
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getEntitlements(quickLink, identityId, start, limit, sort, '', true).then(function (result) {
                            var isEntitlement = result.data.objects[0] instanceof Entitlement;
                            expect(isEntitlement).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });

                    it('should call correct end point and return Entitlements with query', function () {
                        var start = 1,
                            limit = 13,
                            expectedUrl = '' + baseUrl + quickLink + '/identities/' + identityId + '/access/identityEntitlements?' + ('applicationOrNameOrValue=asdf&limit=' + limit + '&sort=' + sort.toJson() + '&start=' + start);
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getEntitlements(quickLink, identityId, start, limit, sort, 'asdf').then(function (result) {
                            var isEntitlement = result.data.objects[0] instanceof Entitlement;
                            expect(isEntitlement).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('getRoleEntitlements', function () {
                    it('should call correct end point and return RoleDetails', function () {
                        var start = 4,
                            limit = 20,
                            expectedUrl = buildUrl(quickLink, identityId, 'identityRoles', start, limit);
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getRoleEntitlements(quickLink, identityId, start, limit).then(function (result) {
                            var isRole = result.data.objects[0] instanceof RoleDetail;
                            expect(isRole).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });

                    it('should call correct end point and return Roles with query', function () {
                        var start = 1,
                            limit = 13,
                            expectedUrl = '' + baseUrl + quickLink + '/identities/' + identityId + '/access/identityRoles?' + ('limit=' + limit + '&sort=' + sort.toJson() + '&start=' + start + '&value=asdf');
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getRoleEntitlements(quickLink, identityId, start, limit, sort, 'asdf').then(function (result) {
                            var isRole = result.data.objects[0] instanceof RoleDetail;
                            expect(isRole).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                describe('getEffective', function () {
                    it('should call correct end point and return EffectiveAccess', function () {
                        var start = 42,
                            limit = 200,
                            expectedUrl = buildUrl(quickLink, identityId, 'identityEffectiveAccess', start, limit);
                        $httpBackend.expectGET(expectedUrl).respond(200, {
                            objects: [{
                                id: '123',
                                name: 'some name'
                            }]
                        });
                        identityAccessService.getEffectiveAccess(quickLink, identityId, start, limit).then(function (result) {
                            var isRole = result.data.objects[0] instanceof EffectiveAccess;
                            expect(isRole).toBeTruthy();
                        });
                        $httpBackend.flush();
                    });
                });

                function buildRoleDetailsUrl(quickLink, identityId, roleId) {
                    return buildUrl(quickLink, identityId, 'identityRoles') + ('/' + roleId + '/details');
                }

                it('getRoleDetails() calls correct endpoint and returns a RoleDetail', function () {
                    var url = buildRoleDetailsUrl(quickLink, identityId, '123');
                    $httpBackend.expectGET(url).respond(200, {
                        id: '123',
                        name: 'some name'
                    });

                    var role = undefined;
                    identityAccessService.getRoleDetails(quickLink, identityId, '123').then(function (response) {
                        return role = response;
                    });
                    $httpBackend.flush();

                    expect(role instanceof RoleDetail).toEqual(true);
                });

                it('getRoleHierarchy() calls correct endpoint and returns an array of RoleDetails', function () {
                    var url = buildRoleDetailsUrl(quickLink, identityId, '123') + '/456/hierarchy';
                    $httpBackend.expectGET(url).respond(200, [{
                        id: '888',
                        name: 'some sub role 1'
                    }, {
                        id: '999',
                        name: 'some sub role 2'
                    }]);

                    var roles = undefined;
                    identityAccessService.getRoleHierarchy(quickLink, identityId, '123', '456').then(function (response) {
                        return roles = response;
                    });
                    $httpBackend.flush();

                    expect(roles.length).toEqual(2);
                    expect(roles[0] instanceof RoleDetail).toEqual(true);
                });

                function getEntitlementDetailsUrl() {
                    return buildUrl(quickLink, identityId, 'identityEntitlements') + '/' + entitlementId + '/details';
                }

                describe('getEntitlementDetailsUrl()', function () {
                    it('throws with a missing quick link', function () {
                        expect(function () {
                            return identityAccessService.getEntitlementDetails(null, 'identity', 'entitlement');
                        }).toThrow();
                    });

                    it('throws with a missing identityId', function () {
                        expect(function () {
                            return identityAccessService.getEntitlementDetails('link', null, 'entitlement');
                        }).toThrow();
                    });

                    it('throws with a missing entitlementId', function () {
                        expect(function () {
                            return identityAccessService.getEntitlementDetails('link', 'identity', null);
                        }).toThrow();
                    });

                    it('returns the correct url', function () {
                        expect(identityAccessService.getEntitlementDetailsUrl(quickLink, identityId, entitlementId)).toEqual(getEntitlementDetailsUrl());
                    });
                });

                it('getEntitlementCertRequestDetails() calls correct endpoint and returns an IdentityEntitlementDTO', function () {
                    var url = buildUrl(quickLink, identityId, 'identityEntitlements') + '/456';
                    $httpBackend.expectGET(url).respond(200, [{
                        accountName: '104',
                        aggregationState: 'Disconnected'
                    }]);

                    var entitlementDTO = undefined;
                    identityAccessService.getEntitlementCertRequestDetails(quickLink, identityId, '456').then(function (response) {
                        entitlementDTO = response;
                    });
                    $httpBackend.flush();

                    expect(entitlementDTO instanceof IdentityEntitlementDTO).toEqual(true);
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aXR5L0lkZW50aXR5QWNjZXNzU2VydmljZVRlc3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxDQUFDLDJCQUEyQiw0QkFBNEIsVUFBVSxTQUFTOzs7Ozs7OztJQVF2Rjs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUseUJBQXlCO1lBQy9FLGlCQUFpQix3QkFBd0I7O1FBRTdDLFNBQVMsWUFBWTtZQUw3QixTQUFTLHlCQUF5QixZQUFXO2dCQUN6QyxJQUFNLFlBQVk7Z0JBQ2xCLElBQU0sYUFBYTtnQkFDbkIsSUFBTSxnQkFBZ0I7Z0JBQ3RCLElBQU0sVUFBTzs7Z0JBRWIsSUFBSSx3QkFBcUI7b0JBQUUsa0JBQWU7b0JBQUUsY0FBVztvQkFBRSxhQUFVO29CQUFFLHlCQUFzQjtvQkFBRSxlQUFZO29CQUNyRywwQkFBdUI7b0JBQUUsT0FBSTs7O2dCQUdqQyxXQUFXLE9BQU87O2dCQUVsQixXQUFXLE9BQU8sVUFBUyxVQUFVO29CQUNqQyxTQUFTLFNBQVMsbUJBQW1CO29CQUNyQyxTQUFTLFNBQVMsbUJBQW1COzs7O2dCQUl6QyxXQUFXLE9BQU8sVUFBUyx5QkFBeUIsbUJBQW1CLGVBQWUsY0FDM0QsMEJBQTBCLGdCQUFnQiwyQkFBMkIsV0FBVztvQkFDdkcsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYix5QkFBeUI7b0JBQ3pCLGVBQWU7b0JBQ2YsMEJBQTBCOztvQkFFMUIsT0FBTyxJQUFJO29CQUNYLE1BQU0sTUFBTSxVQUFVLElBQUksWUFBWTs7O2dCQUcxQyxVQUFVLFlBQVc7b0JBQ2pCLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLFNBQVMsZUFBZSxZQUFZLFFBQVEsT0FBTyxPQUFPO29CQUMvRCxJQUFJLE1BQUcsS0FBTSxVQUFVLGdCQUFhLGlCQUFlLGFBQVUsYUFBVzs7b0JBRXhFLElBQUks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QVMsV0FBVyxZQUFZLDBCQUEwQixNQUFNLGdCQUFnQjs7O2dCQUczRixTQUFTLDhCQUE4QixZQUFNO29CQUN6QyxHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxPQUFPLFlBQUE7NEJBZ0JTLE9BaEJILHNCQUFzQixzQkFBc0IsTUFBTSxZQUFZOzJCQUFnQjs7O29CQUcvRixHQUFHLG9DQUFvQyxZQUFNO3dCQUN6QyxPQUFPLFlBQUE7NEJBa0JTLE9BbEJILHNCQUFzQixzQkFBc0IsUUFBUSxNQUFNOzJCQUFnQjs7O29CQUczRixHQUFHLHVDQUF1QyxZQUFNO3dCQUM1QyxPQUFPLFlBQUE7NEJBb0JTLE9BcEJILHNCQUFzQixzQkFBc0IsUUFBUSxZQUFZOzJCQUFPOzs7b0JBR3hGLEdBQUcsMkJBQTJCLFlBQU07d0JBQ2hDLE9BQU8sc0JBQXNCLHlCQUF5QixXQUFXLFlBQVksZ0JBQ3hFLFFBQVE7Ozs7Z0JBSXJCLEdBQUcsbUdBQW1HLFlBQU07b0JBQ3hHLElBQUksTUFBTSxTQUFTLFdBQVcsWUFBWSwwQkFBMEI7b0JBQ3BFLGFBQWEsVUFBVSxLQUFLLFFBQVEsS0FBSyxDQUFDO3dCQUN0QyxhQUFhO3dCQUNiLGtCQUFrQjs7O29CQUd0QixJQUFJLGlCQUFjO29CQUNsQixzQkFBc0IsaUNBQWlDLFdBQVcsWUFBWSxPQUN6RSxLQUFLLFVBQUMsVUFBYTt3QkFDaEIsaUJBQWlCOztvQkFFekIsYUFBYTs7b0JBRWIsT0FBTywwQkFBMEIsd0JBQXdCLFFBQVE7Ozs7O0dBd0J0RSIsImZpbGUiOiJpZGVudGl0eS9JZGVudGl0eUFjY2Vzc1NlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgU2FpbFBvaW50IFRlY2hub2xvZ2llcywgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQgJ3Rlc3QvanMvVGVzdEluaXRpYWxpemVyJztcbmltcG9ydCBpZGVudGl0eU1vZHVsZSBmcm9tICdpZGVudGl0eS9JZGVudGl0eU1vZHVsZSc7XG5cbi8qKlxuICogVGVzdHMgZm9yIHRoZSBJZGVudGl0eUFjY2Vzc1NlcnZpY2UuXG4gKi9cbmRlc2NyaWJlKCdpZGVudGl0eUFjY2Vzc1NlcnZpY2UnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBxdWlja0xpbmsgPSAnVmlldyUyMElkZW50aXR5JztcbiAgICBjb25zdCBpZGVudGl0eUlkID0gJ3NvbWVJZGVudGl0eSc7XG4gICAgY29uc3QgZW50aXRsZW1lbnRJZCA9ICcxMjM0JztcbiAgICBjb25zdCBiYXNlVXJsID0gYC9pZGVudGl0eWlxL3VpL3Jlc3QvcXVpY2tMaW5rcy9gO1xuXG4gICAgbGV0IGlkZW50aXR5QWNjZXNzU2VydmljZSwgRWZmZWN0aXZlQWNjZXNzLCBFbnRpdGxlbWVudCwgUm9sZURldGFpbCwgSWRlbnRpdHlFbnRpdGxlbWVudERUTywgJGh0dHBCYWNrZW5kLFxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSwgc29ydDtcblxuICAgIC8vIFVzZSB0aGUgaWRlbnRpdHkgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGlkZW50aXR5TW9kdWxlKSk7XG5cbiAgICBiZWZvcmVFYWNoKG1vZHVsZShmdW5jdGlvbigkcHJvdmlkZSkge1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ09OVEVYVF9QQVRIJywgJy9pZGVudGl0eWlxJyk7XG4gICAgICAgICRwcm92aWRlLmNvbnN0YW50KCdTUF9DVVJSX1VTRVJfSUQnLCAnMTIzJyk7XG4gICAgfSkpO1xuXG4gICAgLyoganNoaW50IG1heHBhcmFtczogOSAqL1xuICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF9pZGVudGl0eUFjY2Vzc1NlcnZpY2VfLCBfRWZmZWN0aXZlQWNjZXNzXywgX0VudGl0bGVtZW50XywgX1JvbGVEZXRhaWxfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9JZGVudGl0eUVudGl0bGVtZW50RFRPXywgXyRodHRwQmFja2VuZF8sIF9tYW5hZ2VkQXR0cmlidXRlU2VydmljZV8sIFNvcnRPcmRlcikge1xuICAgICAgICBpZGVudGl0eUFjY2Vzc1NlcnZpY2UgPSBfaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlXztcbiAgICAgICAgRWZmZWN0aXZlQWNjZXNzID0gX0VmZmVjdGl2ZUFjY2Vzc187XG4gICAgICAgIEVudGl0bGVtZW50ID0gX0VudGl0bGVtZW50XztcbiAgICAgICAgUm9sZURldGFpbCA9IF9Sb2xlRGV0YWlsXztcbiAgICAgICAgSWRlbnRpdHlFbnRpdGxlbWVudERUTyA9IF9JZGVudGl0eUVudGl0bGVtZW50RFRPXztcbiAgICAgICAgJGh0dHBCYWNrZW5kID0gXyRodHRwQmFja2VuZF87XG4gICAgICAgIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlID0gX21hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlXztcbiAgICAgICAgLyogTW9jayB0aGUgdG9Kc29uIHNvcnRPcmRlcidzIHRvSnNvbiBtZXRob2Qgc28gd2UgZG8gbm90IGhhdmUgdG8gZGVhbCB3aXRoIHVybCBlbmNvZGluZyAqL1xuICAgICAgICBzb3J0ID0gbmV3IFNvcnRPcmRlcigpO1xuICAgICAgICBzcHlPbihzb3J0LCAndG9Kc29uJykuYW5kLnJldHVyblZhbHVlKCdzb21lQ29sdW1uJyk7XG4gICAgfSkpO1xuXG4gICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uKCk7XG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nUmVxdWVzdCgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gYnVpbGRVcmwocXVpY2tMaW5rTmFtZSwgaWRlbnRpdHlJZCwgYWNjZXNzLCBzdGFydCwgbGltaXQpIHtcbiAgICAgICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9JHtxdWlja0xpbmtOYW1lfS9pZGVudGl0aWVzLyR7aWRlbnRpdHlJZH0vYWNjZXNzLyR7YWNjZXNzfWA7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHN0YXJ0KSAmJiBhbmd1bGFyLmlzRGVmaW5lZChsaW1pdCkpIHtcbiAgICAgICAgICAgIHVybCArPSBgP2xpbWl0PSR7bGltaXR9JnN0YXJ0PSR7c3RhcnR9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG5cbiAgICBkZXNjcmliZSgnZ2V0RW50aXRsZW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBjb3JyZWN0IGVuZCBwb2ludCBhbmQgcmV0dXJuIEVudGl0bGVtZW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMSwgbGltaXQgPSAxMyxcbiAgICAgICAgICAgICAgICBleHBlY3RlZFVybCA9IGJ1aWxkVXJsKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgJ2lkZW50aXR5RW50aXRsZW1lbnRzJywgc3RhcnQsIGxpbWl0KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLnJlc3BvbmQoMjAwLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc29tZSBuYW1lJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMocXVpY2tMaW5rLCBpZGVudGl0eUlkLCBzdGFydCwgbGltaXQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNFbnRpdGxlbWVudCA9IHJlc3VsdC5kYXRhLm9iamVjdHNbMF0gaW5zdGFuY2VvZiBFbnRpdGxlbWVudDtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXNFbnRpdGxlbWVudCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGNvcnJlY3QgZW5kIHBvaW50IGFuZCByZXR1cm4gRW50aXRsZW1lbnRzIHdpdGggYWRkaXRpb25hbE9ubHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDEsIGxpbWl0ID0gMTMsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBgJHtiYXNlVXJsfSR7cXVpY2tMaW5rfS9pZGVudGl0aWVzLyR7aWRlbnRpdHlJZH0vYWNjZXNzL2lkZW50aXR5RW50aXRsZW1lbnRzP2AgK1xuICAgICAgICAgICAgICAgICAgICBgYWRkaXRpb25hbE9ubHk9dHJ1ZSZsaW1pdD0ke2xpbWl0fSZzb3J0PSR7c29ydC50b0pzb24oKX0mc3RhcnQ9JHtzdGFydH1gO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChleHBlY3RlZFVybCkucmVzcG9uZCgyMDAsIHtcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzb21lIG5hbWUnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldEVudGl0bGVtZW50cyhxdWlja0xpbmssIGlkZW50aXR5SWQsIHN0YXJ0LCBsaW1pdCwgc29ydCwgJycsIHRydWUpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNFbnRpdGxlbWVudCA9IHJlc3VsdC5kYXRhLm9iamVjdHNbMF0gaW5zdGFuY2VvZiBFbnRpdGxlbWVudDtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXNFbnRpdGxlbWVudCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGNvcnJlY3QgZW5kIHBvaW50IGFuZCByZXR1cm4gRW50aXRsZW1lbnRzIHdpdGggcXVlcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDEsIGxpbWl0ID0gMTMsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBgJHtiYXNlVXJsfSR7cXVpY2tMaW5rfS9pZGVudGl0aWVzLyR7aWRlbnRpdHlJZH0vYWNjZXNzL2lkZW50aXR5RW50aXRsZW1lbnRzP2AgK1xuICAgICAgICAgICAgICAgICAgICBgYXBwbGljYXRpb25Pck5hbWVPclZhbHVlPWFzZGYmbGltaXQ9JHtsaW1pdH0mc29ydD0ke3NvcnQudG9Kc29uKCl9JnN0YXJ0PSR7c3RhcnR9YDtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQoZXhwZWN0ZWRVcmwpLnJlc3BvbmQoMjAwLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0czogW3tcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcxMjMnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnc29tZSBuYW1lJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudHMocXVpY2tMaW5rLCBpZGVudGl0eUlkLCBzdGFydCwgbGltaXQsIHNvcnQsICdhc2RmJykudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpc0VudGl0bGVtZW50ID0gcmVzdWx0LmRhdGEub2JqZWN0c1swXSBpbnN0YW5jZW9mIEVudGl0bGVtZW50O1xuICAgICAgICAgICAgICAgIGV4cGVjdChpc0VudGl0bGVtZW50KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSb2xlRW50aXRsZW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBjb3JyZWN0IGVuZCBwb2ludCBhbmQgcmV0dXJuIFJvbGVEZXRhaWxzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSA0LCBsaW1pdCA9IDIwLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYnVpbGRVcmwocXVpY2tMaW5rLCBpZGVudGl0eUlkLCAnaWRlbnRpdHlSb2xlcycsIHN0YXJ0LCBsaW1pdCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NvbWUgbmFtZSdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0Um9sZUVudGl0bGVtZW50cyhxdWlja0xpbmssIGlkZW50aXR5SWQsIHN0YXJ0LCBsaW1pdCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpc1JvbGUgPSByZXN1bHQuZGF0YS5vYmplY3RzWzBdIGluc3RhbmNlb2YgUm9sZURldGFpbDtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXNSb2xlKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgY29ycmVjdCBlbmQgcG9pbnQgYW5kIHJldHVybiBSb2xlcyB3aXRoIHF1ZXJ5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSAxLCBsaW1pdCA9IDEzLFxuICAgICAgICAgICAgICAgIGV4cGVjdGVkVXJsID0gYCR7YmFzZVVybH0ke3F1aWNrTGlua30vaWRlbnRpdGllcy8ke2lkZW50aXR5SWR9L2FjY2Vzcy9pZGVudGl0eVJvbGVzP2AgK1xuICAgICAgICAgICAgICAgICAgICBgbGltaXQ9JHtsaW1pdH0mc29ydD0ke3NvcnQudG9Kc29uKCl9JnN0YXJ0PSR7c3RhcnR9JnZhbHVlPWFzZGZgO1xuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmV4cGVjdEdFVChleHBlY3RlZFVybCkucmVzcG9uZCgyMDAsIHtcbiAgICAgICAgICAgICAgICBvYmplY3RzOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZDogJzEyMycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdzb21lIG5hbWUnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldFJvbGVFbnRpdGxlbWVudHMocXVpY2tMaW5rLCBpZGVudGl0eUlkLCBzdGFydCwgbGltaXQsIHNvcnQsICdhc2RmJykuXG4gICAgICAgICAgICAgICAgdGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXNSb2xlID0gcmVzdWx0LmRhdGEub2JqZWN0c1swXSBpbnN0YW5jZW9mIFJvbGVEZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdChpc1JvbGUpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRFZmZlY3RpdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGNvcnJlY3QgZW5kIHBvaW50IGFuZCByZXR1cm4gRWZmZWN0aXZlQWNjZXNzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSA0MiwgbGltaXQgPSAyMDAsXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRVcmwgPSBidWlsZFVybChxdWlja0xpbmssIGlkZW50aXR5SWQsICdpZGVudGl0eUVmZmVjdGl2ZUFjY2VzcycsIHN0YXJ0LCBsaW1pdCk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKGV4cGVjdGVkVXJsKS5yZXNwb25kKDIwMCwge1xuICAgICAgICAgICAgICAgIG9iamVjdHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnMTIzJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3NvbWUgbmFtZSdcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0RWZmZWN0aXZlQWNjZXNzKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgc3RhcnQsIGxpbWl0KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlzUm9sZSA9IHJlc3VsdC5kYXRhLm9iamVjdHNbMF0gaW5zdGFuY2VvZiBFZmZlY3RpdmVBY2Nlc3M7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGlzUm9sZSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBidWlsZFJvbGVEZXRhaWxzVXJsKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgcm9sZUlkKSB7XG4gICAgICAgIHJldHVybiBidWlsZFVybChxdWlja0xpbmssIGlkZW50aXR5SWQsICdpZGVudGl0eVJvbGVzJykgKyBgLyR7cm9sZUlkfS9kZXRhaWxzYDtcbiAgICB9XG5cbiAgICBpdCgnZ2V0Um9sZURldGFpbHMoKSBjYWxscyBjb3JyZWN0IGVuZHBvaW50IGFuZCByZXR1cm5zIGEgUm9sZURldGFpbCcsICgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IGJ1aWxkUm9sZURldGFpbHNVcmwocXVpY2tMaW5rLCBpZGVudGl0eUlkLCAnMTIzJyk7XG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwge1xuICAgICAgICAgICAgaWQ6ICcxMjMnLFxuICAgICAgICAgICAgbmFtZTogJ3NvbWUgbmFtZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJvbGU7XG4gICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRSb2xlRGV0YWlscyhxdWlja0xpbmssIGlkZW50aXR5SWQsICcxMjMnKS50aGVuKChyZXNwb25zZSkgPT4gcm9sZSA9IHJlc3BvbnNlKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG5cbiAgICAgICAgZXhwZWN0KHJvbGUgaW5zdGFuY2VvZiBSb2xlRGV0YWlsKS50b0VxdWFsKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2dldFJvbGVIaWVyYXJjaHkoKSBjYWxscyBjb3JyZWN0IGVuZHBvaW50IGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIFJvbGVEZXRhaWxzJywgKCkgPT4ge1xuICAgICAgICBsZXQgdXJsID0gYnVpbGRSb2xlRGV0YWlsc1VybChxdWlja0xpbmssIGlkZW50aXR5SWQsICcxMjMnKSArICcvNDU2L2hpZXJhcmNoeSc7XG4gICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgW3tcbiAgICAgICAgICAgICAgICBpZDogJzg4OCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWUgc3ViIHJvbGUgMSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpZDogJzk5OScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NvbWUgc3ViIHJvbGUgMidcbiAgICAgICAgICAgIH1dKTtcblxuICAgICAgICBsZXQgcm9sZXM7XG4gICAgICAgIGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRSb2xlSGllcmFyY2h5KHF1aWNrTGluaywgaWRlbnRpdHlJZCwgJzEyMycsICc0NTYnKS5cbiAgICAgICAgICAgIHRoZW4oKHJlc3BvbnNlKSA9PiByb2xlcyA9IHJlc3BvbnNlKTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG5cbiAgICAgICAgZXhwZWN0KHJvbGVzLmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJvbGVzWzBdIGluc3RhbmNlb2YgUm9sZURldGFpbCkudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldEVudGl0bGVtZW50RGV0YWlsc1VybCgpIHtcbiAgICAgICAgcmV0dXJuIGJ1aWxkVXJsKHF1aWNrTGluaywgaWRlbnRpdHlJZCwgJ2lkZW50aXR5RW50aXRsZW1lbnRzJykgKyAnLycgKyBlbnRpdGxlbWVudElkICsgJy9kZXRhaWxzJztcbiAgICB9XG5cbiAgICBkZXNjcmliZSgnZ2V0RW50aXRsZW1lbnREZXRhaWxzVXJsKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBhIG1pc3NpbmcgcXVpY2sgbGluaycsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKG51bGwsICdpZGVudGl0eScsICdlbnRpdGxlbWVudCcpKS50b1Rocm93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBhIG1pc3NpbmcgaWRlbnRpdHlJZCcsICgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKCdsaW5rJywgbnVsbCwgJ2VudGl0bGVtZW50JykpLnRvVGhyb3coKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Rocm93cyB3aXRoIGEgbWlzc2luZyBlbnRpdGxlbWVudElkJywgKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KCgpID0+IGlkZW50aXR5QWNjZXNzU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHMoJ2xpbmsnLCAnaWRlbnRpdHknLCBudWxsKSkudG9UaHJvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCB1cmwnLCAoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaWRlbnRpdHlBY2Nlc3NTZXJ2aWNlLmdldEVudGl0bGVtZW50RGV0YWlsc1VybChxdWlja0xpbmssIGlkZW50aXR5SWQsIGVudGl0bGVtZW50SWQpKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKGdldEVudGl0bGVtZW50RGV0YWlsc1VybCgpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0RW50aXRsZW1lbnRDZXJ0UmVxdWVzdERldGFpbHMoKSBjYWxscyBjb3JyZWN0IGVuZHBvaW50IGFuZCByZXR1cm5zIGFuIElkZW50aXR5RW50aXRsZW1lbnREVE8nLCAoKSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBidWlsZFVybChxdWlja0xpbmssIGlkZW50aXR5SWQsICdpZGVudGl0eUVudGl0bGVtZW50cycpICsgJy80NTYnO1xuICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIFt7XG4gICAgICAgICAgICBhY2NvdW50TmFtZTogJzEwNCcsXG4gICAgICAgICAgICBhZ2dyZWdhdGlvblN0YXRlOiAnRGlzY29ubmVjdGVkJ1xuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVudGl0bGVtZW50RFRPO1xuICAgICAgICBpZGVudGl0eUFjY2Vzc1NlcnZpY2UuZ2V0RW50aXRsZW1lbnRDZXJ0UmVxdWVzdERldGFpbHMocXVpY2tMaW5rLCBpZGVudGl0eUlkLCAnNDU2JylcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50RFRPID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XG5cbiAgICAgICAgZXhwZWN0KGVudGl0bGVtZW50RFRPIGluc3RhbmNlb2YgSWRlbnRpdHlFbnRpdGxlbWVudERUTykudG9FcXVhbCh0cnVlKTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
