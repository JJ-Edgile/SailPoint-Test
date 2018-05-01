System.register(['test/js/TestInitializer', 'common/managedattribute/ManagedAttributeModule'], function (_export) {
    /* (c) Copyright 2016 SailPoint Technologies, Inc., All Rights Reserved. */

    'use strict';

    var managedAttributeModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_commonManagedattributeManagedAttributeModule) {
            managedAttributeModule = _commonManagedattributeManagedAttributeModule['default'];
        }],
        execute: function () {

            describe('ManagedAttributeService', function () {

                var $httpBackend = undefined,
                    managedAttributeService = undefined,
                    ManagedAttributeDetail = undefined,
                    IdentitySummary = undefined,
                    TargetAssociation = undefined,
                    SortOrder = undefined,
                    ListResultDTO = undefined;

                beforeEach(module(managedAttributeModule));

                /* jshint maxparams: 7 */
                beforeEach(inject(function (_$httpBackend_, _managedAttributeService_, _ManagedAttributeDetail_, _IdentitySummary_, _TargetAssociation_, _SortOrder_, _ListResultDTO_) {
                    $httpBackend = _$httpBackend_;
                    managedAttributeService = _managedAttributeService_;
                    ManagedAttributeDetail = _ManagedAttributeDetail_;
                    IdentitySummary = _IdentitySummary_;
                    TargetAssociation = _TargetAssociation_;
                    SortOrder = _SortOrder_;
                    ListResultDTO = _ListResultDTO_;
                }));

                afterEach(function () {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                });

                describe('getEntitlementDetails()', function () {
                    it('throws with no url', function () {
                        expect(function () {
                            return managedAttributeService.getEntitlementDetails(null);
                        }).toThrow();
                    });

                    it('returns the entitlement details', function () {
                        var url = '/blah',
                            managedAttribute = undefined;

                        $httpBackend.expectGET(url).respond(200, { id: '1' });

                        managedAttributeService.getEntitlementDetails(url).then(function (managedAttributeDetail) {
                            managedAttribute = managedAttributeDetail;
                        });

                        $httpBackend.flush();

                        expect(managedAttribute).toBeDefined();
                        expect(managedAttribute instanceof ManagedAttributeDetail).toEqual(true);
                    });
                });

                describe('getEntitlementGroupMembers()', function () {
                    it('throws with no url', function () {
                        expect(function () {
                            return managedAttributeService.getEntitlementGroupMembers(null);
                        }).toThrow();
                    });

                    it('returns the entitlement group member details', function () {
                        var start = 0,
                            limit = 5,
                            url = 'blah/members?limit=' + limit + '&sort=%5B%5D&start=' + start,
                            membersTestData = {
                            count: 2,
                            objects: [{ id: '11' }, { id: '22' }]
                        },
                            promise = undefined;

                        $httpBackend.expectGET(url).respond(200, membersTestData);

                        promise = managedAttributeService.getEntitlementGroupMembers('blah', start, limit, new SortOrder());

                        $httpBackend.flush();

                        promise.then(function (response) {
                            expect(response.data.getObjects().length).toEqual(membersTestData.count);
                            expect(response.data.objects[0] instanceof IdentitySummary).toEqual(true);
                            expect(response.data.objects[1] instanceof IdentitySummary).toEqual(true);
                        });
                    });
                });

                describe('getEntitlementAccess()', function () {
                    it('throws with no url', function () {
                        expect(function () {
                            return managedAttributeService.getEntitlementAccess(null);
                        }).toThrow();
                    });

                    it('returns the entitlement details', function () {
                        var start = 0,
                            limit = 5,
                            url = 'blah/access?limit=' + limit + '&sort=%5B%5D&start=' + start,
                            targetAccessTestData = {
                            count: 2,
                            objects: [{ id: '11' }, { id: '22' }]
                        },
                            promise = undefined;

                        $httpBackend.expectGET(url).respond(200, targetAccessTestData);

                        promise = managedAttributeService.getEntitlementAccess('blah', start, limit, new SortOrder());

                        $httpBackend.flush();

                        promise.then(function (response) {
                            expect(response.data.getObjects().length).toEqual(targetAccessTestData.count);
                            expect(response.data.objects[0] instanceof TargetAssociation).toEqual(true);
                            expect(response.data.objects[1] instanceof TargetAssociation).toEqual(true);
                        });
                    });
                });

                describe('getEntitlementInheritanceParents()', function () {
                    it('throws with no url', function () {
                        expect(function () {
                            return managedAttributeService.getEntitlementInheritanceParents(null);
                        }).toThrow();
                    });

                    it('returns a list result with the inheritance data', function () {
                        var start = 0,
                            limit = 5,
                            url = 'blah/inheritance/parents?limit=' + limit + '&sort=%5B%5D&start=' + start,
                            data = {
                            count: 2,
                            objects: [{ id: '11' }, { id: '22' }]
                        },
                            promise = undefined;

                        $httpBackend.expectGET(url).respond(200, data);
                        promise = managedAttributeService.getEntitlementInheritanceParents('blah', start, limit, new SortOrder());
                        $httpBackend.flush();
                        promise.then(function (response) {
                            expect(response.data).toEqual(new ListResultDTO(data));
                        });
                    });
                });

                describe('getEntitlementInheritanceChildren()', function () {
                    it('throws with no url', function () {
                        expect(function () {
                            return managedAttributeService.getEntitlementInheritanceChildren(null);
                        }).toThrow();
                    });

                    it('returns a list result with the inheritance data', function () {
                        var start = 0,
                            limit = 5,
                            url = 'blah/inheritance/children?limit=' + limit + '&sort=%5B%5D&start=' + start,
                            data = {
                            count: 2,
                            objects: [{ id: '11' }, { id: '22' }]
                        },
                            promise = undefined;

                        $httpBackend.expectGET(url).respond(200, data);
                        promise = managedAttributeService.getEntitlementInheritanceChildren('blah', start, limit, new SortOrder());
                        $httpBackend.flush();
                        promise.then(function (response) {
                            expect(response.data).toEqual(new ListResultDTO(data));
                        });
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLG1EQUFtRCxVQUFVLFNBQVM7OztJQUc5Rzs7SUFFQSxJQUFJO0lBQ0osT0FBTztRQUNILFNBQVMsQ0FBQyxVQUFVLHdCQUF3QixJQUFJLFVBQVUsK0NBQStDO1lBQ3JHLHlCQUF5Qiw4Q0FBOEM7O1FBRTNFLFNBQVMsWUFBWTs7WUFMN0IsU0FBUywyQkFBMkIsWUFBTTs7Z0JBRXRDLElBQUksZUFBWTtvQkFBRSwwQkFBdUI7b0JBQUUseUJBQXNCO29CQUFFLGtCQUFlO29CQUFFLG9CQUFpQjtvQkFBRSxZQUFTO29CQUM1RyxnQkFBYTs7Z0JBRWpCLFdBQVcsT0FBTzs7O2dCQUdsQixXQUFXLE9BQU8sVUFBQyxnQkFBZ0IsMkJBQTJCLDBCQUEwQixtQkFDckUscUJBQXFCLGFBQWEsaUJBQW9CO29CQUNyRSxlQUFlO29CQUNmLDBCQUEwQjtvQkFDMUIseUJBQXlCO29CQUN6QixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsWUFBWTtvQkFDWixnQkFBZ0I7OztnQkFHcEIsVUFBVSxZQUFNO29CQUNaLGFBQWE7b0JBQ2IsYUFBYTs7O2dCQUdqQixTQUFTLDJCQUEyQixZQUFNO29CQUN0QyxHQUFHLHNCQUFzQixZQUFNO3dCQUMzQixPQUFPLFlBQUE7NEJBWVMsT0FaSCx3QkFBd0Isc0JBQXNCOzJCQUFPOzs7b0JBR3RFLEdBQUcsbUNBQW1DLFlBQU07d0JBQ3hDLElBQUksTUFBTTs0QkFDTixtQkFBZ0I7O3dCQUVwQixhQUFhLFVBQVUsS0FBSyxRQUFRLEtBQUssRUFBQyxJQUFJOzt3QkFFOUMsd0JBQXdCLHNCQUFzQixLQUFLLEtBQU0sVUFBQSx3QkFBMEI7NEJBQy9FLG1CQUFtQjs7O3dCQUd2QixhQUFhOzt3QkFFYixPQUFPLGtCQUFrQjt3QkFDekIsT0FBTyw0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SUFBSTt3QkFDOUYsYUFBYTt3QkFDYixRQUFRLEtBQUssVUFBUyxVQUFVOzRCQUM1QixPQUFPLFNBQVMsTUFBTSxRQUFRLElBQUksY0FBYzs7Ozs7OztHQTRCN0QiLCJmaWxlIjoiY29tbW9uL21hbmFnZWRhdHRyaWJ1dGUvTWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VUZXN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChjKSBDb3B5cmlnaHQgMjAxNiBTYWlsUG9pbnQgVGVjaG5vbG9naWVzLCBJbmMuLCBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xyXG5cclxuaW1wb3J0ICd0ZXN0L2pzL1Rlc3RJbml0aWFsaXplcic7XHJcbmltcG9ydCBtYW5hZ2VkQXR0cmlidXRlTW9kdWxlIGZyb20gJ2NvbW1vbi9tYW5hZ2VkYXR0cmlidXRlL01hbmFnZWRBdHRyaWJ1dGVNb2R1bGUnO1xyXG5cclxuZGVzY3JpYmUoJ01hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlJywgKCkgPT4ge1xyXG5cclxuICAgIGxldCAkaHR0cEJhY2tlbmQsIG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLCBNYW5hZ2VkQXR0cmlidXRlRGV0YWlsLCBJZGVudGl0eVN1bW1hcnksIFRhcmdldEFzc29jaWF0aW9uLCBTb3J0T3JkZXIsXHJcbiAgICAgICAgTGlzdFJlc3VsdERUTztcclxuXHJcbiAgICBiZWZvcmVFYWNoKG1vZHVsZShtYW5hZ2VkQXR0cmlidXRlTW9kdWxlKSk7XHJcblxyXG4gICAgLyoganNoaW50IG1heHBhcmFtczogNyAqL1xyXG4gICAgYmVmb3JlRWFjaChpbmplY3QoKF8kaHR0cEJhY2tlbmRfLCBfbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2VfLCBfTWFuYWdlZEF0dHJpYnV0ZURldGFpbF8sIF9JZGVudGl0eVN1bW1hcnlfLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIF9UYXJnZXRBc3NvY2lhdGlvbl8sIF9Tb3J0T3JkZXJfLCBfTGlzdFJlc3VsdERUT18pID0+IHtcclxuICAgICAgICAkaHR0cEJhY2tlbmQgPSBfJGh0dHBCYWNrZW5kXztcclxuICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZSA9IF9tYW5hZ2VkQXR0cmlidXRlU2VydmljZV87XHJcbiAgICAgICAgTWFuYWdlZEF0dHJpYnV0ZURldGFpbCA9IF9NYW5hZ2VkQXR0cmlidXRlRGV0YWlsXztcclxuICAgICAgICBJZGVudGl0eVN1bW1hcnkgPSBfSWRlbnRpdHlTdW1tYXJ5XztcclxuICAgICAgICBUYXJnZXRBc3NvY2lhdGlvbiA9IF9UYXJnZXRBc3NvY2lhdGlvbl87XHJcbiAgICAgICAgU29ydE9yZGVyID0gX1NvcnRPcmRlcl87XHJcbiAgICAgICAgTGlzdFJlc3VsdERUTyA9IF9MaXN0UmVzdWx0RFRPXztcclxuICAgIH0pKTtcclxuXHJcbiAgICBhZnRlckVhY2goKCkgPT4ge1xyXG4gICAgICAgICRodHRwQmFja2VuZC52ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb24oKTtcclxuICAgICAgICAkaHR0cEJhY2tlbmQudmVyaWZ5Tm9PdXRzdGFuZGluZ1JlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRFbnRpdGxlbWVudERldGFpbHMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gdXJsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnREZXRhaWxzKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIHRoZSBlbnRpdGxlbWVudCBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gJy9ibGFoJyxcclxuICAgICAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGU7XHJcblxyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZXhwZWN0R0VUKHVybCkucmVzcG9uZCgyMDAsIHtpZDogJzEnfSk7XHJcblxyXG4gICAgICAgICAgICBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudERldGFpbHModXJsKS50aGVuKChtYW5hZ2VkQXR0cmlidXRlRGV0YWlsID0+IHtcclxuICAgICAgICAgICAgICAgIG1hbmFnZWRBdHRyaWJ1dGUgPSBtYW5hZ2VkQXR0cmlidXRlRGV0YWlsO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cEJhY2tlbmQuZmx1c2goKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGVjdChtYW5hZ2VkQXR0cmlidXRlKS50b0JlRGVmaW5lZCgpO1xyXG4gICAgICAgICAgICBleHBlY3QobWFuYWdlZEF0dHJpYnV0ZSBpbnN0YW5jZW9mIE1hbmFnZWRBdHRyaWJ1dGVEZXRhaWwpLnRvRXF1YWwodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RW50aXRsZW1lbnRHcm91cE1lbWJlcnMoKScsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gdXJsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnRHcm91cE1lbWJlcnMobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGVudGl0bGVtZW50IGdyb3VwIG1lbWJlciBkZXRhaWxzJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc3RhcnQgPSAwLFxyXG4gICAgICAgICAgICAgICAgbGltaXQgPSA1LFxyXG4gICAgICAgICAgICAgICAgdXJsID0gYGJsYWgvbWVtYmVycz9saW1pdD0ke2xpbWl0fSZzb3J0PSU1QiU1RCZzdGFydD0ke3N0YXJ0fWAsXHJcbiAgICAgICAgICAgICAgICBtZW1iZXJzVGVzdERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3tpZDogJzExJ30sIHtpZDogJzIyJ31dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgbWVtYmVyc1Rlc3REYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudEdyb3VwTWVtYmVycygnYmxhaCcsIHN0YXJ0LCBsaW1pdCwgbmV3IFNvcnRPcmRlcigpKTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5nZXRPYmplY3RzKCkubGVuZ3RoKS50b0VxdWFsKG1lbWJlcnNUZXN0RGF0YS5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICBleHBlY3QocmVzcG9uc2UuZGF0YS5vYmplY3RzWzBdIGluc3RhbmNlb2YgSWRlbnRpdHlTdW1tYXJ5KS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1sxXSBpbnN0YW5jZW9mIElkZW50aXR5U3VtbWFyeSkudG9FcXVhbCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZXNjcmliZSgnZ2V0RW50aXRsZW1lbnRBY2Nlc3MoKScsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gdXJsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnRBY2Nlc3MobnVsbCkpLnRvVGhyb3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoJ3JldHVybnMgdGhlIGVudGl0bGVtZW50IGRldGFpbHMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDAsXHJcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgYmxhaC9hY2Nlc3M/bGltaXQ9JHtsaW1pdH0mc29ydD0lNUIlNUQmc3RhcnQ9JHtzdGFydH1gLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0QWNjZXNzVGVzdERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3tpZDogJzExJ30sIHtpZDogJzIyJ31dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgdGFyZ2V0QWNjZXNzVGVzdERhdGEpO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZSA9IG1hbmFnZWRBdHRyaWJ1dGVTZXJ2aWNlLmdldEVudGl0bGVtZW50QWNjZXNzKCdibGFoJywgc3RhcnQsIGxpbWl0LCBuZXcgU29ydE9yZGVyKCkpO1xyXG5cclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcblxyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhLmdldE9iamVjdHMoKS5sZW5ndGgpLnRvRXF1YWwodGFyZ2V0QWNjZXNzVGVzdERhdGEuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1swXSBpbnN0YW5jZW9mIFRhcmdldEFzc29jaWF0aW9uKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEub2JqZWN0c1sxXSBpbnN0YW5jZW9mIFRhcmdldEFzc29jaWF0aW9uKS50b0VxdWFsKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlUGFyZW50cygpJywgKCkgPT4ge1xyXG4gICAgICAgIGl0KCd0aHJvd3Mgd2l0aCBubyB1cmwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCgoKSA9PiBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlUGFyZW50cyhudWxsKSkudG9UaHJvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdCgncmV0dXJucyBhIGxpc3QgcmVzdWx0IHdpdGggdGhlIGluaGVyaXRhbmNlIGRhdGEnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IDAsXHJcbiAgICAgICAgICAgICAgICBsaW1pdCA9IDUsXHJcbiAgICAgICAgICAgICAgICB1cmwgPSBgYmxhaC9pbmhlcml0YW5jZS9wYXJlbnRzP2xpbWl0PSR7bGltaXR9JnNvcnQ9JTVCJTVEJnN0YXJ0PSR7c3RhcnR9YCxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3tpZDogJzExJ30sIHtpZDogJzIyJ31dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlUGFyZW50cygnYmxhaCcsIHN0YXJ0LCBsaW1pdCwgbmV3IFNvcnRPcmRlcigpKTtcclxuICAgICAgICAgICAgJGh0dHBCYWNrZW5kLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlLmRhdGEpLnRvRXF1YWwobmV3IExpc3RSZXN1bHREVE8oZGF0YSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlc2NyaWJlKCdnZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlQ2hpbGRyZW4oKScsICgpID0+IHtcclxuICAgICAgICBpdCgndGhyb3dzIHdpdGggbm8gdXJsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoKCkgPT4gbWFuYWdlZEF0dHJpYnV0ZVNlcnZpY2UuZ2V0RW50aXRsZW1lbnRJbmhlcml0YW5jZUNoaWxkcmVuKG51bGwpKS50b1Rocm93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0KCdyZXR1cm5zIGEgbGlzdCByZXN1bHQgd2l0aCB0aGUgaW5oZXJpdGFuY2UgZGF0YScsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMCxcclxuICAgICAgICAgICAgICAgIGxpbWl0ID0gNSxcclxuICAgICAgICAgICAgICAgIHVybCA9IGBibGFoL2luaGVyaXRhbmNlL2NoaWxkcmVuP2xpbWl0PSR7bGltaXR9JnNvcnQ9JTVCJTVEJnN0YXJ0PSR7c3RhcnR9YCxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW3tpZDogJzExJ30sIHtpZDogJzIyJ31dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5leHBlY3RHRVQodXJsKS5yZXNwb25kKDIwMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSBtYW5hZ2VkQXR0cmlidXRlU2VydmljZS5nZXRFbnRpdGxlbWVudEluaGVyaXRhbmNlQ2hpbGRyZW4oJ2JsYWgnLCBzdGFydCwgbGltaXQsIG5ldyBTb3J0T3JkZXIoKSk7XHJcbiAgICAgICAgICAgICRodHRwQmFja2VuZC5mbHVzaCgpO1xyXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdChyZXNwb25zZS5kYXRhKS50b0VxdWFsKG5ldyBMaXN0UmVzdWx0RFRPKGRhdGEpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
