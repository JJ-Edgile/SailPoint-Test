System.register(['test/js/TestInitializer', 'accessRequest/AccessRequestModule', 'test/js/TestModule', './AccessRequestTestData'], function (_export) {
    'use strict';

    var accessRequestModule, testModule;
    return {
        setters: [function (_testJsTestInitializer) {}, function (_accessRequestAccessRequestModule) {
            accessRequestModule = _accessRequestAccessRequestModule['default'];
        }, function (_testJsTestModule) {
            testModule = _testJsTestModule['default'];
        }, function (_AccessRequestTestData) {}],
        execute: function () {

            /**
             * Tests for the AccessRequestDeepFilterService.
             */
            describe('AccessRequestDeepFilterService', function () {

                var accessRequestDeepFilterService, accessRequestIdentityService, identity, location, testService, $provide, $rootScope, accessRequestFilterService, accessRequestItemsService, SEARCH_TYPE_KEYWORD, SEARCH_TYPE_POPULATION, SEARCH_TYPE_IDENTITY, q, FilterValue;

                ////////////////////////////////////////////////////////////////////////////
                //
                // GLOBAL SETUP
                //
                ////////////////////////////////////////////////////////////////////////////

                // Load the test module to get the testService.
                beforeEach(module(testModule));
                // Use the access request module.
                beforeEach(module(accessRequestModule));

                beforeEach(module(function (_$provide_) {
                    $provide = _$provide_;
                    $provide.constant('SP_CURR_USER_ID', '123');
                    $provide.constant('SP_CURR_USER_NAME', 'john.doe');
                    $provide.constant('SP_CURR_DISPLAYABLE_USER_NAME', 'Johnny Doe');
                }));

                // Setup the dependencies.
                /* jshint maxparams: 14 */
                beforeEach(inject(function (_accessRequestDeepFilterService_, $location, _accessRequestIdentityService_, Identity, _testService_, _$rootScope_, _accessRequestFilterService_, _accessRequestItemsService_, _SEARCH_TYPE_KEYWORD_, _SEARCH_TYPE_POPULATION_, _SEARCH_TYPE_IDENTITY_, accessRequestTestData, $q, _FilterValue_) {
                    accessRequestDeepFilterService = _accessRequestDeepFilterService_;
                    accessRequestIdentityService = _accessRequestIdentityService_;
                    accessRequestFilterService = _accessRequestFilterService_;
                    accessRequestItemsService = _accessRequestItemsService_;
                    testService = _testService_;
                    location = $location;
                    $rootScope = _$rootScope_;
                    identity = new Identity(accessRequestTestData.IDENTITY1);
                    SEARCH_TYPE_KEYWORD = _SEARCH_TYPE_KEYWORD_;
                    SEARCH_TYPE_POPULATION = _SEARCH_TYPE_POPULATION_;
                    SEARCH_TYPE_IDENTITY = _SEARCH_TYPE_IDENTITY_;
                    q = $q;
                    FilterValue = _FilterValue_;
                }));

                describe('getTargetIdentity identityName', function () {

                    it('should call getDeepLinkIdentity for given identityName', function () {
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createPromise(false, identity));

                        location.search('identityName', 'jbob');
                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.getTargetIdentity();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith('jbob', undefined, undefined, undefined, undefined);
                    });

                    it('should return current identity if no identityName', function () {
                        var targetIdentity, returnedPromise;
                        accessRequestDeepFilterService.init();

                        returnedPromise = accessRequestDeepFilterService.getTargetIdentity();
                        returnedPromise.then(function (identity) {
                            targetIdentity = identity;
                        });
                        $rootScope.$apply();
                        expect(targetIdentity.name).toEqual('john.doe');
                    });

                    it('should fail and return undefined when identity name is invalid', function () {
                        var targetIdentity, returnedPromise;
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createPromise(false, null));

                        location.search('identityName', 'jbob');
                        accessRequestDeepFilterService.init();

                        returnedPromise = accessRequestDeepFilterService.getTargetIdentity();
                        returnedPromise.then(function (identity) {
                            targetIdentity = identity;
                        })['catch'](function () {});
                        $rootScope.$apply();
                        expect(targetIdentity).toBeUndefined();
                    });

                    it('should fail and call reset when IN is invalid', function () {
                        testService.errorResponse.status = 404;
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createResponsePromise(true));
                        spyOn(accessRequestDeepFilterService, 'reset');

                        location.search('in', 'jbob');
                        location.search('quickLink', 'QL Name');
                        accessRequestDeepFilterService.init();

                        accessRequestDeepFilterService.getTargetIdentity()['catch'](function () {});
                        $rootScope.$apply();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith(undefined, 'jbob', undefined, undefined, 'QL Name');
                        expect(accessRequestDeepFilterService.reset).toHaveBeenCalled();
                    });

                    it('should fail and call reset when requesteeApp is invalid', function () {
                        testService.errorResponse.status = 404;
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createResponsePromise(true));
                        spyOn(accessRequestDeepFilterService, 'reset');

                        location.search('requesteeNativeIdentity', 'jbobNative');
                        location.search('requesteeApp', 'bogus');
                        accessRequestDeepFilterService.init();

                        accessRequestDeepFilterService.getTargetIdentity()['catch'](function () {});
                        $rootScope.$apply();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith(undefined, undefined, 'jbobNative', 'bogus', undefined);
                        expect(accessRequestDeepFilterService.reset).toHaveBeenCalled();
                    });

                    it('should fail and call reset when requesteeNativeIdentity is invalid', function () {
                        testService.errorResponse.status = 404;
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createResponsePromise(true));
                        spyOn(accessRequestDeepFilterService, 'reset');

                        location.search('requesteeNativeIdentity', 'bogus');
                        location.search('requesteeApp', 'myApp');
                        location.search('quickLink', 'QLName');
                        accessRequestDeepFilterService.init();

                        accessRequestDeepFilterService.getTargetIdentity()['catch'](function () {});
                        $rootScope.$apply();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith(undefined, undefined, 'bogus', 'myApp', 'QLName');
                        expect(accessRequestDeepFilterService.reset).toHaveBeenCalled();
                    });
                });

                describe('getTargetIdentity IN', function () {

                    it('should call getDeepLinkIdentity for given identity specified by IN', function () {
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createPromise(false, identity));

                        location.search('in', 'jbob');
                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.getTargetIdentity();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith(undefined, 'jbob', undefined, undefined, undefined);
                    });
                });

                describe('getTargetIdentity native identity', function () {

                    it('should call getDeepLinkIdentity for given requesteeNativeIdentity/requesteeApp', function () {
                        spyOn(accessRequestIdentityService, 'getDeepLinkIdentity').and.returnValue(testService.createPromise(false, identity));

                        location.search('requesteeNativeIdentity', 'jbobNative');
                        location.search('requesteeApp', 'myApp');
                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.getTargetIdentity();
                        expect(accessRequestIdentityService.getDeepLinkIdentity).toHaveBeenCalledWith(undefined, undefined, 'jbobNative', 'myApp', undefined);
                    });
                });

                describe('AccessRequestDeepFilterService on Review Page Self Service', function () {
                    beforeEach(inject(function (AccessRequestItem) {
                        spyOn(location, 'path').and.returnValue('/accessRequestSelf/review');
                    }));

                    it('should be true for only identityName', function () {
                        location.search('identityName', 'spAdmin');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeTruthy();
                    });
                });

                describe('AccessRequestDeepFilterService on Review Page', function () {
                    beforeEach(inject(function (AccessRequestItem) {
                        spyOn(location, 'path').and.returnValue('/accessRequest/review');
                    }));

                    it('should be true for only identityName', function () {
                        location.search('identityName', 'spAdmin');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeTruthy();
                    });

                    it('should be true for only role filter', function () {
                        location.search('role', 'test');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                    });

                    it('should setup filters correctly and set deep link to true', function () {
                        location.search('role', 'hello');
                        location.search('identityName', 'spAdmin');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.role).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should set role for role', function () {
                        location.search('role', 'hello');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.role).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should set entitlement for entitlement', function () {
                        location.search('entitlement', 'hello');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.entitlement).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should set entitlementAttribute1 for entitlementAttribute1', function () {
                        location.search('entitlementAttribute1', 'hello');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.entitlementAttribute1).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should set entitlementApplication2 for entitlementApplication2', function () {
                        location.search('entitlementApplication2', 'hello');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.entitlementApplication2).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should set entitlementValue3 for entitlementValue3', function () {
                        location.search('entitlementValue3', 'hello');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.filtersReview.entitlementValue3).toEqual(new FilterValue({
                            value: 'hello'
                        }));
                    });

                    it('should not setup filters for invalid search terms', function () {
                        location.search('abra', 'cadabra');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeFalsy();
                        expect(accessRequestDeepFilterService.filtersReview.abra).toBe(undefined);
                    });
                });

                describe('AccessRequestDeepFilterService on Manage Access Self Service', function () {
                    beforeEach(inject(function (AccessRequestItem) {
                        spyOn(location, 'path').and.returnValue('/accessRequestSelf/add');
                    }));

                    it('should be true for only identityName', function () {
                        location.search('identityName', 'spAdmin');
                        accessRequestDeepFilterService.init();

                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeTruthy();
                    });
                });

                describe('AccessRequestDeepFilterService on Manage Access Page', function () {
                    beforeEach(inject(function (AccessRequestItem) {
                        spyOn(location, 'path').and.returnValue('/manageAccess/add');
                    }));

                    it('should be true for only filterRoleType filter', function () {
                        location.search('filterRoleType', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeTruthy();
                    });

                    it('should be true for only filterRole filter', function () {
                        location.search('filterRole', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });

                    it('should be true for only filterEntitlementApplication filter', function () {
                        location.search('filterEntitlementApplication', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });

                    it('should be true for only filterEntitlementAttribute filter', function () {
                        location.search('filterEntitlementAttribute', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });

                    it('should be true for only filterEntitlementEntitlement filter', function () {
                        location.search('filterEntitlementEntitlement', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });

                    it('should be true for only filterEntitlementOwner filter', function () {
                        location.search('filterEntitlementOwner', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });

                    it('should be true for only filterEntitlement filter', function () {
                        location.search('filterEntitlement', 'test');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeTruthy();
                    });
                });

                describe('getItemSearchData', function () {

                    it('should call getAccessFilterValues for given filters', function () {
                        spyOn(accessRequestFilterService, 'getAccessFilterValues').and.returnValue(testService.createPromise(false, []));

                        location.search('identityName', 'jbob');
                        location.search('filterEntitlement', 'test');
                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.getItemSearchData();
                        expect(accessRequestFilterService.getAccessFilterValues).toHaveBeenCalled();
                    });

                    it('should return search data with keyword', function () {
                        var searchData, returnedPromise;
                        spyOn(accessRequestFilterService, 'getAccessFilterValues').and.returnValue(testService.createPromise(false, []));

                        location.search('identityName', 'jbob');
                        location.search('filterKeyword', 'test');
                        accessRequestDeepFilterService.init();

                        returnedPromise = accessRequestDeepFilterService.getItemSearchData();
                        returnedPromise.then(function (data) {
                            searchData = data;
                        });
                        $rootScope.$apply();
                        expect(searchData.searchTerm).toEqual('test');
                    });

                    it('should return search data with no keyword', function () {
                        var searchData, returnedPromise;
                        spyOn(accessRequestFilterService, 'getAccessFilterValues').and.returnValue(testService.createPromise(false, []));

                        location.search('identityName', 'jbob');
                        location.search('filterEntitlement', 'test');
                        accessRequestDeepFilterService.init();

                        returnedPromise = accessRequestDeepFilterService.getItemSearchData();
                        returnedPromise.then(function (data) {
                            searchData = data;
                        });
                        $rootScope.$apply();
                        expect(searchData.searchTerm).toBeUndefined();
                    });
                });

                describe('getReviewItems', function () {
                    it('should throw an exception when no filters are found', function () {

                        location.search('identityName', identity.getName());
                        accessRequestDeepFilterService.init();

                        expect(function () {
                            accessRequestDeepFilterService.getReviewItems();
                        }).toThrow();
                    });

                    it('should return data with valid filters', function () {
                        var reviewItems, returnedPromise;
                        spyOn(accessRequestItemsService, 'getAccessRequestItems').and.returnValue(testService.createPromise(false, { data: { objects: [{}, {}] } }));

                        location.search('identityName', identity.getName());
                        location.search('entitlementApplication', 'test');

                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.targetIdentity = identity;
                        returnedPromise = accessRequestDeepFilterService.getReviewItems();
                        returnedPromise.then(function (data) {
                            reviewItems = data;
                        });
                        $rootScope.$apply();

                        expect(reviewItems.length).toBe(2);
                    });
                });

                describe('init', function () {
                    it('should initialize requestAccessSearchType to SEARCH_TYPE_IDENTITY', function () {
                        location.search('filterIdentity', 'Adam');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.getRequestAccessSearchType()).toEqual(SEARCH_TYPE_IDENTITY);
                    });

                    it('should initialize requestAccessSearchType to SEARCH_TYPE_POPULATION', function () {
                        location.search('filterPopulationManager', 'Adam');
                        accessRequestDeepFilterService.init();
                        expect(accessRequestDeepFilterService.getRequestAccessSearchType()).toEqual(SEARCH_TYPE_POPULATION);
                    });
                });

                describe('reset', function () {
                    it('should clear data and/or set to default values', function () {

                        location.search('identityName', identity.getName());
                        location.search('entitlementApplication', 'test');
                        location.search('filterPopulationRegion', 'Asia');
                        location.path('accessRequest/review');

                        accessRequestDeepFilterService.init();
                        accessRequestDeepFilterService.targetIdentity = identity;

                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeTruthy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeTruthy();
                        expect(accessRequestDeepFilterService.getRequestAccessSearchType()).toEqual(SEARCH_TYPE_POPULATION);
                        expect(accessRequestDeepFilterService.targetIdentity).toBe(identity);
                        expect(accessRequestDeepFilterService.filtersReview).toEqual({
                            entitlementApplication: new FilterValue({ value: 'test' })
                        });

                        accessRequestDeepFilterService.reset();

                        expect(accessRequestDeepFilterService.isDeepLinkManageAccess()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLinkReview()).toBeFalsy();
                        expect(accessRequestDeepFilterService.isDeepLink()).toBeFalsy();
                        expect(accessRequestDeepFilterService.getRequestAccessSearchType()).toEqual(SEARCH_TYPE_KEYWORD);
                        expect(accessRequestDeepFilterService.targetIdentity).toBeUndefined();
                        expect(accessRequestDeepFilterService.filtersReview).toEqual({});
                    });
                });
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlVGVzdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLENBQUMsMkJBQTJCLHFDQUFxQyxzQkFBc0IsNEJBQTRCLFVBQVUsU0FBUztJQUF0Sjs7SUFHSSxJQUFJLHFCQUFxQjtJQUN6QixPQUFPO1FBQ0gsU0FBUyxDQUFDLFVBQVUsd0JBQXdCLElBQUksVUFBVSxtQ0FBbUM7WUFDekYsc0JBQXNCLGtDQUFrQztXQUN6RCxVQUFVLG1CQUFtQjtZQUM1QixhQUFhLGtCQUFrQjtXQUNoQyxVQUFVLHdCQUF3QjtRQUNyQyxTQUFTLFlBQVk7Ozs7O1lBQTdCLFNBQVMsa0NBQWtDLFlBQVc7O2dCQUVsRCxJQUFJLGdDQUFnQyw4QkFBOEIsVUFBVSxVQUFVLGFBQWEsVUFDL0YsWUFBWSw0QkFBNEIsMkJBQTJCLHFCQUFxQix3QkFDeEYsc0JBQXNCLEdBQUc7Ozs7Ozs7OztnQkFTN0IsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPOztnQkFFbEIsV0FBVyxPQUFPLFVBQVMsWUFBWTtvQkFDbkMsV0FBVztvQkFDWCxTQUFTLFNBQVMsbUJBQW1CO29CQUNyQyxTQUFTLFNBQVMscUJBQXFCO29CQUN2QyxTQUFTLFNBQVMsaUNBQWlDOzs7OztnQkFLdkQsV0FBVyxPQUFPLFVBQVMsa0NBQWtDLFdBQVcsZ0NBQzVDLFVBQVUsZUFBZSxjQUFjLDhCQUN2Qyw2QkFBNkIsdUJBQXVCLDBCQUNwRCx3QkFBd0IsdUJBQXVCLElBQUksZUFBZTtvQkFDMUYsaUNBQWlDO29CQUNqQywrQkFBK0I7b0JBQy9CLDZCQUE2QjtvQkFDN0IsNEJBQTRCO29CQUM1QixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixXQUFXLElBQUksU0FBUyxzQkFBc0I7b0JBQzlDLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUN6Qix1QkFBdUI7b0JBQ3ZCLElBQUk7b0JBQ0osY0FBYzs7O2dCQUdsQixTQUFTLGtDQUFrQyxZQUFXOztvQkFFbEQsR0FBRywwREFBMEQsWUFBVzt3QkFDcEUsTUFBTSw4QkFBOEIsdUJBQXVCLElBQUksWUFDM0QsWUFBWSxjQUFjLE9BQU87O3dCQUdyQyxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQywrQkFBK0I7d0JBQy9CLCtCQUErQjt3QkFDL0IsT0FBTyw2QkFBNkIscUJBQ2hDLHFCQUFxQixRQUFRLFdBQVcsV0FBVyxXQUFXOzs7b0JBR3RFLEdBQUcscURBQXFELFlBQVc7d0JBQy9ELElBQUksZ0JBQWdCO3dCQUNwQiwrQkFBK0I7O3dCQUUvQixrQkFBa0IsK0JBQStCO3dCQUNqRCxnQkFBZ0IsS0FBSyxVQUFTLFVBQVU7NEJBQ3BDLGlCQUFpQjs7d0JBRXJCLFdBQVc7d0JBQ1gsT0FBTyxlQUFlLE1BQU0sUUFBUTs7O29CQUd4QyxHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxJQUFJLGdCQUFnQjt3QkFDcEIsTUFBTSw4QkFBOEIsdUJBQXVCLElBQUksWUFDM0QsWUFBWSxjQUFjLE9BQU87O3dCQUdyQyxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQywrQkFBK0I7O3dCQUUvQixrQkFBa0IsK0JBQStCO3dCQUNqRCxnQkFBZ0IsS0FBSyxVQUFTLFVBQVU7NEJBQ3BDLGlCQUFpQjsyQkFDbkIsU0FBTyxZQUFNO3dCQUNmLFdBQVc7d0JBQ1gsT0FBTyxnQkFBZ0I7OztvQkFHM0IsR0FBRyxpREFBaUQsWUFBVzt3QkFDM0QsWUFBWSxjQUFjLFNBQVM7d0JBQ25DLE1BQU0sOEJBQThCLHVCQUMvQixJQUFJLFlBQVksWUFBWSxzQkFBc0I7d0JBQ3ZELE1BQU0sZ0NBQWdDOzt3QkFFdEMsU0FBUyxPQUFPLE1BQU07d0JBQ3RCLFNBQVMsT0FBTyxhQUFhO3dCQUM3QiwrQkFBK0I7O3dCQUUvQiwrQkFBK0Isb0JBQW1CLFNBQU8sWUFBTTt3QkFDL0QsV0FBVzt3QkFDWCxPQUFPLDZCQUE2QixxQkFDaEMscUJBQXFCLFdBQVcsUUFBUSxXQUFXLFdBQVc7d0JBQ2xFLE9BQU8sK0JBQStCLE9BQU87OztvQkFHakQsR0FBRywyREFBMkQsWUFBVzt3QkFDckUsWUFBWSxjQUFjLFNBQVM7d0JBQ25DLE1BQU0sOEJBQThCLHVCQUMvQixJQUFJLFlBQVksWUFBWSxzQkFBc0I7d0JBQ3ZELE1BQU0sZ0NBQWdDOzt3QkFFdEMsU0FBUyxPQUFPLDJCQUEyQjt3QkFDM0MsU0FBUyxPQUFPLGdCQUFnQjt3QkFDaEMsK0JBQStCOzt3QkFFL0IsK0JBQStCLG9CQUFtQixTQUFPLFlBQU07d0JBQy9ELFdBQVc7d0JBQ1gsT0FBTyw2QkFBNkIscUJBQ2hDLHFCQUFxQixXQUFXLFdBQVcsY0FBYyxTQUFTO3dCQUN0RSxPQUFPLCtCQUErQixPQUFPOzs7b0JBR2pELEdBQUcsc0VBQXNFLFlBQVc7d0JBQ2hGLFlBQVksY0FBYyxTQUFTO3dCQUNuQyxNQUFNLDhCQUE4Qix1QkFDL0IsSUFBSSxZQUFZLFlBQVksc0JBQXNCO3dCQUN2RCxNQUFNLGdDQUFnQzs7d0JBRXRDLFNBQVMsT0FBTywyQkFBMkI7d0JBQzNDLFNBQVMsT0FBTyxnQkFBZ0I7d0JBQ2hDLFNBQVMsT0FBTyxhQUFhO3dCQUM3QiwrQkFBK0I7O3dCQUUvQiwrQkFBK0Isb0JBQW1CLFNBQU8sWUFBTTt3QkFDL0QsV0FBVzt3QkFDWCxPQUFPLDZCQUE2QixxQkFDaEMscUJBQXFCLFdBQVcsV0FBVyxTQUFTLFNBQVM7d0JBQ2pFLE9BQU8sK0JBQStCLE9BQU87Ozs7Z0JBSXJELFNBQVMsd0JBQXdCLFlBQVc7O29CQUV4QyxHQUFHLHNFQUFzRSxZQUFXO3dCQUNoRixNQUFNLDhCQUE4Qix1QkFBdUIsSUFBSSxZQUMzRCxZQUFZLGNBQWMsT0FBTzs7d0JBR3JDLFNBQVMsT0FBTyxNQUFNO3dCQUN0QiwrQkFBK0I7d0JBQy9CLCtCQUErQjt3QkFDL0IsT0FBTyw2QkFBNkIscUJBQ2hDLHFCQUFxQixXQUFXLFFBQVEsV0FBVyxXQUFXOzs7O2dCQUsxRSxTQUFTLHFDQUFxQyxZQUFXOztvQkFFckQsR0FBRyxrRkFBa0YsWUFBVzt3QkFDNUYsTUFBTSw4QkFBOEIsdUJBQXVCLElBQUksWUFDM0QsWUFBWSxjQUFjLE9BQU87O3dCQUdyQyxTQUFTLE9BQU8sMkJBQTJCO3dCQUMzQyxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQywrQkFBK0I7d0JBQy9CLCtCQUErQjt3QkFDL0IsT0FBTyw2QkFBNkIscUJBQ2hDLHFCQUFxQixXQUFXLFdBQVcsY0FBYyxTQUFTOzs7O2dCQU05RSxTQUFTLDhEQUE4RCxZQUFXO29CQUM5RSxXQUFXLE9BQU8sVUFBUyxtQkFBbUI7d0JBQzFDLE1BQU0sVUFBVSxRQUFRLElBQUksWUFBWTs7O29CQUc1QyxHQUFHLHdDQUF3QyxZQUFXO3dCQUNsRCxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQywrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQiwwQkFBMEI7d0JBQ2hFLE9BQU8sK0JBQStCLG9CQUFvQjt3QkFDMUQsT0FBTywrQkFBK0IsY0FBYzs7OztnQkFLNUQsU0FBUyxpREFBaUQsWUFBVztvQkFDakUsV0FBVyxPQUFPLFVBQVMsbUJBQW1CO3dCQUMxQyxNQUFNLFVBQVUsUUFBUSxJQUFJLFlBQVk7OztvQkFHNUMsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsU0FBUyxPQUFPLGdCQUFnQjt3QkFDaEMsK0JBQStCOzt3QkFFL0IsT0FBTywrQkFBK0IsMEJBQTBCO3dCQUNoRSxPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWM7OztvQkFHeEQsR0FBRyx1Q0FBdUMsWUFBVzt3QkFDakQsU0FBUyxPQUFPLFFBQVE7d0JBQ3hCLCtCQUErQjs7d0JBRS9CLE9BQU8sK0JBQStCLG9CQUFvQjs7O29CQUc5RCxHQUFHLDREQUE0RCxZQUFXO3dCQUN0RSxTQUFTLE9BQU8sUUFBUTt3QkFDeEIsU0FBUyxPQUFPLGdCQUFnQjt3QkFDaEMsK0JBQStCOzt3QkFFL0IsT0FBTywrQkFBK0Isb0JBQW9CO3dCQUMxRCxPQUFPLCtCQUErQixjQUFjLE1BQU0sUUFBUSxJQUFJLFlBQVk7NEJBQzlFLE9BQU87Ozs7b0JBSWYsR0FBRyw0QkFBNEIsWUFBVzt3QkFDdEMsU0FBUyxPQUFPLFFBQVE7d0JBQ3hCLCtCQUErQjs7d0JBRS9CLE9BQU8sK0JBQStCLG9CQUFvQjt3QkFDMUQsT0FBTywrQkFBK0IsY0FBYyxNQUFNLFFBQVEsSUFBSSxZQUFZOzRCQUM5RSxPQUFPOzs7O29CQUlmLEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELFNBQVMsT0FBTyxlQUFlO3dCQUMvQiwrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWMsYUFBYSxRQUFRLElBQUksWUFBWTs0QkFDckYsT0FBTzs7OztvQkFJZixHQUFHLDhEQUE4RCxZQUFXO3dCQUN4RSxTQUFTLE9BQU8seUJBQXlCO3dCQUN6QywrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWMsdUJBQy9DLFFBQVEsSUFBSSxZQUFZOzRCQUNyQixPQUFPOzs7O29CQUluQixHQUFHLGtFQUFrRSxZQUFXO3dCQUM1RSxTQUFTLE9BQU8sMkJBQTJCO3dCQUMzQywrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWMseUJBQy9DLFFBQVEsSUFBSSxZQUFZOzRCQUNyQixPQUFPOzs7O29CQUluQixHQUFHLHNEQUFzRCxZQUFXO3dCQUNoRSxTQUFTLE9BQU8scUJBQXFCO3dCQUNyQywrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWMsbUJBQy9DLFFBQVEsSUFBSSxZQUFZOzRCQUNyQixPQUFPOzs7O29CQUluQixHQUFHLHFEQUFxRCxZQUFXO3dCQUMvRCxTQUFTLE9BQU8sUUFBUTt3QkFDeEIsK0JBQStCOzt3QkFFL0IsT0FBTywrQkFBK0Isb0JBQW9CO3dCQUMxRCxPQUFPLCtCQUErQixjQUFjLE1BQU0sS0FBSzs7OztnQkFJdkUsU0FBUyxnRUFBZ0UsWUFBVztvQkFDaEYsV0FBVyxPQUFPLFVBQVMsbUJBQW1CO3dCQUMxQyxNQUFNLFVBQVUsUUFBUSxJQUFJLFlBQVk7OztvQkFHNUMsR0FBRyx3Q0FBd0MsWUFBVzt3QkFDbEQsU0FBUyxPQUFPLGdCQUFnQjt3QkFDaEMsK0JBQStCOzt3QkFFL0IsT0FBTywrQkFBK0IsMEJBQTBCO3dCQUNoRSxPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWM7Ozs7Z0JBSzVELFNBQVMsd0RBQXdELFlBQVc7b0JBQ3hFLFdBQVcsT0FBTyxVQUFTLG1CQUFtQjt3QkFDMUMsTUFBTSxVQUFVLFFBQVEsSUFBSSxZQUFZOzs7b0JBRzVDLEdBQUcsaURBQWlELFlBQVc7d0JBQzNELFNBQVMsT0FBTyxrQkFBa0I7d0JBQ2xDLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCO3dCQUNoRSxPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWM7OztvQkFHeEQsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsU0FBUyxPQUFPLGNBQWM7d0JBQzlCLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7b0JBR3BFLEdBQUcsK0RBQStELFlBQVc7d0JBQ3pFLFNBQVMsT0FBTyxnQ0FBZ0M7d0JBQ2hELCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7b0JBR3BFLEdBQUcsNkRBQTZELFlBQVc7d0JBQ3ZFLFNBQVMsT0FBTyw4QkFBOEI7d0JBQzlDLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7b0JBR3BFLEdBQUcsK0RBQStELFlBQVc7d0JBQ3pFLFNBQVMsT0FBTyxnQ0FBZ0M7d0JBQ2hELCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7b0JBR3BFLEdBQUcseURBQXlELFlBQVc7d0JBQ25FLFNBQVMsT0FBTywwQkFBMEI7d0JBQzFDLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7b0JBR3BFLEdBQUcsb0RBQW9ELFlBQVc7d0JBQzlELFNBQVMsT0FBTyxxQkFBcUI7d0JBQ3JDLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsMEJBQTBCOzs7O2dCQUl4RSxTQUFTLHFCQUFxQixZQUFXOztvQkFFckMsR0FBRyx1REFBdUQsWUFBVzt3QkFDakUsTUFBTSw0QkFBNEIseUJBQXlCLElBQUksWUFDM0QsWUFBWSxjQUFjLE9BQU87O3dCQUdyQyxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQyxTQUFTLE9BQU8scUJBQXFCO3dCQUNyQywrQkFBK0I7d0JBQy9CLCtCQUErQjt3QkFDL0IsT0FBTywyQkFBMkIsdUJBQXVCOzs7b0JBRzdELEdBQUcsMENBQTBDLFlBQVc7d0JBQ3BELElBQUksWUFBWTt3QkFDaEIsTUFBTSw0QkFBNEIseUJBQXlCLElBQUksWUFDM0QsWUFBWSxjQUFjLE9BQU87O3dCQUdyQyxTQUFTLE9BQU8sZ0JBQWdCO3dCQUNoQyxTQUFTLE9BQU8saUJBQWlCO3dCQUNqQywrQkFBK0I7O3dCQUUvQixrQkFBa0IsK0JBQStCO3dCQUNqRCxnQkFBZ0IsS0FBSyxVQUFTLE1BQU07NEJBQ2hDLGFBQWE7O3dCQUVqQixXQUFXO3dCQUNYLE9BQU8sV0FBVyxZQUFZLFFBQVE7OztvQkFHMUMsR0FBRyw2Q0FBNkMsWUFBVzt3QkFDdkQsSUFBSSxZQUFZO3dCQUNoQixNQUFNLDRCQUE0Qix5QkFBeUIsSUFBSSxZQUMzRCxZQUFZLGNBQWMsT0FBTzs7d0JBR3JDLFNBQVMsT0FBTyxnQkFBZ0I7d0JBQ2hDLFNBQVMsT0FBTyxxQkFBcUI7d0JBQ3JDLCtCQUErQjs7d0JBRS9CLGtCQUFrQiwrQkFBK0I7d0JBQ2pELGdCQUFnQixLQUFLLFVBQVMsTUFBTTs0QkFDaEMsYUFBYTs7d0JBRWpCLFdBQVc7d0JBQ1gsT0FBTyxXQUFXLFlBQVk7Ozs7Z0JBSXRDLFNBQVMsa0JBQWtCLFlBQVc7b0JBQ2xDLEdBQUcsdURBQXVELFlBQVc7O3dCQUVqRSxTQUFTLE9BQU8sZ0JBQWdCLFNBQVM7d0JBQ3pDLCtCQUErQjs7d0JBRS9CLE9BQU8sWUFBVzs0QkFDZCwrQkFBK0I7MkJBQ2hDOzs7b0JBSVAsR0FBRyx5Q0FBeUMsWUFBVzt3QkFDbkQsSUFBSSxhQUFhO3dCQUNqQixNQUFNLDJCQUEyQix5QkFBeUIsSUFBSSxZQUMxRCxZQUFZLGNBQWMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsSUFBRzs7d0JBRzFELFNBQVMsT0FBTyxnQkFBZ0IsU0FBUzt3QkFDekMsU0FBUyxPQUFPLDBCQUEwQjs7d0JBRTFDLCtCQUErQjt3QkFDL0IsK0JBQStCLGlCQUFpQjt3QkFDaEQsa0JBQWtCLCtCQUErQjt3QkFDakQsZ0JBQWdCLEtBQUssVUFBUyxNQUFNOzRCQUNoQyxjQUFjOzt3QkFFbEIsV0FBVzs7d0JBRVgsT0FBTyxZQUFZLFFBQVEsS0FBSzs7OztnQkFJeEMsU0FBUyxRQUFRLFlBQVc7b0JBQ3hCLEdBQUcscUVBQXFFLFlBQVc7d0JBQy9FLFNBQVMsT0FBTyxrQkFBa0I7d0JBQ2xDLCtCQUErQjt3QkFDL0IsT0FBTywrQkFBK0IsOEJBQThCLFFBQVE7OztvQkFHaEYsR0FBRyx1RUFBdUUsWUFBVzt3QkFDakYsU0FBUyxPQUFPLDJCQUEyQjt3QkFDM0MsK0JBQStCO3dCQUMvQixPQUFPLCtCQUErQiw4QkFBOEIsUUFBUTs7OztnQkFJcEYsU0FBUyxTQUFTLFlBQVc7b0JBQ3pCLEdBQUcsa0RBQWtELFlBQVc7O3dCQUU1RCxTQUFTLE9BQU8sZ0JBQWdCLFNBQVM7d0JBQ3pDLFNBQVMsT0FBTywwQkFBMEI7d0JBQzFDLFNBQVMsT0FBTywwQkFBMEI7d0JBQzFDLFNBQVMsS0FBSzs7d0JBRWQsK0JBQStCO3dCQUMvQiwrQkFBK0IsaUJBQWlCOzt3QkFFaEQsT0FBTywrQkFBK0IsMEJBQTBCO3dCQUNoRSxPQUFPLCtCQUErQixvQkFBb0I7d0JBQzFELE9BQU8sK0JBQStCLGNBQWM7d0JBQ3BELE9BQU8sK0JBQStCLDhCQUE4QixRQUFRO3dCQUM1RSxPQUFPLCtCQUErQixnQkFBZ0IsS0FBSzt3QkFDM0QsT0FBTywrQkFBK0IsZUFBZSxRQUFROzRCQUN6RCx3QkFBd0IsSUFBSSxZQUFZLEVBQUUsT0FBTzs7O3dCQUdyRCwrQkFBK0I7O3dCQUUvQixPQUFPLCtCQUErQiwwQkFBMEI7d0JBQ2hFLE9BQU8sK0JBQStCLG9CQUFvQjt3QkFDMUQsT0FBTywrQkFBK0IsY0FBYzt3QkFDcEQsT0FBTywrQkFBK0IsOEJBQThCLFFBQVE7d0JBQzVFLE9BQU8sK0JBQStCLGdCQUFnQjt3QkFDdEQsT0FBTywrQkFBK0IsZUFBZSxRQUFROzs7Ozs7R0E1QnRFIiwiZmlsZSI6ImFjY2Vzc1JlcXVlc3QvQWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlVGVzdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAndGVzdC9qcy9UZXN0SW5pdGlhbGl6ZXInO1xuaW1wb3J0IGFjY2Vzc1JlcXVlc3RNb2R1bGUgZnJvbSAnYWNjZXNzUmVxdWVzdC9BY2Nlc3NSZXF1ZXN0TW9kdWxlJztcbmltcG9ydCB0ZXN0TW9kdWxlIGZyb20gJ3Rlc3QvanMvVGVzdE1vZHVsZSc7XG5pbXBvcnQgJy4vQWNjZXNzUmVxdWVzdFRlc3REYXRhJztcblxuLyoqXG4gKiBUZXN0cyBmb3IgdGhlIEFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5cbiAqL1xuZGVzY3JpYmUoJ0FjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZSwgaWRlbnRpdHksIGxvY2F0aW9uLCB0ZXN0U2VydmljZSwgJHByb3ZpZGUsXG4gICAgICAgICRyb290U2NvcGUsIGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLCBhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCBTRUFSQ0hfVFlQRV9LRVlXT1JELCBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OLFxuICAgICAgICBTRUFSQ0hfVFlQRV9JREVOVElUWSwgcSwgRmlsdGVyVmFsdWU7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy9cbiAgICAvLyBHTE9CQUwgU0VUVVBcbiAgICAvL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vIExvYWQgdGhlIHRlc3QgbW9kdWxlIHRvIGdldCB0aGUgdGVzdFNlcnZpY2UuXG4gICAgYmVmb3JlRWFjaChtb2R1bGUodGVzdE1vZHVsZSkpO1xuICAgIC8vIFVzZSB0aGUgYWNjZXNzIHJlcXVlc3QgbW9kdWxlLlxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGFjY2Vzc1JlcXVlc3RNb2R1bGUpKTtcblxuICAgIGJlZm9yZUVhY2gobW9kdWxlKGZ1bmN0aW9uKF8kcHJvdmlkZV8pIHtcbiAgICAgICAgJHByb3ZpZGUgPSBfJHByb3ZpZGVfO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX0lEJywgJzEyMycpO1xuICAgICAgICAkcHJvdmlkZS5jb25zdGFudCgnU1BfQ1VSUl9VU0VSX05BTUUnLCAnam9obi5kb2UnKTtcbiAgICAgICAgJHByb3ZpZGUuY29uc3RhbnQoJ1NQX0NVUlJfRElTUExBWUFCTEVfVVNFUl9OQU1FJywgJ0pvaG5ueSBEb2UnKTtcbiAgICB9KSk7XG5cbiAgICAvLyBTZXR1cCB0aGUgZGVwZW5kZW5jaWVzLlxuICAgIC8qIGpzaGludCBtYXhwYXJhbXM6IDE0ICovXG4gICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oX2FjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZV8sICRsb2NhdGlvbiwgX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZGVudGl0eSwgX3Rlc3RTZXJ2aWNlXywgXyRyb290U2NvcGVfLCBfYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2VfLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV8sIF9TRUFSQ0hfVFlQRV9LRVlXT1JEXywgX1NFQVJDSF9UWVBFX1BPUFVMQVRJT05fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfU0VBUkNIX1RZUEVfSURFTlRJVFlfLCBhY2Nlc3NSZXF1ZXN0VGVzdERhdGEsICRxLCBfRmlsdGVyVmFsdWVfKSB7XG4gICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2VfO1xuICAgICAgICBhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlID0gX2FjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2VfO1xuICAgICAgICBhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSA9IF9hY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZV87XG4gICAgICAgIGFjY2Vzc1JlcXVlc3RJdGVtc1NlcnZpY2UgPSBfYWNjZXNzUmVxdWVzdEl0ZW1zU2VydmljZV87XG4gICAgICAgIHRlc3RTZXJ2aWNlID0gX3Rlc3RTZXJ2aWNlXztcbiAgICAgICAgbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgICRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG4gICAgICAgIGlkZW50aXR5ID0gbmV3IElkZW50aXR5KGFjY2Vzc1JlcXVlc3RUZXN0RGF0YS5JREVOVElUWTEpO1xuICAgICAgICBTRUFSQ0hfVFlQRV9LRVlXT1JEID0gX1NFQVJDSF9UWVBFX0tFWVdPUkRfO1xuICAgICAgICBTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OID0gX1NFQVJDSF9UWVBFX1BPUFVMQVRJT05fO1xuICAgICAgICBTRUFSQ0hfVFlQRV9JREVOVElUWSA9IF9TRUFSQ0hfVFlQRV9JREVOVElUWV87XG4gICAgICAgIHEgPSAkcTtcbiAgICAgICAgRmlsdGVyVmFsdWUgPSBfRmlsdGVyVmFsdWVfO1xuICAgIH0pKTtcblxuICAgIGRlc2NyaWJlKCdnZXRUYXJnZXRJZGVudGl0eSBpZGVudGl0eU5hbWUnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0RGVlcExpbmtJZGVudGl0eSBmb3IgZ2l2ZW4gaWRlbnRpdHlOYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLCAnZ2V0RGVlcExpbmtJZGVudGl0eScpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBpZGVudGl0eSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgJ2pib2InKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0VGFyZ2V0SWRlbnRpdHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldERlZXBMaW5rSWRlbnRpdHkpLlxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdqYm9iJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gY3VycmVudCBpZGVudGl0eSBpZiBubyBpZGVudGl0eU5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZGVudGl0eSwgcmV0dXJuZWRQcm9taXNlO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcblxuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlID0gYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KCk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UudGhlbihmdW5jdGlvbihpZGVudGl0eSkge1xuICAgICAgICAgICAgICAgIHRhcmdldElkZW50aXR5ID0gaWRlbnRpdHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0SWRlbnRpdHkubmFtZSkudG9FcXVhbCgnam9obi5kb2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGFuZCByZXR1cm4gdW5kZWZpbmVkIHdoZW4gaWRlbnRpdHkgbmFtZSBpcyBpbnZhbGlkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWRlbnRpdHksIHJldHVybmVkUHJvbWlzZTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UsICdnZXREZWVwTGlua0lkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIG51bGwpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2lkZW50aXR5TmFtZScsICdqYm9iJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0VGFyZ2V0SWRlbnRpdHkoKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGlkZW50aXR5KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QodGFyZ2V0SWRlbnRpdHkpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBmYWlsIGFuZCBjYWxsIHJlc2V0IHdoZW4gSU4gaXMgaW52YWxpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdFNlcnZpY2UuZXJyb3JSZXNwb25zZS5zdGF0dXMgPSA0MDQ7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLCAnZ2V0RGVlcExpbmtJZGVudGl0eScpXG4gICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVSZXNwb25zZVByb21pc2UodHJ1ZSkpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLCAncmVzZXQnKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdpbicsICdqYm9iJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3F1aWNrTGluaycsICdRTCBOYW1lJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0VGFyZ2V0SWRlbnRpdHkoKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UuZ2V0RGVlcExpbmtJZGVudGl0eSkuXG4gICAgICAgICAgICAgICAgdG9IYXZlQmVlbkNhbGxlZFdpdGgodW5kZWZpbmVkLCAnamJvYicsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAnUUwgTmFtZScpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5yZXNldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGZhaWwgYW5kIGNhbGwgcmVzZXQgd2hlbiByZXF1ZXN0ZWVBcHAgaXMgaW52YWxpZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGVzdFNlcnZpY2UuZXJyb3JSZXNwb25zZS5zdGF0dXMgPSA0MDQ7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLCAnZ2V0RGVlcExpbmtJZGVudGl0eScpXG4gICAgICAgICAgICAgICAgLmFuZC5yZXR1cm5WYWx1ZSh0ZXN0U2VydmljZS5jcmVhdGVSZXNwb25zZVByb21pc2UodHJ1ZSkpO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLCAncmVzZXQnKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdyZXF1ZXN0ZWVOYXRpdmVJZGVudGl0eScsICdqYm9iTmF0aXZlJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3JlcXVlc3RlZUFwcCcsICdib2d1cycpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcblxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KCkuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0SWRlbnRpdHlTZXJ2aWNlLmdldERlZXBMaW5rSWRlbnRpdHkpLlxuICAgICAgICAgICAgICAgIHRvSGF2ZUJlZW5DYWxsZWRXaXRoKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAnamJvYk5hdGl2ZScsICdib2d1cycsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLnJlc2V0KS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZmFpbCBhbmQgY2FsbCByZXNldCB3aGVuIHJlcXVlc3RlZU5hdGl2ZUlkZW50aXR5IGlzIGludmFsaWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmVycm9yUmVzcG9uc2Uuc3RhdHVzID0gNDA0O1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZSwgJ2dldERlZXBMaW5rSWRlbnRpdHknKVxuICAgICAgICAgICAgICAgIC5hbmQucmV0dXJuVmFsdWUodGVzdFNlcnZpY2UuY3JlYXRlUmVzcG9uc2VQcm9taXNlKHRydWUpKTtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSwgJ3Jlc2V0Jyk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgncmVxdWVzdGVlTmF0aXZlSWRlbnRpdHknLCAnYm9ndXMnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgncmVxdWVzdGVlQXBwJywgJ215QXBwJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3F1aWNrTGluaycsICdRTE5hbWUnKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRUYXJnZXRJZGVudGl0eSgpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgICAgICAgICRyb290U2NvcGUuJGFwcGx5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXREZWVwTGlua0lkZW50aXR5KS5cbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2JvZ3VzJywgJ215QXBwJywgJ1FMTmFtZScpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5yZXNldCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRUYXJnZXRJZGVudGl0eSBJTicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXREZWVwTGlua0lkZW50aXR5IGZvciBnaXZlbiBpZGVudGl0eSBzcGVjaWZpZWQgYnkgSU4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNweU9uKGFjY2Vzc1JlcXVlc3RJZGVudGl0eVNlcnZpY2UsICdnZXREZWVwTGlua0lkZW50aXR5JykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIGlkZW50aXR5KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdpbicsICdqYm9iJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXREZWVwTGlua0lkZW50aXR5KS5cbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsICdqYm9iJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0VGFyZ2V0SWRlbnRpdHkgbmF0aXZlIGlkZW50aXR5JywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldERlZXBMaW5rSWRlbnRpdHkgZm9yIGdpdmVuIHJlcXVlc3RlZU5hdGl2ZUlkZW50aXR5L3JlcXVlc3RlZUFwcCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZSwgJ2dldERlZXBMaW5rSWRlbnRpdHknKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgaWRlbnRpdHkpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3JlcXVlc3RlZU5hdGl2ZUlkZW50aXR5JywgJ2pib2JOYXRpdmUnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgncmVxdWVzdGVlQXBwJywgJ215QXBwJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFRhcmdldElkZW50aXR5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdElkZW50aXR5U2VydmljZS5nZXREZWVwTGlua0lkZW50aXR5KS5cbiAgICAgICAgICAgICAgICB0b0hhdmVCZWVuQ2FsbGVkV2l0aCh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2pib2JOYXRpdmUnLCAnbXlBcHAnLCB1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnQWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlIG9uIFJldmlldyBQYWdlIFNlbGYgU2VydmljZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihBY2Nlc3NSZXF1ZXN0SXRlbSkge1xuICAgICAgICAgICAgc3B5T24obG9jYXRpb24sICdwYXRoJykuYW5kLnJldHVyblZhbHVlKCcvYWNjZXNzUmVxdWVzdFNlbGYvcmV2aWV3Jyk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHRydWUgZm9yIG9ubHkgaWRlbnRpdHlOYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2lkZW50aXR5TmFtZScsICdzcEFkbWluJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtNYW5hZ2VBY2Nlc3MoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIGRlc2NyaWJlKCdBY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2Ugb24gUmV2aWV3IFBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oQWNjZXNzUmVxdWVzdEl0ZW0pIHtcbiAgICAgICAgICAgIHNweU9uKGxvY2F0aW9uLCAncGF0aCcpLmFuZC5yZXR1cm5WYWx1ZSgnL2FjY2Vzc1JlcXVlc3QvcmV2aWV3Jyk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHRydWUgZm9yIG9ubHkgaWRlbnRpdHlOYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2lkZW50aXR5TmFtZScsICdzcEFkbWluJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtNYW5hZ2VBY2Nlc3MoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGZvciBvbmx5IHJvbGUgZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3JvbGUnLCAndGVzdCcpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rUmV2aWV3KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXR1cCBmaWx0ZXJzIGNvcnJlY3RseSBhbmQgc2V0IGRlZXAgbGluayB0byB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ3JvbGUnLCAnaGVsbG8nKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgJ3NwQWRtaW4nKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua1JldmlldygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmZpbHRlcnNSZXZpZXcucm9sZSkudG9FcXVhbChuZXcgRmlsdGVyVmFsdWUoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiAnaGVsbG8nXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgc2V0IHJvbGUgZm9yIHJvbGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgncm9sZScsICdoZWxsbycpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rUmV2aWV3KCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZmlsdGVyc1Jldmlldy5yb2xlKS50b0VxdWFsKG5ldyBGaWx0ZXJWYWx1ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICdoZWxsbydcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZW50aXRsZW1lbnQgZm9yIGVudGl0bGVtZW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2VudGl0bGVtZW50JywgJ2hlbGxvJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5maWx0ZXJzUmV2aWV3LmVudGl0bGVtZW50KS50b0VxdWFsKG5ldyBGaWx0ZXJWYWx1ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICdoZWxsbydcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZW50aXRsZW1lbnRBdHRyaWJ1dGUxIGZvciBlbnRpdGxlbWVudEF0dHJpYnV0ZTEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZW50aXRsZW1lbnRBdHRyaWJ1dGUxJywgJ2hlbGxvJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5maWx0ZXJzUmV2aWV3LmVudGl0bGVtZW50QXR0cmlidXRlMSlcbiAgICAgICAgICAgICAgICAudG9FcXVhbChuZXcgRmlsdGVyVmFsdWUoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2hlbGxvJ1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBzZXQgZW50aXRsZW1lbnRBcHBsaWNhdGlvbjIgZm9yIGVudGl0bGVtZW50QXBwbGljYXRpb24yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2VudGl0bGVtZW50QXBwbGljYXRpb24yJywgJ2hlbGxvJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5maWx0ZXJzUmV2aWV3LmVudGl0bGVtZW50QXBwbGljYXRpb24yKVxuICAgICAgICAgICAgICAgIC50b0VxdWFsKG5ldyBGaWx0ZXJWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnaGVsbG8nXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHNldCBlbnRpdGxlbWVudFZhbHVlMyBmb3IgZW50aXRsZW1lbnRWYWx1ZTMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZW50aXRsZW1lbnRWYWx1ZTMnLCAnaGVsbG8nKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua1JldmlldygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmZpbHRlcnNSZXZpZXcuZW50aXRsZW1lbnRWYWx1ZTMpXG4gICAgICAgICAgICAgICAgLnRvRXF1YWwobmV3IEZpbHRlclZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdoZWxsbydcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgbm90IHNldHVwIGZpbHRlcnMgZm9yIGludmFsaWQgc2VhcmNoIHRlcm1zJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2FicmEnLCAnY2FkYWJyYScpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rUmV2aWV3KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5maWx0ZXJzUmV2aWV3LmFicmEpLnRvQmUodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnQWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlIG9uIE1hbmFnZSBBY2Nlc3MgU2VsZiBTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKEFjY2Vzc1JlcXVlc3RJdGVtKSB7XG4gICAgICAgICAgICBzcHlPbihsb2NhdGlvbiwgJ3BhdGgnKS5hbmQucmV0dXJuVmFsdWUoJy9hY2Nlc3NSZXF1ZXN0U2VsZi9hZGQnKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSBmb3Igb25seSBpZGVudGl0eU5hbWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgJ3NwQWRtaW4nKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua01hbmFnZUFjY2VzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmsoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZGVzY3JpYmUoJ0FjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZSBvbiBNYW5hZ2UgQWNjZXNzIFBhZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oQWNjZXNzUmVxdWVzdEl0ZW0pIHtcbiAgICAgICAgICAgIHNweU9uKGxvY2F0aW9uLCAncGF0aCcpLmFuZC5yZXR1cm5WYWx1ZSgnL21hbmFnZUFjY2Vzcy9hZGQnKTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSBmb3Igb25seSBmaWx0ZXJSb2xlVHlwZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyUm9sZVR5cGUnLCAndGVzdCcpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua01hbmFnZUFjY2VzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtSZXZpZXcoKSkudG9CZUZhbHN5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmsoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHRydWUgZm9yIG9ubHkgZmlsdGVyUm9sZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyUm9sZScsICd0ZXN0Jyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rTWFuYWdlQWNjZXNzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGZvciBvbmx5IGZpbHRlckVudGl0bGVtZW50QXBwbGljYXRpb24gZmlsdGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2ZpbHRlckVudGl0bGVtZW50QXBwbGljYXRpb24nLCAndGVzdCcpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua01hbmFnZUFjY2VzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSBmb3Igb25seSBmaWx0ZXJFbnRpdGxlbWVudEF0dHJpYnV0ZSBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyRW50aXRsZW1lbnRBdHRyaWJ1dGUnLCAndGVzdCcpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua01hbmFnZUFjY2VzcygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgYmUgdHJ1ZSBmb3Igb25seSBmaWx0ZXJFbnRpdGxlbWVudEVudGl0bGVtZW50IGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdmaWx0ZXJFbnRpdGxlbWVudEVudGl0bGVtZW50JywgJ3Rlc3QnKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmtNYW5hZ2VBY2Nlc3MoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIGJlIHRydWUgZm9yIG9ubHkgZmlsdGVyRW50aXRsZW1lbnRPd25lciBmaWx0ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyRW50aXRsZW1lbnRPd25lcicsICd0ZXN0Jyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rTWFuYWdlQWNjZXNzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGZvciBvbmx5IGZpbHRlckVudGl0bGVtZW50IGZpbHRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdmaWx0ZXJFbnRpdGxlbWVudCcsICd0ZXN0Jyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rTWFuYWdlQWNjZXNzKCkpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0SXRlbVNlYXJjaERhdGEnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0QWNjZXNzRmlsdGVyVmFsdWVzIGZvciBnaXZlbiBmaWx0ZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgJ2dldEFjY2Vzc0ZpbHRlclZhbHVlcycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBbXSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgJ2pib2InKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyRW50aXRsZW1lbnQnLCAndGVzdCcpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRJdGVtU2VhcmNoRGF0YSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3RGaWx0ZXJTZXJ2aWNlLmdldEFjY2Vzc0ZpbHRlclZhbHVlcykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBzZWFyY2ggZGF0YSB3aXRoIGtleXdvcmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWFyY2hEYXRhLCByZXR1cm5lZFByb21pc2U7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0RmlsdGVyU2VydmljZSwgJ2dldEFjY2Vzc0ZpbHRlclZhbHVlcycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICAgICAgICB0ZXN0U2VydmljZS5jcmVhdGVQcm9taXNlKGZhbHNlLCBbXSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgJ2pib2InKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyS2V5d29yZCcsICd0ZXN0Jyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuXG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UgPSBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0SXRlbVNlYXJjaERhdGEoKTtcbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHJvb3RTY29wZS4kYXBwbHkoKTtcbiAgICAgICAgICAgIGV4cGVjdChzZWFyY2hEYXRhLnNlYXJjaFRlcm0pLnRvRXF1YWwoJ3Rlc3QnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gc2VhcmNoIGRhdGEgd2l0aCBubyBrZXl3b3JkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VhcmNoRGF0YSwgcmV0dXJuZWRQcm9taXNlO1xuICAgICAgICAgICAgc3B5T24oYWNjZXNzUmVxdWVzdEZpbHRlclNlcnZpY2UsICdnZXRBY2Nlc3NGaWx0ZXJWYWx1ZXMnKS5hbmQucmV0dXJuVmFsdWUoXG4gICAgICAgICAgICAgICAgdGVzdFNlcnZpY2UuY3JlYXRlUHJvbWlzZShmYWxzZSwgW10pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2lkZW50aXR5TmFtZScsICdqYm9iJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5zZWFyY2goJ2ZpbHRlckVudGl0bGVtZW50JywgJ3Rlc3QnKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIHJldHVybmVkUHJvbWlzZSA9IGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRJdGVtU2VhcmNoRGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlYXJjaERhdGEgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgZXhwZWN0KHNlYXJjaERhdGEuc2VhcmNoVGVybSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXRSZXZpZXdJdGVtcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIG5vIGZpbHRlcnMgYXJlIGZvdW5kJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnaWRlbnRpdHlOYW1lJywgaWRlbnRpdHkuZ2V0TmFtZSgpKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pbml0KCk7XG5cbiAgICAgICAgICAgIGV4cGVjdChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0UmV2aWV3SXRlbXMoKTtcbiAgICAgICAgICAgIH0pLnRvVGhyb3coKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiBkYXRhIHdpdGggdmFsaWQgZmlsdGVycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJldmlld0l0ZW1zLCByZXR1cm5lZFByb21pc2U7XG4gICAgICAgICAgICBzcHlPbihhY2Nlc3NSZXF1ZXN0SXRlbXNTZXJ2aWNlLCAnZ2V0QWNjZXNzUmVxdWVzdEl0ZW1zJykuYW5kLnJldHVyblZhbHVlKFxuICAgICAgICAgICAgICAgIHRlc3RTZXJ2aWNlLmNyZWF0ZVByb21pc2UoZmFsc2UsIHtkYXRhOiB7b2JqZWN0czogW3t9LHt9XX19KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdpZGVudGl0eU5hbWUnLCBpZGVudGl0eS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdlbnRpdGxlbWVudEFwcGxpY2F0aW9uJywgJ3Rlc3QnKTtcblxuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS50YXJnZXRJZGVudGl0eSA9IGlkZW50aXR5O1xuICAgICAgICAgICAgcmV0dXJuZWRQcm9taXNlID0gYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmdldFJldmlld0l0ZW1zKCk7XG4gICAgICAgICAgICByZXR1cm5lZFByb21pc2UudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV2aWV3SXRlbXMgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSgpO1xuXG4gICAgICAgICAgICBleHBlY3QocmV2aWV3SXRlbXMubGVuZ3RoKS50b0JlKDIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdpbml0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaW5pdGlhbGl6ZSByZXF1ZXN0QWNjZXNzU2VhcmNoVHlwZSB0byBTRUFSQ0hfVFlQRV9JREVOVElUWScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdmaWx0ZXJJZGVudGl0eScsICdBZGFtJyk7XG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRSZXF1ZXN0QWNjZXNzU2VhcmNoVHlwZSgpKS50b0VxdWFsKFNFQVJDSF9UWVBFX0lERU5USVRZKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHJlcXVlc3RBY2Nlc3NTZWFyY2hUeXBlIHRvIFNFQVJDSF9UWVBFX1BPUFVMQVRJT04nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyUG9wdWxhdGlvbk1hbmFnZXInLCAnQWRhbScpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuZ2V0UmVxdWVzdEFjY2Vzc1NlYXJjaFR5cGUoKSkudG9FcXVhbChTRUFSQ0hfVFlQRV9QT1BVTEFUSU9OKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzZXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJ3Nob3VsZCBjbGVhciBkYXRhIGFuZC9vciBzZXQgdG8gZGVmYXVsdCB2YWx1ZXMnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdpZGVudGl0eU5hbWUnLCBpZGVudGl0eS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgbG9jYXRpb24uc2VhcmNoKCdlbnRpdGxlbWVudEFwcGxpY2F0aW9uJywgJ3Rlc3QnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnNlYXJjaCgnZmlsdGVyUG9wdWxhdGlvblJlZ2lvbicsICdBc2lhJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5wYXRoKCdhY2Nlc3NSZXF1ZXN0L3JldmlldycpO1xuXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaW5pdCgpO1xuICAgICAgICAgICAgYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLnRhcmdldElkZW50aXR5ID0gaWRlbnRpdHk7XG5cbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua01hbmFnZUFjY2VzcygpKS50b0JlRmFsc3koKTtcbiAgICAgICAgICAgIGV4cGVjdChhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UuaXNEZWVwTGlua1JldmlldygpKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmlzRGVlcExpbmsoKSkudG9CZVRydXRoeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRSZXF1ZXN0QWNjZXNzU2VhcmNoVHlwZSgpKS50b0VxdWFsKFNFQVJDSF9UWVBFX1BPUFVMQVRJT04pO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS50YXJnZXRJZGVudGl0eSkudG9CZShpZGVudGl0eSk7XG4gICAgICAgICAgICBleHBlY3QoYWNjZXNzUmVxdWVzdERlZXBGaWx0ZXJTZXJ2aWNlLmZpbHRlcnNSZXZpZXcpLnRvRXF1YWwoe1xuICAgICAgICAgICAgICAgIGVudGl0bGVtZW50QXBwbGljYXRpb246IG5ldyBGaWx0ZXJWYWx1ZSh7IHZhbHVlOiAndGVzdCcgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhY2Nlc3NSZXF1ZXN0RGVlcEZpbHRlclNlcnZpY2UucmVzZXQoKTtcblxuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rTWFuYWdlQWNjZXNzKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rUmV2aWV3KCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5pc0RlZXBMaW5rKCkpLnRvQmVGYWxzeSgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5nZXRSZXF1ZXN0QWNjZXNzU2VhcmNoVHlwZSgpKS50b0VxdWFsKFNFQVJDSF9UWVBFX0tFWVdPUkQpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS50YXJnZXRJZGVudGl0eSkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICAgICAgZXhwZWN0KGFjY2Vzc1JlcXVlc3REZWVwRmlsdGVyU2VydmljZS5maWx0ZXJzUmV2aWV3KS50b0VxdWFsKHt9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
